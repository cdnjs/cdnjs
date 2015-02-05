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
 * WebStorageProxy is simply a superclass for the {@link Ext.data.proxy.LocalStorage LocalStorage} and {@link
 * Ext.data.proxy.SessionStorage SessionStorage} proxies. It uses the new HTML5 key/value client-side storage objects to
 * save {@link Ext.data.Model model instances} for offline use.
 * @private
 */
Ext.define('Ext.data.proxy.WebStorage', {
    extend: 'Ext.data.proxy.Client',
    alternateClassName: 'Ext.data.WebStorageProxy',
    requires: [
        'Ext.data.SequentialIdGenerator'
    ],

    /**
     * @cfg {String} id
     * The unique ID used as the key in which all record data are stored in the local storage object.
     */
    id: undefined,

    /**
     * @cfg {Object} reader
     * Not used by web storage proxy.
     * @hide
     */

    /**
     * @cfg {Object} writer
     * Not used by web storage proxy.
     * @hide
     */

    /**
     * Creates the proxy, throws an error if local storage is not supported in the current browser.
     * @param {Object} config (optional) Config object.
     */
    constructor: function(config) {
        this.callParent(arguments);

        /**
         * @property {Object} cache
         * Cached map of records already retrieved by this Proxy. Ensures that the same instance is always retrieved.
         */
        this.cache = {};

        //<debug>
        if (this.getStorageObject() === undefined) {
            Ext.Error.raise("Local Storage is not supported in this browser, please use another type of data proxy");
        }
        //</debug>

        //if an id is not given, try to use the store's id instead
        this.id = this.id || (this.store ? this.store.storeId : undefined);

        //<debug>
        if (this.id === undefined) {
            Ext.Error.raise("No unique id was provided to the local storage proxy. See Ext.data.proxy.LocalStorage documentation for details");
        }
        //</debug>

        this.initialize();
    },

    //inherit docs
    create: function(operation, callback, scope) {
        var me = this,
            records = operation.records,
            length = records.length,
            ids = me.getIds(),
            id, record, i;

        operation.setStarted();

        if(me.isHierarchical === undefined) {
            // if the storage object does not yet contain any data, this is the first point at which we can determine whether or not this proxy deals with hierarchical data.
            // it cannot be determined during initialization because the Model is not decorated with NodeInterface until it is used in a TreeStore
            me.isHierarchical = !!records[0].isNode;
            if(me.isHierarchical) {
                me.getStorageObject().setItem(me.getTreeKey(), true);
            }
        }

        for (i = 0; i < length; i++) {
            record = records[i];

            if (record.phantom) {
                record.phantom = false;
                id = me.getNextId();
            } else {
                id = record.getId();
            }

            me.setRecord(record, id);
            record.commit();
            ids.push(id);
        }

        me.setIds(ids);

        operation.setCompleted();
        operation.setSuccessful();

        if (typeof callback == 'function') {
            callback.call(scope || me, operation);
        }
    },

    //inherit docs
    read: function(operation, callback, scope) {
        //TODO: respect sorters, filters, start and limit options on the Operation

        var me = this,
            records = [],
            i = 0,
            success = true,
            Model = me.model,
            ids, length, record, data, id;

        operation.setStarted();

        if(me.isHierarchical) {
            records = me.getTreeData();
        } else {
            ids = me.getIds();
            length = ids.length;
            id = operation.id;
            //read a single record
            if (id) {
                data = me.getRecord(id);
                if (data !== null) {
                    record = new Model(data, id, data);
                }

                if (record) {
                    records.push(record);
                } else {
                    success = false;
                }
            } else {
                for (; i < length; i++) {
                    id = ids[i];
                    data = me.getRecord(id);
                    records.push(new Model(data, id, data));
                }
            }

        }

        if(success) {
            operation.setSuccessful();
        }
        operation.setCompleted();

        operation.resultSet = Ext.create('Ext.data.ResultSet', {
            records: records,
            total  : records.length,
            loaded : true
        });

        if (typeof callback == 'function') {
            callback.call(scope || me, operation);
        }
    },

    //inherit docs
    update: function(operation, callback, scope) {
        var records = operation.records,
            length  = records.length,
            ids     = this.getIds(),
            record, id, i;

        operation.setStarted();

        for (i = 0; i < length; i++) {
            record = records[i];
            this.setRecord(record);
            record.commit();

            //we need to update the set of ids here because it's possible that a non-phantom record was added
            //to this proxy - in which case the record's id would never have been added via the normal 'create' call
            id = record.getId();
            if (id !== undefined && Ext.Array.indexOf(ids, id) == -1) {
                ids.push(id);
            }
        }
        this.setIds(ids);

        operation.setCompleted();
        operation.setSuccessful();

        if (typeof callback == 'function') {
            callback.call(scope || this, operation);
        }
    },

    //inherit
    destroy: function(operation, callback, scope) {
        var me = this,
            records = operation.records,
            ids = me.getIds(),
            idLength = ids.length,
            newIds = [],
            removedHash = {},
            i = records.length,
            id;

        operation.setStarted();

        for (; i--;) {
            Ext.apply(removedHash, me.removeRecord(records[i]));
        }

        for(i = 0; i < idLength; i++) {
            id = ids[i];
            if(!removedHash[id]) {
                newIds.push(id);
            }
        }

        me.setIds(newIds);

        operation.setCompleted();
        operation.setSuccessful();

        if (typeof callback == 'function') {
            callback.call(scope || me, operation);
        }
    },

    /**
     * @private
     * Fetches record data from the Proxy by ID.
     * @param {String} id The record's unique ID
     * @return {Object} The record data
     */
    getRecord: function(id) {
        var me = this,
            cache = me.cache,
            data = !cache[id] ? Ext.decode(me.getStorageObject().getItem(me.getRecordKey(id))) : cache[id];

        if(!data) {
            return null;
        }

        cache[id] = data;
        data[me.model.prototype.idProperty] = id;

        return data;
    },

    /**
     * Saves the given record in the Proxy.
     * @param {Ext.data.Model} record The model instance
     * @param {String} [id] The id to save the record under (defaults to the value of the record's getId() function)
     */
    setRecord: function(record, id) {
        if (id) {
            record.setId(id);
        } else {
            id = record.getId();
        }

        var me = this,
            rawData = record.data,
            data    = {},
            model   = me.model,
            fields  = model.prototype.fields.items,
            length  = fields.length,
            i = 0,
            field, name, obj, key;

        for (; i < length; i++) {
            field = fields[i];
            name  = field.name;

            if(field.persist) {
                data[name] = rawData[name];
            }
        }

        // no need to store the id in the data, since it is already stored in the record key
        delete data[me.model.prototype.idProperty];

        // if the record is a tree node and it's a direct child of the root node, do not store the parentId
        if(record.isNode && record.get('depth') === 1) {
            delete data.parentId;
        }

        obj = me.getStorageObject();
        key = me.getRecordKey(id);

        //keep the cache up to date
        me.cache[id] = data;

        //iPad bug requires that we remove the item before setting it
        obj.removeItem(key);
        obj.setItem(key, Ext.encode(data));
    },

    /**
     * @private
     * Physically removes a given record from the local storage and recursively removes children if the record is a tree node. Used internally by {@link #destroy}.
     * @param {Ext.data.Model} record The record to remove
     * @return {Object} a hash with the ids of the records that were removed as keys and the records that were removed as values
     */
    removeRecord: function(record) {
        var me = this,
            id = record.getId(),
            records = {},
            i, childNodes;

        records[id] = record;
        me.getStorageObject().removeItem(me.getRecordKey(id));
        delete me.cache[id];

        if(record.childNodes) {
            childNodes = record.childNodes;
            for(i = childNodes.length; i--;) {
                Ext.apply(records, me.removeRecord(childNodes[i]));
            }
        }

        return records;
    },

    /**
     * @private
     * Given the id of a record, returns a unique string based on that id and the id of this proxy. This is used when
     * storing data in the local storage object and should prevent naming collisions.
     * @param {String/Number/Ext.data.Model} id The record id, or a Model instance
     * @return {String} The unique key for this record
     */
    getRecordKey: function(id) {
        if (id.isModel) {
            id = id.getId();
        }

        return Ext.String.format("{0}-{1}", this.id, id);
    },

    /**
     * @private
     * Returns the unique key used to store the current record counter for this proxy. This is used internally when
     * realizing models (creating them when they used to be phantoms), in order to give each model instance a unique id.
     * @return {String} The counter key
     */
    getRecordCounterKey: function() {
        return Ext.String.format("{0}-counter", this.id);
    },

    /**
     * @private
     * Returns the unique key used to store the tree indicator. This is used internally to determine if the stored data is hierarchical
     * @return {String} The counter key
     */
    getTreeKey: function() {
        return Ext.String.format("{0}-tree", this.id);
    },

    /**
     * @private
     * Returns the array of record IDs stored in this Proxy
     * @return {Number[]} The record IDs. Each is cast as a Number
     */
    getIds: function() {
        var me = this,
            ids = (me.getStorageObject().getItem(me.id) || "").split(","),
            model = me.model,
            length = ids.length,
            isString = model.prototype.fields.get(model.prototype.idProperty).type.type === 'string',
            i;

        if (length == 1 && ids[0] === "") {
            ids = [];
        } else {
            for (i = 0; i < length; i++) {
                ids[i] = isString ? ids[i] : +ids[i];
            }
        }

        return ids;
    },

    /**
     * @private
     * Saves the array of ids representing the set of all records in the Proxy
     * @param {Number[]} ids The ids to set
     */
    setIds: function(ids) {
        var obj = this.getStorageObject(),
            str = ids.join(",");

        obj.removeItem(this.id);

        if (!Ext.isEmpty(str)) {
            obj.setItem(this.id, str);
        }
    },

    /**
     * @private
     * Returns the next numerical ID that can be used when realizing a model instance (see getRecordCounterKey).
     * Increments the counter.
     * @return {Number} The id
     */
    getNextId: function() {
        var me = this,
            obj = me.getStorageObject(),
            key = me.getRecordCounterKey(),
            model = me.model,
            isString = model.prototype.fields.get(model.prototype.idProperty).type.type === 'string',
            id;

        id = me.idGenerator.generate();

        obj.setItem(key, id);

        if(!isString) {
            id = +id;
        }

        return id;
    },

    /**
     * Gets tree data and transforms it from key value pairs into a hierarchical structure.
     * @private
     * @return {Ext.data.NodeInterface[]}
     */
    getTreeData: function() {
        var me = this,
            ids = me.getIds(),
            length = ids.length,
            records = [],
            recordHash = {},
            root = [],
            i = 0,
            Model = me.model,
            idProperty = Model.prototype.idProperty,
            rootLength, record, parent, parentId, children, id;

        for(; i < length; i++) {
            id = ids[i];
            // get the record for each id
            record = me.getRecord(id);
            // push the record into the records array
            records.push(record);
            // add the record to the record hash so it can be easily retrieved by id later
            recordHash[id] = record;
            if(!record.parentId) {
                // push records that are at the root level (those with no parent id) into the "root" array
                root.push(record);
            }
        }

        rootLength = root.length;

        // sort the records by parent id for greater efficiency, so that each parent record only has to be found once for all of its children
        Ext.Array.sort(records, me.sortByParentId);

        // append each record to its parent, starting after the root node(s), since root nodes do not need to be attached to a parent
        for(i = rootLength; i < length; i++) {
            record = records[i];
            parentId = record.parentId;
            if(!parent || parent[idProperty] !== parentId) {
                // if this record has a different parent id from the previous record, we need to look up the parent by id.
                parent = recordHash[parentId];
                parent.children = children = [];
            }

            // push the record onto its parent's children array
            children.push(record);
        }

        for(i = length; i--;) {
            record = records[i];
            if(!record.children && !record.leaf) {
                // set non-leaf nodes with no children to loaded so the proxy won't try to dynamically load their contents when they are expanded
                record.loaded = true;
            }
        }

        // Create model instances out of all the "root-level" nodes.
        for(i = rootLength; i--;) {
            record = root[i];
            root[i] = new Model(record, record[idProperty], record);
        }

        return root;
    },

    /**
     * Sorter function for sorting records by parentId
     * @private
     * @param {Object} node1
     * @param {Object} node2
     * @return {Number}
     */
    sortByParentId: function(node1, node2) {
        return (node1.parentId || 0) - (node2.parentId || 0);
    },

    /**
     * @private
     * Sets up the Proxy by claiming the key in the storage object that corresponds to the unique id of this Proxy. Called
     * automatically by the constructor, this should not need to be called again unless {@link #clear} has been called.
     */
    initialize: function() {
        var me = this,
            storageObject = me.getStorageObject(),
            lastId = +storageObject.getItem(me.getRecordCounterKey());

        storageObject.setItem(me.id, storageObject.getItem(me.id) || "");
        if(storageObject.getItem(me.getTreeKey())) {
            me.isHierarchical = true;
        }

        me.idGenerator = new Ext.data.SequentialIdGenerator({
            seed: lastId ? lastId + 1 : 1
        });
    },

    /**
     * Destroys all records stored in the proxy and removes all keys and values used to support the proxy from the
     * storage object.
     */
    clear: function() {
        var me = this,
            obj = me.getStorageObject(),
            ids = me.getIds(),
            len = ids.length,
            i;

        //remove all the records
        for (i = 0; i < len; i++) {
            obj.removeItem(me.getRecordKey(ids[i]));
        }

        //remove the supporting objects
        obj.removeItem(me.getRecordCounterKey());
        obj.removeItem(me.getTreeKey());
        obj.removeItem(me.id);

        // clear the cache
        me.cache = {};
    },

    /**
     * @private
     * Abstract function which should return the storage object that data will be saved to. This must be implemented
     * in each subclass.
     * @return {Object} The storage object
     */
    getStorageObject: function() {
        //<debug>
        Ext.Error.raise("The getStorageObject function has not been defined in your Ext.data.proxy.WebStorage subclass");
        //</debug>
    }
});