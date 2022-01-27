<template>
    <div v-bind:id="id">
        <slot></slot>
    </div>
</template>

<script>
    import '../jqwidgets/jqxcore.js';
    import '../jqwidgets/jqxbuttons.js';
    import '../jqwidgets/jqxwindow.js';
    import '../jqwidgets/jqxribbon.js';
    import '../jqwidgets/jqxlayout.js';
    import '../jqwidgets/jqxmenu.js';
    import '../jqwidgets/jqxscrollbar.js';
    import '../jqwidgets/jqxdockinglayout.js';

    export default {
        props: {
            contextMenu: Boolean,
            height: [Number, String],
            layout: Array,
            minGroupHeight: Number,
            minGroupWidth: Number,
            resizable: Boolean,
            rtl: Boolean,
            theme: String,
            width: [Number, String],
            autoCreate: {
                default: true,
                type: Boolean
            }
        },
        created: function () {
            this.id = 'jqxDockingLayout' + JQXLite.generateID();
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
                JQXLite(this.componentSelector).jqxDockingLayout(options);
            },
            getOptions: function () {
                const usedProps = Object.keys(this.__manageProps__());
                const resultToReturn = {};
                for (let i = 0; i < usedProps.length; i++) {
                    resultToReturn[usedProps[i]] = JQXLite(this.componentSelector).jqxDockingLayout(usedProps[i]);
                }
                return resultToReturn;
            },
            addFloatGroup: function(width, height, position, panelType, title, content, initContent) {
                JQXLite(this.componentSelector).jqxDockingLayout('addFloatGroup', width, height, position, panelType, title, content, initContent);  
            },
            destroy: function() {
                JQXLite(this.componentSelector).jqxDockingLayout('destroy');  
            },
            loadLayout: function(layout) {
                JQXLite(this.componentSelector).jqxDockingLayout('loadLayout', layout);  
            },
            refresh: function() {
                JQXLite(this.componentSelector).jqxDockingLayout('refresh');  
            },
            render: function() {
                JQXLite(this.componentSelector).jqxDockingLayout('render');  
            },
            saveLayout: function() {
                return JQXLite(this.componentSelector).jqxDockingLayout('saveLayout');  
            },
            _contextMenu: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxDockingLayout('contextMenu', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxDockingLayout('contextMenu');
                }
            },
            _height: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxDockingLayout('height', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxDockingLayout('height');
                }
            },
            _layout: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxDockingLayout('layout', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxDockingLayout('layout');
                }
            },
            _minGroupHeight: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxDockingLayout('minGroupHeight', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxDockingLayout('minGroupHeight');
                }
            },
            _minGroupWidth: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxDockingLayout('minGroupWidth', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxDockingLayout('minGroupWidth');
                }
            },
            _resizable: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxDockingLayout('resizable', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxDockingLayout('resizable');
                }
            },
            _rtl: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxDockingLayout('rtl', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxDockingLayout('rtl');
                }
            },
            _theme: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxDockingLayout('theme', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxDockingLayout('theme');
                }
            },
            _width: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxDockingLayout('width', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxDockingLayout('width');
                }
            },
            __createComponent__: function (options) {
                let widgetOptions;
                options ? widgetOptions = options : widgetOptions = this.__manageProps__();
                JQXLite(this.componentSelector).jqxDockingLayout(widgetOptions);
                this.__extendProps__();
                this.__wireEvents__();
            },
            __manageProps__: function () {
                const widgetProps = ['contextMenu','height','layout','minGroupHeight','minGroupWidth','resizable','rtl','theme','width'];
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

                Object.defineProperty(that, 'contextMenu', {
                    get: function() {
                        return that._contextMenu();
                    },
                    set: function(newValue) {
                        that._contextMenu(newValue);
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
                Object.defineProperty(that, 'minGroupHeight', {
                    get: function() {
                        return that._minGroupHeight();
                    },
                    set: function(newValue) {
                        that._minGroupHeight(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'minGroupWidth', {
                    get: function() {
                        return that._minGroupWidth();
                    },
                    set: function(newValue) {
                        that._minGroupWidth(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'resizable', {
                    get: function() {
                        return that._resizable();
                    },
                    set: function(newValue) {
                        that._resizable(newValue);
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

                JQXLite(this.componentSelector).on('dock', function (event) { that.$emit('dock', event); });
                JQXLite(this.componentSelector).on('floatGroupClosed', function (event) { that.$emit('floatGroupClosed', event); });
                JQXLite(this.componentSelector).on('float', function (event) { that.$emit('float', event); });
                JQXLite(this.componentSelector).on('pin', function (event) { that.$emit('pin', event); });
                JQXLite(this.componentSelector).on('resize', function (event) { that.$emit('resize', event); });
                JQXLite(this.componentSelector).on('unpin', function (event) { that.$emit('unpin', event); });
            }
        }
    }
</script>
