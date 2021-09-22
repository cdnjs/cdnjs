require('../../jqwidgets/jqxcore');
require('../../jqwidgets/jqxdata');
require(('../../jqwidgets/jqxdata.export');
require('../../jqwidgets/jqxbuttons');
require('../../jqwidgets/jqxcheckbox');
require('../../jqwidgets/jqxtooltip');
require('../../jqwidgets/jqxscrollbar');
require('../../jqwidgets/jqxlistbox');
require('../../jqwidgets/jqxcombobox');
require('../../jqwidgets/jqxnumberinput');
require('../../jqwidgets/jqxdropdownlist');
require('../../jqwidgets/jqxdatatable');
require('../../jqwidgets/jqxtreegrid');
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('react')) :
    typeof define === 'function' && define.amd ? define(['exports', 'react'], factory) :
    (factory((global.react_jqxtreegrid = {}),global.React));
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

    var JqxTreeGrid = /** @class */ (function (_super) {
        __extends(JqxTreeGrid, _super);
        function JqxTreeGrid(props) {
            var _this = _super.call(this, props) || this;
            /* tslint:disable:variable-name */
            _this._jqx = JQXLite;
            _this._id = 'JqxTreeGrid' + _this._jqx.generateID();
            _this._componentSelector = '#' + _this._id;
            _this.state = { lastProps: props };
            return _this;
        }
        JqxTreeGrid.getDerivedStateFromProps = function (props, state) {
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
        JqxTreeGrid.prototype.componentDidMount = function () {
            var widgetOptions = this._manageProps();
            this._jqx(this._componentSelector).jqxTreeGrid(widgetOptions);
            this._wireEvents();
        };
        JqxTreeGrid.prototype.componentDidUpdate = function () {
            var widgetOptions = this._manageProps();
            this.setOptions(widgetOptions);
            this._wireEvents();
        };
        JqxTreeGrid.prototype.render = function () {
            return (React.createElement("div", { id: this._id, className: this.props.className, style: this.props.style }, this.props.children));
        };
        JqxTreeGrid.prototype.setOptions = function (options) {
            this._jqx(this._componentSelector).jqxTreeGrid(options);
        };
        JqxTreeGrid.prototype.getOptions = function (option) {
            return this._jqx(this._componentSelector).jqxTreeGrid(option);
        };
        JqxTreeGrid.prototype.addRow = function (rowKey, rowData, rowPosition, parent) {
            this._jqx(this._componentSelector).jqxTreeGrid('addRow', rowKey, rowData, rowPosition, parent);
        };
        JqxTreeGrid.prototype.addFilter = function (dataField, filerGroup) {
            this._jqx(this._componentSelector).jqxTreeGrid('addFilter', dataField, filerGroup);
        };
        JqxTreeGrid.prototype.applyFilters = function () {
            this._jqx(this._componentSelector).jqxTreeGrid('applyFilters');
        };
        JqxTreeGrid.prototype.beginUpdate = function () {
            this._jqx(this._componentSelector).jqxTreeGrid('beginUpdate');
        };
        JqxTreeGrid.prototype.beginRowEdit = function (rowKey) {
            this._jqx(this._componentSelector).jqxTreeGrid('beginRowEdit', rowKey);
        };
        JqxTreeGrid.prototype.beginCellEdit = function (rowKey, dataField) {
            this._jqx(this._componentSelector).jqxTreeGrid('beginCellEdit', rowKey, dataField);
        };
        JqxTreeGrid.prototype.clearSelection = function () {
            this._jqx(this._componentSelector).jqxTreeGrid('clearSelection');
        };
        JqxTreeGrid.prototype.clearFilters = function () {
            this._jqx(this._componentSelector).jqxTreeGrid('clearFilters');
        };
        JqxTreeGrid.prototype.clear = function () {
            this._jqx(this._componentSelector).jqxTreeGrid('clear');
        };
        JqxTreeGrid.prototype.checkRow = function (rowKey) {
            this._jqx(this._componentSelector).jqxTreeGrid('checkRow', rowKey);
        };
        JqxTreeGrid.prototype.collapseRow = function (rowKey) {
            this._jqx(this._componentSelector).jqxTreeGrid('collapseRow', rowKey);
        };
        JqxTreeGrid.prototype.collapseAll = function () {
            this._jqx(this._componentSelector).jqxTreeGrid('collapseAll');
        };
        JqxTreeGrid.prototype.destroy = function () {
            this._jqx(this._componentSelector).jqxTreeGrid('destroy');
        };
        JqxTreeGrid.prototype.deleteRow = function (rowKey) {
            this._jqx(this._componentSelector).jqxTreeGrid('deleteRow', rowKey);
        };
        JqxTreeGrid.prototype.expandRow = function (rowKey) {
            this._jqx(this._componentSelector).jqxTreeGrid('expandRow', rowKey);
        };
        JqxTreeGrid.prototype.expandAll = function () {
            this._jqx(this._componentSelector).jqxTreeGrid('expandAll');
        };
        JqxTreeGrid.prototype.endUpdate = function () {
            this._jqx(this._componentSelector).jqxTreeGrid('endUpdate');
        };
        JqxTreeGrid.prototype.ensureRowVisible = function (rowKey) {
            this._jqx(this._componentSelector).jqxTreeGrid('ensureRowVisible', rowKey);
        };
        JqxTreeGrid.prototype.endRowEdit = function (rowKey, cancelChanges) {
            this._jqx(this._componentSelector).jqxTreeGrid('endRowEdit', rowKey, cancelChanges);
        };
        JqxTreeGrid.prototype.endCellEdit = function (rowKey, dataField, cancelChanges) {
            this._jqx(this._componentSelector).jqxTreeGrid('endCellEdit', rowKey, dataField, cancelChanges);
        };
        JqxTreeGrid.prototype.exportData = function (exportDataType) {
            return this._jqx(this._componentSelector).jqxTreeGrid('exportData', exportDataType);
        };
        JqxTreeGrid.prototype.focus = function () {
            this._jqx(this._componentSelector).jqxTreeGrid('focus');
        };
        JqxTreeGrid.prototype.getColumnProperty = function (dataField, propertyName) {
            return this._jqx(this._componentSelector).jqxTreeGrid('getColumnProperty', dataField, propertyName);
        };
        JqxTreeGrid.prototype.goToPage = function (pageIndex) {
            this._jqx(this._componentSelector).jqxTreeGrid('goToPage', pageIndex);
        };
        JqxTreeGrid.prototype.goToPrevPage = function () {
            this._jqx(this._componentSelector).jqxTreeGrid('goToPrevPage');
        };
        JqxTreeGrid.prototype.goToNextPage = function () {
            this._jqx(this._componentSelector).jqxTreeGrid('goToNextPage');
        };
        JqxTreeGrid.prototype.getSelection = function () {
            return this._jqx(this._componentSelector).jqxTreeGrid('getSelection');
        };
        JqxTreeGrid.prototype.getKey = function (row) {
            return this._jqx(this._componentSelector).jqxTreeGrid('getKey', row);
        };
        JqxTreeGrid.prototype.getRow = function (rowKey) {
            return this._jqx(this._componentSelector).jqxTreeGrid('getRow', rowKey);
        };
        JqxTreeGrid.prototype.getRows = function () {
            return this._jqx(this._componentSelector).jqxTreeGrid('getRows');
        };
        JqxTreeGrid.prototype.getCheckedRows = function () {
            return this._jqx(this._componentSelector).jqxTreeGrid('getCheckedRows');
        };
        JqxTreeGrid.prototype.getView = function () {
            return this._jqx(this._componentSelector).jqxTreeGrid('getView');
        };
        JqxTreeGrid.prototype.getCellValue = function (rowKey, dataField) {
            return this._jqx(this._componentSelector).jqxTreeGrid('getCellValue', rowKey, dataField);
        };
        JqxTreeGrid.prototype.hideColumn = function (dataField) {
            this._jqx(this._componentSelector).jqxTreeGrid('hideColumn', dataField);
        };
        JqxTreeGrid.prototype.isBindingCompleted = function () {
            return this._jqx(this._componentSelector).jqxTreeGrid('isBindingCompleted');
        };
        JqxTreeGrid.prototype.lockRow = function (rowKey) {
            this._jqx(this._componentSelector).jqxTreeGrid('lockRow', rowKey);
        };
        JqxTreeGrid.prototype.refresh = function () {
            this._jqx(this._componentSelector).jqxTreeGrid('refresh');
        };
        JqxTreeGrid.prototype.renderWidget = function () {
            this._jqx(this._componentSelector).jqxTreeGrid('render');
        };
        JqxTreeGrid.prototype.removeFilter = function (dataField) {
            this._jqx(this._componentSelector).jqxTreeGrid('removeFilter', dataField);
        };
        JqxTreeGrid.prototype.scrollOffset = function (top, left) {
            return this._jqx(this._componentSelector).jqxTreeGrid('scrollOffset', top, left);
        };
        JqxTreeGrid.prototype.setColumnProperty = function (dataField, propertyName, propertyValue) {
            this._jqx(this._componentSelector).jqxTreeGrid('setColumnProperty', dataField, propertyName, propertyValue);
        };
        JqxTreeGrid.prototype.showColumn = function (dataField) {
            this._jqx(this._componentSelector).jqxTreeGrid('showColumn', dataField);
        };
        JqxTreeGrid.prototype.selectRow = function (rowId) {
            this._jqx(this._componentSelector).jqxTreeGrid('selectRow', rowId);
        };
        JqxTreeGrid.prototype.setCellValue = function (rowId, dataField, cellValue) {
            this._jqx(this._componentSelector).jqxTreeGrid('setCellValue', rowId, dataField, cellValue);
        };
        JqxTreeGrid.prototype.sortBy = function (dataField, sortOrder) {
            this._jqx(this._componentSelector).jqxTreeGrid('sortBy', dataField, sortOrder);
        };
        JqxTreeGrid.prototype.updating = function () {
            return this._jqx(this._componentSelector).jqxTreeGrid('updating');
        };
        JqxTreeGrid.prototype.updateBoundData = function () {
            this._jqx(this._componentSelector).jqxTreeGrid('updateBoundData');
        };
        JqxTreeGrid.prototype.unselectRow = function (rowId) {
            this._jqx(this._componentSelector).jqxTreeGrid('unselectRow', rowId);
        };
        JqxTreeGrid.prototype.uncheckRow = function (rowId) {
            this._jqx(this._componentSelector).jqxTreeGrid('uncheckRow', rowId);
        };
        JqxTreeGrid.prototype.updateRow = function (rowId, data) {
            this._jqx(this._componentSelector).jqxTreeGrid('updateRow', rowId, data);
        };
        JqxTreeGrid.prototype.unlockRow = function (rowId) {
            this._jqx(this._componentSelector).jqxTreeGrid('unlockRow', rowId);
        };
        JqxTreeGrid.prototype._manageProps = function () {
            var widgetProps = ['altRows', 'autoRowHeight', 'aggregatesHeight', 'autoShowLoadElement', 'checkboxes', 'columnsHeight', 'columns', 'columnGroups', 'columnsResize', 'columnsReorder', 'disabled', 'editable', 'editSettings', 'exportSettings', 'enableHover', 'enableBrowserSelection', 'filterable', 'filterHeight', 'filterMode', 'height', 'hierarchicalCheckboxes', 'icons', 'incrementalSearch', 'localization', 'pagerHeight', 'pageSize', 'pageSizeOptions', 'pageable', 'pagerPosition', 'pagerMode', 'pageSizeMode', 'pagerButtonsCount', 'pagerRenderer', 'ready', 'rowDetails', 'rowDetailsRenderer', 'renderToolbar', 'renderStatusBar', 'rendering', 'rendered', 'rtl', 'source', 'sortable', 'showAggregates', 'showSubAggregates', 'showToolbar', 'showStatusbar', 'statusBarHeight', 'scrollBarSize', 'selectionMode', 'showHeader', 'theme', 'toolbarHeight', 'width', 'virtualModeCreateRecords', 'virtualModeRecordCreating'];
            var options = {};
            for (var prop in this.props) {
                if (widgetProps.indexOf(prop) !== -1) {
                    options[prop] = this.props[prop];
                }
            }
            return options;
        };
        JqxTreeGrid.prototype._wireEvents = function () {
            for (var prop in this.props) {
                if (prop.indexOf('on') === 0) {
                    var originalEventName = prop.slice(2);
                    originalEventName = originalEventName.charAt(0).toLowerCase() + originalEventName.slice(1);
                    this._jqx(this._componentSelector).off(originalEventName);
                    this._jqx(this._componentSelector).on(originalEventName, this.props[prop]);
                }
            }
        };
        return JqxTreeGrid;
    }(React.PureComponent));
    var jqx = window.jqx;
    var JQXLite = window.JQXLite;

    exports.default = JqxTreeGrid;
    exports.jqx = jqx;
    exports.JQXLite = JQXLite;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
