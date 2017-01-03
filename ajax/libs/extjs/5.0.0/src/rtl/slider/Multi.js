Ext.define('Ext.rtl.slider.Multi', {
    override: 'Ext.slider.Multi',
    
    initComponent: function(){
        if (this.getInherited().rtl) {
            this.horizontalProp = 'right';
        }    
        this.callParent();
    },
    
    onDragStart: function(){
        this.callParent(arguments);
        // Cache the width so we don't recalculate it during the drag
        this._rtlInnerWidth = this.innerEl.getWidth();
    },
    
    onDragEnd: function(){
        this.callParent(arguments);
        delete this._rtlInnerWidth;
    },
    
    transformTrackPoints: function(pos){
        var left, innerWidth;
        
        if (this.isOppositeRootDirection()) {
            left = pos.left;
            delete pos.left;
            
            innerWidth = typeof this._rtlInnerWidth !== 'undefined' ? this._rtlInnerWidth : this.innerEl.getWidth();
            pos.right = innerWidth - left;
            
            return pos;
        } else {
            return this.callParent(arguments);
        }
    },
    
    getSubTplData : function() {
        var me = this,
            data = me.callParent(),
            rtlCls = me._rtlCls;
        
        if (rtlCls && me.getInherited().rtl) {
            data.childElCls = ' ' + rtlCls;
        }

        return data;
    }
});
