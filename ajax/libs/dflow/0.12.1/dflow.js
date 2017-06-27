require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var builtinFunctions = require('./functions/builtin')
var commentRegex = require('./regex/comment')
var injectAdditionalFunctions = require('./inject/additionalFunctions')
var injectArguments = require('./inject/arguments')
var injectAccessors = require('./inject/accessors')
var injectDotOperators = require('./inject/dotOperators')
var injectGlobals = require('./inject/globals')
var injectNumbers = require('./inject/numbers')
var injectReferences = require('./inject/references')
var injectStrings = require('./inject/strings')
var inputArgs = require('./inputArgs')
var isDflowFun = require('./isDflowFun')
var level = require('./level')
var validate = require('./validate')

/**
 * Create a dflow function.
 *
 * @param {Object} graph to be executed
 * @param {Object} [additionalFunctions] is a collection of functions
 *
 * @returns {Function} dflowFun that executes the given graph.
 */

function fun (graph, additionalFunctions) {
  // First of all, check if graph is valid.
  try {
    validate(graph, additionalFunctions)
  } catch (err) {
    throw err
  }

  var func = graph.func || {}
  var pipe = graph.pipe
  var task = graph.task

  var cachedLevelOf = {}
  var computeLevelOf = level.bind(null, pipe, cachedLevelOf)
  var funcs = builtinFunctions

  // Inject compile-time builtin tasks.

  funcs['dflow.fun'] = fun
  funcs['dflow.isDflowFun'] = isDflowFun
  funcs['dflow.validate'] = validate

  injectAccessors(funcs, graph)
  injectAdditionalFunctions(funcs, additionalFunctions)
  injectDotOperators(funcs, task)
  injectGlobals(funcs, task)
  injectReferences(funcs, task)
  injectNumbers(funcs, task)
  injectStrings(funcs, task)

  /**
   * Compiles a sub graph.
   */

  function compileSubgraph (key) {
    var subGraph = graph.func[key]

    var funcName = '/' + key

    funcs[funcName] = fun(subGraph, additionalFunctions)
  }

  /**
   * Sorts tasks by their level.
   */

  function byLevel (a, b) {
    if (typeof cachedLevelOf[a] === 'undefined') {
      cachedLevelOf[a] = computeLevelOf(a)
    }

    if (typeof cachedLevelOf[b] === 'undefined') {
      cachedLevelOf[b] = computeLevelOf(b)
    }

    return cachedLevelOf[a] - cachedLevelOf[b]
  }

  // Compile each subgraph.
  Object.keys(func)
        .forEach(compileSubgraph)

  /**
   * Here we are, this is the ❤ of dflow.
   */

  function dflowFun () {
    var gotReturn = false
    var outs = {}
    var returnValue

    var inputArgsOf = inputArgs.bind(null, outs, pipe)

    // Inject run-time builtin tasks.

    funcs['this'] = function () { return dflowFun }
    funcs['this.graph'] = function () { return graph }
    injectArguments(funcs, task, arguments)

    /**
     * Execute task.
     */

    function run (taskKey) {
      var args = inputArgsOf(taskKey)
      var funcName = task[taskKey]
      var f = funcs[funcName]

      // Behave like a JavaScript function:
      // if found a return, skip all other tasks.
      if (gotReturn) {
        return
      }

      if ((funcName === 'return') && (!gotReturn)) {
        returnValue = args[0]
        gotReturn = true
        return
      }

      // If task is not defined, throw an error.
      if (typeof f === 'undefined') {
        throw new Error('Task ' + funcName + ' [' + taskKey + '] is not defined')
      }

      // Try to execute task.
      try {
        outs[taskKey] = f.apply(null, args)
      } catch (err) {
        throw err
      }
    }

    /**
     * Ignores comments.
     */

    function comments (key) {
      return !commentRegex.test(task[key])
    }

    // Run every graph task, sorted by level.
    Object.keys(task)
          .filter(comments)
          .sort(byLevel)
          .forEach(run)

    return returnValue
  }

  // Remember function was created from a dflow graph.
  dflowFun.graph = graph

  return dflowFun
}

