var Test = {};var isCommonJS = typeof window == "undefined" && typeof exports == "object";

/**
 * Top level namespace for Jasmine, a lightweight JavaScript BDD/spec/testing framework.
 *
 * @namespace
 */
var jasmine = {};
if (isCommonJS) exports.jasmine = jasmine;
/**
 * @private
 */
jasmine.unimplementedMethod_ = function() {
  throw new Error("unimplemented method");
};

/**
 * Use <code>jasmine.undefined</code> instead of <code>undefined</code>, since <code>undefined</code> is just
 * a plain old variable and may be redefined by somebody else.
 *
 * @private
 */
jasmine.undefined = jasmine.___undefined___;

/**
 * Show diagnostic messages in the console if set to true
 *
 */
jasmine.VERBOSE = false;

/**
 * Default interval in milliseconds for event loop yields (e.g. to allow network activity or to refresh the screen with the HTML-based runner). Small values here may result in slow test running. Zero means no updates until all tests have completed.
 *
 */
jasmine.DEFAULT_UPDATE_INTERVAL = 250;

/**
 * Maximum levels of nesting that will be included when an object is pretty-printed
 */
jasmine.MAX_PRETTY_PRINT_DEPTH = 40;

/**
 * Default timeout interval in milliseconds for waitsFor() blocks.
 */
jasmine.DEFAULT_TIMEOUT_INTERVAL = 5000;

/**
 * By default exceptions thrown in the context of a test are caught by jasmine so that it can run the remaining tests in the suite.
 * Set to false to let the exception bubble up in the browser.
 *
 */
jasmine.CATCH_EXCEPTIONS = true;

jasmine.getGlobal = function() {
  function getGlobal() {
    return this;
  }

  return getGlobal();
};

/**
 * Allows for bound functions to be compared.  Internal use only.
 *
 * @ignore
 * @private
 * @param base {Object} bound 'this' for the function
 * @param name {Function} function to find
 */
jasmine.bindOriginal_ = function(base, name) {
  var original = base[name];
  if (original.apply) {
    return function() {
      return original.apply(base, arguments);
    };
  } else {
    // IE support
    return jasmine.getGlobal()[name];
  }
};

jasmine.setTimeout = jasmine.bindOriginal_(jasmine.getGlobal(), 'setTimeout');
jasmine.clearTimeout = jasmine.bindOriginal_(jasmine.getGlobal(), 'clearTimeout');
jasmine.setInterval = jasmine.bindOriginal_(jasmine.getGlobal(), 'setInterval');
jasmine.clearInterval = jasmine.bindOriginal_(jasmine.getGlobal(), 'clearInterval');

jasmine.MessageResult = function(values) {
  this.type = 'log';
  this.values = values;
  this.trace = new Error(); // todo: test better
};

jasmine.MessageResult.prototype.toString = function() {
  var text = "";
  for (var i = 0; i < this.values.length; i++) {
    if (i > 0) text += " ";
    if (jasmine.isString_(this.values[i])) {
      text += this.values[i];
    } else {
      text += jasmine.pp(this.values[i]);
    }
  }
  return text;
};

jasmine.ExpectationResult = function(params) {
  this.type = 'expect';
  this.matcherName = params.matcherName;
  this.passed_ = params.passed;
  this.expected = params.expected;
  this.actual = params.actual;
  this.message = this.passed_ ? 'Passed.' : params.message;

  var trace = (params.trace || new Error(this.message));
  this.trace = this.passed_ ? '' : trace;
};

jasmine.ExpectationResult.prototype.toString = function () {
  return this.message;
};

jasmine.ExpectationResult.prototype.passed = function () {
  return this.passed_;
};

/**
 * Getter for the Jasmine environment. Ensures one gets created
 */
jasmine.getEnv = function() {
  var env = jasmine.currentEnv_ = jasmine.currentEnv_ || new jasmine.Env();
  return env;
};

/**
 * @ignore
 * @private
 * @param value
 * @returns {Boolean}
 */
jasmine.isArray_ = function(value) {
  return jasmine.isA_("Array", value);
};

/**
 * @ignore
 * @private
 * @param value
 * @returns {Boolean}
 */
jasmine.isString_ = function(value) {
  return jasmine.isA_("String", value);
};

/**
 * @ignore
 * @private
 * @param value
 * @returns {Boolean}
 */
jasmine.isNumber_ = function(value) {
  return jasmine.isA_("Number", value);
};

/**
 * @ignore
 * @private
 * @param {String} typeName
 * @param value
 * @returns {Boolean}
 */
jasmine.isA_ = function(typeName, value) {
  return Object.prototype.toString.apply(value) === '[object ' + typeName + ']';
};

/**
 * Pretty printer for expecations.  Takes any object and turns it into a human-readable string.
 *
 * @param value {Object} an object to be outputted
 * @returns {String}
 */
jasmine.pp = function(value) {
  var stringPrettyPrinter = new jasmine.StringPrettyPrinter();
  stringPrettyPrinter.format(value);
  return stringPrettyPrinter.string;
};

/**
 * Returns true if the object is a DOM Node.
 *
 * @param {Object} obj object to check
 * @returns {Boolean}
 */
jasmine.isDomNode = function(obj) {
  return obj.nodeType > 0;
};

/**
 * Returns a matchable 'generic' object of the class type.  For use in expecations of type when values don't matter.
 *
 * @example
 * // don't care about which function is passed in, as long as it's a function
 * expect(mySpy).toHaveBeenCalledWith(jasmine.any(Function));
 *
 * @param {Class} clazz
 * @returns matchable object of the type clazz
 */
jasmine.any = function(clazz) {
  return new jasmine.Matchers.Any(clazz);
};

/**
 * Returns a matchable subset of a JSON object. For use in expectations when you don't care about all of the
 * attributes on the object.
 *
 * @example
 * // don't care about any other attributes than foo.
 * expect(mySpy).toHaveBeenCalledWith(jasmine.objectContaining({foo: "bar"});
 *
 * @param sample {Object} sample
 * @returns matchable object for the sample
 */
jasmine.objectContaining = function (sample) {
    return new jasmine.Matchers.ObjectContaining(sample);
};

/**
 * Jasmine Spies are test doubles that can act as stubs, spies, fakes or when used in an expecation, mocks.
 *
 * Spies should be created in test setup, before expectations.  They can then be checked, using the standard Jasmine
 * expectation syntax. Spies can be checked if they were called or not and what the calling params were.
 *
 * A Spy has the following fields: wasCalled, callCount, mostRecentCall, and argsForCall (see docs).
 *
 * Spies are torn down at the end of every spec.
 *
 * Note: Do <b>not</b> call new jasmine.Spy() directly - a spy must be created using spyOn, jasmine.createSpy or jasmine.createSpyObj.
 *
 * @example
 * // a stub
 * var myStub = jasmine.createSpy('myStub');  // can be used anywhere
 *
 * // spy example
 * var foo = {
 *   not: function(bool) { return !bool; }
 * }
 *
 * // actual foo.not will not be called, execution stops
 * spyOn(foo, 'not');

 // foo.not spied upon, execution will continue to implementation
 * spyOn(foo, 'not').andCallThrough();
 *
 * // fake example
 * var foo = {
 *   not: function(bool) { return !bool; }
 * }
 *
 * // foo.not(val) will return val
 * spyOn(foo, 'not').andCallFake(function(value) {return value;});
 *
 * // mock example
 * foo.not(7 == 7);
 * expect(foo.not).toHaveBeenCalled();
 * expect(foo.not).toHaveBeenCalledWith(true);
 *
 * @constructor
 * @see spyOn, jasmine.createSpy, jasmine.createSpyObj
 * @param {String} name
 */
jasmine.Spy = function(name) {
  /**
   * The name of the spy, if provided.
   */
  this.identity = name || 'unknown';
  /**
   *  Is this Object a spy?
   */
  this.isSpy = true;
  /**
   * The actual function this spy stubs.
   */
  this.plan = function() {
  };
  /**
   * Tracking of the most recent call to the spy.
   * @example
   * var mySpy = jasmine.createSpy('foo');
   * mySpy(1, 2);
   * mySpy.mostRecentCall.args = [1, 2];
   */
  this.mostRecentCall = {};

  /**
   * Holds arguments for each call to the spy, indexed by call count
   * @example
   * var mySpy = jasmine.createSpy('foo');
   * mySpy(1, 2);
   * mySpy(7, 8);
   * mySpy.mostRecentCall.args = [7, 8];
   * mySpy.argsForCall[0] = [1, 2];
   * mySpy.argsForCall[1] = [7, 8];
   */
  this.argsForCall = [];
  this.calls = [];
};

/**
 * Tells a spy to call through to the actual implemenatation.
 *
 * @example
 * var foo = {
 *   bar: function() { // do some stuff }
 * }
 *
 * // defining a spy on an existing property: foo.bar
 * spyOn(foo, 'bar').andCallThrough();
 */
jasmine.Spy.prototype.andCallThrough = function() {
  this.plan = this.originalValue;
  return this;
};

/**
 * For setting the return value of a spy.
 *
 * @example
 * // defining a spy from scratch: foo() returns 'baz'
 * var foo = jasmine.createSpy('spy on foo').andReturn('baz');
 *
 * // defining a spy on an existing property: foo.bar() returns 'baz'
 * spyOn(foo, 'bar').andReturn('baz');
 *
 * @param {Object} value
 */
jasmine.Spy.prototype.andReturn = function(value) {
  this.plan = function() {
    return value;
  };
  return this;
};

/**
 * For throwing an exception when a spy is called.
 *
 * @example
 * // defining a spy from scratch: foo() throws an exception w/ message 'ouch'
 * var foo = jasmine.createSpy('spy on foo').andThrow('baz');
 *
 * // defining a spy on an existing property: foo.bar() throws an exception w/ message 'ouch'
 * spyOn(foo, 'bar').andThrow('baz');
 *
 * @param {String} exceptionMsg
 */
jasmine.Spy.prototype.andThrow = function(exceptionMsg) {
  this.plan = function() {
    throw exceptionMsg;
  };
  return this;
};

/**
 * Calls an alternate implementation when a spy is called.
 *
 * @example
 * var baz = function() {
 *   // do some stuff, return something
 * }
 * // defining a spy from scratch: foo() calls the function baz
 * var foo = jasmine.createSpy('spy on foo').andCall(baz);
 *
 * // defining a spy on an existing property: foo.bar() calls an anonymnous function
 * spyOn(foo, 'bar').andCall(function() { return 'baz';} );
 *
 * @param {Function} fakeFunc
 */
jasmine.Spy.prototype.andCallFake = function(fakeFunc) {
  this.plan = fakeFunc;
  return this;
};

/**
 * Resets all of a spy's the tracking variables so that it can be used again.
 *
 * @example
 * spyOn(foo, 'bar');
 *
 * foo.bar();
 *
 * expect(foo.bar.callCount).toEqual(1);
 *
 * foo.bar.reset();
 *
 * expect(foo.bar.callCount).toEqual(0);
 */
jasmine.Spy.prototype.reset = function() {
  this.wasCalled = false;
  this.callCount = 0;
  this.argsForCall = [];
  this.calls = [];
  this.mostRecentCall = {};
};

jasmine.createSpy = function(name) {

  var spyObj = function() {
    spyObj.wasCalled = true;
    spyObj.callCount++;
    var args = jasmine.util.argsToArray(arguments);
    spyObj.mostRecentCall.object = this;
    spyObj.mostRecentCall.args = args;
    spyObj.argsForCall.push(args);
    spyObj.calls.push({object: this, args: args});
    return spyObj.plan.apply(this, arguments);
  };

  var spy = new jasmine.Spy(name);

  for (var prop in spy) {
    spyObj[prop] = spy[prop];
  }

  spyObj.reset();

  return spyObj;
};

/**
 * Determines whether an object is a spy.
 *
 * @param {jasmine.Spy|Object} putativeSpy
 * @returns {Boolean}
 */
jasmine.isSpy = function(putativeSpy) {
  return putativeSpy && putativeSpy.isSpy;
};

/**
 * Creates a more complicated spy: an Object that has every property a function that is a spy.  Used for stubbing something
 * large in one call.
 *
 * @param {String} baseName name of spy class
 * @param {Array} methodNames array of names of methods to make spies
 */
jasmine.createSpyObj = function(baseName, methodNames) {
  if (!jasmine.isArray_(methodNames) || methodNames.length === 0) {
    throw new Error('createSpyObj requires a non-empty array of method names to create spies for');
  }
  var obj = {};
  for (var i = 0; i < methodNames.length; i++) {
    obj[methodNames[i]] = jasmine.createSpy(baseName + '.' + methodNames[i]);
  }
  return obj;
};

