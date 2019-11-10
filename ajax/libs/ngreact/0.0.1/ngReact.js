// NgReact
// -------
//The container for all of our utilities and React Components
var NgReact = (function() {

  var onClickNameRegex = /\w+/g,
    onClickVarsRegex = /\(.*\)/g,
    formatParamsMatcher = /{(\d+)}/g,
    stringPropertyMatcher = /\.(\w+)/g,
    overlySimplifiedHTMLMatcher = /(<[^>]*>.*<\/[^>]*>)/g,
    textAndWhitespaceRegex = /^[\w\s]+$/;

  // **Underscore Mixins**: Gotta set up some Underscore mixins for general purpose utilities.
  _.mixin({
    // - Formatting because we need to construct JS code in strings to eval.
    ngReactFormat: function(template, data) {
      return template.replace(formatParamsMatcher, function(match, number) {
        return typeof data[number] != 'undefined'
          ? data[number]
          : match;
      });
    },
    // - We need to change object dot notation to bracket notation for our eval to work.
    ngReactBracketNotation: function(string) {
      return string.replace(stringPropertyMatcher, function(match) {
        return _.ngReactFormat('[\'{0}\']', [match.substring(1)]);
      });
    }
  });

  // **Properties To Keep**: Here lies the properties that we'll retain and pass into our React templates.
  // Right now, this is a very limited list. It retains class and id, which are pretty simple to pass
  // through to React. Ng-click and ng-bind are more complicated directives to support, and they are the only
  // Angular directives supported at the moment (unless you contribute, that is!).
  var propertiesToKeep = [
    {
      attrName : 'class',
      propName : 'className',
      name     : 'className'
    }, {
      // - Name of the attribute in normal DOM
      attrName         : 'ng-click',
      // - Name of the attribute that React is expecting
      propName         : 'onClick',
      name             : 'onClick',
      // - If we need to figure out how to handle an attribute, the convertAttribute function needs to be
      // implemented. It should have the signature (attrs, scope, data)
      convertAttribute : function(attrs, scope, data) {

        if (!attrs.onClick) {
          return;
        }

        var fnName = _.first(attrs.onClick.match(onClickNameRegex)),
          fnParams = _.first(attrs.onClick.match(onClickVarsRegex));

        // Remove opening and closing parentheses from the parameters
        fnParams = fnParams.substring(1, fnParams.length - 1);

        // Create a String that we can evaluate. Here, the function must be wrapped in a scope.$apply
        // to trigger an Angular digest cycle appropriately.
        var defineHandler = _.ngReactFormat(
          'var {0} = {1}; var handler = scope.$apply.bind(scope, scope.{2}.bind(null, {3}));',
          [
            scope.alias,
            JSON.stringify(data),
            fnName,
            fnParams
          ]
        );

        // Evaluate and set the onClick parameter to our defined "handler" variable
        eval(defineHandler);
        attrs.onClick = handler;
      }
    }, {
      name : 'id'
    }, {
      name         : 'ng-bind',
      // - If we need to convert to a value (not an attribute), as is the case of ng-bind where we want
      // to render some text, the convertValue function needs to be implemented. It should have the signature
      // (attrs, scope, data) to match convertAttribute.
      convertValue : function(attrs, scope, data) {

        if (!attrs['ng-bind']) {
          return;
        }

        // Create a String that we can evaluate to arrive at the true value.
        var defineValue = _.ngReactFormat(
          'var {0} = {1}; var value = {2};',
          [
            scope.alias,
            JSON.stringify(data),
            _.ngReactBracketNotation(attrs['ng-bind'])
          ]
        );

        // Evaluate and return the "value" parameter, set within the defineValue String above.
        eval(defineValue);
        return value;
      }
    }
  ];

  // **getAttributes**: Extracts all of the supported attributes off of the document object and returns them
  // in an object.
  var getAttributes = function(el) {
    var toReturn = {};

    _.each(propertiesToKeep, function(property) {
      var attr = _.findWhere(_.values(el.attributes), {localName : property.attrName || property.name});
      if (attr) {
        toReturn[property.propName || property.name] = attr.value;
      }
    });

    return toReturn;
  };

  // **convertAttributes**: Iterates through all of the entries in propertiesToKeep and calls their
  // convertAttribute function (if implemented), which will transform the attribute into what it should be.
  // For example, something like ```<div ng-click="function()"></div>``` will have an attrs of
  // ```{ onClick: "function()"}``` before and an ```{ onClick: function() { scope.apply.bind(...); }}```
  // afterwards.
  var convertAttributes = function(attrs, scope, data) {
    _.each(attrs, function(value, key) {
      var property = _.findWhere(propertiesToKeep, {propName: key});
      if (property && property.convertAttribute) {
        property.convertAttribute(attrs, scope, data);
      }
    });
  };

  // **convertValues**: Iterates through all of the entries in propertiesToKeep and calls their
  // convertValue function (if implemented), which will transform what was stored as an attribute into its
  // proper value.
  // For example, something like ```<div ng-bind="person.name"></div>``` will have an attrs of
  // ```{ ng-bind: "person.name"}``` before and translate to something like ```["fred"]``` afterwards.
  var convertValues = function(attrs, scope, data) {
    return _.compact(_.map(attrs, function(value, key) {
      var property = _.findWhere(propertiesToKeep, {name: key});
      if (property && property.convertValue) {
        return property.convertValue(attrs, scope, data);
      }
    }));
  };

  var NgReactClasses = {
    // reactUnit
    // ---------
    // A React class meant to be called on a single DOM element and able to recurse through its
    // children. It will return a React DOM node. It expects the following properties:
    // - data - The data available to the Angular scope
    // - scope - The Angular Scope
    // - domEl - The DOM element it is transforming
    reactUnit : React.createClass({
      render: function() {

        var data = this.props.data,
          scope = this.props.scope,
          domEl = this.props.domEl;

        // Recurse through the children.
        var childrenNodes = _.compact(_.map(domEl.children, function(child) {
          // Everything needs to be in an element or it will be ignored!
          if (!child.localName) return;

          return NgReactClasses.reactUnit({
            scope : scope,
            data  : data,
            domEl : child
          });
        }));

        var attrs = getAttributes(domEl);
        convertAttributes(attrs, scope, data);

        var vals = convertValues(attrs, scope, data);
        // If there was ```<span ng-bind="person.name">Person.name will be here</span>```,
        // the ng-bind will take precedence and the inner text will not be rendered
        if (!(vals.length && domEl.localName)) {
          // Basically look only for text that is a direct descendant of domEl
          // but doesn't exist in a tag (which will be caught recursively later)
          _.each(domEl.innerHTML.split(overlySimplifiedHTMLMatcher), function(text) {
            // Only matching for text and whitespace
            if (text.match(textAndWhitespaceRegex)) {
              vals.push(text);
            }
          });
        }

        return React.DOM[domEl.localName].apply(
          null,
          [attrs].concat(
            vals,
            childrenNodes
          )
        );
      }
    }),
    // reactRepeatUnit
    // ---------------
    // A React class repesenting a single "row" in or iteration of a repeat.
    // It will return a React DOM node. It expects the following properties:
    // - data - The data available to the Angular scope
    // - scope - The Angular Scope
    // - domEl - The DOM element it is transforming
    reactRepeatUnit : React.createClass({
      render: function() {

        var data = this.props.data,
          scope = this.props.scope;

        var rowTranscluded = _.compact(_.map(this.props.transcludedDom, function(domEl) {
          // Everything needs to be in an element or it will be ignored!
          if (!domEl.localName) return;

          var unitFn = NgReactClasses.reactUnit({
            scope : scope,
            data  : data,
            domEl : domEl
          });
          return unitFn;
        }));

        var attrs = getAttributes(this.props.rootUnit);
        convertAttributes(attrs, scope, data);

        return React.DOM[this.props.rootUnit.localName].apply(
          null,
          [attrs].concat(
            convertValues(attrs, scope, data),
            rowTranscluded
          )
        );
      }
    }),
    // reactRepeat
    // -----------
    // React component that will create a root container element and append into itself multiple
    // ReactRepeatUnit components, each representing an iteration of data in the collection passed.
    // It will return a React DOM node. It expects the following properties:
    // - data - The data available to the Angular scope
    // - scope - The Angular Scope
    // - rootUnit - The root element on which the ngReactRepeat directive is placed
    // - transcluded - The transcluded DOM; basically, the DOM that will be represented by ReactRepeatUnit; this
    // is everything contained in the rootUnit
    reactRepeat : React.createClass({
      render: function() {

        var scope = this.props.scope,
          rootUnit = this.props.rootUnit,
          transcludedDom = this.props.transcluded,
          rows = _.map(scope.data, function(datum) {
            // For each row, generate a ReactRepeatUnit component
            return NgReactClasses.reactRepeatUnit({
              scope          : scope,
              data           : datum,
              transcludedDom : transcludedDom,
              rootUnit       : rootUnit
            });
          });

        // Here, rootUnit.parentElement.localName is the rootUnit's parent (like a tbody),
        // and rootUnit.localName is the rootUnit (like a tr)
        return React.DOM[rootUnit.parentElement.localName].apply(
          null,
          [getAttributes(rootUnit.parentElement)].concat(rows)
        );
      }
    })
  };

  return NgReactClasses;

})();


