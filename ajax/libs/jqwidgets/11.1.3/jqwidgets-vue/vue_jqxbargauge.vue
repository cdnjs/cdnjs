<template>
    <div v-bind:id="id">
        <slot></slot>
    </div>
</template>

<script>
    import '../jqwidgets/jqxcore.js';
    import '../jqwidgets/jqxdraw.js';
    import '../jqwidgets/jqxbargauge.js';

    export default {
        props: {
            animationDuration: Number,
            backgroundColor: String,
            barSpacing: Number,
            baseValue: Number,
            colorScheme: String,
            customColorScheme: [String, Object],
            disabled: Boolean,
            endAngle: Number,
            formatFunction: [Object, Function],
            height: [Number, String],
            labels: Object,
            max: Number,
            min: Number,
            relativeInnerRadius: Number,
            rendered: Function,
            startAngle: Number,
            title: [Object, String],
            tooltip: Object,
            useGradient: Boolean,
            values: Array,
            width: [Number, String],
            autoCreate: {
                default: true,
                type: Boolean
            }
        },
        created: function () {
            this.id = 'jqxBarGauge' + JQXLite.generateID();
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
                JQXLite(this.componentSelector).jqxBarGauge(options);
            },
            getOptions: function () {
                const usedProps = Object.keys(this.__manageProps__());
                const resultToReturn = {};
                for (let i = 0; i < usedProps.length; i++) {
                    resultToReturn[usedProps[i]] = JQXLite(this.componentSelector).jqxBarGauge(usedProps[i]);
                }
                return resultToReturn;
            },
            refresh: function() {
                JQXLite(this.componentSelector).jqxBarGauge('refresh');  
            },
            render: function() {
                JQXLite(this.componentSelector).jqxBarGauge('render');  
            },
            val: function(value) {
                if (value !== undefined) {
                    JQXLite(this.componentSelector).jqxBarGauge('val',  value)
                } else {
                    return JQXLite(this.componentSelector).jqxBarGauge('val');
                }
            },
            _animationDuration: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxBarGauge('animationDuration', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxBarGauge('animationDuration');
                }
            },
            _backgroundColor: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxBarGauge('backgroundColor', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxBarGauge('backgroundColor');
                }
            },
            _barSpacing: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxBarGauge('barSpacing', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxBarGauge('barSpacing');
                }
            },
            _baseValue: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxBarGauge('baseValue', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxBarGauge('baseValue');
                }
            },
            _colorScheme: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxBarGauge('colorScheme', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxBarGauge('colorScheme');
                }
            },
            _customColorScheme: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxBarGauge('customColorScheme', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxBarGauge('customColorScheme');
                }
            },
            _disabled: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxBarGauge('disabled', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxBarGauge('disabled');
                }
            },
            _endAngle: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxBarGauge('endAngle', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxBarGauge('endAngle');
                }
            },
            _formatFunction: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxBarGauge('formatFunction', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxBarGauge('formatFunction');
                }
            },
            _height: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxBarGauge('height', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxBarGauge('height');
                }
            },
            _labels: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxBarGauge('labels', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxBarGauge('labels');
                }
            },
            _max: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxBarGauge('max', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxBarGauge('max');
                }
            },
            _min: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxBarGauge('min', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxBarGauge('min');
                }
            },
            _relativeInnerRadius: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxBarGauge('relativeInnerRadius', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxBarGauge('relativeInnerRadius');
                }
            },
            _rendered: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxBarGauge('rendered', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxBarGauge('rendered');
                }
            },
            _startAngle: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxBarGauge('startAngle', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxBarGauge('startAngle');
                }
            },
            _title: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxBarGauge('title', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxBarGauge('title');
                }
            },
            _tooltip: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxBarGauge('tooltip', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxBarGauge('tooltip');
                }
            },
            _useGradient: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxBarGauge('useGradient', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxBarGauge('useGradient');
                }
            },
            _values: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxBarGauge('values', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxBarGauge('values');
                }
            },
            _width: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxBarGauge('width', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxBarGauge('width');
                }
            },
            __createComponent__: function (options) {
                let widgetOptions;
                options ? widgetOptions = options : widgetOptions = this.__manageProps__();
                JQXLite(this.componentSelector).jqxBarGauge(widgetOptions);
                this.__extendProps__();
                this.__wireEvents__();
            },
            __manageProps__: function () {
                const widgetProps = ['animationDuration','backgroundColor','barSpacing','baseValue','colorScheme','customColorScheme','disabled','endAngle','formatFunction','height','labels','max','min','relativeInnerRadius','rendered','startAngle','title','tooltip','useGradient','values','width'];
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
                Object.defineProperty(that, 'barSpacing', {
                    get: function() {
                        return that._barSpacing();
                    },
                    set: function(newValue) {
                        that._barSpacing(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'baseValue', {
                    get: function() {
                        return that._baseValue();
                    },
                    set: function(newValue) {
                        that._baseValue(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'colorScheme', {
                    get: function() {
                        return that._colorScheme();
                    },
                    set: function(newValue) {
                        that._colorScheme(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'customColorScheme', {
                    get: function() {
                        return that._customColorScheme();
                    },
                    set: function(newValue) {
                        that._customColorScheme(newValue);
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
                Object.defineProperty(that, 'endAngle', {
                    get: function() {
                        return that._endAngle();
                    },
                    set: function(newValue) {
                        that._endAngle(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'formatFunction', {
                    get: function() {
                        return that._formatFunction();
                    },
                    set: function(newValue) {
                        that._formatFunction(newValue);
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
                Object.defineProperty(that, 'labels', {
                    get: function() {
                        return that._labels();
                    },
                    set: function(newValue) {
                        that._labels(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'max', {
                    get: function() {
                        return that._max();
                    },
                    set: function(newValue) {
                        that._max(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'min', {
                    get: function() {
                        return that._min();
                    },
                    set: function(newValue) {
                        that._min(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'relativeInnerRadius', {
                    get: function() {
                        return that._relativeInnerRadius();
                    },
                    set: function(newValue) {
                        that._relativeInnerRadius(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'rendered', {
                    get: function() {
                        return that._rendered();
                    },
                    set: function(newValue) {
                        that._rendered(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'startAngle', {
                    get: function() {
                        return that._startAngle();
                    },
                    set: function(newValue) {
                        that._startAngle(newValue);
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
                Object.defineProperty(that, 'tooltip', {
                    get: function() {
                        return that._tooltip();
                    },
                    set: function(newValue) {
                        that._tooltip(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'useGradient', {
                    get: function() {
                        return that._useGradient();
                    },
                    set: function(newValue) {
                        that._useGradient(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'values', {
                    get: function() {
                        return that._values();
                    },
                    set: function(newValue) {
                        that._values(newValue);
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

                JQXLite(this.componentSelector).on('drawEnd', function (event) { that.$emit('drawEnd', event); });
                JQXLite(this.componentSelector).on('drawStart', function (event) { that.$emit('drawStart', event); });
                JQXLite(this.componentSelector).on('initialized', function (event) { that.$emit('initialized', event); });
                JQXLite(this.componentSelector).on('tooltipClose', function (event) { that.$emit('tooltipClose', event); });
                JQXLite(this.componentSelector).on('tooltipOpen', function (event) { that.$emit('tooltipOpen', event); });
                JQXLite(this.componentSelector).on('valueChanged', function (event) { that.$emit('valueChanged', event); });
            }
        }
    }
</script>
