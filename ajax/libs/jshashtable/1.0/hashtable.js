/**
 * Copyright 2009 Tim Down.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * jshashtable
 *
 * jshashtable is a JavaScript implementation of a hash table. It creates a
 * single constructor function called Hashtable in the global scope.
 *
 * Author: Tim Down <tim@timdown.co.uk>
 * Version: 1.0
 * Build date: 5 February 2009
 * Website: http://www.timdown.co.uk/jshashtable
 */

var Hashtable = (function() {
	function isUndefined(obj) {
		return (typeof obj === "undefined");
	}

	function isFunction(obj) {
		return (typeof obj === "function");
	}

	function isString(obj) {
		return (typeof obj === "string");
	}

	function hasMethod(obj, methodName) {
		return isFunction(obj[methodName]);
	}
	
	function hasEquals(obj) {
		return hasMethod(obj, "equals");
	}

	function hasHashCode(obj) {
		return hasMethod(obj, "hashCode");
	}

	function keyForObject(obj) {
		if (isString(obj)) {
			return obj;
		} else if (hasHashCode(obj)) {
			// Check the hashCode method really has returned a string
			var hashCode = obj.hashCode();
			if (!isString(hashCode)) {
				return keyForObject(hashCode);
			}
			return hashCode;
		} else if (hasMethod(obj, "toString")) {
			return obj.toString();
		} else {
			return String(obj);
		}
	}

	function equals_fixedValueHasEquals(fixedValue, variableValue) {
		return fixedValue.equals(variableValue);
	}

	function equals_fixedValueNoEquals(fixedValue, variableValue) {
		if (hasEquals(variableValue)) {
			return variableValue.equals(fixedValue);
		} else {
			return fixedValue === variableValue;
		}
	}

	function equals_equivalence(o1, o2) {
		return o1 === o2;
	}

	function arraySearch(arr, value, arrayValueFunction, returnFoundItem, equalityFunction) {
		var currentValue;
		for (var i = 0, len = arr.length; i < len; i++) {
			currentValue = arr[i];
			if (equalityFunction(value, arrayValueFunction(currentValue))) {
				return returnFoundItem ? [i, currentValue] : true;
			}
		}
		return false;
	}

	function arrayRemoveAt(arr, idx) {
		if (hasMethod(arr, "splice")) {
			arr.splice(idx, 1);
		} else {
			if (idx === arr.length - 1) {
				arr.length = idx;
			} else {
				var itemsAfterDeleted = arr.slice(idx + 1);
				arr.length = idx;
				for (var i = 0, len = itemsAfterDeleted.length; i < len; i++) {
					arr[idx + i] = itemsAfterDeleted[i];
				}
			}
		}
	}

	function checkKeyOrValue(kv, kvStr) {
		if (kv === null) {
			throw new Error("null is not a valid " + kvStr);
		} else if (isUndefined(kv)) {
			throw new Error(kvStr + " must not be undefined");
		}
	}

	var keyStr = "key", valueStr = "value";	

	function checkKey(key) {
		checkKeyOrValue(key, keyStr);
	}

	function checkValue(value) {
		checkKeyOrValue(value, valueStr);
	}

	/*------------------------------------------------------------------------*/	

	function Bucket(firstKey, firstValue, equalityFunction) {
		this.entries = [];
		this.addEntry(firstKey, firstValue);
		
		if (equalityFunction !== null) {
			this.getEqualityFunction = function() {
				return equalityFunction;
			};
		}
	}

	function getBucketEntryKey(entry) {
		return entry[0];
	}

	function getBucketEntryValue(entry) {
		return entry[1];
	}

	Bucket.prototype = {
		getEqualityFunction: function(searchValue) {
			if (hasEquals(searchValue)) {
				return equals_fixedValueHasEquals;
			} else {
				return equals_fixedValueNoEquals;
			}
		},

		searchForEntry: function(key) {
			return arraySearch(this.entries, key, getBucketEntryKey, true, this.getEqualityFunction(key));
		},

		getEntryForKey: function(key) {
			return this.searchForEntry(key)[1];
		},

		getEntryIndexForKey: function(key) {
			return this.searchForEntry(key)[0];
		},
		
		removeEntryForKey: function(key) {
			var result = this.searchForEntry(key);
			if (result) {
				arrayRemoveAt(this.entries, result[0]);
				return true;
			}
			return false;
		},

		addEntry: function(key, value) {
			this.entries[this.entries.length] = [key, value];
		},

		size: function() {
			return this.entries.length;
		},

		keys: function(keys) {
			var startIndex = keys.length;
			for (var i = 0, len = this.entries.length; i < len; i++) {
				keys[startIndex + i] = this.entries[i][0];
			}
		},

		values: function(values) {
			var startIndex = values.length;
			for (var i = 0, len = this.entries.length; i < len; i++) {
				values[startIndex + i] = this.entries[i][1];
			}
		},

		containsKey: function(key) {
			return arraySearch(this.entries, key, getBucketEntryKey, false, this.getEqualityFunction(key));
		},

		containsValue: function(value) {
			return arraySearch(this.entries, value, getBucketEntryValue, false, equals_equivalence);
		}
	};

	/*------------------------------------------------------------------------*/	

	function BucketItem() {}
	BucketItem.prototype = [];

	// Supporting functions for searching hashtable bucket items

	function getBucketKeyFromBucketItem(bucketItem) {
		return bucketItem[0];
	}

	function searchBucketItems(bucketItems, bucketKey, equalityFunction) {
		return arraySearch(bucketItems, bucketKey, getBucketKeyFromBucketItem, true, equalityFunction);
	}

	function getBucketForBucketKey(bucketItemsByBucketKey, bucketKey) {
		var bucketItem = bucketItemsByBucketKey[bucketKey];

		// Check that this is a genuine bucket item and not something
		// inherited from prototype
		if (bucketItem && (bucketItem instanceof BucketItem)) {
			return bucketItem[1];
		}
		return null;
	}
	
	/*------------------------------------------------------------------------*/	
	
	function Hashtable(hashingFunction, equalityFunction) {
		var bucketItems = [];
		var bucketItemsByBucketKey = {};

		hashingFunction = isFunction(hashingFunction) ? hashingFunction : keyForObject;
		equalityFunction = isFunction(equalityFunction) ? equalityFunction : null;

		this.put = function(key, value) {
			checkKey(key);
			checkValue(value);
			var bucketKey = hashingFunction(key);

			// Check if a bucket exists for the bucket key
			var bucket = getBucketForBucketKey(bucketItemsByBucketKey, bucketKey);
			if (bucket) {
				// Check this bucket to see if it already contains this key
				var bucketEntry = bucket.getEntryForKey(key);
				if (bucketEntry) {
					// This bucket entry is the current mapping of key to value, so replace
					// old value and we're done.
					bucketEntry[1] = value;
				} else {
					// The bucket does not contain an entry for this key, so add one
					bucket.addEntry(key, value);
				}
			} else {
				// No bucket, so create one and put our key/value mapping in
				var bucketItem = new BucketItem();
				bucketItem[0] = bucketKey;
				bucketItem[1] = new Bucket(key, value, equalityFunction);
				bucketItems[bucketItems.length] = bucketItem;
				bucketItemsByBucketKey[bucketKey] = bucketItem;
			}
		};

		this.get = function(key) {
			checkKey(key);

			var bucketKey = hashingFunction(key);

			// Check if a bucket exists for the bucket key
			var bucket = getBucketForBucketKey(bucketItemsByBucketKey, bucketKey);
			if (bucket) {
				// Check this bucket to see if it contains this key
				var bucketEntry = bucket.getEntryForKey(key);
				if (bucketEntry) {
					// This bucket entry is the current mapping of key to value, so return
					// the value.
					return bucketEntry[1];
				}
			}
			return null;
		};

		this.containsKey = function(key) {
			checkKey(key);

			var bucketKey = hashingFunction(key);

			// Check if a bucket exists for the bucket key
			var bucket = getBucketForBucketKey(bucketItemsByBucketKey, bucketKey);
			if (bucket) {
				return bucket.containsKey(key);
			}

			return false;
		};

		this.containsValue = function(value) {
			checkValue(value);
			for (var i = 0, len = bucketItems.length; i < len; i++) {
				if (bucketItems[i][1].containsValue(value)) {
					return true;
				}
			}
			return false;
		};

		this.clear = function() {
			bucketItems.length = 0;
			bucketItemsByBucketKey = {};
		};

		this.isEmpty = function() {
			return bucketItems.length === 0;
		};

		this.keys = function() {
			var keys = [];
			for (var i = 0, len = bucketItems.length; i < len; i++) {
				bucketItems[i][1].keys(keys);
			}
			return keys;
		};

		this.values = function() {
			var values = [];
			for (var i = 0, len = bucketItems.length; i < len; i++) {
				bucketItems[i][1].values(values);
			}
			return values;
		};

		this.remove = function(key) {
			checkKey(key);

			var bucketKey = hashingFunction(key);

			// Check if a bucket exists for the bucket key
			var bucket = getBucketForBucketKey(bucketItemsByBucketKey, bucketKey);

			if (bucket) {
				// Remove entry from this bucket for this key
				if (bucket.removeEntryForKey(key)) {
					// Entry was removed, so check if bucket is empty
					if (bucket.size() === 0) {
						// Bucket is empty, so remove it
						var result = searchBucketItems(bucketItems, bucketKey, bucket.getEqualityFunction(key));
						arrayRemoveAt(bucketItems, result[0]);
						delete bucketItemsByBucketKey[bucketKey];
					}
				}
			}
		};

		this.size = function() {
			var total = 0;
			for (var i = 0, len = bucketItems.length; i < len; i++) {
				total += bucketItems[i][1].size();
			}
			return total;
		};
	}

	return Hashtable;
})();