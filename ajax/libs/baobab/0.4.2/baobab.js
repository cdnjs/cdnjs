/**
 * Baobab Data Structure
 * ======================
 *
 * A handy data tree with cursors.
 */
var Cursor = require('./cursor.js'),
    EventEmitter = require('emmett'),
    Typology = require('typology'),
    helpers = require('./helpers.js'),
    update = require('./update.js'),
    merge = require('./merge.js'),
    mixins = require('./mixins.js'),
    defaults = require('../defaults.js'),
    type = require('./type.js');

function complexHash(type) {
  return type + '$' +
    (new Date()).getTime() + (''  + Math.random()).replace('0.', '');
}

/**
 * Main Class
 */
function Baobab(initialData, opts) {
  if (arguments.length < 1)
    initialData = {};

  // New keyword optional
  if (!(this instanceof Baobab))
    return new Baobab(initialData, opts);

  if (!type.Object(initialData) && !type.Array(initialData))
    throw Error('Baobab: invalid data.');

  // Extending
  EventEmitter.call(this);

  // Merging defaults
  this.options = helpers.shallowMerge(defaults, opts);
  this._cloner = this.options.cloningFunction || helpers.deepClone;

  // Privates
  this._transaction = {};
  this._future = undefined;
  this._history = [];
  this._cursors = {};

  // Internal typology
  this.typology = this.options.typology ?
    (this.options.typology instanceof Typology ?
      this.options.typology :
      new Typology(this.options.typology)) :
    new Typology();

  // Internal validation
  this.validate = this.options.validate || null;

  if (this.validate)
    try {
      this.typology.check(initialData, this.validate, true);
    }
    catch (e) {
      e.message = '/' + e.path.join('/') + ': ' + e.message;
      throw e;
    }

  // Properties
  this.data = this._cloner(initialData);

  // Mixin
  this.mixin = mixins.baobab(this);
}

helpers.inherits(Baobab, EventEmitter);

/**
 * Private prototype
 */
Baobab.prototype._archive = function() {
  if (this.options.maxHistory <= 0)
    return;

  var record = {
    data: this._cloner(this.data)
  };

  // Replacing
  if (this._history.length === this.options.maxHistory) {
    this._history.pop();
  }
  this._history.unshift(record);

  return record;
};

/**
 * Prototype
 */
Baobab.prototype.commit = function(referenceRecord) {
  var self = this,
      log;

  if (referenceRecord) {

    // Override
    this.data = referenceRecord.data;
    log = referenceRecord.log;
  }
  else {

    // Shifting root reference
    if (this.options.shiftReferences)
      this.data = helpers.shallowClone(this.data);

    // Applying modification (mutation)
    var record = this._archive();
    log = update(this.data, this._transaction, this.options);

    if (record)
      record.log = log;
  }

  if (this.validate) {
    var errors = [],
        l = log.length,
        d,
        i;

    for (i = 0; i < l; i++) {
      d = helpers.getIn(this.validate, log[i]);

      if (!d)
        continue;

      try {
        this.typology.check(this.get(log[i]), d, true);
      }
      catch (e) {
        e.path = log[i].concat((e.path || []));
        errors.push(e);
      }
    }

    if (errors.length)
      this.emit('invalid', {errors: errors});
  }

  // Baobab-level update event
  this.emit('update', {
    log: log
  });

  // Resetting
  this._transaction = {};

  if (this._future)
    this._future = clearTimeout(this._future);

  return this;
};

Baobab.prototype.select = function(path) {
  if (arguments.length > 1)
    path = helpers.arrayOf(arguments);

  if (!type.Path(path))
    throw Error('Baobab.select: invalid path.');

  // Casting to array
  path = !type.Array(path) ? [path] : path;

  // Complex path?
  var complex = type.ComplexPath(path);

  var solvedPath;

  if (complex)
    solvedPath = helpers.solvePath(this.data, path);

  // Registering a new cursor or giving the already existing one for path
  if (!this.options.cursorSingletons) {
    return new Cursor(this, path);
  }
  else {
    var hash = path.map(function(step) {
      if (type.Function(step))
        return complexHash('fn');
      else if (type.Object(step))
        return complexHash('ob');
      else
        return step;
    }).join('λ');

    if (!this._cursors[hash]) {
      var cursor = new Cursor(this, path, solvedPath, hash);
      this._cursors[hash] = cursor;
      return cursor;
    }
    else {
      return this._cursors[hash];
    }
  }
};

Baobab.prototype.root = function() {
  return this.select();
};

Baobab.prototype.reference = function(path) {
  var data;

  if (arguments.length > 1)
    path = helpers.arrayOf(arguments);

  if (!type.Path(path))
    throw Error('Baobab.get: invalid path.');

  return helpers.getIn(
    this.data, type.String(path) || type.Number(path) ? [path] : path
  );
};

Baobab.prototype.get = function() {
  var ref = this.reference.apply(this, arguments);

  return this.options.clone ? this._cloner(ref) : ref;
};

Baobab.prototype.clone = function(path) {
  return this._cloner(this.reference.apply(this, arguments));
};

Baobab.prototype.set = function(key, val) {

  if (arguments.length < 2)
    throw Error('Baobab.set: expects a key and a value.');

  var spec = {};

  if (type.Array(key)) {
    var path = helpers.solvePath(this.data, key);

    if (!path)
      throw Error('Baobab.set: could not solve dynamic path.');

    spec = helpers.pathObject(path, {$set: val});
  }
  else {
    spec[key] = {$set: val};
  }

  return this.update(spec);
};

Baobab.prototype.unset = function(key) {
  if (!key && key !== 0)
    throw Error('Baobab.unset: expects a valid key to unset.');

  var spec = {};
  spec[key] = {$unset: true};

  return this.update(spec);
};

Baobab.prototype.update = function(spec) {
  var self = this;

  if (!type.Object(spec))
    throw Error('Baobab.update: wrong specification.');

  this._transaction = merge(spec, this._transaction);

  // Should we let the user commit?
  if (!this.options.autoCommit)
    return this;

  // Should we update synchronously?
  if (!this.options.asynchronous)
    return this.commit();

  // Updating asynchronously
  if (!this._future)
    this._future = setTimeout(self.commit.bind(self, null), 0);

  return this;
};

Baobab.prototype.hasHistory = function() {
  return !!this._history.length;
};

Baobab.prototype.getHistory = function() {
  return this._history;
};

Baobab.prototype.undo = function() {
  if (!this.hasHistory())
    throw Error('Baobab.undo: no history recorded, cannot undo.');

  var lastRecord = this._history.shift();
  this.commit(lastRecord);
};

Baobab.prototype.release = function() {

  delete this.data;
  delete this._transaction;
  delete this._history;

  // Releasing cursors
  for (var k in this._cursors)
    this._cursors[k].release();
  delete this._cursors;

  // Killing event emitter
  this.kill();
};

/**
 * Output
 */
Baobab.prototype.toJSON = function() {
  return this.reference();
};

/**
 * Export
 */
module.exports = Baobab;