/**
 * All parameters are pretty-printed and concatenated together, then written to the current spec's output.
 *
 * Be careful not to leave calls to <code>jasmine.log</code> in production code.
 */
jasmine.log = function() {
  var spec = jasmine.getEnv().currentSpec;
  spec.log.apply(spec, arguments);
};

/**
 * Function that installs a spy on an existing object's method name.  Used within a Spec to create a spy.
 *
 * @example
 * // spy example
 * var foo = {
 *   not: function(bool) { return !bool; }
 * }
 * spyOn(foo, 'not'); // actual foo.not will not be called, execution stops
 *
 * @see jasmine.createSpy
 * @param obj
 * @param methodName
 * @return {jasmine.Spy} a Jasmine spy that can be chained with all spy methods
 */
var spyOn = function(obj, methodName) {
  return jasmine.getEnv().currentSpec.spyOn(obj, methodName);
};
if (isCommonJS) exports.spyOn = spyOn;

/**
 * Creates a Jasmine spec that will be added to the current suite.
 *
 * // TODO: pending tests
 *
 * @example
 * it('should be true', function() {
 *   expect(true).toEqual(true);
 * });
 *
 * @param {String} desc description of this specification
 * @param {Function} func defines the preconditions and expectations of the spec
 */
var it = function(desc, func) {
  return jasmine.getEnv().it(desc, func);
};
if (isCommonJS) exports.it = it;

/**
 * Creates a <em>disabled</em> Jasmine spec.
 *
 * A convenience method that allows existing specs to be disabled temporarily during development.
 *
 * @param {String} desc description of this specification
 * @param {Function} func defines the preconditions and expectations of the spec
 */
var xit = function(desc, func) {
  return jasmine.getEnv().xit(desc, func);
};
if (isCommonJS) exports.xit = xit;

/**
 * Starts a chain for a Jasmine expectation.
 *
 * It is passed an Object that is the actual value and should chain to one of the many
 * jasmine.Matchers functions.
 *
 * @param {Object} actual Actual value to test against and expected value
 * @return {jasmine.Matchers}
 */
var expect = function(actual) {
  return jasmine.getEnv().currentSpec.expect(actual);
};
if (isCommonJS) exports.expect = expect;

/**
 * Defines part of a jasmine spec.  Used in cominbination with waits or waitsFor in asynchrnous specs.
 *
 * @param {Function} func Function that defines part of a jasmine spec.
 */
var runs = function(func) {
  jasmine.getEnv().currentSpec.runs(func);
};
if (isCommonJS) exports.runs = runs;

/**
 * Waits a fixed time period before moving to the next block.
 *
 * @deprecated Use waitsFor() instead
 * @param {Number} timeout milliseconds to wait
 */
var waits = function(timeout) {
  jasmine.getEnv().currentSpec.waits(timeout);
};
if (isCommonJS) exports.waits = waits;

/**
 * Waits for the latchFunction to return true before proceeding to the next block.
 *
 * @param {Function} latchFunction
 * @param {String} optional_timeoutMessage
 * @param {Number} optional_timeout
 */
var waitsFor = function(latchFunction, optional_timeoutMessage, optional_timeout) {
  jasmine.getEnv().currentSpec.waitsFor.apply(jasmine.getEnv().currentSpec, arguments);
};
if (isCommonJS) exports.waitsFor = waitsFor;

/**
 * A function that is called before each spec in a suite.
 *
 * Used for spec setup, including validating assumptions.
 *
 * @param {Function} beforeEachFunction
 */
var beforeEach = function(beforeEachFunction) {
  jasmine.getEnv().beforeEach(beforeEachFunction);
};
if (isCommonJS) exports.beforeEach = beforeEach;

/**
 * A function that is called after each spec in a suite.
 *
 * Used for restoring any state that is hijacked during spec execution.
 *
 * @param {Function} afterEachFunction
 */
var afterEach = function(afterEachFunction) {
  jasmine.getEnv().afterEach(afterEachFunction);
};
if (isCommonJS) exports.afterEach = afterEach;

/**
 * Defines a suite of specifications.
 *
 * Stores the description and all defined specs in the Jasmine environment as one suite of specs. Variables declared
 * are accessible by calls to beforeEach, it, and afterEach. Describe blocks can be nested, allowing for specialization
 * of setup in some tests.
 *
 * @example
 * // TODO: a simple suite
 *
 * // TODO: a simple suite with a nested describe block
 *
 * @param {String} description A string, usually the class under test.
 * @param {Function} specDefinitions function that defines several specs.
 */
var describe = function(description, specDefinitions) {
  return jasmine.getEnv().describe(description, specDefinitions);
};
if (isCommonJS) exports.describe = describe;

/**
 * Disables a suite of specifications.  Used to disable some suites in a file, or files, temporarily during development.
 *
 * @param {String} description A string, usually the class under test.
 * @param {Function} specDefinitions function that defines several specs.
 */
var xdescribe = function(description, specDefinitions) {
  return jasmine.getEnv().xdescribe(description, specDefinitions);
};
if (isCommonJS) exports.xdescribe = xdescribe;


// Provide the XMLHttpRequest class for IE 5.x-6.x:
jasmine.XmlHttpRequest = (typeof XMLHttpRequest == "undefined") ? function() {
  function tryIt(f) {
    try {
      return f();
    } catch(e) {
    }
    return null;
  }

  var xhr = tryIt(function() {
    return new ActiveXObject("Msxml2.XMLHTTP.6.0");
  }) ||
    tryIt(function() {
      return new ActiveXObject("Msxml2.XMLHTTP.3.0");
    }) ||
    tryIt(function() {
      return new ActiveXObject("Msxml2.XMLHTTP");
    }) ||
    tryIt(function() {
      return new ActiveXObject("Microsoft.XMLHTTP");
    });

  if (!xhr) throw new Error("This browser does not support XMLHttpRequest.");

  return xhr;
} : XMLHttpRequest;
/**
 * @namespace
 */
jasmine.util = {};

/**
 * Declare that a child class inherit it's prototype from the parent class.
 *
 * @private
 * @param {Function} childClass
 * @param {Function} parentClass
 */
jasmine.util.inherit = function(childClass, parentClass) {
  /**
   * @private
   */
  var subclass = function() {
  };
  subclass.prototype = parentClass.prototype;
  childClass.prototype = new subclass();
};

jasmine.util.formatException = function(e) {
  var lineNumber;
  if (e.line) {
    lineNumber = e.line;
  }
  else if (e.lineNumber) {
    lineNumber = e.lineNumber;
  }

  var file;

  if (e.sourceURL) {
    file = e.sourceURL;
  }
  else if (e.fileName) {
    file = e.fileName;
  }

  var message = (e.name && e.message) ? (e.name + ': ' + e.message) : e.toString();

  if (file && lineNumber) {
    message += ' in ' + file + ' (line ' + lineNumber + ')';
  }

  return message;
};

jasmine.util.htmlEscape = function(str) {
  if (!str) return str;
  return str.replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
};

jasmine.util.argsToArray = function(args) {
  var arrayOfArgs = [];
  for (var i = 0; i < args.length; i++) arrayOfArgs.push(args[i]);
  return arrayOfArgs;
};

jasmine.util.extend = function(destination, source) {
  for (var property in source) destination[property] = source[property];
  return destination;
};

/**
 * Base class for pretty printing for expectation results.
 */
jasmine.PrettyPrinter = function() {
  this.ppNestLevel_ = 0;
};

/**
 * Formats a value in a nice, human-readable string.
 *
 * @param value
 */
jasmine.PrettyPrinter.prototype.format = function(value) {
  this.ppNestLevel_++;
  try {
    if (value === jasmine.undefined) {
      this.emitScalar('undefined');
    } else if (value === null) {
      this.emitScalar('null');
    } else if (value === jasmine.getGlobal()) {
      this.emitScalar('<global>');
    } else if (value.jasmineToString) {
      this.emitScalar(value.jasmineToString());
    } else if (typeof value === 'string') {
      this.emitString(value);
    } else if (jasmine.isSpy(value)) {
      this.emitScalar("spy on " + value.identity);
    } else if (value instanceof RegExp) {
      this.emitScalar(value.toString());
    } else if (typeof value === 'function') {
      this.emitScalar('Function');
    } else if (typeof value.nodeType === 'number') {
      this.emitScalar('HTMLNode');
    } else if (value instanceof Date) {
      this.emitScalar('Date(' + value + ')');
    } else if (value.__Jasmine_been_here_before__) {
      this.emitScalar('<circular reference: ' + (jasmine.isArray_(value) ? 'Array' : 'Object') + '>');
    } else if (jasmine.isArray_(value) || typeof value == 'object') {
      value.__Jasmine_been_here_before__ = true;
      if (jasmine.isArray_(value)) {
        this.emitArray(value);
      } else {
        this.emitObject(value);
      }
      delete value.__Jasmine_been_here_before__;
    } else {
      this.emitScalar(value.toString());
    }
  } finally {
    this.ppNestLevel_--;
  }
};

jasmine.PrettyPrinter.prototype.iterateObject = function(obj, fn) {
  for (var property in obj) {
    if (!obj.hasOwnProperty(property)) continue;
    if (property == '__Jasmine_been_here_before__') continue;
    fn(property, obj.__lookupGetter__ ? (obj.__lookupGetter__(property) !== jasmine.undefined && 
                                         obj.__lookupGetter__(property) !== null) : false);
  }
};

jasmine.PrettyPrinter.prototype.emitArray = jasmine.unimplementedMethod_;
jasmine.PrettyPrinter.prototype.emitObject = jasmine.unimplementedMethod_;
jasmine.PrettyPrinter.prototype.emitScalar = jasmine.unimplementedMethod_;
jasmine.PrettyPrinter.prototype.emitString = jasmine.unimplementedMethod_;

jasmine.StringPrettyPrinter = function() {
  jasmine.PrettyPrinter.call(this);

  this.string = '';
};
jasmine.util.inherit(jasmine.StringPrettyPrinter, jasmine.PrettyPrinter);

jasmine.StringPrettyPrinter.prototype.emitScalar = function(value) {
  this.append(value);
};

jasmine.StringPrettyPrinter.prototype.emitString = function(value) {
  this.append("'" + value + "'");
};

jasmine.StringPrettyPrinter.prototype.emitArray = function(array) {
  if (this.ppNestLevel_ > jasmine.MAX_PRETTY_PRINT_DEPTH) {
    this.append("Array");
    return;
  }

  this.append('[ ');
  for (var i = 0; i < array.length; i++) {
    if (i > 0) {
      this.append(', ');
    }
    this.format(array[i]);
  }
  this.append(' ]');
};

jasmine.StringPrettyPrinter.prototype.emitObject = function(obj) {
  if (this.ppNestLevel_ > jasmine.MAX_PRETTY_PRINT_DEPTH) {
    this.append("Object");
    return;
  }

  var self = this;
  this.append('{ ');
  var first = true;

  this.iterateObject(obj, function(property, isGetter) {
    if (first) {
      first = false;
    } else {
      self.append(', ');
    }

    self.append(property);
    self.append(' : ');
    if (isGetter) {
      self.append('<getter>');
    } else {
      self.format(obj[property]);
    }
  });

  this.append(' }');
};

jasmine.StringPrettyPrinter.prototype.append = function(value) {
  this.string += value;
};
/**
 * Formats a value in a nice, human-readable string.
 *
 * @param value
 */
jasmine.PrettyPrinter.prototype.format = function(value) {
  if (this.ppNestLevel_ > 40) {
    throw new Error('jasmine.PrettyPrinter: format() nested too deeply!');
  }

  this.ppNestLevel_++;
  try {
    if (value === jasmine.undefined) {
      this.emitScalar('undefined');
    } else if (value === null) {
      this.emitScalar('null');
    } else if (value === jasmine.getGlobal()) {
      this.emitScalar('<global>');
    } else if (value.expectedClass) {   //override of value instanceof jasmine.Matchers.Any
      this.emitScalar(value.toString());
    } else if (typeof value === 'string') {
      this.emitString(value);
    } else if (jasmine.isSpy(value)) {
      this.emitScalar("spy on " + value.identity);
    } else if (value instanceof RegExp) {
      this.emitScalar(value.toString());
    } else if (typeof value === 'function') {
      this.emitScalar('Function');
    } else if (typeof value.nodeType === 'number') {
      this.emitScalar('HTMLNode');
    } else if (value instanceof Date) {
      this.emitScalar('Date(' + value + ')');
    } else if (value.__Jasmine_been_here_before__) {
      this.emitScalar('<circular reference: ' + (jasmine.isArray_(value) ? 'Array' : 'Object') + '>');
    } else if (jasmine.isArray_(value) || typeof value == 'object') {
      value.__Jasmine_been_here_before__ = true;
      if (jasmine.isArray_(value)) {
        this.emitArray(value);
      } else {
        this.emitObject(value);
      }
      delete value.__Jasmine_been_here_before__;
    } else {
      this.emitScalar(value.toString());
    }
  } catch (e) {
  } finally {
    this.ppNestLevel_--;
  }
};


