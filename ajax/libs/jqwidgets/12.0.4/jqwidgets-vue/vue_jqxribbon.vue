<template>
    <div v-bind:id="id">
        <slot></slot>
    </div>
</template>

<script>
    import '../jqwidgets/jqxcore.js';
    import '../jqwidgets/jqxdata.js';
    import '../jqwidgets/jqxbuttons.js';
    import '../jqwidgets/jqxribbon.js';

    export default {
        props: {
            animationType: String,
            animationDelay: Number,
            disabled: Boolean,
            height: [Number, String],
            initContent: Function,
            mode: String,
            popupCloseMode: String,
            position: String,
            reorder: Boolean,
            rtl: Boolean,
            selectedIndex: Number,
            selectionMode: String,
            scrollPosition: String,
            scrollStep: Number,
            scrollDelay: Number,
            theme: String,
            width: [Number, String],
            autoCreate: {
                default: true,
                type: Boolean
            }
        },
        created: function () {
            this.id = 'jqxRibbon' + JQXLite.generateID();
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
                JQXLite(this.componentSelector).jqxRibbon(options);
            },
            getOptions: function () {
                const usedProps = Object.keys(this.__manageProps__());
                const resultToReturn = {};
                for (let i = 0; i < usedProps.length; i++) {
                    resultToReturn[usedProps[i]] = JQXLite(this.componentSelector).jqxRibbon(usedProps[i]);
                }
                return resultToReturn;
            },
            addAt: function(index, item) {
                JQXLite(this.componentSelector).jqxRibbon('addAt', index, item);  
            },
            clearSelection: function() {
                JQXLite(this.componentSelector).jqxRibbon('clearSelection');  
            },
            disableAt: function(index) {
                JQXLite(this.componentSelector).jqxRibbon('disableAt', index);  
            },
            destroy: function() {
                JQXLite(this.componentSelector).jqxRibbon('destroy');  
            },
            enableAt: function(index) {
                JQXLite(this.componentSelector).jqxRibbon('enableAt', index);  
            },
            hideAt: function(index) {
                JQXLite(this.componentSelector).jqxRibbon('hideAt', index);  
            },
            removeAt: function(index) {
                JQXLite(this.componentSelector).jqxRibbon('removeAt', index);  
            },
            render: function() {
                JQXLite(this.componentSelector).jqxRibbon('render');  
            },
            refresh: function() {
                JQXLite(this.componentSelector).jqxRibbon('refresh');  
            },
            selectAt: function(index) {
                JQXLite(this.componentSelector).jqxRibbon('selectAt', index);  
            },
            showAt: function(index) {
                JQXLite(this.componentSelector).jqxRibbon('showAt', index);  
            },
            setPopupLayout: function(index, layout, width, height) {
                JQXLite(this.componentSelector).jqxRibbon('setPopupLayout', index, layout, width, height);  
            },
            updateAt: function(index, item) {
                JQXLite(this.componentSelector).jqxRibbon('updateAt', index, item);  
            },
            val: function(value) {
                if (value !== undefined) {
                    JQXLite(this.componentSelector).jqxRibbon('val',  value)
                } else {
                    return JQXLite(this.componentSelector).jqxRibbon('val');
                }
            },
            _animationType: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxRibbon('animationType', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxRibbon('animationType');
                }
            },
            _animationDelay: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxRibbon('animationDelay', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxRibbon('animationDelay');
                }
            },
            _disabled: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxRibbon('disabled', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxRibbon('disabled');
                }
            },
            _height: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxRibbon('height', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxRibbon('height');
                }
            },
            _initContent: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxRibbon('initContent', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxRibbon('initContent');
                }
            },
            _mode: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxRibbon('mode', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxRibbon('mode');
                }
            },
            _popupCloseMode: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxRibbon('popupCloseMode', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxRibbon('popupCloseMode');
                }
            },
            _position: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxRibbon('position', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxRibbon('position');
                }
            },
            _reorder: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxRibbon('reorder', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxRibbon('reorder');
                }
            },
            _rtl: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxRibbon('rtl', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxRibbon('rtl');
                }
            },
            _selectedIndex: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxRibbon('selectedIndex', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxRibbon('selectedIndex');
                }
            },
            _selectionMode: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxRibbon('selectionMode', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxRibbon('selectionMode');
                }
            },
            _scrollPosition: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxRibbon('scrollPosition', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxRibbon('scrollPosition');
                }
            },
            _scrollStep: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxRibbon('scrollStep', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxRibbon('scrollStep');
                }
            },
            _scrollDelay: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxRibbon('scrollDelay', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxRibbon('scrollDelay');
                }
            },
            _theme: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxRibbon('theme', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxRibbon('theme');
                }
            },
            _width: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxRibbon('width', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxRibbon('width');
                }
            },
            __createComponent__: function (options) {
                let widgetOptions;
                options ? widgetOptions = options : widgetOptions = this.__manageProps__();
                JQXLite(this.componentSelector).jqxRibbon(widgetOptions);
                this.__extendProps__();
                this.__wireEvents__();
            },
            __manageProps__: function () {
                const widgetProps = ['animationType','animationDelay','disabled','height','initContent','mode','popupCloseMode','position','reorder','rtl','selectedIndex','selectionMode','scrollPosition','scrollStep','scrollDelay','theme','width'];
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
                Object.defineProperty(that, 'animationDelay', {
                    get: function() {
                        return that._animationDelay();
                    },
                    set: function(newValue) {
                        that._animationDelay(newValue);
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
                Object.defineProperty(that, 'popupCloseMode', {
                    get: function() {
                        return that._popupCloseMode();
                    },
                    set: function(newValue) {
                        that._popupCloseMode(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'position', {
                    get: function() {
                        return that._position();
                    },
                    set: function(newValue) {
                        that._position(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'reorder', {
                    get: function() {
                        return that._reorder();
                    },
                    set: function(newValue) {
                        that._reorder(newValue);
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
                Object.defineProperty(that, 'selectedIndex', {
                    get: function() {
                        return that._selectedIndex();
                    },
                    set: function(newValue) {
                        that._selectedIndex(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'selectionMode', {
                    get: function() {
                        return that._selectionMode();
                    },
                    set: function(newValue) {
                        that._selectionMode(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'scrollPosition', {
                    get: function() {
                        return that._scrollPosition();
                    },
                    set: function(newValue) {
                        that._scrollPosition(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'scrollStep', {
                    get: function() {
                        return that._scrollStep();
                    },
                    set: function(newValue) {
                        that._scrollStep(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'scrollDelay', {
                    get: function() {
                        return that._scrollDelay();
                    },
                    set: function(newValue) {
                        that._scrollDelay(newValue);
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

                JQXLite(this.componentSelector).on('change', function (event) { that.$emit('change', event); });
                JQXLite(this.componentSelector).on('reorder', function (event) { that.$emit('reorder', event); });
                JQXLite(this.componentSelector).on('select', function (event) { that.$emit('select', event); });
                JQXLite(this.componentSelector).on('unselect', function (event) { that.$emit('unselect', event); });
            }
        }
    }
</script>
