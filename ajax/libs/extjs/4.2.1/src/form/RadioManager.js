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
 * Private utility class for managing all {@link Ext.form.field.Radio} fields grouped by name.
 */
Ext.define('Ext.form.RadioManager', {
    extend: 'Ext.util.MixedCollection',
    singleton: true,

    getByName: function(name, formId) {
        return this.filterBy(function(item) {
            return item.name == name && item.getFormId() == formId;
        });
    },

    getWithValue: function(name, value, formId) {
        return this.filterBy(function(item) {
            return item.name == name && item.inputValue == value && item.getFormId() == formId;
        });
    },

    getChecked: function(name, formId) {
        return this.findBy(function(item) {
            return item.name == name && item.checked && item.getFormId() == formId;
        });
    }
});
