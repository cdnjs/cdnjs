Ext.define('Ext.theme.neptune.Component', {
    override: 'Ext.Component',
    initComponent: function() {
        this.callParent();
        if (this.dock && this.border === undefined) {
            this.border = false;
        }
    },
    privates: {
        initStyles: function() {
            var me = this,
                hasOwnBorder = me.hasOwnProperty('border'),
                border = me.border;
            if (me.dock) {
                // prevent the superclass method from setting the border style.  We want to
                // allow dock layout to decide which borders to suppress.
                me.border = null;
            }
            me.callParent(arguments);
            if (hasOwnBorder) {
                me.border = border;
            } else {
                delete me.border;
            }
        }
    }
}, function() {
    Ext.namespace('Ext.theme.is').Neptune = true;
    Ext.theme.name = 'Neptune';
});

Ext.define('Ext.theme.triton.Component', {
    override: 'Ext.Component'
}, function() {
    Ext.namespace('Ext.theme.is').Triton = true;
    Ext.theme.name = 'Triton';
});

Ext.define('Ext.theme.triton.list.TreeItem', {
    override: 'Ext.list.TreeItem',
    compatibility: Ext.isIE8,
    updateFloated: function(floated, wasFloated) {
        this.callParent([
            floated,
            wasFloated
        ]);
        this.toolElement.syncRepaint();
    }
});

Ext.define('Ext.theme.neptune.resizer.Splitter', {
    override: 'Ext.resizer.Splitter',
    size: 8
});

Ext.define('Ext.theme.triton.resizer.Splitter', {
    override: 'Ext.resizer.Splitter',
    size: 10
});

Ext.define('Ext.theme.neptune.toolbar.Toolbar', {
    override: 'Ext.toolbar.Toolbar',
    usePlainButtons: false,
    border: false
});

