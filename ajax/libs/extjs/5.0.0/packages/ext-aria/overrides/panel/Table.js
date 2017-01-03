Ext.define('Ext.aria.panel.Table', {
    override: 'Ext.panel.Table',
    
    requires: [
        'Ext.aria.panel.Panel'
    ],

    initComponent: function() {
        var me = this,
            headerCt, selModel;
        
        me.callParent(arguments);

        headerCt = me.headerCt;
        headerCt.selectedCellCls = me.view.selectedCellCls;

        // intercept header's onKeyDown to transfer the focus to the view
        headerCt.onKeyDown = Ext.Function.createInterceptor(headerCt.onKeyDown, me.transferSelectionToView, me);

        // intercept view's onKeyUp to transfer the focus to the header
        selModel = me.getSelectionModel();
        selModel.onKeyUp = Ext.Function.createInterceptor(selModel.onKeyUp, me.transferSelectionToHeader, me);
    },

    transferSelectionToHeader: function(e, t) {
        var me = this,
            view = me.view,
            selModel = me.selModel,
            isCellModel = selModel.isCellModel,
            viewSelection;
        
        viewSelection = selModel.getCurrentPosition();

        if (viewSelection && view.indexOf(selModel.lastFocused) === 0 && !me.hideHeaders) {
            view.headerFocused = true;
            
            if (isCellModel) {
                selModel.setCurrentPosition(null);
            }
            else {
                selModel.deselectAll();
            }
            
            me.headerCt.selectByPosition({
                row: -1,
                column: isCellModel ? viewSelection.column : 0,
                cHeader: viewSelection.columnHeader
            });
            
            // return false so that selModel.onKeyUp that is intercepted will not run
            return false;
        }
        
        return true;
    },

    transferSelectionToView: function() {
        var me = this,
            view = me.view,
            headerCt = me.headerCt,
            selModel = me.selModel,
            isCellModel = selModel.isCellModel,
            headerSelection;
        
        headerSelection = me.headerCt.getCurrentPosition();

        if (headerSelection) {
            if (view.getNodes().length > 0) {
                headerCt.setCurrentPosition(null);
                
                view.headerFocused = false;
                view.focus();
                
                me.selModel.selectByPosition({
                    row: 0,
                    column: isCellModel ? headerSelection.column : 0
                });
                
                // return false so that header.onKeyDown that is intercepted will not run
                return false;
            }
        }
        
        return true;
    },

    ariaGetFocusItems: function() {
        var me = this,
            headerCt = me.headerCt,
            list, index;
        
        list = me.callParent(arguments);

        if (headerCt && !headerCt.hasFocus) {
            index = Ext.Array.indexOf(list, me.headerCt);
            
            if (index > -1) {
                list.splice(index, 1);
            }
        }
        
        return list;
    }
});
