/**
 * Baobab Data Structure
 * ======================
 *
 * Encloses an immutable set of data exposing useful cursors to its user.
 */
var Immutable = require('immutable'),
    Cursor = require('./cursor.js'),
    EventEmitter = require('emmett'),
    helpers = require('./helpers.js'),
    update = require('./update.js'),
    types = require('./typology.js'),
    mixins = require('./mixins.js'),
    defaults = require('../defaults.json');

/**
 * Main Class
 */
function Baobab(initialData, opts) {

  // New keyword optional
  if (!(this instanceof Baobab))
    return new Baobab(initialData, opts);

  if (!types.check(initialData, 'maplike'))
    throw Error('Baobab: invalid data.');

  // Extending
  EventEmitter.call(this);

  // Properties
  this.data = Immutable.fromJS(initialData);

  // Privates
  this._futureUpdate = {};
  this._willUpdate = false;
  this._history = [];

  // Merging defaults
  this.options = Immutable.fromJS(defaults).merge(opts);

  // Mixin
  this.mixin = mixins.baobab(this);
}

helpers.inherits(Baobab, EventEmitter);

/**
 * Private prototype
 */
Baobab.prototype._stack = function(spec) {

  if (!types.check(spec, 'maplike'))
    throw Error('Baobab.update: wrong specification.');

  this._futureUpdate = helpers.merge(spec, this._futureUpdate);

  if (!this.options.get('delay'))
    return this._commit();

  if (!this._willUpdate) {
    this._willUpdate = true;
    helpers.later(this._commit.bind(this));
  }

  return this;
};

Baobab.prototype._commit = function() {
  var self = this;

  // Applying modification
  var result = update(this.data, this._futureUpdate);

  // Replacing data
  var oldData = this.data;
  this.data = result.data;

  // Baobab-level update event
  this.emit('update', {
    oldData: oldData,
    newData: this.data,
    log: result.log
  });

  // Resetting
  this._futureUpdate = {};
  this._willUpdate = false;

  return this;
};

/**
 * Prototype
 */
Baobab.prototype.select = function(path) {
  if (!path)
    throw Error('Baobab.select: invalid path.');

  if (arguments.length > 1)
    path = Array.prototype.slice.call(arguments);

  if (!types.check(path, 'path'))
    throw Error('Baobab.select: invalid path.');
  return new Cursor(this, path);
};

Baobab.prototype.get = function(path) {
  var data;

  if (arguments.length > 1)
    path = Array.prototype.slice.call(arguments);

  if (path)
    data = this.data.getIn(typeof path === 'string' ? [path] : path);
  else
    data = this.data;

  if (this.options.get('toJS'))
    return data.toJS();
  else
    return data;
};

Baobab.prototype.set = function(key, val) {

  if (arguments.length < 2)
    throw Error('Baobab.set: expects a key and a value.');

  var spec = {};
  spec[key] = {$set: val};

  return this.update(spec);
};

Baobab.prototype.update = function(spec) {
  return this._stack(spec);
};

/**
 * Output
 */
Baobab.prototype.toJS = function() {
  return this.data.toJS();
};
Baobab.prototype.toJSON = Baobab.prototype.toJS;
Baobab.prototype.toString = function() {
  return 'Baobab ' + this.data.toString().replace(/^[^{]+\{/, '{');
};
Baobab.prototype.inspect = Baobab.prototype.toString;
Baobab.prototype.toSource = Baobab.prototype.toString;

/**
 * Export
 */
module.exports = Baobab;
