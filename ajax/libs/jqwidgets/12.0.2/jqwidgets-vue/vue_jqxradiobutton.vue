<template>
    <div v-bind:id="id">
        <slot></slot>
    </div>
</template>

<script>
    import '../jqwidgets/jqxcore.js';
    import '../jqwidgets/jqxradiobutton.js';

    export default {
        props: {
            animationShowDelay: Number,
            animationHideDelay: Number,
            boxSize: String,
            checked: Boolean,
            disabled: Boolean,
            enableContainerClick: Boolean,
            groupName: String,
            hasThreeStates: Boolean,
            height: [Number, String],
            rtl: Boolean,
            theme: String,
            width: [Number, String],
            autoCreate: {
                default: true,
                type: Boolean
            }
        },
        created: function () {
            this.id = 'jqxRadioButton' + JQXLite.generateID();
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
                JQXLite(this.componentSelector).jqxRadioButton(options);
            },
            getOptions: function () {
                const usedProps = Object.keys(this.__manageProps__());
                const resultToReturn = {};
                for (let i = 0; i < usedProps.length; i++) {
                    resultToReturn[usedProps[i]] = JQXLite(this.componentSelector).jqxRadioButton(usedProps[i]);
                }
                return resultToReturn;
            },
            check: function() {
                JQXLite(this.componentSelector).jqxRadioButton('check');  
            },
            disable: function() {
                JQXLite(this.componentSelector).jqxRadioButton('disable');  
            },
            destroy: function() {
                JQXLite(this.componentSelector).jqxRadioButton('destroy');  
            },
            enable: function() {
                JQXLite(this.componentSelector).jqxRadioButton('enable');  
            },
            focus: function() {
                JQXLite(this.componentSelector).jqxRadioButton('focus');  
            },
            render: function() {
                JQXLite(this.componentSelector).jqxRadioButton('render');  
            },
            uncheck: function() {
                JQXLite(this.componentSelector).jqxRadioButton('uncheck');  
            },
            val: function(value) {
                if (value !== undefined) {
                    JQXLite(this.componentSelector).jqxRadioButton('val',  value)
                } else {
                    return JQXLite(this.componentSelector).jqxRadioButton('val');
                }
            },
            _animationShowDelay: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxRadioButton('animationShowDelay', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxRadioButton('animationShowDelay');
                }
            },
            _animationHideDelay: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxRadioButton('animationHideDelay', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxRadioButton('animationHideDelay');
                }
            },
            _boxSize: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxRadioButton('boxSize', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxRadioButton('boxSize');
                }
            },
            _checked: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxRadioButton('checked', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxRadioButton('checked');
                }
            },
            _disabled: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxRadioButton('disabled', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxRadioButton('disabled');
                }
            },
            _enableContainerClick: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxRadioButton('enableContainerClick', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxRadioButton('enableContainerClick');
                }
            },
            _groupName: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxRadioButton('groupName', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxRadioButton('groupName');
                }
            },
            _hasThreeStates: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxRadioButton('hasThreeStates', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxRadioButton('hasThreeStates');
                }
            },
            _height: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxRadioButton('height', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxRadioButton('height');
                }
            },
            _rtl: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxRadioButton('rtl', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxRadioButton('rtl');
                }
            },
            _theme: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxRadioButton('theme', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxRadioButton('theme');
                }
            },
            _width: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxRadioButton('width', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxRadioButton('width');
                }
            },
            __createComponent__: function (options) {
                let widgetOptions;
                options ? widgetOptions = options : widgetOptions = this.__manageProps__();
                JQXLite(this.componentSelector).jqxRadioButton(widgetOptions);
                this.__extendProps__();
                this.__wireEvents__();
            },
            __manageProps__: function () {
                const widgetProps = ['animationShowDelay','animationHideDelay','boxSize','checked','disabled','enableContainerClick','groupName','hasThreeStates','height','rtl','theme','width'];
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
                this.$emit('input', this.$el.innerText);
            },
            __wireEvents__: function () {
                const that = this;

                JQXLite(this.componentSelector).on('checked', function (event) { that.$emit('checked', event); that.__twoWayDataBinding__(); });
                JQXLite(this.componentSelector).on('change', function (event) { that.$emit('change', event); });
                JQXLite(this.componentSelector).on('unchecked', function (event) { that.$emit('unchecked', event); });
            }
        }
    }
</script>
