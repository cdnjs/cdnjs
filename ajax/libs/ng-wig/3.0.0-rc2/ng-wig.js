'use strict';

/**
 * version: 3.0.0-rc1
 */
angular.module('ngWig', ['ngwig-app-templates']);
angular.ngWig = {
  version: '3.0.0-rc1'
};

angular.module('ngWig').component('ngWigPlugin', {
  bindings: {
    plugin: '<',
    execCommand: '=',
    editMode: '=',
    disabled: '='
  },
  controller: ["$scope", "$element", "$compile", function ($scope, $element, $compile) {
    $element.replaceWith($compile('<' + this.plugin.pluginName + ' ' + 'plugin=' + '"$ctrl.plugin"' + 'exec-command=' + '"$ctrl.execCommand"' + 'edit-mode=' + '"$ctrl.editMode"' + 'disabled=' + '"$ctrl.disabled"' + '/>')($scope));
  }]
});
angular.module('ngWig').provider('ngWigToolbar', function () {

  var buttonLibrary = {
    list1: { title: 'Unordered List', command: 'insertunorderedlist', styleClass: 'list-ul' },
    list2: { title: 'Ordered List', command: 'insertorderedlist', styleClass: 'list-ol' },
    bold: { title: 'Bold', command: 'bold', styleClass: 'bold' },
    italic: { title: 'Italic', command: 'italic', styleClass: 'italic' },
    link: { title: 'Link', command: 'createlink', styleClass: 'link' }
  };

  var defaultButtonsList = ['list1', 'list2', 'bold', 'italic', 'link'];

  var isButtonActive = function isButtonActive() {
    return this.command && document.queryCommandState(this.command);
  };

  this.setButtons = function (buttons) {
    if (!angular.isArray(buttons)) {
      throw 'Argument "buttons" should be an array';
    }

    defaultButtonsList = buttons;
  };

  this.addStandardButton = function (name, title, command, styleClass) {
    if (!name || !title || !command) {
      throw 'Arguments "name", "title" and "command" are required';
    }

    styleClass = styleClass || '';
    buttonLibrary[name] = { title: title, command: command, styleClass: styleClass };
    defaultButtonsList.push(name);
  };

  this.addCustomButton = function (name, pluginName) {
    if (!name || !pluginName) {
      throw 'Arguments "name" and "pluginName" are required';
    }

    buttonLibrary[name] = { pluginName: pluginName, isComplex: true };
    defaultButtonsList.push(name);
  };

  this.$get = function () {
    return {
      getToolbarButtons: function getToolbarButtons(list) {
        var toolbarButtons = [];
        (list || defaultButtonsList).forEach(function (buttonKey) {
          if (!buttonLibrary[buttonKey]) {
            throw 'There is no "' + buttonKey + '" in your library. Possible variants: ' + Object.keys(buttonLibrary);
          }

          var button = angular.copy(buttonLibrary[buttonKey]);

          if (!angular.isFunction(button.isActive)) {
            button.isActive = isButtonActive;
          }

          toolbarButtons.push(button);
        });
        return toolbarButtons;
      }
    };
  };
});
angular.module('ngWig').component('ngWig', {
  bindings: {
    content: '=ngModel',
    onPaste: '&',
    buttons: '@'
  },
  require: {
    ngModelController: 'ngModel'
  },
  templateUrl: 'ng-wig/views/ng-wig.html',
  controller: ["$scope", "$element", "$q", "$attrs", "$window", "$document", "ngWigToolbar", function ($scope, $element, $q, $attrs, $window, $document, ngWigToolbar) {
    var _this = this;

    var $container = angular.element($element[0].querySelector('#ng-wig-editable'));

    //TODO: clean-up this attrs solution
    this.required = 'required' in $attrs;
    this.isSourceModeAllowed = 'sourceModeAllowed' in $attrs;
    this.editMode = false;
    this.toolbarButtons = ngWigToolbar.getToolbarButtons(this.buttons && string2array(this.buttons));
    $attrs.$observe('disabled', function (isDisabled) {
      _this.disabled = isDisabled;
      $container.attr('contenteditable', !isDisabled);
    });
    this.isEditorActive = function () {
      return $container[0] === $document[0].activeElement;
    };
    this.toggleEditMode = function () {
      _this.editMode = !_this.editMode;
      if ($window.getSelection().removeAllRanges) {
        $window.getSelection().removeAllRanges();
      }
    };

    this.execCommand = function (command, options) {
      if (_this.editMode) return false;

      if (command === 'createlink') {
        options = $window.prompt('Please enter the URL', 'http://');
        if (!options) {
          return;
        }
      }
      $scope.$broadcast('execCommand', { command: command, options: options });
    };

    this.$onInit = function () {
      //model --> view
      _this.ngModelController.$render = function () {
        return $container.html(_this.ngModelController.$viewValue || '');
      };

      $container.bind('blur keyup change focus click', function () {
        //view --> model
        _this.ngModelController.$setViewValue($container.html());
        $scope.$applyAsync();
      });
    };

    $container.on('paste', function (event) {
      if (!$attrs.onPaste) {
        return;
      }

      var pasteContent = (event.originalEvent || event).clipboardData.getData('text/plain');
      event.preventDefault();
      $q.when(_this.onPaste({ $event: event, pasteContent: pasteContent })).then(function (pasteText) {
        pasteHtmlAtCaret(pasteText);
      });
    });

    $scope.$on('execCommand', function (event, params) {
      $container[0].focus();

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
    });
  }]
});

