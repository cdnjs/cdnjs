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
Ext.define('Ext.rtl.panel.Header', {
    override: 'Ext.panel.Header',

    rtlPositions: {
        top: 'top',
        right: 'left',
        bottom: 'bottom',
        left: 'right'
    },

    adjustTitlePosition: function() {
        var titleCmp = this.titleCmp,
            titleEl, width;

        if (!Ext.isIE9m && titleCmp) { // some Headers don't have a titleCmp, e.g. TabBar
            // in browsers that use css3 transform to rotate text we have to
            // adjust the element's position after rotating.  See comment in overridden
            // method for details.
            titleEl = titleCmp.el;
            width = titleEl.getWidth();
            if (this.isParentRtl()) {
                // in rtl mode we rotate 270 instead of 90 degrees with a transform
                // origin of the top right corner so moving the element right by the
                // same number of pixels as its width results in the correct positioning.
                titleEl.setStyle('right', width + 'px');
            } else if (!Ext.isIE9m) {
                titleEl.setStyle('left', width + 'px');
            }
        }
    },

    onTitleRender: function() {
        if (this.orientation === 'vertical') {
            this.titleCmp.el.setVertical(this.isParentRtl() ? 270 : 90);
        }
    },

    getDockName: function() {
        var me = this,
            dock = me.dock;
            
        return me.isParentRtl() ? me.rtlPositions[dock] : dock
    }
});