Ext.define('Ext.theme.neptune.layout.component.Dock', {
    override: 'Ext.layout.component.Dock',
    /**
     * This table contains the border removal classes indexed by the sum of the edges to
     * remove. Each edge is assigned a value:
     * 
     *  * `left` = 1
     *  * `bottom` = 2
     *  * `right` = 4
     *  * `top` = 8
     * 
     * @private
     */
    noBorderClassTable: [
        0,
        // TRBL
        Ext.baseCSSPrefix + 'noborder-l',
        // 0001 = 1
        Ext.baseCSSPrefix + 'noborder-b',
        // 0010 = 2
        Ext.baseCSSPrefix + 'noborder-bl',
        // 0011 = 3
        Ext.baseCSSPrefix + 'noborder-r',
        // 0100 = 4
        Ext.baseCSSPrefix + 'noborder-rl',
        // 0101 = 5
        Ext.baseCSSPrefix + 'noborder-rb',
        // 0110 = 6
        Ext.baseCSSPrefix + 'noborder-rbl',
        // 0111 = 7
        Ext.baseCSSPrefix + 'noborder-t',
        // 1000 = 8
        Ext.baseCSSPrefix + 'noborder-tl',
        // 1001 = 9
        Ext.baseCSSPrefix + 'noborder-tb',
        // 1010 = 10
        Ext.baseCSSPrefix + 'noborder-tbl',
        // 1011 = 11
        Ext.baseCSSPrefix + 'noborder-tr',
        // 1100 = 12
        Ext.baseCSSPrefix + 'noborder-trl',
        // 1101 = 13
        Ext.baseCSSPrefix + 'noborder-trb',
        // 1110 = 14
        Ext.baseCSSPrefix + 'noborder-trbl'
    ],
    // 1111 = 15
    /**
     * The numeric values assigned to each edge indexed by the `dock` config value.
     * @private
     */
    edgeMasks: {
        top: 8,
        right: 4,
        bottom: 2,
        left: 1
    },
    handleItemBorders: function() {
        var me = this,
            edges = 0,
            maskT = 8,
            maskR = 4,
            maskB = 2,
            maskL = 1,
            owner = me.owner,
            bodyBorder = owner.bodyBorder,
            ownerBorder = owner.border,
            collapsed = me.collapsed,
            edgeMasks = me.edgeMasks,
            noBorderCls = me.noBorderClassTable,
            dockedItemsGen = owner.dockedItems.generation,
            b, borderCls, docked, edgesTouched, i, ln, item, dock, lastValue, mask, addCls, removeCls;
        if (me.initializedBorders === dockedItemsGen) {
            return;
        }
        addCls = [];
        removeCls = [];
        borderCls = me.getBorderCollapseTable();
        noBorderCls = me.getBorderClassTable ? me.getBorderClassTable() : noBorderCls;
        me.initializedBorders = dockedItemsGen;
        // Borders have to be calculated using expanded docked item collection.
        me.collapsed = false;
        docked = me.getDockedItems('visual');
        me.collapsed = collapsed;
        for (i = 0 , ln = docked.length; i < ln; i++) {
            item = docked[i];
            if (item.ignoreBorderManagement) {
                // headers in framed panels ignore border management, so we do not want
                // to set "satisfied" on the edge in question
                
                continue;
            }
            dock = item.dock;
            mask = edgesTouched = 0;
            addCls.length = 0;
            removeCls.length = 0;
            if (dock !== 'bottom') {
                if (edges & maskT) {
                    // if (not touching the top edge)
                    b = item.border;
                } else {
                    b = ownerBorder;
                    if (b !== false) {
                        edgesTouched += maskT;
                    }
                }
                if (b === false) {
                    mask += maskT;
                }
            }
            if (dock !== 'left') {
                if (edges & maskR) {
                    // if (not touching the right edge)
                    b = item.border;
                } else {
                    b = ownerBorder;
                    if (b !== false) {
                        edgesTouched += maskR;
                    }
                }
                if (b === false) {
                    mask += maskR;
                }
            }
            if (dock !== 'top') {
                if (edges & maskB) {
                    // if (not touching the bottom edge)
                    b = item.border;
                } else {
                    b = ownerBorder;
                    if (b !== false) {
                        edgesTouched += maskB;
                    }
                }
                if (b === false) {
                    mask += maskB;
                }
            }
            if (dock !== 'right') {
                if (edges & maskL) {
                    // if (not touching the left edge)
                    b = item.border;
                } else {
                    b = ownerBorder;
                    if (b !== false) {
                        edgesTouched += maskL;
                    }
                }
                if (b === false) {
                    mask += maskL;
                }
            }
            if ((lastValue = item.lastBorderMask) !== mask) {
                item.lastBorderMask = mask;
                if (lastValue) {
                    removeCls[0] = noBorderCls[lastValue];
                }
                if (mask) {
                    addCls[0] = noBorderCls[mask];
                }
            }
            if ((lastValue = item.lastBorderCollapse) !== edgesTouched) {
                item.lastBorderCollapse = edgesTouched;
                if (lastValue) {
                    removeCls[removeCls.length] = borderCls[lastValue];
                }
                if (edgesTouched) {
                    addCls[addCls.length] = borderCls[edgesTouched];
                }
            }
            if (removeCls.length) {
                item.removeCls(removeCls);
            }
            if (addCls.length) {
                item.addCls(addCls);
            }
            // mask can use += but edges must use |= because there can be multiple items
            // on an edge but the mask is reset per item
            edges |= edgeMasks[dock];
        }
        // = T, R, B or L (8, 4, 2 or 1)
        mask = edgesTouched = 0;
        addCls.length = 0;
        removeCls.length = 0;
        if (edges & maskT) {
            // if (not touching the top edge)
            b = bodyBorder;
        } else {
            b = ownerBorder;
            if (b !== false) {
                edgesTouched += maskT;
            }
        }
        if (b === false) {
            mask += maskT;
        }
        if (edges & maskR) {
            // if (not touching the right edge)
            b = bodyBorder;
        } else {
            b = ownerBorder;
            if (b !== false) {
                edgesTouched += maskR;
            }
        }
        if (b === false) {
            mask += maskR;
        }
        if (edges & maskB) {
            // if (not touching the bottom edge)
            b = bodyBorder;
        } else {
            b = ownerBorder;
            if (b !== false) {
                edgesTouched += maskB;
            }
        }
        if (b === false) {
            mask += maskB;
        }
        if (edges & maskL) {
            // if (not touching the left edge)
            b = bodyBorder;
        } else {
            b = ownerBorder;
            if (b !== false) {
                edgesTouched += maskL;
            }
        }
        if (b === false) {
            mask += maskL;
        }
        if ((lastValue = me.lastBodyBorderMask) !== mask) {
            me.lastBodyBorderMask = mask;
            if (lastValue) {
                removeCls[0] = noBorderCls[lastValue];
            }
            if (mask) {
                addCls[0] = noBorderCls[mask];
            }
        }
        if ((lastValue = me.lastBodyBorderCollapse) !== edgesTouched) {
            me.lastBodyBorderCollapse = edgesTouched;
            if (lastValue) {
                removeCls[removeCls.length] = borderCls[lastValue];
            }
            if (edgesTouched) {
                addCls[addCls.length] = borderCls[edgesTouched];
            }
        }
        if (removeCls.length) {
            owner.removeBodyCls(removeCls);
        }
        if (addCls.length) {
            owner.addBodyCls(addCls);
        }
    },
    onRemove: function(item) {
        var me = this,
            lastBorderMask = item.lastBorderMask,
            lastBorderCollapse = item.lastBorderCollapse;
        if (!item.destroyed && !item.ignoreBorderManagement) {
            if (lastBorderMask) {
                item.lastBorderMask = 0;
                item.removeCls(me.noBorderClassTable[lastBorderMask]);
            }
            if (lastBorderCollapse) {
                item.lastBorderCollapse = 0;
                item.removeCls(me.getBorderCollapseTable()[lastBorderCollapse]);
            }
        }
        me.callParent([
            item
        ]);
    }
});