// Extend: creates whitespaces indent
jasmine.StringPrettyPrinter.prototype.getIndent = function () {
    var whiteSpaces = "",
        i;
        
    for (i = 0; i < this.ws; i++) {
        whiteSpaces += " ";
    }

    return whiteSpaces;
};

// Override: pre-format object
jasmine.StringPrettyPrinter.prototype.emitObject = function(obj) {
  var self = this,
      first = true,
      indent;
      
  this.append('{\n');
  if(!this.ws) {
      this.ws = 0;
  }
  this.ws += 4;
  indent = this.getIndent();
  var i = 0;
  this.iterateObject(obj, function(property, isGetter) {
      
    if (first) {
      first = false;
    } else {
      self.append(',\n');
    }

    self.append(indent + property);
    self.append(' : ');
    if (isGetter) {
      self.append('<getter>');
    } else {
      if (typeof obj[property] !== "object") {
         self.format(obj[property]);   
      } else {
         self.append("<Object>");
      }
    }
  });
  
  this.ws -= 4;
  indent = this.getIndent();
  
  this.append(indent + '\n'+ indent +'}');

};
/**
 * Basic browsers detection.
 */
jasmine.browser = {};
jasmine.browser.isIE = !!window.ActiveXObject;
jasmine.browser.isIE6 = jasmine.browser.isIE && !window.XMLHttpRequest;
jasmine.browser.isIE7 = jasmine.browser.isIE && !!window.XMLHttpRequest && !document.documentMode;
jasmine.browser.isIE8 = jasmine.browser.isIE && !!window.XMLHttpRequest && !!document.documentMode && !window.performance;
jasmine.browser.isIE9 = jasmine.browser.isIE && !!window.performance;
jasmine.browser.isSafari3 = /safari/.test(navigator.userAgent.toLowerCase()) && /version\/3/.test(navigator.userAgent.toLowerCase());
jasmine.browser.isOpera = !!window.opera;
jasmine.browser.isOpera11 = jasmine.browser.isOpera && parseInt(window.opera.version(), 10) > 10;
jasmine.array = {};

  /**
     * Checks whether or not the specified item exists in the array.
     * Array.prototype.indexOf is missing in Internet Explorer, unfortunately.
     * We always have to use this static method instead for consistency
     * @param {Array} array The array to check
     * @param {Mixed} item The item to look for
     * @param {Number} from (Optional) The index at which to begin the search
     * @return {Number} The index of item in the array (or -1 if it is not found)
     */
jasmine.array.indexOf = function(array, item, from){
    if (array.indexOf) {
        return array.indexOf(item, from);
    }
        
    var i, length = array.length;

    for (i = (from < 0) ? Math.max(0, length + from) : from || 0; i < length; i++){
    if (array[i] === item) {
                return i;
            }
    }

    return -1;
};

 /**
  * Removes the specified item from the array. If the item is not found nothing happens.
  * @param {Array} array The array
  * @param {Mixed} item The item to remove
  * @return {Array} The passed array itself
  */
jasmine.array.remove = function(array, item) {
    var index = this.indexOf(array, item);

    if (index !== -1) {
        array.splice(index, 1);
    }
    
    return array;
};/**
 * Creates an HTMLElement.
 * @param {Object/HTMLElement} config Ext DomHelper style element config object.
 * If no tag is specified (e.g., {tag:'input'}) then a div will be automatically generated with the specified attributes.
 * @return {HTMLElement} The created HTMLElement
 */
jasmine.Dom = function(config) {
    var element, children, length, child, i, property;
    
    config = config || {};
    
    if (config.tagName) {
        return config;
    }
    
    element = document.createElement(config.tag || "div");
        children = config.children || [];
        length = children.length;

    delete config.tag;
    
    for (i = 0; i < length; i++) {
        child = children[i];
        element.appendChild(new jasmine.Dom(child));
    }
    delete config.children;
    
    if (config.cls) {
        jasmine.Dom.setCls(element, config.cls);
        delete config.cls;
    }

    if (config.html) {
        jasmine.Dom.setHTML(element, config.html);
        delete config.html;
    }

    if (config.style) {
        jasmine.Dom.setStyle(element, config.style);
        delete config.style;
    }
    
    for (property in config) {
        if (!config.hasOwnProperty(property)) {
            continue;
        }
        element[property] = config[property];
    }

    return element;
};

/**
 * Adds className to an HTMLElement.
 * @param {HTMLElement} element The HTMLElement
 * @param {String} cls The className string
 */
jasmine.Dom.addCls = function (element, cls) {
    var split, length, i;
    
    if (!element.className) {
        jasmine.Dom.setCls(element, cls);
        return;
    }
    
    split = element.className.split(" ");
    length = split.length;
    
    for (i = 0; i < length; i++) {
        if (split[i] == cls) {
            return;
        }
    }
    
    element.className = element.className + " " + cls;
};

/**
 * Removes className to HTMLElement.
 * @param {HTMLElement} element The HTMLElement
 * @param {String} cls The className string
 */
jasmine.Dom.removeCls = function(element, cls) {
    var split, length, classArray, i;
    
    if (!element.className) {
        return;
    }
    
    classArray = [];
    split = element.className.split(" ");
    length = split.length;
    
    for (i = 0; i < length; i++) {
        if (split[i] !== cls) {
            classArray.push(split[i]);
        }
    }
    
    element.className = classArray.join(" ");    
};

/**
 * Checks if a dom element has a className.
 * @param {HTMLElement} element The HTMLElement
 * @param {String} cls The className string
 * @return {Boolean}
 */
jasmine.Dom.hasCls = function(element, cls) {
    var split, length, classArray, i;
    
    if (!element.className) {
        return;
    }
    
    split = element.className.split(" ");
    length = split.length;
    
    for (i = 0; i < length; i++) {
        if (split[i] === cls) {
            return true;
        }
    }
    
    return false;   
};

/**
 * Sets HTMLElement className.
 * @param {HTMLElement} element The HTMLElement
 * @param {String} cls The className string
 */
jasmine.Dom.setCls = function(element, cls) {
    element.className = cls;
};

/**
 * Sets HTMLElement innerHTML
 * @param {HTMLElement} element The HTMLElement
 * @param {String} html The innerHTML text
 */
jasmine.Dom.setHTML = function(element, html) {
    element.innerHTML = html;
};

/**
 * Sets HTMLElement style
 * @param {HTMLElement} element The HTMLElement
 * @param {String} style The style property to set
 */
jasmine.Dom.setStyle = function(element, style) {
    var property;
    for (property in style) {
        if (style.hasOwnProperty(property)) {
            element.style[property] = style[property];
        }
    }
};
Test.OptionsImpl = function() {
    this.optionCheckBoxesEl = {};
    this.options = this.urlDecode(window.location.search.substring(1));
    this.options.remote = window.location.toString().search("http:") !== -1;
    this.startAutoReloadTask();
    
};

Test.OptionsImpl.prototype.get = function() {
    return this.options;
};

/**
 * Takes an object and converts it to an encoded URL.
 * @param {Object} o The object to encode
 * @return {String}
 */
Test.OptionsImpl.prototype.urlEncode = function(object) {
    var buf = [],
        e = encodeURIComponent,
        value, property, length, i;

    for (property in object) {
        if(!object.hasOwnProperty(property)) {
            continue;
        }
        value = object[property];
        if (jasmine.isArray_(value)) {
            length = value.length;
            for (i = 0; i < length; i++) {
                buf.push(property + '=' + e(value[i]));
            }
        } else {
            buf.push(property + '=' + e(value));
        }
    }
    return buf.join('&');
};

Test.hashString = function (s, hash) {
    hash = hash || 0;

    // see http://www.cse.yorku.ca/~oz/hash.html
    for (var c, i = 0, n = s.length; i < n; ++i) {
        c = s.charCodeAt(i);
        hash = c + (hash << 6) + (hash << 16) - hash;
    }

    return hash;
};

/**
 * Takes an encoded URL and and converts it to an object. Example:
 * @param {String} string
 * @return {Object} A literal with members
 */
Test.OptionsImpl.prototype.urlDecode = function(string) {
    var obj = {},
        pairs, d, name, value, pair, i, length;
        
    if (string != "") {
        pairs = string.split('&');
        d = decodeURIComponent;
        length = pairs.length;
        for (i = 0; i < length; i++) {
            pair = pairs[i].split('=');
            name = d(pair[0]);
            value = d(pair[1]);
            obj[name] = !obj[name] ? value : [].concat(obj[name]).concat(value);
        }
    }
    function parseStringOrId (str) {
        var id = parseInt(str, 10);
        if (String(id) !== str) {
            id = Test.hashString(str);
        }
        return id;
    }
    
    if (obj.specs) {
        obj.specs = jasmine.isArray_(obj.specs) ? obj.specs : [obj.specs];
        length = obj.specs.length;
        for (i = 0; i < length; i++) {
            obj.specs[i] = parseStringOrId(obj.specs[i]);
        }
    } else {
        obj.specs = [];
    }
    
    if (obj.suites) {
        obj.suites = jasmine.isArray_(obj.suites) ? obj.suites : [obj.suites];
        length = obj.suites.length;
        for (i = 0; i < length; i++) {
            obj.suites[i] = parseStringOrId(obj.suites[i]);
        }
    } else {
        obj.suites = [];
    }
    
    return obj;
};

/**
 * Renders option checkbox and label.
 * @param {String} name The option name.
 * @param {String} labelText The label text.
 * @return {HTMLElement} The option HTMLElement
 */ 
Test.OptionsImpl.prototype.renderCheckbox = function(name, labelText) {
    var me = this,
        checkbox = new jasmine.Dom({
            tag: "input",
            cls: "option " + name,
            type: "checkbox",
            onclick: function() {
                me.onCheckboxClick.apply(me, arguments);
            }
        });
        
    me.optionCheckBoxesEl[name] = checkbox; 
      
    return new jasmine.Dom({
        tag: "span",
        cls: "show",
        children: [checkbox,{
            tag: "label",
            html: labelText
        }]
    });
};

/**
 * Checks options checkboxs if needed. 
 */
Test.OptionsImpl.prototype.check = function() {
    var property, checkbox;
    
    for (property in this.options) {
        if (!this.options.hasOwnProperty(property)) {
            continue;
        }
        checkbox = this.optionCheckBoxesEl[property];
        if (checkbox) {
            checkbox.checked = this.options[property];
        }
    }
};

/**
 * Options checkbox check/uncked handler.
 * @param {HTMLElement} el The checkbox HTMLElement
 */
Test.OptionsImpl.prototype.onCheckboxClick = function(event) {
    var el, opt, row, length, i;
    event = event || window.event;
    el = event.target || event.srcElement;
    opt = el.className.split(" ")[1];
    if (el.checked) { 
       this.options[opt] = true;
    } else {
        delete this.options[opt];
    }
};

/**
 * Reloads current page with reporter options.
 */
Test.OptionsImpl.prototype.reloadWindow = function(reset) {
    if (reset) {
        this.options.specs = [];
        this.options.suites = [];
    }

    window.location.search = this.urlEncode(this.options);
};

/**
 * Starts autoReload task.
 */
Test.OptionsImpl.prototype.startAutoReloadTask = function() {
    var me = this;
    if (me.options.autoReload) {
        var interval = setInterval(function() {
            if (Test.SandBox.isRunning()) {
                clearInterval(interval);
            
                setTimeout(function() {
                    me.reloadWindow();
                }, 2000);
            }
        }, 1500);
    }
};

Test.OptionsImpl.prototype.isChecked = function(o) {
    var specs = this.options.specs,
        suites = this.options.suites,
        id = o.id;

    if (o.suite) {
        return specs && jasmine.array.indexOf(specs, id) !== -1;
    } else {
        return suites && jasmine.array.indexOf(suites, id) !== -1;
    }

    return false;
};

Test.Options = new Test.OptionsImpl();Test.SandBoxImpl = function(){};

Test.SandBoxImpl.prototype.domReady = function(fn) {
    if (document.addEventListener) {
        window.addEventListener('load', fn, false);
    } else {
        window.attachEvent('onload', fn, false);
    }
};  

Test.SandBoxImpl.prototype.setup = function(config) {
    var me = this;
    me.requires = config.requires;  
    me.domReady(function() {
        me.reporter = new Test.Reporter();
        me.createIframe();
    });
};

