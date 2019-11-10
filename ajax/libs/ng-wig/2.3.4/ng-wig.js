/**
 * version: 2.3.4
 */
angular.module('ngWig', ['ngwig-app-templates']);

angular.module('ngWig')
  .directive('ngWig', ["$window", "$document", "ngWigToolbar", function ($window, $document, ngWigToolbar) {

    return {
      scope: {
        content: '=ngWig',
        onPaste: '='
      },
      restrict: 'A',
      replace: true,
      templateUrl: 'ng-wig/views/ng-wig.html',
      link: function (scope, element, attrs) {
        scope.formElementName = attrs.name;
        element.removeAttr('name');

        scope.isRequired = !!attrs.required;
        scope.isSourceModeAllowed = Object.keys(attrs).indexOf('sourceModeAllowed') !== -1 ? true : false;
        scope.editMode = false;
        scope.toolbarButtons = ngWigToolbar.getToolbarButtons(attrs.buttons && string2array(attrs.buttons));

        function string2array(keysString){
          return keysString.split(',').map(Function.prototype.call, String.prototype.trim);
        }

        scope.toggleEditMode = function () {
          scope.editMode = !scope.editMode;

          if ($window.getSelection().removeAllRanges) {
            $window.getSelection().removeAllRanges();
          }
        };

        scope.execCommand = function (command, options) {
          if(scope.editMode ) return false;

          if (command === 'createlink') {
            options = prompt('Please enter the URL', 'http://');
            if(!options) {
              return;
            }
          }
          scope.$broadcast('execCommand', {command: command, options: options});
        };
		
		if (attrs.ngDisabled != null || attrs.disabled != null) {
			scope.$watch(function() { return !!attrs.disabled; }, function(isDisabled) {
				scope.isDisabled = isDisabled;
				scope.$broadcast('nw-disabled', isDisabled);
			});	
		}
      }
    }
  }]
);


angular.module('ngWig')
  .directive('ngWigEditable', ["$document", function ($document) {
    function init(scope, $element, attrs, ngModelController) {

      $element.attr('contenteditable', true);

      //model --> view
      ngModelController.$render = function () {
        $element.html(ngModelController.$viewValue || '');
      };

      //view --> model
      function viewToModel() {
        ngModelController.$setViewValue($element.html());
      }

      var eventsToBind = [
        'blur',
        'keyup',
        'change',
        'focus',
        'click'
      ];

      if (angular.isFunction(scope.onPaste)) {
        $element.on('paste', function(e) {
          scope.onPaste(e, $element.html()).then(function(val) {
            $element.html(val);
          })
        });
      }else{
        eventsToBind.push('paste');
      }

      $element.bind(eventsToBind.join(' '), function() {
        viewToModel();
        scope.$applyAsync();
      });

      scope.isEditorActive = function () {
        return $element[0] === $document[0].activeElement;
      };

      scope.$on('execCommand', function (event, params) {
        $element[0].focus();

        var ieStyleTextSelection = $document[0].selection,
          command = params.command,
          options = params.options;

        if (ieStyleTextSelection) {
          var textRange = ieStyleTextSelection.createRange();
        }

        if ($document[0].queryCommandSupported && !$document[0].queryCommandSupported(command)) {
          throw 'The command "' + command + '" is not supported';
        }

        $document[0].execCommand(command, false, options);

        if (ieStyleTextSelection) {
          textRange.collapse(false);
          textRange.select();
        }

        viewToModel();
      });
	  
	  scope.$on('nw-disabled', function(event, isDisabled) {
		  $element.attr('contenteditable', !isDisabled);
	  });
    }

    return {
      restrict: 'A',
      require: 'ngModel',
      replace: true,
      link: init
    }
  }]
);

angular.module('ngWig')
    .directive('ngWigPlugin', ["$compile", function ($compile) {
        return {
            restrict: 'E',
            link: function(scope, element) {
                var template = '<' + scope.button.pluginName + ' />',
                    compiled = $compile(template)(scope);

                element.replaceWith(compiled);
            }
        }
    }]);

