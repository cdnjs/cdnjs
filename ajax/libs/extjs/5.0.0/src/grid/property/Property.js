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