<template>
    <div v-bind:id="id">
        <slot></slot>
    </div>
</template>

<script>
    import '../jqwidgets/jqxcore.js';
    import '../jqwidgets/jqxresponsivepanel.js';

    export default {
        props: {
            animationDirection: String,
            animationHideDelay: [String, Number],
            animationShowDelay: Number,
            animationType: String,
            autoClose: Boolean,
            collapseBreakpoint: Number,
            collapseWidth: Number,
            height: [Number, String],
            initContent: Function,
            theme: String,
            toggleButton: String,
            toggleButtonSize: Number,
            width: [Number, String],
            autoCreate: {
                default: true,
                type: Boolean
            }
        },
        created: function () {
            this.id = 'jqxResponsivePanel' + JQXLite.generateID();
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
                JQXLite(this.componentSelector).jqxResponsivePanel(options);
            },
            getOptions: function () {
                const usedProps = Object.keys(this.__manageProps__());
                const resultToReturn = {};
                for (let i = 0; i < usedProps.length; i++) {
                    resultToReturn[usedProps[i]] = JQXLite(this.componentSelector).jqxResponsivePanel(usedProps[i]);
                }
                return resultToReturn;
            },
            close: function() {
                JQXLite(this.componentSelector).jqxResponsivePanel('close');  
            },
            destroy: function() {
                JQXLite(this.componentSelector).jqxResponsivePanel('destroy');  
            },
            isCollapsed: function() {
                return JQXLite(this.componentSelector).jqxResponsivePanel('isCollapsed');  
            },
            isOpened: function() {
                return JQXLite(this.componentSelector).jqxResponsivePanel('isOpened');  
            },
            open: function() {
                JQXLite(this.componentSelector).jqxResponsivePanel('open');  
            },
            refresh: function() {
                JQXLite(this.componentSelector).jqxResponsivePanel('refresh');  
            },
            render: function() {
                JQXLite(this.componentSelector).jqxResponsivePanel('render');  
            },
            _animationDirection: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxResponsivePanel('animationDirection', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxResponsivePanel('animationDirection');
                }
            },
            _animationHideDelay: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxResponsivePanel('animationHideDelay', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxResponsivePanel('animationHideDelay');
                }
            },
            _animationShowDelay: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxResponsivePanel('animationShowDelay', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxResponsivePanel('animationShowDelay');
                }
            },
            _animationType: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxResponsivePanel('animationType', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxResponsivePanel('animationType');
                }
            },
            _autoClose: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxResponsivePanel('autoClose', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxResponsivePanel('autoClose');
                }
            },
            _collapseBreakpoint: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxResponsivePanel('collapseBreakpoint', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxResponsivePanel('collapseBreakpoint');
                }
            },
            _collapseWidth: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxResponsivePanel('collapseWidth', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxResponsivePanel('collapseWidth');
                }
            },
            _height: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxResponsivePanel('height', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxResponsivePanel('height');
                }
            },
            _initContent: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxResponsivePanel('initContent', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxResponsivePanel('initContent');
                }
            },
            _theme: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxResponsivePanel('theme', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxResponsivePanel('theme');
                }
            },
            _toggleButton: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxResponsivePanel('toggleButton', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxResponsivePanel('toggleButton');
                }
            },
            _toggleButtonSize: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxResponsivePanel('toggleButtonSize', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxResponsivePanel('toggleButtonSize');
                }
            },
            _width: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxResponsivePanel('width', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxResponsivePanel('width');
                }
            },
            __createComponent__: function (options) {
                let widgetOptions;
                options ? widgetOptions = options : widgetOptions = this.__manageProps__();
                JQXLite(this.componentSelector).jqxResponsivePanel(widgetOptions);
                this.__extendProps__();
                this.__wireEvents__();
            },
            __manageProps__: function () {
                const widgetProps = ['animationDirection','animationHideDelay','animationShowDelay','animationType','autoClose','collapseBreakpoint','collapseWidth','height','initContent','theme','toggleButton','toggleButtonSize','width'];
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

                Object.defineProperty(that, 'animationDirection', {
                    get: function() {
                        return that._animationDirection();
                    },
                    set: function(newValue) {
                        that._animationDirection(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'animationHideDelay', {
                    get: function() {
                        return that._animationHideDelay();
                    },
                    set: function(newValue) {
                        that._animationHideDelay(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'animationShowDelay', {
                    get: function() {
                        return that._animationShowDelay();
                    },
                    set: function(newValue) {
                        that._animationShowDelay(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'animationType', {
                    get: function() {
                        return that._animationType();
                    },
                    set: function(newValue) {
                        that._animationType(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'autoClose', {
                    get: function() {
                        return that._autoClose();
                    },
                    set: function(newValue) {
                        that._autoClose(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'collapseBreakpoint', {
                    get: function() {
                        return that._collapseBreakpoint();
                    },
                    set: function(newValue) {
                        that._collapseBreakpoint(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'collapseWidth', {
                    get: function() {
                        return that._collapseWidth();
                    },
                    set: function(newValue) {
                        that._collapseWidth(newValue);
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
                Object.defineProperty(that, 'initContent', {
                    get: function() {
                        return that._initContent();
                    },
                    set: function(newValue) {
                        that._initContent(newValue);
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
                Object.defineProperty(that, 'toggleButton', {
                    get: function() {
                        return that._toggleButton();
                    },
                    set: function(newValue) {
                        that._toggleButton(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'toggleButtonSize', {
                    get: function() {
                        return that._toggleButtonSize();
                    },
                    set: function(newValue) {
                        that._toggleButtonSize(newValue);
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
                JQXLite(this.componentSelector).on('collapse', function (event) { that.$emit('collapse', event); });
                JQXLite(this.componentSelector).on('expand', function (event) { that.$emit('expand', event); });
                JQXLite(this.componentSelector).on('open', function (event) { that.$emit('open', event); });
            }
        }
    }
</script>
