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
    import '../jqwidgets/jqxdropdownlist.js';

    export default {
        props: {
            autoOpen: Boolean,
            autoDropDownHeight: Boolean,
            animationType: String,
            checkboxes: Boolean,
            closeDelay: Number,
            disabled: Boolean,
            displayMember: String,
            dropDownHorizontalAlignment: String,
            dropDownVerticalAlignment: String,
            dropDownHeight: Number,
            dropDownWidth: Number,
            enableSelection: Boolean,
            enableBrowserBoundsDetection: Boolean,
            enableHover: Boolean,
            filterable: Boolean,
            filterHeight: Number,
            filterDelay: Number,
            filterPlaceHolder: String,
            height: [Number, String],
            incrementalSearch: Boolean,
            incrementalSearchDelay: Number,
            itemHeight: Number,
            openDelay: Number,
            placeHolder: String,
            popupZIndex: Number,
            rtl: Boolean,
            renderer: Function,
            selectionRenderer: Function,
            searchMode: String,
            source: [Array, Object],
            selectedIndex: Number,
            theme: String,
            template: String,
            valueMember: String,
            width: [Number, String],
            autoCreate: {
                default: true,
                type: Boolean
            }
        },
        created: function () {
            this.id = 'jqxDropDownList' + JQXLite.generateID();
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
                JQXLite(this.componentSelector).jqxDropDownList(options);
            },
            getOptions: function () {
                const usedProps = Object.keys(this.__manageProps__());
                const resultToReturn = {};
                for (let i = 0; i < usedProps.length; i++) {
                    resultToReturn[usedProps[i]] = JQXLite(this.componentSelector).jqxDropDownList(usedProps[i]);
                }
                return resultToReturn;
            },
            addItem: function(item) {
                JQXLite(this.componentSelector).jqxDropDownList('addItem', item);  
            },
            clearSelection: function() {
                JQXLite(this.componentSelector).jqxDropDownList('clearSelection');  
            },
            clear: function() {
                JQXLite(this.componentSelector).jqxDropDownList('clear');  
            },
            close: function() {
                JQXLite(this.componentSelector).jqxDropDownList('close');  
            },
            checkIndex: function(index) {
                JQXLite(this.componentSelector).jqxDropDownList('checkIndex', index);  
            },
            checkItem: function(item) {
                JQXLite(this.componentSelector).jqxDropDownList('checkItem', item);  
            },
            checkAll: function() {
                JQXLite(this.componentSelector).jqxDropDownList('checkAll');  
            },
            clearFilter: function() {
                JQXLite(this.componentSelector).jqxDropDownList('clearFilter');  
            },
            destroy: function() {
                JQXLite(this.componentSelector).jqxDropDownList('destroy');  
            },
            disableItem: function(item) {
                JQXLite(this.componentSelector).jqxDropDownList('disableItem', item);  
            },
            disableAt: function(index) {
                JQXLite(this.componentSelector).jqxDropDownList('disableAt', index);  
            },
            enableItem: function(item) {
                JQXLite(this.componentSelector).jqxDropDownList('enableItem', item);  
            },
            enableAt: function(index) {
                JQXLite(this.componentSelector).jqxDropDownList('enableAt', index);  
            },
            ensureVisible: function(index) {
                JQXLite(this.componentSelector).jqxDropDownList('ensureVisible', index);  
            },
            focus: function() {
                JQXLite(this.componentSelector).jqxDropDownList('focus');  
            },
            getItem: function(index) {
                return JQXLite(this.componentSelector).jqxDropDownList('getItem', index);  
            },
            getItemByValue: function(itemValue) {
                return JQXLite(this.componentSelector).jqxDropDownList('getItemByValue', itemValue);  
            },
            getItems: function() {
                return JQXLite(this.componentSelector).jqxDropDownList('getItems');  
            },
            getCheckedItems: function() {
                return JQXLite(this.componentSelector).jqxDropDownList('getCheckedItems');  
            },
            getSelectedItem: function() {
                return JQXLite(this.componentSelector).jqxDropDownList('getSelectedItem');  
            },
            getSelectedIndex: function() {
                return JQXLite(this.componentSelector).jqxDropDownList('getSelectedIndex');  
            },
            insertAt: function(item, index) {
                JQXLite(this.componentSelector).jqxDropDownList('insertAt', item, index);  
            },
            isOpened: function() {
                return JQXLite(this.componentSelector).jqxDropDownList('isOpened');  
            },
            indeterminateIndex: function(index) {
                JQXLite(this.componentSelector).jqxDropDownList('indeterminateIndex', index);  
            },
            indeterminateItem: function(item) {
                JQXLite(this.componentSelector).jqxDropDownList('indeterminateItem', item);  
            },
            loadFromSelect: function(arg) {
                JQXLite(this.componentSelector).jqxDropDownList('loadFromSelect', arg);  
            },
            open: function() {
                JQXLite(this.componentSelector).jqxDropDownList('open');  
            },
            removeItem: function(item) {
                JQXLite(this.componentSelector).jqxDropDownList('removeItem', item);  
            },
            removeAt: function(index) {
                JQXLite(this.componentSelector).jqxDropDownList('removeAt', index);  
            },
            selectIndex: function(index) {
                JQXLite(this.componentSelector).jqxDropDownList('selectIndex', index);  
            },
            selectItem: function(item) {
                JQXLite(this.componentSelector).jqxDropDownList('selectItem', item);  
            },
            setContent: function(content) {
                JQXLite(this.componentSelector).jqxDropDownList('setContent', content);  
            },
            updateItem: function(newItem, item) {
                JQXLite(this.componentSelector).jqxDropDownList('updateItem', newItem, item);  
            },
            updateAt: function(item, index) {
                JQXLite(this.componentSelector).jqxDropDownList('updateAt', item, index);  
            },
            unselectIndex: function(index) {
                JQXLite(this.componentSelector).jqxDropDownList('unselectIndex', index);  
            },
            unselectItem: function(item) {
                JQXLite(this.componentSelector).jqxDropDownList('unselectItem', item);  
            },
            uncheckIndex: function(index) {
                JQXLite(this.componentSelector).jqxDropDownList('uncheckIndex', index);  
            },
            uncheckItem: function(item) {
                JQXLite(this.componentSelector).jqxDropDownList('uncheckItem', item);  
            },
            uncheckAll: function() {
                JQXLite(this.componentSelector).jqxDropDownList('uncheckAll');  
            },
            val: function(value) {
                if (value !== undefined) {
                    JQXLite(this.componentSelector).jqxDropDownList('val',  value)
                } else {
                    return JQXLite(this.componentSelector).jqxDropDownList('val');
                }
            },
            _autoOpen: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxDropDownList('autoOpen', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxDropDownList('autoOpen');
                }
            },
            _autoDropDownHeight: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxDropDownList('autoDropDownHeight', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxDropDownList('autoDropDownHeight');
                }
            },
            _animationType: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxDropDownList('animationType', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxDropDownList('animationType');
                }
            },
            _checkboxes: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxDropDownList('checkboxes', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxDropDownList('checkboxes');
                }
            },
            _closeDelay: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxDropDownList('closeDelay', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxDropDownList('closeDelay');
                }
            },
            _disabled: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxDropDownList('disabled', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxDropDownList('disabled');
                }
            },
            _displayMember: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxDropDownList('displayMember', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxDropDownList('displayMember');
                }
            },
            _dropDownHorizontalAlignment: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxDropDownList('dropDownHorizontalAlignment', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxDropDownList('dropDownHorizontalAlignment');
                }
            },
            _dropDownVerticalAlignment: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxDropDownList('dropDownVerticalAlignment', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxDropDownList('dropDownVerticalAlignment');
                }
            },
            _dropDownHeight: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxDropDownList('dropDownHeight', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxDropDownList('dropDownHeight');
                }
            },
            _dropDownWidth: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxDropDownList('dropDownWidth', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxDropDownList('dropDownWidth');
                }
            },
            _enableSelection: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxDropDownList('enableSelection', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxDropDownList('enableSelection');
                }
            },
            _enableBrowserBoundsDetection: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxDropDownList('enableBrowserBoundsDetection', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxDropDownList('enableBrowserBoundsDetection');
                }
            },
            _enableHover: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxDropDownList('enableHover', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxDropDownList('enableHover');
                }
            },
            _filterable: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxDropDownList('filterable', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxDropDownList('filterable');
                }
            },
            _filterHeight: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxDropDownList('filterHeight', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxDropDownList('filterHeight');
                }
            },
            _filterDelay: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxDropDownList('filterDelay', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxDropDownList('filterDelay');
                }
            },
            _filterPlaceHolder: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxDropDownList('filterPlaceHolder', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxDropDownList('filterPlaceHolder');
                }
            },
            _height: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxDropDownList('height', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxDropDownList('height');
                }
            },
            _incrementalSearch: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxDropDownList('incrementalSearch', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxDropDownList('incrementalSearch');
                }
            },
            _incrementalSearchDelay: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxDropDownList('incrementalSearchDelay', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxDropDownList('incrementalSearchDelay');
                }
            },
            _itemHeight: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxDropDownList('itemHeight', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxDropDownList('itemHeight');
                }
            },
            _openDelay: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxDropDownList('openDelay', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxDropDownList('openDelay');
                }
            },
            _placeHolder: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxDropDownList('placeHolder', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxDropDownList('placeHolder');
                }
            },
            _popupZIndex: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxDropDownList('popupZIndex', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxDropDownList('popupZIndex');
                }
            },
            _rtl: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxDropDownList('rtl', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxDropDownList('rtl');
                }
            },
            _renderer: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxDropDownList('renderer', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxDropDownList('renderer');
                }
            },
            _selectionRenderer: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxDropDownList('selectionRenderer', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxDropDownList('selectionRenderer');
                }
            },
            _searchMode: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxDropDownList('searchMode', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxDropDownList('searchMode');
                }
            },
            _source: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxDropDownList('source', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxDropDownList('source');
                }
            },
            _selectedIndex: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxDropDownList('selectedIndex', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxDropDownList('selectedIndex');
                }
            },
            _theme: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxDropDownList('theme', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxDropDownList('theme');
                }
            },
            _template: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxDropDownList('template', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxDropDownList('template');
                }
            },
            _valueMember: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxDropDownList('valueMember', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxDropDownList('valueMember');
                }
            },
            _width: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxDropDownList('width', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxDropDownList('width');
                }
            },
            __createComponent__: function (options) {
                let widgetOptions;
                options ? widgetOptions = options : widgetOptions = this.__manageProps__();
                JQXLite(this.componentSelector).jqxDropDownList(widgetOptions);
                this.__extendProps__();
                this.__wireEvents__();
            },
            __manageProps__: function () {
                const widgetProps = ['autoOpen','autoDropDownHeight','animationType','checkboxes','closeDelay','disabled','displayMember','dropDownHorizontalAlignment','dropDownVerticalAlignment','dropDownHeight','dropDownWidth','enableSelection','enableBrowserBoundsDetection','enableHover','filterable','filterHeight','filterDelay','filterPlaceHolder','height','incrementalSearch','incrementalSearchDelay','itemHeight','openDelay','placeHolder','popupZIndex','rtl','renderer','selectionRenderer','searchMode','source','selectedIndex','theme','template','valueMember','width'];
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

                Object.defineProperty(that, 'autoOpen', {
                    get: function() {
                        return that._autoOpen();
                    },
                    set: function(newValue) {
                        that._autoOpen(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'autoDropDownHeight', {
                    get: function() {
                        return that._autoDropDownHeight();
                    },
                    set: function(newValue) {
                        that._autoDropDownHeight(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'animationType', {
                    get: function() {
                        return that._animationType();
                    },
                    set: function(newValue) {
                        that._animationType(newValue);
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
                Object.defineProperty(that, 'closeDelay', {
                    get: function() {
                        return that._closeDelay();
                    },
                    set: function(newValue) {
                        that._closeDelay(newValue);
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
                Object.defineProperty(that, 'dropDownHorizontalAlignment', {
                    get: function() {
                        return that._dropDownHorizontalAlignment();
                    },
                    set: function(newValue) {
                        that._dropDownHorizontalAlignment(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'dropDownVerticalAlignment', {
                    get: function() {
                        return that._dropDownVerticalAlignment();
                    },
                    set: function(newValue) {
                        that._dropDownVerticalAlignment(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'dropDownHeight', {
                    get: function() {
                        return that._dropDownHeight();
                    },
                    set: function(newValue) {
                        that._dropDownHeight(newValue);
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
                Object.defineProperty(that, 'enableBrowserBoundsDetection', {
                    get: function() {
                        return that._enableBrowserBoundsDetection();
                    },
                    set: function(newValue) {
                        that._enableBrowserBoundsDetection(newValue);
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
                Object.defineProperty(that, 'openDelay', {
                    get: function() {
                        return that._openDelay();
                    },
                    set: function(newValue) {
                        that._openDelay(newValue);
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
                Object.defineProperty(that, 'selectionRenderer', {
                    get: function() {
                        return that._selectionRenderer();
                    },
                    set: function(newValue) {
                        that._selectionRenderer(newValue);
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
                const value = JQXLite(this.componentSelector).jqxDropDownList('val');
                this.$emit('input', value);
            },
            __wireEvents__: function () {
                const that = this;

                JQXLite(this.componentSelector).on('bindingComplete', function (event) { that.$emit('bindingComplete', event); });
                JQXLite(this.componentSelector).on('close', function (event) { that.$emit('close', event); });
                JQXLite(this.componentSelector).on('checkChange', function (event) { that.$emit('checkChange', event); });
                JQXLite(this.componentSelector).on('change', function (event) { that.$emit('change', event); that.__twoWayDataBinding__(); });
                JQXLite(this.componentSelector).on('open', function (event) { that.$emit('open', event); });
                JQXLite(this.componentSelector).on('select', function (event) { that.$emit('select', event); });
                JQXLite(this.componentSelector).on('unselect', function (event) { that.$emit('unselect', event); });
            }
        }
    }
</script>
