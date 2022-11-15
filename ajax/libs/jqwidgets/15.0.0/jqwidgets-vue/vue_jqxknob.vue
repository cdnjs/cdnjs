<template>
    <div v-bind:id="id">
        <slot></slot>
    </div>
</template>

<script>
    import '../jqwidgets/jqxcore.js';
    import '../jqwidgets/jqxdraw.js';
    import '../jqwidgets/jqxknob.js';

    export default {
        props: {
            allowValueChangeOnClick: Boolean,
            allowValueChangeOnDrag: Boolean,
            allowValueChangeOnMouseWheel: Boolean,
            changing: Function,
            dragEndAngle: Number,
            dragStartAngle: Number,
            disabled: Boolean,
            dial: Object,
            endAngle: Number,
            height: [Number, String],
            labels: Object,
            marks: Object,
            min: Number,
            max: Number,
            progressBar: Object,
            pointer: [Array, Object],
            pointerGrabAction: String,
            rotation: String,
            startAngle: Number,
            spinner: Object,
            styles: Object,
            step: [Number, String],
            snapToStep: Boolean,
            value: [Number, Array],
            width: [Number, String],
            autoCreate: {
                default: true,
                type: Boolean
            }
        },
        created: function () {
            this.id = 'jqxKnob' + JQXLite.generateID();
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
                JQXLite(this.componentSelector).jqxKnob(options);
            },
            getOptions: function () {
                const usedProps = Object.keys(this.__manageProps__());
                const resultToReturn = {};
                for (let i = 0; i < usedProps.length; i++) {
                    resultToReturn[usedProps[i]] = JQXLite(this.componentSelector).jqxKnob(usedProps[i]);
                }
                return resultToReturn;
            },
            destroy: function() {
                JQXLite(this.componentSelector).jqxKnob('destroy');  
            },
            val: function(value) {
                if (value !== undefined) {
                    JQXLite(this.componentSelector).jqxKnob('val',  value)
                } else {
                    return JQXLite(this.componentSelector).jqxKnob('val');
                }
            },
            _allowValueChangeOnClick: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxKnob('allowValueChangeOnClick', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxKnob('allowValueChangeOnClick');
                }
            },
            _allowValueChangeOnDrag: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxKnob('allowValueChangeOnDrag', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxKnob('allowValueChangeOnDrag');
                }
            },
            _allowValueChangeOnMouseWheel: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxKnob('allowValueChangeOnMouseWheel', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxKnob('allowValueChangeOnMouseWheel');
                }
            },
            _changing: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxKnob('changing', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxKnob('changing');
                }
            },
            _dragEndAngle: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxKnob('dragEndAngle', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxKnob('dragEndAngle');
                }
            },
            _dragStartAngle: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxKnob('dragStartAngle', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxKnob('dragStartAngle');
                }
            },
            _disabled: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxKnob('disabled', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxKnob('disabled');
                }
            },
            _dial: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxKnob('dial', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxKnob('dial');
                }
            },
            _endAngle: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxKnob('endAngle', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxKnob('endAngle');
                }
            },
            _height: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxKnob('height', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxKnob('height');
                }
            },
            _labels: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxKnob('labels', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxKnob('labels');
                }
            },
            _marks: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxKnob('marks', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxKnob('marks');
                }
            },
            _min: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxKnob('min', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxKnob('min');
                }
            },
            _max: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxKnob('max', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxKnob('max');
                }
            },
            _progressBar: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxKnob('progressBar', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxKnob('progressBar');
                }
            },
            _pointer: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxKnob('pointer', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxKnob('pointer');
                }
            },
            _pointerGrabAction: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxKnob('pointerGrabAction', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxKnob('pointerGrabAction');
                }
            },
            _rotation: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxKnob('rotation', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxKnob('rotation');
                }
            },
            _startAngle: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxKnob('startAngle', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxKnob('startAngle');
                }
            },
            _spinner: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxKnob('spinner', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxKnob('spinner');
                }
            },
            _styles: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxKnob('styles', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxKnob('styles');
                }
            },
            _step: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxKnob('step', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxKnob('step');
                }
            },
            _snapToStep: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxKnob('snapToStep', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxKnob('snapToStep');
                }
            },
            _value: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxKnob('value', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxKnob('value');
                }
            },
            _width: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxKnob('width', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxKnob('width');
                }
            },
            __createComponent__: function (options) {
                let widgetOptions;
                options ? widgetOptions = options : widgetOptions = this.__manageProps__();
                JQXLite(this.componentSelector).jqxKnob(widgetOptions);
                this.__extendProps__();
                this.__wireEvents__();
            },
            __manageProps__: function () {
                const widgetProps = ['allowValueChangeOnClick','allowValueChangeOnDrag','allowValueChangeOnMouseWheel','changing','dragEndAngle','dragStartAngle','disabled','dial','endAngle','height','labels','marks','min','max','progressBar','pointer','pointerGrabAction','rotation','startAngle','spinner','styles','step','snapToStep','value','width'];
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

                Object.defineProperty(that, 'allowValueChangeOnClick', {
                    get: function() {
                        return that._allowValueChangeOnClick();
                    },
                    set: function(newValue) {
                        that._allowValueChangeOnClick(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'allowValueChangeOnDrag', {
                    get: function() {
                        return that._allowValueChangeOnDrag();
                    },
                    set: function(newValue) {
                        that._allowValueChangeOnDrag(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'allowValueChangeOnMouseWheel', {
                    get: function() {
                        return that._allowValueChangeOnMouseWheel();
                    },
                    set: function(newValue) {
                        that._allowValueChangeOnMouseWheel(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'changing', {
                    get: function() {
                        return that._changing();
                    },
                    set: function(newValue) {
                        that._changing(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'dragEndAngle', {
                    get: function() {
                        return that._dragEndAngle();
                    },
                    set: function(newValue) {
                        that._dragEndAngle(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'dragStartAngle', {
                    get: function() {
                        return that._dragStartAngle();
                    },
                    set: function(newValue) {
                        that._dragStartAngle(newValue);
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
                Object.defineProperty(that, 'dial', {
                    get: function() {
                        return that._dial();
                    },
                    set: function(newValue) {
                        that._dial(newValue);
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
                Object.defineProperty(that, 'marks', {
                    get: function() {
                        return that._marks();
                    },
                    set: function(newValue) {
                        that._marks(newValue);
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
                Object.defineProperty(that, 'progressBar', {
                    get: function() {
                        return that._progressBar();
                    },
                    set: function(newValue) {
                        that._progressBar(newValue);
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
                Object.defineProperty(that, 'pointerGrabAction', {
                    get: function() {
                        return that._pointerGrabAction();
                    },
                    set: function(newValue) {
                        that._pointerGrabAction(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'rotation', {
                    get: function() {
                        return that._rotation();
                    },
                    set: function(newValue) {
                        that._rotation(newValue);
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
                Object.defineProperty(that, 'spinner', {
                    get: function() {
                        return that._spinner();
                    },
                    set: function(newValue) {
                        that._spinner(newValue);
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
                Object.defineProperty(that, 'step', {
                    get: function() {
                        return that._step();
                    },
                    set: function(newValue) {
                        that._step(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'snapToStep', {
                    get: function() {
                        return that._snapToStep();
                    },
                    set: function(newValue) {
                        that._snapToStep(newValue);
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

                JQXLite(this.componentSelector).on('change', function (event) { that.$emit('change', event); });
            }
        }
    }
</script>
