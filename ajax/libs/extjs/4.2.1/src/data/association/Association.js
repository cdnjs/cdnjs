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
 * Associations enable you to express relationships between different {@link Ext.data.Model Models}. Let's say we're
 * writing an ecommerce system where Users can make Orders - there's a relationship between these Models that we can
 * express like this:
 *
 *     Ext.define('User', {
 *         extend: 'Ext.data.Model',
 *         fields: ['id', 'name', 'email'],
 *
 *         hasMany: {model: 'Order', name: 'orders'}
 *     });
 *
 *     Ext.define('Order', {
 *         extend: 'Ext.data.Model',
 *         fields: ['id', 'user_id', 'status', 'price'],
 *
 *         belongsTo: 'User'
 *     });
 *
 * We've set up two models - User and Order - and told them about each other. You can set up as many associations on
 * each Model as you need using the two default types - {@link Ext.data.HasManyAssociation hasMany} and {@link
 * Ext.data.BelongsToAssociation belongsTo}. There's much more detail on the usage of each of those inside their
 * documentation pages. If you're not familiar with Models already, {@link Ext.data.Model there is plenty on those too}.
 *
 * **Further Reading**
 *
 *   - {@link Ext.data.association.HasMany hasMany associations}
 *   - {@link Ext.data.association.BelongsTo belongsTo associations}
 *   - {@link Ext.data.association.HasOne hasOne associations}
 *   - {@link Ext.data.Model using Models}
 *
 * # Self association models
 *
 * We can also have models that create parent/child associations between the same type. Below is an example, where
 * groups can be nested inside other groups:
 *
 *     // Server Data
 *     {
 *         "groups": {
 *             "id": 10,
 *             "parent_id": 100,
 *             "name": "Main Group",
 *             "parent_group": {
 *                 "id": 100,
 *                 "parent_id": null,
 *                 "name": "Parent Group"
 *             },
 *             "nested" : {
 *                 "child_groups": [{
 *                     "id": 2,
 *                     "parent_id": 10,
 *                     "name": "Child Group 1"
 *                 },{
 *                     "id": 3,
 *                     "parent_id": 10,
 *                     "name": "Child Group 2"
 *                 },{
 *                     "id": 4,
 *                     "parent_id": 10,
 *                     "name": "Child Group 3"
 *                 }]
 *             }
 *         }
 *     }
 *
 *     // Client code
 *     Ext.define('Group', {
 *         extend: 'Ext.data.Model',
 *         fields: ['id', 'parent_id', 'name'],
 *         proxy: {
 *             type: 'ajax',
 *             url: 'data.json',
 *             reader: {
 *                 type: 'json',
 *                 root: 'groups'
 *             }
 *         },
 *         associations: [{
 *             type: 'hasMany',
 *             model: 'Group',
 *             primaryKey: 'id',
 *             foreignKey: 'parent_id',
 *             autoLoad: true,
 *             associationKey: 'nested.child_groups' // read child data from nested.child_groups
 *         }, {
 *             type: 'belongsTo',
 *             model: 'Group',
 *             primaryKey: 'id',
 *             foreignKey: 'parent_id',
 *             associationKey: 'parent_group' // read parent data from parent_group
 *         }]
 *     });
 *
 *     Ext.onReady(function(){
 *
 *         Group.load(10, {
 *             success: function(group){
 *                 console.log(group.getGroup().get('name'));
 *
 *                 group.groups().each(function(rec){
 *                     console.log(rec.get('name'));
 *                 });
 *             }
 *         });
 *
 *     });
 *
 */
