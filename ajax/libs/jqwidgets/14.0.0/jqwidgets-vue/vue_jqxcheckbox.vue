<template>
    <div v-bind:id="id"><span><slot></slot></span></div>
</template>

<script>
    import '../jqwidgets/jqxcore.js';
    import '../jqwidgets/jqxcheckbox.js';

    export default {
        props: {
            animationShowDelay: Number,
            animationHideDelay: Number,
            boxSize: String,
            checked: Boolean,
            disabled: Boolean,
            enableContainerClick: Boolean,
            groupName: String,
            height: [Number, String],
            hasThreeStates: Boolean,
            locked: Boolean,
            rtl: Boolean,
            theme: String,
            width: [Number, String],
            autoCreate: {
                default: true,
                type: Boolean
            }
        },
        created: function () {
            this.id = 'jqxCheckBox' + JQXLite.generateID();
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
                JQXLite(this.componentSelector).jqxCheckBox(options);
            },
            getOptions: function () {
                const usedProps = Object.keys(this.__manageProps__());
                const resultToReturn = {};
                for (let i = 0; i < usedProps.length; i++) {
                    resultToReturn[usedProps[i]] = JQXLite(this.componentSelector).jqxCheckBox(usedProps[i]);
                }
                return resultToReturn;
            },
            check: function() {
                JQXLite(this.componentSelector).jqxCheckBox('check');  
            },
            disable: function() {
                JQXLite(this.componentSelector).jqxCheckBox('disable');  
            },
            destroy: function() {
                JQXLite(this.componentSelector).jqxCheckBox('destroy');  
            },
            enable: function() {
                JQXLite(this.componentSelector).jqxCheckBox('enable');  
            },
            focus: function() {
                JQXLite(this.componentSelector).jqxCheckBox('focus');  
            },
            indeterminate: function() {
                JQXLite(this.componentSelector).jqxCheckBox('indeterminate');  
            },
            render: function() {
                JQXLite(this.componentSelector).jqxCheckBox('render');  
            },
            toggle: function() {
                JQXLite(this.componentSelector).jqxCheckBox('toggle');  
            },
            uncheck: function() {
                JQXLite(this.componentSelector).jqxCheckBox('uncheck');  
            },
            val: function(value) {
                if (value !== undefined) {
                    JQXLite(this.componentSelector).jqxCheckBox('val',  value)
                } else {
                    return JQXLite(this.componentSelector).jqxCheckBox('val');
                }
            },
            _animationShowDelay: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxCheckBox('animationShowDelay', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxCheckBox('animationShowDelay');
                }
            },
            _animationHideDelay: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxCheckBox('animationHideDelay', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxCheckBox('animationHideDelay');
                }
            },
            _boxSize: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxCheckBox('boxSize', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxCheckBox('boxSize');
                }
            },
            _checked: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxCheckBox('checked', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxCheckBox('checked');
                }
            },
            _disabled: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxCheckBox('disabled', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxCheckBox('disabled');
                }
            },
            _enableContainerClick: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxCheckBox('enableContainerClick', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxCheckBox('enableContainerClick');
                }
            },
            _groupName: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxCheckBox('groupName', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxCheckBox('groupName');
                }
            },
            _height: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxCheckBox('height', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxCheckBox('height');
                }
            },
            _hasThreeStates: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxCheckBox('hasThreeStates', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxCheckBox('hasThreeStates');
                }
            },
            _locked: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxCheckBox('locked', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxCheckBox('locked');
                }
            },
            _rtl: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxCheckBox('rtl', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxCheckBox('rtl');
                }
            },
            _theme: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxCheckBox('theme', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxCheckBox('theme');
                }
            },
            _width: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxCheckBox('width', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxCheckBox('width');
                }
            },
            __createComponent__: function (options) {
                let widgetOptions;
                options ? widgetOptions = options : widgetOptions = this.__manageProps__();
                JQXLite(this.componentSelector).jqxCheckBox(widgetOptions);
                this.__extendProps__();
                this.__wireEvents__();
            },
            __manageProps__: function () {
                const widgetProps = ['animationShowDelay','animationHideDelay','boxSize','checked','disabled','enableContainerClick','groupName','height','hasThreeStates','locked','rtl','theme','width'];
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
                Object.defineProperty(that, 'boxSize', {
                    get: function() {
                        return that._boxSize();
                    },
                    set: function(newValue) {
                        that._boxSize(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'checked', {
                    get: function() {
                        return that._checked();
                    },
                    set: function(newValue) {
                        that._checked(newValue);
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
                Object.defineProperty(that, 'enableContainerClick', {
                    get: function() {
                        return that._enableContainerClick();
                    },
                    set: function(newValue) {
                        that._enableContainerClick(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'groupName', {
                    get: function() {
                        return that._groupName();
                    },
                    set: function(newValue) {
                        that._groupName(newValue);
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
                Object.defineProperty(that, 'hasThreeStates', {
                    get: function() {
                        return that._hasThreeStates();
                    },
                    set: function(newValue) {
                        that._hasThreeStates(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'locked', {
                    get: function() {
                        return that._locked();
                    },
                    set: function(newValue) {
                        that._locked(newValue);
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
            __twoWayDataBinding__: function () {
                const value = JQXLite(this.componentSelector).jqxCheckBox('val');
                this.$emit('input', value);
            },
            __wireEvents__: function () {
                const that = this;

                JQXLite(this.componentSelector).on('checked', function (event) { that.$emit('checked', event); });
                JQXLite(this.componentSelector).on('change', function (event) { that.$emit('change', event); that.__twoWayDataBinding__(); });
                JQXLite(this.componentSelector).on('indeterminate', function (event) { that.$emit('indeterminate', event); });
                JQXLite(this.componentSelector).on('unchecked', function (event) { that.$emit('unchecked', event); });
            }
        }
    }
</script>
