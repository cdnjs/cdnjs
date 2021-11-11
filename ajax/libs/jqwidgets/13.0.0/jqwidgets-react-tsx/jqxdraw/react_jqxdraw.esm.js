import * as jqxcore from '../../jqwidgets/jqxcore';
import * as jqxdraw from '../../jqwidgets/jqxdraw';
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

var JqxDraw = /** @class */ (function (_super) {
    __extends(JqxDraw, _super);
    function JqxDraw(props) {
        var _this = _super.call(this, props) || this;
        /* tslint:disable:variable-name */
        _this._jqx = JQXLite;
        _this._id = 'JqxDraw' + _this._jqx.generateID();
        _this._componentSelector = '#' + _this._id;
        _this.state = { lastProps: props };
        return _this;
    }
    JqxDraw.getDerivedStateFromProps = function (props, state) {
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
    JqxDraw.prototype.componentDidMount = function () {
        var widgetOptions = this._manageProps();
        this._jqx(this._componentSelector).jqxDraw(widgetOptions);
        this._wireEvents();
    };
    JqxDraw.prototype.componentDidUpdate = function () {
        var widgetOptions = this._manageProps();
        this.setOptions(widgetOptions);
        this._wireEvents();
    };
    JqxDraw.prototype.render = function () {
        return (createElement("div", { id: this._id, className: this.props.className, style: this.props.style }, this.props.children));
    };
    JqxDraw.prototype.setOptions = function (options) {
        this._jqx(this._componentSelector).jqxDraw(options);
    };
    JqxDraw.prototype.getOptions = function (option) {
        return this._jqx(this._componentSelector).jqxDraw(option);
    };
    JqxDraw.prototype.attr = function (element, attributes) {
        this._jqx(this._componentSelector).jqxDraw('attr', element, attributes);
    };
    JqxDraw.prototype.circle = function (cx, cy, r, attributes) {
        return this._jqx(this._componentSelector).jqxDraw('circle', cx, cy, r, attributes);
    };
    JqxDraw.prototype.clear = function () {
        this._jqx(this._componentSelector).jqxDraw('clear');
    };
    JqxDraw.prototype.getAttr = function (element, attributes) {
        return this._jqx(this._componentSelector).jqxDraw('getAttr', element, attributes);
    };
    JqxDraw.prototype.getSize = function () {
        return this._jqx(this._componentSelector).jqxDraw('getSize');
    };
    JqxDraw.prototype.line = function (x1, y1, x2, y2, attributes) {
        return this._jqx(this._componentSelector).jqxDraw('line', x1, y1, x2, y2, attributes);
    };
    JqxDraw.prototype.measureText = function (text, angle, attributes) {
        return this._jqx(this._componentSelector).jqxDraw('measureText', text, angle, attributes);
    };
    JqxDraw.prototype.on = function (element, event, func) {
        this._jqx(this._componentSelector).jqxDraw('on', element, event, func);
    };
    JqxDraw.prototype.off = function (element, event, func) {
        this._jqx(this._componentSelector).jqxDraw('off', element, event, func);
    };
    JqxDraw.prototype.path = function (path, attributes) {
        return this._jqx(this._componentSelector).jqxDraw('path', path, attributes);
    };
    JqxDraw.prototype.pieslice = function (cx, xy, innerRadius, outerRadius, fromAngle, endAngle, centerOffset, attributes) {
        return this._jqx(this._componentSelector).jqxDraw('pieslice', cx, xy, innerRadius, outerRadius, fromAngle, endAngle, centerOffset, attributes);
    };
    JqxDraw.prototype.refresh = function () {
        this._jqx(this._componentSelector).jqxDraw('refresh');
    };
    JqxDraw.prototype.rect = function (x, y, width, height, attributes) {
        return this._jqx(this._componentSelector).jqxDraw('rect', x, y, width, height, attributes);
    };
    JqxDraw.prototype.saveAsJPEG = function (image, url) {
        this._jqx(this._componentSelector).jqxDraw('saveAsJPEG', image, url);
    };
    JqxDraw.prototype.saveAsPNG = function (image, url) {
        this._jqx(this._componentSelector).jqxDraw('saveAsPNG', image, url);
    };
    JqxDraw.prototype.text = function (text, x, y, width, height, angle, attributes, clip, halign, valign, rotateAround) {
        return this._jqx(this._componentSelector).jqxDraw('text', text, x, y, width, height, angle, attributes, clip, halign, valign, rotateAround);
    };
    JqxDraw.prototype._manageProps = function () {
        var widgetProps = ['renderEngine'];
        var options = {};
        for (var prop in this.props) {
            if (widgetProps.indexOf(prop) !== -1) {
                options[prop] = this.props[prop];
            }
        }
        return options;
    };
    JqxDraw.prototype._wireEvents = function () {
        for (var prop in this.props) {
            if (prop.indexOf('on') === 0) {
                var originalEventName = prop.slice(2);
                originalEventName = originalEventName.charAt(0).toLowerCase() + originalEventName.slice(1);
                this._jqx(this._componentSelector).off(originalEventName);
                this._jqx(this._componentSelector).on(originalEventName, this.props[prop]);
            }
        }
    };
    return JqxDraw;
}(PureComponent));
var jqx = window.jqx;
var JQXLite = window.JQXLite;

export default JqxDraw;
export { jqx, JQXLite };
