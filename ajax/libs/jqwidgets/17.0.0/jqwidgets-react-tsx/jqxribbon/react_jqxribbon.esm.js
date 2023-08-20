import * as jqxcore from '../../jqwidgets/jqxcore';
import * as jqxdata from '../../jqwidgets/jqxdata';
import * as jqxbuttons from '../../jqwidgets/jqxbuttons';
import * as jqxribbon from '../../jqwidgets/jqxribbon';
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

var JqxRibbon = /** @class */ (function (_super) {
    __extends(JqxRibbon, _super);
    function JqxRibbon(props) {
        var _this = _super.call(this, props) || this;
        /* tslint:disable:variable-name */
        _this._jqx = JQXLite;
        _this._id = 'JqxRibbon' + _this._jqx.generateID();
        _this._componentSelector = '#' + _this._id;
        _this.state = { lastProps: props };
        return _this;
    }
    JqxRibbon.getDerivedStateFromProps = function (props, state) {
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
    JqxRibbon.prototype.componentDidMount = function () {
        var widgetOptions = this._manageProps();
        this._jqx(this._componentSelector).jqxRibbon(widgetOptions);
        this._wireEvents();
    };
    JqxRibbon.prototype.componentDidUpdate = function () {
        var widgetOptions = this._manageProps();
        this.setOptions(widgetOptions);
        this._wireEvents();
    };
    JqxRibbon.prototype.render = function () {
        return (createElement("div", { id: this._id, className: this.props.className, style: this.props.style }, this.props.children));
    };
    JqxRibbon.prototype.setOptions = function (options) {
        this._jqx(this._componentSelector).jqxRibbon(options);
    };
    JqxRibbon.prototype.getOptions = function (option) {
        return this._jqx(this._componentSelector).jqxRibbon(option);
    };
    JqxRibbon.prototype.addAt = function (index, item) {
        this._jqx(this._componentSelector).jqxRibbon('addAt', index, item);
    };
    JqxRibbon.prototype.clearSelection = function () {
        this._jqx(this._componentSelector).jqxRibbon('clearSelection');
    };
    JqxRibbon.prototype.disableAt = function (index) {
        this._jqx(this._componentSelector).jqxRibbon('disableAt', index);
    };
    JqxRibbon.prototype.destroy = function () {
        this._jqx(this._componentSelector).jqxRibbon('destroy');
    };
    JqxRibbon.prototype.enableAt = function (index) {
        this._jqx(this._componentSelector).jqxRibbon('enableAt', index);
    };
    JqxRibbon.prototype.hideAt = function (index) {
        this._jqx(this._componentSelector).jqxRibbon('hideAt', index);
    };
    JqxRibbon.prototype.removeAt = function (index) {
        this._jqx(this._componentSelector).jqxRibbon('removeAt', index);
    };
    JqxRibbon.prototype.renderWidget = function () {
        this._jqx(this._componentSelector).jqxRibbon('render');
    };
    JqxRibbon.prototype.refresh = function () {
        this._jqx(this._componentSelector).jqxRibbon('refresh');
    };
    JqxRibbon.prototype.selectAt = function (index) {
        this._jqx(this._componentSelector).jqxRibbon('selectAt', index);
    };
    JqxRibbon.prototype.showAt = function (index) {
        this._jqx(this._componentSelector).jqxRibbon('showAt', index);
    };
    JqxRibbon.prototype.setPopupLayout = function (index, layout, width, height) {
        this._jqx(this._componentSelector).jqxRibbon('setPopupLayout', index, layout, width, height);
    };
    JqxRibbon.prototype.updateAt = function (index, item) {
        this._jqx(this._componentSelector).jqxRibbon('updateAt', index, item);
    };
    JqxRibbon.prototype.val = function (value) {
        if (value) {
            this._jqx(this._componentSelector).jqxRibbon('val', value);
        }
        else {
            return this._jqx(this._componentSelector).jqxRibbon('val');
        }
    };
    JqxRibbon.prototype._manageProps = function () {
        var widgetProps = ['animationType', 'animationDelay', 'disabled', 'height', 'initContent', 'mode', 'popupCloseMode', 'position', 'reorder', 'rtl', 'selectedIndex', 'selectionMode', 'scrollPosition', 'scrollStep', 'scrollDelay', 'theme', 'width'];
        var options = {};
        for (var prop in this.props) {
            if (widgetProps.indexOf(prop) !== -1) {
                options[prop] = this.props[prop];
            }
        }
        return options;
    };
    JqxRibbon.prototype._wireEvents = function () {
        for (var prop in this.props) {
            if (prop.indexOf('on') === 0) {
                var originalEventName = prop.slice(2);
                originalEventName = originalEventName.charAt(0).toLowerCase() + originalEventName.slice(1);
                this._jqx(this._componentSelector).off(originalEventName);
                this._jqx(this._componentSelector).on(originalEventName, this.props[prop]);
            }
        }
    };
    return JqxRibbon;
}(PureComponent));
var jqx = window.jqx;
var JQXLite = window.JQXLite;

export default JqxRibbon;
export { jqx, JQXLite };
