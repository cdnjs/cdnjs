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
/**
 * @override Ext.rtl.layout.ContextItem
 * This override adds RTL support to Ext.layout.ContextItem.
 */
Ext.define('Ext.rtl.layout.ContextItem', {
    override: 'Ext.layout.ContextItem',

    addPositionStyles: function(styles, props) {
        var x = props.x,
            y = props.y,
            count = 0;

        if (x !== undefined) {
            styles[this.parent.target.getHierarchyState().rtl ? 'right' : 'left'] = x + 'px';
            ++count;
        }
        if (y !== undefined) {
            styles.top = y + 'px';
            ++count;
        }
        return count;
    }

});