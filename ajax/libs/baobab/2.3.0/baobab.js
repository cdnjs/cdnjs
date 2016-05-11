/**
 * Baobab Data Structure
 * ======================
 *
 * A handy data tree with cursors.
 */
import Emitter from 'emmett';
import Cursor from './cursor';
import {MonkeyDefinition, Monkey} from './monkey';
import Watcher from './watcher';
import type from './type';
import update from './update';
import * as helpers from './helpers';

const {
  arrayFrom,
  coercePath,
  deepFreeze,
  getIn,
  makeError,
  deepMerge,
  shallowClone,
  shallowMerge,
  uniqid
} = helpers;

/**
 * Baobab defaults
 */
const DEFAULTS = {

  // Should the tree handle its transactions on its own?
  autoCommit: true,

  // Should the transactions be handled asynchronously?
  asynchronous: true,

  // Should the tree's data be immutable?
  immutable: true,

  // Should the monkeys be lazy?
  lazyMonkeys: true,

  // Should the tree be persistent?
  persistent: true,

  // Should the tree's update be pure?
  pure: true,

  // Validation specifications
  validate: null,

  // Validation behavior 'rollback' or 'notify'
  validationBehavior: 'rollback'
};

/**
 * Function returning a string hash from a non-dynamic path expressed as an
 * array.
 *
 * @param  {array}  path - The path to hash.
 * @return {string} string - The resultant hash.
 */
function hashPath(path) {
  return 'λ' + path.map(step => {
    if (type.function(step) || type.object(step))
      return `#${uniqid()}#`;

    return step;
  }).join('λ');
}

/**
 * Baobab class
 *
 * @constructor
 * @param {object|array} [initialData={}]    - Initial data passed to the tree.
 * @param {object}       [opts]              - Optional options.
 * @param {boolean}      [opts.autoCommit]   - Should the tree auto-commit?
 * @param {boolean}      [opts.asynchronous] - Should the tree's transactions
 *                                             handled asynchronously?
 * @param {boolean}      [opts.immutable]    - Should the tree be immutable?
 * @param {boolean}      [opts.persistent]   - Should the tree be persistent?
 * @param {boolean}      [opts.pure]         - Should the tree be pure?
 * @param {function}     [opts.validate]     - Validation function.
 * @param {string}       [opts.validationBehaviour] - "rollback" or "notify".
 */
export default class Baobab extends Emitter {
  constructor(initialData, opts) {
    super();

    // Setting initialData to an empty object if no data is provided by use
    if (arguments.length < 1)
      initialData = {};

    // Checking whether given initial data is valid
    if (!type.object(initialData) && !type.array(initialData))
      throw makeError('Baobab: invalid data.', {data: initialData});

    // Merging given options with defaults
    this.options = shallowMerge({}, DEFAULTS, opts);

    // Disabling immutability & persistence if persistence if disabled
    if (!this.options.persistent) {
      this.options.immutable = false;
      this.options.pure = false;
    }

    // Privates
    this._identity = '[object Baobab]';
    this._cursors = {};
    this._future = null;
    this._transaction = [];
    this._affectedPathsIndex = {};
    this._monkeys = {};
    this._previousData = null;
    this._data = initialData;

    // Properties
    this.root = new Cursor(this, [], 'λ');
    delete this.root.release;

    // Does the user want an immutable tree?
    if (this.options.immutable)
      deepFreeze(this._data);

    // Bootstrapping root cursor's getters and setters
    const bootstrap = (name) => {
      this[name] = function() {
        const r = this.root[name].apply(this.root, arguments);
        return r instanceof Cursor ? this : r;
      };
    };

    [
      'apply',
      'clone',
      'concat',
      'deepClone',
      'deepMerge',
      'exists',
      'get',
      'push',
      'merge',
      'pop',
      'project',
      'serialize',
      'set',
      'shift',
      'splice',
      'unset',
      'unshift'
    ].forEach(bootstrap);

    // Registering the initial monkeys
    this._refreshMonkeys();

    // Initial validation
    const validationError = this.validate();

    if (validationError)
      throw Error('Baobab: invalid data.', {error: validationError});
  }

