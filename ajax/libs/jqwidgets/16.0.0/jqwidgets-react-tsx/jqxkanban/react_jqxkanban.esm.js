import * as jqxcore from '../../jqwidgets/jqxcore';
import * as jqxsortable from '../../jqwidgets/jqxsortable';
import * as jqxsplitter from '../../jqwidgets/jqxsplitter';
import * as jqxdata from '../../jqwidgets/jqxdata';
import * as jqxkanban from '../../jqwidgets/jqxkanban';
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

var JqxKanban = /** @class */ (function (_super) {
    __extends(JqxKanban, _super);
    function JqxKanban(props) {
        var _this = _super.call(this, props) || this;
        /* tslint:disable:variable-name */
        _this._jqx = JQXLite;
        _this._id = 'JqxKanban' + _this._jqx.generateID();
        _this._componentSelector = '#' + _this._id;
        _this.state = { lastProps: props };
        return _this;
    }
    JqxKanban.getDerivedStateFromProps = function (props, state) {
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
    JqxKanban.prototype.componentDidMount = function () {
        var widgetOptions = this._manageProps();
        this._jqx(this._componentSelector).jqxKanban(widgetOptions);
        this._wireEvents();
    };
    JqxKanban.prototype.componentDidUpdate = function () {
        var widgetOptions = this._manageProps();
        this.setOptions(widgetOptions);
        this._wireEvents();
    };
    JqxKanban.prototype.render = function () {
        return (createElement("div", { id: this._id, className: this.props.className, style: this.props.style }, this.props.children));
    };
    JqxKanban.prototype.setOptions = function (options) {
        this._jqx(this._componentSelector).jqxKanban(options);
    };
    JqxKanban.prototype.getOptions = function (option) {
        return this._jqx(this._componentSelector).jqxKanban(option);
    };
    JqxKanban.prototype.addItem = function (newItem) {
        this._jqx(this._componentSelector).jqxKanban('addItem', newItem);
    };
    JqxKanban.prototype.destroy = function () {
        this._jqx(this._componentSelector).jqxKanban('destroy');
    };
    JqxKanban.prototype.getColumn = function (dataField) {
        return this._jqx(this._componentSelector).jqxKanban('getColumn', dataField);
    };
    JqxKanban.prototype.getColumnItems = function (dataField) {
        return this._jqx(this._componentSelector).jqxKanban('getColumnItems', dataField);
    };
    JqxKanban.prototype.getItems = function () {
        return this._jqx(this._componentSelector).jqxKanban('getItems');
    };
    JqxKanban.prototype.removeItem = function (itemId) {
        this._jqx(this._componentSelector).jqxKanban('removeItem', itemId);
    };
    JqxKanban.prototype.updateItem = function (itemId, newContent) {
        this._jqx(this._componentSelector).jqxKanban('updateItem', itemId, newContent);
    };
    JqxKanban.prototype._manageProps = function () {
        var widgetProps = ['columnRenderer', 'columns', 'connectWith', 'headerHeight', 'headerWidth', 'height', 'itemRenderer', 'ready', 'rtl', 'source', 'resources', 'template', 'templateContent', 'theme', 'width'];
        var options = {};
        for (var prop in this.props) {
            if (widgetProps.indexOf(prop) !== -1) {
                options[prop] = this.props[prop];
            }
        }
        return options;
    };
    JqxKanban.prototype._wireEvents = function () {
        for (var prop in this.props) {
            if (prop.indexOf('on') === 0) {
                var originalEventName = prop.slice(2);
                originalEventName = originalEventName.charAt(0).toLowerCase() + originalEventName.slice(1);
                this._jqx(this._componentSelector).off(originalEventName);
                this._jqx(this._componentSelector).on(originalEventName, this.props[prop]);
            }
        }
    };
    return JqxKanban;
}(PureComponent));
var jqx = window.jqx;
var JQXLite = window.JQXLite;

export default JqxKanban;
export { jqx, JQXLite };
