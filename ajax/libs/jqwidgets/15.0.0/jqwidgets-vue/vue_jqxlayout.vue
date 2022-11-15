<template>
    <div v-bind:id="id">
        <slot></slot>
    </div>
</template>

<script>
    import '../jqwidgets/jqxcore.js';
    import '../jqwidgets/jqxbuttons.js';
    import '../jqwidgets/jqxribbon.js';
    import '../jqwidgets/jqxmenu.js';
    import '../jqwidgets/jqxlayout.js';

    export default {
        props: {
            contextMenu: Boolean,
            height: [String, Number],
            layout: Array,
            minGroupHeight: Number,
            minGroupWidth: Number,
            resizable: Boolean,
            rtl: Boolean,
            theme: String,
            width: [String, Number],
            autoCreate: {
                default: true,
                type: Boolean
            }
        },
        created: function () {
            this.id = 'jqxLayout' + JQXLite.generateID();
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
                JQXLite(this.componentSelector).jqxLayout(options);
            },
            getOptions: function () {
                const usedProps = Object.keys(this.__manageProps__());
                const resultToReturn = {};
                for (let i = 0; i < usedProps.length; i++) {
                    resultToReturn[usedProps[i]] = JQXLite(this.componentSelector).jqxLayout(usedProps[i]);
                }
                return resultToReturn;
            },
            destroy: function() {
                JQXLite(this.componentSelector).jqxLayout('destroy');  
            },
            loadLayout: function(Layout) {
                JQXLite(this.componentSelector).jqxLayout('loadLayout', Layout);  
            },
            refresh: function() {
                JQXLite(this.componentSelector).jqxLayout('refresh');  
            },
            render: function() {
                JQXLite(this.componentSelector).jqxLayout('render');  
            },
            saveLayout: function() {
                return JQXLite(this.componentSelector).jqxLayout('saveLayout');  
            },
            _contextMenu: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxLayout('contextMenu', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxLayout('contextMenu');
                }
            },
            _height: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxLayout('height', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxLayout('height');
                }
            },
            _layout: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxLayout('layout', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxLayout('layout');
                }
            },
            _minGroupHeight: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxLayout('minGroupHeight', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxLayout('minGroupHeight');
                }
            },
            _minGroupWidth: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxLayout('minGroupWidth', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxLayout('minGroupWidth');
                }
            },
            _resizable: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxLayout('resizable', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxLayout('resizable');
                }
            },
            _rtl: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxLayout('rtl', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxLayout('rtl');
                }
            },
            _theme: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxLayout('theme', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxLayout('theme');
                }
            },
            _width: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxLayout('width', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxLayout('width');
                }
            },
            __createComponent__: function (options) {
                let widgetOptions;
                options ? widgetOptions = options : widgetOptions = this.__manageProps__();
                JQXLite(this.componentSelector).jqxLayout(widgetOptions);
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

                JQXLite(this.componentSelector).on('pin', function (event) { that.$emit('pin', event); });
                JQXLite(this.componentSelector).on('resize', function (event) { that.$emit('resize', event); });
                JQXLite(this.componentSelector).on('unpin', function (event) { that.$emit('unpin', event); });
            }
        }
    }
</script>
