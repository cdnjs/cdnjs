require('../../jqwidgets/jqxcore');
require('../../jqwidgets/jqxdata');
require('../../jqwidgets/jqxdata.export');
require('../../jqwidgets/jqxbuttons');
require('../../jqwidgets/jqxbuttongroup');
require('../../jqwidgets/jqxscrollbar');
require('../../jqwidgets/jqxmenu');
require('../../jqwidgets/jqxlistbox');
require('../../jqwidgets/jqxdropdownlist');
require('../../jqwidgets/jqxcombobox');
require('../../jqwidgets/jqxnumberinput');
require('../../jqwidgets/jqxcheckbox');
require('../../jqwidgets/globalization/globalize');
require('../../jqwidgets/jqxcalendar');
require('../../jqwidgets/jqxdatetimeinput');
require('../../jqwidgets/jqxgrid');
require('../../jqwidgets/jqxgrid.edit');
require('../../jqwidgets/jqxgrid.pager');
require('../../jqwidgets/jqxgrid.selection');
require('../../jqwidgets/jqxgrid.filter');
require('../../jqwidgets/jqxgrid.sort');
require('../../jqwidgets/jqxgrid.storage');
require('../../jqwidgets/jqxgrid.grouping');
require('../../jqwidgets/jqxgrid.export');
require('../../jqwidgets/jqxgrid.columnsresize');
require('../../jqwidgets/jqxgrid.columnsreorder');
require('../../jqwidgets/jqxgrid.aggregates');
require('../../jqwidgets/jqxgrid.chart');
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('react')) :
    typeof define === 'function' && define.amd ? define(['exports', 'react'], factory) :
    (factory((global.react_jqxgrid = {}),global.React));
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

    var JqxGrid = /** @class */ (function (_super) {
        __extends(JqxGrid, _super);
        function JqxGrid(props) {
            var _this = _super.call(this, props) || this;
            /* tslint:disable:variable-name */
            _this._jqx = JQXLite;
            _this._id = 'JqxGrid' + _this._jqx.generateID();
            _this._componentSelector = '#' + _this._id;
            _this.state = { lastProps: props };
            return _this;
        }
        JqxGrid.getDerivedStateFromProps = function (props, state) {
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
        JqxGrid.prototype.componentDidMount = function () {
            var widgetOptions = this._manageProps();
            this._jqx(this._componentSelector).jqxGrid(widgetOptions);
            this._wireEvents();
        };
        JqxGrid.prototype.componentDidUpdate = function () {
            var widgetOptions = this._manageProps();
            this.setOptions(widgetOptions);
            this._wireEvents();
        };
        JqxGrid.prototype.render = function () {
            return (React.createElement("div", { id: this._id, className: this.props.className, style: this.props.style }, this.props.children));
        };
        JqxGrid.prototype.setOptions = function (options) {
            this._jqx(this._componentSelector).jqxGrid(options);
        };
        JqxGrid.prototype.getOptions = function (option) {
            return this._jqx(this._componentSelector).jqxGrid(option);
        };
        JqxGrid.prototype.autoresizecolumns = function (type) {
            this._jqx(this._componentSelector).jqxGrid('autoresizecolumns', type);
        };
        JqxGrid.prototype.autoresizecolumn = function (dataField, type) {
            this._jqx(this._componentSelector).jqxGrid('autoresizecolumn', dataField, type);
        };
        JqxGrid.prototype.beginupdate = function () {
            this._jqx(this._componentSelector).jqxGrid('beginupdate');
        };
        JqxGrid.prototype.clear = function () {
            this._jqx(this._componentSelector).jqxGrid('clear');
        };
        JqxGrid.prototype.createChart = function (type, dataSource) {
            this._jqx(this._componentSelector).jqxGrid('createChart', type, dataSource);
        };
        JqxGrid.prototype.destroy = function () {
            this._jqx(this._componentSelector).jqxGrid('destroy');
        };
        JqxGrid.prototype.endupdate = function () {
            this._jqx(this._componentSelector).jqxGrid('endupdate');
        };
        JqxGrid.prototype.ensurerowvisible = function (rowBoundIndex) {
            this._jqx(this._componentSelector).jqxGrid('ensurerowvisible', rowBoundIndex);
        };
        JqxGrid.prototype.focus = function () {
            this._jqx(this._componentSelector).jqxGrid('focus');
        };
        JqxGrid.prototype.getcolumnindex = function (dataField) {
            return this._jqx(this._componentSelector).jqxGrid('getcolumnindex', dataField);
        };
        JqxGrid.prototype.getcolumn = function (dataField) {
            return this._jqx(this._componentSelector).jqxGrid('getcolumn', dataField);
        };
        JqxGrid.prototype.getcolumnproperty = function (dataField, propertyName) {
            return this._jqx(this._componentSelector).jqxGrid('getcolumnproperty', dataField, propertyName);
        };
        JqxGrid.prototype.getrowid = function (rowBoundIndex) {
            return this._jqx(this._componentSelector).jqxGrid('getrowid', rowBoundIndex);
        };
        JqxGrid.prototype.getrowdata = function (rowBoundIndex) {
            return this._jqx(this._componentSelector).jqxGrid('getrowdata', rowBoundIndex);
        };
        JqxGrid.prototype.getrowdatabyid = function (rowID) {
            return this._jqx(this._componentSelector).jqxGrid('getrowdatabyid', rowID);
        };
        JqxGrid.prototype.getrowboundindexbyid = function (rowID) {
            return this._jqx(this._componentSelector).jqxGrid('getrowboundindexbyid', rowID);
        };
        JqxGrid.prototype.getrowboundindex = function (rowDisplayIndex) {
            return this._jqx(this._componentSelector).jqxGrid('getrowboundindex', rowDisplayIndex);
        };
        JqxGrid.prototype.getrows = function () {
            return this._jqx(this._componentSelector).jqxGrid('getrows');
        };
        JqxGrid.prototype.getboundrows = function () {
            return this._jqx(this._componentSelector).jqxGrid('getboundrows');
        };
        JqxGrid.prototype.getdisplayrows = function () {
            return this._jqx(this._componentSelector).jqxGrid('getdisplayrows');
        };
        JqxGrid.prototype.getdatainformation = function () {
            return this._jqx(this._componentSelector).jqxGrid('getdatainformation');
        };
        JqxGrid.prototype.getsortinformation = function () {
            return this._jqx(this._componentSelector).jqxGrid('getsortinformation');
        };
        JqxGrid.prototype.getpaginginformation = function () {
            return this._jqx(this._componentSelector).jqxGrid('getpaginginformation');
        };
        JqxGrid.prototype.hidecolumn = function (dataField) {
            this._jqx(this._componentSelector).jqxGrid('hidecolumn', dataField);
        };
        JqxGrid.prototype.hideloadelement = function () {
            this._jqx(this._componentSelector).jqxGrid('hideloadelement');
        };
        JqxGrid.prototype.hiderowdetails = function (rowBoundIndex) {
            this._jqx(this._componentSelector).jqxGrid('hiderowdetails', rowBoundIndex);
        };
        JqxGrid.prototype.iscolumnvisible = function (dataField) {
            return this._jqx(this._componentSelector).jqxGrid('iscolumnvisible', dataField);
        };
        JqxGrid.prototype.iscolumnpinned = function (dataField) {
            return this._jqx(this._componentSelector).jqxGrid('iscolumnpinned', dataField);
        };
        JqxGrid.prototype.localizestrings = function (localizationobject) {
            this._jqx(this._componentSelector).jqxGrid('localizestrings', localizationobject);
        };
        JqxGrid.prototype.pincolumn = function (dataField) {
            this._jqx(this._componentSelector).jqxGrid('pincolumn', dataField);
        };
        JqxGrid.prototype.refreshdata = function () {
            this._jqx(this._componentSelector).jqxGrid('refreshdata');
        };
        JqxGrid.prototype.refresh = function () {
            this._jqx(this._componentSelector).jqxGrid('refresh');
        };
        JqxGrid.prototype.renderWidget = function () {
            this._jqx(this._componentSelector).jqxGrid('render');
        };
        JqxGrid.prototype.scrolloffset = function (top, left) {
            this._jqx(this._componentSelector).jqxGrid('scrolloffset', top, left);
        };
        JqxGrid.prototype.scrollposition = function () {
            return this._jqx(this._componentSelector).jqxGrid('scrollposition');
        };
        JqxGrid.prototype.showloadelement = function () {
            this._jqx(this._componentSelector).jqxGrid('showloadelement');
        };
        JqxGrid.prototype.showrowdetails = function (rowBoundIndex) {
            this._jqx(this._componentSelector).jqxGrid('showrowdetails', rowBoundIndex);
        };
        JqxGrid.prototype.setcolumnindex = function (dataField, index) {
            this._jqx(this._componentSelector).jqxGrid('setcolumnindex', dataField, index);
        };
        JqxGrid.prototype.setcolumnproperty = function (dataField, propertyName, propertyValue) {
            this._jqx(this._componentSelector).jqxGrid('setcolumnproperty', dataField, propertyName, propertyValue);
        };
        JqxGrid.prototype.showcolumn = function (dataField) {
            this._jqx(this._componentSelector).jqxGrid('showcolumn', dataField);
        };
        JqxGrid.prototype.unpincolumn = function (dataField) {
            this._jqx(this._componentSelector).jqxGrid('unpincolumn', dataField);
        };
        JqxGrid.prototype.updatebounddata = function (type) {
            this._jqx(this._componentSelector).jqxGrid('updatebounddata', type);
        };
        JqxGrid.prototype.updating = function () {
            return this._jqx(this._componentSelector).jqxGrid('updating');
        };
        JqxGrid.prototype.getsortcolumn = function () {
            return this._jqx(this._componentSelector).jqxGrid('getsortcolumn');
        };
        JqxGrid.prototype.removesort = function () {
            this._jqx(this._componentSelector).jqxGrid('removesort');
        };
        JqxGrid.prototype.sortby = function (dataField, sortOrder) {
            this._jqx(this._componentSelector).jqxGrid('sortby', dataField, sortOrder);
        };
        JqxGrid.prototype.addgroup = function (dataField) {
            this._jqx(this._componentSelector).jqxGrid('addgroup', dataField);
        };
        JqxGrid.prototype.cleargroups = function () {
            this._jqx(this._componentSelector).jqxGrid('cleargroups');
        };
        JqxGrid.prototype.collapsegroup = function (group) {
            this._jqx(this._componentSelector).jqxGrid('collapsegroup', group);
        };
        JqxGrid.prototype.collapseallgroups = function () {
            this._jqx(this._componentSelector).jqxGrid('collapseallgroups');
        };
        JqxGrid.prototype.expandallgroups = function () {
            this._jqx(this._componentSelector).jqxGrid('expandallgroups');
        };
        JqxGrid.prototype.expandgroup = function (group) {
            this._jqx(this._componentSelector).jqxGrid('expandgroup', group);
        };
        JqxGrid.prototype.getrootgroupscount = function () {
            return this._jqx(this._componentSelector).jqxGrid('getrootgroupscount');
        };
        JqxGrid.prototype.getgroup = function (groupIndex) {
            return this._jqx(this._componentSelector).jqxGrid('getgroup', groupIndex);
        };
        JqxGrid.prototype.insertgroup = function (groupIndex, dataField) {
            this._jqx(this._componentSelector).jqxGrid('insertgroup', groupIndex, dataField);
        };
        JqxGrid.prototype.iscolumngroupable = function () {
            return this._jqx(this._componentSelector).jqxGrid('iscolumngroupable');
        };
        JqxGrid.prototype.removegroupat = function (groupIndex) {
            this._jqx(this._componentSelector).jqxGrid('removegroupat', groupIndex);
        };
        JqxGrid.prototype.removegroup = function (dataField) {
            this._jqx(this._componentSelector).jqxGrid('removegroup', dataField);
        };
        JqxGrid.prototype.addfilter = function (dataField, filterGroup, refreshGrid) {
            this._jqx(this._componentSelector).jqxGrid('addfilter', dataField, filterGroup, refreshGrid);
        };
        JqxGrid.prototype.applyfilters = function () {
            this._jqx(this._componentSelector).jqxGrid('applyfilters');
        };
        JqxGrid.prototype.clearfilters = function () {
            this._jqx(this._componentSelector).jqxGrid('clearfilters');
        };
        JqxGrid.prototype.getfilterinformation = function () {
            return this._jqx(this._componentSelector).jqxGrid('getfilterinformation');
        };
        JqxGrid.prototype.getcolumnat = function (index) {
            return this._jqx(this._componentSelector).jqxGrid('getcolumnat', index);
        };
        JqxGrid.prototype.removefilter = function (dataField, refreshGrid) {
            this._jqx(this._componentSelector).jqxGrid('removefilter', dataField, refreshGrid);
        };
        JqxGrid.prototype.refreshfilterrow = function () {
            this._jqx(this._componentSelector).jqxGrid('refreshfilterrow');
        };
        JqxGrid.prototype.gotopage = function (pagenumber) {
            this._jqx(this._componentSelector).jqxGrid('gotopage', pagenumber);
        };
        JqxGrid.prototype.gotoprevpage = function () {
            this._jqx(this._componentSelector).jqxGrid('gotoprevpage');
        };
        JqxGrid.prototype.gotonextpage = function () {
            this._jqx(this._componentSelector).jqxGrid('gotonextpage');
        };
        JqxGrid.prototype.addrow = function (rowIds, data, rowPosition) {
            this._jqx(this._componentSelector).jqxGrid('addrow', rowIds, data, rowPosition);
        };
        JqxGrid.prototype.begincelledit = function (rowBoundIndex, dataField) {
            this._jqx(this._componentSelector).jqxGrid('begincelledit', rowBoundIndex, dataField);
        };
        JqxGrid.prototype.beginrowedit = function (rowBoundIndex) {
            this._jqx(this._componentSelector).jqxGrid('beginrowedit', rowBoundIndex);
        };
        JqxGrid.prototype.closemenu = function () {
            this._jqx(this._componentSelector).jqxGrid('closemenu');
        };
        JqxGrid.prototype.deleterow = function (rowIds) {
            this._jqx(this._componentSelector).jqxGrid('deleterow', rowIds);
        };
        JqxGrid.prototype.endcelledit = function (rowBoundIndex, dataField, confirmChanges) {
            this._jqx(this._componentSelector).jqxGrid('endcelledit', rowBoundIndex, dataField, confirmChanges);
        };
        JqxGrid.prototype.endrowedit = function (rowBoundIndex, confirmChanges) {
            this._jqx(this._componentSelector).jqxGrid('endrowedit', rowBoundIndex, confirmChanges);
        };
        JqxGrid.prototype.getcell = function (rowBoundIndex, datafield) {
            return this._jqx(this._componentSelector).jqxGrid('getcell', rowBoundIndex, datafield);
        };
        JqxGrid.prototype.getcellatposition = function (left, top) {
            return this._jqx(this._componentSelector).jqxGrid('getcellatposition', left, top);
        };
        JqxGrid.prototype.getcelltext = function (rowBoundIndex, dataField) {
            return this._jqx(this._componentSelector).jqxGrid('getcelltext', rowBoundIndex, dataField);
        };
        JqxGrid.prototype.getcelltextbyid = function (rowID, dataField) {
            return this._jqx(this._componentSelector).jqxGrid('getcelltextbyid', rowID, dataField);
        };
        JqxGrid.prototype.getcellvaluebyid = function (rowID, dataField) {
            return this._jqx(this._componentSelector).jqxGrid('getcellvaluebyid', rowID, dataField);
        };
        JqxGrid.prototype.getcellvalue = function (rowBoundIndex, dataField) {
            return this._jqx(this._componentSelector).jqxGrid('getcellvalue', rowBoundIndex, dataField);
        };
        JqxGrid.prototype.isBindingCompleted = function () {
            return this._jqx(this._componentSelector).jqxGrid('isBindingCompleted');
        };
        JqxGrid.prototype.openmenu = function (dataField) {
            this._jqx(this._componentSelector).jqxGrid('openmenu', dataField);
        };
        JqxGrid.prototype.setcellvalue = function (rowBoundIndex, dataField, value) {
            this._jqx(this._componentSelector).jqxGrid('setcellvalue', rowBoundIndex, dataField, value);
        };
        JqxGrid.prototype.setcellvaluebyid = function (rowID, dataField, value) {
            this._jqx(this._componentSelector).jqxGrid('setcellvaluebyid', rowID, dataField, value);
        };
        JqxGrid.prototype.showvalidationpopup = function (rowBoundIndex, dataField, validationMessage) {
            this._jqx(this._componentSelector).jqxGrid('showvalidationpopup', rowBoundIndex, dataField, validationMessage);
        };
        JqxGrid.prototype.updaterow = function (rowIds, data) {
            this._jqx(this._componentSelector).jqxGrid('updaterow', rowIds, data);
        };
        JqxGrid.prototype.clearselection = function () {
            this._jqx(this._componentSelector).jqxGrid('clearselection');
        };
        JqxGrid.prototype.getselectedrowindex = function () {
            return this._jqx(this._componentSelector).jqxGrid('getselectedrowindex');
        };
        JqxGrid.prototype.getselectedrowindexes = function () {
            return this._jqx(this._componentSelector).jqxGrid('getselectedrowindexes');
        };
        JqxGrid.prototype.getselectedcell = function () {
            return this._jqx(this._componentSelector).jqxGrid('getselectedcell');
        };
        JqxGrid.prototype.getselectedcells = function () {
            return this._jqx(this._componentSelector).jqxGrid('getselectedcells');
        };
        JqxGrid.prototype.selectcell = function (rowBoundIndex, dataField) {
            this._jqx(this._componentSelector).jqxGrid('selectcell', rowBoundIndex, dataField);
        };
        JqxGrid.prototype.selectallrows = function () {
            this._jqx(this._componentSelector).jqxGrid('selectallrows');
        };
        JqxGrid.prototype.selectrow = function (rowBoundIndex) {
            this._jqx(this._componentSelector).jqxGrid('selectrow', rowBoundIndex);
        };
        JqxGrid.prototype.unselectrow = function (rowBoundIndex) {
            this._jqx(this._componentSelector).jqxGrid('unselectrow', rowBoundIndex);
        };
        JqxGrid.prototype.unselectcell = function (rowBoundIndex, dataField) {
            this._jqx(this._componentSelector).jqxGrid('unselectcell', rowBoundIndex, dataField);
        };
        JqxGrid.prototype.getcolumnaggregateddata = function (dataField, aggregates) {
            return this._jqx(this._componentSelector).jqxGrid('getcolumnaggregateddata', dataField, aggregates);
        };
        JqxGrid.prototype.refreshaggregates = function () {
            this._jqx(this._componentSelector).jqxGrid('refreshaggregates');
        };
        JqxGrid.prototype.renderaggregates = function () {
            this._jqx(this._componentSelector).jqxGrid('renderaggregates');
        };
        JqxGrid.prototype.exportdata = function (dataType, fileName, exportHeader, rows, exportHiddenColumns, serverURL, charSet) {
            return this._jqx(this._componentSelector).jqxGrid('exportdata', dataType, fileName, exportHeader, rows, exportHiddenColumns, serverURL, charSet);
        };
        JqxGrid.prototype.exportview = function (dataType, fileName) {
            return this._jqx(this._componentSelector).jqxGrid('exportview', dataType, fileName);
        };
        JqxGrid.prototype.openColumnChooser = function (columns, header) {
            this._jqx(this._componentSelector).jqxGrid('openColumnChooser', columns, header);
        };
        JqxGrid.prototype.getstate = function () {
            return this._jqx(this._componentSelector).jqxGrid('getstate');
        };
        JqxGrid.prototype.loadstate = function (stateobject) {
            this._jqx(this._componentSelector).jqxGrid('loadstate', stateobject);
        };
        JqxGrid.prototype.savestate = function () {
            return this._jqx(this._componentSelector).jqxGrid('savestate');
        };
        JqxGrid.prototype._manageProps = function () {
            var widgetProps = ['altrows', 'altstart', 'altstep', 'autoshowloadelement', 'autoshowfiltericon', 'autoshowcolumnsmenubutton', 'showcolumnlines', 'showrowlines', 'showcolumnheaderlines', 'adaptive', 'adaptivewidth', 'clipboard', 'closeablegroups', 'columnsmenuwidth', 'columnmenuopening', 'columnmenuclosing', 'cellhover', 'enablekeyboarddelete', 'enableellipsis', 'enablemousewheel', 'enableanimations', 'enabletooltips', 'enablehover', 'enablebrowserselection', 'everpresentrowposition', 'everpresentrowheight', 'everpresentrowactions', 'everpresentrowactionsmode', 'filterrowheight', 'filtermode', 'groupsrenderer', 'groupcolumnrenderer', 'groupsexpandedbydefault', 'handlekeyboardnavigation', 'pagerrenderer', 'rtl', 'showdefaultloadelement', 'showfiltercolumnbackground', 'showfiltermenuitems', 'showpinnedcolumnbackground', 'showsortcolumnbackground', 'showsortmenuitems', 'showgroupmenuitems', 'showrowdetailscolumn', 'showheader', 'showgroupsheader', 'showaggregates', 'showgroupaggregates', 'showeverpresentrow', 'showfilterrow', 'showemptyrow', 'showstatusbar', 'statusbarheight', 'showtoolbar', 'showfilterbar', 'filterbarmode', 'selectionmode', 'updatefilterconditions', 'updatefilterpanel', 'theme', 'toolbarheight', 'autoheight', 'autorowheight', 'columnsheight', 'deferreddatafields', 'groupsheaderheight', 'groupindentwidth', 'height', 'pagerheight', 'rowsheight', 'scrollbarsize', 'scrollmode', 'scrollfeedback', 'width', 'autosavestate', 'autoloadstate', 'columns', 'enableSanitize', 'cardview', 'cardviewcolumns', 'cardheight', 'cardsize', 'columngroups', 'columnsmenu', 'columnsresize', 'columnsautoresize', 'columnsreorder', 'charting', 'disabled', 'editable', 'batcheditable', 'editmode', 'filter', 'filterable', 'groupable', 'groups', 'horizontalscrollbarstep', 'horizontalscrollbarlargestep', 'initrowdetails', 'keyboardnavigation', 'localization', 'pagesize', 'pagesizeoptions', 'pagermode', 'pagerbuttonscount', 'pageable', 'autofill', 'rowdetails', 'rowdetailstemplate', 'ready', 'rendered', 'renderstatusbar', 'rendertoolbar', 'rendergridrows', 'sortable', 'sortmode', 'selectedrowindex', 'selectedrowindexes', 'source', 'sorttogglestates', 'updatedelay', 'virtualmode', 'verticalscrollbarstep', 'verticalscrollbarlargestep'];
            var options = {};
            for (var prop in this.props) {
                if (widgetProps.indexOf(prop) !== -1) {
                    options[prop] = this.props[prop];
                }
            }
            return options;
        };
        JqxGrid.prototype._wireEvents = function () {
            for (var prop in this.props) {
                if (prop.indexOf('on') === 0) {
                    var originalEventName = prop.slice(2);
                    originalEventName = originalEventName.charAt(0).toLowerCase() + originalEventName.slice(1);
                    this._jqx(this._componentSelector).off(originalEventName);
                    this._jqx(this._componentSelector).on(originalEventName, this.props[prop]);
                }
            }
        };
        return JqxGrid;
    }(React.PureComponent));
    var jqx = window.jqx;
    var JQXLite = window.JQXLite;

    exports.default = JqxGrid;
    exports.jqx = jqx;
    exports.JQXLite = JQXLite;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
