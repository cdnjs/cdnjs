<template>
    <div v-bind:id="id">
        <slot></slot>
    </div>
</template>

<script>
    import '../jqwidgets/jqxcore.js';
    import '../jqwidgets/jqxbuttons.js';
    import '../jqwidgets/jqxsortable.js';

    export default {
        props: {
            appendTo: String,
            axis: String,
            cancel: String,
            connectWith: String,
            containment: String,
            cursor: String,
            cursorAt: Object,
            delay: Number,
            disabled: Boolean,
            distance: Number,
            dropOnEmpty: Boolean,
            forceHelperSize: Boolean,
            forcePlaceholderSize: Boolean,
            grid: Array,
            handle: String,
            helper: String,
            items: String,
            opacity: Number,
            placeholderShow: String,
            revert: Boolean,
            scroll: Boolean,
            scrollSensitivity: Number,
            scrollSpeed: Number,
            tolerance: String,
            zIndex: Number,
            autoCreate: {
                default: true,
                type: Boolean
            }
        },
        created: function () {
            this.id = 'jqxSortable' + JQXLite.generateID();
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
                JQXLite(this.componentSelector).jqxSortable(options);
            },
            getOptions: function () {
                const usedProps = Object.keys(this.__manageProps__());
                const resultToReturn = {};
                for (let i = 0; i < usedProps.length; i++) {
                    resultToReturn[usedProps[i]] = JQXLite(this.componentSelector).jqxSortable(usedProps[i]);
                }
                return resultToReturn;
            },
            cancelMethod: function() {
                JQXLite(this.componentSelector).jqxSortable('cancelMethod');  
            },
            destroy: function() {
                JQXLite(this.componentSelector).jqxSortable('destroy');  
            },
            disable: function() {
                JQXLite(this.componentSelector).jqxSortable('disable');  
            },
            enable: function() {
                JQXLite(this.componentSelector).jqxSortable('enable');  
            },
            refresh: function() {
                JQXLite(this.componentSelector).jqxSortable('refresh');  
            },
            refreshPositions: function() {
                JQXLite(this.componentSelector).jqxSortable('refreshPositions');  
            },
            serialize: function(object) {
                return JQXLite(this.componentSelector).jqxSortable('serialize', object);  
            },
            toArray: function() {
                return JQXLite(this.componentSelector).jqxSortable('toArray');  
            },
            _appendTo: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxSortable('appendTo', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxSortable('appendTo');
                }
            },
            _axis: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxSortable('axis', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxSortable('axis');
                }
            },
            _cancel: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxSortable('cancel', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxSortable('cancel');
                }
            },
            _connectWith: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxSortable('connectWith', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxSortable('connectWith');
                }
            },
            _containment: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxSortable('containment', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxSortable('containment');
                }
            },
            _cursor: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxSortable('cursor', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxSortable('cursor');
                }
            },
            _cursorAt: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxSortable('cursorAt', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxSortable('cursorAt');
                }
            },
            _delay: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxSortable('delay', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxSortable('delay');
                }
            },
            _disabled: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxSortable('disabled', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxSortable('disabled');
                }
            },
            _distance: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxSortable('distance', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxSortable('distance');
                }
            },
            _dropOnEmpty: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxSortable('dropOnEmpty', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxSortable('dropOnEmpty');
                }
            },
            _forceHelperSize: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxSortable('forceHelperSize', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxSortable('forceHelperSize');
                }
            },
            _forcePlaceholderSize: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxSortable('forcePlaceholderSize', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxSortable('forcePlaceholderSize');
                }
            },
            _grid: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxSortable('grid', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxSortable('grid');
                }
            },
            _handle: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxSortable('handle', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxSortable('handle');
                }
            },
            _helper: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxSortable('helper', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxSortable('helper');
                }
            },
            _items: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxSortable('items', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxSortable('items');
                }
            },
            _opacity: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxSortable('opacity', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxSortable('opacity');
                }
            },
            _placeholderShow: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxSortable('placeholderShow', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxSortable('placeholderShow');
                }
            },
            _revert: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxSortable('revert', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxSortable('revert');
                }
            },
            _scroll: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxSortable('scroll', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxSortable('scroll');
                }
            },
            _scrollSensitivity: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxSortable('scrollSensitivity', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxSortable('scrollSensitivity');
                }
            },
            _scrollSpeed: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxSortable('scrollSpeed', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxSortable('scrollSpeed');
                }
            },
            _tolerance: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxSortable('tolerance', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxSortable('tolerance');
                }
            },
            _zIndex: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxSortable('zIndex', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxSortable('zIndex');
                }
            },
            __createComponent__: function (options) {
                let widgetOptions;
                options ? widgetOptions = options : widgetOptions = this.__manageProps__();
                JQXLite(this.componentSelector).jqxSortable(widgetOptions);
                this.__extendProps__();
                this.__wireEvents__();
            },
            __manageProps__: function () {
                const widgetProps = ['appendTo','axis','cancel','connectWith','containment','cursor','cursorAt','delay','disabled','distance','dropOnEmpty','forceHelperSize','forcePlaceholderSize','grid','handle','helper','items','opacity','placeholderShow','revert','scroll','scrollSensitivity','scrollSpeed','tolerance','zIndex'];
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
                Object.defineProperty(that, 'axis', {
                    get: function() {
                        return that._axis();
                    },
                    set: function(newValue) {
                        that._axis(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'cancel', {
                    get: function() {
                        return that._cancel();
                    },
                    set: function(newValue) {
                        that._cancel(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'connectWith', {
                    get: function() {
                        return that._connectWith();
                    },
                    set: function(newValue) {
                        that._connectWith(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'containment', {
                    get: function() {
                        return that._containment();
                    },
                    set: function(newValue) {
                        that._containment(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'cursor', {
                    get: function() {
                        return that._cursor();
                    },
                    set: function(newValue) {
                        that._cursor(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'cursorAt', {
                    get: function() {
                        return that._cursorAt();
                    },
                    set: function(newValue) {
                        that._cursorAt(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'delay', {
                    get: function() {
                        return that._delay();
                    },
                    set: function(newValue) {
                        that._delay(newValue);
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
                Object.defineProperty(that, 'dropOnEmpty', {
                    get: function() {
                        return that._dropOnEmpty();
                    },
                    set: function(newValue) {
                        that._dropOnEmpty(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'forceHelperSize', {
                    get: function() {
                        return that._forceHelperSize();
                    },
                    set: function(newValue) {
                        that._forceHelperSize(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'forcePlaceholderSize', {
                    get: function() {
                        return that._forcePlaceholderSize();
                    },
                    set: function(newValue) {
                        that._forcePlaceholderSize(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'grid', {
                    get: function() {
                        return that._grid();
                    },
                    set: function(newValue) {
                        that._grid(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'handle', {
                    get: function() {
                        return that._handle();
                    },
                    set: function(newValue) {
                        that._handle(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'helper', {
                    get: function() {
                        return that._helper();
                    },
                    set: function(newValue) {
                        that._helper(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'items', {
                    get: function() {
                        return that._items();
                    },
                    set: function(newValue) {
                        that._items(newValue);
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
                Object.defineProperty(that, 'placeholderShow', {
                    get: function() {
                        return that._placeholderShow();
                    },
                    set: function(newValue) {
                        that._placeholderShow(newValue);
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
                Object.defineProperty(that, 'scroll', {
                    get: function() {
                        return that._scroll();
                    },
                    set: function(newValue) {
                        that._scroll(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'scrollSensitivity', {
                    get: function() {
                        return that._scrollSensitivity();
                    },
                    set: function(newValue) {
                        that._scrollSensitivity(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'scrollSpeed', {
                    get: function() {
                        return that._scrollSpeed();
                    },
                    set: function(newValue) {
                        that._scrollSpeed(newValue);
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
                Object.defineProperty(that, 'zIndex', {
                    get: function() {
                        return that._zIndex();
                    },
                    set: function(newValue) {
                        that._zIndex(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
            },
            __wireEvents__: function () {
                const that = this;

                JQXLite(this.componentSelector).on('activate', function (event) { that.$emit('activate', event); });
                JQXLite(this.componentSelector).on('beforeStop', function (event) { that.$emit('beforeStop', event); });
                JQXLite(this.componentSelector).on('change', function (event) { that.$emit('change', event); });
                JQXLite(this.componentSelector).on('deactivate', function (event) { that.$emit('deactivate', event); });
                JQXLite(this.componentSelector).on('out', function (event) { that.$emit('out', event); });
                JQXLite(this.componentSelector).on('over', function (event) { that.$emit('over', event); });
                JQXLite(this.componentSelector).on('receive', function (event) { that.$emit('receive', event); });
                JQXLite(this.componentSelector).on('remove', function (event) { that.$emit('remove', event); });
                JQXLite(this.componentSelector).on('sort', function (event) { that.$emit('sort', event); });
                JQXLite(this.componentSelector).on('start', function (event) { that.$emit('start', event); });
                JQXLite(this.componentSelector).on('stop', function (event) { that.$emit('stop', event); });
                JQXLite(this.componentSelector).on('update', function (event) { that.$emit('update', event); });
            }
        }
    }
</script>
