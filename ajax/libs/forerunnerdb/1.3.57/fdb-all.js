(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
var Core = _dereq_('./core'),
	CollectionGroup = _dereq_('../lib/CollectionGroup'),
	View = _dereq_('../lib/View'),
	Highchart = _dereq_('../lib/Highchart'),
	Persist = _dereq_('../lib/Persist'),
	Document = _dereq_('../lib/Document'),
	Overview = _dereq_('../lib/Overview'),
	Grid = _dereq_('../lib/Grid'),
	Rest = _dereq_('../lib/Rest'),
	Odm = _dereq_('../lib/Odm');

if (typeof window !== 'undefined') {
	window.ForerunnerDB = Core;
}

module.exports = Core;
},{"../lib/CollectionGroup":5,"../lib/Document":9,"../lib/Grid":10,"../lib/Highchart":11,"../lib/Odm":25,"../lib/Overview":28,"../lib/Persist":30,"../lib/Rest":32,"../lib/View":35,"./core":2}],2:[function(_dereq_,module,exports){
var Core = _dereq_('../lib/Core'),
	ShimIE8 = _dereq_('../lib/Shim.IE8');

if (typeof window !== 'undefined') {
	window.ForerunnerDB = Core;
}
module.exports = Core;
},{"../lib/Core":6,"../lib/Shim.IE8":34}],3:[function(_dereq_,module,exports){
"use strict";

var Shared = _dereq_('./Shared');

/**
 * Creates an always-sorted multi-key bucket that allows ForerunnerDB to
 * know the index that a document will occupy in an array with minimal
 * processing, speeding up things like sorted views.
 * @param {object} orderBy An order object.
 * @constructor
 */
var ActiveBucket = function (orderBy) {
	var sortKey;

	this._primaryKey = '_id';
	this._keyArr = [];
	this._data = [];
	this._objLookup = {};
	this._count = 0;

	for (sortKey in orderBy) {
		if (orderBy.hasOwnProperty(sortKey)) {
			this._keyArr.push({
				key: sortKey,
				dir: orderBy[sortKey]
			});
		}
	}
};

Shared.addModule('ActiveBucket', ActiveBucket);
Shared.mixin(ActiveBucket.prototype, 'Mixin.Sorting');

/**
 * Gets / sets the primary key used by the active bucket.
 * @returns {String} The current primary key.
 */
Shared.synthesize(ActiveBucket.prototype, 'primaryKey');

/**
 * Quicksorts a single document into the passed array and
 * returns the index that the document should occupy.
 * @param {object} obj The document to calculate index for.
 * @param {array} arr The array the document index will be
 * calculated for.
 * @param {string} item The string key representation of the
 * document whose index is being calculated.
 * @param {function} fn The comparison function that is used
 * to determine if a document is sorted below or above the
 * document we are calculating the index for.
 * @returns {number} The index the document should occupy.
 */
ActiveBucket.prototype.qs = function (obj, arr, item, fn) {
	// If the array is empty then return index zero
	if (!arr.length) {
		return 0;
	}

	var lastMidwayIndex = -1,
		midwayIndex,
		lookupItem,
		result,
		start = 0,
		end = arr.length - 1;

	// Loop the data until our range overlaps
	while (end >= start) {
		// Calculate the midway point (divide and conquer)
		midwayIndex = Math.floor((start + end) / 2);

		if (lastMidwayIndex === midwayIndex) {
			// No more items to scan
			break;
		}

		// Get the item to compare against
		lookupItem = arr[midwayIndex];

		if (lookupItem !== undefined) {
			// Compare items
			result = fn(this, obj, item, lookupItem);

			if (result > 0) {
				start = midwayIndex + 1;
			}

			if (result < 0) {
				end = midwayIndex - 1;
			}
		}

		lastMidwayIndex = midwayIndex;
	}

	if (result > 0) {
		return midwayIndex + 1;
	} else {
		return midwayIndex;
	}

};

/**
 * Calculates the sort position of an item against another item.
 * @param {object} sorter An object or instance that contains
 * sortAsc and sortDesc methods.
 * @param {object} obj The document to compare.
 * @param {string} a The first key to compare.
 * @param {string} b The second key to compare.
 * @returns {number} Either 1 for sort a after b or -1 to sort
 * a before b.
 * @private
 */
ActiveBucket.prototype._sortFunc = function (sorter, obj, a, b) {
	var aVals = a.split('.:.'),
		bVals = b.split('.:.'),
		arr = sorter._keyArr,
		count = arr.length,
		index,
		sortType,
		castType;

	for (index = 0; index < count; index++) {
		sortType = arr[index];
		castType = typeof obj[sortType.key];

		if (castType === 'number') {
			aVals[index] = Number(aVals[index]);
			bVals[index] = Number(bVals[index]);
		}

		// Check for non-equal items
		if (aVals[index] !== bVals[index]) {
			// Return the sorted items
			if (sortType.dir === 1) {
				return sorter.sortAsc(aVals[index], bVals[index]);
			}

			if (sortType.dir === -1) {
				return sorter.sortDesc(aVals[index], bVals[index]);
			}
		}
	}
};

/**
 * Inserts a document into the active bucket.
 * @param {object} obj The document to insert.
 * @returns {number} The index the document now occupies.
 */
ActiveBucket.prototype.insert = function (obj) {
	var key,
		keyIndex;

	key = this.documentKey(obj);
	keyIndex = this._data.indexOf(key);

	if (keyIndex === -1) {
		// Insert key
		keyIndex = this.qs(obj, this._data, key, this._sortFunc);

		this._data.splice(keyIndex, 0, key);
	} else {
		this._data.splice(keyIndex, 0, key);
	}

	this._objLookup[obj[this._primaryKey]] = key;

	this._count++;
	return keyIndex;
};

/**
 * Removes a document from the active bucket.
 * @param {object} obj The document to remove.
 * @returns {boolean} True if the document was removed
 * successfully or false if it wasn't found in the active
 * bucket.
 */
ActiveBucket.prototype.remove = function (obj) {
	var key,
		keyIndex;

	key = this._objLookup[obj[this._primaryKey]];

	if (key) {
		keyIndex = this._data.indexOf(key);

		if (keyIndex > -1) {
			this._data.splice(keyIndex, 1);
			delete this._objLookup[obj[this._primaryKey]];

			this._count--;
			return true;
		} else {
			return false;
		}
	}

	return false;
};

/**
 * Get the index that the passed document currently occupies
 * or the index it will occupy if added to the active bucket.
 * @param {object} obj The document to get the index for.
 * @returns {number} The index.
 */
ActiveBucket.prototype.index = function (obj) {
	var key,
		keyIndex;

	key = this.documentKey(obj);
	keyIndex = this._data.indexOf(key);

	if (keyIndex === -1) {
		// Get key index
		keyIndex = this.qs(obj, this._data, key, this._sortFunc);
	}

	return keyIndex;
};

/**
 * The key that represents the passed document.
 * @param {object} obj The document to get the key for.
 * @returns {string} The document key.
 */
ActiveBucket.prototype.documentKey = function (obj) {
	var key = '',
		arr = this._keyArr,
		count = arr.length,
		index,
		sortType;

	for (index = 0; index < count; index++) {
		sortType = arr[index];
		if (key) {
			key += '.:.';
		}

		key += obj[sortType.key];
	}

	// Add the unique identifier on the end of the key
	key += '.:.' + obj[this._primaryKey];

	return key;
};

/**
 * Get the number of documents currently indexed in the active
 * bucket instance.
 * @returns {number} The number of documents.
 */
ActiveBucket.prototype.count = function () {
	return this._count;
};

Shared.finishModule('ActiveBucket');
module.exports = ActiveBucket;
},{"./Shared":33}],4:[function(_dereq_,module,exports){
"use strict";

var Shared,
	Db,
	Metrics,
	KeyValueStore,
	Path,
	IndexHashMap,
	IndexBinaryTree,
	Crc,
	Overload,
	ReactorIO;

Shared = _dereq_('./Shared');

/**
 * Creates a new collection. Collections store multiple documents and
 * handle CRUD against those documents.
 * @constructor
 */
var Collection = function (name) {
	this.init.apply(this, arguments);
};

Collection.prototype.init = function (name, options) {
	this._primaryKey = '_id';
	this._primaryIndex = new KeyValueStore('primary');
	this._primaryCrc = new KeyValueStore('primaryCrc');
	this._crcLookup = new KeyValueStore('crcLookup');
	this._name = name;
	this._data = [];
	this._metrics = new Metrics();

	this._options = options || {
		changeTimestamp: false
	};

	// Create an object to store internal protected data
	this._internalData = {};

	this._deferQueue = {
		insert: [],
		update: [],
		remove: [],
		upsert: []
	};

	this._deferThreshold = {
		insert: 100,
		update: 100,
		remove: 100,
		upsert: 100
	};

	this._deferTime = {
		insert: 1,
		update: 1,
		remove: 1,
		upsert: 1
	};

	// Set the subset to itself since it is the root collection
	this.subsetOf(this);
};

Shared.addModule('Collection', Collection);
Shared.mixin(Collection.prototype, 'Mixin.Common');
Shared.mixin(Collection.prototype, 'Mixin.Events');
Shared.mixin(Collection.prototype, 'Mixin.ChainReactor');
Shared.mixin(Collection.prototype, 'Mixin.CRUD');
Shared.mixin(Collection.prototype, 'Mixin.Constants');
Shared.mixin(Collection.prototype, 'Mixin.Triggers');
Shared.mixin(Collection.prototype, 'Mixin.Sorting');
Shared.mixin(Collection.prototype, 'Mixin.Matching');
Shared.mixin(Collection.prototype, 'Mixin.Updating');

Metrics = _dereq_('./Metrics');
KeyValueStore = _dereq_('./KeyValueStore');
Path = _dereq_('./Path');
IndexHashMap = _dereq_('./IndexHashMap');
IndexBinaryTree = _dereq_('./IndexBinaryTree');
Crc = _dereq_('./Crc');
Db = Shared.modules.Db;
Overload = _dereq_('./Overload');
ReactorIO = _dereq_('./ReactorIO');

/**
 * Returns a checksum of a string.
 * @param {String} string The string to checksum.
 * @return {String} The checksum generated.
 */
Collection.prototype.crc = Crc;

/**
 * Gets / sets the current state.
 * @param {String=} val The name of the state to set.
 * @returns {*}
 */
Shared.synthesize(Collection.prototype, 'state');

/**
 * Gets / sets the name of the collection.
 * @param {String=} val The name of the collection to set.
 * @returns {*}
 */
Shared.synthesize(Collection.prototype, 'name');

/**
 * Get the internal data array that represents the collection's data.
 * This data is returned by reference and should not be altered outside
 * of the provided CRUD functionality of the collection as doing so
 * may cause unstable index behaviour within the collection.
 * @returns {Array}
 */
Collection.prototype.data = function () {
	return this._data;
};

/**
 * Drops a collection and all it's stored data from the database.
 * @returns {boolean} True on success, false on failure.
 */
Collection.prototype.drop = function (callback) {
	var key;

	if (this._state !== 'dropped') {
		if (this._db && this._db._collection && this._name) {
			if (this.debug()) {
				console.log('Dropping collection ' + this._name);
			}

			this._state = 'dropped';

			this.emit('drop', this);

			delete this._db._collection[this._name];

			// Remove any reactor IO chain links
			if (this._collate) {
				for (key in this._collate) {
					if (this._collate.hasOwnProperty(key)) {
						this.collateRemove(key);
					}
				}
			}

			delete this._primaryKey;
			delete this._primaryIndex;
			delete this._primaryCrc;
			delete this._crcLookup;
			delete this._name;
			delete this._data;
			delete this._metrics;

			if (callback) { callback(false, true); }

			return true;
		}
	} else {
		if (callback) { callback(false, true); }

		return true;
	}

	if (callback) { callback(false, true); }
	return false;
};

/**
 * Gets / sets the primary key for this collection.
 * @param {String=} keyName The name of the primary key.
 * @returns {*}
 */
Collection.prototype.primaryKey = function (keyName) {
	if (keyName !== undefined) {
		if (this._primaryKey !== keyName) {
			this._primaryKey = keyName;

			// Set the primary key index primary key
			this._primaryIndex.primaryKey(keyName);

			// Rebuild the primary key index
			this.rebuildPrimaryKeyIndex();
		}
		return this;
	}

	return this._primaryKey;
};

/**
 * Handles insert events and routes changes to binds and views as required.
 * @param {Array} inserted An array of inserted documents.
 * @param {Array} failed An array of documents that failed to insert.
 * @private
 */
Collection.prototype._onInsert = function (inserted, failed) {
	this.emit('insert', inserted, failed);
};

/**
 * Handles update events and routes changes to binds and views as required.
 * @param {Array} items An array of updated documents.
 * @private
 */
Collection.prototype._onUpdate = function (items) {
	this.emit('update', items);
};

/**
 * Handles remove events and routes changes to binds and views as required.
 * @param {Array} items An array of removed documents.
 * @private
 */
Collection.prototype._onRemove = function (items) {
	this.emit('remove', items);
};

/**
 * Handles any change to the collection.
 * @private
 */
Collection.prototype._onChange = function () {
	if (this._options.changeTimestamp) {
		// Record the last change timestamp
		this._internalData.lastChange = new Date();
	}
};

/**
 * Gets / sets the db instance this class instance belongs to.
 * @param {Db=} db The db instance.
 * @returns {*}
 */
Shared.synthesize(Collection.prototype, 'db', function (db) {
	if (db) {
		if (this.primaryKey() === '_id') {
			// Set primary key to the db's key by default
			this.primaryKey(db.primaryKey());
		}
	}

	return this.$super.apply(this, arguments);
});

/**
 * Sets the collection's data to the array of documents passed.
 * @param data
 * @param options Optional options object.
 * @param callback Optional callback function.
 */
Collection.prototype.setData = function (data, options, callback) {
	if (this._state === 'dropped') {
		throw('ForerunnerDB.Collection "' + this.name() + '": Cannot operate in a dropped state!');
	}

	if (data) {
		var op = this._metrics.create('setData');
		op.start();

		options = this.options(options);
		this.preSetData(data, options, callback);

		if (options.$decouple) {
			data = this.decouple(data);
		}

		if (!(data instanceof Array)) {
			data = [data];
		}

		op.time('transformIn');
		data = this.transformIn(data);
		op.time('transformIn');

		var oldData = [].concat(this._data);

		this._dataReplace(data);

		// Update the primary key index
		op.time('Rebuild Primary Key Index');
		this.rebuildPrimaryKeyIndex(options);
		op.time('Rebuild Primary Key Index');

		// Rebuild all other indexes
		op.time('Rebuild All Other Indexes');
		this._rebuildIndexes();
		op.time('Rebuild All Other Indexes');

		op.time('Resolve chains');
		this.chainSend('setData', data, {oldData: oldData});
		op.time('Resolve chains');

		op.stop();

		this.emit('setData', this._data, oldData);
	}

	if (callback) { callback(false); }

	return this;
};

/**
 * Drops and rebuilds the primary key index for all documents in the collection.
 * @param {Object=} options An optional options object.
 * @private
 */
Collection.prototype.rebuildPrimaryKeyIndex = function (options) {
	options = options || {
		$ensureKeys: undefined,
		$violationCheck: undefined
	};

	var ensureKeys = options && options.$ensureKeys !== undefined ? options.$ensureKeys : true,
		violationCheck = options && options.$violationCheck !== undefined ? options.$violationCheck : true,
		arr,
		arrCount,
		arrItem,
		pIndex = this._primaryIndex,
		crcIndex = this._primaryCrc,
		crcLookup = this._crcLookup,
		pKey = this._primaryKey,
		jString;

	// Drop the existing primary index
	pIndex.truncate();
	crcIndex.truncate();
	crcLookup.truncate();

	// Loop the data and check for a primary key in each object
	arr = this._data;
	arrCount = arr.length;

	while (arrCount--) {
		arrItem = arr[arrCount];

		if (ensureKeys) {
			// Make sure the item has a primary key
			this.ensurePrimaryKey(arrItem);
		}

		if (violationCheck) {
			// Check for primary key violation
			if (!pIndex.uniqueSet(arrItem[pKey], arrItem)) {
				// Primary key violation
				throw('ForerunnerDB.Collection "' + this.name() + '": Call to setData on collection failed because your data violates the primary key unique constraint. One or more documents are using the same primary key: ' + arrItem[this._primaryKey]);
			}
		} else {
			pIndex.set(arrItem[pKey], arrItem);
		}

		// Generate a CRC string
		jString = JSON.stringify(arrItem);

		crcIndex.set(arrItem[pKey], jString);
		crcLookup.set(jString, arrItem);
	}
};

/**
 * Checks for a primary key on the document and assigns one if none
 * currently exists.
 * @param {Object} obj The object to check a primary key against.
 * @private
 */
Collection.prototype.ensurePrimaryKey = function (obj) {
	if (obj[this._primaryKey] === undefined) {
		// Assign a primary key automatically
		obj[this._primaryKey] = this.objectId();
	}
};

/**
 * Clears all data from the collection.
 * @returns {Collection}
 */
Collection.prototype.truncate = function () {
	if (this._state === 'dropped') {
		throw('ForerunnerDB.Collection "' + this.name() + '": Cannot operate in a dropped state!');
	}

	this.emit('truncate', this._data);

	// Clear all the data from the collection
	this._data.length = 0;

	// Re-create the primary index data
	this._primaryIndex = new KeyValueStore('primary');
	this._primaryCrc = new KeyValueStore('primaryCrc');
	this._crcLookup = new KeyValueStore('crcLookup');

	this._onChange();
	this.deferEmit('change', {type: 'truncate'});
	return this;
};

/**
 * Modifies an existing document or documents in a collection. This will update
 * all matches for 'query' with the data held in 'update'. It will not overwrite
 * the matched documents with the update document.
 *
 * @param {Object} obj The document object to upsert or an array containing
 * documents to upsert.
 *
 * If the document contains a primary key field (based on the collections's primary
 * key) then the database will search for an existing document with a matching id.
 * If a matching document is found, the document will be updated. Any keys that
 * match keys on the existing document will be overwritten with new data. Any keys
 * that do not currently exist on the document will be added to the document.
 *
 * If the document does not contain an id or the id passed does not match an existing
 * document, an insert is performed instead. If no id is present a new primary key
 * id is provided for the item.
 *
 * @param {Function=} callback Optional callback method.
 * @returns {Object} An object containing two keys, "op" contains either "insert" or
 * "update" depending on the type of operation that was performed and "result"
 * contains the return data from the operation used.
 */
Collection.prototype.upsert = function (obj, callback) {
	if (this._state === 'dropped') {
		throw('ForerunnerDB.Collection "' + this.name() + '": Cannot operate in a dropped state!');
	}

	if (obj) {
		var queue = this._deferQueue.upsert,
			deferThreshold = this._deferThreshold.upsert;

		var returnData = {},
			query,
			i;

		// Determine if the object passed is an array or not
		if (obj instanceof Array) {
			if (obj.length > deferThreshold) {
				// Break up upsert into blocks
				this._deferQueue.upsert = queue.concat(obj);

				// Fire off the insert queue handler
				this.processQueue('upsert', callback);

				return {};
			} else {
				// Loop the array and upsert each item
				returnData = [];

				for (i = 0; i < obj.length; i++) {
					returnData.push(this.upsert(obj[i]));
				}

				if (callback) { callback(); }

				return returnData;
			}
		}

		// Determine if the operation is an insert or an update
		if (obj[this._primaryKey]) {
			// Check if an object with this primary key already exists
			query = {};
			query[this._primaryKey] = obj[this._primaryKey];

			if (this._primaryIndex.lookup(query)[0]) {
				// The document already exists with this id, this operation is an update
				returnData.op = 'update';
			} else {
				// No document with this id exists, this operation is an insert
				returnData.op = 'insert';
			}
		} else {
			// The document passed does not contain an id, this operation is an insert
			returnData.op = 'insert';
		}

		switch (returnData.op) {
			case 'insert':
				returnData.result = this.insert(obj);
				break;

			case 'update':
				returnData.result = this.update(query, obj);
				break;

			default:
				break;
		}

		return returnData;
	} else {
		if (callback) { callback(); }
	}

	return {};
};

/**
 * Executes a method against each document that matches query and returns an
 * array of documents that may have been modified by the method.
 * @param {Object} query The query object.
 * @param {Function} func The method that each document is passed to. If this method
 * returns false for a particular document it is excluded from the results.
 * @param {Object=} options Optional options object.
 * @returns {Array}
 */
Collection.prototype.filter = function (query, func, options) {
	return (this.find(query, options)).filter(func);
};

/**
 * Executes a method against each document that matches query and then executes
 * an update based on the return data of the method.
 * @param {Object} query The query object.
 * @param {Function} func The method that each document is passed to. If this method
 * returns false for a particular document it is excluded from the update.
 * @param {Object=} options Optional options object passed to the initial find call.
 * @returns {Array}
 */
Collection.prototype.filterUpdate = function (query, func, options) {
	var items = this.find(query, options),
		results = [],
		singleItem,
		singleQuery,
		singleUpdate,
		pk = this.primaryKey(),
		i;

	for (i = 0; i < items.length; i++) {
		singleItem = items[i];
		singleUpdate = func(singleItem);

		if (singleUpdate) {
			singleQuery = {};
			singleQuery[pk] = singleItem[pk];

			results.push(this.update(singleQuery, singleUpdate));
		}
	}

	return results;
};

/**
 * Modifies an existing document or documents in a collection. This will update
 * all matches for 'query' with the data held in 'update'. It will not overwrite
 * the matched documents with the update document.
 *
 * @param {Object} query The query that must be matched for a document to be
 * operated on.
 * @param {Object} update The object containing updated key/values. Any keys that
 * match keys on the existing document will be overwritten with this data. Any
 * keys that do not currently exist on the document will be added to the document.
 * @param {Object=} options An options object.
 * @returns {Array} The items that were updated.
 */
Collection.prototype.update = function (query, update, options) {
	if (this._state === 'dropped') {
		throw('ForerunnerDB.Collection "' + this.name() + '": Cannot operate in a dropped state!');
	}

	// Decouple the update data
	update = this.decouple(update);

	// Handle transform
	update = this.transformIn(update);

	if (this.debug()) {
		console.log('Updating some collection data for collection "' + this.name() + '"');
	}

	var self = this,
		op = this._metrics.create('update'),
		dataSet,
		updated,
		updateCall = function (referencedDoc) {
			var oldDoc = self.decouple(referencedDoc),
				newDoc,
				triggerOperation,
				result;

			if (self.willTrigger(self.TYPE_UPDATE, self.PHASE_BEFORE) || self.willTrigger(self.TYPE_UPDATE, self.PHASE_AFTER)) {
				newDoc = self.decouple(referencedDoc);

				triggerOperation = {
					type: 'update',
					query: self.decouple(query),
					update: self.decouple(update),
					options: self.decouple(options),
					op: op
				};

				// Update newDoc with the update criteria so we know what the data will look
				// like AFTER the update is processed
				result = self.updateObject(newDoc, triggerOperation.update, triggerOperation.query, triggerOperation.options, '');

				if (self.processTrigger(triggerOperation, self.TYPE_UPDATE, self.PHASE_BEFORE, referencedDoc, newDoc) !== false) {
					// No triggers complained so let's execute the replacement of the existing
					// object with the new one
					result = self.updateObject(referencedDoc, newDoc, triggerOperation.query, triggerOperation.options, '');

					// NOTE: If for some reason we would only like to fire this event if changes are actually going
					// to occur on the object from the proposed update then we can add "result &&" to the if
					self.processTrigger(triggerOperation, self.TYPE_UPDATE, self.PHASE_AFTER, referencedDoc, newDoc);
				} else {
					// Trigger cancelled operation so tell result that it was not updated
					result = false;
				}
			} else {
				// No triggers complained so let's execute the replacement of the existing
				// object with the new one
				result = self.updateObject(referencedDoc, update, query, options, '');
			}

			// Inform indexes of the change
			self._updateIndexes(oldDoc, referencedDoc);

			return result;
		};

	op.start();
	op.time('Retrieve documents to update');
	dataSet = this.find(query, {$decouple: false});
	op.time('Retrieve documents to update');

	if (dataSet.length) {
		op.time('Update documents');
		updated = dataSet.filter(updateCall);
		op.time('Update documents');

		if (updated.length) {
			op.time('Resolve chains');
			this.chainSend('update', {
				query: query,
				update: update,
				dataSet: dataSet
			}, options);
			op.time('Resolve chains');

			this._onUpdate(updated);
			this._onChange();
			this.deferEmit('change', {type: 'update', data: updated});
		}
	}

	op.stop();

	// TODO: Should we decouple the updated array before return by default?
	return updated || [];
};

/**
 * Replaces an existing object with data from the new object without
 * breaking data references.
 * @param {Object} currentObj The object to alter.
 * @param {Object} newObj The new object to overwrite the existing one with.
 * @returns {*} Chain.
 * @private
 */
Collection.prototype._replaceObj = function (currentObj, newObj) {
	var i;

	// Check if the new document has a different primary key value from the existing one
	// Remove item from indexes
	this._removeFromIndexes(currentObj);

	// Remove existing keys from current object
	for (i in currentObj) {
		if (currentObj.hasOwnProperty(i)) {
			delete currentObj[i];
		}
	}

	// Add new keys to current object
	for (i in newObj) {
		if (newObj.hasOwnProperty(i)) {
			currentObj[i] = newObj[i];
		}
	}

	// Update the item in the primary index
	if (!this._insertIntoIndexes(currentObj)) {
		throw('ForerunnerDB.Collection "' + this.name() + '": Primary key violation in update! Key violated: ' + currentObj[this._primaryKey]);
	}

	// Update the object in the collection data
	//this._data.splice(this._data.indexOf(currentObj), 1, newObj);

	return this;
};

/**
 * Helper method to update a document from it's id.
 * @param {String} id The id of the document.
 * @param {Object} update The object containing the key/values to update to.
 * @returns {Array} The items that were updated.
 */
Collection.prototype.updateById = function (id, update) {
	var searchObj = {};
	searchObj[this._primaryKey] = id;
	return this.update(searchObj, update);
};

/**
 * Internal method for document updating.
 * @param {Object} doc The document to update.
 * @param {Object} update The object with key/value pairs to update the document with.
 * @param {Object} query The query object that we need to match to perform an update.
 * @param {Object} options An options object.
 * @param {String} path The current recursive path.
 * @param {String} opType The type of update operation to perform, if none is specified
 * default is to set new data against matching fields.
 * @returns {Boolean} True if the document was updated with new / changed data or
 * false if it was not updated because the data was the same.
 * @private
 */
Collection.prototype.updateObject = function (doc, update, query, options, path, opType) {
	// TODO: This method is long, try to break it into smaller pieces
	update = this.decouple(update);

	// Clear leading dots from path
	path = path || '';
	if (path.substr(0, 1) === '.') { path = path.substr(1, path.length -1); }

	//var oldDoc = this.decouple(doc),
	var	updated = false,
		recurseUpdated = false,
		operation,
		tmpArray,
		tmpIndex,
		tmpCount,
		tempIndex,
		pathInstance,
		sourceIsArray,
		updateIsArray,
		i;

	// Loop each key in the update object
	for (i in update) {
		if (update.hasOwnProperty(i)) {
			// Reset operation flag
			operation = false;

			// Check if the property starts with a dollar (function)
			if (i.substr(0, 1) === '$') {
				// Check for commands
				switch (i) {
					case '$key':
					case '$index':
					case '$data':
						// Ignore some operators
						operation = true;
						break;

					case '$each':
						operation = true;

						// Loop over the array of updates and run each one
						tmpCount = update.$each.length;
						for (tmpIndex = 0; tmpIndex < tmpCount; tmpIndex++) {
							recurseUpdated = this.updateObject(doc, update.$each[tmpIndex], query, options, path);

							if (recurseUpdated) {
								updated = true;
							}
						}

						updated = updated || recurseUpdated;
						break;

					default:
						operation = true;

						// Now run the operation
						recurseUpdated = this.updateObject(doc, update[i], query, options, path, i);
						updated = updated || recurseUpdated;
						break;
				}
			}

			// Check if the key has a .$ at the end, denoting an array lookup
			if (this._isPositionalKey(i)) {
				operation = true;

				// Modify i to be the name of the field
				i = i.substr(0, i.length - 2);

				pathInstance = new Path(path + '.' + i);

				// Check if the key is an array and has items
				if (doc[i] && doc[i] instanceof Array && doc[i].length) {
					tmpArray = [];

					// Loop the array and find matches to our search
					for (tmpIndex = 0; tmpIndex < doc[i].length; tmpIndex++) {
						if (this._match(doc[i][tmpIndex], pathInstance.value(query)[0], '', {})) {
							tmpArray.push(tmpIndex);
						}
					}

					// Loop the items that matched and update them
					for (tmpIndex = 0; tmpIndex < tmpArray.length; tmpIndex++) {
						recurseUpdated = this.updateObject(doc[i][tmpArray[tmpIndex]], update[i + '.$'], query, options, path + '.' + i, opType);
						updated = updated || recurseUpdated;
					}
				}
			}

			if (!operation) {
				if (!opType && typeof(update[i]) === 'object') {
					if (doc[i] !== null && typeof(doc[i]) === 'object') {
						// Check if we are dealing with arrays
						sourceIsArray = doc[i] instanceof Array;
						updateIsArray = update[i] instanceof Array;

						if (sourceIsArray || updateIsArray) {
							// Check if the update is an object and the doc is an array
							if (!updateIsArray && sourceIsArray) {
								// Update is an object, source is an array so match the array items
								// with our query object to find the one to update inside this array

								// Loop the array and find matches to our search
								for (tmpIndex = 0; tmpIndex < doc[i].length; tmpIndex++) {
									recurseUpdated = this.updateObject(doc[i][tmpIndex], update[i], query, options, path + '.' + i, opType);
									updated = updated || recurseUpdated;
								}
							} else {
								// Either both source and update are arrays or the update is
								// an array and the source is not, so set source to update
								if (doc[i] !== update[i]) {
									this._updateProperty(doc, i, update[i]);
									updated = true;
								}
							}
						} else {
							// The doc key is an object so traverse the
							// update further
							recurseUpdated = this.updateObject(doc[i], update[i], query, options, path + '.' + i, opType);
							updated = updated || recurseUpdated;
						}
					} else {
						if (doc[i] !== update[i]) {
							this._updateProperty(doc, i, update[i]);
							updated = true;
						}
					}
				} else {
					switch (opType) {
						case '$inc':
							this._updateIncrement(doc, i, update[i]);
							updated = true;
							break;

						case '$cast':
							// Casts a property to the type specified if it is not already
							// that type. If the cast is an array or an object and the property
							// is not already that type a new array or object is created and
							// set to the property, overwriting the previous value
							switch (update[i]) {
								case 'array':
									if (!(doc[i] instanceof Array)) {
										// Cast to an array
										this._updateProperty(doc, i, update.$data || []);
										updated = true;
									}
									break;

								case 'object':
									if (!(doc[i] instanceof Object) || (doc[i] instanceof Array)) {
										// Cast to an object
										this._updateProperty(doc, i, update.$data || {});
										updated = true;
									}
									break;

								case 'number':
									if (typeof doc[i] !== 'number') {
										// Cast to a number
										this._updateProperty(doc, i, Number(doc[i]));
										updated = true;
									}
									break;

								case 'string':
									if (typeof doc[i] !== 'string') {
										// Cast to a string
										this._updateProperty(doc, i, String(doc[i]));
										updated = true;
									}
									break;

								default:
									throw('ForerunnerDB.Collection "' + this.name() + '": Cannot update cast to unknown type: ' + update[i]);
							}

							break;

						case '$push':
							// Check if the target key is undefined and if so, create an array
							if (doc[i] === undefined) {
								// Initialise a new array
								this._updateProperty(doc, i, []);
							}

							// Check that the target key is an array
							if (doc[i] instanceof Array) {
								// Check for a $position modifier with an $each
								if (update[i].$position !== undefined && update[i].$each instanceof Array) {
									// Grab the position to insert at
									tempIndex = update[i].$position;

									// Loop the each array and push each item
									tmpCount = update[i].$each.length;
									for (tmpIndex = 0; tmpIndex < tmpCount; tmpIndex++) {
										this._updateSplicePush(doc[i], tempIndex + tmpIndex, update[i].$each[tmpIndex]);
									}
								} else if (update[i].$each instanceof Array) {
									// Do a loop over the each to push multiple items
									tmpCount = update[i].$each.length;
									for (tmpIndex = 0; tmpIndex < tmpCount; tmpIndex++) {
										this._updatePush(doc[i], update[i].$each[tmpIndex]);
									}
								} else {
									// Do a standard push
									this._updatePush(doc[i], update[i]);
								}
								updated = true;
							} else {
								throw('ForerunnerDB.Collection "' + this.name() + '": Cannot push to a key that is not an array! (' + i + ')');
							}
							break;

						case '$pull':
							if (doc[i] instanceof Array) {
								tmpArray = [];

								// Loop the array and find matches to our search
								for (tmpIndex = 0; tmpIndex < doc[i].length; tmpIndex++) {
									if (this._match(doc[i][tmpIndex], update[i], '', {})) {
										tmpArray.push(tmpIndex);
									}
								}

								tmpCount = tmpArray.length;

								// Now loop the pull array and remove items to be pulled
								while (tmpCount--) {
									this._updatePull(doc[i], tmpArray[tmpCount]);
									updated = true;
								}
							}
							break;

						case '$pullAll':
							if (doc[i] instanceof Array) {
								if (update[i] instanceof Array) {
									tmpArray = doc[i];
									tmpCount = tmpArray.length;

									if (tmpCount > 0) {
										// Now loop the pull array and remove items to be pulled
										while (tmpCount--) {
											for (tempIndex = 0; tempIndex < update[i].length; tempIndex++) {
												if (tmpArray[tmpCount] === update[i][tempIndex]) {
													this._updatePull(doc[i], tmpCount);
													tmpCount--;
													updated = true;
												}
											}

											if (tmpCount < 0) {
												break;
											}
										}
									}
								} else {
									throw('ForerunnerDB.Collection "' + this.name() + '": Cannot pullAll without being given an array of values to pull! (' + i + ')');
								}
							}
							break;

						case '$addToSet':
							// Check if the target key is undefined and if so, create an array
							if (doc[i] === undefined) {
								// Initialise a new array
								this._updateProperty(doc, i, []);
							}

							// Check that the target key is an array
							if (doc[i] instanceof Array) {
								// Loop the target array and check for existence of item
								var targetArr = doc[i],
									targetArrIndex,
									targetArrCount = targetArr.length,
									objHash,
									addObj = true,
									optionObj = (options && options.$addToSet),
									hashMode,
									pathSolver;

								// Check if we have an options object for our operation
								if (update[i].$key) {
									hashMode = false;
									pathSolver = new Path(update[i].$key);
									objHash = pathSolver.value(update[i])[0];

									// Remove the key from the object before we add it
									delete update[i].$key;
								} else if (optionObj && optionObj.key) {
									hashMode = false;
									pathSolver = new Path(optionObj.key);
									objHash = pathSolver.value(update[i])[0];
								} else {
									objHash = JSON.stringify(update[i]);
									hashMode = true;
								}

								for (targetArrIndex = 0; targetArrIndex < targetArrCount; targetArrIndex++) {
									if (hashMode) {
										// Check if objects match via a string hash (JSON)
										if (JSON.stringify(targetArr[targetArrIndex]) === objHash) {
											// The object already exists, don't add it
											addObj = false;
											break;
										}
									} else {
										// Check if objects match based on the path
										if (objHash === pathSolver.value(targetArr[targetArrIndex])[0]) {
											// The object already exists, don't add it
											addObj = false;
											break;
										}
									}
								}

								if (addObj) {
									this._updatePush(doc[i], update[i]);
									updated = true;
								}
							} else {
								throw('ForerunnerDB.Collection "' + this.name() + '": Cannot addToSet on a key that is not an array! (' + i + ')');
							}
							break;

						case '$splicePush':
							// Check if the target key is undefined and if so, create an array
							if (doc[i] === undefined) {
								// Initialise a new array
								this._updateProperty(doc, i, []);
							}

							// Check that the target key is an array
							if (doc[i] instanceof Array) {
								tempIndex = update.$index;

								if (tempIndex !== undefined) {
									delete update.$index;

									// Check for out of bounds index
									if (tempIndex > doc[i].length) {
										tempIndex = doc[i].length;
									}

									this._updateSplicePush(doc[i], tempIndex, update[i]);
									updated = true;
								} else {
									throw('ForerunnerDB.Collection "' + this.name() + '": Cannot splicePush without a $index integer value!');
								}
							} else {
								throw('ForerunnerDB.Collection "' + this.name() + '": Cannot splicePush with a key that is not an array! (' + i + ')');
							}
							break;

						case '$move':
							if (doc[i] instanceof Array) {
								// Loop the array and find matches to our search
								for (tmpIndex = 0; tmpIndex < doc[i].length; tmpIndex++) {
									if (this._match(doc[i][tmpIndex], update[i], '', {})) {
										var moveToIndex = update.$index;

										if (moveToIndex !== undefined) {
											delete update.$index;

											this._updateSpliceMove(doc[i], tmpIndex, moveToIndex);
											updated = true;
										} else {
											throw('ForerunnerDB.Collection "' + this.name() + '": Cannot move without a $index integer value!');
										}
										break;
									}
								}
							} else {
								throw('ForerunnerDB.Collection "' + this.name() + '": Cannot move on a key that is not an array! (' + i + ')');
							}
							break;

						case '$mul':
							this._updateMultiply(doc, i, update[i]);
							updated = true;
							break;

						case '$rename':
							this._updateRename(doc, i, update[i]);
							updated = true;
							break;

						case '$overwrite':
							this._updateOverwrite(doc, i, update[i]);
							updated = true;
							break;

						case '$unset':
							this._updateUnset(doc, i);
							updated = true;
							break;

						case '$clear':
							this._updateClear(doc, i);
							updated = true;
							break;

						case '$pop':
							if (doc[i] instanceof Array) {
								if (this._updatePop(doc[i], update[i])) {
									updated = true;
								}
							} else {
								throw('ForerunnerDB.Collection "' + this.name() + '": Cannot pop from a key that is not an array! (' + i + ')');
							}
							break;

						default:
							if (doc[i] !== update[i]) {
								this._updateProperty(doc, i, update[i]);
								updated = true;
							}
							break;
					}
				}
			}
		}
	}

	return updated;
};

/**
 * Determines if the passed key has an array positional mark (a dollar at the end
 * of its name).
 * @param {String} key The key to check.
 * @returns {Boolean} True if it is a positional or false if not.
 * @private
 */
Collection.prototype._isPositionalKey = function (key) {
	return key.substr(key.length - 2, 2) === '.$';
};

/**
 * Removes any documents from the collection that match the search query
 * key/values.
 * @param {Object} query The query object.
 * @param {Object=} options An options object.
 * @param {Function=} callback A callback method.
 * @returns {Array} An array of the documents that were removed.
 */
Collection.prototype.remove = function (query, options, callback) {
	if (this._state === 'dropped') {
		throw('ForerunnerDB.Collection "' + this.name() + '": Cannot operate in a dropped state!');
	}

	var self = this,
		dataSet,
		index,
		arrIndex,
		returnArr,
		removeMethod,
		triggerOperation,
		doc,
		newDoc;

	if (typeof(options) === 'function') {
		callback = options;
		options = undefined;
	}

	if (query instanceof Array) {
		returnArr = [];

		for (arrIndex = 0; arrIndex < query.length; arrIndex++) {
			returnArr.push(this.remove(query[arrIndex], {noEmit: true}));
		}

		if (!options || (options && !options.noEmit)) {
			this._onRemove(returnArr);
		}

		if (callback) { callback(false, returnArr); }
		return returnArr;
	} else {
		dataSet = this.find(query, {$decouple: false});

		if (dataSet.length) {
			removeMethod = function (dataItem) {
				// Remove the item from the collection's indexes
				self._removeFromIndexes(dataItem);

				// Remove data from internal stores
				index = self._data.indexOf(dataItem);
				self._dataRemoveAtIndex(index);
			};

			// Remove the data from the collection
			for (var i = 0; i < dataSet.length; i++) {
				doc = dataSet[i];

				if (self.willTrigger(self.TYPE_REMOVE, self.PHASE_BEFORE) || self.willTrigger(self.TYPE_REMOVE, self.PHASE_AFTER)) {
					triggerOperation = {
						type: 'remove'
					};

					newDoc = self.decouple(doc);

					if (self.processTrigger(triggerOperation, self.TYPE_REMOVE, self.PHASE_BEFORE, newDoc, newDoc) !== false) {
						// The trigger didn't ask to cancel so execute the removal method
						removeMethod(doc);

						self.processTrigger(triggerOperation, self.TYPE_REMOVE, self.PHASE_AFTER, newDoc, newDoc);
					}
				} else {
					// No triggers to execute
					removeMethod(doc);
				}
			}

			//op.time('Resolve chains');
			this.chainSend('remove', {
				query: query,
				dataSet: dataSet
			}, options);
			//op.time('Resolve chains');

			if (!options || (options && !options.noEmit)) {
				this._onRemove(dataSet);
			}

			this._onChange();
			this.deferEmit('change', {type: 'remove', data: dataSet});
		}

		if (callback) { callback(false, dataSet); }
		return dataSet;
	}
};

/**
 * Helper method that removes a document that matches the given id.
 * @param {String} id The id of the document to remove.
 * @returns {Array} An array of documents that were removed.
 */
Collection.prototype.removeById = function (id) {
	var searchObj = {};
	searchObj[this._primaryKey] = id;
	return this.remove(searchObj);
};

/**
 * Queues an event to be fired. This has automatic de-bouncing so that any
 * events of the same type that occur within 100 milliseconds of a previous
 * one will all be wrapped into a single emit rather than emitting tons of
 * events for lots of chained inserts etc. Only the data from the last
 * de-bounced event will be emitted.
 * @param {String} eventName The name of the event to emit.
 * @param {*=} data Optional data to emit with the event.
 * @private
 */
Collection.prototype.deferEmit = function (eventName, data) {
	var self = this,
		args;

	if (!this._noEmitDefer && (!this._db || (this._db && !this._db._noEmitDefer))) {
		args = arguments;

		// Check for an existing timeout
		this._deferTimeout = this._deferTimeout || {};
		if (this._deferTimeout[eventName]) {
			clearTimeout(this._deferTimeout[eventName]);
		}

		// Set a timeout
		this._deferTimeout[eventName] = setTimeout(function () {
			if (self.debug()) { console.log('ForerunnerDB.Collection: Emitting ' + args[0]); }
			self.emit.apply(self, args);
		}, 1);
	} else {
		this.emit.apply(this, arguments);
	}
};

/**
 * Processes a deferred action queue.
 * @param {String} type The queue name to process.
 * @param {Function} callback A method to call when the queue has processed.
 * @param {Object=} resultObj A temp object to hold results in.
 */
Collection.prototype.processQueue = function (type, callback, resultObj) {
	var self = this,
		queue = this._deferQueue[type],
		deferThreshold = this._deferThreshold[type],
		deferTime = this._deferTime[type],
		dataArr,
		result;

	resultObj = resultObj || {
		deferred: true
	};

	if (queue.length) {
		// Process items up to the threshold
		if (queue.length) {
			if (queue.length > deferThreshold) {
				// Grab items up to the threshold value
				dataArr = queue.splice(0, deferThreshold);
			} else {
				// Grab all the remaining items
				dataArr = queue.splice(0, queue.length);
			}

			result = self[type](dataArr);

			switch (type) {
				case 'insert':
					resultObj.inserted = resultObj.inserted || [];
					resultObj.failed = resultObj.failed || [];

					resultObj.inserted = resultObj.inserted.concat(result.inserted);
					resultObj.failed = resultObj.failed.concat(result.failed);
					break;
			}
		}

		// Queue another process
		setTimeout(function () {
			self.processQueue.call(self, type, callback, resultObj);
		}, deferTime);
	} else {
		if (callback) { callback(resultObj); }
	}
};

/**
 * Inserts a document or array of documents into the collection.
 * @param {Object|Array} data Either a document object or array of document
 * @param {Number=} index Optional index to insert the record at.
 * @param {Function=} callback Optional callback called once action is complete.
 * objects to insert into the collection.
 */
Collection.prototype.insert = function (data, index, callback) {
	if (this._state === 'dropped') {
		throw('ForerunnerDB.Collection "' + this.name() + '": Cannot operate in a dropped state!');
	}

	if (typeof(index) === 'function') {
		callback = index;
		index = this._data.length;
	} else if (index === undefined) {
		index = this._data.length;
	}

	data = this.transformIn(data);
	return this._insertHandle(data, index, callback);
};

/**
 * Inserts a document or array of documents into the collection.
 * @param {Object|Array} data Either a document object or array of document
 * @param {Number=} index Optional index to insert the record at.
 * @param {Function=} callback Optional callback called once action is complete.
 * objects to insert into the collection.
 */
Collection.prototype._insertHandle = function (data, index, callback) {
	var //self = this,
		queue = this._deferQueue.insert,
		deferThreshold = this._deferThreshold.insert,
		//deferTime = this._deferTime.insert,
		inserted = [],
		failed = [],
		insertResult,
		resultObj,
		i;

	if (data instanceof Array) {
		// Check if there are more insert items than the insert defer
		// threshold, if so, break up inserts so we don't tie up the
		// ui or thread
		if (data.length > deferThreshold) {
			// Break up insert into blocks
			this._deferQueue.insert = queue.concat(data);

			// Fire off the insert queue handler
			this.processQueue('insert', callback);

			return;
		} else {
			// Loop the array and add items
			for (i = 0; i < data.length; i++) {
				insertResult = this._insert(data[i], index + i);

				if (insertResult === true) {
					inserted.push(data[i]);
				} else {
					failed.push({
						doc: data[i],
						reason: insertResult
					});
				}
			}
		}
	} else {
		// Store the data item
		insertResult = this._insert(data, index);

		if (insertResult === true) {
			inserted.push(data);
		} else {
			failed.push({
				doc: data,
				reason: insertResult
			});
		}
	}

	//op.time('Resolve chains');
	this.chainSend('insert', data, {index: index});
	//op.time('Resolve chains');

	resultObj = {
		deferred: false,
		inserted: inserted,
		failed: failed
	};

	this._onInsert(inserted, failed);
	if (callback) { callback(resultObj); }

	this._onChange();
	this.deferEmit('change', {type: 'insert', data: inserted});

	return resultObj;
};

/**
 * Internal method to insert a document into the collection. Will
 * check for index violations before allowing the document to be inserted.
 * @param {Object} doc The document to insert after passing index violation
 * tests.
 * @param {Number=} index Optional index to insert the document at.
 * @returns {Boolean|Object} True on success, false if no document passed,
 * or an object containing details about an index violation if one occurred.
 * @private
 */
Collection.prototype._insert = function (doc, index) {
	if (doc) {
		var self = this,
			indexViolation,
			triggerOperation,
			insertMethod,
			newDoc;

		this.ensurePrimaryKey(doc);

		// Check indexes are not going to be broken by the document
		indexViolation = this.insertIndexViolation(doc);

		insertMethod = function (doc) {
			// Add the item to the collection's indexes
			self._insertIntoIndexes(doc);

			// Check index overflow
			if (index > self._data.length) {
				index = self._data.length;
			}

			// Insert the document
			self._dataInsertAtIndex(index, doc);
		};

		if (!indexViolation) {
			if (self.willTrigger(self.TYPE_INSERT, self.PHASE_BEFORE) || self.willTrigger(self.TYPE_INSERT, self.PHASE_AFTER)) {
				triggerOperation = {
					type: 'insert'
				};

				if (self.processTrigger(triggerOperation, self.TYPE_INSERT, self.PHASE_BEFORE, {}, doc) !== false) {
					insertMethod(doc);

					if (self.willTrigger(self.TYPE_INSERT, self.PHASE_AFTER)) {
						// Clone the doc so that the programmer cannot update the internal document
						// on the "after" phase trigger
						newDoc = self.decouple(doc);

						self.processTrigger(triggerOperation, self.TYPE_INSERT, self.PHASE_AFTER, {}, newDoc);
					}
				} else {
					// The trigger just wants to cancel the operation
					return false;
				}
			} else {
				// No triggers to execute
				insertMethod(doc);
			}

			return true;
		} else {
			return 'Index violation in index: ' + indexViolation;
		}
	}

	return 'No document passed to insert';
};

/**
 * Inserts a document into the internal collection data array at
 * Inserts a document into the internal collection data array at
 * the specified index.
 * @param {number} index The index to insert at.
 * @param {object} doc The document to insert.
 * @private
 */
Collection.prototype._dataInsertAtIndex = function (index, doc) {
	this._data.splice(index, 0, doc);
};

/**
 * Removes a document from the internal collection data array at
 * the specified index.
 * @param {number} index The index to remove from.
 * @private
 */
Collection.prototype._dataRemoveAtIndex = function (index) {
	this._data.splice(index, 1);
};

/**
 * Replaces all data in the collection's internal data array with
 * the passed array of data.
 * @param {array} data The array of data to replace existing data with.
 * @private
 */
Collection.prototype._dataReplace = function (data) {
	// Clear the array - using a while loop with pop is by far the
	// fastest way to clear an array currently
	while (this._data.length) {
		this._data.pop();
	}

	// Append new items to the array
	this._data = this._data.concat(data);
};

/**
 * Inserts a document into the collection indexes.
 * @param {Object} doc The document to insert.
 * @private
 */
Collection.prototype._insertIntoIndexes = function (doc) {
	var arr = this._indexByName,
		arrIndex,
		violated,
		jString = JSON.stringify(doc);

	// Insert to primary key index
	violated = this._primaryIndex.uniqueSet(doc[this._primaryKey], doc);
	this._primaryCrc.uniqueSet(doc[this._primaryKey], jString);
	this._crcLookup.uniqueSet(jString, doc);

	// Insert into other indexes
	for (arrIndex in arr) {
		if (arr.hasOwnProperty(arrIndex)) {
			arr[arrIndex].insert(doc);
		}
	}

	return violated;
};

/**
 * Removes a document from the collection indexes.
 * @param {Object} doc The document to remove.
 * @private
 */
Collection.prototype._removeFromIndexes = function (doc) {
	var arr = this._indexByName,
		arrIndex,
		jString = JSON.stringify(doc);

	// Remove from primary key index
	this._primaryIndex.unSet(doc[this._primaryKey]);
	this._primaryCrc.unSet(doc[this._primaryKey]);
	this._crcLookup.unSet(jString);

	// Remove from other indexes
	for (arrIndex in arr) {
		if (arr.hasOwnProperty(arrIndex)) {
			arr[arrIndex].remove(doc);
		}
	}
};

/**
 * Updates collection index data for the passed document.
 * @param {Object} oldDoc The old document as it was before the update.
 * @param {Object} newDoc The document as it now is after the update.
 * @private
 */
Collection.prototype._updateIndexes = function (oldDoc, newDoc) {
	this._removeFromIndexes(oldDoc);
	this._insertIntoIndexes(newDoc);
};

/**
 * Rebuild collection indexes.
 * @private
 */
Collection.prototype._rebuildIndexes = function () {
	var arr = this._indexByName,
		arrIndex;

	// Remove from other indexes
	for (arrIndex in arr) {
		if (arr.hasOwnProperty(arrIndex)) {
			arr[arrIndex].rebuild();
		}
	}
};

/**
 * Uses the passed query to generate a new collection with results
 * matching the query parameters.
 *
 * @param {Object} query The query object to generate the subset with.
 * @param {Object=} options An options object.
 * @returns {*}
 */
Collection.prototype.subset = function (query, options) {
	var result = this.find(query, options);

	return new Collection()
		.subsetOf(this)
		.primaryKey(this._primaryKey)
		.setData(result);
};

/**
 * Gets / sets the collection that this collection is a subset of.
 * @param {Collection=} collection The collection to set as the parent of this subset.
 * @returns {Collection}
 */
Shared.synthesize(Collection.prototype, 'subsetOf');

/**
 * Checks if the collection is a subset of the passed collection.
 * @param {Collection} collection The collection to test against.
 * @returns {Boolean} True if the passed collection is the parent of
 * the current collection.
 */
Collection.prototype.isSubsetOf = function (collection) {
	return true;
};

/**
 * Find the distinct values for a specified field across a single collection and
 * returns the results in an array.
 * @param {String} key The field path to return distinct values for e.g. "person.name".
 * @param {Object=} query The query to use to filter the documents used to return values from.
 * @param {Object=} options The query options to use when running the query.
 * @returns {Array}
 */
Collection.prototype.distinct = function (key, query, options) {
	if (this._state === 'dropped') {
		throw('ForerunnerDB.Collection "' + this.name() + '": Cannot operate in a dropped state!');
	}

	var data = this.find(query, options),
		pathSolver = new Path(key),
		valueUsed = {},
		distinctValues = [],
		value,
		i;

	// Loop the data and build array of distinct values
	for (i = 0; i < data.length; i++) {
		value = pathSolver.value(data[i])[0];

		if (value && !valueUsed[value]) {
			valueUsed[value] = true;
			distinctValues.push(value);
		}
	}

	return distinctValues;
};

/**
 * Helper method to find a document by it's id.
 * @param {String} id The id of the document.
 * @param {Object=} options The options object, allowed keys are sort and limit.
 * @returns {Array} The items that were updated.
 */
Collection.prototype.findById = function (id, options) {
	var searchObj = {};
	searchObj[this._primaryKey] = id;
	return this.find(searchObj, options)[0];
};

/**
 * Finds all documents that contain the passed string or search object
 * regardless of where the string might occur within the document. This
 * will match strings from the start, middle or end of the document's
 * string (partial match).
 * @param search The string to search for. Case sensitive.
 * @param options A standard find() options object.
 * @returns {Array} An array of documents that matched the search string.
 */
Collection.prototype.peek = function (search, options) {
	// Loop all items
	var arr = this._data,
		arrCount = arr.length,
		arrIndex,
		arrItem,
		tempColl = new Collection(),
		typeOfSearch = typeof search;

	if (typeOfSearch === 'string') {
		for (arrIndex = 0; arrIndex < arrCount; arrIndex++) {
			// Get json representation of object
			arrItem = JSON.stringify(arr[arrIndex]);

			// Check if string exists in object json
			if (arrItem.indexOf(search) > -1) {
				// Add this item to the temp collection
				tempColl.insert(arr[arrIndex]);
			}
		}

		return tempColl.find({}, options);
	} else {
		return this.find(search, options);
	}
};

/**
 * Provides a query plan / operations log for a query.
 * @param {Object} query The query to execute.
 * @param {Object=} options Optional options object.
 * @returns {Object} The query plan.
 */
Collection.prototype.explain = function (query, options) {
	var result = this.find(query, options);
	return result.__fdbOp._data;
};

/**
 * Generates an options object with default values or adds default
 * values to a passed object if those values are not currently set
 * to anything.
 * @param {object=} obj Optional options object to modify.
 * @returns {object} The options object.
 */
Collection.prototype.options = function (obj) {
	obj = obj || {};
	obj.$decouple = obj.$decouple !== undefined ? obj.$decouple : true;
	obj.$explain = obj.$explain !== undefined ? obj.$explain : false;
	
	return obj;
};

/**
 * Queries the collection based on the query object passed.
 * @param {Object} query The query key/values that a document must match in
 * order for it to be returned in the result array.
 * @param {Object=} options An optional options object.
 * @param {Function=} callback !! DO NOT USE, THIS IS NON-OPERATIONAL !!
 * Optional callback. If specified the find process
 * will not return a value and will assume that you wish to operate under an
 * async mode. This will break up large find requests into smaller chunks and
 * process them in a non-blocking fashion allowing large datasets to be queried
 * without causing the browser UI to pause. Results from this type of operation
 * will be passed back to the callback once completed.
 *
 * @returns {Array} The results array from the find operation, containing all
 * documents that matched the query.
 */
Collection.prototype.find = function (query, options, callback) {
	if (callback) {
		// Check the size of the collection's data array

		// Split operation into smaller tasks and callback when complete
		callback('Callbacks for the find() operation are not yet implemented!', []);
		return [];
	}

	return this._find.apply(this, arguments);
};

Collection.prototype._find = function (query, options) {
	if (this._state === 'dropped') {
		throw('ForerunnerDB.Collection "' + this.name() + '": Cannot operate in a dropped state!');
	}

	// TODO: This method is quite long, break into smaller pieces
	query = query || {};
	options = this.options(options);

	var op = this._metrics.create('find'),
		pk = this.primaryKey(),
		self = this,
		analysis,
		scanLength,
		requiresTableScan = true,
		resultArr,
		joinCollectionIndex,
		joinIndex,
		joinCollection = {},
		joinQuery,
		joinPath,
		joinCollectionName,
		joinCollectionInstance,
		joinMatch,
		joinMatchIndex,
		joinSearch,
		joinMulti,
		joinRequire,
		joinFindResults,
		resultCollectionName,
		resultIndex,
		resultRemove = [],
		index,
		i, j, k,
		fieldListOn = [],
		fieldListOff = [],
		elemMatchPathSolver,
		elemMatchSubArr,
		elemMatchSpliceArr,
		matcherTmpOptions = {},
		result,
		cursor = {},
		matcher = function (doc) {
			return self._match(doc, query, 'and', matcherTmpOptions);
		};

	op.start();
	if (query) {
		// Get query analysis to execute best optimised code path
		op.time('analyseQuery');
		analysis = this._analyseQuery(self.decouple(query), options, op);
		op.time('analyseQuery');
		op.data('analysis', analysis);

		if (analysis.hasJoin && analysis.queriesJoin) {
			// The query has a join and tries to limit by it's joined data
			// Get an instance reference to the join collections
			op.time('joinReferences');
			for (joinIndex = 0; joinIndex < analysis.joinsOn.length; joinIndex++) {
				joinCollectionName = analysis.joinsOn[joinIndex];
				joinPath = new Path(analysis.joinQueries[joinCollectionName]);
				joinQuery = joinPath.value(query)[0];
				joinCollection[analysis.joinsOn[joinIndex]] = this._db.collection(analysis.joinsOn[joinIndex]).subset(joinQuery);

				// Remove join clause from main query
				delete query[analysis.joinQueries[joinCollectionName]];
			}
			op.time('joinReferences');
		}

		// Check if an index lookup can be used to return this result
		if (analysis.indexMatch.length && (!options || (options && !options.$skipIndex))) {
			op.data('index.potential', analysis.indexMatch);
			op.data('index.used', analysis.indexMatch[0].index);

			// Get the data from the index
			op.time('indexLookup');
			resultArr = analysis.indexMatch[0].lookup || [];
			op.time('indexLookup');

			// Check if the index coverage is all keys, if not we still need to table scan it
			if (analysis.indexMatch[0].keyData.totalKeyCount === analysis.indexMatch[0].keyData.score) {
				// Require a table scan to find relevant documents
				requiresTableScan = false;
			}
		} else {
			op.flag('usedIndex', false);
		}

		if (requiresTableScan) {
			if (resultArr && resultArr.length) {
				scanLength = resultArr.length;
				op.time('tableScan: ' + scanLength);
				// Filter the source data and return the result
				resultArr = resultArr.filter(matcher);
			} else {
				// Filter the source data and return the result
				scanLength = this._data.length;
				op.time('tableScan: ' + scanLength);
				resultArr = this._data.filter(matcher);
			}

			// Order the array if we were passed a sort clause
			if (options.$orderBy) {
				op.time('sort');
				resultArr = this.sort(options.$orderBy, resultArr);
				op.time('sort');
			}
			op.time('tableScan: ' + scanLength);
		}

		if (options.$page !== undefined && options.$limit !== undefined) {
			// Record paging data
			cursor.page = options.$page;
			cursor.pages = Math.ceil(resultArr.length / options.$limit);
			cursor.records = resultArr.length;

			// Check if we actually need to apply the paging logic
			if (options.$page && options.$limit > 0) {
				op.data('cursor', cursor);

				// Skip to the page specified based on limit
				resultArr.splice(0, options.$page * options.$limit);
			}
		}

		if (options.$skip) {
			cursor.skip = options.$skip;

			// Skip past the number of records specified
			resultArr.splice(0, options.$skip);
			op.data('skip', options.$skip);
		}

		if (options.$limit && resultArr && resultArr.length > options.$limit) {
			cursor.limit = options.$limit;

			resultArr.length = options.$limit;
			op.data('limit', options.$limit);
		}

		if (options.$decouple) {
			// Now decouple the data from the original objects
			op.time('decouple');
			resultArr = this.decouple(resultArr);
			op.time('decouple');
			op.data('flag.decouple', true);
		}

		// Now process any joins on the final data
		if (options.$join) {
			for (joinCollectionIndex = 0; joinCollectionIndex < options.$join.length; joinCollectionIndex++) {
				for (joinCollectionName in options.$join[joinCollectionIndex]) {
					if (options.$join[joinCollectionIndex].hasOwnProperty(joinCollectionName)) {
						// Set the key to store the join result in to the collection name by default
						resultCollectionName = joinCollectionName;

						// Get the join collection instance from the DB
						if (joinCollection[joinCollectionName]) {
							joinCollectionInstance = joinCollection[joinCollectionName];
						} else {
							joinCollectionInstance = this._db.collection(joinCollectionName);
						}

						// Get the match data for the join
						joinMatch = options.$join[joinCollectionIndex][joinCollectionName];

						// Loop our result data array
						for (resultIndex = 0; resultIndex < resultArr.length; resultIndex++) {
							// Loop the join conditions and build a search object from them
							joinSearch = {};
							joinMulti = false;
							joinRequire = false;
							for (joinMatchIndex in joinMatch) {
								if (joinMatch.hasOwnProperty(joinMatchIndex)) {
									// Check the join condition name for a special command operator
									if (joinMatchIndex.substr(0, 1) === '$') {
										// Special command
										switch (joinMatchIndex) {
											case '$as':
												// Rename the collection when stored in the result document
												resultCollectionName = joinMatch[joinMatchIndex];
												break;

											case '$multi':
												// Return an array of documents instead of a single matching document
												joinMulti = joinMatch[joinMatchIndex];
												break;

											case '$require':
												// Remove the result item if no matching join data is found
												joinRequire = joinMatch[joinMatchIndex];
												break;

											/*default:
											 // Check for a double-dollar which is a back-reference to the root collection item
											 if (joinMatchIndex.substr(0, 3) === '$$.') {
											 // Back reference
											 // TODO: Support complex joins
											 }
											 break;*/
										}
									} else {
										// TODO: Could optimise this by caching path objects
										// Get the data to match against and store in the search object
										joinSearch[joinMatchIndex] = new Path(joinMatch[joinMatchIndex]).value(resultArr[resultIndex])[0];
									}
								}
							}

							// Do a find on the target collection against the match data
							joinFindResults = joinCollectionInstance.find(joinSearch);

							// Check if we require a joined row to allow the result item
							if (!joinRequire || (joinRequire && joinFindResults[0])) {
								// Join is not required or condition is met
								resultArr[resultIndex][resultCollectionName] = joinMulti === false ? joinFindResults[0] : joinFindResults;
							} else {
								// Join required but condition not met, add item to removal queue
								resultRemove.push(resultArr[resultIndex]);
							}
						}
					}
				}
			}

			op.data('flag.join', true);
		}

		// Process removal queue
		if (resultRemove.length) {
			op.time('removalQueue');
			for (i = 0; i < resultRemove.length; i++) {
				index = resultArr.indexOf(resultRemove[i]);

				if (index > -1) {
					resultArr.splice(index, 1);
				}
			}
			op.time('removalQueue');
		}

		if (options.$transform) {
			op.time('transform');
			for (i = 0; i < resultArr.length; i++) {
				resultArr.splice(i, 1, options.$transform(resultArr[i]));
			}
			op.time('transform');
			op.data('flag.transform', true);
		}

		// Process transforms
		if (this._transformEnabled && this._transformOut) {
			op.time('transformOut');
			resultArr = this.transformOut(resultArr);
			op.time('transformOut');
		}

		op.data('results', resultArr.length);
	} else {
		resultArr = [];
	}

	// Generate a list of fields to limit data by
	// Each property starts off being enabled by default (= 1) then
	// if any property is explicitly specified as 1 then all switch to
	// zero except _id.
	//
	// Any that are explicitly set to zero are switched off.
	op.time('scanFields');
	for (i in options) {
		if (options.hasOwnProperty(i) && i.indexOf('$') !== 0) {
			if (options[i] === 1) {
				fieldListOn.push(i);
			} else if (options[i] === 0) {
				fieldListOff.push(i);
			}
		}
	}
	op.time('scanFields');

	// Limit returned fields by the options data
	if (fieldListOn.length || fieldListOff.length) {
		op.data('flag.limitFields', true);
		op.data('limitFields.on', fieldListOn);
		op.data('limitFields.off', fieldListOff);

		op.time('limitFields');

		// We have explicit fields switched on or off
		for (i = 0; i < resultArr.length; i++) {
			result = resultArr[i];

			for (j in result) {
				if (result.hasOwnProperty(j)) {
					if (fieldListOn.length) {
						// We have explicit fields switched on so remove all fields
						// that are not explicitly switched on

						// Check if the field name is not the primary key
						if (j !== pk) {
							if (fieldListOn.indexOf(j) === -1) {
								// This field is not in the on list, remove it
								delete result[j];
							}
						}
					}

					if (fieldListOff.length) {
						// We have explicit fields switched off so remove fields
						// that are explicitly switched off
						if (fieldListOff.indexOf(j) > -1) {
							// This field is in the off list, remove it
							delete result[j];
						}
					}
				}
			}
		}

		op.time('limitFields');
	}

	// Now run any projections on the data required
	if (options.$elemMatch) {
		op.data('flag.elemMatch', true);
		op.time('projection-elemMatch');

		for (i in options.$elemMatch) {
			if (options.$elemMatch.hasOwnProperty(i)) {
				elemMatchPathSolver = new Path(i);

				// Loop the results array
				for (j = 0; j < resultArr.length; j++) {
					elemMatchSubArr = elemMatchPathSolver.value(resultArr[j])[0];

					// Check we have a sub-array to loop
					if (elemMatchSubArr && elemMatchSubArr.length) {

						// Loop the sub-array and check for projection query matches
						for (k = 0; k < elemMatchSubArr.length; k++) {

							// Check if the current item in the sub-array matches the projection query
							if (self._match(elemMatchSubArr[k], options.$elemMatch[i], '', {})) {
								// The item matches the projection query so set the sub-array
								// to an array that ONLY contains the matching item and then
								// exit the loop since we only want to match the first item
								elemMatchPathSolver.set(resultArr[j], i, [elemMatchSubArr[k]]);
								break;
							}
						}
					}
				}
			}
		}

		op.time('projection-elemMatch');
	}

	if (options.$elemsMatch) {
		op.data('flag.elemsMatch', true);
		op.time('projection-elemsMatch');

		for (i in options.$elemsMatch) {
			if (options.$elemsMatch.hasOwnProperty(i)) {
				elemMatchPathSolver = new Path(i);

				// Loop the results array
				for (j = 0; j < resultArr.length; j++) {
					elemMatchSubArr = elemMatchPathSolver.value(resultArr[j])[0];

					// Check we have a sub-array to loop
					if (elemMatchSubArr && elemMatchSubArr.length) {
						elemMatchSpliceArr = [];

						// Loop the sub-array and check for projection query matches
						for (k = 0; k < elemMatchSubArr.length; k++) {

							// Check if the current item in the sub-array matches the projection query
							if (self._match(elemMatchSubArr[k], options.$elemsMatch[i], '', {})) {
								// The item matches the projection query so add it to the final array
								elemMatchSpliceArr.push(elemMatchSubArr[k]);
							}
						}

						// Now set the final sub-array to the matched items
						elemMatchPathSolver.set(resultArr[j], i, elemMatchSpliceArr);
					}
				}
			}
		}

		op.time('projection-elemsMatch');
	}

	op.stop();
	resultArr.__fdbOp = op;
	resultArr.$cursor = cursor;
	return resultArr;
};

/**
 * Returns one document that satisfies the specified query criteria. If multiple
 * documents satisfy the query, this method returns the first document to match
 * the query.
 * @returns {*}
 */
Collection.prototype.findOne = function () {
	return (this.find.apply(this, arguments))[0];
};

/**
 * Gets the index in the collection data array of the first item matched by
 * the passed query object.
 * @param {Object} query The query to run to find the item to return the index of.
 * @returns {Number}
 */
Collection.prototype.indexOf = function (query) {
	var item = this.find(query, {$decouple: false})[0];

	if (item) {
		return this._data.indexOf(item);
	} else {
		return -1;
	}
};

/**
 * Returns the index of the document identified by the passed item's primary key.
 * @param {*} item The document whose primary key should be used to lookup or the id
 * to lookup.
 * @returns {Number} The index the item with the matching primary key is occupying.
 */
Collection.prototype.indexOfDocById = function (item) {
	if (typeof item !== 'object') {
		return this._data.indexOf(
			this._primaryIndex.get(item)
		);
	} else {
		return this._data.indexOf(
			this._primaryIndex.get(
				item[this._primaryKey]
			)
		);
	}
};

/**
 * Removes a document from the collection by it's index in the collection's
 * data array.
 * @param {Number} index The index of the document to remove.
 * @returns {Object} The document that has been removed or false if none was
 * removed.
 */
Collection.prototype.removeByIndex = function (index) {
	var doc,
		docId;

	doc = this._data[index];

	if (doc !== undefined) {
		doc = this.decouple(doc);
		docId = doc[this.primaryKey()];

		return this.removeById(docId);
	}

	return false;
};

/**
 * Gets / sets the collection transform options.
 * @param {Object} obj A collection transform options object.
 * @returns {*}
 */
Collection.prototype.transform = function (obj) {
	if (obj !== undefined) {
		if (typeof obj === "object") {
			if (obj.enabled !== undefined) {
				this._transformEnabled = obj.enabled;
			}

			if (obj.dataIn !== undefined) {
				this._transformIn = obj.dataIn;
			}

			if (obj.dataOut !== undefined) {
				this._transformOut = obj.dataOut;
			}
		} else {
			this._transformEnabled = obj !== false;
		}

		return this;
	}

	return {
		enabled: this._transformEnabled,
		dataIn: this._transformIn,
		dataOut: this._transformOut
	};
};

/**
 * Transforms data using the set transformIn method.
 * @param {Object} data The data to transform.
 * @returns {*}
 */
Collection.prototype.transformIn = function (data) {
	if (this._transformEnabled && this._transformIn) {
		if (data instanceof Array) {
			var finalArr = [], i;

			for (i = 0; i < data.length; i++) {
				finalArr[i] = this._transformIn(data[i]);
			}

			return finalArr;
		} else {
			return this._transformIn(data);
		}
	}

	return data;
};

/**
 * Transforms data using the set transformOut method.
 * @param {Object} data The data to transform.
 * @returns {*}
 */
Collection.prototype.transformOut = function (data) {
	if (this._transformEnabled && this._transformOut) {
		if (data instanceof Array) {
			var finalArr = [], i;

			for (i = 0; i < data.length; i++) {
				finalArr[i] = this._transformOut(data[i]);
			}

			return finalArr;
		} else {
			return this._transformOut(data);
		}
	}

	return data;
};

/**
 * Sorts an array of documents by the given sort path.
 * @param {*} sortObj The keys and orders the array objects should be sorted by.
 * @param {Array} arr The array of documents to sort.
 * @returns {Array}
 */
Collection.prototype.sort = function (sortObj, arr) {
	// Make sure we have an array object
	arr = arr || [];

	var	sortArr = [],
		sortKey,
		sortSingleObj;

	for (sortKey in sortObj) {
		if (sortObj.hasOwnProperty(sortKey)) {
			sortSingleObj = {};
			sortSingleObj[sortKey] = sortObj[sortKey];
			sortSingleObj.___fdbKey = sortKey;
			sortArr.push(sortSingleObj);
		}
	}

	if (sortArr.length < 2) {
		// There is only one sort criteria, do a simple sort and return it
		return this._sort(sortObj, arr);
	} else {
		return this._bucketSort(sortArr, arr);
	}
};

/**
 * Takes array of sort paths and sorts them into buckets before returning final
 * array fully sorted by multi-keys.
 * @param keyArr
 * @param arr
 * @returns {*}
 * @private
 */
Collection.prototype._bucketSort = function (keyArr, arr) {
	var keyObj = keyArr.shift(),
		arrCopy,
		buckets,
		i,
		finalArr = [];

	if (keyArr.length > 0) {
		// Sort array by bucket key
		arr = this._sort(keyObj, arr);

		// Split items into buckets
		buckets = this.bucket(keyObj.___fdbKey, arr);

		// Loop buckets and sort contents
		for (i in buckets) {
			if (buckets.hasOwnProperty(i)) {
				arrCopy = [].concat(keyArr);
				finalArr = finalArr.concat(this._bucketSort(arrCopy, buckets[i]));
			}
		}

		return finalArr;
	} else {
		return this._sort(keyObj, arr);
	}
};

/**
 * Sorts array by individual sort path.
 * @param key
 * @param arr
 * @returns {Array|*}
 * @private
 */
Collection.prototype._sort = function (key, arr) {
	var self = this,
		sorterMethod,
		pathSolver = new Path(),
		dataPath = pathSolver.parse(key, true)[0];

	pathSolver.path(dataPath.path);

	if (dataPath.value === 1) {
		// Sort ascending
		sorterMethod = function (a, b) {
			var valA = pathSolver.value(a)[0],
				valB = pathSolver.value(b)[0];

			return self.sortAsc(valA, valB);
		};
	} else if (dataPath.value === -1) {
		// Sort descending
		sorterMethod = function (a, b) {
			var valA = pathSolver.value(a)[0],
				valB = pathSolver.value(b)[0];

			return self.sortDesc(valA, valB);
		};
	} else {
		throw('ForerunnerDB.Collection "' + this.name() + '": $orderBy clause has invalid direction: ' + dataPath.value + ', accepted values are 1 or -1 for ascending or descending!');
	}

	return arr.sort(sorterMethod);
};

/**
 * Takes an array of objects and returns a new object with the array items
 * split into buckets by the passed key.
 * @param {String} key The key to split the array into buckets by.
 * @param {Array} arr An array of objects.
 * @returns {Object}
 */
Collection.prototype.bucket = function (key, arr) {
	var i,
		buckets = {};

	for (i = 0; i < arr.length; i++) {
		buckets[arr[i][key]] = buckets[arr[i][key]] || [];
		buckets[arr[i][key]].push(arr[i]);
	}

	return buckets;
};

/**
 * Internal method that takes a search query and options and returns an object
 * containing details about the query which can be used to optimise the search.
 *
 * @param query
 * @param options
 * @param op
 * @returns {Object}
 * @private
 */
Collection.prototype._analyseQuery = function (query, options, op) {
	var analysis = {
			queriesOn: [this._name],
			indexMatch: [],
			hasJoin: false,
			queriesJoin: false,
			joinQueries: {},
			query: query,
			options: options
		},
		joinCollectionIndex,
		joinCollectionName,
		joinCollections = [],
		joinCollectionReferences = [],
		queryPath,
		index,
		indexMatchData,
		indexRef,
		indexRefName,
		indexLookup,
		pathSolver,
		queryKeyCount,
		i;

	// Check if the query is a primary key lookup
	op.time('checkIndexes');
	pathSolver = new Path();
	queryKeyCount = pathSolver.countKeys(query);

	if (queryKeyCount) {
		if (query[this._primaryKey] !== undefined) {
			// Return item via primary key possible
			op.time('checkIndexMatch: Primary Key');
			analysis.indexMatch.push({
				lookup: this._primaryIndex.lookup(query, options),
				keyData: {
					matchedKeys: [this._primaryKey],
					totalKeyCount: queryKeyCount,
					score: 1
				},
				index: this._primaryIndex
			});
			op.time('checkIndexMatch: Primary Key');
		}

		// Check if an index can speed up the query
		for (i in this._indexById) {
			if (this._indexById.hasOwnProperty(i)) {
				indexRef = this._indexById[i];
				indexRefName = indexRef.name();

				op.time('checkIndexMatch: ' + indexRefName);
				indexMatchData = indexRef.match(query, options);

				if (indexMatchData.score > 0) {
					// This index can be used, store it
					indexLookup = indexRef.lookup(query, options);

					analysis.indexMatch.push({
						lookup: indexLookup,
						keyData: indexMatchData,
						index: indexRef
					});
				}
				op.time('checkIndexMatch: ' + indexRefName);

				if (indexMatchData.score === queryKeyCount) {
					// Found an optimal index, do not check for any more
					break;
				}
			}
		}
		op.time('checkIndexes');

		// Sort array descending on index key count (effectively a measure of relevance to the query)
		if (analysis.indexMatch.length > 1) {
			op.time('findOptimalIndex');
			analysis.indexMatch.sort(function (a, b) {
				if (a.keyData.score > b.keyData.score) {
					// This index has a higher score than the other
					return -1;
				}

				if (a.keyData.score < b.keyData.score) {
					// This index has a lower score than the other
					return 1;
				}

				// The indexes have the same score but can still be compared by the number of records
				// they return from the query. The fewer records they return the better so order by
				// record count
				if (a.keyData.score === b.keyData.score) {
					return a.lookup.length - b.lookup.length;
				}
			});
			op.time('findOptimalIndex');
		}
	}

	// Check for join data
	if (options.$join) {
		analysis.hasJoin = true;

		// Loop all join operations
		for (joinCollectionIndex = 0; joinCollectionIndex < options.$join.length; joinCollectionIndex++) {
			// Loop the join collections and keep a reference to them
			for (joinCollectionName in options.$join[joinCollectionIndex]) {
				if (options.$join[joinCollectionIndex].hasOwnProperty(joinCollectionName)) {
					joinCollections.push(joinCollectionName);

					// Check if the join uses an $as operator
					if ('$as' in options.$join[joinCollectionIndex][joinCollectionName]) {
						joinCollectionReferences.push(options.$join[joinCollectionIndex][joinCollectionName].$as);
					} else {
						joinCollectionReferences.push(joinCollectionName);
					}
				}
			}
		}

		// Loop the join collection references and determine if the query references
		// any of the collections that are used in the join. If there no queries against
		// joined collections the find method can use a code path optimised for this.
		// Queries against joined collections requires the joined collections to be filtered
		// first and then joined so requires a little more work.
		for (index = 0; index < joinCollectionReferences.length; index++) {
			// Check if the query references any collection data that the join will create
			queryPath = this._queryReferencesCollection(query, joinCollectionReferences[index], '');

			if (queryPath) {
				analysis.joinQueries[joinCollections[index]] = queryPath;
				analysis.queriesJoin = true;
			}
		}

		analysis.joinsOn = joinCollections;
		analysis.queriesOn = analysis.queriesOn.concat(joinCollections);
	}

	return analysis;
};

/**
 * Checks if the passed query references this collection.
 * @param query
 * @param collection
 * @param path
 * @returns {*}
 * @private
 */
Collection.prototype._queryReferencesCollection = function (query, collection, path) {
	var i;

	for (i in query) {
		if (query.hasOwnProperty(i)) {
			// Check if this key is a reference match
			if (i === collection) {
				if (path) { path += '.'; }
				return path + i;
			} else {
				if (typeof(query[i]) === 'object') {
					// Recurse
					if (path) { path += '.'; }
					path += i;
					return this._queryReferencesCollection(query[i], collection, path);
				}
			}
		}
	}

	return false;
};

/**
 * Returns the number of documents currently in the collection.
 * @returns {Number}
 */
Collection.prototype.count = function (query, options) {
	if (!query) {
		return this._data.length;
	} else {
		// Run query and return count
		return this.find(query, options).length;
	}
};

/**
 * Finds sub-documents from the collection's documents.
 * @param {Object} match The query object to use when matching parent documents
 * from which the sub-documents are queried.
 * @param {String} path The path string used to identify the key in which
 * sub-documents are stored in parent documents.
 * @param {Object=} subDocQuery The query to use when matching which sub-documents
 * to return.
 * @param {Object=} subDocOptions The options object to use when querying for
 * sub-documents.
 * @returns {*}
 */
Collection.prototype.findSub = function (match, path, subDocQuery, subDocOptions) {
	var pathHandler = new Path(path),
		docArr = this.find(match),
		docCount = docArr.length,
		docIndex,
		subDocArr,
		subDocCollection = this._db.collection('__FDB_temp_' + this.objectId()),
		subDocResults,
		resultObj = {
			parents: docCount,
			subDocTotal: 0,
			subDocs: [],
			pathFound: false,
			err: ''
		};

	subDocOptions = subDocOptions || {};

	for (docIndex = 0; docIndex < docCount; docIndex++) {
		subDocArr = pathHandler.value(docArr[docIndex])[0];
		if (subDocArr) {
			subDocCollection.setData(subDocArr);
			subDocResults = subDocCollection.find(subDocQuery, subDocOptions);
			if (subDocOptions.returnFirst && subDocResults.length) {
				return subDocResults[0];
			}

			if (subDocOptions.$split) {
				resultObj.subDocs.push(subDocResults);
			} else {
				resultObj.subDocs = resultObj.subDocs.concat(subDocResults);
			}

			resultObj.subDocTotal += subDocResults.length;
			resultObj.pathFound = true;
		}
	}

	// Drop the sub-document collection
	subDocCollection.drop();

	// Check if the call should not return stats, if so return only subDocs array
	if (subDocOptions.$stats) {
		return resultObj;
	} else {
		return resultObj.subDocs;
	}

	if (!resultObj.pathFound) {
		resultObj.err = 'No objects found in the parent documents with a matching path of: ' + path;
	}

	return resultObj;
};

/**
 * Checks that the passed document will not violate any index rules if
 * inserted into the collection.
 * @param {Object} doc The document to check indexes against.
 * @returns {Boolean} Either false (no violation occurred) or true if
 * a violation was detected.
 */
Collection.prototype.insertIndexViolation = function (doc) {
	var indexViolated,
		arr = this._indexByName,
		arrIndex,
		arrItem;

	// Check the item's primary key is not already in use
	if (this._primaryIndex.get(doc[this._primaryKey])) {
		indexViolated = this._primaryIndex;
	} else {
		// Check violations of other indexes
		for (arrIndex in arr) {
			if (arr.hasOwnProperty(arrIndex)) {
				arrItem = arr[arrIndex];

				if (arrItem.unique()) {
					if (arrItem.violation(doc)) {
						indexViolated = arrItem;
						break;
					}
				}
			}
		}
	}

	return indexViolated ? indexViolated.name() : false;
};

/**
 * Creates an index on the specified keys.
 * @param {Object} keys The object containing keys to index.
 * @param {Object} options An options object.
 * @returns {*}
 */
Collection.prototype.ensureIndex = function (keys, options) {
	if (this._state === 'dropped') {
		throw('ForerunnerDB.Collection "' + this.name() + '": Cannot operate in a dropped state!');
	}

	this._indexByName = this._indexByName || {};
	this._indexById = this._indexById || {};

	var index,
		time = {
			start: new Date().getTime()
		};

	if (options) {
		switch (options.type) {
			case 'hashed':
				index = new IndexHashMap(keys, options, this);
				break;

			case 'btree':
				index = new IndexBinaryTree(keys, options, this);
				break;

			default:
				// Default
				index = new IndexHashMap(keys, options, this);
				break;
		}
	} else {
		// Default
		index = new IndexHashMap(keys, options, this);
	}

	// Check the index does not already exist
	if (this._indexByName[index.name()]) {
		// Index already exists
		return {
			err: 'Index with that name already exists'
		};
	}

	if (this._indexById[index.id()]) {
		// Index already exists
		return {
			err: 'Index with those keys already exists'
		};
	}

	// Create the index
	index.rebuild();

	// Add the index
	this._indexByName[index.name()] = index;
	this._indexById[index.id()] = index;

	time.end = new Date().getTime();
	time.total = time.end - time.start;

	this._lastOp = {
		type: 'ensureIndex',
		stats: {
			time: time
		}
	};

	return {
		index: index,
		id: index.id(),
		name: index.name(),
		state: index.state()
	};
};

/**
 * Gets an index by it's name.
 * @param {String} name The name of the index to retreive.
 * @returns {*}
 */
Collection.prototype.index = function (name) {
	if (this._indexByName) {
		return this._indexByName[name];
	}
};

/**
 * Gets the last reporting operation's details such as run time.
 * @returns {Object}
 */
Collection.prototype.lastOp = function () {
	return this._metrics.list();
};

/**
 * Generates a difference object that contains insert, update and remove arrays
 * representing the operations to execute to make this collection have the same
 * data as the one passed.
 * @param {Collection} collection The collection to diff against.
 * @returns {{}}
 */
Collection.prototype.diff = function (collection) {
	var diff = {
		insert: [],
		update: [],
		remove: []
	};

	var pm = this.primaryKey(),
		arr,
		arrIndex,
		arrItem,
		arrCount;

	// Check if the primary key index of each collection can be utilised
	if (pm !== collection.primaryKey()) {
		throw('ForerunnerDB.Collection "' + this.name() + '": Collection diffing requires that both collections have the same primary key!');
	}

	// Use the collection primary key index to do the diff (super-fast)
	arr = collection._data;

	// Check if we have an array or another collection
	while (arr && !(arr instanceof Array)) {
		// We don't have an array, assign collection and get data
		collection = arr;
		arr = collection._data;
	}

	arrCount = arr.length;

	// Loop the collection's data array and check for matching items
	for (arrIndex = 0; arrIndex < arrCount; arrIndex++) {
		arrItem = arr[arrIndex];

		// Check for a matching item in this collection
		if (this._primaryIndex.get(arrItem[pm])) {
			// Matching item exists, check if the data is the same
			if (this._primaryCrc.get(arrItem[pm]) !== collection._primaryCrc.get(arrItem[pm])) {
				// The documents exist in both collections but data differs, update required
				diff.update.push(arrItem);
			}
		} else {
			// The document is missing from this collection, insert required
			diff.insert.push(arrItem);
		}
	}

	// Now loop this collection's data and check for matching items
	arr = this._data;
	arrCount = arr.length;

	for (arrIndex = 0; arrIndex < arrCount; arrIndex++) {
		arrItem = arr[arrIndex];

		if (!collection._primaryIndex.get(arrItem[pm])) {
			// The document does not exist in the other collection, remove required
			diff.remove.push(arrItem);
		}
	}

	return diff;
};

Collection.prototype.collateAdd = new Overload({
	/**
	 * Adds a data source to collate data from and specifies the
	 * key name to collate data to.
	 * @func collateAdd
	 * @memberof Collection
	 * @param {Collection} collection The collection to collate data from.
	 * @param {String=} keyName Optional name of the key to collate data to.
	 * If none is provided the record CRUD is operated on the root collection
	 * data.
	 */
	'object, string': function (collection, keyName) {
		var self = this;

		self.collateAdd(collection, function (packet) {
			var obj1,
				obj2;

			switch (packet.type) {
				case 'insert':
					if (keyName) {
						obj1 = {
							$push: {}
						};

						obj1.$push[keyName] = self.decouple(packet.data);
						self.update({}, obj1);
					} else {
						self.insert(packet.data);
					}
					break;

				case 'update':
					if (keyName) {
						obj1 = {};
						obj2 = {};

						obj1[keyName] = packet.data.query;
						obj2[keyName + '.$'] = packet.data.update;

						self.update(obj1, obj2);
					} else {
						self.update(packet.data.query, packet.data.update);
					}
					break;

				case 'remove':
					if (keyName) {
						obj1 = {
							$pull: {}
						};

						obj1.$pull[keyName] = {};
						obj1.$pull[keyName][self.primaryKey()] = packet.data.dataSet[0][collection.primaryKey()];

						self.update({}, obj1);
					} else {
						self.remove(packet.data);
					}
					break;

				default:
			}
		});
	},

	/**
	 * Adds a data source to collate data from and specifies a process
	 * method that will handle the collation functionality (for custom
	 * collation).
	 * @func collateAdd
	 * @memberof Collection
	 * @param {Collection} collection The collection to collate data from.
	 * @param {Function} process The process method.
	 */
	'object, function': function (collection, process) {
		if (typeof collection === 'string') {
			// The collection passed is a name, not a reference so get
			// the reference from the name
			collection = this._db.collection(collection, {
				autoCreate: false,
				throwError: false
			});
		}

		if (collection) {
			this._collate = this._collate || {};
			this._collate[collection.name()] = new ReactorIO(collection, this, process);

			return this;
		} else {
			throw('Cannot collate from a non-existent collection!');
		}
	}
});

Collection.prototype.collateRemove = function (collection) {
	if (typeof collection === 'object') {
		// We need to have the name of the collection to remove it
		collection = collection.name();
	}

	if (collection) {
		// Drop the reactor IO chain node
		this._collate[collection].drop();

		// Remove the collection data from the collate object
		delete this._collate[collection];

		return this;
	} else {
		throw('No collection name passed to collateRemove() or collection not found!');
	}
};

Db.prototype.collection = new Overload({
	/**
	 * Get a collection by name. If the collection does not already exist
	 * then one is created for that name automatically.
	 * @func collection
	 * @memberof Db
	 * @param {Object} options An options object.
	 * @returns {Collection}
	 */
	'object': function (options) {
		return this.$main.call(this, options);
	},

	/**
	 * Get a collection by name. If the collection does not already exist
	 * then one is created for that name automatically.
	 * @func collection
	 * @memberof Db
	 * @param {String} collectionName The name of the collection.
	 * @returns {Collection}
	 */
	'string': function (collectionName) {
		return this.$main.call(this, {
			name: collectionName
		});
	},

	/**
	 * Get a collection by name. If the collection does not already exist
	 * then one is created for that name automatically.
	 * @func collection
	 * @memberof Db
	 * @param {String} collectionName The name of the collection.
	 * @param {String} primaryKey Optional primary key to specify the primary key field on the collection
	 * objects. Defaults to "_id".
	 * @returns {Collection}
	 */
	'string, string': function (collectionName, primaryKey) {
		return this.$main.call(this, {
			name: collectionName,
			primaryKey: primaryKey
		});
	},

	/**
	 * Get a collection by name. If the collection does not already exist
	 * then one is created for that name automatically.
	 * @func collection
	 * @memberof Db
	 * @param {String} collectionName The name of the collection.
	 * @param {Object} options An options object.
	 * @returns {Collection}
	 */
	'string, object': function (collectionName, options) {
		options.name = collectionName;

		return this.$main.call(this, options);
	},

	/**
	 * Get a collection by name. If the collection does not already exist
	 * then one is created for that name automatically.
	 * @func collection
	 * @memberof Db
	 * @param {String} collectionName The name of the collection.
	 * @param {String} primaryKey Optional primary key to specify the primary key field on the collection
	 * objects. Defaults to "_id".
	 * @param {Object} options An options object.
	 * @returns {Collection}
	 */
	'string, string, object': function (collectionName, primaryKey, options) {
		options.name = collectionName;
		options.primaryKey = primaryKey;

		return this.$main.call(this, options);
	},

	/**
	 * The main handler method. This gets called by all the other variants and
	 * handles the actual logic of the overloaded method.
	 * @func collection
	 * @memberof Db
	 * @param {Object} options An options object.
	 * @returns {*}
	 */
	'$main': function (options) {
		var name = options.name;

		if (name) {
			if (!this._collection[name]) {
				if (options && options.autoCreate === false) {
					if (options && options.throwError !== false) {
						throw('ForerunnerDB.Db "' + this.name() + '": Cannot get collection ' + name + ' because it does not exist and auto-create has been disabled!');
					}
				}

				if (this.debug()) {
					console.log('Creating collection ' + name);
				}
			}

			this._collection[name] = this._collection[name] || new Collection(name).db(this);

			if (options.primaryKey !== undefined) {
				this._collection[name].primaryKey(options.primaryKey);
			}

			return this._collection[name];
		} else {
			if (!options || (options && options.throwError !== false)) {
				throw('ForerunnerDB.Db "' + this.name() + '": Cannot get collection with undefined name!');
			}
		}
	}
});

/**
 * Determine if a collection with the passed name already exists.
 * @memberof Db
 * @param {String} viewName The name of the collection to check for.
 * @returns {boolean}
 */
Db.prototype.collectionExists = function (viewName) {
	return Boolean(this._collection[viewName]);
};

/**
 * Returns an array of collections the DB currently has.
 * @memberof Db
 * @param {String|RegExp=} search The optional search string or regular expression to use
 * to match collection names against.
 * @returns {Array} An array of objects containing details of each collection
 * the database is currently managing.
 */
Db.prototype.collections = function (search) {
	var arr = [],
		i;

	if (search) {
		if (!(search instanceof RegExp)) {
			// Turn the search into a regular expression
			search = new RegExp(search);
		}
	}

	for (i in this._collection) {
		if (this._collection.hasOwnProperty(i)) {
			if (search) {
				if (search.exec(i)) {
					arr.push({
						name: i,
						count: this._collection[i].count()
					});
				}
			} else {
				arr.push({
					name: i,
					count: this._collection[i].count()
				});
			}
		}
	}

	arr.sort(function (a, b) {
		return a.name.localeCompare(b.name);
	});

	return arr;
};

Shared.finishModule('Collection');
module.exports = Collection;
},{"./Crc":7,"./IndexBinaryTree":12,"./IndexHashMap":13,"./KeyValueStore":14,"./Metrics":15,"./Overload":27,"./Path":29,"./ReactorIO":31,"./Shared":33}],5:[function(_dereq_,module,exports){
"use strict";

// Import external names locally
var Shared,
	Db,
	DbInit,
	Collection;

Shared = _dereq_('./Shared');

/**
 * Creates a new collection group. Collection groups allow single operations to be
 * propagated to multiple collections at once. CRUD operations against a collection
 * group are in fed to the group's collections. Useful when separating out slightly
 * different data into multiple collections but querying as one collection.
 * @constructor
 */
var CollectionGroup = function () {
	this.init.apply(this, arguments);
};

CollectionGroup.prototype.init = function (name) {
	var self = this;

	self._name = name;
	self._data = new Collection('__FDB__cg_data_' + self._name);
	self._collections = [];
	self._view = [];
};

Shared.addModule('CollectionGroup', CollectionGroup);
Shared.mixin(CollectionGroup.prototype, 'Mixin.Common');
Shared.mixin(CollectionGroup.prototype, 'Mixin.ChainReactor');
Shared.mixin(CollectionGroup.prototype, 'Mixin.Constants');
Shared.mixin(CollectionGroup.prototype, 'Mixin.Triggers');

Collection = _dereq_('./Collection');
Db = Shared.modules.Db;
DbInit = Shared.modules.Db.prototype.init;

CollectionGroup.prototype.on = function () {
	this._data.on.apply(this._data, arguments);
};

CollectionGroup.prototype.off = function () {
	this._data.off.apply(this._data, arguments);
};

CollectionGroup.prototype.emit = function () {
	this._data.emit.apply(this._data, arguments);
};

/**
 * Gets / sets the primary key for this collection group.
 * @param {String=} keyName The name of the primary key.
 * @returns {*}
 */
CollectionGroup.prototype.primaryKey = function (keyName) {
	if (keyName !== undefined) {
		this._primaryKey = keyName;
		return this;
	}

	return this._primaryKey;
};

/**
 * Gets / sets the current state.
 * @param {String=} val The name of the state to set.
 * @returns {*}
 */
Shared.synthesize(CollectionGroup.prototype, 'state');

/**
 * Gets / sets the db instance the collection group belongs to.
 * @param {Db=} db The db instance.
 * @returns {*}
 */
Shared.synthesize(CollectionGroup.prototype, 'db');

CollectionGroup.prototype.addCollection = function (collection) {
	if (collection) {
		if (this._collections.indexOf(collection) === -1) {
			//var self = this;

			// Check for compatible primary keys
			if (this._collections.length) {
				if (this._primaryKey !== collection.primaryKey()) {
					throw('ForerunnerDB.CollectionGroup "' + this.name() + '": All collections in a collection group must have the same primary key!');
				}
			} else {
				// Set the primary key to the first collection added
				this.primaryKey(collection.primaryKey());
			}

			// Add the collection
			this._collections.push(collection);
			collection._groups = collection._groups || [];
			collection._groups.push(this);
			collection.chain(this);

			// Hook the collection's drop event to destroy group data
			collection.on('drop', function () {
				// Remove collection from any group associations
				if (collection._groups && collection._groups.length) {
					var groupArr = [],
						i;

					// Copy the group array because if we call removeCollection on a group
					// it will alter the groups array of this collection mid-loop!
					for (i = 0; i < collection._groups.length; i++) {
						groupArr.push(collection._groups[i]);
					}

					// Loop any groups we are part of and remove ourselves from them
					for (i = 0; i < groupArr.length; i++) {
						collection._groups[i].removeCollection(collection);
					}
				}

				delete collection._groups;
			});

			// Add collection's data
			this._data.insert(collection.find());
		}
	}

	return this;
};

CollectionGroup.prototype.removeCollection = function (collection) {
	if (collection) {
		var collectionIndex = this._collections.indexOf(collection),
			groupIndex;

		if (collectionIndex !== -1) {
			collection.unChain(this);
			this._collections.splice(collectionIndex, 1);

			collection._groups = collection._groups || [];
			groupIndex = collection._groups.indexOf(this);

			if (groupIndex !== -1) {
				collection._groups.splice(groupIndex, 1);
			}

			collection.off('drop');
		}

		if (this._collections.length === 0) {
			// Wipe the primary key
			delete this._primaryKey;
		}
	}

	return this;
};

CollectionGroup.prototype._chainHandler = function (chainPacket) {
	//sender = chainPacket.sender;
	switch (chainPacket.type) {
		case 'setData':
			// Decouple the data to ensure we are working with our own copy
			chainPacket.data = this.decouple(chainPacket.data);

			// Remove old data
			this._data.remove(chainPacket.options.oldData);

			// Add new data
			this._data.insert(chainPacket.data);
			break;

		case 'insert':
			// Decouple the data to ensure we are working with our own copy
			chainPacket.data = this.decouple(chainPacket.data);

			// Add new data
			this._data.insert(chainPacket.data);
			break;

		case 'update':
			// Update data
			this._data.update(chainPacket.data.query, chainPacket.data.update, chainPacket.options);
			break;

		case 'remove':
			this._data.remove(chainPacket.data.query, chainPacket.options);
			break;

		default:
			break;
	}
};

CollectionGroup.prototype.insert = function () {
	this._collectionsRun('insert', arguments);
};

CollectionGroup.prototype.update = function () {
	this._collectionsRun('update', arguments);
};

CollectionGroup.prototype.updateById = function () {
	this._collectionsRun('updateById', arguments);
};

CollectionGroup.prototype.remove = function () {
	this._collectionsRun('remove', arguments);
};

CollectionGroup.prototype._collectionsRun = function (type, args) {
	for (var i = 0; i < this._collections.length; i++) {
		this._collections[i][type].apply(this._collections[i], args);
	}
};

CollectionGroup.prototype.find = function (query, options) {
	return this._data.find(query, options);
};

/**
 * Helper method that removes a document that matches the given id.
 * @param {String} id The id of the document to remove.
 */
CollectionGroup.prototype.removeById = function (id) {
	// Loop the collections in this group and apply the remove
	for (var i = 0; i < this._collections.length; i++) {
		this._collections[i].removeById(id);
	}
};

/**
 * Uses the passed query to generate a new collection with results
 * matching the query parameters.
 *
 * @param query
 * @param options
 * @returns {*}
 */
CollectionGroup.prototype.subset = function (query, options) {
	var result = this.find(query, options);

	return new Collection()
		.subsetOf(this)
		.primaryKey(this._primaryKey)
		.setData(result);
};

/**
 * Drops a collection group from the database.
 * @returns {boolean} True on success, false on failure.
 */
CollectionGroup.prototype.drop = function () {
	if (this._state !== 'dropped') {
		var i,
			collArr,
			viewArr;

		if (this._debug) {
			console.log('Dropping collection group ' + this._name);
		}

		this._state = 'dropped';

		if (this._collections && this._collections.length) {
			collArr = [].concat(this._collections);

			for (i = 0; i < collArr.length; i++) {
				this.removeCollection(collArr[i]);
			}
		}

		if (this._view && this._view.length) {
			viewArr = [].concat(this._view);

			for (i = 0; i < viewArr.length; i++) {
				this._removeView(viewArr[i]);
			}
		}

		this.emit('drop', this);
	}

	return true;
};

// Extend DB to include collection groups
Db.prototype.init = function () {
	this._collectionGroup = {};
	DbInit.apply(this, arguments);
};

Db.prototype.collectionGroup = function (collectionGroupName) {
	if (collectionGroupName) {
		this._collectionGroup[collectionGroupName] = this._collectionGroup[collectionGroupName] || new CollectionGroup(collectionGroupName).db(this);
		return this._collectionGroup[collectionGroupName];
	} else {
		// Return an object of collection data
		return this._collectionGroup;
	}
};

/**
 * Returns an array of collection groups the DB currently has.
 * @returns {Array} An array of objects containing details of each collection group
 * the database is currently managing.
 */
Db.prototype.collectionGroups = function () {
	var arr = [],
		i;

	for (i in this._collectionGroup) {
		if (this._collectionGroup.hasOwnProperty(i)) {
			arr.push({
				name: i
			});
		}
	}

	return arr;
};

module.exports = CollectionGroup;
},{"./Collection":4,"./Shared":33}],6:[function(_dereq_,module,exports){
/*
 License

 Copyright (c) 2015 Irrelon Software Limited
 http://www.irrelon.com
 http://www.forerunnerdb.com

 Please visit the license page to see latest license information:
 http://www.forerunnerdb.com/licensing.html
 */
"use strict";

var Shared,
	Db,
	Metrics,
	Overload;

Shared = _dereq_('./Shared');
Overload = _dereq_('./Overload');

/**
 * Creates a new ForerunnerDB instance. Core instances handle the lifecycle of
 * multiple database instances.
 * @constructor
 */
var Core = function (name) {
	this.init.apply(this, arguments);
};

Core.prototype.init = function (name) {
	this._db = {};
	this._debug = {};
	this._name = name || 'ForerunnerDB';
};

Core.prototype.moduleLoaded = new Overload({
	/**
	 * Checks if a module has been loaded into the database.
	 * @func moduleLoaded
	 * @memberof Core
	 * @param {String} moduleName The name of the module to check for.
	 * @returns {Boolean} True if the module is loaded, false if not.
	 */
	'string': function (moduleName) {
		if (moduleName !== undefined) {
			moduleName = moduleName.replace(/ /g, '');

			var modules = moduleName.split(','),
				index;

			for (index = 0; index < modules.length; index++) {
				if (!Shared.modules[modules[index]]) {
					return false;
				}
			}

			return true;
		}

		return false;
	},

	/**
	 * Checks if a module is loaded and if so calls the passed
	 * callback method.
	 * @func moduleLoaded
	 * @memberof Core
	 * @param {String} moduleName The name of the module to check for.
	 * @param {Function} callback The callback method to call if module is loaded.
	 */
	'string, function': function (moduleName, callback) {
		if (moduleName !== undefined) {
			moduleName = moduleName.replace(/ /g, '');

			var modules = moduleName.split(','),
				index;

			for (index = 0; index < modules.length; index++) {
				if (!Shared.modules[modules[index]]) {
					return false;
				}
			}

			callback();
		}
	},

	/**
	 * Checks if a module is loaded and if so calls the passed
	 * success method, otherwise calls the failure method.
	 * @func moduleLoaded
	 * @memberof Core
	 * @param {String} moduleName The name of the module to check for.
	 * @param {Function} success The callback method to call if module is loaded.
	 * @param {Function} failure The callback method to call if module not loaded.
	 */
	'string, function, function': function (moduleName, success, failure) {
		if (moduleName !== undefined) {
			moduleName = moduleName.replace(/ /g, '');

			var modules = moduleName.split(','),
				index;

			for (index = 0; index < modules.length; index++) {
				if (!Shared.modules[modules[index]]) {
					failure();
					return false;
				}
			}

			success();
		}
	}
});

/**
 * Checks version against the string passed and if it matches (or partially matches)
 * then the callback is called.
 * @param {String} val The version to check against.
 * @param {Function} callback The callback to call if match is true.
 * @returns {Boolean}
 */
Core.prototype.version = function (val, callback) {
	if (val !== undefined) {
		if (Shared.version.indexOf(val) === 0) {
			if (callback) { callback(); }
			return true;
		}

		return false;
	}

	return Shared.version;
};

// Expose moduleLoaded method to non-instantiated object ForerunnerDB
Core.moduleLoaded = Core.prototype.moduleLoaded;

// Expose version method to non-instantiated object ForerunnerDB
Core.version = Core.prototype.version;

// Provide public access to the Shared object
Core.shared = Shared;
Core.prototype.shared = Shared;

Shared.addModule('Core', Core);
Shared.mixin(Core.prototype, 'Mixin.Common');
Shared.mixin(Core.prototype, 'Mixin.Constants');

Db = _dereq_('./Db.js');
Metrics = _dereq_('./Metrics.js');

/**
 * Gets / sets the name of the instance. This is primarily used for
 * name-spacing persistent storage.
 * @param {String=} val The name of the instance to set.
 * @returns {*}
 */
Shared.synthesize(Core.prototype, 'name');

// Set a flag to determine environment
Core.prototype._isServer = false;

/**
 * Returns true if ForerunnerDB is running on a client browser.
 * @returns {boolean}
 */
Core.prototype.isClient = function () {
	return !this._isServer;
};

/**
 * Returns true if ForerunnerDB is running on a server.
 * @returns {boolean}
 */
Core.prototype.isServer = function () {
	return this._isServer;
};

/**
 * Checks if the database is running on a client (browser) or
 * a server (node.js).
 * @returns {Boolean} Returns true if running on a browser.
 */
Core.prototype.isClient = function () {
	return !this._isServer;
};

/**
 * Checks if the database is running on a client (browser) or
 * a server (node.js).
 * @returns {Boolean} Returns true if running on a server.
 */
Core.prototype.isServer = function () {
	return this._isServer;
};

/**
 * Added to provide an error message for users who have not seen
 * the new instantiation breaking change warning and try to get
 * a collection directly from the core instance.
 */
Core.prototype.collection = function () {
	throw("ForerunnerDB's instantiation has changed since version 1.3.36 to support multiple database instances. Please see the readme.md file for the minor change you have to make to get your project back up and running, or see the issue related to this change at https://github.com/Irrelon/ForerunnerDB/issues/44");
};

module.exports = Core;
},{"./Db.js":8,"./Metrics.js":15,"./Overload":27,"./Shared":33}],7:[function(_dereq_,module,exports){
"use strict";

/**
 * @mixin
 */
var crcTable = (function () {
	var crcTable = [],
		c, n, k;

	for (n = 0; n < 256; n++) {
		c = n;

		for (k = 0; k < 8; k++) {
			c = ((c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1)); // jshint ignore:line
		}

		crcTable[n] = c;
	}

	return crcTable;
}());

module.exports = function(str) {
	var crc = 0 ^ (-1), // jshint ignore:line
		i;

	for (i = 0; i < str.length; i++) {
		crc = (crc >>> 8) ^ crcTable[(crc ^ str.charCodeAt(i)) & 0xFF]; // jshint ignore:line
	}

	return (crc ^ (-1)) >>> 0; // jshint ignore:line
};
},{}],8:[function(_dereq_,module,exports){
"use strict";

var Shared,
	Core,
	Collection,
	Metrics,
	Crc,
	Overload;

Shared = _dereq_('./Shared');
Overload = _dereq_('./Overload');

/**
 * Creates a new ForerunnerDB database instance.
 * @constructor
 */
var Db = function (name, core) {
	this.init.apply(this, arguments);
};

Db.prototype.init = function (name, core) {
	this.core(core);
	this._primaryKey = '_id';
	this._name = name;
	this._collection = {};
	this._debug = {};
};

Db.prototype.moduleLoaded = new Overload({
	/**
	 * Checks if a module has been loaded into the database.
	 * @func moduleLoaded
	 * @memberof Db
	 * @param {String} moduleName The name of the module to check for.
	 * @returns {Boolean} True if the module is loaded, false if not.
	 */
	'string': function (moduleName) {
		if (moduleName !== undefined) {
			moduleName = moduleName.replace(/ /g, '');

			var modules = moduleName.split(','),
				index;

			for (index = 0; index < modules.length; index++) {
				if (!Shared.modules[modules[index]]) {
					return false;
				}
			}

			return true;
		}

		return false;
	},

	/**
	 * Checks if a module is loaded and if so calls the passed
	 * callback method.
	 * @func moduleLoaded
	 * @memberof Db
	 * @param {String} moduleName The name of the module to check for.
	 * @param {Function} callback The callback method to call if module is loaded.
	 */
	'string, function': function (moduleName, callback) {
		if (moduleName !== undefined) {
			moduleName = moduleName.replace(/ /g, '');

			var modules = moduleName.split(','),
				index;

			for (index = 0; index < modules.length; index++) {
				if (!Shared.modules[modules[index]]) {
					return false;
				}
			}

			callback();
		}
	},

	/**
	 * Checks if a module is loaded and if so calls the passed
	 * success method, otherwise calls the failure method.
	 * @func moduleLoaded
	 * @memberof Db
	 * @param {String} moduleName The name of the module to check for.
	 * @param {Function} success The callback method to call if module is loaded.
	 * @param {Function} failure The callback method to call if module not loaded.
	 */
	'string, function, function': function (moduleName, success, failure) {
		if (moduleName !== undefined) {
			moduleName = moduleName.replace(/ /g, '');

			var modules = moduleName.split(','),
				index;

			for (index = 0; index < modules.length; index++) {
				if (!Shared.modules[modules[index]]) {
					failure();
					return false;
				}
			}

			success();
		}
	}
});

/**
 * Checks version against the string passed and if it matches (or partially matches)
 * then the callback is called.
 * @param {String} val The version to check against.
 * @param {Function} callback The callback to call if match is true.
 * @returns {Boolean}
 */
Db.prototype.version = function (val, callback) {
	if (val !== undefined) {
		if (Shared.version.indexOf(val) === 0) {
			if (callback) { callback(); }
			return true;
		}

		return false;
	}

	return Shared.version;
};

// Expose moduleLoaded method to non-instantiated object ForerunnerDB
Db.moduleLoaded = Db.prototype.moduleLoaded;

// Expose version method to non-instantiated object ForerunnerDB
Db.version = Db.prototype.version;

// Provide public access to the Shared object
Db.shared = Shared;
Db.prototype.shared = Shared;

Shared.addModule('Db', Db);
Shared.mixin(Db.prototype, 'Mixin.Common');
Shared.mixin(Db.prototype, 'Mixin.ChainReactor');
Shared.mixin(Db.prototype, 'Mixin.Constants');

Core = Shared.modules.Core;
Collection = _dereq_('./Collection.js');
Metrics = _dereq_('./Metrics.js');
Crc = _dereq_('./Crc.js');

Db.prototype._isServer = false;

/**
 * Gets / sets the core object this database belongs to.
 */
Shared.synthesize(Db.prototype, 'core');

/**
 * Gets / sets the default primary key for new collections.
 * @param {String=} val The name of the primary key to set.
 * @returns {*}
 */
Shared.synthesize(Db.prototype, 'primaryKey');

/**
 * Gets / sets the current state.
 * @param {String=} val The name of the state to set.
 * @returns {*}
 */
Shared.synthesize(Db.prototype, 'state');

/**
 * Gets / sets the name of the database.
 * @param {String=} val The name of the database to set.
 * @returns {*}
 */
Shared.synthesize(Db.prototype, 'name');

/**
 * Returns true if ForerunnerDB is running on a client browser.
 * @returns {boolean}
 */
Db.prototype.isClient = function () {
	return !this._isServer;
};

/**
 * Returns true if ForerunnerDB is running on a server.
 * @returns {boolean}
 */
Db.prototype.isServer = function () {
	return this._isServer;
};

/**
 * Returns a checksum of a string.
 * @param {String} string The string to checksum.
 * @return {String} The checksum generated.
 */
Db.prototype.crc = Crc;

/**
 * Checks if the database is running on a client (browser) or
 * a server (node.js).
 * @returns {Boolean} Returns true if running on a browser.
 */
Db.prototype.isClient = function () {
	return !this._isServer;
};

/**
 * Checks if the database is running on a client (browser) or
 * a server (node.js).
 * @returns {Boolean} Returns true if running on a server.
 */
Db.prototype.isServer = function () {
	return this._isServer;
};

/**
 * Converts a normal javascript array of objects into a DB collection.
 * @param {Array} arr An array of objects.
 * @returns {Collection} A new collection instance with the data set to the
 * array passed.
 */
Db.prototype.arrayToCollection = function (arr) {
	return new Collection().setData(arr);
};

/**
 * Registers an event listener against an event name.
 * @param {String} event The name of the event to listen for.
 * @param {Function} listener The listener method to call when
 * the event is fired.
 * @returns {*}
 */
Db.prototype.on = function(event, listener) {
	this._listeners = this._listeners || {};
	this._listeners[event] = this._listeners[event] || [];
	this._listeners[event].push(listener);

	return this;
};

/**
 * De-registers an event listener from an event name.
 * @param {String} event The name of the event to stop listening for.
 * @param {Function} listener The listener method passed to on() when
 * registering the event listener.
 * @returns {*}
 */
Db.prototype.off = function(event, listener) {
	if (event in this._listeners) {
		var arr = this._listeners[event],
			index = arr.indexOf(listener);

		if (index > -1) {
			arr.splice(index, 1);
		}
	}

	return this;
};

/**
 * Emits an event by name with the given data.
 * @param {String} event The name of the event to emit.
 * @param {*=} data The data to emit with the event.
 * @returns {*}
 */
Db.prototype.emit = function(event, data) {
	this._listeners = this._listeners || {};

	if (event in this._listeners) {
		var arr = this._listeners[event],
			arrCount = arr.length,
			arrIndex;

		for (arrIndex = 0; arrIndex < arrCount; arrIndex++) {
			arr[arrIndex].apply(this, Array.prototype.slice.call(arguments, 1));
		}
	}

	return this;
};

/**
 * Find all documents across all collections in the database that match the passed
 * string or search object.
 * @param search String or search object.
 * @returns {Array}
 */
Db.prototype.peek = function (search) {
	var i,
		coll,
		arr = [],
		typeOfSearch = typeof search;

	// Loop collections
	for (i in this._collection) {
		if (this._collection.hasOwnProperty(i)) {
			coll = this._collection[i];

			if (typeOfSearch === 'string') {
				arr = arr.concat(coll.peek(search));
			} else {
				arr = arr.concat(coll.find(search));
			}
		}
	}

	return arr;
};

/**
 * Find all documents across all collections in the database that match the passed
 * string or search object and return them in an object where each key is the name
 * of the collection that the document was matched in.
 * @param search String or search object.
 * @returns {object}
 */
Db.prototype.peekCat = function (search) {
	var i,
		coll,
		cat = {},
		arr,
		typeOfSearch = typeof search;

	// Loop collections
	for (i in this._collection) {
		if (this._collection.hasOwnProperty(i)) {
			coll = this._collection[i];

			if (typeOfSearch === 'string') {
				arr = coll.peek(search);

				if (arr && arr.length) {
					cat[coll.name()] = arr;
				}
			} else {
				arr = coll.find(search);

				if (arr && arr.length) {
					cat[coll.name()] = arr;
				}
			}
		}
	}

	return cat;
};

Db.prototype.drop = new Overload({
	/**
	 * Drops the database.
	 * @func drop
	 * @memberof Db
	 */
	'': function () {
		if (this._state !== 'dropped') {
			var arr = this.collections(),
				arrCount = arr.length,
				arrIndex;

			this._state = 'dropped';

			for (arrIndex = 0; arrIndex < arrCount; arrIndex++) {
				this.collection(arr[arrIndex].name).drop();
				delete this._collection[arr[arrIndex].name];
			}

			this.emit('drop', this);

			delete this._core._db[this._name];
		}

		return true;
	},

	/**
	 * Drops the database with optional callback method.
	 * @func drop
	 * @memberof Db
	 * @param {Function} callback Optional callback method.
	 */
	'function': function (callback) {
		if (this._state !== 'dropped') {
			var arr = this.collections(),
				arrCount = arr.length,
				arrIndex,
				finishCount = 0,
				afterDrop = function () {
					finishCount++;

					if (finishCount === arrCount) {
						if (callback) { callback();	}
					}
				};

			this._state = 'dropped';

			for (arrIndex = 0; arrIndex < arrCount; arrIndex++) {
				this.collection(arr[arrIndex].name).drop(afterDrop);

				delete this._collection[arr[arrIndex].name];
			}

			this.emit('drop', this);

			delete this._core._db[this._name];
		}

		return true;
	},

	/**
	 * Drops the database with optional persistent storage drop. Persistent
	 * storage is dropped by default if no preference is provided.
	 * @func drop
	 * @memberof Db
	 * @param {Boolean} removePersist Drop persistent storage for this database.
	 */
	'boolean': function (removePersist) {
		if (this._state !== 'dropped') {
			var arr = this.collections(),
				arrCount = arr.length,
				arrIndex;

			this._state = 'dropped';

			for (arrIndex = 0; arrIndex < arrCount; arrIndex++) {
				this.collection(arr[arrIndex].name).drop(removePersist);
				delete this._collection[arr[arrIndex].name];
			}

			this.emit('drop', this);

			delete this._core._db[this._name];
		}

		return true;
	},

	/**
	 * Drops the database and optionally controls dropping persistent storage
	 * and callback method.
	 * @func drop
	 * @memberof Db
	 * @param {Boolean} removePersist Drop persistent storage for this database.
	 * @param {Function} callback Optional callback method.
	 */
	'boolean, function': function (removePersist, callback) {
		if (this._state !== 'dropped') {
			var arr = this.collections(),
				arrCount = arr.length,
				arrIndex,
				finishCount = 0,
				afterDrop = function () {
					finishCount++;

					if (finishCount === arrCount) {
						if (callback) { callback();	}
					}
				};

			this._state = 'dropped';

			for (arrIndex = 0; arrIndex < arrCount; arrIndex++) {
				this.collection(arr[arrIndex].name).drop(removePersist, afterDrop);
				delete this._collection[arr[arrIndex].name];
			}

			this.emit('drop', this);

			delete this._core._db[this._name];
		}

		return true;
	}
});

/**
 * Gets a database instance by name.
 * @memberof Core
 * @param {String=} name Optional name of the database. If none is provided
 * a random name is assigned.
 * @returns {Db}
 */
Core.prototype.db = function (name) {
	if (!name) {
		name = this.objectId();
	}

	this._db[name] = this._db[name] || new Db(name, this);
	return this._db[name];
};

/**
 * Returns an array of databases that ForerunnerDB currently has.
 * @memberof Core
 * @param {String|RegExp=} search The optional search string or regular expression to use
 * to match collection names against.
 * @returns {Array} An array of objects containing details of each database
 * that ForerunnerDB is currently managing and it's child entities.
 */
Core.prototype.databases = function (search) {
	var arr = [],
		tmpObj,
		addDb,
		i;

	if (search) {
		if (!(search instanceof RegExp)) {
			// Turn the search into a regular expression
			search = new RegExp(search);
		}
	}

	for (i in this._db) {
		if (this._db.hasOwnProperty(i)) {
			addDb = true;

			if (search) {
				if (!search.exec(i)) {
					addDb = false;
				}
			}

			if (addDb) {
				tmpObj = {
					name: i,
					children: []
				};

				if (this.shared.moduleExists('Collection')) {
					tmpObj.children.push({
						module: 'collection',
						moduleName: 'Collections',
						count: this._db[i].collections().length
					});
				}

				if (this.shared.moduleExists('CollectionGroup')) {
					tmpObj.children.push({
						module: 'collectionGroup',
						moduleName: 'Collection Groups',
						count: this._db[i].collectionGroups().length
					});
				}

				if (this.shared.moduleExists('Document')) {
					tmpObj.children.push({
						module: 'document',
						moduleName: 'Documents',
						count: this._db[i].documents().length
					});
				}

				if (this.shared.moduleExists('Grid')) {
					tmpObj.children.push({
						module: 'grid',
						moduleName: 'Grids',
						count: this._db[i].grids().length
					});
				}

				if (this.shared.moduleExists('Overview')) {
					tmpObj.children.push({
						module: 'overview',
						moduleName: 'Overviews',
						count: this._db[i].overviews().length
					});
				}

				if (this.shared.moduleExists('View')) {
					tmpObj.children.push({
						module: 'view',
						moduleName: 'Views',
						count: this._db[i].views().length
					});
				}

				arr.push(tmpObj);
			}
		}
	}

	arr.sort(function (a, b) {
		return a.name.localeCompare(b.name);
	});

	return arr;
};

module.exports = Db;
},{"./Collection.js":4,"./Crc.js":7,"./Metrics.js":15,"./Overload":27,"./Shared":33}],9:[function(_dereq_,module,exports){
"use strict";

var Shared,
	Collection,
	Db;

Shared = _dereq_('./Shared');

/**
 * Creates a new Document instance. Documents allow you to create individual
 * objects that can have standard ForerunnerDB CRUD operations run against
 * them, as well as data-binding if the AutoBind module is included in your
 * project.
 * @name Document
 * @class Document
 * @constructor
 */
var FdbDocument = function () {
	this.init.apply(this, arguments);
};

FdbDocument.prototype.init = function (name) {
	this._name = name;
	this._data = {};
};

Shared.addModule('Document', FdbDocument);
Shared.mixin(FdbDocument.prototype, 'Mixin.Common');
Shared.mixin(FdbDocument.prototype, 'Mixin.Events');
Shared.mixin(FdbDocument.prototype, 'Mixin.ChainReactor');
Shared.mixin(FdbDocument.prototype, 'Mixin.Constants');
Shared.mixin(FdbDocument.prototype, 'Mixin.Triggers');
//Shared.mixin(FdbDocument.prototype, 'Mixin.Updating');

Collection = _dereq_('./Collection');
Db = Shared.modules.Db;

/**
 * Gets / sets the current state.
 * @func state
 * @memberof Document
 * @param {String=} val The name of the state to set.
 * @returns {*}
 */
Shared.synthesize(FdbDocument.prototype, 'state');

/**
 * Gets / sets the db instance this class instance belongs to.
 * @func db
 * @memberof Document
 * @param {Db=} db The db instance.
 * @returns {*}
 */
Shared.synthesize(FdbDocument.prototype, 'db');

/**
 * Gets / sets the document name.
 * @func name
 * @memberof Document
 * @param {String=} val The name to assign
 * @returns {*}
 */
Shared.synthesize(FdbDocument.prototype, 'name');

/**
 * Sets the data for the document.
 * @func setData
 * @memberof Document
 * @param data
 * @param options
 * @returns {Document}
 */
FdbDocument.prototype.setData = function (data, options) {
	var i,
		$unset;

	if (data) {
		options = options || {
			$decouple: true
		};

		if (options && options.$decouple === true) {
			data = this.decouple(data);
		}

		if (this._linked) {
			$unset = {};

			// Remove keys that don't exist in the new data from the current object
			for (i in this._data) {
				if (i.substr(0, 6) !== 'jQuery' && this._data.hasOwnProperty(i)) {
					// Check if existing data has key
					if (data[i] === undefined) {
						// Add property name to those to unset
						$unset[i] = 1;
					}
				}
			}

			data.$unset = $unset;

			// Now update the object with new data
			this.updateObject(this._data, data, {});
		} else {
			// Straight data assignment
			this._data = data;
		}
	}

	return this;
};

/**
 * Gets the document's data returned as a single object.
 * @func find
 * @memberof Document
 * @param {Object} query The query object - currently unused, just
 * provide a blank object e.g. {}
 * @param {Object=} options An options object.
 * @returns {Object} The document's data object.
 */
FdbDocument.prototype.find = function (query, options) {
	var result;

	if (options && options.$decouple === false) {
		result = this._data;
	} else {
		result = this.decouple(this._data);
	}

	return result;
};

/**
 * Modifies the document. This will update the document with the data held in 'update'.
 * @func update
 * @memberof Document
 * @param {Object} query The query that must be matched for a document to be
 * operated on.
 * @param {Object} update The object containing updated key/values. Any keys that
 * match keys on the existing document will be overwritten with this data. Any
 * keys that do not currently exist on the document will be added to the document.
 * @param {Object=} options An options object.
 * @returns {Array} The items that were updated.
 */
FdbDocument.prototype.update = function (query, update, options) {
	this.updateObject(this._data, update, query, options);
};

/**
 * Internal method for document updating.
 * @func updateObject
 * @memberof Document
 * @param {Object} doc The document to update.
 * @param {Object} update The object with key/value pairs to update the document with.
 * @param {Object} query The query object that we need to match to perform an update.
 * @param {Object} options An options object.
 * @param {String} path The current recursive path.
 * @param {String} opType The type of update operation to perform, if none is specified
 * default is to set new data against matching fields.
 * @returns {Boolean} True if the document was updated with new / changed data or
 * false if it was not updated because the data was the same.
 * @private
 */
FdbDocument.prototype.updateObject = Collection.prototype.updateObject;

/**
 * Determines if the passed key has an array positional mark (a dollar at the end
 * of its name).
 * @func _isPositionalKey
 * @memberof Document
 * @param {String} key The key to check.
 * @returns {Boolean} True if it is a positional or false if not.
 * @private
 */
FdbDocument.prototype._isPositionalKey = function (key) {
	return key.substr(key.length - 2, 2) === '.$';
};

/**
 * Updates a property on an object depending on if the collection is
 * currently running data-binding or not.
 * @func _updateProperty
 * @memberof Document
 * @param {Object} doc The object whose property is to be updated.
 * @param {String} prop The property to update.
 * @param {*} val The new value of the property.
 * @private
 */
FdbDocument.prototype._updateProperty = function (doc, prop, val) {
	if (this._linked) {
		window.jQuery.observable(doc).setProperty(prop, val);

		if (this.debug()) {
			console.log('ForerunnerDB.Document: Setting data-bound document property "' + prop + '" for collection "' + this.name() + '"');
		}
	} else {
		doc[prop] = val;

		if (this.debug()) {
			console.log('ForerunnerDB.Document: Setting non-data-bound document property "' + prop + '" for collection "' + this.name() + '"');
		}
	}
};

/**
 * Increments a value for a property on a document by the passed number.
 * @func _updateIncrement
 * @memberof Document
 * @param {Object} doc The document to modify.
 * @param {String} prop The property to modify.
 * @param {Number} val The amount to increment by.
 * @private
 */
FdbDocument.prototype._updateIncrement = function (doc, prop, val) {
	if (this._linked) {
		window.jQuery.observable(doc).setProperty(prop, doc[prop] + val);
	} else {
		doc[prop] += val;
	}
};

/**
 * Changes the index of an item in the passed array.
 * @func _updateSpliceMove
 * @memberof Document
 * @param {Array} arr The array to modify.
 * @param {Number} indexFrom The index to move the item from.
 * @param {Number} indexTo The index to move the item to.
 * @private
 */
FdbDocument.prototype._updateSpliceMove = function (arr, indexFrom, indexTo) {
	if (this._linked) {
		window.jQuery.observable(arr).move(indexFrom, indexTo);

		if (this.debug()) {
			console.log('ForerunnerDB.Document: Moving data-bound document array index from "' + indexFrom + '" to "' + indexTo + '" for collection "' + this.name() + '"');
		}
	} else {
		arr.splice(indexTo, 0, arr.splice(indexFrom, 1)[0]);

		if (this.debug()) {
			console.log('ForerunnerDB.Document: Moving non-data-bound document array index from "' + indexFrom + '" to "' + indexTo + '" for collection "' + this.name() + '"');
		}
	}
};

/**
 * Inserts an item into the passed array at the specified index.
 * @func _updateSplicePush
 * @memberof Document
 * @param {Array} arr The array to insert into.
 * @param {Number} index The index to insert at.
 * @param {Object} doc The document to insert.
 * @private
 */
FdbDocument.prototype._updateSplicePush = function (arr, index, doc) {
	if (arr.length > index) {
		if (this._linked) {
			window.jQuery.observable(arr).insert(index, doc);
		} else {
			arr.splice(index, 0, doc);
		}
	} else {
		if (this._linked) {
			window.jQuery.observable(arr).insert(doc);
		} else {
			arr.push(doc);
		}
	}
};

/**
 * Inserts an item at the end of an array.
 * @func _updatePush
 * @memberof Document
 * @param {Array} arr The array to insert the item into.
 * @param {Object} doc The document to insert.
 * @private
 */
FdbDocument.prototype._updatePush = function (arr, doc) {
	if (this._linked) {
		window.jQuery.observable(arr).insert(doc);
	} else {
		arr.push(doc);
	}
};

/**
 * Removes an item from the passed array.
 * @func _updatePull
 * @memberof Document
 * @param {Array} arr The array to modify.
 * @param {Number} index The index of the item in the array to remove.
 * @private
 */
FdbDocument.prototype._updatePull = function (arr, index) {
	if (this._linked) {
		window.jQuery.observable(arr).remove(index);
	} else {
		arr.splice(index, 1);
	}
};

/**
 * Multiplies a value for a property on a document by the passed number.
 * @func _updateMultiply
 * @memberof Document
 * @param {Object} doc The document to modify.
 * @param {String} prop The property to modify.
 * @param {Number} val The amount to multiply by.
 * @private
 */
FdbDocument.prototype._updateMultiply = function (doc, prop, val) {
	if (this._linked) {
		window.jQuery.observable(doc).setProperty(prop, doc[prop] * val);
	} else {
		doc[prop] *= val;
	}
};

/**
 * Renames a property on a document to the passed property.
 * @func _updateRename
 * @memberof Document
 * @param {Object} doc The document to modify.
 * @param {String} prop The property to rename.
 * @param {Number} val The new property name.
 * @private
 */
FdbDocument.prototype._updateRename = function (doc, prop, val) {
	var existingVal = doc[prop];
	if (this._linked) {
		window.jQuery.observable(doc).setProperty(val, existingVal);
		window.jQuery.observable(doc).removeProperty(prop);
	} else {
		doc[val] = existingVal;
		delete doc[prop];
	}
};

/**
 * Deletes a property on a document.
 * @func _updateUnset
 * @memberof Document
 * @param {Object} doc The document to modify.
 * @param {String} prop The property to delete.
 * @private
 */
FdbDocument.prototype._updateUnset = function (doc, prop) {
	if (this._linked) {
		window.jQuery.observable(doc).removeProperty(prop);
	} else {
		delete doc[prop];
	}
};

/**
 * Deletes a property on a document.
 * @func _updatePop
 * @memberof Document
 * @param {Object} doc The document to modify.
 * @param {*} val The property to delete.
 * @return {Boolean}
 * @private
 */
FdbDocument.prototype._updatePop = function (doc, val) {
	var index,
		updated = false;

	if (doc.length > 0) {
		if (this._linked) {
			if (val === 1) {
				index = doc.length - 1;
			} else if (val === -1) {
				index = 0;
			}

			if (index > -1) {
				window.jQuery.observable(doc).remove(index);
				updated = true;
			}
		} else {
			if (val === 1) {
				doc.pop();
				updated = true;
			} else if (val === -1) {
				doc.shift();
				updated = true;
			}
		}
	}

	return updated;
};

/**
 * Drops the document.
 * @func drop
 * @memberof Document
 * @returns {boolean} True if successful, false if not.
 */
FdbDocument.prototype.drop = function () {
	if (this._state !== 'dropped') {
		if (this._db && this._name) {
			if (this._db && this._db._document && this._db._document[this._name]) {
				this._state = 'dropped';

				delete this._db._document[this._name];
				delete this._data;

				this.emit('drop', this);

				return true;
			}
		}
	} else {
		return true;
	}

	return false;
};

/**
 * Creates a new document instance.
 * @func document
 * @memberof Db
 * @param {String} documentName The name of the document to create.
 * @returns {*}
 */
Db.prototype.document = function (documentName) {
	if (documentName) {
		this._document = this._document || {};
		this._document[documentName] = this._document[documentName] || new FdbDocument(documentName).db(this);
		return this._document[documentName];
	} else {
		// Return an object of document data
		return this._document;
	}
};

/**
 * Returns an array of documents the DB currently has.
 * @func documents
 * @memberof Db
 * @returns {Array} An array of objects containing details of each document
 * the database is currently managing.
 */
Db.prototype.documents = function () {
	var arr = [],
		i;

	for (i in this._document) {
		if (this._document.hasOwnProperty(i)) {
			arr.push({
				name: i
			});
		}
	}

	return arr;
};

Shared.finishModule('Document');
module.exports = FdbDocument;
},{"./Collection":4,"./Shared":33}],10:[function(_dereq_,module,exports){
"use strict";

// Import external names locally
var Shared,
	Db,
	Collection,
	CollectionGroup,
	View,
	CollectionInit,
	DbInit,
	ReactorIO;

//Shared = ForerunnerDB.shared;
Shared = _dereq_('./Shared');

/**
 * Creates a new grid instance.
 * @name Grid
 * @class Grid
 * @param {String} selector jQuery selector.
 * @param {String} template The template selector.
 * @param {Object=} options The options object to apply to the grid.
 * @constructor
 */
var Grid = function (selector, template, options) {
	this.init.apply(this, arguments);
};

Grid.prototype.init = function (selector, template, options) {
	var self = this;

	this._selector = selector;
	this._template = template;
	this._options = options || {};
	this._debug = {};
	this._id = this.objectId();

	this._collectionDroppedWrap = function () {
		self._collectionDropped.apply(self, arguments);
	};
};

Shared.addModule('Grid', Grid);
Shared.mixin(Grid.prototype, 'Mixin.Common');
Shared.mixin(Grid.prototype, 'Mixin.ChainReactor');
Shared.mixin(Grid.prototype, 'Mixin.Constants');
Shared.mixin(Grid.prototype, 'Mixin.Triggers');
Shared.mixin(Grid.prototype, 'Mixin.Events');

Collection = _dereq_('./Collection');
CollectionGroup = _dereq_('./CollectionGroup');
View = _dereq_('./View');
ReactorIO = _dereq_('./ReactorIO');
CollectionInit = Collection.prototype.init;
Db = Shared.modules.Db;
DbInit = Db.prototype.init;

/**
 * Gets / sets the current state.
 * @func state
 * @memberof Grid
 * @param {String=} val The name of the state to set.
 * @returns {Grid}
 */
Shared.synthesize(Grid.prototype, 'state');

/**
 * Gets / sets the current name.
 * @func name
 * @memberof Grid
 * @param {String=} val The name to set.
 * @returns {Grid}
 */
Shared.synthesize(Grid.prototype, 'name');

/**
 * Executes an insert against the grid's underlying data-source.
 * @func insert
 * @memberof Grid
 */
Grid.prototype.insert = function () {
	this._from.insert.apply(this._from, arguments);
};

/**
 * Executes an update against the grid's underlying data-source.
 * @func update
 * @memberof Grid
 */
Grid.prototype.update = function () {
	this._from.update.apply(this._from, arguments);
};

/**
 * Executes an updateById against the grid's underlying data-source.
 * @func updateById
 * @memberof Grid
 */
Grid.prototype.updateById = function () {
	this._from.updateById.apply(this._from, arguments);
};

/**
 * Executes a remove against the grid's underlying data-source.
 * @func remove
 * @memberof Grid
 */
Grid.prototype.remove = function () {
	this._from.remove.apply(this._from, arguments);
};

/**
 * Sets the collection from which the grid will assemble its data.
 * @func from
 * @memberof Grid
 * @param {Collection} collection The collection to use to assemble grid data.
 * @returns {Grid}
 */
Grid.prototype.from = function (collection) {
	//var self = this;

	if (collection !== undefined) {
		// Check if we have an existing from
		if (this._from) {
			// Remove the listener to the drop event
			this._from.off('drop', this._collectionDroppedWrap);
			this._from._removeGrid(this);
		}

		if (typeof(collection) === 'string') {
			collection = this._db.collection(collection);
		}

		this._from = collection;
		this._from.on('drop', this._collectionDroppedWrap);
		this.refresh();
	}

	return this;
};

/**
 * Gets / sets the DB the grid is bound against.
 * @func db
 * @memberof Grid
 * @param {Db} db
 * @returns {*}
 */
Grid.prototype.db = function (db) {
	if (db !== undefined) {
		this._db = db;
		return this;
	}

	return this._db;
};

Grid.prototype._collectionDropped = function (collection) {
	if (collection) {
		// Collection was dropped, remove from grid
		delete this._from;
	}
};

/**
 * Drops a grid and all it's stored data from the database.
 * @func drop
 * @memberof Grid
 * @returns {boolean} True on success, false on failure.
 */
Grid.prototype.drop = function () {
	if (this._state !== 'dropped') {
		if (this._from) {
			// Remove data-binding
			this._from.unlink(this._selector, this.template());

			// Kill listeners and references
			this._from.off('drop', this._collectionDroppedWrap);
			this._from._removeGrid(this);

			if (this.debug() || (this._db && this._db.debug())) {
				console.log('ForerunnerDB.Grid: Dropping grid ' + this._selector);
			}

			this._state = 'dropped';

			if (this._db && this._selector) {
				delete this._db._grid[this._selector];
			}

			this.emit('drop', this);

			delete this._selector;
			delete this._template;
			delete this._from;
			delete this._db;

			return true;
		}
	} else {
		return true;
	}

	return false;
};

/**
 * Gets / sets the grid's HTML template to use when rendering.
 * @func template
 * @memberof Grid
 * @param {Selector} template The template's jQuery selector.
 * @returns {*}
 */
Grid.prototype.template = function (template) {
	if (template !== undefined) {
		this._template = template;
		return this;
	}

	return this._template;
};

Grid.prototype._sortGridClick = function (e) {
	var sortColText = window.jQuery(e.currentTarget).attr('data-grid-sort') || '',
		sortCols = sortColText.split(','),
		sortObj = {},
		i;

	for (i = 0; i < sortCols.length; i++) {
		sortObj[sortCols] = 1;
	}

	this._from.orderBy(sortObj);
	this.emit('sort', sortObj);
};

/**
 * Refreshes the grid data such as ordering etc.
 * @func refresh
 * @memberof Grid
 */
Grid.prototype.refresh = function () {
	if (this._from) {
		if (this._from.link) {
			var self = this,
				elem = window.jQuery(this._selector),
				sortClickListener = function () {
					self._sortGridClick.apply(self, arguments);
				};

			// Clear the container
			elem.html('');

			if (self._from.orderBy) {
				// Remove listeners
				elem.off('click', '[data-grid-sort]', sortClickListener);
			}

			if (self._from.query) {
				// Remove listeners
				elem.off('click', '[data-grid-filter]', sortClickListener );
			}

			// Set wrap name if none is provided
			self._options.$wrap = self._options.$wrap || 'gridRow';

			// Auto-bind the data to the grid template
			self._from.link(self._selector, self.template(), self._options);

			// Check if the data source (collection or view) has an
			// orderBy method (usually only views) and if so activate
			// the sorting system
			if (self._from.orderBy) {
				// Listen for sort requests
				elem.on('click', '[data-grid-sort]', sortClickListener);
			}

			if (self._from.query) {
				// Listen for filter requests
				var queryObj = {};

				elem.find('[data-grid-filter]').each(function (index, filterElem) {
					filterElem = window.jQuery(filterElem);

					var filterField = filterElem.attr('data-grid-filter'),
						filterVarType = filterElem.attr('data-grid-vartype'),
						filterObj = {},
						title = filterElem.html(),
						dropDownButton,
						dropDownMenu,
						template,
						filterQuery,
						filterView = self._db.view('tmpGridFilter_' + self._id + '_' + filterField);

					filterObj[filterField] = 1;

					filterQuery = {
						$distinct: filterObj
					};

					filterView
						.query(filterQuery)
						.orderBy(filterObj)
						.from(self._from._from);

					template = [
						'<div class="dropdown" id="' + self._id + '_' + filterField + '">',
							'<button class="btn btn-default dropdown-toggle" type="button" id="' + self._id + '_' + filterField + '_dropdownButton" data-toggle="dropdown" aria-expanded="true">',
								title + ' <span class="caret"></span>',
							'</button>',
						'</div>'
					];

					dropDownButton = window.jQuery(template.join(''));
					dropDownMenu = window.jQuery('<ul class="dropdown-menu" role="menu" id="' + self._id + '_' + filterField + '_dropdownMenu"></ul>');

					dropDownButton.append(dropDownMenu);

					filterElem.html(dropDownButton);

					// Data-link the underlying data to the grid filter drop-down
					filterView.link(dropDownMenu, {
						template: [
							'<li role="presentation" class="input-group" style="width: 240px; padding-left: 10px; padding-right: 10px; padding-top: 5px;">',
								'<input type="search" class="form-control gridFilterSearch" placeholder="Search...">',
								'<span class="input-group-btn">',
									'<button class="btn btn-default gridFilterClearSearch" type="button"><span class="glyphicon glyphicon-remove-circle glyphicons glyphicons-remove"></span></button>',
								'</span>',
							'</li>',
							'<li role="presentation" class="divider"></li>',
							'<li role="presentation" data-val="$all">',
								'<a role="menuitem" tabindex="-1">',
									'<input type="checkbox" checked>&nbsp;All',
								'</a>',
							'</li>',
							'<li role="presentation" class="divider"></li>',
							'{^{for options}}',
								'<li role="presentation" data-link="data-val{:' + filterField + '}">',
									'<a role="menuitem" tabindex="-1">',
										'<input type="checkbox">&nbsp;{^{:' + filterField + '}}',
									'</a>',
								'</li>',
							'{{/for}}'
						].join('')
					}, {
						$wrap: 'options'
					});

					elem.on('keyup', '#' + self._id + '_' + filterField + '_dropdownMenu .gridFilterSearch', function (e) {
						var elem = window.jQuery(this),
							query = filterView.query(),
							search = elem.val();

						if (search) {
							query[filterField] = new RegExp(search, 'gi');
						} else {
							delete query[filterField];
						}

						filterView.query(query);
					});

					elem.on('click', '#' + self._id + '_' + filterField + '_dropdownMenu .gridFilterClearSearch', function (e) {
						// Clear search text box
						window.jQuery(this).parents('li').find('.gridFilterSearch').val('');

						// Clear view query
						var query = filterView.query();
						delete query[filterField];
						filterView.query(query);
					});

					elem.on('click', '#' + self._id + '_' + filterField + '_dropdownMenu li', function (e) {
						e.stopPropagation();

						var fieldValue,
							elem = $(this),
							checkbox = elem.find('input[type="checkbox"]'),
							checked,
							addMode = true,
							fieldInArr,
							liElem,
							i;

						// If the checkbox is not the one clicked on
						if (!window.jQuery(e.target).is('input')) {
							// Set checkbox to opposite of current value
							checkbox.prop('checked', !checkbox.prop('checked'));
							checked = checkbox.is(':checked');
						} else {
							checkbox.prop('checked', checkbox.prop('checked'));
							checked = checkbox.is(':checked');
						}

						liElem = window.jQuery(this);
						fieldValue = liElem.attr('data-val');

						// Check if the selection is the "all" option
						if (fieldValue === '$all') {
							// Remove the field from the query
							delete queryObj[filterField];

							// Clear all other checkboxes
							liElem.parent().find('li[data-val!="$all"]').find('input[type="checkbox"]').prop('checked', false);
						} else {
							// Clear the "all" checkbox
							liElem.parent().find('[data-val="$all"]').find('input[type="checkbox"]').prop('checked', false);

							// Check if the type needs casting
							switch (filterVarType) {
								case 'integer':
									fieldValue = parseInt(fieldValue, 10);
									break;

								case 'float':
									fieldValue = parseFloat(fieldValue);
									break;

								default:
							}

							// Check if the item exists already
							queryObj[filterField] = queryObj[filterField] || {
								$in: []
							};

							fieldInArr = queryObj[filterField].$in;

							for (i = 0; i < fieldInArr.length; i++) {
								if (fieldInArr[i] === fieldValue) {
									// Item already exists
									if (checked === false) {
										// Remove the item
										fieldInArr.splice(i, 1);
									}
									addMode = false;
									break;
								}
							}

							if (addMode && checked) {
								fieldInArr.push(fieldValue);
							}

							if (!fieldInArr.length) {
								// Remove the field from the query
								delete queryObj[filterField];
							}
						}

						// Set the view query
						self._from.queryData(queryObj);
						if (self._from.pageFirst) {
							self._from.pageFirst();
						}
					});
				});
			}

			self.emit('refresh');
		} else {
			throw('Grid requires the AutoBind module in order to operate!');
		}
	}

	return this;
};

/**
 * Returns the number of documents currently in the grid.
 * @func count
 * @memberof Grid
 * @returns {Number}
 */
Grid.prototype.count = function () {
	return this._from.count();
};

/**
 * Creates a grid and assigns the collection as its data source.
 * @func grid
 * @memberof Collection
 * @param {String} selector jQuery selector of grid output target.
 * @param {String} template The table template to use when rendering the grid.
 * @param {Object=} options The options object to apply to the grid.
 * @returns {*}
 */
Collection.prototype.grid = View.prototype.grid = function (selector, template, options) {
	if (this._db && this._db._grid ) {
		if (!this._db._grid[selector]) {
			var grid = new Grid(selector, template, options)
				.db(this._db)
				.from(this);

			this._grid = this._grid || [];
			this._grid.push(grid);

			this._db._grid[selector] = grid;

			return grid;
		} else {
			throw('ForerunnerDB.Collection/View "' + this.name() + '": Cannot create a grid using this collection/view because a grid with this name already exists: ' + name);
		}
	}
};

/**
 * Removes a grid safely from the DOM. Must be called when grid is
 * no longer required / is being removed from DOM otherwise references
 * will stick around and cause memory leaks.
 * @func unGrid
 * @memberof Collection
 * @param {String} selector jQuery selector of grid output target.
 * @param {String} template The table template to use when rendering the grid.
 * @param {Object=} options The options object to apply to the grid.
 * @returns {*}
 */
Collection.prototype.unGrid = View.prototype.unGrid = function (selector, template, options) {
	var i,
		grid;

	if (this._db && this._db._grid ) {
		if (selector && template) {
			if (this._db._grid[selector]) {
				grid = this._db._grid[selector];
				delete this._db._grid[selector];

				return grid.drop();
			} else {
				throw('ForerunnerDB.Collection/View "' + this.name() + '": Cannot remove a grid using this collection/view because a grid with this name does not exist: ' + name);
			}
		} else {
			// No parameters passed, remove all grids from this module
			for (i in this._db._grid) {
				if (this._db._grid.hasOwnProperty(i)) {
					grid = this._db._grid[i];
					delete this._db._grid[i];

					grid.drop();

					if (this.debug()) {
						console.log('ForerunnerDB.Collection/View "' + this.name() + '": Removed grid binding "' + i + '"');
					}
				}
			}

			this._db._grid = {};
		}
	}
};

/**
 * Adds a grid to the internal grid lookup.
 * @func _addGrid
 * @memberof Collection
 * @param {Grid} grid The grid to add.
 * @returns {Collection}
 * @private
 */
Collection.prototype._addGrid = CollectionGroup.prototype._addGrid = View.prototype._addGrid = function (grid) {
	if (grid !== undefined) {
		this._grid = this._grid || [];
		this._grid.push(grid);
	}

	return this;
};

/**
 * Removes a grid from the internal grid lookup.
 * @func _removeGrid
 * @memberof Collection
 * @param {Grid} grid The grid to remove.
 * @returns {Collection}
 * @private
 */
Collection.prototype._removeGrid = CollectionGroup.prototype._removeGrid = View.prototype._removeGrid = function (grid) {
	if (grid !== undefined && this._grid) {
		var index = this._grid.indexOf(grid);
		if (index > -1) {
			this._grid.splice(index, 1);
		}
	}

	return this;
};

// Extend DB with grids init
Db.prototype.init = function () {
	this._grid = {};
	DbInit.apply(this, arguments);
};

/**
 * Determine if a grid with the passed name already exists.
 * @func gridExists
 * @memberof Db
 * @param {String} selector The jQuery selector to bind the grid to.
 * @returns {boolean}
 */
Db.prototype.gridExists = function (selector) {
	return Boolean(this._grid[selector]);
};

/**
 * Gets a grid by it's name.
 * @func grid
 * @memberof Db
 * @param {String} selector The jQuery selector of the grid to retrieve.
 * @param {String} template The table template to use when rendering the grid.
 * @param {Object=} options The options object to apply to the grid.
 * @returns {*}
 */
Db.prototype.grid = function (selector, template, options) {
	if (!this._grid[selector]) {
		if (this.debug() || (this._db && this._db.debug())) {
			console.log('Db.Grid: Creating grid ' + selector);
		}
	}

	this._grid[selector] = this._grid[selector] || new Grid(selector, template, options).db(this);
	return this._grid[selector];
};

/**
 * Gets a grid by it's name.
 * @func unGrid
 * @memberof Db
 * @param {String} selector The jQuery selector of the grid to retrieve.
 * @param {String} template The table template to use when rendering the grid.
 * @param {Object=} options The options object to apply to the grid.
 * @returns {*}
 */
Db.prototype.unGrid = function (selector, template, options) {
	if (!this._grid[selector]) {
		if (this.debug() || (this._db && this._db.debug())) {
			console.log('Db.Grid: Creating grid ' + selector);
		}
	}

	this._grid[selector] = this._grid[selector] || new Grid(selector, template, options).db(this);
	return this._grid[selector];
};

/**
 * Returns an array of grids the DB currently has.
 * @func grids
 * @memberof Db
 * @returns {Array} An array of objects containing details of each grid
 * the database is currently managing.
 */
Db.prototype.grids = function () {
	var arr = [],
		i;

	for (i in this._grid) {
		if (this._grid.hasOwnProperty(i)) {
			arr.push({
				name: i,
				count: this._grid[i].count()
			});
		}
	}

	return arr;
};

Shared.finishModule('Grid');
module.exports = Grid;
},{"./Collection":4,"./CollectionGroup":5,"./ReactorIO":31,"./Shared":33,"./View":35}],11:[function(_dereq_,module,exports){
"use strict";

// Import external names locally
var Shared,
	Collection,
	CollectionInit,
	Overload;

Shared = _dereq_('./Shared');
Overload = _dereq_('./Overload');

/**
 * The constructor.
 *
 * @constructor
 */
var Highchart = function (collection, options) {
	this.init.apply(this, arguments);
};

Highchart.prototype.init = function (collection, options) {
	this._options = options;
	this._selector = window.jQuery(this._options.selector);

	if (!this._selector[0]) {
		throw('ForerunnerDB.Highchart "' + collection.name() + '": Chart target element does not exist via selector: ' + this._options.selector);
	}

	this._listeners = {};
	this._collection = collection;

	// Setup the chart
	this._options.series = [];

	// Disable attribution on highcharts
	options.chartOptions = options.chartOptions || {};
	options.chartOptions.credits = false;

	// Set the data for the chart
	var data,
		seriesObj,
		chartData;

	switch (this._options.type) {
		case 'pie':
			// Create chart from data
			this._selector.highcharts(this._options.chartOptions);
			this._chart = this._selector.highcharts();

			// Generate graph data from collection data
			data = this._collection.find();

			seriesObj = {
				allowPointSelect: true,
				cursor: 'pointer',
				dataLabels: {
					enabled: true,
					format: '<b>{point.name}</b>: {y} ({point.percentage:.0f}%)',
					style: {
						color: (window.Highcharts.theme && window.Highcharts.theme.contrastTextColor) || 'black'
					}
				}
			};

			chartData = this.pieDataFromCollectionData(data, this._options.keyField, this._options.valField);

			window.jQuery.extend(seriesObj, this._options.seriesOptions);

			window.jQuery.extend(seriesObj, {
				name: this._options.seriesName,
				data: chartData
			});

			this._chart.addSeries(seriesObj, true, true);
			break;

		case 'line':
		case 'area':
		case 'column':
		case 'bar':
			// Generate graph data from collection data
			chartData = this.seriesDataFromCollectionData(
				this._options.seriesField,
				this._options.keyField,
				this._options.valField,
				this._options.orderBy
			);

			this._options.chartOptions.xAxis = chartData.xAxis;
			this._options.chartOptions.series = chartData.series;

			this._selector.highcharts(this._options.chartOptions);
			this._chart = this._selector.highcharts();
			break;

		default:
			throw('ForerunnerDB.Highchart "' + collection.name() + '": Chart type specified is not currently supported by ForerunnerDB: ' + this._options.type);
	}

	// Hook the collection events to auto-update the chart
	this._hookEvents();
};

Shared.addModule('Highchart', Highchart);

Collection = Shared.modules.Collection;
CollectionInit = Collection.prototype.init;

Shared.mixin(Highchart.prototype, 'Mixin.Events');

/**
 * Gets / sets the current state.
 * @param {String=} val The name of the state to set.
 * @returns {*}
 */
Shared.synthesize(Highchart.prototype, 'state');

/**
 * Generate pie-chart series data from the given collection data array.
 * @param data
 * @param keyField
 * @param valField
 * @returns {Array}
 */
Highchart.prototype.pieDataFromCollectionData = function (data, keyField, valField) {
	var graphData = [],
		i;

	for (i = 0; i < data.length; i++) {
		graphData.push([data[i][keyField], data[i][valField]]);
	}

	return graphData;
};

/**
 * Generate line-chart series data from the given collection data array.
 * @param seriesField
 * @param keyField
 * @param valField
 * @param orderBy
 */
Highchart.prototype.seriesDataFromCollectionData = function (seriesField, keyField, valField, orderBy) {
	var data = this._collection.distinct(seriesField),
		seriesData = [],
		xAxis = {
			categories: []
		},
		seriesName,
		query,
		dataSearch,
		seriesValues,
		i, k;

	// What we WANT to output:
	/*series: [{
		name: 'Responses',
		data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
	}]*/

	// Loop keys
	for (i = 0; i < data.length; i++) {
		seriesName = data[i];
		query = {};
		query[seriesField] = seriesName;

		seriesValues = [];
		dataSearch = this._collection.find(query, {
			orderBy: orderBy
		});

		// Loop the keySearch data and grab the value for each item
		for (k = 0; k < dataSearch.length; k++) {
			xAxis.categories.push(dataSearch[k][keyField]);
			seriesValues.push(dataSearch[k][valField]);
		}

		seriesData.push({
			name: seriesName,
			data: seriesValues
		});
	}

	return {
		xAxis: xAxis,
		series: seriesData
	};
};

/**
 * Hook the events the chart needs to know about from the internal collection.
 * @private
 */
Highchart.prototype._hookEvents = function () {
	var self = this;

	self._collection.on('change', function () { self._changeListener.apply(self, arguments); });

	// If the collection is dropped, clean up after ourselves
	self._collection.on('drop', function () { self.drop.apply(self, arguments); });
};

/**
 * Handles changes to the collection data that the chart is reading from and then
 * updates the data in the chart display.
 * @private
 */
Highchart.prototype._changeListener = function () {
	var self = this;

	// Update the series data on the chart
	if(typeof self._collection !== 'undefined' && self._chart) {
		var data = self._collection.find(),
			i;

		switch (self._options.type) {
			case 'pie':
				self._chart.series[0].setData(
					self.pieDataFromCollectionData(
						data,
						self._options.keyField,
						self._options.valField
					),
					true,
					true
				);
				break;

			case 'bar':
			case 'line':
			case 'area':
			case 'column':
				var seriesData = self.seriesDataFromCollectionData(
					self._options.seriesField,
					self._options.keyField,
					self._options.valField,
					self._options.orderBy
				);

				self._chart.xAxis[0].setCategories(
					seriesData.xAxis.categories
				);

				for (i = 0; i < seriesData.series.length; i++) {
					if (self._chart.series[i]) {
						// Series exists, set it's data
						self._chart.series[i].setData(
							seriesData.series[i].data,
							true,
							true
						);
					} else {
						// Series data does not yet exist, add a new series
						self._chart.addSeries(
							seriesData.series[i],
							true,
							true
						);
					}
				}
				break;

			default:
				break;
		}
	}
};

/**
 * Destroys the chart and all internal references.
 * @returns {Boolean}
 */
Highchart.prototype.drop = function () {
	if (this._state !== 'dropped') {
		this._state = 'dropped';

		if (this._chart) {
			this._chart.destroy();
		}

		if (this._collection) {
			this._collection.off('change', this._changeListener);
			this._collection.off('drop', this.drop);

			if (this._collection._highcharts) {
				delete this._collection._highcharts[this._options.selector];
			}
		}

		delete this._chart;
		delete this._options;
		delete this._collection;

		this.emit('drop', this);

		return true;
	} else {
		return true;
	}
};

// Extend collection with highchart init
Collection.prototype.init = function () {
	this._highcharts = {};
	CollectionInit.apply(this, arguments);
};

/**
 * Creates a pie chart from the collection.
 * @type {Overload}
 */
Collection.prototype.pieChart = new Overload({
	/**
	 * Chart via options object.
	 * @func pieChart
	 * @memberof Highchart
	 * @param {Object} options The options object.
	 * @returns {*}
	 */
	'object': function (options) {
		options.type = 'pie';

		options.chartOptions = options.chartOptions || {};
		options.chartOptions.chart = options.chartOptions.chart || {};
		options.chartOptions.chart.type = 'pie';

		if (!this._highcharts[options.selector]) {
			// Store new chart in charts array
			this._highcharts[options.selector] = new Highchart(this, options);
		}

		return this._highcharts[options.selector];
	},

	/**
	 * Chart via defined params and an options object.
	 * @func pieChart
	 * @memberof Highchart
	 * @param {String|jQuery} selector The element to render the chart to.
	 * @param {String} keyField The field to use as the data key.
	 * @param {String} valField The field to use as the data value.
	 * @param {String} seriesName The name of the series to display on the chart.
	 * @param {Object} options The options object.
	 */
	'*, string, string, string, ...': function (selector, keyField, valField, seriesName, options) {
		options = options || {};

		options.selector = selector;
		options.keyField = keyField;
		options.valField = valField;
		options.seriesName = seriesName;

		// Call the main chart method
		this.pieChart(options);
	}
});

/**
 * Creates a line chart from the collection.
 * @type {Overload}
 */
Collection.prototype.lineChart = new Overload({
	/**
	 * Chart via options object.
	 * @func lineChart
	 * @memberof Highchart
	 * @param {Object} options The options object.
	 * @returns {*}
	 */
	'object': function (options) {
		options.type = 'line';

		options.chartOptions = options.chartOptions || {};
		options.chartOptions.chart = options.chartOptions.chart || {};
		options.chartOptions.chart.type = 'line';

		if (!this._highcharts[options.selector]) {
			// Store new chart in charts array
			this._highcharts[options.selector] = new Highchart(this, options);
		}

		return this._highcharts[options.selector];
	},

	/**
	 * Chart via defined params and an options object.
	 * @func lineChart
	 * @memberof Highchart
	 * @param {String|jQuery} selector The element to render the chart to.
	 * @param {String} seriesField The name of the series to plot.
	 * @param {String} keyField The field to use as the data key.
	 * @param {String} valField The field to use as the data value.
	 * @param {Object} options The options object.
	 */
	'*, string, string, string, ...': function (selector, seriesField, keyField, valField, options) {
		options = options || {};

		options.seriesField = seriesField;
		options.selector = selector;
		options.keyField = keyField;
		options.valField = valField;

		// Call the main chart method
		this.lineChart(options);
	}
});

/**
 * Creates an area chart from the collection.
 * @type {Overload}
 */
Collection.prototype.areaChart = new Overload({
	/**
	 * Chart via options object.
	 * @func areaChart
	 * @memberof Highchart
	 * @param {Object} options The options object.
	 * @returns {*}
	 */
	'object': function (options) {
		options.type = 'area';

		options.chartOptions = options.chartOptions || {};
		options.chartOptions.chart = options.chartOptions.chart || {};
		options.chartOptions.chart.type = 'area';

		if (!this._highcharts[options.selector]) {
			// Store new chart in charts array
			this._highcharts[options.selector] = new Highchart(this, options);
		}

		return this._highcharts[options.selector];
	},

	/**
	 * Chart via defined params and an options object.
	 * @func areaChart
	 * @memberof Highchart
	 * @param {String|jQuery} selector The element to render the chart to.
	 * @param {String} seriesField The name of the series to plot.
	 * @param {String} keyField The field to use as the data key.
	 * @param {String} valField The field to use as the data value.
	 * @param {Object} options The options object.
	 */
	'*, string, string, string, ...': function (selector, seriesField, keyField, valField, options) {
		options = options || {};

		options.seriesField = seriesField;
		options.selector = selector;
		options.keyField = keyField;
		options.valField = valField;

		// Call the main chart method
		this.areaChart(options);
	}
});

/**
 * Creates a column chart from the collection.
 * @type {Overload}
 */
Collection.prototype.columnChart = new Overload({
	/**
	 * Chart via options object.
	 * @func columnChart
	 * @memberof Highchart
	 * @param {Object} options The options object.
	 * @returns {*}
	 */
	'object': function (options) {
		options.type = 'column';

		options.chartOptions = options.chartOptions || {};
		options.chartOptions.chart = options.chartOptions.chart || {};
		options.chartOptions.chart.type = 'column';

		if (!this._highcharts[options.selector]) {
			// Store new chart in charts array
			this._highcharts[options.selector] = new Highchart(this, options);
		}

		return this._highcharts[options.selector];
	},

	/**
	 * Chart via defined params and an options object.
	 * @func columnChart
	 * @memberof Highchart
	 * @param {String|jQuery} selector The element to render the chart to.
	 * @param {String} seriesField The name of the series to plot.
	 * @param {String} keyField The field to use as the data key.
	 * @param {String} valField The field to use as the data value.
	 * @param {Object} options The options object.
	 */
	'*, string, string, string, ...': function (selector, seriesField, keyField, valField, options) {
		options = options || {};

		options.seriesField = seriesField;
		options.selector = selector;
		options.keyField = keyField;
		options.valField = valField;

		// Call the main chart method
		this.columnChart(options);
	}
});

/**
 * Creates a bar chart from the collection.
 * @type {Overload}
 */
Collection.prototype.barChart = new Overload({
	/**
	 * Chart via options object.
	 * @func barChart
	 * @memberof Highchart
	 * @param {Object} options The options object.
	 * @returns {*}
	 */
	'object': function (options) {
		options.type = 'bar';

		options.chartOptions = options.chartOptions || {};
		options.chartOptions.chart = options.chartOptions.chart || {};
		options.chartOptions.chart.type = 'bar';

		if (!this._highcharts[options.selector]) {
			// Store new chart in charts array
			this._highcharts[options.selector] = new Highchart(this, options);
		}

		return this._highcharts[options.selector];
	},

	/**
	 * Chart via defined params and an options object.
	 * @func barChart
	 * @memberof Highchart
	 * @param {String|jQuery} selector The element to render the chart to.
	 * @param {String} seriesField The name of the series to plot.
	 * @param {String} keyField The field to use as the data key.
	 * @param {String} valField The field to use as the data value.
	 * @param {Object} options The options object.
	 */
	'*, string, string, string, ...': function (selector, seriesField, keyField, valField, options) {
		options = options || {};

		options.seriesField = seriesField;
		options.selector = selector;
		options.keyField = keyField;
		options.valField = valField;

		// Call the main chart method
		this.barChart(options);
	}
});

/**
 * Creates a stacked bar chart from the collection.
 * @type {Overload}
 */
Collection.prototype.stackedBarChart = new Overload({
	/**
	 * Chart via options object.
	 * @func stackedBarChart
	 * @memberof Highchart
	 * @param {Object} options The options object.
	 * @returns {*}
	 */
	'object': function (options) {
		options.type = 'bar';

		options.chartOptions = options.chartOptions || {};
		options.chartOptions.chart = options.chartOptions.chart || {};
		options.chartOptions.chart.type = 'bar';

		options.plotOptions = options.plotOptions || {};
		options.plotOptions.series = options.plotOptions.series || {};
		options.plotOptions.series.stacking = options.plotOptions.series.stacking || 'normal';

		if (!this._highcharts[options.selector]) {
			// Store new chart in charts array
			this._highcharts[options.selector] = new Highchart(this, options);
		}

		return this._highcharts[options.selector];
	},

	/**
	 * Chart via defined params and an options object.
	 * @func stackedBarChart
	 * @memberof Highchart
	 * @param {String|jQuery} selector The element to render the chart to.
	 * @param {String} seriesField The name of the series to plot.
	 * @param {String} keyField The field to use as the data key.
	 * @param {String} valField The field to use as the data value.
	 * @param {Object} options The options object.
	 */
	'*, string, string, string, ...': function (selector, seriesField, keyField, valField, options) {
		options = options || {};

		options.seriesField = seriesField;
		options.selector = selector;
		options.keyField = keyField;
		options.valField = valField;

		// Call the main chart method
		this.stackedBarChart(options);
	}
});

/**
 * Removes a chart from the page by it's selector.
 * @memberof Collection
 * @param {String} selector The chart selector.
 */
Collection.prototype.dropChart = function (selector) {
	if (this._highcharts && this._highcharts[selector]) {
		this._highcharts[selector].drop();
	}
};

Shared.finishModule('Highchart');
module.exports = Highchart;
},{"./Overload":27,"./Shared":33}],12:[function(_dereq_,module,exports){
"use strict";

/*
name
id
rebuild
state
match
lookup
*/

var Shared = _dereq_('./Shared'),
	Path = _dereq_('./Path'),
	btree = function () {};

/**
 * The index class used to instantiate hash map indexes that the database can
 * use to speed up queries on collections and views.
 * @constructor
 */
var IndexBinaryTree = function () {
	this.init.apply(this, arguments);
};

IndexBinaryTree.prototype.init = function (keys, options, collection) {
	this._btree = new (btree.create(2, this.sortAsc))();
	this._size = 0;
	this._id = this._itemKeyHash(keys, keys);

	this.unique(options && options.unique ? options.unique : false);

	if (keys !== undefined) {
		this.keys(keys);
	}

	if (collection !== undefined) {
		this.collection(collection);
	}

	this.name(options && options.name ? options.name : this._id);
};

Shared.addModule('IndexBinaryTree', IndexBinaryTree);
Shared.mixin(IndexBinaryTree.prototype, 'Mixin.ChainReactor');
Shared.mixin(IndexBinaryTree.prototype, 'Mixin.Sorting');

IndexBinaryTree.prototype.id = function () {
	return this._id;
};

IndexBinaryTree.prototype.state = function () {
	return this._state;
};

IndexBinaryTree.prototype.size = function () {
	return this._size;
};

Shared.synthesize(IndexBinaryTree.prototype, 'data');
Shared.synthesize(IndexBinaryTree.prototype, 'name');
Shared.synthesize(IndexBinaryTree.prototype, 'collection');
Shared.synthesize(IndexBinaryTree.prototype, 'type');
Shared.synthesize(IndexBinaryTree.prototype, 'unique');

IndexBinaryTree.prototype.keys = function (val) {
	if (val !== undefined) {
		this._keys = val;

		// Count the keys
		this._keyCount = (new Path()).parse(this._keys).length;
		return this;
	}

	return this._keys;
};

IndexBinaryTree.prototype.rebuild = function () {
	// Do we have a collection?
	if (this._collection) {
		// Get sorted data
		var collection = this._collection.subset({}, {
				$decouple: false,
				$orderBy: this._keys
			}),
			collectionData = collection.find(),
			dataIndex,
			dataCount = collectionData.length;

		// Clear the index data for the index
		this._btree = new (btree.create(2, this.sortAsc))();

		if (this._unique) {
			this._uniqueLookup = {};
		}

		// Loop the collection data
		for (dataIndex = 0; dataIndex < dataCount; dataIndex++) {
			this.insert(collectionData[dataIndex]);
		}
	}

	this._state = {
		name: this._name,
		keys: this._keys,
		indexSize: this._size,
		built: new Date(),
		updated: new Date(),
		ok: true
	};
};

IndexBinaryTree.prototype.insert = function (dataItem, options) {
	var uniqueFlag = this._unique,
		uniqueHash,
		dataItemHash = this._itemKeyHash(dataItem, this._keys),
		keyArr;

	if (uniqueFlag) {
		uniqueHash = this._itemHash(dataItem, this._keys);
		this._uniqueLookup[uniqueHash] = dataItem;
	}

	// We store multiple items that match a key inside an array
	// that is then stored against that key in the tree...

	// Check if item exists for this key already
	keyArr = this._btree.get(dataItemHash);

	// Check if the array exists
	if (keyArr === undefined) {
		// Generate an array for this key first
		keyArr = [];

		// Put the new array into the tree under the key
		this._btree.put(dataItemHash, keyArr);
	}

	// Push the item into the array
	keyArr.push(dataItem);

	this._size++;
};

IndexBinaryTree.prototype.remove = function (dataItem, options) {
	var uniqueFlag = this._unique,
		uniqueHash,
		dataItemHash = this._itemKeyHash(dataItem, this._keys),
		keyArr,
		itemIndex;

	if (uniqueFlag) {
		uniqueHash = this._itemHash(dataItem, this._keys);
		delete this._uniqueLookup[uniqueHash];
	}

	// Try and get the array for the item hash key
	keyArr = this._btree.get(dataItemHash);

	if (keyArr !== undefined) {
		// The key array exits, remove the item from the key array
		itemIndex = keyArr.indexOf(dataItem);

		if (itemIndex > -1) {
			// Check the length of the array
			if (keyArr.length === 1) {
				// This item is the last in the array, just kill the tree entry
				this._btree.del(dataItemHash);
			} else {
				// Remove the item
				keyArr.splice(itemIndex, 1);
			}

			this._size--;
		}
	}
};

IndexBinaryTree.prototype.violation = function (dataItem) {
	// Generate item hash
	var uniqueHash = this._itemHash(dataItem, this._keys);

	// Check if the item breaks the unique constraint
	return Boolean(this._uniqueLookup[uniqueHash]);
};

IndexBinaryTree.prototype.hashViolation = function (uniqueHash) {
	// Check if the item breaks the unique constraint
	return Boolean(this._uniqueLookup[uniqueHash]);
};

IndexBinaryTree.prototype.lookup = function (query) {
	return this._data[this._itemHash(query, this._keys)] || [];
};

IndexBinaryTree.prototype.match = function (query, options) {
	// Check if the passed query has data in the keys our index
	// operates on and if so, is the query sort matching our order
	var pathSolver = new Path();
	var indexKeyArr = pathSolver.parseArr(this._keys),
		queryArr = pathSolver.parseArr(query),
		matchedKeys = [],
		matchedKeyCount = 0,
		i;

	// Loop the query array and check the order of keys against the
	// index key array to see if this index can be used
	for (i = 0; i < indexKeyArr.length; i++) {
		if (queryArr[i] === indexKeyArr[i]) {
			matchedKeyCount++;
			matchedKeys.push(queryArr[i]);
		} else {
			// Query match failed - this is a hash map index so partial key match won't work
			return {
				matchedKeys: [],
				totalKeyCount: queryArr.length,
				score: 0
			};
		}
	}

	return {
		matchedKeys: matchedKeys,
		totalKeyCount: queryArr.length,
		score: matchedKeyCount
	};

	//return pathSolver.countObjectPaths(this._keys, query);
};

IndexBinaryTree.prototype._itemHash = function (item, keys) {
	var path = new Path(),
		pathData,
		hash = '',
		k;

	pathData = path.parse(keys);

	for (k = 0; k < pathData.length; k++) {
		if (hash) { hash += '_'; }
		hash += path.value(item, pathData[k].path).join(':');
	}

	return hash;
};

IndexBinaryTree.prototype._itemKeyHash = function (item, keys) {
	var path = new Path(),
		pathData,
		hash = '',
		k;

	pathData = path.parse(keys);

	for (k = 0; k < pathData.length; k++) {
		if (hash) { hash += '_'; }
		hash += path.keyValue(item, pathData[k].path);
	}

	return hash;
};

IndexBinaryTree.prototype._itemHashArr = function (item, keys) {
	var path = new Path(),
		pathData,
		//hash = '',
		hashArr = [],
		valArr,
		i, k, j;

	pathData = path.parse(keys);

	for (k = 0; k < pathData.length; k++) {
		valArr = path.value(item, pathData[k].path);

		for (i = 0; i < valArr.length; i++) {
			if (k === 0) {
				// Setup the initial hash array
				hashArr.push(valArr[i]);
			} else {
				// Loop the hash array and concat the value to it
				for (j = 0; j < hashArr.length; j++) {
					hashArr[j] = hashArr[j] + '_' + valArr[i];
				}
			}
		}
	}

	return hashArr;
};

Shared.finishModule('IndexBinaryTree');
module.exports = IndexBinaryTree;
},{"./Path":29,"./Shared":33}],13:[function(_dereq_,module,exports){
"use strict";

var Shared = _dereq_('./Shared'),
	Path = _dereq_('./Path');

/**
 * The index class used to instantiate hash map indexes that the database can
 * use to speed up queries on collections and views.
 * @constructor
 */
var IndexHashMap = function () {
	this.init.apply(this, arguments);
};

IndexHashMap.prototype.init = function (keys, options, collection) {
	this._crossRef = {};
	this._size = 0;
	this._id = this._itemKeyHash(keys, keys);

	this.data({});
	this.unique(options && options.unique ? options.unique : false);

	if (keys !== undefined) {
		this.keys(keys);
	}

	if (collection !== undefined) {
		this.collection(collection);
	}

	this.name(options && options.name ? options.name : this._id);
};

Shared.addModule('IndexHashMap', IndexHashMap);
Shared.mixin(IndexHashMap.prototype, 'Mixin.ChainReactor');

IndexHashMap.prototype.id = function () {
	return this._id;
};

IndexHashMap.prototype.state = function () {
	return this._state;
};

IndexHashMap.prototype.size = function () {
	return this._size;
};

Shared.synthesize(IndexHashMap.prototype, 'data');
Shared.synthesize(IndexHashMap.prototype, 'name');
Shared.synthesize(IndexHashMap.prototype, 'collection');
Shared.synthesize(IndexHashMap.prototype, 'type');
Shared.synthesize(IndexHashMap.prototype, 'unique');

IndexHashMap.prototype.keys = function (val) {
	if (val !== undefined) {
		this._keys = val;

		// Count the keys
		this._keyCount = (new Path()).parse(this._keys).length;
		return this;
	}

	return this._keys;
};

IndexHashMap.prototype.rebuild = function () {
	// Do we have a collection?
	if (this._collection) {
		// Get sorted data
		var collection = this._collection.subset({}, {
				$decouple: false,
				$orderBy: this._keys
			}),
			collectionData = collection.find(),
			dataIndex,
			dataCount = collectionData.length;

		// Clear the index data for the index
		this._data = {};

		if (this._unique) {
			this._uniqueLookup = {};
		}

		// Loop the collection data
		for (dataIndex = 0; dataIndex < dataCount; dataIndex++) {
			this.insert(collectionData[dataIndex]);
		}
	}

	this._state = {
		name: this._name,
		keys: this._keys,
		indexSize: this._size,
		built: new Date(),
		updated: new Date(),
		ok: true
	};
};

IndexHashMap.prototype.insert = function (dataItem, options) {
	var uniqueFlag = this._unique,
		uniqueHash,
		itemHashArr,
		hashIndex;

	if (uniqueFlag) {
		uniqueHash = this._itemHash(dataItem, this._keys);
		this._uniqueLookup[uniqueHash] = dataItem;
	}

	// Generate item hash
	itemHashArr = this._itemHashArr(dataItem, this._keys);

	// Get the path search results and store them
	for (hashIndex = 0; hashIndex < itemHashArr.length; hashIndex++) {
		this.pushToPathValue(itemHashArr[hashIndex], dataItem);
	}
};

IndexHashMap.prototype.update = function (dataItem, options) {
	// TODO: Write updates to work
	// 1: Get uniqueHash for the dataItem primary key value (may need to generate a store for this)
	// 2: Remove the uniqueHash as it currently stands
	// 3: Generate a new uniqueHash for dataItem
	// 4: Insert the new uniqueHash
};

IndexHashMap.prototype.remove = function (dataItem, options) {
	var uniqueFlag = this._unique,
		uniqueHash,
		itemHashArr,
		hashIndex;

	if (uniqueFlag) {
		uniqueHash = this._itemHash(dataItem, this._keys);
		delete this._uniqueLookup[uniqueHash];
	}

	// Generate item hash
	itemHashArr = this._itemHashArr(dataItem, this._keys);

	// Get the path search results and store them
	for (hashIndex = 0; hashIndex < itemHashArr.length; hashIndex++) {
		this.pullFromPathValue(itemHashArr[hashIndex], dataItem);
	}
};

IndexHashMap.prototype.violation = function (dataItem) {
	// Generate item hash
	var uniqueHash = this._itemHash(dataItem, this._keys);

	// Check if the item breaks the unique constraint
	return Boolean(this._uniqueLookup[uniqueHash]);
};

IndexHashMap.prototype.hashViolation = function (uniqueHash) {
	// Check if the item breaks the unique constraint
	return Boolean(this._uniqueLookup[uniqueHash]);
};

IndexHashMap.prototype.pushToPathValue = function (hash, obj) {
	var pathValArr = this._data[hash] = this._data[hash] || [];

	// Make sure we have not already indexed this object at this path/value
	if (pathValArr.indexOf(obj) === -1) {
		// Index the object
		pathValArr.push(obj);

		// Record the reference to this object in our index size
		this._size++;

		// Cross-reference this association for later lookup
		this.pushToCrossRef(obj, pathValArr);
	}
};

IndexHashMap.prototype.pullFromPathValue = function (hash, obj) {
	var pathValArr = this._data[hash],
		indexOfObject;

	// Make sure we have already indexed this object at this path/value
	indexOfObject = pathValArr.indexOf(obj);

	if (indexOfObject > -1) {
		// Un-index the object
		pathValArr.splice(indexOfObject, 1);

		// Record the reference to this object in our index size
		this._size--;

		// Remove object cross-reference
		this.pullFromCrossRef(obj, pathValArr);
	}

	// Check if we should remove the path value array
	if (!pathValArr.length) {
		// Remove the array
		delete this._data[hash];
	}
};

IndexHashMap.prototype.pull = function (obj) {
	// Get all places the object has been used and remove them
	var id = obj[this._collection.primaryKey()],
		crossRefArr = this._crossRef[id],
		arrIndex,
		arrCount = crossRefArr.length,
		arrItem;

	for (arrIndex = 0; arrIndex < arrCount; arrIndex++) {
		arrItem = crossRefArr[arrIndex];

		// Remove item from this index lookup array
		this._pullFromArray(arrItem, obj);
	}

	// Record the reference to this object in our index size
	this._size--;

	// Now remove the cross-reference entry for this object
	delete this._crossRef[id];
};

IndexHashMap.prototype._pullFromArray = function (arr, obj) {
	var arrCount = arr.length;

	while (arrCount--) {
		if (arr[arrCount] === obj) {
			arr.splice(arrCount, 1);
		}
	}
};

IndexHashMap.prototype.pushToCrossRef = function (obj, pathValArr) {
	var id = obj[this._collection.primaryKey()],
		crObj;

	this._crossRef[id] = this._crossRef[id] || [];

	// Check if the cross-reference to the pathVal array already exists
	crObj = this._crossRef[id];

	if (crObj.indexOf(pathValArr) === -1) {
		// Add the cross-reference
		crObj.push(pathValArr);
	}
};

IndexHashMap.prototype.pullFromCrossRef = function (obj, pathValArr) {
	var id = obj[this._collection.primaryKey()];

	delete this._crossRef[id];
};

IndexHashMap.prototype.lookup = function (query) {
	return this._data[this._itemHash(query, this._keys)] || [];
};

IndexHashMap.prototype.match = function (query, options) {
	// Check if the passed query has data in the keys our index
	// operates on and if so, is the query sort matching our order
	var pathSolver = new Path();
	var indexKeyArr = pathSolver.parseArr(this._keys),
		queryArr = pathSolver.parseArr(query),
		matchedKeys = [],
		matchedKeyCount = 0,
		i;

	// Loop the query array and check the order of keys against the
	// index key array to see if this index can be used
	for (i = 0; i < indexKeyArr.length; i++) {
		if (queryArr[i] === indexKeyArr[i]) {
			matchedKeyCount++;
			matchedKeys.push(queryArr[i]);
		} else {
			// Query match failed - this is a hash map index so partial key match won't work
			return {
				matchedKeys: [],
				totalKeyCount: queryArr.length,
				score: 0
			};
		}
	}

	return {
		matchedKeys: matchedKeys,
		totalKeyCount: queryArr.length,
		score: matchedKeyCount
	};

	//return pathSolver.countObjectPaths(this._keys, query);
};

IndexHashMap.prototype._itemHash = function (item, keys) {
	var path = new Path(),
		pathData,
		hash = '',
		k;

	pathData = path.parse(keys);

	for (k = 0; k < pathData.length; k++) {
		if (hash) { hash += '_'; }
		hash += path.value(item, pathData[k].path).join(':');
	}

	return hash;
};

IndexHashMap.prototype._itemKeyHash = function (item, keys) {
	var path = new Path(),
		pathData,
		hash = '',
		k;

	pathData = path.parse(keys);

	for (k = 0; k < pathData.length; k++) {
		if (hash) { hash += '_'; }
		hash += path.keyValue(item, pathData[k].path);
	}

	return hash;
};

IndexHashMap.prototype._itemHashArr = function (item, keys) {
	var path = new Path(),
		pathData,
		//hash = '',
		hashArr = [],
		valArr,
		i, k, j;

	pathData = path.parse(keys);

	for (k = 0; k < pathData.length; k++) {
		valArr = path.value(item, pathData[k].path);

		for (i = 0; i < valArr.length; i++) {
			if (k === 0) {
				// Setup the initial hash array
				hashArr.push(valArr[i]);
			} else {
				// Loop the hash array and concat the value to it
				for (j = 0; j < hashArr.length; j++) {
					hashArr[j] = hashArr[j] + '_' + valArr[i];
				}
			}
		}
	}

	return hashArr;
};

Shared.finishModule('IndexHashMap');
module.exports = IndexHashMap;
},{"./Path":29,"./Shared":33}],14:[function(_dereq_,module,exports){
"use strict";

var Shared = _dereq_('./Shared');

/**
 * The key value store class used when storing basic in-memory KV data,
 * and can be queried for quick retrieval. Mostly used for collection
 * primary key indexes and lookups.
 * @param {String=} name Optional KV store name.
 * @constructor
 */
var KeyValueStore = function (name) {
	this.init.apply(this, arguments);
};

KeyValueStore.prototype.init = function (name) {
	this._name = name;
	this._data = {};
	this._primaryKey = '_id';
};

Shared.addModule('KeyValueStore', KeyValueStore);
Shared.mixin(KeyValueStore.prototype, 'Mixin.ChainReactor');

/**
 * Get / set the name of the key/value store.
 * @param {String} val The name to set.
 * @returns {*}
 */
Shared.synthesize(KeyValueStore.prototype, 'name');

/**
 * Get / set the primary key.
 * @param {String} key The key to set.
 * @returns {*}
 */
KeyValueStore.prototype.primaryKey = function (key) {
	if (key !== undefined) {
		this._primaryKey = key;
		return this;
	}

	return this._primaryKey;
};

/**
 * Removes all data from the store.
 * @returns {*}
 */
KeyValueStore.prototype.truncate = function () {
	this._data = {};
	return this;
};

/**
 * Sets data against a key in the store.
 * @param {String} key The key to set data for.
 * @param {*} value The value to assign to the key.
 * @returns {*}
 */
KeyValueStore.prototype.set = function (key, value) {
	this._data[key] = value ? value : true;
	return this;
};

/**
 * Gets data stored for the passed key.
 * @param {String} key The key to get data for.
 * @returns {*}
 */
KeyValueStore.prototype.get = function (key) {
	return this._data[key];
};

/**
 * Get / set the primary key.
 * @param {*} obj A lookup query, can be a string key, an array of string keys,
 * an object with further query clauses or a regular expression that should be
 * run against all keys.
 * @returns {*}
 */
KeyValueStore.prototype.lookup = function (obj) {
	var pKeyVal = obj[this._primaryKey],
		arrIndex,
		arrCount,
		lookupItem,
		result;

	if (pKeyVal instanceof Array) {
		// An array of primary keys, find all matches
		arrCount = pKeyVal.length;
		result = [];

		for (arrIndex = 0; arrIndex < arrCount; arrIndex++) {
			lookupItem = this._data[pKeyVal[arrIndex]];

			if (lookupItem) {
				result.push(lookupItem);
			}
		}

		return result;
	} else if (pKeyVal instanceof RegExp) {
		// Create new data
		result = [];

		for (arrIndex in this._data) {
			if (this._data.hasOwnProperty(arrIndex)) {
				if (pKeyVal.test(arrIndex)) {
					result.push(this._data[arrIndex]);
				}
			}
		}

		return result;
	} else if (typeof pKeyVal === 'object') {
		// The primary key clause is an object, now we have to do some
		// more extensive searching
		if (pKeyVal.$ne) {
			// Create new data
			result = [];

			for (arrIndex in this._data) {
				if (this._data.hasOwnProperty(arrIndex)) {
					if (arrIndex !== pKeyVal.$ne) {
						result.push(this._data[arrIndex]);
					}
				}
			}

			return result;
		}

		if (pKeyVal.$in && (pKeyVal.$in instanceof Array)) {
			// Create new data
			result = [];

			for (arrIndex in this._data) {
				if (this._data.hasOwnProperty(arrIndex)) {
					if (pKeyVal.$in.indexOf(arrIndex) > -1) {
						result.push(this._data[arrIndex]);
					}
				}
			}

			return result;
		}

		if (pKeyVal.$nin && (pKeyVal.$nin instanceof Array)) {
			// Create new data
			result = [];

			for (arrIndex in this._data) {
				if (this._data.hasOwnProperty(arrIndex)) {
					if (pKeyVal.$nin.indexOf(arrIndex) === -1) {
						result.push(this._data[arrIndex]);
					}
				}
			}

			return result;
		}

		if (pKeyVal.$or && (pKeyVal.$or instanceof Array)) {
			// Create new data
			result = [];

			for (arrIndex = 0; arrIndex < pKeyVal.$or.length; arrIndex++) {
				result = result.concat(this.lookup(pKeyVal.$or[arrIndex]));
			}

			return result;
		}
	} else {
		// Key is a basic lookup from string
		lookupItem = this._data[pKeyVal];

		if (lookupItem !== undefined) {
			return [lookupItem];
		} else {
			return [];
		}
	}
};

/**
 * Removes data for the given key from the store.
 * @param {String} key The key to un-set.
 * @returns {*}
 */
KeyValueStore.prototype.unSet = function (key) {
	delete this._data[key];
	return this;
};

/**
 * Sets data for the give key in the store only where the given key
 * does not already have a value in the store.
 * @param {String} key The key to set data for.
 * @param {*} value The value to assign to the key.
 * @returns {Boolean} True if data was set or false if data already
 * exists for the key.
 */
KeyValueStore.prototype.uniqueSet = function (key, value) {
	if (this._data[key] === undefined) {
		this._data[key] = value;
		return true;
	}

	return false;
};

Shared.finishModule('KeyValueStore');
module.exports = KeyValueStore;
},{"./Shared":33}],15:[function(_dereq_,module,exports){
"use strict";

var Shared = _dereq_('./Shared'),
	Operation = _dereq_('./Operation');

/**
 * The metrics class used to store details about operations.
 * @constructor
 */
var Metrics = function () {
	this.init.apply(this, arguments);
};

Metrics.prototype.init = function () {
	this._data = [];
};

Shared.addModule('Metrics', Metrics);
Shared.mixin(Metrics.prototype, 'Mixin.ChainReactor');

/**
 * Creates an operation within the metrics instance and if metrics
 * are currently enabled (by calling the start() method) the operation
 * is also stored in the metrics log.
 * @param {String} name The name of the operation.
 * @returns {Operation}
 */
Metrics.prototype.create = function (name) {
	var op = new Operation(name);

	if (this._enabled) {
		this._data.push(op);
	}

	return op;
};

/**
 * Starts logging operations.
 * @returns {Metrics}
 */
Metrics.prototype.start = function () {
	this._enabled = true;
	return this;
};

/**
 * Stops logging operations.
 * @returns {Metrics}
 */
Metrics.prototype.stop = function () {
	this._enabled = false;
	return this;
};

/**
 * Clears all logged operations.
 * @returns {Metrics}
 */
Metrics.prototype.clear = function () {
	this._data = [];
	return this;
};

/**
 * Returns an array of all logged operations.
 * @returns {Array}
 */
Metrics.prototype.list = function () {
	return this._data;
};

Shared.finishModule('Metrics');
module.exports = Metrics;
},{"./Operation":26,"./Shared":33}],16:[function(_dereq_,module,exports){
"use strict";

var CRUD = {
	preSetData: function () {
		
	},
	
	postSetData: function () {
		
	}
};

module.exports = CRUD;
},{}],17:[function(_dereq_,module,exports){
"use strict";
/**
 * The chain reactor mixin, provides a class with chain reaction capabilities.
 * @mixin
 */
var ChainReactor = {
	/**
	 *
	 * @param obj
	 */
	chain: function (obj) {
		this._chain = this._chain || [];
		var index = this._chain.indexOf(obj);

		if (index === -1) {
			this._chain.push(obj);
		}
	},

	unChain: function (obj) {
		if (this._chain) {
			var index = this._chain.indexOf(obj);

			if (index > -1) {
				this._chain.splice(index, 1);
			}
		}
	},

	chainSend: function (type, data, options) {
		if (this._chain) {
			var arr = this._chain,
				arrItem,
				count = arr.length,
				index;

			for (index = 0; index < count; index++) {
				arrItem = arr[index];

				if (!arrItem._state || (arrItem._state && arrItem._state !== 'dropped')) {
					arrItem.chainReceive(this, type, data, options);
				} else {
					console.log('Reactor Data:', type, data, options);
					console.log('Reactor Node:', arrItem);
					throw('Chain reactor attempting to send data to target reactor node that is in a dropped state!');
				}

			}
		}
	},

	chainReceive: function (sender, type, data, options) {
		var chainPacket = {
			sender: sender,
			type: type,
			data: data,
			options: options
		};

		// Fire our internal handler
		if (!this._chainHandler || (this._chainHandler && !this._chainHandler(chainPacket))) {
			// Propagate the message down the chain
			this.chainSend(chainPacket.type, chainPacket.data, chainPacket.options);
		}
	}
};

module.exports = ChainReactor;
},{}],18:[function(_dereq_,module,exports){
"use strict";

var idCounter = 0,
	Overload = _dereq_('./Overload'),
	Common;

Common = {
	/**
	 * Gets / sets data in the item store. The store can be used to set and
	 * retrieve data against a key. Useful for adding arbitrary key/value data
	 * to a collection / view etc and retrieving it later.
	 * @param {String|*} key The key under which to store the passed value or
	 * retrieve the existing stored value.
	 * @param {*=} val Optional value. If passed will overwrite the existing value
	 * stored against the specified key if one currently exists.
	 * @returns {*}
	 */
	store: function (key, val) {
		if (key !== undefined) {
			if (val !== undefined) {
				// Store the data
				this._store = this._store || {};
				this._store[key] = val;

				return this;
			}

			if (this._store) {
				return this._store[key];
			}
		}

		return undefined;
	},

	/**
	 * Removes a previously stored key/value pair from the item store, set previously
	 * by using the store() method.
	 * @param {String|*} key The key of the key/value pair to remove;
	 * @returns {Common} Returns this for chaining.
	 */
	unStore: function (key) {
		if (key !== undefined) {
			delete this._store[key];
		}

		return this;
	},

	/**
	 * Returns a non-referenced version of the passed object / array.
	 * @param {Object} data The object or array to return as a non-referenced version.
	 * @param {Number=} copies Optional number of copies to produce. If specified, the return
	 * value will be an array of decoupled objects, each distinct from the other.
	 * @returns {*}
	 */	
	decouple: function (data, copies) {
		if (data !== undefined) {
			if (!copies) {
				return JSON.parse(JSON.stringify(data));
			} else {
				var i,
					json = JSON.stringify(data),
					copyArr = [];

				for (i = 0; i < copies; i++) {
					copyArr.push(JSON.parse(json));
				}

				return copyArr;
			}
		}

		return undefined;
	},
	
	/**
	 * Generates a new 16-character hexadecimal unique ID or
	 * generates a new 16-character hexadecimal ID based on
	 * the passed string. Will always generate the same ID
	 * for the same string.
	 * @param {String=} str A string to generate the ID from.
	 * @return {String}
	 */
	objectId: function (str) {
		var id,
			pow = Math.pow(10, 17);

		if (!str) {
			idCounter++;

			id = (idCounter + (
				Math.random() * pow +
				Math.random() * pow +
				Math.random() * pow +
				Math.random() * pow
			)).toString(16);
		} else {
			var val = 0,
				count = str.length,
				i;

			for (i = 0; i < count; i++) {
				val += str.charCodeAt(i) * pow;
			}

			id = val.toString(16);
		}

		return id;
	},

	/**
	 * Gets / sets debug flag that can enable debug message output to the
	 * console if required.
	 * @param {Boolean} val The value to set debug flag to.
	 * @return {Boolean} True if enabled, false otherwise.
	 */
	/**
	 * Sets debug flag for a particular type that can enable debug message
	 * output to the console if required.
	 * @param {String} type The name of the debug type to set flag for.
	 * @param {Boolean} val The value to set debug flag to.
	 * @return {Boolean} True if enabled, false otherwise.
	 */
	debug: new Overload([
		function () {
			return this._debug && this._debug.all;
		},

		function (val) {
			if (val !== undefined) {
				if (typeof val === 'boolean') {
					this._debug = this._debug || {};
					this._debug.all = val;
					this.chainSend('debug', this._debug);
					return this;
				} else {
					return (this._debug && this._debug[val]) || (this._db && this._db._debug && this._db._debug[val]) || (this._debug && this._debug.all);
				}
			}

			return this._debug && this._debug.all;
		},

		function (type, val) {
			if (type !== undefined) {
				if (val !== undefined) {
					this._debug = this._debug || {};
					this._debug[type] = val;
					this.chainSend('debug', this._debug);
					return this;
				}

				return (this._debug && this._debug[val]) || (this._db && this._db._debug && this._db._debug[type]);
			}

			return this._debug && this._debug.all;
		}
	])
};

module.exports = Common;
},{"./Overload":27}],19:[function(_dereq_,module,exports){
"use strict";

var Constants = {
	TYPE_INSERT: 0,
	TYPE_UPDATE: 1,
	TYPE_REMOVE: 2,

	PHASE_BEFORE: 0,
	PHASE_AFTER: 1
};

module.exports = Constants;
},{}],20:[function(_dereq_,module,exports){
"use strict";

var Overload = _dereq_('./Overload');

var Events = {
	on: new Overload({
		/**
		 * Attach an event listener to the passed event.
		 * @param {String} event The name of the event to listen for.
		 * @param {Function} listener The method to call when the event is fired.
		 */
		'string, function': function (event, listener) {
			this._listeners = this._listeners || {};
			this._listeners[event] = this._listeners[event] || {};
			this._listeners[event]['*'] = this._listeners[event]['*'] || [];
			this._listeners[event]['*'].push(listener);

			return this;
		},

		/**
		 * Attach an event listener to the passed event only if the passed
		 * id matches the document id for the event being fired.
		 * @param {String} event The name of the event to listen for.
		 * @param {*} id The document id to match against.
		 * @param {Function} listener The method to call when the event is fired.
		 */
		'string, *, function': function (event, id, listener) {
			this._listeners = this._listeners || {};
			this._listeners[event] = this._listeners[event] || {};
			this._listeners[event][id] = this._listeners[event][id] || [];
			this._listeners[event][id].push(listener);

			return this;
		}
	}),

	off: new Overload({
		'string': function (event) {
			if (this._listeners && this._listeners[event] && event in this._listeners) {
				delete this._listeners[event];
			}

			return this;
		},

		'string, function': function (event, listener) {
			var arr,
				index;

			if (typeof(listener) === 'string') {
				if (this._listeners && this._listeners[event] && this._listeners[event][listener]) {
					delete this._listeners[event][listener];
				}
			} else {
				if (this._listeners && event in this._listeners) {
					arr = this._listeners[event]['*'];
					index = arr.indexOf(listener);

					if (index > -1) {
						arr.splice(index, 1);
					}
				}
			}

			return this;
		},

		'string, *, function': function (event, id, listener) {
			if (this._listeners && event in this._listeners && id in this.listeners[event]) {
				var arr = this._listeners[event][id],
					index = arr.indexOf(listener);

				if (index > -1) {
					arr.splice(index, 1);
				}
			}
		},

		'string, *': function (event, id) {
			if (this._listeners && event in this._listeners && id in this._listeners[event]) {
				// Kill all listeners for this event id
				delete this._listeners[event][id];
			}
		}
	}),

	emit: function (event, data) {
		this._listeners = this._listeners || {};

		if (event in this._listeners) {
			var arrIndex,
				arrCount;

			// Handle global emit
			if (this._listeners[event]['*']) {
				var arr = this._listeners[event]['*'];

				arrCount = arr.length;

				for (arrIndex = 0; arrIndex < arrCount; arrIndex++) {
					arr[arrIndex].apply(this, Array.prototype.slice.call(arguments, 1));
				}
			}

			// Handle individual emit
			if (data instanceof Array) {
				// Check if the array is an array of objects in the collection
				if (data[0] && data[0][this._primaryKey]) {
					// Loop the array and check for listeners against the primary key
					var listenerIdArr = this._listeners[event],
						listenerIdCount,
						listenerIdIndex;

					arrCount = data.length;

					for (arrIndex = 0; arrIndex < arrCount; arrIndex++) {
						if (listenerIdArr[data[arrIndex][this._primaryKey]]) {
							// Emit for this id
							listenerIdCount = listenerIdArr[data[arrIndex][this._primaryKey]].length;
							for (listenerIdIndex = 0; listenerIdIndex < listenerIdCount; listenerIdIndex++) {
								listenerIdArr[data[arrIndex][this._primaryKey]][listenerIdIndex].apply(this, Array.prototype.slice.call(arguments, 1));
							}
						}
					}
				}
			}
		}

		return this;
	}
};

module.exports = Events;
},{"./Overload":27}],21:[function(_dereq_,module,exports){
"use strict";

var Matching = {
	/**
	 * Internal method that checks a document against a test object.
	 * @param {*} source The source object or value to test against.
	 * @param {*} test The test object or value to test with.
	 * @param {String=} opToApply The special operation to apply to the test such
	 * as 'and' or an 'or' operator.
	 * @param {Object=} options An object containing options to apply to the
	 * operation such as limiting the fields returned etc.
	 * @returns {Boolean} True if the test was positive, false on negative.
	 * @private
	 */
	_match: function (source, test, opToApply, options) {
		// TODO: This method is quite long, break into smaller pieces
		var operation,
			applyOp,
			recurseVal,
			tmpIndex,
			sourceType = typeof source,
			testType = typeof test,
			matchedAll = true,
			opResult,
			substringCache,
			i;

		options = options || {};

		// Check if options currently holds a root query object
		if (!options.$rootQuery) {
			// Root query not assigned, hold the root query
			options.$rootQuery = test;
		}

		options.$rootData = options.$rootData || {};

		// Check if the comparison data are both strings or numbers
		if ((sourceType === 'string' || sourceType === 'number') && (testType === 'string' || testType === 'number')) {
			// The source and test data are flat types that do not require recursive searches,
			// so just compare them and return the result
			if (sourceType === 'number') {
				// Number comparison
				if (source !== test) {
					matchedAll = false;
				}
			} else {
				// String comparison
				if (source.localeCompare(test)) {
					matchedAll = false;
				}
			}
		} else {
			for (i in test) {
				if (test.hasOwnProperty(i)) {
					// Reset operation flag
					operation = false;

					substringCache = i.substr(0, 2);

					// Check if the property is a comment (ignorable)
					if (substringCache === '//') {
						// Skip this property
						continue;
					}

					// Check if the property starts with a dollar (function)
					if (substringCache.indexOf('$') === 0) {
						// Ask the _matchOp method to handle the operation
						opResult = this._matchOp(i, source, test[i], options);

						// Check the result of the matchOp operation
						// If the result is -1 then no operation took place, otherwise the result
						// will be a boolean denoting a match (true) or no match (false)
						if (opResult > -1) {
							if (opResult) {
								if (opToApply === 'or') {
									return true;
								}
							} else {
								// Set the matchedAll flag to the result of the operation
								// because the operation did not return true
								matchedAll = opResult;
							}

							// Record that an operation was handled
							operation = true;
						}
					}

					// Check for regex
					if (!operation && test[i] instanceof RegExp) {
						operation = true;

						if (typeof(source) === 'object' && source[i] !== undefined && test[i].test(source[i])) {
							if (opToApply === 'or') {
								return true;
							}
						} else {
							matchedAll = false;
						}
					}

					if (!operation) {
						// Check if our query is an object
						if (typeof(test[i]) === 'object') {
							// Because test[i] is an object, source must also be an object

							// Check if our source data we are checking the test query against
							// is an object or an array
							if (source[i] !== undefined) {
								if (source[i] instanceof Array && !(test[i] instanceof Array)) {
									// The source data is an array, so check each item until a
									// match is found
									recurseVal = false;
									for (tmpIndex = 0; tmpIndex < source[i].length; tmpIndex++) {
										recurseVal = this._match(source[i][tmpIndex], test[i], applyOp, options);

										if (recurseVal) {
											// One of the array items matched the query so we can
											// include this item in the results, so break now
											break;
										}
									}

									if (recurseVal) {
										if (opToApply === 'or') {
											return true;
										}
									} else {
										matchedAll = false;
									}
								} else if (!(source[i] instanceof Array) && test[i] instanceof Array) {
									// The test key data is an array and the source key data is not so check
									// each item in the test key data to see if the source item matches one
									// of them. This is effectively an $in search.
									recurseVal = false;

									for (tmpIndex = 0; tmpIndex < test[i].length; tmpIndex++) {
										recurseVal = this._match(source[i], test[i][tmpIndex], applyOp, options);

										if (recurseVal) {
											// One of the array items matched the query so we can
											// include this item in the results, so break now
											break;
										}
									}

									if (recurseVal) {
										if (opToApply === 'or') {
											return true;
										}
									} else {
										matchedAll = false;
									}
								} else if (typeof(source) === 'object') {
									// Recurse down the object tree
									recurseVal = this._match(source[i], test[i], applyOp, options);

									if (recurseVal) {
										if (opToApply === 'or') {
											return true;
										}
									} else {
										matchedAll = false;
									}
								} else {
									recurseVal = this._match(undefined, test[i], applyOp, options);

									if (recurseVal) {
										if (opToApply === 'or') {
											return true;
										}
									} else {
										matchedAll = false;
									}
								}
							} else {
								// First check if the test match is an $exists
								if (test[i] && test[i].$exists !== undefined) {
									// Push the item through another match recurse
									recurseVal = this._match(undefined, test[i], applyOp, options);

									if (recurseVal) {
										if (opToApply === 'or') {
											return true;
										}
									} else {
										matchedAll = false;
									}
								} else {
									matchedAll = false;
								}
							}
						} else {
							// Check if the prop matches our test value
							if (source && source[i] === test[i]) {
								if (opToApply === 'or') {
									return true;
								}
							} else if (source && source[i] && source[i] instanceof Array && test[i] && typeof(test[i]) !== "object") {
								// We are looking for a value inside an array

								// The source data is an array, so check each item until a
								// match is found
								recurseVal = false;
								for (tmpIndex = 0; tmpIndex < source[i].length; tmpIndex++) {
									recurseVal = this._match(source[i][tmpIndex], test[i], applyOp, options);

									if (recurseVal) {
										// One of the array items matched the query so we can
										// include this item in the results, so break now
										break;
									}
								}

								if (recurseVal) {
									if (opToApply === 'or') {
										return true;
									}
								} else {
									matchedAll = false;
								}
							} else {
								matchedAll = false;
							}
						}
					}

					if (opToApply === 'and' && !matchedAll) {
						return false;
					}
				}
			}
		}

		return matchedAll;
	},

	/**
	 * Internal method, performs a matching process against a query operator such as $gt or $nin.
	 * @param {String} key The property name in the test that matches the operator to perform
	 * matching against.
	 * @param {*} source The source data to match the query against.
	 * @param {*} test The query to match the source against.
	 * @param {Object=} options An options object.
	 * @returns {*}
	 * @private
	 */
	_matchOp: function (key, source, test, options) {
		// Check for commands
		switch (key) {
			case '$gt':
				// Greater than
				return source > test;

			case '$gte':
				// Greater than or equal
				return source >= test;

			case '$lt':
				// Less than
				return source < test;

			case '$lte':
				// Less than or equal
				return source <= test;

			case '$exists':
				// Property exists
				return (source === undefined) !== test;

			case '$ne': // Not equals
				return source != test; // jshint ignore:line

			case '$or':
				// Match true on ANY check to pass
				for (var orIndex = 0; orIndex < test.length; orIndex++) {
					if (this._match(source, test[orIndex], 'and', options)) {
						return true;
					}
				}

				return false;

			case '$and':
				// Match true on ALL checks to pass
				for (var andIndex = 0; andIndex < test.length; andIndex++) {
					if (!this._match(source, test[andIndex], 'and', options)) {
						return false;
					}
				}

				return true;

			case '$in': // In
				// Check that the in test is an array
				if (test instanceof Array) {
					var inArr = test,
						inArrCount = inArr.length,
						inArrIndex;

					for (inArrIndex = 0; inArrIndex < inArrCount; inArrIndex++) {
						if (inArr[inArrIndex] === source) {
							return true;
						}
					}

					return false;
				} else {
					throw('ForerunnerDB.Mixin.Matching "' + this.name() + '": Cannot use an $in operator on a non-array key: ' + key);
				}
				break;

			case '$nin': // Not in
				// Check that the not-in test is an array
				if (test instanceof Array) {
					var notInArr = test,
						notInArrCount = notInArr.length,
						notInArrIndex;

					for (notInArrIndex = 0; notInArrIndex < notInArrCount; notInArrIndex++) {
						if (notInArr[notInArrIndex] === source) {
							return false;
						}
					}

					return true;
				} else {
					throw('ForerunnerDB.Mixin.Matching "' + this.name() + '": Cannot use a $nin operator on a non-array key: ' + key);
				}
				break;

			case '$distinct':
				// Ensure options holds a distinct lookup
				options.$rootData['//distinctLookup'] = options.$rootData['//distinctLookup'] || {};

				for (var distinctProp in test) {
					if (test.hasOwnProperty(distinctProp)) {
						options.$rootData['//distinctLookup'][distinctProp] = options.$rootData['//distinctLookup'][distinctProp] || {};
						// Check if the options distinct lookup has this field's value
						if (options.$rootData['//distinctLookup'][distinctProp][source[distinctProp]]) {
							// Value is already in use
							return false;
						} else {
							// Set the value in the lookup
							options.$rootData['//distinctLookup'][distinctProp][source[distinctProp]] = true;

							// Allow the item in the results
							return true;
						}
					}
				}
				break;
		}

		return -1;
	}
};

module.exports = Matching;
},{}],22:[function(_dereq_,module,exports){
"use strict";

var Sorting = {
	/**
	 * Sorts the passed value a against the passed value b ascending.
	 * @param {*} a The first value to compare.
	 * @param {*} b The second value to compare.
	 * @returns {*} 1 if a is sorted after b, -1 if a is sorted before b.
	 */
	sortAsc: function (a, b) {
		if (typeof(a) === 'string' && typeof(b) === 'string') {
			return a.localeCompare(b);
		} else {
			if (a > b) {
				return 1;
			} else if (a < b) {
				return -1;
			}
		}

		return 0;
	},

	/**
	 * Sorts the passed value a against the passed value b descending.
	 * @param {*} a The first value to compare.
	 * @param {*} b The second value to compare.
	 * @returns {*} 1 if a is sorted after b, -1 if a is sorted before b.
	 */
	sortDesc: function (a, b) {
		if (typeof(a) === 'string' && typeof(b) === 'string') {
			return b.localeCompare(a);
		} else {
			if (a > b) {
				return -1;
			} else if (a < b) {
				return 1;
			}
		}

		return 0;
	}
};

module.exports = Sorting;
},{}],23:[function(_dereq_,module,exports){
"use strict";

var Overload = _dereq_('./Overload');

var Triggers = {
	/**
	 * Add a trigger by id.
	 * @param {String} id The id of the trigger. This must be unique to the type and
	 * phase of the trigger. Only one trigger may be added with this id per type and
	 * phase.
	 * @param {Number} type The type of operation to apply the trigger to. See
	 * Mixin.Constants for constants to use.
	 * @param {Number} phase The phase of an operation to fire the trigger on. See
	 * Mixin.Constants for constants to use.
	 * @param {Function} method The method to call when the trigger is fired.
	 * @returns {boolean} True if the trigger was added successfully, false if not.
	 */
	addTrigger: function (id, type, phase, method) {
		var self = this,
			triggerIndex;

		// Check if the trigger already exists
		triggerIndex = self._triggerIndexOf(id, type, phase);

		if (triggerIndex === -1) {
			// The trigger does not exist, create it
			self._trigger = self._trigger || {};
			self._trigger[type] = self._trigger[type] || {};
			self._trigger[type][phase] = self._trigger[type][phase] || [];

			self._trigger[type][phase].push({
				id: id,
				method: method,
				enabled: true
			});

			return true;
		}

		return false;
	},

	/**
	 *
	 * @param {String} id The id of the trigger to remove.
	 * @param {Number} type The type of operation to remove the trigger from. See
	 * Mixin.Constants for constants to use.
	 * @param {Number} phase The phase of the operation to remove the trigger from.
	 * See Mixin.Constants for constants to use.
	 * @returns {boolean} True if removed successfully, false if not.
	 */
	removeTrigger: function (id, type, phase) {
		var self = this,
			triggerIndex;

		// Check if the trigger already exists
		triggerIndex = self._triggerIndexOf(id, type, phase);

		if (triggerIndex > -1) {
			// The trigger exists, remove it
			self._trigger[type][phase].splice(triggerIndex, 1);
		}

		return false;
	},

	enableTrigger: new Overload({
		'string': function (id) {
			// Alter all triggers of this type
			var self = this,
				types = self._trigger,
				phases,
				triggers,
				result = false,
				i, k, j;

			if (types) {
				for (j in types) {
					if (types.hasOwnProperty(j)) {
						phases = types[j];

						if (phases) {
							for (i in phases) {
								if (phases.hasOwnProperty(i)) {
									triggers = phases[i];

									// Loop triggers and set enabled flag
									for (k = 0; k < triggers.length; k++) {
										if (triggers[k].id === id) {
											triggers[k].enabled = true;
											result = true;
										}
									}
								}
							}
						}
					}
				}
			}

			return result;
		},

		'number': function (type) {
			// Alter all triggers of this type
			var self = this,
				phases = self._trigger[type],
				triggers,
				result = false,
				i, k;

			if (phases) {
				for (i in phases) {
					if (phases.hasOwnProperty(i)) {
						triggers = phases[i];

						// Loop triggers and set to enabled
						for (k = 0; k < triggers.length; k++) {
							triggers[k].enabled = true;
							result = true;
						}
					}
				}
			}

			return result;
		},

		'number, number': function (type, phase) {
			// Alter all triggers of this type and phase
			var self = this,
				phases = self._trigger[type],
				triggers,
				result = false,
				k;

			if (phases) {
				triggers = phases[phase];

				if (triggers) {
					// Loop triggers and set to enabled
					for (k = 0; k < triggers.length; k++) {
						triggers[k].enabled = true;
						result = true;
					}
				}
			}

			return result;
		},

		'string, number, number': function (id, type, phase) {
			// Check if the trigger already exists
			var self = this,
				triggerIndex = self._triggerIndexOf(id, type, phase);

			if (triggerIndex > -1) {
				// Update the trigger
				self._trigger[type][phase][triggerIndex].enabled = true;

				return true;
			}

			return false;
		}
	}),

	disableTrigger: new Overload({
		'string': function (id) {
			// Alter all triggers of this type
			var self = this,
				types = self._trigger,
				phases,
				triggers,
				result = false,
				i, k, j;

			if (types) {
				for (j in types) {
					if (types.hasOwnProperty(j)) {
						phases = types[j];

						if (phases) {
							for (i in phases) {
								if (phases.hasOwnProperty(i)) {
									triggers = phases[i];

									// Loop triggers and set enabled flag
									for (k = 0; k < triggers.length; k++) {
										if (triggers[k].id === id) {
											triggers[k].enabled = false;
											result = true;
										}
									}
								}
							}
						}
					}
				}
			}

			return result;
		},

		'number': function (type) {
			// Alter all triggers of this type
			var self = this,
				phases = self._trigger[type],
				triggers,
				result = false,
				i, k;

			if (phases) {
				for (i in phases) {
					if (phases.hasOwnProperty(i)) {
						triggers = phases[i];

						// Loop triggers and set to disabled
						for (k = 0; k < triggers.length; k++) {
							triggers[k].enabled = false;
							result = true;
						}
					}
				}
			}

			return result;
		},

		'number, number': function (type, phase) {
			// Alter all triggers of this type and phase
			var self = this,
				phases = self._trigger[type],
				triggers,
				result = false,
				k;

			if (phases) {
				triggers = phases[phase];

				if (triggers) {
					// Loop triggers and set to disabled
					for (k = 0; k < triggers.length; k++) {
						triggers[k].enabled = false;
						result = true;
					}
				}
			}

			return result;
		},

		'string, number, number': function (id, type, phase) {
			// Check if the trigger already exists
			var self = this,
				triggerIndex = self._triggerIndexOf(id, type, phase);

			if (triggerIndex > -1) {
				// Update the trigger
				self._trigger[type][phase][triggerIndex].enabled = false;

				return true;
			}

			return false;
		}
	}),

	/**
	 * Checks if a trigger will fire based on the type and phase provided.
	 * @param {Number} type The type of operation. See Mixin.Constants for
	 * constants to use.
	 * @param {Number} phase The phase of the operation. See Mixin.Constants
	 * for constants to use.
	 * @returns {Boolean} True if the trigger will fire, false otherwise.
	 */
	willTrigger: function (type, phase) {
		if (this._trigger && this._trigger[type] && this._trigger[type][phase] && this._trigger[type][phase].length) {
			// Check if a trigger in this array is enabled
			var arr = this._trigger[type][phase],
				i;

			for (i = 0; i < arr.length; i++) {
				if (arr[i].enabled) {
					return true;
				}
			}
		}

		return false;
	},

	/**
	 * Processes trigger actions based on the operation, type and phase.
	 * @param {Object} operation Operation data to pass to the trigger.
	 * @param {Number} type The type of operation. See Mixin.Constants for
	 * constants to use.
	 * @param {Number} phase The phase of the operation. See Mixin.Constants
	 * for constants to use.
	 * @param {Object} oldDoc The document snapshot before operations are
	 * carried out against the data.
	 * @param {Object} newDoc The document snapshot after operations are
	 * carried out against the data.
	 * @returns {boolean}
	 */
	processTrigger: function (operation, type, phase, oldDoc, newDoc) {
		var self = this,
			triggerArr,
			triggerIndex,
			triggerCount,
			triggerItem,
			response;

		if (self._trigger && self._trigger[type] && self._trigger[type][phase]) {
			triggerArr = self._trigger[type][phase];
			triggerCount = triggerArr.length;

			for (triggerIndex = 0; triggerIndex < triggerCount; triggerIndex++) {
				triggerItem = triggerArr[triggerIndex];

				// Check if the trigger is enabled
				if (triggerItem.enabled) {
					if (this.debug()) {
						var typeName,
							phaseName;

						switch (type) {
							case this.TYPE_INSERT:
								typeName = 'insert';
								break;

							case this.TYPE_UPDATE:
								typeName = 'update';
								break;

							case this.TYPE_REMOVE:
								typeName = 'remove';
								break;

							default:
								typeName = '';
								break;
						}

						switch (phase) {
							case this.PHASE_BEFORE:
								phaseName = 'before';
								break;

							case this.PHASE_AFTER:
								phaseName = 'after';
								break;

							default:
								phaseName = '';
								break;
						}

						//console.log('Triggers: Processing trigger "' + id + '" for ' + typeName + ' in phase "' + phaseName + '"');
					}

					// Run the trigger's method and store the response
					response = triggerItem.method.call(self, operation, oldDoc, newDoc);

					// Check the response for a non-expected result (anything other than
					// undefined, true or false is considered a throwable error)
					if (response === false) {
						// The trigger wants us to cancel operations
						return false;
					}

					if (response !== undefined && response !== true && response !== false) {
						// Trigger responded with error, throw the error
						throw('ForerunnerDB.Mixin.Triggers: Trigger error: ' + response);
					}
				}
			}

			// Triggers all ran without issue, return a success (true)
			return true;
		}
	},

	/**
	 * Returns the index of a trigger by id based on type and phase.
	 * @param {String} id The id of the trigger to find the index of.
	 * @param {Number} type The type of operation. See Mixin.Constants for
	 * constants to use.
	 * @param {Number} phase The phase of the operation. See Mixin.Constants
	 * for constants to use.
	 * @returns {number}
	 * @private
	 */
	_triggerIndexOf: function (id, type, phase) {
		var self = this,
			triggerArr,
			triggerCount,
			triggerIndex;

		if (self._trigger && self._trigger[type] && self._trigger[type][phase]) {
			triggerArr = self._trigger[type][phase];
			triggerCount = triggerArr.length;

			for (triggerIndex = 0; triggerIndex < triggerCount; triggerIndex++) {
				if (triggerArr[triggerIndex].id === id) {
					return triggerIndex;
				}
			}
		}

		return -1;
	}
};

module.exports = Triggers;
},{"./Overload":27}],24:[function(_dereq_,module,exports){
"use strict";

var Updating = {
	/**
	 * Updates a property on an object.
	 * @param {Object} doc The object whose property is to be updated.
	 * @param {String} prop The property to update.
	 * @param {*} val The new value of the property.
	 * @private
	 */
	_updateProperty: function (doc, prop, val) {
		doc[prop] = val;

		if (this.debug()) {
			console.log('ForerunnerDB.Mixin.Updating: Setting non-data-bound document property "' + prop + '" for "' + this.name() + '"');
		}
	},

	/**
	 * Increments a value for a property on a document by the passed number.
	 * @param {Object} doc The document to modify.
	 * @param {String} prop The property to modify.
	 * @param {Number} val The amount to increment by.
	 * @private
	 */
	_updateIncrement: function (doc, prop, val) {
		doc[prop] += val;
	},

	/**
	 * Changes the index of an item in the passed array.
	 * @param {Array} arr The array to modify.
	 * @param {Number} indexFrom The index to move the item from.
	 * @param {Number} indexTo The index to move the item to.
	 * @private
	 */
	_updateSpliceMove: function (arr, indexFrom, indexTo) {
		arr.splice(indexTo, 0, arr.splice(indexFrom, 1)[0]);

		if (this.debug()) {
			console.log('ForerunnerDB.Mixin.Updating: Moving non-data-bound document array index from "' + indexFrom + '" to "' + indexTo + '" for "' + this.name() + '"');
		}
	},

	/**
	 * Inserts an item into the passed array at the specified index.
	 * @param {Array} arr The array to insert into.
	 * @param {Number} index The index to insert at.
	 * @param {Object} doc The document to insert.
	 * @private
	 */
	_updateSplicePush: function (arr, index, doc) {
		if (arr.length > index) {
			arr.splice(index, 0, doc);
		} else {
			arr.push(doc);
		}
	},

	/**
	 * Inserts an item at the end of an array.
	 * @param {Array} arr The array to insert the item into.
	 * @param {Object} doc The document to insert.
	 * @private
	 */
	_updatePush: function (arr, doc) {
		arr.push(doc);
	},

	/**
	 * Removes an item from the passed array.
	 * @param {Array} arr The array to modify.
	 * @param {Number} index The index of the item in the array to remove.
	 * @private
	 */
	_updatePull: function (arr, index) {
		arr.splice(index, 1);
	},

	/**
	 * Multiplies a value for a property on a document by the passed number.
	 * @param {Object} doc The document to modify.
	 * @param {String} prop The property to modify.
	 * @param {Number} val The amount to multiply by.
	 * @private
	 */
	_updateMultiply: function (doc, prop, val) {
		doc[prop] *= val;
	},

	/**
	 * Renames a property on a document to the passed property.
	 * @param {Object} doc The document to modify.
	 * @param {String} prop The property to rename.
	 * @param {Number} val The new property name.
	 * @private
	 */
	_updateRename: function (doc, prop, val) {
		doc[val] = doc[prop];
		delete doc[prop];
	},

	/**
	 * Sets a property on a document to the passed value.
	 * @param {Object} doc The document to modify.
	 * @param {String} prop The property to delete.
	 * @param {*} val The new property value.
	 * @private
	 */
	_updateOverwrite: function (doc, prop, val) {
		doc[prop] = val;
	},

	/**
	 * Deletes a property on a document.
	 * @param {Object} doc The document to modify.
	 * @param {String} prop The property to delete.
	 * @private
	 */
	_updateUnset: function (doc, prop) {
		delete doc[prop];
	},

	/**
	 * Removes all properties from an object without destroying
	 * the object instance, thereby maintaining data-bound linking.
	 * @param {Object} doc The parent object to modify.
	 * @param {String} prop The name of the child object to clear.
	 * @private
	 */
	_updateClear: function (doc, prop) {
		var obj = doc[prop],
			i;

		if (obj && typeof obj === 'object') {
			for (i in obj) {
				if (obj.hasOwnProperty(i)) {
					this._updateUnset(obj, i);
				}
			}
		}
	},

	/**
	 * Pops an item from the array stack.
	 * @param {Object} doc The document to modify.
	 * @param {Number=} val Optional, if set to 1 will pop, if set to -1 will shift.
	 * @return {Boolean}
	 * @private
	 */
	_updatePop: function (doc, val) {
		var updated = false;

		if (doc.length > 0) {
			if (val === 1) {
				doc.pop();
				updated = true;
			} else if (val === -1) {
				doc.shift();
				updated = true;
			}
		}

		return updated;
	}
};

module.exports = Updating;
},{}],25:[function(_dereq_,module,exports){
"use strict";

// Import external names locally
var Shared,
	Collection;

Shared = _dereq_('./Shared');

var Odm = function () {
	this.init.apply(this, arguments);
};

Odm.prototype.init = function (from) {
	var self = this;

	self._collectionDroppedWrap = function () {
		self._collectionDropped.apply(self, arguments);
	};

	self.from(from);
};

Shared.addModule('Odm', Odm);
Shared.mixin(Odm.prototype, 'Mixin.Common');
Shared.mixin(Odm.prototype, 'Mixin.ChainReactor');
Shared.mixin(Odm.prototype, 'Mixin.Constants');
Shared.mixin(Odm.prototype, 'Mixin.Events');

Collection = _dereq_('./Collection');

Shared.synthesize(Odm.prototype, 'state');
Shared.synthesize(Odm.prototype, 'parent');
Shared.synthesize(Odm.prototype, 'query');
Shared.synthesize(Odm.prototype, 'from', function (val) {
	if (val !== undefined) {
		val.chain(this);
		val.on('drop', this._collectionDroppedWrap);
	}

	return this.$super(val);
});

Odm.prototype._collectionDropped = function (collection) {
	this.drop();
};

Odm.prototype._chainHandler = function (chainPacket) {
	switch (chainPacket.type) {
		case 'setData':
		case 'insert':
		case 'update':
		case 'remove':
			//this._refresh();
			break;

		default:
			break;
	}
};

Odm.prototype.drop = function () {
	if (this.state() !== 'dropped') {
		this.state('dropped');

		this.emit('drop', this);

		if (this._from) {
			delete this._from._odm;
		}

		delete this._name;
	}

	return true;
};

/**
 * Queries the current object and returns a result that can
 * also be queried in the same way.
 * @param {String} prop The property to delve into.
 * @param {Object=} query Optional query that limits the returned documents.
 * @returns {Odm}
 */
Odm.prototype.$ = function (prop, query) {
	var data,
		tmpQuery,
		tmpColl,
		tmpOdm;

	if (prop === this._from.primaryKey()) {
		// Query is against a specific PK id
		tmpQuery = {};
		tmpQuery[prop] = query;

		data = this._from.find(tmpQuery, {$decouple: false});
		tmpColl = new Collection();

		tmpColl.setData(data, {$decouple: false});
		tmpColl._linked = this._from._linked;
	} else {
		// Query is against an array of sub-documents
		tmpColl = new Collection();
		data = this._from.find({}, {$decouple: false});

		if (data[0] && data[0][prop]) {
			// Set the temp collection data to the array property
			tmpColl.setData(data[0][prop], {$decouple: false});

			// Check if we need to filter this array further
			if (query) {
				data = tmpColl.find(query, {$decouple: false});
				tmpColl.setData(data, {$decouple: false});
			}
		}

		tmpColl._linked = this._from._linked;
	}

	tmpOdm = new Odm(tmpColl);

	tmpOdm.parent(this);
	tmpOdm.query(query);

	return tmpOdm;
};

/**
 * Gets / sets a property on the current ODM document.
 * @param {String} prop The name of the property.
 * @param {*} val Optional value to set.
 * @returns {*}
 */
Odm.prototype.prop = function (prop, val) {
	var tmpQuery;

	if (prop !== undefined) {
		if (val !== undefined) {
			tmpQuery = {};
			tmpQuery[prop] = val;

			return this._from.update({}, tmpQuery);
		}

		if (this._from._data[0]) {
			return this._from._data[0][prop];
		}
	}

	return undefined;
};

/**
 * Get the ODM instance for this collection.
 * @returns {Odm}
 */
Collection.prototype.odm = function () {
	if (!this._odm) {
		this._odm = new Odm(this);
	}

	return this._odm;
};

Shared.finishModule('Odm');
module.exports = Odm;
},{"./Collection":4,"./Shared":33}],26:[function(_dereq_,module,exports){
"use strict";

var Shared = _dereq_('./Shared'),
	Path = _dereq_('./Path');

/**
 * The operation class, used to store details about an operation being
 * performed by the database.
 * @param {String} name The name of the operation.
 * @constructor
 */
var Operation = function (name) {
	this.pathSolver = new Path();
	this.counter = 0;
	this.init.apply(this, arguments);
};

Operation.prototype.init = function (name) {
	this._data = {
		operation: name, // The name of the operation executed such as "find", "update" etc
		index: {
			potential: [], // Indexes that could have potentially been used
			used: false // The index that was picked to use
		},
		steps: [], // The steps taken to generate the query results,
		time: {
			startMs: 0,
			stopMs: 0,
			totalMs: 0,
			process: {}
		},
		flag: {}, // An object with flags that denote certain execution paths
		log: [] // Any extra data that might be useful such as warnings or helpful hints
	};
};

Shared.addModule('Operation', Operation);
Shared.mixin(Operation.prototype, 'Mixin.ChainReactor');

/**
 * Starts the operation timer.
 */
Operation.prototype.start = function () {
	this._data.time.startMs = new Date().getTime();
};

/**
 * Adds an item to the operation log.
 * @param {String} event The item to log.
 * @returns {*}
 */
Operation.prototype.log = function (event) {
	if (event) {
		var lastLogTime = this._log.length > 0 ? this._data.log[this._data.log.length - 1].time : 0,
			logObj = {
				event: event,
				time: new Date().getTime(),
				delta: 0
			};

		this._data.log.push(logObj);

		if (lastLogTime) {
			logObj.delta = logObj.time - lastLogTime;
		}

		return this;
	}

	return this._data.log;
};

/**
 * Called when starting and ending a timed operation, used to time
 * internal calls within an operation's execution.
 * @param {String} section An operation name.
 * @returns {*}
 */
Operation.prototype.time = function (section) {
	if (section !== undefined) {
		var process = this._data.time.process,
			processObj = process[section] = process[section] || {};

		if (!processObj.startMs) {
			// Timer started
			processObj.startMs = new Date().getTime();
			processObj.stepObj = {
				name: section
			};

			this._data.steps.push(processObj.stepObj);
		} else {
			processObj.stopMs = new Date().getTime();
			processObj.totalMs = processObj.stopMs - processObj.startMs;
			processObj.stepObj.totalMs = processObj.totalMs;
			delete processObj.stepObj;
		}

		return this;
	}

	return this._data.time;
};

/**
 * Used to set key/value flags during operation execution.
 * @param {String} key
 * @param {String} val
 * @returns {*}
 */
Operation.prototype.flag = function (key, val) {
	if (key !== undefined && val !== undefined) {
		this._data.flag[key] = val;
	} else if (key !== undefined) {
		return this._data.flag[key];
	} else {
		return this._data.flag;
	}
};

Operation.prototype.data = function (path, val, noTime) {
	if (val !== undefined) {
		// Assign value to object path
		this.pathSolver.set(this._data, path, val);

		return this;
	}

	return this.pathSolver.get(this._data, path);
};

Operation.prototype.pushData = function (path, val, noTime) {
	// Assign value to object path
	this.pathSolver.push(this._data, path, val);
};

/**
 * Stops the operation timer.
 */
Operation.prototype.stop = function () {
	this._data.time.stopMs = new Date().getTime();
	this._data.time.totalMs = this._data.time.stopMs - this._data.time.startMs;
};

Shared.finishModule('Operation');
module.exports = Operation;
},{"./Path":29,"./Shared":33}],27:[function(_dereq_,module,exports){
"use strict";

/**
 * Allows a method to accept overloaded calls with different parameters controlling
 * which passed overload function is called.
 * @param {Object} def
 * @returns {Function}
 * @constructor
 */
var Overload = function (def) {
	if (def) {
		var self = this,
			index,
			count,
			tmpDef,
			defNewKey,
			sigIndex,
			signatures;

		if (!(def instanceof Array)) {
			tmpDef = {};

			// Def is an object, make sure all prop names are devoid of spaces
			for (index in def) {
				if (def.hasOwnProperty(index)) {
					defNewKey = index.replace(/ /g, '');

					// Check if the definition array has a * string in it
					if (defNewKey.indexOf('*') === -1) {
						// No * found
						tmpDef[defNewKey] = def[index];
					} else {
						// A * was found, generate the different signatures that this
						// definition could represent
						signatures = this.generateSignaturePermutations(defNewKey);

						for (sigIndex = 0; sigIndex < signatures.length; sigIndex++) {
							if (!tmpDef[signatures[sigIndex]]) {
								tmpDef[signatures[sigIndex]] = def[index];
							}
						}
					}
				}
			}

			def = tmpDef;
		}

		return function () {
			var arr = [],
				lookup,
				type;

			// Check if we are being passed a key/function object or an array of functions
			if (def instanceof Array) {
				// We were passed an array of functions
				count = def.length;
				for (index = 0; index < count; index++) {
					if (def[index].length === arguments.length) {
						return self.callExtend(this, '$main', def, def[index], arguments);
					}
				}
			} else {
				// Generate lookup key from arguments
				// Copy arguments to an array
				for (index = 0; index < arguments.length; index++) {
					type = typeof arguments[index];

					// Handle detecting arrays
					if (type === 'object' && arguments[index] instanceof Array) {
						type = 'array';
					}

					// Handle been presented with a single undefined argument
					if (arguments.length === 1 && type === 'undefined') {
						break;
					}

					// Add the type to the argument types array
					arr.push(type);
				}

				lookup = arr.join(',');

				// Check for an exact lookup match
				if (def[lookup]) {
					return self.callExtend(this, '$main', def, def[lookup], arguments);
				} else {
					for (index = arr.length; index >= 0; index--) {
						// Get the closest match
						lookup = arr.slice(0, index).join(',');

						if (def[lookup + ',...']) {
							// Matched against arguments + "any other"
							return self.callExtend(this, '$main', def, def[lookup + ',...'], arguments);
						}
					}
				}
			}

			throw('ForerunnerDB.Overload "' + this.name() + '": Overloaded method does not have a matching signature for the passed arguments: ' + JSON.stringify(arr));
		};
	}

	return function () {};
};

/**
 * Generates an array of all the different definition signatures that can be
 * created from the passed string with a catch-all wildcard *. E.g. it will
 * convert the signature: string,*,string to all potentials:
 * string,string,string
 * string,number,string
 * string,object,string,
 * string,function,string,
 * string,undefined,string
 *
 * @param {String} str Signature string with a wildcard in it.
 * @returns {Array} An array of signature strings that are generated.
 */
Overload.prototype.generateSignaturePermutations = function (str) {
	var signatures = [],
		newSignature,
		types = ['string', 'object', 'number', 'function', 'undefined'],
		index;

	if (str.indexOf('*') > -1) {
		// There is at least one "any" type, break out into multiple keys
		// We could do this at query time with regular expressions but
		// would be significantly slower
		for (index = 0; index < types.length; index++) {
			newSignature = str.replace('*', types[index]);
			signatures = signatures.concat(this.generateSignaturePermutations(newSignature));
		}
	} else {
		signatures.push(str);
	}

	return signatures;
};

Overload.prototype.callExtend = function (context, prop, propContext, func, args) {
	var tmp,
		ret;

	if (context && propContext[prop]) {
		tmp = context[prop];

		context[prop] = propContext[prop];
		ret = func.apply(context, args);
		context[prop] = tmp;

		return ret;
	} else {
		return func.apply(context, args);
	}
};

module.exports = Overload;
},{}],28:[function(_dereq_,module,exports){
"use strict";

// Import external names locally
var Shared,
	Db,
	Collection,
	DbDocument;

Shared = _dereq_('./Shared');

var Overview = function () {
	this.init.apply(this, arguments);
};

Overview.prototype.init = function (name) {
	var self = this;

	this._name = name;
	this._data = new DbDocument('__FDB__dc_data_' + this._name);
	this._collData = new Collection();
	this._collections = [];

	this._collectionDroppedWrap = function () {
		self._collectionDropped.apply(self, arguments);
	};
};

Shared.addModule('Overview', Overview);
Shared.mixin(Overview.prototype, 'Mixin.Common');
Shared.mixin(Overview.prototype, 'Mixin.ChainReactor');
Shared.mixin(Overview.prototype, 'Mixin.Constants');
Shared.mixin(Overview.prototype, 'Mixin.Triggers');
Shared.mixin(Overview.prototype, 'Mixin.Events');

Collection = _dereq_('./Collection');
DbDocument = _dereq_('./Document');
Db = Shared.modules.Db;

/**
 * Gets / sets the current state.
 * @param {String=} val The name of the state to set.
 * @returns {*}
 */
Shared.synthesize(Overview.prototype, 'state');

Shared.synthesize(Overview.prototype, 'db');
Shared.synthesize(Overview.prototype, 'name');
Shared.synthesize(Overview.prototype, 'query', function (val) {
	var ret = this.$super(val);

	if (val !== undefined) {
		this._refresh();
	}

	return ret;
});
Shared.synthesize(Overview.prototype, 'queryOptions', function (val) {
	var ret = this.$super(val);

	if (val !== undefined) {
		this._refresh();
	}

	return ret;
});
Shared.synthesize(Overview.prototype, 'reduce', function (val) {
	var ret = this.$super(val);

	if (val !== undefined) {
		this._refresh();
	}

	return ret;
});

Overview.prototype.from = function (collection) {
	if (collection !== undefined) {
		if (typeof(collection) === 'string') {
			collection = this._db.collection(collection);
		}

		this._setFrom(collection);
		return this;
	}

	return this._collections;
};

Overview.prototype.find = function () {
	return this._collData.find.apply(this._collData, arguments);
};

/**
 * Executes and returns the response from the current reduce method
 * assigned to the overview.
 * @returns {*}
 */
Overview.prototype.exec = function () {
	var reduceFunc = this.reduce();

	return reduceFunc ? reduceFunc.apply(this) : undefined;
};

Overview.prototype.count = function () {
	return this._collData.count.apply(this._collData, arguments);
};

Overview.prototype._setFrom = function (collection) {
	// Remove all collection references
	while (this._collections.length) {
		this._removeCollection(this._collections[0]);
	}

	this._addCollection(collection);

	return this;
};

Overview.prototype._addCollection = function (collection) {
	if (this._collections.indexOf(collection) === -1) {
		this._collections.push(collection);
		collection.chain(this);

		collection.on('drop', this._collectionDroppedWrap);

		this._refresh();
	}
	return this;
};

Overview.prototype._removeCollection = function (collection) {
	var collectionIndex = this._collections.indexOf(collection);

	if (collectionIndex > -1) {
		this._collections.splice(collection, 1);
		collection.unChain(this);

		collection.off('drop', this._collectionDroppedWrap);

		this._refresh();
	}

	return this;
};

Overview.prototype._collectionDropped = function (collection) {
	if (collection) {
		// Collection was dropped, remove from overview
		this._removeCollection(collection);
	}
};

Overview.prototype._refresh = function () {
	if (this._state !== 'dropped') {
		if (this._collections && this._collections[0]) {
			this._collData.primaryKey(this._collections[0].primaryKey());
			var tempArr = [],
				i;

			for (i = 0; i < this._collections.length; i++) {
				tempArr = tempArr.concat(this._collections[i].find(this._query, this._queryOptions));
			}

			this._collData.setData(tempArr);
		}

		// Now execute the reduce method
		if (this._reduce) {
			var reducedData = this._reduce.apply(this);

			// Update the document with the newly returned data
			this._data.setData(reducedData);
		}
	}
};

Overview.prototype._chainHandler = function (chainPacket) {
	switch (chainPacket.type) {
		case 'setData':
		case 'insert':
		case 'update':
		case 'remove':
			this._refresh();
			break;

		default:
			break;
	}
};

/**
 * Gets the module's internal data collection.
 * @returns {Collection}
 */
Overview.prototype.data = function () {
	return this._data;
};

Overview.prototype.drop = function () {
	if (this._state !== 'dropped') {
		this._state = 'dropped';

		delete this._data;
		delete this._collData;

		// Remove all collection references
		while (this._collections.length) {
			this._removeCollection(this._collections[0]);
		}

		delete this._collections;

		if (this._db && this._name) {
			delete this._db._overview[this._name];
		}

		delete this._name;

		this.emit('drop', this);
	}

	return true;
};

Db.prototype.overview = function (overviewName) {
	if (overviewName) {
		this._overview = this._overview || {};
		this._overview[overviewName] = this._overview[overviewName] || new Overview(overviewName).db(this);
		return this._overview[overviewName];
	} else {
		// Return an object of collection data
		return this._overview || {};
	}
};

/**
 * Returns an array of overviews the DB currently has.
 * @returns {Array} An array of objects containing details of each overview
 * the database is currently managing.
 */
Db.prototype.overviews = function () {
	var arr = [],
		i;

	for (i in this._overview) {
		if (this._overview.hasOwnProperty(i)) {
			arr.push({
				name: i,
				count: this._overview[i].count()
			});
		}
	}

	return arr;
};

Shared.finishModule('Overview');
module.exports = Overview;
},{"./Collection":4,"./Document":9,"./Shared":33}],29:[function(_dereq_,module,exports){
"use strict";

var Shared = _dereq_('./Shared');

/**
 * Path object used to resolve object paths and retrieve data from
 * objects by using paths.
 * @param {String=} path The path to assign.
 * @constructor
 */
var Path = function (path) {
	this.init.apply(this, arguments);
};

Path.prototype.init = function (path) {
	if (path) {
		this.path(path);
	}
};

Shared.addModule('Path', Path);
Shared.mixin(Path.prototype, 'Mixin.ChainReactor');

/**
 * Gets / sets the given path for the Path instance.
 * @param {String=} path The path to assign.
 */
Path.prototype.path = function (path) {
	if (path !== undefined) {
		this._path = this.clean(path);
		this._pathParts = this._path.split('.');
		return this;
	}

	return this._path;
};

/**
 * Tests if the passed object has the paths that are specified and that
 * a value exists in those paths.
 * @param {Object} testKeys The object describing the paths to test for.
 * @param {Object} testObj The object to test paths against.
 * @returns {Boolean} True if the object paths exist.
 */
Path.prototype.hasObjectPaths = function (testKeys, testObj) {
	var result = true,
		i;

	for (i in testKeys) {
		if (testKeys.hasOwnProperty(i)) {
			if (testObj[i] === undefined) {
				return false;
			}

			if (typeof testKeys[i] === 'object') {
				// Recurse object
				result = this.hasObjectPaths(testKeys[i], testObj[i]);

				// Should we exit early?
				if (!result) {
					return false;
				}
			}
		}
	}

	return result;
};

/**
 * Counts the total number of key endpoints in the passed object.
 * @param {Object} testObj The object to count key endpoints for.
 * @returns {Number} The number of endpoints.
 */
Path.prototype.countKeys = function (testObj) {
	var totalKeys = 0,
		i;

	for (i in testObj) {
		if (testObj.hasOwnProperty(i)) {
			if (testObj[i] !== undefined) {
				if (typeof testObj[i] !== 'object') {
					totalKeys++;
				} else {
					totalKeys += this.countKeys(testObj[i]);
				}
			}
		}
	}

	return totalKeys;
};

/**
 * Tests if the passed object has the paths that are specified and that
 * a value exists in those paths and if so returns the number matched.
 * @param {Object} testKeys The object describing the paths to test for.
 * @param {Object} testObj The object to test paths against.
 * @returns {Object} Stats on the matched keys
 */
Path.prototype.countObjectPaths = function (testKeys, testObj) {
	var matchData,
		matchedKeys = {},
		matchedKeyCount = 0,
		totalKeyCount = 0,
		i;

	for (i in testObj) {
		if (testObj.hasOwnProperty(i)) {
			if (typeof testObj[i] === 'object') {
				// The test / query object key is an object, recurse
				matchData = this.countObjectPaths(testKeys[i], testObj[i]);

				matchedKeys[i] = matchData.matchedKeys;
				totalKeyCount += matchData.totalKeyCount;
				matchedKeyCount += matchData.matchedKeyCount;
			} else {
				// The test / query object has a property that is not an object so add it as a key
				totalKeyCount++;

				// Check if the test keys also have this key and it is also not an object
				if (testKeys && testKeys[i] && typeof testKeys[i] !== 'object') {
					matchedKeys[i] = true;
					matchedKeyCount++;
				} else {
					matchedKeys[i] = false;
				}
			}
		}
	}

	return {
		matchedKeys: matchedKeys,
		matchedKeyCount: matchedKeyCount,
		totalKeyCount: totalKeyCount
	};
};

/**
 * Takes a non-recursive object and converts the object hierarchy into
 * a path string.
 * @param {Object} obj The object to parse.
 * @param {Boolean=} withValue If true will include a 'value' key in the returned
 * object that represents the value the object path points to.
 * @returns {Object}
 */
Path.prototype.parse = function (obj, withValue) {
	var paths = [],
		path = '',
		resultData,
		i, k;

	for (i in obj) {
		if (obj.hasOwnProperty(i)) {
			// Set the path to the key
			path = i;

			if (typeof(obj[i]) === 'object') {
				if (withValue) {
					resultData = this.parse(obj[i], withValue);

					for (k = 0; k < resultData.length; k++) {
						paths.push({
							path: path + '.' + resultData[k].path,
							value: resultData[k].value
						});
					}
				} else {
					resultData = this.parse(obj[i]);

					for (k = 0; k < resultData.length; k++) {
						paths.push({
							path: path + '.' + resultData[k].path
						});
					}
				}
			} else {
				if (withValue) {
					paths.push({
						path: path,
						value: obj[i]
					});
				} else {
					paths.push({
						path: path
					});
				}
			}
		}
	}

	return paths;
};

/**
 * Takes a non-recursive object and converts the object hierarchy into
 * an array of path strings that allow you to target all possible paths
 * in an object.
 *
 * @returns {Array}
 */
Path.prototype.parseArr = function (obj, options) {
	options = options || {};
	return this._parseArr(obj, '', [], options);
};

Path.prototype._parseArr = function (obj, path, paths, options) {
	var i,
		newPath = '';

	path = path || '';
	paths = paths || [];

	for (i in obj) {
		if (obj.hasOwnProperty(i)) {
			if (!options.ignore || (options.ignore && !options.ignore.test(i))) {
				if (path) {
					newPath = path + '.' + i;
				} else {
					newPath = i;
				}

				if (typeof(obj[i]) === 'object') {
					this._parseArr(obj[i], newPath, paths, options);
				} else {
					paths.push(newPath);
				}
			}
		}
	}

	return paths;
};

/**
 * Gets the value(s) that the object contains for the currently assigned path string.
 * @param {Object} obj The object to evaluate the path against.
 * @param {String=} path A path to use instead of the existing one passed in path().
 * @returns {Array} An array of values for the given path.
 */
Path.prototype.value = function (obj, path) {
	if (obj !== undefined && typeof obj === 'object') {
		var pathParts,
			arr,
			arrCount,
			objPart,
			objPartParent,
			valuesArr = [],
			i, k;

		if (path !== undefined) {
			path = this.clean(path);
			pathParts = path.split('.');
		}

		arr = pathParts || this._pathParts;
		arrCount = arr.length;
		objPart = obj;

		for (i = 0; i < arrCount; i++) {
			objPart = objPart[arr[i]];

			if (objPartParent instanceof Array) {
				// Search inside the array for the next key
				for (k = 0; k < objPartParent.length; k++) {
					valuesArr = valuesArr.concat(this.value(objPartParent, k + '.' + arr[i]));
				}

				return valuesArr;
			} else {
				if (!objPart || typeof(objPart) !== 'object') {
					break;
				}
			}

			objPartParent = objPart;
		}

		return [objPart];
	} else {
		return [];
	}
};

/**
 * Sets a value on an object for the specified path.
 * @param {Object} obj The object to update.
 * @param {String} path The path to update.
 * @param {*} val The value to set the object path to.
 * @returns {*}
 */
Path.prototype.set = function (obj, path, val) {
	if (obj !== undefined && path !== undefined) {
		var pathParts,
			part;

		path = this.clean(path);
		pathParts = path.split('.');

		part = pathParts.shift();

		if (pathParts.length) {
			// Generate the path part in the object if it does not already exist
			obj[part] = obj[part] || {};

			// Recurse
			this.set(obj[part], pathParts.join('.'), val);
		} else {
			// Set the value
			obj[part] = val;
		}
	}

	return obj;
};

Path.prototype.get = function (obj, path) {
	return this.value(obj, path)[0];
};

/**
 * Push a value to an array on an object for the specified path.
 * @param {Object} obj The object to update.
 * @param {String} path The path to the array to push to.
 * @param {*} val The value to push to the array at the object path.
 * @returns {*}
 */
Path.prototype.push = function (obj, path, val) {
	if (obj !== undefined && path !== undefined) {
		var pathParts,
			part;

		path = this.clean(path);
		pathParts = path.split('.');

		part = pathParts.shift();

		if (pathParts.length) {
			// Generate the path part in the object if it does not already exist
			obj[part] = obj[part] || {};

			// Recurse
			this.set(obj[part], pathParts.join('.'), val);
		} else {
			// Set the value
			obj[part] = obj[part] || [];

			if (obj[part] instanceof Array) {
				obj[part].push(val);
			} else {
				throw('ForerunnerDB.Path: Cannot push to a path whose endpoint is not an array!');
			}
		}
	}

	return obj;
};

/**
 * Gets the value(s) that the object contains for the currently assigned path string
 * with their associated keys.
 * @param {Object} obj The object to evaluate the path against.
 * @param {String=} path A path to use instead of the existing one passed in path().
 * @returns {Array} An array of values for the given path with the associated key.
 */
Path.prototype.keyValue = function (obj, path) {
	var pathParts,
		arr,
		arrCount,
		objPart,
		objPartParent,
		objPartHash,
		i;

	if (path !== undefined) {
		path = this.clean(path);
		pathParts = path.split('.');
	}

	arr = pathParts || this._pathParts;
	arrCount = arr.length;
	objPart = obj;

	for (i = 0; i < arrCount; i++) {
		objPart = objPart[arr[i]];

		if (!objPart || typeof(objPart) !== 'object') {
			objPartHash = arr[i] + ':' + objPart;
			break;
		}

		objPartParent = objPart;
	}

	return objPartHash;
};

/**
 * Removes leading period (.) from string and returns it.
 * @param {String} str The string to clean.
 * @returns {*}
 */
Path.prototype.clean = function (str) {
	if (str.substr(0, 1) === '.') {
		str = str.substr(1, str.length -1);
	}

	return str;
};

Shared.finishModule('Path');
module.exports = Path;
},{"./Shared":33}],30:[function(_dereq_,module,exports){
"use strict";

// TODO: Add doc comments to this class
// Import external names locally
var Shared = _dereq_('./Shared'),
	localforage = _dereq_('localforage'),
	Db,
	Collection,
	CollectionDrop,
	CollectionGroup,
	CollectionInit,
	DbInit,
	DbDrop,
	Persist,
	Overload;

Persist = function () {
	this.init.apply(this, arguments);
};

Persist.prototype.init = function (db) {
	// Check environment
	if (db.isClient()) {
		if (window.Storage !== undefined) {
			this.mode('localforage');

			localforage.config({
				driver: [
					localforage.INDEXEDDB,
					localforage.WEBSQL,
					localforage.LOCALSTORAGE
				],
				name: String(db.core().name()),
				storeName: 'FDB'
			});
		}
	}
};

Shared.addModule('Persist', Persist);
Shared.mixin(Persist.prototype, 'Mixin.ChainReactor');

Db = Shared.modules.Db;
Collection = _dereq_('./Collection');
CollectionDrop = Collection.prototype.drop;
CollectionGroup = _dereq_('./CollectionGroup');
CollectionInit = Collection.prototype.init;
DbInit = Db.prototype.init;
DbDrop = Db.prototype.drop;
Overload = Shared.overload;

Persist.prototype.mode = function (type) {
	if (type !== undefined) {
		this._mode = type;
		return this;
	}

	return this._mode;
};

Persist.prototype.driver = function (val) {
	if (val !== undefined) {
		switch (val.toUpperCase()) {
			case 'LOCALSTORAGE':
				localforage.setDriver(localforage.LOCALSTORAGE);
				break;

			case 'WEBSQL':
				localforage.setDriver(localforage.WEBSQL);
				break;

			case 'INDEXEDDB':
				localforage.setDriver(localforage.INDEXEDDB);
				break;

			default:
				throw('ForerunnerDB.Persist: The persistence driver you have specified is not found. Please use either IndexedDB, WebSQL or LocalStorage!');
		}

		return this;
	}

	return localforage.driver();
};

Persist.prototype.save = function (key, data, callback) {
	var encode;

	encode = function (val, finished) {
		if (typeof val === 'object') {
			val = 'json::fdb::' + JSON.stringify(val);
		} else {
			val = 'raw::fdb::' + val;
		}

		if (finished) {
			finished(false, val);
		}
	};

	switch (this.mode()) {
		case 'localforage':
			encode(data, function (err, data) {
				localforage.setItem(key, data).then(function (data) {
					if (callback) { callback(false, data); }
				}, function (err) {
					if (callback) { callback(err); }
				});
			});
			break;

		default:
			if (callback) { callback('No data handler.'); }
			break;
	}
};

Persist.prototype.load = function (key, callback) {
	var parts,
		data,
		decode;

	decode = function (val, finished) {
		if (val) {
			parts = val.split('::fdb::');

			switch (parts[0]) {
				case 'json':
					data = JSON.parse(parts[1]);
					break;

				case 'raw':
					data = parts[1];
					break;

				default:
					break;
			}

			if (finished) {
				finished(false, data, {
					foundData: true,
					rowCount: data.length
				});
			}
		} else {
			if (finished) {
				finished(false, val, {
					foundData: false,
					rowCount: 0
				});
			}
		}
	};

	switch (this.mode()) {
		case 'localforage':
			localforage.getItem(key).then(function (val) {
				decode(val, callback);
			}, function (err) {
				if (callback) { callback(err); }
			});
			break;

		default:
			if (callback) { callback('No data handler or unrecognised data type.');	}
			break;
	}
};

Persist.prototype.drop = function (key, callback) {
	switch (this.mode()) {
		case 'localforage':
			localforage.removeItem(key).then(function () {
				if (callback) { callback(false); }
			}, function (err) {
				if (callback) { callback(err); }
			});
			break;

		default:
			if (callback) {
				callback('No data handler or unrecognised data type.');
			}
			break;
	}

};

// Extend the Collection prototype with persist methods
Collection.prototype.drop = new Overload({
	/**
	 * Drop collection and persistent storage.
	 */
	'': function () {
		if (this._state !== 'dropped') {
			this.drop(true);
		}
	},

	/**
	 * Drop collection and persistent storage with callback.
	 * @param {Function} callback Callback method.
	 */
	'function': function (callback) {
		if (this._state !== 'dropped') {
			this.drop(true, callback);
		}
	},

	/**
	 * Drop collection and optionally drop persistent storage.
	 * @param {Boolean} removePersistent True to drop persistent storage, false to keep it.
	 */
	'boolean': function (removePersistent) {
		if (this._state !== 'dropped') {
			// Remove persistent storage
			if (removePersistent) {
				if (this._name) {
					if (this._db) {
						// Save the collection data
						this._db.persist.drop(this._db._name + '::' + this._name);
					} else {
						throw('ForerunnerDB.Persist: Cannot drop a collection\'s persistent storage when the collection is not attached to a database!');
					}
				} else {
					throw('ForerunnerDB.Persist: Cannot drop a collection\'s persistent storage when no name assigned to collection!');
				}
			}

			// Call the original method
			CollectionDrop.apply(this);
		}
	},

	/**
	 * Drop collections and optionally drop persistent storage with callback.
	 * @param {Boolean} removePersistent True to drop persistent storage, false to keep it.
	 * @param {Function} callback Callback method.
	 */
	'boolean, function': function (removePersistent, callback) {
		if (this._state !== 'dropped') {
			// Remove persistent storage
			if (removePersistent) {
				if (this._name) {
					if (this._db) {
						// Save the collection data
						this._db.persist.drop(this._db._name + '::' + this._name, callback);
					} else {
						if (callback) {
							callback('Cannot drop a collection\'s persistent storage when the collection is not attached to a database!');
						}
					}
				} else {
					if (callback) {
						callback('Cannot drop a collection\'s persistent storage when no name assigned to collection!');
					}
				}
			}

			// Call the original method
			CollectionDrop.apply(this, callback);
		}
	}
});

Collection.prototype.save = function (callback) {
	if (this._name) {
		if (this._db) {
			// Save the collection data
			this._db.persist.save(this._db._name + '::' + this._name, this._data, callback);
		} else {
			if (callback) {
				callback('Cannot save a collection that is not attached to a database!');
			}
		}
	} else {
		if (callback) {
			callback('Cannot save a collection with no assigned name!');
		}
	}
};

Collection.prototype.load = function (callback) {
	var self = this;

	if (this._name) {
		if (this._db) {
			// Load the collection data
			this._db.persist.load(this._db._name + '::' + this._name, function (err, data) {
				if (!err) {
					if (data) {
						self.setData(data);
					}

					if (callback) {
						callback(false);
					}
				} else {
					if (callback) {
						callback(err);
					}
				}
			});
		} else {
			if (callback) {
				callback('Cannot load a collection that is not attached to a database!');
			}
		}
	} else {
		if (callback) {
			callback('Cannot load a collection with no assigned name!');
		}
	}
};

// Override the DB init to instantiate the plugin
Db.prototype.init = function () {
	DbInit.apply(this, arguments);
	this.persist = new Persist(this);
};

Db.prototype.load = function (callback) {
	// Loop the collections in the database
	var obj = this._collection,
		keys = obj.keys(),
		keyCount = keys.length,
		loadCallback,
		index;

	loadCallback = function (err) {
		if (!err) {
			keyCount--;

			if (keyCount === 0) {
				if (callback) { callback(false); }
			}
		} else {
			if (callback) { callback(err); }
		}
	};

	for (index in obj) {
		if (obj.hasOwnProperty(index)) {
			// Call the collection load method
			obj[index].load(loadCallback);
		}
	}
};

Db.prototype.save = function (callback) {
	// Loop the collections in the database
	var obj = this._collection,
		keys = obj.keys(),
		keyCount = keys.length,
		saveCallback,
		index;

	saveCallback = function (err) {
		if (!err) {
			keyCount--;

			if (keyCount === 0) {
				if (callback) { callback(false); }
			}
		} else {
			if (callback) { callback(err); }
		}
	};

	for (index in obj) {
		if (obj.hasOwnProperty(index)) {
			// Call the collection save method
			obj[index].save(saveCallback);
		}
	}
};

Shared.finishModule('Persist');
module.exports = Persist;
},{"./Collection":4,"./CollectionGroup":5,"./Shared":33,"localforage":43}],31:[function(_dereq_,module,exports){
"use strict";

var Shared = _dereq_('./Shared');

var ReactorIO = function (reactorIn, reactorOut, reactorProcess) {
	if (reactorIn && reactorOut && reactorProcess) {
		this._reactorIn = reactorIn;
		this._reactorOut = reactorOut;
		this._chainHandler = reactorProcess;

		if (!reactorIn.chain || !reactorOut.chainReceive) {
			throw('ForerunnerDB.ReactorIO: ReactorIO requires passed in and out objects to implement the ChainReactor mixin!');
		}

		// Register the reactorIO with the input
		reactorIn.chain(this);

		// Register the output with the reactorIO
		this.chain(reactorOut);
	} else {
		throw('ForerunnerDB.ReactorIO: ReactorIO requires in, out and process arguments to instantiate!');
	}
};

Shared.addModule('ReactorIO', ReactorIO);

ReactorIO.prototype.drop = function () {
	if (this._state !== 'dropped') {
		this._state = 'dropped';

		// Remove links
		if (this._reactorIn) {
			this._reactorIn.unChain(this);
		}

		if (this._reactorOut) {
			this.unChain(this._reactorOut);
		}

		delete this._reactorIn;
		delete this._reactorOut;
		delete this._chainHandler;

		this.emit('drop', this);
	}

	return true;
};

/**
 * Gets / sets the current state.
 * @param {String=} val The name of the state to set.
 * @returns {*}
 */
Shared.synthesize(ReactorIO.prototype, 'state');

Shared.mixin(ReactorIO.prototype, 'Mixin.ChainReactor');
Shared.mixin(ReactorIO.prototype, 'Mixin.Events');

Shared.finishModule('ReactorIO');
module.exports = ReactorIO;
},{"./Shared":33}],32:[function(_dereq_,module,exports){
"use strict";

var Shared = _dereq_('./Shared'),
	RestClient = _dereq_('rest'),
	mime = _dereq_('rest/interceptor/mime'),
	Db,
	Collection,
	CollectionDrop,
	CollectionGroup,
	CollectionInit,
	DbInit,
	Overload;

var Rest = function () {
	this.init.apply(this, arguments);
};

Rest.prototype.init = function (db) {
	this._endPoint = '';
	this._client = RestClient.wrap(mime);
};

/**
 * Convert a JSON object to url query parameter format.
 * @param {Object} obj The object to convert.
 * @returns {String}
 * @private
 */
Rest.prototype._params = function (obj) {
	var parts = [];

	for (var key in obj) {
		if (obj.hasOwnProperty(key)) {
			parts.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]));
		}
	}

	return parts.join('&');
};

Rest.prototype.get = function (path, data, callback) {
	var self= this,
		coll;

	path = path !== undefined ? path : "";

	//console.log('Getting: ', this.endPoint() + path + '?' + this._params(data));
	this._client({
		method: 'get',
		path: this.endPoint() + path,
		params: data
	}).then(function (response) {
		if (response.entity && response.entity.error) {
			if (callback) { callback(response.entity.error, response.entity, response); }
		} else {
			// Check if we have a collection
			coll = self.collection();

			if (coll) {
				// Upsert the records into the collection
				coll.upsert(response.entity);
			}

			if (callback) { callback(false, response.entity, response); }
		}
	}, function(response) {
		if (callback) { callback(true, response.entity, response); }
	});
};

Rest.prototype.post = function (path, data, callback) {
	this._client({
		method: 'post',
		path: this.endPoint() + path,
		entity: data,
		headers: {
			'Content-Type': 'application/json'
		}
	}).then(function (response) {
		if (response.entity && response.entity.error) {
			if (callback) { callback(response.entity.error, response.entity, response); }
		} else {
			if (callback) { callback(false, response.entity, response); }
		}
	}, function(response) {
		if (callback) { callback(true, response); }
	});
};

Shared.synthesize(Rest.prototype, 'sessionData');
Shared.synthesize(Rest.prototype, 'endPoint');
Shared.synthesize(Rest.prototype, 'collection');

Shared.addModule('Rest', Rest);
Shared.mixin(Rest.prototype, 'Mixin.ChainReactor');

Db = Shared.modules.Db;
Collection = _dereq_('./Collection');
CollectionDrop = Collection.prototype.drop;
CollectionGroup = _dereq_('./CollectionGroup');
CollectionInit = Collection.prototype.init;
DbInit = Db.prototype.init;
Overload = Shared.overload;

Collection.prototype.init = function () {
	this.rest = new Rest();
	this.rest.collection(this);
	CollectionInit.apply(this, arguments);
};

Db.prototype.init = function () {
	this.rest = new Rest();
	DbInit.apply(this, arguments);
};

Shared.finishModule('Rest');
module.exports = Rest;
},{"./Collection":4,"./CollectionGroup":5,"./Shared":33,"rest":46,"rest/interceptor/mime":51}],33:[function(_dereq_,module,exports){
"use strict";

/**
 * A shared object that can be used to store arbitrary data between class
 * instances, and access helper methods.
 * @mixin
 */
var Shared = {
	version: '1.3.57',
	modules: {},

	_synth: {},

	/**
	 * Adds a module to ForerunnerDB.
	 * @memberof Shared
	 * @param {String} name The name of the module.
	 * @param {Function} module The module class.
	 */
	addModule: function (name, module) {
		this.modules[name] = module;
		this.emit('moduleLoad', [name, module]);
	},

	/**
	 * Called by the module once all processing has been completed. Used to determine
	 * if the module is ready for use by other modules.
	 * @memberof Shared
	 * @param {String} name The name of the module.
	 */
	finishModule: function (name) {
		if (this.modules[name]) {
			this.modules[name]._fdbFinished = true;
			this.emit('moduleFinished', [name, this.modules[name]]);
		} else {
			throw('ForerunnerDB.Shared: finishModule called on a module that has not been registered with addModule(): ' + name);
		}
	},

	/**
	 * Will call your callback method when the specified module has loaded. If the module
	 * is already loaded the callback is called immediately.
	 * @memberof Shared
	 * @param {String} name The name of the module.
	 * @param {Function} callback The callback method to call when the module is loaded.
	 */
	moduleFinished: function (name, callback) {
		if (this.modules[name] && this.modules[name]._fdbFinished) {
			if (callback) { callback(name, this.modules[name]); }
		} else {
			this.on('moduleFinished', callback);
		}
	},

	/**
	 * Determines if a module has been added to ForerunnerDB or not.
	 * @memberof Shared
	 * @param {String} name The name of the module.
	 * @returns {Boolean} True if the module exists or false if not.
	 */
	moduleExists: function (name) {
		return Boolean(this.modules[name]);
	},

	/**
	 * Adds the properties and methods defined in the mixin to the passed object.
	 * @memberof Shared
	 * @param {Object} obj The target object to add mixin key/values to.
	 * @param {String} mixinName The name of the mixin to add to the object.
	 */
	mixin: function (obj, mixinName) {
		var system = this.mixins[mixinName];

		if (system) {
			for (var i in system) {
				if (system.hasOwnProperty(i)) {
					obj[i] = system[i];
				}
			}
		} else {
			throw('ForerunnerDB.Shared: Cannot find mixin named: ' + mixinName);
		}
	},

	/**
	 * Generates a generic getter/setter method for the passed method name.
	 * @memberof Shared
	 * @param {Object} obj The object to add the getter/setter to.
	 * @param {String} name The name of the getter/setter to generate.
	 * @param {Function=} extend A method to call before executing the getter/setter.
	 * The existing getter/setter can be accessed from the extend method via the
	 * $super e.g. this.$super();
	 */
	synthesize: function (obj, name, extend) {
		this._synth[name] = this._synth[name] || function (val) {
			if (val !== undefined) {
				this['_' + name] = val;
				return this;
			}

			return this['_' + name];
		};

		if (extend) {
			var self = this;

			obj[name] = function () {
				var tmp = this.$super,
					ret;

				this.$super = self._synth[name];
				ret = extend.apply(this, arguments);
				this.$super = tmp;

				return ret;
			};
		} else {
			obj[name] = this._synth[name];
		}
	},

	/**
	 * Allows a method to be overloaded.
	 * @memberof Shared
	 * @param arr
	 * @returns {Function}
	 * @constructor
	 */
	overload: _dereq_('./Overload'),

	/**
	 * Define the mixins that other modules can use as required.
	 * @memberof Shared
	 */
	mixins: {
		'Mixin.Common': _dereq_('./Mixin.Common'),
		'Mixin.Events': _dereq_('./Mixin.Events'),
		'Mixin.ChainReactor': _dereq_('./Mixin.ChainReactor'),
		'Mixin.CRUD': _dereq_('./Mixin.CRUD'),
		'Mixin.Constants': _dereq_('./Mixin.Constants'),
		'Mixin.Triggers': _dereq_('./Mixin.Triggers'),
		'Mixin.Sorting': _dereq_('./Mixin.Sorting'),
		'Mixin.Matching': _dereq_('./Mixin.Matching'),
		'Mixin.Updating': _dereq_('./Mixin.Updating')
	}
};

// Add event handling to shared
Shared.mixin(Shared, 'Mixin.Events');

module.exports = Shared;
},{"./Mixin.CRUD":16,"./Mixin.ChainReactor":17,"./Mixin.Common":18,"./Mixin.Constants":19,"./Mixin.Events":20,"./Mixin.Matching":21,"./Mixin.Sorting":22,"./Mixin.Triggers":23,"./Mixin.Updating":24,"./Overload":27}],34:[function(_dereq_,module,exports){
/* jshint strict:false */
if (!Array.prototype.filter) {
	Array.prototype.filter = function(fun/*, thisArg*/) {

		if (this === void 0 || this === null) {
			throw new TypeError();
		}

		var t = Object(this);
		var len = t.length >>> 0; // jshint ignore:line
		if (typeof fun !== 'function') {
			throw new TypeError();
		}

		var res = [];
		var thisArg = arguments.length >= 2 ? arguments[1] : void 0;
		for (var i = 0; i < len; i++) {
			if (i in t) {
				var val = t[i];

				// NOTE: Technically this should Object.defineProperty at
				//       the next index, as push can be affected by
				//       properties on Object.prototype and Array.prototype.
				//       But that method's new, and collisions should be
				//       rare, so use the more-compatible alternative.
				if (fun.call(thisArg, val, i, t)) {
					res.push(val);
				}
			}
		}

		return res;
	};
}

if (typeof Object.create !== 'function') {
	Object.create = (function() {
		var Temp = function() {};
		return function (prototype) {
			if (arguments.length > 1) {
				throw Error('Second argument not supported');
			}
			if (typeof prototype !== 'object') {
				throw TypeError('Argument must be an object');
			}
			Temp.prototype = prototype;
			var result = new Temp();
			Temp.prototype = null;
			return result;
		};
	})();
}

// Production steps of ECMA-262, Edition 5, 15.4.4.14
// Reference: http://es5.github.io/#x15.4.4.14e
if (!Array.prototype.indexOf) {
	Array.prototype.indexOf = function(searchElement, fromIndex) {
		var k;

		// 1. Let O be the result of calling ToObject passing
		//    the this value as the argument.
		if (this === null) {
			throw new TypeError('"this" is null or not defined');
		}

		var O = Object(this);

		// 2. Let lenValue be the result of calling the Get
		//    internal method of O with the argument "length".
		// 3. Let len be ToUint32(lenValue).
		var len = O.length >>> 0; // jshint ignore:line

		// 4. If len is 0, return -1.
		if (len === 0) {
			return -1;
		}

		// 5. If argument fromIndex was passed let n be
		//    ToInteger(fromIndex); else let n be 0.
		var n = +fromIndex || 0;

		if (Math.abs(n) === Infinity) {
			n = 0;
		}

		// 6. If n >= len, return -1.
		if (n >= len) {
			return -1;
		}

		// 7. If n >= 0, then Let k be n.
		// 8. Else, n<0, Let k be len - abs(n).
		//    If k is less than 0, then let k be 0.
		k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);

		// 9. Repeat, while k < len
		while (k < len) {
			// a. Let Pk be ToString(k).
			//   This is implicit for LHS operands of the in operator
			// b. Let kPresent be the result of calling the
			//    HasProperty internal method of O with argument Pk.
			//   This step can be combined with c
			// c. If kPresent is true, then
			//    i.  Let elementK be the result of calling the Get
			//        internal method of O with the argument ToString(k).
			//   ii.  Let same be the result of applying the
			//        Strict Equality Comparison Algorithm to
			//        searchElement and elementK.
			//  iii.  If same is true, return k.
			if (k in O && O[k] === searchElement) {
				return k;
			}
			k++;
		}
		return -1;
	};
}

module.exports = {};
},{}],35:[function(_dereq_,module,exports){
"use strict";

// Import external names locally
var Shared,
	Db,
	Collection,
	CollectionGroup,
	CollectionInit,
	DbInit,
	ReactorIO,
	ActiveBucket;

Shared = _dereq_('./Shared');

/**
 * Creates a new view instance.
 * @param {String} name The name of the view.
 * @param {Object=} query The view's query.
 * @param {Object=} options An options object.
 * @constructor
 */
var View = function (name, query, options) {
	this.init.apply(this, arguments);
};

View.prototype.init = function (name, query, options) {
	var self = this;

	this._name = name;
	this._listeners = {};
	this._querySettings = {};
	this._debug = {};

	this.query(query, false);
	this.queryOptions(options, false);

	this._collectionDroppedWrap = function () {
		self._collectionDropped.apply(self, arguments);
	};

	this._privateData = new Collection('__FDB__view_privateData_' + this._name);
};

Shared.addModule('View', View);
Shared.mixin(View.prototype, 'Mixin.Common');
Shared.mixin(View.prototype, 'Mixin.ChainReactor');
Shared.mixin(View.prototype, 'Mixin.Constants');
Shared.mixin(View.prototype, 'Mixin.Triggers');

Collection = _dereq_('./Collection');
CollectionGroup = _dereq_('./CollectionGroup');
ActiveBucket = _dereq_('./ActiveBucket');
ReactorIO = _dereq_('./ReactorIO');
CollectionInit = Collection.prototype.init;
Db = Shared.modules.Db;
DbInit = Db.prototype.init;

/**
 * Gets / sets the current state.
 * @param {String=} val The name of the state to set.
 * @returns {*}
 */
Shared.synthesize(View.prototype, 'state');

/**
 * Gets / sets the current name.
 * @param {String=} val The new name to set.
 * @returns {*}
 */
Shared.synthesize(View.prototype, 'name');

/**
 * Gets / sets the current cursor.
 * @param {String=} val The new cursor to set.
 * @returns {*}
 */
Shared.synthesize(View.prototype, 'cursor', function (val) {
	if (val === undefined) {
		return this._cursor || {};
	}

	this.$super.apply(this, arguments);
});

/**
 * Executes an insert against the view's underlying data-source.
 * @see Collection::insert()
 */
View.prototype.insert = function () {
	this._from.insert.apply(this._from, arguments);
};

/**
 * Executes an update against the view's underlying data-source.
 * @see Collection::update()
 */
View.prototype.update = function () {
	this._from.update.apply(this._from, arguments);
};

/**
 * Executes an updateById against the view's underlying data-source.
 * @see Collection::updateById()
 */
View.prototype.updateById = function () {
	this._from.updateById.apply(this._from, arguments);
};

/**
 * Executes a remove against the view's underlying data-source.
 * @see Collection::remove()
 */
View.prototype.remove = function () {
	this._from.remove.apply(this._from, arguments);
};

/**
 * Queries the view data.
 * @see Collection::find()
 * @returns {Array} The result of the find query.
 */
View.prototype.find = function (query, options) {
	return this.publicData().find(query, options);
};

/**
 * Gets the module's internal data collection.
 * @returns {Collection}
 */
View.prototype.data = function () {
	return this._privateData;
};

/**
 * Sets the collection from which the view will assemble its data.
 * @param {Collection} collection The collection to use to assemble view data.
 * @returns {View}
 */
View.prototype.from = function (collection) {
	var self = this;

	if (collection !== undefined) {
		// Check if we have an existing from
		if (this._from) {
			// Remove the listener to the drop event
			this._from.off('drop', this._collectionDroppedWrap);
			delete this._from;
		}

		if (typeof(collection) === 'string') {
			collection = this._db.collection(collection);
		}

		this._from = collection;
		this._from.on('drop', this._collectionDroppedWrap);

		// Create a new reactor IO graph node that intercepts chain packets from the
		// view's "from" collection and determines how they should be interpreted by
		// this view. If the view does not have a query then this reactor IO will
		// simply pass along the chain packet without modifying it.
		this._io = new ReactorIO(collection, this, function (chainPacket) {
			var data,
				diff,
				query,
				filteredData,
				doSend,
				pk,
				i;

			// Check if we have a constraining query
			if (self._querySettings.query) {
				if (chainPacket.type === 'insert') {
					data = chainPacket.data;

					// Check if the data matches our query
					if (data instanceof Array) {
						filteredData = [];

						for (i = 0; i < data.length; i++) {
							if (self._privateData._match(data[i], self._querySettings.query, 'and', {})) {
								filteredData.push(data[i]);
								doSend = true;
							}
						}
					} else {
						if (self._privateData._match(data, self._querySettings.query, 'and', {})) {
							filteredData = data;
							doSend = true;
						}
					}

					if (doSend) {
						this.chainSend('insert', filteredData);
					}

					return true;
				}

				if (chainPacket.type === 'update') {
					// Do a DB diff between this view's data and the underlying collection it reads from
					// to see if something has changed
					diff = self._privateData.diff(self._from.subset(self._querySettings.query, self._querySettings.options));

					if (diff.insert.length || diff.remove.length) {
						// Now send out new chain packets for each operation
						if (diff.insert.length) {
							this.chainSend('insert', diff.insert);
						}

						if (diff.update.length) {
							pk = self._privateData.primaryKey();
							for (i = 0; i < diff.update.length; i++) {
								query = {};
								query[pk] = diff.update[i][pk];

								this.chainSend('update', {
									query: query,
									update: diff.update[i]
								});
							}
						}

						if (diff.remove.length) {
							pk = self._privateData.primaryKey();
							var $or = [],
								removeQuery = {
									query: {
										$or: $or
									}
								};

							for (i = 0; i < diff.remove.length; i++) {
								$or.push({_id: diff.remove[i][pk]});
							}

							this.chainSend('remove', removeQuery);
						}

						// Return true to stop further propagation of the chain packet
						return true;
					} else {
						// Returning false informs the chain reactor to continue propagation
						// of the chain packet down the graph tree
						return false;
					}
				}
			}

			// Returning false informs the chain reactor to continue propagation
			// of the chain packet down the graph tree
			return false;
		});

		var collData = collection.find(this._querySettings.query, this._querySettings.options);

		this._transformPrimaryKey(collection.primaryKey());
		this._transformSetData(collData);

		this._privateData.primaryKey(collection.primaryKey());
		this._privateData.setData(collData);

		if (this._querySettings.options && this._querySettings.options.$orderBy) {
			this.rebuildActiveBucket(this._querySettings.options.$orderBy);
		} else {
			this.rebuildActiveBucket();
		}
	}

	return this;
};

/**
 * Handles when an underlying collection the view is using as a data
 * source is dropped.
 * @param {Collection} collection The collection that has been dropped.
 * @private
 */
View.prototype._collectionDropped = function (collection) {
	if (collection) {
		// Collection was dropped, remove from view
		delete this._from;
	}
};

/**
 * Creates an index on the view.
 * @see Collection::ensureIndex()
 * @returns {*}
 */
View.prototype.ensureIndex = function () {
	return this._privateData.ensureIndex.apply(this._privateData, arguments);
};

/**
 * The chain reaction handler method for the view.
 * @param {Object} chainPacket The chain reaction packet to handle.
 * @private
 */
View.prototype._chainHandler = function (chainPacket) {
	var //self = this,
		arr,
		count,
		index,
		insertIndex,
		//tempData,
		//dataIsArray,
		updates,
		//finalUpdates,
		primaryKey,
		tQuery,
		item,
		currentIndex,
		i;

	switch (chainPacket.type) {
		case 'setData':
			if (this.debug()) {
				console.log('ForerunnerDB.View: Setting data on view "' + this.name() + '" in underlying (internal) view collection "' + this._privateData.name() + '"');
			}

			// Get the new data from our underlying data source sorted as we want
			var collData = this._from.find(this._querySettings.query, this._querySettings.options);

			// Modify transform data
			this._transformSetData(collData);
			this._privateData.setData(collData);
			break;

		case 'insert':
			if (this.debug()) {
				console.log('ForerunnerDB.View: Inserting some data on view "' + this.name() + '" in underlying (internal) view collection "' + this._privateData.name() + '"');
			}

			// Decouple the data to ensure we are working with our own copy
			chainPacket.data = this.decouple(chainPacket.data);

			// Make sure we are working with an array
			if (!(chainPacket.data instanceof Array)) {
				chainPacket.data = [chainPacket.data];
			}

			if (this._querySettings.options && this._querySettings.options.$orderBy) {
				// Loop the insert data and find each item's index
				arr = chainPacket.data;
				count = arr.length;

				for (index = 0; index < count; index++) {
					insertIndex = this._activeBucket.insert(arr[index]);

					// Modify transform data
					this._transformInsert(chainPacket.data, insertIndex);
					this._privateData._insertHandle(chainPacket.data, insertIndex);
				}
			} else {
				// Set the insert index to the passed index, or if none, the end of the view data array
				insertIndex = this._privateData._data.length;

				// Modify transform data
				this._transformInsert(chainPacket.data, insertIndex);
				this._privateData._insertHandle(chainPacket.data, insertIndex);
			}
			break;

		case 'update':
			if (this.debug()) {
				console.log('ForerunnerDB.View: Updating some data on view "' + this.name() + '" in underlying (internal) view collection "' + this._privateData.name() + '"');
			}

			primaryKey = this._privateData.primaryKey();

			// Do the update
			updates = this._privateData.update(
				chainPacket.data.query,
				chainPacket.data.update,
				chainPacket.data.options
			);

			if (this._querySettings.options && this._querySettings.options.$orderBy) {
				// TODO: This would be a good place to improve performance by somehow
				// TODO: inspecting the change that occurred when update was performed
				// TODO: above and determining if it affected the order clause keys
				// TODO: and if not, skipping the active bucket updates here

				// Loop the updated items and work out their new sort locations
				count = updates.length;
				for (index = 0; index < count; index++) {
					item = updates[index];

					// Remove the item from the active bucket (via it's id)
					this._activeBucket.remove(item);

					// Get the current location of the item
					currentIndex = this._privateData._data.indexOf(item);

					// Add the item back in to the active bucket
					insertIndex = this._activeBucket.insert(item);

					if (currentIndex !== insertIndex) {
						// Move the updated item to the new index
						this._privateData._updateSpliceMove(this._privateData._data, currentIndex, insertIndex);
					}
				}
			}

			if (this._transformEnabled && this._transformIn) {
				primaryKey = this._publicData.primaryKey();

				for (i = 0; i < updates.length; i++) {
					tQuery = {};
					item = updates[i];
					tQuery[primaryKey] = item[primaryKey];

					this._transformUpdate(tQuery, item);
				}
			}
			break;

		case 'remove':
			if (this.debug()) {
				console.log('ForerunnerDB.View: Removing some data on view "' + this.name() + '" in underlying (internal) view collection "' + this._privateData.name() + '"');
			}

			// Modify transform data
			this._transformRemove(chainPacket.data.query, chainPacket.options);
			this._privateData.remove(chainPacket.data.query, chainPacket.options);
			break;

		default:
			break;
	}
};

/**
 * Listens for an event.
 * @see Mixin.Events::on()
 */
View.prototype.on = function () {
	return this._privateData.on.apply(this._privateData, arguments);
};

/**
 * Cancels an event listener.
 * @see Mixin.Events::off()
 */
View.prototype.off = function () {
	return this._privateData.off.apply(this._privateData, arguments);
};

/**
 * Emits an event.
 * @see Mixin.Events::emit()
 */
View.prototype.emit = function () {
	return this._privateData.emit.apply(this._privateData, arguments);
};

/**
 * Find the distinct values for a specified field across a single collection and
 * returns the results in an array.
 * @param {String} key The field path to return distinct values for e.g. "person.name".
 * @param {Object=} query The query to use to filter the documents used to return values from.
 * @param {Object=} options The query options to use when running the query.
 * @returns {Array}
 */
View.prototype.distinct = function (key, query, options) {
	return this._privateData.distinct.apply(this._privateData, arguments);
};

/**
 * Gets the primary key for this view from the assigned collection.
 * @see Collection::primaryKey()
 * @returns {String}
 */
View.prototype.primaryKey = function () {
	return this._privateData.primaryKey();
};

/**
 * Drops a view and all it's stored data from the database.
 * @returns {boolean} True on success, false on failure.
 */
View.prototype.drop = function () {
	if (this._state !== 'dropped') {
		if (this._from) {
			this._from.off('drop', this._collectionDroppedWrap);
			this._from._removeView(this);

			if (this.debug() || (this._db && this._db.debug())) {
				console.log('ForerunnerDB.View: Dropping view ' + this._name);
			}

			this._state = 'dropped';

			// Clear io and chains
			if (this._io) {
				this._io.drop();
			}

			// Drop the view's internal collection
			if (this._privateData) {
				this._privateData.drop();
			}

			if (this._db && this._name) {
				delete this._db._view[this._name];
			}

			this.emit('drop', this);

			delete this._chain;
			delete this._from;
			delete this._privateData;
			delete this._io;
			delete this._listeners;
			delete this._querySettings;
			delete this._db;

			return true;
		}
	} else {
		return true;
	}

	return false;
};

/**
 * Gets / sets the DB the view is bound against. Automatically set
 * when the db.oldView(viewName) method is called.
 * @param db
 * @returns {*}
 */
View.prototype.db = function (db) {
	if (db !== undefined) {
		this._db = db;
		this.privateData().db(db);
		this.publicData().db(db);
		return this;
	}

	return this._db;
};

/**
 * Gets / sets the query object and query options that the view uses
 * to build it's data set. This call modifies both the query and
 * query options at the same time.
 * @param {Object=} query The query to set.
 * @param {Boolean=} options The query options object.
 * @param {Boolean=} refresh Whether to refresh the view data after
 * this operation. Defaults to true.
 * @returns {*}
 */
View.prototype.queryData = function (query, options, refresh) {
	if (query !== undefined) {
		this._querySettings.query = query;
	}

	if (options !== undefined) {
		this._querySettings.options = options;
	}

	if (query !== undefined || options !== undefined) {
		if (refresh === undefined || refresh === true) {
			this.refresh();
		}

		return this;
	}

	return this._querySettings;
};

/**
 * Add data to the existing query.
 * @param {Object} obj The data whose keys will be added to the existing
 * query object.
 * @param {Boolean} overwrite Whether or not to overwrite data that already
 * exists in the query object. Defaults to true.
 * @param {Boolean=} refresh Whether or not to refresh the view data set
 * once the operation is complete. Defaults to true.
 */
View.prototype.queryAdd = function (obj, overwrite, refresh) {
	this._querySettings.query = this._querySettings.query || {};

	var query = this._querySettings.query,
		i;

	if (obj !== undefined) {
		// Loop object properties and add to existing query
		for (i in obj) {
			if (obj.hasOwnProperty(i)) {
				if (query[i] === undefined || (query[i] !== undefined && overwrite !== false)) {
					query[i] = obj[i];
				}
			}
		}
	}

	if (refresh === undefined || refresh === true) {
		this.refresh();
	}
};

/**
 * Remove data from the existing query.
 * @param {Object} obj The data whose keys will be removed from the existing
 * query object.
 * @param {Boolean=} refresh Whether or not to refresh the view data set
 * once the operation is complete. Defaults to true.
 */
View.prototype.queryRemove = function (obj, refresh) {
	var query = this._querySettings.query,
		i;

	if (query) {
		if (obj !== undefined) {
			// Loop object properties and add to existing query
			for (i in obj) {
				if (obj.hasOwnProperty(i)) {
					delete query[i];
				}
			}
		}

		if (refresh === undefined || refresh === true) {
			this.refresh();
		}
	}
};

/**
 * Gets / sets the query being used to generate the view data. It
 * does not change or modify the view's query options.
 * @param {Object=} query The query to set.
 * @param {Boolean=} refresh Whether to refresh the view data after
 * this operation. Defaults to true.
 * @returns {*}
 */
View.prototype.query = function (query, refresh) {
	if (query !== undefined) {
		this._querySettings.query = query;

		if (refresh === undefined || refresh === true) {
			this.refresh();
		}

		return this;
	}

	return this._querySettings.query;
};

/**
 * Gets / sets the orderBy clause in the query options for the view.
 * @param {Object=} val The order object.
 * @returns {*}
 */
View.prototype.orderBy = function (val) {
	if (val !== undefined) {
		var queryOptions = this.queryOptions() || {};
		queryOptions.$orderBy = val;

		this.queryOptions(queryOptions);
		return this;
	}

	return (this.queryOptions() || {}).$orderBy;
};

/**
 * Gets / sets the page clause in the query options for the view.
 * @param {Number=} val The page number to change to (zero index).
 * @returns {*}
 */
View.prototype.page = function (val) {
	if (val !== undefined) {
		var queryOptions = this.queryOptions() || {};

		// Only execute a query options update if page has changed
		if (val !== queryOptions.$page) {
			queryOptions.$page = val;
			this.queryOptions(queryOptions);
		}

		return this;
	}

	return (this.queryOptions() || {}).$page;
};

/**
 * Jump to the first page in the data set.
 * @returns {*}
 */
View.prototype.pageFirst = function () {
	return this.page(0);
};

/**
 * Jump to the last page in the data set.
 * @returns {*}
 */
View.prototype.pageLast = function () {
	var pages = this.cursor().pages,
		lastPage = pages !== undefined ? pages : 0;

	return this.page(lastPage - 1);
};

/**
 * Move forward or backwards in the data set pages by passing a positive
 * or negative integer of the number of pages to move.
 * @param {Number} val The number of pages to move.
 * @returns {*}
 */
View.prototype.pageScan = function (val) {
	if (val !== undefined) {
		var pages = this.cursor().pages,
			queryOptions = this.queryOptions() || {},
			currentPage = queryOptions.$page !== undefined ? queryOptions.$page : 0;

		currentPage += val;

		if (currentPage < 0) {
			currentPage = 0;
		}

		if (currentPage >= pages) {
			currentPage = pages - 1;
		}

		return this.page(currentPage);
	}
};

/**
 * Gets / sets the query options used when applying sorting etc to the
 * view data set.
 * @param {Object=} options An options object.
 * @param {Boolean=} refresh Whether to refresh the view data after
 * this operation. Defaults to true.
 * @returns {*}
 */
View.prototype.queryOptions = function (options, refresh) {
	if (options !== undefined) {
		this._querySettings.options = options;
		if (options.$decouple === undefined) { options.$decouple = true; }

		if (refresh === undefined || refresh === true) {
			this.refresh();
		} else {
			this.rebuildActiveBucket(options.$orderBy);
		}
		return this;
	}

	return this._querySettings.options;
};

View.prototype.rebuildActiveBucket = function (orderBy) {
	if (orderBy) {
		var arr = this._privateData._data,
			arrCount = arr.length;

		// Build a new active bucket
		this._activeBucket = new ActiveBucket(orderBy);
		this._activeBucket.primaryKey(this._privateData.primaryKey());

		// Loop the current view data and add each item
		for (var i = 0; i < arrCount; i++) {
			this._activeBucket.insert(arr[i]);
		}
	} else {
		// Remove any existing active bucket
		delete this._activeBucket;
	}
};

/**
 * Refreshes the view data such as ordering etc.
 */
View.prototype.refresh = function () {
	if (this._from) {
		var pubData = this.publicData(),
			refreshResults;

		// Re-grab all the data for the view from the collection
		this._privateData.remove();
		pubData.remove();

		refreshResults = this._from.find(this._querySettings.query, this._querySettings.options);
		this.cursor(refreshResults.$cursor);

		this._privateData.insert(refreshResults);

		this._privateData._data.$cursor = refreshResults.$cursor;
		pubData._data.$cursor = refreshResults.$cursor;

		/*if (pubData._linked) {
			// Update data and observers
			//var transformedData = this._privateData.find();
			// TODO: Shouldn't this data get passed into a transformIn first?
			// TODO: This breaks linking because its passing decoupled data and overwriting non-decoupled data
			// TODO: Is this even required anymore? After commenting it all seems to work
			// TODO: Might be worth setting up a test to check transforms and linking then remove this if working?
			//jQuery.observable(pubData._data).refresh(transformedData);
		}*/
	}

	if (this._querySettings.options && this._querySettings.options.$orderBy) {
		this.rebuildActiveBucket(this._querySettings.options.$orderBy);
	} else {
		this.rebuildActiveBucket();
	}

	return this;
};

/**
 * Returns the number of documents currently in the view.
 * @returns {Number}
 */
View.prototype.count = function () {
	return this._privateData && this._privateData._data ? this._privateData._data.length : 0;
};

// Call underlying
View.prototype.subset = function () {
	return this.publicData().subset.apply(this._privateData, arguments);
};

/**
 * Takes the passed data and uses it to set transform methods and globally
 * enable or disable the transform system for the view.
 * @param {Object} obj The new transform system settings "enabled", "dataIn" and "dataOut":
 * {
 * 	"enabled": true,
 * 	"dataIn": function (data) { return data; },
 * 	"dataOut": function (data) { return data; }
 * }
 * @returns {*}
 */
View.prototype.transform = function (obj) {
	if (obj !== undefined) {
		if (typeof obj === "object") {
			if (obj.enabled !== undefined) {
				this._transformEnabled = obj.enabled;
			}

			if (obj.dataIn !== undefined) {
				this._transformIn = obj.dataIn;
			}

			if (obj.dataOut !== undefined) {
				this._transformOut = obj.dataOut;
			}
		} else {
			this._transformEnabled = obj !== false;
		}

		// Update the transformed data object
		this._transformPrimaryKey(this.privateData().primaryKey());
		this._transformSetData(this.privateData().find());
		return this;
	}

	return {
		enabled: this._transformEnabled,
		dataIn: this._transformIn,
		dataOut: this._transformOut
	};
};

/**
 * Executes a method against each document that matches query and returns an
 * array of documents that may have been modified by the method.
 * @param {Object} query The query object.
 * @param {Function} func The method that each document is passed to. If this method
 * returns false for a particular document it is excluded from the results.
 * @param {Object=} options Optional options object.
 * @returns {Array}
 */
View.prototype.filter = function (query, func, options) {
	return (this.publicData()).filter(query, func, options);
};

/**
 * Returns the non-transformed data the view holds as a collection
 * reference.
 * @return {Collection} The non-transformed collection reference.
 */
View.prototype.privateData = function () {
	return this._privateData;
};

/**
 * Returns a data object representing the public data this view
 * contains. This can change depending on if transforms are being
 * applied to the view or not.
 *
 * If no transforms are applied then the public data will be the
 * same as the private data the view holds. If transforms are
 * applied then the public data will contain the transformed version
 * of the private data.
 *
 * The public data collection is also used by data binding to only
 * changes to the publicData will show in a data-bound element.
 */
View.prototype.publicData = function () {
	if (this._transformEnabled) {
		return this._publicData;
	} else {
		return this._privateData;
	}
};

/**
 * Updates the public data object to match data from the private data object
 * by running private data through the dataIn method provided in
 * the transform() call.
 * @private
 */
View.prototype._transformSetData = function (data) {
	if (this._transformEnabled) {
		// Clear existing data
		this._publicData = new Collection('__FDB__view_publicData_' + this._name);
		this._publicData.db(this._privateData._db);
		this._publicData.transform({
			enabled: true,
			dataIn: this._transformIn,
			dataOut: this._transformOut
		});

		this._publicData.setData(data);
	}
};

View.prototype._transformInsert = function (data, index) {
	if (this._transformEnabled && this._publicData) {
		this._publicData.insert(data, index);
	}
};

View.prototype._transformUpdate = function (query, update, options) {
	if (this._transformEnabled && this._publicData) {
		this._publicData.update(query, update, options);
	}
};

View.prototype._transformRemove = function (query, options) {
	if (this._transformEnabled && this._publicData) {
		this._publicData.remove(query, options);
	}
};

View.prototype._transformPrimaryKey = function (key) {
	if (this._transformEnabled && this._publicData) {
		this._publicData.primaryKey(key);
	}
};

// Extend collection with view init
Collection.prototype.init = function () {
	this._view = [];
	CollectionInit.apply(this, arguments);
};

/**
 * Creates a view and assigns the collection as its data source.
 * @param {String} name The name of the new view.
 * @param {Object} query The query to apply to the new view.
 * @param {Object} options The options object to apply to the view.
 * @returns {*}
 */
Collection.prototype.view = function (name, query, options) {
	if (this._db && this._db._view ) {
		if (!this._db._view[name]) {
			var view = new View(name, query, options)
				.db(this._db)
				.from(this);

			this._view = this._view || [];
			this._view.push(view);

			return view;
		} else {
			throw('ForerunnerDB.Collection "' + this.name() + '": Cannot create a view using this collection because a view with this name already exists: ' + name);
		}
	}
};

/**
 * Adds a view to the internal view lookup.
 * @param {View} view The view to add.
 * @returns {Collection}
 * @private
 */
Collection.prototype._addView = CollectionGroup.prototype._addView = function (view) {
	if (view !== undefined) {
		this._view.push(view);
	}

	return this;
};

/**
 * Removes a view from the internal view lookup.
 * @param {View} view The view to remove.
 * @returns {Collection}
 * @private
 */
Collection.prototype._removeView = CollectionGroup.prototype._removeView = function (view) {
	if (view !== undefined) {
		var index = this._view.indexOf(view);
		if (index > -1) {
			this._view.splice(index, 1);
		}
	}

	return this;
};

// Extend DB with views init
Db.prototype.init = function () {
	this._view = {};
	DbInit.apply(this, arguments);
};

/**
 * Gets a view by it's name.
 * @param {String} viewName The name of the view to retrieve.
 * @returns {*}
 */
Db.prototype.view = function (viewName) {
	if (!this._view[viewName]) {
		if (this.debug() || (this._db && this._db.debug())) {
			console.log('Db.View: Creating view ' + viewName);
		}
	}

	this._view[viewName] = this._view[viewName] || new View(viewName).db(this);
	return this._view[viewName];
};

/**
 * Determine if a view with the passed name already exists.
 * @param {String} viewName The name of the view to check for.
 * @returns {boolean}
 */
Db.prototype.viewExists = function (viewName) {
	return Boolean(this._view[viewName]);
};

/**
 * Returns an array of views the DB currently has.
 * @returns {Array} An array of objects containing details of each view
 * the database is currently managing.
 */
Db.prototype.views = function () {
	var arr = [],
		i;

	for (i in this._view) {
		if (this._view.hasOwnProperty(i)) {
			arr.push({
				name: i,
				count: this._view[i].count()
			});
		}
	}

	return arr;
};

Shared.finishModule('View');
module.exports = View;
},{"./ActiveBucket":3,"./Collection":4,"./CollectionGroup":5,"./ReactorIO":31,"./Shared":33}],36:[function(_dereq_,module,exports){
// shim for using process in browser

var process = module.exports = {};
var queue = [];
var draining = false;

function drainQueue() {
    if (draining) {
        return;
    }
    draining = true;
    var currentQueue;
    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        var i = -1;
        while (++i < len) {
            currentQueue[i]();
        }
        len = queue.length;
    }
    draining = false;
}
process.nextTick = function (fun) {
    queue.push(fun);
    if (!draining) {
        setTimeout(drainQueue, 0);
    }
};

process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

// TODO(shtylman)
process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],37:[function(_dereq_,module,exports){
'use strict';

var asap = _dereq_('asap')

module.exports = Promise
function Promise(fn) {
  if (typeof this !== 'object') throw new TypeError('Promises must be constructed via new')
  if (typeof fn !== 'function') throw new TypeError('not a function')
  var state = null
  var value = null
  var deferreds = []
  var self = this

  this.then = function(onFulfilled, onRejected) {
    return new Promise(function(resolve, reject) {
      handle(new Handler(onFulfilled, onRejected, resolve, reject))
    })
  }

  function handle(deferred) {
    if (state === null) {
      deferreds.push(deferred)
      return
    }
    asap(function() {
      var cb = state ? deferred.onFulfilled : deferred.onRejected
      if (cb === null) {
        (state ? deferred.resolve : deferred.reject)(value)
        return
      }
      var ret
      try {
        ret = cb(value)
      }
      catch (e) {
        deferred.reject(e)
        return
      }
      deferred.resolve(ret)
    })
  }

  function resolve(newValue) {
    try { //Promise Resolution Procedure: https://github.com/promises-aplus/promises-spec#the-promise-resolution-procedure
      if (newValue === self) throw new TypeError('A promise cannot be resolved with itself.')
      if (newValue && (typeof newValue === 'object' || typeof newValue === 'function')) {
        var then = newValue.then
        if (typeof then === 'function') {
          doResolve(then.bind(newValue), resolve, reject)
          return
        }
      }
      state = true
      value = newValue
      finale()
    } catch (e) { reject(e) }
  }

  function reject(newValue) {
    state = false
    value = newValue
    finale()
  }

  function finale() {
    for (var i = 0, len = deferreds.length; i < len; i++)
      handle(deferreds[i])
    deferreds = null
  }

  doResolve(fn, resolve, reject)
}


function Handler(onFulfilled, onRejected, resolve, reject){
  this.onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : null
  this.onRejected = typeof onRejected === 'function' ? onRejected : null
  this.resolve = resolve
  this.reject = reject
}

/**
 * Take a potentially misbehaving resolver function and make sure
 * onFulfilled and onRejected are only called once.
 *
 * Makes no guarantees about asynchrony.
 */
function doResolve(fn, onFulfilled, onRejected) {
  var done = false;
  try {
    fn(function (value) {
      if (done) return
      done = true
      onFulfilled(value)
    }, function (reason) {
      if (done) return
      done = true
      onRejected(reason)
    })
  } catch (ex) {
    if (done) return
    done = true
    onRejected(ex)
  }
}

},{"asap":39}],38:[function(_dereq_,module,exports){
'use strict';

//This file contains then/promise specific extensions to the core promise API

var Promise = _dereq_('./core.js')
var asap = _dereq_('asap')

module.exports = Promise

/* Static Functions */

function ValuePromise(value) {
  this.then = function (onFulfilled) {
    if (typeof onFulfilled !== 'function') return this
    return new Promise(function (resolve, reject) {
      asap(function () {
        try {
          resolve(onFulfilled(value))
        } catch (ex) {
          reject(ex);
        }
      })
    })
  }
}
ValuePromise.prototype = Object.create(Promise.prototype)

var TRUE = new ValuePromise(true)
var FALSE = new ValuePromise(false)
var NULL = new ValuePromise(null)
var UNDEFINED = new ValuePromise(undefined)
var ZERO = new ValuePromise(0)
var EMPTYSTRING = new ValuePromise('')

Promise.resolve = function (value) {
  if (value instanceof Promise) return value

  if (value === null) return NULL
  if (value === undefined) return UNDEFINED
  if (value === true) return TRUE
  if (value === false) return FALSE
  if (value === 0) return ZERO
  if (value === '') return EMPTYSTRING

  if (typeof value === 'object' || typeof value === 'function') {
    try {
      var then = value.then
      if (typeof then === 'function') {
        return new Promise(then.bind(value))
      }
    } catch (ex) {
      return new Promise(function (resolve, reject) {
        reject(ex)
      })
    }
  }

  return new ValuePromise(value)
}

Promise.from = Promise.cast = function (value) {
  var err = new Error('Promise.from and Promise.cast are deprecated, use Promise.resolve instead')
  err.name = 'Warning'
  console.warn(err.stack)
  return Promise.resolve(value)
}

Promise.denodeify = function (fn, argumentCount) {
  argumentCount = argumentCount || Infinity
  return function () {
    var self = this
    var args = Array.prototype.slice.call(arguments)
    return new Promise(function (resolve, reject) {
      while (args.length && args.length > argumentCount) {
        args.pop()
      }
      args.push(function (err, res) {
        if (err) reject(err)
        else resolve(res)
      })
      fn.apply(self, args)
    })
  }
}
Promise.nodeify = function (fn) {
  return function () {
    var args = Array.prototype.slice.call(arguments)
    var callback = typeof args[args.length - 1] === 'function' ? args.pop() : null
    try {
      return fn.apply(this, arguments).nodeify(callback)
    } catch (ex) {
      if (callback === null || typeof callback == 'undefined') {
        return new Promise(function (resolve, reject) { reject(ex) })
      } else {
        asap(function () {
          callback(ex)
        })
      }
    }
  }
}

Promise.all = function () {
  var calledWithArray = arguments.length === 1 && Array.isArray(arguments[0])
  var args = Array.prototype.slice.call(calledWithArray ? arguments[0] : arguments)

  if (!calledWithArray) {
    var err = new Error('Promise.all should be called with a single array, calling it with multiple arguments is deprecated')
    err.name = 'Warning'
    console.warn(err.stack)
  }

  return new Promise(function (resolve, reject) {
    if (args.length === 0) return resolve([])
    var remaining = args.length
    function res(i, val) {
      try {
        if (val && (typeof val === 'object' || typeof val === 'function')) {
          var then = val.then
          if (typeof then === 'function') {
            then.call(val, function (val) { res(i, val) }, reject)
            return
          }
        }
        args[i] = val
        if (--remaining === 0) {
          resolve(args);
        }
      } catch (ex) {
        reject(ex)
      }
    }
    for (var i = 0; i < args.length; i++) {
      res(i, args[i])
    }
  })
}

Promise.reject = function (value) {
  return new Promise(function (resolve, reject) { 
    reject(value);
  });
}

Promise.race = function (values) {
  return new Promise(function (resolve, reject) { 
    values.forEach(function(value){
      Promise.resolve(value).then(resolve, reject);
    })
  });
}

/* Prototype Methods */

Promise.prototype.done = function (onFulfilled, onRejected) {
  var self = arguments.length ? this.then.apply(this, arguments) : this
  self.then(null, function (err) {
    asap(function () {
      throw err
    })
  })
}

Promise.prototype.nodeify = function (callback) {
  if (typeof callback != 'function') return this

  this.then(function (value) {
    asap(function () {
      callback(null, value)
    })
  }, function (err) {
    asap(function () {
      callback(err)
    })
  })
}

Promise.prototype['catch'] = function (onRejected) {
  return this.then(null, onRejected);
}

},{"./core.js":37,"asap":39}],39:[function(_dereq_,module,exports){
(function (process){

// Use the fastest possible means to execute a task in a future turn
// of the event loop.

// linked list of tasks (single, with head node)
var head = {task: void 0, next: null};
var tail = head;
var flushing = false;
var requestFlush = void 0;
var isNodeJS = false;

function flush() {
    /* jshint loopfunc: true */

    while (head.next) {
        head = head.next;
        var task = head.task;
        head.task = void 0;
        var domain = head.domain;

        if (domain) {
            head.domain = void 0;
            domain.enter();
        }

        try {
            task();

        } catch (e) {
            if (isNodeJS) {
                // In node, uncaught exceptions are considered fatal errors.
                // Re-throw them synchronously to interrupt flushing!

                // Ensure continuation if the uncaught exception is suppressed
                // listening "uncaughtException" events (as domains does).
                // Continue in next event to avoid tick recursion.
                if (domain) {
                    domain.exit();
                }
                setTimeout(flush, 0);
                if (domain) {
                    domain.enter();
                }

                throw e;

            } else {
                // In browsers, uncaught exceptions are not fatal.
                // Re-throw them asynchronously to avoid slow-downs.
                setTimeout(function() {
                   throw e;
                }, 0);
            }
        }

        if (domain) {
            domain.exit();
        }
    }

    flushing = false;
}

if (typeof process !== "undefined" && process.nextTick) {
    // Node.js before 0.9. Note that some fake-Node environments, like the
    // Mocha test runner, introduce a `process` global without a `nextTick`.
    isNodeJS = true;

    requestFlush = function () {
        process.nextTick(flush);
    };

} else if (typeof setImmediate === "function") {
    // In IE10, Node.js 0.9+, or https://github.com/NobleJS/setImmediate
    if (typeof window !== "undefined") {
        requestFlush = setImmediate.bind(window, flush);
    } else {
        requestFlush = function () {
            setImmediate(flush);
        };
    }

} else if (typeof MessageChannel !== "undefined") {
    // modern browsers
    // http://www.nonblocking.io/2011/06/windownexttick.html
    var channel = new MessageChannel();
    channel.port1.onmessage = flush;
    requestFlush = function () {
        channel.port2.postMessage(0);
    };

} else {
    // old browsers
    requestFlush = function () {
        setTimeout(flush, 0);
    };
}

function asap(task) {
    tail = tail.next = {
        task: task,
        domain: isNodeJS && process.domain,
        next: null
    };

    if (!flushing) {
        flushing = true;
        requestFlush();
    }
};

module.exports = asap;


}).call(this,_dereq_('_process'))
},{"_process":36}],40:[function(_dereq_,module,exports){
// Some code originally from async_storage.js in
// [Gaia](https://github.com/mozilla-b2g/gaia).
(function() {
    'use strict';

    // Originally found in https://github.com/mozilla-b2g/gaia/blob/e8f624e4cc9ea945727278039b3bc9bcb9f8667a/shared/js/async_storage.js

    // Promises!
    var Promise = (typeof module !== 'undefined' && module.exports && typeof _dereq_ !== 'undefined') ?
                  _dereq_('promise') : this.Promise;

    // Initialize IndexedDB; fall back to vendor-prefixed versions if needed.
    var indexedDB = indexedDB || this.indexedDB || this.webkitIndexedDB ||
                    this.mozIndexedDB || this.OIndexedDB ||
                    this.msIndexedDB;

    // If IndexedDB isn't available, we get outta here!
    if (!indexedDB) {
        return;
    }

    // Open the IndexedDB database (automatically creates one if one didn't
    // previously exist), using any options set in the config.
    function _initStorage(options) {
        var self = this;
        var dbInfo = {
            db: null
        };

        if (options) {
            for (var i in options) {
                dbInfo[i] = options[i];
            }
        }

        return new Promise(function(resolve, reject) {
            var openreq = indexedDB.open(dbInfo.name, dbInfo.version);
            openreq.onerror = function() {
                reject(openreq.error);
            };
            openreq.onupgradeneeded = function() {
                // First time setup: create an empty object store
                openreq.result.createObjectStore(dbInfo.storeName);
            };
            openreq.onsuccess = function() {
                dbInfo.db = openreq.result;
                self._dbInfo = dbInfo;
                resolve();
            };
        });
    }

    function getItem(key, callback) {
        var self = this;

        // Cast the key to a string, as that's all we can set as a key.
        if (typeof key !== 'string') {
            window.console.warn(key +
                                ' used as a key, but it is not a string.');
            key = String(key);
        }

        var promise = new Promise(function(resolve, reject) {
            self.ready().then(function() {
                var dbInfo = self._dbInfo;
                var store = dbInfo.db.transaction(dbInfo.storeName, 'readonly')
                    .objectStore(dbInfo.storeName);
                var req = store.get(key);

                req.onsuccess = function() {
                    var value = req.result;
                    if (value === undefined) {
                        value = null;
                    }

                    resolve(value);
                };

                req.onerror = function() {
                    reject(req.error);
                };
            })['catch'](reject);
        });

        executeCallback(promise, callback);
        return promise;
    }

    // Iterate over all items stored in database.
    function iterate(iterator, callback) {
        var self = this;

        var promise = new Promise(function(resolve, reject) {
            self.ready().then(function() {
                var dbInfo = self._dbInfo;
                var store = dbInfo.db.transaction(dbInfo.storeName, 'readonly')
                                     .objectStore(dbInfo.storeName);

                var req = store.openCursor();
                var iterationNumber = 1;

                req.onsuccess = function() {
                    var cursor = req.result;

                    if (cursor) {
                        var result = iterator(cursor.value, cursor.key, iterationNumber++);

                        if (result !== void(0)) {
                            resolve(result);
                        } else {
                            cursor['continue']();
                        }
                    } else {
                        resolve();
                    }
                };

                req.onerror = function() {
                    reject(req.error);
                };
            })['catch'](reject);
        });

        executeCallback(promise, callback);

        return promise;
    }

    function setItem(key, value, callback) {
        var self = this;

        // Cast the key to a string, as that's all we can set as a key.
        if (typeof key !== 'string') {
            window.console.warn(key +
                                ' used as a key, but it is not a string.');
            key = String(key);
        }

        var promise = new Promise(function(resolve, reject) {
            self.ready().then(function() {
                var dbInfo = self._dbInfo;
                var transaction = dbInfo.db.transaction(dbInfo.storeName, 'readwrite');
                var store = transaction.objectStore(dbInfo.storeName);

                // The reason we don't _save_ null is because IE 10 does
                // not support saving the `null` type in IndexedDB. How
                // ironic, given the bug below!
                // See: https://github.com/mozilla/localForage/issues/161
                if (value === null) {
                    value = undefined;
                }

                var req = store.put(value, key);
                transaction.oncomplete = function() {
                    // Cast to undefined so the value passed to
                    // callback/promise is the same as what one would get out
                    // of `getItem()` later. This leads to some weirdness
                    // (setItem('foo', undefined) will return `null`), but
                    // it's not my fault localStorage is our baseline and that
                    // it's weird.
                    if (value === undefined) {
                        value = null;
                    }

                    resolve(value);
                };
                transaction.onabort = transaction.onerror = function() {
                    var err = req.error ? req.error : req.transaction.error;
                    reject(err);
                };
            })['catch'](reject);
        });

        executeCallback(promise, callback);
        return promise;
    }

    function removeItem(key, callback) {
        var self = this;

        // Cast the key to a string, as that's all we can set as a key.
        if (typeof key !== 'string') {
            window.console.warn(key +
                                ' used as a key, but it is not a string.');
            key = String(key);
        }

        var promise = new Promise(function(resolve, reject) {
            self.ready().then(function() {
                var dbInfo = self._dbInfo;
                var transaction = dbInfo.db.transaction(dbInfo.storeName, 'readwrite');
                var store = transaction.objectStore(dbInfo.storeName);

                // We use a Grunt task to make this safe for IE and some
                // versions of Android (including those used by Cordova).
                // Normally IE won't like `['delete']()` and will insist on
                // using `['delete']()`, but we have a build step that
                // fixes this for us now.
                var req = store['delete'](key);
                transaction.oncomplete = function() {
                    resolve();
                };

                transaction.onerror = function() {
                    reject(req.error);
                };

                // The request will be also be aborted if we've exceeded our storage
                // space.
                transaction.onabort = function() {
                    var err = req.error ? req.error : req.transaction.error;
                    reject(err);
                };
            })['catch'](reject);
        });

        executeCallback(promise, callback);
        return promise;
    }

    function clear(callback) {
        var self = this;

        var promise = new Promise(function(resolve, reject) {
            self.ready().then(function() {
                var dbInfo = self._dbInfo;
                var transaction = dbInfo.db.transaction(dbInfo.storeName, 'readwrite');
                var store = transaction.objectStore(dbInfo.storeName);
                var req = store.clear();

                transaction.oncomplete = function() {
                    resolve();
                };

                transaction.onabort = transaction.onerror = function() {
                    var err = req.error ? req.error : req.transaction.error;
                    reject(err);
                };
            })['catch'](reject);
        });

        executeCallback(promise, callback);
        return promise;
    }

    function length(callback) {
        var self = this;

        var promise = new Promise(function(resolve, reject) {
            self.ready().then(function() {
                var dbInfo = self._dbInfo;
                var store = dbInfo.db.transaction(dbInfo.storeName, 'readonly')
                              .objectStore(dbInfo.storeName);
                var req = store.count();

                req.onsuccess = function() {
                    resolve(req.result);
                };

                req.onerror = function() {
                    reject(req.error);
                };
            })['catch'](reject);
        });

        executeCallback(promise, callback);
        return promise;
    }

    function key(n, callback) {
        var self = this;

        var promise = new Promise(function(resolve, reject) {
            if (n < 0) {
                resolve(null);

                return;
            }

            self.ready().then(function() {
                var dbInfo = self._dbInfo;
                var store = dbInfo.db.transaction(dbInfo.storeName, 'readonly')
                              .objectStore(dbInfo.storeName);

                var advanced = false;
                var req = store.openCursor();
                req.onsuccess = function() {
                    var cursor = req.result;
                    if (!cursor) {
                        // this means there weren't enough keys
                        resolve(null);

                        return;
                    }

                    if (n === 0) {
                        // We have the first key, return it if that's what they
                        // wanted.
                        resolve(cursor.key);
                    } else {
                        if (!advanced) {
                            // Otherwise, ask the cursor to skip ahead n
                            // records.
                            advanced = true;
                            cursor.advance(n);
                        } else {
                            // When we get here, we've got the nth key.
                            resolve(cursor.key);
                        }
                    }
                };

                req.onerror = function() {
                    reject(req.error);
                };
            })['catch'](reject);
        });

        executeCallback(promise, callback);
        return promise;
    }

    function keys(callback) {
        var self = this;

        var promise = new Promise(function(resolve, reject) {
            self.ready().then(function() {
                var dbInfo = self._dbInfo;
                var store = dbInfo.db.transaction(dbInfo.storeName, 'readonly')
                              .objectStore(dbInfo.storeName);

                var req = store.openCursor();
                var keys = [];

                req.onsuccess = function() {
                    var cursor = req.result;

                    if (!cursor) {
                        resolve(keys);
                        return;
                    }

                    keys.push(cursor.key);
                    cursor['continue']();
                };

                req.onerror = function() {
                    reject(req.error);
                };
            })['catch'](reject);
        });

        executeCallback(promise, callback);
        return promise;
    }

    function executeCallback(promise, callback) {
        if (callback) {
            promise.then(function(result) {
                callback(null, result);
            }, function(error) {
                callback(error);
            });
        }
    }

    var asyncStorage = {
        _driver: 'asyncStorage',
        _initStorage: _initStorage,
        iterate: iterate,
        getItem: getItem,
        setItem: setItem,
        removeItem: removeItem,
        clear: clear,
        length: length,
        key: key,
        keys: keys
    };

    if (typeof module !== 'undefined' && module.exports && typeof _dereq_ !== 'undefined') {
        module.exports = asyncStorage;
    } else if (typeof define === 'function' && define.amd) {
        define('asyncStorage', function() {
            return asyncStorage;
        });
    } else {
        this.asyncStorage = asyncStorage;
    }
}).call(window);

},{"promise":38}],41:[function(_dereq_,module,exports){
// If IndexedDB isn't available, we'll fall back to localStorage.
// Note that this will have considerable performance and storage
// side-effects (all data will be serialized on save and only data that
// can be converted to a string via `JSON.stringify()` will be saved).
(function() {
    'use strict';

    // Promises!
    var Promise = (typeof module !== 'undefined' && module.exports && typeof _dereq_ !== 'undefined') ?
                  _dereq_('promise') : this.Promise;

    var globalObject = this;
    var serializer = null;
    var localStorage = null;

    // If the app is running inside a Google Chrome packaged webapp, or some
    // other context where localStorage isn't available, we don't use
    // localStorage. This feature detection is preferred over the old
    // `if (window.chrome && window.chrome.runtime)` code.
    // See: https://github.com/mozilla/localForage/issues/68
    try {
        // If localStorage isn't available, we get outta here!
        // This should be inside a try catch
        if (!this.localStorage || !('setItem' in this.localStorage)) {
            return;
        }
        // Initialize localStorage and create a variable to use throughout
        // the code.
        localStorage = this.localStorage;
    } catch (e) {
        return;
    }

    var ModuleType = {
        DEFINE: 1,
        EXPORT: 2,
        WINDOW: 3
    };

    // Attaching to window (i.e. no module loader) is the assumed,
    // simple default.
    var moduleType = ModuleType.WINDOW;

    // Find out what kind of module setup we have; if none, we'll just attach
    // localForage to the main window.
    if (typeof module !== 'undefined' && module.exports && typeof _dereq_ !== 'undefined') {
        moduleType = ModuleType.EXPORT;
    } else if (typeof define === 'function' && define.amd) {
        moduleType = ModuleType.DEFINE;
    }

    // Config the localStorage backend, using options set in the config.
    function _initStorage(options) {
        var self = this;
        var dbInfo = {};
        if (options) {
            for (var i in options) {
                dbInfo[i] = options[i];
            }
        }

        dbInfo.keyPrefix = dbInfo.name + '/';

        self._dbInfo = dbInfo;

        var serializerPromise = new Promise(function(resolve/*, reject*/) {
            // We allow localForage to be declared as a module or as a
            // library available without AMD/require.js.
            if (moduleType === ModuleType.DEFINE) {
                _dereq_(['localforageSerializer'], resolve);
            } else if (moduleType === ModuleType.EXPORT) {
                // Making it browserify friendly
                resolve(_dereq_('./../utils/serializer'));
            } else {
                resolve(globalObject.localforageSerializer);
            }
        });

        return serializerPromise.then(function(lib) {
            serializer = lib;
            return Promise.resolve();
        });
    }

    // Remove all keys from the datastore, effectively destroying all data in
    // the app's key/value store!
    function clear(callback) {
        var self = this;
        var promise = self.ready().then(function() {
            var keyPrefix = self._dbInfo.keyPrefix;

            for (var i = localStorage.length - 1; i >= 0; i--) {
                var key = localStorage.key(i);

                if (key.indexOf(keyPrefix) === 0) {
                    localStorage.removeItem(key);
                }
            }
        });

        executeCallback(promise, callback);
        return promise;
    }

    // Retrieve an item from the store. Unlike the original async_storage
    // library in Gaia, we don't modify return values at all. If a key's value
    // is `undefined`, we pass that value to the callback function.
    function getItem(key, callback) {
        var self = this;

        // Cast the key to a string, as that's all we can set as a key.
        if (typeof key !== 'string') {
            window.console.warn(key +
                                ' used as a key, but it is not a string.');
            key = String(key);
        }

        var promise = self.ready().then(function() {
            var dbInfo = self._dbInfo;
            var result = localStorage.getItem(dbInfo.keyPrefix + key);

            // If a result was found, parse it from the serialized
            // string into a JS object. If result isn't truthy, the key
            // is likely undefined and we'll pass it straight to the
            // callback.
            if (result) {
                result = serializer.deserialize(result);
            }

            return result;
        });

        executeCallback(promise, callback);
        return promise;
    }

    // Iterate over all items in the store.
    function iterate(iterator, callback) {
        var self = this;

        var promise = self.ready().then(function() {
            var keyPrefix = self._dbInfo.keyPrefix;
            var keyPrefixLength = keyPrefix.length;
            var length = localStorage.length;

            for (var i = 0; i < length; i++) {
                var key = localStorage.key(i);
                var value = localStorage.getItem(key);

                // If a result was found, parse it from the serialized
                // string into a JS object. If result isn't truthy, the
                // key is likely undefined and we'll pass it straight
                // to the iterator.
                if (value) {
                    value = serializer.deserialize(value);
                }

                value = iterator(value, key.substring(keyPrefixLength), i + 1);

                if (value !== void(0)) {
                    return value;
                }
            }
        });

        executeCallback(promise, callback);
        return promise;
    }

    // Same as localStorage's key() method, except takes a callback.
    function key(n, callback) {
        var self = this;
        var promise = self.ready().then(function() {
            var dbInfo = self._dbInfo;
            var result;
            try {
                result = localStorage.key(n);
            } catch (error) {
                result = null;
            }

            // Remove the prefix from the key, if a key is found.
            if (result) {
                result = result.substring(dbInfo.keyPrefix.length);
            }

            return result;
        });

        executeCallback(promise, callback);
        return promise;
    }

    function keys(callback) {
        var self = this;
        var promise = self.ready().then(function() {
            var dbInfo = self._dbInfo;
            var length = localStorage.length;
            var keys = [];

            for (var i = 0; i < length; i++) {
                if (localStorage.key(i).indexOf(dbInfo.keyPrefix) === 0) {
                    keys.push(localStorage.key(i).substring(dbInfo.keyPrefix.length));
                }
            }

            return keys;
        });

        executeCallback(promise, callback);
        return promise;
    }

    // Supply the number of keys in the datastore to the callback function.
    function length(callback) {
        var self = this;
        var promise = self.keys().then(function(keys) {
            return keys.length;
        });

        executeCallback(promise, callback);
        return promise;
    }

    // Remove an item from the store, nice and simple.
    function removeItem(key, callback) {
        var self = this;

        // Cast the key to a string, as that's all we can set as a key.
        if (typeof key !== 'string') {
            window.console.warn(key +
                                ' used as a key, but it is not a string.');
            key = String(key);
        }

        var promise = self.ready().then(function() {
            var dbInfo = self._dbInfo;
            localStorage.removeItem(dbInfo.keyPrefix + key);
        });

        executeCallback(promise, callback);
        return promise;
    }

    // Set a key's value and run an optional callback once the value is set.
    // Unlike Gaia's implementation, the callback function is passed the value,
    // in case you want to operate on that value only after you're sure it
    // saved, or something like that.
    function setItem(key, value, callback) {
        var self = this;

        // Cast the key to a string, as that's all we can set as a key.
        if (typeof key !== 'string') {
            window.console.warn(key +
                                ' used as a key, but it is not a string.');
            key = String(key);
        }

        var promise = self.ready().then(function() {
            // Convert undefined values to null.
            // https://github.com/mozilla/localForage/pull/42
            if (value === undefined) {
                value = null;
            }

            // Save the original value to pass to the callback.
            var originalValue = value;

            return new Promise(function(resolve, reject) {
                serializer.serialize(value, function(value, error) {
                    if (error) {
                        reject(error);
                    } else {
                        try {
                            var dbInfo = self._dbInfo;
                            localStorage.setItem(dbInfo.keyPrefix + key, value);
                            resolve(originalValue);
                        } catch (e) {
                            // localStorage capacity exceeded.
                            // TODO: Make this a specific error/event.
                            if (e.name === 'QuotaExceededError' ||
                                e.name === 'NS_ERROR_DOM_QUOTA_REACHED') {
                                reject(e);
                            }
                            reject(e);
                        }
                    }
                });
            });
        });

        executeCallback(promise, callback);
        return promise;
    }

    function executeCallback(promise, callback) {
        if (callback) {
            promise.then(function(result) {
                callback(null, result);
            }, function(error) {
                callback(error);
            });
        }
    }

    var localStorageWrapper = {
        _driver: 'localStorageWrapper',
        _initStorage: _initStorage,
        // Default API, from Gaia/localStorage.
        iterate: iterate,
        getItem: getItem,
        setItem: setItem,
        removeItem: removeItem,
        clear: clear,
        length: length,
        key: key,
        keys: keys
    };

    if (moduleType === ModuleType.EXPORT) {
        module.exports = localStorageWrapper;
    } else if (moduleType === ModuleType.DEFINE) {
        define('localStorageWrapper', function() {
            return localStorageWrapper;
        });
    } else {
        this.localStorageWrapper = localStorageWrapper;
    }
}).call(window);

},{"./../utils/serializer":44,"promise":38}],42:[function(_dereq_,module,exports){
/*
 * Includes code from:
 *
 * base64-arraybuffer
 * https://github.com/niklasvh/base64-arraybuffer
 *
 * Copyright (c) 2012 Niklas von Hertzen
 * Licensed under the MIT license.
 */
(function() {
    'use strict';

    // Promises!
    var Promise = (typeof module !== 'undefined' && module.exports && typeof _dereq_ !== 'undefined') ?
                  _dereq_('promise') : this.Promise;

    var globalObject = this;
    var serializer = null;
    var openDatabase = this.openDatabase;

    // If WebSQL methods aren't available, we can stop now.
    if (!openDatabase) {
        return;
    }

    var ModuleType = {
        DEFINE: 1,
        EXPORT: 2,
        WINDOW: 3
    };

    // Attaching to window (i.e. no module loader) is the assumed,
    // simple default.
    var moduleType = ModuleType.WINDOW;

    // Find out what kind of module setup we have; if none, we'll just attach
    // localForage to the main window.
    if (typeof module !== 'undefined' && module.exports && typeof _dereq_ !== 'undefined') {
        moduleType = ModuleType.EXPORT;
    } else if (typeof define === 'function' && define.amd) {
        moduleType = ModuleType.DEFINE;
    }

    // Open the WebSQL database (automatically creates one if one didn't
    // previously exist), using any options set in the config.
    function _initStorage(options) {
        var self = this;
        var dbInfo = {
            db: null
        };

        if (options) {
            for (var i in options) {
                dbInfo[i] = typeof(options[i]) !== 'string' ?
                            options[i].toString() : options[i];
            }
        }

        var serializerPromise = new Promise(function(resolve/*, reject*/) {
            // We allow localForage to be declared as a module or as a
            // library available without AMD/require.js.
            if (moduleType === ModuleType.DEFINE) {
                _dereq_(['localforageSerializer'], resolve);
            } else if (moduleType === ModuleType.EXPORT) {
                // Making it browserify friendly
                resolve(_dereq_('./../utils/serializer'));
            } else {
                resolve(globalObject.localforageSerializer);
            }
        });

        var dbInfoPromise = new Promise(function(resolve, reject) {
            // Open the database; the openDatabase API will automatically
            // create it for us if it doesn't exist.
            try {
                dbInfo.db = openDatabase(dbInfo.name, String(dbInfo.version),
                                         dbInfo.description, dbInfo.size);
            } catch (e) {
                return self.setDriver(self.LOCALSTORAGE).then(function() {
                    return self._initStorage(options);
                }).then(resolve)['catch'](reject);
            }

            // Create our key/value table if it doesn't exist.
            dbInfo.db.transaction(function(t) {
                t.executeSql('CREATE TABLE IF NOT EXISTS ' + dbInfo.storeName +
                             ' (id INTEGER PRIMARY KEY, key unique, value)', [],
                             function() {
                    self._dbInfo = dbInfo;
                    resolve();
                }, function(t, error) {
                    reject(error);
                });
            });
        });

        return serializerPromise.then(function(lib) {
            serializer = lib;
            return dbInfoPromise;
        });
    }

    function getItem(key, callback) {
        var self = this;

        // Cast the key to a string, as that's all we can set as a key.
        if (typeof key !== 'string') {
            window.console.warn(key +
                                ' used as a key, but it is not a string.');
            key = String(key);
        }

        var promise = new Promise(function(resolve, reject) {
            self.ready().then(function() {
                var dbInfo = self._dbInfo;
                dbInfo.db.transaction(function(t) {
                    t.executeSql('SELECT * FROM ' + dbInfo.storeName +
                                 ' WHERE key = ? LIMIT 1', [key],
                                 function(t, results) {
                        var result = results.rows.length ?
                                     results.rows.item(0).value : null;

                        // Check to see if this is serialized content we need to
                        // unpack.
                        if (result) {
                            result = serializer.deserialize(result);
                        }

                        resolve(result);
                    }, function(t, error) {

                        reject(error);
                    });
                });
            })['catch'](reject);
        });

        executeCallback(promise, callback);
        return promise;
    }

    function iterate(iterator, callback) {
        var self = this;

        var promise = new Promise(function(resolve, reject) {
            self.ready().then(function() {
                var dbInfo = self._dbInfo;

                dbInfo.db.transaction(function(t) {
                    t.executeSql('SELECT * FROM ' + dbInfo.storeName, [],
                        function(t, results) {
                            var rows = results.rows;
                            var length = rows.length;

                            for (var i = 0; i < length; i++) {
                                var item = rows.item(i);
                                var result = item.value;

                                // Check to see if this is serialized content
                                // we need to unpack.
                                if (result) {
                                    result = serializer.deserialize(result);
                                }

                                result = iterator(result, item.key, i + 1);

                                // void(0) prevents problems with redefinition
                                // of `undefined`.
                                if (result !== void(0)) {
                                    resolve(result);
                                    return;
                                }
                            }

                            resolve();
                        }, function(t, error) {
                            reject(error);
                        });
                });
            })['catch'](reject);
        });

        executeCallback(promise, callback);
        return promise;
    }

    function setItem(key, value, callback) {
        var self = this;

        // Cast the key to a string, as that's all we can set as a key.
        if (typeof key !== 'string') {
            window.console.warn(key +
                                ' used as a key, but it is not a string.');
            key = String(key);
        }

        var promise = new Promise(function(resolve, reject) {
            self.ready().then(function() {
                // The localStorage API doesn't return undefined values in an
                // "expected" way, so undefined is always cast to null in all
                // drivers. See: https://github.com/mozilla/localForage/pull/42
                if (value === undefined) {
                    value = null;
                }

                // Save the original value to pass to the callback.
                var originalValue = value;

                serializer.serialize(value, function(value, error) {
                    if (error) {
                        reject(error);
                    } else {
                        var dbInfo = self._dbInfo;
                        dbInfo.db.transaction(function(t) {
                            t.executeSql('INSERT OR REPLACE INTO ' +
                                         dbInfo.storeName +
                                         ' (key, value) VALUES (?, ?)',
                                         [key, value], function() {
                                resolve(originalValue);
                            }, function(t, error) {
                                reject(error);
                            });
                        }, function(sqlError) {
                            // The transaction failed; check
                            // to see if it's a quota error.
                            if (sqlError.code === sqlError.QUOTA_ERR) {
                                // We reject the callback outright for now, but
                                // it's worth trying to re-run the transaction.
                                // Even if the user accepts the prompt to use
                                // more storage on Safari, this error will
                                // be called.
                                //
                                // TODO: Try to re-run the transaction.
                                reject(sqlError);
                            }
                        });
                    }
                });
            })['catch'](reject);
        });

        executeCallback(promise, callback);
        return promise;
    }

    function removeItem(key, callback) {
        var self = this;

        // Cast the key to a string, as that's all we can set as a key.
        if (typeof key !== 'string') {
            window.console.warn(key +
                                ' used as a key, but it is not a string.');
            key = String(key);
        }

        var promise = new Promise(function(resolve, reject) {
            self.ready().then(function() {
                var dbInfo = self._dbInfo;
                dbInfo.db.transaction(function(t) {
                    t.executeSql('DELETE FROM ' + dbInfo.storeName +
                                 ' WHERE key = ?', [key],
                                 function() {
                        resolve();
                    }, function(t, error) {

                        reject(error);
                    });
                });
            })['catch'](reject);
        });

        executeCallback(promise, callback);
        return promise;
    }

    // Deletes every item in the table.
    // TODO: Find out if this resets the AUTO_INCREMENT number.
    function clear(callback) {
        var self = this;

        var promise = new Promise(function(resolve, reject) {
            self.ready().then(function() {
                var dbInfo = self._dbInfo;
                dbInfo.db.transaction(function(t) {
                    t.executeSql('DELETE FROM ' + dbInfo.storeName, [],
                                 function() {
                        resolve();
                    }, function(t, error) {
                        reject(error);
                    });
                });
            })['catch'](reject);
        });

        executeCallback(promise, callback);
        return promise;
    }

    // Does a simple `COUNT(key)` to get the number of items stored in
    // localForage.
    function length(callback) {
        var self = this;

        var promise = new Promise(function(resolve, reject) {
            self.ready().then(function() {
                var dbInfo = self._dbInfo;
                dbInfo.db.transaction(function(t) {
                    // Ahhh, SQL makes this one soooooo easy.
                    t.executeSql('SELECT COUNT(key) as c FROM ' +
                                 dbInfo.storeName, [], function(t, results) {
                        var result = results.rows.item(0).c;

                        resolve(result);
                    }, function(t, error) {

                        reject(error);
                    });
                });
            })['catch'](reject);
        });

        executeCallback(promise, callback);
        return promise;
    }

    // Return the key located at key index X; essentially gets the key from a
    // `WHERE id = ?`. This is the most efficient way I can think to implement
    // this rarely-used (in my experience) part of the API, but it can seem
    // inconsistent, because we do `INSERT OR REPLACE INTO` on `setItem()`, so
    // the ID of each key will change every time it's updated. Perhaps a stored
    // procedure for the `setItem()` SQL would solve this problem?
    // TODO: Don't change ID on `setItem()`.
    function key(n, callback) {
        var self = this;

        var promise = new Promise(function(resolve, reject) {
            self.ready().then(function() {
                var dbInfo = self._dbInfo;
                dbInfo.db.transaction(function(t) {
                    t.executeSql('SELECT key FROM ' + dbInfo.storeName +
                                 ' WHERE id = ? LIMIT 1', [n + 1],
                                 function(t, results) {
                        var result = results.rows.length ?
                                     results.rows.item(0).key : null;
                        resolve(result);
                    }, function(t, error) {
                        reject(error);
                    });
                });
            })['catch'](reject);
        });

        executeCallback(promise, callback);
        return promise;
    }

    function keys(callback) {
        var self = this;

        var promise = new Promise(function(resolve, reject) {
            self.ready().then(function() {
                var dbInfo = self._dbInfo;
                dbInfo.db.transaction(function(t) {
                    t.executeSql('SELECT key FROM ' + dbInfo.storeName, [],
                                 function(t, results) {
                        var keys = [];

                        for (var i = 0; i < results.rows.length; i++) {
                            keys.push(results.rows.item(i).key);
                        }

                        resolve(keys);
                    }, function(t, error) {

                        reject(error);
                    });
                });
            })['catch'](reject);
        });

        executeCallback(promise, callback);
        return promise;
    }

    function executeCallback(promise, callback) {
        if (callback) {
            promise.then(function(result) {
                callback(null, result);
            }, function(error) {
                callback(error);
            });
        }
    }

    var webSQLStorage = {
        _driver: 'webSQLStorage',
        _initStorage: _initStorage,
        iterate: iterate,
        getItem: getItem,
        setItem: setItem,
        removeItem: removeItem,
        clear: clear,
        length: length,
        key: key,
        keys: keys
    };

    if (moduleType === ModuleType.DEFINE) {
        define('webSQLStorage', function() {
            return webSQLStorage;
        });
    } else if (moduleType === ModuleType.EXPORT) {
        module.exports = webSQLStorage;
    } else {
        this.webSQLStorage = webSQLStorage;
    }
}).call(window);

},{"./../utils/serializer":44,"promise":38}],43:[function(_dereq_,module,exports){
(function() {
    'use strict';

    // Promises!
    var Promise = (typeof module !== 'undefined' && module.exports && typeof _dereq_ !== 'undefined') ?
                  _dereq_('promise') : this.Promise;

    // Custom drivers are stored here when `defineDriver()` is called.
    // They are shared across all instances of localForage.
    var CustomDrivers = {};

    var DriverType = {
        INDEXEDDB: 'asyncStorage',
        LOCALSTORAGE: 'localStorageWrapper',
        WEBSQL: 'webSQLStorage'
    };

    var DefaultDriverOrder = [
        DriverType.INDEXEDDB,
        DriverType.WEBSQL,
        DriverType.LOCALSTORAGE
    ];

    var LibraryMethods = [
        'clear',
        'getItem',
        'iterate',
        'key',
        'keys',
        'length',
        'removeItem',
        'setItem'
    ];

    var ModuleType = {
        DEFINE: 1,
        EXPORT: 2,
        WINDOW: 3
    };

    var DefaultConfig = {
        description: '',
        driver: DefaultDriverOrder.slice(),
        name: 'localforage',
        // Default DB size is _JUST UNDER_ 5MB, as it's the highest size
        // we can use without a prompt.
        size: 4980736,
        storeName: 'keyvaluepairs',
        version: 1.0
    };

    // Attaching to window (i.e. no module loader) is the assumed,
    // simple default.
    var moduleType = ModuleType.WINDOW;

    // Find out what kind of module setup we have; if none, we'll just attach
    // localForage to the main window.
    if (typeof module !== 'undefined' && module.exports && typeof _dereq_ !== 'undefined') {
        moduleType = ModuleType.EXPORT;
    } else if (typeof define === 'function' && define.amd) {
        moduleType = ModuleType.DEFINE;
    }

    // Check to see if IndexedDB is available and if it is the latest
    // implementation; it's our preferred backend library. We use "_spec_test"
    // as the name of the database because it's not the one we'll operate on,
    // but it's useful to make sure its using the right spec.
    // See: https://github.com/mozilla/localForage/issues/128
    var driverSupport = (function(self) {
        // Initialize IndexedDB; fall back to vendor-prefixed versions
        // if needed.
        var indexedDB = indexedDB || self.indexedDB || self.webkitIndexedDB ||
                        self.mozIndexedDB || self.OIndexedDB ||
                        self.msIndexedDB;

        var result = {};

        result[DriverType.WEBSQL] = !!self.openDatabase;
        result[DriverType.INDEXEDDB] = !!(function() {
            // We mimic PouchDB here; just UA test for Safari (which, as of
            // iOS 8/Yosemite, doesn't properly support IndexedDB).
            // IndexedDB support is broken and different from Blink's.
            // This is faster than the test case (and it's sync), so we just
            // do this. *SIGH*
            // http://bl.ocks.org/nolanlawson/raw/c83e9039edf2278047e9/
            //
            // We test for openDatabase because IE Mobile identifies itself
            // as Safari. Oh the lulz...
            if (typeof self.openDatabase !== 'undefined' && self.navigator &&
                self.navigator.userAgent &&
                /Safari/.test(self.navigator.userAgent) &&
                !/Chrome/.test(self.navigator.userAgent)) {
                return false;
            }
            try {
                return indexedDB &&
                       typeof indexedDB.open === 'function' &&
                       // Some Samsung/HTC Android 4.0-4.3 devices
                       // have older IndexedDB specs; if this isn't available
                       // their IndexedDB is too old for us to use.
                       // (Replaces the onupgradeneeded test.)
                       typeof self.IDBKeyRange !== 'undefined';
            } catch (e) {
                return false;
            }
        })();

        result[DriverType.LOCALSTORAGE] = !!(function() {
            try {
                return (self.localStorage &&
                        ('setItem' in self.localStorage) &&
                        (self.localStorage.setItem));
            } catch (e) {
                return false;
            }
        })();

        return result;
    })(this);

    var isArray = Array.isArray || function(arg) {
        return Object.prototype.toString.call(arg) === '[object Array]';
    };

    function callWhenReady(localForageInstance, libraryMethod) {
        localForageInstance[libraryMethod] = function() {
            var _args = arguments;
            return localForageInstance.ready().then(function() {
                return localForageInstance[libraryMethod].apply(localForageInstance, _args);
            });
        };
    }

    function extend() {
        for (var i = 1; i < arguments.length; i++) {
            var arg = arguments[i];

            if (arg) {
                for (var key in arg) {
                    if (arg.hasOwnProperty(key)) {
                        if (isArray(arg[key])) {
                            arguments[0][key] = arg[key].slice();
                        } else {
                            arguments[0][key] = arg[key];
                        }
                    }
                }
            }
        }

        return arguments[0];
    }

    function isLibraryDriver(driverName) {
        for (var driver in DriverType) {
            if (DriverType.hasOwnProperty(driver) &&
                DriverType[driver] === driverName) {
                return true;
            }
        }

        return false;
    }

    var globalObject = this;

    function LocalForage(options) {
        this._config = extend({}, DefaultConfig, options);
        this._driverSet = null;
        this._ready = false;
        this._dbInfo = null;

        // Add a stub for each driver API method that delays the call to the
        // corresponding driver method until localForage is ready. These stubs
        // will be replaced by the driver methods as soon as the driver is
        // loaded, so there is no performance impact.
        for (var i = 0; i < LibraryMethods.length; i++) {
            callWhenReady(this, LibraryMethods[i]);
        }

        this.setDriver(this._config.driver);
    }

    LocalForage.prototype.INDEXEDDB = DriverType.INDEXEDDB;
    LocalForage.prototype.LOCALSTORAGE = DriverType.LOCALSTORAGE;
    LocalForage.prototype.WEBSQL = DriverType.WEBSQL;

    // Set any config values for localForage; can be called anytime before
    // the first API call (e.g. `getItem`, `setItem`).
    // We loop through options so we don't overwrite existing config
    // values.
    LocalForage.prototype.config = function(options) {
        // If the options argument is an object, we use it to set values.
        // Otherwise, we return either a specified config value or all
        // config values.
        if (typeof(options) === 'object') {
            // If localforage is ready and fully initialized, we can't set
            // any new configuration values. Instead, we return an error.
            if (this._ready) {
                return new Error("Can't call config() after localforage " +
                                 'has been used.');
            }

            for (var i in options) {
                if (i === 'storeName') {
                    options[i] = options[i].replace(/\W/g, '_');
                }

                this._config[i] = options[i];
            }

            // after all config options are set and
            // the driver option is used, try setting it
            if ('driver' in options && options.driver) {
                this.setDriver(this._config.driver);
            }

            return true;
        } else if (typeof(options) === 'string') {
            return this._config[options];
        } else {
            return this._config;
        }
    };

    // Used to define a custom driver, shared across all instances of
    // localForage.
    LocalForage.prototype.defineDriver = function(driverObject, callback,
                                                  errorCallback) {
        var defineDriver = new Promise(function(resolve, reject) {
            try {
                var driverName = driverObject._driver;
                var complianceError = new Error(
                    'Custom driver not compliant; see ' +
                    'https://mozilla.github.io/localForage/#definedriver'
                );
                var namingError = new Error(
                    'Custom driver name already in use: ' + driverObject._driver
                );

                // A driver name should be defined and not overlap with the
                // library-defined, default drivers.
                if (!driverObject._driver) {
                    reject(complianceError);
                    return;
                }
                if (isLibraryDriver(driverObject._driver)) {
                    reject(namingError);
                    return;
                }

                var customDriverMethods = LibraryMethods.concat('_initStorage');
                for (var i = 0; i < customDriverMethods.length; i++) {
                    var customDriverMethod = customDriverMethods[i];
                    if (!customDriverMethod ||
                        !driverObject[customDriverMethod] ||
                        typeof driverObject[customDriverMethod] !== 'function') {
                        reject(complianceError);
                        return;
                    }
                }

                var supportPromise = Promise.resolve(true);
                if ('_support'  in driverObject) {
                    if (driverObject._support && typeof driverObject._support === 'function') {
                        supportPromise = driverObject._support();
                    } else {
                        supportPromise = Promise.resolve(!!driverObject._support);
                    }
                }

                supportPromise.then(function(supportResult) {
                    driverSupport[driverName] = supportResult;
                    CustomDrivers[driverName] = driverObject;
                    resolve();
                }, reject);
            } catch (e) {
                reject(e);
            }
        });

        defineDriver.then(callback, errorCallback);
        return defineDriver;
    };

    LocalForage.prototype.driver = function() {
        return this._driver || null;
    };

    LocalForage.prototype.ready = function(callback) {
        var self = this;

        var ready = new Promise(function(resolve, reject) {
            self._driverSet.then(function() {
                if (self._ready === null) {
                    self._ready = self._initStorage(self._config);
                }

                self._ready.then(resolve, reject);
            })['catch'](reject);
        });

        ready.then(callback, callback);
        return ready;
    };

    LocalForage.prototype.setDriver = function(drivers, callback,
                                               errorCallback) {
        var self = this;

        if (typeof drivers === 'string') {
            drivers = [drivers];
        }

        this._driverSet = new Promise(function(resolve, reject) {
            var driverName = self._getFirstSupportedDriver(drivers);
            var error = new Error('No available storage method found.');

            if (!driverName) {
                self._driverSet = Promise.reject(error);
                reject(error);
                return;
            }

            self._dbInfo = null;
            self._ready = null;

            if (isLibraryDriver(driverName)) {
                var driverPromise = new Promise(function(resolve/*, reject*/) {
                    // We allow localForage to be declared as a module or as a
                    // library available without AMD/require.js.
                    if (moduleType === ModuleType.DEFINE) {
                        _dereq_([driverName], resolve);
                    } else if (moduleType === ModuleType.EXPORT) {
                        // Making it browserify friendly
                        switch (driverName) {
                            case self.INDEXEDDB:
                                resolve(_dereq_('./drivers/indexeddb'));
                                break;
                            case self.LOCALSTORAGE:
                                resolve(_dereq_('./drivers/localstorage'));
                                break;
                            case self.WEBSQL:
                                resolve(_dereq_('./drivers/websql'));
                                break;
                        }
                    } else {
                        resolve(globalObject[driverName]);
                    }
                });
                driverPromise.then(function(driver) {
                    self._extend(driver);
                    resolve();
                });
            } else if (CustomDrivers[driverName]) {
                self._extend(CustomDrivers[driverName]);
                resolve();
            } else {
                self._driverSet = Promise.reject(error);
                reject(error);
            }
        });

        function setDriverToConfig() {
            self._config.driver = self.driver();
        }
        this._driverSet.then(setDriverToConfig, setDriverToConfig);

        this._driverSet.then(callback, errorCallback);
        return this._driverSet;
    };

    LocalForage.prototype.supports = function(driverName) {
        return !!driverSupport[driverName];
    };

    LocalForage.prototype._extend = function(libraryMethodsAndProperties) {
        extend(this, libraryMethodsAndProperties);
    };

    // Used to determine which driver we should use as the backend for this
    // instance of localForage.
    LocalForage.prototype._getFirstSupportedDriver = function(drivers) {
        if (drivers && isArray(drivers)) {
            for (var i = 0; i < drivers.length; i++) {
                var driver = drivers[i];

                if (this.supports(driver)) {
                    return driver;
                }
            }
        }

        return null;
    };

    LocalForage.prototype.createInstance = function(options) {
        return new LocalForage(options);
    };

    // The actual localForage object that we expose as a module or via a
    // global. It's extended by pulling in one of our other libraries.
    var localForage = new LocalForage();

    // We allow localForage to be declared as a module or as a library
    // available without AMD/require.js.
    if (moduleType === ModuleType.DEFINE) {
        define('localforage', function() {
            return localForage;
        });
    } else if (moduleType === ModuleType.EXPORT) {
        module.exports = localForage;
    } else {
        this.localforage = localForage;
    }
}).call(window);

},{"./drivers/indexeddb":40,"./drivers/localstorage":41,"./drivers/websql":42,"promise":38}],44:[function(_dereq_,module,exports){
(function() {
    'use strict';

    // Sadly, the best way to save binary data in WebSQL/localStorage is serializing
    // it to Base64, so this is how we store it to prevent very strange errors with less
    // verbose ways of binary <-> string data storage.
    var BASE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

    var SERIALIZED_MARKER = '__lfsc__:';
    var SERIALIZED_MARKER_LENGTH = SERIALIZED_MARKER.length;

    // OMG the serializations!
    var TYPE_ARRAYBUFFER = 'arbf';
    var TYPE_BLOB = 'blob';
    var TYPE_INT8ARRAY = 'si08';
    var TYPE_UINT8ARRAY = 'ui08';
    var TYPE_UINT8CLAMPEDARRAY = 'uic8';
    var TYPE_INT16ARRAY = 'si16';
    var TYPE_INT32ARRAY = 'si32';
    var TYPE_UINT16ARRAY = 'ur16';
    var TYPE_UINT32ARRAY = 'ui32';
    var TYPE_FLOAT32ARRAY = 'fl32';
    var TYPE_FLOAT64ARRAY = 'fl64';
    var TYPE_SERIALIZED_MARKER_LENGTH = SERIALIZED_MARKER_LENGTH +
                                        TYPE_ARRAYBUFFER.length;

    // Serialize a value, afterwards executing a callback (which usually
    // instructs the `setItem()` callback/promise to be executed). This is how
    // we store binary data with localStorage.
    function serialize(value, callback) {
        var valueString = '';
        if (value) {
            valueString = value.toString();
        }

        // Cannot use `value instanceof ArrayBuffer` or such here, as these
        // checks fail when running the tests using casper.js...
        //
        // TODO: See why those tests fail and use a better solution.
        if (value && (value.toString() === '[object ArrayBuffer]' ||
                      value.buffer &&
                      value.buffer.toString() === '[object ArrayBuffer]')) {
            // Convert binary arrays to a string and prefix the string with
            // a special marker.
            var buffer;
            var marker = SERIALIZED_MARKER;

            if (value instanceof ArrayBuffer) {
                buffer = value;
                marker += TYPE_ARRAYBUFFER;
            } else {
                buffer = value.buffer;

                if (valueString === '[object Int8Array]') {
                    marker += TYPE_INT8ARRAY;
                } else if (valueString === '[object Uint8Array]') {
                    marker += TYPE_UINT8ARRAY;
                } else if (valueString === '[object Uint8ClampedArray]') {
                    marker += TYPE_UINT8CLAMPEDARRAY;
                } else if (valueString === '[object Int16Array]') {
                    marker += TYPE_INT16ARRAY;
                } else if (valueString === '[object Uint16Array]') {
                    marker += TYPE_UINT16ARRAY;
                } else if (valueString === '[object Int32Array]') {
                    marker += TYPE_INT32ARRAY;
                } else if (valueString === '[object Uint32Array]') {
                    marker += TYPE_UINT32ARRAY;
                } else if (valueString === '[object Float32Array]') {
                    marker += TYPE_FLOAT32ARRAY;
                } else if (valueString === '[object Float64Array]') {
                    marker += TYPE_FLOAT64ARRAY;
                } else {
                    callback(new Error('Failed to get type for BinaryArray'));
                }
            }

            callback(marker + bufferToString(buffer));
        } else if (valueString === '[object Blob]') {
            // Conver the blob to a binaryArray and then to a string.
            var fileReader = new FileReader();

            fileReader.onload = function() {
                var str = bufferToString(this.result);

                callback(SERIALIZED_MARKER + TYPE_BLOB + str);
            };

            fileReader.readAsArrayBuffer(value);
        } else {
            try {
                callback(JSON.stringify(value));
            } catch (e) {
                window.console.error("Couldn't convert value into a JSON " +
                                     'string: ', value);

                callback(null, e);
            }
        }
    }

    // Deserialize data we've inserted into a value column/field. We place
    // special markers into our strings to mark them as encoded; this isn't
    // as nice as a meta field, but it's the only sane thing we can do whilst
    // keeping localStorage support intact.
    //
    // Oftentimes this will just deserialize JSON content, but if we have a
    // special marker (SERIALIZED_MARKER, defined above), we will extract
    // some kind of arraybuffer/binary data/typed array out of the string.
    function deserialize(value) {
        // If we haven't marked this string as being specially serialized (i.e.
        // something other than serialized JSON), we can just return it and be
        // done with it.
        if (value.substring(0,
            SERIALIZED_MARKER_LENGTH) !== SERIALIZED_MARKER) {
            return JSON.parse(value);
        }

        // The following code deals with deserializing some kind of Blob or
        // TypedArray. First we separate out the type of data we're dealing
        // with from the data itself.
        var serializedString = value.substring(TYPE_SERIALIZED_MARKER_LENGTH);
        var type = value.substring(SERIALIZED_MARKER_LENGTH,
                                   TYPE_SERIALIZED_MARKER_LENGTH);

        var buffer = stringToBuffer(serializedString);

        // Return the right type based on the code/type set during
        // serialization.
        switch (type) {
            case TYPE_ARRAYBUFFER:
                return buffer;
            case TYPE_BLOB:
                return new Blob([buffer]);
            case TYPE_INT8ARRAY:
                return new Int8Array(buffer);
            case TYPE_UINT8ARRAY:
                return new Uint8Array(buffer);
            case TYPE_UINT8CLAMPEDARRAY:
                return new Uint8ClampedArray(buffer);
            case TYPE_INT16ARRAY:
                return new Int16Array(buffer);
            case TYPE_UINT16ARRAY:
                return new Uint16Array(buffer);
            case TYPE_INT32ARRAY:
                return new Int32Array(buffer);
            case TYPE_UINT32ARRAY:
                return new Uint32Array(buffer);
            case TYPE_FLOAT32ARRAY:
                return new Float32Array(buffer);
            case TYPE_FLOAT64ARRAY:
                return new Float64Array(buffer);
            default:
                throw new Error('Unkown type: ' + type);
        }
    }

    function stringToBuffer(serializedString) {
        // Fill the string into a ArrayBuffer.
        var bufferLength = serializedString.length * 0.75;
        var len = serializedString.length;
        var i;
        var p = 0;
        var encoded1, encoded2, encoded3, encoded4;

        if (serializedString[serializedString.length - 1] === '=') {
            bufferLength--;
            if (serializedString[serializedString.length - 2] === '=') {
                bufferLength--;
            }
        }

        var buffer = new ArrayBuffer(bufferLength);
        var bytes = new Uint8Array(buffer);

        for (i = 0; i < len; i+=4) {
            encoded1 = BASE_CHARS.indexOf(serializedString[i]);
            encoded2 = BASE_CHARS.indexOf(serializedString[i+1]);
            encoded3 = BASE_CHARS.indexOf(serializedString[i+2]);
            encoded4 = BASE_CHARS.indexOf(serializedString[i+3]);

            /*jslint bitwise: true */
            bytes[p++] = (encoded1 << 2) | (encoded2 >> 4);
            bytes[p++] = ((encoded2 & 15) << 4) | (encoded3 >> 2);
            bytes[p++] = ((encoded3 & 3) << 6) | (encoded4 & 63);
        }
        return buffer;
    }

    // Converts a buffer to a string to store, serialized, in the backend
    // storage library.
    function bufferToString(buffer) {
        // base64-arraybuffer
        var bytes = new Uint8Array(buffer);
        var base64String = '';
        var i;

        for (i = 0; i < bytes.length; i += 3) {
            /*jslint bitwise: true */
            base64String += BASE_CHARS[bytes[i] >> 2];
            base64String += BASE_CHARS[((bytes[i] & 3) << 4) | (bytes[i + 1] >> 4)];
            base64String += BASE_CHARS[((bytes[i + 1] & 15) << 2) | (bytes[i + 2] >> 6)];
            base64String += BASE_CHARS[bytes[i + 2] & 63];
        }

        if ((bytes.length % 3) === 2) {
            base64String = base64String.substring(0, base64String.length - 1) + '=';
        } else if (bytes.length % 3 === 1) {
            base64String = base64String.substring(0, base64String.length - 2) + '==';
        }

        return base64String;
    }

    var localforageSerializer = {
        serialize: serialize,
        deserialize: deserialize,
        stringToBuffer: stringToBuffer,
        bufferToString: bufferToString
    };

    if (typeof module !== 'undefined' && module.exports && typeof _dereq_ !== 'undefined') {
        module.exports = localforageSerializer;
    } else if (typeof define === 'function' && define.amd) {
        define('localforageSerializer', function() {
            return localforageSerializer;
        });
    } else {
        this.localforageSerializer = localforageSerializer;
    }
}).call(window);

},{}],45:[function(_dereq_,module,exports){
/*
 * Copyright 2012-2013 the original author or authors
 * @license MIT, see LICENSE.txt for details
 *
 * @author Scott Andrews
 */

(function (define, location) {
	'use strict';

	var undef;

	define(function (_dereq_) {

		var mixin, origin, urlRE, absoluteUrlRE, fullyQualifiedUrlRE;

		mixin = _dereq_('./util/mixin');

		urlRE = /([a-z][a-z0-9\+\-\.]*:)\/\/([^@]+@)?(([^:\/]+)(:([0-9]+))?)?(\/[^?#]*)?(\?[^#]*)?(#\S*)?/i;
		absoluteUrlRE = /^([a-z][a-z0-9\-\+\.]*:\/\/|\/)/i;
		fullyQualifiedUrlRE = /([a-z][a-z0-9\+\-\.]*:)\/\/([^@]+@)?(([^:\/]+)(:([0-9]+))?)?\//i;

		/**
		 * Apply params to the template to create a URL.
		 *
		 * Parameters that are not applied directly to the template, are appended
		 * to the URL as query string parameters.
		 *
		 * @param {string} template the URI template
		 * @param {Object} params parameters to apply to the template
		 * @return {string} the resulting URL
		 */
		function buildUrl(template, params) {
			// internal builder to convert template with params.
			var url, name, queryStringParams, re;

			url = template;
			queryStringParams = {};

			if (params) {
				for (name in params) {
					/*jshint forin:false */
					re = new RegExp('\\{' + name + '\\}');
					if (re.test(url)) {
						url = url.replace(re, encodeURIComponent(params[name]), 'g');
					}
					else {
						queryStringParams[name] = params[name];
					}
				}
				for (name in queryStringParams) {
					url += url.indexOf('?') === -1 ? '?' : '&';
					url += encodeURIComponent(name);
					if (queryStringParams[name] !== null && queryStringParams[name] !== undefined) {
						url += '=';
						url += encodeURIComponent(queryStringParams[name]);
					}
				}
			}
			return url;
		}

		function startsWith(str, test) {
			return str.indexOf(test) === 0;
		}

		/**
		 * Create a new URL Builder
		 *
		 * @param {string|UrlBuilder} template the base template to build from, may be another UrlBuilder
		 * @param {Object} [params] base parameters
		 * @constructor
		 */
		function UrlBuilder(template, params) {
			if (!(this instanceof UrlBuilder)) {
				// invoke as a constructor
				return new UrlBuilder(template, params);
			}

			if (template instanceof UrlBuilder) {
				this._template = template.template;
				this._params = mixin({}, this._params, params);
			}
			else {
				this._template = (template || '').toString();
				this._params = params || {};
			}
		}

		UrlBuilder.prototype = {

			/**
			 * Create a new UrlBuilder instance that extends the current builder.
			 * The current builder is unmodified.
			 *
			 * @param {string} [template] URL template to append to the current template
			 * @param {Object} [params] params to combine with current params.  New params override existing params
			 * @return {UrlBuilder} the new builder
			 */
			append: function (template,  params) {
				// TODO consider query strings and fragments
				return new UrlBuilder(this._template + template, mixin({}, this._params, params));
			},

			/**
			 * Create a new UrlBuilder with a fully qualified URL based on the
			 * window's location or base href and the current templates relative URL.
			 *
			 * Path variables are preserved.
			 *
			 * *Browser only*
			 *
			 * @return {UrlBuilder} the fully qualified URL template
			 */
			fullyQualify: function () {
				if (!location) { return this; }
				if (this.isFullyQualified()) { return this; }

				var template = this._template;

				if (startsWith(template, '//')) {
					template = origin.protocol + template;
				}
				else if (startsWith(template, '/')) {
					template = origin.origin + template;
				}
				else if (!this.isAbsolute()) {
					template = origin.origin + origin.pathname.substring(0, origin.pathname.lastIndexOf('/') + 1);
				}

				if (template.indexOf('/', 8) === -1) {
					// default the pathname to '/'
					template = template + '/';
				}

				return new UrlBuilder(template, this._params);
			},

			/**
			 * True if the URL is absolute
			 *
			 * @return {boolean}
			 */
			isAbsolute: function () {
				return absoluteUrlRE.test(this.build());
			},

			/**
			 * True if the URL is fully qualified
			 *
			 * @return {boolean}
			 */
			isFullyQualified: function () {
				return fullyQualifiedUrlRE.test(this.build());
			},

			/**
			 * True if the URL is cross origin. The protocol, host and port must not be
			 * the same in order to be cross origin,
			 *
			 * @return {boolean}
			 */
			isCrossOrigin: function () {
				if (!origin) {
					return true;
				}
				var url = this.parts();
				return url.protocol !== origin.protocol ||
				       url.hostname !== origin.hostname ||
				       url.port !== origin.port;
			},

			/**
			 * Split a URL into its consituent parts following the naming convention of
			 * 'window.location'. One difference is that the port will contain the
			 * protocol default if not specified.
			 *
			 * @see https://developer.mozilla.org/en-US/docs/DOM/window.location
			 *
			 * @returns {Object} a 'window.location'-like object
			 */
			parts: function () {
				/*jshint maxcomplexity:20 */
				var url, parts;
				url = this.fullyQualify().build().match(urlRE);
				parts = {
					href: url[0],
					protocol: url[1],
					host: url[3] || '',
					hostname: url[4] || '',
					port: url[6],
					pathname: url[7] || '',
					search: url[8] || '',
					hash: url[9] || ''
				};
				parts.origin = parts.protocol + '//' + parts.host;
				parts.port = parts.port || (parts.protocol === 'https:' ? '443' : parts.protocol === 'http:' ? '80' : '');
				return parts;
			},

			/**
			 * Expand the template replacing path variables with parameters
			 *
			 * @param {Object} [params] params to combine with current params.  New params override existing params
			 * @return {string} the expanded URL
			 */
			build: function (params) {
				return buildUrl(this._template, mixin({}, this._params, params));
			},

			/**
			 * @see build
			 */
			toString: function () {
				return this.build();
			}

		};

		origin = location ? new UrlBuilder(location.href).parts() : undef;

		return UrlBuilder;
	});

}(
	typeof define === 'function' && define.amd ? define : function (factory) { module.exports = factory(_dereq_); },
	typeof window !== 'undefined' ? window.location : void 0
	// Boilerplate for AMD and Node
));

},{"./util/mixin":81}],46:[function(_dereq_,module,exports){
/*
 * Copyright 2014 the original author or authors
 * @license MIT, see LICENSE.txt for details
 *
 * @author Scott Andrews
 */

(function (define) {
	'use strict';

	define(function (_dereq_) {

		var rest = _dereq_('./client/default'),
		    browser = _dereq_('./client/xhr');

		rest.setPlatformDefaultClient(browser);

		return rest;

	});

}(
	typeof define === 'function' && define.amd ? define : function (factory) { module.exports = factory(_dereq_); }
	// Boilerplate for AMD and Node
));

},{"./client/default":48,"./client/xhr":49}],47:[function(_dereq_,module,exports){
/*
 * Copyright 2014 the original author or authors
 * @license MIT, see LICENSE.txt for details
 *
 * @author Scott Andrews
 */

(function (define) {
	'use strict';

	define(function (/* require */) {

		/**
		 * Add common helper methods to a client impl
		 *
		 * @param {function} impl the client implementation
		 * @param {Client} [target] target of this client, used when wrapping other clients
		 * @returns {Client} the client impl with additional methods
		 */
		return function client(impl, target) {

			if (target) {

				/**
				 * @returns {Client} the target client
				 */
				impl.skip = function skip() {
					return target;
				};

			}

			/**
			 * Allow a client to easily be wrapped by an interceptor
			 *
			 * @param {Interceptor} interceptor the interceptor to wrap this client with
			 * @param [config] configuration for the interceptor
			 * @returns {Client} the newly wrapped client
			 */
			impl.wrap = function wrap(interceptor, config) {
				return interceptor(impl, config);
			};

			/**
			 * @deprecated
			 */
			impl.chain = function chain() {
				if (typeof console !== 'undefined') {
					console.log('rest.js: client.chain() is deprecated, use client.wrap() instead');
				}

				return impl.wrap.apply(this, arguments);
			};

			return impl;

		};

	});

}(
	typeof define === 'function' && define.amd ? define : function (factory) { module.exports = factory(_dereq_); }
	// Boilerplate for AMD and Node
));

},{}],48:[function(_dereq_,module,exports){
/*
 * Copyright 2014 the original author or authors
 * @license MIT, see LICENSE.txt for details
 *
 * @author Scott Andrews
 */

(function (define) {
	'use strict';

	var undef;

	define(function (_dereq_) {

		/**
		 * Plain JS Object containing properties that represent an HTTP request.
		 *
		 * Depending on the capabilities of the underlying client, a request
		 * may be cancelable. If a request may be canceled, the client will add
		 * a canceled flag and cancel function to the request object. Canceling
		 * the request will put the response into an error state.
		 *
		 * @field {string} [method='GET'] HTTP method, commonly GET, POST, PUT, DELETE or HEAD
		 * @field {string|UrlBuilder} [path=''] path template with optional path variables
		 * @field {Object} [params] parameters for the path template and query string
		 * @field {Object} [headers] custom HTTP headers to send, in addition to the clients default headers
		 * @field [entity] the HTTP entity, common for POST or PUT requests
		 * @field {boolean} [canceled] true if the request has been canceled, set by the client
		 * @field {Function} [cancel] cancels the request if invoked, provided by the client
		 * @field {Client} [originator] the client that first handled this request, provided by the interceptor
		 *
		 * @class Request
		 */

		/**
		 * Plain JS Object containing properties that represent an HTTP response
		 *
		 * @field {Object} [request] the request object as received by the root client
		 * @field {Object} [raw] the underlying request object, like XmlHttpRequest in a browser
		 * @field {number} [status.code] status code of the response (i.e. 200, 404)
		 * @field {string} [status.text] status phrase of the response
		 * @field {Object] [headers] response headers hash of normalized name, value pairs
		 * @field [entity] the response body
		 *
		 * @class Response
		 */

		/**
		 * HTTP client particularly suited for RESTful operations.
		 *
		 * @field {function} wrap wraps this client with a new interceptor returning the wrapped client
		 *
		 * @param {Request} the HTTP request
		 * @returns {ResponsePromise<Response>} a promise the resolves to the HTTP response
		 *
		 * @class Client
		 */

		 /**
		  * Extended when.js Promises/A+ promise with HTTP specific helpers
		  *q
		  * @method entity promise for the HTTP entity
		  * @method status promise for the HTTP status code
		  * @method headers promise for the HTTP response headers
		  * @method header promise for a specific HTTP response header
		  *
		  * @class ResponsePromise
		  * @extends Promise
		  */

		var client, target, platformDefault;

		client = _dereq_('../client');

		/**
		 * Make a request with the default client
		 * @param {Request} the HTTP request
		 * @returns {Promise<Response>} a promise the resolves to the HTTP response
		 */
		function defaultClient() {
			return target.apply(undef, arguments);
		}

		/**
		 * Change the default client
		 * @param {Client} client the new default client
		 */
		defaultClient.setDefaultClient = function setDefaultClient(client) {
			target = client;
		};

		/**
		 * Obtain a direct reference to the current default client
		 * @returns {Client} the default client
		 */
		defaultClient.getDefaultClient = function getDefaultClient() {
			return target;
		};

		/**
		 * Reset the default client to the platform default
		 */
		defaultClient.resetDefaultClient = function resetDefaultClient() {
			target = platformDefault;
		};

		/**
		 * @private
		 */
		defaultClient.setPlatformDefaultClient = function setPlatformDefaultClient(client) {
			if (platformDefault) {
				throw new Error('Unable to redefine platformDefaultClient');
			}
			target = platformDefault = client;
		};

		return client(defaultClient);

	});

}(
	typeof define === 'function' && define.amd ? define : function (factory) { module.exports = factory(_dereq_); }
	// Boilerplate for AMD and Node
));

},{"../client":47}],49:[function(_dereq_,module,exports){
/*
 * Copyright 2012-2014 the original author or authors
 * @license MIT, see LICENSE.txt for details
 *
 * @author Scott Andrews
 */

(function (define, global) {
	'use strict';

	define(function (_dereq_) {

		var when, UrlBuilder, normalizeHeaderName, responsePromise, client, headerSplitRE;

		when = _dereq_('when');
		UrlBuilder = _dereq_('../UrlBuilder');
		normalizeHeaderName = _dereq_('../util/normalizeHeaderName');
		responsePromise = _dereq_('../util/responsePromise');
		client = _dereq_('../client');

		// according to the spec, the line break is '\r\n', but doesn't hold true in practice
		headerSplitRE = /[\r|\n]+/;

		function parseHeaders(raw) {
			// Note: Set-Cookie will be removed by the browser
			var headers = {};

			if (!raw) { return headers; }

			raw.trim().split(headerSplitRE).forEach(function (header) {
				var boundary, name, value;
				boundary = header.indexOf(':');
				name = normalizeHeaderName(header.substring(0, boundary).trim());
				value = header.substring(boundary + 1).trim();
				if (headers[name]) {
					if (Array.isArray(headers[name])) {
						// add to an existing array
						headers[name].push(value);
					}
					else {
						// convert single value to array
						headers[name] = [headers[name], value];
					}
				}
				else {
					// new, single value
					headers[name] = value;
				}
			});

			return headers;
		}

		function safeMixin(target, source) {
			Object.keys(source || {}).forEach(function (prop) {
				// make sure the property already exists as
				// IE 6 will blow up if we add a new prop
				if (source.hasOwnProperty(prop) && prop in target) {
					try {
						target[prop] = source[prop];
					}
					catch (e) {
						// ignore, expected for some properties at some points in the request lifecycle
					}
				}
			});

			return target;
		}

		return client(function xhr(request) {
			return responsePromise.promise(function (resolve, reject) {
				/*jshint maxcomplexity:20 */

				var client, method, url, headers, entity, headerName, response, XMLHttpRequest;

				request = typeof request === 'string' ? { path: request } : request || {};
				response = { request: request };

				if (request.canceled) {
					response.error = 'precanceled';
					reject(response);
					return;
				}

				XMLHttpRequest = request.engine || global.XMLHttpRequest;
				if (!XMLHttpRequest) {
					reject({ request: request, error: 'xhr-not-available' });
					return;
				}

				entity = request.entity;
				request.method = request.method || (entity ? 'POST' : 'GET');
				method = request.method;
				url = new UrlBuilder(request.path || '', request.params).build();

				try {
					client = response.raw = new XMLHttpRequest();

					// mixin extra request properties before and after opening the request as some properties require being set at different phases of the request
					safeMixin(client, request.mixin);
					client.open(method, url, true);
					safeMixin(client, request.mixin);

					headers = request.headers;
					for (headerName in headers) {
						/*jshint forin:false */
						if (headerName === 'Content-Type' && headers[headerName] === 'multipart/form-data') {
							// XMLHttpRequest generates its own Content-Type header with the
							// appropriate multipart boundary when sending multipart/form-data.
							continue;
						}

						client.setRequestHeader(headerName, headers[headerName]);
					}

					request.canceled = false;
					request.cancel = function cancel() {
						request.canceled = true;
						client.abort();
						reject(response);
					};

					client.onreadystatechange = function (/* e */) {
						if (request.canceled) { return; }
						if (client.readyState === (XMLHttpRequest.DONE || 4)) {
							response.status = {
								code: client.status,
								text: client.statusText
							};
							response.headers = parseHeaders(client.getAllResponseHeaders());
							response.entity = client.responseText;

							if (response.status.code > 0) {
								// check status code as readystatechange fires before error event
								resolve(response);
							}
							else {
								// give the error callback a chance to fire before resolving
								// requests for file:// URLs do not have a status code
								setTimeout(function () {
									resolve(response);
								}, 0);
							}
						}
					};

					try {
						client.onerror = function (/* e */) {
							response.error = 'loaderror';
							reject(response);
						};
					}
					catch (e) {
						// IE 6 will not support error handling
					}

					client.send(entity);
				}
				catch (e) {
					response.error = 'loaderror';
					reject(response);
				}

			});
		});

	});

}(
	typeof define === 'function' && define.amd ? define : function (factory) { module.exports = factory(_dereq_); },
	typeof window !== 'undefined' ? window : void 0
	// Boilerplate for AMD and Node
));

},{"../UrlBuilder":45,"../client":47,"../util/normalizeHeaderName":82,"../util/responsePromise":83,"when":78}],50:[function(_dereq_,module,exports){
/*
 * Copyright 2012-2015 the original author or authors
 * @license MIT, see LICENSE.txt for details
 *
 * @author Scott Andrews
 */

(function (define) {
	'use strict';

	define(function (_dereq_) {

		var defaultClient, mixin, responsePromise, client, when;

		defaultClient = _dereq_('./client/default');
		mixin = _dereq_('./util/mixin');
		responsePromise = _dereq_('./util/responsePromise');
		client = _dereq_('./client');
		when = _dereq_('when');

		/**
		 * Interceptors have the ability to intercept the request and/org response
		 * objects.  They may augment, prune, transform or replace the
		 * request/response as needed.  Clients may be composed by wrapping
		 * together multiple interceptors.
		 *
		 * Configured interceptors are functional in nature.  Wrapping a client in
		 * an interceptor will not affect the client, merely the data that flows in
		 * and out of that client.  A common configuration can be created once and
		 * shared; specialization can be created by further wrapping that client
		 * with custom interceptors.
		 *
		 * @param {Client} [target] client to wrap
		 * @param {Object} [config] configuration for the interceptor, properties will be specific to the interceptor implementation
		 * @returns {Client} A client wrapped with the interceptor
		 *
		 * @class Interceptor
		 */

		function defaultInitHandler(config) {
			return config;
		}

		function defaultRequestHandler(request /*, config, meta */) {
			return request;
		}

		function defaultResponseHandler(response /*, config, meta */) {
			return response;
		}

		function race(promisesOrValues) {
			// this function is different than when.any as the first to reject also wins
			return when.promise(function (resolve, reject) {
				promisesOrValues.forEach(function (promiseOrValue) {
					when(promiseOrValue, resolve, reject);
				});
			});
		}

		/**
		 * Alternate return type for the request handler that allows for more complex interactions.
		 *
		 * @param properties.request the traditional request return object
		 * @param {Promise} [properties.abort] promise that resolves if/when the request is aborted
		 * @param {Client} [properties.client] override the defined client with an alternate client
		 * @param [properties.response] response for the request, short circuit the request
		 */
		function ComplexRequest(properties) {
			if (!(this instanceof ComplexRequest)) {
				// in case users forget the 'new' don't mix into the interceptor
				return new ComplexRequest(properties);
			}
			mixin(this, properties);
		}

		/**
		 * Create a new interceptor for the provided handlers.
		 *
		 * @param {Function} [handlers.init] one time intialization, must return the config object
		 * @param {Function} [handlers.request] request handler
		 * @param {Function} [handlers.response] response handler regardless of error state
		 * @param {Function} [handlers.success] response handler when the request is not in error
		 * @param {Function} [handlers.error] response handler when the request is in error, may be used to 'unreject' an error state
		 * @param {Function} [handlers.client] the client to use if otherwise not specified, defaults to platform default client
		 *
		 * @returns {Interceptor}
		 */
		function interceptor(handlers) {

			var initHandler, requestHandler, successResponseHandler, errorResponseHandler;

			handlers = handlers || {};

			initHandler            = handlers.init    || defaultInitHandler;
			requestHandler         = handlers.request || defaultRequestHandler;
			successResponseHandler = handlers.success || handlers.response || defaultResponseHandler;
			errorResponseHandler   = handlers.error   || function () {
				// Propagate the rejection, with the result of the handler
				return when((handlers.response || defaultResponseHandler).apply(this, arguments), when.reject, when.reject);
			};

			return function (target, config) {

				if (typeof target === 'object') {
					config = target;
				}
				if (typeof target !== 'function') {
					target = handlers.client || defaultClient;
				}

				config = initHandler(config || {});

				function interceptedClient(request) {
					var context, meta;
					context = {};
					meta = { 'arguments': Array.prototype.slice.call(arguments), client: interceptedClient };
					request = typeof request === 'string' ? { path: request } : request || {};
					request.originator = request.originator || interceptedClient;
					return responsePromise(
						requestHandler.call(context, request, config, meta),
						function (request) {
							var response, abort, next;
							next = target;
							if (request instanceof ComplexRequest) {
								// unpack request
								abort = request.abort;
								next = request.client || next;
								response = request.response;
								// normalize request, must be last
								request = request.request;
							}
							response = response || when(request, function (request) {
								return when(
									next(request),
									function (response) {
										return successResponseHandler.call(context, response, config, meta);
									},
									function (response) {
										return errorResponseHandler.call(context, response, config, meta);
									}
								);
							});
							return abort ? race([response, abort]) : response;
						},
						function (error) {
							return when.reject({ request: request, error: error });
						}
					);
				}

				return client(interceptedClient, target);
			};
		}

		interceptor.ComplexRequest = ComplexRequest;

		return interceptor;

	});

}(
	typeof define === 'function' && define.amd ? define : function (factory) { module.exports = factory(_dereq_); }
	// Boilerplate for AMD and Node
));

},{"./client":47,"./client/default":48,"./util/mixin":81,"./util/responsePromise":83,"when":78}],51:[function(_dereq_,module,exports){
/*
 * Copyright 2012-2014 the original author or authors
 * @license MIT, see LICENSE.txt for details
 *
 * @author Scott Andrews
 */

(function (define) {
	'use strict';

	define(function (_dereq_) {

		var interceptor, mime, registry, noopConverter, when;

		interceptor = _dereq_('../interceptor');
		mime = _dereq_('../mime');
		registry = _dereq_('../mime/registry');
		when = _dereq_('when');

		noopConverter = {
			read: function (obj) { return obj; },
			write: function (obj) { return obj; }
		};

		/**
		 * MIME type support for request and response entities.  Entities are
		 * (de)serialized using the converter for the MIME type.
		 *
		 * Request entities are converted using the desired converter and the
		 * 'Accept' request header prefers this MIME.
		 *
		 * Response entities are converted based on the Content-Type response header.
		 *
		 * @param {Client} [client] client to wrap
		 * @param {string} [config.mime='text/plain'] MIME type to encode the request
		 *   entity
		 * @param {string} [config.accept] Accept header for the request
		 * @param {Client} [config.client=<request.originator>] client passed to the
		 *   converter, defaults to the client originating the request
		 * @param {Registry} [config.registry] MIME registry, defaults to the root
		 *   registry
		 * @param {boolean} [config.permissive] Allow an unkown request MIME type
		 *
		 * @returns {Client}
		 */
		return interceptor({
			init: function (config) {
				config.registry = config.registry || registry;
				return config;
			},
			request: function (request, config) {
				var type, headers;

				headers = request.headers || (request.headers = {});
				type = mime.parse(headers['Content-Type'] = headers['Content-Type'] || config.mime || 'text/plain');
				headers.Accept = headers.Accept || config.accept || type.raw + ', application/json;q=0.8, text/plain;q=0.5, */*;q=0.2';

				if (!('entity' in request)) {
					return request;
				}

				return config.registry.lookup(type).otherwise(function () {
					// failed to resolve converter
					if (config.permissive) {
						return noopConverter;
					}
					throw 'mime-unknown';
				}).then(function (converter) {
					var client = config.client || request.originator;

					return when.attempt(converter.write, request.entity, { client: client, request: request, mime: type, registry: config.registry })
						.otherwise(function() {
							throw 'mime-serialization';
						})
						.then(function(entity) {
							request.entity = entity;
							return request;
						});
				});
			},
			response: function (response, config) {
				if (!(response.headers && response.headers['Content-Type'] && response.entity)) {
					return response;
				}

				var type = mime.parse(response.headers['Content-Type']);

				return config.registry.lookup(type).otherwise(function () { return noopConverter; }).then(function (converter) {
					var client = config.client || response.request && response.request.originator;

					return when.attempt(converter.read, response.entity, { client: client, response: response, mime: type, registry: config.registry })
						.otherwise(function (e) {
							response.error = 'mime-deserialization';
							response.cause = e;
							throw response;
						})
						.then(function (entity) {
							response.entity = entity;
							return response;
						});
				});
			}
		});

	});

}(
	typeof define === 'function' && define.amd ? define : function (factory) { module.exports = factory(_dereq_); }
	// Boilerplate for AMD and Node
));

},{"../interceptor":50,"../mime":54,"../mime/registry":55,"when":78}],52:[function(_dereq_,module,exports){
/*
 * Copyright 2012-2013 the original author or authors
 * @license MIT, see LICENSE.txt for details
 *
 * @author Scott Andrews
 */

(function (define) {
	'use strict';

	define(function (_dereq_) {

		var interceptor, UrlBuilder;

		interceptor = _dereq_('../interceptor');
		UrlBuilder = _dereq_('../UrlBuilder');

		function startsWith(str, prefix) {
			return str.indexOf(prefix) === 0;
		}

		function endsWith(str, suffix) {
			return str.lastIndexOf(suffix) + suffix.length === str.length;
		}

		/**
		 * Prefixes the request path with a common value.
		 *
		 * @param {Client} [client] client to wrap
		 * @param {number} [config.prefix] path prefix
		 *
		 * @returns {Client}
		 */
		return interceptor({
			request: function (request, config) {
				var path;

				if (config.prefix && !(new UrlBuilder(request.path).isFullyQualified())) {
					path = config.prefix;
					if (request.path) {
						if (!endsWith(path, '/') && !startsWith(request.path, '/')) {
							// add missing '/' between path sections
							path += '/';
						}
						path += request.path;
					}
					request.path = path;
				}

				return request;
			}
		});

	});

}(
	typeof define === 'function' && define.amd ? define : function (factory) { module.exports = factory(_dereq_); }
	// Boilerplate for AMD and Node
));

},{"../UrlBuilder":45,"../interceptor":50}],53:[function(_dereq_,module,exports){
/*
 * Copyright 2015 the original author or authors
 * @license MIT, see LICENSE.txt for details
 *
 * @author Scott Andrews
 */

(function (define) {
	'use strict';

	define(function (_dereq_) {

		var interceptor, uriTemplate, mixin;

		interceptor = _dereq_('../interceptor');
		uriTemplate = _dereq_('../util/uriTemplate');
		mixin = _dereq_('../util/mixin');

		/**
		 * Applies request params to the path as a URI Template
		 *
		 * Params are removed from the request object, as they have been consumed.
		 *
		 * @param {Client} [client] client to wrap
		 * @param {Object} [config.params] default param values
		 * @param {string} [config.template] default template
		 *
		 * @returns {Client}
		 */
		return interceptor({
			init: function (config) {
				config.params = config.params || {};
				config.template = config.template || '';
				return config;
			},
			request: function (request, config) {
				var template, params;

				template = request.path || config.template;
				params = mixin({}, request.params, config.params);

				request.path = uriTemplate.expand(template, params);
				delete request.params;

				return request;
			}
		});

	});

}(
	typeof define === 'function' && define.amd ? define : function (factory) { module.exports = factory(_dereq_); }
	// Boilerplate for AMD and Node
));

},{"../interceptor":50,"../util/mixin":81,"../util/uriTemplate":85}],54:[function(_dereq_,module,exports){
/*
* Copyright 2014 the original author or authors
* @license MIT, see LICENSE.txt for details
*
* @author Scott Andrews
*/

(function (define) {
	'use strict';

	var undef;

	define(function (/* require */) {

		/**
		 * Parse a MIME type into it's constituent parts
		 *
		 * @param {string} mime MIME type to parse
		 * @return {{
		 *   {string} raw the original MIME type
		 *   {string} type the type and subtype
		 *   {string} [suffix] mime suffix, including the plus, if any
		 *   {Object} params key/value pair of attributes
		 * }}
		 */
		function parse(mime) {
			var params, type;

			params = mime.split(';');
			type = params[0].trim().split('+');

			return {
				raw: mime,
				type: type[0],
				suffix: type[1] ? '+' + type[1] : '',
				params: params.slice(1).reduce(function (params, pair) {
					pair = pair.split('=');
					params[pair[0].trim()] = pair[1] ? pair[1].trim() : undef;
					return params;
				}, {})
			};
		}

		return {
			parse: parse
		};

	});

}(
	typeof define === 'function' && define.amd ? define : function (factory) { module.exports = factory(_dereq_); }
	// Boilerplate for AMD and Node
));

},{}],55:[function(_dereq_,module,exports){
/*
 * Copyright 2012-2014 the original author or authors
 * @license MIT, see LICENSE.txt for details
 *
 * @author Scott Andrews
 */

(function (define) {
	'use strict';

	define(function (_dereq_) {

		var mime, when, registry;

		mime = _dereq_('../mime');
		when = _dereq_('when');

		function Registry(mimes) {

			/**
			 * Lookup the converter for a MIME type
			 *
			 * @param {string} type the MIME type
			 * @return a promise for the converter
			 */
			this.lookup = function lookup(type) {
				var parsed;

				parsed = typeof type === 'string' ? mime.parse(type) : type;

				if (mimes[parsed.raw]) {
					return mimes[parsed.raw];
				}
				if (mimes[parsed.type + parsed.suffix]) {
					return mimes[parsed.type + parsed.suffix];
				}
				if (mimes[parsed.type]) {
					return mimes[parsed.type];
				}
				if (mimes[parsed.suffix]) {
					return mimes[parsed.suffix];
				}

				return when.reject(new Error('Unable to locate converter for mime "' + parsed.raw + '"'));
			};

			/**
			 * Create a late dispatched proxy to the target converter.
			 *
			 * Common when a converter is registered under multiple names and
			 * should be kept in sync if updated.
			 *
			 * @param {string} type mime converter to dispatch to
			 * @returns converter whose read/write methods target the desired mime converter
			 */
			this.delegate = function delegate(type) {
				return {
					read: function () {
						var args = arguments;
						return this.lookup(type).then(function (converter) {
							return converter.read.apply(this, args);
						}.bind(this));
					}.bind(this),
					write: function () {
						var args = arguments;
						return this.lookup(type).then(function (converter) {
							return converter.write.apply(this, args);
						}.bind(this));
					}.bind(this)
				};
			};

			/**
			 * Register a custom converter for a MIME type
			 *
			 * @param {string} type the MIME type
			 * @param converter the converter for the MIME type
			 * @return a promise for the converter
			 */
			this.register = function register(type, converter) {
				mimes[type] = when(converter);
				return mimes[type];
			};

			/**
			 * Create a child registry whoes registered converters remain local, while
			 * able to lookup converters from its parent.
			 *
			 * @returns child MIME registry
			 */
			this.child = function child() {
				return new Registry(Object.create(mimes));
			};

		}

		registry = new Registry({});

		// include provided serializers
		registry.register('application/hal', _dereq_('./type/application/hal'));
		registry.register('application/json', _dereq_('./type/application/json'));
		registry.register('application/x-www-form-urlencoded', _dereq_('./type/application/x-www-form-urlencoded'));
		registry.register('multipart/form-data', _dereq_('./type/multipart/form-data'));
		registry.register('text/plain', _dereq_('./type/text/plain'));

		registry.register('+json', registry.delegate('application/json'));

		return registry;

	});

}(
	typeof define === 'function' && define.amd ? define : function (factory) { module.exports = factory(_dereq_); }
	// Boilerplate for AMD and Node
));

},{"../mime":54,"./type/application/hal":56,"./type/application/json":57,"./type/application/x-www-form-urlencoded":58,"./type/multipart/form-data":59,"./type/text/plain":60,"when":78}],56:[function(_dereq_,module,exports){
/*
 * Copyright 2013-2015 the original author or authors
 * @license MIT, see LICENSE.txt for details
 *
 * @author Scott Andrews
 */

(function (define) {
	'use strict';

	define(function (_dereq_) {

		var pathPrefix, template, find, lazyPromise, responsePromise, when;

		pathPrefix = _dereq_('../../../interceptor/pathPrefix');
		template = _dereq_('../../../interceptor/template');
		find = _dereq_('../../../util/find');
		lazyPromise = _dereq_('../../../util/lazyPromise');
		responsePromise = _dereq_('../../../util/responsePromise');
		when = _dereq_('when');

		function defineProperty(obj, name, value) {
			Object.defineProperty(obj, name, {
				value: value,
				configurable: true,
				enumerable: false,
				writeable: true
			});
		}

		/**
		 * Hypertext Application Language serializer
		 *
		 * Implemented to https://tools.ietf.org/html/draft-kelly-json-hal-06
		 *
		 * As the spec is still a draft, this implementation will be updated as the
		 * spec evolves
		 *
		 * Objects are read as HAL indexing links and embedded objects on to the
		 * resource. Objects are written as plain JSON.
		 *
		 * Embedded relationships are indexed onto the resource by the relationship
		 * as a promise for the related resource.
		 *
		 * Links are indexed onto the resource as a lazy promise that will GET the
		 * resource when a handler is first registered on the promise.
		 *
		 * A `requestFor` method is added to the entity to make a request for the
		 * relationship.
		 *
		 * A `clientFor` method is added to the entity to get a full Client for a
		 * relationship.
		 *
		 * The `_links` and `_embedded` properties on the resource are made
		 * non-enumerable.
		 */
		return {

			read: function (str, opts) {
				var client, console;

				opts = opts || {};
				client = opts.client;
				console = opts.console || console;

				function deprecationWarning(relationship, deprecation) {
					if (deprecation && console && console.warn || console.log) {
						(console.warn || console.log).call(console, 'Relationship \'' + relationship + '\' is deprecated, see ' + deprecation);
					}
				}

				return opts.registry.lookup(opts.mime.suffix).then(function (converter) {
					return when(converter.read(str, opts)).then(function (root) {

						find.findProperties(root, '_embedded', function (embedded, resource, name) {
							Object.keys(embedded).forEach(function (relationship) {
								if (relationship in resource) { return; }
								var related = responsePromise({
									entity: embedded[relationship]
								});
								defineProperty(resource, relationship, related);
							});
							defineProperty(resource, name, embedded);
						});
						find.findProperties(root, '_links', function (links, resource, name) {
							Object.keys(links).forEach(function (relationship) {
								var link = links[relationship];
								if (relationship in resource) { return; }
								defineProperty(resource, relationship, responsePromise.make(lazyPromise(function () {
									if (link.deprecation) { deprecationWarning(relationship, link.deprecation); }
									if (link.templated === true) {
										return template(client)({ path: link.href });
									}
									return client({ path: link.href });
								})));
							});
							defineProperty(resource, name, links);
							defineProperty(resource, 'clientFor', function (relationship, clientOverride) {
								var link = links[relationship];
								if (!link) {
									throw new Error('Unknown relationship: ' + relationship);
								}
								if (link.deprecation) { deprecationWarning(relationship, link.deprecation); }
								if (link.templated === true) {
									return template(
										clientOverride || client,
										{ template: link.href }
									);
								}
								return pathPrefix(
									clientOverride || client,
									{ prefix: link.href }
								);
							});
							defineProperty(resource, 'requestFor', function (relationship, request, clientOverride) {
								var client = this.clientFor(relationship, clientOverride);
								return client(request);
							});
						});

						return root;
					});
				});

			},

			write: function (obj, opts) {
				return opts.registry.lookup(opts.mime.suffix).then(function (converter) {
					return converter.write(obj, opts);
				});
			}

		};
	});

}(
	typeof define === 'function' && define.amd ? define : function (factory) { module.exports = factory(_dereq_); }
	// Boilerplate for AMD and Node
));

},{"../../../interceptor/pathPrefix":52,"../../../interceptor/template":53,"../../../util/find":79,"../../../util/lazyPromise":80,"../../../util/responsePromise":83,"when":78}],57:[function(_dereq_,module,exports){
/*
 * Copyright 2012-2015 the original author or authors
 * @license MIT, see LICENSE.txt for details
 *
 * @author Scott Andrews
 */

(function (define) {
	'use strict';

	define(function (/* require */) {

		/**
		 * Create a new JSON converter with custom reviver/replacer.
		 *
		 * The extended converter must be published to a MIME registry in order
		 * to be used. The existing converter will not be modified.
		 *
		 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON
		 *
		 * @param {function} [reviver=undefined] custom JSON.parse reviver
		 * @param {function|Array} [replacer=undefined] custom JSON.stringify replacer
		 */
		function createConverter(reviver, replacer) {
			return {

				read: function (str) {
					return JSON.parse(str, reviver);
				},

				write: function (obj) {
					return JSON.stringify(obj, replacer);
				},

				extend: createConverter

			};
		}

		return createConverter();

	});

}(
	typeof define === 'function' && define.amd ? define : function (factory) { module.exports = factory(_dereq_); }
	// Boilerplate for AMD and Node
));

},{}],58:[function(_dereq_,module,exports){
/*
 * Copyright 2012 the original author or authors
 * @license MIT, see LICENSE.txt for details
 *
 * @author Scott Andrews
 */

(function (define) {
	'use strict';

	define(function (/* require */) {

		var encodedSpaceRE, urlEncodedSpaceRE;

		encodedSpaceRE = /%20/g;
		urlEncodedSpaceRE = /\+/g;

		function urlEncode(str) {
			str = encodeURIComponent(str);
			// spec says space should be encoded as '+'
			return str.replace(encodedSpaceRE, '+');
		}

		function urlDecode(str) {
			// spec says space should be encoded as '+'
			str = str.replace(urlEncodedSpaceRE, ' ');
			return decodeURIComponent(str);
		}

		function append(str, name, value) {
			if (Array.isArray(value)) {
				value.forEach(function (value) {
					str = append(str, name, value);
				});
			}
			else {
				if (str.length > 0) {
					str += '&';
				}
				str += urlEncode(name);
				if (value !== undefined && value !== null) {
					str += '=' + urlEncode(value);
				}
			}
			return str;
		}

		return {

			read: function (str) {
				var obj = {};
				str.split('&').forEach(function (entry) {
					var pair, name, value;
					pair = entry.split('=');
					name = urlDecode(pair[0]);
					if (pair.length === 2) {
						value = urlDecode(pair[1]);
					}
					else {
						value = null;
					}
					if (name in obj) {
						if (!Array.isArray(obj[name])) {
							// convert to an array, perserving currnent value
							obj[name] = [obj[name]];
						}
						obj[name].push(value);
					}
					else {
						obj[name] = value;
					}
				});
				return obj;
			},

			write: function (obj) {
				var str = '';
				Object.keys(obj).forEach(function (name) {
					str = append(str, name, obj[name]);
				});
				return str;
			}

		};
	});

}(
	typeof define === 'function' && define.amd ? define : function (factory) { module.exports = factory(_dereq_); }
	// Boilerplate for AMD and Node
));

},{}],59:[function(_dereq_,module,exports){
/*
 * Copyright 2014 the original author or authors
 * @license MIT, see LICENSE.txt for details
 *
 * @author Michael Jackson
 */

/* global FormData, File, Blob */

(function (define) {
	'use strict';

	define(function (/* require */) {

		function isFormElement(object) {
			return object &&
				object.nodeType === 1 && // Node.ELEMENT_NODE
				object.tagName === 'FORM';
		}

		function createFormDataFromObject(object) {
			var formData = new FormData();

			var value;
			for (var property in object) {
				if (object.hasOwnProperty(property)) {
					value = object[property];

					if (value instanceof File) {
						formData.append(property, value, value.name);
					} else if (value instanceof Blob) {
						formData.append(property, value);
					} else {
						formData.append(property, String(value));
					}
				}
			}

			return formData;
		}

		return {

			write: function (object) {
				if (typeof FormData === 'undefined') {
					throw new Error('The multipart/form-data mime serializer requires FormData support');
				}

				// Support FormData directly.
				if (object instanceof FormData) {
					return object;
				}

				// Support <form> elements.
				if (isFormElement(object)) {
					return new FormData(object);
				}

				// Support plain objects, may contain File/Blob as value.
				if (typeof object === 'object' && object !== null) {
					return createFormDataFromObject(object);
				}

				throw new Error('Unable to create FormData from object ' + object);
			}

		};
	});

}(
	typeof define === 'function' && define.amd ? define : function (factory) { module.exports = factory(_dereq_); }
	// Boilerplate for AMD and Node
));

},{}],60:[function(_dereq_,module,exports){
/*
 * Copyright 2012 the original author or authors
 * @license MIT, see LICENSE.txt for details
 *
 * @author Scott Andrews
 */

(function (define) {
	'use strict';

	define(function (/* require */) {

		return {

			read: function (str) {
				return str;
			},

			write: function (obj) {
				return obj.toString();
			}

		};
	});

}(
	typeof define === 'function' && define.amd ? define : function (factory) { module.exports = factory(_dereq_); }
	// Boilerplate for AMD and Node
));

},{}],61:[function(_dereq_,module,exports){
/** @license MIT License (c) copyright 2010-2014 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */

(function(define) { 'use strict';
define(function (_dereq_) {

	var makePromise = _dereq_('./makePromise');
	var Scheduler = _dereq_('./Scheduler');
	var async = _dereq_('./env').asap;

	return makePromise({
		scheduler: new Scheduler(async)
	});

});
})(typeof define === 'function' && define.amd ? define : function (factory) { module.exports = factory(_dereq_); });

},{"./Scheduler":62,"./env":74,"./makePromise":76}],62:[function(_dereq_,module,exports){
/** @license MIT License (c) copyright 2010-2014 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */

(function(define) { 'use strict';
define(function() {

	// Credit to Twisol (https://github.com/Twisol) for suggesting
	// this type of extensible queue + trampoline approach for next-tick conflation.

	/**
	 * Async task scheduler
	 * @param {function} async function to schedule a single async function
	 * @constructor
	 */
	function Scheduler(async) {
		this._async = async;
		this._running = false;

		this._queue = this;
		this._queueLen = 0;
		this._afterQueue = {};
		this._afterQueueLen = 0;

		var self = this;
		this.drain = function() {
			self._drain();
		};
	}

	/**
	 * Enqueue a task
	 * @param {{ run:function }} task
	 */
	Scheduler.prototype.enqueue = function(task) {
		this._queue[this._queueLen++] = task;
		this.run();
	};

	/**
	 * Enqueue a task to run after the main task queue
	 * @param {{ run:function }} task
	 */
	Scheduler.prototype.afterQueue = function(task) {
		this._afterQueue[this._afterQueueLen++] = task;
		this.run();
	};

	Scheduler.prototype.run = function() {
		if (!this._running) {
			this._running = true;
			this._async(this.drain);
		}
	};

	/**
	 * Drain the handler queue entirely, and then the after queue
	 */
	Scheduler.prototype._drain = function() {
		var i = 0;
		for (; i < this._queueLen; ++i) {
			this._queue[i].run();
			this._queue[i] = void 0;
		}

		this._queueLen = 0;
		this._running = false;

		for (i = 0; i < this._afterQueueLen; ++i) {
			this._afterQueue[i].run();
			this._afterQueue[i] = void 0;
		}

		this._afterQueueLen = 0;
	};

	return Scheduler;

});
}(typeof define === 'function' && define.amd ? define : function(factory) { module.exports = factory(); }));

},{}],63:[function(_dereq_,module,exports){
/** @license MIT License (c) copyright 2010-2014 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */

(function(define) { 'use strict';
define(function() {

	/**
	 * Custom error type for promises rejected by promise.timeout
	 * @param {string} message
	 * @constructor
	 */
	function TimeoutError (message) {
		Error.call(this);
		this.message = message;
		this.name = TimeoutError.name;
		if (typeof Error.captureStackTrace === 'function') {
			Error.captureStackTrace(this, TimeoutError);
		}
	}

	TimeoutError.prototype = Object.create(Error.prototype);
	TimeoutError.prototype.constructor = TimeoutError;

	return TimeoutError;
});
}(typeof define === 'function' && define.amd ? define : function(factory) { module.exports = factory(); }));
},{}],64:[function(_dereq_,module,exports){
/** @license MIT License (c) copyright 2010-2014 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */

(function(define) { 'use strict';
define(function() {

	makeApply.tryCatchResolve = tryCatchResolve;

	return makeApply;

	function makeApply(Promise, call) {
		if(arguments.length < 2) {
			call = tryCatchResolve;
		}

		return apply;

		function apply(f, thisArg, args) {
			var p = Promise._defer();
			var l = args.length;
			var params = new Array(l);
			callAndResolve({ f:f, thisArg:thisArg, args:args, params:params, i:l-1, call:call }, p._handler);

			return p;
		}

		function callAndResolve(c, h) {
			if(c.i < 0) {
				return call(c.f, c.thisArg, c.params, h);
			}

			var handler = Promise._handler(c.args[c.i]);
			handler.fold(callAndResolveNext, c, void 0, h);
		}

		function callAndResolveNext(c, x, h) {
			c.params[c.i] = x;
			c.i -= 1;
			callAndResolve(c, h);
		}
	}

	function tryCatchResolve(f, thisArg, args, resolver) {
		try {
			resolver.resolve(f.apply(thisArg, args));
		} catch(e) {
			resolver.reject(e);
		}
	}

});
}(typeof define === 'function' && define.amd ? define : function(factory) { module.exports = factory(); }));



},{}],65:[function(_dereq_,module,exports){
/** @license MIT License (c) copyright 2010-2014 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */

(function(define) { 'use strict';
define(function(_dereq_) {

	var state = _dereq_('../state');
	var applier = _dereq_('../apply');

	return function array(Promise) {

		var applyFold = applier(Promise);
		var toPromise = Promise.resolve;
		var all = Promise.all;

		var ar = Array.prototype.reduce;
		var arr = Array.prototype.reduceRight;
		var slice = Array.prototype.slice;

		// Additional array combinators

		Promise.any = any;
		Promise.some = some;
		Promise.settle = settle;

		Promise.map = map;
		Promise.filter = filter;
		Promise.reduce = reduce;
		Promise.reduceRight = reduceRight;

		/**
		 * When this promise fulfills with an array, do
		 * onFulfilled.apply(void 0, array)
		 * @param {function} onFulfilled function to apply
		 * @returns {Promise} promise for the result of applying onFulfilled
		 */
		Promise.prototype.spread = function(onFulfilled) {
			return this.then(all).then(function(array) {
				return onFulfilled.apply(this, array);
			});
		};

		return Promise;

		/**
		 * One-winner competitive race.
		 * Return a promise that will fulfill when one of the promises
		 * in the input array fulfills, or will reject when all promises
		 * have rejected.
		 * @param {array} promises
		 * @returns {Promise} promise for the first fulfilled value
		 */
		function any(promises) {
			var p = Promise._defer();
			var resolver = p._handler;
			var l = promises.length>>>0;

			var pending = l;
			var errors = [];

			for (var h, x, i = 0; i < l; ++i) {
				x = promises[i];
				if(x === void 0 && !(i in promises)) {
					--pending;
					continue;
				}

				h = Promise._handler(x);
				if(h.state() > 0) {
					resolver.become(h);
					Promise._visitRemaining(promises, i, h);
					break;
				} else {
					h.visit(resolver, handleFulfill, handleReject);
				}
			}

			if(pending === 0) {
				resolver.reject(new RangeError('any(): array must not be empty'));
			}

			return p;

			function handleFulfill(x) {
				/*jshint validthis:true*/
				errors = null;
				this.resolve(x); // this === resolver
			}

			function handleReject(e) {
				/*jshint validthis:true*/
				if(this.resolved) { // this === resolver
					return;
				}

				errors.push(e);
				if(--pending === 0) {
					this.reject(errors);
				}
			}
		}

		/**
		 * N-winner competitive race
		 * Return a promise that will fulfill when n input promises have
		 * fulfilled, or will reject when it becomes impossible for n
		 * input promises to fulfill (ie when promises.length - n + 1
		 * have rejected)
		 * @param {array} promises
		 * @param {number} n
		 * @returns {Promise} promise for the earliest n fulfillment values
		 *
		 * @deprecated
		 */
		function some(promises, n) {
			/*jshint maxcomplexity:7*/
			var p = Promise._defer();
			var resolver = p._handler;

			var results = [];
			var errors = [];

			var l = promises.length>>>0;
			var nFulfill = 0;
			var nReject;
			var x, i; // reused in both for() loops

			// First pass: count actual array items
			for(i=0; i<l; ++i) {
				x = promises[i];
				if(x === void 0 && !(i in promises)) {
					continue;
				}
				++nFulfill;
			}

			// Compute actual goals
			n = Math.max(n, 0);
			nReject = (nFulfill - n + 1);
			nFulfill = Math.min(n, nFulfill);

			if(n > nFulfill) {
				resolver.reject(new RangeError('some(): array must contain at least '
				+ n + ' item(s), but had ' + nFulfill));
			} else if(nFulfill === 0) {
				resolver.resolve(results);
			}

			// Second pass: observe each array item, make progress toward goals
			for(i=0; i<l; ++i) {
				x = promises[i];
				if(x === void 0 && !(i in promises)) {
					continue;
				}

				Promise._handler(x).visit(resolver, fulfill, reject, resolver.notify);
			}

			return p;

			function fulfill(x) {
				/*jshint validthis:true*/
				if(this.resolved) { // this === resolver
					return;
				}

				results.push(x);
				if(--nFulfill === 0) {
					errors = null;
					this.resolve(results);
				}
			}

			function reject(e) {
				/*jshint validthis:true*/
				if(this.resolved) { // this === resolver
					return;
				}

				errors.push(e);
				if(--nReject === 0) {
					results = null;
					this.reject(errors);
				}
			}
		}

		/**
		 * Apply f to the value of each promise in a list of promises
		 * and return a new list containing the results.
		 * @param {array} promises
		 * @param {function(x:*, index:Number):*} f mapping function
		 * @returns {Promise}
		 */
		function map(promises, f) {
			return Promise._traverse(f, promises);
		}

		/**
		 * Filter the provided array of promises using the provided predicate.  Input may
		 * contain promises and values
		 * @param {Array} promises array of promises and values
		 * @param {function(x:*, index:Number):boolean} predicate filtering predicate.
		 *  Must return truthy (or promise for truthy) for items to retain.
		 * @returns {Promise} promise that will fulfill with an array containing all items
		 *  for which predicate returned truthy.
		 */
		function filter(promises, predicate) {
			var a = slice.call(promises);
			return Promise._traverse(predicate, a).then(function(keep) {
				return filterSync(a, keep);
			});
		}

		function filterSync(promises, keep) {
			// Safe because we know all promises have fulfilled if we've made it this far
			var l = keep.length;
			var filtered = new Array(l);
			for(var i=0, j=0; i<l; ++i) {
				if(keep[i]) {
					filtered[j++] = Promise._handler(promises[i]).value;
				}
			}
			filtered.length = j;
			return filtered;

		}

		/**
		 * Return a promise that will always fulfill with an array containing
		 * the outcome states of all input promises.  The returned promise
		 * will never reject.
		 * @param {Array} promises
		 * @returns {Promise} promise for array of settled state descriptors
		 */
		function settle(promises) {
			return all(promises.map(settleOne));
		}

		function settleOne(p) {
			var h = Promise._handler(p);
			if(h.state() === 0) {
				return toPromise(p).then(state.fulfilled, state.rejected);
			}

			h._unreport();
			return state.inspect(h);
		}

		/**
		 * Traditional reduce function, similar to `Array.prototype.reduce()`, but
		 * input may contain promises and/or values, and reduceFunc
		 * may return either a value or a promise, *and* initialValue may
		 * be a promise for the starting value.
		 * @param {Array|Promise} promises array or promise for an array of anything,
		 *      may contain a mix of promises and values.
		 * @param {function(accumulated:*, x:*, index:Number):*} f reduce function
		 * @returns {Promise} that will resolve to the final reduced value
		 */
		function reduce(promises, f /*, initialValue */) {
			return arguments.length > 2 ? ar.call(promises, liftCombine(f), arguments[2])
					: ar.call(promises, liftCombine(f));
		}

		/**
		 * Traditional reduce function, similar to `Array.prototype.reduceRight()`, but
		 * input may contain promises and/or values, and reduceFunc
		 * may return either a value or a promise, *and* initialValue may
		 * be a promise for the starting value.
		 * @param {Array|Promise} promises array or promise for an array of anything,
		 *      may contain a mix of promises and values.
		 * @param {function(accumulated:*, x:*, index:Number):*} f reduce function
		 * @returns {Promise} that will resolve to the final reduced value
		 */
		function reduceRight(promises, f /*, initialValue */) {
			return arguments.length > 2 ? arr.call(promises, liftCombine(f), arguments[2])
					: arr.call(promises, liftCombine(f));
		}

		function liftCombine(f) {
			return function(z, x, i) {
				return applyFold(f, void 0, [z,x,i]);
			};
		}
	};

});
}(typeof define === 'function' && define.amd ? define : function(factory) { module.exports = factory(_dereq_); }));

},{"../apply":64,"../state":77}],66:[function(_dereq_,module,exports){
/** @license MIT License (c) copyright 2010-2014 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */

(function(define) { 'use strict';
define(function() {

	return function flow(Promise) {

		var resolve = Promise.resolve;
		var reject = Promise.reject;
		var origCatch = Promise.prototype['catch'];

		/**
		 * Handle the ultimate fulfillment value or rejection reason, and assume
		 * responsibility for all errors.  If an error propagates out of result
		 * or handleFatalError, it will be rethrown to the host, resulting in a
		 * loud stack track on most platforms and a crash on some.
		 * @param {function?} onResult
		 * @param {function?} onError
		 * @returns {undefined}
		 */
		Promise.prototype.done = function(onResult, onError) {
			this._handler.visit(this._handler.receiver, onResult, onError);
		};

		/**
		 * Add Error-type and predicate matching to catch.  Examples:
		 * promise['catch'](TypeError, handleTypeError)
		 *   ['catch'](predicate, handleMatchedErrors)
		 *   ['catch'](handleRemainingErrors)
		 * @param onRejected
		 * @returns {*}
		 */
		Promise.prototype['catch'] = Promise.prototype.otherwise = function(onRejected) {
			if (arguments.length < 2) {
				return origCatch.call(this, onRejected);
			}

			if(typeof onRejected !== 'function') {
				return this.ensure(rejectInvalidPredicate);
			}

			return origCatch.call(this, createCatchFilter(arguments[1], onRejected));
		};

		/**
		 * Wraps the provided catch handler, so that it will only be called
		 * if the predicate evaluates truthy
		 * @param {?function} handler
		 * @param {function} predicate
		 * @returns {function} conditional catch handler
		 */
		function createCatchFilter(handler, predicate) {
			return function(e) {
				return evaluatePredicate(e, predicate)
					? handler.call(this, e)
					: reject(e);
			};
		}

		/**
		 * Ensures that onFulfilledOrRejected will be called regardless of whether
		 * this promise is fulfilled or rejected.  onFulfilledOrRejected WILL NOT
		 * receive the promises' value or reason.  Any returned value will be disregarded.
		 * onFulfilledOrRejected may throw or return a rejected promise to signal
		 * an additional error.
		 * @param {function} handler handler to be called regardless of
		 *  fulfillment or rejection
		 * @returns {Promise}
		 */
		Promise.prototype['finally'] = Promise.prototype.ensure = function(handler) {
			if(typeof handler !== 'function') {
				return this;
			}

			return this.then(function(x) {
				return runSideEffect(handler, this, identity, x);
			}, function(e) {
				return runSideEffect(handler, this, reject, e);
			});
		};

		function runSideEffect (handler, thisArg, propagate, value) {
			var result = handler.call(thisArg);
			return maybeThenable(result)
				? propagateValue(result, propagate, value)
				: propagate(value);
		}

		function propagateValue (result, propagate, x) {
			return resolve(result).then(function () {
				return propagate(x);
			});
		}

		/**
		 * Recover from a failure by returning a defaultValue.  If defaultValue
		 * is a promise, it's fulfillment value will be used.  If defaultValue is
		 * a promise that rejects, the returned promise will reject with the
		 * same reason.
		 * @param {*} defaultValue
		 * @returns {Promise} new promise
		 */
		Promise.prototype['else'] = Promise.prototype.orElse = function(defaultValue) {
			return this.then(void 0, function() {
				return defaultValue;
			});
		};

		/**
		 * Shortcut for .then(function() { return value; })
		 * @param  {*} value
		 * @return {Promise} a promise that:
		 *  - is fulfilled if value is not a promise, or
		 *  - if value is a promise, will fulfill with its value, or reject
		 *    with its reason.
		 */
		Promise.prototype['yield'] = function(value) {
			return this.then(function() {
				return value;
			});
		};

		/**
		 * Runs a side effect when this promise fulfills, without changing the
		 * fulfillment value.
		 * @param {function} onFulfilledSideEffect
		 * @returns {Promise}
		 */
		Promise.prototype.tap = function(onFulfilledSideEffect) {
			return this.then(onFulfilledSideEffect)['yield'](this);
		};

		return Promise;
	};

	function rejectInvalidPredicate() {
		throw new TypeError('catch predicate must be a function');
	}

	function evaluatePredicate(e, predicate) {
		return isError(predicate) ? e instanceof predicate : predicate(e);
	}

	function isError(predicate) {
		return predicate === Error
			|| (predicate != null && predicate.prototype instanceof Error);
	}

	function maybeThenable(x) {
		return (typeof x === 'object' || typeof x === 'function') && x !== null;
	}

	function identity(x) {
		return x;
	}

});
}(typeof define === 'function' && define.amd ? define : function(factory) { module.exports = factory(); }));

},{}],67:[function(_dereq_,module,exports){
/** @license MIT License (c) copyright 2010-2014 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */
/** @author Jeff Escalante */

(function(define) { 'use strict';
define(function() {

	return function fold(Promise) {

		Promise.prototype.fold = function(f, z) {
			var promise = this._beget();

			this._handler.fold(function(z, x, to) {
				Promise._handler(z).fold(function(x, z, to) {
					to.resolve(f.call(this, z, x));
				}, x, this, to);
			}, z, promise._handler.receiver, promise._handler);

			return promise;
		};

		return Promise;
	};

});
}(typeof define === 'function' && define.amd ? define : function(factory) { module.exports = factory(); }));

},{}],68:[function(_dereq_,module,exports){
/** @license MIT License (c) copyright 2010-2014 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */

(function(define) { 'use strict';
define(function(_dereq_) {

	var inspect = _dereq_('../state').inspect;

	return function inspection(Promise) {

		Promise.prototype.inspect = function() {
			return inspect(Promise._handler(this));
		};

		return Promise;
	};

});
}(typeof define === 'function' && define.amd ? define : function(factory) { module.exports = factory(_dereq_); }));

},{"../state":77}],69:[function(_dereq_,module,exports){
/** @license MIT License (c) copyright 2010-2014 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */

(function(define) { 'use strict';
define(function() {

	return function generate(Promise) {

		var resolve = Promise.resolve;

		Promise.iterate = iterate;
		Promise.unfold = unfold;

		return Promise;

		/**
		 * @deprecated Use github.com/cujojs/most streams and most.iterate
		 * Generate a (potentially infinite) stream of promised values:
		 * x, f(x), f(f(x)), etc. until condition(x) returns true
		 * @param {function} f function to generate a new x from the previous x
		 * @param {function} condition function that, given the current x, returns
		 *  truthy when the iterate should stop
		 * @param {function} handler function to handle the value produced by f
		 * @param {*|Promise} x starting value, may be a promise
		 * @return {Promise} the result of the last call to f before
		 *  condition returns true
		 */
		function iterate(f, condition, handler, x) {
			return unfold(function(x) {
				return [x, f(x)];
			}, condition, handler, x);
		}

		/**
		 * @deprecated Use github.com/cujojs/most streams and most.unfold
		 * Generate a (potentially infinite) stream of promised values
		 * by applying handler(generator(seed)) iteratively until
		 * condition(seed) returns true.
		 * @param {function} unspool function that generates a [value, newSeed]
		 *  given a seed.
		 * @param {function} condition function that, given the current seed, returns
		 *  truthy when the unfold should stop
		 * @param {function} handler function to handle the value produced by unspool
		 * @param x {*|Promise} starting value, may be a promise
		 * @return {Promise} the result of the last value produced by unspool before
		 *  condition returns true
		 */
		function unfold(unspool, condition, handler, x) {
			return resolve(x).then(function(seed) {
				return resolve(condition(seed)).then(function(done) {
					return done ? seed : resolve(unspool(seed)).spread(next);
				});
			});

			function next(item, newSeed) {
				return resolve(handler(item)).then(function() {
					return unfold(unspool, condition, handler, newSeed);
				});
			}
		}
	};

});
}(typeof define === 'function' && define.amd ? define : function(factory) { module.exports = factory(); }));

},{}],70:[function(_dereq_,module,exports){
/** @license MIT License (c) copyright 2010-2014 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */

(function(define) { 'use strict';
define(function() {

	return function progress(Promise) {

		/**
		 * @deprecated
		 * Register a progress handler for this promise
		 * @param {function} onProgress
		 * @returns {Promise}
		 */
		Promise.prototype.progress = function(onProgress) {
			return this.then(void 0, void 0, onProgress);
		};

		return Promise;
	};

});
}(typeof define === 'function' && define.amd ? define : function(factory) { module.exports = factory(); }));

},{}],71:[function(_dereq_,module,exports){
/** @license MIT License (c) copyright 2010-2014 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */

(function(define) { 'use strict';
define(function(_dereq_) {

	var env = _dereq_('../env');
	var TimeoutError = _dereq_('../TimeoutError');

	function setTimeout(f, ms, x, y) {
		return env.setTimer(function() {
			f(x, y, ms);
		}, ms);
	}

	return function timed(Promise) {
		/**
		 * Return a new promise whose fulfillment value is revealed only
		 * after ms milliseconds
		 * @param {number} ms milliseconds
		 * @returns {Promise}
		 */
		Promise.prototype.delay = function(ms) {
			var p = this._beget();
			this._handler.fold(handleDelay, ms, void 0, p._handler);
			return p;
		};

		function handleDelay(ms, x, h) {
			setTimeout(resolveDelay, ms, x, h);
		}

		function resolveDelay(x, h) {
			h.resolve(x);
		}

		/**
		 * Return a new promise that rejects after ms milliseconds unless
		 * this promise fulfills earlier, in which case the returned promise
		 * fulfills with the same value.
		 * @param {number} ms milliseconds
		 * @param {Error|*=} reason optional rejection reason to use, defaults
		 *   to a TimeoutError if not provided
		 * @returns {Promise}
		 */
		Promise.prototype.timeout = function(ms, reason) {
			var p = this._beget();
			var h = p._handler;

			var t = setTimeout(onTimeout, ms, reason, p._handler);

			this._handler.visit(h,
				function onFulfill(x) {
					env.clearTimer(t);
					this.resolve(x); // this = h
				},
				function onReject(x) {
					env.clearTimer(t);
					this.reject(x); // this = h
				},
				h.notify);

			return p;
		};

		function onTimeout(reason, h, ms) {
			var e = typeof reason === 'undefined'
				? new TimeoutError('timed out after ' + ms + 'ms')
				: reason;
			h.reject(e);
		}

		return Promise;
	};

});
}(typeof define === 'function' && define.amd ? define : function(factory) { module.exports = factory(_dereq_); }));

},{"../TimeoutError":63,"../env":74}],72:[function(_dereq_,module,exports){
/** @license MIT License (c) copyright 2010-2014 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */

(function(define) { 'use strict';
define(function(_dereq_) {

	var setTimer = _dereq_('../env').setTimer;
	var format = _dereq_('../format');

	return function unhandledRejection(Promise) {

		var logError = noop;
		var logInfo = noop;
		var localConsole;

		if(typeof console !== 'undefined') {
			// Alias console to prevent things like uglify's drop_console option from
			// removing console.log/error. Unhandled rejections fall into the same
			// category as uncaught exceptions, and build tools shouldn't silence them.
			localConsole = console;
			logError = typeof localConsole.error !== 'undefined'
				? function (e) { localConsole.error(e); }
				: function (e) { localConsole.log(e); };

			logInfo = typeof localConsole.info !== 'undefined'
				? function (e) { localConsole.info(e); }
				: function (e) { localConsole.log(e); };
		}

		Promise.onPotentiallyUnhandledRejection = function(rejection) {
			enqueue(report, rejection);
		};

		Promise.onPotentiallyUnhandledRejectionHandled = function(rejection) {
			enqueue(unreport, rejection);
		};

		Promise.onFatalRejection = function(rejection) {
			enqueue(throwit, rejection.value);
		};

		var tasks = [];
		var reported = [];
		var running = null;

		function report(r) {
			if(!r.handled) {
				reported.push(r);
				logError('Potentially unhandled rejection [' + r.id + '] ' + format.formatError(r.value));
			}
		}

		function unreport(r) {
			var i = reported.indexOf(r);
			if(i >= 0) {
				reported.splice(i, 1);
				logInfo('Handled previous rejection [' + r.id + '] ' + format.formatObject(r.value));
			}
		}

		function enqueue(f, x) {
			tasks.push(f, x);
			if(running === null) {
				running = setTimer(flush, 0);
			}
		}

		function flush() {
			running = null;
			while(tasks.length > 0) {
				tasks.shift()(tasks.shift());
			}
		}

		return Promise;
	};

	function throwit(e) {
		throw e;
	}

	function noop() {}

});
}(typeof define === 'function' && define.amd ? define : function(factory) { module.exports = factory(_dereq_); }));

},{"../env":74,"../format":75}],73:[function(_dereq_,module,exports){
/** @license MIT License (c) copyright 2010-2014 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */

(function(define) { 'use strict';
define(function() {

	return function addWith(Promise) {
		/**
		 * Returns a promise whose handlers will be called with `this` set to
		 * the supplied receiver.  Subsequent promises derived from the
		 * returned promise will also have their handlers called with receiver
		 * as `this`. Calling `with` with undefined or no arguments will return
		 * a promise whose handlers will again be called in the usual Promises/A+
		 * way (no `this`) thus safely undoing any previous `with` in the
		 * promise chain.
		 *
		 * WARNING: Promises returned from `with`/`withThis` are NOT Promises/A+
		 * compliant, specifically violating 2.2.5 (http://promisesaplus.com/#point-41)
		 *
		 * @param {object} receiver `this` value for all handlers attached to
		 *  the returned promise.
		 * @returns {Promise}
		 */
		Promise.prototype['with'] = Promise.prototype.withThis = function(receiver) {
			var p = this._beget();
			var child = p._handler;
			child.receiver = receiver;
			this._handler.chain(child, receiver);
			return p;
		};

		return Promise;
	};

});
}(typeof define === 'function' && define.amd ? define : function(factory) { module.exports = factory(); }));


},{}],74:[function(_dereq_,module,exports){
(function (process){
/** @license MIT License (c) copyright 2010-2014 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */

/*global process,document,setTimeout,clearTimeout,MutationObserver,WebKitMutationObserver*/
(function(define) { 'use strict';
define(function(_dereq_) {
	/*jshint maxcomplexity:6*/

	// Sniff "best" async scheduling option
	// Prefer process.nextTick or MutationObserver, then check for
	// setTimeout, and finally vertx, since its the only env that doesn't
	// have setTimeout

	var MutationObs;
	var capturedSetTimeout = typeof setTimeout !== 'undefined' && setTimeout;

	// Default env
	var setTimer = function(f, ms) { return setTimeout(f, ms); };
	var clearTimer = function(t) { return clearTimeout(t); };
	var asap = function (f) { return capturedSetTimeout(f, 0); };

	// Detect specific env
	if (isNode()) { // Node
		asap = function (f) { return process.nextTick(f); };

	} else if (MutationObs = hasMutationObserver()) { // Modern browser
		asap = initMutationObserver(MutationObs);

	} else if (!capturedSetTimeout) { // vert.x
		var vertxRequire = _dereq_;
		var vertx = vertxRequire('vertx');
		setTimer = function (f, ms) { return vertx.setTimer(ms, f); };
		clearTimer = vertx.cancelTimer;
		asap = vertx.runOnLoop || vertx.runOnContext;
	}

	return {
		setTimer: setTimer,
		clearTimer: clearTimer,
		asap: asap
	};

	function isNode () {
		return typeof process !== 'undefined' && process !== null &&
			typeof process.nextTick === 'function';
	}

	function hasMutationObserver () {
		return (typeof MutationObserver === 'function' && MutationObserver) ||
			(typeof WebKitMutationObserver === 'function' && WebKitMutationObserver);
	}

	function initMutationObserver(MutationObserver) {
		var scheduled;
		var node = document.createTextNode('');
		var o = new MutationObserver(run);
		o.observe(node, { characterData: true });

		function run() {
			var f = scheduled;
			scheduled = void 0;
			f();
		}

		var i = 0;
		return function (f) {
			scheduled = f;
			node.data = (i ^= 1);
		};
	}
});
}(typeof define === 'function' && define.amd ? define : function(factory) { module.exports = factory(_dereq_); }));

}).call(this,_dereq_('_process'))
},{"_process":36}],75:[function(_dereq_,module,exports){
/** @license MIT License (c) copyright 2010-2014 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */

(function(define) { 'use strict';
define(function() {

	return {
		formatError: formatError,
		formatObject: formatObject,
		tryStringify: tryStringify
	};

	/**
	 * Format an error into a string.  If e is an Error and has a stack property,
	 * it's returned.  Otherwise, e is formatted using formatObject, with a
	 * warning added about e not being a proper Error.
	 * @param {*} e
	 * @returns {String} formatted string, suitable for output to developers
	 */
	function formatError(e) {
		var s = typeof e === 'object' && e !== null && e.stack ? e.stack : formatObject(e);
		return e instanceof Error ? s : s + ' (WARNING: non-Error used)';
	}

	/**
	 * Format an object, detecting "plain" objects and running them through
	 * JSON.stringify if possible.
	 * @param {Object} o
	 * @returns {string}
	 */
	function formatObject(o) {
		var s = String(o);
		if(s === '[object Object]' && typeof JSON !== 'undefined') {
			s = tryStringify(o, s);
		}
		return s;
	}

	/**
	 * Try to return the result of JSON.stringify(x).  If that fails, return
	 * defaultValue
	 * @param {*} x
	 * @param {*} defaultValue
	 * @returns {String|*} JSON.stringify(x) or defaultValue
	 */
	function tryStringify(x, defaultValue) {
		try {
			return JSON.stringify(x);
		} catch(e) {
			return defaultValue;
		}
	}

});
}(typeof define === 'function' && define.amd ? define : function(factory) { module.exports = factory(); }));

},{}],76:[function(_dereq_,module,exports){
(function (process){
/** @license MIT License (c) copyright 2010-2014 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */

(function(define) { 'use strict';
define(function() {

	return function makePromise(environment) {

		var tasks = environment.scheduler;
		var emitRejection = initEmitRejection();

		var objectCreate = Object.create ||
			function(proto) {
				function Child() {}
				Child.prototype = proto;
				return new Child();
			};

		/**
		 * Create a promise whose fate is determined by resolver
		 * @constructor
		 * @returns {Promise} promise
		 * @name Promise
		 */
		function Promise(resolver, handler) {
			this._handler = resolver === Handler ? handler : init(resolver);
		}

		/**
		 * Run the supplied resolver
		 * @param resolver
		 * @returns {Pending}
		 */
		function init(resolver) {
			var handler = new Pending();

			try {
				resolver(promiseResolve, promiseReject, promiseNotify);
			} catch (e) {
				promiseReject(e);
			}

			return handler;

			/**
			 * Transition from pre-resolution state to post-resolution state, notifying
			 * all listeners of the ultimate fulfillment or rejection
			 * @param {*} x resolution value
			 */
			function promiseResolve (x) {
				handler.resolve(x);
			}
			/**
			 * Reject this promise with reason, which will be used verbatim
			 * @param {Error|*} reason rejection reason, strongly suggested
			 *   to be an Error type
			 */
			function promiseReject (reason) {
				handler.reject(reason);
			}

			/**
			 * @deprecated
			 * Issue a progress event, notifying all progress listeners
			 * @param {*} x progress event payload to pass to all listeners
			 */
			function promiseNotify (x) {
				handler.notify(x);
			}
		}

		// Creation

		Promise.resolve = resolve;
		Promise.reject = reject;
		Promise.never = never;

		Promise._defer = defer;
		Promise._handler = getHandler;

		/**
		 * Returns a trusted promise. If x is already a trusted promise, it is
		 * returned, otherwise returns a new trusted Promise which follows x.
		 * @param  {*} x
		 * @return {Promise} promise
		 */
		function resolve(x) {
			return isPromise(x) ? x
				: new Promise(Handler, new Async(getHandler(x)));
		}

		/**
		 * Return a reject promise with x as its reason (x is used verbatim)
		 * @param {*} x
		 * @returns {Promise} rejected promise
		 */
		function reject(x) {
			return new Promise(Handler, new Async(new Rejected(x)));
		}

		/**
		 * Return a promise that remains pending forever
		 * @returns {Promise} forever-pending promise.
		 */
		function never() {
			return foreverPendingPromise; // Should be frozen
		}

		/**
		 * Creates an internal {promise, resolver} pair
		 * @private
		 * @returns {Promise}
		 */
		function defer() {
			return new Promise(Handler, new Pending());
		}

		// Transformation and flow control

		/**
		 * Transform this promise's fulfillment value, returning a new Promise
		 * for the transformed result.  If the promise cannot be fulfilled, onRejected
		 * is called with the reason.  onProgress *may* be called with updates toward
		 * this promise's fulfillment.
		 * @param {function=} onFulfilled fulfillment handler
		 * @param {function=} onRejected rejection handler
		 * @param {function=} onProgress @deprecated progress handler
		 * @return {Promise} new promise
		 */
		Promise.prototype.then = function(onFulfilled, onRejected, onProgress) {
			var parent = this._handler;
			var state = parent.join().state();

			if ((typeof onFulfilled !== 'function' && state > 0) ||
				(typeof onRejected !== 'function' && state < 0)) {
				// Short circuit: value will not change, simply share handler
				return new this.constructor(Handler, parent);
			}

			var p = this._beget();
			var child = p._handler;

			parent.chain(child, parent.receiver, onFulfilled, onRejected, onProgress);

			return p;
		};

		/**
		 * If this promise cannot be fulfilled due to an error, call onRejected to
		 * handle the error. Shortcut for .then(undefined, onRejected)
		 * @param {function?} onRejected
		 * @return {Promise}
		 */
		Promise.prototype['catch'] = function(onRejected) {
			return this.then(void 0, onRejected);
		};

		/**
		 * Creates a new, pending promise of the same type as this promise
		 * @private
		 * @returns {Promise}
		 */
		Promise.prototype._beget = function() {
			return begetFrom(this._handler, this.constructor);
		};

		function begetFrom(parent, Promise) {
			var child = new Pending(parent.receiver, parent.join().context);
			return new Promise(Handler, child);
		}

		// Array combinators

		Promise.all = all;
		Promise.race = race;
		Promise._traverse = traverse;

		/**
		 * Return a promise that will fulfill when all promises in the
		 * input array have fulfilled, or will reject when one of the
		 * promises rejects.
		 * @param {array} promises array of promises
		 * @returns {Promise} promise for array of fulfillment values
		 */
		function all(promises) {
			return traverseWith(snd, null, promises);
		}

		/**
		 * Array<Promise<X>> -> Promise<Array<f(X)>>
		 * @private
		 * @param {function} f function to apply to each promise's value
		 * @param {Array} promises array of promises
		 * @returns {Promise} promise for transformed values
		 */
		function traverse(f, promises) {
			return traverseWith(tryCatch2, f, promises);
		}

		function traverseWith(tryMap, f, promises) {
			var handler = typeof f === 'function' ? mapAt : settleAt;

			var resolver = new Pending();
			var pending = promises.length >>> 0;
			var results = new Array(pending);

			for (var i = 0, x; i < promises.length && !resolver.resolved; ++i) {
				x = promises[i];

				if (x === void 0 && !(i in promises)) {
					--pending;
					continue;
				}

				traverseAt(promises, handler, i, x, resolver);
			}

			if(pending === 0) {
				resolver.become(new Fulfilled(results));
			}

			return new Promise(Handler, resolver);

			function mapAt(i, x, resolver) {
				if(!resolver.resolved) {
					traverseAt(promises, settleAt, i, tryMap(f, x, i), resolver);
				}
			}

			function settleAt(i, x, resolver) {
				results[i] = x;
				if(--pending === 0) {
					resolver.become(new Fulfilled(results));
				}
			}
		}

		function traverseAt(promises, handler, i, x, resolver) {
			if (maybeThenable(x)) {
				var h = getHandlerMaybeThenable(x);
				var s = h.state();

				if (s === 0) {
					h.fold(handler, i, void 0, resolver);
				} else if (s > 0) {
					handler(i, h.value, resolver);
				} else {
					resolver.become(h);
					visitRemaining(promises, i+1, h);
				}
			} else {
				handler(i, x, resolver);
			}
		}

		Promise._visitRemaining = visitRemaining;
		function visitRemaining(promises, start, handler) {
			for(var i=start; i<promises.length; ++i) {
				markAsHandled(getHandler(promises[i]), handler);
			}
		}

		function markAsHandled(h, handler) {
			if(h === handler) {
				return;
			}

			var s = h.state();
			if(s === 0) {
				h.visit(h, void 0, h._unreport);
			} else if(s < 0) {
				h._unreport();
			}
		}

		/**
		 * Fulfill-reject competitive race. Return a promise that will settle
		 * to the same state as the earliest input promise to settle.
		 *
		 * WARNING: The ES6 Promise spec requires that race()ing an empty array
		 * must return a promise that is pending forever.  This implementation
		 * returns a singleton forever-pending promise, the same singleton that is
		 * returned by Promise.never(), thus can be checked with ===
		 *
		 * @param {array} promises array of promises to race
		 * @returns {Promise} if input is non-empty, a promise that will settle
		 * to the same outcome as the earliest input promise to settle. if empty
		 * is empty, returns a promise that will never settle.
		 */
		function race(promises) {
			if(typeof promises !== 'object' || promises === null) {
				return reject(new TypeError('non-iterable passed to race()'));
			}

			// Sigh, race([]) is untestable unless we return *something*
			// that is recognizable without calling .then() on it.
			return promises.length === 0 ? never()
				 : promises.length === 1 ? resolve(promises[0])
				 : runRace(promises);
		}

		function runRace(promises) {
			var resolver = new Pending();
			var i, x, h;
			for(i=0; i<promises.length; ++i) {
				x = promises[i];
				if (x === void 0 && !(i in promises)) {
					continue;
				}

				h = getHandler(x);
				if(h.state() !== 0) {
					resolver.become(h);
					visitRemaining(promises, i+1, h);
					break;
				} else {
					h.visit(resolver, resolver.resolve, resolver.reject);
				}
			}
			return new Promise(Handler, resolver);
		}

		// Promise internals
		// Below this, everything is @private

		/**
		 * Get an appropriate handler for x, without checking for cycles
		 * @param {*} x
		 * @returns {object} handler
		 */
		function getHandler(x) {
			if(isPromise(x)) {
				return x._handler.join();
			}
			return maybeThenable(x) ? getHandlerUntrusted(x) : new Fulfilled(x);
		}

		/**
		 * Get a handler for thenable x.
		 * NOTE: You must only call this if maybeThenable(x) == true
		 * @param {object|function|Promise} x
		 * @returns {object} handler
		 */
		function getHandlerMaybeThenable(x) {
			return isPromise(x) ? x._handler.join() : getHandlerUntrusted(x);
		}

		/**
		 * Get a handler for potentially untrusted thenable x
		 * @param {*} x
		 * @returns {object} handler
		 */
		function getHandlerUntrusted(x) {
			try {
				var untrustedThen = x.then;
				return typeof untrustedThen === 'function'
					? new Thenable(untrustedThen, x)
					: new Fulfilled(x);
			} catch(e) {
				return new Rejected(e);
			}
		}

		/**
		 * Handler for a promise that is pending forever
		 * @constructor
		 */
		function Handler() {}

		Handler.prototype.when
			= Handler.prototype.become
			= Handler.prototype.notify // deprecated
			= Handler.prototype.fail
			= Handler.prototype._unreport
			= Handler.prototype._report
			= noop;

		Handler.prototype._state = 0;

		Handler.prototype.state = function() {
			return this._state;
		};

		/**
		 * Recursively collapse handler chain to find the handler
		 * nearest to the fully resolved value.
		 * @returns {object} handler nearest the fully resolved value
		 */
		Handler.prototype.join = function() {
			var h = this;
			while(h.handler !== void 0) {
				h = h.handler;
			}
			return h;
		};

		Handler.prototype.chain = function(to, receiver, fulfilled, rejected, progress) {
			this.when({
				resolver: to,
				receiver: receiver,
				fulfilled: fulfilled,
				rejected: rejected,
				progress: progress
			});
		};

		Handler.prototype.visit = function(receiver, fulfilled, rejected, progress) {
			this.chain(failIfRejected, receiver, fulfilled, rejected, progress);
		};

		Handler.prototype.fold = function(f, z, c, to) {
			this.when(new Fold(f, z, c, to));
		};

		/**
		 * Handler that invokes fail() on any handler it becomes
		 * @constructor
		 */
		function FailIfRejected() {}

		inherit(Handler, FailIfRejected);

		FailIfRejected.prototype.become = function(h) {
			h.fail();
		};

		var failIfRejected = new FailIfRejected();

		/**
		 * Handler that manages a queue of consumers waiting on a pending promise
		 * @constructor
		 */
		function Pending(receiver, inheritedContext) {
			Promise.createContext(this, inheritedContext);

			this.consumers = void 0;
			this.receiver = receiver;
			this.handler = void 0;
			this.resolved = false;
		}

		inherit(Handler, Pending);

		Pending.prototype._state = 0;

		Pending.prototype.resolve = function(x) {
			this.become(getHandler(x));
		};

		Pending.prototype.reject = function(x) {
			if(this.resolved) {
				return;
			}

			this.become(new Rejected(x));
		};

		Pending.prototype.join = function() {
			if (!this.resolved) {
				return this;
			}

			var h = this;

			while (h.handler !== void 0) {
				h = h.handler;
				if (h === this) {
					return this.handler = cycle();
				}
			}

			return h;
		};

		Pending.prototype.run = function() {
			var q = this.consumers;
			var handler = this.handler;
			this.handler = this.handler.join();
			this.consumers = void 0;

			for (var i = 0; i < q.length; ++i) {
				handler.when(q[i]);
			}
		};

		Pending.prototype.become = function(handler) {
			if(this.resolved) {
				return;
			}

			this.resolved = true;
			this.handler = handler;
			if(this.consumers !== void 0) {
				tasks.enqueue(this);
			}

			if(this.context !== void 0) {
				handler._report(this.context);
			}
		};

		Pending.prototype.when = function(continuation) {
			if(this.resolved) {
				tasks.enqueue(new ContinuationTask(continuation, this.handler));
			} else {
				if(this.consumers === void 0) {
					this.consumers = [continuation];
				} else {
					this.consumers.push(continuation);
				}
			}
		};

		/**
		 * @deprecated
		 */
		Pending.prototype.notify = function(x) {
			if(!this.resolved) {
				tasks.enqueue(new ProgressTask(x, this));
			}
		};

		Pending.prototype.fail = function(context) {
			var c = typeof context === 'undefined' ? this.context : context;
			this.resolved && this.handler.join().fail(c);
		};

		Pending.prototype._report = function(context) {
			this.resolved && this.handler.join()._report(context);
		};

		Pending.prototype._unreport = function() {
			this.resolved && this.handler.join()._unreport();
		};

		/**
		 * Wrap another handler and force it into a future stack
		 * @param {object} handler
		 * @constructor
		 */
		function Async(handler) {
			this.handler = handler;
		}

		inherit(Handler, Async);

		Async.prototype.when = function(continuation) {
			tasks.enqueue(new ContinuationTask(continuation, this));
		};

		Async.prototype._report = function(context) {
			this.join()._report(context);
		};

		Async.prototype._unreport = function() {
			this.join()._unreport();
		};

		/**
		 * Handler that wraps an untrusted thenable and assimilates it in a future stack
		 * @param {function} then
		 * @param {{then: function}} thenable
		 * @constructor
		 */
		function Thenable(then, thenable) {
			Pending.call(this);
			tasks.enqueue(new AssimilateTask(then, thenable, this));
		}

		inherit(Pending, Thenable);

		/**
		 * Handler for a fulfilled promise
		 * @param {*} x fulfillment value
		 * @constructor
		 */
		function Fulfilled(x) {
			Promise.createContext(this);
			this.value = x;
		}

		inherit(Handler, Fulfilled);

		Fulfilled.prototype._state = 1;

		Fulfilled.prototype.fold = function(f, z, c, to) {
			runContinuation3(f, z, this, c, to);
		};

		Fulfilled.prototype.when = function(cont) {
			runContinuation1(cont.fulfilled, this, cont.receiver, cont.resolver);
		};

		var errorId = 0;

		/**
		 * Handler for a rejected promise
		 * @param {*} x rejection reason
		 * @constructor
		 */
		function Rejected(x) {
			Promise.createContext(this);

			this.id = ++errorId;
			this.value = x;
			this.handled = false;
			this.reported = false;

			this._report();
		}

		inherit(Handler, Rejected);

		Rejected.prototype._state = -1;

		Rejected.prototype.fold = function(f, z, c, to) {
			to.become(this);
		};

		Rejected.prototype.when = function(cont) {
			if(typeof cont.rejected === 'function') {
				this._unreport();
			}
			runContinuation1(cont.rejected, this, cont.receiver, cont.resolver);
		};

		Rejected.prototype._report = function(context) {
			tasks.afterQueue(new ReportTask(this, context));
		};

		Rejected.prototype._unreport = function() {
			if(this.handled) {
				return;
			}
			this.handled = true;
			tasks.afterQueue(new UnreportTask(this));
		};

		Rejected.prototype.fail = function(context) {
			this.reported = true;
			emitRejection('unhandledRejection', this);
			Promise.onFatalRejection(this, context === void 0 ? this.context : context);
		};

		function ReportTask(rejection, context) {
			this.rejection = rejection;
			this.context = context;
		}

		ReportTask.prototype.run = function() {
			if(!this.rejection.handled && !this.rejection.reported) {
				this.rejection.reported = true;
				emitRejection('unhandledRejection', this.rejection) ||
					Promise.onPotentiallyUnhandledRejection(this.rejection, this.context);
			}
		};

		function UnreportTask(rejection) {
			this.rejection = rejection;
		}

		UnreportTask.prototype.run = function() {
			if(this.rejection.reported) {
				emitRejection('rejectionHandled', this.rejection) ||
					Promise.onPotentiallyUnhandledRejectionHandled(this.rejection);
			}
		};

		// Unhandled rejection hooks
		// By default, everything is a noop

		Promise.createContext
			= Promise.enterContext
			= Promise.exitContext
			= Promise.onPotentiallyUnhandledRejection
			= Promise.onPotentiallyUnhandledRejectionHandled
			= Promise.onFatalRejection
			= noop;

		// Errors and singletons

		var foreverPendingHandler = new Handler();
		var foreverPendingPromise = new Promise(Handler, foreverPendingHandler);

		function cycle() {
			return new Rejected(new TypeError('Promise cycle'));
		}

		// Task runners

		/**
		 * Run a single consumer
		 * @constructor
		 */
		function ContinuationTask(continuation, handler) {
			this.continuation = continuation;
			this.handler = handler;
		}

		ContinuationTask.prototype.run = function() {
			this.handler.join().when(this.continuation);
		};

		/**
		 * Run a queue of progress handlers
		 * @constructor
		 */
		function ProgressTask(value, handler) {
			this.handler = handler;
			this.value = value;
		}

		ProgressTask.prototype.run = function() {
			var q = this.handler.consumers;
			if(q === void 0) {
				return;
			}

			for (var c, i = 0; i < q.length; ++i) {
				c = q[i];
				runNotify(c.progress, this.value, this.handler, c.receiver, c.resolver);
			}
		};

		/**
		 * Assimilate a thenable, sending it's value to resolver
		 * @param {function} then
		 * @param {object|function} thenable
		 * @param {object} resolver
		 * @constructor
		 */
		function AssimilateTask(then, thenable, resolver) {
			this._then = then;
			this.thenable = thenable;
			this.resolver = resolver;
		}

		AssimilateTask.prototype.run = function() {
			var h = this.resolver;
			tryAssimilate(this._then, this.thenable, _resolve, _reject, _notify);

			function _resolve(x) { h.resolve(x); }
			function _reject(x)  { h.reject(x); }
			function _notify(x)  { h.notify(x); }
		};

		function tryAssimilate(then, thenable, resolve, reject, notify) {
			try {
				then.call(thenable, resolve, reject, notify);
			} catch (e) {
				reject(e);
			}
		}

		/**
		 * Fold a handler value with z
		 * @constructor
		 */
		function Fold(f, z, c, to) {
			this.f = f; this.z = z; this.c = c; this.to = to;
			this.resolver = failIfRejected;
			this.receiver = this;
		}

		Fold.prototype.fulfilled = function(x) {
			this.f.call(this.c, this.z, x, this.to);
		};

		Fold.prototype.rejected = function(x) {
			this.to.reject(x);
		};

		Fold.prototype.progress = function(x) {
			this.to.notify(x);
		};

		// Other helpers

		/**
		 * @param {*} x
		 * @returns {boolean} true iff x is a trusted Promise
		 */
		function isPromise(x) {
			return x instanceof Promise;
		}

		/**
		 * Test just enough to rule out primitives, in order to take faster
		 * paths in some code
		 * @param {*} x
		 * @returns {boolean} false iff x is guaranteed *not* to be a thenable
		 */
		function maybeThenable(x) {
			return (typeof x === 'object' || typeof x === 'function') && x !== null;
		}

		function runContinuation1(f, h, receiver, next) {
			if(typeof f !== 'function') {
				return next.become(h);
			}

			Promise.enterContext(h);
			tryCatchReject(f, h.value, receiver, next);
			Promise.exitContext();
		}

		function runContinuation3(f, x, h, receiver, next) {
			if(typeof f !== 'function') {
				return next.become(h);
			}

			Promise.enterContext(h);
			tryCatchReject3(f, x, h.value, receiver, next);
			Promise.exitContext();
		}

		/**
		 * @deprecated
		 */
		function runNotify(f, x, h, receiver, next) {
			if(typeof f !== 'function') {
				return next.notify(x);
			}

			Promise.enterContext(h);
			tryCatchReturn(f, x, receiver, next);
			Promise.exitContext();
		}

		function tryCatch2(f, a, b) {
			try {
				return f(a, b);
			} catch(e) {
				return reject(e);
			}
		}

		/**
		 * Return f.call(thisArg, x), or if it throws return a rejected promise for
		 * the thrown exception
		 */
		function tryCatchReject(f, x, thisArg, next) {
			try {
				next.become(getHandler(f.call(thisArg, x)));
			} catch(e) {
				next.become(new Rejected(e));
			}
		}

		/**
		 * Same as above, but includes the extra argument parameter.
		 */
		function tryCatchReject3(f, x, y, thisArg, next) {
			try {
				f.call(thisArg, x, y, next);
			} catch(e) {
				next.become(new Rejected(e));
			}
		}

		/**
		 * @deprecated
		 * Return f.call(thisArg, x), or if it throws, *return* the exception
		 */
		function tryCatchReturn(f, x, thisArg, next) {
			try {
				next.notify(f.call(thisArg, x));
			} catch(e) {
				next.notify(e);
			}
		}

		function inherit(Parent, Child) {
			Child.prototype = objectCreate(Parent.prototype);
			Child.prototype.constructor = Child;
		}

		function snd(x, y) {
			return y;
		}

		function noop() {}

		function initEmitRejection() {
			/*global process, self, CustomEvent*/
			if(typeof process !== 'undefined' && process !== null
				&& typeof process.emit === 'function') {
				// Returning falsy here means to call the default
				// onPotentiallyUnhandledRejection API.  This is safe even in
				// browserify since process.emit always returns falsy in browserify:
				// https://github.com/defunctzombie/node-process/blob/master/browser.js#L40-L46
				return function(type, rejection) {
					return type === 'unhandledRejection'
						? process.emit(type, rejection.value, rejection)
						: process.emit(type, rejection);
				};
			} else if(typeof self !== 'undefined' && typeof CustomEvent === 'function') {
				return (function(noop, self, CustomEvent) {
					var hasCustomEvent = false;
					try {
						var ev = new CustomEvent('unhandledRejection');
						hasCustomEvent = ev instanceof CustomEvent;
					} catch (e) {}

					return !hasCustomEvent ? noop : function(type, rejection) {
						var ev = new CustomEvent(type, {
							detail: {
								reason: rejection.value,
								key: rejection
							},
							bubbles: false,
							cancelable: true
						});

						return !self.dispatchEvent(ev);
					};
				}(noop, self, CustomEvent));
			}

			return noop;
		}

		return Promise;
	};
});
}(typeof define === 'function' && define.amd ? define : function(factory) { module.exports = factory(); }));

}).call(this,_dereq_('_process'))
},{"_process":36}],77:[function(_dereq_,module,exports){
/** @license MIT License (c) copyright 2010-2014 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */

(function(define) { 'use strict';
define(function() {

	return {
		pending: toPendingState,
		fulfilled: toFulfilledState,
		rejected: toRejectedState,
		inspect: inspect
	};

	function toPendingState() {
		return { state: 'pending' };
	}

	function toRejectedState(e) {
		return { state: 'rejected', reason: e };
	}

	function toFulfilledState(x) {
		return { state: 'fulfilled', value: x };
	}

	function inspect(handler) {
		var state = handler.state();
		return state === 0 ? toPendingState()
			 : state > 0   ? toFulfilledState(handler.value)
			               : toRejectedState(handler.value);
	}

});
}(typeof define === 'function' && define.amd ? define : function(factory) { module.exports = factory(); }));

},{}],78:[function(_dereq_,module,exports){
/** @license MIT License (c) copyright 2010-2014 original author or authors */

/**
 * Promises/A+ and when() implementation
 * when is part of the cujoJS family of libraries (http://cujojs.com/)
 * @author Brian Cavalier
 * @author John Hann
 * @version 3.7.2
 */
(function(define) { 'use strict';
define(function (_dereq_) {

	var timed = _dereq_('./lib/decorators/timed');
	var array = _dereq_('./lib/decorators/array');
	var flow = _dereq_('./lib/decorators/flow');
	var fold = _dereq_('./lib/decorators/fold');
	var inspect = _dereq_('./lib/decorators/inspect');
	var generate = _dereq_('./lib/decorators/iterate');
	var progress = _dereq_('./lib/decorators/progress');
	var withThis = _dereq_('./lib/decorators/with');
	var unhandledRejection = _dereq_('./lib/decorators/unhandledRejection');
	var TimeoutError = _dereq_('./lib/TimeoutError');

	var Promise = [array, flow, fold, generate, progress,
		inspect, withThis, timed, unhandledRejection]
		.reduce(function(Promise, feature) {
			return feature(Promise);
		}, _dereq_('./lib/Promise'));

	var apply = _dereq_('./lib/apply')(Promise);

	// Public API

	when.promise     = promise;              // Create a pending promise
	when.resolve     = Promise.resolve;      // Create a resolved promise
	when.reject      = Promise.reject;       // Create a rejected promise

	when.lift        = lift;                 // lift a function to return promises
	when['try']      = attempt;              // call a function and return a promise
	when.attempt     = attempt;              // alias for when.try

	when.iterate     = Promise.iterate;      // DEPRECATED (use cujojs/most streams) Generate a stream of promises
	when.unfold      = Promise.unfold;       // DEPRECATED (use cujojs/most streams) Generate a stream of promises

	when.join        = join;                 // Join 2 or more promises

	when.all         = all;                  // Resolve a list of promises
	when.settle      = settle;               // Settle a list of promises

	when.any         = lift(Promise.any);    // One-winner race
	when.some        = lift(Promise.some);   // Multi-winner race
	when.race        = lift(Promise.race);   // First-to-settle race

	when.map         = map;                  // Array.map() for promises
	when.filter      = filter;               // Array.filter() for promises
	when.reduce      = lift(Promise.reduce);       // Array.reduce() for promises
	when.reduceRight = lift(Promise.reduceRight);  // Array.reduceRight() for promises

	when.isPromiseLike = isPromiseLike;      // Is something promise-like, aka thenable

	when.Promise     = Promise;              // Promise constructor
	when.defer       = defer;                // Create a {promise, resolve, reject} tuple

	// Error types

	when.TimeoutError = TimeoutError;

	/**
	 * Get a trusted promise for x, or by transforming x with onFulfilled
	 *
	 * @param {*} x
	 * @param {function?} onFulfilled callback to be called when x is
	 *   successfully fulfilled.  If promiseOrValue is an immediate value, callback
	 *   will be invoked immediately.
	 * @param {function?} onRejected callback to be called when x is
	 *   rejected.
	 * @param {function?} onProgress callback to be called when progress updates
	 *   are issued for x. @deprecated
	 * @returns {Promise} a new promise that will fulfill with the return
	 *   value of callback or errback or the completion value of promiseOrValue if
	 *   callback and/or errback is not supplied.
	 */
	function when(x, onFulfilled, onRejected, onProgress) {
		var p = Promise.resolve(x);
		if (arguments.length < 2) {
			return p;
		}

		return p.then(onFulfilled, onRejected, onProgress);
	}

	/**
	 * Creates a new promise whose fate is determined by resolver.
	 * @param {function} resolver function(resolve, reject, notify)
	 * @returns {Promise} promise whose fate is determine by resolver
	 */
	function promise(resolver) {
		return new Promise(resolver);
	}

	/**
	 * Lift the supplied function, creating a version of f that returns
	 * promises, and accepts promises as arguments.
	 * @param {function} f
	 * @returns {Function} version of f that returns promises
	 */
	function lift(f) {
		return function() {
			for(var i=0, l=arguments.length, a=new Array(l); i<l; ++i) {
				a[i] = arguments[i];
			}
			return apply(f, this, a);
		};
	}

	/**
	 * Call f in a future turn, with the supplied args, and return a promise
	 * for the result.
	 * @param {function} f
	 * @returns {Promise}
	 */
	function attempt(f /*, args... */) {
		/*jshint validthis:true */
		for(var i=0, l=arguments.length-1, a=new Array(l); i<l; ++i) {
			a[i] = arguments[i+1];
		}
		return apply(f, this, a);
	}

	/**
	 * Creates a {promise, resolver} pair, either or both of which
	 * may be given out safely to consumers.
	 * @return {{promise: Promise, resolve: function, reject: function, notify: function}}
	 */
	function defer() {
		return new Deferred();
	}

	function Deferred() {
		var p = Promise._defer();

		function resolve(x) { p._handler.resolve(x); }
		function reject(x) { p._handler.reject(x); }
		function notify(x) { p._handler.notify(x); }

		this.promise = p;
		this.resolve = resolve;
		this.reject = reject;
		this.notify = notify;
		this.resolver = { resolve: resolve, reject: reject, notify: notify };
	}

	/**
	 * Determines if x is promise-like, i.e. a thenable object
	 * NOTE: Will return true for *any thenable object*, and isn't truly
	 * safe, since it may attempt to access the `then` property of x (i.e.
	 *  clever/malicious getters may do weird things)
	 * @param {*} x anything
	 * @returns {boolean} true if x is promise-like
	 */
	function isPromiseLike(x) {
		return x && typeof x.then === 'function';
	}

	/**
	 * Return a promise that will resolve only once all the supplied arguments
	 * have resolved. The resolution value of the returned promise will be an array
	 * containing the resolution values of each of the arguments.
	 * @param {...*} arguments may be a mix of promises and values
	 * @returns {Promise}
	 */
	function join(/* ...promises */) {
		return Promise.all(arguments);
	}

	/**
	 * Return a promise that will fulfill once all input promises have
	 * fulfilled, or reject when any one input promise rejects.
	 * @param {array|Promise} promises array (or promise for an array) of promises
	 * @returns {Promise}
	 */
	function all(promises) {
		return when(promises, Promise.all);
	}

	/**
	 * Return a promise that will always fulfill with an array containing
	 * the outcome states of all input promises.  The returned promise
	 * will only reject if `promises` itself is a rejected promise.
	 * @param {array|Promise} promises array (or promise for an array) of promises
	 * @returns {Promise} promise for array of settled state descriptors
	 */
	function settle(promises) {
		return when(promises, Promise.settle);
	}

	/**
	 * Promise-aware array map function, similar to `Array.prototype.map()`,
	 * but input array may contain promises or values.
	 * @param {Array|Promise} promises array of anything, may contain promises and values
	 * @param {function(x:*, index:Number):*} mapFunc map function which may
	 *  return a promise or value
	 * @returns {Promise} promise that will fulfill with an array of mapped values
	 *  or reject if any input promise rejects.
	 */
	function map(promises, mapFunc) {
		return when(promises, function(promises) {
			return Promise.map(promises, mapFunc);
		});
	}

	/**
	 * Filter the provided array of promises using the provided predicate.  Input may
	 * contain promises and values
	 * @param {Array|Promise} promises array of promises and values
	 * @param {function(x:*, index:Number):boolean} predicate filtering predicate.
	 *  Must return truthy (or promise for truthy) for items to retain.
	 * @returns {Promise} promise that will fulfill with an array containing all items
	 *  for which predicate returned truthy.
	 */
	function filter(promises, predicate) {
		return when(promises, function(promises) {
			return Promise.filter(promises, predicate);
		});
	}

	return when;
});
})(typeof define === 'function' && define.amd ? define : function (factory) { module.exports = factory(_dereq_); });

},{"./lib/Promise":61,"./lib/TimeoutError":63,"./lib/apply":64,"./lib/decorators/array":65,"./lib/decorators/flow":66,"./lib/decorators/fold":67,"./lib/decorators/inspect":68,"./lib/decorators/iterate":69,"./lib/decorators/progress":70,"./lib/decorators/timed":71,"./lib/decorators/unhandledRejection":72,"./lib/decorators/with":73}],79:[function(_dereq_,module,exports){
/*
 * Copyright 2013 the original author or authors
 * @license MIT, see LICENSE.txt for details
 *
 * @author Scott Andrews
 */

(function (define) {
	'use strict';

	define(function (/* require */) {

		return {

			/**
			 * Find objects within a graph the contain a property of a certain name.
			 *
			 * NOTE: this method will not discover object graph cycles.
			 *
			 * @param {*} obj object to search on
			 * @param {string} prop name of the property to search for
			 * @param {Function} callback function to receive the found properties and their parent
			 */
			findProperties: function findProperties(obj, prop, callback) {
				if (typeof obj !== 'object' || obj === null) { return; }
				if (prop in obj) {
					callback(obj[prop], obj, prop);
				}
				Object.keys(obj).forEach(function (key) {
					findProperties(obj[key], prop, callback);
				});
			}

		};

	});

}(
	typeof define === 'function' && define.amd ? define : function (factory) { module.exports = factory(_dereq_); }
	// Boilerplate for AMD and Node
));

},{}],80:[function(_dereq_,module,exports){
/*
 * Copyright 2013 the original author or authors
 * @license MIT, see LICENSE.txt for details
 *
 * @author Scott Andrews
 */

(function (define) {
	'use strict';

	define(function (_dereq_) {

		var when;

		when = _dereq_('when');

		/**
		 * Create a promise whose work is started only when a handler is registered.
		 *
		 * The work function will be invoked at most once. Thrown values will result
		 * in promise rejection.
		 *
		 * @param {Function} work function whose ouput is used to resolve the
		 *   returned promise.
		 * @returns {Promise} a lazy promise
		 */
		function lazyPromise(work) {
			var defer, started, resolver, promise, then;

			defer = when.defer();
			started = false;

			resolver = defer.resolver;
			promise = defer.promise;
			then = promise.then;

			promise.then = function () {
				if (!started) {
					started = true;
					when.attempt(work).then(resolver.resolve, resolver.reject);
				}
				return then.apply(promise, arguments);
			};

			return promise;
		}

		return lazyPromise;

	});

}(
	typeof define === 'function' && define.amd ? define : function (factory) { module.exports = factory(_dereq_); }
	// Boilerplate for AMD and Node
));

},{"when":78}],81:[function(_dereq_,module,exports){
/*
 * Copyright 2012-2013 the original author or authors
 * @license MIT, see LICENSE.txt for details
 *
 * @author Scott Andrews
 */

(function (define) {
	'use strict';

	// derived from dojo.mixin
	define(function (/* require */) {

		var empty = {};

		/**
		 * Mix the properties from the source object into the destination object.
		 * When the same property occurs in more then one object, the right most
		 * value wins.
		 *
		 * @param {Object} dest the object to copy properties to
		 * @param {Object} sources the objects to copy properties from.  May be 1 to N arguments, but not an Array.
		 * @return {Object} the destination object
		 */
		function mixin(dest /*, sources... */) {
			var i, l, source, name;

			if (!dest) { dest = {}; }
			for (i = 1, l = arguments.length; i < l; i += 1) {
				source = arguments[i];
				for (name in source) {
					if (!(name in dest) || (dest[name] !== source[name] && (!(name in empty) || empty[name] !== source[name]))) {
						dest[name] = source[name];
					}
				}
			}

			return dest; // Object
		}

		return mixin;

	});

}(
	typeof define === 'function' && define.amd ? define : function (factory) { module.exports = factory(_dereq_); }
	// Boilerplate for AMD and Node
));

},{}],82:[function(_dereq_,module,exports){
/*
 * Copyright 2012 the original author or authors
 * @license MIT, see LICENSE.txt for details
 *
 * @author Scott Andrews
 */

(function (define) {
	'use strict';

	define(function (/* require */) {

		/**
		 * Normalize HTTP header names using the pseudo camel case.
		 *
		 * For example:
		 *   content-type         -> Content-Type
		 *   accepts              -> Accepts
		 *   x-custom-header-name -> X-Custom-Header-Name
		 *
		 * @param {string} name the raw header name
		 * @return {string} the normalized header name
		 */
		function normalizeHeaderName(name) {
			return name.toLowerCase()
				.split('-')
				.map(function (chunk) { return chunk.charAt(0).toUpperCase() + chunk.slice(1); })
				.join('-');
		}

		return normalizeHeaderName;

	});

}(
	typeof define === 'function' && define.amd ? define : function (factory) { module.exports = factory(_dereq_); }
	// Boilerplate for AMD and Node
));

},{}],83:[function(_dereq_,module,exports){
/*
 * Copyright 2014-2015 the original author or authors
 * @license MIT, see LICENSE.txt for details
 *
 * @author Scott Andrews
 */

(function (define) {
	'use strict';

	define(function (_dereq_) {

		var when = _dereq_('when'),
			normalizeHeaderName = _dereq_('./normalizeHeaderName');

		function property(promise, name) {
			return promise.then(
				function (value) {
					return value && value[name];
				},
				function (value) {
					return when.reject(value && value[name]);
				}
			);
		}

		/**
		 * Obtain the response entity
		 *
		 * @returns {Promise} for the response entity
		 */
		function entity() {
			/*jshint validthis:true */
			return property(this, 'entity');
		}

		/**
		 * Obtain the response status
		 *
		 * @returns {Promise} for the response status
		 */
		function status() {
			/*jshint validthis:true */
			return property(property(this, 'status'), 'code');
		}

		/**
		 * Obtain the response headers map
		 *
		 * @returns {Promise} for the response headers map
		 */
		function headers() {
			/*jshint validthis:true */
			return property(this, 'headers');
		}

		/**
		 * Obtain a specific response header
		 *
		 * @param {String} headerName the header to retrieve
		 * @returns {Promise} for the response header's value
		 */
		function header(headerName) {
			/*jshint validthis:true */
			headerName = normalizeHeaderName(headerName);
			return property(this.headers(), headerName);
		}

		/**
		 * Follow a related resource
		 *
		 * The relationship to follow may be define as a plain string, an object
		 * with the rel and params, or an array containing one or more entries
		 * with the previous forms.
		 *
		 * Examples:
		 *   response.follow('next')
		 *
		 *   response.follow({ rel: 'next', params: { pageSize: 100 } })
		 *
		 *   response.follow([
		 *       { rel: 'items', params: { projection: 'noImages' } },
		 *       'search',
		 *       { rel: 'findByGalleryIsNull', params: { projection: 'noImages' } },
		 *       'items'
		 *   ])
		 *
		 * @param {String|Object|Array} rels one, or more, relationships to follow
		 * @returns ResponsePromise<Response> related resource
		 */
		function follow(rels) {
			/*jshint validthis:true */
			rels = [].concat(rels);
			return make(when.reduce(rels, function (response, rel) {
				if (typeof rel === 'string') {
					rel = { rel: rel };
				}
				if (typeof response.entity.clientFor !== 'function') {
					throw new Error('Hypermedia response expected');
				}
				var client = response.entity.clientFor(rel.rel);
				return client({ params: rel.params });
			}, this));
		}

		/**
		 * Wrap a Promise as an ResponsePromise
		 *
		 * @param {Promise<Response>} promise the promise for an HTTP Response
		 * @returns {ResponsePromise<Response>} wrapped promise for Response with additional helper methods
		 */
		function make(promise) {
			promise.status = status;
			promise.headers = headers;
			promise.header = header;
			promise.entity = entity;
			promise.follow = follow;
			return promise;
		}

		function responsePromise() {
			return make(when.apply(when, arguments));
		}

		responsePromise.make = make;
		responsePromise.reject = function (val) {
			return make(when.reject(val));
		};
		responsePromise.promise = function (func) {
			return make(when.promise(func));
		};

		return responsePromise;

	});

}(
	typeof define === 'function' && define.amd ? define : function (factory) { module.exports = factory(_dereq_); }
	// Boilerplate for AMD and Node
));

},{"./normalizeHeaderName":82,"when":78}],84:[function(_dereq_,module,exports){
/*
 * Copyright 2015 the original author or authors
 * @license MIT, see LICENSE.txt for details
 *
 * @author Scott Andrews
 */

(function (define) {
	'use strict';

	define(function (/* require */) {

		var charMap;

		charMap = (function () {
			var strings = {
				alpha: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
				digit: '0123456789'
			};

			strings.genDelims = ':/?#[]@';
			strings.subDelims = '!$&\'()*+,;=';
			strings.reserved = strings.genDelims + strings.subDelims;
			strings.unreserved = strings.alpha + strings.digit + '-._~';
			strings.url = strings.reserved + strings.unreserved;
			strings.scheme = strings.alpha + strings.digit + '+-.';
			strings.userinfo = strings.unreserved + strings.subDelims + ':';
			strings.host = strings.unreserved + strings.subDelims;
			strings.port = strings.digit;
			strings.pchar = strings.unreserved + strings.subDelims + ':@';
			strings.segment = strings.pchar;
			strings.path = strings.segment + '/';
			strings.query = strings.pchar + '/?';
			strings.fragment = strings.pchar + '/?';

			return Object.keys(strings).reduce(function (charMap, set) {
				charMap[set] = strings[set].split('').reduce(function (chars, singleChar) {
					chars[singleChar] = true;
					return chars;
				}, {});
				return charMap;
			}, {});
		}());

		function encode(str, allowed) {
			if (typeof str !== 'string') {
				throw new Error('String required for URL encoding');
			}
			return str.split('').map(function (singleChar) {
				if (allowed.hasOwnProperty(singleChar)) {
					return singleChar;
				}
				var code = singleChar.charCodeAt(0);
				if (code <= 127) {
					return '%' + code.toString(16).toUpperCase();
				}
				else {
					return encodeURIComponent(singleChar).toUpperCase();
				}
			}).join('');
		}

		function makeEncoder(allowed) {
			allowed = allowed || charMap.unreserved;
			return function (str) {
				return encode(str, allowed);
			};
		}

		function decode(str) {
			return decodeURIComponent(str);
		}

		return {

			/*
			 * Decode URL encoded strings
			 *
			 * @param {string} URL encoded string
			 * @returns {string} URL decoded string
			 */
			decode: decode,

			/*
			 * URL encode a string
			 *
			 * All but alpha-numerics and a very limited set of punctuation - . _ ~ are
			 * encoded.
			 *
			 * @param {string} string to encode
			 * @returns {string} URL encoded string
			 */
			encode: makeEncoder(),

			/*
			* URL encode a URL
			*
			* All character permitted anywhere in a URL are left unencoded even
			* if that character is not permitted in that portion of a URL.
			*
			* Note: This method is typically not what you want.
			*
			* @param {string} string to encode
			* @returns {string} URL encoded string
			*/
			encodeURL: makeEncoder(charMap.url),

			/*
			 * URL encode the scheme portion of a URL
			 *
			 * @param {string} string to encode
			 * @returns {string} URL encoded string
			 */
			encodeScheme: makeEncoder(charMap.scheme),

			/*
			 * URL encode the user info portion of a URL
			 *
			 * @param {string} string to encode
			 * @returns {string} URL encoded string
			 */
			encodeUserInfo: makeEncoder(charMap.userinfo),

			/*
			 * URL encode the host portion of a URL
			 *
			 * @param {string} string to encode
			 * @returns {string} URL encoded string
			 */
			encodeHost: makeEncoder(charMap.host),

			/*
			 * URL encode the port portion of a URL
			 *
			 * @param {string} string to encode
			 * @returns {string} URL encoded string
			 */
			encodePort: makeEncoder(charMap.port),

			/*
			 * URL encode a path segment portion of a URL
			 *
			 * @param {string} string to encode
			 * @returns {string} URL encoded string
			 */
			encodePathSegment: makeEncoder(charMap.segment),

			/*
			 * URL encode the path portion of a URL
			 *
			 * @param {string} string to encode
			 * @returns {string} URL encoded string
			 */
			encodePath: makeEncoder(charMap.path),

			/*
			 * URL encode the query portion of a URL
			 *
			 * @param {string} string to encode
			 * @returns {string} URL encoded string
			 */
			encodeQuery: makeEncoder(charMap.query),

			/*
			 * URL encode the fragment portion of a URL
			 *
			 * @param {string} string to encode
			 * @returns {string} URL encoded string
			 */
			encodeFragment: makeEncoder(charMap.fragment)

		};

	});

}(
	typeof define === 'function' && define.amd ? define : function (factory) { module.exports = factory(_dereq_); }
	// Boilerplate for AMD and Node
));

},{}],85:[function(_dereq_,module,exports){
/*
 * Copyright 2015 the original author or authors
 * @license MIT, see LICENSE.txt for details
 *
 * @author Scott Andrews
 */

(function (define) {
	'use strict';

	var undef;

	define(function (_dereq_) {

		var uriEncoder, operations, prefixRE;

		uriEncoder = _dereq_('./uriEncoder');

		prefixRE = /^([^:]*):([0-9]+)$/;
		operations = {
			'':  { first: '',  separator: ',', named: false, empty: '',  encoder: uriEncoder.encode },
			'+': { first: '',  separator: ',', named: false, empty: '',  encoder: uriEncoder.encodeURL },
			'#': { first: '#', separator: ',', named: false, empty: '',  encoder: uriEncoder.encodeURL },
			'.': { first: '.', separator: '.', named: false, empty: '',  encoder: uriEncoder.encode },
			'/': { first: '/', separator: '/', named: false, empty: '',  encoder: uriEncoder.encode },
			';': { first: ';', separator: ';', named: true,  empty: '',  encoder: uriEncoder.encode },
			'?': { first: '?', separator: '&', named: true,  empty: '=', encoder: uriEncoder.encode },
			'&': { first: '&', separator: '&', named: true,  empty: '=', encoder: uriEncoder.encode },
			'=': { reserved: true },
			',': { reserved: true },
			'!': { reserved: true },
			'@': { reserved: true },
			'|': { reserved: true }
		};

		function apply(operation, expression, params) {
			/*jshint maxcomplexity:11 */
			return expression.split(',').reduce(function (result, variable) {
				var opts, value;

				opts = {};
				if (variable.slice(-1) === '*') {
					variable = variable.slice(0, -1);
					opts.explode = true;
				}
				if (prefixRE.test(variable)) {
					var prefix = prefixRE.exec(variable);
					variable = prefix[1];
					opts.maxLength = parseInt(prefix[2]);
				}

				variable = uriEncoder.decode(variable);
				value = params[variable];

				if (value === undef || value === null) {
					return result;
				}
				if (typeof value === 'string') {
					if (opts.maxLength) {
						value = value.slice(0, opts.maxLength);
					}
					result += result.length ? operation.separator : operation.first;
					if (operation.named) {
						result += operation.encoder(variable);
						result += value.length ? '=' : operation.empty;
					}
					result += operation.encoder(value);
				}
				else if (Array.isArray(value)) {
					result += value.reduce(function (result, value) {
						if (result.length) {
							result += opts.explode ? operation.separator : ',';
							if (operation.named && opts.explode) {
								result += operation.encoder(variable);
								result += value.length ? '=' : operation.empty;
							}
						}
						else {
							result += operation.first;
							if (operation.named) {
								result += operation.encoder(variable);
								result += value.length ? '=' : operation.empty;
							}
						}
						result += operation.encoder(value);
						return result;
					}, '');
				}
				else {
					result += Object.keys(value).reduce(function (result, name) {
						if (result.length) {
							result += opts.explode ? operation.separator : ',';
						}
						else {
							result += operation.first;
							if (operation.named && !opts.explode) {
								result += operation.encoder(variable);
								result += value[name].length ? '=' : operation.empty;
							}
						}
						result += operation.encoder(name);
						result += opts.explode ? '=' : ',';
						result += operation.encoder(value[name]);
						return result;
					}, '');
				}

				return result;
			}, '');
		}

		function expandExpression(expression, params) {
			var operation;

			operation = operations[expression.slice(0,1)];
			if (operation) {
				expression = expression.slice(1);
			}
			else {
				operation = operations[''];
			}

			if (operation.reserved) {
				throw new Error('Reserved expression operations are not supported');
			}

			return apply(operation, expression, params);
		}

		function expandTemplate(template, params) {
			var start, end, uri;

			uri = '';
			end = 0;
			while (true) {
				start = template.indexOf('{', end);
				if (start === -1) {
					// no more expressions
					uri += template.slice(end);
					break;
				}
				uri += template.slice(end, start);
				end = template.indexOf('}', start) + 1;
				uri += expandExpression(template.slice(start + 1, end - 1), params);
			}

			return uri;
		}

		return {

			/**
			 * Expand a URI Template with parameters to form a URI.
			 *
			 * Full implementation (level 4) of rfc6570.
			 * @see https://tools.ietf.org/html/rfc6570
			 *
			 * @param {string} template URI template
			 * @param {Object} [params] params to apply to the template durring expantion
			 * @returns {string} expanded URI
			 */
			expand: expandTemplate

		};

	});

}(
	typeof define === 'function' && define.amd ? define : function (factory) { module.exports = factory(_dereq_); }
	// Boilerplate for AMD and Node
));

},{"./uriEncoder":84}]},{},[1]);
