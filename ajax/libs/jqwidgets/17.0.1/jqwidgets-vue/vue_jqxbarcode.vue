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
                default: true,
                type: Boolean
            },
            labelColor: String,
            labelFont: String,
            labelFontSize: Number,
            labelMarginBottom: Number,
            labelMarginTop: Number,
            labelPosition: String,
            lineColor: String,
            lineHeight: Number,
            lineWidth: Number,
            renderAs: String,
            type: String,
            value: String,
            autoCreate: {
                default: true,
                type: Boolean
            }
        },
        created: function () {
            this.id = 'jqxBarcode' + JQXLite.generateID();
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
                JQXLite(this.componentSelector).jqxBarcode(options);
            },
            getOptions: function () {
                const usedProps = Object.keys(this.__manageProps__());
                const resultToReturn = {};
                for (let i = 0; i < usedProps.length; i++) {
                    resultToReturn[usedProps[i]] = JQXLite(this.componentSelector).jqxBarcode(usedProps[i]);
                }
                return resultToReturn;
            },
            export: function(format, fileName) {
                return JQXLite(this.componentSelector).jqxBarcode('export', format, fileName);  
            },
            getDataURL: function(format) {
                return JQXLite(this.componentSelector).jqxBarcode('getDataURL', format);  
            },
            getDataURLAsync: function(format) {
                return JQXLite(this.componentSelector).jqxBarcode('getDataURLAsync', format);  
            },
            isValid: function() {
                return JQXLite(this.componentSelector).jqxBarcode('isValid');  
            },
            _backgroundColor: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxBarcode('backgroundColor', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxBarcode('backgroundColor');
                }
            },
            _displayLabel: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxBarcode('displayLabel', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxBarcode('displayLabel');
                }
            },
            _labelColor: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxBarcode('labelColor', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxBarcode('labelColor');
                }
            },
            _labelFont: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxBarcode('labelFont', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxBarcode('labelFont');
                }
            },
            _labelFontSize: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxBarcode('labelFontSize', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxBarcode('labelFontSize');
                }
            },
            _labelMarginBottom: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxBarcode('labelMarginBottom', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxBarcode('labelMarginBottom');
                }
            },
            _labelMarginTop: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxBarcode('labelMarginTop', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxBarcode('labelMarginTop');
                }
            },
            _labelPosition: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxBarcode('labelPosition', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxBarcode('labelPosition');
                }
            },
            _lineColor: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxBarcode('lineColor', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxBarcode('lineColor');
                }
            },
            _lineHeight: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxBarcode('lineHeight', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxBarcode('lineHeight');
                }
            },
            _lineWidth: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxBarcode('lineWidth', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxBarcode('lineWidth');
                }
            },
            _renderAs: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxBarcode('renderAs', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxBarcode('renderAs');
                }
            },
            _type: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxBarcode('type', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxBarcode('type');
                }
            },
            _value: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxBarcode('value', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxBarcode('value');
                }
            },
            __createComponent__: function (options) {
                let widgetOptions;
                options ? widgetOptions = options : widgetOptions = this.__manageProps__();
                JQXLite(this.componentSelector).jqxBarcode(widgetOptions);
                this.__extendProps__();
                this.__wireEvents__();
            },
            __manageProps__: function () {
                const widgetProps = ['backgroundColor','displayLabel','labelColor','labelFont','labelFontSize','labelMarginBottom','labelMarginTop','labelPosition','lineColor','lineHeight','lineWidth','renderAs','type','value'];
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
                Object.defineProperty(that, 'lineHeight', {
                    get: function() {
                        return that._lineHeight();
                    },
                    set: function(newValue) {
                        that._lineHeight(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'lineWidth', {
                    get: function() {
                        return that._lineWidth();
                    },
                    set: function(newValue) {
                        that._lineWidth(newValue);
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
                Object.defineProperty(that, 'type', {
                    get: function() {
                        return that._type();
                    },
                    set: function(newValue) {
                        that._type(newValue);
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