Test.SandBoxImpl.prototype.createIframe = function() {
    var me = this,
        iframe,
        win,
        doc;

    me.options = Test.Options.get();


    var src = me.options.quirksMode ? 'iframe-quirks.html?loadSpecs=true' : 'iframe.html?loadSpecs=true';
    
    src += '&compiled=' + !!me.options.compiled;

    if (me.options.specsset) {
        src += '&specsset=' + me.options.specsset;
    }
    
    iframe = new jasmine.Dom({
        tag: "iframe",
        cls: "sandboxIframe",
        name: "sandbox",
        frameBorder: 0,
        src: src
    });

    me.reporter.getIframeContainer().appendChild(iframe);
    
    win = iframe.contentWindow || window.frames[iframe.name];
    doc = iframe.contentDocument || win.document;
    this.iframe = iframe;
    this.win = win;
    this.doc = doc;
};

Test.SandBoxImpl.prototype.getIframe = function() {
    return this.iframe;
};

Test.SandBoxImpl.prototype.getWin = function() {
    return this.win;
};

Test.SandBoxImpl.prototype.getDoc = function() {
    return this.doc;
};

Test.SandBoxImpl.prototype.getBody = function() {
    return this.getDoc().body;
};

Test.SandBoxImpl.prototype.getHead = function() {
    return this.getDoc().getElementsByTagName("head")[0];
};

Test.SandBoxImpl.prototype.save = function(spec) {
    var doc = this.getDoc(),
        sb = doc.createElement("div"),
        body = this.getBody(),
        children = body && body.childNodes || [],
        length = children.length,
        i = 0,
        child,
        lwas = this.lengthWas || (this.lengthWas = 0);

    if (!this.options || !this.options.disableBodyClean) {
        //this.clearComponents();
        //this.clearDomElements();
    }

    if (length != lwas) {
        if (!window.headless) {
            this.reporter.log(">> Warning the document.body dom element contains childNodes after spec execution !<br/>" +
                "Spec : " + jasmine.util.htmlEscape(spec.getFullName()) + ' <a href="?' +
                Test.Options.urlEncode({specs: [spec.id], suites:[], disableBodyClean: true}) + '">Load this spec only and disable body autoclean</a><br/>',
                "warning");
        } else {
            this.reporter.log("Warning: " + spec.getFullName() + "doesn't clean properly the document.body.");
        }
        this.lengthWas = length;
    }

};

Test.SandBoxImpl.prototype.clearDomElements = function() {
    var doc = this.getDoc(),
        bd = this.getBody(),
        children = bd.childNodes,
        length = children.length,
        i, child;

    if (!this.options.disableBodyClean) {
        for (i = 0; i < length; i++) {
            child = children[i];
            if (child) {
                bd.removeChild(child);
            }
        }
    }
};

Test.SandBoxImpl.prototype.clearComponents = function() {
    var me = this,
        win = me.getWin(),
        comps, c, len, i;

    if(win.Ext && win.Ext.ComponentManager) {
        comps = win.Ext.ComponentManager.all.getArray();
        len = comps.length;
        for(i=0; i<len; i++) {
            c = comps[i];
            c.destroy();
        }
    }
};

Test.SandBoxImpl.prototype.isRunning = function() {
    return !this.getWin().jasmine.getEnv().currentRunner_.queue.isRunning();
};

Test.SandBoxImpl.prototype.iScope = function(o) {
    if (typeof o === "function") {
        o = "(" + o.toString() + ")();";
    }
    return Test.SandBox.getWin().eval(o);
};

Test.SandBox = new Test.SandBoxImpl();
var iScope = Test.SandBox.iScope; /**
 * @class Test.CodeHighLighter
 * A javascript simple source code higlighter and beautifier (optional).
 */
Test.CodeHighLighter = function(config) {        
    /**
     * @cfg {String} source The source string to process.
     */
    this.source = config.source;
    this.lineNumber = config.lineNumber;
    this.linesFromJsCoverage = config.linesFromJsCoverage;
    
    this.beautify = config.beautify || this.lineNumber === undefined;
    this.highLightCode = config.highLightCode === false ? false : true;
    
    this.matchedComments = [];
    this.matchedStrings = [];
};

/**
 * Regular expressions.
 */
Test.CodeHighLighter.prototype.regExps = {
    strings: /"([^\\"\n]|\\.)*"|'([^\\'\n]|\\.)*'|"([^\\"\n]|\\\n)*"|'([^\\'\n]|\\\n)*'/gm,
    comments: /\/\/.*$|\/\*[\s\S]*?\*\//gm,
    operators: /([\+\-\*\/=\?!]{1,3}|[\-\+]{1,2})/g,
    numbers: /\b([0-9]+)\b/g,
    keywords: [/\b(break)\b/g, /\b(case)\b/g, /\b(catch)\b/g, /\b(continue)\b/g, /\b(default)\b/g,
                /\b(delete)\b/g, /\b(do)\b/g, /\b(else)\b/g, /\b(false)\b/g, /\b(for)\b/g, /\b(function)\b/g,
                /\b(if)\b/g, /\b(in)\b/g, /\b(instanceof)\b/g, /\b(new)\b/g, /\b(null)\b/g,
                /\b(return)\b/g, /\b(switch)\b/g, /\b(this)\b/g, /\b(throw)\b/g, /\b(true)\b/g,
                /\b(try)\b/g,/\b(typeof)\b/g, /\b(var)\b/g, /\b(while)\b/g, /\b(with)\b/g],
    commasInsideParenthesis: /\(([^\(\)\{\}])+\)/g,
    arrayWithOneElement: /\[\n([^,\]]*)\n\]/g,
    commaBracket: /,\n\s*\{/g,
    multipleWhiteSpaces: /(\s+)/g,
    semiColon: /;/g,
    comma: /,/g,
    openedBrackets: /([\{\[])/g,
    closedBrackets: /([\}\]])/g,
    emptyObject: /\{\n\s*\n\}/g,
    openedBracketsWithNewLine: /[\{\[]$/g,
    closedBracketsWithNewLine: /^\s*[\}\]]/g,
    unwantedNewLines: /\n([\n,;\)])/g,
    newLine: /\n/g,
    firstSpaces: /^(\s)+/
};

/**
 * Populates an array of matched objects.
 * @param {String} value The match result.
 * @param {Number} index The index of the match.
 * @param {Array} matchedObjects The array of matches to populate.
 * @param {String} css The css to apply to the match.
 * @return {Boolean} Returns <tt>true</tt> is the match is inside another.
 */
Test.CodeHighLighter.prototype.matchObjects = function(value, index, matchedObjects, css) {
    matchedObjects.push({
        origValue: value,
        value: '<span class="jsHl'+ css +'">' + jasmine.util.htmlEscape(value).replace("$","$\b") + '</span>',
        start: index,
        end: index + value.length
    });
};

/**
 * Checks if a match is inside another matches.
 * @param {Object} matchedObject The checked match.
 * @param {Array} matchedOthers The array that contains other matches.
 * @return {Boolean} Returns <tt>true</tt> is the match is inside another.
 */
Test.CodeHighLighter.prototype.isInside = function(matchedObject, matchedOthers) {
    var start = matchedObject.start,
        end = matchedObject.end,
        length = matchedOthers.length,
        matchedOther, i;

    for (i = 0; i < length; i++) {
        matchedOther = matchedOthers[i];
        if (matchedOther.start < start && start < matchedOther.end) {
            return true;
        } 
    }
    return false;
};

/**
 * This function get rid of any matches that are inside of other matches.
 * If a match isn't inside another it is replaced by a string in {@link #source}
 * in order to protect it from {@link #processOperatorsNumbersKeywords} replace tricks.
 * @param {Array} matchedObjects The array of matches to check.
 * @param {Array} matchedOthers The array that contains other matches.
 * @param {String} protect The replacement string
 */
Test.CodeHighLighter.prototype.fixOverlaps = function(matchedObjects, matchedOthers, protect) {
    var result = [],
        length = matchedObjects.length,
        matchedObject,
        i;
        
    for (i = 0; i < length; i++) {
        matchedObject = matchedObjects[i];
        if (!this.isInside(matchedObject, matchedOthers)) {
            this.source = this.source.replace(matchedObject.origValue, protect);
            result.push(matchedObject);
        }
    }
    return result;
};

/**
 * Replaces Strings and Comments in javascript source code.
 */
Test.CodeHighLighter.prototype.saveStringsAndComments = function() {
    var commentsRe = this.regExps.comments,
        stringsRe = this.regExps.strings,
        exec;
        
    
    while((exec = commentsRe.exec(this.source))) {
        this.matchObjects(exec[0], exec.index, this.matchedComments, "Comment");
    }
    
    while((exec = stringsRe.exec(this.source))) {
        this.matchObjects(exec[0], exec.index, this.matchedStrings, "String");
    }

    this.matchedComments = this.fixOverlaps(this.matchedComments, this.matchedStrings, "%%%%comment%%%%");
    this.matchedStrings = this.fixOverlaps(this.matchedStrings, this.matchedComments, '%%%%string%%%%');
};

/**
 * Process strings and comments saved by {@link #saveStringsAndComments}.
 */
Test.CodeHighLighter.prototype.processStringsAndComments = function() {
    var matches = this.matchedComments,
        length = matches ? matches.length : 0,
        value, i;

    for (i = 0; i < length; i++) {
        value = matches[i].value;
        this.source = this.source.replace("%%%%comment%%%%", value);
    }
    
    matches = this.matchedStrings;
    length = matches ? matches.length : 0;
    
    for (i = 0; i < length; i++) {
        value = matches[i].value;
        this.source = this.source.replace('%%%%string%%%%', value);
    }
};

/**
 * Highlight operators, numbers and keywords.
 */
Test.CodeHighLighter.prototype.processOperatorsNumbersKeywords = function() {
   var regexps = this.regExps,
        keywords = regexps.keywords,
        length = keywords.length,
        i;
        
    this.source = jasmine.util.htmlEscape(this.source).replace(
        regexps.operators, '<span class="jsHlOperator">$1</span>').replace(
        regexps.numbers, '<span class="jsHlNumber">$1</span>');
            
    for (i = 0; i < length; i++) {
        this.source = this.source.replace(keywords[i], '<span class="jsHlKeyword">$1</span>');
    }
};
    
/**
 * Format and highligth javascript sources.
 * @return The HTML formatted and highlighted code
 */
Test.CodeHighLighter.prototype.process = function() {
    this.saveStringsAndComments();
    
    if (this.beautify) {
        this.prepareIndent();
        this.doIndent();
    }
    
    this.processOperatorsNumbersKeywords();

    this.processStringsAndComments();

    return this.source;
};

/**
 * Render sources with line numbers.
 * @return The HTML formatted and highlighted code
 */
Test.CodeHighLighter.prototype.renderJsSources = function() {
    var result = 'No code found.',
        linesFromJsCoverage = this.linesFromJsCoverage,
        lineNumber = this.lineNumber,
        source = this.source,
        lines, line, i, errorCls, length, lineNumberCls;

    if (source) {
        source = this.highLightCode ? this.process() : source;
        lines = source.split("\n");
        length = lines.length;
     
        result = '<table border="0" cellpadding="0" cellspacing="0"><tbody><tr><td class="lineNumbers">';
        for (i = 0; i < length; i++) {
            errorCls = "";
            lineNumberCls = "";
            if (lineNumber) {
                errorCls = i === (lineNumber - 1) ? " error" : "";
            }
            if (linesFromJsCoverage) {
                lineNumberCls = !isNaN(linesFromJsCoverage[i + 1]) ? " lineNumberGreen" : "";
                lineNumberCls = linesFromJsCoverage[i + 1] === 0 ? " lineNumberRed" : lineNumberCls;

            }
            result += '<div class="lineNumber' + errorCls + lineNumberCls + '">' + (i + 1) +'</div>';
        }

        result += '</td><td><pre class="code">'+ source +'</pre></td></tr></tbody></table>';
    }
    
    this.source = result;

    return this.source;
};

/**
 * Prepares source code. It crops double whitespace and append new lines.
 * This function is used generally to preformat the code that come from a 
 * Function.prototype.toString.
 */
Test.CodeHighLighter.prototype.prepareIndent = function() {
    var regexps = this.regExps,
        matches, length, i, m;
        
    this.source = this.source.replace(
                regexps.multipleWhiteSpaces, " ").replace(
                regexps.semiColon, ";\n").replace(
                regexps.comma, ",\n").replace(
                regexps.openedBrackets, "$1\n").replace(
                regexps.closedBrackets, "\n$1\n");

    
    // remove newline after commas inside code parenthesis
    matches = this.source.match(regexps.commasInsideParenthesis);

    length = matches ? matches.length : 0;
    for (i = 0; i < length; i++) {
        m = matches[i];
        this.source = this.source.replace(m, m.replace(regexps.newLine, ""));
    }
    
    // fixes various bad formatting
    this.source = this.source.replace(regexps.arrayWithOneElement, "[$1]").replace(
        regexps.emptyObject, "{}").replace(
        regexps.commaBracket, ", {").replace(
        regexps.unwantedNewLines, "$1");
};

