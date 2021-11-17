<template>
    <div v-bind:id="id">
        <slot></slot>
    </div>
</template>

<script>
    import '../jqwidgets/jqxcore.js';
    import '../jqwidgets/jqxbuttons.js';

    export default {
        props: {
            disabled: Boolean,
            height: [Number, String],
            imgSrc: String,
            imgWidth: Number,
            imgHeight: Number,
            imgPosition: String,
            roundedCorners: String,
            rtl: Boolean,
            textPosition: String,
            textImageRelation: String,
            theme: String,
            template: String,
            toggled: Boolean,
            width: [Number, String],
            value: String,
            autoCreate: {
                default: true,
                type: Boolean
            }
        },
        created: function () {
            this.id = 'jqxToggleButton' + JQXLite.generateID();
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
                JQXLite(this.componentSelector).jqxToggleButton(options);
            },
            getOptions: function () {
                const usedProps = Object.keys(this.__manageProps__());
                const resultToReturn = {};
                for (let i = 0; i < usedProps.length; i++) {
                    resultToReturn[usedProps[i]] = JQXLite(this.componentSelector).jqxToggleButton(usedProps[i]);
                }
                return resultToReturn;
            },
            check: function() {
                JQXLite(this.componentSelector).jqxToggleButton('check');  
            },
            destroy: function() {
                JQXLite(this.componentSelector).jqxToggleButton('destroy');  
            },
            focus: function() {
                JQXLite(this.componentSelector).jqxToggleButton('focus');  
            },
            render: function() {
                JQXLite(this.componentSelector).jqxToggleButton('render');  
            },
            toggle: function() {
                JQXLite(this.componentSelector).jqxToggleButton('toggle');  
            },
            unCheck: function() {
                JQXLite(this.componentSelector).jqxToggleButton('unCheck');  
            },
            val: function(value) {
                if (value !== undefined) {
                    JQXLite(this.componentSelector).jqxToggleButton('val',  value)
                } else {
                    return JQXLite(this.componentSelector).jqxToggleButton('val');
                }
            },
            _disabled: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxToggleButton('disabled', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxToggleButton('disabled');
                }
            },
            _height: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxToggleButton('height', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxToggleButton('height');
                }
            },
            _imgSrc: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxToggleButton('imgSrc', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxToggleButton('imgSrc');
                }
            },
            _imgWidth: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxToggleButton('imgWidth', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxToggleButton('imgWidth');
                }
            },
            _imgHeight: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxToggleButton('imgHeight', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxToggleButton('imgHeight');
                }
            },
            _imgPosition: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxToggleButton('imgPosition', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxToggleButton('imgPosition');
                }
            },
            _roundedCorners: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxToggleButton('roundedCorners', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxToggleButton('roundedCorners');
                }
            },
            _rtl: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxToggleButton('rtl', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxToggleButton('rtl');
                }
            },
            _textPosition: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxToggleButton('textPosition', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxToggleButton('textPosition');
                }
            },
            _textImageRelation: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxToggleButton('textImageRelation', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxToggleButton('textImageRelation');
                }
            },
            _theme: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxToggleButton('theme', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxToggleButton('theme');
                }
            },
            _template: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxToggleButton('template', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxToggleButton('template');
                }
            },
            _toggled: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxToggleButton('toggled', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxToggleButton('toggled');
                }
            },
            _width: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxToggleButton('width', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxToggleButton('width');
                }
            },
            _value: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxToggleButton('value', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxToggleButton('value');
                }
            },
            __createComponent__: function (options) {
                let widgetOptions;
                options ? widgetOptions = options : widgetOptions = this.__manageProps__();
                JQXLite(this.componentSelector).jqxToggleButton(widgetOptions);
                this.__extendProps__();
                this.__wireEvents__();
            },
            __manageProps__: function () {
                const widgetProps = ['disabled','height','imgSrc','imgWidth','imgHeight','imgPosition','roundedCorners','rtl','textPosition','textImageRelation','theme','template','toggled','width','value'];
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
                Object.defineProperty(that, 'imgSrc', {
                    get: function() {
                        return that._imgSrc();
                    },
                    set: function(newValue) {
                        that._imgSrc(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'imgWidth', {
                    get: function() {
                        return that._imgWidth();
                    },
                    set: function(newValue) {
                        that._imgWidth(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'imgHeight', {
                    get: function() {
                        return that._imgHeight();
                    },
                    set: function(newValue) {
                        that._imgHeight(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'imgPosition', {
                    get: function() {
                        return that._imgPosition();
                    },
                    set: function(newValue) {
                        that._imgPosition(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'roundedCorners', {
                    get: function() {
                        return that._roundedCorners();
                    },
                    set: function(newValue) {
                        that._roundedCorners(newValue);
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
                Object.defineProperty(that, 'textPosition', {
                    get: function() {
                        return that._textPosition();
                    },
                    set: function(newValue) {
                        that._textPosition(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'textImageRelation', {
                    get: function() {
                        return that._textImageRelation();
                    },
                    set: function(newValue) {
                        that._textImageRelation(newValue);
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
                Object.defineProperty(that, 'toggled', {
                    get: function() {
                        return that._toggled();
                    },
                    set: function(newValue) {
                        that._toggled(newValue);
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
                Object.defineProperty(that, 'value', {
                    get: function() {
                        return that._value();
                    },
                    set: function(newValue) {
                        that._value(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
            },
            __wireEvents__: function () {
                const that = this;

                JQXLite(this.componentSelector).on('click', function (event) { that.$emit('click', event); });
            }
        }
    }
</script>