module.exports = fun

},{"./functions/builtin":2,"./inject/accessors":4,"./inject/additionalFunctions":5,"./inject/arguments":6,"./inject/dotOperators":7,"./inject/globals":8,"./inject/numbers":9,"./inject/references":10,"./inject/strings":11,"./inputArgs":12,"./isDflowFun":14,"./level":15,"./regex/comment":19,"./validate":24}],2:[function(require,module,exports){
// Arithmetic operators

exports['+'] = function (a, b) { return a + b }

exports['*'] = function (a, b) { return a * b }

exports['-'] = function (a, b) { return a - b }

exports['/'] = function (a, b) { return a / b }

exports['%'] = function (a, b) { return a % b }

// Logical operators

exports['&&'] = function (a, b) { return a && b }

exports['||'] = function (a, b) { return a || b }

exports['!'] = function (a) { return !a }

// Comparison operators

exports['==='] = function (a, b) { return a === b }

exports['!=='] = function (a, b) { return a !== b }

exports['>'] = function (a, b) { return a > b }

exports['<'] = function (a, b) { return a < b }

exports['>='] = function (a, b) { return a >= b }

exports['<='] = function (a, b) { return a <= b }

// Other operators

exports.apply = function (fun, thisArg, argsArray) {
  return fun.apply(thisArg, argsArray)
}

exports['.'] = function (obj, prop) { return obj[prop] }

exports['typeof'] = function (a) { return typeof a }

exports['new'] = function () {
  var Obj = arguments[0]
  var arg1 = arguments[1]
  var arg2 = arguments[2]
  var arg3 = arguments[3]
  var arg4 = arguments[4]
  var arg5 = arguments[5]
  var argN = arguments.length - 1

  if (argN === 0) return new Obj()
  if (argN === 1) return new Obj(arg1)
  if (argN === 2) return new Obj(arg1, arg2)
  if (argN === 3) return new Obj(arg1, arg2, arg3)
  if (argN === 4) return new Obj(arg1, arg2, arg3, arg4)
  if (argN === 5) return new Obj(arg1, arg2, arg3, arg4, arg5)
  // If you have a constructor with more than 5 arguments ... think about refactoring or redesign it.
}

// Array

exports['[]'] = function () { return [] }

exports.indexOf = function (a, b) { return a.indexOf(b) }

exports.push = function (a, b) { return a.push(b) }

exports.pop = function (a, b) { return a.pop(b) }

// console

exports['console.error'] = console.error.bind(console)
exports['console.log'] = console.log.bind(console)

// Global

exports['Infinity'] = function () { return Infinity }

exports.NaN = function () { return NaN }

exports['null'] = function () { return null }

// Object

exports['{}'] = function () { return {} }

// Boolean

exports.false = function () { return false }

exports.true = function () { return true }

},{}],3:[function(require,module,exports){
exports.document = function () {
  return document
}

exports.body = function () {
  return document.body
}

exports.head = function () {
  return document.head
}

exports.window = function () {
  return window
}

exports.AudioContext = function () {
  return window.AudioContext || window.webkitAudioContext
}

exports.getElementById = function (id) {
  return window.document.getElementById(id)
}

exports.innerHTML = function (node, content) {
  node.innerHTML = content

  return node
}

},{}],4:[function(require,module,exports){
var accessorRegex = require('../regex/accessor')

/**
 * Inject functions to set or get context keywords.
 *
 * @api private
 *
 * @param {Object} funcs reference
 * @param {Object} graph
 */

function injectAccessors (funcs, graph) {
  if (typeof graph.data === 'undefined') {
    graph.data = {}
  }

  /**
   * Inject accessor.
   *
   * @api private
   */

  function inject (taskKey) {
    var accessorName = null
    var taskName = graph.task[taskKey]

    /**
     * Accessor-like function.
     *
     * @api private
     */

    function accessor () {
      if (arguments.length === 1) {
        graph.data[accessorName] = arguments[0]
      }

      return graph.data[accessorName]
    }

    if (accessorRegex.test(taskName)) {
      accessorName = taskName.substring(1)

      funcs[taskName] = accessor
    }
  }

  Object.keys(graph.task).forEach(inject)
}

module.exports = injectAccessors

},{"../regex/accessor":17}],5:[function(require,module,exports){
/**
 * Optionally add custom functions.
 *
 * @api private
 *
 * @params {Object} funcs
 * @params {Object} additionalFunctions
 */

function injectAdditionalFunctions (funcs, additionalFunctions) {
  // Nothing to do if no additional function is given.
  if (typeof additionalFunctions === 'undefined') {
    return
  }

  /**
   * Validate and insert an additional function.
   *
   * @api private
   */

  function injectAdditionalFunction (key) {
    var isAFunction = typeof additionalFunctions[key] === 'function'

    if (isAFunction) {
      funcs[key] = additionalFunctions[key]
    }
  }

  Object.keys(additionalFunctions)
        .forEach(injectAdditionalFunction)
}

module.exports = injectAdditionalFunctions

},{}],6:[function(require,module,exports){
var argumentRegex = require('../regex/argument')

/**
 * Inject functions to retrieve arguments.
 *
 * @api private
 *
 * @param {Object} funcs reference
 * @param {Object} task
 * @param {Object} args
 */

function injectArguments (funcs, task, args) {
  function getArgument (index) {
    return args[index]
  }

  /**
   * Inject arguments.
   *
   * @api private
   */

  function inject (taskKey) {
    var funcName = task[taskKey]

    if (funcName === 'arguments') {
      funcs[funcName] = function getArguments () { return args }
    } else {
      var arg = argumentRegex.exec(funcName)

      if (arg) {
        funcs[funcName] = getArgument.bind(null, arg[1])
      }
    }
  }

  Object.keys(task)
        .forEach(inject)
}

module.exports = injectArguments

},{"../regex/argument":18}],7:[function(require,module,exports){
var dotOperatorRegex = require('../regex/dotOperator')

/**
 * Inject functions that emulate dot operator.
 *
 * @api private
 *
 * @param {Object} funcs reference
 * @param {Object} task
 */

function injectDotOperators (funcs, task) {
  /**
   * Inject dot operator.
   *
   * @api private
   */

  function inject (taskKey) {
    var taskName = task[taskKey]

    /**
     * Dot operator function.
     *
     * @api private
     *
     * @param {String} attributeName
     * @param {Object} obj
     * @param {...} rest of arguments
     *
     * @returns {*} result
     */

    function dotOperatorFunc (attributeName, obj) {
      var func

      if (typeof obj === 'object') {
        func = obj[attributeName]
      }

      if (typeof func === 'function') {
        return func.apply(obj, Array.prototype.slice.call(arguments, 2))
      }
    }

    if (dotOperatorRegex.func.test(taskName)) {
      // .foo() -> foo
      var attributeName = taskName.substring(1, taskName.length - 2)

      funcs[taskName] = dotOperatorFunc.bind(null, attributeName)
    }

    /**
     * Dot operator attribute.
     *
     * @api private
     *
     * @param {String} attributeName
     * @param {Object} obj
     *
     * @returns {*} attribute
     */

    function dotOperatorAttr (attributeName, obj) {
      var attr

      if (typeof obj === 'object') {
        attr = obj[attributeName]
      }

      if (typeof attr === 'function') {
        return attr.bind(obj)
      }

      return attr
    }

    if (dotOperatorRegex.attr.test(taskName)) {
      // .foo -> foo
      attributeName = taskName.substring(1)

      funcs[taskName] = dotOperatorAttr.bind(null, attributeName)
    }
  }

  Object.keys(task).forEach(inject)
}

module.exports = injectDotOperators

},{"../regex/dotOperator":20}],8:[function(require,module,exports){
var walkGlobal = require('../walkGlobal')

/**
 * Inject globals.
 *
 * @api private
 *
 * @param {Object} funcs reference
 * @param {Object} task
 */

function injectGlobals (funcs, task) {
  /**
   * Inject task
   *
   * @api private
   */

  function inject (taskKey) {
    var taskName = task[taskKey]

    // Do not overwrite a function if already defined.
    // For example, console.log cannot be used as is, it must binded to console.
    if (typeof funcs[taskName] === 'function') {
      return
    }

    // Skip also reserved keywords.
    if ((taskName === 'return') || (taskName === 'this.graph')) {
      return
    }

    var globalValue = walkGlobal(taskName)

    if (typeof globalValue === 'undefined') {
      return
    }

    if (typeof globalValue === 'function') {
      funcs[taskName] = globalValue
    } else {
      funcs[taskName] = function () {
        return globalValue
      }
    }
  }

  Object.keys(task)
        .forEach(inject)
}

module.exports = injectGlobals

},{"../walkGlobal":25}],9:[function(require,module,exports){
/**
 * Inject functions that return numbers.
 *
 * @api private
 *
 * @param {Object} funcs reference
 * @param {Object} task collection
 */

function injectNumbers (funcs, task) {
  /**
   * Inject a function that returns a number.
   *
   * @api private
   */

  function inject (taskKey) {
    var taskName = task[taskKey]

    var num = parseFloat(taskName)

    if (isNaN(num)) {
      return
    } else {
      funcs[taskName] = function () { return num }
    }
  }

  Object.keys(task)
        .forEach(inject)
}

module.exports = injectNumbers

},{}],10:[function(require,module,exports){
var referenceRegex = require('../regex/reference')
var walkGlobal = require('../walkGlobal')

/**
 * Inject references to functions.
 *
 * @api private
 *
 * @param {Object} funcs reference
 * @param {Object} task
 */

function injectReferences (funcs, task) {
  /**
   * Inject task.
   *
   * @api private
   */

  function inject (taskKey) {
    var referenceName = null
    var referencedFunction = null
    var taskName = task[taskKey]

    /**
     * Inject reference.
     *
     * @api private
     */

    function reference () {
      return referencedFunction
    }

    if (referenceRegex.test(taskName)) {
      referenceName = taskName.substring(1)

      if (typeof funcs[referenceName] === 'function') {
        referencedFunction = funcs[referenceName]
      } else {
        referencedFunction = walkGlobal(referenceName)
      }

      if (typeof referencedFunction === 'function') {
        funcs[taskName] = reference
      }
    }
  }

  Object.keys(task).forEach(inject)
}

module.exports = injectReferences

},{"../regex/reference":22,"../walkGlobal":25}],11:[function(require,module,exports){
var quotedRegex = require('../regex/quoted')

/**
 * Inject functions that return strings.
 *
 * @api private
 *
 * @param {Object} funcs reference
 * @param {Object} task collection
 */

function injectStrings (funcs, task) {
  /**
   * Inject a function that returns a string.
   *
   * @api private
   */

  function inject (taskKey) {
    var taskName = task[taskKey]

    if (quotedRegex.test(taskName)) {
      funcs[taskName] = function () {
        return taskName.substr(1, taskName.length - 2)
      }
    }
  }

  Object.keys(task)
        .forEach(inject)
}

module.exports = injectStrings

},{"../regex/quoted":21}],12:[function(require,module,exports){
var inputPipes = require('./inputPipes')

/**
 * Retrieve input arguments of a task.
 *
 * @param {Object} outs
 * @param {Object} pipe
 * @param {String} taskKey
 *
 * @returns {Array} args
 */

function inputArgs (outs, pipe, taskKey) {
  var args = []
  var inputPipesOf = inputPipes.bind(null, pipe)

  function populateArg (inputPipe) {
    var index = inputPipe[2] || 0
    var value = outs[inputPipe[0]]

    args[index] = value
  }

  inputPipesOf(taskKey).forEach(populateArg)

  return args
}

module.exports = inputArgs

},{"./inputPipes":13}],13:[function(require,module,exports){
/**
 * Compute pipes that feed a task.
 *
 * @param {Object} pipe
 * @param {String} taskKey
 *
 * @returns {Array} pipes
 */

function inputPipes (pipe, taskKey) {
  var pipes = []

  function pushPipe (key) {
    pipes.push(pipe[key])
  }

  function ifIsInputPipe (key) {
    return pipe[key][1] === taskKey
  }

  Object.keys(pipe).filter(ifIsInputPipe).forEach(pushPipe)

  return pipes
}

module.exports = inputPipes

},{}],14:[function(require,module,exports){
var validate = require('./validate')

/**
 * Duct tape for dflow functions.
 *
 * @param {Function} f
 *
 * @returns {Boolean} ok, it looks like a dflowFun
 */

function isDflowFun (f) {
  var isFunction = typeof f === 'function'
  var hasGraphObject = typeof f.graph === 'object'
  var hasFuncsObject = typeof f.funcs === 'object'
  var hasValidGraph = false

  if (isFunction && hasGraphObject && hasFuncsObject) {
    hasValidGraph = validate(f.graph, f.funcs)
  }

  return hasValidGraph
}

module.exports = isDflowFun

},{"./validate":24}],15:[function(require,module,exports){
var parents = require('./parents')

/**
 * Compute level of task.
 *
 * @param {Object} pipe
 * @param {Object} cachedLevelOf
 * @param {String} taskKey
 *
 * @returns {Number} taskLevel
 */

function level (pipe, cachedLevelOf, taskKey) {
  var taskLevel = 0
  var parentsOf = parents.bind(null, pipe)

  if (typeof cachedLevelOf[taskKey] === 'number') {
    return cachedLevelOf[taskKey]
  }

  function computeLevel (parentTaskKey) {
                                 // ↓ Recursion here: the level of a task is the max level of its parents + 1.
    taskLevel = Math.max(taskLevel, level(pipe, cachedLevelOf, parentTaskKey) + 1)
  }

  parentsOf(taskKey).forEach(computeLevel)

  cachedLevelOf[taskKey] = taskLevel

  return taskLevel
}

module.exports = level

},{"./parents":16}],16:[function(require,module,exports){
var inputPipes = require('./inputPipes')

/**
 * Compute parent tasks.
 *
 * @param {Array} pipes of graph
 * @param {String} taskKey
 *
 * @returns {Array} parentTaskIds
 */

function parents (pipe, taskKey) {
  var inputPipesOf = inputPipes.bind(null, pipe)
  var parentTaskIds = []

  function pushParentTaskId (pipe) {
    parentTaskIds.push(pipe[0])
  }

  inputPipesOf(taskKey).forEach(pushParentTaskId)

  return parentTaskIds
}

module.exports = parents

},{"./inputPipes":13}],17:[function(require,module,exports){
module.exports = /^@[\w][\w\d]+$/

},{}],18:[function(require,module,exports){
module.exports = /^arguments\[(\d+)\]$/

},{}],19:[function(require,module,exports){
module.exports = /^\/\/.+$/

},{}],20:[function(require,module,exports){
exports.attr = /^\.([a-zA-Z_$][0-9a-zA-Z_$]+)$/

exports.func = /^\.([a-zA-Z_$][0-9a-zA-Z_$]+)\(\)$/

},{}],21:[function(require,module,exports){
module.exports = /^'.+'$/

},{}],22:[function(require,module,exports){
module.exports = /^\&(.+)$/

},{}],23:[function(require,module,exports){
module.exports = /^\/[\w][\w\d]+$/

},{}],24:[function(require,module,exports){

var accessorRegex = require('./regex/accessor')
var argumentRegex = require('./regex/argument')
var dotOperatorRegex = require('./regex/dotOperator')
var referenceRegex = require('./regex/reference')
var subgraphRegex = require('./regex/subgraph')

/**
 * Check graph consistency.
 *
 * @param {Object} graph
 * @param {Object} [additionalFunctions]
 *
 * @returns {Boolean} ok if no exception is thrown
 */

function validate (graph, additionalFunctions) {
  // Required properties.
  var pipe = graph.pipe
  var task = graph.task

  // Optional properties.
  var data = graph.data || {}
  var func = graph.func || {}
  var info = graph.info || {}

  var seenPipe = {}

  // Validate addition functions, if any.
  // Check there are no reserved keys.

  function throwIfEquals (taskName, reservedKey) {
    if (taskName === reservedKey) {
      throw new TypeError('Reserved function name: ' + taskName)
    }
  }

  if (typeof additionalFunctions === 'object') {
    for (var taskName in additionalFunctions) {
      var reservedKeys = ['return', 'arguments', 'this', 'this.graph']
      var throwIfEqualsTaskName = throwIfEquals.bind(null, taskName)

      reservedKeys.forEach(throwIfEqualsTaskName)

      if (argumentRegex.test(taskName)) {
        throw new TypeError('Reserved function name: ' + taskName)
      }

      if (accessorRegex.test(taskName)) {
        throw new TypeError('Function name cannot start with "@": ' + taskName)
      }

      if (dotOperatorRegex.attr.test(taskName)) {
        throw new TypeError('Function name cannot start with ".":' + taskName)
      }

      if (dotOperatorRegex.func.test(taskName)) {
        throw new TypeError('Function name cannot start with "." and end with "()":' + taskName)
      }

      if (referenceRegex.test(taskName)) {
        throw new TypeError('Function name cannot start with "&": ' + taskName)
      }
    }
  }

  // Check pipe and task are objects.

  if (typeof pipe !== 'object') {
    throw new TypeError('Not an object: pipe ' + pipe)
  }

  if (typeof task !== 'object') {
    throw new TypeError('Not an object: task ' + task)
  }

  // Check optional data, func, info and view are objects.

  if (typeof data !== 'object') {
    throw new TypeError('Not an object: data ' + data)
  }

  if (typeof func !== 'object') {
    throw new TypeError('Not an object: func ' + func)
  }

  if (typeof info !== 'object') {
    throw new TypeError('Not an object: info ' + info)
  }

  function checkPipe (key) {
    var arg = pipe[key][2] || 0
    var from = pipe[key][0]
    var to = pipe[key][1]

    // Check types.

    if (typeof arg !== 'number') {
      throw new TypeError('Invalid pipe: ' + pipe[key])
    }

    if (typeof from !== 'string') {
      throw new TypeError('Invalid pipe: ' + pipe[key])
    }

    if (typeof to !== 'string') {
      throw new TypeError('Invalid pipe: ' + pipe[key])
    }

    // Check for orphan pipes.

    if (typeof task[from] === 'undefined') {
      throw new Error('Orphan pipe: ' + pipe[key])
    }

    if (typeof task[to] === 'undefined') {
      throw new Error('Orphan pipe: ' + pipe[key])
    }

    // Remember pipes, avoid duplicates.

    if (typeof seenPipe[from] === 'undefined') {
      seenPipe[from] = {}
    }

    if (typeof seenPipe[from][to] === 'undefined') {
      seenPipe[from][to] = []
    }

    if (typeof seenPipe[from][to][arg] === 'undefined') {
      seenPipe[from][to][arg] = true
    } else {
      throw new Error('Duplicated pipe: ' + pipe[key])
    }
  }

  Object.keys(pipe)
        .forEach(checkPipe)

  // Check that every subgraph referenced are defined.

  function onlySubgraphs (key) {
    var taskName = task[key]

    return subgraphRegex.test(taskName)
  }

  function checkSubgraph (key) {
    var taskName = task[key]

    var funcName = taskName.substring(1)

    if (typeof func[funcName] === 'undefined') {
      throw new Error('Undefined subgraph: ' + funcName)
    }
  }

  Object.keys(task)
        .filter(onlySubgraphs)
        .forEach(checkSubgraph)

  // Recursively check subgraphs in func property.

  function checkFunc (key) {
    validate(func[key], additionalFunctions)
  }

  if (typeof func === 'object') {
    Object.keys(func)
          .forEach(checkFunc)
  }

  return true
}

module.exports = validate

},{"./regex/accessor":17,"./regex/argument":18,"./regex/dotOperator":20,"./regex/reference":22,"./regex/subgraph":23}],25:[function(require,module,exports){
(function (global){
var globalContext

if (typeof window === 'object') {
  globalContext = window
}

if (typeof global === 'object') {
  globalContext = global
}

/**
 * Walk through global context.
 *
 * process.version will return global[process][version]
 *
 * @param {String} taskName
 * @returns {*} leaf
 */

function walkGlobal (taskName) {
  function toNextProp (next, prop) {
    return next[prop]
  }

  return taskName.split('.')
                 .reduce(toNextProp, globalContext)
}

module.exports = walkGlobal

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],"dflow":[function(require,module,exports){
/**
 * @license MIT <Gianluca Casati> http://g14n.info/flow-view
 */

var windowFunctions = require('../functions/window')
var fun = require('../fun')

function funBrowser (graph) {
  var additionalFunctions = arguments[1] || {}

  function inject (key) {
    additionalFunctions[key] = windowFunctions[key]
  }

  Object.keys(windowFunctions).forEach(inject)

  return fun(graph, additionalFunctions)
}

exports.fun = funBrowser

},{"../fun":1,"../functions/window":3}]},{},[]);
