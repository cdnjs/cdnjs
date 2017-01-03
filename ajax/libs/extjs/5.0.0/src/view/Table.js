/**
 * This class encapsulates the user interface for a tabular data set.
 * It acts as a centralized manager for controlling the various interface
 * elements of the view. This includes handling events, such as row and cell
 * level based DOM events. It also reacts to events from the underlying {@link Ext.selection.Model}
 * to provide visual feedback to the user.
 *
 * This class does not provide ways to manipulate the underlying data of the configured
 * {@link Ext.data.Store}.
 *
 * This is the base class for both {@link Ext.grid.View} and {@link Ext.tree.View} and is not
 * to be used directly.
 */
Ext.define('Ext.view.Table', {
    extend: 'Ext.view.View',
    alias: 'widget.tableview',
    requires: [
        'Ext.grid.CellContext',
        'Ext.view.TableLayout',
        'Ext.view.NodeCache',
        'Ext.util.DelayedTask',
        'Ext.util.MixedCollection'
    ],
    
    inheritableStatics: {
        // Events a TableView may fire.
        // Used by Ext.grid.locking.View to relay view events to user code
        events: [
            "blur",
            "focus",
            "move",
            "resize",
            "destroy",
            "beforedestroy",
            "boxready",
            "afterrender",
            "render",
            "beforerender",
            "removed",
            "hide",
            "beforehide",
            "show",
            "beforeshow",
            "enable",
            "disable",
            "added",
            "deactivate",
            "beforedeactivate",
            "activate",
            "beforeactivate",
            "cellkeydown",
            "beforecellkeydown",
            "cellmouseup",
            "beforecellmouseup",
            "cellmousedown",
            "beforecellmousedown",
            "cellcontextmenu",
            "beforecellcontextmenu",
            "celldblclick",
            "beforecelldblclick",
            "cellclick",
            "beforecellclick",
            "refresh",
            "itemremove",
            "itemadd",
            "itemupdate",
            "viewready",
            "beforerefresh",
            "unhighlightitem",
            "highlightitem",
            "focuschange",
            "deselect",
            "select",
            "beforedeselect",
            "beforeselect",
            "selectionchange",
            "containerkeydown",
            "containercontextmenu",
            "containerdblclick",
            "containerclick",
            "containermouseout",
            "containermouseover",
            "containermouseup",
            "containermousedown",
            "beforecontainerkeydown",
            "beforecontainercontextmenu",
            "beforecontainerdblclick",
            "beforecontainerclick",
            "beforecontainermouseout",
            "beforecontainermouseover",
            "beforecontainermouseup",
            "beforecontainermousedown",
            "itemkeydown",
            "itemcontextmenu",
            "itemdblclick",
            "itemclick",
            "itemmouseleave",
            "itemmouseenter",
            "itemmouseup",
            "itemmousedown",
            "beforeitemkeydown",
            "beforeitemcontextmenu",
            "beforeitemdblclick",
            "beforeitemclick",
            "beforeitemmouseleave",
            "beforeitemmouseenter",
            "beforeitemmouseup",
            "beforeitemmousedown",
            "statesave",
            "beforestatesave",
            "staterestore",
            "beforestaterestore",
            "uievent",
            "groupcollapse",
            "groupexpand"
        ]
    },

    componentLayout: 'tableview',

    baseCls: Ext.baseCSSPrefix + 'grid-view',

    unselectableCls: Ext.baseCSSPrefix + 'unselectable',

    /**
     * @cfg {String} [firstCls='x-grid-cell-first']
     * A CSS class to add to the *first* cell in every row to enable special styling for the first column.
     * If no styling is needed on the first column, this may be configured as `null`.
     */
    firstCls: Ext.baseCSSPrefix + 'grid-cell-first',

    /**
     * @cfg {String} [lastCls='x-grid-cell-last']
     * A CSS class to add to the *last* cell in every row to enable special styling for the last column.
     * If no styling is needed on the last column, this may be configured as `null`.
     */
    lastCls: Ext.baseCSSPrefix + 'grid-cell-last',

    selectedItemCls: Ext.baseCSSPrefix + 'grid-item-selected',
    selectedCellCls: Ext.baseCSSPrefix + 'grid-cell-selected',
    focusedItemCls: Ext.baseCSSPrefix + 'grid-item-focused',
    overItemCls: Ext.baseCSSPrefix + 'grid-item-over',
    altRowCls:   Ext.baseCSSPrefix + 'grid-item-alt',
    dirtyCls: Ext.baseCSSPrefix + 'grid-dirty-cell',
    rowClsRe: new RegExp('(?:^|\\s*)' + Ext.baseCSSPrefix + 'grid-row-(first|last|alt)(?:\\s+|$)', 'g'),
    cellRe: new RegExp(Ext.baseCSSPrefix + 'grid-cell-([^\\s]+)(?:\\s|$)', ''),
    positionBody: true,
    positionCells: false,
    stripeOnUpdate: null,

    // cfg docs inherited
    trackOver: true,

    /**
     * Override this function to apply custom CSS classes to rows during rendering. This function should return the
     * CSS class name (or empty string '' for none) that will be added to the row's wrapping div. To apply multiple
     * class names, simply return them space-delimited within the string (e.g. 'my-class another-class').
     * Example usage:
     *
     *     viewConfig: {
     *         getRowClass: function(record, rowIndex, rowParams, store){
     *             return record.get("valid") ? "row-valid" : "row-error";
     *         }
     *     }
     *
     * @param {Ext.data.Model} record The record corresponding to the current row.
     * @param {Number} index The row index.
     * @param {Object} rowParams **DEPRECATED.** For row body use the
     * {@link Ext.grid.feature.RowBody#getAdditionalData getAdditionalData} method of the rowbody feature.
     * @param {Ext.data.Store} store The store this grid is bound to
     * @return {String} a CSS class name to add to the row.
     * @method
     */
    getRowClass: null,

    /**
     * @cfg {Boolean} stripeRows
     * True to stripe the rows.
     *
     * This causes the CSS class **`x-grid-row-alt`** to be added to alternate rows of
     * the grid. A default CSS rule is provided which sets a background color, but you can override this
     * with a rule which either overrides the **background-color** style using the `!important`
     * modifier, or which uses a CSS selector of higher specificity.
     */
    stripeRows: true,

    /**
     * @cfg {Boolean} markDirty
     * True to show the dirty cell indicator when a cell has been modified.
     */
    markDirty : true,

    /**
     * @cfg {Boolean} enableTextSelection
     * True to enable text selections.
     */
     
    ariaRole: 'grid',

    /**
     * @property {Ext.view.Table} ownerGrid
     * A reference to the top-level owning grid component. This is actually the TablePanel
     * so it could be a tree.
     * @readonly
     * @private
     * @since 5.0.0
     */

    /**
     * @private
     * Outer tpl for TableView just to satisfy the validation within AbstractView.initComponent.
     */
    tpl: [
        '{%',
            'view = values.view;',
            'if (!(columns = values.columns)) {',
                'columns = values.columns = view.ownerCt.getVisibleColumnManager().getColumns();',
            '}',
            'values.fullWidth = 0;',
            // Stamp cellWidth into the columns
            'for (i = 0, len = columns.length; i < len; i++) {',
                'column = columns[i];',
                'values.fullWidth += (column.cellWidth = column.lastBox ? column.lastBox.width : column.width || column.minWidth);',
            '}',

            // Add the row/column line classes to the container element.
            'tableCls=values.tableCls=[];',
        '%}',
        '<div class="' + Ext.baseCSSPrefix + 'grid-item-container" style="width:{fullWidth}px">',
            '{[view.renderTHead(values, out, parent)]}',
            '{%',
                'view.renderRows(values.rows, values.columns, values.viewStartIndex, out);',
            '%}',
            '{[view.renderTFoot(values, out, parent)]}',
        '</div>',
        {
            definitions: 'var view, tableCls, columns, i, len, column;',
            priority: 0
        }
    ],

    outerRowTpl: [
        '<table id="{rowId}" ',
            'data-boundView="{view.id}" ',
            'data-recordId="{record.internalId}" ',
            'data-recordIndex="{recordIndex}" ',

            // Table width must be set to zero.
            // Similar issue to ext-theme-base/sass/src/panel/Table.scss
            // A table element does not obey the fixed width column total width upon first layout unless the width is zero.
            // This forces the table to immediately shrinkwrap its cells at their specified widths.
            'class="{[values.itemClasses.join(" ")]}" cellPadding="0" cellSpacing="0" {ariaTableAttr} style="width:0;{itemStyle}">',

                // Do NOT emit a <TBODY> tag in case the nextTpl has to emit a <COLGROUP> column sizer element.
                // Browser will create a tbody tag when it encounters the first <TR>
                '{%',
                    'this.nextTpl.applyOut(values, out, parent)',
                '%}',
        '</table>', {
            priority: 9999
        }
    ],

    rowTpl: [
        '{%',
            'var dataRowCls = values.recordIndex === -1 ? "" : " ' + Ext.baseCSSPrefix + 'grid-row";',
        '%}',
        '<tr class="{[values.rowClasses.join(" ")]} {[dataRowCls]}" {rowAttr:attributes} tabIndex="-1" {ariaRowAttr}>',
            '<tpl for="columns">' +
                '{%',
                    'parent.view.renderCell(values, parent.record, parent.recordIndex, parent.rowIndex, xindex - 1, out, parent)',
                 '%}',
            '</tpl>',
        '</tr>',
        {
            priority: 0
        }
    ],

    cellTpl: [
        '<td class="{tdCls}" {tdAttr} {[Ext.aria ? "id=\\"" + Ext.id() + "\\"" : ""]} style="width:{column.cellWidth}px;<tpl if="tdStyle">{tdStyle}</tpl>" {ariaCellAttr}>',
            '<div {unselectableAttr} class="' + Ext.baseCSSPrefix + 'grid-cell-inner {innerCls}" ',
                'style="text-align:{align};<tpl if="style">{style}</tpl>" {ariaCellInnerAttr}>{value}</div>',
        '</td>', {
            priority: 0
        }
    ],

    /**
     * @private
     * Flag to disable refreshing SelectionModel on view refresh. Table views render rows with selected CSS class already added if necessary.
     */
    refreshSelmodelOnRefresh: false,

    tableValues: {},

    // Private properties used during the row and cell render process.
    // They are allocated here on the prototype, and cleared/re-used to avoid GC churn during repeated rendering.
    rowValues: {
        itemClasses: [],
        rowClasses: []
    },
    cellValues: {
        classes: [
            Ext.baseCSSPrefix + 'grid-cell ' + Ext.baseCSSPrefix + 'grid-td' // for styles shared between cell and rowwrap
        ]
    },

    /// Private used for buffered rendering
    renderBuffer: document.createElement('div'),

     /**
      * @event beforecellclick
      * Fired before the cell click is processed. Return false to cancel the default action.
      * @param {Ext.view.Table} this
      * @param {HTMLElement} td The TD element for the cell.
      * @param {Number} cellIndex
      * @param {Ext.data.Model} record
      * @param {HTMLElement} tr The TR element for the cell.
      * @param {Number} rowIndex
      * @param {Ext.event.Event} e
      */

     /**
      * @event cellclick
      * Fired when table cell is clicked.
      * @param {Ext.view.Table} this
      * @param {HTMLElement} td The TD element for the cell.
      * @param {Number} cellIndex
      * @param {Ext.data.Model} record
      * @param {HTMLElement} tr The TR element for the cell.
      * @param {Number} rowIndex
      * @param {Ext.event.Event} e
      */

     /**
      * @event beforecelldblclick
      * Fired before the cell double click is processed. Return false to cancel the default action.
      * @param {Ext.view.Table} this
      * @param {HTMLElement} td The TD element for the cell.
      * @param {Number} cellIndex
      * @param {Ext.data.Model} record
      * @param {HTMLElement} tr The TR element for the cell.
      * @param {Number} rowIndex
      * @param {Ext.event.Event} e
      */

     /**
      * @event celldblclick
      * Fired when table cell is double clicked.
      * @param {Ext.view.Table} this
      * @param {HTMLElement} td The TD element for the cell.
      * @param {Number} cellIndex
      * @param {Ext.data.Model} record
      * @param {HTMLElement} tr The TR element for the cell.
      * @param {Number} rowIndex
      * @param {Ext.event.Event} e
      */

     /**
      * @event beforecellcontextmenu
      * Fired before the cell right click is processed. Return false to cancel the default action.
      * @param {Ext.view.Table} this
      * @param {HTMLElement} td The TD element for the cell.
      * @param {Number} cellIndex
      * @param {Ext.data.Model} record
      * @param {HTMLElement} tr The TR element for the cell.
      * @param {Number} rowIndex
      * @param {Ext.event.Event} e
      */

     /**
      * @event cellcontextmenu
      * Fired when table cell is right clicked.
      * @param {Ext.view.Table} this
      * @param {HTMLElement} td The TD element for the cell.
      * @param {Number} cellIndex
      * @param {Ext.data.Model} record
      * @param {HTMLElement} tr The TR element for the cell.
      * @param {Number} rowIndex
      * @param {Ext.event.Event} e
      */

     /**
      * @event beforecellmousedown
      * Fired before the cell mouse down is processed. Return false to cancel the default action.
      * @param {Ext.view.Table} this
      * @param {HTMLElement} td The TD element for the cell.
      * @param {Number} cellIndex
      * @param {Ext.data.Model} record
      * @param {HTMLElement} tr The TR element for the cell.
      * @param {Number} rowIndex
      * @param {Ext.event.Event} e
      */

     /**
      * @event cellmousedown
      * Fired when the mousedown event is captured on the cell.
      * @param {Ext.view.Table} this
      * @param {HTMLElement} td The TD element for the cell.
      * @param {Number} cellIndex
      * @param {Ext.data.Model} record
      * @param {HTMLElement} tr The TR element for the cell.
      * @param {Number} rowIndex
      * @param {Ext.event.Event} e
      */

     /**
      * @event beforecellmouseup
      * Fired before the cell mouse up is processed. Return false to cancel the default action.
      * @param {Ext.view.Table} this
      * @param {HTMLElement} td The TD element for the cell.
      * @param {Number} cellIndex
      * @param {Ext.data.Model} record
      * @param {HTMLElement} tr The TR element for the cell.
      * @param {Number} rowIndex
      * @param {Ext.event.Event} e
      */

     /**
      * @event cellmouseup
      * Fired when the mouseup event is captured on the cell.
      * @param {Ext.view.Table} this
      * @param {HTMLElement} td The TD element for the cell.
      * @param {Number} cellIndex
      * @param {Ext.data.Model} record
      * @param {HTMLElement} tr The TR element for the cell.
      * @param {Number} rowIndex
      * @param {Ext.event.Event} e
      */

     /**
      * @event beforecellkeydown
      * Fired before the cell key down is processed. Return false to cancel the default action.
      * @param {Ext.view.Table} this
      * @param {HTMLElement} td The TD element for the cell.
      * @param {Number} cellIndex
      * @param {Ext.data.Model} record
      * @param {HTMLElement} tr The TR element for the cell.
      * @param {Number} rowIndex
      * @param {Ext.event.Event} e
      */

     /**
      * @event cellkeydown
      * Fired when the keydown event is captured on the cell.
      * @param {Ext.view.Table} this
      * @param {HTMLElement} td The TD element for the cell.
      * @param {Number} cellIndex
      * @param {Ext.data.Model} record
      * @param {HTMLElement} tr The TR element for the cell.
      * @param {Number} rowIndex
      * @param {Ext.event.Event} e
      */

     /**
      * @event rowclick
      * Fired when table cell is clicked.
      * @param {Ext.view.Table} this
      * @param {Ext.data.Model} record
      * @param {HTMLElement} tr The TR element for the cell.
      * @param {Number} rowIndex
      * @param {Ext.event.Event} e
      */

     /**
      * @event rowdblclick
      * Fired when table cell is double clicked.
      * @param {Ext.view.Table} this
      * @param {Ext.data.Model} record
      * @param {HTMLElement} tr The TR element for the cell.
      * @param {Number} rowIndex
      * @param {Ext.event.Event} e
      */

     /**
      * @event rowcontextmenu
      * Fired when table cell is right clicked.
      * @param {Ext.view.Table} this
      * @param {Ext.data.Model} record
      * @param {HTMLElement} tr The TR element for the cell.
      * @param {Number} rowIndex
      * @param {Ext.event.Event} e
      */

     /**
      * @event rowmousedown
      * Fired when the mousedown event is captured on the cell.
      * @param {Ext.view.Table} this
      * @param {Ext.data.Model} record
      * @param {HTMLElement} tr The TR element for the cell.
      * @param {Number} rowIndex
      * @param {Ext.event.Event} e
      */

     /**
      * @event rowmouseup
      * Fired when the mouseup event is captured on the cell.
      * @param {Ext.view.Table} this
      * @param {Ext.data.Model} record
      * @param {HTMLElement} tr The TR element for the cell.
      * @param {Number} rowIndex
      * @param {Ext.event.Event} e
      */

     /**
      * @event rowkeydown
      * Fired when the keydown event is captured on the cell.
      * @param {Ext.view.Table} this
      * @param {Ext.data.Model} record
      * @param {HTMLElement} tr The TR element for the cell.
      * @param {Number} rowIndex
      * @param {Ext.event.Event} e
      */

    constructor: function(config) {
        // Adjust our base class if we are inside a TreePanel
        if (config.grid.isTree) {
            config.baseCls = Ext.baseCSSPrefix + 'tree-view';
        }
        this.callParent([config]);
    },

    /**
     * @private
     * Returns `true` if this view has been configured with variableRowHeight (or this has been set by a plugin/feature)
     * which might insert arbitrary markup into a grid item. Or if at least one visible column has been configured
     * with variableRowHeight. Or if the store is grouped.
     */
    hasVariableRowHeight: function() {
        return this.variableRowHeight || this.store.isGrouped() || this.getVisibleColumnManager().hasVariableRowHeight();
    },

    initComponent: function() {
        var me = this,
            scroll = me.scroll;

        if (me.columnLines) {
            me.addCls(me.grid.colLinesCls);
        }
        if (me.rowLines) {
            me.addCls(me.grid.rowLinesCls);
        }

        /**
         * @private
         * @property {Ext.dom.Fly} body
         * A flyweight Ext.Element which encapsulates a reference to the view's main row containing element.
         * *Note that the `dom` reference will not be present until the first data refresh*
         */
        me.body = new Ext.dom.Fly();
        me.body.id = me.id + 'gridBody';

        // Scrolling within a TableView is controlled by the scroll config of its owning GridPanel
        // It must see undefined in this property in order to leave the scroll styles alone at afterRender time
        me.autoScroll = undefined;

        // If trackOver has been turned off, null out the overCls because documented behaviour
        // in AbstractView is to turn trackOver on if overItemCls is set.
        if (!me.trackOver) {
            me.overItemCls = null;
        }

        // Convert grid scroll config to standard Component scrolling configurations.
        if (scroll === true || scroll === 'both') {
            me.autoScroll = true;
        } else if (scroll === 'horizontal') {
            me.overflowX = 'auto';
        } else if (scroll === 'vertical') {
            me.overflowY = 'auto';
        }
        me.selModel.view = me.headerCt.view = me;

        // Features need a reference to the grid.
        // Grid needs an immediate reference to its view so that the view can reliably be got from the grid during initialization
        me.grid.view = me;
        me.initFeatures(me.grid);

        me.itemSelector = me.getItemSelector();
        me.all = new Ext.view.NodeCache(me);

        me.callParent();
    },

    getVisibleColumnManager: function(){
        var owner = this.ownerCt,
            lock = owner.ownerLockable;

        return lock ? lock.getVisibleColumnManager() : owner.getVisibleColumnManager();

    },

    beforeLayout: function() {
        var me = this,
            needsContextInjection = !me.firstRefreshDone && me.headerCt.layout.running;

        me.callParent(arguments);

        // We're doing the first refresh inside of a layout run.
        // The ColumnLayout will not have acquired a ViewContext because at its initilization time
        // there was no view to lay out. We inject the viewContext now IF we have a table to lay out.
        if (needsContextInjection && me.body.dom) {
            me.headerCt.layout.injectViewContext(me.headerCt.layout.ownerContext, me);
        }
    },

    /**
     * @private
     * Move a grid column from one position to another
     * @param {Number} fromIdx The index from which to move columns
     * @param {Number} toIdx The index at which to insert columns.
     * @param {Number} [colsToMove=1] The number of columns to move beginning at the `fromIdx`
     */
    moveColumn: function(fromIdx, toIdx, colsToMove) {
        var me = this,
            multiMove = colsToMove > 1,
            range = multiMove && document.createRange ? document.createRange() : null,
            fragment = multiMove && !range ? document.createDocumentFragment() : null,
            destinationCellIdx = toIdx,
            colCount = me.getGridColumns().length,
            lastIndex = colCount - 1,
            doFirstLastClasses = (me.firstCls || me.lastCls) && (toIdx === 0 || toIdx === colCount || fromIdx === 0 || fromIdx === lastIndex),
            i,
            j,
            rows, len, tr, cells,
            colGroups;

        // Dragging between locked and unlocked side first refreshes the view, and calls onHeaderMoved with
        // fromIndex and toIndex the same.
        if (me.rendered && toIdx !== fromIdx) {
            // Grab all rows which have column cells in.
            // That is data rows.
            rows = me.el.query(me.rowSelector);

            if (toIdx > fromIdx && fragment) {
                destinationCellIdx -= 1;
            }

            for (i = 0, len = rows.length; i < len; i++) {
                tr = rows[i];
                cells = tr.childNodes;

                // Keep first cell class and last cell class correct *only if needed*
                if (doFirstLastClasses) {

                    if (cells.length === 1) {
                        Ext.fly(cells[0]).addCls(me.firstCls);
                        Ext.fly(cells[0]).addCls(me.lastCls);
                        continue;
                    }
                    if (fromIdx === 0) {
                        Ext.fly(cells[0]).removeCls(me.firstCls);
                        Ext.fly(cells[1]).addCls(me.firstCls);
                    } else if (fromIdx === lastIndex) {
                        Ext.fly(cells[lastIndex]).removeCls(me.lastCls);
                        Ext.fly(cells[lastIndex - 1]).addCls(me.lastCls);
                    }
                    if (toIdx === 0) {
                        Ext.fly(cells[0]).removeCls(me.firstCls);
                        Ext.fly(cells[fromIdx]).addCls(me.firstCls);
                    } else if (toIdx === colCount) {
                        Ext.fly(cells[lastIndex]).removeCls(me.lastCls);
                        Ext.fly(cells[fromIdx]).addCls(me.lastCls);
                    }
                }

                // Move multi using the best technique.
                // Extract a range straight into a fragment if possible.
                if (multiMove) {
                    if (range) {
                        range.setStartBefore(cells[fromIdx]);
                        range.setEndAfter(cells[fromIdx + colsToMove - 1]);
                        fragment = range.extractContents();
                    }
                    else {
                        for (j = 0; j < colsToMove; j++) {
                            fragment.appendChild(cells[fromIdx]);
                        }
                    }
                    tr.insertBefore(fragment, cells[destinationCellIdx] || null);
                } else {
                    tr.insertBefore(cells[fromIdx], cells[destinationCellIdx] || null);
                }
            }

            // Shuffle the <col> elements in all <colgroup>s
            colGroups = me.el.query('colgroup');
            for (i = 0, len = colGroups.length; i < len; i++) {
                // Extract the colgroup
                tr = colGroups[i];

                // Move multi using the best technique.
                // Extract a range straight into a fragment if possible.
                if (multiMove) {
                    if (range) {
                        range.setStartBefore(tr.childNodes[fromIdx]);
                        range.setEndAfter(tr.childNodes[fromIdx + colsToMove - 1]);
                        fragment = range.extractContents();
                    }
                    else {
                        for (j = 0; j < colsToMove; j++) {
                            fragment.appendChild(tr.childNodes[fromIdx]);
                        }
                    }
                    tr.insertBefore(fragment, tr.childNodes[destinationCellIdx] || null);
                } else {
                    tr.insertBefore(tr.childNodes[fromIdx], tr.childNodes[destinationCellIdx] || null);
                }
            }
        }
    },

    // scroll the view to the top
    scrollToTop: Ext.emptyFn,

    /**
     * Add a listener to the main view element. It will be destroyed with the view.
     * @private
     */
    addElListener: function(eventName, fn, scope){
        this.mon(this, eventName, fn, scope, {
            element: 'el'
        });
    },

    /**
     * Get the leaf columns used for rendering the grid rows.
     * @private
     */
    getGridColumns: function() {
        return this.ownerCt.getVisibleColumnManager().getColumns();
    },

    /**
     * Get a leaf level header by index regardless of what the nesting
     * structure is.
     * @private
     * @param {Number} index The index
     */
    getHeaderAtIndex: function(index) {
        return this.ownerCt.getVisibleColumnManager().getHeaderAtIndex(index);
    },

    /**
     * Get the cell (td) for a particular record and column.
     * @param {Ext.data.Model} record
     * @param {Ext.grid.column.Column} column
     * @private
     */
    getCell: function(record, column) {
        var row = this.getRow(record);
        return Ext.fly(row).down(column.getCellSelector());
    },

    /**
     * Get a reference to a feature
     * @param {String} id The id of the feature
     * @return {Ext.grid.feature.Feature} The feature. Undefined if not found
     */
    getFeature: function(id) {
        var features = this.featuresMC;
        if (features) {
            return features.get(id);
        }
    },

    // @private
    // Finds a features by ftype in the features array
    findFeature: function(ftype) {
        if (this.features) {
            return Ext.Array.findBy(this.features, function(feature) {
                if (feature.ftype === ftype) {
                    return true;
                }
            });
        }
    },

    /**
     * Initializes each feature and bind it to this view.
     * @private
     */
    initFeatures: function(grid) {
        var me = this,
            i,
            features,
            feature,
            len;

        // Row container element emitted by tpl
        me.tpl             = Ext.XTemplate.getTpl(this, 'tpl');

        // The rowTpl emits a <div>
        me.rowTpl          = Ext.XTemplate.getTpl(this, 'rowTpl');
        me.addRowTpl(Ext.XTemplate.getTpl(this, 'outerRowTpl'));

        // Each cell is emitted by the cellTpl
        me.cellTpl        = Ext.XTemplate.getTpl(this, 'cellTpl');

        me.featuresMC = new Ext.util.MixedCollection();
        features = me.features = me.constructFeatures();
        len = features ? features.length : 0;
        for (i = 0; i < len; i++) {
            feature = features[i];

            // inject a reference to view and grid - Features need both
            feature.view = me;
            feature.grid = grid;
            me.featuresMC.add(feature);
            feature.init(grid);
        }
    },

    renderTHead: function(values, out, parent) {
        var headers = values.view.headerFns,
            len, i;

        if (headers) {
            for (i = 0, len = headers.length; i < len; ++i) {
                headers[i].call(this, values, out, parent);
            }
        }
    },

    // Currently, we don't have ordering support for header/footer functions,
    // they will be pushed on at construction time. If the need does arise,
    // we can add this functionality in the future, but for now it's not
    // really necessary since currently only the summary feature uses this.
    addHeaderFn: function(fn) {
        var headers = this.headerFns;
        if (!headers) {
            headers = this.headerFns = [];
        }
        headers.push(fn);
    },

    renderTFoot: function(values, out, parent){
        var footers = values.view.footerFns,
            len, i;

        if (footers) {
            for (i = 0, len = footers.length; i < len; ++i) {
                footers[i].call(this, values, out, parent);
            }
        }
    },

    addFooterFn: function(fn) {
        var footers = this.footerFns;
        if (!footers) {
            footers = this.footerFns = [];
        }
        footers.push(fn);
    },

    addTpl: function(newTpl) {
        return this.insertTpl('tpl', newTpl);
    },

    addRowTpl: function(newTpl) {
        return this.insertTpl('rowTpl', newTpl);
    },

    addCellTpl: function(newTpl) {
        return this.insertTpl('cellTpl', newTpl);
    },

    insertTpl: function(which, newTpl) {
        var me = this,
            tpl,
            prevTpl;

        // Clone an instantiated XTemplate
        if (newTpl.isTemplate) {
            newTpl = Ext.Object.chain(newTpl);
        }
        // If we have been passed an object of the form
        // {
        //      before: fn
        //      after: fn
        // }
        // Create a template from it using the object as the member configuration
        else {
            newTpl = new Ext.XTemplate('{%this.nextTpl.applyOut(values, out, parent);%}', newTpl);
        }

        // Stop at the first TPL who's priority is less than the passed rowTpl
        for (tpl = me[which]; newTpl.priority < tpl.priority; tpl = tpl.nextTpl) {
            prevTpl = tpl;
        }

        // If we had skipped over some, link the previous one to the passed rowTpl
        if (prevTpl) {
            prevTpl.nextTpl = newTpl;
        }
        // First one
        else {
            me[which] = newTpl;
        }
        newTpl.nextTpl = tpl;
        return newTpl;
    },

    tplApplyOut: function(values, out, parent) {
        if (this.before) {
            if (this.before(values, out, parent) === false) {
                return;
            }
        }
        this.nextTpl.applyOut(values, out, parent);
        if (this.after) {
            this.after(values, out, parent);
        }
    },

    /**
     * @private
     * Converts the features array as configured, into an array of instantiated Feature objects.
     *
     * Must have no side effects other than Feature instantiation.
     *
     * MUST NOT update the this.features property, and MUST NOT update the instantiated Features.
     */
    constructFeatures: function() {
        var me = this,
            features = me.features,
            feature,
            result,
            i = 0, len;

        if (features) {
            result = [];
            len = features.length;
            for (; i < len; i++) {
                feature = features[i];
                if (!feature.isFeature) {
                    feature = Ext.create('feature.' + feature.ftype, feature);
                }
                result[i] = feature;
            }
        }
        return result;
    },

    beforeRender: function() {
        var me = this;
        me.callParent();

        if (!me.enableTextSelection) {
            me.protoEl.unselectable();
        }
    },

    // Private template method implemented starting at the AbstractView class.
    onViewScroll: function(e, t) {
        // We ignore scrolling caused by focusing
        if (!this.ignoreScroll) {
            this.callParent(arguments);
            this.fireEvent('bodyscroll', e, t);
        }
    },

    // private
    // Create the DOM element which enapsulates the passed record.
    // Used when updating existing rows, so drills down into resulting structure .
    createRowElement: function(record, index, updateColumns) {
        var me = this,
            div = me.renderBuffer,
            tplData = me.collectData([record], index);

        tplData.columns = updateColumns;
        me.tpl.overwrite(div, tplData);
        // Return first element within node containing element
        return Ext.fly(div).down(me.getNodeContainerSelector(), true).firstChild;
    },

    // private
    // Override so that we can use a quicker way to access the row nodes.
    // They are simply all child nodes of the nodeContainer element.
    bufferRender: function(records, index) {
        var me = this,
            div = me.renderBuffer;

        me.tpl.overwrite(div, me.collectData(records, index));
        return  Ext.Array.toArray(Ext.fly(div).down(me.getNodeContainerSelector(), true).childNodes);
    },

    collectData: function(records, startIndex) {
        var me = this;

        me.rowValues.view = me;

        me.tableValues.view = me;
        me.tableValues.rows = records;
        me.tableValues.columns = null;
        me.tableValues.viewStartIndex = startIndex;
        me.tableValues.touchScroll = me.touchScroll;
        me.tableValues.tableStyle = 'width:' + me.headerCt.getTableWidth() + 'px';
        return me.tableValues;
    },

    // Overridden implementation.
    // Called by refresh to collect the view item nodes.
    // Note that these may be wrapping rows which *contain* rows which map to records
    collectNodes: function(targetEl) {
        this.all.fill(this.getNodeContainer().childNodes, this.all.startIndex);
    },

    // Private. Called when the table changes height.
    // For example, see examples/grid/group-summary-grid.html
    // If we have flexed column headers, we need to update the header layout
    // because it may have to accommodate (or cease to accommodate) a vertical scrollbar.
    // Only do this on platforms which have a space-consuming scrollbar.
    // Only do it when vertical scrolling is enabled.
    refreshSize: function(forceLayout) {
        var me = this,
            bodySelector = me.getBodySelector();

        // On every update of the layout system due to data update, capture the view's main element in our private flyweight.
        // IF there *is* a main element. Some TplFactories emit naked rows.
        if (bodySelector) {
            // use "down" instead of "child" because the grid table element is not a direct
            // child of the view element when a touch scroller is in use.
            me.body.attach(me.el.down(bodySelector, true));
        }

        if (!me.hasLoadingHeight) {
            // Suspend layouts in case the superclass requests a layout. We might too, so they
            // must be coalesced.
            Ext.suspendLayouts();

            me.callParent(arguments);

            // We only need to adjust for height changes in the data if we, or any visible columns have been configured with
            // variableRowHeight: true
            // OR, if we are being passed the forceUpdate flag which is passed when the view's item count changes.
            if (forceLayout || (me.hasVariableRowHeight() && me.dataSource.getCount())) {
                me.grid.updateLayout();
            }

            Ext.resumeLayouts(true);
        }
    },

    clearViewEl: function(leaveNodeContainer) {
        var me = this,
            all = me.all,
            store = me.getStore(),
            i, item, nodeContainer, targetEl;
        
        // The purpose of this is to allow boilerplate HTML nodes to remain in place inside a View
        // while the transient, templated data can be discarded and recreated.
        // 
        // In particular, this is used in infinite grid scrolling: A very tall "stretcher" element is
        // inserted into the View's element to create a scrollbar of the correct proportion.
        //
        // Also we must ensure that the itemremove event is fired EVERY time an item is removed from the
        // view. This is so that widgets rendered into a view by a WidgetColumn can be recycled.

        for (i = all.startIndex; i <= all.endIndex; i++) {
            item = all.item(i, true);  
            me.fireEvent('itemremove', store.getByInternalId(item.getAttribute('data-recordId')), i, item, me);
        }

        me.clearEmptyEl();
        me.all.clear(true);

        nodeContainer = Ext.fly(me.getNodeContainer());
        if (nodeContainer && !leaveNodeContainer) {
            targetEl = me.getTargetEl();
            if (targetEl.dom !== nodeContainer.dom) {
                nodeContainer.destroy();
            }
        }
    },

    // Masking a TableView masks its owning GridPanel
    getMaskTarget: function() {
        var grid = this.ownerCt;
        if (grid.ownerLockable) {
            grid = grid.ownerLockable;
        }
        return grid.getMaskTarget();
    },

    statics: {
        getBoundView: function(node) {
            return Ext.getCmp(node.getAttribute('data-boundView'));
        }
    },

    getRecord: function(node) {
        var me = this,
            recordIndex;

        // If store.destroy has been called before some delayed event fires on a node, we must ignore the event.
        if (me.store.isDestroyed) {
            return;
        }
        if (node.isModel) {
            return node;
        }

        node = me.getNode(node);
        if (node) {
            // The indices may be off because of collapsed groups (if we're grouping) or row wrapping, so just grab it by id.
            if (!me.hasActiveFeature()) {
                recordIndex = node.getAttribute('data-recordIndex');
                if (recordIndex) {
                    recordIndex = parseInt(recordIndex, 10);
                    if (recordIndex > -1) {
                        // The index is the index in the original Store, not in a GroupStore
                        // The Grouping Feature increments the index to skip over unrendered records in collapsed groups
                        return me.store.data.getAt(recordIndex);
                    }
                }
            }
            return me.dataSource.getByInternalId(node.getAttribute('data-recordId'));
        }
    },

    indexOf: function(node) {
        node = this.getNode(node);
        if (!node && node !== 0) {
            return -1;
        }
        return this.all.indexOf(node);
    },

    indexInStore: function(node) {
        // We cannot use the stamped in data-recordindex because that is the index in the original configured store
        // NOT the index in the dataSource that is being used - that may be a GroupStore.
        return node ? this.dataSource.indexOf(this.getRecord(node)) : -1;
    },

    renderRows: function(rows, columns, viewStartIndex, out) {
        var rowValues = this.rowValues,
            rowCount = rows.length,
            i;

        rowValues.view = this;
        rowValues.columns = columns;

        for (i = 0; i < rowCount; i++, viewStartIndex++) {
            rowValues.itemClasses.length = rowValues.rowClasses.length = 0;
            this.renderRow(rows[i], viewStartIndex, out);
        }

        // Dereference objects since rowValues is a persistent on our prototype
        rowValues.view = rowValues.columns = rowValues.record = null;
    },

    /* Alternative column sizer element renderer.
    renderTHeadColumnSizer: function(values, out) {
        var columns = this.getGridColumns(),
            len = columns.length, i,
            column, width;

        out.push('<thead><tr class="' + Ext.baseCSSPrefix + 'grid-header-row">');
        for (i = 0; i < len; i++) {
            column = columns[i];
            width = column.lastBox ? column.lastBox.width : Ext.grid.header.Container.prototype.defaultWidth;
            out.push('<th class="', Ext.baseCSSPrefix, 'grid-cell-', columns[i].getItemId(), '" style="width:' + width + 'px"></th>');
        }
        out.push('</tr></thead>');
    },
    */

    renderColumnSizer: function(values, out) {
        var columns = values.columns || this.getGridColumns(),
            len = columns.length, i,
            column, width;

        out.push('<colgroup role="presentation">');
        for (i = 0; i < len; i++) {
            column = columns[i];
            width = column.cellWidth ? column.cellWidth : Ext.grid.header.Container.prototype.defaultWidth;
            out.push('<col role="presentation" class="', Ext.baseCSSPrefix, 'grid-cell-', columns[i].getItemId(), '" style="width:' + width + 'px">');
        }
        out.push('</colgroup>');
    },

    /**
     * @private
     * Renders the HTML markup string for a single row into the passed array as a sequence of strings, or
     * returns the HTML markup for a single row.
     *
     * @param {Ext.data.Model} record The record to render.
     * @param {String[]} [out] A string array onto which to append the resulting HTML string. If omitted,
     * the resulting HTML string is returned.
     * @return {String} **only when the out parameter is omitted** The resulting HTML string.
     */
    renderRow: function(record, rowIdx, out) {
        var me = this,
            isMetadataRecord = rowIdx === -1,
            selModel = me.selModel,
            rowValues = me.rowValues,
            itemClasses = rowValues.itemClasses,
            rowClasses = rowValues.rowClasses,
            cls,
            rowTpl = me.rowTpl;

        // Define the rowAttr object now. We don't want to do it in the treeview treeRowTpl because anything
        // this is processed in a deferred callback (such as deferring initial view refresh in gridview) could
        // poke rowAttr that are then shared in tableview.rowTpl. See EXTJSIV-9341.
        //
        // For example, the following shows the shared ref between a treeview's rowTpl nextTpl and the superclass
        // tableview.rowTpl:
        //
        //      tree.view.rowTpl.nextTpl === grid.view.rowTpl
        //
        rowValues.rowAttr = {};

        // Set up mandatory properties on rowValues
        rowValues.record = record;
        rowValues.recordId = record.internalId;

        // recordIndex is index in true store (NOT the data source - possibly a GroupStore)
        rowValues.recordIndex = me.store.indexOf(record);

        // rowIndex is the row number in the view.
        rowValues.rowIndex = rowIdx;
        rowValues.rowId = me.getRowId(record);
        rowValues.itemCls = rowValues.rowCls = '';
        if (!rowValues.columns) {
            rowValues.columns = me.ownerCt.getVisibleColumnManager().getColumns();
        }

        itemClasses.length = rowClasses.length = 0;

        // If it's a metadata record such as a summary record.
        // So do not decorate it with the regular CSS.
        // The Feature which renders it must know how to decorate it.
        if (!isMetadataRecord) {
            itemClasses[0] = Ext.baseCSSPrefix + "grid-item";

            if (!me.ownerCt.disableSelection && selModel.isRowSelected) {
                // Selection class goes on the outermost row, so it goes into itemClasses
                if (selModel.isRowSelected(record)) {
                    itemClasses.push(me.selectedItemCls);
                }
            }

            if (me.stripeRows && rowIdx % 2 !== 0) {
                itemClasses.push(me.altRowCls);
            }

            if (me.getRowClass) {
                cls = me.getRowClass(record, rowIdx, null, me.dataSource);
                if (cls) {
                    rowClasses.push(cls);
                }
            }
        }

        if (out) {
            rowTpl.applyOut(rowValues, out, me.tableValues);
        } else {
            return rowTpl.apply(rowValues. me.tableValues);
        }
    },

    /**
     * @private
     * Emits the HTML representing a single grid cell into the passed output stream (which is an array of strings).
     *
     * @param {Ext.grid.column.Column} column The column definition for which to render a cell.
     * @param {Number} recordIndex The row index (zero based within the {@link #store}) for which to render the cell.
     * @param {Number} rowIndex The row index (zero based within this view for which to render the cell.
     * @param {Number} columnIndex The column index (zero based) for which to render the cell.
     * @param {String[]} out The output stream into which the HTML strings are appended.
     */
    renderCell: function (column, record, recordIndex, rowIndex, columnIndex, out) {
        var me = this,
            fullIndex,
            selModel = me.selModel,
            cellValues = me.cellValues,
            classes = cellValues.classes,
            fieldValue = record.data[column.dataIndex],
            cellTpl = me.cellTpl,
            value, clsInsertPoint;

        cellValues.record = record;
        cellValues.column = column;
        cellValues.recordIndex = recordIndex;
        cellValues.rowIndex = rowIndex;
        cellValues.columnIndex = columnIndex;
        cellValues.cellIndex = columnIndex;
        cellValues.align = column.align;
        cellValues.innerCls = column.innerCls;
        cellValues.tdCls = cellValues.tdStyle = cellValues.tdAttr = cellValues.style = "";
        cellValues.unselectableAttr = me.enableTextSelection ? '' : 'unselectable="on"';

        // Begin setup of classes to add to cell
        classes[1] = column.getCellId();

        // On IE8, array[len] = 'foo' is twice as fast as array.push('foo')
        // So keep an insertion point and use assignment to help IE!
        clsInsertPoint = 2;

        if (column.renderer && column.renderer.call) {
            fullIndex = me.ownerCt.columnManager.getHeaderIndex(column);
            value = column.renderer.call(column.usingDefaultRenderer ? column : column.scope || me.ownerCt, fieldValue, cellValues, record, recordIndex, fullIndex, me.dataSource, me);
            if (cellValues.css) {
                // This warning attribute is used by the compat layer
                // TODO: remove when compat layer becomes deprecated
                record.cssWarning = true;
                cellValues.tdCls += ' ' + cellValues.css;
                cellValues.css = null;
            }

            // Add any tdCls which was added to the cellValues by the renderer.
            if (cellValues.tdCls) {
                classes[clsInsertPoint++] = cellValues.tdCls;
            }
        } else {
            value = fieldValue;
        }

        cellValues.value = (value == null || value === '') ? column.emptyCellText : value;

        if (column.tdCls) {
            classes[clsInsertPoint++] = column.tdCls;
        }
        if (me.markDirty && record.isModified(column.dataIndex)) {
            classes[clsInsertPoint++] = me.dirtyCls;
        }
        if (column.isFirstVisible) {
            classes[clsInsertPoint++] = me.firstCls;
        }
        if (column.isLastVisible) {
            classes[clsInsertPoint++] = me.lastCls;
        }
        if (!me.enableTextSelection) {
            classes[clsInsertPoint++] = me.unselectableCls;
        }

        if (selModel && selModel.isCellModel && selModel.isCellSelected(me, recordIndex, column)) {
            classes[clsInsertPoint++] = (me.selectedCellCls);
        }

        // Chop back array to only what we've set
        classes.length = clsInsertPoint;

        cellValues.tdCls = classes.join(' ');

        cellTpl.applyOut(cellValues, out);

        // Dereference objects since cellValues is a persistent var in the XTemplate's scope chain
        cellValues.column = null;
    },

    /**
     * Returns the table row given the passed Record, or index or node.
     * @param {HTMLElement/String/Number/Ext.data.Model} nodeInfo The node or record, or row index.
     * to return the top level row.
     * @return {HTMLElement} The node or null if it wasn't found
     */
    getRow: function(nodeInfo) {
        var fly;

        if ((!nodeInfo && nodeInfo !== 0) || !this.rendered) {
            return null;
        }

        // An event
        if (nodeInfo.target) {
            nodeInfo = nodeInfo.target;
        }
        // An id
        if (Ext.isString(nodeInfo)) {
            return Ext.fly(nodeInfo).down(this.rowSelector,true);
        }
        // Row index
        if (Ext.isNumber(nodeInfo)) {
            fly = this.all.item(nodeInfo);
            return fly && fly.down(this.rowSelector, true);
        }
        // Record
        if (nodeInfo.isModel) {
            return this.getRowByRecord(nodeInfo);
        }
        fly = Ext.fly(nodeInfo);
        
        // Passed an item, go down and get the row
        if (fly.is(this.itemSelector)) {
            return this.getRowFromItem(fly);
        }

        // Passed a child element of a row
        return fly.findParent(this.rowSelector, this.getTargetEl()); // already an HTMLElement
    },

    getRowId: function(record){
        return this.id + '-record-' + record.internalId;
    },

    constructRowId: function(internalId){
        return this.id + '-record-' + internalId;
    },

    getNodeById: function(id){
        id = this.constructRowId(id);
        return this.retrieveNode(id, false);
    },

    getRowById: function(id){
        id = this.constructRowId(id);
        return this.retrieveNode(id, true);
    },

    getNodeByRecord: function(record) {
        return this.retrieveNode(this.getRowId(record), false);
    },

    getRowByRecord: function(record) {
        return this.retrieveNode(this.getRowId(record), true);
    },

    getRowFromItem: function(item) {
        var rows = Ext.getDom(item).tBodies[0].childNodes,
            len = rows.length,
            i;

        for (i = 0; i < len; i++) {
            if (Ext.fly(rows[i]).is(this.rowSelector)) {
                return rows[i];
            }
        }
    },

    retrieveNode: function(id, dataRow){
        var result = this.el.getById(id, true);

        if (dataRow && result) {
            return Ext.fly(result).down(this.rowSelector, true);
        }
        return result;
    },

    // Links back from grid rows are installed by the XTemplate as data attributes
    updateIndexes: Ext.emptyFn,

    // Outer table
    bodySelector: 'div.' + Ext.baseCSSPrefix + 'grid-item-container',

    // Element which contains rows
    nodeContainerSelector: 'div.' + Ext.baseCSSPrefix + 'grid-item-container',

    // view item. This wraps a data row
    itemSelector: 'table.' + Ext.baseCSSPrefix + 'grid-item',

    // Grid row which contains cells as opposed to wrapping item.
    rowSelector: 'tr.' + Ext.baseCSSPrefix + 'grid-row',

    // cell
    cellSelector: 'td.' + Ext.baseCSSPrefix + 'grid-cell',

    // Select column sizers and cells.
    // This may target <COL> elements as well as <TD> elements
    // <COLGROUP> element is inserted if the first row does not have the regular cell patten (eg is a colspanning group header row)
    sizerSelector: '.' + Ext.baseCSSPrefix + 'grid-cell',

    innerSelector: 'div.' + Ext.baseCSSPrefix + 'grid-cell-inner',

    /**
     * Returns a CSS selector which selects the outermost element(s) in this view.
     */
    getBodySelector: function() {
        return this.bodySelector;
    },

    /**
     * Returns a CSS selector which selects the element(s) which define the width of a column.
     *
     * This is used by the {@link Ext.view.TableLayout} when resizing columns.
     *
     */
    getColumnSizerSelector: function(header) {
        var selector = this.sizerSelector + '-' + header.getItemId();

        return 'td' + selector + ',col' + selector;
    },

    /**
     * Returns a CSS selector which selects items of the view rendered by the outerRowTpl
     */
    getItemSelector: function() {
        return this.itemSelector;
    },

    /**
     * Returns a CSS selector which selects a particular column if the desired header is passed,
     * or a general cell selector is no parameter is passed.
     *
     * @param {Ext.grid.column.Column} [header] The column for which to return the selector. If
     * omitted, the general cell selector which matches **ant cell** will be returned.
     *
     */
    getCellSelector: function(header) {
        return header ? header.getCellSelector() : this.cellSelector; 
    },

    /*
     * Returns a CSS selector which selects the content carrying element within cells.
     */
    getCellInnerSelector: function(header) {
        return this.getCellSelector(header) + ' ' + this.innerSelector;
    },

    /**
     * Adds a CSS Class to a specific row.
     * @param {HTMLElement/String/Number/Ext.data.Model} rowInfo An HTMLElement, index or instance of a model
     * representing this row
     * @param {String} cls
     */
    addRowCls: function(rowInfo, cls) {
        var row = this.getRow(rowInfo);
        if (row) {
            Ext.fly(row).addCls(cls);
        }
    },

    /**
     * Removes a CSS Class from a specific row.
     * @param {HTMLElement/String/Number/Ext.data.Model} rowInfo An HTMLElement, index or instance of a model
     * representing this row
     * @param {String} cls
     */
    removeRowCls: function(rowInfo, cls) {
        var row = this.getRow(rowInfo);
        if (row) {
            Ext.fly(row).removeCls(cls);
        }
    },

    // GridSelectionModel invokes onRowSelect as selection changes
    onRowSelect: function(rowIdx) {
        var me = this;

        me.addItemCls(rowIdx, me.selectedItemCls);

        //<feature legacyBrowser>
        if (Ext.isIE8) {
            me.repaintBorder(rowIdx + 1);
        }
        //</feature>
    },

    // GridSelectionModel invokes onRowDeselect as selection changes
    onRowDeselect: function(rowIdx) {
        var me = this;

        me.removeItemCls(rowIdx, me.selectedItemCls);

        //<feature legacyBrowser>
        if (Ext.isIE8) {
            me.repaintBorder(rowIdx + 1);
        }
        //</feature>
    },

    onCellSelect: function(position) {
        var cell = this.getCellByPosition(position);
        if (cell) {
            cell.addCls(this.selectedCellCls);
        }
    },

    onCellDeselect: function(position) {
        var cell = this.getCellByPosition(position, true);
        if (cell) {
            Ext.fly(cell).removeCls(this.selectedCellCls);
        }

    },

    getCellByPosition: function(position, returnDom) {
        if (position) {
            var row   = this.getRow(position.row),
                header = this.ownerCt.getColumnManager().getHeaderAtIndex(position.column);

            if (header && row) {
                return Ext.fly(row).down(this.getCellSelector(header), returnDom);
            }
        }
        return false;
    },

    // GridSelectionModel invokes onRowFocus to 'highlight'
    // the last row focused
    onRowFocus: function(rowIdx, highlight, supressFocus) {
        var me = this;

        if (highlight) {
            me.addItemCls(rowIdx, me.focusedItemCls);
            if (!supressFocus) {
                me.focusRow(rowIdx);
            }
            //this.el.dom.setAttribute('aria-activedescendant', row.id);
        } else {
            me.removeItemCls(rowIdx, me.focusedItemCls);
        }

        //<feature legacyBrowser>
        if (Ext.isIE8) {
            me.repaintBorder(rowIdx + 1);
        }
        //</feature>
    },

    /**
     * Focuses a particular row and brings it into view. Will fire the rowfocus event.
     * @param {HTMLElement/String/Number/Ext.data.Model} row An HTMLElement template node, index of a template node, the id of a template node or the
     * @param {Boolean/Number} [delay] Delay the focus this number of milliseconds (true for 10 milliseconds).
     * record associated with the node.
     */
    focusRow: function(row, delay) {
        var me = this,
            record,
            focusTask = me.getFocusTask();

        if (delay) {
            focusTask.delay(Ext.isNumber(delay) ? delay : 10, me.focusRow, me, [row, false]);
            return;
        }

        // An immediate focus call must cancel any outstanding delayed focus calls.
        focusTask.cancel();

        // Do not attempt to focus if hidden or within collapsed Panel
        // Maintainer: Note that to avoid an unnecessary call to me.getNode if not visible, or another, nested if test,
        // the assignment of the row var is embedded inside the condition expression.
        if (me.isVisible(true) && (row = me.getRow(row))) {
            me.scrollRowIntoView(row);
            record = me.getRecord(row);
            me.selModel.setLastFocused(record);
            me.doFocus(row);
            me.fireEvent('rowfocus', record, row, me.indexInStore(row));
        }
    },

    scrollRowIntoView: function(row, animate) {
        row = this.getRow(row);
        if (row) {
            this.scrollElIntoView(row, false, animate);
        }
    },

    /**
     * Focuses a particular cell and brings it into view. Will fire the rowfocus event.
     * @param {Ext.grid.CellContext} pos The cell to select
     * @param {Boolean/Number} [delay] Delay the focus this number of milliseconds (true for 10 milliseconds).
     */
    focusCell: function(position, delay) {
        var me = this,
            cell,
            focusTask = me.getFocusTask();

        if (delay) {
            focusTask.delay(Ext.isNumber(delay) ? delay : 10, me.focusCell, me, [position, false]);
            return;
        }

        // An immediate focus call must cancel any outstanding delayed focus calls.
        focusTask.cancel();

        // Do not attempt to focus if hidden or within collapsed Panel
        // Maintainer: Note that to avoid an unnecessary call to me.getCellByPosition if not visible, or another, nested if test,
        // the assignment of the cell var is embedded inside the condition expression.
        if (me.isVisible(true) && (cell = me.getCellByPosition(position))) {
            me.scrollCellIntoView(cell);
            me.doFocus(me.getRow(position.row));
            me.fireEvent('cellfocus', position.record, cell, position);
        }
    },

    // Private
    // Implementation which saves and restores scroll position on IE.
    doFocus: function(rowDom) {
        var me = this,
            saveScroll = Ext.isIE,
            scrollLeft;

        if (saveScroll) {
            scrollLeft = me.el.getScrollLeft();
            me.ignoreScroll = true;
        }

        (me.focusEl = Ext.get(rowDom)).focus();

        if (saveScroll) {
            me.el.setScrollLeft(scrollLeft);
            me.ignoreScroll = false;
        }
    },

    scrollCellIntoView: function(cell, animate) {
        // Allow cell context object to be passed.
        // TODO: change to .isCellContext check when implement cell context class
        if (cell.row != null && cell.column != null) {
            cell = this.getCellByPosition(cell);
        }
        if (cell) {
            this.scrollElIntoView(cell, null, animate);
        }
    },

    // hook for rtl override
    scrollElIntoView: function(el, hscroll, animate) {
        var me = this,
            scrollManager = me.scrollManager;

        if (scrollManager) {
            scrollManager.scrollIntoView(el, hscroll, animate);
        } else {
            Ext.fly(el).scrollIntoView(me.el, hscroll, animate);
        }
    },

    syncRowHeights: function(firstItem, secondItem) {
        firstItem.style.height = secondItem.style.height = '';
        var me = this,
            rowTpl = me.rowTpl,
            firstItemHeight = firstItem.offsetHeight,
            secondItemHeight = secondItem.offsetHeight;

        // If the two rows *need* syncing...
        if (firstItemHeight !== secondItemHeight) {

            // loop thru all of rowTpls asking them to sync the two row heights if they know how to.
            while (rowTpl) {
                if (rowTpl.syncRowHeights) {
                    // If any rowTpl in the chain returns false, quit processing
                    if (rowTpl.syncRowHeights(firstItem, secondItem) === false) {
                        break;
                    }
                }
                rowTpl = rowTpl.nextTpl;
            }

            // If that did not fix it, see if we have nested data rows, and equalize the data row heights
            firstItemHeight = firstItem.offsetHeight;
            secondItemHeight = secondItem.offsetHeight;
            if (firstItemHeight !== secondItemHeight) {

                // See if the real data row has been nested deeper by a Feature.
                firstItem = Ext.fly(firstItem).down(me.rowSelector, true) || firstItem;
                secondItem = Ext.fly(secondItem).down(me.rowSelector, true) || secondItem;

                // Yes, there's a nested data row on each side. Sync the heights of the two.
                if (firstItem && secondItem) {
                    firstItem.style.height = secondItem.style.height = '';
                    firstItemHeight = firstItem.offsetHeight;
                    secondItemHeight = secondItem.offsetHeight;

                    if (firstItemHeight > secondItemHeight) {
                        Ext.fly(firstItem).setHeight(firstItemHeight);
                        Ext.fly(secondItem).setHeight(firstItemHeight);
                    } else if (secondItemHeight > firstItemHeight) {
                        Ext.fly(firstItem).setHeight(secondItemHeight);
                        Ext.fly(secondItem).setHeight(secondItemHeight);
                    }
                }
            }
        }
    },

    onUpdate : function(store, record, operation, modifiedFieldNames) {
        var me = this;

        // If we are buffer rendered, and using throttled update and the record is not in view, we do not have to queue the change.
        // The row will be rendered correctly directly from the record when it is scrolled into view.
        if (me.rendered && me.throttledUpdate && me.bufferedRenderer && !me.getNode(record)) {
            return;
        }
        me.callParent(arguments);
    },

    // private
    handleUpdate: function(store, record, operation, changedFieldNames) {
        var me = this,
            rowTpl = me.rowTpl,
            oldItem, oldItemDom, oldDataRow,
            newItemDom,
            newAttrs, attLen, attName, attrIndex,
            overItemCls,
            focusedItemCls,
            selectedItemCls,
            columns,
            column,
            columnsToUpdate = [],
            len, i,
            hasVariableRowHeight = me.variableRowHeight,
            cellUpdateFlag,
            updateTypeFlags = 0,
            cell,
            fieldName,
            value,
            defaultRenderer,
            scope,
            ownerCt = me.ownerCt;

        if (me.viewReady) {
            // Table row being updated
            oldItemDom = me.getNodeByRecord(record);

            // Row might not be rendered due to buffered rendering or being part of a collapsed group...
            if (oldItemDom) {
                overItemCls = me.overItemCls;
                focusedItemCls = me.focusedItemCls;
                selectedItemCls = me.selectedItemCls;
                columns = me.ownerCt.getVisibleColumnManager().getColumns();

                // Collect an array of the columns which must be updated.
                // If the field at this column index was changed, or column has a custom renderer
                // (which means value could rely on any other changed field) we include the column.
                for (i = 0, len = columns.length; i < len; i++) {
                    column = columns[i];

                    // 0 = Column doesn't need update.
                    // 1 = Column needs update, and renderer has > 1 argument; We need to render a whole new HTML item.
                    // 2 = Column needs update, but renderer has 1 argument or column uses an updater.
                    cellUpdateFlag = me.shouldUpdateCell(record, column, changedFieldNames);

                    if (cellUpdateFlag) {
                        // Track if any of the updating columns yields a flag with the 1 bit set.
                        // This means that there is a custom renderer involved and a new TableView item
                        // will need rendering.
                        updateTypeFlags = updateTypeFlags | cellUpdateFlag;

                        columnsToUpdate[columnsToUpdate.length] = column;
                        hasVariableRowHeight = hasVariableRowHeight || column.variableRowHeight;
                    }
                }

                // If there's no data row (some other rowTpl has been used; eg group header)
                //  or one or more columns has a custom renderer
                //  or there's more than one <TR>, we must use the full render pathway to create a whole new TableView item
                if (!me.getRowFromItem(oldItemDom) || (updateTypeFlags & 1) || (oldItemDom.tBodies[0].childNodes.length > 1)) {
                    oldItem = Ext.fly(oldItemDom, '_internal');
                    newItemDom = me.createRowElement(record, me.dataSource.indexOf(record), columnsToUpdate);
                    if (oldItem.hasCls(overItemCls)) {
                        Ext.fly(newItemDom).addCls(overItemCls);
                    }
                    if (oldItem.hasCls(focusedItemCls)) {
                        Ext.fly(newItemDom).addCls(focusedItemCls);
                    }
                    if (oldItem.hasCls(selectedItemCls)) {
                        Ext.fly(newItemDom).addCls(selectedItemCls);
                    }

                    // Copy new row attributes across. Use IE-specific method if possible.
                    // In IE10, there is a problem where the className will not get updated
                    // in the view, even though the className on the dom element is correct.
                    // See EXTJSIV-9462
                    if (Ext.isIE9m && oldItemDom.mergeAttributes) {
                        oldItemDom.mergeAttributes(newItemDom, true);
                    } else {
                        newAttrs = newItemDom.attributes;
                        attLen = newAttrs.length;
                        for (attrIndex = 0; attrIndex < attLen; attrIndex++) {
                            attName = newAttrs[attrIndex].name;
                            if (attName !== 'id') {
                                oldItemDom.setAttribute(attName, newAttrs[attrIndex].value);
                            }
                        }
                    }

                    // If we have columns which may *need* updating (think locked side of lockable grid with all columns unlocked)
                    // and the changed record is within our view, then update the view.
                    if (columns.length && (oldDataRow = me.getRow(oldItemDom))) {
                        me.updateColumns(oldDataRow, Ext.fly(newItemDom).down(me.rowSelector, true), columnsToUpdate);
                    }

                    // Loop thru all of rowTpls asking them to sync the content they are responsible for if any.
                    while (rowTpl) {
                        if (rowTpl.syncContent) {
                            // *IF* we are selectively updating columns (have been passed changedFieldNames), then pass the column set, else
                            // pass null, and it will sync all content.
                            if (rowTpl.syncContent(oldItemDom, newItemDom, changedFieldNames ? columnsToUpdate : null) === false) {
                                break;
                            }
                        }
                        rowTpl = rowTpl.nextTpl;
                    }
                }

                // No custom renderers found in columns to be updated, we can simply update the existing cells.
                else {
                    
                    // Flyweight for manipulation of the update cell
                    if (!me.cellFly) {
                        me.cellFly = new Ext.dom.Fly();
                    }

                    // Loop through columns which need updating.
                    for (i = 0, len = columnsToUpdate.length; i < len; i++) {
                        column = columnsToUpdate[i];

                        // The dataIndex of the column is the field name
                        fieldName = column.dataIndex;

                        value = record.get(fieldName);
                        cell = oldItemDom.firstChild.firstChild.childNodes[column.getVisibleIndex()];

                        // Mark the field's dirty status if we are configured to do so (defaults to true)
                        if (me.markDirty) {
                            me.cellFly.attach(cell);
                            if (record.isModified(column.dataIndex)) {
                                me.cellFly.addCls(me.dirtyCls);
                            } else {
                                me.cellFly.removeCls(me.dirtyCls);
                            }
                        }

                        defaultRenderer = column.usingDefaultRenderer;
                        scope = defaultRenderer ? column : column.scope;

                        // Call the column updater which gets passed the TD element
                        if (column.updater) {
                            Ext.callback(column.updater, scope, [cell, value, record, me], 0, column, ownerCt);
                        }
                        else {
                            if (column.renderer) {
                                value = Ext.callback(column.renderer, scope,
                                        [value, null, record, 0, 0, me.dataSource, me], 0, column, ownerCt);
                            }

                            // Update the value of the cell's inner in the best way.
                            // We only use innerHTML of the cell's inner DIV if the renderer produces HTML
                            // Otherwise we change the value of the single text node within the inner DIV
                            if (column.producesHTML) {
                                cell.childNodes[0].innerHTML = value;
                            } else {
                                cell.childNodes[0].childNodes[0].data = value;
                            }
                        }

                        // Add the highlight class if there is one
                        if (me.highlightClass) {
                            Ext.fly(cell).addCls(me.highlightClass);

                            // Start up a DelayedTask which will purge the changedCells stack, removing the highlight class
                            // after the expiration time
                            if (!me.changedCells) {
                                me.self.prototype.changedCells = [];
                                me.prototype.clearChangedTask = new Ext.util.DelayedTask(me.clearChangedCells, me.prototype);
                                me.clearChangedTask.delay(me.unhighlightDelay);
                            }

                            // Post a changed cell to the stack along with expiration time
                            me.changedCells.push({
                                cell: cell,
                                cls: me.highlightClass,
                                expires: Ext.Date.now() + 1000
                            });
                        }
                    }
                }

                // Coalesce any layouts which happen due to any itemupdate handlers (eg Widget columns) with the final refreshSize layout.
                if (hasVariableRowHeight) {
                    Ext.suspendLayouts();
                }

                // Since we don't actually replace the row, we need to fire the event with the old row
                // because it's the thing that is still in the DOM
                me.fireEvent('itemupdate', record, me.store.indexOf(record), oldItemDom);

                // We only need to update the layout if any of the columns can change the row height.
                if (hasVariableRowHeight) {
                    me.refreshSize();

                    // Ensure any layouts queued by itemupdate handlers and/or the refreshSize call are executed.
                    Ext.resumeLayouts(true);
                }
            }
        }
    },

    clearChangedCells: function() {
        var me = this,
            now = Ext.Date.now(),
            changedCell;

        for (var i = 0, len = me.changedCells.length; i < len; ) {
            changedCell = me.changedCells[i];
            if (changedCell.expires <= now) {
                Ext.fly(changedCell.cell).removeCls(changedCell.highlightClass);
                Ext.Array.erase(me.changedCells, i, 1);
                len--;
            } else {
                break;
            }
        }

        // Keep repeating the delay until all highlighted cells have been cleared
        if (len) {
            me.clearChangedTask.delay(me.unhighlightDelay);
        }
    },

    updateColumns: function(oldRowDom, newRowDom, columnsToUpdate) {
        var me = this,
            newAttrs, attLen, attName, attrIndex,
            colCount = columnsToUpdate.length,
            colIndex,
            column,
            oldCell, newCell,
            cellSelector = me.getCellSelector();

            // Copy new row attributes across. Use IE-specific method if possible.
            // Must do again at this level because the row DOM passed here may be the nested row in a row wrap.
            if (oldRowDom.mergeAttributes) {
                oldRowDom.mergeAttributes(newRowDom, true);
            } else {
                newAttrs = newRowDom.attributes;
                attLen = newAttrs.length;
                for (attrIndex = 0; attrIndex < attLen; attrIndex++) {
                    attName = newAttrs[attrIndex].name;
                    if (attName !== 'id') {
                        oldRowDom.setAttribute(attName, newAttrs[attrIndex].value);
                    }
                }
            }

        // Replace changed cells in the existing row structure with the new version from the rendered row.
        for (colIndex = 0; colIndex < colCount; colIndex++) {
            column = columnsToUpdate[colIndex];

            // Pluck out cells using the column's unique cell selector.
            // Becuse in a wrapped row, there may be several TD elements.
            cellSelector = me.getCellSelector(column);
            oldCell = Ext.fly(oldRowDom).selectNode(cellSelector);
            newCell = Ext.fly(newRowDom).selectNode(cellSelector);

            // Carefully replace just the *contents* of the cell.
            Ext.fly(oldCell).syncContent(newCell);
        }
    },

    /**
     * @private
     * Decides whether the column needs updating
     * @return {Number} 0 = Doesn't need update.
     * 1 = Column needs update, and renderer has > 1 argument; We need to render a whole new HTML item.
     * 2 = Column needs update, but renderer has 1 argument or column uses an updater.
     */
    shouldUpdateCell: function(record, column, changedFieldNames) {
        // We should not update certain columns (widget column)
        if (!column.preventUpdate) {

            // The passed column has a renderer which peeks and pokes at other data.
            // Return 1 which means that a whole new TableView item must be rendered.
            if (column.hasCustomRenderer) {
                return 1;
            }

            // If there is a changed field list, and it's NOT a custom column renderer
            // (meaning it doesn't peek at other data, but just uses the raw field value)
            // We only have to update it if the column's field is amobg those changes.
            if (changedFieldNames) {
                var len = changedFieldNames.length,
                    i, field;

                for (i = 0; i < len; ++i) {
                    field = changedFieldNames[i];
                    if (field === column.dataIndex || field === record.idProperty) {
                        return 2;
                    }
                }
            } else {
                return 2;
            }
        }
        return 0;
    },

    /**
     * Refreshes the grid view. Sets the sort state and focuses the previously focused row.
     */
    refresh: function() {
        var me = this,
            scrollerSize;

        me.callParent(arguments);
        me.headerCt.setSortState();

        // Create horizontal stretcher element if no records in view and there is overflow of the header container.
        // Element will be transient and destroyed by the next refresh.
        if (me.touchScroll && me.el && !me.all.getCount() && me.headerCt && me.headerCt.tooNarrow) {
            scrollerSize = me.scrollManager.scroller.getSize();
            scrollerSize.x = me.headerCt.getTableWidth();
            me.scrollManager.scroller.setSize(scrollerSize);
            me.scrollManager.refresh();
        }
        me.refreshSelection();
    },

    refreshSelection: function() {
        var me = this,
            selModel = me.selModel,
            selected, len, i;

        if (selModel.isRowModel) {
            selected = selModel.selected.items;
            len = selected.length;
            for (i = 0; i < len; i++) {
                me.onRowSelect(me.indexOf(me.getNode(selected[i])));
            }
        }
        me.selModel.onLastFocusChanged(null, me.selModel.lastFocused, true);
    },

    processItemEvent: function(record, item, rowIndex, e) {
        var me = this,
            self = me.self,
            map = self.EventMap,
            type = e.type,
            row, cell, selModel,
            features = me.features,
            len = features.length,
            i, cellIndex, result, feature, header;

        // IE has a bug whereby if you mousedown in a cell editor in one side of a locking grid and then
        // drag out of that, and mouseup in *the other side*, the mousedowned side still receives the event!
        // Even though the mouseup target is *not* within it! Ignore the mouseup in this case.
        if (Ext.isIE && type === 'mouseup' && !e.within(me.el)) {
            return false;
        }

        // Only process the event if it occurred within an item which maps to a record in the store
        if (me.indexInStore(item) !== -1) {
            row = Ext.fly(item).down(me.rowSelector, true);
            cell = e.getTarget(me.getCellSelector(), row);
            selModel = me.getSelectionModel();

            type = self.TouchEventMap[type] || type;

            if (type == 'keydown' && !cell && selModel.getCurrentPosition) {
                // CellModel, otherwise we can't tell which cell to invoke
                cell = me.getCellByPosition(selModel.getCurrentPosition(), true);
            }

            // cellIndex is an attribute only of TD elements. Other TplFactories must use the data-cellIndex attribute.
            if (cell) {
                if (!cell.parentNode) {
                    // If we have no parentNode, the td has been removed from the DOM, probably via an update,
                    // so just jump out since the target for the event isn't valid
                    return false;
                }
                header = me.getHeaderByCell(cell);

                // Find the index of the header in the *full* (including hidden columns) leaf column set.
                // Because In 4.0.0 we rendered hidden cells, and the cellIndex included the hidden ones.
                cellIndex = me.ownerCt.getColumnManager().getHeaderIndex(header);
            } else {
                cellIndex = -1;
            }

            result = me.fireEvent('uievent', type, me, cell, rowIndex, cellIndex, e, record, row);

            // If the event has been stopped by a handler, tell the selModel (if it is interested) and return early.
            // For example, action columns by default will stop event propagation by returning `false` from its
            // 'uievent' event handler.
            if ((result === false || me.callParent(arguments) === false)) {
                if (selModel.onVetoUIEvent) {
                    selModel.onVetoUIEvent(type, me, cell, rowIndex, cellIndex, e, record, row);
                }
                return false;
            }

            for (i = 0; i < len; ++i) {
                feature = features[i];
                // In some features, the first/last row might be wrapped to contain extra info,
                // such as grouping or summary, so we may need to stop the event
                if (feature.wrapsItem) {
                    if (feature.vetoEvent(record, row, rowIndex, e) === false) {
                        // If the feature is vetoing the event, there's a good chance that
                        // it's for some feature action in the wrapped row.
                        me.processSpecialEvent(e);
                        return false;
                    }
                }
            }

            // if the element whose event is being processed is not an actual cell (for example if using a rowbody
            // feature and the rowbody element's event is being processed) then do not fire any "cell" events
            // Don't handle cellmouseenter and cellmouseleave events for now
            if (cell && type !== 'mouseover' && type !== 'mouseout') {
                result = !(
                    // We are adding cell and feature events
                    (me['onBeforeCell' + map[type]](cell, cellIndex, record, row, rowIndex, e) === false) ||
                    (me.fireEvent('beforecell' + type, me, cell, cellIndex, record, row, rowIndex, e) === false) ||
                    (me['onCell' + map[type]](cell, cellIndex, record, row, rowIndex, e) === false) ||
                    (me.fireEvent('cell' + type, me, cell, cellIndex, record, row, rowIndex, e) === false)
                );
            }
            if (result !== false) {
                result = me.fireEvent('row' + type, me, record, row, rowIndex, e);
            }

            return result;

        } else {
            // If it's not in the store, it could be a feature event, so check here
            this.processSpecialEvent(e);
            return false;
        }
    },

    processSpecialEvent: function(e) {
        var me = this,
            features = me.features,
            ln = features.length,
            type = e.type,
            i, feature, prefix, featureTarget,
            beforeArgs, args,
            panel = me.ownerCt;

        me.callParent(arguments);

        if (type == 'mouseover' || type == 'mouseout') {
            return;
        }

        for (i = 0; i < ln; i++) {
            feature = features[i];
            if (feature.hasFeatureEvent) {
                featureTarget = e.getTarget(feature.eventSelector, me.getTargetEl());
                if (featureTarget) {
                    prefix = feature.eventPrefix;
                    type = me.self.TouchEventMap[type] || type;
                    // allows features to implement getFireEventArgs to change the
                    // fireEvent signature
                    beforeArgs = feature.getFireEventArgs('before' + prefix + type, me, featureTarget, e);
                    args = feature.getFireEventArgs(prefix + type, me, featureTarget, e);

                    if (
                        // before view event
                        (me.fireEvent.apply(me, beforeArgs) === false) ||
                        // panel grid event
                        (panel.fireEvent.apply(panel, beforeArgs) === false) ||
                        // view event
                        (me.fireEvent.apply(me, args) === false) ||
                        // panel event
                        (panel.fireEvent.apply(panel, args) === false)
                    ) {
                        return false;
                    }
                }
            }
        }
        return true;
    },

    onCellMouseDown: Ext.emptyFn,
    onCellLongPress: Ext.emptyFn,
    onCellMouseUp: Ext.emptyFn,
    onCellClick: Ext.emptyFn,
    onCellDblClick: Ext.emptyFn,
    onCellContextMenu: Ext.emptyFn,
    onCellKeyDown: Ext.emptyFn,
    onBeforeCellMouseDown: Ext.emptyFn,
    onBeforeCellLongPress: Ext.emptyFn,
    onBeforeCellMouseUp: Ext.emptyFn,
    onBeforeCellClick: Ext.emptyFn,
    onBeforeCellDblClick: Ext.emptyFn,
    onBeforeCellContextMenu: Ext.emptyFn,
    onBeforeCellKeyDown: Ext.emptyFn,

    /**
     * Expands a particular header to fit the max content width.
     * @deprecated Use {@link #autoSizeColumn} instead.
     */
    expandToFit: function(header) {
        this.autoSizeColumn(header);
    },

    /**
     * Sizes the passed header to fit the max content width.
     * *Note that group columns shrinkwrap around the size of leaf columns. Auto sizing a group column
     * autosizes descendant leaf columns.*
     * @param {Ext.grid.column.Column/Number} header The header (or index of header) to auto size.
     */
    autoSizeColumn: function(header) {
        if (Ext.isNumber(header)) {
            header = this.getGridColumns[header];
        }
        if (header) {
            if (header.isGroupHeader) {
                header.autoSize();
                return;
            }
            delete header.flex;
            header.setWidth(this.getMaxContentWidth(header));
        }
    },

    /**
     * Returns the max contentWidth of the header's text and all cells
     * in the grid under this header.
     * @private
     */
    getMaxContentWidth: function(header) {
        var me = this,
            cells = me.el.query(header.getCellInnerSelector()),
            originalWidth = header.getWidth(),
            i = 0,
            ln = cells.length,
            columnSizer = me.body.select(me.getColumnSizerSelector(header)),
            max = Math.max,
            widthAdjust = 0,
            maxWidth;

        if (ln > 0) {
            if (Ext.supports.ScrollWidthInlinePaddingBug) {
                widthAdjust += me.getCellPaddingAfter(cells[0]);
            }
            if (me.columnLines) {
                widthAdjust += Ext.fly(cells[0].parentNode).getBorderWidth('lr');
            }
        }

        // Set column width to 1px so we can detect the content width by measuring scrollWidth
        columnSizer.setWidth(1);

        // We are about to measure the offsetWidth of the textEl to determine how much
        // space the text occupies, but it will not report the correct width if the titleEl
        // has text-overflow:ellipsis.  Set text-overflow to 'clip' before proceeding to
        // ensure we get the correct measurement.
        header.titleEl.setStyle('text-overflow', 'clip');

        // Allow for padding round text of header
        maxWidth = header.textEl.dom.offsetWidth + header.titleEl.getPadding('lr');

        // revert to using text-overflow defined by the stylesheet
        header.titleEl.setStyle('text-overflow', '');

        for (; i < ln; i++) {
            maxWidth = max(maxWidth, cells[i].scrollWidth);
        }

        // in some browsers, the "after" padding is not accounted for in the scrollWidth
        maxWidth += widthAdjust;

        // 40 is the minimum column width.  TODO: should this be configurable?
        maxWidth = max(maxWidth, 40);

        // Set column width back to original width
        columnSizer.setWidth(originalWidth);

        return maxWidth;
    },

    getPositionByEvent: function(e) {
        var me       = this,
            cellNode = e.getTarget(me.cellSelector),
            rowNode  = e.getTarget(me.itemSelector),
            record   = me.getRecord(rowNode),
            header   = me.getHeaderByCell(cellNode);

        return me.getPosition(record, header);
    },

    getHeaderByCell: function(cell) {
        if (cell) {
            return this.ownerCt.getVisibleColumnManager().getHeaderAtIndex(cell.cellIndex);
        }
        return false;
    },

    /**
     * @param {Object} position The current row and column: an object containing the following properties:
     *
     * - row - The row index
     * - column - The column index
     *
     * @param {String} direction 'up', 'down', 'right' and 'left'
     * @param {Ext.event.Event} e event
     * @param {Boolean} preventWrap Set to true to prevent wrap around to the next or previous row.
     * @param {Function} verifierFn A function to verify the validity of the calculated position.
     * When using this function, you must return true to allow the newPosition to be returned.
     * @param {Object} scope Scope to run the verifierFn in
     * @returns {Ext.grid.CellContext} An object encapsulating the unique cell position.
     *
     * @private
     */
    walkCells: function(pos, direction, e, preventWrap, verifierFn, scope) {

        // Caller (probably CellModel) had no current position. This can happen
        // if the main el is focused and any navigation key is presssed.
        if (!pos) {
            return false;
        }

        var me           = this,
            row          = pos.row,
            column       = pos.column,
            rowCount     = me.dataSource.getCount(),
            allCols      = me.ownerCt.getColumnManager(),
            visible      = me.ownerCt.getVisibleColumnManager(),
            firstIndex   = allCols.getHeaderIndex(visible.getFirst()),
            lastIndex    = allCols.getHeaderIndex(visible.getLast()),
            newRow       = row,
            newColumn    = column,
            activeHeader = allCols.getHeaderAtIndex(column);

        // no active header or its currently hidden
        if (!activeHeader || activeHeader.hidden || !rowCount) {
            return false;
        }

        e = e || {};
        direction = direction.toLowerCase();
        switch (direction) {
            case 'right':
                // has the potential to wrap if its last
                if (column === lastIndex) {
                    // if bottom row and last column, deny right
                    if (preventWrap || row === rowCount - 1) {
                        return false;
                    }
                    if (!e.ctrlKey) {
                        // otherwise wrap to nextRow and firstCol
                        newRow = me.walkRows(row, 1);
                        if (newRow !== row) {
                            newColumn = firstIndex;
                        }
                    }
                // go right
                } else {
                    if (!e.ctrlKey) {
                        newColumn = allCols.getHeaderIndex(visible.getNextSibling(activeHeader));
                    } else {
                        newColumn = lastIndex;
                    }
                }
                break;

            case 'left':
                // has the potential to wrap
                if (column === firstIndex) {
                    // if top row and first column, deny left
                    if (preventWrap || row === 0) {
                        return false;
                    }
                    if (!e.ctrlKey) {
                        // otherwise wrap to prevRow and lastIndex
                        newRow = me.walkRows(row, -1);
                        if (newRow !== row) {
                            newColumn = lastIndex;
                        }
                    }
                // go left
                } else {
                    if (!e.ctrlKey) {
                        newColumn = allCols.getHeaderIndex(visible.getPreviousSibling(activeHeader));
                    } else {
                        newColumn = firstIndex;
                    }
                }
                break;

            case 'up':
                // if top row, deny up
                if (row === 0) {
                    return false;
                // go up
                } else {
                    if (!e.ctrlKey) {
                        newRow = me.walkRows(row, -1);
                    } else {
                        // Go to first row by walking down from row -1
                        newRow = me.walkRows(-1, 1);
                    }
                }
                break;

            case 'down':
                // if bottom row, deny down
                if (row === rowCount - 1) {
                    return false;
                // go down
                } else {
                    if (!e.ctrlKey) {
                        newRow = me.walkRows(row, 1);
                    } else {
                        // Go to first row by walking up from beyond the last row
                        newRow = me.walkRows(rowCount, -1);
                    }
                }
                break;
        }

        if (verifierFn && verifierFn.call(scope || me, {row: newRow, column: newColumn}) !== true) {
            return false;
        }

        newColumn = allCols.getHeaderAtIndex(newColumn);
        return new Ext.grid.CellContext(me).setPosition(newRow, newColumn);
    },

    /**
     * Increments the passed row index by the passed increment which may be +ve or -ve
     *
     * Skips hidden rows.
     *
     * If no row is visible in the specified direction, returns the input row index unchanged.
     * @param {Number} startRow The zero-based row index to start from.
     * @param {Number} distance The distance to move the row by. May be +ve or -ve.
     */
    walkRows: function(startRow, distance) {
        // Note that we use the **dataSource** here because row indices mean view row indices
        // so records in collapsed groups must be omitted.
        var me = this,
            store = me.dataSource,
            moved = 0,
            lastValid = startRow,
            node,
            limit = (distance < 0) ? 0 : (store.isBufferedStore ? store.getTotalCount() : store.getCount()) - 1,
            increment = limit ? 1 : -1,
            result = startRow;

        do {
            // Walked off the end: return the last encountered valid row
            if (limit ? result >= limit : result <= limit) {
                return lastValid || limit;
            }

            // Move the result pointer on by one position. We have to count intervening VISIBLE nodes
            result += increment;

            // Stepped onto VISIBLE record: Increment the moved count.
            // We must not count stepping onto a non-rendered record as a move.
            if ((node = Ext.fly(me.getRow(result))) && node.isVisible(true)) {
                moved += increment;
                lastValid = result;
            }
        } while (moved !== distance);
        return result;
    },

    /**
     * Navigates from the passed record by the passed increment which may be +ve or -ve
     *
     * Skips hidden records.
     *
     * If no record is visible in the specified direction, returns the starting record index unchanged.
     * @param {Ext.data.Model} startRec The Record to start from.
     * @param {Number} distance The distance to move from the record. May be +ve or -ve.
     */
    walkRecs: function(startRec, distance) {
        // Note that we use the **store** to access the records by index because the dataSource omits records in collapsed groups.
        // This is used by selection models which use the **store**
        var me = this,
            store = me.dataSource,
            moved = 0,
            lastValid = startRec,
            node,
            limit = (distance < 0) ? 0 : (store.isBufferedStore ? store.getTotalCount() : store.getCount()) - 1,
            increment = limit ? 1 : -1,
            testIndex = store.indexOf(startRec),
            rec;

        do {
            // Walked off the end: return the last encountered valid record
            if (limit ? testIndex >= limit : testIndex <= limit) {
                return lastValid;
            }

            // Move the result pointer on by one position. We have to count intervening VISIBLE nodes
            testIndex += increment;

            // Stepped onto VISIBLE record: Increment the moved count.
            // We must not count stepping onto a non-rendered record as a move.
            rec = store.getAt(testIndex);
            if (!rec.isCollapsedPlaceholder && (node = Ext.fly(me.getNodeByRecord(rec))) && node.isVisible(true)) {
                moved += increment;
                lastValid = rec;
            }
        } while (moved !== distance);
        return lastValid;
    },

    getFirstVisibleRowIndex: function() {
        var me = this,
            count = (me.dataSource.isBufferedStore ? me.dataSource.getTotalCount() : me.dataSource.getCount()),
            result = me.indexOf(me.all.first()) - 1;

        do {
            result += 1;
            if (result === count) {
                return;
            }
        } while (!Ext.fly(me.getRow(result)).isVisible(true));
        return result;
    },

    getLastVisibleRowIndex: function() {
        var me = this,
            result = me.indexOf(me.all.last());

        do {
            result -= 1;
            if (result === -1) {
                return;
            }
        } while (!Ext.fly(me.getRow(result)).isVisible(true));
        return result;
    },

    getHeaderCt: function() {
        return this.headerCt;
    },

    getPosition: function(record, header) {
        return new Ext.grid.CellContext(this).setPosition(record, header);
    },

    beforeDestroy: function() {
        var me = this;

        if (me.rendered) {
            me.el.clearListeners();
        }
        me.callParent(arguments);
    },

    onDestroy: function() {
        var me = this,
            features = me.featuresMC,
            len,
            i;

        if (features) {
            for (i = 0, len = features.getCount(); i < len; ++i) {
                features.getAt(i).destroy();
            }
        }
        me.featuresMC = null;
        this.callParent(arguments);
    },

    // Private.
    // Respond to store replace event which is fired by GroupStore group expand/collapse operations.
    // This saves a layout because a remove and add operation are coalesced in this operation.
    onReplace: function(store, startIndex, oldRecords, newRecords) {
        var me = this,
            bufferedRenderer = me.bufferedRenderer;

        // If there's a buffered renderer and the removal range falls inside the current view...
        if (me.rendered && bufferedRenderer) {
            bufferedRenderer.onReplace(store, startIndex, oldRecords, newRecords);
        } else {
            me.callParent(arguments);
            me.doStripeRows(startIndex);
            me.selModel.onLastFocusChanged(null, me.selModel.lastFocused, true);
        }
    },

    // after adding a row stripe rows from then on
    onAdd: function(store, records, index) {
        var me = this,
            bufferedRenderer = me.bufferedRenderer;

        if (me.rendered && bufferedRenderer) {
             bufferedRenderer.onReplace(store, index, [], records);
        }
        // No BufferedRenderer present
        else {
            me.callParent(arguments);
            me.setPendingStripe(index);
            me.selModel.onLastFocusChanged(null, me.selModel.lastFocused, true);
        }
    },

    // after removing a row stripe rows from then on
    onRemove: function(store, records, index) {
        var me = this,
            bufferedRenderer = me.bufferedRenderer;

        // If there's a BufferedRenderer...
        if (me.rendered && bufferedRenderer) {
            bufferedRenderer.onReplace(store, index, records, []);
        } else {
            me.callParent(arguments);
            me.setPendingStripe(index);
        }
    },
    
    // When there's a buffered renderer present, store refresh events cause TableViews to go to scrollTop:0
    onDataRefresh: function() {
        var me = this,
            owner = me.ownerCt;

        // If triggered during an animation, refresh once we're done
        if (owner && owner.isCollapsingOrExpanding === 2) {
            owner.on('expand', me.onDataRefresh, me, {single: true});
            return;
        }

        if (me.bufferedRenderer) {
            // Clear NodeCache. Do NOT remove nodes from DOM - that would blur the view, and then refresh will not refocus after the refresh.
            me.all.clear();
            me.bufferedRenderer.onStoreClear();
        }
        me.callParent();
    },

    getViewRange: function() {
        var me = this;

        if (me.bufferedRenderer) {
            return me.bufferedRenderer.getViewRange();
        }
        return me.callParent();
    },

    setPendingStripe: function(index) {
        var current = this.stripeOnUpdate;
        if (current === null) {
            current = index; 
        } else {
            current = Math.min(current, index);
        }
        this.stripeOnUpdate = current;
    },
    
    onEndUpdate: function() {
        var me = this,
            stripeOnUpdate = me.stripeOnUpdate;
        
        if (stripeOnUpdate || stripeOnUpdate === 0) {
            me.doStripeRows(stripeOnUpdate);
            me.stripeOnUpdate = null;
        }
        me.callParent(arguments);
    },

    /**
     * Stripes rows from a particular row index.
     * @param {Number} startRow
     * @param {Number} [endRow] argument specifying the last row to process.
     * By default process up to the last row.
     * @private
     */
    doStripeRows: function(startRow, endRow) {
        var me = this,
            rows,
            rowsLn,
            i,
            row;

        // ensure stripeRows configuration is turned on
        if (me.rendered && me.stripeRows) {
            rows = me.getNodes(startRow, endRow);

            for (i = 0, rowsLn = rows.length; i < rowsLn; i++) {
                row = rows[i];
                // Remove prior applied row classes.
                row.className = row.className.replace(me.rowClsRe, ' ');
                startRow++;
                // Every odd row will get an additional cls
                if (startRow % 2 === 0) {
                    row.className += (' ' + me.altRowCls);
                }
            }
        }
    },

    hasActiveFeature: function(){
        return (this.isGrouping && this.store.isGrouped()) || this.isRowWrapped;
    },

    getCellPaddingAfter: function(cell) {
        return Ext.fly(cell).getPadding('r');
    },

    privates: {
        getFocusEl: function() {
            return this.focusEl;
        },
        refreshScroll: function () {
            var me = this,
                bufferedRenderer = me.bufferedRenderer;

            // If there is a BufferedRenderer, we must refresh the scroller using BufferedRenderer methods
            // which take account of the full virtual scroll range.
            if (bufferedRenderer) {
                bufferedRenderer.stretchView(me, bufferedRenderer.getScrollHeight(true));
            } else {
                me.callParent();
            }
        }
    }
});
