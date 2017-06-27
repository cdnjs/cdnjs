YUI.add('recordset-base', function(Y) {

/**
 * Provides a wrapper around a standard javascript object. Can be inserted into a Recordset instance.
 *
 * @class Record
 */
var Record = Y.Base.create('record', Y.Base, [], {
    _setId: function() {
        return Y.guid();
    },

    initializer: function() {
    },

    destructor: function() {
    },

    /**
     * Retrieve a particular (or all) values from the object
     *
     * @param field {string} (optional) The key to retrieve the value from. If not supplied, the entire object is returned.
     * @method getValue
     * @public
     */
    getValue: function(field) {
        if (field === undefined) {
            return this.get("data");
        }
        else {
            return this.get("data")[field];
        }
        return null;
    }
},
{
    ATTRS: {

        /**
        * @description Unique ID of the record instance
        * @attribute id
        * @type string
        */
        id: {
            valueFn: "_setId"
        },

        /**
        * @description The object stored within the record instance
        * @attribute data
        * @type object
        */
        data: {
            value: null
        }
    }
});

Y.Record = Record;
/**
 * The Recordset utility provides a standard way for dealing with
 * a collection of similar objects.
 * @module recordset
 * @submodule recordset-base
 */


var ArrayList = Y.ArrayList,
Lang = Y.Lang,

/**
     * The Recordset utility provides a standard way for dealing with
     * a collection of similar objects.
     *
     * Provides the base Recordset implementation, which can be extended to add
     * additional functionality, such as custom indexing. sorting, and filtering.
     *
     * @class Recordset
     * @extends Base
     * @augments ArrayList
     * @param config {Object} Configuration object literal with initial attribute values
     * @constructor
     */

Recordset = Y.Base.create('recordset', Y.Base, [], {


    /**
     * @description Publish default functions for events. Create the initial hash table.
     *
     * @method initializer
     * @protected
     */
    initializer: function() {

        /*
        If this._items does not exist, then create it and set it to an empty array.
        The reason the conditional is needed is because of two scenarios:
        Instantiating new Y.Recordset() will not go into the setter of "records", and so
        it is necessary to create this._items in the initializer.

        Instantiating new Y.Recordset({records: [{...}]}) will call the setter of "records" and create
        this._items. In this case, we don't want that to be overwritten by [].
        */

        if (!this._items) {
            this._items = [];
        }

        //set up event listener to fire events when recordset is modified in anyway
        this.publish({
            /**
             * <p>At least one record is being added. Additional properties of
             * the event are:</p>
             * <dl>
             *     <dt>added</dt>
             *         <dd>Array of new records to be added</dd>
             *     <dt>index</dt>
             *         <dd>The insertion index in the Recordset's internal
             *         array</dd>
             * </dl>
             *
             * <p>Preventing this event will cause the new records NOT to be
             * added to the Recordset's internal collection.</p>
             *
             * @event add
             * @preventable _defAddFn
             */
            add: { defaultFn: this._defAddFn },

            /**
             * <p>At least one record is being removed. Additional properties of
             * the event are:</p>
             * <dl>
             *     <dt>removed</dt>
             *         <dd>Array of records to be removed</dd>
             *     <dt>range</dt>
             *         <dd>Number of records to be removed</dd>
             *     <dt>index</dt>
             *         <dd>The starting index in the Recordset's internal
             *         array from which to remove records</dd>
             * </dl>
             *
             * <p>Preventing this event will cause the records NOT to be
             * removed from the Recordset's internal collection.</p>
             *
             * @event remove
             * @preventable _defRemoveFn
             */
            remove: { defaultFn: this._defRemoveFn },

            /**
             * The Recordset is being flushed of all records.
             *
             * @event empty
             * @preventable _defEmptyFn
             */
            empty: { defaultFn: this._defEmptyFn },

            /**
             * <p>At least one record is being updated. Additional properties of
             * the event are:</p>
             * <dl>
             *     <dt>updated</dt>
             *         <dd>Array of records with updated values</dd>
             *     <dt>overwritten</dt>
             *         <dd>Array of current records that will be replaced</dd>
             *     <dt>index</dt>
             *         <dd>The starting index in the Recordset's internal
             *         array from which to update will apply</dd>
             * </dl>
             *
             * <p>Preventing this event will cause the records NOT to be
             * updated in the Recordset's internal collection.</p>
             *
             * @event update
             * @preventable _defUpdateFn
             */
            update: { defaultFn: this._defUpdateFn }
        });

        this._recordsetChanged();
        //Fires recordset changed event when any updates are made to the recordset
        this._syncHashTable();
        //Fires appropriate hashTable methods on "add", "remove", "update" and "empty" events
    },

    destructor: function() {
        },

    /**
     * @description Helper method called upon by add() - it is used to create a new record(s) in the recordset
     *
     * @method _defAddFn
     * @return {Y.Record} A Record instance.
     * @private
     */
    _defAddFn: function(e) {
        var len = this._items.length,
        recs = e.added,
        index = e.index,
        i = 0;
        //index = (Lang.isNumber(index) && (index > -1)) ? index : len;
        for (; i < recs.length; i++) {
            //if records are to be added one at a time, push them in one at a time
            if (index === len) {
                this._items.push(recs[i]);
            }
            else {
                this._items.splice(index, 0, recs[i]);
                index++;
            }
        }

        Y.log('add Fired');

    },

    /**
     * @description Helper method called upon by remove() - it is used to remove record(s) from the recordset
     *
     * @method _defRemoveFn
     * @private
     */
    _defRemoveFn: function(e) {
        
        //remove from beginning
        if (e.index === 0) {
            this._items.shift();
        }
        
        //remove from end
        else if (e.index === this._items.length - 1) {
            this._items.pop();
        }
        
        //remove from middle
        else {
            this._items.splice(e.index, e.range);
        }
    },

    /**
     * Helper method called upon by empty() - it is used to empty the recordset
     *
     * @method _defEmptyFn
     * @private
     */
    _defEmptyFn: function(e) {
        this._items = [];
        Y.log('empty fired');
    },

    /**
     * @description Helper method called upon by update() - it is used to update the recordset
     *
     * @method _defUpdateFn
     * @private
     */
    _defUpdateFn: function(e) {

        for (var i = 0; i < e.updated.length; i++) {
            this._items[e.index + i] = this._changeToRecord(e.updated[i]);
        }
    },


    //---------------------------------------------
    // Hash Table Methods
    //---------------------------------------------

    /**
     * @description Method called whenever "recordset:add" event is fired. It adds the new record(s) to the hashtable.
     *
     * @method _defAddHash
     * @private
     */
    _defAddHash: function(e) {
        var obj = this.get('table'),
        key = this.get('key'),
        i = 0;
        for (; i < e.added.length; i++) {
            obj[e.added[i].get(key)] = e.added[i];
        }
        this.set('table', obj);
    },

    /**
     * @description Method called whenever "recordset:remove" event is fired. It removes the record(s) from the recordset.
     *
     * @method _defRemoveHash
     * @private
     */
    _defRemoveHash: function(e) {
        var obj = this.get('table'),
        key = this.get('key'),
        i = 0;
        for (; i < e.removed.length; i++) {
            delete obj[e.removed[i].get(key)];
        }
        this.set('table', obj);
    },


    /**
     * @description Method called whenever "recordset:update" event is fired. It updates the record(s) by adding the new ones and removing the overwritten ones.
     *
     * @method _defUpdateHash
     * @private
     */
    _defUpdateHash: function(e) {
        var obj = this.get('table'),
        key = this.get('key'),
        i = 0;

        //deletes the object key that held on to an overwritten record and
        //creates an object key to hold on to the updated record
        for (; i < e.updated.length; i++) {
            if (e.overwritten[i]) {
                delete obj[e.overwritten[i].get(key)];
            }
            obj[e.updated[i].get(key)] = e.updated[i];
        }
        this.set('table', obj);
    },

    /**
     * @description Method called whenever "recordset:empty" event is fired. It empties the hash table.
     *
     * @method _defEmptyHash
     * @private
     */
    _defEmptyHash: function() {
        this.set('table', {});
    },

    /**
     * @description Sets up the hashtable with all the records currently in the recordset
     *
     * @method _setHashTable
     * @private
     */
    _setHashTable: function() {
        var obj = {},
        key = this.get('key'),
        i, len;

        //If it is not an empty recordset - go through and set up the hash table.
        if (this._items && this._items.length > 0) {
            for (i = 0, len = this._items.length; i < len; i++) {
                obj[this._items[i].get(key)] = this._items[i];
            }
        }
        return obj;
    },


    /**
     * @description Helper method - it takes an object bag and converts it to a Y.Record
     *
     * @method _changeToRecord
     * @param obj {Object || Y.Record} Any objet literal or Y.Record instance
     * @return {Y.Record} A Record instance.
     * @private
     */
    _changeToRecord: function(obj) {
        var oRec;
        if (obj instanceof Y.Record) {
            oRec = obj;
        }
        else {
            oRec = new Y.Record({
                data: obj
            });
        }

        return oRec;
    },

    //---------------------------------------------
    // Events
    //---------------------------------------------
    /**
     * @description Event that is fired whenever the recordset is changed. Note that multiple simultaneous changes still fires this event once. (ie: Adding multiple records via an array will only fire this event once at the completion of all the additions)
     *
     * @method _recordSetUpdated
     * @private
     */
    _recordsetChanged: function() {

        this.on(['update', 'add', 'remove', 'empty'],
        function() {
            Y.log('change fire');
            this.fire('change', {});
        });
    },


    /**
     * @description Syncs up the private hash methods with their appropriate triggering events.
     *
     * @method _syncHashTable
     * @private
     */
    _syncHashTable: function() {

        this.after('add',
        function(e) {
            this._defAddHash(e);
        });
        this.after('remove',
        function(e) {
            this._defRemoveHash(e);
        });
        this.after('update',
        function(e) {
            this._defUpdateHash(e);
        });
        this.after('empty',
        function(e) {
            this._defEmptyHash();
        });

    },

    //---------------------------------------------
    // Public Methods
    //---------------------------------------------
    /**
     * @description Returns the record with particular ID or index
     *
     * @method getRecord
     * @param i {String, Number} The ID of the record if a string, or the index if a number.
     * @return {Y.Record} An Y.Record instance
     * @public
     */
    getRecord: function(i) {

        if (Lang.isString(i)) {
            return this.get('table')[i];
        }
        else if (Lang.isNumber(i)) {
            return this._items[i];
        }
        return null;
    },


    /**
     * @description Returns the record at a particular index
     *
     * @method getRecordByIndex
     * @param i {Number} Index at which the required record resides
     * @return {Y.Record} An Y.Record instance
     * @public
     */
    getRecordByIndex: function(i) {
        return this._items[i];
    },

    /**
     * @description Returns a range of records beginning at particular index
     *
     * @method getRecordsByIndex
     * @param index {Number} Index at which the required record resides
     * @param range {Number} (Optional) Number of records to retrieve. The default is 1
     * @return {Array} An array of Y.Record instances
     * @public
     */
    getRecordsByIndex: function(index, range) {
        var i = 0,
        returnedRecords = [];
        //Range cannot take on negative values
        range = (Lang.isNumber(range) && (range > 0)) ? range: 1;

        for (; i < range; i++) {
            returnedRecords.push(this._items[index + i]);
        }
        return returnedRecords;
    },

    /**
     * @description Returns the length of the recordset
     *
     * @method getLength
     * @return {Number} Number of records in the recordset
     * @public
     */
    getLength: function() {
        return this.size();
    },

    /**
     * @description Returns an array of values for a specified key in the recordset
     *
     * @method getValuesByKey
     * @param index {Number} (optional) Index at which the required record resides
     * @return {Array} An array of values for the given key
     * @public
     */
    getValuesByKey: function(key) {
        var i = 0,
        len = this._items.length,
        retVals = [];
        for (; i < len; i++) {
            retVals.push(this._items[i].getValue(key));
        }
        return retVals;
    },


    /**
     * @description Adds one or more Records to the RecordSet at the given index. If index is null, then adds the Records to the end of the RecordSet.
     *
     * @method add
     * @param oData {Y.Record, Object Literal, Array} A Y.Record instance, An object literal of data or an array of object literals
     * @param index {Number} (optional) Index at which to add the record(s)
     * @return {Y.Recordset} The updated recordset instance
     * @public
     */
    add: function(oData, index) {

        var newRecords = [],
        idx,
        i = 0;

        idx = (Lang.isNumber(index) && (index > -1)) ? index: this._items.length;



        //Passing in array of object literals for oData
        if (Lang.isArray(oData)) {
            for (; i < oData.length; i++) {
                newRecords[i] = this._changeToRecord(oData[i]);
            }

        }
        else if (Lang.isObject(oData)) {
            newRecords[0] = this._changeToRecord(oData);
        }

        this.fire('add', {
            added: newRecords,
            index: idx
        });
        return this;
    },

    /**
     * @description Removes one or more Records to the RecordSet at the given index. If index is null, then removes a single Record from the end of the RecordSet.
     *
     * @method remove
     * @param index {Number} (optional) Index at which to remove the record(s) from
     * @param range {Number} (optional) Number of records to remove (including the one at the index)
     * @return {Y.Recordset} The updated recordset instance
     * @public
     */
    remove: function(index, range) {
        var remRecords = [];

        //Default is to only remove the last record - the length is always 1 greater than the last index
        index = (index > -1) ? index: (this._items.length - 1);
        range = (range > 0) ? range: 1;

        remRecords = this._items.slice(index, (index + range));
        this.fire('remove', {
            removed: remRecords,
            range: range,
            index: index
        });
        //this._recordRemoved(remRecords, index);
        //return ({data: remRecords, index:index});
        return this;
    },

    /**
     * @description Empties the recordset
     *
     * @method empty
     * @return {Y.Recordset} The updated recordset instance
     * @public
     */
    empty: function() {
        this.fire('empty', {});
        return this;
    },

    /**
     * @description Updates the recordset with the new records passed in. Overwrites existing records when updating the index with the new records.
     *
     * @method update
     * @param data {Y.Record, Object Literal, Array} A Y.Record instance, An object literal of data or an array of object literals
     * @param index {Number} (optional) The index to start updating from. 
     * @return {Y.Recordset} The updated recordset instance
     * @public
     */
    update: function(data, index) {
        var rec,
        arr,
        i = 0;

        //Whatever is passed in, we are changing it to an array so that it can be easily iterated in the _defUpdateFn method
        arr = (!(Lang.isArray(data))) ? [data] : data;
        rec = this._items.slice(index, index + arr.length);

        for (; i < arr.length; i++) {
            arr[i] = this._changeToRecord(arr[i]);
        }

        this.fire('update', {
            updated: arr,
            overwritten: rec,
            index: index
        });

        return this;
    }


},
{
    ATTRS: {

        /**
        * @description An array of records that the recordset is storing
        *
        * @attribute records
        * @public
        * @type array
        */
        records: {
            validator: Lang.isArray,
            getter: function() {
                // give them a copy, not the internal object
                return new Y.Array(this._items);
            },
            setter: function(allData) {
                //For allData passed in here, see if each instance is a Record.
                //If its not, change it to a record.
                //Then push it into the array.
                var records = [];
                function initRecord(oneData) {
                    var o;

                    if (oneData instanceof Y.Record) {
                        records.push(oneData);
                    }
                    else {
                        o = new Y.Record({
                            data: oneData
                        });
                        records.push(o);
                    }
                }

                //This conditional statement handles creating empty recordsets
                if (allData) {
                    Y.Array.each(allData, initRecord);
                    this._items = Y.Array(records);
                }
            },

            //value: [],
            //initialization of the attribute must be done before the first call to get('records') is made.
            //if lazyAdd were set to true, then instantiating using new Y.Recordset({records:[..]}) would
            //not call the setter.
            //see http://developer.yahoo.com/yui/3/api/Attribute.html#method_addAttr for details on this
            lazyAdd: false
        },

        /**
    * @description A hash table where the ID of the record is the key, and the record instance is the value.
    *
    * @attribute table
    * @public
    * @type object
    */
        table: {
            //Initially, create the hash table with all records currently in the recordset
            valueFn: '_setHashTable'
        },

        /**
    * @description The ID to use as the key in the hash table.
    *
    * @attribute key
    * @public
    * @type string
    */
        key: {
            value: 'id',
            //set to readonly true. If you want custom hash tables, you should use the recordset-indexer plugin.
            readOnly: true
        }

    }
});
Y.augment(Recordset, ArrayList);
Y.Recordset = Recordset;



}, '@VERSION@' ,{requires:['base','arraylist']});
