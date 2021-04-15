<template>
    <div v-bind:id="id">
        <slot></slot>
    </div>
</template>

<script>
    import '../jqwidgets/jqxcore.js';
    import '../jqwidgets/jqxswitchbutton.js';

    export default {
        props: {
            checked: Boolean,
            disabled: Boolean,
            height: [Number, String],
            orientation: String,
            onLabel: String,
            offLabel: String,
            thumbSize: String,
            rtl: Boolean,
            width: [Number, String],
            autoCreate: {
                default: true,
                type: Boolean
            }
        },
        created: function () {
            this.id = 'jqxSwitchButton' + JQXLite.generateID();
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
                JQXLite(this.componentSelector).jqxSwitchButton(options);
            },
            getOptions: function () {
                const usedProps = Object.keys(this.__manageProps__());
                const resultToReturn = {};
                for (let i = 0; i < usedProps.length; i++) {
                    resultToReturn[usedProps[i]] = JQXLite(this.componentSelector).jqxSwitchButton(usedProps[i]);
                }
                return resultToReturn;
            },
            check: function() {
                JQXLite(this.componentSelector).jqxSwitchButton('check');  
            },
            disable: function() {
                JQXLite(this.componentSelector).jqxSwitchButton('disable');  
            },
            enable: function() {
                JQXLite(this.componentSelector).jqxSwitchButton('enable');  
            },
            toggle: function() {
                JQXLite(this.componentSelector).jqxSwitchButton('toggle');  
            },
            uncheck: function() {
                JQXLite(this.componentSelector).jqxSwitchButton('uncheck');  
            },
            val: function(value) {
                if (value !== undefined) {
                    JQXLite(this.componentSelector).jqxSwitchButton('val',  value)
                } else {
                    return JQXLite(this.componentSelector).jqxSwitchButton('val');
                }
            },
            _checked: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxSwitchButton('checked', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxSwitchButton('checked');
                }
            },
            _disabled: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxSwitchButton('disabled', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxSwitchButton('disabled');
                }
            },
            _height: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxSwitchButton('height', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxSwitchButton('height');
                }
            },
            _orientation: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxSwitchButton('orientation', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxSwitchButton('orientation');
                }
            },
            _onLabel: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxSwitchButton('onLabel', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxSwitchButton('onLabel');
                }
            },
            _offLabel: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxSwitchButton('offLabel', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxSwitchButton('offLabel');
                }
            },
            _thumbSize: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxSwitchButton('thumbSize', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxSwitchButton('thumbSize');
                }
            },
            _rtl: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxSwitchButton('rtl', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxSwitchButton('rtl');
                }
            },
            _width: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxSwitchButton('width', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxSwitchButton('width');
                }
            },
            __createComponent__: function (options) {
                let widgetOptions;
                options ? widgetOptions = options : widgetOptions = this.__manageProps__();
                JQXLite(this.componentSelector).jqxSwitchButton(widgetOptions);
                this.__extendProps__();
                this.__wireEvents__();
            },
            __manageProps__: function () {
                const widgetProps = ['checked','disabled','height','orientation','onLabel','offLabel','thumbSize','rtl','width'];
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

                Object.defineProperty(that, 'checked', {
                    get: function() {
                        return that._checked();
                    },
                    set: function(newValue) {
                        that._checked(newValue);
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
                Object.defineProperty(that, 'onLabel', {
                    get: function() {
                        return that._onLabel();
                    },
                    set: function(newValue) {
                        that._onLabel(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'offLabel', {
                    get: function() {
                        return that._offLabel();
                    },
                    set: function(newValue) {
                        that._offLabel(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'thumbSize', {
                    get: function() {
                        return that._thumbSize();
                    },
                    set: function(newValue) {
                        that._thumbSize(newValue);
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
                const value = JQXLite(this.componentSelector).jqxSwitchButton('val');
                this.$emit('input', value);
            },
            __wireEvents__: function () {
                const that = this;

                JQXLite(this.componentSelector).on('checked', function (event) { that.$emit('checked', event); });
                JQXLite(this.componentSelector).on('change', function (event) { that.$emit('change', event); that.__twoWayDataBinding__(); });
                JQXLite(this.componentSelector).on('unchecked', function (event) { that.$emit('unchecked', event); });
            }
        }
    }
</script>
