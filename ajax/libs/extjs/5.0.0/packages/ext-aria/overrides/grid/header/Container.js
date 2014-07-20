/*
 * ARIA requires the following for header cells:
 * A) They should be labeled as 'columnheader', be contained in a container with role 'row'
 *    and then a container with role 'grid'
 * B) Navigation between them via LEFT and RIGHT arrow keys
 * C) Navigation between header cells and grid view cells/rows via DOWN and UP arrow keys
 * 
 * To implement B) we add a key navigation mechanism to the header container similar to the view
 * The implementation of C) is the job of the grid panel which is aware of both the header container
 * and the gridview and can route the key navigation from one to the other
 */
Ext.define('Ext.aria.grid.header.Container', {
    override: 'Ext.grid.header.Container',
    
    requires: [
        'Ext.aria.container.Container'
    ],
    
    ariaSkipContainerTitleCheck: true,

    // The top level container is an aria section
    ariaIsSection: function() {
        return this.isRootHeader;
    },

    initComponent: function() {
        var me = this;

        me.callParent(arguments);

        // Ext.grid.header.Container is used to implement the header cells as well as the parent
        // that contains all the headers cells
        // We want to assign the role grid only to the container, not to the individual cells
        if (me.isRootHeader) {
            me.ariaRole = 'rowgroup';
            // This container should receive focus
            me.focusableContainer = true;
            // listen to key press events in order to move focus among column headers
            me.initKeyNav(me);
        }
    },

    ariaGetRenderAttributes: function() {
        var me = this,
            attrs;
        
        attrs = me.callParent();
        
        attrs['aria-readonly'] = true;

        return attrs;
    },
    
    ariaGetAfterRenderAttributes: function() {
        var me = this,
            attrs;
        
        attrs = me.callParent();

        delete attrs['aria-label'];
        
        return attrs;
    },
    
    initKeyNav: function(view) {
        var me = this;

        if (!view.rendered) {
            view.on('render', Ext.Function.bind(me.initKeyNav, me, [view], 0), me, { single: true });
            
            return;
        }

        // view.el has tabIndex -1 to allow for
        // keyboard events to be passed to it.
        view.el.set({
            tabIndex: -1
        });

        me.keyNav = new Ext.util.KeyNav(view.el, {
            ignoreInputFields: true,
            right: me.onKeyRight,
            left: me.onKeyLeft,
            down: me.onKeyDown,
            up: me.onKeyUp,
            enter: me.activateMenu,
            space: me.onSpace,
            scope:me
        });

        me.curSelection = null;
    },

    onKeyLeft: function(e, t) {
        this.moveFocus('left', e);
        
        return false;
    },

    onKeyRight: function(e, t) {
        this.moveFocus('right', e);
        
        return false;
    },

    onKeyDown: function(e, t) {
        return false;
    },

    onKeyUp: function(e, t) {
        return false;
    },
    
    onSpace: function(e, t) {
        var header = this.getCurrentPosition().cHeader;
        
        if (header) {
            header.toggleSortState();
            this.onHeaderClick(header, e, t);
        }
    },

    activateMenu: function(e, t) {
        var me = this,
            menu = me.menu,
            header = me.getCurrentPosition().cHeader;

        if (header) {
            me.onHeaderTriggerClick(header, e, header.el);
            
            if (menu && menu.isVisible()) {
                menu.setActiveItem(menu.child(':focusable'));
            }
        }
    },

    getFirstColumn: function() {
        var visibleColumns = Ext.ComponentQuery.query(':not([hidden])', this.getGridColumns());
        
        if (visibleColumns.length > 0) {
            return visibleColumns[0];
        }
        
        return null;
    },

    getLastColumn: function() {
        var visibleColumns = Ext.ComponentQuery.query(':not([hidden])', this.getGridColumns()),
            length = visibleColumns.length;
        
        if (length > 0) {
            return visibleColumns[length - 1];
        }
        
        return null;
    },

    moveFocus: function(dir, e) {
        var me = this,
            pos = me.getCurrentPosition(),
            newPos = {};

        if (pos) {
            if (dir === 'left') {
                newPos.cHeader = pos.cHeader.prev(':not([hidden])');
                
                if (!newPos.cHeader) {
                    newPos.cHeader = me.preventWrap ? pos.cHeader : me.getLastColumn();
                }
            }
            else if (dir === 'right') {
                newPos.cHeader = pos.cHeader.next(':not([hidden])');
                
                if (!newPos.cHeader) {
                    newPos.cHeader = me.preventWrap ? pos.cHeader : me.getFirstColumn();
                }
            }
            
            if (newPos.cHeader) {
                newPos.column = me.getHeaderIndex(newPos.cHeader);
                newPos.row = -1;
                
                return me.setCurrentPosition(newPos);
            }
        }
        
        return null;
    },

    getCurrentPosition: function() {
        return this.curSelection;
    },

    setCurrentPosition: function(pos) {
        var me = this,
            last = me.curSelection;

        if (last) {
            // If the position is the same, do nothing
            if (pos && pos.cHeader === last.cHeader) {
                pos = null;
            }
            else {
                me.onHeaderDeselect(last);
                me.curSelection = null;
            }
        }

        if (pos) {
            me.curSelection = pos;
            
            if (!pos.cHeader) {
                pos.cHeader = me.getVisibleHeaderClosestToIndex(pos.column);
            }
            
            me.onHeaderSelect(pos);
        }
    },

    selectByPosition: function(position) {
        this.setCurrentPosition(position);
    },

    isHeaderSelected: function(column) {
        var me = this;
        
        if (typeof column === "number") {
            return me.curSelection && (me.curSelection.column === column);
        }
        else {
            return me.curSelection && (me.curSelection.cHeader === column);
        }
    },

    onHeaderSelect: function(position) {
        var me = this,
            view = me.view,
            cHeader = position.cHeader;
        
        me.ariaUpdate({
            'aria-activedescendant': cHeader.el.id
        });
        
        cHeader.ariaUpdate({ 'aria-selected': true });
        cHeader.addCls(me.selectedCellCls);
        cHeader.addCls(me.ariaItemFocusCls);
        cHeader.getTargetEl().scrollIntoView(view.el, true);
        
        me.el.focus();
    },

    onHeaderDeselect: function(position) {
        var me = this,
            cHeader = position.cHeader;
        
        me.ariaUpdate({
            'aria-activedescendant': undefined
        });
        
        cHeader.ariaUpdate({ 'aria-selected': undefined });
        cHeader.removeCls(me.selectedCellCls);
        cHeader.removeCls(me.ariaItemFocusCls);
    },

    onFocus: function() {
        var me = this;
        
        me.callParent(arguments);
        
        if (!me.isHeader) {
            me.ariaStepIn();
        }
    },

    onBlur: function() {
        var me = this,
            last = me.curSelection;

        // If moving out, and NOT into the header menu, deselect
        if (last && !(me.menu && me.menu.isVisible())) {
            me.onHeaderDeselect(last);
        }
        
        me.callParent(arguments);
    },

    ariaStepIn: function() {
        var me = this,
            headerSelection;
        
        headerSelection = me.getCurrentPosition();

        if (!headerSelection) {
            me.selectByPosition({ row: -1, column: 0 });
        }
        else {
            me.onHeaderSelect(headerSelection);
        }
    },

    // ARIA treats the grid view and the grid header as one entity
    // In ExtJS the two are separate focus elements and will show separate focus frames
    // To avoid this we return the grid as the focus frame for both
    getFocusFrameEl: function() {
        var me = this,
            grid;
        
        grid = this.up('grid');
        
        if (grid) {
            return grid.el;
        }
        
        return me.getFocusEl();
    },

    // ARIA treats the header and the view as one entity, therefore
    // tab key detected on either one should move focus out of the grid to the next node.
    // We observe this rule only if the header and the view are adjacent
    ariaNextNode: function() {
        var me = this,
            sibling;
        
        sibling = me.callParent(arguments);

        if (me.isRootHeader && sibling.xtype === 'gridview') {
            return sibling.ariaNextNode();
        }
        else {
            return sibling;
        }
    }
});