  /**
   * Internal method used to refresh the tree's monkey register on every
   * update.
   * Note 1) For the time being, placing monkeys beneath array nodes is not
   * allowed for performance reasons.
   *
   * @param  {mixed}   node      - The starting node.
   * @param  {array}   path      - The starting node's path.
   * @param  {string}  operation - The operation that lead to a refreshment.
   * @return {Baobab}            - The tree instance for chaining purposes.
   */
  _refreshMonkeys(node, path, operation) {

    const clean = (data, p = []) => {
      if (data instanceof Monkey) {
        data.release();
        update(this._monkeys, p, {type: 'unset'}, {
          immutable: false,
          persistent: false,
          pure: false
        });

        return;
      }

      if (type.object(data)) {
        for (const k in data)
          clean(data[k], p.concat(k));
      }
    };

    const register = [];

    const walk = (data, p = []) => {

      // Should we sit a monkey in the tree?
      if (data instanceof MonkeyDefinition ||
          data instanceof Monkey) {
        const monkeyInstance = new Monkey(
          this,
          p,
          data instanceof Monkey ? data.definition : data
        );

        register.push(monkeyInstance);

        update(this._monkeys, p, {type: 'set', value: monkeyInstance}, {
          immutable: false,
          persistent: false,
          pure: false
        });

        return;
      }

      // Object iteration
      if (type.object(data)) {
        for (const k in data)
          walk(data[k], p.concat(k));
      }
    };

    // Walking the whole tree
    if (!arguments.length) {
      walk(this._data);
      register.forEach(m => m.checkRecursivity());
    }
    else {
      const monkeysNode = getIn(this._monkeys, path).data;

      // Is this required that we clean some already existing monkeys?
      if (monkeysNode)
        clean(monkeysNode, path);

      // Let's walk the tree only from the updated point
      if (operation !== 'unset') {
        walk(node, path);
        register.forEach(m => m.checkRecursivity());
      }
    }

    return this;
  }

  /**
   * Method used to validate the tree's data.
   *
   * @return {boolean} - Is the tree valid?
   */
  validate(affectedPaths) {
    const {validate, validationBehavior: behavior} = this.options;

    if (typeof validate !== 'function')
      return null;

    const error = validate.call(
      this,
      this._previousData,
      this._data,
      affectedPaths || [[]]
    );

    if (error instanceof Error) {

      if (behavior === 'rollback') {
        this._data = this._previousData;
        this._affectedPathsIndex = {};
        this._transaction = [];
        this._previousData = this._data;
      }

      this.emit('invalid', {error});

      return error;
    }

    return null;
  }

  /**
   * Method used to select data within the tree by creating a cursor. Cursors
   * are kept as singletons by the tree for performance and hygiene reasons.
   *
   * Arity (1):
   * @param {path}    path - Path to select in the tree.
   *
   * Arity (*):
   * @param {...step} path - Path to select in the tree.
   *
   * @return {Cursor}      - The resultant cursor.
   */
  select(path) {

    // If no path is given, we simply return the root
    path = path || [];

    // Variadic
    if (arguments.length > 1)
      path = arrayFrom(arguments);

    // Checking that given path is valid
    if (!type.path(path))
      throw makeError('Baobab.select: invalid path.', {path});

    // Casting to array
    path = [].concat(path);

    // Computing hash (done here because it would be too late to do it in the
    // cursor's constructor since we need to hit the cursors' index first).
    const hash = hashPath(path);

    // Creating a new cursor or returning the already existing one for the
    // requested path.
    let cursor = this._cursors[hash];

    if (!cursor) {
      cursor = new Cursor(this, path, hash);
      this._cursors[hash] = cursor;
    }

    // Emitting an event to notify that a part of the tree was selected
    this.emit('select', {path, cursor});
    return cursor;
  }

