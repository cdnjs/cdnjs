<template>
        <div v-bind:id="id"></div>
</template>

<script>
    import '../jqwidgets/jqxcore.js';
    import '../jqwidgets/jqxbuttons.js';
    import '../jqwidgets/jqxnumberinput.js';

    export default {
        props: {
            allowNull: Boolean,
            decimal: Number,
            disabled: Boolean,
            decimalDigits: Number,
            decimalSeparator: String,
            digits: Number,
            groupSeparator: String,
            groupSize: Number,
            height: [Number, String],
            inputMode: String,
            min: Number,
            max: Number,
            negativeSymbol: String,
            placeHolder: String,
            promptChar: String,
            rtl: Boolean,
            readOnly: Boolean,
            spinMode: String,
            spinButtons: Boolean,
            spinButtonsWidth: Number,
            spinButtonsStep: Number,
            symbol: String,
            symbolPosition: String,
            textAlign: String,
            template: String,
            theme: String,
            value: Number,
            width: [Number, String],
            autoCreate: {
                default: true,
                type: Boolean
            }
        },
        created: function () {
            this.id = 'jqxNumberInput' + JQXLite.generateID();
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
                JQXLite(this.componentSelector).jqxNumberInput(options);
            },
            getOptions: function () {
                const usedProps = Object.keys(this.__manageProps__());
                const resultToReturn = {};
                for (let i = 0; i < usedProps.length; i++) {
                    resultToReturn[usedProps[i]] = JQXLite(this.componentSelector).jqxNumberInput(usedProps[i]);
                }
                return resultToReturn;
            },
            clear: function() {
                JQXLite(this.componentSelector).jqxNumberInput('clear');  
            },
            destroy: function() {
                JQXLite(this.componentSelector).jqxNumberInput('destroy');  
            },
            focus: function() {
                JQXLite(this.componentSelector).jqxNumberInput('focus');  
            },
            getDecimal: function() {
                return JQXLite(this.componentSelector).jqxNumberInput('getDecimal');  
            },
            setDecimal: function(index) {
                JQXLite(this.componentSelector).jqxNumberInput('setDecimal', index);  
            },
            val: function(value) {
                if (value !== undefined) {
                    JQXLite(this.componentSelector).jqxNumberInput('val',  value)
                } else {
                    return JQXLite(this.componentSelector).jqxNumberInput('val');
                }
            },
            _allowNull: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxNumberInput('allowNull', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxNumberInput('allowNull');
                }
            },
            _decimal: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxNumberInput('decimal', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxNumberInput('decimal');
                }
            },
            _disabled: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxNumberInput('disabled', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxNumberInput('disabled');
                }
            },
            _decimalDigits: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxNumberInput('decimalDigits', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxNumberInput('decimalDigits');
                }
            },
            _decimalSeparator: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxNumberInput('decimalSeparator', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxNumberInput('decimalSeparator');
                }
            },
            _digits: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxNumberInput('digits', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxNumberInput('digits');
                }
            },
            _groupSeparator: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxNumberInput('groupSeparator', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxNumberInput('groupSeparator');
                }
            },
            _groupSize: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxNumberInput('groupSize', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxNumberInput('groupSize');
                }
            },
            _height: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxNumberInput('height', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxNumberInput('height');
                }
            },
            _inputMode: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxNumberInput('inputMode', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxNumberInput('inputMode');
                }
            },
            _min: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxNumberInput('min', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxNumberInput('min');
                }
            },
            _max: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxNumberInput('max', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxNumberInput('max');
                }
            },
            _negativeSymbol: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxNumberInput('negativeSymbol', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxNumberInput('negativeSymbol');
                }
            },
            _placeHolder: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxNumberInput('placeHolder', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxNumberInput('placeHolder');
                }
            },
            _promptChar: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxNumberInput('promptChar', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxNumberInput('promptChar');
                }
            },
            _rtl: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxNumberInput('rtl', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxNumberInput('rtl');
                }
            },
            _readOnly: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxNumberInput('readOnly', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxNumberInput('readOnly');
                }
            },
            _spinMode: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxNumberInput('spinMode', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxNumberInput('spinMode');
                }
            },
            _spinButtons: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxNumberInput('spinButtons', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxNumberInput('spinButtons');
                }
            },
            _spinButtonsWidth: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxNumberInput('spinButtonsWidth', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxNumberInput('spinButtonsWidth');
                }
            },
            _spinButtonsStep: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxNumberInput('spinButtonsStep', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxNumberInput('spinButtonsStep');
                }
            },
            _symbol: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxNumberInput('symbol', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxNumberInput('symbol');
                }
            },
            _symbolPosition: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxNumberInput('symbolPosition', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxNumberInput('symbolPosition');
                }
            },
            _textAlign: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxNumberInput('textAlign', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxNumberInput('textAlign');
                }
            },
            _template: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxNumberInput('template', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxNumberInput('template');
                }
            },
            _theme: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxNumberInput('theme', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxNumberInput('theme');
                }
            },
            _value: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxNumberInput('value', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxNumberInput('value');
                }
            },
            _width: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxNumberInput('width', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxNumberInput('width');
                }
            },
            __createComponent__: function (options) {
                let widgetOptions;
                options ? widgetOptions = options : widgetOptions = this.__manageProps__();
                JQXLite(this.componentSelector).jqxNumberInput(widgetOptions);
                this.__extendProps__();
                this.__wireEvents__();
            },
            __manageProps__: function () {
                const widgetProps = ['allowNull','decimal','disabled','decimalDigits','decimalSeparator','digits','groupSeparator','groupSize','height','inputMode','min','max','negativeSymbol','placeHolder','promptChar','rtl','readOnly','spinMode','spinButtons','spinButtonsWidth','spinButtonsStep','symbol','symbolPosition','textAlign','template','theme','value','width'];
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

                Object.defineProperty(that, 'allowNull', {
                    get: function() {
                        return that._allowNull();
                    },
                    set: function(newValue) {
                        that._allowNull(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'decimal', {
                    get: function() {
                        return that._decimal();
                    },
                    set: function(newValue) {
                        that._decimal(newValue);
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
                Object.defineProperty(that, 'decimalDigits', {
                    get: function() {
                        return that._decimalDigits();
                    },
                    set: function(newValue) {
                        that._decimalDigits(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'decimalSeparator', {
                    get: function() {
                        return that._decimalSeparator();
                    },
                    set: function(newValue) {
                        that._decimalSeparator(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'digits', {
                    get: function() {
                        return that._digits();
                    },
                    set: function(newValue) {
                        that._digits(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'groupSeparator', {
                    get: function() {
                        return that._groupSeparator();
                    },
                    set: function(newValue) {
                        that._groupSeparator(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'groupSize', {
                    get: function() {
                        return that._groupSize();
                    },
                    set: function(newValue) {
                        that._groupSize(newValue);
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
                Object.defineProperty(that, 'inputMode', {
                    get: function() {
                        return that._inputMode();
                    },
                    set: function(newValue) {
                        that._inputMode(newValue);
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
                Object.defineProperty(that, 'negativeSymbol', {
                    get: function() {
                        return that._negativeSymbol();
                    },
                    set: function(newValue) {
                        that._negativeSymbol(newValue);
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
                Object.defineProperty(that, 'promptChar', {
                    get: function() {
                        return that._promptChar();
                    },
                    set: function(newValue) {
                        that._promptChar(newValue);
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
                Object.defineProperty(that, 'spinMode', {
                    get: function() {
                        return that._spinMode();
                    },
                    set: function(newValue) {
                        that._spinMode(newValue);
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
                Object.defineProperty(that, 'spinButtonsWidth', {
                    get: function() {
                        return that._spinButtonsWidth();
                    },
                    set: function(newValue) {
                        that._spinButtonsWidth(newValue);
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
                Object.defineProperty(that, 'symbol', {
                    get: function() {
                        return that._symbol();
                    },
                    set: function(newValue) {
                        that._symbol(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'symbolPosition', {
                    get: function() {
                        return that._symbolPosition();
                    },
                    set: function(newValue) {
                        that._symbolPosition(newValue);
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
                const value = JQXLite(this.componentSelector).jqxNumberInput('val');
                this.$emit('input', value);
            },
            __wireEvents__: function () {
                const that = this;

                JQXLite(this.componentSelector).on('change', function (event) { that.$emit('change', event); });
                JQXLite(this.componentSelector).on('textchanged', function (event) { that.$emit('textchanged', event); });
                JQXLite(this.componentSelector).on('valueChanged', function (event) { that.$emit('valueChanged', event); that.__twoWayDataBinding__(); });
            }
        }
    }
</script>
