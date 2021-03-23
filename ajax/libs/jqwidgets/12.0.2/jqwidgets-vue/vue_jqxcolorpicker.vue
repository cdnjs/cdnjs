<template>
    <div v-bind:id="id">
        <slot></slot>
    </div>
</template>

<script>
    import '../jqwidgets/jqxcore.js';
    import '../jqwidgets/jqxbuttons.js';
    import '../jqwidgets/jqxdropdownbutton.js';
    import '../jqwidgets/jqxradiobutton.js';
    import '../jqwidgets/jqxcolorpicker.js';

    export default {
        props: {
            color: String,
            colorMode: String,
            disabled: Boolean,
            height: [Number, String],
            showTransparent: Boolean,
            width: [Number, String],
            autoCreate: {
                default: true,
                type: Boolean
            }
        },
        created: function () {
            this.id = 'jqxColorPicker' + JQXLite.generateID();
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
                JQXLite(this.componentSelector).jqxColorPicker(options);
            },
            getOptions: function () {
                const usedProps = Object.keys(this.__manageProps__());
                const resultToReturn = {};
                for (let i = 0; i < usedProps.length; i++) {
                    resultToReturn[usedProps[i]] = JQXLite(this.componentSelector).jqxColorPicker(usedProps[i]);
                }
                return resultToReturn;
            },
            getColor: function() {
                return JQXLite(this.componentSelector).jqxColorPicker('getColor');  
            },
            setColor: function(color) {
                JQXLite(this.componentSelector).jqxColorPicker('setColor', color);  
            },
            _color: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxColorPicker('color', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxColorPicker('color');
                }
            },
            _colorMode: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxColorPicker('colorMode', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxColorPicker('colorMode');
                }
            },
            _disabled: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxColorPicker('disabled', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxColorPicker('disabled');
                }
            },
            _height: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxColorPicker('height', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxColorPicker('height');
                }
            },
            _showTransparent: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxColorPicker('showTransparent', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxColorPicker('showTransparent');
                }
            },
            _width: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxColorPicker('width', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxColorPicker('width');
                }
            },
            __createComponent__: function (options) {
                let widgetOptions;
                options ? widgetOptions = options : widgetOptions = this.__manageProps__();
                JQXLite(this.componentSelector).jqxColorPicker(widgetOptions);
                this.__extendProps__();
                this.__wireEvents__();
            },
            __manageProps__: function () {
                const widgetProps = ['color','colorMode','disabled','height','showTransparent','width'];
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

                Object.defineProperty(that, 'color', {
                    get: function() {
                        return that._color();
                    },
                    set: function(newValue) {
                        that._color(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'colorMode', {
                    get: function() {
                        return that._colorMode();
                    },
                    set: function(newValue) {
                        that._colorMode(newValue);
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
                Object.defineProperty(that, 'showTransparent', {
                    get: function() {
                        return that._showTransparent();
                    },
                    set: function(newValue) {
                        that._showTransparent(newValue);
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

                JQXLite(this.componentSelector).on('colorchange', function (event) { that.$emit('colorchange', event); });
            }
        }
    }
</script>
