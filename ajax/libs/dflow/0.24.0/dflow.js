require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports=function(x){return x == null||(x.length<1 && typeof x != 'function')||(typeof x == 'object'&& Object.keys(x).length<1)}

},{}],2:[function(require,module,exports){
var isDflowDSL = require('./isDflowDSL')
var reservedTaskNames = require('./reservedTaskNames')

function alreadyDefined (funcs, task) {
  return function (taskKey) {
    var taskName = task[taskKey]
    return !(taskName in funcs)
  }
}

function dflowDSL (task) {
  return function (taskKey) {
    var taskName = task[taskKey]
    return !isDflowDSL(taskName)
  }
}

function reserved (task) {
  return function (taskKey) {
    var taskName = task[taskKey]
    return reservedTaskNames.indexOf(taskName) === -1
  }
}

/**
 * Inject evaluated tasks to functions.
 *
 * @param {Object} funcs reference
 * @param {Object} task
 */

function evalTasks (funcs, task) {
 /**
  * Evaluate a single task and inject it.
  *
  * @param {String} taskKey
  */

  function inject (taskKey) {
    var taskName = task[taskKey]

    try {
      var e = eval(taskName) // eslint-disable-line

      if (typeof e === 'function') {
        funcs[taskName] = e
      } else {
        funcs[taskName] = function () { return e }
      }
    } catch (err) {
      var msg = 'Task not compiled: ' + taskName + ' [' + taskKey + ']' + err
      throw new Error(msg)
    }
  }

  Object.keys(task)
        .filter(reserved(task))
        .filter(dflowDSL(task))
        .filter(alreadyDefined(funcs, task))
        .forEach(inject)
}

module.exports = evalTasks

},{"./isDflowDSL":16,"./reservedTaskNames":28}],3:[function(require,module,exports){
var builtinFunctions = require('./functions/builtin')
var evalTasks = require('./evalTasks')
var isDflowDSL = require('./isDflowDSL')
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
var no = require('not-defined')
var regexComment = require('./regex/comment')
var regexSubgraph = require('./regex/subgraph')
var reservedKeys = require('./reservedKeys')
var validate = require('./validate')
var walkGlobal = require('./walkGlobal')

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
  injectStrings(funcs, task)
  injectNumbers(funcs, task)
  evalTasks(funcs, task)

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
    if (no(cachedLevelOf[a])) cachedLevelOf[a] = computeLevelOf(a)

    if (no(cachedLevelOf[b])) cachedLevelOf[b] = computeLevelOf(b)

    return cachedLevelOf[a] - cachedLevelOf[b]
  }

  /**
   * Ignores comments.
   */

  function comments (key) {
    return !regexComment.test(task[key])
  }

  // Compile each subgraph.
  Object.keys(func)
        .forEach(compileSubgraph)

  /**
   * Throw if a task is not compiled.
   */

  function checkTaskIsCompiled (taskKey) {
    var taskName = task[taskKey]

    // Ignore tasks injected at run time.
    if (reservedKeys.indexOf(taskName) > -1) return

    var msg = 'Task not compiled: ' + taskName + ' [' + taskKey + ']'

    // Check subgraphs.
    if (regexSubgraph.test(taskName)) {
      var subgraphKey = taskName.substring(1)

      if (no(graph.func[subgraphKey])) {
        var subgraphNotFound = new Error(msg)
        subgraphNotFound.taskKey = taskKey
        subgraphNotFound.taskName = taskName
        throw subgraphNotFound
      } else return
    }

    // Skip dflow DSL.
    if (isDflowDSL(taskName)) return

    // Skip globals.
    if (walkGlobal(taskName)) return

    if (no(funcs[taskName])) {
      var subgraphNotCompiled = new Error(msg)
      subgraphNotCompiled.taskKey = taskKey
      subgraphNotCompiled.taskName = taskName
      throw subgraphNotCompiled
    }
  }

  // Check if there is some missing task.
  Object.keys(task)
        .filter(comments)
        .forEach(checkTaskIsCompiled)

  /**
   * Here we are, this is the ❤ of dflow.
   */

  function dflowFun () {
    var gotReturn = false
    var returnValue
    var outs = {}

    // Inject run-time builtin tasks.

    funcs['this'] = function () { return dflowFun }
    funcs['this.graph'] = function () { return graph }
    injectArguments(funcs, task, arguments)

    /**
     * Execute task.
     */

    function run (taskKey) {
      var args = inputArgs(outs, pipe, taskKey)
      var taskName = task[taskKey]
      var f = funcs[taskName]

      // Behave like a JavaScript function:
      // if found a return, skip all other tasks.

      if (gotReturn) return

      if ((taskName === 'return') && (!gotReturn)) {
        returnValue = args[0]
        gotReturn = true
        return
      }

      // If task is not defined at run time, throw an error.

      if (no(f)) {
        var taskNotFound = new Error('Task not found: ' + taskName + ' [' + taskKey + '] ')
        taskNotFound.taskKey = taskKey
        taskNotFound.taskName = taskName
      }

      // Try to execute task.

      try {
        outs[taskKey] = f.apply(null, args)
      } catch (err) {
        // Enrich error with useful dflow task info.
        err.taskName = taskName
        err.taskKey = taskKey

        throw err
      }
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

},{"./evalTasks":2,"./functions/builtin":4,"./inject/accessors":6,"./inject/additionalFunctions":7,"./inject/arguments":8,"./inject/dotOperators":9,"./inject/globals":10,"./inject/numbers":11,"./inject/references":12,"./inject/strings":13,"./inputArgs":14,"./isDflowDSL":16,"./isDflowFun":17,"./level":18,"./regex/comment":22,"./regex/subgraph":26,"./reservedKeys":27,"./validate":29,"./walkGlobal":30,"not-defined":1}],4:[function(require,module,exports){
var no = require('not-defined')

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

// Bit operators

exports['&'] = function (a, b) { return a & b }

exports['|'] = function (a, b) { return a | b }

exports['~'] = function (a) { return ~a }

exports['^'] = function (a, b) { return a ^ b }

exports['<<'] = function (a, b) { return a << b }

exports['>>'] = function (a, b) { return a >> b }

exports['>>>'] = function (a, b) { return a >>> b }

// Eval is not allowed at run time

exports.eval = function () {
  throw new Error('eval is not allowed at run time')
}

// Other operators

exports.apply = function (fun, thisArg, argsArray) {
  if (no(fun)) return

  return fun.apply(thisArg, argsArray)
}

// TODO try to import it in the editor, it seems to complain with
// TypeError: Cannot read property '' of undefined(…)
exports['.'] = function (obj, prop) {
  if (no(obj) || no(prop)) return

  return obj[prop]
}

exports['='] = function (a, b) {
  if (no(a)) return

  a = b

  return a
}

/* eslint-disable */
exports['=='] = function (a, b) { return (a == b) }
/* eslint-enable */

exports['==='] = function (a, b) { return (a === b) }

exports['typeof'] = function (a) { return typeof a }

// Array

exports['[]'] = function () { return [] }

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

// Date

exports.now = function () { return new Date() }

},{"not-defined":1}],5:[function(require,module,exports){
var no = require('not-defined')

var myAudioContext = null

function audioContext () {
  if (myAudioContext) {
    return myAudioContext
  } else {
    var AudioContext = window.AudioContext || window.webkitAudioContext
    myAudioContext = new AudioContext()
    return myAudioContext
  }
}

exports.audioContext = audioContext

// The `.appendChild()` task works but it is too dangerous!
//
// For example, inverting parent with child will delete parent.
// For instance .appendChild(element, body) will erase body.
//
// Another issue is that appending a child that has an id must
// be idempotent.
//
// It is worth to use this safe version.

exports.appendChild = function (element, child) {
  var protectedNodes = ['body', 'head']

  // Nothing to do if element or child is not provided.
  if (arguments.length < 2) return

  // Prevent erase important DOM nodes.
  protectedNodes.forEach(function (node) {
    if (child === document[node]) {
      throw new Error('cannot erase ' + node)
    }
  })

  // Check arguments look like DOM nodes.
  Array.prototype.slice.call(arguments)
       .forEach(function (node) {
         if (typeof node.appendChild !== 'function') {
           throw new Error('Cannot appendChild, not an element:' + node)
         }
       })

  // Be idempotent. It is required that child has an id.
  var id = child.id
  if (no(id)) return

  var foundChild = document.getElementById(id)
  if (foundChild) return foundChild

  // At this stage, child is a brand new element.
  return element.appendChild(child)
}

exports.body = function () { return document.body }

exports.document = function () { return document }

exports.head = function () { return document.head }

function availableTags () {
  return [
    'a', 'article', 'aside', 'button', 'form', 'div',
    'h1', 'h2', 'h3', 'h4', 'h5',
    'input', 'label', 'li', 'link', 'ol', 'nav', 'p', 'script', 'svg',
    'textarea', 'ul'
  ]
}

exports.availableTags = availableTags

availableTags().forEach(function (x) {
  exports[x] = function (id) {
    var element

    // If id is provided, it must be a string.
    if (id && typeof id !== 'string') {
      throw new TypeError('Element id must be a string:' + id)
    }

    element = document.getElementById(id)

    if (!element) {
      element = document.createElement(x)
      element.id = id
    }

    return element
  }
})

exports.window = function () { return window }

},{"not-defined":1}],6:[function(require,module,exports){
var no = require('not-defined')
var regexAccessor = require('../regex/accessor')

/**
 * Inject functions to set or get graph data.
 *
 * @param {Object} funcs reference
 * @param {Object} graph
 */

function injectAccessors (funcs, graph) {
  if (no(graph.data)) graph.data = {}

  funcs['this.graph.data'] = function () { return graph.data }

  /**
   * Inject accessor.
   *
   * @param {String} taskKey
   */

  function inject (taskKey) {
    var accessorName = null
    var taskName = graph.task[taskKey]

    /**
     * Accessor-like function.
     *
     * @param {*} data that JSON can serialize
     */

    function accessor (data) {
      // Behave like a setter if an argument is provided.
      if (arguments.length === 1) {
        var json = JSON.stringify(data)

        if (no(json)) {
          throw new Error('JSON do not serialize data:' + data)
        }

        graph.data[accessorName] = data
      }

      // Always behave also like a getter.
      return graph.data[accessorName]
    }

    if (regexAccessor.test(taskName)) {
      accessorName = taskName.substring(1)

      funcs[taskName] = accessor
    }
  }

  Object.keys(graph.task).forEach(inject)
}

module.exports = injectAccessors

},{"../regex/accessor":20,"not-defined":1}],7:[function(require,module,exports){
var no = require('not-defined')

/**
 * Optionally add custom functions.
 *
 * @params {Object} funcs
 * @params {Object} additionalFunctions
 */

function injectAdditionalFunctions (funcs, additionalFunctions) {
  // Nothing to do if no additional function is given.
  if (no(additionalFunctions)) return

  /**
   * Validate and insert an additional function.
   */

  function injectAdditionalFunction (key) {
    var isAFunction = typeof additionalFunctions[key] === 'function'

    if (isAFunction) funcs[key] = additionalFunctions[key]
  }

  Object.keys(additionalFunctions)
        .forEach(injectAdditionalFunction)
}

module.exports = injectAdditionalFunctions

},{"not-defined":1}],8:[function(require,module,exports){
var regexArgument = require('../regex/argument')

/**
 * Inject functions to retrieve arguments.
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
   */

  function inject (taskKey) {
    var funcName = task[taskKey]

    if (funcName === 'arguments') {
      funcs[funcName] = function getArguments () { return args }
    } else {
      var arg = regexArgument.exec(funcName)

      if (arg) {
        funcs[funcName] = getArgument.bind(null, arg[1])
      }
    }
  }

  Object.keys(task)
        .forEach(inject)
}

module.exports = injectArguments

},{"../regex/argument":21}],9:[function(require,module,exports){
var regexDotOperator = require('../regex/dotOperator')

/**
 * Inject functions that emulate dot operator.
 *
 * @param {Object} funcs reference
 * @param {Object} task
 */

function injectDotOperators (funcs, task) {
  /**
   * Inject dot operator.
   */

  function inject (taskKey) {
    var taskName = task[taskKey]

    /**
     * Dot operator function.
     *
     * @param {String} attributeName
     * @param {Object} obj
     * @param {...} rest of arguments
     *
     * @returns {*} result
     */

    function dotOperatorFunc (attributeName, obj) {
      var func

      if (obj) func = obj[attributeName]

      if (typeof func === 'function') {
        return func.apply(obj, Array.prototype.slice.call(arguments, 2))
      }
    }

    if (regexDotOperator.func.test(taskName)) {
                                                   // .foo() -> foo
      funcs[taskName] = dotOperatorFunc.bind(null, taskName.substring(1, taskName.length - 2))
    }

    /**
     * Dot operator attribute write.
     *
     * @param {String} attributeName
     * @param {Object} obj
     * @param {*} attributeValue
     *
     * @returns {Object} obj modified
     */

    function dotOperatorAttributeWrite (attributeName, obj, attributeValue) {
      obj[attributeName] = attributeValue

      return obj
    }

    if (regexDotOperator.attrWrite.test(taskName)) {
                                                             // .foo= -> foo
      funcs[taskName] = dotOperatorAttributeWrite.bind(null, taskName.substring(1, taskName.length - 1))
    }

    /**
     * Dot operator attribute read.
     *
     * @param {String} attributeName
     * @param {Object} obj
     *
     * @returns {*} attribute
     */

    function dotOperatorAttributeRead (attributeName, obj) {
      var attr

      if (obj) attr = obj[attributeName]

      if (typeof attr === 'function') return attr.bind(obj)

      return attr
    }

    if (regexDotOperator.attrRead.test(taskName)) {
                                                            // .foo -> foo
      funcs[taskName] = dotOperatorAttributeRead.bind(null, taskName.substring(1))
    }
  }

  Object.keys(task).forEach(inject)
}

module.exports = injectDotOperators

},{"../regex/dotOperator":23}],10:[function(require,module,exports){
var no = require('not-defined')
var reservedKeys = require('../reservedKeys')
var walkGlobal = require('../walkGlobal')

/**
 * Inject globals.
 *
 * @param {Object} funcs reference
 * @param {Object} task
 */

function injectGlobals (funcs, task) {
  /**
   * Inject task
   */

  function inject (taskKey) {
    var taskName = task[taskKey]

    // Do not overwrite a function if already defined.
    // For example, console.log cannot be used as is, it must binded to console.
    if (typeof funcs[taskName] === 'function') return

    // Skip also reserved keywords.
    if (reservedKeys.indexOf(taskName) > -1) return

    var globalValue = walkGlobal(taskName)

    if (no(globalValue)) return

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

},{"../reservedKeys":27,"../walkGlobal":30,"not-defined":1}],11:[function(require,module,exports){
/**
 * Inject functions that return numbers.
 *
 * @param {Object} funcs reference
 * @param {Object} task collection
 */

function injectNumbers (funcs, task) {
  /**
   * Inject a function that returns a number.
   */

  function inject (taskKey) {
    var taskName = task[taskKey]

    var num = parseFloat(taskName)

    if (!isNaN(num)) {
      funcs[taskName] = function () { return num }
    }
  }

  Object.keys(task)
        .forEach(inject)
}

module.exports = injectNumbers

},{}],12:[function(require,module,exports){
var regexReference = require('../regex/reference')
var walkGlobal = require('../walkGlobal')

/**
* Inject references to functions.
*
* @param {Object} funcs reference
* @param {Object} task
*/

function injectReferences (funcs, task) {
  /**
   * Inject task.
   *
   * @param {String} taskKey
   */

  function inject (taskKey) {
    var referenceName = null
    var referencedFunction = null
    var taskName = task[taskKey]

    /**
     * Inject reference.
     */

    function reference () {
      return referencedFunction
    }

    if (regexReference.test(taskName)) {
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

},{"../regex/reference":25,"../walkGlobal":30}],13:[function(require,module,exports){
var regexQuoted = require('../regex/quoted')

/**
 * Inject functions that return strings.
 *
 * @param {Object} funcs reference
 * @param {Object} task collection
 */

function injectStrings (funcs, task) {
  /**
   * Inject a function that returns a string.
   */

  function inject (taskKey) {
    var taskName = task[taskKey]

    if (regexQuoted.test(taskName)) {
      funcs[taskName] = function () {
        return taskName.substr(1, taskName.length - 2)
      }
    }
  }

  Object.keys(task)
        .forEach(inject)
}

module.exports = injectStrings

},{"../regex/quoted":24}],14:[function(require,module,exports){
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

},{"./inputPipes":15}],15:[function(require,module,exports){
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

},{}],16:[function(require,module,exports){
var regexArgument = require('./regex/argument')
var regexComment = require('./regex/comment')
var regexDotOperator = require('./regex/dotOperator')
var regexReference = require('./regex/reference')
var regexSubgraph = require('./regex/subgraph')

function isDflowDSL (taskName) {
  if (regexArgument.exec(taskName)) return true
  if (regexComment.test(taskName)) return true
  if (regexDotOperator.func.test(taskName)) return true
  if (regexDotOperator.attrRead.test(taskName)) return true
  if (regexDotOperator.attrWrite.test(taskName)) return true
  if (regexReference.exec(taskName)) return true
  if (regexSubgraph.test(taskName)) return true

  return false
}

module.exports = isDflowDSL

},{"./regex/argument":21,"./regex/comment":22,"./regex/dotOperator":23,"./regex/reference":25,"./regex/subgraph":26}],17:[function(require,module,exports){
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
  var hasFuncsObject = typeof f.funcs === 'object'
  var hasGraphObject = typeof f.graph === 'object'
  var hasValidGraph = true

  if (!isFunction || !hasFuncsObject || !hasGraphObject) return false

  if (isFunction && hasGraphObject && hasFuncsObject) {
    try {
      validate(f.graph, f.funcs)
    } catch (ignore) {
      hasValidGraph = false
    }
  }

  return hasValidGraph
}

module.exports = isDflowFun

},{"./validate":29}],18:[function(require,module,exports){
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

},{"./parents":19}],19:[function(require,module,exports){
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

},{"./inputPipes":15}],20:[function(require,module,exports){
module.exports = /^@[\w][\w\d]+$/

},{}],21:[function(require,module,exports){
module.exports = /^arguments\[(\d+)\]$/

},{}],22:[function(require,module,exports){
module.exports = /^\/\/.+$/

},{}],23:[function(require,module,exports){
exports.attrRead = /^\.([a-zA-Z_$][0-9a-zA-Z_$]+)$/
exports.attrWrite = /^\.([a-zA-Z_$][0-9a-zA-Z_$]+)=$/
exports.func = /^\.([a-zA-Z_$][0-9a-zA-Z_$]+)\(\)$/

},{}],24:[function(require,module,exports){
module.exports = /^'.+'$/

},{}],25:[function(require,module,exports){
module.exports = /^&(.+)$/

},{}],26:[function(require,module,exports){
module.exports = /^\/[\w][\w\d]+$/

},{}],27:[function(require,module,exports){
// Also arguments[0] ... arguments[N] are reserved.
module.exports = [
  'arguments',
  'dflow.fun',
  'dflow.isDflowFun',
  'dflow.validate',
  'return',
  'this',
  'this.graph'
]

},{}],28:[function(require,module,exports){
var reservedTaskNames = [
  'dflow.fun',
  'dflow.isDflowFun',
  'dflow.validate',
  'this',
  'this.data.graph',
  'return'
]

module.exports = reservedTaskNames

},{}],29:[function(require,module,exports){
var no = require('not-defined')
var regexAccessor = require('./regex/accessor')
var regexArgument = require('./regex/argument')
var regexDotOperator = require('./regex/dotOperator')
var regexReference = require('./regex/reference')
var reservedKeys = require('./reservedKeys')
var regexSubgraph = require('./regex/subgraph')

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
      var throwIfEqualsTaskName = throwIfEquals.bind(null, taskName)

      reservedKeys.forEach(throwIfEqualsTaskName)

      if (regexArgument.test(taskName)) {
        throw new TypeError('Reserved function name: ' + taskName)
      }

      if (regexAccessor.test(taskName)) {
        throw new TypeError('Function name cannot start with "@": ' + taskName)
      }

      if (regexDotOperator.attrRead.test(taskName)) {
        throw new TypeError('Function name cannot start with ".":' + taskName)
      }

      if (regexDotOperator.attrWrite.test(taskName)) {
        throw new TypeError('Function name cannot start with "." and end with "=":' + taskName)
      }

      if (regexDotOperator.func.test(taskName)) {
        throw new TypeError('Function name cannot start with "." and end with "()":' + taskName)
      }

      if (regexReference.test(taskName)) {
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

    if (no(task[from])) throw new Error('Orphan pipe: ' + pipe[key])

    if (no(task[to])) throw new Error('Orphan pipe: ' + pipe[key])

    // Remember pipes, avoid duplicates.

    if (no(seenPipe[from])) seenPipe[from] = {}

    if (no(seenPipe[from][to])) seenPipe[from][to] = []

    if (no(seenPipe[from][to][arg])) seenPipe[from][to][arg] = true
    else throw new Error('Duplicated pipe: ' + pipe[key])
  }

  Object.keys(pipe)
        .forEach(checkPipe)

  // Check that every subgraph referenced are defined.

  function onlySubgraphs (key) {
    var taskName = task[key]

    return regexSubgraph.test(taskName)
  }

  function checkSubgraph (key) {
    var taskName = task[key]

    var funcName = taskName.substring(1)

    if (no(func[funcName])) throw new Error('Undefined subgraph: ' + funcName)
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

},{"./regex/accessor":20,"./regex/argument":21,"./regex/dotOperator":23,"./regex/reference":25,"./regex/subgraph":26,"./reservedKeys":27,"not-defined":1}],30:[function(require,module,exports){
(function (global){
var regexComment = require('./regex/comment')
var regexReference = require('./regex/reference')
var regexQuoted = require('./regex/quoted')

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
  // Skip dot operator and tasks that start with a dot.
  if (taskName.indexOf('.') === 0) return

  // Skip stuff that may include dots:
  // * comments
  // * strings
  // * numbers
  // * references
  if (regexComment.test(taskName)) return
  if (parseFloat(taskName)) return
  if (regexQuoted.test(taskName)) return
  if (regexReference.test(taskName)) return

  function toNextProp (next, prop) {
    return next[prop]
  }

  return taskName.split('.')
                 .reduce(toNextProp, globalContext)
}

module.exports = walkGlobal

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./regex/comment":22,"./regex/quoted":24,"./regex/reference":25}],"dflow":[function(require,module,exports){
/**
 * @license MIT <Gianluca Casati> http://g14n.info/dflow
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

},{"../fun":3,"../functions/window":5}]},{},[]);
