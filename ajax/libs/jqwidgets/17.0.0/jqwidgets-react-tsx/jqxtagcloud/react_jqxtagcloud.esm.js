import * as jqxcore from '../../jqwidgets/jqxcore';
import * as jqxdata from '../../jqwidgets/jqxdata';
import * as jqxbuttons from '../../jqwidgets/jqxbuttons';
import * as jqxtagcloud from '../../jqwidgets/jqxtagcloud';
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

var JqxTagCloud = /** @class */ (function (_super) {
    __extends(JqxTagCloud, _super);
    function JqxTagCloud(props) {
        var _this = _super.call(this, props) || this;
        /* tslint:disable:variable-name */
        _this._jqx = JQXLite;
        _this._id = 'JqxTagCloud' + _this._jqx.generateID();
        _this._componentSelector = '#' + _this._id;
        _this.state = { lastProps: props };
        return _this;
    }
    JqxTagCloud.getDerivedStateFromProps = function (props, state) {
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
    JqxTagCloud.prototype.componentDidMount = function () {
        var widgetOptions = this._manageProps();
        this._jqx(this._componentSelector).jqxTagCloud(widgetOptions);
        this._wireEvents();
    };
    JqxTagCloud.prototype.componentDidUpdate = function () {
        var widgetOptions = this._manageProps();
        this.setOptions(widgetOptions);
        this._wireEvents();
    };
    JqxTagCloud.prototype.render = function () {
        return (createElement("div", { id: this._id, className: this.props.className, style: this.props.style }, this.props.children));
    };
    JqxTagCloud.prototype.setOptions = function (options) {
        this._jqx(this._componentSelector).jqxTagCloud(options);
    };
    JqxTagCloud.prototype.getOptions = function (option) {
        return this._jqx(this._componentSelector).jqxTagCloud(option);
    };
    JqxTagCloud.prototype.destroy = function () {
        this._jqx(this._componentSelector).jqxTagCloud('destroy');
    };
    JqxTagCloud.prototype.findTagIndex = function (tag) {
        return this._jqx(this._componentSelector).jqxTagCloud('findTagIndex', tag);
    };
    JqxTagCloud.prototype.getHiddenTagsList = function () {
        return this._jqx(this._componentSelector).jqxTagCloud('getHiddenTagsList');
    };
    JqxTagCloud.prototype.getRenderedTags = function () {
        return this._jqx(this._componentSelector).jqxTagCloud('getRenderedTags');
    };
    JqxTagCloud.prototype.getTagsList = function () {
        return this._jqx(this._componentSelector).jqxTagCloud('getTagsList');
    };
    JqxTagCloud.prototype.hideItem = function (index) {
        this._jqx(this._componentSelector).jqxTagCloud('hideItem', index);
    };
    JqxTagCloud.prototype.insertAt = function (index, item) {
        this._jqx(this._componentSelector).jqxTagCloud('insertAt', index, item);
    };
    JqxTagCloud.prototype.removeAt = function (index) {
        this._jqx(this._componentSelector).jqxTagCloud('removeAt', index);
    };
    JqxTagCloud.prototype.updateAt = function (index, item) {
        this._jqx(this._componentSelector).jqxTagCloud('updateAt', index, item);
    };
    JqxTagCloud.prototype.showItem = function (index) {
        this._jqx(this._componentSelector).jqxTagCloud('showItem', index);
    };
    JqxTagCloud.prototype._manageProps = function () {
        var widgetProps = ['alterTextCase', 'disabled', 'displayLimit', 'displayMember', 'displayValue', 'fontSizeUnit', 'height', 'maxColor', 'maxFontSize', 'maxValueToDisplay', 'minColor', 'minFontSize', 'minValueToDisplay', 'rtl', 'sortBy', 'sortOrder', 'source', 'tagRenderer', 'takeTopWeightedItems', 'textColor', 'urlBase', 'urlMember', 'valueMember', 'width'];
        var options = {};
        for (var prop in this.props) {
            if (widgetProps.indexOf(prop) !== -1) {
                options[prop] = this.props[prop];
            }
        }
        return options;
    };
    JqxTagCloud.prototype._wireEvents = function () {
        for (var prop in this.props) {
            if (prop.indexOf('on') === 0) {
                var originalEventName = prop.slice(2);
                originalEventName = originalEventName.charAt(0).toLowerCase() + originalEventName.slice(1);
                this._jqx(this._componentSelector).off(originalEventName);
                this._jqx(this._componentSelector).on(originalEventName, this.props[prop]);
            }
        }
    };
    return JqxTagCloud;
}(PureComponent));
var jqx = window.jqx;
var JQXLite = window.JQXLite;

export default JqxTagCloud;
export { jqx, JQXLite };
