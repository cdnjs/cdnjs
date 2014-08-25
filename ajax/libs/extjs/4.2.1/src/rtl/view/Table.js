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
Ext.define('Ext.rtl.view.Table', {
    override: 'Ext.view.Table',

    rtlCellTpl: [
        '<td class="' + Ext.baseCSSPrefix + 'rtl {tdCls}" {tdAttr}>',
            '<div {unselectableAttr} class="' + Ext.baseCSSPrefix + 'rtl ' + Ext.baseCSSPrefix + 'grid-cell-inner {innerCls}"',
                ' style="text-align:{[this.getAlign(values.align)]};<tpl if="style">{style}</tpl>">{value}</div>',
        '</td>',
        {
            priority: 0,
            rtlAlign: {
                right: 'left',
                left: 'right',
                center: 'center'
            },
            getAlign: function(align) {
                return this.rtlAlign[align];
            }
        }
    ],

    beforeRender: function() {
        var me = this;

        me.callParent();
        if (me.getHierarchyState().rtl) {
            me.addCellTpl(me.getTpl('rtlCellTpl'));
        }
    },

    getCellPaddingAfter: function(cell) {
        return Ext.fly(cell).getPadding(this.getHierarchyState().rtl ? 'l' : 'r');
    }
});