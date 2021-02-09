<template>
    <div v-bind:id="id">
        <slot></slot>
    </div>
</template>

<script>
    import '../jqwidgets/jqxcore.js';
    import '../jqwidgets/jqxbuttons.js';
    import '../jqwidgets/jqxscrollbar.js';
    import '../jqwidgets/jqxpanel.js';

    export default {
        props: {
            autoUpdate: Boolean,
            disabled: Boolean,
            height: [Number, String],
            rtl: Boolean,
            sizeMode: String,
            scrollBarSize: Number,
            theme: String,
            width: [Number, String],
            autoCreate: {
                default: true,
                type: Boolean
            }
        },
        created: function () {
            this.id = 'jqxPanel' + JQXLite.generateID();
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
                JQXLite(this.componentSelector).jqxPanel(options);
            },
            getOptions: function () {
                const usedProps = Object.keys(this.__manageProps__());
                const resultToReturn = {};
                for (let i = 0; i < usedProps.length; i++) {
                    resultToReturn[usedProps[i]] = JQXLite(this.componentSelector).jqxPanel(usedProps[i]);
                }
                return resultToReturn;
            },
            append: function(HTMLElement) {
                JQXLite(this.componentSelector).jqxPanel('append', HTMLElement);  
            },
            clearcontent: function() {
                JQXLite(this.componentSelector).jqxPanel('clearcontent');  
            },
            destroy: function() {
                JQXLite(this.componentSelector).jqxPanel('destroy');  
            },
            focus: function() {
                JQXLite(this.componentSelector).jqxPanel('focus');  
            },
            getScrollHeight: function() {
                return JQXLite(this.componentSelector).jqxPanel('getScrollHeight');  
            },
            getVScrollPosition: function() {
                return JQXLite(this.componentSelector).jqxPanel('getVScrollPosition');  
            },
            getScrollWidth: function() {
                return JQXLite(this.componentSelector).jqxPanel('getScrollWidth');  
            },
            getHScrollPosition: function() {
                return JQXLite(this.componentSelector).jqxPanel('getHScrollPosition');  
            },
            prepend: function(HTMLElement) {
                JQXLite(this.componentSelector).jqxPanel('prepend', HTMLElement);  
            },
            remove: function(HTMLElement) {
                JQXLite(this.componentSelector).jqxPanel('remove', HTMLElement);  
            },
            scrollTo: function(left, top) {
                JQXLite(this.componentSelector).jqxPanel('scrollTo', left, top);  
            },
            _autoUpdate: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxPanel('autoUpdate', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxPanel('autoUpdate');
                }
            },
            _disabled: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxPanel('disabled', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxPanel('disabled');
                }
            },
            _height: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxPanel('height', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxPanel('height');
                }
            },
            _rtl: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxPanel('rtl', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxPanel('rtl');
                }
            },
            _sizeMode: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxPanel('sizeMode', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxPanel('sizeMode');
                }
            },
            _scrollBarSize: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxPanel('scrollBarSize', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxPanel('scrollBarSize');
                }
            },
            _theme: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxPanel('theme', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxPanel('theme');
                }
            },
            _width: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxPanel('width', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxPanel('width');
                }
            },
            __createComponent__: function (options) {
                let widgetOptions;
                options ? widgetOptions = options : widgetOptions = this.__manageProps__();
                JQXLite(this.componentSelector).jqxPanel(widgetOptions);
                this.__extendProps__();
                this.__wireEvents__();
            },
            __manageProps__: function () {
                const widgetProps = ['autoUpdate','disabled','height','rtl','sizeMode','scrollBarSize','theme','width'];
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

                Object.defineProperty(that, 'autoUpdate', {
                    get: function() {
                        return that._autoUpdate();
                    },
                    set: function(newValue) {
                        that._autoUpdate(newValue);
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
                Object.defineProperty(that, 'sizeMode', {
                    get: function() {
                        return that._sizeMode();
                    },
                    set: function(newValue) {
                        that._sizeMode(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'scrollBarSize', {
                    get: function() {
                        return that._scrollBarSize();
                    },
                    set: function(newValue) {
                        that._scrollBarSize(newValue);
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

            }
        }
    }
</script>
