"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
exports.__esModule = true;
exports.default = void 0;
var _invariant = _interopRequireDefault(require("fbjs/lib/invariant"));
var _TaskQueue = _interopRequireDefault(require("./TaskQueue"));
var _EventEmitter = _interopRequireDefault(require("../../vendor/react-native/vendor/emitter/EventEmitter"));
var _requestIdleCallback = _interopRequireDefault(require("../../modules/requestIdleCallback"));
/**
 * Copyright (c) Nicolas Gallagher.
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

var _emitter = new _EventEmitter.default();
var InteractionManager = {
  Events: {
    interactionStart: 'interactionStart',
    interactionComplete: 'interactionComplete'
  },
  /**
   * Schedule a function to run after all interactions have completed.
   */
  runAfterInteractions(task) {
    var tasks = [];
    var promise = new Promise(resolve => {
      _scheduleUpdate();
      if (task) {
        tasks.push(task);
      }
      tasks.push({
        run: resolve,
        name: 'resolve ' + (task && task.name || '?')
      });
      _taskQueue.enqueueTasks(tasks);
    });
    return {
      then: promise.then.bind(promise),
      done: promise.then.bind(promise),
      cancel: () => {
        _taskQueue.cancelTasks(tasks);
      }
    };
  },
  /**
   * Notify manager that an interaction has started.
   */
  createInteractionHandle() {
    _scheduleUpdate();
    var handle = ++_inc;
    _addInteractionSet.add(handle);
    return handle;
  },
  /**
   * Notify manager that an interaction has completed.
   */
  clearInteractionHandle(handle) {
    (0, _invariant.default)(!!handle, 'Must provide a handle to clear.');
    _scheduleUpdate();
    _addInteractionSet.delete(handle);
    _deleteInteractionSet.add(handle);
  },
  addListener: _emitter.addListener.bind(_emitter),
  /**
   *
   * @param deadline
   */
  setDeadline(deadline) {
    _deadline = deadline;
  }
};
var _interactionSet = new Set();
var _addInteractionSet = new Set();
var _deleteInteractionSet = new Set();
var _taskQueue = new _TaskQueue.default({
  onMoreTasks: _scheduleUpdate
});
var _nextUpdateHandle = 0;
var _inc = 0;
var _deadline = -1;

/**
 * Schedule an asynchronous update to the interaction state.
 */
function _scheduleUpdate() {
  if (!_nextUpdateHandle) {
    if (_deadline > 0) {
      _nextUpdateHandle = setTimeout(_processUpdate);
    } else {
      _nextUpdateHandle = (0, _requestIdleCallback.default)(_processUpdate);
    }
  }
}

/**
 * Notify listeners, process queue, etc
 */
function _processUpdate() {
  _nextUpdateHandle = 0;
  var interactionCount = _interactionSet.size;
  _addInteractionSet.forEach(handle => _interactionSet.add(handle));
  _deleteInteractionSet.forEach(handle => _interactionSet.delete(handle));
  var nextInteractionCount = _interactionSet.size;
  if (interactionCount !== 0 && nextInteractionCount === 0) {
    _emitter.emit(InteractionManager.Events.interactionComplete);
  } else if (interactionCount === 0 && nextInteractionCount !== 0) {
    _emitter.emit(InteractionManager.Events.interactionStart);
  }
  if (nextInteractionCount === 0) {
    // It seems that we can't know the running time of the current event loop,
    // we can only calculate the running time of the current task queue.
    var begin = Date.now();
    while (_taskQueue.hasTasksToProcess()) {
      _taskQueue.processNext();
      if (_deadline > 0 && Date.now() - begin >= _deadline) {
        _scheduleUpdate();
        break;
      }
    }
  }
  _addInteractionSet.clear();
  _deleteInteractionSet.clear();
}
var _default = InteractionManager;
exports.default = _default;
module.exports = exports.default;