Ext.define('Ext.theme.neptune.panel.Panel', {
    override: 'Ext.panel.Panel',
    border: false,
    bodyBorder: false,
    initBorderProps: Ext.emptyFn,
    initBodyBorder: function() {
        // The superclass method converts a truthy bodyBorder into a number and sets
        // an inline border-width style on the body element.  This prevents that from
        // happening if borderBody === true so that the body will get its border-width
        // the stylesheet.
        if (this.bodyBorder !== true) {
            this.callParent();
        }
    }
});

Ext.define('Ext.theme.neptune.container.ButtonGroup', {
    override: 'Ext.container.ButtonGroup',
    usePlainButtons: false
});

Ext.define('Ext.theme.triton.form.field.Checkbox', {
    override: 'Ext.form.field.Checkbox',
    compatibility: Ext.isIE8,
    initComponent: function() {
        this.callParent();
        Ext.on({
            show: 'onGlobalShow',
            scope: this
        });
    },
    onFocus: function(e) {
        var focusClsEl;
        this.callParent([
            e
        ]);
        focusClsEl = this.getFocusClsEl();
        if (focusClsEl) {
            focusClsEl.syncRepaint();
        }
    },
    onBlur: function(e) {
        var focusClsEl;
        this.callParent([
            e
        ]);
        focusClsEl = this.getFocusClsEl();
        if (focusClsEl) {
            focusClsEl.syncRepaint();
        }
    },
    onGlobalShow: function(cmp) {
        if (cmp.isAncestor(this)) {
            this.getFocusClsEl().syncRepaint();
        }
    }
});

Ext.define('Ext.theme.neptune.toolbar.Paging', {
    override: 'Ext.toolbar.Paging',
    defaultButtonUI: 'plain-toolbar',
    inputItemWidth: 40
});

Ext.define('Ext.theme.triton.toolbar.Paging', {
    override: 'Ext.toolbar.Paging',
    inputItemWidth: 50
});

Ext.define('Ext.theme.neptune.picker.Month', {
    override: 'Ext.picker.Month',
    // Monthpicker contains logic that reduces the margins of the month items if it detects
    // that the text has wrapped.  This can happen in the classic theme  in certain
    // locales such as zh_TW.  In order to work around this, Month picker measures
    // the month items to see if the height is greater than "measureMaxHeight".
    // In neptune the height of the items is larger, so we must increase this value.
    // While the actual height of the month items in neptune is 24px, we will only 
    // determine that the text has wrapped if the height of the item exceeds 36px.
    // this allows theme developers some leeway to increase the month item size in
    // a neptune-derived theme.
    measureMaxHeight: 36
});

