import * as jqxcore from '../../jqwidgets/jqxcore';
import * as jqxtooltip from '../../jqwidgets/jqxtooltip';
import * as jqxpasswordinput from '../../jqwidgets/jqxpasswordinput';
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

var JqxPasswordInput = /** @class */ (function (_super) {
    __extends(JqxPasswordInput, _super);
    function JqxPasswordInput(props) {
        var _this = _super.call(this, props) || this;
        /* tslint:disable:variable-name */
        _this._jqx = JQXLite;
        _this._id = 'JqxPasswordInput' + _this._jqx.generateID();
        _this._componentSelector = '#' + _this._id;
        _this.state = { lastProps: props };
        return _this;
    }
    JqxPasswordInput.getDerivedStateFromProps = function (props, state) {
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
    JqxPasswordInput.prototype.componentDidMount = function () {
        var widgetOptions = this._manageProps();
        this._jqx(this._componentSelector).jqxPasswordInput(widgetOptions);
        this._wireEvents();
    };
    JqxPasswordInput.prototype.componentDidUpdate = function () {
        var widgetOptions = this._manageProps();
        this.setOptions(widgetOptions);
        this._wireEvents();
    };
    JqxPasswordInput.prototype.render = function () {
        return (createElement("input", { id: this._id, type: "password" }));
    };
    JqxPasswordInput.prototype.setOptions = function (options) {
        this._jqx(this._componentSelector).jqxPasswordInput(options);
    };
    JqxPasswordInput.prototype.getOptions = function (option) {
        return this._jqx(this._componentSelector).jqxPasswordInput(option);
    };
    JqxPasswordInput.prototype.renderWidget = function () {
        this._jqx(this._componentSelector).jqxPasswordInput('render');
    };
    JqxPasswordInput.prototype.refresh = function () {
        this._jqx(this._componentSelector).jqxPasswordInput('refresh');
    };
    JqxPasswordInput.prototype.val = function (value) {
        if (value) {
            this._jqx(this._componentSelector).jqxPasswordInput('val', value);
        }
        else {
            return this._jqx(this._componentSelector).jqxPasswordInput('val');
        }
    };
    JqxPasswordInput.prototype._manageProps = function () {
        var widgetProps = ['disabled', 'height', 'localization', 'maxLength', 'placeHolder', 'passwordStrength', 'rtl', 'strengthColors', 'showStrength', 'showStrengthPosition', 'strengthTypeRenderer', 'showPasswordIcon', 'theme', 'width'];
        var options = {};
        for (var prop in this.props) {
            if (widgetProps.indexOf(prop) !== -1) {
                options[prop] = this.props[prop];
            }
        }
        return options;
    };
    JqxPasswordInput.prototype._wireEvents = function () {
        for (var prop in this.props) {
            if (prop.indexOf('on') === 0) {
                var originalEventName = prop.slice(2);
                originalEventName = originalEventName.charAt(0).toLowerCase() + originalEventName.slice(1);
                this._jqx(this._componentSelector).off(originalEventName);
                this._jqx(this._componentSelector).on(originalEventName, this.props[prop]);
            }
        }
    };
    return JqxPasswordInput;
}(PureComponent));
var jqx = window.jqx;
var JQXLite = window.JQXLite;

export default JqxPasswordInput;
export { jqx, JQXLite };
