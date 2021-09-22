require('../../jqwidgets/jqxcore');
require('../../jqwidgets/jqxbuttons');
require('../../jqwidgets/jqxwindow');
require('../../jqwidgets/jqxribbon');
require('../../jqwidgets/jqxlayout');
require('../../jqwidgets/jqxmenu');
require('../../jqwidgets/jqxscrollbar');
require('../../jqwidgets/jqxdockinglayout');
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('react')) :
    typeof define === 'function' && define.amd ? define(['exports', 'react'], factory) :
    (factory((global.react_jqxdockinglayout = {}),global.React));
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

    var JqxDockingLayout = /** @class */ (function (_super) {
        __extends(JqxDockingLayout, _super);
        function JqxDockingLayout(props) {
            var _this = _super.call(this, props) || this;
            /* tslint:disable:variable-name */
            _this._jqx = JQXLite;
            _this._id = 'JqxDockingLayout' + _this._jqx.generateID();
            _this._componentSelector = '#' + _this._id;
            _this.state = { lastProps: props };
            return _this;
        }
        JqxDockingLayout.getDerivedStateFromProps = function (props, state) {
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
        JqxDockingLayout.prototype.componentDidMount = function () {
            var widgetOptions = this._manageProps();
            this._jqx(this._componentSelector).jqxDockingLayout(widgetOptions);
            this._wireEvents();
        };
        JqxDockingLayout.prototype.componentDidUpdate = function () {
            var widgetOptions = this._manageProps();
            this.setOptions(widgetOptions);
            this._wireEvents();
        };
        JqxDockingLayout.prototype.render = function () {
            return (React.createElement("div", { id: this._id, className: this.props.className, style: this.props.style }, this.props.children));
        };
        JqxDockingLayout.prototype.setOptions = function (options) {
            this._jqx(this._componentSelector).jqxDockingLayout(options);
        };
        JqxDockingLayout.prototype.getOptions = function (option) {
            return this._jqx(this._componentSelector).jqxDockingLayout(option);
        };
        JqxDockingLayout.prototype.addFloatGroup = function (width, height, position, panelType, title, content, initContent) {
            this._jqx(this._componentSelector).jqxDockingLayout('addFloatGroup', width, height, position, panelType, title, content, initContent);
        };
        JqxDockingLayout.prototype.destroy = function () {
            this._jqx(this._componentSelector).jqxDockingLayout('destroy');
        };
        JqxDockingLayout.prototype.loadLayout = function (layout) {
            this._jqx(this._componentSelector).jqxDockingLayout('loadLayout', layout);
        };
        JqxDockingLayout.prototype.refresh = function () {
            this._jqx(this._componentSelector).jqxDockingLayout('refresh');
        };
        JqxDockingLayout.prototype.renderWidget = function () {
            this._jqx(this._componentSelector).jqxDockingLayout('render');
        };
        JqxDockingLayout.prototype.saveLayout = function () {
            return this._jqx(this._componentSelector).jqxDockingLayout('saveLayout');
        };
        JqxDockingLayout.prototype._manageProps = function () {
            var widgetProps = ['contextMenu', 'height', 'layout', 'minGroupHeight', 'minGroupWidth', 'resizable', 'rtl', 'theme', 'width'];
            var options = {};
            for (var prop in this.props) {
                if (widgetProps.indexOf(prop) !== -1) {
                    options[prop] = this.props[prop];
                }
            }
            return options;
        };
        JqxDockingLayout.prototype._wireEvents = function () {
            for (var prop in this.props) {
                if (prop.indexOf('on') === 0) {
                    var originalEventName = prop.slice(2);
                    originalEventName = originalEventName.charAt(0).toLowerCase() + originalEventName.slice(1);
                    this._jqx(this._componentSelector).off(originalEventName);
                    this._jqx(this._componentSelector).on(originalEventName, this.props[prop]);
                }
            }
        };
        return JqxDockingLayout;
    }(React.PureComponent));
    var jqx = window.jqx;
    var JQXLite = window.JQXLite;

    exports.default = JqxDockingLayout;
    exports.jqx = jqx;
    exports.JQXLite = JQXLite;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
