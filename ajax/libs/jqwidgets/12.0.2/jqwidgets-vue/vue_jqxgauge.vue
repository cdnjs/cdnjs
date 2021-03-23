<template>
    <div v-bind:id="id">
        <slot></slot>
    </div>
</template>

<script>
    import '../jqwidgets/jqxcore.js';
    import '../jqwidgets/jqxdraw.js';
    import '../jqwidgets/jqxgauge.js';

    export default {
        props: {
            animationDuration: Number,
            border: Object,
            caption: Object,
            cap: [String, Object],
            colorScheme: String,
            disabled: Boolean,
            easing: String,
            endAngle: Number,
            height: [Number, String],
            int64: Boolean,
            labels: Object,
            min: Number,
            max: Number,
            pointer: Object,
            radius: Number,
            ranges: Array,
            startAngle: Number,
            showRanges: Boolean,
            styles: Object,
            ticksMajor: Object,
            ticksMinor: Object,
            ticksDistance: String,
            value: Number,
            width: [Number, String],
            autoCreate: {
                default: true,
                type: Boolean
            }
        },
        created: function () {
            this.id = 'jqxGauge' + JQXLite.generateID();
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
                JQXLite(this.componentSelector).jqxGauge(options);
            },
            getOptions: function () {
                const usedProps = Object.keys(this.__manageProps__());
                const resultToReturn = {};
                for (let i = 0; i < usedProps.length; i++) {
                    resultToReturn[usedProps[i]] = JQXLite(this.componentSelector).jqxGauge(usedProps[i]);
                }
                return resultToReturn;
            },
            disable: function() {
                JQXLite(this.componentSelector).jqxGauge('disable');  
            },
            enable: function() {
                JQXLite(this.componentSelector).jqxGauge('enable');  
            },
            val: function(value) {
                if (value !== undefined) {
                    JQXLite(this.componentSelector).jqxGauge('val',  value)
                } else {
                    return JQXLite(this.componentSelector).jqxGauge('val');
                }
            },
            _animationDuration: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxGauge('animationDuration', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxGauge('animationDuration');
                }
            },
            _border: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxGauge('border', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxGauge('border');
                }
            },
            _caption: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxGauge('caption', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxGauge('caption');
                }
            },
            _cap: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxGauge('cap', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxGauge('cap');
                }
            },
            _colorScheme: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxGauge('colorScheme', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxGauge('colorScheme');
                }
            },
            _disabled: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxGauge('disabled', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxGauge('disabled');
                }
            },
            _easing: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxGauge('easing', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxGauge('easing');
                }
            },
            _endAngle: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxGauge('endAngle', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxGauge('endAngle');
                }
            },
            _height: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxGauge('height', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxGauge('height');
                }
            },
            _int64: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxGauge('int64', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxGauge('int64');
                }
            },
            _labels: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxGauge('labels', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxGauge('labels');
                }
            },
            _min: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxGauge('min', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxGauge('min');
                }
            },
            _max: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxGauge('max', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxGauge('max');
                }
            },
            _pointer: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxGauge('pointer', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxGauge('pointer');
                }
            },
            _radius: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxGauge('radius', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxGauge('radius');
                }
            },
            _ranges: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxGauge('ranges', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxGauge('ranges');
                }
            },
            _startAngle: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxGauge('startAngle', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxGauge('startAngle');
                }
            },
            _showRanges: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxGauge('showRanges', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxGauge('showRanges');
                }
            },
            _styles: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxGauge('styles', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxGauge('styles');
                }
            },
            _ticksMajor: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxGauge('ticksMajor', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxGauge('ticksMajor');
                }
            },
            _ticksMinor: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxGauge('ticksMinor', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxGauge('ticksMinor');
                }
            },
            _ticksDistance: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxGauge('ticksDistance', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxGauge('ticksDistance');
                }
            },
            _value: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxGauge('value', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxGauge('value');
                }
            },
            _width: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxGauge('width', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxGauge('width');
                }
            },
            __createComponent__: function (options) {
                let widgetOptions;
                options ? widgetOptions = options : widgetOptions = this.__manageProps__();
                JQXLite(this.componentSelector).jqxGauge(widgetOptions);
                this.__extendProps__();
                this.__wireEvents__();
            },
            __manageProps__: function () {
                const widgetProps = ['animationDuration','border','caption','cap','colorScheme','disabled','easing','endAngle','height','int64','labels','min','max','pointer','radius','ranges','startAngle','showRanges','styles','ticksMajor','ticksMinor','ticksDistance','value','width'];
                const componentProps = this.$options.propsData;
                let options = {};

                for (let prop in componentProps) {
                    if (prop === 'styleProperty') prop = 'style'; 
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
                Object.defineProperty(that, 'border', {
                    get: function() {
                        return that._border();
                    },
                    set: function(newValue) {
                        that._border(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'caption', {
                    get: function() {
                        return that._caption();
                    },
                    set: function(newValue) {
                        that._caption(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'cap', {
                    get: function() {
                        return that._cap();
                    },
                    set: function(newValue) {
                        that._cap(newValue);
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
                Object.defineProperty(that, 'easing', {
                    get: function() {
                        return that._easing();
                    },
                    set: function(newValue) {
                        that._easing(newValue);
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
                Object.defineProperty(that, 'int64', {
                    get: function() {
                        return that._int64();
                    },
                    set: function(newValue) {
                        that._int64(newValue);
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
                Object.defineProperty(that, 'pointer', {
                    get: function() {
                        return that._pointer();
                    },
                    set: function(newValue) {
                        that._pointer(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'radius', {
                    get: function() {
                        return that._radius();
                    },
                    set: function(newValue) {
                        that._radius(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'ranges', {
                    get: function() {
                        return that._ranges();
                    },
                    set: function(newValue) {
                        that._ranges(newValue);
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
                Object.defineProperty(that, 'showRanges', {
                    get: function() {
                        return that._showRanges();
                    },
                    set: function(newValue) {
                        that._showRanges(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'styles', {
                    get: function() {
                        return that._styles();
                    },
                    set: function(newValue) {
                        that._styles(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'ticksMajor', {
                    get: function() {
                        return that._ticksMajor();
                    },
                    set: function(newValue) {
                        that._ticksMajor(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'ticksMinor', {
                    get: function() {
                        return that._ticksMinor();
                    },
                    set: function(newValue) {
                        that._ticksMinor(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'ticksDistance', {
                    get: function() {
                        return that._ticksDistance();
                    },
                    set: function(newValue) {
                        that._ticksDistance(newValue);
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

                JQXLite(this.componentSelector).on('valueChanging', function (event) { that.$emit('valueChanging', event); });
                JQXLite(this.componentSelector).on('valueChanged', function (event) { that.$emit('valueChanged', event); });
            }
        }
    }
</script>
