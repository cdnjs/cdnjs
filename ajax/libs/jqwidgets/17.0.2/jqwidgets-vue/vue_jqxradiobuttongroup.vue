<template>
    <div v-bind:id="id">
        <slot></slot>
    </div>
</template>

<script>
    import '../jqwidgets/jqxcore.js';

    export default {
        props: {
            change: {
                default: null,
                type: Boolean
            },
            disabled: {
                default: false,
                type: Boolean
            },
            items: [],
            value: [],
            layout: String,
            labelPosition: String,
            rtl: {
                default: false,
                type: Boolean
            },
            theme: String,
            autoCreate: {
                default: true,
                type: Boolean
            }
        },
        created: function () {
            this.id = 'jqxRadioButtonGroup' + JQXLite.generateID();
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
                JQXLite(this.componentSelector).jqxRadioButtonGroup(options);
            },
            getOptions: function () {
                const usedProps = Object.keys(this.__manageProps__());
                const resultToReturn = {};
                for (let i = 0; i < usedProps.length; i++) {
                    resultToReturn[usedProps[i]] = JQXLite(this.componentSelector).jqxRadioButtonGroup(usedProps[i]);
                }
                return resultToReturn;
            },
            getValue: function() {
                return JQXLite(this.componentSelector).jqxRadioButtonGroup('getValue');  
            },
            getValueAt: function(index) {
                return JQXLite(this.componentSelector).jqxRadioButtonGroup('getValueAt', index);  
            },
            enableAt: function(index) {
                JQXLite(this.componentSelector).jqxRadioButtonGroup('enableAt', index);  
            },
            disableAt: function(index) {
                JQXLite(this.componentSelector).jqxRadioButtonGroup('disableAt', index);  
            },
            checkAt: function(index) {
                JQXLite(this.componentSelector).jqxRadioButtonGroup('checkAt', index);  
            },
            uncheckAt: function(index) {
                JQXLite(this.componentSelector).jqxRadioButtonGroup('uncheckAt', index);  
            },
            uncheckAll: function() {
                JQXLite(this.componentSelector).jqxRadioButtonGroup('uncheckAll');  
            },
            checkValue: function(value) {
                JQXLite(this.componentSelector).jqxRadioButtonGroup('checkValue', value);  
            },
            uncheckValue: function(value) {
                JQXLite(this.componentSelector).jqxRadioButtonGroup('uncheckValue', value);  
            },
            disable: function() {
                JQXLite(this.componentSelector).jqxRadioButtonGroup('disable');  
            },
            destroy: function() {
                JQXLite(this.componentSelector).jqxRadioButtonGroup('destroy');  
            },
            enable: function() {
                JQXLite(this.componentSelector).jqxRadioButtonGroup('enable');  
            },
            render: function() {
                JQXLite(this.componentSelector).jqxRadioButtonGroup('render');  
            },
            val: function(value) {
                if (value !== undefined) {
                    JQXLite(this.componentSelector).jqxRadioButtonGroup('val',  value)
                } else {
                    return JQXLite(this.componentSelector).jqxRadioButtonGroup('val');
                }
            },
            _change: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxRadioButtonGroup('change', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxRadioButtonGroup('change');
                }
            },
            _disabled: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxRadioButtonGroup('disabled', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxRadioButtonGroup('disabled');
                }
            },
            _items: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxRadioButtonGroup('items', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxRadioButtonGroup('items');
                }
            },
            _value: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxRadioButtonGroup('value', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxRadioButtonGroup('value');
                }
            },
            _layout: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxRadioButtonGroup('layout', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxRadioButtonGroup('layout');
                }
            },
            _labelPosition: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxRadioButtonGroup('labelPosition', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxRadioButtonGroup('labelPosition');
                }
            },
            _rtl: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxRadioButtonGroup('rtl', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxRadioButtonGroup('rtl');
                }
            },
            _theme: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxRadioButtonGroup('theme', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxRadioButtonGroup('theme');
                }
            },
            __createComponent__: function (options) {
                let widgetOptions;
                options ? widgetOptions = options : widgetOptions = this.__manageProps__();
                JQXLite(this.componentSelector).jqxRadioButtonGroup(widgetOptions);
                this.__extendProps__();
                this.__wireEvents__();
            },
            __manageProps__: function () {
                const widgetProps = ['change','disabled','items','value','layout','labelPosition','rtl','theme'];
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

                Object.defineProperty(that, 'change', {
                    get: function() {
                        return that._change();
                    },
                    set: function(newValue) {
                        that._change(newValue);
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
                Object.defineProperty(that, 'items', {
                    get: function() {
                        return that._items();
                    },
                    set: function(newValue) {
                        that._items(newValue);
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
                Object.defineProperty(that, 'labelPosition', {
                    get: function() {
                        return that._labelPosition();
                    },
                    set: function(newValue) {
                        that._labelPosition(newValue);
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
            },
            __wireEvents__: function () {
                const that = this;

            }
        }
    }
</script>
