<template>
    <div v-bind:id="id">
        <slot></slot>
    </div>
</template>

<script>
    import '../jqwidgets/jqxcore.js';
    import '../jqwidgets/jqxsortable.js';
    import '../jqwidgets/jqxsplitter.js';
    import '../jqwidgets/jqxdata.js';
    import '../jqwidgets/jqxkanban.js';

    export default {
        props: {
            columnRenderer: Function,
            columns: Array,
            connectWith: String,
            headerHeight: Number,
            headerWidth: Number,
            height: [String, Number],
            itemRenderer: Function,
            ready: Function,
            rtl: Boolean,
            source: [Array, Object],
            resources: [Array, Object],
            template: String,
            templateContent: Object,
            theme: String,
            width: [String, Number],
            autoCreate: {
                default: true,
                type: Boolean
            }
        },
        created: function () {
            this.id = 'jqxKanban' + JQXLite.generateID();
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
                JQXLite(this.componentSelector).jqxKanban(options);
            },
            getOptions: function () {
                const usedProps = Object.keys(this.__manageProps__());
                const resultToReturn = {};
                for (let i = 0; i < usedProps.length; i++) {
                    resultToReturn[usedProps[i]] = JQXLite(this.componentSelector).jqxKanban(usedProps[i]);
                }
                return resultToReturn;
            },
            addItem: function(newItem) {
                JQXLite(this.componentSelector).jqxKanban('addItem', newItem);  
            },
            destroy: function() {
                JQXLite(this.componentSelector).jqxKanban('destroy');  
            },
            getColumn: function(dataField) {
                return JQXLite(this.componentSelector).jqxKanban('getColumn', dataField);  
            },
            getColumnItems: function(dataField) {
                return JQXLite(this.componentSelector).jqxKanban('getColumnItems', dataField);  
            },
            getItems: function() {
                return JQXLite(this.componentSelector).jqxKanban('getItems');  
            },
            removeItem: function(itemId) {
                JQXLite(this.componentSelector).jqxKanban('removeItem', itemId);  
            },
            updateItem: function(itemId, newContent) {
                JQXLite(this.componentSelector).jqxKanban('updateItem', itemId, newContent);  
            },
            _columnRenderer: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxKanban('columnRenderer', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxKanban('columnRenderer');
                }
            },
            _columns: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxKanban('columns', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxKanban('columns');
                }
            },
            _connectWith: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxKanban('connectWith', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxKanban('connectWith');
                }
            },
            _headerHeight: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxKanban('headerHeight', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxKanban('headerHeight');
                }
            },
            _headerWidth: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxKanban('headerWidth', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxKanban('headerWidth');
                }
            },
            _height: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxKanban('height', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxKanban('height');
                }
            },
            _itemRenderer: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxKanban('itemRenderer', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxKanban('itemRenderer');
                }
            },
            _ready: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxKanban('ready', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxKanban('ready');
                }
            },
            _rtl: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxKanban('rtl', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxKanban('rtl');
                }
            },
            _source: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxKanban('source', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxKanban('source');
                }
            },
            _resources: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxKanban('resources', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxKanban('resources');
                }
            },
            _template: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxKanban('template', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxKanban('template');
                }
            },
            _templateContent: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxKanban('templateContent', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxKanban('templateContent');
                }
            },
            _theme: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxKanban('theme', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxKanban('theme');
                }
            },
            _width: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxKanban('width', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxKanban('width');
                }
            },
            __createComponent__: function (options) {
                let widgetOptions;
                options ? widgetOptions = options : widgetOptions = this.__manageProps__();
                JQXLite(this.componentSelector).jqxKanban(widgetOptions);
                this.__extendProps__();
                this.__wireEvents__();
            },
            __manageProps__: function () {
                const widgetProps = ['columnRenderer','columns','connectWith','headerHeight','headerWidth','height','itemRenderer','ready','rtl','source','resources','template','templateContent','theme','width'];
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

                Object.defineProperty(that, 'columnRenderer', {
                    get: function() {
                        return that._columnRenderer();
                    },
                    set: function(newValue) {
                        that._columnRenderer(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'columns', {
                    get: function() {
                        return that._columns();
                    },
                    set: function(newValue) {
                        that._columns(newValue);
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
                Object.defineProperty(that, 'headerHeight', {
                    get: function() {
                        return that._headerHeight();
                    },
                    set: function(newValue) {
                        that._headerHeight(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'headerWidth', {
                    get: function() {
                        return that._headerWidth();
                    },
                    set: function(newValue) {
                        that._headerWidth(newValue);
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
                Object.defineProperty(that, 'itemRenderer', {
                    get: function() {
                        return that._itemRenderer();
                    },
                    set: function(newValue) {
                        that._itemRenderer(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'ready', {
                    get: function() {
                        return that._ready();
                    },
                    set: function(newValue) {
                        that._ready(newValue);
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
                Object.defineProperty(that, 'resources', {
                    get: function() {
                        return that._resources();
                    },
                    set: function(newValue) {
                        that._resources(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'template', {
                    get: function() {
                        return that._template();
                    },
                    set: function(newValue) {
                        that._template(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'templateContent', {
                    get: function() {
                        return that._templateContent();
                    },
                    set: function(newValue) {
                        that._templateContent(newValue);
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

                JQXLite(this.componentSelector).on('columnAttrClicked', function (event) { that.$emit('columnAttrClicked', event); });
                JQXLite(this.componentSelector).on('columnCollapsed', function (event) { that.$emit('columnCollapsed', event); });
                JQXLite(this.componentSelector).on('columnExpanded', function (event) { that.$emit('columnExpanded', event); });
                JQXLite(this.componentSelector).on('itemAttrClicked', function (event) { that.$emit('itemAttrClicked', event); });
                JQXLite(this.componentSelector).on('itemMoved', function (event) { that.$emit('itemMoved', event); });
            }
        }
    }
</script>
