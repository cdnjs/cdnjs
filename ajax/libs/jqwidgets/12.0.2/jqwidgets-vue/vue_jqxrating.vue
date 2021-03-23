<template>
    <div v-bind:id="id">
        <slot></slot>
    </div>
</template>

<script>
    import '../jqwidgets/jqxcore.js';
    import '../jqwidgets/jqxrating.js';

    export default {
        props: {
            count: Number,
            disabled: Boolean,
            height: [Number, String],
            itemHeight: Number,
            itemWidth: Number,
            precision: Number,
            singleVote: Boolean,
            value: Number,
            width: [Number, String],
            autoCreate: {
                default: true,
                type: Boolean
            }
        },
        created: function () {
            this.id = 'jqxRating' + JQXLite.generateID();
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
                JQXLite(this.componentSelector).jqxRating(options);
            },
            getOptions: function () {
                const usedProps = Object.keys(this.__manageProps__());
                const resultToReturn = {};
                for (let i = 0; i < usedProps.length; i++) {
                    resultToReturn[usedProps[i]] = JQXLite(this.componentSelector).jqxRating(usedProps[i]);
                }
                return resultToReturn;
            },
            disable: function() {
                JQXLite(this.componentSelector).jqxRating('disable');  
            },
            enable: function() {
                JQXLite(this.componentSelector).jqxRating('enable');  
            },
            getValue: function() {
                return JQXLite(this.componentSelector).jqxRating('getValue');  
            },
            setValue: function(value) {
                JQXLite(this.componentSelector).jqxRating('setValue', value);  
            },
            val: function(value) {
                if (value !== undefined) {
                    JQXLite(this.componentSelector).jqxRating('val',  value)
                } else {
                    return JQXLite(this.componentSelector).jqxRating('val');
                }
            },
            _count: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxRating('count', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxRating('count');
                }
            },
            _disabled: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxRating('disabled', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxRating('disabled');
                }
            },
            _height: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxRating('height', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxRating('height');
                }
            },
            _itemHeight: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxRating('itemHeight', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxRating('itemHeight');
                }
            },
            _itemWidth: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxRating('itemWidth', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxRating('itemWidth');
                }
            },
            _precision: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxRating('precision', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxRating('precision');
                }
            },
            _singleVote: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxRating('singleVote', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxRating('singleVote');
                }
            },
            _value: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxRating('value', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxRating('value');
                }
            },
            _width: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxRating('width', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxRating('width');
                }
            },
            __createComponent__: function (options) {
                let widgetOptions;
                options ? widgetOptions = options : widgetOptions = this.__manageProps__();
                JQXLite(this.componentSelector).jqxRating(widgetOptions);
                this.__extendProps__();
                this.__wireEvents__();
            },
            __manageProps__: function () {
                const widgetProps = ['count','disabled','height','itemHeight','itemWidth','precision','singleVote','value','width'];
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

                Object.defineProperty(that, 'count', {
                    get: function() {
                        return that._count();
                    },
                    set: function(newValue) {
                        that._count(newValue);
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
                Object.defineProperty(that, 'itemHeight', {
                    get: function() {
                        return that._itemHeight();
                    },
                    set: function(newValue) {
                        that._itemHeight(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'itemWidth', {
                    get: function() {
                        return that._itemWidth();
                    },
                    set: function(newValue) {
                        that._itemWidth(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'precision', {
                    get: function() {
                        return that._precision();
                    },
                    set: function(newValue) {
                        that._precision(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'singleVote', {
                    get: function() {
                        return that._singleVote();
                    },
                    set: function(newValue) {
                        that._singleVote(newValue);
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
            __twoWayDataBinding__: function () {
                const value = JQXLite(this.componentSelector).jqxRating('val');
                this.$emit('input', value);
            },
            __wireEvents__: function () {
                const that = this;

                JQXLite(this.componentSelector).on('change', function (event) { that.$emit('change', event); that.__twoWayDataBinding__(); });
            }
        }
    }
</script>
