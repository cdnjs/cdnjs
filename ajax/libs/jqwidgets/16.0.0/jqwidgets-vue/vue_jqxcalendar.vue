<template>
    <div v-bind:id="id">
        <slot></slot>
    </div>
</template>

<script>
    import '../jqwidgets/jqxcore.js';
    import '../jqwidgets/jqxbuttons.js';
    import '../jqwidgets/jqxtooltip.js';
    import '../jqwidgets/globalization/globalize.js';
    import '../jqwidgets/jqxdatetimeinput.js';
    import '../jqwidgets/jqxcalendar.js';

    export default {
        props: {
            backText: String,
            columnHeaderHeight: Number,
            clearString: String,
            culture: String,
            dayNameFormat: String,
            disabled: Boolean,
            enableWeekend: Boolean,
            enableViews: Boolean,
            enableOtherMonthDays: Boolean,
            enableFastNavigation: Boolean,
            enableHover: Boolean,
            enableAutoNavigation: Boolean,
            enableTooltips: Boolean,
            forwardText: String,
            firstDayOfWeek: Number,
            height: [Number, String],
            min: Date,
            max: Date,
            navigationDelay: Number,
            rowHeaderWidth: Number,
            readOnly: Boolean,
            restrictedDates: Array,
            rtl: Boolean,
            stepMonths: Number,
            showWeekNumbers: Boolean,
            showDayNames: Boolean,
            showOtherMonthDays: Boolean,
            showFooter: Boolean,
            selectionMode: String,
            specialDates: Array,
            theme: String,
            titleHeight: Number,
            titleFormat: Array,
            todayString: String,
            value: Date,
            width: [Number, String],
            autoCreate: {
                default: true,
                type: Boolean
            }
        },
        created: function () {
            this.id = 'jqxCalendar' + JQXLite.generateID();
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
                JQXLite(this.componentSelector).jqxCalendar(options);
            },
            getOptions: function () {
                const usedProps = Object.keys(this.__manageProps__());
                const resultToReturn = {};
                for (let i = 0; i < usedProps.length; i++) {
                    resultToReturn[usedProps[i]] = JQXLite(this.componentSelector).jqxCalendar(usedProps[i]);
                }
                return resultToReturn;
            },
            clear: function() {
                JQXLite(this.componentSelector).jqxCalendar('clear');  
            },
            destroy: function() {
                JQXLite(this.componentSelector).jqxCalendar('destroy');  
            },
            focus: function() {
                JQXLite(this.componentSelector).jqxCalendar('focus');  
            },
            addSpecialDate: function(date, specialDateClass, text) {
                JQXLite(this.componentSelector).jqxCalendar('addSpecialDate', date, specialDateClass, text);  
            },
            getMinDate: function() {
                return JQXLite(this.componentSelector).jqxCalendar('getMinDate');  
            },
            getMaxDate: function() {
                return JQXLite(this.componentSelector).jqxCalendar('getMaxDate');  
            },
            getDate: function() {
                return JQXLite(this.componentSelector).jqxCalendar('getDate');  
            },
            getRange: function() {
                return JQXLite(this.componentSelector).jqxCalendar('getRange');  
            },
            navigateForward: function(months) {
                JQXLite(this.componentSelector).jqxCalendar('navigateForward', months);  
            },
            navigateBackward: function(months) {
                JQXLite(this.componentSelector).jqxCalendar('navigateBackward', months);  
            },
            render: function() {
                JQXLite(this.componentSelector).jqxCalendar('render');  
            },
            refresh: function() {
                JQXLite(this.componentSelector).jqxCalendar('refresh');  
            },
            setMinDate: function(date) {
                JQXLite(this.componentSelector).jqxCalendar('setMinDate', date);  
            },
            setMaxDate: function(date) {
                JQXLite(this.componentSelector).jqxCalendar('setMaxDate', date);  
            },
            setDate: function(date) {
                JQXLite(this.componentSelector).jqxCalendar('setDate', date);  
            },
            setRange: function(date, date2) {
                JQXLite(this.componentSelector).jqxCalendar('setRange', date, date2);  
            },
            today: function() {
                JQXLite(this.componentSelector).jqxCalendar('today');  
            },
            val: function(value, value2) {
                if (value !== undefined) {
                    JQXLite(this.componentSelector).jqxCalendar('val',  value, value2)
                } else {
                    return JQXLite(this.componentSelector).jqxCalendar('val');
                }
            },
            _backText: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxCalendar('backText', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxCalendar('backText');
                }
            },
            _columnHeaderHeight: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxCalendar('columnHeaderHeight', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxCalendar('columnHeaderHeight');
                }
            },
            _clearString: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxCalendar('clearString', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxCalendar('clearString');
                }
            },
            _culture: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxCalendar('culture', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxCalendar('culture');
                }
            },
            _dayNameFormat: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxCalendar('dayNameFormat', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxCalendar('dayNameFormat');
                }
            },
            _disabled: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxCalendar('disabled', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxCalendar('disabled');
                }
            },
            _enableWeekend: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxCalendar('enableWeekend', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxCalendar('enableWeekend');
                }
            },
            _enableViews: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxCalendar('enableViews', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxCalendar('enableViews');
                }
            },
            _enableOtherMonthDays: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxCalendar('enableOtherMonthDays', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxCalendar('enableOtherMonthDays');
                }
            },
            _enableFastNavigation: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxCalendar('enableFastNavigation', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxCalendar('enableFastNavigation');
                }
            },
            _enableHover: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxCalendar('enableHover', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxCalendar('enableHover');
                }
            },
            _enableAutoNavigation: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxCalendar('enableAutoNavigation', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxCalendar('enableAutoNavigation');
                }
            },
            _enableTooltips: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxCalendar('enableTooltips', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxCalendar('enableTooltips');
                }
            },
            _forwardText: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxCalendar('forwardText', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxCalendar('forwardText');
                }
            },
            _firstDayOfWeek: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxCalendar('firstDayOfWeek', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxCalendar('firstDayOfWeek');
                }
            },
            _height: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxCalendar('height', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxCalendar('height');
                }
            },
            _min: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxCalendar('min', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxCalendar('min');
                }
            },
            _max: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxCalendar('max', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxCalendar('max');
                }
            },
            _navigationDelay: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxCalendar('navigationDelay', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxCalendar('navigationDelay');
                }
            },
            _rowHeaderWidth: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxCalendar('rowHeaderWidth', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxCalendar('rowHeaderWidth');
                }
            },
            _readOnly: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxCalendar('readOnly', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxCalendar('readOnly');
                }
            },
            _restrictedDates: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxCalendar('restrictedDates', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxCalendar('restrictedDates');
                }
            },
            _rtl: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxCalendar('rtl', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxCalendar('rtl');
                }
            },
            _stepMonths: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxCalendar('stepMonths', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxCalendar('stepMonths');
                }
            },
            _showWeekNumbers: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxCalendar('showWeekNumbers', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxCalendar('showWeekNumbers');
                }
            },
            _showDayNames: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxCalendar('showDayNames', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxCalendar('showDayNames');
                }
            },
            _showOtherMonthDays: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxCalendar('showOtherMonthDays', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxCalendar('showOtherMonthDays');
                }
            },
            _showFooter: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxCalendar('showFooter', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxCalendar('showFooter');
                }
            },
            _selectionMode: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxCalendar('selectionMode', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxCalendar('selectionMode');
                }
            },
            _specialDates: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxCalendar('specialDates', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxCalendar('specialDates');
                }
            },
            _theme: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxCalendar('theme', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxCalendar('theme');
                }
            },
            _titleHeight: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxCalendar('titleHeight', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxCalendar('titleHeight');
                }
            },
            _titleFormat: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxCalendar('titleFormat', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxCalendar('titleFormat');
                }
            },
            _todayString: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxCalendar('todayString', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxCalendar('todayString');
                }
            },
            _value: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxCalendar('value', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxCalendar('value');
                }
            },
            _width: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxCalendar('width', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxCalendar('width');
                }
            },
            __createComponent__: function (options) {
                let widgetOptions;
                options ? widgetOptions = options : widgetOptions = this.__manageProps__();
                JQXLite(this.componentSelector).jqxCalendar(widgetOptions);
                this.__extendProps__();
                this.__wireEvents__();
            },
            __manageProps__: function () {
                const widgetProps = ['backText','columnHeaderHeight','clearString','culture','dayNameFormat','disabled','enableWeekend','enableViews','enableOtherMonthDays','enableFastNavigation','enableHover','enableAutoNavigation','enableTooltips','forwardText','firstDayOfWeek','height','min','max','navigationDelay','rowHeaderWidth','readOnly','restrictedDates','rtl','stepMonths','showWeekNumbers','showDayNames','showOtherMonthDays','showFooter','selectionMode','specialDates','theme','titleHeight','titleFormat','todayString','value','width'];
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

                Object.defineProperty(that, 'backText', {
                    get: function() {
                        return that._backText();
                    },
                    set: function(newValue) {
                        that._backText(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'columnHeaderHeight', {
                    get: function() {
                        return that._columnHeaderHeight();
                    },
                    set: function(newValue) {
                        that._columnHeaderHeight(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'clearString', {
                    get: function() {
                        return that._clearString();
                    },
                    set: function(newValue) {
                        that._clearString(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'culture', {
                    get: function() {
                        return that._culture();
                    },
                    set: function(newValue) {
                        that._culture(newValue);
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
                Object.defineProperty(that, 'enableWeekend', {
                    get: function() {
                        return that._enableWeekend();
                    },
                    set: function(newValue) {
                        that._enableWeekend(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'enableViews', {
                    get: function() {
                        return that._enableViews();
                    },
                    set: function(newValue) {
                        that._enableViews(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'enableOtherMonthDays', {
                    get: function() {
                        return that._enableOtherMonthDays();
                    },
                    set: function(newValue) {
                        that._enableOtherMonthDays(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'enableFastNavigation', {
                    get: function() {
                        return that._enableFastNavigation();
                    },
                    set: function(newValue) {
                        that._enableFastNavigation(newValue);
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
                Object.defineProperty(that, 'enableAutoNavigation', {
                    get: function() {
                        return that._enableAutoNavigation();
                    },
                    set: function(newValue) {
                        that._enableAutoNavigation(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'enableTooltips', {
                    get: function() {
                        return that._enableTooltips();
                    },
                    set: function(newValue) {
                        that._enableTooltips(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'forwardText', {
                    get: function() {
                        return that._forwardText();
                    },
                    set: function(newValue) {
                        that._forwardText(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'firstDayOfWeek', {
                    get: function() {
                        return that._firstDayOfWeek();
                    },
                    set: function(newValue) {
                        that._firstDayOfWeek(newValue);
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
                Object.defineProperty(that, 'navigationDelay', {
                    get: function() {
                        return that._navigationDelay();
                    },
                    set: function(newValue) {
                        that._navigationDelay(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'rowHeaderWidth', {
                    get: function() {
                        return that._rowHeaderWidth();
                    },
                    set: function(newValue) {
                        that._rowHeaderWidth(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'readOnly', {
                    get: function() {
                        return that._readOnly();
                    },
                    set: function(newValue) {
                        that._readOnly(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'restrictedDates', {
                    get: function() {
                        return that._restrictedDates();
                    },
                    set: function(newValue) {
                        that._restrictedDates(newValue);
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
                Object.defineProperty(that, 'stepMonths', {
                    get: function() {
                        return that._stepMonths();
                    },
                    set: function(newValue) {
                        that._stepMonths(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'showWeekNumbers', {
                    get: function() {
                        return that._showWeekNumbers();
                    },
                    set: function(newValue) {
                        that._showWeekNumbers(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'showDayNames', {
                    get: function() {
                        return that._showDayNames();
                    },
                    set: function(newValue) {
                        that._showDayNames(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'showOtherMonthDays', {
                    get: function() {
                        return that._showOtherMonthDays();
                    },
                    set: function(newValue) {
                        that._showOtherMonthDays(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'showFooter', {
                    get: function() {
                        return that._showFooter();
                    },
                    set: function(newValue) {
                        that._showFooter(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'selectionMode', {
                    get: function() {
                        return that._selectionMode();
                    },
                    set: function(newValue) {
                        that._selectionMode(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'specialDates', {
                    get: function() {
                        return that._specialDates();
                    },
                    set: function(newValue) {
                        that._specialDates(newValue);
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
                Object.defineProperty(that, 'titleHeight', {
                    get: function() {
                        return that._titleHeight();
                    },
                    set: function(newValue) {
                        that._titleHeight(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'titleFormat', {
                    get: function() {
                        return that._titleFormat();
                    },
                    set: function(newValue) {
                        that._titleFormat(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'todayString', {
                    get: function() {
                        return that._todayString();
                    },
                    set: function(newValue) {
                        that._todayString(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'value', {
                    get: function() {
                        return that._value();
                    },
                    set: function(newValue) {
                        that._value(newValue);
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
            __twoWayDataBinding__: function () {
                const value = JQXLite(this.componentSelector).jqxCalendar('val');
                this.$emit('input', value);
            },
            __wireEvents__: function () {
                const that = this;

                JQXLite(this.componentSelector).on('backButtonClick', function (event) { that.$emit('backButtonClick', event); });
                JQXLite(this.componentSelector).on('change', function (event) { that.$emit('change', event); that.__twoWayDataBinding__(); });
                JQXLite(this.componentSelector).on('nextButtonClick', function (event) { that.$emit('nextButtonClick', event); });
                JQXLite(this.componentSelector).on('viewChange', function (event) { that.$emit('viewChange', event); });
            }
        }
    }
</script>
