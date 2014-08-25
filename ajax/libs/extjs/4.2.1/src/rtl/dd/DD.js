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
Ext.define('Ext.rtl.dd.DD', {
    override: 'Ext.dd.DD',

    // used be alignElWithMouse to get the local x coordinate adjusted for rtl mode if
    // the page-level coordinate system is rtl.
    getLocalX: function(el) {
        return Ext.rootHierarchyState.rtl ? el.rtlGetLocalX() : el.getLocalX();
    },

    // setLocalXY is used by alignElWithMouse to avoid the overhead that would be incurred
    // by using setXY to calculate left/right/top styles from page coordinates.  Since the
    // coordinates that go into the calculation are page-level, we need to use rtl local
    // coordinates if the page-level coordinate system is rtl.
    setLocalXY: function(el, x, y) {
        Ext.rootHierarchyState.rtl ? el.rtlSetLocalXY(x, y) : el.setLocalXY(x, y);
    }
});