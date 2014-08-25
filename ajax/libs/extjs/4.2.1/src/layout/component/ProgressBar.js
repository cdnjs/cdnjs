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
 * @private
 */
Ext.define('Ext.layout.component.ProgressBar', {

    /* Begin Definitions */

    alias: ['layout.progressbar'],

    extend: 'Ext.layout.component.Auto',

    /* End Definitions */

    type: 'progressbar',

    beginLayout: function (ownerContext) {
        var me = this,
            i, textEls;

        me.callParent(arguments);

        if (!ownerContext.textEls) {
            textEls = me.owner.textEl; // an Ext.Element or CompositeList (raw DOM el's)

            if (textEls.isComposite) {
                ownerContext.textEls = [];
                textEls = textEls.elements;
                for (i = textEls.length; i--; ) {
                    ownerContext.textEls[i] = ownerContext.getEl(Ext.get(textEls[i]));
                }
            } else {
                ownerContext.textEls = [ ownerContext.getEl('textEl') ];
            }
        }
    },

    calculate: function(ownerContext) {
        var me = this,
            i, textEls, width;

        me.callParent(arguments);

        if (Ext.isNumber(width = ownerContext.getProp('width'))) {
            width -= ownerContext.getBorderInfo().width;
            textEls = ownerContext.textEls;

            for (i = textEls.length; i--; ) {
                textEls[i].setWidth(width);
            }
        } else {
            me.done = false;
        }
    }
});
