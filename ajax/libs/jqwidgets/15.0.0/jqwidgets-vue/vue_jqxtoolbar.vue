<template>
    <div v-bind:id="id">
        <slot></slot>
    </div>
</template>

<script>
    import '../jqwidgets/jqxcore.js';
    import '../jqwidgets/jqxbuttons.js';
    import '../jqwidgets/jqxscrollbar.js';
    import '../jqwidgets/jqxlistbox.js';
    import '../jqwidgets/jqxdropdownlist.js';
    import '../jqwidgets/jqxcombobox.js';
    import '../jqwidgets/jqxinput.js';
    import '../jqwidgets/jqxtoolbar.js';

    export default {
        props: {
            disabled: Boolean,
            height: [Number, String],
            initTools: Function,
            minimizeWidth: Number,
            minWidth: Number,
            maxWidth: Number,
            rtl: Boolean,
            tools: String,
            theme: String,
            width: [Number, String],
            autoCreate: {
                default: true,
                type: Boolean
            }
        },
        created: function () {
            this.id = 'jqxToolBar' + JQXLite.generateID();
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
                JQXLite(this.componentSelector).jqxToolBar(options);
            },
            getOptions: function () {
                const usedProps = Object.keys(this.__manageProps__());
                const resultToReturn = {};
                for (let i = 0; i < usedProps.length; i++) {
                    resultToReturn[usedProps[i]] = JQXLite(this.componentSelector).jqxToolBar(usedProps[i]);
                }
                return resultToReturn;
            },
            addTool: function(type, position, separator, menuToolIninitialization) {
                JQXLite(this.componentSelector).jqxToolBar('addTool', type, position, separator, menuToolIninitialization);  
            },
            disableTool: function(index, disable) {
                JQXLite(this.componentSelector).jqxToolBar('disableTool', index, disable);  
            },
            destroy: function() {
                JQXLite(this.componentSelector).jqxToolBar('destroy');  
            },
            destroyTool: function(index) {
                JQXLite(this.componentSelector).jqxToolBar('destroyTool', index);  
            },
            getTools: function() {
                return JQXLite(this.componentSelector).jqxToolBar('getTools');  
            },
            render: function() {
                JQXLite(this.componentSelector).jqxToolBar('render');  
            },
            refresh: function() {
                JQXLite(this.componentSelector).jqxToolBar('refresh');  
            },
            _disabled: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxToolBar('disabled', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxToolBar('disabled');
                }
            },
            _height: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxToolBar('height', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxToolBar('height');
                }
            },
            _initTools: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxToolBar('initTools', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxToolBar('initTools');
                }
            },
            _minimizeWidth: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxToolBar('minimizeWidth', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxToolBar('minimizeWidth');
                }
            },
            _minWidth: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxToolBar('minWidth', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxToolBar('minWidth');
                }
            },
            _maxWidth: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxToolBar('maxWidth', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxToolBar('maxWidth');
                }
            },
            _rtl: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxToolBar('rtl', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxToolBar('rtl');
                }
            },
            _tools: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxToolBar('tools', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxToolBar('tools');
                }
            },
            _theme: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxToolBar('theme', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxToolBar('theme');
                }
            },
            _width: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxToolBar('width', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxToolBar('width');
                }
            },
            __createComponent__: function (options) {
                let widgetOptions;
                options ? widgetOptions = options : widgetOptions = this.__manageProps__();
                JQXLite(this.componentSelector).jqxToolBar(widgetOptions);
                this.__extendProps__();
                this.__wireEvents__();
            },
            __manageProps__: function () {
                const widgetProps = ['disabled','height','initTools','minimizeWidth','minWidth','maxWidth','rtl','tools','theme','width'];
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
                Object.defineProperty(that, 'initTools', {
                    get: function() {
                        return that._initTools();
                    },
                    set: function(newValue) {
                        that._initTools(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'minimizeWidth', {
                    get: function() {
                        return that._minimizeWidth();
                    },
                    set: function(newValue) {
                        that._minimizeWidth(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'minWidth', {
                    get: function() {
                        return that._minWidth();
                    },
                    set: function(newValue) {
                        that._minWidth(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'maxWidth', {
                    get: function() {
                        return that._maxWidth();
                    },
                    set: function(newValue) {
                        that._maxWidth(newValue);
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
                Object.defineProperty(that, 'tools', {
                    get: function() {
                        return that._tools();
                    },
                    set: function(newValue) {
                        that._tools(newValue);
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

                JQXLite(this.componentSelector).on('close', function (event) { that.$emit('close', event); });
                JQXLite(this.componentSelector).on('open', function (event) { that.$emit('open', event); });
            }
        }
    }
</script>
