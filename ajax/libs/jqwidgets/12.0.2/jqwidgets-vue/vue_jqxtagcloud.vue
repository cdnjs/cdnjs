<template>
    <div v-bind:id="id">
        <slot></slot>
    </div>
</template>

<script>
    import '../jqwidgets/jqxcore.js';
    import '../jqwidgets/jqxdata.js';
    import '../jqwidgets/jqxbuttons.js';
    import '../jqwidgets/jqxtagcloud.js';

    export default {
        props: {
            alterTextCase: String,
            disabled: Boolean,
            displayLimit: Number,
            displayMember: String,
            displayValue: Boolean,
            fontSizeUnit: String,
            height: [Number, String],
            maxColor: String,
            maxFontSize: Number,
            maxValueToDisplay: Number,
            minColor: String,
            minFontSize: Number,
            minValueToDisplay: Number,
            rtl: Boolean,
            sortBy: String,
            sortOrder: String,
            source: Object,
            tagRenderer: Function,
            takeTopWeightedItems: Boolean,
            textColor: String,
            urlBase: String,
            urlMember: String,
            valueMember: String,
            width: [Number, String],
            autoCreate: {
                default: true,
                type: Boolean
            }
        },
        created: function () {
            this.id = 'jqxTagCloud' + JQXLite.generateID();
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
                JQXLite(this.componentSelector).jqxTagCloud(options);
            },
            getOptions: function () {
                const usedProps = Object.keys(this.__manageProps__());
                const resultToReturn = {};
                for (let i = 0; i < usedProps.length; i++) {
                    resultToReturn[usedProps[i]] = JQXLite(this.componentSelector).jqxTagCloud(usedProps[i]);
                }
                return resultToReturn;
            },
            destroy: function() {
                JQXLite(this.componentSelector).jqxTagCloud('destroy');  
            },
            findTagIndex: function(tag) {
                return JQXLite(this.componentSelector).jqxTagCloud('findTagIndex', tag);  
            },
            getHiddenTagsList: function() {
                return JQXLite(this.componentSelector).jqxTagCloud('getHiddenTagsList');  
            },
            getRenderedTags: function() {
                return JQXLite(this.componentSelector).jqxTagCloud('getRenderedTags');  
            },
            getTagsList: function() {
                return JQXLite(this.componentSelector).jqxTagCloud('getTagsList');  
            },
            hideItem: function(index) {
                JQXLite(this.componentSelector).jqxTagCloud('hideItem', index);  
            },
            insertAt: function(index, item) {
                JQXLite(this.componentSelector).jqxTagCloud('insertAt', index, item);  
            },
            removeAt: function(index) {
                JQXLite(this.componentSelector).jqxTagCloud('removeAt', index);  
            },
            updateAt: function(index, item) {
                JQXLite(this.componentSelector).jqxTagCloud('updateAt', index, item);  
            },
            showItem: function(index) {
                JQXLite(this.componentSelector).jqxTagCloud('showItem', index);  
            },
            _alterTextCase: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxTagCloud('alterTextCase', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxTagCloud('alterTextCase');
                }
            },
            _disabled: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxTagCloud('disabled', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxTagCloud('disabled');
                }
            },
            _displayLimit: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxTagCloud('displayLimit', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxTagCloud('displayLimit');
                }
            },
            _displayMember: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxTagCloud('displayMember', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxTagCloud('displayMember');
                }
            },
            _displayValue: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxTagCloud('displayValue', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxTagCloud('displayValue');
                }
            },
            _fontSizeUnit: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxTagCloud('fontSizeUnit', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxTagCloud('fontSizeUnit');
                }
            },
            _height: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxTagCloud('height', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxTagCloud('height');
                }
            },
            _maxColor: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxTagCloud('maxColor', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxTagCloud('maxColor');
                }
            },
            _maxFontSize: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxTagCloud('maxFontSize', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxTagCloud('maxFontSize');
                }
            },
            _maxValueToDisplay: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxTagCloud('maxValueToDisplay', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxTagCloud('maxValueToDisplay');
                }
            },
            _minColor: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxTagCloud('minColor', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxTagCloud('minColor');
                }
            },
            _minFontSize: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxTagCloud('minFontSize', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxTagCloud('minFontSize');
                }
            },
            _minValueToDisplay: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxTagCloud('minValueToDisplay', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxTagCloud('minValueToDisplay');
                }
            },
            _rtl: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxTagCloud('rtl', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxTagCloud('rtl');
                }
            },
            _sortBy: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxTagCloud('sortBy', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxTagCloud('sortBy');
                }
            },
            _sortOrder: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxTagCloud('sortOrder', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxTagCloud('sortOrder');
                }
            },
            _source: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxTagCloud('source', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxTagCloud('source');
                }
            },
            _tagRenderer: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxTagCloud('tagRenderer', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxTagCloud('tagRenderer');
                }
            },
            _takeTopWeightedItems: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxTagCloud('takeTopWeightedItems', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxTagCloud('takeTopWeightedItems');
                }
            },
            _textColor: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxTagCloud('textColor', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxTagCloud('textColor');
                }
            },
            _urlBase: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxTagCloud('urlBase', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxTagCloud('urlBase');
                }
            },
            _urlMember: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxTagCloud('urlMember', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxTagCloud('urlMember');
                }
            },
            _valueMember: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxTagCloud('valueMember', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxTagCloud('valueMember');
                }
            },
            _width: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxTagCloud('width', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxTagCloud('width');
                }
            },
            __createComponent__: function (options) {
                let widgetOptions;
                options ? widgetOptions = options : widgetOptions = this.__manageProps__();
                JQXLite(this.componentSelector).jqxTagCloud(widgetOptions);
                this.__extendProps__();
                this.__wireEvents__();
            },
            __manageProps__: function () {
                const widgetProps = ['alterTextCase','disabled','displayLimit','displayMember','displayValue','fontSizeUnit','height','maxColor','maxFontSize','maxValueToDisplay','minColor','minFontSize','minValueToDisplay','rtl','sortBy','sortOrder','source','tagRenderer','takeTopWeightedItems','textColor','urlBase','urlMember','valueMember','width'];
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

                Object.defineProperty(that, 'alterTextCase', {
                    get: function() {
                        return that._alterTextCase();
                    },
                    set: function(newValue) {
                        that._alterTextCase(newValue);
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
                Object.defineProperty(that, 'displayLimit', {
                    get: function() {
                        return that._displayLimit();
                    },
                    set: function(newValue) {
                        that._displayLimit(newValue);
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
                Object.defineProperty(that, 'displayValue', {
                    get: function() {
                        return that._displayValue();
                    },
                    set: function(newValue) {
                        that._displayValue(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'fontSizeUnit', {
                    get: function() {
                        return that._fontSizeUnit();
                    },
                    set: function(newValue) {
                        that._fontSizeUnit(newValue);
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
                Object.defineProperty(that, 'maxColor', {
                    get: function() {
                        return that._maxColor();
                    },
                    set: function(newValue) {
                        that._maxColor(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'maxFontSize', {
                    get: function() {
                        return that._maxFontSize();
                    },
                    set: function(newValue) {
                        that._maxFontSize(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'maxValueToDisplay', {
                    get: function() {
                        return that._maxValueToDisplay();
                    },
                    set: function(newValue) {
                        that._maxValueToDisplay(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'minColor', {
                    get: function() {
                        return that._minColor();
                    },
                    set: function(newValue) {
                        that._minColor(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'minFontSize', {
                    get: function() {
                        return that._minFontSize();
                    },
                    set: function(newValue) {
                        that._minFontSize(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'minValueToDisplay', {
                    get: function() {
                        return that._minValueToDisplay();
                    },
                    set: function(newValue) {
                        that._minValueToDisplay(newValue);
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
                Object.defineProperty(that, 'sortBy', {
                    get: function() {
                        return that._sortBy();
                    },
                    set: function(newValue) {
                        that._sortBy(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'sortOrder', {
                    get: function() {
                        return that._sortOrder();
                    },
                    set: function(newValue) {
                        that._sortOrder(newValue);
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
                Object.defineProperty(that, 'tagRenderer', {
                    get: function() {
                        return that._tagRenderer();
                    },
                    set: function(newValue) {
                        that._tagRenderer(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'takeTopWeightedItems', {
                    get: function() {
                        return that._takeTopWeightedItems();
                    },
                    set: function(newValue) {
                        that._takeTopWeightedItems(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'textColor', {
                    get: function() {
                        return that._textColor();
                    },
                    set: function(newValue) {
                        that._textColor(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'urlBase', {
                    get: function() {
                        return that._urlBase();
                    },
                    set: function(newValue) {
                        that._urlBase(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'urlMember', {
                    get: function() {
                        return that._urlMember();
                    },
                    set: function(newValue) {
                        that._urlMember(newValue);
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
            },
            __wireEvents__: function () {
                const that = this;

                JQXLite(this.componentSelector).on('bindingComplete', function (event) { that.$emit('bindingComplete', event); });
                JQXLite(this.componentSelector).on('itemClick', function (event) { that.$emit('itemClick', event); });
            }
        }
    }
</script>
