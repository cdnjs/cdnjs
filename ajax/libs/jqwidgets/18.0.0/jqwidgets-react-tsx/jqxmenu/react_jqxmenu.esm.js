import * as jqxcore from '../../jqwidgets/jqxcore';
import * as jqxdata from '../../jqwidgets/jqxdata';
import * as jqxmenu from '../../jqwidgets/jqxmenu';
import { createElement, PureComponent } from 'react';

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

var JqxMenu = /** @class */ (function (_super) {
    __extends(JqxMenu, _super);
    function JqxMenu(props) {
        var _this = _super.call(this, props) || this;
        /* tslint:disable:variable-name */
        _this._jqx = JQXLite;
        _this._id = 'JqxMenu' + _this._jqx.generateID();
        _this._componentSelector = '#' + _this._id;
        _this.state = { lastProps: props };
        return _this;
    }
    JqxMenu.getDerivedStateFromProps = function (props, state) {
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
    JqxMenu.prototype.componentDidMount = function () {
        var widgetOptions = this._manageProps();
        this._jqx(this._componentSelector).jqxMenu(widgetOptions);
        this._wireEvents();
    };
    JqxMenu.prototype.componentDidUpdate = function () {
        var widgetOptions = this._manageProps();
        this.setOptions(widgetOptions);
        this._wireEvents();
    };
    JqxMenu.prototype.render = function () {
        return (createElement("div", { id: this._id, className: this.props.className, style: this.props.style }, this.props.children));
    };
    JqxMenu.prototype.setOptions = function (options) {
        this._jqx(this._componentSelector).jqxMenu(options);
    };
    JqxMenu.prototype.getOptions = function (option) {
        return this._jqx(this._componentSelector).jqxMenu(option);
    };
    JqxMenu.prototype.closeItem = function (itemID) {
        this._jqx(this._componentSelector).jqxMenu('closeItem', itemID);
    };
    JqxMenu.prototype.close = function () {
        this._jqx(this._componentSelector).jqxMenu('close');
    };
    JqxMenu.prototype.disable = function (itemID, value) {
        this._jqx(this._componentSelector).jqxMenu('disable', itemID, value);
    };
    JqxMenu.prototype.destroy = function () {
        this._jqx(this._componentSelector).jqxMenu('destroy');
    };
    JqxMenu.prototype.focus = function () {
        this._jqx(this._componentSelector).jqxMenu('focus');
    };
    JqxMenu.prototype.minimize = function () {
        this._jqx(this._componentSelector).jqxMenu('minimize');
    };
    JqxMenu.prototype.open = function (left, top) {
        this._jqx(this._componentSelector).jqxMenu('open', left, top);
    };
    JqxMenu.prototype.openItem = function (itemID) {
        this._jqx(this._componentSelector).jqxMenu('openItem', itemID);
    };
    JqxMenu.prototype.restore = function () {
        this._jqx(this._componentSelector).jqxMenu('restore');
    };
    JqxMenu.prototype.setItemOpenDirection = function (item, horizontaldirection, verticaldirection) {
        this._jqx(this._componentSelector).jqxMenu('setItemOpenDirection', item, horizontaldirection, verticaldirection);
    };
    JqxMenu.prototype._manageProps = function () {
        var widgetProps = ['animationShowDuration', 'animationHideDuration', 'animationHideDelay', 'animationShowDelay', 'autoCloseInterval', 'autoSizeMainItems', 'autoCloseOnClick', 'autoOpenPopup', 'autoOpen', 'autoCloseOnMouseLeave', 'clickToOpen', 'disabled', 'enableHover', 'easing', 'height', 'keyboardNavigation', 'minimizeWidth', 'mode', 'popupZIndex', 'rtl', 'showTopLevelArrows', 'source', 'theme', 'width'];
        var options = {};
        for (var prop in this.props) {
            if (widgetProps.indexOf(prop) !== -1) {
                options[prop] = this.props[prop];
            }
        }
        return options;
    };
    JqxMenu.prototype._wireEvents = function () {
        for (var prop in this.props) {
            if (prop.indexOf('on') === 0) {
                var originalEventName = prop.slice(2);
                originalEventName = originalEventName.charAt(0).toLowerCase() + originalEventName.slice(1);
                this._jqx(this._componentSelector).off(originalEventName);
                this._jqx(this._componentSelector).on(originalEventName, this.props[prop]);
            }
        }
    };
    return JqxMenu;
}(PureComponent));
var jqx = window.jqx;
var JQXLite = window.JQXLite;

export default JqxMenu;
export { jqx, JQXLite };
