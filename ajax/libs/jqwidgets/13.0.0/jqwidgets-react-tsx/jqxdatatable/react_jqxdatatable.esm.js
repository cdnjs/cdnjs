import * as jqxcore from '../../jqwidgets/jqxcore';
import * as jqxdata from '../../jqwidgets/jqxdata';
import * as jqxdataexport from '../../jqwidgets/jqxdata.export';
import * as jqxbuttons from '../../jqwidgets/jqxbuttons';
import * as jqxcheckbox from '../../jqwidgets/jqxcheckbox';
import * as jqxtooltip from '../../jqwidgets/jqxtooltip';
import * as jqxscrollbar from '../../jqwidgets/jqxscrollbar';
import * as jqxlistbox from '../../jqwidgets/jqxlistbox';
import * as jqxcombobox from '../../jqwidgets/jqxcombobox';
import * as jqxnumberinput from '../../jqwidgets/jqxnumberinput';
import * as jqxdropdownlist from '../../jqwidgets/jqxdropdownlist';
import * as jqxdatatable from '../../jqwidgets/jqxdatatable';
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

var JqxDataTable = /** @class */ (function (_super) {
    __extends(JqxDataTable, _super);
    function JqxDataTable(props) {
        var _this = _super.call(this, props) || this;
        /* tslint:disable:variable-name */
        _this._jqx = JQXLite;
        _this._id = 'JqxDataTable' + _this._jqx.generateID();
        _this._componentSelector = '#' + _this._id;
        _this.state = { lastProps: props };
        return _this;
    }
    JqxDataTable.getDerivedStateFromProps = function (props, state) {
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
    JqxDataTable.prototype.componentDidMount = function () {
        var widgetOptions = this._manageProps();
        this._jqx(this._componentSelector).jqxDataTable(widgetOptions);
        this._wireEvents();
    };
    JqxDataTable.prototype.componentDidUpdate = function () {
        var widgetOptions = this._manageProps();
        this.setOptions(widgetOptions);
        this._wireEvents();
    };
    JqxDataTable.prototype.render = function () {
        return (createElement("div", { id: this._id, className: this.props.className, style: this.props.style }, this.props.children));
    };
    JqxDataTable.prototype.setOptions = function (options) {
        this._jqx(this._componentSelector).jqxDataTable(options);
    };
    JqxDataTable.prototype.getOptions = function (option) {
        return this._jqx(this._componentSelector).jqxDataTable(option);
    };
    JqxDataTable.prototype.addRow = function (rowIndex, rowData, rowPosition) {
        this._jqx(this._componentSelector).jqxDataTable('addRow', rowIndex, rowData, rowPosition);
    };
    JqxDataTable.prototype.addFilter = function (dataField, filerGroup) {
        this._jqx(this._componentSelector).jqxDataTable('addFilter', dataField, filerGroup);
    };
    JqxDataTable.prototype.applyFilters = function () {
        this._jqx(this._componentSelector).jqxDataTable('applyFilters');
    };
    JqxDataTable.prototype.beginUpdate = function () {
        this._jqx(this._componentSelector).jqxDataTable('beginUpdate');
    };
    JqxDataTable.prototype.beginRowEdit = function (rowIndex) {
        this._jqx(this._componentSelector).jqxDataTable('beginRowEdit', rowIndex);
    };
    JqxDataTable.prototype.beginCellEdit = function (rowIndex, dataField) {
        this._jqx(this._componentSelector).jqxDataTable('beginCellEdit', rowIndex, dataField);
    };
    JqxDataTable.prototype.clearSelection = function () {
        this._jqx(this._componentSelector).jqxDataTable('clearSelection');
    };
    JqxDataTable.prototype.clearFilters = function () {
        this._jqx(this._componentSelector).jqxDataTable('clearFilters');
    };
    JqxDataTable.prototype.clear = function () {
        this._jqx(this._componentSelector).jqxDataTable('clear');
    };
    JqxDataTable.prototype.destroy = function () {
        this._jqx(this._componentSelector).jqxDataTable('destroy');
    };
    JqxDataTable.prototype.deleteRow = function (rowIndex) {
        this._jqx(this._componentSelector).jqxDataTable('deleteRow', rowIndex);
    };
    JqxDataTable.prototype.endUpdate = function () {
        this._jqx(this._componentSelector).jqxDataTable('endUpdate');
    };
    JqxDataTable.prototype.ensureRowVisible = function (rowIndex) {
        this._jqx(this._componentSelector).jqxDataTable('ensureRowVisible', rowIndex);
    };
    JqxDataTable.prototype.endRowEdit = function (rowIndex, cancelChanges) {
        this._jqx(this._componentSelector).jqxDataTable('endRowEdit', rowIndex, cancelChanges);
    };
    JqxDataTable.prototype.endCellEdit = function (rowIndex, dataField) {
        this._jqx(this._componentSelector).jqxDataTable('endCellEdit', rowIndex, dataField);
    };
    JqxDataTable.prototype.exportData = function (exportDataType) {
        return this._jqx(this._componentSelector).jqxDataTable('exportData', exportDataType);
    };
    JqxDataTable.prototype.focus = function () {
        this._jqx(this._componentSelector).jqxDataTable('focus');
    };
    JqxDataTable.prototype.getColumnProperty = function (dataField, propertyName) {
        return this._jqx(this._componentSelector).jqxDataTable('getColumnProperty', dataField, propertyName);
    };
    JqxDataTable.prototype.goToPage = function (pageIndex) {
        this._jqx(this._componentSelector).jqxDataTable('goToPage', pageIndex);
    };
    JqxDataTable.prototype.goToPrevPage = function () {
        this._jqx(this._componentSelector).jqxDataTable('goToPrevPage');
    };
    JqxDataTable.prototype.goToNextPage = function () {
        this._jqx(this._componentSelector).jqxDataTable('goToNextPage');
    };
    JqxDataTable.prototype.getSelection = function () {
        return this._jqx(this._componentSelector).jqxDataTable('getSelection');
    };
    JqxDataTable.prototype.getRows = function () {
        return this._jqx(this._componentSelector).jqxDataTable('getRows');
    };
    JqxDataTable.prototype.getView = function () {
        return this._jqx(this._componentSelector).jqxDataTable('getView');
    };
    JqxDataTable.prototype.getCellValue = function (rowIndex, dataField) {
        return this._jqx(this._componentSelector).jqxDataTable('getCellValue', rowIndex, dataField);
    };
    JqxDataTable.prototype.hideColumn = function (dataField) {
        this._jqx(this._componentSelector).jqxDataTable('hideColumn', dataField);
    };
    JqxDataTable.prototype.hideDetails = function (rowIndex) {
        this._jqx(this._componentSelector).jqxDataTable('hideDetails', rowIndex);
    };
    JqxDataTable.prototype.isBindingCompleted = function () {
        return this._jqx(this._componentSelector).jqxDataTable('isBindingCompleted');
    };
    JqxDataTable.prototype.lockRow = function (rowIndex) {
        this._jqx(this._componentSelector).jqxDataTable('lockRow', rowIndex);
    };
    JqxDataTable.prototype.refresh = function () {
        this._jqx(this._componentSelector).jqxDataTable('refresh');
    };
    JqxDataTable.prototype.renderWidget = function () {
        this._jqx(this._componentSelector).jqxDataTable('render');
    };
    JqxDataTable.prototype.removeFilter = function (dataField) {
        this._jqx(this._componentSelector).jqxDataTable('removeFilter', dataField);
    };
    JqxDataTable.prototype.scrollOffset = function (top, left) {
        this._jqx(this._componentSelector).jqxDataTable('scrollOffset', top, left);
    };
    JqxDataTable.prototype.setColumnProperty = function (dataField, propertyName, propertyValue) {
        this._jqx(this._componentSelector).jqxDataTable('setColumnProperty', dataField, propertyName, propertyValue);
    };
    JqxDataTable.prototype.showColumn = function (dataField) {
        this._jqx(this._componentSelector).jqxDataTable('showColumn', dataField);
    };
    JqxDataTable.prototype.selectRow = function (rowIndex) {
        this._jqx(this._componentSelector).jqxDataTable('selectRow', rowIndex);
    };
    JqxDataTable.prototype.showDetails = function (rowIndex) {
        this._jqx(this._componentSelector).jqxDataTable('showDetails', rowIndex);
    };
    JqxDataTable.prototype.setCellValue = function (rowIndex, dataField, value) {
        this._jqx(this._componentSelector).jqxDataTable('setCellValue', rowIndex, dataField, value);
    };
    JqxDataTable.prototype.sortBy = function (dataField, sortOrder) {
        this._jqx(this._componentSelector).jqxDataTable('sortBy', dataField, sortOrder);
    };
    JqxDataTable.prototype.updating = function () {
        return this._jqx(this._componentSelector).jqxDataTable('updating');
    };
    JqxDataTable.prototype.updateBoundData = function () {
        this._jqx(this._componentSelector).jqxDataTable('updateBoundData');
    };
    JqxDataTable.prototype.unselectRow = function (rowIndex) {
        this._jqx(this._componentSelector).jqxDataTable('unselectRow', rowIndex);
    };
    JqxDataTable.prototype.updateRow = function (rowIndex, rowData) {
        this._jqx(this._componentSelector).jqxDataTable('updateRow', rowIndex, rowData);
    };
    JqxDataTable.prototype.unlockRow = function (rowIndex) {
        this._jqx(this._componentSelector).jqxDataTable('unlockRow', rowIndex);
    };
    JqxDataTable.prototype._manageProps = function () {
        var widgetProps = ['altRows', 'autoRowHeight', 'aggregatesHeight', 'autoShowLoadElement', 'columnsHeight', 'columns', 'columnGroups', 'columnsResize', 'columnsReorder', 'disabled', 'editable', 'editSettings', 'exportSettings', 'enableHover', 'enableBrowserSelection', 'filterable', 'filterHeight', 'filterMode', 'groups', 'groupsRenderer', 'height', 'initRowDetails', 'incrementalSearch', 'localization', 'pagerHeight', 'pageSize', 'pageSizeOptions', 'pageable', 'pagerPosition', 'pagerMode', 'pagerButtonsCount', 'pagerRenderer', 'ready', 'rowDetails', 'renderToolbar', 'renderStatusBar', 'rendering', 'rendered', 'rtl', 'source', 'sortable', 'showAggregates', 'showToolbar', 'showStatusbar', 'enableSanitizeAll', 'statusBarHeight', 'scrollBarSize', 'selectionMode', 'serverProcessing', 'showHeader', 'theme', 'toolbarHeight', 'width'];
        var options = {};
        for (var prop in this.props) {
            if (widgetProps.indexOf(prop) !== -1) {
                options[prop] = this.props[prop];
            }
        }
        return options;
    };
    JqxDataTable.prototype._wireEvents = function () {
        for (var prop in this.props) {
            if (prop.indexOf('on') === 0) {
                var originalEventName = prop.slice(2);
                originalEventName = originalEventName.charAt(0).toLowerCase() + originalEventName.slice(1);
                this._jqx(this._componentSelector).off(originalEventName);
                this._jqx(this._componentSelector).on(originalEventName, this.props[prop]);
            }
        }
    };
    return JqxDataTable;
}(PureComponent));
var jqx = window.jqx;
var JQXLite = window.JQXLite;

export default JqxDataTable;
export { jqx, JQXLite };