Ext.define('Ext.data.association.Association', {
    alternateClassName: 'Ext.data.Association',
    /**
     * @cfg {String} ownerModel
     * The string name of the model that owns the association.
     *
     * **NB!** This config is required when instantiating the Association directly.
     * However, it cannot be used at all when defining the association as a config
     * object inside Model, because the name of the model itself will be supplied
     * automatically as the value of this config.
     */

    /**
     * @cfg {String} associatedModel
     * The string name of the model that is being associated with.
     *
     * **NB!** This config is required when instantiating the Association directly.
     * When defining the association as a config object inside Model, the #model
     * configuration will shadow this config.
     */

    /**
     * @cfg {String} model
     * The string name of the model that is being associated with.
     *
     * This config option is to be used when defining the association as a config
     * object within Model.  The value is then mapped to #associatedModel when
     * Association is instantiated inside Model.
     */

    /**
     * @cfg {String} primaryKey
     * The name of the primary key on the associated model. In general this will be the
     * {@link Ext.data.Model#idProperty} of the Model.
     */
    primaryKey: 'id',

    /**
     * @cfg {Ext.data.reader.Reader} reader
     * A special reader to read associated data
     */
    
    /**
     * @cfg {String} associationKey
     * The name of the property in the data to read the association from. Defaults to the name of the associated model.
     */

    associationKeyFunction : null,

    defaultReaderType: 'json',

    isAssociation: true,

    initialConfig: null,

    statics: {
        AUTO_ID: 1000,
        
        create: function(association){
            if (Ext.isString(association)) {
                association = {
                    type: association
                };
            }

            switch (association.type) {
                case 'belongsTo':
                    return new Ext.data.association.BelongsTo(association);
                case 'hasMany':
                    return new Ext.data.association.HasMany(association);
                case 'hasOne':
                    return new Ext.data.association.HasOne(association);
                //TODO Add this back when it's fixed
//                    case 'polymorphic':
//                        return Ext.create('Ext.data.PolymorphicAssociation', association);
                default:
                    //<debug>
                    Ext.Error.raise('Unknown Association type: "' + association.type + '"');
                    //</debug>
            }
            return association;
        }
    },

    /**
     * Creates the Association object.
     * @param {Object} [config] Config object.
     */
    constructor: function(config) {
        Ext.apply(this, config);

        var me              = this,
            types           = Ext.ModelManager.types,
            ownerName       = config.ownerModel,
            associatedName  = config.associatedModel,
            ownerModel      = types[ownerName],
            associatedModel = types[associatedName],
            associationKey  = config.associationKey,
            keyReIdx;

        if (associationKey) {
            keyReIdx = String(associationKey).search(/[\[\.]/);

            if (keyReIdx >= 0) {
                me.associationKeyFunction = Ext.functionFactory('obj', 'return obj' + (keyReIdx > 0 ? '.' : '') + associationKey);
            }
        }

        me.initialConfig = config;

        //<debug>
        if (ownerModel === undefined) {
            Ext.Error.raise("The configured ownerModel was not valid (you tried " + ownerName + ")");
        }
        if (associatedModel === undefined) {
            Ext.Error.raise("The configured associatedModel was not valid (you tried " + associatedName + ")");
        }
        //</debug>

        me.ownerModel = ownerModel;
        me.associatedModel = associatedModel;

        /**
         * @property {String} ownerName
         * The name of the model that 'owns' the association
         */

        /**
         * @property {String} associatedName
         * The name of the model is on the other end of the association (e.g. if a User model hasMany Orders, this is
         * 'Order')
         */

        Ext.applyIf(me, {
            ownerName : ownerName,
            associatedName: associatedName
        });
        
        me.associationId = 'association' + (++me.statics().AUTO_ID);
    },

    /**
     * Get a specialized reader for reading associated data
     * @return {Ext.data.reader.Reader} The reader, null if not supplied
     */
    getReader: function(){
        var me = this,
            reader = me.reader,
            model = me.associatedModel;

        if (reader) {
            if (Ext.isString(reader)) {
                reader = {
                    type: reader
                };
            }
            if (reader.isReader) {
                reader.setModel(model);
            } else {
                Ext.applyIf(reader, {
                    model: model,
                    type : me.defaultReaderType
                });
            }
            me.reader = Ext.createByAlias('reader.' + reader.type, reader);
        }
        return me.reader || null;
    }
});
