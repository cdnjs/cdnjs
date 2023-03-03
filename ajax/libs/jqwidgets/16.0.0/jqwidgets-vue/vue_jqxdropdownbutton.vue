<template>
    <div v-bind:id="id">
        <slot></slot>
    </div>
</template>

<script>
    import '../jqwidgets/jqxcore.js';
    import '../jqwidgets/jqxbuttons.js';
    import '../jqwidgets/jqxdropdownbutton.js';

    export default {
        props: {
            animationType: String,
            arrowSize: Number,
            autoOpen: Boolean,
            closeDelay: Number,
            disabled: Boolean,
            dropDownHorizontalAlignment: String,
            dropDownVerticalAlignment: String,
            dropDownWidth: [String, Number],
            enableBrowserBoundsDetection: Boolean,
            height: [Number, String],
            initContent: Function,
            openDelay: Number,
            popupZIndex: Number,
            rtl: Boolean,
            template: String,
            theme: String,
            width: [Number, String],
            autoCreate: {
                default: true,
                type: Boolean
            }
        },
        created: function () {
            this.id = 'jqxDropDownButton' + JQXLite.generateID();
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
                JQXLite(this.componentSelector).jqxDropDownButton(options);
            },
            getOptions: function () {
                const usedProps = Object.keys(this.__manageProps__());
                const resultToReturn = {};
                for (let i = 0; i < usedProps.length; i++) {
                    resultToReturn[usedProps[i]] = JQXLite(this.componentSelector).jqxDropDownButton(usedProps[i]);
                }
                return resultToReturn;
            },
            close: function() {
                JQXLite(this.componentSelector).jqxDropDownButton('close');  
            },
            destroy: function() {
                JQXLite(this.componentSelector).jqxDropDownButton('destroy');  
            },
            focus: function() {
                JQXLite(this.componentSelector).jqxDropDownButton('focus');  
            },
            getContent: function() {
                return JQXLite(this.componentSelector).jqxDropDownButton('getContent');  
            },
            isOpened: function() {
                return JQXLite(this.componentSelector).jqxDropDownButton('isOpened');  
            },
            open: function() {
                JQXLite(this.componentSelector).jqxDropDownButton('open');  
            },
            setContent: function(content) {
                JQXLite(this.componentSelector).jqxDropDownButton('setContent', content);  
            },
            _animationType: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxDropDownButton('animationType', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxDropDownButton('animationType');
                }
            },
            _arrowSize: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxDropDownButton('arrowSize', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxDropDownButton('arrowSize');
                }
            },
            _autoOpen: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxDropDownButton('autoOpen', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxDropDownButton('autoOpen');
                }
            },
            _closeDelay: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxDropDownButton('closeDelay', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxDropDownButton('closeDelay');
                }
            },
            _disabled: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxDropDownButton('disabled', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxDropDownButton('disabled');
                }
            },
            _dropDownHorizontalAlignment: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxDropDownButton('dropDownHorizontalAlignment', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxDropDownButton('dropDownHorizontalAlignment');
                }
            },
            _dropDownVerticalAlignment: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxDropDownButton('dropDownVerticalAlignment', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxDropDownButton('dropDownVerticalAlignment');
                }
            },
            _dropDownWidth: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxDropDownButton('dropDownWidth', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxDropDownButton('dropDownWidth');
                }
            },
            _enableBrowserBoundsDetection: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxDropDownButton('enableBrowserBoundsDetection', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxDropDownButton('enableBrowserBoundsDetection');
                }
            },
            _height: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxDropDownButton('height', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxDropDownButton('height');
                }
            },
            _initContent: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxDropDownButton('initContent', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxDropDownButton('initContent');
                }
            },
            _openDelay: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxDropDownButton('openDelay', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxDropDownButton('openDelay');
                }
            },
            _popupZIndex: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxDropDownButton('popupZIndex', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxDropDownButton('popupZIndex');
                }
            },
            _rtl: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxDropDownButton('rtl', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxDropDownButton('rtl');
                }
            },
            _template: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxDropDownButton('template', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxDropDownButton('template');
                }
            },
            _theme: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxDropDownButton('theme', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxDropDownButton('theme');
                }
            },
            _width: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxDropDownButton('width', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxDropDownButton('width');
                }
            },
            __createComponent__: function (options) {
                let widgetOptions;
                options ? widgetOptions = options : widgetOptions = this.__manageProps__();
                JQXLite(this.componentSelector).jqxDropDownButton(widgetOptions);
                this.__extendProps__();
                this.__wireEvents__();
            },
            __manageProps__: function () {
                const widgetProps = ['animationType','arrowSize','autoOpen','closeDelay','disabled','dropDownHorizontalAlignment','dropDownVerticalAlignment','dropDownWidth','enableBrowserBoundsDetection','height','initContent','openDelay','popupZIndex','rtl','template','theme','width'];
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
                Object.defineProperty(that, 'arrowSize', {
                    get: function() {
                        return that._arrowSize();
                    },
                    set: function(newValue) {
                        that._arrowSize(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'autoOpen', {
                    get: function() {
                        return that._autoOpen();
                    },
                    set: function(newValue) {
                        that._autoOpen(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'closeDelay', {
                    get: function() {
                        return that._closeDelay();
                    },
                    set: function(newValue) {
                        that._closeDelay(newValue);
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
                Object.defineProperty(that, 'dropDownHorizontalAlignment', {
                    get: function() {
                        return that._dropDownHorizontalAlignment();
                    },
                    set: function(newValue) {
                        that._dropDownHorizontalAlignment(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'dropDownVerticalAlignment', {
                    get: function() {
                        return that._dropDownVerticalAlignment();
                    },
                    set: function(newValue) {
                        that._dropDownVerticalAlignment(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'dropDownWidth', {
                    get: function() {
                        return that._dropDownWidth();
                    },
                    set: function(newValue) {
                        that._dropDownWidth(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'enableBrowserBoundsDetection', {
                    get: function() {
                        return that._enableBrowserBoundsDetection();
                    },
                    set: function(newValue) {
                        that._enableBrowserBoundsDetection(newValue);
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
                Object.defineProperty(that, 'openDelay', {
                    get: function() {
                        return that._openDelay();
                    },
                    set: function(newValue) {
                        that._openDelay(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'popupZIndex', {
                    get: function() {
                        return that._popupZIndex();
                    },
                    set: function(newValue) {
                        that._popupZIndex(newValue);
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
