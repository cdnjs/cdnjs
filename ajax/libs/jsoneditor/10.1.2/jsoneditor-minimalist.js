/*!
 * jsoneditor.js
 *
 * @brief
 * JSONEditor is a web-based tool to view, edit, format, and validate JSON.
 * It has various modes such as a tree editor, a code editor, and a plain text
 * editor.
 *
 * Supported browsers: Chrome, Firefox, Safari, Edge
 *
 * @license
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy
 * of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 *
 * Copyright (c) 2011-2024 Jos de Jong, http://jsoneditoronline.org
 *
 * @author  Jos de Jong, <wjosdejong@gmail.com>
 * @version 10.1.2
 * @date    2024-12-18
 */

(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["JSONEditor"] = factory();
	else
		root["JSONEditor"] = factory();
})(self, function() {
return /******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 545:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   t: function() { return /* binding */ ContextMenu; }
/* harmony export */ });
/* harmony import */ var _createAbsoluteAnchor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(925);
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(237);
/* harmony import */ var _i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(57);


function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }




/**
 * A context menu
 * @param {Object[]} items    Array containing the menu structure
 *                            TODO: describe structure
 * @param {Object} [options]  Object with options. Available options:
 *                            {function} close        Callback called when the
 *                                                    context menu is being closed.
 *                            {boolean} limitHeight   Whether ContextMenu height should be
 *                                                    limited or not.
 * @constructor
 */
var ContextMenu = /*#__PURE__*/function () {
  function ContextMenu(items, options) {
    _classCallCheck(this, ContextMenu);
    this.dom = {};
    var me = this;
    var dom = this.dom;
    this.anchor = undefined;
    this.items = items;
    this.eventListeners = {};
    this.selection = undefined; // holds the selection before the menu was opened
    this.onClose = options ? options.close : undefined;
    this.limitHeight = options ? options.limitHeight : false;

    // create root element
    var root = document.createElement('div');
    root.className = 'jsoneditor-contextmenu-root';
    dom.root = root;

    // create a container element
    var menu = document.createElement('div');
    menu.className = 'jsoneditor-contextmenu';
    dom.menu = menu;
    root.appendChild(menu);

    // create a list to hold the menu items
    var list = document.createElement('ul');
    list.className = 'jsoneditor-menu';
    menu.appendChild(list);
    dom.list = list;
    dom.items = []; // list with all buttons

    // create a (non-visible) button to set the focus to the menu
    var focusButton = document.createElement('button');
    focusButton.type = 'button';
    dom.focusButton = focusButton;
    var li = document.createElement('li');
    li.style.overflow = 'hidden';
    li.style.height = '0';
    li.appendChild(focusButton);
    list.appendChild(li);
    function createMenuItems(list, domItems, items) {
      items.forEach(function (item) {
        if (item.type === 'separator') {
          // create a separator
          var separator = document.createElement('div');
          separator.className = 'jsoneditor-separator';
          var _li = document.createElement('li');
          _li.appendChild(separator);
          list.appendChild(_li);
        } else {
          var domItem = {};

          // create a menu item
          var _li2 = document.createElement('li');
          list.appendChild(_li2);

          // create a button in the menu item
          var button = document.createElement('button');
          button.type = 'button';
          button.className = item.className;
          domItem.button = button;
          if (item.title) {
            button.title = item.title;
          }
          if (item.click) {
            button.onclick = function (event) {
              event.preventDefault();
              me.hide();
              item.click();
            };
          }
          _li2.appendChild(button);

          // create the contents of the button
          if (item.submenu) {
            // add the icon to the button
            var divIcon = document.createElement('div');
            divIcon.className = 'jsoneditor-icon';
            button.appendChild(divIcon);
            var divText = document.createElement('div');
            divText.className = 'jsoneditor-text' + (item.click ? '' : ' jsoneditor-right-margin');
            divText.appendChild(document.createTextNode(item.text));
            button.appendChild(divText);
            var buttonSubmenu;
            if (item.click) {
              // submenu and a button with a click handler
              button.className += ' jsoneditor-default';
              var buttonExpand = document.createElement('button');
              buttonExpand.type = 'button';
              domItem.buttonExpand = buttonExpand;
              buttonExpand.className = 'jsoneditor-expand';
              var buttonExpandInner = document.createElement('div');
              buttonExpandInner.className = 'jsoneditor-expand';
              buttonExpand.appendChild(buttonExpandInner);
              _li2.appendChild(buttonExpand);
              if (item.submenuTitle) {
                buttonExpand.title = item.submenuTitle;
              }
              buttonSubmenu = buttonExpand;
            } else {
              // submenu and a button without a click handler
              var divExpand = document.createElement('div');
              divExpand.className = 'jsoneditor-expand';
              button.appendChild(divExpand);
              buttonSubmenu = button;
            }

            // attach a handler to expand/collapse the submenu
            buttonSubmenu.onclick = function (event) {
              event.preventDefault();
              me._onExpandItem(domItem);
              buttonSubmenu.focus();
            };

            // create the submenu
            var domSubItems = [];
            domItem.subItems = domSubItems;
            var ul = document.createElement('ul');
            domItem.ul = ul;
            ul.className = 'jsoneditor-menu';
            ul.style.height = '0';
            _li2.appendChild(ul);
            createMenuItems(ul, domSubItems, item.submenu);
          } else {
            // no submenu, just a button with clickhandler
            var icon = document.createElement('div');
            icon.className = 'jsoneditor-icon';
            button.appendChild(icon);
            var text = document.createElement('div');
            text.className = 'jsoneditor-text';
            text.appendChild(document.createTextNode((0,_i18n__WEBPACK_IMPORTED_MODULE_2__/* .translate */ .Tl)(item.text)));
            button.appendChild(text);
          }
          domItems.push(domItem);
        }
      });
    }
    createMenuItems(list, this.dom.items, items);

    // TODO: when the editor is small, show the submenu on the right instead of inline?

    // calculate the max height of the menu with one submenu expanded
    this.maxHeight = 0; // height in pixels
    items.forEach(function (item) {
      var height = (items.length + (item.submenu ? item.submenu.length : 0)) * 24;
      me.maxHeight = Math.max(me.maxHeight, height);
    });
  }

  /**
   * Get the currently visible buttons
   * @return {Array.<HTMLElement>} buttons
   * @private
   */
  return _createClass(ContextMenu, [{
    key: "_getVisibleButtons",
    value: function _getVisibleButtons() {
      var buttons = [];
      var me = this;
      this.dom.items.forEach(function (item) {
        buttons.push(item.button);
        if (item.buttonExpand) {
          buttons.push(item.buttonExpand);
        }
        if (item.subItems && item === me.expandedItem) {
          item.subItems.forEach(function (subItem) {
            buttons.push(subItem.button);
            if (subItem.buttonExpand) {
              buttons.push(subItem.buttonExpand);
            }
            // TODO: change to fully recursive method
          });
        }
      });
      return buttons;
    }

    /**
     * Attach the menu to an anchor
     * @param {HTMLElement} anchor    Anchor where the menu will be attached as sibling.
     * @param {HTMLElement} frame     The root of the JSONEditor window
     * @param {Boolean=} ignoreParent ignore anchor parent in regard to the calculation of the position, needed when the parent position is absolute
     */
  }, {
    key: "show",
    value: function show(anchor, frame, ignoreParent) {
      this.hide();

      // determine whether to display the menu below or above the anchor
      var showBelow = true;
      var parent = anchor.parentNode;
      var anchorRect = anchor.getBoundingClientRect();
      var parentRect = parent.getBoundingClientRect();
      var frameRect = frame.getBoundingClientRect();
      var me = this;
      this.dom.absoluteAnchor = (0,_createAbsoluteAnchor__WEBPACK_IMPORTED_MODULE_0__/* .createAbsoluteAnchor */ .p)(anchor, frame, function () {
        me.hide();
      });
      if (anchorRect.bottom + this.maxHeight < frameRect.bottom) {
        // fits below -> show below
      } else if (anchorRect.top - this.maxHeight > frameRect.top) {
        // fits above -> show above
        showBelow = false;
      } else {
        // doesn't fit above nor below -> show below
      }
      var topGap = ignoreParent ? 0 : anchorRect.top - parentRect.top;

      // position the menu
      if (showBelow) {
        // display the menu below the anchor
        var anchorHeight = anchor.offsetHeight;
        this.dom.menu.style.left = '0';
        this.dom.menu.style.top = topGap + anchorHeight + 'px';
        this.dom.menu.style.bottom = '';
      } else {
        // display the menu above the anchor
        this.dom.menu.style.left = '0';
        this.dom.menu.style.top = '';
        this.dom.menu.style.bottom = '0px';
      }
      if (this.limitHeight) {
        var margin = 10; // make sure there is a little margin left
        var maxPossibleMenuHeight = showBelow ? frameRect.bottom - anchorRect.bottom - margin : anchorRect.top - frameRect.top - margin;
        this.dom.list.style.maxHeight = maxPossibleMenuHeight + 'px';
        this.dom.list.style.overflowY = 'auto';
      }

      // attach the menu to the temporary, absolute anchor
      // parent.insertBefore(this.dom.root, anchor);
      this.dom.absoluteAnchor.appendChild(this.dom.root);

      // move focus to the first button in the context menu
      this.selection = (0,_util__WEBPACK_IMPORTED_MODULE_1__.getSelection)();
      this.anchor = anchor;
      setTimeout(function () {
        me.dom.focusButton.focus();
      }, 0);
      if (ContextMenu.visibleMenu) {
        ContextMenu.visibleMenu.hide();
      }
      ContextMenu.visibleMenu = this;
    }

    /**
     * Hide the context menu if visible
     */
  }, {
    key: "hide",
    value: function hide() {
      // remove temporary absolutely positioned anchor
      if (this.dom.absoluteAnchor) {
        this.dom.absoluteAnchor.destroy();
        delete this.dom.absoluteAnchor;
      }

      // remove the menu from the DOM
      if (this.dom.root.parentNode) {
        this.dom.root.parentNode.removeChild(this.dom.root);
        if (this.onClose) {
          this.onClose();
        }
      }
      if (ContextMenu.visibleMenu === this) {
        ContextMenu.visibleMenu = undefined;
      }
    }

    /**
     * Expand a submenu
     * Any currently expanded submenu will be hided.
     * @param {Object} domItem
     * @private
     */
  }, {
    key: "_onExpandItem",
    value: function _onExpandItem(domItem) {
      var me = this;
      var alreadyVisible = domItem === this.expandedItem;

      // hide the currently visible submenu
      var expandedItem = this.expandedItem;
      if (expandedItem) {
        // var ul = expandedItem.ul;
        expandedItem.ul.style.height = '0';
        expandedItem.ul.style.padding = '';
        setTimeout(function () {
          if (me.expandedItem !== expandedItem) {
            expandedItem.ul.style.display = '';
            (0,_util__WEBPACK_IMPORTED_MODULE_1__.removeClassName)(expandedItem.ul.parentNode, 'jsoneditor-selected');
          }
        }, 300); // timeout duration must match the css transition duration
        this.expandedItem = undefined;
      }
      if (!alreadyVisible) {
        var ul = domItem.ul;
        ul.style.display = 'block';
        // eslint-disable-next-line no-unused-expressions
        ul.clientHeight; // force a reflow in Firefox
        setTimeout(function () {
          if (me.expandedItem === domItem) {
            var childsHeight = 0;
            for (var i = 0; i < ul.childNodes.length; i++) {
              childsHeight += ul.childNodes[i].clientHeight;
            }
            ul.style.height = childsHeight + 'px';
            ul.style.padding = '5px 10px';
          }
        }, 0);
        (0,_util__WEBPACK_IMPORTED_MODULE_1__.addClassName)(ul.parentNode, 'jsoneditor-selected');
        this.expandedItem = domItem;
      }
    }

    /**
     * Handle onkeydown event
     * @param {Event} event
     * @private
     */
  }, {
    key: "_onKeyDown",
    value: function _onKeyDown(event) {
      var target = event.target;
      var keynum = event.which;
      var handled = false;
      var buttons, targetIndex, prevButton, nextButton;
      if (keynum === 27) {
        // ESC
        // hide the menu on ESC key

        // restore previous selection and focus
        if (this.selection) {
          (0,_util__WEBPACK_IMPORTED_MODULE_1__.setSelection)(this.selection);
        }
        if (this.anchor) {
          this.anchor.focus();
        }
        this.hide();
        handled = true;
      } else if (keynum === 9) {
        // Tab
        if (!event.shiftKey) {
          // Tab
          buttons = this._getVisibleButtons();
          targetIndex = buttons.indexOf(target);
          if (targetIndex === buttons.length - 1) {
            // move to first button
            buttons[0].focus();
            handled = true;
          }
        } else {
          // Shift+Tab
          buttons = this._getVisibleButtons();
          targetIndex = buttons.indexOf(target);
          if (targetIndex === 0) {
            // move to last button
            buttons[buttons.length - 1].focus();
            handled = true;
          }
        }
      } else if (keynum === 37) {
        // Arrow Left
        if (target.className === 'jsoneditor-expand') {
          buttons = this._getVisibleButtons();
          targetIndex = buttons.indexOf(target);
          prevButton = buttons[targetIndex - 1];
          if (prevButton) {
            prevButton.focus();
          }
        }
        handled = true;
      } else if (keynum === 38) {
        // Arrow Up
        buttons = this._getVisibleButtons();
        targetIndex = buttons.indexOf(target);
        prevButton = buttons[targetIndex - 1];
        if (prevButton && prevButton.className === 'jsoneditor-expand') {
          // skip expand button
          prevButton = buttons[targetIndex - 2];
        }
        if (!prevButton) {
          // move to last button
          prevButton = buttons[buttons.length - 1];
        }
        if (prevButton) {
          prevButton.focus();
        }
        handled = true;
      } else if (keynum === 39) {
        // Arrow Right
        buttons = this._getVisibleButtons();
        targetIndex = buttons.indexOf(target);
        nextButton = buttons[targetIndex + 1];
        if (nextButton && nextButton.className === 'jsoneditor-expand') {
          nextButton.focus();
        }
        handled = true;
      } else if (keynum === 40) {
        // Arrow Down
        buttons = this._getVisibleButtons();
        targetIndex = buttons.indexOf(target);
        nextButton = buttons[targetIndex + 1];
        if (nextButton && nextButton.className === 'jsoneditor-expand') {
          // skip expand button
          nextButton = buttons[targetIndex + 2];
        }
        if (!nextButton) {
          // move to first button
          nextButton = buttons[0];
        }
        if (nextButton) {
          nextButton.focus();
          handled = true;
        }
        handled = true;
      }
      // TODO: arrow left and right

      if (handled) {
        event.stopPropagation();
        event.preventDefault();
      }
    }
  }]);
}();

// currently displayed context menu, a singleton. We may only have one visible context menu
ContextMenu.visibleMenu = undefined;

/***/ }),

/***/ 115:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   N: function() { return /* binding */ ErrorTable; }
/* harmony export */ });
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/**
 * Show errors and schema warnings in a clickable table view
 * @param {Object} config
 * @property {boolean} errorTableVisible
 * @property {function (boolean) : void} onToggleVisibility
 * @property {function (number)} [onFocusLine]
 * @property {function (number)} onChangeHeight
 * @constructor
 */
var ErrorTable = /*#__PURE__*/function () {
  function ErrorTable(config) {
    _classCallCheck(this, ErrorTable);
    this.errorTableVisible = config.errorTableVisible;
    this.onToggleVisibility = config.onToggleVisibility;
    this.onFocusLine = config.onFocusLine || function () {};
    this.onChangeHeight = config.onChangeHeight;
    this.dom = {};
    var validationErrorsContainer = document.createElement('div');
    validationErrorsContainer.className = 'jsoneditor-validation-errors-container';
    this.dom.validationErrorsContainer = validationErrorsContainer;
    var additionalErrorsIndication = document.createElement('div');
    additionalErrorsIndication.style.display = 'none';
    additionalErrorsIndication.className = 'jsoneditor-additional-errors fadein';
    additionalErrorsIndication.textContent = "Scroll for more \u25BF";
    this.dom.additionalErrorsIndication = additionalErrorsIndication;
    validationErrorsContainer.appendChild(additionalErrorsIndication);
    var validationErrorIcon = document.createElement('span');
    validationErrorIcon.className = 'jsoneditor-validation-error-icon';
    validationErrorIcon.style.display = 'none';
    this.dom.validationErrorIcon = validationErrorIcon;
    var validationErrorCount = document.createElement('span');
    validationErrorCount.className = 'jsoneditor-validation-error-count';
    validationErrorCount.style.display = 'none';
    this.dom.validationErrorCount = validationErrorCount;
    this.dom.parseErrorIndication = document.createElement('span');
    this.dom.parseErrorIndication.className = 'jsoneditor-parse-error-icon';
    this.dom.parseErrorIndication.style.display = 'none';
  }
  return _createClass(ErrorTable, [{
    key: "getErrorTable",
    value: function getErrorTable() {
      return this.dom.validationErrorsContainer;
    }
  }, {
    key: "getErrorCounter",
    value: function getErrorCounter() {
      return this.dom.validationErrorCount;
    }
  }, {
    key: "getWarningIcon",
    value: function getWarningIcon() {
      return this.dom.validationErrorIcon;
    }
  }, {
    key: "getErrorIcon",
    value: function getErrorIcon() {
      return this.dom.parseErrorIndication;
    }
  }, {
    key: "toggleTableVisibility",
    value: function toggleTableVisibility() {
      this.errorTableVisible = !this.errorTableVisible;
      this.onToggleVisibility(this.errorTableVisible);
    }
  }, {
    key: "setErrors",
    value: function setErrors(errors, errorLocations) {
      var _this = this;
      // clear any previous errors
      if (this.dom.validationErrors) {
        this.dom.validationErrors.parentNode.removeChild(this.dom.validationErrors);
        this.dom.validationErrors = null;
        this.dom.additionalErrorsIndication.style.display = 'none';
      }

      // create the table with errors
      // keep default behavior for parse errors
      if (this.errorTableVisible && errors.length > 0) {
        var validationErrors = document.createElement('div');
        validationErrors.className = 'jsoneditor-validation-errors';
        var table = document.createElement('table');
        table.className = 'jsoneditor-text-errors';
        validationErrors.appendChild(table);
        var tbody = document.createElement('tbody');
        table.appendChild(tbody);
        errors.forEach(function (error) {
          var line;
          if (!isNaN(error.line)) {
            line = error.line;
          } else if (error.dataPath) {
            var errLoc = errorLocations.find(function (loc) {
              return loc.path === error.dataPath;
            });
            if (errLoc) {
              line = errLoc.line + 1;
            }
          }
          var trEl = document.createElement('tr');
          trEl.className = !isNaN(line) ? 'jump-to-line' : '';
          if (error.type === 'error') {
            trEl.className += ' parse-error';
          } else {
            trEl.className += ' validation-error';
          }
          var td1 = document.createElement('td');
          var button = document.createElement('button');
          button.className = 'jsoneditor-schema-error';
          td1.appendChild(button);
          trEl.appendChild(td1);
          var td2 = document.createElement('td');
          td2.style = 'white-space: nowrap;';
          td2.textContent = !isNaN(line) ? 'Ln ' + line : '';
          trEl.appendChild(td2);
          if (typeof error === 'string') {
            var td34 = document.createElement('td');
            td34.colSpan = 2;
            var pre = document.createElement('pre');
            pre.appendChild(document.createTextNode(error));
            td34.appendChild(pre);
            trEl.appendChild(td34);
          } else {
            var td3 = document.createElement('td');
            td3.appendChild(document.createTextNode(error.dataPath || ''));
            trEl.appendChild(td3);
            var td4 = document.createElement('td');
            var _pre = document.createElement('pre');
            _pre.appendChild(document.createTextNode(error.message.replace(/<br>/gi, '\n')));
            td4.appendChild(_pre);
            trEl.appendChild(td4);
          }
          trEl.onclick = function () {
            _this.onFocusLine(line);
          };
          tbody.appendChild(trEl);
        });
        this.dom.validationErrors = validationErrors;
        this.dom.validationErrorsContainer.appendChild(validationErrors);
        this.dom.additionalErrorsIndication.title = errors.length + ' errors total';
        if (this.dom.validationErrorsContainer.clientHeight < this.dom.validationErrorsContainer.scrollHeight) {
          this.dom.additionalErrorsIndication.style.display = 'block';
          this.dom.validationErrorsContainer.onscroll = function () {
            _this.dom.additionalErrorsIndication.style.display = _this.dom.validationErrorsContainer.clientHeight > 0 && _this.dom.validationErrorsContainer.scrollTop === 0 ? 'block' : 'none';
          };
        } else {
          this.dom.validationErrorsContainer.onscroll = undefined;
        }
        var height = this.dom.validationErrorsContainer.clientHeight + (this.dom.statusBar ? this.dom.statusBar.clientHeight : 0);
        // this.content.style.marginBottom = (-height) + 'px';
        // this.content.style.paddingBottom = height + 'px';
        this.onChangeHeight(height);
      } else {
        this.onChangeHeight(0);
      }

      // update the status bar
      var validationErrorsCount = errors.filter(function (error) {
        return error.type !== 'error';
      }).length;
      if (validationErrorsCount > 0) {
        this.dom.validationErrorCount.style.display = 'inline';
        this.dom.validationErrorCount.innerText = validationErrorsCount;
        this.dom.validationErrorCount.onclick = this.toggleTableVisibility.bind(this);
        this.dom.validationErrorIcon.style.display = 'inline';
        this.dom.validationErrorIcon.title = validationErrorsCount + ' schema validation error(s) found';
        this.dom.validationErrorIcon.onclick = this.toggleTableVisibility.bind(this);
      } else {
        this.dom.validationErrorCount.style.display = 'none';
        this.dom.validationErrorIcon.style.display = 'none';
      }

      // update the parse error icon
      var hasParseErrors = errors.some(function (error) {
        return error.type === 'error';
      });
      if (hasParseErrors) {
        var line = errors[0].line;
        this.dom.parseErrorIndication.style.display = 'block';
        this.dom.parseErrorIndication.title = !isNaN(line) ? 'parse error on line ' + line : 'parse error - check that the json is valid';
        this.dom.parseErrorIndication.onclick = this.toggleTableVisibility.bind(this);
      } else {
        this.dom.parseErrorIndication.style.display = 'none';
      }
    }
  }]);
}();

/***/ }),

/***/ 877:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   $: function() { return /* binding */ FocusTracker; }
/* harmony export */ });


/**
 * @constructor FocusTracker
 * A custom focus tracker for a DOM element with complex internal DOM structure
 * @param  {[Object]} config    A set of configurations for the FocusTracker
 *                {DOM Object} target *    The DOM object to track (required)
 *                {Function}   onFocus     onFocus callback
 *                {Function}   onBlur      onBlur callback
 *
 * @return
 */
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var FocusTracker = /*#__PURE__*/function () {
  function FocusTracker(config) {
    _classCallCheck(this, FocusTracker);
    this.target = config.target || null;
    if (!this.target) {
      throw new Error('FocusTracker constructor called without a "target" to track.');
    }
    this.onFocus = typeof config.onFocus === 'function' ? config.onFocus : null;
    this.onBlur = typeof config.onBlur === 'function' ? config.onBlur : null;
    this._onClick = this._onEvent.bind(this);
    this._onKeyUp = function (event) {
      if (event.which === 9 || event.keyCode === 9) {
        this._onEvent(event);
      }
    }.bind(this);
    this._onBlur = this._onEvent.bind(this);
    this.focusFlag = false;
    this.firstEventFlag = true;

    /*
      Adds required (click and keyup) event listeners to the 'document' object
      to track the focus of the given 'target'
     */
    if (this.onFocus || this.onBlur) {
      document.addEventListener('click', this._onClick);
      document.addEventListener('keyup', this._onKeyUp);
      document.addEventListener('blur', this._onBlur);
    }
  }

  /**
     * Removes the event listeners on the 'document' object
     * that were added to track the focus of the given 'target'
     */
  return _createClass(FocusTracker, [{
    key: "destroy",
    value: function destroy() {
      document.removeEventListener('click', this._onClick);
      document.removeEventListener('keyup', this._onKeyUp);
      document.removeEventListener('blur', this._onBlur);
      this._onEvent({
        target: document.body
      }); // calling _onEvent with body element in the hope that the FocusTracker is added to an element inside the body tag
    }

    /**
       * Tracks the focus of the target and calls the onFocus and onBlur
       * event callbacks if available.
       * @param {Event} [event]  The 'click' or 'keyup' event object,
       *                          from the respective events set on
       *              document object
       * @private
       */
  }, {
    key: "_onEvent",
    value: function _onEvent(event) {
      var target = event.target;
      var focusFlag;
      if (target === this.target) {
        focusFlag = true;
      } else if (this.target.contains(target) || this.target.contains(document.activeElement)) {
        focusFlag = true;
      } else {
        focusFlag = false;
      }
      if (focusFlag) {
        if (!this.focusFlag) {
          // trigger the onFocus callback
          if (this.onFocus) {
            this.onFocus({
              type: 'focus',
              target: this.target
            });
          }
          this.focusFlag = true;
        }
      } else {
        if (this.focusFlag || this.firstEventFlag) {
          // trigger the onBlur callback
          if (this.onBlur) {
            this.onBlur({
              type: 'blur',
              target: this.target
            });
          }
          this.focusFlag = false;

          /*
            When switching from one mode to another in the editor, the FocusTracker gets recreated.
            At that time, this.focusFlag will be init to 'false' and will fail the above if condition, when blur occurs
            this.firstEventFlag is added to overcome that issue
           */
          if (this.firstEventFlag) {
            this.firstEventFlag = false;
          }
        }
      }
    }
  }]);
}();

/***/ }),

/***/ 346:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var ace = __webpack_require__(413); // may be undefined in case of minimalist bundle
var VanillaPicker = __webpack_require__(746); // may be undefined in case of minimalist bundle
var _require = __webpack_require__(633),
  treeModeMixins = _require.treeModeMixins;
var _require2 = __webpack_require__(948),
  textModeMixins = _require2.textModeMixins;
var _require3 = __webpack_require__(483),
  previewModeMixins = _require3.previewModeMixins;
var _require4 = __webpack_require__(237),
  clear = _require4.clear,
  extend = _require4.extend,
  getInnerText = _require4.getInnerText,
  getInternetExplorerVersion = _require4.getInternetExplorerVersion,
  parse = _require4.parse;
var _require5 = __webpack_require__(870),
  tryRequireAjv = _require5.tryRequireAjv;
var _require6 = __webpack_require__(609),
  showTransformModal = _require6.showTransformModal;
var _require7 = __webpack_require__(915),
  showSortModal = _require7.showSortModal;
var Ajv = tryRequireAjv();
if (typeof Promise === 'undefined') {
  console.error('Promise undefined. Please load a Promise polyfill in the browser in order to use JSONEditor');
}

/**
 * @constructor JSONEditor
 * @param {Element} container    Container element
 * @param {Object}  [options]    Object with options. available options:
 *                               {String} mode        Editor mode. Available values:
 *                                                    'tree' (default), 'view',
 *                                                    'form', 'text', and 'code'.
 *                               {function} onChange  Callback method, triggered
 *                                                    on change of contents.
 *                                                    Does not pass the contents itself.
 *                                                    See also `onChangeJSON` and
 *                                                    `onChangeText`.
 *                               {function} onChangeJSON  Callback method, triggered
 *                                                        in modes on change of contents,
 *                                                        passing the changed contents
 *                                                        as JSON.
 *                                                        Only applicable for modes
 *                                                        'tree', 'view', and 'form'.
 *                               {function} onChangeText  Callback method, triggered
 *                                                        in modes on change of contents,
 *                                                        passing the changed contents
 *                                                        as stringified JSON.
 *                               {function} onError   Callback method, triggered
 *                                                    when an error occurs
 *                               {Boolean} search     Enable search box.
 *                                                    True by default
 *                                                    Only applicable for modes
 *                                                    'tree', 'view', and 'form'
 *                               {Boolean} history    Enable history (undo/redo).
 *                                                    True by default
 *                                                    Only applicable for modes
 *                                                    'tree', 'view', and 'form'
 *                               {String} name        Field name for the root node.
 *                                                    Only applicable for modes
 *                                                    'tree', 'view', and 'form'
 *                               {Number} indentation     Number of indentation
 *                                                        spaces. 4 by default.
 *                                                        Only applicable for
 *                                                        modes 'text' and 'code'
 *                               {boolean} escapeUnicode  If true, unicode
 *                                                        characters are escaped.
 *                                                        false by default.
 *                               {boolean} sortObjectKeys If true, object keys are
 *                                                        sorted before display.
 *                                                        false by default.
 *                               {function} onSelectionChange Callback method,
 *                                                            triggered on node selection change
 *                                                            Only applicable for modes
 *                                                            'tree', 'view', and 'form'
 *                               {function} onTextSelectionChange Callback method,
 *                                                                triggered on text selection change
 *                                                                Only applicable for modes
 *                               {HTMLElement} modalAnchor        The anchor element to apply an
 *                                                                overlay and display the modals in a
 *                                                                centered location.
 *                                                                Defaults to document.body
 *                                                                'text' and 'code'
 *                               {function} onEvent Callback method, triggered
 *                                                  when an event occurs in
 *                                                  a JSON field or value.
 *                                                  Only applicable for
 *                                                  modes 'form', 'tree' and
 *                                                  'view'
 *                               {function} onFocus  Callback method, triggered
 *                                                   when the editor comes into focus,
 *                                                   passing an object {type, target},
 *                                                   Applicable for all modes
 *                               {function} onBlur   Callback method, triggered
 *                                                   when the editor goes out of focus,
 *                                                   passing an object {type, target},
 *                                                   Applicable for all modes
 *                               {function} onClassName Callback method, triggered
 *                                                  when a Node DOM is rendered. Function returns
 *                                                  a css class name to be set on a node.
 *                                                  Only applicable for
 *                                                  modes 'form', 'tree' and
 *                                                  'view'
 *                               {Number} maxVisibleChilds Number of children allowed for a node
 *                                                         in 'tree', 'view', or 'form' mode before
 *                                                         the "show more/show all" buttons appear.
 *                                                         100 by default.
 *
 * @param {Object | undefined} json JSON object
 */
function JSONEditor(container, options, json) {
  if (!(this instanceof JSONEditor)) {
    throw new Error('JSONEditor constructor called without "new".');
  }

  // check for unsupported browser (IE8 and older)
  var ieVersion = getInternetExplorerVersion();
  if (ieVersion !== -1 && ieVersion < 9) {
    throw new Error('Unsupported browser, IE9 or newer required. ' + 'Please install the newest version of your browser.');
  }
  if (options) {
    // check for deprecated options
    if (options.error) {
      console.warn('Option "error" has been renamed to "onError"');
      options.onError = options.error;
      delete options.error;
    }
    if (options.change) {
      console.warn('Option "change" has been renamed to "onChange"');
      options.onChange = options.change;
      delete options.change;
    }
    if (options.editable) {
      console.warn('Option "editable" has been renamed to "onEditable"');
      options.onEditable = options.editable;
      delete options.editable;
    }

    // warn if onChangeJSON is used when mode can be `text` or `code`
    if (options.onChangeJSON) {
      if (options.mode === 'text' || options.mode === 'code' || options.modes && (options.modes.indexOf('text') !== -1 || options.modes.indexOf('code') !== -1)) {
        console.warn('Option "onChangeJSON" is not applicable to modes "text" and "code". ' + 'Use "onChangeText" or "onChange" instead.');
      }
    }

    // validate options
    if (options) {
      Object.keys(options).forEach(function (option) {
        if (JSONEditor.VALID_OPTIONS.indexOf(option) === -1) {
          console.warn('Unknown option "' + option + '". This option will be ignored');
        }
      });
    }
  }
  if (arguments.length) {
    this._create(container, options, json);
  }
}

/**
 * Configuration for all registered modes. Example:
 * {
 *     tree: {
 *         mixin: TreeEditor,
 *         data: 'json'
 *     },
 *     text: {
 *         mixin: TextEditor,
 *         data: 'text'
 *     }
 * }
 *
 * @type { Object.<String, {mixin: Object, data: String} > }
 */
JSONEditor.modes = {};

// debounce interval for JSON schema validation in milliseconds
JSONEditor.prototype.DEBOUNCE_INTERVAL = 150;
JSONEditor.VALID_OPTIONS = ['ajv', 'schema', 'schemaRefs', 'templates', 'ace', 'theme', 'autocomplete', 'onChange', 'onChangeJSON', 'onChangeText', 'onExpand', 'onEditable', 'onError', 'onEvent', 'onModeChange', 'onNodeName', 'onValidate', 'onCreateMenu', 'onSelectionChange', 'onTextSelectionChange', 'onClassName', 'onFocus', 'onBlur', 'colorPicker', 'onColorPicker', 'timestampTag', 'timestampFormat', 'escapeUnicode', 'history', 'search', 'mode', 'modes', 'name', 'indentation', 'sortObjectKeys', 'navigationBar', 'statusBar', 'mainMenuBar', 'languages', 'language', 'enableSort', 'enableTransform', 'limitDragging', 'maxVisibleChilds', 'onValidationError', 'modalAnchor', 'popupAnchor', 'createQuery', 'executeQuery', 'queryDescription', 'allowSchemaSuggestions', 'showErrorTable'];

/**
 * Create the JSONEditor
 * @param {Element} container    Container element
 * @param {Object}  [options]    See description in constructor
 * @param {Object | undefined} json JSON object
 * @private
 */
JSONEditor.prototype._create = function (container, options, json) {
  this.container = container;
  this.options = options || {};
  this.json = json || {};
  var mode = this.options.mode || this.options.modes && this.options.modes[0] || 'tree';
  this.setMode(mode);
};

/**
 * Destroy the editor. Clean up DOM, event listeners, and web workers.
 */
JSONEditor.prototype.destroy = function () {};

/**
 * Set JSON object in editor
 * @param {Object | undefined} json      JSON data
 */
JSONEditor.prototype.set = function (json) {
  this.json = json;
};

/**
 * Get JSON from the editor
 * @returns {Object} json
 */
JSONEditor.prototype.get = function () {
  return this.json;
};

/**
 * Set string containing JSON for the editor
 * @param {String | undefined} jsonText
 */
JSONEditor.prototype.setText = function (jsonText) {
  this.json = parse(jsonText);
};

/**
 * Get stringified JSON contents from the editor
 * @returns {String} jsonText
 */
JSONEditor.prototype.getText = function () {
  return JSON.stringify(this.json);
};

/**
 * Set a field name for the root node.
 * @param {String | undefined} name
 */
JSONEditor.prototype.setName = function (name) {
  if (!this.options) {
    this.options = {};
  }
  this.options.name = name;
};

/**
 * Get the field name for the root node.
 * @return {String | undefined} name
 */
JSONEditor.prototype.getName = function () {
  return this.options && this.options.name;
};

/**
 * Change the mode of the editor.
 * JSONEditor will be extended with all methods needed for the chosen mode.
 * @param {String} mode     Available modes: 'tree' (default), 'view', 'form',
 *                          'text', and 'code'.
 */
JSONEditor.prototype.setMode = function (mode) {
  // if the mode is the same as current mode (and it's not the first time), do nothing.
  if (mode === this.options.mode && this.create) {
    return;
  }
  var container = this.container;
  var options = extend({}, this.options);
  var oldMode = options.mode;
  options.mode = mode;
  var config = JSONEditor.modes[mode];
  if (!config) {
    throw new Error('Unknown mode "' + options.mode + '"');
  }
  var asText = config.data === 'text';
  var name = this.getName();
  var data = this[asText ? 'getText' : 'get'](); // get text or json

  this.destroy();
  clear(this);
  extend(this, config.mixin);
  this.create(container, options);
  this.setName(name);
  this[asText ? 'setText' : 'set'](data); // set text or json

  if (typeof config.load === 'function') {
    try {
      config.load.call(this);
    } catch (err) {
      console.error(err);
    }
  }
  if (typeof options.onModeChange === 'function' && mode !== oldMode) {
    try {
      options.onModeChange(mode, oldMode);
    } catch (err) {
      console.error(err);
    }
  }
};

/**
 * Get the current mode
 * @return {string}
 */
JSONEditor.prototype.getMode = function () {
  return this.options.mode;
};

/**
 * Throw an error. If an error callback is configured in options.error, this
 * callback will be invoked. Else, a basic alert window with the error message
 * will be shown to the user.
 * @param {Error} err
 * @private
 */
JSONEditor.prototype._onError = function (err) {
  if (this.options && typeof this.options.onError === 'function') {
    this.options.onError(err);
  } else {
    window.alert(err.toString());
  }
};

/**
 * Set a JSON schema for validation of the JSON object.
 * To remove the schema, call JSONEditor.setSchema(null)
 * @param {Object | null} schema
 * @param {Object.<string, Object>=} schemaRefs Schemas that are referenced using the `$ref` property from the JSON schema that are set in the `schema` option,
 +  the object structure in the form of `{reference_key: schemaObject}`
 */
JSONEditor.prototype.setSchema = function (schema, schemaRefs) {
  // compile a JSON schema validator if a JSON schema is provided
  if (schema) {
    var ajv;
    try {
      // grab ajv from options if provided, else create a new instance
      if (this.options.ajv) {
        ajv = this.options.ajv;
      } else {
        ajv = Ajv({
          allErrors: true,
          verbose: true,
          schemaId: 'auto',
          $data: true
        });

        // support both draft-04 and draft-06 alongside the latest draft-07
        ajv.addMetaSchema(__webpack_require__(Object(function webpackMissingModule() { var e = new Error("Cannot find module 'ajv/lib/refs/json-schema-draft-04.json'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())));
        ajv.addMetaSchema(__webpack_require__(Object(function webpackMissingModule() { var e = new Error("Cannot find module 'ajv/lib/refs/json-schema-draft-06.json'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())));
      }
    } catch (err) {
      console.warn('Failed to create an instance of Ajv, JSON Schema validation is not available. Please use a JSONEditor bundle including Ajv, or pass an instance of Ajv as via the configuration option `ajv`.');
    }
    if (ajv) {
      if (schemaRefs) {
        for (var ref in schemaRefs) {
          ajv.removeSchema(ref); // When updating a schema - old refs has to be removed first
          if (schemaRefs[ref]) {
            ajv.addSchema(schemaRefs[ref], ref);
          }
        }
        this.options.schemaRefs = schemaRefs;
      }
      this.validateSchema = ajv.compile(schema);

      // add schema to the options, so that when switching to an other mode,
      // the set schema is not lost
      this.options.schema = schema;
      this.options.schemaRefs = schemaRefs;

      // validate now
      this.validate();
    }
    this.refresh(); // update DOM
  } else {
    // remove current schema
    this.validateSchema = null;
    this.options.schema = null;
    this.options.schemaRefs = null;
    this.validate(); // to clear current error messages
    this.refresh(); // update DOM
  }
  if (typeof this._onSchemaChange === 'function') {
    this._onSchemaChange(schema, schemaRefs);
  }
};

/**
 * Validate current JSON object against the configured JSON schema
 * Throws an exception when no JSON schema is configured
 */
JSONEditor.prototype.validate = function () {
  // must be implemented by treemode and textmode
};

/**
 * Refresh the rendered contents
 */
JSONEditor.prototype.refresh = function () {
  // can be implemented by treemode and textmode
};

/**
 * Register a plugin with one ore multiple modes for the JSON Editor.
 *
 * A mode is described as an object with properties:
 *
 * - `mode: String`           The name of the mode.
 * - `mixin: Object`          An object containing the mixin functions which
 *                            will be added to the JSONEditor. Must contain functions
 *                            create, get, getText, set, and setText. May have
 *                            additional functions.
 *                            When the JSONEditor switches to a mixin, all mixin
 *                            functions are added to the JSONEditor, and then
 *                            the function `create(container, options)` is executed.
 * - `data: 'text' | 'json'`  The type of data that will be used to load the mixin.
 * - `[load: function]`       An optional function called after the mixin
 *                            has been loaded.
 *
 * @param {Object | Array} mode  A mode object or an array with multiple mode objects.
 */
JSONEditor.registerMode = function (mode) {
  var i, prop;
  if (Array.isArray(mode)) {
    // multiple modes
    for (i = 0; i < mode.length; i++) {
      JSONEditor.registerMode(mode[i]);
    }
  } else {
    // validate the new mode
    if (!('mode' in mode)) throw new Error('Property "mode" missing');
    if (!('mixin' in mode)) throw new Error('Property "mixin" missing');
    if (!('data' in mode)) throw new Error('Property "data" missing');
    var name = mode.mode;
    if (name in JSONEditor.modes) {
      throw new Error('Mode "' + name + '" already registered');
    }

    // validate the mixin
    if (typeof mode.mixin.create !== 'function') {
      throw new Error('Required function "create" missing on mixin');
    }
    var reserved = ['setMode', 'registerMode', 'modes'];
    for (i = 0; i < reserved.length; i++) {
      prop = reserved[i];
      if (prop in mode.mixin) {
        throw new Error('Reserved property "' + prop + '" not allowed in mixin');
      }
    }
    JSONEditor.modes[name] = mode;
  }
};

// register tree, text, and preview modes
JSONEditor.registerMode(treeModeMixins);
JSONEditor.registerMode(textModeMixins);
JSONEditor.registerMode(previewModeMixins);

// expose some of the libraries that can be used customized
JSONEditor.ace = ace;
JSONEditor.Ajv = Ajv;
JSONEditor.VanillaPicker = VanillaPicker;

// expose some utils (this is undocumented, unofficial)
JSONEditor.showTransformModal = showTransformModal;
JSONEditor.showSortModal = showSortModal;
JSONEditor.getInnerText = getInnerText;

// default export for TypeScript ES6 projects
JSONEditor["default"] = JSONEditor;
module.exports = JSONEditor;

/***/ }),

/***/ 389:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   n: function() { return /* binding */ ModeSwitcher; }
/* harmony export */ });
/* harmony import */ var _ContextMenu__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(545);
/* harmony import */ var _i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(57);


function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }



/**
 * Create a select box to be used in the editor menu's, which allows to switch mode
 * @param {HTMLElement} container
 * @param {String[]} modes  Available modes: 'code', 'form', 'text', 'tree', 'view', 'preview'
 * @param {String} current  Available modes: 'code', 'form', 'text', 'tree', 'view', 'preview'
 * @param {function(mode: string)} onSwitch  Callback invoked on switch
 * @constructor
 */
var ModeSwitcher = /*#__PURE__*/function () {
  function ModeSwitcher(container, modes, current, onSwitch) {
    _classCallCheck(this, ModeSwitcher);
    // available modes
    var availableModes = {
      code: {
        text: (0,_i18n__WEBPACK_IMPORTED_MODULE_1__/* .translate */ .Tl)('modeCodeText'),
        title: (0,_i18n__WEBPACK_IMPORTED_MODULE_1__/* .translate */ .Tl)('modeCodeTitle'),
        click: function click() {
          onSwitch('code');
        }
      },
      form: {
        text: (0,_i18n__WEBPACK_IMPORTED_MODULE_1__/* .translate */ .Tl)('modeFormText'),
        title: (0,_i18n__WEBPACK_IMPORTED_MODULE_1__/* .translate */ .Tl)('modeFormTitle'),
        click: function click() {
          onSwitch('form');
        }
      },
      text: {
        text: (0,_i18n__WEBPACK_IMPORTED_MODULE_1__/* .translate */ .Tl)('modeTextText'),
        title: (0,_i18n__WEBPACK_IMPORTED_MODULE_1__/* .translate */ .Tl)('modeTextTitle'),
        click: function click() {
          onSwitch('text');
        }
      },
      tree: {
        text: (0,_i18n__WEBPACK_IMPORTED_MODULE_1__/* .translate */ .Tl)('modeTreeText'),
        title: (0,_i18n__WEBPACK_IMPORTED_MODULE_1__/* .translate */ .Tl)('modeTreeTitle'),
        click: function click() {
          onSwitch('tree');
        }
      },
      view: {
        text: (0,_i18n__WEBPACK_IMPORTED_MODULE_1__/* .translate */ .Tl)('modeViewText'),
        title: (0,_i18n__WEBPACK_IMPORTED_MODULE_1__/* .translate */ .Tl)('modeViewTitle'),
        click: function click() {
          onSwitch('view');
        }
      },
      preview: {
        text: (0,_i18n__WEBPACK_IMPORTED_MODULE_1__/* .translate */ .Tl)('modePreviewText'),
        title: (0,_i18n__WEBPACK_IMPORTED_MODULE_1__/* .translate */ .Tl)('modePreviewTitle'),
        click: function click() {
          onSwitch('preview');
        }
      }
    };

    // list the selected modes
    var items = [];
    for (var i = 0; i < modes.length; i++) {
      var mode = modes[i];
      var item = availableModes[mode];
      if (!item) {
        throw new Error('Unknown mode "' + mode + '"');
      }
      item.className = 'jsoneditor-type-modes' + (current === mode ? ' jsoneditor-selected' : '');
      items.push(item);
    }

    // retrieve the title of current mode
    var currentMode = availableModes[current];
    if (!currentMode) {
      throw new Error('Unknown mode "' + current + '"');
    }
    var currentTitle = currentMode.text;

    // create the html element
    var box = document.createElement('button');
    box.type = 'button';
    box.className = 'jsoneditor-modes jsoneditor-separator';
    box.textContent = currentTitle + " \u25BE";
    box.title = (0,_i18n__WEBPACK_IMPORTED_MODULE_1__/* .translate */ .Tl)('modeEditorTitle');
    box.onclick = function () {
      var menu = new _ContextMenu__WEBPACK_IMPORTED_MODULE_0__/* .ContextMenu */ .t(items);
      menu.show(box, container);
    };
    var frame = document.createElement('div');
    frame.className = 'jsoneditor-modes';
    frame.style.position = 'relative';
    frame.appendChild(box);
    container.appendChild(frame);
    this.dom = {
      container: container,
      box: box,
      frame: frame
    };
  }

  /**
   * Set focus to switcher
   */
  return _createClass(ModeSwitcher, [{
    key: "focus",
    value: function focus() {
      this.dom.box.focus();
    }

    /**
     * Destroy the ModeSwitcher, remove from DOM
     */
  }, {
    key: "destroy",
    value: function destroy() {
      if (this.dom && this.dom.frame && this.dom.frame.parentNode) {
        this.dom.frame.parentNode.removeChild(this.dom.frame);
      }
      this.dom = null;
    }
  }]);
}();

/***/ }),

/***/ 413:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var ace;
if (window.ace) {
  // use the already loaded instance of Ace
  ace = window.ace;
} else {
  try {
    // load Ace editor
    ace = __webpack_require__(Object(function webpackMissingModule() { var e = new Error("Cannot find module 'ace-builds/src-noconflict/ace'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

    // load required Ace plugins
    __webpack_require__(Object(function webpackMissingModule() { var e = new Error("Cannot find module 'ace-builds/src-noconflict/mode-json'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
    __webpack_require__(Object(function webpackMissingModule() { var e = new Error("Cannot find module 'ace-builds/src-noconflict/ext-searchbox'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
    __webpack_require__(Object(function webpackMissingModule() { var e = new Error("Cannot find module 'ace-builds/src-noconflict/ext-language_tools'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
    // embed Ace json worker
    // https://github.com/ajaxorg/ace/issues/3913
    var jsonWorkerDataUrl = __webpack_require__(Object(function webpackMissingModule() { var e = new Error("Cannot find module '../generated/worker-json-data-url'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
    ace.config.setModuleUrl('ace/mode/json_worker', jsonWorkerDataUrl);
  } catch (err) {
    // failed to load Ace (can be minimalist bundle).
    // No worries, the editor will fall back to plain text if needed.
  }
}
module.exports = ace;

/***/ }),

/***/ 762:
/***/ (function() {

/* ***** BEGIN LICENSE BLOCK *****
 * Distributed under the BSD license:
 *
 * Copyright (c) 2010, Ajax.org B.V.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of Ajax.org B.V. nor the
 *       names of its contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL AJAX.ORG B.V. BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 * ***** END LICENSE BLOCK ***** */

window.ace.define('ace/theme/jsoneditor', ['require', 'exports', 'module', 'ace/lib/dom'], function (acequire, exports, module) {
  exports.isDark = false;
  exports.cssClass = 'ace-jsoneditor';
  exports.cssText = ".ace-jsoneditor .ace_gutter {\nbackground: #ebebeb;\ncolor: #333\n}\n\n.ace-jsoneditor.ace_editor {\nline-height: 1.3;\nbackground-color: #fff;\n}\n.ace-jsoneditor .ace_print-margin {\nwidth: 1px;\nbackground: #e8e8e8\n}\n.ace-jsoneditor .ace_scroller {\nbackground-color: #FFFFFF\n}\n.ace-jsoneditor .ace_text-layer {\ncolor: gray\n}\n.ace-jsoneditor .ace_variable {\ncolor: #1a1a1a\n}\n.ace-jsoneditor .ace_cursor {\nborder-left: 2px solid #000000\n}\n.ace-jsoneditor .ace_overwrite-cursors .ace_cursor {\nborder-left: 0px;\nborder-bottom: 1px solid #000000\n}\n.ace-jsoneditor .ace_marker-layer .ace_selection {\nbackground: lightgray\n}\n.ace-jsoneditor.ace_multiselect .ace_selection.ace_start {\nbox-shadow: 0 0 3px 0px #FFFFFF;\nborder-radius: 2px\n}\n.ace-jsoneditor .ace_marker-layer .ace_step {\nbackground: rgb(255, 255, 0)\n}\n.ace-jsoneditor .ace_marker-layer .ace_bracket {\nmargin: -1px 0 0 -1px;\nborder: 1px solid #BFBFBF\n}\n.ace-jsoneditor .ace_marker-layer .ace_active-line {\nbackground: #FFFBD1\n}\n.ace-jsoneditor .ace_gutter-active-line {\nbackground-color : #dcdcdc\n}\n.ace-jsoneditor .ace_marker-layer .ace_selected-word {\nborder: 1px solid lightgray\n}\n.ace-jsoneditor .ace_invisible {\ncolor: #BFBFBF\n}\n.ace-jsoneditor .ace_keyword,\n.ace-jsoneditor .ace_meta,\n.ace-jsoneditor .ace_support.ace_constant.ace_property-value {\ncolor: #AF956F\n}\n.ace-jsoneditor .ace_keyword.ace_operator {\ncolor: #484848\n}\n.ace-jsoneditor .ace_keyword.ace_other.ace_unit {\ncolor: #96DC5F\n}\n.ace-jsoneditor .ace_constant.ace_language {\ncolor: darkorange\n}\n.ace-jsoneditor .ace_constant.ace_numeric {\ncolor: red\n}\n.ace-jsoneditor .ace_constant.ace_character.ace_entity {\ncolor: #BF78CC\n}\n.ace-jsoneditor .ace_invalid {\ncolor: #FFFFFF;\nbackground-color: #FF002A;\n}\n.ace-jsoneditor .ace_fold {\nbackground-color: #AF956F;\nborder-color: #000000\n}\n.ace-jsoneditor .ace_storage,\n.ace-jsoneditor .ace_support.ace_class,\n.ace-jsoneditor .ace_support.ace_function,\n.ace-jsoneditor .ace_support.ace_other,\n.ace-jsoneditor .ace_support.ace_type {\ncolor: #C52727\n}\n.ace-jsoneditor .ace_string {\ncolor: green\n}\n.ace-jsoneditor .ace_comment {\ncolor: #BCC8BA\n}\n.ace-jsoneditor .ace_entity.ace_name.ace_tag,\n.ace-jsoneditor .ace_entity.ace_other.ace_attribute-name {\ncolor: #606060\n}\n.ace-jsoneditor .ace_markup.ace_underline {\ntext-decoration: underline\n}\n.ace-jsoneditor .ace_indent-guide {\nbackground: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAACCAYAAACZgbYnAAAAE0lEQVQImWP4////f4bLly//BwAmVgd1/w11/gAAAABJRU5ErkJggg==\") right repeat-y\n}";
  var dom = acequire('../lib/dom');
  dom.importCssString(exports.cssText, exports.cssClass);
});

/***/ }),

/***/ 736:
/***/ (function(__unused_webpack_module, exports) {

/* Jison generated parser */
var jsonlint = function () {
  var parser = {
    trace: function trace() {},
    yy: {},
    symbols_: {
      "error": 2,
      "JSONString": 3,
      "STRING": 4,
      "JSONNumber": 5,
      "NUMBER": 6,
      "JSONNullLiteral": 7,
      "NULL": 8,
      "JSONBooleanLiteral": 9,
      "TRUE": 10,
      "FALSE": 11,
      "JSONText": 12,
      "JSONValue": 13,
      "EOF": 14,
      "JSONObject": 15,
      "JSONArray": 16,
      "{": 17,
      "}": 18,
      "JSONMemberList": 19,
      "JSONMember": 20,
      ":": 21,
      ",": 22,
      "[": 23,
      "]": 24,
      "JSONElementList": 25,
      "$accept": 0,
      "$end": 1
    },
    terminals_: {
      2: "error",
      4: "STRING",
      6: "NUMBER",
      8: "NULL",
      10: "TRUE",
      11: "FALSE",
      14: "EOF",
      17: "{",
      18: "}",
      21: ":",
      22: ",",
      23: "[",
      24: "]"
    },
    productions_: [0, [3, 1], [5, 1], [7, 1], [9, 1], [9, 1], [12, 2], [13, 1], [13, 1], [13, 1], [13, 1], [13, 1], [13, 1], [15, 2], [15, 3], [20, 3], [19, 1], [19, 3], [16, 2], [16, 3], [25, 1], [25, 3]],
    performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate, $$, _$) {
      var $0 = $$.length - 1;
      switch (yystate) {
        case 1:
          // replace escaped characters with actual character
          this.$ = yytext.replace(/\\(\\|")/g, "$" + "1").replace(/\\n/g, '\n').replace(/\\r/g, '\r').replace(/\\t/g, '\t').replace(/\\v/g, '\v').replace(/\\f/g, '\f').replace(/\\b/g, '\b');
          break;
        case 2:
          this.$ = Number(yytext);
          break;
        case 3:
          this.$ = null;
          break;
        case 4:
          this.$ = true;
          break;
        case 5:
          this.$ = false;
          break;
        case 6:
          return this.$ = $$[$0 - 1];
          break;
        case 13:
          this.$ = {};
          break;
        case 14:
          this.$ = $$[$0 - 1];
          break;
        case 15:
          this.$ = [$$[$0 - 2], $$[$0]];
          break;
        case 16:
          this.$ = {};
          this.$[$$[$0][0]] = $$[$0][1];
          break;
        case 17:
          this.$ = $$[$0 - 2];
          $$[$0 - 2][$$[$0][0]] = $$[$0][1];
          break;
        case 18:
          this.$ = [];
          break;
        case 19:
          this.$ = $$[$0 - 1];
          break;
        case 20:
          this.$ = [$$[$0]];
          break;
        case 21:
          this.$ = $$[$0 - 2];
          $$[$0 - 2].push($$[$0]);
          break;
      }
    },
    table: [{
      3: 5,
      4: [1, 12],
      5: 6,
      6: [1, 13],
      7: 3,
      8: [1, 9],
      9: 4,
      10: [1, 10],
      11: [1, 11],
      12: 1,
      13: 2,
      15: 7,
      16: 8,
      17: [1, 14],
      23: [1, 15]
    }, {
      1: [3]
    }, {
      14: [1, 16]
    }, {
      14: [2, 7],
      18: [2, 7],
      22: [2, 7],
      24: [2, 7]
    }, {
      14: [2, 8],
      18: [2, 8],
      22: [2, 8],
      24: [2, 8]
    }, {
      14: [2, 9],
      18: [2, 9],
      22: [2, 9],
      24: [2, 9]
    }, {
      14: [2, 10],
      18: [2, 10],
      22: [2, 10],
      24: [2, 10]
    }, {
      14: [2, 11],
      18: [2, 11],
      22: [2, 11],
      24: [2, 11]
    }, {
      14: [2, 12],
      18: [2, 12],
      22: [2, 12],
      24: [2, 12]
    }, {
      14: [2, 3],
      18: [2, 3],
      22: [2, 3],
      24: [2, 3]
    }, {
      14: [2, 4],
      18: [2, 4],
      22: [2, 4],
      24: [2, 4]
    }, {
      14: [2, 5],
      18: [2, 5],
      22: [2, 5],
      24: [2, 5]
    }, {
      14: [2, 1],
      18: [2, 1],
      21: [2, 1],
      22: [2, 1],
      24: [2, 1]
    }, {
      14: [2, 2],
      18: [2, 2],
      22: [2, 2],
      24: [2, 2]
    }, {
      3: 20,
      4: [1, 12],
      18: [1, 17],
      19: 18,
      20: 19
    }, {
      3: 5,
      4: [1, 12],
      5: 6,
      6: [1, 13],
      7: 3,
      8: [1, 9],
      9: 4,
      10: [1, 10],
      11: [1, 11],
      13: 23,
      15: 7,
      16: 8,
      17: [1, 14],
      23: [1, 15],
      24: [1, 21],
      25: 22
    }, {
      1: [2, 6]
    }, {
      14: [2, 13],
      18: [2, 13],
      22: [2, 13],
      24: [2, 13]
    }, {
      18: [1, 24],
      22: [1, 25]
    }, {
      18: [2, 16],
      22: [2, 16]
    }, {
      21: [1, 26]
    }, {
      14: [2, 18],
      18: [2, 18],
      22: [2, 18],
      24: [2, 18]
    }, {
      22: [1, 28],
      24: [1, 27]
    }, {
      22: [2, 20],
      24: [2, 20]
    }, {
      14: [2, 14],
      18: [2, 14],
      22: [2, 14],
      24: [2, 14]
    }, {
      3: 20,
      4: [1, 12],
      20: 29
    }, {
      3: 5,
      4: [1, 12],
      5: 6,
      6: [1, 13],
      7: 3,
      8: [1, 9],
      9: 4,
      10: [1, 10],
      11: [1, 11],
      13: 30,
      15: 7,
      16: 8,
      17: [1, 14],
      23: [1, 15]
    }, {
      14: [2, 19],
      18: [2, 19],
      22: [2, 19],
      24: [2, 19]
    }, {
      3: 5,
      4: [1, 12],
      5: 6,
      6: [1, 13],
      7: 3,
      8: [1, 9],
      9: 4,
      10: [1, 10],
      11: [1, 11],
      13: 31,
      15: 7,
      16: 8,
      17: [1, 14],
      23: [1, 15]
    }, {
      18: [2, 17],
      22: [2, 17]
    }, {
      18: [2, 15],
      22: [2, 15]
    }, {
      22: [2, 21],
      24: [2, 21]
    }],
    defaultActions: {
      16: [2, 6]
    },
    parseError: function parseError(str, hash) {
      throw new Error(str);
    },
    parse: function parse(input) {
      var self = this,
        stack = [0],
        vstack = [null],
        // semantic value stack
        lstack = [],
        // location stack
        table = this.table,
        yytext = '',
        yylineno = 0,
        yyleng = 0,
        recovering = 0,
        TERROR = 2,
        EOF = 1;

      //this.reductionCount = this.shiftCount = 0;

      this.lexer.setInput(input);
      this.lexer.yy = this.yy;
      this.yy.lexer = this.lexer;
      if (typeof this.lexer.yylloc == 'undefined') this.lexer.yylloc = {};
      var yyloc = this.lexer.yylloc;
      lstack.push(yyloc);
      if (typeof this.yy.parseError === 'function') this.parseError = this.yy.parseError;
      function popStack(n) {
        stack.length = stack.length - 2 * n;
        vstack.length = vstack.length - n;
        lstack.length = lstack.length - n;
      }
      function lex() {
        var token;
        token = self.lexer.lex() || 1; // $end = 1
        // if token isn't its numeric value, convert
        if (typeof token !== 'number') {
          token = self.symbols_[token] || token;
        }
        return token;
      }
      var symbol,
        preErrorSymbol,
        state,
        action,
        a,
        r,
        yyval = {},
        p,
        len,
        newState,
        expected;
      while (true) {
        // retreive state number from top of stack
        state = stack[stack.length - 1];

        // use default actions if available
        if (this.defaultActions[state]) {
          action = this.defaultActions[state];
        } else {
          if (symbol == null) symbol = lex();
          // read action for current state and first input
          action = table[state] && table[state][symbol];
        }

        // handle parse error
        _handle_error: if (typeof action === 'undefined' || !action.length || !action[0]) {
          if (!recovering) {
            // Report error
            expected = [];
            for (p in table[state]) if (this.terminals_[p] && p > 2) {
              expected.push("'" + this.terminals_[p] + "'");
            }
            var errStr = '';
            if (this.lexer.showPosition) {
              errStr = 'Parse error on line ' + (yylineno + 1) + ":\n" + this.lexer.showPosition() + "\nExpecting " + expected.join(', ') + ", got '" + this.terminals_[symbol] + "'";
            } else {
              errStr = 'Parse error on line ' + (yylineno + 1) + ": Unexpected " + (symbol == 1 /*EOF*/ ? "end of input" : "'" + (this.terminals_[symbol] || symbol) + "'");
            }
            this.parseError(errStr, {
              text: this.lexer.match,
              token: this.terminals_[symbol] || symbol,
              line: this.lexer.yylineno,
              loc: yyloc,
              expected: expected
            });
          }

          // just recovered from another error
          if (recovering == 3) {
            if (symbol == EOF) {
              throw new Error(errStr || 'Parsing halted.');
            }

            // discard current lookahead and grab another
            yyleng = this.lexer.yyleng;
            yytext = this.lexer.yytext;
            yylineno = this.lexer.yylineno;
            yyloc = this.lexer.yylloc;
            symbol = lex();
          }

          // try to recover from error
          while (1) {
            // check for error recovery rule in this state
            if (TERROR.toString() in table[state]) {
              break;
            }
            if (state == 0) {
              throw new Error(errStr || 'Parsing halted.');
            }
            popStack(1);
            state = stack[stack.length - 1];
          }
          preErrorSymbol = symbol; // save the lookahead token
          symbol = TERROR; // insert generic error symbol as new lookahead
          state = stack[stack.length - 1];
          action = table[state] && table[state][TERROR];
          recovering = 3; // allow 3 real symbols to be shifted before reporting a new error
        }

        // this shouldn't happen, unless resolve defaults are off
        if (action[0] instanceof Array && action.length > 1) {
          throw new Error('Parse Error: multiple actions possible at state: ' + state + ', token: ' + symbol);
        }
        switch (action[0]) {
          case 1:
            // shift
            //this.shiftCount++;

            stack.push(symbol);
            vstack.push(this.lexer.yytext);
            lstack.push(this.lexer.yylloc);
            stack.push(action[1]); // push state
            symbol = null;
            if (!preErrorSymbol) {
              // normal execution/no error
              yyleng = this.lexer.yyleng;
              yytext = this.lexer.yytext;
              yylineno = this.lexer.yylineno;
              yyloc = this.lexer.yylloc;
              if (recovering > 0) recovering--;
            } else {
              // error just occurred, resume old lookahead f/ before error
              symbol = preErrorSymbol;
              preErrorSymbol = null;
            }
            break;
          case 2:
            // reduce
            //this.reductionCount++;

            len = this.productions_[action[1]][1];

            // perform semantic action
            yyval.$ = vstack[vstack.length - len]; // default to $$ = $1
            // default location, uses first token for firsts, last for lasts
            yyval._$ = {
              first_line: lstack[lstack.length - (len || 1)].first_line,
              last_line: lstack[lstack.length - 1].last_line,
              first_column: lstack[lstack.length - (len || 1)].first_column,
              last_column: lstack[lstack.length - 1].last_column
            };
            r = this.performAction.call(yyval, yytext, yyleng, yylineno, this.yy, action[1], vstack, lstack);
            if (typeof r !== 'undefined') {
              return r;
            }

            // pop off stack
            if (len) {
              stack = stack.slice(0, -1 * len * 2);
              vstack = vstack.slice(0, -1 * len);
              lstack = lstack.slice(0, -1 * len);
            }
            stack.push(this.productions_[action[1]][0]); // push nonterminal (reduce)
            vstack.push(yyval.$);
            lstack.push(yyval._$);
            // goto new state = table[STATE][NONTERMINAL]
            newState = table[stack[stack.length - 2]][stack[stack.length - 1]];
            stack.push(newState);
            break;
          case 3:
            // accept
            return true;
        }
      }
      return true;
    }
  };
  /* Jison generated lexer */
  var lexer = function () {
    var lexer = {
      EOF: 1,
      parseError: function parseError(str, hash) {
        if (this.yy.parseError) {
          this.yy.parseError(str, hash);
        } else {
          throw new Error(str);
        }
      },
      setInput: function setInput(input) {
        this._input = input;
        this._more = this._less = this.done = false;
        this.yylineno = this.yyleng = 0;
        this.yytext = this.matched = this.match = '';
        this.conditionStack = ['INITIAL'];
        this.yylloc = {
          first_line: 1,
          first_column: 0,
          last_line: 1,
          last_column: 0
        };
        return this;
      },
      input: function input() {
        var ch = this._input[0];
        this.yytext += ch;
        this.yyleng++;
        this.match += ch;
        this.matched += ch;
        var lines = ch.match(/\n/);
        if (lines) this.yylineno++;
        this._input = this._input.slice(1);
        return ch;
      },
      unput: function unput(ch) {
        this._input = ch + this._input;
        return this;
      },
      more: function more() {
        this._more = true;
        return this;
      },
      less: function less(n) {
        this._input = this.match.slice(n) + this._input;
      },
      pastInput: function pastInput() {
        var past = this.matched.substr(0, this.matched.length - this.match.length);
        return (past.length > 20 ? '...' : '') + past.substr(-20).replace(/\n/g, "");
      },
      upcomingInput: function upcomingInput() {
        var next = this.match;
        if (next.length < 20) {
          next += this._input.substr(0, 20 - next.length);
        }
        return (next.substr(0, 20) + (next.length > 20 ? '...' : '')).replace(/\n/g, "");
      },
      showPosition: function showPosition() {
        var pre = this.pastInput();
        var c = new Array(pre.length + 1).join("-");
        return pre + this.upcomingInput() + "\n" + c + "^";
      },
      next: function next() {
        if (this.done) {
          return this.EOF;
        }
        if (!this._input) this.done = true;
        var token, match, tempMatch, index, col, lines;
        if (!this._more) {
          this.yytext = '';
          this.match = '';
        }
        var rules = this._currentRules();
        for (var i = 0; i < rules.length; i++) {
          tempMatch = this._input.match(this.rules[rules[i]]);
          if (tempMatch && (!match || tempMatch[0].length > match[0].length)) {
            match = tempMatch;
            index = i;
            if (!this.options.flex) break;
          }
        }
        if (match) {
          lines = match[0].match(/\n.*/g);
          if (lines) this.yylineno += lines.length;
          this.yylloc = {
            first_line: this.yylloc.last_line,
            last_line: this.yylineno + 1,
            first_column: this.yylloc.last_column,
            last_column: lines ? lines[lines.length - 1].length - 1 : this.yylloc.last_column + match[0].length
          };
          this.yytext += match[0];
          this.match += match[0];
          this.yyleng = this.yytext.length;
          this._more = false;
          this._input = this._input.slice(match[0].length);
          this.matched += match[0];
          token = this.performAction.call(this, this.yy, this, rules[index], this.conditionStack[this.conditionStack.length - 1]);
          if (this.done && this._input) this.done = false;
          if (token) return token;else return;
        }
        if (this._input === "") {
          return this.EOF;
        } else {
          this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. Unrecognized text.\n' + this.showPosition(), {
            text: "",
            token: null,
            line: this.yylineno
          });
        }
      },
      lex: function lex() {
        var r = this.next();
        if (typeof r !== 'undefined') {
          return r;
        } else {
          return this.lex();
        }
      },
      begin: function begin(condition) {
        this.conditionStack.push(condition);
      },
      popState: function popState() {
        return this.conditionStack.pop();
      },
      _currentRules: function _currentRules() {
        return this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules;
      },
      topState: function topState() {
        return this.conditionStack[this.conditionStack.length - 2];
      },
      pushState: function begin(condition) {
        this.begin(condition);
      }
    };
    lexer.options = {};
    lexer.performAction = function anonymous(yy, yy_, $avoiding_name_collisions, YY_START) {
      var YYSTATE = YY_START;
      switch ($avoiding_name_collisions) {
        case 0:
          /* skip whitespace */
          break;
        case 1:
          return 6;
          break;
        case 2:
          yy_.yytext = yy_.yytext.substr(1, yy_.yyleng - 2);
          return 4;
          break;
        case 3:
          return 17;
          break;
        case 4:
          return 18;
          break;
        case 5:
          return 23;
          break;
        case 6:
          return 24;
          break;
        case 7:
          return 22;
          break;
        case 8:
          return 21;
          break;
        case 9:
          return 10;
          break;
        case 10:
          return 11;
          break;
        case 11:
          return 8;
          break;
        case 12:
          return 14;
          break;
        case 13:
          return 'INVALID';
          break;
      }
    };
    lexer.rules = [/^(?:\s+)/, /^(?:(-?([0-9]|[1-9][0-9]+))(\.[0-9]+)?([eE][-+]?[0-9]+)?\b)/, /^(?:"(?:\\[\\"bfnrt/]|\\u[a-fA-F0-9]{4}|[^\\\0-\x09\x0a-\x1f"])*")/, /^(?:\{)/, /^(?:\})/, /^(?:\[)/, /^(?:\])/, /^(?:,)/, /^(?::)/, /^(?:true\b)/, /^(?:false\b)/, /^(?:null\b)/, /^(?:$)/, /^(?:.)/];
    lexer.conditions = {
      "INITIAL": {
        "rules": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
        "inclusive": true
      }
    };
    ;
    return lexer;
  }();
  parser.lexer = lexer;
  return parser;
}();
if (true) {
  exports.parser = jsonlint;
  exports.parse = jsonlint.parse.bind(jsonlint);
}

/***/ }),

/***/ 772:
/***/ (function(module) {

"use strict";
/*!
 * Selectr 2.4.13
 * http://mobius.ovh/docs/selectr
 *
 * Released under the MIT license
 */



/**
 * Event Emitter
 */
var Events = function Events() {};

/**
 * Event Prototype
 * @type {Object}
 */
Events.prototype = {
  /**
   * Add custom event listener
   * @param  {String} event Event type
   * @param  {Function} func   Callback
   * @return {Void}
   */
  on: function on(event, func) {
    this._events = this._events || {};
    this._events[event] = this._events[event] || [];
    this._events[event].push(func);
  },
  /**
   * Remove custom event listener
   * @param  {String} event Event type
   * @param  {Function} func   Callback
   * @return {Void}
   */
  off: function off(event, func) {
    this._events = this._events || {};
    if (event in this._events === false) return;
    this._events[event].splice(this._events[event].indexOf(func), 1);
  },
  /**
   * Fire a custom event
   * @param  {String} event Event type
   * @return {Void}
   */
  emit: function emit(event /* , args... */) {
    this._events = this._events || {};
    if (event in this._events === false) return;
    for (var i = 0; i < this._events[event].length; i++) {
      this._events[event][i].apply(this, Array.prototype.slice.call(arguments, 1));
    }
  }
};

/**
 * Event mixin
 * @param  {Object} obj
 * @return {Object}
 */
Events.mixin = function (obj) {
  var props = ['on', 'off', 'emit'];
  for (var i = 0; i < props.length; i++) {
    if (typeof obj === 'function') {
      obj.prototype[props[i]] = Events.prototype[props[i]];
    } else {
      obj[props[i]] = Events.prototype[props[i]];
    }
  }
  return obj;
};

/**
 * Helpers
 * @type {Object}
 */
var util = {
  escapeRegExp: function escapeRegExp(str) {
    // source from lodash 3.0.0
    var _reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
    var _reHasRegExpChar = new RegExp(_reRegExpChar.source);
    return str && _reHasRegExpChar.test(str) ? str.replace(_reRegExpChar, '\\$&') : str;
  },
  extend: function extend(src, props) {
    for (var prop in props) {
      if (props.hasOwnProperty(prop)) {
        var val = props[prop];
        if (val && Object.prototype.toString.call(val) === "[object Object]") {
          src[prop] = src[prop] || {};
          util.extend(src[prop], val);
        } else {
          src[prop] = val;
        }
      }
    }
    return src;
  },
  each: function each(a, b, c) {
    if ("[object Object]" === Object.prototype.toString.call(a)) {
      for (var d in a) {
        if (Object.prototype.hasOwnProperty.call(a, d)) {
          b.call(c, d, a[d], a);
        }
      }
    } else {
      for (var e = 0, f = a.length; e < f; e++) {
        b.call(c, e, a[e], a);
      }
    }
  },
  createElement: function createElement(e, a) {
    var d = document,
      el = d.createElement(e);
    if (a && "[object Object]" === Object.prototype.toString.call(a)) {
      var i;
      for (i in a) if (i in el) el[i] = a[i];else if ("html" === i) el.innerHTML = a[i];else el.setAttribute(i, a[i]);
    }
    return el;
  },
  hasClass: function hasClass(a, b) {
    if (a) return a.classList ? a.classList.contains(b) : !!a.className && !!a.className.match(new RegExp("(\\s|^)" + b + "(\\s|$)"));
  },
  addClass: function addClass(a, b) {
    if (!util.hasClass(a, b)) {
      if (a.classList) {
        a.classList.add(b);
      } else {
        a.className = a.className.trim() + " " + b;
      }
    }
  },
  removeClass: function removeClass(a, b) {
    if (util.hasClass(a, b)) {
      if (a.classList) {
        a.classList.remove(b);
      } else {
        a.className = a.className.replace(new RegExp("(^|\\s)" + b.split(" ").join("|") + "(\\s|$)", "gi"), " ");
      }
    }
  },
  closest: function closest(el, fn) {
    return el && el !== document.body && (fn(el) ? el : util.closest(el.parentNode, fn));
  },
  isInt: function isInt(val) {
    return typeof val === 'number' && isFinite(val) && Math.floor(val) === val;
  },
  debounce: function debounce(a, b, c) {
    var d;
    return function () {
      var e = this,
        f = arguments,
        g = function g() {
          d = null;
          if (!c) a.apply(e, f);
        },
        h = c && !d;
      clearTimeout(d);
      d = setTimeout(g, b);
      if (h) {
        a.apply(e, f);
      }
    };
  },
  rect: function rect(el, abs) {
    var w = window;
    var r = el.getBoundingClientRect();
    var x = abs ? w.pageXOffset : 0;
    var y = abs ? w.pageYOffset : 0;
    return {
      bottom: r.bottom + y,
      height: r.height,
      left: r.left + x,
      right: r.right + x,
      top: r.top + y,
      width: r.width
    };
  },
  includes: function includes(a, b) {
    return a.indexOf(b) > -1;
  },
  startsWith: function startsWith(a, b) {
    return a.substr(0, b.length) === b;
  },
  truncate: function truncate(el) {
    while (el.firstChild) {
      el.removeChild(el.firstChild);
    }
  }
};
function isset(obj, prop) {
  return obj.hasOwnProperty(prop) && (obj[prop] === true || obj[prop].length);
}

/**
 * Append an item to the list
 * @param  {Object} item
 * @param  {Object} custom
 * @return {Void}
 */
function appendItem(item, parent, custom) {
  if (item.parentNode) {
    if (!item.parentNode.parentNode) {
      parent.appendChild(item.parentNode);
    }
  } else {
    parent.appendChild(item);
  }
  util.removeClass(item, "excluded");
  if (!custom) {
    // remove any <span> highlighting, without xss
    item.textContent = item.textContent;
  }
}

/**
 * Render the item list
 * @return {Void}
 */
var render = function render() {
  if (this.items.length) {
    var f = document.createDocumentFragment();
    if (this.config.pagination) {
      var pages = this.pages.slice(0, this.pageIndex);
      util.each(pages, function (i, items) {
        util.each(items, function (j, item) {
          appendItem(item, f, this.customOption);
        }, this);
      }, this);
    } else {
      util.each(this.items, function (i, item) {
        appendItem(item, f, this.customOption);
      }, this);
    }

    // highlight first selected option if any; first option otherwise
    if (f.childElementCount) {
      util.removeClass(this.items[this.navIndex], "active");
      this.navIndex = (f.querySelector(".selectr-option.selected") || f.querySelector(".selectr-option")).idx;
      util.addClass(this.items[this.navIndex], "active");
    }
    this.tree.appendChild(f);
  }
};

/**
 * Dismiss / close the dropdown
 * @param  {obj} e
 * @return {void}
 */
var dismiss = function dismiss(e) {
  var target = e.target;
  if (!this.container.contains(target) && (this.opened || util.hasClass(this.container, "notice"))) {
    this.close();
  }
};

/**
 * Build a list item from the HTMLOptionElement
 * @param  {int} i      HTMLOptionElement index
 * @param  {HTMLOptionElement} option
 * @param  {bool} group  Has parent optgroup
 * @return {void}
 */
var createItem = function createItem(option, data) {
  data = data || option;
  var elementData = {
    "class": "selectr-option",
    role: "treeitem",
    "aria-selected": false
  };
  if (this.customOption) {
    elementData.html = this.config.renderOption(data); // asume xss prevention in custom render function
  } else {
    elementData.textContent = option.textContent; // treat all as plain text
  }
  var opt = util.createElement("li", elementData);
  opt.idx = option.idx;
  this.items.push(opt);
  if (option.defaultSelected) {
    this.defaultSelected.push(option.idx);
  }
  if (option.disabled) {
    opt.disabled = true;
    util.addClass(opt, "disabled");
  }
  return opt;
};

/**
 * Build the container
 * @return {Void}
 */
var build = function build() {
  this.requiresPagination = this.config.pagination && this.config.pagination > 0;

  // Set width
  if (isset(this.config, "width")) {
    if (util.isInt(this.config.width)) {
      this.width = this.config.width + "px";
    } else {
      if (this.config.width === "auto") {
        this.width = "100%";
      } else if (util.includes(this.config.width, "%")) {
        this.width = this.config.width;
      }
    }
  }
  this.container = util.createElement("div", {
    "class": "selectr-container"
  });

  // Custom className
  if (this.config.customClass) {
    util.addClass(this.container, this.config.customClass);
  }

  // Mobile device
  if (this.mobileDevice) {
    util.addClass(this.container, "selectr-mobile");
  } else {
    util.addClass(this.container, "selectr-desktop");
  }

  // Hide the HTMLSelectElement and prevent focus
  this.el.tabIndex = -1;

  // Native dropdown
  if (this.config.nativeDropdown || this.mobileDevice) {
    util.addClass(this.el, "selectr-visible");
  } else {
    util.addClass(this.el, "selectr-hidden");
  }
  this.selected = util.createElement("div", {
    "class": "selectr-selected",
    disabled: this.disabled,
    tabIndex: 0,
    "aria-expanded": false
  });
  this.label = util.createElement(this.el.multiple ? "ul" : "span", {
    "class": "selectr-label"
  });
  var dropdown = util.createElement("div", {
    "class": "selectr-options-container"
  });
  this.tree = util.createElement("ul", {
    "class": "selectr-options",
    role: "tree",
    "aria-hidden": true,
    "aria-expanded": false
  });
  this.notice = util.createElement("div", {
    "class": "selectr-notice"
  });
  this.el.setAttribute("aria-hidden", true);
  if (this.disabled) {
    this.el.disabled = true;
  }
  if (this.el.multiple) {
    util.addClass(this.label, "selectr-tags");
    util.addClass(this.container, "multiple");

    // Collection of tags
    this.tags = [];

    // Collection of selected values
    // #93 defaultSelected = false did not work as expected
    this.selectedValues = this.config.defaultSelected ? this.getSelectedProperties('value') : [];

    // Collection of selected indexes
    this.selectedIndexes = this.getSelectedProperties('idx');
  } else {
    // #93 defaultSelected = false did not work as expected
    // these values were undefined
    this.selectedValue = null;
    this.selectedIndex = -1;
  }
  this.selected.appendChild(this.label);
  if (this.config.clearable) {
    this.selectClear = util.createElement("button", {
      "class": "selectr-clear",
      type: "button"
    });
    this.container.appendChild(this.selectClear);
    util.addClass(this.container, "clearable");
  }
  if (this.config.taggable) {
    var li = util.createElement('li', {
      "class": 'input-tag'
    });
    this.input = util.createElement("input", {
      "class": "selectr-tag-input",
      placeholder: this.config.tagPlaceholder,
      tagIndex: 0,
      autocomplete: "off",
      autocorrect: "off",
      autocapitalize: "off",
      spellcheck: "false",
      role: "textbox",
      type: "search"
    });
    li.appendChild(this.input);
    this.label.appendChild(li);
    util.addClass(this.container, "taggable");
    this.tagSeperators = [","];
    if (this.config.tagSeperators) {
      this.tagSeperators = this.tagSeperators.concat(this.config.tagSeperators);
      var _aTempEscapedSeperators = [];
      for (var _nTagSeperatorStepCount = 0; _nTagSeperatorStepCount < this.tagSeperators.length; _nTagSeperatorStepCount++) {
        _aTempEscapedSeperators.push(util.escapeRegExp(this.tagSeperators[_nTagSeperatorStepCount]));
      }
      this.tagSeperatorsRegex = new RegExp(_aTempEscapedSeperators.join('|'), 'i');
    } else {
      this.tagSeperatorsRegex = new RegExp(',', 'i');
    }
  }
  if (this.config.searchable) {
    this.input = util.createElement("input", {
      "class": "selectr-input",
      tagIndex: -1,
      autocomplete: "off",
      autocorrect: "off",
      autocapitalize: "off",
      spellcheck: "false",
      role: "textbox",
      type: "search",
      placeholder: this.config.messages.searchPlaceholder
    });
    this.inputClear = util.createElement("button", {
      "class": "selectr-input-clear",
      type: "button"
    });
    this.inputContainer = util.createElement("div", {
      "class": "selectr-input-container"
    });
    this.inputContainer.appendChild(this.input);
    this.inputContainer.appendChild(this.inputClear);
    dropdown.appendChild(this.inputContainer);
  }
  dropdown.appendChild(this.notice);
  dropdown.appendChild(this.tree);

  // List of items for the dropdown
  this.items = [];

  // Establish options
  this.options = [];

  // Check for options in the element
  if (this.el.options.length) {
    this.options = [].slice.call(this.el.options);
  }

  // Element may have optgroups so
  // iterate element.children instead of element.options
  var group = false,
    j = 0;
  if (this.el.children.length) {
    util.each(this.el.children, function (i, element) {
      if (element.nodeName === "OPTGROUP") {
        group = util.createElement("ul", {
          "class": "selectr-optgroup",
          role: "group",
          html: "<li class='selectr-optgroup--label'>" + element.label + "</li>"
        });
        util.each(element.children, function (x, el) {
          el.idx = j;
          group.appendChild(createItem.call(this, el, group));
          j++;
        }, this);
      } else {
        element.idx = j;
        createItem.call(this, element);
        j++;
      }
    }, this);
  }

  // Options defined by the data option
  if (this.config.data && Array.isArray(this.config.data)) {
    this.data = [];
    var optgroup = false,
      option;
    group = false;
    j = 0;
    util.each(this.config.data, function (i, opt) {
      // Check for group options
      if (isset(opt, "children")) {
        optgroup = util.createElement("optgroup", {
          label: opt.text
        });
        group = util.createElement("ul", {
          "class": "selectr-optgroup",
          role: "group",
          html: "<li class='selectr-optgroup--label'>" + opt.text + "</li>"
        });
        util.each(opt.children, function (x, data) {
          option = new Option(data.text, data.value, false, data.hasOwnProperty("selected") && data.selected === true);
          option.disabled = isset(data, "disabled");
          this.options.push(option);
          optgroup.appendChild(option);
          option.idx = j;
          group.appendChild(createItem.call(this, option, data));
          this.data[j] = data;
          j++;
        }, this);
        this.el.appendChild(optgroup);
      } else {
        option = new Option(opt.text, opt.value, false, opt.hasOwnProperty("selected") && opt.selected === true);
        option.disabled = isset(opt, "disabled");
        this.options.push(option);
        option.idx = j;
        createItem.call(this, option, opt);
        this.data[j] = opt;
        j++;
      }
    }, this);
  }
  this.setSelected(true);
  var first;
  this.navIndex = 0;
  for (var i = 0; i < this.items.length; i++) {
    first = this.items[i];
    if (!util.hasClass(first, "disabled")) {
      util.addClass(first, "active");
      this.navIndex = i;
      break;
    }
  }

  // Check for pagination / infinite scroll
  if (this.requiresPagination) {
    this.pageIndex = 1;

    // Create the pages
    this.paginate();
  }
  this.container.appendChild(this.selected);
  this.container.appendChild(dropdown);
  this.placeEl = util.createElement("div", {
    "class": "selectr-placeholder"
  });

  // Set the placeholder
  this.setPlaceholder();
  this.selected.appendChild(this.placeEl);

  // Disable if required
  if (this.disabled) {
    this.disable();
  }
  this.el.parentNode.insertBefore(this.container, this.el);
  this.container.appendChild(this.el);
};

/**
 * Navigate through the dropdown
 * @param  {obj} e
 * @return {void}
 */
var navigate = function navigate(e) {
  e = e || window.event;

  // Filter out the keys we don"t want
  if (!this.items.length || !this.opened || !util.includes([13, 38, 40], e.which)) {
    this.navigating = false;
    return;
  }
  e.preventDefault();
  if (e.which === 13) {
    if (this.noResults || this.config.taggable && this.input.value.length > 0) {
      return false;
    }
    return this.change(this.navIndex);
  }
  var direction,
    prevEl = this.items[this.navIndex];
  var lastIndex = this.navIndex;
  switch (e.which) {
    case 38:
      direction = 0;
      if (this.navIndex > 0) {
        this.navIndex--;
      }
      break;
    case 40:
      direction = 1;
      if (this.navIndex < this.items.length - 1) {
        this.navIndex++;
      }
  }
  this.navigating = true;

  // Instead of wasting memory holding a copy of this.items
  // with disabled / excluded options omitted, skip them instead
  while (util.hasClass(this.items[this.navIndex], "disabled") || util.hasClass(this.items[this.navIndex], "excluded")) {
    if (this.navIndex > 0 && this.navIndex < this.items.length - 1) {
      if (direction) {
        this.navIndex++;
      } else {
        this.navIndex--;
      }
    } else {
      this.navIndex = lastIndex;
      break;
    }
    if (this.searching) {
      if (this.navIndex > this.tree.lastElementChild.idx) {
        this.navIndex = this.tree.lastElementChild.idx;
        break;
      } else if (this.navIndex < this.tree.firstElementChild.idx) {
        this.navIndex = this.tree.firstElementChild.idx;
        break;
      }
    }
  }

  // Autoscroll the dropdown during navigation
  var r = util.rect(this.items[this.navIndex]);
  if (!direction) {
    if (this.navIndex === 0) {
      this.tree.scrollTop = 0;
    } else if (r.top - this.optsRect.top < 0) {
      this.tree.scrollTop = this.tree.scrollTop + (r.top - this.optsRect.top);
    }
  } else {
    if (this.navIndex === 0) {
      this.tree.scrollTop = 0;
    } else if (r.top + r.height > this.optsRect.top + this.optsRect.height) {
      this.tree.scrollTop = this.tree.scrollTop + (r.top + r.height - (this.optsRect.top + this.optsRect.height));
    }

    // Load another page if needed
    if (this.navIndex === this.tree.childElementCount - 1 && this.requiresPagination) {
      load.call(this);
    }
  }
  if (prevEl) {
    util.removeClass(prevEl, "active");
  }
  util.addClass(this.items[this.navIndex], "active");
};

/**
 * Add a tag
 * @param  {HTMLElement} item
 */
var addTag = function addTag(item) {
  var that = this,
    r;
  var docFrag = document.createDocumentFragment();
  var option = this.options[item.idx];
  var data = this.data ? this.data[item.idx] : option;
  var elementData = {
    "class": "selectr-tag"
  };
  if (this.customSelected) {
    elementData.html = this.config.renderSelection(data); // asume xss prevention in custom render function
  } else {
    elementData.textContent = option.textContent;
  }
  var tag = util.createElement("li", elementData);
  var btn = util.createElement("button", {
    "class": "selectr-tag-remove",
    type: "button"
  });
  tag.appendChild(btn);

  // Set property to check against later
  tag.idx = item.idx;
  tag.tag = option.value;
  this.tags.push(tag);
  if (this.config.sortSelected) {
    var tags = this.tags.slice();

    // Deal with values that contain numbers
    r = function r(val, arr) {
      val.replace(/(\d+)|(\D+)/g, function (that, $1, $2) {
        arr.push([$1 || Infinity, $2 || ""]);
      });
    };
    tags.sort(function (a, b) {
      var x = [],
        y = [],
        ac,
        bc;
      if (that.config.sortSelected === true) {
        ac = a.tag;
        bc = b.tag;
      } else if (that.config.sortSelected === 'text') {
        ac = a.textContent;
        bc = b.textContent;
      }
      r(ac, x);
      r(bc, y);
      while (x.length && y.length) {
        var ax = x.shift();
        var by = y.shift();
        var nn = ax[0] - by[0] || ax[1].localeCompare(by[1]);
        if (nn) return nn;
      }
      return x.length - y.length;
    });
    util.each(tags, function (i, tg) {
      docFrag.appendChild(tg);
    });
    this.label.innerHTML = "";
  } else {
    docFrag.appendChild(tag);
  }
  if (this.config.taggable) {
    this.label.insertBefore(docFrag, this.input.parentNode);
  } else {
    this.label.appendChild(docFrag);
  }
};

/**
 * Remove a tag
 * @param  {HTMLElement} item
 * @return {void}
 */
var removeTag = function removeTag(item) {
  var tag = false;
  util.each(this.tags, function (i, t) {
    if (t.idx === item.idx) {
      tag = t;
    }
  }, this);
  if (tag) {
    this.label.removeChild(tag);
    this.tags.splice(this.tags.indexOf(tag), 1);
  }
};

/**
 * Load the next page of items
 * @return {void}
 */
var load = function load() {
  var tree = this.tree;
  var scrollTop = tree.scrollTop;
  var scrollHeight = tree.scrollHeight;
  var offsetHeight = tree.offsetHeight;
  var atBottom = scrollTop >= scrollHeight - offsetHeight;
  if (atBottom && this.pageIndex < this.pages.length) {
    var f = document.createDocumentFragment();
    util.each(this.pages[this.pageIndex], function (i, item) {
      appendItem(item, f, this.customOption);
    }, this);
    tree.appendChild(f);
    this.pageIndex++;
    this.emit("selectr.paginate", {
      items: this.items.length,
      total: this.data.length,
      page: this.pageIndex,
      pages: this.pages.length
    });
  }
};

/**
 * Clear a search
 * @return {void}
 */
var clearSearch = function clearSearch() {
  if (this.config.searchable || this.config.taggable) {
    this.input.value = null;
    this.searching = false;
    if (this.config.searchable) {
      util.removeClass(this.inputContainer, "active");
    }
    if (util.hasClass(this.container, "notice")) {
      util.removeClass(this.container, "notice");
      util.addClass(this.container, "open");
      this.input.focus();
    }
    util.each(this.items, function (i, item) {
      // Items that didn't match need the class
      // removing to make them visible again
      util.removeClass(item, "excluded");
      // Remove the span element for underlining matched items
      if (!this.customOption) {
        // without xss
        item.textContent = item.textContent;
      }
    }, this);
  }
};

/**
 * Query matching for searches.
 * Wraps matching text in a span.selectr-match.
 *
 * @param  {string} query
 * @param  {HTMLOptionElement} option element
 * @return {bool} true if matched; false otherwise
 */
var match = function match(query, option) {
  var text = option.textContent;
  var RX = new RegExp(query, "ig");
  var result = RX.exec(text);
  if (result) {
    // #102 stop xss
    option.innerHTML = "";
    var span = document.createElement("span");
    span.classList.add("selectr-match");
    span.textContent = result[0];
    option.appendChild(document.createTextNode(text.substring(0, result.index)));
    option.appendChild(span);
    option.appendChild(document.createTextNode(text.substring(RX.lastIndex)));
    return true;
  }
  return false;
};

// Main Lib
var Selectr = function Selectr(el, config) {
  if (!el) {
    throw new Error("You must supply either a HTMLSelectElement or a CSS3 selector string.");
  }
  this.el = el;

  // CSS3 selector string
  if (typeof el === "string") {
    this.el = document.querySelector(el);
  }
  if (this.el === null) {
    throw new Error("The element you passed to Selectr can not be found.");
  }
  if (this.el.nodeName.toLowerCase() !== "select") {
    throw new Error("The element you passed to Selectr is not a HTMLSelectElement.");
  }
  this.render(config);
};

/**
 * Render the instance
 * @param  {object} config
 * @return {void}
 */
Selectr.prototype.render = function (config) {
  if (this.rendered) return;

  /**
   * Default configuration options
   * @type {Object}
   */
  var defaultConfig = {
    /**
     * Emulates browser behaviour by selecting the first option by default
     * @type {Boolean}
     */
    defaultSelected: true,
    /**
     * Sets the width of the container
     * @type {String}
     */
    width: "auto",
    /**
     * Enables/ disables the container
     * @type {Boolean}
     */
    disabled: false,
    /**
     * Enables/ disables logic for mobile
     * @type {Boolean}
     */
    disabledMobile: false,
    /**
     * Enables / disables the search function
     * @type {Boolean}
     */
    searchable: true,
    /**
     * Enable disable the clear button
     * @type {Boolean}
     */
    clearable: false,
    /**
     * Sort the tags / multiselect options
     * @type {Boolean}
     */
    sortSelected: false,
    /**
     * Allow deselecting of select-one options
     * @type {Boolean}
     */
    allowDeselect: false,
    /**
     * Close the dropdown when scrolling (@AlexanderReiswich, #11)
     * @type {Boolean}
     */
    closeOnScroll: false,
    /**
     * Allow the use of the native dropdown (@jonnyscholes, #14)
     * @type {Boolean}
     */
    nativeDropdown: false,
    /**
     * Allow the use of native typing behavior for toggling, searching, selecting
     * @type {boolean}
     */
    nativeKeyboard: false,
    /**
     * Set the main placeholder
     * @type {String}
     */
    placeholder: "Select an option...",
    /**
     * Allow the tagging feature
     * @type {Boolean}
     */
    taggable: false,
    /**
     * Set the tag input placeholder (@labikmartin, #21, #22)
     * @type {String}
     */
    tagPlaceholder: "Enter a tag...",
    messages: {
      noResults: "No results.",
      noOptions: "No options available.",
      maxSelections: "A maximum of {max} items can be selected.",
      tagDuplicate: "That tag is already in use.",
      searchPlaceholder: "Search options..."
    }
  };

  // add instance reference (#87)
  this.el.selectr = this;

  // Merge defaults with user set config
  this.config = util.extend(defaultConfig, config);

  // Store type
  this.originalType = this.el.type;

  // Store tabIndex
  this.originalIndex = this.el.tabIndex;

  // Store defaultSelected options for form reset
  this.defaultSelected = [];

  // Store the original option count
  this.originalOptionCount = this.el.options.length;
  if (this.config.multiple || this.config.taggable) {
    this.el.multiple = true;
  }

  // Disabled?
  this.disabled = isset(this.config, "disabled");
  this.opened = false;
  if (this.config.taggable) {
    this.config.searchable = false;
  }
  this.navigating = false;
  this.mobileDevice = false;
  if (!this.config.disabledMobile && /Android|webOS|iPhone|iPad|BlackBerry|Windows Phone|Opera Mini|IEMobile|Mobile/i.test(navigator.userAgent)) {
    this.mobileDevice = true;
  }
  this.customOption = this.config.hasOwnProperty("renderOption") && typeof this.config.renderOption === "function";
  this.customSelected = this.config.hasOwnProperty("renderSelection") && typeof this.config.renderSelection === "function";
  this.supportsEventPassiveOption = this.detectEventPassiveOption();

  // Enable event emitter
  Events.mixin(this);
  build.call(this);
  this.bindEvents();
  this.update();
  this.optsRect = util.rect(this.tree);
  this.rendered = true;

  // Fixes macOS Safari bug #28
  if (!this.el.multiple) {
    this.el.selectedIndex = this.selectedIndex;
  }
  var that = this;
  setTimeout(function () {
    that.emit("selectr.init");
  }, 20);
};
Selectr.prototype.getSelected = function () {
  var selected = this.el.querySelectorAll('option:checked');
  return selected;
};
Selectr.prototype.getSelectedProperties = function (prop) {
  var selected = this.getSelected();
  var values = [].slice.call(selected).map(function (option) {
    return option[prop];
  }).filter(function (i) {
    return i !== null && i !== undefined;
  });
  return values;
};

/**
 * Feature detection: addEventListener passive option
 * https://dom.spec.whatwg.org/#dom-addeventlisteneroptions-passive
 * https://github.com/WICG/EventListenerOptions/blob/gh-pages/explainer.md
 */
Selectr.prototype.detectEventPassiveOption = function () {
  var supportsPassiveOption = false;
  try {
    var opts = Object.defineProperty({}, 'passive', {
      get: function get() {
        supportsPassiveOption = true;
      }
    });
    window.addEventListener('test', null, opts);
  } catch (e) {}
  return supportsPassiveOption;
};

/**
 * Attach the required event listeners
 */
Selectr.prototype.bindEvents = function () {
  var that = this;
  this.events = {};
  this.events.dismiss = dismiss.bind(this);
  this.events.navigate = navigate.bind(this);
  this.events.reset = this.reset.bind(this);
  if (this.config.nativeDropdown || this.mobileDevice) {
    this.container.addEventListener("touchstart", function (e) {
      if (e.changedTouches[0].target === that.el) {
        that.toggle();
      }
    }, this.supportsEventPassiveOption ? {
      passive: true
    } : false);
    this.container.addEventListener("click", function (e) {
      if (e.target === that.el) {
        that.toggle();
      }
    });
    var getChangedOptions = function getChangedOptions(last, current) {
      var added = [],
        removed = last.slice(0);
      var idx;
      for (var i = 0; i < current.length; i++) {
        idx = removed.indexOf(current[i]);
        if (idx > -1) removed.splice(idx, 1);else added.push(current[i]);
      }
      return [added, removed];
    };

    // Listen for the change on the native select
    // and update accordingly
    this.el.addEventListener("change", function (e) {
      if (e.__selfTriggered) {
        return;
      }
      if (that.el.multiple) {
        var indexes = that.getSelectedProperties('idx');
        var changes = getChangedOptions(that.selectedIndexes, indexes);
        util.each(changes[0], function (i, idx) {
          that.select(idx);
        }, that);
        util.each(changes[1], function (i, idx) {
          that.deselect(idx);
        }, that);
      } else {
        if (that.el.selectedIndex > -1) {
          that.select(that.el.selectedIndex);
        }
      }
    });
  }

  // Open the dropdown with Enter key if focused
  if (this.config.nativeDropdown) {
    this.container.addEventListener("keydown", function (e) {
      if (e.key === "Enter" && that.selected === document.activeElement) {
        // show native dropdown
        that.toggle();
        // focus on it
        setTimeout(function () {
          that.el.focus();
        }, 200);
      }
    });
  }

  // Non-native dropdown
  this.selected.addEventListener("click", function (e) {
    if (!that.disabled) {
      that.toggle();
    }
    e.preventDefault();
  });
  if (this.config.nativeKeyboard) {
    var typing = '';
    var typingTimeout = null;
    this.selected.addEventListener("keydown", function (e) {
      // Do nothing if disabled, not focused, or modifier keys are pressed
      if (that.disabled || that.selected !== document.activeElement || e.altKey || e.ctrlKey || e.metaKey) {
        return;
      }

      // Open the dropdown on [enter], [ ], [↓], and [↑] keys
      if (e.key === " " || !that.opened && ["Enter", "ArrowUp", "ArrowDown"].indexOf(e.key) > -1) {
        that.toggle();
        e.preventDefault();
        e.stopPropagation();
        return;
      }

      // Type to search if multiple; type to select otherwise
      // make sure e.key is a single, printable character
      // .length check is a short-circut to skip checking keys like "ArrowDown", etc.
      // prefer "codePoint" methods; they work with the full range of unicode
      if (e.key.length <= 2 && String[String.fromCodePoint ? "fromCodePoint" : "fromCharCode"](e.key[String.codePointAt ? "codePointAt" : "charCodeAt"](0)) === e.key) {
        if (that.config.multiple) {
          that.open();
          if (that.config.searchable) {
            that.input.value = e.key;
            that.input.focus();
            that.search(null, true);
          }
        } else {
          if (typingTimeout) {
            clearTimeout(typingTimeout);
          }
          typing += e.key;
          var found = that.search(typing, true);
          if (found && found.length) {
            that.clear();
            that.setValue(found[0].value);
          }
          setTimeout(function () {
            typing = '';
          }, 1000);
        }
        e.preventDefault();
        e.stopPropagation();
        return;
      }
    });

    // Close the dropdown on [esc] key
    this.container.addEventListener("keyup", function (e) {
      if (that.opened && e.key === "Escape") {
        that.close();
        e.stopPropagation();

        // keep focus so we can re-open easily if desired
        that.selected.focus();
      }
    });
  }

  // Remove tag
  this.label.addEventListener("click", function (e) {
    if (util.hasClass(e.target, "selectr-tag-remove")) {
      that.deselect(e.target.parentNode.idx);
    }
  });

  // Clear input
  if (this.selectClear) {
    this.selectClear.addEventListener("click", this.clear.bind(this));
  }

  // Prevent text selection
  this.tree.addEventListener("mousedown", function (e) {
    e.preventDefault();
  });

  // Select / deselect items
  this.tree.addEventListener("click", function (e) {
    var item = util.closest(e.target, function (el) {
      return el && util.hasClass(el, "selectr-option");
    });
    if (item) {
      if (!util.hasClass(item, "disabled")) {
        if (util.hasClass(item, "selected")) {
          if (that.el.multiple || !that.el.multiple && that.config.allowDeselect) {
            that.deselect(item.idx);
          }
        } else {
          that.select(item.idx);
        }
        if (that.opened && !that.el.multiple) {
          that.close();
        }
      }
    }
    e.preventDefault();
    e.stopPropagation();
  });

  // Mouseover list items
  this.tree.addEventListener("mouseover", function (e) {
    if (util.hasClass(e.target, "selectr-option")) {
      if (!util.hasClass(e.target, "disabled")) {
        util.removeClass(that.items[that.navIndex], "active");
        util.addClass(e.target, "active");
        that.navIndex = [].slice.call(that.items).indexOf(e.target);
      }
    }
  });

  // Searchable
  if (this.config.searchable) {
    // Show / hide the search input clear button

    this.input.addEventListener("focus", function (e) {
      that.searching = true;
    });
    this.input.addEventListener("blur", function (e) {
      that.searching = false;
    });
    this.input.addEventListener("keyup", function (e) {
      that.search();
      if (!that.config.taggable) {
        // Show / hide the search input clear button
        if (this.value.length) {
          util.addClass(this.parentNode, "active");
        } else {
          util.removeClass(this.parentNode, "active");
        }
      }
    });

    // Clear the search input
    this.inputClear.addEventListener("click", function (e) {
      that.input.value = null;
      clearSearch.call(that);
      if (!that.tree.childElementCount) {
        render.call(that);
      }
    });
  }
  if (this.config.taggable) {
    this.input.addEventListener("keyup", function (e) {
      that.search();
      if (that.config.taggable && this.value.length) {
        var _sVal = this.value.trim();
        if (_sVal.length && (e.which === 13 || that.tagSeperatorsRegex.test(_sVal))) {
          var _sGrabbedTagValue = _sVal.replace(that.tagSeperatorsRegex, '');
          _sGrabbedTagValue = util.escapeRegExp(_sGrabbedTagValue);
          _sGrabbedTagValue = _sGrabbedTagValue.trim();
          var _oOption;
          if (_sGrabbedTagValue.length) {
            _oOption = that.add({
              value: _sGrabbedTagValue,
              textContent: _sGrabbedTagValue,
              selected: true
            }, true);
          }
          if (_oOption) {
            that.close();
            clearSearch.call(that);
          } else {
            this.value = '';
            that.setMessage(that.config.messages.tagDuplicate);
          }
        }
      }
    });
  }
  this.update = util.debounce(function () {
    // Optionally close dropdown on scroll / resize (#11)
    if (that.opened && that.config.closeOnScroll) {
      that.close();
    }
    if (that.width) {
      that.container.style.width = that.width;
    }
    that.invert();
  }, 50);
  if (this.requiresPagination) {
    this.paginateItems = util.debounce(function () {
      load.call(this);
    }, 50);
    this.tree.addEventListener("scroll", this.paginateItems.bind(this));
  }

  // Dismiss when clicking outside the container
  document.addEventListener("click", this.events.dismiss);
  window.addEventListener("keydown", this.events.navigate);
  window.addEventListener("resize", this.update);
  window.addEventListener("scroll", this.update);

  // remove event listeners on destroy()
  this.on('selectr.destroy', function () {
    document.removeEventListener("click", this.events.dismiss);
    window.removeEventListener("keydown", this.events.navigate);
    window.removeEventListener("resize", this.update);
    window.removeEventListener("scroll", this.update);
  });

  // Listen for form.reset() (@ambrooks, #13)
  if (this.el.form) {
    this.el.form.addEventListener("reset", this.events.reset);

    // remove listener on destroy()
    this.on('selectr.destroy', function () {
      this.el.form.removeEventListener("reset", this.events.reset);
    });
  }
};

/**
 * Check for selected options
 * @param {bool} reset
 */
Selectr.prototype.setSelected = function (reset) {
  // Select first option as with a native select-one element - #21, #24
  if (!this.config.data && !this.el.multiple && this.el.options.length) {
    // Browser has selected the first option by default
    if (this.el.selectedIndex === 0) {
      if (!this.el.options[0].defaultSelected && !this.config.defaultSelected) {
        this.el.selectedIndex = -1;
      }
    }
    this.selectedIndex = this.el.selectedIndex;
    if (this.selectedIndex > -1) {
      this.select(this.selectedIndex);
    }
  }

  // If we're changing a select-one to select-multiple via the config
  // and there are no selected options, the first option will be selected by the browser
  // Let's prevent that here.
  if (this.config.multiple && this.originalType === "select-one" && !this.config.data) {
    if (this.el.options[0].selected && !this.el.options[0].defaultSelected) {
      this.el.options[0].selected = false;
    }
  }
  util.each(this.options, function (i, option) {
    if (option.selected && option.defaultSelected) {
      this.select(option.idx);
    }
  }, this);
  if (this.config.selectedValue) {
    this.setValue(this.config.selectedValue);
  }
  if (this.config.data) {
    if (!this.el.multiple && this.config.defaultSelected && this.el.selectedIndex < 0 && this.config.data.length > 0) {
      this.select(0);
    }
    var j = 0;
    util.each(this.config.data, function (i, opt) {
      // Check for group options
      if (isset(opt, "children")) {
        util.each(opt.children, function (x, item) {
          if (item.hasOwnProperty("selected") && item.selected === true) {
            this.select(j);
          }
          j++;
        }, this);
      } else {
        if (opt.hasOwnProperty("selected") && opt.selected === true) {
          this.select(j);
        }
        j++;
      }
    }, this);
  }
};

/**
 * Destroy the instance
 * @return {void}
 */
Selectr.prototype.destroy = function () {
  if (!this.rendered) return;
  this.emit("selectr.destroy");

  // Revert to select-single if programtically set to multiple
  if (this.originalType === 'select-one') {
    this.el.multiple = false;
  }
  if (this.config.data) {
    this.el.innerHTML = "";
  }

  // Remove the className from select element
  util.removeClass(this.el, 'selectr-hidden');

  // Replace the container with the original select element
  this.container.parentNode.replaceChild(this.el, this.container);
  this.rendered = false;

  // remove reference
  delete this.el.selectr;
};

/**
 * Change an options state
 * @param  {Number} index
 * @return {void}
 */
Selectr.prototype.change = function (index) {
  var item = this.items[index],
    option = this.options[index];
  if (option.disabled) {
    return;
  }
  if (option.selected && util.hasClass(item, "selected")) {
    this.deselect(index);
  } else {
    this.select(index);
  }
  if (this.opened && !this.el.multiple) {
    this.close();
  }
};

/**
 * Select an option
 * @param  {Number} index
 * @return {void}
 */
Selectr.prototype.select = function (index) {
  var item = this.items[index],
    options = [].slice.call(this.el.options),
    option = this.options[index];
  if (this.el.multiple) {
    if (util.includes(this.selectedIndexes, index)) {
      return false;
    }
    if (this.config.maxSelections && this.tags.length === this.config.maxSelections) {
      this.setMessage(this.config.messages.maxSelections.replace("{max}", this.config.maxSelections), true);
      return false;
    }
    this.selectedValues.push(option.value);
    this.selectedIndexes.push(index);
    addTag.call(this, item);
  } else {
    var data = this.data ? this.data[index] : option;
    if (this.customSelected) {
      this.label.innerHTML = this.config.renderSelection(data);
    } else {
      // no xss
      this.label.textContent = option.textContent;
    }
    this.selectedValue = option.value;
    this.selectedIndex = index;
    util.each(this.options, function (i, o) {
      var opt = this.items[i];
      if (i !== index) {
        if (opt) {
          util.removeClass(opt, "selected");
        }
        o.selected = false;
        o.removeAttribute("selected");
      }
    }, this);
  }
  if (!util.includes(options, option)) {
    this.el.add(option);
  }
  item.setAttribute("aria-selected", true);
  util.addClass(item, "selected");
  util.addClass(this.container, "has-selected");
  option.selected = true;
  option.setAttribute("selected", "");
  this.emit("selectr.change", option);
  this.emit("selectr.select", option);

  // fire native change event
  if ("createEvent" in document) {
    var evt = document.createEvent("HTMLEvents");
    evt.initEvent("change", true, true);
    evt.__selfTriggered = true;
    this.el.dispatchEvent(evt);
  } else {
    this.el.fireEvent("onchange");
  }
};

/**
 * Deselect an option
 * @param  {Number} index
 * @return {void}
 */
Selectr.prototype.deselect = function (index, force) {
  var item = this.items[index],
    option = this.options[index];
  if (this.el.multiple) {
    var selIndex = this.selectedIndexes.indexOf(index);
    this.selectedIndexes.splice(selIndex, 1);
    var valIndex = this.selectedValues.indexOf(option.value);
    this.selectedValues.splice(valIndex, 1);
    removeTag.call(this, item);
    if (!this.tags.length) {
      util.removeClass(this.container, "has-selected");
    }
  } else {
    if (!force && !this.config.clearable && !this.config.allowDeselect) {
      return false;
    }
    this.label.innerHTML = "";
    this.selectedValue = null;
    this.el.selectedIndex = this.selectedIndex = -1;
    util.removeClass(this.container, "has-selected");
  }
  this.items[index].setAttribute("aria-selected", false);
  util.removeClass(this.items[index], "selected");
  option.selected = false;
  option.removeAttribute("selected");
  this.emit("selectr.change", null);
  this.emit("selectr.deselect", option);

  // fire native change event
  if ("createEvent" in document) {
    var evt = document.createEvent("HTMLEvents");
    evt.initEvent("change", true, true);
    evt.__selfTriggered = true;
    this.el.dispatchEvent(evt);
  } else {
    this.el.fireEvent("onchange");
  }
};

/**
 * Programmatically set selected values
 * @param {String|Array} value - A string or an array of strings
 */
Selectr.prototype.setValue = function (value) {
  var isArray = Array.isArray(value);
  if (!isArray) {
    value = value.toString().trim();
  }

  // Can't pass array to select-one
  if (!this.el.multiple && isArray) {
    return false;
  }
  util.each(this.options, function (i, option) {
    if (isArray && value.indexOf(option.value) > -1 || option.value === value) {
      this.change(option.idx);
    }
  }, this);
};

/**
 * Set the selected value(s)
 * @param  {bool} toObject Return only the raw values or an object
 * @param  {bool} toJson   Return the object as a JSON string
 * @return {mixed}         Array or String
 */
Selectr.prototype.getValue = function (toObject, toJson) {
  var value;
  if (this.el.multiple) {
    if (toObject) {
      if (this.selectedIndexes.length) {
        value = {};
        value.values = [];
        util.each(this.selectedIndexes, function (i, index) {
          var option = this.options[index];
          value.values[i] = {
            value: option.value,
            text: option.textContent
          };
        }, this);
      }
    } else {
      value = this.selectedValues.slice();
    }
  } else {
    if (toObject) {
      var option = this.options[this.selectedIndex];
      value = {
        value: option.value,
        text: option.textContent
      };
    } else {
      value = this.selectedValue;
    }
  }
  if (toObject && toJson) {
    value = JSON.stringify(value);
  }
  return value;
};

/**
 * Add a new option or options
 * @param {object} data
 */
Selectr.prototype.add = function (data, checkDuplicate) {
  if (data) {
    this.data = this.data || [];
    this.items = this.items || [];
    this.options = this.options || [];
    if (Array.isArray(data)) {
      // We have an array on items
      util.each(data, function (i, obj) {
        this.add(obj, checkDuplicate);
      }, this);
    }
    // User passed a single object to the method
    // or Selectr passed an object from an array
    else if ("[object Object]" === Object.prototype.toString.call(data)) {
      if (checkDuplicate) {
        var dupe = false;
        util.each(this.options, function (i, option) {
          if (option.value.toLowerCase() === data.value.toLowerCase()) {
            dupe = true;
          }
        });
        if (dupe) {
          return false;
        }
      }
      var option = util.createElement('option', data);
      this.data.push(data);

      // fix for native iOS dropdown otherwise the native dropdown will be empty
      if (this.mobileDevice) {
        this.el.add(option);
      }

      // Add the new option to the list
      this.options.push(option);

      // Add the index for later use
      option.idx = this.options.length > 0 ? this.options.length - 1 : 0;

      // Create a new item
      createItem.call(this, option);

      // Select the item if required
      if (data.selected) {
        this.select(option.idx);
      }

      // We may have had an empty select so update
      // the placeholder to reflect the changes.
      this.setPlaceholder();
      return option;
    }

    // Recount the pages
    if (this.config.pagination) {
      this.paginate();
    }
    return true;
  }
};

/**
 * Remove an option or options
 * @param  {Mixed} o Array, integer (index) or string (value)
 * @return {Void}
 */
Selectr.prototype.remove = function (o) {
  var options = [];
  if (Array.isArray(o)) {
    util.each(o, function (i, opt) {
      if (util.isInt(opt)) {
        options.push(this.getOptionByIndex(opt));
      } else if (typeof opt === "string") {
        options.push(this.getOptionByValue(opt));
      }
    }, this);
  } else if (util.isInt(o)) {
    options.push(this.getOptionByIndex(o));
  } else if (typeof o === "string") {
    options.push(this.getOptionByValue(o));
  }
  if (options.length) {
    var index;
    util.each(options, function (i, option) {
      index = option.idx;

      // Remove the HTMLOptionElement
      this.el.remove(option);

      // Remove the reference from the option array
      this.options.splice(index, 1);

      // If the item has a parentNode (group element) it needs to be removed
      // otherwise the render function will still append it to the dropdown
      var parentNode = this.items[index].parentNode;
      if (parentNode) {
        parentNode.removeChild(this.items[index]);
      }

      // Remove reference from the items array
      this.items.splice(index, 1);

      // Reset the indexes
      util.each(this.options, function (i, opt) {
        opt.idx = i;
        this.items[i].idx = i;
      }, this);
    }, this);

    // We may have had an empty select now so update
    // the placeholder to reflect the changes.
    this.setPlaceholder();

    // Recount the pages
    if (this.config.pagination) {
      this.paginate();
    }
  }
};

/**
 * Remove all options
 */
Selectr.prototype.removeAll = function () {
  // Clear any selected options
  this.clear(true);

  // Remove the HTMLOptionElements
  util.each(this.el.options, function (i, option) {
    this.el.remove(option);
  }, this);

  // Empty the dropdown
  util.truncate(this.tree);

  // Reset variables
  this.items = [];
  this.options = [];
  this.data = [];
  this.navIndex = 0;
  if (this.requiresPagination) {
    this.requiresPagination = false;
    this.pageIndex = 1;
    this.pages = [];
  }

  // Update the placeholder
  this.setPlaceholder();
};

/**
 * Perform a search
 * @param {string}|{null} query The query string (taken from user input if null)
 * @param {boolean} anchor Anchor search to beginning of strings (defaults to false)?
 * @return {Array} Search results, as an array of {text, value} objects
 */
Selectr.prototype.search = function (string, anchor) {
  if (this.navigating) {
    return;
  }

  // we're only going to alter the DOM for "live" searches
  var live = false;
  if (!string) {
    string = this.input.value;
    live = true;

    // Remove message and clear dropdown
    this.removeMessage();
    util.truncate(this.tree);
  }
  var results = [];
  var f = document.createDocumentFragment();
  string = string.trim().toLowerCase();
  if (string.length > 0) {
    var compare = anchor ? util.startsWith : util.includes;
    util.each(this.options, function (i, option) {
      var item = this.items[option.idx];
      var matches = compare(option.textContent.trim().toLowerCase(), string);
      if (matches && !option.disabled) {
        results.push({
          text: option.textContent,
          value: option.value
        });
        if (live) {
          appendItem(item, f, this.customOption);
          util.removeClass(item, "excluded");

          // Underline the matching results
          if (!this.customOption) {
            match(string, option);
          }
        }
      } else if (live) {
        util.addClass(item, "excluded");
      }
    }, this);
    if (live) {
      // Append results
      if (!f.childElementCount) {
        if (!this.config.taggable) {
          this.noResults = true;
          this.setMessage(this.config.messages.noResults);
        }
      } else {
        // Highlight top result (@binary-koan #26)
        var prevEl = this.items[this.navIndex];
        var firstEl = f.querySelector(".selectr-option:not(.excluded)");
        this.noResults = false;
        util.removeClass(prevEl, "active");
        this.navIndex = firstEl.idx;
        util.addClass(firstEl, "active");
      }
      this.tree.appendChild(f);
    }
  } else {
    render.call(this);
  }
  return results;
};

/**
 * Toggle the dropdown
 * @return {void}
 */
Selectr.prototype.toggle = function () {
  if (!this.disabled) {
    if (this.opened) {
      this.close();
    } else {
      this.open();
    }
  }
};

/**
 * Open the dropdown
 * @return {void}
 */
Selectr.prototype.open = function () {
  var that = this;
  if (!this.options.length) {
    return false;
  }
  if (!this.opened) {
    this.emit("selectr.open");
  }
  this.opened = true;
  if (this.mobileDevice || this.config.nativeDropdown) {
    util.addClass(this.container, "native-open");
    if (this.config.data) {
      // Dump the options into the select
      // otherwise the native dropdown will be empty
      util.each(this.options, function (i, option) {
        this.el.add(option);
      }, this);
    }
    return;
  }
  util.addClass(this.container, "open");
  render.call(this);
  this.invert();
  this.tree.scrollTop = 0;
  util.removeClass(this.container, "notice");
  this.selected.setAttribute("aria-expanded", true);
  this.tree.setAttribute("aria-hidden", false);
  this.tree.setAttribute("aria-expanded", true);
  if (this.config.searchable && !this.config.taggable) {
    setTimeout(function () {
      that.input.focus();
      // Allow tab focus
      that.input.tabIndex = 0;
    }, 10);
  }
};

/**
 * Close the dropdown
 * @return {void}
 */
Selectr.prototype.close = function () {
  if (this.opened) {
    this.emit("selectr.close");
  }
  this.opened = false;
  this.navigating = false;
  if (this.mobileDevice || this.config.nativeDropdown) {
    util.removeClass(this.container, "native-open");
    return;
  }
  var notice = util.hasClass(this.container, "notice");
  if (this.config.searchable && !notice) {
    this.input.blur();
    // Disable tab focus
    this.input.tabIndex = -1;
    this.searching = false;
  }
  if (notice) {
    util.removeClass(this.container, "notice");
    this.notice.textContent = "";
  }
  util.removeClass(this.container, "open");
  util.removeClass(this.container, "native-open");
  this.selected.setAttribute("aria-expanded", false);
  this.tree.setAttribute("aria-hidden", true);
  this.tree.setAttribute("aria-expanded", false);
  util.truncate(this.tree);
  clearSearch.call(this);
};

/**
 * Enable the element
 * @return {void}
 */
Selectr.prototype.enable = function () {
  this.disabled = false;
  this.el.disabled = false;
  this.selected.tabIndex = this.originalIndex;
  if (this.el.multiple) {
    util.each(this.tags, function (i, t) {
      t.lastElementChild.tabIndex = 0;
    });
  }
  util.removeClass(this.container, "selectr-disabled");
};

/**
 * Disable the element
 * @param  {boolean} container Disable the container only (allow value submit with form)
 * @return {void}
 */
Selectr.prototype.disable = function (container) {
  if (!container) {
    this.el.disabled = true;
  }
  this.selected.tabIndex = -1;
  if (this.el.multiple) {
    util.each(this.tags, function (i, t) {
      t.lastElementChild.tabIndex = -1;
    });
  }
  this.disabled = true;
  util.addClass(this.container, "selectr-disabled");
};

/**
 * Reset to initial state
 * @return {void}
 */
Selectr.prototype.reset = function () {
  if (!this.disabled) {
    this.clear();
    this.setSelected(true);
    util.each(this.defaultSelected, function (i, idx) {
      this.select(idx);
    }, this);
    this.emit("selectr.reset");
  }
};

/**
 * Clear all selections
 * @return {void}
 */
Selectr.prototype.clear = function (force, isClearLast) {
  if (this.el.multiple) {
    // Loop over the selectedIndexes so we don't have to loop over all the options
    // which can be costly if there are a lot of them

    if (this.selectedIndexes.length) {
      // Copy the array or we'll get an error
      var indexes = this.selectedIndexes.slice();
      if (isClearLast) {
        this.deselect(indexes.slice(-1)[0]);
      } else {
        util.each(indexes, function (i, idx) {
          this.deselect(idx);
        }, this);
      }
    }
  } else {
    if (this.selectedIndex > -1) {
      this.deselect(this.selectedIndex, force);
    }
  }
  this.emit("selectr.clear");
};

/**
 * Return serialised data
 * @param  {boolean} toJson
 * @return {mixed} Returns either an object or JSON string
 */
Selectr.prototype.serialise = function (toJson) {
  var data = [];
  util.each(this.options, function (i, option) {
    var obj = {
      value: option.value,
      text: option.textContent
    };
    if (option.selected) {
      obj.selected = true;
    }
    if (option.disabled) {
      obj.disabled = true;
    }
    data[i] = obj;
  });
  return toJson ? JSON.stringify(data) : data;
};

/**
 * Localised version of serialise() method
 */
Selectr.prototype.serialize = function (toJson) {
  return this.serialise(toJson);
};

/**
 * Sets the placeholder
 * @param {String} placeholder
 */
Selectr.prototype.setPlaceholder = function (placeholder) {
  // Set the placeholder
  placeholder = placeholder || this.config.placeholder || this.el.getAttribute("placeholder");
  if (!this.options.length) {
    placeholder = this.config.messages.noOptions;
  }
  this.placeEl.innerHTML = placeholder;
};

/**
 * Paginate the option list
 * @return {Array}
 */
Selectr.prototype.paginate = function () {
  if (this.items.length) {
    var that = this;
    this.pages = this.items.map(function (v, i) {
      return i % that.config.pagination === 0 ? that.items.slice(i, i + that.config.pagination) : null;
    }).filter(function (pages) {
      return pages;
    });
    return this.pages;
  }
};

/**
 * Display a message
 * @param  {String} message The message
 */
Selectr.prototype.setMessage = function (message, close) {
  if (close) {
    this.close();
  }
  util.addClass(this.container, "notice");
  this.notice.textContent = message;
};

/**
 * Dismiss the current message
 */
Selectr.prototype.removeMessage = function () {
  util.removeClass(this.container, "notice");
  this.notice.innerHTML = "";
};

/**
 * Keep the dropdown within the window
 * @return {void}
 */
Selectr.prototype.invert = function () {
  var rt = util.rect(this.selected),
    oh = this.tree.parentNode.offsetHeight,
    wh = window.innerHeight,
    doInvert = rt.top + rt.height + oh > wh;
  if (doInvert) {
    util.addClass(this.container, "inverted");
    this.isInverted = true;
  } else {
    util.removeClass(this.container, "inverted");
    this.isInverted = false;
  }
  this.optsRect = util.rect(this.tree);
};

/**
 * Get an option via it's index
 * @param  {Integer} index The index of the HTMLOptionElement required
 * @return {HTMLOptionElement}
 */
Selectr.prototype.getOptionByIndex = function (index) {
  return this.options[index];
};

/**
 * Get an option via it's value
 * @param  {String} value The value of the HTMLOptionElement required
 * @return {HTMLOptionElement}
 */
Selectr.prototype.getOptionByValue = function (value) {
  var option = false;
  for (var i = 0, l = this.options.length; i < l; i++) {
    if (this.options[i].value.trim() === value.toString().trim()) {
      option = this.options[i];
      break;
    }
  }
  return option;
};
module.exports = Selectr;

/***/ }),

/***/ 660:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Oq: function() { return /* binding */ SIZE_LARGE; },
/* harmony export */   SC: function() { return /* binding */ PREVIEW_HISTORY_LIMIT; },
/* harmony export */   ai: function() { return /* binding */ DEFAULT_MODAL_ANCHOR; },
/* harmony export */   hJ: function() { return /* binding */ MAX_PREVIEW_CHARACTERS; }
/* harmony export */ });
var DEFAULT_MODAL_ANCHOR = document.body;
var SIZE_LARGE = 10 * 1024 * 1024; // 10 MB
var MAX_PREVIEW_CHARACTERS = 20000;
var PREVIEW_HISTORY_LIMIT = 2 * 1024 * 1024 * 1024; // 2 GB

/***/ }),

/***/ 925:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   p: function() { return /* binding */ createAbsoluteAnchor; }
/* harmony export */ });
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(237);


/**
 * Create an anchor element absolutely positioned in the `parent`
 * element.
 * @param {HTMLElement} anchor
 * @param {HTMLElement} parent
 * @param {function(HTMLElement)} [onDestroy]  Callback when the anchor is destroyed
 * @param {boolean} [destroyOnMouseOut=false] If true, anchor will be removed on mouse out
 * @returns {HTMLElement}
 */
function createAbsoluteAnchor(anchor, parent, onDestroy) {
  var destroyOnMouseOut = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  var root = getRootNode(anchor);
  var eventListeners = {};
  var anchorRect = anchor.getBoundingClientRect();
  var parentRect = parent.getBoundingClientRect();
  var absoluteAnchor = document.createElement('div');
  absoluteAnchor.className = 'jsoneditor-anchor';
  absoluteAnchor.style.position = 'absolute';
  absoluteAnchor.style.left = anchorRect.left - parentRect.left + 'px';
  absoluteAnchor.style.top = anchorRect.top - parentRect.top + 'px';
  absoluteAnchor.style.width = anchorRect.width - 2 + 'px';
  absoluteAnchor.style.height = anchorRect.height - 2 + 'px';
  absoluteAnchor.style.boxSizing = 'border-box';
  parent.appendChild(absoluteAnchor);
  function destroy() {
    // remove temporary absolutely positioned anchor
    if (absoluteAnchor && absoluteAnchor.parentNode) {
      absoluteAnchor.parentNode.removeChild(absoluteAnchor);

      // remove all event listeners
      // all event listeners are supposed to be attached to document.
      for (var name in eventListeners) {
        if (hasOwnProperty(eventListeners, name)) {
          var fn = eventListeners[name];
          if (fn) {
            (0,_util__WEBPACK_IMPORTED_MODULE_0__.removeEventListener)(root, name, fn);
          }
          delete eventListeners[name];
        }
      }
      if (typeof onDestroy === 'function') {
        onDestroy(anchor);
      }
    }
  }
  function isOutside(target) {
    return target !== absoluteAnchor && !(0,_util__WEBPACK_IMPORTED_MODULE_0__.isChildOf)(target, absoluteAnchor);
  }

  // create and attach event listeners
  function destroyIfOutside(event) {
    if (isOutside(event.target)) {
      destroy();
    }
  }
  eventListeners.mousedown = (0,_util__WEBPACK_IMPORTED_MODULE_0__.addEventListener)(root, 'mousedown', destroyIfOutside);
  eventListeners.mousewheel = (0,_util__WEBPACK_IMPORTED_MODULE_0__.addEventListener)(root, 'mousewheel', destroyIfOutside);
  if (destroyOnMouseOut) {
    var destroyTimer = null;
    absoluteAnchor.onmouseover = function () {
      clearTimeout(destroyTimer);
      destroyTimer = null;
    };
    absoluteAnchor.onmouseout = function () {
      if (!destroyTimer) {
        destroyTimer = setTimeout(destroy, 200);
      }
    };
  }
  absoluteAnchor.destroy = destroy;
  return absoluteAnchor;
}

/**
 * Node.getRootNode shim
 * @param  {HTMLElement} node node to check
 * @return {HTMLElement}      node's rootNode or `window` if there is ShadowDOM is not supported.
 */
function getRootNode(node) {
  return typeof node.getRootNode === 'function' ? node.getRootNode() : window;
}
function hasOwnProperty(object, key) {
  return Object.prototype.hasOwnProperty.call(object, key);
}

/***/ }),

/***/ 57:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AI: function() { return /* binding */ setLanguages; },
/* harmony export */   Tl: function() { return /* binding */ translate; },
/* harmony export */   xC: function() { return /* binding */ setLanguage; }
/* harmony export */ });
/* harmony import */ var _polyfills__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(81);
/* harmony import */ var _polyfills__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_polyfills__WEBPACK_IMPORTED_MODULE_0__);


/* eslint-disable no-template-curly-in-string */

var _defs = {
  en: {
    array: 'Array',
    auto: 'Auto',
    appendText: 'Append',
    appendTitle: 'Append a new field with type \'auto\' after this field (Ctrl+Shift+Ins)',
    appendSubmenuTitle: 'Select the type of the field to be appended',
    appendTitleAuto: 'Append a new field with type \'auto\' (Ctrl+Shift+Ins)',
    ascending: 'Ascending',
    ascendingTitle: 'Sort the childs of this ${type} in ascending order',
    actionsMenu: 'Click to open the actions menu (Ctrl+M)',
    cannotParseFieldError: 'Cannot parse field into JSON',
    cannotParseValueError: 'Cannot parse value into JSON',
    collapseAll: 'Collapse all fields',
    compactTitle: 'Compact JSON data, remove all whitespaces (Ctrl+Shift+I)',
    descending: 'Descending',
    descendingTitle: 'Sort the childs of this ${type} in descending order',
    drag: 'Drag to move this field (Alt+Shift+Arrows)',
    duplicateKey: 'duplicate key',
    duplicateText: 'Duplicate',
    duplicateTitle: 'Duplicate selected fields (Ctrl+D)',
    duplicateField: 'Duplicate this field (Ctrl+D)',
    duplicateFieldError: 'Duplicate field name',
    empty: 'empty',
    expandAll: 'Expand all fields',
    expandTitle: 'Click to expand/collapse this field (Ctrl+E). \n' + 'Ctrl+Click to expand/collapse including all childs.',
    formatTitle: 'Format JSON data, with proper indentation and line feeds (Ctrl+I)',
    insert: 'Insert',
    insertTitle: 'Insert a new field with type \'auto\' before this field (Ctrl+Ins)',
    insertSub: 'Select the type of the field to be inserted',
    object: 'Object',
    ok: 'Ok',
    redo: 'Redo (Ctrl+Shift+Z)',
    removeText: 'Remove',
    removeTitle: 'Remove selected fields (Ctrl+Del)',
    removeField: 'Remove this field (Ctrl+Del)',
    repairTitle: 'Repair JSON: fix quotes and escape characters, remove comments and JSONP notation, turn JavaScript objects into JSON.',
    searchTitle: 'Search fields and values',
    searchNextResultTitle: 'Next result (Enter)',
    searchPreviousResultTitle: 'Previous result (Shift + Enter)',
    selectNode: 'Select a node...',
    showAll: 'show all',
    showMore: 'show more',
    showMoreStatus: 'displaying ${visibleChilds} of ${totalChilds} items.',
    sort: 'Sort',
    sortTitle: 'Sort the childs of this ${type}',
    sortTitleShort: 'Sort contents',
    sortFieldLabel: 'Field:',
    sortDirectionLabel: 'Direction:',
    sortFieldTitle: 'Select the nested field by which to sort the array or object',
    sortAscending: 'Ascending',
    sortAscendingTitle: 'Sort the selected field in ascending order',
    sortDescending: 'Descending',
    sortDescendingTitle: 'Sort the selected field in descending order',
    string: 'String',
    transform: 'Transform',
    transformTitle: 'Filter, sort, or transform the childs of this ${type}',
    transformTitleShort: 'Filter, sort, or transform contents',
    extract: 'Extract',
    extractTitle: 'Extract this ${type}',
    transformQueryTitle: 'Enter a JMESPath query',
    transformWizardLabel: 'Wizard',
    transformWizardFilter: 'Filter',
    transformWizardSortBy: 'Sort by',
    transformWizardSelectFields: 'Select fields',
    transformQueryLabel: 'Query',
    transformPreviewLabel: 'Preview',
    type: 'Type',
    typeTitle: 'Change the type of this field',
    openUrl: 'Ctrl+Click or Ctrl+Enter to open url in new window',
    undo: 'Undo last action (Ctrl+Z)',
    validationCannotMove: 'Cannot move a field into a child of itself',
    autoType: 'Field type "auto". ' + 'The field type is automatically determined from the value ' + 'and can be a string, number, boolean, or null.',
    objectType: 'Field type "object". ' + 'An object contains an unordered set of key/value pairs.',
    arrayType: 'Field type "array". ' + 'An array contains an ordered collection of values.',
    stringType: 'Field type "string". ' + 'Field type is not determined from the value, ' + 'but always returned as string.',
    modeEditorTitle: 'Switch Editor Mode',
    modeCodeText: 'Code',
    modeCodeTitle: 'Switch to code highlighter',
    modeFormText: 'Form',
    modeFormTitle: 'Switch to form editor',
    modeTextText: 'Text',
    modeTextTitle: 'Switch to plain text editor',
    modeTreeText: 'Tree',
    modeTreeTitle: 'Switch to tree editor',
    modeViewText: 'View',
    modeViewTitle: 'Switch to tree view',
    modePreviewText: 'Preview',
    modePreviewTitle: 'Switch to preview mode',
    examples: 'Examples',
    "default": 'Default',
    containsInvalidProperties: 'Contains invalid properties',
    containsInvalidItems: 'Contains invalid items'
  },
  es: {
    array: 'Matriz',
    auto: 'Auto',
    appendText: 'Agregar',
    appendTitle: 'Agregue un nuevo campo con el tipo \'auto\' después de este campo (Ctrl + Shift + Ins)',
    appendSubmenuTitle: 'Seleccione el tipo de campo que se agregará',
    appendTitleAuto: 'Agregue un nuevo campo con el tipo \'auto\' (Ctrl + Shift + Ins)',
    ascending: 'Ascendente',
    ascendingTitle: 'Ordene los elementos secundarios de este ${type} en orden ascendente',
    actionsMenu: 'Haga clic para abrir el menú de acciones (Ctrl + M)',
    cannotParseFieldError: 'No se puede parsear el campo en JSON',
    cannotParseValueError: 'No se puede parsear el valor en JSON',
    collapseAll: 'Contraer todos los campos',
    compactTitle: 'Compactar datos JSON, eliminar todos los espacios en blanco (Ctrl + Shift + I)',
    descending: 'Descendente',
    descendingTitle: 'Ordene los hijos de este ${type} en orden descendente',
    drag: 'Arrastre para mover este campo (Alt + Mayús + Flechas)',
    duplicateKey: 'llave duplicada',
    duplicateText: 'Duplicar',
    duplicateTitle: 'Duplicar campos seleccionados (Ctrl + D)',
    duplicateField: 'Duplicar este campo (Ctrl + D)',
    duplicateFieldError: 'Nombre de campo duplicado',
    empty: 'vacio',
    expandAll: 'Expandir todos los campos',
    expandTitle: 'Haga clic para expandir/contraer este campo (Ctrl + E). \n ' + ' Ctrl+Clic para expandir/contraer incluyendo todos los niños.',
    formatTitle: 'Formatee los datos JSON, con la sangría y los avances de línea adecuados (Ctrl + I)',
    insert: 'Insertar',
    insertTitle: 'Inserte un nuevo campo con el tipo \'auto\' antes de este campo (Ctrl + Ins)',
    insertSub: 'Seleccione el tipo de campo a insertar',
    object: 'Objeto',
    ok: 'Ok',
    redo: 'Rehacer (Ctrl+Mayús+Z)',
    removeText: 'Eliminar',
    removeTitle: 'Eliminar campos seleccionados (Ctrl+Supr)',
    removeField: 'Eliminar este campo (Ctrl+Supr)',
    repairTitle: 'Reparar JSON: corrija comillas y caracteres de escape, elimine comentarios y notación JSONP, convierta objetos JavaScript en JSON.',
    searchTitle: 'Campos de búsqueda y valores',
    searchNextResultTitle: 'Siguiente resultado (Entrar)',
    searchPreviousResultTitle: 'Resultado anterior (Shift + Enter)',
    selectNode: 'Seleccione un nodo...',
    showAll: 'mostrar todo',
    showMore: 'mostrar más',
    showMoreStatus: 'mostrando ${visibleChilds} de ${totalChilds} elementos.',
    sort: 'Ordenar',
    sortTitle: 'Ordene los hijos de este ${type}',
    sortTitleShort: 'Ordenar contenidos',
    sortFieldLabel: 'Campo:',
    sortDirectionLabel: 'Dirección:',
    sortFieldTitle: 'Seleccione el campo anidado por el cual ordenar la matriz u objeto',
    sortAscending: 'Ascendente',
    sortAscendingTitle: 'Ordenar el campo seleccionado en orden ascendente',
    sortDescending: 'Descendente',
    sortDescendingTitle: 'Ordenar por el campo seleccionado, en orden descendente',
    string: 'Texto',
    transform: 'Transformar',
    transformTitle: 'Filtrar, ordenar o transformar los hijos de este ${type}',
    transformTitleShort: 'Filtrar, ordenar o transformar contenidos',
    extract: 'Extraer',
    extractTitle: 'Extrae este ${type}',
    transformQueryTitle: 'Ingrese una consulta JMESPath',
    transformWizardLabel: 'Wizard',
    transformWizardFilter: 'Filtro',
    transformWizardSortBy: 'Ordenar por',
    transformWizardSelectFields: 'Seleccione un campo',
    transformQueryLabel: 'Consulta',
    transformPreviewLabel: 'Vista Previa',
    type: 'Tipo',
    typeTitle: 'Cambiar el tipo de campo',
    openUrl: 'Ctrl+Click o Ctrl+Enter para abrir la URL en una nueva ventana',
    undo: 'Deshacer la última acción (Ctrl+Z)',
    validationCannotMove: 'No se puede mover un campo a un hijo de sí mismo.',
    autoType: 'Tipo de campo "auto". ' + 'El tipo de campo se determina automáticamente a partir del valor ' + 'y puede ser una cadena, un número, un booleano o un valor nulo.',
    objectType: 'Tipo de campo "objeto". ' + ' Un objeto contiene un conjunto desordenado de pares clave/valor.',
    arrayType: 'Tipo de campo "matriz". ' + ' Una matriz contiene una colección ordenada de valores.',
    stringType: 'Tipo de campo "cadena". ' + ' El tipo de campo no se determina a partir del valor, ' + ' pero siempre se devuelve como una cadena.',
    modeEditorTitle: 'Cambiar modo de editor',
    modeCodeText: 'Código',
    modeCodeTitle: 'Cambiar al resaltador de código',
    modeFormText: 'Formulario',
    modeFormTitle: 'Cambiar al editor de formularios',
    modeTextText: 'Texto',
    modeTextTitle: 'Cambiar al editor de texto sin formato',
    modeTreeText: 'Árbol',
    modeTreeTitle: 'Cambiar al editor de árbol',
    modeViewText: 'Vista',
    modeViewTitle: 'Cambiar a la vista de árbol',
    modePreviewText: 'Vista Previa',
    modePreviewTitle: 'Cambiar al modo de vista previa',
    examples: 'Ejemplos',
    "default": 'Predeterminado',
    containsInvalidProperties: 'Contiene propiedades no válidas',
    containsInvalidItems: 'Contiene ítems no válidos'
  },
  'zh-CN': {
    array: '数组',
    auto: '自动',
    appendText: '追加',
    appendTitle: '在此字段后追加一个类型为“auto”的新字段 (Ctrl+Shift+Ins)',
    appendSubmenuTitle: '选择要追加的字段类型',
    appendTitleAuto: '追加类型为“auto”的新字段 (Ctrl+Shift+Ins)',
    ascending: '升序',
    ascendingTitle: '升序排列${type}的子节点',
    actionsMenu: '点击打开动作菜单(Ctrl+M)',
    cannotParseFieldError: '无法将字段解析为JSON',
    cannotParseValueError: '无法将值解析为JSON',
    collapseAll: '缩进所有字段',
    compactTitle: '压缩JSON数据，删除所有空格 (Ctrl+Shift+I)',
    descending: '降序',
    descendingTitle: '降序排列${type}的子节点',
    drag: '拖拽移动该节点(Alt+Shift+Arrows)',
    duplicateKey: '重复键',
    duplicateText: '复制',
    duplicateTitle: '复制选中字段(Ctrl+D)',
    duplicateField: '复制该字段(Ctrl+D)',
    duplicateFieldError: '重复的字段名称',
    empty: '清空',
    expandAll: '展开所有字段',
    expandTitle: '点击 展开/收缩 该字段(Ctrl+E). \n' + 'Ctrl+Click 展开/收缩 包含所有子节点.',
    formatTitle: '使用适当的缩进和换行符格式化JSON数据 (Ctrl+I)',
    insert: '插入',
    insertTitle: '在此字段前插入类型为“auto”的新字段 (Ctrl+Ins)',
    insertSub: '选择要插入的字段类型',
    object: '对象',
    ok: 'Ok',
    redo: '重做 (Ctrl+Shift+Z)',
    removeText: '移除',
    removeTitle: '移除选中字段 (Ctrl+Del)',
    removeField: '移除该字段 (Ctrl+Del)',
    repairTitle: '修复JSON：修复引号和转义符，删除注释和JSONP表示法，将JavaScript对象转换为JSON。',
    selectNode: '选择一个节点...',
    showAll: '展示全部',
    showMore: '展示更多',
    showMoreStatus: '显示${totalChilds}的${visibleChilds}项目.',
    sort: '排序',
    sortTitle: '排序${type}的子节点',
    sortTitleShort: '内容排序',
    sortFieldLabel: '字段：',
    sortDirectionLabel: '方向：',
    sortFieldTitle: '选择用于对数组或对象排序的嵌套字段',
    sortAscending: '升序排序',
    sortAscendingTitle: '按照该字段升序排序',
    sortDescending: '降序排序',
    sortDescendingTitle: '按照该字段降序排序',
    string: '字符串',
    transform: '变换',
    transformTitle: '筛选，排序，或者转换${type}的子节点',
    transformTitleShort: '筛选，排序，或者转换内容',
    extract: '提取',
    extractTitle: '提取这个 ${type}',
    transformQueryTitle: '输入JMESPath查询',
    transformWizardLabel: '向导',
    transformWizardFilter: '筛选',
    transformWizardSortBy: '排序',
    transformWizardSelectFields: '选择字段',
    transformQueryLabel: '查询',
    transformPreviewLabel: '预览',
    type: '类型',
    typeTitle: '更改字段类型',
    openUrl: 'Ctrl+Click 或者 Ctrl+Enter 在新窗口打开链接',
    undo: '撤销上次动作 (Ctrl+Z)',
    validationCannotMove: '无法将字段移入其子节点',
    autoType: '字段类型 "auto". ' + '字段类型由值自动确定 ' + '可以为 string，number，boolean，或者 null.',
    objectType: '字段类型 "object". ' + '对象包含一组无序的键/值对.',
    arrayType: '字段类型 "array". ' + '数组包含值的有序集合.',
    stringType: '字段类型 "string". ' + '字段类型由值自动确定，' + '但始终作为字符串返回.',
    modeCodeText: '代码',
    modeCodeTitle: '切换至代码高亮',
    modeFormText: '表单',
    modeFormTitle: '切换至表单编辑',
    modeTextText: '文本',
    modeTextTitle: '切换至文本编辑',
    modeTreeText: '树',
    modeTreeTitle: '切换至树编辑',
    modeViewText: '视图',
    modeViewTitle: '切换至树视图',
    modePreviewText: '预览',
    modePreviewTitle: '切换至预览模式',
    examples: '例子',
    "default": '缺省',
    containsInvalidProperties: '包含无效的属性',
    containsInvalidItems: '包含无效项目'
  },
  'pt-BR': {
    array: 'Lista',
    auto: 'Automatico',
    appendText: 'Adicionar',
    appendTitle: 'Adicionar novo campo com tipo \'auto\' depois deste campo (Ctrl+Shift+Ins)',
    appendSubmenuTitle: 'Selecione o tipo do campo a ser adicionado',
    appendTitleAuto: 'Adicionar novo campo com tipo \'auto\' (Ctrl+Shift+Ins)',
    ascending: 'Ascendente',
    ascendingTitle: 'Organizar filhor do tipo ${type} em crescente',
    actionsMenu: 'Clique para abrir o menu de ações (Ctrl+M)',
    cannotParseFieldError: 'Não é possível analisar o campo no JSON',
    cannotParseValueError: 'Não é possível analisar o valor em JSON',
    collapseAll: 'Fechar todos campos',
    compactTitle: 'Dados JSON compactos, remova todos os espaços em branco (Ctrl+Shift+I)',
    descending: 'Descendente',
    descendingTitle: 'Organizar o filhos do tipo ${type} em decrescente',
    duplicateKey: 'chave duplicada',
    drag: 'Arraste para mover este campo (Alt+Shift+Arrows)',
    duplicateText: 'Duplicar',
    duplicateTitle: 'Duplicar campos selecionados (Ctrl+D)',
    duplicateField: 'Duplicar este campo (Ctrl+D)',
    duplicateFieldError: 'Nome do campo duplicado',
    empty: 'vazio',
    expandAll: 'Expandir todos campos',
    expandTitle: 'Clique para expandir/encolher este campo (Ctrl+E). \n' + 'Ctrl+Click para expandir/encolher incluindo todos os filhos.',
    formatTitle: 'Formate dados JSON, com recuo e feeds de linha adequados (Ctrl+I)',
    insert: 'Inserir',
    insertTitle: 'Inserir um novo campo do tipo \'auto\' antes deste campo (Ctrl+Ins)',
    insertSub: 'Selecionar o tipo de campo a ser inserido',
    object: 'Objeto',
    ok: 'Ok',
    redo: 'Refazer (Ctrl+Shift+Z)',
    removeText: 'Remover',
    removeTitle: 'Remover campos selecionados (Ctrl+Del)',
    removeField: 'Remover este campo (Ctrl+Del)',
    repairTitle: 'Repare JSON: corrija aspas e caracteres de escape, remova comentários e notação JSONP, transforme objetos JavaScript em JSON.',
    selectNode: 'Selecione um nódulo...',
    showAll: 'mostrar todos',
    showMore: 'mostrar mais',
    showMoreStatus: 'exibindo ${visibleChilds} de ${totalChilds} itens.',
    sort: 'Organizar',
    sortTitle: 'Organizar os filhos deste ${type}',
    sortTitleShort: 'Organizar os filhos',
    sortFieldLabel: 'Campo:',
    sortDirectionLabel: 'Direção:',
    sortFieldTitle: 'Selecione um campo filho pelo qual ordenar o array ou objeto',
    sortAscending: 'Ascendente',
    sortAscendingTitle: 'Ordenar o campo selecionado por ordem ascendente',
    sortDescending: 'Descendente',
    sortDescendingTitle: 'Ordenar o campo selecionado por ordem descendente',
    string: 'Texto',
    transform: 'Transformar',
    transformTitle: 'Filtrar, ordenar ou transformar os filhos deste ${type}',
    transformTitleShort: 'Filtrar, ordenar ou transformar conteúdos',
    transformQueryTitle: 'Insira uma expressão JMESPath',
    transformWizardLabel: 'Assistente',
    transformWizardFilter: 'Filtro',
    transformWizardSortBy: 'Ordenar por',
    transformWizardSelectFields: 'Selecionar campos',
    transformQueryLabel: 'Expressão',
    transformPreviewLabel: 'Visualizar',
    type: 'Tipo',
    typeTitle: 'Mudar o tipo deste campo',
    openUrl: 'Ctrl+Click ou Ctrl+Enter para abrir link em nova janela',
    undo: 'Desfazer último ação (Ctrl+Z)',
    validationCannotMove: 'Não pode mover um campo como filho dele mesmo',
    autoType: 'Campo do tipo "auto". ' + 'O tipo do campo é determinao automaticamente a partir do seu valor ' + 'e pode ser texto, número, verdade/falso ou nulo.',
    objectType: 'Campo do tipo "objeto". ' + 'Um objeto contém uma lista de pares com chave e valor.',
    arrayType: 'Campo do tipo "lista". ' + 'Uma lista contem uma coleção de valores ordenados.',
    stringType: 'Campo do tipo "string". ' + 'Campo do tipo nao é determinado através do seu valor, ' + 'mas sempre retornara um texto.',
    examples: 'Exemplos',
    "default": 'Revelia',
    containsInvalidProperties: 'Contém propriedades inválidas',
    containsInvalidItems: 'Contém itens inválidos'
  },
  tr: {
    array: 'Dizin',
    auto: 'Otomatik',
    appendText: 'Ekle',
    appendTitle: 'Bu alanın altına \'otomatik\' tipinde yeni bir alan ekle (Ctrl+Shift+Ins)',
    appendSubmenuTitle: 'Eklenecek alanın tipini seç',
    appendTitleAuto: '\'Otomatik\' tipinde yeni bir alan ekle (Ctrl+Shift+Ins)',
    ascending: 'Artan',
    ascendingTitle: '${type}\'ın alt tiplerini artan düzende sırala',
    actionsMenu: 'Aksiyon menüsünü açmak için tıklayın (Ctrl+M)',
    collapseAll: 'Tüm alanları kapat',
    descending: 'Azalan',
    descendingTitle: '${type}\'ın alt tiplerini azalan düzende sırala',
    drag: 'Bu alanı taşımak için sürükleyin (Alt+Shift+Arrows)',
    duplicateKey: 'Var olan anahtar',
    duplicateText: 'Aşağıya kopyala',
    duplicateTitle: 'Seçili alanlardan bir daha oluştur (Ctrl+D)',
    duplicateField: 'Bu alandan bir daha oluştur (Ctrl+D)',
    duplicateFieldError: 'Duplicate field name',
    cannotParseFieldError: 'Alan JSON\'a ayrıştırılamıyor',
    cannotParseValueError: 'JSON\'a değer ayrıştırılamıyor',
    empty: 'boş',
    expandAll: 'Tüm alanları aç',
    expandTitle: 'Bu alanı açmak/kapatmak için tıkla (Ctrl+E). \n' + 'Alt alanlarda dahil tüm alanları açmak için Ctrl+Click ',
    insert: 'Ekle',
    insertTitle: 'Bu alanın üstüne \'otomatik\' tipinde yeni bir alan ekle (Ctrl+Ins)',
    insertSub: 'Araya eklenecek alanın tipini seç',
    object: 'Nesne',
    ok: 'Tamam',
    redo: 'Yeniden yap (Ctrl+Shift+Z)',
    removeText: 'Kaldır',
    removeTitle: 'Seçilen alanları kaldır (Ctrl+Del)',
    removeField: 'Bu alanı kaldır (Ctrl+Del)',
    selectNode: 'Bir nesne seç...',
    showAll: 'tümünü göster',
    showMore: 'daha fazla göster',
    showMoreStatus: '${totalChilds} alanın ${visibleChilds} alt alanları gösteriliyor',
    sort: 'Sırala',
    sortTitle: '${type}\'ın alt alanlarını sırala',
    sortTitleShort: 'İçerikleri sırala',
    sortFieldLabel: 'Alan:',
    sortDirectionLabel: 'Yön:',
    sortFieldTitle: 'Diziyi veya nesneyi sıralamak için iç içe geçmiş alanı seçin',
    sortAscending: 'Artan',
    sortAscendingTitle: 'Seçili alanı artan düzende sırala',
    sortDescending: 'Azalan',
    sortDescendingTitle: 'Seçili alanı azalan düzende sırala',
    string: 'Karakter Dizisi',
    transform: 'Dönüştür',
    transformTitle: '${type}\'ın alt alanlarını filtrele, sırala veya dönüştür',
    transformTitleShort: 'İçerikleri filterele, sırala veya dönüştür',
    transformQueryTitle: 'JMESPath sorgusu gir',
    transformWizardLabel: 'Sihirbaz',
    transformWizardFilter: 'Filtre',
    transformWizardSortBy: 'Sırala',
    transformWizardSelectFields: 'Alanları seç',
    transformQueryLabel: 'Sorgu',
    transformPreviewLabel: 'Önizleme',
    type: 'Tip',
    typeTitle: 'Bu alanın tipini değiştir',
    openUrl: 'URL\'i yeni bir pencerede açmak için Ctrl+Click veya Ctrl+Enter',
    undo: 'Son değişikliği geri al (Ctrl+Z)',
    validationCannotMove: 'Alt alan olarak taşınamıyor',
    autoType: 'Alan tipi "otomatik". ' + 'Alan türü otomatik olarak değerden belirlenir' + 've bir dize, sayı, boolean veya null olabilir.',
    objectType: 'Alan tipi "nesne". ' + 'Bir nesne, sıralanmamış bir anahtar / değer çifti kümesi içerir.',
    arrayType: 'Alan tipi "dizi". ' + 'Bir dizi, düzenli değerler koleksiyonu içerir.',
    stringType: 'Alan tipi "karakter dizisi". ' + 'Alan türü değerden belirlenmez,' + 'ancak her zaman karakter dizisi olarak döndürülür.',
    modeCodeText: 'Kod',
    modeCodeTitle: 'Kod vurgulayıcıya geç',
    modeFormText: 'Form',
    modeFormTitle: 'Form düzenleyiciye geç',
    modeTextText: 'Metin',
    modeTextTitle: 'Düz metin düzenleyiciye geç',
    modeTreeText: 'Ağaç',
    modeTreeTitle: 'Ağaç düzenleyiciye geç',
    modeViewText: 'Görünüm',
    modeViewTitle: 'Ağaç görünümüne geç',
    examples: 'Örnekler',
    "default": 'Varsayılan',
    containsInvalidProperties: 'Geçersiz özellikler içeriyor',
    containsInvalidItems: 'Geçersiz öğeler içeriyor'
  },
  ja: {
    array: '配列',
    auto: 'オート',
    appendText: '追加',
    appendTitle: '次のフィールドに"オート"のフィールドを追加 (Ctrl+Shift+Ins)',
    appendSubmenuTitle: '追加するフィールドの型を選択してください',
    appendTitleAuto: '"オート"のフィールドを追加 (Ctrl+Shift+Ins)',
    ascending: '昇順',
    ascendingTitle: '${type}の子要素を昇順に並べ替え',
    actionsMenu: 'クリックしてアクションメニューを開く (Ctrl+M)',
    collapseAll: 'すべてを折りたたむ',
    descending: '降順',
    descendingTitle: '${type}の子要素を降順に並べ替え',
    drag: 'ドラッグして選択中のフィールドを移動 (Alt+Shift+Arrows)',
    duplicateKey: '複製キー',
    duplicateText: '複製',
    duplicateTitle: '選択中のフィールドを複製 (Ctrl+D)',
    duplicateField: '選択中のフィールドを複製 (Ctrl+D)',
    duplicateFieldError: 'フィールド名が重複しています',
    cannotParseFieldError: 'JSONのフィールドを解析できません',
    cannotParseValueError: 'JSONの値を解析できません',
    empty: '空',
    expandAll: 'すべてを展開',
    expandTitle: 'クリックしてフィールドを展開/折りたたむ (Ctrl+E). \n' + 'Ctrl+Click ですべての子要素を展開/折りたたむ',
    insert: '挿入',
    insertTitle: '選択中のフィールドの前に新しいフィールドを挿入 (Ctrl+Ins)',
    insertSub: '挿入するフィールドの型を選択',
    object: 'オブジェクト',
    ok: '実行',
    redo: 'やり直す (Ctrl+Shift+Z)',
    removeText: '削除',
    removeTitle: '選択中のフィールドを削除 (Ctrl+Del)',
    removeField: '選択中のフィールドを削除 (Ctrl+Del)',
    selectNode: 'ノードを選択...',
    showAll: 'すべてを表示',
    showMore: 'もっと見る',
    showMoreStatus: '${totalChilds}個のアイテムのうち ${visibleChilds}個を表示しています。',
    sort: '並べ替え',
    sortTitle: '${type}の子要素を並べ替え',
    sortTitleShort: '並べ替え',
    sortFieldLabel: 'フィールド:',
    sortDirectionLabel: '順序:',
    sortFieldTitle: '配列またはオブジェクトを並び替えるためのフィールドを選択',
    sortAscending: '昇順',
    sortAscendingTitle: '選択中のフィールドを昇順に並び替え',
    sortDescending: '降順',
    sortDescendingTitle: '選択中のフィールドを降順に並び替え',
    string: '文字列',
    transform: '変換',
    transformTitle: '${type}の子要素をフィルター・並び替え・変換する',
    transformTitleShort: '内容をフィルター・並び替え・変換する',
    extract: '抽出',
    extractTitle: '${type}を抽出',
    transformQueryTitle: 'JMESPathクエリを入力',
    transformWizardLabel: 'ウィザード',
    transformWizardFilter: 'フィルター',
    transformWizardSortBy: '並び替え',
    transformWizardSelectFields: 'フィールドを選択',
    transformQueryLabel: 'クエリ',
    transformPreviewLabel: 'プレビュー',
    type: '型',
    typeTitle: '選択中のフィールドの型を変更',
    openUrl: 'Ctrl+Click または Ctrl+Enter で 新規ウィンドウでURLを開く',
    undo: '元に戻す (Ctrl+Z)',
    validationCannotMove: '子要素に移動できません ',
    autoType: 'オート： ' + 'フィールドの型は値から自動的に決定されます。 ' + '(文字列・数値・ブール・null)',
    objectType: 'オブジェクト： ' + 'オブジェクトは順序が決まっていないキーと値のペア組み合わせです。',
    arrayType: '配列： ' + '配列は順序が決まっている値の集合体です。',
    stringType: '文字列： ' + 'フィールド型は値から決定されませんが、' + '常に文字列として返されます。',
    modeCodeText: 'コードモード',
    modeCodeTitle: 'ハイライトモードに切り替え',
    modeFormText: 'フォームモード',
    modeFormTitle: 'フォームモードに切り替え',
    modeTextText: 'テキストモード',
    modeTextTitle: 'テキストモードに切り替え',
    modeTreeText: 'ツリーモード',
    modeTreeTitle: 'ツリーモードに切り替え',
    modeViewText: 'ビューモード',
    modeViewTitle: 'ビューモードに切り替え',
    modePreviewText: 'プレビュー',
    modePreviewTitle: 'プレビューに切り替え',
    examples: '例',
    "default": 'デフォルト',
    containsInvalidProperties: '無効なプロパティが含まれています',
    containsInvalidItems: '無効なアイテムが含まれています'
  },
  'fr-FR': {
    array: 'Liste',
    auto: 'Auto',
    appendText: 'Ajouter',
    appendTitle: 'Ajouter un champ de type \'auto\' après ce champ (Ctrl+Shift+Ins)',
    appendSubmenuTitle: 'Sélectionner le type du champ à ajouter',
    appendTitleAuto: 'Ajouter un champ de type \'auto\' (Ctrl+Shift+Ins)',
    ascending: 'Ascendant',
    ascendingTitle: 'Trier les enfants de ce ${type} par ordre ascendant',
    actionsMenu: 'Ouvrir le menu des actions (Ctrl+M)',
    collapseAll: 'Regrouper',
    descending: 'Descendant',
    descendingTitle: 'Trier les enfants de ce ${type} par ordre descendant',
    drag: 'Déplacer (Alt+Shift+Arrows)',
    duplicateKey: 'Dupliquer la clé',
    duplicateText: 'Dupliquer',
    duplicateTitle: 'Dupliquer les champs sélectionnés (Ctrl+D)',
    duplicateField: 'Dupliquer ce champ (Ctrl+D)',
    duplicateFieldError: 'Dupliquer le nom de champ',
    cannotParseFieldError: 'Champ impossible à parser en JSON',
    cannotParseValueError: 'Valeur impossible à parser en JSON',
    empty: 'vide',
    expandAll: 'Étendre',
    expandTitle: 'Étendre/regrouper ce champ (Ctrl+E). \n' + 'Ctrl+Click pour étendre/regrouper avec tous les champs.',
    insert: 'Insérer',
    insertTitle: 'Insérer un champ de type \'auto\' avant ce champ (Ctrl+Ins)',
    insertSub: 'Sélectionner le type de champ à insérer',
    object: 'Objet',
    ok: 'Ok',
    redo: 'Rejouer (Ctrl+Shift+Z)',
    removeText: 'Supprimer',
    removeTitle: 'Supprimer les champs sélectionnés (Ctrl+Del)',
    removeField: 'Supprimer ce champ (Ctrl+Del)',
    searchTitle: 'Rechercher champs et valeurs',
    searchNextResultTitle: 'Résultat suivant (Enter)',
    searchPreviousResultTitle: 'Résultat précédent (Shift + Enter)',
    selectNode: 'Sélectionner un nœud...',
    showAll: 'voir tout',
    showMore: 'voir plus',
    showMoreStatus: '${visibleChilds} éléments affichés de ${totalChilds}.',
    sort: 'Trier',
    sortTitle: 'Trier les champs de ce ${type}',
    sortTitleShort: 'Trier',
    sortFieldLabel: 'Champ:',
    sortDirectionLabel: 'Direction:',
    sortFieldTitle: 'Sélectionner les champs permettant de trier les listes et objet',
    sortAscending: 'Ascendant',
    sortAscendingTitle: 'Trier les champs sélectionnés par ordre ascendant',
    sortDescending: 'Descendant',
    sortDescendingTitle: 'Trier les champs sélectionnés par ordre descendant',
    string: 'Chaîne',
    transform: 'Transformer',
    transformTitle: 'Filtrer, trier, or transformer les enfants de ce ${type}',
    transformTitleShort: 'Filtrer, trier ou transformer le contenu',
    extract: 'Extraire',
    extractTitle: 'Extraire ce ${type}',
    transformQueryTitle: 'Saisir une requête JMESPath',
    transformWizardLabel: 'Assistant',
    transformWizardFilter: 'Filtrer',
    transformWizardSortBy: 'Trier par',
    transformWizardSelectFields: 'Sélectionner les champs',
    transformQueryLabel: 'Requête',
    transformPreviewLabel: 'Prévisualisation',
    type: 'Type',
    typeTitle: 'Changer le type de ce champ',
    openUrl: 'Ctrl+Click ou Ctrl+Enter pour ouvrir l\'url dans une autre fenêtre',
    undo: 'Annuler la dernière action (Ctrl+Z)',
    validationCannotMove: 'Cannot move a field into a child of itself',
    autoType: 'Champe de type "auto". ' + 'Ce type de champ est automatiquement déterminé en fonction de la valeur ' + 'et peut être de type "chaîne", "nombre", "booléen" ou null.',
    objectType: 'Champ de type "objet". ' + 'Un objet contient un ensemble non ordonné de paires clé/valeur.',
    arrayType: 'Champ de type "liste". ' + 'Une liste contient une collection ordonnée de valeurs.',
    stringType: 'Champ de type "chaîne". ' + 'Ce type de champ n\'est pas déterminé en fonction de la valeur, ' + 'mais retourne systématiquement une chaîne de caractères.',
    modeEditorTitle: 'Changer mode d\'édition',
    modeCodeText: 'Code',
    modeCodeTitle: 'Activer surlignage code',
    modeFormText: 'Formulaire',
    modeFormTitle: 'Activer formulaire',
    modeTextText: 'Texte',
    modeTextTitle: 'Activer éditeur texte',
    modeTreeText: 'Arbre',
    modeTreeTitle: 'Activer éditeur arbre',
    modeViewText: 'Lecture seule',
    modeViewTitle: 'Activer vue arbre',
    modePreviewText: 'Prévisualisation',
    modePreviewTitle: 'Activer mode prévisualiser',
    examples: 'Exemples',
    "default": 'Défaut',
    containsInvalidProperties: 'Contient des propriétés non valides',
    containsInvalidItems: 'Contient des éléments invalides'
  },
  de: {
    array: 'Auflistung',
    auto: 'Auto',
    appendText: 'anhängen',
    appendTitle: 'Fügen Sie nach diesem Feld ein neues Feld mit dem Typ \'auto\' ein (Strg+Umschalt+Ein)',
    appendSubmenuTitle: 'Wählen Sie den Typ des neuen Feldes',
    appendTitleAuto: 'Ein neues Feld vom Typ \'auto\' hinzufügen (Strg+Umschalt+Ein)',
    ascending: 'Aufsteigend',
    ascendingTitle: 'Sortieren Sie die Elemente dieses ${type} in aufsteigender Reihenfolge',
    actionsMenu: 'Klicken Sie zum Öffnen des Aktionsmenüs (Strg+M)',
    cannotParseFieldError: 'Feld kann nicht in JSON geparst werden',
    cannotParseValueError: 'Wert kann nicht in JSON geparst werden',
    collapseAll: 'Alle Felder zuklappen',
    compactTitle: 'JSON-Daten verdichten, alle Leerzeichen entfernen (Strg+Umschalt+\\)',
    descending: 'Absteigend',
    descendingTitle: 'Sortieren Sie die Elemente dieses ${type} in absteigender Reihenfolge',
    drag: 'Ziehen, um dieses Feld zu verschieben (Alt+Umschalt+Pfeile)',
    duplicateKey: 'Doppelter Schlüssel',
    duplicateText: 'Duplikat',
    duplicateTitle: 'Ausgewählte Felder duplizieren (Strg+D)',
    duplicateField: 'Dieses Feld duplizieren (Strg+D)',
    duplicateFieldError: 'Doppelter Feldname',
    empty: 'leer',
    expandAll: 'Alle Felder anzeigen',
    expandTitle: 'Klicken Sie, um dieses Feld zu erweitern/zu kollabieren (Strg+E). \nStrg+Klicken Sie, um dieses Feld einschließlich aller Elemente zu erweitern/zu kollabieren.',
    formatTitle: 'JSON-Daten mit korrekter Einrückung und Zeilenvorschüben formatieren (Strg+\\)',
    insert: 'einfügen',
    insertTitle: 'Fügen Sie vor diesem Feld ein neues Feld mit dem Typ \'auto\' ein (Strg+Einfg)',
    insertSub: 'Wählen Sie den Typ des neuen Feldes',
    object: 'Objekt',
    ok: 'Ok',
    redo: 'Wiederholen (Strg+Umschalt+Z)',
    removeText: 'entfernen',
    removeTitle: 'Ausgewählte Felder entfernen (Strg+Entf)',
    removeField: 'Dieses Feld entfernen (Strg+Entf)',
    repairTitle: 'JSON reparieren: Anführungszeichen und Escape-Zeichen korrigieren, Kommentare und JSONP-Notation entfernen, JavaScript-Objekte in JSON umwandeln.',
    searchTitle: 'Suchfelder und Werte',
    searchNextResultTitle: 'Nächstes Ergebnis (Enter)',
    searchPreviousResultTitle: 'Vorheriges Ergebnis (Umschalt + Eingabe)',
    selectNode: 'Wählen Sie einen Knoten aus...',
    showAll: 'alle anzeigen',
    showMore: 'mehr anzeigen',
    showMoreStatus: 'Anzeige von ${visibleChilds} von ${totalChilds}-Elementen.',
    sort: 'Sortieren',
    sortTitle: 'Sortieren Sie die Elemente dieses ${type}',
    sortTitleShort: 'Inhalt sortieren',
    sortFieldLabel: 'Feld:',
    sortDirectionLabel: 'Richtung:',
    sortFieldTitle: 'Wählen Sie das verschachtelte Feld, nach dem das Array oder Objekt sortiert werden soll.',
    sortAscending: 'Aufsteigend',
    sortAscendingTitle: 'Sortieren Sie das ausgewählte Feld in aufsteigender Reihenfolge',
    sortDescending: 'Absteigend',
    sortDescendingTitle: 'Sortieren Sie das ausgewählte Feld in absteigender Reihenfolge',
    string: 'Zeichenfolge',
    transform: 'Verwandeln',
    transformTitle: 'Die Elemente dieses ${type} filtern, sortieren oder transformieren',
    transformTitleShort: 'Inhalte filtern, sortieren oder transformieren',
    extract: 'Auszug',
    extractTitle: 'Extrahieren Sie diesen ${type}',
    transformQueryTitle: 'Eine JMESPath-Abfrage eingeben',
    transformWizardLabel: 'Zauberer',
    transformWizardFilter: 'Filter',
    transformWizardSortBy: 'Sortieren nach',
    transformWizardSelectFields: 'Felder auswählen',
    transformQueryLabel: 'Anfrage',
    transformPreviewLabel: 'Vorschau',
    type: 'Geben Sie  ein.',
    typeTitle: 'Ändern Sie den Typ dieses Feldes',
    openUrl: 'Strg+Klicken oder Strg+Eingabe, um die URL in einem neuen Fenster zu öffnen',
    undo: 'Letzte Aktion rückgängig machen (Strg+Z)',
    validationCannotMove: 'Kann ein Feld nicht in ein Kind seiner selbst verschieben',
    autoType: 'Feldtyp "auto". Der Feldtyp wird automatisch aus dem Wert bestimmt und kann ein String, eine Zahl, boolesch oder null sein.',
    objectType: 'Feldtyp "Objekt". Ein Objekt enthält eine ungeordnete Menge von Schlüssel/Wert-Paaren.',
    arrayType: 'Feldtyp "Array". Ein Array enthält eine geordnete Sammlung von Werten.',
    stringType: 'Feldtyp "Zeichenfolge". Der Feldtyp wird nicht aus dem Wert bestimmt, sondern immer als Zeichenfolge zurückgegeben.',
    modeEditorTitle: 'Editor-Modus umschalten',
    modeCodeText: 'Code',
    modeCodeTitle: 'Umschalten auf Code-Highlighter',
    modeFormText: 'Formular',
    modeFormTitle: 'Zum Formular-Editor wechseln',
    modeTextText: 'Text',
    modeTextTitle: 'Zum Editor für einfachen Text wechseln',
    modeTreeText: 'Baum',
    modeTreeTitle: 'Zum Baum-Editor wechseln',
    modeViewText: 'Siehe',
    modeViewTitle: 'Zur Baumansicht wechseln',
    modePreviewText: 'Vorschau',
    modePreviewTitle: 'In den Vorschau-Modus wechseln',
    examples: 'Beispiele',
    "default": 'Standardmäßig',
    containsInvalidProperties: 'Enthält ungültige Eigenschaften',
    containsInvalidItems: 'Enthält ungültige Elemente'
  },
  ru: {
    array: 'Массив',
    auto: 'Авто',
    appendText: 'Добавить',
    appendTitle: 'Добавить новое поле с типом \'авто\' после этого поля (Ctrl+Shift+Ins)',
    appendSubmenuTitle: 'Выбрать тип поля для добавления',
    appendTitleAuto: 'Добавить новое поле с типом \'авто\' (Ctrl+Shift+Ins)',
    ascending: 'По возрастанию',
    ascendingTitle: 'Сортировать ${type} по возрастанию',
    actionsMenu: 'Нажмите для открытия меню действий (Ctrl+M)',
    cannotParseFieldError: 'Невозможно преобразовать поле в JSON',
    cannotParseValueError: 'Невозможно преобразовать значение в JSON',
    collapseAll: 'Свернуть все',
    compactTitle: 'Минификация JSON (Ctrl+Shift+I)',
    descending: 'По убыванию',
    descendingTitle: 'Сортировать ${type} по убыванию',
    drag: 'Потяните для перемещения этого поля (Alt+Shift+Arrows)',
    duplicateKey: 'повторяющийся ключ',
    duplicateText: 'Дублировать',
    duplicateTitle: 'Дублирование полей (Ctrl+D)',
    duplicateField: 'Дублировать поле (Ctrl+D)',
    duplicateFieldError: 'Дублирование названия поля',
    empty: 'пустой',
    expandAll: 'Развернуть все',
    expandTitle: 'Нажмите для раскрытия/скрытия поля (Ctrl+E)\n' + 'или Ctrl+Click для раскрытия/скрытия всех потомков.',
    formatTitle: 'Форматирование JSON (Ctrl+I)',
    insert: 'Вставить',
    insertTitle: 'Вставить новое поле с типом \'авто\' перед этим полем (Ctrl+Ins)',
    insertSub: 'Выбрать тип поля для вставки',
    object: 'Объект',
    ok: 'ОК',
    redo: 'Повторить (Ctrl+Shift+Z)',
    removeText: 'Удалить',
    removeTitle: 'Удалить выбранные поля (Ctrl+Del)',
    removeField: 'Удалить поле (Ctrl+Del)',
    repairTitle: 'Восстановите JSON: исправьте кавычки и escape-символы, удалите комментарии и нотацию JSONP, модифицируйте объекты JavaScript в JSON.',
    searchTitle: 'Поиск',
    searchNextResultTitle: 'Следующий результат (Enter)',
    searchPreviousResultTitle: 'Предыдущий результат (Shift + Enter)',
    selectNode: 'Выбор узла...',
    showAll: 'показать все',
    showMore: 'больше',
    showMoreStatus: '${visibleChilds} из ${totalChilds}',
    sort: 'Сортировка',
    sortTitle: 'Сортировка потомков типа ${type}',
    sortTitleShort: 'Сортировка содержимого',
    sortFieldLabel: 'Поле:',
    sortDirectionLabel: 'Направление:',
    sortFieldTitle: 'Выберите поле для сортировки массива или объекта',
    sortAscending: 'По возрастанию',
    sortAscendingTitle: 'Сортировка выбранного поря по возрастанию',
    sortDescending: 'По убыванию',
    sortDescendingTitle: 'Сортировка выбранного поря по убыванию',
    string: 'Строка',
    transform: 'Модификация',
    transformTitle: 'Фильтрация, сортировка или модификация данных типа ${type}',
    transformTitleShort: 'Фильтрация, сортировка или модификация данных',
    extract: 'Извлечение',
    extractTitle: 'Извлечь тип ${type}',
    transformQueryTitle: 'Введите JMESpath запрос',
    transformWizardLabel: 'Мастер',
    transformWizardFilter: 'Фильтр',
    transformWizardSortBy: 'Сортировка',
    transformWizardSelectFields: 'Поля',
    transformQueryLabel: 'Запрос',
    transformPreviewLabel: 'Просмотр',
    type: 'Тип',
    typeTitle: 'Изменить тип этого поля',
    openUrl: 'Ctrl+Click или Ctrl+Enter для открытия url в новом окне',
    undo: 'Отменить (Ctrl+Z)',
    validationCannotMove: 'Поле не может быть перемещено в потомка',
    autoType: 'Тип поля автоматически определяется по значению ' + 'и может быть строкой, числом, логическим значением или null.',
    objectType: 'Объект содержит неупорядоченный набор пар ключ/значение.',
    arrayType: 'Массив содержит упорядоченный набор значений.',
    stringType: 'Тип поля не определяется из значения, ' + 'но всегда возвращается как строка.',
    modeEditorTitle: 'Переключение режима редактора',
    modeCodeText: 'Код',
    modeCodeTitle: 'Переключить в режим редактора кода',
    modeFormText: 'Форма',
    modeFormTitle: 'Переключить в режим формы',
    modeTextText: 'Текст',
    modeTextTitle: 'Переключить в режим редактора текста',
    modeTreeText: 'Дерево',
    modeTreeTitle: 'Переключить в режим редактора дерева',
    modeViewText: 'Просмотр дерева',
    modeViewTitle: 'Переключить в режим просмотра дерева',
    modePreviewText: 'Просмотр',
    modePreviewTitle: 'Переключить в режим просмотра',
    examples: 'Примеры',
    "default": 'По умолчанию',
    containsInvalidProperties: 'Содержит недопустимые свойства',
    containsInvalidItems: 'Содержит недопустимые элементы'
  },
  ko: {
    array: '배열',
    auto: '자동',
    appendText: '추가',
    appendTitle: '선택한 요소 아래에 "자동" 요소를 추가합니다. (Ctrl + Shift + Ins)',
    appendSubmenuTitle: '추가할 요소의 유형을 선택해주세요.',
    appendTitleAuto: '"자동" 요소를 추가합니다. (Ctrl + Shift + Ins)',
    ascending: '오름차순',
    ascendingTitle: '선택한 ${type}의 하위 요소를 오름차순 정렬합니다.',
    actionsMenu: '메뉴 열기 (Ctrl + M)',
    cannotParseFieldError: 'JSON의 요소를 해석할 수 없습니다.',
    cannotParseValueError: 'JSON의 값을 해석할 수 없습니다.',
    collapseAll: '모두 접기',
    compactTitle: '모든 공백을 제거하여 JSON 데이터를 작게 만듭니다. (Ctrl + Shift + I)',
    descending: '내림차순',
    descendingTitle: '선택한 ${type}의 하위 요소를 내림차순으로 정렬',
    drag: '드래그하여 요소를 이동합니다. (Alt + Shift + Arrows)',
    duplicateKey: '복제키',
    duplicateText: '복제',
    duplicateTitle: '선택한 요소를 복제합니다. (Ctrl + D)',
    duplicateField: '선택한 요소를 복제합니다. (Ctrl + D)',
    duplicateFieldError: '요소 이름이 중복되었습니다.',
    empty: '비어있음',
    expandAll: '모두 열기',
    expandTitle: '클릭하여 요소를 열거나 닫습니다. (Ctrl + E) \nCtrl + Click으로 모든 하위 요소를 열거나 닫습니다.',
    formatTitle: '적절한 들여쓰기 및 줄바꿈으로 JSON 데이터를 정형화합니다. (Ctrl + I)',
    insert: '삽입',
    insertTitle: '선택한 요소 위에 새요소를 삽입합니다. (Ctrl + Ins)',
    insertSub: '삽입할 요소의 유형을 선택해주세요.',
    object: '객체',
    ok: '확인',
    redo: '다시 실행 (Ctrl + Shift + Z)',
    removeText: '삭제',
    removeTitle: '선택한 요소를 삭제합니다. (Ctrl + Del)',
    removeField: '선택한 요소를 삭제합니다. (Ctrl + Del)',
    repairTitle: 'JSON 교정: JSON 내의 주석과 JSONP 표기법을 지우고 따옴표와 이스케이프 문자를 수정합니다.',
    searchTitle: '요소 또는 값 찾기',
    searchNextResultTitle: '다음으로 찾기 (Enter)',
    searchPreviousResultTitle: '이전으로 찾기 (Shift + Enter)',
    selectNode: '요소를 선택해주세요...',
    showAll: '모두보기',
    showMore: '더보기',
    showMoreStatus: '${totalChilds} 개의 항목 중 ${visibleChilds} 개를 표시합니다.',
    sort: '정렬',
    sortTitle: '선택한 ${type}의 하위 요소를 정렬합니다.',
    sortTitleShort: '정렬',
    sortFieldLabel: '요소:',
    sortDirectionLabel: '순서:',
    sortFieldTitle: '배열이나 객체를 정렬하는 요소를 선택해주세요.',
    sortAscending: '오름차순',
    sortAscendingTitle: '선택한 요소를 오름차순으로 정렬합니다.',
    sortDescending: '내림차순',
    sortDescendingTitle: '선택한 요소를 내림차순으로 정렬합니다.',
    string: '문자',
    transform: '변환',
    transformTitle: '선택한 ${type}의 하위 요소를 필터하거나 정렬 또는 변환합니다.',
    transformTitleShort: '내용을 필터하거나 정렬 또는 변환합니다.',
    extract: '추출',
    extractTitle: '선택한 ${type}의 값을 최상위에 위치시킵니다.',
    transformQueryTitle: 'JMESPath 쿼리를 입력해주세요.',
    transformWizardLabel: '마법사',
    transformWizardFilter: '필터',
    transformWizardSortBy: '정렬',
    transformWizardSelectFields: '요소를 선택해주세요.',
    transformQueryLabel: '쿼리',
    transformPreviewLabel: '미리보기',
    type: '유형',
    typeTitle: '선택한 요소의 유형을 변경합니다.',
    openUrl: 'Ctrl + Click 또는 Ctrl + Enter로 새 창에서 URL 열기',
    undo: '실행 취소 (Ctrl + Z)',
    validationCannotMove: '하위 요소로 이동할 수 없습니다.',
    autoType: '자동: 요소의 형식이 값의 유형으로 결정됩니다. 문자, 숫자, 부울, 또는 null만 허용됩니다.',
    objectType: '객체: 순서대로 나열되지 않은 이름/값 쌍으로 이루어진 집합입니다.',
    arrayType: '배열: 순서대로 나열된 값의 집합입니다.',
    stringType: '문자: 요소의 유형이 값에서 결정되지 않지만 항상 문자로 반환됩니다.',
    modeEditorTitle: '편집기 유형 변경',
    modeCodeText: '코드',
    modeCodeTitle: '형식 교정을 도와주는 기능이 포함된 문자 편집기',
    modeFormText: '입력 양식',
    modeFormTitle: '정해진 요소에 값을 입력하는 편집기',
    modeTextText: '문자',
    modeTextTitle: '단순 문자 편집기',
    modeTreeText: '트리',
    modeTreeTitle: '트리 구조로 표시되는 편집기',
    modeViewText: '보기',
    modeViewTitle: '읽기전용 트리 구조로 JSON을 표시',
    modePreviewText: '미리보기',
    modePreviewTitle: '읽기전용 문자로 JSON을 표시',
    examples: '예제',
    "default": '기본값',
    containsInvalidProperties: '잘못된 속성이 포함되어 있습니다.',
    containsInvalidItems: '잘못된 항목이 포함되어 있습니다'
  }
};
var _locales = Object.keys(_defs);
var _defaultLang = 'en';
var userLang = typeof navigator !== 'undefined' ? navigator.language || navigator.userLanguage : undefined;
var _lang = _locales.find(function (l) {
  return l === userLang;
}) || _defaultLang;
function setLanguage(lang) {
  if (!lang) {
    return;
  }
  var langFound = _locales.find(function (l) {
    return l === lang;
  });
  if (langFound) {
    _lang = langFound;
  } else {
    console.error('Language not found');
  }
}
function setLanguages(languages) {
  if (!languages) {
    return;
  }
  var _loop = function _loop(language) {
    var langFound = _locales.find(function (l) {
      return l === language;
    });
    if (!langFound) {
      _locales.push(language);
    }
    _defs[language] = Object.assign({}, _defs[_defaultLang], _defs[language], languages[language]);
  };
  for (var language in languages) {
    _loop(language);
  }
}
function translate(key, data, lang) {
  if (!lang) {
    lang = _lang;
  }
  var text = _defs[lang][key] || _defs[_defaultLang][key] || key;
  if (data) {
    for (var dataKey in data) {
      text = text.replace('${' + dataKey + '}', data[dataKey]);
    }
  }
  return text;
}

/***/ }),

/***/ 359:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   V: function() { return /* binding */ createQuery; },
/* harmony export */   e: function() { return /* binding */ executeQuery; }
/* harmony export */ });
/* harmony import */ var jmespath__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(151);
/* harmony import */ var jmespath__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jmespath__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(237);



/**
 * Build a JMESPath query based on query options coming from the wizard
 * @param {JSON} json   The JSON document for which to build the query.
 *                      Used for context information like determining
 *                      the type of values (string or number)
 * @param {QueryOptions} queryOptions
 * @return {string} Returns a query (as string)
 */
function createQuery(json, queryOptions) {
  var sort = queryOptions.sort,
    filter = queryOptions.filter,
    projection = queryOptions.projection;
  var query = '';
  if (filter) {
    var examplePath = filter.field !== '@' ? ['0'].concat((0,_util__WEBPACK_IMPORTED_MODULE_1__.parsePath)('.' + filter.field)) : ['0'];
    var exampleValue = (0,_util__WEBPACK_IMPORTED_MODULE_1__.get)(json, examplePath);
    var value1 = typeof exampleValue === 'string' ? filter.value : (0,_util__WEBPACK_IMPORTED_MODULE_1__.parseString)(filter.value);
    query += '[? ' + filter.field + ' ' + filter.relation + ' ' + '`' + JSON.stringify(value1) + '`' + ']';
  } else {
    query += Array.isArray(json) ? '[*]' : '@';
  }
  if (sort) {
    if (sort.direction === 'desc') {
      query += ' | reverse(sort_by(@, &' + sort.field + '))';
    } else {
      query += ' | sort_by(@, &' + sort.field + ')';
    }
  }
  if (projection) {
    if (query[query.length - 1] !== ']') {
      query += ' | [*]';
    }
    if (projection.fields.length === 1) {
      query += '.' + projection.fields[0];
    } else if (projection.fields.length > 1) {
      query += '.{' + projection.fields.map(function (value) {
        var parts = value.split('.');
        var last = parts[parts.length - 1];
        return last + ': ' + value;
      }).join(', ') + '}';
    } else {// values.length === 0
      // ignore
    }
  }
  return query;
}

/**
 * Execute a JMESPath query
 * @param {JSON} json
 * @param {string} query
 * @return {JSON} Returns the transformed JSON
 */
function executeQuery(json, query) {
  return jmespath__WEBPACK_IMPORTED_MODULE_0___default().search(json, query);
}

/***/ }),

/***/ 81:
/***/ (function() {

if (typeof Element !== 'undefined') {
  // Polyfill for array remove
  (function () {
    function polyfill(item) {
      if (typeof item !== 'undefined') {
        if ('remove' in item) {
          return;
        }
        Object.defineProperty(item, 'remove', {
          configurable: true,
          enumerable: true,
          writable: true,
          value: function remove() {
            if (this.parentNode !== undefined) {
              this.parentNode.removeChild(this);
            }
          }
        });
      }
    }
    if (typeof window.Element !== 'undefined') {
      polyfill(window.Element.prototype);
    }
    if (typeof window.CharacterData !== 'undefined') {
      polyfill(window.CharacterData.prototype);
    }
    if (typeof window.DocumentType !== 'undefined') {
      polyfill(window.DocumentType.prototype);
    }
  })();
}

// simple polyfill for Array.findIndex
if (!Array.prototype.findIndex) {
  // eslint-disable-next-line no-extend-native
  Object.defineProperty(Array.prototype, 'findIndex', {
    value: function value(predicate) {
      for (var i = 0; i < this.length; i++) {
        var element = this[i];
        if (predicate.call(this, element, i, this)) {
          return i;
        }
      }
      return -1;
    },
    configurable: true,
    writable: true
  });
}

// Polyfill for Array.find
if (!Array.prototype.find) {
  // eslint-disable-next-line no-extend-native
  Object.defineProperty(Array.prototype, 'find', {
    value: function value(predicate) {
      var i = this.findIndex(predicate);
      return this[i];
    },
    configurable: true,
    writable: true
  });
}

// Polyfill for String.trim
if (!String.prototype.trim) {
  // eslint-disable-next-line no-extend-native
  String.prototype.trim = function () {
    return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
  };
}

/***/ }),

/***/ 483:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  previewModeMixins: function() { return /* binding */ previewModeMixins; }
});

// EXTERNAL MODULE: ./node_modules/jsonrepair/lib/esm/regular/jsonrepair.js + 2 modules
var jsonrepair = __webpack_require__(857);
// EXTERNAL MODULE: ./src/js/constants.js
var constants = __webpack_require__(660);
// EXTERNAL MODULE: ./src/js/ErrorTable.js
var ErrorTable = __webpack_require__(115);
// EXTERNAL MODULE: ./src/js/FocusTracker.js
var FocusTracker = __webpack_require__(877);
;// ./src/js/History.js
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/**
 * Keep track on any history, be able
 * @param {function} onChange
 * @param {function} calculateItemSize
 * @param {number} limit    Maximum size of all items in history
 * @constructor
 */
var History = /*#__PURE__*/function () {
  function History(onChange, calculateItemSize, limit) {
    _classCallCheck(this, History);
    this.onChange = onChange;
    this.calculateItemSize = calculateItemSize || function () {
      return 1;
    };
    this.limit = limit;
    this.items = [];
    this.index = -1;
  }
  return _createClass(History, [{
    key: "add",
    value: function add(item) {
      // limit number of items in history so that the total size doesn't
      // always keep at least one item in memory
      while (this._calculateHistorySize() > this.limit && this.items.length > 1) {
        this.items.shift();
        this.index--;
      }

      // cleanup any redo action that are not valid anymore
      this.items = this.items.slice(0, this.index + 1);
      this.items.push(item);
      this.index++;
      this.onChange();
    }
  }, {
    key: "_calculateHistorySize",
    value: function _calculateHistorySize() {
      var calculateItemSize = this.calculateItemSize;
      var totalSize = 0;
      this.items.forEach(function (item) {
        totalSize += calculateItemSize(item);
      });
      return totalSize;
    }
  }, {
    key: "undo",
    value: function undo() {
      if (!this.canUndo()) {
        return;
      }
      this.index--;
      this.onChange();
      return this.items[this.index];
    }
  }, {
    key: "redo",
    value: function redo() {
      if (!this.canRedo()) {
        return;
      }
      this.index++;
      this.onChange();
      return this.items[this.index];
    }
  }, {
    key: "canUndo",
    value: function canUndo() {
      return this.index > 0;
    }
  }, {
    key: "canRedo",
    value: function canRedo() {
      return this.index < this.items.length - 1;
    }
  }, {
    key: "clear",
    value: function clear() {
      this.items = [];
      this.index = -1;
      this.onChange();
    }
  }]);
}();
// EXTERNAL MODULE: ./src/js/i18n.js
var i18n = __webpack_require__(57);
// EXTERNAL MODULE: ./src/js/jmespathQuery.js
var jmespathQuery = __webpack_require__(359);
// EXTERNAL MODULE: ./src/js/ModeSwitcher.js
var ModeSwitcher = __webpack_require__(389);
// EXTERNAL MODULE: ./src/js/showSortModal.js
var showSortModal = __webpack_require__(915);
// EXTERNAL MODULE: ./src/js/showTransformModal.js + 1 modules
var showTransformModal = __webpack_require__(609);
// EXTERNAL MODULE: ./src/js/textmode.js + 2 modules
var textmode = __webpack_require__(948);
// EXTERNAL MODULE: ./src/js/util.js
var util = __webpack_require__(237);
;// ./src/js/previewmode.js














var previewmode_textmode = textmode.textModeMixins[0].mixin;

// create a mixin with the functions for text mode
var previewmode = {};

/**
 * Create a JSON document preview, suitable for processing of large documents
 * @param {Element} container
 * @param {Object} [options]   Object with options. See docs for details.
 * @private
 */
previewmode.create = function (container) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  if (typeof options.statusBar === 'undefined') {
    options.statusBar = true;
  }

  // setting default for previewmode
  options.mainMenuBar = options.mainMenuBar !== false;
  options.enableSort = options.enableSort !== false;
  options.enableTransform = options.enableTransform !== false;
  options.createQuery = options.createQuery || jmespathQuery/* createQuery */.V;
  options.executeQuery = options.executeQuery || jmespathQuery/* executeQuery */.e;
  this.options = options;

  // indentation
  if (typeof options.indentation === 'number') {
    this.indentation = Number(options.indentation);
  } else {
    this.indentation = 2; // number of spaces
  }

  // language
  (0,i18n/* setLanguages */.AI)(this.options.languages);
  (0,i18n/* setLanguage */.xC)(this.options.language);

  // determine mode
  this.mode = 'preview';
  var me = this;
  this.container = container;
  this.dom = {};
  this.json = undefined;
  this.text = '';

  // TODO: JSON Schema support

  // create a debounced validate function
  this._debouncedValidate = (0,util.debounce)(this.validate.bind(this), this.DEBOUNCE_INTERVAL);
  this.width = container.clientWidth;
  this.height = container.clientHeight;
  this.frame = document.createElement('div');
  this.frame.className = 'jsoneditor jsoneditor-mode-preview';
  this.frame.onclick = function (event) {
    // prevent default submit action when the editor is located inside a form
    event.preventDefault();
  };

  // setting the FocusTracker on 'this.frame' to track the editor's focus event
  var focusTrackerConfig = {
    target: this.frame,
    onFocus: this.options.onFocus || null,
    onBlur: this.options.onBlur || null
  };
  this.frameFocusTracker = new FocusTracker/* FocusTracker */.$(focusTrackerConfig);
  this.content = document.createElement('div');
  this.content.className = 'jsoneditor-outer';
  this.dom.busy = document.createElement('div');
  this.dom.busy.className = 'jsoneditor-busy';
  this.dom.busyContent = document.createElement('span');
  this.dom.busyContent.textContent = 'busy...';
  this.dom.busy.appendChild(this.dom.busyContent);
  this.content.appendChild(this.dom.busy);
  this.dom.previewContent = document.createElement('pre');
  this.dom.previewContent.className = 'jsoneditor-preview';
  this.dom.previewText = document.createTextNode('');
  this.dom.previewContent.appendChild(this.dom.previewText);
  this.content.appendChild(this.dom.previewContent);
  if (this.options.mainMenuBar) {
    (0,util.addClassName)(this.content, 'has-main-menu-bar');

    // create menu
    this.menu = document.createElement('div');
    this.menu.className = 'jsoneditor-menu';
    this.frame.appendChild(this.menu);

    // create format button
    var buttonFormat = document.createElement('button');
    buttonFormat.type = 'button';
    buttonFormat.className = 'jsoneditor-format';
    buttonFormat.title = (0,i18n/* translate */.Tl)('formatTitle');
    this.menu.appendChild(buttonFormat);
    buttonFormat.onclick = function handleFormat() {
      me.executeWithBusyMessage(function () {
        try {
          me.format();
        } catch (err) {
          me._onError(err);
        }
      }, 'formatting...');
    };

    // create compact button
    var buttonCompact = document.createElement('button');
    buttonCompact.type = 'button';
    buttonCompact.className = 'jsoneditor-compact';
    buttonCompact.title = (0,i18n/* translate */.Tl)('compactTitle');
    this.menu.appendChild(buttonCompact);
    buttonCompact.onclick = function handleCompact() {
      me.executeWithBusyMessage(function () {
        try {
          me.compact();
        } catch (err) {
          me._onError(err);
        }
      }, 'compacting...');
    };

    // create sort button
    if (this.options.enableSort) {
      var _sort = document.createElement('button');
      _sort.type = 'button';
      _sort.className = 'jsoneditor-sort';
      _sort.title = (0,i18n/* translate */.Tl)('sortTitleShort');
      _sort.onclick = function () {
        me._showSortModal();
      };
      this.menu.appendChild(_sort);
    }

    // create transform button
    if (this.options.enableTransform) {
      var transform = document.createElement('button');
      transform.type = 'button';
      transform.title = (0,i18n/* translate */.Tl)('transformTitleShort');
      transform.className = 'jsoneditor-transform';
      transform.onclick = function () {
        me._showTransformModal();
      };
      this.dom.transform = transform;
      this.menu.appendChild(transform);
    }

    // create repair button
    var buttonRepair = document.createElement('button');
    buttonRepair.type = 'button';
    buttonRepair.className = 'jsoneditor-repair';
    buttonRepair.title = (0,i18n/* translate */.Tl)('repairTitle');
    this.menu.appendChild(buttonRepair);
    buttonRepair.onclick = function () {
      if (me.json === undefined) {
        // only repair if we don't have valid JSON
        me.executeWithBusyMessage(function () {
          try {
            me.repair();
          } catch (err) {
            me._onError(err);
          }
        }, 'repairing...');
      }
    };

    // create history and undo/redo buttons
    if (this.options.history !== false) {
      // default option value is true
      var onHistoryChange = function onHistoryChange() {
        me.dom.undo.disabled = !me.history.canUndo();
        me.dom.redo.disabled = !me.history.canRedo();
      };
      var calculateItemSize = function calculateItemSize(item) {
        return (
          // times two to account for the json object
          item.text.length * 2
        );
      };
      this.history = new History(onHistoryChange, calculateItemSize, constants/* PREVIEW_HISTORY_LIMIT */.SC);

      // create undo button
      var undo = document.createElement('button');
      undo.type = 'button';
      undo.className = 'jsoneditor-undo jsoneditor-separator';
      undo.title = (0,i18n/* translate */.Tl)('undo');
      undo.onclick = function () {
        var action = me.history.undo();
        if (action) {
          me._applyHistory(action);
        }
      };
      this.menu.appendChild(undo);
      this.dom.undo = undo;

      // create redo button
      var redo = document.createElement('button');
      redo.type = 'button';
      redo.className = 'jsoneditor-redo';
      redo.title = (0,i18n/* translate */.Tl)('redo');
      redo.onclick = function () {
        var action = me.history.redo();
        if (action) {
          me._applyHistory(action);
        }
      };
      this.menu.appendChild(redo);
      this.dom.redo = redo;

      // force enabling/disabling the undo/redo button
      this.history.onChange();
    }

    // create mode box
    if (this.options && this.options.modes && this.options.modes.length) {
      this.modeSwitcher = new ModeSwitcher/* ModeSwitcher */.n(this.menu, this.options.modes, this.options.mode, function onSwitch(mode) {
        // switch mode and restore focus
        try {
          me.setMode(mode);
          me.modeSwitcher.focus();
        } catch (err) {
          me._onError(err);
        }
      });
    }
  }
  var errorTableVisible = Array.isArray(this.options.showErrorTable) ? this.options.showErrorTable.includes(this.mode) : this.options.showErrorTable === true;
  this.errorTable = new ErrorTable/* ErrorTable */.N({
    errorTableVisible: errorTableVisible,
    onToggleVisibility: function onToggleVisibility() {
      me.validate();
    },
    onFocusLine: null,
    onChangeHeight: function onChangeHeight(height) {
      // TODO: change CSS to using flex box, remove setting height using JavaScript
      var statusBarHeight = me.dom.statusBar ? me.dom.statusBar.clientHeight : 0;
      var totalHeight = height + statusBarHeight + 1;
      me.content.style.marginBottom = -totalHeight + 'px';
      me.content.style.paddingBottom = totalHeight + 'px';
    }
  });
  this.frame.appendChild(this.content);
  this.frame.appendChild(this.errorTable.getErrorTable());
  this.container.appendChild(this.frame);
  if (options.statusBar) {
    (0,util.addClassName)(this.content, 'has-status-bar');
    var statusBar = document.createElement('div');
    this.dom.statusBar = statusBar;
    statusBar.className = 'jsoneditor-statusbar';
    this.frame.appendChild(statusBar);
    this.dom.fileSizeInfo = document.createElement('span');
    this.dom.fileSizeInfo.className = 'jsoneditor-size-info';
    this.dom.fileSizeInfo.innerText = '';
    statusBar.appendChild(this.dom.fileSizeInfo);
    this.dom.arrayInfo = document.createElement('span');
    this.dom.arrayInfo.className = 'jsoneditor-size-info';
    this.dom.arrayInfo.innerText = '';
    statusBar.appendChild(this.dom.arrayInfo);
    statusBar.appendChild(this.errorTable.getErrorCounter());
    statusBar.appendChild(this.errorTable.getWarningIcon());
    statusBar.appendChild(this.errorTable.getErrorIcon());
  }
  this._renderPreview();
  this.setSchema(this.options.schema, this.options.schemaRefs);
};
previewmode._renderPreview = function () {
  var text = this.getText();
  this.dom.previewText.nodeValue = (0,util.limitCharacters)(text, constants/* MAX_PREVIEW_CHARACTERS */.hJ);
  if (this.dom.fileSizeInfo) {
    this.dom.fileSizeInfo.innerText = 'Size: ' + (0,util.formatSize)(text.length);
  }
  if (this.dom.arrayInfo) {
    if (Array.isArray(this.json)) {
      this.dom.arrayInfo.innerText = 'Array: ' + this.json.length + ' items';
    } else {
      this.dom.arrayInfo.innerText = '';
    }
  }
};

/**
 * Handle a change:
 * - Validate JSON schema
 * - Send a callback to the onChange listener if provided
 * @private
 */
previewmode._onChange = function () {
  // validate JSON schema (if configured)
  this._debouncedValidate();

  // trigger the onChange callback
  if (this.options.onChange) {
    try {
      this.options.onChange();
    } catch (err) {
      console.error('Error in onChange callback: ', err);
    }
  }

  // trigger the onChangeJSON callback
  if (this.options.onChangeJSON) {
    try {
      this.options.onChangeJSON(this.get());
    } catch (err) {
      console.error('Error in onChangeJSON callback: ', err);
    }
  }

  // trigger the onChangeText callback
  if (this.options.onChangeText) {
    try {
      this.options.onChangeText(this.getText());
    } catch (err) {
      console.error('Error in onChangeText callback: ', err);
    }
  }
};

/**
 * Open a sort modal
 * @private
 */
previewmode._showSortModal = function () {
  var me = this;
  function onSort(json, sortedBy) {
    if (Array.isArray(json)) {
      var sortedArray = (0,util.sort)(json, sortedBy.path, sortedBy.direction);
      me.sortedBy = sortedBy;
      me._setAndFireOnChange(sortedArray);
    }
    if ((0,util.isObject)(json)) {
      var sortedObject = (0,util.sortObjectKeys)(json, sortedBy.direction);
      me.sortedBy = sortedBy;
      me._setAndFireOnChange(sortedObject);
    }
  }
  this.executeWithBusyMessage(function () {
    var container = me.options.modalAnchor || constants/* DEFAULT_MODAL_ANCHOR */.ai;
    var json = me.get();
    me._renderPreview(); // update array count

    (0,showSortModal.showSortModal)(container, json, function (sortedBy) {
      me.executeWithBusyMessage(function () {
        onSort(json, sortedBy);
      }, 'sorting...');
    }, me.sortedBy);
  }, 'parsing...');
};

/**
 * Open a transform modal
 * @private
 */
previewmode._showTransformModal = function () {
  var _this = this;
  this.executeWithBusyMessage(function () {
    var _this$options = _this.options,
      createQuery = _this$options.createQuery,
      executeQuery = _this$options.executeQuery,
      modalAnchor = _this$options.modalAnchor,
      queryDescription = _this$options.queryDescription;
    var json = _this.get();
    _this._renderPreview(); // update array count

    (0,showTransformModal.showTransformModal)({
      container: modalAnchor || constants/* DEFAULT_MODAL_ANCHOR */.ai,
      json: json,
      queryDescription: queryDescription,
      // can be undefined
      createQuery: createQuery,
      executeQuery: executeQuery,
      onTransform: function onTransform(query) {
        _this.executeWithBusyMessage(function () {
          var updatedJson = executeQuery(json, query);
          _this._setAndFireOnChange(updatedJson);
        }, 'transforming...');
      }
    });
  }, 'parsing...');
};

/**
 * Destroy the editor. Clean up DOM, event listeners, and web workers.
 */
previewmode.destroy = function () {
  if (this.frame && this.container && this.frame.parentNode === this.container) {
    this.container.removeChild(this.frame);
  }
  if (this.modeSwitcher) {
    this.modeSwitcher.destroy();
    this.modeSwitcher = null;
  }
  this._debouncedValidate = null;
  if (this.history) {
    this.history.clear();
    this.history = null;
  }

  // Removing the FocusTracker set to track the editor's focus event
  this.frameFocusTracker.destroy();
};

/**
 * Compact the code in the text editor
 */
previewmode.compact = function () {
  var json = this.get();
  var text = JSON.stringify(json);

  // we know that in this case the json is still the same, so we pass json too
  this._setTextAndFireOnChange(text, json);
};

/**
 * Format the code in the text editor
 */
previewmode.format = function () {
  var json = this.get();
  var text = JSON.stringify(json, null, this.indentation);

  // we know that in this case the json is still the same, so we pass json too
  this._setTextAndFireOnChange(text, json);
};

/**
 * Repair the code in the text editor
 */
previewmode.repair = function () {
  var text = this.getText();
  try {
    var repairedText = (0,jsonrepair/* jsonrepair */.m)(text);
    this._setTextAndFireOnChange(repairedText);
  } catch (err) {
    // repair was not successful, do nothing
  }
};

/**
 * Set focus to the editor
 */
previewmode.focus = function () {
  // we don't really have a place to focus,
  // let's focus on the transform button
  this.dom.transform.focus();
};

/**
 * Set json data in the editor
 * @param {*} json
 */
previewmode.set = function (json) {
  if (this.history) {
    this.history.clear();
  }
  this._set(json);
};

/**
 * Update data. Same as calling `set` in text/code mode.
 * @param {*} json
 */
previewmode.update = function (json) {
  this._set(json);
};

/**
 * Set json data
 * @param {*} json
 */
previewmode._set = function (json) {
  this.text = undefined;
  this.json = json;
  this._renderPreview();
  this._pushHistory();

  // validate JSON schema
  this._debouncedValidate();
};
previewmode._setAndFireOnChange = function (json) {
  this._set(json);
  this._onChange();
};

/**
 * Get json data
 * @return {*} json
 */
previewmode.get = function () {
  if (this.json === undefined) {
    var text = this.getText();
    this.json = (0,util.parse)(text); // this can throw an error
  }
  return this.json;
};

/**
 * Get the text contents of the editor
 * @return {String} jsonText
 */
previewmode.getText = function () {
  if (this.text === undefined) {
    this.text = JSON.stringify(this.json, null, this.indentation);
    if (this.options.escapeUnicode === true) {
      this.text = (0,util.escapeUnicodeChars)(this.text);
    }
  }
  return this.text;
};

/**
 * Set the text contents of the editor
 * @param {String} jsonText
 */
previewmode.setText = function (jsonText) {
  if (this.history) {
    this.history.clear();
  }
  this._setText(jsonText);
};

/**
 * Update the text contents
 * @param {string} jsonText
 */
previewmode.updateText = function (jsonText) {
  // don't update if there are no changes
  if (this.getText() === jsonText) {
    return;
  }
  this._setText(jsonText);
};

/**
 * Set the text contents of the editor
 * @param {string} jsonText
 * @param {*} [json] Optional JSON instance of the text
 * @private
 */
previewmode._setText = function (jsonText, json) {
  if (this.options.escapeUnicode === true) {
    this.text = (0,util.escapeUnicodeChars)(jsonText);
  } else {
    this.text = jsonText;
  }
  this.json = json;
  this._renderPreview();
  if (this.json === undefined) {
    var me = this;
    this.executeWithBusyMessage(function () {
      try {
        // force parsing the json now, else it will be done in validate without feedback
        me.json = me.get();
        me._renderPreview();
        me._pushHistory();
      } catch (err) {
        // no need to throw an error, validation will show an error
      }
    }, 'parsing...');
  } else {
    this._pushHistory();
  }
  this._debouncedValidate();
};

/**
 * Set text and fire onChange callback
 * @param {string} jsonText
 * @param {*} [json] Optional JSON instance of the text
 * @private
 */
previewmode._setTextAndFireOnChange = function (jsonText, json) {
  this._setText(jsonText, json);
  this._onChange();
};

/**
 * Apply history to the current state
 * @param {{json?: JSON, text?: string}} action
 * @private
 */
previewmode._applyHistory = function (action) {
  this.json = action.json;
  this.text = action.text;
  this._renderPreview();
  this._debouncedValidate();
};

/**
 * Push the current state to history
 * @private
 */
previewmode._pushHistory = function () {
  if (!this.history) {
    return;
  }
  var action = {
    text: this.text,
    json: this.json
  };
  this.history.add(action);
};

/**
 * Execute a heavy, blocking action.
 * Before starting the action, show a message on screen like "parsing..."
 * @param {function} fn
 * @param {string} message
 */
previewmode.executeWithBusyMessage = function (fn, message) {
  var size = this.getText().length;
  if (size > constants/* SIZE_LARGE */.Oq) {
    var me = this;
    (0,util.addClassName)(me.frame, 'busy');
    me.dom.busyContent.innerText = message;
    setTimeout(function () {
      fn();
      (0,util.removeClassName)(me.frame, 'busy');
      me.dom.busyContent.innerText = '';
    }, 100);
  } else {
    fn();
  }
};

// TODO: refactor into composable functions instead of this shaky mixin-like structure
previewmode.validate = previewmode_textmode.validate;
previewmode._renderErrors = previewmode_textmode._renderErrors;

// define modes
var previewModeMixins = [{
  mode: 'preview',
  mixin: previewmode,
  data: 'json'
}];

/***/ }),

/***/ 915:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   showSortModal: function() { return /* binding */ showSortModal; }
/* harmony export */ });
/* harmony import */ var picomodal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(340);
/* harmony import */ var picomodal__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(picomodal__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(57);
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(237);




/**
 * Show advanced sorting modal
 * @param {HTMLElement} container   The container where to center
 *                                  the modal and create an overlay
 * @param {JSON} json               The JSON data to be sorted.
 * @param {function} onSort         Callback function, invoked with
 *                                  an object containing the selected
 *                                  path and direction
 * @param {Object} options
 *            Available options:
 *                - {string} path              The selected path
 *                - {'asc' | 'desc'} direction The selected direction
 */
function showSortModal(container, json, onSort, options) {
  var paths = Array.isArray(json) ? (0,_util__WEBPACK_IMPORTED_MODULE_2__.getChildPaths)(json) : [''];
  var selectedPath = options && options.path && (0,_util__WEBPACK_IMPORTED_MODULE_2__.contains)(paths, options.path) ? options.path : paths[0];
  var selectedDirection = options && options.direction || 'asc';
  var content = '<div class="pico-modal-contents">' + '<div class="pico-modal-header">' + (0,_i18n__WEBPACK_IMPORTED_MODULE_1__/* .translate */ .Tl)('sort') + '</div>' + '<form>' + '<table>' + '<tbody>' + '<tr>' + '  <td>' + (0,_i18n__WEBPACK_IMPORTED_MODULE_1__/* .translate */ .Tl)('sortFieldLabel') + ' </td>' + '  <td class="jsoneditor-modal-input">' + '  <div class="jsoneditor-select-wrapper">' + '    <select id="field" title="' + (0,_i18n__WEBPACK_IMPORTED_MODULE_1__/* .translate */ .Tl)('sortFieldTitle') + '">' + '    </select>' + '  </div>' + '  </td>' + '</tr>' + '<tr>' + '  <td>' + (0,_i18n__WEBPACK_IMPORTED_MODULE_1__/* .translate */ .Tl)('sortDirectionLabel') + ' </td>' + '  <td class="jsoneditor-modal-input">' + '  <div id="direction" class="jsoneditor-button-group">' + '<input type="button" ' + 'value="' + (0,_i18n__WEBPACK_IMPORTED_MODULE_1__/* .translate */ .Tl)('sortAscending') + '" ' + 'title="' + (0,_i18n__WEBPACK_IMPORTED_MODULE_1__/* .translate */ .Tl)('sortAscendingTitle') + '" ' + 'data-value="asc" ' + 'class="jsoneditor-button-first jsoneditor-button-asc"/>' + '<input type="button" ' + 'value="' + (0,_i18n__WEBPACK_IMPORTED_MODULE_1__/* .translate */ .Tl)('sortDescending') + '" ' + 'title="' + (0,_i18n__WEBPACK_IMPORTED_MODULE_1__/* .translate */ .Tl)('sortDescendingTitle') + '" ' + 'data-value="desc" ' + 'class="jsoneditor-button-last jsoneditor-button-desc"/>' + '  </div>' + '  </td>' + '</tr>' + '<tr>' + '<td colspan="2" class="jsoneditor-modal-input jsoneditor-modal-actions">' + '  <input type="submit" id="ok" value="' + (0,_i18n__WEBPACK_IMPORTED_MODULE_1__/* .translate */ .Tl)('ok') + '" />' + '</td>' + '</tr>' + '</tbody>' + '</table>' + '</form>' + '</div>';
  picomodal__WEBPACK_IMPORTED_MODULE_0___default()({
    parent: container,
    content: content,
    overlayClass: 'jsoneditor-modal-overlay',
    overlayStyles: {
      backgroundColor: 'rgb(1,1,1)',
      opacity: 0.3
    },
    modalClass: 'jsoneditor-modal jsoneditor-modal-sort'
  }).afterCreate(function (modal) {
    var form = modal.modalElem().querySelector('form');
    var ok = modal.modalElem().querySelector('#ok');
    var field = modal.modalElem().querySelector('#field');
    var direction = modal.modalElem().querySelector('#direction');
    function preprocessPath(path) {
      return path === '' ? '@' : path[0] === '.' ? path.slice(1) : path;
    }
    paths.forEach(function (path) {
      var option = document.createElement('option');
      option.text = preprocessPath(path);
      option.value = path;
      field.appendChild(option);
    });
    function setDirection(value) {
      direction.value = value;
      direction.className = 'jsoneditor-button-group jsoneditor-button-group-value-' + direction.value;
    }
    field.value = selectedPath || paths[0];
    setDirection(selectedDirection || 'asc');
    direction.onclick = function (event) {
      setDirection(event.target.getAttribute('data-value'));
    };
    ok.onclick = function (event) {
      event.preventDefault();
      event.stopPropagation();
      modal.close();
      onSort({
        path: field.value,
        direction: direction.value
      });
    };
    if (form) {
      // form is not available when JSONEditor is created inside a form
      form.onsubmit = ok.onclick;
    }
  }).afterClose(function (modal) {
    modal.destroy();
  }).show();
}

/***/ }),

/***/ 609:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  showTransformModal: function() { return /* binding */ showTransformModal; }
});

// EXTERNAL MODULE: ./node_modules/picomodal/src/picoModal.js
var picoModal = __webpack_require__(340);
var picoModal_default = /*#__PURE__*/__webpack_require__.n(picoModal);
// EXTERNAL MODULE: ./src/js/assets/selectr/selectr.js
var selectr = __webpack_require__(772);
var selectr_default = /*#__PURE__*/__webpack_require__.n(selectr);
// EXTERNAL MODULE: ./src/js/i18n.js
var i18n = __webpack_require__(57);
;// ./src/js/jsonUtils.js


/**
 * Convert part of a JSON object to a JSON string.
 * Use case is to stringify a small part of a large JSON object so you can see
 * a preview.
 *
 * @param {*} value
 * The value to convert to a JSON string.
 *
 * @param {number | string | null} [space]
 * A String or Number object that's used to insert white space into the output
 * JSON string for readability purposes. If this is a Number, it indicates the
 * number of space characters to use as white space; this number is capped at 10
 * if it's larger than that. Values less than 1 indicate that no space should be
 * used. If this is a String, the string (or the first 10 characters of the string,
 * if it's longer than that) is used as white space. If this parameter is not
 * provided (or is null), no white space is used.
 *
 * @param {number} [limit] Maximum size of the string output.
 *
 * @returns {string | undefined} Returns the string representation of the JSON object.
 */
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function stringifyPartial(value, space, limit) {
  var _space; // undefined by default
  if (typeof space === 'number') {
    if (space > 10) {
      _space = repeat(' ', 10);
    } else if (space >= 1) {
      _space = repeat(' ', space);
    }
    // else ignore
  } else if (typeof space === 'string' && space !== '') {
    _space = space;
  }
  var output = stringifyValue(value, _space, '', limit);
  return output.length > limit ? slice(output, limit) + '...' : output;
}

/**
 * Stringify a value
 * @param {*} value
 * @param {string} space
 * @param {string} indent
 * @param {number} limit
 * @return {string | undefined}
 */
function stringifyValue(value, space, indent, limit) {
  // boolean, null, number, string, or date
  if (typeof value === 'boolean' || value instanceof Boolean || value === null || typeof value === 'number' || value instanceof Number || typeof value === 'string' || value instanceof String || value instanceof Date) {
    return JSON.stringify(value);
  }

  // array
  if (Array.isArray(value)) {
    return stringifyArray(value, space, indent, limit);
  }

  // object (test lastly!)
  if (value && _typeof(value) === 'object') {
    return stringifyObject(value, space, indent, limit);
  }
  return undefined;
}

/**
 * Stringify an array
 * @param {Array} array
 * @param {string} space
 * @param {string} indent
 * @param {number} limit
 * @return {string}
 */
function stringifyArray(array, space, indent, limit) {
  var childIndent = space ? indent + space : undefined;
  var str = space ? '[\n' : '[';
  for (var i = 0; i < array.length; i++) {
    var item = array[i];
    if (space) {
      str += childIndent;
    }
    if (typeof item !== 'undefined' && typeof item !== 'function') {
      str += stringifyValue(item, space, childIndent, limit);
    } else {
      str += 'null';
    }
    if (i < array.length - 1) {
      str += space ? ',\n' : ',';
    }

    // stop as soon as we're exceeding the limit
    if (str.length > limit) {
      return str + '...';
    }
  }
  str += space ? '\n' + indent + ']' : ']';
  return str;
}

/**
 * Stringify an object
 * @param {Object} object
 * @param {string} space
 * @param {string} indent
 * @param {number} limit
 * @return {string}
 */
function stringifyObject(object, space, indent, limit) {
  var childIndent = space ? indent + space : undefined;
  var first = true;
  var str = space ? '{\n' : '{';
  if (typeof object.toJSON === 'function') {
    return stringifyValue(object.toJSON(), space, indent, limit);
  }
  for (var key in object) {
    if (jsonUtils_hasOwnProperty(object, key)) {
      var value = object[key];
      if (first) {
        first = false;
      } else {
        str += space ? ',\n' : ',';
      }
      str += space ? childIndent + '"' + key + '": ' : '"' + key + '":';
      str += stringifyValue(value, space, childIndent, limit);

      // stop as soon as we're exceeding the limit
      if (str.length > limit) {
        return str + '...';
      }
    }
  }
  str += space ? '\n' + indent + '}' : '}';
  return str;
}

/**
 * Repeat a string a number of times.
 * Simple linear solution, we only need up to 10 iterations in practice
 * @param {string} text
 * @param {number} times
 * @return {string}
 */
function repeat(text, times) {
  var res = '';
  while (times-- > 0) {
    res += text;
  }
  return res;
}

/**
 * Limit the length of text
 * @param {string} text
 * @param {number} [limit]
 * @return {string}
 */
function slice(text, limit) {
  return typeof limit === 'number' ? text.slice(0, limit) : text;
}

/**
 * Test whether some text contains a JSON array, i.e. the first
 * non-white space character is a [
 * @param {string} jsonText
 * @return {boolean}
 */
function containsArray(jsonText) {
  return /^\s*\[/.test(jsonText);
}
function jsonUtils_hasOwnProperty(object, key) {
  return Object.prototype.hasOwnProperty.call(object, key);
}
// EXTERNAL MODULE: ./src/js/util.js
var util = __webpack_require__(237);
// EXTERNAL MODULE: ./src/js/constants.js
var constants = __webpack_require__(660);
;// ./src/js/showTransformModal.js






var DEFAULT_DESCRIPTION = 'Enter a <a href="http://jmespath.org" target="_blank">JMESPath</a> query to filter, sort, or transform the JSON data.<br/>' + 'To learn JMESPath, go to <a href="http://jmespath.org/tutorial.html" target="_blank">the interactive tutorial</a>.';

/**
 * Show advanced filter and transform modal using JMESPath
 * @param {Object} params
 * @property {HTMLElement} container   The container where to center
 *                                     the modal and create an overlay
 * @property {JSON} json               The json data to be transformed
 * @property {string} [queryDescription] Optional custom description explaining
 *                                       the transform functionality
 * @property {function} createQuery    Function called to create a query
 *                                     from the wizard form
 * @property {function} executeQuery   Execute a query for the preview pane
 * @property {function} onTransform    Callback invoked with the created
 *                                     query as callback
 */
function showTransformModal(_ref) {
  var container = _ref.container,
    json = _ref.json,
    _ref$queryDescription = _ref.queryDescription,
    queryDescription = _ref$queryDescription === void 0 ? DEFAULT_DESCRIPTION : _ref$queryDescription,
    createQuery = _ref.createQuery,
    executeQuery = _ref.executeQuery,
    onTransform = _ref.onTransform;
  var value = json;
  var content = '<div class="pico-modal-contents">' + '<div class="pico-modal-header">' + (0,i18n/* translate */.Tl)('transform') + '</div>' + '<p>' + queryDescription + '</p>' + '<div class="jsoneditor-jmespath-label">' + (0,i18n/* translate */.Tl)('transformWizardLabel') + ' </div>' + '<div id="wizard" class="jsoneditor-jmespath-block jsoneditor-jmespath-wizard">' + '  <table class="jsoneditor-jmespath-wizard-table">' + '    <tbody>' + '      <tr>' + '        <th>' + (0,i18n/* translate */.Tl)('transformWizardFilter') + '</th>' + '        <td class="jsoneditor-jmespath-filter">' + '          <div class="jsoneditor-inline jsoneditor-jmespath-filter-field" >' + '            <select id="filterField">' + '            </select>' + '          </div>' + '          <div class="jsoneditor-inline jsoneditor-jmespath-filter-relation" >' + '            <select id="filterRelation">' + '              <option value="==">==</option>' + '              <option value="!=">!=</option>' + '              <option value="<">&lt;</option>' + '              <option value="<=">&lt;=</option>' + '              <option value=">">&gt;</option>' + '              <option value=">=">&gt;=</option>' + '            </select>' + '          </div>' + '          <div class="jsoneditor-inline jsoneditor-jmespath-filter-value" >' + '            <input type="text" class="value" placeholder="value..." id="filterValue" />' + '          </div>' + '        </td>' + '      </tr>' + '      <tr>' + '        <th>' + (0,i18n/* translate */.Tl)('transformWizardSortBy') + '</th>' + '        <td class="jsoneditor-jmespath-filter">' + '          <div class="jsoneditor-inline jsoneditor-jmespath-sort-field">' + '            <select id="sortField">' + '            </select>' + '          </div>' + '          <div class="jsoneditor-inline jsoneditor-jmespath-sort-order" >' + '            <select id="sortOrder">' + '              <option value="asc">Ascending</option>' + '              <option value="desc">Descending</option>' + '            </select>' + '          </div>' + '        </td>' + '      </tr>' + '      <tr id="selectFieldsPart">' + '        <th>' + (0,i18n/* translate */.Tl)('transformWizardSelectFields') + '</th>' + '        <td class="jsoneditor-jmespath-filter">' + '          <select class="jsoneditor-jmespath-select-fields" id="selectFields" multiple></select>' + '        </td>' + '      </tr>' + '    </tbody>' + '  </table>' + '</div>' + '<div class="jsoneditor-jmespath-label">' + (0,i18n/* translate */.Tl)('transformQueryLabel') + ' </div>' + '<div class="jsoneditor-jmespath-block">' + '  <textarea id="query" ' + '            rows="4" ' + '            autocomplete="off" ' + '            autocorrect="off" ' + '            autocapitalize="off" ' + '            spellcheck="false"' + '            title="' + (0,i18n/* translate */.Tl)('transformQueryTitle') + '">[*]</textarea>' + '</div>' + '<div class="jsoneditor-jmespath-label">' + (0,i18n/* translate */.Tl)('transformPreviewLabel') + ' </div>' + '<div class="jsoneditor-jmespath-block">' + '  <textarea id="preview" ' + '      class="jsoneditor-transform-preview"' + '      readonly> </textarea>' + '</div>' + '<div class="jsoneditor-jmespath-block jsoneditor-modal-actions">' + '  <input type="submit" id="ok" value="' + (0,i18n/* translate */.Tl)('ok') + '" autofocus />' + '</div>' + '</div>';
  picoModal_default()({
    parent: container,
    content: content,
    overlayClass: 'jsoneditor-modal-overlay',
    overlayStyles: {
      backgroundColor: 'rgb(1,1,1)',
      opacity: 0.3
    },
    modalClass: 'jsoneditor-modal jsoneditor-modal-transform',
    focus: false
  }).afterCreate(function (modal) {
    var elem = modal.modalElem();
    var wizard = elem.querySelector('#wizard');
    var ok = elem.querySelector('#ok');
    var filterField = elem.querySelector('#filterField');
    var filterRelation = elem.querySelector('#filterRelation');
    var filterValue = elem.querySelector('#filterValue');
    var sortField = elem.querySelector('#sortField');
    var sortOrder = elem.querySelector('#sortOrder');
    var selectFields = elem.querySelector('#selectFields');
    var query = elem.querySelector('#query');
    var preview = elem.querySelector('#preview');
    if (!Array.isArray(value)) {
      wizard.style.fontStyle = 'italic';
      wizard.textContent = '(wizard not available for objects, only for arrays)';
    }
    var sortablePaths = (0,util.getChildPaths)(json);
    sortablePaths.forEach(function (path) {
      var formattedPath = preprocessPath(path);
      var filterOption = document.createElement('option');
      filterOption.text = formattedPath;
      filterOption.value = formattedPath;
      filterField.appendChild(filterOption);
      var sortOption = document.createElement('option');
      sortOption.text = formattedPath;
      sortOption.value = formattedPath;
      sortField.appendChild(sortOption);
    });
    var selectablePaths = (0,util.getChildPaths)(json, true).filter(function (path) {
      return path !== '';
    });
    if (selectablePaths.length > 0) {
      selectablePaths.forEach(function (path) {
        var formattedPath = preprocessPath(path);
        var option = document.createElement('option');
        option.text = formattedPath;
        option.value = formattedPath;
        selectFields.appendChild(option);
      });
    } else {
      var selectFieldsPart = elem.querySelector('#selectFieldsPart');
      if (selectFieldsPart) {
        selectFieldsPart.style.display = 'none';
      }
    }
    var selectrFilterField = new (selectr_default())(filterField, {
      defaultSelected: false,
      clearable: true,
      allowDeselect: true,
      placeholder: 'field...'
    });
    var selectrFilterRelation = new (selectr_default())(filterRelation, {
      defaultSelected: false,
      clearable: true,
      allowDeselect: true,
      placeholder: 'compare...'
    });
    var selectrSortField = new (selectr_default())(sortField, {
      defaultSelected: false,
      clearable: true,
      allowDeselect: true,
      placeholder: 'field...'
    });
    var selectrSortOrder = new (selectr_default())(sortOrder, {
      defaultSelected: false,
      clearable: true,
      allowDeselect: true,
      placeholder: 'order...'
    });
    var selectrSelectFields = new (selectr_default())(selectFields, {
      multiple: true,
      clearable: true,
      defaultSelected: false,
      placeholder: 'select fields...'
    });
    selectrFilterField.on('selectr.change', generateQueryFromWizard);
    selectrFilterRelation.on('selectr.change', generateQueryFromWizard);
    filterValue.oninput = generateQueryFromWizard;
    selectrSortField.on('selectr.change', generateQueryFromWizard);
    selectrSortOrder.on('selectr.change', generateQueryFromWizard);
    selectrSelectFields.on('selectr.change', generateQueryFromWizard);
    elem.querySelector('.pico-modal-contents').onclick = function (event) {
      // prevent the first clear button (in any select box) from getting
      // focus when clicking anywhere in the modal. Only allow clicking links.
      if (event.target.nodeName !== 'A') {
        event.preventDefault();
      }
    };
    function preprocessPath(path) {
      return path === '' ? '@' : path[0] === '.' ? path.slice(1) : path;
    }
    function updatePreview() {
      try {
        var transformed = executeQuery(value, query.value);
        preview.className = 'jsoneditor-transform-preview';
        preview.value = stringifyPartial(transformed, 2, constants/* MAX_PREVIEW_CHARACTERS */.hJ);
        ok.disabled = false;
      } catch (err) {
        preview.className = 'jsoneditor-transform-preview jsoneditor-error';
        preview.value = err.toString();
        ok.disabled = true;
      }
    }
    var debouncedUpdatePreview = (0,util.debounce)(updatePreview, 300);
    function tryCreateQuery(json, queryOptions) {
      try {
        query.value = createQuery(json, queryOptions);
        ok.disabled = false;
        debouncedUpdatePreview();
      } catch (err) {
        var message = 'Error: an error happened when executing "createQuery": ' + (err.message || err.toString());
        query.value = '';
        ok.disabled = true;
        preview.className = 'jsoneditor-transform-preview jsoneditor-error';
        preview.value = message;
      }
    }
    function generateQueryFromWizard() {
      var queryOptions = {};
      if (filterField.value && filterRelation.value && filterValue.value) {
        queryOptions.filter = {
          field: filterField.value,
          relation: filterRelation.value,
          value: filterValue.value
        };
      }
      if (sortField.value && sortOrder.value) {
        queryOptions.sort = {
          field: sortField.value,
          direction: sortOrder.value
        };
      }
      if (selectFields.value) {
        var fields = [];
        for (var i = 0; i < selectFields.options.length; i++) {
          if (selectFields.options[i].selected) {
            var selectedField = selectFields.options[i].value;
            fields.push(selectedField);
          }
        }
        queryOptions.projection = {
          fields: fields
        };
      }
      tryCreateQuery(json, queryOptions);
    }
    query.oninput = debouncedUpdatePreview;
    ok.onclick = function (event) {
      event.preventDefault();
      event.stopPropagation();
      modal.close();
      onTransform(query.value);
    };

    // initialize with empty query
    tryCreateQuery(json, {});
    setTimeout(function () {
      query.select();
      query.focus();
      query.selectionStart = 3;
      query.selectionEnd = 3;
    });
  }).afterClose(function (modal) {
    modal.destroy();
  }).show();
}

/***/ }),

/***/ 948:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  textModeMixins: function() { return /* binding */ textModeMixins; }
});

// EXTERNAL MODULE: ./node_modules/jsonrepair/lib/esm/regular/jsonrepair.js + 2 modules
var jsonrepair = __webpack_require__(857);
// EXTERNAL MODULE: ./src/js/ace/index.js
var ace = __webpack_require__(413);
var ace_default = /*#__PURE__*/__webpack_require__.n(ace);
// EXTERNAL MODULE: ./src/js/constants.js
var constants = __webpack_require__(660);
// EXTERNAL MODULE: ./src/js/ErrorTable.js
var ErrorTable = __webpack_require__(115);
// EXTERNAL MODULE: ./src/js/FocusTracker.js
var FocusTracker = __webpack_require__(877);
// EXTERNAL MODULE: ./src/js/i18n.js
var i18n = __webpack_require__(57);
// EXTERNAL MODULE: ./src/js/jmespathQuery.js
var jmespathQuery = __webpack_require__(359);
// EXTERNAL MODULE: ./src/js/ModeSwitcher.js
var ModeSwitcher = __webpack_require__(389);
// EXTERNAL MODULE: ./src/js/showSortModal.js
var showSortModal = __webpack_require__(915);
// EXTERNAL MODULE: ./src/js/showTransformModal.js + 1 modules
var showTransformModal = __webpack_require__(609);
// EXTERNAL MODULE: ./src/js/tryRequireThemeJsonEditor.js
var tryRequireThemeJsonEditor = __webpack_require__(467);
// EXTERNAL MODULE: ./node_modules/json-source-map/index.js
var json_source_map = __webpack_require__(94);
// EXTERNAL MODULE: ./src/js/util.js
var util = __webpack_require__(237);
;// ./src/js/SchemaTextCompleter.js


function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }



/**
 * SchemaTextCompleter class implements the ace ext-language_tools completer API,
 * and suggests completions for the text editor that are relative
 * to the cursor position and the json schema
 */
var SchemaTextCompleter = /*#__PURE__*/function () {
  function SchemaTextCompleter(schema, schemaRefs) {
    _classCallCheck(this, SchemaTextCompleter);
    this.schema = schema;
    this.schemaRefs = schemaRefs || {};
    this.suggestions = {};
    this.suggestionsRefs = {};
    this._buildSuggestions();
  }
  return _createClass(SchemaTextCompleter, [{
    key: "_buildSuggestions",
    value: function _buildSuggestions() {
      this._handleSchemaEntry('', this.schema, this.suggestions);
      for (var refName in this.schemaRefs) {
        this.suggestionsRefs[refName] = {};
        this._handleSchemaEntry('', this.schemaRefs[refName], this.suggestionsRefs[refName]);
      }
    }
  }, {
    key: "_handleRef",
    value: function _handleRef(currectPath, refName, suggestionsObj) {
      suggestionsObj[currectPath] = suggestionsObj[currectPath] || {};
      suggestionsObj[currectPath].refs = suggestionsObj[currectPath].refs || [];
      suggestionsObj[currectPath].refs = (0,util.uniqueMergeArrays)(suggestionsObj[currectPath].refs, [refName]);
    }
  }, {
    key: "_handleSchemaEntry",
    value: function _handleSchemaEntry(currectPath, schemaNode, suggestionsObj) {
      if (!schemaNode) {
        console.error('SchemaTextCompleter: schema node is missing for path', currectPath);
        return;
      }
      if (schemaNode.$ref) {
        this._handleRef(currectPath, schemaNode.$ref, suggestionsObj);
        return;
      }
      var ofConditionEntry = this._checkOfConditon(schemaNode);
      if (ofConditionEntry) {
        this._handleOfCondition(currectPath, schemaNode[ofConditionEntry], suggestionsObj);
        return;
      }
      switch (schemaNode.type) {
        case 'object':
          this._handleObject(currectPath, schemaNode, suggestionsObj);
          break;
        case 'string':
        case 'number':
        case 'integer':
          this._handlePrimitive(currectPath, schemaNode, suggestionsObj);
          break;
        case 'boolean':
          this._handleBoolean(currectPath, schemaNode, suggestionsObj);
          break;
        case 'array':
          this._handleArray(currectPath, schemaNode, suggestionsObj);
      }
    }
  }, {
    key: "_handleObject",
    value: function _handleObject(currectPath, schemaNode, suggestionsObj) {
      var _this = this;
      if ((0,util.isObject)(schemaNode.properties)) {
        var props = Object.keys(schemaNode.properties);
        suggestionsObj[currectPath] = suggestionsObj[currectPath] || {};
        suggestionsObj[currectPath].props = suggestionsObj[currectPath].props || [];
        suggestionsObj[currectPath].props = (0,util.uniqueMergeArrays)(suggestionsObj[currectPath].props, props);
        props.forEach(function (prop) {
          (0,util.asyncExec)(function () {
            _this._handleSchemaEntry("".concat(currectPath, "/").concat(prop), schemaNode.properties[prop], suggestionsObj);
          });
        });
      }
    }
  }, {
    key: "_handlePrimitive",
    value: function _handlePrimitive(currectPath, schemaNode, suggestionsObj) {
      suggestionsObj[currectPath] = suggestionsObj[currectPath] || {};
      if ((0,util.isArray)(schemaNode.examples)) {
        suggestionsObj[currectPath].examples = suggestionsObj[currectPath].examples || [];
        suggestionsObj[currectPath].examples = (0,util.uniqueMergeArrays)(suggestionsObj[currectPath].examples, schemaNode.examples);
      }
      if ((0,util.isArray)(schemaNode["enum"])) {
        suggestionsObj[currectPath]["enum"] = suggestionsObj[currectPath]["enum"] || [];
        suggestionsObj[currectPath]["enum"] = (0,util.uniqueMergeArrays)(suggestionsObj[currectPath]["enum"], schemaNode["enum"]);
      }
    }
  }, {
    key: "_handleBoolean",
    value: function _handleBoolean(currectPath, schemaNode, suggestionsObj) {
      if (!suggestionsObj[currectPath]) {
        suggestionsObj[currectPath] = {
          bool: [true, false]
        };
      }
    }
  }, {
    key: "_handleArray",
    value: function _handleArray(currectPath, schemaNode, suggestionsObj) {
      var _this2 = this;
      if (schemaNode.items) {
        (0,util.asyncExec)(function () {
          _this2._handleSchemaEntry("".concat(currectPath, "/\\d+"), schemaNode.items, suggestionsObj);
        });
      }
    }
  }, {
    key: "_handleOfCondition",
    value: function _handleOfCondition(currectPath, schemaNode, suggestionsObj) {
      var _this3 = this;
      if (schemaNode && schemaNode.length) {
        schemaNode.forEach(function (schemaEntry) {
          (0,util.asyncExec)(function () {
            _this3._handleSchemaEntry(currectPath, schemaEntry, suggestionsObj);
          });
        });
      }
    }
  }, {
    key: "_checkOfConditon",
    value: function _checkOfConditon(entry) {
      if (!entry) {
        return;
      }
      if (entry.oneOf) {
        return 'oneOf';
      }
      if (entry.anyOf) {
        return 'anyOf';
      }
      if (entry.allOf) {
        return 'allOf';
      }
    }
  }, {
    key: "getCompletions",
    value: function getCompletions(editor, session, pos, prefix, callback) {
      var _this4 = this;
      try {
        var map = json_source_map.parse(session.getValue());
        var pointers = map.pointers || {};
        var processCompletionsCallback = function processCompletionsCallback(suggestions) {
          var completions = [];
          var score = 0;
          var appendSuggesions = function appendSuggesions(type) {
            var _suggestions$type;
            var typeTitle = {
              props: 'property',
              "enum": 'enum',
              bool: 'boolean',
              examples: 'examples'
            };
            if (suggestions && (_suggestions$type = suggestions[type]) !== null && _suggestions$type !== void 0 && _suggestions$type.length) {
              completions = completions.concat(suggestions[type].map(function (term) {
                return {
                  caption: term + '',
                  meta: "schema [".concat(typeTitle[type], "]"),
                  score: score++,
                  value: term + ''
                };
              }));
            }
          };
          appendSuggesions('props');
          appendSuggesions('enum');
          appendSuggesions('bool');
          appendSuggesions('examples');
          if (completions.length) {
            callback(null, completions);
          }
        };
        Object.keys(pointers).forEach(function (ptr) {
          (0,util.asyncExec)(function () {
            var _pointers$ptr$key, _pointers$ptr$value, _pointers$ptr$value2, _pointers$ptr$valueEn;
            var _matchPointersToPath = function matchPointersToPath(pointer, currentSuggestions, path) {
              var option = Object.keys(currentSuggestions).reduce(function (last, key) {
                if (new RegExp("^".concat(path).concat(key)).test(pointer)) {
                  if (!last || last.length < key.length) {
                    return key;
                  }
                }
                return last;
              }, null);
              if (typeof option === 'string') {
                var _currentSuggestions$o;
                if ((_currentSuggestions$o = currentSuggestions[option]) !== null && _currentSuggestions$o !== void 0 && (_currentSuggestions$o = _currentSuggestions$o.refs) !== null && _currentSuggestions$o !== void 0 && _currentSuggestions$o.length) {
                  var mergedSuggestions = {};
                  for (var idx in currentSuggestions[option].refs) {
                    var refName = currentSuggestions[option].refs[idx];
                    if (_this4.suggestionsRefs[refName]) {
                      var refSuggestion = _matchPointersToPath(pointer, _this4.suggestionsRefs[refName], "".concat(path).concat(option));
                      if (refSuggestion !== null && refSuggestion !== void 0 && refSuggestion["enum"]) {
                        mergedSuggestions["enum"] = (0,util.uniqueMergeArrays)(mergedSuggestions["enum"], refSuggestion["enum"]);
                      }
                      if (refSuggestion !== null && refSuggestion !== void 0 && refSuggestion.examples) {
                        mergedSuggestions.examples = (0,util.uniqueMergeArrays)(mergedSuggestions.examples, refSuggestion.examples);
                      }
                      if (refSuggestion !== null && refSuggestion !== void 0 && refSuggestion.bool) {
                        mergedSuggestions.bool = (0,util.uniqueMergeArrays)(mergedSuggestions.bool, refSuggestion.bool);
                      }
                      if (refSuggestion !== null && refSuggestion !== void 0 && refSuggestion.props) {
                        mergedSuggestions.props = (0,util.uniqueMergeArrays)(mergedSuggestions.props, refSuggestion.props);
                      }
                    }
                  }
                  return mergedSuggestions;
                } else if (new RegExp("^".concat(path).concat(option, "$")).test(pointer)) {
                  // console.log('SchemaTextCompleter: Text suggestion match', { path: pointer, schemaPath: `${path}${option}`, suggestions: currentSuggestions[option] })
                  return currentSuggestions[option];
                }
              }
            };
            var selectedPtr;
            if (((_pointers$ptr$key = pointers[ptr].key) === null || _pointers$ptr$key === void 0 ? void 0 : _pointers$ptr$key.line) === pos.row) {
              if (pos.column >= pointers[ptr].key.column && pos.column <= pointers[ptr].keyEnd.column) {
                selectedPtr = ptr.slice(0, ptr.lastIndexOf('/'));
              }
            }
            if (((_pointers$ptr$value = pointers[ptr].value) === null || _pointers$ptr$value === void 0 ? void 0 : _pointers$ptr$value.line) === pos.row && ((_pointers$ptr$value2 = pointers[ptr].value) === null || _pointers$ptr$value2 === void 0 ? void 0 : _pointers$ptr$value2.line) === ((_pointers$ptr$valueEn = pointers[ptr].valueEnd) === null || _pointers$ptr$valueEn === void 0 ? void 0 : _pointers$ptr$valueEn.line)) {
              // multiline values are objects
              if (pos.column >= pointers[ptr].value.column && pos.column <= pointers[ptr].valueEnd.column) {
                selectedPtr = ptr;
              }
            }
            if (selectedPtr) {
              var chosenCompletions = _matchPointersToPath(selectedPtr, _this4.suggestions, '');
              processCompletionsCallback(chosenCompletions);
            }
          });
        });
      } catch (e) {
        // probably not valid json, ignore.
      }
    }
  }]);
}();
;// ./src/js/validationUtils.js


/**
 * Execute custom validation if configured.
 *
 * Returns a promise resolving with the custom errors (or an empty array).
 */
function validateCustom(json, onValidate) {
  if (!onValidate) {
    return Promise.resolve([]);
  }
  try {
    var customValidateResults = onValidate(json);
    var resultPromise = (0,util.isPromise)(customValidateResults) ? customValidateResults : Promise.resolve(customValidateResults);
    return resultPromise.then(function (customValidationPathErrors) {
      if (Array.isArray(customValidationPathErrors)) {
        return customValidationPathErrors.filter(function (error) {
          var valid = (0,util.isValidValidationError)(error);
          if (!valid) {
            console.warn('Ignoring a custom validation error with invalid structure. ' + 'Expected structure: {path: [...], message: "..."}. ' + 'Actual error:', error);
          }
          return valid;
        }).map(function (error) {
          return (
            // change data structure into the structure matching the JSON schema errors
            {
              dataPath: (0,util.stringifyPath)(error.path),
              message: error.message,
              type: 'customValidation'
            }
          );
        });
      } else {
        return [];
      }
    });
  } catch (err) {
    return Promise.reject(err);
  }
}
;// ./src/js/textmode.js


function textmode_typeof(o) { "@babel/helpers - typeof"; return textmode_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, textmode_typeof(o); }















// create a mixin with the functions for text mode
var textmode = {};
var DEFAULT_THEME = 'ace/theme/jsoneditor';

/**
 * Create a text editor
 * @param {Element} container
 * @param {Object} [options]   Object with options. See docs for details.
 * @private
 */
textmode.create = function (container) {
  var _this = this;
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  if (typeof options.statusBar === 'undefined') {
    options.statusBar = true;
  }

  // setting default for textmode
  options.mainMenuBar = options.mainMenuBar !== false;
  options.enableSort = options.enableSort !== false;
  options.enableTransform = options.enableTransform !== false;
  options.createQuery = options.createQuery || jmespathQuery/* createQuery */.V;
  options.executeQuery = options.executeQuery || jmespathQuery/* executeQuery */.e;
  options.showErrorTable = options.showErrorTable !== undefined ? options.showErrorTable : ['text', 'preview'];
  this.options = options;

  // indentation
  if (typeof options.indentation === 'number') {
    this.indentation = Number(options.indentation);
  } else {
    this.indentation = 2; // number of spaces
  }

  // language
  (0,i18n/* setLanguages */.AI)(this.options.languages);
  (0,i18n/* setLanguage */.xC)(this.options.language);

  // grab ace from options if provided
  var _ace = options.ace ? options.ace : (ace_default());
  // TODO: make the option options.ace deprecated, it's not needed anymore (see #309)

  // determine mode
  this.mode = options.mode === 'code' ? 'code' : 'text';
  if (this.mode === 'code') {
    // verify whether Ace editor is available and supported
    if (typeof _ace === 'undefined') {
      this.mode = 'text';
      console.warn('Failed to load Ace editor, falling back to plain text mode. Please use a JSONEditor bundle including Ace, or pass Ace as via the configuration option `ace`.');
    }
  }

  // determine theme
  this.theme = options.theme || DEFAULT_THEME;
  if (this.theme === DEFAULT_THEME && _ace) {
    (0,tryRequireThemeJsonEditor/* tryRequireThemeJsonEditor */.J)();
  }
  if (options.onTextSelectionChange) {
    this.onTextSelectionChange(options.onTextSelectionChange);
  }
  var me = this;
  this.container = container;
  this.dom = {};
  this.aceEditor = undefined; // ace code editor
  this.textarea = undefined; // plain text editor (fallback when Ace is not available)
  this.validateSchema = null;
  this.annotations = [];
  this.lastSchemaErrors = undefined;

  // create a debounced validate function
  this._debouncedValidate = (0,util.debounce)(this._validateAndCatch.bind(this), this.DEBOUNCE_INTERVAL);
  this.width = container.clientWidth;
  this.height = container.clientHeight;
  this.frame = document.createElement('div');
  this.frame.className = 'jsoneditor jsoneditor-mode-' + this.options.mode;
  this.frame.onclick = function (event) {
    // prevent default submit action when the editor is located inside a form
    event.preventDefault();
  };
  this.frame.onkeydown = function (event) {
    me._onKeyDown(event);
  };

  // setting the FocusTracker on 'this.frame' to track the editor's focus event
  var focusTrackerConfig = {
    target: this.frame,
    onFocus: this.options.onFocus || null,
    onBlur: this.options.onBlur || null
  };
  this.frameFocusTracker = new FocusTracker/* FocusTracker */.$(focusTrackerConfig);
  this.content = document.createElement('div');
  this.content.className = 'jsoneditor-outer';
  if (this.options.mainMenuBar) {
    (0,util.addClassName)(this.content, 'has-main-menu-bar');

    // create menu
    this.menu = document.createElement('div');
    this.menu.className = 'jsoneditor-menu';
    this.frame.appendChild(this.menu);

    // create format button
    var buttonFormat = document.createElement('button');
    buttonFormat.type = 'button';
    buttonFormat.className = 'jsoneditor-format';
    buttonFormat.title = (0,i18n/* translate */.Tl)('formatTitle');
    this.menu.appendChild(buttonFormat);
    buttonFormat.onclick = function () {
      try {
        me.format();
        me._onChange();
      } catch (err) {
        me._onError(err);
      }
    };

    // create compact button
    var buttonCompact = document.createElement('button');
    buttonCompact.type = 'button';
    buttonCompact.className = 'jsoneditor-compact';
    buttonCompact.title = (0,i18n/* translate */.Tl)('compactTitle');
    this.menu.appendChild(buttonCompact);
    buttonCompact.onclick = function () {
      try {
        me.compact();
        me._onChange();
      } catch (err) {
        me._onError(err);
      }
    };

    // create sort button
    if (this.options.enableSort) {
      var _sort = document.createElement('button');
      _sort.type = 'button';
      _sort.className = 'jsoneditor-sort';
      _sort.title = (0,i18n/* translate */.Tl)('sortTitleShort');
      _sort.onclick = function () {
        me._showSortModal();
      };
      this.menu.appendChild(_sort);
    }

    // create transform button
    if (this.options.enableTransform) {
      var transform = document.createElement('button');
      transform.type = 'button';
      transform.title = (0,i18n/* translate */.Tl)('transformTitleShort');
      transform.className = 'jsoneditor-transform';
      transform.onclick = function () {
        me._showTransformModal();
      };
      this.menu.appendChild(transform);
    }

    // create repair button
    var buttonRepair = document.createElement('button');
    buttonRepair.type = 'button';
    buttonRepair.className = 'jsoneditor-repair';
    buttonRepair.title = (0,i18n/* translate */.Tl)('repairTitle');
    this.menu.appendChild(buttonRepair);
    buttonRepair.onclick = function () {
      try {
        me.repair();
        me._onChange();
      } catch (err) {
        me._onError(err);
      }
    };

    // create undo/redo buttons
    if (this.mode === 'code') {
      // create undo button
      var undo = document.createElement('button');
      undo.type = 'button';
      undo.className = 'jsoneditor-undo jsoneditor-separator';
      undo.title = (0,i18n/* translate */.Tl)('undo');
      undo.onclick = function () {
        _this.aceEditor.getSession().getUndoManager().undo();
      };
      this.menu.appendChild(undo);
      this.dom.undo = undo;

      // create redo button
      var redo = document.createElement('button');
      redo.type = 'button';
      redo.className = 'jsoneditor-redo';
      redo.title = (0,i18n/* translate */.Tl)('redo');
      redo.onclick = function () {
        _this.aceEditor.getSession().getUndoManager().redo();
      };
      this.menu.appendChild(redo);
      this.dom.redo = redo;
    }

    // create mode box
    if (this.options && this.options.modes && this.options.modes.length) {
      this.modeSwitcher = new ModeSwitcher/* ModeSwitcher */.n(this.menu, this.options.modes, this.options.mode, function onSwitch(mode) {
        // switch mode and restore focus
        try {
          me.setMode(mode);
          me.modeSwitcher.focus();
        } catch (err) {
          me._onError(err);
        }
      });
    }
    if (this.mode === 'code') {
      var poweredBy = document.createElement('a');
      poweredBy.appendChild(document.createTextNode('powered by ace'));
      poweredBy.href = 'https://ace.c9.io/';
      poweredBy.target = '_blank';
      poweredBy.className = 'jsoneditor-poweredBy';
      poweredBy.onclick = function () {
        // TODO: this anchor falls below the margin of the content,
        // therefore the normal a.href does not work. We use a click event
        // for now, but this should be fixed.
        window.open(poweredBy.href, poweredBy.target, 'noreferrer');
      };
      this.menu.appendChild(poweredBy);
    }
  }
  var emptyNode = {};
  var isReadOnly = this.options.onEditable && textmode_typeof(this.options.onEditable === 'function') && !this.options.onEditable(emptyNode);
  this.frame.appendChild(this.content);
  this.container.appendChild(this.frame);
  if (this.mode === 'code') {
    this.editorDom = document.createElement('div');
    this.editorDom.style.height = '100%'; // TODO: move to css
    this.editorDom.style.width = '100%'; // TODO: move to css
    this.content.appendChild(this.editorDom);
    var aceEditor = _ace.edit(this.editorDom);
    var aceSession = aceEditor.getSession();
    aceEditor.$blockScrolling = Infinity;
    aceEditor.setTheme(this.theme);
    aceEditor.setOptions({
      readOnly: isReadOnly
    });
    aceEditor.setShowPrintMargin(false);
    aceEditor.setFontSize('14px');
    aceSession.setMode('ace/mode/json');
    aceSession.setTabSize(this.indentation);
    aceSession.setUseSoftTabs(true);
    aceSession.setUseWrapMode(true);

    // replace ace setAnnotations with custom function that also covers jsoneditor annotations
    var originalSetAnnotations = aceSession.setAnnotations;
    aceSession.setAnnotations = function (annotations) {
      originalSetAnnotations.call(this, annotations && annotations.length ? annotations : me.annotations);
    };

    // disable Ctrl+L quickkey of Ace (is used by the browser to select the address bar)
    aceEditor.commands.bindKey('Ctrl-L', null);
    aceEditor.commands.bindKey('Command-L', null);

    // disable the quickkeys we want to use for Format and Compact
    aceEditor.commands.bindKey('Ctrl-\\', null);
    aceEditor.commands.bindKey('Command-\\', null);
    aceEditor.commands.bindKey('Ctrl-Shift-\\', null);
    aceEditor.commands.bindKey('Command-Shift-\\', null);
    this.aceEditor = aceEditor;

    // register onchange event
    aceEditor.on('change', this._onChange.bind(this));
    aceEditor.on('changeSelection', this._onSelect.bind(this));
  } else {
    // load a plain text textarea
    var textarea = document.createElement('textarea');
    textarea.className = 'jsoneditor-text';
    textarea.spellcheck = false;
    this.content.appendChild(textarea);
    this.textarea = textarea;
    this.textarea.readOnly = isReadOnly;

    // register onchange event
    if (this.textarea.oninput === null) {
      this.textarea.oninput = this._onChange.bind(this);
    } else {
      // oninput is undefined. For IE8-
      this.textarea.onchange = this._onChange.bind(this);
    }
    textarea.onselect = this._onSelect.bind(this);
    textarea.onmousedown = this._onMouseDown.bind(this);
    textarea.onblur = this._onBlur.bind(this);
  }
  this._updateHistoryButtons();
  var errorTableVisible = Array.isArray(this.options.showErrorTable) ? this.options.showErrorTable.includes(this.mode) : this.options.showErrorTable === true;
  this.errorTable = new ErrorTable/* ErrorTable */.N({
    errorTableVisible: errorTableVisible,
    onToggleVisibility: function onToggleVisibility() {
      me._validateAndCatch();
    },
    onFocusLine: function onFocusLine(line) {
      me.isFocused = true;
      if (!isNaN(line)) {
        me.setTextSelection({
          row: line,
          column: 1
        }, {
          row: line,
          column: 1000
        });
      }
    },
    onChangeHeight: function onChangeHeight(height) {
      // TODO: change CSS to using flex box, remove setting height using JavaScript
      var statusBarHeight = me.dom.statusBar ? me.dom.statusBar.clientHeight : 0;
      var totalHeight = height + statusBarHeight + 1;
      me.content.style.marginBottom = -totalHeight + 'px';
      me.content.style.paddingBottom = totalHeight + 'px';
    }
  });
  this.frame.appendChild(this.errorTable.getErrorTable());
  if (options.statusBar) {
    (0,util.addClassName)(this.content, 'has-status-bar');
    this.curserInfoElements = {};
    var statusBar = document.createElement('div');
    this.dom.statusBar = statusBar;
    statusBar.className = 'jsoneditor-statusbar';
    this.frame.appendChild(statusBar);
    var lnLabel = document.createElement('span');
    lnLabel.className = 'jsoneditor-curserinfo-label';
    lnLabel.innerText = 'Ln:';
    var lnVal = document.createElement('span');
    lnVal.className = 'jsoneditor-curserinfo-val';
    lnVal.innerText = '1';
    statusBar.appendChild(lnLabel);
    statusBar.appendChild(lnVal);
    var colLabel = document.createElement('span');
    colLabel.className = 'jsoneditor-curserinfo-label';
    colLabel.innerText = 'Col:';
    var colVal = document.createElement('span');
    colVal.className = 'jsoneditor-curserinfo-val';
    colVal.innerText = '1';
    statusBar.appendChild(colLabel);
    statusBar.appendChild(colVal);
    this.curserInfoElements.colVal = colVal;
    this.curserInfoElements.lnVal = lnVal;
    var countLabel = document.createElement('span');
    countLabel.className = 'jsoneditor-curserinfo-label';
    countLabel.innerText = 'characters selected';
    countLabel.style.display = 'none';
    var countVal = document.createElement('span');
    countVal.className = 'jsoneditor-curserinfo-count';
    countVal.innerText = '0';
    countVal.style.display = 'none';
    this.curserInfoElements.countLabel = countLabel;
    this.curserInfoElements.countVal = countVal;
    statusBar.appendChild(countVal);
    statusBar.appendChild(countLabel);
    statusBar.appendChild(this.errorTable.getErrorCounter());
    statusBar.appendChild(this.errorTable.getWarningIcon());
    statusBar.appendChild(this.errorTable.getErrorIcon());
  }
  this.setSchema(this.options.schema, this.options.schemaRefs);
};
textmode._onSchemaChange = function (schema, schemaRefs) {
  if (!this.aceEditor) {
    return;
  }
  if (this.options.allowSchemaSuggestions && schema) {
    this.aceEditor.setOption('enableBasicAutocompletion', [new SchemaTextCompleter(schema, schemaRefs)]);
    this.aceEditor.setOption('enableLiveAutocompletion', true);
  } else {
    this.aceEditor.setOption('enableBasicAutocompletion', undefined);
    this.aceEditor.setOption('enableLiveAutocompletion', false);
  }
};

/**
 * Handle a change:
 * - Validate JSON schema
 * - Send a callback to the onChange listener if provided
 * @private
 */
textmode._onChange = function () {
  var _this2 = this;
  if (this.onChangeDisabled) {
    return;
  }

  // enable/disable undo/redo buttons
  setTimeout(function () {
    if (_this2._updateHistoryButtons) {
      _this2._updateHistoryButtons();
    }
  });

  // validate JSON schema (if configured)
  this._debouncedValidate();

  // trigger the onChange callback
  if (this.options.onChange) {
    try {
      this.options.onChange();
    } catch (err) {
      console.error('Error in onChange callback: ', err);
    }
  }

  // trigger the onChangeText callback
  if (this.options.onChangeText) {
    try {
      this.options.onChangeText(this.getText());
    } catch (err) {
      console.error('Error in onChangeText callback: ', err);
    }
  }
};
textmode._updateHistoryButtons = function () {
  if (this.aceEditor && this.dom.undo && this.dom.redo) {
    var undoManager = this.aceEditor.getSession().getUndoManager();
    if (undoManager && undoManager.hasUndo && undoManager.hasRedo) {
      this.dom.undo.disabled = !undoManager.hasUndo();
      this.dom.redo.disabled = !undoManager.hasRedo();
    }
  }
};

/**
 * Open a sort modal
 * @private
 */
textmode._showSortModal = function () {
  try {
    var onSort = function onSort(sortedBy) {
      if (Array.isArray(json)) {
        var sortedJson = (0,util.sort)(json, sortedBy.path, sortedBy.direction);
        me.sortedBy = sortedBy;
        me.update(sortedJson);
      }
      if ((0,util.isObject)(json)) {
        var _sortedJson = (0,util.sortObjectKeys)(json, sortedBy.direction);
        me.sortedBy = sortedBy;
        me.update(_sortedJson);
      }
    };
    var me = this;
    var container = this.options.modalAnchor || constants/* DEFAULT_MODAL_ANCHOR */.ai;
    var json = this.get();
    (0,showSortModal.showSortModal)(container, json, onSort, me.sortedBy);
  } catch (err) {
    this._onError(err);
  }
};

/**
 * Open a transform modal
 * @private
 */
textmode._showTransformModal = function () {
  var _this3 = this;
  try {
    var _this$options = this.options,
      modalAnchor = _this$options.modalAnchor,
      _createQuery = _this$options.createQuery,
      _executeQuery = _this$options.executeQuery,
      queryDescription = _this$options.queryDescription;
    var json = this.get();
    (0,showTransformModal.showTransformModal)({
      container: modalAnchor || constants/* DEFAULT_MODAL_ANCHOR */.ai,
      json: json,
      queryDescription: queryDescription,
      // can be undefined
      createQuery: _createQuery,
      executeQuery: _executeQuery,
      onTransform: function onTransform(query) {
        var updatedJson = _executeQuery(json, query);
        _this3.update(updatedJson);
      }
    });
  } catch (err) {
    this._onError(err);
  }
};

/**
 * Handle text selection
 * Calculates the cursor position and selection range and updates menu
 * @private
 */
textmode._onSelect = function () {
  this._updateCursorInfo();
  this._emitSelectionChange();
};

/**
 * Event handler for keydown. Handles shortcut keys
 * @param {Event} event
 * @private
 */
textmode._onKeyDown = function (event) {
  var keynum = event.which || event.keyCode;
  var handled = false;
  if (keynum === 73 && event.ctrlKey) {
    if (event.shiftKey) {
      // Ctrl+Shift+I
      this.compact();
      this._onChange();
    } else {
      // Ctrl+I
      this.format();
      this._onChange();
    }
    handled = true;
  }
  if (handled) {
    event.preventDefault();
    event.stopPropagation();
  }
  this._updateCursorInfo();
  this._emitSelectionChange();
};

/**
 * Event handler for mousedown.
 * @private
 */
textmode._onMouseDown = function () {
  this._updateCursorInfo();
  this._emitSelectionChange();
};

/**
 * Event handler for blur.
 * @private
 */
textmode._onBlur = function () {
  var me = this;
  // this allows to avoid blur when clicking inner elements (like the errors panel)
  // just make sure to set the isFocused to true on the inner element onclick callback
  setTimeout(function () {
    if (!me.isFocused) {
      me._updateCursorInfo();
      me._emitSelectionChange();
    }
    me.isFocused = false;
  });
};

/**
 * Update the cursor info and the status bar, if presented
 */
textmode._updateCursorInfo = function () {
  var me = this;
  var line, col, count;
  if (this.textarea) {
    setTimeout(function () {
      // this to verify we get the most updated textarea cursor selection
      var selectionRange = (0,util.getInputSelection)(me.textarea);
      if (selectionRange.startIndex !== selectionRange.endIndex) {
        count = selectionRange.endIndex - selectionRange.startIndex;
      }
      if (count && me.cursorInfo && me.cursorInfo.line === selectionRange.end.row && me.cursorInfo.column === selectionRange.end.column) {
        line = selectionRange.start.row;
        col = selectionRange.start.column;
      } else {
        line = selectionRange.end.row;
        col = selectionRange.end.column;
      }
      me.cursorInfo = {
        line: line,
        column: col,
        count: count
      };
      if (me.options.statusBar) {
        updateDisplay();
      }
    }, 0);
  } else if (this.aceEditor && this.curserInfoElements) {
    var curserPos = this.aceEditor.getCursorPosition();
    var selectedText = this.aceEditor.getSelectedText();
    line = curserPos.row + 1;
    col = curserPos.column + 1;
    count = selectedText.length;
    me.cursorInfo = {
      line: line,
      column: col,
      count: count
    };
    if (this.options.statusBar) {
      updateDisplay();
    }
  }
  function updateDisplay() {
    if (me.curserInfoElements.countVal.innerText !== count) {
      me.curserInfoElements.countVal.innerText = count;
      me.curserInfoElements.countVal.style.display = count ? 'inline' : 'none';
      me.curserInfoElements.countLabel.style.display = count ? 'inline' : 'none';
    }
    me.curserInfoElements.lnVal.innerText = line;
    me.curserInfoElements.colVal.innerText = col;
  }
};

/**
 * emits selection change callback, if given
 * @private
 */
textmode._emitSelectionChange = function () {
  if (this._selectionChangedHandler) {
    var currentSelection = this.getTextSelection();
    this._selectionChangedHandler(currentSelection.start, currentSelection.end, currentSelection.text);
  }
};

/**
 * refresh ERROR annotations state
 * error annotations are handled by the ace json mode (ace/mode/json)
 * validation annotations are handled by this mode
 * therefore in order to refresh we send only the annotations of error type in order to maintain its state
 * @private
 */
textmode._refreshAnnotations = function () {
  var session = this.aceEditor && this.aceEditor.getSession();
  if (session) {
    var errEnnotations = session.getAnnotations().filter(function (annotation) {
      return annotation.type === 'error';
    });
    session.setAnnotations(errEnnotations);
  }
};

/**
 * Destroy the editor. Clean up DOM, event listeners, and web workers.
 */
textmode.destroy = function () {
  // remove old ace editor
  if (this.aceEditor) {
    this.aceEditor.destroy();
    this.aceEditor = null;
  }
  if (this.frame && this.container && this.frame.parentNode === this.container) {
    this.container.removeChild(this.frame);
  }
  if (this.modeSwitcher) {
    this.modeSwitcher.destroy();
    this.modeSwitcher = null;
  }
  this.textarea = null;
  this._debouncedValidate = null;

  // Removing the FocusTracker set to track the editor's focus event
  this.frameFocusTracker.destroy();
};

/**
 * Compact the code in the text editor
 */
textmode.compact = function () {
  var json = this.get();
  var text = JSON.stringify(json);
  this.updateText(text);
};

/**
 * Format the code in the text editor
 */
textmode.format = function () {
  var json = this.get();
  var text = JSON.stringify(json, null, this.indentation);
  this.updateText(text);
};

/**
 * Repair the code in the text editor
 */
textmode.repair = function () {
  var text = this.getText();
  try {
    var repairedText = (0,jsonrepair/* jsonrepair */.m)(text);
    this.updateText(repairedText);
  } catch (err) {
    // repair was not successful, do nothing
  }
};

/**
 * Set focus to the formatter
 */
textmode.focus = function () {
  if (this.textarea) {
    this.textarea.focus();
  }
  if (this.aceEditor) {
    this.aceEditor.focus();
  }
};

/**
 * Resize the formatter
 */
textmode.resize = function () {
  if (this.aceEditor) {
    var force = false;
    this.aceEditor.resize(force);
  }
};

/**
 * Set json data in the formatter
 * @param {*} json
 */
textmode.set = function (json) {
  this.setText(JSON.stringify(json, null, this.indentation));
};

/**
 * Update data. Same as calling `set` in text/code mode.
 * @param {*} json
 */
textmode.update = function (json) {
  this.updateText(JSON.stringify(json, null, this.indentation));
};

/**
 * Get json data from the formatter
 * @return {*} json
 */
textmode.get = function () {
  var text = this.getText();
  return (0,util.parse)(text); // this can throw an error
};

/**
 * Get the text contents of the editor
 * @return {String} jsonText
 */
textmode.getText = function () {
  if (this.textarea) {
    return this.textarea.value;
  }
  if (this.aceEditor) {
    return this.aceEditor.getValue();
  }
  return '';
};

/**
 * Set the text contents of the editor and optionally clear the history
 * @param {String} jsonText
 * @param {boolean} clearHistory   Only applicable for mode 'code'
 * @private
 */
textmode._setText = function (jsonText, clearHistory) {
  var _this4 = this;
  var text = this.options.escapeUnicode === true ? (0,util.escapeUnicodeChars)(jsonText) : jsonText;
  if (this.textarea) {
    this.textarea.value = text;
  }
  if (this.aceEditor) {
    // prevent emitting onChange events while setting new text
    this.onChangeDisabled = true;
    this.aceEditor.setValue(text, -1);
    this.onChangeDisabled = false;
    if (clearHistory) {
      // prevent initial undo action clearing the initial contents
      var me = this;
      setTimeout(function () {
        if (me.aceEditor) {
          me.aceEditor.session.getUndoManager().reset();
        }
      });
    }
    setTimeout(function () {
      if (_this4._updateHistoryButtons) {
        _this4._updateHistoryButtons();
      }
    });
  }

  // validate JSON schema
  this._debouncedValidate();
};

/**
 * Set the text contents of the editor
 * @param {String} jsonText
 */
textmode.setText = function (jsonText) {
  this._setText(jsonText, true);
};

/**
 * Update the text contents
 * @param {string} jsonText
 */
textmode.updateText = function (jsonText) {
  // don't update if there are no changes
  if (this.getText() === jsonText) {
    return;
  }
  this._setText(jsonText, false);
};

/**
 * Validate current JSON object against the configured JSON schema
 * Throws an exception when no JSON schema is configured
 */
textmode.validate = function () {
  var _this5 = this;
  var schemaErrors = [];
  var parseErrors = [];
  var json;
  try {
    json = this.get(); // this can fail when there is no valid json

    // execute JSON schema validation (ajv)
    if (this.validateSchema) {
      var valid = this.validateSchema(json);
      if (!valid) {
        schemaErrors = this.validateSchema.errors.map(function (error) {
          error.type = 'validation';
          return (0,util.improveSchemaError)(error);
        });
      }
    }

    // execute custom validation and after than merge and render all errors
    // TODO: implement a better mechanism for only using the last validation action
    this.validationSequence = (this.validationSequence || 0) + 1;
    var me = this;
    var seq = this.validationSequence;
    return validateCustom(json, this.options.onValidate).then(function (customValidationErrors) {
      // only apply when there was no other validation started whilst resolving async results
      if (seq === me.validationSequence) {
        var errors = schemaErrors.concat(parseErrors).concat(customValidationErrors);
        me._renderErrors(errors);
        if (typeof _this5.options.onValidationError === 'function' && (0,util.isValidationErrorChanged)(errors, _this5.lastSchemaErrors)) {
          _this5.options.onValidationError.call(_this5, errors);
        }
        _this5.lastSchemaErrors = errors;
      }
      return _this5.lastSchemaErrors;
    });
  } catch (err) {
    if (this.getText()) {
      // try to extract the line number from the jsonlint error message
      var match = /\w*line\s*(\d+)\w*/g.exec(err.message);
      var line;
      if (match) {
        line = +match[1];
      }
      parseErrors = [{
        type: 'error',
        message: err.message.replace(/\n/g, '<br>'),
        line: line
      }];
    }
    this._renderErrors(parseErrors);
    if (typeof this.options.onValidationError === 'function' && (0,util.isValidationErrorChanged)(parseErrors, this.lastSchemaErrors)) {
      this.options.onValidationError.call(this, parseErrors);
    }
    this.lastSchemaErrors = parseErrors;
    return Promise.resolve(this.lastSchemaErrors);
  }
};
textmode._validateAndCatch = function () {
  this.validate()["catch"](function (err) {
    console.error('Error running validation:', err);
  });
};
textmode._renderErrors = function (errors) {
  var jsonText = this.getText();
  var errorPaths = [];
  errors.reduce(function (acc, curr) {
    if (typeof curr.dataPath === 'string' && acc.indexOf(curr.dataPath) === -1) {
      acc.push(curr.dataPath);
    }
    return acc;
  }, errorPaths);
  var errorLocations = (0,util.getPositionForPath)(jsonText, errorPaths);

  // render annotations in Ace Editor (if any)
  if (this.aceEditor) {
    this.annotations = errorLocations.map(function (errLoc) {
      var validationErrors = errors.filter(function (err) {
        return err.dataPath === errLoc.path;
      });
      var message = validationErrors.map(function (err) {
        return err.message;
      }).join('\n');
      if (message) {
        return {
          row: errLoc.line,
          column: errLoc.column,
          text: 'Schema validation error' + (validationErrors.length !== 1 ? 's' : '') + ': \n' + message,
          type: 'warning',
          source: 'jsoneditor'
        };
      }
      return {};
    });
    this._refreshAnnotations();
  }

  // render errors in the errors table (if any)
  this.errorTable.setErrors(errors, errorLocations);

  // update the height of the ace editor
  if (this.aceEditor) {
    var force = false;
    this.aceEditor.resize(force);
  }
};

/**
 * Get the selection details
 * @returns {{start:{row:Number, column:Number},end:{row:Number, column:Number},text:String}}
 */
textmode.getTextSelection = function () {
  var selection = {};
  if (this.textarea) {
    var selectionRange = (0,util.getInputSelection)(this.textarea);
    if (this.cursorInfo && this.cursorInfo.line === selectionRange.end.row && this.cursorInfo.column === selectionRange.end.column) {
      // selection direction is bottom => up
      selection.start = selectionRange.end;
      selection.end = selectionRange.start;
    } else {
      selection = selectionRange;
    }
    return {
      start: selection.start,
      end: selection.end,
      text: this.textarea.value.substring(selectionRange.startIndex, selectionRange.endIndex)
    };
  }
  if (this.aceEditor) {
    var aceSelection = this.aceEditor.getSelection();
    var selectedText = this.aceEditor.getSelectedText();
    var range = aceSelection.getRange();
    var lead = aceSelection.getSelectionLead();
    if (lead.row === range.end.row && lead.column === range.end.column) {
      selection = range;
    } else {
      // selection direction is bottom => up
      selection.start = range.end;
      selection.end = range.start;
    }
    return {
      start: {
        row: selection.start.row + 1,
        column: selection.start.column + 1
      },
      end: {
        row: selection.end.row + 1,
        column: selection.end.column + 1
      },
      text: selectedText
    };
  }
};

/**
 * Callback registration for selection change
 * @param {selectionCallback} callback
 *
 * @callback selectionCallback
 */
textmode.onTextSelectionChange = function (callback) {
  if (typeof callback === 'function') {
    this._selectionChangedHandler = (0,util.debounce)(callback, this.DEBOUNCE_INTERVAL);
  }
};

/**
 * Set selection on editor's text
 * @param {{row:Number, column:Number}} startPos selection start position
 * @param {{row:Number, column:Number}} endPos selected end position
 */
textmode.setTextSelection = function (startPos, endPos) {
  if (!startPos || !endPos) return;
  if (this.textarea) {
    var startIndex = (0,util.getIndexForPosition)(this.textarea, startPos.row, startPos.column);
    var endIndex = (0,util.getIndexForPosition)(this.textarea, endPos.row, endPos.column);
    if (startIndex > -1 && endIndex > -1) {
      if (this.textarea.setSelectionRange) {
        this.textarea.focus();
        this.textarea.setSelectionRange(startIndex, endIndex);
      } else if (this.textarea.createTextRange) {
        // IE < 9
        var range = this.textarea.createTextRange();
        range.collapse(true);
        range.moveEnd('character', endIndex);
        range.moveStart('character', startIndex);
        range.select();
      }
      var rows = (this.textarea.value.match(/\n/g) || []).length + 1;
      var lineHeight = this.textarea.scrollHeight / rows;
      var selectionScrollPos = startPos.row * lineHeight;
      this.textarea.scrollTop = selectionScrollPos > this.textarea.clientHeight ? selectionScrollPos - this.textarea.clientHeight / 2 : 0;
    }
  } else if (this.aceEditor) {
    var _range = {
      start: {
        row: startPos.row - 1,
        column: startPos.column - 1
      },
      end: {
        row: endPos.row - 1,
        column: endPos.column - 1
      }
    };
    this.aceEditor.selection.setRange(_range);
    this.aceEditor.scrollToLine(startPos.row - 1, true);
  }
};
function load() {
  try {
    this.format();
  } catch (err) {
    // in case of an error, just move on, failing formatting is not a big deal
  }
}

// define modes
var textModeMixins = [{
  mode: 'text',
  mixin: textmode,
  data: 'text',
  load: load
}, {
  mode: 'code',
  mixin: textmode,
  data: 'text',
  load: load
}];

/***/ }),

/***/ 633:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  treeModeMixins: function() { return /* binding */ treeModeMixins; }
});

;// ./src/js/autocomplete.js


var defaultFilterFunction = {
  start: function start(token, match, config) {
    return match.indexOf(token) === 0;
  },
  contain: function contain(token, match, config) {
    return match.indexOf(token) > -1;
  }
};
function autocomplete(config) {
  config = config || {};
  config.filter = config.filter || 'start';
  config.trigger = config.trigger || 'keydown';
  config.confirmKeys = config.confirmKeys || [39, 35, 9]; // right, end, tab
  config.caseSensitive = config.caseSensitive || false; // autocomplete case sensitive

  var fontSize = '';
  var fontFamily = '';
  var wrapper = document.createElement('div');
  wrapper.style.position = 'relative';
  wrapper.style.outline = '0';
  wrapper.style.border = '0';
  wrapper.style.margin = '0';
  wrapper.style.padding = '0';
  var dropDown = document.createElement('div');
  dropDown.className = 'autocomplete dropdown';
  dropDown.style.position = 'absolute';
  dropDown.style.visibility = 'hidden';
  var spacer;
  var leftSide; // <-- it will contain the leftSide part of the textfield (the bit that was already autocompleted)
  var createDropDownController = function createDropDownController(elem, rs) {
    var rows = [];
    var ix = 0;
    var oldIndex = -1;

    // TODO: move this styling in JS to SCSS
    var onMouseOver = function onMouseOver() {
      this.style.backgroundColor = '#ddd';
    };
    var onMouseOut = function onMouseOut() {
      this.style.backgroundColor = '';
    };
    var onMouseDown = function onMouseDown() {
      p.hide();
      p.onmouseselection(this.__hint, p.rs);
    };
    var p = {
      rs: rs,
      hide: function hide() {
        elem.style.visibility = 'hidden';
        // rs.hideDropDown();
      },
      refresh: function refresh(token, array) {
        elem.style.visibility = 'hidden';
        ix = 0;
        elem.textContent = '';
        var vph = window.innerHeight || document.documentElement.clientHeight;
        var rect = elem.parentNode.getBoundingClientRect();
        var distanceToTop = rect.top - 6; // heuristic give 6px
        var distanceToBottom = vph - rect.bottom - 6; // distance from the browser border.

        rows = [];
        var filterFn = typeof config.filter === 'function' ? config.filter : defaultFilterFunction[config.filter];
        var filtered = !filterFn ? [] : array.filter(function (match) {
          return filterFn(config.caseSensitive ? token : token.toLowerCase(), config.caseSensitive ? match : match.toLowerCase(), config);
        });
        rows = filtered.map(function (row) {
          var divRow = document.createElement('div');
          divRow.className = 'item';
          // divRow.style.color = config.color;
          divRow.onmouseover = onMouseOver;
          divRow.onmouseout = onMouseOut;
          divRow.onmousedown = onMouseDown;
          divRow.__hint = row;
          divRow.textContent = '';
          divRow.appendChild(document.createTextNode(row.substring(0, token.length)));
          var b = document.createElement('b');
          b.appendChild(document.createTextNode(row.substring(token.length)));
          divRow.appendChild(b);
          elem.appendChild(divRow);
          return divRow;
        });
        if (rows.length === 0) {
          return; // nothing to show.
        }
        if (rows.length === 1 && (token.toLowerCase() === rows[0].__hint.toLowerCase() && !config.caseSensitive || token === rows[0].__hint && config.caseSensitive)) {
          return; // do not show the dropDown if it has only one element which matches what we have just displayed.
        }
        if (rows.length < 2) return;
        p.highlight(0);
        if (distanceToTop > distanceToBottom * 3) {
          // Heuristic (only when the distance to the to top is 4 times more than distance to the bottom
          elem.style.maxHeight = distanceToTop + 'px'; // we display the dropDown on the top of the input text
          elem.style.top = '';
          elem.style.bottom = '100%';
        } else {
          elem.style.top = '100%';
          elem.style.bottom = '';
          elem.style.maxHeight = distanceToBottom + 'px';
        }
        elem.style.visibility = 'visible';
      },
      highlight: function highlight(index) {
        if (oldIndex !== -1 && rows[oldIndex]) {
          rows[oldIndex].className = 'item';
        }
        rows[index].className = 'item hover';
        oldIndex = index;
      },
      move: function move(step) {
        // moves the selection either up or down (unless it's not possible) step is either +1 or -1.
        if (elem.style.visibility === 'hidden') return ''; // nothing to move if there is no dropDown. (this happens if the user hits escape and then down or up)
        if (ix + step === -1 || ix + step === rows.length) return rows[ix].__hint; // NO CIRCULAR SCROLLING.
        ix += step;
        p.highlight(ix);
        return rows[ix].__hint; // txtShadow.value = uRows[uIndex].__hint ;
      },
      onmouseselection: function onmouseselection() {} // it will be overwritten.
    };
    return p;
  };
  function setEndOfContenteditable(contentEditableElement) {
    var range, selection;
    if (document.createRange) {
      // Firefox, Chrome, Opera, Safari, IE 9+
      range = document.createRange(); // Create a range (a range is a like the selection but invisible)
      range.selectNodeContents(contentEditableElement); // Select the entire contents of the element with the range
      range.collapse(false); // collapse the range to the end point. false means collapse to end rather than the start
      selection = window.getSelection(); // get the selection object (allows you to change selection)
      selection.removeAllRanges(); // remove any selections already made
      selection.addRange(range); // make the range you have just created the visible selection
    } else if (document.selection) {
      // IE 8 and lower
      range = document.body.createTextRange(); // Create a range (a range is a like the selection but invisible)
      range.moveToElementText(contentEditableElement); // Select the entire contents of the element with the range
      range.collapse(false); // collapse the range to the end point. false means collapse to end rather than the start
      range.select(); // Select the range (make it the visible selection
    }
  }
  function calculateWidthForText(text) {
    if (spacer === undefined) {
      // on first call only.
      spacer = document.createElement('span');
      spacer.style.visibility = 'hidden';
      spacer.style.position = 'fixed';
      spacer.style.outline = '0';
      spacer.style.margin = '0';
      spacer.style.padding = '0';
      spacer.style.border = '0';
      spacer.style.left = '0';
      spacer.style.whiteSpace = 'pre';
      spacer.style.fontSize = fontSize;
      spacer.style.fontFamily = fontFamily;
      spacer.style.fontWeight = 'normal';
      document.body.appendChild(spacer);
    }
    spacer.textContent = text;
    return spacer.getBoundingClientRect().right;
  }
  var rs = {
    onArrowDown: function onArrowDown() {},
    // defaults to no action.
    onArrowUp: function onArrowUp() {},
    // defaults to no action.
    onEnter: function onEnter() {},
    // defaults to no action.
    onTab: function onTab() {},
    // defaults to no action.
    startFrom: 0,
    options: [],
    element: null,
    elementHint: null,
    elementStyle: null,
    wrapper: wrapper,
    // Only to allow  easy access to the HTML elements to the final user (possibly for minor customizations)
    show: function show(element, startPos, options) {
      var _this = this;
      this.startFrom = startPos;
      this.wrapper.remove();
      if (this.elementHint) {
        this.elementHint.remove();
        this.elementHint = null;
      }
      if (fontSize === '') {
        fontSize = window.getComputedStyle(element).getPropertyValue('font-size');
      }
      if (fontFamily === '') {
        fontFamily = window.getComputedStyle(element).getPropertyValue('font-family');
      }
      dropDown.style.marginLeft = '0';
      dropDown.style.marginTop = element.getBoundingClientRect().height + 'px';
      this.options = options.map(String);
      if (this.element !== element) {
        this.element = element;
        this.elementStyle = {
          zIndex: this.element.style.zIndex,
          position: this.element.style.position,
          backgroundColor: this.element.style.backgroundColor,
          borderColor: this.element.style.borderColor
        };
      }
      this.element.style.zIndex = 3;
      this.element.style.position = 'relative';
      this.element.style.backgroundColor = 'transparent';
      this.element.style.borderColor = 'transparent';
      this.elementHint = element.cloneNode();
      this.elementHint.className = 'autocomplete hint';
      this.elementHint.style.zIndex = 2;
      this.elementHint.style.position = 'absolute';
      this.elementHint.onfocus = function () {
        _this.element.focus();
      };
      if (this.element.addEventListener) {
        this.element.removeEventListener('keydown', keyDownHandler);
        this.element.addEventListener('keydown', keyDownHandler, false);
        this.element.removeEventListener('blur', onBlurHandler);
        this.element.addEventListener('blur', onBlurHandler, false);
      }
      wrapper.appendChild(this.elementHint);
      wrapper.appendChild(dropDown);
      element.parentElement.appendChild(wrapper);
      this.repaint(element);
    },
    setText: function setText(text) {
      this.element.innerText = text;
    },
    getText: function getText() {
      return this.element.innerText;
    },
    hideDropDown: function hideDropDown() {
      this.wrapper.remove();
      if (this.elementHint) {
        this.elementHint.remove();
        this.elementHint = null;
        dropDownController.hide();
        this.element.style.zIndex = this.elementStyle.zIndex;
        this.element.style.position = this.elementStyle.position;
        this.element.style.backgroundColor = this.elementStyle.backgroundColor;
        this.element.style.borderColor = this.elementStyle.borderColor;
      }
    },
    repaint: function repaint(element) {
      var text = element.innerText;
      text = text.replace('\n', '');
      var optionsLength = this.options.length;

      // breaking text in leftSide and token.

      var token = text.substring(this.startFrom);
      leftSide = text.substring(0, this.startFrom);
      for (var i = 0; i < optionsLength; i++) {
        var opt = this.options[i];
        if (!config.caseSensitive && opt.toLowerCase().indexOf(token.toLowerCase()) === 0 || config.caseSensitive && opt.indexOf(token) === 0) {
          // <-- how about upperCase vs. lowercase
          this.elementHint.innerText = leftSide + token + opt.substring(token.length);
          this.elementHint.realInnerText = leftSide + opt;
          break;
        }
      }
      // moving the dropDown and refreshing it.
      dropDown.style.left = calculateWidthForText(leftSide) + 'px';
      dropDownController.refresh(token, this.options);
      this.elementHint.style.width = calculateWidthForText(this.elementHint.innerText) + 10 + 'px';
      var wasDropDownHidden = dropDown.style.visibility === 'hidden';
      if (!wasDropDownHidden) {
        this.elementHint.style.width = calculateWidthForText(this.elementHint.innerText) + dropDown.clientWidth + 'px';
      }
    }
  };
  var dropDownController = createDropDownController(dropDown, rs);
  var keyDownHandler = function (e) {
    // console.log("Keydown:" + e.keyCode);
    e = e || window.event;
    var keyCode = e.keyCode;
    if (this.elementHint == null) return;
    if (keyCode === 33) {
      return;
    } // page up (do nothing)
    if (keyCode === 34) {
      return;
    } // page down (do nothing);

    if (keyCode === 27) {
      // escape
      rs.hideDropDown();
      rs.element.focus();
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    var text = this.element.innerText;
    text = text.replace('\n', '');
    if (config.confirmKeys.indexOf(keyCode) >= 0) {
      //  (autocomplete triggered)
      if (keyCode === 9) {
        if (this.elementHint.innerText.length === 0) {
          rs.onTab();
        }
      }
      if (this.elementHint.innerText.length > 0) {
        // if there is a hint
        if (this.element.innerText !== this.elementHint.realInnerText) {
          this.element.innerText = this.elementHint.realInnerText;
          rs.hideDropDown();
          setEndOfContenteditable(this.element);
          if (keyCode === 9) {
            rs.element.focus();
            e.preventDefault();
            e.stopPropagation();
          }
        }
      }
      return;
    }
    if (keyCode === 13) {
      // enter  (autocomplete triggered)
      if (this.elementHint.innerText.length === 0) {
        // if there is a hint
        rs.onEnter();
      } else {
        var wasDropDownHidden = dropDown.style.visibility === 'hidden';
        dropDownController.hide();
        if (wasDropDownHidden) {
          rs.hideDropDown();
          rs.element.focus();
          rs.onEnter();
          return;
        }
        this.element.innerText = this.elementHint.realInnerText;
        rs.hideDropDown();
        setEndOfContenteditable(this.element);
        e.preventDefault();
        e.stopPropagation();
      }
      return;
    }
    if (keyCode === 40) {
      // down
      var token = text.substring(this.startFrom);
      var m = dropDownController.move(+1);
      if (m === '') {
        rs.onArrowDown();
      }
      this.elementHint.innerText = leftSide + token + m.substring(token.length);
      this.elementHint.realInnerText = leftSide + m;
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    if (keyCode === 38) {
      // up
      var _token = text.substring(this.startFrom);
      var _m = dropDownController.move(-1);
      if (_m === '') {
        rs.onArrowUp();
      }
      this.elementHint.innerText = leftSide + _token + _m.substring(_token.length);
      this.elementHint.realInnerText = leftSide + _m;
      e.preventDefault();
      e.stopPropagation();
    }
  }.bind(rs);
  var onBlurHandler = function onBlurHandler(e) {
    rs.hideDropDown();
    // console.log("Lost focus.");
  };
  dropDownController.onmouseselection = function (text, rs) {
    rs.element.innerText = rs.elementHint.innerText = leftSide + text;
    rs.hideDropDown();
    window.setTimeout(function () {
      rs.element.focus();
      setEndOfContenteditable(rs.element);
    }, 1);
  };
  return rs;
}
// EXTERNAL MODULE: ./src/js/ContextMenu.js
var ContextMenu = __webpack_require__(545);
// EXTERNAL MODULE: ./src/js/FocusTracker.js
var FocusTracker = __webpack_require__(877);
;// ./src/js/Highlighter.js


/**
 * The highlighter can highlight/unhighlight a node, and
 * animate the visibility of a context menu.
 * @constructor Highlighter
 */
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var Highlighter = /*#__PURE__*/function () {
  function Highlighter() {
    _classCallCheck(this, Highlighter);
    this.locked = false;
  }

  /**
   * Hightlight given node and its childs
   * @param {Node} node
   */
  return _createClass(Highlighter, [{
    key: "highlight",
    value: function highlight(node) {
      if (this.locked) {
        return;
      }
      if (this.node !== node) {
        // unhighlight current node
        if (this.node) {
          this.node.setHighlight(false);
        }

        // highlight new node
        this.node = node;
        this.node.setHighlight(true);
      }

      // cancel any current timeout
      this._cancelUnhighlight();
    }

    /**
     * Unhighlight currently highlighted node.
     * Will be done after a delay
     */
  }, {
    key: "unhighlight",
    value: function unhighlight() {
      if (this.locked) {
        return;
      }
      var me = this;
      if (this.node) {
        this._cancelUnhighlight();

        // do the unhighlighting after a small delay, to prevent re-highlighting
        // the same node when moving from the drag-icon to the contextmenu-icon
        // or vice versa.
        this.unhighlightTimer = setTimeout(function () {
          me.node.setHighlight(false);
          me.node = undefined;
          me.unhighlightTimer = undefined;
        }, 0);
      }
    }

    /**
     * Cancel an unhighlight action (if before the timeout of the unhighlight action)
     * @private
     */
  }, {
    key: "_cancelUnhighlight",
    value: function _cancelUnhighlight() {
      if (this.unhighlightTimer) {
        clearTimeout(this.unhighlightTimer);
        this.unhighlightTimer = undefined;
      }
    }

    /**
     * Lock highlighting or unhighlighting nodes.
     * methods highlight and unhighlight do not work while locked.
     */
  }, {
    key: "lock",
    value: function lock() {
      this.locked = true;
    }

    /**
     * Unlock highlighting or unhighlighting nodes
     */
  }, {
    key: "unlock",
    value: function unlock() {
      this.locked = false;
    }
  }]);
}();
// EXTERNAL MODULE: ./src/js/i18n.js
var i18n = __webpack_require__(57);
// EXTERNAL MODULE: ./src/js/jmespathQuery.js
var jmespathQuery = __webpack_require__(359);
// EXTERNAL MODULE: ./src/js/ModeSwitcher.js
var ModeSwitcher = __webpack_require__(389);
// EXTERNAL MODULE: ./node_modules/javascript-natural-sort/naturalSort.js
var naturalSort = __webpack_require__(342);
var naturalSort_default = /*#__PURE__*/__webpack_require__.n(naturalSort);
// EXTERNAL MODULE: ./src/js/createAbsoluteAnchor.js
var createAbsoluteAnchor = __webpack_require__(925);
// EXTERNAL MODULE: ./src/js/util.js
var util = __webpack_require__(237);
;// ./src/js/appendNodeFactory.js






/**
 * A factory function to create an AppendNode, which depends on a Node
 * @param {Node} Node
 */
function appendNodeFactory(Node) {
  /**
   * @constructor AppendNode
   * @extends Node
   * @param {TreeEditor} editor
   * Create a new AppendNode. This is a special node which is created at the
   * end of the list with childs for an object or array
   */
  function AppendNode(editor) {
    /** @type {TreeEditor} */
    this.editor = editor;
    this.dom = {};
  }
  AppendNode.prototype = new Node();

  /**
   * Return a table row with an append button.
   * @return {Element} dom   TR element
   */
  AppendNode.prototype.getDom = function () {
    // TODO: implement a new solution for the append node
    var dom = this.dom;
    if (dom.tr) {
      return dom.tr;
    }
    this._updateEditability();

    // a row for the append button
    var trAppend = document.createElement('tr');
    trAppend.className = 'jsoneditor-append';
    trAppend.node = this;
    dom.tr = trAppend;

    // TODO: consistent naming

    if (this.editor.options.mode === 'tree') {
      // a cell for the dragarea column
      dom.tdDrag = document.createElement('td');

      // create context menu
      var tdMenu = document.createElement('td');
      dom.tdMenu = tdMenu;
      var menu = document.createElement('button');
      menu.type = 'button';
      menu.className = 'jsoneditor-button jsoneditor-contextmenu-button';
      menu.title = 'Click to open the actions menu (Ctrl+M)';
      dom.menu = menu;
      tdMenu.appendChild(dom.menu);
    }

    // a cell for the contents (showing text 'empty')
    var tdAppend = document.createElement('td');
    var domText = document.createElement('div');
    domText.appendChild(document.createTextNode('(' + (0,i18n/* translate */.Tl)('empty') + ')'));
    domText.className = 'jsoneditor-readonly';
    tdAppend.appendChild(domText);
    dom.td = tdAppend;
    dom.text = domText;
    this.updateDom();
    return trAppend;
  };

  /**
   * Append node doesn't have a path
   * @returns {null}
   */
  AppendNode.prototype.getPath = function () {
    return null;
  };

  /**
   * Append node doesn't have an index
   * @returns {null}
   */
  AppendNode.prototype.getIndex = function () {
    return null;
  };

  /**
   * Update the HTML dom of the Node
   */
  AppendNode.prototype.updateDom = function (options) {
    var dom = this.dom;
    var tdAppend = dom.td;
    if (tdAppend) {
      tdAppend.style.paddingLeft = this.getLevel() * 24 + 26 + 'px';
      // TODO: not so nice hard coded offset
    }
    var domText = dom.text;
    if (domText) {
      domText.firstChild.nodeValue = '(' + (0,i18n/* translate */.Tl)('empty') + ' ' + this.parent.type + ')';
    }

    // attach or detach the contents of the append node:
    // hide when the parent has childs, show when the parent has no childs
    var trAppend = dom.tr;
    if (!this.isVisible()) {
      if (dom.tr.firstChild) {
        if (dom.tdDrag) {
          trAppend.removeChild(dom.tdDrag);
        }
        if (dom.tdMenu) {
          trAppend.removeChild(dom.tdMenu);
        }
        trAppend.removeChild(tdAppend);
      }
    } else {
      if (!dom.tr.firstChild) {
        if (dom.tdDrag) {
          trAppend.appendChild(dom.tdDrag);
        }
        if (dom.tdMenu) {
          trAppend.appendChild(dom.tdMenu);
        }
        trAppend.appendChild(tdAppend);
      }
    }
  };

  /**
   * Check whether the AppendNode is currently visible.
   * the AppendNode is visible when its parent has no childs (i.e. is empty).
   * @return {boolean} isVisible
   */
  AppendNode.prototype.isVisible = function () {
    return this.parent.childs.length === 0;
  };

  /**
   * Show a contextmenu for this node
   * @param {HTMLElement} anchor   The element to attach the menu to.
   * @param {function} [onClose]   Callback method called when the context menu
   *                               is being closed.
   */
  AppendNode.prototype.showContextMenu = function (anchor, onClose) {
    var node = this;
    var appendSubmenu = [{
      text: (0,i18n/* translate */.Tl)('auto'),
      className: 'jsoneditor-type-auto',
      title: (0,i18n/* translate */.Tl)('autoType'),
      click: function click() {
        node._onAppend('', '', 'auto');
      }
    }, {
      text: (0,i18n/* translate */.Tl)('array'),
      className: 'jsoneditor-type-array',
      title: (0,i18n/* translate */.Tl)('arrayType'),
      click: function click() {
        node._onAppend('', []);
      }
    }, {
      text: (0,i18n/* translate */.Tl)('object'),
      className: 'jsoneditor-type-object',
      title: (0,i18n/* translate */.Tl)('objectType'),
      click: function click() {
        node._onAppend('', {});
      }
    }, {
      text: (0,i18n/* translate */.Tl)('string'),
      className: 'jsoneditor-type-string',
      title: (0,i18n/* translate */.Tl)('stringType'),
      click: function click() {
        node._onAppend('', '', 'string');
      }
    }];
    node.addTemplates(appendSubmenu, true);
    var items = [
    // create append button
    {
      text: (0,i18n/* translate */.Tl)('appendText'),
      title: (0,i18n/* translate */.Tl)('appendTitleAuto'),
      submenuTitle: (0,i18n/* translate */.Tl)('appendSubmenuTitle'),
      className: 'jsoneditor-insert',
      click: function click() {
        node._onAppend('', '', 'auto');
      },
      submenu: appendSubmenu
    }];
    if (this.editor.options.onCreateMenu) {
      var path = node.parent.getPath();
      items = this.editor.options.onCreateMenu(items, {
        type: 'append',
        path: path,
        paths: [path]
      });
    }
    var menu = new ContextMenu/* ContextMenu */.t(items, {
      close: onClose
    });
    menu.show(anchor, this.editor.getPopupAnchor());
  };

  /**
   * Handle an event. The event is caught centrally by the editor
   * @param {Event} event
   */
  AppendNode.prototype.onEvent = function (event) {
    var type = event.type;
    var target = event.target || event.srcElement;
    var dom = this.dom;

    // highlight the append nodes parent
    var menu = dom.menu;
    if (target === menu) {
      if (type === 'mouseover') {
        this.editor.highlighter.highlight(this.parent);
      } else if (type === 'mouseout') {
        this.editor.highlighter.unhighlight();
      }
    }

    // context menu events
    if (type === 'click' && target === dom.menu) {
      var highlighter = this.editor.highlighter;
      highlighter.highlight(this.parent);
      highlighter.lock();
      (0,util.addClassName)(dom.menu, 'jsoneditor-selected');
      this.showContextMenu(dom.menu, function () {
        (0,util.removeClassName)(dom.menu, 'jsoneditor-selected');
        highlighter.unlock();
        highlighter.unhighlight();
      });
    }
    if (type === 'keydown') {
      this.onKeyDown(event);
    }
  };
  return AppendNode;
}
;// ./src/js/showMoreNodeFactory.js




/**
 * A factory function to create an ShowMoreNode, which depends on a Node
 * @param {function} Node
 */
function showMoreNodeFactory(Node) {
  /**
   * @constructor ShowMoreNode
   * @extends Node
   * @param {TreeEditor} editor
   * @param {Node} parent
   * Create a new ShowMoreNode. This is a special node which is created
   * for arrays or objects having more than 100 items
   */
  function ShowMoreNode(editor, parent) {
    /** @type {TreeEditor} */
    this.editor = editor;
    this.parent = parent;
    this.dom = {};
  }
  ShowMoreNode.prototype = new Node();

  /**
   * Return a table row with an append button.
   * @return {Element} dom   TR element
   */
  ShowMoreNode.prototype.getDom = function () {
    if (this.dom.tr) {
      return this.dom.tr;
    }
    this._updateEditability();

    // display "show more"
    if (!this.dom.tr) {
      var me = this;
      var parent = this.parent;
      var showMoreButton = document.createElement('a');
      showMoreButton.appendChild(document.createTextNode((0,i18n/* translate */.Tl)('showMore')));
      showMoreButton.href = '#';
      showMoreButton.onclick = function (event) {
        // TODO: use callback instead of accessing a method of the parent
        parent.visibleChilds = Math.floor(parent.visibleChilds / parent.getMaxVisibleChilds() + 1) * parent.getMaxVisibleChilds();
        me.updateDom();
        parent.showChilds();
        event.preventDefault();
        return false;
      };
      var showAllButton = document.createElement('a');
      showAllButton.appendChild(document.createTextNode((0,i18n/* translate */.Tl)('showAll')));
      showAllButton.href = '#';
      showAllButton.onclick = function (event) {
        // TODO: use callback instead of accessing a method of the parent
        parent.visibleChilds = Infinity;
        me.updateDom();
        parent.showChilds();
        event.preventDefault();
        return false;
      };
      var moreContents = document.createElement('div');
      var moreText = document.createTextNode(this._getShowMoreText());
      moreContents.className = 'jsoneditor-show-more';
      moreContents.appendChild(moreText);
      moreContents.appendChild(showMoreButton);
      moreContents.appendChild(document.createTextNode('. '));
      moreContents.appendChild(showAllButton);
      moreContents.appendChild(document.createTextNode('. '));
      var tdContents = document.createElement('td');
      tdContents.appendChild(moreContents);
      var moreTr = document.createElement('tr');
      if (this.editor.options.mode === 'tree') {
        moreTr.appendChild(document.createElement('td'));
        moreTr.appendChild(document.createElement('td'));
      }
      moreTr.appendChild(tdContents);
      moreTr.className = 'jsoneditor-show-more';
      this.dom.tr = moreTr;
      this.dom.moreContents = moreContents;
      this.dom.moreText = moreText;
    }
    this.updateDom();
    return this.dom.tr;
  };

  /**
   * Update the HTML dom of the Node
   */
  ShowMoreNode.prototype.updateDom = function (options) {
    if (this.isVisible()) {
      // attach to the right child node (the first non-visible child)
      this.dom.tr.node = this.parent.childs[this.parent.visibleChilds];
      if (!this.dom.tr.parentNode) {
        var nextTr = this.parent._getNextTr();
        if (nextTr) {
          nextTr.parentNode.insertBefore(this.dom.tr, nextTr);
        }
      }

      // update the counts in the text
      this.dom.moreText.nodeValue = this._getShowMoreText();

      // update left margin
      this.dom.moreContents.style.marginLeft = (this.getLevel() + 1) * 24 + 'px';
    } else {
      if (this.dom.tr && this.dom.tr.parentNode) {
        this.dom.tr.parentNode.removeChild(this.dom.tr);
      }
    }
  };
  ShowMoreNode.prototype._getShowMoreText = function () {
    return (0,i18n/* translate */.Tl)('showMoreStatus', {
      visibleChilds: this.parent.visibleChilds,
      totalChilds: this.parent.childs.length
    }) + ' ';
  };

  /**
   * Check whether the ShowMoreNode is currently visible.
   * the ShowMoreNode is visible when it's parent has more childs than
   * the current visibleChilds
   * @return {boolean} isVisible
   */
  ShowMoreNode.prototype.isVisible = function () {
    return this.parent.expanded && this.parent.childs.length > this.parent.visibleChilds;
  };

  /**
   * Handle an event. The event is caught centrally by the editor
   * @param {Event} event
   */
  ShowMoreNode.prototype.onEvent = function (event) {
    var type = event.type;
    if (type === 'keydown') {
      this.onKeyDown(event);
    }
  };
  return ShowMoreNode;
}
// EXTERNAL MODULE: ./src/js/showSortModal.js
var js_showSortModal = __webpack_require__(915);
// EXTERNAL MODULE: ./src/js/showTransformModal.js + 1 modules
var js_showTransformModal = __webpack_require__(609);
// EXTERNAL MODULE: ./src/js/constants.js
var constants = __webpack_require__(660);
;// ./src/js/Node.js


function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _readOnlyError(r) { throw new TypeError('"' + r + '" is read-only'); }
function Node_typeof(o) { "@babel/helpers - typeof"; return Node_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, Node_typeof(o); }
function Node_classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function Node_defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, Node_toPropertyKey(o.key), o); } }
function Node_createClass(e, r, t) { return r && Node_defineProperties(e.prototype, r), t && Node_defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function Node_toPropertyKey(t) { var i = Node_toPrimitive(t, "string"); return "symbol" == Node_typeof(i) ? i : i + ""; }
function Node_toPrimitive(t, r) { if ("object" != Node_typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != Node_typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }











/**
 * @constructor Node
 * Create a new Node
 * @param {./treemode} editor
 * @param {Object} [params] Can contain parameters:
 *                          {string}  field
 *                          {boolean} fieldEditable
 *                          {*}       value
 *                          {String}  type  Can have values 'auto', 'array',
 *                                          'object', or 'string'.
 */
var Node = /*#__PURE__*/function () {
  function Node(editor, params) {
    Node_classCallCheck(this, Node);
    /** @type {./treemode} */
    this.editor = editor;
    this.dom = {};
    this.expanded = false;
    if (params && params instanceof Object) {
      this.setField(params.field, params.fieldEditable);
      if ('value' in params) {
        this.setValue(params.value, params.type);
      }
      if ('internalValue' in params) {
        this.setInternalValue(params.internalValue);
      }
    } else {
      this.setField('');
      this.setValue(null);
    }
    this._debouncedOnChangeValue = (0,util.debounce)(this._onChangeValue.bind(this), Node.prototype.DEBOUNCE_INTERVAL);
    this._debouncedOnChangeField = (0,util.debounce)(this._onChangeField.bind(this), Node.prototype.DEBOUNCE_INTERVAL);

    // starting value for visible children
    this.visibleChilds = this.getMaxVisibleChilds();
  }
  return Node_createClass(Node, [{
    key: "getMaxVisibleChilds",
    value: function getMaxVisibleChilds() {
      return this.editor && this.editor.options && this.editor.options.maxVisibleChilds ? this.editor.options.maxVisibleChilds : DEFAULT_MAX_VISIBLE_CHILDS;
    }

    /**
     * Determine whether the field and/or value of this node are editable
     * @private
     */
  }, {
    key: "_updateEditability",
    value: function _updateEditability() {
      this.editable = {
        field: true,
        value: true
      };
      if (this.editor) {
        this.editable.field = this.editor.options.mode === 'tree';
        this.editable.value = this.editor.options.mode !== 'view';
        if ((this.editor.options.mode === 'tree' || this.editor.options.mode === 'form') && typeof this.editor.options.onEditable === 'function') {
          var getValue = this.getValue.bind(this);
          var editable = this.editor.options.onEditable({
            field: this.field,
            get value() {
              return getValue();
            },
            path: this.getPath()
          });
          if (typeof editable === 'boolean') {
            this.editable.field = editable;
            this.editable.value = editable;
          } else if (Node_typeof(editable) === 'object' && editable !== null) {
            if (typeof editable.field === 'boolean') this.editable.field = editable.field;
            if (typeof editable.value === 'boolean') this.editable.value = editable.value;
          } else {
            console.error('Invalid return value for function onEditable.', 'Actual value:', editable, '.', 'Either a boolean or object { field: boolean, value: boolean } expected.');
            this.editable.field = false;
            this.editable.value = false;
          }
        }
      }
    }

    /**
     * Get the path of this node
     * @return {{string|number}[]} Array containing the path to this node.
     * Element is a number if is the index of an array, a string otherwise.
     */
  }, {
    key: "getPath",
    value: function getPath() {
      var node = this;
      var path = [];
      while (node) {
        var field = node.getName();
        if (field !== undefined) {
          path.unshift(field);
        }
        node = node.parent;
      }
      return path;
    }

    /**
     * Get the internal path of this node, a list with the child indexes.
     * @return {String[]} Array containing the internal path to this node
     */
  }, {
    key: "getInternalPath",
    value: function getInternalPath() {
      var node = this;
      var internalPath = [];
      while (node) {
        if (node.parent) {
          internalPath.unshift(node.getIndex());
        }
        node = node.parent;
      }
      return internalPath;
    }

    /**
     * Get node serializable name
     * @returns {String|Number}
     */
  }, {
    key: "getName",
    value: function getName() {
      return !this.parent ? undefined // do not add an (optional) field name of the root node
      : this.parent.type !== 'array' ? this.field : this.index;
    }

    /**
     * Find child node by serializable path
     * @param {Array<String>} path
     */
  }, {
    key: "findNodeByPath",
    value: function findNodeByPath(path) {
      if (!path) {
        return;
      }
      if (path.length === 0) {
        return this;
      }
      if (path.length && this.childs && this.childs.length) {
        for (var i = 0; i < this.childs.length; ++i) {
          if ('' + path[0] === '' + this.childs[i].getName()) {
            return this.childs[i].findNodeByPath(path.slice(1));
          }
        }
      }
    }

    /**
     * Find child node by an internal path: the indexes of the childs nodes
     * @param {Array<String>} internalPath
     * @return {Node | undefined} Returns the node if the path exists.
     *                            Returns undefined otherwise.
     */
  }, {
    key: "findNodeByInternalPath",
    value: function findNodeByInternalPath(internalPath) {
      if (!internalPath) {
        return undefined;
      }
      var node = this;
      for (var i = 0; i < internalPath.length && node; i++) {
        var childIndex = internalPath[i];
        node = node.childs[childIndex];
      }
      return node;
    }

    /**
     * @typedef {{value: String|Object|Number|Boolean, path: Array.<String|Number>}} SerializableNode
     *
     * Returns serializable representation for the node
     * @return {SerializableNode}
     */
  }, {
    key: "serialize",
    value: function serialize() {
      return {
        value: this.getValue(),
        path: this.getPath()
      };
    }

    /**
     * Find a Node from a JSON path like '.items[3].name'
     * @param {string} jsonPath
     * @return {Node | null} Returns the Node when found, returns null if not found
     */
  }, {
    key: "findNode",
    value: function findNode(jsonPath) {
      var path = (0,util.parsePath)(jsonPath);
      var node = this;
      var _loop = function _loop() {
        var prop = path.shift();
        if (typeof prop === 'number') {
          if (node.type !== 'array') {
            throw new Error('Cannot get child node at index ' + prop + ': node is no array');
          }
          node = node.childs[prop];
        } else {
          // string
          if (node.type !== 'object') {
            throw new Error('Cannot get child node ' + prop + ': node is no object');
          }
          node = node.childs.filter(function (child) {
            return child.field === prop;
          })[0];
        }
      };
      while (node && path.length > 0) {
        _loop();
      }
      return node;
    }

    /**
     * Find all parents of this node. The parents are ordered from root node towards
     * the original node.
     * @return {Array.<Node>}
     */
  }, {
    key: "findParents",
    value: function findParents() {
      var parents = [];
      var parent = this.parent;
      while (parent) {
        parents.unshift(parent);
        parent = parent.parent;
      }
      return parents;
    }

    /**
     *
     * @param {{dataPath: string, keyword: string, message: string, params: Object, schemaPath: string} | null} error
     * @param {Node} [child]  When this is the error of a parent node, pointing
     *                        to an invalid child node, the child node itself
     *                        can be provided. If provided, clicking the error
     *                        icon will set focus to the invalid child node.
     */
  }, {
    key: "setError",
    value: function setError(error, child) {
      this.error = error;
      this.errorChild = child;
      if (this.dom && this.dom.tr) {
        this.updateError();
      }
    }

    /**
     * Render the error
     */
  }, {
    key: "updateError",
    value: function updateError() {
      var _this = this;
      var error = this.fieldError || this.valueError || this.error;
      var tdError = this.dom.tdError;
      if (error && this.dom && this.dom.tr) {
        (0,util.addClassName)(this.dom.tr, 'jsoneditor-validation-error');
        if (!tdError) {
          tdError = document.createElement('td');
          this.dom.tdError = tdError;
          this.dom.tdValue.parentNode.appendChild(tdError);
        }
        var button = document.createElement('button');
        button.type = 'button';
        button.className = 'jsoneditor-button jsoneditor-schema-error';
        var destroy = function destroy() {
          if (_this.dom.popupAnchor) {
            _this.dom.popupAnchor.destroy(); // this will trigger the onDestroy callback
          }
        };
        var onDestroy = function onDestroy() {
          delete _this.dom.popupAnchor;
        };
        var createPopup = function createPopup(destroyOnMouseOut) {
          var frame = _this.editor.frame;
          _this.dom.popupAnchor = (0,createAbsoluteAnchor/* createAbsoluteAnchor */.p)(button, _this.editor.getPopupAnchor(), onDestroy, destroyOnMouseOut);
          var popupWidth = 200; // must correspond to what's configured in the CSS
          var buttonRect = button.getBoundingClientRect();
          var frameRect = frame.getBoundingClientRect();
          var position = frameRect.width - buttonRect.x > popupWidth / 2 + 20 ? 'jsoneditor-above' : 'jsoneditor-left';
          var popover = document.createElement('div');
          popover.className = 'jsoneditor-popover ' + position;
          popover.appendChild(document.createTextNode(error.message));
          _this.dom.popupAnchor.appendChild(popover);
        };
        button.onmouseover = function () {
          if (!_this.dom.popupAnchor) {
            createPopup(true);
          }
        };
        button.onfocus = function () {
          destroy();
          createPopup(false);
        };
        button.onblur = function () {
          destroy();
        };

        // when clicking the error icon, expand all nodes towards the invalid
        // child node, and set focus to the child node
        var child = this.errorChild;
        if (child) {
          button.onclick = function showInvalidNode() {
            child.findParents().forEach(function (parent) {
              parent.expand(false);
            });
            child.scrollTo(function () {
              child.focus();
            });
          };
        }

        // apply the error message to the node
        while (tdError.firstChild) {
          tdError.removeChild(tdError.firstChild);
        }
        tdError.appendChild(button);
      } else {
        if (this.dom.tr) {
          (0,util.removeClassName)(this.dom.tr, 'jsoneditor-validation-error');
        }
        if (tdError) {
          this.dom.tdError.parentNode.removeChild(this.dom.tdError);
          delete this.dom.tdError;
        }
      }
    }

    /**
     * Get the index of this node: the index in the list of childs where this
     * node is part of
     * @return {number | null} Returns the index, or null if this is the root node
     */
  }, {
    key: "getIndex",
    value: function getIndex() {
      if (this.parent) {
        var index = this.parent.childs.indexOf(this);
        return index !== -1 ? index : null;
      } else {
        return -1;
      }
    }

    /**
     * Set parent node
     * @param {Node} parent
     */
  }, {
    key: "setParent",
    value: function setParent(parent) {
      this.parent = parent;
    }

    /**
     * Set field
     * @param {String}  field
     * @param {boolean} [fieldEditable]
     */
  }, {
    key: "setField",
    value: function setField(field, fieldEditable) {
      this.field = field;
      this.previousField = field;
      this.fieldEditable = fieldEditable === true;
    }

    /**
     * Get field
     * @return {String}
     */
  }, {
    key: "getField",
    value: function getField() {
      if (this.field === undefined) {
        this._getDomField();
      }
      return this.field;
    }

    /**
     * Set value. Value is a JSON structure or an element String, Boolean, etc.
     * @param {*} value
     * @param {String} [type]  Specify the type of the value. Can be 'auto',
     *                         'array', 'object', or 'string'
     */
  }, {
    key: "setValue",
    value: function setValue(value, type) {
      var childValue, child;
      var i, j;
      var updateDom = false;
      var previousChilds = this.childs;
      this.type = this._getType(value);

      // check if type corresponds with the provided type
      if (type && type !== this.type) {
        if (type === 'string' && this.type === 'auto') {
          this.type = type;
        } else {
          throw new Error('Type mismatch: ' + 'cannot cast value of type "' + this.type + ' to the specified type "' + type + '"');
        }
      }
      if (this.type === 'array') {
        // array
        if (!this.childs) {
          this.childs = [];
        }
        for (i = 0; i < value.length; i++) {
          childValue = value[i];
          if (childValue !== undefined && !(childValue instanceof Function)) {
            if (i < this.childs.length) {
              // reuse existing child, keep its state
              child = this.childs[i];
              child.fieldEditable = false;
              child.index = i;
              child.setValue(childValue);
            } else {
              // create a new child
              child = new Node(this.editor, {
                value: childValue
              });
              var visible = i < this.getMaxVisibleChilds();
              this.appendChild(child, visible, updateDom);
            }
          }
        }

        // cleanup redundant childs
        // we loop backward to prevent issues with shifting index numbers
        for (j = this.childs.length; j >= value.length; j--) {
          this.removeChild(this.childs[j], updateDom);
        }
      } else if (this.type === 'object') {
        // object
        if (!this.childs) {
          this.childs = [];
        }

        // cleanup redundant childs
        // we loop backward to prevent issues with shifting index numbers
        for (j = this.childs.length - 1; j >= 0; j--) {
          if (!Node_hasOwnProperty(value, this.childs[j].field)) {
            this.removeChild(this.childs[j], updateDom);
          }
        }
        i = 0;
        for (var childField in value) {
          if (Node_hasOwnProperty(value, childField)) {
            childValue = value[childField];
            if (childValue !== undefined && !(childValue instanceof Function)) {
              var _child = this.findChildByProperty(childField);
              if (_child) {
                // reuse existing child, keep its state
                _child.setField(childField, true);
                _child.setValue(childValue);
              } else {
                // create a new child, append to the end
                var newChild = new Node(this.editor, {
                  field: childField,
                  value: childValue
                });
                var _visible = i < this.getMaxVisibleChilds();
                this.appendChild(newChild, _visible, updateDom);
              }
            }
            i++;
          }
        }
        this.value = '';

        // sort object keys during initialization. Must not trigger an onChange action
        if (this.editor.options.sortObjectKeys === true) {
          var triggerAction = false;
          this.sort([], 'asc', triggerAction);
        }
      } else {
        // value
        this.hideChilds();
        delete this.append;
        delete this.showMore;
        delete this.expanded;
        delete this.childs;
        this.value = value;
      }

      // recreate the DOM if switching from an object/array to auto/string or vice versa
      // needed to recreated the expand button for example
      if (Array.isArray(previousChilds) !== Array.isArray(this.childs)) {
        this.recreateDom();
      }
      this.updateDom({
        updateIndexes: true
      });
      this.previousValue = this.value; // used only to check for changes in DOM vs JS model
    }

    /**
     * Set internal value
     * @param {*} internalValue  Internal value structure keeping type,
     *                           order and duplicates in objects
     */
  }, {
    key: "setInternalValue",
    value: function setInternalValue(internalValue) {
      var childValue, child, visible;
      var i, j;
      var notUpdateDom = false;
      var previousChilds = this.childs;
      this.type = internalValue.type;
      if (internalValue.type === 'array') {
        // array
        if (!this.childs) {
          this.childs = [];
        }
        for (i = 0; i < internalValue.childs.length; i++) {
          childValue = internalValue.childs[i];
          if (childValue !== undefined && !(childValue instanceof Function)) {
            if (i < this.childs.length) {
              // reuse existing child, keep its state
              child = this.childs[i];
              child.fieldEditable = false;
              child.index = i;
              child.setInternalValue(childValue);
            } else {
              // create a new child
              child = new Node(this.editor, {
                internalValue: childValue
              });
              visible = i < this.getMaxVisibleChilds();
              this.appendChild(child, visible, notUpdateDom);
            }
          }
        }

        // cleanup redundant childs
        // we loop backward to prevent issues with shifting index numbers
        for (j = this.childs.length; j >= internalValue.childs.length; j--) {
          this.removeChild(this.childs[j], notUpdateDom);
        }
      } else if (internalValue.type === 'object') {
        // object
        if (!this.childs) {
          this.childs = [];
        }
        for (i = 0; i < internalValue.childs.length; i++) {
          childValue = internalValue.childs[i];
          if (childValue !== undefined && !(childValue instanceof Function)) {
            if (i < this.childs.length) {
              // reuse existing child, keep its state
              child = this.childs[i];
              delete child.index;
              child.setField(childValue.field, true);
              child.setInternalValue(childValue.value);
            } else {
              // create a new child
              child = new Node(this.editor, {
                field: childValue.field,
                internalValue: childValue.value
              });
              visible = i < this.getMaxVisibleChilds();
              this.appendChild(child, visible, notUpdateDom);
            }
          }
        }

        // cleanup redundant childs
        // we loop backward to prevent issues with shifting index numbers
        for (j = this.childs.length; j >= internalValue.childs.length; j--) {
          this.removeChild(this.childs[j], notUpdateDom);
        }
      } else {
        // value
        this.hideChilds();
        delete this.append;
        delete this.showMore;
        delete this.expanded;
        delete this.childs;
        this.value = internalValue.value;
      }

      // recreate the DOM if switching from an object/array to auto/string or vice versa
      // needed to recreated the expand button for example
      if (Array.isArray(previousChilds) !== Array.isArray(this.childs)) {
        this.recreateDom();
      }
      this.updateDom({
        updateIndexes: true
      });
      this.previousValue = this.value; // used only to check for changes in DOM vs JS model
    }

    /**
     * Remove the DOM of this node and it's childs and recreate it again
     */
  }, {
    key: "recreateDom",
    value: function recreateDom() {
      if (this.dom && this.dom.tr && this.dom.tr.parentNode) {
        var domAnchor = this._detachFromDom();
        this.clearDom();
        this._attachToDom(domAnchor);
      } else {
        this.clearDom();
      }
    }

    /**
     * Get value. Value is a JSON structure
     * @return {*} value
     */
  }, {
    key: "getValue",
    value: function getValue() {
      if (this.type === 'array') {
        var arr = [];
        this.childs.forEach(function (child) {
          arr.push(child.getValue());
        });
        return arr;
      } else if (this.type === 'object') {
        var obj = {};
        this.childs.forEach(function (child) {
          obj[child.getField()] = child.getValue();
        });
        return obj;
      } else {
        if (this.value === undefined) {
          this._getDomValue();
        }
        return this.value;
      }
    }

    /**
     * Get internal value, a structure which maintains ordering and duplicates in objects
     * @return {*} value
     */
  }, {
    key: "getInternalValue",
    value: function getInternalValue() {
      if (this.type === 'array') {
        return {
          type: this.type,
          childs: this.childs.map(function (child) {
            return child.getInternalValue();
          })
        };
      } else if (this.type === 'object') {
        return {
          type: this.type,
          childs: this.childs.map(function (child) {
            return {
              field: child.getField(),
              value: child.getInternalValue()
            };
          })
        };
      } else {
        if (this.value === undefined) {
          this._getDomValue();
        }
        return {
          type: this.type,
          value: this.value
        };
      }
    }

    /**
     * Get the nesting level of this node
     * @return {Number} level
     */
  }, {
    key: "getLevel",
    value: function getLevel() {
      return this.parent ? this.parent.getLevel() + 1 : 0;
    }

    /**
     * Get jsonpath of the current node
     * @return {Node[]} Returns an array with nodes
     */
  }, {
    key: "getNodePath",
    value: function getNodePath() {
      var path = this.parent ? this.parent.getNodePath() : [];
      path.push(this);
      return path;
    }

    /**
     * Create a clone of a node
     * The complete state of a clone is copied, including whether it is expanded or
     * not. The DOM elements are not cloned.
     * @return {Node} clone
     */
  }, {
    key: "clone",
    value: function clone() {
      var clone = new Node(this.editor);
      clone.type = this.type;
      clone.field = this.field;
      clone.fieldInnerText = this.fieldInnerText;
      clone.fieldEditable = this.fieldEditable;
      clone.previousField = this.previousField;
      clone.value = this.value;
      clone.valueInnerText = this.valueInnerText;
      clone.previousValue = this.previousValue;
      clone.expanded = this.expanded;
      clone.visibleChilds = this.visibleChilds;
      if (this.childs) {
        // an object or array
        var cloneChilds = [];
        this.childs.forEach(function (child) {
          var childClone = child.clone();
          childClone.setParent(clone);
          cloneChilds.push(childClone);
        });
        clone.childs = cloneChilds;
      } else {
        // a value
        clone.childs = undefined;
      }
      return clone;
    }

    /**
     * Expand this node and optionally its childs.
     * @param {boolean} [recurse] Optional recursion, true by default. When
     *                            true, all childs will be expanded recursively
     */
  }, {
    key: "expand",
    value: function expand(recurse) {
      if (!this.childs) {
        return;
      }

      // set this node expanded
      this.expanded = true;
      if (this.dom.expand) {
        this.dom.expand.className = 'jsoneditor-button jsoneditor-expanded';
      }
      this.showChilds();
      if (recurse !== false) {
        this.childs.forEach(function (child) {
          child.expand(recurse);
        });
      }

      // update the css classes of table row, and fire onClassName etc
      this.updateDom({
        recurse: false
      });
    }

    /**
     * Collapse this node and optionally its childs.
     * @param {boolean} [recurse] Optional recursion, true by default. When
     *                            true, all childs will be collapsed recursively
     */
  }, {
    key: "collapse",
    value: function collapse(recurse) {
      if (!this.childs) {
        return;
      }
      this.hideChilds();

      // collapse childs in case of recurse
      if (recurse !== false) {
        this.childs.forEach(function (child) {
          child.collapse(recurse);
        });
      }

      // make this node collapsed
      if (this.dom.expand) {
        this.dom.expand.className = 'jsoneditor-button jsoneditor-collapsed';
      }
      this.expanded = false;

      // update the css classes of table row, and fire onClassName etc
      this.updateDom({
        recurse: false
      });
    }

    /**
     * Recursively show all childs when they are expanded
     */
  }, {
    key: "showChilds",
    value: function showChilds() {
      var childs = this.childs;
      if (!childs) {
        return;
      }
      if (!this.expanded) {
        return;
      }
      var tr = this.dom.tr;
      var nextTr;
      var table = tr ? tr.parentNode : undefined;
      if (table) {
        // show row with append button
        var append = this.getAppendDom();
        if (!append.parentNode) {
          nextTr = tr.nextSibling;
          if (nextTr) {
            table.insertBefore(append, nextTr);
          } else {
            table.appendChild(append);
          }
        }

        // show childs
        var iMax = Math.min(this.childs.length, this.visibleChilds);
        nextTr = this._getNextTr();
        for (var i = 0; i < iMax; i++) {
          var child = this.childs[i];
          if (!child.getDom().parentNode) {
            table.insertBefore(child.getDom(), nextTr);
          }
          child.showChilds();
        }

        // show "show more childs" if limited
        var showMore = this.getShowMoreDom();
        nextTr = this._getNextTr();
        if (!showMore.parentNode) {
          table.insertBefore(showMore, nextTr);
        }
        this.showMore.updateDom(); // to update the counter
      }
    }
  }, {
    key: "_getNextTr",
    value: function _getNextTr() {
      if (this.showMore && this.showMore.getDom().parentNode) {
        return this.showMore.getDom();
      }
      if (this.append && this.append.getDom().parentNode) {
        return this.append.getDom();
      }
    }

    /**
     * Hide the node with all its childs
     * @param {{resetVisibleChilds: boolean}} [options]
     */
  }, {
    key: "hide",
    value: function hide(options) {
      var tr = this.dom.tr;
      var table = tr ? tr.parentNode : undefined;
      if (table) {
        table.removeChild(tr);
      }
      if (this.dom.popupAnchor) {
        this.dom.popupAnchor.destroy();
      }
      this.hideChilds(options);
    }

    /**
     * Recursively hide all childs
     * @param {{resetVisibleChilds: boolean}} [options]
     */
  }, {
    key: "hideChilds",
    value: function hideChilds(options) {
      var childs = this.childs;
      if (!childs) {
        return;
      }
      if (!this.expanded) {
        return;
      }

      // hide append row
      var append = this.getAppendDom();
      if (append.parentNode) {
        append.parentNode.removeChild(append);
      }

      // hide childs
      this.childs.forEach(function (child) {
        child.hide();
      });

      // hide "show more" row
      var showMore = this.getShowMoreDom();
      if (showMore.parentNode) {
        showMore.parentNode.removeChild(showMore);
      }

      // reset max visible childs
      if (!options || options.resetVisibleChilds) {
        this.visibleChilds = this.getMaxVisibleChilds();
      }
    }

    /**
     * set custom css classes on a node
     */
  }, {
    key: "_updateCssClassName",
    value: function _updateCssClassName() {
      if (this.dom.field && this.editor && this.editor.options && typeof this.editor.options.onClassName === 'function' && this.dom.tree) {
        (0,util.removeAllClassNames)(this.dom.tree);
        var getValue = this.getValue.bind(this);
        var addClasses = this.editor.options.onClassName({
          path: this.getPath(),
          field: this.field,
          get value() {
            return getValue();
          }
        }) || '';
        (0,util.addClassName)(this.dom.tree, 'jsoneditor-values ' + addClasses);
      }
    }
  }, {
    key: "recursivelyUpdateCssClassesOnNodes",
    value: function recursivelyUpdateCssClassesOnNodes() {
      this._updateCssClassName();
      if (Array.isArray(this.childs)) {
        for (var i = 0; i < this.childs.length; i++) {
          this.childs[i].recursivelyUpdateCssClassesOnNodes();
        }
      }
    }

    /**
     * Goes through the path from the node to the root and ensures that it is expanded
     */
  }, {
    key: "expandTo",
    value: function expandTo() {
      var currentNode = this.parent;
      while (currentNode) {
        if (!currentNode.expanded) {
          currentNode.expand();
        }
        currentNode = currentNode.parent;
      }
    }

    /**
     * Add a new child to the node.
     * Only applicable when Node value is of type array or object
     * @param {Node} node
     * @param {boolean} [visible] If true (default), the child will be rendered
     * @param {boolean} [updateDom]  If true (default), the DOM of both parent
     *                               node and appended node will be updated
     *                               (child count, indexes)
     */
  }, {
    key: "appendChild",
    value: function appendChild(node, visible, updateDom) {
      if (this._hasChilds()) {
        // adjust the link to the parent
        node.setParent(this);
        node.fieldEditable = this.type === 'object';
        if (this.type === 'array') {
          node.index = this.childs.length;
        }
        if (this.type === 'object' && node.field === undefined) {
          // initialize field value if needed
          node.setField('');
        }
        this.childs.push(node);
        if (this.expanded && visible !== false) {
          // insert into the DOM, before the appendRow
          var newTr = node.getDom();
          var nextTr = this._getNextTr();
          var table = nextTr ? nextTr.parentNode : undefined;
          if (nextTr && table) {
            table.insertBefore(newTr, nextTr);
          }
          node.showChilds();
          this.visibleChilds++;
        }
        if (updateDom !== false) {
          this.updateDom({
            updateIndexes: true
          });
          node.updateDom({
            recurse: true
          });
        }
      }
    }

    /**
     * Move a node from its current parent to this node
     * Only applicable when Node value is of type array or object
     * @param {Node} node
     * @param {Node} beforeNode
     * @param {boolean} [updateDom]  If true (default), the DOM of both parent
     *                               node and appended node will be updated
     *                               (child count, indexes)
     */
  }, {
    key: "moveBefore",
    value: function moveBefore(node, beforeNode, updateDom) {
      if (this._hasChilds()) {
        // create a temporary row, to prevent the scroll position from jumping
        // when removing the node
        var tbody = this.dom.tr ? this.dom.tr.parentNode : undefined;
        var trTemp;
        if (tbody) {
          trTemp = document.createElement('tr');
          trTemp.style.height = tbody.clientHeight + 'px';
          tbody.appendChild(trTemp);
        }
        if (node.parent) {
          node.parent.removeChild(node);
        }
        if (beforeNode instanceof AppendNode || !beforeNode) {
          // the this.childs.length + 1 is to reckon with the node that we're about to add
          if (this.childs.length + 1 > this.visibleChilds) {
            var lastVisibleNode = this.childs[this.visibleChilds - 1];
            this.insertBefore(node, lastVisibleNode, updateDom);
          } else {
            var visible = true;
            this.appendChild(node, visible, updateDom);
          }
        } else {
          this.insertBefore(node, beforeNode, updateDom);
        }
        if (tbody && trTemp) {
          tbody.removeChild(trTemp);
        }
      }
    }

    /**
     * Insert a new child before a given node
     * Only applicable when Node value is of type array or object
     * @param {Node} node
     * @param {Node} beforeNode
     * @param {boolean} [updateDom]  If true (default), the DOM of both parent
     *                               node and appended node will be updated
     *                               (child count, indexes)
     */
  }, {
    key: "insertBefore",
    value: function insertBefore(node, beforeNode, updateDom) {
      if (this._hasChilds()) {
        this.visibleChilds++;

        // initialize field value if needed
        if (this.type === 'object' && node.field === undefined) {
          node.setField('');
        }
        if (beforeNode === this.append) {
          // append to the child nodes

          // adjust the link to the parent
          node.setParent(this);
          node.fieldEditable = this.type === 'object';
          this.childs.push(node);
        } else {
          // insert before a child node
          var index = this.childs.indexOf(beforeNode);
          if (index === -1) {
            throw new Error('Node not found');
          }

          // adjust the link to the parent
          node.setParent(this);
          node.fieldEditable = this.type === 'object';
          this.childs.splice(index, 0, node);
        }
        if (this.expanded) {
          // insert into the DOM
          var newTr = node.getDom();
          var nextTr = beforeNode.getDom();
          var table = nextTr ? nextTr.parentNode : undefined;
          if (nextTr && table) {
            table.insertBefore(newTr, nextTr);
          }
          node.showChilds();
          this.showChilds();
        }
        if (updateDom !== false) {
          this.updateDom({
            updateIndexes: true
          });
          node.updateDom({
            recurse: true
          });
        }
      }
    }

    /**
     * Insert a new child before a given node
     * Only applicable when Node value is of type array or object
     * @param {Node} node
     * @param {Node} afterNode
     */
  }, {
    key: "insertAfter",
    value: function insertAfter(node, afterNode) {
      if (this._hasChilds()) {
        var index = this.childs.indexOf(afterNode);
        var beforeNode = this.childs[index + 1];
        if (beforeNode) {
          this.insertBefore(node, beforeNode);
        } else {
          this.appendChild(node);
        }
      }
    }

    /**
     * Search in this node
     * Searches are case insensitive.
     * @param {String} text
     * @param {Node[]} [results] Array where search results will be added
     *                           used to count and limit the results whilst iterating
     * @return {Node[]} results  Array with nodes containing the search text
     */
  }, {
    key: "search",
    value: function search(text, results) {
      if (!Array.isArray(results)) {
        results = [];
      }
      var index;
      var search = text ? text.toLowerCase() : undefined;

      // delete old search data
      delete this.searchField;
      delete this.searchValue;

      // search in field
      if (this.field !== undefined && results.length <= this.MAX_SEARCH_RESULTS) {
        var field = String(this.field).toLowerCase();
        index = field.indexOf(search);
        if (index !== -1) {
          this.searchField = true;
          results.push({
            node: this,
            elem: 'field'
          });
        }

        // update dom
        this._updateDomField();
      }

      // search in value
      if (this._hasChilds()) {
        // array, object

        // search the nodes childs
        if (this.childs) {
          this.childs.forEach(function (child) {
            child.search(text, results);
          });
        }
      } else {
        // string, auto
        if (this.value !== undefined && results.length <= this.MAX_SEARCH_RESULTS) {
          var value = String(this.value).toLowerCase();
          index = value.indexOf(search);
          if (index !== -1) {
            this.searchValue = true;
            results.push({
              node: this,
              elem: 'value'
            });
          }

          // update dom
          this._updateDomValue();
        }
      }
      return results;
    }

    /**
     * Move the scroll position such that this node is in the visible area.
     * The node will not get the focus
     * @param {function(boolean)} [callback]
     */
  }, {
    key: "scrollTo",
    value: function scrollTo(callback) {
      this.expandPathToNode();
      if (this.dom.tr && this.dom.tr.parentNode) {
        this.editor.scrollTo(this.dom.tr.offsetTop, callback);
      }
    }

    /**
     * if the node is not visible, expand its parents
     */
  }, {
    key: "expandPathToNode",
    value: function expandPathToNode() {
      var node = this;
      var recurse = false;
      while (node && node.parent) {
        // expand visible childs of the parent if needed
        var index = node.parent.type === 'array' ? node.index : node.parent.childs.indexOf(node);
        while (node.parent.visibleChilds < index + 1) {
          node.parent.visibleChilds += this.getMaxVisibleChilds();
        }

        // expand the parent itself
        node.parent.expand(recurse);
        node = node.parent;
      }
    }

    /**
     * Set focus to this node
     * @param {String} [elementName]  The field name of the element to get the
     *                                focus available values: 'drag', 'menu',
     *                                'expand', 'field', 'value' (default)
     */
  }, {
    key: "focus",
    value: function focus(elementName) {
      Node.focusElement = elementName;
      if (this.dom.tr && this.dom.tr.parentNode) {
        var dom = this.dom;
        switch (elementName) {
          case 'drag':
            if (dom.drag) {
              dom.drag.focus();
            } else {
              dom.menu.focus();
            }
            break;
          case 'menu':
            dom.menu.focus();
            break;
          case 'expand':
            if (this._hasChilds()) {
              dom.expand.focus();
            } else if (dom.field && this.fieldEditable) {
              dom.field.focus();
              (0,util.selectContentEditable)(dom.field);
            } else if (dom.value && !this._hasChilds()) {
              dom.value.focus();
              (0,util.selectContentEditable)(dom.value);
            } else {
              dom.menu.focus();
            }
            break;
          case 'field':
            if (dom.field && this.fieldEditable) {
              dom.field.focus();
              (0,util.selectContentEditable)(dom.field);
            } else if (dom.value && !this._hasChilds()) {
              dom.value.focus();
              (0,util.selectContentEditable)(dom.value);
            } else if (this._hasChilds()) {
              dom.expand.focus();
            } else {
              dom.menu.focus();
            }
            break;
          case 'value':
          default:
            if (dom.select) {
              // enum select box
              dom.select.focus();
            } else if (dom.value && !this._hasChilds()) {
              dom.value.focus();
              (0,util.selectContentEditable)(dom.value);
            } else if (dom.field && this.fieldEditable) {
              dom.field.focus();
              (0,util.selectContentEditable)(dom.field);
            } else if (this._hasChilds()) {
              dom.expand.focus();
            } else {
              dom.menu.focus();
            }
            break;
        }
      }
    }

    /**
     * Check if given node is a child. The method will check recursively to find
     * this node.
     * @param {Node} node
     * @return {boolean} containsNode
     */
  }, {
    key: "containsNode",
    value: function containsNode(node) {
      if (this === node) {
        return true;
      }
      var childs = this.childs;
      if (childs) {
        // TODO: use the js5 Array.some() here?
        for (var i = 0, iMax = childs.length; i < iMax; i++) {
          if (childs[i].containsNode(node)) {
            return true;
          }
        }
      }
      return false;
    }

    /**
     * Remove a child from the node.
     * Only applicable when Node value is of type array or object
     * @param {Node} node   The child node to be removed;
     * @param {boolean} [updateDom]  If true (default), the DOM of the parent
     *                               node will be updated (like child count)
     * @return {Node | undefined} node  The removed node on success,
     *                                             else undefined
     */
  }, {
    key: "removeChild",
    value: function removeChild(node, updateDom) {
      if (this.childs) {
        var index = this.childs.indexOf(node);
        if (index !== -1) {
          if (index < this.visibleChilds && this.expanded) {
            this.visibleChilds--;
          }
          node.hide();

          // delete old search results
          delete node.searchField;
          delete node.searchValue;
          var removedNode = this.childs.splice(index, 1)[0];
          removedNode.parent = null;
          if (updateDom !== false) {
            this.updateDom({
              updateIndexes: true
            });
          }
          return removedNode;
        }
      }
      return undefined;
    }

    /**
     * Remove a child node node from this node
     * This method is equal to Node.removeChild, except that _remove fire an
     * onChange event.
     * @param {Node} node
     * @private
     */
  }, {
    key: "_remove",
    value: function _remove(node) {
      this.removeChild(node);
    }

    /**
     * Change the type of the value of this Node
     * @param {String} newType
     */
  }, {
    key: "changeType",
    value: function changeType(newType) {
      var oldType = this.type;
      if (oldType === newType) {
        // type is not changed
        return;
      }
      if ((newType === 'string' || newType === 'auto') && (oldType === 'string' || oldType === 'auto')) {
        // this is an easy change
        this.type = newType;
      } else {
        // change from array to object, or from string/auto to object/array
        var domAnchor = this._detachFromDom();

        // delete the old DOM
        this.clearDom();

        // adjust the field and the value
        this.type = newType;

        // adjust childs
        if (newType === 'object') {
          if (!this.childs) {
            this.childs = [];
          }
          this.childs.forEach(function (child) {
            child.clearDom();
            delete child.index;
            child.fieldEditable = true;
            if (child.field === undefined) {
              child.field = '';
            }
          });
          if (oldType === 'string' || oldType === 'auto') {
            this.expanded = true;
          }
        } else if (newType === 'array') {
          if (!this.childs) {
            this.childs = [];
          }
          this.childs.forEach(function (child, index) {
            child.clearDom();
            child.fieldEditable = false;
            child.index = index;
          });
          if (oldType === 'string' || oldType === 'auto') {
            this.expanded = true;
          }
        } else {
          this.expanded = false;
        }
        this._attachToDom(domAnchor);
      }
      if (newType === 'auto' || newType === 'string') {
        // cast value to the correct type
        if (newType === 'string') {
          this.value = String(this.value);
        } else {
          this.value = (0,util.parseString)(String(this.value));
        }
        this.focus();
      }
      this.updateDom({
        updateIndexes: true
      });
    }

    /**
     * Test whether the JSON contents of this node are deep equal to provided JSON object.
     * @param {*} json
     */
  }, {
    key: "deepEqual",
    value: function deepEqual(json) {
      var i;
      if (this.type === 'array') {
        if (!Array.isArray(json)) {
          return false;
        }
        if (this.childs.length !== json.length) {
          return false;
        }
        for (i = 0; i < this.childs.length; i++) {
          if (!this.childs[i].deepEqual(json[i])) {
            return false;
          }
        }
      } else if (this.type === 'object') {
        if (Node_typeof(json) !== 'object' || !json) {
          return false;
        }

        // we reckon with the order of the properties too.
        var props = Object.keys(json);
        if (this.childs.length !== props.length) {
          return false;
        }
        for (i = 0; i < props.length; i++) {
          var child = this.childs[i];
          if (child.field !== props[i] || !child.deepEqual(json[child.field])) {
            return false;
          }
        }
      } else {
        if (this.value !== json) {
          return false;
        }
      }
      return true;
    }

    /**
     * Retrieve value from DOM
     * @private
     */
  }, {
    key: "_getDomValue",
    value: function _getDomValue() {
      this._clearValueError();
      if (this.dom.value && this.type !== 'array' && this.type !== 'object') {
        this.valueInnerText = (0,util.getInnerText)(this.dom.value);
        if (this.valueInnerText === '' && this.dom.value.innerHTML !== '') {
          // When clearing the contents, often a <br/> remains, messing up the
          // styling of the empty text box. Therefore we remove the <br/>
          this.dom.value.textContent = '';
        }
      }
      if (this.valueInnerText !== undefined) {
        try {
          // retrieve the value
          var value;
          if (this.type === 'string') {
            value = this._unescapeHTML(this.valueInnerText);
          } else {
            var str = this._unescapeHTML(this.valueInnerText);
            value = (0,util.parseString)(str);
          }
          if (value !== this.value) {
            this.value = value;
            this._debouncedOnChangeValue();
          }
        } catch (err) {
          // keep the previous value
          this._setValueError((0,i18n/* translate */.Tl)('cannotParseValueError'));
        }
      }
    }

    /**
     * Show a local error in case of invalid value
     * @param {string} message
     * @private
     */
  }, {
    key: "_setValueError",
    value: function _setValueError(message) {
      this.valueError = {
        message: message
      };
      this.updateError();
    }
  }, {
    key: "_clearValueError",
    value: function _clearValueError() {
      if (this.valueError) {
        this.valueError = null;
        this.updateError();
      }
    }

    /**
     * Show a local error in case of invalid or duplicate field
     * @param {string} message
     * @private
     */
  }, {
    key: "_setFieldError",
    value: function _setFieldError(message) {
      this.fieldError = {
        message: message
      };
      this.updateError();
    }
  }, {
    key: "_clearFieldError",
    value: function _clearFieldError() {
      if (this.fieldError) {
        this.fieldError = null;
        this.updateError();
      }
    }

    /**
     * Handle a changed value
     * @private
     */
  }, {
    key: "_onChangeValue",
    value: function _onChangeValue() {
      // get current selection, then override the range such that we can select
      // the added/removed text on undo/redo
      var oldSelection = this.editor.getDomSelection();
      if (oldSelection.range) {
        var undoDiff = (0,util.textDiff)(String(this.value), String(this.previousValue));
        oldSelection.range.startOffset = undoDiff.start;
        oldSelection.range.endOffset = undoDiff.end;
      }
      var newSelection = this.editor.getDomSelection();
      if (newSelection.range) {
        var redoDiff = (0,util.textDiff)(String(this.previousValue), String(this.value));
        newSelection.range.startOffset = redoDiff.start;
        newSelection.range.endOffset = redoDiff.end;
      }
      this.editor._onAction('editValue', {
        path: this.getInternalPath(),
        oldValue: this.previousValue,
        newValue: this.value,
        oldSelection: oldSelection,
        newSelection: newSelection
      });
      this.previousValue = this.value;
    }

    /**
     * Handle a changed field
     * @private
     */
  }, {
    key: "_onChangeField",
    value: function _onChangeField() {
      // get current selection, then override the range such that we can select
      // the added/removed text on undo/redo
      var oldSelection = this.editor.getDomSelection();
      var previous = this.previousField || '';
      if (oldSelection.range) {
        var undoDiff = (0,util.textDiff)(this.field, previous);
        oldSelection.range.startOffset = undoDiff.start;
        oldSelection.range.endOffset = undoDiff.end;
      }
      var newSelection = this.editor.getDomSelection();
      if (newSelection.range) {
        var redoDiff = (0,util.textDiff)(previous, this.field);
        newSelection.range.startOffset = redoDiff.start;
        newSelection.range.endOffset = redoDiff.end;
      }
      this.editor._onAction('editField', {
        parentPath: this.parent.getInternalPath(),
        index: this.getIndex(),
        oldValue: this.previousField,
        newValue: this.field,
        oldSelection: oldSelection,
        newSelection: newSelection
      });
      this.previousField = this.field;
    }

    /**
     * Update dom value:
     * - the text color of the value, depending on the type of the value
     * - the height of the field, depending on the width
     * - background color in case it is empty
     * @private
     */
  }, {
    key: "_updateDomValue",
    value: function _updateDomValue() {
      var domValue = this.dom.value;
      if (domValue) {
        var classNames = ['jsoneditor-value'];

        // set text color depending on value type
        var value = this.value;
        var valueType = this.type === 'auto' ? (0,util.getType)(value) : this.type;
        var valueIsUrl = valueType === 'string' && (0,util.isUrl)(value);
        classNames.push('jsoneditor-' + valueType);
        if (valueIsUrl) {
          classNames.push('jsoneditor-url');
        }

        // visual styling when empty
        var isEmpty = String(this.value) === '' && this.type !== 'array' && this.type !== 'object';
        if (isEmpty) {
          classNames.push('jsoneditor-empty');
        }

        // highlight when there is a search result
        if (this.searchValueActive) {
          classNames.push('jsoneditor-highlight-active');
        }
        if (this.searchValue) {
          classNames.push('jsoneditor-highlight');
        }
        domValue.className = classNames.join(' ');

        // update title
        if (valueType === 'array' || valueType === 'object') {
          var count = this.childs ? this.childs.length : 0;
          domValue.title = this.type + ' containing ' + count + ' items';
        } else if (valueIsUrl && this.editable.value) {
          domValue.title = (0,i18n/* translate */.Tl)('openUrl');
        } else {
          domValue.title = '';
        }

        // show checkbox when the value is a boolean
        if (valueType === 'boolean' && this.editable.value) {
          if (!this.dom.checkbox) {
            this.dom.checkbox = document.createElement('input');
            this.dom.checkbox.type = 'checkbox';
            this.dom.tdCheckbox = document.createElement('td');
            this.dom.tdCheckbox.className = 'jsoneditor-tree';
            this.dom.tdCheckbox.appendChild(this.dom.checkbox);
            this.dom.tdValue.parentNode.insertBefore(this.dom.tdCheckbox, this.dom.tdValue);
          }
          this.dom.checkbox.checked = this.value;
        } else {
          // cleanup checkbox when displayed
          if (this.dom.tdCheckbox) {
            this.dom.tdCheckbox.parentNode.removeChild(this.dom.tdCheckbox);
            delete this.dom.tdCheckbox;
            delete this.dom.checkbox;
          }
        }

        // create select box when this node has an enum object
        if (this["enum"] && this.editable.value) {
          if (!this.dom.select) {
            this.dom.select = document.createElement('select');
            this.id = this.field + '_' + new Date().getUTCMilliseconds();
            this.dom.select.id = this.id;
            this.dom.select.name = this.dom.select.id;

            // Create the default empty option
            var defaultOption = document.createElement('option');
            defaultOption.value = '';
            defaultOption.textContent = '--';
            this.dom.select.appendChild(defaultOption);

            // Iterate all enum values and add them as options
            this._updateEnumOptions();
            this.dom.tdSelect = document.createElement('td');
            this.dom.tdSelect.className = 'jsoneditor-tree';
            this.dom.tdSelect.appendChild(this.dom.select);
            this.dom.tdValue.parentNode.insertBefore(this.dom.tdSelect, this.dom.tdValue);
          }

          // Select the matching value
          this.dom.select.value = this["enum"].indexOf(this.value) !== -1 ? this.value : ''; // default

          // If the enum is inside a composite type display
          // both the simple input and the dropdown field
          if (this.schema && !Node_hasOwnProperty(this.schema, 'oneOf') && !Node_hasOwnProperty(this.schema, 'anyOf') && !Node_hasOwnProperty(this.schema, 'allOf')) {
            this.valueFieldHTML = this.dom.tdValue.innerHTML;
            this.dom.tdValue.style.visibility = 'hidden';
            this.dom.tdValue.textContent = '';
          } else {
            delete this.valueFieldHTML;
          }
        } else {
          // cleanup select box when displayed, and attach the editable div instead
          if (this.dom.tdSelect) {
            this.dom.tdSelect.parentNode.removeChild(this.dom.tdSelect);
            delete this.dom.tdSelect;
            delete this.dom.select;
            this.dom.tdValue.innerHTML = this.valueFieldHTML;
            this.dom.tdValue.style.visibility = '';
            delete this.valueFieldHTML;
            this.dom.tdValue.appendChild(this.dom.value);
          }
        }

        // show color picker when value is a color
        if (this.editor.options.colorPicker && typeof value === 'string' && (0,util.isValidColor)(value)) {
          if (!this.dom.color) {
            this.dom.color = document.createElement('div');
            this.dom.color.className = 'jsoneditor-color';
            this.dom.tdColor = document.createElement('td');
            this.dom.tdColor.className = 'jsoneditor-tree';
            this.dom.tdColor.appendChild(this.dom.color);
            this.dom.tdValue.parentNode.insertBefore(this.dom.tdColor, this.dom.tdValue);
          }

          // update styling of value and color background
          (0,util.addClassName)(this.dom.value, 'jsoneditor-color-value');
          if (!this.editable.value) {
            (0,util.addClassName)(this.dom.color, 'jsoneditor-color-readonly');
          } else {
            (0,util.removeClassName)(this.dom.color, 'jsoneditor-color-readonly');
          }
          this.dom.color.style.backgroundColor = value;
        } else {
          // cleanup color picker when displayed
          this._deleteDomColor();
        }

        // show date tag when value is a timestamp in milliseconds
        if (this._showTimestampTag()) {
          if (!this.dom.date) {
            this.dom.date = document.createElement('div');
            this.dom.date.className = 'jsoneditor-date';
            this.dom.value.parentNode.appendChild(this.dom.date);
          }
          var title = null;
          if (typeof this.editor.options.timestampFormat === 'function') {
            title = this.editor.options.timestampFormat({
              field: this.field,
              value: this.value,
              path: this.getPath()
            });
          }
          if (!title) {
            this.dom.date.textContent = new Date(value).toISOString();
          } else {
            while (this.dom.date.firstChild) {
              this.dom.date.removeChild(this.dom.date.firstChild);
            }
            this.dom.date.appendChild(document.createTextNode(title));
          }
          this.dom.date.title = new Date(value).toString();
        } else {
          // cleanup date tag
          if (this.dom.date) {
            this.dom.date.parentNode.removeChild(this.dom.date);
            delete this.dom.date;
          }
        }

        // strip formatting from the contents of the editable div
        (0,util.stripFormatting)(domValue);
        this._updateDomDefault();
      }
    }
  }, {
    key: "_updateEnumOptions",
    value: function _updateEnumOptions() {
      if (!this["enum"] || !this.dom.select) {
        return;
      }

      // clear the existing options
      this.dom.select.innerHTML = '';

      // Iterate all enum values and add them as options
      for (var i = 0; i < this["enum"].length; i++) {
        var option = document.createElement('option');
        option.value = this["enum"][i];
        option.textContent = this["enum"][i];
        this.dom.select.appendChild(option);
      }
    }
  }, {
    key: "_deleteDomColor",
    value: function _deleteDomColor() {
      if (this.dom.color) {
        this.dom.tdColor.parentNode.removeChild(this.dom.tdColor);
        delete this.dom.tdColor;
        delete this.dom.color;
        (0,util.removeClassName)(this.dom.value, 'jsoneditor-color-value');
      }
    }

    /**
     * Update dom field:
     * - the text color of the field, depending on the text
     * - the height of the field, depending on the width
     * - background color in case it is empty
     * @private
     */
  }, {
    key: "_updateDomField",
    value: function _updateDomField() {
      var domField = this.dom.field;
      if (domField) {
        var tooltip = (0,util.makeFieldTooltip)(this.schema, this.editor.options.language);
        if (tooltip) {
          domField.title = tooltip;
        }

        // make background color lightgray when empty
        var isEmpty = String(this.field) === '' && this.parent && this.parent.type !== 'array';
        if (isEmpty) {
          (0,util.addClassName)(domField, 'jsoneditor-empty');
        } else {
          (0,util.removeClassName)(domField, 'jsoneditor-empty');
        }

        // highlight when there is a search result
        if (this.searchFieldActive) {
          (0,util.addClassName)(domField, 'jsoneditor-highlight-active');
        } else {
          (0,util.removeClassName)(domField, 'jsoneditor-highlight-active');
        }
        if (this.searchField) {
          (0,util.addClassName)(domField, 'jsoneditor-highlight');
        } else {
          (0,util.removeClassName)(domField, 'jsoneditor-highlight');
        }

        // strip formatting from the contents of the editable div
        (0,util.stripFormatting)(domField);
      }
    }

    /**
     * Retrieve field from DOM
     * @param {boolean} [forceUnique]  If true, the field name will be changed
     *                                 into a unique name in case it is a duplicate.
     * @private
     */
  }, {
    key: "_getDomField",
    value: function _getDomField(forceUnique) {
      this._clearFieldError();
      if (this.dom.field && this.fieldEditable) {
        this.fieldInnerText = (0,util.getInnerText)(this.dom.field);
        if (this.fieldInnerText === '' && this.dom.field.innerHTML !== '') {
          // When clearing the contents, often a <br/> remains, messing up the
          // styling of the empty text box. Therefore we remove the <br/>
          this.dom.field.textContent = '';
        }
      }
      if (this.fieldInnerText !== undefined) {
        try {
          var field = this._unescapeHTML(this.fieldInnerText);
          var existingFieldNames = this.parent.getFieldNames(this);
          var isDuplicate = existingFieldNames.indexOf(field) !== -1;
          if (!isDuplicate) {
            if (field !== this.field) {
              this.field = field;
              this._debouncedOnChangeField();
            }
          } else {
            if (forceUnique) {
              // fix duplicate field: change it into a unique name
              field = (0,util.findUniqueName)(field, existingFieldNames);
              if (field !== this.field) {
                this.field = field;

                // TODO: don't debounce but resolve right away, and cancel current debounce
                this._debouncedOnChangeField();
              }
            } else {
              this._setFieldError((0,i18n/* translate */.Tl)('duplicateFieldError'));
            }
          }
        } catch (err) {
          // keep the previous field value
          this._setFieldError((0,i18n/* translate */.Tl)('cannotParseFieldError'));
        }
      }
    }

    /**
     * Update the value of the schema default element in the DOM.
     * @private
     * @returns {undefined}
     */
  }, {
    key: "_updateDomDefault",
    value: function _updateDomDefault() {
      // Short-circuit if schema is missing, has no default, or if Node has children
      if (!this.schema || this.schema["default"] === undefined || this._hasChilds()) {
        return;
      }

      // select either enum dropdown (select) or input value
      var inputElement = this.dom.select ? this.dom.select : this.dom.value;
      if (!inputElement) {
        return;
      }
      if (this.value === this.schema["default"]) {
        inputElement.title = (0,i18n/* translate */.Tl)('default');
        (0,util.addClassName)(inputElement, 'jsoneditor-is-default');
        (0,util.removeClassName)(inputElement, 'jsoneditor-is-not-default');
      } else {
        inputElement.removeAttribute('title');
        (0,util.removeClassName)(inputElement, 'jsoneditor-is-default');
        (0,util.addClassName)(inputElement, 'jsoneditor-is-not-default');
      }
    }

    /**
     * Test whether to show a timestamp tag or not
     * @return {boolean} Returns true when the value is a timestamp
     */
  }, {
    key: "_showTimestampTag",
    value: function _showTimestampTag() {
      if (typeof this.value !== 'number') {
        return false;
      }
      var timestampTag = this.editor.options.timestampTag;
      if (typeof timestampTag === 'function') {
        var result = timestampTag({
          field: this.field,
          value: this.value,
          path: this.getPath()
        });
        if (typeof result === 'boolean') {
          return result;
        } else {
          return (0,util.isTimestamp)(this.field, this.value);
        }
      } else if (timestampTag === true) {
        return (0,util.isTimestamp)(this.field, this.value);
      } else {
        return false;
      }
    }

    /**
     * Clear the dom of the node
     */
  }, {
    key: "clearDom",
    value: function clearDom() {
      // TODO: hide the node first?
      // this.hide();
      // TODO: recursively clear dom?

      this.dom = {};
    }

    /**
     * Get the HTML DOM TR element of the node.
     * The dom will be generated when not yet created
     * @return {Element} tr    HTML DOM TR Element
     */
  }, {
    key: "getDom",
    value: function getDom() {
      var dom = this.dom;
      if (dom.tr) {
        return dom.tr;
      }
      this._updateEditability();

      // create row
      dom.tr = document.createElement('tr');
      dom.tr.node = this;
      if (this.editor.options.mode === 'tree') {
        // note: we take here the global setting
        var tdDrag = document.createElement('td');
        if (this.editable.field) {
          // create draggable area
          if (this.parent) {
            var domDrag = document.createElement('button');
            domDrag.type = 'button';
            dom.drag = domDrag;
            domDrag.className = 'jsoneditor-button jsoneditor-dragarea';
            domDrag.title = (0,i18n/* translate */.Tl)('drag');
            tdDrag.appendChild(domDrag);
          }
        }
        dom.tr.appendChild(tdDrag);

        // create context menu
        var tdMenu = document.createElement('td');
        var menu = document.createElement('button');
        menu.type = 'button';
        dom.menu = menu;
        menu.className = 'jsoneditor-button jsoneditor-contextmenu-button';
        menu.title = (0,i18n/* translate */.Tl)('actionsMenu');
        tdMenu.appendChild(dom.menu);
        dom.tr.appendChild(tdMenu);
      }

      // create tree and field
      var tdField = document.createElement('td');
      dom.tr.appendChild(tdField);
      dom.tree = this._createDomTree();
      tdField.appendChild(dom.tree);
      this.updateDom({
        updateIndexes: true
      });
      return dom.tr;
    }

    /**
     * Test whether a Node is rendered and visible
     * @returns {boolean}
     */
  }, {
    key: "isVisible",
    value: function isVisible() {
      return this.dom && this.dom.tr && this.dom.tr.parentNode || false;
    }

    /**
     * Test if this node is a sescendant of an other node
     * @param {Node} node
     * @return {boolean} isDescendant
     * @private
     */
  }, {
    key: "isDescendantOf",
    value: function isDescendantOf(node) {
      var n = this.parent;
      while (n) {
        if (n === node) {
          return true;
        }
        n = n.parent;
      }
      return false;
    }

    /**
     * Create an editable field
     * @return {Element} domField
     * @private
     */
  }, {
    key: "_createDomField",
    value: function _createDomField() {
      return document.createElement('div');
    }

    /**
     * Set highlighting for this node and all its childs.
     * Only applied to the currently visible (expanded childs)
     * @param {boolean} highlight
     */
  }, {
    key: "setHighlight",
    value: function setHighlight(highlight) {
      if (this.dom.tr) {
        if (highlight) {
          (0,util.addClassName)(this.dom.tr, 'jsoneditor-highlight');
        } else {
          (0,util.removeClassName)(this.dom.tr, 'jsoneditor-highlight');
        }
        if (this.append) {
          this.append.setHighlight(highlight);
        }
        if (this.childs) {
          this.childs.forEach(function (child) {
            child.setHighlight(highlight);
          });
        }
      }
    }

    /**
     * Select or deselect a node
     * @param {boolean} selected
     * @param {boolean} [isFirst]
     */
  }, {
    key: "setSelected",
    value: function setSelected(selected, isFirst) {
      this.selected = selected;
      if (this.dom.tr) {
        if (selected) {
          (0,util.addClassName)(this.dom.tr, 'jsoneditor-selected');
        } else {
          (0,util.removeClassName)(this.dom.tr, 'jsoneditor-selected');
        }
        if (isFirst) {
          (0,util.addClassName)(this.dom.tr, 'jsoneditor-first');
        } else {
          (0,util.removeClassName)(this.dom.tr, 'jsoneditor-first');
        }
        if (this.append) {
          this.append.setSelected(selected);
        }
        if (this.showMore) {
          this.showMore.setSelected(selected);
        }
        if (this.childs) {
          this.childs.forEach(function (child) {
            child.setSelected(selected);
          });
        }
      }
    }

    /**
     * Update the value of the node. Only primitive types are allowed, no Object
     * or Array is allowed.
     * @param {String | Number | Boolean | null} value
     */
  }, {
    key: "updateValue",
    value: function updateValue(value) {
      this.value = value;
      this.previousValue = value;
      this.valueError = undefined;
      this.updateDom();
    }

    /**
     * Update the field of the node.
     * @param {String} field
     */
  }, {
    key: "updateField",
    value: function updateField(field) {
      this.field = field;
      this.previousField = field;
      this.fieldError = undefined;
      this.updateDom();
    }

    /**
     * Update the HTML DOM, optionally recursing through the childs
     * @param {Object} [options] Available parameters:
     *                          {boolean} [recurse]         If true, the
     *                          DOM of the childs will be updated recursively.
     *                          False by default.
     *                          {boolean} [updateIndexes]   If true, the childs
     *                          indexes of the node will be updated too. False by
     *                          default.
     */
  }, {
    key: "updateDom",
    value: function updateDom(options) {
      // update level indentation
      var domTree = this.dom.tree;
      if (domTree) {
        domTree.style.marginLeft = this.getLevel() * 24 + 'px';
      }

      // apply field to DOM
      var domField = this.dom.field;
      if (domField) {
        if (this.fieldEditable) {
          // parent is an object
          domField.contentEditable = this.editable.field;
          domField.spellcheck = false;
          domField.className = 'jsoneditor-field';
        } else {
          // parent is an array this is the root node
          domField.contentEditable = false;
          domField.className = 'jsoneditor-readonly';
        }
        var fieldText;
        if (this.index !== undefined) {
          fieldText = this.index;
        } else if (this.field !== undefined) {
          fieldText = this.field;
        } else {
          var schema = this.editor.options.schema ? Node._findSchema(this.editor.options.schema, this.editor.options.schemaRefs || {}, this.getPath()) : undefined;
          if (schema && schema.title) {
            fieldText = schema.title;
          } else if (this._hasChilds()) {
            fieldText = this.type;
          } else {
            fieldText = '';
          }
        }
        var escapedField = this._escapeHTML(fieldText);
        if (document.activeElement !== domField && escapedField !== this._unescapeHTML((0,util.getInnerText)(domField))) {
          // only update if it not has the focus or when there is an actual change,
          // else you would needlessly loose the caret position when changing tabs
          // or whilst typing
          domField.innerHTML = escapedField;
        }
        this._updateSchema();
        this._updateEnumOptions();
      }

      // apply value to DOM
      var domValue = this.dom.value;
      if (domValue) {
        if (this.type === 'array' || this.type === 'object') {
          this.updateNodeName();
        } else {
          var escapedValue = this._escapeHTML(this.value);
          if (document.activeElement !== domValue && escapedValue !== this._unescapeHTML((0,util.getInnerText)(domValue))) {
            // only update if it not has the focus or when there is an actual change,
            // else you would needlessly loose the caret position when changing tabs
            // or whilst typing
            domValue.innerHTML = escapedValue;
          }
        }
      }

      // apply styling to the table row
      var tr = this.dom.tr;
      if (tr) {
        if (this.type === 'array' || this.type === 'object') {
          (0,util.addClassName)(tr, 'jsoneditor-expandable');
          if (this.expanded) {
            (0,util.addClassName)(tr, 'jsoneditor-expanded');
            (0,util.removeClassName)(tr, 'jsoneditor-collapsed');
          } else {
            (0,util.addClassName)(tr, 'jsoneditor-collapsed');
            (0,util.removeClassName)(tr, 'jsoneditor-expanded');
          }
        } else {
          (0,util.removeClassName)(tr, 'jsoneditor-expandable');
          (0,util.removeClassName)(tr, 'jsoneditor-expanded');
          (0,util.removeClassName)(tr, 'jsoneditor-collapsed');
        }
      }

      // update field and value
      this._updateDomField();
      this._updateDomValue();

      // update childs indexes
      if (options && options.updateIndexes === true) {
        // updateIndexes is true or undefined
        this._updateDomIndexes();
      }

      // update childs recursively
      if (options && options.recurse === true) {
        if (this.childs) {
          this.childs.forEach(function (child) {
            child.updateDom(options);
          });
        }
      }

      // update rendering of error
      if (this.error) {
        this.updateError();
      }

      // update row with append button
      if (this.append) {
        this.append.updateDom();
      }

      // update "show more" text at the bottom of large arrays
      if (this.showMore) {
        this.showMore.updateDom();
      }

      // fire onClassName
      this._updateCssClassName();
    }

    /**
     * Locate the JSON schema of the node and check for any enum type
     * @private
     */
  }, {
    key: "_updateSchema",
    value: function _updateSchema() {
      // Locating the schema of the node and checking for any enum type
      if (this.editor && this.editor.options) {
        // find the part of the json schema matching this nodes path
        this.schema = this.editor.options.schema
        // fix childSchema with $ref, and not display the select element on the child schema because of not found enum
        ? Node._findSchema(this.editor.options.schema, this.editor.options.schemaRefs || {}, this.getPath()) : null;
        if (this.schema) {
          this["enum"] = Node._findEnum(this.schema);
        } else {
          delete this["enum"];
        }
      }
    }

    /**
     * Update the DOM of the childs of a node: update indexes and undefined field
     * names.
     * Only applicable when structure is an array or object
     * @private
     */
  }, {
    key: "_updateDomIndexes",
    value: function _updateDomIndexes() {
      var domValue = this.dom.value;
      var childs = this.childs;
      if (domValue && childs) {
        if (this.type === 'array') {
          childs.forEach(function (child, index) {
            child.index = index;
            var childField = child.dom.field;
            if (childField) {
              childField.textContent = index;
            }
          });
        } else if (this.type === 'object') {
          childs.forEach(function (child) {
            if (child.index !== undefined) {
              delete child.index;
              if (child.field === undefined) {
                child.field = '';
              }
            }
          });
        }
      }
    }

    /**
     * Create an editable value
     * @private
     */
  }, {
    key: "_createDomValue",
    value: function _createDomValue() {
      var domValue;
      if (this.type === 'array') {
        domValue = document.createElement('div');
        domValue.textContent = '[...]';
      } else if (this.type === 'object') {
        domValue = document.createElement('div');
        domValue.textContent = '{...}';
      } else {
        if (!this.editable.value && (0,util.isUrl)(this.value)) {
          // create a link in case of read-only editor and value containing an url
          domValue = document.createElement('a');
          domValue.href = this.value;
          domValue.innerHTML = this._escapeHTML(this.value);
        } else {
          // create an editable or read-only div
          domValue = document.createElement('div');
          domValue.contentEditable = this.editable.value;
          domValue.spellcheck = false;
          domValue.innerHTML = this._escapeHTML(this.value);
        }
      }
      return domValue;
    }

    /**
     * Create an expand/collapse button
     * @return {Element} expand
     * @private
     */
  }, {
    key: "_createDomExpandButton",
    value: function _createDomExpandButton() {
      // create expand button
      var expand = document.createElement('button');
      expand.type = 'button';
      if (this._hasChilds()) {
        expand.className = this.expanded ? 'jsoneditor-button jsoneditor-expanded' : 'jsoneditor-button jsoneditor-collapsed';
        expand.title = (0,i18n/* translate */.Tl)('expandTitle');
      } else {
        expand.className = 'jsoneditor-button jsoneditor-invisible';
        expand.title = '';
      }
      return expand;
    }

    /**
     * Create a DOM tree element, containing the expand/collapse button
     * @return {Element} domTree
     * @private
     */
  }, {
    key: "_createDomTree",
    value: function _createDomTree() {
      var dom = this.dom;
      var domTree = document.createElement('table');
      var tbody = document.createElement('tbody');
      domTree.style.borderCollapse = 'collapse'; // TODO: put in css
      domTree.className = 'jsoneditor-values';
      domTree.appendChild(tbody);
      var tr = document.createElement('tr');
      tbody.appendChild(tr);

      // create expand button
      var tdExpand = document.createElement('td');
      tdExpand.className = 'jsoneditor-tree';
      tr.appendChild(tdExpand);
      dom.expand = this._createDomExpandButton();
      tdExpand.appendChild(dom.expand);
      dom.tdExpand = tdExpand;

      // create the field
      var tdField = document.createElement('td');
      tdField.className = 'jsoneditor-tree';
      tr.appendChild(tdField);
      dom.field = this._createDomField();
      tdField.appendChild(dom.field);
      dom.tdField = tdField;

      // create a separator
      var tdSeparator = document.createElement('td');
      tdSeparator.className = 'jsoneditor-tree';
      tr.appendChild(tdSeparator);
      if (this.type !== 'object' && this.type !== 'array') {
        tdSeparator.appendChild(document.createTextNode(':'));
        tdSeparator.className = 'jsoneditor-separator';
      }
      dom.tdSeparator = tdSeparator;

      // create the value
      var tdValue = document.createElement('td');
      tdValue.className = 'jsoneditor-tree';
      tr.appendChild(tdValue);
      dom.value = this._createDomValue();
      tdValue.appendChild(dom.value);
      dom.tdValue = tdValue;
      return domTree;
    }

    /**
     * Handle an event. The event is caught centrally by the editor
     * @param {Event} event
     */
  }, {
    key: "onEvent",
    value: function onEvent(event) {
      var type = event.type;
      var target = event.target || event.srcElement;
      var dom = this.dom;
      var node = this;
      var expandable = this._hasChilds();

      // check if mouse is on menu or on dragarea.
      // If so, highlight current row and its childs
      if (target === dom.drag || target === dom.menu) {
        if (type === 'mouseover') {
          this.editor.highlighter.highlight(this);
        } else if (type === 'mouseout') {
          this.editor.highlighter.unhighlight();
        }
      }

      // context menu events
      if (type === 'click' && target === dom.menu) {
        var highlighter = node.editor.highlighter;
        highlighter.highlight(node);
        highlighter.lock();
        (0,util.addClassName)(dom.menu, 'jsoneditor-selected');
        this.showContextMenu(dom.menu, function () {
          (0,util.removeClassName)(dom.menu, 'jsoneditor-selected');
          highlighter.unlock();
          highlighter.unhighlight();
        });
      }

      // expand events
      if (type === 'click') {
        if (target === dom.expand) {
          if (expandable) {
            var recurse = event.ctrlKey; // with ctrl-key, expand/collapse all
            this._onExpand(recurse);
          }
        }
      }
      if (type === 'click' && (event.target === node.dom.tdColor || event.target === node.dom.color) && this.editable.value) {
        this._showColorPicker();
      }

      // swap the value of a boolean when the checkbox displayed left is clicked
      if (type === 'change' && target === dom.checkbox) {
        this.dom.value.textContent = String(!this.value);
        this._getDomValue();
        this._updateDomDefault();
      }

      // update the value of the node based on the selected option
      if (type === 'change' && target === dom.select) {
        this.dom.value.innerHTML = this._escapeHTML(dom.select.value);
        this._getDomValue();
        this._updateDomValue();
      }

      // value events
      var domValue = dom.value;
      if (target === domValue) {
        // noinspection FallthroughInSwitchStatementJS
        switch (type) {
          case 'blur':
          case 'change':
            {
              this._getDomValue();
              this._clearValueError();
              this._updateDomValue();
              var escapedValue = this._escapeHTML(this.value);
              if (escapedValue !== this._unescapeHTML((0,util.getInnerText)(domValue))) {
                // only update when there is an actual change, else you loose the
                // caret position when changing tabs or whilst typing
                domValue.innerHTML = escapedValue;
              }
              break;
            }
          case 'input':
            // this._debouncedGetDomValue(true); // TODO
            this._getDomValue();
            this._updateDomValue();
            break;
          case 'keydown':
          case 'mousedown':
            // TODO: cleanup
            this.editor.selection = this.editor.getDomSelection();
            break;
          case 'click':
            if (event.ctrlKey && this.editable.value) {
              // if read-only, we use the regular click behavior of an anchor
              if ((0,util.isUrl)(this.value)) {
                event.preventDefault();
                window.open(this.value, '_blank', 'noreferrer');
              }
            }
            break;
          case 'keyup':
            // this._debouncedGetDomValue(true); // TODO
            this._getDomValue();
            this._updateDomValue();
            break;
          case 'cut':
          case 'paste':
            setTimeout(function () {
              node._getDomValue();
              node._updateDomValue();
            }, 1);
            break;
        }
      }

      // field events
      var domField = dom.field;
      if (target === domField) {
        switch (type) {
          case 'blur':
            {
              this._getDomField(true);
              this._updateDomField();
              var escapedField = this._escapeHTML(this.field);
              if (escapedField !== this._unescapeHTML((0,util.getInnerText)(domField))) {
                // only update when there is an actual change, else you loose the
                // caret position when changing tabs or whilst typing
                domField.innerHTML = escapedField;
              }
              break;
            }
          case 'input':
            this._getDomField();
            this._updateSchema();
            this._updateDomField();
            this._updateDomValue();
            break;
          case 'keydown':
          case 'mousedown':
            this.editor.selection = this.editor.getDomSelection();
            break;
          case 'keyup':
            this._getDomField();
            this._updateDomField();
            break;
          case 'cut':
          case 'paste':
            setTimeout(function () {
              node._getDomField();
              node._updateDomField();
            }, 1);
            break;
        }
      }

      // focus
      // when clicked in whitespace left or right from the field or value, set focus
      var domTree = dom.tree;
      if (domTree && target === domTree.parentNode && type === 'click' && !event.hasMoved) {
        var left = event.offsetX !== undefined ? event.offsetX < (this.getLevel() + 1) * 24 : event.pageX < (0,util.getAbsoluteLeft)(dom.tdSeparator); // for FF
        if (left || expandable) {
          // node is expandable when it is an object or array
          if (domField) {
            (0,util.setEndOfContentEditable)(domField);
            domField.focus();
          }
        } else {
          if (domValue && !this["enum"]) {
            (0,util.setEndOfContentEditable)(domValue);
            domValue.focus();
          }
        }
      }
      if ((target === dom.tdExpand && !expandable || target === dom.tdField || target === dom.tdSeparator) && type === 'click' && !event.hasMoved) {
        if (domField) {
          (0,util.setEndOfContentEditable)(domField);
          domField.focus();
        }
      }
      if (type === 'keydown') {
        this.onKeyDown(event);
      }

      // fire after applying for example a change by clicking a checkbox
      if (typeof this.editor.options.onEvent === 'function') {
        this._onEvent(event);
      }
    }

    /**
     * Trigger external onEvent provided in options if node is a JSON field or
     * value.
     * Information provided depends on the element, value is only included if
     * event occurs in a JSON value:
     * {field: string, path: {string|number}[] [, value: string]}
     * @param {Event} event
     * @private
     */
  }, {
    key: "_onEvent",
    value: function _onEvent(event) {
      var element = event.target;
      var isField = element === this.dom.field;
      var isValue = element === this.dom.value || element === this.dom.checkbox || element === this.dom.select;
      if (isField || isValue) {
        var info = {
          field: this.getField(),
          path: this.getPath()
        };

        // For leaf values, include value
        if (isValue && !this._hasChilds()) {
          info.value = this.getValue();
        }
        this.editor.options.onEvent(info, event);
      }
    }

    /**
     * Key down event handler
     * @param {Event} event
     */
  }, {
    key: "onKeyDown",
    value: function onKeyDown(event) {
      var keynum = event.which || event.keyCode;
      var target = event.target || event.srcElement;
      var ctrlKey = event.ctrlKey;
      var shiftKey = event.shiftKey;
      var altKey = event.altKey;
      var handled = false;
      var prevNode, nextNode, nextDom, nextDom2;
      var editable = this.editor.options.mode === 'tree';
      var oldSelection;
      var oldNextNode;
      var oldParent;
      var oldIndexRedo;
      var newIndexRedo;
      var oldParentPathRedo;
      var newParentPathRedo;
      var nodes;
      var multiselection;
      var selectedNodes = this.editor.multiselection.nodes.length > 0 ? this.editor.multiselection.nodes : [this];
      var firstNode = selectedNodes[0];
      var lastNode = selectedNodes[selectedNodes.length - 1];

      // console.log(ctrlKey, keynum, event.charCode); // TODO: cleanup
      if (keynum === 13) {
        // Enter
        if (target === this.dom.value) {
          if (!this.editable.value || event.ctrlKey) {
            if ((0,util.isUrl)(this.value)) {
              window.open(this.value, '_blank', 'noreferrer');
              handled = true;
            }
          }
        } else if (target === this.dom.expand) {
          var expandable = this._hasChilds();
          if (expandable) {
            var recurse = event.ctrlKey; // with ctrl-key, expand/collapse all
            this._onExpand(recurse);
            target.focus();
            handled = true;
          }
        }
      } else if (keynum === 68) {
        // D
        if (ctrlKey && editable) {
          // Ctrl+D
          Node.onDuplicate(selectedNodes);
          handled = true;
        }
      } else if (keynum === 69) {
        // E
        if (ctrlKey) {
          // Ctrl+E and Ctrl+Shift+E
          this._onExpand(shiftKey); // recurse = shiftKey
          target.focus(); // TODO: should restore focus in case of recursing expand (which takes DOM offline)
          handled = true;
        }
      } else if (keynum === 77 && editable) {
        // M
        if (ctrlKey) {
          // Ctrl+M
          this.showContextMenu(target);
          handled = true;
        }
      } else if (keynum === 46 && editable) {
        // Del
        if (ctrlKey) {
          // Ctrl+Del
          Node.onRemove(selectedNodes);
          handled = true;
        }
      } else if (keynum === 45 && editable) {
        // Ins
        if (ctrlKey && !shiftKey) {
          // Ctrl+Ins
          this._onInsertBefore();
          handled = true;
        } else if (ctrlKey && shiftKey) {
          // Ctrl+Shift+Ins
          this._onInsertAfter();
          handled = true;
        }
      } else if (keynum === 35) {
        // End
        if (altKey) {
          // Alt+End
          // find the last node
          var endNode = this._lastNode();
          if (endNode) {
            endNode.focus(Node.focusElement || this._getElementName(target));
          }
          handled = true;
        }
      } else if (keynum === 36) {
        // Home
        if (altKey) {
          // Alt+Home
          // find the first node
          var homeNode = this._firstNode();
          if (homeNode) {
            homeNode.focus(Node.focusElement || this._getElementName(target));
          }
          handled = true;
        }
      } else if (keynum === 37) {
        // Arrow Left
        if (altKey && !shiftKey) {
          // Alt + Arrow Left
          // move to left element
          var prevElement = this._previousElement(target);
          if (prevElement) {
            this.focus(this._getElementName(prevElement));
          }
          handled = true;
        } else if (altKey && shiftKey && editable) {
          // Alt + Shift + Arrow left
          if (lastNode.expanded) {
            var appendDom = lastNode.getAppendDom();
            nextDom = appendDom ? appendDom.nextSibling : undefined;
          } else {
            var dom = lastNode.getDom();
            nextDom = dom.nextSibling;
          }
          if (nextDom) {
            nextNode = Node.getNodeFromTarget(nextDom);
            nextDom2 = nextDom.nextSibling;
            var nextNode2 = Node.getNodeFromTarget(nextDom2);
            if (nextNode && nextNode instanceof AppendNode && !(lastNode.parent.childs.length === 1) && nextNode2 && nextNode2.parent) {
              oldSelection = this.editor.getDomSelection();
              oldParent = firstNode.parent;
              oldNextNode = oldParent.childs[lastNode.getIndex() + 1] || oldParent.append;
              oldIndexRedo = firstNode.getIndex();
              newIndexRedo = nextNode2.getIndex();
              oldParentPathRedo = oldParent.getInternalPath();
              newParentPathRedo = nextNode2.parent.getInternalPath();
              selectedNodes.forEach(function (node) {
                nextNode2.parent.moveBefore(node, nextNode2);
              });
              this.focus(Node.focusElement || this._getElementName(target));
              this.editor._onAction('moveNodes', {
                count: selectedNodes.length,
                fieldNames: selectedNodes.map(getField),
                oldParentPath: oldParent.getInternalPath(),
                newParentPath: firstNode.parent.getInternalPath(),
                oldIndex: oldNextNode.getIndex(),
                newIndex: firstNode.getIndex(),
                oldIndexRedo: oldIndexRedo,
                newIndexRedo: newIndexRedo,
                oldParentPathRedo: oldParentPathRedo,
                newParentPathRedo: newParentPathRedo,
                oldSelection: oldSelection,
                newSelection: this.editor.getDomSelection()
              });
            }
          }
        }
      } else if (keynum === 38) {
        // Arrow Up
        if (altKey && !shiftKey) {
          // Alt + Arrow Up
          // find the previous node
          prevNode = this._previousNode();
          if (prevNode) {
            this.editor.deselect(true);
            prevNode.focus(Node.focusElement || this._getElementName(target));
          }
          handled = true;
        } else if (!altKey && ctrlKey && shiftKey && editable) {
          // Ctrl + Shift + Arrow Up
          // select multiple nodes
          prevNode = this._previousNode();
          if (prevNode) {
            multiselection = this.editor.multiselection;
            multiselection.start = multiselection.start || this;
            multiselection.end = prevNode;
            nodes = this.editor._findTopLevelNodes(multiselection.start, multiselection.end);
            this.editor.select(nodes);
            prevNode.focus('field'); // select field as we know this always exists
          }
          handled = true;
        } else if (altKey && shiftKey && editable) {
          // Alt + Shift + Arrow Up
          // find the previous node
          prevNode = firstNode._previousNode();
          if (prevNode && prevNode.parent) {
            oldSelection = this.editor.getDomSelection();
            oldParent = firstNode.parent;
            oldNextNode = oldParent.childs[lastNode.getIndex() + 1] || oldParent.append;
            oldIndexRedo = firstNode.getIndex();
            newIndexRedo = prevNode.getIndex();
            oldParentPathRedo = oldParent.getInternalPath();
            newParentPathRedo = prevNode.parent.getInternalPath();
            selectedNodes.forEach(function (node) {
              prevNode.parent.moveBefore(node, prevNode);
            });
            this.focus(Node.focusElement || this._getElementName(target));
            this.editor._onAction('moveNodes', {
              count: selectedNodes.length,
              fieldNames: selectedNodes.map(getField),
              oldParentPath: oldParent.getInternalPath(),
              newParentPath: firstNode.parent.getInternalPath(),
              oldIndex: oldNextNode.getIndex(),
              newIndex: firstNode.getIndex(),
              oldIndexRedo: oldIndexRedo,
              newIndexRedo: newIndexRedo,
              oldParentPathRedo: oldParentPathRedo,
              newParentPathRedo: newParentPathRedo,
              oldSelection: oldSelection,
              newSelection: this.editor.getDomSelection()
            });
          }
          handled = true;
        }
      } else if (keynum === 39) {
        // Arrow Right
        if (altKey && !shiftKey) {
          // Alt + Arrow Right
          // move to right element
          var nextElement = this._nextElement(target);
          if (nextElement) {
            this.focus(this._getElementName(nextElement));
          }
          handled = true;
        } else if (altKey && shiftKey && editable) {
          // Alt + Shift + Arrow Right
          var _dom = firstNode.getDom();
          var prevDom = _dom.previousSibling;
          if (prevDom) {
            prevNode = Node.getNodeFromTarget(prevDom);
            if (prevNode && prevNode.parent && !prevNode.isVisible()) {
              oldSelection = this.editor.getDomSelection();
              oldParent = firstNode.parent;
              oldNextNode = oldParent.childs[lastNode.getIndex() + 1] || oldParent.append;
              oldIndexRedo = firstNode.getIndex();
              newIndexRedo = prevNode.getIndex();
              oldParentPathRedo = oldParent.getInternalPath();
              newParentPathRedo = prevNode.parent.getInternalPath();
              selectedNodes.forEach(function (node) {
                prevNode.parent.moveBefore(node, prevNode);
              });
              this.focus(Node.focusElement || this._getElementName(target));
              this.editor._onAction('moveNodes', {
                count: selectedNodes.length,
                fieldNames: selectedNodes.map(getField),
                oldParentPath: oldParent.getInternalPath(),
                newParentPath: firstNode.parent.getInternalPath(),
                oldIndex: oldNextNode.getIndex(),
                newIndex: firstNode.getIndex(),
                oldIndexRedo: oldIndexRedo,
                newIndexRedo: newIndexRedo,
                oldParentPathRedo: oldParentPathRedo,
                newParentPathRedo: newParentPathRedo,
                oldSelection: oldSelection,
                newSelection: this.editor.getDomSelection()
              });
            }
          }
        }
      } else if (keynum === 40) {
        // Arrow Down
        if (altKey && !shiftKey) {
          // Alt + Arrow Down
          // find the next node
          nextNode = this._nextNode();
          if (nextNode) {
            this.editor.deselect(true);
            nextNode.focus(Node.focusElement || this._getElementName(target));
          }
          handled = true;
        } else if (!altKey && ctrlKey && shiftKey && editable) {
          // Ctrl + Shift + Arrow Down
          // select multiple nodes
          nextNode = this._nextNode();
          if (nextNode) {
            multiselection = this.editor.multiselection;
            multiselection.start = multiselection.start || this;
            multiselection.end = nextNode;
            nodes = this.editor._findTopLevelNodes(multiselection.start, multiselection.end);
            this.editor.select(nodes);
            nextNode.focus('field'); // select field as we know this always exists
          }
          handled = true;
        } else if (altKey && shiftKey && editable) {
          // Alt + Shift + Arrow Down
          // find the 2nd next node and move before that one
          if (lastNode.expanded) {
            nextNode = lastNode.append ? lastNode.append._nextNode() : undefined;
          } else {
            nextNode = lastNode._nextNode();
          }

          // when the next node is not visible, we've reached the "showMore" buttons
          if (nextNode && !nextNode.isVisible()) {
            nextNode = nextNode.parent.showMore;
          }
          if (nextNode && nextNode instanceof AppendNode) {
            nextNode = lastNode;
          }
          var _nextNode2 = nextNode && (nextNode._nextNode() || nextNode.parent.append);
          if (_nextNode2 && _nextNode2.parent) {
            oldSelection = this.editor.getDomSelection();
            oldParent = firstNode.parent;
            oldNextNode = oldParent.childs[lastNode.getIndex() + 1] || oldParent.append;
            oldIndexRedo = firstNode.getIndex();
            newIndexRedo = _nextNode2.getIndex();
            oldParentPathRedo = oldParent.getInternalPath();
            newParentPathRedo = _nextNode2.parent.getInternalPath();
            selectedNodes.forEach(function (node) {
              _nextNode2.parent.moveBefore(node, _nextNode2);
            });
            this.focus(Node.focusElement || this._getElementName(target));
            this.editor._onAction('moveNodes', {
              count: selectedNodes.length,
              fieldNames: selectedNodes.map(getField),
              oldParentPath: oldParent.getInternalPath(),
              newParentPath: firstNode.parent.getInternalPath(),
              oldParentPathRedo: oldParentPathRedo,
              newParentPathRedo: newParentPathRedo,
              oldIndexRedo: oldIndexRedo,
              newIndexRedo: newIndexRedo,
              oldIndex: oldNextNode.getIndex(),
              newIndex: firstNode.getIndex(),
              oldSelection: oldSelection,
              newSelection: this.editor.getDomSelection()
            });
          }
          handled = true;
        }
      }
      if (handled) {
        event.preventDefault();
        event.stopPropagation();
      }
    }

    /**
     * Handle the expand event, when clicked on the expand button
     * @param {boolean} recurse   If true, child nodes will be expanded too
     * @private
     */
  }, {
    key: "_onExpand",
    value: function _onExpand(recurse) {
      var table;
      var frame;
      var scrollTop;
      if (recurse) {
        // Take the table offline
        table = this.dom.tr.parentNode; // TODO: not nice to access the main table like this
        frame = table.parentNode;
        scrollTop = frame.scrollTop;
        frame.removeChild(table);
      }
      if (this.expanded) {
        this.collapse(recurse);
      } else {
        this.expand(recurse);
      }
      if (recurse) {
        // Put the table online again
        frame.appendChild(table);
        frame.scrollTop = scrollTop;
      }
      if (typeof this.editor.options.onExpand === 'function') {
        this.editor.options.onExpand({
          path: this.getPath(),
          isExpand: this.expanded,
          recursive: recurse
        });
      }
    }

    /**
     * Open a color picker to select a new color
     * @private
     */
  }, {
    key: "_showColorPicker",
    value: function _showColorPicker() {
      if (typeof this.editor.options.onColorPicker === 'function' && this.dom.color) {
        var node = this;

        // force deleting current color picker (if any)
        node._deleteDomColor();
        node.updateDom();
        var colorAnchor = (0,createAbsoluteAnchor/* createAbsoluteAnchor */.p)(this.dom.color, this.editor.getPopupAnchor());
        this.editor.options.onColorPicker(colorAnchor, this.value, function onChange(value) {
          if (typeof value === 'string' && value !== node.value) {
            // force recreating the color block, to cleanup any attached color picker
            node._deleteDomColor();
            node.value = value;
            node.updateDom();
            node._debouncedOnChangeValue();
          }
        });
      }
    }

    /**
     * Get all field names of an object
     * @param {Node} [excludeNode] Optional node to be excluded from the returned field names
     * @return {string[]}
     */
  }, {
    key: "getFieldNames",
    value: function getFieldNames(excludeNode) {
      if (this.type === 'object') {
        return this.childs.filter(function (child) {
          return child !== excludeNode;
        }).map(function (child) {
          return child.field;
        });
      }
      return [];
    }

    /**
     * Handle insert before event
     * @param {String} [field]
     * @param {*} [value]
     * @param {String} [type]   Can be 'auto', 'array', 'object', or 'string'
     * @private
     */
  }, {
    key: "_onInsertBefore",
    value: function _onInsertBefore(field, value, type) {
      var oldSelection = this.editor.getDomSelection();
      var newNode = new Node(this.editor, {
        field: field !== undefined ? field : '',
        value: value !== undefined ? value : '',
        type: type
      });
      newNode.expand(true);
      var beforePath = this.getInternalPath();
      this.parent.insertBefore(newNode, this);
      this.editor.highlighter.unhighlight();
      newNode.focus('field');
      var newSelection = this.editor.getDomSelection();
      this.editor._onAction('insertBeforeNodes', {
        nodes: [newNode],
        paths: [newNode.getInternalPath()],
        beforePath: beforePath,
        parentPath: this.parent.getInternalPath(),
        oldSelection: oldSelection,
        newSelection: newSelection
      });
    }

    /**
     * Handle insert after event
     * @param {String} [field]
     * @param {*} [value]
     * @param {String} [type]   Can be 'auto', 'array', 'object', or 'string'
     * @private
     */
  }, {
    key: "_onInsertAfter",
    value: function _onInsertAfter(field, value, type) {
      var oldSelection = this.editor.getDomSelection();
      var newNode = new Node(this.editor, {
        field: field !== undefined ? field : '',
        value: value !== undefined ? value : '',
        type: type
      });
      newNode.expand(true);
      this.parent.insertAfter(newNode, this);
      this.editor.highlighter.unhighlight();
      newNode.focus('field');
      var newSelection = this.editor.getDomSelection();
      this.editor._onAction('insertAfterNodes', {
        nodes: [newNode],
        paths: [newNode.getInternalPath()],
        afterPath: this.getInternalPath(),
        parentPath: this.parent.getInternalPath(),
        oldSelection: oldSelection,
        newSelection: newSelection
      });
    }

    /**
     * Handle append event
     * @param {String} [field]
     * @param {*} [value]
     * @param {String} [type]   Can be 'auto', 'array', 'object', or 'string'
     * @private
     */
  }, {
    key: "_onAppend",
    value: function _onAppend(field, value, type) {
      var oldSelection = this.editor.getDomSelection();
      var newNode = new Node(this.editor, {
        field: field !== undefined ? field : '',
        value: value !== undefined ? value : '',
        type: type
      });
      newNode.expand(true);
      this.parent.appendChild(newNode);
      this.editor.highlighter.unhighlight();
      newNode.focus('field');
      var newSelection = this.editor.getDomSelection();
      this.editor._onAction('appendNodes', {
        nodes: [newNode],
        paths: [newNode.getInternalPath()],
        parentPath: this.parent.getInternalPath(),
        oldSelection: oldSelection,
        newSelection: newSelection
      });
    }

    /**
     * Change the type of the node's value
     * @param {String} newType
     * @private
     */
  }, {
    key: "_onChangeType",
    value: function _onChangeType(newType) {
      var oldType = this.type;
      if (newType !== oldType) {
        var oldSelection = this.editor.getDomSelection();
        this.changeType(newType);
        var newSelection = this.editor.getDomSelection();
        this.editor._onAction('changeType', {
          path: this.getInternalPath(),
          oldType: oldType,
          newType: newType,
          oldSelection: oldSelection,
          newSelection: newSelection
        });
      }
    }

    /**
     * Sort the child's of the node. Only applicable when the node has type 'object'
     * or 'array'.
     * @param {String[] | string} path  Path of the child value to be compared
     * @param {String} direction        Sorting direction. Available values: "asc", "desc"
     * @param {boolean} [triggerAction=true]  If true (default), a user action will be
     *                                        triggered, creating an entry in history
     *                                        and invoking onChange.
     * @private
     */
  }, {
    key: "sort",
    value: function sort(path, direction) {
      var triggerAction = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      if (typeof path === 'string') {
        path = (0,util.parsePath)(path);
      }
      if (!this._hasChilds()) {
        return;
      }
      this.hideChilds(); // sorting is faster when the childs are not attached to the dom

      // copy the childs array (the old one will be kept for an undo action
      var oldChilds = this.childs;
      this.childs = this.childs.concat();

      // sort the childs array
      var order = direction === 'desc' ? -1 : 1;
      if (this.type === 'object') {
        this.childs.sort(function (a, b) {
          return order * naturalSort_default()(a.field, b.field);
        });
      } else {
        // this.type === 'array'
        this.childs.sort(function (a, b) {
          var nodeA = a.getNestedChild(path);
          var nodeB = b.getNestedChild(path);
          if (!nodeA) {
            return order;
          }
          if (!nodeB) {
            return -order;
          }
          var valueA = nodeA.value;
          var valueB = nodeB.value;
          if (typeof valueA !== 'string' && typeof valueB !== 'string') {
            // both values are a number, boolean, or null -> use simple, fast sorting
            return valueA > valueB ? order : valueA < valueB ? -order : 0;
          }
          return order * naturalSort_default()(valueA, valueB);
        });
      }

      // update the index numbering
      this._updateDomIndexes();
      this.showChilds();
      if (triggerAction === true) {
        this.editor._onAction('sort', {
          path: this.getInternalPath(),
          oldChilds: oldChilds,
          newChilds: this.childs
        });
      }
    }

    /**
     * Replace the value of the node, keep it's state
     * @param {*} newValue
     */
  }, {
    key: "update",
    value: function update(newValue) {
      var oldValue = this.getInternalValue();
      this.setValue(newValue);
      this.editor._onAction('transform', {
        path: this.getInternalPath(),
        oldValue: oldValue,
        newValue: this.getInternalValue()
      });
    }

    /**
     * Remove this node from the DOM
     * @returns {{table: Element, nextTr?: Element}}
     *            Returns the DOM elements that which be used to attach the node
     *            to the DOM again, see _attachToDom.
     * @private
     */
  }, {
    key: "_detachFromDom",
    value: function _detachFromDom() {
      var table = this.dom.tr ? this.dom.tr.parentNode : undefined;
      var lastTr;
      if (this.expanded) {
        lastTr = this.getAppendDom();
      } else {
        lastTr = this.getDom();
      }
      var nextTr = lastTr && lastTr.parentNode ? lastTr.nextSibling : undefined;
      this.hide({
        resetVisibleChilds: false
      });
      return {
        table: table,
        nextTr: nextTr
      };
    }

    /**
     * Attach this node to the DOM again
     * @param {{table: Element, nextTr?: Element}} domAnchor
     *            The DOM elements returned by _detachFromDom.
     * @private
     */
  }, {
    key: "_attachToDom",
    value: function _attachToDom(domAnchor) {
      if (domAnchor.table) {
        if (domAnchor.nextTr) {
          domAnchor.table.insertBefore(this.getDom(), domAnchor.nextTr);
        } else {
          domAnchor.table.appendChild(this.getDom());
        }
      }
      if (this.expanded) {
        this.showChilds();
      }
    }

    /**
     * Transform the node given a JMESPath query.
     * @param {String} query    JMESPath query to apply
     * @private
     */
  }, {
    key: "transform",
    value: function transform(query) {
      if (!this._hasChilds()) {
        return;
      }
      this.hideChilds(); // sorting is faster when the childs are not attached to the dom

      try {
        var oldInternalValue = this.getInternalValue();

        // apply the JMESPath query
        var oldValue = this.getValue();
        var newValue = this.editor.options.executeQuery(oldValue, query);
        this.setValue(newValue);
        var newInternalValue = this.getInternalValue();
        this.editor._onAction('transform', {
          path: this.getInternalPath(),
          oldValue: oldInternalValue,
          newValue: newInternalValue
        });
        this.showChilds();
      } catch (err) {
        this.showChilds();
        this.editor._onError(err);
      }
    }

    /**
     * Make this object the root object of the ditor
     */
  }, {
    key: "extract",
    value: function extract() {
      this.editor.node.hideChilds();
      this.hideChilds();
      try {
        var oldInternalValue = this.editor.node.getInternalValue();
        this.editor._setRoot(this);
        var newInternalValue = this.editor.node.getInternalValue();
        this.editor._onAction('transform', {
          path: this.editor.node.getInternalPath(),
          oldValue: oldInternalValue,
          newValue: newInternalValue
        });
      } catch (err) {
        this.editor._onError(err);
      } finally {
        this.updateDom({
          recurse: true
        });
        this.showChilds();
      }
    }

    /**
     * Get a nested child given a path with properties
     * @param {String[]} path
     * @returns {Node}
     */
  }, {
    key: "getNestedChild",
    value: function getNestedChild(path) {
      var i = 0;
      var child = this;
      while (child && i < path.length) {
        child = child.findChildByProperty(path[i]);
        i++;
      }
      return child;
    }

    /**
     * Find a child by property name
     * @param {string} prop
     * @return {Node | undefined} Returns the child node when found, or undefined otherwise
     */
  }, {
    key: "findChildByProperty",
    value: function findChildByProperty(prop) {
      if (this.type !== 'object') {
        return undefined;
      }
      return this.childs.find(function (child) {
        return child.field === prop;
      });
    }

    /**
     * Create a table row with an append button.
     * @return {HTMLElement | undefined} tr with the AppendNode contents
     */
  }, {
    key: "getAppendDom",
    value: function getAppendDom() {
      if (!this.append) {
        this.append = new AppendNode(this.editor);
        this.append.setParent(this);
      }
      return this.append.getDom();
    }

    /**
     * Create a table row with an showMore button and text
     * @return {HTMLElement | undefined} tr with the AppendNode contents
     */
  }, {
    key: "getShowMoreDom",
    value: function getShowMoreDom() {
      if (!this.showMore) {
        this.showMore = new ShowMoreNode(this.editor, this);
      }
      return this.showMore.getDom();
    }

    /**
     * Get the next sibling of current node
     * @return {Node} nextSibling
     */
  }, {
    key: "nextSibling",
    value: function nextSibling() {
      var index = this.parent.childs.indexOf(this);
      return this.parent.childs[index + 1] || this.parent.append;
    }

    /**
     * Get the previously rendered node
     * @return {Node | null} previousNode
     */
  }, {
    key: "_previousNode",
    value: function _previousNode() {
      var prevNode = null;
      var dom = this.getDom();
      if (dom && dom.parentNode) {
        // find the previous field
        var prevDom = dom;
        do {
          prevDom = prevDom.previousSibling;
          prevNode = Node.getNodeFromTarget(prevDom);
        } while (prevDom && prevNode && prevNode instanceof AppendNode && !prevNode.isVisible());
      }
      return prevNode;
    }

    /**
     * Get the next rendered node
     * @return {Node | null} nextNode
     * @private
     */
  }, {
    key: "_nextNode",
    value: function _nextNode() {
      var nextNode = null;
      var dom = this.getDom();
      if (dom && dom.parentNode) {
        // find the previous field
        var nextDom = dom;
        do {
          nextDom = nextDom.nextSibling;
          nextNode = Node.getNodeFromTarget(nextDom);
        } while (nextDom && nextNode && nextNode instanceof AppendNode && !nextNode.isVisible());
      }
      return nextNode;
    }

    /**
     * Get the first rendered node
     * @return {Node | null} firstNode
     * @private
     */
  }, {
    key: "_firstNode",
    value: function _firstNode() {
      var firstNode = null;
      var dom = this.getDom();
      if (dom && dom.parentNode) {
        var firstDom = dom.parentNode.firstChild;
        firstNode = Node.getNodeFromTarget(firstDom);
      }
      return firstNode;
    }

    /**
     * Get the last rendered node
     * @return {Node | null} lastNode
     * @private
     */
  }, {
    key: "_lastNode",
    value: function _lastNode() {
      var lastNode = null;
      var dom = this.getDom();
      if (dom && dom.parentNode) {
        var lastDom = dom.parentNode.lastChild;
        lastNode = Node.getNodeFromTarget(lastDom);
        while (lastDom && lastNode && !lastNode.isVisible()) {
          lastDom = lastDom.previousSibling;
          lastNode = Node.getNodeFromTarget(lastDom);
        }
      }
      return lastNode;
    }

    /**
     * Get the next element which can have focus.
     * @param {Element} elem
     * @return {Element | null} nextElem
     * @private
     */
  }, {
    key: "_previousElement",
    value: function _previousElement(elem) {
      var dom = this.dom;
      // noinspection FallthroughInSwitchStatementJS
      switch (elem) {
        case dom.value:
          if (this.fieldEditable) {
            return dom.field;
          }
        // intentional fall through
        case dom.field:
          if (this._hasChilds()) {
            return dom.expand;
          }
        // intentional fall through
        case dom.expand:
          return dom.menu;
        case dom.menu:
          if (dom.drag) {
            return dom.drag;
          }
        // intentional fall through
        default:
          return null;
      }
    }

    /**
     * Get the next element which can have focus.
     * @param {Element} elem
     * @return {Element | null} nextElem
     * @private
     */
  }, {
    key: "_nextElement",
    value: function _nextElement(elem) {
      var dom = this.dom;
      // noinspection FallthroughInSwitchStatementJS
      switch (elem) {
        case dom.drag:
          return dom.menu;
        case dom.menu:
          if (this._hasChilds()) {
            return dom.expand;
          }
        // intentional fall through
        case dom.expand:
          if (this.fieldEditable) {
            return dom.field;
          }
        // intentional fall through
        case dom.field:
          if (!this._hasChilds()) {
            return dom.value;
          }
        // intentional fall through
        default:
          return null;
      }
    }

    /**
     * Get the dom name of given element. returns null if not found.
     * For example when element === dom.field, "field" is returned.
     * @param {Element} element
     * @return {String | null} elementName  Available elements with name: 'drag',
     *                                      'menu', 'expand', 'field', 'value'
     * @private
     */
  }, {
    key: "_getElementName",
    value: function _getElementName(element) {
      var _this2 = this;
      return Object.keys(this.dom).find(function (name) {
        return _this2.dom[name] === element;
      });
    }

    /**
     * Test if this node has childs. This is the case when the node is an object
     * or array.
     * @return {boolean} hasChilds
     * @private
     */
  }, {
    key: "_hasChilds",
    value: function _hasChilds() {
      return this.type === 'array' || this.type === 'object';
    }
  }, {
    key: "addTemplates",
    value: function addTemplates(menu, append) {
      var node = this;
      var templates = node.editor.options.templates;
      if (templates == null) return;
      if (templates.length) {
        // create a separator
        menu.push({
          type: 'separator'
        });
      }
      var appendData = function appendData(name, data) {
        node._onAppend(name, data);
      };
      var insertData = function insertData(name, data) {
        node._onInsertBefore(name, data);
      };
      templates.forEach(function (template) {
        menu.push({
          text: template.text,
          className: template.className || 'jsoneditor-type-object',
          title: template.title,
          click: append ? appendData.bind(this, template.field, template.value) : insertData.bind(this, template.field, template.value)
        });
      });
    }

    /**
     * Show a contextmenu for this node
     * @param {HTMLElement} anchor   Anchor element to attach the context menu to
     *                               as sibling.
     * @param {function} [onClose]   Callback method called when the context menu
     *                               is being closed.
     */
  }, {
    key: "showContextMenu",
    value: function showContextMenu(anchor, onClose) {
      var node = this;
      var items = [];
      if (this.editable.value) {
        items.push({
          text: (0,i18n/* translate */.Tl)('type'),
          title: (0,i18n/* translate */.Tl)('typeTitle'),
          className: 'jsoneditor-type-' + this.type,
          submenu: [{
            text: (0,i18n/* translate */.Tl)('auto'),
            className: 'jsoneditor-type-auto' + (this.type === 'auto' ? ' jsoneditor-selected' : ''),
            title: (0,i18n/* translate */.Tl)('autoType'),
            click: function click() {
              node._onChangeType('auto');
            }
          }, {
            text: (0,i18n/* translate */.Tl)('array'),
            className: 'jsoneditor-type-array' + (this.type === 'array' ? ' jsoneditor-selected' : ''),
            title: (0,i18n/* translate */.Tl)('arrayType'),
            click: function click() {
              node._onChangeType('array');
            }
          }, {
            text: (0,i18n/* translate */.Tl)('object'),
            className: 'jsoneditor-type-object' + (this.type === 'object' ? ' jsoneditor-selected' : ''),
            title: (0,i18n/* translate */.Tl)('objectType'),
            click: function click() {
              node._onChangeType('object');
            }
          }, {
            text: (0,i18n/* translate */.Tl)('string'),
            className: 'jsoneditor-type-string' + (this.type === 'string' ? ' jsoneditor-selected' : ''),
            title: (0,i18n/* translate */.Tl)('stringType'),
            click: function click() {
              node._onChangeType('string');
            }
          }]
        });
      }
      if (this._hasChilds()) {
        if (this.editor.options.enableSort) {
          items.push({
            text: (0,i18n/* translate */.Tl)('sort'),
            title: (0,i18n/* translate */.Tl)('sortTitle', {
              type: this.type
            }),
            className: 'jsoneditor-sort-asc',
            click: function click() {
              node.showSortModal();
            }
          });
        }
        if (this.editor.options.enableTransform) {
          items.push({
            text: (0,i18n/* translate */.Tl)('transform'),
            title: (0,i18n/* translate */.Tl)('transformTitle', {
              type: this.type
            }),
            className: 'jsoneditor-transform',
            click: function click() {
              node.showTransformModal();
            }
          });
        }
        if (this.parent) {
          items.push({
            text: (0,i18n/* translate */.Tl)('extract'),
            title: (0,i18n/* translate */.Tl)('extractTitle', {
              type: this.type
            }),
            className: 'jsoneditor-extract',
            click: function click() {
              node.extract();
            }
          });
        }
      }
      if (this.parent && this.parent._hasChilds()) {
        if (items.length) {
          // create a separator
          items.push({
            type: 'separator'
          });
        }

        // create append button (for last child node only)
        var childs = node.parent.childs;
        if (node === childs[childs.length - 1]) {
          var appendSubmenu = [{
            text: (0,i18n/* translate */.Tl)('auto'),
            className: 'jsoneditor-type-auto',
            title: (0,i18n/* translate */.Tl)('autoType'),
            click: function click() {
              node._onAppend('', '', 'auto');
            }
          }, {
            text: (0,i18n/* translate */.Tl)('array'),
            className: 'jsoneditor-type-array',
            title: (0,i18n/* translate */.Tl)('arrayType'),
            click: function click() {
              node._onAppend('', []);
            }
          }, {
            text: (0,i18n/* translate */.Tl)('object'),
            className: 'jsoneditor-type-object',
            title: (0,i18n/* translate */.Tl)('objectType'),
            click: function click() {
              node._onAppend('', {});
            }
          }, {
            text: (0,i18n/* translate */.Tl)('string'),
            className: 'jsoneditor-type-string',
            title: (0,i18n/* translate */.Tl)('stringType'),
            click: function click() {
              node._onAppend('', '', 'string');
            }
          }];
          node.addTemplates(appendSubmenu, true);
          items.push({
            text: (0,i18n/* translate */.Tl)('appendText'),
            title: (0,i18n/* translate */.Tl)('appendTitle'),
            submenuTitle: (0,i18n/* translate */.Tl)('appendSubmenuTitle'),
            className: 'jsoneditor-append',
            click: function click() {
              node._onAppend('', '', 'auto');
            },
            submenu: appendSubmenu
          });
        }

        // create insert button
        var insertSubmenu = [{
          text: (0,i18n/* translate */.Tl)('auto'),
          className: 'jsoneditor-type-auto',
          title: (0,i18n/* translate */.Tl)('autoType'),
          click: function click() {
            node._onInsertBefore('', '', 'auto');
          }
        }, {
          text: (0,i18n/* translate */.Tl)('array'),
          className: 'jsoneditor-type-array',
          title: (0,i18n/* translate */.Tl)('arrayType'),
          click: function click() {
            node._onInsertBefore('', []);
          }
        }, {
          text: (0,i18n/* translate */.Tl)('object'),
          className: 'jsoneditor-type-object',
          title: (0,i18n/* translate */.Tl)('objectType'),
          click: function click() {
            node._onInsertBefore('', {});
          }
        }, {
          text: (0,i18n/* translate */.Tl)('string'),
          className: 'jsoneditor-type-string',
          title: (0,i18n/* translate */.Tl)('stringType'),
          click: function click() {
            node._onInsertBefore('', '', 'string');
          }
        }];
        node.addTemplates(insertSubmenu, false);
        items.push({
          text: (0,i18n/* translate */.Tl)('insert'),
          title: (0,i18n/* translate */.Tl)('insertTitle'),
          submenuTitle: (0,i18n/* translate */.Tl)('insertSub'),
          className: 'jsoneditor-insert',
          click: function click() {
            node._onInsertBefore('', '', 'auto');
          },
          submenu: insertSubmenu
        });
        if (this.editable.field) {
          // create duplicate button
          items.push({
            text: (0,i18n/* translate */.Tl)('duplicateText'),
            title: (0,i18n/* translate */.Tl)('duplicateField'),
            className: 'jsoneditor-duplicate',
            click: function click() {
              Node.onDuplicate(node);
            }
          });

          // create remove button
          items.push({
            text: (0,i18n/* translate */.Tl)('removeText'),
            title: (0,i18n/* translate */.Tl)('removeField'),
            className: 'jsoneditor-remove',
            click: function click() {
              Node.onRemove(node);
            }
          });
        }
      }
      if (this.editor.options.onCreateMenu) {
        var path = node.getPath();
        items = this.editor.options.onCreateMenu(items, {
          type: 'single',
          path: path,
          paths: [path]
        });
      }
      var menu = new ContextMenu/* ContextMenu */.t(items, {
        close: onClose
      });
      menu.show(anchor, this.editor.getPopupAnchor());
    }

    /**
     * Show sorting modal
     */
  }, {
    key: "showSortModal",
    value: function showSortModal() {
      var node = this;
      var container = this.editor.options.modalAnchor || constants/* DEFAULT_MODAL_ANCHOR */.ai;
      var json = this.getValue();
      function onSort(sortedBy) {
        var path = sortedBy.path;
        var pathArray = (0,util.parsePath)(path);
        node.sortedBy = sortedBy;
        node.sort(pathArray, sortedBy.direction);
      }
      (0,js_showSortModal.showSortModal)(container, json, onSort, node.sortedBy);
    }

    /**
     * Show transform modal
     */
  }, {
    key: "showTransformModal",
    value: function showTransformModal() {
      var _this3 = this;
      var _this$editor$options = this.editor.options,
        modalAnchor = _this$editor$options.modalAnchor,
        createQuery = _this$editor$options.createQuery,
        executeQuery = _this$editor$options.executeQuery,
        queryDescription = _this$editor$options.queryDescription;
      var json = this.getValue();
      (0,js_showTransformModal.showTransformModal)({
        container: modalAnchor || constants/* DEFAULT_MODAL_ANCHOR */.ai,
        json: json,
        queryDescription: queryDescription,
        // can be undefined
        createQuery: createQuery,
        executeQuery: executeQuery,
        onTransform: function onTransform(query) {
          _this3.transform(query);
        }
      });
    }

    /**
     * get the type of a value
     * @param {*} value
     * @return {String} type   Can be 'object', 'array', 'string', 'auto'
     * @private
     */
  }, {
    key: "_getType",
    value: function _getType(value) {
      if (value instanceof Array) {
        return 'array';
      }
      if (value instanceof Object) {
        return 'object';
      }
      if (typeof value === 'string' && typeof (0,util.parseString)(value) !== 'string') {
        return 'string';
      }
      return 'auto';
    }

    /**
     * escape a text, such that it can be displayed safely in an HTML element
     * @param {String} text
     * @return {String} escapedText
     * @private
     */
  }, {
    key: "_escapeHTML",
    value: function _escapeHTML(text) {
      if (typeof text !== 'string') {
        return String(text);
      } else {
        var htmlEscaped = String(text).replace(/&/g, '&amp;') // must be replaced first!
        .replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/ {2}/g, ' &nbsp;') // replace double space with an nbsp and space
        .replace(/^ /, '&nbsp;') // space at start
        .replace(/ $/, '&nbsp;'); // space at end

        var json = JSON.stringify(htmlEscaped);
        var html = json.substring(1, json.length - 1);
        if (this.editor.options.escapeUnicode === true) {
          html = (0,util.escapeUnicodeChars)(html);
        }
        return html;
      }
    }

    /**
     * unescape a string.
     * @param {String} escapedText
     * @return {String} text
     * @private
     */
  }, {
    key: "_unescapeHTML",
    value: function _unescapeHTML(escapedText) {
      var json = '"' + this._escapeJSON(escapedText) + '"';
      var htmlEscaped = (0,util.parse)(json);
      return htmlEscaped.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&nbsp;|\u00A0/g, ' ').replace(/&amp;/g, '&'); // must be replaced last
    }

    /**
     * escape a text to make it a valid JSON string. The method will:
     *   - replace unescaped double quotes with '\"'
     *   - replace unescaped backslash with '\\'
     *   - replace returns with '\n'
     * @param {String} text
     * @return {String} escapedText
     * @private
     */
  }, {
    key: "_escapeJSON",
    value: function _escapeJSON(text) {
      // TODO: replace with some smart regex (only when a new solution is faster!)
      var escaped = '';
      var i = 0;
      while (i < text.length) {
        var c = text.charAt(i);
        if (c === '\n') {
          escaped += '\\n';
        } else if (c === '\\') {
          escaped += c;
          i++;
          c = text.charAt(i);
          if (c === '' || '"\\/bfnrtu'.indexOf(c) === -1) {
            escaped += '\\'; // no valid escape character
          }
          escaped += c;
        } else if (c === '"') {
          escaped += '\\"';
        } else {
          escaped += c;
        }
        i++;
      }
      return escaped;
    }

    /**
     * update the object name according to the callback onNodeName
     * @private
     */
  }, {
    key: "updateNodeName",
    value: function updateNodeName() {
      var count = this.childs ? this.childs.length : 0;
      var nodeName;
      if (this.type === 'object' || this.type === 'array') {
        if (this.editor.options.onNodeName) {
          try {
            var getValue = this.getValue.bind(this);
            nodeName = this.editor.options.onNodeName({
              path: this.getPath(),
              size: count,
              type: this.type,
              get value() {
                return getValue();
              }
            });
          } catch (err) {
            console.error('Error in onNodeName callback: ', err);
          }
        }
        this.dom.value.textContent = this.type === 'object' ? '{' + (nodeName || count) + '}' : '[' + (nodeName || count) + ']';
      }
    }

    /**
     * update recursively the object's and its children's name.
     * @private
     */
  }, {
    key: "recursivelyUpdateNodeName",
    value: function recursivelyUpdateNodeName() {
      if (this.expanded) {
        this.updateNodeName();
        if (this.childs !== 'undefined') {
          var i;
          for (i in this.childs) {
            this.childs[i].recursivelyUpdateNodeName();
          }
        }
      }
    }
  }]);
}();

// debounce interval for keyboard input in milliseconds
Node.prototype.DEBOUNCE_INTERVAL = 150;

// search will stop iterating as soon as the max is reached
Node.prototype.MAX_SEARCH_RESULTS = 999;

// default number of child nodes to display
var DEFAULT_MAX_VISIBLE_CHILDS = 100;

// stores the element name currently having the focus
Node.focusElement = undefined;

/**
 * Select all text in an editable div after a delay of 0 ms
 * @param {Element} editableDiv
 */
Node.select = function (editableDiv) {
  setTimeout(function () {
    (0,util.selectContentEditable)(editableDiv);
  }, 0);
};

/**
 * DragStart event, fired on mousedown on the dragarea at the left side of a Node
 * @param {Node[] | Node} nodes
 * @param {Event} event
 */
Node.onDragStart = function (nodes, event) {
  if (!Array.isArray(nodes)) {
    return Node.onDragStart([nodes], event);
  }
  if (nodes.length === 0) {
    return;
  }
  var firstNode = nodes[0];
  var lastNode = nodes[nodes.length - 1];
  var parent = firstNode.parent;
  var draggedNode = Node.getNodeFromTarget(event.target);
  var editor = firstNode.editor;

  // in case of multiple selected nodes, offsetY prevents the selection from
  // jumping when you start dragging one of the lower down nodes in the selection
  var offsetY = (0,util.getAbsoluteTop)(draggedNode.dom.tr) - (0,util.getAbsoluteTop)(firstNode.dom.tr);
  if (!editor.mousemove) {
    editor.mousemove = (0,util.addEventListener)(event.view, 'mousemove', function (event) {
      Node.onDrag(nodes, event);
    });
  }
  if (!editor.mouseup) {
    editor.mouseup = (0,util.addEventListener)(event.view, 'mouseup', function (event) {
      Node.onDragEnd(nodes, event);
    });
  }
  editor.highlighter.lock();
  editor.drag = {
    oldCursor: document.body.style.cursor,
    oldSelection: editor.getDomSelection(),
    oldPaths: nodes.map(getInternalPath),
    oldParent: parent,
    oldNextNode: parent.childs[lastNode.getIndex() + 1] || parent.append,
    oldParentPathRedo: parent.getInternalPath(),
    oldIndexRedo: firstNode.getIndex(),
    mouseX: event.pageX,
    offsetY: offsetY,
    level: firstNode.getLevel()
  };
  document.body.style.cursor = 'move';
  event.preventDefault();
};

/**
 * Drag event, fired when moving the mouse while dragging a Node
 * @param {Node[] | Node} nodes
 * @param {Event} event
 */
Node.onDrag = function (nodes, event) {
  if (!Array.isArray(nodes)) {
    return Node.onDrag([nodes], event);
  }
  if (nodes.length === 0) {
    return;
  }

  // TODO: this method has grown too large. Split it in a number of methods
  var editor = nodes[0].editor;
  var mouseY = event.pageY - editor.drag.offsetY;
  var mouseX = event.pageX;
  var trPrev, trNext, trFirst, trLast, trRoot;
  var nodePrev, nodeNext;
  var topPrev, topFirst, bottomNext, heightNext;
  var moved = false;

  // TODO: add an ESC option, which resets to the original position

  // move up/down
  var firstNode = nodes[0];
  var trThis = firstNode.dom.tr;
  var topThis = (0,util.getAbsoluteTop)(trThis);
  var heightThis = trThis.offsetHeight;
  if (mouseY < topThis) {
    // move up
    trPrev = trThis;
    do {
      trPrev = trPrev.previousSibling;
      nodePrev = Node.getNodeFromTarget(trPrev);
      topPrev = trPrev ? (0,util.getAbsoluteTop)(trPrev) : 0;
    } while (trPrev && mouseY < topPrev);
    if (nodePrev && !nodePrev.parent) {
      nodePrev = undefined;
    }
    if (!nodePrev) {
      // move to the first node
      trRoot = trThis.parentNode.firstChild;
      trPrev = trRoot ? trRoot.nextSibling : undefined;
      nodePrev = Node.getNodeFromTarget(trPrev);
      if (nodePrev === firstNode) {
        nodePrev = undefined;
      }
    }
    if (nodePrev && nodePrev.isVisible()) {
      // check if mouseY is really inside the found node
      trPrev = nodePrev.dom.tr;
      topPrev = trPrev ? (0,util.getAbsoluteTop)(trPrev) : 0;
      if (mouseY > topPrev + heightThis) {
        nodePrev = undefined;
      }
    }
    if (nodePrev && (editor.options.limitDragging === false || nodePrev.parent === nodes[0].parent)) {
      nodes.forEach(function (node) {
        nodePrev.parent.moveBefore(node, nodePrev);
      });
      moved = true;
    }
  } else {
    // move down
    var lastNode = nodes[nodes.length - 1];
    trLast = lastNode.expanded && lastNode.append ? lastNode.append.getDom() : lastNode.dom.tr;
    trFirst = trLast ? trLast.nextSibling : undefined;
    if (trFirst) {
      topFirst = (0,util.getAbsoluteTop)(trFirst);
      trNext = trFirst;
      do {
        nodeNext = Node.getNodeFromTarget(trNext);
        if (trNext) {
          bottomNext = trNext.nextSibling ? (0,util.getAbsoluteTop)(trNext.nextSibling) : 0;
          heightNext = trNext ? bottomNext - topFirst : 0;
          if (nodeNext && nodeNext.parent.childs.length === nodes.length && nodeNext.parent.childs[nodes.length - 1] === lastNode) {
            // We are about to remove the last child of this parent,
            // which will make the parents appendNode visible.
            topThis += 27;
            // TODO: dangerous to suppose the height of the appendNode a constant of 27 px.
          }
          trNext = trNext.nextSibling;
        }
      } while (trNext && mouseY > topThis + heightNext);
      if (nodeNext && nodeNext.parent) {
        // calculate the desired level
        var diffX = mouseX - editor.drag.mouseX;
        var diffLevel = Math.round(diffX / 24 / 2);
        var level = editor.drag.level + diffLevel; // desired level
        var levelNext = nodeNext.getLevel(); // level to be

        // find the best fitting level (move upwards over the append nodes)
        trPrev = nodeNext.dom.tr && nodeNext.dom.tr.previousSibling;
        while (levelNext < level && trPrev) {
          nodePrev = Node.getNodeFromTarget(trPrev);
          var isDraggedNode = nodes.some(function (node) {
            return node === nodePrev || nodePrev.isDescendantOf(node);
          });
          if (isDraggedNode) {
            // neglect the dragged nodes themselves and their childs
          } else if (nodePrev instanceof AppendNode) {
            var childs = nodePrev.parent.childs;
            if (childs.length !== nodes.length || childs[nodes.length - 1] !== lastNode) {
              // non-visible append node of a list of childs
              // consisting of not only this node (else the
              // append node will change into a visible "empty"
              // text when removing this node).
              nodeNext = Node.getNodeFromTarget(trPrev);
              levelNext = nodeNext.getLevel();
            } else {
              break;
            }
          } else {
            break;
          }
          trPrev = trPrev.previousSibling;
        }
        if (nodeNext instanceof AppendNode && !nodeNext.isVisible() && nodeNext.parent.showMore.isVisible()) {
          nodeNext = nodeNext._nextNode();
        }

        // move the node when its position is changed
        if (nodeNext && (editor.options.limitDragging === false || nodeNext.parent === nodes[0].parent) && nodeNext.dom.tr && nodeNext.dom.tr !== trLast.nextSibling) {
          nodes.forEach(function (node) {
            nodeNext.parent.moveBefore(node, nodeNext);
          });
          moved = true;
        }
      }
    }
  }
  if (moved) {
    // update the dragging parameters when moved
    editor.drag.mouseX = mouseX;
    editor.drag.level = firstNode.getLevel();
  }

  // auto scroll when hovering around the top of the editor
  editor.startAutoScroll(mouseY);
  event.preventDefault();
};

/**
 * Drag event, fired on mouseup after having dragged a node
 * @param {Node[] | Node} nodes
 * @param {Event} event
 */
Node.onDragEnd = function (nodes, event) {
  if (!Array.isArray(nodes)) {
    return Node.onDrag([nodes], event);
  }
  if (nodes.length === 0) {
    return;
  }
  var firstNode = nodes[0];
  var editor = firstNode.editor;

  // set focus to the context menu button of the first node
  if (firstNode && firstNode.dom.menu) {
    firstNode.dom.menu.focus();
  }
  var oldParentPath = editor.drag.oldParent.getInternalPath();
  var newParentPath = firstNode.parent.getInternalPath();
  var sameParent = editor.drag.oldParent === firstNode.parent;
  var oldIndex = editor.drag.oldNextNode.getIndex();
  var newIndex = firstNode.getIndex();
  var oldParentPathRedo = editor.drag.oldParentPathRedo;
  var oldIndexRedo = editor.drag.oldIndexRedo;
  var newIndexRedo = sameParent && oldIndexRedo < newIndex ? newIndex + nodes.length : newIndex;
  if (!sameParent || oldIndexRedo !== newIndex) {
    // only register this action if the node is actually moved to another place
    editor._onAction('moveNodes', {
      count: nodes.length,
      fieldNames: nodes.map(getField),
      oldParentPath: oldParentPath,
      newParentPath: newParentPath,
      oldIndex: oldIndex,
      newIndex: newIndex,
      oldIndexRedo: oldIndexRedo,
      newIndexRedo: newIndexRedo,
      oldParentPathRedo: oldParentPathRedo,
      newParentPathRedo: null,
      // This is a hack, value will be filled in during undo

      oldSelection: editor.drag.oldSelection,
      newSelection: editor.getDomSelection()
    });
  }
  document.body.style.cursor = editor.drag.oldCursor;
  editor.highlighter.unlock();
  nodes.forEach(function (node) {
    node.updateDom();
    if (event.target !== node.dom.drag && event.target !== node.dom.menu) {
      editor.highlighter.unhighlight();
    }
  });
  delete editor.drag;
  if (editor.mousemove) {
    (0,util.removeEventListener)(event.view, 'mousemove', editor.mousemove);
    delete editor.mousemove;
  }
  if (editor.mouseup) {
    (0,util.removeEventListener)(event.view, 'mouseup', editor.mouseup);
    delete editor.mouseup;
  }

  // Stop any running auto scroll
  editor.stopAutoScroll();
  event.preventDefault();
};

/**
 * find an enum definition in a JSON schema, as property `enum` or inside
 * one of the schemas composites (`oneOf`, `anyOf`, `allOf`)
 * @param  {Object} schema
 * @return {Array | null} Returns the enum when found, null otherwise.
 * @private
 */
Node._findEnum = function (schema) {
  if (schema["enum"]) {
    return schema["enum"];
  }
  var composite = schema.oneOf || schema.anyOf || schema.allOf;
  if (composite) {
    var match = composite.filter(function (entry) {
      return entry["enum"];
    });
    if (match.length > 0) {
      return match[0]["enum"];
    }
  }
  return null;
};

/**
 * Return the part of a JSON schema matching given path.
 * @param {Object} topLevelSchema
 * @param {Object} schemaRefs
 * @param {Array.<string | number>} path
 * @param {Object} currentSchema
 * @return {Object | null}
 * @private
 */
Node._findSchema = function (topLevelSchema, schemaRefs, path) {
  var currentSchema = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : topLevelSchema;
  var nextPath = path.slice(1, path.length);
  var nextKey = path[0];
  var possibleSchemas = [currentSchema];
  for (var _i = 0, _arr = [currentSchema.oneOf, currentSchema.anyOf, currentSchema.allOf]; _i < _arr.length; _i++) {
    var subSchemas = _arr[_i];
    if (Array.isArray(subSchemas)) {
      possibleSchemas = possibleSchemas.concat(subSchemas);
    }
  }
  var _iterator = _createForOfIteratorHelper(possibleSchemas),
    _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var schema = _step.value;
      currentSchema = schema;
      if ('$ref' in currentSchema && typeof currentSchema.$ref === 'string') {
        var _ref$match;
        var ref = currentSchema.$ref;
        if (ref in schemaRefs) {
          currentSchema = schemaRefs[ref];
        } else if (ref.startsWith('#/')) {
          var refPath = ref.substring(2).split('/');
          currentSchema = topLevelSchema;
          var _iterator2 = _createForOfIteratorHelper(refPath),
            _step2;
          try {
            for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
              var segment = _step2.value;
              if (segment in currentSchema) {
                currentSchema = currentSchema[segment];
              } else {
                throw Error("Unable to resolve reference ".concat(ref));
              }
            }
          } catch (err) {
            _iterator2.e(err);
          } finally {
            _iterator2.f();
          }
        } else if (((_ref$match = ref.match(/#\//g)) === null || _ref$match === void 0 ? void 0 : _ref$match.length) === 1) {
          var _ref$split = ref.split('#/'),
            _ref$split2 = _slicedToArray(_ref$split, 2),
            schemaUrl = _ref$split2[0],
            relativePath = _ref$split2[1];
          if (schemaUrl in schemaRefs) {
            var referencedSchema = schemaRefs[schemaUrl];
            var reference = {
              $ref: '#/'.concat(relativePath)
            };
            var auxNextPath = [];
            auxNextPath.push(nextKey);
            if (nextPath.length > 0) {
              auxNextPath.push.apply(auxNextPath, _toConsumableArray(nextPath));
            }
            return Node._findSchema(referencedSchema, schemaRefs, auxNextPath, reference);
          } else {
            throw Error("Unable to resolve reference ".concat(ref));
          }
        } else {
          throw Error("Unable to resolve reference ".concat(ref));
        }
      }

      // We have no more path segments to resolve, return the currently found schema
      // We do this here, after resolving references, in case of the leaf schema beeing a reference
      if (nextKey === undefined) {
        return currentSchema;
      }
      if (typeof nextKey === 'string') {
        if (Node_typeof(currentSchema.properties) === 'object' && currentSchema.properties !== null && nextKey in currentSchema.properties) {
          currentSchema = currentSchema.properties[nextKey];
          return Node._findSchema(topLevelSchema, schemaRefs, nextPath, currentSchema);
        }
        if (Node_typeof(currentSchema.patternProperties) === 'object' && currentSchema.patternProperties !== null) {
          for (var prop in currentSchema.patternProperties) {
            if (nextKey.match(prop)) {
              currentSchema = currentSchema.patternProperties[prop];
              return Node._findSchema(topLevelSchema, schemaRefs, nextPath, currentSchema);
            }
          }
        }
        if (Node_typeof(currentSchema.additionalProperties) === 'object') {
          currentSchema = currentSchema.additionalProperties;
          return Node._findSchema(topLevelSchema, schemaRefs, nextPath, currentSchema);
        }
        continue;
      }
      if (typeof nextKey === 'number' && Node_typeof(currentSchema.items) === 'object' && currentSchema.items !== null) {
        currentSchema = currentSchema.items;
        return Node._findSchema(topLevelSchema, schemaRefs, nextPath, currentSchema);
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  return null;
};

/**
 * Remove nodes
 * @param {Node[] | Node} nodes
 */
Node.onRemove = function (nodes) {
  if (!Array.isArray(nodes)) {
    return Node.onRemove([nodes]);
  }
  if (nodes && nodes.length > 0) {
    var firstNode = nodes[0];
    var parent = firstNode.parent;
    var editor = firstNode.editor;
    var firstIndex = firstNode.getIndex();
    editor.highlighter.unhighlight();

    // adjust the focus
    var oldSelection = editor.getDomSelection();
    Node.blurNodes(nodes);
    var newSelection = editor.getDomSelection();

    // store the paths before removing them (needed for history)
    var paths = nodes.map(getInternalPath);

    // remove the nodes
    nodes.forEach(function (node) {
      node.parent._remove(node);
    });

    // store history action
    editor._onAction('removeNodes', {
      nodes: nodes,
      paths: paths,
      parentPath: parent.getInternalPath(),
      index: firstIndex,
      oldSelection: oldSelection,
      newSelection: newSelection
    });
  }
};

/**
 * Duplicate nodes
 * duplicated nodes will be added right after the original nodes
 * @param {Node[] | Node} nodes
 */
Node.onDuplicate = function (nodes) {
  if (!Array.isArray(nodes)) {
    return Node.onDuplicate([nodes]);
  }
  if (nodes && nodes.length > 0) {
    var lastNode = nodes[nodes.length - 1];
    var parent = lastNode.parent;
    var editor = lastNode.editor;
    editor.deselect(editor.multiselection.nodes);

    // duplicate the nodes
    var oldSelection = editor.getDomSelection();
    var afterNode = lastNode;
    var clones = nodes.map(function (node) {
      var clone = node.clone();
      if (node.parent.type === 'object') {
        var existingFieldNames = node.parent.getFieldNames();
        clone.field = (0,util.findUniqueName)(node.field, existingFieldNames);
      }
      parent.insertAfter(clone, afterNode);
      afterNode = clone;
      return clone;
    });

    // set selection to the duplicated nodes
    if (nodes.length === 1) {
      if (clones[0].parent.type === 'object') {
        // when duplicating a single object property,
        // set focus to the field and keep the original field name
        clones[0].dom.field.innerHTML = nodes[0]._escapeHTML(nodes[0].field);
        clones[0].focus('field');
      } else {
        clones[0].focus();
      }
    } else {
      editor.select(clones);
    }
    var newSelection = editor.getDomSelection();
    editor._onAction('duplicateNodes', {
      paths: nodes.map(getInternalPath),
      clonePaths: clones.map(getInternalPath),
      afterPath: lastNode.getInternalPath(),
      parentPath: parent.getInternalPath(),
      oldSelection: oldSelection,
      newSelection: newSelection
    });
  }
};

/**
 * Find the node from an event target
 * @param {HTMLElement} target
 * @return {Node | undefined} node  or undefined when not found
 * @static
 */
Node.getNodeFromTarget = function (target) {
  while (target) {
    if (target.node) {
      return target.node;
    }
    target = target.parentNode;
  }
  return undefined;
};

/**
 * Test whether target is a child of the color DOM of a node
 * @param {HTMLElement} target
 * @returns {boolean}
 */
Node.targetIsColorPicker = function (target) {
  var node = Node.getNodeFromTarget(target);
  if (node) {
    var parent = target && target.parentNode;
    while (parent) {
      if (parent === node.dom.color) {
        return true;
      }
      parent = parent.parentNode;
    }
  }
  return false;
};

/**
 * Remove the focus of given nodes, and move the focus to the (a) node before,
 * (b) the node after, or (c) the parent node.
 * @param {Array.<Node> | Node} nodes
 */
Node.blurNodes = function (nodes) {
  if (!Array.isArray(nodes)) {
    Node.blurNodes([nodes]);
    return;
  }
  var firstNode = nodes[0];
  var parent = firstNode.parent;
  var firstIndex = firstNode.getIndex();
  if (parent.childs[firstIndex + nodes.length]) {
    parent.childs[firstIndex + nodes.length].focus();
  } else if (parent.childs[firstIndex - 1]) {
    parent.childs[firstIndex - 1].focus();
  } else {
    parent.focus();
  }
};

// helper function to get the internal path of a node
function getInternalPath(node) {
  return node.getInternalPath();
}

// helper function to get the field of a node
function getField(node) {
  return node.getField();
}
function Node_hasOwnProperty(object, key) {
  return Object.prototype.hasOwnProperty.call(object, key);
}

// TODO: find a nicer solution to resolve this circular dependency between Node and AppendNode
//       idea: introduce properties .isAppendNode and .isNode and use that instead of instanceof AppendNode checks
var AppendNode = appendNodeFactory(Node);
var ShowMoreNode = showMoreNodeFactory(Node);
;// ./src/js/NodeHistory.js


function NodeHistory_typeof(o) { "@babel/helpers - typeof"; return NodeHistory_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, NodeHistory_typeof(o); }
function NodeHistory_classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function NodeHistory_defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, NodeHistory_toPropertyKey(o.key), o); } }
function NodeHistory_createClass(e, r, t) { return r && NodeHistory_defineProperties(e.prototype, r), t && NodeHistory_defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function NodeHistory_toPropertyKey(t) { var i = NodeHistory_toPrimitive(t, "string"); return "symbol" == NodeHistory_typeof(i) ? i : i + ""; }
function NodeHistory_toPrimitive(t, r) { if ("object" != NodeHistory_typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != NodeHistory_typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }


/**
 * @constructor History
 * Store action history, enables undo and redo
 * @param {JSONEditor} editor
 */
var NodeHistory = /*#__PURE__*/function () {
  function NodeHistory(editor) {
    NodeHistory_classCallCheck(this, NodeHistory);
    this.editor = editor;
    this.history = [];
    this.index = -1;
    this.clear();

    // helper function to find a Node from a path
    function findNode(path) {
      return editor.node.findNodeByInternalPath(path);
    }

    // map with all supported actions
    this.actions = {
      editField: {
        undo: function undo(params) {
          var parentNode = findNode(params.parentPath);
          var node = parentNode.childs[params.index];
          node.updateField(params.oldValue);
        },
        redo: function redo(params) {
          var parentNode = findNode(params.parentPath);
          var node = parentNode.childs[params.index];
          node.updateField(params.newValue);
        }
      },
      editValue: {
        undo: function undo(params) {
          findNode(params.path).updateValue(params.oldValue);
        },
        redo: function redo(params) {
          findNode(params.path).updateValue(params.newValue);
        }
      },
      changeType: {
        undo: function undo(params) {
          findNode(params.path).changeType(params.oldType);
        },
        redo: function redo(params) {
          findNode(params.path).changeType(params.newType);
        }
      },
      appendNodes: {
        undo: function undo(params) {
          var parentNode = findNode(params.parentPath);
          params.paths.map(findNode).forEach(function (node) {
            parentNode.removeChild(node);
          });
        },
        redo: function redo(params) {
          var parentNode = findNode(params.parentPath);
          params.nodes.forEach(function (node) {
            parentNode.appendChild(node);
          });
        }
      },
      insertBeforeNodes: {
        undo: function undo(params) {
          var parentNode = findNode(params.parentPath);
          params.paths.map(findNode).forEach(function (node) {
            parentNode.removeChild(node);
          });
        },
        redo: function redo(params) {
          var parentNode = findNode(params.parentPath);
          var beforeNode = findNode(params.beforePath);
          params.nodes.forEach(function (node) {
            parentNode.insertBefore(node, beforeNode);
          });
        }
      },
      insertAfterNodes: {
        undo: function undo(params) {
          var parentNode = findNode(params.parentPath);
          params.paths.map(findNode).forEach(function (node) {
            parentNode.removeChild(node);
          });
        },
        redo: function redo(params) {
          var parentNode = findNode(params.parentPath);
          var afterNode = findNode(params.afterPath);
          params.nodes.forEach(function (node) {
            parentNode.insertAfter(node, afterNode);
            afterNode = node;
          });
        }
      },
      removeNodes: {
        undo: function undo(params) {
          var parentNode = findNode(params.parentPath);
          var beforeNode = parentNode.childs[params.index] || parentNode.append;
          params.nodes.forEach(function (node) {
            parentNode.insertBefore(node, beforeNode);
          });
        },
        redo: function redo(params) {
          var parentNode = findNode(params.parentPath);
          params.paths.map(findNode).forEach(function (node) {
            parentNode.removeChild(node);
          });
        }
      },
      duplicateNodes: {
        undo: function undo(params) {
          var parentNode = findNode(params.parentPath);
          params.clonePaths.map(findNode).forEach(function (node) {
            parentNode.removeChild(node);
          });
        },
        redo: function redo(params) {
          var parentNode = findNode(params.parentPath);
          var afterNode = findNode(params.afterPath);
          var nodes = params.paths.map(findNode);
          nodes.forEach(function (node) {
            var clone = node.clone();
            if (parentNode.type === 'object') {
              var existingFieldNames = parentNode.getFieldNames();
              clone.field = (0,util.findUniqueName)(node.field, existingFieldNames);
            }
            parentNode.insertAfter(clone, afterNode);
            afterNode = clone;
          });
        }
      },
      moveNodes: {
        undo: function undo(params) {
          var oldParentNode = findNode(params.oldParentPath);
          var newParentNode = findNode(params.newParentPath);
          var oldBeforeNode = oldParentNode.childs[params.oldIndex] || oldParentNode.append;

          // first copy the nodes, then move them
          var nodes = newParentNode.childs.slice(params.newIndex, params.newIndex + params.count);
          nodes.forEach(function (node, index) {
            node.field = params.fieldNames[index];
            oldParentNode.moveBefore(node, oldBeforeNode);
          });

          // This is a hack to work around an issue that we don't know tha original
          // path of the new parent after dragging, as the node is already moved at that time.
          if (params.newParentPathRedo === null) {
            params.newParentPathRedo = newParentNode.getInternalPath();
          }
        },
        redo: function redo(params) {
          var oldParentNode = findNode(params.oldParentPathRedo);
          var newParentNode = findNode(params.newParentPathRedo);
          var newBeforeNode = newParentNode.childs[params.newIndexRedo] || newParentNode.append;

          // first copy the nodes, then move them
          var nodes = oldParentNode.childs.slice(params.oldIndexRedo, params.oldIndexRedo + params.count);
          nodes.forEach(function (node, index) {
            node.field = params.fieldNames[index];
            newParentNode.moveBefore(node, newBeforeNode);
          });
        }
      },
      sort: {
        undo: function undo(params) {
          var node = findNode(params.path);
          node.hideChilds();
          node.childs = params.oldChilds;
          node.updateDom({
            updateIndexes: true
          });
          node.showChilds();
        },
        redo: function redo(params) {
          var node = findNode(params.path);
          node.hideChilds();
          node.childs = params.newChilds;
          node.updateDom({
            updateIndexes: true
          });
          node.showChilds();
        }
      },
      transform: {
        undo: function undo(params) {
          findNode(params.path).setInternalValue(params.oldValue);

          // TODO: would be nice to restore the state of the node and childs
        },
        redo: function redo(params) {
          findNode(params.path).setInternalValue(params.newValue);

          // TODO: would be nice to restore the state of the node and childs
        }
      }

      // TODO: restore the original caret position and selection with each undo
      // TODO: implement history for actions "expand", "collapse", "scroll", "setDocument"
    };
  }

  /**
   * The method onChange is executed when the History is changed, and can
   * be overloaded.
   */
  return NodeHistory_createClass(NodeHistory, [{
    key: "onChange",
    value: function onChange() {}

    /**
     * Add a new action to the history
     * @param {String} action  The executed action. Available actions: "editField",
     *                         "editValue", "changeType", "appendNode",
     *                         "removeNode", "duplicateNode", "moveNode"
     * @param {Object} params  Object containing parameters describing the change.
     *                         The parameters in params depend on the action (for
     *                         example for "editValue" the Node, old value, and new
     *                         value are provided). params contains all information
     *                         needed to undo or redo the action.
     */
  }, {
    key: "add",
    value: function add(action, params) {
      this.index++;
      this.history[this.index] = {
        action: action,
        params: params,
        timestamp: new Date()
      };

      // remove redo actions which are invalid now
      if (this.index < this.history.length - 1) {
        this.history.splice(this.index + 1, this.history.length - this.index - 1);
      }

      // fire onchange event
      this.onChange();
    }

    /**
     * Clear history
     */
  }, {
    key: "clear",
    value: function clear() {
      this.history = [];
      this.index = -1;

      // fire onchange event
      this.onChange();
    }

    /**
     * Check if there is an action available for undo
     * @return {Boolean} canUndo
     */
  }, {
    key: "canUndo",
    value: function canUndo() {
      return this.index >= 0;
    }

    /**
     * Check if there is an action available for redo
     * @return {Boolean} canRedo
     */
  }, {
    key: "canRedo",
    value: function canRedo() {
      return this.index < this.history.length - 1;
    }

    /**
     * Undo the last action
     */
  }, {
    key: "undo",
    value: function undo() {
      if (this.canUndo()) {
        var obj = this.history[this.index];
        if (obj) {
          var action = this.actions[obj.action];
          if (action && action.undo) {
            action.undo(obj.params);
            if (obj.params.oldSelection) {
              try {
                this.editor.setDomSelection(obj.params.oldSelection);
              } catch (err) {
                console.error(err);
              }
            }
          } else {
            console.error(new Error('unknown action "' + obj.action + '"'));
          }
        }
        this.index--;

        // fire onchange event
        this.onChange();
      }
    }

    /**
     * Redo the last action
     */
  }, {
    key: "redo",
    value: function redo() {
      if (this.canRedo()) {
        this.index++;
        var obj = this.history[this.index];
        if (obj) {
          var action = this.actions[obj.action];
          if (action && action.redo) {
            action.redo(obj.params);
            if (obj.params.newSelection) {
              try {
                this.editor.setDomSelection(obj.params.newSelection);
              } catch (err) {
                console.error(err);
              }
            }
          } else {
            console.error(new Error('unknown action "' + obj.action + '"'));
          }
        }

        // fire onchange event
        this.onChange();
      }
    }

    /**
     * Destroy history
     */
  }, {
    key: "destroy",
    value: function destroy() {
      this.editor = null;
      this.history = [];
      this.index = -1;
    }
  }]);
}();
;// ./src/js/SearchBox.js


function SearchBox_typeof(o) { "@babel/helpers - typeof"; return SearchBox_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, SearchBox_typeof(o); }
function SearchBox_classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function SearchBox_defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, SearchBox_toPropertyKey(o.key), o); } }
function SearchBox_createClass(e, r, t) { return r && SearchBox_defineProperties(e.prototype, r), t && SearchBox_defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function SearchBox_toPropertyKey(t) { var i = SearchBox_toPrimitive(t, "string"); return "symbol" == SearchBox_typeof(i) ? i : i + ""; }
function SearchBox_toPrimitive(t, r) { if ("object" != SearchBox_typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != SearchBox_typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }


/**
 * @constructor SearchBox
 * Create a search box in given HTML container
 * @param {JSONEditor} editor    The JSON Editor to attach to
 * @param {Element} container               HTML container element of where to
 *                                          create the search box
 */
var SearchBox = /*#__PURE__*/function () {
  function SearchBox(editor, container) {
    SearchBox_classCallCheck(this, SearchBox);
    var searchBox = this;
    this.editor = editor;
    this.timeout = undefined;
    this.delay = 200; // ms
    this.lastText = undefined;
    this.results = null;
    this.dom = {};
    this.dom.container = container;
    var wrapper = document.createElement('div');
    this.dom.wrapper = wrapper;
    wrapper.className = 'jsoneditor-search';
    container.appendChild(wrapper);
    var results = document.createElement('div');
    this.dom.results = results;
    results.className = 'jsoneditor-results';
    wrapper.appendChild(results);
    var divInput = document.createElement('div');
    this.dom.input = divInput;
    divInput.className = 'jsoneditor-frame';
    divInput.title = (0,i18n/* translate */.Tl)('searchTitle');
    wrapper.appendChild(divInput);
    var refreshSearch = document.createElement('button');
    refreshSearch.type = 'button';
    refreshSearch.className = 'jsoneditor-refresh';
    divInput.appendChild(refreshSearch);
    var search = document.createElement('input');
    search.type = 'text';
    this.dom.search = search;
    search.oninput = function (event) {
      searchBox._onDelayedSearch(event);
    };
    search.onchange = function (event) {
      // For IE 9
      searchBox._onSearch();
    };
    search.onkeydown = function (event) {
      searchBox._onKeyDown(event);
    };
    search.onkeyup = function (event) {
      searchBox._onKeyUp(event);
    };
    refreshSearch.onclick = function (event) {
      search.select();
    };

    // TODO: ESC in FF restores the last input, is a FF bug, https://bugzilla.mozilla.org/show_bug.cgi?id=598819
    divInput.appendChild(search);
    var searchNext = document.createElement('button');
    searchNext.type = 'button';
    searchNext.title = (0,i18n/* translate */.Tl)('searchNextResultTitle');
    searchNext.className = 'jsoneditor-next';
    searchNext.onclick = function () {
      searchBox.next();
    };
    divInput.appendChild(searchNext);
    var searchPrevious = document.createElement('button');
    searchPrevious.type = 'button';
    searchPrevious.title = (0,i18n/* translate */.Tl)('searchPreviousResultTitle');
    searchPrevious.className = 'jsoneditor-previous';
    searchPrevious.onclick = function () {
      searchBox.previous();
    };
    divInput.appendChild(searchPrevious);
  }

  /**
   * Go to the next search result
   * @param {boolean} [focus]   If true, focus will be set to the next result
   *                            focus is false by default.
   */
  return SearchBox_createClass(SearchBox, [{
    key: "next",
    value: function next(focus) {
      if (this.results) {
        var index = this.resultIndex !== null ? this.resultIndex + 1 : 0;
        if (index > this.results.length - 1) {
          index = 0;
        }
        this._setActiveResult(index, focus);
      }
    }

    /**
     * Go to the prevous search result
     * @param {boolean} [focus]   If true, focus will be set to the next result
     *                            focus is false by default.
     */
  }, {
    key: "previous",
    value: function previous(focus) {
      if (this.results) {
        var max = this.results.length - 1;
        var index = this.resultIndex !== null ? this.resultIndex - 1 : max;
        if (index < 0) {
          index = max;
        }
        this._setActiveResult(index, focus);
      }
    }

    /**
     * Set new value for the current active result
     * @param {Number} index
     * @param {boolean} [focus]   If true, focus will be set to the next result.
     *                            focus is false by default.
     * @private
     */
  }, {
    key: "_setActiveResult",
    value: function _setActiveResult(index, focus) {
      // de-activate current active result
      if (this.activeResult) {
        var prevNode = this.activeResult.node;
        var prevElem = this.activeResult.elem;
        if (prevElem === 'field') {
          delete prevNode.searchFieldActive;
        } else {
          delete prevNode.searchValueActive;
        }
        prevNode.updateDom();
      }
      if (!this.results || !this.results[index]) {
        // out of range, set to undefined
        this.resultIndex = undefined;
        this.activeResult = undefined;
        return;
      }
      this.resultIndex = index;

      // set new node active
      var node = this.results[this.resultIndex].node;
      var elem = this.results[this.resultIndex].elem;
      if (elem === 'field') {
        node.searchFieldActive = true;
      } else {
        node.searchValueActive = true;
      }
      this.activeResult = this.results[this.resultIndex];
      node.updateDom();

      // TODO: not so nice that the focus is only set after the animation is finished
      node.scrollTo(function () {
        if (focus) {
          node.focus(elem);
        }
      });
    }

    /**
     * Cancel any running onDelayedSearch.
     * @private
     */
  }, {
    key: "_clearDelay",
    value: function _clearDelay() {
      if (this.timeout !== undefined) {
        clearTimeout(this.timeout);
        delete this.timeout;
      }
    }

    /**
     * Start a timer to execute a search after a short delay.
     * Used for reducing the number of searches while typing.
     * @param {Event} event
     * @private
     */
  }, {
    key: "_onDelayedSearch",
    value: function _onDelayedSearch(event) {
      // execute the search after a short delay (reduces the number of
      // search actions while typing in the search text box)
      this._clearDelay();
      var searchBox = this;
      this.timeout = setTimeout(function (event) {
        searchBox._onSearch();
      }, this.delay);
    }

    /**
     * Handle onSearch event
     * @param {boolean} [forceSearch]  If true, search will be executed again even
     *                                 when the search text is not changed.
     *                                 Default is false.
     * @private
     */
  }, {
    key: "_onSearch",
    value: function _onSearch(forceSearch) {
      this._clearDelay();
      var value = this.dom.search.value;
      var text = value.length > 0 ? value : undefined;
      if (text !== this.lastText || forceSearch) {
        // only search again when changed
        this.lastText = text;
        this.results = this.editor.search(text);
        var MAX_SEARCH_RESULTS = this.results[0] ? this.results[0].node.MAX_SEARCH_RESULTS : Infinity;

        // try to maintain the current active result if this is still part of the new search results
        var activeResultIndex = 0;
        if (this.activeResult) {
          for (var i = 0; i < this.results.length; i++) {
            if (this.results[i].node === this.activeResult.node) {
              activeResultIndex = i;
              break;
            }
          }
        }
        this._setActiveResult(activeResultIndex, false);

        // display search results
        if (text !== undefined) {
          var resultCount = this.results.length;
          if (resultCount === 0) {
            this.dom.results.textContent = "no\xA0results";
          } else if (resultCount === 1) {
            this.dom.results.textContent = "1\xA0result";
          } else if (resultCount > MAX_SEARCH_RESULTS) {
            this.dom.results.textContent = MAX_SEARCH_RESULTS + "+\xA0results";
          } else {
            this.dom.results.textContent = resultCount + "\xA0results";
          }
        } else {
          this.dom.results.textContent = '';
        }
      }
    }

    /**
     * Handle onKeyDown event in the input box
     * @param {Event} event
     * @private
     */
  }, {
    key: "_onKeyDown",
    value: function _onKeyDown(event) {
      var keynum = event.which;
      if (keynum === 27) {
        // ESC
        this.dom.search.value = ''; // clear search
        this._onSearch();
        event.preventDefault();
        event.stopPropagation();
      } else if (keynum === 13) {
        // Enter
        if (event.ctrlKey) {
          // force to search again
          this._onSearch(true);
        } else if (event.shiftKey) {
          // move to the previous search result
          this.previous();
        } else {
          // move to the next search result
          this.next();
        }
        event.preventDefault();
        event.stopPropagation();
      }
    }

    /**
     * Handle onKeyUp event in the input box
     * @param {Event} event
     * @private
     */
  }, {
    key: "_onKeyUp",
    value: function _onKeyUp(event) {
      var keynum = event.keyCode;
      if (keynum !== 27 && keynum !== 13) {
        // !show and !Enter
        this._onDelayedSearch(event); // For IE 9
      }
    }

    /**
     * Clear the search results
     */
  }, {
    key: "clear",
    value: function clear() {
      this.dom.search.value = '';
      this._onSearch();
    }

    /**
     * Refresh searchResults if there is a search value
     */
  }, {
    key: "forceSearch",
    value: function forceSearch() {
      this._onSearch(true);
    }

    /**
     * Test whether the search box value is empty
     * @returns {boolean} Returns true when empty.
     */
  }, {
    key: "isEmpty",
    value: function isEmpty() {
      return this.dom.search.value === '';
    }

    /**
     * Destroy the search box
     */
  }, {
    key: "destroy",
    value: function destroy() {
      this.editor = null;
      this.dom.container.removeChild(this.dom.wrapper);
      this.dom = null;
      this.results = null;
      this.activeResult = null;
      this._clearDelay();
    }
  }]);
}();
;// ./src/js/TreePath.js


function TreePath_typeof(o) { "@babel/helpers - typeof"; return TreePath_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, TreePath_typeof(o); }
function TreePath_classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function TreePath_defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, TreePath_toPropertyKey(o.key), o); } }
function TreePath_createClass(e, r, t) { return r && TreePath_defineProperties(e.prototype, r), t && TreePath_defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function TreePath_toPropertyKey(t) { var i = TreePath_toPrimitive(t, "string"); return "symbol" == TreePath_typeof(i) ? i : i + ""; }
function TreePath_toPrimitive(t, r) { if ("object" != TreePath_typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != TreePath_typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }




/**
 * Creates a component that visualize path selection in tree based editors
 * @param {HTMLElement} container
 * @param {HTMLElement} root
 * @constructor
 */
var TreePath = /*#__PURE__*/function () {
  function TreePath(container, root) {
    TreePath_classCallCheck(this, TreePath);
    if (container) {
      this.root = root;
      this.path = document.createElement('div');
      this.path.className = 'jsoneditor-treepath';
      this.path.setAttribute('tabindex', 0);
      this.contentMenuClicked = false;
      container.appendChild(this.path);
      this.reset();
    }
  }

  /**
   * Reset component to initial status
   */
  return TreePath_createClass(TreePath, [{
    key: "reset",
    value: function reset() {
      this.path.textContent = (0,i18n/* translate */.Tl)('selectNode');
    }

    /**
     * Renders the component UI according to a given path objects
     * @param {Array<{name: String, childs: Array}>} pathObjs a list of path objects
     *
     */
  }, {
    key: "setPath",
    value: function setPath(pathObjs) {
      var me = this;
      this.path.textContent = '';
      if (pathObjs && pathObjs.length) {
        pathObjs.forEach(function (pathObj, idx) {
          var pathEl = document.createElement('span');
          var sepEl;
          pathEl.className = 'jsoneditor-treepath-element';
          pathEl.innerText = pathObj.name;
          pathEl.onclick = _onSegmentClick.bind(me, pathObj);
          me.path.appendChild(pathEl);
          if (pathObj.children.length) {
            sepEl = document.createElement('span');
            sepEl.className = 'jsoneditor-treepath-seperator';
            sepEl.textContent = "\u25BA";
            sepEl.onclick = function () {
              me.contentMenuClicked = true;
              var items = [];
              pathObj.children.forEach(function (child) {
                items.push({
                  text: child.name,
                  className: 'jsoneditor-type-modes' + (pathObjs[idx + 1] + 1 && pathObjs[idx + 1].name === child.name ? ' jsoneditor-selected' : ''),
                  click: _onContextMenuItemClick.bind(me, pathObj, child.name)
                });
              });
              var menu = new ContextMenu/* ContextMenu */.t(items, {
                limitHeight: true
              });
              menu.show(sepEl, me.root, true);
            };
            me.path.appendChild(sepEl);
          }
          if (idx === pathObjs.length - 1) {
            var leftRectPos = (sepEl || pathEl).getBoundingClientRect().right;
            if (me.path.offsetWidth < leftRectPos) {
              me.path.scrollLeft = leftRectPos;
            }
            if (me.path.scrollLeft) {
              var showAllBtn = document.createElement('span');
              showAllBtn.className = 'jsoneditor-treepath-show-all-btn';
              showAllBtn.title = 'show all path';
              showAllBtn.textContent = '...';
              showAllBtn.onclick = _onShowAllClick.bind(me, pathObjs);
              me.path.insertBefore(showAllBtn, me.path.firstChild);
            }
          }
        });
      }
      function _onShowAllClick(pathObjs) {
        me.contentMenuClicked = false;
        (0,util.addClassName)(me.path, 'show-all');
        me.path.style.width = me.path.parentNode.getBoundingClientRect().width - 10 + 'px';
        me.path.onblur = function () {
          if (me.contentMenuClicked) {
            me.contentMenuClicked = false;
            me.path.focus();
            return;
          }
          (0,util.removeClassName)(me.path, 'show-all');
          me.path.onblur = undefined;
          me.path.style.width = '';
          me.setPath(pathObjs);
        };
      }
      function _onSegmentClick(pathObj) {
        if (this.selectionCallback) {
          this.selectionCallback(pathObj);
        }
      }
      function _onContextMenuItemClick(pathObj, selection) {
        if (this.contextMenuCallback) {
          this.contextMenuCallback(pathObj, selection);
        }
      }
    }

    /**
     * set a callback function for selection of path section
     * @param {Function} callback function to invoke when section is selected
     */
  }, {
    key: "onSectionSelected",
    value: function onSectionSelected(callback) {
      if (typeof callback === 'function') {
        this.selectionCallback = callback;
      }
    }

    /**
     * set a callback function for selection of path section
     * @param {Function} callback function to invoke when section is selected
     */
  }, {
    key: "onContextMenuItemSelected",
    value: function onContextMenuItemSelected(callback) {
      if (typeof callback === 'function') {
        this.contextMenuCallback = callback;
      }
    }
  }]);
}();
// EXTERNAL MODULE: ./src/js/vanilla-picker/index.js
var vanilla_picker = __webpack_require__(746);
var vanilla_picker_default = /*#__PURE__*/__webpack_require__.n(vanilla_picker);
;// ./src/js/treemode.js
















// create a mixin with the functions for tree mode
var treemode = {};

/**
 * Create a tree editor
 * @param {Element} container    Container element
 * @param {Object} [options]   Object with options. See docs for details.
 * @private
 */
treemode.create = function (container, options) {
  if (!container) {
    throw new Error('No container element provided.');
  }
  this.container = container;
  this.dom = {};
  this.highlighter = new Highlighter();
  this.selection = undefined; // will hold the last input selection
  this.multiselection = {
    nodes: []
  };
  this.validateSchema = null; // will be set in .setSchema(schema)
  this.validationSequence = 0;
  this.errorNodes = [];
  this.lastSchemaErrors = undefined;
  this.node = null;
  this.focusTarget = null;
  this._setOptions(options);
  if (options.autocomplete) {
    this.autocomplete = autocomplete(options.autocomplete);
  }
  if (this.options.history && this.options.mode !== 'view') {
    this.history = new NodeHistory(this);
  }
  this._createFrame();
  this._createTable();
};

/**
 * Destroy the editor. Clean up DOM, event listeners, and web workers.
 */
treemode.destroy = function () {
  if (this.frame && this.container && this.frame.parentNode === this.container) {
    this.container.removeChild(this.frame);
    this.frame = null;
  }
  this.container = null;
  this.dom = null;
  this.clear();
  this.node = null;
  this.focusTarget = null;
  this.selection = null;
  this.multiselection = null;
  this.errorNodes = null;
  this.validateSchema = null;
  this._debouncedValidate = null;
  if (this.history) {
    this.history.destroy();
    this.history = null;
  }
  if (this.searchBox) {
    this.searchBox.destroy();
    this.searchBox = null;
  }
  if (this.modeSwitcher) {
    this.modeSwitcher.destroy();
    this.modeSwitcher = null;
  }

  // Removing the FocusTracker set to track the editor's focus event
  this.frameFocusTracker.destroy();
};

/**
 * Initialize and set default options
 * @param {Object}  [options]    See description in constructor
 * @private
 */
treemode._setOptions = function (options) {
  var _this = this;
  this.options = {
    search: true,
    history: true,
    mode: 'tree',
    name: undefined,
    // field name of root node
    schema: null,
    schemaRefs: null,
    autocomplete: null,
    navigationBar: true,
    mainMenuBar: true,
    limitDragging: false,
    onSelectionChange: null,
    colorPicker: true,
    onColorPicker: function onColorPicker(parent, color, onChange) {
      if ((vanilla_picker_default())) {
        // we'll render the color picker on top
        // when there is not enough space below, and there is enough space above
        var pickerHeight = 300; // estimated height of the color picker
        var top = parent.getBoundingClientRect().top;
        var windowHeight = (0,util.getWindow)(parent).innerHeight;
        var showOnTop = windowHeight - top < pickerHeight && top > pickerHeight;
        new (vanilla_picker_default())({
          parent: parent,
          color: color,
          popup: showOnTop ? 'top' : 'bottom',
          onDone: function onDone(color) {
            var alpha = color.rgba[3];
            var hex = alpha === 1 ? color.hex.substr(0, 7) // return #RRGGBB
            : color.hex; // return #RRGGBBAA
            onChange(hex);
          }
        }).show();
      } else {
        console.warn('Cannot open color picker: the `vanilla-picker` library is not included in the bundle. ' + 'Either use the full bundle or implement your own color picker using `onColorPicker`.');
      }
    },
    timestampTag: true,
    timestampFormat: null,
    createQuery: jmespathQuery/* createQuery */.V,
    executeQuery: jmespathQuery/* executeQuery */.e,
    onEvent: null,
    enableSort: true,
    enableTransform: true
  };

  // copy all options
  if (options) {
    Object.keys(options).forEach(function (prop) {
      _this.options[prop] = options[prop];
    });

    // default limitDragging to true when a JSON schema is defined
    if (options.limitDragging == null && options.schema != null) {
      this.options.limitDragging = true;
    }
  }

  // compile a JSON schema validator if a JSON schema is provided
  this.setSchema(this.options.schema, this.options.schemaRefs);

  // create a debounced validate function
  this._debouncedValidate = (0,util.debounce)(this._validateAndCatch.bind(this), this.DEBOUNCE_INTERVAL);
  if (options.onSelectionChange) {
    this.onSelectionChange(options.onSelectionChange);
  }
  (0,i18n/* setLanguages */.AI)(this.options.languages);
  (0,i18n/* setLanguage */.xC)(this.options.language);
};

/**
 * Set new JSON object in editor.
 * Resets the state of the editor (expanded nodes, search, selection).
 *
 * @param {*} json
 */
treemode.set = function (json) {
  // verify if json is valid JSON, ignore when a function
  if (json instanceof Function || json === undefined) {
    this.clear();
  } else {
    this.content.removeChild(this.table); // Take the table offline

    // replace the root node
    var params = {
      field: this.options.name,
      value: json
    };
    var node = new Node(this, params);
    this._setRoot(node);

    // validate JSON schema (if configured)
    this._validateAndCatch();

    // expand
    var recurse = false;
    this.node.expand(recurse);
    this.content.appendChild(this.table); // Put the table online again
  }

  // TODO: maintain history, store last state and previous document
  if (this.history) {
    this.history.clear();
  }

  // clear search
  if (this.searchBox) {
    this.searchBox.clear();
  }
};

/**
 * Update JSON object in editor.
 * Maintains the state of the editor (expanded nodes, search, selection).
 *
 * @param {*} json
 */
treemode.update = function (json) {
  // don't update if there are no changes
  if (this.node.deepEqual(json)) {
    return;
  }
  var selection = this.getSelection();

  // apply the changed json
  this.onChangeDisabled = true; // don't fire an onChange event
  this.node.update(json);
  this.onChangeDisabled = false;

  // validate JSON schema
  this._validateAndCatch();

  // update search result if any
  if (this.searchBox && !this.searchBox.isEmpty()) {
    this.searchBox.forceSearch();
  }

  // update selection if any
  if (selection && selection.start && selection.end) {
    // only keep/update the selection if both start and end node still exists,
    // else we clear the selection
    var startNode = this.node.findNodeByPath(selection.start.path);
    var endNode = this.node.findNodeByPath(selection.end.path);
    if (startNode && endNode) {
      this.setSelection(selection.start, selection.end);
    } else {
      this.setSelection({}, {}); // clear selection
    }
  } else {
    this.setSelection({}, {}); // clear selection
  }
};

/**
 * Get JSON object from editor
 * @return {Object | undefined} json
 */
treemode.get = function () {
  // TODO: resolve pending debounced input changes if any, but do not resolve invalid inputs

  if (this.node) {
    return this.node.getValue();
  } else {
    return undefined;
  }
};

/**
 * Get the text contents of the editor
 * @return {String} jsonText
 */
treemode.getText = function () {
  return JSON.stringify(this.get());
};

/**
 * Set the text contents of the editor.
 * Resets the state of the editor (expanded nodes, search, selection).
 * @param {String} jsonText
 */
treemode.setText = function (jsonText) {
  try {
    this.set((0,util.parse)(jsonText)); // this can throw an error
  } catch (err) {
    // try to repair json, replace JavaScript notation with JSON notation
    var repairedJsonText = (0,util.tryJsonRepair)(jsonText);

    // try to parse again
    this.set((0,util.parse)(repairedJsonText)); // this can throw an error
  }
};

/**
 * Update the text contents of the editor.
 * Maintains the state of the editor (expanded nodes, search, selection).
 * @param {String} jsonText
 */
treemode.updateText = function (jsonText) {
  try {
    this.update((0,util.parse)(jsonText)); // this can throw an error
  } catch (err) {
    // try to repair json, replace JavaScript notation with JSON notation
    var repairJsonText = (0,util.tryJsonRepair)(jsonText);

    // try to parse again
    this.update((0,util.parse)(repairJsonText)); // this can throw an error
  }
};

/**
 * Set a field name for the root node.
 * @param {String | undefined} name
 */
treemode.setName = function (name) {
  this.options.name = name;
  if (this.node) {
    this.node.updateField(this.options.name);
  }
};

/**
 * Get the field name for the root node.
 * @return {String | undefined} name
 */
treemode.getName = function () {
  return this.options.name;
};

/**
 * Set focus to the editor. Focus will be set to:
 * - the first editable field or value, or else
 * - to the expand button of the root node, or else
 * - to the context menu button of the root node, or else
 * - to the first button in the top menu
 */
treemode.focus = function () {
  var input = this.scrollableContent.querySelector('[contenteditable=true]');
  if (input) {
    input.focus();
  } else if (this.node.dom.expand) {
    this.node.dom.expand.focus();
  } else if (this.node.dom.menu) {
    this.node.dom.menu.focus();
  } else {
    // focus to the first button in the menu
    input = this.frame.querySelector('button');
    if (input) {
      input.focus();
    }
  }
};

/**
 * Remove the root node from the editor
 */
treemode.clear = function () {
  if (this.node) {
    this.node.hide();
    delete this.node;
  }
  if (this.treePath) {
    this.treePath.reset();
  }
};

/**
 * Set the root node for the json editor
 * @param {Node} node
 * @private
 */
treemode._setRoot = function (node) {
  this.clear();
  this.node = node;
  node.setParent(null);
  node.setField(this.getName(), false);
  delete node.index;

  // append to the dom
  this.tbody.appendChild(node.getDom());
};

/**
 * Search text in all nodes
 * The nodes will be expanded when the text is found one of its childs,
 * else it will be collapsed. Searches are case insensitive.
 * @param {String} text
 * @return {Object[]} results  Array with nodes containing the search results
 *                             The result objects contains fields:
 *                             - {Node} node,
 *                             - {String} elem  the dom element name where
 *                                              the result is found ('field' or
 *                                              'value')
 */
treemode.search = function (text) {
  var results;
  if (this.node) {
    this.content.removeChild(this.table); // Take the table offline
    results = this.node.search(text);
    this.content.appendChild(this.table); // Put the table online again
  } else {
    results = [];
  }
  return results;
};

/**
 * Expand all nodes
 */
treemode.expandAll = function () {
  if (this.node) {
    this.content.removeChild(this.table); // Take the table offline
    this.node.expand();
    this.content.appendChild(this.table); // Put the table online again
  }
};

/**
 * Collapse all nodes
 */
treemode.collapseAll = function () {
  if (this.node) {
    this.content.removeChild(this.table); // Take the table offline
    this.node.collapse();
    this.content.appendChild(this.table); // Put the table online again
  }
};

/**
 * Expand/collapse a given JSON node.
 * @param {Object} [options] Available parameters:
 *                         {Array<String>} [path] Path for the node to expand/collapse.
 *                         {Boolean} [isExpand]  Whether to expand the node (else collapse).
 *                         {Boolean} [recursive]  Whether to expand/collapse child nodes recursively.
 */
treemode.expand = function (options) {
  if (!options) return;
  var node = this.node ? this.node.findNodeByPath(options.path) : null;
  if (!node) return;
  if (options.isExpand) {
    node.expand(options.recursive);
  } else {
    node.collapse(options.recursive);
  }
};

/**
 * The method onChange is called whenever a field or value is changed, created,
 * deleted, duplicated, etc.
 * @param {String} action  Change action. Available values: "editField",
 *                         "editValue", "changeType", "appendNode",
 *                         "removeNode", "duplicateNode", "moveNode", "expand",
 *                         "collapse".
 * @param {Object} params  Object containing parameters describing the change.
 *                         The parameters in params depend on the action (for
 *                         example for "editValue" the Node, old value, and new
 *                         value are provided). params contains all information
 *                         needed to undo or redo the action.
 * @private
 */
treemode._onAction = function (action, params) {
  // add an action to the history
  if (this.history) {
    this.history.add(action, params);
  }
  this._onChange();
};

/**
 * Handle a change:
 * - Validate JSON schema
 * - Send a callback to the onChange listener if provided
 * @private
 */
treemode._onChange = function () {
  if (this.onChangeDisabled) {
    return;
  }

  // selection can be changed after undo/redo
  this.selection = this.getDomSelection();

  // validate JSON schema (if configured)
  this._debouncedValidate();
  if (this.treePath) {
    var selectedNode = this.node && this.selection ? this.node.findNodeByInternalPath(this.selection.path) : this.multiselection ? this.multiselection.nodes[0] : undefined;
    if (selectedNode) {
      this._updateTreePath(selectedNode.getNodePath());
    } else {
      this.treePath.reset();
    }
  }

  // trigger the onChange callback
  if (this.options.onChange) {
    try {
      this.options.onChange();
    } catch (err) {
      console.error('Error in onChange callback: ', err);
    }
  }

  // trigger the onChangeJSON callback
  if (this.options.onChangeJSON) {
    try {
      this.options.onChangeJSON(this.get());
    } catch (err) {
      console.error('Error in onChangeJSON callback: ', err);
    }
  }

  // trigger the onChangeText callback
  if (this.options.onChangeText) {
    try {
      this.options.onChangeText(this.getText());
    } catch (err) {
      console.error('Error in onChangeText callback: ', err);
    }
  }

  // trigger the onClassName callback
  if (this.options.onClassName) {
    this.node.recursivelyUpdateCssClassesOnNodes();
  }

  // trigger the onNodeName callback
  if (this.options.onNodeName && this.node.childs) {
    try {
      this.node.recursivelyUpdateNodeName();
    } catch (err) {
      console.error('Error in onNodeName callback: ', err);
    }
  }
};

/**
 * Validate current JSON object against the configured JSON schema
 * Throws an exception when no JSON schema is configured
 */
treemode.validate = function () {
  var _this2 = this;
  var root = this.node;
  if (!root) {
    // TODO: this should be redundant but is needed on mode switch
    return;
  }
  var json = root.getValue();

  // execute JSON schema validation
  var schemaErrors = [];
  if (this.validateSchema) {
    var valid = this.validateSchema(json);
    if (!valid) {
      // apply all new errors
      schemaErrors = this.validateSchema.errors.map(function (error) {
        return (0,util.improveSchemaError)(error);
      }).map(function findNode(error) {
        return {
          node: root.findNode(error.dataPath),
          error: error,
          type: 'validation'
        };
      }).filter(function hasNode(entry) {
        return entry.node != null;
      });
    }
  }

  // execute custom validation and after than merge and render all errors
  try {
    this.validationSequence++;
    var me = this;
    var seq = this.validationSequence;
    return this._validateCustom(json).then(function (customValidationErrors) {
      // only apply when there was no other validation started whilst resolving async results
      if (seq === me.validationSequence) {
        var errorNodes = [].concat(schemaErrors, customValidationErrors || []);
        me._renderValidationErrors(errorNodes);
        if (typeof _this2.options.onValidationError === 'function' && (0,util.isValidationErrorChanged)(errorNodes, _this2.lastSchemaErrors)) {
          _this2.options.onValidationError.call(_this2, errorNodes);
        }
        _this2.lastSchemaErrors = errorNodes;
      }
      return _this2.lastSchemaErrors;
    });
  } catch (err) {
    return Promise.reject(err);
  }
};
treemode._validateAndCatch = function () {
  this.validate()["catch"](function (err) {
    console.error('Error running validation:', err);
  });
};
treemode._renderValidationErrors = function (errorNodes) {
  // clear all current errors
  if (this.errorNodes) {
    this.errorNodes.forEach(function (node) {
      node.setError(null);
    });
  }

  // render the new errors
  var parentPairs = errorNodes.reduce(function (all, entry) {
    return entry.node.findParents().filter(function (parent) {
      return !all.some(function (pair) {
        return pair[0] === parent;
      });
    }).map(function (parent) {
      return [parent, entry.node];
    }).concat(all);
  }, []);
  this.errorNodes = parentPairs.map(function (pair) {
    return {
      node: pair[0],
      child: pair[1],
      error: {
        message: pair[0].type === 'object' ? (0,i18n/* translate */.Tl)('containsInvalidProperties') // object
        : (0,i18n/* translate */.Tl)('containsInvalidItems') // array
      }
    };
  }).concat(errorNodes).map(function setError(entry) {
    entry.node.setError(entry.error, entry.child);
    return entry.node;
  });
};

/**
 * Execute custom validation if configured.
 *
 * Returns a promise resolving with the custom errors (or nothing).
 */
treemode._validateCustom = function (json) {
  try {
    if (this.options.onValidate) {
      var root = this.node;
      var customValidateResults = this.options.onValidate(json);
      var resultPromise = (0,util.isPromise)(customValidateResults) ? customValidateResults : Promise.resolve(customValidateResults);
      return resultPromise.then(function (customValidationPathErrors) {
        if (Array.isArray(customValidationPathErrors)) {
          return customValidationPathErrors.filter(function (error) {
            var valid = (0,util.isValidValidationError)(error);
            if (!valid) {
              console.warn('Ignoring a custom validation error with invalid structure. ' + 'Expected structure: {path: [...], message: "..."}. ' + 'Actual error:', error);
            }
            return valid;
          }).map(function (error) {
            var node;
            try {
              node = error && error.path ? root.findNodeByPath(error.path) : null;
            } catch (err) {
              // stay silent here, we throw a generic warning if no node is found
            }
            if (!node) {
              console.warn('Ignoring validation error: node not found. Path:', error.path, 'Error:', error);
            }
            return {
              node: node,
              error: error,
              type: 'customValidation'
            };
          }).filter(function (entry) {
            return entry && entry.node && entry.error && entry.error.message;
          });
        } else {
          return null;
        }
      });
    }
  } catch (err) {
    return Promise.reject(err);
  }
  return Promise.resolve(null);
};

/**
 * Refresh the rendered contents
 */
treemode.refresh = function () {
  if (this.node) {
    this.node.updateDom({
      recurse: true
    });
  }
};

/**
 * Start autoscrolling when given mouse position is above the top of the
 * editor contents, or below the bottom.
 * @param {Number} mouseY  Absolute mouse position in pixels
 */
treemode.startAutoScroll = function (mouseY) {
  var me = this;
  var content = this.scrollableContent;
  var top = (0,util.getAbsoluteTop)(content);
  var height = content.clientHeight;
  var bottom = top + height;
  var margin = 24;
  var interval = 50; // ms

  if (mouseY < top + margin && content.scrollTop > 0) {
    this.autoScrollStep = (top + margin - mouseY) / 3;
  } else if (mouseY > bottom - margin && height + content.scrollTop < content.scrollHeight) {
    this.autoScrollStep = (bottom - margin - mouseY) / 3;
  } else {
    this.autoScrollStep = undefined;
  }
  if (this.autoScrollStep) {
    if (!this.autoScrollTimer) {
      this.autoScrollTimer = setInterval(function () {
        if (me.autoScrollStep) {
          content.scrollTop -= me.autoScrollStep;
        } else {
          me.stopAutoScroll();
        }
      }, interval);
    }
  } else {
    this.stopAutoScroll();
  }
};

/**
 * Stop auto scrolling. Only applicable when scrolling
 */
treemode.stopAutoScroll = function () {
  if (this.autoScrollTimer) {
    clearTimeout(this.autoScrollTimer);
    delete this.autoScrollTimer;
  }
  if (this.autoScrollStep) {
    delete this.autoScrollStep;
  }
};

/**
 * Set the focus to an element in the editor, set text selection, and
 * set scroll position.
 * @param {Object} selection  An object containing fields:
 *                            {Element | undefined} dom     The dom element
 *                                                          which has focus
 *                            {Range | TextRange} range     A text selection
 *                            {Node[]} nodes                Nodes in case of multi selection
 *                            {Number} scrollTop            Scroll position
 */
treemode.setDomSelection = function (selection) {
  if (!selection) {
    return;
  }
  if ('scrollTop' in selection && this.scrollableContent) {
    // TODO: animated scroll
    this.scrollableContent.scrollTop = selection.scrollTop;
  }
  if (selection.paths) {
    // multi-select
    var me = this;
    var nodes = selection.paths.map(function (path) {
      return me.node.findNodeByInternalPath(path);
    });
    this.select(nodes);
  } else {
    // find the actual DOM element where to apply the focus
    var node = selection.path ? this.node.findNodeByInternalPath(selection.path) : null;
    var container = node && selection.domName ? node.dom[selection.domName] : null;
    if (selection.range && container) {
      var range = Object.assign({}, selection.range, {
        container: container
      });
      (0,util.setSelectionOffset)(range);
    } else if (node) {
      // just a fallback
      node.focus();
    }
  }
};

/**
 * Get the current focus
 * @return {Object} selection An object containing fields:
 *                            {Element | undefined} dom     The dom element
 *                                                          which has focus
 *                            {Range | TextRange} range     A text selection
 *                            {Node[]} nodes                Nodes in case of multi selection
 *                            {Number} scrollTop            Scroll position
 */
treemode.getDomSelection = function () {
  // find the node and field name of the current target,
  // so we can store the current selection in a serializable
  // way (internal node path and domName)
  var node = Node.getNodeFromTarget(this.focusTarget);
  var focusTarget = this.focusTarget;
  var domName = node ? Object.keys(node.dom).find(function (domName) {
    return node.dom[domName] === focusTarget;
  }) : null;
  var range = (0,util.getSelectionOffset)();
  if (range && range.container.nodeName !== 'DIV') {
    // filter on (editable) divs)
    range = null;
  }
  if (range && range.container !== focusTarget) {
    range = null;
  }
  if (range) {
    // we cannot rely on the current instance of the container,
    // we need to store the internal node path and field and
    // find the actual DOM field when applying the selection
    delete range.container;
  }
  return {
    path: node ? node.getInternalPath() : null,
    domName: domName,
    range: range,
    paths: this.multiselection.length > 0 ? this.multiselection.nodes.map(function (node) {
      return node.getInternalPath();
    }) : null,
    scrollTop: this.scrollableContent ? this.scrollableContent.scrollTop : 0
  };
};

/**
 * Adjust the scroll position such that given top position is shown at 1/4
 * of the window height.
 * @param {Number} top
 * @param {function(boolean)} [animateCallback] Callback, executed when animation is
 *                                              finished. The callback returns true
 *                                              when animation is finished, or false
 *                                              when not.
 */
treemode.scrollTo = function (top, animateCallback) {
  var content = this.scrollableContent;
  if (content) {
    var editor = this;
    // cancel any running animation
    if (editor.animateTimeout) {
      clearTimeout(editor.animateTimeout);
      delete editor.animateTimeout;
    }
    if (editor.animateCallback) {
      editor.animateCallback(false);
      delete editor.animateCallback;
    }

    // calculate final scroll position
    var height = content.clientHeight;
    var bottom = content.scrollHeight - height;
    var finalScrollTop = Math.min(Math.max(top - height / 4, 0), bottom);

    // animate towards the new scroll position
    var _animate = function animate() {
      var scrollTop = content.scrollTop;
      var diff = finalScrollTop - scrollTop;
      if (Math.abs(diff) > 3) {
        content.scrollTop += diff / 3;
        editor.animateCallback = animateCallback;
        editor.animateTimeout = setTimeout(_animate, 50);
      } else {
        // finished
        if (animateCallback) {
          animateCallback(true);
        }
        content.scrollTop = finalScrollTop;
        delete editor.animateTimeout;
        delete editor.animateCallback;
      }
    };
    _animate();
  } else {
    if (animateCallback) {
      animateCallback(false);
    }
  }
};

/**
 * Create main frame
 * @private
 */
treemode._createFrame = function () {
  var _this3 = this;
  // create the frame
  this.frame = document.createElement('div');
  this.frame.className = 'jsoneditor jsoneditor-mode-' + this.options.mode;
  // this.frame.setAttribute("tabindex","0");

  this.container.appendChild(this.frame);
  this.contentOuter = document.createElement('div');
  this.contentOuter.className = 'jsoneditor-outer';

  // create one global event listener to handle all events from all nodes
  var editor = this;
  function onEvent(event) {
    // when switching to mode "code" or "text" via the menu, some events
    // are still fired whilst the _onEvent methods is already removed.
    if (editor._onEvent) {
      editor._onEvent(event);
    }
  }

  // setting the FocusTracker on 'this.frame' to track the editor's focus event
  var focusTrackerConfig = {
    target: this.frame,
    onFocus: this.options.onFocus || null,
    onBlur: this.options.onBlur || null
  };
  this.frameFocusTracker = new FocusTracker/* FocusTracker */.$(focusTrackerConfig);
  this.frame.onclick = function (event) {
    var target = event.target; // || event.srcElement;

    onEvent(event);

    // prevent default submit action of buttons when editor is located
    // inside a form
    if (target.nodeName === 'BUTTON') {
      event.preventDefault();
    }
  };
  this.frame.oninput = onEvent;
  this.frame.onchange = onEvent;
  this.frame.onkeydown = onEvent;
  this.frame.onkeyup = onEvent;
  this.frame.oncut = onEvent;
  this.frame.onpaste = onEvent;
  this.frame.onmousedown = onEvent;
  this.frame.onmouseup = onEvent;
  this.frame.onmouseover = onEvent;
  this.frame.onmouseout = onEvent;
  // Note: focus and blur events do not propagate, therefore they defined
  // using an eventListener with useCapture=true
  // see http://www.quirksmode.org/blog/archives/2008/04/delegating_the.html
  (0,util.addEventListener)(this.frame, 'focus', onEvent, true);
  (0,util.addEventListener)(this.frame, 'blur', onEvent, true);
  this.frame.onfocusin = onEvent; // for IE
  this.frame.onfocusout = onEvent; // for IE

  if (this.options.mainMenuBar) {
    (0,util.addClassName)(this.contentOuter, 'has-main-menu-bar');

    // create menu
    this.menu = document.createElement('div');
    this.menu.className = 'jsoneditor-menu';
    this.frame.appendChild(this.menu);

    // create expand all button
    var expandAll = document.createElement('button');
    expandAll.type = 'button';
    expandAll.className = 'jsoneditor-expand-all';
    expandAll.title = (0,i18n/* translate */.Tl)('expandAll');
    expandAll.onclick = function () {
      editor.expandAll();
      if (typeof _this3.options.onExpand === 'function') {
        _this3.options.onExpand({
          path: [],
          isExpand: true,
          recursive: true
        });
      }
    };
    this.menu.appendChild(expandAll);

    // create collapse all button
    var collapseAll = document.createElement('button');
    collapseAll.type = 'button';
    collapseAll.title = (0,i18n/* translate */.Tl)('collapseAll');
    collapseAll.className = 'jsoneditor-collapse-all';
    collapseAll.onclick = function () {
      editor.collapseAll();
      if (typeof _this3.options.onExpand === 'function') {
        _this3.options.onExpand({
          path: [],
          isExpand: false,
          recursive: true
        });
      }
    };
    this.menu.appendChild(collapseAll);

    // create sort button
    if (this.options.enableSort) {
      var sort = document.createElement('button');
      sort.type = 'button';
      sort.className = 'jsoneditor-sort';
      sort.title = (0,i18n/* translate */.Tl)('sortTitleShort');
      sort.onclick = function () {
        editor.node.showSortModal();
      };
      this.menu.appendChild(sort);
    }

    // create transform button
    if (this.options.enableTransform) {
      var transform = document.createElement('button');
      transform.type = 'button';
      transform.title = (0,i18n/* translate */.Tl)('transformTitleShort');
      transform.className = 'jsoneditor-transform';
      transform.onclick = function () {
        editor.node.showTransformModal();
      };
      this.menu.appendChild(transform);
    }

    // create undo/redo buttons
    if (this.history) {
      // create undo button
      var undo = document.createElement('button');
      undo.type = 'button';
      undo.className = 'jsoneditor-undo jsoneditor-separator';
      undo.title = (0,i18n/* translate */.Tl)('undo');
      undo.onclick = function () {
        editor._onUndo();
      };
      this.menu.appendChild(undo);
      this.dom.undo = undo;

      // create redo button
      var redo = document.createElement('button');
      redo.type = 'button';
      redo.className = 'jsoneditor-redo';
      redo.title = (0,i18n/* translate */.Tl)('redo');
      redo.onclick = function () {
        editor._onRedo();
      };
      this.menu.appendChild(redo);
      this.dom.redo = redo;

      // register handler for onchange of history
      this.history.onChange = function () {
        undo.disabled = !editor.history.canUndo();
        redo.disabled = !editor.history.canRedo();
      };
      this.history.onChange();
    }

    // create mode box
    if (this.options && this.options.modes && this.options.modes.length) {
      var me = this;
      this.modeSwitcher = new ModeSwitcher/* ModeSwitcher */.n(this.menu, this.options.modes, this.options.mode, function onSwitch(mode) {
        // switch mode and restore focus
        try {
          me.setMode(mode);
          me.modeSwitcher.focus();
        } catch (err) {
          me._onError(err);
        }
      });
    }

    // create search box
    if (this.options.search) {
      this.searchBox = new SearchBox(this, this.menu);
    }
  }
  if (this.options.navigationBar) {
    // create second menu row for treepath
    this.navBar = document.createElement('div');
    this.navBar.className = 'jsoneditor-navigation-bar nav-bar-empty';
    this.frame.appendChild(this.navBar);
    this.treePath = new TreePath(this.navBar, this.getPopupAnchor());
    this.treePath.onSectionSelected(this._onTreePathSectionSelected.bind(this));
    this.treePath.onContextMenuItemSelected(this._onTreePathMenuItemSelected.bind(this));
  }
};

/**
 * Perform an undo action
 * @private
 */
treemode._onUndo = function () {
  if (this.history) {
    // undo last action
    this.history.undo();

    // fire change event
    this._onChange();
  }
};

/**
 * Perform a redo action
 * @private
 */
treemode._onRedo = function () {
  if (this.history) {
    // redo last action
    this.history.redo();

    // fire change event
    this._onChange();
  }
};

/**
 * Event handler
 * @param event
 * @private
 */
treemode._onEvent = function (event) {
  // don't process events when coming from the color picker
  if (Node.targetIsColorPicker(event.target)) {
    return;
  }
  var node = Node.getNodeFromTarget(event.target);
  if (event.type === 'keydown') {
    this._onKeyDown(event);
  }
  if (node && event.type === 'focus') {
    this.focusTarget = event.target;
    if (this.options.autocomplete && this.options.autocomplete.trigger === 'focus') {
      this._showAutoComplete(event.target);
    }
  }
  if (event.type === 'mousedown') {
    this._startDragDistance(event);
  }
  if (event.type === 'mousemove' || event.type === 'mouseup' || event.type === 'click') {
    this._updateDragDistance(event);
  }
  if (node && this.options && this.options.navigationBar && node && (event.type === 'keydown' || event.type === 'mousedown')) {
    // apply on next tick, right after the new key press is applied
    var me = this;
    setTimeout(function () {
      me._updateTreePath(node.getNodePath());
    });
  }
  if (node && node.selected) {
    if (event.type === 'click') {
      if (event.target === node.dom.menu) {
        this.showContextMenu(event.target);

        // stop propagation (else we will open the context menu of a single node)
        return;
      }

      // deselect a multi selection
      if (!event.hasMoved) {
        this.deselect();
      }
    }
    if (event.type === 'mousedown') {
      // drag multiple nodes
      Node.onDragStart(this.multiselection.nodes, event);
    }
  } else {
    // filter mouse events in the contents part of the editor (not the main menu)
    if (event.type === 'mousedown' && (0,util.hasParentNode)(event.target, this.content)) {
      this.deselect();
      if (node && event.target === node.dom.drag) {
        // drag a singe node
        Node.onDragStart(node, event);
      } else if (!node || event.target !== node.dom.field && event.target !== node.dom.value && event.target !== node.dom.select) {
        // select multiple nodes
        this._onMultiSelectStart(event);
      }
    }
  }
  if (node) {
    node.onEvent(event);
  }
};

/**
 * Update TreePath components
 * @param {Array<Node>} pathNodes list of nodes in path from root to selection
 * @private
 */
treemode._updateTreePath = function (pathNodes) {
  if (pathNodes && pathNodes.length) {
    (0,util.removeClassName)(this.navBar, 'nav-bar-empty');
    var pathObjs = [];
    pathNodes.forEach(function (node) {
      var pathObj = {
        name: getName(node),
        node: node,
        children: []
      };
      if (node.childs && node.childs.length) {
        node.childs.forEach(function (childNode) {
          pathObj.children.push({
            name: getName(childNode),
            node: childNode
          });
        });
      }
      pathObjs.push(pathObj);
    });
    this.treePath.setPath(pathObjs);
  } else {
    (0,util.addClassName)(this.navBar, 'nav-bar-empty');
  }
  function getName(node) {
    return node.parent ? node.parent.type === 'array' ? node.index : node.field : node.field || node.type;
  }
};

/**
 * Callback for tree path section selection - focus the selected node in the tree
 * @param {Object} pathObj path object that was represents the selected section node
 * @private
 */
treemode._onTreePathSectionSelected = function (pathObj) {
  if (pathObj && pathObj.node) {
    pathObj.node.expandTo();
    pathObj.node.focus();
  }
};

/**
 * Callback for tree path menu item selection - rebuild the path accrding to the new selection and focus the selected node in the tree
 * @param {Object} pathObj path object that was represents the parent section node
 * @param {String} selection selected section child
 * @private
 */
treemode._onTreePathMenuItemSelected = function (pathObj, selection) {
  if (pathObj && pathObj.children.length) {
    var selectionObj = pathObj.children.find(function (obj) {
      return obj.name === selection;
    });
    if (selectionObj && selectionObj.node) {
      this._updateTreePath(selectionObj.node.getNodePath());
      selectionObj.node.expandTo();
      selectionObj.node.focus();
    }
  }
};
treemode._startDragDistance = function (event) {
  this.dragDistanceEvent = {
    initialTarget: event.target,
    initialPageX: event.pageX,
    initialPageY: event.pageY,
    dragDistance: 0,
    hasMoved: false
  };
};
treemode._updateDragDistance = function (event) {
  if (!this.dragDistanceEvent) {
    this._startDragDistance(event);
  }
  var diffX = event.pageX - this.dragDistanceEvent.initialPageX;
  var diffY = event.pageY - this.dragDistanceEvent.initialPageY;
  this.dragDistanceEvent.dragDistance = Math.sqrt(diffX * diffX + diffY * diffY);
  this.dragDistanceEvent.hasMoved = this.dragDistanceEvent.hasMoved || this.dragDistanceEvent.dragDistance > 10;
  event.dragDistance = this.dragDistanceEvent.dragDistance;
  event.hasMoved = this.dragDistanceEvent.hasMoved;
  return event.dragDistance;
};

/**
 * Start multi selection of nodes by dragging the mouse
 * @param {MouseEvent} event
 * @private
 */
treemode._onMultiSelectStart = function (event) {
  var node = Node.getNodeFromTarget(event.target);
  if (this.options.mode !== 'tree' || this.options.onEditable !== undefined) {
    // dragging not allowed in modes 'view' and 'form'
    // TODO: allow multiselection of items when option onEditable is specified
    return;
  }
  this.multiselection = {
    start: node || null,
    end: null,
    nodes: []
  };
  this._startDragDistance(event);
  var editor = this;
  if (!this.mousemove) {
    this.mousemove = (0,util.addEventListener)(event.view, 'mousemove', function (event) {
      editor._onMultiSelect(event);
    });
  }
  if (!this.mouseup) {
    this.mouseup = (0,util.addEventListener)(event.view, 'mouseup', function (event) {
      editor._onMultiSelectEnd(event);
    });
  }
  event.preventDefault();
};

/**
 * Multiselect nodes by dragging
 * @param {MouseEvent} event
 * @private
 */
treemode._onMultiSelect = function (event) {
  event.preventDefault();
  this._updateDragDistance(event);
  if (!event.hasMoved) {
    return;
  }
  var node = Node.getNodeFromTarget(event.target);
  if (node) {
    if (this.multiselection.start == null) {
      this.multiselection.start = node;
    }
    this.multiselection.end = node;
  }

  // deselect previous selection
  this.deselect();

  // find the selected nodes in the range from first to last
  var start = this.multiselection.start;
  var end = this.multiselection.end || this.multiselection.start;
  if (start && end) {
    // find the top level childs, all having the same parent
    this.multiselection.nodes = this._findTopLevelNodes(start, end);
    if (this.multiselection.nodes && this.multiselection.nodes.length) {
      var firstNode = this.multiselection.nodes[0];
      if (this.multiselection.start === firstNode || this.multiselection.start.isDescendantOf(firstNode)) {
        this.multiselection.direction = 'down';
      } else {
        this.multiselection.direction = 'up';
      }
    }
    this.select(this.multiselection.nodes);
  }
};

/**
 * End of multiselect nodes by dragging
 * @param {MouseEvent} event
 * @private
 */
treemode._onMultiSelectEnd = function (event) {
  // set focus to the context menu button of the first node
  var firstNode = this.multiselection.nodes[0];
  if (firstNode && firstNode.dom.menu) {
    firstNode.dom.menu.focus();
  }
  this.multiselection.start = null;
  this.multiselection.end = null;

  // cleanup global event listeners
  if (this.mousemove) {
    (0,util.removeEventListener)(event.view, 'mousemove', this.mousemove);
    delete this.mousemove;
  }
  if (this.mouseup) {
    (0,util.removeEventListener)(event.view, 'mouseup', this.mouseup);
    delete this.mouseup;
  }
};

/**
 * deselect currently selected nodes
 * @param {boolean} [clearStartAndEnd=false]  If true, the `start` and `end`
 *                                            state is cleared too.
 */
treemode.deselect = function (clearStartAndEnd) {
  var selectionChanged = !!this.multiselection.nodes.length;
  this.multiselection.nodes.forEach(function (node) {
    node.setSelected(false);
  });
  this.multiselection.nodes = [];
  if (clearStartAndEnd) {
    this.multiselection.start = null;
    this.multiselection.end = null;
  }
  if (selectionChanged) {
    if (this._selectionChangedHandler) {
      this._selectionChangedHandler();
    }
  }
};

/**
 * select nodes
 * @param {Node[] | Node} nodes
 */
treemode.select = function (nodes) {
  if (!Array.isArray(nodes)) {
    return this.select([nodes]);
  }
  if (nodes) {
    this.deselect();
    this.multiselection.nodes = nodes.slice(0);
    var first = nodes[0];
    nodes.forEach(function (node) {
      node.expandPathToNode();
      node.setSelected(true, node === first);
    });
    if (this._selectionChangedHandler) {
      var selection = this.getSelection();
      this._selectionChangedHandler(selection.start, selection.end);
    }
  }
};

/**
 * From two arbitrary selected nodes, find their shared parent node.
 * From that parent node, select the two child nodes in the brances going to
 * nodes `start` and `end`, and select all childs in between.
 * @param {Node} start
 * @param {Node} end
 * @return {Array.<Node>} Returns an ordered list with child nodes
 * @private
 */
treemode._findTopLevelNodes = function (start, end) {
  var startPath = start.getNodePath();
  var endPath = end.getNodePath();
  var i = 0;
  while (i < startPath.length && startPath[i] === endPath[i]) {
    i++;
  }
  var root = startPath[i - 1];
  var startChild = startPath[i];
  var endChild = endPath[i];
  if (!startChild || !endChild) {
    if (root.parent) {
      // startChild is a parent of endChild or vice versa
      startChild = root;
      endChild = root;
      root = root.parent;
    } else {
      // we have selected the root node (which doesn't have a parent)
      startChild = root.childs[0];
      endChild = root.childs[root.childs.length - 1];
    }
  }
  if (root && startChild && endChild) {
    var startIndex = root.childs.indexOf(startChild);
    var endIndex = root.childs.indexOf(endChild);
    var firstIndex = Math.min(startIndex, endIndex);
    var lastIndex = Math.max(startIndex, endIndex);
    return root.childs.slice(firstIndex, lastIndex + 1);
  } else {
    return [];
  }
};

/**
 * Show autocomplete menu
 * @param {HTMLElement} element
 * @private
 */
treemode._showAutoComplete = function (element) {
  var node = Node.getNodeFromTarget(element);
  var jsonElementType = '';
  if (element.className.indexOf('jsoneditor-value') >= 0) jsonElementType = 'value';
  if (element.className.indexOf('jsoneditor-field') >= 0) jsonElementType = 'field';
  if (jsonElementType === '') {
    // Unknown element field. Could be a button or something else
    return;
  }
  var self = this;
  setTimeout(function () {
    if (node && (self.options.autocomplete.trigger === 'focus' || element.innerText.length > 0)) {
      var result = self.options.autocomplete.getOptions(element.innerText, node.getPath(), jsonElementType, node.editor);
      if (result === null) {
        self.autocomplete.hideDropDown();
      } else if (typeof result.then === 'function') {
        // probably a promise
        result.then(function (obj) {
          if (obj === null) {
            self.autocomplete.hideDropDown();
          } else if (obj.options) {
            self.autocomplete.show(element, obj.startFrom, obj.options);
          } else {
            self.autocomplete.show(element, 0, obj);
          }
        })["catch"](function (err) {
          console.error(err);
        });
      } else {
        // definitely not a promise
        if (result.options) {
          self.autocomplete.show(element, result.startFrom, result.options);
        } else {
          self.autocomplete.show(element, 0, result);
        }
      }
    } else {
      self.autocomplete.hideDropDown();
    }
  }, 50);
};

/**
 * Event handler for keydown. Handles shortcut keys
 * @param {Event} event
 * @private
 */
treemode._onKeyDown = function (event) {
  var keynum = event.which || event.keyCode;
  var altKey = event.altKey;
  var ctrlKey = event.ctrlKey;
  var metaKey = event.metaKey;
  var shiftKey = event.shiftKey;
  var handled = false;
  var currentTarget = this.focusTarget;
  if (keynum === 9) {
    // Tab or Shift+Tab
    var me = this;
    setTimeout(function () {
      /*
          - Checking for change in focusTarget
          - Without the check,
            pressing tab after reaching the final DOM element in the editor will
            set the focus back to it than passing focus outside the editor
      */
      if (me.focusTarget !== currentTarget) {
        // select all text when moving focus to an editable div
        (0,util.selectContentEditable)(me.focusTarget);
      }
    }, 0);
  }
  if (this.searchBox) {
    if (ctrlKey && keynum === 70) {
      // Ctrl+F
      this.searchBox.dom.search.focus();
      this.searchBox.dom.search.select();
      handled = true;
    } else if (keynum === 114 || ctrlKey && keynum === 71) {
      // F3 or Ctrl+G
      var focus = true;
      if (!shiftKey) {
        // select next search result (F3 or Ctrl+G)
        this.searchBox.next(focus);
      } else {
        // select previous search result (Shift+F3 or Ctrl+Shift+G)
        this.searchBox.previous(focus);
      }
      handled = true;
    }
  }
  if (this.history) {
    if (ctrlKey && !shiftKey && keynum === 90) {
      // Ctrl+Z
      // undo
      this._onUndo();
      handled = true;
    } else if (ctrlKey && shiftKey && keynum === 90) {
      // Ctrl+Shift+Z
      // redo
      this._onRedo();
      handled = true;
    }
  }
  if (this.options.autocomplete && !handled) {
    if (!ctrlKey && !altKey && !metaKey && (event.key.length === 1 || keynum === 8 || keynum === 46)) {
      handled = false;
      // Activate autocomplete
      this._showAutoComplete(event.target);
    }
  }
  if (handled) {
    event.preventDefault();
    event.stopPropagation();
  }
};

/**
 * Create main table
 * @private
 */
treemode._createTable = function () {
  if (this.options.navigationBar) {
    (0,util.addClassName)(this.contentOuter, 'has-nav-bar');
  }
  this.scrollableContent = document.createElement('div');
  this.scrollableContent.className = 'jsoneditor-tree';
  this.contentOuter.appendChild(this.scrollableContent);

  // the jsoneditor-tree-inner div with bottom padding is here to
  // keep space for the action menu dropdown. It's created as a
  // separate div instead of using scrollableContent to work around
  // and issue in the Chrome browser showing scrollable contents outside of the div
  // see https://github.com/josdejong/jsoneditor/issues/557
  this.content = document.createElement('div');
  this.content.className = 'jsoneditor-tree-inner';
  this.scrollableContent.appendChild(this.content);
  this.table = document.createElement('table');
  this.table.className = 'jsoneditor-tree';
  this.content.appendChild(this.table);

  // create colgroup where the first two columns don't have a fixed
  // width, and the edit columns do have a fixed width
  var col;
  this.colgroupContent = document.createElement('colgroup');
  if (this.options.mode === 'tree') {
    col = document.createElement('col');
    col.width = '24px';
    this.colgroupContent.appendChild(col);
  }
  col = document.createElement('col');
  col.width = '24px';
  this.colgroupContent.appendChild(col);
  col = document.createElement('col');
  this.colgroupContent.appendChild(col);
  this.table.appendChild(this.colgroupContent);
  this.tbody = document.createElement('tbody');
  this.table.appendChild(this.tbody);
  this.frame.appendChild(this.contentOuter);
};

/**
 * Show a contextmenu for this node.
 * Used for multiselection
 * @param {HTMLElement} anchor   Anchor element to attach the context menu to.
 * @param {function} [onClose]   Callback method called when the context menu
 *                               is being closed.
 */
treemode.showContextMenu = function (anchor, onClose) {
  var items = [];
  var selectedNodes = this.multiselection.nodes.slice();

  // create duplicate button
  items.push({
    text: (0,i18n/* translate */.Tl)('duplicateText'),
    title: (0,i18n/* translate */.Tl)('duplicateTitle'),
    className: 'jsoneditor-duplicate',
    click: function click() {
      Node.onDuplicate(selectedNodes);
    }
  });

  // create remove button
  items.push({
    text: (0,i18n/* translate */.Tl)('remove'),
    title: (0,i18n/* translate */.Tl)('removeTitle'),
    className: 'jsoneditor-remove',
    click: function click() {
      Node.onRemove(selectedNodes);
    }
  });
  if (this.options.onCreateMenu) {
    var paths = selectedNodes.map(function (node) {
      return node.getPath();
    });
    items = this.options.onCreateMenu(items, {
      type: 'multiple',
      path: paths[0],
      paths: paths
    });
  }
  var menu = new ContextMenu/* ContextMenu */.t(items, {
    close: onClose
  });
  menu.show(anchor, this.getPopupAnchor());
};
treemode.getPopupAnchor = function () {
  return this.options.popupAnchor || this.frame;
};

/**
 * Get current selected nodes
 * @return {{start:SerializableNode, end: SerializableNode}}
 */
treemode.getSelection = function () {
  var selection = {
    start: null,
    end: null
  };
  if (this.multiselection.nodes && this.multiselection.nodes.length) {
    if (this.multiselection.nodes.length) {
      var selection1 = this.multiselection.nodes[0];
      var selection2 = this.multiselection.nodes[this.multiselection.nodes.length - 1];
      if (this.multiselection.direction === 'down') {
        selection.start = selection1.serialize();
        selection.end = selection2.serialize();
      } else {
        selection.start = selection2.serialize();
        selection.end = selection1.serialize();
      }
    }
  }
  return selection;
};

/**
 * Callback registration for selection change
 * @param {selectionCallback} callback
 *
 * @callback selectionCallback
 */
treemode.onSelectionChange = function (callback) {
  if (typeof callback === 'function') {
    this._selectionChangedHandler = (0,util.debounce)(callback, this.DEBOUNCE_INTERVAL);
  }
};

/**
 * Select range of nodes.
 * For selecting single node send only the start parameter
 * For clear the selection do not send any parameter
 * If the nodes are not from the same level the first common parent will be selected
 * @param {{path: Array.<String>}} start object contains the path for selection start
 * @param {{path: Array.<String>}} end object contains the path for selection end
 */
treemode.setSelection = function (start, end) {
  // check for old usage
  if (start && start.dom && start.range) {
    console.warn('setSelection/getSelection usage for text selection is deprecated and should not be used, see documentation for supported selection options');
    this.setDomSelection(start);
  }
  var nodes = this._getNodeInstancesByRange(start, end);
  nodes.forEach(function (node) {
    node.expandTo();
  });
  this.select(nodes);
};

/**
 * Returns a set of Nodes according to a range of selection
 * @param {{path: Array.<String>}} start object contains the path for range start
 * @param {{path: Array.<String>}=} end object contains the path for range end
 * @return {Array.<Node>} Node instances on the given range
 * @private
 */
treemode._getNodeInstancesByRange = function (start, end) {
  var startNode, endNode;
  if (start && start.path) {
    startNode = this.node.findNodeByPath(start.path);
    if (end && end.path) {
      endNode = this.node.findNodeByPath(end.path);
    }
  }
  var nodes = [];
  if (startNode instanceof Node) {
    if (endNode instanceof Node && endNode !== startNode) {
      if (startNode.parent === endNode.parent) {
        if (startNode.getIndex() < endNode.getIndex()) {
          start = startNode;
          end = endNode;
        } else {
          start = endNode;
          end = startNode;
        }
        var current = start;
        nodes.push(current);
        do {
          current = current.nextSibling();
          nodes.push(current);
        } while (current && current !== end);
      } else {
        nodes = this._findTopLevelNodes(startNode, endNode);
      }
    } else {
      nodes.push(startNode);
    }
  }
  return nodes;
};
treemode.getNodesByRange = function (start, end) {
  var nodes = this._getNodeInstancesByRange(start, end);
  var serializableNodes = [];
  nodes.forEach(function (node) {
    serializableNodes.push(node.serialize());
  });
  return serializableNodes;
};

// define modes
var treeModeMixins = [{
  mode: 'tree',
  mixin: treemode,
  data: 'json'
}, {
  mode: 'view',
  mixin: treemode,
  data: 'json'
}, {
  mode: 'form',
  mixin: treemode,
  data: 'json'
}];

/***/ }),

/***/ 870:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

exports.tryRequireAjv = function () {
  try {
    return __webpack_require__(Object(function webpackMissingModule() { var e = new Error("Cannot find module 'ajv'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
  } catch (err) {
    // no problem... when we need Ajv we will throw a neat exception
  }
};

/***/ }),

/***/ 467:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

exports.J = function () {
  try {
    __webpack_require__(762);
  } catch (err) {
    console.error(err);
  }
};

/***/ }),

/***/ 237:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   addClassName: function() { return /* binding */ addClassName; },
/* harmony export */   addEventListener: function() { return /* binding */ addEventListener; },
/* harmony export */   asyncExec: function() { return /* binding */ asyncExec; },
/* harmony export */   clear: function() { return /* binding */ clear; },
/* harmony export */   compileJSONPointer: function() { return /* binding */ compileJSONPointer; },
/* harmony export */   contains: function() { return /* binding */ contains; },
/* harmony export */   debounce: function() { return /* binding */ debounce; },
/* harmony export */   escapeUnicodeChars: function() { return /* binding */ escapeUnicodeChars; },
/* harmony export */   extend: function() { return /* binding */ extend; },
/* harmony export */   findUniqueName: function() { return /* binding */ findUniqueName; },
/* harmony export */   formatSize: function() { return /* binding */ formatSize; },
/* harmony export */   get: function() { return /* binding */ get; },
/* harmony export */   getAbsoluteLeft: function() { return /* binding */ getAbsoluteLeft; },
/* harmony export */   getAbsoluteTop: function() { return /* binding */ getAbsoluteTop; },
/* harmony export */   getChildPaths: function() { return /* binding */ getChildPaths; },
/* harmony export */   getColorCSS: function() { return /* binding */ getColorCSS; },
/* harmony export */   getIndexForPosition: function() { return /* binding */ getIndexForPosition; },
/* harmony export */   getInnerText: function() { return /* binding */ getInnerText; },
/* harmony export */   getInputSelection: function() { return /* binding */ getInputSelection; },
/* harmony export */   getInternetExplorerVersion: function() { return /* binding */ getInternetExplorerVersion; },
/* harmony export */   getPositionForPath: function() { return /* binding */ getPositionForPath; },
/* harmony export */   getSelection: function() { return /* binding */ getSelection; },
/* harmony export */   getSelectionOffset: function() { return /* binding */ getSelectionOffset; },
/* harmony export */   getType: function() { return /* binding */ getType; },
/* harmony export */   getWindow: function() { return /* binding */ getWindow; },
/* harmony export */   hasParentNode: function() { return /* binding */ hasParentNode; },
/* harmony export */   improveSchemaError: function() { return /* binding */ improveSchemaError; },
/* harmony export */   insideRect: function() { return /* binding */ insideRect; },
/* harmony export */   isArray: function() { return /* binding */ isArray; },
/* harmony export */   isChildOf: function() { return /* binding */ isChildOf; },
/* harmony export */   isFirefox: function() { return /* binding */ isFirefox; },
/* harmony export */   isObject: function() { return /* binding */ isObject; },
/* harmony export */   isPromise: function() { return /* binding */ isPromise; },
/* harmony export */   isTimestamp: function() { return /* binding */ isTimestamp; },
/* harmony export */   isUrl: function() { return /* binding */ isUrl; },
/* harmony export */   isValidColor: function() { return /* binding */ isValidColor; },
/* harmony export */   isValidValidationError: function() { return /* binding */ isValidValidationError; },
/* harmony export */   isValidationErrorChanged: function() { return /* binding */ isValidationErrorChanged; },
/* harmony export */   limitCharacters: function() { return /* binding */ limitCharacters; },
/* harmony export */   makeFieldTooltip: function() { return /* binding */ makeFieldTooltip; },
/* harmony export */   parse: function() { return /* binding */ parse; },
/* harmony export */   parsePath: function() { return /* binding */ parsePath; },
/* harmony export */   parseString: function() { return /* binding */ parseString; },
/* harmony export */   removeAllClassNames: function() { return /* binding */ removeAllClassNames; },
/* harmony export */   removeClassName: function() { return /* binding */ removeClassName; },
/* harmony export */   removeEventListener: function() { return /* binding */ removeEventListener; },
/* harmony export */   removeReturnsAndSurroundingWhitespace: function() { return /* binding */ removeReturnsAndSurroundingWhitespace; },
/* harmony export */   selectContentEditable: function() { return /* binding */ selectContentEditable; },
/* harmony export */   setEndOfContentEditable: function() { return /* binding */ setEndOfContentEditable; },
/* harmony export */   setSelection: function() { return /* binding */ setSelection; },
/* harmony export */   setSelectionOffset: function() { return /* binding */ setSelectionOffset; },
/* harmony export */   sort: function() { return /* binding */ sort; },
/* harmony export */   sortObjectKeys: function() { return /* binding */ sortObjectKeys; },
/* harmony export */   stringifyPath: function() { return /* binding */ stringifyPath; },
/* harmony export */   stripFormatting: function() { return /* binding */ stripFormatting; },
/* harmony export */   textDiff: function() { return /* binding */ textDiff; },
/* harmony export */   tryJsonRepair: function() { return /* binding */ tryJsonRepair; },
/* harmony export */   uniqueMergeArrays: function() { return /* binding */ uniqueMergeArrays; },
/* harmony export */   validate: function() { return /* binding */ validate; }
/* harmony export */ });
/* harmony import */ var _polyfills__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(81);
/* harmony import */ var _polyfills__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_polyfills__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var javascript_natural_sort__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(342);
/* harmony import */ var javascript_natural_sort__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(javascript_natural_sort__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var jsonrepair__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(857);
/* harmony import */ var _assets_jsonlint_jsonlint__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(736);
/* harmony import */ var json_source_map__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(94);
/* harmony import */ var _i18n__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(57);


function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }






var MAX_ITEMS_FIELDS_COLLECTION = 10000;
var YEAR_2000 = 946684800000;

/**
 * Parse JSON using the parser built-in in the browser.
 * On exception, the jsonString is validated and a detailed error is thrown.
 * @param {String} jsonString
 * @return {JSON} json
 */
function parse(jsonString) {
  try {
    return JSON.parse(jsonString);
  } catch (err) {
    // try to throw a more detailed error message using validate
    validate(jsonString);

    // rethrow the original error
    throw err;
  }
}

/**
 * Try to fix the JSON string. If not successful, return the original string
 * @param {string} jsonString
 */
function tryJsonRepair(jsonString) {
  try {
    return (0,jsonrepair__WEBPACK_IMPORTED_MODULE_5__/* .jsonrepair */ .m)(jsonString);
  } catch (err) {
    // repair was not successful, return original text
    return jsonString;
  }
}

/**
 * Escape unicode characters.
 * For example input '\u2661' (length 1) will output '\\u2661' (length 5).
 * @param {string} text
 * @return {string}
 */
function escapeUnicodeChars(
// see https://www.wikiwand.com/en/UTF-16
text) {
  return (
    // note: we leave surrogate pairs as two individual chars,
    // as JSON doesn't interpret them as a single unicode char.
    text.replace(/[\u007F-\uFFFF]/g, function (c) {
      return "\\u" + ('0000' + c.charCodeAt(0).toString(16)).slice(-4);
    })
  );
}

/**
 * Validate a string containing a JSON object
 * This method uses JSONLint to validate the String. If JSONLint is not
 * available, the built-in JSON parser of the browser is used.
 * @param {String} jsonString   String with an (invalid) JSON object
 * @throws Error
 */
function validate(jsonString) {
  if (typeof _assets_jsonlint_jsonlint__WEBPACK_IMPORTED_MODULE_2__ !== 'undefined') {
    _assets_jsonlint_jsonlint__WEBPACK_IMPORTED_MODULE_2__.parse(jsonString);
  } else {
    JSON.parse(jsonString);
  }
}

/**
 * Extend object a with the properties of object b
 * @param {Object} a
 * @param {Object} b
 * @return {Object} a
 */
function extend(a, b) {
  for (var prop in b) {
    if (hasOwnProperty(b, prop)) {
      a[prop] = b[prop];
    }
  }
  return a;
}

/**
 * Remove all properties from object a
 * @param {Object} a
 * @return {Object} a
 */
function clear(a) {
  for (var prop in a) {
    if (hasOwnProperty(a, prop)) {
      delete a[prop];
    }
  }
  return a;
}

/**
 * Get the type of an object
 * @param {*} object
 * @return {String} type
 */
function getType(object) {
  if (object === null) {
    return 'null';
  }
  if (object === undefined) {
    return 'undefined';
  }
  if (object instanceof Number || typeof object === 'number') {
    return 'number';
  }
  if (object instanceof String || typeof object === 'string') {
    return 'string';
  }
  if (object instanceof Boolean || typeof object === 'boolean') {
    return 'boolean';
  }
  if (object instanceof RegExp) {
    return 'regexp';
  }
  if (isArray(object)) {
    return 'array';
  }
  return 'object';
}

/**
 * Test whether a text contains a url (matches when a string starts
 * with 'http://*' or 'https://*' and has no whitespace characters)
 * @param {String} text
 */
var isUrlRegex = /^https?:\/\/\S+$/;
function isUrl(text) {
  return (typeof text === 'string' || text instanceof String) && isUrlRegex.test(text);
}

/**
 * Tes whether given object is an Array
 * @param {*} obj
 * @returns {boolean} returns true when obj is an array
 */
function isArray(obj) {
  return Object.prototype.toString.call(obj) === '[object Array]';
}

/**
 * Gets a DOM element's Window.  This is normally just the global `window`
 * variable, but if we opened a child window, it may be different.
 * @param {HTMLElement} element
 * @return {Window}
 */
function getWindow(element) {
  return element.ownerDocument.defaultView;
}

/**
 * Retrieve the absolute left value of a DOM element
 * @param {Element} elem    A dom element, for example a div
 * @return {Number} left    The absolute left position of this element
 *                          in the browser page.
 */
function getAbsoluteLeft(elem) {
  var rect = elem.getBoundingClientRect();
  return rect.left + window.pageXOffset || document.scrollLeft || 0;
}

/**
 * Retrieve the absolute top value of a DOM element
 * @param {Element} elem    A dom element, for example a div
 * @return {Number} top     The absolute top position of this element
 *                          in the browser page.
 */
function getAbsoluteTop(elem) {
  var rect = elem.getBoundingClientRect();
  return rect.top + window.pageYOffset || document.scrollTop || 0;
}

/**
 * add a className to the given elements style
 * @param {Element} elem
 * @param {String} className
 */
function addClassName(elem, className) {
  var classes = elem.className.split(' ');
  if (classes.indexOf(className) === -1) {
    classes.push(className); // add the class to the array
    elem.className = classes.join(' ');
  }
}

/**
 * remove all classes from the given elements style
 * @param {Element} elem
 */
function removeAllClassNames(elem) {
  elem.className = '';
}

/**
 * add a className to the given elements style
 * @param {Element} elem
 * @param {String} className
 */
function removeClassName(elem, className) {
  var classes = elem.className.split(' ');
  var index = classes.indexOf(className);
  if (index !== -1) {
    classes.splice(index, 1); // remove the class from the array
    elem.className = classes.join(' ');
  }
}

/**
 * Strip the formatting from the contents of a div
 * the formatting from the div itself is not stripped, only from its childs.
 * @param {Element} divElement
 */
function stripFormatting(divElement) {
  var childs = divElement.childNodes;
  for (var i = 0, iMax = childs.length; i < iMax; i++) {
    var child = childs[i];

    // remove the style
    if (child.style) {
      // TODO: test if child.attributes does contain style
      child.removeAttribute('style');
    }

    // remove all attributes
    var attributes = child.attributes;
    if (attributes) {
      for (var j = attributes.length - 1; j >= 0; j--) {
        var attribute = attributes[j];
        if (attribute.specified === true) {
          child.removeAttribute(attribute.name);
        }
      }
    }

    // recursively strip childs
    stripFormatting(child);
  }
}

/**
 * Set focus to the end of an editable div
 * code from Nico Burns
 * http://stackoverflow.com/users/140293/nico-burns
 * http://stackoverflow.com/questions/1125292/how-to-move-cursor-to-end-of-contenteditable-entity
 * @param {Element} contentEditableElement   A content editable div
 */
function setEndOfContentEditable(contentEditableElement) {
  var range, selection;
  if (document.createRange) {
    range = document.createRange(); // Create a range (a range is a like the selection but invisible)
    range.selectNodeContents(contentEditableElement); // Select the entire contents of the element with the range
    range.collapse(false); // collapse the range to the end point. false means collapse to end rather than the start
    selection = window.getSelection(); // get the selection object (allows you to change selection)
    selection.removeAllRanges(); // remove any selections already made
    selection.addRange(range); // make the range you have just created the visible selection
  }
}

/**
 * Select all text of a content editable div.
 * http://stackoverflow.com/a/3806004/1262753
 * @param {Element} contentEditableElement   A content editable div
 */
function selectContentEditable(contentEditableElement) {
  if (!contentEditableElement || contentEditableElement.nodeName !== 'DIV') {
    return;
  }
  var sel, range;
  if (window.getSelection && document.createRange) {
    range = document.createRange();
    range.selectNodeContents(contentEditableElement);
    sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
  }
}

/**
 * Get text selection
 * http://stackoverflow.com/questions/4687808/contenteditable-selected-text-save-and-restore
 * @return {Range | TextRange | null} range
 */
function getSelection() {
  if (window.getSelection) {
    var sel = window.getSelection();
    if (sel.getRangeAt && sel.rangeCount) {
      return sel.getRangeAt(0);
    }
  }
  return null;
}

/**
 * Set text selection
 * http://stackoverflow.com/questions/4687808/contenteditable-selected-text-save-and-restore
 * @param {Range | TextRange | null} range
 */
function setSelection(range) {
  if (range) {
    if (window.getSelection) {
      var sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
    }
  }
}

/**
 * Get selected text range
 * @return {Object} params  object containing parameters:
 *                              {Number}  startOffset
 *                              {Number}  endOffset
 *                              {Element} container  HTML element holding the
 *                                                   selected text element
 *                          Returns null if no text selection is found
 */
function getSelectionOffset() {
  var range = getSelection();
  if (range && 'startOffset' in range && 'endOffset' in range && range.startContainer && range.startContainer === range.endContainer) {
    return {
      startOffset: range.startOffset,
      endOffset: range.endOffset,
      container: range.startContainer.parentNode
    };
  }
  return null;
}

/**
 * Set selected text range in given element
 * @param {Object} params   An object containing:
 *                              {Element} container
 *                              {Number} startOffset
 *                              {Number} endOffset
 */
function setSelectionOffset(params) {
  if (document.createRange && window.getSelection) {
    var selection = window.getSelection();
    if (selection) {
      var range = document.createRange();
      if (!params.container.firstChild) {
        params.container.appendChild(document.createTextNode(''));
      }

      // TODO: do not suppose that the first child of the container is a textnode,
      //       but recursively find the textnodes
      range.setStart(params.container.firstChild, params.startOffset);
      range.setEnd(params.container.firstChild, params.endOffset);
      setSelection(range);
    }
  }
}
/**
 * Get the inner text of an HTML element (for example a div element)
 * @param {Element} element
 * @param {Object} [buffer]
 * @return {String} innerText
 */
function getInnerText(element, buffer) {
  var first = buffer === undefined;
  if (first) {
    buffer = {
      _text: '',
      flush: function flush() {
        var text = this._text;
        this._text = '';
        return text;
      },
      set: function set(text) {
        this._text = text;
      }
    };
  }

  // text node
  if (element.nodeValue) {
    // remove return characters and the whitespaces surrounding those return characters
    var trimmedValue = removeReturnsAndSurroundingWhitespace(element.nodeValue);
    if (trimmedValue !== '') {
      return buffer.flush() + trimmedValue;
    } else {
      // ignore empty text
      return '';
    }
  }

  // divs or other HTML elements
  if (element.hasChildNodes()) {
    var childNodes = element.childNodes;
    var innerText = '';
    for (var i = 0, iMax = childNodes.length; i < iMax; i++) {
      var child = childNodes[i];
      if (child.nodeName === 'DIV' || child.nodeName === 'P') {
        var prevChild = childNodes[i - 1];
        var prevName = prevChild ? prevChild.nodeName : undefined;
        if (prevName && prevName !== 'DIV' && prevName !== 'P' && prevName !== 'BR') {
          if (innerText !== '') {
            innerText += '\n';
          }
          buffer.flush();
        }
        innerText += getInnerText(child, buffer);
        buffer.set('\n');
      } else if (child.nodeName === 'BR') {
        innerText += buffer.flush();
        buffer.set('\n');
      } else {
        innerText += getInnerText(child, buffer);
      }
    }
    return innerText;
  }

  // br or unknown
  return '';
}

// regular expression matching one or multiple return characters with all their
// enclosing white spaces
function removeReturnsAndSurroundingWhitespace(text) {
  return text.replace(/(\b|^)\s*(\b|$)/g, function (match) {
    return /\n/.exec(match) ? '' : match;
  });
}

/**
 * Test whether an element has the provided parent node somewhere up the node tree.
 * @param {Element} elem
 * @param {Element} parent
 * @return {boolean}
 */
function hasParentNode(elem, parent) {
  var e = elem ? elem.parentNode : undefined;
  while (e) {
    if (e === parent) {
      return true;
    }
    e = e.parentNode;
  }
  return false;
}

/**
 * Returns the version of Internet Explorer or a -1
 * (indicating the use of another browser).
 * Source: http://msdn.microsoft.com/en-us/library/ms537509(v=vs.85).aspx
 * @return {Number} Internet Explorer version, or -1 in case of an other browser
 */
function getInternetExplorerVersion() {
  if (_ieVersion === -1) {
    var rv = -1; // Return value assumes failure.
    if (typeof navigator !== 'undefined' && navigator.appName === 'Microsoft Internet Explorer') {
      var ua = navigator.userAgent;
      var re = /MSIE ([0-9]+[.0-9]+)/;
      if (re.exec(ua) != null) {
        rv = parseFloat(RegExp.$1);
      }
    }
    _ieVersion = rv;
  }
  return _ieVersion;
}

/**
 * cached internet explorer version
 * @type {Number}
 * @private
 */
var _ieVersion = -1;

/**
 * Test whether the current browser is Firefox
 * @returns {boolean} isFirefox
 */
function isFirefox() {
  return typeof navigator !== 'undefined' && navigator.userAgent.indexOf('Firefox') !== -1;
}

/**
 * Add an event listener. Works for all browsers
 * @param {Element}     element    An html element
 * @param {string}      action     The action, for example "click",
 *                                 without the prefix "on"
 * @param {function}    listener   The callback function to be executed
 * @param {boolean}     [useCapture] false by default
 * @return {function}   the created event listener
 */
function addEventListener(element, action, listener, useCapture) {
  if (element.addEventListener) {
    if (useCapture === undefined) {
      useCapture = false;
    }
    if (action === 'mousewheel' && isFirefox()) {
      action = 'DOMMouseScroll'; // For Firefox
    }
    element.addEventListener(action, listener, useCapture);
    return listener;
  } else if (element.attachEvent) {
    // Old IE browsers
    var f = function f() {
      return listener.call(element, window.event);
    };
    element.attachEvent('on' + action, f);
    return f;
  }
}

/**
 * Remove an event listener from an element
 * @param {Element}  element   An html dom element
 * @param {string}   action    The name of the event, for example "mousedown"
 * @param {function} listener  The listener function
 * @param {boolean}  [useCapture]   false by default
 */
function removeEventListener(element, action, listener, useCapture) {
  if (element.removeEventListener) {
    if (useCapture === undefined) {
      useCapture = false;
    }
    if (action === 'mousewheel' && isFirefox()) {
      action = 'DOMMouseScroll'; // For Firefox
    }
    element.removeEventListener(action, listener, useCapture);
  } else if (element.detachEvent) {
    // Old IE browsers
    element.detachEvent('on' + action, listener);
  }
}

/**
 * Test if an element is a child of a parent element.
 * @param {Element} elem
 * @param {Element} parent
 * @return {boolean} returns true if elem is a child of the parent
 */
function isChildOf(elem, parent) {
  var e = elem.parentNode;
  while (e) {
    if (e === parent) {
      return true;
    }
    e = e.parentNode;
  }
  return false;
}

/**
 * Parse a JSON path like '.items[3].name' into an array
 * @param {string} jsonPath
 * @return {Array}
 */
function parsePath(jsonPath) {
  var path = [];
  var i = 0;
  function parseProperty() {
    var prop = '';
    while (jsonPath[i] !== undefined && /[\w$]/.test(jsonPath[i])) {
      prop += jsonPath[i];
      i++;
    }
    if (prop === '') {
      throw new Error('Invalid JSON path: property name expected at index ' + i);
    }
    return prop;
  }
  function parseIndex(end) {
    var name = '';
    while (jsonPath[i] !== undefined && jsonPath[i] !== end) {
      name += jsonPath[i];
      i++;
    }
    if (jsonPath[i] !== end) {
      throw new Error('Invalid JSON path: unexpected end, character ' + end + ' expected');
    }
    return name;
  }
  while (jsonPath[i] !== undefined) {
    if (jsonPath[i] === '.') {
      i++;
      path.push(parseProperty());
    } else if (jsonPath[i] === '[') {
      i++;
      if (jsonPath[i] === '\'' || jsonPath[i] === '"') {
        var end = jsonPath[i];
        i++;
        path.push(parseIndex(end));
        if (jsonPath[i] !== end) {
          throw new Error('Invalid JSON path: closing quote \' expected at index ' + i);
        }
        i++;
      } else {
        var index = parseIndex(']').trim();
        if (index.length === 0) {
          throw new Error('Invalid JSON path: array value expected at index ' + i);
        }
        // Coerce numeric indices to numbers, but ignore star
        index = index === '*' ? index : JSON.parse(index);
        path.push(index);
      }
      if (jsonPath[i] !== ']') {
        throw new Error('Invalid JSON path: closing bracket ] expected at index ' + i);
      }
      i++;
    } else {
      throw new Error('Invalid JSON path: unexpected character "' + jsonPath[i] + '" at index ' + i);
    }
  }
  return path;
}

/**
 * Stringify an array with a path in a JSON path like '.items[3].name'
 * @param {Array.<string | number>} path
 * @returns {string}
 */
function stringifyPath(path) {
  return path.map(function (p) {
    if (typeof p === 'number') {
      return '[' + p + ']';
    } else if (typeof p === 'string' && p.match(/^[A-Za-z0-9_$]+$/)) {
      return '.' + p;
    } else {
      return '["' + p + '"]';
    }
  }).join('');
}

/**
 * Improve the error message of a JSON schema error
 * @param {Object} error
 * @return {Object} The error
 */
function improveSchemaError(error) {
  if (error.keyword === 'enum' && Array.isArray(error.schema)) {
    var enums = error.schema;
    if (enums) {
      enums = enums.map(function (value) {
        return JSON.stringify(value);
      });
      if (enums.length > 5) {
        var more = ['(' + (enums.length - 5) + ' more...)'];
        enums = enums.slice(0, 5);
        enums.push(more);
      }
      error.message = 'should be equal to one of: ' + enums.join(', ');
    }
  }
  if (error.keyword === 'additionalProperties') {
    error.message = 'should NOT have additional property: ' + error.params.additionalProperty;
  }
  return error;
}

/**
 * Test whether something is a Promise
 * @param {*} object
 * @returns {boolean} Returns true when object is a promise, false otherwise
 */
function isPromise(object) {
  return object && typeof object.then === 'function' && typeof object["catch"] === 'function';
}

/**
 * Test whether a custom validation error has the correct structure
 * @param {*} validationError The error to be checked.
 * @returns {boolean} Returns true if the structure is ok, false otherwise
 */
function isValidValidationError(validationError) {
  return _typeof(validationError) === 'object' && Array.isArray(validationError.path) && typeof validationError.message === 'string';
}

/**
 * Test whether the child rect fits completely inside the parent rect.
 * @param {ClientRect} parent
 * @param {ClientRect} child
 * @param {number} margin
 */
function insideRect(parent, child, margin) {
  var _margin = margin !== undefined ? margin : 0;
  return child.left - _margin >= parent.left && child.right + _margin <= parent.right && child.top - _margin >= parent.top && child.bottom + _margin <= parent.bottom;
}

/**
 * Returns a function, that, as long as it continues to be invoked, will not
 * be triggered. The function will be called after it stops being called for
 * N milliseconds.
 *
 * Source: https://davidwalsh.name/javascript-debounce-function
 *
 * @param {function} func
 * @param {number} wait                 Number in milliseconds
 * @param {boolean} [immediate=false]   If `immediate` is passed, trigger the
 *                                      function on the leading edge, instead
 *                                      of the trailing.
 * @return {function} Return the debounced function
 */
function debounce(func, wait, immediate) {
  var timeout;
  return function () {
    var context = this;
    var args = arguments;
    var later = function later() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

/**
 * Determines the difference between two texts.
 * Can only detect one removed or inserted block of characters.
 * @param {string} oldText
 * @param {string} newText
 * @return {{start: number, end: number}} Returns the start and end
 *                                        of the changed part in newText.
 */
function textDiff(oldText, newText) {
  var len = newText.length;
  var start = 0;
  var oldEnd = oldText.length;
  var newEnd = newText.length;
  while (newText.charAt(start) === oldText.charAt(start) && start < len) {
    start++;
  }
  while (newText.charAt(newEnd - 1) === oldText.charAt(oldEnd - 1) && newEnd > start && oldEnd > 0) {
    newEnd--;
    oldEnd--;
  }
  return {
    start: start,
    end: newEnd
  };
}

/**
 * Return an object with the selection range or cursor position (if both have the same value)
 * Support also old browsers (IE8-)
 * Source: http://ourcodeworld.com/articles/read/282/how-to-get-the-current-cursor-position-and-selection-within-a-text-input-or-textarea-in-javascript
 * @param {DOMElement} el A dom element of a textarea or input text.
 * @return {Object} reference Object with 2 properties (start and end) with the identifier of the location of the cursor and selected text.
 **/
function getInputSelection(el) {
  var startIndex = 0;
  var endIndex = 0;
  var normalizedValue;
  var range;
  var textInputRange;
  var len;
  var endRange;
  if (typeof el.selectionStart === 'number' && typeof el.selectionEnd === 'number') {
    startIndex = el.selectionStart;
    endIndex = el.selectionEnd;
  } else {
    range = document.selection.createRange();
    if (range && range.parentElement() === el) {
      len = el.value.length;
      normalizedValue = el.value.replace(/\r\n/g, '\n');

      // Create a working TextRange that lives only in the input
      textInputRange = el.createTextRange();
      textInputRange.moveToBookmark(range.getBookmark());

      // Check if the startIndex and endIndex of the selection are at the very end
      // of the input, since moveStart/moveEnd doesn't return what we want
      // in those cases
      endRange = el.createTextRange();
      endRange.collapse(false);
      if (textInputRange.compareEndPoints('StartToEnd', endRange) > -1) {
        startIndex = endIndex = len;
      } else {
        startIndex = -textInputRange.moveStart('character', -len);
        startIndex += normalizedValue.slice(0, startIndex).split('\n').length - 1;
        if (textInputRange.compareEndPoints('EndToEnd', endRange) > -1) {
          endIndex = len;
        } else {
          endIndex = -textInputRange.moveEnd('character', -len);
          endIndex += normalizedValue.slice(0, endIndex).split('\n').length - 1;
        }
      }
    }
  }
  return {
    startIndex: startIndex,
    endIndex: endIndex,
    start: _positionForIndex(startIndex),
    end: _positionForIndex(endIndex)
  };

  /**
   * Returns textarea row and column position for certain index
   * @param {Number} index text index
   * @returns {{row: Number, column: Number}}
   */
  function _positionForIndex(index) {
    var textTillIndex = el.value.substring(0, index);
    var row = (textTillIndex.match(/\n/g) || []).length + 1;
    var col = textTillIndex.length - textTillIndex.lastIndexOf('\n');
    return {
      row: row,
      column: col
    };
  }
}

/**
 * Returns the index for certain position in text element
 * @param {DOMElement} el A dom element of a textarea or input text.
 * @param {Number} row row value, > 0, if exceeds rows number - last row will be returned
 * @param {Number} column column value, > 0, if exceeds column length - end of column will be returned
 * @returns {Number} index of position in text, -1 if not found
 */
function getIndexForPosition(el, row, column) {
  var text = el.value || '';
  if (row > 0 && column > 0) {
    var rows = text.split('\n', row);
    row = Math.min(rows.length, row);
    column = Math.min(rows[row - 1].length, column - 1);
    var columnCount = row === 1 ? column : column + 1; // count new line on multiple rows
    return rows.slice(0, row - 1).join('\n').length + columnCount;
  }
  return -1;
}

/**
 * Returns location of json paths in certain json string
 * @param {String} text json string
 * @param {Array<String>} paths array of json paths
 * @returns {Array<{path: String, line: Number, row: Number}>}
 */
function getPositionForPath(text, paths) {
  var result = [];
  var jsmap;
  if (!paths || !paths.length) {
    return result;
  }
  try {
    jsmap = json_source_map__WEBPACK_IMPORTED_MODULE_3__.parse(text);
  } catch (err) {
    return result;
  }
  paths.forEach(function (path) {
    var pathArr = parsePath(path);
    var pointerName = compileJSONPointer(pathArr);
    var pointer = jsmap.pointers[pointerName];
    if (pointer) {
      result.push({
        path: path,
        line: pointer.key ? pointer.key.line : pointer.value ? pointer.value.line : 0,
        column: pointer.key ? pointer.key.column : pointer.value ? pointer.value.column : 0
      });
    }
  });
  return result;
}

/**
 * Compile a JSON Pointer
 * WARNING: this is an incomplete implementation
 * @param {Array.<string | number>} path
 * @return {string}
 */
function compileJSONPointer(path) {
  return path.map(function (p) {
    return '/' + String(p).replace(/~/g, '~0').replace(/\//g, '~1');
  }).join('');
}

/**
 * Get the applied color given a color name or code
 * Source: https://stackoverflow.com/questions/6386090/validating-css-color-names/33184805
 * @param {string} color
 * @returns {string | null} returns the color if the input is a valid
 *                   color, and returns null otherwise. Example output:
 *                   'rgba(255,0,0,0.7)' or 'rgb(255,0,0)'
 */
function getColorCSS(color) {
  var ele = document.createElement('div');
  ele.style.color = color;
  return ele.style.color.split(/\s+/).join('').toLowerCase() || null;
}

/**
 * Test if a string contains a valid color name or code.
 * @param {string} color
 * @returns {boolean} returns true if a valid color, false otherwise
 */
function isValidColor(color) {
  return !!getColorCSS(color);
}

/**
 * Make a tooltip for a field based on the field's schema.
 * @param {object} schema JSON schema
 * @param {string} [locale] Locale code (for example, zh-CN)
 * @returns {string} Field tooltip, may be empty string if all relevant schema properties are missing
 */
function makeFieldTooltip(schema, locale) {
  if (!schema) {
    return '';
  }
  var tooltip = '';
  if (schema.title) {
    tooltip += schema.title;
  }
  if (schema.description) {
    if (tooltip.length > 0) {
      tooltip += '\n';
    }
    tooltip += schema.description;
  }
  if (schema["default"]) {
    if (tooltip.length > 0) {
      tooltip += '\n\n';
    }
    tooltip += (0,_i18n__WEBPACK_IMPORTED_MODULE_4__/* .translate */ .Tl)('default', undefined, locale) + '\n';
    tooltip += JSON.stringify(schema["default"], null, 2);
  }
  if (Array.isArray(schema.examples) && schema.examples.length > 0) {
    if (tooltip.length > 0) {
      tooltip += '\n\n';
    }
    tooltip += (0,_i18n__WEBPACK_IMPORTED_MODULE_4__/* .translate */ .Tl)('examples', undefined, locale) + '\n';
    schema.examples.forEach(function (example, index) {
      tooltip += JSON.stringify(example, null, 2);
      if (index !== schema.examples.length - 1) {
        tooltip += '\n';
      }
    });
  }
  return tooltip;
}

/**
 * Get a nested property from an object.
 * Returns undefined when the property does not exist.
 * @param {Object} object
 * @param {string[]} path
 * @return {*}
 */
function get(object, path) {
  var value = object;
  for (var i = 0; i < path.length && value !== undefined && value !== null; i++) {
    value = value[path[i]];
  }
  return value;
}

/**
 * Find a unique name. Suffix the name with ' (copy)', '(copy 2)', etc
 * until a unique name is found
 * @param {string} name
 * @param {Array} existingPropNames    Array with existing prop names
 */
function findUniqueName(name, existingPropNames) {
  if (existingPropNames.indexOf(name) === -1) {
    return name;
  }
  var strippedName = name.replace(/ \(copy( \d+)?\)$/, '');
  var validName = strippedName;
  var i = 1;
  while (existingPropNames.indexOf(validName) !== -1) {
    var copy = 'copy' + (i > 1 ? ' ' + i : '');
    validName = strippedName + ' (' + copy + ')';
    i++;
  }
  return validName;
}

/**
 * Get the child paths of an array
 * @param {JSON} json
 * @param {boolean} [includeObjects=false] If true, object and array paths are returned as well
 * @return {string[]}
 */
function getChildPaths(json, includeObjects) {
  var pathsMap = {};
  function getObjectChildPaths(json, pathsMap, rootPath, includeObjects) {
    var isValue = !Array.isArray(json) && !isObject(json);
    if (isValue || includeObjects) {
      pathsMap[rootPath || ''] = true;
    }
    if (isObject(json)) {
      Object.keys(json).forEach(function (field) {
        getObjectChildPaths(json[field], pathsMap, rootPath + '.' + field, includeObjects);
      });
    }
  }
  if (Array.isArray(json)) {
    var max = Math.min(json.length, MAX_ITEMS_FIELDS_COLLECTION);
    for (var i = 0; i < max; i++) {
      var item = json[i];
      getObjectChildPaths(item, pathsMap, '', includeObjects);
    }
  } else {
    pathsMap[''] = true;
  }
  return Object.keys(pathsMap).sort();
}

/**
 * Sort object keys using natural sort
 * @param {Array} array
 * @param {String} [path] JSON pointer
 * @param {'asc' | 'desc'} [direction]
 */
function sort(array, path, direction) {
  var parsedPath = path && path !== '.' ? parsePath(path) : [];
  var sign = direction === 'desc' ? -1 : 1;
  var sortedArray = array.slice();
  sortedArray.sort(function (a, b) {
    var aValue = get(a, parsedPath);
    var bValue = get(b, parsedPath);
    return sign * (aValue > bValue ? 1 : aValue < bValue ? -1 : 0);
  });
  return sortedArray;
}

/**
 * Sort object keys using natural sort
 * @param {Object} object
 * @param {'asc' | 'desc'} [direction]
 */
function sortObjectKeys(object, direction) {
  var sign = direction === 'desc' ? -1 : 1;
  var sortedFields = Object.keys(object).sort(function (a, b) {
    return sign * javascript_natural_sort__WEBPACK_IMPORTED_MODULE_1___default()(a, b);
  });
  var sortedObject = {};
  sortedFields.forEach(function (field) {
    sortedObject[field] = object[field];
  });
  return sortedObject;
}

/**
 * Cast contents of a string to the correct type.
 * This can be a string, a number, a boolean, etc
 * @param {String} str
 * @return {*} castedStr
 * @private
 */
function parseString(str) {
  if (str === '') {
    return '';
  }
  var lower = str.toLowerCase();
  if (lower === 'null') {
    return null;
  }
  if (lower === 'true') {
    return true;
  }
  if (lower === 'false') {
    return false;
  }
  var containsLeadingZero = /^0\d+$/;
  var startsWithZeroPrefix = /^0[xbo]/i; // hex, binary, octal numbers
  if (containsLeadingZero.test(str) || startsWithZeroPrefix.test(str)) {
    // treat '001', '0x1A', '0b1101', and '0o3700' as a string
    return str;
  }
  var num = Number(str); // will nicely fail with '123ab'
  var numFloat = parseFloat(str); // will nicely fail with '  '
  if (!isNaN(num) && !isNaN(numFloat)) {
    return num;
  }
  return str;
}

/**
 * Test whether some field contains a timestamp in milliseconds after the year 2000.
 * @param {string} field
 * @param {number} value
 * @return {boolean}
 */
function isTimestamp(field, value) {
  return typeof value === 'number' && value > YEAR_2000 && isFinite(value) && Math.floor(value) === value && !isNaN(new Date(value).valueOf());
}

/**
 * Return a human readable document size
 * For example formatSize(7570718) outputs '7.6 MB'
 * @param {number} size
 * @return {string} Returns a human readable size
 */
function formatSize(size) {
  if (size < 900) {
    return size.toFixed() + ' B';
  }
  var KB = size / 1000;
  if (KB < 900) {
    return KB.toFixed(1) + ' KB';
  }
  var MB = KB / 1000;
  if (MB < 900) {
    return MB.toFixed(1) + ' MB';
  }
  var GB = MB / 1000;
  if (GB < 900) {
    return GB.toFixed(1) + ' GB';
  }
  var TB = GB / 1000;
  return TB.toFixed(1) + ' TB';
}

/**
 * Limit text to a maximum number of characters
 * @param {string} text
 * @param {number} maxCharacterCount
 * @return {string} Returns the limited text,
 *                  ending with '...' if the max was exceeded
 */
function limitCharacters(text, maxCharacterCount) {
  if (text.length <= maxCharacterCount) {
    return text;
  }
  return text.slice(0, maxCharacterCount) + '...';
}

/**
 * Test whether a value is an Object
 * @param {*} value
 * @return {boolean}
 */
function isObject(value) {
  return _typeof(value) === 'object' && value !== null && !Array.isArray(value);
}

/**
 * Helper function to test whether an array contains an item
 * @param {Array} array
 * @param {*} item
 * @return {boolean} Returns true if `item` is in `array`, returns false otherwise.
 */
function contains(array, item) {
  return array.indexOf(item) !== -1;
}

/**
 * Checks if validation has changed from the previous execution
 * @param {Array} currErr current validation errors
 * @param {Array} prevErr previous validation errors
 */
function isValidationErrorChanged(currErr, prevErr) {
  if (!currErr && !prevErr) {
    return false;
  }
  if (!Array.isArray(currErr) || !Array.isArray(prevErr) || prevErr.length !== currErr.length) {
    return true;
  }
  for (var i = 0; i < currErr.length; i++) {
    var currItem = currErr[i];
    var prevItem = prevErr[i];
    if (currItem.type !== prevItem.type || JSON.stringify(currItem.error) !== JSON.stringify(prevItem.error)) {
      return true;
    }
  }
  return false;
}

/**
 * Uniquely merge array of elements
 * @param {Array<string|number>} inputArray1
 * @param {Array<string|number>} inputArray2
 * @returns {Array<string|number>} an array with unique merged elements
 */
function uniqueMergeArrays(inputArray1, inputArray2) {
  var arr1 = inputArray1 !== null && inputArray1 !== void 0 && inputArray1.length ? inputArray1 : [];
  var arr2 = inputArray2 !== null && inputArray2 !== void 0 && inputArray2.length ? inputArray2 : [];
  return _toConsumableArray(new Set(arr1.concat(arr2)));
}
function asyncExec(callback) {
  setTimeout(callback);
}
function hasOwnProperty(object, key) {
  return Object.prototype.hasOwnProperty.call(object, key);
}

/***/ }),

/***/ 746:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var VanillaPicker;
if (window.Picker) {
  // use the already loaded instance of VanillaPicker
  VanillaPicker = window.Picker;
} else {
  try {
    // load color picker
    VanillaPicker = __webpack_require__(Object(function webpackMissingModule() { var e = new Error("Cannot find module 'vanilla-picker'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
  } catch (err) {
    // probably running the minimalist bundle
  }
}
module.exports = VanillaPicker;

/***/ }),

/***/ 342:
/***/ (function(module) {

/*
 * Natural Sort algorithm for Javascript - Version 0.7 - Released under MIT license
 * Author: Jim Palmer (based on chunking idea from Dave Koelle)
 */
/*jshint unused:false */
module.exports = function naturalSort (a, b) {
	"use strict";
	var re = /(^([+\-]?(?:0|[1-9]\d*)(?:\.\d*)?(?:[eE][+\-]?\d+)?)?$|^0x[0-9a-f]+$|\d+)/gi,
		sre = /(^[ ]*|[ ]*$)/g,
		dre = /(^([\w ]+,?[\w ]+)?[\w ]+,?[\w ]+\d+:\d+(:\d+)?[\w ]?|^\d{1,4}[\/\-]\d{1,4}[\/\-]\d{1,4}|^\w+, \w+ \d+, \d{4})/,
		hre = /^0x[0-9a-f]+$/i,
		ore = /^0/,
		i = function(s) { return naturalSort.insensitive && ('' + s).toLowerCase() || '' + s; },
		// convert all to strings strip whitespace
		x = i(a).replace(sre, '') || '',
		y = i(b).replace(sre, '') || '',
		// chunk/tokenize
		xN = x.replace(re, '\0$1\0').replace(/\0$/,'').replace(/^\0/,'').split('\0'),
		yN = y.replace(re, '\0$1\0').replace(/\0$/,'').replace(/^\0/,'').split('\0'),
		// numeric, hex or date detection
		xD = parseInt(x.match(hre), 16) || (xN.length !== 1 && x.match(dre) && Date.parse(x)),
		yD = parseInt(y.match(hre), 16) || xD && y.match(dre) && Date.parse(y) || null,
		oFxNcL, oFyNcL;
	// first try and sort Hex codes or Dates
	if (yD) {
		if ( xD < yD ) { return -1; }
		else if ( xD > yD ) { return 1; }
	}
	// natural sorting through split numeric strings and default strings
	for(var cLoc=0, numS=Math.max(xN.length, yN.length); cLoc < numS; cLoc++) {
		// find floats not starting with '0', string or 0 if not defined (Clint Priest)
		oFxNcL = !(xN[cLoc] || '').match(ore) && parseFloat(xN[cLoc]) || xN[cLoc] || 0;
		oFyNcL = !(yN[cLoc] || '').match(ore) && parseFloat(yN[cLoc]) || yN[cLoc] || 0;
		// handle numeric vs string comparison - number < string - (Kyle Adams)
		if (isNaN(oFxNcL) !== isNaN(oFyNcL)) { return (isNaN(oFxNcL)) ? 1 : -1; }
		// rely on string comparison if different types - i.e. '02' < 2 != '02' < '2'
		else if (typeof oFxNcL !== typeof oFyNcL) {
			oFxNcL += '';
			oFyNcL += '';
		}
		if (oFxNcL < oFyNcL) { return -1; }
		if (oFxNcL > oFyNcL) { return 1; }
	}
	return 0;
};


/***/ }),

/***/ 151:
/***/ (function(__unused_webpack_module, exports) {

(function(exports) {
  "use strict";

  function isArray(obj) {
    if (obj !== null) {
      return Object.prototype.toString.call(obj) === "[object Array]";
    } else {
      return false;
    }
  }

  function isObject(obj) {
    if (obj !== null) {
      return Object.prototype.toString.call(obj) === "[object Object]";
    } else {
      return false;
    }
  }

  function strictDeepEqual(first, second) {
    // Check the scalar case first.
    if (first === second) {
      return true;
    }

    // Check if they are the same type.
    var firstType = Object.prototype.toString.call(first);
    if (firstType !== Object.prototype.toString.call(second)) {
      return false;
    }
    // We know that first and second have the same type so we can just check the
    // first type from now on.
    if (isArray(first) === true) {
      // Short circuit if they're not the same length;
      if (first.length !== second.length) {
        return false;
      }
      for (var i = 0; i < first.length; i++) {
        if (strictDeepEqual(first[i], second[i]) === false) {
          return false;
        }
      }
      return true;
    }
    if (isObject(first) === true) {
      // An object is equal if it has the same key/value pairs.
      var keysSeen = {};
      for (var key in first) {
        if (hasOwnProperty.call(first, key)) {
          if (strictDeepEqual(first[key], second[key]) === false) {
            return false;
          }
          keysSeen[key] = true;
        }
      }
      // Now check that there aren't any keys in second that weren't
      // in first.
      for (var key2 in second) {
        if (hasOwnProperty.call(second, key2)) {
          if (keysSeen[key2] !== true) {
            return false;
          }
        }
      }
      return true;
    }
    return false;
  }

  function isFalse(obj) {
    // From the spec:
    // A false value corresponds to the following values:
    // Empty list
    // Empty object
    // Empty string
    // False boolean
    // null value

    // First check the scalar values.
    if (obj === "" || obj === false || obj === null) {
        return true;
    } else if (isArray(obj) && obj.length === 0) {
        // Check for an empty array.
        return true;
    } else if (isObject(obj)) {
        // Check for an empty object.
        for (var key in obj) {
            // If there are any keys, then
            // the object is not empty so the object
            // is not false.
            if (obj.hasOwnProperty(key)) {
              return false;
            }
        }
        return true;
    } else {
        return false;
    }
  }

  function objValues(obj) {
    var keys = Object.keys(obj);
    var values = [];
    for (var i = 0; i < keys.length; i++) {
      values.push(obj[keys[i]]);
    }
    return values;
  }

  function merge(a, b) {
      var merged = {};
      for (var key in a) {
          merged[key] = a[key];
      }
      for (var key2 in b) {
          merged[key2] = b[key2];
      }
      return merged;
  }

  var trimLeft;
  if (typeof String.prototype.trimLeft === "function") {
    trimLeft = function(str) {
      return str.trimLeft();
    };
  } else {
    trimLeft = function(str) {
      return str.match(/^\s*(.*)/)[1];
    };
  }

  // Type constants used to define functions.
  var TYPE_NUMBER = 0;
  var TYPE_ANY = 1;
  var TYPE_STRING = 2;
  var TYPE_ARRAY = 3;
  var TYPE_OBJECT = 4;
  var TYPE_BOOLEAN = 5;
  var TYPE_EXPREF = 6;
  var TYPE_NULL = 7;
  var TYPE_ARRAY_NUMBER = 8;
  var TYPE_ARRAY_STRING = 9;
  var TYPE_NAME_TABLE = {
    0: 'number',
    1: 'any',
    2: 'string',
    3: 'array',
    4: 'object',
    5: 'boolean',
    6: 'expression',
    7: 'null',
    8: 'Array<number>',
    9: 'Array<string>'
  };

  var TOK_EOF = "EOF";
  var TOK_UNQUOTEDIDENTIFIER = "UnquotedIdentifier";
  var TOK_QUOTEDIDENTIFIER = "QuotedIdentifier";
  var TOK_RBRACKET = "Rbracket";
  var TOK_RPAREN = "Rparen";
  var TOK_COMMA = "Comma";
  var TOK_COLON = "Colon";
  var TOK_RBRACE = "Rbrace";
  var TOK_NUMBER = "Number";
  var TOK_CURRENT = "Current";
  var TOK_EXPREF = "Expref";
  var TOK_PIPE = "Pipe";
  var TOK_OR = "Or";
  var TOK_AND = "And";
  var TOK_EQ = "EQ";
  var TOK_GT = "GT";
  var TOK_LT = "LT";
  var TOK_GTE = "GTE";
  var TOK_LTE = "LTE";
  var TOK_NE = "NE";
  var TOK_FLATTEN = "Flatten";
  var TOK_STAR = "Star";
  var TOK_FILTER = "Filter";
  var TOK_DOT = "Dot";
  var TOK_NOT = "Not";
  var TOK_LBRACE = "Lbrace";
  var TOK_LBRACKET = "Lbracket";
  var TOK_LPAREN= "Lparen";
  var TOK_LITERAL= "Literal";

  // The "&", "[", "<", ">" tokens
  // are not in basicToken because
  // there are two token variants
  // ("&&", "[?", "<=", ">=").  This is specially handled
  // below.

  var basicTokens = {
    ".": TOK_DOT,
    "*": TOK_STAR,
    ",": TOK_COMMA,
    ":": TOK_COLON,
    "{": TOK_LBRACE,
    "}": TOK_RBRACE,
    "]": TOK_RBRACKET,
    "(": TOK_LPAREN,
    ")": TOK_RPAREN,
    "@": TOK_CURRENT
  };

  var operatorStartToken = {
      "<": true,
      ">": true,
      "=": true,
      "!": true
  };

  var skipChars = {
      " ": true,
      "\t": true,
      "\n": true
  };


  function isAlpha(ch) {
      return (ch >= "a" && ch <= "z") ||
             (ch >= "A" && ch <= "Z") ||
             ch === "_";
  }

  function isNum(ch) {
      return (ch >= "0" && ch <= "9") ||
             ch === "-";
  }
  function isAlphaNum(ch) {
      return (ch >= "a" && ch <= "z") ||
             (ch >= "A" && ch <= "Z") ||
             (ch >= "0" && ch <= "9") ||
             ch === "_";
  }

  function Lexer() {
  }
  Lexer.prototype = {
      tokenize: function(stream) {
          var tokens = [];
          this._current = 0;
          var start;
          var identifier;
          var token;
          while (this._current < stream.length) {
              if (isAlpha(stream[this._current])) {
                  start = this._current;
                  identifier = this._consumeUnquotedIdentifier(stream);
                  tokens.push({type: TOK_UNQUOTEDIDENTIFIER,
                               value: identifier,
                               start: start});
              } else if (basicTokens[stream[this._current]] !== undefined) {
                  tokens.push({type: basicTokens[stream[this._current]],
                              value: stream[this._current],
                              start: this._current});
                  this._current++;
              } else if (isNum(stream[this._current])) {
                  token = this._consumeNumber(stream);
                  tokens.push(token);
              } else if (stream[this._current] === "[") {
                  // No need to increment this._current.  This happens
                  // in _consumeLBracket
                  token = this._consumeLBracket(stream);
                  tokens.push(token);
              } else if (stream[this._current] === "\"") {
                  start = this._current;
                  identifier = this._consumeQuotedIdentifier(stream);
                  tokens.push({type: TOK_QUOTEDIDENTIFIER,
                               value: identifier,
                               start: start});
              } else if (stream[this._current] === "'") {
                  start = this._current;
                  identifier = this._consumeRawStringLiteral(stream);
                  tokens.push({type: TOK_LITERAL,
                               value: identifier,
                               start: start});
              } else if (stream[this._current] === "`") {
                  start = this._current;
                  var literal = this._consumeLiteral(stream);
                  tokens.push({type: TOK_LITERAL,
                               value: literal,
                               start: start});
              } else if (operatorStartToken[stream[this._current]] !== undefined) {
                  tokens.push(this._consumeOperator(stream));
              } else if (skipChars[stream[this._current]] !== undefined) {
                  // Ignore whitespace.
                  this._current++;
              } else if (stream[this._current] === "&") {
                  start = this._current;
                  this._current++;
                  if (stream[this._current] === "&") {
                      this._current++;
                      tokens.push({type: TOK_AND, value: "&&", start: start});
                  } else {
                      tokens.push({type: TOK_EXPREF, value: "&", start: start});
                  }
              } else if (stream[this._current] === "|") {
                  start = this._current;
                  this._current++;
                  if (stream[this._current] === "|") {
                      this._current++;
                      tokens.push({type: TOK_OR, value: "||", start: start});
                  } else {
                      tokens.push({type: TOK_PIPE, value: "|", start: start});
                  }
              } else {
                  var error = new Error("Unknown character:" + stream[this._current]);
                  error.name = "LexerError";
                  throw error;
              }
          }
          return tokens;
      },

      _consumeUnquotedIdentifier: function(stream) {
          var start = this._current;
          this._current++;
          while (this._current < stream.length && isAlphaNum(stream[this._current])) {
              this._current++;
          }
          return stream.slice(start, this._current);
      },

      _consumeQuotedIdentifier: function(stream) {
          var start = this._current;
          this._current++;
          var maxLength = stream.length;
          while (stream[this._current] !== "\"" && this._current < maxLength) {
              // You can escape a double quote and you can escape an escape.
              var current = this._current;
              if (stream[current] === "\\" && (stream[current + 1] === "\\" ||
                                               stream[current + 1] === "\"")) {
                  current += 2;
              } else {
                  current++;
              }
              this._current = current;
          }
          this._current++;
          return JSON.parse(stream.slice(start, this._current));
      },

      _consumeRawStringLiteral: function(stream) {
          var start = this._current;
          this._current++;
          var maxLength = stream.length;
          while (stream[this._current] !== "'" && this._current < maxLength) {
              // You can escape a single quote and you can escape an escape.
              var current = this._current;
              if (stream[current] === "\\" && (stream[current + 1] === "\\" ||
                                               stream[current + 1] === "'")) {
                  current += 2;
              } else {
                  current++;
              }
              this._current = current;
          }
          this._current++;
          var literal = stream.slice(start + 1, this._current - 1);
          return literal.replace("\\'", "'");
      },

      _consumeNumber: function(stream) {
          var start = this._current;
          this._current++;
          var maxLength = stream.length;
          while (isNum(stream[this._current]) && this._current < maxLength) {
              this._current++;
          }
          var value = parseInt(stream.slice(start, this._current));
          return {type: TOK_NUMBER, value: value, start: start};
      },

      _consumeLBracket: function(stream) {
          var start = this._current;
          this._current++;
          if (stream[this._current] === "?") {
              this._current++;
              return {type: TOK_FILTER, value: "[?", start: start};
          } else if (stream[this._current] === "]") {
              this._current++;
              return {type: TOK_FLATTEN, value: "[]", start: start};
          } else {
              return {type: TOK_LBRACKET, value: "[", start: start};
          }
      },

      _consumeOperator: function(stream) {
          var start = this._current;
          var startingChar = stream[start];
          this._current++;
          if (startingChar === "!") {
              if (stream[this._current] === "=") {
                  this._current++;
                  return {type: TOK_NE, value: "!=", start: start};
              } else {
                return {type: TOK_NOT, value: "!", start: start};
              }
          } else if (startingChar === "<") {
              if (stream[this._current] === "=") {
                  this._current++;
                  return {type: TOK_LTE, value: "<=", start: start};
              } else {
                  return {type: TOK_LT, value: "<", start: start};
              }
          } else if (startingChar === ">") {
              if (stream[this._current] === "=") {
                  this._current++;
                  return {type: TOK_GTE, value: ">=", start: start};
              } else {
                  return {type: TOK_GT, value: ">", start: start};
              }
          } else if (startingChar === "=") {
              if (stream[this._current] === "=") {
                  this._current++;
                  return {type: TOK_EQ, value: "==", start: start};
              }
          }
      },

      _consumeLiteral: function(stream) {
          this._current++;
          var start = this._current;
          var maxLength = stream.length;
          var literal;
          while(stream[this._current] !== "`" && this._current < maxLength) {
              // You can escape a literal char or you can escape the escape.
              var current = this._current;
              if (stream[current] === "\\" && (stream[current + 1] === "\\" ||
                                               stream[current + 1] === "`")) {
                  current += 2;
              } else {
                  current++;
              }
              this._current = current;
          }
          var literalString = trimLeft(stream.slice(start, this._current));
          literalString = literalString.replace("\\`", "`");
          if (this._looksLikeJSON(literalString)) {
              literal = JSON.parse(literalString);
          } else {
              // Try to JSON parse it as "<literal>"
              literal = JSON.parse("\"" + literalString + "\"");
          }
          // +1 gets us to the ending "`", +1 to move on to the next char.
          this._current++;
          return literal;
      },

      _looksLikeJSON: function(literalString) {
          var startingChars = "[{\"";
          var jsonLiterals = ["true", "false", "null"];
          var numberLooking = "-0123456789";

          if (literalString === "") {
              return false;
          } else if (startingChars.indexOf(literalString[0]) >= 0) {
              return true;
          } else if (jsonLiterals.indexOf(literalString) >= 0) {
              return true;
          } else if (numberLooking.indexOf(literalString[0]) >= 0) {
              try {
                  JSON.parse(literalString);
                  return true;
              } catch (ex) {
                  return false;
              }
          } else {
              return false;
          }
      }
  };

      var bindingPower = {};
      bindingPower[TOK_EOF] = 0;
      bindingPower[TOK_UNQUOTEDIDENTIFIER] = 0;
      bindingPower[TOK_QUOTEDIDENTIFIER] = 0;
      bindingPower[TOK_RBRACKET] = 0;
      bindingPower[TOK_RPAREN] = 0;
      bindingPower[TOK_COMMA] = 0;
      bindingPower[TOK_RBRACE] = 0;
      bindingPower[TOK_NUMBER] = 0;
      bindingPower[TOK_CURRENT] = 0;
      bindingPower[TOK_EXPREF] = 0;
      bindingPower[TOK_PIPE] = 1;
      bindingPower[TOK_OR] = 2;
      bindingPower[TOK_AND] = 3;
      bindingPower[TOK_EQ] = 5;
      bindingPower[TOK_GT] = 5;
      bindingPower[TOK_LT] = 5;
      bindingPower[TOK_GTE] = 5;
      bindingPower[TOK_LTE] = 5;
      bindingPower[TOK_NE] = 5;
      bindingPower[TOK_FLATTEN] = 9;
      bindingPower[TOK_STAR] = 20;
      bindingPower[TOK_FILTER] = 21;
      bindingPower[TOK_DOT] = 40;
      bindingPower[TOK_NOT] = 45;
      bindingPower[TOK_LBRACE] = 50;
      bindingPower[TOK_LBRACKET] = 55;
      bindingPower[TOK_LPAREN] = 60;

  function Parser() {
  }

  Parser.prototype = {
      parse: function(expression) {
          this._loadTokens(expression);
          this.index = 0;
          var ast = this.expression(0);
          if (this._lookahead(0) !== TOK_EOF) {
              var t = this._lookaheadToken(0);
              var error = new Error(
                  "Unexpected token type: " + t.type + ", value: " + t.value);
              error.name = "ParserError";
              throw error;
          }
          return ast;
      },

      _loadTokens: function(expression) {
          var lexer = new Lexer();
          var tokens = lexer.tokenize(expression);
          tokens.push({type: TOK_EOF, value: "", start: expression.length});
          this.tokens = tokens;
      },

      expression: function(rbp) {
          var leftToken = this._lookaheadToken(0);
          this._advance();
          var left = this.nud(leftToken);
          var currentToken = this._lookahead(0);
          while (rbp < bindingPower[currentToken]) {
              this._advance();
              left = this.led(currentToken, left);
              currentToken = this._lookahead(0);
          }
          return left;
      },

      _lookahead: function(number) {
          return this.tokens[this.index + number].type;
      },

      _lookaheadToken: function(number) {
          return this.tokens[this.index + number];
      },

      _advance: function() {
          this.index++;
      },

      nud: function(token) {
        var left;
        var right;
        var expression;
        switch (token.type) {
          case TOK_LITERAL:
            return {type: "Literal", value: token.value};
          case TOK_UNQUOTEDIDENTIFIER:
            return {type: "Field", name: token.value};
          case TOK_QUOTEDIDENTIFIER:
            var node = {type: "Field", name: token.value};
            if (this._lookahead(0) === TOK_LPAREN) {
                throw new Error("Quoted identifier not allowed for function names.");
            }
            return node;
          case TOK_NOT:
            right = this.expression(bindingPower.Not);
            return {type: "NotExpression", children: [right]};
          case TOK_STAR:
            left = {type: "Identity"};
            right = null;
            if (this._lookahead(0) === TOK_RBRACKET) {
                // This can happen in a multiselect,
                // [a, b, *]
                right = {type: "Identity"};
            } else {
                right = this._parseProjectionRHS(bindingPower.Star);
            }
            return {type: "ValueProjection", children: [left, right]};
          case TOK_FILTER:
            return this.led(token.type, {type: "Identity"});
          case TOK_LBRACE:
            return this._parseMultiselectHash();
          case TOK_FLATTEN:
            left = {type: TOK_FLATTEN, children: [{type: "Identity"}]};
            right = this._parseProjectionRHS(bindingPower.Flatten);
            return {type: "Projection", children: [left, right]};
          case TOK_LBRACKET:
            if (this._lookahead(0) === TOK_NUMBER || this._lookahead(0) === TOK_COLON) {
                right = this._parseIndexExpression();
                return this._projectIfSlice({type: "Identity"}, right);
            } else if (this._lookahead(0) === TOK_STAR &&
                       this._lookahead(1) === TOK_RBRACKET) {
                this._advance();
                this._advance();
                right = this._parseProjectionRHS(bindingPower.Star);
                return {type: "Projection",
                        children: [{type: "Identity"}, right]};
            }
            return this._parseMultiselectList();
          case TOK_CURRENT:
            return {type: TOK_CURRENT};
          case TOK_EXPREF:
            expression = this.expression(bindingPower.Expref);
            return {type: "ExpressionReference", children: [expression]};
          case TOK_LPAREN:
            var args = [];
            while (this._lookahead(0) !== TOK_RPAREN) {
              if (this._lookahead(0) === TOK_CURRENT) {
                expression = {type: TOK_CURRENT};
                this._advance();
              } else {
                expression = this.expression(0);
              }
              args.push(expression);
            }
            this._match(TOK_RPAREN);
            return args[0];
          default:
            this._errorToken(token);
        }
      },

      led: function(tokenName, left) {
        var right;
        switch(tokenName) {
          case TOK_DOT:
            var rbp = bindingPower.Dot;
            if (this._lookahead(0) !== TOK_STAR) {
                right = this._parseDotRHS(rbp);
                return {type: "Subexpression", children: [left, right]};
            }
            // Creating a projection.
            this._advance();
            right = this._parseProjectionRHS(rbp);
            return {type: "ValueProjection", children: [left, right]};
          case TOK_PIPE:
            right = this.expression(bindingPower.Pipe);
            return {type: TOK_PIPE, children: [left, right]};
          case TOK_OR:
            right = this.expression(bindingPower.Or);
            return {type: "OrExpression", children: [left, right]};
          case TOK_AND:
            right = this.expression(bindingPower.And);
            return {type: "AndExpression", children: [left, right]};
          case TOK_LPAREN:
            var name = left.name;
            var args = [];
            var expression, node;
            while (this._lookahead(0) !== TOK_RPAREN) {
              if (this._lookahead(0) === TOK_CURRENT) {
                expression = {type: TOK_CURRENT};
                this._advance();
              } else {
                expression = this.expression(0);
              }
              if (this._lookahead(0) === TOK_COMMA) {
                this._match(TOK_COMMA);
              }
              args.push(expression);
            }
            this._match(TOK_RPAREN);
            node = {type: "Function", name: name, children: args};
            return node;
          case TOK_FILTER:
            var condition = this.expression(0);
            this._match(TOK_RBRACKET);
            if (this._lookahead(0) === TOK_FLATTEN) {
              right = {type: "Identity"};
            } else {
              right = this._parseProjectionRHS(bindingPower.Filter);
            }
            return {type: "FilterProjection", children: [left, right, condition]};
          case TOK_FLATTEN:
            var leftNode = {type: TOK_FLATTEN, children: [left]};
            var rightNode = this._parseProjectionRHS(bindingPower.Flatten);
            return {type: "Projection", children: [leftNode, rightNode]};
          case TOK_EQ:
          case TOK_NE:
          case TOK_GT:
          case TOK_GTE:
          case TOK_LT:
          case TOK_LTE:
            return this._parseComparator(left, tokenName);
          case TOK_LBRACKET:
            var token = this._lookaheadToken(0);
            if (token.type === TOK_NUMBER || token.type === TOK_COLON) {
                right = this._parseIndexExpression();
                return this._projectIfSlice(left, right);
            }
            this._match(TOK_STAR);
            this._match(TOK_RBRACKET);
            right = this._parseProjectionRHS(bindingPower.Star);
            return {type: "Projection", children: [left, right]};
          default:
            this._errorToken(this._lookaheadToken(0));
        }
      },

      _match: function(tokenType) {
          if (this._lookahead(0) === tokenType) {
              this._advance();
          } else {
              var t = this._lookaheadToken(0);
              var error = new Error("Expected " + tokenType + ", got: " + t.type);
              error.name = "ParserError";
              throw error;
          }
      },

      _errorToken: function(token) {
          var error = new Error("Invalid token (" +
                                token.type + "): \"" +
                                token.value + "\"");
          error.name = "ParserError";
          throw error;
      },


      _parseIndexExpression: function() {
          if (this._lookahead(0) === TOK_COLON || this._lookahead(1) === TOK_COLON) {
              return this._parseSliceExpression();
          } else {
              var node = {
                  type: "Index",
                  value: this._lookaheadToken(0).value};
              this._advance();
              this._match(TOK_RBRACKET);
              return node;
          }
      },

      _projectIfSlice: function(left, right) {
          var indexExpr = {type: "IndexExpression", children: [left, right]};
          if (right.type === "Slice") {
              return {
                  type: "Projection",
                  children: [indexExpr, this._parseProjectionRHS(bindingPower.Star)]
              };
          } else {
              return indexExpr;
          }
      },

      _parseSliceExpression: function() {
          // [start:end:step] where each part is optional, as well as the last
          // colon.
          var parts = [null, null, null];
          var index = 0;
          var currentToken = this._lookahead(0);
          while (currentToken !== TOK_RBRACKET && index < 3) {
              if (currentToken === TOK_COLON) {
                  index++;
                  this._advance();
              } else if (currentToken === TOK_NUMBER) {
                  parts[index] = this._lookaheadToken(0).value;
                  this._advance();
              } else {
                  var t = this._lookahead(0);
                  var error = new Error("Syntax error, unexpected token: " +
                                        t.value + "(" + t.type + ")");
                  error.name = "Parsererror";
                  throw error;
              }
              currentToken = this._lookahead(0);
          }
          this._match(TOK_RBRACKET);
          return {
              type: "Slice",
              children: parts
          };
      },

      _parseComparator: function(left, comparator) {
        var right = this.expression(bindingPower[comparator]);
        return {type: "Comparator", name: comparator, children: [left, right]};
      },

      _parseDotRHS: function(rbp) {
          var lookahead = this._lookahead(0);
          var exprTokens = [TOK_UNQUOTEDIDENTIFIER, TOK_QUOTEDIDENTIFIER, TOK_STAR];
          if (exprTokens.indexOf(lookahead) >= 0) {
              return this.expression(rbp);
          } else if (lookahead === TOK_LBRACKET) {
              this._match(TOK_LBRACKET);
              return this._parseMultiselectList();
          } else if (lookahead === TOK_LBRACE) {
              this._match(TOK_LBRACE);
              return this._parseMultiselectHash();
          }
      },

      _parseProjectionRHS: function(rbp) {
          var right;
          if (bindingPower[this._lookahead(0)] < 10) {
              right = {type: "Identity"};
          } else if (this._lookahead(0) === TOK_LBRACKET) {
              right = this.expression(rbp);
          } else if (this._lookahead(0) === TOK_FILTER) {
              right = this.expression(rbp);
          } else if (this._lookahead(0) === TOK_DOT) {
              this._match(TOK_DOT);
              right = this._parseDotRHS(rbp);
          } else {
              var t = this._lookaheadToken(0);
              var error = new Error("Sytanx error, unexpected token: " +
                                    t.value + "(" + t.type + ")");
              error.name = "ParserError";
              throw error;
          }
          return right;
      },

      _parseMultiselectList: function() {
          var expressions = [];
          while (this._lookahead(0) !== TOK_RBRACKET) {
              var expression = this.expression(0);
              expressions.push(expression);
              if (this._lookahead(0) === TOK_COMMA) {
                  this._match(TOK_COMMA);
                  if (this._lookahead(0) === TOK_RBRACKET) {
                    throw new Error("Unexpected token Rbracket");
                  }
              }
          }
          this._match(TOK_RBRACKET);
          return {type: "MultiSelectList", children: expressions};
      },

      _parseMultiselectHash: function() {
        var pairs = [];
        var identifierTypes = [TOK_UNQUOTEDIDENTIFIER, TOK_QUOTEDIDENTIFIER];
        var keyToken, keyName, value, node;
        for (;;) {
          keyToken = this._lookaheadToken(0);
          if (identifierTypes.indexOf(keyToken.type) < 0) {
            throw new Error("Expecting an identifier token, got: " +
                            keyToken.type);
          }
          keyName = keyToken.value;
          this._advance();
          this._match(TOK_COLON);
          value = this.expression(0);
          node = {type: "KeyValuePair", name: keyName, value: value};
          pairs.push(node);
          if (this._lookahead(0) === TOK_COMMA) {
            this._match(TOK_COMMA);
          } else if (this._lookahead(0) === TOK_RBRACE) {
            this._match(TOK_RBRACE);
            break;
          }
        }
        return {type: "MultiSelectHash", children: pairs};
      }
  };


  function TreeInterpreter(runtime) {
    this.runtime = runtime;
  }

  TreeInterpreter.prototype = {
      search: function(node, value) {
          return this.visit(node, value);
      },

      visit: function(node, value) {
          var matched, current, result, first, second, field, left, right, collected, i;
          switch (node.type) {
            case "Field":
              if (value !== null && isObject(value)) {
                  field = value[node.name];
                  if (field === undefined) {
                      return null;
                  } else {
                      return field;
                  }
              }
              return null;
            case "Subexpression":
              result = this.visit(node.children[0], value);
              for (i = 1; i < node.children.length; i++) {
                  result = this.visit(node.children[1], result);
                  if (result === null) {
                      return null;
                  }
              }
              return result;
            case "IndexExpression":
              left = this.visit(node.children[0], value);
              right = this.visit(node.children[1], left);
              return right;
            case "Index":
              if (!isArray(value)) {
                return null;
              }
              var index = node.value;
              if (index < 0) {
                index = value.length + index;
              }
              result = value[index];
              if (result === undefined) {
                result = null;
              }
              return result;
            case "Slice":
              if (!isArray(value)) {
                return null;
              }
              var sliceParams = node.children.slice(0);
              var computed = this.computeSliceParams(value.length, sliceParams);
              var start = computed[0];
              var stop = computed[1];
              var step = computed[2];
              result = [];
              if (step > 0) {
                  for (i = start; i < stop; i += step) {
                      result.push(value[i]);
                  }
              } else {
                  for (i = start; i > stop; i += step) {
                      result.push(value[i]);
                  }
              }
              return result;
            case "Projection":
              // Evaluate left child.
              var base = this.visit(node.children[0], value);
              if (!isArray(base)) {
                return null;
              }
              collected = [];
              for (i = 0; i < base.length; i++) {
                current = this.visit(node.children[1], base[i]);
                if (current !== null) {
                  collected.push(current);
                }
              }
              return collected;
            case "ValueProjection":
              // Evaluate left child.
              base = this.visit(node.children[0], value);
              if (!isObject(base)) {
                return null;
              }
              collected = [];
              var values = objValues(base);
              for (i = 0; i < values.length; i++) {
                current = this.visit(node.children[1], values[i]);
                if (current !== null) {
                  collected.push(current);
                }
              }
              return collected;
            case "FilterProjection":
              base = this.visit(node.children[0], value);
              if (!isArray(base)) {
                return null;
              }
              var filtered = [];
              var finalResults = [];
              for (i = 0; i < base.length; i++) {
                matched = this.visit(node.children[2], base[i]);
                if (!isFalse(matched)) {
                  filtered.push(base[i]);
                }
              }
              for (var j = 0; j < filtered.length; j++) {
                current = this.visit(node.children[1], filtered[j]);
                if (current !== null) {
                  finalResults.push(current);
                }
              }
              return finalResults;
            case "Comparator":
              first = this.visit(node.children[0], value);
              second = this.visit(node.children[1], value);
              switch(node.name) {
                case TOK_EQ:
                  result = strictDeepEqual(first, second);
                  break;
                case TOK_NE:
                  result = !strictDeepEqual(first, second);
                  break;
                case TOK_GT:
                  result = first > second;
                  break;
                case TOK_GTE:
                  result = first >= second;
                  break;
                case TOK_LT:
                  result = first < second;
                  break;
                case TOK_LTE:
                  result = first <= second;
                  break;
                default:
                  throw new Error("Unknown comparator: " + node.name);
              }
              return result;
            case TOK_FLATTEN:
              var original = this.visit(node.children[0], value);
              if (!isArray(original)) {
                return null;
              }
              var merged = [];
              for (i = 0; i < original.length; i++) {
                current = original[i];
                if (isArray(current)) {
                  merged.push.apply(merged, current);
                } else {
                  merged.push(current);
                }
              }
              return merged;
            case "Identity":
              return value;
            case "MultiSelectList":
              if (value === null) {
                return null;
              }
              collected = [];
              for (i = 0; i < node.children.length; i++) {
                  collected.push(this.visit(node.children[i], value));
              }
              return collected;
            case "MultiSelectHash":
              if (value === null) {
                return null;
              }
              collected = {};
              var child;
              for (i = 0; i < node.children.length; i++) {
                child = node.children[i];
                collected[child.name] = this.visit(child.value, value);
              }
              return collected;
            case "OrExpression":
              matched = this.visit(node.children[0], value);
              if (isFalse(matched)) {
                  matched = this.visit(node.children[1], value);
              }
              return matched;
            case "AndExpression":
              first = this.visit(node.children[0], value);

              if (isFalse(first) === true) {
                return first;
              }
              return this.visit(node.children[1], value);
            case "NotExpression":
              first = this.visit(node.children[0], value);
              return isFalse(first);
            case "Literal":
              return node.value;
            case TOK_PIPE:
              left = this.visit(node.children[0], value);
              return this.visit(node.children[1], left);
            case TOK_CURRENT:
              return value;
            case "Function":
              var resolvedArgs = [];
              for (i = 0; i < node.children.length; i++) {
                  resolvedArgs.push(this.visit(node.children[i], value));
              }
              return this.runtime.callFunction(node.name, resolvedArgs);
            case "ExpressionReference":
              var refNode = node.children[0];
              // Tag the node with a specific attribute so the type
              // checker verify the type.
              refNode.jmespathType = TOK_EXPREF;
              return refNode;
            default:
              throw new Error("Unknown node type: " + node.type);
          }
      },

      computeSliceParams: function(arrayLength, sliceParams) {
        var start = sliceParams[0];
        var stop = sliceParams[1];
        var step = sliceParams[2];
        var computed = [null, null, null];
        if (step === null) {
          step = 1;
        } else if (step === 0) {
          var error = new Error("Invalid slice, step cannot be 0");
          error.name = "RuntimeError";
          throw error;
        }
        var stepValueNegative = step < 0 ? true : false;

        if (start === null) {
            start = stepValueNegative ? arrayLength - 1 : 0;
        } else {
            start = this.capSliceRange(arrayLength, start, step);
        }

        if (stop === null) {
            stop = stepValueNegative ? -1 : arrayLength;
        } else {
            stop = this.capSliceRange(arrayLength, stop, step);
        }
        computed[0] = start;
        computed[1] = stop;
        computed[2] = step;
        return computed;
      },

      capSliceRange: function(arrayLength, actualValue, step) {
          if (actualValue < 0) {
              actualValue += arrayLength;
              if (actualValue < 0) {
                  actualValue = step < 0 ? -1 : 0;
              }
          } else if (actualValue >= arrayLength) {
              actualValue = step < 0 ? arrayLength - 1 : arrayLength;
          }
          return actualValue;
      }

  };

  function Runtime(interpreter) {
    this._interpreter = interpreter;
    this.functionTable = {
        // name: [function, <signature>]
        // The <signature> can be:
        //
        // {
        //   args: [[type1, type2], [type1, type2]],
        //   variadic: true|false
        // }
        //
        // Each arg in the arg list is a list of valid types
        // (if the function is overloaded and supports multiple
        // types.  If the type is "any" then no type checking
        // occurs on the argument.  Variadic is optional
        // and if not provided is assumed to be false.
        abs: {_func: this._functionAbs, _signature: [{types: [TYPE_NUMBER]}]},
        avg: {_func: this._functionAvg, _signature: [{types: [TYPE_ARRAY_NUMBER]}]},
        ceil: {_func: this._functionCeil, _signature: [{types: [TYPE_NUMBER]}]},
        contains: {
            _func: this._functionContains,
            _signature: [{types: [TYPE_STRING, TYPE_ARRAY]},
                        {types: [TYPE_ANY]}]},
        "ends_with": {
            _func: this._functionEndsWith,
            _signature: [{types: [TYPE_STRING]}, {types: [TYPE_STRING]}]},
        floor: {_func: this._functionFloor, _signature: [{types: [TYPE_NUMBER]}]},
        length: {
            _func: this._functionLength,
            _signature: [{types: [TYPE_STRING, TYPE_ARRAY, TYPE_OBJECT]}]},
        map: {
            _func: this._functionMap,
            _signature: [{types: [TYPE_EXPREF]}, {types: [TYPE_ARRAY]}]},
        max: {
            _func: this._functionMax,
            _signature: [{types: [TYPE_ARRAY_NUMBER, TYPE_ARRAY_STRING]}]},
        "merge": {
            _func: this._functionMerge,
            _signature: [{types: [TYPE_OBJECT], variadic: true}]
        },
        "max_by": {
          _func: this._functionMaxBy,
          _signature: [{types: [TYPE_ARRAY]}, {types: [TYPE_EXPREF]}]
        },
        sum: {_func: this._functionSum, _signature: [{types: [TYPE_ARRAY_NUMBER]}]},
        "starts_with": {
            _func: this._functionStartsWith,
            _signature: [{types: [TYPE_STRING]}, {types: [TYPE_STRING]}]},
        min: {
            _func: this._functionMin,
            _signature: [{types: [TYPE_ARRAY_NUMBER, TYPE_ARRAY_STRING]}]},
        "min_by": {
          _func: this._functionMinBy,
          _signature: [{types: [TYPE_ARRAY]}, {types: [TYPE_EXPREF]}]
        },
        type: {_func: this._functionType, _signature: [{types: [TYPE_ANY]}]},
        keys: {_func: this._functionKeys, _signature: [{types: [TYPE_OBJECT]}]},
        values: {_func: this._functionValues, _signature: [{types: [TYPE_OBJECT]}]},
        sort: {_func: this._functionSort, _signature: [{types: [TYPE_ARRAY_STRING, TYPE_ARRAY_NUMBER]}]},
        "sort_by": {
          _func: this._functionSortBy,
          _signature: [{types: [TYPE_ARRAY]}, {types: [TYPE_EXPREF]}]
        },
        join: {
            _func: this._functionJoin,
            _signature: [
                {types: [TYPE_STRING]},
                {types: [TYPE_ARRAY_STRING]}
            ]
        },
        reverse: {
            _func: this._functionReverse,
            _signature: [{types: [TYPE_STRING, TYPE_ARRAY]}]},
        "to_array": {_func: this._functionToArray, _signature: [{types: [TYPE_ANY]}]},
        "to_string": {_func: this._functionToString, _signature: [{types: [TYPE_ANY]}]},
        "to_number": {_func: this._functionToNumber, _signature: [{types: [TYPE_ANY]}]},
        "not_null": {
            _func: this._functionNotNull,
            _signature: [{types: [TYPE_ANY], variadic: true}]
        }
    };
  }

  Runtime.prototype = {
    callFunction: function(name, resolvedArgs) {
      var functionEntry = this.functionTable[name];
      if (functionEntry === undefined) {
          throw new Error("Unknown function: " + name + "()");
      }
      this._validateArgs(name, resolvedArgs, functionEntry._signature);
      return functionEntry._func.call(this, resolvedArgs);
    },

    _validateArgs: function(name, args, signature) {
        // Validating the args requires validating
        // the correct arity and the correct type of each arg.
        // If the last argument is declared as variadic, then we need
        // a minimum number of args to be required.  Otherwise it has to
        // be an exact amount.
        var pluralized;
        if (signature[signature.length - 1].variadic) {
            if (args.length < signature.length) {
                pluralized = signature.length === 1 ? " argument" : " arguments";
                throw new Error("ArgumentError: " + name + "() " +
                                "takes at least" + signature.length + pluralized +
                                " but received " + args.length);
            }
        } else if (args.length !== signature.length) {
            pluralized = signature.length === 1 ? " argument" : " arguments";
            throw new Error("ArgumentError: " + name + "() " +
                            "takes " + signature.length + pluralized +
                            " but received " + args.length);
        }
        var currentSpec;
        var actualType;
        var typeMatched;
        for (var i = 0; i < signature.length; i++) {
            typeMatched = false;
            currentSpec = signature[i].types;
            actualType = this._getTypeName(args[i]);
            for (var j = 0; j < currentSpec.length; j++) {
                if (this._typeMatches(actualType, currentSpec[j], args[i])) {
                    typeMatched = true;
                    break;
                }
            }
            if (!typeMatched) {
                var expected = currentSpec
                    .map(function(typeIdentifier) {
                        return TYPE_NAME_TABLE[typeIdentifier];
                    })
                    .join(',');
                throw new Error("TypeError: " + name + "() " +
                                "expected argument " + (i + 1) +
                                " to be type " + expected +
                                " but received type " +
                                TYPE_NAME_TABLE[actualType] + " instead.");
            }
        }
    },

    _typeMatches: function(actual, expected, argValue) {
        if (expected === TYPE_ANY) {
            return true;
        }
        if (expected === TYPE_ARRAY_STRING ||
            expected === TYPE_ARRAY_NUMBER ||
            expected === TYPE_ARRAY) {
            // The expected type can either just be array,
            // or it can require a specific subtype (array of numbers).
            //
            // The simplest case is if "array" with no subtype is specified.
            if (expected === TYPE_ARRAY) {
                return actual === TYPE_ARRAY;
            } else if (actual === TYPE_ARRAY) {
                // Otherwise we need to check subtypes.
                // I think this has potential to be improved.
                var subtype;
                if (expected === TYPE_ARRAY_NUMBER) {
                  subtype = TYPE_NUMBER;
                } else if (expected === TYPE_ARRAY_STRING) {
                  subtype = TYPE_STRING;
                }
                for (var i = 0; i < argValue.length; i++) {
                    if (!this._typeMatches(
                            this._getTypeName(argValue[i]), subtype,
                                             argValue[i])) {
                        return false;
                    }
                }
                return true;
            }
        } else {
            return actual === expected;
        }
    },
    _getTypeName: function(obj) {
        switch (Object.prototype.toString.call(obj)) {
            case "[object String]":
              return TYPE_STRING;
            case "[object Number]":
              return TYPE_NUMBER;
            case "[object Array]":
              return TYPE_ARRAY;
            case "[object Boolean]":
              return TYPE_BOOLEAN;
            case "[object Null]":
              return TYPE_NULL;
            case "[object Object]":
              // Check if it's an expref.  If it has, it's been
              // tagged with a jmespathType attr of 'Expref';
              if (obj.jmespathType === TOK_EXPREF) {
                return TYPE_EXPREF;
              } else {
                return TYPE_OBJECT;
              }
        }
    },

    _functionStartsWith: function(resolvedArgs) {
        return resolvedArgs[0].lastIndexOf(resolvedArgs[1]) === 0;
    },

    _functionEndsWith: function(resolvedArgs) {
        var searchStr = resolvedArgs[0];
        var suffix = resolvedArgs[1];
        return searchStr.indexOf(suffix, searchStr.length - suffix.length) !== -1;
    },

    _functionReverse: function(resolvedArgs) {
        var typeName = this._getTypeName(resolvedArgs[0]);
        if (typeName === TYPE_STRING) {
          var originalStr = resolvedArgs[0];
          var reversedStr = "";
          for (var i = originalStr.length - 1; i >= 0; i--) {
              reversedStr += originalStr[i];
          }
          return reversedStr;
        } else {
          var reversedArray = resolvedArgs[0].slice(0);
          reversedArray.reverse();
          return reversedArray;
        }
    },

    _functionAbs: function(resolvedArgs) {
      return Math.abs(resolvedArgs[0]);
    },

    _functionCeil: function(resolvedArgs) {
        return Math.ceil(resolvedArgs[0]);
    },

    _functionAvg: function(resolvedArgs) {
        var sum = 0;
        var inputArray = resolvedArgs[0];
        for (var i = 0; i < inputArray.length; i++) {
            sum += inputArray[i];
        }
        return sum / inputArray.length;
    },

    _functionContains: function(resolvedArgs) {
        return resolvedArgs[0].indexOf(resolvedArgs[1]) >= 0;
    },

    _functionFloor: function(resolvedArgs) {
        return Math.floor(resolvedArgs[0]);
    },

    _functionLength: function(resolvedArgs) {
       if (!isObject(resolvedArgs[0])) {
         return resolvedArgs[0].length;
       } else {
         // As far as I can tell, there's no way to get the length
         // of an object without O(n) iteration through the object.
         return Object.keys(resolvedArgs[0]).length;
       }
    },

    _functionMap: function(resolvedArgs) {
      var mapped = [];
      var interpreter = this._interpreter;
      var exprefNode = resolvedArgs[0];
      var elements = resolvedArgs[1];
      for (var i = 0; i < elements.length; i++) {
          mapped.push(interpreter.visit(exprefNode, elements[i]));
      }
      return mapped;
    },

    _functionMerge: function(resolvedArgs) {
      var merged = {};
      for (var i = 0; i < resolvedArgs.length; i++) {
        var current = resolvedArgs[i];
        for (var key in current) {
          merged[key] = current[key];
        }
      }
      return merged;
    },

    _functionMax: function(resolvedArgs) {
      if (resolvedArgs[0].length > 0) {
        var typeName = this._getTypeName(resolvedArgs[0][0]);
        if (typeName === TYPE_NUMBER) {
          return Math.max.apply(Math, resolvedArgs[0]);
        } else {
          var elements = resolvedArgs[0];
          var maxElement = elements[0];
          for (var i = 1; i < elements.length; i++) {
              if (maxElement.localeCompare(elements[i]) < 0) {
                  maxElement = elements[i];
              }
          }
          return maxElement;
        }
      } else {
          return null;
      }
    },

    _functionMin: function(resolvedArgs) {
      if (resolvedArgs[0].length > 0) {
        var typeName = this._getTypeName(resolvedArgs[0][0]);
        if (typeName === TYPE_NUMBER) {
          return Math.min.apply(Math, resolvedArgs[0]);
        } else {
          var elements = resolvedArgs[0];
          var minElement = elements[0];
          for (var i = 1; i < elements.length; i++) {
              if (elements[i].localeCompare(minElement) < 0) {
                  minElement = elements[i];
              }
          }
          return minElement;
        }
      } else {
        return null;
      }
    },

    _functionSum: function(resolvedArgs) {
      var sum = 0;
      var listToSum = resolvedArgs[0];
      for (var i = 0; i < listToSum.length; i++) {
        sum += listToSum[i];
      }
      return sum;
    },

    _functionType: function(resolvedArgs) {
        switch (this._getTypeName(resolvedArgs[0])) {
          case TYPE_NUMBER:
            return "number";
          case TYPE_STRING:
            return "string";
          case TYPE_ARRAY:
            return "array";
          case TYPE_OBJECT:
            return "object";
          case TYPE_BOOLEAN:
            return "boolean";
          case TYPE_EXPREF:
            return "expref";
          case TYPE_NULL:
            return "null";
        }
    },

    _functionKeys: function(resolvedArgs) {
        return Object.keys(resolvedArgs[0]);
    },

    _functionValues: function(resolvedArgs) {
        var obj = resolvedArgs[0];
        var keys = Object.keys(obj);
        var values = [];
        for (var i = 0; i < keys.length; i++) {
            values.push(obj[keys[i]]);
        }
        return values;
    },

    _functionJoin: function(resolvedArgs) {
        var joinChar = resolvedArgs[0];
        var listJoin = resolvedArgs[1];
        return listJoin.join(joinChar);
    },

    _functionToArray: function(resolvedArgs) {
        if (this._getTypeName(resolvedArgs[0]) === TYPE_ARRAY) {
            return resolvedArgs[0];
        } else {
            return [resolvedArgs[0]];
        }
    },

    _functionToString: function(resolvedArgs) {
        if (this._getTypeName(resolvedArgs[0]) === TYPE_STRING) {
            return resolvedArgs[0];
        } else {
            return JSON.stringify(resolvedArgs[0]);
        }
    },

    _functionToNumber: function(resolvedArgs) {
        var typeName = this._getTypeName(resolvedArgs[0]);
        var convertedValue;
        if (typeName === TYPE_NUMBER) {
            return resolvedArgs[0];
        } else if (typeName === TYPE_STRING) {
            convertedValue = +resolvedArgs[0];
            if (!isNaN(convertedValue)) {
                return convertedValue;
            }
        }
        return null;
    },

    _functionNotNull: function(resolvedArgs) {
        for (var i = 0; i < resolvedArgs.length; i++) {
            if (this._getTypeName(resolvedArgs[i]) !== TYPE_NULL) {
                return resolvedArgs[i];
            }
        }
        return null;
    },

    _functionSort: function(resolvedArgs) {
        var sortedArray = resolvedArgs[0].slice(0);
        sortedArray.sort();
        return sortedArray;
    },

    _functionSortBy: function(resolvedArgs) {
        var sortedArray = resolvedArgs[0].slice(0);
        if (sortedArray.length === 0) {
            return sortedArray;
        }
        var interpreter = this._interpreter;
        var exprefNode = resolvedArgs[1];
        var requiredType = this._getTypeName(
            interpreter.visit(exprefNode, sortedArray[0]));
        if ([TYPE_NUMBER, TYPE_STRING].indexOf(requiredType) < 0) {
            throw new Error("TypeError");
        }
        var that = this;
        // In order to get a stable sort out of an unstable
        // sort algorithm, we decorate/sort/undecorate (DSU)
        // by creating a new list of [index, element] pairs.
        // In the cmp function, if the evaluated elements are
        // equal, then the index will be used as the tiebreaker.
        // After the decorated list has been sorted, it will be
        // undecorated to extract the original elements.
        var decorated = [];
        for (var i = 0; i < sortedArray.length; i++) {
          decorated.push([i, sortedArray[i]]);
        }
        decorated.sort(function(a, b) {
          var exprA = interpreter.visit(exprefNode, a[1]);
          var exprB = interpreter.visit(exprefNode, b[1]);
          if (that._getTypeName(exprA) !== requiredType) {
              throw new Error(
                  "TypeError: expected " + requiredType + ", received " +
                  that._getTypeName(exprA));
          } else if (that._getTypeName(exprB) !== requiredType) {
              throw new Error(
                  "TypeError: expected " + requiredType + ", received " +
                  that._getTypeName(exprB));
          }
          if (exprA > exprB) {
            return 1;
          } else if (exprA < exprB) {
            return -1;
          } else {
            // If they're equal compare the items by their
            // order to maintain relative order of equal keys
            // (i.e. to get a stable sort).
            return a[0] - b[0];
          }
        });
        // Undecorate: extract out the original list elements.
        for (var j = 0; j < decorated.length; j++) {
          sortedArray[j] = decorated[j][1];
        }
        return sortedArray;
    },

    _functionMaxBy: function(resolvedArgs) {
      var exprefNode = resolvedArgs[1];
      var resolvedArray = resolvedArgs[0];
      var keyFunction = this.createKeyFunction(exprefNode, [TYPE_NUMBER, TYPE_STRING]);
      var maxNumber = -Infinity;
      var maxRecord;
      var current;
      for (var i = 0; i < resolvedArray.length; i++) {
        current = keyFunction(resolvedArray[i]);
        if (current > maxNumber) {
          maxNumber = current;
          maxRecord = resolvedArray[i];
        }
      }
      return maxRecord;
    },

    _functionMinBy: function(resolvedArgs) {
      var exprefNode = resolvedArgs[1];
      var resolvedArray = resolvedArgs[0];
      var keyFunction = this.createKeyFunction(exprefNode, [TYPE_NUMBER, TYPE_STRING]);
      var minNumber = Infinity;
      var minRecord;
      var current;
      for (var i = 0; i < resolvedArray.length; i++) {
        current = keyFunction(resolvedArray[i]);
        if (current < minNumber) {
          minNumber = current;
          minRecord = resolvedArray[i];
        }
      }
      return minRecord;
    },

    createKeyFunction: function(exprefNode, allowedTypes) {
      var that = this;
      var interpreter = this._interpreter;
      var keyFunc = function(x) {
        var current = interpreter.visit(exprefNode, x);
        if (allowedTypes.indexOf(that._getTypeName(current)) < 0) {
          var msg = "TypeError: expected one of " + allowedTypes +
                    ", received " + that._getTypeName(current);
          throw new Error(msg);
        }
        return current;
      };
      return keyFunc;
    }

  };

  function compile(stream) {
    var parser = new Parser();
    var ast = parser.parse(stream);
    return ast;
  }

  function tokenize(stream) {
      var lexer = new Lexer();
      return lexer.tokenize(stream);
  }

  function search(data, expression) {
      var parser = new Parser();
      // This needs to be improved.  Both the interpreter and runtime depend on
      // each other.  The runtime needs the interpreter to support exprefs.
      // There's likely a clean way to avoid the cyclic dependency.
      var runtime = new Runtime();
      var interpreter = new TreeInterpreter(runtime);
      runtime._interpreter = interpreter;
      var node = parser.parse(expression);
      return interpreter.search(node, data);
  }

  exports.tokenize = tokenize;
  exports.compile = compile;
  exports.search = search;
  exports.strictDeepEqual = strictDeepEqual;
})( false ? 0 : exports);


/***/ }),

/***/ 94:
/***/ (function(__unused_webpack_module, exports) {

"use strict";


var escapedChars = {
  'b': '\b',
  'f': '\f',
  'n': '\n',
  'r': '\r',
  't': '\t',
  '"': '"',
  '/': '/',
  '\\': '\\'
};

var A_CODE = 'a'.charCodeAt();


exports.parse = function (source, _, options) {
  var pointers = {};
  var line = 0;
  var column = 0;
  var pos = 0;
  var bigint = options && options.bigint && typeof BigInt != 'undefined';
  return {
    data: _parse('', true),
    pointers: pointers
  };

  function _parse(ptr, topLevel) {
    whitespace();
    var data;
    map(ptr, 'value');
    var char = getChar();
    switch (char) {
      case 't': read('rue'); data = true; break;
      case 'f': read('alse'); data = false; break;
      case 'n': read('ull'); data = null; break;
      case '"': data = parseString(); break;
      case '[': data = parseArray(ptr); break;
      case '{': data = parseObject(ptr); break;
      default:
        backChar();
        if ('-0123456789'.indexOf(char) >= 0)
          data = parseNumber();
        else
          unexpectedToken();
    }
    map(ptr, 'valueEnd');
    whitespace();
    if (topLevel && pos < source.length) unexpectedToken();
    return data;
  }

  function whitespace() {
    loop:
      while (pos < source.length) {
        switch (source[pos]) {
          case ' ': column++; break;
          case '\t': column += 4; break;
          case '\r': column = 0; break;
          case '\n': column = 0; line++; break;
          default: break loop;
        }
        pos++;
      }
  }

  function parseString() {
    var str = '';
    var char;
    while (true) {
      char = getChar();
      if (char == '"') {
        break;
      } else if (char == '\\') {
        char = getChar();
        if (char in escapedChars)
          str += escapedChars[char];
        else if (char == 'u')
          str += getCharCode();
        else
          wasUnexpectedToken();
      } else {
        str += char;
      }
    }
    return str;
  }

  function parseNumber() {
    var numStr = '';
    var integer = true;
    if (source[pos] == '-') numStr += getChar();

    numStr += source[pos] == '0'
              ? getChar()
              : getDigits();

    if (source[pos] == '.') {
      numStr += getChar() + getDigits();
      integer = false;
    }

    if (source[pos] == 'e' || source[pos] == 'E') {
      numStr += getChar();
      if (source[pos] == '+' || source[pos] == '-') numStr += getChar();
      numStr += getDigits();
      integer = false;
    }

    var result = +numStr;
    return bigint && integer && (result > Number.MAX_SAFE_INTEGER || result < Number.MIN_SAFE_INTEGER)
            ? BigInt(numStr)
            : result;
  }

  function parseArray(ptr) {
    whitespace();
    var arr = [];
    var i = 0;
    if (getChar() == ']') return arr;
    backChar();

    while (true) {
      var itemPtr = ptr + '/' + i;
      arr.push(_parse(itemPtr));
      whitespace();
      var char = getChar();
      if (char == ']') break;
      if (char != ',') wasUnexpectedToken();
      whitespace();
      i++;
    }
    return arr;
  }

  function parseObject(ptr) {
    whitespace();
    var obj = {};
    if (getChar() == '}') return obj;
    backChar();

    while (true) {
      var loc = getLoc();
      if (getChar() != '"') wasUnexpectedToken();
      var key = parseString();
      var propPtr = ptr + '/' + escapeJsonPointer(key);
      mapLoc(propPtr, 'key', loc);
      map(propPtr, 'keyEnd');
      whitespace();
      if (getChar() != ':') wasUnexpectedToken();
      whitespace();
      obj[key] = _parse(propPtr);
      whitespace();
      var char = getChar();
      if (char == '}') break;
      if (char != ',') wasUnexpectedToken();
      whitespace();
    }
    return obj;
  }

  function read(str) {
    for (var i=0; i<str.length; i++)
      if (getChar() !== str[i]) wasUnexpectedToken();
  }

  function getChar() {
    checkUnexpectedEnd();
    var char = source[pos];
    pos++;
    column++; // new line?
    return char;
  }

  function backChar() {
    pos--;
    column--;
  }

  function getCharCode() {
    var count = 4;
    var code = 0;
    while (count--) {
      code <<= 4;
      var char = getChar().toLowerCase();
      if (char >= 'a' && char <= 'f')
        code += char.charCodeAt() - A_CODE + 10;
      else if (char >= '0' && char <= '9')
        code += +char;
      else
        wasUnexpectedToken();
    }
    return String.fromCharCode(code);
  }

  function getDigits() {
    var digits = '';
    while (source[pos] >= '0' && source[pos] <= '9')
      digits += getChar();

    if (digits.length) return digits;
    checkUnexpectedEnd();
    unexpectedToken();
  }

  function map(ptr, prop) {
    mapLoc(ptr, prop, getLoc());
  }

  function mapLoc(ptr, prop, loc) {
    pointers[ptr] = pointers[ptr] || {};
    pointers[ptr][prop] = loc;
  }

  function getLoc() {
    return {
      line: line,
      column: column,
      pos: pos
    };
  }

  function unexpectedToken() {
    throw new SyntaxError('Unexpected token ' + source[pos] + ' in JSON at position ' + pos);
  }

  function wasUnexpectedToken() {
    backChar();
    unexpectedToken();
  }

  function checkUnexpectedEnd() {
    if (pos >= source.length)
      throw new SyntaxError('Unexpected end of JSON input');
  }
};


exports.stringify = function (data, _, options) {
  if (!validType(data)) return;
  var wsLine = 0;
  var wsPos, wsColumn;
  var whitespace = typeof options == 'object'
                    ? options.space
                    : options;
  switch (typeof whitespace) {
    case 'number':
      var len = whitespace > 10
                  ? 10
                  : whitespace < 0
                    ? 0
                    : Math.floor(whitespace);
      whitespace = len && repeat(len, ' ');
      wsPos = len;
      wsColumn = len;
      break;
    case 'string':
      whitespace = whitespace.slice(0, 10);
      wsPos = 0;
      wsColumn = 0;
      for (var j=0; j<whitespace.length; j++) {
        var char = whitespace[j];
        switch (char) {
          case ' ': wsColumn++; break;
          case '\t': wsColumn += 4; break;
          case '\r': wsColumn = 0; break;
          case '\n': wsColumn = 0; wsLine++; break;
          default: throw new Error('whitespace characters not allowed in JSON');
        }
        wsPos++;
      }
      break;
    default:
      whitespace = undefined;
  }

  var json = '';
  var pointers = {};
  var line = 0;
  var column = 0;
  var pos = 0;
  var es6 = options && options.es6 && typeof Map == 'function';
  _stringify(data, 0, '');
  return {
    json: json,
    pointers: pointers
  };

  function _stringify(_data, lvl, ptr) {
    map(ptr, 'value');
    switch (typeof _data) {
      case 'number':
      case 'bigint':
      case 'boolean':
        out('' + _data); break;
      case 'string':
        out(quoted(_data)); break;
      case 'object':
        if (_data === null) {
          out('null');
        } else if (typeof _data.toJSON == 'function') {
          out(quoted(_data.toJSON()));
        } else if (Array.isArray(_data)) {
          stringifyArray();
        } else if (es6) {
          if (_data.constructor.BYTES_PER_ELEMENT)
            stringifyArray();
          else if (_data instanceof Map)
            stringifyMapSet();
          else if (_data instanceof Set)
            stringifyMapSet(true);
          else
            stringifyObject();
        } else {
          stringifyObject();
        }
    }
    map(ptr, 'valueEnd');

    function stringifyArray() {
      if (_data.length) {
        out('[');
        var itemLvl = lvl + 1;
        for (var i=0; i<_data.length; i++) {
          if (i) out(',');
          indent(itemLvl);
          var item = validType(_data[i]) ? _data[i] : null;
          var itemPtr = ptr + '/' + i;
          _stringify(item, itemLvl, itemPtr);
        }
        indent(lvl);
        out(']');
      } else {
        out('[]');
      }
    }

    function stringifyObject() {
      var keys = Object.keys(_data);
      if (keys.length) {
        out('{');
        var propLvl = lvl + 1;
        for (var i=0; i<keys.length; i++) {
          var key = keys[i];
          var value = _data[key];
          if (validType(value)) {
            if (i) out(',');
            var propPtr = ptr + '/' + escapeJsonPointer(key);
            indent(propLvl);
            map(propPtr, 'key');
            out(quoted(key));
            map(propPtr, 'keyEnd');
            out(':');
            if (whitespace) out(' ');
            _stringify(value, propLvl, propPtr);
          }
        }
        indent(lvl);
        out('}');
      } else {
        out('{}');
      }
    }

    function stringifyMapSet(isSet) {
      if (_data.size) {
        out('{');
        var propLvl = lvl + 1;
        var first = true;
        var entries = _data.entries();
        var entry = entries.next();
        while (!entry.done) {
          var item = entry.value;
          var key = item[0];
          var value = isSet ? true : item[1];
          if (validType(value)) {
            if (!first) out(',');
            first = false;
            var propPtr = ptr + '/' + escapeJsonPointer(key);
            indent(propLvl);
            map(propPtr, 'key');
            out(quoted(key));
            map(propPtr, 'keyEnd');
            out(':');
            if (whitespace) out(' ');
            _stringify(value, propLvl, propPtr);
          }
          entry = entries.next();
        }
        indent(lvl);
        out('}');
      } else {
        out('{}');
      }
    }
  }

  function out(str) {
    column += str.length;
    pos += str.length;
    json += str;
  }

  function indent(lvl) {
    if (whitespace) {
      json += '\n' + repeat(lvl, whitespace);
      line++;
      column = 0;
      while (lvl--) {
        if (wsLine) {
          line += wsLine;
          column = wsColumn;
        } else {
          column += wsColumn;
        }
        pos += wsPos;
      }
      pos += 1; // \n character
    }
  }

  function map(ptr, prop) {
    pointers[ptr] = pointers[ptr] || {};
    pointers[ptr][prop] = {
      line: line,
      column: column,
      pos: pos
    };
  }

  function repeat(n, str) {
    return Array(n + 1).join(str);
  }
};


var VALID_TYPES = ['number', 'bigint', 'boolean', 'string', 'object'];
function validType(data) {
  return VALID_TYPES.indexOf(typeof data) >= 0;
}


var ESC_QUOTE = /"|\\/g;
var ESC_B = /[\b]/g;
var ESC_F = /\f/g;
var ESC_N = /\n/g;
var ESC_R = /\r/g;
var ESC_T = /\t/g;
function quoted(str) {
  str = str.replace(ESC_QUOTE, '\\$&')
           .replace(ESC_F, '\\f')
           .replace(ESC_B, '\\b')
           .replace(ESC_N, '\\n')
           .replace(ESC_R, '\\r')
           .replace(ESC_T, '\\t');
  return '"' + str + '"';
}


var ESC_0 = /~/g;
var ESC_1 = /\//g;
function escapeJsonPointer(str) {
  return str.replace(ESC_0, '~0')
            .replace(ESC_1, '~1');
}


/***/ }),

/***/ 340:
/***/ (function(module, exports) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

(function (root, factory) {
    "use strict";

    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
		__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
		(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    }
    else {}
}(this, function () {

    /**
     * A self-contained modal library
     */
    "use strict";

    /** Returns whether a value is a dom node */
    function isNode(value) {
        if ( typeof Node === "object" ) {
            return value instanceof Node;
        }
        else {
            return value && typeof value === "object" && typeof value.nodeType === "number";
        }
    }

    /** Returns whether a value is a string */
    function isString(value) {
        return typeof value === "string";
    }

    /**
     * Generates observable objects that can be watched and triggered
     */
    function observable() {
        var callbacks = [];
        return {
            watch: callbacks.push.bind(callbacks),
            trigger: function(context, detail) {

                var unprevented = true;
                var event = {
                    detail: detail,
                    preventDefault: function preventDefault () {
                        unprevented = false;
                    }
                };

                for (var i = 0; i < callbacks.length; i++) {
                    callbacks[i](context, event);
                }

                return unprevented;
            }
        };
    }


    /** Whether an element is hidden */
    function isHidden ( elem ) {
        // @see http://stackoverflow.com/questions/19669786
        return window.getComputedStyle(elem).display === 'none';
    }


    /**
     * A small interface for creating and managing a dom element
     */
    function Elem( elem ) {
        this.elem = elem;
    }

    /** Creates a new div */
    Elem.make = function ( parent, tag ) {
        if ( typeof parent === "string" ) {
            parent = document.querySelector(parent);
        }
        var elem = document.createElement(tag || 'div');
        (parent || document.body).appendChild(elem);
        return new Elem(elem);
    };

    Elem.prototype = {

        /** Creates a child of this node */
        child: function (tag) {
            return Elem.make(this.elem, tag);
        },

        /** Applies a set of styles to an element */
        stylize: function(styles) {
            styles = styles || {};

            if ( typeof styles.opacity !== "undefined" ) {
                styles.filter = "alpha(opacity=" + (styles.opacity * 100) + ")";
            }

            for (var prop in styles) {
                if (styles.hasOwnProperty(prop)) {
                    this.elem.style[prop] = styles[prop];
                }
            }

            return this;
        },

        /** Adds a class name */
        clazz: function (clazz) {
            this.elem.className += " " + clazz;
            return this;
        },

        /** Sets the HTML */
        html: function (content) {
            if ( isNode(content) ) {
                this.elem.appendChild( content );
            }
            else {
                this.elem.innerHTML = content;
            }
            return this;
        },

        /** Adds a click handler to this element */
        onClick: function(callback) {
            this.elem.addEventListener('click', callback);
            return this;
        },

        /** Removes this element from the DOM */
        destroy: function() {
            this.elem.parentNode.removeChild(this.elem);
        },

        /** Hides this element */
        hide: function() {
            this.elem.style.display = "none";
        },

        /** Shows this element */
        show: function() {
            this.elem.style.display = "block";
        },

        /** Sets an attribute on this element */
        attr: function ( name, value ) {
            if (value !== undefined) {
                this.elem.setAttribute(name, value);
            }
            return this;
        },

        /** Executes a callback on all the ancestors of an element */
        anyAncestor: function ( predicate ) {
            var elem = this.elem;
            while ( elem ) {
                if ( predicate( new Elem(elem) ) ) {
                    return true;
                }
                else {
                    elem = elem.parentNode;
                }
            }
            return false;
        },

        /** Whether this element is visible */
        isVisible: function () {
            return !isHidden(this.elem);
        }
    };


    /** Generates the grey-out effect */
    function buildOverlay( getOption, close ) {
        return Elem.make( getOption("parent") )
            .clazz("pico-overlay")
            .clazz( getOption("overlayClass", "") )
            .stylize({
                display: "none",
                position: "fixed",
                top: "0px",
                left: "0px",
                height: "100%",
                width: "100%",
                zIndex: 10000
            })
            .stylize(getOption('overlayStyles', {
                opacity: 0.5,
                background: "#000"
            }))
            .onClick(function () {
                if ( getOption('overlayClose', true) ) {
                    close();
                }
            });
    }

    // An auto incrementing ID assigned to each modal
    var autoinc = 1;

    /** Builds the content of a modal */
    function buildModal( getOption, close ) {
        var width = getOption('width', 'auto');
        if ( typeof width === "number" ) {
            width = "" + width + "px";
        }

        var id = getOption("modalId", "pico-" + autoinc++);

        var elem = Elem.make( getOption("parent") )
            .clazz("pico-content")
            .clazz( getOption("modalClass", "") )
            .stylize({
                display: 'none',
                position: 'fixed',
                zIndex: 10001,
                left: "50%",
                top: "38.1966%",
                maxHeight: '90%',
                boxSizing: 'border-box',
                width: width,
                '-ms-transform': 'translate(-50%,-38.1966%)',
                '-moz-transform': 'translate(-50%,-38.1966%)',
                '-webkit-transform': 'translate(-50%,-38.1966%)',
                '-o-transform': 'translate(-50%,-38.1966%)',
                transform: 'translate(-50%,-38.1966%)'
            })
            .stylize(getOption('modalStyles', {
                overflow: 'auto',
                backgroundColor: "white",
                padding: "20px",
                borderRadius: "5px"
            }))
            .html( getOption('content') )
            .attr("id", id)
            .attr("role", "dialog")
            .attr("aria-labelledby", getOption("ariaLabelledBy"))
            .attr("aria-describedby", getOption("ariaDescribedBy", id))
            .onClick(function (event) {
                var isCloseClick = new Elem(event.target).anyAncestor(function (elem) {
                    return /\bpico-close\b/.test(elem.elem.className);
                });
                if ( isCloseClick ) {
                    close();
                }
            });

        return elem;
    }

    /** Builds the close button */
    function buildClose ( elem, getOption ) {
        if ( getOption('closeButton', true) ) {
            return elem.child('button')
                .html( getOption('closeHtml', "&#xD7;") )
                .clazz("pico-close")
                .clazz( getOption("closeClass", "") )
                .stylize( getOption('closeStyles', {
                    borderRadius: "2px",
                    border: 0,
                    padding: 0,
                    cursor: "pointer",
                    height: "15px",
                    width: "15px",
                    position: "absolute",
                    top: "5px",
                    right: "5px",
                    fontSize: "16px",
                    textAlign: "center",
                    lineHeight: "15px",
                    background: "#CCC"
                }) )
                .attr("aria-label", getOption("close-label", "Close"));
        }
    }

    /** Builds a method that calls a method and returns an element */
    function buildElemAccessor( builder ) {
        return function () {
            return builder().elem;
        };
    }


    // An observable that is triggered whenever the escape key is pressed
    var escapeKey = observable();

    // An observable that is triggered when the user hits the tab key
    var tabKey = observable();

    /** A global event handler to detect the escape key being pressed */
    document.documentElement.addEventListener('keydown', function onKeyPress (event) {
        var keycode = event.which || event.keyCode;

        // If this is the escape key
        if ( keycode === 27 ) {
            escapeKey.trigger();
        }

        // If this is the tab key
        else if ( keycode === 9 ) {
            tabKey.trigger(event);
        }
    });


    /** Attaches focus management events */
    function manageFocus ( iface, isEnabled ) {

        /** Whether an element matches a selector */
        function matches ( elem, selector ) {
            var fn = elem.msMatchesSelector || elem.webkitMatchesSelector || elem.matches;
            return fn.call(elem, selector);
        }

        /**
         * Returns whether an element is focusable
         * @see http://stackoverflow.com/questions/18261595
         */
        function canFocus( elem ) {
            if (
                isHidden(elem) ||
                matches(elem, ":disabled") ||
                elem.hasAttribute("contenteditable")
            ) {
                return false;
            }
            else {
                return elem.hasAttribute("tabindex") ||
                    matches(elem, "input,select,textarea,button,a[href],area[href],iframe");
            }
        }

        /** Returns the first descendant that can be focused */
        function firstFocusable ( elem ) {
            var items = elem.getElementsByTagName("*");
            for (var i = 0; i < items.length; i++) {
                if ( canFocus(items[i]) ) {
                    return items[i];
                }
            }
        }

        /** Returns the last descendant that can be focused */
        function lastFocusable ( elem ) {
            var items = elem.getElementsByTagName("*");
            for (var i = items.length; i--;) {
                if ( canFocus(items[i]) ) {
                    return items[i];
                }
            }
        }

        // The element focused before the modal opens
        var focused;

        // Records the currently focused element so state can be returned
        // after the modal closes
        iface.beforeShow(function getActiveFocus() {
            focused = document.activeElement;
        });

        // Shift focus into the modal
        iface.afterShow(function focusModal() {
            if ( isEnabled() ) {
                var focusable = firstFocusable(iface.modalElem());
                if ( focusable ) {
                    focusable.focus();
                }
            }
        });

        // Restore the previously focused element when the modal closes
        iface.afterClose(function returnFocus() {
            if ( isEnabled() && focused ) {
                focused.focus();
            }
            focused = null;
        });

        // Capture tab key presses and loop them within the modal
        tabKey.watch(function tabKeyPress (event) {
            if ( isEnabled() && iface.isVisible() ) {
                var first = firstFocusable(iface.modalElem());
                var last = lastFocusable(iface.modalElem());

                var from = event.shiftKey ? first : last;
                if ( from === document.activeElement ) {
                    (event.shiftKey ? last : first).focus();
                    event.preventDefault();
                }
            }
        });
    }

    /** Manages setting the 'overflow: hidden' on the body tag */
    function manageBodyOverflow(iface, isEnabled) {
        var origOverflow;
        var body = new Elem(document.body);

        iface.beforeShow(function () {
            // Capture the current values so they can be restored
            origOverflow = body.elem.style.overflow;

            if (isEnabled()) {
                body.stylize({ overflow: "hidden" });
            }
        });

        iface.afterClose(function () {
            body.stylize({ overflow: origOverflow });
        });
    }

    /**
     * Displays a modal
     */
    return function picoModal(options) {

        if ( isString(options) || isNode(options) ) {
            options = { content: options };
        }

        var afterCreateEvent = observable();
        var beforeShowEvent = observable();
        var afterShowEvent = observable();
        var beforeCloseEvent = observable();
        var afterCloseEvent = observable();

        /**
         * Returns a named option if it has been explicitly defined. Otherwise,
         * it returns the given default value
         */
        function getOption ( opt, defaultValue ) {
            var value = options[opt];
            if ( typeof value === "function" ) {
                value = value( defaultValue );
            }
            return value === undefined ? defaultValue : value;
        }


        // The various DOM elements that constitute the modal
        var modalElem = build.bind(window, 'modal');
        var shadowElem = build.bind(window, 'overlay');
        var closeElem = build.bind(window, 'close');

        // This will eventually contain the modal API returned to the user
        var iface;


        /** Hides this modal */
        function forceClose (detail) {
            shadowElem().hide();
            modalElem().hide();
            afterCloseEvent.trigger(iface, detail);
        }

        /** Gracefully hides this modal */
        function close (detail) {
            if ( beforeCloseEvent.trigger(iface, detail) ) {
                forceClose(detail);
            }
        }

        /** Wraps a method so it returns the modal interface */
        function returnIface ( callback ) {
            return function () {
                callback.apply(this, arguments);
                return iface;
            };
        }


        // The constructed dom nodes
        var built;

        /** Builds a method that calls a method and returns an element */
        function build (name, detail) {
            if ( !built ) {
                var modal = buildModal(getOption, close);
                built = {
                    modal: modal,
                    overlay: buildOverlay(getOption, close),
                    close: buildClose(modal, getOption)
                };
                afterCreateEvent.trigger(iface, detail);
            }
            return built[name];
        }

        iface = {

            /** Returns the wrapping modal element */
            modalElem: buildElemAccessor(modalElem),

            /** Returns the close button element */
            closeElem: buildElemAccessor(closeElem),

            /** Returns the overlay element */
            overlayElem: buildElemAccessor(shadowElem),

            /** Builds the dom without showing the modal */
            buildDom: returnIface(build.bind(null, null)),

            /** Returns whether this modal is currently being shown */
            isVisible: function () {
                return !!(built && modalElem && modalElem().isVisible());
            },

            /** Shows this modal */
            show: function (detail) {
                if ( beforeShowEvent.trigger(iface, detail) ) {
                    shadowElem().show();
                    closeElem();
                    modalElem().show();
                    afterShowEvent.trigger(iface, detail);
                }
                return this;
            },

            /** Hides this modal */
            close: returnIface(close),

            /**
             * Force closes this modal. This will not call beforeClose
             * events and will just immediately hide the modal
             */
            forceClose: returnIface(forceClose),

            /** Destroys this modal */
            destroy: function () {
                modalElem().destroy();
                shadowElem().destroy();
                shadowElem = modalElem = closeElem = undefined;
            },

            /**
             * Updates the options for this modal. This will only let you
             * change options that are re-evaluted regularly, such as
             * `overlayClose`.
             */
            options: function ( opts ) {
                Object.keys(opts).map(function (key) {
                    options[key] = opts[key];
                });
            },

            /** Executes after the DOM nodes are created */
            afterCreate: returnIface(afterCreateEvent.watch),

            /** Executes a callback before this modal is closed */
            beforeShow: returnIface(beforeShowEvent.watch),

            /** Executes a callback after this modal is shown */
            afterShow: returnIface(afterShowEvent.watch),

            /** Executes a callback before this modal is closed */
            beforeClose: returnIface(beforeCloseEvent.watch),

            /** Executes a callback after this modal is closed */
            afterClose: returnIface(afterCloseEvent.watch)
        };

        manageFocus(iface, getOption.bind(null, "focus", true));

        manageBodyOverflow(iface, getOption.bind(null, "bodyOverflow", true));

        // If a user presses the 'escape' key, close the modal.
        escapeKey.watch(function escapeKeyPress () {
            if ( getOption("escCloses", true) && iface.isVisible() ) {
                iface.close();
            }
        });

        return iface;
    };

}));


/***/ }),

/***/ 857:
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  m: function() { return /* binding */ jsonrepair; }
});

;// ./node_modules/jsonrepair/lib/esm/utils/JSONRepairError.js
class JSONRepairError extends Error {
  constructor(message, position) {
    super(`${message} at position ${position}`);
    this.position = position;
  }
}

;// ./node_modules/jsonrepair/lib/esm/utils/stringUtils.js
const codeBackslash = 0x5c; // "\"
const codeSlash = 0x2f; // "/"
const codeAsterisk = 0x2a; // "*"
const codeOpeningBrace = 0x7b; // "{"
const codeClosingBrace = 0x7d; // "}"
const codeOpeningBracket = 0x5b; // "["
const codeClosingBracket = 0x5d; // "]"
const codeOpenParenthesis = 0x28; // "("
const codeCloseParenthesis = 0x29; // ")"
const codeSpace = 0x20; // " "
const codeNewline = 0xa; // "\n"
const codeTab = 0x9; // "\t"
const codeReturn = 0xd; // "\r"
const codeBackspace = 0x08; // "\b"
const codeFormFeed = 0x0c; // "\f"
const codeDoubleQuote = 0x0022; // "
const codePlus = 0x2b; // "+"
const codeMinus = 0x2d; // "-"
const codeQuote = 0x27; // "'"
const codeZero = 0x30; // "0"
const codeNine = 0x39; // "9"
const codeComma = 0x2c; // ","
const codeDot = 0x2e; // "." (dot, period)
const codeColon = 0x3a; // ":"
const codeSemicolon = 0x3b; // ";"
const codeUppercaseA = 0x41; // "A"
const codeLowercaseA = 0x61; // "a"
const codeUppercaseE = 0x45; // "E"
const codeLowercaseE = 0x65; // "e"
const codeUppercaseF = 0x46; // "F"
const codeLowercaseF = 0x66; // "f"
const codeNonBreakingSpace = 0xa0;
const codeEnQuad = 0x2000;
const codeHairSpace = 0x200a;
const codeNarrowNoBreakSpace = 0x202f;
const codeMediumMathematicalSpace = 0x205f;
const codeIdeographicSpace = 0x3000;
const codeDoubleQuoteLeft = 0x201c; // “
const codeDoubleQuoteRight = 0x201d; // ”
const codeQuoteLeft = 0x2018; // ‘
const codeQuoteRight = 0x2019; // ’
const codeGraveAccent = 0x0060; // `
const codeAcuteAccent = 0x00b4; // ´

function isHex(code) {
  return code >= codeZero && code <= codeNine || code >= codeUppercaseA && code <= codeUppercaseF || code >= codeLowercaseA && code <= codeLowercaseF;
}
function isDigit(code) {
  return code >= codeZero && code <= codeNine;
}
function isValidStringCharacter(code) {
  return code >= 0x20 && code <= 0x10ffff;
}
function isDelimiter(char) {
  return regexDelimiter.test(char);
}
const regexDelimiter = /^[,:[\]/{}()\n+]$/;
const regexUnquotedStringDelimiter = /^[,[\]/{}\n+]$/;
const regexFunctionNameCharStart = /^[a-zA-Z_$]$/;
const regexFunctionNameChar = /^[a-zA-Z_$0-9]$/;

// matches "https://" and other schemas
const regexUrlStart = /^(http|https|ftp|mailto|file|data|irc):\/\/$/;

// matches all valid URL characters EXCEPT "[", "]", and ",", since that are important JSON delimiters
const regexUrlChar = /^[A-Za-z0-9-._~:/?#@!$&'()*+;=]$/;
function isUnquotedStringDelimiter(char) {
  return regexUnquotedStringDelimiter.test(char);
}
function isStartOfValue(char) {
  return regexStartOfValue.test(char) || char && isQuote(char.charCodeAt(0));
}

// alpha, number, minus, or opening bracket or brace
const regexStartOfValue = /^[[{\w-]$/;
function isControlCharacter(code) {
  return code === codeNewline || code === codeReturn || code === codeTab || code === codeBackspace || code === codeFormFeed;
}

/**
 * Check if the given character is a whitespace character like space, tab, or
 * newline
 */
function isWhitespace(code) {
  return code === codeSpace || code === codeNewline || code === codeTab || code === codeReturn;
}

/**
 * Check if the given character is a special whitespace character, some
 * unicode variant
 */
function isSpecialWhitespace(code) {
  return code === codeNonBreakingSpace || code >= codeEnQuad && code <= codeHairSpace || code === codeNarrowNoBreakSpace || code === codeMediumMathematicalSpace || code === codeIdeographicSpace;
}

/**
 * Test whether the given character is a quote or double quote character.
 * Also tests for special variants of quotes.
 */
function isQuote(code) {
  // the first check double quotes, since that occurs most often
  return isDoubleQuoteLike(code) || isSingleQuoteLike(code);
}

/**
 * Test whether the given character is a double quote character.
 * Also tests for special variants of double quotes.
 */
function isDoubleQuoteLike(code) {
  // the first check double quotes, since that occurs most often
  return code === codeDoubleQuote || code === codeDoubleQuoteLeft || code === codeDoubleQuoteRight;
}

/**
 * Test whether the given character is a double quote character.
 * Does NOT test for special variants of double quotes.
 */
function isDoubleQuote(code) {
  return code === codeDoubleQuote;
}

/**
 * Test whether the given character is a single quote character.
 * Also tests for special variants of single quotes.
 */
function isSingleQuoteLike(code) {
  return code === codeQuote || code === codeQuoteLeft || code === codeQuoteRight || code === codeGraveAccent || code === codeAcuteAccent;
}

/**
 * Test whether the given character is a single quote character.
 * Does NOT test for special variants of single quotes.
 */
function isSingleQuote(code) {
  return code === codeQuote;
}

/**
 * Strip last occurrence of textToStrip from text
 */
function stripLastOccurrence(text, textToStrip) {
  let stripRemainingText = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  const index = text.lastIndexOf(textToStrip);
  return index !== -1 ? text.substring(0, index) + (stripRemainingText ? '' : text.substring(index + 1)) : text;
}
function insertBeforeLastWhitespace(text, textToInsert) {
  let index = text.length;
  if (!isWhitespace(text.charCodeAt(index - 1))) {
    // no trailing whitespaces
    return text + textToInsert;
  }
  while (isWhitespace(text.charCodeAt(index - 1))) {
    index--;
  }
  return text.substring(0, index) + textToInsert + text.substring(index);
}
function removeAtIndex(text, start, count) {
  return text.substring(0, start) + text.substring(start + count);
}

/**
 * Test whether a string ends with a newline or comma character and optional whitespace
 */
function endsWithCommaOrNewline(text) {
  return /[,\n][ \t\r]*$/.test(text);
}

;// ./node_modules/jsonrepair/lib/esm/regular/jsonrepair.js


const controlCharacters = {
  '\b': '\\b',
  '\f': '\\f',
  '\n': '\\n',
  '\r': '\\r',
  '\t': '\\t'
};

// map with all escape characters
const escapeCharacters = {
  '"': '"',
  '\\': '\\',
  '/': '/',
  b: '\b',
  f: '\f',
  n: '\n',
  r: '\r',
  t: '\t'
  // note that \u is handled separately in parseString()
};

/**
 * Repair a string containing an invalid JSON document.
 * For example changes JavaScript notation into JSON notation.
 *
 * Example:
 *
 *     try {
 *       const json = "{name: 'John'}"
 *       const repaired = jsonrepair(json)
 *       console.log(repaired)
 *       // '{"name": "John"}'
 *     } catch (err) {
 *       console.error(err)
 *     }
 *
 */
function jsonrepair(text) {
  let i = 0; // current index in text
  let output = ''; // generated output

  const processed = parseValue();
  if (!processed) {
    throwUnexpectedEnd();
  }
  const processedComma = parseCharacter(codeComma);
  if (processedComma) {
    parseWhitespaceAndSkipComments();
  }
  if (isStartOfValue(text[i]) && endsWithCommaOrNewline(output)) {
    // start of a new value after end of the root level object: looks like
    // newline delimited JSON -> turn into a root level array
    if (!processedComma) {
      // repair missing comma
      output = insertBeforeLastWhitespace(output, ',');
    }
    parseNewlineDelimitedJSON();
  } else if (processedComma) {
    // repair: remove trailing comma
    output = stripLastOccurrence(output, ',');
  }

  // repair redundant end quotes
  while (text.charCodeAt(i) === codeClosingBrace || text.charCodeAt(i) === codeClosingBracket) {
    i++;
    parseWhitespaceAndSkipComments();
  }
  if (i >= text.length) {
    // reached the end of the document properly
    return output;
  }
  throwUnexpectedCharacter();
  function parseValue() {
    parseWhitespaceAndSkipComments();
    const processed = parseObject() || parseArray() || parseString() || parseNumber() || parseKeywords() || parseUnquotedString(false) || parseRegex();
    parseWhitespaceAndSkipComments();
    return processed;
  }
  function parseWhitespaceAndSkipComments() {
    const start = i;
    let changed = parseWhitespace();
    do {
      changed = parseComment();
      if (changed) {
        changed = parseWhitespace();
      }
    } while (changed);
    return i > start;
  }
  function parseWhitespace() {
    let whitespace = '';
    let normal;
    // biome-ignore lint/suspicious/noAssignInExpressions: <explanation>
    while ((normal = isWhitespace(text.charCodeAt(i))) || isSpecialWhitespace(text.charCodeAt(i))) {
      if (normal) {
        whitespace += text[i];
      } else {
        // repair special whitespace
        whitespace += ' ';
      }
      i++;
    }
    if (whitespace.length > 0) {
      output += whitespace;
      return true;
    }
    return false;
  }
  function parseComment() {
    // find a block comment '/* ... */'
    if (text.charCodeAt(i) === codeSlash && text.charCodeAt(i + 1) === codeAsterisk) {
      // repair block comment by skipping it
      while (i < text.length && !atEndOfBlockComment(text, i)) {
        i++;
      }
      i += 2;
      return true;
    }

    // find a line comment '// ...'
    if (text.charCodeAt(i) === codeSlash && text.charCodeAt(i + 1) === codeSlash) {
      // repair line comment by skipping it
      while (i < text.length && text.charCodeAt(i) !== codeNewline) {
        i++;
      }
      return true;
    }
    return false;
  }
  function parseCharacter(code) {
    if (text.charCodeAt(i) === code) {
      output += text[i];
      i++;
      return true;
    }
    return false;
  }
  function skipCharacter(code) {
    if (text.charCodeAt(i) === code) {
      i++;
      return true;
    }
    return false;
  }
  function skipEscapeCharacter() {
    return skipCharacter(codeBackslash);
  }

  /**
   * Skip ellipsis like "[1,2,3,...]" or "[1,2,3,...,9]" or "[...,7,8,9]"
   * or a similar construct in objects.
   */
  function skipEllipsis() {
    parseWhitespaceAndSkipComments();
    if (text.charCodeAt(i) === codeDot && text.charCodeAt(i + 1) === codeDot && text.charCodeAt(i + 2) === codeDot) {
      // repair: remove the ellipsis (three dots) and optionally a comma
      i += 3;
      parseWhitespaceAndSkipComments();
      skipCharacter(codeComma);
      return true;
    }
    return false;
  }

  /**
   * Parse an object like '{"key": "value"}'
   */
  function parseObject() {
    if (text.charCodeAt(i) === codeOpeningBrace) {
      output += '{';
      i++;
      parseWhitespaceAndSkipComments();

      // repair: skip leading comma like in {, message: "hi"}
      if (skipCharacter(codeComma)) {
        parseWhitespaceAndSkipComments();
      }
      let initial = true;
      while (i < text.length && text.charCodeAt(i) !== codeClosingBrace) {
        let processedComma;
        if (!initial) {
          processedComma = parseCharacter(codeComma);
          if (!processedComma) {
            // repair missing comma
            output = insertBeforeLastWhitespace(output, ',');
          }
          parseWhitespaceAndSkipComments();
        } else {
          processedComma = true;
          initial = false;
        }
        skipEllipsis();
        const processedKey = parseString() || parseUnquotedString(true);
        if (!processedKey) {
          if (text.charCodeAt(i) === codeClosingBrace || text.charCodeAt(i) === codeOpeningBrace || text.charCodeAt(i) === codeClosingBracket || text.charCodeAt(i) === codeOpeningBracket || text[i] === undefined) {
            // repair trailing comma
            output = stripLastOccurrence(output, ',');
          } else {
            throwObjectKeyExpected();
          }
          break;
        }
        parseWhitespaceAndSkipComments();
        const processedColon = parseCharacter(codeColon);
        const truncatedText = i >= text.length;
        if (!processedColon) {
          if (isStartOfValue(text[i]) || truncatedText) {
            // repair missing colon
            output = insertBeforeLastWhitespace(output, ':');
          } else {
            throwColonExpected();
          }
        }
        const processedValue = parseValue();
        if (!processedValue) {
          if (processedColon || truncatedText) {
            // repair missing object value
            output += 'null';
          } else {
            throwColonExpected();
          }
        }
      }
      if (text.charCodeAt(i) === codeClosingBrace) {
        output += '}';
        i++;
      } else {
        // repair missing end bracket
        output = insertBeforeLastWhitespace(output, '}');
      }
      return true;
    }
    return false;
  }

  /**
   * Parse an array like '["item1", "item2", ...]'
   */
  function parseArray() {
    if (text.charCodeAt(i) === codeOpeningBracket) {
      output += '[';
      i++;
      parseWhitespaceAndSkipComments();

      // repair: skip leading comma like in [,1,2,3]
      if (skipCharacter(codeComma)) {
        parseWhitespaceAndSkipComments();
      }
      let initial = true;
      while (i < text.length && text.charCodeAt(i) !== codeClosingBracket) {
        if (!initial) {
          const processedComma = parseCharacter(codeComma);
          if (!processedComma) {
            // repair missing comma
            output = insertBeforeLastWhitespace(output, ',');
          }
        } else {
          initial = false;
        }
        skipEllipsis();
        const processedValue = parseValue();
        if (!processedValue) {
          // repair trailing comma
          output = stripLastOccurrence(output, ',');
          break;
        }
      }
      if (text.charCodeAt(i) === codeClosingBracket) {
        output += ']';
        i++;
      } else {
        // repair missing closing array bracket
        output = insertBeforeLastWhitespace(output, ']');
      }
      return true;
    }
    return false;
  }

  /**
   * Parse and repair Newline Delimited JSON (NDJSON):
   * multiple JSON objects separated by a newline character
   */
  function parseNewlineDelimitedJSON() {
    // repair NDJSON
    let initial = true;
    let processedValue = true;
    while (processedValue) {
      if (!initial) {
        // parse optional comma, insert when missing
        const processedComma = parseCharacter(codeComma);
        if (!processedComma) {
          // repair: add missing comma
          output = insertBeforeLastWhitespace(output, ',');
        }
      } else {
        initial = false;
      }
      processedValue = parseValue();
    }
    if (!processedValue) {
      // repair: remove trailing comma
      output = stripLastOccurrence(output, ',');
    }

    // repair: wrap the output inside array brackets
    output = `[\n${output}\n]`;
  }

  /**
   * Parse a string enclosed by double quotes "...". Can contain escaped quotes
   * Repair strings enclosed in single quotes or special quotes
   * Repair an escaped string
   *
   * The function can run in two stages:
   * - First, it assumes the string has a valid end quote
   * - If it turns out that the string does not have a valid end quote followed
   *   by a delimiter (which should be the case), the function runs again in a
   *   more conservative way, stopping the string at the first next delimiter
   *   and fixing the string by inserting a quote there.
   */
  function parseString() {
    let stopAtDelimiter = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    let skipEscapeChars = text.charCodeAt(i) === codeBackslash;
    if (skipEscapeChars) {
      // repair: remove the first escape character
      i++;
      skipEscapeChars = true;
    }
    if (isQuote(text.charCodeAt(i))) {
      // double quotes are correct JSON,
      // single quotes come from JavaScript for example, we assume it will have a correct single end quote too
      // otherwise, we will match any double-quote-like start with a double-quote-like end,
      // or any single-quote-like start with a single-quote-like end
      const isEndQuote = isDoubleQuote(text.charCodeAt(i)) ? isDoubleQuote : isSingleQuote(text.charCodeAt(i)) ? isSingleQuote : isSingleQuoteLike(text.charCodeAt(i)) ? isSingleQuoteLike : isDoubleQuoteLike;
      const iBefore = i;
      const oBefore = output.length;
      let str = '"';
      i++;
      while (true) {
        if (i >= text.length) {
          // end of text, we are missing an end quote

          const iPrev = prevNonWhitespaceIndex(i - 1);
          if (!stopAtDelimiter && isDelimiter(text.charAt(iPrev))) {
            // if the text ends with a delimiter, like ["hello],
            // so the missing end quote should be inserted before this delimiter
            // retry parsing the string, stopping at the first next delimiter
            i = iBefore;
            output = output.substring(0, oBefore);
            return parseString(true);
          }

          // repair missing quote
          str = insertBeforeLastWhitespace(str, '"');
          output += str;
          return true;
          // biome-ignore lint/style/noUselessElse: <explanation>
        } else if (isEndQuote(text.charCodeAt(i))) {
          // end quote
          // let us check what is before and after the quote to verify whether this is a legit end quote
          const iQuote = i;
          const oQuote = str.length;
          str += '"';
          i++;
          output += str;
          parseWhitespaceAndSkipComments();
          if (stopAtDelimiter || i >= text.length || isDelimiter(text.charAt(i)) || isQuote(text.charCodeAt(i)) || isDigit(text.charCodeAt(i))) {
            // The quote is followed by the end of the text, a delimiter, or a next value
            // so the quote is indeed the end of the string
            parseConcatenatedString();
            return true;
          }
          if (isDelimiter(text.charAt(prevNonWhitespaceIndex(iQuote - 1)))) {
            // This is not the right end quote: it is preceded by a delimiter,
            // and NOT followed by a delimiter. So, there is an end quote missing
            // parse the string again and then stop at the first next delimiter
            i = iBefore;
            output = output.substring(0, oBefore);
            return parseString(true);
          }

          // revert to right after the quote but before any whitespace, and continue parsing the string
          output = output.substring(0, oBefore);
          i = iQuote + 1;

          // repair unescaped quote
          str = `${str.substring(0, oQuote)}\\${str.substring(oQuote)}`;
        } else if (stopAtDelimiter && isUnquotedStringDelimiter(text[i])) {
          // we're in the mode to stop the string at the first delimiter
          // because there is an end quote missing

          // test start of an url like "https://..." (this would be parsed as a comment)
          if (text.charCodeAt(i - 1) === codeColon && regexUrlStart.test(text.substring(iBefore + 1, i + 2))) {
            while (i < text.length && regexUrlChar.test(text[i])) {
              str += text[i];
              i++;
            }
          }

          // repair missing quote
          str = insertBeforeLastWhitespace(str, '"');
          output += str;
          parseConcatenatedString();
          return true;
        } else if (text.charCodeAt(i) === codeBackslash) {
          // handle escaped content like \n or \u2605
          const char = text.charAt(i + 1);
          const escapeChar = escapeCharacters[char];
          if (escapeChar !== undefined) {
            str += text.slice(i, i + 2);
            i += 2;
          } else if (char === 'u') {
            let j = 2;
            while (j < 6 && isHex(text.charCodeAt(i + j))) {
              j++;
            }
            if (j === 6) {
              str += text.slice(i, i + 6);
              i += 6;
            } else if (i + j >= text.length) {
              // repair invalid or truncated unicode char at the end of the text
              // by removing the unicode char and ending the string here
              i = text.length;
            } else {
              throwInvalidUnicodeCharacter();
            }
          } else {
            // repair invalid escape character: remove it
            str += char;
            i += 2;
          }
        } else {
          // handle regular characters
          const char = text.charAt(i);
          const code = text.charCodeAt(i);
          if (code === codeDoubleQuote && text.charCodeAt(i - 1) !== codeBackslash) {
            // repair unescaped double quote
            str += `\\${char}`;
            i++;
          } else if (isControlCharacter(code)) {
            // unescaped control character
            str += controlCharacters[char];
            i++;
          } else {
            if (!isValidStringCharacter(code)) {
              throwInvalidCharacter(char);
            }
            str += char;
            i++;
          }
        }
        if (skipEscapeChars) {
          // repair: skipped escape character (nothing to do)
          skipEscapeCharacter();
        }
      }
    }
    return false;
  }

  /**
   * Repair concatenated strings like "hello" + "world", change this into "helloworld"
   */
  function parseConcatenatedString() {
    let processed = false;
    parseWhitespaceAndSkipComments();
    while (text.charCodeAt(i) === codePlus) {
      processed = true;
      i++;
      parseWhitespaceAndSkipComments();

      // repair: remove the end quote of the first string
      output = stripLastOccurrence(output, '"', true);
      const start = output.length;
      const parsedStr = parseString();
      if (parsedStr) {
        // repair: remove the start quote of the second string
        output = removeAtIndex(output, start, 1);
      } else {
        // repair: remove the + because it is not followed by a string
        output = insertBeforeLastWhitespace(output, '"');
      }
    }
    return processed;
  }

  /**
   * Parse a number like 2.4 or 2.4e6
   */
  function parseNumber() {
    const start = i;
    if (text.charCodeAt(i) === codeMinus) {
      i++;
      if (atEndOfNumber()) {
        repairNumberEndingWithNumericSymbol(start);
        return true;
      }
      if (!isDigit(text.charCodeAt(i))) {
        i = start;
        return false;
      }
    }

    // Note that in JSON leading zeros like "00789" are not allowed.
    // We will allow all leading zeros here though and at the end of parseNumber
    // check against trailing zeros and repair that if needed.
    // Leading zeros can have meaning, so we should not clear them.
    while (isDigit(text.charCodeAt(i))) {
      i++;
    }
    if (text.charCodeAt(i) === codeDot) {
      i++;
      if (atEndOfNumber()) {
        repairNumberEndingWithNumericSymbol(start);
        return true;
      }
      if (!isDigit(text.charCodeAt(i))) {
        i = start;
        return false;
      }
      while (isDigit(text.charCodeAt(i))) {
        i++;
      }
    }
    if (text.charCodeAt(i) === codeLowercaseE || text.charCodeAt(i) === codeUppercaseE) {
      i++;
      if (text.charCodeAt(i) === codeMinus || text.charCodeAt(i) === codePlus) {
        i++;
      }
      if (atEndOfNumber()) {
        repairNumberEndingWithNumericSymbol(start);
        return true;
      }
      if (!isDigit(text.charCodeAt(i))) {
        i = start;
        return false;
      }
      while (isDigit(text.charCodeAt(i))) {
        i++;
      }
    }

    // if we're not at the end of the number by this point, allow this to be parsed as another type
    if (!atEndOfNumber()) {
      i = start;
      return false;
    }
    if (i > start) {
      // repair a number with leading zeros like "00789"
      const num = text.slice(start, i);
      const hasInvalidLeadingZero = /^0\d/.test(num);
      output += hasInvalidLeadingZero ? `"${num}"` : num;
      return true;
    }
    return false;
  }

  /**
   * Parse keywords true, false, null
   * Repair Python keywords True, False, None
   */
  function parseKeywords() {
    return parseKeyword('true', 'true') || parseKeyword('false', 'false') || parseKeyword('null', 'null') ||
    // repair Python keywords True, False, None
    parseKeyword('True', 'true') || parseKeyword('False', 'false') || parseKeyword('None', 'null');
  }
  function parseKeyword(name, value) {
    if (text.slice(i, i + name.length) === name) {
      output += value;
      i += name.length;
      return true;
    }
    return false;
  }

  /**
   * Repair an unquoted string by adding quotes around it
   * Repair a MongoDB function call like NumberLong("2")
   * Repair a JSONP function call like callback({...});
   */
  function parseUnquotedString(isKey) {
    // note that the symbol can end with whitespaces: we stop at the next delimiter
    // also, note that we allow strings to contain a slash / in order to support repairing regular expressions
    const start = i;
    if (regexFunctionNameCharStart.test(text[i])) {
      while (i < text.length && regexFunctionNameChar.test(text[i])) {
        i++;
      }
      let j = i;
      while (isWhitespace(text.charCodeAt(j))) {
        j++;
      }
      if (text[j] === '(') {
        // repair a MongoDB function call like NumberLong("2")
        // repair a JSONP function call like callback({...});
        i = j + 1;
        parseValue();
        if (text.charCodeAt(i) === codeCloseParenthesis) {
          // repair: skip close bracket of function call
          i++;
          if (text.charCodeAt(i) === codeSemicolon) {
            // repair: skip semicolon after JSONP call
            i++;
          }
        }
        return true;
      }
    }
    while (i < text.length && !isUnquotedStringDelimiter(text[i]) && !isQuote(text.charCodeAt(i)) && (!isKey || text.charCodeAt(i) !== codeColon)) {
      i++;
    }

    // test start of an url like "https://..." (this would be parsed as a comment)
    if (text.charCodeAt(i - 1) === codeColon && regexUrlStart.test(text.substring(start, i + 2))) {
      while (i < text.length && regexUrlChar.test(text[i])) {
        i++;
      }
    }
    if (i > start) {
      // repair unquoted string
      // also, repair undefined into null

      // first, go back to prevent getting trailing whitespaces in the string
      while (isWhitespace(text.charCodeAt(i - 1)) && i > 0) {
        i--;
      }
      const symbol = text.slice(start, i);
      output += symbol === 'undefined' ? 'null' : JSON.stringify(symbol);
      if (text.charCodeAt(i) === codeDoubleQuote) {
        // we had a missing start quote, but now we encountered the end quote, so we can skip that one
        i++;
      }
      return true;
    }
  }
  function parseRegex() {
    if (text[i] === '/') {
      const start = i;
      i++;
      while (i < text.length && (text[i] !== '/' || text[i - 1] === '\\')) {
        i++;
      }
      i++;
      output += `"${text.substring(start, i)}"`;
      return true;
    }
  }
  function prevNonWhitespaceIndex(start) {
    let prev = start;
    while (prev > 0 && isWhitespace(text.charCodeAt(prev))) {
      prev--;
    }
    return prev;
  }
  function atEndOfNumber() {
    return i >= text.length || isDelimiter(text[i]) || isWhitespace(text.charCodeAt(i));
  }
  function repairNumberEndingWithNumericSymbol(start) {
    // repair numbers cut off at the end
    // this will only be called when we end after a '.', '-', or 'e' and does not
    // change the number more than it needs to make it valid JSON
    output += `${text.slice(start, i)}0`;
  }
  function throwInvalidCharacter(char) {
    throw new JSONRepairError(`Invalid character ${JSON.stringify(char)}`, i);
  }
  function throwUnexpectedCharacter() {
    throw new JSONRepairError(`Unexpected character ${JSON.stringify(text[i])}`, i);
  }
  function throwUnexpectedEnd() {
    throw new JSONRepairError('Unexpected end of json string', text.length);
  }
  function throwObjectKeyExpected() {
    throw new JSONRepairError('Object key expected', i);
  }
  function throwColonExpected() {
    throw new JSONRepairError('Colon expected', i);
  }
  function throwInvalidUnicodeCharacter() {
    const chars = text.slice(i, i + 6);
    throw new JSONRepairError(`Invalid unicode character "${chars}"`, i);
  }
}
function atEndOfBlockComment(text, i) {
  return text[i] === '*' && text[i + 1] === '/';
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__(346);
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});