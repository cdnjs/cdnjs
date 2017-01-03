/**
 * @private
 */
Ext.define('Ext.grid.header.DragZone', {
    extend: 'Ext.dd.DragZone',
    colHeaderSelector: '.' + Ext.baseCSSPrefix + 'column-header',
    colInnerSelector: '.' + Ext.baseCSSPrefix + 'column-header-inner',
    maxProxyWidth: 120,

    constructor: function(headerCt) {
        var me = this;
        
        me.headerCt = headerCt;
        me.ddGroup =  me.getDDGroup();
        me.autoGroup = true;
        me.callParent([headerCt.el]);
        me.proxy.el.addCls(Ext.baseCSSPrefix + 'grid-col-dd');
    },
    
    getDDGroup: function() {
        return 'header-dd-zone-' + this.headerCt.up('[scrollerOwner]').id;
    },

    getDragData: function(e) {
        if (e.getTarget(this.colInnerSelector)) {
            var header = e.getTarget(this.colHeaderSelector),
                headerCmp,
                ddel;

            if (header) {
                headerCmp = Ext.getCmp(header.id);
                if (!this.headerCt.dragging && headerCmp.draggable && !(headerCmp.isOnLeftEdge(e) || headerCmp.isOnRightEdge(e))) {
                    ddel = document.createElement('div');
                    ddel.role = 'presentation';
                    ddel.innerHTML = headerCmp.text;
                    return {
                        ddel: ddel,
                        header: headerCmp
                    };
                }
            }
        }
        return false;
    },

    onBeforeDrag: function() {
        return !(this.headerCt.dragging || this.disabled);
    },

    onInitDrag: function() {
        this.headerCt.dragging = true;
        this.headerCt.hideMenu();
        this.callParent(arguments);
    },

    onDragDrop: function() {
        this.headerCt.dragging = false;
        this.callParent(arguments);
    },

    afterRepair: function() {
        this.callParent();
        this.headerCt.dragging = false;
    },

    getRepairXY: function() {
        return this.dragData.header.el.getXY();
    },
    
    disable: function() {
        this.disabled = true;
    },
    
    enable: function() {
        this.disabled = false;
    }
});
