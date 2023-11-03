require('../../jqwidgets/jqxcore');
require('../../jqwidgets/jqxdata');
require('../../jqwidgets/jqxdata.export');
require('../../jqwidgets/jqxdate');
require('../../jqwidgets/jqxbuttons');
require('../../jqwidgets/jqxmenu');
require('../../jqwidgets/jqxtooltip');
require('../../jqwidgets/jqxscrollbar');
require('../../jqwidgets/jqxradiobutton');
require('../../jqwidgets/jqxcheckbox');
require('../../jqwidgets/jqxwindow');
require('../../jqwidgets/jqxlistbox');
require('../../jqwidgets/jqxcolorpicker');
require('../../jqwidgets/jqxcombobox');
require('../../jqwidgets/jqxdropdownlist');
require('../../jqwidgets/jqxnumberinput');
require('../../jqwidgets/jqxinput');
require('../../jqwidgets/globalization/globalize');
require('../../jqwidgets/jqxcalendar');
require('../../jqwidgets/jqxdatetimeinput');
require('../../jqwidgets/jqxscheduler');
require('../../jqwidgets/jqxscheduler.api');
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('react')) :
    typeof define === 'function' && define.amd ? define(['exports', 'react'], factory) :
    (factory((global.react_jqxscheduler = {}),global.React));
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

    var JqxScheduler = /** @class */ (function (_super) {
        __extends(JqxScheduler, _super);
        function JqxScheduler(props) {
            var _this = _super.call(this, props) || this;
            /* tslint:disable:variable-name */
            _this._jqx = JQXLite;
            _this._id = 'JqxScheduler' + _this._jqx.generateID();
            _this._componentSelector = '#' + _this._id;
            _this.state = { lastProps: props };
            return _this;
        }
        JqxScheduler.getDerivedStateFromProps = function (props, state) {
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
        JqxScheduler.prototype.componentDidMount = function () {
            var widgetOptions = this._manageProps();
            this._jqx(this._componentSelector).jqxScheduler(widgetOptions);
            this._wireEvents();
        };
        JqxScheduler.prototype.componentDidUpdate = function () {
            var widgetOptions = this._manageProps();
            this.setOptions(widgetOptions);
            this._wireEvents();
        };
        JqxScheduler.prototype.render = function () {
            return (React.createElement("div", { id: this._id, className: this.props.className, style: this.props.style }, this.props.children));
        };
        JqxScheduler.prototype.setOptions = function (options) {
            this._jqx(this._componentSelector).jqxScheduler(options);
        };
        JqxScheduler.prototype.getOptions = function (option) {
            return this._jqx(this._componentSelector).jqxScheduler(option);
        };
        JqxScheduler.prototype.addAppointment = function (item) {
            this._jqx(this._componentSelector).jqxScheduler('addAppointment', item);
        };
        JqxScheduler.prototype.beginAppointmentsUpdate = function () {
            this._jqx(this._componentSelector).jqxScheduler('beginAppointmentsUpdate');
        };
        JqxScheduler.prototype.clearAppointmentsSelection = function () {
            this._jqx(this._componentSelector).jqxScheduler('clearAppointmentsSelection');
        };
        JqxScheduler.prototype.clearSelection = function () {
            this._jqx(this._componentSelector).jqxScheduler('clearSelection');
        };
        JqxScheduler.prototype.closeMenu = function () {
            this._jqx(this._componentSelector).jqxScheduler('closeMenu');
        };
        JqxScheduler.prototype.closeDialog = function () {
            this._jqx(this._componentSelector).jqxScheduler('closeDialog');
        };
        JqxScheduler.prototype.deleteAppointment = function (appointmenId) {
            this._jqx(this._componentSelector).jqxScheduler('deleteAppointment', appointmenId);
        };
        JqxScheduler.prototype.destroy = function () {
            this._jqx(this._componentSelector).jqxScheduler('destroy');
        };
        JqxScheduler.prototype.endAppointmentsUpdate = function () {
            this._jqx(this._componentSelector).jqxScheduler('endAppointmentsUpdate');
        };
        JqxScheduler.prototype.ensureAppointmentVisible = function (id) {
            this._jqx(this._componentSelector).jqxScheduler('ensureAppointmentVisible', id);
        };
        JqxScheduler.prototype.ensureVisible = function (item, resourceId) {
            this._jqx(this._componentSelector).jqxScheduler('ensureVisible', item, resourceId);
        };
        JqxScheduler.prototype.exportData = function (format) {
            return this._jqx(this._componentSelector).jqxScheduler('exportData', format);
        };
        JqxScheduler.prototype.focus = function () {
            this._jqx(this._componentSelector).jqxScheduler('focus');
        };
        JqxScheduler.prototype.getAppointmentProperty = function (appointmentId, name) {
            return this._jqx(this._componentSelector).jqxScheduler('getAppointmentProperty', appointmentId, name);
        };
        JqxScheduler.prototype.getSelection = function () {
            return this._jqx(this._componentSelector).jqxScheduler('getSelection');
        };
        JqxScheduler.prototype.getAppointments = function () {
            return this._jqx(this._componentSelector).jqxScheduler('getAppointments');
        };
        JqxScheduler.prototype.getDataAppointments = function () {
            return this._jqx(this._componentSelector).jqxScheduler('getDataAppointments');
        };
        JqxScheduler.prototype.hideAppointmentsByResource = function (resourcesId) {
            this._jqx(this._componentSelector).jqxScheduler('hideAppointmentsByResource', resourcesId);
        };
        JqxScheduler.prototype.openMenu = function (left, top) {
            this._jqx(this._componentSelector).jqxScheduler('openMenu', left, top);
        };
        JqxScheduler.prototype.openDialog = function (left, top) {
            this._jqx(this._componentSelector).jqxScheduler('openDialog', left, top);
        };
        JqxScheduler.prototype.selectAppointment = function (appointmentId) {
            this._jqx(this._componentSelector).jqxScheduler('selectAppointment', appointmentId);
        };
        JqxScheduler.prototype.setAppointmentProperty = function (appointmentId, name, value) {
            this._jqx(this._componentSelector).jqxScheduler('setAppointmentProperty', appointmentId, name, value);
        };
        JqxScheduler.prototype.selectCell = function (date, allday, resourceId) {
            this._jqx(this._componentSelector).jqxScheduler('selectCell', date, allday, resourceId);
        };
        JqxScheduler.prototype.showAppointmentsByResource = function (resourceId) {
            this._jqx(this._componentSelector).jqxScheduler('showAppointmentsByResource', resourceId);
        };
        JqxScheduler.prototype.scrollWidth = function () {
            return this._jqx(this._componentSelector).jqxScheduler('scrollWidth');
        };
        JqxScheduler.prototype.scrollHeight = function () {
            return this._jqx(this._componentSelector).jqxScheduler('scrollHeight');
        };
        JqxScheduler.prototype.scrollLeft = function (left) {
            this._jqx(this._componentSelector).jqxScheduler('scrollLeft', left);
        };
        JqxScheduler.prototype.scrollTop = function (top) {
            this._jqx(this._componentSelector).jqxScheduler('scrollTop', top);
        };
        JqxScheduler.prototype._manageProps = function () {
            var widgetProps = ['appointmentOpacity', 'appointmentsMinHeight', 'appointmentDataFields', 'appointmentTooltips', 'columnsHeight', 'contextMenu', 'contextMenuOpen', 'contextMenuClose', 'contextMenuItemClick', 'contextMenuCreate', 'changedAppointments', 'disabled', 'date', 'dayNameFormat', 'enableHover', 'editDialog', 'editDialogDateTimeFormatString', 'editDialogDateFormatString', 'editDialogOpen', 'editDialogCreate', 'editDialogKeyDown', 'editDialogClose', 'exportSettings', 'height', 'legendPosition', 'legendHeight', 'localization', 'min', 'max', 'ready', 'renderAppointment', 'rendering', 'rendered', 'rtl', 'resources', 'rowsHeight', 'showToolbar', 'showLegend', 'showCurrent', 'showCurrentAppointment', 'scrollBarSize', 'source', 'statuses', 'touchRowsHeight', 'theme', 'touchAppointmentsMinHeight', 'touchScrollBarSize', 'timeZone', 'touchDayNameFormat', 'toolBarRangeFormat', 'toolBarRangeFormatAbbr', 'toolbarHeight', 'views', 'view', 'width'];
            var options = {};
            for (var prop in this.props) {
                if (widgetProps.indexOf(prop) !== -1) {
                    options[prop] = this.props[prop];
                }
            }
            return options;
        };
        JqxScheduler.prototype._wireEvents = function () {
            for (var prop in this.props) {
                if (prop.indexOf('on') === 0) {
                    var originalEventName = prop.slice(2);
                    originalEventName = originalEventName.charAt(0).toLowerCase() + originalEventName.slice(1);
                    this._jqx(this._componentSelector).off(originalEventName);
                    this._jqx(this._componentSelector).on(originalEventName, this.props[prop]);
                }
            }
        };
        return JqxScheduler;
    }(React.PureComponent));
    var jqx = window.jqx;
    var JQXLite = window.JQXLite;

    exports.default = JqxScheduler;
    exports.jqx = jqx;
    exports.JQXLite = JQXLite;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
