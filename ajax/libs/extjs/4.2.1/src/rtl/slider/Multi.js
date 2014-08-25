/*
This file is part of Ext JS 4.2

Copyright (c) 2011-2013 Sencha Inc

Contact:  http://www.sencha.com/contact

GNU General Public License Usage
This file may be used under the terms of the GNU General Public License version 3.0 as
published by the Free Software Foundation and appearing in the file LICENSE included in the
packaging of this file.

Please review the following information to ensure the GNU General Public License version 3.0
requirements will be met: http://www.gnu.org/copyleft/gpl.html.

If you are unsure which license is appropriate for your use, please contact the sales department
at http://www.sencha.com/contact.

Build date: 2013-05-16 14:36:50 (f9be68accb407158ba2b1be2c226a6ce1f649314)
*/
Ext.define('Ext.rtl.slider.Multi', {
    override: 'Ext.slider.Multi',
    
    initComponent: function(){
        if (this.getHierarchyState().rtl) {
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
        
        if (rtlCls && me.getHierarchyState().rtl) {
            data.childElCls = ' ' + rtlCls;
        }

        return data;
    }
});