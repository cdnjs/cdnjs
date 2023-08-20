<template>
    <div v-bind:id="id">
        <slot></slot>
    </div>
</template>

<script>
    import '../jqwidgets/jqxcore.js';
    import '../jqwidgets/jqxdata.js';
    import '../jqwidgets/jqxinput.js';
    import '../jqwidgets/jqxpasswordinput.js';
    import '../jqwidgets/jqxnumberinput.js';
    import '../jqwidgets/jqxradiobutton.js';
    import '../jqwidgets/jqxcheckbox.js';
    import '../jqwidgets/jqxbuttons.js';
    import '../jqwidgets/jqxscrollbar.js';
    import '../jqwidgets/jqxlistbox.js';
    import '../jqwidgets/jqxdropdownlist.js';
    import '../jqwidgets/jqxcombobox.js';
    import '../jqwidgets/jqxmaskedinput.js';
    import '../jqwidgets/globalization/globalize.js'
    import '../jqwidgets/jqxcalendar.js';
    import '../jqwidgets/jqxdatetimeinput.js';
    import '../jqwidgets/jqxform.js';

    export default {
        props: {
            padding: Object,
            backgroundColor: String,
            borderColor: String,
            value: Object,
            template: Array,
            autoCreate: {
                default: true,
                type: Boolean
            }
        },
        created: function () {
            this.id = 'jqxForm' + JQXLite.generateID();
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
                JQXLite(this.componentSelector).jqxForm(options);
            },
            getOptions: function () {
                const usedProps = Object.keys(this.__manageProps__());
                const resultToReturn = {};
                for (let i = 0; i < usedProps.length; i++) {
                    resultToReturn[usedProps[i]] = JQXLite(this.componentSelector).jqxForm(usedProps[i]);
                }
                return resultToReturn;
            },
            getInstance: function() {
                return JQXLite(this.componentSelector).jqxForm('getInstance');  
            },
            refresh: function() {
                JQXLite(this.componentSelector).jqxForm('refresh');  
            },
            destroy: function() {
                JQXLite(this.componentSelector).jqxForm('destroy');  
            },
            hideComponent: function(name) {
                JQXLite(this.componentSelector).jqxForm('hideComponent', name);  
            },
            showComponent: function(name) {
                JQXLite(this.componentSelector).jqxForm('showComponent', name);  
            },
            val: function(value) {
                if (value !== undefined) {
                    JQXLite(this.componentSelector).jqxForm('val',  value)
                } else {
                    return JQXLite(this.componentSelector).jqxForm('val');
                }
            },
            submit: function(action, target, method) {
                return JQXLite(this.componentSelector).jqxForm('submit', action, target, method);  
            },
            getComponentByName: function(name) {
                return JQXLite(this.componentSelector).jqxForm('getComponentByName', name);  
            },
            _padding: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxForm('padding', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxForm('padding');
                }
            },
            _backgroundColor: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxForm('backgroundColor', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxForm('backgroundColor');
                }
            },
            _borderColor: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxForm('borderColor', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxForm('borderColor');
                }
            },
            _value: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxForm('value', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxForm('value');
                }
            },
            _template: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxForm('template', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxForm('template');
                }
            },
            __createComponent__: function (options) {
                let widgetOptions;
                options ? widgetOptions = options : widgetOptions = this.__manageProps__();
                JQXLite(this.componentSelector).jqxForm(widgetOptions);
                this.__extendProps__();
                this.__wireEvents__();
            },
            __manageProps__: function () {
                const widgetProps = ['padding','backgroundColor','borderColor','value','template'];
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

                Object.defineProperty(that, 'padding', {
                    get: function() {
                        return that._padding();
                    },
                    set: function(newValue) {
                        that._padding(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'backgroundColor', {
                    get: function() {
                        return that._backgroundColor();
                    },
                    set: function(newValue) {
                        that._backgroundColor(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'borderColor', {
                    get: function() {
                        return that._borderColor();
                    },
                    set: function(newValue) {
                        that._borderColor(newValue);
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
            },
            __wireEvents__: function () {
                const that = this;

                JQXLite(this.componentSelector).on('formDataChange', function (event) { that.$emit('formDataChange', event); });
                JQXLite(this.componentSelector).on('buttonClick', function (event) { that.$emit('buttonClick', event); });
            }
        }
    }
</script>
