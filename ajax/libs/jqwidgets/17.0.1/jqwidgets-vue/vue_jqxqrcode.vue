<template>
    <div v-bind:id="id">
        <slot></slot>
    </div>
</template>

<script>
    import '../jqwidgets/jqxcore.js';

    export default {
        props: {
            backgroundColor: String,
            displayLabel: {
                default: false,
                type: Boolean
            },
            embedImage: String,
            errorLevel: String,
            imageHeight: Number,
            imageWidth: Number,
            labelColor: String,
            labelFont: String,
            labelFontSize: Number,
            labelMarginBottom: Number,
            labelMarginTop: Number,
            labelPosition: String,
            lineColor: String,
            squareWidth: Number,
            renderAs: String,
            value: String,
            autoCreate: {
                default: true,
                type: Boolean
            }
        },
        created: function () {
            this.id = 'jqxQRcode' + JQXLite.generateID();
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
                JQXLite(this.componentSelector).jqxQRcode(options);
            },
            getOptions: function () {
                const usedProps = Object.keys(this.__manageProps__());
                const resultToReturn = {};
                for (let i = 0; i < usedProps.length; i++) {
                    resultToReturn[usedProps[i]] = JQXLite(this.componentSelector).jqxQRcode(usedProps[i]);
                }
                return resultToReturn;
            },
            export: function(format, fileName) {
                return JQXLite(this.componentSelector).jqxQRcode('export', format, fileName);  
            },
            getDataURL: function(format) {
                return JQXLite(this.componentSelector).jqxQRcode('getDataURL', format);  
            },
            getDataURLAsync: function(format) {
                return JQXLite(this.componentSelector).jqxQRcode('getDataURLAsync', format);  
            },
            isValid: function() {
                return JQXLite(this.componentSelector).jqxQRcode('isValid');  
            },
            _backgroundColor: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxQRcode('backgroundColor', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxQRcode('backgroundColor');
                }
            },
            _displayLabel: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxQRcode('displayLabel', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxQRcode('displayLabel');
                }
            },
            _embedImage: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxQRcode('embedImage', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxQRcode('embedImage');
                }
            },
            _errorLevel: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxQRcode('errorLevel', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxQRcode('errorLevel');
                }
            },
            _imageHeight: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxQRcode('imageHeight', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxQRcode('imageHeight');
                }
            },
            _imageWidth: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxQRcode('imageWidth', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxQRcode('imageWidth');
                }
            },
            _labelColor: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxQRcode('labelColor', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxQRcode('labelColor');
                }
            },
            _labelFont: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxQRcode('labelFont', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxQRcode('labelFont');
                }
            },
            _labelFontSize: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxQRcode('labelFontSize', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxQRcode('labelFontSize');
                }
            },
            _labelMarginBottom: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxQRcode('labelMarginBottom', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxQRcode('labelMarginBottom');
                }
            },
            _labelMarginTop: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxQRcode('labelMarginTop', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxQRcode('labelMarginTop');
                }
            },
            _labelPosition: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxQRcode('labelPosition', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxQRcode('labelPosition');
                }
            },
            _lineColor: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxQRcode('lineColor', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxQRcode('lineColor');
                }
            },
            _squareWidth: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxQRcode('squareWidth', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxQRcode('squareWidth');
                }
            },
            _renderAs: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxQRcode('renderAs', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxQRcode('renderAs');
                }
            },
            _value: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxQRcode('value', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxQRcode('value');
                }
            },
            __createComponent__: function (options) {
                let widgetOptions;
                options ? widgetOptions = options : widgetOptions = this.__manageProps__();
                JQXLite(this.componentSelector).jqxQRcode(widgetOptions);
                this.__extendProps__();
                this.__wireEvents__();
            },
            __manageProps__: function () {
                const widgetProps = ['backgroundColor','displayLabel','embedImage','errorLevel','imageHeight','imageWidth','labelColor','labelFont','labelFontSize','labelMarginBottom','labelMarginTop','labelPosition','lineColor','squareWidth','renderAs','value'];
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

                Object.defineProperty(that, 'backgroundColor', {
                    get: function() {
                        return that._backgroundColor();
                    },
                    set: function(newValue) {
                        that._backgroundColor(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'displayLabel', {
                    get: function() {
                        return that._displayLabel();
                    },
                    set: function(newValue) {
                        that._displayLabel(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'embedImage', {
                    get: function() {
                        return that._embedImage();
                    },
                    set: function(newValue) {
                        that._embedImage(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'errorLevel', {
                    get: function() {
                        return that._errorLevel();
                    },
                    set: function(newValue) {
                        that._errorLevel(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'imageHeight', {
                    get: function() {
                        return that._imageHeight();
                    },
                    set: function(newValue) {
                        that._imageHeight(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'imageWidth', {
                    get: function() {
                        return that._imageWidth();
                    },
                    set: function(newValue) {
                        that._imageWidth(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'labelColor', {
                    get: function() {
                        return that._labelColor();
                    },
                    set: function(newValue) {
                        that._labelColor(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'labelFont', {
                    get: function() {
                        return that._labelFont();
                    },
                    set: function(newValue) {
                        that._labelFont(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'labelFontSize', {
                    get: function() {
                        return that._labelFontSize();
                    },
                    set: function(newValue) {
                        that._labelFontSize(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'labelMarginBottom', {
                    get: function() {
                        return that._labelMarginBottom();
                    },
                    set: function(newValue) {
                        that._labelMarginBottom(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'labelMarginTop', {
                    get: function() {
                        return that._labelMarginTop();
                    },
                    set: function(newValue) {
                        that._labelMarginTop(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'labelPosition', {
                    get: function() {
                        return that._labelPosition();
                    },
                    set: function(newValue) {
                        that._labelPosition(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'lineColor', {
                    get: function() {
                        return that._lineColor();
                    },
                    set: function(newValue) {
                        that._lineColor(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'squareWidth', {
                    get: function() {
                        return that._squareWidth();
                    },
                    set: function(newValue) {
                        that._squareWidth(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'renderAs', {
                    get: function() {
                        return that._renderAs();
                    },
                    set: function(newValue) {
                        that._renderAs(newValue);
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

                JQXLite(this.componentSelector).on('invalid', function (event) { that.$emit('invalid', event); });
            }
        }
    }
</script>
