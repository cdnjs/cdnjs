import * as jqxcore from '../../jqwidgets/jqxcore';
import * as jqxdata from '../../jqwidgets/jqxdata';
import * as jqxbuttons from '../../jqwidgets/jqxbuttons';
import * as jqxscrollbar from '../../jqwidgets/jqxscrollbar';
import * as jqxmenu from '../../jqwidgets/jqxmenu';
import * as jqxwindow from '../../jqwidgets/jqxwindow';
import * as jqxdragdrop from '../../jqwidgets/jqxdragdrop';
import * as jqxcheckbox from '../../jqwidgets/jqxcheckbox';
import * as jqxinput from '../../jqwidgets/jqxinput';
import * as jqxlistbox from '../../jqwidgets/jqxlistbox';
import * as jqxdropdownlist from '../../jqwidgets/jqxdropdownlist';
import * as jqxpivot from '../../jqwidgets/jqxpivot';
import * as jqxpivotgrid from '../../jqwidgets/jqxpivotgrid';
import * as jqxpivotdesigner from '../../jqwidgets/jqxpivotdesigner';
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

var JqxPivotGrid = /** @class */ (function (_super) {
    __extends(JqxPivotGrid, _super);
    function JqxPivotGrid(props) {
        var _this = _super.call(this, props) || this;
        /* tslint:disable:variable-name */
        _this._jqx = JQXLite;
        _this._id = 'JqxPivotGrid' + _this._jqx.generateID();
        _this._componentSelector = '#' + _this._id;
        _this.state = { lastProps: props };
        return _this;
    }
    JqxPivotGrid.getDerivedStateFromProps = function (props, state) {
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
    JqxPivotGrid.prototype.componentDidMount = function () {
        var widgetOptions = this._manageProps();
        this._jqx(this._componentSelector).jqxPivotGrid(widgetOptions);
        this._wireEvents();
    };
    JqxPivotGrid.prototype.componentDidUpdate = function () {
        var widgetOptions = this._manageProps();
        this.setOptions(widgetOptions);
        this._wireEvents();
    };
    JqxPivotGrid.prototype.render = function () {
        return (createElement("div", { id: this._id, className: this.props.className, style: this.props.style }, this.props.children));
    };
    JqxPivotGrid.prototype.setOptions = function (options) {
        this._jqx(this._componentSelector).jqxPivotGrid(options);
    };
    JqxPivotGrid.prototype.getOptions = function (option) {
        return this._jqx(this._componentSelector).jqxPivotGrid(option);
    };
    JqxPivotGrid.prototype.getInstance = function () {
        return this._jqx(this._componentSelector).jqxPivotGrid('getInstance');
    };
    JqxPivotGrid.prototype.refresh = function () {
        this._jqx(this._componentSelector).jqxPivotGrid('refresh');
    };
    JqxPivotGrid.prototype.getPivotRows = function () {
        return this._jqx(this._componentSelector).jqxPivotGrid('getPivotRows');
    };
    JqxPivotGrid.prototype.getPivotColumns = function () {
        return this._jqx(this._componentSelector).jqxPivotGrid('getPivotColumns');
    };
    JqxPivotGrid.prototype.getPivotCells = function () {
        return this._jqx(this._componentSelector).jqxPivotGrid('getPivotCells');
    };
    JqxPivotGrid.prototype._manageProps = function () {
        var widgetProps = ['source', 'localization', 'scrollBarsEnabled', 'selectionEnabled', 'multipleSelectionEnabled', 'treeStyleRows', 'autoResize', 'itemsRenderer', 'cellsRenderer'];
        var options = {};
        for (var prop in this.props) {
            if (widgetProps.indexOf(prop) !== -1) {
                options[prop] = this.props[prop];
            }
        }
        return options;
    };
    JqxPivotGrid.prototype._wireEvents = function () {
        for (var prop in this.props) {
            if (prop.indexOf('on') === 0) {
                var originalEventName = prop.slice(2);
                originalEventName = originalEventName.charAt(0).toLowerCase() + originalEventName.slice(1);
                this._jqx(this._componentSelector).off(originalEventName);
                this._jqx(this._componentSelector).on(originalEventName, this.props[prop]);
            }
        }
    };
    return JqxPivotGrid;
}(PureComponent));
var jqx = window.jqx;
var JQXLite = window.JQXLite;

export default JqxPivotGrid;
export { jqx, JQXLite };
