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
Ext.define('Ext.data.BufferStore', {
    extend: 'Ext.data.Store',
    alias: 'store.buffer',
    sortOnLoad: false,
    filterOnLoad: false,
    
    constructor: function() {
        Ext.Error.raise('The BufferStore class has been deprecated. Instead, specify the buffered config option on Ext.data.Store');
    }
});