(function(exports) {

/**
 * Mini logger
 *
 * @return {Function}
 */
var debug = 0 ? console.log.bind(console, '[fastdom-sandbox]') : function() {};

/**
 * Exports
 */

/**
 * Create a new `Sandbox`.
 *
 * Scheduling tasks via a sandbox is
 * useful because you can clear all
 * sandboxed tasks in one go.
 *
 * This is handy when working with view
 * components. You can create one sandbox
 * per component and call `.clear()` when
 * tearing down.
 *
 * @example
 *
 * var sandbox = fastdom.sandbox();
 *
 * sandbox.measure(function() { console.log(1); });
 * sandbox.measure(function() { console.log(2); });
 *
 * fastdom.measure(function() { console.log(3); });
 * fastdom.measure(function() { console.log(4); });
 *
 * sandbox.clear();
 *
 * // => 3
 * // => 4
 *
 * @return {Sandbox}
 * @public
 */
exports.sandbox = function() {
  return new Sandbox(this.fastdom);
};

/**
 * Initialize a new `Sandbox`
 *
 * @param {FastDom} fastdom
 */

function Sandbox(fastdom) {
  this.fastdom = fastdom;
  this.tasks = [];
  debug('initialized');
}

/**
 * Schedule a 'measure' task.
 *
 * @param  {Function} fn
 * @param  {Object}   ctx
 * @return {Object} can be passed to .clear()
 */
Sandbox.prototype.measure = function(fn, ctx) {
  var tasks = this.tasks;
  var task = this.fastdom.measure(function() {
    tasks.splice(tasks.indexOf(task));
    return fn.call(ctx);
  });

  tasks.push(task);
  return task;
};

/**
 * Schedule a 'mutate' task.
 *
 * @param  {Function} fn
 * @param  {Object}   ctx
 * @return {Object} can be passed to .clear()
 */
Sandbox.prototype.mutate = function(fn, ctx) {
  var tasks = this.tasks;
  var task = this.fastdom.mutate(function() {
    tasks.splice(tasks.indexOf(task));
    return fn.call(ctx);
  });

  this.tasks.push(task);
  return task;
};

/**
 * Clear a single task or is no task is
 * passsed, all tasks in the `Sandbox`.
 *
 * @param  {Object} task (optional)
 */

Sandbox.prototype.clear = function(task) {
  if (!arguments.length) clearAll(this.fastdom, this.tasks);
  remove(this.tasks, task);
  return this.fastdom.clear(task);
};

/**
 * Clears all the given tasks from
 * the given `FastDom`.
 *
 * @param  {FastDom} fastdom
 * @param  {Array} tasks
 * @private
 */

function clearAll(fastdom, tasks) {
  debug('clear all', fastdom, tasks);
  var i = tasks.length;
  while (i--) {
    fastdom.clear(tasks[i]);
    tasks.splice(i, 1);
  }
}

/**
 * Remove an item from an Array.
 *
 * @param  {Array} array
 * @param  {*} item
 * @return {Boolean}
 */
function remove(array, item) {
  var index = array.indexOf(item);
  return !!~index && !!array.splice(index, 1);
}

/**
 * Expose
 */

if ((typeof define)[0] == 'f') define(function() { return exports; });
else if ((typeof module)[0] == 'o') module.exports = exports;
else window.fastdomSandbox = exports;

})({});
