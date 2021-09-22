<template>
    <div v-bind:id="id" v-if="rtl">
        <div v-if="spinButtons"></div>
        <div v-if="dropDown"></div>
        <input type='text' />
    </div>
     <div v-bind:id="id" v-else>
        <input type='text' />
        <div v-if="spinButtons"></div>
        <div v-if="dropDown"></div>
    </div>
</template>

<script>
    import '../jqwidgets/jqxcore.js';
    import '../jqwidgets/jqxformattedinput.js';

    export default {
        props: {
            disabled: Boolean,
            decimalNotation: String,
            dropDown: Boolean,
            dropDownWidth: Number,
            height: [Number, String],
            min: [Number, String],
            max: [Number, String],
            placeHolder: String,
            popupZIndex: Number,
            roundedCorners: Boolean,
            rtl: Boolean,
            radix: [Number, String],
            spinButtons: Boolean,
            spinButtonsStep: Number,
            template: String,
            theme: String,
            upperCase: Boolean,
            value: [Number, String],
            width: [Number, String],
            autoCreate: {
                default: true,
                type: Boolean
            }
        },
        created: function () {
            this.id = 'jqxFormattedInput' + JQXLite.generateID();
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
                JQXLite(this.componentSelector).jqxFormattedInput(options);
            },
            getOptions: function () {
                const usedProps = Object.keys(this.__manageProps__());
                const resultToReturn = {};
                for (let i = 0; i < usedProps.length; i++) {
                    resultToReturn[usedProps[i]] = JQXLite(this.componentSelector).jqxFormattedInput(usedProps[i]);
                }
                return resultToReturn;
            },
            close: function() {
                JQXLite(this.componentSelector).jqxFormattedInput('close');  
            },
            destroy: function() {
                JQXLite(this.componentSelector).jqxFormattedInput('destroy');  
            },
            focus: function() {
                JQXLite(this.componentSelector).jqxFormattedInput('focus');  
            },
            open: function() {
                JQXLite(this.componentSelector).jqxFormattedInput('open');  
            },
            render: function() {
                JQXLite(this.componentSelector).jqxFormattedInput('render');  
            },
            refresh: function() {
                JQXLite(this.componentSelector).jqxFormattedInput('refresh');  
            },
            selectAll: function() {
                JQXLite(this.componentSelector).jqxFormattedInput('selectAll');  
            },
            selectFirst: function() {
                JQXLite(this.componentSelector).jqxFormattedInput('selectFirst');  
            },
            selectLast: function() {
                JQXLite(this.componentSelector).jqxFormattedInput('selectLast');  
            },
            val: function(value) {
                if (value !== undefined) {
                    if(typeof value === 'string') {                        return JQXLite(this.componentSelector).jqxFormattedInput('val',  value)
                    } else {
                        JQXLite(this.componentSelector).jqxFormattedInput('val',  value)
                }
                    JQXLite(this.componentSelector).jqxFormattedInput('val',  value)
                } else {
                    return JQXLite(this.componentSelector).jqxFormattedInput('val');
                }
            },
            _disabled: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxFormattedInput('disabled', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxFormattedInput('disabled');
                }
            },
            _decimalNotation: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxFormattedInput('decimalNotation', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxFormattedInput('decimalNotation');
                }
            },
            _dropDown: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxFormattedInput('dropDown', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxFormattedInput('dropDown');
                }
            },
            _dropDownWidth: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxFormattedInput('dropDownWidth', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxFormattedInput('dropDownWidth');
                }
            },
            _height: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxFormattedInput('height', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxFormattedInput('height');
                }
            },
            _min: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxFormattedInput('min', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxFormattedInput('min');
                }
            },
            _max: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxFormattedInput('max', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxFormattedInput('max');
                }
            },
            _placeHolder: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxFormattedInput('placeHolder', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxFormattedInput('placeHolder');
                }
            },
            _popupZIndex: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxFormattedInput('popupZIndex', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxFormattedInput('popupZIndex');
                }
            },
            _roundedCorners: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxFormattedInput('roundedCorners', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxFormattedInput('roundedCorners');
                }
            },
            _rtl: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxFormattedInput('rtl', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxFormattedInput('rtl');
                }
            },
            _radix: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxFormattedInput('radix', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxFormattedInput('radix');
                }
            },
            _spinButtons: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxFormattedInput('spinButtons', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxFormattedInput('spinButtons');
                }
            },
            _spinButtonsStep: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxFormattedInput('spinButtonsStep', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxFormattedInput('spinButtonsStep');
                }
            },
            _template: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxFormattedInput('template', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxFormattedInput('template');
                }
            },
            _theme: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxFormattedInput('theme', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxFormattedInput('theme');
                }
            },
            _upperCase: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxFormattedInput('upperCase', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxFormattedInput('upperCase');
                }
            },
            _value: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxFormattedInput('value', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxFormattedInput('value');
                }
            },
            _width: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxFormattedInput('width', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxFormattedInput('width');
                }
            },
            __createComponent__: function (options) {
                let widgetOptions;
                options ? widgetOptions = options : widgetOptions = this.__manageProps__();
                JQXLite(this.componentSelector).jqxFormattedInput(widgetOptions);
                this.__extendProps__();
                this.__wireEvents__();
            },
            __manageProps__: function () {
                const widgetProps = ['disabled','decimalNotation','dropDown','dropDownWidth','height','min','max','placeHolder','popupZIndex','roundedCorners','rtl','radix','spinButtons','spinButtonsStep','template','theme','upperCase','value','width'];
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
                Object.defineProperty(that, 'decimalNotation', {
                    get: function() {
                        return that._decimalNotation();
                    },
                    set: function(newValue) {
                        that._decimalNotation(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'dropDown', {
                    get: function() {
                        return that._dropDown();
                    },
                    set: function(newValue) {
                        that._dropDown(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'dropDownWidth', {
                    get: function() {
                        return that._dropDownWidth();
                    },
                    set: function(newValue) {
                        that._dropDownWidth(newValue);
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
                Object.defineProperty(that, 'roundedCorners', {
                    get: function() {
                        return that._roundedCorners();
                    },
                    set: function(newValue) {
                        that._roundedCorners(newValue);
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
                Object.defineProperty(that, 'radix', {
                    get: function() {
                        return that._radix();
                    },
                    set: function(newValue) {
                        that._radix(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'spinButtons', {
                    get: function() {
                        return that._spinButtons();
                    },
                    set: function(newValue) {
                        that._spinButtons(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'spinButtonsStep', {
                    get: function() {
                        return that._spinButtonsStep();
                    },
                    set: function(newValue) {
                        that._spinButtonsStep(newValue);
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
                Object.defineProperty(that, 'upperCase', {
                    get: function() {
                        return that._upperCase();
                    },
                    set: function(newValue) {
                        that._upperCase(newValue);
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
                const value = JQXLite(this.componentSelector).jqxFormattedInput('val');
                this.$emit('input', value);
            },
            __wireEvents__: function () {
                const that = this;

                JQXLite(this.componentSelector).on('change', function (event) { that.$emit('change', event); that.__twoWayDataBinding__(); });
                JQXLite(this.componentSelector).on('close', function (event) { that.$emit('close', event); });
                JQXLite(this.componentSelector).on('open', function (event) { that.$emit('open', event); });
                JQXLite(this.componentSelector).on('radixChange', function (event) { that.$emit('radixChange', event); that.__twoWayDataBinding__(); });
            }
        }
    }
</script>