// NgReact Angular Module
// ----------------------
// The Angular module that will hold directives that will make use of our NgReact utils.
angular.module('ngReact', [])
  // **The ngReactRepeat directive**
  .directive('ngReactRepeat', ['$timeout', function ($timeout) {
    return {
      restrict: 'A',
      transclude: true,
      replace: true,
      controller: [
        '$scope', '$element', '$attrs', '$transclude',
        function ($scope, $element, $attrs, $transclude) {

          // Expect the form ```<tr ng-react-repeat="row in data">```
          var pieces = $attrs['ngReactRepeat'].split(' in ');
          if (pieces.length !== 2) {
            throw new Error('ngReactRepeat expected "alias in collection" format');
          }

          $scope.alias = pieces[0];

          // Remember the parent reference, as this is the mount node for the ReactRepeat component we're creating
          var parentReference = $element[0].offsetParent;

          $transclude(function(transcludedDom) {
            // Keep an eye on the data object so that if it changes, we can re-render the React component.
            $scope.$watch(pieces[1], function(val) {

              $timeout(function() {

                // Render the React Component, passing in the scope, transcluded DOM, and the root unit
                // (not readily available from the transcluded DOM)
                React.renderComponent(
                  NgReact.reactRepeat({
                    scope       : $scope,
                    transcluded : transcludedDom,
                    rootUnit    : $element[0]
                  }),
                  parentReference
                );

              });
            }, true);
          });
        }
      ]
    };
  }])
  .directive('ngReactComponent', ['$timeout', function ($timeout) {
    return {
      restrict: 'A',
      link: function (scope, elem, attrs) {

        if (!attrs.ngReactComponent) {
          throw new Error('ngReactComponent expected attribute to be the name of a react component');
        }

        var renderComponent = function() {
          $timeout(function() {
            React.renderComponent(
              // For now, expect the React Component to be globally available on window
              window[attrs.ngReactComponent]({
                scope: scope
              }),
              elem[0]
            );
          });
        };

        // attrs.data is optional
        if (attrs.data) {
          scope.$watch(attrs.data, renderComponent, true);
        } else {
          renderComponent();
        }
      }
    }
  }]);