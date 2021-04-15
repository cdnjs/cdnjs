<template>
    <div v-bind:id="id">
        <slot></slot>
    </div>
</template>

<script>
    import '../jqwidgets/jqxcore.js';
    import '../jqwidgets/jqxbuttons.js';
    import '../jqwidgets/jqxbuttongroup.js';

    export default {
        props: {
            disabled: Boolean,
            enableHover: Boolean,
            mode: String,
            rtl: Boolean,
            template: String,
            theme: String,
            autoCreate: {
                default: true,
                type: Boolean
            }
        },
        created: function () {
            this.id = 'jqxButtonGroup' + JQXLite.generateID();
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
                JQXLite(this.componentSelector).jqxButtonGroup(options);
            },
            getOptions: function () {
                const usedProps = Object.keys(this.__manageProps__());
                const resultToReturn = {};
                for (let i = 0; i < usedProps.length; i++) {
                    resultToReturn[usedProps[i]] = JQXLite(this.componentSelector).jqxButtonGroup(usedProps[i]);
                }
                return resultToReturn;
            },
            disableAt: function(index) {
                JQXLite(this.componentSelector).jqxButtonGroup('disableAt', index);  
            },
            disable: function() {
                JQXLite(this.componentSelector).jqxButtonGroup('disable');  
            },
            destroy: function() {
                JQXLite(this.componentSelector).jqxButtonGroup('destroy');  
            },
            enable: function() {
                JQXLite(this.componentSelector).jqxButtonGroup('enable');  
            },
            enableAt: function(index) {
                JQXLite(this.componentSelector).jqxButtonGroup('enableAt', index);  
            },
            getSelection: function() {
                return JQXLite(this.componentSelector).jqxButtonGroup('getSelection');  
            },
            render: function() {
                JQXLite(this.componentSelector).jqxButtonGroup('render');  
            },
            setSelection: function(index) {
                JQXLite(this.componentSelector).jqxButtonGroup('setSelection', index);  
            },
            _disabled: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxButtonGroup('disabled', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxButtonGroup('disabled');
                }
            },
            _enableHover: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxButtonGroup('enableHover', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxButtonGroup('enableHover');
                }
            },
            _mode: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxButtonGroup('mode', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxButtonGroup('mode');
                }
            },
            _rtl: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxButtonGroup('rtl', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxButtonGroup('rtl');
                }
            },
            _template: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxButtonGroup('template', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxButtonGroup('template');
                }
            },
            _theme: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxButtonGroup('theme', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxButtonGroup('theme');
                }
            },
            __createComponent__: function (options) {
                let widgetOptions;
                options ? widgetOptions = options : widgetOptions = this.__manageProps__();
                JQXLite(this.componentSelector).jqxButtonGroup(widgetOptions);
                this.__extendProps__();
                this.__wireEvents__();
            },
            __manageProps__: function () {
                const widgetProps = ['disabled','enableHover','mode','rtl','template','theme'];
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
                Object.defineProperty(that, 'mode', {
                    get: function() {
                        return that._mode();
                    },
                    set: function(newValue) {
                        that._mode(newValue);
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
            },
            __wireEvents__: function () {
                const that = this;

                JQXLite(this.componentSelector).on('buttonclick', function (event) { that.$emit('buttonclick', event); });
                JQXLite(this.componentSelector).on('selected', function (event) { that.$emit('selected', event); });
                JQXLite(this.componentSelector).on('unselected', function (event) { that.$emit('unselected', event); });
            }
        }
    }
</script>
