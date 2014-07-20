/**
 * A selection model that renders a column of checkboxes that can be toggled to
 * select or deselect rows. The default mode for this selection model is MULTI.
 *
 * The selection model will inject a header for the checkboxes in the first view
 * and according to the {@link #injectCheckbox} configuration.
 */
Ext.define('Ext.selection.CheckboxModel', {
    alias: 'selection.checkboxmodel',
    extend: 'Ext.selection.RowModel',

    /**
     * @cfg {"SINGLE"/"SIMPLE"/"MULTI"} mode
     * Modes of selection.
     * Valid values are `"SINGLE"`, `"SIMPLE"`, and `"MULTI"`.
     */
    mode: 'MULTI',

    /**
     * @cfg {Number/String} [injectCheckbox=0]
     * The index at which to insert the checkbox column.
     * Supported values are a numeric index, and the strings 'first' and 'last'.
     */
    injectCheckbox: 0,

    /**
     * @cfg {Boolean} checkOnly
     * True if rows can only be selected by clicking on the checkbox column.
     */
    checkOnly: false,
    
    /**
     * @cfg {Boolean} showHeaderCheckbox
     * Configure as `false` to not display the header checkbox at the top of the column.
     * When the store is a {@link Ext.data.BufferedStore BufferedStore}, this configuration will
     * not be available because the buffered data set does not always contain all data. 
     */
    showHeaderCheckbox: undefined,
    
    /**
     * @cfg {String} [checkSelector="x-grid-row-checker"]
     * The selector for determining whether the checkbox element is clicked. This may be changed to
     * allow for a wider area to be clicked, for example, the whole cell for the selector.
     */
    checkSelector: '.' + Ext.baseCSSPrefix + 'grid-row-checker',

    headerWidth: 24,

    // private
    checkerOnCls: Ext.baseCSSPrefix + 'grid-hd-checker-on',
    
    tdCls: Ext.baseCSSPrefix + 'grid-cell-special ' + Ext.baseCSSPrefix + 'grid-cell-row-checker',
    
    constructor: function(){
        var me = this;
        me.callParent(arguments);   
        
        // If mode is single and showHeaderCheck isn't explicity set to
        // true, hide it.
        if (me.mode === 'SINGLE' && me.showHeaderCheckbox !== true) {
            me.showHeaderCheckbox = false;
        } 
    },

    beforeViewRender: function(view) {
        var me = this,
            owner;

        me.callParent(arguments);

        // if we have a locked header, only hook up to the first
        if (!me.hasLockedHeader() || view.headerCt.lockedCt) {
            if (me.showHeaderCheckbox !== false) {
                view.headerCt.on('headerclick', me.onHeaderClick, me);
            }
            me.addCheckbox(view, true);
            owner = view.ownerCt;
            // Listen to the outermost reconfigure event
            if (view.headerCt.lockedCt) {
                owner = owner.ownerCt;
            }
            me.mon(owner, 'reconfigure', me.onReconfigure, me);
        }
    },

    bindComponent: function(view) {
        var me = this;
        me.sortable = false;
        me.callParent(arguments);
    },

    hasLockedHeader: function(){
        var views     = this.views,
            vLen      = views.length,
            v;

        for (v = 0; v < vLen; v++) {
            if (views[v].headerCt.lockedCt) {
                return true;
            }
        }
        return false;
    },

    /**
     * Add the header checkbox to the header row
     * @private
     * @param {Boolean} initial True if we're binding for the first time.
     */
    addCheckbox: function(view, initial){
        var me = this,
            checkbox = me.injectCheckbox,
            headerCt = view.headerCt;

        // Preserve behaviour of false, but not clear why that would ever be done.
        if (checkbox !== false) {
            if (checkbox === 'first') {
                checkbox = 0;
            } else if (checkbox === 'last') {
                checkbox = headerCt.getColumnCount();
            }
            Ext.suspendLayouts();
            if (view.getStore().isBufferedStore) {
                me.showHeaderCheckbox = false;
            }
            headerCt.add(checkbox,  me.getHeaderConfig());
            Ext.resumeLayouts();
        }

        if (initial !== true) {
            view.refresh();
        }
    },

    /**
     * Handles the grid's reconfigure event.  Adds the checkbox header if the columns have been reconfigured.
     * @private
     * @param {Ext.panel.Table} grid
     * @param {Ext.data.Store} store
     * @param {Object[]} columns
     */
    onReconfigure: function(grid, store, columns) {
        if(columns) {
            this.addCheckbox(this.views[0]);
        }
    },

    /**
     * Toggle the ui header between checked and unchecked state.
     * @param {Boolean} isChecked
     * @private
     */
    toggleUiHeader: function(isChecked) {
        var view     = this.views[0],
            headerCt = view.headerCt,
            checkHd  = headerCt.child('gridcolumn[isCheckerHd]'),
            cls = this.checkerOnCls;

        if (checkHd) {
            if (isChecked) {
                checkHd.addCls(cls);
            } else {
                checkHd.removeCls(cls);
            }
        }
    },

    /**
     * Toggle between selecting all and deselecting all when clicking on
     * a checkbox header.
     */
    onHeaderClick: function(headerCt, header, e) {
        if (header.isCheckerHd) {
            e.stopEvent();
            var me = this,
                isChecked = header.el.hasCls(Ext.baseCSSPrefix + 'grid-hd-checker-on');
                
            // Prevent focus changes on the view, since we're selecting/deselecting all records
            me.preventFocus = true;
            if (isChecked) {
                me.deselectAll();
            } else {
                me.selectAll();
            }
            delete me.preventFocus;
        }
    },

    /**
     * Retrieve a configuration to be used in a HeaderContainer.
     * This should be used when injectCheckbox is set to false.
     */
    getHeaderConfig: function() {
        var me = this,
            showCheck = me.showHeaderCheckbox !== false;     

        return {
            isCheckerHd: showCheck,
            text : '&#160;',
            clickTargetName: 'el',
            width: me.headerWidth,
            sortable: false,
            draggable: false,
            resizable: false,
            hideable: false,
            menuDisabled: true,
            dataIndex: '',
            tdCls: me.tdCls,
            cls: showCheck ? Ext.baseCSSPrefix + 'column-header-checkbox ' : '',
            defaultRenderer: me.renderer.bind(me),
            editRenderer: me.editRenderer || me.renderEmpty,
            locked: me.hasLockedHeader()
        };
    },

    renderEmpty: function() {
        return '&#160;';
    },

    // After refresh, ensure that the header checkbox state matches
    refresh: function() {
        this.callParent(arguments);
        this.updateHeaderState();
    },

    /**
     * Generates the HTML to be rendered in the injected checkbox column for each row.
     * Creates the standard checkbox markup by default; can be overridden to provide custom rendering.
     * See {@link Ext.grid.column.Column#renderer} for description of allowed parameters.
     */
    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
        return '<div class="' + Ext.baseCSSPrefix + 'grid-row-checker" role="presentation">&#160;</div>';
    },
    
    processSelection: function(view, record, item, index, e){
        var me = this,
            checker = e.getTarget(me.checkSelector),
            mode;
            
        // checkOnly set, but we didn't click on a checker.
        if (me.checkOnly && !checker) {
            return;
        }

        if (checker) {
            mode = me.getSelectionMode();
            // dont change the mode if its single otherwise
            // we would get multiple selection
            if (mode !== 'SINGLE') {
                me.setSelectionMode('SIMPLE');
            }
            me.selectWithEvent(record, e);
            me.setSelectionMode(mode);
        } else {
            me.selectWithEvent(record, e);
        }
    },

    /**
     * Synchronize header checker value as selection changes.
     * @private
     */
    onSelectChange: function() {
        this.callParent(arguments);
        if (!this.suspendChange) {
            this.updateHeaderState();
        }
    },

    /**
     * @private
     */
    onStoreLoad: function() {
        this.callParent(arguments);
        this.updateHeaderState();
    },

    onStoreAdd: function() {
        this.callParent(arguments);
        this.updateHeaderState();
    },

    onStoreRemove: function() {
        this.callParent(arguments);
        this.updateHeaderState();
    },
    
    onStoreRefresh: function(){
        this.callParent(arguments);    
        this.updateHeaderState();
    },
    
    maybeFireSelectionChange: function(fireEvent) {
        if (fireEvent && !this.suspendChange) {
            this.updateHeaderState();
        }
        this.callParent(arguments);
    },
    
    resumeChanges: function(){
        this.callParent();
        if (!this.suspendChange) {
            this.updateHeaderState();
        }
    },

    /**
     * @private
     */
    updateHeaderState: function() {
        // check to see if all records are selected
        var me = this,
            store = me.store,
            storeCount = store.getCount(),
            views = me.views,
            hdSelectStatus = false,
            selectedCount = 0,
            selected, len, i;
            
        if (!store.isBufferedStore && storeCount > 0) {
            selected = me.selected;
            hdSelectStatus = true;
            for (i = 0, len = selected.getCount(); i < len; ++i) {
                if (store.indexOfId(selected.getAt(i).id) === -1) {
                    break;
                }
                ++selectedCount;
            }
            hdSelectStatus = storeCount === selectedCount;
        }
            
        if (views && views.length) {
            me.toggleUiHeader(hdSelectStatus);
        }
    }
});
