// # ngReact
// ### Use React Components inside of your Angular applications
//
// Composed of
// - reactComponent (generic directive for delegating off to React Components)
// - reactDirective (factory for creating specific directives that correspond to reactComponent directives)


(function (root, factory) {
  if (typeof module !== 'undefined' && module.exports) {
    // CommonJS
    module.exports = factory(require('react'), require('angular'));
  } else if (typeof define === 'function' && define.amd) {
    // AMD
    define(['react', 'angular'], function (react, angular) {
      return (root.ngReact = factory(react, angular));
    });
  } else {
    // Global Variables
    root.ngReact = factory(root.React, root.angular);
  }
}(this, function ngReact(React, angular) {
  'use strict';

  // get a react component from name (components can be an angular injectable e.g. value, factory or
  // available on window
  function getReactComponent( name, $injector ) {
    // if name is a function assume it is component and return it
    if (angular.isFunction(name)) {
      return name;
    }

    // a React component name must be specified
    if (!name) {
      throw new Error('ReactComponent name attribute must be specified');
    }

    // ensure the specified React component is accessible, and fail fast if it's not
    var reactComponent;
    try {
      reactComponent = $injector.get(name);
    } catch(e) { }

    if (!reactComponent) {
      try {
        reactComponent = name.split('.').reduce(function(current, namePart) {
          return current[namePart];
        }, window);
      } catch (e) { }
    }

    if (!reactComponent) {
      throw Error('Cannot find react component ' + name);
    }

    return reactComponent;
  }

  // wraps a function with scope.$apply, if already applied just return
  function applied(fn, scope) {
    if (fn.wrappedInApply) {
      return fn;
    }
    return function() {
      var args = arguments;
      scope.$apply(function() {
        fn.wrappedInApply = true;
        fn.apply( null, args );
      });
    };
  }

  // wraps all functions on obj in scope.$apply
  function applyFunctions(obj, scope) {
    return Object.keys(obj || {}).reduce(function(prev,key) {
      var value = obj[key];
      // wrap functions in a function that ensures they are scope.$applied
      // ensures that when function is called from a React component
      // the Angular digest cycle is run
      prev[key] = angular.isFunction(value) ? applied(value, scope) : value;
      return prev;
    }, {});
  }

  /**
   *
   * @param watchDepth (value of HTML watch-depth attribute)
   * @param scope (angular scope)
   *
   * Uses the watchDepth attribute to determine how to watch props on scope.
   * If watchDepth attribute is NOT reference or collection, watchDepth defaults to deep watching by value
   */
  function watchProps (watchDepth, scope){
    var args = Array.prototype.slice.call(arguments, 2);
    var watchFn;

    //default watchDepth to value if not reference or collection
    if (watchDepth === 'collection' && angular.isFunction(scope.$watchCollection)) {
      watchFn = '$watchCollection';
    } else {
      watchFn = '$watch';
      if (watchDepth !== 'reference') {
        args.push(true);
      }
    }

    scope[watchFn].apply(scope, args);
  }

  // render React component, with scope[attrs.props] being passed in as the component props
  function renderComponent(component, props, $timeout, elem) {
    $timeout(function() {
      React.render(React.createElement(component, props), elem[0]);
    });
  }

  // # reactComponent
  // Directive that allows React components to be used in Angular templates.
  //
  // Usage:
  //     <react-component name="Hello" props="name"/>
  //
  // This requires that there exists an injectable or globally available 'Hello' React component.
  // The 'props' attribute is optional and is passed to the component.
  //
  // The following would would create and register the component:
  //
  //     /** @jsx React.DOM */
  //     var module = angular.module('ace.react.components');
  //     module.value('Hello', React.createClass({
  //         render: function() {
  //             return <div>Hello {this.props.name}</div>;
  //         }
  //     }));
  //
  var reactComponent = function($timeout, $injector) {
    return {
      restrict: 'E',
      replace: true,
      link: function(scope, elem, attrs) {
        var reactComponent = getReactComponent(attrs.name, $injector);

        var renderMyComponent = function() {
          var scopeProps = scope.$eval(attrs.props);
          var props = applyFunctions(scopeProps, scope);

          renderComponent(reactComponent, props, $timeout, elem);
        };

        // If there are props, re-render when they change
        attrs.props ?
            watchProps(attrs.watchDepth, scope, attrs.props, renderMyComponent) :
          renderMyComponent();

        // cleanup when scope is destroyed
        scope.$on('$destroy', function() {
          React.unmountComponentAtNode(elem[0]);
        });
      }
    };
  };

  // # reactDirective
  // Factory function to create directives for React components.
  //
  // With a component like this:
  //
  //     /** @jsx React.DOM */
  //     var module = angular.module('ace.react.components');
  //     module.value('Hello', React.createClass({
  //         render: function() {
  //             return <div>Hello {this.props.name}</div>;
  //         }
  //     }));
  //
  // A directive can be created and registered with:
  //
  //     module.directive('hello', function(reactDirective) {
  //         return reactDirective('Hello', ['name']);
  //     });
  //
  // Where the first argument is the injectable or globally accessible name of the React component
  // and the second argument is an array of property names to be watched and passed to the React component
  // as props.
  //
  // This directive can then be used like this:
  //
  //     <hello name="name"/>
  //
  var reactDirective = function($timeout, $injector) {
    return function(reactComponentName, propNames, conf) {
      var directive = {
        restrict: 'E',
        replace: true,
        link: function(scope, elem, attrs) {
          var reactComponent = getReactComponent(reactComponentName, $injector);

          // if propNames is not defined, fall back to use the React component's propTypes if present
          propNames = propNames || Object.keys(reactComponent.propTypes || {});

          // for each of the properties, get their scope value and set it to scope.props
          var renderMyComponent = function() {
            var props = {};
            propNames.forEach(function(propName) {
              props[propName] = scope.$eval(attrs[propName]);
            });
            renderComponent(reactComponent, applyFunctions(props, scope), $timeout, elem);
          };

          // watch each property name and trigger an update whenever something changes,
          // to update scope.props with new values
          propNames.forEach(function(k) {
            watchProps(attrs.watchDepth, scope, attrs[k], renderMyComponent);
          });

          renderMyComponent();

          // cleanup when scope is destroyed
          scope.$on('$destroy', function() {
            React.unmountComponentAtNode(elem[0]);
          });
        }
      };
      return angular.extend(directive, conf);
    };
  };

  // create the end module without any dependencies, including reactComponent and reactDirective
  return angular.module('react', [])
    .directive('reactComponent', ['$timeout', '$injector', reactComponent])
    .factory('reactDirective', ['$timeout','$injector', reactDirective]);
}));
