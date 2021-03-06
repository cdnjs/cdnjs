<template>
        <input type="text" v-bind:id="id" @input="__twoWayDataBinding__" />
</template>

<script>
    import '../jqwidgets/jqxcore.js';
    import '../jqwidgets/jqxdata.js';
    import '../jqwidgets/jqxinput.js';

    export default {
        props: {
            disabled: Boolean,
            dropDownWidth: Number,
            displayMember: String,
            height: [Number, String],
            items: Number,
            minLength: Number,
            maxLength: Number,
            opened: Boolean,
            placeHolder: String,
            popupZIndex: Number,
            query: String,
            renderer: Function,
            rtl: Boolean,
            searchMode: String,
            source: [Array, Function, Object],
            theme: String,
            valueMember: String,
            width: [Number, String],
            value: [Number, String],
            autoCreate: {
                default: true,
                type: Boolean
            }
        },
        created: function () {
            this.id = 'jqxInput' + JQXLite.generateID();
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
                JQXLite(this.componentSelector).jqxInput(options);
            },
            getOptions: function () {
                const usedProps = Object.keys(this.__manageProps__());
                const resultToReturn = {};
                for (let i = 0; i < usedProps.length; i++) {
                    resultToReturn[usedProps[i]] = JQXLite(this.componentSelector).jqxInput(usedProps[i]);
                }
                return resultToReturn;
            },
            destroy: function() {
                JQXLite(this.componentSelector).jqxInput('destroy');  
            },
            focus: function() {
                JQXLite(this.componentSelector).jqxInput('focus');  
            },
            selectAll: function() {
                JQXLite(this.componentSelector).jqxInput('selectAll');  
            },
            val: function(value) {
                if (value !== undefined) {
                    JQXLite(this.componentSelector).jqxInput('val',  value)
                } else {
                    return JQXLite(this.componentSelector).jqxInput('val');
                }
            },
            _disabled: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxInput('disabled', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxInput('disabled');
                }
            },
            _dropDownWidth: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxInput('dropDownWidth', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxInput('dropDownWidth');
                }
            },
            _displayMember: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxInput('displayMember', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxInput('displayMember');
                }
            },
            _height: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxInput('height', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxInput('height');
                }
            },
            _items: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxInput('items', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxInput('items');
                }
            },
            _minLength: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxInput('minLength', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxInput('minLength');
                }
            },
            _maxLength: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxInput('maxLength', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxInput('maxLength');
                }
            },
            _opened: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxInput('opened', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxInput('opened');
                }
            },
            _placeHolder: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxInput('placeHolder', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxInput('placeHolder');
                }
            },
            _popupZIndex: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxInput('popupZIndex', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxInput('popupZIndex');
                }
            },
            _query: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxInput('query', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxInput('query');
                }
            },
            _renderer: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxInput('renderer', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxInput('renderer');
                }
            },
            _rtl: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxInput('rtl', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxInput('rtl');
                }
            },
            _searchMode: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxInput('searchMode', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxInput('searchMode');
                }
            },
            _source: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxInput('source', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxInput('source');
                }
            },
            _theme: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxInput('theme', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxInput('theme');
                }
            },
            _valueMember: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxInput('valueMember', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxInput('valueMember');
                }
            },
            _width: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxInput('width', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxInput('width');
                }
            },
            _value: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxInput('value', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxInput('value');
                }
            },
            __createComponent__: function (options) {
                let widgetOptions;
                options ? widgetOptions = options : widgetOptions = this.__manageProps__();
                JQXLite(this.componentSelector).jqxInput(widgetOptions);
                this.__extendProps__();
                this.__wireEvents__();
            },
            __manageProps__: function () {
                const widgetProps = ['disabled','dropDownWidth','displayMember','height','items','minLength','maxLength','opened','placeHolder','popupZIndex','query','renderer','rtl','searchMode','source','theme','valueMember','width','value'];
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
                Object.defineProperty(that, 'dropDownWidth', {
                    get: function() {
                        return that._dropDownWidth();
                    },
                    set: function(newValue) {
                        that._dropDownWidth(newValue);
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
                Object.defineProperty(that, 'minLength', {
                    get: function() {
                        return that._minLength();
                    },
                    set: function(newValue) {
                        that._minLength(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'maxLength', {
                    get: function() {
                        return that._maxLength();
                    },
                    set: function(newValue) {
                        that._maxLength(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'opened', {
                    get: function() {
                        return that._opened();
                    },
                    set: function(newValue) {
                        that._opened(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'placeHolder', {
                    get: function() {
                        return that._placeHolder();
                    },
                    set: function(newValue) {
                        that._placeHolder(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'popupZIndex', {
                    get: function() {
                        return that._popupZIndex();
                    },
                    set: function(newValue) {
                        that._popupZIndex(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'query', {
                    get: function() {
                        return that._query();
                    },
                    set: function(newValue) {
                        that._query(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'renderer', {
                    get: function() {
                        return that._renderer();
                    },
                    set: function(newValue) {
                        that._renderer(newValue);
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
                Object.defineProperty(that, 'searchMode', {
                    get: function() {
                        return that._searchMode();
                    },
                    set: function(newValue) {
                        that._searchMode(newValue);
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
            },
            __twoWayDataBinding__: function () {
                this.$emit('input', this.$el.value);
            },
            __wireEvents__: function () {
                const that = this;

                JQXLite(this.componentSelector).on('change', function (event) { that.$emit('change', event); });
                JQXLite(this.componentSelector).on('close', function (event) { that.$emit('close', event); });
                JQXLite(this.componentSelector).on('open', function (event) { that.$emit('open', event); });
                JQXLite(this.componentSelector).on('select', function (event) { that.$emit('select', event); that.__twoWayDataBinding__(); });
            }
        }
    }
</script>
