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
Ext.define('Ext.rtl.tab.Bar', {
    override: 'Ext.tab.Bar',
    adjustTabPositions: function() {
        var items = this.items.items,
            i = items.length,
            tab;

        if (!this.getHierarchyState().rtl) {
            return this.callParent();
        }

        // When tabs are rotated vertically we don't have a reliable way to position
        // them using CSS in modern browsers.  This is because of the way transform-orign
        // works - it requires the width to be known, and the width is not known in css.
        // Consequently we have to make an adjustment to the tab's position in these browsers.
        // This is similar to what we do in Ext.panel.Header#adjustTitlePosition
        if (!Ext.isIE9m) {
            if (this.dock === 'left') {
                // rotated 90 degrees around using the top left corner as the axis.
                // tabs need to be shifted to the right by their height
                while (i--) {
                    tab = items[i];
                    tab.el.setStyle('right', -tab.lastBox.height + 'px');
                }
            } else if (this.dock === 'right') {
                // rotated 270 degrees around using the top right corner as the axis.
                // tabs need to be shifted to the left by their width
                while (i--) {
                    tab = items[i];
                    tab.el.setStyle('right', tab.lastBox.width + 'px');
                }
            }
        }
    }
})


