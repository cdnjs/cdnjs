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
    import '../jqwidgets/jqxlistbox.js';
    import '../jqwidgets/jqxdragdrop.js';

    export default {
        props: {
            autoHeight: Boolean,
            allowDrag: Boolean,
            allowDrop: Boolean,
            checkboxes: Boolean,
            disabled: Boolean,
            displayMember: String,
            dropAction: String,
            dragStart: Function,
            dragEnd: Function,
            enableHover: Boolean,
            enableSelection: Boolean,
            equalItemsWidth: Boolean,
            filterable: Boolean,
            filterHeight: Number,
            filterDelay: Number,
            filterPlaceHolder: String,
            height: [String, Number],
            hasThreeStates: Boolean,
            itemHeight: Number,
            incrementalSearch: Boolean,
            incrementalSearchDelay: Number,
            multiple: Boolean,
            multipleextended: Boolean,
            renderer: Function,
            rendered: Function,
            rtl: Boolean,
            selectedIndex: Number,
            selectedIndexes: Object,
            source: [Array, Object],
            scrollBarSize: Number,
            searchMode: String,
            theme: String,
            valueMember: String,
            width: [String, Number],
            autoCreate: {
                default: true,
                type: Boolean
            }
        },
        created: function () {
            this.id = 'jqxListBox' + JQXLite.generateID();
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
                JQXLite(this.componentSelector).jqxListBox(options);
            },
            getOptions: function () {
                const usedProps = Object.keys(this.__manageProps__());
                const resultToReturn = {};
                for (let i = 0; i < usedProps.length; i++) {
                    resultToReturn[usedProps[i]] = JQXLite(this.componentSelector).jqxListBox(usedProps[i]);
                }
                return resultToReturn;
            },
            addItem: function(Item) {
                JQXLite(this.componentSelector).jqxListBox('addItem', Item);  
            },
            beginUpdate: function() {
                JQXLite(this.componentSelector).jqxListBox('beginUpdate');  
            },
            clear: function() {
                JQXLite(this.componentSelector).jqxListBox('clear');  
            },
            clearSelection: function() {
                JQXLite(this.componentSelector).jqxListBox('clearSelection');  
            },
            checkIndex: function(Index) {
                JQXLite(this.componentSelector).jqxListBox('checkIndex', Index);  
            },
            checkItem: function(Item) {
                JQXLite(this.componentSelector).jqxListBox('checkItem', Item);  
            },
            checkAll: function() {
                JQXLite(this.componentSelector).jqxListBox('checkAll');  
            },
            clearFilter: function() {
                JQXLite(this.componentSelector).jqxListBox('clearFilter');  
            },
            destroy: function() {
                JQXLite(this.componentSelector).jqxListBox('destroy');  
            },
            disableItem: function(Item) {
                JQXLite(this.componentSelector).jqxListBox('disableItem', Item);  
            },
            disableAt: function(Index) {
                JQXLite(this.componentSelector).jqxListBox('disableAt', Index);  
            },
            enableItem: function(Item) {
                JQXLite(this.componentSelector).jqxListBox('enableItem', Item);  
            },
            enableAt: function(Index) {
                JQXLite(this.componentSelector).jqxListBox('enableAt', Index);  
            },
            ensureVisible: function(item) {
                JQXLite(this.componentSelector).jqxListBox('ensureVisible', item);  
            },
            endUpdate: function() {
                JQXLite(this.componentSelector).jqxListBox('endUpdate');  
            },
            focus: function() {
                JQXLite(this.componentSelector).jqxListBox('focus');  
            },
            getItems: function() {
                return JQXLite(this.componentSelector).jqxListBox('getItems');  
            },
            getSelectedItems: function() {
                return JQXLite(this.componentSelector).jqxListBox('getSelectedItems');  
            },
            getCheckedItems: function() {
                return JQXLite(this.componentSelector).jqxListBox('getCheckedItems');  
            },
            getItem: function(Index) {
                return JQXLite(this.componentSelector).jqxListBox('getItem', Index);  
            },
            getItemByValue: function(Item) {
                return JQXLite(this.componentSelector).jqxListBox('getItemByValue', Item);  
            },
            getSelectedItem: function() {
                return JQXLite(this.componentSelector).jqxListBox('getSelectedItem');  
            },
            getSelectedIndex: function() {
                return JQXLite(this.componentSelector).jqxListBox('getSelectedIndex');  
            },
            insertAt: function(Item, Index) {
                JQXLite(this.componentSelector).jqxListBox('insertAt', Item, Index);  
            },
            invalidate: function() {
                JQXLite(this.componentSelector).jqxListBox('invalidate');  
            },
            indeterminateItem: function(Item) {
                JQXLite(this.componentSelector).jqxListBox('indeterminateItem', Item);  
            },
            indeterminateIndex: function(Index) {
                JQXLite(this.componentSelector).jqxListBox('indeterminateIndex', Index);  
            },
            loadFromSelect: function(selector) {
                JQXLite(this.componentSelector).jqxListBox('loadFromSelect', selector);  
            },
            removeItem: function(Item) {
                JQXLite(this.componentSelector).jqxListBox('removeItem', Item);  
            },
            removeAt: function(Index) {
                JQXLite(this.componentSelector).jqxListBox('removeAt', Index);  
            },
            render: function() {
                JQXLite(this.componentSelector).jqxListBox('render');  
            },
            refresh: function() {
                JQXLite(this.componentSelector).jqxListBox('refresh');  
            },
            selectItem: function(Item) {
                JQXLite(this.componentSelector).jqxListBox('selectItem', Item);  
            },
            selectIndex: function(Index) {
                JQXLite(this.componentSelector).jqxListBox('selectIndex', Index);  
            },
            updateItem: function(Item, Value) {
                JQXLite(this.componentSelector).jqxListBox('updateItem', Item, Value);  
            },
            updateAt: function(item, index) {
                JQXLite(this.componentSelector).jqxListBox('updateAt', item, index);  
            },
            unselectIndex: function(index) {
                JQXLite(this.componentSelector).jqxListBox('unselectIndex', index);  
            },
            unselectItem: function(item) {
                JQXLite(this.componentSelector).jqxListBox('unselectItem', item);  
            },
            uncheckIndex: function(index) {
                JQXLite(this.componentSelector).jqxListBox('uncheckIndex', index);  
            },
            uncheckItem: function(item) {
                JQXLite(this.componentSelector).jqxListBox('uncheckItem', item);  
            },
            uncheckAll: function() {
                JQXLite(this.componentSelector).jqxListBox('uncheckAll');  
            },
            val: function(value) {
                if (value !== undefined) {
                    JQXLite(this.componentSelector).jqxListBox('val',  value)
                } else {
                    return JQXLite(this.componentSelector).jqxListBox('val');
                }
            },
            _autoHeight: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxListBox('autoHeight', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxListBox('autoHeight');
                }
            },
            _allowDrag: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxListBox('allowDrag', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxListBox('allowDrag');
                }
            },
            _allowDrop: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxListBox('allowDrop', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxListBox('allowDrop');
                }
            },
            _checkboxes: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxListBox('checkboxes', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxListBox('checkboxes');
                }
            },
            _disabled: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxListBox('disabled', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxListBox('disabled');
                }
            },
            _displayMember: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxListBox('displayMember', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxListBox('displayMember');
                }
            },
            _dropAction: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxListBox('dropAction', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxListBox('dropAction');
                }
            },
            _dragStart: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxListBox('dragStart', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxListBox('dragStart');
                }
            },
            _dragEnd: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxListBox('dragEnd', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxListBox('dragEnd');
                }
            },
            _enableHover: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxListBox('enableHover', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxListBox('enableHover');
                }
            },
            _enableSelection: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxListBox('enableSelection', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxListBox('enableSelection');
                }
            },
            _equalItemsWidth: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxListBox('equalItemsWidth', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxListBox('equalItemsWidth');
                }
            },
            _filterable: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxListBox('filterable', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxListBox('filterable');
                }
            },
            _filterHeight: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxListBox('filterHeight', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxListBox('filterHeight');
                }
            },
            _filterDelay: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxListBox('filterDelay', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxListBox('filterDelay');
                }
            },
            _filterPlaceHolder: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxListBox('filterPlaceHolder', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxListBox('filterPlaceHolder');
                }
            },
            _height: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxListBox('height', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxListBox('height');
                }
            },
            _hasThreeStates: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxListBox('hasThreeStates', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxListBox('hasThreeStates');
                }
            },
            _itemHeight: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxListBox('itemHeight', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxListBox('itemHeight');
                }
            },
            _incrementalSearch: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxListBox('incrementalSearch', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxListBox('incrementalSearch');
                }
            },
            _incrementalSearchDelay: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxListBox('incrementalSearchDelay', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxListBox('incrementalSearchDelay');
                }
            },
            _multiple: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxListBox('multiple', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxListBox('multiple');
                }
            },
            _multipleextended: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxListBox('multipleextended', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxListBox('multipleextended');
                }
            },
            _renderer: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxListBox('renderer', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxListBox('renderer');
                }
            },
            _rendered: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxListBox('rendered', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxListBox('rendered');
                }
            },
            _rtl: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxListBox('rtl', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxListBox('rtl');
                }
            },
            _selectedIndex: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxListBox('selectedIndex', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxListBox('selectedIndex');
                }
            },
            _selectedIndexes: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxListBox('selectedIndexes', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxListBox('selectedIndexes');
                }
            },
            _source: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxListBox('source', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxListBox('source');
                }
            },
            _scrollBarSize: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxListBox('scrollBarSize', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxListBox('scrollBarSize');
                }
            },
            _searchMode: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxListBox('searchMode', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxListBox('searchMode');
                }
            },
            _theme: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxListBox('theme', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxListBox('theme');
                }
            },
            _valueMember: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxListBox('valueMember', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxListBox('valueMember');
                }
            },
            _width: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxListBox('width', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxListBox('width');
                }
            },
            __createComponent__: function (options) {
                let widgetOptions;
                options ? widgetOptions = options : widgetOptions = this.__manageProps__();
                JQXLite(this.componentSelector).jqxListBox(widgetOptions);
                this.__extendProps__();
                this.__wireEvents__();
            },
            __manageProps__: function () {
                const widgetProps = ['autoHeight','allowDrag','allowDrop','checkboxes','disabled','displayMember','dropAction','dragStart','dragEnd','enableHover','enableSelection','equalItemsWidth','filterable','filterHeight','filterDelay','filterPlaceHolder','height','hasThreeStates','itemHeight','incrementalSearch','incrementalSearchDelay','multiple','multipleextended','renderer','rendered','rtl','selectedIndex','selectedIndexes','source','scrollBarSize','searchMode','theme','valueMember','width'];
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

                Object.defineProperty(that, 'autoHeight', {
                    get: function() {
                        return that._autoHeight();
                    },
                    set: function(newValue) {
                        that._autoHeight(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'allowDrag', {
                    get: function() {
                        return that._allowDrag();
                    },
                    set: function(newValue) {
                        that._allowDrag(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'allowDrop', {
                    get: function() {
                        return that._allowDrop();
                    },
                    set: function(newValue) {
                        that._allowDrop(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'checkboxes', {
                    get: function() {
                        return that._checkboxes();
                    },
                    set: function(newValue) {
                        that._checkboxes(newValue);
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
                Object.defineProperty(that, 'dragStart', {
                    get: function() {
                        return that._dragStart();
                    },
                    set: function(newValue) {
                        that._dragStart(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'dragEnd', {
                    get: function() {
                        return that._dragEnd();
                    },
                    set: function(newValue) {
                        that._dragEnd(newValue);
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
                Object.defineProperty(that, 'enableSelection', {
                    get: function() {
                        return that._enableSelection();
                    },
                    set: function(newValue) {
                        that._enableSelection(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'equalItemsWidth', {
                    get: function() {
                        return that._equalItemsWidth();
                    },
                    set: function(newValue) {
                        that._equalItemsWidth(newValue);
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
                Object.defineProperty(that, 'filterDelay', {
                    get: function() {
                        return that._filterDelay();
                    },
                    set: function(newValue) {
                        that._filterDelay(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'filterPlaceHolder', {
                    get: function() {
                        return that._filterPlaceHolder();
                    },
                    set: function(newValue) {
                        that._filterPlaceHolder(newValue);
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
                Object.defineProperty(that, 'hasThreeStates', {
                    get: function() {
                        return that._hasThreeStates();
                    },
                    set: function(newValue) {
                        that._hasThreeStates(newValue);
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
                Object.defineProperty(that, 'incrementalSearchDelay', {
                    get: function() {
                        return that._incrementalSearchDelay();
                    },
                    set: function(newValue) {
                        that._incrementalSearchDelay(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'multiple', {
                    get: function() {
                        return that._multiple();
                    },
                    set: function(newValue) {
                        that._multiple(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'multipleextended', {
                    get: function() {
                        return that._multipleextended();
                    },
                    set: function(newValue) {
                        that._multipleextended(newValue);
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
                Object.defineProperty(that, 'selectedIndex', {
                    get: function() {
                        return that._selectedIndex();
                    },
                    set: function(newValue) {
                        that._selectedIndex(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'selectedIndexes', {
                    get: function() {
                        return that._selectedIndexes();
                    },
                    set: function(newValue) {
                        that._selectedIndexes(newValue);
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
            },
            __twoWayDataBinding__: function () {
                const value = JQXLite(this.componentSelector).jqxListBox('val');
                this.$emit('input', value);
            },
            __wireEvents__: function () {
                const that = this;

                JQXLite(this.componentSelector).on('bindingComplete', function (event) { that.$emit('bindingComplete', event); });
                JQXLite(this.componentSelector).on('change', function (event) { that.$emit('change', event); that.__twoWayDataBinding__(); });
                JQXLite(this.componentSelector).on('checkChange', function (event) { that.$emit('checkChange', event); });
                JQXLite(this.componentSelector).on('dragStart', function (event) { that.$emit('dragStart', event); });
                JQXLite(this.componentSelector).on('dragEnd', function (event) { that.$emit('dragEnd', event); });
                JQXLite(this.componentSelector).on('select', function (event) { that.$emit('select', event); });
                JQXLite(this.componentSelector).on('unselect', function (event) { that.$emit('unselect', event); });
            }
        }
    }
</script>
