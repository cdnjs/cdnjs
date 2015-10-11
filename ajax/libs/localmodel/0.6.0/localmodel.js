/*!
 * LocalModel
 * Developer: Rick Craig
 * https://github.com/RickCraig/localmodel
*/

(function(window) {
'use strict';

/**
 * Checks if an object is empty
 * @private
 * @param {Object} obj
 * @returns {Boolean} true if empty
 */
var isEmpty = function(obj) {
  for(var prop in obj) {
    if(obj.hasOwnProperty(prop)) {
      return false;
    }
  }
  return true;
};

/**
 * Checks an array of booleans for a false
 * @private
 * @param {Array} arr - an array of booleans
 * @returns {Boolean} true if contains a false
 */
var containsFalse = function(arr) {
  for (var i = 0; i < arr.length; i++) {
    if (!arr[i]) {
      return true;
    }
  }
  return false;
};

/**
 * Overwrites obj1's values with obj2's and adds obj2's if non existent in obj1
 * @private
 * @param {Object} obj1
 * @param {Object} obj2
 * @returns {Object} obj1 and obj2 merged
 */
function merge(obj1, obj2) {
  var obj3 = {};
  var obj1Keys = Object.keys(obj1);
  var obj2Keys = Object.keys(obj2);
  for (var a = 0; a < obj1Keys.length; a++) {
    obj3[obj1Keys[a]] = obj1[obj1Keys[a]];
  }
  for (var b = 0; b < obj2Keys.length; b++) {
    obj3[obj2Keys[b]] = obj2[obj2Keys[b]];
  }
  return obj3;
}

/**
 * Checks an object or array for LocalDocuments
 * @private
 * @param {Object/Array} check
 * @returns {Boolean} true if it contains a LocalDocument
 */
var containsArray = function(check) {
  var isDate = check instanceof Date;
  if (!isDate && (check instanceof Object || check instanceof Array)) {
    return true;
  }

  return false;
};

/**
 * Converts a LocalDocument to object
 * @private
 * @param {Object} entries
 * @param {Array} select - an array of properties
 * @returns {Array} an array of filtered entries
 */
var selectFromEntries = function(entries, select) {
  return entries.map(function(entry) {
    var mapped = {};
    // Show only the fields in select
    for (var i = 0; i < select.length; i++) {
      mapped[select[i]] = entry[select[i]];
    }
    return mapped;
  });
};

/**
 * Checks an array for an object with key
 * @private
 * @param {Array} arr
 * @param {String} key
 * @param {String} keyword
 * @returns {Number} -1 if not found index if found
 */
var findInArray = function(arr, key, keyword) {
  var total = arr.length;
  for (var i = 0; i < total; i++) {
    if (arr[i][key] === keyword) {
      return i;
    }
  }
  return -1;
};

/**
 * Generates a random UUID
 * @private
 * @returns {String} random id
 */
var generateUUID = function(){
  var d = Date.now();
  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
    .replace(/[xy]/g, function(c) {
      var r = (d + Math.random()*16)%16 | 0;
      d = Math.floor(d/16);
      return (c==='x' ? r : (r&0x3|0x8)).toString(16);
    });
  return uuid;
};

/**
 * Builds the key for the data
 * @private
 * @param {String} name - of the model
 * @param {String} id - of the entry
 * @returns {String} the merged key name
 */
var getKey = function(name, id) {
  return name + '::' + id;
};

/**
 * Adds the index for the new entry
 * @private
 * @param {String} name - the name of the model
 * @param {String} newIndex - the key for the new entry
 */
var addIndex = function(name, newIndex, options) {
  var indexName = name + '-index';
  var indexString = options.storage.getItem(indexName);
  var indices = indexString ? JSON.parse(indexString) : [];
  indices.push(newIndex);
  options.storage.setItem(indexName, JSON.stringify(indices));
};

/**
 * Returns the indices for a model
 * @private
 * @param {String} name - the model name
 * @returns {Array} the indices
 */
var getIndices = function(name, options) {
  var indices = options.storage.getItem(name + '-index');
  return JSON.parse(indices);
};

/**
 * Get a specific index from the indices
 * @private
 * @param {Array} indices
 * @param {String} term
 * @returns {String} matching index
 */
var getIndex = function(indices, term) {
  var regex = new RegExp('::' + term, 'g');
  for (var i = 0; i < indices.length; i++) {
    var index = indices[i];
    if (regex.test(index)) {
      return index;
    }
  }
  return;
};

/**
 * Removes an index from indices
 * @private
 * @param {String} model
 * @param {String} key
 */
var removeIndex = function(model, key, options) {
  var indices = getIndices(model, options);
  var index = indices.indexOf(key);
  if (index > -1) {
    indices.splice(index, 1);
    options.storage.setItem(model + '-index', JSON.stringify(indices));
  } else {
    console.error(new Error('The key "' + key + '" doesn\'t exist'));
  }
};

/* jshint undef:false */

/**
 * Aggregate constructor
 * @private
 */
var LocalAggregate = function() {};

/**
 * Returns matched data from an array
 * @private
 * @param {Array} data
 * @param {Object} query
 * @param {Object} schema - the schema
 * @returns {Array} and array of matched data
 */
LocalAggregate.prototype.match = function(data, query, schema) {
  if (isEmpty(query.$match)) {
    return data;
  }

  return data.filter(function(entry) {
    var matches = schema.checkEntry(entry, query.$match);
    if (matches.length > 0 && !containsFalse(matches)) {
      return true;
    } else {
      return false;
    }
  });
};

/**
 * Handles all of the group features
 * @private
 * @param {Array} data
 * @param {Object} query
 */
LocalAggregate.prototype.createGroup = function(data, query) {
  // The _id tag is mandatory
  var group = query.$group;
  var groupData = [];
  var _this = this;
  if (typeof group._id === 'undefined') {
    return console.error('the $group method must contain a _id tag');
  }

  groupData = _this.group(data, group);

  // Use group data below to add properties and counts
  var keys = Object.keys(query.$group);
  var totalKeys = keys.length;

  for (var k = 0; k < totalKeys; k++) {
    var key = keys[k];

    if (key !== '_id') {

      // Loop through results
      var totalGrouped = groupData.length;
      for (var ag = 0; ag < totalGrouped; ag++) {
        var current = groupData[ag];

        if (group[key].$first) {
          _this.get(current, group[key].$first, key, true);
        }

        if (group[key].$last) {
          _this.get(current, group[key].$last, key, false);
        }

        if (group[key].$sum) {
          _this.sum(current, group[key].$sum, key);
        }

        if (group[key].$avg) {
          _this.avg(current, group[key].$avg, key);
        }

        if (group[key].$max) {
          _this.minMax(current, group[key].$max, key, true);
        }

        if (group[key].$min) {
          _this.minMax(current, group[key].$min, key, false);
        }

      } // End of grouped loop
    } // End of check for _id
  } // End of loop through $group

  return groupData;
};

/**
 * Groups the data
 * @private
 * @param {Array} data - all the data
 * @param {Object} group - the group query
 * @returns {Array} of grouped entries
 */
LocalAggregate.prototype.group = function(data, group) {
  var groupBy = group._id;
  var grouped = [];
  var totalEntries = data.length;
  for (var g = 0; g < totalEntries; g++) {
    var entryResult = data[g][groupBy];
    var dataLocation = findInArray(grouped, '_id', entryResult);
    if (dataLocation === -1) {
      grouped.push({
        _id: entryResult,
        _group: [data[g]]
      });
      continue;
    }
    grouped[dataLocation]._group.push(data[g]);
  }
  return grouped;
};

/**
 * Get the First or Last of the group
 * @private
 * @param {Object} entry
 * @param {String} field
 * @param {String} key
 * @param {Boolean} first - true is first
 */
LocalAggregate.prototype.get = function(entry, field, key, first) {
  if (typeof field !== 'string') {
    console.error('The first/last property must be a string');
    return;
  }

  if (field && entry._group.length > 0) {
    var index = first ? 0 : entry._group.length-1;
    entry[key] = entry._group[index][field];
  }
};

/**
 * Does the sum of all in the group
 * @private
 * @param {Object} entry
 * @param {String} field
 * @param {String} key
 */
LocalAggregate.prototype.sum = function(entry, field, key) {
  if (field && entry._group.length > 0) {
    // Check if it's a number
    if (typeof field === 'number') {
      // Increment and times by number
      entry[key] = entry._group.length * field;
    } else {
      // Not a number use reduce
      entry[key] = entry._group.reduce(function(prev, curr) {
        return prev + curr[field];
      }, 0);
    }
  }
};

/**
 * Gets the average of all in the group
 * @private
 * @param {Object} entry
 * @param {String} field
 * @param {String} key
 */
LocalAggregate.prototype.avg = function(entry, field, key) {
  if (typeof field !== 'string') {
    console.error('The $avg field must be a string');
    return;
  }

  if ( field && entry._group.length > 0 &&
    typeof entry._group[0][field] === 'number') {
    var totalInGroup = entry._group.length;
    var totalToAverage = 0;
    for (var i = 0; i < totalInGroup; i++) {
      totalToAverage += entry._group[i][field];
    }
    entry[key] = totalToAverage / totalInGroup;
  }
};

/**
 * Get the maximum or minimum number
 * @private
 * @param {Object} entry
 * @param {String} field
 * @param {String} key
 * @param {Boolean} max - true if looking for max
 */
LocalAggregate.prototype.minMax = function(entry, field, key, max) {
  if (typeof field !== 'string') {
    console.error('The $min & $max fields must be a string');
    return;
  }

  if (field && entry._group.length > 0 &&
    typeof entry._group[0][field] === 'number') {
    var totalInGroup = entry._group.length;
    var result = max ? 0 : Infinity;
    for (var i = 0; i < totalInGroup; i++) {
      var num = entry._group[i][field];
      result = max ? Math.max(result, num) : Math.min(result, num);
    }
    entry[key] = result;
  }
};

/**
 * Sorts the array
 * @private
 * @param {Array} data
 * @param {Function} field
 */
LocalAggregate.prototype.sort = function(data, field) {
  if (typeof field === 'function') {
    data.sort(field);
  } else {
    console.warn('LocalModel: $sort should be a compare function');
  }
};

/**
 * limits the array
 * @private
 * @param {Array} data
 * @param {Function} field
 */
LocalAggregate.prototype.limit = function(data, field) {
  if (typeof field === 'number') {
    return data.slice(0, field);
  } else {
    console.warn('LocalModel: $limit should be a number');
  }
};


/**
 * LocalDebug constructor
 */
var LocalDebug = function(options) {
  this.options = options || {};
  this.options.enabled = options.enabled || false;
};

/**
 * Simple logging
 * @private
 */
LocalDebug.prototype.log = function() {
  if (!this.options.enabled) { return; }
  console.log('[LocalModel]', arguments);
};

/* jshint undef:true */

/**
 * Local Document constructor
 * @public
 * @param {Object} data - the entry raw data
 */
var LocalDocument = function(data, schema) {
  this._schema = schema;
  this._original = {};
  this._indexKey = getKey(schema.name, data._id);

  // Add ID
  if (data._id) {
    this._original._id = data._id;
    this._id = data._id;
  }

  // Try to force the schema type
  var total = schema.keys.length;
  for (var i = 0; i < total; i++) {
    var key = schema.keys[i];
    var property = data[key];

    property = LocalDocument.convert(key, property, schema.schema);

    if (typeof property !== 'undefined') {
      this._original[key] = property;
      this[key] = property;
    }
  }
};

/**
 * Forces the types
 * @public
 * @param {String} key
 * @param {String/Number} property - the data needing converted
 * @param {Object} schema - the model schema
 * @returns {Object/String/Number} the converted property
 */
LocalDocument.convert = function(key, property, schema) {
  var type;
  if (typeof schema[key] === 'object') {

    // Get the type
    if (!schema[key].type) {
      type = LocalSchema.SchemaTypes.String;
    } else {
      type = schema[key].type;
    }

    // Set the default if it exists
    if (typeof schema[key].default !== 'undefined' && !property) {
      property = schema[key].default;
    }
  } else {
    type = schema[key];
  }

  if (property && type === LocalSchema.SchemaTypes.Date) {
    property = new Date(property);
  }

  return property;
};

/**
 * Used to save the document when updated
 * @public
 */
LocalDocument.prototype.save = function() {
  // Build the object to save
  var toBeSaved = {};
  var total = this._schema.keys.length;
  for (var i = 0; i < total; i++) {
    var key = this._schema.keys[i];

    // Check this[key] doesn't contain a local document,
    // if it does, ignore it, because it's a populate!
    if (!containsArray(this[key])) {
      toBeSaved[key] = this[key];
    } else {
      toBeSaved[key] = this._original[key];
    }
  }
  toBeSaved._id = this._id;

  var itemKey = getKey(this._schema.name, this._id);
  this._schema
    .options
    .storage
    .setItem(itemKey, JSON.stringify(toBeSaved));
};

/**
 * Used to populate a property with the
 * relative entry/entries from another model
 * @public
 * @param {String} names - the referring property names
 * @param {Object} includes - the properties to include
 * from the other model
 * @param {Object} options
 */
LocalDocument.prototype.populate = function(names, options) {
  // http://mongoosejs.com/docs/populate.html
  var split = names.split(' ');

  for (var n = 0; n < split.length; n++) {
    var name = split[n];
    // Check the name exists
    if (!this._schema.schema[name]) {
      console.warn('The property ' + name + ' doesn\'t exist in this schema');
      continue;
    }

    // Check the 'name' has a ref property in the schema
    var ref = this._schema.schema[name].ref;
    if (!ref) {
      console.error('The name ' + name + ' does not have a ref');
      return;
    }

    // Use the ref to get the other model localModel.model(ref)
    var model = this._schema.core.model(ref);

    // default uses the _id as the foreign key
    var query = { _id: this[name] };

    // allow the user to set a custom foreign key
    var foreignKey = this._schema.schema[name].foreignKey;
    if (foreignKey) {
      query = {};
      query[foreignKey] = this[name];
    }

    if (options && options.match) {
      // Merge the match object with the query object;
      query = merge(options.match, query);
    }

    // Do a find on the model from this name
    var related = model.find(query);

    if (related.length > 0) {

      if (options) {

        // Sorting: pass a sort function
        if (options.sort && typeof options.sort === 'function') {
          related.sort(options.sort);
        }

        // Set the limit if set
        if (
          options.limit &&
          typeof options.limit === 'number' &&
          related.length > options.limit
        ) {
          related = related.splice(0, options.limit);
        }

        var select;
        if (options.select) {
          select = options.select.split(' ');
        } else {
          select = model.keys;
        }

        related = selectFromEntries(related, select);

      }

      this[name] = related.length === 1 ? related[0] : related;
    }
  }

  return this;

};

/**
 * Used to wipe this document from memory
 * @public
 */
LocalDocument.prototype.remove = function() {
  // Remove the key from indices
  removeIndex(
    this._schema.name,
    this._indexKey,
    this._schema.options
  );

  // Remove the data from storage
  localStorage.removeItem(this._indexKey);

  // Allow the schema to update
  this._schema.indices = null;
};

/* jshint undef:true */

/**
 * LocalModel constructor
 * @public
 * @param {Object} options
 */
var LocalModel = function(options) {
  if (typeof Storage === 'undefined') {
    console.warn('Storage is not supported in this browser');
  }

  this.options = options || {};
  this.models = {};

  if (!this.options.storage) {
    this.options.storage = localStorage;
  }

  this.options.debug = new LocalDebug({
    enabled: options && options.debug ? true : false
  });
};

/**
 * Adds a model schema to the list of models
 * @public
 * @param {String} name - the name of the model
 * @param {Object} schema - the schema for the model
 * @returns {Object} the schema;
 */
LocalModel.prototype.addModel = function(name, schema) {
  var model = new LocalSchema(name, schema, this, this.options);
  this.models[name] = model;
  return model;
};

/**
 * Returns the schema for the model by name
 * @public
 * @param {String} name - the name of the model
 * @returns {Object} the model schema
 */
LocalModel.prototype.model = function(name) {
  if (!this.models[name]) {
    console.error('The model with name "' + name + '" does not exist.');
    return null;
  }
  return this.models[name];
};

/* jshint undef:false */

/**
 * Local Schema constructor
 * @public
 * @param {Object} schema
 */
var LocalSchema = function(name, schema, core, options) {
  this.schema = schema;
  this.name = name;
  this.options = options;
  this.core = core;
  this.keys = Object.keys(schema);
  this.keys.push('_id');
};

/**
 * Adds a property to the schema
 * @public
 * @param {Object} property
 */
LocalSchema.prototype.addToSchema = function(property) {
  var newKeys = Object.keys(property);
  var total = newKeys.length;
  for (var i = 0; i < total; i++) {
    this.schema[newKeys[i]] = property[newKeys[i]];
  }
  this.keys = Object.keys(this.schema);
  this.keys.push('_id');
};

/**
 * Create a new data object for this schema
 * @public
 * @param {Object} data
 * @returns {}
 */
LocalSchema.prototype.create = function(data) {
  var newEntry = {};
  newEntry._id = generateUUID();
  var total = this.keys.length;
  for (var i = 0; i < total; i++) {
    var key = this.keys[i];
    if (key === '_id') {
      continue;
    }

    var value = data[key];
    if (typeof value === 'undefined' &&
      typeof this.schema[key].default !== 'undefined') {
      value = this.schema[key].default;
    }
    newEntry[key] = value;
  }

  // Save to localstorage
  // At some point if there is an index, it can be added the the key for speed
  var index = getKey(this.name, newEntry._id);
  this.options.storage.setItem(index, JSON.stringify(newEntry));
  addIndex(this.name, index, this.options);

  // Clear indices
  this.indices = null;
  return new LocalDocument(newEntry, this);
};

/**
 * Returns all entries in storage
 * @public
 * @returns {Array} all entries
 */
LocalSchema.prototype.all = function() {
  var _this = this;
  this.indices = this.indices || getIndices(this.name, this.options);
  var results = [];

  // Check if the collection is empty
  if (!this.indices) {
    return results;
  }

  var total = this.indices.length;
  for (var i = 0; i < total; i++) {
    var index = this.indices[i];
    results.push(this.options.storage.getItem(index));
  }
  results = JSON.parse('[' + results.join(',') + ']');
  results = results.map(function(result) {
    return new LocalDocument(result, _this);
  });

  return results;
};

/**
 * Find an entry by ID
 * @public
 * @param {String} id
 * @returns {Object} the object or null
 */
LocalSchema.prototype.findById = function(id) {
  this.indices = this.indices || getIndices(this.name, this.options);
  var match = getIndex(this.indices, id);
  if (!match) {
    return null;
  }
  return new LocalDocument(
    JSON.parse(
      this.options.storage.getItem(match)
    ), this);
};


/**
 * Looks through the schema for an entry
 * @private
 * @param {Object} entry - the parsed entry
 * @param {Object} query
 * @returns {Array} an array of matches
 */
LocalSchema.prototype.checkEntry = function(entry, query) {
  var total = this.keys.length;
  var matches = [];

  for (var q = 0; q < total; q++) {
    var key = this.keys[q];
    var queryItem = query[key];
    if (typeof queryItem === 'undefined') {
      continue;
    }

    var isRegex = queryItem instanceof RegExp;
    var checkEmpty = typeof queryItem === 'object' && isEmpty(queryItem);
    if (!isRegex && (queryItem === '' || checkEmpty)) {
      continue;
    }

    if (entry[key]) {
      matches.push(matchQuery(
        LocalDocument.convert(key, entry[key], this.schema),
        queryItem
      ));
    }
  }
  return matches;
};

/**
 * Find entries matching a query
 * @public
 * @param {Object} query
 * @param {Boolean} isCount - return a count when true
 * @returns {Array/Number} an array of matches or
 * a number if isCount = true
 */
LocalSchema.prototype.find = function(query, isCount) {
  this.indices = this.indices || getIndices(this.name, this.options);
  if (!query || isEmpty(query)) {
    var count = this.indices ? this.indices.length : 0;
    return isCount ? count : this.all();
  }

  var results = isCount ? 0 : [];

  // Check if the collection is empty
  if (!this.indices) {
    return results;
  }

  for (var i = 0; i < this.indices.length; i++) {
    var entry = this.options.storage.getItem(this.indices[i]);
    var parsed = JSON.parse(entry);
    var matches = this.checkEntry(parsed, query);

    if (matches.length > 0 && !containsFalse(matches)) {
      if (!isCount) {
        results.push(new LocalDocument(parsed, this));
      } else {
        results++;
      }
    }
  }

  this.options.debug.log(results.length + ' results found');

  return results;
};

/**
 * Remove entries utilising the find query
 * @public
 * @param {Object} query
 * @returns {Number} the number of items removed
 */
LocalSchema.prototype.remove = function(query) {
  var entries = this.find(query);

  // Remove each entry individually
  for (var i = 0; i < entries.length; i++ ) {
    entries[i].remove();
  }

  return entries.length;
};

/**
 * Helper to return a count of results
 * @public
 * @param {Object} query
 * @returns {Number} the count of results
 */
LocalSchema.prototype.count = function(query) {
  return this.find(query, true);
};

/**
 * A batch updater
 * @public
 * @param {Object} query - to find entries to update
 * @param {Object} values - the values to update
 * @returns {Number} the number of entries changed
 */
LocalSchema.prototype.update = function(query, values) {
  var entries = this.find(query);
  var totalEntries = entries.length;
  if (totalEntries < 1) {
    return 0;
  }
  for (var i = 0; i < totalEntries; i++) {
    var entry = entries[i];
    var total = this.keys.length;
    for (var s = 0; s < total; s++) {
      var key = this.keys[s];
      if (typeof values[key] !== 'undefined') {
        entry[key] = values[key];
      }
    }
    entry.save();
  }
  return entries.length;
};

/**
 * Finds and the populates the results
 * @public
 * @param {Object} query
 * @param {String} names - space seperated
 * @param {Object} options
 * @returns {Array} of populated results
 */
LocalSchema.prototype.findAndPopulate = function(query, names, options) {
  var entries = this.find(query);
  var totalEntries = entries.length;
  if (totalEntries < 1) {
    return [];
  }
  var populated = [];
  for (var i = 0; i < totalEntries; i++) {
    populated.push(entries[i].populate(names, options));
  }
  return populated;
};

/**
 * contains the ability to match and group documents
 * @param {Array} pipeline - an array of queries
 * @returns {Array} data reduced by the pipeline
 */
LocalSchema.prototype.aggregate = function(pipeline) {
  var _this = this;
  var data = this.all();
  var total = pipeline.length;
  var aggregate = new LocalAggregate();

  for (var i = 0; i < total; i++) {
    var query = pipeline[i];
    if (query.$match) {
      data = aggregate.match(data, query, _this);
    } else if(query.$group) {
      data = aggregate.createGroup(data, query);
    } else if(query.$sort) {
      aggregate.sort(data, query.$sort);
    } else if(query.$limit) {
      data = aggregate.limit(data, query.$limit);
    } else {
      console.error('LocalModel: Aggregate currently only supports ' +
        '$match, $group, $sort & $limit query types. Query ' +
        'types can not be empty.');
      return;
    }
  }

  return data;
};

/**
 * LocalSchema Schema Types
 * For use in validation and return
 * @public
 */
LocalSchema.SchemaTypes = {
  String: 'string',
  Number: 'number',
  Boolean: 'boolean',
  Mixed: 'mixed',
  Date: 'date'
};

/**
 * Handle date
 * @private
 * @param {Object} data
 * @param {Object} query
 * @param {Boolean} isDate
 * @returns {Boolean} true if matched
 */
var handleSums = function(data, query, isDate) {
  var dateMatches = [];

  if (query.$gte) {
    var gte = isDate ? new Date(query.$gte) : query.$gte;
    dateMatches.push(gte <= data);
  }

  if (query.$gt) {
    var gt = isDate ? new Date(query.$gt) : query.$gt;
    dateMatches.push(gt < data);
  }

  if (query.$lte) {
    var lte = isDate ? new Date(query.$lte) : query.$lte;
    dateMatches.push(lte >= data);
  }

  if (query.$lt) {
    var lt = isDate ? new Date(query.$lt) : query.$lt;
    dateMatches.push(lt > data);
  }

  return !containsFalse(dateMatches);
};

/**
 * Handles the object
 * @private
 * @param {Object} data
 * @param {Object} query
 * @returns {Boolean} true if there is a match
 */
var handleQueryObject = function(data, query) {
  // Do the business in here for $gte, $gt, $lte, $lt

  if (typeof data === 'number') {
    return handleSums(data, query);
  }

  if (data instanceof Date) {
    return handleSums(data, query, true);
  }

};

/**
 * Takes in a data string and returns
 * true if query matches
 * @private
 * @param {String} data - the string to match
 * @param {Mixed} query
 * @returns {Boolean} true if the data matches the query
 */
var matchQuery = function(data, query) {

  // Query using regular expression
  if (query instanceof RegExp) {
    return query.test(data);
  }

  // Query using string, number or boolean
  if (typeof query === 'string' ||
    typeof query === 'number' ||
    typeof query === 'boolean') {
      return data === query;
    }

  // Handle object
  if (typeof query === 'object') {
    return handleQueryObject(data, query);
  }
};

window.LocalModel = LocalModel;
window.LocalSchema = LocalSchema;
window.LocalDocument = LocalDocument;

}(window));