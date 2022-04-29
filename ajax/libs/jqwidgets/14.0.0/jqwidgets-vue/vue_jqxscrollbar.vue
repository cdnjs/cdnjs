<template>
    <div v-bind:id="id">
        <slot></slot>
    </div>
</template>

<script>
    import '../jqwidgets/jqxcore.js';
    import '../jqwidgets/jqxbuttons.js';
    import '../jqwidgets/jqxscrollbar.js';

    export default {
        props: {
            disabled: Boolean,
            height: [Number, String],
            largestep: Number,
            min: Number,
            max: Number,
            rtl: Boolean,
            step: Number,
            showButtons: Boolean,
            thumbMinSize: Number,
            theme: String,
            vertical: Boolean,
            value: Number,
            width: [Number, String],
            autoCreate: {
                default: true,
                type: Boolean
            }
        },
        created: function () {
            this.id = 'jqxScrollBar' + JQXLite.generateID();
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
                JQXLite(this.componentSelector).jqxScrollBar(options);
            },
            getOptions: function () {
                const usedProps = Object.keys(this.__manageProps__());
                const resultToReturn = {};
                for (let i = 0; i < usedProps.length; i++) {
                    resultToReturn[usedProps[i]] = JQXLite(this.componentSelector).jqxScrollBar(usedProps[i]);
                }
                return resultToReturn;
            },
            destroy: function() {
                JQXLite(this.componentSelector).jqxScrollBar('destroy');  
            },
            isScrolling: function() {
                return JQXLite(this.componentSelector).jqxScrollBar('isScrolling');  
            },
            setPosition: function(index) {
                JQXLite(this.componentSelector).jqxScrollBar('setPosition', index);  
            },
            _disabled: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxScrollBar('disabled', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxScrollBar('disabled');
                }
            },
            _height: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxScrollBar('height', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxScrollBar('height');
                }
            },
            _largestep: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxScrollBar('largestep', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxScrollBar('largestep');
                }
            },
            _min: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxScrollBar('min', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxScrollBar('min');
                }
            },
            _max: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxScrollBar('max', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxScrollBar('max');
                }
            },
            _rtl: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxScrollBar('rtl', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxScrollBar('rtl');
                }
            },
            _step: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxScrollBar('step', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxScrollBar('step');
                }
            },
            _showButtons: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxScrollBar('showButtons', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxScrollBar('showButtons');
                }
            },
            _thumbMinSize: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxScrollBar('thumbMinSize', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxScrollBar('thumbMinSize');
                }
            },
            _theme: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxScrollBar('theme', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxScrollBar('theme');
                }
            },
            _vertical: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxScrollBar('vertical', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxScrollBar('vertical');
                }
            },
            _value: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxScrollBar('value', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxScrollBar('value');
                }
            },
            _width: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxScrollBar('width', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxScrollBar('width');
                }
            },
            __createComponent__: function (options) {
                let widgetOptions;
                options ? widgetOptions = options : widgetOptions = this.__manageProps__();
                JQXLite(this.componentSelector).jqxScrollBar(widgetOptions);
                this.__extendProps__();
                this.__wireEvents__();
            },
            __manageProps__: function () {
                const widgetProps = ['disabled','height','largestep','min','max','rtl','step','showButtons','thumbMinSize','theme','vertical','value','width'];
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
                Object.defineProperty(that, 'largestep', {
                    get: function() {
                        return that._largestep();
                    },
                    set: function(newValue) {
                        that._largestep(newValue);
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
                Object.defineProperty(that, 'step', {
                    get: function() {
                        return that._step();
                    },
                    set: function(newValue) {
                        that._step(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'showButtons', {
                    get: function() {
                        return that._showButtons();
                    },
                    set: function(newValue) {
                        that._showButtons(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'thumbMinSize', {
                    get: function() {
                        return that._thumbMinSize();
                    },
                    set: function(newValue) {
                        that._thumbMinSize(newValue);
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
                Object.defineProperty(that, 'vertical', {
                    get: function() {
                        return that._vertical();
                    },
                    set: function(newValue) {
                        that._vertical(newValue);
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

                JQXLite(this.componentSelector).on('valueChanged', function (event) { that.$emit('valueChanged', event); });
            }
        }
    }
</script>
