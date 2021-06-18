<template>
    <div v-bind:id="id">
        <slot></slot>
    </div>
</template>

<script>
    import '../jqwidgets/jqxcore.js';
    import '../jqwidgets/jqxdata.js';
    import '../jqwidgets/jqxbuttons.js';
    import '../jqwidgets/jqxscrollbar.js';
    import '../jqwidgets/jqxmenu.js';
    import '../jqwidgets/jqxwindow.js';
    import '../jqwidgets/jqxdragdrop.js';
    import '../jqwidgets/jqxcheckbox.js';
    import '../jqwidgets/jqxinput.js';
    import '../jqwidgets/jqxlistbox.js';
    import '../jqwidgets/jqxdropdownlist.js';
    import '../jqwidgets/jqxpivot.js';
    import '../jqwidgets/jqxpivotgrid.js';
    import '../jqwidgets/jqxpivotdesigner.js';

    export default {
        props: {
            source: Object,
            localization: Object,
            scrollBarsEnabled: Boolean,
            selectionEnabled: Boolean,
            multipleSelectionEnabled: Boolean,
            treeStyleRows: Boolean,
            autoResize: Boolean,
            itemsRenderer: Function,
            cellsRenderer: Function,
            autoCreate: {
                default: true,
                type: Boolean
            }
        },
        created: function () {
            this.id = 'jqxPivotGrid' + JQXLite.generateID();
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
                JQXLite(this.componentSelector).jqxPivotGrid(options);
            },
            getOptions: function () {
                const usedProps = Object.keys(this.__manageProps__());
                const resultToReturn = {};
                for (let i = 0; i < usedProps.length; i++) {
                    resultToReturn[usedProps[i]] = JQXLite(this.componentSelector).jqxPivotGrid(usedProps[i]);
                }
                return resultToReturn;
            },
            getInstance: function() {
                return JQXLite(this.componentSelector).jqxPivotGrid('getInstance');  
            },
            refresh: function() {
                return JQXLite(this.componentSelector).jqxPivotGrid('refresh');  
            },
            getPivotRows: function() {
                return JQXLite(this.componentSelector).jqxPivotGrid('getPivotRows');  
            },
            getPivotColumns: function() {
                return JQXLite(this.componentSelector).jqxPivotGrid('getPivotColumns');  
            },
            getPivotCells: function() {
                return JQXLite(this.componentSelector).jqxPivotGrid('getPivotCells');  
            },
            _source: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxPivotGrid('source', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxPivotGrid('source');
                }
            },
            _localization: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxPivotGrid('localization', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxPivotGrid('localization');
                }
            },
            _scrollBarsEnabled: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxPivotGrid('scrollBarsEnabled', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxPivotGrid('scrollBarsEnabled');
                }
            },
            _selectionEnabled: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxPivotGrid('selectionEnabled', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxPivotGrid('selectionEnabled');
                }
            },
            _multipleSelectionEnabled: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxPivotGrid('multipleSelectionEnabled', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxPivotGrid('multipleSelectionEnabled');
                }
            },
            _treeStyleRows: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxPivotGrid('treeStyleRows', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxPivotGrid('treeStyleRows');
                }
            },
            _autoResize: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxPivotGrid('autoResize', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxPivotGrid('autoResize');
                }
            },
            _itemsRenderer: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxPivotGrid('itemsRenderer', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxPivotGrid('itemsRenderer');
                }
            },
            _cellsRenderer: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxPivotGrid('cellsRenderer', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxPivotGrid('cellsRenderer');
                }
            },
            __createComponent__: function (options) {
                let widgetOptions;
                options ? widgetOptions = options : widgetOptions = this.__manageProps__();
                JQXLite(this.componentSelector).jqxPivotGrid(widgetOptions);
                this.__extendProps__();
                this.__wireEvents__();
            },
            __manageProps__: function () {
                const widgetProps = ['source','localization','scrollBarsEnabled','selectionEnabled','multipleSelectionEnabled','treeStyleRows','autoResize','itemsRenderer','cellsRenderer'];
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
                Object.defineProperty(that, 'localization', {
                    get: function() {
                        return that._localization();
                    },
                    set: function(newValue) {
                        that._localization(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'scrollBarsEnabled', {
                    get: function() {
                        return that._scrollBarsEnabled();
                    },
                    set: function(newValue) {
                        that._scrollBarsEnabled(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'selectionEnabled', {
                    get: function() {
                        return that._selectionEnabled();
                    },
                    set: function(newValue) {
                        that._selectionEnabled(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'multipleSelectionEnabled', {
                    get: function() {
                        return that._multipleSelectionEnabled();
                    },
                    set: function(newValue) {
                        that._multipleSelectionEnabled(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'treeStyleRows', {
                    get: function() {
                        return that._treeStyleRows();
                    },
                    set: function(newValue) {
                        that._treeStyleRows(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'autoResize', {
                    get: function() {
                        return that._autoResize();
                    },
                    set: function(newValue) {
                        that._autoResize(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'itemsRenderer', {
                    get: function() {
                        return that._itemsRenderer();
                    },
                    set: function(newValue) {
                        that._itemsRenderer(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'cellsRenderer', {
                    get: function() {
                        return that._cellsRenderer();
                    },
                    set: function(newValue) {
                        that._cellsRenderer(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
            },
            __wireEvents__: function () {
                const that = this;

                JQXLite(this.componentSelector).on('pivotitemexpanding', function (event) { that.$emit('pivotitemexpanding', event); });
                JQXLite(this.componentSelector).on('pivotitemexpanded', function (event) { that.$emit('pivotitemexpanded', event); });
                JQXLite(this.componentSelector).on('pivotitemcollapsing', function (event) { that.$emit('pivotitemcollapsing', event); });
                JQXLite(this.componentSelector).on('pivotitemcollapsed', function (event) { that.$emit('pivotitemcollapsed', event); });
                JQXLite(this.componentSelector).on('sortchanging', function (event) { that.$emit('sortchanging', event); });
                JQXLite(this.componentSelector).on('sortchanged', function (event) { that.$emit('sortchanged', event); });
                JQXLite(this.componentSelector).on('sortremoving', function (event) { that.$emit('sortremoving', event); });
                JQXLite(this.componentSelector).on('sortremoved', function (event) { that.$emit('sortremoved', event); });
                JQXLite(this.componentSelector).on('pivotitemselectionchanged', function (event) { that.$emit('pivotitemselectionchanged', event); });
                JQXLite(this.componentSelector).on('pivotcellmousedown', function (event) { that.$emit('pivotcellmousedown', event); });
                JQXLite(this.componentSelector).on('pivotcellmouseup', function (event) { that.$emit('pivotcellmouseup', event); });
                JQXLite(this.componentSelector).on('pivotcellclick', function (event) { that.$emit('pivotcellclick', event); });
                JQXLite(this.componentSelector).on('pivotcelldblclick', function (event) { that.$emit('pivotcelldblclick', event); });
                JQXLite(this.componentSelector).on('pivotitemmousedown', function (event) { that.$emit('pivotitemmousedown', event); });
                JQXLite(this.componentSelector).on('pivotitemmouseup', function (event) { that.$emit('pivotitemmouseup', event); });
                JQXLite(this.componentSelector).on('pivotitemclick', function (event) { that.$emit('pivotitemclick', event); });
                JQXLite(this.componentSelector).on('pivotitemdblclick', function (event) { that.$emit('pivotitemdblclick', event); });
            }
        }
    }
</script>
