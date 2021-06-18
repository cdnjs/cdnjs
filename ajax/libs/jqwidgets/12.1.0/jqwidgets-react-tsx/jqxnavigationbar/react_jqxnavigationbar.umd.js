require('../../jqwidgets/jqxcore');
require('../../jqwidgets/jqxnavigationbar');
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('react')) :
    typeof define === 'function' && define.amd ? define(['exports', 'react'], factory) :
    (factory((global.react_jqxnavigationbar = {}),global.React));
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

    var JqxNavigationBar = /** @class */ (function (_super) {
        __extends(JqxNavigationBar, _super);
        function JqxNavigationBar(props) {
            var _this = _super.call(this, props) || this;
            /* tslint:disable:variable-name */
            _this._jqx = JQXLite;
            _this._id = 'JqxNavigationBar' + _this._jqx.generateID();
            _this._componentSelector = '#' + _this._id;
            _this.state = { lastProps: props };
            return _this;
        }
        JqxNavigationBar.getDerivedStateFromProps = function (props, state) {
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
        JqxNavigationBar.prototype.componentDidMount = function () {
            var widgetOptions = this._manageProps();
            this._jqx(this._componentSelector).jqxNavigationBar(widgetOptions);
            this._wireEvents();
        };
        JqxNavigationBar.prototype.componentDidUpdate = function () {
            var widgetOptions = this._manageProps();
            this.setOptions(widgetOptions);
            this._wireEvents();
        };
        JqxNavigationBar.prototype.render = function () {
            return (React.createElement("div", { id: this._id, className: this.props.className, style: this.props.style }, this.props.children));
        };
        JqxNavigationBar.prototype.setOptions = function (options) {
            this._jqx(this._componentSelector).jqxNavigationBar(options);
        };
        JqxNavigationBar.prototype.getOptions = function (option) {
            return this._jqx(this._componentSelector).jqxNavigationBar(option);
        };
        JqxNavigationBar.prototype.add = function (header, content) {
            this._jqx(this._componentSelector).jqxNavigationBar('add', header, content);
        };
        JqxNavigationBar.prototype.collapseAt = function (index) {
            this._jqx(this._componentSelector).jqxNavigationBar('collapseAt', index);
        };
        JqxNavigationBar.prototype.disableAt = function (index) {
            this._jqx(this._componentSelector).jqxNavigationBar('disableAt', index);
        };
        JqxNavigationBar.prototype.disable = function () {
            this._jqx(this._componentSelector).jqxNavigationBar('disable');
        };
        JqxNavigationBar.prototype.destroy = function () {
            this._jqx(this._componentSelector).jqxNavigationBar('destroy');
        };
        JqxNavigationBar.prototype.expandAt = function (index) {
            this._jqx(this._componentSelector).jqxNavigationBar('expandAt', index);
        };
        JqxNavigationBar.prototype.enableAt = function (index) {
            this._jqx(this._componentSelector).jqxNavigationBar('enableAt', index);
        };
        JqxNavigationBar.prototype.enable = function () {
            this._jqx(this._componentSelector).jqxNavigationBar('enable');
        };
        JqxNavigationBar.prototype.focus = function () {
            this._jqx(this._componentSelector).jqxNavigationBar('focus');
        };
        JqxNavigationBar.prototype.getHeaderContentAt = function (index) {
            return this._jqx(this._componentSelector).jqxNavigationBar('getHeaderContentAt', index);
        };
        JqxNavigationBar.prototype.getContentAt = function (index) {
            return this._jqx(this._componentSelector).jqxNavigationBar('getContentAt', index);
        };
        JqxNavigationBar.prototype.hideArrowAt = function (index) {
            this._jqx(this._componentSelector).jqxNavigationBar('hideArrowAt', index);
        };
        JqxNavigationBar.prototype.invalidate = function () {
            this._jqx(this._componentSelector).jqxNavigationBar('invalidate');
        };
        JqxNavigationBar.prototype.insert = function (Index, header, content) {
            this._jqx(this._componentSelector).jqxNavigationBar('insert', Index, header, content);
        };
        JqxNavigationBar.prototype.refresh = function () {
            this._jqx(this._componentSelector).jqxNavigationBar('refresh');
        };
        JqxNavigationBar.prototype.renderWidget = function () {
            this._jqx(this._componentSelector).jqxNavigationBar('render');
        };
        JqxNavigationBar.prototype.remove = function (index) {
            this._jqx(this._componentSelector).jqxNavigationBar('remove', index);
        };
        JqxNavigationBar.prototype.setContentAt = function (index, item) {
            this._jqx(this._componentSelector).jqxNavigationBar('setContentAt', index, item);
        };
        JqxNavigationBar.prototype.setHeaderContentAt = function (index, item) {
            this._jqx(this._componentSelector).jqxNavigationBar('setHeaderContentAt', index, item);
        };
        JqxNavigationBar.prototype.showArrowAt = function (index) {
            this._jqx(this._componentSelector).jqxNavigationBar('showArrowAt', index);
        };
        JqxNavigationBar.prototype.update = function (index, header, content) {
            this._jqx(this._componentSelector).jqxNavigationBar('update', index, header, content);
        };
        JqxNavigationBar.prototype.val = function (value) {
            if (value) {
                this._jqx(this._componentSelector).jqxNavigationBar('val', value);
            }
            else {
                return this._jqx(this._componentSelector).jqxNavigationBar('val');
            }
        };
        JqxNavigationBar.prototype._manageProps = function () {
            var widgetProps = ['animationType', 'arrowPosition', 'collapseAnimationDuration', 'disabled', 'expandAnimationDuration', 'expandMode', 'expandedIndexes', 'height', 'initContent', 'rtl', 'showArrow', 'theme', 'toggleMode', 'width'];
            var options = {};
            for (var prop in this.props) {
                if (widgetProps.indexOf(prop) !== -1) {
                    options[prop] = this.props[prop];
                }
            }
            return options;
        };
        JqxNavigationBar.prototype._wireEvents = function () {
            for (var prop in this.props) {
                if (prop.indexOf('on') === 0) {
                    var originalEventName = prop.slice(2);
                    originalEventName = originalEventName.charAt(0).toLowerCase() + originalEventName.slice(1);
                    this._jqx(this._componentSelector).off(originalEventName);
                    this._jqx(this._componentSelector).on(originalEventName, this.props[prop]);
                }
            }
        };
        return JqxNavigationBar;
    }(React.PureComponent));
    var jqx = window.jqx;
    var JQXLite = window.JQXLite;

    exports.default = JqxNavigationBar;
    exports.jqx = jqx;
    exports.JQXLite = JQXLite;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
