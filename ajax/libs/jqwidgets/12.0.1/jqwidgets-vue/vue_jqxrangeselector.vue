<template>
    <div v-bind:id="id">
        <slot></slot>
    </div>
</template>

<script>
    import '../jqwidgets/jqxcore.js';
    import '../jqwidgets/jqxdata.js';
    import '../jqwidgets/jqxtooltip.js';
    import '../jqwidgets/jqxrangeselector.js';

    export default {
        props: {
            disabled: Boolean,
            groupLabelsFormatFunction: Function,
            height: [Number, String],
            labelsFormat: String,
            labelsFormatFunction: Function,
            labelsOnTicks: Boolean,
            markersFormat: String,
            markersFormatFunction: Function,
            majorTicksInterval: [Number, String, Object],
            minorTicksInterval: [Number, String, Object],
            max: [Number, String, Date],
            min: [Number, String, Date],
            moveOnClick: Boolean,
            padding: [String, Number],
            range: Object,
            resizable: Boolean,
            rtl: Boolean,
            showGroupLabels: Boolean,
            showMinorTicks: Boolean,
            snapToTicks: Boolean,
            showMajorLabels: Boolean,
            showMarkers: Boolean,
            theme: String,
            width: [Number, String],
            autoCreate: {
                default: true,
                type: Boolean
            }
        },
        created: function () {
            this.id = 'jqxRangeSelector' + JQXLite.generateID();
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
                JQXLite(this.componentSelector).jqxRangeSelector(options);
            },
            getOptions: function () {
                const usedProps = Object.keys(this.__manageProps__());
                const resultToReturn = {};
                for (let i = 0; i < usedProps.length; i++) {
                    resultToReturn[usedProps[i]] = JQXLite(this.componentSelector).jqxRangeSelector(usedProps[i]);
                }
                return resultToReturn;
            },
            destroy: function() {
                JQXLite(this.componentSelector).jqxRangeSelector('destroy');  
            },
            getRange: function() {
                return JQXLite(this.componentSelector).jqxRangeSelector('getRange');  
            },
            render: function() {
                JQXLite(this.componentSelector).jqxRangeSelector('render');  
            },
            refresh: function() {
                JQXLite(this.componentSelector).jqxRangeSelector('refresh');  
            },
            setRange: function(from, to) {
                JQXLite(this.componentSelector).jqxRangeSelector('setRange', from, to);  
            },
            _disabled: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxRangeSelector('disabled', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxRangeSelector('disabled');
                }
            },
            _groupLabelsFormatFunction: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxRangeSelector('groupLabelsFormatFunction', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxRangeSelector('groupLabelsFormatFunction');
                }
            },
            _height: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxRangeSelector('height', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxRangeSelector('height');
                }
            },
            _labelsFormat: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxRangeSelector('labelsFormat', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxRangeSelector('labelsFormat');
                }
            },
            _labelsFormatFunction: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxRangeSelector('labelsFormatFunction', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxRangeSelector('labelsFormatFunction');
                }
            },
            _labelsOnTicks: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxRangeSelector('labelsOnTicks', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxRangeSelector('labelsOnTicks');
                }
            },
            _markersFormat: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxRangeSelector('markersFormat', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxRangeSelector('markersFormat');
                }
            },
            _markersFormatFunction: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxRangeSelector('markersFormatFunction', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxRangeSelector('markersFormatFunction');
                }
            },
            _majorTicksInterval: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxRangeSelector('majorTicksInterval', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxRangeSelector('majorTicksInterval');
                }
            },
            _minorTicksInterval: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxRangeSelector('minorTicksInterval', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxRangeSelector('minorTicksInterval');
                }
            },
            _max: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxRangeSelector('max', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxRangeSelector('max');
                }
            },
            _min: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxRangeSelector('min', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxRangeSelector('min');
                }
            },
            _moveOnClick: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxRangeSelector('moveOnClick', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxRangeSelector('moveOnClick');
                }
            },
            _padding: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxRangeSelector('padding', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxRangeSelector('padding');
                }
            },
            _range: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxRangeSelector('range', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxRangeSelector('range');
                }
            },
            _resizable: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxRangeSelector('resizable', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxRangeSelector('resizable');
                }
            },
            _rtl: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxRangeSelector('rtl', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxRangeSelector('rtl');
                }
            },
            _showGroupLabels: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxRangeSelector('showGroupLabels', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxRangeSelector('showGroupLabels');
                }
            },
            _showMinorTicks: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxRangeSelector('showMinorTicks', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxRangeSelector('showMinorTicks');
                }
            },
            _snapToTicks: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxRangeSelector('snapToTicks', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxRangeSelector('snapToTicks');
                }
            },
            _showMajorLabels: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxRangeSelector('showMajorLabels', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxRangeSelector('showMajorLabels');
                }
            },
            _showMarkers: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxRangeSelector('showMarkers', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxRangeSelector('showMarkers');
                }
            },
            _theme: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxRangeSelector('theme', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxRangeSelector('theme');
                }
            },
            _width: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxRangeSelector('width', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxRangeSelector('width');
                }
            },
            __createComponent__: function (options) {
                let widgetOptions;
                options ? widgetOptions = options : widgetOptions = this.__manageProps__();
                JQXLite(this.componentSelector).jqxRangeSelector(widgetOptions);
                this.__extendProps__();
                this.__wireEvents__();
            },
            __manageProps__: function () {
                const widgetProps = ['disabled','groupLabelsFormatFunction','height','labelsFormat','labelsFormatFunction','labelsOnTicks','markersFormat','markersFormatFunction','majorTicksInterval','minorTicksInterval','max','min','moveOnClick','padding','range','resizable','rtl','showGroupLabels','showMinorTicks','snapToTicks','showMajorLabels','showMarkers','theme','width'];
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
                Object.defineProperty(that, 'groupLabelsFormatFunction', {
                    get: function() {
                        return that._groupLabelsFormatFunction();
                    },
                    set: function(newValue) {
                        that._groupLabelsFormatFunction(newValue);
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
                Object.defineProperty(that, 'labelsOnTicks', {
                    get: function() {
                        return that._labelsOnTicks();
                    },
                    set: function(newValue) {
                        that._labelsOnTicks(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'markersFormat', {
                    get: function() {
                        return that._markersFormat();
                    },
                    set: function(newValue) {
                        that._markersFormat(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'markersFormatFunction', {
                    get: function() {
                        return that._markersFormatFunction();
                    },
                    set: function(newValue) {
                        that._markersFormatFunction(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'majorTicksInterval', {
                    get: function() {
                        return that._majorTicksInterval();
                    },
                    set: function(newValue) {
                        that._majorTicksInterval(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'minorTicksInterval', {
                    get: function() {
                        return that._minorTicksInterval();
                    },
                    set: function(newValue) {
                        that._minorTicksInterval(newValue);
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
                Object.defineProperty(that, 'moveOnClick', {
                    get: function() {
                        return that._moveOnClick();
                    },
                    set: function(newValue) {
                        that._moveOnClick(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'padding', {
                    get: function() {
                        return that._padding();
                    },
                    set: function(newValue) {
                        that._padding(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'range', {
                    get: function() {
                        return that._range();
                    },
                    set: function(newValue) {
                        that._range(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'resizable', {
                    get: function() {
                        return that._resizable();
                    },
                    set: function(newValue) {
                        that._resizable(newValue);
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
                Object.defineProperty(that, 'showGroupLabels', {
                    get: function() {
                        return that._showGroupLabels();
                    },
                    set: function(newValue) {
                        that._showGroupLabels(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'showMinorTicks', {
                    get: function() {
                        return that._showMinorTicks();
                    },
                    set: function(newValue) {
                        that._showMinorTicks(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'snapToTicks', {
                    get: function() {
                        return that._snapToTicks();
                    },
                    set: function(newValue) {
                        that._snapToTicks(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'showMajorLabels', {
                    get: function() {
                        return that._showMajorLabels();
                    },
                    set: function(newValue) {
                        that._showMajorLabels(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'showMarkers', {
                    get: function() {
                        return that._showMarkers();
                    },
                    set: function(newValue) {
                        that._showMarkers(newValue);
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
