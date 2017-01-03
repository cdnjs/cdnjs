Ext.define('Ext.aria.ux.form.MultiSelect', {
    override: 'Ext.ux.form.MultiSelect',
    
    requires: [
        'Ext.view.BoundListKeyNav'
    ],
    
    /**
     * @cfg {Number} [pageSize=10] The number of items to advance on pageUp and pageDown
     */
    pageSize: 10,
    
    afterRender: function() {
        var me = this,
            boundList = me.boundList;
        
        me.callParent();
        
        if (boundList) {
            boundList.pageSize = me.pageSize;
            
            me.keyNav = new Ext.view.BoundListKeyNav(boundList.el, {
                boundList: boundList,
                
                // The View takes care of these
                up: Ext.emptyFn,
                down: Ext.emptyFn,
                
                pageUp: function() {
                    var me = this,
                        boundList = me.boundList,
                        store = boundList.getStore(),
                        selModel = boundList.getSelectionModel(),
                        pageSize = boundList.pageSize,
                        selection, oldItemIdx, newItemIdx;
                    
                    selection = selModel.getSelection()[0];
                    
                    oldItemIdx = selection ? store.indexOf(selection) : -1;
                    newItemIdx = oldItemIdx < 0 ? 0 : oldItemIdx - pageSize;
                    
                    selModel.select(newItemIdx < 0 ? 0 : newItemIdx);
                },
                
                pageDown: function() {
                    var me = this,
                        boundList = me.boundList,
                        pageSize = boundList.pageSize,
                        store = boundList.store,
                        selModel = boundList.getSelectionModel(),
                        selection, oldItemIdx, newItemIdx, lastIdx;
                    
                    selection = selModel.getSelection()[0];
                    
                    lastIdx    = store.getCount() - 1;
                    oldItemIdx = selection ? store.indexOf(selection) : -1;
                    newItemIdx = oldItemIdx < 0 ? pageSize : oldItemIdx + pageSize;
                    
                    selModel.select(newItemIdx > lastIdx ? lastIdx : newItemIdx);
                },
                
                home: function() {
                    this.boundList.getSelectionModel().select(0);
                },
                
                end: function() {
                    var boundList = this.boundList;
                    
                    boundList.getSelectionModel().select(boundList.store.getCount() - 1);
                }
            });
        }
    },
    
    destroy: function() {
        var me = this,
            keyNav = me.keyNav;
        
        if (keyNav) {
            keyNav.destroy();
        }
        
        me.callParent();
    }
});
