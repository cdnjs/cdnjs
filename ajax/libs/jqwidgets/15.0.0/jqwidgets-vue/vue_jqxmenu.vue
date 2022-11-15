<template>
    <div v-bind:id="id">
        <slot></slot>
    </div>
</template>

<script>
    import '../jqwidgets/jqxcore.js';
    import '../jqwidgets/jqxdata.js';
    import '../jqwidgets/jqxmenu.js';

    export default {
        props: {
            animationShowDuration: Number,
            animationHideDuration: Number,
            animationHideDelay: Number,
            animationShowDelay: Number,
            autoCloseInterval: Number,
            autoSizeMainItems: Boolean,
            autoCloseOnClick: Boolean,
            autoOpenPopup: Boolean,
            autoOpen: Boolean,
            autoCloseOnMouseLeave: Boolean,
            clickToOpen: Boolean,
            disabled: Boolean,
            enableHover: Boolean,
            easing: String,
            height: [Number, String],
            keyboardNavigation: Boolean,
            minimizeWidth: [String, Number],
            mode: String,
            popupZIndex: Number,
            rtl: Boolean,
            showTopLevelArrows: Boolean,
            source: [Array, Object],
            theme: String,
            width: [Number, String],
            autoCreate: {
                default: true,
                type: Boolean
            }
        },
        created: function () {
            this.id = 'jqxMenu' + JQXLite.generateID();
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
                JQXLite(this.componentSelector).jqxMenu(options);
            },
            getOptions: function () {
                const usedProps = Object.keys(this.__manageProps__());
                const resultToReturn = {};
                for (let i = 0; i < usedProps.length; i++) {
                    resultToReturn[usedProps[i]] = JQXLite(this.componentSelector).jqxMenu(usedProps[i]);
                }
                return resultToReturn;
            },
            closeItem: function(itemID) {
                JQXLite(this.componentSelector).jqxMenu('closeItem', itemID);  
            },
            close: function() {
                JQXLite(this.componentSelector).jqxMenu('close');  
            },
            disable: function(itemID, value) {
                JQXLite(this.componentSelector).jqxMenu('disable', itemID, value);  
            },
            destroy: function() {
                JQXLite(this.componentSelector).jqxMenu('destroy');  
            },
            focus: function() {
                JQXLite(this.componentSelector).jqxMenu('focus');  
            },
            minimize: function() {
                JQXLite(this.componentSelector).jqxMenu('minimize');  
            },
            open: function(left, top) {
                JQXLite(this.componentSelector).jqxMenu('open', left, top);  
            },
            openItem: function(itemID) {
                JQXLite(this.componentSelector).jqxMenu('openItem', itemID);  
            },
            restore: function() {
                JQXLite(this.componentSelector).jqxMenu('restore');  
            },
            setItemOpenDirection: function(item, horizontaldirection, verticaldirection) {
                JQXLite(this.componentSelector).jqxMenu('setItemOpenDirection', item, horizontaldirection, verticaldirection);  
            },
            _animationShowDuration: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxMenu('animationShowDuration', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxMenu('animationShowDuration');
                }
            },
            _animationHideDuration: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxMenu('animationHideDuration', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxMenu('animationHideDuration');
                }
            },
            _animationHideDelay: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxMenu('animationHideDelay', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxMenu('animationHideDelay');
                }
            },
            _animationShowDelay: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxMenu('animationShowDelay', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxMenu('animationShowDelay');
                }
            },
            _autoCloseInterval: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxMenu('autoCloseInterval', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxMenu('autoCloseInterval');
                }
            },
            _autoSizeMainItems: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxMenu('autoSizeMainItems', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxMenu('autoSizeMainItems');
                }
            },
            _autoCloseOnClick: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxMenu('autoCloseOnClick', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxMenu('autoCloseOnClick');
                }
            },
            _autoOpenPopup: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxMenu('autoOpenPopup', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxMenu('autoOpenPopup');
                }
            },
            _autoOpen: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxMenu('autoOpen', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxMenu('autoOpen');
                }
            },
            _autoCloseOnMouseLeave: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxMenu('autoCloseOnMouseLeave', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxMenu('autoCloseOnMouseLeave');
                }
            },
            _clickToOpen: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxMenu('clickToOpen', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxMenu('clickToOpen');
                }
            },
            _disabled: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxMenu('disabled', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxMenu('disabled');
                }
            },
            _enableHover: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxMenu('enableHover', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxMenu('enableHover');
                }
            },
            _easing: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxMenu('easing', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxMenu('easing');
                }
            },
            _height: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxMenu('height', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxMenu('height');
                }
            },
            _keyboardNavigation: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxMenu('keyboardNavigation', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxMenu('keyboardNavigation');
                }
            },
            _minimizeWidth: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxMenu('minimizeWidth', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxMenu('minimizeWidth');
                }
            },
            _mode: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxMenu('mode', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxMenu('mode');
                }
            },
            _popupZIndex: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxMenu('popupZIndex', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxMenu('popupZIndex');
                }
            },
            _rtl: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxMenu('rtl', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxMenu('rtl');
                }
            },
            _showTopLevelArrows: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxMenu('showTopLevelArrows', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxMenu('showTopLevelArrows');
                }
            },
            _source: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxMenu('source', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxMenu('source');
                }
            },
            _theme: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxMenu('theme', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxMenu('theme');
                }
            },
            _width: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxMenu('width', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxMenu('width');
                }
            },
            __createComponent__: function (options) {
                let widgetOptions;
                options ? widgetOptions = options : widgetOptions = this.__manageProps__();
                JQXLite(this.componentSelector).jqxMenu(widgetOptions);
                this.__extendProps__();
                this.__wireEvents__();
            },
            __manageProps__: function () {
                const widgetProps = ['animationShowDuration','animationHideDuration','animationHideDelay','animationShowDelay','autoCloseInterval','autoSizeMainItems','autoCloseOnClick','autoOpenPopup','autoOpen','autoCloseOnMouseLeave','clickToOpen','disabled','enableHover','easing','height','keyboardNavigation','minimizeWidth','mode','popupZIndex','rtl','showTopLevelArrows','source','theme','width'];
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

                Object.defineProperty(that, 'animationShowDuration', {
                    get: function() {
                        return that._animationShowDuration();
                    },
                    set: function(newValue) {
                        that._animationShowDuration(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'animationHideDuration', {
                    get: function() {
                        return that._animationHideDuration();
                    },
                    set: function(newValue) {
                        that._animationHideDuration(newValue);
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
                Object.defineProperty(that, 'autoCloseInterval', {
                    get: function() {
                        return that._autoCloseInterval();
                    },
                    set: function(newValue) {
                        that._autoCloseInterval(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'autoSizeMainItems', {
                    get: function() {
                        return that._autoSizeMainItems();
                    },
                    set: function(newValue) {
                        that._autoSizeMainItems(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'autoCloseOnClick', {
                    get: function() {
                        return that._autoCloseOnClick();
                    },
                    set: function(newValue) {
                        that._autoCloseOnClick(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'autoOpenPopup', {
                    get: function() {
                        return that._autoOpenPopup();
                    },
                    set: function(newValue) {
                        that._autoOpenPopup(newValue);
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
                Object.defineProperty(that, 'autoCloseOnMouseLeave', {
                    get: function() {
                        return that._autoCloseOnMouseLeave();
                    },
                    set: function(newValue) {
                        that._autoCloseOnMouseLeave(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'clickToOpen', {
                    get: function() {
                        return that._clickToOpen();
                    },
                    set: function(newValue) {
                        that._clickToOpen(newValue);
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
                Object.defineProperty(that, 'easing', {
                    get: function() {
                        return that._easing();
                    },
                    set: function(newValue) {
                        that._easing(newValue);
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
                Object.defineProperty(that, 'showTopLevelArrows', {
                    get: function() {
                        return that._showTopLevelArrows();
                    },
                    set: function(newValue) {
                        that._showTopLevelArrows(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'source', {
                    get: function() {
                        return that._source();
                    },
                    set: function(newValue) {
                        that._source(newValue);
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

                JQXLite(this.componentSelector).on('closed', function (event) { that.$emit('closed', event); });
                JQXLite(this.componentSelector).on('itemclick', function (event) { that.$emit('itemclick', event); });
                JQXLite(this.componentSelector).on('shown', function (event) { that.$emit('shown', event); });
            }
        }
    }
</script>
