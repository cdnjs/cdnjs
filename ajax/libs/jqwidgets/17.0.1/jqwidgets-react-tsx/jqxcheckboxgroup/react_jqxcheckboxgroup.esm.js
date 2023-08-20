import * as jqxcore from '../../jqwidgets/jqxcore';
import * as jqxcheckbox from '../../jqwidgets/jqxcheckbox';
import * as jqxcheckboxgroup from '../../jqwidgets/jqxcheckboxgroup';
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

var JqxCheckBoxGroup = /** @class */ (function (_super) {
    __extends(JqxCheckBoxGroup, _super);
    function JqxCheckBoxGroup(props) {
        var _this = _super.call(this, props) || this;
        /* tslint:disable:variable-name */
        _this._jqx = JQXLite;
        _this._id = 'JqxCheckBoxGroup' + _this._jqx.generateID();
        _this._componentSelector = '#' + _this._id;
        _this.state = { lastProps: props };
        return _this;
    }
    JqxCheckBoxGroup.getDerivedStateFromProps = function (props, state) {
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
    JqxCheckBoxGroup.prototype.componentDidMount = function () {
        var widgetOptions = this._manageProps();
        this._jqx(this._componentSelector).jqxCheckBoxGroup(widgetOptions);
        this._wireEvents();
    };
    JqxCheckBoxGroup.prototype.componentDidUpdate = function () {
        var widgetOptions = this._manageProps();
        this.setOptions(widgetOptions);
        this._wireEvents();
    };
    JqxCheckBoxGroup.prototype.render = function () {
        return (createElement("div", { id: this._id, className: this.props.className, style: this.props.style }, this.props.children));
    };
    JqxCheckBoxGroup.prototype.setOptions = function (options) {
        this._jqx(this._componentSelector).jqxCheckBoxGroup(options);
    };
    JqxCheckBoxGroup.prototype.getOptions = function (option) {
        return this._jqx(this._componentSelector).jqxCheckBoxGroup(option);
    };
    JqxCheckBoxGroup.prototype.getValue = function () {
        return this._jqx(this._componentSelector).jqxCheckBoxGroup('getValue');
    };
    JqxCheckBoxGroup.prototype.getValueAt = function (index) {
        return this._jqx(this._componentSelector).jqxCheckBoxGroup('getValueAt', index);
    };
    JqxCheckBoxGroup.prototype.enableAt = function (index) {
        this._jqx(this._componentSelector).jqxCheckBoxGroup('enableAt', index);
    };
    JqxCheckBoxGroup.prototype.disableAt = function (index) {
        this._jqx(this._componentSelector).jqxCheckBoxGroup('disableAt', index);
    };
    JqxCheckBoxGroup.prototype.checkAt = function (index) {
        this._jqx(this._componentSelector).jqxCheckBoxGroup('checkAt', index);
    };
    JqxCheckBoxGroup.prototype.uncheckAt = function (index) {
        this._jqx(this._componentSelector).jqxCheckBoxGroup('uncheckAt', index);
    };
    JqxCheckBoxGroup.prototype.uncheckAll = function () {
        this._jqx(this._componentSelector).jqxCheckBoxGroup('uncheckAll');
    };
    JqxCheckBoxGroup.prototype.checkAll = function () {
        this._jqx(this._componentSelector).jqxCheckBoxGroup('checkAll');
    };
    JqxCheckBoxGroup.prototype.checkValue = function (value) {
        this._jqx(this._componentSelector).jqxCheckBoxGroup('checkValue', value);
    };
    JqxCheckBoxGroup.prototype.uncheckValue = function (value) {
        this._jqx(this._componentSelector).jqxCheckBoxGroup('uncheckValue', value);
    };
    JqxCheckBoxGroup.prototype.disable = function () {
        this._jqx(this._componentSelector).jqxCheckBoxGroup('disable');
    };
    JqxCheckBoxGroup.prototype.destroy = function () {
        this._jqx(this._componentSelector).jqxCheckBoxGroup('destroy');
    };
    JqxCheckBoxGroup.prototype.enable = function () {
        this._jqx(this._componentSelector).jqxCheckBoxGroup('enable');
    };
    JqxCheckBoxGroup.prototype.renderWidget = function () {
        this._jqx(this._componentSelector).jqxCheckBoxGroup('render');
    };
    JqxCheckBoxGroup.prototype.val = function (value) {
        if (value) {
            this._jqx(this._componentSelector).jqxCheckBoxGroup('val', value);
        }
        else {
            return this._jqx(this._componentSelector).jqxCheckBoxGroup('val');
        }
    };
    JqxCheckBoxGroup.prototype._manageProps = function () {
        var widgetProps = ['change', 'disabled', 'items', 'value', 'layout', 'labelPosition', 'rtl', 'theme'];
        var options = {};
        for (var prop in this.props) {
            if (widgetProps.indexOf(prop) !== -1) {
                options[prop] = this.props[prop];
            }
        }
        return options;
    };
    JqxCheckBoxGroup.prototype._wireEvents = function () {
        for (var prop in this.props) {
            if (prop.indexOf('on') === 0) {
                var originalEventName = prop.slice(2);
                originalEventName = originalEventName.charAt(0).toLowerCase() + originalEventName.slice(1);
                this._jqx(this._componentSelector).off(originalEventName);
                this._jqx(this._componentSelector).on(originalEventName, this.props[prop]);
            }
        }
    };
    return JqxCheckBoxGroup;
}(PureComponent));
var jqx = window.jqx;
var JQXLite = window.JQXLite;

export default JqxCheckBoxGroup;
export { jqx, JQXLite };
