/**
 * Baobab Data Structure
 * ======================
 *
 * A handy data tree with cursors.
 */
var Cursor = require('./cursor.js'),
    EventEmitter = require('emmett'),
    Facet = require('./facet.js'),
    helpers = require('./helpers.js'),
    update = require('./update.js'),
    merge = require('./merge.js'),
    defaults = require('../defaults.js'),
    type = require('./type.js');

var uniqid = (function() {
  var i = 0;
  return function() {
    return i++;
  };
})();

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

  // Privates
  this._transaction = {};
  this._future = undefined;
  this._cursors = {};
  this._identity = '[object Baobab]';

  // Properties
  this.log = [];
  this.previousData = null;
  this.data = initialData;
  this.root = this.select();
  this.facets = {};

  // Immutable tree?
  if (this.options.immutable)
    helpers.deepFreeze(this.data);

  // Boostrapping root cursor's methods
  function bootstrap(name) {
    this[name] = function() {
      var r = this.root[name].apply(this.root, arguments);
      return r instanceof Cursor ? this : r;
    };
  }

  [
    'apply',
    'chain',
    'get',
    'merge',
    'push',
    'set',
    'splice',
    'unset',
    'unshift',
    'update'
  ].forEach(bootstrap.bind(this));

  // Facets
  if (!type.Object(this.options.facets))
    throw Error('Baobab: invalid facets.');

  for (var k in this.options.facets)
    this.addFacet(k, this.options.facets[k]);
}

helpers.inherits(Baobab, EventEmitter);

/**
 * Prototype
 */
Baobab.prototype.addFacet = function(name, definition, args) {
  this.facets[name] = this.createFacet(definition, args);
  return this;
};

Baobab.prototype.createFacet = function(definition, args) {
  return new Facet(this, definition, args);
};

Baobab.prototype.select = function(path) {
  path = path || [];

  if (arguments.length > 1)
    path = helpers.arrayOf(arguments);

  if (!type.Path(path))
    throw Error('Baobab.select: invalid path.');

  // Casting to array
  path = [].concat(path);

  // Computing hash
  var hash = path.map(function(step) {
    if (type.Function(step) || type.Object(step))
      return '$' + uniqid() + '$';
    else
      return step;
  }).join('|λ|');

  // Registering a new cursor or giving the already existing one for path
  var cursor;
  if (!this._cursors[hash]) {
    cursor = new Cursor(this, path, hash);
    this._cursors[hash] = cursor;
  }
  else {
    cursor = this._cursors[hash];
  }

  // Emitting an event
  this.emit('select', {path: path, cursor: cursor});
  return cursor;
};

// TODO: if syncwrite wins: drop skipMerge, this._transaction etc.
// TODO: uniq'ing the log through path hashing
Baobab.prototype.stack = function(spec, skipMerge) {
  var self = this;

  if (!type.Object(spec))
    throw Error('Baobab.update: wrong specification.');

  if (!this.previousData)
    this.previousData = this.data;

  // Applying modifications
  if (this.options.syncwrite) {
    var result = update(this.data, spec, this.options);
    this.data = result.data;
    this.log = [].concat(this.log).concat(result.log);
  }
  else {
    this._transaction = (skipMerge && !Object.keys(this._transaction).length) ?
      spec :
      merge(this._transaction, spec);
  }

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

Baobab.prototype.commit = function() {

  if (this._future)
    this._future = clearTimeout(this._future);

  if (!this.options.syncwrite) {

    // Applying the asynchronous transaction
    var result = update(this.data, this._transaction, this.options);
    this.data = result.data;
    this.log = result.log;
  }

  // Resetting transaction
  this._transaction = {};

  // Validate?
  var validate = this.options.validate,
      behavior = this.options.validationBehavior;

  if (typeof validate === 'function') {
    var error = validate.call(this, this.previousData, this.data, this.log);

    if (error instanceof Error) {
      this.emit('invalid', {error: error});

      if (behavior === 'rollback') {
        this.data = this.previousData;
        return this;
      }
    }
  }

  // Baobab-level update event
  this.emit('update', {
    log: this.log,
    previousData: this.previousData,
    data: this.data
  });

  this.log = [];
  this.previousData = null;

  return this;
};

Baobab.prototype.release = function() {
  var k;

  delete this.data;
  delete this._transaction;

  // Releasing cursors
  for (k in this._cursors)
    this._cursors[k].release();
  delete this._cursors;

  // Releasing facets
  for (k in this.facets)
    this.facets[k].release();
  delete this.facets;

  // Killing event emitter
  this.kill();
};

/**
 * Output
 */
Baobab.prototype.toJSON = function() {
  return this.get();
};

Baobab.prototype.toString = function() {
  return this._identity;
};

/**
 * Export
 */
module.exports = Baobab;
