<template>
    <div v-bind:id="id">
        <slot></slot>
    </div>
</template>

<script>
    import '../jqwidgets/jqxcore.js';
    import '../jqwidgets/jqxvalidator.js';

    export default {
        props: {
            arrow: Boolean,
            animation: String,
            animationDuration: Number,
            closeOnClick: Boolean,
            focus: Boolean,
            hintType: String,
            onError: Function,
            onSuccess: Function,
            position: String,
            rules: Array,
            rtl: Boolean,
            autoCreate: {
                default: true,
                type: Boolean
            }
        },
        created: function () {
            this.id = 'jqxValidator' + JQXLite.generateID();
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
                JQXLite(this.componentSelector).jqxValidator(options);
            },
            getOptions: function () {
                const usedProps = Object.keys(this.__manageProps__());
                const resultToReturn = {};
                for (let i = 0; i < usedProps.length; i++) {
                    resultToReturn[usedProps[i]] = JQXLite(this.componentSelector).jqxValidator(usedProps[i]);
                }
                return resultToReturn;
            },
            hideHint: function(id) {
                JQXLite(this.componentSelector).jqxValidator('hideHint', id);  
            },
            hide: function() {
                JQXLite(this.componentSelector).jqxValidator('hide');  
            },
            updatePosition: function() {
                JQXLite(this.componentSelector).jqxValidator('updatePosition');  
            },
            validate: function(htmlElement) {
                JQXLite(this.componentSelector).jqxValidator('validate', htmlElement);  
            },
            validateInput: function(id) {
                JQXLite(this.componentSelector).jqxValidator('validateInput', id);  
            },
            _arrow: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxValidator('arrow', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxValidator('arrow');
                }
            },
            _animation: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxValidator('animation', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxValidator('animation');
                }
            },
            _animationDuration: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxValidator('animationDuration', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxValidator('animationDuration');
                }
            },
            _closeOnClick: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxValidator('closeOnClick', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxValidator('closeOnClick');
                }
            },
            _focus: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxValidator('focus', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxValidator('focus');
                }
            },
            _hintType: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxValidator('hintType', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxValidator('hintType');
                }
            },
            _onError: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxValidator('onError', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxValidator('onError');
                }
            },
            _onSuccess: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxValidator('onSuccess', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxValidator('onSuccess');
                }
            },
            _position: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxValidator('position', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxValidator('position');
                }
            },
            _rules: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxValidator('rules', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxValidator('rules');
                }
            },
            _rtl: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxValidator('rtl', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxValidator('rtl');
                }
            },
            __createComponent__: function (options) {
                let widgetOptions;
                options ? widgetOptions = options : widgetOptions = this.__manageProps__();
                JQXLite(this.componentSelector).jqxValidator(widgetOptions);
                this.__extendProps__();
                this.__wireEvents__();
            },
            __manageProps__: function () {
                const widgetProps = ['arrow','animation','animationDuration','closeOnClick','focus','hintType','onError','onSuccess','position','rules','rtl'];
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

                Object.defineProperty(that, 'arrow', {
                    get: function() {
                        return that._arrow();
                    },
                    set: function(newValue) {
                        that._arrow(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'animation', {
                    get: function() {
                        return that._animation();
                    },
                    set: function(newValue) {
                        that._animation(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'animationDuration', {
                    get: function() {
                        return that._animationDuration();
                    },
                    set: function(newValue) {
                        that._animationDuration(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'closeOnClick', {
                    get: function() {
                        return that._closeOnClick();
                    },
                    set: function(newValue) {
                        that._closeOnClick(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'focus', {
                    get: function() {
                        return that._focus();
                    },
                    set: function(newValue) {
                        that._focus(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'hintType', {
                    get: function() {
                        return that._hintType();
                    },
                    set: function(newValue) {
                        that._hintType(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'onError', {
                    get: function() {
                        return that._onError();
                    },
                    set: function(newValue) {
                        that._onError(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'onSuccess', {
                    get: function() {
                        return that._onSuccess();
                    },
                    set: function(newValue) {
                        that._onSuccess(newValue);
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
                Object.defineProperty(that, 'rules', {
                    get: function() {
                        return that._rules();
                    },
                    set: function(newValue) {
                        that._rules(newValue);
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
            },
            __wireEvents__: function () {
                const that = this;

                JQXLite(this.componentSelector).on('validationError', function (event) { that.$emit('validationError', event); });
                JQXLite(this.componentSelector).on('validationSuccess', function (event) { that.$emit('validationSuccess', event); });
            }
        }
    }
</script>
