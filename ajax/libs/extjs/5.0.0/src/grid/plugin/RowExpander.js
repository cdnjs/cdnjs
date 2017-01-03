// feature idea to enable Ajax loading and then the content
// cache would actually make sense. Should we dictate that they use
// data or support raw html as well?

/**
 * Plugin (ptype = 'rowexpander') that adds the ability to have a Column in a grid which enables
 * a second row body which expands/contracts.  The expand/contract behavior is configurable to react
 * on clicking of the column, double click of the row, and/or hitting enter while a row is selected.
 */
Ext.define('Ext.grid.plugin.RowExpander', {
    extend: 'Ext.plugin.Abstract',
    lockableScope: 'normal',

    requires: [
        'Ext.grid.feature.RowBody'
    ],

    alias: 'plugin.rowexpander',

    /**
     * @cfg {Number} [columnWidth=24]
     * The width of the row expander column which contains the [+]/[-] icons to toggle row expansion.
     */
    columnWidth: 24,

    /**
     * @cfg {Ext.XTemplate} rowBodyTpl
     * An XTemplate which, when passed a record data object, produces HTML for the expanded row content.
     *
     * Note that if this plugin is applied to a lockable grid, the rowBodyTpl applies to the normal (unlocked) side.
     * See {@link #lockedTpl}
     *
     */
    rowBodyTpl: null,

    /**
     * @cfg {Ext.XTemplate} [lockedTpl]
     * An XTemplate which, when passed a record data object, produces HTML for the expanded row content *on the locked side of a lockable grid*.
     */
    lockedTpl: null,

    /**
     * @cfg {Boolean} expandOnEnter
     * `true` to toggle selected row(s) between expanded/collapsed when the enter
     * key is pressed (defaults to `true`).
     */
    expandOnEnter: true,

    /**
     * @cfg {Boolean} expandOnDblClick
     * `true` to toggle a row between expanded/collapsed when double clicked
     * (defaults to `true`).
     */
    expandOnDblClick: true,

    /**
     * @cfg {Boolean} selectRowOnExpand
     * `true` to select a row when clicking on the expander icon
     * (defaults to `false`).
     */
    selectRowOnExpand: false,

    /**
     * @cfg {Number}
     * The width of the Row Expander column header
     */
    headerWidth: 24,
    
    rowBodyTrSelector: '.' + Ext.baseCSSPrefix + 'grid-rowbody-tr',
    rowBodyHiddenCls: Ext.baseCSSPrefix + 'grid-row-body-hidden',
    rowCollapsedCls: Ext.baseCSSPrefix + 'grid-row-collapsed',

    addCollapsedCls: {
        fn: function(out, values, parent) {
            var me = this.rowExpander;
            if (!me.recordsExpanded[values.record.internalId]) {
                values.itemClasses.push(me.rowCollapsedCls);
            }
            this.nextTpl.applyOut(values, out, parent);
        },
        syncRowHeights: function(lockedItem, normalItem) {
            this.rowExpander.syncRowHeights(lockedItem, normalItem);
        },
        // We need a high priority to get in ahead of the outerRowTpl
        // so we can setup row data
        priority: 20000
    },

    /**
     * @event expandbody
     * **Fired through the grid's View**
     * @param {HTMLElement} rowNode The &lt;tr> element which owns the expanded row.
     * @param {Ext.data.Model} record The record providing the data.
     * @param {HTMLElement} expandRow The &lt;tr> element containing the expanded data.
     */
    /**
     * @event collapsebody
     * **Fired through the grid's View.**
     * @param {HTMLElement} rowNode The &lt;tr> element which owns the expanded row.
     * @param {Ext.data.Model} record The record providing the data.
     * @param {HTMLElement} expandRow The &lt;tr> element containing the expanded data.
     */

    setCmp: function(grid) {
        var me = this,
            features;

        me.callParent(arguments);

        me.recordsExpanded = {};
        // <debug>
        if (!me.rowBodyTpl) {
            Ext.Error.raise("The 'rowBodyTpl' config is required and is not defined.");
        }
        // </debug>

        me.rowBodyTpl = Ext.XTemplate.getTpl(me, 'rowBodyTpl');
        features = me.getFeatureConfig(grid);

        if (grid.features) {
            grid.features = Ext.Array.push(features, grid.features);
        } else {
            grid.features = features;
        }
        // NOTE: features have to be added before init (before Table.initComponent)
    },

    /**
     * @protected
     * @return {Array} And array of Features or Feature config objects.
     * Returns the array of Feature configurations needed to make the RowExpander work.
     * May be overridden in a subclass to modify the returned array.
     */
    getFeatureConfig: function(grid) {
        var me = this,
            features = [],
            featuresCfg = {
                ftype: 'rowbody',
                rowExpander: me,
                recordsExpanded: me.recordsExpanded,
                rowBodyHiddenCls: me.rowBodyHiddenCls,
                rowCollapsedCls: me.rowCollapsedCls,
                setupRowData: me.getRowBodyFeatureData,
                setup: me.setup
            };

        features.push(Ext.apply({
            lockableScope: 'normal',
            getRowBodyContents: me.getRowBodyContentsFn(me.rowBodyTpl)
        }, featuresCfg));

        // Locked side will need a copy to keep the two DOM structures symmetrical.
        // A lockedTpl config is available to create content in locked side.
        // The enableLocking flag is set early in Ext.panel.Table#initComponent if any columns are locked.
        if (grid.enableLocking) {
            features.push(Ext.apply({
                lockableScope: 'locked',
                getRowBodyContents: me.lockedTpl ? me.getRowBodyContentsFn(me.lockedTpl) : function() {return '';}
            }, featuresCfg));
        }

        return features;
    },
    
    getRowBodyContentsFn: function(rowBodyTpl) {
        var me = this;
        return function (rowValues) {
            rowBodyTpl.owner = me;
            return rowBodyTpl.applyTemplate(rowValues.record.getData());
        };
    },

    init: function(grid) {
        if (grid.lockable) {
            grid = grid.normalGrid;
        }

        var me = this,
            ownerLockable = grid.ownerLockable,
            view, lockedView;

        me.callParent(arguments);
        me.grid = grid;
        view = me.view = grid.getView();

        // Bind to view for key and mouse events
        // Add row processor which adds collapsed class
        me.bindView(view);
        view.addRowTpl(me.addCollapsedCls).rowExpander = me;

        // If the owning grid is lockable, ensure the collapsed class is applied to the locked side by adding a row processor.
        if (ownerLockable) {
            me.addExpander(ownerLockable.lockedGrid.headerCt.items.getCount() ? ownerLockable.lockedGrid : grid);

            // If our client grid part of a lockable grid, we listen to its ownerLockable's beforereconfigure
            lockedView = ownerLockable.lockedGrid.getView();

            // Bind to locked view for key and mouse events
            // Add row processor which adds collapsed class
            me.bindView(lockedView);
            lockedView.addRowTpl(me.addCollapsedCls).rowExpander = me;
            ownerLockable.syncRowHeight = true;
            ownerLockable.mon(ownerLockable, {
                processcolumns: me.onLockableProcessColumns,
                lockcolumn: me.onColumnLock,
                unlockcolumn: me.onColumnUnlock,
                scope: me
            });

            // Must wait until BOTH sides have finished to sync height of added items.
            me.viewListeners = view.on({
                itemadd: Ext.Function.createAnimationFrame(ownerLockable.syncRowHeights, ownerLockable)
            });
        } else {
            me.addExpander(grid);
            grid.on('beforereconfigure', me.beforeReconfigure, me);
        }
    },

    beforeReconfigure: function(grid, store, columns, oldStore, oldColumns) {
        var me = this;

        if (me.viewListeners) {
            me.viewListeners.destroy();    
        }
        
        if (columns) {
            me.expanderColumn = new Ext.grid.Column(me.getHeaderConfig());    
            columns.unshift(me.expanderColumn);
        }
        
    },

    onLockableProcessColumns: function(lockable, lockedHeaders, normalHeaders) {
        this.addExpander(lockedHeaders.length ? lockable.lockedGrid : lockable.normalGrid);
    },

    /**
     * @private
     * Inject the expander column into the correct grid.
     *
     * If we are expanding the normal side of a lockable grid, poke the column into the locked side if the locked side has columns
     */
    addExpander: function(expanderGrid) {
        var me = this,
            expanderHeader = me.getHeaderConfig();

        // If this is the locked side of a lockable grid which is shrinkwrapping the locked width, increment its width.
        if (expanderGrid.isLocked && expanderGrid.ownerLockable.shrinkWrapLocked) {
            expanderGrid.width += expanderHeader.width;
        }
        me.expanderColumn = expanderGrid.headerCt.insert(0, expanderHeader);

        // If a CheckboxModel, it must now put its checkbox in at position one because this
        // cell always gets in at position zero, and spans 2 columns.
        expanderGrid.getSelectionModel().injectCheckbox = 1;
    },

    getRowBodyFeatureData: function(record, idx, rowValues) {
        var me = this;

        me.self.prototype.setupRowData.apply(me, arguments);

        rowValues.rowBody = me.getRowBodyContents(rowValues);
        rowValues.rowBodyCls = me.recordsExpanded[record.internalId] ? '' : me.rowBodyHiddenCls;
    },

    setup: function(rows, rowValues){
        var me = this,
            lockable = me.grid.ownerLockable;

        me.self.prototype.setup.apply(me, arguments);

        // If we are lockable, and we are setting up the side which has the expander column, it is row spanning so we don't have to colspan it
        if (lockable && Ext.Array.indexOf(me.grid.columnManager.getColumns(), me.rowExpander.expanderColumn) !== -1) {
            rowValues.rowBodyColspan -= 1;
        }
    },

    bindView: function(view) {
        if (this.expandOnEnter) {
            view.on('itemkeydown', this.onKeyDown, this);
        }
        if (this.expandOnDblClick) {
            view.on('itemdblclick', this.onDblClick, this);
        }
    },

    onKeyDown: function(view, record, row, rowIdx, e) {
        if (e.getKey() === e.ENTER) {
            var ds   = view.store,
                sels = view.getSelectionModel().getSelection(),
                ln   = sels.length,
                i = 0;

            for (; i < ln; i++) {
                rowIdx = ds.indexOf(sels[i]);
                this.toggleRow(rowIdx, sels[i]);
            }
        }
    },

    onDblClick: function(view, record, row, rowIdx, e) {
        this.toggleRow(rowIdx, record);
    },

    toggleRow: function(rowIdx, record) {
        var me = this,
            view = me.view,
            bufferedRenderer = view.bufferedRenderer,
            scrollManager = view.scrollManager,
            fireView = view,
            rowNode = view.getNode(rowIdx),
            normalRow = Ext.fly(rowNode),
            lockedRow,
            nextBd = normalRow.down(me.rowBodyTrSelector, true),
            wasCollapsed = normalRow.hasCls(me.rowCollapsedCls),
            addOrRemoveCls = wasCollapsed ? 'removeCls' : 'addCls',

            // The expander column should be rowSpan="2" only when the expander is expanded
            rowSpan = wasCollapsed ? 2 : 1,
            ownerLockable = me.grid.ownerLockable,
            expanderCell;

        normalRow[addOrRemoveCls](me.rowCollapsedCls);
        Ext.fly(nextBd)[addOrRemoveCls](me.rowBodyHiddenCls);
        me.recordsExpanded[record.internalId] = wasCollapsed;

        // Sync the collapsed/hidden clases on the locked side
        if (me.grid.ownerLockable) {

            // It's the top level grid's LockingView that does the firing when there's a lockable assembly involved.
            fireView = ownerLockable.getView();

            // Only attempt to toggle lockable side if it is visible.
            if (ownerLockable.lockedGrid.isVisible()) {

                view = ownerLockable.view.lockedGrid.view;

                // Process the locked side.
                lockedRow = Ext.fly(view.getNode(rowIdx));
                // Just because the grid is locked, doesn't mean we'll necessarily have a locked row.
                if (lockedRow) {
                    lockedRow[addOrRemoveCls](me.rowCollapsedCls);

                    // If there is a template for expander content in the locked side, toggle that side too
                    nextBd = lockedRow.down(me.rowBodyTrSelector, true);
                    Ext.fly(nextBd)[addOrRemoveCls](me.rowBodyHiddenCls);
                }
            }
        }

        // Here is where we set the rowSpan on this plugin's row expander cell.
        // It should be rowSpan="2" only when the expander row is visible.
        if (me.expanderColumn) {
            expanderCell = Ext.fly(view.getRow(rowIdx)).down(me.expanderColumn.getCellSelector(), true);
            if (expanderCell) {
                expanderCell.rowSpan = rowSpan;    
            }
        }
        
        fireView.fireEvent(wasCollapsed ? 'expandbody' : 'collapsebody', rowNode, record, nextBd);

        // Layout needed of we are shrinkwrapping height, or there are locked/unlocked sides to sync
        // Will sync the expander row heights between locked and normal sides
        if (view.getSizeModel().height.shrinkWrap || ownerLockable) {
            view.refreshSize(true);
        }
        // If we are using the touch scroller, ensure that the scroller knows about
        // the correct scrollable range
        if (scrollManager) {
            if (bufferedRenderer) {
                bufferedRenderer.stretchView(view, bufferedRenderer.getScrollHeight(true));
            } else {
                scrollManager.refresh(true);
            }
        }    
    },

    // Called from TableLayout.finishedLayout
    syncRowHeights: function(lockedItem, normalItem) {
        var me = this,
            lockedBd = Ext.fly(lockedItem).down(me.rowBodyTrSelector),
            normalBd = Ext.fly(normalItem).down(me.rowBodyTrSelector),
            lockedHeight,
            normalHeight;

        // If expanded, we have to ensure expander row heights are synched
        if (normalBd.isVisible()) {

            // If heights are different, expand the smallest one
            if ((lockedHeight = lockedBd.getHeight()) !== (normalHeight = normalBd.getHeight())) {
                if (lockedHeight > normalHeight) {
                    normalBd.setHeight(lockedHeight);
                } else {
                    lockedBd.setHeight(normalHeight);
                }
            }
        }
        // When not expanded we do not control the heights
        else {
            lockedBd.dom.style.height = normalBd.dom.style.height = '';
        }
    },

    onColumnUnlock: function(lockable, column) {
        var me = this,
            lockedColumns;
        
        lockable = me.grid.ownerLockable;
        lockedColumns = lockable.lockedGrid.visibleColumnManager.getColumns();
        
        // User has unlocked all columns and left only the expander column in the locked side.
        if (lockedColumns.length === 1) {
            if (lockedColumns[0] === me.expanderColumn) {
                lockable.unlock(me.expanderColumn);
            } else {
                lockable.lock(me.expanderColumn, 0);
            }
        }
    },

    onColumnLock: function(lockable, column) {
        var me = this,
            lockedColumns;
        
        lockable = me.grid.ownerLockable;
        lockedColumns = lockable.lockedGrid.visibleColumnManager.getColumns();
        
        // User has unlocked all columns and left only the expander column in the locked side.
        if (lockedColumns.length === 1) {
            lockable.lockedGrid.headerCt.insert(0, me.expanderColumn);
        }
    },

    getHeaderConfig: function() {
        var me = this,
            lockable = me.grid.ownerLockable;

        return {
            width: me.headerWidth,
            lockable: false,
            autoLock: true,
            sortable: false,
            resizable: false,
            draggable: false,
            hideable: false,
            menuDisabled: true,
            tdCls: Ext.baseCSSPrefix + 'grid-cell-special',
            innerCls: Ext.baseCSSPrefix + 'grid-cell-inner-row-expander',
            renderer: function() {
                return '<div class="' + Ext.baseCSSPrefix + 'grid-row-expander" role="presentation"></div>';
            },
            processEvent: function(type, view, cell, rowIndex, cellIndex, e, record) {
                if (e.getTarget('.' + Ext.baseCSSPrefix + 'grid-row-expander')) {
                    if (type === "click") {
                        me.toggleRow(rowIndex, record);
                        return me.selectRowOnExpand;
                    }
                }
            },

            // This column always migrates to the locked side if the locked side is visible.
            // It has to report this correctly so that editors can position things correctly
            isLocked: function() {
                return lockable.lockedGrid.isVisible() || this.locked;
            },

            // In an editor, this shows nothing.
            editRenderer: function() {
                return '&#160;';
            }
        };
    }
});
