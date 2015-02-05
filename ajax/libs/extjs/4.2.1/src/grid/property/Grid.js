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
 * A specialized grid implementation intended to mimic the traditional property grid as typically seen in
 * development IDEs.  Each row in the grid represents a property of some object, and the data is stored
 * as a set of name/value pairs in {@link Ext.grid.property.Property Properties}. By default, the editors
 * shown are inferred from the data in the cell. More control over this can be specified by using the 
 * {@link #sourceConfig} option. Example usage:
 *
 *     @example
 *     Ext.create('Ext.grid.property.Grid', {
 *         title: 'Properties Grid',
 *         width: 300,
 *         renderTo: Ext.getBody(),
 *         source: {
 *             "(name)": "My Object",
 *             "Created": Ext.Date.parse('10/15/2006', 'm/d/Y'),
 *             "Available": false,
 *             "Version": 0.01,
 *             "Description": "A test object"
 *         }
 *     });
 */
Ext.define('Ext.grid.property.Grid', {

    extend: 'Ext.grid.Panel',

    alias: 'widget.propertygrid',

    alternateClassName: 'Ext.grid.PropertyGrid',

    uses: [
       'Ext.grid.plugin.CellEditing',
       'Ext.grid.property.Store',
       'Ext.grid.property.HeaderContainer',
       'Ext.XTemplate',
       'Ext.grid.CellEditor',
       'Ext.form.field.Date',
       'Ext.form.field.Text',
       'Ext.form.field.Number',
       'Ext.form.field.ComboBox'
    ],
    
    /**
     * @cfg {Object} sourceConfig
     * This option allows various configurations to be set for each field in the property grid.
     * None of these configurations are required
     * 
     * ####displayName
     * A custom name to appear as label for this field. If specified, the display name will be shown 
     * in the name column instead of the property name. Example usage:
     * 
     *     new Ext.grid.property.Grid({
     *         source: {
     *             clientIsAvailable: true
     *         },
     *         sourceConfig: {
     *             clientIsAvailable: {
     *                 // Custom name different to the field
     *                 displayName: 'Available'
     *             }
     *         }
     *     });
     * 
     * ####renderer
     * A function used to transform the underlying value before it is displayed in the grid.
     * By default, the grid supports strongly-typed rendering of strings, dates, numbers and booleans using built-in form editors, 
     * but any custom type can be supported and associated with the type of the value. Example usage:
     * 
     *     new Ext.grid.property.Grid({
     *         source: {
     *             clientIsAvailable: true
     *         },
     *         sourceConfig: {
     *             clientIsAvailable: {
     *                 // Custom renderer to change the color based on the value
     *                 renderer: function(v){
     *                     var color = v ? 'green' : 'red';
     *                     return '<span style="color: ' + color + ';">' + v + '</span>';
     *                 }
     *             }
     *         }
     *     });
     * 
     * ####type
     * Used to explicitly specify the editor type for a particular value. By default, the type is 
     * automatically inferred from the value. See {@link #inferTypes}. Accepted values are:
     * 
     * - 'date'
     * - 'boolean'
     * - 'number'
     * - 'string'
     * 
     * For more advanced control an editor configuration can be passed (see the next section).
     * Example usage:
     * 
     *     new Ext.grid.property.Grid({
     *         source: {
     *             attending: null
     *         },
     *         sourceConfig: {
     *             attending: {
     *                 // Force the type to be a numberfield, a null value would otherwise default to a textfield
     *                 type: 'number'
     *             }
     *         }
     *     });
     * 
     * ####editor
     * Allows the grid to support additional types of editable fields.  By default, the grid supports strongly-typed editing
     * of strings, dates, numbers and booleans using built-in form editors, but any custom type can be supported and
     * associated with a custom input control by specifying a custom editor. Example usage
     * 
     *     new Ext.grid.property.Grid({
     *         // Data object containing properties to edit
     *         source: {
     *             evtStart: '10:00 AM'
     *         },
     * 
     *         sourceConfig: {
     *             evtStart: {
     *                 editor: Ext.create('Ext.form.field.Time', {selectOnFocus: true}),
     *                 displayName: 'Start Time'
     *             }
     *         }
     *     });
     */

   /**
    * @cfg {Object} propertyNames
    * An object containing custom property name/display name pairs.
    * If specified, the display name will be shown in the name column instead of the property name.
    * @deprecated See {@link #sourceConfig} displayName
    */

    /**
     * @cfg {Object} source
     * A data object to use as the data source of the grid (see {@link #setSource} for details).
     */

    /**
     * @cfg {Object} customEditors
     * An object containing name/value pairs of custom editor type definitions that allow
     * the grid to support additional types of editable fields.  By default, the grid supports strongly-typed editing
     * of strings, dates, numbers and booleans using built-in form editors, but any custom type can be supported and
     * associated with a custom input control by specifying a custom editor.  The name of the editor
     * type should correspond with the name of the property that will use the editor.  Example usage:
     *
     *     var grid = new Ext.grid.property.Grid({
     *
     *         // Custom editors for certain property names
     *         customEditors: {
     *             evtStart: Ext.create('Ext.form.TimeField', {selectOnFocus: true})
     *         },
     *
     *         // Displayed name for property names in the source
     *         propertyNames: {
     *             evtStart: 'Start Time'
     *         },
     *
     *         // Data object containing properties to edit
     *         source: {
     *             evtStart: '10:00 AM'
     *         }
     *     });
     * @deprecated See {@link #sourceConfig} editor
     */

    /**
     * @cfg {Object} customRenderers
     * An object containing name/value pairs of custom renderer type definitions that allow
     * the grid to support custom rendering of fields.  By default, the grid supports strongly-typed rendering
     * of strings, dates, numbers and booleans using built-in form editors, but any custom type can be supported and
     * associated with the type of the value.  The name of the renderer type should correspond with the name of the property
     * that it will render.  Example usage:
     *
     *     var grid = Ext.create('Ext.grid.property.Grid', {
     *         customRenderers: {
     *             Available: function(v){
     *                 if (v) {
     *                     return '<span style="color: green;">Yes</span>';
     *                 } else {
     *                     return '<span style="color: red;">No</span>';
     *                 }
     *             }
     *         },
     *         source: {
     *             Available: true
     *         }
     *     });
     * @deprecated See {@link #sourceConfig} renderer
     */

    /**
     * @cfg {String} valueField
     * The name of the field from the property store to use as the value field name.
     * This may be useful if you do not configure the property Grid from an object, but use your own store configuration.
     */
    valueField: 'value',

    /**
     * @cfg {String} nameField
     * The name of the field from the property store to use as the property field name.
     * This may be useful if you do not configure the property Grid from an object, but use your own store configuration.
     */
    nameField: 'name',
    
    /**
     * @cfg {Boolean} inferTypes
     * True to automatically infer the {@link #sourceConfig type} based on the initial value passed
     * for each field. This ensures the editor remains the correct type even if the value is blanked
     * and becomes empty.
     */
    inferTypes: true,

    /**
     * @cfg {Number/String} [nameColumnWidth=115]
     * Specify the width for the name column. The value column will take any remaining space.
     */

    // private config overrides
    enableColumnMove: false,
    columnLines: true,
    stripeRows: false,
    trackMouseOver: false,
    clicksToEdit: 1,
    enableHdMenu: false,
    
    gridCls: Ext.baseCSSPrefix + 'property-grid',

    // private
    initComponent : function(){
        var me = this;

        me.source = me.source || {};
        me.addCls(me.gridCls);
        me.plugins = me.plugins || [];

        // Enable cell editing. Inject a custom startEdit which always edits column 1 regardless of which column was clicked.
        me.plugins.push(new Ext.grid.plugin.CellEditing({
            clicksToEdit: me.clicksToEdit,

            // Inject a startEdit which always edits the value column
            startEdit: function(record, column) {
                // Maintainer: Do not change this 'this' to 'me'! It is the CellEditing object's own scope.
                return this.self.prototype.startEdit.call(this, record, me.headerCt.child('#' + me.valueField));
            }
        }));

        me.selModel = {
            selType: 'cellmodel',
            onCellSelect: function(position) {
                if (position.column != 1) {
                    position.column = 1;
                }
                return this.self.prototype.onCellSelect.call(this, position);
            }
        };
        
        me.sourceConfig = Ext.apply({}, me.sourceConfig);  

        // Create a property.Store from the source object unless configured with a store
        if (!me.store) {
            me.propStore = me.store = new Ext.grid.property.Store(me, me.source);
        }
        me.configure(me.sourceConfig);

        if (me.sortableColumns) {
            me.store.sort('name', 'ASC');
        }
        me.columns = new Ext.grid.property.HeaderContainer(me, me.store);

        me.addEvents(
            /**
             * @event beforepropertychange
             * Fires before a property value changes.  Handlers can return false to cancel the property change
             * (this will internally call {@link Ext.data.Model#reject} on the property's record).
             * @param {Object} source The source data object for the grid (corresponds to the same object passed in
             * as the {@link #source} config property).
             * @param {String} recordId The record's id in the data store
             * @param {Object} value The current edited property value
             * @param {Object} oldValue The original property value prior to editing
             */
            'beforepropertychange',
            /**
             * @event propertychange
             * Fires after a property value has changed.
             * @param {Object} source The source data object for the grid (corresponds to the same object passed in
             * as the {@link #source} config property).
             * @param {String} recordId The record's id in the data store
             * @param {Object} value The current edited property value
             * @param {Object} oldValue The original property value prior to editing
             */
            'propertychange'
        );
        me.callParent();

        // Inject a custom implementation of walkCells which only goes up or down
        me.getView().walkCells = this.walkCells;

        // Set up our default editor set for the 4 atomic data types
        me.editors = {
            'date'    : new Ext.grid.CellEditor({ field: new Ext.form.field.Date({selectOnFocus: true})}),
            'string'  : new Ext.grid.CellEditor({ field: new Ext.form.field.Text({selectOnFocus: true})}),
            'number'  : new Ext.grid.CellEditor({ field: new Ext.form.field.Number({selectOnFocus: true})}),
            'boolean' : new Ext.grid.CellEditor({ field: new Ext.form.field.ComboBox({
                editable: false,
                store: [[ true, me.headerCt.trueText ], [false, me.headerCt.falseText ]]
            })})
        };

        // Track changes to the data so we can fire our events.
        me.store.on('update', me.onUpdate, me);
    },
    
    configure: function(config){
        var me = this,
            store = me.store,
            i = 0,
            len = me.store.getCount(),
            nameField = me.nameField,
            valueField = me.valueField,
            name, value, rec, type;
        
        me.configureLegacy(config);  
        
        if (me.inferTypes) {
            for (; i < len; ++i) {
                rec = store.getAt(i);
                name = rec.get(nameField);
                if (!me.getConfig(name, 'type')) {
                    value = rec.get(valueField);
                    if (Ext.isDate(value)) {
                        type = 'date';
                    } else if (Ext.isNumber(value)) {
                        type = 'number';
                    } else if (Ext.isBoolean(value)) {
                        type = 'boolean';
                    } else {
                        type = 'string';
                    }
                    me.setConfig(name, 'type', type);
                }
            }
        }
    },
    
    getConfig: function(fieldName, key, defaultValue) {
        var config = this.sourceConfig[fieldName],
            out;
            
        if (config) {
            out = config[key];
        }    
        return out || defaultValue;
    },
    
    setConfig: function(fieldName, key, value) {
        var sourceCfg = this.sourceConfig,
            o = sourceCfg[fieldName];
            
        if (!o) {
            o = sourceCfg[fieldName] = {
                __copied: true
            };
        } else if (!o.__copied) {
            o = Ext.apply({
                __copied: true
            }, o);
            sourceCfg[fieldName] = o;
        }
        o[key] = value;
        return value;
    },
    
    // to be deprecated in 4.2
    configureLegacy: function(config){
        var me = this,
            o, key, value;
            
        me.copyLegacyObject(config, me.customRenderers, 'renderer');
        me.copyLegacyObject(config, me.customEditors, 'editor');
        me.copyLegacyObject(config, me.propertyNames, 'displayName');
        
        //<debug>
        // exclude types since it's new
        if (me.customRenderers || me.customEditors || me.propertyNames) {
            if (Ext.global.console && Ext.global.console.warn) {
                Ext.global.console.warn(this.$className, 'customRenderers, customEditors & propertyNames have been consolidated into a new config, see "sourceConfig". These configurations will be deprecated.');
            }
        }
        //</debug>
    },
    
    copyLegacyObject: function(config, o, keyName){
        var key, value;
        
        for (key in o) {
            if (o.hasOwnProperty(key)) {
                if (!config[key]) {
                    config[key] = {};
                }
                config[key][keyName] = o[key];
            }    
        }
    },

    // @private
    onUpdate : function(store, record, operation) {
        var me = this,
            v, oldValue;

        if (me.rendered && operation == Ext.data.Model.EDIT) {
            v = record.get(me.valueField);
            oldValue = record.modified.value;
            if (me.fireEvent('beforepropertychange', me.source, record.getId(), v, oldValue) !== false) {
                if (me.source) {
                    me.source[record.getId()] = v;
                }
                record.commit();
                me.fireEvent('propertychange', me.source, record.getId(), v, oldValue);
            } else {
                record.reject();
            }
        }
    },

    // Custom implementation of walkCells which only goes up and down.
    walkCells: function(pos, direction, e, preventWrap, verifierFn, scope) {
        if (direction == 'left') {
            direction = 'up';
        } else if (direction == 'right') {
            direction = 'down';
        }
        pos = Ext.view.Table.prototype.walkCells.call(this, pos, direction, e, preventWrap, verifierFn, scope);
        if (pos && !pos.column) {
            pos.column = 1;
        }
        return pos;
    },

    // @private
    // Returns the correct editor type for the property type, or a custom one keyed by the property name
    getCellEditor : function(record, column) {
        var me = this,
            propName = record.get(me.nameField),
            val = record.get(me.valueField),
            editor = me.getConfig(propName, 'editor'),
            type = me.getConfig(propName, 'type'),
            editors = me.editors;

        // A custom editor was found. If not already wrapped with a CellEditor, wrap it, and stash it back
        // If it's not even a Field, just a config object, instantiate it before wrapping it.
        if (editor) {
            if (!(editor instanceof Ext.grid.CellEditor)) {
                if (!(editor instanceof Ext.form.field.Base)) {
                    editor = Ext.ComponentManager.create(editor, 'textfield');
                }
                editor = me.setConfig(propName, 'editor', new Ext.grid.CellEditor({ field: editor }));
            }
        } else if (type) {
            switch (type) {
                case 'date':
                    editor = editors.date;
                    break;
                case 'number':
                    editor = editors.number;
                    break;
                case 'boolean':
                    editor = me.editors['boolean'];
                    break;
                default:
                    editor = editors.string;
            }
        } else if (Ext.isDate(val)) {
            editor = editors.date;
        } else if (Ext.isNumber(val)) {
            editor = editors.number;
        } else if (Ext.isBoolean(val)) {
            editor = editors['boolean'];
        } else {
            editor = editors.string;
        }

        // Give the editor a unique ID because the CellEditing plugin caches them
        editor.editorId = propName;
        return editor;
    },

    beforeDestroy: function() {
        var me = this;
        me.callParent();
        me.destroyEditors(me.editors);
        me.destroyEditors(me.customEditors);
        delete me.source;
    },

    destroyEditors: function (editors) {
        for (var ed in editors) {
            if (editors.hasOwnProperty(ed)) {
                Ext.destroy(editors[ed]);
            }
        }
    },

    /**
     * Sets the source data object containing the property data.  The data object can contain one or more name/value
     * pairs representing all of the properties of an object to display in the grid, and this data will automatically
     * be loaded into the grid's {@link #store}.  The values should be supplied in the proper data type if needed,
     * otherwise string type will be assumed.  If the grid already contains data, this method will replace any
     * existing data.  See also the {@link #source} config value.  Example usage:
     *
     *     grid.setSource({
     *         "(name)": "My Object",
     *         "Created": Ext.Date.parse('10/15/2006', 'm/d/Y'),  // date type
     *         "Available": false,  // boolean type
     *         "Version": .01,      // decimal type
     *         "Description": "A test object"
     *     });
     *
     * @param {Object} source The data object.
     * @param {Object} [sourceConfig] A new {@link #sourceConfig object}. If this argument is not passed
     * the current configuration will be re-used. To reset the config, pass `null` or an empty object literal.
     */
    setSource: function(source, sourceConfig) {
        var me = this;
        
        me.source = source;
        if (sourceConfig !== undefined) {
            me.sourceConfig = Ext.apply({}, sourceConfig);  
            me.configure(me.sourceConfig);
        }
        me.propStore.setSource(source);
    },

    /**
     * Gets the source data object containing the property data.  See {@link #setSource} for details regarding the
     * format of the data object.
     * @return {Object} The data object.
     */
    getSource: function() {
        return this.propStore.getSource();
    },

    /**
     * Sets the value of a property.
     * @param {String} prop The name of the property to set.
     * @param {Object} value The value to test.
     * @param {Boolean} [create=false] `true` to create the property if it doesn't already exist.
     */
    setProperty: function(prop, value, create) {
        this.propStore.setValue(prop, value, create);
    },

    /**
     * Removes a property from the grid.
     * @param {String} prop The name of the property to remove.
     */
    removeProperty: function(prop) {
        this.propStore.remove(prop);
    }

    /**
     * @cfg {Object} store
     * @private
     */
    /**
     * @cfg {Object} columns
     * @private
     */
});
