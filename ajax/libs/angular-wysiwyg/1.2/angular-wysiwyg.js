/*
Usage: <wysiwyg textarea-id="question" textarea-class="form-control"  textarea-height="80px" textarea-name="textareaQuestion" textarea-required ng-model="question.question" enable-bootstrap-title="true"></wysiwyg>
    options
        textarea-id             The id to assign to the editable div
        textarea-class          The class(es) to assign to the the editable div
        textarea-height         If not specified in a text-area class then the hight of the editable div (default: 80px)
        textarea-name           The name attribute of the editable div 
        textarea-required       HTML/AngularJS required validation
        textarea-menu           Array of Arrays that contain the groups of buttons to show Defualt:Show all button groups
        ng-model                The angular data model
        enable-bootstrap-title  True/False whether or not to show the button hover title styled with bootstrap  

Requires: 
    Twitter-bootstrap, fontawesome, jquery, angularjs, bootstrap-color-picker (https://github.com/buberdds/angular-bootstrap-colorpicker)

*/
/*
    TODO: 
        tab support
        custom button fuctions

        limit use of scope
        use compile fuction instead of $compile
        move button elements to js objects and use doc fragments 
*/
(function (angular, undefined) {
  'use strict';
  var DEFAULT_MENU = [
      [
        'bold',
        'italic',
        'underline',
        'strikethrough',
        'subscript',
        'superscript'
      ],
      ['format-block'],
      ['font'],
      ['font-size'],
      [
        'font-color',
        'hilite-color'
      ],
      ['remove-format'],
      [
        'ordered-list',
        'unordered-list',
        'outdent',
        'indent'
      ],
      [
        'left-justify',
        'center-justify',
        'right-justify'
      ],
      [
        'code',
        'quote',
        'paragraph'
      ],
      [
        'link',
        'image'
      ]
    ];
  angular.module('wysiwyg.module', ['colorpicker.module']).directive('wysiwyg', [
    '$timeout',
    'wysiwgGui',
    '$compile',
    function ($timeout, wysiwgGui, $compile) {
      return {
        template: '<div>' + '<style>' + '   .wysiwyg-textarea[contentEditable="false"] { background-color:#eee}' + '   .wysiwyg-btn-group-margin { margin-right:5px; }' + '   .wysiwyg-select { height:30px;margin-bottom:1px;}' + '   .wysiwyg-colorpicker { font-family: arial, sans-serif !important;font-size:16px !important; padding:2px 10px !important;}' + '</style>' + '<div class="wysiwyg-menu"></div>' + '<div id="{{textareaId}}" ng-attr-style="resize:vertical;height:{{textareaHeight || \'80px\'}}; overflow:auto" contentEditable="{{!disabled}}" class="{{textareaClass}} wysiwyg-textarea" rows="{{textareaRows}}" name="{{textareaName}}" required="{{textareaRequired}}" placeholder="{{textareaPlaceholder}}" ng-model="value"></div>' + '</div>',
        restrict: 'E',
        scope: {
          value: '=ngModel',
          textareaHeight: '@textareaHeight',
          textareaName: '@textareaName',
          textareaPlaceholder: '@textareaPlaceholder',
          textareaClass: '@textareaClass',
          textareaRequired: '@textareaRequired',
          textareaId: '@textareaId',
          textareaMenu: '=textareaMenu',
          textareaCustomMenu: '=textareaCustomMenu',
          fn: '&',
          disabled: '=?disabled'
        },
        replace: true,
        require: 'ngModel',
        link: link,
        transclude: true
      };
      function link(scope, element, attrs, ngModelController) {
        var textarea = element.find('div.wysiwyg-textarea');
        scope.isLink = false;
        scope.fontSizes = [
          {
            value: '1',
            size: '10px'
          },
          {
            value: '2',
            size: '13px'
          },
          {
            value: '3',
            size: '16px'
          },
          {
            value: '4',
            size: '18px'
          },
          {
            value: '5',
            size: '24px'
          },
          {
            value: '6',
            size: '32px'
          },
          {
            value: '7',
            size: '48px'
          }
        ];
        scope.formatBlocks = [
          {
            name: 'Heading Blocks',
            value: 'div'
          },
          {
            name: 'Heading 1',
            value: 'h1'
          },
          {
            name: 'Heading 2',
            value: 'h2'
          },
          {
            name: 'Heading 3',
            value: 'h3'
          },
          {
            name: 'Heading 4',
            value: 'h4'
          },
          {
            name: 'Heading 5',
            value: 'h5'
          },
          {
            name: 'Heading 6',
            value: 'h6'
          }
        ];
        scope.formatBlock = scope.formatBlocks[0];
        scope.fontSize = scope.fontSizes[1];
        scope.fonts = [
          'Georgia',
          'Palatino Linotype',
          'Times New Roman',
          'Arial',
          'Helvetica',
          'Arial Black',
          'Comic Sans MS',
          'Impact',
          'Lucida Sans Unicode',
          'Tahoma',
          'Trebuchet MS',
          'Verdana',
          'Courier New',
          'Lucida Console',
          'Helvetica Neue'
        ].sort();
        scope.font = scope.fonts[6];
        init();
        function init() {
          compileMenu();
          configureDisabledWatch();
          configureBootstrapTitle();
          configureListeners();
        }
        function compileMenu() {
          wysiwgGui.setCustomElements(scope.textareaCustomMenu);
          var menuDiv = document.querySelector('div.wysiwyg-menu');
          menuDiv.appendChild(wysiwgGui.createMenu(scope.textareaMenu));
          $compile(menuDiv)(scope);
        }
        function configureDisabledWatch() {
          scope.$watch('disabled', function (newValue) {
            angular.element('div.wysiwyg-menu').find('button').each(function () {
              angular.element(this).attr('disabled', newValue);
            });
            angular.element('div.wysiwyg-menu').find('select').each(function () {
              angular.element(this).attr('disabled', newValue);
            });
          });
        }
        function configureBootstrapTitle() {
          if (attrs.enableBootstrapTitle === 'true' && attrs.enableBootstrapTitle !== undefined) {
            element.find('button[title]').tooltip({ container: 'body' });
          }
        }
        function configureListeners() {
          //Send message to calling controller that a button has been clicked.
          angular.element('.wysiwyg-menu').find('button').on('click', function () {
            var title = angular.element(this);
            scope.$emit('wysiwyg.click', title.attr('title') || title.attr('data-original-title'));
          });
          textarea.on('input keyup paste mouseup', function (e) {
            var html = textarea.html();
            if (html == '<br>') {
              html = '';
            }
            ngModelController.$setViewValue(html);
          });
          textarea.on('click keyup focus mouseup', function () {
            $timeout(function () {
              scope.isBold = scope.cmdState('bold');
              scope.isUnderlined = scope.cmdState('underline');
              scope.isStrikethrough = scope.cmdState('strikethrough');
              scope.isItalic = scope.cmdState('italic');
              scope.isSuperscript = itemIs('SUP');
              //scope.cmdState('superscript');
              scope.isSubscript = itemIs('SUB');
              //scope.cmdState('subscript');    
              scope.isRightJustified = scope.cmdState('justifyright');
              scope.isLeftJustified = scope.cmdState('justifyleft');
              scope.isCenterJustified = scope.cmdState('justifycenter');
              scope.isPre = scope.cmdValue('formatblock') == 'pre';
              scope.isBlockquote = scope.cmdValue('formatblock') == 'blockquote';
              scope.isOrderedList = scope.cmdState('insertorderedlist');
              scope.isUnorderedList = scope.cmdState('insertunorderedlist');
              scope.fonts.forEach(function (v, k) {
                //works but kinda crappy.
                if (scope.cmdValue('fontname').indexOf(v) > -1) {
                  scope.font = v;
                  return false;
                }
              });
              scope.cmdValue('formatblock').toLowerCase();
              scope.formatBlocks.forEach(function (v, k) {
                if (scope.cmdValue('formatblock').toLowerCase() === v.value.toLowerCase()) {
                  scope.formatBlock = v;
                  return false;
                }
              });
              scope.fontSizes.forEach(function (v, k) {
                if (scope.cmdValue('fontsize') === v.value) {
                  scope.fontSize = v;
                  return false;
                }
              });
              scope.hiliteColor = getHiliteColor();
              element.find('button.wysiwyg-hiliteColor').css('background-color', scope.hiliteColor);
              scope.fontColor = scope.cmdValue('forecolor');
              element.find('button.wysiwyg-fontcolor').css('color', scope.fontColor);
              scope.isLink = itemIs('A');
            }, 0);
          });
        }
        //Used to detect things like A tags and others that dont work with cmdValue().
        function itemIs(tag) {
          var selection = window.getSelection().getRangeAt(0);
          if (selection) {
            if (selection.startContainer.parentNode.tagName === tag.toUpperCase() || selection.endContainer.parentNode.tagName === tag.toUpperCase()) {
              return true;
            } else {
              return false;
            }
          } else {
            return false;
          }
        }
        //Used to detect things like A tags and others that dont work with cmdValue().
        function getHiliteColor() {
          var selection = window.getSelection().getRangeAt(0);
          if (selection) {
            var style = $(selection.startContainer.parentNode).attr('style');
            if (!angular.isDefined(style))
              return false;
            var a = style.split(';');
            for (var i = 0; i < a.length; i++) {
              var s = a[i].split(':');
              if (s[0] === 'background-color')
                return s[1];
            }
            return '#fff';
          } else {
            return '#fff';
          }
        }
        // model -> view
        ngModelController.$render = function () {
          textarea.html(ngModelController.$viewValue);
        };
        scope.format = function (cmd, arg) {
          document.execCommand(cmd, false, arg);
        };
        scope.cmdState = function (cmd, id) {
          return document.queryCommandState(cmd);
        };
        scope.cmdValue = function (cmd) {
          return document.queryCommandValue(cmd);
        };
        scope.createLink = function () {
          var input = prompt('Enter the link URL');
          if (input && input !== undefined)
            scope.format('createlink', input);
        };
        scope.insertImage = function () {
          var input = prompt('Enter the image URL');
          if (input && input !== undefined)
            scope.format('insertimage', input);
        };
        scope.setFont = function () {
          scope.format('fontname', scope.font);
        };
        scope.setFontSize = function () {
          scope.format('fontsize', scope.fontSize.value);
        };
        scope.setFormatBlock = function () {
          scope.format('formatBlock', scope.formatBlock.value);
        };
        scope.setFontColor = function () {
          scope.format('forecolor', scope.fontColor);
        };
        scope.setHiliteColor = function () {
          scope.format('hiliteColor', scope.hiliteColor);
        };
        scope.format('enableobjectresizing', true);
        scope.format('styleWithCSS', true);
      }
      ;
    }
  ]).factory('wysiwgGui', [
    'wysiwgGuiElements',
    function (wysiwgGuiElements) {
      var ELEMENTS = wysiwgGuiElements;
      var custom = {};
      var setCustomElements = function (el) {
        custom = el;
      };
      var getMenuGroup = function () {
        return {
          tag: 'div',
          classes: 'btn-group btn-group-sm wysiwyg-btn-group-margin'
        };
      };
      var getMenuItem = function (item) {
        return ELEMENTS[item] || {};
      };
      var createMenu = function (menu) {
        angular.extend(ELEMENTS, custom);
        //Get the default menu or the passed in menu
        if (angular.isDefined(menu) && menu !== '')
          menu = menu;
        else
          menu = DEFAULT_MENU;
        //create div to add everything to.
        var startDiv = document.createElement('div');
        for (var i = 0; i < menu.length; i++) {
          var menuGroup = create(getMenuGroup());
          for (var j = 0; j < menu[i].length; j++) {
            //link has two functions link and unlink
            if (menu[i][j] === 'link') {
              var el = create(getMenuItem('unlink'));
              menuGroup.appendChild(el);
            }
            var el = create(getMenuItem(menu[i][j]));
            menuGroup.appendChild(el);
          }
          startDiv.appendChild(menuGroup);
        }
        return startDiv;
      };
      function create(obj) {
        var el;
        if (obj.tag) {
          el = document.createElement(obj.tag);
        } else if (obj.text) {
          el = document.createElement('span');
        } else {
          console.log('cannot create this element.');
          el = document.createElement('span');
          return el;
        }
        if (obj.text) {
          el.innerText = obj.text;
        }
        if (obj.classes) {
          el.className = obj.classes;
        }
        if (obj.html) {
          el.innerHTML = obj.html;
        }
        if (obj.attributes && obj.attributes.length) {
          for (var i in obj.attributes) {
            var attr = obj.attributes[i];
            if (attr.name && attr.value) {
              el.setAttribute(attr.name, attr.value);
            }
          }
        }
        if (obj.data && obj.data.length) {
          for (var item in obj.data) {
            el.appendChild(create(obj.data[item]));
          }
        }
        return el;
      }
      var stringToArray = function (string) {
        var ret;
        try {
          ret = JSON.parse(string.replace(/'/g, '"'));
        } catch (e) {
        }
        return ret;
      };
      return {
        createMenu: createMenu,
        setCustomElements: setCustomElements
      };
    }
  ]).value('wysiwgGuiElements', {
    'bold': {
      tag: 'button',
      classes: 'btn btn-default',
      attributes: [
        {
          name: 'title',
          value: 'Bold'
        },
        {
          name: 'ng-click',
          value: 'format(\'bold\')'
        },
        {
          name: 'ng-class',
          value: '{ active: isBold }'
        }
      ],
      data: [{
          tag: 'i',
          classes: 'fa fa-bold'
        }]
    },
    'italic': {
      tag: 'button',
      classes: 'btn btn-default',
      attributes: [
        {
          name: 'title',
          value: 'Italic'
        },
        {
          name: 'ng-click',
          value: 'format(\'italic\')'
        },
        {
          name: 'ng-class',
          value: '{ active: isItalic }'
        }
      ],
      data: [{
          tag: 'i',
          classes: 'fa fa-italic'
        }]
    },
    'underline': {
      tag: 'button',
      classes: 'btn btn-default',
      attributes: [
        {
          name: 'title',
          value: 'Underline'
        },
        {
          name: 'ng-click',
          value: 'format(\'underline\')'
        },
        {
          name: 'ng-class',
          value: '{ active: isUnderline }'
        }
      ],
      data: [{
          tag: 'i',
          classes: 'fa fa-underline'
        }]
    },
    'strikethrough': {
      tag: 'button',
      classes: 'btn btn-default',
      attributes: [
        {
          name: 'title',
          value: 'Strikethrough'
        },
        {
          name: 'ng-click',
          value: 'format(\'strikethrough\')'
        },
        {
          name: 'ng-class',
          value: '{ active: isStrikethrough }'
        }
      ],
      data: [{
          tag: 'i',
          classes: 'fa fa-strikethrough'
        }]
    },
    'subscript': {
      tag: 'button',
      classes: 'btn btn-default',
      attributes: [
        {
          name: 'title',
          value: 'Subscript'
        },
        {
          name: 'ng-click',
          value: 'format(\'subscript\')'
        },
        {
          name: 'ng-class',
          value: '{ active: isSubscript }'
        }
      ],
      data: [{
          tag: 'i',
          classes: 'fa fa-subscript'
        }]
    },
    'superscript': {
      tag: 'button',
      classes: 'btn btn-default',
      attributes: [
        {
          name: 'title',
          value: 'Superscript'
        },
        {
          name: 'ng-click',
          value: 'format(\'superscript\')'
        },
        {
          name: 'ng-class',
          value: '{ active: isSuperscript }'
        }
      ],
      data: [{
          tag: 'i',
          classes: 'fa fa-superscript'
        }]
    },
    'remove-format': {
      tag: 'button',
      classes: 'btn btn-default',
      attributes: [
        {
          name: 'title',
          value: 'Remove Formatting'
        },
        {
          name: 'ng-click',
          value: 'format(\'removeFormat\')'
        }
      ],
      data: [{
          tag: 'i',
          classes: 'fa fa-eraser'
        }]
    },
    'ordered-list': {
      tag: 'button',
      classes: 'btn btn-default',
      attributes: [
        {
          name: 'title',
          value: 'Ordered List'
        },
        {
          name: 'ng-click',
          value: 'format(\'insertorderedlist\')'
        },
        {
          name: 'ng-class',
          value: '{ active: isOrderedList }'
        }
      ],
      data: [{
          tag: 'i',
          classes: 'fa fa-list-ol'
        }]
    },
    'unordered-list': {
      tag: 'button',
      classes: 'btn btn-default',
      attributes: [
        {
          name: 'title',
          value: 'Unordered List'
        },
        {
          name: 'ng-click',
          value: 'format(\'insertunorderedlist\')'
        },
        {
          name: 'ng-class',
          value: '{ active: isUnorderedList }'
        }
      ],
      data: [{
          tag: 'i',
          classes: 'fa fa-list-ul'
        }]
    },
    'outdent': {
      tag: 'button',
      classes: 'btn btn-default',
      attributes: [
        {
          name: 'title',
          value: 'Outdent'
        },
        {
          name: 'ng-click',
          value: 'format(\'outdent\')'
        }
      ],
      data: [{
          tag: 'i',
          classes: 'fa fa-outdent'
        }]
    },
    'indent': {
      tag: 'button',
      classes: 'btn btn-default',
      attributes: [
        {
          name: 'title',
          value: 'Indent'
        },
        {
          name: 'ng-click',
          value: 'format(\'indent\')'
        }
      ],
      data: [{
          tag: 'i',
          classes: 'fa fa-indent'
        }]
    },
    'left-justify': {
      tag: 'button',
      classes: 'btn btn-default',
      attributes: [
        {
          name: 'title',
          value: 'Left Justify'
        },
        {
          name: 'ng-click',
          value: 'format(\'justifyleft\')'
        },
        {
          name: 'ng-class',
          value: '{ active: isLeftJustified }'
        }
      ],
      data: [{
          tag: 'i',
          classes: 'fa fa-align-left'
        }]
    },
    'center-justify': {
      tag: 'button',
      classes: 'btn btn-default',
      attributes: [
        {
          name: 'title',
          value: 'Center Justify'
        },
        {
          name: 'ng-click',
          value: 'format(\'justifycenter\')'
        },
        {
          name: 'ng-class',
          value: '{ active: isCenterJustified }'
        }
      ],
      data: [{
          tag: 'i',
          classes: 'fa fa-align-center'
        }]
    },
    'right-justify': {
      tag: 'button',
      classes: 'btn btn-default',
      attributes: [
        {
          name: 'title',
          value: 'Right Justify'
        },
        {
          name: 'ng-click',
          value: 'format(\'justifyright\')'
        },
        {
          name: 'ng-class',
          value: '{ active: isRightJustified }'
        }
      ],
      data: [{
          tag: 'i',
          classes: 'fa fa-align-right'
        }]
    },
    'code': {
      tag: 'button',
      classes: 'btn btn-default',
      attributes: [
        {
          name: 'title',
          value: 'Code'
        },
        {
          name: 'ng-click',
          value: 'format(\'formatblock\', \'pre\')'
        },
        {
          name: 'ng-class',
          value: '{ active: isPre }'
        }
      ],
      data: [{
          tag: 'i',
          classes: 'fa fa-code'
        }]
    },
    'quote': {
      tag: 'button',
      classes: 'btn btn-default',
      attributes: [
        {
          name: 'title',
          value: 'Quote'
        },
        {
          name: 'ng-click',
          value: 'format(\'formatblock\', \'blockquote\')'
        },
        {
          name: 'ng-class',
          value: '{ active: isBlockquote }'
        }
      ],
      data: [{
          tag: 'i',
          classes: 'fa fa-quote-right'
        }]
    },
    'paragraph': {
      tag: 'button',
      classes: 'btn btn-default',
      text: 'P',
      attributes: [
        {
          name: 'title',
          value: 'Paragragh'
        },
        {
          name: 'ng-click',
          value: 'format(\'insertParagraph\')'
        },
        {
          name: 'ng-class',
          value: '{ active: isParagraph }'
        }
      ]
    },
    'image': {
      tag: 'button',
      classes: 'btn btn-default',
      attributes: [
        {
          name: 'title',
          value: 'Image'
        },
        {
          name: 'ng-click',
          value: 'insertImage()'
        }
      ],
      data: [{
          tag: 'i',
          classes: 'fa fa-picture-o'
        }]
    },
    'font-color': {
      tag: 'button',
      classes: 'btn btn-default wysiwyg-colorpicker wysiwyg-fontcolor',
      text: 'A',
      attributes: [
        {
          name: 'title',
          value: 'Font Color'
        },
        {
          name: 'colorpicker',
          value: 'rgba'
        },
        {
          name: 'colorpicker-position',
          value: 'top'
        },
        {
          name: 'ng-model',
          value: 'fontColor'
        },
        {
          name: 'ng-change',
          value: 'setFontColor()'
        }
      ]
    },
    'hilite-color': {
      tag: 'button',
      classes: 'btn btn-default wysiwyg-colorpicker wysiwyg-fontcolor',
      text: 'H',
      attributes: [
        {
          name: 'title',
          value: 'Hilite Color'
        },
        {
          name: 'colorpicker',
          value: 'rgba'
        },
        {
          name: 'colorpicker-position',
          value: 'top'
        },
        {
          name: 'ng-model',
          value: 'hiliteColor'
        },
        {
          name: 'ng-change',
          value: 'setHiliteColor()'
        }
      ]
    },
    'font': {
      tag: 'select',
      classes: 'form-control wysiwyg-select',
      attributes: [
        {
          name: 'title',
          value: 'Image'
        },
        {
          name: 'ng-model',
          value: 'font'
        },
        {
          name: 'ng-options',
          value: 'f for f in fonts'
        },
        {
          name: 'ng-change',
          value: 'setFont()'
        }
      ]
    },
    'font-size': {
      tag: 'select',
      classes: 'form-control wysiwyg-select',
      attributes: [
        {
          name: 'title',
          value: 'Image'
        },
        {
          name: 'ng-model',
          value: 'fontSize'
        },
        {
          name: 'ng-options',
          value: 'f.size for f in fontSizes'
        },
        {
          name: 'ng-change',
          value: 'setFontSize()'
        }
      ]
    },
    'format-block': {
      tag: 'select',
      classes: 'form-control wysiwyg-select',
      attributes: [
        {
          name: 'title',
          value: 'Format Block'
        },
        {
          name: 'ng-model',
          value: 'formatBlock'
        },
        {
          name: 'ng-options',
          value: 'f.name for f in formatBlocks'
        },
        {
          name: 'ng-change',
          value: 'setFormatBlock()'
        }
      ]
    },
    'link': {
      tag: 'button',
      classes: 'btn btn-default',
      attributes: [
        {
          name: 'title',
          value: 'Link'
        },
        {
          name: 'ng-click',
          value: 'createLink()'
        },
        {
          name: 'ng-show',
          value: '!isLink'
        }
      ],
      data: [{
          tag: 'i',
          classes: 'fa fa-link'
        }]
    },
    'unlink': {
      tag: 'button',
      classes: 'btn btn-default',
      attributes: [
        {
          name: 'title',
          value: 'Unlink'
        },
        {
          name: 'ng-click',
          value: 'format(\'unlink\')'
        },
        {
          name: 'ng-show',
          value: 'isLink'
        }
      ],
      data: [{
          tag: 'i',
          classes: 'fa fa-unlink'
        }]
    }
  });
}(angular));