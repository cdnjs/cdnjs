<template>
    <div v-bind:id="id">
        <slot></slot>
    </div>
</template>

<script>
    import '../jqwidgets/jqxcore.js';
    import '../jqwidgets/jqxdata.js';
    import '../jqwidgets/jqxtooltip.js';
    import '../jqwidgets/jqxbulletchart.js';

    export default {
        props: {
            animationDuration: Number,
            barSize: [String, Number],
            description: String,
            disabled: Boolean,
            height: [Number, String],
            labelsFormat: String,
            labelsFormatFunction: Function,
            orientation: String,
            pointer: Object,
            rtl: Boolean,
            ranges: Array,
            showTooltip: Boolean,
            target: Object,
            ticks: Object,
            title: String,
            tooltipFormatFunction: Function,
            width: [Number, String],
            autoCreate: {
                default: true,
                type: Boolean
            }
        },
        created: function () {
            this.id = 'jqxBulletChart' + JQXLite.generateID();
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
                JQXLite(this.componentSelector).jqxBulletChart(options);
            },
            getOptions: function () {
                const usedProps = Object.keys(this.__manageProps__());
                const resultToReturn = {};
                for (let i = 0; i < usedProps.length; i++) {
                    resultToReturn[usedProps[i]] = JQXLite(this.componentSelector).jqxBulletChart(usedProps[i]);
                }
                return resultToReturn;
            },
            destroy: function() {
                JQXLite(this.componentSelector).jqxBulletChart('destroy');  
            },
            render: function() {
                JQXLite(this.componentSelector).jqxBulletChart('render');  
            },
            refresh: function() {
                JQXLite(this.componentSelector).jqxBulletChart('refresh');  
            },
            val: function(value) {
                if (value !== undefined) {
                    JQXLite(this.componentSelector).jqxBulletChart('val',  value)
                } else {
                    return JQXLite(this.componentSelector).jqxBulletChart('val');
                }
            },
            _animationDuration: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxBulletChart('animationDuration', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxBulletChart('animationDuration');
                }
            },
            _barSize: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxBulletChart('barSize', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxBulletChart('barSize');
                }
            },
            _description: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxBulletChart('description', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxBulletChart('description');
                }
            },
            _disabled: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxBulletChart('disabled', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxBulletChart('disabled');
                }
            },
            _height: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxBulletChart('height', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxBulletChart('height');
                }
            },
            _labelsFormat: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxBulletChart('labelsFormat', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxBulletChart('labelsFormat');
                }
            },
            _labelsFormatFunction: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxBulletChart('labelsFormatFunction', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxBulletChart('labelsFormatFunction');
                }
            },
            _orientation: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxBulletChart('orientation', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxBulletChart('orientation');
                }
            },
            _pointer: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxBulletChart('pointer', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxBulletChart('pointer');
                }
            },
            _rtl: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxBulletChart('rtl', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxBulletChart('rtl');
                }
            },
            _ranges: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxBulletChart('ranges', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxBulletChart('ranges');
                }
            },
            _showTooltip: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxBulletChart('showTooltip', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxBulletChart('showTooltip');
                }
            },
            _target: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxBulletChart('target', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxBulletChart('target');
                }
            },
            _ticks: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxBulletChart('ticks', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxBulletChart('ticks');
                }
            },
            _title: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxBulletChart('title', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxBulletChart('title');
                }
            },
            _tooltipFormatFunction: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxBulletChart('tooltipFormatFunction', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxBulletChart('tooltipFormatFunction');
                }
            },
            _width: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxBulletChart('width', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxBulletChart('width');
                }
            },
            __createComponent__: function (options) {
                let widgetOptions;
                options ? widgetOptions = options : widgetOptions = this.__manageProps__();
                JQXLite(this.componentSelector).jqxBulletChart(widgetOptions);
                this.__extendProps__();
                this.__wireEvents__();
            },
            __manageProps__: function () {
                const widgetProps = ['animationDuration','barSize','description','disabled','height','labelsFormat','labelsFormatFunction','orientation','pointer','rtl','ranges','showTooltip','target','ticks','title','tooltipFormatFunction','width'];
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
                Object.defineProperty(that, 'barSize', {
                    get: function() {
                        return that._barSize();
                    },
                    set: function(newValue) {
                        that._barSize(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'description', {
                    get: function() {
                        return that._description();
                    },
                    set: function(newValue) {
                        that._description(newValue);
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
                Object.defineProperty(that, 'labelsFormat', {
                    get: function() {
                        return that._labelsFormat();
                    },
                    set: function(newValue) {
                        that._labelsFormat(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'labelsFormatFunction', {
                    get: function() {
                        return that._labelsFormatFunction();
                    },
                    set: function(newValue) {
                        that._labelsFormatFunction(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'orientation', {
                    get: function() {
                        return that._orientation();
                    },
                    set: function(newValue) {
                        that._orientation(newValue);
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
                Object.defineProperty(that, 'showTooltip', {
                    get: function() {
                        return that._showTooltip();
                    },
                    set: function(newValue) {
                        that._showTooltip(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'target', {
                    get: function() {
                        return that._target();
                    },
                    set: function(newValue) {
                        that._target(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'ticks', {
                    get: function() {
                        return that._ticks();
                    },
                    set: function(newValue) {
                        that._ticks(newValue);
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
                Object.defineProperty(that, 'tooltipFormatFunction', {
                    get: function() {
                        return that._tooltipFormatFunction();
                    },
                    set: function(newValue) {
                        that._tooltipFormatFunction(newValue);
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

                JQXLite(this.componentSelector).on('change', function (event) { that.$emit('change', event); });
            }
        }
    }
</script>
