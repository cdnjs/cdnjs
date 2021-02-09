<template>
    <div v-bind:id="id">
        <slot></slot>
    </div>
</template>

<script>
    import '../jqwidgets/jqxcore.js';
    import '../jqwidgets/jqxdata.js';
    import '../jqwidgets/jqxdata.export.js';
    import '../jqwidgets/jqxbuttons.js';
    import '../jqwidgets/jqxcheckbox.js';
    import '../jqwidgets/jqxtooltip.js';
    import '../jqwidgets/jqxscrollbar.js';
    import '../jqwidgets/jqxlistbox.js';
    import '../jqwidgets/jqxcombobox.js';
    import '../jqwidgets/jqxnumberinput.js';
    import '../jqwidgets/jqxdropdownlist.js';
    import '../jqwidgets/jqxdatatable.js';

    export default {
        props: {
            altRows: Boolean,
            autoRowHeight: Boolean,
            aggregatesHeight: Number,
            autoShowLoadElement: Boolean,
            columnsHeight: Number,
            columns: Array,
            columnGroups: Array,
            columnsResize: Boolean,
            columnsReorder: Boolean,
            disabled: Boolean,
            editable: Boolean,
            editSettings: Object,
            exportSettings: Object,
            enableHover: Boolean,
            enableBrowserSelection: Boolean,
            filterable: Boolean,
            filterHeight: Number,
            filterMode: String,
            groups: Array,
            groupsRenderer: Function,
            height: [Number, String],
            initRowDetails: Function,
            incrementalSearch: Boolean,
            localization: Object,
            pagerHeight: Number,
            pageSize: Number,
            pageSizeOptions: Array,
            pageable: Boolean,
            pagerPosition: String,
            pagerMode: String,
            pagerButtonsCount: Number,
            pagerRenderer: Function,
            ready: Function,
            rowDetails: Boolean,
            renderToolbar: Function,
            renderStatusBar: Function,
            rendering: Function,
            rendered: Function,
            rtl: Boolean,
            source: Object,
            sortable: Boolean,
            showAggregates: Boolean,
            showToolbar: Boolean,
            showStatusbar: Boolean,
            statusBarHeight: Number,
            scrollBarSize: Number,
            selectionMode: String,
            serverProcessing: Boolean,
            showHeader: Boolean,
            theme: String,
            toolbarHeight: Number,
            width: [Number, String],
            autoCreate: {
                default: true,
                type: Boolean
            }
        },
        created: function () {
            this.id = 'jqxDataTable' + JQXLite.generateID();
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
                JQXLite(this.componentSelector).jqxDataTable(options);
            },
            getOptions: function () {
                const usedProps = Object.keys(this.__manageProps__());
                const resultToReturn = {};
                for (let i = 0; i < usedProps.length; i++) {
                    resultToReturn[usedProps[i]] = JQXLite(this.componentSelector).jqxDataTable(usedProps[i]);
                }
                return resultToReturn;
            },
            addRow: function(rowIndex, rowData, rowPosition) {
                JQXLite(this.componentSelector).jqxDataTable('addRow', rowIndex, rowData, rowPosition);  
            },
            addFilter: function(dataField, filerGroup) {
                JQXLite(this.componentSelector).jqxDataTable('addFilter', dataField, filerGroup);  
            },
            applyFilters: function() {
                JQXLite(this.componentSelector).jqxDataTable('applyFilters');  
            },
            beginUpdate: function() {
                JQXLite(this.componentSelector).jqxDataTable('beginUpdate');  
            },
            beginRowEdit: function(rowIndex) {
                JQXLite(this.componentSelector).jqxDataTable('beginRowEdit', rowIndex);  
            },
            beginCellEdit: function(rowIndex, dataField) {
                JQXLite(this.componentSelector).jqxDataTable('beginCellEdit', rowIndex, dataField);  
            },
            clearSelection: function() {
                JQXLite(this.componentSelector).jqxDataTable('clearSelection');  
            },
            clearFilters: function() {
                JQXLite(this.componentSelector).jqxDataTable('clearFilters');  
            },
            clear: function() {
                JQXLite(this.componentSelector).jqxDataTable('clear');  
            },
            destroy: function() {
                JQXLite(this.componentSelector).jqxDataTable('destroy');  
            },
            deleteRow: function(rowIndex) {
                JQXLite(this.componentSelector).jqxDataTable('deleteRow', rowIndex);  
            },
            endUpdate: function() {
                JQXLite(this.componentSelector).jqxDataTable('endUpdate');  
            },
            ensureRowVisible: function(rowIndex) {
                JQXLite(this.componentSelector).jqxDataTable('ensureRowVisible', rowIndex);  
            },
            endRowEdit: function(rowIndex, cancelChanges) {
                JQXLite(this.componentSelector).jqxDataTable('endRowEdit', rowIndex, cancelChanges);  
            },
            endCellEdit: function(rowIndex, dataField) {
                JQXLite(this.componentSelector).jqxDataTable('endCellEdit', rowIndex, dataField);  
            },
            exportData: function(exportDataType) {
                return JQXLite(this.componentSelector).jqxDataTable('exportData', exportDataType);  
            },
            focus: function() {
                JQXLite(this.componentSelector).jqxDataTable('focus');  
            },
            getColumnProperty: function(dataField, propertyName) {
                return JQXLite(this.componentSelector).jqxDataTable('getColumnProperty', dataField, propertyName);  
            },
            goToPage: function(pageIndex) {
                JQXLite(this.componentSelector).jqxDataTable('goToPage', pageIndex);  
            },
            goToPrevPage: function() {
                JQXLite(this.componentSelector).jqxDataTable('goToPrevPage');  
            },
            goToNextPage: function() {
                JQXLite(this.componentSelector).jqxDataTable('goToNextPage');  
            },
            getSelection: function() {
                return JQXLite(this.componentSelector).jqxDataTable('getSelection');  
            },
            getRows: function() {
                return JQXLite(this.componentSelector).jqxDataTable('getRows');  
            },
            getView: function() {
                return JQXLite(this.componentSelector).jqxDataTable('getView');  
            },
            getCellValue: function(rowIndex, dataField) {
                return JQXLite(this.componentSelector).jqxDataTable('getCellValue', rowIndex, dataField);  
            },
            hideColumn: function(dataField) {
                JQXLite(this.componentSelector).jqxDataTable('hideColumn', dataField);  
            },
            hideDetails: function(rowIndex) {
                JQXLite(this.componentSelector).jqxDataTable('hideDetails', rowIndex);  
            },
            isBindingCompleted: function() {
                return JQXLite(this.componentSelector).jqxDataTable('isBindingCompleted');  
            },
            lockRow: function(rowIndex) {
                JQXLite(this.componentSelector).jqxDataTable('lockRow', rowIndex);  
            },
            refresh: function() {
                JQXLite(this.componentSelector).jqxDataTable('refresh');  
            },
            render: function() {
                JQXLite(this.componentSelector).jqxDataTable('render');  
            },
            removeFilter: function(dataField) {
                JQXLite(this.componentSelector).jqxDataTable('removeFilter', dataField);  
            },
            scrollOffset: function(top, left) {
                JQXLite(this.componentSelector).jqxDataTable('scrollOffset', top, left);  
            },
            setColumnProperty: function(dataField, propertyName, propertyValue) {
                JQXLite(this.componentSelector).jqxDataTable('setColumnProperty', dataField, propertyName, propertyValue);  
            },
            showColumn: function(dataField) {
                JQXLite(this.componentSelector).jqxDataTable('showColumn', dataField);  
            },
            selectRow: function(rowIndex) {
                JQXLite(this.componentSelector).jqxDataTable('selectRow', rowIndex);  
            },
            showDetails: function(rowIndex) {
                JQXLite(this.componentSelector).jqxDataTable('showDetails', rowIndex);  
            },
            setCellValue: function(rowIndex, dataField, value) {
                JQXLite(this.componentSelector).jqxDataTable('setCellValue', rowIndex, dataField, value);  
            },
            sortBy: function(dataField, sortOrder) {
                JQXLite(this.componentSelector).jqxDataTable('sortBy', dataField, sortOrder);  
            },
            updating: function() {
                return JQXLite(this.componentSelector).jqxDataTable('updating');  
            },
            updateBoundData: function() {
                JQXLite(this.componentSelector).jqxDataTable('updateBoundData');  
            },
            unselectRow: function(rowIndex) {
                JQXLite(this.componentSelector).jqxDataTable('unselectRow', rowIndex);  
            },
            updateRow: function(rowIndex, rowData) {
                JQXLite(this.componentSelector).jqxDataTable('updateRow', rowIndex, rowData);  
            },
            unlockRow: function(rowIndex) {
                JQXLite(this.componentSelector).jqxDataTable('unlockRow', rowIndex);  
            },
            _altRows: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxDataTable('altRows', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxDataTable('altRows');
                }
            },
            _autoRowHeight: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxDataTable('autoRowHeight', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxDataTable('autoRowHeight');
                }
            },
            _aggregatesHeight: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxDataTable('aggregatesHeight', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxDataTable('aggregatesHeight');
                }
            },
            _autoShowLoadElement: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxDataTable('autoShowLoadElement', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxDataTable('autoShowLoadElement');
                }
            },
            _columnsHeight: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxDataTable('columnsHeight', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxDataTable('columnsHeight');
                }
            },
            _columns: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxDataTable('columns', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxDataTable('columns');
                }
            },
            _columnGroups: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxDataTable('columnGroups', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxDataTable('columnGroups');
                }
            },
            _columnsResize: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxDataTable('columnsResize', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxDataTable('columnsResize');
                }
            },
            _columnsReorder: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxDataTable('columnsReorder', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxDataTable('columnsReorder');
                }
            },
            _disabled: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxDataTable('disabled', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxDataTable('disabled');
                }
            },
            _editable: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxDataTable('editable', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxDataTable('editable');
                }
            },
            _editSettings: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxDataTable('editSettings', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxDataTable('editSettings');
                }
            },
            _exportSettings: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxDataTable('exportSettings', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxDataTable('exportSettings');
                }
            },
            _enableHover: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxDataTable('enableHover', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxDataTable('enableHover');
                }
            },
            _enableBrowserSelection: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxDataTable('enableBrowserSelection', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxDataTable('enableBrowserSelection');
                }
            },
            _filterable: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxDataTable('filterable', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxDataTable('filterable');
                }
            },
            _filterHeight: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxDataTable('filterHeight', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxDataTable('filterHeight');
                }
            },
            _filterMode: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxDataTable('filterMode', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxDataTable('filterMode');
                }
            },
            _groups: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxDataTable('groups', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxDataTable('groups');
                }
            },
            _groupsRenderer: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxDataTable('groupsRenderer', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxDataTable('groupsRenderer');
                }
            },
            _height: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxDataTable('height', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxDataTable('height');
                }
            },
            _initRowDetails: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxDataTable('initRowDetails', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxDataTable('initRowDetails');
                }
            },
            _incrementalSearch: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxDataTable('incrementalSearch', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxDataTable('incrementalSearch');
                }
            },
            _localization: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxDataTable('localization', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxDataTable('localization');
                }
            },
            _pagerHeight: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxDataTable('pagerHeight', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxDataTable('pagerHeight');
                }
            },
            _pageSize: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxDataTable('pageSize', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxDataTable('pageSize');
                }
            },
            _pageSizeOptions: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxDataTable('pageSizeOptions', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxDataTable('pageSizeOptions');
                }
            },
            _pageable: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxDataTable('pageable', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxDataTable('pageable');
                }
            },
            _pagerPosition: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxDataTable('pagerPosition', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxDataTable('pagerPosition');
                }
            },
            _pagerMode: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxDataTable('pagerMode', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxDataTable('pagerMode');
                }
            },
            _pagerButtonsCount: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxDataTable('pagerButtonsCount', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxDataTable('pagerButtonsCount');
                }
            },
            _pagerRenderer: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxDataTable('pagerRenderer', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxDataTable('pagerRenderer');
                }
            },
            _ready: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxDataTable('ready', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxDataTable('ready');
                }
            },
            _rowDetails: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxDataTable('rowDetails', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxDataTable('rowDetails');
                }
            },
            _renderToolbar: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxDataTable('renderToolbar', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxDataTable('renderToolbar');
                }
            },
            _renderStatusBar: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxDataTable('renderStatusBar', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxDataTable('renderStatusBar');
                }
            },
            _rendering: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxDataTable('rendering', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxDataTable('rendering');
                }
            },
            _rendered: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxDataTable('rendered', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxDataTable('rendered');
                }
            },
            _rtl: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxDataTable('rtl', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxDataTable('rtl');
                }
            },
            _source: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxDataTable('source', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxDataTable('source');
                }
            },
            _sortable: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxDataTable('sortable', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxDataTable('sortable');
                }
            },
            _showAggregates: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxDataTable('showAggregates', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxDataTable('showAggregates');
                }
            },
            _showToolbar: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxDataTable('showToolbar', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxDataTable('showToolbar');
                }
            },
            _showStatusbar: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxDataTable('showStatusbar', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxDataTable('showStatusbar');
                }
            },
            _statusBarHeight: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxDataTable('statusBarHeight', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxDataTable('statusBarHeight');
                }
            },
            _scrollBarSize: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxDataTable('scrollBarSize', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxDataTable('scrollBarSize');
                }
            },
            _selectionMode: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxDataTable('selectionMode', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxDataTable('selectionMode');
                }
            },
            _serverProcessing: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxDataTable('serverProcessing', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxDataTable('serverProcessing');
                }
            },
            _showHeader: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxDataTable('showHeader', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxDataTable('showHeader');
                }
            },
            _theme: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxDataTable('theme', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxDataTable('theme');
                }
            },
            _toolbarHeight: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxDataTable('toolbarHeight', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxDataTable('toolbarHeight');
                }
            },
            _width: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxDataTable('width', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxDataTable('width');
                }
            },
            __createComponent__: function (options) {
                let widgetOptions;
                options ? widgetOptions = options : widgetOptions = this.__manageProps__();
                JQXLite(this.componentSelector).jqxDataTable(widgetOptions);
                this.__extendProps__();
                this.__wireEvents__();
            },
            __manageProps__: function () {
                const widgetProps = ['altRows','autoRowHeight','aggregatesHeight','autoShowLoadElement','columnsHeight','columns','columnGroups','columnsResize','columnsReorder','disabled','editable','editSettings','exportSettings','enableHover','enableBrowserSelection','filterable','filterHeight','filterMode','groups','groupsRenderer','height','initRowDetails','incrementalSearch','localization','pagerHeight','pageSize','pageSizeOptions','pageable','pagerPosition','pagerMode','pagerButtonsCount','pagerRenderer','ready','rowDetails','renderToolbar','renderStatusBar','rendering','rendered','rtl','source','sortable','showAggregates','showToolbar','showStatusbar','statusBarHeight','scrollBarSize','selectionMode','serverProcessing','showHeader','theme','toolbarHeight','width'];
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

                Object.defineProperty(that, 'altRows', {
                    get: function() {
                        return that._altRows();
                    },
                    set: function(newValue) {
                        that._altRows(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'autoRowHeight', {
                    get: function() {
                        return that._autoRowHeight();
                    },
                    set: function(newValue) {
                        that._autoRowHeight(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'aggregatesHeight', {
                    get: function() {
                        return that._aggregatesHeight();
                    },
                    set: function(newValue) {
                        that._aggregatesHeight(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'autoShowLoadElement', {
                    get: function() {
                        return that._autoShowLoadElement();
                    },
                    set: function(newValue) {
                        that._autoShowLoadElement(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'columnsHeight', {
                    get: function() {
                        return that._columnsHeight();
                    },
                    set: function(newValue) {
                        that._columnsHeight(newValue);
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
                Object.defineProperty(that, 'columnGroups', {
                    get: function() {
                        return that._columnGroups();
                    },
                    set: function(newValue) {
                        that._columnGroups(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'columnsResize', {
                    get: function() {
                        return that._columnsResize();
                    },
                    set: function(newValue) {
                        that._columnsResize(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'columnsReorder', {
                    get: function() {
                        return that._columnsReorder();
                    },
                    set: function(newValue) {
                        that._columnsReorder(newValue);
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
                Object.defineProperty(that, 'editable', {
                    get: function() {
                        return that._editable();
                    },
                    set: function(newValue) {
                        that._editable(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'editSettings', {
                    get: function() {
                        return that._editSettings();
                    },
                    set: function(newValue) {
                        that._editSettings(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'exportSettings', {
                    get: function() {
                        return that._exportSettings();
                    },
                    set: function(newValue) {
                        that._exportSettings(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'enableHover', {
                    get: function() {
                        return that._enableHover();
                    },
                    set: function(newValue) {
                        that._enableHover(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'enableBrowserSelection', {
                    get: function() {
                        return that._enableBrowserSelection();
                    },
                    set: function(newValue) {
                        that._enableBrowserSelection(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'filterable', {
                    get: function() {
                        return that._filterable();
                    },
                    set: function(newValue) {
                        that._filterable(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'filterHeight', {
                    get: function() {
                        return that._filterHeight();
                    },
                    set: function(newValue) {
                        that._filterHeight(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'filterMode', {
                    get: function() {
                        return that._filterMode();
                    },
                    set: function(newValue) {
                        that._filterMode(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'groups', {
                    get: function() {
                        return that._groups();
                    },
                    set: function(newValue) {
                        that._groups(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'groupsRenderer', {
                    get: function() {
                        return that._groupsRenderer();
                    },
                    set: function(newValue) {
                        that._groupsRenderer(newValue);
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
                Object.defineProperty(that, 'initRowDetails', {
                    get: function() {
                        return that._initRowDetails();
                    },
                    set: function(newValue) {
                        that._initRowDetails(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'incrementalSearch', {
                    get: function() {
                        return that._incrementalSearch();
                    },
                    set: function(newValue) {
                        that._incrementalSearch(newValue);
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
                Object.defineProperty(that, 'pagerHeight', {
                    get: function() {
                        return that._pagerHeight();
                    },
                    set: function(newValue) {
                        that._pagerHeight(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'pageSize', {
                    get: function() {
                        return that._pageSize();
                    },
                    set: function(newValue) {
                        that._pageSize(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'pageSizeOptions', {
                    get: function() {
                        return that._pageSizeOptions();
                    },
                    set: function(newValue) {
                        that._pageSizeOptions(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'pageable', {
                    get: function() {
                        return that._pageable();
                    },
                    set: function(newValue) {
                        that._pageable(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'pagerPosition', {
                    get: function() {
                        return that._pagerPosition();
                    },
                    set: function(newValue) {
                        that._pagerPosition(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'pagerMode', {
                    get: function() {
                        return that._pagerMode();
                    },
                    set: function(newValue) {
                        that._pagerMode(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'pagerButtonsCount', {
                    get: function() {
                        return that._pagerButtonsCount();
                    },
                    set: function(newValue) {
                        that._pagerButtonsCount(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'pagerRenderer', {
                    get: function() {
                        return that._pagerRenderer();
                    },
                    set: function(newValue) {
                        that._pagerRenderer(newValue);
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
                Object.defineProperty(that, 'rowDetails', {
                    get: function() {
                        return that._rowDetails();
                    },
                    set: function(newValue) {
                        that._rowDetails(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'renderToolbar', {
                    get: function() {
                        return that._renderToolbar();
                    },
                    set: function(newValue) {
                        that._renderToolbar(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'renderStatusBar', {
                    get: function() {
                        return that._renderStatusBar();
                    },
                    set: function(newValue) {
                        that._renderStatusBar(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'rendering', {
                    get: function() {
                        return that._rendering();
                    },
                    set: function(newValue) {
                        that._rendering(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'rendered', {
                    get: function() {
                        return that._rendered();
                    },
                    set: function(newValue) {
                        that._rendered(newValue);
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
                Object.defineProperty(that, 'sortable', {
                    get: function() {
                        return that._sortable();
                    },
                    set: function(newValue) {
                        that._sortable(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'showAggregates', {
                    get: function() {
                        return that._showAggregates();
                    },
                    set: function(newValue) {
                        that._showAggregates(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'showToolbar', {
                    get: function() {
                        return that._showToolbar();
                    },
                    set: function(newValue) {
                        that._showToolbar(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'showStatusbar', {
                    get: function() {
                        return that._showStatusbar();
                    },
                    set: function(newValue) {
                        that._showStatusbar(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'statusBarHeight', {
                    get: function() {
                        return that._statusBarHeight();
                    },
                    set: function(newValue) {
                        that._statusBarHeight(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'scrollBarSize', {
                    get: function() {
                        return that._scrollBarSize();
                    },
                    set: function(newValue) {
                        that._scrollBarSize(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'selectionMode', {
                    get: function() {
                        return that._selectionMode();
                    },
                    set: function(newValue) {
                        that._selectionMode(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'serverProcessing', {
                    get: function() {
                        return that._serverProcessing();
                    },
                    set: function(newValue) {
                        that._serverProcessing(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'showHeader', {
                    get: function() {
                        return that._showHeader();
                    },
                    set: function(newValue) {
                        that._showHeader(newValue);
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
                Object.defineProperty(that, 'toolbarHeight', {
                    get: function() {
                        return that._toolbarHeight();
                    },
                    set: function(newValue) {
                        that._toolbarHeight(newValue);
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
                JQXLite(this.componentSelector).on('cellBeginEdit', function (event) { that.$emit('cellBeginEdit', event); });
                JQXLite(this.componentSelector).on('cellEndEdit', function (event) { that.$emit('cellEndEdit', event); });
                JQXLite(this.componentSelector).on('cellValueChanged', function (event) { that.$emit('cellValueChanged', event); });
                JQXLite(this.componentSelector).on('columnResized', function (event) { that.$emit('columnResized', event); });
                JQXLite(this.componentSelector).on('columnReordered', function (event) { that.$emit('columnReordered', event); });
                JQXLite(this.componentSelector).on('sort', function (event) { that.$emit('sort', event); });
                JQXLite(this.componentSelector).on('filter', function (event) { that.$emit('filter', event); });
                JQXLite(this.componentSelector).on('pageChanged', function (event) { that.$emit('pageChanged', event); });
                JQXLite(this.componentSelector).on('pageSizeChanged', function (event) { that.$emit('pageSizeChanged', event); });
                JQXLite(this.componentSelector).on('rowClick', function (event) { that.$emit('rowClick', event); });
                JQXLite(this.componentSelector).on('rowDoubleClick', function (event) { that.$emit('rowDoubleClick', event); });
                JQXLite(this.componentSelector).on('rowSelect', function (event) { that.$emit('rowSelect', event); });
                JQXLite(this.componentSelector).on('rowUnselect', function (event) { that.$emit('rowUnselect', event); });
                JQXLite(this.componentSelector).on('rowBeginEdit', function (event) { that.$emit('rowBeginEdit', event); });
                JQXLite(this.componentSelector).on('rowEndEdit', function (event) { that.$emit('rowEndEdit', event); });
                JQXLite(this.componentSelector).on('rowExpand', function (event) { that.$emit('rowExpand', event); });
                JQXLite(this.componentSelector).on('rowCollapse', function (event) { that.$emit('rowCollapse', event); });
            }
        }
    }
</script>