/**
 * Creates a string composed of n whitespaces
 * @param {Number} number The number of white spaces.
 * @return {String} A multiple whitespace string.
 */
Test.CodeHighLighter.prototype.addWhiteSpaces = function (number) {
    var whiteSpaces = "",
        i;
        
    for (i = 0; i < number; i++) {
        whiteSpaces += " ";
    }

    return whiteSpaces;
};

/**
 * Indents pre-formatted source code.
 */
Test.CodeHighLighter.prototype.doIndent = function() {
    var regexps = this.regExps, 
        results = [],
        indent = 0,
        sources = this.source.split("\n"),
        length = sources.length,
        whiteSpaces = "",
        source, i;

    for (i = 0; i < length; i++) {
        source = sources[i].replace(regexps.firstSpaces, '');
        if (source !== "") {
            if (source.search(regexps.closedBracketsWithNewLine) !== -1) {
                indent = Math.max(indent - 4, 0);
                whiteSpaces = this.addWhiteSpaces(indent);
            }
            results.push(whiteSpaces + source);
            if (source.search(regexps.openedBracketsWithNewLine) !== -1) {
                indent += 4;
                whiteSpaces = this.addWhiteSpaces(indent);
            }
        }
    }
    this.source = results.join("\n");
};
/**
 * Init allowedGlobals array.
 */
Test.BadGlobalsImpl = function(reporter) {
    this.results = [];
};

Test.BadGlobalsImpl.prototype.setup = function() {
    var me = this, 
        win = Test.SandBox.getWin(),
        property;
        
    // whitelist support    
    win.addGlobal = function() {
        me.addGlobal.apply(me, arguments);
    };
    
    me.allowedGlobals = {};
    for (property in win) {
        me.allowedGlobals[property] = true;
    }
    // add firebug globals variables to white list
    me.allowedGlobals._firebug = true;
    me.allowedGlobals._createFirebugConsole = true;
    me.allowedGlobals.loadFirebugConsole = true;
    me.allowedGlobals.console = true;
};


/**
 * Append to suite HTMLElement warning messages if improper global variables are found.
 * @param {HTMLElement} suiteEl The suite HTMLElement.
 */
Test.BadGlobalsImpl.prototype.report = function(info, suite) {
    var allowedGlobals = this.allowedGlobals,
        win = Test.SandBox.getWin(),
        property, message, value;
    
    for (property in win) {
        if (!allowedGlobals[property]) {
            value = jasmine.pp(win[property]);
            message = ">> Bad global variable found in " + (suite ? suite.description : "global scope") + "<br/>" + property + " = " + value;
            info.log(message, "warning");        
            this.results[property] = {
                where: (suite ? ('in suite' + suite.description) : "global scope"),
                value: value
            };
            allowedGlobals[property] = true;
        }
    }    
};

Test.BadGlobalsImpl.prototype.addGlobal = function(property) {
    this.allowedGlobals[property] = true;
};

if (!jasmine.browser.isIE && !jasmine.browser.isOpera) {
    Test.BadGlobals = new Test.BadGlobalsImpl();
}/**
 * @singleton Test.jsCoverage
 * The jscoverage manager.
 */
Test.jsCoverage = {
    executed: 0,
    coverage: {},

    isEnabled: function() {
        return !!Test.SandBox.getWin()._$jscoverage;
    },

    getCoverage: function() {
        return this.coverage;
    },
    
    getSandBoxCoverage: function() {
        return Test.SandBox.getWin()._$jscoverage;
    },
/**
 * Adds suite to the jscoverage manager.
 * @param {jasmine.Suite} The jasmine suite.
 */
    add: function(suite) {
        var coverage = this.getSandBoxCoverage(),
        filename, file, property, statement;
        
        if (!coverage) {
            return;
        }
        filename = this.getFileName(suite.coverageFile);
        file = coverage[filename];
        if (coverage && file) {
            for (property in file) {
                if (!file.hasOwnProperty(property)) {
                   continue;
                }
                statement = file[property];
            }
        }  
    },
/**
 * This methods try to find the corresponding javascript source file.
 * @param {String} The filename.
 */
    getFileName: function(filename) {
        var coverage = this.getSandBoxCoverage(), 
        property;
        
        if (!coverage || !filename) {
            return;
        }
        
        if (coverage[filename]) {
            return filename;
        }
        
        for (property in coverage) {
            if (property.search(filename) !== -1) {
                return property;
            }
        }
    },
/**
 * Updates suite coverage results after execution.
 * @param {jasmine.Suite} The jasmine suite.
 */
    update: function(suite) {
        var coverage = this.getSandBoxCoverage(),
            statements = 0,
            executed = 0,
            property, statement, filename, file;
            
        if (!coverage) {
            return;
        }
        
        filename = this.getFileName(suite.coverageFile);
        file = coverage[filename];
        
        if (file) {
            suite.jscoverage = {
                file: []
            };
            
            for (property in file) {
                if (!file.hasOwnProperty(property)) {
                   continue;
                }
                statement = file[property];
                
                suite.jscoverage.file[property] = statement;
                
                if (!isNaN(property) && statement !== undefined) {
                    statements = statements + 1;
                    if (statement !== 0) {
                        this.executed = this.executed + 1;
                        executed = executed + 1;
                    }
                }
            }
            suite.jscoverage.percentage = ((executed/statements) * 100).toFixed(2);
            suite.jscoverage.statements = statements;
            suite.jscoverage.executed = executed;
            this.coverage[filename] = suite.jscoverage.file;
            this.coverage[filename].percentage = suite.jscoverage.percentage;
            this.coverage[filename].statements = suite.jscoverage.statements;
            this.coverage[filename].executed = suite.jscoverage.executed;
        }
    },
/**
 * Returns suite coverage text.
 * @param {jasmine.Suite} The jasmine suite.
 * @return {String} The Code coverage text<
 */
   getSuiteCoverage: function(suite) {
	    if (suite.jscoverage) {
        	return " - Code coverage: " + suite.jscoverage.percentage + "%";
		}
		return '';
   },
/**
 * Gets total code coverage.
 * @return {String} A string with total code coverage.
 */
    getTotal: function() {
        if (this.percentage) {
            return " - Code coverage: " + this.percentage + "%";
        }
        
        return '';
    },

    updateTotal: function() {
        var coverage = this.getSandBoxCoverage(),
            statements = 0,
            file, filename, statement, property, fstatements, fexecuted, create;
        
        if(!coverage) {
            return "";
        }
        
        for (filename in coverage) {
            if (!coverage.hasOwnProperty(filename)) {
               continue;
            }
            file = coverage[filename];
            fstatements = 0;
            fexecuted = 0;
            
            create = !this.coverage[filename];
            if (create) {
                this.coverage[filename] = [];
            }
            for (property in file) {
                if (!file.hasOwnProperty(property)) {
                   continue;
                }
                statement = file[property];
  
                if (!isNaN(property)) {
                    if (statement !== undefined) {
                        statements = statements + 1;
                        fstatements = fstatements + 1;
                    }
                    if (create) {
                        this.coverage[filename][property] = 0;
                    }
                }
            }
            
            if (create) {
                this.coverage[filename].source = file.source;
                this.coverage[filename].statements = fstatements;
                this.coverage[filename].executed = fexecuted;
                this.coverage[filename].percentage = ((fexecuted/fstatements) * 100).toFixed(2);
            } 

        }
        this.statements = statements;
        this.percentage = ((this.executed/statements) * 100).toFixed(2);
    }
    
};Test.panel = {};
/**
 * Renders Jasmine Blocks executed by spec.
 * @param {Jasmine.spec} spec The spec.
 * @param {HTMLElement} panelsEl The HTMLElement which encapsulate the tools panels.
 */
Test.panel.Blocks = function(config) {
    var blocks = config.spec.queue.blocks,
        length = blocks.length,
        cls = "panel blocks",
        children = [],
        i, block, codeHighLighter;

    for (i = 0; i < length; i++) {
        block = blocks[i];
        if (block.func) {
            children.push({
                cls: "blockTitle " + (block.func.typeName || "specSources"),
                html: block.func.typeName || 'it("' + jasmine.util.htmlEscape(config.spec.description) + '")'
            });

            codeHighLighter = new Test.CodeHighLighter({
                source: block.func.toString()
            });

            children.push({
                cls: "sources",
                html: codeHighLighter.renderJsSources()
            });
        }
    }
    
    this.el = new jasmine.Dom({
        cls: cls, 
        children: children
    });

    return this;
};

Test.panel.Blocks.prototype.remove = function() {
    this.el.parentNode.removeChild(this.el);
};/**
 * Renders spec dom sandbox tool.
 * @param {Jasmine.spec} spec The spec.
 * @param {HTMLElement} panelsEl The HTMLElement which encapsulate the tools panels.
 */
Test.panel.Sandbox = function(config) {
    this.persist = true;

    this.render();

    return this;
};

/**
 * Renders spec dom sandbox innerHTML.
 * @return {HTMElement} The formatted dom sandbox innerHTML.
 */
Test.panel.Sandbox.prototype.render = function() {
    this.el = new jasmine.Dom({
        cls: "panel sandbox hideMe"
    });
};/**
 * Renders infos panel.
 */
Test.panel.Infos = function() {
    this.el = new jasmine.Dom({
                tag: "div",
                cls: "panel infos",
                children: [{
                    cls: "logs"
                }]
    });
    this.logs = this.el.childNodes[0];
    this.persist = true;
    return this;
};

/**
 * Print a message into console.
 * @param {String} message The message.
 * @param {String} cls (optional) an extra cls to add to the message.
 */
Test.panel.Infos.prototype.log = function(message, cls) {
    var log = this.logs.appendChild(new jasmine.Dom({
        cls: "infoMessage",
        html: message
    }));
    
    if (cls) {
        jasmine.Dom.addCls(log, cls);
    }
};/**
 * @class jasmine.panel.jsCoverage
 * Creates and renders a per spec jscoverage panel.
 * @param {Object} config The configuration object.
 */
Test.panel.jsCoverage = function(config) {
    this.el = new jasmine.Dom({
        tag: "div",
        cls: "panel jsCoverage",
        children: [{
            cls: "sources",
            html: new Test.CodeHighLighter({
                        source: config.suite.jscoverage.file.source.join("\n"),
                        linesFromJsCoverage: config.suite.jscoverage.file,
                        highLightCode: false
                    }).renderJsSources()
        }]
    });
    return this; 
};

Test.panel.jsCoverage.prototype.remove = function() {
    this.el.parentNode.removeChild(this.el);
};/**
 * @class jasmine.panel.jsCoverageSummary
 * Creates and renders the persistant jscoverage summary panel.
 * @param {Object} config The configuration object.
 */
Test.panel.jsCoverageSummary = function(config) {
    var me = this;
    
    me.el = new jasmine.Dom({
        tag: "div",
        cls: "panel jsCoverageSummary hideMe",
        onclick: function() {
            me.onClick.apply(me, arguments);
        },
        children: [{
            cls: "sbody"
        }]
    });
    
    me.body = me.el.childNodes[0];
    me.persist = true;
    this.renderSummary();
    return me; 
};

/**
 * Renders summary view.
 */
Test.panel.jsCoverageSummary.prototype.renderSummary = function() {
    var coverage = Test.jsCoverage.getCoverage(),
        filename, result;
        
    if (!this.summary) {
        result = '<table class="summary" border="0" cellpadding="0" cellspacing="0"><tbody>';
        result += '<tr class="line header"><td class="fileName">File</td><td class="statements">Statements</td><td class="executed">Executed</td><td class="percentage">Percentage</td></tr>';    
        result += '<tr class="line total">';
        result += '<td class="fileName">Total</td>';
        result += '<td class="statements">' + Test.jsCoverage.statements + "</td>";
        result += '<td class="executed">' + Test.jsCoverage.executed + "</td>";
        result += '<td class="percentage">' + this.renderPercentage(Test.jsCoverage.percentage) + "</td>";
        result += '</tr>';
        
        for (filename in coverage) {
            if (!coverage.hasOwnProperty(filename)) {
                continue;
            }
            result += '<tr class="line">';
            result += '<td class="fileName"><a>' + filename + "</a></td>";
            result += '<td class="statements">' + coverage[filename].statements + "</td>";
            result += '<td class="executed">' + coverage[filename].executed + "</td>";
            result += '<td class="percentage">' + this.renderPercentage(coverage[filename].percentage) + "</td>";
            result += '</tr>';
        }
        result += '</tbody></table>';
        this.summary = result;
    }
    this.body.innerHTML = this.summary;
};

