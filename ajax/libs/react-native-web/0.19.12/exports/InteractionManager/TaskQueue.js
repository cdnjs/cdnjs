import _objectSpread from "@babel/runtime/helpers/objectSpread2";
/**
 * Copyright (c) Nicolas Gallagher.
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

import invariant from 'fbjs/lib/invariant';
class TaskQueue {
  constructor(_ref) {
    var onMoreTasks = _ref.onMoreTasks;
    this._onMoreTasks = onMoreTasks;
    this._queueStack = [{
      tasks: [],
      popable: true
    }];
  }
  enqueue(task) {
    this._getCurrentQueue().push(task);
  }
  enqueueTasks(tasks) {
    tasks.forEach(task => this.enqueue(task));
  }
  cancelTasks(tasksToCancel) {
    this._queueStack = this._queueStack.map(queue => _objectSpread(_objectSpread({}, queue), {}, {
      tasks: queue.tasks.filter(task => tasksToCancel.indexOf(task) === -1)
    })).filter((queue, idx) => queue.tasks.length > 0 || idx === 0);
  }
  hasTasksToProcess() {
    return this._getCurrentQueue().length > 0;
  }

  /**
   * Executes the next task in the queue.
   */
  processNext() {
    var queue = this._getCurrentQueue();
    if (queue.length) {
      var task = queue.shift();
      try {
        if (typeof task === 'object' && task.gen) {
          this._genPromise(task);
        } else if (typeof task === 'object' && task.run) {
          task.run();
        } else {
          invariant(typeof task === 'function', 'Expected Function, SimpleTask, or PromiseTask, but got:\n' + JSON.stringify(task, null, 2));
          task();
        }
      } catch (e) {
        e.message = 'TaskQueue: Error with task ' + (task.name || '') + ': ' + e.message;
        throw e;
      }
    }
  }
  _getCurrentQueue() {
    var stackIdx = this._queueStack.length - 1;
    var queue = this._queueStack[stackIdx];
    if (queue.popable && queue.tasks.length === 0 && stackIdx > 0) {
      this._queueStack.pop();
      return this._getCurrentQueue();
    } else {
      return queue.tasks;
    }
  }
  _genPromise(task) {
    var length = this._queueStack.push({
      tasks: [],
      popable: false
    });
    var stackIdx = length - 1;
    var stackItem = this._queueStack[stackIdx];
    task.gen().then(() => {
      stackItem.popable = true;
      this.hasTasksToProcess() && this._onMoreTasks();
    }).catch(ex => {
      setTimeout(() => {
        ex.message = "TaskQueue: Error resolving Promise in task " + task.name + ": " + ex.message;
        throw ex;
      }, 0);
    });
  }
}
export default TaskQueue;