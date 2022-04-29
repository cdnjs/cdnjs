<template>
    <div v-bind:id="id">
        <slot></slot>
    </div>
</template>

<script>
    import '../jqwidgets/jqxcore.js';
    import '../jqwidgets/jqxnavbar.js';

    export default {
        props: {
            columns: Array,
            disabled: Boolean,
            height: [Number, String],
            minimized: Boolean,
            minimizeButtonPosition: String,
            minimizedHeight: Number,
            minimizedTitle: String,
            orientation: String,
            popupAnimationDelay: Number,
            rtl: Boolean,
            selection: Boolean,
            selectedItem: Number,
            theme: String,
            width: [Number, String],
            autoCreate: {
                default: true,
                type: Boolean
            }
        },
        created: function () {
            this.id = 'jqxNavBar' + JQXLite.generateID();
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
                JQXLite(this.componentSelector).jqxNavBar(options);
            },
            getOptions: function () {
                const usedProps = Object.keys(this.__manageProps__());
                const resultToReturn = {};
                for (let i = 0; i < usedProps.length; i++) {
                    resultToReturn[usedProps[i]] = JQXLite(this.componentSelector).jqxNavBar(usedProps[i]);
                }
                return resultToReturn;
            },
            close: function() {
                JQXLite(this.componentSelector).jqxNavBar('close');  
            },
            destroy: function() {
                JQXLite(this.componentSelector).jqxNavBar('destroy');  
            },
            getSelectedIndex: function() {
                return JQXLite(this.componentSelector).jqxNavBar('getSelectedIndex');  
            },
            open: function() {
                JQXLite(this.componentSelector).jqxNavBar('open');  
            },
            selectAt: function(index) {
                JQXLite(this.componentSelector).jqxNavBar('selectAt', index);  
            },
            _columns: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxNavBar('columns', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxNavBar('columns');
                }
            },
            _disabled: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxNavBar('disabled', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxNavBar('disabled');
                }
            },
            _height: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxNavBar('height', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxNavBar('height');
                }
            },
            _minimized: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxNavBar('minimized', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxNavBar('minimized');
                }
            },
            _minimizeButtonPosition: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxNavBar('minimizeButtonPosition', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxNavBar('minimizeButtonPosition');
                }
            },
            _minimizedHeight: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxNavBar('minimizedHeight', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxNavBar('minimizedHeight');
                }
            },
            _minimizedTitle: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxNavBar('minimizedTitle', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxNavBar('minimizedTitle');
                }
            },
            _orientation: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxNavBar('orientation', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxNavBar('orientation');
                }
            },
            _popupAnimationDelay: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxNavBar('popupAnimationDelay', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxNavBar('popupAnimationDelay');
                }
            },
            _rtl: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxNavBar('rtl', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxNavBar('rtl');
                }
            },
            _selection: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxNavBar('selection', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxNavBar('selection');
                }
            },
            _selectedItem: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxNavBar('selectedItem', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxNavBar('selectedItem');
                }
            },
            _theme: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxNavBar('theme', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxNavBar('theme');
                }
            },
            _width: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxNavBar('width', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxNavBar('width');
                }
            },
            __createComponent__: function (options) {
                let widgetOptions;
                options ? widgetOptions = options : widgetOptions = this.__manageProps__();
                JQXLite(this.componentSelector).jqxNavBar(widgetOptions);
                this.__extendProps__();
                this.__wireEvents__();
            },
            __manageProps__: function () {
                const widgetProps = ['columns','disabled','height','minimized','minimizeButtonPosition','minimizedHeight','minimizedTitle','orientation','popupAnimationDelay','rtl','selection','selectedItem','theme','width'];
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

                Object.defineProperty(that, 'columns', {
                    get: function() {
                        return that._columns();
                    },
                    set: function(newValue) {
                        that._columns(newValue);
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
                Object.defineProperty(that, 'minimized', {
                    get: function() {
                        return that._minimized();
                    },
                    set: function(newValue) {
                        that._minimized(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'minimizeButtonPosition', {
                    get: function() {
                        return that._minimizeButtonPosition();
                    },
                    set: function(newValue) {
                        that._minimizeButtonPosition(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'minimizedHeight', {
                    get: function() {
                        return that._minimizedHeight();
                    },
                    set: function(newValue) {
                        that._minimizedHeight(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'minimizedTitle', {
                    get: function() {
                        return that._minimizedTitle();
                    },
                    set: function(newValue) {
                        that._minimizedTitle(newValue);
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
                Object.defineProperty(that, 'popupAnimationDelay', {
                    get: function() {
                        return that._popupAnimationDelay();
                    },
                    set: function(newValue) {
                        that._popupAnimationDelay(newValue);
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
                Object.defineProperty(that, 'selection', {
                    get: function() {
                        return that._selection();
                    },
                    set: function(newValue) {
                        that._selection(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'selectedItem', {
                    get: function() {
                        return that._selectedItem();
                    },
                    set: function(newValue) {
                        that._selectedItem(newValue);
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
            }
        }
    }
</script>
