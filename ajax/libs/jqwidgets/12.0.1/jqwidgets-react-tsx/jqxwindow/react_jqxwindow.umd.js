require('../../jqwidgets/jqxcore');
require('../../jqwidgets/jqxbuttons');
require('../../jqwidgets/jqxwindow');
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('react')) :
    typeof define === 'function' && define.amd ? define(['exports', 'react'], factory) :
    (factory((global.react_jqxwindow = {}),global.React));
}(this, (function (exports,React) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    var JqxWindow = /** @class */ (function (_super) {
        __extends(JqxWindow, _super);
        function JqxWindow(props) {
            var _this = _super.call(this, props) || this;
            /* tslint:disable:variable-name */
            _this._jqx = JQXLite;
            _this._id = 'JqxWindow' + _this._jqx.generateID();
            _this._componentSelector = '#' + _this._id;
            _this.state = { lastProps: props };
            return _this;
        }
        JqxWindow.getDerivedStateFromProps = function (props, state) {
            if (!Object.is) {
                Object.is = function (x, y) {
                    if (x === y) {
                        return x !== 0 || 1 / x === 1 / y;
                    }
                    else {
                        return x !== x && y !== y;
                    }
                };
            }
            var areEqual = Object.is(props, state.lastProps);
            if (!areEqual) {
                var newState = { lastProps: props };
                return newState;
            }
            return null;
        };
        JqxWindow.prototype.componentDidMount = function () {
            var widgetOptions = this._manageProps();
            this._jqx(this._componentSelector).jqxWindow(widgetOptions);
            this._wireEvents();
        };
        JqxWindow.prototype.componentDidUpdate = function () {
            var widgetOptions = this._manageProps();
            this.setOptions(widgetOptions);
            this._wireEvents();
        };
        JqxWindow.prototype.render = function () {
            return (React.createElement("div", { id: this._id, className: this.props.className, style: this.props.style }, this.props.children));
        };
        JqxWindow.prototype.setOptions = function (options) {
            this._jqx(this._componentSelector).jqxWindow(options);
        };
        JqxWindow.prototype.getOptions = function (option) {
            return this._jqx(this._componentSelector).jqxWindow(option);
        };
        JqxWindow.prototype.bringToFront = function () {
            this._jqx(this._componentSelector).jqxWindow('bringToFront');
        };
        JqxWindow.prototype.close = function () {
            this._jqx(this._componentSelector).jqxWindow('close');
        };
        JqxWindow.prototype.collapse = function () {
            this._jqx(this._componentSelector).jqxWindow('collapse');
        };
        JqxWindow.prototype.closeAll = function () {
            this._jqx(this._componentSelector).jqxWindow('closeAll');
        };
        JqxWindow.prototype.disable = function () {
            this._jqx(this._componentSelector).jqxWindow('disable');
        };
        JqxWindow.prototype.destroy = function () {
            this._jqx(this._componentSelector).jqxWindow('destroy');
        };
        JqxWindow.prototype.enable = function () {
            this._jqx(this._componentSelector).jqxWindow('enable');
        };
        JqxWindow.prototype.expand = function () {
            this._jqx(this._componentSelector).jqxWindow('expand');
        };
        JqxWindow.prototype.focus = function () {
            this._jqx(this._componentSelector).jqxWindow('focus');
        };
        JqxWindow.prototype.isOpen = function () {
            return this._jqx(this._componentSelector).jqxWindow('isOpen');
        };
        JqxWindow.prototype.move = function (top, left) {
            this._jqx(this._componentSelector).jqxWindow('move', top, left);
        };
        JqxWindow.prototype.open = function () {
            this._jqx(this._componentSelector).jqxWindow('open');
        };
        JqxWindow.prototype.hide = function () {
            this._jqx(this._componentSelector).jqxWindow('hide');
        };
        JqxWindow.prototype.resize = function (top, left) {
            this._jqx(this._componentSelector).jqxWindow('resize', top, left);
        };
        JqxWindow.prototype.setTitle = function (title) {
            this._jqx(this._componentSelector).jqxWindow('setTitle', title);
        };
        JqxWindow.prototype.setContent = function (content) {
            this._jqx(this._componentSelector).jqxWindow('setContent', content);
        };
        JqxWindow.prototype._manageProps = function () {
            var widgetProps = ['autoOpen', 'animationType', 'collapsed', 'collapseAnimationDuration', 'content', 'closeAnimationDuration', 'closeButtonSize', 'closeButtonAction', 'cancelButton', 'dragArea', 'draggable', 'disabled', 'height', 'initContent', 'isModal', 'keyboardCloseKey', 'keyboardNavigation', 'minHeight', 'maxHeight', 'minWidth', 'maxWidth', 'modalOpacity', 'modalZIndex', 'modalBackgroundZIndex', 'okButton', 'position', 'rtl', 'resizable', 'showAnimationDuration', 'showCloseButton', 'showCollapseButton', 'theme', 'title', 'width', 'zIndex'];
            var options = {};
            for (var prop in this.props) {
                if (widgetProps.indexOf(prop) !== -1) {
                    options[prop] = this.props[prop];
                }
            }
            return options;
        };
        JqxWindow.prototype._wireEvents = function () {
            for (var prop in this.props) {
                if (prop.indexOf('on') === 0) {
                    var originalEventName = prop.slice(2);
                    originalEventName = originalEventName.charAt(0).toLowerCase() + originalEventName.slice(1);
                    this._jqx(this._componentSelector).off(originalEventName);
                    this._jqx(this._componentSelector).on(originalEventName, this.props[prop]);
                }
            }
        };
        return JqxWindow;
    }(React.PureComponent));
    var jqx = window.jqx;
    var JQXLite = window.JQXLite;

    exports.default = JqxWindow;
    exports.jqx = jqx;
    exports.JQXLite = JQXLite;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