/**
 * Renders percentage progress bar.
 * @return {String} The progressbar html.
 */
Test.panel.jsCoverageSummary.prototype.renderPercentage = function(percent) {
    var result = percent + '%<div class="limit" style="width:300px;">';
        result += '<div class="result" style="width:' + 3 * percent + 'px;"></div>';
    
        result += '</div>';
    return result;
};

/**
 * Renders percentage progress bar.
 * @return {String} The progressbar html.
 */
Test.panel.jsCoverageSummary.prototype.onClick = function(event) {
    var el;
        event = event || window.event;
        el = event.target || event.srcElement;

    if (el.tagName === "A") {
        this.renderSource(Test.jsCoverage.getCoverage()[el.innerHTML]);
    }
    
    if (jasmine.Dom.hasCls(el,"back")) {
        this.renderSummary();
    }
};

/**
 * Renders file source.
 */
Test.panel.jsCoverageSummary.prototype.renderSource = function(coverage) {
    this.body.innerHTML = "";
    this.body.appendChild(new jasmine.Dom({
        cls: "back",
        html: "Back"
    }));
    
    this.body.appendChild(new jasmine.Dom({
            cls: "sources",
            html: new Test.CodeHighLighter({
                        source: coverage.source.join("\n"),
                        linesFromJsCoverage: coverage,
                        highLightCode: false
                    }).renderJsSources()
    }));
};/**
 * Renders stack trace tool.
 * @param {Jasmine.spec} The jasmine spec.
 * @return {HTMLElement} The created HTMLElement.
 */
Test.panel.StackTrace = function(config) {
    this.spec = config.spec;
    this.badLinesEls = [];
    
    var resultItems = this.spec.results().getItems(),
        length = resultItems.length,
        result,
        error,
        lines,
        i;

    if (jasmine.browser.isIE || !this.spec.hasError) {
        return this;
    }
    
    for (i = 0; i < length; i++) {
        result = resultItems[i];
        if (result.type == "expect" && result.passed && !result.passed()) {
            if (result.error) {
                error = result.error;
                break;
            }
        }
    }   
    
    if (error) {
        lines = this.extractStackTrace(error);

        this.el = new jasmine.Dom({
                tag: "div",
                cls: "panel stackTrace",
                children: this.renderStackLines(lines)
        });
    }

    return this;
};

/**
 * Extracts error stack trace.
 * @param {Error} e The javascript error object.
 * @return {Array} An array which contains all stack trace files and lineNumbers.
 */
Test.panel.StackTrace.prototype.extractStackTrace = function(error) {
    var stack = error.stack || error.stackTrace,
        results = [],
        lines, line, length, i, extract, file, lineNumber;
    
    if (stack) {
        lines = stack.split("\n");
        length = lines.length;
        for(i = 0; i < length; i++) {
            line = lines[i];
            if (line.search("jasmine.js") === -1) {
                extract = this.extractFileAndLine(line);
                if (extract) {
                    results.push(extract);
                }
            }
        }
    } else {
        file = error.sourceURL || error.fileName;  
        lineNumber = error.line || error.lineNumber;

        if (file && lineNumber) {
            results.push({
                file: file,
                lineNumber: lineNumber
            });
        }
    }
    return results;
};

/**
 * Extracts filename and line number from a stack trace line.
 * @param {String} line The stack trace line.
 * @return {Object} An object containing the filename and the line number or null.
 */
Test.panel.StackTrace.prototype.extractRe = /((http:\/\/|file:\/\/\/).*\.js)[^:]*:(\d*)/;
Test.panel.StackTrace.prototype.extractFileAndLine = function(line) {
    var result = line.match(this.extractRe);

    if (!result) {
        return null;
    }

    return {
        file: result[1],
        lineNumber: result[3]
    }; 
};

/**
 * Render stack trace lines.
 * @param {String} file The filename.
 * @param {String/Number} lineNumber The line number.
 * @return {Array} An array containing all strace trace HTMLElements.
 */
Test.panel.StackTrace.prototype.renderStackLines = function(lines) {
    var els = [],
        length = lines.length,
        el, line, i, file, lineNumber;

    for (i = 0; i < length; i++) {
        line = lines[i];
        file = line.file;
        lineNumber = parseInt(line.lineNumber, 0);
        el = new jasmine.Dom({
            cls: "stackTraceLine",
            children: [{
                cls: "fileName",
                html: "File: "+ file + " (line " + lineNumber + ")"
            },{
                cls: "sources",
                html: this.renderTraceFileSource(file, lineNumber) 
            }]
        });
        
        this.badLinesEls.push({
            el: el.childNodes[1],
            line: lineNumber
        });
        els.push(el);
    }
    
    return els;
};

/**
 * Downloads source file.
 * @param {String} url The filename url.
 * @return {String} The file source or null.
 */
Test.panel.StackTrace.prototype.getFile = function(file) {
    var request;

    if (jasmine.browser.isIE || Test.Options.remote) {
        return null;
    }
    this.downloadedFiles = this.downloadedFiles || {};

    if (!this.downloadedFiles[file]) {
        request = new XMLHttpRequest();
        
        if (!request) {
            return null;
        }
        request.open("GET", file + "?" + (new Date()).getTime(), false);

        request.send("");

        this.downloadedFiles[file] = request.responseText;        
    }
    
    return this.downloadedFiles[file];
};

/**
 * Renders stack trace source file.
 * @param {String} file The filename.
 * @param {String/Number} lineNumber The line number.
 * @return {HTMLElement} The javascript source file HTMLElement.
 */
Test.panel.StackTrace.prototype.jscoverageFileRe = /(http:\/\/|file:\/\/\/)[^\/]*/;

Test.panel.StackTrace.prototype.renderTraceFileSource = function (file, lineNumber) {
    var highLightCode = true,
        source, instrumented_file, i, length, line;

    if (Test.SandBox.getWin()._$jscoverage) {
        instrumented_file = SandBox.getWin()._$jscoverage[file.replace(this.jscoverageFileRe, "")];
        if (instrumented_file) {
            highLightCode = false;
            source = instrumented_file.source.join("\n");
            linesFromJsCoverage = {};
            length = instrumented_file.length;
            for (i = 0; i < length; i++) {
                line = instrumented_file[i];
                if (line === 0) {
                    linesFromJsCoverage[i-1] = true;
                }
            }
        }
    }
    source = source || this.getFile(file);
    
    return new Test.CodeHighLighter({
        source: source,
        highLightCode: highLightCode,
        lineNumber: lineNumber
    }).renderJsSources();
};

/**
 * Ensure that line which contains the error is visible without scroll.
 */
Test.panel.StackTrace.prototype.afterRender = function() {
    var length = this.badLinesEls.length,
        badLine, firstChild, el, i, lineHeigth, visiblesLines;

    for (i = 0; i < length; i++) {
        badLine = this.badLinesEls[i];
        el = badLine.el;
        lineHeigth = 16;
        visiblesLines = el.clientHeight/lineHeigth;
        el.scrollTop = Math.max(badLine.line - visiblesLines/2, 0) * lineHeigth;
    }
    
    this.badLinesEls = [];
};

Test.panel.StackTrace.prototype.remove = function() {
    this.el.parentNode.removeChild(this.el);
};/**
 * @class Test.panel.TabPanel
 * Renders inspection tools htmlElement.
 * @param {Object} config The configuration object.
 */
Test.panel.TabPanel = function(config) {
    var me = this;  
    
    me.options = Test.Options.get();
    
    me.spec = config.spec;
    me.container = config.container;
    me.el = new jasmine.Dom({
        cls: "tabpanel",
        onclick: function() {
            me.onTabPanelClick.apply(me, arguments);
        },
        children: [{
            cls: "toolBar"
        },{
            cls: "panels"
        }]
    });
        
    me.toolbar = me.el.childNodes[0];
    me.body = me.el.childNodes[1];

    me.children = [];
    me.tabs = [];
    
    
    me.container.appendChild(me.el);
    me.renderToolBar();
    me.add(new Test.panel.Infos({}));
    me.add(new Test.panel.Sandbox({}));
    
    if (me.options.panel) {
        me.activatePanel(me.options.panel);
    }
    
    return me;
};

/**
 * Adds a panel.
 * @param {Object} panel the panel to be added to this tabPanel.
 */
Test.panel.TabPanel.prototype.add = function(panel) {
    if (panel.el) {
        this.body.appendChild(panel.el);
    }
    if (panel.afterRender) {
        panel.afterRender();
    }
    this.children.push(panel);
    
    if (panel.afterRender) {
        panel.afterRender();
    }
};

/**
 * Adds a tab
 * @param {Object} panel the panel to be added to this tabPanel.
 */
Test.panel.TabPanel.prototype.addTab = function(cls, name, persist) {
    var el = this.toolbar.appendChild(new jasmine.Dom({
        tag: "span",
        cls: "toolbarTab " + cls,
        html: name
    }));
    
    this.tabs.push({
        el: el, 
        persist: persist
    });
};

/**
 * Activate a tool panel and render it if needed.
 * @param {String} cls The panel className.
 */
Test.panel.TabPanel.prototype.activatePanel = function(cls) {
    var children = this.children,
        length = children.length,
        rendered = false,
        child, i;
        
    for(i = 0; i < length; i++) {
        child = children[i].el;
        jasmine.Dom.addCls(child, "hideMe"); 
        if (jasmine.Dom.hasCls(child, cls)) {
            jasmine.Dom.removeCls(child, "hideMe");
            if (children[i].persist && cls !== "jsCoverageSummary") {
                this.options.panel = cls;
            } else {
                delete this.options.panel;
            }
            rendered = true;
        }
    }

    if (rendered) {
        return;
    }
    
    if (this.spec) {
        if (cls === "blocks") {
            this.add(new Test.panel.Blocks({
                spec: this.spec
            }));
        }

        if (cls === "stackTrace") {
            this.add(new Test.panel.StackTrace({
                spec: this.spec
            })); 
        }
    }
    
    if (this.suite && this.suite.jscoverage) {
        if (cls === "jsCoverage") {
            this.add(new Test.panel.jsCoverage({
                suite: this.suite
            })); 
        }        
    }
};

/**
 * Reporter HTMLElement click dispatcher.
 * @param {Event} event The event
 */
Test.panel.TabPanel.prototype.onTabPanelClick = function(event) {
    var el;
        event = event || window.event;
        el = event.target || event.srcElement;

    if (jasmine.Dom.hasCls(el, "toolbarTab")) {
        this.onTabClick(el);
    }
};

/**
 * Handle spec tools tab click.
 * @param {HTMLElement} el The tab HTMLElement.
 */
Test.panel.TabPanel.prototype.onTabClick = function(el) {
    var tools, panels, length, child, i;
    
    jasmine.Dom.addCls(el, "selected");

    tools = this.toolbar.childNodes;
    panels = this.body.childNodes;

    length = tools.length;
    for(i = 0; i < length; i++) {
        child = tools[i];
        if (child != el) {    
            jasmine.Dom.removeCls(child, "selected");
        }
    }
    this.activatePanel(el.className.split(" ")[1]);
};


/**
 * Renders inspection tabpanel toolbar which contain tabs.
 * @param {jasmine.Spec} spec The jasmine spec.
 * @param {HTMLElement} toolBarEl The toolbar HTMLElement
 */
Test.panel.TabPanel.prototype.renderToolBar = function() {
    var spec = this.spec,
        suite = this.suite,
        toolbar = this.toolbar;
        
    if (this.tabs.length === 0) {
        this.addTab("infos selected", "Console", true);
        this.addTab("sandbox", "Iframe", true);
    } else {
        jasmine.Dom.addCls(this.tabs[0].el, "selected");
    }
    
    if (spec) {
        this.addTab("blocks", "Blocks");
        
        if (!jasmine.browser.isIE && !jasmine.browser.isOpera && this.spec.hasError) {
            this.addTab("stackTrace", "Stack Trace");
        }
    }
    
    if (suite && suite.jscoverage) {
        this.addTab("jsCoverage", "Suite Coverage");      
    }
};

/**
 * Removes all non-persistant tabs.
 */
Test.panel.TabPanel.prototype.resetToolBar = function() {
    var children = this.tabs,
        length = children.length, 
        child, i;

    for (i = length - 1; i >= 0; i--) {
        child = children[i];
        if (!child.persist) {
            this.toolbar.removeChild(child.el);
            jasmine.array.remove(children, child);
        }
        jasmine.Dom.removeCls(child.el, "selected");
    }
    
    this.renderToolBar();
};