  /**
   * Method used to update the tree. Updates are simply expressed by a path,
   * dynamic or not, and an operation.
   *
   * This is where path solving should happen and not in the cursor.
   *
   * @param  {path}   path      - The path where we'll apply the operation.
   * @param  {object} operation - The operation to apply.
   * @return {mixed} - Return the result of the update.
   */
  update(path, operation) {

    // Coercing path
    path = coercePath(path);

    if (!type.operationType(operation.type))
      throw makeError(
        `Baobab.update: unknown operation type "${operation.type}".`,
        {operation: operation}
      );

    // Solving the given path
    const {solvedPath, exists} = getIn(
      this._data,
      path
    );

    // If we couldn't solve the path, we throw
    if (!solvedPath)
      throw makeError('Baobab.update: could not solve the given path.', {
        path: solvedPath
      });

    // Read-only path?
    const monkeyPath = type.monkeyPath(this._monkeys, solvedPath);
    if (monkeyPath && solvedPath.length > monkeyPath.length)
      throw makeError('Baobab.update: attempting to update a read-only path.', {
        path: solvedPath
      });

    // We don't unset irrelevant paths
    if (operation.type === 'unset' && !exists)
      return;

    // If we merge data, we need to acknowledge monkeys
    let realOperation = operation;
    if (/merge/.test(operation.type)) {
      const monkeysNode = getIn(this._monkeys, solvedPath).data;

      if (type.object(monkeysNode)) {
        realOperation = shallowClone(realOperation);

        if (/deep/.test(realOperation.type))
          realOperation.value = deepMerge({}, monkeysNode, realOperation.value);
        else
          realOperation.value = shallowMerge({}, monkeysNode, realOperation.value);
      }
    }

    // Stashing previous data if this is the frame's first update
    if (!this._transaction.length)
      this._previousData = this._data;

    // Applying the operation
    const result = update(
      this._data,
      solvedPath,
      realOperation,
      this.options
    );

    const {data, node} = result;

    // If because of purity, the update was moot, we stop here
    if (!('data' in result))
      return node;

    // If the operation is push, the affected path is slightly different
    const affectedPath = solvedPath.concat(
      operation.type === 'push' ? node.length - 1 : []
    );

    const hash = hashPath(affectedPath);

    // Updating data and transaction
    this._data = data;
    this._affectedPathsIndex[hash] = true;
    this._transaction.push(shallowMerge({}, operation, {path: affectedPath}));

    // Updating the monkeys
    this._refreshMonkeys(node, solvedPath, operation.type);

    // Emitting a `write` event
    this.emit('write', {path: affectedPath});

    // Should we let the user commit?
    if (!this.options.autoCommit)
      return node;

    // Should we update asynchronously?
    if (!this.options.asynchronous) {
      this.commit();
      return node;
    }

    // Updating asynchronously
    if (!this._future)
      this._future = setTimeout(() => this.commit(), 0);

    // Finally returning the affected node
    return node;
  }

  /**
   * Method committing the updates of the tree and firing the tree's events.
   *
   * @return {Baobab} - The tree instance for chaining purposes.
   */
  commit() {

    // Do not fire update if the transaction is empty
    if (!this._transaction.length)
      return this;

    // Clearing timeout if one was defined
    if (this._future)
      this._future = clearTimeout(this._future);

    const affectedPaths = Object.keys(this._affectedPathsIndex).map(h => {
      return h !== 'λ' ?
        h.split('λ').slice(1) :
        [];
    });

    // Is the tree still valid?
    const validationError = this.validate(affectedPaths);

    if (validationError)
      return this;

    // Caching to keep original references before we change them
    const transaction = this._transaction,
          previousData = this._previousData;

    this._affectedPathsIndex = {};
    this._transaction = [];
    this._previousData = this._data;

    // Emitting update event
    this.emit('update', {
      paths: affectedPaths,
      currentData: this._data,
      transaction,
      previousData
    });

    return this;
  }

  /**
   * Method used to watch a collection of paths within the tree. Very useful
   * to bind UI components and such to the tree.
   *
   * @param  {object} mapping - Mapping of paths to listen.
   * @return {Cursor}         - The created watcher.
   */
  watch(mapping) {
    return new Watcher(this, mapping);
  }

  /**
   * Method releasing the tree and its attached data from memory.
   */
  release() {
    let k;

    this.emit('release');

    delete this.root;

    delete this._data;
    delete this._previousData;
    delete this._transaction;
    delete this._affectedPathsIndex;
    delete this._monkeys;

    // Releasing cursors
    for (k in this._cursors)
      this._cursors[k].release();
    delete this._cursors;

    // Killing event emitter
    this.kill();
  }

  /**
   * Overriding the `toJSON` method for convenient use with JSON.stringify.
   *
   * @return {mixed} - Data at cursor.
   */
  toJSON() {
    return this.serialize();
  }

  /**
   * Overriding the `toString` method for debugging purposes.
   *
   * @return {string} - The baobab's identity.
   */
  toString() {
    return this._identity;
  }
}

/**
 * Monkey helper.
 */
Baobab.monkey = function(...args) {

  if (!args.length)
    throw new Error('Baobab.monkey: missing definition.');

  if (args.length === 1 && typeof args[0] !== 'function')
    return new MonkeyDefinition(args[0]);

  return new MonkeyDefinition(args);
};
Baobab.dynamicNode = Baobab.monkey;

/**
 * Exposing some internals for convenience
 */
Baobab.Cursor = Cursor;
Baobab.MonkeyDefinition = MonkeyDefinition;
Baobab.Monkey = Monkey;
Baobab.type = type;
Baobab.helpers = helpers;

/**
 * Version
 */
Baobab.VERSION = '2.3.0';
