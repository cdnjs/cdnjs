<template>
    <div v-bind:id="id">
        <slot></slot>
    </div>
</template>

<script>
    import '../jqwidgets/jqxcore.js';
    import '../jqwidgets/jqxheatmap.js';

    export default {
        props: {
            xAxis: Object,
            yAxis: Object,
            paletteSettings: Object,
            legendSettings: Object,
            source: Array,
            title: String,
            width: [String, Number],
            tooltipRender: Function,
            autoCreate: {
                default: true,
                type: Boolean
            }
        },
        created: function () {
            this.id = 'jqxHeatMap' + JQXLite.generateID();
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
                JQXLite(this.componentSelector).jqxHeatMap(options);
            },
            getOptions: function () {
                const usedProps = Object.keys(this.__manageProps__());
                const resultToReturn = {};
                for (let i = 0; i < usedProps.length; i++) {
                    resultToReturn[usedProps[i]] = JQXLite(this.componentSelector).jqxHeatMap(usedProps[i]);
                }
                return resultToReturn;
            },
            destroy: function() {
                JQXLite(this.componentSelector).jqxHeatMap('destroy');  
            },
            setLegendPosition: function(position) {
                JQXLite(this.componentSelector).jqxHeatMap('setLegendPosition', position);  
            },
            setOpposedXAxisPosition: function(opposedPosition) {
                JQXLite(this.componentSelector).jqxHeatMap('setOpposedXAxisPosition', opposedPosition);  
            },
            setOpposedYAxisPosition: function(opposedPosition) {
                JQXLite(this.componentSelector).jqxHeatMap('setOpposedYAxisPosition', opposedPosition);  
            },
            reverseXAxisPosition: function(isInversed) {
                JQXLite(this.componentSelector).jqxHeatMap('reverseXAxisPosition', isInversed);  
            },
            reverseYAxisPosition: function(isInversed) {
                JQXLite(this.componentSelector).jqxHeatMap('reverseYAxisPosition', isInversed);  
            },
            setPaletteType: function(type) {
                JQXLite(this.componentSelector).jqxHeatMap('setPaletteType', type);  
            },
            _xAxis: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxHeatMap('xAxis', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxHeatMap('xAxis');
                }
            },
            _yAxis: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxHeatMap('yAxis', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxHeatMap('yAxis');
                }
            },
            _paletteSettings: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxHeatMap('paletteSettings', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxHeatMap('paletteSettings');
                }
            },
            _legendSettings: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxHeatMap('legendSettings', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxHeatMap('legendSettings');
                }
            },
            _source: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxHeatMap('source', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxHeatMap('source');
                }
            },
            _title: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxHeatMap('title', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxHeatMap('title');
                }
            },
            _width: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxHeatMap('width', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxHeatMap('width');
                }
            },
            _tooltipRender: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxHeatMap('tooltipRender', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxHeatMap('tooltipRender');
                }
            },
            __createComponent__: function (options) {
                let widgetOptions;
                options ? widgetOptions = options : widgetOptions = this.__manageProps__();
                JQXLite(this.componentSelector).jqxHeatMap(widgetOptions);
                this.__extendProps__();
                this.__wireEvents__();
            },
            __manageProps__: function () {
                const widgetProps = ['xAxis','yAxis','paletteSettings','legendSettings','source','title','width','tooltipRender'];
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

                Object.defineProperty(that, 'xAxis', {
                    get: function() {
                        return that._xAxis();
                    },
                    set: function(newValue) {
                        that._xAxis(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'yAxis', {
                    get: function() {
                        return that._yAxis();
                    },
                    set: function(newValue) {
                        that._yAxis(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'paletteSettings', {
                    get: function() {
                        return that._paletteSettings();
                    },
                    set: function(newValue) {
                        that._paletteSettings(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'legendSettings', {
                    get: function() {
                        return that._legendSettings();
                    },
                    set: function(newValue) {
                        that._legendSettings(newValue);
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
                Object.defineProperty(that, 'title', {
                    get: function() {
                        return that._title();
                    },
                    set: function(newValue) {
                        that._title(newValue);
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
                Object.defineProperty(that, 'tooltipRender', {
                    get: function() {
                        return that._tooltipRender();
                    },
                    set: function(newValue) {
                        that._tooltipRender(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
            },
            __wireEvents__: function () {
                const that = this;

            }
        }
    }
</script>
