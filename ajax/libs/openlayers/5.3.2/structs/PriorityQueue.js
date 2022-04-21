/**
 * @module ol/structs/PriorityQueue
 */
import {assert} from '../asserts.js';
import {clear} from '../obj.js';


/**
 * @type {number}
 */
export var DROP = Infinity;


/**
 * @classdesc
 * Priority queue.
 *
 * The implementation is inspired from the Closure Library's Heap class and
 * Python's heapq module.
 *
 * See http://closure-library.googlecode.com/svn/docs/closure_goog_structs_heap.js.source.html
 * and http://hg.python.org/cpython/file/2.7/Lib/heapq.py.
 *
 * @template T
 */
var PriorityQueue = function PriorityQueue(priorityFunction, keyFunction) {

  /**
   * @type {function(T): number}
   * @private
   */
  this.priorityFunction_ = priorityFunction;

  /**
   * @type {function(T): string}
   * @private
   */
  this.keyFunction_ = keyFunction;

  /**
   * @type {Array<T>}
   * @private
   */
  this.elements_ = [];

  /**
   * @type {Array<number>}
   * @private
   */
  this.priorities_ = [];

  /**
   * @type {!Object<string, boolean>}
   * @private
   */
  this.queuedElements_ = {};

};

/**
 * FIXME empty description for jsdoc
 */
PriorityQueue.prototype.clear = function clear$1 () {
  this.elements_.length = 0;
  this.priorities_.length = 0;
  clear(this.queuedElements_);
};


/**
 * Remove and return the highest-priority element. O(log N).
 * @return {T} Element.
 */
PriorityQueue.prototype.dequeue = function dequeue () {
  var elements = this.elements_;
  var priorities = this.priorities_;
  var element = elements[0];
  if (elements.length == 1) {
    elements.length = 0;
    priorities.length = 0;
  } else {
    elements[0] = elements.pop();
    priorities[0] = priorities.pop();
    this.siftUp_(0);
  }
  var elementKey = this.keyFunction_(element);
  delete this.queuedElements_[elementKey];
  return element;
};


/**
 * Enqueue an element. O(log N).
 * @param {T} element Element.
 * @return {boolean} The element was added to the queue.
 */
PriorityQueue.prototype.enqueue = function enqueue (element) {
  assert(!(this.keyFunction_(element) in this.queuedElements_),
    31); // Tried to enqueue an `element` that was already added to the queue
  var priority = this.priorityFunction_(element);
  if (priority != DROP) {
    this.elements_.push(element);
    this.priorities_.push(priority);
    this.queuedElements_[this.keyFunction_(element)] = true;
    this.siftDown_(0, this.elements_.length - 1);
    return true;
  }
  return false;
};


/**
 * @return {number} Count.
 */
PriorityQueue.prototype.getCount = function getCount () {
  return this.elements_.length;
};


/**
 * Gets the index of the left child of the node at the given index.
 * @param {number} index The index of the node to get the left child for.
 * @return {number} The index of the left child.
 * @private
 */
PriorityQueue.prototype.getLeftChildIndex_ = function getLeftChildIndex_ (index) {
  return index * 2 + 1;
};


/**
 * Gets the index of the right child of the node at the given index.
 * @param {number} index The index of the node to get the right child for.
 * @return {number} The index of the right child.
 * @private
 */
PriorityQueue.prototype.getRightChildIndex_ = function getRightChildIndex_ (index) {
  return index * 2 + 2;
};


/**
 * Gets the index of the parent of the node at the given index.
 * @param {number} index The index of the node to get the parent for.
 * @return {number} The index of the parent.
 * @private
 */
PriorityQueue.prototype.getParentIndex_ = function getParentIndex_ (index) {
  return (index - 1) >> 1;
};


/**
 * Make this a heap. O(N).
 * @private
 */
PriorityQueue.prototype.heapify_ = function heapify_ () {
  var i;
  for (i = (this.elements_.length >> 1) - 1; i >= 0; i--) {
    this.siftUp_(i);
  }
};


/**
 * @return {boolean} Is empty.
 */
PriorityQueue.prototype.isEmpty = function isEmpty () {
  return this.elements_.length === 0;
};


/**
 * @param {string} key Key.
 * @return {boolean} Is key queued.
 */
PriorityQueue.prototype.isKeyQueued = function isKeyQueued (key) {
  return key in this.queuedElements_;
};


/**
 * @param {T} element Element.
 * @return {boolean} Is queued.
 */
PriorityQueue.prototype.isQueued = function isQueued (element) {
  return this.isKeyQueued(this.keyFunction_(element));
};


/**
 * @param {number} index The index of the node to move down.
 * @private
 */
PriorityQueue.prototype.siftUp_ = function siftUp_ (index) {
  var elements = this.elements_;
  var priorities = this.priorities_;
  var count = elements.length;
  var element = elements[index];
  var priority = priorities[index];
  var startIndex = index;

  while (index < (count >> 1)) {
    var lIndex = this.getLeftChildIndex_(index);
    var rIndex = this.getRightChildIndex_(index);

    var smallerChildIndex = rIndex < count &&
        priorities[rIndex] < priorities[lIndex] ?
      rIndex : lIndex;

    elements[index] = elements[smallerChildIndex];
    priorities[index] = priorities[smallerChildIndex];
    index = smallerChildIndex;
  }

  elements[index] = element;
  priorities[index] = priority;
  this.siftDown_(startIndex, index);
};


/**
 * @param {number} startIndex The index of the root.
 * @param {number} index The index of the node to move up.
 * @private
 */
PriorityQueue.prototype.siftDown_ = function siftDown_ (startIndex, index) {
  var elements = this.elements_;
  var priorities = this.priorities_;
  var element = elements[index];
  var priority = priorities[index];

  while (index > startIndex) {
    var parentIndex = this.getParentIndex_(index);
    if (priorities[parentIndex] > priority) {
      elements[index] = elements[parentIndex];
      priorities[index] = priorities[parentIndex];
      index = parentIndex;
    } else {
      break;
    }
  }
  elements[index] = element;
  priorities[index] = priority;
};


/**
 * FIXME empty description for jsdoc
 */
PriorityQueue.prototype.reprioritize = function reprioritize () {
  var priorityFunction = this.priorityFunction_;
  var elements = this.elements_;
  var priorities = this.priorities_;
  var index = 0;
  var n = elements.length;
  var element, i, priority;
  for (i = 0; i < n; ++i) {
    element = elements[i];
    priority = priorityFunction(element);
    if (priority == DROP) {
      delete this.queuedElements_[this.keyFunction_(element)];
    } else {
      priorities[index] = priority;
      elements[index++] = element;
    }
  }
  elements.length = index;
  priorities.length = index;
  this.heapify_();
};


export default PriorityQueue;

//# sourceMappingURL=PriorityQueue.js.map