//TODO: check the function
function string2array(keysString) {
  return keysString.split(',').map(Function.prototype.call, String.prototype.trim);
}

//TODO: put contenteditable helper into service
function pasteHtmlAtCaret(html) {
  var sel, range;
  if (window.getSelection) {
    sel = window.getSelection();
    if (sel.getRangeAt && sel.rangeCount) {
      range = sel.getRangeAt(0);
      range.deleteContents();

      // Range.createContextualFragment() would be useful here but is
      // non-standard and not supported in all browsers (IE9, for one)
      var el = document.createElement("div");
      el.innerHTML = html;
      var frag = document.createDocumentFragment(),
          node,
          lastNode;
      while (node = el.firstChild) {
        lastNode = frag.appendChild(node);
      }
      range.insertNode(frag);

      // Preserve the selection
      if (lastNode) {
        range = range.cloneRange();
        range.setStartAfter(lastNode);
        range.collapse(true);
        sel.removeAllRanges();
        sel.addRange(range);
      }
    }
  } else if (document.selection && document.selection.type != "Control") {
    // IE < 9
    document.selection.createRange().pasteHTML(html);
  }
}
angular.module('ngWig').config(['ngWigToolbarProvider', function (ngWigToolbarProvider) {
  ngWigToolbarProvider.addCustomButton('formats', 'nw-formats-button');
}]).component('nwFormatsButton', {
  bindings: {
    execCommand: '=',
    editMode: '=',
    disabled: '='
  },
  template: '<select class="nw-select" \n                           ng-model="$ctrl.format" \n                           ng-change="$ctrl.execCommand(\'formatblock\', $ctrl.format.value)" \n                           ng-options="format.name for format in $ctrl.formats" \n                           ng-disabled="$ctrl.editMode || $ctrl.disabled"></select>',
  controller: function controller() {

    this.formats = [{ name: 'Normal text', value: 'p' }, { name: 'Header 1', value: 'h1' }, { name: 'Header 2', value: 'h2' }, { name: 'Header 3', value: 'h3' }];

    this.format = this.formats[0];
  }
});

angular.module('ngwig-app-templates', ['ng-wig/views/ng-wig.html']);

angular.module("ng-wig/views/ng-wig.html", []).run(["$templateCache", function ($templateCache) {
  $templateCache.put("ng-wig/views/ng-wig.html", "<div class=\"ng-wig\">\n" + "  <ul class=\"nw-toolbar\">\n" + "    <li class=\"nw-toolbar__item\" ng-repeat=\"button in $ctrl.toolbarButtons\">\n" + "        <div ng-if=\"!button.isComplex\">\n" + "          <button type=\"button\"\n" + "                  class=\"nw-button {{button.styleClass}}\"\n" + "                  title=\"{{button.title}}\"\n" + "                  ng-click=\"$ctrl.execCommand(button.command)\"\n" + "                  ng-class=\"{ 'nw-button--active': !$ctrl.disabled && $ctrl.isEditorActive() && button.isActive() }\"\n" + "                  ng-disabled=\"$ctrl.editMode || $ctrl.disabled\">\n" + "            {{ button.title }}\n" + "          </button>\n" + "        </div>\n" + "        <div ng-if=\"button.isComplex\">\n" + "          <ng-wig-plugin\n" + "              exec-command=\"$ctrl.execCommand\"\n" + "              plugin=\"button\"\n" + "              editMode=\"$ctrl.editMode\"\n" + "              disabled=\"$ctrl.disabled\"></ng-wig-plugin>\n" + "        </div>\n" + "    </li><!--\n" + "    --><li class=\"nw-toolbar__item\">\n" + "      <button type=\"button\"\n" + "              class=\"nw-button nw-button--source\"\n" + "              title=\"Edit HTML\"\n" + "              ng-class=\"{ 'nw-button--active': $ctrl.editMode }\"\n" + "              ng-if=\"$ctrl.isSourceModeAllowed\"\n" + "              ng-click=\"$ctrl.toggleEditMode()\"\n" + "              ng-disabled=\"$ctrl.disabled\">\n" + "        Edit HTML\n" + "      </button>\n" + "    </li>\n" + "  </ul>\n" + "\n" + "  <div class=\"nw-editor-container\">\n" + "    <div class=\"nw-editor__src-container\" ng-show=\"$ctrl.editMode\">\n" + "      <textarea ng-model=\"$ctrl.content\"\n" + "                ng-disabled=\"$ctrl.disabled\"\n" + "                class=\"nw-editor__src\"></textarea>\n" + "    </div>\n" + "    <div class=\"nw-editor\" ng-class=\"{ 'nw-disabled': $ctrl.disabled }\">\n" + "      <div id=\"ng-wig-editable\"\n" + "           tabindex=\"-1\"\n" + "           class=\"nw-editor__res\"\n" + "           ng-class=\"{'nw-invisible': $ctrl.editMode}\"\n" + "           ng-disabled=\"$ctrl.disabled\"\n" + "           contenteditable>\n" + "      </div>\n" + "    </div>\n" + "  </div>\n" + "</div>\n" + "");
}]);
//# sourceMappingURL=ng-wig.js.map
