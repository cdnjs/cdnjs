<template>
    <div v-bind:id="id">
        <slot></slot>
    </div>
</template>

<script>
    import '../jqwidgets/jqxcore.js';
    import '../jqwidgets/jqxprogressbar.js';

    export default {
        props: {
            animationDuration: Number,
            colorRanges: Array,
            disabled: Boolean,
            height: [Number, String],
            layout: String,
            max: Number,
            min: Number,
            orientation: String,
            rtl: Boolean,
            renderText: Function,
            showText: Boolean,
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
            this.id = 'jqxProgressBar' + JQXLite.generateID();
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
                JQXLite(this.componentSelector).jqxProgressBar(options);
            },
            getOptions: function () {
                const usedProps = Object.keys(this.__manageProps__());
                const resultToReturn = {};
                for (let i = 0; i < usedProps.length; i++) {
                    resultToReturn[usedProps[i]] = JQXLite(this.componentSelector).jqxProgressBar(usedProps[i]);
                }
                return resultToReturn;
            },
            actualValue: function(value) {
                JQXLite(this.componentSelector).jqxProgressBar('actualValue', value);  
            },
            destroy: function() {
                JQXLite(this.componentSelector).jqxProgressBar('destroy');  
            },
            val: function(value) {
                if (value !== undefined) {
                    JQXLite(this.componentSelector).jqxProgressBar('val',  value)
                } else {
                    return JQXLite(this.componentSelector).jqxProgressBar('val');
                }
            },
            _animationDuration: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxProgressBar('animationDuration', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxProgressBar('animationDuration');
                }
            },
            _colorRanges: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxProgressBar('colorRanges', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxProgressBar('colorRanges');
                }
            },
            _disabled: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxProgressBar('disabled', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxProgressBar('disabled');
                }
            },
            _height: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxProgressBar('height', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxProgressBar('height');
                }
            },
            _layout: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxProgressBar('layout', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxProgressBar('layout');
                }
            },
            _max: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxProgressBar('max', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxProgressBar('max');
                }
            },
            _min: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxProgressBar('min', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxProgressBar('min');
                }
            },
            _orientation: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxProgressBar('orientation', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxProgressBar('orientation');
                }
            },
            _rtl: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxProgressBar('rtl', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxProgressBar('rtl');
                }
            },
            _renderText: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxProgressBar('renderText', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxProgressBar('renderText');
                }
            },
            _showText: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxProgressBar('showText', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxProgressBar('showText');
                }
            },
            _template: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxProgressBar('template', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxProgressBar('template');
                }
            },
            _theme: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxProgressBar('theme', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxProgressBar('theme');
                }
            },
            _value: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxProgressBar('value', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxProgressBar('value');
                }
            },
            _width: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxProgressBar('width', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxProgressBar('width');
                }
            },
            __createComponent__: function (options) {
                let widgetOptions;
                options ? widgetOptions = options : widgetOptions = this.__manageProps__();
                JQXLite(this.componentSelector).jqxProgressBar(widgetOptions);
                this.__extendProps__();
                this.__wireEvents__();
            },
            __manageProps__: function () {
                const widgetProps = ['animationDuration','colorRanges','disabled','height','layout','max','min','orientation','rtl','renderText','showText','template','theme','value','width'];
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

                Object.defineProperty(that, 'animationDuration', {
                    get: function() {
                        return that._animationDuration();
                    },
                    set: function(newValue) {
                        that._animationDuration(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'colorRanges', {
                    get: function() {
                        return that._colorRanges();
                    },
                    set: function(newValue) {
                        that._colorRanges(newValue);
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
                Object.defineProperty(that, 'layout', {
                    get: function() {
                        return that._layout();
                    },
                    set: function(newValue) {
                        that._layout(newValue);
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
                Object.defineProperty(that, 'orientation', {
                    get: function() {
                        return that._orientation();
                    },
                    set: function(newValue) {
                        that._orientation(newValue);
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
                Object.defineProperty(that, 'renderText', {
                    get: function() {
                        return that._renderText();
                    },
                    set: function(newValue) {
                        that._renderText(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'showText', {
                    get: function() {
                        return that._showText();
                    },
                    set: function(newValue) {
                        that._showText(newValue);
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
            __wireEvents__: function () {
                const that = this;

                JQXLite(this.componentSelector).on('complete', function (event) { that.$emit('complete', event); });
                JQXLite(this.componentSelector).on('invalidValue', function (event) { that.$emit('invalidValue', event); });
                JQXLite(this.componentSelector).on('valueChanged', function (event) { that.$emit('valueChanged', event); });
            }
        }
    }
</script>
