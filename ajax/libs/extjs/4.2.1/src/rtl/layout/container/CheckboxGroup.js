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
Ext.define('Ext.rtl.layout.container.CheckboxGroup', {
    override: 'Ext.layout.container.CheckboxGroup',
    
    finishedLayout: function(){
        var owner = this.owner;
        
        // In some cases in IE the groups get visually positioned
        // in the wrong spot, though via the inspector they are in
        // the correct place, so we need to kick off a repaint here.
        if ((Ext.isIE6 || Ext.isIE7 || Ext.isIEQuirks) && owner.getHierarchyState().rtl) {
            this.innerCt.select('.' + owner.groupCls).repaint();
        }
    }
})
