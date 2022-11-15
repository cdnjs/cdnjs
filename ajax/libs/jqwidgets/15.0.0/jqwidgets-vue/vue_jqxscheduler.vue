<template>
    <div v-bind:id="id">
        <slot></slot>
    </div>
</template>

<script>
    import '../jqwidgets/jqxcore.js';
    import '../jqwidgets/jqxdata.js';
    import '../jqwidgets/jqxdata.export.js';
    import '../jqwidgets/jqxdate.js';
    import '../jqwidgets/jqxbuttons.js';
    import '../jqwidgets/jqxmenu.js';
    import '../jqwidgets/jqxtooltip.js';
    import '../jqwidgets/jqxscrollbar.js';
    import '../jqwidgets/jqxradiobutton.js';
    import '../jqwidgets/jqxcheckbox.js';
    import '../jqwidgets/jqxwindow.js';
    import '../jqwidgets/jqxlistbox.js';
    import '../jqwidgets/jqxcolorpicker.js';
    import '../jqwidgets/jqxcombobox.js';
    import '../jqwidgets/jqxdropdownlist.js';
    import '../jqwidgets/jqxnumberinput.js';
    import '../jqwidgets/jqxinput.js';
    import '../jqwidgets/globalization/globalize.js';
    import '../jqwidgets/jqxcalendar.js';
    import '../jqwidgets/jqxdatetimeinput.js';
    import '../jqwidgets/jqxscheduler.js';
    import '../jqwidgets/jqxscheduler.api.js';

    export default {
        props: {
            appointmentOpacity: Number,
            appointmentsMinHeight: Number,
            appointmentDataFields: Object,
            appointmentTooltips: Boolean,
            columnsHeight: Number,
            contextMenu: Boolean,
            contextMenuOpen: Function,
            contextMenuClose: Function,
            contextMenuItemClick: Function,
            contextMenuCreate: Function,
            changedAppointments: Array,
            disabled: Boolean,
            date: [Object, Date],
            dayNameFormat: String,
            enableHover: Boolean,
            editDialog: Boolean,
            editDialogDateTimeFormatString: String,
            editDialogDateFormatString: String,
            editDialogOpen: Function,
            editDialogCreate: Function,
            editDialogKeyDown: Function,
            editDialogClose: Function,
            exportSettings: Object,
            height: [Number, String],
            legendPosition: String,
            legendHeight: Number,
            localization: Object,
            min: [Object, Date],
            max: [Object, Date],
            ready: Function,
            renderAppointment: Function,
            rendering: Function,
            rendered: Function,
            rtl: Boolean,
            resources: Object,
            rowsHeight: Number,
            showToolbar: Boolean,
            showLegend: Boolean,
            scrollBarSize: Number,
            source: Object,
            statuses: Object,
            touchRowsHeight: Number,
            theme: String,
            touchAppointmentsMinHeight: Number,
            touchScrollBarSize: Number,
            timeZone: String,
            touchDayNameFormat: String,
            toolBarRangeFormat: String,
            toolBarRangeFormatAbbr: String,
            toolbarHeight: Number,
            views: Array,
            view: [Number, String],
            width: [Number, String],
            autoCreate: {
                default: true,
                type: Boolean
            }
        },
        created: function () {
            this.id = 'jqxScheduler' + JQXLite.generateID();
            this.componentSelector = '#' + this.id;
        },
        mounted: function () {
            if (this.autoCreate) this.__createComponent__();
        },
        methods: {
            createComponent: function (options) {
                if (!this.autoCreate) this.__createComponent__(options)
                else console.warn('Component is already created! If you want to use createComponent, please set "autoCreate" property to "false".');
            },
            setOptions: function (options) {
                JQXLite(this.componentSelector).jqxScheduler(options);
            },
            getOptions: function () {
                const usedProps = Object.keys(this.__manageProps__());
                const resultToReturn = {};
                for (let i = 0; i < usedProps.length; i++) {
                    resultToReturn[usedProps[i]] = JQXLite(this.componentSelector).jqxScheduler(usedProps[i]);
                }
                return resultToReturn;
            },
            addAppointment: function(item) {
                JQXLite(this.componentSelector).jqxScheduler('addAppointment', item);  
            },
            beginAppointmentsUpdate: function() {
                JQXLite(this.componentSelector).jqxScheduler('beginAppointmentsUpdate');  
            },
            clearAppointmentsSelection: function() {
                JQXLite(this.componentSelector).jqxScheduler('clearAppointmentsSelection');  
            },
            clearSelection: function() {
                JQXLite(this.componentSelector).jqxScheduler('clearSelection');  
            },
            closeMenu: function() {
                JQXLite(this.componentSelector).jqxScheduler('closeMenu');  
            },
            closeDialog: function() {
                JQXLite(this.componentSelector).jqxScheduler('closeDialog');  
            },
            deleteAppointment: function(appointmenId) {
                JQXLite(this.componentSelector).jqxScheduler('deleteAppointment', appointmenId);  
            },
            destroy: function() {
                JQXLite(this.componentSelector).jqxScheduler('destroy');  
            },
            endAppointmentsUpdate: function() {
                JQXLite(this.componentSelector).jqxScheduler('endAppointmentsUpdate');  
            },
            ensureAppointmentVisible: function(id) {
                JQXLite(this.componentSelector).jqxScheduler('ensureAppointmentVisible', id);  
            },
            ensureVisible: function(item, resourceId) {
                JQXLite(this.componentSelector).jqxScheduler('ensureVisible', item, resourceId);  
            },
            exportData: function(format) {
                JQXLite(this.componentSelector).jqxScheduler('exportData', format);  
            },
            focus: function() {
                JQXLite(this.componentSelector).jqxScheduler('focus');  
            },
            getAppointmentProperty: function(appointmentId, name) {
                return JQXLite(this.componentSelector).jqxScheduler('getAppointmentProperty', appointmentId, name);  
            },
            getSelection: function() {
                return JQXLite(this.componentSelector).jqxScheduler('getSelection');  
            },
            getAppointments: function() {
                return JQXLite(this.componentSelector).jqxScheduler('getAppointments');  
            },
            getDataAppointments: function() {
                return JQXLite(this.componentSelector).jqxScheduler('getDataAppointments');  
            },
            hideAppointmentsByResource: function(resourcesId) {
                JQXLite(this.componentSelector).jqxScheduler('hideAppointmentsByResource', resourcesId);  
            },
            openMenu: function(left, top) {
                JQXLite(this.componentSelector).jqxScheduler('openMenu', left, top);  
            },
            openDialog: function(left, top) {
                JQXLite(this.componentSelector).jqxScheduler('openDialog', left, top);  
            },
            selectAppointment: function(appointmentId) {
                JQXLite(this.componentSelector).jqxScheduler('selectAppointment', appointmentId);  
            },
            setAppointmentProperty: function(appointmentId, name, value) {
                JQXLite(this.componentSelector).jqxScheduler('setAppointmentProperty', appointmentId, name, value);  
            },
            selectCell: function(date, allday, resourceId) {
                JQXLite(this.componentSelector).jqxScheduler('selectCell', date, allday, resourceId);  
            },
            showAppointmentsByResource: function(resourceId) {
                JQXLite(this.componentSelector).jqxScheduler('showAppointmentsByResource', resourceId);  
            },
            scrollWidth: function() {
                return JQXLite(this.componentSelector).jqxScheduler('scrollWidth');  
            },
            scrollHeight: function() {
                return JQXLite(this.componentSelector).jqxScheduler('scrollHeight');  
            },
            scrollLeft: function(left) {
                JQXLite(this.componentSelector).jqxScheduler('scrollLeft', left);  
            },
            scrollTop: function(top) {
                JQXLite(this.componentSelector).jqxScheduler('scrollTop', top);  
            },
            _appointmentOpacity: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxScheduler('appointmentOpacity', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxScheduler('appointmentOpacity');
                }
            },
            _appointmentsMinHeight: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxScheduler('appointmentsMinHeight', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxScheduler('appointmentsMinHeight');
                }
            },
            _appointmentDataFields: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxScheduler('appointmentDataFields', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxScheduler('appointmentDataFields');
                }
            },
            _appointmentTooltips: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxScheduler('appointmentTooltips', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxScheduler('appointmentTooltips');
                }
            },
            _columnsHeight: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxScheduler('columnsHeight', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxScheduler('columnsHeight');
                }
            },
            _contextMenu: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxScheduler('contextMenu', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxScheduler('contextMenu');
                }
            },
            _contextMenuOpen: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxScheduler('contextMenuOpen', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxScheduler('contextMenuOpen');
                }
            },
            _contextMenuClose: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxScheduler('contextMenuClose', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxScheduler('contextMenuClose');
                }
            },
            _contextMenuItemClick: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxScheduler('contextMenuItemClick', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxScheduler('contextMenuItemClick');
                }
            },
            _contextMenuCreate: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxScheduler('contextMenuCreate', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxScheduler('contextMenuCreate');
                }
            },
            _changedAppointments: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxScheduler('changedAppointments', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxScheduler('changedAppointments');
                }
            },
            _disabled: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxScheduler('disabled', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxScheduler('disabled');
                }
            },
            _date: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxScheduler('date', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxScheduler('date');
                }
            },
            _dayNameFormat: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxScheduler('dayNameFormat', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxScheduler('dayNameFormat');
                }
            },
            _enableHover: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxScheduler('enableHover', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxScheduler('enableHover');
                }
            },
            _editDialog: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxScheduler('editDialog', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxScheduler('editDialog');
                }
            },
            _editDialogDateTimeFormatString: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxScheduler('editDialogDateTimeFormatString', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxScheduler('editDialogDateTimeFormatString');
                }
            },
            _editDialogDateFormatString: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxScheduler('editDialogDateFormatString', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxScheduler('editDialogDateFormatString');
                }
            },
            _editDialogOpen: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxScheduler('editDialogOpen', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxScheduler('editDialogOpen');
                }
            },
            _editDialogCreate: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxScheduler('editDialogCreate', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxScheduler('editDialogCreate');
                }
            },
            _editDialogKeyDown: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxScheduler('editDialogKeyDown', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxScheduler('editDialogKeyDown');
                }
            },
            _editDialogClose: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxScheduler('editDialogClose', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxScheduler('editDialogClose');
                }
            },
            _exportSettings: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxScheduler('exportSettings', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxScheduler('exportSettings');
                }
            },
            _height: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxScheduler('height', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxScheduler('height');
                }
            },
            _legendPosition: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxScheduler('legendPosition', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxScheduler('legendPosition');
                }
            },
            _legendHeight: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxScheduler('legendHeight', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxScheduler('legendHeight');
                }
            },
            _localization: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxScheduler('localization', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxScheduler('localization');
                }
            },
            _min: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxScheduler('min', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxScheduler('min');
                }
            },
            _max: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxScheduler('max', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxScheduler('max');
                }
            },
            _ready: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxScheduler('ready', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxScheduler('ready');
                }
            },
            _renderAppointment: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxScheduler('renderAppointment', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxScheduler('renderAppointment');
                }
            },
            _rendering: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxScheduler('rendering', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxScheduler('rendering');
                }
            },
            _rendered: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxScheduler('rendered', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxScheduler('rendered');
                }
            },
            _rtl: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxScheduler('rtl', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxScheduler('rtl');
                }
            },
            _resources: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxScheduler('resources', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxScheduler('resources');
                }
            },
            _rowsHeight: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxScheduler('rowsHeight', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxScheduler('rowsHeight');
                }
            },
            _showToolbar: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxScheduler('showToolbar', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxScheduler('showToolbar');
                }
            },
            _showLegend: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxScheduler('showLegend', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxScheduler('showLegend');
                }
            },
            _scrollBarSize: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxScheduler('scrollBarSize', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxScheduler('scrollBarSize');
                }
            },
            _source: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxScheduler('source', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxScheduler('source');
                }
            },
            _statuses: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxScheduler('statuses', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxScheduler('statuses');
                }
            },
            _touchRowsHeight: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxScheduler('touchRowsHeight', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxScheduler('touchRowsHeight');
                }
            },
            _theme: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxScheduler('theme', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxScheduler('theme');
                }
            },
            _touchAppointmentsMinHeight: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxScheduler('touchAppointmentsMinHeight', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxScheduler('touchAppointmentsMinHeight');
                }
            },
            _touchScrollBarSize: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxScheduler('touchScrollBarSize', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxScheduler('touchScrollBarSize');
                }
            },
            _timeZone: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxScheduler('timeZone', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxScheduler('timeZone');
                }
            },
            _touchDayNameFormat: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxScheduler('touchDayNameFormat', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxScheduler('touchDayNameFormat');
                }
            },
            _toolBarRangeFormat: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxScheduler('toolBarRangeFormat', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxScheduler('toolBarRangeFormat');
                }
            },
            _toolBarRangeFormatAbbr: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxScheduler('toolBarRangeFormatAbbr', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxScheduler('toolBarRangeFormatAbbr');
                }
            },
            _toolbarHeight: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxScheduler('toolbarHeight', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxScheduler('toolbarHeight');
                }
            },
            _views: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxScheduler('views', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxScheduler('views');
                }
            },
            _view: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxScheduler('view', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxScheduler('view');
                }
            },
            _width: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxScheduler('width', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxScheduler('width');
                }
            },
            __createComponent__: function (options) {
                let widgetOptions;
                options ? widgetOptions = options : widgetOptions = this.__manageProps__();
                JQXLite(this.componentSelector).jqxScheduler(widgetOptions);
                this.__extendProps__();
                this.__wireEvents__();
            },
            __manageProps__: function () {
                const widgetProps = ['appointmentOpacity','appointmentsMinHeight','appointmentDataFields','appointmentTooltips','columnsHeight','contextMenu','contextMenuOpen','contextMenuClose','contextMenuItemClick','contextMenuCreate','changedAppointments','disabled','date','dayNameFormat','enableHover','editDialog','editDialogDateTimeFormatString','editDialogDateFormatString','editDialogOpen','editDialogCreate','editDialogKeyDown','editDialogClose','exportSettings','height','legendPosition','legendHeight','localization','min','max','ready','renderAppointment','rendering','rendered','rtl','resources','rowsHeight','showToolbar','showLegend','scrollBarSize','source','statuses','touchRowsHeight','theme','touchAppointmentsMinHeight','touchScrollBarSize','timeZone','touchDayNameFormat','toolBarRangeFormat','toolBarRangeFormatAbbr','toolbarHeight','views','view','width'];
                const componentProps = this.$options.propsData;
                let options = {};

                for (let prop in componentProps) {
                    if (widgetProps.indexOf(prop) !== -1) {
                        options[prop] = componentProps[prop];
                    }
                }
                return options;
            },
            __extendProps__: function () {
                const that = this;

                Object.defineProperty(that, 'appointmentOpacity', {
                    get: function() {
                        return that._appointmentOpacity();
                    },
                    set: function(newValue) {
                        that._appointmentOpacity(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'appointmentsMinHeight', {
                    get: function() {
                        return that._appointmentsMinHeight();
                    },
                    set: function(newValue) {
                        that._appointmentsMinHeight(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'appointmentDataFields', {
                    get: function() {
                        return that._appointmentDataFields();
                    },
                    set: function(newValue) {
                        that._appointmentDataFields(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'appointmentTooltips', {
                    get: function() {
                        return that._appointmentTooltips();
                    },
                    set: function(newValue) {
                        that._appointmentTooltips(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'columnsHeight', {
                    get: function() {
                        return that._columnsHeight();
                    },
                    set: function(newValue) {
                        that._columnsHeight(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'contextMenu', {
                    get: function() {
                        return that._contextMenu();
                    },
                    set: function(newValue) {
                        that._contextMenu(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'contextMenuOpen', {
                    get: function() {
                        return that._contextMenuOpen();
                    },
                    set: function(newValue) {
                        that._contextMenuOpen(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'contextMenuClose', {
                    get: function() {
                        return that._contextMenuClose();
                    },
                    set: function(newValue) {
                        that._contextMenuClose(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'contextMenuItemClick', {
                    get: function() {
                        return that._contextMenuItemClick();
                    },
                    set: function(newValue) {
                        that._contextMenuItemClick(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'contextMenuCreate', {
                    get: function() {
                        return that._contextMenuCreate();
                    },
                    set: function(newValue) {
                        that._contextMenuCreate(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'changedAppointments', {
                    get: function() {
                        return that._changedAppointments();
                    },
                    set: function(newValue) {
                        that._changedAppointments(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'disabled', {
                    get: function() {
                        return that._disabled();
                    },
                    set: function(newValue) {
                        that._disabled(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'date', {
                    get: function() {
                        return that._date();
                    },
                    set: function(newValue) {
                        that._date(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'dayNameFormat', {
                    get: function() {
                        return that._dayNameFormat();
                    },
                    set: function(newValue) {
                        that._dayNameFormat(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'enableHover', {
                    get: function() {
                        return that._enableHover();
                    },
                    set: function(newValue) {
                        that._enableHover(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'editDialog', {
                    get: function() {
                        return that._editDialog();
                    },
                    set: function(newValue) {
                        that._editDialog(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'editDialogDateTimeFormatString', {
                    get: function() {
                        return that._editDialogDateTimeFormatString();
                    },
                    set: function(newValue) {
                        that._editDialogDateTimeFormatString(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'editDialogDateFormatString', {
                    get: function() {
                        return that._editDialogDateFormatString();
                    },
                    set: function(newValue) {
                        that._editDialogDateFormatString(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'editDialogOpen', {
                    get: function() {
                        return that._editDialogOpen();
                    },
                    set: function(newValue) {
                        that._editDialogOpen(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'editDialogCreate', {
                    get: function() {
                        return that._editDialogCreate();
                    },
                    set: function(newValue) {
                        that._editDialogCreate(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'editDialogKeyDown', {
                    get: function() {
                        return that._editDialogKeyDown();
                    },
                    set: function(newValue) {
                        that._editDialogKeyDown(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'editDialogClose', {
                    get: function() {
                        return that._editDialogClose();
                    },
                    set: function(newValue) {
                        that._editDialogClose(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'exportSettings', {
                    get: function() {
                        return that._exportSettings();
                    },
                    set: function(newValue) {
                        that._exportSettings(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'height', {
                    get: function() {
                        return that._height();
                    },
                    set: function(newValue) {
                        that._height(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'legendPosition', {
                    get: function() {
                        return that._legendPosition();
                    },
                    set: function(newValue) {
                        that._legendPosition(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'legendHeight', {
                    get: function() {
                        return that._legendHeight();
                    },
                    set: function(newValue) {
                        that._legendHeight(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'localization', {
                    get: function() {
                        return that._localization();
                    },
                    set: function(newValue) {
                        that._localization(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'min', {
                    get: function() {
                        return that._min();
                    },
                    set: function(newValue) {
                        that._min(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'max', {
                    get: function() {
                        return that._max();
                    },
                    set: function(newValue) {
                        that._max(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'ready', {
                    get: function() {
                        return that._ready();
                    },
                    set: function(newValue) {
                        that._ready(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'renderAppointment', {
                    get: function() {
                        return that._renderAppointment();
                    },
                    set: function(newValue) {
                        that._renderAppointment(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'rendering', {
                    get: function() {
                        return that._rendering();
                    },
                    set: function(newValue) {
                        that._rendering(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'rendered', {
                    get: function() {
                        return that._rendered();
                    },
                    set: function(newValue) {
                        that._rendered(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'rtl', {
                    get: function() {
                        return that._rtl();
                    },
                    set: function(newValue) {
                        that._rtl(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'resources', {
                    get: function() {
                        return that._resources();
                    },
                    set: function(newValue) {
                        that._resources(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'rowsHeight', {
                    get: function() {
                        return that._rowsHeight();
                    },
                    set: function(newValue) {
                        that._rowsHeight(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'showToolbar', {
                    get: function() {
                        return that._showToolbar();
                    },
                    set: function(newValue) {
                        that._showToolbar(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'showLegend', {
                    get: function() {
                        return that._showLegend();
                    },
                    set: function(newValue) {
                        that._showLegend(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'scrollBarSize', {
                    get: function() {
                        return that._scrollBarSize();
                    },
                    set: function(newValue) {
                        that._scrollBarSize(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'source', {
                    get: function() {
                        return that._source();
                    },
                    set: function(newValue) {
                        that._source(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'statuses', {
                    get: function() {
                        return that._statuses();
                    },
                    set: function(newValue) {
                        that._statuses(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'touchRowsHeight', {
                    get: function() {
                        return that._touchRowsHeight();
                    },
                    set: function(newValue) {
                        that._touchRowsHeight(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'theme', {
                    get: function() {
                        return that._theme();
                    },
                    set: function(newValue) {
                        that._theme(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'touchAppointmentsMinHeight', {
                    get: function() {
                        return that._touchAppointmentsMinHeight();
                    },
                    set: function(newValue) {
                        that._touchAppointmentsMinHeight(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'touchScrollBarSize', {
                    get: function() {
                        return that._touchScrollBarSize();
                    },
                    set: function(newValue) {
                        that._touchScrollBarSize(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'timeZone', {
                    get: function() {
                        return that._timeZone();
                    },
                    set: function(newValue) {
                        that._timeZone(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'touchDayNameFormat', {
                    get: function() {
                        return that._touchDayNameFormat();
                    },
                    set: function(newValue) {
                        that._touchDayNameFormat(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'toolBarRangeFormat', {
                    get: function() {
                        return that._toolBarRangeFormat();
                    },
                    set: function(newValue) {
                        that._toolBarRangeFormat(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'toolBarRangeFormatAbbr', {
                    get: function() {
                        return that._toolBarRangeFormatAbbr();
                    },
                    set: function(newValue) {
                        that._toolBarRangeFormatAbbr(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'toolbarHeight', {
                    get: function() {
                        return that._toolbarHeight();
                    },
                    set: function(newValue) {
                        that._toolbarHeight(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'views', {
                    get: function() {
                        return that._views();
                    },
                    set: function(newValue) {
                        that._views(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'view', {
                    get: function() {
                        return that._view();
                    },
                    set: function(newValue) {
                        that._view(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'width', {
                    get: function() {
                        return that._width();
                    },
                    set: function(newValue) {
                        that._width(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
            },
            __wireEvents__: function () {
                const that = this;

                JQXLite(this.componentSelector).on('appointmentChange', function (event) { that.$emit('appointmentChange', event); });
                JQXLite(this.componentSelector).on('appointmentClick', function (event) { that.$emit('appointmentClick', event); });
                JQXLite(this.componentSelector).on('appointmentDoubleClick', function (event) { that.$emit('appointmentDoubleClick', event); });
                JQXLite(this.componentSelector).on('appointmentDelete', function (event) { that.$emit('appointmentDelete', event); });
                JQXLite(this.componentSelector).on('appointmentAdd', function (event) { that.$emit('appointmentAdd', event); });
                JQXLite(this.componentSelector).on('bindingComplete', function (event) { that.$emit('bindingComplete', event); });
                JQXLite(this.componentSelector).on('cellClick', function (event) { that.$emit('cellClick', event); });
                JQXLite(this.componentSelector).on('cellDoubleClick', function (event) { that.$emit('cellDoubleClick', event); });
                JQXLite(this.componentSelector).on('contextMenuOpen', function (event) { that.$emit('contextMenuOpen', event); });
                JQXLite(this.componentSelector).on('contextMenuClose', function (event) { that.$emit('contextMenuClose', event); });
                JQXLite(this.componentSelector).on('contextMenuItemClick', function (event) { that.$emit('contextMenuItemClick', event); });
                JQXLite(this.componentSelector).on('contextMenuCreate', function (event) { that.$emit('contextMenuCreate', event); });
                JQXLite(this.componentSelector).on('dateChange', function (event) { that.$emit('dateChange', event); });
                JQXLite(this.componentSelector).on('editRecurrenceDialogOpen', function (event) { that.$emit('editRecurrenceDialogOpen', event); });
                JQXLite(this.componentSelector).on('editRecurrenceDialogClose', function (event) { that.$emit('editRecurrenceDialogClose', event); });
                JQXLite(this.componentSelector).on('editDialogCreate', function (event) { that.$emit('editDialogCreate', event); });
                JQXLite(this.componentSelector).on('editDialogOpen', function (event) { that.$emit('editDialogOpen', event); });
                JQXLite(this.componentSelector).on('editDialogClose', function (event) { that.$emit('editDialogClose', event); });
                JQXLite(this.componentSelector).on('viewChange', function (event) { that.$emit('viewChange', event); });
            }
        }
    }
</script>