/**
 * Removes all non-persistant panels.
 */
Test.panel.TabPanel.prototype.resetPanels = function() {
    var children = this.children,
        length = children.length, 
        child, i;

    for (i = length - 1; i >= 0; i--) {
        child = children[i];
        if (!child.persist) {
            child.remove();
            jasmine.array.remove(children, child);
        }
        jasmine.Dom.addCls(child.el, "hideMe");
    }
    
    if (children[0]) {
        jasmine.Dom.removeCls(children[0].el, "hideMe");
    }
};

/**
 * Sets TabPanel current spec.
 */
Test.panel.TabPanel.prototype.setSpec = function(spec) {
    this.spec = spec;
    delete this.suite;
    this.resetToolBar();
    this.resetPanels();
};

/**
 * Sets TabPanel current suite.
 */
Test.panel.TabPanel.prototype.setSuite = function(suite) {
    this.suite = suite;
    delete this.spec;
    this.resetToolBar();
    this.resetPanels();
};

/**
 * Resize TabPanel dom element.
 */
Test.panel.TabPanel.prototype.resize = function(val) {
    this.el.style.height = val + "px";
    this.body.style.height = val - 40 + "px";
};

/**
 * Adds jscoverage persistant panel.
 */
Test.panel.TabPanel.prototype.addCoverageSummary = function() {
    this.addTab("jsCoverageSummary", "Coverage Summary", true);
    this.add(new Test.panel.jsCoverageSummary({}));
};/**
 * @class Test.panel.TreeGrid
 * Creates and renders reporter treegrid.
 * @param {Object} config The configuration object.
 */
Test.panel.TreeGrid = function(config) {
    var me = this;
    me.options = Test.Options.get();
    
    me.el = document.body.appendChild(new jasmine.Dom({
        tag: "div",
        cls: "treegrid",
        onmousedown: function() {
            me.onMouseDown.apply(me, arguments);
        },
        onmouseup: function() {
            me.onMouseUp.apply(me, arguments);
        },
        onmousemove: function() {
            me.onMouseMove.apply(me, arguments);
        },
        children: [{
            cls: "header",
            children: [{
                    cls: "logo",
                    html: "Sencha"
                },{
                    cls: "statusMessage"
                },{
                    cls: "toolBar",
                    children: [{
                        tag: "span",
                        cls: "options",
                        children: [
                            Test.Options.renderCheckbox("showPassed", "Show passed"),
                            Test.Options.renderCheckbox("showDisabled", "Show disabled"),
                            Test.Options.renderCheckbox("collapseAll", "Collapse all"),
                            Test.Options.renderCheckbox("disableBodyClean", "Disable Body Autoclean"),
                            Test.Options.renderCheckbox("disableCacheBuster", "Disable CacheBuster"),
                            Test.Options.renderCheckbox("showTimings", "Show Timings"),
                            Test.Options.renderCheckbox("verbose", "Show jasmine logs"),
                            Test.Options.renderCheckbox("autoReload", "Automatic reload"),
                            Test.Options.renderCheckbox("quirksMode", "Quirks Mode")
                        ]
                },{
                    tag: "a",
                    cls: "actionLink",
                    html: "Run checked",
                    onclick: function() {
                        Test.Options.reloadWindow();
                    }
                },{
                    tag: "a",
                    cls: "actionLink",
                    html: "Run all",
                    onclick: function() {
                        Test.Options.reloadWindow(true);
                    }
                }]
            }]
            },{
            tag: "div",
            cls: "tbody",
            onclick: function() {
                me.onBodyClick.apply(me, arguments);
            }
            }, {
              cls: "resizer",
              html: "......"
            }]
    }));
    me.tabPanel = new Test.panel.TabPanel({
        container: me.el
    });
  
    Test.Options.check();
    me.header = me.el.childNodes[0];
    me.statusMessage = me.header.childNodes[1];
    me.toolBar = me.header.childNodes[2];
    me.body = me.el.childNodes[1];
    me.resizer = me.el.childNodes[2];    
    
    me.suites = {};
    me.specs = {};
    me.suitesEls = {};
    me.specsEls = {};
    if (me.options.resizer) {
        me.tabPanel.resize(parseInt(me.options.resizer, 10));
    }
    me.resizeBody();
    window.onresize = function() {
        me.resizeBody();
    };
};

/**
 * Renders suite htmlElement.
 * @param {jasmine.Suite} suite The jasmine suite.
 * @return {HTMLElement} The suite HTMLElement
 */
Test.panel.TreeGrid.prototype.addSuite = function(suite) {
    var options = {},
        parent = suite.parentSuite,
        padding = 18,
        prefix = suite.isDisabled() ? "xdescribe :" : "describe: ",
        cls = "noexpand", 
        row, property;
    
    if (suite.children_.length !== 0) {
        cls = this.options.collapseAll ? "expand" : "collapse";
    } 
    
    if (parent) {
        this.suitesEls[parent.id] || this.addSuite(parent);
        while(parent) {
            padding += 18;
            parent = parent.parentSuite;
        }
    }
    row = this.createRow(this.options.collapseAll && suite.parentSuite, suite);
    for (property in this.options) {
        if (!this.options.hasOwnProperty(property)) {
            continue;
        }
        options[property] = this.options[property];
    }

    options.suite = suite.id;
    delete options.spec;
    
    this.suitesEls[suite.id] = new jasmine.Dom({
        tag: "div",
        id: "suite-" + suite.id,
        cls: "suite " + (suite.isDisabled() ? "disabled" : ""),
        style: {
            "paddingLeft": padding + "px"
        },
        children: [{
            cls: cls
        },{
            tag: "span",
            cls: "description",
            html: prefix + suite.description
        }]
    });
    
    row.appendChild(this.suitesEls[suite.id]);
    var clear = new jasmine.Dom({ tag: 'div' });
    clear.style.clear = 'both';
    row.appendChild(clear);
    this.suites[suite.id] = suite;
    
    return this.suitesEls[suite.id];
};

/**
 * Updates suite dom element by adding a code coverage percentage to it's description.
 * @param {HTMLElement} The suite dom element.
 * @param {jasmine.Suite} The jasmine suite.
 */
Test.panel.TreeGrid.prototype.updateSuiteEl = function(suite, text) {
	var description = this.suitesEls[suite.id].childNodes[1];
   jasmine.Dom.setHTML(description, description.innerHTML + text);
};

/**
 * Renders spec htmlElement.
 * @param {jasmine.Spec} spec The jasmine spec.
 * @return {HTMLElement} The spec HTMLElement
 */
Test.panel.TreeGrid.prototype.addSpec = function(spec) {
    var options = {},
        padding = 18,
        suite = spec.suite,
        suffix = spec.time ? " (" + spec.time + "s)" : "",
        row, prefix, status, property, specEl, resultPanel;
        
    if (spec.isEnabled()) {
        prefix = "it ";
        status = spec.results().passed() ? "passed" : "failed";
    } else {
        prefix = "xit ";
        status = "disabled";
    }
    
    if (suite) {
        this.suitesEls[suite.id] || this.addSuite(suite);
        while(suite) {
            padding += 18;
            suite = suite.parentSuite;
        }
    }
    
    row = this.createRow(this.options.collapseAll, spec);
    for (property in this.options) {
        if (this.options.hasOwnProperty(property)) {
            options[property] = this.options[property];
        }
    }

    options.spec = spec.id;
    delete options.suite;
    
    specEl = {
        id: "spec-" + spec.id,
        cls: "spec " + status,
        style: {
            "paddingLeft": padding + "px"
        },
        children: [{
            cls: this.options.collapseAll ? "expand" : "collapse"
        },{
            tag: "span",
            cls: "description",
            html: prefix + spec.description + suffix
        }]
    };

    resultPanel = this.renderSpecResults(spec);
    if (this.options.collapseAll) {
        resultPanel.style.display = "none";
    }
    
    if (resultPanel.innerHTML === "") {
        specEl.children[0].cls = "noexpand";
    }
    
    specEl.children.push(resultPanel);
    
    specEl = new jasmine.Dom(specEl);
    this.specsEls[spec.id] = specEl;
    this.specs[spec.id] = spec;
    row.appendChild(specEl);
    jasmine.Dom.addCls(row, status);
    var clear = new jasmine.Dom({ tag: 'div' });
    clear.style.clear = 'both';
    row.appendChild(clear);
};

/**
 * Returns a suite by id.
 * @param {String/Number} id The suite id.
 * @return {jasmine.Suite} The jasmine suite.
 */
Test.panel.TreeGrid.prototype.getSuite = function(id) {
    return this.suites[parseInt(id, 10)];
};

/**
 * Returns a spec by id.
 * @param {String/Number} id The spec id.
 * @return {jasmine.Spec} The jasmine spec.
 */
Test.panel.TreeGrid.prototype.getSpec = function(id) {
    return this.specs[parseInt(id, 10)];
};

/**
 * Body elements click event dispatcher.
 */
Test.panel.TreeGrid.prototype.onBodyClick = function(event) {
    event = event || window.event;
    var el = event.target || event.srcElement,
        cls = el.className,
        i;
        
    if (cls) {
        if (jasmine.Dom.hasCls(el, "collapse")) {
            this.onCollapse(el);
            return;
        }

        if (jasmine.Dom.hasCls(el, "expand")) {
            this.onExpand(el);
            return;
        }
        if (jasmine.Dom.hasCls(el, "select-checkbox")) {
            this.onCheck(el);
            return;
        }
        for (i = 0; i < 6; i++) {
            if (cls && jasmine.Dom.hasCls(el, "row")) {
                this.onRowClick(el);
                return;
            }
            el = el.parentNode;
            if (!el) {
                break;
            }
            cls = el.className;
        }
    }
};

/**
 * Checkboxes listener.
 */
Test.panel.TreeGrid.prototype.onCheck = function(el) {
    var next = el.parentNode.nextSibling,
        id;

    if (jasmine.Dom.hasCls(next,"spec")) {
        id = parseInt(next.id.replace("spec-", ""), 10);
        if (el.checked) {
            if (jasmine.array.indexOf(this.options.specs, id) === -1) {
                this.options.specs.push(id);
            }
        } else {
            jasmine.array.remove(this.options.specs, id);
        }
    } else {
        id = parseInt(next.id.replace("suite-", ""), 10);
        if (el.checked) {
            if (jasmine.array.indexOf(this.options.suites, id) === -1) {
                this.options.suites.push(id);
            }
        } else {
            jasmine.array.remove(this.options.suites, id);
        }
    }
};

/**
 * Returns row dom element by spec or suite.
 * @param {jasmine.Suite/jasmine.Spec} o A suite or a spec.
 * @return {HTMLElement} The row dom element.
 */
Test.panel.TreeGrid.prototype.getRow = function(o) {
    if (!o.suite && this.suitesEls[o.id]) {
        return this.suitesEls[o.id].parentNode;
    } else if (this.specsEls[o.id]) {
        return this.specsEls[o.id].parentNode;
    }
};

/**
 * Iterates nested rows calling the supplied function.
 * @param {HTMLElement} row The row.
 * @param {Function} fn The function.
 * @param {Boolean} recursive recurse in all children suite (default to true)
 */
Test.panel.TreeGrid.prototype.onEachRow = function(row, fn, recursive) {
    var me = this,
        id = row.childNodes[1].id, 
        traverse = function(s, func) {
            var children = s.children_,
                i, child, length, r;
        
            if (children) {
                length = children.length;
                for (i = 0; i < length; i++) {
                    child = children[i];
                    r = me.getRow(child);
                    if (r) {
                        func.call(me, r, child);
                        if (child.children_ && recursive !== false) {
                            traverse(child, func);
                        }
                    }
                }
            }
        },
        spec, suite;
    
    if (id.search("suite") !== -1) {
        suite = this.getSuite(id.replace("suite-", ""));
        traverse(suite, fn);
    } else {
        spec = this.getSpec(id.replace("spec-", ""));
        traverse(spec, fn);
    }
};

/**
 * Collapse click handler.
 */
Test.panel.TreeGrid.prototype.onCollapse = function(el) {
    el = el.parentNode;
    jasmine.Dom.setCls(el.childNodes[0], "expand");
    
    if (jasmine.Dom.hasCls(el, "suite")) {
        this.onEachRow(el.parentNode, function(row, o) {
            var childNode = row.childNodes[1],
                icon = childNode.childNodes[0],
                content = childNode.childNodes[2];
                
            row.style.display = "none";
            if (jasmine.Dom.hasCls(icon, "collapse")) {
                jasmine.Dom.setCls(icon, "expand");
            }
            if (o.suite) {
                content.style.display = "none";
            }
        });
    } else {
        el.childNodes[2].style.display = "none";
    }
};

