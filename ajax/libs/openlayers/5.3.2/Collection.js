/**
 * @module ol/Collection
 */
import AssertionError from './AssertionError.js';
import CollectionEventType from './CollectionEventType.js';
import BaseObject from './Object.js';
import Event from './events/Event.js';


/**
 * @enum {string}
 * @private
 */
var Property = {
  LENGTH: 'length'
};


/**
 * @classdesc
 * Events emitted by {@link module:ol/Collection~Collection} instances are instances of this
 * type.
 */
export var CollectionEvent = /*@__PURE__*/(function (Event) {
  function CollectionEvent(type, opt_element) {
    Event.call(this, type);

    /**
     * The element that is added to or removed from the collection.
     * @type {*}
     * @api
     */
    this.element = opt_element;

  }

  if ( Event ) CollectionEvent.__proto__ = Event;
  CollectionEvent.prototype = Object.create( Event && Event.prototype );
  CollectionEvent.prototype.constructor = CollectionEvent;

  return CollectionEvent;
}(Event));


/**
 * @typedef {Object} Options
 * @property {boolean} [unique=false] Disallow the same item from being added to
 * the collection twice.
 */

/**
 * @classdesc
 * An expanded version of standard JS Array, adding convenience methods for
 * manipulation. Add and remove changes to the Collection trigger a Collection
 * event. Note that this does not cover changes to the objects _within_ the
 * Collection; they trigger events on the appropriate object, not on the
 * Collection as a whole.
 *
 * @fires CollectionEvent
 *
 * @template T
 * @api
 */
var Collection = /*@__PURE__*/(function (BaseObject) {
  function Collection(opt_array, opt_options) {

    BaseObject.call(this);

    var options = opt_options || {};

    /**
     * @private
     * @type {boolean}
     */
    this.unique_ = !!options.unique;

    /**
     * @private
     * @type {!Array<T>}
     */
    this.array_ = opt_array ? opt_array : [];

    if (this.unique_) {
      for (var i = 0, ii = this.array_.length; i < ii; ++i) {
        this.assertUnique_(this.array_[i], i);
      }
    }

    this.updateLength_();

  }

  if ( BaseObject ) Collection.__proto__ = BaseObject;
  Collection.prototype = Object.create( BaseObject && BaseObject.prototype );
  Collection.prototype.constructor = Collection;

  /**
   * Remove all elements from the collection.
   * @api
   */
  Collection.prototype.clear = function clear () {
    while (this.getLength() > 0) {
      this.pop();
    }
  };

  /**
   * Add elements to the collection.  This pushes each item in the provided array
   * to the end of the collection.
   * @param {!Array<T>} arr Array.
   * @return {Collection<T>} This collection.
   * @api
   */
  Collection.prototype.extend = function extend (arr) {
    for (var i = 0, ii = arr.length; i < ii; ++i) {
      this.push(arr[i]);
    }
    return this;
  };

  /**
   * Iterate over each element, calling the provided callback.
   * @param {function(T, number, Array<T>): *} f The function to call
   *     for every element. This function takes 3 arguments (the element, the
   *     index and the array). The return value is ignored.
   * @api
   */
  Collection.prototype.forEach = function forEach (f) {
    var array = this.array_;
    for (var i = 0, ii = array.length; i < ii; ++i) {
      f(array[i], i, array);
    }
  };

  /**
   * Get a reference to the underlying Array object. Warning: if the array
   * is mutated, no events will be dispatched by the collection, and the
   * collection's "length" property won't be in sync with the actual length
   * of the array.
   * @return {!Array<T>} Array.
   * @api
   */
  Collection.prototype.getArray = function getArray () {
    return this.array_;
  };

  /**
   * Get the element at the provided index.
   * @param {number} index Index.
   * @return {T} Element.
   * @api
   */
  Collection.prototype.item = function item (index) {
    return this.array_[index];
  };

  /**
   * Get the length of this collection.
   * @return {number} The length of the array.
   * @observable
   * @api
   */
  Collection.prototype.getLength = function getLength () {
    return this.get(Property.LENGTH);
  };

  /**
   * Insert an element at the provided index.
   * @param {number} index Index.
   * @param {T} elem Element.
   * @api
   */
  Collection.prototype.insertAt = function insertAt (index, elem) {
    if (this.unique_) {
      this.assertUnique_(elem);
    }
    this.array_.splice(index, 0, elem);
    this.updateLength_();
    this.dispatchEvent(
      new CollectionEvent(CollectionEventType.ADD, elem));
  };

  /**
   * Remove the last element of the collection and return it.
   * Return `undefined` if the collection is empty.
   * @return {T|undefined} Element.
   * @api
   */
  Collection.prototype.pop = function pop () {
    return this.removeAt(this.getLength() - 1);
  };

  /**
   * Insert the provided element at the end of the collection.
   * @param {T} elem Element.
   * @return {number} New length of the collection.
   * @api
   */
  Collection.prototype.push = function push (elem) {
    if (this.unique_) {
      this.assertUnique_(elem);
    }
    var n = this.getLength();
    this.insertAt(n, elem);
    return this.getLength();
  };

  /**
   * Remove the first occurrence of an element from the collection.
   * @param {T} elem Element.
   * @return {T|undefined} The removed element or undefined if none found.
   * @api
   */
  Collection.prototype.remove = function remove (elem) {
    var arr = this.array_;
    for (var i = 0, ii = arr.length; i < ii; ++i) {
      if (arr[i] === elem) {
        return this.removeAt(i);
      }
    }
    return undefined;
  };

  /**
   * Remove the element at the provided index and return it.
   * Return `undefined` if the collection does not contain this index.
   * @param {number} index Index.
   * @return {T|undefined} Value.
   * @api
   */
  Collection.prototype.removeAt = function removeAt (index) {
    var prev = this.array_[index];
    this.array_.splice(index, 1);
    this.updateLength_();
    this.dispatchEvent(new CollectionEvent(CollectionEventType.REMOVE, prev));
    return prev;
  };

  /**
   * Set the element at the provided index.
   * @param {number} index Index.
   * @param {T} elem Element.
   * @api
   */
  Collection.prototype.setAt = function setAt (index, elem) {
    var n = this.getLength();
    if (index < n) {
      if (this.unique_) {
        this.assertUnique_(elem, index);
      }
      var prev = this.array_[index];
      this.array_[index] = elem;
      this.dispatchEvent(
        new CollectionEvent(CollectionEventType.REMOVE, prev));
      this.dispatchEvent(
        new CollectionEvent(CollectionEventType.ADD, elem));
    } else {
      for (var j = n; j < index; ++j) {
        this.insertAt(j, undefined);
      }
      this.insertAt(index, elem);
    }
  };

  /**
   * @private
   */
  Collection.prototype.updateLength_ = function updateLength_ () {
    this.set(Property.LENGTH, this.array_.length);
  };

  /**
   * @private
   * @param {T} elem Element.
   * @param {number=} opt_except Optional index to ignore.
   */
  Collection.prototype.assertUnique_ = function assertUnique_ (elem, opt_except) {
    for (var i = 0, ii = this.array_.length; i < ii; ++i) {
      if (this.array_[i] === elem && i !== opt_except) {
        throw new AssertionError(58);
      }
    }
  };

  return Collection;
}(BaseObject));


export default Collection;

//# sourceMappingURL=Collection.js.map