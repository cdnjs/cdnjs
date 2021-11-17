<template>
    <div v-bind:id="id">
        <slot></slot>
    </div>
</template>

<script>
    import '../jqwidgets/jqxcore.js';
    import '../jqwidgets/jqxdata.js';
    import '../jqwidgets/jqxtreemap.js';
    import '../jqwidgets/jqxtooltip.js';

    export default {
        props: {
            baseColor: String,
            colorRanges: [Array, Object],
            colorRange: Number,
            colorMode: String,
            displayMember: String,
            height: [Number, String],
            hoverEnabled: Boolean,
            headerHeight: Number,
            legendLabel: String,
            legendPosition: Object,
            legendScaleCallback: Function,
            renderCallbacks: Object,
            selectionEnabled: Boolean,
            showLegend: Boolean,
            source: [Object, Array],
            theme: String,
            valueMember: String,
            width: [Number, String],
            autoCreate: {
                default: true,
                type: Boolean
            }
        },
        created: function () {
            this.id = 'jqxTreeMap' + JQXLite.generateID();
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
                JQXLite(this.componentSelector).jqxTreeMap(options);
            },
            getOptions: function () {
                const usedProps = Object.keys(this.__manageProps__());
                const resultToReturn = {};
                for (let i = 0; i < usedProps.length; i++) {
                    resultToReturn[usedProps[i]] = JQXLite(this.componentSelector).jqxTreeMap(usedProps[i]);
                }
                return resultToReturn;
            },
            destroy: function() {
                JQXLite(this.componentSelector).jqxTreeMap('destroy');  
            },
            render: function() {
                JQXLite(this.componentSelector).jqxTreeMap('render');  
            },
            _baseColor: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxTreeMap('baseColor', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxTreeMap('baseColor');
                }
            },
            _colorRanges: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxTreeMap('colorRanges', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxTreeMap('colorRanges');
                }
            },
            _colorRange: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxTreeMap('colorRange', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxTreeMap('colorRange');
                }
            },
            _colorMode: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxTreeMap('colorMode', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxTreeMap('colorMode');
                }
            },
            _displayMember: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxTreeMap('displayMember', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxTreeMap('displayMember');
                }
            },
            _height: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxTreeMap('height', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxTreeMap('height');
                }
            },
            _hoverEnabled: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxTreeMap('hoverEnabled', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxTreeMap('hoverEnabled');
                }
            },
            _headerHeight: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxTreeMap('headerHeight', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxTreeMap('headerHeight');
                }
            },
            _legendLabel: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxTreeMap('legendLabel', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxTreeMap('legendLabel');
                }
            },
            _legendPosition: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxTreeMap('legendPosition', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxTreeMap('legendPosition');
                }
            },
            _legendScaleCallback: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxTreeMap('legendScaleCallback', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxTreeMap('legendScaleCallback');
                }
            },
            _renderCallbacks: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxTreeMap('renderCallbacks', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxTreeMap('renderCallbacks');
                }
            },
            _selectionEnabled: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxTreeMap('selectionEnabled', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxTreeMap('selectionEnabled');
                }
            },
            _showLegend: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxTreeMap('showLegend', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxTreeMap('showLegend');
                }
            },
            _source: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxTreeMap('source', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxTreeMap('source');
                }
            },
            _theme: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxTreeMap('theme', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxTreeMap('theme');
                }
            },
            _valueMember: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxTreeMap('valueMember', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxTreeMap('valueMember');
                }
            },
            _width: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxTreeMap('width', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxTreeMap('width');
                }
            },
            __createComponent__: function (options) {
                let widgetOptions;
                options ? widgetOptions = options : widgetOptions = this.__manageProps__();
                JQXLite(this.componentSelector).jqxTreeMap(widgetOptions);
                this.__extendProps__();
                this.__wireEvents__();
            },
            __manageProps__: function () {
                const widgetProps = ['baseColor','colorRanges','colorRange','colorMode','displayMember','height','hoverEnabled','headerHeight','legendLabel','legendPosition','legendScaleCallback','renderCallbacks','selectionEnabled','showLegend','source','theme','valueMember','width'];
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

                Object.defineProperty(that, 'baseColor', {
                    get: function() {
                        return that._baseColor();
                    },
                    set: function(newValue) {
                        that._baseColor(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'colorRanges', {
                    get: function() {
                        return that._colorRanges();
                    },
                    set: function(newValue) {
                        that._colorRanges(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'colorRange', {
                    get: function() {
                        return that._colorRange();
                    },
                    set: function(newValue) {
                        that._colorRange(newValue);
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
                Object.defineProperty(that, 'displayMember', {
                    get: function() {
                        return that._displayMember();
                    },
                    set: function(newValue) {
                        that._displayMember(newValue);
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
                Object.defineProperty(that, 'hoverEnabled', {
                    get: function() {
                        return that._hoverEnabled();
                    },
                    set: function(newValue) {
                        that._hoverEnabled(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'headerHeight', {
                    get: function() {
                        return that._headerHeight();
                    },
                    set: function(newValue) {
                        that._headerHeight(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'legendLabel', {
                    get: function() {
                        return that._legendLabel();
                    },
                    set: function(newValue) {
                        that._legendLabel(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'legendPosition', {
                    get: function() {
                        return that._legendPosition();
                    },
                    set: function(newValue) {
                        that._legendPosition(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'legendScaleCallback', {
                    get: function() {
                        return that._legendScaleCallback();
                    },
                    set: function(newValue) {
                        that._legendScaleCallback(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'renderCallbacks', {
                    get: function() {
                        return that._renderCallbacks();
                    },
                    set: function(newValue) {
                        that._renderCallbacks(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'selectionEnabled', {
                    get: function() {
                        return that._selectionEnabled();
                    },
                    set: function(newValue) {
                        that._selectionEnabled(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'showLegend', {
                    get: function() {
                        return that._showLegend();
                    },
                    set: function(newValue) {
                        that._showLegend(newValue);
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
                Object.defineProperty(that, 'valueMember', {
                    get: function() {
                        return that._valueMember();
                    },
                    set: function(newValue) {
                        that._valueMember(newValue);
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

                JQXLite(this.componentSelector).on('bindingComplete', function (event) { that.$emit('bindingComplete', event); });
            }
        }
    }
</script>
