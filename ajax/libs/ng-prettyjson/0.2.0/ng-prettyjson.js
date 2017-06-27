(function(angular) {
'use strict';

angular.module('ngPrettyJson', [])
.directive('prettyJson', ['$compile', '$templateCache', 'ngPrettyJsonFunctions', 
  function (compile, templateCache, ngPrettyJsonFunctions) {

  var isDefined = angular.isDefined;

  return {    
    restrict: 'AE',
    scope: {
      json: '=',
      prettyJson: '=',
      onEdit: '&'
    },
    template: '<div></div>',
    replace: true,      
    link: function (scope, elm, attrs) {
      var currentValue = {}, editor = null, clonedElement = null;

      scope.id = attrs.id || 'prettyjson';

      scope.editActivated = false;
      scope.edition = attrs.edition;
      scope.aceEditor = window.ace !== undefined;    

      // compile template
      var e = compile(templateCache.get('ng-prettyjson/ng-prettyjson-panel.tmpl.html'))(scope, function(clonedElement, scope) {          
        scope.tmplElt = clonedElement;        
      });
      
      elm.removeAttr("id");
      elm.append(e);

      // prefer the "json" attribute over the "prettyJson" one.
      // the value on the scope might not be defined yet, so look at the markup.
      var exp = isDefined(attrs.json) ? 'json' : 'prettyJson',
      highlight = function highlight(value) {
        var html = ngPrettyJsonFunctions.syntaxHighlight(value) || "";
        html = html
        .replace(/\{/g, "<span class='sep'>{</span>")
        .replace(/\}/g, "<span class='sep'>}</span>")
        .replace(/\[/g, "<span class='sep'>[</span>")
        .replace(/\]/g, "<span class='sep'>]</span>")
        .replace(/\,/g, "<span class='sep'>,</span>");                        
        return isDefined(value) ? scope.tmplElt.find('pre').html(html) : scope.tmplElt.find('pre').empty();
      },
      objWatch;

      objWatch = scope.$watch(exp, function (newValue) {
        // BACKWARDS COMPATIBILITY:
        // if newValue is an object, and we find a `json` property,
        // then stop watching on `exp`.
        if (angular.isObject(newValue) && isDefined(newValue.json)) {
          objWatch();
          scope.$watch(exp + '.json', function (newValue) {
            if (!scope.editActivated) highlight(newValue);
            currentValue = newValue;
          }, true);
        }
        else {                      
          if (!scope.editActivated) highlight(newValue);            
          currentValue = newValue;
        }
        if (editor) {
          editor.removeListener('change', editChanges);
          editor.setValue(JSON.stringify(newValue, null, '\t'));
          editor.on('change', editChanges);
          editor.resize();
        }
      }, true);

      var editChanges = function(e) {                    
        try {
          currentValue = JSON.parse(editor.getValue());
          scope.parsable = true;
        }
        catch (error) {scope.parsable = false;}  

        // trigger update
        scope.$apply(function () {});
      };
      var valueBeforeEdition = currentValue;
      scope.edit = function() { 
        if (!scope.aceEditor) {
          if (console)
            console.log('\'ace lib is missing\'');
          return;
        }

        if (!scope.editActivated) {     
          valueBeforeEdition = currentValue;
          editor = ace.edit(scope.id);
          editor.setAutoScrollEditorIntoView(true);    
          editor.setOptions({maxLines: Infinity});
          editor.on('change', editChanges);                        
          editor.getSession().setMode("ace/mode/json");                        
        }
        else {
          if (editor) { document.getElementById(scope.id).env = null; }
          highlight(valueBeforeEdition);
          currentValue = valueBeforeEdition;
          scope.parsable = false;
        }
        scope.editActivated = !scope.editActivated;
      };

      scope.update = function() {
        scope[exp] = currentValue;
        scope.$emit('json-updated', currentValue);
        if (scope.onEdit)
          scope.onEdit({newJson: currentValue});
        this.edit();
      };

      
    }
  };
}])
// mostly we want to just expose this stuff for unit testing; if it's within the directive's
// function scope, we can't get to it.
.factory('ngPrettyJsonFunctions', function ngPrettyJsonFunctions() {

  // cache some regular expressions
  var rx = {
    entities: /((&)|(<)|(>))/g,
    json: /"(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|(null))\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g
  };

  // mapping of chars to entities
  var entities = ['&amp;','&lt;','&gt;'];

  // lookup of positional regex matches in rx.json to CSS classes
  var classes = ['number','string','key','boolean','null'];

  /**
   * @description Used by {@link makeEntities} and {@link markup}.  Expects all arguments
   * to be nonempty strings.
   * @private
   * @returns {number} Index of last nonempty string argument in list of arguments.
   */
   var reverseCoalesce = function reverseCoalesce() {
    var i = arguments.length - 2;
    do {
      i--;
    } while (!arguments[i]);
    return i;
  };

  /**
   * @description Callback to String.prototype.replace(); marks up JSON string
   * @param {string|number} match Any one of the below, or if none of the below, it's a number
   * @returns {string} Marked-up JSON string
   */
   var markup = function markup(match) {
    var idx;
      // the final two arguments are the length, and the entire string itself;
      // we don't care about those.
      if (arguments.length < 7) {
        throw new Error('markup() must be called from String.prototype.replace()');
      }
      idx = reverseCoalesce.apply(null, arguments);
      return '<span class="' + classes[idx] + '">' + match + '</span>';
    };

  /**
   * @description Finds chars in string to turn into entities for HTML output.
   * @returns {string} Entity-ized string
   */
   var makeEntities = function makeEntities() {
    var idx;
    if (arguments.length < 5) {
      throw new Error('makeEntities() must be called from String.prototype.replace()');
    }
    idx = reverseCoalesce.apply(null, arguments);
    return entities[idx - 2];
  };

  /**
   * @description Does some regex matching to sanitize for HTML and finally returns a bunch of
   * syntax-highlighted markup.
   * @param {*} json Something to be output as pretty-printed JSON
   * @returns {string|undefined} If we could convert to JSON, you get markup as a string, otherwise
   * no return value for you.
   */
   var syntaxHighlight = function syntaxHighlight(json) {
    if (!angular.isString(json))
      json = JSON.stringify(json, null, 2);
    if (angular.isDefined(json)) {
      return json.replace(rx.entities, makeEntities)
      .replace(rx.json, markup);
    }
  };

  return {
    syntaxHighlight: syntaxHighlight,
    makeEntities: makeEntities,
    markup: markup,
    rx: rx
  };
});

})(window.angular);
