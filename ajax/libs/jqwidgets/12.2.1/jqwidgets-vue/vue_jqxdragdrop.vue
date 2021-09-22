<template>
    <div v-bind:id="id">
        <slot></slot>
    </div>
</template>

<script>
    import '../jqwidgets/jqxcore.js';
    import '../jqwidgets/jqxdragdrop.js';

    export default {
        props: {
            appendTo: String,
            disabled: Boolean,
            distance: Number,
            data: Object,
            dropAction: String,
            dropTarget: [String, Object],
            dragZIndex: Number,
            feedback: String,
            initFeedback: Function,
            opacity: Number,
            onDragEnd: Function,
            onDrag: Function,
            onDragStart: Function,
            onTargetDrop: Function,
            onDropTargetEnter: Function,
            onDropTargetLeave: Function,
            restricter: [String, Object],
            revert: Boolean,
            revertDuration: Number,
            tolerance: String,
            autoCreate: {
                default: true,
                type: Boolean
            }
        },
        created: function () {
            this.id = 'jqxDragDrop' + JQXLite.generateID();
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
                JQXLite(this.componentSelector).jqxDragDrop(options);
            },
            getOptions: function () {
                const usedProps = Object.keys(this.__manageProps__());
                const resultToReturn = {};
                for (let i = 0; i < usedProps.length; i++) {
                    resultToReturn[usedProps[i]] = JQXLite(this.componentSelector).jqxDragDrop(usedProps[i]);
                }
                return resultToReturn;
            },
            _appendTo: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxDragDrop('appendTo', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxDragDrop('appendTo');
                }
            },
            _disabled: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxDragDrop('disabled', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxDragDrop('disabled');
                }
            },
            _distance: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxDragDrop('distance', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxDragDrop('distance');
                }
            },
            _data: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxDragDrop('data', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxDragDrop('data');
                }
            },
            _dropAction: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxDragDrop('dropAction', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxDragDrop('dropAction');
                }
            },
            _dropTarget: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxDragDrop('dropTarget', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxDragDrop('dropTarget');
                }
            },
            _dragZIndex: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxDragDrop('dragZIndex', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxDragDrop('dragZIndex');
                }
            },
            _feedback: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxDragDrop('feedback', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxDragDrop('feedback');
                }
            },
            _initFeedback: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxDragDrop('initFeedback', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxDragDrop('initFeedback');
                }
            },
            _opacity: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxDragDrop('opacity', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxDragDrop('opacity');
                }
            },
            _onDragEnd: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxDragDrop('onDragEnd', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxDragDrop('onDragEnd');
                }
            },
            _onDrag: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxDragDrop('onDrag', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxDragDrop('onDrag');
                }
            },
            _onDragStart: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxDragDrop('onDragStart', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxDragDrop('onDragStart');
                }
            },
            _onTargetDrop: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxDragDrop('onTargetDrop', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxDragDrop('onTargetDrop');
                }
            },
            _onDropTargetEnter: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxDragDrop('onDropTargetEnter', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxDragDrop('onDropTargetEnter');
                }
            },
            _onDropTargetLeave: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxDragDrop('onDropTargetLeave', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxDragDrop('onDropTargetLeave');
                }
            },
            _restricter: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxDragDrop('restricter', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxDragDrop('restricter');
                }
            },
            _revert: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxDragDrop('revert', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxDragDrop('revert');
                }
            },
            _revertDuration: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxDragDrop('revertDuration', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxDragDrop('revertDuration');
                }
            },
            _tolerance: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxDragDrop('tolerance', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxDragDrop('tolerance');
                }
            },
            __createComponent__: function (options) {
                let widgetOptions;
                options ? widgetOptions = options : widgetOptions = this.__manageProps__();
                JQXLite(this.componentSelector).jqxDragDrop(widgetOptions);
                this.__extendProps__();
                this.__wireEvents__();
            },
            __manageProps__: function () {
                const widgetProps = ['appendTo','disabled','distance','data','dropAction','dropTarget','dragZIndex','feedback','initFeedback','opacity','onDragEnd','onDrag','onDragStart','onTargetDrop','onDropTargetEnter','onDropTargetLeave','restricter','revert','revertDuration','tolerance'];
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

                Object.defineProperty(that, 'appendTo', {
                    get: function() {
                        return that._appendTo();
                    },
                    set: function(newValue) {
                        that._appendTo(newValue);
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
                Object.defineProperty(that, 'distance', {
                    get: function() {
                        return that._distance();
                    },
                    set: function(newValue) {
                        that._distance(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'data', {
                    get: function() {
                        return that._data();
                    },
                    set: function(newValue) {
                        that._data(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'dropAction', {
                    get: function() {
                        return that._dropAction();
                    },
                    set: function(newValue) {
                        that._dropAction(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'dropTarget', {
                    get: function() {
                        return that._dropTarget();
                    },
                    set: function(newValue) {
                        that._dropTarget(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'dragZIndex', {
                    get: function() {
                        return that._dragZIndex();
                    },
                    set: function(newValue) {
                        that._dragZIndex(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'feedback', {
                    get: function() {
                        return that._feedback();
                    },
                    set: function(newValue) {
                        that._feedback(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'initFeedback', {
                    get: function() {
                        return that._initFeedback();
                    },
                    set: function(newValue) {
                        that._initFeedback(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'opacity', {
                    get: function() {
                        return that._opacity();
                    },
                    set: function(newValue) {
                        that._opacity(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'onDragEnd', {
                    get: function() {
                        return that._onDragEnd();
                    },
                    set: function(newValue) {
                        that._onDragEnd(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'onDrag', {
                    get: function() {
                        return that._onDrag();
                    },
                    set: function(newValue) {
                        that._onDrag(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'onDragStart', {
                    get: function() {
                        return that._onDragStart();
                    },
                    set: function(newValue) {
                        that._onDragStart(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'onTargetDrop', {
                    get: function() {
                        return that._onTargetDrop();
                    },
                    set: function(newValue) {
                        that._onTargetDrop(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'onDropTargetEnter', {
                    get: function() {
                        return that._onDropTargetEnter();
                    },
                    set: function(newValue) {
                        that._onDropTargetEnter(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'onDropTargetLeave', {
                    get: function() {
                        return that._onDropTargetLeave();
                    },
                    set: function(newValue) {
                        that._onDropTargetLeave(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'restricter', {
                    get: function() {
                        return that._restricter();
                    },
                    set: function(newValue) {
                        that._restricter(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'revert', {
                    get: function() {
                        return that._revert();
                    },
                    set: function(newValue) {
                        that._revert(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'revertDuration', {
                    get: function() {
                        return that._revertDuration();
                    },
                    set: function(newValue) {
                        that._revertDuration(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'tolerance', {
                    get: function() {
                        return that._tolerance();
                    },
                    set: function(newValue) {
                        that._tolerance(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
            },
            __wireEvents__: function () {
                const that = this;

                JQXLite(this.componentSelector).on('dragStart', function (event) { that.$emit('dragStart', event); });
                JQXLite(this.componentSelector).on('dragEnd', function (event) { that.$emit('dragEnd', event); });
                JQXLite(this.componentSelector).on('dragging', function (event) { that.$emit('dragging', event); });
                JQXLite(this.componentSelector).on('dropTargetEnter', function (event) { that.$emit('dropTargetEnter', event); });
                JQXLite(this.componentSelector).on('dropTargetLeave', function (event) { that.$emit('dropTargetLeave', event); });
            }
        }
    }
</script>
