(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
var Core = _dereq_('./core'),
	View = _dereq_('../lib/View');

if (typeof window !== 'undefined') {
	window.ForerunnerDB = Core;
}
module.exports = Core;
},{"../lib/View":33,"./core":2}],2:[function(_dereq_,module,exports){
var Core = _dereq_('../lib/Core'),
	ShimIE8 = _dereq_('../lib/Shim.IE8');

if (typeof window !== 'undefined') {
	window.ForerunnerDB = Core;
}
module.exports = Core;
},{"../lib/Core":8,"../lib/Shim.IE8":32}],3:[function(_dereq_,module,exports){
"use strict";

var Shared = _dereq_('./Shared'),
	Path = _dereq_('./Path'),
	sharedPathSolver;

/**
 * Creates an always-sorted multi-key bucket that allows ForerunnerDB to
 * know the index that a document will occupy in an array with minimal
 * processing, speeding up things like sorted views.
 * @param {Object} orderBy An order object.
 * @class
 */
var ActiveBucket = function (orderBy) {
	this._primaryKey = '_id';
	this._keyArr = [];
	this._data = [];
	this._objLookup = {};
	this._count = 0;

	this._keyArr = sharedPathSolver.parse(orderBy, true);
};

Shared.addModule('ActiveBucket', ActiveBucket);
Shared.mixin(ActiveBucket.prototype, 'Mixin.Sorting');

sharedPathSolver = new Path();

/**
 * Gets / sets the primary key used by the active bucket.
 * @returns {String} The current primary key.
 */
Shared.synthesize(ActiveBucket.prototype, 'primaryKey');

/**
 * Quicksorts a single document into the passed array and
 * returns the index that the document should occupy.
 * @param {Object} obj The document to calculate index for.
 * @param {Array} arr The array the document index will be
 * calculated for.
 * @param {String} item The string key representation of the
 * document whose index is being calculated.
 * @param {Function} fn The comparison function that is used
 * to determine if a document is sorted below or above the
 * document we are calculating the index for.
 * @returns {Number} The index the document should occupy.
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
 * @param {Object} sorter An object or instance that contains
 * sortAsc and sortDesc methods.
 * @param {Object} obj The document to compare.
 * @param {String} a The first key to compare.
 * @param {String} b The second key to compare.
 * @returns {Number} Either 1 for sort a after b or -1 to sort
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
		castType = typeof sharedPathSolver.get(obj, sortType.path);

		if (castType === 'number') {
			aVals[index] = Number(aVals[index]);
			bVals[index] = Number(bVals[index]);
		}

		// Check for non-equal items
		if (aVals[index] !== bVals[index]) {
			// Return the sorted items
			if (sortType.value === 1) {
				return sorter.sortAsc(aVals[index], bVals[index]);
			}

			if (sortType.value === -1) {
				return sorter.sortDesc(aVals[index], bVals[index]);
			}
		}
	}
};

/**
 * Inserts a document into the active bucket.
 * @param {Object} obj The document to insert.
 * @returns {Number} The index the document now occupies.
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
 * @param {Object} obj The document to remove.
 * @returns {Number} The index of the document if the document
 * was removed successfully or -1 if it wasn't found in the
 * active bucket.
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
			return keyIndex;
		} else {
			return keyIndex;
		}
	}

	return -1;
};

/**
 * Get the index that the passed document currently occupies
 * or the index it will occupy if added to the active bucket.
 * @param {Object} obj The document to get the index for.
 * @returns {Number} The index.
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
 * @param {Object} obj The document to get the key for.
 * @returns {String} The document key.
 */
ActiveBucket.prototype.documentKey = function (obj) {
	var key = '',
		arr = this._keyArr,
		count = arr.length,
		val,
		index,
		sortType;
	
	for (index = 0; index < count; index++) {
		sortType = arr[index];
		
		if (key) {
			key += '.:.';
		}
		
		val = sharedPathSolver.get(obj, sortType.path);
		
		if (val !== undefined) {
			// The value of the sort path in the object is not undefined
			key += val;
		} else {
			// The value of the sort path in the object is undefined. This
			// will cause sorting issues. undefined is therefore recorded
			// as string zero which will sort to low value.
			key += "0";
		}
	}
	
	// Add the unique identifier on the end of the key
	key += '.:.' + obj[this._primaryKey];
	
	return key;
};

/**
 * Get the number of documents currently indexed in the active
 * bucket instance.
 * @returns {Number} The number of documents.
 */
ActiveBucket.prototype.count = function () {
	return this._count;
};

Shared.finishModule('ActiveBucket');
module.exports = ActiveBucket;
},{"./Path":28,"./Shared":31}],4:[function(_dereq_,module,exports){
"use strict";

var Shared = _dereq_('./Shared'),
	Path = _dereq_('./Path'),
	sharedPathSolver = new Path();

var BinaryTree = function (data, compareFunc, hashFunc) {
	this.init.apply(this, arguments);
};

BinaryTree.prototype.init = function (data, index, primaryKey, compareFunc, hashFunc) {
	this._store = [];
	this._keys = [];

	if (primaryKey !== undefined) { this.primaryKey(primaryKey); }
	if (index !== undefined) { this.index(index); }
	if (compareFunc !== undefined) { this.compareFunc(compareFunc); }
	if (hashFunc !== undefined) { this.hashFunc(hashFunc); }
	if (data !== undefined) { this.data(data); }
};

Shared.addModule('BinaryTree', BinaryTree);
Shared.mixin(BinaryTree.prototype, 'Mixin.ChainReactor');
Shared.mixin(BinaryTree.prototype, 'Mixin.Sorting');
Shared.mixin(BinaryTree.prototype, 'Mixin.Common');

Shared.synthesize(BinaryTree.prototype, 'compareFunc');
Shared.synthesize(BinaryTree.prototype, 'hashFunc');
Shared.synthesize(BinaryTree.prototype, 'indexDir');
Shared.synthesize(BinaryTree.prototype, 'primaryKey');
Shared.synthesize(BinaryTree.prototype, 'keys');
Shared.synthesize(BinaryTree.prototype, 'index', function (index) {
	if (index !== undefined) {
		if (this.debug()) {
			console.log('Setting index', index, sharedPathSolver.parse(index, true));
		}

		// Convert the index object to an array of key val objects
		this.keys(sharedPathSolver.parse(index, true));
	}

	return this.$super.call(this, index);
});

/**
 * Remove all data from the binary tree.
 */
BinaryTree.prototype.clear = function () {
	delete this._data;
	delete this._left;
	delete this._right;

	this._store = [];
};

/**
 * Sets this node's data object. All further inserted documents that
 * match this node's key and value will be pushed via the push()
 * method into the this._store array. When deciding if a new data
 * should be created left, right or middle (pushed) of this node the
 * new data is checked against the data set via this method.
 * @param val
 * @returns {*}
 */
BinaryTree.prototype.data = function (val) {
	if (val !== undefined) {
		this._data = val;

		if (this._hashFunc) { this._hash = this._hashFunc(val); }
		return this;
	}

	return this._data;
};

/**
 * Pushes an item to the binary tree node's store array.
 * @param {*} val The item to add to the store.
 * @returns {*}
 */
BinaryTree.prototype.push = function (val) {
	if (val !== undefined) {
		this._store.push(val);
		return this;
	}

	return false;
};

/**
 * Pulls an item from the binary tree node's store array.
 * @param {*} val The item to remove from the store.
 * @returns {*}
 */
BinaryTree.prototype.pull = function (val) {
	if (val !== undefined) {
		var index = this._store.indexOf(val);

		if (index > -1) {
			this._store.splice(index, 1);
			return this;
		}
	}

	return false;
};

/**
 * Default compare method. Can be overridden.
 * @param a
 * @param b
 * @returns {Number}
 * @private
 */
BinaryTree.prototype._compareFunc = function (a, b) {
	// Loop the index array
	var i,
		indexData,
		result = 0;

	for (i = 0; i < this._keys.length; i++) {
		indexData = this._keys[i];

		if (indexData.value === 1) {
			result = this.sortAscIgnoreUndefined(sharedPathSolver.get(a, indexData.path), sharedPathSolver.get(b, indexData.path));
		} else if (indexData.value === -1) {
			result = this.sortDescIgnoreUndefined(sharedPathSolver.get(a, indexData.path), sharedPathSolver.get(b, indexData.path));
		}

		if (this.debug()) {
			console.log('Compared %s with %s order %d in path %s and result was %d', sharedPathSolver.get(a, indexData.path), sharedPathSolver.get(b, indexData.path), indexData.value, indexData.path, result);
		}

		if (result !== 0) {
			if (this.debug()) {
				console.log('Retuning result %d', result);
			}
			return result;
		}
	}

	if (this.debug()) {
		console.log('Retuning result %d', result);
	}

	return result;
};

/**
 * Default hash function. Can be overridden.
 * @param obj
 * @private
 */
BinaryTree.prototype._hashFunc = function (obj) {
	/*var i,
		indexData,
		hash = '';

	for (i = 0; i < this._keys.length; i++) {
		indexData = this._keys[i];

		if (hash) { hash += '_'; }
		hash += obj[indexData.path];
	}

	return hash;*/

	return obj[this._keys[0].path];
};

/**
 * Removes (deletes reference to) either left or right child if the passed
 * node matches one of them.
 * @param {BinaryTree} node The node to remove.
 */
BinaryTree.prototype.removeChildNode = function (node) {
	if (this._left === node) {
		// Remove left
		delete this._left;
	} else if (this._right === node) {
		// Remove right
		delete this._right;
	}
};

/**
 * Returns the branch this node matches (left or right).
 * @param node
 * @returns {String}
 */
BinaryTree.prototype.nodeBranch = function (node) {
	if (this._left === node) {
		return 'left';
	} else if (this._right === node) {
		return 'right';
	}
};

/**
 * Inserts a document into the binary tree.
 * @param data
 * @returns {*}
 */
BinaryTree.prototype.insert = function (data) {
	var result,
		inserted,
		failed,
		i;

	if (data instanceof Array) {
		// Insert array of data
		inserted = [];
		failed = [];

		for (i = 0; i < data.length; i++) {
			if (this.insert(data[i])) {
				inserted.push(data[i]);
			} else {
				failed.push(data[i]);
			}
		}

		return {
			inserted: inserted,
			failed: failed
		};
	}

	if (this.debug()) {
		console.log('Inserting', data);
	}

	if (!this._data) {
		if (this.debug()) {
			console.log('Node has no data, setting data', data);
		}
		// Insert into this node (overwrite) as there is no data
		this.data(data);
		//this.push(data);
		return true;
	}

	result = this._compareFunc(this._data, data);

	if (result === 0) {
		if (this.debug()) {
			console.log('Data is equal (currrent, new)', this._data, data);
		}

		//this.push(data);

		// Less than this node
		if (this._left) {
			// Propagate down the left branch
			this._left.insert(data);
		} else {
			// Assign to left branch
			this._left = new BinaryTree(data, this._index, this._binaryTree, this._compareFunc, this._hashFunc);
			this._left._parent = this;
		}

		return true;
	}

	if (result === -1) {
		if (this.debug()) {
			console.log('Data is greater (currrent, new)', this._data, data);
		}

		// Greater than this node
		if (this._right) {
			// Propagate down the right branch
			this._right.insert(data);
		} else {
			// Assign to right branch
			this._right = new BinaryTree(data, this._index, this._binaryTree, this._compareFunc, this._hashFunc);
			this._right._parent = this;
		}

		return true;
	}

	if (result === 1) {
		if (this.debug()) {
			console.log('Data is less (currrent, new)', this._data, data);
		}

		// Less than this node
		if (this._left) {
			// Propagate down the left branch
			this._left.insert(data);
		} else {
			// Assign to left branch
			this._left = new BinaryTree(data, this._index, this._binaryTree, this._compareFunc, this._hashFunc);
			this._left._parent = this;
		}

		return true;
	}

	return false;
};

BinaryTree.prototype.remove = function (data) {
	var pk = this.primaryKey(),
		result,
		removed,
		i;

	if (data instanceof Array) {
		// Insert array of data
		removed = [];

		for (i = 0; i < data.length; i++) {
			if (this.remove(data[i])) {
				removed.push(data[i]);
			}
		}

		return removed;
	}

	if (this.debug()) {
		console.log('Removing', data);
	}

	if (this._data[pk] === data[pk]) {
		// Remove this node
		return this._remove(this);
	}

	// Compare the data to work out which branch to send the remove command down
	result = this._compareFunc(this._data, data);

	if (result === -1 && this._right) {
		return this._right.remove(data);
	}

	if (result === 1 && this._left) {
		return this._left.remove(data);
	}

	return false;
};

BinaryTree.prototype._remove = function (node) {
	var leftNode,
		rightNode;

	if (this._left) {
		// Backup branch data
		leftNode = this._left;
		rightNode = this._right;

		// Copy data from left node
		this._left = leftNode._left;
		this._right = leftNode._right;
		this._data = leftNode._data;
		this._store = leftNode._store;

		if (rightNode) {
			// Attach the rightNode data to the right-most node
			// of the leftNode
			leftNode.rightMost()._right = rightNode;
		}
	} else if (this._right) {
		// Backup branch data
		rightNode = this._right;

		// Copy data from right node
		this._left = rightNode._left;
		this._right = rightNode._right;
		this._data = rightNode._data;
		this._store = rightNode._store;
	} else {
		this.clear();
	}

	return true;
};

BinaryTree.prototype.leftMost = function () {
	if (!this._left) {
		return this;
	} else {
		return this._left.leftMost();
	}
};

BinaryTree.prototype.rightMost = function () {
	if (!this._right) {
		return this;
	} else {
		return this._right.rightMost();
	}
};

/**
 * Searches the binary tree for all matching documents based on the data
 * passed (query).
 * @param {Object} data The data / document to use for lookups.
 * @param {Object} options An options object.
 * @param {Operation} op An optional operation instance. Pass undefined
 * if not being used.
 * @param {Array=} resultArr The results passed between recursive calls.
 * Do not pass anything into this argument when calling externally.
 * @returns {*|Array}
 */
BinaryTree.prototype.lookup = function (data, options, op, resultArr) {
	var result = this._compareFunc(this._data, data);

	resultArr = resultArr || [];

	if (result === 0) {
		if (this._left) { this._left.lookup(data, options, op, resultArr); }
		resultArr.push(this._data);
		if (this._right) { this._right.lookup(data, options, op, resultArr); }
	}

	if (result === -1) {
		if (this._right) { this._right.lookup(data, options, op, resultArr); }
	}

	if (result === 1) {
		if (this._left) { this._left.lookup(data, options, op, resultArr); }
	}

	return resultArr;
};

/**
 * Returns the entire binary tree ordered.
 * @param {String} type
 * @param resultArr
 * @returns {*|Array}
 */
BinaryTree.prototype.inOrder = function (type, resultArr) {
	resultArr = resultArr || [];

	if (this._left) {
		this._left.inOrder(type, resultArr);
	}

	switch (type) {
		case 'hash':
			resultArr.push(this._hash);
			break;

		case 'data':
			resultArr.push(this._data);
			break;

		default:
			resultArr.push({
				key: this._data,
				arr: this._store
			});
			break;
	}

	if (this._right) {
		this._right.inOrder(type, resultArr);
	}

	return resultArr;
};

/**
 * Searches the binary tree for all matching documents based on the regular
 * expression passed.
 * @param path
 * @param val
 * @param regex
 * @param {Array=} resultArr The results passed between recursive calls.
 * Do not pass anything into this argument when calling externally.
 * @returns {*|Array}
 */
BinaryTree.prototype.startsWith = function (path, val, regex, resultArr) {
	var reTest,
		thisDataPathVal = sharedPathSolver.get(this._data, path),
		thisDataPathValSubStr = thisDataPathVal.substr(0, val.length),
		result;

	//regex = regex || new RegExp('^' + val);
	resultArr = resultArr || [];

	if (resultArr._visitedCount === undefined) { resultArr._visitedCount = 0; }
	resultArr._visitedCount++;
	resultArr._visitedNodes = resultArr._visitedNodes || [];
	resultArr._visitedNodes.push(thisDataPathVal);

	result = this.sortAscIgnoreUndefined(thisDataPathValSubStr, val);
	reTest = thisDataPathValSubStr === val;

	if (result === 0) {
		if (this._left) { this._left.startsWith(path, val, regex, resultArr); }
		if (reTest) { resultArr.push(this._data); }
		if (this._right) { this._right.startsWith(path, val, regex, resultArr); }
	}

	if (result === -1) {
		if (reTest) { resultArr.push(this._data); }
		if (this._right) { this._right.startsWith(path, val, regex, resultArr); }
	}

	if (result === 1) {
		if (this._left) { this._left.startsWith(path, val, regex, resultArr); }
		if (reTest) { resultArr.push(this._data); }
	}

	return resultArr;
};

/*BinaryTree.prototype.find = function (type, search, resultArr) {
	resultArr = resultArr || [];

	if (this._left) {
		this._left.find(type, search, resultArr);
	}

	// Check if this node's data is greater or less than the from value
	var fromResult = this.sortAsc(this._data[key], from),
			toResult = this.sortAsc(this._data[key], to);

	if ((fromResult === 0 || fromResult === 1) && (toResult === 0 || toResult === -1)) {
		// This data node is greater than or equal to the from value,
		// and less than or equal to the to value so include it
		switch (type) {
			case 'hash':
				resultArr.push(this._hash);
				break;

			case 'data':
				resultArr.push(this._data);
				break;

			default:
				resultArr.push({
					key: this._data,
					arr: this._store
				});
				break;
		}
	}

	if (this._right) {
		this._right.find(type, search, resultArr);
	}

	return resultArr;
};*/

/**
 *
 * @param {String} type
 * @param {String} key The data key / path to range search against.
 * @param {Number} from Range search from this value (inclusive)
 * @param {Number} to Range search to this value (inclusive)
 * @param {Array=} resultArr Leave undefined when calling (internal use),
 * passes the result array between recursive calls to be returned when
 * the recursion chain completes.
 * @param {Path=} pathResolver Leave undefined when calling (internal use),
 * caches the path resolver instance for performance.
 * @returns {Array} Array of matching document objects
 */
BinaryTree.prototype.findRange = function (type, key, from, to, resultArr, pathResolver) {
	resultArr = resultArr || [];
	pathResolver = pathResolver || new Path(key);

	if (this._left) {
		this._left.findRange(type, key, from, to, resultArr, pathResolver);
	}

	// Check if this node's data is greater or less than the from value
	var pathVal = pathResolver.value(this._data),
		fromResult = this.sortAscIgnoreUndefined(pathVal, from),
		toResult = this.sortAscIgnoreUndefined(pathVal, to);

	if ((fromResult === 0 || fromResult === 1) && (toResult === 0 || toResult === -1)) {
		// This data node is greater than or equal to the from value,
		// and less than or equal to the to value so include it
		switch (type) {
			case 'hash':
				resultArr.push(this._hash);
				break;

			case 'data':
				resultArr.push(this._data);
				break;

			default:
				resultArr.push({
					key: this._data,
					arr: this._store
				});
				break;
		}
	}

	if (this._right) {
		this._right.findRange(type, key, from, to, resultArr, pathResolver);
	}

	return resultArr;
};

/*BinaryTree.prototype.findRegExp = function (type, key, pattern, resultArr) {
	resultArr = resultArr || [];

	if (this._left) {
		this._left.findRegExp(type, key, pattern, resultArr);
	}

	// Check if this node's data is greater or less than the from value
	var fromResult = this.sortAsc(this._data[key], from),
			toResult = this.sortAsc(this._data[key], to);

	if ((fromResult === 0 || fromResult === 1) && (toResult === 0 || toResult === -1)) {
		// This data node is greater than or equal to the from value,
		// and less than or equal to the to value so include it
		switch (type) {
			case 'hash':
				resultArr.push(this._hash);
				break;

			case 'data':
				resultArr.push(this._data);
				break;

			default:
				resultArr.push({
					key: this._data,
					arr: this._store
				});
				break;
		}
	}

	if (this._right) {
		this._right.findRegExp(type, key, pattern, resultArr);
	}

	return resultArr;
};*/

/**
 * Determines if the passed query and options object will be served
 * by this index successfully or not and gives a score so that the
 * DB search system can determine how useful this index is in comparison
 * to other indexes on the same collection.
 * @param query
 * @param queryOptions
 * @param matchOptions
 * @returns {{matchedKeys: Array, totalKeyCount: Number, score: number}}
 */
BinaryTree.prototype.match = function (query, queryOptions, matchOptions) {
	// Check if the passed query has data in the keys our index
	// operates on and if so, is the query sort matching our order
	var indexKeyArr,
		queryArr,
		matchedKeys = [],
		matchedKeyCount = 0,
		i;

	indexKeyArr = sharedPathSolver.parseArr(this._index, {
		verbose: true
	});

	queryArr = sharedPathSolver.parseArr(query, matchOptions && matchOptions.pathOptions ? matchOptions.pathOptions : {
		ignore:/\$/,
		verbose: true
	});

	// Loop the query array and check the order of keys against the
	// index key array to see if this index can be used
	for (i = 0; i < indexKeyArr.length; i++) {
		if (queryArr[i] === indexKeyArr[i]) {
			matchedKeyCount++;
			matchedKeys.push(queryArr[i]);
		}
	}

	return {
		matchedKeys: matchedKeys,
		totalKeyCount: queryArr.length,
		score: matchedKeyCount
	};

	//return sharedPathSolver.countObjectPaths(this._keys, query);
};

Shared.finishModule('BinaryTree');
module.exports = BinaryTree;
},{"./Path":28,"./Shared":31}],5:[function(_dereq_,module,exports){
"use strict";

var Shared,
	Db,
	Metrics,
	KeyValueStore,
	Path,
	IndexHashMap,
	IndexBinaryTree,
	Index2d,
	Overload,
	ReactorIO,
	Condition,
	sharedPathSolver;

Shared = _dereq_('./Shared');

/**
 * Creates a new collection. Collections store multiple documents and
 * handle CRUD against those documents.
 * @constructor
 * @class
 */
var Collection = function (name, options) {
	this.init.apply(this, arguments);
};

/**
 * Creates a new collection. Collections store multiple documents and
 * handle CRUD against those documents.
 */
Collection.prototype.init = function (name, options) {
	// Ensure we have an options object
	options = options || {};
	
	// Set internals
	this.sharedPathSolver = sharedPathSolver;
	this._primaryKey = options.primaryKey || '_id';
	this._primaryIndex = new KeyValueStore('primary', {primaryKey: this.primaryKey()});
	this._primaryCrc = new KeyValueStore('primaryCrc', {primaryKey: this.primaryKey()});
	this._crcLookup = new KeyValueStore('crcLookup', {primaryKey: this.primaryKey()});
	this._name = name;
	this._data = [];
	this._metrics = new Metrics();

	this._options = options || {
		changeTimestamp: false
	};

	if (this._options.db) {
		this.db(this._options.db);
	}

	// Create an object to store internal protected data
	this._metaData = {};

	this._deferQueue = {
		insert: [],
		update: [],
		remove: [],
		upsert: [],
		async: []
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

	this._deferredCalls = true;

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
Shared.mixin(Collection.prototype, 'Mixin.Tags');

Metrics = _dereq_('./Metrics');
KeyValueStore = _dereq_('./KeyValueStore');
Path = _dereq_('./Path');
IndexHashMap = _dereq_('./IndexHashMap');
IndexBinaryTree = _dereq_('./IndexBinaryTree');
Index2d = _dereq_('./Index2d');
Db = Shared.modules.Db;
Overload = _dereq_('./Overload');
ReactorIO = _dereq_('./ReactorIO');
Condition = _dereq_('./Condition');
sharedPathSolver = new Path();

/**
 * Gets / sets the deferred calls flag. If set to true (default)
 * then operations on large data sets can be broken up and done
 * over multiple CPU cycles (creating an async state). For purely
 * synchronous behaviour set this to false.
 * @param {Boolean=} val The value to set.
 * @returns {Boolean}
 */
Shared.synthesize(Collection.prototype, 'deferredCalls');

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
 * Gets / sets the metadata stored in the collection.
 * @param {Object=} val The data to set.
 * @returns {*}
 */
Shared.synthesize(Collection.prototype, 'metaData');

/**
 * Gets / sets boolean to determine if the collection should be
 * capped or not.
 * @param {Boolean=} val The value to set.
 * @returns {*}
 */
Shared.synthesize(Collection.prototype, 'capped');

/**
 * Gets / sets capped collection size. This is the maximum number
 * of records that the capped collection will store.
 * @param {Number=} val The value to set.
 * @returns {*}
 */
Shared.synthesize(Collection.prototype, 'cappedSize');

/**
 * Adds a job id to the async queue to signal to other parts
 * of the application that some async work is currently being
 * done.
 * @param {String} key The id of the async job.
 * @private
 */
Collection.prototype._asyncPending = function (key) {
	this._deferQueue.async.push(key);
};

/**
 * Removes a job id from the async queue to signal to other
 * parts of the application that some async work has been
 * completed. If no further async jobs exist on the queue then
 * the "ready" event is emitted from this collection instance.
 * @param {String} key The id of the async job.
 * @private
 */
Collection.prototype._asyncComplete = function (key) {
	// Remove async flag for this type
	var index = this._deferQueue.async.indexOf(key);

	while (index > -1) {
		this._deferQueue.async.splice(index, 1);
		index = this._deferQueue.async.indexOf(key);
	}

	if (this._deferQueue.async.length === 0) {
		this.deferEmit('ready');
	}
};

/**
 * Get the data array that represents the collection's data.
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
 * @param {Function=} callback A callback method to call once the
 * operation has completed.
 * @returns {boolean} True on success, false on failure.
 */
Collection.prototype.drop = function (callback) {
	var key;

	if (!this.isDropped()) {
		if (this._db && this._db._collection && this._name) {
			if (this.debug()) {
				console.log(this.logIdentifier() + ' Dropping');
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
			delete this._data;
			delete this._metrics;
			delete this._listeners;

			if (callback) { callback.call(this, false, true); }

			return true;
		}
	} else {
		if (callback) { callback.call(this, false, true); }

		return true;
	}

	if (callback) { callback.call(this, false, true); }
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
			var oldKey = this._primaryKey;
			this._primaryKey = keyName;

			// Set the primary key index primary key
			this._primaryIndex.primaryKey(keyName);

			// Rebuild the primary key index
			this.rebuildPrimaryKeyIndex();

			// Propagate change down the chain
			this.chainSend('primaryKey', {
				keyName: keyName,
				oldData: oldKey
			});
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
 * Handles any change to the collection by updating the
 * lastChange timestamp on the collection's metaData. This
 * only happens if the changeTimestamp option is enabled
 * on the collection (it is disabled by default).
 * @private
 */
Collection.prototype._onChange = function () {
	if (this._options.changeTimestamp) {
		// Record the last change timestamp
		this._metaData.lastChange = this.serialiser.convert(new Date());
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

			// Apply the same debug settings
			this.debug(db.debug());
		}
	}

	return this.$super.apply(this, arguments);
});

/**
 * Gets / sets mongodb emulation mode.
 * @param {Boolean=} val True to enable, false to disable.
 * @returns {*}
 */
Shared.synthesize(Collection.prototype, 'mongoEmulation');

Collection.prototype.setData = new Overload('Collection.prototype.setData', {
	/**
	 * Sets the collection's data to the array / documents passed.  If any
	 * data already exists in the collection it will be removed before the
	 * new data is set via the remove() method, and the remove event will
	 * fire as well.
	 * @name setData
	 * @method Collection.setData
	 * @param {Array|Object} data The array of documents or a single document
	 * that will be set as the collections data.
	 */
	'*': function (data) {
		return this.$main.call(this, data, {});
	},

	/**
	 * Sets the collection's data to the array / documents passed.  If any
	 * data already exists in the collection it will be removed before the
	 * new data is set via the remove() method, and the remove event will
	 * fire as well.
	 * @name setData
	 * @method Collection.setData
	 * @param {Array|Object} data The array of documents or a single document
	 * that will be set as the collections data.
	 * @param {Object} options Optional options object.
	 */
	'*, object': function (data, options) {
		return this.$main.call(this, data, options);
	},

	/**
	 * Sets the collection's data to the array / documents passed.  If any
	 * data already exists in the collection it will be removed before the
	 * new data is set via the remove() method, and the remove event will
	 * fire as well.
	 * @name setData
	 * @method Collection.setData
	 * @param {Array|Object} data The array of documents or a single document
	 * that will be set as the collections data.
	 * @param {Function} callback Optional callback function.
	 */
	'*, function': function (data, callback) {
		return this.$main.call(this, data, {}, callback);
	},

	/**
	 * Sets the collection's data to the array / documents passed.  If any
	 * data already exists in the collection it will be removed before the
	 * new data is set via the remove() method, and the remove event will
	 * fire as well.
	 * @name setData
	 * @method Collection.setData
	 * @param {Array|Object} data The array of documents or a single document
	 * that will be set as the collections data.
	 * @param {*} options Optional options object.
	 * @param {Function} callback Optional callback function.
	 */
	'*, *, function': function (data, options, callback) {
		return this.$main.call(this, data, options, callback);
	},

	/**
	 * Sets the collection's data to the array / documents passed.  If any
	 * data already exists in the collection it will be removed before the
	 * new data is set via the remove() method, and the remove event will
	 * fire as well.
	 * @name setData
	 * @method Collection.setData
	 * @param {Array|Object} data The array of documents or a single document
	 * that will be set as the collections data.
	 * @param {*} options Optional options object.
	 * @param {*} callback Optional callback function.
	 */
	'*, *, *': function (data, options, callback) {
		return this.$main.call(this, data, options, callback);
	},

	/**
	 * Sets the collection's data to the array / documents passed.  If any
	 * data already exists in the collection it will be removed before the
	 * new data is set via the remove() method, and the remove event will
	 * fire as well.
	 * @name setData
	 * @method Collection.setData
	 * @param {Array|Object} data The array of documents or a single document
	 * that will be set as the collections data.
	 * @param {Object} options Optional options object.
	 * @param {Function} callback Optional callback function.
	 */
	'$main': function (data, options, callback) {
		if (this.isDropped()) {
			throw(this.logIdentifier() + ' Cannot operate in a dropped state!');
		}

		if (data) {
			var deferredSetting = this.deferredCalls(),
				oldData = [].concat(this._data);

			// Switch off deferred calls since setData should be
			// a synchronous call
			this.deferredCalls(false);

			options = this.options(options);

			if (options.$decouple) {
				data = this.decouple(data);
			}

			if (!(data instanceof Array)) {
				data = [data];
			}

			// Remove all items from the collection
			this.remove({});

			// Insert the new data
			this.insert(data);

			// Switch deferred calls back to previous settings
			this.deferredCalls(deferredSetting);

			this._onChange();
			this.emit('setData', this._data, oldData);
		}

		if (callback) { callback.call(this); }

		return this;
	}
});

/**
 * Drops and rebuilds the primary key index for all documents
 * in the collection.
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
				throw(this.logIdentifier() + ' Call to setData on collection failed because your data violates the primary key unique constraint. One or more documents are using the same primary key: ' + arrItem[this._primaryKey]);
			}
		} else {
			pIndex.set(arrItem[pKey], arrItem);
		}

		// Generate a hash string
		jString = this.hash(arrItem);

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
	var i;
	
	if (this.isDropped()) {
		throw(this.logIdentifier() + ' Cannot operate in a dropped state!');
	}
	// TODO: This should use remove so that chain reactor events are properly
	// TODO: handled, but ensure that chunking is switched off
	this.emit('truncate', this._data);

	// Clear all the data from the collection
	this._data.length = 0;

	// Re-create the primary index data
	this._primaryIndex = new KeyValueStore('primary', {primaryKey: this.primaryKey()});
	this._primaryCrc = new KeyValueStore('primaryCrc', {primaryKey: this.primaryKey()});
	this._crcLookup = new KeyValueStore('crcLookup', {primaryKey: this.primaryKey()});
	
	// Re-create any existing collection indexes
	// TODO: This might not be the most efficient way to do this, perhaps just re-creating
	// the indexes would be faster than calling rebuild?
	for (i in this._indexByName) {
		if (this._indexByName.hasOwnProperty(i)) {
			this._indexByName[i].rebuild();
		}
	}

	this._onChange();
	this.emit('immediateChange', {type: 'truncate'});
	this.deferEmit('change', {type: 'truncate'});

	return this;
};

/**
 * Inserts a new document or updates an existing document in a
 * collection depending on if a matching primary key exists in
 * the collection already or not.
 *
 * If the document contains a primary key field (based on the
 * collections's primary key) then the database will search for
 * an existing document with a matching id. If a matching
 * document is found, the document will be updated. Any keys that
 * match keys on the existing document will be overwritten with
 * new data. Any keys that do not currently exist on the document
 * will be added to the document.
 *
 * If the document does not contain an id or the id passed does
 * not match an existing document, an insert is performed instead.
 * If no id is present a new primary key id is provided for the
 * document and the document is inserted.
 *
 * @param {Object} obj The document object to upsert or an array
 * containing documents to upsert.
 * @param {Function=} callback Optional callback method.
 * @returns {Array} An array containing an object for each operation
 * performed. Each object contains two keys, "op" contains either "none",
 * "insert" or "update" depending on the type of operation that was
 * performed and "result" contains the return data from the operation
 * used.
 */
Collection.prototype.upsert = function (obj, callback) {
	if (this.isDropped()) {
		throw(this.logIdentifier() + ' Cannot operate in a dropped state!');
	}

	if (obj) {
		var queue = this._deferQueue.upsert,
			deferThreshold = this._deferThreshold.upsert,
			returnData = {},
			query,
			i;

		// Determine if the object passed is an array or not
		if (obj instanceof Array) {
			if (this._deferredCalls && obj.length > deferThreshold) {
				// Break up upsert into blocks
				this._deferQueue.upsert = queue.concat(obj);
				this._asyncPending('upsert');

				// Fire off the insert queue handler
				this.processQueue('upsert', callback);

				return {};
			} else {
				// Loop the array and upsert each item
				returnData = [];

				for (i = 0; i < obj.length; i++) {
					returnData.push(this.upsert(obj[i])[0]);
				}

				if (callback) { callback.call(this, returnData); }

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
				returnData.result = this.insert(obj, callback);
				break;

			case 'update':
				returnData.result = this.update(query, obj, {}, callback);
				break;

			default:
				break;
		}
		
		if (callback) { callback.call(this, [returnData]); }

		return [returnData];
	} else {
		if (callback) { callback.call(this, {op: 'none'}); }
	}

	return {};
};

/**
 * Executes a method against each document that matches query and returns an
 * array of documents that may have been modified by the method.
 * @param {Object=} query The optional query object.
 * @param {Object=} options Optional options object. If you specify an options object
 * you MUST also specify a query object.
 * @param {Function} func The method that each document is passed to. If this method
 * returns false for a particular document it is excluded from the results. If you
 * return a modified object from the one passed to it will be included in the results
 * as the modified version but will not affect the data in the collection at all.
 * Your function will be called with a single object as the first argument and will
 * be called once for every document in your initial query result.
 * @returns {Array}
 */
Collection.prototype.filter = function (query, options, func) {
	var temp;
	
	if (typeof query === 'function') {
		func = query;
		query = {};
		options = {};
	}
	
	if (typeof options === 'function') {
		if (func) {
			temp = func;
		}
		
		func = options;
		options = temp || {};
	}
	
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
 * Modifies an existing document or documents in a collection.
 * This will update all matches for 'query' with the data held
 * in 'update'. It will not overwrite the matched documents
 * with the update document.
 *
 * @param {Object} query The query that must be matched for a
 * document to be operated on.
 * @param {Object} update The object containing updated
 * key/values. Any keys that match keys on the existing document
 * will be overwritten with this data. Any keys that do not
 * currently exist on the document will be added to the document.
 * @param {Object=} options An options object.
 * @param {Function=} callback The callback method to call when
 * the update is complete.
 * @returns {Array} The items that were updated.
 */
Collection.prototype.update = function (query, update, options, callback) {
	if (this.isDropped()) {
		throw(this.logIdentifier() + ' Cannot operate in a dropped state!');
	}

	// Convert queries from mongo dot notation to forerunner queries
	if (this.mongoEmulation()) {
		this.convertToFdb(query);
		this.convertToFdb(update);
	} else {
		// Decouple the update data
		update = this.decouple(update);
	}
	
	// Detect $replace operations and set flag
	if (update.$replace) {
		// Make sure we have an options object
		options = options || {};
		
		// Set the $replace flag in the options object
		options.$replace = true;
		
		// Move the replacement object out into the main update object
		update = update.$replace;
	}

	// Handle transform
	update = this.transformIn(update);

	return this._handleUpdate(query, update, options, callback);
};

/**
 * Handles the update operation that was initiated by a call to update().
 * @param {Object} query The query that must be matched for a
 * document to be operated on.
 * @param {Object} update The object containing updated
 * key/values. Any keys that match keys on the existing document
 * will be overwritten with this data. Any keys that do not
 * currently exist on the document will be added to the document.
 * @param {Object=} options An options object.
 * @param {Function=} callback The callback method to call when
 * the update is complete.
 * @returns {Array} The items that were updated.
 * @private
 */
Collection.prototype._handleUpdate = function (query, update, options, callback) {
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
					self._removeFromIndexes(referencedDoc);
					result = self.updateObject(referencedDoc, newDoc, triggerOperation.query, triggerOperation.options, '');
					self._insertIntoIndexes(referencedDoc);
					
					// NOTE: If for some reason we would only like to fire this event if changes are actually going
					// to occur on the object from the proposed update then we can add "result &&" to the if
					self.processTrigger(triggerOperation, self.TYPE_UPDATE, self.PHASE_AFTER, oldDoc, newDoc);
				} else {
					// Trigger cancelled operation so tell result that it was not updated
					result = false;
				}
			} else {
				// No triggers complained so let's execute the replacement of the existing
				// object with the new one
				self._removeFromIndexes(referencedDoc);
				result = self.updateObject(referencedDoc, update, query, options, '');
				self._insertIntoIndexes(referencedDoc);
			}

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
			if (this.debug()) {
				console.log(this.logIdentifier() + ' Updated some data');
			}

			op.time('Resolve chains');
			if (this.chainWillSend()) {
				this.chainSend('update', {
					query: query,
					update: update,
					dataSet: this.decouple(updated)
				}, options);
			}
			op.time('Resolve chains');

			this._onUpdate(updated);
			this._onChange();

			if (callback) { callback.call(this, updated || []); }

			this.emit('immediateChange', {type: 'update', data: updated});
			this.deferEmit('change', {type: 'update', data: updated});
		} else {
			if (callback) { callback.call(this, updated || []); }
		}
	} else {
		if (callback) { callback.call(this, updated || []); }
	}

	op.stop();

	// TODO: Should we decouple the updated array before return by default?
	return updated || [];
};

/**
 * Replaces an existing object with data from the new object without
 * breaking data references. It does this by removing existing keys
 * from the base object and then adding the passed object's keys to
 * the existing base object, thereby maintaining any references to
 * the existing base object but effectively replacing the object with
 * the new one.
 * @param {Object} currentObj The base object to alter.
 * @param {Object} newObj The new object to overwrite the existing one
 * with.
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
		throw(this.logIdentifier() + ' Primary key violation in update! Key violated: ' + currentObj[this._primaryKey]);
	}

	// Update the object in the collection data
	//this._data.splice(this._data.indexOf(currentObj), 1, newObj);

	return this;
};

/**
 * Helper method to update a document via it's id.
 * @param {String} id The id of the document.
 * @param {Object} update The object containing the key/values to
 * update to.
 * @param {Object=} options An options object.
 * @param {Function=} callback The callback method to call when
 * the update is complete.
 * @returns {Object} The document that was updated or undefined
 * if no document was updated.
 */
Collection.prototype.updateById = function (id, update, options, callback) {
	var searchObj = {},
		wrappedCallback;
	
	searchObj[this._primaryKey] = id;
	
	if (callback) {
		wrappedCallback = function (data) {
			callback(data[0]);
		};
	}
	
	return this.update(searchObj, update, options, wrappedCallback)[0];
};

/**
 * Internal method for document updating.
 * @param {Object} doc The document to update.
 * @param {Object} update The object with key/value pairs to update
 * the document with.
 * @param {Object} query The query object that we need to match to
 * perform an update.
 * @param {Object} options An options object.
 * @param {String} path The current recursive path.
 * @param {String} opType The type of update operation to perform,
 * if none is specified default is to set new data against matching
 * fields.
 * @returns {Boolean} True if the document was updated with new /
 * changed data or false if it was not updated because the data was
 * the same.
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
		tempKey,
		replaceObj,
		pk,
		pathInstance,
		sourceIsArray,
		updateIsArray,
		i;
	
	// Check if we have a $replace flag in the options object
	if (options && options.$replace === true) {
		operation = true;
		
		replaceObj = update;
		pk = this.primaryKey();
		
		// Loop the existing item properties and compare with
		// the replacement (never remove primary key)
		for (tempKey in doc) {
			if (doc.hasOwnProperty(tempKey) && tempKey !== pk) {
				if (replaceObj[tempKey] === undefined) {
					// The new document doesn't have this field, remove it from the doc
					this._updateUnset(doc, tempKey);
					updated = true;
				}
			}
		}
		
		// Loop the new item props and update the doc
		for (tempKey in replaceObj) {
			if (replaceObj.hasOwnProperty(tempKey) && tempKey !== pk) {
				this._updateOverwrite(doc, tempKey, replaceObj[tempKey]);
				updated = true;
			}
		}
		
		// Early exit
		return updated;
	}
	
	// DEVS PLEASE NOTE -- Early exit could have occurred above and code below will never be reached - Rob Evans - CEO - 05/08/2016

	// Loop each key in the update object
	for (i in update) {
		if (update.hasOwnProperty(i)) {
			// Reset operation flag
			operation = false;

			// Check if the property starts with a dollar (function)
			if (!operation && i.substr(0, 1) === '$') {
				// Check for commands
				switch (i) {
					case '$key':
					case '$index':
					case '$data':
					case '$min':
					case '$max':
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

					case '$replace':
						operation = true;
						replaceObj = update.$replace;
						pk = this.primaryKey();

						// Loop the existing item properties and compare with
						// the replacement (never remove primary key)
						for (tempKey in doc) {
							if (doc.hasOwnProperty(tempKey) && tempKey !== pk) {
								if (replaceObj[tempKey] === undefined) {
									// The new document doesn't have this field, remove it from the doc
									this._updateUnset(doc, tempKey);
									updated = true;
								}
							}
						}

						// Loop the new item props and update the doc
						for (tempKey in replaceObj) {
							if (replaceObj.hasOwnProperty(tempKey) && tempKey !== pk) {
								this._updateOverwrite(doc, tempKey, replaceObj[tempKey]);
								updated = true;
							}
						}
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
			if (!operation && this._isPositionalKey(i)) {
				operation = true;

				// Modify i to be the name of the field
				i = i.substr(0, i.length - 2);

				pathInstance = new Path(path + '.' + i);

				// Check if the key is an array and has items
				if (doc[i] && doc[i] instanceof Array && doc[i].length) {
					tmpArray = [];

					// Loop the array and find matches to our search
					for (tmpIndex = 0; tmpIndex < doc[i].length; tmpIndex++) {
						if (this._match(doc[i][tmpIndex], pathInstance.value(query)[0], options, '', {})) {
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
							// Check if the doc key is a date instance
							if (doc[i] instanceof Date) {
								// The doc key is a date object, assign the new date
								this._updateProperty(doc, i, update[i]);
								updated = true;
							} else {
								// The doc key is an object so traverse the
								// update further
								recurseUpdated = this.updateObject(doc[i], update[i], query, options, path + '.' + i, opType);
								updated = updated || recurseUpdated;
							}
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
							var doUpdate = true;

							// Check for a $min / $max operator
							if (update[i] > 0) {
								if (update.$max) {
									// Check current value
									if (doc[i] >= update.$max) {
										// Don't update
										doUpdate = false;
									}
								}
							} else if (update[i] < 0) {
								if (update.$min) {
									// Check current value
									if (doc[i] <= update.$min) {
										// Don't update
										doUpdate = false;
									}
								}
							}

							if (doUpdate) {
								this._updateIncrement(doc, i, update[i]);
								updated = true;
							}
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
									throw(this.logIdentifier() + ' Cannot update cast to unknown type: ' + update[i]);
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
								throw(this.logIdentifier() + ' Cannot push to a key that is not an array! (' + i + ')');
							}
							break;

						case '$pull':
							if (doc[i] instanceof Array) {
								tmpArray = [];

								// Loop the array and find matches to our search
								for (tmpIndex = 0; tmpIndex < doc[i].length; tmpIndex++) {
									if (this._match(doc[i][tmpIndex], update[i], options, '', {})) {
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
									throw(this.logIdentifier() + ' Cannot pullAll without being given an array of values to pull! (' + i + ')');
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
									objHash = this.jStringify(update[i]);
									hashMode = true;
								}

								for (targetArrIndex = 0; targetArrIndex < targetArrCount; targetArrIndex++) {
									if (hashMode) {
										// Check if objects match via a string hash (JSON)
										if (this.jStringify(targetArr[targetArrIndex]) === objHash) {
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
								throw(this.logIdentifier() + ' Cannot addToSet on a key that is not an array! (' + i + ')');
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
									throw(this.logIdentifier() + ' Cannot splicePush without a $index integer value!');
								}
							} else {
								throw(this.logIdentifier() + ' Cannot splicePush with a key that is not an array! (' + i + ')');
							}
							break;

						case '$splicePull':
							// Check that the target key is not undefined
							if (doc[i] !== undefined) {
								// Check that the target key is an array
								if (doc[i] instanceof Array) {
									tempIndex = update[i].$index;

									if (tempIndex !== undefined) {

										// Check for in bounds index
										if (tempIndex < doc[i].length) {
											this._updateSplicePull(doc[i], tempIndex);
											updated = true;
										}
									} else {
										throw(this.logIdentifier() + ' Cannot splicePull without a $index integer value!');
									}
								} else {
									throw(this.logIdentifier() + ' Cannot splicePull from a key that is not an array! (' + i + ')');
								}
							}
							break;

						case '$move':
							if (doc[i] instanceof Array) {
								// Loop the array and find matches to our search
								for (tmpIndex = 0; tmpIndex < doc[i].length; tmpIndex++) {
									if (this._match(doc[i][tmpIndex], update[i], options, '', {})) {
										var moveToIndex = update.$index;

										if (moveToIndex !== undefined) {
											delete update.$index;

											this._updateSpliceMove(doc[i], tmpIndex, moveToIndex);
											updated = true;
										} else {
											throw(this.logIdentifier() + ' Cannot move without a $index integer value!');
										}
										break;
									}
								}
							} else {
								throw(this.logIdentifier() + ' Cannot move on a key that is not an array! (' + i + ')');
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
								throw(this.logIdentifier() + ' Cannot pop from a key that is not an array! (' + i + ')');
							}
							break;

						case '$toggle':
							// Toggle the boolean property between true and false
							this._updateProperty(doc, i, !doc[i]);
							updated = true;
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
 * Determines if the passed key has an array positional mark
 * (a dollar at the end of its name).
 * @param {String} key The key to check.
 * @returns {Boolean} True if it is a positional or false if not.
 * @private
 */
Collection.prototype._isPositionalKey = function (key) {
	return key.substr(key.length - 2, 2) === '.$';
};

/**
 * Removes any documents from the collection that match the search
 * query key/values.
 * @param {Object=} query The query identifying the documents to remove. If no
 * query object is passed, all documents will be removed from the collection.
 * @param {Object=} options An options object.
 * @param {Function=} callback A callback method.
 * @returns {Array} An array of the documents that were removed.
 */
Collection.prototype.remove = function (query, options, callback) {
	if (this.isDropped()) {
		throw(this.logIdentifier() + ' Cannot operate in a dropped state!');
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
		options = {};
	}

	// Convert queries from mongo dot notation to forerunner queries
	if (this.mongoEmulation()) {
		this.convertToFdb(query);
	}

	if (query instanceof Array) {
		returnArr = [];

		for (arrIndex = 0; arrIndex < query.length; arrIndex++) {
			returnArr.push(this.remove(query[arrIndex], {noEmit: true}));
		}

		if (!options || (options && !options.noEmit)) {
			this._onRemove(returnArr);
		}

		if (callback) { callback.call(this, false, returnArr); }
		return returnArr;
	} else {
		returnArr = [];
		dataSet = this.find(query, {$decouple: false});

		if (dataSet.length) {
			removeMethod = function (dataItem) {
				// Remove the item from the collection's indexes
				self._removeFromIndexes(dataItem);

				// Remove data from internal stores
				index = self._data.indexOf(dataItem);
				self._dataRemoveAtIndex(index);

				returnArr.push(dataItem);
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

			if (returnArr.length) {
				//op.time('Resolve chains');
				self.chainSend('remove', {
					query: query,
					dataSet: returnArr
				}, options);
				//op.time('Resolve chains');

				if (!options || (options && !options.noEmit)) {
					this._onRemove(returnArr);
				}

				this._onChange();
				this.emit('immediateChange', {type: 'remove', data: returnArr});
				this.deferEmit('change', {type: 'remove', data: returnArr});
			}
		}

		if (callback) { callback.call(this, false, returnArr); }
		return returnArr;
	}
};

/**
 * Helper method that removes a document that matches the given id.
 * @param {String} id The id of the document to remove.
 * @returns {Object} The document that was removed or undefined if
 * nothing was removed.
 */
Collection.prototype.removeById = function (id) {
	var searchObj = {};
	searchObj[this._primaryKey] = id;
	return this.remove(searchObj)[0];
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

		// Queue another process
		setTimeout(function () {
			self.processQueue.call(self, type, callback, resultObj);
		}, deferTime);
	} else {
		if (callback) { callback.call(this, resultObj); }

		this._asyncComplete(type);
	}

	// Check if all queues are complete
	if (!this.isProcessingQueue()) {
		this.deferEmit('queuesComplete');
	}
};

/**
 * Checks if any CRUD operations have been deferred and are still waiting to
 * be processed.
 * @returns {Boolean} True if there are still deferred CRUD operations to process
 * or false if all queues are clear.
 */
Collection.prototype.isProcessingQueue = function () {
	var i;

	for (i in this._deferQueue) {
		if (this._deferQueue.hasOwnProperty(i)) {
			if (this._deferQueue[i].length) {
				return true;
			}
		}
	}

	return false;
};

/**
 * Inserts a document or array of documents into the collection.
 * @param {Object|Array} data Either a document object or array of document
 * @param {Number=} index Optional index to insert the record at.
 * @param {Collection.insertCallback=} callback Optional callback called
 * once the insert is complete.
 */
Collection.prototype.insert = function (data, index, callback) {
	if (this.isDropped()) {
		throw(this.logIdentifier() + ' Cannot operate in a dropped state!');
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
 * The insert operation's callback.
 * @name Collection.insertCallback
 * @callback Collection.insertCallback
 * @param {Object} result The result object will contain two arrays (inserted
 * and failed) which represent the documents that did get inserted and those
 * that didn't for some reason (usually index violation). Failed items also
 * contain a reason. Inspect the failed array for further information.
 *
 * A third field called "deferred" is a boolean value to indicate if the
 * insert operation was deferred across more than one CPU cycle (to avoid
 * blocking the main thread).
 */

/**
 * Inserts a document or array of documents into the collection.
 * @param {Object|Array} data Either a document object or array of document
 * @param {Number=} index Optional index to insert the record at.
 * @param {Collection.insertCallback=} callback Optional callback called
 * once the insert is complete.
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
		if (this._deferredCalls && data.length > deferThreshold) {
			// Break up insert into blocks
			this._deferQueue.insert = queue.concat(data);
			this._asyncPending('insert');

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

	resultObj = {
		deferred: false,
		inserted: inserted,
		failed: failed
	};

	this._onInsert(inserted, failed);
	if (callback) { callback.call(this, resultObj); }

	this._onChange();
	this.emit('immediateChange', {type: 'insert', data: inserted, failed: failed});
	this.deferEmit('change', {type: 'insert', data: inserted, failed: failed});

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
			newDoc,
			capped = this.capped(),
			cappedSize = this.cappedSize();

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

			// Check capped collection status and remove first record
			// if we are over the threshold
			if (capped && self._data.length > cappedSize) {
				// Remove the first item in the data array
				self.removeById(self._data[0][self._primaryKey]);
			}

			//op.time('Resolve chains');
			if (self.chainWillSend()) {
				self.chainSend('insert', {
					dataSet: self.decouple([doc])
				}, {
					index: index
				});
			}
			//op.time('Resolve chains');
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
					return 'Trigger cancelled operation';
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
 * @param {Number} index The index to insert at.
 * @param {Object} doc The document to insert.
 * @private
 */
Collection.prototype._dataInsertAtIndex = function (index, doc) {
	this._data.splice(index, 0, doc);
};

/**
 * Removes a document from the internal collection data array at
 * the specified index.
 * @param {Number} index The index to remove from.
 * @private
 */
Collection.prototype._dataRemoveAtIndex = function (index) {
	this._data.splice(index, 1);
};

/**
 * Replaces all data in the collection's internal data array with
 * the passed array of data.
 * @param {Array} data The array of data to replace existing data with.
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
		hash = this.hash(doc),
		pk = this._primaryKey;

	// Insert to primary key index
	violated = this._primaryIndex.uniqueSet(doc[pk], doc);
	this._primaryCrc.uniqueSet(doc[pk], hash);
	this._crcLookup.uniqueSet(hash, doc);

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
		hash = this.hash(doc),
		pk = this._primaryKey;

	// Remove from primary key index
	this._primaryIndex.unSet(doc[pk]);
	this._primaryCrc.unSet(doc[pk]);
	this._crcLookup.unSet(hash);

	// Remove from other indexes
	for (arrIndex in arr) {
		if (arr.hasOwnProperty(arrIndex)) {
			arr[arrIndex].remove(doc);
		}
	}
};

/**
 * Updates collection index data for the passed document.
 * @param {Object} oldDoc The old document as it was before the update (must be
 * actual reference to original document).
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
	var result = this.find(query, options),
		coll;

	coll = new Collection();
	coll.db(this._db);

	coll.subsetOf(this)
		.primaryKey(this._primaryKey)
		.setData(result);

	return coll;
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
	return this._subsetOf === collection;
};

/**
 * Find the distinct values for a specified field across a single collection and
 * returns the values as a results array.
 * @param {String} path The field path to return distinct values for e.g. "person.name".
 * @param {Object=} query The query to use to filter the documents used to return values from.
 * @param {Object=} options The query options to use when running the query.
 * @returns {Array}
 */
Collection.prototype.distinct = function (path, query, options) {
	if (this.isDropped()) {
		throw(this.logIdentifier() + ' Cannot operate in a dropped state!');
	}

	var data = this.find(query, options),
		pathSolver = new Path(),
		valueUsed = {},
		distinctValues = [],
		aggregatedValues,
		value,
		i;
	
	// Get path values as an array
	aggregatedValues = pathSolver.aggregate(data, path);
	
	// Loop the data and build array of distinct values
	for (i = 0; i < aggregatedValues.length; i++) {
		value = aggregatedValues[i];
		
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
 * @param {String} search The string to search for. Case sensitive.
 * @param {Object=} options A standard find() options object.
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
			arrItem = this.jStringify(arr[arrIndex]);

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
 * @param {Object=} obj Optional options object to modify.
 * @returns {Object} The options object.
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
	// Convert queries from mongo dot notation to forerunner queries
	if (this.mongoEmulation()) {
		this.convertToFdb(query);
	}

	if (callback) {
		// Check the size of the collection's data array

		// Split operation into smaller tasks and callback when complete
		callback.call(this, 'Callbacks for the find() operation are not yet implemented!', []);
		return [];
	}

	return this._find.call(this, query, options, callback);
};

Collection.prototype._find = function (query, options) {
	if (this.isDropped()) {
		throw(this.logIdentifier() + ' Cannot operate in a dropped state!');
	}

	// TODO: This method is quite long, break into smaller pieces
	query = query || {};

	var op = this._metrics.create('find'),
		pk = this.primaryKey(),
		self = this,
		analysis,
		scanLength,
		requiresTableScan = true,
		resultArr,
		joinIndex,
		joinSource = {},
		joinQuery,
		joinPath,
		joinSourceKey,
		joinSourceType,
		joinSourceIdentifier,
		joinSourceData,
		resultRemove = [],
		i, j, k,
		fieldListOn = [],
		fieldListOff = [],
		elemMatchPathSolver,
		elemMatchSubArr,
		elemMatchSpliceArr,
		matcherTmpOptions = {},
		result,
		cursor = {},
		pathSolver,
		waterfallCollection,
		matcher;

	if (!(options instanceof Array)) {
		options = this.options(options);
	}

	matcher = function (doc) {
		return self._match(doc, query, options, 'and', matcherTmpOptions);
	};

	op.start();
	if (query) {
		// Check if the query is an array (multi-operation waterfall query)
		if (query instanceof Array) {
			waterfallCollection = this;

			// Loop the query operations
			for (i = 0; i < query.length; i++) {
				// Execute each operation and pass the result into the next
				// query operation
				waterfallCollection = waterfallCollection.subset(query[i], options && options[i] ? options[i] : {});
			}

			return waterfallCollection.find();
		}

		// Pre-process any data-changing query operators first
		if (query.$findSub) {
			// Check we have all the parts we need
			if (!query.$findSub.$path) {
				throw('$findSub missing $path property!');
			}

			return this.findSub(
				query.$findSub.$query,
				query.$findSub.$path,
				query.$findSub.$subQuery,
				query.$findSub.$subOptions
			);
		}

		if (query.$findSubOne) {
			// Check we have all the parts we need
			if (!query.$findSubOne.$path) {
				throw('$findSubOne missing $path property!');
			}

			return this.findSubOne(
				query.$findSubOne.$query,
				query.$findSubOne.$path,
				query.$findSubOne.$subQuery,
				query.$findSubOne.$subOptions
			);
		}

		// Get query analysis to execute best optimised code path
		op.time('analyseQuery');
		analysis = this._analyseQuery(self.decouple(query), options, op);
		op.time('analyseQuery');
		op.data('analysis', analysis);

		// Check if the query tries to limit by data that would only exist after
		// the join operation has been completed
		if (analysis.hasJoin && analysis.queriesJoin) {
			// The query has a join and tries to limit by it's joined data
			// Get references to the join sources
			op.time('joinReferences');
			for (joinIndex = 0; joinIndex < analysis.joinsOn.length; joinIndex++) {
				joinSourceData = analysis.joinsOn[joinIndex];
				joinSourceKey = joinSourceData.key;

				joinSourceType = joinSourceData.type;
				joinSourceIdentifier = joinSourceData.id;

				joinPath = new Path(analysis.joinQueries[joinSourceKey]);
				joinQuery = joinPath.value(query)[0];

				joinSource[joinSourceIdentifier] = this._db[joinSourceType](joinSourceKey).subset(joinQuery);

				// Remove join clause from main query
				delete query[analysis.joinQueries[joinSourceKey]];
			}
			op.time('joinReferences');
		}

		// Check if an index lookup can be used to return this result
		if (analysis.indexMatch.length && (!options || (options && !options.$skipIndex))) {
			op.data('index.potential', analysis.indexMatch);
			op.data('index.used', analysis.indexMatch[0].index);

			// Get the data from the index
			op.time('indexLookup');
			resultArr = [].concat(analysis.indexMatch[0].lookup) || [];
			op.time('indexLookup');

			// Check if the index coverage is all keys, if not we still need to table scan it
			if (analysis.indexMatch[0].keyData.totalKeyCount === analysis.indexMatch[0].keyData.score) {
				// Don't require a table scan to find relevant documents
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

			op.time('tableScan: ' + scanLength);
		}

		// Order the array if we were passed a sort clause
		if (options.$orderBy) {
			op.time('sort');
			resultArr = this.sort(options.$orderBy, resultArr);
			op.time('sort');
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
			resultRemove = resultRemove.concat(this.applyJoin(resultArr, options.$join, joinSource));
			op.data('flag.join', true);
		}

		// Process removal queue
		if (resultRemove.length) {
			op.time('removalQueue');
			this.spliceArrayByIndexList(resultArr, resultRemove);
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

	// Check for an $as operator in the options object and if it exists
	// iterate over the fields and generate a rename function that will
	// operate over the entire returned data array and rename each object's
	// fields to their new names
	// TODO: Enable $as in collection find to allow renaming fields
	/*if (options.$as) {
		renameFieldPath = new Path();
		renameFieldMethod = function (obj, oldFieldPath, newFieldName) {
			renameFieldPath.path(oldFieldPath);
			renameFieldPath.rename(newFieldName);
		};

		for (i in options.$as) {
			if (options.$as.hasOwnProperty(i)) {

			}
		}
	}*/

	if (!options.$aggregate) {
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
								if (self._match(elemMatchSubArr[k], options.$elemMatch[i], options, '', {})) {
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
								if (self._match(elemMatchSubArr[k], options.$elemsMatch[i], options, '', {})) {
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
	}

	// Process aggregation
	if (options.$aggregate) {
		op.data('flag.aggregate', true);
		op.time('aggregate');
		pathSolver = new Path(options.$aggregate);
		resultArr = pathSolver.value(resultArr);
		op.time('aggregate');
	}

	// Now process any $groupBy clause
	if (options.$groupBy) {
		op.data('flag.group', true);
		op.time('group');
		resultArr = this.group(options.$groupBy, resultArr);
		op.time('group');
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
 * @param {Object=} options An options object.
 * @returns {Number}
 */
Collection.prototype.indexOf = function (query, options) {
	var item = this.find(query, {$decouple: false})[0],
		sortedData;

	if (item) {
		if (!options || options && !options.$orderBy) {
			// Basic lookup from order of insert
			return this._data.indexOf(item);
		} else {
			// Trying to locate index based on query with sort order
			options.$decouple = false;
			sortedData = this.find(query, options);

			return sortedData.indexOf(item);
		}
	}

	return -1;
};

/**
 * Returns the index of the document identified by the passed item's primary key.
 * @param {*} itemLookup The document whose primary key should be used to lookup
 * or the id to lookup.
 * @param {Object=} options An options object.
 * @returns {Number} The index the item with the matching primary key is occupying.
 */
Collection.prototype.indexOfDocById = function (itemLookup, options) {
	var item,
		sortedData;

	if (typeof itemLookup !== 'object') {
		item = this._primaryIndex.get(itemLookup);
	} else {
		item = this._primaryIndex.get(itemLookup[this._primaryKey]);
	}

	if (item) {
		if (!options || options && !options.$orderBy) {
			// Basic lookup
			return this._data.indexOf(item);
		} else {
			// Sorted lookup
			options.$decouple = false;
			sortedData = this.find({}, options);

			return sortedData.indexOf(item);
		}
	}

	return -1;
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
			var finalArr = [],
				transformResult,
				i;

			for (i = 0; i < data.length; i++) {
				transformResult = this._transformIn(data[i]);

				// Support transforms returning multiple items
				if (transformResult instanceof Array) {
					finalArr = finalArr.concat(transformResult);
				} else {
					finalArr.push(transformResult);
				}
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
			var finalArr = [],
				transformResult,
				i;

			for (i = 0; i < data.length; i++) {
				transformResult = this._transformOut(data[i]);

				// Support transforms returning multiple items
				if (transformResult instanceof Array) {
					finalArr = finalArr.concat(transformResult);
				} else {
					finalArr.push(transformResult);
				}
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
	// Convert the index object to an array of key val objects
	var self = this,
		keys = sharedPathSolver.parse(sortObj, true);

	if (keys.length) {
		// Execute sort
		arr.sort(function (a, b) {
			// Loop the index array
			var i,
				indexData,
				result = 0;

			for (i = 0; i < keys.length; i++) {
				indexData = keys[i];

				if (indexData.value === 1) {
					result = self.sortAsc(sharedPathSolver.get(a, indexData.path), sharedPathSolver.get(b, indexData.path));
				} else if (indexData.value === -1) {
					result = self.sortDesc(sharedPathSolver.get(a, indexData.path), sharedPathSolver.get(b, indexData.path));
				}

				if (result !== 0) {
					return result;
				}
			}

			return result;
		});
	}

	return arr;
};

/**
 * Groups an array of documents into multiple array fields, named by the value
 * of the given group path.
 * @param {*} groupObj The key path the array objects should be grouped by.
 * @param {Array} arr The array of documents to group.
 * @returns {Object}
 */
Collection.prototype.group = function (groupObj, arr) {
	// Convert the index object to an array of key val objects
	var keys = sharedPathSolver.parse(groupObj, true),
		groupPathSolver = new Path(),
		groupValue,
		groupResult = {},
		keyIndex,
		i;

	if (keys.length) {
		for (keyIndex = 0; keyIndex < keys.length; keyIndex++) {
			groupPathSolver.path(keys[keyIndex].path);

			// Execute group
			for (i = 0; i < arr.length; i++) {
				groupValue = groupPathSolver.get(arr[i]);
				groupResult[groupValue] = groupResult[groupValue] || [];
				groupResult[groupValue].push(arr[i]);
			}
		}
	}

	return groupResult;
};

// Commented as we have a new method that was originally implemented for binary trees.
// This old method actually has problems with nested sort objects
/*Collection.prototype.sortold = function (sortObj, arr) {
	// Make sure we have an array object
	arr = arr || [];

	var	sortArr = [],
		sortKey,
		sortSingleObj;

	for (sortKey in sortObj) {
		if (sortObj.hasOwnProperty(sortKey)) {
			sortSingleObj = {};
			sortSingleObj[sortKey] = sortObj[sortKey];
			sortSingleObj.___fdbKey = String(sortKey);
			sortArr.push(sortSingleObj);
		}
	}

	if (sortArr.length < 2) {
		// There is only one sort criteria, do a simple sort and return it
		return this._sort(sortObj, arr);
	} else {
		return this._bucketSort(sortArr, arr);
	}
};*/

/**
 * REMOVED AS SUPERCEDED BY BETTER SORT SYSTEMS
 * Takes array of sort paths and sorts them into buckets before returning final
 * array fully sorted by multi-keys.
 * @param keyArr
 * @param arr
 * @returns {*}
 * @private
 */
/*Collection.prototype._bucketSort = function (keyArr, arr) {
	var keyObj = keyArr.shift(),
		arrCopy,
		bucketData,
		bucketOrder,
		bucketKey,
		buckets,
		i,
		finalArr = [];

	if (keyArr.length > 0) {
		// Sort array by bucket key
		arr = this._sort(keyObj, arr);

		// Split items into buckets
		bucketData = this.bucket(keyObj.___fdbKey, arr);
		bucketOrder = bucketData.order;
		buckets = bucketData.buckets;

		// Loop buckets and sort contents
		for (i = 0; i < bucketOrder.length; i++) {
			bucketKey = bucketOrder[i];

			arrCopy = [].concat(keyArr);
			finalArr = finalArr.concat(this._bucketSort(arrCopy, buckets[bucketKey]));
		}

		return finalArr;
	} else {
		return this._sort(keyObj, arr);
	}
};*/

 /**
 * Takes an array of objects and returns a new object with the array items
 * split into buckets by the passed key.
 * @param {String} key The key to split the array into buckets by.
 * @param {Array} arr An array of objects.
 * @returns {Object}
 */
/*Collection.prototype.bucket = function (key, arr) {
	var i,
			oldField,
			field,
			fieldArr = [],
			buckets = {};

	for (i = 0; i < arr.length; i++) {
		field = String(arr[i][key]);

		if (oldField !== field) {
			fieldArr.push(field);
			oldField = field;
		}

		buckets[field] = buckets[field] || [];
		buckets[field].push(arr[i]);
	}

	return {
		buckets: buckets,
		order: fieldArr
	};
};*/

/**
 * Sorts array by individual sort path.
 * @param {String} key The path to sort by.
 * @param {Array} arr The array of objects to sort.
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
		throw(this.logIdentifier() + ' $orderBy clause has invalid direction: ' + dataPath.value + ', accepted values are 1 or -1 for ascending or descending!');
	}

	return arr.sort(sorterMethod);
};

/**
 * Internal method that takes a search query and options and
 * returns an object containing details about the query which
 * can be used to optimise the search.
 *
 * @param {Object} query The search query to analyse.
 * @param {Object} options The query options object.
 * @param {Operation} op The instance of the Operation class that
 * this operation is using to track things like performance and steps
 * taken etc.
 * @returns {Object}
 * @private
 */
Collection.prototype._analyseQuery = function (query, options, op) {
	var analysis = {
			queriesOn: [{id: '$collection.' + this._name, type: 'colletion', key: this._name}],
			indexMatch: [],
			hasJoin: false,
			queriesJoin: false,
			joinQueries: {},
			query: query,
			options: options
		},
		joinSourceIndex,
		joinSourceKey,
		joinSourceType,
		joinSourceIdentifier,
		joinMatch,
		joinSources = [],
		joinSourceReferences = [],
		queryPath,
		index,
		indexMatchData,
		indexRef,
		indexRefName,
		indexLookup,
		pathSolver,
		queryKeyCount,
		pkQueryType,
		lookupResult,
		i;

	// Check if the query is a primary key lookup
	op.time('checkIndexes');
	pathSolver = new Path();
	queryKeyCount = pathSolver.parseArr(query, {
		ignore:/\$/,
		verbose: true
	}).length;

	if (queryKeyCount) {
		if (query[this._primaryKey] !== undefined) {
			// Check suitability of querying key value index
			pkQueryType = typeof query[this._primaryKey];

			if (pkQueryType === 'string' || pkQueryType === 'number' || query[this._primaryKey] instanceof Array) {
				// Return item via primary key possible
				op.time('checkIndexMatch: Primary Key');
				lookupResult = [].concat(this._primaryIndex.lookup(query, options, op));

				analysis.indexMatch.push({
					lookup: lookupResult,
					keyData: {
						matchedKeys: [this._primaryKey],
						totalKeyCount: queryKeyCount,
						score: 1
					},
					index: this._primaryIndex
				});
				op.time('checkIndexMatch: Primary Key');
			}
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
					indexLookup = [].concat(indexRef.lookup(query, options, op));

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
		for (joinSourceIndex = 0; joinSourceIndex < options.$join.length; joinSourceIndex++) {
			// Loop the join sources and keep a reference to them
			for (joinSourceKey in options.$join[joinSourceIndex]) {
				if (options.$join[joinSourceIndex].hasOwnProperty(joinSourceKey)) {
					joinMatch = options.$join[joinSourceIndex][joinSourceKey];

					joinSourceType = joinMatch.$sourceType || 'collection';
					joinSourceIdentifier = '$' + joinSourceType + '.' + joinSourceKey;

					joinSources.push({
						id: joinSourceIdentifier,
						type: joinSourceType,
						key: joinSourceKey
					});

					// Check if the join uses an $as operator
					if (options.$join[joinSourceIndex][joinSourceKey].$as !== undefined) {
						joinSourceReferences.push(options.$join[joinSourceIndex][joinSourceKey].$as);
					} else {
						joinSourceReferences.push(joinSourceKey);
					}
				}
			}
		}

		// Loop the join source references and determine if the query references
		// any of the sources that are used in the join. If there no queries against
		// joined sources the find method can use a code path optimised for this.

		// Queries against joined sources requires the joined sources to be filtered
		// first and then joined so requires a little more work.
		for (index = 0; index < joinSourceReferences.length; index++) {
			// Check if the query references any source data that the join will create
			queryPath = this._queryReferencesSource(query, joinSourceReferences[index], '');

			if (queryPath) {
				analysis.joinQueries[joinSources[index].key] = queryPath;
				analysis.queriesJoin = true;
			}
		}

		analysis.joinsOn = joinSources;
		analysis.queriesOn = analysis.queriesOn.concat(joinSources);
	}

	return analysis;
};

/**
 * Checks if the passed query references a source object (such
 * as a collection) by name.
 * @param {Object} query The query object to scan.
 * @param {String} sourceName The source name to scan for in the query.
 * @param {String=} path The path to scan from.
 * @returns {*}
 * @private
 */
Collection.prototype._queryReferencesSource = function (query, sourceName, path) {
	var i;

	for (i in query) {
		if (query.hasOwnProperty(i)) {
			// Check if this key is a reference match
			if (i === sourceName) {
				if (path) { path += '.'; }
				return path + i;
			} else {
				if (typeof(query[i]) === 'object') {
					// Recurse
					if (path) { path += '.'; }
					path += i;
					return this._queryReferencesSource(query[i], sourceName, path);
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
 * @param {Object} match The query object to use when matching
 * parent documents from which the sub-documents are queried.
 * @param {String} path The path string used to identify the
 * key in which sub-documents are stored in parent documents.
 * @param {Object=} subDocQuery The query to use when matching
 * which sub-documents to return.
 * @param {Object=} subDocOptions The options object to use
 * when querying for sub-documents.
 * @returns {*}
 */
Collection.prototype.findSub = function (match, path, subDocQuery, subDocOptions) {
	return this._findSub(this.find(match), path, subDocQuery, subDocOptions);
};

Collection.prototype._findSub = function (docArr, path, subDocQuery, subDocOptions) {
	var pathHandler = new Path(path),
		docCount = docArr.length,
		docIndex,
		subDocArr,
		subDocCollection = new Collection('__FDB_temp_' + this.objectId()).db(this._db),
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
			
			if (subDocOptions.$returnFirst && subDocResults.length) {
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

	if (!resultObj.pathFound) {
		resultObj.err = 'No objects found in the parent documents with a matching path of: ' + path;
	}

	// Check if the call should not return stats, if so return only subDocs array
	if (subDocOptions.$stats) {
		return resultObj;
	} else {
		return resultObj.subDocs;
	}
};

/**
 * Finds the first sub-document from the collection's documents
 * that matches the subDocQuery parameter.
 * @param {Object} match The query object to use when matching
 * parent documents from which the sub-documents are queried.
 * @param {String} path The path string used to identify the
 * key in which sub-documents are stored in parent documents.
 * @param {Object=} subDocQuery The query to use when matching
 * which sub-documents to return.
 * @param {Object=} subDocOptions The options object to use
 * when querying for sub-documents.
 * @returns {Object}
 */
Collection.prototype.findSubOne = function (match, path, subDocQuery, subDocOptions) {
	return this.findSub(match, path, subDocQuery, subDocOptions)[0];
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
	if (this.isDropped()) {
		throw(this.logIdentifier() + ' Cannot operate in a dropped state!');
	}

	this._indexByName = this._indexByName || {};
	this._indexById = this._indexById || {};

	var index,
		time = {
			start: new Date().getTime()
		};

	if (options) {
		if (options.type) {
			// Check if the specified type is available
			if (Shared.index[options.type]) {
				// We found the type, generate it
				index = new Shared.index[options.type](keys, options, this);
			} else {
				throw(this.logIdentifier() + ' Cannot create index of type "' + options.type + '", type not found in the index type register (Shared.index)');
			}
		} else {
			// Create default index type
			index = new IndexHashMap(keys, options, this);
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

	/*if (this._indexById[index.id()]) {
		// Index already exists
		return {
			err: 'Index with those keys already exists'
		};
	}*/

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

	var pk = this.primaryKey(),
		arr,
		arrIndex,
		arrItem,
		arrCount;

	// Check if the primary key index of each collection can be utilised
	if (pk !== collection.primaryKey()) {
		throw(this.logIdentifier() + ' Diffing requires that both collections have the same primary key!');
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
		if (this._primaryIndex.get(arrItem[pk])) {
			// Matching item exists, check if the data is the same
			if (this._primaryCrc.get(arrItem[pk]) !== collection._primaryCrc.get(arrItem[pk])) {
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

		if (!collection._primaryIndex.get(arrItem[pk])) {
			// The document does not exist in the other collection, remove required
			diff.remove.push(arrItem);
		}
	}

	return diff;
};

Collection.prototype.collateAdd = new Overload('Collection.prototype.collateAdd', {
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

						obj1.$push[keyName] = self.decouple(packet.data.dataSet);
						self.update({}, obj1);
					} else {
						self.insert(packet.data.dataSet);
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
						self.remove(packet.data.dataSet);
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

/**
 * Creates a condition handler that will react to changes in data on the
 * collection.
 * @example Create a condition handler that reacts when data changes.
 * 	var coll = db.collection('test'),
 * 		condition = coll.when({_id: 'test1', val: 1})
 * 		.then(function () {
 * 			console.log('Condition met!');
 *	 	})
 *	 	.else(function () {
 *	 		console.log('Condition un-met');
 *	 	});
 *
 *	 	coll.insert({_id: 'test1', val: 1});
 *
 * @see Condition
 * @param {Object} query The query that will trigger the condition's then()
 * callback.
 * @returns {Condition}
 */
Collection.prototype.when = function (query) {
	var queryId = this.objectId();

	this._when = this._when || {};
	this._when[queryId] = this._when[queryId] || new Condition(this, queryId, query);

	return this._when[queryId];
};

Db.prototype.collection = new Overload('Db.prototype.collection', {
	/**
	 * Get a collection with no name (generates a random name). If the
	 * collection does not already exist then one is created for that
	 * name automatically.
	 * @name collection
	 * @method Db.collection
	 * @func collection
	 * @memberof Db
	 * @returns {Collection}
	 */
	'': function () {
		return this.$main.call(this, {
			name: this.objectId()
		});
	},

	/**
	 * Get a collection by name. If the collection does not already exist
	 * then one is created for that name automatically.
	 * @name collection
	 * @method Db.collection
	 * @func collection
	 * @memberof Db
	 * @param {Object} data An options object or a collection instance.
	 * @returns {Collection}
	 */
	'object': function (data) {
		// Handle being passed an instance
		if (data instanceof Collection) {
			if (data.state() !== 'droppped') {
				return data;
			} else {
				return this.$main.call(this, {
					name: data.name()
				});
			}
		}

		return this.$main.call(this, data);
	},

	/**
	 * Get a collection by name. If the collection does not already exist
	 * then one is created for that name automatically.
	 * @name collection
	 * @method Db.collection
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
	 * @name collection
	 * @method Db.collection
	 * @func collection
	 * @memberof Db
	 * @param {String} collectionName The name of the collection.
	 * @param {String} primaryKey Optional primary key to specify the
	 * primary key field on the collection objects. Defaults to "_id".
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
	 * @name collection
	 * @method Db.collection
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
	 * @name collection
	 * @method Db.collection
	 * @func collection
	 * @memberof Db
	 * @param {String} collectionName The name of the collection.
	 * @param {String} primaryKey Optional primary key to specify the
	 * primary key field on the collection objects. Defaults to "_id".
	 * @param {Object} options An options object.
	 * @returns {Collection}
	 */
	'string, string, object': function (collectionName, primaryKey, options) {
		options.name = collectionName;
		options.primaryKey = primaryKey;

		return this.$main.call(this, options);
	},
	
	'$main': function (options) {
		var self = this,
			name = options.name;

		if (!name) {
			if (!options || (options && options.throwError !== false)) {
				throw(this.logIdentifier() + ' Cannot get collection with undefined name!');
			}
			
			return;
		}
		
		if (this._collection[name]) {
			return this._collection[name];
		}
		
		if (options && options.autoCreate === false) {
			if (options && options.throwError !== false) {
				throw(this.logIdentifier() + ' Cannot get collection ' + name + ' because it does not exist and auto-create has been disabled!');
			}

			return undefined;
		}

		if (this.debug()) {
			console.log(this.logIdentifier() + ' Creating collection ' + name);
		}

		this._collection[name] = this._collection[name] || new Collection(name, options).db(this);
		this._collection[name].mongoEmulation(this.mongoEmulation());

		if (options.primaryKey !== undefined) {
			this._collection[name].primaryKey(options.primaryKey);
		}

		if (options.capped !== undefined) {
			// Check we have a size
			if (options.size !== undefined) {
				this._collection[name].capped(options.capped);
				this._collection[name].cappedSize(options.size);
			} else {
				throw(this.logIdentifier() + ' Cannot create a capped collection without specifying a size!');
			}
		}

		// Listen for events on this collection so we can fire global events
		// on the database in response to it
		self._collection[name].on('change', function () {
			self.emit('change', self._collection[name], 'collection', name);
		});

		self.deferEmit('create', self._collection[name], 'collection', name);

		return this._collection[name];
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
 * @param {String|RegExp=} search The optional search string or
 * regular expression to use to match collection names against.
 * @returns {Array} An array of objects containing details of each
 * collection the database is currently managing.
 */
Db.prototype.collections = function (search) {
	var arr = [],
		collections = this._collection,
		collection,
		i;

	if (search) {
		if (!(search instanceof RegExp)) {
			// Turn the search into a regular expression
			search = new RegExp(search);
		}
	}

	for (i in collections) {
		if (collections.hasOwnProperty(i)) {
			collection = collections[i];

			if (search) {
				if (search.exec(i)) {
					arr.push({
						name: i,
						count: collection.count(),
						linked: collection.isLinked !== undefined ? collection.isLinked() : false
					});
				}
			} else {
				arr.push({
					name: i,
					count: collection.count(),
					linked: collection.isLinked !== undefined ? collection.isLinked() : false
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
},{"./Condition":7,"./Index2d":11,"./IndexBinaryTree":12,"./IndexHashMap":13,"./KeyValueStore":14,"./Metrics":15,"./Overload":27,"./Path":28,"./ReactorIO":29,"./Shared":31}],6:[function(_dereq_,module,exports){
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
Shared.mixin(CollectionGroup.prototype, 'Mixin.Tags');
Shared.mixin(CollectionGroup.prototype, 'Mixin.Events');

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

/**
 * Gets / sets the instance name.
 * @param {String=} name The new name to set.
 * @returns {*}
 */
Shared.synthesize(CollectionGroup.prototype, 'name');

CollectionGroup.prototype.addCollection = function (collection) {
	if (collection) {
		if (this._collections.indexOf(collection) === -1) {
			//var self = this;

			// Check for compatible primary keys
			if (this._collections.length) {
				if (this._primaryKey !== collection.primaryKey()) {
					throw(this.logIdentifier() + ' All collections in a collection group must have the same primary key!');
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
			chainPacket.data.dataSet = this.decouple(chainPacket.data.dataSet);

			// Remove old data
			this._data.remove(chainPacket.data.oldData);

			// Add new data
			this._data.insert(chainPacket.data.dataSet);
			break;

		case 'insert':
			// Decouple the data to ensure we are working with our own copy
			chainPacket.data.dataSet = this.decouple(chainPacket.data.dataSet);

			// Add new data
			this._data.insert(chainPacket.data.dataSet);
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
CollectionGroup.prototype.drop = function (callback) {
	if (!this.isDropped()) {
		var i,
			collArr,
			viewArr;

		if (this._debug) {
			console.log(this.logIdentifier() + ' Dropping');
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

		delete this._listeners;

		if (callback) { callback(false, true); }
	}

	return true;
};

// Extend DB to include collection groups
Db.prototype.init = function () {
	this._collectionGroup = {};
	DbInit.apply(this, arguments);
};

/**
 * Creates a new collectionGroup instance or returns an existing
 * instance if one already exists with the passed name.
 * @func collectionGroup
 * @memberOf Db
 * @param {String} name The name of the instance.
 * @returns {*}
 */
Db.prototype.collectionGroup = function (name) {
	var self = this;

	if (name) {
		// Handle being passed an instance
		if (name instanceof CollectionGroup) {
			return name;
		}

		if (this._collectionGroup && this._collectionGroup[name]) {
			return this._collectionGroup[name];
		}

		this._collectionGroup[name] = new CollectionGroup(name).db(this);

		self.deferEmit('create', self._collectionGroup[name], 'collectionGroup', name);

		return this._collectionGroup[name];
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
},{"./Collection":5,"./Shared":31}],7:[function(_dereq_,module,exports){
"use strict";

var //Overload = require('./Overload'),
	Shared,
	Condition;

Shared = _dereq_('./Shared');

/**
 * The condition class monitors a data source and updates it's internal
 * state depending on clauses that it has been given. When all clauses
 * are satisfied the then() callback is fired. If conditions were met
 * but data changed that made them un-met, the else() callback is fired.
 * @class
 * @constructor
 */
Condition = function () {
	this.init.apply(this, arguments);
};

/**
 * Class constructor calls this init method.
 * This allows the constructor to be overridden by other modules because
 * they can override the init method with their own.
 * @param {Collection|View} dataSource The condition's data source.
 * @param {String} id The id to assign to the new Condition.
 * @param {Object} clause The query clause.
 */
Condition.prototype.init = function (dataSource, id, clause) {
	this._dataSource = dataSource;
	this._id = id;
	this._query = [clause];
	this._started = false;
	this._state = [false];

	this._satisfied = false;

	// Set this to true by default for faster performance
	this.earlyExit(true);
};

// Tell ForerunnerDB about our new module
Shared.addModule('Condition', Condition);

// Mixin some commonly used methods
Shared.mixin(Condition.prototype, 'Mixin.Common');
Shared.mixin(Condition.prototype, 'Mixin.ChainReactor');

Shared.synthesize(Condition.prototype, 'id');
Shared.synthesize(Condition.prototype, 'then');
Shared.synthesize(Condition.prototype, 'else');
Shared.synthesize(Condition.prototype, 'earlyExit');
Shared.synthesize(Condition.prototype, 'debug');

/**
 * Adds a new clause to the condition.
 * @param {Object} clause The query clause to add to the condition.
 * @returns {Condition}
 */
Condition.prototype.and = function (clause) {
	this._query.push(clause);
	this._state.push(false);

	return this;
};

/**
 * Starts the condition so that changes to data will call callback
 * methods according to clauses being met.
 * @param {*} initialState Initial state of condition.
 * @returns {Condition}
 */
Condition.prototype.start = function (initialState) {
	if (!this._started) {
		var self = this;

		if (arguments.length !== 0) {
			this._satisfied = initialState;
		}

		// Resolve the current state
		this._updateStates();

		self._onChange = function () {
			self._updateStates();
		};

		// Create a chain reactor link to the data source so we start receiving CRUD ops from it
		this._dataSource.on('change', self._onChange);

		this._started = true;
	}

	return this;
};

/**
 * Updates the internal status of all the clauses against the underlying
 * data source.
 * @private
 */
Condition.prototype._updateStates = function () {
	var satisfied = true,
		i;

	for (i = 0; i < this._query.length; i++) {
		this._state[i] = this._dataSource.count(this._query[i]) > 0;

		if (this._debug) {
			console.log(this.logIdentifier() + ' Evaluating', this._query[i], '=', this._query[i]);
		}

		if (!this._state[i]) {
			satisfied = false;

			// Early exit since we have found a state that is not true
			if (this._earlyExit) {
				break;
			}
		}
	}

	if (this._satisfied !== satisfied) {
		// Our state has changed, fire the relevant operation
		if (satisfied) {
			// Fire the "then" operation
			if (this._then) {
				this._then();
			}
		} else {
			// Fire the "else" operation
			if (this._else) {
				this._else();
			}
		}

		this._satisfied = satisfied;
	}
};

/**
 * Stops the condition so that callbacks will no longer fire.
 * @returns {Condition}
 */
Condition.prototype.stop = function () {
	if (this._started) {
		this._dataSource.off('change', this._onChange);
		delete this._onChange;

		this._started = false;
	}

	return this;
};

/**
 * Drops the condition and removes it from memory.
 * @returns {Condition}
 */
Condition.prototype.drop = function () {
	this.stop();
	delete this._dataSource.when[this._id];

	return this;
};

// Tell ForerunnerDB that our module has finished loading
Shared.finishModule('Condition');
module.exports = Condition;
},{"./Shared":31}],8:[function(_dereq_,module,exports){
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
	Overload,
	_instances = [];

Shared = _dereq_('./Shared');
Overload = _dereq_('./Overload');

/**
 * Creates a new ForerunnerDB instance. Core instances handle the lifecycle of
 * multiple database instances.
 * @constructor
 */
var Core = function (val) {
	this.init.apply(this, arguments);
};

Core.prototype.init = function (name) {
	this._db = {};
	this._debug = {};
	this._name = name || 'ForerunnerDB';

	_instances.push(this);
};

/**
 * Returns the number of instantiated ForerunnerDB objects.
 * @returns {Number} The number of instantiated instances.
 */
Core.prototype.instantiatedCount = function () {
	return _instances.length;
};

/**
 * Get all instances as an array or a single ForerunnerDB instance
 * by it's array index.
 * @param {Number=} index Optional index of instance to get.
 * @returns {Array|Object} Array of instances or a single instance.
 */
Core.prototype.instances = function (index) {
	if (index !== undefined) {
		return _instances[index];
	}

	return _instances;
};

/**
 * Get all instances as an array of instance names or a single ForerunnerDB
 * instance by it's name.
 * @param {String=} name Optional name of instance to get.
 * @returns {Array|Object} Array of instance names or a single instance.
 */
Core.prototype.namedInstances = function (name) {
	var i,
		instArr;

	if (name !== undefined) {
		for (i = 0; i < _instances.length; i++) {
			if (_instances[i].name === name) {
				return _instances[i];
			}
		}

		return undefined;
	}

	instArr = [];

	for (i = 0; i < _instances.length; i++) {
		instArr.push(_instances[i].name);
	}

	return instArr;
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

			if (callback) { callback(); }
		}
	},

	/**
	 * Checks if an array of named modules are loaded and if so
	 * calls the passed callback method.
	 * @func moduleLoaded
	 * @memberof Core
	 * @param {Array} moduleName The array of module names to check for.
	 * @param {Function} callback The callback method to call if modules are loaded.
	 */
	'array, function': function (moduleNameArr, callback) {
		var moduleName,
			i;

		for (i = 0; i < moduleNameArr.length; i++) {
			moduleName = moduleNameArr[i];

			if (moduleName !== undefined) {
				moduleName = moduleName.replace(/ /g, '');

				var modules = moduleName.split(','),
					index;

				for (index = 0; index < modules.length; index++) {
					if (!Shared.modules[modules[index]]) {
						return false;
					}
				}
			}
		}

		if (callback) { callback(); }
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

// Expose moduleLoaded() method to non-instantiated object ForerunnerDB
Core.moduleLoaded = Core.prototype.moduleLoaded;

// Expose version() method to non-instantiated object ForerunnerDB
Core.version = Core.prototype.version;

// Expose instances() method to non-instantiated object ForerunnerDB
Core.instances = Core.prototype.instances;

// Expose instantiatedCount() method to non-instantiated object ForerunnerDB
Core.instantiatedCount = Core.prototype.instantiatedCount;

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

/**
 * Gets / sets mongodb emulation mode.
 * @param {Boolean=} val True to enable, false to disable.
 * @returns {*}
 */
Shared.synthesize(Core.prototype, 'mongoEmulation');

// Set a flag to determine environment
Core.prototype._isServer = false;

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
},{"./Db.js":9,"./Metrics.js":15,"./Overload":27,"./Shared":31}],9:[function(_dereq_,module,exports){
"use strict";

var Shared,
	Core,
	Collection,
	Metrics,
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

Shared.addModule('Db', Db);

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

			if (callback) { callback(); }
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
Shared.mixin(Db.prototype, 'Mixin.Tags');
Shared.mixin(Db.prototype, 'Mixin.Events');

Core = Shared.modules.Core;
Collection = _dereq_('./Collection.js');
Metrics = _dereq_('./Metrics.js');

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
 * Gets / sets mongodb emulation mode.
 * @param {Boolean=} val True to enable, false to disable.
 * @returns {*}
 */
Shared.synthesize(Db.prototype, 'mongoEmulation');

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
/*Db.prototype.on = function(event, listener) {
	this._listeners = this._listeners || {};
	this._listeners[event] = this._listeners[event] || [];
	this._listeners[event].push(listener);

	return this;
};*/

/**
 * De-registers an event listener from an event name.
 * @param {String} event The name of the event to stop listening for.
 * @param {Function} listener The listener method passed to on() when
 * registering the event listener.
 * @returns {*}
 */
/*Db.prototype.off = function(event, listener) {
	if (event in this._listeners) {
		var arr = this._listeners[event],
			index = arr.indexOf(listener);

		if (index > -1) {
			arr.splice(index, 1);
		}
	}

	return this;
};*/

/**
 * Emits an event by name with the given data.
 * @param {String} event The name of the event to emit.
 * @param {*=} data The data to emit with the event.
 * @returns {*}
 */
/*Db.prototype.emit = function(event, data) {
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
};*/

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
 * @returns {Object}
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
		if (!this.isDropped()) {
			var arr = this.collections(),
				arrCount = arr.length,
				arrIndex;

			this._state = 'dropped';

			for (arrIndex = 0; arrIndex < arrCount; arrIndex++) {
				this.collection(arr[arrIndex].name).drop();
				delete this._collection[arr[arrIndex].name];
			}

			this.emit('drop', this);

			delete this._listeners;
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
		if (!this.isDropped()) {
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

			delete this._listeners;
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
		if (!this.isDropped()) {
			var arr = this.collections(),
				arrCount = arr.length,
				arrIndex;

			this._state = 'dropped';

			for (arrIndex = 0; arrIndex < arrCount; arrIndex++) {
				this.collection(arr[arrIndex].name).drop(removePersist);
				delete this._collection[arr[arrIndex].name];
			}

			this.emit('drop', this);

			delete this._listeners;
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
		if (!this.isDropped()) {
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

			delete this._listeners;
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
	// Handle being passed an instance
	if (name instanceof Db) {
		return name;
	}

	if (!name) {
		name = this.objectId();
	}

	this._db[name] = this._db[name] || new Db(name, this);

	this._db[name].mongoEmulation(this.mongoEmulation());

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

Shared.finishModule('Db');
module.exports = Db;
},{"./Collection.js":5,"./Metrics.js":15,"./Overload":27,"./Shared":31}],10:[function(_dereq_,module,exports){
// geohash.js
// Geohash library for Javascript
// (c) 2008 David Troy
// Distributed under the MIT License
// Original at: https://github.com/davetroy/geohash-js

// Modified by Irrelon Software Limited (http://www.irrelon.com)
// to clean up and modularise the code using Node.js-style exports
// and add a few helper methods.
// @by Rob Evans - rob@irrelon.com
"use strict";

/*
Define some shared constants that will be used by all instances
of the module.
 */
var bits,
	base32,
	neighbors,
	borders,
	PI180 = Math.PI / 180,
	PI180R = 180 / Math.PI,
	earthRadius = 6371; // mean radius of the earth

bits = [16, 8, 4, 2, 1];

base32 = "0123456789bcdefghjkmnpqrstuvwxyz";
neighbors = {
	right: {even: "bc01fg45238967deuvhjyznpkmstqrwx"},
	left: {even: "238967debc01fg45kmstqrwxuvhjyznp"},
	top: {even: "p0r21436x8zb9dcf5h7kjnmqesgutwvy"},
	bottom: {even: "14365h7k9dcfesgujnmqp0r2twvyx8zb"}
};

borders = {
	right: {even: "bcfguvyz"},
	left: {even: "0145hjnp"},
	top: {even: "prxz"},
	bottom: {even: "028b"}
};

neighbors.bottom.odd = neighbors.left.even;
neighbors.top.odd = neighbors.right.even;
neighbors.left.odd = neighbors.bottom.even;
neighbors.right.odd = neighbors.top.even;

borders.bottom.odd = borders.left.even;
borders.top.odd = borders.right.even;
borders.left.odd = borders.bottom.even;
borders.right.odd = borders.top.even;

var GeoHash = function () {};

/**
 * Converts degrees to radians.
 * @param {Number} degrees
 * @return {Number} radians
 */
GeoHash.prototype.radians = function radians (degrees) {
	return degrees * PI180;
};

/**
 * Converts radians to degrees.
 * @param {Number} radians
 * @return {Number} degrees
 */
GeoHash.prototype.degrees = function (radians) {
	return radians * PI180R;
};

GeoHash.prototype.refineInterval = function (interval, cd, mask) {
	if (cd & mask) { //jshint ignore: line
		interval[0] = (interval[0] + interval[1]) / 2;
	} else {
		interval[1] = (interval[0] + interval[1]) / 2;
	}
};

/**
 * Calculates all surrounding neighbours of a hash and returns them.
 * @param {String} centerHash The hash at the center of the grid.
 * @param options
 * @returns {*}
 */
GeoHash.prototype.calculateNeighbours = function (centerHash, options) {
	var response;

	if (!options || options.type === 'object') {
		response = {
			center: centerHash,
			left: this.calculateAdjacent(centerHash, 'left'),
			right: this.calculateAdjacent(centerHash, 'right'),
			top: this.calculateAdjacent(centerHash, 'top'),
			bottom: this.calculateAdjacent(centerHash, 'bottom')
		};

		response.topLeft = this.calculateAdjacent(response.left, 'top');
		response.topRight = this.calculateAdjacent(response.right, 'top');
		response.bottomLeft = this.calculateAdjacent(response.left, 'bottom');
		response.bottomRight = this.calculateAdjacent(response.right, 'bottom');
	} else {
		response = [];

		response[4] = centerHash;
		response[3] = this.calculateAdjacent(centerHash, 'left');
		response[5] = this.calculateAdjacent(centerHash, 'right');
		response[1] = this.calculateAdjacent(centerHash, 'top');
		response[7] = this.calculateAdjacent(centerHash, 'bottom');

		response[0] = this.calculateAdjacent(response[3], 'top');
		response[2] = this.calculateAdjacent(response[5], 'top');
		response[6] = this.calculateAdjacent(response[3], 'bottom');
		response[8] = this.calculateAdjacent(response[5], 'bottom');
	}

	return response;
};

/**
 * Calculates a new lat/lng by travelling from the center point in the
 * bearing specified for the distance specified.
 * @param {Array} centerPoint An array with latitude at index 0 and
 * longitude at index 1.
 * @param {Number} distanceKm The distance to travel in kilometers.
 * @param {Number} bearing The bearing to travel in degrees (zero is
 * north).
 * @returns {{lat: Number, lng: Number}}
 */
GeoHash.prototype.calculateLatLngByDistanceBearing = function (centerPoint, distanceKm, bearing) {
	var curLon = centerPoint[1],
		curLat = centerPoint[0],

		destLat = Math.asin(Math.sin(this.radians(curLat)) * Math.cos(distanceKm / earthRadius) + Math.cos(this.radians(curLat)) * Math.sin(distanceKm / earthRadius) * Math.cos(this.radians(bearing))),
 		tmpLon = this.radians(curLon) + Math.atan2(Math.sin(this.radians(bearing)) * Math.sin(distanceKm / earthRadius) * Math.cos(this.radians(curLat)), Math.cos(distanceKm / earthRadius) - Math.sin(this.radians(curLat)) * Math.sin(destLat)),
		destLon = (tmpLon + 3 * Math.PI) % (2 * Math.PI) - Math.PI;  // normalise to -180..+180º

	return {
		lat: this.degrees(destLat),
		lng: this.degrees(destLon)
	};
};

/**
 * Calculates the extents of a bounding box around the center point which
 * encompasses the radius in kilometers passed.
 * @param {Array} centerPoint An array with latitude at index 0 and
 * longitude at index 1.
 * @param radiusKm Radius in kilometers.
 * @returns {{lat: Array, lng: Array}}
 */
GeoHash.prototype.calculateExtentByRadius = function (centerPoint, radiusKm) {
	var maxWest,
		maxEast,
		maxNorth,
		maxSouth,
		lat = [],
		lng = [];

	maxNorth = this.calculateLatLngByDistanceBearing(centerPoint, radiusKm, 0);
	maxEast = this.calculateLatLngByDistanceBearing(centerPoint, radiusKm, 90);
	maxSouth = this.calculateLatLngByDistanceBearing(centerPoint, radiusKm, 180);
	maxWest = this.calculateLatLngByDistanceBearing(centerPoint, radiusKm, 270);

	lat[0] = maxNorth.lat;
	lat[1] = maxSouth.lat;

	lng[0] = maxWest.lng;
	lng[1] = maxEast.lng;

	return {
		lat: lat,
		lng: lng
	};
};

/**
 * Calculates all the geohashes that make up the bounding box that surrounds
 * the circle created from the center point and radius passed.
 * @param {Array} centerPoint An array with latitude at index 0 and
 * longitude at index 1.
 * @param {Number} radiusKm The radius in kilometers to encompass.
 * @param {Number} precision The number of characters to limit the returned
 * geohash strings to.
 * @returns {Array} The array of geohashes that encompass the bounding box.
 */
GeoHash.prototype.calculateHashArrayByRadius = function (centerPoint, radiusKm, precision) {
	var extent = this.calculateExtentByRadius(centerPoint, radiusKm),
		northWest = [extent.lat[0], extent.lng[0]],
		northEast = [extent.lat[0], extent.lng[1]],
		southWest = [extent.lat[1], extent.lng[0]],
		northWestHash = this.encode(northWest[0], northWest[1], precision),
		northEastHash = this.encode(northEast[0], northEast[1], precision),
		southWestHash = this.encode(southWest[0], southWest[1], precision),
		hash,
		widthCount = 0,
		heightCount = 0,
		widthIndex,
		heightIndex,
		hashArray = [];

	hash = northWestHash;
	hashArray.push(hash);

	// Walk from north west to north east until we find the north east geohash
	while (hash !== northEastHash) {
		hash = this.calculateAdjacent(hash, 'right');
		widthCount++;

		hashArray.push(hash);
	}

	hash = northWestHash;

	// Walk from north west to south west until we find the south west geohash
	while (hash !== southWestHash) {
		hash = this.calculateAdjacent(hash, 'bottom');
		heightCount++;
	}

	// We now know the width and height in hash boxes of the area, fill in the
	// rest of the hashes into the hashArray array
	for (widthIndex = 0; widthIndex <= widthCount; widthIndex++) {
		hash = hashArray[widthIndex];

		for (heightIndex = 0; heightIndex < heightCount; heightIndex++) {
			hash = this.calculateAdjacent(hash, 'bottom');
			hashArray.push(hash);
		}
	}

	return hashArray;
};

/**
 * Calculates an adjacent hash to the hash passed, in the direction
 * specified.
 * @param {String} srcHash The hash to calculate adjacent to.
 * @param {String} dir Either "top", "left", "bottom" or "right".
 * @returns {String} The resulting geohash.
 */
GeoHash.prototype.calculateAdjacent = function (srcHash, dir) {
	srcHash = srcHash.toLowerCase();

	var lastChr = srcHash.charAt(srcHash.length - 1),
		type = (srcHash.length % 2) ? 'odd' : 'even',
		base = srcHash.substring(0, srcHash.length - 1);

	if (borders[dir][type].indexOf(lastChr) !== -1) {
		base = this.calculateAdjacent(base, dir);
	}

	return base + base32[neighbors[dir][type].indexOf(lastChr)];
};

/**
 * Decodes a string geohash back to a longitude/latitude array.
 * The array contains three latitudes and three longitudes. The
 * first of each is the lower extent of the geohash bounding box,
 * the second is the upper extent and the third is the center
 * of the geohash bounding box.
 * @param {String} geohash The hash to decode.
 * @returns {Object}
 */
GeoHash.prototype.decode = function (geohash) {
	var isEven = 1,
		lat = [],
		lon = [],
		i, c, cd, j, mask,
		latErr,
		lonErr;

	lat[0] = -90.0;
	lat[1] = 90.0;
	lon[0] = -180.0;
	lon[1] = 180.0;

	latErr = 90.0;
	lonErr = 180.0;

	for (i = 0; i < geohash.length; i++) {
		c = geohash[i];
		cd = base32.indexOf(c);

		for (j = 0; j < 5; j++) {
			mask = bits[j];

			if (isEven) {
				lonErr /= 2;
				this.refineInterval(lon, cd, mask);
			} else {
				latErr /= 2;
				this.refineInterval(lat, cd, mask);
			}

			isEven = !isEven;
		}
	}

	lat[2] = (lat[0] + lat[1]) / 2;
	lon[2] = (lon[0] + lon[1]) / 2;

	return {
		lat: lat,
		lng: lon
	};
};

/**
 * Encodes a longitude/latitude to geohash string.
 * @param latitude
 * @param longitude
 * @param {Number=} precision Length of the geohash string. Defaults to 12.
 * @returns {String}
 */
GeoHash.prototype.encode = function (latitude, longitude, precision) {
	var isEven = 1,
		mid,
		lat = [],
		lon = [],
		bit = 0,
		ch = 0,
		geoHash = "";

	if (!precision) { precision = 12; }

	lat[0] = -90.0;
	lat[1] = 90.0;
	lon[0] = -180.0;
	lon[1] = 180.0;

	while (geoHash.length < precision) {
		if (isEven) {
			mid = (lon[0] + lon[1]) / 2;

			if (longitude > mid) {
				ch |= bits[bit]; //jshint ignore: line
				lon[0] = mid;
			} else {
				lon[1] = mid;
			}
		} else {
			mid = (lat[0] + lat[1]) / 2;

			if (latitude > mid) {
				ch |= bits[bit]; //jshint ignore: line
				lat[0] = mid;
			} else {
				lat[1] = mid;
			}
		}

		isEven = !isEven;

		if (bit < 4) {
			bit++;
		} else {
			geoHash += base32[ch];
			bit = 0;
			ch = 0;
		}
	}

	return geoHash;
};

if (typeof module !== 'undefined') { module.exports = GeoHash; }
},{}],11:[function(_dereq_,module,exports){
"use strict";

/*
name(string)
id(string)
rebuild(null)
state ?? needed?
match(query, options)
lookup(query, options)
insert(doc)
remove(doc)
primaryKey(string)
collection(collection)
*/

var Shared = _dereq_('./Shared'),
	Path = _dereq_('./Path'),
	BinaryTree = _dereq_('./BinaryTree'),
	GeoHash = _dereq_('./GeoHash'),
	sharedPathSolver = new Path(),
	sharedGeoHashSolver = new GeoHash(),
	// GeoHash Distances in Kilometers
	geoHashDistance = [
		5000,
		1250,
		156,
		39.1,
		4.89,
		1.22,
		0.153,
		0.0382,
		0.00477,
		0.00119,
		0.000149,
		0.0000372
	];

/**
 * The index class used to instantiate 2d indexes that the database can
 * use to handle high-performance geospatial queries.
 * @constructor
 */
var Index2d = function () {
	this.init.apply(this, arguments);
};

/**
 * Create the index.
 * @param {Object} keys The object with the keys that the user wishes the index
 * to operate on.
 * @param {Object} options Can be undefined, if passed is an object with arbitrary
 * options keys and values.
 * @param {Collection} collection The collection the index should be created for.
 */
Index2d.prototype.init = function (keys, options, collection) {
	this._btree = new BinaryTree();
	this._btree.index(keys);
	this._size = 0;
	this._id = this._itemKeyHash(keys, keys);
	this._debug = options && options.debug ? options.debug : false;

	this.unique(options && options.unique ? options.unique : false);

	if (keys !== undefined) {
		this.keys(keys);
	}

	if (collection !== undefined) {
		this.collection(collection);
		this._btree.primaryKey(collection.primaryKey());
	}

	this.name(options && options.name ? options.name : this._id);
	this._btree.debug(this._debug);
};

Shared.addModule('Index2d', Index2d);
Shared.mixin(Index2d.prototype, 'Mixin.Common');
Shared.mixin(Index2d.prototype, 'Mixin.ChainReactor');
Shared.mixin(Index2d.prototype, 'Mixin.Sorting');

Index2d.prototype.id = function () {
	return this._id;
};

Index2d.prototype.state = function () {
	return this._state;
};

Index2d.prototype.size = function () {
	return this._size;
};

Shared.synthesize(Index2d.prototype, 'data');
Shared.synthesize(Index2d.prototype, 'name');
Shared.synthesize(Index2d.prototype, 'collection');
Shared.synthesize(Index2d.prototype, 'type');
Shared.synthesize(Index2d.prototype, 'unique');

Index2d.prototype.keys = function (val) {
	if (val !== undefined) {
		this._keys = val;

		// Count the keys
		this._keyCount = sharedPathSolver.parse(this._keys).length;
		return this;
	}

	return this._keys;
};

Index2d.prototype.rebuild = function () {
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
		this._btree.clear();
		this._size = 0;

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

Index2d.prototype.insert = function (dataItem, options) {
	var uniqueFlag = this._unique,
		uniqueHash;

	dataItem = this.decouple(dataItem);

	if (uniqueFlag) {
		uniqueHash = this._itemHash(dataItem, this._keys);
		this._uniqueLookup[uniqueHash] = dataItem;
	}

	// Convert 2d indexed values to geohashes
	var keys = this._btree.keys(),
		pathVal,
		geoHash,
		lng,
		lat,
		i;

	for (i = 0; i < keys.length; i++) {
		pathVal = sharedPathSolver.get(dataItem, keys[i].path);

		if (pathVal instanceof Array) {
			lng = pathVal[0];
			lat = pathVal[1];

			geoHash = sharedGeoHashSolver.encode(lng, lat);

			sharedPathSolver.set(dataItem, keys[i].path, geoHash);
		}
	}

	if (this._btree.insert(dataItem)) {
		this._size++;

		return true;
	}

	return false;
};

Index2d.prototype.remove = function (dataItem, options) {
	var uniqueFlag = this._unique,
		uniqueHash;

	if (uniqueFlag) {
		uniqueHash = this._itemHash(dataItem, this._keys);
		delete this._uniqueLookup[uniqueHash];
	}

	if (this._btree.remove(dataItem)) {
		this._size--;

		return true;
	}

	return false;
};

Index2d.prototype.violation = function (dataItem) {
	// Generate item hash
	var uniqueHash = this._itemHash(dataItem, this._keys);

	// Check if the item breaks the unique constraint
	return Boolean(this._uniqueLookup[uniqueHash]);
};

Index2d.prototype.hashViolation = function (uniqueHash) {
	// Check if the item breaks the unique constraint
	return Boolean(this._uniqueLookup[uniqueHash]);
};

/**
 * Looks up records that match the passed query and options.
 * @param query The query to execute.
 * @param options A query options object.
 * @param {Operation=} op Optional operation instance that allows
 * us to provide operation diagnostics and analytics back to the
 * main calling instance as the process is running.
 * @returns {*}
 */
Index2d.prototype.lookup = function (query, options, op) {
	// Loop the indexed keys and determine if the query has any operators
	// that we want to handle differently from a standard lookup
	var keys = this._btree.keys(),
		pathStr,
		pathVal,
		results,
		i;

	for (i = 0; i < keys.length; i++) {
		pathStr = keys[i].path;
		pathVal = sharedPathSolver.get(query, pathStr);

		if (typeof pathVal === 'object') {
			if (pathVal.$near) {
				results = [];

				// Do a near point lookup
				results = results.concat(this.near(pathStr, pathVal.$near, options, op));
			}

			if (pathVal.$geoWithin) {
				results = [];

				// Do a geoWithin shape lookup
				results = results.concat(this.geoWithin(pathStr, pathVal.$geoWithin, options, op));
			}

			return results;
		}
	}

	return this._btree.lookup(query, options);
};

Index2d.prototype.near = function (pathStr, query, options, op) {
	var self = this,
		neighbours,
		visitedCount,
		visitedNodes,
		visitedData,
		search,
		results,
		finalResults = [],
		precision,
		maxDistanceKm,
		distance,
		distCache,
		latLng,
		pk = this._collection.primaryKey(),
		i;

	// Calculate the required precision to encapsulate the distance
	// TODO: Instead of opting for the "one size larger" than the distance boxes,
	// TODO: we should calculate closest divisible box size as a multiple and then
	// TODO: scan neighbours until we have covered the area otherwise we risk
	// TODO: opening the results up to vastly more information as the box size
	// TODO: increases dramatically between the geohash precisions
	if (query.$distanceUnits === 'km') {
		maxDistanceKm = query.$maxDistance;

		for (i = 0; i < geoHashDistance.length; i++) {
			if (maxDistanceKm > geoHashDistance[i]) {
				precision = i + 1;
				break;
			}
		}
	} else if (query.$distanceUnits === 'miles') {
		maxDistanceKm = query.$maxDistance * 1.60934;

		for (i = 0; i < geoHashDistance.length; i++) {
			if (maxDistanceKm > geoHashDistance[i]) {
				precision = i + 1;
				break;
			}
		}
	}

	if (precision === 0) {
		precision = 1;
	}

	// Calculate 9 box geohashes
	if (op) { op.time('index2d.calculateHashArea'); }
	neighbours = sharedGeoHashSolver.calculateHashArrayByRadius(query.$point, maxDistanceKm, precision);
	if (op) { op.time('index2d.calculateHashArea'); }

	if (op) {
		op.data('index2d.near.precision', precision);
		op.data('index2d.near.hashArea', neighbours);
		op.data('index2d.near.maxDistanceKm', maxDistanceKm);
		op.data('index2d.near.centerPointCoords', [query.$point[0], query.$point[1]]);
	}

	// Lookup all matching co-ordinates from the btree
	results = [];
	visitedCount = 0;
	visitedData = {};
	visitedNodes = [];

	if (op) { op.time('index2d.near.getDocsInsideHashArea'); }
	for (i = 0; i < neighbours.length; i++) {
		search = this._btree.startsWith(pathStr, neighbours[i]);
		visitedData[neighbours[i]] = search;
		visitedCount += search._visitedCount;
		visitedNodes = visitedNodes.concat(search._visitedNodes);
		results = results.concat(search);
	}
	if (op) {
		op.time('index2d.near.getDocsInsideHashArea');
		op.data('index2d.near.startsWith', visitedData);
		op.data('index2d.near.visitedTreeNodes', visitedNodes);
	}

	// Work with original data
	if (op) { op.time('index2d.near.lookupDocsById'); }
	results = this._collection._primaryIndex.lookup(results);
	if (op) { op.time('index2d.near.lookupDocsById'); }

	if (query.$distanceField) {
		// Decouple the results before we modify them
		results = this.decouple(results);
	}

	if (results.length) {
		distance = {};

		if (op) { op.time('index2d.near.calculateDistanceFromCenter'); }
		// Loop the results and calculate distance
		for (i = 0; i < results.length; i++) {
			latLng = sharedPathSolver.get(results[i], pathStr);
			distCache = distance[results[i][pk]] = this.distanceBetweenPoints(query.$point[0], query.$point[1], latLng[0], latLng[1]);

			if (distCache <= maxDistanceKm) {
				if (query.$distanceField) {
					// Options specify a field to add the distance data to
					// so add it now
					sharedPathSolver.set(results[i], query.$distanceField, query.$distanceUnits === 'km' ? distCache : Math.round(distCache * 0.621371));
				}

				if (query.$geoHashField) {
					// Options specify a field to add the distance data to
					// so add it now
					sharedPathSolver.set(results[i], query.$geoHashField, sharedGeoHashSolver.encode(latLng[0], latLng[1], precision));
				}

				// Add item as it is inside radius distance
				finalResults.push(results[i]);
			}
		}
		if (op) { op.time('index2d.near.calculateDistanceFromCenter'); }

		// Sort by distance from center
		if (op) { op.time('index2d.near.sortResultsByDistance'); }
		finalResults.sort(function (a, b) {
			return self.sortAsc(distance[a[pk]], distance[b[pk]]);
		});
		if (op) { op.time('index2d.near.sortResultsByDistance'); }
	}

	// Return data
	return finalResults;
};

Index2d.prototype.geoWithin = function (pathStr, query, options) {
	console.log('geoWithin() is currently a prototype method with no actual implementation... it just returns a blank array.');
	return [];
};

Index2d.prototype.distanceBetweenPoints = function (lat1, lng1, lat2, lng2) {
	var R = 6371; // kilometres
	var lat1Rad = this.toRadians(lat1);
	var lat2Rad = this.toRadians(lat2);
	var lat2MinusLat1Rad = this.toRadians(lat2-lat1);
	var lng2MinusLng1Rad = this.toRadians(lng2-lng1);

	var a = Math.sin(lat2MinusLat1Rad/2) * Math.sin(lat2MinusLat1Rad/2) +
			Math.cos(lat1Rad) * Math.cos(lat2Rad) *
			Math.sin(lng2MinusLng1Rad/2) * Math.sin(lng2MinusLng1Rad/2);

	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

	return R * c;
};

Index2d.prototype.toRadians = function (degrees) {
	return degrees * 0.01747722222222;
};

Index2d.prototype.match = function (query, options) {
	// TODO: work out how to represent that this is a better match if the query has $near than
	// TODO: a basic btree index which will not be able to resolve a $near operator
	return this._btree.match(query, options);
};

Index2d.prototype._itemHash = function (item, keys) {
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

Index2d.prototype._itemKeyHash = function (item, keys) {
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

Index2d.prototype._itemHashArr = function (item, keys) {
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

// Register this index on the shared object
Shared.index['2d'] = Index2d;

Shared.finishModule('Index2d');
module.exports = Index2d;
},{"./BinaryTree":4,"./GeoHash":10,"./Path":28,"./Shared":31}],12:[function(_dereq_,module,exports){
"use strict";

/*
name(string)
id(string)
rebuild(null)
state ?? needed?
match(query, options)
lookup(query, options)
insert(doc)
remove(doc)
primaryKey(string)
collection(collection)
*/

var Shared = _dereq_('./Shared'),
	Path = _dereq_('./Path'),
	BinaryTree = _dereq_('./BinaryTree');

/**
 * The index class used to instantiate btree indexes that the database can
 * use to speed up queries on collections and views.
 * @constructor
 */
var IndexBinaryTree = function () {
	this.init.apply(this, arguments);
};

IndexBinaryTree.prototype.init = function (keys, options, collection) {
	this._btree = new BinaryTree();
	this._btree.index(keys);
	this._size = 0;
	this._id = this._itemKeyHash(keys, keys);
	this._debug = options && options.debug ? options.debug : false;

	this.unique(options && options.unique ? options.unique : false);

	if (keys !== undefined) {
		this.keys(keys);
	}

	if (collection !== undefined) {
		this.collection(collection);
		this._btree.primaryKey(collection.primaryKey());
	}

	this.name(options && options.name ? options.name : this._id);
	this._btree.debug(this._debug);
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
		this._btree.clear();
		this._size = 0;

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
		uniqueHash;

	if (uniqueFlag) {
		uniqueHash = this._itemHash(dataItem, this._keys);
		this._uniqueLookup[uniqueHash] = dataItem;
	}

	if (this._btree.insert(dataItem)) {
		this._size++;

		return true;
	}

	return false;
};

IndexBinaryTree.prototype.remove = function (dataItem, options) {
	var uniqueFlag = this._unique,
		uniqueHash;

	if (uniqueFlag) {
		uniqueHash = this._itemHash(dataItem, this._keys);
		delete this._uniqueLookup[uniqueHash];
	}

	if (this._btree.remove(dataItem)) {
		this._size--;

		return true;
	}

	return false;
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

IndexBinaryTree.prototype.lookup = function (query, options, op) {
	return this._btree.lookup(query, options, op);
};

IndexBinaryTree.prototype.match = function (query, options) {
	return this._btree.match(query, options);
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

// Register this index on the shared object
Shared.index.btree = IndexBinaryTree;

Shared.finishModule('IndexBinaryTree');
module.exports = IndexBinaryTree;
},{"./BinaryTree":4,"./Path":28,"./Shared":31}],13:[function(_dereq_,module,exports){
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
		this._size = 0;

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

// Register this index on the shared object
Shared.index.hashed = IndexHashMap;

Shared.finishModule('IndexHashMap');
module.exports = IndexHashMap;
},{"./Path":28,"./Shared":31}],14:[function(_dereq_,module,exports){
"use strict";

var Shared = _dereq_('./Shared');

/**
 * The key value store class used when storing basic in-memory KV data,
 * and can be queried for quick retrieval. Mostly used for collection
 * primary key indexes and lookups.
 * @param {String=} name Optional KV store name.
 * @param {Object=} options Optional KV store options object. Currently
 * supports "primaryKey" as a string.
 * @constructor
 */
var KeyValueStore = function (name, options) {
	this.init.apply(this, arguments);
};

KeyValueStore.prototype.init = function (name, options) {
	// Ensure we have options
	options = options || {};
	
	// Set our internal data settings
	this._name = name;
	this._data = {};
	this._primaryKey = options.primaryKey || '_id';
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
 * @param {*} val A lookup query.
 * @returns {*}
 */
KeyValueStore.prototype.lookup = function (val) {
	var pk = this._primaryKey,
		valType = typeof val,
		arrIndex,
		arrCount,
		lookupItem,
		result = [];

	// Check for early exit conditions
	if (valType === 'string' || valType === 'number') {
		lookupItem = this.get(val);
		if (lookupItem !== undefined) {
			return [lookupItem];
		} else {
			return [];
		}
	} else if (valType === 'object') {
		if (val instanceof Array) {
			// An array of primary keys, find all matches
			arrCount = val.length;
			result = [];

			for (arrIndex = 0; arrIndex < arrCount; arrIndex++) {
				lookupItem = this.lookup(val[arrIndex]);

				if (lookupItem) {
					if (lookupItem instanceof Array) {
						result = result.concat(lookupItem);
					} else {
						result.push(lookupItem);
					}
				}
			}

			return result;
		} else if (val[pk] !== undefined && val[pk] !== null) {
			return this.lookup(val[pk]);
		}
	}

	// COMMENTED AS CODE WILL NEVER BE REACHED
	// Complex lookup
	/*lookupData = this._lookupKeys(val);
	keys = lookupData.keys;
	negate = lookupData.negate;

	if (!negate) {
		// Loop keys and return values
		for (arrIndex = 0; arrIndex < keys.length; arrIndex++) {
			result.push(this.get(keys[arrIndex]));
		}
	} else {
		// Loop data and return non-matching keys
		for (arrIndex in this._data) {
			if (this._data.hasOwnProperty(arrIndex)) {
				if (keys.indexOf(arrIndex) === -1) {
					result.push(this.get(arrIndex));
				}
			}
		}
	}

	return result;*/
};

// COMMENTED AS WE ARE NOT CURRENTLY PASSING COMPLEX QUERIES TO KEYVALUESTORE INDEXES
/*KeyValueStore.prototype._lookupKeys = function (val) {
	var pk = this._primaryKey,
		valType = typeof val,
		arrIndex,
		arrCount,
		lookupItem,
		bool,
		result;

	if (valType === 'string' || valType === 'number') {
		return {
			keys: [val],
			negate: false
		};
	} else if (valType === 'object') {
		if (val instanceof RegExp) {
			// Create new data
			result = [];

			for (arrIndex in this._data) {
				if (this._data.hasOwnProperty(arrIndex)) {
					if (val.test(arrIndex)) {
						result.push(arrIndex);
					}
				}
			}

			return {
				keys: result,
				negate: false
			};
		} else if (val instanceof Array) {
			// An array of primary keys, find all matches
			arrCount = val.length;
			result = [];

			for (arrIndex = 0; arrIndex < arrCount; arrIndex++) {
				result = result.concat(this._lookupKeys(val[arrIndex]).keys);
			}

			return {
				keys: result,
				negate: false
			};
		} else if (val.$in && (val.$in instanceof Array)) {
			return {
				keys: this._lookupKeys(val.$in).keys,
				negate: false
			};
		} else if (val.$nin && (val.$nin instanceof Array)) {
			return {
				keys: this._lookupKeys(val.$nin).keys,
				negate: true
			};
		} else if (val.$ne) {
			return {
				keys: this._lookupKeys(val.$ne, true).keys,
				negate: true
			};
		} else if (val.$or && (val.$or instanceof Array)) {
			// Create new data
			result = [];

			for (arrIndex = 0; arrIndex < val.$or.length; arrIndex++) {
				result = result.concat(this._lookupKeys(val.$or[arrIndex]).keys);
			}

			return {
				keys: result,
				negate: false
			};
		} else if (val[pk]) {
			return this._lookupKeys(val[pk]);
		}
	}
};*/

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
},{"./Shared":31}],15:[function(_dereq_,module,exports){
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
},{"./Operation":26,"./Shared":31}],16:[function(_dereq_,module,exports){
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
 * The chain reactor mixin, provides methods to the target object that allow chain
 * reaction events to propagate to the target and be handled, processed and passed
 * on down the chain.
 * @mixin
 */
var ChainReactor = {
	/**
	 * Creates a chain link between the current reactor node and the passed
	 * reactor node. Chain packets that are send by this reactor node will
	 * then be propagated to the passed node for subsequent packets.
	 * @param {*} obj The chain reactor node to link to.
	 */
	chain: function (obj) {
		if (this.debug && this.debug()) {
			if (obj._reactorIn && obj._reactorOut) {
				console.log(obj._reactorIn.logIdentifier() + ' Adding target "' + obj._reactorOut.instanceIdentifier() + '" to the chain reactor target list');
			} else {
				console.log(this.logIdentifier() + ' Adding target "' + obj.instanceIdentifier() + '" to the chain reactor target list');
			}
		}

		this._chain = this._chain || [];
		var index = this._chain.indexOf(obj);

		if (index === -1) {
			this._chain.push(obj);
		}
	},

	/**
	 * Removes a chain link between the current reactor node and the passed
	 * reactor node. Chain packets sent from this reactor node will no longer
	 * be received by the passed node.
	 * @param {*} obj The chain reactor node to unlink from.
	 */
	unChain: function (obj) {
		if (this.debug && this.debug()) {
			if (obj._reactorIn && obj._reactorOut) {
				console.log(obj._reactorIn.logIdentifier() + ' Removing target "' + obj._reactorOut.instanceIdentifier() + '" from the chain reactor target list');
			} else {
				console.log(this.logIdentifier() + ' Removing target "' + obj.instanceIdentifier() + '" from the chain reactor target list');
			}
		}

		if (this._chain) {
			var index = this._chain.indexOf(obj);

			if (index > -1) {
				this._chain.splice(index, 1);
			}
		}
	},

	/**
	 * Gets / sets the flag that will enable / disable chain reactor sending
	 * from this instance. Chain reactor sending is enabled by default on all
	 * instances.
	 * @param {Boolean} val True or false to enable or disable chain sending.
	 * @returns {*}
	 */
	chainEnabled: function (val) {
		if (val !== undefined) {
			this._chainDisabled = !val;
			return this;
		}

		return !this._chainDisabled;
	},

	/**
	 * Determines if this chain reactor node has any listeners downstream.
	 * @returns {Boolean} True if there are nodes downstream of this node.
	 */
	chainWillSend: function () {
		return Boolean(this._chain && !this._chainDisabled);
	},

	/**
	 * Sends a chain reactor packet downstream from this node to any of its
	 * chained targets that were linked to this node via a call to chain().
	 * @param {String} type The type of chain reactor packet to send. This
	 * can be any string but the receiving reactor nodes will not react to
	 * it unless they recognise the string. Built-in strings include: "insert",
	 * "update", "remove", "setData" and "debug".
	 * @param {Object} data A data object that usually contains a key called
	 * "dataSet" which is an array of items to work on, and can contain other
	 * custom keys that help describe the operation.
	 * @param {Object=} options An options object. Can also contain custom
	 * key/value pairs that your custom chain reactor code can operate on.
	 */
	chainSend: function (type, data, options) {
		if (this._chain && !this._chainDisabled) {
			var arr = this._chain,
				arrItem,
				count = arr.length,
				index,
				dataCopy = this.decouple(data, count);

			for (index = 0; index < count; index++) {
				arrItem = arr[index];

				if (!arrItem._state || (arrItem._state && !arrItem.isDropped())) {
					if (this.debug && this.debug()) {
						if (arrItem._reactorIn && arrItem._reactorOut) {
							console.log(arrItem._reactorIn.logIdentifier() + ' Sending data down the chain reactor pipe to "' + arrItem._reactorOut.instanceIdentifier() + '"');
						} else {
							console.log(this.logIdentifier() + ' Sending data down the chain reactor pipe to "' + arrItem.instanceIdentifier() + '"');
						}
					}

					if (arrItem.chainReceive) {
						arrItem.chainReceive(this, type, dataCopy[index], options);
					}
				} else {
					console.log('Reactor Data:', type, data, options);
					console.log('Reactor Node:', arrItem);
					throw('Chain reactor attempting to send data to target reactor node that is in a dropped state!');
				}

			}
		}
	},

	/**
	 * Handles receiving a chain reactor message that was sent via the chainSend()
	 * method. Creates the chain packet object and then allows it to be processed.
	 * @param {Object} sender The node that is sending the packet.
	 * @param {String} type The type of packet.
	 * @param {Object} data The data related to the packet.
	 * @param {Object=} options An options object.
	 */
	chainReceive: function (sender, type, data, options) {
		var chainPacket = {
				sender: sender,
				type: type,
				data: data,
				options: options
			},
			cancelPropagate = false;

		if (this.debug && this.debug()) {
			console.log(this.logIdentifier() + ' Received data from parent reactor node');
		}

		// Check if we have a chain handler method
		if (this._chainHandler) {
			// Fire our internal handler
			cancelPropagate = this._chainHandler(chainPacket);
		}

		// Check if we were told to cancel further propagation
		if (!cancelPropagate) {
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
	Serialiser = _dereq_('./Serialiser'),
	Common,
	serialiser = new Serialiser(),
	crcTable;

crcTable = (function () {
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

/**
 * Provides commonly used methods to most classes in ForerunnerDB.
 * @mixin
 */
Common = {
	// Expose the serialiser object so it can be extended with new data handlers.
	serialiser: serialiser,

	/**
	 * Generates a JSON serialisation-compatible object instance. After the
	 * instance has been passed through this method, it will be able to survive
	 * a JSON.stringify() and JSON.parse() cycle and still end up as an
	 * instance at the end. Further information about this process can be found
	 * in the ForerunnerDB wiki at: https://github.com/Irrelon/ForerunnerDB/wiki/Serialiser-&-Performance-Benchmarks
	 * @param {*} val The object instance such as "new Date()" or "new RegExp()".
	 */
	make: function (val) {
		// This is a conversion request, hand over to serialiser
		return serialiser.convert(val);
	},

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
		if (data !== undefined && data !== "") {
			if (!copies) {
				return this.jParse(this.jStringify(data));
			} else {
				var i,
					json = this.jStringify(data),
					copyArr = [];

				for (i = 0; i < copies; i++) {
					copyArr.push(this.jParse(json));
				}

				return copyArr;
			}
		}

		return undefined;
	},

	/**
	 * Parses and returns data from stringified version.
	 * @param {String} data The stringified version of data to parse.
	 * @returns {Object} The parsed JSON object from the data.
	 */
	jParse: function (data) {
		return JSON.parse(data, serialiser.reviver());
	},

	/**
	 * Converts a JSON object into a stringified version.
	 * @param {Object} data The data to stringify.
	 * @returns {String} The stringified data.
	 */
	jStringify: JSON.stringify,
	
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
	 * Generates a unique hash for the passed object.
	 * @param {Object} obj The object to generate a hash for.
	 * @returns {String}
	 */
	hash: function (obj) {
		return JSON.stringify(obj);
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
	]),

	/**
	 * Returns a string describing the class this instance is derived from.
	 * @returns {String}
	 */
	classIdentifier: function () {
		return 'ForerunnerDB.' + this.className;
	},

	/**
	 * Returns a string describing the instance by it's class name and instance
	 * object name.
	 * @returns {String} The instance identifier.
	 */
	instanceIdentifier: function () {
		return '[' + this.className + ']' + this.name();
	},

	/**
	 * Returns a string used to denote a console log against this instance,
	 * consisting of the class identifier and instance identifier.
	 * @returns {String} The log identifier.
	 */
	logIdentifier: function () {
		return 'ForerunnerDB ' + this.instanceIdentifier();
	},

	/**
	 * Converts a query object with MongoDB dot notation syntax
	 * to Forerunner's object notation syntax.
	 * @param {Object} obj The object to convert.
	 */
	convertToFdb: function (obj) {
		var varName,
			splitArr,
			objCopy,
			i;

		for (i in obj) {
			if (obj.hasOwnProperty(i)) {
				objCopy = obj;

				if (i.indexOf('.') > -1) {
					// Replace .$ with a placeholder before splitting by . char
					i = i.replace('.$', '[|$|]');
					splitArr = i.split('.');

					while ((varName = splitArr.shift())) {
						// Replace placeholder back to original .$
						varName = varName.replace('[|$|]', '.$');

						if (splitArr.length) {
							objCopy[varName] = {};
						} else {
							objCopy[varName] = obj[i];
						}

						objCopy = objCopy[varName];
					}

					delete obj[i];
				}
			}
		}
	},

	/**
	 * Checks if the state is dropped.
	 * @returns {boolean} True when dropped, false otherwise.
	 */
	isDropped: function () {
		return this._state === 'dropped';
	},

	/**
	 * Registers a timed callback that will overwrite itself if
	 * the same id is used within the timeout period. Useful
	 * for de-bouncing fast-calls.
	 * @param {String} id An ID for the call (use the same one
	 * to debounce the same calls).
	 * @param {Function} callback The callback method to call on
	 * timeout.
	 * @param {Number} timeout The timeout in milliseconds before
	 * the callback is called.
	 */
	debounce: function (id, callback, timeout) {
		var self = this,
			newData;

		self._debounce = self._debounce || {};

		if (self._debounce[id]) {
			// Clear timeout for this item
			clearTimeout(self._debounce[id].timeout);
		}

		newData = {
			callback: callback,
			timeout: setTimeout(function () {
				// Delete existing reference
				delete self._debounce[id];

				// Call the callback
				callback();
			}, timeout)
		};

		// Save current data
		self._debounce[id] = newData;
	},
	
	/**
	 * Returns a checksum of a string.
	 * @param {String} str The string to checksum.
	 * @return {Number} The checksum generated.
	 */
	checksum: function (str) {
		var crc = 0 ^ (-1), // jshint ignore:line
			i;
		
		for (i = 0; i < str.length; i++) {
			crc = (crc >>> 8) ^ crcTable[(crc ^ str.charCodeAt(i)) & 0xFF]; // jshint ignore:line
		}
		
		return (crc ^ (-1)) >>> 0; // jshint ignore:line
	}
};

module.exports = Common;
},{"./Overload":27,"./Serialiser":30}],19:[function(_dereq_,module,exports){
"use strict";

/**
 * Provides some database constants.
 * @mixin
 */
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

/**
 * Provides event emitter functionality including the methods: on, off, once, emit, deferEmit.
 * @mixin
 * @name Events
 */
var Events = {
	on: new Overload({
		/**
		 * Attach an event listener to the passed event.
		 * @name on
		 * @method Events.on
		 * @param {String} event The name of the event to listen for.
		 * @param {Function} listener The method to call when the event is fired.
		 * @returns {*}
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
		 * @name on
		 * @method Events.on
		 * @param {String} event The name of the event to listen for.
		 * @param {*} id The document id to match against.
		 * @param {Function} listener The method to call when the event is fired.
		 * @returns {*}
		 */
		'string, *, function': function (event, id, listener) {
			this._listeners = this._listeners || {};
			this._listeners[event] = this._listeners[event] || {};
			this._listeners[event][id] = this._listeners[event][id] || [];
			this._listeners[event][id].push(listener);

			return this;
		}
	}),

	once: new Overload({
		/**
		 * Attach an event listener to the passed event that will be called only once.
		 * @name once
		 * @method Events.once
		 * @param {String} event The name of the event to listen for.
		 * @param {Function} listener The method to call when the event is fired.
		 * @returns {*}
		 */
		'string, function': function (event, listener) {
			var self = this,
				fired = false,
				internalCallback = function () {
					if (!fired) {
						self.off(event, internalCallback);
						listener.apply(self, arguments);
						fired = true;
					}
				};

			return this.on(event, internalCallback);
		},
		
		/**
		 * Attach an event listener to the passed event that will be called only once.
		 * @name once
		 * @method Events.once
		 * @param {String} event The name of the event to listen for.
		 * @param {String} id The document id to match against.
		 * @param {Function} listener The method to call when the event is fired.
		 * @returns {*}
		 */
		'string, *, function': function (event, id, listener) {
			var self = this,
				fired = false,
				internalCallback = function () {
					if (!fired) {
						self.off(event, id, internalCallback);
						listener.apply(self, arguments);
						fired = true;
					}
				};

			return this.on(event, id, internalCallback);
		}
	}),

	off: new Overload({
		/**
		 * Cancels all event listeners for the passed event.
		 * @name off
		 * @method Events.off
		 * @param {String} event The name of the event.
		 * @returns {*}
		 */
		'string': function (event) {
			var self = this;

			if (this._emitting) {
				this._eventRemovalQueue = this._eventRemovalQueue || [];
				this._eventRemovalQueue.push(function () {
					self.off(event);
				});
			} else {
				if (this._listeners && this._listeners[event] && event in this._listeners) {
					delete this._listeners[event];
				}
			}

			return this;
		},
		
		/**
		 * Cancels the event listener for the passed event and listener function.
		 * @name off
		 * @method Events.off
		 * @param {String} event The event to cancel listener for.
		 * @param {Function} listener The event listener function used in the on()
		 * or once() call to cancel.
		 * @returns {*}
		 */
		'string, function': function (event, listener) {
			var self = this,
				arr,
				index;

			if (this._emitting) {
				this._eventRemovalQueue = this._eventRemovalQueue || [];
				this._eventRemovalQueue.push(function () {
					self.off(event, listener);
				});
			} else {
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
			}

			return this;
		},
		
		/**
		 * Cancels an event listener based on an event name, id and listener function.
		 * @name off
		 * @method Events.off
		 * @param {String} event The event to cancel listener for.
		 * @param {String} id The ID of the event to cancel listening for.
		 * @param {Function} listener The event listener function used in the on()
		 * or once() call to cancel.
		 */
		'string, *, function': function (event, id, listener) {
			var self = this;

			if (this._emitting) {
				this._eventRemovalQueue = this._eventRemovalQueue || [];
				this._eventRemovalQueue.push(function () {
					self.off(event, id, listener);
				});
			} else {
				if (this._listeners && event in this._listeners && id in this.listeners[event]) {
					var arr = this._listeners[event][id],
						index = arr.indexOf(listener);

					if (index > -1) {
						arr.splice(index, 1);
					}
				}
			}
		},

		/**
		 * Cancels all listeners for an event based on the passed event name and id.
		 * @name off
		 * @method Events.off
		 * @param {String} event The event name to cancel listeners for.
		 * @param {*} id The ID to cancel all listeners for.
		 */
		'string, *': function (event, id) {
			var self = this;

			if (this._emitting) {
				this._eventRemovalQueue = this._eventRemovalQueue || [];
				this._eventRemovalQueue.push(function () {
					self.off(event, id);
				});
			} else {
				if (this._listeners && event in this._listeners && id in this._listeners[event]) {
					// Kill all listeners for this event id
					delete this._listeners[event][id];
				}
			}
		}
	}),
	
	/**
	 * Emit an event with data.
	 * @name emit
	 * @method Events.emit
	 * @param {String} event The event to emit.
	 * @param {*} data Data to emit with the event.
	 * @returns {*}
	 */
	emit: function (event, data) {
		this._listeners = this._listeners || {};
		this._emitting = true;

		if (event in this._listeners) {
			var arrIndex,
				arrCount,
				tmpFunc,
				arr,
				listenerIdArr,
				listenerIdCount,
				listenerIdIndex;

			// Handle global emit
			if (this._listeners[event]['*']) {
				arr = this._listeners[event]['*'];
				arrCount = arr.length;

				for (arrIndex = 0; arrIndex < arrCount; arrIndex++) {
					// Check we have a function to execute
					tmpFunc = arr[arrIndex];

					if (typeof tmpFunc === 'function') {
						tmpFunc.apply(this, Array.prototype.slice.call(arguments, 1));
					}
				}
			}

			// Handle individual emit
			if (data instanceof Array) {
				// Check if the array is an array of objects in the collection
				if (data[0] && data[0][this._primaryKey]) {
					// Loop the array and check for listeners against the primary key
					listenerIdArr = this._listeners[event];
					arrCount = data.length;

					for (arrIndex = 0; arrIndex < arrCount; arrIndex++) {
						if (listenerIdArr[data[arrIndex][this._primaryKey]]) {
							// Emit for this id
							listenerIdCount = listenerIdArr[data[arrIndex][this._primaryKey]].length;
							for (listenerIdIndex = 0; listenerIdIndex < listenerIdCount; listenerIdIndex++) {
								tmpFunc = listenerIdArr[data[arrIndex][this._primaryKey]][listenerIdIndex];

								if (typeof tmpFunc === 'function') {
									listenerIdArr[data[arrIndex][this._primaryKey]][listenerIdIndex].apply(this, Array.prototype.slice.call(arguments, 1));
								}
							}
						}
					}
				}
			}
		}

		this._emitting = false;
		this._processRemovalQueue();

		return this;
	},

	/**
	 * If events are cleared with the off() method while the event emitter is
	 * actively processing any events then the off() calls get added to a
	 * queue to be executed after the event emitter is finished. This stops
	 * errors that might occur by potentially modifying the event queue while
	 * the emitter is running through them. This method is called after the
	 * event emitter is finished processing.
	 * @name _processRemovalQueue
	 * @method Events._processRemovalQueue
	 * @private
	 */
	_processRemovalQueue: function () {
		var i;

		if (this._eventRemovalQueue && this._eventRemovalQueue.length) {
			// Execute each removal call
			for (i = 0; i < this._eventRemovalQueue.length; i++) {
				this._eventRemovalQueue[i]();
			}

			// Clear the removal queue
			this._eventRemovalQueue = [];
		}
	},

	/**
	 * Queues an event to be fired. This has automatic de-bouncing so that any
	 * events of the same type that occur within 100 milliseconds of a previous
	 * one will all be wrapped into a single emit rather than emitting tons of
	 * events for lots of chained inserts etc. Only the data from the last
	 * de-bounced event will be emitted.
	 * @name deferEmit
	 * @method Events.deferEmit
	 * @param {String} eventName The name of the event to emit.
	 * @param {*=} data Optional data to emit with the event.
	 */
	deferEmit: function (eventName, data) {
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
				if (self.debug()) {
					console.log(self.logIdentifier() + ' Emitting ' + args[0]);
				}

				self.emit.apply(self, args);
			}, 1);
		} else {
			this.emit.apply(this, arguments);
		}

		return this;
	}
};

module.exports = Events;
},{"./Overload":27}],21:[function(_dereq_,module,exports){
"use strict";

/**
 * Provides object matching algorithm methods.
 * @mixin
 */
var Matching = {
	/**
	 * Internal method that checks a document against a test object.
	 * @param {*} source The source object or value to test against.
	 * @param {*} test The test object or value to test with.
	 * @param {Object} queryOptions The options the query was passed with.
	 * @param {String=} opToApply The special operation to apply to the test such
	 * as 'and' or an 'or' operator.
	 * @param {Object=} options An object containing options to apply to the
	 * operation such as limiting the fields returned etc.
	 * @returns {Boolean} True if the test was positive, false on negative.
	 * @private
	 */
	_match: function (source, test, queryOptions, opToApply, options) {
		// TODO: This method is quite long, break into smaller pieces
		var operation,
			applyOp = opToApply,
			recurseVal,
			tmpIndex,
			sourceType = typeof source,
			testType = typeof test,
			matchedAll = true,
			opResult,
			substringCache,
			i;

		if (sourceType === 'object' && source === null) {
			sourceType = 'null';
		}

		if (testType === 'object' && test === null) {
			testType = 'null';
		}

		options = options || {};
		queryOptions = queryOptions || {};

		// Check if options currently holds a root query object
		if (!options.$rootQuery) {
			// Root query not assigned, hold the root query
			options.$rootQuery = test;
		}

		// Check if options currently holds a root source object
		if (!options.$rootSource) {
			// Root query not assigned, hold the root query
			options.$rootSource = source;
		}

		// Assign current query data
		options.$currentQuery = test;

		options.$rootData = options.$rootData || {};

		// Check if the comparison data are both strings or numbers
		if ((sourceType === 'string' || sourceType === 'number' || sourceType === 'null') && (testType === 'string' || testType === 'number' || testType === 'null')) {
			// The source and test data are flat types that do not require recursive searches,
			// so just compare them and return the result
			if (sourceType === 'number' || sourceType === 'null' || testType === 'null') {
				// Number or null comparison
				if (source !== test) {
					matchedAll = false;
				}
			} else {
				// String comparison
				// TODO: We can probably use a queryOptions.$locale as a second parameter here
				// TODO: to satisfy https://github.com/Irrelon/ForerunnerDB/issues/35
				if (source.localeCompare(test)) {
					matchedAll = false;
				}
			}
		} else if ((sourceType === 'string' || sourceType === 'number') && (testType === 'object' && test instanceof RegExp)) {
			if (!test.test(source)) {
				matchedAll = false;
			}
		} else {
			for (i in test) {
				if (test.hasOwnProperty(i)) {
					// Assign previous query data
					options.$previousQuery = options.$parent;

					// Assign parent query data
					options.$parent = {
						query: test[i],
						key: i,
						parent: options.$previousQuery
					};

					// Reset operation flag
					operation = false;

					// Grab first two chars of the key name to check for $
					substringCache = i.substr(0, 2);

					// Check if the property is a comment (ignorable)
					if (substringCache === '//') {
						// Skip this property
						continue;
					}

					// Check if the property starts with a dollar (function)
					if (substringCache.indexOf('$') === 0) {
						// Ask the _matchOp method to handle the operation
						opResult = this._matchOp(i, source, test[i], queryOptions, options);

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

						if (sourceType === 'object' && source[i] !== undefined && test[i].test(source[i])) {
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
										recurseVal = this._match(source[i][tmpIndex], test[i], queryOptions, applyOp, options);

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
										recurseVal = this._match(source[i], test[i][tmpIndex], queryOptions, applyOp, options);

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
									recurseVal = this._match(source[i], test[i], queryOptions, applyOp, options);

									if (recurseVal) {
										if (opToApply === 'or') {
											return true;
										}
									} else {
										matchedAll = false;
									}
								} else {
									recurseVal = this._match(undefined, test[i], queryOptions, applyOp, options);

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
									recurseVal = this._match(undefined, test[i], queryOptions, applyOp, options);

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
									recurseVal = this._match(source[i][tmpIndex], test[i], queryOptions, applyOp, options);

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
	 * @param {Object} queryOptions The options the query was passed with.
	 * @param {Object=} options An options object.
	 * @returns {*}
	 * @private
	 */
	_matchOp: function (key, source, test, queryOptions, options) {
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

			case '$eq': // Equals
				return source == test; // jshint ignore:line

			case '$eeq': // Equals equals
				return source === test;

			case '$ne': // Not equals
				return source != test; // jshint ignore:line

			case '$nee': // Not equals equals
				return source !== test;

			case '$or':
				// Match true on ANY check to pass
				for (var orIndex = 0; orIndex < test.length; orIndex++) {
					if (this._match(source, test[orIndex], queryOptions, 'and', options)) {
						return true;
					}
				}

				return false;

			case '$and':
				// Match true on ALL checks to pass
				for (var andIndex = 0; andIndex < test.length; andIndex++) {
					if (!this._match(source, test[andIndex], queryOptions, 'and', options)) {
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
						if (this._match(source, inArr[inArrIndex], queryOptions, 'and', options)) {
							return true;
						}
					}

					return false;
				} else if (typeof test === 'object') {
					return this._match(source, test, queryOptions, 'and', options);
				} else {
					console.log(this.logIdentifier() + ' Cannot use an $in operator on a non-array key: ' + key, options.$rootQuery);
					return false;
				}
				break;

			case '$nin': // Not in
				// Check that the not-in test is an array
				if (test instanceof Array) {
					var notInArr = test,
						notInArrCount = notInArr.length,
						notInArrIndex;

					for (notInArrIndex = 0; notInArrIndex < notInArrCount; notInArrIndex++) {
						if (this._match(source, notInArr[notInArrIndex], queryOptions, 'and', options)) {
							return false;
						}
					}

					return true;
				} else if (typeof test === 'object') {
					return this._match(source, test, queryOptions, 'and', options);
				} else {
					console.log(this.logIdentifier() + ' Cannot use a $nin operator on a non-array key: ' + key, options.$rootQuery);
					return false;
				}
				break;

			case '$fastIn':
				if (test instanceof Array) {
					// Source is a string or number, use indexOf to identify match in array
					return test.indexOf(source) !== -1;
				} else {
					console.log(this.logIdentifier() + ' Cannot use an $fastIn operator on a non-array key: ' + key, options.$rootQuery);
					return false;
				}
				break;

			case '$distinct':
				var lookupPath,
					value,
					finalDistinctProp;
				
				// Ensure options holds a distinct lookup
				options.$rootData['//distinctLookup'] = options.$rootData['//distinctLookup'] || {};
				
				for (var distinctProp in test) {
					if (test.hasOwnProperty(distinctProp)) {
						if (typeof test[distinctProp] === 'object') {
							// Get the path string from the object
							lookupPath = this.sharedPathSolver.parse(test)[0].path;
							
							// Use the path string to find the lookup value from the source data
							value = this.sharedPathSolver.get(source, lookupPath);
							finalDistinctProp = lookupPath;
						} else {
							value = source[distinctProp];
							finalDistinctProp = distinctProp;
						}
						
						options.$rootData['//distinctLookup'][finalDistinctProp] = options.$rootData['//distinctLookup'][finalDistinctProp] || {};
						
						// Check if the options distinct lookup has this field's value
						if (options.$rootData['//distinctLookup'][finalDistinctProp][value]) {
							// Value is already in use
							return false;
						} else {
							// Set the value in the lookup
							options.$rootData['//distinctLookup'][finalDistinctProp][value] = true;

							// Allow the item in the results
							return true;
						}
					}
				}
				break;

			case '$count':
				var countKey,
					countArr,
					countVal;

				// Iterate the count object's keys
				for (countKey in test) {
					if (test.hasOwnProperty(countKey)) {
						// Check the property exists and is an array. If the property being counted is not
						// an array (or doesn't exist) then use a value of zero in any further count logic
						countArr = source[countKey];
						if (typeof countArr === 'object' && countArr instanceof Array) {
							countVal = countArr.length;
						} else {
							countVal = 0;
						}

						// Now recurse down the query chain further to satisfy the query for this key (countKey)
						if (!this._match(countVal, test[countKey], queryOptions, 'and', options)) {
							return false;
						}
					}
				}

				// Allow the item in the results
				return true;

			case '$find':
			case '$findOne':
			case '$findSub':
				var fromType = 'collection',
					findQuery,
					findOptions,
					subQuery,
					subOptions,
					subPath,
					result,
					operation = {};

				// Check all parts of the $find operation exist
				if (!test.$from) {
					throw(key + ' missing $from property!');
				}

				if (test.$fromType) {
					fromType = test.$fromType;

					// Check the fromType exists as a method
					if (!this.db()[fromType] || typeof this.db()[fromType] !== 'function') {
						throw(key + ' cannot operate against $fromType "' + fromType + '" because the database does not recognise this type of object!');
					}
				}

				// Perform the find operation
				findQuery = test.$query || {};
				findOptions = test.$options || {};

				if (key === '$findSub') {
					if (!test.$path) {
						throw(key + ' missing $path property!');
					}

					subPath = test.$path;
					subQuery = test.$subQuery || {};
					subOptions = test.$subOptions || {};

					if (options.$parent && options.$parent.parent && options.$parent.parent.key) {
						result = this.db()[fromType](test.$from).findSub(findQuery, subPath, subQuery, subOptions);
					} else {
						// This is a root $find* query
						// Test the source against the main findQuery
						if (this._match(source, findQuery, {}, 'and', options)) {
							result = this._findSub([source], subPath, subQuery, subOptions);
						}

						return result && result.length > 0;
					}
				} else {
					result = this.db()[fromType](test.$from)[key.substr(1)](findQuery, findOptions);
				}

				operation[options.$parent.parent.key] = result;
				return this._match(source, operation, queryOptions, 'and', options);
		}

		return -1;
	},

	/**
	 * Performs a join operation and returns the final joined data.
	 * @param {Array | Object} docArr An array of objects to run the join
	 * operation against or a single object.
	 * @param {Array} joinClause The join clause object array (the array in
	 * the $join key of a normal join options object).
	 * @param {Object} joinSource An object containing join source reference
	 * data or a blank object if you are doing a bespoke join operation.
	 * @param {Object} options An options object or blank object if no options.
	 * @returns {Array}
	 * @private
	 */
	applyJoin: function (docArr, joinClause, joinSource, options) {
		var self = this,
			joinSourceIndex,
			joinSourceKey,
			joinMatch,
			joinSourceType,
			joinSourceIdentifier,
			resultKeyName,
			joinSourceInstance,
			resultIndex,
			joinSearchQuery,
			joinMulti,
			joinRequire,
			joinPrefix,
			joinMatchIndex,
			joinMatchData,
			joinSearchOptions,
			joinFindResults,
			joinFindResult,
			joinItem,
			resultRemove = [],
			l;

		if (!(docArr instanceof Array)) {
			// Turn the document into an array
			docArr = [docArr];
		}

		for (joinSourceIndex = 0; joinSourceIndex < joinClause.length; joinSourceIndex++) {
			for (joinSourceKey in joinClause[joinSourceIndex]) {
				if (joinClause[joinSourceIndex].hasOwnProperty(joinSourceKey)) {
					// Get the match data for the join
					joinMatch = joinClause[joinSourceIndex][joinSourceKey];

					// Check if the join is to a collection (default) or a specified source type
					// e.g 'view' or 'collection'
					joinSourceType = joinMatch.$sourceType || 'collection';
					joinSourceIdentifier = '$' + joinSourceType + '.' + joinSourceKey;

					// Set the key to store the join result in to the collection name by default
					// can be overridden by the '$as' clause in the join object
					resultKeyName = joinSourceKey;

					// Get the join collection instance from the DB
					if (joinSource[joinSourceIdentifier]) {
						// We have a joinSource for this identifier already (given to us by
						// an index when we analysed the query earlier on) and we can use
						// that source instead.
						joinSourceInstance = joinSource[joinSourceIdentifier];
					} else {
						// We do not already have a joinSource so grab the instance from the db
						if (this._db[joinSourceType] && typeof this._db[joinSourceType] === 'function') {
							joinSourceInstance = this._db[joinSourceType](joinSourceKey);
						}
					}

					// Loop our result data array
					for (resultIndex = 0; resultIndex < docArr.length; resultIndex++) {
						// Loop the join conditions and build a search object from them
						joinSearchQuery = {};
						joinMulti = false;
						joinRequire = false;
						joinPrefix = '';

						for (joinMatchIndex in joinMatch) {
							if (joinMatch.hasOwnProperty(joinMatchIndex)) {
								joinMatchData = joinMatch[joinMatchIndex];

								// Check the join condition name for a special command operator
								if (joinMatchIndex.substr(0, 1) === '$') {
									// Special command
									switch (joinMatchIndex) {
										case '$where':
											if (joinMatchData.$query || joinMatchData.$options) {
												if (joinMatchData.$query) {
													// Commented old code here, new one does dynamic reverse lookups
													//joinSearchQuery = joinMatchData.query;
													joinSearchQuery = self.resolveDynamicQuery(joinMatchData.$query, docArr[resultIndex]);
												}
												if (joinMatchData.$options) {
													joinSearchOptions = joinMatchData.$options;
												}
											} else {
												throw('$join $where clause requires "$query" and / or "$options" keys to work!');
											}
											break;

										case '$as':
											// Rename the collection when stored in the result document
											resultKeyName = joinMatchData;
											break;

										case '$multi':
											// Return an array of documents instead of a single matching document
											joinMulti = joinMatchData;
											break;

										case '$require':
											// Remove the result item if no matching join data is found
											joinRequire = joinMatchData;
											break;

										case '$prefix':
											// Add a prefix to properties mixed in
											joinPrefix = joinMatchData;
											break;

										default:
											break;
									}
								} else {
									// Get the data to match against and store in the search object
									// Resolve complex referenced query
									joinSearchQuery[joinMatchIndex] = self.resolveDynamicQuery(joinMatchData, docArr[resultIndex]);
								}
							}
						}

						// Do a find on the target collection against the match data
						joinFindResults = joinSourceInstance.find(joinSearchQuery, joinSearchOptions);

						// Check if we require a joined row to allow the result item
						if (!joinRequire || (joinRequire && joinFindResults[0])) {
							// Join is not required or condition is met
							if (resultKeyName === '$root') {
								// The property name to store the join results in is $root
								// which means we need to mixin the results but this only
								// works if joinMulti is disabled
								if (joinMulti !== false) {
									// Throw an exception here as this join is not physically possible!
									throw(this.logIdentifier() + ' Cannot combine [$as: "$root"] with [$multi: true] in $join clause!');
								}

								// Mixin the result
								joinFindResult = joinFindResults[0];
								joinItem = docArr[resultIndex];

								for (l in joinFindResult) {
									if (joinFindResult.hasOwnProperty(l) && joinItem[joinPrefix + l] === undefined) {
										// Properties are only mixed in if they do not already exist
										// in the target item (are undefined). Using a prefix denoted via
										// $prefix is a good way to prevent property name conflicts
										joinItem[joinPrefix + l] = joinFindResult[l];
									}
								}
							} else {
								docArr[resultIndex][resultKeyName] = joinMulti === false ? joinFindResults[0] : joinFindResults;
							}
						} else {
							// Join required but condition not met, add item to removal queue
							resultRemove.push(resultIndex);
						}
					}
				}
			}
		}

		return resultRemove;
	},

	/**
	 * Takes a query object with dynamic references and converts the references
	 * into actual values from the references source.
	 * @param {Object} query The query object with dynamic references.
	 * @param {Object} item The document to apply the references to.
	 * @returns {*}
	 * @private
	 */
	resolveDynamicQuery: function (query, item) {
		var self = this,
			newQuery,
			propType,
			propVal,
			pathResult,
			i;

		// Check for early exit conditions
		if (typeof query === 'string') {
			// Check if the property name starts with a back-reference
			if (query.substr(0, 3) === '$$.') {
				// Fill the query with a back-referenced value
				pathResult = this.sharedPathSolver.value(item, query.substr(3, query.length - 3));
			} else {
				pathResult = this.sharedPathSolver.value(item, query);
			}

			if (pathResult.length > 1) {
				return {$in: pathResult};
			} else {
				return pathResult[0];
			}
		}

		newQuery = {};

		for (i in query) {
			if (query.hasOwnProperty(i)) {
				propType = typeof query[i];
				propVal = query[i];

				switch (propType) {
					case 'string':
						// Check if the property name starts with a back-reference
						if (propVal.substr(0, 3) === '$$.') {
							// Fill the query with a back-referenced value
							newQuery[i] = this.sharedPathSolver.value(item, propVal.substr(3, propVal.length - 3))[0];
						} else {
							newQuery[i] = propVal;
						}
						break;

					case 'object':
						newQuery[i] = self.resolveDynamicQuery(propVal, item);
						break;

					default:
						newQuery[i] = propVal;
						break;
				}
			}
		}

		return newQuery;
	},

	spliceArrayByIndexList: function (arr, list) {
		var i;

		for (i = list.length - 1; i >= 0; i--) {
			arr.splice(list[i], 1);
		}
	}
};

module.exports = Matching;
},{}],22:[function(_dereq_,module,exports){
"use strict";

/**
 * Provides sorting methods.
 * @mixin
 */
var Sorting = {
	/**
	 * Sorts the passed value a against the passed value b ascending.
	 * @param {*} a The first value to compare.
	 * @param {*} b The second value to compare.
	 * @returns {*} 1 if a is sorted after b, -1 if a is sorted before b.
	 */
	sortAsc: function mixinSortingSortAsc (a, b) {
		if (typeof(a) === 'string' && typeof(b) === 'string') {
			return a.localeCompare(b);
		} else {
			if (a > b) {
				return 1;
			} else if (a < b) {
				return -1;
			}
		}
		
		if (a === undefined && b !== undefined) {
			return -1;
		}
		
		if (b === undefined && a !== undefined) {
			return 1;
		}

		return 0;
	},

	/**
	 * Sorts the passed value a against the passed value b descending.
	 * @param {*} a The first value to compare.
	 * @param {*} b The second value to compare.
	 * @returns {*} 1 if a is sorted after b, -1 if a is sorted before b.
	 */
	sortDesc: function mixinSortingSortDesc (a, b) {
		if (typeof(a) === 'string' && typeof(b) === 'string') {
			return b.localeCompare(a);
		} else {
			if (a > b) {
				return -1;
			} else if (a < b) {
				return 1;
			}
		}
		
		if (a === undefined && b !== undefined) {
			return 1;
		}
		
		if (b === undefined && a !== undefined) {
			return -1;
		}

		return 0;
	},
	
	/**
	 * Sorts the passed value a against the passed value b ascending. This variant
	 * of the sortAsc method will not consider undefined values as lower than any
	 * other value.
	 * @param {*} a The first value to compare.
	 * @param {*} b The second value to compare.
	 * @returns {*} 1 if a is sorted after b, -1 if a is sorted before b.
	 */
	sortAscIgnoreUndefined: function (a, b) {
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
	 * Sorts the passed value a against the passed value b descending. This variant
	 * of the sortDesc method will not consider undefined values as lower than any
	 * other value.
	 * @param {*} a The first value to compare.
	 * @param {*} b The second value to compare.
	 * @returns {*} 1 if a is sorted after b, -1 if a is sorted before b.
	 */
	sortDescIgnoreUndefined: function (a, b) {
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

var Tags,
	tagMap = {};

/**
 * Provides class instance tagging and tag operation methods.
 * @mixin
 */
Tags = {
	/**
	 * Tags a class instance for later lookup.
	 * @param {String} name The tag to add.
	 * @returns {boolean}
	 */
	tagAdd: function (name) {
		var i,
			self = this,
			mapArr = tagMap[name] = tagMap[name] || [];

		for (i = 0; i < mapArr.length; i++) {
			if (mapArr[i] === self) {
				return true;
			}
		}

		mapArr.push(self);

		// Hook the drop event for this so we can react
		if (self.on) {
			self.on('drop', function () {
				// We've been dropped so remove ourselves from the tag map
				self.tagRemove(name);
			});
		}

		return true;
	},

	/**
	 * Removes a tag from a class instance.
	 * @param {String} name The tag to remove.
	 * @returns {boolean}
	 */
	tagRemove: function (name) {
		var i,
			mapArr = tagMap[name];

		if (mapArr) {
			for (i = 0; i < mapArr.length; i++) {
				if (mapArr[i] === this) {
					mapArr.splice(i, 1);
					return true;
				}
			}
		}

		return false;
	},

	/**
	 * Gets an array of all instances tagged with the passed tag name.
	 * @param {String} name The tag to lookup.
	 * @returns {Array} The array of instances that have the passed tag.
	 */
	tagLookup: function (name) {
		return tagMap[name] || [];
	},

	/**
	 * Drops all instances that are tagged with the passed tag name.
	 * @param {String} name The tag to lookup.
	 * @param {Function} callback Callback once dropping has completed
	 * for all instances that match the passed tag name.
	 * @returns {boolean}
	 */
	tagDrop: function (name, callback) {
		var arr = this.tagLookup(name),
			dropCb,
			dropCount,
			i;

		dropCb = function () {
			dropCount--;

			if (callback && dropCount === 0) {
				callback(false);
			}
		};

		if (arr.length) {
			dropCount = arr.length;

			// Loop the array and drop all items
			for (i = arr.length - 1; i >= 0; i--) {
				arr[i].drop(dropCb);
			}
		}

		return true;
	}
};

module.exports = Tags;
},{}],24:[function(_dereq_,module,exports){
"use strict";

var Overload = _dereq_('./Overload');

/**
 * Provides trigger functionality methods.
 * @mixin
 */
var Triggers = {
	/**
	 * Add a trigger by id, type and phase.
	 * @name addTrigger
	 * @method Triggers.addTrigger
	 * @param {String} id The id of the trigger. This must be unique to the type and
	 * phase of the trigger. Only one trigger may be added with this id per type and
	 * phase.
	 * @param {Constants} type The type of operation to apply the trigger to. See
	 * Mixin.Constants for constants to use.
	 * @param {Constants} phase The phase of an operation to fire the trigger on. See
	 * Mixin.Constants for constants to use.
	 * @param {Triggers.addTriggerCallback} method The method to call when the trigger is fired.
	 * @returns {boolean} True if the trigger was added successfully, false if not.
	 */
	addTrigger: function (id, type, phase, method) {
		var self = this,
			triggerIndex;

		// Check if the trigger already exists
		triggerIndex = self._triggerIndexOf(id, type, phase);

		if (triggerIndex === -1) {
			self.triggerStack = {};

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
	 * Removes a trigger by id, type and phase.
	 * @name removeTrigger
	 * @method Triggers.removeTrigger
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

	/**
	 * Tells the current instance to fire or ignore all triggers whether they
	 * are enabled or not.
	 * @param {Boolean} val Set to true to ignore triggers or false to not
	 * ignore them.
	 * @returns {*}
	 */
	ignoreTriggers: function (val) {
		if (val !== undefined) {
			this._ignoreTriggers = val;
			return this;
		}

		return this._ignoreTriggers;
	},

	/**
	 * Generates triggers that fire in the after phase for all CRUD ops
	 * that automatically transform data back and forth and keep both
	 * import and export collections in sync with each other.
	 * @param {String} id The unique id for this link IO.
	 * @param {Object} ioData The settings for the link IO.
	 */
	addLinkIO: function (id, ioData) {
		var self = this,
			matchAll,
			exportData,
			importData,
			exportTriggerMethod,
			importTriggerMethod,
			exportTo,
			importFrom,
			allTypes,
			i;

		// Store the linkIO
		self._linkIO = self._linkIO || {};
		self._linkIO[id] = ioData;

		exportData = ioData['export'];
		importData = ioData['import'];

		if (exportData) {
			exportTo = self.db().collection(exportData.to);
		}

		if (importData) {
			importFrom = self.db().collection(importData.from);
		}

		allTypes = [
			self.TYPE_INSERT,
			self.TYPE_UPDATE,
			self.TYPE_REMOVE
		];

		matchAll = function (data, callback) {
			// Match all
			callback(false, true);
		};

		if (exportData) {
			// Check for export match method
			if (!exportData.match) {
				// No match method found, use the match all method
				exportData.match = matchAll;
			}

			// Check for export types
			if (!exportData.types) {
				exportData.types = allTypes;
			}

			exportTriggerMethod = function (operation, oldDoc, newDoc) {
				// Check if we should execute against this data
				exportData.match(newDoc, function (err, doExport) {
					if (!err && doExport) {
						// Get data to upsert (if any)
						exportData.data(newDoc, operation.type, function (err, data, callback) {
							if (!err && data) {
								// Disable all currently enabled triggers so that we
								// don't go into a trigger loop
								exportTo.ignoreTriggers(true);

								if (operation.type !== 'remove') {
									// Do upsert
									exportTo.upsert(data, callback);
								} else {
									// Do remove
									exportTo.remove(data, callback);
								}

								// Re-enable the previous triggers
								exportTo.ignoreTriggers(false);
							}
						});
					}
				});
			};
		}

		if (importData) {
			// Check for import match method
			if (!importData.match) {
				// No match method found, use the match all method
				importData.match = matchAll;
			}

			// Check for import types
			if (!importData.types) {
				importData.types = allTypes;
			}

			importTriggerMethod = function (operation, oldDoc, newDoc) {
				// Check if we should execute against this data
				importData.match(newDoc, function (err, doExport) {
					if (!err && doExport) {
						// Get data to upsert (if any)
						importData.data(newDoc, operation.type, function (err, data, callback) {
							if (!err && data) {
								// Disable all currently enabled triggers so that we
								// don't go into a trigger loop
								exportTo.ignoreTriggers(true);

								if (operation.type !== 'remove') {
									// Do upsert
									self.upsert(data, callback);
								} else {
									// Do remove
									self.remove(data, callback);
								}

								// Re-enable the previous triggers
								exportTo.ignoreTriggers(false);
							}
						});
					}
				});
			};
		}

		if (exportData) {
			for (i = 0; i < exportData.types.length; i++) {
				self.addTrigger(id + 'export' + exportData.types[i], exportData.types[i], self.PHASE_AFTER, exportTriggerMethod);
			}
		}

		if (importData) {
			for (i = 0; i < importData.types.length; i++) {
				importFrom.addTrigger(id + 'import' + importData.types[i], importData.types[i], self.PHASE_AFTER, importTriggerMethod);
			}
		}
	},

	/**
	 * Removes a previously added link IO via it's ID.
	 * @param {String} id The id of the link IO to remove.
	 * @returns {boolean} True if successful, false if the link IO
	 * was not found.
	 */
	removeLinkIO: function (id) {
		var self = this,
			linkIO = self._linkIO[id],
			exportData,
			importData,
			importFrom,
			i;

		if (linkIO) {
			exportData = linkIO['export'];
			importData = linkIO['import'];

			if (exportData) {
				for (i = 0; i < exportData.types.length; i++) {
					self.removeTrigger(id + 'export' + exportData.types[i], exportData.types[i], self.db.PHASE_AFTER);
				}
			}

			if (importData) {
				importFrom = self.db().collection(importData.from);

				for (i = 0; i < importData.types.length; i++) {
					importFrom.removeTrigger(id + 'import' + importData.types[i], importData.types[i], self.db.PHASE_AFTER);
				}
			}

			delete self._linkIO[id];
			return true;
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
		if (!this._ignoreTriggers && this._trigger && this._trigger[type] && this._trigger[type][phase] && this._trigger[type][phase].length) {
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
			response,
			typeName,
			phaseName;

		if (!self._ignoreTriggers && self._trigger && self._trigger[type] && self._trigger[type][phase]) {
			triggerArr = self._trigger[type][phase];
			triggerCount = triggerArr.length;

			for (triggerIndex = 0; triggerIndex < triggerCount; triggerIndex++) {
				triggerItem = triggerArr[triggerIndex];

				// Check if the trigger is enabled
				if (triggerItem.enabled) {
					if (self.debug()) {
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

						console.log('Triggers: Processing trigger "' + triggerItem.id + '" for ' + typeName + ' in phase "' + phaseName + '"');
					}

					// Check if the trigger is already in the stack, if it is,
					// don't fire it again (this is so we avoid infinite loops
					// where a trigger triggers another trigger which calls this
					// one and so on)
					if  (self.triggerStack && self.triggerStack[type] && self.triggerStack[type][phase] && self.triggerStack[type][phase][triggerItem.id]) {
						// The trigger is already in the stack, do not fire the trigger again
						if (self.debug()) {
							console.log('Triggers: Will not run trigger "' + triggerItem.id + '" for ' + typeName + ' in phase "' + phaseName + '" as it is already in the stack!');
						}

						continue;
					}

					// Add the trigger to the stack so we don't go down an endless
					// trigger loop
					self.triggerStack = self.triggerStack || {};
					self.triggerStack[type] = {};
					self.triggerStack[type][phase] = {};
					self.triggerStack[type][phase][triggerItem.id] = true;

					// Run the trigger's method and store the response
					response = triggerItem.method.call(self, operation, oldDoc, newDoc);

					// Remove the trigger from the stack
					self.triggerStack = self.triggerStack || {};
					self.triggerStack[type] = {};
					self.triggerStack[type][phase] = {};
					self.triggerStack[type][phase][triggerItem.id] = false;

					// Check the response for a non-expected result (anything other than
					// [undefined, true or false] is considered a throwable error)
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
	 * @returns {Number}
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

/**
 * When called in a before phase the newDoc object can be directly altered
 * to modify the data in it before the operation is carried out.
 * @callback Triggers.addTriggerCallback
 * @param {Object} operation The details about the operation.
 * @param {Object} oldDoc The document before the operation.
 * @param {Object} newDoc The document after the operation.
 */

module.exports = Triggers;
},{"./Overload":27}],25:[function(_dereq_,module,exports){
"use strict";

/**
 * Provides methods to handle object update operations.
 * @mixin
 */
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
			console.log(this.logIdentifier() + ' Setting non-data-bound document property "' + prop + '" to val "' + val + '"');
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
			console.log(this.logIdentifier() + ' Moving non-data-bound document array index from "' + indexFrom + '" to "' + indexTo + '"');
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
	 * Removes an item from the passed array at the specified index.
	 * @param {Array} arr The array to remove from.
	 * @param {Number} index The index of the item to remove.
	 * @param {Number} count The number of items to remove.
	 * @private
	 */
	_updateSplicePull: function (arr, index, count) {
		if (!count) { count = 1; }
		arr.splice(index, count);
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
	 * @param {String} prop The property to set.
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
	 * Pops an item or items from the array stack.
	 * @param {Object} doc The document to modify.
	 * @param {Number} val If set to a positive integer, will pop the number specified
	 * from the stack, if set to a negative integer will shift the number specified
	 * from the stack.
	 * @return {Boolean}
	 * @private
	 */
	_updatePop: function (doc, val) {
		var updated = false,
			i;

		if (doc.length > 0) {
			if (val > 0) {
				for (i = 0; i < val; i++) {
					doc.pop();
				}
				updated = true;
			} else if (val < 0) {
				for (i = 0; i > val; i--) {
					doc.shift();
				}
				updated = true;
			}
		}

		return updated;
	}
};

module.exports = Updating;
},{}],26:[function(_dereq_,module,exports){
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
},{"./Path":28,"./Shared":31}],27:[function(_dereq_,module,exports){
"use strict";

/**
 * Allows a method to accept overloaded calls with different parameters controlling
 * which passed overload function is called.
 * @param {String=} name A name to provide this overload to help identify
 * it if any errors occur during the resolving phase of the overload. This
 * is purely for debug purposes and serves no functional purpose.
 * @param {Object} def The overload definition.
 * @returns {Function}
 * @constructor
 */
var Overload = function (name, def) {
	if (!def) {
		def = name;
		name = undefined;
	}

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
				type,
				overloadName;

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

			overloadName = name !== undefined ? name : typeof this.name === 'function' ? this.name() : 'Unknown';

			console.log('Overload Definition:', def);
			throw('ForerunnerDB.Overload "' + overloadName + '": Overloaded method does not have a matching signature "' + lookup + '" for the passed arguments: ' + this.jStringify(arr));
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
		types = ['array', 'string', 'object', 'number', 'function', 'undefined'],
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
Shared.mixin(Path.prototype, 'Mixin.Common');
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
 * The options object accepts an "ignore" field with a regular expression
 * as the value. If any key matches the expression it is not included in
 * the results.
 *
 * The options object accepts a boolean "verbose" field. If set to true
 * the results will include all paths leading up to endpoints as well as
 * they endpoints themselves.
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
					if (options.verbose) {
						paths.push(newPath);
					}

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

/**
 * Retrieves all the values inside an object based on the passed
 * path string. Will automatically traverse any arrays it encounters
 * and assumes array indexes are not part of the specifed path.
 * @param {Object|Array} obj An object or array of objects to
 * scan paths for.
 * @param {String} path The path string delimited by a period.
 * @return {Array} An array of values found at the end of each path
 * termination.
 */
Path.prototype.aggregate = function (obj, path) {
	var pathParts,
		part,
		values = [],
		i;
	
	// First, check if the object we are given
	// is an array. If so, loop it and work on
	// the objects inside
	if (obj instanceof Array) {
		// Loop array and get path data from each sub object
		for (i = 0; i < obj.length; i++) {
			values = values.concat(this.aggregate(obj[i], path));
		}
		
		return values;
	}
	
	if (path.indexOf('.') === -1) {
		// No further parts to navigate
		// Return an array so the value can be concatenated on return via array.concat()
		return [obj[path]];
	}
	
	pathParts = path.split('.');
	
	// Grab the next part of our path
	part = pathParts.shift();
	values = values.concat(this.aggregate(obj[part], pathParts.join('.')));
	
	return values;
};

/**
 * Gets a single value from the passed object and given path.
 * @param {Object} obj The object to inspect.
 * @param {String} path The path to retrieve data from.
 * @returns {*}
 */
Path.prototype.get = function (obj, path) {
	return this.value(obj, path)[0];
};

/**
 * Gets the value(s) that the object contains for the currently assigned path string.
 * @param {Object} obj The object to evaluate the path against.
 * @param {String=} path A path to use instead of the existing one passed in path().
 * @param {Object=} options An optional options object.
 * @returns {Array} An array of values for the given path.
 */
Path.prototype.value = function (obj, path, options) {
	var pathParts,
		arr,
		arrCount,
		objPart,
		objPartParent,
		valuesArr,
		returnArr,
		i, k;

	// Detect early exit
	if (path && path.indexOf('.') === -1) {
		if (options && options.skipArrCheck) {
			return [obj[path]];
		}
		
		if (!(obj instanceof Array)) {
			return [obj[path]];
		}
	}

	if (obj !== undefined && typeof obj === 'object') {
		if (!options || options && !options.skipArrCheck) {
			// Check if we were passed an array of objects and if so,
			// iterate over the array and return the value from each
			// array item
			if (obj instanceof Array) {
				returnArr = [];

				for (i = 0; i < obj.length; i++) {
					returnArr.push(this.get(obj[i], path));
				}

				return returnArr;
			}
		}

		valuesArr = [];

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
					valuesArr = valuesArr.concat(this.value(objPartParent, k + '.' + arr[i], {skipArrCheck: true}));
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
},{"./Shared":31}],29:[function(_dereq_,module,exports){
"use strict";

var Shared = _dereq_('./Shared');

/**
 * Provides chain reactor node linking so that a chain reaction can propagate
 * down a node tree. Effectively creates a chain link between the reactorIn and
 * reactorOut objects where a chain reaction from the reactorIn is passed through
 * the reactorProcess before being passed to the reactorOut object. Reactor
 * packets are only passed through to the reactorOut if the reactor IO method
 * chainSend is used.
 * @param {*} reactorIn An object that has the Mixin.ChainReactor methods mixed
 * in to it. Chain reactions that occur inside this object will be passed through
 * to the reactorOut object.
 * @param {*} reactorOut An object that has the Mixin.ChainReactor methods mixed
 * in to it. Chain reactions that occur in the reactorIn object will be passed
 * through to this object.
 * @param {Function} reactorProcess The processing method to use when chain
 * reactions occur.
 * @constructor
 */
var ReactorIO = function (reactorIn, reactorOut, reactorProcess) {
	if (reactorIn && reactorOut && reactorProcess) {
		this._reactorIn = reactorIn;
		this._reactorOut = reactorOut;
		this._chainHandler = reactorProcess;

		if (!reactorIn.chain) {
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

/**
 * Drop a reactor IO object, breaking the reactor link between the in and out
 * reactor nodes.
 * @returns {boolean}
 */
ReactorIO.prototype.drop = function () {
	if (!this.isDropped()) {
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

		delete this._listeners;
	}

	return true;
};

/**
 * Gets / sets the current state.
 * @param {String=} val The name of the state to set.
 * @returns {*}
 */
Shared.synthesize(ReactorIO.prototype, 'state');

Shared.mixin(ReactorIO.prototype, 'Mixin.Common');
Shared.mixin(ReactorIO.prototype, 'Mixin.ChainReactor');
Shared.mixin(ReactorIO.prototype, 'Mixin.Events');

Shared.finishModule('ReactorIO');
module.exports = ReactorIO;
},{"./Shared":31}],30:[function(_dereq_,module,exports){
"use strict";

/**
 * Provides functionality to encode and decode JavaScript objects to strings
 * and back again. This differs from JSON.stringify and JSON.parse in that
 * special objects such as dates can be encoded to strings and back again
 * so that the reconstituted version of the string still contains a JavaScript
 * date object.
 * @constructor
 */
var Serialiser = function () {
	this.init.apply(this, arguments);
};

Serialiser.prototype.init = function () {
	var self = this;

	this._encoder = [];
	this._decoder = [];

	// Handler for Date() objects
	this.registerHandler('$date', function (objInstance) {
		if (objInstance instanceof Date) {
			// Augment this date object with a new toJSON method
			objInstance.toJSON = function () {
				return "$date:" + this.toISOString();
			};

			// Tell the converter we have matched this object
			return true;
		}

		// Tell converter to keep looking, we didn't match this object
		return false;
	}, function (data) {
		if (typeof data === 'string' && data.indexOf('$date:') === 0) {
			return self.convert(new Date(data.substr(6)));
		}

		return undefined;
	});

	// Handler for RegExp() objects
	this.registerHandler('$regexp', function (objInstance) {
		if (objInstance instanceof RegExp) {
			objInstance.toJSON = function () {
				return "$regexp:" + this.source.length + ":" + this.source + ":" + (this.global ? 'g' : '') + (this.ignoreCase ? 'i' : '');
				/*return {
					source: this.source,
					params: '' + (this.global ? 'g' : '') + (this.ignoreCase ? 'i' : '')
				};*/
			};

			// Tell the converter we have matched this object
			return true;
		}

		// Tell converter to keep looking, we didn't match this object
		return false;
	}, function (data) {
		if (typeof data === 'string' && data.indexOf('$regexp:') === 0) {
			var dataStr = data.substr(8),//±
				lengthEnd = dataStr.indexOf(':'),
				sourceLength = Number(dataStr.substr(0, lengthEnd)),
				source = dataStr.substr(lengthEnd + 1, sourceLength),
				params = dataStr.substr(lengthEnd + sourceLength + 2);

			return self.convert(new RegExp(source, params));
		}

		return undefined;
	});
};

Serialiser.prototype.registerHandler = function (handles, encoder, decoder) {
	if (handles !== undefined) {
		// Register encoder
		this._encoder.push(encoder);

		// Register decoder
		this._decoder.push(decoder);
	}
};

Serialiser.prototype.convert = function (data) {
	// Run through converters and check for match
	var arr = this._encoder,
		i;

	for (i = 0; i < arr.length; i++) {
		if (arr[i](data)) {
			// The converter we called matched the object and converted it
			// so let's return it now.
			return data;
		}
	}

	// No converter matched the object, return the unaltered one
	return data;
};

Serialiser.prototype.reviver = function () {
	var arr = this._decoder;

	return function (key, value) {
		// Check if we have a decoder method for this key
		var decodedData,
			i;

		for (i = 0; i < arr.length; i++) {
			decodedData = arr[i](value);

			if (decodedData !== undefined) {
				// The decoder we called matched the object and decoded it
				// so let's return it now.
				return decodedData;
			}
		}

		// No decoder, return basic value
		return value;
	};
};

module.exports = Serialiser;
},{}],31:[function(_dereq_,module,exports){
"use strict";

var Overload = _dereq_('./Overload');

/**
 * A shared object that can be used to store arbitrary data between class
 * instances, and access helper methods.
 * @mixin
 */
var Shared = {
	version: '2.0.12',
	modules: {},
	plugins: {},
	index: {},

	_synth: {},

	/**
	 * Adds a module to ForerunnerDB.
	 * @memberof Shared
	 * @param {String} name The name of the module.
	 * @param {Function} module The module class.
	 */
	addModule: function (name, module) {
		// Store the module in the module registry
		this.modules[name] = module;

		// Tell the universe we are loading this module
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
			// Set the finished loading flag to true
			this.modules[name]._fdbFinished = true;

			// Assign the module name to itself so it knows what it
			// is called
			if (this.modules[name].prototype) {
				this.modules[name].prototype.className = name;
			} else {
				this.modules[name].className = name;
			}

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

	mixin: new Overload({
		/**
		 * Adds the properties and methods defined in the mixin to the passed
		 * object.
		 * @memberof Shared
		 * @name mixin
		 * @param {Object} obj The target object to add mixin key/values to.
		 * @param {String} mixinName The name of the mixin to add to the object.
		 */
		'object, string': function (obj, mixinName) {
			var mixinObj;

			if (typeof mixinName === 'string') {
				mixinObj = this.mixins[mixinName];

				if (!mixinObj) {
					throw('ForerunnerDB.Shared: Cannot find mixin named: ' + mixinName);
				}
			}

			return this.$main.call(this, obj, mixinObj);
		},

		/**
		 * Adds the properties and methods defined in the mixin to the passed
		 * object.
		 * @memberof Shared
		 * @name mixin
		 * @param {Object} obj The target object to add mixin key/values to.
		 * @param {Object} mixinObj The object containing the keys to mix into
		 * the target object.
		 */
		'object, *': function (obj, mixinObj) {
			return this.$main.call(this, obj, mixinObj);
		},

		'$main': function (obj, mixinObj) {
			if (mixinObj && typeof mixinObj === 'object') {
				for (var i in mixinObj) {
					if (mixinObj.hasOwnProperty(i)) {
						obj[i] = mixinObj[i];
					}
				}
			}

			return obj;
		}
	}),

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
	overload: Overload,

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
		'Mixin.Updating': _dereq_('./Mixin.Updating'),
		'Mixin.Tags': _dereq_('./Mixin.Tags')
	}
};

// Add event handling to shared
Shared.mixin(Shared, 'Mixin.Events');

module.exports = Shared;
},{"./Mixin.CRUD":16,"./Mixin.ChainReactor":17,"./Mixin.Common":18,"./Mixin.Constants":19,"./Mixin.Events":20,"./Mixin.Matching":21,"./Mixin.Sorting":22,"./Mixin.Tags":23,"./Mixin.Triggers":24,"./Mixin.Updating":25,"./Overload":27}],32:[function(_dereq_,module,exports){
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
},{}],33:[function(_dereq_,module,exports){
"use strict";

// Import external names locally
var Shared,
	Db,
	Collection,
	CollectionGroup,
	CollectionInit,
	DbInit,
	ReactorIO,
	ActiveBucket,
	Overload = _dereq_('./Overload'),
	Path,
	sharedPathSolver;

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

Shared.addModule('View', View);
Shared.mixin(View.prototype, 'Mixin.Common');
Shared.mixin(View.prototype, 'Mixin.Matching');
Shared.mixin(View.prototype, 'Mixin.ChainReactor');
Shared.mixin(View.prototype, 'Mixin.Constants');
//Shared.mixin(View.prototype, 'Mixin.Triggers');
Shared.mixin(View.prototype, 'Mixin.Tags');

Collection = _dereq_('./Collection');
CollectionGroup = _dereq_('./CollectionGroup');
ActiveBucket = _dereq_('./ActiveBucket');
ReactorIO = _dereq_('./ReactorIO');
CollectionInit = Collection.prototype.init;
Db = Shared.modules.Db;
DbInit = Db.prototype.init;
Path = Shared.modules.Path;
sharedPathSolver = new Path();

View.prototype.init = function (name, query, options) {
	var self = this;

	this.sharedPathSolver = sharedPathSolver;
	this._name = name;
	this._listeners = {};
	this._querySettings = {};
	this._debug = {};

	this.query(query, options, false);

	this._collectionDroppedWrap = function () {
		self._collectionDropped.apply(self, arguments);
	};

	this._data = new Collection(this.name() + '_internal');
};

/**
 * This reactor IO node is given data changes from source data and
 * then acts as a firewall process between the source and view data.
 * Data needs to meet the requirements this IO node imposes before
 * the data is passed down the reactor chain (to the view). This
 * allows us to intercept data changes from the data source and act
 * on them such as applying transforms, checking the data matches
 * the view's query, applying joins to the data etc before sending it
 * down the reactor chain via the this.chainSend() calls.
 *
 * Update packets are especially complex to handle because an update
 * on the underlying source data could translate into an insert,
 * update or remove call on the view. Take a scenario where the view's
 * query limits the data seen from the source. If the source data is
 * updated and the data now falls inside the view's query limitations
 * the data is technically now an insert on the view, not an update.
 * The same is true in reverse where the update becomes a remove. If
 * the updated data already exists in the view and will still exist
 * after the update operation then the update can remain an update.
 * @param {Object} chainPacket The chain reactor packet representing the
 * data operation that has just been processed on the source data.
 * @param {View} self The reference to the view we are operating for.
 * @private
 */
View.prototype._handleChainIO = function (chainPacket, self) {
	var type = chainPacket.type,
		hasActiveJoin,
		hasActiveQuery,
		hasTransformIn,
		sharedData;

	// NOTE: "self" in this context is the view instance.

	// NOTE: "this" in this context is the ReactorIO node sitting in
	// between the source (sender) and the destination (listener) and
	// in this case the source is the view's "from" data source and the
	// destination is the view's _data collection. This means
	// that "this.chainSend()" is asking the ReactorIO node to send the
	// packet on to the destination listener.

	// EARLY EXIT: Check that the packet is not a CRUD operation
	if (type !== 'setData' && type !== 'insert' && type !== 'update' && type !== 'remove') {
		// This packet is NOT a CRUD operation packet so exit early!

		// Returning false informs the chain reactor to continue propagation
		// of the chain packet down the graph tree
		return false;
	}

	// We only need to check packets under three conditions

	// 1) We have a limiting query on the view "active query",
	// 2) We have a query options with a $join clause on the view "active join"
	// 3) We have a transformIn operation registered on the view.

	// If none of these conditions exist we can just allow the chain
	// packet to proceed as normal
	hasActiveJoin = Boolean(self._querySettings.options && self._querySettings.options.$join);
	hasActiveQuery = Boolean(self._querySettings.query);
	hasTransformIn = self._data._transformIn !== undefined;

	// EARLY EXIT: Check for any complex operation flags and if none
	// exist, send the packet on and exit early
	if (!hasActiveJoin && !hasActiveQuery && !hasTransformIn) {
		// We don't have any complex operation flags so exit early!

		// Returning false informs the chain reactor to continue propagation
		// of the chain packet down the graph tree
		return false;
	}

	// We have either an active query, active join or a transformIn
	// function registered on the view

	// We create a shared data object here so that the disparate method
	// calls can share data with each other via this object whilst
	// still remaining separate methods to keep code relatively clean.
	sharedData = {
		dataArr: [],
		removeArr: []
	};

	// Check the packet type to get the data arrays to work on
	if (chainPacket.type === 'insert') {
		// Check if the insert data is an array
		if (chainPacket.data.dataSet instanceof Array) {
			// Use the insert data array
			sharedData.dataArr = chainPacket.data.dataSet;
		} else {
			// Generate an array from the single insert object
			sharedData.dataArr = [chainPacket.data.dataSet];
		}
	} else if (chainPacket.type === 'update') {
		// Use the dataSet array
		sharedData.dataArr = chainPacket.data.dataSet;
	} else if (chainPacket.type === 'remove') {
		if (chainPacket.data.dataSet instanceof Array) {
			// Use the remove data array
			sharedData.removeArr = chainPacket.data.dataSet;
		} else {
			// Generate an array from the single remove object
			sharedData.removeArr = [chainPacket.data.dataSet];
		}
	}

	// Safety check
	if (!(sharedData.dataArr instanceof Array)) {
		// This shouldn't happen, let's log it
		console.warn('WARNING: dataArr being processed by chain reactor in View class is inconsistent!');
		sharedData.dataArr = [];
	}

	if (!(sharedData.removeArr instanceof Array)) {
		// This shouldn't happen, let's log it
		console.warn('WARNING: removeArr being processed by chain reactor in View class is inconsistent!');
		sharedData.removeArr = [];
	}

	// We need to operate in this order:

	// 1) Check if there is an active join - active joins are operated
	// against the SOURCE data. The joined data can potentially be
	// utilised by any active query or transformIn so we do this step first.

	// 2) Check if there is an active query - this is a query that is run
	// against the SOURCE data after any active joins have been resolved
	// on the source data. This allows an active query to operate on data
	// that would only exist after an active join has been executed.
	// If the source data does not fall inside the limiting factors of the
	// active query then we add it to a removal array. If it does fall
	// inside the limiting factors when we add it to an upsert array. This
	// is because data that falls inside the query could end up being
	// either new data or updated data after a transformIn operation.

	// 3) Check if there is a transformIn function. If a transformIn function
	// exist we run it against the data after doing any active join and
	// active query.
	if (hasActiveJoin) {
		if (this.debug()) {
			console.time(this.logIdentifier() + ' :: _handleChainIO_ActiveJoin');
		}
		self._handleChainIO_ActiveJoin(chainPacket, sharedData);
		if (this.debug()) {
			console.timeEnd(this.logIdentifier() + ' :: _handleChainIO_ActiveJoin');
		}
	}

	if (hasActiveQuery) {
		if (this.debug()) {
			console.time(this.logIdentifier() + ' :: _handleChainIO_ActiveQuery');
		}
		self._handleChainIO_ActiveQuery(chainPacket, sharedData);
		if (this.debug()) {
			console.timeEnd(this.logIdentifier() + ' :: _handleChainIO_ActiveQuery');
		}
	}

	if (hasTransformIn) {
		if (this.debug()) {
			console.time(this.logIdentifier() + ' :: _handleChainIO_TransformIn');
		}
		self._handleChainIO_TransformIn(chainPacket, sharedData);
		if (this.debug()) {
			console.timeEnd(this.logIdentifier() + ' :: _handleChainIO_TransformIn');
		}
	}

	// Check if we still have data to operate on and exit
	// if there is none left
	if (!sharedData.dataArr.length && !sharedData.removeArr.length) {
		// There is no more data to operate on, exit without
		// sending any data down the chain reactor (return true
		// will tell reactor to exit without continuing)!
		return true;
	}

	// Grab the public data collection's primary key
	sharedData.pk = self._data.primaryKey();

	// We still have data left, let's work out how to handle it
	// first let's loop through the removals as these are easy
	if (sharedData.removeArr.length) {
		if (this.debug()) {
			console.time(this.logIdentifier() + ' :: _handleChainIO_RemovePackets');
		}
		self._handleChainIO_RemovePackets(this, chainPacket, sharedData);
		if (this.debug()) {
			console.timeEnd(this.logIdentifier() + ' :: _handleChainIO_RemovePackets');
		}
	}

	if (sharedData.dataArr.length) {
		if (this.debug()) {
			console.time(this.logIdentifier() + ' :: _handleChainIO_UpsertPackets');
		}
		self._handleChainIO_UpsertPackets(this, chainPacket, sharedData);
		if (this.debug()) {
			console.timeEnd(this.logIdentifier() + ' :: _handleChainIO_UpsertPackets');
		}
	}

	// Now return true to tell the chain reactor not to propagate
	// the data itself as we have done all that work here
	return true;
};

View.prototype._handleChainIO_ActiveJoin = function (chainPacket, sharedData) {
	var dataArr = sharedData.dataArr,
		removeArr;

	// Since we have an active join, all we need to do is operate
	// the join clause on each item in the packet's data array.
	removeArr = this.applyJoin(dataArr, this._querySettings.options.$join, {}, {});

	// Now that we've run our join keep in mind that joins can exclude data
	// if there is no matching joined data and the require: true clause in
	// the join options is enabled. This means we have to store a removal
	// array that tells us which items from the original data we sent to
	// join did not match the join data and were set with a require flag.

	// Now that we have our array of items to remove, let's run through the
	// original data and remove them from there.
	this.spliceArrayByIndexList(dataArr, removeArr);

	// Make sure we add any items we removed to the shared removeArr
	sharedData.removeArr = sharedData.removeArr.concat(removeArr);
};

View.prototype._handleChainIO_ActiveQuery = function (chainPacket, sharedData) {
	var self = this,
		dataArr = sharedData.dataArr,
		i;

	// Now we need to run the data against the active query to
	// see if the data should be in the final data list or not,
	// so we use the _match method.

	// Loop backwards so we can safely splice from the array
	// while we are looping
	for (i = dataArr.length - 1; i >= 0; i--) {
		if (!self._match(dataArr[i], self._querySettings.query, self._querySettings.options, 'and', {})) {
			// The data didn't match the active query, add it
			// to the shared removeArr
			sharedData.removeArr.push(dataArr[i]);

			// Now remove it from the shared dataArr
			dataArr.splice(i, 1);
		}
	}
};

View.prototype._handleChainIO_TransformIn = function (chainPacket, sharedData) {
	var self = this,
		dataArr = sharedData.dataArr,
		removeArr = sharedData.removeArr,
		dataIn = self._data._transformIn,
		i;

	// At this stage we take the remaining items still left in the data
	// array and run our transformIn method on each one, modifying it
	// from what it was to what it should be on the view. We also have
	// to run this on items we want to remove too because transforms can
	// affect primary keys and therefore stop us from identifying the
	// correct items to run removal operations on.

	// It is important that these are transformed BEFORE they are passed
	// to the CRUD methods because we use the CU data to check the position
	// of the item in the array and that can only happen if it is already
	// pre-transformed. The removal stuff also needs pre-transformed
	// because ids can be modified by a transform.
	for (i = 0; i < dataArr.length; i++) {
		// Assign the new value
		dataArr[i] = dataIn(dataArr[i]);
	}

	for (i = 0; i < removeArr.length; i++) {
		// Assign the new value
		removeArr[i] = dataIn(removeArr[i]);
	}
};

View.prototype._handleChainIO_RemovePackets = function (ioObj, chainPacket, sharedData) {
	var $or = [],
		pk = sharedData.pk,
		removeArr = sharedData.removeArr,
		packet = {
			dataSet: removeArr,
			query: {
				$or: $or
			}
		},
		orObj,
		i;

	for (i = 0; i < removeArr.length; i++) {
		orObj = {};
		orObj[pk] = removeArr[i][pk];

		$or.push(orObj);
	}

	ioObj.chainSend('remove', packet);
};

View.prototype._handleChainIO_UpsertPackets = function (ioObj, chainPacket, sharedData) {
	var data = this._data,
		primaryIndex = data._primaryIndex,
		primaryCrc = data._primaryCrc,
		pk = sharedData.pk,
		dataArr = sharedData.dataArr,
		arrItem,
		insertArr = [],
		updateArr = [],
		query,
		i;

	// Let's work out what type of operation this data should
	// generate between an insert or an update.
	for (i = 0; i < dataArr.length; i++) {
		arrItem = dataArr[i];

		// Check if the data already exists in the data
		if (primaryIndex.get(arrItem[pk])) {
			// Matching item exists, check if the data is the same
			if (primaryCrc.get(arrItem[pk]) !== this.hash(arrItem[pk])) {
				// The document exists in the data collection but data differs, update required
				updateArr.push(arrItem);
			}
		} else {
			// The document is missing from this collection, insert required
			insertArr.push(arrItem);
		}
	}

	if (insertArr.length) {
		ioObj.chainSend('insert', {
			dataSet: insertArr
		});
	}

	if (updateArr.length) {
		for (i = 0; i < updateArr.length; i++) {
			arrItem = updateArr[i];

			query = {};
			query[pk] = arrItem[pk];

			ioObj.chainSend('update', {
				query: query,
				update: arrItem,
				dataSet: [arrItem]
			});
		}
	}
};

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
View.prototype.update = function (query, update, options, callback) {
	var finalQuery = {
		$and: [this.query(), query]
	};

	this._from.update.call(this._from, finalQuery, update, options, callback);
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
	return this._data.find(query, options);
};

/**
 * Queries the view data for a single document.
 * @see Collection::findOne()
 * @returns {Object} The result of the find query.
 */
View.prototype.findOne = function (query, options) {
	return this._data.findOne(query, options);
};

/**
 * Queries the view data by specific id.
 * @see Collection::findById()
 * @returns {Array} The result of the find query.
 */
View.prototype.findById = function (id, options) {
	return this._data.findById(id, options);
};

/**
 * Queries the view data in a sub-array.
 * @see Collection::findSub()
 * @returns {Array} The result of the find query.
 */
View.prototype.findSub = function (match, path, subDocQuery, subDocOptions) {
	return this._data.findSub(match, path, subDocQuery, subDocOptions);
};

View.prototype._findSub = function (docArr, path, subDocQuery, subDocOptions) {
	return this._data._findSub(docArr, path, subDocQuery, subDocOptions);
};

/**
 * Queries the view data in a sub-array and returns first match.
 * @see Collection::findSubOne()
 * @returns {Object} The result of the find query.
 */
View.prototype.findSubOne = function (match, path, subDocQuery, subDocOptions) {
	return this._data.findSubOne(match, path, subDocQuery, subDocOptions);
};

View.prototype._findSubOne = function (docArr, path, subDocQuery, subDocOptions) {
	return this._data._findSubOne(docArr, path, subDocQuery, subDocOptions);
};

/**
 * Gets the module's internal data collection.
 * @returns {Collection}
 */
View.prototype.data = function () {
	return this._data;
};

/**
 * Sets the source from which the view will assemble its data.
 * @param {Collection|View} source The source to use to assemble view data.
 * @param {Function=} callback A callback method.
 * @returns {*} If no argument is passed, returns the current value of from,
 * otherwise returns itself for chaining.
 */
View.prototype.from = function (source, callback) {
	var self = this;

	if (source !== undefined) {
		// Check if we have an existing from
		if (this._from) {
			// Remove the listener to the drop event
			this._from.off('drop', this._collectionDroppedWrap);

			// Remove the current reference to the _from since we
			// are about to replace it with a new one
			delete this._from;
		}

		// Check if we have an existing reactor io that links the
		// previous _from source to the view's internal data
		if (this._io) {
			// Drop the io and remove it
			this._io.drop();
			delete this._io;
		}

		// Check if we were passed a source name rather than a
		// reference to a source object
		if (typeof(source) === 'string') {
			// We were passed a name, assume it is a collection and
			// get the reference to the collection of that name
			source = this._db.collection(source);
		}

		// Check if we were passed a reference to a view rather than
		// a collection. Views need to be handled slightly differently
		// since their data is stored in an internal data collection
		// rather than actually being a direct data source themselves.
		if (source.className === 'View') {
			// The source is a view so IO to the internal data collection
			// instead of the view proper
			source = source._data;

			if (this.debug()) {
				console.log(this.logIdentifier() + ' Using internal data "' + source.instanceIdentifier() + '" for IO graph linking');
			}
		}

		// Assign the new data source as the view's _from
		this._from = source;

		// Hook the new data source's drop event so we can unhook
		// it as a data source if it gets dropped. This is important
		// so that we don't run into problems using a dropped source
		// for active data.
		this._from.on('drop', this._collectionDroppedWrap);

		// Create a new reactor IO graph node that intercepts chain packets from the
		// view's _from source and determines how they should be interpreted by
		// this view. See the _handleChainIO() method which does all the chain packet
		// processing for the view.
		this._io = new ReactorIO(this._from, this, function (chainPacket) { return self._handleChainIO.call(this, chainPacket, self); });

		// Set the view's internal data primary key to the same as the
		// current active _from data source
		this._data.primaryKey(source.primaryKey());

		// Do the initial data lookup and populate the view's internal data
		// since at this point we don't actually have any data in the view
		// yet.
		var collData = source.find(this._querySettings.query, this._querySettings.options);
		this._data.setData(collData, {}, callback);

		// If we have an active query and that query has an $orderBy clause,
		// update our active bucket which allows us to keep track of where
		// data should be placed in our internal data array. This is about
		// ordering of data and making sure that we maintain an ordered array
		// so that if we have data-binding we can place an item in the data-
		// bound view at the correct location. Active buckets use quick-sort
		// algorithms to quickly determine the position of an item inside an
		// existing array based on a sort protocol.
		if (this._querySettings.options && this._querySettings.options.$orderBy) {
			this.rebuildActiveBucket(this._querySettings.options.$orderBy);
		} else {
			this.rebuildActiveBucket();
		}

		return this;
	}

	return this._from;
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
		updates,
		primaryKey,
		item,
		currentIndex;

	if (this.debug()) {
		console.log(this.logIdentifier() + ' Received chain reactor data: ' + chainPacket.type);
	}

	switch (chainPacket.type) {
		case 'setData':
			if (this.debug()) {
				console.log(this.logIdentifier() + ' Setting data in underlying (internal) view collection "' + this._data.name() + '"');
			}

			// Get the new data from our underlying data source sorted as we want
			var collData = this._from.find(this._querySettings.query, this._querySettings.options);
			this._data.setData(collData);

			// Rebuild active bucket as well
			this.rebuildActiveBucket(this._querySettings.options);
			break;

		case 'insert':
			if (this.debug()) {
				console.log(this.logIdentifier() + ' Inserting some data into underlying (internal) view collection "' + this._data.name() + '"');
			}

			// Decouple the data to ensure we are working with our own copy
			chainPacket.data.dataSet = this.decouple(chainPacket.data.dataSet);

			// Make sure we are working with an array
			if (!(chainPacket.data.dataSet instanceof Array)) {
				chainPacket.data.dataSet = [chainPacket.data.dataSet];
			}

			if (this._querySettings.options && this._querySettings.options.$orderBy) {
				// Loop the insert data and find each item's index
				arr = chainPacket.data.dataSet;
				count = arr.length;

				for (index = 0; index < count; index++) {
					insertIndex = this._activeBucket.insert(arr[index]);
					this._data._insertHandle(arr[index], insertIndex);
				}
			} else {
				// Set the insert index to the passed index, or if none, the end of the view data array
				insertIndex = this._data._data.length;
				this._data._insertHandle(chainPacket.data.dataSet, insertIndex);
			}
			break;

		case 'update':
			if (this.debug()) {
				console.log(this.logIdentifier() + ' Updating some data in underlying (internal) view collection "' + this._data.name() + '"');
			}

			primaryKey = this._data.primaryKey();

			// Do the update
			updates = this._data._handleUpdate(
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
					currentIndex = this._activeBucket.remove(item);

					// Get the current location of the item
					//currentIndex = this._data._data.indexOf(item);

					// Add the item back in to the active bucket
					insertIndex = this._activeBucket.insert(item);

					if (currentIndex !== insertIndex) {
						// Move the updated item to the new index
						this._data._updateSpliceMove(this._data._data, currentIndex, insertIndex);
					}
				}
			}
			break;

		case 'remove':
			if (this.debug()) {
				console.log(this.logIdentifier() + ' Removing some data from underlying (internal) view collection "' + this._data.name() + '"');
			}

			this._data.remove(chainPacket.data.query, chainPacket.options);

			if (this._querySettings.options && this._querySettings.options.$orderBy) {
				// Loop the dataSet and remove the objects from the ActiveBucket
				arr = chainPacket.data.dataSet;
				count = arr.length;

				for (index = 0; index < count; index++) {
					this._activeBucket.remove(arr[index]);
				}
			}
			break;

		default:
			break;
	}
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
	return this._data.ensureIndex.apply(this._data, arguments);
};

/**

 /**
 * Listens for an event.
 * @see Mixin.Events::on()
 */
View.prototype.on = function () {
	return this._data.on.apply(this._data, arguments);
};

/**
 * Cancels an event listener.
 * @see Mixin.Events::off()
 */
View.prototype.off = function () {
	return this._data.off.apply(this._data, arguments);
};

/**
 * Emits an event.
 * @see Mixin.Events::emit()
 */
View.prototype.emit = function () {
	return this._data.emit.apply(this._data, arguments);
};

/**
 * Emits an event.
 * @see Mixin.Events::deferEmit()
 */
View.prototype.deferEmit = function () {
	return this._data.deferEmit.apply(this._data, arguments);
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
	return this._data.distinct(key, query, options);
};

/**
 * Gets the primary key for this view from the assigned collection.
 * @see Collection::primaryKey()
 * @returns {String}
 */
View.prototype.primaryKey = function () {
	return this._data.primaryKey();
};

/**
 * @see Mixin.Triggers::addTrigger()
 */
View.prototype.addTrigger = function () {
	return this._data.addTrigger.apply(this._data, arguments);
};

/**
 * @see Mixin.Triggers::removeTrigger()
 */
View.prototype.removeTrigger = function () {
	return this._data.removeTrigger.apply(this._data, arguments);
};

/**
 * @see Mixin.Triggers::ignoreTriggers()
 */
View.prototype.ignoreTriggers = function () {
	return this._data.ignoreTriggers.apply(this._data, arguments);
};

/**
 * @see Mixin.Triggers::addLinkIO()
 */
View.prototype.addLinkIO = function () {
	return this._data.addLinkIO.apply(this._data, arguments);
};

/**
 * @see Mixin.Triggers::removeLinkIO()
 */
View.prototype.removeLinkIO = function () {
	return this._data.removeLinkIO.apply(this._data, arguments);
};

/**
 * @see Mixin.Triggers::willTrigger()
 */
View.prototype.willTrigger = function () {
	return this._data.willTrigger.apply(this._data, arguments);
};

/**
 * @see Mixin.Triggers::processTrigger()
 */
View.prototype.processTrigger = function () {
	return this._data.processTrigger.apply(this._data, arguments);
};

/**
 * @see Mixin.Triggers::_triggerIndexOf()
 */
View.prototype._triggerIndexOf = function () {
	return this._data._triggerIndexOf.apply(this._data, arguments);
};

/**
 * Drops a view and all it's stored data from the database.
 * @returns {boolean} True on success, false on failure.
 */
View.prototype.drop = function (callback) {
	if (!this.isDropped()) {
		if (this._from) {
			this._from.off('drop', this._collectionDroppedWrap);
			this._from._removeView(this);
		}

		if (this.debug() || (this._db && this._db.debug())) {
			console.log(this.logIdentifier() + ' Dropping');
		}

		this._state = 'dropped';

		// Clear io and chains
		if (this._io) {
			this._io.drop();
		}

		// Drop the view's internal collection
		if (this._data) {
			this._data.drop();
		}

		if (this._db && this._name) {
			delete this._db._view[this._name];
		}

		this.emit('drop', this);

		if (callback) { callback(false, true); }

		delete this._chain;
		delete this._from;
		delete this._data;
		delete this._io;
		delete this._listeners;
		delete this._querySettings;
		delete this._db;

		return true;
	}

	return false;
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
 * @deprecated Use query(<query>, <options>, <refresh>) instead. Query
 * now supports being presented with multiple different variations of
 * arguments.
 */
View.prototype.queryData = function (query, options, refresh) {
	if (query !== undefined) {
		this._querySettings.query = query;

		if (query.$findSub && !query.$findSub.$from) {
			query.$findSub.$from = this._data.name();
		}

		if (query.$findSubOne && !query.$findSubOne.$from) {
			query.$findSubOne.$from = this._data.name();
		}
	}

	if (options !== undefined) {
		this._querySettings.options = options;
	}

	if (query !== undefined || options !== undefined) {
		if (refresh === undefined || refresh === true) {
			this.refresh();
		}
	}

	if (query !== undefined) {
		this.emit('queryChange', query);
	}

	if (options !== undefined) {
		this.emit('queryOptionsChange', options);
	}

	if (query !== undefined || options !== undefined) {
		return this;
	}

	return this.decouple(this._querySettings);
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

	if (query !== undefined) {
		this.emit('queryChange', query);
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

		if (query !== undefined) {
			this.emit('queryChange', query);
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
View.prototype.query = new Overload({
	'': function () {
		return this.decouple(this._querySettings.query);
	},

	'object': function (query) {
		return this.$main.call(this, query, undefined, true);
	},

	'*, boolean': function (query, refresh) {
		return this.$main.call(this, query, undefined, refresh);
	},

	'object, object': function (query, options) {
		return this.$main.call(this, query, options, true);
	},

	'*, *, boolean': function (query, options, refresh) {
		return this.$main.call(this, query, options, refresh);
	},

	'$main': function (query, options, refresh) {
		if (query !== undefined) {
			this._querySettings.query = query;

			if (query.$findSub && !query.$findSub.$from) {
				query.$findSub.$from = this._data.name();
			}

			if (query.$findSubOne && !query.$findSubOne.$from) {
				query.$findSubOne.$from = this._data.name();
			}
		}

		if (options !== undefined) {
			this._querySettings.options = options;
		}

		if (query !== undefined || options !== undefined) {
			if (refresh === undefined || refresh === true) {
				this.refresh();
			}
		}

		if (query !== undefined) {
			this.emit('queryChange', query);
		}

		if (options !== undefined) {
			this.emit('queryOptionsChange', options);
		}

		if (query !== undefined || options !== undefined) {
			return this;
		}

		return this.decouple(this._querySettings);
	}
});

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
			// TODO: This could be wasteful if the previous options $orderBy was identical, do a hash and check first!
			this.rebuildActiveBucket(options.$orderBy);
		}

		if (options !== undefined) {
			this.emit('queryOptionsChange', options);
		}

		return this;
	}

	return this._querySettings.options;
};

/**
 * Clears the existing active bucket and builds a new one based
 * on the passed orderBy object (if one is passed).
 * @param {Object=} orderBy The orderBy object describing how to
 * order any data.
 */
View.prototype.rebuildActiveBucket = function (orderBy) {
	if (orderBy) {
		var arr = this._data._data,
			arrCount = arr.length;

		// Build a new active bucket
		this._activeBucket = new ActiveBucket(orderBy);
		this._activeBucket.primaryKey(this._data.primaryKey());

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
	var self = this,
		refreshResults,
		joinArr,
		i, k;

	if (this._from) {
		// Clear the private data collection which will propagate to the public data
		// collection automatically via the chain reactor node between them
		this._data.remove();

		// Grab all the data from the underlying data source
		refreshResults = this._from.find(this._querySettings.query, this._querySettings.options);
		this.cursor(refreshResults.$cursor);

		// Insert the underlying data into the private data collection
		this._data.insert(refreshResults);

		// Store the current cursor data
		this._data._data.$cursor = refreshResults.$cursor;
	}

	if (this._querySettings && this._querySettings.options && this._querySettings.options.$join && this._querySettings.options.$join.length) {
		// Define the change handler method
		self.__joinChange = self.__joinChange || function () {
			self._joinChange();
		};

		// Check for existing join collections
		if (this._joinCollections && this._joinCollections.length) {
			// Loop the join collections and remove change listeners
			// Loop the collections and hook change events
			for (i = 0; i < this._joinCollections.length; i++) {
				this._db.collection(this._joinCollections[i]).off('immediateChange', self.__joinChange);
			}
		}

		// Now start hooking any new / existing joins
		joinArr = this._querySettings.options.$join;
		this._joinCollections = [];

		// Loop the joined collections and hook change events
		for (i = 0; i < joinArr.length; i++) {
			for (k in joinArr[i]) {
				if (joinArr[i].hasOwnProperty(k)) {
					this._joinCollections.push(k);
				}
			}
		}

		if (this._joinCollections.length) {
			// Loop the collections and hook change events
			for (i = 0; i < this._joinCollections.length; i++) {
				this._db.collection(this._joinCollections[i]).on('immediateChange', self.__joinChange);
			}
		}
	}

	if (this._querySettings.options && this._querySettings.options.$orderBy) {
		this.rebuildActiveBucket(this._querySettings.options.$orderBy);
	} else {
		this.rebuildActiveBucket();
	}

	return this;
};

/**
 * Handles when a change has occurred on a collection that is joined
 * by query to this view.
 * @param objName
 * @param objType
 * @private
 */
View.prototype._joinChange = function (objName, objType) {
	this.emit('joinChange');

	// TODO: This is a really dirty solution because it will require a complete
	// TODO: rebuild of the view data. We need to implement an IO handler to
	// TODO: selectively update the data of the view based on the joined
	// TODO: collection data operation.
	// FIXME: This isnt working, major performance killer, invest in some IO from chain reactor to make this a targeted call
	this.refresh();
};

/**
 * Returns the number of documents currently in the view.
 * @returns {Number}
 */
View.prototype.count = function () {
	return this._data.count.apply(this._data, arguments);
};

// Call underlying
View.prototype.subset = function () {
	return this._data.subset.apply(this._data, arguments);
};

/**
 * Takes the passed data and uses it to set transform methods and globally
 * enable or disable the transform system for the view.
 * @param {Object} obj The new transform system settings "enabled", "dataIn"
 * and "dataOut":
 * {
 * 	"enabled": true,
 * 	"dataIn": function (data) { return data; },
 * 	"dataOut": function (data) { return data; }
 * }
 * @returns {*}
 */
View.prototype.transform = function (obj) {
	var currentSettings,
		newSettings;

	currentSettings = this._data.transform();
	this._data.transform(obj);
	newSettings = this._data.transform();

	// Check if transforms are enabled, a dataIn method is set and these
	// settings did not match the previous transform settings
	if (newSettings.enabled && newSettings.dataIn && (currentSettings.enabled !== newSettings.enabled || currentSettings.dataIn !== newSettings.dataIn)) {
		// The data in the view is now stale, refresh it
		this.refresh();
	}

	return newSettings;
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
	return this._data.filter(query, func, options);
};

/**
 * Returns the non-transformed data the view holds as a collection
 * reference.
 * @return {Collection} The non-transformed collection reference.
 */
View.prototype.data = function () {
	return this._data;
};

/**
 * @see Collection.indexOf
 * @returns {*}
 */
View.prototype.indexOf = function () {
	return this._data.indexOf.apply(this._data, arguments);
};

/**
 * Gets / sets the db instance this class instance belongs to.
 * @param {Db=} db The db instance.
 * @memberof View
 * @returns {*}
 */
Shared.synthesize(View.prototype, 'db', function (db) {
	if (db) {
		this._data.db(db);

		// Apply the same debug settings
		this.debug(db.debug());
		this._data.debug(db.debug());
	}

	return this.$super.apply(this, arguments);
});

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
			throw(this.logIdentifier() + ' Cannot create a view using this collection because a view with this name already exists: ' + name);
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
 * @param {String} name The name of the view to retrieve.
 * @returns {*}
 */
Db.prototype.view = function (name) {
	var self = this;

	// Handle being passed an instance
	if (name instanceof View) {
		return name;
	}

	if (this._view[name]) {
		return this._view[name];
	}

	if (this.debug() || (this._db && this._db.debug())) {
		console.log(this.logIdentifier() + ' Creating view ' + name);
	}

	this._view[name] = new View(name).db(this);

	self.deferEmit('create', self._view[name], 'view', name);

	return this._view[name];
};

/**
 * Determine if a view with the passed name already exists.
 * @param {String} name The name of the view to check for.
 * @returns {boolean}
 */
Db.prototype.viewExists = function (name) {
	return Boolean(this._view[name]);
};

/**
 * Returns an array of views the DB currently has.
 * @returns {Array} An array of objects containing details of each view
 * the database is currently managing.
 */
Db.prototype.views = function () {
	var arr = [],
		view,
		i;

	for (i in this._view) {
		if (this._view.hasOwnProperty(i)) {
			view = this._view[i];

			arr.push({
				name: i,
				count: view.count(),
				linked: view.isLinked !== undefined ? view.isLinked() : false
			});
		}
	}

	return arr;
};

Shared.finishModule('View');
module.exports = View;
},{"./ActiveBucket":3,"./Collection":5,"./CollectionGroup":6,"./Overload":27,"./ReactorIO":29,"./Shared":31}]},{},[1]);