Ext.define('Ext.theme.triton.picker.Month', {
    override: 'Ext.picker.Month',
    footerButtonUI: 'default-toolbar',
    calculateMonthMargin: Ext.emptyFn
});

Ext.define('Ext.theme.triton.picker.Date', {
    override: 'Ext.picker.Date',
    footerButtonUI: 'default-toolbar'
});

Ext.define('Ext.theme.neptune.form.field.HtmlEditor', {
    override: 'Ext.form.field.HtmlEditor',
    defaultButtonUI: 'plain-toolbar'
});

Ext.define('Ext.theme.neptune.panel.Table', {
    override: 'Ext.panel.Table',
    lockableBodyBorder: true,
    initComponent: function() {
        var me = this;
        me.callParent();
        if (!me.hasOwnProperty('bodyBorder') && !me.hideHeaders && (me.lockableBodyBorder || !me.lockable)) {
            me.bodyBorder = true;
        }
    }
});

Ext.define('Ext.theme.neptune.grid.RowEditor', {
    override: 'Ext.grid.RowEditor',
    buttonUI: 'default-toolbar'
});

Ext.define('Ext.theme.triton.grid.column.Column', {
    override: 'Ext.grid.column.Column',
    compatibility: Ext.isIE8,
    onTitleMouseOver: function() {
        var triggerEl = this.triggerEl;
        this.callParent(arguments);
        if (triggerEl) {
            triggerEl.syncRepaint();
        }
    }
});

Ext.define('Ext.theme.neptune.grid.column.RowNumberer', {
    override: 'Ext.grid.column.RowNumberer',
    width: 25
});

Ext.define('Ext.theme.triton.grid.column.RowNumberer', {
    override: 'Ext.grid.column.RowNumberer',
    width: 32
});

Ext.define('Ext.theme.triton.menu.Item', {
    override: 'Ext.menu.Item',
    compatibility: Ext.isIE8,
    onFocus: function(e) {
        this.callParent([
            e
        ]);
        this.repaintIcons();
    },
    onFocusLeave: function(e) {
        this.callParent([
            e
        ]);
        this.repaintIcons();
    },
    privates: {
        repaintIcons: function() {
            var iconEl = this.iconEl,
                arrowEl = this.arrowEl,
                checkEl = this.checkEl;
            if (iconEl) {
                iconEl.syncRepaint();
            }
            if (arrowEl) {
                arrowEl.syncRepaint();
            }
            if (checkEl) {
                checkEl.syncRepaint();
            }
        }
    }
});

Ext.define('Ext.theme.neptune.menu.Separator', {
    override: 'Ext.menu.Separator',
    border: true
});

Ext.define('Ext.theme.neptune.menu.Menu', {
    override: 'Ext.menu.Menu',
    showSeparator: false
});

Ext.define('Ext.theme.triton.menu.Menu', {
    override: 'Ext.menu.Menu',
    compatibility: Ext.isIE8,
    afterShow: function() {
        var me = this,
            items, item, i, len;
        me.callParent(arguments);
        items = me.items.getRange();
        for (i = 0 , len = items.length; i < len; i++) {
            item = items[i];
            // Just in case if it happens to be a non-menu Item 
            if (item && item.repaintIcons) {
                item.repaintIcons();
            }
        }
    }
});

Ext.define('Ext.theme.triton.grid.plugin.RowExpander', {
    override: 'Ext.grid.plugin.RowExpander',
    headerWidth: 32
});

Ext.define('Ext.theme.triton.grid.selection.SpreadsheetModel', {
    override: 'Ext.grid.selection.SpreadsheetModel',
    checkboxHeaderWidth: 32
});

Ext.define('Ext.theme.triton.selection.CheckboxModel', {
    override: 'Ext.selection.CheckboxModel',
    headerWidth: 32
});

