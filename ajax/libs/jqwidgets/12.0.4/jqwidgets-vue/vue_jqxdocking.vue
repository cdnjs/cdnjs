<template>
    <div v-bind:id="id">
        <slot></slot>
    </div>
</template>

<script>
    import '../jqwidgets/jqxcore.js';
    import '../jqwidgets/jqxbuttons.js';
    import '../jqwidgets/jqxwindow.js';
    import '../jqwidgets/jqxdocking.js';

    export default {
        props: {
            cookies: Boolean,
            cookieOptions: Object,
            disabled: Boolean,
            floatingWindowOpacity: Number,
            height: [Number, String],
            keyboardNavigation: Boolean,
            mode: String,
            orientation: String,
            rtl: Boolean,
            theme: String,
            width: [Number, String],
            windowsMode: Object,
            windowsOffset: Number,
            autoCreate: {
                default: true,
                type: Boolean
            }
        },
        created: function () {
            this.id = 'jqxDocking' + JQXLite.generateID();
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
                JQXLite(this.componentSelector).jqxDocking(options);
            },
            getOptions: function () {
                const usedProps = Object.keys(this.__manageProps__());
                const resultToReturn = {};
                for (let i = 0; i < usedProps.length; i++) {
                    resultToReturn[usedProps[i]] = JQXLite(this.componentSelector).jqxDocking(usedProps[i]);
                }
                return resultToReturn;
            },
            addWindow: function(windowId, mode, panel, position) {
                JQXLite(this.componentSelector).jqxDocking('addWindow', windowId, mode, panel, position);  
            },
            closeWindow: function(windowId) {
                JQXLite(this.componentSelector).jqxDocking('closeWindow', windowId);  
            },
            collapseWindow: function(windowId) {
                JQXLite(this.componentSelector).jqxDocking('collapseWindow', windowId);  
            },
            destroy: function() {
                JQXLite(this.componentSelector).jqxDocking('destroy');  
            },
            disableWindowResize: function(windowId) {
                JQXLite(this.componentSelector).jqxDocking('disableWindowResize', windowId);  
            },
            disable: function() {
                JQXLite(this.componentSelector).jqxDocking('disable');  
            },
            exportLayout: function() {
                return JQXLite(this.componentSelector).jqxDocking('exportLayout');  
            },
            enable: function() {
                JQXLite(this.componentSelector).jqxDocking('enable');  
            },
            expandWindow: function(windowId) {
                JQXLite(this.componentSelector).jqxDocking('expandWindow', windowId);  
            },
            enableWindowResize: function(windowId) {
                JQXLite(this.componentSelector).jqxDocking('enableWindowResize', windowId);  
            },
            focus: function() {
                JQXLite(this.componentSelector).jqxDocking('focus');  
            },
            hideAllCloseButtons: function() {
                JQXLite(this.componentSelector).jqxDocking('hideAllCloseButtons');  
            },
            hideAllCollapseButtons: function() {
                JQXLite(this.componentSelector).jqxDocking('hideAllCollapseButtons');  
            },
            hideCollapseButton: function(windowId) {
                JQXLite(this.componentSelector).jqxDocking('hideCollapseButton', windowId);  
            },
            hideCloseButton: function(windowId) {
                JQXLite(this.componentSelector).jqxDocking('hideCloseButton', windowId);  
            },
            importLayout: function(Json) {
                JQXLite(this.componentSelector).jqxDocking('importLayout', Json);  
            },
            move: function(windowId, panel, position) {
                JQXLite(this.componentSelector).jqxDocking('move', windowId, panel, position);  
            },
            pinWindow: function(windowId) {
                JQXLite(this.componentSelector).jqxDocking('pinWindow', windowId);  
            },
            setWindowMode: function(windowId, mode) {
                JQXLite(this.componentSelector).jqxDocking('setWindowMode', windowId, mode);  
            },
            showCloseButton: function(windowId) {
                JQXLite(this.componentSelector).jqxDocking('showCloseButton', windowId);  
            },
            showCollapseButton: function(windowId) {
                JQXLite(this.componentSelector).jqxDocking('showCollapseButton', windowId);  
            },
            setWindowPosition: function(windowId, top, left) {
                JQXLite(this.componentSelector).jqxDocking('setWindowPosition', windowId, top, left);  
            },
            showAllCloseButtons: function() {
                JQXLite(this.componentSelector).jqxDocking('showAllCloseButtons');  
            },
            showAllCollapseButtons: function() {
                JQXLite(this.componentSelector).jqxDocking('showAllCollapseButtons');  
            },
            unpinWindow: function(windowId) {
                JQXLite(this.componentSelector).jqxDocking('unpinWindow', windowId);  
            },
            _cookies: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxDocking('cookies', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxDocking('cookies');
                }
            },
            _cookieOptions: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxDocking('cookieOptions', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxDocking('cookieOptions');
                }
            },
            _disabled: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxDocking('disabled', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxDocking('disabled');
                }
            },
            _floatingWindowOpacity: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxDocking('floatingWindowOpacity', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxDocking('floatingWindowOpacity');
                }
            },
            _height: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxDocking('height', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxDocking('height');
                }
            },
            _keyboardNavigation: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxDocking('keyboardNavigation', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxDocking('keyboardNavigation');
                }
            },
            _mode: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxDocking('mode', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxDocking('mode');
                }
            },
            _orientation: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxDocking('orientation', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxDocking('orientation');
                }
            },
            _rtl: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxDocking('rtl', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxDocking('rtl');
                }
            },
            _theme: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxDocking('theme', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxDocking('theme');
                }
            },
            _width: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxDocking('width', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxDocking('width');
                }
            },
            _windowsMode: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxDocking('windowsMode', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxDocking('windowsMode');
                }
            },
            _windowsOffset: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxDocking('windowsOffset', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxDocking('windowsOffset');
                }
            },
            __createComponent__: function (options) {
                let widgetOptions;
                options ? widgetOptions = options : widgetOptions = this.__manageProps__();
                JQXLite(this.componentSelector).jqxDocking(widgetOptions);
                this.__extendProps__();
                this.__wireEvents__();
            },
            __manageProps__: function () {
                const widgetProps = ['cookies','cookieOptions','disabled','floatingWindowOpacity','height','keyboardNavigation','mode','orientation','rtl','theme','width','windowsMode','windowsOffset'];
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

                Object.defineProperty(that, 'cookies', {
                    get: function() {
                        return that._cookies();
                    },
                    set: function(newValue) {
                        that._cookies(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'cookieOptions', {
                    get: function() {
                        return that._cookieOptions();
                    },
                    set: function(newValue) {
                        that._cookieOptions(newValue);
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
                Object.defineProperty(that, 'floatingWindowOpacity', {
                    get: function() {
                        return that._floatingWindowOpacity();
                    },
                    set: function(newValue) {
                        that._floatingWindowOpacity(newValue);
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
                Object.defineProperty(that, 'keyboardNavigation', {
                    get: function() {
                        return that._keyboardNavigation();
                    },
                    set: function(newValue) {
                        that._keyboardNavigation(newValue);
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
                Object.defineProperty(that, 'windowsMode', {
                    get: function() {
                        return that._windowsMode();
                    },
                    set: function(newValue) {
                        that._windowsMode(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'windowsOffset', {
                    get: function() {
                        return that._windowsOffset();
                    },
                    set: function(newValue) {
                        that._windowsOffset(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
            },
            __wireEvents__: function () {
                const that = this;

                JQXLite(this.componentSelector).on('dragStart', function (event) { that.$emit('dragStart', event); });
                JQXLite(this.componentSelector).on('dragEnd', function (event) { that.$emit('dragEnd', event); });
            }
        }
    }
</script>
