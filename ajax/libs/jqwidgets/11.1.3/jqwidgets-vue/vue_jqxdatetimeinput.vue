<template>
    <div v-bind:id="id">
        <slot></slot>
    </div>
</template>

<script>
    import '../jqwidgets/jqxcore.js';
    import '../jqwidgets/globalization/globalize.js';
    import '../jqwidgets/jqxbuttons.js';
    import '../jqwidgets/jqxtooltip.js';
    import '../jqwidgets/jqxdatetimeinput.js';
    import '../jqwidgets/jqxcalendar.js';

    export default {
        props: {
            animationType: String,
            allowNullDate: Boolean,
            allowKeyboardDelete: Boolean,
            clearString: String,
            culture: String,
            closeDelay: Number,
            closeCalendarAfterSelection: Boolean,
            dropDownHorizontalAlignment: String,
            dropDownVerticalAlignment: String,
            disabled: Boolean,
            enableBrowserBoundsDetection: Boolean,
            enableAbsoluteSelection: Boolean,
            editMode: String,
            firstDayOfWeek: Number,
            formatString: String,
            height: [Number, String],
            min: Date,
            max: Date,
            openDelay: Number,
            placeHolder: String,
            popupZIndex: Number,
            rtl: Boolean,
            readonly: Boolean,
            showFooter: Boolean,
            selectionMode: String,
            showWeekNumbers: Boolean,
            showTimeButton: Boolean,
            showCalendarButton: Boolean,
            theme: String,
            template: String,
            textAlign: String,
            todayString: String,
            value: [Date, null],
            width: [Number, String],
            yearCutoff: Number,
            autoCreate: {
                default: true,
                type: Boolean
            }
        },
        created: function () {
            this.id = 'jqxDateTimeInput' + JQXLite.generateID();
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
                JQXLite(this.componentSelector).jqxDateTimeInput(options);
            },
            getOptions: function () {
                const usedProps = Object.keys(this.__manageProps__());
                const resultToReturn = {};
                for (let i = 0; i < usedProps.length; i++) {
                    resultToReturn[usedProps[i]] = JQXLite(this.componentSelector).jqxDateTimeInput(usedProps[i]);
                }
                return resultToReturn;
            },
            close: function() {
                JQXLite(this.componentSelector).jqxDateTimeInput('close');  
            },
            destroy: function() {
                JQXLite(this.componentSelector).jqxDateTimeInput('destroy');  
            },
            focus: function() {
                JQXLite(this.componentSelector).jqxDateTimeInput('focus');  
            },
            getRange: function() {
                return JQXLite(this.componentSelector).jqxDateTimeInput('getRange');  
            },
            getText: function() {
                return JQXLite(this.componentSelector).jqxDateTimeInput('getText');  
            },
            getDate: function() {
                return JQXLite(this.componentSelector).jqxDateTimeInput('getDate');  
            },
            getMaxDate: function() {
                return JQXLite(this.componentSelector).jqxDateTimeInput('getMaxDate');  
            },
            getMinDate: function() {
                return JQXLite(this.componentSelector).jqxDateTimeInput('getMinDate');  
            },
            open: function() {
                JQXLite(this.componentSelector).jqxDateTimeInput('open');  
            },
            setRange: function(date, date2) {
                JQXLite(this.componentSelector).jqxDateTimeInput('setRange', date, date2);  
            },
            setMinDate: function(date) {
                JQXLite(this.componentSelector).jqxDateTimeInput('setMinDate', date);  
            },
            setMaxDate: function(date) {
                JQXLite(this.componentSelector).jqxDateTimeInput('setMaxDate', date);  
            },
            setDate: function(date) {
                JQXLite(this.componentSelector).jqxDateTimeInput('setDate', date);  
            },
            val: function(value, value2) {
                if (value !== undefined) {
                    JQXLite(this.componentSelector).jqxDateTimeInput('val', value, value2)
                } else {
                    return JQXLite(this.componentSelector).jqxDateTimeInput('val');
                }
            },
            _animationType: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxDateTimeInput('animationType', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxDateTimeInput('animationType');
                }
            },
            _allowNullDate: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxDateTimeInput('allowNullDate', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxDateTimeInput('allowNullDate');
                }
            },
            _allowKeyboardDelete: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxDateTimeInput('allowKeyboardDelete', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxDateTimeInput('allowKeyboardDelete');
                }
            },
            _clearString: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxDateTimeInput('clearString', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxDateTimeInput('clearString');
                }
            },
            _culture: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxDateTimeInput('culture', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxDateTimeInput('culture');
                }
            },
            _closeDelay: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxDateTimeInput('closeDelay', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxDateTimeInput('closeDelay');
                }
            },
            _closeCalendarAfterSelection: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxDateTimeInput('closeCalendarAfterSelection', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxDateTimeInput('closeCalendarAfterSelection');
                }
            },
            _dropDownHorizontalAlignment: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxDateTimeInput('dropDownHorizontalAlignment', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxDateTimeInput('dropDownHorizontalAlignment');
                }
            },
            _dropDownVerticalAlignment: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxDateTimeInput('dropDownVerticalAlignment', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxDateTimeInput('dropDownVerticalAlignment');
                }
            },
            _disabled: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxDateTimeInput('disabled', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxDateTimeInput('disabled');
                }
            },
            _enableBrowserBoundsDetection: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxDateTimeInput('enableBrowserBoundsDetection', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxDateTimeInput('enableBrowserBoundsDetection');
                }
            },
            _enableAbsoluteSelection: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxDateTimeInput('enableAbsoluteSelection', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxDateTimeInput('enableAbsoluteSelection');
                }
            },
            _editMode: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxDateTimeInput('editMode', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxDateTimeInput('editMode');
                }
            },
            _firstDayOfWeek: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxDateTimeInput('firstDayOfWeek', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxDateTimeInput('firstDayOfWeek');
                }
            },
            _formatString: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxDateTimeInput('formatString', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxDateTimeInput('formatString');
                }
            },
            _height: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxDateTimeInput('height', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxDateTimeInput('height');
                }
            },
            _min: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxDateTimeInput('min', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxDateTimeInput('min');
                }
            },
            _max: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxDateTimeInput('max', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxDateTimeInput('max');
                }
            },
            _openDelay: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxDateTimeInput('openDelay', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxDateTimeInput('openDelay');
                }
            },
            _placeHolder: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxDateTimeInput('placeHolder', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxDateTimeInput('placeHolder');
                }
            },
            _popupZIndex: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxDateTimeInput('popupZIndex', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxDateTimeInput('popupZIndex');
                }
            },
            _rtl: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxDateTimeInput('rtl', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxDateTimeInput('rtl');
                }
            },
            _readonly: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxDateTimeInput('readonly', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxDateTimeInput('readonly');
                }
            },
            _showFooter: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxDateTimeInput('showFooter', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxDateTimeInput('showFooter');
                }
            },
            _selectionMode: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxDateTimeInput('selectionMode', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxDateTimeInput('selectionMode');
                }
            },
            _showWeekNumbers: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxDateTimeInput('showWeekNumbers', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxDateTimeInput('showWeekNumbers');
                }
            },
            _showTimeButton: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxDateTimeInput('showTimeButton', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxDateTimeInput('showTimeButton');
                }
            },
            _showCalendarButton: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxDateTimeInput('showCalendarButton', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxDateTimeInput('showCalendarButton');
                }
            },
            _theme: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxDateTimeInput('theme', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxDateTimeInput('theme');
                }
            },
            _template: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxDateTimeInput('template', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxDateTimeInput('template');
                }
            },
            _textAlign: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxDateTimeInput('textAlign', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxDateTimeInput('textAlign');
                }
            },
            _todayString: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxDateTimeInput('todayString', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxDateTimeInput('todayString');
                }
            },
            _value: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxDateTimeInput('value', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxDateTimeInput('value');
                }
            },
            _width: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxDateTimeInput('width', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxDateTimeInput('width');
                }
            },
            _yearCutoff: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxDateTimeInput('yearCutoff', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxDateTimeInput('yearCutoff');
                }
            },
            __createComponent__: function (options) {
                let widgetOptions;
                options ? widgetOptions = options : widgetOptions = this.__manageProps__();
                JQXLite(this.componentSelector).jqxDateTimeInput(widgetOptions);
                this.__extendProps__();
                this.__wireEvents__();
            },
            __manageProps__: function () {
                const widgetProps = ['animationType','allowNullDate','allowKeyboardDelete','clearString','culture','closeDelay','closeCalendarAfterSelection','dropDownHorizontalAlignment','dropDownVerticalAlignment','disabled','enableBrowserBoundsDetection','enableAbsoluteSelection','editMode','firstDayOfWeek','formatString','height','min','max','openDelay','placeHolder','popupZIndex','rtl','readonly','showFooter','selectionMode','showWeekNumbers','showTimeButton','showCalendarButton','theme','template','textAlign','todayString','value','width','yearCutoff'];
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

                Object.defineProperty(that, 'animationType', {
                    get: function() {
                        return that._animationType();
                    },
                    set: function(newValue) {
                        that._animationType(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'allowNullDate', {
                    get: function() {
                        return that._allowNullDate();
                    },
                    set: function(newValue) {
                        that._allowNullDate(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'allowKeyboardDelete', {
                    get: function() {
                        return that._allowKeyboardDelete();
                    },
                    set: function(newValue) {
                        that._allowKeyboardDelete(newValue);
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
                Object.defineProperty(that, 'closeDelay', {
                    get: function() {
                        return that._closeDelay();
                    },
                    set: function(newValue) {
                        that._closeDelay(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'closeCalendarAfterSelection', {
                    get: function() {
                        return that._closeCalendarAfterSelection();
                    },
                    set: function(newValue) {
                        that._closeCalendarAfterSelection(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'dropDownHorizontalAlignment', {
                    get: function() {
                        return that._dropDownHorizontalAlignment();
                    },
                    set: function(newValue) {
                        that._dropDownHorizontalAlignment(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'dropDownVerticalAlignment', {
                    get: function() {
                        return that._dropDownVerticalAlignment();
                    },
                    set: function(newValue) {
                        that._dropDownVerticalAlignment(newValue);
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
                Object.defineProperty(that, 'enableBrowserBoundsDetection', {
                    get: function() {
                        return that._enableBrowserBoundsDetection();
                    },
                    set: function(newValue) {
                        that._enableBrowserBoundsDetection(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'enableAbsoluteSelection', {
                    get: function() {
                        return that._enableAbsoluteSelection();
                    },
                    set: function(newValue) {
                        that._enableAbsoluteSelection(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'editMode', {
                    get: function() {
                        return that._editMode();
                    },
                    set: function(newValue) {
                        that._editMode(newValue);
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
                Object.defineProperty(that, 'formatString', {
                    get: function() {
                        return that._formatString();
                    },
                    set: function(newValue) {
                        that._formatString(newValue);
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
                Object.defineProperty(that, 'openDelay', {
                    get: function() {
                        return that._openDelay();
                    },
                    set: function(newValue) {
                        that._openDelay(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'placeHolder', {
                    get: function() {
                        return that._placeHolder();
                    },
                    set: function(newValue) {
                        that._placeHolder(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'popupZIndex', {
                    get: function() {
                        return that._popupZIndex();
                    },
                    set: function(newValue) {
                        that._popupZIndex(newValue);
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
                Object.defineProperty(that, 'readonly', {
                    get: function() {
                        return that._readonly();
                    },
                    set: function(newValue) {
                        that._readonly(newValue);
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
                Object.defineProperty(that, 'showTimeButton', {
                    get: function() {
                        return that._showTimeButton();
                    },
                    set: function(newValue) {
                        that._showTimeButton(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'showCalendarButton', {
                    get: function() {
                        return that._showCalendarButton();
                    },
                    set: function(newValue) {
                        that._showCalendarButton(newValue);
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
                Object.defineProperty(that, 'template', {
                    get: function() {
                        return that._template();
                    },
                    set: function(newValue) {
                        that._template(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'textAlign', {
                    get: function() {
                        return that._textAlign();
                    },
                    set: function(newValue) {
                        that._textAlign(newValue);
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
                Object.defineProperty(that, 'yearCutoff', {
                    get: function() {
                        return that._yearCutoff();
                    },
                    set: function(newValue) {
                        that._yearCutoff(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
            },
            __twoWayDataBinding__: function () {
                const value = JQXLite(this.componentSelector).jqxDateTimeInput('value');
                this.$emit('input', value);
            },
            __wireEvents__: function () {
                const that = this;

                JQXLite(this.componentSelector).on('change', function (event) { that.$emit('change', event); that.__twoWayDataBinding__(); });
                JQXLite(this.componentSelector).on('close', function (event) { that.$emit('close', event); });
                JQXLite(this.componentSelector).on('open', function (event) { that.$emit('open', event); });
                JQXLite(this.componentSelector).on('textchanged', function (event) { that.$emit('textchanged', event); });
                JQXLite(this.componentSelector).on('valueChanged', function (event) { that.$emit('valueChanged', event); });
            }
        }
    }
</script>
