/**
 * No box-sizing, such a shame
 *
 * 1.Calculate outer height
 * @param   bool    Include margin
 * @returns Number  Height in pixels
 *
 * 2. Set outer height
 * @param   Number          Height in pixels
 * @param   bool            Include margin
 * @returns angular.element Collection
 */
if (typeof angular.element.prototype.outerHeight !== 'function') {

angular.element.prototype.outerHeight = function() {
  function parsePixels(cssString) {
    if (cssString.slice(-2) === 'px') {
      return parseFloat(cssString.slice(0, -2));
    }
    return 0;
  }

  var includeMargin = false, height, $element = this.eq(0), element = $element[0];

  if (arguments[0] === true || arguments[0] === false || arguments[0] === undefined) {
    if (!$element.length) {
      return 0;
    }

    includeMargin = arguments[0] && true || false;

    if (element.outerHeight) {
      height = element.outerHeight;
    } else {
      height = element.offsetHeight;
    }
    if (includeMargin) {
      height += parsePixels($element.css('marginTop')) + parsePixels($element.css('marginBottom'));
    }
    return height;

  } else {
    if (!$element.length) {
      return this;
    }

    height = parseFloat(arguments[0]);

    includeMargin = arguments[1] && true || false;

    if (includeMargin) {
      height -= parsePixels($element.css('marginTop')) + parsePixels($element.css('marginBottom'));
    }

    height -= parsePixels($element.css('borderTopWidth')) + parsePixels($element.css('borderBottomWidth')) +
        parsePixels($element.css('paddingTop')) + parsePixels($element.css('paddingBottom'));

    $element.css('height', height + 'px');
    return this;
  }
};

}

angular.module('ngWig', ['ngwig-app-templates']);

angular.module('ngWig').directive('ngWig', function () {

      return {
        scope: {
          content: '=ngWig',
          debug: '&',
          cssPath: '@'
        },
        restrict: 'A',
        replace: true,
        templateUrl: 'ng-wig/views/ng-wig.html',
        link: function (scope, element, attrs) {

          scope.originalHeight = element.outerHeight();
          scope.editMode = false;
          scope.autoexpand = !('autoexpand' in attrs) || attrs['autoexpand'] !== 'off';
          scope.cssPath = scope.cssPath ? scope.cssPath : 'css/ng-wig.css';

          scope.toggleEditMode = function() {
            scope.editMode = !scope.editMode;
          };

          scope.execCommand = function (command, options) {
            if(command ==='createlink'){
              options = prompt('Please enter the URL', 'http://');
            }
            scope.$emit('execCommand', {command: command, options: options});
          };

          scope.resizeEditor = function(height) {
            var children = element.children();
            for (var i in children) {
              var child = children.eq(i);
              if (child.hasClass('nw-editor')) {
                child.outerHeight(height);
                break;
              }
            }

          }
        }
      }
    }
);


angular.module('ngWig').directive('ngWigEditable', function () {
      function init(scope, $element, attrs, ctrl) {
        var $document = $element[0].contentDocument,
            $body;
        $document.open();
        $document.write('<!DOCTYPE html><html><head>'+ (scope.cssPath ? ('<link href="'+ scope.cssPath +'" rel="stylesheet" type="text/css">') : '') + '</head><body contenteditable="true"></body></html>');
        $document.close();

        $body = angular.element($element[0].contentDocument.body);

        //model --> view
        ctrl.$render = function () {
          $body[0].innerHTML = ctrl.$viewValue || '';
        };

        //view --> model
        $body.bind('blur keyup change paste', function () {
          resizeEditor();
          scope.$apply(function blurkeyup() {
            ctrl.$setViewValue($body.html());
          });
        });

        scope.$on('execCommand', function (event, params) {
          var sel = $document.selection,
              command = params.command,
              options = params.options;
          if (sel) {
            var textRange = sel.createRange();
            $document.execCommand(command, false, options);
            textRange.collapse(false);
            textRange.select();
          }
          else {
            $document.execCommand(command, false, options);
          }
          $document.body.focus();
          //sync
          scope.$evalAsync(function () {
            ctrl.$setViewValue($body.html());
            resizeEditor();
          });
        });

        function resizeEditor() {
          if (!scope.autoexpand) {
            var height = scope.originalHeight;
          } else {
            height = angular.element($document.documentElement).outerHeight();
          }
          scope.resizeEditor(height);
        }

        scope.$watch('autoexpand', resizeEditor);
        scope.$watch('editMode', function(oldMode, newMode) {
          if (newMode) {
            resizeEditor();
          }
        });
      }

      return {
        restrict: 'A',
        require: 'ngModel',
        replace: true,
        link: init
      }
    }
);

angular.module('ngwig-app-templates', ['ng-wig/views/ng-wig.html']);

angular.module("ng-wig/views/ng-wig.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("ng-wig/views/ng-wig.html",
    "<div class=\"ng-wig\">\n" +
    "  <ul class=\"nw-toolbar\">\n" +
    "    <li class=\"nw-toolbar__item\">\n" +
    "      <button type=\"button\" class=\"nw-button nw-button--header-one\" title=\"Header\" ng-click=\"execCommand('formatblock', '<h1>')\"></button>\n" +
    "    </li><!--\n" +
    "    --><li class=\"nw-toolbar__item\">\n" +
    "      <button type=\"button\" class=\"nw-button nw-button--paragraph\" title=\"Paragraph\" ng-click=\"execCommand('formatblock', '<p>')\"></button>\n" +
    "    </li><!--\n" +
    "    --><li class=\"nw-toolbar__item\">\n" +
    "      <button type=\"button\" class=\"nw-button nw-button--unordered-list\" title=\"Unordered List\" ng-click=\"execCommand('insertunorderedlist')\"></button>\n" +
    "    </li><!--\n" +
    "    --><li class=\"nw-toolbar__item\">\n" +
    "      <button type=\"button\" class=\"nw-button nw-button--ordered-list\" title=\"Ordered List\" ng-click=\"execCommand('insertorderedlist')\"></button>\n" +
    "    </li><!--\n" +
    "    --><li class=\"nw-toolbar__item\">\n" +
    "      <button type=\"button\" class=\"nw-button nw-button--bold\" title=\"Bold\" ng-click=\"execCommand('bold')\"></button>\n" +
    "    </li><!--\n" +
    "    --><li class=\"nw-toolbar__item\">\n" +
    "      <button type=\"button\" class=\"nw-button nw-button--italic\" title=\"Italic\" ng-click=\"execCommand('italic')\"></button>\n" +
    "    </li><!--\n" +
    "    --><li class=\"nw-toolbar__item\">\n" +
    "      <button type=\"button\" class=\"nw-button nw-button--link\" title=\"link\" ng-click=\"execCommand('createlink')\"></button>\n" +
    "    </li><!--\n" +
    "    --><li class=\"nw-toolbar__item\">\n" +
    "      <button type=\"button\" class=\"nw-button nw-button--source\" ng-class=\"{ 'nw-button--active': editMode }\" ng-click=\"toggleEditMode()\"></button>\n" +
    "    </li>\n" +
    "  </ul>\n" +
    "\n" +
    "  <div class=\"nw-editor\">\n" +
    "    <textarea class=\"nw-editor__src\" ng-show=\"editMode\" ng-model=\"content\"></textarea>\n" +
    "    <iframe scrolling=\"{{ autoexpand ? 'no' : 'yes' }}\" class=\"nw-editor__res\" frameBorder=\"0\" ng-hide=\"editMode\" ng-model=\"content\" ng-wig-editable></iframe>\n" +
    "  </div>\n" +
    "</div>\n" +
    "");
}]);