angular.module('ngWig').provider('ngWigToolbar', function () {

  var buttonLibrary = {
    list1: {title: 'Unordered List', command: 'insertunorderedlist', styleClass: 'list-ul'},
    list2: {title: 'Ordered List', command: 'insertorderedlist', styleClass: 'list-ol'},
    bold: {title: 'Bold', command: 'bold', styleClass: 'bold'},
    italic: {title: 'Italic', command: 'italic', styleClass: 'italic'},
    link: {title: 'Link', command: 'createlink', styleClass: 'link'}
  };

  var defaultButtonsList = ['list1', 'list2', 'bold', 'italic', 'link'];

  var isButtonActive = function () {
    return this.command && document.queryCommandState(this.command);
  };

  this.setButtons = function(buttons) {
    if(!angular.isArray(buttons)) {
      throw 'Argument "buttons" should be an array';
    }

    defaultButtonsList = buttons;
  };

  this.addStandardButton = function (name, title, command, styleClass) {
    if(!name || !title || !command) {
      throw 'Arguments "name", "title" and "command" are required';
    }

    styleClass = styleClass || '';
    buttonLibrary[name] = {title: title, command: command, styleClass: styleClass}
    defaultButtonsList.push(name);
  };

  this.addCustomButton = function (name, pluginName) {
    if(!name || !pluginName) {
      throw 'Arguments "name" and "pluginName" are required';
    }

    buttonLibrary[name] = {pluginName: pluginName, isComplex: true};
    defaultButtonsList.push(name);
  };

  this.$get = function () {
    return {
      getToolbarButtons: function(list) {
        var toolbarButtons = [];
        (list || defaultButtonsList).forEach(function(buttonKey) {
          if(!buttonLibrary[buttonKey]) {
            throw 'There is no "' + buttonKey + '" in your library. Possible variants: ' + Object.keys(buttonLibrary);
          }

          var button = angular.copy(buttonLibrary[buttonKey]);

          if(!angular.isFunction(button.isActive)) {
            button.isActive = isButtonActive;
          }

          toolbarButtons.push(button);
        });
        return toolbarButtons;
      }
    };
  };


});
angular.module('ngWig')
    .config(['ngWigToolbarProvider', function (ngWigToolbarProvider) {
       ngWigToolbarProvider.addCustomButton('formats', 'nw-formats-button');
    }])
    .directive('nwFormatsButton', function() {
        return {
            restrict: 'E',
            replace: true,
            template: '<select class="nw-select" ng-model="format" ng-change="execCommand(\'formatblock\', format.value)" ng-options="format.name for format in formats" ng-disabled="editMode || isDisabled"></select>',
            link: function (scope) {
                scope.formats = [
                    {name: 'Normal text', value: 'p'},
                    {name: 'Header 1', value: 'h1'},
                    {name: 'Header 2', value: 'h2'},
                    {name: 'Header 3', value: 'h3'}
                ];

                scope.format = scope.formats[0];
            }
        };
    });


angular.module('ngwig-app-templates', ['ng-wig/views/ng-wig.html']);

angular.module("ng-wig/views/ng-wig.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("ng-wig/views/ng-wig.html",
    "<div class=\"ng-wig\">\n" +
    "  <ul class=\"nw-toolbar\">\n" +
    "    <li class=\"nw-toolbar__item\" ng-repeat=\"button in toolbarButtons\" >\n" +
    "        <div ng-if=\"!button.isComplex\">\n" +
    "          <button type=\"button\" class=\"nw-button {{button.styleClass}}\" title=\"{{button.title}}\" ng-click=\"execCommand(button.command)\" ng-class=\"{ 'nw-button--active': isEditorActive() && button.isActive() }\" ng-disabled=\"editMode || isDisabled\">\n" +
    "            {{ button.title }}\n" +
    "          </button>\n" +
    "        </div>\n" +
    "        <div ng-if=\"button.isComplex\">\n" +
    "          <ng-wig-plugin plugin=\"{{button}}\"></ng-wig-plugin>\n" +
    "        </div>\n" +
    "    </li><!--\n" +
    "    --><li class=\"nw-toolbar__item\">\n" +
    "      <button type=\"button\" class=\"nw-button nw-button--source\" title=\"Edit HTML\" ng-class=\"{ 'nw-button--active': editMode }\" ng-show=\"isSourceModeAllowed\" ng-click=\"toggleEditMode()\" ng-disabled=\"isDisabled\">\n" +
    "        Edit HTML\n" +
    "      </button>\n" +
    "    </li>\n" +
    "  </ul>\n" +
    "\n" +
    "  <div class=\"nw-editor-container\">\n" +
    "    <div class=\"nw-editor__src-container\" ng-show=\"editMode\">\n" +
    "      <textarea ng-required=\"isRequired\" ng-disabled=\"isDisabled\" class=\"nw-editor__src\" ng-model=\"content\"></textarea>\n" +
    "    </div>\n" +
    "    <div class=\"nw-editor\" ng-class=\"{ 'nw-disabled': isDisabled }\">\n" +
    "      <div name=\"{{formElementName}}\" ng-required=\"isRequired\" tabindex=\"-1\" ng-class=\"{'nw-invisible': editMode}\" class=\"nw-editor__res\" ng-model=\"content\" ng-wig-editable on-paste=\"onPaste\"></div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n" +
    "");
}]);