/**
 * Expand click handler.
 */
Test.panel.TreeGrid.prototype.onExpand = function(el) {
    el = el.parentNode;
    jasmine.Dom.setCls(el.childNodes[0], "collapse");
    
    if (jasmine.Dom.hasCls(el, "suite")) {
        this.onEachRow(el.parentNode, function(row, o) {
            row.style.display = "block";
        }, false);
    } else {
        el.childNodes[2].style.display = "block";
    }
};

/**
 * Row click click handler.
 */
Test.panel.TreeGrid.prototype.onRowClick = function(el) {
    var rows = el.parentNode.childNodes,
        length = rows.length, 
        id, i;
        
    for (i = 0; i < length; i++) {
        jasmine.Dom.removeCls(rows[i], "selected");
    }
    
    jasmine.Dom.addCls(el, "row selected");
    id = el.childNodes[1].id;
    
    if (id.search("spec") !== -1) {
        this.tabPanel.setSpec(this.getSpec(id.replace("spec-", "")));
    }
    if (id.search("suite") !== -1) {
        this.tabPanel.setSuite(this.getSuite(id.replace("suite-", "")));
    }
};

/**
 * Creates row dom element.
 * @param {Boolean} hide Sets the row visibility.
 * @param {jasmine.Suite/jasmine.Spec} The suite or the spec.
 * @return {HTMLElement} The row.
 */
Test.panel.TreeGrid.prototype.createRow = function(hide, o) {
    var row = this.body.appendChild(new jasmine.Dom({
            tag: "div",
            cls: "row",
            style: {
                display: hide ? "none" : "block" 
            },
            children: [{
                cls: "checkbox-col",
                children: [{
                    tag: "input",
                    cls: "select-checkbox",
                    type: "checkbox"
                }]
            }]

        }));
    
    if (Test.Options.isChecked(o)) {
        row.childNodes[0].childNodes[0].checked = true;
    }
        
    return row;
};

/**
 * Resizer
 */
 
/**
 * MouseDown event listener. (resizing starts)
 */
Test.panel.TreeGrid.prototype.onMouseDown = function(event) {
    var el;
    
    event = event || window.event;
    el = event.target || event.srcElement;

    if (jasmine.Dom.hasCls(el, "resizer")) {
        if (event.preventDefault) {
            event.preventDefault();
        } else {
            event.returnValue = false;
        }
        
        this.pageY = event.pageY || event.clientY;

        this.startHeight = this.tabPanel.el.clientHeight;
        document.body.style.cursor = "row-resize";
    }
};

/**
 * MouseDown event listener. (resize in progress)
 */
Test.panel.TreeGrid.prototype.onMouseMove = function(event) {
    var el, diff;
    if (this.pageY) {
        event = event || window.event;
        el = event.target || event.srcElement;
        diff = Math.max(200, this.startHeight - ((event.pageY || event.clientY)- this.pageY));
        diff = Math.min(diff, document.body.clientHeight - 200);
        
        this.tabPanel.resize(diff);
        this.options.resizer = diff;
        this.resizeBody();
    }
};

/**
 * MouseUp event listener. (resize ends)
 */
Test.panel.TreeGrid.prototype.onMouseUp = function(event) {
    document.body.style.cursor = "auto";
    delete this.pageY;
};


/**
 * Returns treegrid innerHeight.
 * @return {Number} The innerHeight.
 */
Test.panel.TreeGrid.prototype.getInnerHeight = function() {
   return (window.innerHeight || document.documentElement.clientHeight) - this.header.offsetTop * 2;
};

/**
 * Resizes treegrid.
 */
Test.panel.TreeGrid.prototype.resizeBody = function() {
    var height = this.getInnerHeight();
    
    height -= this.resizer.offsetHeight + this.tabPanel.el.offsetHeight + this.header.offsetHeight;
    height -= 2;
    height = Math.max(30, height);
    this.body.style.height = height + 'px';
};

/**
 * End of Resizer
 */
 
/**
 * Renders specs results.
 * @param {jasmine.Spec} spec The spec.
 * @return {HTMLElement} The spec results dom element.
 */
Test.panel.TreeGrid.prototype.renderSpecResults = function(spec) {
     var resultItems = spec.results().getItems(),
        length = resultItems.length,
        resultsEl,
        resultEl,
        result,
        i;
            
    resultsEl = new jasmine.Dom({
        cls: "results"   
    });
        
    for (i = 0; i < length; i++) {
        result = resultItems[i];
        if (result.type === "expect" && result.passed) {
            
            if (!result.passed()) {
                resultEl = this.renderFailedResult(result);
            } else {
                resultEl = this.renderPassedResult(result);
            }
            
            if (i === 0) {
                jasmine.Dom.addCls(resultEl, "first");
            }
            
            resultsEl.appendChild(resultEl);
            
            if (result.error) {
                break;
            }
        }
    }

    return resultsEl;
};

/**
 * Renders failed spec result.
 * @param {Object} result The spec result.
 * @return {HTMLElement} The spec result message HTMLElement
 */
Test.panel.TreeGrid.prototype.renderFailedResult = function(result) {
    var message = result.message,
        children;

    children = [{
        cls: "prettyPrint",
        html: jasmine.util.htmlEscape(message)
    }];
    
    return new jasmine.Dom({
        cls: "resultMessage fail",
        children: children
    });
};


/**
 * Renders failed spec result.
 * @param {Object} result The spec result.
 * @return {HTMLElement} The spec result message HTMLElement
 */
Test.panel.TreeGrid.prototype.renderPassedResult = function(result) {
    var children = [{
        cls: "prettyPrint",
        html: "Actual: " + jasmine.pp(result.actual) + "\nExpected: " + jasmine.pp(result.expected) + "\nMatcher: " + result.matcherName + "."
    }];
    
    return new jasmine.Dom({
        cls: "resultMessage pass",
        children: children
    });
};

/**
 * Returns tabPanel console.
 */
Test.panel.TreeGrid.prototype.getInfoPanel = function() {
    return this.tabPanel.children[0];
};

/**
 * Print a message into info console.
 * @param {String} message The message.
 * @param {String} cls (optional) an extra cls to add to the message.
 */
Test.panel.TreeGrid.prototype.log = function(message, cls) {
    this.getInfoPanel().log(message, cls);
};

/**
 * Sets statubar message, this method can also add a className.
 * @param {String} message The message.
 * @param {String} cls The className (optional).
 */ 
Test.panel.TreeGrid.prototype.setStatus = function(message, cls) {
    jasmine.Dom.setHTML(this.statusMessage, message);
    if (cls) {
        jasmine.Dom.addCls(this.statusMessage, cls);
    }
};/**
 * @class Test.Reporter
 * The Sencha Unit Tests Reporter
 */

Test.Reporter = function(config) {
    config = config || {};
    this.options = Test.Options.get();
    this.runnedSpecsCount = 0;
    this.failedSpecsCount = 0;
    this.disabledSpecsCount = 0;
    this.optionCheckBoxesEl = {};
    this.treeGrid = new Test.panel.TreeGrid({});
    
};

/**
 * Called before runner execution.
 * @param {jasmine.Runner} runner The Jasmine Runner
 */ 
Test.Reporter.prototype.reportRunnerStarting = function(runner) {
    this.runner = runner;
    this.startedAt = new Date();
    if (Test.BadGlobals) {
        Test.BadGlobals.setup();
    }
    this.logger = this.treeGrid;
    
    this.log(">> Started at " + this.startedAt.toString(), "info");
        
    if (!this.options.remote) {
        this.log(">> Warning! Because you access TestReporter locally, stack trace report isn't available.", "warning");
    }

    this.runner.filter(this.options.suites, this.options.specs);

    if (Test.BadGlobals) {
        Test.BadGlobals.report(this.logger);
    }
};


/**
 * Called after Jasmine runner execution ends.
 * @param {jasmine.Runner} runner The Jasmine Runner
 */ 
Test.Reporter.prototype.reportRunnerResults = function(runner) {
    Test.jsCoverage.updateTotal();
    this.renderResults(runner);
};

/**
 * Called before spec execution.
 * @param {jasmine.Runner} suite The Jasmine spec
 */ 
Test.Reporter.prototype.reportSuiteStarting = function(suite) {
	if (this.options.showTimings) {
		suite.startedAt = new Date();
	}
	if (Test.jsCoverage.isEnabled()) {
    	Test.jsCoverage.add(suite);
    }
};
/**
 * Called after suite execution ends.
 * @param {jasmine.Runner} suite A Jasmine suite
 */ 
Test.Reporter.prototype.reportSuiteResults = function(suite) {
    var suiteEl = this.treeGrid ? this.treeGrid.suitesEls[suite.id] : undefined,
        status;

    if (suite.isEnabled()) {
		if (this.options.showTimings) {
			suite.time =  (((new Date()).getTime() - suite.startedAt.getTime())/ 1000).toFixed(3);
		}
		
        Test.jsCoverage.update(suite);
        
        if (!suite.parentSuite && Test.BadGlobals) {
            Test.BadGlobals.report(this.logger, suite);
        }
        
        if (this.treeGrid && this.options.showPassed && !suiteEl) {
            suiteEl = this.treeGrid.addSuite(suite);
        }
        
        if (suiteEl) {
            status = suite.results().passed() ? "passed" : "failed";
            jasmine.Dom.addCls(suiteEl, status);
            jasmine.Dom.addCls(suiteEl.parentNode, status);

			if (Test.jsCoverage.isEnabled()) {
				this.treeGrid.updateSuiteEl(suite, Test.jsCoverage.getSuiteCoverage(suite));
			}
			
			if (suite.time) {
				this.treeGrid.updateSuiteEl(suite, " (" + suite.time + "s)");
			}
        }
        
    } else if (this.treeGrid && this.options.showDisabled && !suiteEl) {
        this.treeGrid.addSuite(suite);
    }
    
};

/**
 * Called before spec execution.
 * @param {jasmine.Runner} suite The Jasmine spec
 */ 
Test.Reporter.prototype.reportSpecStarting = function(spec) {
    this.currentSpec = spec;

    if (spec.isEnabled()) {
        if (this.options.showTimings) {
		    spec.startedAt = new Date();
	}
        this.treeGrid.setStatus("Running: " + jasmine.util.htmlEscape(spec.getFullName()));
    }
};

/**
 * Called after spec execution.
 * @param {jasmine.Runner} suite The Jasmine spec
 */ 
Test.Reporter.prototype.reportSpecResults = function(spec) {
    var results, status;

        if (spec.isEnabled()) {
            if (this.options.showTimings) {
			    spec.time = (((new Date()).getTime() - spec.startedAt.getTime())/ 1000).toFixed(3);
		    }
            results = spec.results();
            status = results.passed() ? "passed" : "failed";

            if(status === "failed") {
                this.failedSpecsCount = this.failedSpecsCount + 1;
            }
			
            if ((status === "failed" || this.options.showPassed) && spec.isEnabled() && this.treeGrid) {
                this.treeGrid.addSpec(spec);
            }

            Test.SandBox.save(spec);
            

            this.runnedSpecsCount = this.runnedSpecsCount + 1;
        } else {
            this.disabledSpecsCount = this.disabledSpecsCount + 1;
            if (this.treeGrid && this.options.showDisabled) {
                this.treeGrid.addSpec(spec);
            }
        }
};

/**
 * Updates runner message with failed and passed specs
 * @param {jasmine.Runner} runner The jasmine runner.
 */
Test.Reporter.prototype.renderResults = function(runner) {
    var cls = (this.failedSpecsCount > 0) ? "failed" : "passed",
        runTime,
        message;
        
    runTime = (new Date().getTime() - this.startedAt.getTime()) / 1000;

    message = this.runnedSpecsCount + " spec" +
              (this.runnedSpecsCount === 1 ? "" : "s" ) + " ran, " +
              this.failedSpecsCount + " failure" +
              (this.failedSpecsCount === 1 ? "" : "s") +
              " and " + this.disabledSpecsCount + " disabled";
                 
    message += " in " + runTime + "s";
    
    message += Test.jsCoverage.getTotal() + ".";
    
    if (this.treeGrid) {
        if (Test.SandBox.getWin()._$jscoverage) {
            this.treeGrid.tabPanel.addCoverageSummary();
        }
        this.treeGrid.setStatus(message, cls);
    }
    this.log(">> Finished at " + new Date().toString(), "info");

};

Test.Reporter.prototype.log = function() {        
    if (this.options.verbose || arguments.length === 2) {
        this.logger.log.apply(this.logger, arguments);
    }
};

Test.Reporter.prototype.getIframeContainer = function() {
    if (this.treeGrid) {
        return this.treeGrid.tabPanel.children[1].el;
    }
    return document.body;
};
