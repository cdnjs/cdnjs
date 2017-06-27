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
 * A specific {@link Ext.data.Model} type that represents a name/value pair and is made to work with the
 * {@link Ext.grid.property.Grid}. Typically, Properties do not need to be created directly as they can be
 * created implicitly by simply using the appropriate data configs either via the
 * {@link Ext.grid.property.Grid#source} config property or by calling {@link Ext.grid.property.Grid#setSource}.
 * However, if the need arises, these records can also be created explicitly as shown below. Example usage:
 *
 *     var rec = new Ext.grid.property.Property({
 *         name: 'birthday',
 *         value: Ext.Date.parse('17/06/1962', 'd/m/Y')
 *     });
 *     // Add record to an already populated grid
 *     grid.store.addSorted(rec);
 *
 * @constructor
 * Creates new property.
 * @param {Object} config A data object in the format:
 * @param {String/String[]} config.name A name or names for the property.
 * @param {Mixed/Mixed[]} config.value A value or values for the property.
 * The specified value's type will be read automatically by the grid to determine the type of editor to use when
 * displaying it.
 * @return {Object}
 */
Ext.define('Ext.grid.property.Property', {
    extend: 'Ext.data.Model',

    alternateClassName: 'Ext.PropGridProperty',

    fields: [{
        name: 'name',
        type: 'string'
    }, {
        name: 'value'
    }],
    idProperty: 'name'
});