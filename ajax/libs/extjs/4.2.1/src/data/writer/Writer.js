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
 * @author Ed Spencer
 *
 * Base Writer class used by most subclasses of {@link Ext.data.proxy.Server}. This class is responsible for taking a
 * set of {@link Ext.data.Operation} objects and a {@link Ext.data.Request} object and modifying that request based on
 * the Operations.
 *
 * For example a Ext.data.writer.Json would format the Operations and their {@link Ext.data.Model} instances based on
 * the config options passed to the JsonWriter's constructor.
 *
 * Writers are not needed for any kind of local storage - whether via a {@link Ext.data.proxy.WebStorage Web Storage
 * proxy} (see {@link Ext.data.proxy.LocalStorage localStorage} and {@link Ext.data.proxy.SessionStorage
 * sessionStorage}) or just in memory via a {@link Ext.data.proxy.Memory MemoryProxy}.
 * 
 * # Dates
 * Before sending dates to the server, they can be formatted using one of the {@link Ext.Date} formats.
 * These formats can be specified both on the field and the writer itself. In terms of precedence, from highest to lowest:
 * 
 * -  {@link #dateFormat Writer.dateFormat} The writer dateFormat will always have the highest precedence
 * -  {@link Ext.data.Field#dateWriteFormat} The dateWriteFormat will be used if no format is specified on the writer
 * -  {@link Ext.data.Field#dateFormat Field.dateFormat}/{@link Ext.data.Field#dateReadFormat Field.dateReadFormat} 
 * Finally, if none of the above options are specified the field will be formatted using the format that was used to read the date from the server.
 */
Ext.define('Ext.data.writer.Writer', {
    alias: 'writer.base',
    alternateClassName: ['Ext.data.DataWriter', 'Ext.data.Writer'],

    /**
     * @cfg {Boolean} writeAllFields
     * True to write all fields from the record to the server. If set to false it will only send the fields that were
     * modified. Note that any fields that have {@link Ext.data.Field#persist} set to false will still be ignored.
     */
    writeAllFields: true,

    /**
     * @cfg {String} dateFormat
     * This is used for each field of type date in the model to format the value before
     * it is sent to the server.
     */

    /**
     * @cfg {String} nameProperty
     * This property is used to read the key for each value that will be sent to the server. For example:
     *
     *     Ext.define('Person', {
     *         extend: 'Ext.data.Model',
     *         fields: [{
     *             name: 'first',
     *             mapping: 'firstName'
     *         }, {
     *             name: 'last',
     *             mapping: 'lastName'
     *         }, {
     *             name: 'age'
     *         }]
     *     });
     *     new Ext.data.writer.Writer({
     *         writeAllFields: true,
     *         nameProperty: 'mapping'
     *     });
     *
     *     // This will be sent to the server
     *     {
     *         firstName: 'first name value',
     *         lastName: 'last name value',
     *         age: 1
     *     }
     *
     * If the value is not present, the field name will always be used.
     */
    nameProperty: 'name',

    /**
     * @cfg {Boolean} [writeRecordId]
     * By default, each record's id is always included in the output for non-phantom records since in most
     * cases the id will be required on the server to process the record action. This is helpful since the id
     * will normally not be modified, and so would not be sent to the server unless {@link #writeAllFields}
     * was explicitly enabled.
     * 
     * However, there are cases where it is not desirable for the record id to be passed in the data directly.
     * For example, when using a RESTful API the record id would typically be appended to the url instead.
     */
    writeRecordId: true,

    /*
     * @property {Boolean} isWriter
     * `true` in this class to identify an object as an instantiated Writer, or subclass thereof.
     */
    isWriter: true,

    /**
     * Creates new Writer.
     * @param {Object} [config] Config object.
     */
    constructor: function(config) {
        Ext.apply(this, config);
    },

    /**
     * Prepares a Proxy's Ext.data.Request object
     * @param {Ext.data.Request} request The request object
     * @return {Ext.data.Request} The modified request object
     */
    write: function(request) {
        var operation = request.operation,
            records   = operation.records || [],
            len       = records.length,
            i         = 0,
            data      = [];

        for (; i < len; i++) {
            data.push(this.getRecordData(records[i], operation));
        }
        return this.writeRecords(request, data);
    },

    /**
     * Formats the data for each record before sending it to the server. This
     * method should be overridden to format the data in a way that differs from the default.
     * @param {Ext.data.Model} record The record that we are writing to the server.
     * @param {Ext.data.Operation} [operation] An operation object.
     * @return {Object} An object literal of name/value keys to be written to the server.
     * By default this method returns the data property on the record.
     */
    getRecordData: function(record, operation) {
        var isPhantom = record.phantom === true,
            writeAll = this.writeAllFields || isPhantom,
            fields = record.fields,
            fieldItems = fields.items,
            data = {},
            clientIdProperty = record.clientIdProperty,
            changes,
            field,
            key,
            mappedIdProperty,
            f, fLen;

        if (writeAll) {
            fLen = fieldItems.length;

            for (f = 0; f < fLen; f++) {
                field = fieldItems[f];
                if (field.persist) {
                    this.writeValue(data, field, record);
                }
            }
        } else {
            // Only write the changes
            changes = record.getChanges();
            for (key in changes) {
                if (changes.hasOwnProperty(key)) {
                    field = fields.get(key);
                    if (field.persist) {
                        this.writeValue(data, field, record);
                    }
                }
            }
        }
        if (isPhantom) {
            if (clientIdProperty && operation && operation.records.length > 1) {
                // include clientId for phantom records, if multiple records are being written to the server in one operation.
                // The server can then return the clientId with each record so the operation can match the server records with the client records
                data[clientIdProperty] = record.internalId;
            }
        } else if (this.writeRecordId) {
            // Make sure that if a mapping is in place the mapped id name is used instead of the default field name. 
            mappedIdProperty = fields.get(record.idProperty)[this.nameProperty] || record.idProperty;
            data[mappedIdProperty] = record.getId();
        }

        return data;
    },

    writeValue: function(data, field, record){
        var name = field[this.nameProperty],
            dateFormat = this.dateFormat || field.dateWriteFormat || field.dateFormat,
            value = record.get(field.name);

        // Allow the nameProperty to yield a numeric value which may be zero.
        // For example, using a field's numeric mapping to write an array for output.
        if (name == null) {
            name = field.name;
        }

        if (field.serialize) {
            data[name] = field.serialize(value, record);
        } else if (field.type === Ext.data.Types.DATE && dateFormat && Ext.isDate(value)) {
            data[name] = Ext.Date.format(value, dateFormat);
        } else {
            data[name] = value;
        }
    }
});
