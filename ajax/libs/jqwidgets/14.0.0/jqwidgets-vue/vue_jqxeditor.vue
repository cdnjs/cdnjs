<template>
        <textarea v-bind:id="id"></textarea>
</template>

<script>
    import '../jqwidgets/jqxcore.js';
    import '../jqwidgets/jqxdata.js';
    import '../jqwidgets/jqxbuttons.js';
    import '../jqwidgets/jqxscrollbar.js';
    import '../jqwidgets/jqxlistbox.js';
    import '../jqwidgets/jqxdropdownlist.js';
    import '../jqwidgets/jqxdropdownbutton.js';
    import '../jqwidgets/jqxwindow.js';
    import '../jqwidgets/jqxeditor.js';
    import '../jqwidgets/jqxcheckbox.js';
    import '../jqwidgets/jqxtooltip.js';
    import '../jqwidgets/jqxcolorpicker.js';

    export default {
        props: {
            createCommand: Function,
            disabled: Boolean,
            editable: Boolean,
            height: [String, Number],
            lineBreak: String,
            localization: Object,
            pasteMode: String,
            rtl: Boolean,
            stylesheets: Array,
            theme: String,
            toolbarPosition: String,
            tools: String,
            width: [Number, String],
            autoCreate: {
                default: true,
                type: Boolean
            }
        },
        created: function () {
            this.id = 'jqxEditor' + JQXLite.generateID();
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
                JQXLite(this.componentSelector).jqxEditor(options);
            },
            getOptions: function () {
                const usedProps = Object.keys(this.__manageProps__());
                const resultToReturn = {};
                for (let i = 0; i < usedProps.length; i++) {
                    resultToReturn[usedProps[i]] = JQXLite(this.componentSelector).jqxEditor(usedProps[i]);
                }
                return resultToReturn;
            },
            destroy: function() {
                JQXLite(this.componentSelector).jqxEditor('destroy');  
            },
            focus: function() {
                JQXLite(this.componentSelector).jqxEditor('focus');  
            },
            print: function() {
                JQXLite(this.componentSelector).jqxEditor('print');  
            },
            setMode: function(mode) {
                JQXLite(this.componentSelector).jqxEditor('setMode', mode);  
            },
            val: function(value) {
                if (value !== undefined) {
                    JQXLite(this.componentSelector).jqxEditor('val',  value)
                } else {
                    return JQXLite(this.componentSelector).jqxEditor('val');
                }
            },
            _createCommand: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxEditor('createCommand', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxEditor('createCommand');
                }
            },
            _disabled: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxEditor('disabled', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxEditor('disabled');
                }
            },
            _editable: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxEditor('editable', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxEditor('editable');
                }
            },
            _height: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxEditor('height', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxEditor('height');
                }
            },
            _lineBreak: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxEditor('lineBreak', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxEditor('lineBreak');
                }
            },
            _localization: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxEditor('localization', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxEditor('localization');
                }
            },
            _pasteMode: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxEditor('pasteMode', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxEditor('pasteMode');
                }
            },
            _rtl: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxEditor('rtl', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxEditor('rtl');
                }
            },
            _stylesheets: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxEditor('stylesheets', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxEditor('stylesheets');
                }
            },
            _theme: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxEditor('theme', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxEditor('theme');
                }
            },
            _toolbarPosition: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxEditor('toolbarPosition', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxEditor('toolbarPosition');
                }
            },
            _tools: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxEditor('tools', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxEditor('tools');
                }
            },
            _width: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxEditor('width', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxEditor('width');
                }
            },
            __createComponent__: function (options) {
                let widgetOptions;
                options ? widgetOptions = options : widgetOptions = this.__manageProps__();
                JQXLite(this.componentSelector).jqxEditor(widgetOptions);
                if (this.$slots.default) {
                    JQXLite(this.componentSelector).jqxEditor('val', this.$slots.default[0].text);
                }
                this.__extendProps__();
                this.__wireEvents__();
            },
            __manageProps__: function () {
                const widgetProps = ['createCommand','disabled','editable','height','lineBreak','localization','pasteMode','rtl','stylesheets','theme','toolbarPosition','tools','width'];
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

                Object.defineProperty(that, 'createCommand', {
                    get: function() {
                        return that._createCommand();
                    },
                    set: function(newValue) {
                        that._createCommand(newValue);
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
                Object.defineProperty(that, 'editable', {
                    get: function() {
                        return that._editable();
                    },
                    set: function(newValue) {
                        that._editable(newValue);
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
                Object.defineProperty(that, 'lineBreak', {
                    get: function() {
                        return that._lineBreak();
                    },
                    set: function(newValue) {
                        that._lineBreak(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'localization', {
                    get: function() {
                        return that._localization();
                    },
                    set: function(newValue) {
                        that._localization(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'pasteMode', {
                    get: function() {
                        return that._pasteMode();
                    },
                    set: function(newValue) {
                        that._pasteMode(newValue);
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
                Object.defineProperty(that, 'stylesheets', {
                    get: function() {
                        return that._stylesheets();
                    },
                    set: function(newValue) {
                        that._stylesheets(newValue);
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
                Object.defineProperty(that, 'toolbarPosition', {
                    get: function() {
                        return that._toolbarPosition();
                    },
                    set: function(newValue) {
                        that._toolbarPosition(newValue);
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

                JQXLite(this.componentSelector).on('change', function (event) { that.$emit('change', event); });
            }
        }
    }
</script>
