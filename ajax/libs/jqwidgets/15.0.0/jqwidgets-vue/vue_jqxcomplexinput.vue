<template>
    <div v-bind:id="id">
        <input type="text" />
        <div></div>
    </div>
</template>

<script>
    import '../jqwidgets/jqxcore.js';
    import '../jqwidgets/jqxbuttons.js';
    import '../jqwidgets/jqxcomplexinput.js';

    export default {
        props: {
            decimalNotation: String,
            disabled: Boolean,
            height: [Number, String],
            placeHolder: String,
            roundedCorners: Boolean,
            rtl: Boolean,
            spinButtons: Boolean,
            spinButtonsStep: Number,
            template: String,
            theme: String,
            value: String,
            width: [Number, String],
            autoCreate: {
                default: true,
                type: Boolean
            }
        },
        created: function () {
            this.id = 'jqxComplexInput' + JQXLite.generateID();
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
                JQXLite(this.componentSelector).jqxComplexInput(options);
            },
            getOptions: function () {
                const usedProps = Object.keys(this.__manageProps__());
                const resultToReturn = {};
                for (let i = 0; i < usedProps.length; i++) {
                    resultToReturn[usedProps[i]] = JQXLite(this.componentSelector).jqxComplexInput(usedProps[i]);
                }
                return resultToReturn;
            },
            destroy: function() {
                JQXLite(this.componentSelector).jqxComplexInput('destroy');  
            },
            getDecimalNotation: function(part, decimalNotation) {
                return JQXLite(this.componentSelector).jqxComplexInput('getDecimalNotation', part, decimalNotation);  
            },
            getReal: function(complexnumber) {
                return JQXLite(this.componentSelector).jqxComplexInput('getReal', complexnumber);  
            },
            getImaginary: function(complexnumber) {
                return JQXLite(this.componentSelector).jqxComplexInput('getImaginary', complexnumber);  
            },
            render: function() {
                JQXLite(this.componentSelector).jqxComplexInput('render');  
            },
            refresh: function() {
                JQXLite(this.componentSelector).jqxComplexInput('refresh');  
            },
            val: function(value) {
                if (value !== undefined) {
                    JQXLite(this.componentSelector).jqxComplexInput('val',  value)
                } else {
                    return JQXLite(this.componentSelector).jqxComplexInput('val');
                }
            },
            _decimalNotation: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxComplexInput('decimalNotation', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxComplexInput('decimalNotation');
                }
            },
            _disabled: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxComplexInput('disabled', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxComplexInput('disabled');
                }
            },
            _height: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxComplexInput('height', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxComplexInput('height');
                }
            },
            _placeHolder: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxComplexInput('placeHolder', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxComplexInput('placeHolder');
                }
            },
            _roundedCorners: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxComplexInput('roundedCorners', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxComplexInput('roundedCorners');
                }
            },
            _rtl: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxComplexInput('rtl', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxComplexInput('rtl');
                }
            },
            _spinButtons: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxComplexInput('spinButtons', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxComplexInput('spinButtons');
                }
            },
            _spinButtonsStep: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxComplexInput('spinButtonsStep', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxComplexInput('spinButtonsStep');
                }
            },
            _template: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxComplexInput('template', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxComplexInput('template');
                }
            },
            _theme: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxComplexInput('theme', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxComplexInput('theme');
                }
            },
            _value: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxComplexInput('value', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxComplexInput('value');
                }
            },
            _width: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxComplexInput('width', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxComplexInput('width');
                }
            },
            __createComponent__: function (options) {
                let widgetOptions;
                options ? widgetOptions = options : widgetOptions = this.__manageProps__();
                JQXLite(this.componentSelector).jqxComplexInput(widgetOptions);
                this.__extendProps__();
                this.__wireEvents__();
            },
            __manageProps__: function () {
                const widgetProps = ['decimalNotation','disabled','height','placeHolder','roundedCorners','rtl','spinButtons','spinButtonsStep','template','theme','value','width'];
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
                const value = JQXLite(this.componentSelector).jqxComplexInput('val');
                this.$emit('input', value);
            },
            __wireEvents__: function () {
                const that = this;

                JQXLite(this.componentSelector).on('change', function (event) { that.$emit('change', event); that.__twoWayDataBinding__(); });
            }
        }
    }
</script>
