/*
  Copyright 2014 The Lovefield Project Authors. All Rights Reserved.

  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at

  http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
*/
'use strict';goog.provide("goog.Promise");
goog.require("goog.Thenable");
goog.require("goog.asserts");
goog.require("goog.async.FreeList");
goog.require("goog.async.run");
goog.require("goog.async.throwException");
goog.require("goog.debug.Error");
goog.require("goog.promise.Resolver");
goog.Promise = function(resolver, opt_context) {
  this.state_ = goog.Promise.State_.PENDING;
  this.result_ = undefined;
  this.parent_ = null;
  this.callbackEntries_ = null;
  this.callbackEntriesTail_ = null;
  this.executing_ = false;
  if (goog.Promise.UNHANDLED_REJECTION_DELAY > 0) {
    this.unhandledRejectionId_ = 0;
  } else {
    if (goog.Promise.UNHANDLED_REJECTION_DELAY == 0) {
      this.hadUnhandledRejection_ = false;
    }
  }
  if (goog.Promise.LONG_STACK_TRACES) {
    this.stack_ = [];
    this.addStackTrace_(new Error("created"));
    this.currentStep_ = 0;
  }
  if (resolver == goog.Promise.RESOLVE_FAST_PATH_) {
    this.resolve_(goog.Promise.State_.FULFILLED, opt_context);
  } else {
    try {
      var self = this;
      resolver.call(opt_context, function(value) {
        self.resolve_(goog.Promise.State_.FULFILLED, value);
      }, function(reason) {
        if (goog.DEBUG && !(reason instanceof goog.Promise.CancellationError)) {
          try {
            if (reason instanceof Error) {
              throw reason;
            } else {
              throw new Error("Promise rejected.");
            }
          } catch (e) {
          }
        }
        self.resolve_(goog.Promise.State_.REJECTED, reason);
      });
    } catch (e) {
      this.resolve_(goog.Promise.State_.REJECTED, e);
    }
  }
};
goog.define("goog.Promise.LONG_STACK_TRACES", false);
goog.define("goog.Promise.UNHANDLED_REJECTION_DELAY", 0);
goog.Promise.State_ = {PENDING:0, BLOCKED:1, FULFILLED:2, REJECTED:3};
goog.Promise.CallbackEntry_ = function() {
  this.child = null;
  this.onFulfilled = null;
  this.onRejected = null;
  this.context = null;
  this.next = null;
  this.always = false;
};
goog.Promise.CallbackEntry_.prototype.reset = function() {
  this.child = null;
  this.onFulfilled = null;
  this.onRejected = null;
  this.context = null;
  this.always = false;
};
goog.define("goog.Promise.DEFAULT_MAX_UNUSED", 100);
goog.Promise.freelist_ = new goog.async.FreeList(function() {
  return new goog.Promise.CallbackEntry_;
}, function(item) {
  item.reset();
}, goog.Promise.DEFAULT_MAX_UNUSED);
goog.Promise.getCallbackEntry_ = function(onFulfilled, onRejected, context) {
  var entry = goog.Promise.freelist_.get();
  entry.onFulfilled = onFulfilled;
  entry.onRejected = onRejected;
  entry.context = context;
  return entry;
};
goog.Promise.returnEntry_ = function(entry) {
  goog.Promise.freelist_.put(entry);
};
goog.Promise.RESOLVE_FAST_PATH_ = function() {
};
goog.Promise.resolve = function(opt_value) {
  return new goog.Promise(goog.Promise.RESOLVE_FAST_PATH_, opt_value);
};
goog.Promise.reject = function(opt_reason) {
  return new goog.Promise(function(resolve, reject) {
    reject(opt_reason);
  });
};
goog.Promise.race = function(promises) {
  return new goog.Promise(function(resolve, reject) {
    if (!promises.length) {
      resolve(undefined);
    }
    for (var i = 0, promise;promise = promises[i];i++) {
      goog.Promise.maybeThenVoid_(promise, resolve, reject);
    }
  });
};
goog.Promise.all = function(promises) {
  return new goog.Promise(function(resolve, reject) {
    var toFulfill = promises.length;
    var values = [];
    if (!toFulfill) {
      resolve(values);
      return;
    }
    var onFulfill = function(index, value) {
      toFulfill--;
      values[index] = value;
      if (toFulfill == 0) {
        resolve(values);
      }
    };
    var onReject = function(reason) {
      reject(reason);
    };
    for (var i = 0, promise;promise = promises[i];i++) {
      goog.Promise.maybeThenVoid_(promise, goog.partial(onFulfill, i), onReject);
    }
  });
};
goog.Promise.allSettled = function(promises) {
  return new goog.Promise(function(resolve, reject) {
    var toSettle = promises.length;
    var results = [];
    if (!toSettle) {
      resolve(results);
      return;
    }
    var onSettled = function(index, fulfilled, result) {
      toSettle--;
      results[index] = fulfilled ? {fulfilled:true, value:result} : {fulfilled:false, reason:result};
      if (toSettle == 0) {
        resolve(results);
      }
    };
    for (var i = 0, promise;promise = promises[i];i++) {
      goog.Promise.maybeThenVoid_(promise, goog.partial(onSettled, i, true), goog.partial(onSettled, i, false));
    }
  });
};
goog.Promise.firstFulfilled = function(promises) {
  return new goog.Promise(function(resolve, reject) {
    var toReject = promises.length;
    var reasons = [];
    if (!toReject) {
      resolve(undefined);
      return;
    }
    var onFulfill = function(value) {
      resolve(value);
    };
    var onReject = function(index, reason) {
      toReject--;
      reasons[index] = reason;
      if (toReject == 0) {
        reject(reasons);
      }
    };
    for (var i = 0, promise;promise = promises[i];i++) {
      goog.Promise.maybeThenVoid_(promise, onFulfill, goog.partial(onReject, i));
    }
  });
};
goog.Promise.withResolver = function() {
  var resolve, reject;
  var promise = new goog.Promise(function(rs, rj) {
    resolve = rs;
    reject = rj;
  });
  return new goog.Promise.Resolver_(promise, resolve, reject);
};
goog.Promise.prototype.then = function(opt_onFulfilled, opt_onRejected, opt_context) {
  if (opt_onFulfilled != null) {
    goog.asserts.assertFunction(opt_onFulfilled, "opt_onFulfilled should be a function.");
  }
  if (opt_onRejected != null) {
    goog.asserts.assertFunction(opt_onRejected, "opt_onRejected should be a function. Did you pass opt_context " + "as the second argument instead of the third?");
  }
  if (goog.Promise.LONG_STACK_TRACES) {
    this.addStackTrace_(new Error("then"));
  }
  return this.addChildPromise_(goog.isFunction(opt_onFulfilled) ? opt_onFulfilled : null, goog.isFunction(opt_onRejected) ? opt_onRejected : null, opt_context);
};
goog.Thenable.addImplementation(goog.Promise);
goog.Promise.prototype.thenVoid = function(opt_onFulfilled, opt_onRejected, opt_context) {
  if (opt_onFulfilled != null) {
    goog.asserts.assertFunction(opt_onFulfilled, "opt_onFulfilled should be a function.");
  }
  if (opt_onRejected != null) {
    goog.asserts.assertFunction(opt_onRejected, "opt_onRejected should be a function. Did you pass opt_context " + "as the second argument instead of the third?");
  }
  if (goog.Promise.LONG_STACK_TRACES) {
    this.addStackTrace_(new Error("then"));
  }
  this.addCallbackEntry_(goog.Promise.getCallbackEntry_(opt_onFulfilled || goog.nullFunction, opt_onRejected || null, opt_context));
};
goog.Promise.maybeThenVoid_ = function(promise, onFulfilled, onRejected, opt_context) {
  if (promise instanceof goog.Promise) {
    promise.thenVoid(onFulfilled, onRejected, opt_context);
  } else {
    promise.then(onFulfilled, onRejected, opt_context);
  }
};
goog.Promise.prototype.thenAlways = function(onSettled, opt_context) {
  if (goog.Promise.LONG_STACK_TRACES) {
    this.addStackTrace_(new Error("thenAlways"));
  }
  var entry = goog.Promise.getCallbackEntry_(onSettled, onSettled, opt_context);
  entry.always = true;
  this.addCallbackEntry_(entry);
  return this;
};
goog.Promise.prototype.thenCatch = function(onRejected, opt_context) {
  if (goog.Promise.LONG_STACK_TRACES) {
    this.addStackTrace_(new Error("thenCatch"));
  }
  return this.addChildPromise_(null, onRejected, opt_context);
};
goog.Promise.prototype.cancel = function(opt_message) {
  if (this.state_ == goog.Promise.State_.PENDING) {
    goog.async.run(function() {
      var err = new goog.Promise.CancellationError(opt_message);
      this.cancelInternal_(err);
    }, this);
  }
};
goog.Promise.prototype.cancelInternal_ = function(err) {
  if (this.state_ == goog.Promise.State_.PENDING) {
    if (this.parent_) {
      this.parent_.cancelChild_(this, err);
      this.parent_ = null;
    } else {
      this.resolve_(goog.Promise.State_.REJECTED, err);
    }
  }
};
goog.Promise.prototype.cancelChild_ = function(childPromise, err) {
  if (!this.callbackEntries_) {
    return;
  }
  var childCount = 0;
  var childEntry = null;
  var beforeChildEntry = null;
  for (var entry = this.callbackEntries_;entry;entry = entry.next) {
    if (!entry.always) {
      childCount++;
      if (entry.child == childPromise) {
        childEntry = entry;
      }
      if (childEntry && childCount > 1) {
        break;
      }
    }
    if (!childEntry) {
      beforeChildEntry = entry;
    }
  }
  if (childEntry) {
    if (this.state_ == goog.Promise.State_.PENDING && childCount == 1) {
      this.cancelInternal_(err);
    } else {
      if (beforeChildEntry) {
        this.removeEntryAfter_(beforeChildEntry);
      } else {
        this.popEntry_();
      }
      this.executeCallback_(childEntry, goog.Promise.State_.REJECTED, err);
    }
  }
};
goog.Promise.prototype.addCallbackEntry_ = function(callbackEntry) {
  if (!this.hasEntry_() && (this.state_ == goog.Promise.State_.FULFILLED || this.state_ == goog.Promise.State_.REJECTED)) {
    this.scheduleCallbacks_();
  }
  this.queueEntry_(callbackEntry);
};
goog.Promise.prototype.addChildPromise_ = function(onFulfilled, onRejected, opt_context) {
  var callbackEntry = goog.Promise.getCallbackEntry_(null, null, null);
  callbackEntry.child = new goog.Promise(function(resolve, reject) {
    callbackEntry.onFulfilled = onFulfilled ? function(value) {
      try {
        var result = onFulfilled.call(opt_context, value);
        resolve(result);
      } catch (err) {
        reject(err);
      }
    } : resolve;
    callbackEntry.onRejected = onRejected ? function(reason) {
      try {
        var result = onRejected.call(opt_context, reason);
        if (!goog.isDef(result) && reason instanceof goog.Promise.CancellationError) {
          reject(reason);
        } else {
          resolve(result);
        }
      } catch (err) {
        reject(err);
      }
    } : reject;
  });
  callbackEntry.child.parent_ = this;
  this.addCallbackEntry_(callbackEntry);
  return callbackEntry.child;
};
goog.Promise.prototype.unblockAndFulfill_ = function(value) {
  goog.asserts.assert(this.state_ == goog.Promise.State_.BLOCKED);
  this.state_ = goog.Promise.State_.PENDING;
  this.resolve_(goog.Promise.State_.FULFILLED, value);
};
goog.Promise.prototype.unblockAndReject_ = function(reason) {
  goog.asserts.assert(this.state_ == goog.Promise.State_.BLOCKED);
  this.state_ = goog.Promise.State_.PENDING;
  this.resolve_(goog.Promise.State_.REJECTED, reason);
};
goog.Promise.prototype.resolve_ = function(state, x) {
  if (this.state_ != goog.Promise.State_.PENDING) {
    return;
  }
  if (this == x) {
    state = goog.Promise.State_.REJECTED;
    x = new TypeError("Promise cannot resolve to itself");
  } else {
    if (goog.Thenable.isImplementedBy(x)) {
      x = (x);
      this.state_ = goog.Promise.State_.BLOCKED;
      goog.Promise.maybeThenVoid_(x, this.unblockAndFulfill_, this.unblockAndReject_, this);
      return;
    } else {
      if (goog.isObject(x)) {
        try {
          var then = x["then"];
          if (goog.isFunction(then)) {
            this.tryThen_(x, then);
            return;
          }
        } catch (e) {
          state = goog.Promise.State_.REJECTED;
          x = e;
        }
      }
    }
  }
  this.result_ = x;
  this.state_ = state;
  this.parent_ = null;
  this.scheduleCallbacks_();
  if (state == goog.Promise.State_.REJECTED && !(x instanceof goog.Promise.CancellationError)) {
    goog.Promise.addUnhandledRejection_(this, x);
  }
};
goog.Promise.prototype.tryThen_ = function(thenable, then) {
  this.state_ = goog.Promise.State_.BLOCKED;
  var promise = this;
  var called = false;
  var resolve = function(value) {
    if (!called) {
      called = true;
      promise.unblockAndFulfill_(value);
    }
  };
  var reject = function(reason) {
    if (!called) {
      called = true;
      promise.unblockAndReject_(reason);
    }
  };
  try {
    then.call(thenable, resolve, reject);
  } catch (e) {
    reject(e);
  }
};
goog.Promise.prototype.scheduleCallbacks_ = function() {
  if (!this.executing_) {
    this.executing_ = true;
    goog.async.run(this.executeCallbacks_, this);
  }
};
goog.Promise.prototype.hasEntry_ = function() {
  return !!this.callbackEntries_;
};
goog.Promise.prototype.queueEntry_ = function(entry) {
  goog.asserts.assert(entry.onFulfilled != null);
  if (this.callbackEntriesTail_) {
    this.callbackEntriesTail_.next = entry;
    this.callbackEntriesTail_ = entry;
  } else {
    this.callbackEntries_ = entry;
    this.callbackEntriesTail_ = entry;
  }
};
goog.Promise.prototype.popEntry_ = function() {
  var entry = null;
  if (this.callbackEntries_) {
    entry = this.callbackEntries_;
    this.callbackEntries_ = entry.next;
    entry.next = null;
  }
  if (!this.callbackEntries_) {
    this.callbackEntriesTail_ = null;
  }
  if (entry != null) {
    goog.asserts.assert(entry.onFulfilled != null);
  }
  return entry;
};
goog.Promise.prototype.removeEntryAfter_ = function(previous) {
  goog.asserts.assert(this.callbackEntries_);
  goog.asserts.assert(previous != null);
  if (previous.next == this.callbackEntriesTail_) {
    this.callbackEntriesTail_ = previous;
  }
  previous.next = previous.next.next;
};
goog.Promise.prototype.executeCallbacks_ = function() {
  var entry = null;
  while (entry = this.popEntry_()) {
    if (goog.Promise.LONG_STACK_TRACES) {
      this.currentStep_++;
    }
    this.executeCallback_(entry, this.state_, this.result_);
  }
  this.executing_ = false;
};
goog.Promise.prototype.executeCallback_ = function(callbackEntry, state, result) {
  if (state == goog.Promise.State_.REJECTED && callbackEntry.onRejected && !callbackEntry.always) {
    this.removeUnhandledRejection_();
  }
  if (callbackEntry.child) {
    callbackEntry.child.parent_ = null;
    goog.Promise.invokeCallback_(callbackEntry, state, result);
  } else {
    try {
      callbackEntry.always ? callbackEntry.onFulfilled.call(callbackEntry.context) : goog.Promise.invokeCallback_(callbackEntry, state, result);
    } catch (err) {
      goog.Promise.handleRejection_.call(null, err);
    }
  }
  goog.Promise.returnEntry_(callbackEntry);
};
goog.Promise.invokeCallback_ = function(callbackEntry, state, result) {
  if (state == goog.Promise.State_.FULFILLED) {
    callbackEntry.onFulfilled.call(callbackEntry.context, result);
  } else {
    if (callbackEntry.onRejected) {
      callbackEntry.onRejected.call(callbackEntry.context, result);
    }
  }
};
goog.Promise.prototype.addStackTrace_ = function(err) {
  if (goog.Promise.LONG_STACK_TRACES && goog.isString(err.stack)) {
    var trace = err.stack.split("\n", 4)[3];
    var message = err.message;
    message += Array(11 - message.length).join(" ");
    this.stack_.push(message + trace);
  }
};
goog.Promise.prototype.appendLongStack_ = function(err) {
  if (goog.Promise.LONG_STACK_TRACES && err && goog.isString(err.stack) && this.stack_.length) {
    var longTrace = ["Promise trace:"];
    for (var promise = this;promise;promise = promise.parent_) {
      for (var i = this.currentStep_;i >= 0;i--) {
        longTrace.push(promise.stack_[i]);
      }
      longTrace.push("Value: " + "[" + (promise.state_ == goog.Promise.State_.REJECTED ? "REJECTED" : "FULFILLED") + "] " + "<" + String(promise.result_) + ">");
    }
    err.stack += "\n\n" + longTrace.join("\n");
  }
};
goog.Promise.prototype.removeUnhandledRejection_ = function() {
  if (goog.Promise.UNHANDLED_REJECTION_DELAY > 0) {
    for (var p = this;p && p.unhandledRejectionId_;p = p.parent_) {
      goog.global.clearTimeout(p.unhandledRejectionId_);
      p.unhandledRejectionId_ = 0;
    }
  } else {
    if (goog.Promise.UNHANDLED_REJECTION_DELAY == 0) {
      for (var p = this;p && p.hadUnhandledRejection_;p = p.parent_) {
        p.hadUnhandledRejection_ = false;
      }
    }
  }
};
goog.Promise.addUnhandledRejection_ = function(promise, reason) {
  if (goog.Promise.UNHANDLED_REJECTION_DELAY > 0) {
    promise.unhandledRejectionId_ = goog.global.setTimeout(function() {
      promise.appendLongStack_(reason);
      goog.Promise.handleRejection_.call(null, reason);
    }, goog.Promise.UNHANDLED_REJECTION_DELAY);
  } else {
    if (goog.Promise.UNHANDLED_REJECTION_DELAY == 0) {
      promise.hadUnhandledRejection_ = true;
      goog.async.run(function() {
        if (promise.hadUnhandledRejection_) {
          promise.appendLongStack_(reason);
          goog.Promise.handleRejection_.call(null, reason);
        }
      });
    }
  }
};
goog.Promise.handleRejection_ = goog.async.throwException;
goog.Promise.setUnhandledRejectionHandler = function(handler) {
  goog.Promise.handleRejection_ = handler;
};
goog.Promise.CancellationError = function(opt_message) {
  goog.Promise.CancellationError.base(this, "constructor", opt_message);
};
goog.inherits(goog.Promise.CancellationError, goog.debug.Error);
goog.Promise.CancellationError.prototype.name = "cancel";
goog.Promise.Resolver_ = function(promise, resolve, reject) {
  this.promise = promise;
  this.resolve = resolve;
  this.reject = reject;
};
goog.provide("goog.asserts");
goog.provide("goog.asserts.AssertionError");
goog.require("goog.debug.Error");
goog.require("goog.dom.NodeType");
goog.require("goog.string");
goog.define("goog.asserts.ENABLE_ASSERTS", goog.DEBUG);
goog.asserts.AssertionError = function(messagePattern, messageArgs) {
  messageArgs.unshift(messagePattern);
  goog.debug.Error.call(this, goog.string.subs.apply(null, messageArgs));
  messageArgs.shift();
  this.messagePattern = messagePattern;
};
goog.inherits(goog.asserts.AssertionError, goog.debug.Error);
goog.asserts.AssertionError.prototype.name = "AssertionError";
goog.asserts.DEFAULT_ERROR_HANDLER = function(e) {
  throw e;
};
goog.asserts.errorHandler_ = goog.asserts.DEFAULT_ERROR_HANDLER;
goog.asserts.doAssertFailure_ = function(defaultMessage, defaultArgs, givenMessage, givenArgs) {
  var message = "Assertion failed";
  if (givenMessage) {
    message += ": " + givenMessage;
    var args = givenArgs;
  } else {
    if (defaultMessage) {
      message += ": " + defaultMessage;
      args = defaultArgs;
    }
  }
  var e = new goog.asserts.AssertionError("" + message, args || []);
  goog.asserts.errorHandler_(e);
};
goog.asserts.setErrorHandler = function(errorHandler) {
  if (goog.asserts.ENABLE_ASSERTS) {
    goog.asserts.errorHandler_ = errorHandler;
  }
};
goog.asserts.assert = function(condition, opt_message, var_args) {
  if (goog.asserts.ENABLE_ASSERTS && !condition) {
    goog.asserts.doAssertFailure_("", null, opt_message, Array.prototype.slice.call(arguments, 2));
  }
  return condition;
};
goog.asserts.fail = function(opt_message, var_args) {
  if (goog.asserts.ENABLE_ASSERTS) {
    goog.asserts.errorHandler_(new goog.asserts.AssertionError("Failure" + (opt_message ? ": " + opt_message : ""), Array.prototype.slice.call(arguments, 1)));
  }
};
goog.asserts.assertNumber = function(value, opt_message, var_args) {
  if (goog.asserts.ENABLE_ASSERTS && !goog.isNumber(value)) {
    goog.asserts.doAssertFailure_("Expected number but got %s: %s.", [goog.typeOf(value), value], opt_message, Array.prototype.slice.call(arguments, 2));
  }
  return (value);
};
goog.asserts.assertString = function(value, opt_message, var_args) {
  if (goog.asserts.ENABLE_ASSERTS && !goog.isString(value)) {
    goog.asserts.doAssertFailure_("Expected string but got %s: %s.", [goog.typeOf(value), value], opt_message, Array.prototype.slice.call(arguments, 2));
  }
  return (value);
};
goog.asserts.assertFunction = function(value, opt_message, var_args) {
  if (goog.asserts.ENABLE_ASSERTS && !goog.isFunction(value)) {
    goog.asserts.doAssertFailure_("Expected function but got %s: %s.", [goog.typeOf(value), value], opt_message, Array.prototype.slice.call(arguments, 2));
  }
  return (value);
};
goog.asserts.assertObject = function(value, opt_message, var_args) {
  if (goog.asserts.ENABLE_ASSERTS && !goog.isObject(value)) {
    goog.asserts.doAssertFailure_("Expected object but got %s: %s.", [goog.typeOf(value), value], opt_message, Array.prototype.slice.call(arguments, 2));
  }
  return (value);
};
goog.asserts.assertArray = function(value, opt_message, var_args) {
  if (goog.asserts.ENABLE_ASSERTS && !goog.isArray(value)) {
    goog.asserts.doAssertFailure_("Expected array but got %s: %s.", [goog.typeOf(value), value], opt_message, Array.prototype.slice.call(arguments, 2));
  }
  return (value);
};
goog.asserts.assertBoolean = function(value, opt_message, var_args) {
  if (goog.asserts.ENABLE_ASSERTS && !goog.isBoolean(value)) {
    goog.asserts.doAssertFailure_("Expected boolean but got %s: %s.", [goog.typeOf(value), value], opt_message, Array.prototype.slice.call(arguments, 2));
  }
  return (value);
};
goog.asserts.assertElement = function(value, opt_message, var_args) {
  if (goog.asserts.ENABLE_ASSERTS && (!goog.isObject(value) || value.nodeType != goog.dom.NodeType.ELEMENT)) {
    goog.asserts.doAssertFailure_("Expected Element but got %s: %s.", [goog.typeOf(value), value], opt_message, Array.prototype.slice.call(arguments, 2));
  }
  return (value);
};
goog.asserts.assertInstanceof = function(value, type, opt_message, var_args) {
  if (goog.asserts.ENABLE_ASSERTS && !(value instanceof type)) {
    goog.asserts.doAssertFailure_("Expected instanceof %s but got %s.", [goog.asserts.getType_(type), goog.asserts.getType_(value)], opt_message, Array.prototype.slice.call(arguments, 3));
  }
  return value;
};
goog.asserts.assertObjectPrototypeIsIntact = function() {
  for (var key in Object.prototype) {
    goog.asserts.fail(key + " should not be enumerable in Object.prototype.");
  }
};
goog.asserts.getType_ = function(value) {
  if (value instanceof Function) {
    return value.displayName || value.name || "unknown type name";
  } else {
    if (value instanceof Object) {
      return value.constructor.displayName || value.constructor.name || Object.prototype.toString.call(value);
    } else {
      return value === null ? "null" : typeof value;
    }
  }
};
goog.provide("goog.object");
goog.object.forEach = function(obj, f, opt_obj) {
  for (var key in obj) {
    f.call(opt_obj, obj[key], key, obj);
  }
};
goog.object.filter = function(obj, f, opt_obj) {
  var res = {};
  for (var key in obj) {
    if (f.call(opt_obj, obj[key], key, obj)) {
      res[key] = obj[key];
    }
  }
  return res;
};
goog.object.map = function(obj, f, opt_obj) {
  var res = {};
  for (var key in obj) {
    res[key] = f.call(opt_obj, obj[key], key, obj);
  }
  return res;
};
goog.object.some = function(obj, f, opt_obj) {
  for (var key in obj) {
    if (f.call(opt_obj, obj[key], key, obj)) {
      return true;
    }
  }
  return false;
};
goog.object.every = function(obj, f, opt_obj) {
  for (var key in obj) {
    if (!f.call(opt_obj, obj[key], key, obj)) {
      return false;
    }
  }
  return true;
};
goog.object.getCount = function(obj) {
  var rv = 0;
  for (var key in obj) {
    rv++;
  }
  return rv;
};
goog.object.getAnyKey = function(obj) {
  for (var key in obj) {
    return key;
  }
};
goog.object.getAnyValue = function(obj) {
  for (var key in obj) {
    return obj[key];
  }
};
goog.object.contains = function(obj, val) {
  return goog.object.containsValue(obj, val);
};
goog.object.getValues = function(obj) {
  var res = [];
  var i = 0;
  for (var key in obj) {
    res[i++] = obj[key];
  }
  return res;
};
goog.object.getKeys = function(obj) {
  var res = [];
  var i = 0;
  for (var key in obj) {
    res[i++] = key;
  }
  return res;
};
goog.object.getValueByKeys = function(obj, var_args) {
  var isArrayLike = goog.isArrayLike(var_args);
  var keys = isArrayLike ? var_args : arguments;
  for (var i = isArrayLike ? 0 : 1;i < keys.length;i++) {
    obj = obj[keys[i]];
    if (!goog.isDef(obj)) {
      break;
    }
  }
  return obj;
};
goog.object.containsKey = function(obj, key) {
  return key in obj;
};
goog.object.containsValue = function(obj, val) {
  for (var key in obj) {
    if (obj[key] == val) {
      return true;
    }
  }
  return false;
};
goog.object.findKey = function(obj, f, opt_this) {
  for (var key in obj) {
    if (f.call(opt_this, obj[key], key, obj)) {
      return key;
    }
  }
  return undefined;
};
goog.object.findValue = function(obj, f, opt_this) {
  var key = goog.object.findKey(obj, f, opt_this);
  return key && obj[key];
};
goog.object.isEmpty = function(obj) {
  for (var key in obj) {
    return false;
  }
  return true;
};
goog.object.clear = function(obj) {
  for (var i in obj) {
    delete obj[i];
  }
};
goog.object.remove = function(obj, key) {
  var rv;
  if (rv = key in obj) {
    delete obj[key];
  }
  return rv;
};
goog.object.add = function(obj, key, val) {
  if (key in obj) {
    throw Error('The object already contains the key "' + key + '"');
  }
  goog.object.set(obj, key, val);
};
goog.object.get = function(obj, key, opt_val) {
  if (key in obj) {
    return obj[key];
  }
  return opt_val;
};
goog.object.set = function(obj, key, value) {
  obj[key] = value;
};
goog.object.setIfUndefined = function(obj, key, value) {
  return key in obj ? obj[key] : obj[key] = value;
};
goog.object.setWithReturnValueIfNotSet = function(obj, key, f) {
  if (key in obj) {
    return obj[key];
  }
  var val = f();
  obj[key] = val;
  return val;
};
goog.object.equals = function(a, b) {
  for (var k in a) {
    if (!(k in b) || a[k] !== b[k]) {
      return false;
    }
  }
  for (var k in b) {
    if (!(k in a)) {
      return false;
    }
  }
  return true;
};
goog.object.clone = function(obj) {
  var res = {};
  for (var key in obj) {
    res[key] = obj[key];
  }
  return res;
};
goog.object.unsafeClone = function(obj) {
  var type = goog.typeOf(obj);
  if (type == "object" || type == "array") {
    if (obj.clone) {
      return obj.clone();
    }
    var clone = type == "array" ? [] : {};
    for (var key in obj) {
      clone[key] = goog.object.unsafeClone(obj[key]);
    }
    return clone;
  }
  return obj;
};
goog.object.transpose = function(obj) {
  var transposed = {};
  for (var key in obj) {
    transposed[obj[key]] = key;
  }
  return transposed;
};
goog.object.PROTOTYPE_FIELDS_ = ["constructor", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "toLocaleString", "toString", "valueOf"];
goog.object.extend = function(target, var_args) {
  var key, source;
  for (var i = 1;i < arguments.length;i++) {
    source = arguments[i];
    for (key in source) {
      target[key] = source[key];
    }
    for (var j = 0;j < goog.object.PROTOTYPE_FIELDS_.length;j++) {
      key = goog.object.PROTOTYPE_FIELDS_[j];
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }
};
goog.object.create = function(var_args) {
  var argLength = arguments.length;
  if (argLength == 1 && goog.isArray(arguments[0])) {
    return goog.object.create.apply(null, arguments[0]);
  }
  if (argLength % 2) {
    throw Error("Uneven number of arguments");
  }
  var rv = {};
  for (var i = 0;i < argLength;i += 2) {
    rv[arguments[i]] = arguments[i + 1];
  }
  return rv;
};
goog.object.createSet = function(var_args) {
  var argLength = arguments.length;
  if (argLength == 1 && goog.isArray(arguments[0])) {
    return goog.object.createSet.apply(null, arguments[0]);
  }
  var rv = {};
  for (var i = 0;i < argLength;i++) {
    rv[arguments[i]] = true;
  }
  return rv;
};
goog.object.createImmutableView = function(obj) {
  var result = obj;
  if (Object.isFrozen && !Object.isFrozen(obj)) {
    result = Object.create(obj);
    Object.freeze(result);
  }
  return result;
};
goog.object.isImmutableView = function(obj) {
  return !!Object.isFrozen && Object.isFrozen(obj);
};
goog.provide("goog.structs.Map");
goog.require("goog.iter.Iterator");
goog.require("goog.iter.StopIteration");
goog.require("goog.object");
goog.structs.Map = function(opt_map, var_args) {
  this.map_ = {};
  this.keys_ = [];
  this.count_ = 0;
  this.version_ = 0;
  var argLength = arguments.length;
  if (argLength > 1) {
    if (argLength % 2) {
      throw Error("Uneven number of arguments");
    }
    for (var i = 0;i < argLength;i += 2) {
      this.set(arguments[i], arguments[i + 1]);
    }
  } else {
    if (opt_map) {
      this.addAll((opt_map));
    }
  }
};
goog.structs.Map.prototype.getCount = function() {
  return this.count_;
};
goog.structs.Map.prototype.getValues = function() {
  this.cleanupKeysArray_();
  var rv = [];
  for (var i = 0;i < this.keys_.length;i++) {
    var key = this.keys_[i];
    rv.push(this.map_[key]);
  }
  return rv;
};
goog.structs.Map.prototype.getKeys = function() {
  this.cleanupKeysArray_();
  return (this.keys_.concat());
};
goog.structs.Map.prototype.containsKey = function(key) {
  return goog.structs.Map.hasKey_(this.map_, key);
};
goog.structs.Map.prototype.containsValue = function(val) {
  for (var i = 0;i < this.keys_.length;i++) {
    var key = this.keys_[i];
    if (goog.structs.Map.hasKey_(this.map_, key) && this.map_[key] == val) {
      return true;
    }
  }
  return false;
};
goog.structs.Map.prototype.equals = function(otherMap, opt_equalityFn) {
  if (this === otherMap) {
    return true;
  }
  if (this.count_ != otherMap.getCount()) {
    return false;
  }
  var equalityFn = opt_equalityFn || goog.structs.Map.defaultEquals;
  this.cleanupKeysArray_();
  for (var key, i = 0;key = this.keys_[i];i++) {
    if (!equalityFn(this.get(key), otherMap.get(key))) {
      return false;
    }
  }
  return true;
};
goog.structs.Map.defaultEquals = function(a, b) {
  return a === b;
};
goog.structs.Map.prototype.isEmpty = function() {
  return this.count_ == 0;
};
goog.structs.Map.prototype.clear = function() {
  this.map_ = {};
  this.keys_.length = 0;
  this.count_ = 0;
  this.version_ = 0;
};
goog.structs.Map.prototype.remove = function(key) {
  if (goog.structs.Map.hasKey_(this.map_, key)) {
    delete this.map_[key];
    this.count_--;
    this.version_++;
    if (this.keys_.length > 2 * this.count_) {
      this.cleanupKeysArray_();
    }
    return true;
  }
  return false;
};
goog.structs.Map.prototype.cleanupKeysArray_ = function() {
  if (this.count_ != this.keys_.length) {
    var srcIndex = 0;
    var destIndex = 0;
    while (srcIndex < this.keys_.length) {
      var key = this.keys_[srcIndex];
      if (goog.structs.Map.hasKey_(this.map_, key)) {
        this.keys_[destIndex++] = key;
      }
      srcIndex++;
    }
    this.keys_.length = destIndex;
  }
  if (this.count_ != this.keys_.length) {
    var seen = {};
    var srcIndex = 0;
    var destIndex = 0;
    while (srcIndex < this.keys_.length) {
      var key = this.keys_[srcIndex];
      if (!goog.structs.Map.hasKey_(seen, key)) {
        this.keys_[destIndex++] = key;
        seen[key] = 1;
      }
      srcIndex++;
    }
    this.keys_.length = destIndex;
  }
};
goog.structs.Map.prototype.get = function(key, opt_val) {
  if (goog.structs.Map.hasKey_(this.map_, key)) {
    return this.map_[key];
  }
  return opt_val;
};
goog.structs.Map.prototype.set = function(key, value) {
  if (!goog.structs.Map.hasKey_(this.map_, key)) {
    this.count_++;
    this.keys_.push(key);
    this.version_++;
  }
  this.map_[key] = value;
};
goog.structs.Map.prototype.addAll = function(map) {
  var keys, values;
  if (map instanceof goog.structs.Map) {
    keys = map.getKeys();
    values = map.getValues();
  } else {
    keys = goog.object.getKeys(map);
    values = goog.object.getValues(map);
  }
  for (var i = 0;i < keys.length;i++) {
    this.set(keys[i], values[i]);
  }
};
goog.structs.Map.prototype.forEach = function(f, opt_obj) {
  var keys = this.getKeys();
  for (var i = 0;i < keys.length;i++) {
    var key = keys[i];
    var value = this.get(key);
    f.call(opt_obj, value, key, this);
  }
};
goog.structs.Map.prototype.clone = function() {
  return new goog.structs.Map(this);
};
goog.structs.Map.prototype.transpose = function() {
  var transposed = new goog.structs.Map;
  for (var i = 0;i < this.keys_.length;i++) {
    var key = this.keys_[i];
    var value = this.map_[key];
    transposed.set(value, key);
  }
  return transposed;
};
goog.structs.Map.prototype.toObject = function() {
  this.cleanupKeysArray_();
  var obj = {};
  for (var i = 0;i < this.keys_.length;i++) {
    var key = this.keys_[i];
    obj[key] = this.map_[key];
  }
  return obj;
};
goog.structs.Map.prototype.getKeyIterator = function() {
  return this.__iterator__(true);
};
goog.structs.Map.prototype.getValueIterator = function() {
  return this.__iterator__(false);
};
goog.structs.Map.prototype.__iterator__ = function(opt_keys) {
  this.cleanupKeysArray_();
  var i = 0;
  var version = this.version_;
  var selfObj = this;
  var newIter = new goog.iter.Iterator;
  newIter.next = function() {
    if (version != selfObj.version_) {
      throw Error("The map has changed since the iterator was created");
    }
    if (i >= selfObj.keys_.length) {
      throw goog.iter.StopIteration;
    }
    var key = selfObj.keys_[i++];
    return opt_keys ? key : selfObj.map_[key];
  };
  return newIter;
};
goog.structs.Map.hasKey_ = function(obj, key) {
  return Object.prototype.hasOwnProperty.call(obj, key);
};
goog.provide("goog.structs.Set");
goog.require("goog.structs");
goog.require("goog.structs.Collection");
goog.require("goog.structs.Map");
goog.structs.Set = function(opt_values) {
  this.map_ = new goog.structs.Map;
  if (opt_values) {
    this.addAll(opt_values);
  }
};
goog.structs.Set.getKey_ = function(val) {
  var type = typeof val;
  if (type == "object" && val || type == "function") {
    return "o" + goog.getUid((val));
  } else {
    return type.substr(0, 1) + val;
  }
};
goog.structs.Set.prototype.getCount = function() {
  return this.map_.getCount();
};
goog.structs.Set.prototype.add = function(element) {
  this.map_.set(goog.structs.Set.getKey_(element), element);
};
goog.structs.Set.prototype.addAll = function(col) {
  var values = goog.structs.getValues(col);
  var l = values.length;
  for (var i = 0;i < l;i++) {
    this.add(values[i]);
  }
};
goog.structs.Set.prototype.removeAll = function(col) {
  var values = goog.structs.getValues(col);
  var l = values.length;
  for (var i = 0;i < l;i++) {
    this.remove(values[i]);
  }
};
goog.structs.Set.prototype.remove = function(element) {
  return this.map_.remove(goog.structs.Set.getKey_(element));
};
goog.structs.Set.prototype.clear = function() {
  this.map_.clear();
};
goog.structs.Set.prototype.isEmpty = function() {
  return this.map_.isEmpty();
};
goog.structs.Set.prototype.contains = function(element) {
  return this.map_.containsKey(goog.structs.Set.getKey_(element));
};
goog.structs.Set.prototype.containsAll = function(col) {
  return goog.structs.every(col, this.contains, this);
};
goog.structs.Set.prototype.intersection = function(col) {
  var result = new goog.structs.Set;
  var values = goog.structs.getValues(col);
  for (var i = 0;i < values.length;i++) {
    var value = values[i];
    if (this.contains(value)) {
      result.add(value);
    }
  }
  return result;
};
goog.structs.Set.prototype.difference = function(col) {
  var result = this.clone();
  result.removeAll(col);
  return result;
};
goog.structs.Set.prototype.getValues = function() {
  return this.map_.getValues();
};
goog.structs.Set.prototype.clone = function() {
  return new goog.structs.Set(this);
};
goog.structs.Set.prototype.equals = function(col) {
  return this.getCount() == goog.structs.getCount(col) && this.isSubsetOf(col);
};
goog.structs.Set.prototype.isSubsetOf = function(col) {
  var colCount = goog.structs.getCount(col);
  if (this.getCount() > colCount) {
    return false;
  }
  if (!(col instanceof goog.structs.Set) && colCount > 5) {
    col = new goog.structs.Set(col);
  }
  return goog.structs.every(this, function(value) {
    return goog.structs.contains(col, value);
  });
};
goog.structs.Set.prototype.__iterator__ = function(opt_keys) {
  return this.map_.__iterator__(false);
};
goog.provide("goog.math");
goog.require("goog.array");
goog.require("goog.asserts");
goog.math.randomInt = function(a) {
  return Math.floor(Math.random() * a);
};
goog.math.uniformRandom = function(a, b) {
  return a + Math.random() * (b - a);
};
goog.math.clamp = function(value, min, max) {
  return Math.min(Math.max(value, min), max);
};
goog.math.modulo = function(a, b) {
  var r = a % b;
  return r * b < 0 ? r + b : r;
};
goog.math.lerp = function(a, b, x) {
  return a + x * (b - a);
};
goog.math.nearlyEquals = function(a, b, opt_tolerance) {
  return Math.abs(a - b) <= (opt_tolerance || 1E-6);
};
goog.math.standardAngle = function(angle) {
  return goog.math.modulo(angle, 360);
};
goog.math.standardAngleInRadians = function(angle) {
  return goog.math.modulo(angle, 2 * Math.PI);
};
goog.math.toRadians = function(angleDegrees) {
  return angleDegrees * Math.PI / 180;
};
goog.math.toDegrees = function(angleRadians) {
  return angleRadians * 180 / Math.PI;
};
goog.math.angleDx = function(degrees, radius) {
  return radius * Math.cos(goog.math.toRadians(degrees));
};
goog.math.angleDy = function(degrees, radius) {
  return radius * Math.sin(goog.math.toRadians(degrees));
};
goog.math.angle = function(x1, y1, x2, y2) {
  return goog.math.standardAngle(goog.math.toDegrees(Math.atan2(y2 - y1, x2 - x1)));
};
goog.math.angleDifference = function(startAngle, endAngle) {
  var d = goog.math.standardAngle(endAngle) - goog.math.standardAngle(startAngle);
  if (d > 180) {
    d = d - 360;
  } else {
    if (d <= -180) {
      d = 360 + d;
    }
  }
  return d;
};
goog.math.sign = function(x) {
  return x == 0 ? 0 : x < 0 ? -1 : 1;
};
goog.math.longestCommonSubsequence = function(array1, array2, opt_compareFn, opt_collectorFn) {
  var compare = opt_compareFn || function(a, b) {
    return a == b;
  };
  var collect = opt_collectorFn || function(i1, i2) {
    return array1[i1];
  };
  var length1 = array1.length;
  var length2 = array2.length;
  var arr = [];
  for (var i = 0;i < length1 + 1;i++) {
    arr[i] = [];
    arr[i][0] = 0;
  }
  for (var j = 0;j < length2 + 1;j++) {
    arr[0][j] = 0;
  }
  for (i = 1;i <= length1;i++) {
    for (j = 1;j <= length2;j++) {
      if (compare(array1[i - 1], array2[j - 1])) {
        arr[i][j] = arr[i - 1][j - 1] + 1;
      } else {
        arr[i][j] = Math.max(arr[i - 1][j], arr[i][j - 1]);
      }
    }
  }
  var result = [];
  var i = length1, j = length2;
  while (i > 0 && j > 0) {
    if (compare(array1[i - 1], array2[j - 1])) {
      result.unshift(collect(i - 1, j - 1));
      i--;
      j--;
    } else {
      if (arr[i - 1][j] > arr[i][j - 1]) {
        i--;
      } else {
        j--;
      }
    }
  }
  return result;
};
goog.math.sum = function(var_args) {
  return (goog.array.reduce(arguments, function(sum, value) {
    return sum + value;
  }, 0));
};
goog.math.average = function(var_args) {
  return goog.math.sum.apply(null, arguments) / arguments.length;
};
goog.math.sampleVariance = function(var_args) {
  var sampleSize = arguments.length;
  if (sampleSize < 2) {
    return 0;
  }
  var mean = goog.math.average.apply(null, arguments);
  var variance = goog.math.sum.apply(null, goog.array.map(arguments, function(val) {
    return Math.pow(val - mean, 2);
  })) / (sampleSize - 1);
  return variance;
};
goog.math.standardDeviation = function(var_args) {
  return Math.sqrt(goog.math.sampleVariance.apply(null, arguments));
};
goog.math.isInt = function(num) {
  return isFinite(num) && num % 1 == 0;
};
goog.math.isFiniteNumber = function(num) {
  return isFinite(num) && !isNaN(num);
};
goog.math.log10Floor = function(num) {
  if (num > 0) {
    var x = Math.round(Math.log(num) * Math.LOG10E);
    return x - (parseFloat("1e" + x) > num);
  }
  return num == 0 ? -Infinity : NaN;
};
goog.math.safeFloor = function(num, opt_epsilon) {
  goog.asserts.assert(!goog.isDef(opt_epsilon) || opt_epsilon > 0);
  return Math.floor(num + (opt_epsilon || 2E-15));
};
goog.math.safeCeil = function(num, opt_epsilon) {
  goog.asserts.assert(!goog.isDef(opt_epsilon) || opt_epsilon > 0);
  return Math.ceil(num - (opt_epsilon || 2E-15));
};
goog.provide("goog.array");
goog.provide("goog.array.ArrayLike");
goog.require("goog.asserts");
goog.define("goog.NATIVE_ARRAY_PROTOTYPES", goog.TRUSTED_SITE);
goog.define("goog.array.ASSUME_NATIVE_FUNCTIONS", false);
goog.array.ArrayLike;
goog.array.peek = function(array) {
  return array[array.length - 1];
};
goog.array.last = goog.array.peek;
goog.array.ARRAY_PROTOTYPE_ = Array.prototype;
goog.array.indexOf = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || goog.array.ARRAY_PROTOTYPE_.indexOf) ? function(arr, obj, opt_fromIndex) {
  goog.asserts.assert(arr.length != null);
  return goog.array.ARRAY_PROTOTYPE_.indexOf.call(arr, obj, opt_fromIndex);
} : function(arr, obj, opt_fromIndex) {
  var fromIndex = opt_fromIndex == null ? 0 : opt_fromIndex < 0 ? Math.max(0, arr.length + opt_fromIndex) : opt_fromIndex;
  if (goog.isString(arr)) {
    if (!goog.isString(obj) || obj.length != 1) {
      return -1;
    }
    return arr.indexOf(obj, fromIndex);
  }
  for (var i = fromIndex;i < arr.length;i++) {
    if (i in arr && arr[i] === obj) {
      return i;
    }
  }
  return -1;
};
goog.array.lastIndexOf = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || goog.array.ARRAY_PROTOTYPE_.lastIndexOf) ? function(arr, obj, opt_fromIndex) {
  goog.asserts.assert(arr.length != null);
  var fromIndex = opt_fromIndex == null ? arr.length - 1 : opt_fromIndex;
  return goog.array.ARRAY_PROTOTYPE_.lastIndexOf.call(arr, obj, fromIndex);
} : function(arr, obj, opt_fromIndex) {
  var fromIndex = opt_fromIndex == null ? arr.length - 1 : opt_fromIndex;
  if (fromIndex < 0) {
    fromIndex = Math.max(0, arr.length + fromIndex);
  }
  if (goog.isString(arr)) {
    if (!goog.isString(obj) || obj.length != 1) {
      return -1;
    }
    return arr.lastIndexOf(obj, fromIndex);
  }
  for (var i = fromIndex;i >= 0;i--) {
    if (i in arr && arr[i] === obj) {
      return i;
    }
  }
  return -1;
};
goog.array.forEach = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || goog.array.ARRAY_PROTOTYPE_.forEach) ? function(arr, f, opt_obj) {
  goog.asserts.assert(arr.length != null);
  goog.array.ARRAY_PROTOTYPE_.forEach.call(arr, f, opt_obj);
} : function(arr, f, opt_obj) {
  var l = arr.length;
  var arr2 = goog.isString(arr) ? arr.split("") : arr;
  for (var i = 0;i < l;i++) {
    if (i in arr2) {
      f.call(opt_obj, arr2[i], i, arr);
    }
  }
};
goog.array.forEachRight = function(arr, f, opt_obj) {
  var l = arr.length;
  var arr2 = goog.isString(arr) ? arr.split("") : arr;
  for (var i = l - 1;i >= 0;--i) {
    if (i in arr2) {
      f.call(opt_obj, arr2[i], i, arr);
    }
  }
};
goog.array.filter = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || goog.array.ARRAY_PROTOTYPE_.filter) ? function(arr, f, opt_obj) {
  goog.asserts.assert(arr.length != null);
  return goog.array.ARRAY_PROTOTYPE_.filter.call(arr, f, opt_obj);
} : function(arr, f, opt_obj) {
  var l = arr.length;
  var res = [];
  var resLength = 0;
  var arr2 = goog.isString(arr) ? arr.split("") : arr;
  for (var i = 0;i < l;i++) {
    if (i in arr2) {
      var val = arr2[i];
      if (f.call(opt_obj, val, i, arr)) {
        res[resLength++] = val;
      }
    }
  }
  return res;
};
goog.array.map = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || goog.array.ARRAY_PROTOTYPE_.map) ? function(arr, f, opt_obj) {
  goog.asserts.assert(arr.length != null);
  return goog.array.ARRAY_PROTOTYPE_.map.call(arr, f, opt_obj);
} : function(arr, f, opt_obj) {
  var l = arr.length;
  var res = new Array(l);
  var arr2 = goog.isString(arr) ? arr.split("") : arr;
  for (var i = 0;i < l;i++) {
    if (i in arr2) {
      res[i] = f.call(opt_obj, arr2[i], i, arr);
    }
  }
  return res;
};
goog.array.reduce = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || goog.array.ARRAY_PROTOTYPE_.reduce) ? function(arr, f, val, opt_obj) {
  goog.asserts.assert(arr.length != null);
  if (opt_obj) {
    f = goog.bind(f, opt_obj);
  }
  return goog.array.ARRAY_PROTOTYPE_.reduce.call(arr, f, val);
} : function(arr, f, val, opt_obj) {
  var rval = val;
  goog.array.forEach(arr, function(val, index) {
    rval = f.call(opt_obj, rval, val, index, arr);
  });
  return rval;
};
goog.array.reduceRight = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || goog.array.ARRAY_PROTOTYPE_.reduceRight) ? function(arr, f, val, opt_obj) {
  goog.asserts.assert(arr.length != null);
  if (opt_obj) {
    f = goog.bind(f, opt_obj);
  }
  return goog.array.ARRAY_PROTOTYPE_.reduceRight.call(arr, f, val);
} : function(arr, f, val, opt_obj) {
  var rval = val;
  goog.array.forEachRight(arr, function(val, index) {
    rval = f.call(opt_obj, rval, val, index, arr);
  });
  return rval;
};
goog.array.some = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || goog.array.ARRAY_PROTOTYPE_.some) ? function(arr, f, opt_obj) {
  goog.asserts.assert(arr.length != null);
  return goog.array.ARRAY_PROTOTYPE_.some.call(arr, f, opt_obj);
} : function(arr, f, opt_obj) {
  var l = arr.length;
  var arr2 = goog.isString(arr) ? arr.split("") : arr;
  for (var i = 0;i < l;i++) {
    if (i in arr2 && f.call(opt_obj, arr2[i], i, arr)) {
      return true;
    }
  }
  return false;
};
goog.array.every = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || goog.array.ARRAY_PROTOTYPE_.every) ? function(arr, f, opt_obj) {
  goog.asserts.assert(arr.length != null);
  return goog.array.ARRAY_PROTOTYPE_.every.call(arr, f, opt_obj);
} : function(arr, f, opt_obj) {
  var l = arr.length;
  var arr2 = goog.isString(arr) ? arr.split("") : arr;
  for (var i = 0;i < l;i++) {
    if (i in arr2 && !f.call(opt_obj, arr2[i], i, arr)) {
      return false;
    }
  }
  return true;
};
goog.array.count = function(arr, f, opt_obj) {
  var count = 0;
  goog.array.forEach(arr, function(element, index, arr) {
    if (f.call(opt_obj, element, index, arr)) {
      ++count;
    }
  }, opt_obj);
  return count;
};
goog.array.find = function(arr, f, opt_obj) {
  var i = goog.array.findIndex(arr, f, opt_obj);
  return i < 0 ? null : goog.isString(arr) ? arr.charAt(i) : arr[i];
};
goog.array.findIndex = function(arr, f, opt_obj) {
  var l = arr.length;
  var arr2 = goog.isString(arr) ? arr.split("") : arr;
  for (var i = 0;i < l;i++) {
    if (i in arr2 && f.call(opt_obj, arr2[i], i, arr)) {
      return i;
    }
  }
  return -1;
};
goog.array.findRight = function(arr, f, opt_obj) {
  var i = goog.array.findIndexRight(arr, f, opt_obj);
  return i < 0 ? null : goog.isString(arr) ? arr.charAt(i) : arr[i];
};
goog.array.findIndexRight = function(arr, f, opt_obj) {
  var l = arr.length;
  var arr2 = goog.isString(arr) ? arr.split("") : arr;
  for (var i = l - 1;i >= 0;i--) {
    if (i in arr2 && f.call(opt_obj, arr2[i], i, arr)) {
      return i;
    }
  }
  return -1;
};
goog.array.contains = function(arr, obj) {
  return goog.array.indexOf(arr, obj) >= 0;
};
goog.array.isEmpty = function(arr) {
  return arr.length == 0;
};
goog.array.clear = function(arr) {
  if (!goog.isArray(arr)) {
    for (var i = arr.length - 1;i >= 0;i--) {
      delete arr[i];
    }
  }
  arr.length = 0;
};
goog.array.insert = function(arr, obj) {
  if (!goog.array.contains(arr, obj)) {
    arr.push(obj);
  }
};
goog.array.insertAt = function(arr, obj, opt_i) {
  goog.array.splice(arr, opt_i, 0, obj);
};
goog.array.insertArrayAt = function(arr, elementsToAdd, opt_i) {
  goog.partial(goog.array.splice, arr, opt_i, 0).apply(null, elementsToAdd);
};
goog.array.insertBefore = function(arr, obj, opt_obj2) {
  var i;
  if (arguments.length == 2 || (i = goog.array.indexOf(arr, opt_obj2)) < 0) {
    arr.push(obj);
  } else {
    goog.array.insertAt(arr, obj, i);
  }
};
goog.array.remove = function(arr, obj) {
  var i = goog.array.indexOf(arr, obj);
  var rv;
  if (rv = i >= 0) {
    goog.array.removeAt(arr, i);
  }
  return rv;
};
goog.array.removeAt = function(arr, i) {
  goog.asserts.assert(arr.length != null);
  return goog.array.ARRAY_PROTOTYPE_.splice.call(arr, i, 1).length == 1;
};
goog.array.removeIf = function(arr, f, opt_obj) {
  var i = goog.array.findIndex(arr, f, opt_obj);
  if (i >= 0) {
    goog.array.removeAt(arr, i);
    return true;
  }
  return false;
};
goog.array.removeAllIf = function(arr, f, opt_obj) {
  var removedCount = 0;
  goog.array.forEachRight(arr, function(val, index) {
    if (f.call(opt_obj, val, index, arr)) {
      if (goog.array.removeAt(arr, index)) {
        removedCount++;
      }
    }
  });
  return removedCount;
};
goog.array.concat = function(var_args) {
  return goog.array.ARRAY_PROTOTYPE_.concat.apply(goog.array.ARRAY_PROTOTYPE_, arguments);
};
goog.array.join = function(var_args) {
  return goog.array.ARRAY_PROTOTYPE_.concat.apply(goog.array.ARRAY_PROTOTYPE_, arguments);
};
goog.array.toArray = function(object) {
  var length = object.length;
  if (length > 0) {
    var rv = new Array(length);
    for (var i = 0;i < length;i++) {
      rv[i] = object[i];
    }
    return rv;
  }
  return [];
};
goog.array.clone = goog.array.toArray;
goog.array.extend = function(arr1, var_args) {
  for (var i = 1;i < arguments.length;i++) {
    var arr2 = arguments[i];
    if (goog.isArrayLike(arr2)) {
      var len1 = arr1.length || 0;
      var len2 = arr2.length || 0;
      arr1.length = len1 + len2;
      for (var j = 0;j < len2;j++) {
        arr1[len1 + j] = arr2[j];
      }
    } else {
      arr1.push(arr2);
    }
  }
};
goog.array.splice = function(arr, index, howMany, var_args) {
  goog.asserts.assert(arr.length != null);
  return goog.array.ARRAY_PROTOTYPE_.splice.apply(arr, goog.array.slice(arguments, 1));
};
goog.array.slice = function(arr, start, opt_end) {
  goog.asserts.assert(arr.length != null);
  if (arguments.length <= 2) {
    return goog.array.ARRAY_PROTOTYPE_.slice.call(arr, start);
  } else {
    return goog.array.ARRAY_PROTOTYPE_.slice.call(arr, start, opt_end);
  }
};
goog.array.removeDuplicates = function(arr, opt_rv, opt_hashFn) {
  var returnArray = opt_rv || arr;
  var defaultHashFn = function(item) {
    return goog.isObject(current) ? "o" + goog.getUid(current) : (typeof current).charAt(0) + current;
  };
  var hashFn = opt_hashFn || defaultHashFn;
  var seen = {}, cursorInsert = 0, cursorRead = 0;
  while (cursorRead < arr.length) {
    var current = arr[cursorRead++];
    var key = hashFn(current);
    if (!Object.prototype.hasOwnProperty.call(seen, key)) {
      seen[key] = true;
      returnArray[cursorInsert++] = current;
    }
  }
  returnArray.length = cursorInsert;
};
goog.array.binarySearch = function(arr, target, opt_compareFn) {
  return goog.array.binarySearch_(arr, opt_compareFn || goog.array.defaultCompare, false, target);
};
goog.array.binarySelect = function(arr, evaluator, opt_obj) {
  return goog.array.binarySearch_(arr, evaluator, true, undefined, opt_obj);
};
goog.array.binarySearch_ = function(arr, compareFn, isEvaluator, opt_target, opt_selfObj) {
  var left = 0;
  var right = arr.length;
  var found;
  while (left < right) {
    var middle = left + right >> 1;
    var compareResult;
    if (isEvaluator) {
      compareResult = compareFn.call(opt_selfObj, arr[middle], middle, arr);
    } else {
      compareResult = compareFn(opt_target, arr[middle]);
    }
    if (compareResult > 0) {
      left = middle + 1;
    } else {
      right = middle;
      found = !compareResult;
    }
  }
  return found ? left : ~left;
};
goog.array.sort = function(arr, opt_compareFn) {
  arr.sort(opt_compareFn || goog.array.defaultCompare);
};
goog.array.stableSort = function(arr, opt_compareFn) {
  for (var i = 0;i < arr.length;i++) {
    arr[i] = {index:i, value:arr[i]};
  }
  var valueCompareFn = opt_compareFn || goog.array.defaultCompare;
  function stableCompareFn(obj1, obj2) {
    return valueCompareFn(obj1.value, obj2.value) || obj1.index - obj2.index;
  }
  goog.array.sort(arr, stableCompareFn);
  for (var i = 0;i < arr.length;i++) {
    arr[i] = arr[i].value;
  }
};
goog.array.sortByKey = function(arr, keyFn, opt_compareFn) {
  var keyCompareFn = opt_compareFn || goog.array.defaultCompare;
  goog.array.sort(arr, function(a, b) {
    return keyCompareFn(keyFn(a), keyFn(b));
  });
};
goog.array.sortObjectsByKey = function(arr, key, opt_compareFn) {
  goog.array.sortByKey(arr, function(obj) {
    return obj[key];
  }, opt_compareFn);
};
goog.array.isSorted = function(arr, opt_compareFn, opt_strict) {
  var compare = opt_compareFn || goog.array.defaultCompare;
  for (var i = 1;i < arr.length;i++) {
    var compareResult = compare(arr[i - 1], arr[i]);
    if (compareResult > 0 || compareResult == 0 && opt_strict) {
      return false;
    }
  }
  return true;
};
goog.array.equals = function(arr1, arr2, opt_equalsFn) {
  if (!goog.isArrayLike(arr1) || !goog.isArrayLike(arr2) || arr1.length != arr2.length) {
    return false;
  }
  var l = arr1.length;
  var equalsFn = opt_equalsFn || goog.array.defaultCompareEquality;
  for (var i = 0;i < l;i++) {
    if (!equalsFn(arr1[i], arr2[i])) {
      return false;
    }
  }
  return true;
};
goog.array.compare3 = function(arr1, arr2, opt_compareFn) {
  var compare = opt_compareFn || goog.array.defaultCompare;
  var l = Math.min(arr1.length, arr2.length);
  for (var i = 0;i < l;i++) {
    var result = compare(arr1[i], arr2[i]);
    if (result != 0) {
      return result;
    }
  }
  return goog.array.defaultCompare(arr1.length, arr2.length);
};
goog.array.defaultCompare = function(a, b) {
  return a > b ? 1 : a < b ? -1 : 0;
};
goog.array.inverseDefaultCompare = function(a, b) {
  return -goog.array.defaultCompare(a, b);
};
goog.array.defaultCompareEquality = function(a, b) {
  return a === b;
};
goog.array.binaryInsert = function(array, value, opt_compareFn) {
  var index = goog.array.binarySearch(array, value, opt_compareFn);
  if (index < 0) {
    goog.array.insertAt(array, value, -(index + 1));
    return true;
  }
  return false;
};
goog.array.binaryRemove = function(array, value, opt_compareFn) {
  var index = goog.array.binarySearch(array, value, opt_compareFn);
  return index >= 0 ? goog.array.removeAt(array, index) : false;
};
goog.array.bucket = function(array, sorter, opt_obj) {
  var buckets = {};
  for (var i = 0;i < array.length;i++) {
    var value = array[i];
    var key = sorter.call(opt_obj, value, i, array);
    if (goog.isDef(key)) {
      var bucket = buckets[key] || (buckets[key] = []);
      bucket.push(value);
    }
  }
  return buckets;
};
goog.array.toObject = function(arr, keyFunc, opt_obj) {
  var ret = {};
  goog.array.forEach(arr, function(element, index) {
    ret[keyFunc.call(opt_obj, element, index, arr)] = element;
  });
  return ret;
};
goog.array.range = function(startOrEnd, opt_end, opt_step) {
  var array = [];
  var start = 0;
  var end = startOrEnd;
  var step = opt_step || 1;
  if (opt_end !== undefined) {
    start = startOrEnd;
    end = opt_end;
  }
  if (step * (end - start) < 0) {
    return [];
  }
  if (step > 0) {
    for (var i = start;i < end;i += step) {
      array.push(i);
    }
  } else {
    for (var i = start;i > end;i += step) {
      array.push(i);
    }
  }
  return array;
};
goog.array.repeat = function(value, n) {
  var array = [];
  for (var i = 0;i < n;i++) {
    array[i] = value;
  }
  return array;
};
goog.array.flatten = function(var_args) {
  var CHUNK_SIZE = 8192;
  var result = [];
  for (var i = 0;i < arguments.length;i++) {
    var element = arguments[i];
    if (goog.isArray(element)) {
      for (var c = 0;c < element.length;c += CHUNK_SIZE) {
        var chunk = goog.array.slice(element, c, c + CHUNK_SIZE);
        var recurseResult = goog.array.flatten.apply(null, chunk);
        for (var r = 0;r < recurseResult.length;r++) {
          result.push(recurseResult[r]);
        }
      }
    } else {
      result.push(element);
    }
  }
  return result;
};
goog.array.rotate = function(array, n) {
  goog.asserts.assert(array.length != null);
  if (array.length) {
    n %= array.length;
    if (n > 0) {
      goog.array.ARRAY_PROTOTYPE_.unshift.apply(array, array.splice(-n, n));
    } else {
      if (n < 0) {
        goog.array.ARRAY_PROTOTYPE_.push.apply(array, array.splice(0, -n));
      }
    }
  }
  return array;
};
goog.array.moveItem = function(arr, fromIndex, toIndex) {
  goog.asserts.assert(fromIndex >= 0 && fromIndex < arr.length);
  goog.asserts.assert(toIndex >= 0 && toIndex < arr.length);
  var removedItems = goog.array.ARRAY_PROTOTYPE_.splice.call(arr, fromIndex, 1);
  goog.array.ARRAY_PROTOTYPE_.splice.call(arr, toIndex, 0, removedItems[0]);
};
goog.array.zip = function(var_args) {
  if (!arguments.length) {
    return [];
  }
  var result = [];
  for (var i = 0;true;i++) {
    var value = [];
    for (var j = 0;j < arguments.length;j++) {
      var arr = arguments[j];
      if (i >= arr.length) {
        return result;
      }
      value.push(arr[i]);
    }
    result.push(value);
  }
};
goog.array.shuffle = function(arr, opt_randFn) {
  var randFn = opt_randFn || Math.random;
  for (var i = arr.length - 1;i > 0;i--) {
    var j = Math.floor(randFn() * (i + 1));
    var tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
  }
};
goog.array.copyByIndex = function(arr, index_arr) {
  var result = [];
  goog.array.forEach(index_arr, function(index) {
    result.push(arr[index]);
  });
  return result;
};
goog.provide("goog.labs.structs.Multimap");
goog.require("goog.array");
goog.require("goog.labs.object");
goog.require("goog.labs.structs.Map");
goog.labs.structs.Multimap = function() {
  this.clear();
};
goog.labs.structs.Multimap.prototype.map_;
goog.labs.structs.Multimap.prototype.count_ = 0;
goog.labs.structs.Multimap.prototype.clear = function() {
  this.count_ = 0;
  this.map_ = new goog.labs.structs.Map;
};
goog.labs.structs.Multimap.prototype.clone = function() {
  var map = new goog.labs.structs.Multimap;
  map.addAllFromMultimap(this);
  return map;
};
goog.labs.structs.Multimap.prototype.add = function(key, value) {
  var values = this.map_.get(key);
  if (!values) {
    this.map_.set(key, values = []);
  }
  values.push(value);
  this.count_++;
};
goog.labs.structs.Multimap.prototype.addAllValues = function(key, values) {
  goog.array.forEach(values, function(v) {
    this.add(key, v);
  }, this);
};
goog.labs.structs.Multimap.prototype.addAllFromMultimap = function(map) {
  goog.array.forEach(map.getEntries(), function(entry) {
    this.add(entry[0], entry[1]);
  }, this);
};
goog.labs.structs.Multimap.prototype.replaceValues = function(key, values) {
  this.removeAll(key);
  this.addAllValues(key, values);
};
goog.labs.structs.Multimap.prototype.get = function(key) {
  var values = (this.map_.get(key));
  return values ? goog.array.clone(values) : [];
};
goog.labs.structs.Multimap.prototype.remove = function(key, value) {
  var values = (this.map_.get(key));
  if (!values) {
    return false;
  }
  var removed = goog.array.removeIf(values, function(v) {
    return goog.labs.object.is(value, v);
  });
  if (removed) {
    this.count_--;
    if (values.length == 0) {
      this.map_.remove(key);
    }
  }
  return removed;
};
goog.labs.structs.Multimap.prototype.removeAll = function(key) {
  var values = this.map_.get(key);
  if (this.map_.remove(key)) {
    this.count_ -= values.length;
    return true;
  }
  return false;
};
goog.labs.structs.Multimap.prototype.isEmpty = function() {
  return !this.count_;
};
goog.labs.structs.Multimap.prototype.getCount = function() {
  return this.count_;
};
goog.labs.structs.Multimap.prototype.containsEntry = function(key, value) {
  var values = (this.map_.get(key));
  if (!values) {
    return false;
  }
  var index = goog.array.findIndex(values, function(v) {
    return goog.labs.object.is(v, value);
  });
  return index >= 0;
};
goog.labs.structs.Multimap.prototype.containsKey = function(key) {
  return this.map_.containsKey(key);
};
goog.labs.structs.Multimap.prototype.containsValue = function(value) {
  return goog.array.some(this.map_.getValues(), function(values) {
    return goog.array.some((values), function(v) {
      return goog.labs.object.is(v, value);
    });
  });
};
goog.labs.structs.Multimap.prototype.getKeys = function() {
  return this.map_.getKeys();
};
goog.labs.structs.Multimap.prototype.getValues = function() {
  return goog.array.flatten(this.map_.getValues());
};
goog.labs.structs.Multimap.prototype.getEntries = function() {
  var keys = this.getKeys();
  var entries = [];
  for (var i = 0;i < keys.length;i++) {
    var key = keys[i];
    var values = this.get(key);
    for (var j = 0;j < values.length;j++) {
      entries.push([key, values[j]]);
    }
  }
  return entries;
};
goog.provide("goog.structs.TreeNode");
goog.require("goog.array");
goog.require("goog.asserts");
goog.require("goog.structs.Node");
goog.structs.TreeNode = function(key, value) {
  goog.structs.Node.call(this, key, value);
  this.parent_ = null;
  this.children_ = null;
};
goog.inherits(goog.structs.TreeNode, goog.structs.Node);
goog.structs.TreeNode.EMPTY_ARRAY_ = [];
goog.structs.TreeNode.prototype.clone = function() {
  return new goog.structs.TreeNode(this.getKey(), this.getValue());
};
goog.structs.TreeNode.prototype.deepClone = function() {
  var clone = this.clone();
  this.forEachChild(function(child) {
    clone.addChild(child.deepClone());
  });
  return clone;
};
goog.structs.TreeNode.prototype.getParent = function() {
  return this.parent_;
};
goog.structs.TreeNode.prototype.isLeaf = function() {
  return !this.getChildCount();
};
goog.structs.TreeNode.prototype.isLastChild = function() {
  var parent = this.getParent();
  return Boolean(parent && this == goog.array.peek(parent.getChildren()));
};
goog.structs.TreeNode.prototype.getChildren = function() {
  return this.children_ || goog.structs.TreeNode.EMPTY_ARRAY_;
};
goog.structs.TreeNode.prototype.getChildAt = function(index) {
  return this.getChildren()[index] || null;
};
goog.structs.TreeNode.prototype.getChildCount = function() {
  return this.getChildren().length;
};
goog.structs.TreeNode.prototype.getDepth = function() {
  var depth = 0;
  var node = this;
  while (node.getParent()) {
    depth++;
    node = node.getParent();
  }
  return depth;
};
goog.structs.TreeNode.prototype.getAncestors = function() {
  var ancestors = [];
  var node = this.getParent();
  while (node) {
    ancestors.push(node);
    node = node.getParent();
  }
  return ancestors;
};
goog.structs.TreeNode.prototype.getRoot = function() {
  var root = this;
  while (root.getParent()) {
    root = root.getParent();
  }
  return root;
};
goog.structs.TreeNode.prototype.getSubtreeKeys = function() {
  var ret = [];
  this.forEachChild(function(child) {
    ret.push(child.getKey());
    if (!child.isLeaf()) {
      ret.push(child.getSubtreeKeys());
    }
  });
  return ret;
};
goog.structs.TreeNode.prototype.contains = function(node) {
  var current = node;
  do {
    current = current.getParent();
  } while (current && current != this);
  return Boolean(current);
};
goog.structs.TreeNode.findCommonAncestor = function(var_args) {
  var ret = arguments[0];
  if (!ret) {
    return null;
  }
  var retDepth = ret.getDepth();
  for (var i = 1;i < arguments.length;i++) {
    var node = arguments[i];
    var depth = node.getDepth();
    while (node != ret) {
      if (depth <= retDepth) {
        ret = ret.getParent();
        retDepth--;
      }
      if (depth > retDepth) {
        node = node.getParent();
        depth--;
      }
    }
  }
  return ret;
};
goog.structs.TreeNode.prototype.getNodeByKey = function(key) {
  if (this.getKey() == key) {
    return this;
  }
  var children = this.getChildren();
  for (var i = 0;i < children.length;i++) {
    var descendant = children[i].getNodeByKey(key);
    if (descendant) {
      return descendant;
    }
  }
  return null;
};
goog.structs.TreeNode.prototype.forEachChild = function(f, opt_this) {
  goog.array.forEach(this.getChildren(), f, opt_this);
};
goog.structs.TreeNode.prototype.forEachDescendant = function(f, opt_this) {
  var children = this.getChildren();
  for (var i = 0;i < children.length;i++) {
    f.call(opt_this, children[i]);
    children[i].forEachDescendant(f, opt_this);
  }
};
goog.structs.TreeNode.prototype.traverse = function(f, opt_this) {
  if (f.call(opt_this, this) !== false) {
    var children = this.getChildren();
    for (var i = 0;i < children.length;i++) {
      children[i].traverse(f, opt_this);
    }
  }
};
goog.structs.TreeNode.prototype.setParent = function(parent) {
  this.parent_ = parent;
};
goog.structs.TreeNode.prototype.addChild = function(child) {
  this.addChildAt(child, this.children_ ? this.children_.length : 0);
};
goog.structs.TreeNode.prototype.addChildAt = function(child, index) {
  goog.asserts.assert(!child.getParent());
  child.setParent(this);
  this.children_ = this.children_ || [];
  goog.asserts.assert(index >= 0 && index <= this.children_.length);
  goog.array.insertAt(this.children_, child, index);
};
goog.structs.TreeNode.prototype.replaceChildAt = function(newChild, index) {
  goog.asserts.assert(!newChild.getParent(), "newChild must not have parent node");
  var children = this.getChildren();
  var oldChild = children[index];
  goog.asserts.assert(oldChild, "Invalid child or child index is given.");
  oldChild.setParent(null);
  children[index] = newChild;
  newChild.setParent(this);
  return oldChild;
};
goog.structs.TreeNode.prototype.replaceChild = function(newChild, oldChild) {
  return this.replaceChildAt(newChild, goog.array.indexOf(this.getChildren(), oldChild));
};
goog.structs.TreeNode.prototype.removeChildAt = function(index) {
  var child = this.children_ && this.children_[index];
  if (child) {
    child.setParent(null);
    goog.array.removeAt(this.children_, index);
    if (this.children_.length == 0) {
      this.children_ = null;
    }
    return child;
  }
  return null;
};
goog.structs.TreeNode.prototype.removeChild = function(child) {
  return this.removeChildAt(goog.array.indexOf(this.getChildren(), child));
};
goog.structs.TreeNode.prototype.removeChildren = function() {
  if (this.children_) {
    for (var i = 0;i < this.children_.length;i++) {
      this.children_[i].setParent(null);
    }
    this.children_ = null;
  }
};
goog.provide("goog.iter");
goog.provide("goog.iter.Iterable");
goog.provide("goog.iter.Iterator");
goog.provide("goog.iter.StopIteration");
goog.require("goog.array");
goog.require("goog.asserts");
goog.require("goog.functions");
goog.require("goog.math");
goog.iter.Iterable;
goog.iter.StopIteration = "StopIteration" in goog.global ? goog.global["StopIteration"] : {message:"StopIteration", stack:""};
goog.iter.Iterator = function() {
};
goog.iter.Iterator.prototype.next = function() {
  throw goog.iter.StopIteration;
};
goog.iter.Iterator.prototype.__iterator__ = function(opt_keys) {
  return this;
};
goog.iter.toIterator = function(iterable) {
  if (iterable instanceof goog.iter.Iterator) {
    return iterable;
  }
  if (typeof iterable.__iterator__ == "function") {
    return iterable.__iterator__(false);
  }
  if (goog.isArrayLike(iterable)) {
    var i = 0;
    var newIter = new goog.iter.Iterator;
    newIter.next = function() {
      while (true) {
        if (i >= iterable.length) {
          throw goog.iter.StopIteration;
        }
        if (!(i in iterable)) {
          i++;
          continue;
        }
        return iterable[i++];
      }
    };
    return newIter;
  }
  throw Error("Not implemented");
};
goog.iter.forEach = function(iterable, f, opt_obj) {
  if (goog.isArrayLike(iterable)) {
    try {
      goog.array.forEach((iterable), f, opt_obj);
    } catch (ex) {
      if (ex !== goog.iter.StopIteration) {
        throw ex;
      }
    }
  } else {
    iterable = goog.iter.toIterator(iterable);
    try {
      while (true) {
        f.call(opt_obj, iterable.next(), undefined, iterable);
      }
    } catch (ex) {
      if (ex !== goog.iter.StopIteration) {
        throw ex;
      }
    }
  }
};
goog.iter.filter = function(iterable, f, opt_obj) {
  var iterator = goog.iter.toIterator(iterable);
  var newIter = new goog.iter.Iterator;
  newIter.next = function() {
    while (true) {
      var val = iterator.next();
      if (f.call(opt_obj, val, undefined, iterator)) {
        return val;
      }
    }
  };
  return newIter;
};
goog.iter.filterFalse = function(iterable, f, opt_obj) {
  return goog.iter.filter(iterable, goog.functions.not(f), opt_obj);
};
goog.iter.range = function(startOrStop, opt_stop, opt_step) {
  var start = 0;
  var stop = startOrStop;
  var step = opt_step || 1;
  if (arguments.length > 1) {
    start = startOrStop;
    stop = opt_stop;
  }
  if (step == 0) {
    throw Error("Range step argument must not be zero");
  }
  var newIter = new goog.iter.Iterator;
  newIter.next = function() {
    if (step > 0 && start >= stop || step < 0 && start <= stop) {
      throw goog.iter.StopIteration;
    }
    var rv = start;
    start += step;
    return rv;
  };
  return newIter;
};
goog.iter.join = function(iterable, deliminator) {
  return goog.iter.toArray(iterable).join(deliminator);
};
goog.iter.map = function(iterable, f, opt_obj) {
  var iterator = goog.iter.toIterator(iterable);
  var newIter = new goog.iter.Iterator;
  newIter.next = function() {
    var val = iterator.next();
    return f.call(opt_obj, val, undefined, iterator);
  };
  return newIter;
};
goog.iter.reduce = function(iterable, f, val, opt_obj) {
  var rval = val;
  goog.iter.forEach(iterable, function(val) {
    rval = f.call(opt_obj, rval, val);
  });
  return rval;
};
goog.iter.some = function(iterable, f, opt_obj) {
  iterable = goog.iter.toIterator(iterable);
  try {
    while (true) {
      if (f.call(opt_obj, iterable.next(), undefined, iterable)) {
        return true;
      }
    }
  } catch (ex) {
    if (ex !== goog.iter.StopIteration) {
      throw ex;
    }
  }
  return false;
};
goog.iter.every = function(iterable, f, opt_obj) {
  iterable = goog.iter.toIterator(iterable);
  try {
    while (true) {
      if (!f.call(opt_obj, iterable.next(), undefined, iterable)) {
        return false;
      }
    }
  } catch (ex) {
    if (ex !== goog.iter.StopIteration) {
      throw ex;
    }
  }
  return true;
};
goog.iter.chain = function(var_args) {
  return goog.iter.chainFromIterable(arguments);
};
goog.iter.chainFromIterable = function(iterable) {
  var iterator = goog.iter.toIterator(iterable);
  var iter = new goog.iter.Iterator;
  var current = null;
  iter.next = function() {
    while (true) {
      if (current == null) {
        var it = iterator.next();
        current = goog.iter.toIterator(it);
      }
      try {
        return current.next();
      } catch (ex) {
        if (ex !== goog.iter.StopIteration) {
          throw ex;
        }
        current = null;
      }
    }
  };
  return iter;
};
goog.iter.dropWhile = function(iterable, f, opt_obj) {
  var iterator = goog.iter.toIterator(iterable);
  var newIter = new goog.iter.Iterator;
  var dropping = true;
  newIter.next = function() {
    while (true) {
      var val = iterator.next();
      if (dropping && f.call(opt_obj, val, undefined, iterator)) {
        continue;
      } else {
        dropping = false;
      }
      return val;
    }
  };
  return newIter;
};
goog.iter.takeWhile = function(iterable, f, opt_obj) {
  var iterator = goog.iter.toIterator(iterable);
  var iter = new goog.iter.Iterator;
  iter.next = function() {
    var val = iterator.next();
    if (f.call(opt_obj, val, undefined, iterator)) {
      return val;
    }
    throw goog.iter.StopIteration;
  };
  return iter;
};
goog.iter.toArray = function(iterable) {
  if (goog.isArrayLike(iterable)) {
    return goog.array.toArray((iterable));
  }
  iterable = goog.iter.toIterator(iterable);
  var array = [];
  goog.iter.forEach(iterable, function(val) {
    array.push(val);
  });
  return array;
};
goog.iter.equals = function(iterable1, iterable2, opt_equalsFn) {
  var fillValue = {};
  var pairs = goog.iter.zipLongest(fillValue, iterable1, iterable2);
  var equalsFn = opt_equalsFn || goog.array.defaultCompareEquality;
  return goog.iter.every(pairs, function(pair) {
    return equalsFn(pair[0], pair[1]);
  });
};
goog.iter.nextOrValue = function(iterable, defaultValue) {
  try {
    return goog.iter.toIterator(iterable).next();
  } catch (e) {
    if (e != goog.iter.StopIteration) {
      throw e;
    }
    return defaultValue;
  }
};
goog.iter.product = function(var_args) {
  var someArrayEmpty = goog.array.some(arguments, function(arr) {
    return !arr.length;
  });
  if (someArrayEmpty || !arguments.length) {
    return new goog.iter.Iterator;
  }
  var iter = new goog.iter.Iterator;
  var arrays = arguments;
  var indicies = goog.array.repeat(0, arrays.length);
  iter.next = function() {
    if (indicies) {
      var retVal = goog.array.map(indicies, function(valueIndex, arrayIndex) {
        return arrays[arrayIndex][valueIndex];
      });
      for (var i = indicies.length - 1;i >= 0;i--) {
        goog.asserts.assert(indicies);
        if (indicies[i] < arrays[i].length - 1) {
          indicies[i]++;
          break;
        }
        if (i == 0) {
          indicies = null;
          break;
        }
        indicies[i] = 0;
      }
      return retVal;
    }
    throw goog.iter.StopIteration;
  };
  return iter;
};
goog.iter.cycle = function(iterable) {
  var baseIterator = goog.iter.toIterator(iterable);
  var cache = [];
  var cacheIndex = 0;
  var iter = new goog.iter.Iterator;
  var useCache = false;
  iter.next = function() {
    var returnElement = null;
    if (!useCache) {
      try {
        returnElement = baseIterator.next();
        cache.push(returnElement);
        return returnElement;
      } catch (e) {
        if (e != goog.iter.StopIteration || goog.array.isEmpty(cache)) {
          throw e;
        }
        useCache = true;
      }
    }
    returnElement = cache[cacheIndex];
    cacheIndex = (cacheIndex + 1) % cache.length;
    return returnElement;
  };
  return iter;
};
goog.iter.count = function(opt_start, opt_step) {
  var counter = opt_start || 0;
  var step = goog.isDef(opt_step) ? opt_step : 1;
  var iter = new goog.iter.Iterator;
  iter.next = function() {
    var returnValue = counter;
    counter += step;
    return returnValue;
  };
  return iter;
};
goog.iter.repeat = function(value) {
  var iter = new goog.iter.Iterator;
  iter.next = goog.functions.constant(value);
  return iter;
};
goog.iter.accumulate = function(iterable) {
  var iterator = goog.iter.toIterator(iterable);
  var total = 0;
  var iter = new goog.iter.Iterator;
  iter.next = function() {
    total += iterator.next();
    return total;
  };
  return iter;
};
goog.iter.zip = function(var_args) {
  var args = arguments;
  var iter = new goog.iter.Iterator;
  if (args.length > 0) {
    var iterators = goog.array.map(args, goog.iter.toIterator);
    iter.next = function() {
      var arr = goog.array.map(iterators, function(it) {
        return it.next();
      });
      return arr;
    };
  }
  return iter;
};
goog.iter.zipLongest = function(fillValue, var_args) {
  var args = goog.array.slice(arguments, 1);
  var iter = new goog.iter.Iterator;
  if (args.length > 0) {
    var iterators = goog.array.map(args, goog.iter.toIterator);
    iter.next = function() {
      var iteratorsHaveValues = false;
      var arr = goog.array.map(iterators, function(it) {
        var returnValue;
        try {
          returnValue = it.next();
          iteratorsHaveValues = true;
        } catch (ex) {
          if (ex !== goog.iter.StopIteration) {
            throw ex;
          }
          returnValue = fillValue;
        }
        return returnValue;
      });
      if (!iteratorsHaveValues) {
        throw goog.iter.StopIteration;
      }
      return arr;
    };
  }
  return iter;
};
goog.iter.compress = function(iterable, selectors) {
  var selectorIterator = goog.iter.toIterator(selectors);
  return goog.iter.filter(iterable, function() {
    return !!selectorIterator.next();
  });
};
goog.iter.GroupByIterator_ = function(iterable, opt_keyFunc) {
  this.iterator = goog.iter.toIterator(iterable);
  this.keyFunc = opt_keyFunc || goog.functions.identity;
  this.targetKey;
  this.currentKey;
  this.currentValue;
};
goog.inherits(goog.iter.GroupByIterator_, goog.iter.Iterator);
goog.iter.GroupByIterator_.prototype.next = function() {
  while (this.currentKey == this.targetKey) {
    this.currentValue = this.iterator.next();
    this.currentKey = this.keyFunc(this.currentValue);
  }
  this.targetKey = this.currentKey;
  return [this.currentKey, this.groupItems_(this.targetKey)];
};
goog.iter.GroupByIterator_.prototype.groupItems_ = function(targetKey) {
  var arr = [];
  while (this.currentKey == targetKey) {
    arr.push(this.currentValue);
    try {
      this.currentValue = this.iterator.next();
    } catch (ex) {
      if (ex !== goog.iter.StopIteration) {
        throw ex;
      }
      break;
    }
    this.currentKey = this.keyFunc(this.currentValue);
  }
  return arr;
};
goog.iter.groupBy = function(iterable, opt_keyFunc) {
  return new goog.iter.GroupByIterator_(iterable, opt_keyFunc);
};
goog.iter.starMap = function(iterable, f, opt_obj) {
  var iterator = goog.iter.toIterator(iterable);
  var iter = new goog.iter.Iterator;
  iter.next = function() {
    var args = goog.iter.toArray(iterator.next());
    return f.apply(opt_obj, goog.array.concat(args, undefined, iterator));
  };
  return iter;
};
goog.iter.tee = function(iterable, opt_num) {
  var iterator = goog.iter.toIterator(iterable);
  var num = goog.isNumber(opt_num) ? opt_num : 2;
  var buffers = goog.array.map(goog.array.range(num), function() {
    return [];
  });
  var addNextIteratorValueToBuffers = function() {
    var val = iterator.next();
    goog.array.forEach(buffers, function(buffer) {
      buffer.push(val);
    });
  };
  var createIterator = function(buffer) {
    var iter = new goog.iter.Iterator;
    iter.next = function() {
      if (goog.array.isEmpty(buffer)) {
        addNextIteratorValueToBuffers();
      }
      goog.asserts.assert(!goog.array.isEmpty(buffer));
      return buffer.shift();
    };
    return iter;
  };
  return goog.array.map(buffers, createIterator);
};
goog.iter.enumerate = function(iterable, opt_start) {
  return goog.iter.zip(goog.iter.count(opt_start), iterable);
};
goog.iter.limit = function(iterable, limitSize) {
  goog.asserts.assert(goog.math.isInt(limitSize) && limitSize >= 0);
  var iterator = goog.iter.toIterator(iterable);
  var iter = new goog.iter.Iterator;
  var remaining = limitSize;
  iter.next = function() {
    if (remaining-- > 0) {
      return iterator.next();
    }
    throw goog.iter.StopIteration;
  };
  return iter;
};
goog.iter.consume = function(iterable, count) {
  goog.asserts.assert(goog.math.isInt(count) && count >= 0);
  var iterator = goog.iter.toIterator(iterable);
  while (count-- > 0) {
    goog.iter.nextOrValue(iterator, null);
  }
  return iterator;
};
goog.iter.slice = function(iterable, start, opt_end) {
  goog.asserts.assert(goog.math.isInt(start) && start >= 0);
  var iterator = goog.iter.consume(iterable, start);
  if (goog.isNumber(opt_end)) {
    goog.asserts.assert(goog.math.isInt((opt_end)) && opt_end >= start);
    iterator = goog.iter.limit(iterator, opt_end - start);
  }
  return iterator;
};
goog.iter.hasDuplicates_ = function(arr) {
  var deduped = [];
  goog.array.removeDuplicates(arr, deduped);
  return arr.length != deduped.length;
};
goog.iter.permutations = function(iterable, opt_length) {
  var elements = goog.iter.toArray(iterable);
  var length = goog.isNumber(opt_length) ? opt_length : elements.length;
  var sets = goog.array.repeat(elements, length);
  var product = goog.iter.product.apply(undefined, sets);
  return goog.iter.filter(product, function(arr) {
    return !goog.iter.hasDuplicates_(arr);
  });
};
goog.iter.combinations = function(iterable, length) {
  var elements = goog.iter.toArray(iterable);
  var indexes = goog.iter.range(elements.length);
  var indexIterator = goog.iter.permutations(indexes, length);
  var sortedIndexIterator = goog.iter.filter(indexIterator, function(arr) {
    return goog.array.isSorted(arr);
  });
  var iter = new goog.iter.Iterator;
  function getIndexFromElements(index) {
    return elements[index];
  }
  iter.next = function() {
    return goog.array.map((sortedIndexIterator.next()), getIndexFromElements);
  };
  return iter;
};
goog.iter.combinationsWithReplacement = function(iterable, length) {
  var elements = goog.iter.toArray(iterable);
  var indexes = goog.array.range(elements.length);
  var sets = goog.array.repeat(indexes, length);
  var indexIterator = goog.iter.product.apply(undefined, sets);
  var sortedIndexIterator = goog.iter.filter(indexIterator, function(arr) {
    return goog.array.isSorted(arr);
  });
  var iter = new goog.iter.Iterator;
  function getIndexFromElements(index) {
    return elements[index];
  }
  iter.next = function() {
    return goog.array.map((sortedIndexIterator.next()), getIndexFromElements);
  };
  return iter;
};
goog.provide("goog.Thenable");
goog.Thenable = function() {
};
goog.Thenable.prototype.then = function(opt_onFulfilled, opt_onRejected, opt_context) {
};
goog.Thenable.IMPLEMENTED_BY_PROP = "$goog_Thenable";
goog.Thenable.addImplementation = function(ctor) {
  goog.exportProperty(ctor.prototype, "then", ctor.prototype.then);
  if (COMPILED) {
    ctor.prototype[goog.Thenable.IMPLEMENTED_BY_PROP] = true;
  } else {
    ctor.prototype.$goog_Thenable = true;
  }
};
goog.Thenable.isImplementedBy = function(object) {
  if (!object) {
    return false;
  }
  try {
    if (COMPILED) {
      return !!object[goog.Thenable.IMPLEMENTED_BY_PROP];
    }
    return !!object.$goog_Thenable;
  } catch (e) {
    return false;
  }
};
goog.provide("goog.async.FreeList");
goog.async.FreeList = goog.defineClass(null, {constructor:function(create, reset, limit) {
  this.limit_ = limit;
  this.create_ = create;
  this.reset_ = reset;
  this.occupants_ = 0;
  this.head_ = null;
}, get:function() {
  var item;
  if (this.occupants_ > 0) {
    this.occupants_--;
    item = this.head_;
    this.head_ = item.next;
    item.next = null;
  } else {
    item = this.create_();
  }
  return item;
}, put:function(item) {
  this.reset_(item);
  if (this.occupants_ < this.limit_) {
    this.occupants_++;
    item.next = this.head_;
    this.head_ = item;
  }
}, occupants:function() {
  return this.occupants_;
}});
goog.provide("goog.async.run");
goog.require("goog.async.WorkQueue");
goog.require("goog.async.nextTick");
goog.require("goog.async.throwException");
goog.require("goog.testing.watchers");
goog.async.run = function(callback, opt_context) {
  if (!goog.async.run.schedule_) {
    goog.async.run.initializeRunner_();
  }
  if (!goog.async.run.workQueueScheduled_) {
    goog.async.run.schedule_();
    goog.async.run.workQueueScheduled_ = true;
  }
  goog.async.run.workQueue_.add(callback, opt_context);
};
goog.async.run.initializeRunner_ = function() {
  if (goog.global.Promise && goog.global.Promise.resolve) {
    var promise = goog.global.Promise.resolve();
    goog.async.run.schedule_ = function() {
      promise.then(goog.async.run.processWorkQueue);
    };
  } else {
    goog.async.run.schedule_ = function() {
      goog.async.nextTick(goog.async.run.processWorkQueue);
    };
  }
};
goog.async.run.forceNextTick = function() {
  goog.async.run.schedule_ = function() {
    goog.async.nextTick(goog.async.run.processWorkQueue);
  };
};
goog.async.run.schedule_;
goog.async.run.workQueueScheduled_ = false;
goog.async.run.workQueue_ = new goog.async.WorkQueue;
if (goog.DEBUG) {
  goog.async.run.resetQueue_ = function() {
    goog.async.run.workQueueScheduled_ = false;
    goog.async.run.workQueue_ = new goog.async.WorkQueue;
  };
  goog.testing.watchers.watchClockReset(goog.async.run.resetQueue_);
}
goog.async.run.processWorkQueue = function() {
  var item = null;
  while (item = goog.async.run.workQueue_.remove()) {
    try {
      item.fn.call(item.scope);
    } catch (e) {
      goog.async.throwException(e);
    }
    goog.async.run.workQueue_.returnUnused(item);
  }
  goog.async.run.workQueueScheduled_ = false;
};
goog.provide("goog.async.nextTick");
goog.provide("goog.async.throwException");
goog.require("goog.debug.entryPointRegistry");
goog.require("goog.dom.TagName");
goog.require("goog.functions");
goog.require("goog.labs.userAgent.browser");
goog.require("goog.labs.userAgent.engine");
goog.async.throwException = function(exception) {
  goog.global.setTimeout(function() {
    throw exception;
  }, 0);
};
goog.async.nextTick = function(callback, opt_context, opt_useSetImmediate) {
  var cb = callback;
  if (opt_context) {
    cb = goog.bind(callback, opt_context);
  }
  cb = goog.async.nextTick.wrapCallback_(cb);
  if (goog.isFunction(goog.global.setImmediate) && (opt_useSetImmediate || !goog.global.Window || !goog.global.Window.prototype || goog.global.Window.prototype.setImmediate != goog.global.setImmediate)) {
    goog.global.setImmediate(cb);
    return;
  }
  if (!goog.async.nextTick.setImmediate_) {
    goog.async.nextTick.setImmediate_ = goog.async.nextTick.getSetImmediateEmulator_();
  }
  goog.async.nextTick.setImmediate_(cb);
};
goog.async.nextTick.setImmediate_;
goog.async.nextTick.getSetImmediateEmulator_ = function() {
  var Channel = goog.global["MessageChannel"];
  if (typeof Channel === "undefined" && typeof window !== "undefined" && window.postMessage && window.addEventListener && !goog.labs.userAgent.engine.isPresto()) {
    Channel = function() {
      var iframe = document.createElement(goog.dom.TagName.IFRAME);
      iframe.style.display = "none";
      iframe.src = "";
      document.documentElement.appendChild(iframe);
      var win = iframe.contentWindow;
      var doc = win.document;
      doc.open();
      doc.write("");
      doc.close();
      var message = "callImmediate" + Math.random();
      var origin = win.location.protocol == "file:" ? "*" : win.location.protocol + "//" + win.location.host;
      var onmessage = goog.bind(function(e) {
        if (origin != "*" && e.origin != origin || e.data != message) {
          return;
        }
        this["port1"].onmessage();
      }, this);
      win.addEventListener("message", onmessage, false);
      this["port1"] = {};
      this["port2"] = {postMessage:function() {
        win.postMessage(message, origin);
      }};
    };
  }
  if (typeof Channel !== "undefined" && !goog.labs.userAgent.browser.isIE()) {
    var channel = new Channel;
    var head = {};
    var tail = head;
    channel["port1"].onmessage = function() {
      if (goog.isDef(head.next)) {
        head = head.next;
        var cb = head.cb;
        head.cb = null;
        cb();
      }
    };
    return function(cb) {
      tail.next = {cb:cb};
      tail = tail.next;
      channel["port2"].postMessage(0);
    };
  }
  if (typeof document !== "undefined" && "onreadystatechange" in document.createElement(goog.dom.TagName.SCRIPT)) {
    return function(cb) {
      var script = document.createElement(goog.dom.TagName.SCRIPT);
      script.onreadystatechange = function() {
        script.onreadystatechange = null;
        script.parentNode.removeChild(script);
        script = null;
        cb();
        cb = null;
      };
      document.documentElement.appendChild(script);
    };
  }
  return function(cb) {
    goog.global.setTimeout(cb, 0);
  };
};
goog.async.nextTick.wrapCallback_ = goog.functions.identity;
goog.debug.entryPointRegistry.register(function(transformer) {
  goog.async.nextTick.wrapCallback_ = transformer;
});
goog.provide("goog.debug.Error");
goog.debug.Error = function(opt_msg) {
  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, goog.debug.Error);
  } else {
    var stack = (new Error).stack;
    if (stack) {
      this.stack = stack;
    }
  }
  if (opt_msg) {
    this.message = String(opt_msg);
  }
  this.reportErrorToServer = true;
};
goog.inherits(goog.debug.Error, Error);
goog.debug.Error.prototype.name = "CustomError";
goog.provide("goog.promise.Resolver");
goog.promise.Resolver = function() {
};
goog.promise.Resolver.prototype.promise;
goog.promise.Resolver.prototype.resolve;
goog.promise.Resolver.prototype.reject;
goog.provide("goog.dom.NodeType");
goog.dom.NodeType = {ELEMENT:1, ATTRIBUTE:2, TEXT:3, CDATA_SECTION:4, ENTITY_REFERENCE:5, ENTITY:6, PROCESSING_INSTRUCTION:7, COMMENT:8, DOCUMENT:9, DOCUMENT_TYPE:10, DOCUMENT_FRAGMENT:11, NOTATION:12};
goog.provide("goog.string");
goog.provide("goog.string.Unicode");
goog.define("goog.string.DETECT_DOUBLE_ESCAPING", false);
goog.define("goog.string.FORCE_NON_DOM_HTML_UNESCAPING", false);
goog.string.Unicode = {NBSP:"\u00a0"};
goog.string.startsWith = function(str, prefix) {
  return str.lastIndexOf(prefix, 0) == 0;
};
goog.string.endsWith = function(str, suffix) {
  var l = str.length - suffix.length;
  return l >= 0 && str.indexOf(suffix, l) == l;
};
goog.string.caseInsensitiveStartsWith = function(str, prefix) {
  return goog.string.caseInsensitiveCompare(prefix, str.substr(0, prefix.length)) == 0;
};
goog.string.caseInsensitiveEndsWith = function(str, suffix) {
  return goog.string.caseInsensitiveCompare(suffix, str.substr(str.length - suffix.length, suffix.length)) == 0;
};
goog.string.caseInsensitiveEquals = function(str1, str2) {
  return str1.toLowerCase() == str2.toLowerCase();
};
goog.string.subs = function(str, var_args) {
  var splitParts = str.split("%s");
  var returnString = "";
  var subsArguments = Array.prototype.slice.call(arguments, 1);
  while (subsArguments.length && splitParts.length > 1) {
    returnString += splitParts.shift() + subsArguments.shift();
  }
  return returnString + splitParts.join("%s");
};
goog.string.collapseWhitespace = function(str) {
  return str.replace(/[\s\xa0]+/g, " ").replace(/^\s+|\s+$/g, "");
};
goog.string.isEmptyOrWhitespace = function(str) {
  return /^[\s\xa0]*$/.test(str);
};
goog.string.isEmptyString = function(str) {
  return str.length == 0;
};
goog.string.isEmpty = goog.string.isEmptyOrWhitespace;
goog.string.isEmptyOrWhitespaceSafe = function(str) {
  return goog.string.isEmptyOrWhitespace(goog.string.makeSafe(str));
};
goog.string.isEmptySafe = goog.string.isEmptyOrWhitespaceSafe;
goog.string.isBreakingWhitespace = function(str) {
  return !/[^\t\n\r ]/.test(str);
};
goog.string.isAlpha = function(str) {
  return !/[^a-zA-Z]/.test(str);
};
goog.string.isNumeric = function(str) {
  return !/[^0-9]/.test(str);
};
goog.string.isAlphaNumeric = function(str) {
  return !/[^a-zA-Z0-9]/.test(str);
};
goog.string.isSpace = function(ch) {
  return ch == " ";
};
goog.string.isUnicodeChar = function(ch) {
  return ch.length == 1 && ch >= " " && ch <= "~" || ch >= "\u0080" && ch <= "\ufffd";
};
goog.string.stripNewlines = function(str) {
  return str.replace(/(\r\n|\r|\n)+/g, " ");
};
goog.string.canonicalizeNewlines = function(str) {
  return str.replace(/(\r\n|\r|\n)/g, "\n");
};
goog.string.normalizeWhitespace = function(str) {
  return str.replace(/\xa0|\s/g, " ");
};
goog.string.normalizeSpaces = function(str) {
  return str.replace(/\xa0|[ \t]+/g, " ");
};
goog.string.collapseBreakingSpaces = function(str) {
  return str.replace(/[\t\r\n ]+/g, " ").replace(/^[\t\r\n ]+|[\t\r\n ]+$/g, "");
};
goog.string.trim = goog.TRUSTED_SITE && String.prototype.trim ? function(str) {
  return str.trim();
} : function(str) {
  return str.replace(/^[\s\xa0]+|[\s\xa0]+$/g, "");
};
goog.string.trimLeft = function(str) {
  return str.replace(/^[\s\xa0]+/, "");
};
goog.string.trimRight = function(str) {
  return str.replace(/[\s\xa0]+$/, "");
};
goog.string.caseInsensitiveCompare = function(str1, str2) {
  var test1 = String(str1).toLowerCase();
  var test2 = String(str2).toLowerCase();
  if (test1 < test2) {
    return -1;
  } else {
    if (test1 == test2) {
      return 0;
    } else {
      return 1;
    }
  }
};
goog.string.numerateCompareRegExp_ = /(\.\d+)|(\d+)|(\D+)/g;
goog.string.numerateCompare = function(str1, str2) {
  if (str1 == str2) {
    return 0;
  }
  if (!str1) {
    return -1;
  }
  if (!str2) {
    return 1;
  }
  var tokens1 = str1.toLowerCase().match(goog.string.numerateCompareRegExp_);
  var tokens2 = str2.toLowerCase().match(goog.string.numerateCompareRegExp_);
  var count = Math.min(tokens1.length, tokens2.length);
  for (var i = 0;i < count;i++) {
    var a = tokens1[i];
    var b = tokens2[i];
    if (a != b) {
      var num1 = parseInt(a, 10);
      if (!isNaN(num1)) {
        var num2 = parseInt(b, 10);
        if (!isNaN(num2) && num1 - num2) {
          return num1 - num2;
        }
      }
      return a < b ? -1 : 1;
    }
  }
  if (tokens1.length != tokens2.length) {
    return tokens1.length - tokens2.length;
  }
  return str1 < str2 ? -1 : 1;
};
goog.string.urlEncode = function(str) {
  return encodeURIComponent(String(str));
};
goog.string.urlDecode = function(str) {
  return decodeURIComponent(str.replace(/\+/g, " "));
};
goog.string.newLineToBr = function(str, opt_xml) {
  return str.replace(/(\r\n|\r|\n)/g, opt_xml ? "<br />" : "<br>");
};
goog.string.htmlEscape = function(str, opt_isLikelyToContainHtmlChars) {
  if (opt_isLikelyToContainHtmlChars) {
    str = str.replace(goog.string.AMP_RE_, "&amp;").replace(goog.string.LT_RE_, "&lt;").replace(goog.string.GT_RE_, "&gt;").replace(goog.string.QUOT_RE_, "&quot;").replace(goog.string.SINGLE_QUOTE_RE_, "&#39;").replace(goog.string.NULL_RE_, "&#0;");
    if (goog.string.DETECT_DOUBLE_ESCAPING) {
      str = str.replace(goog.string.E_RE_, "&#101;");
    }
    return str;
  } else {
    if (!goog.string.ALL_RE_.test(str)) {
      return str;
    }
    if (str.indexOf("&") != -1) {
      str = str.replace(goog.string.AMP_RE_, "&amp;");
    }
    if (str.indexOf("<") != -1) {
      str = str.replace(goog.string.LT_RE_, "&lt;");
    }
    if (str.indexOf(">") != -1) {
      str = str.replace(goog.string.GT_RE_, "&gt;");
    }
    if (str.indexOf('"') != -1) {
      str = str.replace(goog.string.QUOT_RE_, "&quot;");
    }
    if (str.indexOf("'") != -1) {
      str = str.replace(goog.string.SINGLE_QUOTE_RE_, "&#39;");
    }
    if (str.indexOf("\x00") != -1) {
      str = str.replace(goog.string.NULL_RE_, "&#0;");
    }
    if (goog.string.DETECT_DOUBLE_ESCAPING && str.indexOf("e") != -1) {
      str = str.replace(goog.string.E_RE_, "&#101;");
    }
    return str;
  }
};
goog.string.AMP_RE_ = /&/g;
goog.string.LT_RE_ = /</g;
goog.string.GT_RE_ = />/g;
goog.string.QUOT_RE_ = /"/g;
goog.string.SINGLE_QUOTE_RE_ = /'/g;
goog.string.NULL_RE_ = /\x00/g;
goog.string.E_RE_ = /e/g;
goog.string.ALL_RE_ = goog.string.DETECT_DOUBLE_ESCAPING ? /[\x00&<>"'e]/ : /[\x00&<>"']/;
goog.string.unescapeEntities = function(str) {
  if (goog.string.contains(str, "&")) {
    if (!goog.string.FORCE_NON_DOM_HTML_UNESCAPING && "document" in goog.global) {
      return goog.string.unescapeEntitiesUsingDom_(str);
    } else {
      return goog.string.unescapePureXmlEntities_(str);
    }
  }
  return str;
};
goog.string.unescapeEntitiesWithDocument = function(str, document) {
  if (goog.string.contains(str, "&")) {
    return goog.string.unescapeEntitiesUsingDom_(str, document);
  }
  return str;
};
goog.string.unescapeEntitiesUsingDom_ = function(str, opt_document) {
  var seen = {"&amp;":"&", "&lt;":"<", "&gt;":">", "&quot;":'"'};
  var div;
  if (opt_document) {
    div = opt_document.createElement("div");
  } else {
    div = goog.global.document.createElement("div");
  }
  return str.replace(goog.string.HTML_ENTITY_PATTERN_, function(s, entity) {
    var value = seen[s];
    if (value) {
      return value;
    }
    if (entity.charAt(0) == "#") {
      var n = Number("0" + entity.substr(1));
      if (!isNaN(n)) {
        value = String.fromCharCode(n);
      }
    }
    if (!value) {
      div.innerHTML = s + " ";
      value = div.firstChild.nodeValue.slice(0, -1);
    }
    return seen[s] = value;
  });
};
goog.string.unescapePureXmlEntities_ = function(str) {
  return str.replace(/&([^;]+);/g, function(s, entity) {
    switch(entity) {
      case "amp":
        return "&";
      case "lt":
        return "<";
      case "gt":
        return ">";
      case "quot":
        return '"';
      default:
        if (entity.charAt(0) == "#") {
          var n = Number("0" + entity.substr(1));
          if (!isNaN(n)) {
            return String.fromCharCode(n);
          }
        }
        return s;
    }
  });
};
goog.string.HTML_ENTITY_PATTERN_ = /&([^;\s<&]+);?/g;
goog.string.whitespaceEscape = function(str, opt_xml) {
  return goog.string.newLineToBr(str.replace(/  /g, " &#160;"), opt_xml);
};
goog.string.preserveSpaces = function(str) {
  return str.replace(/(^|[\n ]) /g, "$1" + goog.string.Unicode.NBSP);
};
goog.string.stripQuotes = function(str, quoteChars) {
  var length = quoteChars.length;
  for (var i = 0;i < length;i++) {
    var quoteChar = length == 1 ? quoteChars : quoteChars.charAt(i);
    if (str.charAt(0) == quoteChar && str.charAt(str.length - 1) == quoteChar) {
      return str.substring(1, str.length - 1);
    }
  }
  return str;
};
goog.string.truncate = function(str, chars, opt_protectEscapedCharacters) {
  if (opt_protectEscapedCharacters) {
    str = goog.string.unescapeEntities(str);
  }
  if (str.length > chars) {
    str = str.substring(0, chars - 3) + "...";
  }
  if (opt_protectEscapedCharacters) {
    str = goog.string.htmlEscape(str);
  }
  return str;
};
goog.string.truncateMiddle = function(str, chars, opt_protectEscapedCharacters, opt_trailingChars) {
  if (opt_protectEscapedCharacters) {
    str = goog.string.unescapeEntities(str);
  }
  if (opt_trailingChars && str.length > chars) {
    if (opt_trailingChars > chars) {
      opt_trailingChars = chars;
    }
    var endPoint = str.length - opt_trailingChars;
    var startPoint = chars - opt_trailingChars;
    str = str.substring(0, startPoint) + "..." + str.substring(endPoint);
  } else {
    if (str.length > chars) {
      var half = Math.floor(chars / 2);
      var endPos = str.length - half;
      half += chars % 2;
      str = str.substring(0, half) + "..." + str.substring(endPos);
    }
  }
  if (opt_protectEscapedCharacters) {
    str = goog.string.htmlEscape(str);
  }
  return str;
};
goog.string.specialEscapeChars_ = {"\x00":"\\0", "\b":"\\b", "\f":"\\f", "\n":"\\n", "\r":"\\r", "\t":"\\t", "\x0B":"\\x0B", '"':'\\"', "\\":"\\\\"};
goog.string.jsEscapeCache_ = {"'":"\\'"};
goog.string.quote = function(s) {
  s = String(s);
  if (s.quote) {
    return s.quote();
  } else {
    var sb = ['"'];
    for (var i = 0;i < s.length;i++) {
      var ch = s.charAt(i);
      var cc = ch.charCodeAt(0);
      sb[i + 1] = goog.string.specialEscapeChars_[ch] || (cc > 31 && cc < 127 ? ch : goog.string.escapeChar(ch));
    }
    sb.push('"');
    return sb.join("");
  }
};
goog.string.escapeString = function(str) {
  var sb = [];
  for (var i = 0;i < str.length;i++) {
    sb[i] = goog.string.escapeChar(str.charAt(i));
  }
  return sb.join("");
};
goog.string.escapeChar = function(c) {
  if (c in goog.string.jsEscapeCache_) {
    return goog.string.jsEscapeCache_[c];
  }
  if (c in goog.string.specialEscapeChars_) {
    return goog.string.jsEscapeCache_[c] = goog.string.specialEscapeChars_[c];
  }
  var rv = c;
  var cc = c.charCodeAt(0);
  if (cc > 31 && cc < 127) {
    rv = c;
  } else {
    if (cc < 256) {
      rv = "\\x";
      if (cc < 16 || cc > 256) {
        rv += "0";
      }
    } else {
      rv = "\\u";
      if (cc < 4096) {
        rv += "0";
      }
    }
    rv += cc.toString(16).toUpperCase();
  }
  return goog.string.jsEscapeCache_[c] = rv;
};
goog.string.contains = function(str, subString) {
  return str.indexOf(subString) != -1;
};
goog.string.caseInsensitiveContains = function(str, subString) {
  return goog.string.contains(str.toLowerCase(), subString.toLowerCase());
};
goog.string.countOf = function(s, ss) {
  return s && ss ? s.split(ss).length - 1 : 0;
};
goog.string.removeAt = function(s, index, stringLength) {
  var resultStr = s;
  if (index >= 0 && index < s.length && stringLength > 0) {
    resultStr = s.substr(0, index) + s.substr(index + stringLength, s.length - index - stringLength);
  }
  return resultStr;
};
goog.string.remove = function(s, ss) {
  var re = new RegExp(goog.string.regExpEscape(ss), "");
  return s.replace(re, "");
};
goog.string.removeAll = function(s, ss) {
  var re = new RegExp(goog.string.regExpEscape(ss), "g");
  return s.replace(re, "");
};
goog.string.regExpEscape = function(s) {
  return String(s).replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g, "\\$1").replace(/\x08/g, "\\x08");
};
goog.string.repeat = function(string, length) {
  return (new Array(length + 1)).join(string);
};
goog.string.padNumber = function(num, length, opt_precision) {
  var s = goog.isDef(opt_precision) ? num.toFixed(opt_precision) : String(num);
  var index = s.indexOf(".");
  if (index == -1) {
    index = s.length;
  }
  return goog.string.repeat("0", Math.max(0, length - index)) + s;
};
goog.string.makeSafe = function(obj) {
  return obj == null ? "" : String(obj);
};
goog.string.buildString = function(var_args) {
  return Array.prototype.join.call(arguments, "");
};
goog.string.getRandomString = function() {
  var x = 2147483648;
  return Math.floor(Math.random() * x).toString(36) + Math.abs(Math.floor(Math.random() * x) ^ goog.now()).toString(36);
};
goog.string.compareVersions = function(version1, version2) {
  var order = 0;
  var v1Subs = goog.string.trim(String(version1)).split(".");
  var v2Subs = goog.string.trim(String(version2)).split(".");
  var subCount = Math.max(v1Subs.length, v2Subs.length);
  for (var subIdx = 0;order == 0 && subIdx < subCount;subIdx++) {
    var v1Sub = v1Subs[subIdx] || "";
    var v2Sub = v2Subs[subIdx] || "";
    var v1CompParser = new RegExp("(\\d*)(\\D*)", "g");
    var v2CompParser = new RegExp("(\\d*)(\\D*)", "g");
    do {
      var v1Comp = v1CompParser.exec(v1Sub) || ["", "", ""];
      var v2Comp = v2CompParser.exec(v2Sub) || ["", "", ""];
      if (v1Comp[0].length == 0 && v2Comp[0].length == 0) {
        break;
      }
      var v1CompNum = v1Comp[1].length == 0 ? 0 : parseInt(v1Comp[1], 10);
      var v2CompNum = v2Comp[1].length == 0 ? 0 : parseInt(v2Comp[1], 10);
      order = goog.string.compareElements_(v1CompNum, v2CompNum) || goog.string.compareElements_(v1Comp[2].length == 0, v2Comp[2].length == 0) || goog.string.compareElements_(v1Comp[2], v2Comp[2]);
    } while (order == 0);
  }
  return order;
};
goog.string.compareElements_ = function(left, right) {
  if (left < right) {
    return -1;
  } else {
    if (left > right) {
      return 1;
    }
  }
  return 0;
};
goog.string.HASHCODE_MAX_ = 4294967296;
goog.string.hashCode = function(str) {
  var result = 0;
  for (var i = 0;i < str.length;++i) {
    result = 31 * result + str.charCodeAt(i);
    result %= goog.string.HASHCODE_MAX_;
  }
  return result;
};
goog.string.uniqueStringCounter_ = Math.random() * 2147483648 | 0;
goog.string.createUniqueString = function() {
  return "goog_" + goog.string.uniqueStringCounter_++;
};
goog.string.toNumber = function(str) {
  var num = Number(str);
  if (num == 0 && goog.string.isEmptyOrWhitespace(str)) {
    return NaN;
  }
  return num;
};
goog.string.isLowerCamelCase = function(str) {
  return /^[a-z]+([A-Z][a-z]*)*$/.test(str);
};
goog.string.isUpperCamelCase = function(str) {
  return /^([A-Z][a-z]*)+$/.test(str);
};
goog.string.toCamelCase = function(str) {
  return String(str).replace(/\-([a-z])/g, function(all, match) {
    return match.toUpperCase();
  });
};
goog.string.toSelectorCase = function(str) {
  return String(str).replace(/([A-Z])/g, "-$1").toLowerCase();
};
goog.string.toTitleCase = function(str, opt_delimiters) {
  var delimiters = goog.isString(opt_delimiters) ? goog.string.regExpEscape(opt_delimiters) : "\\s";
  delimiters = delimiters ? "|[" + delimiters + "]+" : "";
  var regexp = new RegExp("(^" + delimiters + ")([a-z])", "g");
  return str.replace(regexp, function(all, p1, p2) {
    return p1 + p2.toUpperCase();
  });
};
goog.string.capitalize = function(str) {
  return String(str.charAt(0)).toUpperCase() + String(str.substr(1)).toLowerCase();
};
goog.string.parseInt = function(value) {
  if (isFinite(value)) {
    value = String(value);
  }
  if (goog.isString(value)) {
    return /^\s*-?0x/i.test(value) ? parseInt(value, 16) : parseInt(value, 10);
  }
  return NaN;
};
goog.string.splitLimit = function(str, separator, limit) {
  var parts = str.split(separator);
  var returnVal = [];
  while (limit > 0 && parts.length) {
    returnVal.push(parts.shift());
    limit--;
  }
  if (parts.length) {
    returnVal.push(parts.join(separator));
  }
  return returnVal;
};
goog.string.editDistance = function(a, b) {
  var v0 = [];
  var v1 = [];
  if (a == b) {
    return 0;
  }
  if (!a.length || !b.length) {
    return Math.max(a.length, b.length);
  }
  for (var i = 0;i < b.length + 1;i++) {
    v0[i] = i;
  }
  for (var i = 0;i < a.length;i++) {
    v1[0] = i + 1;
    for (var j = 0;j < b.length;j++) {
      var cost = a[i] != b[j];
      v1[j + 1] = Math.min(v1[j] + 1, v0[j + 1] + 1, v0[j] + cost);
    }
    for (var j = 0;j < v0.length;j++) {
      v0[j] = v1[j];
    }
  }
  return v1[b.length];
};
goog.provide("goog.structs");
goog.require("goog.array");
goog.require("goog.object");
goog.structs.getCount = function(col) {
  if (typeof col.getCount == "function") {
    return col.getCount();
  }
  if (goog.isArrayLike(col) || goog.isString(col)) {
    return col.length;
  }
  return goog.object.getCount(col);
};
goog.structs.getValues = function(col) {
  if (typeof col.getValues == "function") {
    return col.getValues();
  }
  if (goog.isString(col)) {
    return col.split("");
  }
  if (goog.isArrayLike(col)) {
    var rv = [];
    var l = col.length;
    for (var i = 0;i < l;i++) {
      rv.push(col[i]);
    }
    return rv;
  }
  return goog.object.getValues(col);
};
goog.structs.getKeys = function(col) {
  if (typeof col.getKeys == "function") {
    return col.getKeys();
  }
  if (typeof col.getValues == "function") {
    return undefined;
  }
  if (goog.isArrayLike(col) || goog.isString(col)) {
    var rv = [];
    var l = col.length;
    for (var i = 0;i < l;i++) {
      rv.push(i);
    }
    return rv;
  }
  return goog.object.getKeys(col);
};
goog.structs.contains = function(col, val) {
  if (typeof col.contains == "function") {
    return col.contains(val);
  }
  if (typeof col.containsValue == "function") {
    return col.containsValue(val);
  }
  if (goog.isArrayLike(col) || goog.isString(col)) {
    return goog.array.contains((col), val);
  }
  return goog.object.containsValue(col, val);
};
goog.structs.isEmpty = function(col) {
  if (typeof col.isEmpty == "function") {
    return col.isEmpty();
  }
  if (goog.isArrayLike(col) || goog.isString(col)) {
    return goog.array.isEmpty((col));
  }
  return goog.object.isEmpty(col);
};
goog.structs.clear = function(col) {
  if (typeof col.clear == "function") {
    col.clear();
  } else {
    if (goog.isArrayLike(col)) {
      goog.array.clear((col));
    } else {
      goog.object.clear(col);
    }
  }
};
goog.structs.forEach = function(col, f, opt_obj) {
  if (typeof col.forEach == "function") {
    col.forEach(f, opt_obj);
  } else {
    if (goog.isArrayLike(col) || goog.isString(col)) {
      goog.array.forEach((col), f, opt_obj);
    } else {
      var keys = goog.structs.getKeys(col);
      var values = goog.structs.getValues(col);
      var l = values.length;
      for (var i = 0;i < l;i++) {
        f.call(opt_obj, values[i], keys && keys[i], col);
      }
    }
  }
};
goog.structs.filter = function(col, f, opt_obj) {
  if (typeof col.filter == "function") {
    return col.filter(f, opt_obj);
  }
  if (goog.isArrayLike(col) || goog.isString(col)) {
    return goog.array.filter((col), f, opt_obj);
  }
  var rv;
  var keys = goog.structs.getKeys(col);
  var values = goog.structs.getValues(col);
  var l = values.length;
  if (keys) {
    rv = {};
    for (var i = 0;i < l;i++) {
      if (f.call(opt_obj, values[i], keys[i], col)) {
        rv[keys[i]] = values[i];
      }
    }
  } else {
    rv = [];
    for (var i = 0;i < l;i++) {
      if (f.call(opt_obj, values[i], undefined, col)) {
        rv.push(values[i]);
      }
    }
  }
  return rv;
};
goog.structs.map = function(col, f, opt_obj) {
  if (typeof col.map == "function") {
    return col.map(f, opt_obj);
  }
  if (goog.isArrayLike(col) || goog.isString(col)) {
    return goog.array.map((col), f, opt_obj);
  }
  var rv;
  var keys = goog.structs.getKeys(col);
  var values = goog.structs.getValues(col);
  var l = values.length;
  if (keys) {
    rv = {};
    for (var i = 0;i < l;i++) {
      rv[keys[i]] = f.call(opt_obj, values[i], keys[i], col);
    }
  } else {
    rv = [];
    for (var i = 0;i < l;i++) {
      rv[i] = f.call(opt_obj, values[i], undefined, col);
    }
  }
  return rv;
};
goog.structs.some = function(col, f, opt_obj) {
  if (typeof col.some == "function") {
    return col.some(f, opt_obj);
  }
  if (goog.isArrayLike(col) || goog.isString(col)) {
    return goog.array.some((col), f, opt_obj);
  }
  var keys = goog.structs.getKeys(col);
  var values = goog.structs.getValues(col);
  var l = values.length;
  for (var i = 0;i < l;i++) {
    if (f.call(opt_obj, values[i], keys && keys[i], col)) {
      return true;
    }
  }
  return false;
};
goog.structs.every = function(col, f, opt_obj) {
  if (typeof col.every == "function") {
    return col.every(f, opt_obj);
  }
  if (goog.isArrayLike(col) || goog.isString(col)) {
    return goog.array.every((col), f, opt_obj);
  }
  var keys = goog.structs.getKeys(col);
  var values = goog.structs.getValues(col);
  var l = values.length;
  for (var i = 0;i < l;i++) {
    if (!f.call(opt_obj, values[i], keys && keys[i], col)) {
      return false;
    }
  }
  return true;
};
goog.provide("goog.structs.Collection");
goog.structs.Collection = function() {
};
goog.structs.Collection.prototype.add;
goog.structs.Collection.prototype.remove;
goog.structs.Collection.prototype.contains;
goog.structs.Collection.prototype.getCount;
goog.provide("goog.labs.object");
goog.labs.object.is = function(v, v2) {
  if (v === v2) {
    return v !== 0 || 1 / v === 1 / (v2);
  }
  return v !== v && v2 !== v2;
};
goog.provide("goog.labs.structs.Map");
goog.require("goog.array");
goog.require("goog.asserts");
goog.require("goog.labs.object");
goog.require("goog.object");
goog.labs.structs.Map = function() {
  this.clear();
};
goog.labs.structs.Map.objectPropertyIsEnumerable_ = Object.prototype.propertyIsEnumerable;
goog.labs.structs.Map.objectHasOwnProperty_ = Object.prototype.hasOwnProperty;
goog.labs.structs.Map.prototype.map_;
goog.labs.structs.Map.prototype.secondaryStoreKeys_;
goog.labs.structs.Map.prototype.secondaryStoreValues_;
goog.labs.structs.Map.prototype.count_;
goog.labs.structs.Map.prototype.set = function(key, value) {
  this.assertKeyIsString_(key);
  var newKey = !this.hasKeyInPrimaryStore_(key);
  this.map_[key] = value;
  if (key == "__proto__" || !goog.labs.structs.Map.BrowserFeature.OBJECT_CREATE_SUPPORTED && !goog.labs.structs.Map.objectPropertyIsEnumerable_.call(this.map_, key)) {
    delete this.map_[key];
    var index = goog.array.indexOf(this.secondaryStoreKeys_, key);
    if (newKey = index < 0) {
      index = this.secondaryStoreKeys_.length;
    }
    this.secondaryStoreKeys_[index] = key;
    this.secondaryStoreValues_[index] = value;
  }
  if (newKey) {
    this.count_++;
  }
};
goog.labs.structs.Map.prototype.get = function(key, opt_default) {
  this.assertKeyIsString_(key);
  if (this.hasKeyInPrimaryStore_(key)) {
    return this.map_[key];
  }
  var index = goog.array.indexOf(this.secondaryStoreKeys_, key);
  return index >= 0 ? this.secondaryStoreValues_[index] : opt_default;
};
goog.labs.structs.Map.prototype.remove = function(key) {
  this.assertKeyIsString_(key);
  if (this.hasKeyInPrimaryStore_(key)) {
    this.count_--;
    delete this.map_[key];
    return true;
  } else {
    var index = goog.array.indexOf(this.secondaryStoreKeys_, key);
    if (index >= 0) {
      this.count_--;
      goog.array.removeAt(this.secondaryStoreKeys_, index);
      goog.array.removeAt(this.secondaryStoreValues_, index);
      return true;
    }
  }
  return false;
};
goog.labs.structs.Map.prototype.addAll = function(map) {
  goog.array.forEach(map.getKeys(), function(key) {
    this.set(key, map.get(key));
  }, this);
};
goog.labs.structs.Map.prototype.isEmpty = function() {
  return !this.count_;
};
goog.labs.structs.Map.prototype.getCount = function() {
  return this.count_;
};
goog.labs.structs.Map.prototype.containsKey = function(key) {
  this.assertKeyIsString_(key);
  return this.hasKeyInPrimaryStore_(key) || goog.array.contains(this.secondaryStoreKeys_, key);
};
goog.labs.structs.Map.prototype.containsValue = function(value) {
  var found = goog.object.some(this.map_, function(v, k) {
    return this.hasKeyInPrimaryStore_(k) && goog.labs.object.is(v, value);
  }, this);
  return found || goog.array.contains(this.secondaryStoreValues_, value);
};
goog.labs.structs.Map.prototype.getKeys = function() {
  var keys;
  if (goog.labs.structs.Map.BrowserFeature.OBJECT_KEYS_SUPPORTED) {
    keys = goog.array.clone(Object.keys(this.map_));
  } else {
    keys = [];
    for (var key in this.map_) {
      if (goog.labs.structs.Map.objectHasOwnProperty_.call(this.map_, key)) {
        keys.push(key);
      }
    }
  }
  goog.array.extend(keys, this.secondaryStoreKeys_);
  return keys;
};
goog.labs.structs.Map.prototype.getValues = function() {
  var values = [];
  var keys = this.getKeys();
  for (var i = 0;i < keys.length;i++) {
    values.push(this.get(keys[i]));
  }
  return values;
};
goog.labs.structs.Map.prototype.getEntries = function() {
  var entries = [];
  var keys = this.getKeys();
  for (var i = 0;i < keys.length;i++) {
    var key = keys[i];
    entries.push([key, this.get(key)]);
  }
  return entries;
};
goog.labs.structs.Map.prototype.clear = function() {
  this.map_ = goog.labs.structs.Map.BrowserFeature.OBJECT_CREATE_SUPPORTED ? Object.create(null) : {};
  this.secondaryStoreKeys_ = [];
  this.secondaryStoreValues_ = [];
  this.count_ = 0;
};
goog.labs.structs.Map.prototype.clone = function() {
  var map = new goog.labs.structs.Map;
  map.addAll(this);
  return map;
};
goog.labs.structs.Map.prototype.hasKeyInPrimaryStore_ = function(key) {
  if (key == "__proto__") {
    return false;
  }
  if (goog.labs.structs.Map.BrowserFeature.OBJECT_CREATE_SUPPORTED) {
    return key in this.map_;
  }
  return goog.labs.structs.Map.objectHasOwnProperty_.call(this.map_, key);
};
goog.labs.structs.Map.prototype.assertKeyIsString_ = function(key) {
  goog.asserts.assert(goog.isString(key), "key must be a string.");
};
goog.labs.structs.Map.BrowserFeature = {OBJECT_CREATE_SUPPORTED:!!Object.create, OBJECT_KEYS_SUPPORTED:!!Object.keys};
goog.provide("goog.structs.Node");
goog.structs.Node = function(key, value) {
  this.key_ = key;
  this.value_ = value;
};
goog.structs.Node.prototype.getKey = function() {
  return this.key_;
};
goog.structs.Node.prototype.getValue = function() {
  return this.value_;
};
goog.structs.Node.prototype.clone = function() {
  return new goog.structs.Node(this.key_, this.value_);
};
goog.provide("goog.functions");
goog.functions.constant = function(retValue) {
  return function() {
    return retValue;
  };
};
goog.functions.FALSE = goog.functions.constant(false);
goog.functions.TRUE = goog.functions.constant(true);
goog.functions.NULL = goog.functions.constant(null);
goog.functions.identity = function(opt_returnValue, var_args) {
  return opt_returnValue;
};
goog.functions.error = function(message) {
  return function() {
    throw Error(message);
  };
};
goog.functions.fail = function(err) {
  return function() {
    throw err;
  };
};
goog.functions.lock = function(f, opt_numArgs) {
  opt_numArgs = opt_numArgs || 0;
  return function() {
    return f.apply(this, Array.prototype.slice.call(arguments, 0, opt_numArgs));
  };
};
goog.functions.nth = function(n) {
  return function() {
    return arguments[n];
  };
};
goog.functions.withReturnValue = function(f, retValue) {
  return goog.functions.sequence(f, goog.functions.constant(retValue));
};
goog.functions.equalTo = function(value, opt_useLooseComparison) {
  return function(other) {
    return opt_useLooseComparison ? value == other : value === other;
  };
};
goog.functions.compose = function(fn, var_args) {
  var functions = arguments;
  var length = functions.length;
  return function() {
    var result;
    if (length) {
      result = functions[length - 1].apply(this, arguments);
    }
    for (var i = length - 2;i >= 0;i--) {
      result = functions[i].call(this, result);
    }
    return result;
  };
};
goog.functions.sequence = function(var_args) {
  var functions = arguments;
  var length = functions.length;
  return function() {
    var result;
    for (var i = 0;i < length;i++) {
      result = functions[i].apply(this, arguments);
    }
    return result;
  };
};
goog.functions.and = function(var_args) {
  var functions = arguments;
  var length = functions.length;
  return function() {
    for (var i = 0;i < length;i++) {
      if (!functions[i].apply(this, arguments)) {
        return false;
      }
    }
    return true;
  };
};
goog.functions.or = function(var_args) {
  var functions = arguments;
  var length = functions.length;
  return function() {
    for (var i = 0;i < length;i++) {
      if (functions[i].apply(this, arguments)) {
        return true;
      }
    }
    return false;
  };
};
goog.functions.not = function(f) {
  return function() {
    return !f.apply(this, arguments);
  };
};
goog.functions.create = function(constructor, var_args) {
  var temp = function() {
  };
  temp.prototype = constructor.prototype;
  var obj = new temp;
  constructor.apply(obj, Array.prototype.slice.call(arguments, 1));
  return obj;
};
goog.define("goog.functions.CACHE_RETURN_VALUE", true);
goog.functions.cacheReturnValue = function(fn) {
  var called = false;
  var value;
  return function() {
    if (!goog.functions.CACHE_RETURN_VALUE) {
      return fn();
    }
    if (!called) {
      value = fn();
      called = true;
    }
    return value;
  };
};
goog.provide("goog.async.WorkItem");
goog.provide("goog.async.WorkQueue");
goog.require("goog.asserts");
goog.require("goog.async.FreeList");
goog.async.WorkQueue = function() {
  this.workHead_ = null;
  this.workTail_ = null;
};
goog.define("goog.async.WorkQueue.DEFAULT_MAX_UNUSED", 100);
goog.async.WorkQueue.freelist_ = new goog.async.FreeList(function() {
  return new goog.async.WorkItem;
}, function(item) {
  item.reset();
}, goog.async.WorkQueue.DEFAULT_MAX_UNUSED);
goog.async.WorkQueue.prototype.add = function(fn, scope) {
  var item = this.getUnusedItem_();
  item.set(fn, scope);
  if (this.workTail_) {
    this.workTail_.next = item;
    this.workTail_ = item;
  } else {
    goog.asserts.assert(!this.workHead_);
    this.workHead_ = item;
    this.workTail_ = item;
  }
};
goog.async.WorkQueue.prototype.remove = function() {
  var item = null;
  if (this.workHead_) {
    item = this.workHead_;
    this.workHead_ = this.workHead_.next;
    if (!this.workHead_) {
      this.workTail_ = null;
    }
    item.next = null;
  }
  return item;
};
goog.async.WorkQueue.prototype.returnUnused = function(item) {
  goog.async.WorkQueue.freelist_.put(item);
};
goog.async.WorkQueue.prototype.getUnusedItem_ = function() {
  return goog.async.WorkQueue.freelist_.get();
};
goog.async.WorkItem = function() {
  this.fn = null;
  this.scope = null;
  this.next = null;
};
goog.async.WorkItem.prototype.set = function(fn, scope) {
  this.fn = fn;
  this.scope = scope;
  this.next = null;
};
goog.async.WorkItem.prototype.reset = function() {
  this.fn = null;
  this.scope = null;
  this.next = null;
};
goog.provide("goog.testing.watchers");
goog.testing.watchers.resetWatchers_ = [];
goog.testing.watchers.signalClockReset = function() {
  var watchers = goog.testing.watchers.resetWatchers_;
  for (var i = 0;i < watchers.length;i++) {
    goog.testing.watchers.resetWatchers_[i]();
  }
};
goog.testing.watchers.watchClockReset = function(fn) {
  goog.testing.watchers.resetWatchers_.push(fn);
};
goog.provide("goog.debug.EntryPointMonitor");
goog.provide("goog.debug.entryPointRegistry");
goog.require("goog.asserts");
goog.debug.EntryPointMonitor = function() {
};
goog.debug.EntryPointMonitor.prototype.wrap;
goog.debug.EntryPointMonitor.prototype.unwrap;
goog.debug.entryPointRegistry.refList_ = [];
goog.debug.entryPointRegistry.monitors_ = [];
goog.debug.entryPointRegistry.monitorsMayExist_ = false;
goog.debug.entryPointRegistry.register = function(callback) {
  goog.debug.entryPointRegistry.refList_[goog.debug.entryPointRegistry.refList_.length] = callback;
  if (goog.debug.entryPointRegistry.monitorsMayExist_) {
    var monitors = goog.debug.entryPointRegistry.monitors_;
    for (var i = 0;i < monitors.length;i++) {
      callback(goog.bind(monitors[i].wrap, monitors[i]));
    }
  }
};
goog.debug.entryPointRegistry.monitorAll = function(monitor) {
  goog.debug.entryPointRegistry.monitorsMayExist_ = true;
  var transformer = goog.bind(monitor.wrap, monitor);
  for (var i = 0;i < goog.debug.entryPointRegistry.refList_.length;i++) {
    goog.debug.entryPointRegistry.refList_[i](transformer);
  }
  goog.debug.entryPointRegistry.monitors_.push(monitor);
};
goog.debug.entryPointRegistry.unmonitorAllIfPossible = function(monitor) {
  var monitors = goog.debug.entryPointRegistry.monitors_;
  goog.asserts.assert(monitor == monitors[monitors.length - 1], "Only the most recent monitor can be unwrapped.");
  var transformer = goog.bind(monitor.unwrap, monitor);
  for (var i = 0;i < goog.debug.entryPointRegistry.refList_.length;i++) {
    goog.debug.entryPointRegistry.refList_[i](transformer);
  }
  monitors.length--;
};
goog.provide("goog.dom.TagName");
goog.dom.TagName = {A:"A", ABBR:"ABBR", ACRONYM:"ACRONYM", ADDRESS:"ADDRESS", APPLET:"APPLET", AREA:"AREA", ARTICLE:"ARTICLE", ASIDE:"ASIDE", AUDIO:"AUDIO", B:"B", BASE:"BASE", BASEFONT:"BASEFONT", BDI:"BDI", BDO:"BDO", BIG:"BIG", BLOCKQUOTE:"BLOCKQUOTE", BODY:"BODY", BR:"BR", BUTTON:"BUTTON", CANVAS:"CANVAS", CAPTION:"CAPTION", CENTER:"CENTER", CITE:"CITE", CODE:"CODE", COL:"COL", COLGROUP:"COLGROUP", COMMAND:"COMMAND", DATA:"DATA", DATALIST:"DATALIST", DD:"DD", DEL:"DEL", DETAILS:"DETAILS", DFN:"DFN", 
DIALOG:"DIALOG", DIR:"DIR", DIV:"DIV", DL:"DL", DT:"DT", EM:"EM", EMBED:"EMBED", FIELDSET:"FIELDSET", FIGCAPTION:"FIGCAPTION", FIGURE:"FIGURE", FONT:"FONT", FOOTER:"FOOTER", FORM:"FORM", FRAME:"FRAME", FRAMESET:"FRAMESET", H1:"H1", H2:"H2", H3:"H3", H4:"H4", H5:"H5", H6:"H6", HEAD:"HEAD", HEADER:"HEADER", HGROUP:"HGROUP", HR:"HR", HTML:"HTML", I:"I", IFRAME:"IFRAME", IMG:"IMG", INPUT:"INPUT", INS:"INS", ISINDEX:"ISINDEX", KBD:"KBD", KEYGEN:"KEYGEN", LABEL:"LABEL", LEGEND:"LEGEND", LI:"LI", LINK:"LINK", 
MAP:"MAP", MARK:"MARK", MATH:"MATH", MENU:"MENU", META:"META", METER:"METER", NAV:"NAV", NOFRAMES:"NOFRAMES", NOSCRIPT:"NOSCRIPT", OBJECT:"OBJECT", OL:"OL", OPTGROUP:"OPTGROUP", OPTION:"OPTION", OUTPUT:"OUTPUT", P:"P", PARAM:"PARAM", PRE:"PRE", PROGRESS:"PROGRESS", Q:"Q", RP:"RP", RT:"RT", RUBY:"RUBY", S:"S", SAMP:"SAMP", SCRIPT:"SCRIPT", SECTION:"SECTION", SELECT:"SELECT", SMALL:"SMALL", SOURCE:"SOURCE", SPAN:"SPAN", STRIKE:"STRIKE", STRONG:"STRONG", STYLE:"STYLE", SUB:"SUB", SUMMARY:"SUMMARY", 
SUP:"SUP", SVG:"SVG", TABLE:"TABLE", TBODY:"TBODY", TD:"TD", TEMPLATE:"TEMPLATE", TEXTAREA:"TEXTAREA", TFOOT:"TFOOT", TH:"TH", THEAD:"THEAD", TIME:"TIME", TITLE:"TITLE", TR:"TR", TRACK:"TRACK", TT:"TT", U:"U", UL:"UL", VAR:"VAR", VIDEO:"VIDEO", WBR:"WBR"};
goog.provide("goog.labs.userAgent.browser");
goog.require("goog.array");
goog.require("goog.labs.userAgent.util");
goog.require("goog.object");
goog.require("goog.string");
goog.labs.userAgent.browser.matchOpera_ = function() {
  return goog.labs.userAgent.util.matchUserAgent("Opera") || goog.labs.userAgent.util.matchUserAgent("OPR");
};
goog.labs.userAgent.browser.matchIE_ = function() {
  return goog.labs.userAgent.util.matchUserAgent("Edge") || goog.labs.userAgent.util.matchUserAgent("Trident") || goog.labs.userAgent.util.matchUserAgent("MSIE");
};
goog.labs.userAgent.browser.matchFirefox_ = function() {
  return goog.labs.userAgent.util.matchUserAgent("Firefox");
};
goog.labs.userAgent.browser.matchSafari_ = function() {
  return goog.labs.userAgent.util.matchUserAgent("Safari") && !(goog.labs.userAgent.browser.matchChrome_() || goog.labs.userAgent.browser.matchCoast_() || goog.labs.userAgent.browser.matchOpera_() || goog.labs.userAgent.browser.matchIE_() || goog.labs.userAgent.browser.isSilk() || goog.labs.userAgent.util.matchUserAgent("Android"));
};
goog.labs.userAgent.browser.matchCoast_ = function() {
  return goog.labs.userAgent.util.matchUserAgent("Coast");
};
goog.labs.userAgent.browser.matchIosWebview_ = function() {
  return (goog.labs.userAgent.util.matchUserAgent("iPad") || goog.labs.userAgent.util.matchUserAgent("iPhone")) && !goog.labs.userAgent.browser.matchSafari_() && !goog.labs.userAgent.browser.matchChrome_() && !goog.labs.userAgent.browser.matchCoast_() && goog.labs.userAgent.util.matchUserAgent("AppleWebKit");
};
goog.labs.userAgent.browser.matchChrome_ = function() {
  return (goog.labs.userAgent.util.matchUserAgent("Chrome") || goog.labs.userAgent.util.matchUserAgent("CriOS")) && !goog.labs.userAgent.browser.matchOpera_() && !goog.labs.userAgent.browser.matchIE_();
};
goog.labs.userAgent.browser.matchAndroidBrowser_ = function() {
  return goog.labs.userAgent.util.matchUserAgent("Android") && !(goog.labs.userAgent.browser.isChrome() || goog.labs.userAgent.browser.isFirefox() || goog.labs.userAgent.browser.isOpera() || goog.labs.userAgent.browser.isSilk());
};
goog.labs.userAgent.browser.isOpera = goog.labs.userAgent.browser.matchOpera_;
goog.labs.userAgent.browser.isIE = goog.labs.userAgent.browser.matchIE_;
goog.labs.userAgent.browser.isFirefox = goog.labs.userAgent.browser.matchFirefox_;
goog.labs.userAgent.browser.isSafari = goog.labs.userAgent.browser.matchSafari_;
goog.labs.userAgent.browser.isCoast = goog.labs.userAgent.browser.matchCoast_;
goog.labs.userAgent.browser.isIosWebview = goog.labs.userAgent.browser.matchIosWebview_;
goog.labs.userAgent.browser.isChrome = goog.labs.userAgent.browser.matchChrome_;
goog.labs.userAgent.browser.isAndroidBrowser = goog.labs.userAgent.browser.matchAndroidBrowser_;
goog.labs.userAgent.browser.isSilk = function() {
  return goog.labs.userAgent.util.matchUserAgent("Silk");
};
goog.labs.userAgent.browser.getVersion = function() {
  var userAgentString = goog.labs.userAgent.util.getUserAgent();
  if (goog.labs.userAgent.browser.isIE()) {
    return goog.labs.userAgent.browser.getIEVersion_(userAgentString);
  }
  var versionTuples = goog.labs.userAgent.util.extractVersionTuples(userAgentString);
  var versionMap = {};
  goog.array.forEach(versionTuples, function(tuple) {
    var key = tuple[0];
    var value = tuple[1];
    versionMap[key] = value;
  });
  var versionMapHasKey = goog.partial(goog.object.containsKey, versionMap);
  function lookUpValueWithKeys(keys) {
    var key = goog.array.find(keys, versionMapHasKey);
    return versionMap[key] || "";
  }
  if (goog.labs.userAgent.browser.isOpera()) {
    return lookUpValueWithKeys(["Version", "Opera", "OPR"]);
  }
  if (goog.labs.userAgent.browser.isChrome()) {
    return lookUpValueWithKeys(["Chrome", "CriOS"]);
  }
  var tuple = versionTuples[2];
  return tuple && tuple[1] || "";
};
goog.labs.userAgent.browser.isVersionOrHigher = function(version) {
  return goog.string.compareVersions(goog.labs.userAgent.browser.getVersion(), version) >= 0;
};
goog.labs.userAgent.browser.getIEVersion_ = function(userAgent) {
  var rv = /rv: *([\d\.]*)/.exec(userAgent);
  if (rv && rv[1]) {
    return rv[1];
  }
  var edge = /Edge\/([\d\.]+)/.exec(userAgent);
  if (edge) {
    return edge[1];
  }
  var version = "";
  var msie = /MSIE +([\d\.]+)/.exec(userAgent);
  if (msie && msie[1]) {
    var tridentVersion = /Trident\/(\d.\d)/.exec(userAgent);
    if (msie[1] == "7.0") {
      if (tridentVersion && tridentVersion[1]) {
        switch(tridentVersion[1]) {
          case "4.0":
            version = "8.0";
            break;
          case "5.0":
            version = "9.0";
            break;
          case "6.0":
            version = "10.0";
            break;
          case "7.0":
            version = "11.0";
            break;
        }
      } else {
        version = "7.0";
      }
    } else {
      version = msie[1];
    }
  }
  return version;
};
goog.provide("goog.labs.userAgent.engine");
goog.require("goog.array");
goog.require("goog.labs.userAgent.util");
goog.require("goog.string");
goog.labs.userAgent.engine.isPresto = function() {
  return goog.labs.userAgent.util.matchUserAgent("Presto");
};
goog.labs.userAgent.engine.isTrident = function() {
  return goog.labs.userAgent.util.matchUserAgent("Trident") || goog.labs.userAgent.util.matchUserAgent("MSIE");
};
goog.labs.userAgent.engine.isEdge = function() {
  return goog.labs.userAgent.util.matchUserAgent("Edge");
};
goog.labs.userAgent.engine.isWebKit = function() {
  return goog.labs.userAgent.util.matchUserAgentIgnoreCase("WebKit") && !goog.labs.userAgent.engine.isEdge();
};
goog.labs.userAgent.engine.isGecko = function() {
  return goog.labs.userAgent.util.matchUserAgent("Gecko") && !goog.labs.userAgent.engine.isWebKit() && !goog.labs.userAgent.engine.isTrident() && !goog.labs.userAgent.engine.isEdge();
};
goog.labs.userAgent.engine.getVersion = function() {
  var userAgentString = goog.labs.userAgent.util.getUserAgent();
  if (userAgentString) {
    var tuples = goog.labs.userAgent.util.extractVersionTuples(userAgentString);
    var engineTuple = goog.labs.userAgent.engine.getEngineTuple_(tuples);
    if (engineTuple) {
      if (engineTuple[0] == "Gecko") {
        return goog.labs.userAgent.engine.getVersionForKey_(tuples, "Firefox");
      }
      return engineTuple[1];
    }
    var browserTuple = tuples[0];
    var info;
    if (browserTuple && (info = browserTuple[2])) {
      var match = /Trident\/([^\s;]+)/.exec(info);
      if (match) {
        return match[1];
      }
    }
  }
  return "";
};
goog.labs.userAgent.engine.getEngineTuple_ = function(tuples) {
  if (!goog.labs.userAgent.engine.isEdge()) {
    return tuples[1];
  }
  for (var i = 0;i < tuples.length;i++) {
    var tuple = tuples[i];
    if (tuple[0] == "Edge") {
      return tuple;
    }
  }
};
goog.labs.userAgent.engine.isVersionOrHigher = function(version) {
  return goog.string.compareVersions(goog.labs.userAgent.engine.getVersion(), version) >= 0;
};
goog.labs.userAgent.engine.getVersionForKey_ = function(tuples, key) {
  var pair = goog.array.find(tuples, function(pair) {
    return key == pair[0];
  });
  return pair && pair[1] || "";
};
goog.provide("goog.labs.userAgent.util");
goog.require("goog.string");
goog.labs.userAgent.util.getNativeUserAgentString_ = function() {
  var navigator = goog.labs.userAgent.util.getNavigator_();
  if (navigator) {
    var userAgent = navigator.userAgent;
    if (userAgent) {
      return userAgent;
    }
  }
  return "";
};
goog.labs.userAgent.util.getNavigator_ = function() {
  return goog.global.navigator;
};
goog.labs.userAgent.util.userAgent_ = goog.labs.userAgent.util.getNativeUserAgentString_();
goog.labs.userAgent.util.setUserAgent = function(opt_userAgent) {
  goog.labs.userAgent.util.userAgent_ = opt_userAgent || goog.labs.userAgent.util.getNativeUserAgentString_();
};
goog.labs.userAgent.util.getUserAgent = function() {
  return goog.labs.userAgent.util.userAgent_;
};
goog.labs.userAgent.util.matchUserAgent = function(str) {
  var userAgent = goog.labs.userAgent.util.getUserAgent();
  return goog.string.contains(userAgent, str);
};
goog.labs.userAgent.util.matchUserAgentIgnoreCase = function(str) {
  var userAgent = goog.labs.userAgent.util.getUserAgent();
  return goog.string.caseInsensitiveContains(userAgent, str);
};
goog.labs.userAgent.util.extractVersionTuples = function(userAgent) {
  var versionRegExp = new RegExp("(\\w[\\w ]+)" + "/" + "([^\\s]+)" + "\\s*" + "(?:\\((.*?)\\))?", "g");
  var data = [];
  var match;
  while (match = versionRegExp.exec(userAgent)) {
    data.push([match[1], match[2], match[3] || undefined]);
  }
  return data;
};
var COMPILED = false;
var goog = goog || {};
goog.global = this;
goog.global.CLOSURE_UNCOMPILED_DEFINES;
goog.global.CLOSURE_DEFINES;
goog.isDef = function(val) {
  return val !== void 0;
};
goog.exportPath_ = function(name, opt_object, opt_objectToExportTo) {
  var parts = name.split(".");
  var cur = opt_objectToExportTo || goog.global;
  if (!(parts[0] in cur) && cur.execScript) {
    cur.execScript("var " + parts[0]);
  }
  for (var part;parts.length && (part = parts.shift());) {
    if (!parts.length && goog.isDef(opt_object)) {
      cur[part] = opt_object;
    } else {
      if (cur[part]) {
        cur = cur[part];
      } else {
        cur = cur[part] = {};
      }
    }
  }
};
goog.define = function(name, defaultValue) {
  var value = defaultValue;
  if (!COMPILED) {
    if (goog.global.CLOSURE_UNCOMPILED_DEFINES && Object.prototype.hasOwnProperty.call(goog.global.CLOSURE_UNCOMPILED_DEFINES, name)) {
      value = goog.global.CLOSURE_UNCOMPILED_DEFINES[name];
    } else {
      if (goog.global.CLOSURE_DEFINES && Object.prototype.hasOwnProperty.call(goog.global.CLOSURE_DEFINES, name)) {
        value = goog.global.CLOSURE_DEFINES[name];
      }
    }
  }
  goog.exportPath_(name, value);
};
goog.define("goog.DEBUG", true);
goog.define("goog.LOCALE", "en");
goog.define("goog.TRUSTED_SITE", true);
goog.define("goog.STRICT_MODE_COMPATIBLE", false);
goog.define("goog.DISALLOW_TEST_ONLY_CODE", COMPILED && !goog.DEBUG);
goog.define("goog.ENABLE_CHROME_APP_SAFE_SCRIPT_LOADING", false);
goog.provide = function(name) {
  if (!COMPILED) {
    if (goog.isProvided_(name)) {
      throw Error('Namespace "' + name + '" already declared.');
    }
  }
  goog.constructNamespace_(name);
};
goog.constructNamespace_ = function(name, opt_obj) {
  if (!COMPILED) {
    delete goog.implicitNamespaces_[name];
    var namespace = name;
    while (namespace = namespace.substring(0, namespace.lastIndexOf("."))) {
      if (goog.getObjectByName(namespace)) {
        break;
      }
      goog.implicitNamespaces_[namespace] = true;
    }
  }
  goog.exportPath_(name, opt_obj);
};
goog.VALID_MODULE_RE_ = /^[a-zA-Z_$][a-zA-Z0-9._$]*$/;
goog.module = function(name) {
  if (!goog.isString(name) || !name || name.search(goog.VALID_MODULE_RE_) == -1) {
    throw Error("Invalid module identifier");
  }
  if (!goog.isInModuleLoader_()) {
    throw Error("Module " + name + " has been loaded incorrectly.");
  }
  if (goog.moduleLoaderState_.moduleName) {
    throw Error("goog.module may only be called once per module.");
  }
  goog.moduleLoaderState_.moduleName = name;
  if (!COMPILED) {
    if (goog.isProvided_(name)) {
      throw Error('Namespace "' + name + '" already declared.');
    }
    delete goog.implicitNamespaces_[name];
  }
};
goog.module.get = function(name) {
  return goog.module.getInternal_(name);
};
goog.module.getInternal_ = function(name) {
  if (!COMPILED) {
    if (goog.isProvided_(name)) {
      return name in goog.loadedModules_ ? goog.loadedModules_[name] : goog.getObjectByName(name);
    } else {
      return null;
    }
  }
};
goog.moduleLoaderState_ = null;
goog.isInModuleLoader_ = function() {
  return goog.moduleLoaderState_ != null;
};
goog.module.declareTestMethods = function() {
  if (!goog.isInModuleLoader_()) {
    throw new Error("goog.module.declareTestMethods must be called from " + "within a goog.module");
  }
  goog.moduleLoaderState_.declareTestMethods = true;
};
goog.module.declareLegacyNamespace = function() {
  if (!COMPILED && !goog.isInModuleLoader_()) {
    throw new Error("goog.module.declareLegacyNamespace must be called from " + "within a goog.module");
  }
  if (!COMPILED && !goog.moduleLoaderState_.moduleName) {
    throw Error("goog.module must be called prior to " + "goog.module.declareLegacyNamespace.");
  }
  goog.moduleLoaderState_.declareLegacyNamespace = true;
};
goog.setTestOnly = function(opt_message) {
  if (goog.DISALLOW_TEST_ONLY_CODE) {
    opt_message = opt_message || "";
    throw Error("Importing test-only code into non-debug environment" + (opt_message ? ": " + opt_message : "."));
  }
};
goog.forwardDeclare = function(name) {
};
if (!COMPILED) {
  goog.isProvided_ = function(name) {
    return name in goog.loadedModules_ || !goog.implicitNamespaces_[name] && goog.isDefAndNotNull(goog.getObjectByName(name));
  };
  goog.implicitNamespaces_ = {"goog.module":true};
}
goog.getObjectByName = function(name, opt_obj) {
  var parts = name.split(".");
  var cur = opt_obj || goog.global;
  for (var part;part = parts.shift();) {
    if (goog.isDefAndNotNull(cur[part])) {
      cur = cur[part];
    } else {
      return null;
    }
  }
  return cur;
};
goog.globalize = function(obj, opt_global) {
  var global = opt_global || goog.global;
  for (var x in obj) {
    global[x] = obj[x];
  }
};
goog.addDependency = function(relPath, provides, requires, opt_isModule) {
  if (goog.DEPENDENCIES_ENABLED) {
    var provide, require;
    var path = relPath.replace(/\\/g, "/");
    var deps = goog.dependencies_;
    for (var i = 0;provide = provides[i];i++) {
      deps.nameToPath[provide] = path;
      deps.pathIsModule[path] = !!opt_isModule;
    }
    for (var j = 0;require = requires[j];j++) {
      if (!(path in deps.requires)) {
        deps.requires[path] = {};
      }
      deps.requires[path][require] = true;
    }
  }
};
goog.define("goog.ENABLE_DEBUG_LOADER", true);
goog.logToConsole_ = function(msg) {
  if (goog.global.console) {
    goog.global.console["error"](msg);
  }
};
goog.require = function(name) {
  if (!COMPILED) {
    if (goog.ENABLE_DEBUG_LOADER && goog.IS_OLD_IE_) {
      goog.maybeProcessDeferredDep_(name);
    }
    if (goog.isProvided_(name)) {
      if (goog.isInModuleLoader_()) {
        return goog.module.getInternal_(name);
      } else {
        return null;
      }
    }
    if (goog.ENABLE_DEBUG_LOADER) {
      var path = goog.getPathFromDeps_(name);
      if (path) {
        goog.included_[path] = true;
        goog.writeScripts_();
        return null;
      }
    }
    var errorMessage = "goog.require could not find: " + name;
    goog.logToConsole_(errorMessage);
    throw Error(errorMessage);
  }
};
goog.basePath = "";
goog.global.CLOSURE_BASE_PATH;
goog.global.CLOSURE_NO_DEPS;
goog.global.CLOSURE_IMPORT_SCRIPT;
goog.nullFunction = function() {
};
goog.abstractMethod = function() {
  throw Error("unimplemented abstract method");
};
goog.addSingletonGetter = function(ctor) {
  ctor.getInstance = function() {
    if (ctor.instance_) {
      return ctor.instance_;
    }
    if (goog.DEBUG) {
      goog.instantiatedSingletons_[goog.instantiatedSingletons_.length] = ctor;
    }
    return ctor.instance_ = new ctor;
  };
};
goog.instantiatedSingletons_ = [];
goog.define("goog.LOAD_MODULE_USING_EVAL", true);
goog.define("goog.SEAL_MODULE_EXPORTS", goog.DEBUG);
goog.loadedModules_ = {};
goog.DEPENDENCIES_ENABLED = !COMPILED && goog.ENABLE_DEBUG_LOADER;
if (goog.DEPENDENCIES_ENABLED) {
  goog.included_ = {};
  goog.dependencies_ = {pathIsModule:{}, nameToPath:{}, requires:{}, visited:{}, written:{}, deferred:{}};
  goog.inHtmlDocument_ = function() {
    var doc = goog.global.document;
    return typeof doc != "undefined" && "write" in doc;
  };
  goog.findBasePath_ = function() {
    if (goog.global.CLOSURE_BASE_PATH) {
      goog.basePath = goog.global.CLOSURE_BASE_PATH;
      return;
    } else {
      if (!goog.inHtmlDocument_()) {
        return;
      }
    }
    var doc = goog.global.document;
    var scripts = doc.getElementsByTagName("SCRIPT");
    for (var i = scripts.length - 1;i >= 0;--i) {
      var script = (scripts[i]);
      var src = script.src;
      var qmark = src.lastIndexOf("?");
      var l = qmark == -1 ? src.length : qmark;
      if (src.substr(l - 7, 7) == "base.js") {
        goog.basePath = src.substr(0, l - 7);
        return;
      }
    }
  };
  goog.importScript_ = function(src, opt_sourceText) {
    var importScript = goog.global.CLOSURE_IMPORT_SCRIPT || goog.writeScriptTag_;
    if (importScript(src, opt_sourceText)) {
      goog.dependencies_.written[src] = true;
    }
  };
  goog.IS_OLD_IE_ = !goog.global.atob && goog.global.document && goog.global.document.all;
  goog.importModule_ = function(src) {
    var bootstrap = 'goog.retrieveAndExecModule_("' + src + '");';
    if (goog.importScript_("", bootstrap)) {
      goog.dependencies_.written[src] = true;
    }
  };
  goog.queuedModules_ = [];
  goog.wrapModule_ = function(srcUrl, scriptText) {
    if (!goog.LOAD_MODULE_USING_EVAL || !goog.isDef(goog.global.JSON)) {
      return "" + "goog.loadModule(function(exports) {" + '"use strict";' + scriptText + "\n" + ";return exports" + "});" + "\n//# sourceURL=" + srcUrl + "\n";
    } else {
      return "" + "goog.loadModule(" + goog.global.JSON.stringify(scriptText + "\n//# sourceURL=" + srcUrl + "\n") + ");";
    }
  };
  goog.loadQueuedModules_ = function() {
    var count = goog.queuedModules_.length;
    if (count > 0) {
      var queue = goog.queuedModules_;
      goog.queuedModules_ = [];
      for (var i = 0;i < count;i++) {
        var path = queue[i];
        goog.maybeProcessDeferredPath_(path);
      }
    }
  };
  goog.maybeProcessDeferredDep_ = function(name) {
    if (goog.isDeferredModule_(name) && goog.allDepsAreAvailable_(name)) {
      var path = goog.getPathFromDeps_(name);
      goog.maybeProcessDeferredPath_(goog.basePath + path);
    }
  };
  goog.isDeferredModule_ = function(name) {
    var path = goog.getPathFromDeps_(name);
    if (path && goog.dependencies_.pathIsModule[path]) {
      var abspath = goog.basePath + path;
      return abspath in goog.dependencies_.deferred;
    }
    return false;
  };
  goog.allDepsAreAvailable_ = function(name) {
    var path = goog.getPathFromDeps_(name);
    if (path && path in goog.dependencies_.requires) {
      for (var requireName in goog.dependencies_.requires[path]) {
        if (!goog.isProvided_(requireName) && !goog.isDeferredModule_(requireName)) {
          return false;
        }
      }
    }
    return true;
  };
  goog.maybeProcessDeferredPath_ = function(abspath) {
    if (abspath in goog.dependencies_.deferred) {
      var src = goog.dependencies_.deferred[abspath];
      delete goog.dependencies_.deferred[abspath];
      goog.globalEval(src);
    }
  };
  goog.loadModule = function(moduleDef) {
    var previousState = goog.moduleLoaderState_;
    try {
      goog.moduleLoaderState_ = {moduleName:undefined, declareTestMethods:false};
      var exports;
      if (goog.isFunction(moduleDef)) {
        exports = moduleDef.call(goog.global, {});
      } else {
        if (goog.isString(moduleDef)) {
          exports = goog.loadModuleFromSource_.call(goog.global, moduleDef);
        } else {
          throw Error("Invalid module definition");
        }
      }
      var moduleName = goog.moduleLoaderState_.moduleName;
      if (!goog.isString(moduleName) || !moduleName) {
        throw Error('Invalid module name "' + moduleName + '"');
      }
      if (goog.moduleLoaderState_.declareLegacyNamespace) {
        goog.constructNamespace_(moduleName, exports);
      } else {
        if (goog.SEAL_MODULE_EXPORTS && Object.seal) {
          Object.seal(exports);
        }
      }
      goog.loadedModules_[moduleName] = exports;
      if (goog.moduleLoaderState_.declareTestMethods) {
        for (var entry in exports) {
          if (entry.indexOf("test", 0) === 0 || entry == "tearDown" || entry == "setUp" || entry == "setUpPage" || entry == "tearDownPage") {
            goog.global[entry] = exports[entry];
          }
        }
      }
    } finally {
      goog.moduleLoaderState_ = previousState;
    }
  };
  goog.loadModuleFromSource_ = function(source) {
    var exports = {};
    eval(arguments[0]);
    return exports;
  };
  goog.writeScriptSrcNode_ = function(src) {
    goog.global.document.write('<script type="text/javascript" src="' + src + '"></' + "script>");
  };
  goog.appendScriptSrcNode_ = function(src) {
    var doc = goog.global.document;
    var scriptEl = doc.createElement("script");
    scriptEl.type = "text/javascript";
    scriptEl.src = src;
    scriptEl.defer = false;
    scriptEl.async = false;
    doc.head.appendChild(scriptEl);
  };
  goog.writeScriptTag_ = function(src, opt_sourceText) {
    if (goog.inHtmlDocument_()) {
      var doc = goog.global.document;
      if (!goog.ENABLE_CHROME_APP_SAFE_SCRIPT_LOADING && doc.readyState == "complete") {
        var isDeps = /\bdeps.js$/.test(src);
        if (isDeps) {
          return false;
        } else {
          throw Error('Cannot write "' + src + '" after document load');
        }
      }
      var isOldIE = goog.IS_OLD_IE_;
      if (opt_sourceText === undefined) {
        if (!isOldIE) {
          if (goog.ENABLE_CHROME_APP_SAFE_SCRIPT_LOADING) {
            goog.appendScriptSrcNode_(src);
          } else {
            goog.writeScriptSrcNode_(src);
          }
        } else {
          var state = " onreadystatechange='goog.onScriptLoad_(this, " + ++goog.lastNonModuleScriptIndex_ + ")' ";
          doc.write('<script type="text/javascript" src="' + src + '"' + state + "></" + "script>");
        }
      } else {
        doc.write('<script type="text/javascript">' + opt_sourceText + "</" + "script>");
      }
      return true;
    } else {
      return false;
    }
  };
  goog.lastNonModuleScriptIndex_ = 0;
  goog.onScriptLoad_ = function(script, scriptIndex) {
    if (script.readyState == "complete" && goog.lastNonModuleScriptIndex_ == scriptIndex) {
      goog.loadQueuedModules_();
    }
    return true;
  };
  goog.writeScripts_ = function() {
    var scripts = [];
    var seenScript = {};
    var deps = goog.dependencies_;
    function visitNode(path) {
      if (path in deps.written) {
        return;
      }
      if (path in deps.visited) {
        if (!(path in seenScript)) {
          seenScript[path] = true;
          scripts.push(path);
        }
        return;
      }
      deps.visited[path] = true;
      if (path in deps.requires) {
        for (var requireName in deps.requires[path]) {
          if (!goog.isProvided_(requireName)) {
            if (requireName in deps.nameToPath) {
              visitNode(deps.nameToPath[requireName]);
            } else {
              throw Error("Undefined nameToPath for " + requireName);
            }
          }
        }
      }
      if (!(path in seenScript)) {
        seenScript[path] = true;
        scripts.push(path);
      }
    }
    for (var path in goog.included_) {
      if (!deps.written[path]) {
        visitNode(path);
      }
    }
    for (var i = 0;i < scripts.length;i++) {
      var path = scripts[i];
      goog.dependencies_.written[path] = true;
    }
    var moduleState = goog.moduleLoaderState_;
    goog.moduleLoaderState_ = null;
    var loadingModule = false;
    for (var i = 0;i < scripts.length;i++) {
      var path = scripts[i];
      if (path) {
        if (!deps.pathIsModule[path]) {
          goog.importScript_(goog.basePath + path);
        } else {
          loadingModule = true;
          goog.importModule_(goog.basePath + path);
        }
      } else {
        goog.moduleLoaderState_ = moduleState;
        throw Error("Undefined script input");
      }
    }
    goog.moduleLoaderState_ = moduleState;
  };
  goog.getPathFromDeps_ = function(rule) {
    if (rule in goog.dependencies_.nameToPath) {
      return goog.dependencies_.nameToPath[rule];
    } else {
      return null;
    }
  };
  goog.findBasePath_();
  if (!goog.global.CLOSURE_NO_DEPS) {
    goog.importScript_(goog.basePath + "deps.js");
  }
}
goog.normalizePath_ = function(path) {
  var components = path.split("/");
  var i = 0;
  while (i < components.length) {
    if (components[i] == ".") {
      components.splice(i, 1);
    } else {
      if (i && components[i] == ".." && components[i - 1] && components[i - 1] != "..") {
        components.splice(--i, 2);
      } else {
        i++;
      }
    }
  }
  return components.join("/");
};
goog.loadFileSync_ = function(src) {
  if (goog.global.CLOSURE_LOAD_FILE_SYNC) {
    return goog.global.CLOSURE_LOAD_FILE_SYNC(src);
  } else {
    var xhr = new goog.global["XMLHttpRequest"];
    xhr.open("get", src, false);
    xhr.send();
    return xhr.responseText;
  }
};
goog.retrieveAndExecModule_ = function(src) {
  if (!COMPILED) {
    var originalPath = src;
    src = goog.normalizePath_(src);
    var importScript = goog.global.CLOSURE_IMPORT_SCRIPT || goog.writeScriptTag_;
    var scriptText = goog.loadFileSync_(src);
    if (scriptText != null) {
      var execModuleScript = goog.wrapModule_(src, scriptText);
      var isOldIE = goog.IS_OLD_IE_;
      if (isOldIE) {
        goog.dependencies_.deferred[originalPath] = execModuleScript;
        goog.queuedModules_.push(originalPath);
      } else {
        importScript(src, execModuleScript);
      }
    } else {
      throw new Error("load of " + src + "failed");
    }
  }
};
goog.typeOf = function(value) {
  var s = typeof value;
  if (s == "object") {
    if (value) {
      if (value instanceof Array) {
        return "array";
      } else {
        if (value instanceof Object) {
          return s;
        }
      }
      var className = Object.prototype.toString.call((value));
      if (className == "[object Window]") {
        return "object";
      }
      if (className == "[object Array]" || typeof value.length == "number" && typeof value.splice != "undefined" && typeof value.propertyIsEnumerable != "undefined" && !value.propertyIsEnumerable("splice")) {
        return "array";
      }
      if (className == "[object Function]" || typeof value.call != "undefined" && typeof value.propertyIsEnumerable != "undefined" && !value.propertyIsEnumerable("call")) {
        return "function";
      }
    } else {
      return "null";
    }
  } else {
    if (s == "function" && typeof value.call == "undefined") {
      return "object";
    }
  }
  return s;
};
goog.isNull = function(val) {
  return val === null;
};
goog.isDefAndNotNull = function(val) {
  return val != null;
};
goog.isArray = function(val) {
  return goog.typeOf(val) == "array";
};
goog.isArrayLike = function(val) {
  var type = goog.typeOf(val);
  return type == "array" || type == "object" && typeof val.length == "number";
};
goog.isDateLike = function(val) {
  return goog.isObject(val) && typeof val.getFullYear == "function";
};
goog.isString = function(val) {
  return typeof val == "string";
};
goog.isBoolean = function(val) {
  return typeof val == "boolean";
};
goog.isNumber = function(val) {
  return typeof val == "number";
};
goog.isFunction = function(val) {
  return goog.typeOf(val) == "function";
};
goog.isObject = function(val) {
  var type = typeof val;
  return type == "object" && val != null || type == "function";
};
goog.getUid = function(obj) {
  return obj[goog.UID_PROPERTY_] || (obj[goog.UID_PROPERTY_] = ++goog.uidCounter_);
};
goog.hasUid = function(obj) {
  return !!obj[goog.UID_PROPERTY_];
};
goog.removeUid = function(obj) {
  if ("removeAttribute" in obj) {
    obj.removeAttribute(goog.UID_PROPERTY_);
  }
  try {
    delete obj[goog.UID_PROPERTY_];
  } catch (ex) {
  }
};
goog.UID_PROPERTY_ = "closure_uid_" + (Math.random() * 1E9 >>> 0);
goog.uidCounter_ = 0;
goog.getHashCode = goog.getUid;
goog.removeHashCode = goog.removeUid;
goog.cloneObject = function(obj) {
  var type = goog.typeOf(obj);
  if (type == "object" || type == "array") {
    if (obj.clone) {
      return obj.clone();
    }
    var clone = type == "array" ? [] : {};
    for (var key in obj) {
      clone[key] = goog.cloneObject(obj[key]);
    }
    return clone;
  }
  return obj;
};
goog.bindNative_ = function(fn, selfObj, var_args) {
  return (fn.call.apply(fn.bind, arguments));
};
goog.bindJs_ = function(fn, selfObj, var_args) {
  if (!fn) {
    throw new Error;
  }
  if (arguments.length > 2) {
    var boundArgs = Array.prototype.slice.call(arguments, 2);
    return function() {
      var newArgs = Array.prototype.slice.call(arguments);
      Array.prototype.unshift.apply(newArgs, boundArgs);
      return fn.apply(selfObj, newArgs);
    };
  } else {
    return function() {
      return fn.apply(selfObj, arguments);
    };
  }
};
goog.bind = function(fn, selfObj, var_args) {
  if (Function.prototype.bind && Function.prototype.bind.toString().indexOf("native code") != -1) {
    goog.bind = goog.bindNative_;
  } else {
    goog.bind = goog.bindJs_;
  }
  return goog.bind.apply(null, arguments);
};
goog.partial = function(fn, var_args) {
  var args = Array.prototype.slice.call(arguments, 1);
  return function() {
    var newArgs = args.slice();
    newArgs.push.apply(newArgs, arguments);
    return fn.apply(this, newArgs);
  };
};
goog.mixin = function(target, source) {
  for (var x in source) {
    target[x] = source[x];
  }
};
goog.now = goog.TRUSTED_SITE && Date.now || function() {
  return +new Date;
};
goog.globalEval = function(script) {
  if (goog.global.execScript) {
    goog.global.execScript(script, "JavaScript");
  } else {
    if (goog.global.eval) {
      if (goog.evalWorksForGlobals_ == null) {
        goog.global.eval("var _et_ = 1;");
        if (typeof goog.global["_et_"] != "undefined") {
          delete goog.global["_et_"];
          goog.evalWorksForGlobals_ = true;
        } else {
          goog.evalWorksForGlobals_ = false;
        }
      }
      if (goog.evalWorksForGlobals_) {
        goog.global.eval(script);
      } else {
        var doc = goog.global.document;
        var scriptElt = doc.createElement("SCRIPT");
        scriptElt.type = "text/javascript";
        scriptElt.defer = false;
        scriptElt.appendChild(doc.createTextNode(script));
        doc.body.appendChild(scriptElt);
        doc.body.removeChild(scriptElt);
      }
    } else {
      throw Error("goog.globalEval not available");
    }
  }
};
goog.evalWorksForGlobals_ = null;
goog.cssNameMapping_;
goog.cssNameMappingStyle_;
goog.getCssName = function(className, opt_modifier) {
  var getMapping = function(cssName) {
    return goog.cssNameMapping_[cssName] || cssName;
  };
  var renameByParts = function(cssName) {
    var parts = cssName.split("-");
    var mapped = [];
    for (var i = 0;i < parts.length;i++) {
      mapped.push(getMapping(parts[i]));
    }
    return mapped.join("-");
  };
  var rename;
  if (goog.cssNameMapping_) {
    rename = goog.cssNameMappingStyle_ == "BY_WHOLE" ? getMapping : renameByParts;
  } else {
    rename = function(a) {
      return a;
    };
  }
  if (opt_modifier) {
    return className + "-" + rename(opt_modifier);
  } else {
    return rename(className);
  }
};
goog.setCssNameMapping = function(mapping, opt_style) {
  goog.cssNameMapping_ = mapping;
  goog.cssNameMappingStyle_ = opt_style;
};
goog.global.CLOSURE_CSS_NAME_MAPPING;
if (!COMPILED && goog.global.CLOSURE_CSS_NAME_MAPPING) {
  goog.cssNameMapping_ = goog.global.CLOSURE_CSS_NAME_MAPPING;
}
goog.getMsg = function(str, opt_values) {
  if (opt_values) {
    str = str.replace(/\{\$([^}]+)}/g, function(match, key) {
      return key in opt_values ? opt_values[key] : match;
    });
  }
  return str;
};
goog.getMsgWithFallback = function(a, b) {
  return a;
};
goog.exportSymbol = function(publicPath, object, opt_objectToExportTo) {
  goog.exportPath_(publicPath, object, opt_objectToExportTo);
};
goog.exportProperty = function(object, publicName, symbol) {
  object[publicName] = symbol;
};
goog.inherits = function(childCtor, parentCtor) {
  function tempCtor() {
  }
  tempCtor.prototype = parentCtor.prototype;
  childCtor.superClass_ = parentCtor.prototype;
  childCtor.prototype = new tempCtor;
  childCtor.prototype.constructor = childCtor;
  childCtor.base = function(me, methodName, var_args) {
    var args = new Array(arguments.length - 2);
    for (var i = 2;i < arguments.length;i++) {
      args[i - 2] = arguments[i];
    }
    return parentCtor.prototype[methodName].apply(me, args);
  };
};
goog.base = function(me, opt_methodName, var_args) {
  var caller = arguments.callee.caller;
  if (goog.STRICT_MODE_COMPATIBLE || goog.DEBUG && !caller) {
    throw Error("arguments.caller not defined.  goog.base() cannot be used " + "with strict mode code. See " + "http://www.ecma-international.org/ecma-262/5.1/#sec-C");
  }
  if (caller.superClass_) {
    var ctorArgs = new Array(arguments.length - 1);
    for (var i = 1;i < arguments.length;i++) {
      ctorArgs[i - 1] = arguments[i];
    }
    return caller.superClass_.constructor.apply(me, ctorArgs);
  }
  var args = new Array(arguments.length - 2);
  for (var i = 2;i < arguments.length;i++) {
    args[i - 2] = arguments[i];
  }
  var foundCaller = false;
  for (var ctor = me.constructor;ctor;ctor = ctor.superClass_ && ctor.superClass_.constructor) {
    if (ctor.prototype[opt_methodName] === caller) {
      foundCaller = true;
    } else {
      if (foundCaller) {
        return ctor.prototype[opt_methodName].apply(me, args);
      }
    }
  }
  if (me[opt_methodName] === caller) {
    return me.constructor.prototype[opt_methodName].apply(me, args);
  } else {
    throw Error("goog.base called from a method of one name " + "to a method of a different name");
  }
};
goog.scope = function(fn) {
  fn.call(goog.global);
};
if (!COMPILED) {
  goog.global["COMPILED"] = COMPILED;
}
goog.defineClass = function(superClass, def) {
  var constructor = def.constructor;
  var statics = def.statics;
  if (!constructor || constructor == Object.prototype.constructor) {
    constructor = function() {
      throw Error("cannot instantiate an interface (no constructor defined).");
    };
  }
  var cls = goog.defineClass.createSealingConstructor_(constructor, superClass);
  if (superClass) {
    goog.inherits(cls, superClass);
  }
  delete def.constructor;
  delete def.statics;
  goog.defineClass.applyProperties_(cls.prototype, def);
  if (statics != null) {
    if (statics instanceof Function) {
      statics(cls);
    } else {
      goog.defineClass.applyProperties_(cls, statics);
    }
  }
  return cls;
};
goog.defineClass.ClassDescriptor;
goog.define("goog.defineClass.SEAL_CLASS_INSTANCES", goog.DEBUG);
goog.defineClass.createSealingConstructor_ = function(ctr, superClass) {
  if (goog.defineClass.SEAL_CLASS_INSTANCES && Object.seal instanceof Function) {
    if (superClass && superClass.prototype && superClass.prototype[goog.UNSEALABLE_CONSTRUCTOR_PROPERTY_]) {
      return ctr;
    }
    var wrappedCtr = function() {
      var instance = ctr.apply(this, arguments) || this;
      instance[goog.UID_PROPERTY_] = instance[goog.UID_PROPERTY_];
      if (this.constructor === wrappedCtr) {
        Object.seal(instance);
      }
      return instance;
    };
    return wrappedCtr;
  }
  return ctr;
};
goog.defineClass.OBJECT_PROTOTYPE_FIELDS_ = ["constructor", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "toLocaleString", "toString", "valueOf"];
goog.defineClass.applyProperties_ = function(target, source) {
  var key;
  for (key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      target[key] = source[key];
    }
  }
  for (var i = 0;i < goog.defineClass.OBJECT_PROTOTYPE_FIELDS_.length;i++) {
    key = goog.defineClass.OBJECT_PROTOTYPE_FIELDS_[i];
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      target[key] = source[key];
    }
  }
};
goog.tagUnsealableClass = function(ctr) {
  if (!COMPILED && goog.defineClass.SEAL_CLASS_INSTANCES) {
    ctr.prototype[goog.UNSEALABLE_CONSTRUCTOR_PROPERTY_] = true;
  }
};
goog.UNSEALABLE_CONSTRUCTOR_PROPERTY_ = "goog_defineClass_legacy_unsealable";

goog.provide("lf.fn.AggregatedColumn");
goog.provide("lf.fn.StarColumn");
goog.require("lf.Type");
goog.require("lf.schema.Column");
goog.require("lf.schema.Table");
lf.fn.AggregatedColumn = function(col, aggregatorType) {
  this.child = col;
  this.aggregatorType = aggregatorType;
  this.alias_ = null;
};
lf.fn.AggregatedColumn.prototype.getName = function() {
  return this.aggregatorType + "(" + this.child.getName() + ")";
};
lf.fn.AggregatedColumn.prototype.getNormalizedName = function() {
  return this.aggregatorType + "(" + this.child.getNormalizedName() + ")";
};
lf.fn.AggregatedColumn.prototype.getTable = function() {
  return this.child.getTable();
};
lf.fn.AggregatedColumn.prototype.toString = function() {
  return this.getNormalizedName();
};
lf.fn.AggregatedColumn.prototype.getType = function() {
  return this.child.getType();
};
lf.fn.AggregatedColumn.prototype.getAlias = function() {
  return this.alias_;
};
lf.fn.AggregatedColumn.prototype.getIndices = function() {
  return [];
};
lf.fn.AggregatedColumn.prototype.isNullable = function() {
  return false;
};
lf.fn.AggregatedColumn.prototype.as = function(name) {
  this.alias_ = name;
  return this;
};
lf.fn.AggregatedColumn.prototype.getColumnChain = function() {
  var columnChain = [this];
  var currentColumn = this;
  while (currentColumn instanceof lf.fn.AggregatedColumn) {
    columnChain.push(currentColumn.child);
    currentColumn = currentColumn.child;
  }
  return columnChain;
};
lf.fn.StarColumn = function(opt_alias) {
  this.alias_ = opt_alias || null;
  this.table_ = new lf.schema.Table("#UnknownTable", [], [], false);
};
lf.fn.StarColumn.prototype.getName = function() {
  return "*";
};
lf.fn.StarColumn.prototype.getNormalizedName = function() {
  return this.getName();
};
lf.fn.StarColumn.prototype.toString = function() {
  return this.getNormalizedName();
};
lf.fn.StarColumn.prototype.getTable = function() {
  return this.table_;
};
lf.fn.StarColumn.prototype.getType = function() {
  return lf.Type.NUMBER;
};
lf.fn.StarColumn.prototype.getAlias = function() {
  return this.alias_;
};
lf.fn.StarColumn.prototype.getIndices = function() {
  return [];
};
lf.fn.StarColumn.prototype.isNullable = function() {
  return false;
};

goog.provide("lf.BackStore");
goog.forwardDeclare("lf.Table");
goog.forwardDeclare("lf.TransactionType");
goog.forwardDeclare("lf.backstore.Tx");
goog.forwardDeclare("lf.cache.TableDiff");
goog.forwardDeclare("lf.cache.Journal");
goog.forwardDeclare("lf.raw.BackStore");
lf.BackStore = function() {
};
lf.BackStore.prototype.init;
lf.BackStore.prototype.createTx;
lf.BackStore.prototype.close;
lf.BackStore.prototype.getTableInternal;
lf.BackStore.prototype.subscribe;
lf.BackStore.prototype.unsubscribe;
lf.BackStore.prototype.notify;

goog.provide("lf.base");
goog.require("lf.ObserverRegistry");
goog.require("lf.backstore.ExternalChangeObserver");
goog.require("lf.backstore.Firebase");
goog.require("lf.backstore.IndexedDB");
goog.require("lf.backstore.Memory");
goog.require("lf.backstore.ObservableStore");
goog.require("lf.backstore.WebSql");
goog.require("lf.cache.DefaultCache");
goog.require("lf.cache.Prefetcher");
goog.require("lf.index.MemoryIndexStore");
goog.require("lf.proc.DefaultQueryEngine");
goog.require("lf.proc.Runner");
goog.require("lf.schema.DataStoreType");
goog.require("lf.service");
lf.base.init = function(global, opt_options) {
  var schema = global.getService(lf.service.SCHEMA);
  var options = opt_options || {};
  var dataStoreType = options.storeType || lf.schema.DataStoreType.INDEXED_DB;
  var cache = new lf.cache.DefaultCache;
  global.registerService(lf.service.CACHE, cache);
  var backStore = null;
  var observeExternalChanges = false;
  switch(dataStoreType) {
    case lf.schema.DataStoreType.MEMORY:
      backStore = new lf.backstore.Memory(schema);
      break;
    case lf.schema.DataStoreType.OBSERVABLE_STORE:
      backStore = new lf.backstore.ObservableStore(schema);
      break;
    case lf.schema.DataStoreType.WEB_SQL:
      backStore = new lf.backstore.WebSql(global, schema, options.webSqlDbSize);
      break;
    case lf.schema.DataStoreType.FIREBASE:
      backStore = new lf.backstore.Firebase(schema, (options.firebase));
      observeExternalChanges = true;
      break;
    default:
      backStore = new lf.backstore.IndexedDB(global, schema);
  }
  global.registerService(lf.service.BACK_STORE, backStore);
  return backStore.init(options.onUpgrade).then(function() {
    var queryEngine = new lf.proc.DefaultQueryEngine(global);
    global.registerService(lf.service.QUERY_ENGINE, queryEngine);
    var runner = new lf.proc.Runner;
    global.registerService(lf.service.RUNNER, runner);
    var indexStore = new lf.index.MemoryIndexStore;
    global.registerService(lf.service.INDEX_STORE, indexStore);
    var observerRegistry = new lf.ObserverRegistry;
    global.registerService(lf.service.OBSERVER_REGISTRY, observerRegistry);
    return indexStore.init(schema);
  }).then(function() {
    if (observeExternalChanges) {
      var externalChangeObserver = new lf.backstore.ExternalChangeObserver(global);
      externalChangeObserver.startObserving();
    }
    var prefetcher = new lf.cache.Prefetcher(global);
    return prefetcher.init(schema);
  });
};
lf.base.closeDatabase = function(global) {
  try {
    var backstore = global.getService(lf.service.BACK_STORE);
    backstore.close();
  } catch (e) {
  }
};

goog.provide("lf.Binder");
goog.provide("lf.bind");
lf.bind = function(index) {
  return new lf.Binder(index);
};
lf.Binder = function(index) {
  this.index_ = index;
};
lf.Binder.prototype.getIndex = function() {
  return this.index_;
};

goog.provide("lf.Database");
lf.Database = function() {
};
lf.Database.prototype.getSchema;
lf.Database.prototype.select;
lf.Database.prototype.insert;
lf.Database.prototype.insertOrReplace;
lf.Database.prototype.update;
lf.Database.prototype.delete;
lf.Database.prototype.observe;
lf.Database.prototype.unobserve;
lf.Database.prototype.createTransaction;
lf.Database.prototype.close;

goog.provide("lf.DiffCalculator");
goog.require("goog.math");
goog.require("lf.eval.Registry");
goog.require("lf.eval.Type");
lf.DiffCalculator = function(query, observableResults) {
  this.evalRegistry_ = lf.eval.Registry.getInstance();
  this.query_ = query;
  this.observableResults_ = observableResults;
  this.columns_ = this.detectColumns_();
};
lf.DiffCalculator.prototype.detectColumns_ = function() {
  if (this.query_.columns.length > 0) {
    return this.query_.columns;
  } else {
    var columns = [];
    var tables = this.query_.from.slice();
    if (goog.isDefAndNotNull(this.query_.innerJoin)) {
      tables.push(this.query_.innerJoin);
    }
    tables.forEach(function(table) {
      table.getColumns().forEach(function(column) {
        columns.push(column);
      });
    });
    return columns;
  }
};
lf.DiffCalculator.prototype.comparator_ = function(left, right) {
  return this.columns_.every(function(column) {
    var evalFn = this.evalRegistry_.getEvaluator(column.getType(), lf.eval.Type.EQ);
    return evalFn(left.getField(column), right.getField(column));
  }, this);
};
lf.DiffCalculator.prototype.applyDiff = function(oldResults, newResults) {
  var oldEntries = goog.isNull(oldResults) ? [] : oldResults.entries;
  var longestCommonSubsequenceLeft = goog.math.longestCommonSubsequence(oldEntries, newResults.entries, goog.bind(this.comparator_, this), function(indexLeft, indexRight) {
    return oldEntries[indexLeft];
  });
  var changeRecords = [];
  var commonIndex = 0;
  for (var i = 0;i < oldEntries.length;i++) {
    var entry = oldEntries[i];
    if (longestCommonSubsequenceLeft[commonIndex] == entry) {
      commonIndex++;
      continue;
    } else {
      var removed = this.observableResults_.splice(commonIndex, 1);
      var changeRecord = lf.DiffCalculator.createChangeRecord_(i, removed, 0, this.observableResults_);
      changeRecords.push(changeRecord);
    }
  }
  var longestCommonSubsequenceRight = goog.math.longestCommonSubsequence(oldEntries, newResults.entries, goog.bind(this.comparator_, this), function(indexLeft, indexRight) {
    return newResults.entries[indexRight];
  });
  commonIndex = 0;
  for (var i = 0;i < newResults.entries.length;i++) {
    var entry = newResults.entries[i];
    if (longestCommonSubsequenceRight[commonIndex] == entry) {
      commonIndex++;
      continue;
    } else {
      this.observableResults_.splice(i, 0, entry.row.payload());
      var changeRecord = lf.DiffCalculator.createChangeRecord_(i, [], 1, this.observableResults_);
      changeRecords.push(changeRecord);
    }
  }
  return changeRecords;
};
lf.DiffCalculator.createChangeRecord_ = function(index, removed, addedCount, object) {
  return {addedCount:addedCount, index:index, object:object, removed:removed, type:"splice"};
};
lf.DiffCalculator.ChangeRecord;

goog.provide("lf.eval.Registry");
goog.provide("lf.eval.Type");
goog.require("goog.asserts");
goog.require("goog.structs.Map");
goog.require("lf.Type");
lf.eval.Type = {BETWEEN:"between", EQ:"eq", GTE:"gte", GT:"gt", IN:"in", LTE:"lte", LT:"lt", MATCH:"match", NEQ:"neq"};
lf.eval.EvalFunction_;
lf.eval.Registry = function() {
  var numberOrIntegerEvalMap = lf.eval.buildNumberEvaluatorMap_();
  this.evaluationMaps_ = new goog.structs.Map(lf.Type.BOOLEAN, lf.eval.buildBooleanEvaluatorMap_(), lf.Type.DATE_TIME, lf.eval.buildDateEvaluatorMap_(), lf.Type.NUMBER, numberOrIntegerEvalMap, lf.Type.INTEGER, numberOrIntegerEvalMap, lf.Type.STRING, lf.eval.buildStringEvaluatorMap_());
};
goog.addSingletonGetter(lf.eval.Registry);
lf.eval.Registry.prototype.getEvaluator = function(columnType, evaluatorType) {
  var evaluationMap = this.evaluationMaps_.get(columnType, null);
  goog.asserts.assert(!goog.isNull(evaluationMap), "Could not find evaluation map for " + columnType);
  var evaluatorFn = evaluationMap.get(evaluatorType, null);
  goog.asserts.assert(!goog.isNull(evaluatorFn), "Could not find evaluator for " + columnType + ", " + evaluatorType);
  return evaluatorFn;
};
lf.eval.buildNumberEvaluatorMap_ = function() {
  return new goog.structs.Map(lf.eval.Type.BETWEEN, function(a, range) {
    return a >= range[0] && a <= range[1];
  }, lf.eval.Type.EQ, function(a, b) {
    return a == b;
  }, lf.eval.Type.GTE, function(a, b) {
    return a >= b;
  }, lf.eval.Type.GT, function(a, b) {
    return a > b;
  }, lf.eval.Type.IN, function(rowValue, values) {
    return values.indexOf(rowValue) != -1;
  }, lf.eval.Type.LTE, function(a, b) {
    return a <= b;
  }, lf.eval.Type.LT, function(a, b) {
    return a < b;
  }, lf.eval.Type.NEQ, function(a, b) {
    return a != b;
  });
};
lf.eval.buildStringEvaluatorMap_ = function() {
  return new goog.structs.Map(lf.eval.Type.BETWEEN, function(a, range) {
    return a >= range[0] && a <= range[1];
  }, lf.eval.Type.EQ, function(a, b) {
    return a == b;
  }, lf.eval.Type.GTE, function(a, b) {
    return a >= b;
  }, lf.eval.Type.GT, function(a, b) {
    return a > b;
  }, lf.eval.Type.IN, function(rowValue, values) {
    return values.indexOf(rowValue) != -1;
  }, lf.eval.Type.LTE, function(a, b) {
    return a <= b;
  }, lf.eval.Type.LT, function(a, b) {
    return a < b;
  }, lf.eval.Type.MATCH, function(value, regex) {
    var re = new RegExp(regex);
    return re.test(value);
  }, lf.eval.Type.NEQ, function(a, b) {
    return a != b;
  });
};
lf.eval.buildDateEvaluatorMap_ = function() {
  return new goog.structs.Map(lf.eval.Type.BETWEEN, function(a, range) {
    return a.getTime() >= range[0].getTime() && a.getTime() <= range[1].getTime();
  }, lf.eval.Type.EQ, function(a, b) {
    var aTime = goog.isNull(a) ? -1 : a.getTime();
    var bTime = goog.isNull(b) ? -1 : b.getTime();
    return aTime == bTime;
  }, lf.eval.Type.GTE, function(a, b) {
    return a.getTime() >= b.getTime();
  }, lf.eval.Type.GT, function(a, b) {
    return a.getTime() > b.getTime();
  }, lf.eval.Type.IN, function(targetValue, values) {
    return values.some(function(value) {
      return value.getTime() == targetValue.getTime();
    });
  }, lf.eval.Type.LTE, function(a, b) {
    return a.getTime() <= b.getTime();
  }, lf.eval.Type.LT, function(a, b) {
    return a.getTime() < b.getTime();
  }, lf.eval.Type.NEQ, function(a, b) {
    var aTime = goog.isNull(a) ? -1 : a.getTime();
    var bTime = goog.isNull(b) ? -1 : b.getTime();
    return aTime != bTime;
  });
};
lf.eval.buildBooleanEvaluatorMap_ = function() {
  return new goog.structs.Map(lf.eval.Type.EQ, function(a, b) {
    return a == b;
  }, lf.eval.Type.NEQ, function(a, b) {
    return a != b;
  });
};

goog.provide("lf.Exception");
lf.Exception = function(name, message) {
  this.name = name;
  this.message = message;
};
lf.Exception.Type = {BLOCKING:"BlockingError", CONSTRAINT:"ConstraintError", DATA:"DataError", FORCED:"ForcedError", NOT_FOUND:"NotFoundError", NOT_SUPPORTED:"NotSupportedError", QUOTA_EXCEEDED:"QuotaExceededError", SYNTAX:"SyntaxError", SCOPE_ERROR:"ScopeError", TIMEOUT:"TimeoutError", TOO_MANY_ROWS:"TooManyRowsError", TRANSACTION:"TransactionError", UNKNOWN:"UnknownError", UNINITIALIZED:"UninitializedError", VERSION:"VersionError"};

goog.provide("lf.fn");
goog.provide("lf.fn.Type");
goog.require("lf.fn.AggregatedColumn");
goog.require("lf.fn.StarColumn");
lf.fn.Type = {AVG:"AVG", COUNT:"COUNT", DISTINCT:"DISTINCT", GEOMEAN:"GEOMEAN", MAX:"MAX", MIN:"MIN", STDDEV:"STDDEV", SUM:"SUM"};
lf.fn.avg = function(col) {
  return new lf.fn.AggregatedColumn(col, lf.fn.Type.AVG);
};
lf.fn.count = function(opt_col) {
  var col = opt_col || new lf.fn.StarColumn;
  return new lf.fn.AggregatedColumn(col, lf.fn.Type.COUNT);
};
lf.fn.distinct = function(col) {
  return new lf.fn.AggregatedColumn(col, lf.fn.Type.DISTINCT);
};
lf.fn.max = function(col) {
  return new lf.fn.AggregatedColumn(col, lf.fn.Type.MAX);
};
lf.fn.min = function(col) {
  return new lf.fn.AggregatedColumn(col, lf.fn.Type.MIN);
};
lf.fn.stddev = function(col) {
  return new lf.fn.AggregatedColumn(col, lf.fn.Type.STDDEV);
};
lf.fn.sum = function(col) {
  return new lf.fn.AggregatedColumn(col, lf.fn.Type.SUM);
};
lf.fn.geomean = function(col) {
  return new lf.fn.AggregatedColumn(col, lf.fn.Type.GEOMEAN);
};

goog.provide("lf.Global");
goog.require("goog.structs.Map");
goog.require("lf.Exception");
lf.Global = function() {
  this.services_ = new goog.structs.Map;
};
lf.Global.instance_;
lf.Global.get = function() {
  if (!lf.Global.instance_) {
    lf.Global.instance_ = new lf.Global;
  }
  return lf.Global.instance_;
};
lf.Global.prototype.clear = function() {
  this.services_.clear();
};
lf.Global.prototype.registerService = function(serviceId, service) {
  this.services_.set(serviceId.toString(), service);
  return service;
};
lf.Global.prototype.getService = function(serviceId) {
  var service = this.services_.get(serviceId.toString(), null);
  if (service == null) {
    throw new lf.Exception(lf.Exception.Type.NOT_FOUND, serviceId.toString());
  }
  return service;
};
lf.Global.prototype.isRegistered = function(serviceId) {
  return this.services_.containsKey(serviceId.toString());
};

goog.provide("lf.ObserverRegistry");
goog.require("goog.asserts");
goog.require("goog.structs.Map");
goog.require("goog.structs.Set");
goog.require("lf.DiffCalculator");
goog.forwardDeclare("lf.query.Select");
goog.forwardDeclare("lf.query.SelectBuilder");
lf.ObserverRegistry = function() {
  this.entries_ = new goog.structs.Map;
};
lf.ObserverRegistry.prototype.getQueryId_ = function(query) {
  return goog.getUid(query).toString();
};
lf.ObserverRegistry.prototype.addObserver = function(rawBuilder, callback) {
  var builder = (rawBuilder);
  var queryId = this.getQueryId_(builder.getObservableQuery());
  var entry = this.entries_.get(queryId, null);
  if (goog.isNull(entry)) {
    entry = new lf.ObserverRegistry.Entry_(builder);
    this.entries_.set(queryId, entry);
  }
  entry.addObserver(callback);
};
lf.ObserverRegistry.prototype.removeObserver = function(builder, callback) {
  var query = (builder).getObservableQuery();
  var queryId = this.getQueryId_(query);
  var entry = this.entries_.get(queryId, null);
  goog.asserts.assert(goog.isDefAndNotNull(entry), "Attempted to unobserve a query that was not observed.");
  var didRemove = entry.removeObserver(callback);
  goog.asserts.assert(didRemove, "removeObserver: Inconsistent state detected.");
  if (!entry.hasObservers()) {
    this.entries_.remove(queryId);
  }
};
lf.ObserverRegistry.prototype.getTaskItemsForTables = function(tables) {
  var tableSet = new goog.structs.Set;
  tables.forEach(function(table) {
    tableSet.add(table.getName());
  });
  var items = [];
  this.entries_.getValues().forEach(function(entry) {
    var item = entry.getTaskItem();
    var refersToTables = item.context.from.some(function(table) {
      return tableSet.contains(table.getName());
    });
    if (refersToTables) {
      items.push(item);
    }
  });
  return items;
};
lf.ObserverRegistry.prototype.updateResultsForQuery = function(query, results) {
  var queryId = this.getQueryId_(goog.isDefAndNotNull(query.clonedFrom) ? (query.clonedFrom) : query);
  var entry = this.entries_.get(queryId, null);
  if (!goog.isNull(entry)) {
    entry.updateResults(results);
    return true;
  }
  return false;
};
lf.ObserverRegistry.Entry_ = function(builder) {
  this.builder_ = builder;
  this.observers_ = new goog.structs.Set;
  this.observable_ = [];
  this.lastResults_ = null;
  this.diffCalculator_ = new lf.DiffCalculator(builder.getObservableQuery(), this.observable_);
};
lf.ObserverRegistry.Entry_.prototype.addObserver = function(callback) {
  if (this.observers_.contains(callback)) {
    goog.asserts.fail("Attempted to register observer twice.");
    return;
  }
  this.observers_.add(callback);
};
lf.ObserverRegistry.Entry_.prototype.removeObserver = function(callback) {
  return this.observers_.remove(callback);
};
lf.ObserverRegistry.Entry_.prototype.getTaskItem = function() {
  return this.builder_.getObservableTaskItem();
};
lf.ObserverRegistry.Entry_.prototype.hasObservers = function() {
  return this.observers_.getCount() > 0;
};
lf.ObserverRegistry.Entry_.prototype.updateResults = function(newResults) {
  var changeRecords = this.diffCalculator_.applyDiff(this.lastResults_, newResults);
  this.lastResults_ = newResults;
  if (changeRecords.length > 0) {
    this.observers_.getValues().forEach(function(observerFn) {
      observerFn(changeRecords);
    });
  }
};

goog.provide("lf.op");
goog.require("lf.pred.CombinedPredicate");
goog.require("lf.pred.Operator");
lf.op.and = function(var_args) {
  var args = Array.prototype.slice.call(arguments);
  return lf.op.createPredicate_(lf.pred.Operator.AND, args);
};
lf.op.or = function(var_args) {
  var args = Array.prototype.slice.call(arguments);
  return lf.op.createPredicate_(lf.pred.Operator.OR, args);
};
lf.op.createPredicate_ = function(operator, predicates) {
  var condition = new lf.pred.CombinedPredicate(operator);
  predicates.forEach(function(predicate) {
    condition.addChild(predicate);
  });
  return condition;
};
lf.op.not = function(operand) {
  operand.setComplement(true);
  return operand;
};

goog.provide("lf.Order");
lf.Order = {};
lf.Order.DESC = (0);
lf.Order.ASC = (1);

goog.provide("lf.Predicate");
goog.provide("lf.PredicateProvider");
goog.forwardDeclare("lf.Binder");
lf.Predicate = function() {
};
lf.Predicate.prototype.eval;
lf.Predicate.prototype.setComplement;
lf.Predicate.prototype.copy;
lf.Predicate.prototype.getColumns;
lf.Predicate.prototype.setId;
lf.Predicate.prototype.getId;
lf.PredicateProvider = function() {
};
lf.PredicateProvider.prototype.eq;
lf.PredicateProvider.prototype.neq;
lf.PredicateProvider.prototype.lt;
lf.PredicateProvider.prototype.lte;
lf.PredicateProvider.prototype.gt;
lf.PredicateProvider.prototype.gte;
lf.PredicateProvider.prototype.match;
lf.PredicateProvider.prototype.between;
lf.PredicateProvider.prototype.in;
lf.PredicateProvider.prototype.isNull;
lf.PredicateProvider.prototype.isNotNull;

goog.provide("lf.query.Builder");
goog.provide("lf.query.Delete");
goog.provide("lf.query.Insert");
goog.provide("lf.query.Select");
goog.provide("lf.query.Update");
goog.forwardDeclare("lf.Binder");
goog.forwardDeclare("lf.Order");
goog.forwardDeclare("lf.Type");
lf.query.Builder = function() {
};
lf.query.Builder.prototype.exec;
lf.query.Builder.prototype.explain;
lf.query.Builder.prototype.bind;
lf.query.Builder.prototype.toSql;
lf.query.Select = function() {
};
lf.query.Select.prototype.from;
lf.query.Select.prototype.where;
lf.query.Select.prototype.innerJoin;
lf.query.Select.prototype.leftOuterJoin;
lf.query.Select.prototype.limit;
lf.query.Select.prototype.skip;
lf.query.Select.prototype.orderBy;
lf.query.Select.prototype.groupBy;
lf.query.Insert = function() {
};
lf.query.Insert.prototype.into;
lf.query.Insert.prototype.values;
lf.query.Update = function() {
};
lf.query.Update.prototype.set;
lf.query.Update.prototype.where;
lf.query.Delete = function() {
};
lf.query.Delete.prototype.from;
lf.query.Delete.prototype.where;

goog.provide("lf.raw.BackStore");
lf.raw.BackStore = function() {
};
lf.raw.BackStore.prototype.getRawDBInstance;
lf.raw.BackStore.prototype.getRawTransaction;
lf.raw.BackStore.prototype.dropTable;
lf.raw.BackStore.prototype.addTableColumn;
lf.raw.BackStore.prototype.dropTableColumn;
lf.raw.BackStore.prototype.renameTableColumn;
lf.raw.BackStore.prototype.createRow;
lf.raw.BackStore.prototype.getVersion;
lf.raw.BackStore.prototype.dump;

goog.provide("lf.Row");
goog.forwardDeclare("lf.index.Index.Key");
lf.Row = function(id, payload) {
  this.id_ = id;
  this.payload_ = payload || this.defaultPayload();
};
lf.Row.nextId_ = 0;
lf.Row.DUMMY_ID = -1;
lf.Row.getNextId = function() {
  return lf.Row.nextId_++;
};
lf.Row.setNextId = function(nextId) {
  lf.Row.nextId_ = nextId;
};
lf.Row.prototype.id = function() {
  return this.id_;
};
lf.Row.prototype.assignRowId = function(id) {
  this.id_ = id;
};
lf.Row.prototype.payload = function() {
  return this.payload_;
};
lf.Row.prototype.defaultPayload = function() {
  return ({});
};
lf.Row.prototype.toDbPayload = function() {
  return (this.payload_);
};
lf.Row.Raw;
lf.Row.prototype.serialize = function() {
  return {"id":this.id_, "value":this.toDbPayload()};
};
lf.Row.prototype.keyOfIndex = function(indexName) {
  if (indexName.substr(-1) == "#") {
    return (this.id_);
  }
  return null;
};
lf.Row.deserialize = function(data) {
  return new lf.Row(data["id"], data["value"]);
};
lf.Row.create = function(opt_payload) {
  return new lf.Row(lf.Row.getNextId(), opt_payload || {});
};
lf.Row.binToHex = function(buffer) {
  if (!goog.isDefAndNotNull(buffer)) {
    return "";
  }
  var uint8Array = new Uint8Array(buffer);
  var s = "";
  for (var i = 0;i < uint8Array.length;++i) {
    var chr = uint8Array[i].toString(16);
    s += chr.length < 2 ? "0" + chr : chr;
  }
  return s;
};
lf.Row.hexToBin = function(hex) {
  if (hex == "") {
    return null;
  }
  if (hex.length % 2 != 0) {
    hex = "0" + hex;
  }
  var buffer = new ArrayBuffer(hex.length / 2);
  var uint8Array = new Uint8Array(buffer);
  for (var i = 0, j = 0;i < hex.length;i += 2) {
    uint8Array[j++] = parseInt(hex.substr(i, 2), 16);
  }
  return buffer;
};

goog.provide("lf.service");
goog.provide("lf.service.ServiceId");
goog.forwardDeclare("lf.BackStore");
goog.forwardDeclare("lf.ObserverRegistry");
goog.forwardDeclare("lf.cache.Cache");
goog.forwardDeclare("lf.index.IndexStore");
goog.forwardDeclare("lf.proc.QueryEngine");
goog.forwardDeclare("lf.proc.Runner");
goog.forwardDeclare("lf.schema.Database");
lf.service.ServiceId = function(serviceId) {
  this.serviceId_ = serviceId;
};
lf.service.ServiceId.prototype.toString = function() {
  return this.serviceId_;
};
lf.service.BACK_STORE = new lf.service.ServiceId("backstore");
lf.service.CACHE = new lf.service.ServiceId("cache");
lf.service.INDEX_STORE = new lf.service.ServiceId("indexstore");
lf.service.QUERY_ENGINE = new lf.service.ServiceId("engine");
lf.service.RUNNER = new lf.service.ServiceId("runner");
lf.service.OBSERVER_REGISTRY = new lf.service.ServiceId("observerregistry");
lf.service.SCHEMA = new lf.service.ServiceId("schema");

goog.provide("lf.Table");
lf.Table = function() {
};
lf.Table.prototype.get;
lf.Table.prototype.put;
lf.Table.prototype.remove;

goog.provide("lf.Transaction");
goog.provide("lf.TransactionType");
goog.forwardDeclare("lf.query.Builder");
lf.TransactionType = {READ_ONLY:0, READ_WRITE:1};
lf.Transaction = function() {
};
lf.Transaction.prototype.exec;
lf.Transaction.prototype.begin;
lf.Transaction.prototype.attach;
lf.Transaction.prototype.commit;
lf.Transaction.prototype.rollback;

goog.provide("lf.tree");
goog.require("goog.asserts");
lf.tree.map = function(original, mapFn) {
  var copyParentStack = [];
  var cleanUpParentStack = function(original, clone) {
    if (goog.isNull(original)) {
      return;
    }
    var cloneFull = original.getChildCount() == clone.getChildCount();
    if (cloneFull) {
      var cloneIndex = copyParentStack.indexOf(clone);
      if (cloneIndex != -1) {
        copyParentStack.splice(cloneIndex, 1);
      }
    }
  };
  var nextParent = null;
  var copyRoot = null;
  original.traverse(function(node) {
    var newNode = mapFn(node);
    if (node.getParent() == null) {
      copyRoot = newNode;
    } else {
      nextParent.addChild(newNode);
    }
    cleanUpParentStack(node.getParent(), nextParent);
    if (node.getChildCount() > 1) {
      copyParentStack.push(newNode);
    }
    nextParent = node.isLeaf() ? copyParentStack[copyParentStack.length - 1] : newNode;
  });
  return copyRoot;
};
lf.tree.getLeafNodes = function(node) {
  return lf.tree.find(node, function(node) {
    return node.isLeaf();
  });
};
lf.tree.removeNode = function(node) {
  var parentNode = node.getParent();
  var originalIndex = 0;
  if (!goog.isNull(parentNode)) {
    originalIndex = parentNode.getChildren().indexOf(node);
    parentNode.removeChild(node);
  }
  var children = node.getChildren().slice();
  children.forEach(function(child, index) {
    node.removeChild(child);
    if (!goog.isNull(parentNode)) {
      parentNode.addChildAt(child, originalIndex + index);
    }
  });
  return {parent:parentNode, children:children};
};
lf.tree.insertNodeAt = function(existingNode, newNode) {
  var children = existingNode.getChildren().slice();
  children.forEach(function(child) {
    existingNode.removeChild(child);
    newNode.addChild(child);
  });
  existingNode.addChild(newNode);
};
lf.tree.swapNodeWithChild = function(node) {
  goog.asserts.assert(node.getChildCount() == 1);
  var child = node.getChildAt(0);
  goog.asserts.assert(child.getChildCount() == 1);
  lf.tree.removeNode(node);
  lf.tree.insertNodeAt(child, node);
  return child;
};
lf.tree.pushNodeBelowChild = function(node, shouldPushDownFn, cloneFn) {
  goog.asserts.assert(node.getChildCount() == 1);
  var child = node.getChildAt(0);
  goog.asserts.assert(child.getChildCount() > 1);
  var grandChildren = child.getChildren().slice();
  var canPushDown = grandChildren.some(function(grandChild) {
    return shouldPushDownFn(grandChild);
  });
  if (!canPushDown) {
    return node;
  }
  lf.tree.removeNode(node);
  grandChildren.forEach(function(grandChild, index) {
    if (shouldPushDownFn(grandChild)) {
      var newNode = cloneFn(node);
      child.removeChildAt(index);
      newNode.addChild(grandChild);
      child.addChildAt(newNode, index);
    }
  });
  return child;
};
lf.tree.replaceChainWithChain = function(oldHead, oldTail, newHead, newTail) {
  var parentNode = oldHead.getParent();
  if (!goog.isNull(parentNode)) {
    var oldHeadIndex = parentNode.getChildren().indexOf(oldHead);
    parentNode.removeChildAt(oldHeadIndex);
    parentNode.addChildAt(newHead, oldHeadIndex);
  }
  oldTail.getChildren().slice().forEach(function(child) {
    oldTail.removeChild(child);
    newTail.addChild(child);
  });
  return newHead;
};
lf.tree.replaceNodeWithChain = function(node, head, tail) {
  return lf.tree.replaceChainWithChain(node, node, head, tail);
};
lf.tree.replaceChainWithNode = function(head, tail, node) {
  return lf.tree.replaceChainWithChain(head, tail, node, node);
};
lf.tree.find = function(root, filterFn, opt_stopFn) {
  var results = [];
  var filterRec = function(node) {
    if (filterFn(node)) {
      results.push(node);
    }
    if (!goog.isDefAndNotNull(opt_stopFn) || !opt_stopFn(node)) {
      node.getChildren().forEach(filterRec);
    }
  };
  filterRec(root);
  return results;
};
lf.tree.toString = function(rootNode, opt_stringFn) {
  var stringFn = opt_stringFn || function(node) {
    return node.toString() + "\n";
  };
  var out = "";
  rootNode.traverse(function(node) {
    for (var i = 0;i < node.getDepth();i++) {
      out += "-";
    }
    out += stringFn(node);
  });
  return out;
};

goog.provide("lf.Type");
goog.provide("lf.type");
lf.Type = {};
lf.Type.ARRAY_BUFFER = (0);
lf.Type.BOOLEAN = (1);
lf.Type.DATE_TIME = (2);
lf.Type.INTEGER = (3);
lf.Type.NUMBER = (4);
lf.Type.STRING = (5);
lf.Type.OBJECT = (6);
lf.type.DEFAULT_VALUES = {0:new ArrayBuffer(0), 1:false, 2:Object.freeze(new Date(0)), 3:0, 4:0, 5:"", 6:Object.freeze({})};

goog.provide("lf.backstore.BaseTx");
goog.require("goog.Promise");
goog.require("lf.Row");
goog.require("lf.TransactionType");
goog.require("lf.backstore.Tx");
goog.require("lf.index.IndexMetadataRow");
goog.forwardDeclare("lf.index.Index");
lf.backstore.BaseTx = function(journal, txType) {
  this.journal_ = journal;
  this.txType = txType;
  this.resolver = goog.Promise.withResolver();
};
lf.backstore.BaseTx.prototype.getTable = goog.abstractMethod;
lf.backstore.BaseTx.prototype.getJournal = function() {
  return this.journal_;
};
lf.backstore.BaseTx.prototype.abort = goog.abstractMethod;
lf.backstore.BaseTx.prototype.commit = function() {
  var mergeIntoBackstore = goog.bind(function() {
    return this.txType == lf.TransactionType.READ_ONLY ? goog.Promise.resolve() : this.mergeIntoBackstore_();
  }, this);
  return mergeIntoBackstore().then(goog.bind(function() {
    this.journal_.commit();
  }, this));
};
lf.backstore.BaseTx.prototype.mergeIntoBackstore_ = function() {
  this.mergeTableChanges_();
  this.mergeIndexChanges_();
  return this.resolver.promise;
};
lf.backstore.BaseTx.prototype.mergeTableChanges_ = function() {
  var diff = this.journal_.getDiff();
  diff.getKeys().forEach(function(tableName) {
    var tableSchema = this.journal_.getScope().get(tableName);
    var table = this.getTable(tableSchema.getName(), goog.bind(tableSchema.deserializeRow, tableSchema));
    var tableDiff = diff.get(tableName);
    var toDeleteRowIds = tableDiff.getDeleted().getValues().map(function(row) {
      return row.id();
    });
    if (toDeleteRowIds.length > 0) {
      table.remove(toDeleteRowIds).thenCatch(this.handleError_, this);
    }
    var toPut = tableDiff.getModified().getValues().map(function(modification) {
      return modification[1];
    }).concat(tableDiff.getAdded().getValues());
    table.put(toPut).thenCatch(this.handleError_, this);
  }, this);
};
lf.backstore.BaseTx.prototype.mergeIndexChanges_ = function() {
  var indices = this.journal_.getIndexDiff();
  indices.forEach(function(index) {
    var indexTable = this.getTable(index.getName(), lf.Row.deserialize);
    var metadataRows;
    indexTable.get([lf.index.IndexMetadataRow.ROW_ID]).then(function(rows) {
      metadataRows = rows;
      return indexTable.remove([]);
    }).then(function() {
      indexTable.put(metadataRows);
      indexTable.put(index.serialize());
    }, goog.bind(this.handleError_, this));
  }, this);
};
lf.backstore.BaseTx.prototype.handleError_ = function(e) {
  this.resolver.reject(e);
};

goog.provide("lf.backstore.BundledObjectStore");
goog.require("goog.Promise");
goog.require("goog.asserts");
goog.require("goog.object");
goog.require("goog.structs.Map");
goog.require("lf.Table");
goog.require("lf.backstore.Page");
goog.require("lf.backstore.TableType");
goog.require("lf.service");
lf.backstore.BundledObjectStore = function(store, deserializeFn, retrievePageFn) {
  this.store_ = store;
  this.deserializeFn_ = deserializeFn;
  this.retrievePageFn_ = retrievePageFn;
};
lf.backstore.BundledObjectStore.prototype.get = function(ids) {
  if (ids.length == 0) {
    return this.getAll_();
  }
  return this.getPagesByRowIds_(ids).then(goog.bind(function(pages) {
    return ids.map(function(id) {
      var page = pages.get(lf.backstore.Page.toPageId(id));
      goog.asserts.assert(page, "Containing page is empty");
      return this.deserializeFn_(page.getPayload()[id]);
    }, this);
  }, this));
};
lf.backstore.BundledObjectStore.prototype.getPagesByRowIds_ = function(rowIds) {
  var results = new goog.structs.Map;
  var resolver = goog.Promise.withResolver();
  var pageIds = lf.backstore.Page.toPageIds(rowIds);
  var promises = pageIds.map(function(id, index) {
    return new goog.Promise(function(resolve, reject) {
      var request;
      try {
        request = this.store_.get(id);
      } catch (e) {
        reject(e);
        return;
      }
      request.onerror = reject;
      request.onsuccess = goog.bind(function(ev) {
        var page = lf.backstore.Page.deserialize(ev.target.result);
        results.set(page.getId(), page);
        resolve();
      }, this);
    }, this);
  }, this);
  goog.Promise.all(promises).then(function() {
    resolver.resolve(results);
  });
  return resolver.promise;
};
lf.backstore.BundledObjectStore.prototype.getAll_ = function() {
  return new goog.Promise(function(resolve, reject) {
    var rows = [];
    var request;
    try {
      request = this.store_.openCursor();
    } catch (e) {
      reject(e);
      return;
    }
    request.onerror = reject;
    request.onsuccess = goog.bind(function() {
      var cursor = request.result;
      if (cursor) {
        var page = lf.backstore.Page.deserialize(cursor.value);
        var data = page.getPayload();
        for (var key in data) {
          rows.push(this.deserializeFn_(data[key]));
        }
        cursor.continue();
      } else {
        resolve(rows);
      }
    }, this);
  }, this);
};
lf.backstore.BundledObjectStore.prototype.performWriteOp_ = function(reqFactory) {
  return new goog.Promise(function(resolve, reject) {
    var request;
    try {
      request = reqFactory();
    } catch (e) {
      reject(e);
      return;
    }
    request.onsuccess = resolve;
    request.onerror = reject;
  }, this);
};
lf.backstore.BundledObjectStore.prototype.put = function(rows) {
  if (rows.length == 0) {
    return goog.Promise.resolve();
  }
  var pages = new goog.structs.Map;
  rows.forEach(function(row) {
    var pageId = lf.backstore.Page.toPageId(row.id());
    var page = pages.get(pageId, null);
    if (goog.isNull(page)) {
      page = this.retrievePageFn_(this.store_.name, pageId);
    }
    page.setRows([row]);
    pages.set(pageId, page);
  }, this);
  var promises = pages.getValues().map(function(page) {
    return this.performWriteOp_(goog.bind(function() {
      return this.store_.put(page.serialize());
    }, this));
  }, this);
  return goog.Promise.all(promises);
};
lf.backstore.BundledObjectStore.prototype.remove = function(ids) {
  if (ids.length == 0) {
    return this.performWriteOp_(goog.bind(function() {
      return this.store_.clear();
    }, this));
  }
  var pages = new goog.structs.Map;
  ids.forEach(function(id) {
    var pageId = lf.backstore.Page.toPageId(id);
    var page = pages.get(pageId, null);
    if (goog.isNull(page)) {
      page = this.retrievePageFn_(this.store_.name, pageId);
    }
    page.removeRows([id]);
    pages.set(pageId, page);
  }, this);
  var promises = pages.getValues().map(function(page) {
    return this.performWriteOp_(goog.bind(function() {
      return goog.object.isEmpty(page.getPayload()) ? this.store_.delete(page.getId()) : this.store_.put(page.serialize());
    }, this));
  }, this);
  return goog.Promise.all(promises);
};
lf.backstore.BundledObjectStore.getDataTablePage_ = function(global, tableName, pageId) {
  var cache = global.getService(lf.service.CACHE);
  var range = lf.backstore.Page.getPageRange(pageId);
  var rows = cache.getRange(tableName, range[0], range[1]);
  var page = new lf.backstore.Page(pageId);
  page.setRows(rows);
  return page;
};
lf.backstore.BundledObjectStore.getIndexTablePage_ = function(tableName, pageId) {
  return new lf.backstore.Page(pageId);
};
lf.backstore.BundledObjectStore.forTableType = function(global, store, deserializeFn, tableType) {
  var retrievePageFn = tableType == lf.backstore.TableType.DATA ? goog.partial(lf.backstore.BundledObjectStore.getDataTablePage_, global) : lf.backstore.BundledObjectStore.getIndexTablePage_;
  return new lf.backstore.BundledObjectStore(store, deserializeFn, retrievePageFn);
};

goog.provide("lf.backstore.ExternalChangeObserver");
goog.require("lf.proc.ExternalChangeTask");
goog.require("lf.service");
lf.backstore.ExternalChangeObserver = function(global) {
  this.global_ = global;
  this.backStore_ = global.getService(lf.service.BACK_STORE);
  this.runner_ = global.getService(lf.service.RUNNER);
};
lf.backstore.ExternalChangeObserver.prototype.startObserving = function() {
  this.backStore_.subscribe(this.onChange_.bind(this));
};
lf.backstore.ExternalChangeObserver.prototype.stopObserving = function() {
  this.backStore_.unsubscribe();
};
lf.backstore.ExternalChangeObserver.prototype.onChange_ = function(tableDiffs) {
  var externalChangeTask = new lf.proc.ExternalChangeTask(this.global_, tableDiffs);
  this.runner_.scheduleTask(externalChangeTask);
};

goog.provide("lf.backstore.Firebase");
goog.require("goog.Promise");
goog.require("goog.object");
goog.require("goog.structs.Map");
goog.require("goog.structs.Set");
goog.require("lf.BackStore");
goog.require("lf.Exception");
goog.require("lf.Row");
goog.require("lf.backstore.FirebaseTx");
goog.require("lf.backstore.MemoryTable");
goog.require("lf.cache.TableDiff");
lf.backstore.Firebase = function(schema, fb) {
  this.schema_ = schema;
  this.app_ = fb;
  this.db_;
  this.revision_ = -1;
  this.tables_ = new goog.structs.Map;
  this.changeHandler_ = null;
};
lf.backstore.Firebase.prototype.getRevision = function() {
  return this.revision_;
};
lf.backstore.Firebase.prototype.setRevision = function(revision) {
  this.revision_ = revision;
};
lf.backstore.Firebase.prototype.populate_ = function(table, data) {
  var rows = [];
  for (var key in data) {
    if (key == "__meta__") {
      continue;
    }
    var id = parseInt(key, 10);
    rows.push(new lf.Row(id, data[key]));
  }
  table.putSync(rows);
};
lf.backstore.Firebase.prototype.init = function(opt_onUpgrade) {
  var resolver = goog.Promise.withResolver();
  this.db_ = this.app_.child(this.schema_.name());
  this.db_.on("value", goog.bind(function(snapshot) {
    resolver.resolve(this.onValue_(snapshot));
  }, this));
  return resolver.promise;
};
lf.backstore.Firebase.prototype.initRowId_ = function() {
  var maxRowId = this.tables_.getValues().map(function(table) {
    return table.getMaxRowId();
  }).reduce(function(maxSoFar, cur) {
    return maxSoFar > cur ? maxSoFar : cur;
  }, 0);
  lf.Row.setNextId(maxRowId + 1);
};
lf.backstore.Firebase.prototype.onValue_ = function(snapshot) {
  return this.revision_ < 0 ? this.initialize_(snapshot.exportVal()) : this.onChange_(snapshot.exportVal());
};
lf.backstore.Firebase.prototype.initialize_ = function(rawDb) {
  var resolver = goog.Promise.withResolver();
  if (goog.isNull(rawDb)) {
    this.db_.set(this.createNewDb_(), function() {
      resolver.resolve();
    });
  } else {
    if (rawDb["__version__"] == this.schema_.version()) {
      this.revision_ = rawDb["__revision__"];
      this.schema_.tables().forEach(function(table) {
        var memTable = new lf.backstore.MemoryTable;
        this.populate_(memTable, rawDb[table.getName()]);
        this.tables_.set(table.getName(), memTable);
      }, this);
      this.initRowId_();
      resolver.resolve();
    }
  }
  return resolver.promise;
};
lf.backstore.Firebase.prototype.onChange_ = function(rawDb) {
  if (rawDb["__revision__"] == this.revision_) {
    return goog.Promise.resolve();
  }
  var diffs = this.schema_.tables().map(function(table) {
    var tableName = table.getName();
    return this.generateDiff_(tableName, rawDb[tableName]);
  }, this).filter(function(diff) {
    return !diff.isEmpty();
  });
  this.revision_ = rawDb["__revision__"];
  diffs.forEach(function(diff) {
    var memTable = new lf.backstore.MemoryTable;
    this.populate_(memTable, rawDb[diff.getName()]);
    this.tables_.set(diff.getName(), memTable);
  }, this);
  if (diffs.length) {
    this.notify(diffs);
  }
  return goog.Promise.resolve();
};
lf.backstore.Firebase.prototype.generateDiff_ = function(tableName, snapshot) {
  var diff = new lf.cache.TableDiff(tableName);
  var table = this.tables_.get(tableName).getData();
  var newKeySet = new goog.structs.Set(goog.object.getKeys(snapshot).filter(function(key) {
    return key != "__meta__";
  }).map(function(key) {
    return parseInt(key, 10);
  }));
  var newKeys = newKeySet.difference(table.getKeys()).getValues();
  newKeys.forEach(function(key) {
    diff.add(new lf.Row(key, snapshot[key.toString()]));
  });
  table.getKeys().forEach(function(key) {
    if (!newKeySet.contains(key)) {
      diff.delete(table.get(key));
    } else {
      var oldRow = table.get(key);
      if (JSON.stringify(oldRow.payload()) != JSON.stringify(snapshot[key])) {
        diff.modify([oldRow, new lf.Row(key, snapshot[key.toString()])]);
      }
    }
  });
  return diff;
};
lf.backstore.Firebase.prototype.reloadTable = function(tableName, snapshot) {
  var memTable = new lf.backstore.MemoryTable;
  this.populate_(memTable, snapshot.exportVal());
  this.tables_.set(tableName, memTable);
};
lf.backstore.Firebase.prototype.createNewDb_ = function() {
  var val = {};
  val["__version__"] = this.schema_.version();
  val["__revision__"] = 1;
  this.schema_.tables().forEach(function(table) {
    var tableName = table.getName();
    val[tableName] = {"__meta__":""};
    this.tables_.set(tableName, new lf.backstore.MemoryTable);
  }, this);
  return val;
};
lf.backstore.Firebase.prototype.createTx = function(type, journal) {
  return new lf.backstore.FirebaseTx(this, type, journal);
};
lf.backstore.Firebase.prototype.getTableInternal = function(tableName) {
  var table = this.tables_.get(tableName, null);
  if (!goog.isNull(table)) {
    return table;
  }
  throw new lf.Exception(lf.Exception.Type.DATA, "Table " + tableName + " not found");
};
lf.backstore.Firebase.prototype.getRef = function() {
  return this.db_;
};
lf.backstore.Firebase.prototype.close = function() {
};
lf.backstore.Firebase.prototype.subscribe = function(handler) {
  this.changeHandler_ = handler;
};
lf.backstore.Firebase.prototype.unsubscribe = function() {
  this.changeHandler_ = null;
};
lf.backstore.Firebase.prototype.notify = function(changes) {
  if (goog.isDefAndNotNull(this.changeHandler_)) {
    this.changeHandler_(changes);
  }
};

goog.provide("lf.backstore.FirebaseTx");
goog.require("goog.Promise");
goog.require("lf.backstore.BaseTx");
lf.backstore.FirebaseTx = function(db, type, journal) {
  lf.backstore.FirebaseTx.base(this, "constructor", journal, type);
  this.db_ = db;
};
goog.inherits(lf.backstore.FirebaseTx, lf.backstore.BaseTx);
lf.backstore.FirebaseTx.prototype.getTable = function(name, deserializeFn) {
  return this.db_.getTableInternal(name);
};
lf.backstore.FirebaseTx.prototype.commit = function() {
  lf.backstore.FirebaseTx.base(this, "commit");
  var diffs = this.getJournal().getDiff();
  var numTableAffected = diffs.getCount();
  if (numTableAffected == 0) {
    this.resolver.resolve();
  } else {
    var rev = this.db_.getRevision() + 1;
    this.db_.getRef().transaction(goog.bind(function(snapshot) {
      this.db_.setRevision(rev);
      diffs.forEach(function(diff) {
        var table = snapshot[diff.getName()];
        diff.getAdded().forEach(function(row, rowId) {
          table[rowId.toString()] = row.payload();
        });
        diff.getModified().getValues().forEach(function(pair) {
          table[pair[1].id().toString()] = pair[1].payload();
        });
        diff.getDeleted().getValues().forEach(function(row) {
          table[row.id().toString()] = null;
        });
      });
      snapshot["__revision__"] = rev;
      return snapshot;
    }, this), goog.bind(function(error, committed, snapshot) {
      if (error || !committed) {
        this.db_.setRevision(rev - 1);
        diffs.forEach(goog.bind(function(diff) {
          var tableName = diff.getName();
          this.db_.reloadTable(tableName, snapshot[tableName]);
        }, this));
        this.resolver.reject(error);
      } else {
        this.resolver.resolve();
      }
    }, this));
  }
  return this.resolver.promise;
};

goog.provide("lf.backstore.IndexedDB");
goog.require("goog.Promise");
goog.require("lf.BackStore");
goog.require("lf.Exception");
goog.require("lf.Row");
goog.require("lf.TransactionType");
goog.require("lf.backstore.BundledObjectStore");
goog.require("lf.backstore.IndexedDBRawBackStore");
goog.require("lf.backstore.IndexedDBTx");
goog.require("lf.backstore.ObjectStore");
goog.require("lf.backstore.Page");
goog.require("lf.backstore.TableType");
goog.require("lf.index.IndexMetadata");
goog.require("lf.index.IndexMetadataRow");
lf.backstore.IndexedDB = function(global, schema) {
  this.global_ = global;
  this.schema_ = schema;
  this.db_;
  this.bundledMode_ = (schema.pragma().enableBundledMode) || false;
};
lf.backstore.IndexedDB.prototype.init = function(opt_onUpgrade) {
  var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
  if (!goog.isDefAndNotNull(indexedDB)) {
    throw new lf.Exception(lf.Exception.Type.NOT_SUPPORTED, "IndexedDB not supported by platform.");
  }
  var onUpgrade = opt_onUpgrade || function(rawDb) {
    return goog.Promise.resolve();
  };
  return new goog.Promise(function(resolve, reject) {
    var request;
    try {
      request = indexedDB.open(this.schema_.name(), this.schema_.version());
    } catch (e) {
      reject(e);
      return;
    }
    request.onerror = reject;
    request.onupgradeneeded = goog.bind(function(ev) {
      this.onUpgradeNeeded_(onUpgrade, ev).then(function() {
      }, reject);
    }, this);
    request.onsuccess = goog.bind(function(ev) {
      this.db_ = ev.target.result;
      this.scanRowId_().then(goog.bind(function(rowId) {
        lf.Row.setNextId(rowId + 1);
        resolve(this.db_);
      }, this));
    }, this);
  }, this);
};
lf.backstore.IndexedDB.prototype.onUpgradeNeeded_ = function(onUpgrade, ev) {
  var db = ev.target.result;
  var tx = ev.target.transaction;
  var rawDb = new lf.backstore.IndexedDBRawBackStore(ev.oldVersion, db, tx, this.bundledMode_);
  this.removeIndexTables_(db, tx);
  this.createTables_(db, tx);
  return onUpgrade(rawDb);
};
lf.backstore.IndexedDB.prototype.removeIndexTables_ = function(db, tx) {
  var storeNames = [];
  for (var i = 0;i < db.objectStoreNames.length;++i) {
    var name = db.objectStoreNames.item(i);
    if (name.indexOf(".") != -1) {
      storeNames.push(name);
    }
  }
  storeNames.forEach(function(store) {
    try {
      db.deleteObjectStore(store);
    } catch (e) {
    }
  });
};
lf.backstore.IndexedDB.prototype.createTables_ = function(db, tx) {
  this.schema_.tables().forEach(goog.partial(this.createObjectStoresForTable_, db, tx), this);
};
lf.backstore.IndexedDB.prototype.createObjectStoresForTable_ = function(db, tx, tableSchema) {
  if (!db.objectStoreNames.contains(tableSchema.getName())) {
    db.createObjectStore(tableSchema.getName(), {keyPath:"id"});
  }
  if (tableSchema.persistentIndex()) {
    var tableIndices = tableSchema.getIndices();
    tableIndices.forEach(function(indexSchema) {
      this.createIndexTable_(db, tx, indexSchema.getNormalizedName(), lf.index.IndexMetadata.Type.BTREE);
    }, this);
    this.createIndexTable_(db, tx, tableSchema.getRowIdIndexName(), lf.index.IndexMetadata.Type.ROW_ID);
  }
};
lf.backstore.IndexedDB.prototype.createIndexTable_ = function(db, tx, indexName, indexType) {
  if (!db.objectStoreNames.contains(indexName)) {
    db.createObjectStore(indexName, {keyPath:"id"});
    var store = tx.objectStore(indexName);
    var objectStore = this.bundledMode_ ? lf.backstore.BundledObjectStore.forTableType(this.global_, store, lf.Row.deserialize, lf.backstore.TableType.INDEX) : new lf.backstore.ObjectStore(store, lf.Row.deserialize);
    objectStore.put([lf.index.IndexMetadataRow.forType(indexType)]);
  }
};
lf.backstore.IndexedDB.prototype.createTx = function(type, journal) {
  var scope = journal.getScope().getValues().map(function(table) {
    return table.getName();
  });
  journal.getIndexScope().forEach(function(indexTableName) {
    scope.push(indexTableName);
  });
  var nativeTx = this.db_.transaction(scope, type == lf.TransactionType.READ_ONLY ? "readonly" : "readwrite");
  return new lf.backstore.IndexedDBTx(this.global_, nativeTx, journal, type, this.bundledMode_);
};
lf.backstore.IndexedDB.prototype.scanRowId_ = function(opt_tx) {
  var tableNames = this.schema_.tables().map(function(table) {
    return table.getName();
  });
  var db = this.db_;
  var maxRowId = 0;
  var extractRowId = goog.bind(function(cursor) {
    if (this.bundledMode_) {
      var page = lf.backstore.Page.deserialize(cursor.value);
      return goog.object.getKeys(page.getPayload()).reduce(function(prev, cur) {
        return Math.max(prev, cur);
      }, 0);
    }
    return cursor.key;
  }, this);
  var scanTableRowId = goog.bind(function(tableName) {
    return new goog.Promise(function(resolve, reject) {
      var req;
      try {
        var tx = opt_tx || db.transaction([tableName]);
        req = tx.objectStore(tableName).openCursor(null, "prev");
      } catch (e) {
        reject(e);
        return;
      }
      req.onsuccess = function(ev) {
        var cursor = ev.target.result;
        if (cursor) {
          maxRowId = Math.max(maxRowId, extractRowId(cursor));
        }
        resolve(maxRowId);
      };
      req.onerror = function() {
        resolve(maxRowId);
      };
    }, this);
  }, this);
  var execSequentially = function() {
    if (tableNames.length == 0) {
      return goog.Promise.resolve();
    }
    var tableName = tableNames.shift();
    return scanTableRowId(tableName).then(execSequentially);
  };
  return new goog.Promise(function(resolve, reject) {
    execSequentially().then(function() {
      resolve(maxRowId);
    });
  });
};
lf.backstore.IndexedDB.prototype.close = function() {
  this.db_.close();
};
lf.backstore.IndexedDB.prototype.getTableInternal = function(tableName) {
  throw new lf.Exception(lf.Exception.Type.SYNTAX, "IndexedDB tables needs to be acquired from transactions");
};
lf.backstore.IndexedDB.prototype.subscribe = function(handler) {
};
lf.backstore.IndexedDB.prototype.unsubscribe = function() {
};
lf.backstore.IndexedDB.prototype.notify = function(changes) {
};

goog.provide("lf.backstore.IndexedDBRawBackStore");
goog.require("goog.Promise");
goog.require("goog.object");
goog.require("goog.structs.Map");
goog.require("lf.Row");
goog.require("lf.backstore.Page");
goog.require("lf.raw.BackStore");
lf.backstore.IndexedDBRawBackStore = function(version, db, tx, bundledMode) {
  this.db_ = db;
  this.tx_ = tx;
  this.version_ = version;
  this.bundleMode_ = bundledMode;
};
lf.backstore.IndexedDBRawBackStore.prototype.getRawDBInstance = function() {
  return this.db_;
};
lf.backstore.IndexedDBRawBackStore.prototype.getRawTransaction = function() {
  return this.tx_;
};
lf.backstore.IndexedDBRawBackStore.prototype.dropTable = function(tableName) {
  return new goog.Promise(function(resolve, reject) {
    try {
      this.db_.deleteObjectStore(tableName);
    } catch (e) {
      reject(e);
      return;
    }
    resolve();
  }, this);
};
lf.backstore.IndexedDBRawBackStore.prototype.openCursorForWrite_ = function(tableName, loopFunc, endFunc) {
  return new goog.Promise(function(resolve, reject) {
    var req;
    try {
      var store = this.tx_.objectStore(tableName);
      req = store.openCursor();
    } catch (e) {
      reject(e);
      return;
    }
    req.onsuccess = function(ev) {
      var cursor = (req.result);
      if (cursor) {
        loopFunc(cursor);
        cursor.continue();
      } else {
        endFunc(store);
        resolve();
      }
    };
    req.onerror = reject;
  }, this);
};
lf.backstore.IndexedDBRawBackStore.convert = function(value) {
  var ret = null;
  if (value instanceof ArrayBuffer) {
    ret = lf.Row.binToHex(value);
  } else {
    if (value instanceof Date) {
      ret = value.getTime();
    } else {
      ret = value;
    }
  }
  return ret;
};
lf.backstore.IndexedDBRawBackStore.prototype.transformRows_ = function(tableName, rowFn) {
  var loopFunc = function(cursor) {
    var row = lf.Row.deserialize(cursor.value);
    rowFn(row);
    cursor.update(row.serialize());
  };
  var loopFuncBundle = function(cursor) {
    var page = lf.backstore.Page.deserialize(cursor.value);
    var data = page.getPayload();
    for (var rowId in data) {
      var row = lf.Row.deserialize(data[rowId]);
      rowFn(row);
      data[rowId] = row.serialize();
    }
    cursor.update(page.serialize());
  };
  var endFunc = function() {
  };
  return this.openCursorForWrite_(tableName, this.bundleMode_ ? loopFuncBundle : loopFunc, endFunc);
};
lf.backstore.IndexedDBRawBackStore.prototype.addTableColumn = function(tableName, columnName, defaultValue) {
  var value = lf.backstore.IndexedDBRawBackStore.convert(defaultValue);
  return this.transformRows_(tableName, function(row) {
    row.payload()[columnName] = value;
  });
};
lf.backstore.IndexedDBRawBackStore.prototype.dropTableColumn = function(tableName, columnName) {
  return this.transformRows_(tableName, function(row) {
    delete row.payload()[columnName];
  });
};
lf.backstore.IndexedDBRawBackStore.prototype.renameTableColumn = function(tableName, oldColumnName, newColumnName) {
  return this.transformRows_(tableName, function(row) {
    row.payload()[newColumnName] = row.payload()[oldColumnName];
    delete row.payload()[oldColumnName];
  });
};
lf.backstore.IndexedDBRawBackStore.prototype.getTableRows_ = function(tableName) {
  var results = [];
  return new goog.Promise(function(resolve, reject) {
    var req;
    try {
      req = this.tx_.objectStore(tableName).openCursor();
    } catch (e) {
      reject(e);
      return;
    }
    req.onsuccess = goog.bind(function(ev) {
      var cursor = req.result;
      if (cursor) {
        if (this.bundleMode_) {
          var page = lf.backstore.Page.deserialize(cursor.value);
          var data = page.getPayload();
          for (var rowId in data) {
            results.push(data[rowId]);
          }
        } else {
          results.push(cursor.value);
        }
        cursor.continue();
      } else {
        resolve(results);
      }
    }, this);
    req.onerror = reject;
  }, this);
};
lf.backstore.IndexedDBRawBackStore.prototype.createRow = function(payload) {
  var data = {};
  goog.object.forEach(payload, goog.bind(function(value, key) {
    data[key] = lf.backstore.IndexedDBRawBackStore.convert(value);
  }, this));
  return lf.Row.create(data);
};
lf.backstore.IndexedDBRawBackStore.prototype.getVersion = function() {
  return this.version_;
};
lf.backstore.IndexedDBRawBackStore.prototype.dump = function() {
  var tables = this.db_.objectStoreNames;
  var promises = [];
  for (var i = 0;i < tables.length;++i) {
    var tableName = tables.item(i);
    promises.push(this.dumpTable_(tableName));
  }
  return goog.Promise.all(promises).then(function(tableDumps) {
    var results = {};
    tableDumps.forEach(function(tableDump, index) {
      results[tables.item(index)] = tableDump;
    });
    return results;
  });
};
lf.backstore.IndexedDBRawBackStore.prototype.dumpTable_ = function(tableName) {
  return this.getTableRows_(tableName).then(function(rawRows) {
    return rawRows.map(function(rawRow) {
      return rawRow["value"];
    });
  });
};

goog.provide("lf.backstore.IndexedDBTx");
goog.require("lf.backstore.BaseTx");
goog.require("lf.backstore.BundledObjectStore");
goog.require("lf.backstore.ObjectStore");
goog.require("lf.backstore.TableType");
lf.backstore.IndexedDBTx = function(global, transaction, journal, txType, bundleMode) {
  lf.backstore.IndexedDBTx.base(this, "constructor", journal, txType);
  this.global_ = global;
  this.tx_ = transaction;
  this.bundleMode_ = bundleMode;
  this.tx_.oncomplete = goog.bind(this.resolver.resolve, this.resolver);
  this.tx_.onabort = goog.bind(this.resolver.reject, this.resolver);
};
goog.inherits(lf.backstore.IndexedDBTx, lf.backstore.BaseTx);
lf.backstore.IndexedDBTx.prototype.getTable = function(tableName, deserializeFn, opt_tableType) {
  if (this.bundleMode_) {
    var tableType = goog.isDefAndNotNull(opt_tableType) ? opt_tableType : lf.backstore.TableType.DATA;
    return lf.backstore.BundledObjectStore.forTableType(this.global_, this.tx_.objectStore(tableName), deserializeFn, tableType);
  } else {
    return new lf.backstore.ObjectStore(this.tx_.objectStore(tableName), deserializeFn);
  }
};
lf.backstore.IndexedDBTx.prototype.abort = function() {
  this.tx_.abort();
};

goog.provide("lf.backstore.LocalStorage");
goog.require("goog.Promise");
goog.require("goog.structs.Map");
goog.require("lf.BackStore");
goog.require("lf.Exception");
goog.require("lf.backstore.LocalStorageTable");
goog.require("lf.backstore.LocalStorageTx");
lf.backstore.LocalStorage = function(schema) {
  this.schema_ = schema;
  this.tables_ = new goog.structs.Map;
  this.changeHandler_ = null;
  this.listener_ = null;
};
lf.backstore.LocalStorage.prototype.initSync = function() {
  if (!window.localStorage) {
    throw new lf.Exception(lf.Exception.Type.NOT_SUPPORTED, "LocalStorage not supported by platform.");
  }
  var versionKey = this.schema_.name() + ".version#";
  var version = window.localStorage.getItem(versionKey);
  if (goog.isDefAndNotNull(version)) {
    if (version != this.schema_.version().toString()) {
      throw new lf.Exception(lf.Exception.Type.NOT_SUPPORTED, "LocalStorage upgrade logic not implemented.");
    }
    this.loadTables_();
  } else {
    this.loadTables_();
    window.localStorage.setItem(versionKey, this.schema_.version().toString());
    this.commit();
  }
};
lf.backstore.LocalStorage.prototype.init = function(opt_onUpgrade) {
  return new goog.Promise(goog.bind(function(resolve, reject) {
    this.initSync();
    resolve();
  }, this));
};
lf.backstore.LocalStorage.prototype.loadTables_ = function() {
  var prefix = this.schema_.name() + ".";
  this.schema_.tables().forEach(function(table) {
    var tableName = table.getName();
    this.tables_.set(tableName, new lf.backstore.LocalStorageTable(prefix + tableName));
    if (table.persistentIndex()) {
      var indices = table.getIndices();
      indices.forEach(function(index) {
        var indexName = index.getNormalizedName();
        this.tables_.set(indexName, new lf.backstore.LocalStorageTable(prefix + indexName));
      }, this);
    }
  }, this);
};
lf.backstore.LocalStorage.prototype.getTableInternal = function(tableName) {
  if (!this.tables_.containsKey(tableName)) {
    throw new lf.Exception(lf.Exception.Type.DATA, "Table " + tableName + " does not exist.");
  }
  return this.tables_.get(tableName);
};
lf.backstore.LocalStorage.prototype.createTx = function(mode, journal) {
  return new lf.backstore.LocalStorageTx(this, mode, journal);
};
lf.backstore.LocalStorage.prototype.close = function() {
};
lf.backstore.LocalStorage.prototype.subscribe = function(handler) {
  this.changeHandler_ = handler;
  if (goog.isDefAndNotNull(this.listener_)) {
    return;
  }
  this.listener_ = this.onStorageEvent_.bind(this);
  window.addEventListener("storage", this.listener_, false);
};
lf.backstore.LocalStorage.prototype.commit = function() {
  this.tables_.getValues().forEach(function(table) {
    table.commit();
  });
};
lf.backstore.LocalStorage.prototype.unsubscribe = function() {
  if (goog.isDefAndNotNull(this.listener_)) {
    window.removeEventListener("storage", this.listener_, false);
    this.listener_ = null;
    this.changeHandler_ = null;
  }
};
lf.backstore.LocalStorage.prototype.notify = function(changes) {
  if (goog.isDefAndNotNull(this.changeHandler_)) {
    this.changeHandler_(changes);
  }
};
lf.backstore.LocalStorage.prototype.onStorageEvent_ = function(raw) {
  var ev = (raw);
  if (ev.storageArea != window.localStorage || ev.key.indexOf(this.schema_.name() + ".") != 0) {
    return;
  }
  var newValue = window.localStorage.getItem(ev.key);
  var newData = {};
  if (!goog.isNull(newValue)) {
    try {
      newData = JSON.parse(newValue);
    } catch (e) {
      return;
    }
  }
  var tableName = ev.key.slice(this.schema_.name().length + 1);
  var table = this.tables_.get(tableName);
  if (table) {
    this.changeHandler_([table.diff(newData)]);
  }
};

goog.provide("lf.backstore.LocalStorageTable");
goog.require("goog.Promise");
goog.require("goog.object");
goog.require("lf.Row");
goog.require("lf.Table");
goog.require("lf.cache.TableDiff");
lf.backstore.LocalStorageTable = function(tableKey) {
  this.key_ = tableKey;
  this.data_ = {};
  var rawData = window.localStorage.getItem(tableKey);
  if (goog.isDefAndNotNull(rawData)) {
    this.data_ = (JSON.parse(rawData));
  }
};
lf.backstore.LocalStorageTable.prototype.get = function(ids) {
  var results;
  if (ids.length == 0) {
    results = Object.keys(this.data_).map(function(key) {
      var id = parseInt(key, 10);
      return new lf.Row(id, this.data_[key]);
    }, this);
  } else {
    results = [];
    ids.forEach(function(id) {
      if (goog.object.containsKey(this.data_, id.toString())) {
        results.push(new lf.Row(id, this.data_[id.toString()]));
      }
    }, this);
  }
  return goog.Promise.resolve(results);
};
lf.backstore.LocalStorageTable.prototype.put = function(rows) {
  rows.forEach(function(row) {
    this.data_[row.id().toString()] = row.payload();
  }, this);
  return goog.Promise.resolve();
};
lf.backstore.LocalStorageTable.prototype.remove = function(ids) {
  if (ids.length == 0 || ids.length == goog.object.getCount(this.data_)) {
    goog.object.clear(this.data_);
  } else {
    ids.forEach(function(id) {
      goog.object.remove(this.data_, id);
    }, this);
  }
  return goog.Promise.resolve();
};
lf.backstore.LocalStorageTable.prototype.commit = function() {
  window.localStorage.setItem(this.key_, JSON.stringify(this.data_));
};
lf.backstore.LocalStorageTable.prototype.diff = function(newData) {
  var oldIds = Object.keys(this.data_);
  var newIds = Object.keys(newData);
  var diff = new lf.cache.TableDiff(this.key_);
  newIds.forEach(function(id) {
    var rowId = parseInt(id, 10);
    if (goog.object.containsKey(this.data_, id)) {
      if (JSON.stringify(this.data_[id]) != JSON.stringify(newData[id])) {
        diff.modify([new lf.Row(rowId, this.data_[id]), new lf.Row(rowId, newData[id])]);
      }
    } else {
      diff.add(new lf.Row(rowId, newData[id]));
    }
  }, this);
  oldIds.filter(function(id) {
    return !goog.object.containsKey(newData, id);
  }, this).forEach(function(id) {
    diff.delete(new lf.Row(parseInt(id, 10), this.data_[id]));
  }, this);
  return diff;
};

goog.provide("lf.backstore.LocalStorageTx");
goog.require("lf.TransactionType");
goog.require("lf.backstore.BaseTx");
lf.backstore.LocalStorageTx = function(store, type, journal) {
  lf.backstore.LocalStorageTx.base(this, "constructor", journal, type);
  this.store_ = store;
  if (type == lf.TransactionType.READ_ONLY) {
    this.resolver.resolve();
  }
};
goog.inherits(lf.backstore.LocalStorageTx, lf.backstore.BaseTx);
lf.backstore.LocalStorageTx.prototype.getTable = function(tableName, deserializeFn, tableType) {
  return this.store_.getTableInternal(tableName);
};
lf.backstore.LocalStorageTx.prototype.abort = function() {
  this.resolver.reject(undefined);
};
lf.backstore.LocalStorageTx.prototype.commit = function() {
  lf.backstore.LocalStorageTx.base(this, "commit");
  this.store_.commit();
  this.resolver.resolve();
  return this.resolver.promise;
};

goog.provide("lf.backstore.Memory");
goog.require("goog.Promise");
goog.require("goog.structs.Map");
goog.require("lf.BackStore");
goog.require("lf.Exception");
goog.require("lf.backstore.MemoryTable");
goog.require("lf.backstore.MemoryTx");
goog.require("lf.index.IndexMetadata");
goog.require("lf.index.IndexMetadataRow");
lf.backstore.Memory = function(schema) {
  this.schema_ = schema;
  this.tables_ = new goog.structs.Map;
};
lf.backstore.Memory.prototype.init = function(opt_onUpgrade) {
  this.schema_.tables().forEach(this.initTable_, this);
  return goog.Promise.resolve();
};
lf.backstore.Memory.prototype.getTableInternal = function(tableName) {
  var table = this.tables_.get(tableName, null);
  if (goog.isNull(table)) {
    throw new lf.Exception(lf.Exception.Type.DATA, "Table " + tableName + " does not exist.");
  }
  return table;
};
lf.backstore.Memory.prototype.createTx = function(mode, journal) {
  return new lf.backstore.MemoryTx(this, mode, journal);
};
lf.backstore.Memory.prototype.createTable_ = function(tableName) {
  if (!this.tables_.containsKey(tableName)) {
    var backstoreTable = new lf.backstore.MemoryTable;
    this.tables_.set(tableName, backstoreTable);
    return backstoreTable;
  }
  return null;
};
lf.backstore.Memory.prototype.initTable_ = function(tableSchema) {
  this.createTable_(tableSchema.getName());
  if (tableSchema.persistentIndex()) {
    var tableIndices = tableSchema.getIndices();
    tableIndices.forEach(function(indexSchema) {
      this.createIndexTable_(indexSchema.getNormalizedName(), lf.index.IndexMetadata.Type.BTREE);
    }, this);
    this.createIndexTable_(tableSchema.getRowIdIndexName(), lf.index.IndexMetadata.Type.ROW_ID);
  }
};
lf.backstore.Memory.prototype.createIndexTable_ = function(indexName, indexType) {
  var backstoreTable = this.createTable_(indexName);
  if (!goog.isNull(backstoreTable)) {
    backstoreTable.put([lf.index.IndexMetadataRow.forType(indexType)]);
  }
};
lf.backstore.Memory.prototype.close = function() {
};
lf.backstore.Memory.prototype.subscribe = function(handler) {
};
lf.backstore.Memory.prototype.unsubscribe = function() {
};
lf.backstore.Memory.prototype.notify = function(changes) {
};

goog.provide("lf.backstore.MemoryTable");
goog.require("goog.Promise");
goog.require("goog.structs.Map");
goog.require("lf.Table");
goog.forwardDeclare("lf.Row");
lf.backstore.MemoryTable = function() {
  this.data_ = new goog.structs.Map;
};
lf.backstore.MemoryTable.prototype.getSync = function(ids) {
  if (ids.length == 0) {
    return this.data_.getValues();
  }
  var results = [];
  ids.forEach(function(id) {
    var row = this.data_.get(id, null);
    if (!goog.isNull(row)) {
      results.push(row);
    }
  }, this);
  return results;
};
lf.backstore.MemoryTable.prototype.getData = function() {
  return this.data_;
};
lf.backstore.MemoryTable.prototype.get = function(ids) {
  return goog.Promise.resolve(this.getSync(ids));
};
lf.backstore.MemoryTable.prototype.putSync = function(rows) {
  rows.forEach(function(row) {
    this.data_.set(row.id(), row);
  }, this);
};
lf.backstore.MemoryTable.prototype.put = function(rows) {
  this.putSync(rows);
  return goog.Promise.resolve();
};
lf.backstore.MemoryTable.prototype.removeSync = function(ids) {
  if (ids.length == 0 || ids.length == this.data_.getCount()) {
    this.data_.clear();
  } else {
    ids.forEach(function(id) {
      this.data_.remove(id);
    }, this);
  }
};
lf.backstore.MemoryTable.prototype.remove = function(ids) {
  this.removeSync(ids);
  return goog.Promise.resolve();
};
lf.backstore.MemoryTable.prototype.getMaxRowId = function() {
  if (this.data_.isEmpty()) {
    return 0;
  }
  return this.data_.getKeys().reduce(function(prev, cur) {
    return prev > cur ? prev : cur;
  }, 0);
};

goog.provide("lf.backstore.MemoryTx");
goog.require("lf.TransactionType");
goog.require("lf.backstore.BaseTx");
lf.backstore.MemoryTx = function(store, type, journal) {
  lf.backstore.MemoryTx.base(this, "constructor", journal, type);
  this.store_ = store;
  if (type == lf.TransactionType.READ_ONLY) {
    this.resolver.resolve();
  }
};
goog.inherits(lf.backstore.MemoryTx, lf.backstore.BaseTx);
lf.backstore.MemoryTx.prototype.getTable = function(tableName, deserializeFn, tableType) {
  return this.store_.getTableInternal(tableName);
};
lf.backstore.MemoryTx.prototype.abort = function() {
  this.resolver.reject(undefined);
};
lf.backstore.MemoryTx.prototype.commit = function() {
  lf.backstore.MemoryTx.base(this, "commit");
  this.resolver.resolve();
  return this.resolver.promise;
};

goog.provide("lf.backstore.ObjectStore");
goog.require("goog.Promise");
goog.require("lf.Table");
lf.backstore.ObjectStore = function(store, deserializeFn) {
  this.store_ = store;
  this.deserializeFn_ = deserializeFn;
};
lf.backstore.ObjectStore.prototype.get = function(ids) {
  if (ids.length == 0) {
    return this.getAll_();
  }
  var promises = ids.map(function(id, index) {
    return new goog.Promise(function(resolve, reject) {
      var request;
      try {
        request = this.store_.get(id);
      } catch (e) {
        reject(e);
        return;
      }
      request.onerror = reject;
      request.onsuccess = goog.bind(function(ev) {
        resolve(this.deserializeFn_(ev.target.result));
      }, this);
    }, this);
  }, this);
  return goog.Promise.all(promises);
};
lf.backstore.ObjectStore.prototype.getAll_ = function() {
  return new goog.Promise(function(resolve, reject) {
    var rows = [];
    var request;
    try {
      request = this.store_.openCursor();
    } catch (e) {
      reject(e);
      return;
    }
    request.onerror = reject;
    request.onsuccess = goog.bind(function() {
      var cursor = request.result;
      if (cursor) {
        rows.push(this.deserializeFn_(cursor.value));
        cursor.continue();
      } else {
        resolve(rows);
      }
    }, this);
  }, this);
};
lf.backstore.ObjectStore.prototype.performWriteOp_ = function(reqFactory) {
  return new goog.Promise(function(resolve, reject) {
    var request;
    try {
      request = reqFactory();
    } catch (e) {
      reject(e);
      return;
    }
    request.onsuccess = resolve;
    request.onerror = reject;
  }, this);
};
lf.backstore.ObjectStore.prototype.put = function(rows) {
  if (rows.length == 0) {
    return goog.Promise.resolve();
  }
  var promises = rows.map(function(row) {
    return this.performWriteOp_(goog.bind(function() {
      return this.store_.put(row.serialize());
    }, this));
  }, this);
  return goog.Promise.all(promises);
};
lf.backstore.ObjectStore.prototype.remove = function(ids) {
  return new goog.Promise(function(resolve, reject) {
    var request = this.store_.count();
    request.onsuccess = goog.bind(function(ev) {
      if (ids.length == 0 || ev.target.result == ids.length) {
        return this.performWriteOp_(goog.bind(function() {
          return this.store_.clear();
        }, this)).then(resolve, reject);
      }
      var promises = ids.map(function(id) {
        return this.performWriteOp_(goog.bind(function() {
          return this.store_.delete(id);
        }, this));
      }, this);
      goog.Promise.all(promises).then(resolve, reject);
    }, this);
    request.onerror = reject;
  }, this);
};

goog.provide("lf.backstore.ObservableStore");
goog.require("lf.backstore.Memory");
lf.backstore.ObservableStore = function(schema) {
  lf.backstore.ObservableStore.base(this, "constructor", schema);
  this.observer_ = null;
};
goog.inherits(lf.backstore.ObservableStore, lf.backstore.Memory);
lf.backstore.ObservableStore.prototype.subscribe = function(observer) {
  if (goog.isNull(this.observer_)) {
    this.observer_ = observer;
  }
};
lf.backstore.ObservableStore.prototype.unsubscribe = function() {
  this.observer_ = null;
};
lf.backstore.ObservableStore.prototype.notify = function(changes) {
  if (!goog.isNull(this.observer_)) {
    this.observer_(changes);
  }
};

goog.provide("lf.backstore.Page");
goog.require("goog.object");
goog.require("goog.structs.Set");
lf.backstore.Page = function(id, opt_payload) {
  this.id_ = id;
  this.payload_ = opt_payload || {};
};
lf.backstore.Page.BUNDLE_EXPONENT = 9;
lf.backstore.Page.toPageIds = function(rowIds) {
  var pageIds = new goog.structs.Set;
  rowIds.forEach(function(id) {
    pageIds.add(lf.backstore.Page.toPageId(id));
  });
  return pageIds.getValues();
};
lf.backstore.Page.toPageId = function(rowId) {
  return rowId >> lf.backstore.Page.BUNDLE_EXPONENT;
};
lf.backstore.Page.getPageRange = function(pageId) {
  return [pageId << lf.backstore.Page.BUNDLE_EXPONENT, (pageId + 1 << lf.backstore.Page.BUNDLE_EXPONENT) - 1];
};
lf.backstore.Page.prototype.getId = function() {
  return this.id_;
};
lf.backstore.Page.prototype.getPayload = function() {
  return this.payload_;
};
lf.backstore.Page.prototype.setRows = function(rows) {
  rows.forEach(function(row) {
    this.payload_[row.id()] = row.serialize();
  }, this);
};
lf.backstore.Page.prototype.removeRows = function(ids) {
  ids.forEach(function(id) {
    goog.object.remove(this.payload_, id);
  }, this);
};
lf.backstore.Page.prototype.serialize = function() {
  return {"id":this.id_, "value":JSON.stringify(this.payload_)};
};
lf.backstore.Page.deserialize = function(data) {
  return new lf.backstore.Page(data["id"], (JSON.parse(data["value"])));
};

goog.provide("lf.backstore.TableType");
lf.backstore.TableType = {DATA:0, INDEX:1};

goog.provide("lf.backstore.Tx");
goog.forwardDeclare("lf.backstore.TableType");
lf.backstore.Tx = function() {
};
lf.backstore.Tx.prototype.getTable;
lf.backstore.Tx.prototype.getJournal;
lf.backstore.Tx.prototype.commit;
lf.backstore.Tx.prototype.abort;

goog.provide("lf.backstore.WebSql");
goog.require("goog.Promise");
goog.require("lf.BackStore");
goog.require("lf.Exception");
goog.require("lf.TransactionType");
goog.require("lf.backstore.WebSqlRawBackStore");
goog.require("lf.backstore.WebSqlTx");
goog.require("lf.cache.Journal");
lf.backstore.WebSql = function(global, schema, opt_size) {
  this.global_ = global;
  this.schema_ = schema;
  this.db_;
  this.size_ = opt_size || 4 * 1024 * 1024;
};
lf.backstore.WebSql.prototype.getEmptyJournal_ = function() {
  return new lf.cache.Journal(this.global_, []);
};
lf.backstore.WebSql.prototype.init = function(opt_onUpgrade) {
  if (!goog.isDefAndNotNull(window.openDatabase)) {
    throw new lf.Exception(lf.Exception.Type.NOT_SUPPORTED, "WebSql not supported by platform.");
  }
  var onUpgrade = opt_onUpgrade || function(rawDb) {
    return goog.Promise.resolve();
  };
  return new goog.Promise(goog.bind(function(resolve, reject) {
    try {
      window.openDatabase(this.schema_.name(), "", this.schema_.name(), this.size_, goog.bind(function(db) {
        this.db_ = db;
        this.checkVersion_(onUpgrade).then(resolve, reject);
      }, this));
    } catch (e) {
      reject(e);
    }
  }, this));
};
lf.backstore.WebSql.prototype.checkVersion_ = function(onUpgrade) {
  var CREATE_VERSION = "CREATE TABLE IF NOT EXISTS __lf_ver(id INTEGER PRIMARY KEY, v INTEGER)";
  var GET_VERSION = "SELECT v FROM __lf_ver WHERE id = 0";
  var resolver = goog.Promise.withResolver();
  var tx = new lf.backstore.WebSqlTx(this.db_, this.getEmptyJournal_(), lf.TransactionType.READ_WRITE);
  tx.queue(CREATE_VERSION, []);
  tx.queue(GET_VERSION, []);
  tx.commit().then(goog.bind(function(results) {
    var version = 0;
    if (results.rows.length) {
      version = results.rows.item(0)["v"];
    }
    if (version < this.schema_.version()) {
      this.onUpgrade_(onUpgrade, version).then(resolver.resolve.bind(resolver));
    } else {
      if (version > this.schema_.version()) {
        resolver.reject(new lf.Exception(lf.Exception.Type.DATA, "Attempt to open a newer database with old code"));
      } else {
        resolver.resolve();
      }
    }
  }, this));
  return resolver.promise;
};
lf.backstore.WebSql.prototype.initialized = function() {
  return goog.isDefAndNotNull(this.db_);
};
lf.backstore.WebSql.prototype.createTx = function(type, journal) {
  if (goog.isDefAndNotNull(this.db_)) {
    return new lf.backstore.WebSqlTx(this.db_, journal, type);
  }
  throw new lf.Exception(lf.Exception.Type.DATA, "Attempt to create transaction from uninitialized DB");
};
lf.backstore.WebSql.prototype.close = function() {
};
lf.backstore.WebSql.prototype.getTableInternal = function(tableName) {
  throw new lf.Exception(lf.Exception.Type.SYNTAX, "WebSQL tables needs to be acquired from transactions");
};
lf.backstore.WebSql.prototype.notSupported_ = function() {
  throw new lf.Exception(lf.Exception.Type.NOT_SUPPORTED, "WebSQL does not support change notification");
};
lf.backstore.WebSql.prototype.subscribe = function(handler) {
  this.notSupported_();
};
lf.backstore.WebSql.prototype.unsubscribe = function() {
  this.notSupported_();
};
lf.backstore.WebSql.prototype.notify = function(changes) {
  this.notSupported_();
};
lf.backstore.WebSql.prototype.onUpgrade_ = function(onUpgrade, oldVersion) {
  var resolver = goog.Promise.withResolver();
  this.preUpgrade_().then(goog.bind(function() {
    var rawDb = new lf.backstore.WebSqlRawBackStore(this.global_, oldVersion, this.db_);
    onUpgrade(rawDb).then(goog.bind(function() {
      return this.scanRowId_();
    }, this)).then(resolver.resolve.bind(resolver));
  }, this), resolver.reject.bind(resolver));
  return resolver.promise;
};
lf.backstore.WebSql.prototype.preUpgrade_ = function() {
  var tables = this.schema_.tables();
  var tx = new lf.backstore.WebSqlTx(this.db_, this.getEmptyJournal_(), lf.TransactionType.READ_WRITE);
  var tx2 = new lf.backstore.WebSqlTx(this.db_, this.getEmptyJournal_(), lf.TransactionType.READ_WRITE);
  tx.queue("INSERT OR REPLACE INTO __lf_ver VALUES (0, ?)", [this.schema_.version()]);
  lf.backstore.WebSqlRawBackStore.queueListTables(tx);
  return tx.commit().then(function(results) {
    results.filter(function(name) {
      return name.indexOf(".") != -1;
    }).forEach(function(name) {
      tx2.queue("DROP TABLE " + name, []);
    });
    var existingTables = results.filter(function(name) {
      return name.indexOf(".") == -1;
    });
    var newTables = tables.map(function(table) {
      return table.getName();
    }).filter(function(name) {
      return existingTables.indexOf(name) == -1;
    });
    newTables.forEach(function(name) {
      tx2.queue("CREATE TABLE " + name + "(id INTEGER PRIMARY KEY, value TEXT)", []);
    });
    return tx2.commit();
  });
};
lf.backstore.WebSql.prototype.scanRowId_ = function() {
  var maxRowId = 0;
  var resolver = goog.Promise.withResolver();
  var selectIdFromTable = goog.bind(function(tableName) {
    var tx = new lf.backstore.WebSqlTx(this.db_, this.getEmptyJournal_(), lf.TransactionType.READ_ONLY);
    tx.queue("SELECT MAX(id) FROM " + tableName, []);
    return tx.commit().then(function(results) {
      var id = results.rows.item(0)[0];
      maxRowId = Math.max(id, maxRowId);
    });
  }, this);
  var promises = this.schema_.tables().map(function(table) {
    return selectIdFromTable(table.getName());
  });
  goog.Promise.all(promises).then(function() {
    resolver.resolve(maxRowId);
  }, function(e) {
    resolver.reject(e);
  });
  return resolver.promise;
};

goog.provide("lf.backstore.WebSqlRawBackStore");
goog.require("goog.Promise");
goog.require("goog.object");
goog.require("lf.Exception");
goog.require("lf.Row");
goog.require("lf.TransactionType");
goog.require("lf.backstore.IndexedDBRawBackStore");
goog.require("lf.backstore.WebSqlTx");
goog.require("lf.cache.Journal");
goog.require("lf.raw.BackStore");
lf.backstore.WebSqlRawBackStore = function(global, oldVersion, db) {
  this.db_ = db;
  this.global_ = global;
  this.version_ = oldVersion;
};
lf.backstore.WebSqlRawBackStore.prototype.getRawDBInstance = function() {
  return this.db_;
};
lf.backstore.WebSqlRawBackStore.prototype.getRawTransaction = function() {
  throw new lf.Exception(lf.Exception.Type.NOT_SUPPORTED, "Use the raw instance to create transaction instead.");
};
lf.backstore.WebSqlRawBackStore.prototype.createTx_ = function() {
  return new lf.backstore.WebSqlTx(this.db_, new lf.cache.Journal(this.global_, []), lf.TransactionType.READ_WRITE);
};
lf.backstore.WebSqlRawBackStore.prototype.dropTable = function(tableName) {
  var tx = this.createTx_();
  tx.queue("DROP TABLE " + tableName, []);
  return tx.commit();
};
lf.backstore.WebSqlRawBackStore.prototype.dumpTable_ = function(tableName) {
  var tx = this.createTx_();
  tx.queue("SELECT id, value FROM " + tableName, []);
  return tx.commit().then(function(results) {
    var length = results.rows.length;
    var rows = new Array(length);
    for (var i = 0;i < length;++i) {
      rows[i] = ({id:results.rows.item(i)["id"], value:JSON.parse(results.rows.item(i)["value"])});
    }
    return goog.Promise.resolve(rows);
  });
};
lf.backstore.WebSqlRawBackStore.prototype.transformColumn_ = function(tableName, transformer) {
  var tx = this.createTx_();
  var sql = "UPDATE " + tableName + " SET value=? WHERE id=?";
  return this.dumpTable_(tableName).then(function(rows) {
    rows.forEach(function(row) {
      var newRow = transformer(row);
      tx.queue(sql, [JSON.stringify(newRow.value), newRow.id]);
    });
    return tx.commit();
  });
};
lf.backstore.WebSqlRawBackStore.prototype.addTableColumn = function(tableName, columnName, defaultValue) {
  var value = lf.backstore.IndexedDBRawBackStore.convert(defaultValue);
  return this.transformColumn_(tableName, function(row) {
    row.value[columnName] = value;
    return row;
  });
};
lf.backstore.WebSqlRawBackStore.prototype.dropTableColumn = function(tableName, columnName) {
  return this.transformColumn_(tableName, function(row) {
    delete row.value[columnName];
    return row;
  });
};
lf.backstore.WebSqlRawBackStore.prototype.renameTableColumn = function(tableName, oldColumnName, newColumnName) {
  return this.transformColumn_(tableName, function(row) {
    row.value[newColumnName] = row.value[oldColumnName];
    delete row.value[oldColumnName];
    return row;
  });
};
lf.backstore.WebSqlRawBackStore.prototype.createRow = function(payload) {
  var data = {};
  for (var key in payload) {
    data[key] = lf.backstore.IndexedDBRawBackStore.convert(payload[key]);
  }
  return lf.Row.create(data);
};
lf.backstore.WebSqlRawBackStore.prototype.getVersion = function() {
  return this.version_;
};
lf.backstore.WebSqlRawBackStore.queueListTables = function(tx) {
  var GET_TABLE_NAMES = 'SELECT tbl_name FROM sqlite_master WHERE type="table"';
  tx.queue(GET_TABLE_NAMES, [], function(results) {
    var tableNames = new Array(results.rows.length);
    for (var i = 0;i < tableNames.length;++i) {
      tableNames[i] = results.rows.item(i)["tbl_name"];
    }
    return tableNames;
  });
};
lf.backstore.WebSqlRawBackStore.prototype.dump = function() {
  var resolver = goog.Promise.withResolver();
  var tx = this.createTx_();
  lf.backstore.WebSqlRawBackStore.queueListTables(tx);
  var ret = {};
  tx.commit().then(goog.bind(function(results) {
    var tables = results.filter(function(name) {
      return name != "__lf_ver" && name != "__WebKitDatabaseInfoTable__";
    });
    var promises = tables.map(function(tableName) {
      return this.dumpTable_(tableName).then(function(rows) {
        ret[tableName] = rows;
      });
    }, this);
    goog.Promise.all(promises).then(function() {
      resolver.resolve(ret);
    });
  }, this));
  return resolver.promise;
};

goog.provide("lf.backstore.WebSqlTable");
goog.require("goog.Promise");
goog.require("lf.Table");
lf.backstore.WebSqlTable = function(tx, name, deserializeFn) {
  this.tx_ = tx;
  this.name_ = name;
  this.deserializeFn_ = deserializeFn;
};
lf.backstore.WebSqlTable.prototype.get = function(ids) {
  var where = ids.length == 0 ? "" : "WHERE id IN (" + ids.join(",") + ")";
  var sql = "SELECT id, value FROM " + this.name_ + " " + where;
  var deserializeFn = this.deserializeFn_;
  var transformer = function(results) {
    var length = results.rows.length;
    var rows = new Array(length);
    for (var i = 0;i < length;++i) {
      rows[i] = deserializeFn(({id:results.rows.item(i)["id"], value:JSON.parse(results.rows.item(i)["value"])}));
    }
    return rows;
  };
  this.tx_.queue(sql, [], transformer);
  return this.tx_.commit();
};
lf.backstore.WebSqlTable.prototype.put = function(rows) {
  if (rows.length == 0) {
    return goog.Promise.resolve();
  }
  var sql = "INSERT OR REPLACE INTO " + this.name_ + "(id, value) " + "VALUES (?, ?)";
  rows.forEach(function(row) {
    this.tx_.queue(sql, [row.id(), JSON.stringify(row.payload())]);
  }, this);
  return goog.Promise.resolve();
};
lf.backstore.WebSqlTable.prototype.remove = function(ids) {
  var where = ids.length == 0 ? "" : "WHERE id IN (" + ids.join(",") + ")";
  var sql = "DELETE FROM " + this.name_ + " " + where;
  this.tx_.queue(sql, []);
  return goog.Promise.resolve();
};

goog.provide("lf.backstore.WebSqlTx");
goog.require("goog.Promise");
goog.require("goog.structs.Map");
goog.require("lf.TransactionType");
goog.require("lf.backstore.BaseTx");
goog.require("lf.backstore.WebSqlTable");
lf.backstore.WebSqlTx = function(db, journal, txType) {
  lf.backstore.WebSqlTx.base(this, "constructor", journal, txType);
  this.db_ = db;
  this.tx_;
  this.tables_ = new goog.structs.Map;
  this.commands_ = [];
};
goog.inherits(lf.backstore.WebSqlTx, lf.backstore.BaseTx);
lf.backstore.WebSqlTx.Command_;
lf.backstore.WebSqlTx.prototype.getTable = function(tableName, deserializeFn) {
  var table = this.tables_.get(tableName, null);
  if (goog.isNull(table)) {
    table = new lf.backstore.WebSqlTable(this, tableName, deserializeFn);
    this.tables_.set(tableName, table);
  }
  return table;
};
lf.backstore.WebSqlTx.prototype.queue = function(statement, params, opt_transform) {
  this.commands_.push({statement:statement, params:params, transform:opt_transform});
};
lf.backstore.WebSqlTx.prototype.commit = function() {
  lf.backstore.WebSqlTx.base(this, "commit");
  var lastResults;
  var transformer;
  var onTxError = this.resolver.reject.bind(this.resolver);
  var onExecError = function(tx, e) {
    this.resolver.reject(e);
  }.bind(this);
  var callback = goog.bind(function(tx, results) {
    lastResults = results;
    if (this.commands_.length) {
      var command = this.commands_.shift();
      transformer = command.transform;
      tx.executeSql(command.statement, command.params, callback, onExecError);
    } else {
      var ret = lastResults;
      if (goog.isDefAndNotNull(transformer) && goog.isDefAndNotNull(lastResults)) {
        ret = transformer(lastResults);
      }
      this.resolver.resolve(ret);
    }
  }, this);
  if (this.txType == lf.TransactionType.READ_ONLY) {
    this.db_.readTransaction(callback, onTxError);
  } else {
    this.db_.transaction(callback, onTxError);
  }
  return this.resolver.promise;
};
lf.backstore.WebSqlTx.prototype.abort = function() {
  this.commands_ = [];
};

goog.provide("lf.index.AATree");
goog.require("goog.asserts");
goog.require("lf.Exception");
goog.require("lf.index");
goog.require("lf.index.Favor");
goog.require("lf.index.Index");
lf.index.AANode_ = function() {
  this.level = 0;
  this.left = this;
  this.right = this;
  this.key;
  this.value;
};
lf.index.AANode_.create = function(key, value, nullNode) {
  var node = new lf.index.AANode_;
  node.level = 1;
  node.left = nullNode;
  node.right = nullNode;
  node.key = key;
  node.value = value;
  return node;
};
lf.index.AATree = function(name, comparator) {
  this.name_ = name;
  this.nullNode_ = new lf.index.AANode_;
  this.deleted_ = null;
  this.root_ = this.nullNode_;
  this.comparator_ = comparator;
};
lf.index.AATree.prototype.getName = function() {
  return this.name_;
};
lf.index.AATree.prototype.skew_ = function(node) {
  if (node.level == node.left.level) {
    var left = node.left;
    node.left = left.right;
    left.right = node;
    return left;
  }
  return node;
};
lf.index.AATree.prototype.split_ = function(node) {
  if (node.right.right.level == node.level) {
    var right = node.right;
    node.right = right.left;
    right.left = node;
    right.level++;
    return right;
  }
  return node;
};
lf.index.AATree.prototype.insert_ = function(node, key, value) {
  if (node == this.nullNode_) {
    return lf.index.AANode_.create(key, value, this.nullNode_);
  }
  var favor = this.comparator_.compare(key, node.key);
  if (favor == lf.index.Favor.RHS) {
    node.left = this.insert_(node.left, key, value);
  } else {
    if (favor == lf.index.Favor.LHS) {
      node.right = this.insert_(node.right, key, value);
    } else {
      throw new lf.Exception(lf.Exception.Type.CONSTRAINT, "AA index does not support duplicate keys");
    }
  }
  var ret = this.skew_(node);
  ret = this.split_(ret);
  return ret;
};
lf.index.AATree.prototype.add = function(key, value) {
  this.root_ = this.insert_(this.root_, (key), value);
};
lf.index.AATree.prototype.set = function(key, value) {
  var node = this.search_(this.root_, (key));
  if (node == null) {
    this.add(key, value);
  } else {
    node.value = value;
  }
};
lf.index.AATree.prototype.delete_ = function(node, key) {
  if (node == this.nullNode_) {
    return this.nullNode_;
  }
  var favor = this.comparator_.compare(key, node.key);
  if (favor == lf.index.Favor.RHS) {
    node.left = this.delete_(node.left, key);
  } else {
    if (favor == lf.index.Favor.TIE) {
      this.deleted_ = node;
    }
    node.right = this.delete_(node.right, key);
  }
  var ret = node;
  if (this.deleted_ != null) {
    this.deleted_.key = node.key;
    this.deleted_.value = node.value;
    this.deleted_ = null;
    ret = ret.right;
  } else {
    if (ret.left.level < ret.level - 1 || ret.right.level < ret.level - 1) {
      --ret.level;
      if (ret.right.level > ret.level) {
        ret.right.level = ret.level;
      }
      ret = this.skew_(node);
      ret.right = this.skew_(ret.right);
      ret.right.right = this.skew_(ret.right.right);
      ret = this.split_(ret);
      ret.right = this.split_(ret.right);
    }
  }
  return ret;
};
lf.index.AATree.prototype.remove = function(key, opt_rowId) {
  this.root_ = this.delete_(this.root_, (key));
};
lf.index.AATree.prototype.search_ = function(node, key) {
  if (node == this.nullNode_) {
    return null;
  }
  var favor = this.comparator_.compare(key, node.key);
  return favor == lf.index.Favor.TIE ? node : favor == lf.index.Favor.RHS ? this.search_(node.left, key) : this.search_(node.right, key);
};
lf.index.AATree.prototype.get = function(key) {
  var node = this.search_(this.root_, (key));
  return node == null ? [] : [node.value];
};
lf.index.AATree.prototype.cost = function(opt_keyRange) {
  return goog.isDefAndNotNull(opt_keyRange) ? this.getRange([opt_keyRange]).length : this.getRange().length;
};
lf.index.AATree.prototype.getLeftMostNode_ = function() {
  var node = this.root_;
  while (node.left != this.nullNode_) {
    node = node.left;
  }
  return node;
};
lf.index.AATree.prototype.getRightMostNode_ = function() {
  var node = this.root_;
  while (node.right != this.nullNode_) {
    node = node.right;
  }
  return node;
};
lf.index.AATree.prototype.traverse_ = function(node, keyRange, results) {
  if (node == this.nullNode_) {
    return;
  }
  var coverage = this.comparator_.compareRange(node.key, keyRange);
  if (coverage[0]) {
    this.traverse_(node.left, keyRange, results);
    if (coverage[1]) {
      results.push(node.value);
    }
  }
  if (coverage[1]) {
    this.traverse_(node.right, keyRange, results);
  }
};
lf.index.AATree.prototype.getRange = function(opt_keyRanges, opt_reverseOrder, opt_limit, opt_skip) {
  var sortedKeyRanges = goog.isDefAndNotNull(opt_keyRanges) ? this.comparator_.sortKeyRanges(opt_keyRanges) : [this.comparator_.getAllRange()];
  var results = [];
  sortedKeyRanges.forEach(function(range) {
    this.traverse_(this.root_, range, results);
  }, this);
  return lf.index.slice(results, opt_reverseOrder, opt_limit, opt_skip);
};
lf.index.AATree.prototype.clear = function() {
  this.root_ = this.nullNode_;
};
lf.index.AATree.prototype.containsKey = function(key) {
  return this.search_(this.root_, (key)) != null;
};
lf.index.AATree.prototype.min = function() {
  return this.minMax_(goog.bind(this.comparator_.min, this.comparator_));
};
lf.index.AATree.prototype.max = function() {
  return this.minMax_(goog.bind(this.comparator_.max, this.comparator_));
};
lf.index.AATree.prototype.minMax_ = function(compareFn) {
  var leftMostNode = this.getLeftMostNode_();
  var rightMostNode = this.getRightMostNode_();
  if (!goog.isDefAndNotNull(leftMostNode.key) && !goog.isDefAndNotNull(rightMostNode.key)) {
    return [null, null];
  }
  return compareFn(leftMostNode.key, rightMostNode.key) == lf.index.Favor.LHS ? [leftMostNode.key, [leftMostNode.value]] : [rightMostNode.key, [rightMostNode.value]];
};
lf.index.AATree.prototype.serialize = function() {
  goog.asserts.fail("AATree index serialization is not supported.");
  return [];
};
lf.index.AATree.prototype.comparator = function() {
  return this.comparator_;
};
lf.index.AATree.prototype.dump_ = function(node, buffer) {
  if (node == this.nullNode_) {
    return;
  }
  var left = node.left == this.nullNode_ ? 0 : node.left.key;
  var right = node.right == this.nullNode_ ? 0 : node.right.key;
  var val = "[" + node.key + "-" + left + "/" + right + "]";
  buffer[node.level - 1].push(val);
  this.dump_(node.left, buffer);
  this.dump_(node.right, buffer);
};
lf.index.AATree.prototype.toString = function() {
  var buffer = [];
  for (var j = 0;j < this.root_.level;++j) {
    buffer.push([]);
  }
  this.dump_(this.root_, buffer);
  var result = "";
  for (var i = buffer.length - 1;i >= 0;--i) {
    result = result + buffer[i].join("") + "\n";
  }
  return result;
};

goog.provide("lf.index.BTree");
goog.require("goog.array");
goog.require("lf.Exception");
goog.require("lf.Row");
goog.require("lf.index");
goog.require("lf.index.Favor");
goog.require("lf.index.Index");
lf.index.BTree = function(name, comparator, uniqueKeyOnly, opt_data) {
  this.name_ = name;
  this.comparator_ = comparator;
  this.uniqueKeyOnly_ = uniqueKeyOnly;
  this.root_;
  if (opt_data) {
    this.root_ = lf.index.BTreeNode_.fromData(this, opt_data);
  } else {
    this.clear();
  }
};
lf.index.BTree.EMPTY = [];
lf.index.BTree.prototype.getName = function() {
  return this.name_;
};
lf.index.BTree.prototype.toString = function() {
  return this.root_.toString();
};
lf.index.BTree.prototype.add = function(key, value) {
  this.root_ = this.root_.insert((key), value);
};
lf.index.BTree.prototype.set = function(key, value) {
  this.root_ = this.root_.insert((key), value, true);
};
lf.index.BTree.prototype.remove = function(key, opt_rowId) {
  this.root_ = this.root_.remove((key), opt_rowId);
};
lf.index.BTree.prototype.get = function(key) {
  return this.root_.get((key));
};
lf.index.BTree.prototype.cost = function(opt_keyRange) {
  return goog.isDefAndNotNull(opt_keyRange) ? this.getRange([opt_keyRange]).length : this.getRange().length;
};
lf.index.BTree.prototype.getRange = function(opt_keyRanges, opt_reverseOrder, opt_limit, opt_skip) {
  var leftMostKey = this.root_.getLeftMostNode().keys_[0];
  if (!goog.isDef(leftMostKey) || opt_limit == 0) {
    return lf.index.BTree.EMPTY;
  }
  var maxNumResults = (opt_limit || 0) + (opt_skip || 0);
  maxNumResults = maxNumResults > 0 && !opt_reverseOrder ? maxNumResults : Number.POSITIVE_INFINITY;
  var sortedKeyRanges = goog.isDef(opt_keyRanges) ? this.comparator_.sortKeyRanges(opt_keyRanges) : [this.comparator_.getAllRange()];
  var results = [];
  sortedKeyRanges.forEach(function(range) {
    var keys = this.comparator_.rangeToKeys(range);
    var key = this.comparator_.isLeftOpen(range) ? leftMostKey : keys[0];
    var start = this.root_.getContainingLeaf(key);
    var strikeCount = 0;
    while (goog.isDefAndNotNull(start) && results.length < maxNumResults) {
      var length = start.getRange(range, results);
      if (length != 0) {
        strikeCount = 0;
      } else {
        strikeCount++;
      }
      start = strikeCount == 2 ? null : start.next();
    }
  }, this);
  return lf.index.slice(results, opt_reverseOrder, opt_limit, opt_skip);
};
lf.index.BTree.prototype.clear = function() {
  this.root_ = lf.index.BTreeNode_.create(this);
};
lf.index.BTree.prototype.containsKey = function(key) {
  return this.root_.containsKey((key));
};
lf.index.BTree.prototype.min = function() {
  return this.minMax_(goog.bind(this.comparator_.min, this.comparator_));
};
lf.index.BTree.prototype.max = function() {
  return this.minMax_(goog.bind(this.comparator_.max, this.comparator_));
};
lf.index.BTree.prototype.minMax_ = function(compareFn) {
  var leftMostNode = this.root_.getLeftMostNode();
  var rightMostNode = this.root_.getRightMostNode();
  if (leftMostNode.keys_.length == 0 && rightMostNode.keys_.length == 0) {
    return [null, null];
  }
  var leftMostKey = leftMostNode.keys_[0];
  var leftMostValues = leftMostNode.values_[0];
  var rightMostKey = rightMostNode.keys_[rightMostNode.keys_.length - 1];
  var rightMostValues = rightMostNode.values_[rightMostNode.keys_.length - 1];
  return compareFn(leftMostKey, rightMostKey) == lf.index.Favor.LHS ? [leftMostKey, this.uniqueKeyOnly_ ? [leftMostValues] : leftMostValues] : [rightMostKey, this.uniqueKeyOnly_ ? [rightMostValues] : rightMostValues];
};
lf.index.BTree.prototype.isUniqueKeyOnly = function() {
  return this.uniqueKeyOnly_;
};
lf.index.BTree.prototype.comparator = function() {
  return this.comparator_;
};
lf.index.BTree.prototype.lt = function(lhs, rhs) {
  if (goog.isDefAndNotNull(lhs)) {
    return this.comparator_.compare(lhs, rhs) == lf.index.Favor.RHS;
  }
  return false;
};
lf.index.BTree.prototype.eq = function(lhs, rhs) {
  if (goog.isDefAndNotNull(lhs)) {
    return this.comparator_.compare(lhs, rhs) == lf.index.Favor.TIE;
  }
  return false;
};
lf.index.BTree.prototype.serialize = function() {
  var start = this.root_.getLeftMostNode();
  return lf.index.BTreeNode_.serialize(start);
};
lf.index.BTree.deserialize = function(comparator, name, uniqueKeyOnly, rows) {
  var tree = new lf.index.BTree(name, comparator, uniqueKeyOnly);
  var newRoot = lf.index.BTreeNode_.deserialize(rows, tree);
  tree.root_ = newRoot;
  return tree;
};
lf.index.BTreeNode_ = function(id, tree) {
  this.id_ = id;
  this.tree_ = tree;
  this.height_ = 0;
  this.parent_ = null;
  this.prev_ = null;
  this.next_ = null;
  this.keys_ = [];
  this.values_ = [];
  this.children_ = [];
};
lf.index.BTreeNode_.MAX_COUNT_ = 512;
lf.index.BTreeNode_.MAX_KEY_LEN_ = lf.index.BTreeNode_.MAX_COUNT_ - 1;
lf.index.BTreeNode_.MIN_KEY_LEN_ = lf.index.BTreeNode_.MAX_COUNT_ >> 1;
lf.index.BTreeNode_.create = function(tree) {
  var node = new lf.index.BTreeNode_(lf.Row.getNextId(), tree);
  return node;
};
lf.index.BTreeNode_.prototype.isLeaf_ = function() {
  return this.height_ == 0;
};
lf.index.BTreeNode_.prototype.isRoot_ = function() {
  return this.parent_ == null;
};
lf.index.BTreeNode_.prototype.next = function() {
  return this.next_;
};
lf.index.BTreeNode_.dumpLevel_ = function(node) {
  var key = node.id_ + "[" + node.keys_.join("|") + "]";
  var childrenIds = node.children_.map(function(n) {
    return n.id_;
  });
  var children = childrenIds.join("|");
  var values = node.values_.join("/");
  var getNodeId = function(node) {
    return goog.isDefAndNotNull(node) ? node.id_.toString() : "_";
  };
  var contents = getNodeId(node.prev_) + "{";
  if (node.isLeaf_()) {
    contents = contents + values;
  } else {
    contents = contents + children;
  }
  contents = contents + "}" + getNodeId(node.parent_);
  if (node.next_) {
    var next = lf.index.BTreeNode_.dumpLevel_(node.next_);
    key = key + "  " + next[0];
    contents = contents + "  " + next[1];
  }
  return [key, contents];
};
lf.index.BTreeNode_.prototype.toString = function() {
  var result = "";
  var level = lf.index.BTreeNode_.dumpLevel_(this);
  result += level[0] + "\n" + level[1] + "\n";
  if (this.children_.length) {
    result += this.children_[0].toString();
  }
  return result;
};
lf.index.BTreeNode_.prototype.getLeftMostNode = function() {
  if (this.isLeaf_()) {
    return this;
  }
  return this.children_[0].getLeftMostNode();
};
lf.index.BTreeNode_.prototype.getRightMostNode = function() {
  if (this.isLeaf_()) {
    return this;
  }
  return this.children_[this.children_.length - 1].getRightMostNode();
};
lf.index.BTreeNode_.associate_ = function(left, right) {
  if (right) {
    right.prev_ = left;
  }
  if (left) {
    left.next_ = right;
  }
};
lf.index.BTreeNode_.calcNodeLen_ = function(remaining) {
  var maxLen = lf.index.BTreeNode_.MAX_KEY_LEN_;
  var minLen = lf.index.BTreeNode_.MIN_KEY_LEN_ + 1;
  return remaining >= maxLen + minLen ? maxLen : remaining >= minLen && remaining <= maxLen ? remaining : minLen;
};
lf.index.BTreeNode_.Payload;
lf.index.BTreeNode_.createLeaves_ = function(tree, data) {
  var remaining = data.length;
  var dataIndex = 0;
  var curNode = lf.index.BTreeNode_.create(tree);
  var node = curNode;
  while (remaining > 0) {
    var nodeLen = lf.index.BTreeNode_.calcNodeLen_(remaining);
    var target = data.slice(dataIndex, dataIndex + nodeLen);
    curNode.keys_ = target.map(function(e) {
      return e.key;
    });
    curNode.values_ = target.map(function(e) {
      return e.value;
    });
    dataIndex += nodeLen;
    remaining -= nodeLen;
    if (remaining > 0) {
      var newNode = lf.index.BTreeNode_.create(curNode.tree_);
      lf.index.BTreeNode_.associate_(curNode, newNode);
      curNode = newNode;
    }
  }
  return node;
};
lf.index.BTreeNode_.createParent_ = function(nodes) {
  var node = nodes[0];
  var root = lf.index.BTreeNode_.create(node.tree_);
  root.height_ = node.height_ + 1;
  root.children_ = nodes;
  for (var i = 0;i < nodes.length;++i) {
    nodes[i].parent_ = root;
    if (i > 0) {
      root.keys_.push(nodes[i].keys_[0]);
    }
  }
  return root;
};
lf.index.BTreeNode_.createInternals_ = function(node) {
  var curNode = node;
  var data = [];
  do {
    data.push(curNode);
    curNode = curNode.next_;
  } while (curNode);
  var root;
  if (data.length <= lf.index.BTreeNode_.MAX_KEY_LEN_ + 1) {
    root = lf.index.BTreeNode_.createParent_(data);
  } else {
    var remaining = data.length;
    var dataIndex = 0;
    root = lf.index.BTreeNode_.create(node.tree_);
    root.height_ = node.height_ + 2;
    while (remaining > 0) {
      var nodeLen = lf.index.BTreeNode_.calcNodeLen_(remaining);
      var target = data.slice(dataIndex, dataIndex + nodeLen);
      var newNode = lf.index.BTreeNode_.createParent_(target);
      newNode.parent_ = root;
      if (root.children_.length) {
        root.keys_.push(target[0].keys_[0]);
        lf.index.BTreeNode_.associate_(root.children_[root.children_.length - 1], newNode);
      }
      root.children_.push(newNode);
      dataIndex += nodeLen;
      remaining -= nodeLen;
    }
  }
  return root;
};
lf.index.BTreeNode_.fromData = function(tree, data) {
  var max = lf.index.BTreeNode_.MAX_KEY_LEN_;
  max = max * max * max;
  if (data.length >= max) {
    throw new lf.Exception(lf.Exception.Type.TOO_MANY_ROWS, "B-Tree implementation supports at most " + max + " rows.");
  }
  var node = lf.index.BTreeNode_.createLeaves_(tree, data);
  node = lf.index.BTreeNode_.createInternals_(node);
  return node;
};
lf.index.BTreeNode_.prototype.get = function(key) {
  var pos = this.searchKey_(key);
  if (this.isLeaf_()) {
    var results = lf.index.BTree.EMPTY;
    if (this.tree_.eq(this.keys_[pos], key)) {
      results = results.concat(this.values_[pos]);
    }
    return results;
  } else {
    pos = this.tree_.eq(this.keys_[pos], key) ? pos + 1 : pos;
    return this.children_[pos].get(key);
  }
};
lf.index.BTreeNode_.prototype.containsKey = function(key) {
  var pos = this.searchKey_(key);
  if (this.tree_.eq(this.keys_[pos], key)) {
    return true;
  }
  return this.isLeaf_() ? false : this.children_[pos].containsKey(key);
};
lf.index.BTreeNode_.prototype.remove = function(key, opt_value) {
  this.delete_(key, -1, opt_value);
  if (this.isRoot_()) {
    var root = this;
    if (this.children_.length == 1) {
      root = this.children_[0];
      root.parent_ = null;
    }
    return root;
  }
  return this;
};
lf.index.BTreeNode_.leftMostKey_ = function(node) {
  if (node.isLeaf_()) {
    return node.keys_[0];
  }
  return lf.index.BTreeNode_.leftMostKey_(node.children_[0]);
};
lf.index.BTreeNode_.prototype.fix_ = function() {
  this.keys_ = [];
  for (var i = 1;i < this.children_.length;++i) {
    this.keys_.push(lf.index.BTreeNode_.leftMostKey_(this.children_[i]));
  }
};
lf.index.BTreeNode_.prototype.delete_ = function(key, parentPos, opt_value) {
  var pos = this.searchKey_(key);
  if (!this.isLeaf_()) {
    var index = this.tree_.eq(this.keys_[pos], key) ? pos + 1 : pos;
    if (this.children_[index].delete_(key, index, opt_value)) {
      this.fix_();
    } else {
      return false;
    }
  } else {
    if (!this.tree_.eq(this.keys_[pos], key)) {
      return false;
    }
  }
  if (this.keys_.length > pos && this.tree_.eq(this.keys_[pos], key)) {
    if (goog.isDef(opt_value) && !this.tree_.isUniqueKeyOnly() && this.isLeaf_()) {
      goog.array.binaryRemove((this.values_[pos]), opt_value);
      if (this.values_[pos].length) {
        return false;
      }
    }
    this.keys_.splice(pos, 1);
    if (this.isLeaf_()) {
      this.values_.splice(pos, 1);
    }
  }
  if (this.keys_.length < lf.index.BTreeNode_.MIN_KEY_LEN_ && !this.isRoot_()) {
    if (!this.steal_()) {
      this.merge_(parentPos);
    }
    return true;
  }
  return true;
};
lf.index.BTreeNode_.prototype.steal_ = function() {
  var from = null;
  var fromIndex;
  var fromChildIndex;
  var toIndex;
  if (this.next_ && this.next_.keys_.length > lf.index.BTreeNode_.MIN_KEY_LEN_) {
    from = this.next_;
    fromIndex = 0;
    fromChildIndex = 0;
    toIndex = this.keys_.length + 1;
  } else {
    if (this.prev_ && this.prev_.keys_.length > lf.index.BTreeNode_.MIN_KEY_LEN_) {
      from = this.prev_;
      fromIndex = this.prev_.keys_.length - 1;
      fromChildIndex = this.isLeaf_() ? fromIndex : fromIndex + 1;
      toIndex = 0;
    } else {
      return false;
    }
  }
  this.keys_.splice(toIndex, 0, from.keys_[fromIndex]);
  from.keys_.splice(fromIndex, 1);
  var child = this.isLeaf_() ? this.values_ : this.children_;
  var fromChild = null;
  if (this.isLeaf_()) {
    fromChild = from.values_;
  } else {
    fromChild = from.children_;
    fromChild[fromChildIndex].parent_ = this;
  }
  child.splice(toIndex, 0, fromChild[fromChildIndex]);
  fromChild.splice(fromChildIndex, 1);
  if (!from.isLeaf_()) {
    from.fix_();
    this.fix_();
  }
  return true;
};
lf.index.BTreeNode_.prototype.merge_ = function(parentPos) {
  var mergeTo;
  var keyOffset;
  var childOffset;
  if (this.next_ && this.next_.keys_.length < lf.index.BTreeNode_.MAX_KEY_LEN_) {
    mergeTo = this.next_;
    keyOffset = 0;
    childOffset = 0;
  } else {
    if (this.prev_) {
      mergeTo = this.prev_;
      keyOffset = mergeTo.keys_.length;
      childOffset = mergeTo.isLeaf_() ? mergeTo.values_.length : mergeTo.children_.length;
    }
  }
  var args = [keyOffset, 0].concat(this.keys_);
  Array.prototype.splice.apply(mergeTo.keys_, args);
  var myChildren = null;
  if (this.isLeaf_()) {
    myChildren = this.values_;
  } else {
    myChildren = this.children_;
    myChildren.forEach(function(node) {
      node.parent_ = mergeTo;
    });
  }
  args = [childOffset, 0].concat(myChildren);
  Array.prototype.splice.apply(mergeTo.isLeaf_() ? mergeTo.values_ : mergeTo.children_, args);
  lf.index.BTreeNode_.associate_(this.prev_, this.next_);
  if (!mergeTo.isLeaf_()) {
    mergeTo.fix_();
  }
  if (parentPos != -1) {
    this.parent_.keys_.splice(parentPos, 1);
    this.parent_.children_.splice(parentPos, 1);
  }
};
lf.index.BTreeNode_.prototype.insert = function(key, value, opt_replace) {
  var pos = this.searchKey_(key);
  if (this.isLeaf_()) {
    if (this.tree_.eq(this.keys_[pos], key)) {
      if (opt_replace) {
        this.values_[pos] = this.tree_.isUniqueKeyOnly() ? value : [value];
        return this;
      } else {
        if (this.tree_.isUniqueKeyOnly()) {
          throw new lf.Exception(lf.Exception.Type.CONSTRAINT, "Duplicate key not allowed");
        } else {
          if (this.values_[pos]) {
            goog.array.binaryInsert((this.values_[pos]), value);
            return this;
          } else {
            this.values_[pos] = [value];
          }
        }
      }
    }
    this.keys_.splice(pos, 0, key);
    this.values_.splice(pos, 0, this.tree_.isUniqueKeyOnly() ? value : [value]);
    return this.keys_.length == lf.index.BTreeNode_.MAX_COUNT_ ? this.splitLeaf_() : this;
  } else {
    pos = this.tree_.eq(this.keys_[pos], key) ? pos + 1 : pos;
    var node = this.children_[pos].insert(key, value, opt_replace);
    if (!node.isLeaf_() && node.keys_.length == 1) {
      this.keys_.splice(pos, 0, node.keys_[0]);
      node.children_[1].parent_ = this;
      node.children_[0].parent_ = this;
      this.children_.splice(pos, 1, node.children_[1]);
      this.children_.splice(pos, 0, node.children_[0]);
    }
    return this.keys_.length == lf.index.BTreeNode_.MAX_COUNT_ ? this.splitInternal_() : this;
  }
};
lf.index.BTreeNode_.prototype.splitLeaf_ = function() {
  var half = lf.index.BTreeNode_.MIN_KEY_LEN_;
  var right = lf.index.BTreeNode_.create(this.tree_);
  var root = lf.index.BTreeNode_.create(this.tree_);
  root.height_ = 1;
  root.keys_ = [this.keys_[half]];
  root.children_ = [this, right];
  root.parent_ = this.parent_;
  this.parent_ = root;
  right.keys_ = this.keys_.splice(half);
  right.values_ = this.values_.splice(half);
  right.parent_ = root;
  lf.index.BTreeNode_.associate_(right, this.next_);
  lf.index.BTreeNode_.associate_(this, right);
  return root;
};
lf.index.BTreeNode_.prototype.splitInternal_ = function() {
  var half = lf.index.BTreeNode_.MIN_KEY_LEN_;
  var root = lf.index.BTreeNode_.create(this.tree_);
  var right = lf.index.BTreeNode_.create(this.tree_);
  root.parent_ = this.parent_;
  root.height_ = this.height_ + 1;
  root.keys_ = [this.keys_[half]];
  root.children_ = [this, right];
  this.keys_.splice(half, 1);
  right.parent_ = root;
  right.height_ = this.height_;
  right.keys_ = this.keys_.splice(half);
  right.children_ = this.children_.splice(half + 1);
  right.children_.forEach(function(node) {
    node.parent_ = right;
  });
  this.parent_ = root;
  lf.index.BTreeNode_.associate_(right, this.next_);
  lf.index.BTreeNode_.associate_(this, right);
  return root;
};
lf.index.BTreeNode_.prototype.searchKey_ = function(key) {
  var left = 0;
  var right = this.keys_.length;
  while (left < right) {
    var middle = left + right >> 1;
    if (this.tree_.lt(this.keys_[middle], key)) {
      left = middle + 1;
    } else {
      right = middle;
    }
  }
  return left;
};
lf.index.BTreeNode_.prototype.getContainingLeaf = function(key) {
  if (!this.isLeaf_()) {
    var pos = this.searchKey_(key);
    if (this.tree_.eq(this.keys_[pos], key)) {
      pos++;
    }
    return this.children_[pos].getContainingLeaf(key);
  }
  return this;
};
lf.index.BTreeNode_.prototype.getRange = function(keyRange, results) {
  var start = -1;
  var end = this.keys_.length - 1;
  var c = this.tree_.comparator();
  var scanPos = goog.bind(function(initPos) {
    for (var i = initPos;i < this.keys_.length;++i) {
      var inRange = c.isInRange(this.keys_[i], keyRange);
      if (start != -1) {
        if (!inRange) {
          end = i - 1;
          break;
        }
      } else {
        if (inRange) {
          start = i;
        }
      }
    }
  }, this);
  if (c.isInRange(this.keys_[0], keyRange)) {
    start = 0;
  } else {
    scanPos(1);
  }
  if (start == -1) {
    return 0;
  }
  if (!c.isInRange(this.keys_[end], keyRange)) {
    scanPos(start);
  }
  if (end == this.keys_.length - 1) {
    return this.appendResults_(results, this.values_.slice(start));
  } else {
    if (end >= start) {
      return this.appendResults_(results, this.values_.slice(start, end + 1));
    }
  }
  return 0;
};
lf.index.BTreeNode_.prototype.appendResults_ = function(currentResults, newResults) {
  var toAppend = this.tree_.isUniqueKeyOnly() ? newResults : goog.array.flatten(newResults);
  currentResults.push.apply(currentResults, toAppend);
  return toAppend.length;
};
lf.index.BTreeNode_.serialize = function(start) {
  var rows = [];
  var node = start;
  while (node) {
    var payload = [node.keys_, node.values_];
    rows.push(new lf.Row(node.id_, payload));
    node = node.next_;
  }
  return rows;
};
lf.index.BTreeNode_.deserialize = function(rows, tree) {
  var leaves = rows.map(function(row) {
    var node = new lf.index.BTreeNode_(row.id(), tree);
    node.keys_ = row.payload()[0];
    node.values_ = row.payload()[1];
    return node;
  });
  for (var i = 0;i < leaves.length - 1;++i) {
    lf.index.BTreeNode_.associate_(leaves[i], leaves[i + 1]);
  }
  return leaves.length > 1 ? lf.index.BTreeNode_.createInternals_(leaves[0]) : leaves[0];
};

goog.provide("lf.index.ComparatorFactory");
goog.provide("lf.index.MultiKeyComparator");
goog.provide("lf.index.SimpleComparator");
goog.require("lf.Order");
goog.require("lf.index.Comparator");
goog.require("lf.index.Favor");
goog.require("lf.index.SingleKeyRange");
goog.forwardDeclare("lf.schema.Index");
lf.index.ComparatorFactory.create = function(indexSchema) {
  if (indexSchema.columns.length == 1) {
    return new lf.index.SimpleComparator(indexSchema.columns[0].order);
  }
  var orders = indexSchema.columns.map(function(col) {
    return col.order;
  });
  return new lf.index.MultiKeyComparator(orders);
};
lf.index.SimpleComparator = function(order) {
  lf.index.SimpleComparator.base(this, "constructor");
  this.compare_ = order == lf.Order.DESC ? lf.index.SimpleComparator.compareDescending : lf.index.SimpleComparator.compareAscending;
  this.normalizeKeyRange_ = order == lf.Order.DESC ? function(opt_keyRange) {
    return goog.isDefAndNotNull(opt_keyRange) ? opt_keyRange.reverse() : null;
  } : function(opt_keyRange) {
    return opt_keyRange || null;
  };
  this.orderRange_ = order == lf.Order.DESC ? lf.index.SimpleComparator.orderRangeDescending : lf.index.SimpleComparator.orderRangeAscending;
};
goog.inherits(lf.index.SimpleComparator, lf.index.Comparator);
lf.index.SimpleComparator.compareAscending = function(lhs, rhs) {
  return lhs > rhs ? lf.index.Favor.LHS : lhs < rhs ? lf.index.Favor.RHS : lf.index.Favor.TIE;
};
lf.index.SimpleComparator.compareDescending = function(lhs, rhs) {
  return lf.index.SimpleComparator.compareAscending(rhs, lhs);
};
lf.index.SimpleComparator.orderRangeAscending = function(lhs, rhs) {
  return lf.index.SingleKeyRange.compare(lhs, rhs);
};
lf.index.SimpleComparator.orderRangeDescending = function(lhs, rhs) {
  return lf.index.SingleKeyRange.compare(rhs, lhs);
};
lf.index.SimpleComparator.prototype.compareRange = function(key, naturalRange) {
  var LEFT = 0;
  var RIGHT = 1;
  var range = this.normalizeKeyRange_(naturalRange);
  var results = [goog.isNull(range.from), goog.isNull(range.to)];
  if (!results[LEFT]) {
    var favor = this.compare_(key, range.from);
    results[LEFT] = range.excludeLower ? favor == lf.index.Favor.LHS : favor != lf.index.Favor.RHS;
  }
  if (!results[RIGHT]) {
    var favor = this.compare_(key, range.to);
    results[RIGHT] = range.excludeUpper ? favor == lf.index.Favor.RHS : favor != lf.index.Favor.LHS;
  }
  return results;
};
lf.index.SimpleComparator.prototype.compare = function(lhs, rhs) {
  return this.compare_(lhs, rhs);
};
lf.index.SimpleComparator.prototype.min = function(lhs, rhs) {
  return lhs < rhs ? lf.index.Favor.LHS : lhs == rhs ? lf.index.Favor.TIE : lf.index.Favor.RHS;
};
lf.index.SimpleComparator.prototype.max = function(lhs, rhs) {
  return lhs > rhs ? lf.index.Favor.LHS : lhs == rhs ? lf.index.Favor.TIE : lf.index.Favor.RHS;
};
lf.index.SimpleComparator.prototype.isInRange = function(key, range) {
  var results = this.compareRange(key, range);
  return results[0] && results[1];
};
lf.index.SimpleComparator.prototype.getAllRange = function() {
  return lf.index.SingleKeyRange.all();
};
lf.index.SimpleComparator.prototype.orderKeyRange = function(lhs, rhs) {
  return this.orderRange_(lhs, rhs);
};
lf.index.SimpleComparator.prototype.sortKeyRanges = function(keyRanges) {
  return keyRanges.filter(function(range) {
    return !goog.isNull(range);
  }).sort(goog.bind(function(lhs, rhs) {
    return this.orderRange_(lhs, rhs);
  }, this));
};
lf.index.SimpleComparator.prototype.isLeftOpen = function(range) {
  return goog.isNull(this.normalizeKeyRange_(range).from);
};
lf.index.SimpleComparator.prototype.rangeToKeys = function(naturalRange) {
  var range = this.normalizeKeyRange_(naturalRange);
  return [range.from, range.to];
};
lf.index.SimpleComparator.prototype.toString = function() {
  return this.compare_ == lf.index.SimpleComparator.compareDescending ? "SimpleComparator_DESC" : "SimpleComparator_ASC";
};
lf.index.MultiKeyComparator = function(orders) {
  lf.index.MultiKeyComparator.base(this, "constructor");
  this.comparators_ = orders.map(function(order) {
    return new lf.index.SimpleComparator(order);
  });
};
goog.inherits(lf.index.MultiKeyComparator, lf.index.Comparator);
lf.index.MultiKeyComparator.createOrders = function(numKeys, order) {
  var orders = new Array(numKeys);
  for (var i = 0;i < numKeys;++i) {
    orders[i] = order;
  }
  return orders;
};
lf.index.MultiKeyComparator.prototype.forEach_ = function(lhs, rhs, fn) {
  var favor = lf.index.Favor.TIE;
  for (var i = 0;i < this.comparators_.length && favor == lf.index.Favor.TIE;++i) {
    favor = fn(this.comparators_[i], lhs[i], rhs[i]);
  }
  return favor;
};
lf.index.MultiKeyComparator.prototype.compare = function(lhs, rhs) {
  return this.forEach_(lhs, rhs, function(c, l, r) {
    return c.compare(l, r);
  });
};
lf.index.MultiKeyComparator.prototype.min = function(lhs, rhs) {
  return this.forEach_(lhs, rhs, function(c, l, r) {
    return c.min(l, r);
  });
};
lf.index.MultiKeyComparator.prototype.max = function(lhs, rhs) {
  return this.forEach_(lhs, rhs, function(c, l, r) {
    return c.max(l, r);
  });
};
lf.index.MultiKeyComparator.prototype.compareRange = function(key, range) {
  var results = [true, true];
  for (var i = 0;i < this.comparators_.length && (results[0] || results[1]);++i) {
    var dimensionResults = this.comparators_[i].compareRange(key[i], range[i]);
    results[0] = results[0] && dimensionResults[0];
    results[1] = results[1] && dimensionResults[1];
  }
  return results;
};
lf.index.MultiKeyComparator.prototype.isInRange = function(key, range) {
  var isInRange = true;
  for (var i = 0;i < this.comparators_.length && isInRange;++i) {
    isInRange = this.comparators_[i].isInRange(key[i], range[i]);
  }
  return isInRange;
};
lf.index.MultiKeyComparator.prototype.getAllRange = function() {
  return this.comparators_.map(function(c) {
    return c.getAllRange();
  });
};
lf.index.MultiKeyComparator.prototype.sortKeyRanges = function(keyRanges) {
  var outputKeyRanges = keyRanges.filter(function(range) {
    return range.every(goog.isDefAndNotNull);
  });
  var keysPerDimensions = new Array(this.comparators_.length);
  for (var i = 0;i < keysPerDimensions.length;i++) {
    keysPerDimensions[i] = outputKeyRanges.map(function(range) {
      return range[i];
    });
  }
  keysPerDimensions.forEach(function(keys, i) {
    keys.sort(goog.bind(function(lhs, rhs) {
      return this.comparators_[i].orderKeyRange(lhs, rhs);
    }, this));
  }, this);
  var finalKeyRanges = new Array(outputKeyRanges.length);
  for (var i = 0;i < finalKeyRanges.length;i++) {
    finalKeyRanges[i] = keysPerDimensions.map(function(keys) {
      return keys[i];
    });
  }
  return finalKeyRanges.sort(goog.bind(function(lhs, rhs) {
    var favor = lf.index.Favor.TIE;
    for (var i = 0;i < this.comparators_.length && favor == lf.index.Favor.TIE;++i) {
      favor = this.comparators_[i].orderKeyRange(lhs[i], rhs[i]);
    }
    return favor;
  }, this));
};
lf.index.MultiKeyComparator.prototype.isLeftOpen = function(range) {
  return this.comparators_[0].isLeftOpen(range[0]);
};
lf.index.MultiKeyComparator.prototype.rangeToKeys = function(keyRange) {
  var startKey = keyRange.map(function(range, i) {
    return this.comparators_[i].rangeToKeys(range)[0];
  }, this);
  var endKey = keyRange.map(function(range, i) {
    return this.comparators_[i].rangeToKeys(range)[1];
  }, this);
  return [startKey, endKey];
};

goog.provide("lf.index");
lf.index.hashCode = function(value) {
  var hash = 0;
  for (var i = 0;i < value.length;++i) {
    hash = (hash << 5) - hash + value.charCodeAt(i);
    hash = hash & hash;
  }
  return hash;
};
lf.index.hashArray = function(values) {
  var keys = values.map(function(value) {
    return goog.isDefAndNotNull(value) ? lf.index.hashCode(value.toString()).toString(32) : "";
  });
  return keys.join("_");
};
lf.index.slice = function(rawArray, opt_reverseOrder, opt_limit, opt_skip) {
  var array = opt_reverseOrder ? rawArray.reverse() : rawArray;
  if (!goog.isDefAndNotNull(opt_limit) && !goog.isDefAndNotNull(opt_skip)) {
    return array;
  }
  var limit = Math.min(goog.isDef(opt_limit) ? opt_limit : array.length, array.length);
  if (limit == 0) {
    return [];
  }
  var skip = Math.min(opt_skip || 0, array.length);
  return array.slice(skip, skip + limit);
};

goog.provide("lf.index.Comparator");
goog.provide("lf.index.Favor");
goog.provide("lf.index.Index");
goog.forwardDeclare("lf.Order");
goog.forwardDeclare("lf.Row");
goog.forwardDeclare("lf.index.SingleKeyRange");
lf.index.Favor = {RHS:-1, TIE:0, LHS:1};
lf.index.Comparator = function() {
};
lf.index.Comparator.prototype.compare;
lf.index.Comparator.prototype.compareRange;
lf.index.Comparator.prototype.min;
lf.index.Comparator.prototype.max;
lf.index.Comparator.prototype.isInRange;
lf.index.Comparator.prototype.getAllRange;
lf.index.Comparator.prototype.sortKeyRanges;
lf.index.Comparator.prototype.isLeftOpen;
lf.index.Comparator.prototype.rangeToKeys;
lf.index.Index = function() {
};
lf.index.Index.SingleKey;
lf.index.Index.Key;
lf.index.Index.prototype.getName;
lf.index.Index.prototype.add;
lf.index.Index.prototype.set;
lf.index.Index.prototype.remove;
lf.index.Index.prototype.get;
lf.index.Index.prototype.cost;
lf.index.Index.prototype.getRange;
lf.index.Index.prototype.clear;
lf.index.Index.prototype.containsKey;
lf.index.Index.prototype.min;
lf.index.Index.prototype.max;
lf.index.Index.prototype.serialize;
lf.index.Index.prototype.comparator;

goog.provide("lf.index.IndexMetadata");
goog.provide("lf.index.IndexMetadataRow");
goog.require("lf.Row");
lf.index.IndexMetadata = function(type) {
  this.type = type;
};
lf.index.IndexMetadata.Type = {ROW_ID:"rowid", BTREE:"btree"};
lf.index.IndexMetadataRow = function(payload) {
  lf.index.IndexMetadataRow.base(this, "constructor", lf.index.IndexMetadataRow.ROW_ID, payload);
};
goog.inherits(lf.index.IndexMetadataRow, lf.Row);
lf.index.IndexMetadataRow.ROW_ID = -1;
lf.index.IndexMetadataRow.forType = function(indexType) {
  var indexMetadata = new lf.index.IndexMetadata(indexType);
  return new lf.index.IndexMetadataRow(indexMetadata);
};

goog.provide("lf.index.IndexStore");
lf.index.IndexStore = function() {
};
lf.index.IndexStore.prototype.init;
lf.index.IndexStore.prototype.get;
lf.index.IndexStore.prototype.getTableIndices;
lf.index.IndexStore.prototype.set;

goog.provide("lf.index.KeyRange");
goog.provide("lf.index.SingleKeyRange");
goog.require("lf.index.Favor");
goog.forwardDeclare("lf.index.Index.SingleKey");
lf.index.SingleKeyRange = function(from, to, excludeLower, excludeUpper) {
  this.from = from;
  this.to = to;
  this.excludeLower = !goog.isNull(this.from) ? excludeLower : false;
  this.excludeUpper = !goog.isNull(this.to) ? excludeUpper : false;
};
lf.index.KeyRange;
lf.index.SingleKeyRange.prototype.toString = function() {
  return (this.excludeLower ? "(" : "[") + (goog.isNull(this.from) ? "unbound" : this.from) + ", " + (goog.isNull(this.to) ? "unbound" : this.to) + (this.excludeUpper ? ")" : "]");
};
lf.index.SingleKeyRange.prototype.complement = function() {
  if (goog.isNull(this.from) && goog.isNull(this.to)) {
    return [];
  }
  var keyRangeLow = null;
  var keyRangeHigh = null;
  if (!goog.isNull(this.from)) {
    keyRangeLow = new lf.index.SingleKeyRange(null, this.from, false, !this.excludeLower);
  }
  if (!goog.isNull(this.to)) {
    keyRangeHigh = new lf.index.SingleKeyRange(this.to, null, !this.excludeUpper, false);
  }
  return [keyRangeLow, keyRangeHigh].filter(function(keyRange) {
    return !goog.isNull(keyRange);
  });
};
lf.index.SingleKeyRange.prototype.reverse = function() {
  return new lf.index.SingleKeyRange(this.to, this.from, this.excludeUpper, this.excludeLower);
};
lf.index.SingleKeyRange.prototype.overlaps = function(range) {
  var favor = lf.index.SingleKeyRange.compareKey_(this.from, range.from, true, this.excludeLower, range.excludeLower);
  if (favor == lf.index.Favor.TIE) {
    return true;
  }
  var left = favor == lf.index.Favor.RHS ? this : range;
  var right = favor == lf.index.Favor.LHS ? this : range;
  return goog.isNull(left.to) || left.to > right.from || left.to == right.from && !left.excludeUpper && !right.excludeLower;
};
lf.index.SingleKeyRange.upperBound = function(key, opt_shouldExclude) {
  return new lf.index.SingleKeyRange(null, key, false, opt_shouldExclude || false);
};
lf.index.SingleKeyRange.lowerBound = function(key, opt_shouldExclude) {
  return new lf.index.SingleKeyRange(key, null, opt_shouldExclude || false, false);
};
lf.index.SingleKeyRange.only = function(key) {
  return new lf.index.SingleKeyRange(key, key, false, false);
};
lf.index.SingleKeyRange.all = function() {
  return new lf.index.SingleKeyRange(null, null, false, false);
};
lf.index.SingleKeyRange.prototype.isAll = function() {
  return goog.isNull(this.from) && goog.isNull(this.to);
};
lf.index.SingleKeyRange.prototype.contains = function(key) {
  var left = goog.isNull(this.from) || key > this.from || key == this.from && !this.excludeLower;
  var right = goog.isNull(this.to) || key < this.to || key == this.to && !this.excludeUpper;
  return left && right;
};
lf.index.SingleKeyRange.prototype.getBounded = function(min, max) {
  if (goog.isNull(this.from) && !this.contains(min) || goog.isNull(this.to) && !this.contains(max)) {
    return null;
  }
  var range = new lf.index.SingleKeyRange(min, max, false, false);
  if (!goog.isNull(this.from) && this.from >= min) {
    range.from = this.from;
    range.excludeLower = this.excludeLower;
  }
  if (!goog.isNull(this.to) && this.to <= max) {
    range.to = this.to;
    range.excludeUpper = this.excludeUpper;
  }
  if (range.from > range.to || range.from == range.to && (range.excludeUpper || range.excludeLower)) {
    return null;
  }
  return range;
};
lf.index.SingleKeyRange.prototype.equals = function(range) {
  return this.from == range.from && this.excludeLower == range.excludeLower && this.to == range.to && this.excludeUpper == range.excludeUpper;
};
lf.index.SingleKeyRange.xor = function(a, b) {
  return a ? !b : b;
};
lf.index.SingleKeyRange.compareKey_ = function(l, r, isLeftHandSide, opt_excludeL, opt_excludeR) {
  var Favor = lf.index.Favor;
  var excludeL = opt_excludeL || false;
  var excludeR = opt_excludeR || false;
  var flip = function(favor) {
    return isLeftHandSide ? favor : favor == Favor.LHS ? Favor.RHS : Favor.LHS;
  };
  var tieLogic = function() {
    return !lf.index.SingleKeyRange.xor(excludeL, excludeR) ? Favor.TIE : excludeL ? flip(Favor.LHS) : flip(Favor.RHS);
  };
  if (goog.isNull(l)) {
    return !goog.isNull(r) ? flip(Favor.RHS) : tieLogic();
  }
  return goog.isNull(r) ? flip(Favor.LHS) : l < r ? Favor.RHS : l == r ? tieLogic() : Favor.LHS;
};
lf.index.SingleKeyRange.compare = function(lhs, rhs) {
  var result = lf.index.SingleKeyRange.compareKey_(lhs.from, rhs.from, true, lhs.excludeLower, rhs.excludeLower);
  if (result == lf.index.Favor.TIE) {
    result = lf.index.SingleKeyRange.compareKey_(lhs.to, rhs.to, false, lhs.excludeUpper, rhs.excludeUpper);
  }
  return result;
};
lf.index.SingleKeyRange.getBoundingRange = function(r1, r2) {
  var r = lf.index.SingleKeyRange.all();
  if (!goog.isNull(r1.from) && !goog.isNull(r2.from)) {
    var favor = lf.index.SingleKeyRange.compareKey_(r1.from, r2.from, true);
    if (favor != lf.index.Favor.LHS) {
      r.from = r1.from;
      r.excludeLower = favor != lf.index.Favor.TIE ? r1.excludeLower : r1.excludeLower && r2.excludeLower;
    } else {
      r.from = r2.from;
      r.excludeLower = r2.excludeLower;
    }
  }
  if (!goog.isNull(r1.to) && !goog.isNull(r2.to)) {
    var favor = lf.index.SingleKeyRange.compareKey_(r1.to, r2.to, false);
    if (favor != lf.index.Favor.RHS) {
      r.to = r1.to;
      r.excludeUpper = favor != lf.index.Favor.TIE ? r1.excludeUpper : r1.excludeUpper && r2.excludeUpper;
    } else {
      r.to = r2.to;
      r.excludeUpper = r2.excludeUpper;
    }
  }
  return r;
};
lf.index.SingleKeyRange.and = function(r1, r2) {
  if (!r1.overlaps(r2)) {
    return null;
  }
  var r = lf.index.SingleKeyRange.all();
  var favor = lf.index.SingleKeyRange.compareKey_(r1.from, r2.from, true);
  var left = favor == lf.index.Favor.TIE ? r1.excludeLower ? r1 : r2 : favor != lf.index.Favor.RHS ? r1 : r2;
  r.from = left.from;
  r.excludeLower = left.excludeLower;
  var right;
  if (goog.isNull(r1.to) || goog.isNull(r2.to)) {
    right = goog.isNull(r1.to) ? r2 : r1;
  } else {
    favor = lf.index.SingleKeyRange.compareKey_(r1.to, r2.to, false);
    right = favor == lf.index.Favor.TIE ? r1.excludeUpper ? r1 : r2 : favor == lf.index.Favor.RHS ? r1 : r2;
  }
  r.to = right.to;
  r.excludeUpper = right.excludeUpper;
  return r;
};

goog.provide("lf.index.MemoryIndexStore");
goog.require("goog.Promise");
goog.require("goog.structs.Map");
goog.require("lf.index.BTree");
goog.require("lf.index.ComparatorFactory");
goog.require("lf.index.IndexStore");
goog.require("lf.index.NullableIndex");
goog.require("lf.index.RowId");
lf.index.MemoryIndexStore = function() {
  this.store_ = new goog.structs.Map;
};
lf.index.MemoryIndexStore.prototype.init = function(schema) {
  var tables = schema.tables();
  tables.forEach(function(table) {
    var rowIdIndexName = table.getRowIdIndexName();
    var rowIdIndex = this.get(rowIdIndexName);
    if (goog.isNull(rowIdIndex)) {
      var index = new lf.index.RowId(rowIdIndexName);
      this.store_.set(rowIdIndexName, index);
    }
    table.getIndices().forEach(function(indexSchema) {
      this.store_.set(indexSchema.getNormalizedName(), lf.index.MemoryIndexStore.createIndex_(indexSchema));
    }, this);
  }, this);
  return goog.Promise.resolve();
};
lf.index.MemoryIndexStore.createIndex_ = function(indexSchema) {
  var comparator = lf.index.ComparatorFactory.create(indexSchema);
  var index = new lf.index.BTree(indexSchema.getNormalizedName(), comparator, indexSchema.isUnique);
  return indexSchema.hasNullableColumn() ? new lf.index.NullableIndex(index) : index;
};
lf.index.MemoryIndexStore.prototype.get = function(name) {
  return this.store_.get(name, null);
};
lf.index.MemoryIndexStore.prototype.set = function(index) {
  return this.store_.set(index.getName(), index);
};
lf.index.MemoryIndexStore.prototype.getTableIndices = function(tableName) {
  var indices = [];
  var prefix = tableName + ".";
  this.store_.getKeys().forEach(function(key) {
    if (key.indexOf(prefix) == 0) {
      indices.push(this.store_.get(key));
    }
  }, this);
  return indices;
};

goog.provide("lf.index.NullableIndex");
goog.require("goog.structs.Set");
goog.require("lf.Exception");
goog.require("lf.Row");
goog.require("lf.index.Index");
lf.index.NullableIndex = function(index) {
  this.index_ = index;
  this.nulls_ = new goog.structs.Set;
};
lf.index.NullableIndex.prototype.getName = function() {
  return this.index_.getName();
};
lf.index.NullableIndex.prototype.add = function(key, value) {
  if (goog.isNull(key)) {
    this.nulls_.add(value);
  } else {
    this.index_.add(key, value);
  }
};
lf.index.NullableIndex.prototype.set = function(key, value) {
  if (goog.isNull(key)) {
    this.nulls_.clear();
    this.nulls_.add(value);
  } else {
    this.index_.set(key, value);
  }
};
lf.index.NullableIndex.prototype.remove = function(key, opt_rowId) {
  if (goog.isNull(key)) {
    if (opt_rowId) {
      this.nulls_.remove(opt_rowId);
    } else {
      this.nulls_.clear();
    }
  } else {
    this.index_.remove(key, opt_rowId);
  }
};
lf.index.NullableIndex.prototype.get = function(key) {
  if (goog.isNull(key)) {
    return this.nulls_.getValues();
  } else {
    return this.index_.get(key);
  }
};
lf.index.NullableIndex.prototype.cost = function(opt_keyRange) {
  return this.index_.cost(opt_keyRange);
};
lf.index.NullableIndex.prototype.getRange = function(opt_keyRanges, opt_reverseOrder, opt_limit, opt_skip) {
  var results = this.index_.getRange(opt_keyRanges, opt_reverseOrder, opt_limit, opt_skip);
  if (goog.isDefAndNotNull(opt_keyRanges)) {
    return results;
  }
  return results.concat(this.nulls_.getValues());
};
lf.index.NullableIndex.prototype.clear = function() {
  this.nulls_.clear();
  this.index_.clear();
};
lf.index.NullableIndex.prototype.containsKey = function(key) {
  return goog.isNull(key) ? !this.nulls_.isEmpty() : this.index_.containsKey(key);
};
lf.index.NullableIndex.prototype.min = function() {
  return this.index_.min();
};
lf.index.NullableIndex.prototype.max = function() {
  return this.index_.max();
};
lf.index.NullableIndex.NULL_ROW_ID_ = -2;
lf.index.NullableIndex.prototype.serialize = function() {
  var rows = [new lf.Row(lf.index.NullableIndex.NULL_ROW_ID_, this.nulls_.getValues())];
  return rows.concat(this.index_.serialize());
};
lf.index.NullableIndex.prototype.comparator = function() {
  return this.index_.comparator();
};
lf.index.NullableIndex.deserialize = function(deserializeFn, rows) {
  var index = -1;
  for (var i = 0;i < rows.length;++i) {
    if (rows[i].id() == lf.index.NullableIndex.NULL_ROW_ID_) {
      index = i;
      break;
    }
  }
  if (index == -1) {
    throw new lf.Exception(lf.Exception.Type.DATA, "Data corruption detected");
  }
  var nulls = rows[index].payload();
  var newRows = rows.slice(0);
  newRows.splice(index, 1);
  var tree = deserializeFn(newRows);
  var nullableIndex = new lf.index.NullableIndex(tree);
  nullableIndex.nulls_.addAll(nulls);
  return nullableIndex;
};

goog.provide("lf.index.RowId");
goog.require("goog.structs.Set");
goog.require("lf.Exception");
goog.require("lf.Order");
goog.require("lf.Row");
goog.require("lf.index");
goog.require("lf.index.Favor");
goog.require("lf.index.Index");
goog.require("lf.index.SimpleComparator");
goog.require("lf.index.SingleKeyRange");
lf.index.RowId = function(name) {
  this.name_ = name;
  this.rows_ = new goog.structs.Set;
  this.comparator_ = new lf.index.SimpleComparator(lf.Order.ASC);
};
lf.index.RowId.ROW_ID = 0;
lf.index.RowId.prototype.getName = function() {
  return this.name_;
};
lf.index.RowId.prototype.add = function(key, value) {
  if (typeof key != "number") {
    throw new lf.Exception(lf.Exception.Type.DATA, "Row id must be numbers");
  }
  this.rows_.add(key);
};
lf.index.RowId.prototype.set = function(key, value) {
  this.add(key, value);
};
lf.index.RowId.prototype.remove = function(key, rowId) {
  this.rows_.remove((key));
};
lf.index.RowId.prototype.get = function(key) {
  return this.containsKey(key) ? [key] : [];
};
lf.index.RowId.prototype.min = function() {
  return this.minMax_(goog.bind(this.comparator_.min, this.comparator_));
};
lf.index.RowId.prototype.max = function() {
  return this.minMax_(goog.bind(this.comparator_.max, this.comparator_));
};
lf.index.RowId.prototype.minMax_ = function(compareFn) {
  if (this.rows_.isEmpty()) {
    return [null, null];
  }
  var key = this.rows_.getValues().reduce(goog.bind(function(keySoFar, key) {
    return goog.isNull(keySoFar) || compareFn(key, keySoFar) == lf.index.Favor.LHS ? key : keySoFar;
  }, this), null);
  return [key, [key]];
};
lf.index.RowId.prototype.cost = function(opt_keyRange) {
  return this.rows_.getCount();
};
lf.index.RowId.prototype.getRange = function(opt_keyRanges, opt_reverseOrder, opt_limit, opt_skip) {
  var keyRanges = opt_keyRanges || [lf.index.SingleKeyRange.all()];
  var values = this.rows_.getValues().filter(function(value) {
    return keyRanges.some(function(range) {
      return this.comparator_.isInRange(value, range);
    }, this);
  }, this);
  return lf.index.slice(values, opt_reverseOrder, opt_limit, opt_skip);
};
lf.index.RowId.prototype.clear = function() {
  this.rows_.clear();
};
lf.index.RowId.prototype.containsKey = function(key) {
  return this.rows_.contains((key));
};
lf.index.RowId.prototype.serialize = function() {
  return [new lf.Row(lf.index.RowId.ROW_ID, this.rows_.getValues())];
};
lf.index.RowId.prototype.comparator = function() {
  return this.comparator_;
};
lf.index.RowId.deserialize = function(name, rows) {
  var index = new lf.index.RowId(name);
  var rowIds = rows[0].payload();
  rowIds.forEach(function(rowId) {
    index.add(rowId, rowId);
  });
  return index;
};

goog.provide("lf.index.SingleKeyRangeSet");
goog.require("lf.index.SingleKeyRange");
lf.index.SingleKeyRangeSet = function(opt_ranges) {
  this.ranges_ = [];
  if (goog.isDef(opt_ranges)) {
    this.add(opt_ranges);
  }
};
lf.index.SingleKeyRangeSet.prototype.toString = function() {
  return this.ranges_.map(function(r) {
    return r.toString();
  }).join(",");
};
lf.index.SingleKeyRangeSet.prototype.containsKey = function(key) {
  return this.ranges_.some(function(r) {
    return r.contains(key);
  });
};
lf.index.SingleKeyRangeSet.prototype.getValues = function() {
  return this.ranges_;
};
lf.index.SingleKeyRangeSet.prototype.add = function(keyRanges) {
  if (keyRanges.length == 0) {
    return;
  }
  var ranges = this.ranges_.concat(keyRanges);
  if (ranges.length == 1) {
    this.ranges_ = ranges;
    return;
  }
  ranges.sort(lf.index.SingleKeyRange.compare);
  var results = [];
  var start = ranges[0];
  for (var i = 1;i < ranges.length;++i) {
    if (start.overlaps(ranges[i])) {
      start = lf.index.SingleKeyRange.getBoundingRange(start, ranges[i]);
    } else {
      results.push(start);
      start = ranges[i];
    }
  }
  results.push(start);
  this.ranges_ = results;
};
lf.index.SingleKeyRangeSet.prototype.equals = function(set) {
  if (this.ranges_.length == set.ranges_.length) {
    return this.ranges_.length == 0 || this.ranges_.every(function(r, index) {
      return r.equals(set.ranges_[index]);
    });
  }
  return false;
};
lf.index.SingleKeyRangeSet.prototype.getBoundingRange = function() {
  if (this.ranges_.length <= 1) {
    return this.ranges_.length == 0 ? null : this.ranges_[0];
  }
  var last = this.ranges_.length - 1;
  return lf.index.SingleKeyRange.getBoundingRange(this.ranges_[0], this.ranges_[last]);
};
lf.index.SingleKeyRangeSet.intersect = function(s0, s1) {
  var ranges = s0.getValues().map(function(r0) {
    return s1.getValues().map(function(r1) {
      return lf.index.SingleKeyRange.and(r0, r1);
    });
  });
  var results = [];
  ranges.forEach(function(dimension) {
    results = results.concat(dimension);
  });
  return new lf.index.SingleKeyRangeSet(results.filter(function(r) {
    return !goog.isNull(r);
  }));
};

goog.provide("lf.cache.Cache");
goog.forwardDeclare("lf.Row");
lf.cache.Cache = function() {
};
lf.cache.Cache.prototype.set;
lf.cache.Cache.prototype.get;
lf.cache.Cache.prototype.getRange;
lf.cache.Cache.prototype.remove;
lf.cache.Cache.prototype.getCount;

goog.provide("lf.cache.ConstraintChecker");
goog.require("goog.structs.Set");
goog.require("lf.Exception");
goog.require("lf.service");
lf.cache.ConstraintChecker = function(global) {
  this.indexStore_ = global.getService(lf.service.INDEX_STORE);
};
lf.cache.ConstraintChecker.prototype.findExistingRowIdInPkIndex = function(table, row) {
  var pkIndexSchema = table.getConstraint().getPrimaryKey();
  if (goog.isNull(pkIndexSchema)) {
    return null;
  }
  return this.findExistingRowIdInIndex_(pkIndexSchema, row);
};
lf.cache.ConstraintChecker.prototype.findExistingRowIdInIndex_ = function(indexSchema, row) {
  var indexName = indexSchema.getNormalizedName();
  var indexKey = row.keyOfIndex(indexName);
  var index = this.indexStore_.get(indexName);
  var rowIds = index.get((indexKey));
  return rowIds.length == 0 ? null : rowIds[0];
};
lf.cache.ConstraintChecker.prototype.checkNotNullable = function(table, rows) {
  var notNullable = table.getConstraint().getNotNullable();
  rows.forEach(function(row) {
    notNullable.forEach(function(column) {
      if (goog.isNull(row.payload()[column.getName()])) {
        throw new lf.Exception(lf.Exception.Type.CONSTRAINT, "Attempted to insert NULL value to non-nullable field " + column.getNormalizedName());
      }
    }, this);
  }, this);
};

goog.provide("lf.cache.DefaultCache");
goog.require("goog.asserts");
goog.require("goog.structs.Map");
goog.require("goog.structs.Set");
goog.require("lf.cache.Cache");
lf.cache.DefaultCache = function(opt_maxRows) {
  this.map_ = new goog.structs.Map;
  this.tableRows_ = new goog.structs.Map;
  this.limit_ = opt_maxRows || Number.MAX_VALUE;
};
lf.cache.DefaultCache.prototype.getTableSet_ = function(tableName) {
  var set = this.tableRows_.get(tableName, null);
  if (goog.isNull(set)) {
    set = new goog.structs.Set;
    this.tableRows_.set(tableName, set);
  }
  return set;
};
lf.cache.DefaultCache.prototype.set = function(tableName, rows) {
  var tableSet = this.getTableSet_(tableName);
  rows.forEach(goog.bind(function(row) {
    this.map_.set(row.id(), row);
    tableSet.add(row.id());
  }, this));
  if (this.map_.getCount() > this.limit_) {
  }
};
lf.cache.DefaultCache.prototype.get = function(ids) {
  return ids.map(goog.bind(function(id) {
    return this.map_.get(id, null);
  }, this));
};
lf.cache.DefaultCache.prototype.getRange = function(tableName, fromId, toId) {
  var data = [];
  var min = Math.min(fromId, toId);
  var max = Math.max(fromId, toId);
  var tableSet = this.getTableSet_(tableName);
  if (tableSet.getCount() < max - min) {
    tableSet.getValues().forEach(function(key) {
      if (key >= min && key <= max) {
        var value = this.map_.get(key);
        goog.asserts.assert(goog.isDefAndNotNull(value), "Inconsistent cache");
        data.push(value);
      }
    }, this);
  } else {
    for (var i = min;i <= max;++i) {
      if (!tableSet.contains(i)) {
        continue;
      }
      var value = this.map_.get(i);
      goog.asserts.assert(goog.isDefAndNotNull(value), "Inconsistent cache");
      data.push(value);
    }
  }
  return data;
};
lf.cache.DefaultCache.prototype.remove = function(tableName, ids) {
  var tableSet = this.getTableSet_(tableName);
  ids.forEach(function(id) {
    this.map_.remove(id);
    tableSet.remove(id);
  }, this);
};
lf.cache.DefaultCache.prototype.getCount = function(opt_tableName) {
  return goog.isDefAndNotNull(opt_tableName) ? this.getTableSet_(opt_tableName).getCount() : this.map_.getCount();
};

goog.provide("lf.cache.InMemoryUpdater");
goog.require("lf.index.Favor");
goog.require("lf.service");
lf.cache.InMemoryUpdater = function(global) {
  this.cache_ = global.getService(lf.service.CACHE);
  this.indexStore_ = global.getService(lf.service.INDEX_STORE);
  this.schema_ = global.getService(lf.service.SCHEMA);
};
lf.cache.InMemoryUpdater.prototype.update = function(tableDiffs) {
  tableDiffs.forEach(function(tableDiff) {
    this.updateIndicesForDiff_(tableDiff);
    this.updateCacheForDiff_(tableDiff);
  }, this);
};
lf.cache.InMemoryUpdater.prototype.updateCacheForDiff_ = function(diff) {
  var tableName = diff.getName();
  diff.getDeleted().getValues().forEach(function(row) {
    this.cache_.remove(tableName, [row.id()]);
  }, this);
  diff.getAdded().forEach(function(row, rowId) {
    this.cache_.set(tableName, [row]);
  }, this);
  diff.getModified().forEach(function(modification, rowId) {
    this.cache_.set(tableName, [modification[1]]);
  }, this);
};
lf.cache.InMemoryUpdater.prototype.updateIndicesForDiff_ = function(diff) {
  var table = this.schema_.table(diff.getName());
  var modifications = diff.getAsModifications();
  modifications.forEach(function(modification) {
    this.updateTableIndicesForRow(table, modification);
  }, this);
};
lf.cache.InMemoryUpdater.prototype.updateTableIndicesForRow = function(table, modification) {
  var indices = table.getIndices().map(function(indexSchema) {
    return this.indexStore_.get(indexSchema.getNormalizedName());
  }, this).concat([this.indexStore_.get(table.getRowIdIndexName())]);
  indices.forEach(function(index) {
    var keyNow = goog.isNull(modification[1]) ? null : modification[1].keyOfIndex(index.getName());
    var keyThen = goog.isNull(modification[0]) ? null : modification[0].keyOfIndex(index.getName());
    if (goog.isNull(keyThen) && !goog.isNull(keyNow)) {
      index.add(keyNow, modification[1].id());
    } else {
      if (!goog.isNull(keyThen) && !goog.isNull(keyNow)) {
        if (index.comparator().compare(keyThen, keyNow) == lf.index.Favor.TIE) {
          return;
        }
        index.add(keyNow, modification[1].id());
        index.remove(keyThen, modification[0].id());
      } else {
        if (!goog.isNull(keyThen) && goog.isNull(keyNow)) {
          index.remove(keyThen, modification[0].id());
        }
      }
    }
  });
};

goog.provide("lf.cache.Journal");
goog.require("goog.asserts");
goog.require("goog.structs.Map");
goog.require("goog.structs.Set");
goog.require("lf.Exception");
goog.require("lf.cache.ConstraintChecker");
goog.require("lf.cache.InMemoryUpdater");
goog.require("lf.cache.TableDiff");
goog.require("lf.service");
goog.forwardDeclare("lf.cache.Cache");
goog.forwardDeclare("lf.index.Index");
goog.forwardDeclare("lf.index.IndexStore");
goog.forwardDeclare("lf.schema.Index");
lf.cache.Journal = function(global, scope) {
  this.scope_ = new goog.structs.Map;
  scope.forEach(function(tableSchema) {
    this.scope_.set(tableSchema.getName(), tableSchema);
  }, this);
  this.cache_ = global.getService(lf.service.CACHE);
  this.indexStore_ = global.getService(lf.service.INDEX_STORE);
  this.contstraintChecker_ = new lf.cache.ConstraintChecker(global);
  this.inMemoryUpdater_ = new lf.cache.InMemoryUpdater(global);
  this.terminated_ = false;
  this.pendingRollback_ = false;
  this.tableDiffs_ = new goog.structs.Map;
};
lf.cache.Journal.prototype.getDiff = function() {
  return this.tableDiffs_;
};
lf.cache.Journal.prototype.getIndexDiff = function() {
  var tableSchemas = this.tableDiffs_.getKeys().map(function(tableName) {
    return this.scope_.get(tableName);
  }, this);
  var indices = [];
  tableSchemas.forEach(function(tableSchema) {
    if (tableSchema.persistentIndex()) {
      var tableIndices = tableSchema.getIndices();
      tableIndices.forEach(function(indexSchema) {
        indices.push(this.indexStore_.get(indexSchema.getNormalizedName()));
      }, this);
      indices.push(this.indexStore_.get(tableSchema.getName() + ".#"));
    }
  }, this);
  return indices;
};
lf.cache.Journal.prototype.getScope = function() {
  return this.scope_;
};
lf.cache.Journal.prototype.getIndexScope = function() {
  var indexScope = [];
  var tables = this.scope_.getValues();
  tables.forEach(function(tableSchema) {
    if (tableSchema.persistentIndex()) {
      var tableIndices = tableSchema.getIndices();
      tableIndices.forEach(function(indexSchema) {
        indexScope.push(indexSchema.getNormalizedName());
      });
      indexScope.push(tableSchema.getName() + ".#");
    }
  });
  return indexScope;
};
lf.cache.Journal.prototype.insert = function(table, rows) {
  this.assertJournalWritable_();
  this.checkScope_(table);
  this.contstraintChecker_.checkNotNullable(table, rows);
  for (var i = 0;i < rows.length;i++) {
    this.modifyRow_(table, null, rows[i]);
  }
};
lf.cache.Journal.prototype.modifyRow_ = function(table, rowBefore, rowNow) {
  var tableName = table.getName();
  var diff = this.tableDiffs_.get(tableName, null) || new lf.cache.TableDiff(tableName);
  this.tableDiffs_.set(tableName, diff);
  var modification = [rowBefore, rowNow];
  try {
    this.inMemoryUpdater_.updateTableIndicesForRow(table, modification);
  } catch (e) {
    this.pendingRollback_ = true;
    throw e;
  }
  if (goog.isNull(rowBefore) && !goog.isNull(rowNow)) {
    this.cache_.set(tableName, [rowNow]);
    diff.add(rowNow);
  } else {
    if (!goog.isNull(rowBefore) && !goog.isNull(rowNow)) {
      this.cache_.set(tableName, [rowNow]);
      diff.modify(modification);
    } else {
      if (!goog.isNull(rowBefore) && goog.isNull(rowNow)) {
        this.cache_.remove(tableName, [rowBefore.id()]);
        diff.delete(rowBefore);
      }
    }
  }
};
lf.cache.Journal.prototype.update = function(table, rows) {
  this.assertJournalWritable_();
  this.checkScope_(table);
  this.contstraintChecker_.checkNotNullable(table, rows);
  for (var i = 0;i < rows.length;i++) {
    var row = rows[i];
    var rowBefore = (this.cache_.get([row.id()])[0]);
    this.modifyRow_(table, rowBefore, row);
  }
};
lf.cache.Journal.prototype.insertOrReplace = function(table, rows) {
  this.assertJournalWritable_();
  this.checkScope_(table);
  this.contstraintChecker_.checkNotNullable(table, rows);
  for (var i = 0;i < rows.length;i++) {
    var rowNow = rows[i];
    var rowBefore = null;
    var existingRowId = this.contstraintChecker_.findExistingRowIdInPkIndex(table, rowNow);
    if (goog.isDefAndNotNull(existingRowId)) {
      rowBefore = (this.cache_.get([existingRowId])[0]);
      rowNow.assignRowId(existingRowId);
    }
    this.modifyRow_(table, rowBefore, rowNow);
  }
};
lf.cache.Journal.prototype.remove = function(table, rows) {
  this.assertJournalWritable_();
  this.checkScope_(table);
  for (var i = 0;i < rows.length;i++) {
    this.modifyRow_(table, rows[i], null);
  }
};
lf.cache.Journal.prototype.commit = function() {
  this.assertJournalWritable_();
  this.terminated_ = true;
};
lf.cache.Journal.prototype.assertJournalWritable_ = function() {
  goog.asserts.assert(!this.pendingRollback_, "Attemptted to use journal that needs to be rolled back.");
  goog.asserts.assert(!this.terminated_, "Attemptted to commit a terminated journal.");
};
lf.cache.Journal.prototype.rollback = function() {
  goog.asserts.assert(!this.terminated_, "Attempted to rollback a terminated journal.");
  var reverseDiffs = this.tableDiffs_.getValues().map(function(tableDiff) {
    return tableDiff.getReverse();
  }, this);
  this.inMemoryUpdater_.update(reverseDiffs);
  this.terminated_ = true;
  this.pendingRollback_ = false;
};
lf.cache.Journal.prototype.checkScope_ = function(tableSchema) {
  if (!this.scope_.containsKey(tableSchema.getName())) {
    throw new lf.Exception(lf.Exception.Type.SCOPE_ERROR, tableSchema.getName() + " is not in the journal's scope.");
  }
};

goog.provide("lf.cache.Prefetcher");
goog.require("goog.Promise");
goog.require("goog.asserts");
goog.require("lf.Row");
goog.require("lf.TransactionType");
goog.require("lf.backstore.TableType");
goog.require("lf.cache.Journal");
goog.require("lf.index.BTree");
goog.require("lf.index.ComparatorFactory");
goog.require("lf.index.IndexMetadata");
goog.require("lf.index.NullableIndex");
goog.require("lf.index.RowId");
goog.require("lf.service");
lf.cache.Prefetcher = function(global) {
  this.global_ = global;
  this.backStore_ = global.getService(lf.service.BACK_STORE);
  this.indexStore_ = global.getService(lf.service.INDEX_STORE);
  this.cache_ = global.getService(lf.service.CACHE);
};
lf.cache.Prefetcher.prototype.init = function(schema) {
  var tables = schema.tables();
  var execSequentially = goog.bind(function() {
    if (tables.length == 0) {
      return goog.Promise.resolve();
    }
    var table = tables.shift();
    var whenTableFetched = table.persistentIndex() ? this.fetchTableWithPersistentIndices_(table) : this.fetchTable_(table);
    return whenTableFetched.then(execSequentially);
  }, this);
  return execSequentially();
};
lf.cache.Prefetcher.prototype.fetchTable_ = function(table) {
  var journal = new lf.cache.Journal(this.global_, [table]);
  var tx = this.backStore_.createTx(lf.TransactionType.READ_ONLY, journal);
  var store = tx.getTable(table.getName(), goog.bind(table.deserializeRow, table));
  return store.get([]).then(goog.bind(function(results) {
    this.cache_.set(table.getName(), results);
    this.reconstructNonPersistentIndices_(table, results);
  }, this));
};
lf.cache.Prefetcher.prototype.reconstructNonPersistentIndices_ = function(tableSchema, tableRows) {
  var indices = this.indexStore_.getTableIndices(tableSchema.getName());
  tableRows.forEach(function(row) {
    indices.forEach(function(index) {
      var key = (row.keyOfIndex(index.getName()));
      index.add(key, row.id());
    });
  });
};
lf.cache.Prefetcher.prototype.fetchTableWithPersistentIndices_ = function(tableSchema) {
  var journal = new lf.cache.Journal(this.global_, [tableSchema]);
  var tx = this.backStore_.createTx(lf.TransactionType.READ_ONLY, journal);
  var store = tx.getTable(tableSchema.getName(), tableSchema.deserializeRow);
  var whenTableContentsFetched = store.get([]).then(goog.bind(function(results) {
    this.cache_.set(tableSchema.getName(), results);
  }, this));
  var whenIndicesReconstructed = tableSchema.getIndices().map(function(indexSchema) {
    return this.reconstructPersistentIndex_(indexSchema, tx);
  }, this).concat(this.reconstructPersistentRowIdIndex_(tableSchema, tx));
  return goog.Promise.all(whenIndicesReconstructed.concat(whenTableContentsFetched));
};
lf.cache.Prefetcher.prototype.reconstructPersistentIndex_ = function(indexSchema, tx) {
  var indexTable = tx.getTable(indexSchema.getNormalizedName(), lf.Row.deserialize, lf.backstore.TableType.INDEX);
  var comparator = lf.index.ComparatorFactory.create(indexSchema);
  return indexTable.get([]).then(goog.bind(function(serializedRows) {
    goog.asserts.assert(serializedRows[0].payload()["type"] == lf.index.IndexMetadata.Type.BTREE);
    if (serializedRows.length > 1) {
      if (indexSchema.hasNullableColumn()) {
        var deserializeFn = lf.index.BTree.deserialize.bind(undefined, comparator, indexSchema.getNormalizedName(), indexSchema.isUnique);
        var nullableIndex = lf.index.NullableIndex.deserialize(deserializeFn, serializedRows.slice(1));
        this.indexStore_.set(nullableIndex);
      } else {
        var btreeIndex = lf.index.BTree.deserialize(comparator, indexSchema.getNormalizedName(), indexSchema.isUnique, serializedRows.slice(1));
        this.indexStore_.set(btreeIndex);
      }
    }
  }, this));
};
lf.cache.Prefetcher.prototype.reconstructPersistentRowIdIndex_ = function(tableSchema, tx) {
  var indexTable = tx.getTable(tableSchema.getRowIdIndexName(), lf.Row.deserialize, lf.backstore.TableType.INDEX);
  return indexTable.get([]).then(goog.bind(function(serializedRows) {
    goog.asserts.assert(serializedRows[0].payload()["type"] == lf.index.IndexMetadata.Type.ROW_ID);
    if (serializedRows.length > 1) {
      var rowIdIndex = lf.index.RowId.deserialize(tableSchema.getRowIdIndexName(), serializedRows.slice(1));
      this.indexStore_.set(rowIdIndex);
    }
  }, this));
};

goog.provide("lf.cache.TableDiff");
goog.require("goog.asserts");
goog.require("goog.structs.Map");
goog.require("goog.structs.Set");
goog.forwardDeclare("lf.Row");
lf.cache.TableDiff = function(name) {
  this.added_ = new goog.structs.Map;
  this.modified_ = new goog.structs.Map;
  this.deleted_ = new goog.structs.Map;
  this.name_ = name;
};
lf.cache.TableDiff.prototype.getName = function() {
  return this.name_;
};
lf.cache.TableDiff.prototype.getAdded = function() {
  return this.added_;
};
lf.cache.TableDiff.prototype.getModified = function() {
  return this.modified_;
};
lf.cache.TableDiff.prototype.getDeleted = function() {
  return this.deleted_;
};
lf.cache.TableDiff.prototype.add = function(row) {
  if (this.deleted_.containsKey(row.id())) {
    var modification = [this.deleted_.get(row.id()), row];
    this.modified_.set(row.id(), modification);
    this.deleted_.remove(row.id());
  } else {
    this.added_.set(row.id(), row);
  }
};
lf.cache.TableDiff.prototype.modify = function(modification) {
  var oldValue = modification[0];
  var newValue = modification[1];
  goog.asserts.assert(oldValue.id() == newValue.id(), "Row ID mismatch between old/new values.");
  var id = oldValue.id();
  if (this.added_.containsKey(id)) {
    this.added_.set(id, newValue);
  } else {
    if (this.modified_.containsKey(id)) {
      var overallModification = [this.modified_.get(modification[0].id())[0], newValue];
      this.modified_.set(id, overallModification);
    } else {
      this.modified_.set(id, modification);
    }
  }
};
lf.cache.TableDiff.prototype.delete = function(row) {
  if (this.added_.containsKey(row.id())) {
    this.added_.remove(row.id());
  } else {
    if (this.modified_.containsKey(row.id())) {
      var originalRow = this.modified_.get(row.id())[0];
      this.modified_.remove(row.id());
      this.deleted_.set(row.id(), originalRow);
    } else {
      this.deleted_.set(row.id(), row);
    }
  }
};
lf.cache.TableDiff.prototype.merge = function(other) {
  other.added_.forEach(function(row, rowId) {
    this.add(row);
  }, this);
  other.modified_.forEach(function(modification, rowId) {
    this.modify(modification);
  }, this);
  other.deleted_.getValues().forEach(function(row) {
    this.delete(row);
  }, this);
};
lf.cache.TableDiff.prototype.getAsModifications = function() {
  var modifications = [];
  this.added_.getValues().forEach(function(row) {
    modifications.push([null, row]);
  }, this);
  this.modified_.getValues().forEach(function(modification) {
    modifications.push(modification);
  }, this);
  this.deleted_.getValues().forEach(function(row) {
    modifications.push([row, null]);
  }, this);
  return modifications;
};
lf.cache.TableDiff.prototype.toString = function() {
  return "[" + this.added_.getKeys().toString() + "], " + "[" + this.modified_.getKeys().toString() + "], " + "[" + this.deleted_.getKeys().toString() + "]";
};
lf.cache.TableDiff.prototype.getReverse = function() {
  var reverseDiff = new lf.cache.TableDiff(this.name_);
  this.added_.getValues().forEach(function(row) {
    reverseDiff.delete(row);
  }, this);
  this.deleted_.getValues().forEach(function(row) {
    reverseDiff.add(row);
  }, this);
  this.modified_.getValues().forEach(function(modification) {
    reverseDiff.modify([modification[1], modification[0]]);
  }, this);
  return reverseDiff;
};
lf.cache.TableDiff.prototype.isEmpty = function() {
  return this.added_.isEmpty() && this.deleted_.isEmpty() && this.modified_.isEmpty();
};

goog.provide("lf.pred.CombinedPredicate");
goog.require("goog.structs.Set");
goog.require("lf.pred.Operator");
goog.require("lf.pred.PredicateNode");
goog.require("lf.proc.Relation");
goog.require("lf.tree");
lf.pred.CombinedPredicate = function(operator) {
  lf.pred.CombinedPredicate.base(this, "constructor");
  this.operator = operator;
  this.isComplement_ = false;
};
goog.inherits(lf.pred.CombinedPredicate, lf.pred.PredicateNode);
lf.pred.CombinedPredicate.prototype.copy = function() {
  var copy = (lf.tree.map(this, function(node) {
    if (node instanceof lf.pred.CombinedPredicate) {
      var tempCopy = new lf.pred.CombinedPredicate(node.operator);
      tempCopy.isComplement_ = node.isComplement_;
      tempCopy.setId(node.getId());
      return tempCopy;
    } else {
      return node.copy();
    }
  }.bind(this)));
  return copy;
};
lf.pred.CombinedPredicate.prototype.getColumns = function(opt_results) {
  var columns = opt_results || [];
  this.traverse(function(child) {
    if (child == this) {
      return;
    }
    child.getColumns(columns);
  }.bind(this));
  var columnSet = new goog.structs.Set(columns);
  return columnSet.getValues();
};
lf.pred.CombinedPredicate.prototype.setComplement = function(isComplement) {
  if (this.isComplement_ == isComplement) {
    return;
  }
  this.isComplement_ = isComplement;
  this.operator = this.operator == lf.pred.Operator.AND ? lf.pred.Operator.OR : lf.pred.Operator.AND;
  this.getChildren().forEach(function(condition) {
    return condition.setComplement(isComplement);
  });
};
lf.pred.CombinedPredicate.prototype.eval = function(relation) {
  var results = this.getChildren().map(function(condition) {
    return condition.eval(relation);
  });
  return this.combineResults_(results);
};
lf.pred.CombinedPredicate.prototype.combineResults_ = function(results) {
  if (this.operator == lf.pred.Operator.AND) {
    return lf.proc.Relation.intersect(results);
  } else {
    return lf.proc.Relation.union(results);
  }
};
lf.pred.CombinedPredicate.prototype.toString = function() {
  return "combined_pred_" + this.operator.toString();
};

goog.provide("lf.pred.JoinPredicate");
goog.require("goog.labs.structs.Multimap");
goog.require("lf.eval.Registry");
goog.require("lf.eval.Type");
goog.require("lf.pred.PredicateNode");
goog.require("lf.proc.Relation");
goog.require("lf.proc.RelationEntry");
lf.pred.JoinPredicate = function(leftColumn, rightColumn, evaluatorType) {
  lf.pred.JoinPredicate.base(this, "constructor");
  this.leftColumn = leftColumn;
  this.rightColumn = rightColumn;
  this.evaluatorType = evaluatorType;
  var registry = (lf.eval.Registry.getInstance());
  this.evaluatorFn_ = registry.getEvaluator(this.leftColumn.getType(), this.evaluatorType);
};
goog.inherits(lf.pred.JoinPredicate, lf.pred.PredicateNode);
lf.pred.JoinPredicate.prototype.copy = function() {
  var clone = new lf.pred.JoinPredicate(this.leftColumn, this.rightColumn, this.evaluatorType);
  clone.setId(this.getId());
  return clone;
};
lf.pred.JoinPredicate.prototype.getColumns = function(opt_results) {
  if (goog.isDefAndNotNull(opt_results)) {
    opt_results.push(this.leftColumn);
    opt_results.push(this.rightColumn);
    return opt_results;
  } else {
    return [this.leftColumn, this.rightColumn];
  }
};
lf.pred.JoinPredicate.prototype.eval = function(relation) {
  var entries = relation.entries.filter(function(entry) {
    var leftValue = entry.getField(this.leftColumn);
    var rightValue = entry.getField(this.rightColumn);
    return this.evaluatorFn_(leftValue, rightValue);
  }, this);
  return new lf.proc.Relation(entries, relation.getTables());
};
lf.pred.JoinPredicate.prototype.toString = function() {
  return "join_pred(" + this.leftColumn.getNormalizedName() + ", " + this.rightColumn.getNormalizedName() + ")";
};
lf.pred.JoinPredicate.prototype.appliesToLeft_ = function(relation) {
  return relation.getTables().indexOf(this.leftColumn.getTable().getEffectiveName()) != -1;
};
lf.pred.JoinPredicate.prototype.appliesToRight_ = function(relation) {
  return relation.getTables().indexOf(this.rightColumn.getTable().getEffectiveName()) != -1;
};
lf.pred.JoinPredicate.prototype.detectLeftRight_ = function(relation1, relation2) {
  var left = null;
  var right = null;
  if (this.appliesToLeft_(relation1)) {
    this.assertRelationsApply_(relation1, relation2);
    left = relation1;
    right = relation2;
  } else {
    this.assertRelationsApply_(relation2, relation1);
    left = relation2;
    right = relation1;
  }
  return [left, right];
};
lf.pred.JoinPredicate.prototype.assertRelationsApply_ = function(leftRelation, rightRelation) {
  goog.asserts.assert(this.appliesToLeft_(leftRelation), "Mismatch between join predicate left operand and right relation.");
  goog.asserts.assert(this.appliesToRight_(rightRelation), "Mismatch between join predicate right operand and right relation.");
};
lf.pred.JoinPredicate.prototype.evalRelations = function(relation1, relation2) {
  var leftRightRelations = this.detectLeftRight_(relation1, relation2);
  var leftRelation = leftRightRelations[0];
  var rightRelation = leftRightRelations[1];
  return this.evaluatorType == lf.eval.Type.EQ ? this.evalRelationsHashJoin_(leftRelation, rightRelation) : this.evalRelationsNestedLoopJoin_(leftRelation, rightRelation);
};
lf.pred.JoinPredicate.prototype.evalRelationsNestedLoopJoin_ = function(leftRelation, rightRelation) {
  var combinedEntries = [];
  var leftRelationTables = leftRelation.getTables();
  var rightRelationTables = rightRelation.getTables();
  for (var i = 0;i < leftRelation.entries.length;i++) {
    for (var j = 0;j < rightRelation.entries.length;j++) {
      var predicateResult = this.evaluatorFn_(leftRelation.entries[i].getField(this.leftColumn), rightRelation.entries[j].getField(this.rightColumn));
      if (predicateResult) {
        var combinedEntry = lf.proc.RelationEntry.combineEntries(leftRelation.entries[i], leftRelationTables, rightRelation.entries[j], rightRelationTables);
        combinedEntries.push(combinedEntry);
      }
    }
  }
  var srcTables = leftRelation.getTables().concat(rightRelation.getTables());
  return new lf.proc.Relation(combinedEntries, srcTables);
};
lf.pred.JoinPredicate.prototype.evalRelationsHashJoin_ = function(leftRelation, rightRelation) {
  var minRelation = leftRelation;
  var maxRelation = rightRelation;
  var minColumn = this.leftColumn;
  var maxColumn = this.rightColumn;
  if (leftRelation.entries.length > rightRelation.entries.length) {
    minRelation = rightRelation;
    maxRelation = leftRelation;
    minColumn = this.rightColumn;
    maxColumn = this.leftColumn;
  }
  var map = new goog.labs.structs.Multimap;
  var combinedEntries = [];
  minRelation.entries.forEach(function(entry) {
    var key = String(entry.getField(minColumn));
    map.add(key, entry);
  });
  var minRelationTableNames = minRelation.getTables();
  var maxRelationTableNames = maxRelation.getTables();
  maxRelation.entries.forEach(function(entry) {
    var key = String(entry.getField(maxColumn));
    if (map.containsKey(key)) {
      var entries = (map.get(key));
      entries.forEach(function(innerEntry) {
        var combinedEntry = lf.proc.RelationEntry.combineEntries(entry, maxRelationTableNames, innerEntry, minRelationTableNames);
        combinedEntries.push(combinedEntry);
      });
    }
  });
  var srcTables = leftRelation.getTables().concat(rightRelation.getTables());
  return new lf.proc.Relation(combinedEntries, srcTables);
};

goog.provide("lf.pred.Operator");
lf.pred.Operator = {AND:"and", OR:"or"};

goog.provide("lf.pred");
goog.require("lf.pred.JoinPredicate");
goog.require("lf.pred.ValuePredicate");
lf.pred.createPredicate = function(leftOperand, rightOperand, evaluatorType) {
  if (goog.isNull(rightOperand)) {
    return new lf.pred.ValuePredicate(leftOperand, rightOperand, evaluatorType);
  }
  if (goog.isDef(rightOperand.getNormalizedName)) {
    return new lf.pred.JoinPredicate(leftOperand, rightOperand, evaluatorType);
  }
  return new lf.pred.ValuePredicate(leftOperand, rightOperand, evaluatorType);
};

goog.provide("lf.pred.PredicateNode");
goog.require("goog.structs.TreeNode");
goog.require("lf.Predicate");
lf.pred.PredicateNode = function() {
  lf.pred.PredicateNode.base(this, "constructor", "", "");
  this.id_ = lf.pred.PredicateNode.nextId_++;
};
goog.inherits(lf.pred.PredicateNode, goog.structs.TreeNode);
lf.pred.PredicateNode.nextId_ = 0;
lf.pred.PredicateNode.prototype.eval = goog.abstractMethod;
lf.pred.PredicateNode.prototype.setComplement = goog.abstractMethod;
lf.pred.PredicateNode.prototype.copy = goog.abstractMethod;
lf.pred.PredicateNode.prototype.getColumns = goog.abstractMethod;
lf.pred.PredicateNode.prototype.getId = function() {
  return this.id_;
};
lf.pred.PredicateNode.prototype.setId = function(id) {
  this.id_ = id;
};

goog.provide("lf.pred.ValuePredicate");
goog.require("goog.asserts");
goog.require("goog.structs.Set");
goog.require("lf.Binder");
goog.require("lf.Exception");
goog.require("lf.eval.Registry");
goog.require("lf.eval.Type");
goog.require("lf.index.SingleKeyRange");
goog.require("lf.pred.PredicateNode");
goog.require("lf.proc.Relation");
lf.pred.ValuePredicate = function(column, value, evaluatorType) {
  lf.pred.ValuePredicate.base(this, "constructor");
  this.column = column;
  this.value = value;
  this.evaluatorType = evaluatorType;
  var registry = (lf.eval.Registry.getInstance());
  this.evaluatorFn_ = registry.getEvaluator(this.column.getType(), this.evaluatorType);
  this.isComplement_ = false;
  this.binder_ = value;
};
goog.inherits(lf.pred.ValuePredicate, lf.pred.PredicateNode);
lf.pred.ValuePredicate.prototype.copy = function() {
  var clone = new lf.pred.ValuePredicate(this.column, this.value, this.evaluatorType);
  clone.setBinder(this.binder_);
  clone.setComplement(this.isComplement_);
  clone.setId(this.getId());
  return clone;
};
lf.pred.ValuePredicate.prototype.getColumns = function(opt_results) {
  if (goog.isDefAndNotNull(opt_results)) {
    opt_results.push(this.column);
    return opt_results;
  } else {
    return [this.column];
  }
};
lf.pred.ValuePredicate.prototype.setComplement = function(isComplement) {
  this.isComplement_ = isComplement;
};
lf.pred.ValuePredicate.prototype.setBinder = function(binder) {
  this.binder_ = binder;
};
lf.pred.ValuePredicate.prototype.checkBinding_ = function() {
  var bound = false;
  if (!(this.value instanceof lf.Binder)) {
    if (goog.isArray(this.value)) {
      bound = !this.value.some(function(val) {
        return val instanceof lf.Binder;
      });
    } else {
      bound = true;
    }
  }
  if (!bound) {
    throw new lf.Exception(lf.Exception.Type.SYNTAX, "Value is not bounded");
  }
};
lf.pred.ValuePredicate.prototype.eval = function(relation) {
  this.checkBinding_();
  if (this.evaluatorType == lf.eval.Type.IN) {
    return this.evalAsIn_(relation);
  }
  var entries = relation.entries.filter(function(entry) {
    return this.evaluatorFn_(entry.getField(this.column), this.value) != this.isComplement_;
  }, this);
  return new lf.proc.Relation(entries, relation.getTables());
};
lf.pred.ValuePredicate.prototype.bind = function(values) {
  var checkIndexWithinRange = function(index) {
    if (values.length <= index) {
      throw new lf.Exception(lf.Exception.Type.SYNTAX, "Cannot bind to given array: out of range.");
    }
  };
  if (this.binder_ instanceof lf.Binder) {
    var index = this.binder_.getIndex();
    checkIndexWithinRange(index);
    this.value = (values[index]);
  } else {
    if (goog.isArray(this.binder_)) {
      this.value = this.binder_.map(function(val) {
        if (val instanceof lf.Binder) {
          checkIndexWithinRange(val.getIndex());
          return values[val.getIndex()];
        } else {
          return val;
        }
      });
    }
  }
};
lf.pred.ValuePredicate.prototype.evalAsIn_ = function(relation) {
  goog.asserts.assert(this.evaluatorType == lf.eval.Type.IN, "ValuePredicate#evalAsIn_() called for wrong predicate type.");
  var valueSet = new goog.structs.Set(this.value);
  var evaluatorFn = goog.bind(function(rowValue) {
    return valueSet.contains(rowValue) != this.isComplement_;
  }, this);
  var entries = relation.entries.filter(function(entry) {
    return evaluatorFn(entry.getField(this.column));
  }, this);
  return new lf.proc.Relation(entries, relation.getTables());
};
lf.pred.ValuePredicate.prototype.toString = function() {
  return "value_pred(" + this.column.getNormalizedName() + " " + this.evaluatorType + (this.isComplement_ ? "(complement)" : "") + " " + this.value + ")";
};
lf.pred.ValuePredicate.prototype.isKeyRangeCompatible = function() {
  this.checkBinding_();
  return !goog.isNull(this.value) && (this.evaluatorType == lf.eval.Type.BETWEEN || this.evaluatorType == lf.eval.Type.EQ || this.evaluatorType == lf.eval.Type.GT || this.evaluatorType == lf.eval.Type.GTE || this.evaluatorType == lf.eval.Type.LT || this.evaluatorType == lf.eval.Type.LTE);
};
lf.pred.ValuePredicate.prototype.toKeyRange = function() {
  goog.asserts.assert(this.isKeyRangeCompatible(), "Could not convert predicate to key range.");
  var keyRange = null;
  if (this.evaluatorType == lf.eval.Type.BETWEEN) {
    keyRange = new lf.index.SingleKeyRange(this.value[0], this.value[1], false, false);
  } else {
    if (this.evaluatorType == lf.eval.Type.EQ) {
      keyRange = lf.index.SingleKeyRange.only(this.value);
    } else {
      if (this.evaluatorType == lf.eval.Type.GTE) {
        keyRange = lf.index.SingleKeyRange.lowerBound(this.value);
      } else {
        if (this.evaluatorType == lf.eval.Type.GT) {
          keyRange = lf.index.SingleKeyRange.lowerBound(this.value, true);
        } else {
          if (this.evaluatorType == lf.eval.Type.LTE) {
            keyRange = lf.index.SingleKeyRange.upperBound(this.value);
          } else {
            keyRange = lf.index.SingleKeyRange.upperBound(this.value, true);
          }
        }
      }
    }
  }
  return this.isComplement_ ? keyRange.complement() : [keyRange];
};

goog.provide("lf.schema.BaseColumn");
goog.require("lf.PredicateProvider");
goog.require("lf.eval.Type");
goog.require("lf.pred");
goog.require("lf.schema.Column");
lf.schema.BaseColumn = function(table, name, isUnique, isNullable, type, opt_alias) {
  this.table_ = table;
  this.name_ = name;
  this.isUnique_ = isUnique;
  this.isNullable_ = isNullable;
  this.type_ = type;
  this.indices_;
  this.alias_ = opt_alias || null;
};
lf.schema.BaseColumn.prototype.getName = function() {
  return this.name_;
};
lf.schema.BaseColumn.prototype.getNormalizedName = function() {
  return this.table_.getEffectiveName() + "." + this.name_;
};
lf.schema.BaseColumn.prototype.toString = function() {
  return this.getNormalizedName();
};
lf.schema.BaseColumn.prototype.getTable = function() {
  return this.table_;
};
lf.schema.BaseColumn.prototype.getType = function() {
  return this.type_;
};
lf.schema.BaseColumn.prototype.getAlias = function() {
  return this.alias_;
};
lf.schema.BaseColumn.prototype.getIndices = function() {
  if (!goog.isDefAndNotNull(this.indices_)) {
    this.indices_ = [];
    this.getTable().getIndices().forEach(function(index) {
      var colNames = index.columns.map(function(col) {
        return col.schema.getName();
      });
      if (colNames.indexOf(this.name_) != -1) {
        this.indices_.push(index);
      }
    }, this);
  }
  return this.indices_;
};
lf.schema.BaseColumn.prototype.isNullable = function() {
  return this.isNullable_;
};
lf.schema.BaseColumn.prototype.isUnique = function() {
  return this.isUnique_;
};
lf.schema.BaseColumn.prototype.eq = function(operand) {
  return lf.pred.createPredicate(this, operand, lf.eval.Type.EQ);
};
lf.schema.BaseColumn.prototype.neq = function(operand) {
  return lf.pred.createPredicate(this, operand, lf.eval.Type.NEQ);
};
lf.schema.BaseColumn.prototype.lt = function(operand) {
  return lf.pred.createPredicate(this, operand, lf.eval.Type.LT);
};
lf.schema.BaseColumn.prototype.lte = function(operand) {
  return lf.pred.createPredicate(this, operand, lf.eval.Type.LTE);
};
lf.schema.BaseColumn.prototype.gt = function(operand) {
  return lf.pred.createPredicate(this, operand, lf.eval.Type.GT);
};
lf.schema.BaseColumn.prototype.gte = function(operand) {
  return lf.pred.createPredicate(this, operand, lf.eval.Type.GTE);
};
lf.schema.BaseColumn.prototype.match = function(regex) {
  return lf.pred.createPredicate(this, regex, lf.eval.Type.MATCH);
};
lf.schema.BaseColumn.prototype.between = function(from, to) {
  return lf.pred.createPredicate(this, [from, to], lf.eval.Type.BETWEEN);
};
lf.schema.BaseColumn.prototype.in = function(values) {
  return lf.pred.createPredicate(this, values, lf.eval.Type.IN);
};
lf.schema.BaseColumn.prototype.isNull = function() {
  return this.eq(null);
};
lf.schema.BaseColumn.prototype.isNotNull = function() {
  return this.neq(null);
};
lf.schema.BaseColumn.prototype.as = function(name) {
  return new lf.schema.BaseColumn(this.table_, this.name_, this.isUnique_, this.isNullable_, this.type_, name);
};

goog.provide("lf.schema");
goog.provide("lf.schema.Builder");
goog.require("goog.structs.Map");
goog.require("lf.Exception");
goog.require("lf.Global");
goog.require("lf.proc.Database");
goog.require("lf.schema.Database");
goog.require("lf.schema.TableBuilder");
goog.require("lf.service");
goog.require("lf.service.ServiceId");
lf.schema.Builder = function(dbName, dbVersion) {
  this.schema_ = new lf.schema.DatabaseSchema_(dbName, dbVersion);
  this.tableBuilders_ = new goog.structs.Map;
  this.finalized_ = false;
};
lf.schema.Builder.prototype.finalize_ = function() {
  if (!this.finalized_) {
    this.tableBuilders_.getKeys().forEach(function(tableName) {
      var builder = this.tableBuilders_.get(tableName);
      this.schema_.setTable(builder.getSchema());
    }, this);
    this.tableBuilders_.clear();
    this.finalized_ = true;
  }
};
lf.schema.Builder.prototype.getSchema = function() {
  if (!this.finalized_) {
    this.finalize_();
  }
  return this.schema_;
};
lf.schema.Builder.prototype.getGlobal = function() {
  var namespacedGlobalId = new lf.service.ServiceId("ns_" + this.schema_.name());
  var global = lf.Global.get();
  var namespacedGlobal = null;
  if (!global.isRegistered(namespacedGlobalId)) {
    namespacedGlobal = new lf.Global;
    global.registerService(namespacedGlobalId, namespacedGlobal);
  } else {
    namespacedGlobal = global.getService(namespacedGlobalId);
  }
  return namespacedGlobal;
};
lf.schema.Builder.prototype.connect = function(opt_options) {
  var global = this.getGlobal();
  if (!global.isRegistered(lf.service.SCHEMA)) {
    global.registerService(lf.service.SCHEMA, this.getSchema());
  }
  var db = new lf.proc.Database(global);
  return db.init(opt_options);
};
lf.schema.Builder.prototype.createTable = function(tableName) {
  if (this.tableBuilders_.containsKey(tableName) || this.finalized_) {
    throw new lf.Exception(lf.Exception.Type.SYNTAX, "Table is already created or schema is already finalized.");
  }
  this.tableBuilders_.set(tableName, new lf.schema.TableBuilder(tableName));
  return this.tableBuilders_.get(tableName);
};
lf.schema.Builder.prototype.setPragma = function(pragma) {
  if (this.finalized_) {
    throw new lf.Exception(lf.Exception.Type.SYNTAX, "Schema is already finalized.");
  }
  this.schema_.setPragma(pragma);
  return this;
};
lf.schema.DatabaseSchema_ = function(name, version) {
  this.name_ = name;
  this.version_ = version;
  this.tables_ = new goog.structs.Map;
  this.pragma_ = {enableBundledMode:false};
};
lf.schema.DatabaseSchema_.prototype.name = function() {
  return this.name_;
};
lf.schema.DatabaseSchema_.prototype.version = function() {
  return this.version_;
};
lf.schema.DatabaseSchema_.prototype.tables = function() {
  return this.tables_.getValues();
};
lf.schema.DatabaseSchema_.prototype.table = function(tableName) {
  if (!this.tables_.containsKey(tableName)) {
    throw new lf.Exception(lf.Exception.Type.NOT_FOUND, tableName + " is not found in database");
  }
  return this.tables_.get(tableName);
};
lf.schema.DatabaseSchema_.prototype.setTable = function(table) {
  this.tables_.set(table.getName(), table);
};
lf.schema.DatabaseSchema_.prototype.pragma = function() {
  return this.pragma_;
};
lf.schema.DatabaseSchema_.prototype.setPragma = function(pragma) {
  this.pragma_ = pragma;
};
lf.schema.create = function(dbName, dbVersion) {
  return new lf.schema.Builder(dbName, dbVersion);
};

goog.provide("lf.schema.Constraint");
lf.schema.Constraint = function(primaryKey, notNullable, foreignKeys, unique) {
  this.primaryKey_ = primaryKey;
  this.notNullable_ = notNullable;
  this.foreignKeys_ = foreignKeys;
  this.unique_ = unique;
};
lf.schema.Constraint.prototype.getPrimaryKey = function() {
  return this.primaryKey_;
};
lf.schema.Constraint.prototype.getNotNullable = function() {
  return this.notNullable_;
};
lf.schema.Constraint.prototype.getForeignKeys = function() {
  return this.foreignKeys_;
};
lf.schema.Constraint.prototype.getUnique = function() {
  return this.unique_;
};

goog.provide("lf.schema.Column");
goog.provide("lf.schema.ConnectOptions");
goog.provide("lf.schema.DataStoreType");
goog.provide("lf.schema.Database");
goog.provide("lf.schema.Index");
goog.provide("lf.schema.IndexedColumn");
goog.provide("lf.schema.Table");
goog.forwardDeclare("Firebase");
goog.forwardDeclare("lf.Order");
goog.forwardDeclare("lf.Predicate");
goog.forwardDeclare("lf.Row");
goog.forwardDeclare("lf.Type");
goog.forwardDeclare("lf.raw.BackStore");
lf.schema.Column = function() {
};
lf.schema.Column.prototype.getName;
lf.schema.Column.prototype.getNormalizedName;
lf.schema.Column.prototype.getTable;
lf.schema.Column.prototype.getType;
lf.schema.Column.prototype.getAlias;
lf.schema.Column.prototype.getIndices;
lf.schema.Column.prototype.isNullable;
lf.schema.Database = function() {
};
lf.schema.Database.prototype.name;
lf.schema.Database.prototype.version;
lf.schema.Database.prototype.tables;
lf.schema.Database.prototype.table;
lf.schema.Database.prototype.pragma;
lf.schema.Database.Pragma;
lf.schema.DataStoreType = {};
lf.schema.DataStoreType.INDEXED_DB = (0);
lf.schema.DataStoreType.MEMORY = (1);
lf.schema.DataStoreType.LOCAL_STORAGE = (2);
lf.schema.DataStoreType.FIREBASE = (3);
lf.schema.DataStoreType.WEB_SQL = (4);
lf.schema.DataStoreType.OBSERVABLE_STORE = (5);
lf.schema.ConnectOptions;
lf.schema.IndexedColumn;
lf.schema.Index = function(tableName, name, isUnique, columns) {
  this.tableName = tableName;
  this.name = name;
  this.isUnique = isUnique;
  this.columns = columns;
};
lf.schema.Index.prototype.getNormalizedName = function() {
  return this.tableName + "." + this.name;
};
lf.schema.Index.prototype.hasNullableColumn = function() {
  return this.columns.some(function(column) {
    return column.schema.isNullable();
  });
};
lf.schema.Table = function(name, cols, indices, persistentIndex) {
  this.name_ = name;
  this.indices_ = indices;
  this.columns_ = cols;
  this.persistentIndex_ = persistentIndex;
  this.alias_ = null;
};
lf.schema.Table.prototype.getName = function() {
  return this.name_;
};
lf.schema.Table.prototype.getAlias = function() {
  return this.alias_;
};
lf.schema.Table.prototype.getEffectiveName = function() {
  return this.alias_ || this.name_;
};
lf.schema.Table.prototype.as = function(name) {
  var clone = new this.constructor(this.name_);
  clone.alias_ = name;
  return clone;
};
lf.schema.Table.prototype.createRow = goog.abstractMethod;
lf.schema.Table.prototype.deserializeRow = goog.abstractMethod;
lf.schema.Table.prototype.getIndices = function() {
  return this.indices_;
};
lf.schema.Table.prototype.getColumns = function() {
  return this.columns_;
};
lf.schema.Table.prototype.getConstraint = goog.abstractMethod;
lf.schema.Table.prototype.persistentIndex = function() {
  return this.persistentIndex_;
};
lf.schema.Table.ROW_ID_INDEX_PATTERN = "#";
lf.schema.Table.prototype.getRowIdIndexName = function() {
  return this.name_ + "." + lf.schema.Table.ROW_ID_INDEX_PATTERN;
};

goog.provide("lf.schema.TableBuilder");
goog.require("goog.structs.Map");
goog.require("goog.structs.Set");
goog.require("lf.Exception");
goog.require("lf.Order");
goog.require("lf.Row");
goog.require("lf.Type");
goog.require("lf.schema.BaseColumn");
goog.require("lf.schema.Constraint");
goog.require("lf.schema.Index");
goog.require("lf.schema.Table");
goog.require("lf.type");
lf.schema.TableBuilder = function(tableName) {
  this.name_ = tableName;
  this.columns_ = new goog.structs.Map;
  this.uniqueColumns_ = new goog.structs.Set;
  this.uniqueIndices_ = new goog.structs.Set;
  this.nullable_ = new goog.structs.Set;
  this.pkName_ = "pk" + lf.schema.TableBuilder.toPascal_(this.name_);
  this.indices_ = new goog.structs.Map;
  this.persistentIndex_ = false;
  this.checkName_(tableName);
};
lf.schema.TableBuilder.IndexedColumn;
lf.schema.TableBuilder.NULLABLE_TYPES_BY_DEFAULT = new goog.structs.Set([lf.Type.ARRAY_BUFFER, lf.Type.OBJECT]);
lf.schema.TableBuilder.toPascal_ = function(name) {
  return name[0].toUpperCase() + name.substring(1);
};
lf.schema.TableBuilder.prototype.checkName_ = function(name) {
  if (!/^[A-Za-z_][A-Za-z0-9_]*$/.test(name)) {
    throw new lf.Exception(lf.Exception.Type.SYNTAX, name + " violates naming rule");
  }
  if (this.columns_.containsKey(name) || this.indices_.containsKey(name) || this.uniqueIndices_.contains(name)) {
    throw new lf.Exception(lf.Exception.Type.SYNTAX, this.name_ + "." + name + " is already defined");
  }
};
lf.schema.TableBuilder.prototype.checkPrimaryKey_ = function(columns) {
  var hasAutoIncrement = false;
  columns.forEach(function(column) {
    var columnType = this.columns_.get(column.name);
    hasAutoIncrement = hasAutoIncrement || column.autoIncrement;
    if (column.autoIncrement && columnType != lf.Type.INTEGER) {
      throw new lf.Exception(lf.Exception.Type.SYNTAX, "Can not use autoIncrement with a non-integer primary key.");
    }
  }, this);
  if (hasAutoIncrement && columns.length > 1) {
    throw new lf.Exception(lf.Exception.Type.SYNTAX, "Can not use autoIncrement with a cross-column primary key.");
  }
};
lf.schema.TableBuilder.prototype.addColumn = function(name, type) {
  this.checkName_(name);
  this.columns_.set(name, type);
  if (lf.schema.TableBuilder.NULLABLE_TYPES_BY_DEFAULT.contains(type)) {
    this.addNullable([name]);
  }
  return this;
};
lf.schema.TableBuilder.prototype.addPrimaryKey = function(columns, opt_autoInc) {
  this.checkName_(this.pkName_);
  var cols = this.normalizeColumns_(columns, true, undefined, opt_autoInc);
  this.checkPrimaryKey_(cols);
  cols.forEach(function(col) {
    this.uniqueColumns_.add(col.name);
  }, this);
  this.uniqueIndices_.add(this.pkName_);
  this.indices_.set(this.pkName_, cols);
  return this;
};
lf.schema.TableBuilder.prototype.addForeignKey = function(name, localColumn, remoteTable, remoteColumn, opt_cascade) {
  return this;
};
lf.schema.TableBuilder.prototype.addUnique = function(name, columns) {
  this.checkName_(name);
  var cols = this.normalizeColumns_(columns, true);
  this.indices_.set(name, cols);
  this.uniqueIndices_.add(name);
  return this;
};
lf.schema.TableBuilder.prototype.addNullable = function(columns) {
  var cols = this.normalizeColumns_(columns, false);
  this.checkNullableColumns_(cols);
  cols.forEach(function(col) {
    this.nullable_.add(col.name);
  }, this);
  return this;
};
lf.schema.TableBuilder.prototype.checkNullableColumns_ = function(columns) {
  this.indices_.getKeys().forEach(function(indexName) {
    var indexedColumnNames = new goog.structs.Set;
    this.indices_.get(indexName).forEach(function(indexedColumn) {
      indexedColumnNames.add(indexedColumn.name);
    });
    var nullableColumns = columns.filter(function(nullableColumn) {
      return indexedColumnNames.contains(nullableColumn.name);
    });
    if (indexedColumnNames.getCount() > 1 && nullableColumns.length > 0) {
      throw new lf.Exception(lf.Exception.Type.SYNTAX, "Cross-column index " + indexName + " refers to nullable columns: " + nullableColumns.join(","));
    }
  }, this);
};
lf.schema.TableBuilder.prototype.addIndex = function(name, columns, opt_unique, opt_order) {
  this.checkName_(name);
  var cols = this.normalizeColumns_(columns, true, opt_order);
  this.checkIndexedColumns_(name, cols);
  if (opt_unique) {
    this.uniqueIndices_.add(name);
  }
  this.indices_.set(name, cols);
  return this;
};
lf.schema.TableBuilder.prototype.checkIndexedColumns_ = function(indexName, columns) {
  if (columns.length > 1) {
    var nullableColumns = columns.filter(function(column) {
      return this.nullable_.contains(column.name);
    }, this);
    if (nullableColumns.length > 0) {
      throw new lf.Exception(lf.Exception.Type.SYNTAX, "Cross-column index " + indexName + " refers to nullable columns: " + nullableColumns.join(","));
    }
  }
};
lf.schema.TableBuilder.prototype.persistentIndex = function(value) {
  this.persistentIndex_ = value;
};
lf.schema.TableBuilder.prototype.getSchema = function() {
  var tableClass = this.generateTableClass_();
  return new tableClass;
};
lf.schema.TableBuilder.prototype.normalizeColumns_ = function(columns, checkIndexable, opt_order, opt_autoInc) {
  var normalized = columns;
  if (typeof columns[0] == "string") {
    normalized = columns.map(function(col) {
      return {"name":col, "order":opt_order || lf.Order.ASC, "autoIncrement":opt_autoInc || false};
    });
  }
  normalized.forEach(function(col) {
    if (!this.columns_.containsKey(col.name)) {
      throw new lf.Exception(lf.Exception.Type.SYNTAX, this.name_ + " does not have column: " + col.name);
    }
    if (checkIndexable) {
      var type = this.columns_.get(col.name);
      if (type == lf.Type.ARRAY_BUFFER || type == lf.Type.OBJECT) {
        throw new lf.Exception(lf.Exception.Type.SYNTAX, this.name_ + " index on non-indexable column: " + col.name);
      }
    }
  }, this);
  return normalized;
};
lf.schema.TableBuilder.prototype.generateTableClass_ = function() {
  var that = this;
  var tableClass = function() {
    var columns = that.columns_.getKeys().map(function(colName) {
      this[colName] = new lf.schema.BaseColumn(this, colName, that.uniqueColumns_.contains(colName), that.nullable_.contains(colName), that.columns_.get(colName));
      return this[colName];
    }, this);
    var generateIndexedColumns = function(indexName) {
      return that.indices_.get(indexName).map(function(indexedColumn) {
        return {schema:this[indexedColumn.name], order:indexedColumn.order, autoIncrement:indexedColumn.autoIncrement};
      }, this);
    };
    var indices = that.indices_.getKeys().map(function(indexName) {
      return new lf.schema.Index(that.name_, indexName, that.uniqueIndices_.contains(indexName), generateIndexedColumns.call(this, indexName));
    }, this);
    tableClass.base(this, "constructor", that.name_, columns, indices, that.persistentIndex_);
    var pk = that.indices_.containsKey(that.pkName_) ? new lf.schema.Index(that.name_, that.pkName_, true, generateIndexedColumns.call(this, that.pkName_)) : null;
    var notNullable = columns.filter(function(col) {
      return !that.nullable_.contains(col.getName());
    });
    var foreignKeys = [];
    var unique = that.uniqueIndices_.getValues().map(function(indexName) {
      return new lf.schema.Index(that.name_, indexName, true, generateIndexedColumns.call(this, indexName));
    }, this);
    this.constraint_ = new lf.schema.Constraint(pk, notNullable, foreignKeys, unique);
    this.rowClass_ = that.generateRowClass_(columns, indices);
  };
  goog.inherits(tableClass, lf.schema.Table);
  tableClass.prototype.createRow = function(opt_value) {
    return new this.rowClass_(lf.Row.getNextId(), opt_value);
  };
  goog.exportProperty(tableClass.prototype, "createRow", tableClass.prototype.createRow);
  tableClass.prototype.deserializeRow = function(dbRecord) {
    var obj = {};
    this.getColumns().forEach(function(col) {
      var key = col.getName();
      var type = col.getType();
      var value = dbRecord["value"][key];
      if (type == lf.Type.ARRAY_BUFFER) {
        obj[key] = goog.isNull(value) ? value : lf.Row.hexToBin(value);
      } else {
        if (type == lf.Type.DATE_TIME) {
          obj[key] = goog.isNull(value) ? value : new Date(value);
        } else {
          obj[key] = value;
        }
      }
    }, this);
    return new this.rowClass_(dbRecord["id"], obj);
  };
  goog.exportProperty(tableClass.prototype, "deserializeRow", tableClass.prototype.deserializeRow);
  tableClass.prototype.getConstraint = function() {
    return this.constraint_;
  };
  goog.exportProperty(tableClass.prototype, "getConstraint", tableClass.prototype.getConstraint);
  return tableClass;
};
lf.schema.TableBuilder.prototype.generateRowClass_ = function(columns, indices) {
  var rowClass = function(rowId, opt_payload) {
    this.columns_ = columns;
    this.indices_ = indices;
    rowClass.base(this, "constructor", rowId, opt_payload);
  };
  goog.inherits(rowClass, lf.Row);
  rowClass.prototype.defaultPayload = function() {
    var obj = {};
    this.columns_.forEach(function(col) {
      obj[col.getName()] = col.isNullable() ? null : lf.type.DEFAULT_VALUES[col.getType()];
    });
    return obj;
  };
  rowClass.prototype.toDbPayload = function() {
    var obj = {};
    this.columns_.forEach(function(col) {
      var key = col.getName();
      var type = col.getType();
      var value = this.payload()[key];
      if (type == lf.Type.ARRAY_BUFFER) {
        obj[key] = goog.isNull(value) ? value : lf.Row.binToHex(value);
      } else {
        if (type == lf.Type.DATE_TIME) {
          obj[key] = goog.isNull(value) ? value : value.getTime();
        } else {
          obj[key] = value;
        }
      }
    }, this);
    return obj;
  };
  var getSingleKeyFn = goog.bind(function(column) {
    var colType = this.columns_.get(column.getName());
    if (colType == lf.Type.DATE_TIME) {
      return function(payload) {
        var value = payload[column.getName()];
        return column.isNullable() && goog.isNull(value) ? null : value.getTime();
      };
    } else {
      if (colType == lf.Type.BOOLEAN) {
        return function(payload) {
          if (column.isNullable()) {
            var value = payload[column.getName()];
            return goog.isNull(value) ? null : value ? 1 : 0;
          } else {
            return payload[column.getName()] ? 1 : 0;
          }
        };
      } else {
        return function(payload) {
          return payload[column.getName()];
        };
      }
    }
  }, this);
  var getMultiKeyFn = goog.bind(function(columns) {
    var getSingleKeyFunctions = columns.map(function(indexedColumn) {
      return getSingleKeyFn(indexedColumn.schema);
    });
    return function(payload) {
      return getSingleKeyFunctions.map(function(fn) {
        return fn(payload);
      });
    };
  }, this);
  var getKeyOfIndexFn = function(index) {
    return index.columns.length == 1 ? getSingleKeyFn(index.columns[0].schema) : getMultiKeyFn(index.columns);
  };
  var functionMap = {};
  indices.forEach(function(index) {
    var key = index.getNormalizedName();
    functionMap[key] = getKeyOfIndexFn(index);
  });
  rowClass.prototype.keyOfIndex = function(indexName) {
    if (indexName.indexOf("#") != -1) {
      return (this.id());
    }
    if (functionMap.hasOwnProperty(indexName)) {
      return functionMap[indexName](this.payload());
    }
    return null;
  };
  return rowClass;
};

goog.provide("lf.query.BaseBuilder");
goog.require("goog.Promise");
goog.require("lf.proc.UserQueryTask");
goog.require("lf.query.Builder");
goog.require("lf.query.toSql");
goog.require("lf.service");
goog.require("lf.tree");
lf.query.BaseBuilder = function(global, context) {
  this.global = global;
  this.queryEngine_ = global.getService(lf.service.QUERY_ENGINE);
  this.runner_ = global.getService(lf.service.RUNNER);
  this.query = context;
  this.plan_;
};
lf.query.BaseBuilder.prototype.exec = function() {
  try {
    this.assertExecPreconditions();
  } catch (e) {
    return goog.Promise.reject(e);
  }
  return new goog.Promise(function(resolve, reject) {
    var queryTask = new lf.proc.UserQueryTask(this.global, [this.getTaskItem()]);
    this.runner_.scheduleTask(queryTask).then(function(results) {
      resolve(results[0].getPayloads());
    }, reject);
  }, this);
};
lf.query.BaseBuilder.prototype.explain = function() {
  var stringFn = goog.bind(function(node) {
    return node.toContextString(this.query) + "\n";
  }, this);
  return lf.tree.toString(this.getPlan_().getRoot(), stringFn);
};
lf.query.BaseBuilder.prototype.bind = function(values) {
  this.query.bind(values);
  return this;
};
lf.query.BaseBuilder.prototype.toSql = function(opt_stripValueInfo) {
  return lf.query.toSql(this, opt_stripValueInfo);
};
lf.query.BaseBuilder.prototype.assertExecPreconditions = function() {
};
lf.query.BaseBuilder.prototype.getQuery = function() {
  return this.query.clone();
};
lf.query.BaseBuilder.prototype.getObservableQuery = function() {
  return this.query;
};
lf.query.BaseBuilder.prototype.getPlan_ = function() {
  if (!goog.isDefAndNotNull(this.plan_)) {
    this.plan_ = this.queryEngine_.getPlan(this.query);
  }
  return this.plan_;
};
lf.query.BaseBuilder.prototype.getTaskItem = function() {
  return {context:this.getQuery(), plan:this.getPlan_()};
};
lf.query.BaseBuilder.prototype.getObservableTaskItem = function() {
  return {context:this.getObservableQuery(), plan:this.getPlan_()};
};

goog.provide("lf.query.Context");
goog.require("goog.asserts");
goog.require("goog.structs.Map");
goog.require("lf.pred.ValuePredicate");
lf.query.Context = function() {
  this.predicateMap_ = null;
  this.where;
  this.clonedFrom = null;
};
lf.query.Context.prototype.getPredicate = function(id) {
  if (goog.isNull(this.predicateMap_) && goog.isDefAndNotNull(this.where)) {
    this.predicateMap_ = lf.query.Context.buildPredicateMap_((this.where));
  }
  var predicate = this.predicateMap_.get(id, null);
  goog.asserts.assert(!goog.isNull(predicate));
  return predicate;
};
lf.query.Context.buildPredicateMap_ = function(rootPredicate) {
  var predicateMap = new goog.structs.Map;
  rootPredicate.traverse(function(node) {
    predicateMap.set(node.getId(), (node));
  });
  return predicateMap;
};
lf.query.Context.prototype.clone = goog.abstractMethod;
lf.query.Context.prototype.cloneBase = function(context) {
  if (context.where) {
    this.where = context.where.copy();
  }
  this.clonedFrom = context;
};
lf.query.Context.prototype.bind = function(values) {
  goog.asserts.assert(!goog.isDefAndNotNull(this.clonedFrom));
  return this;
};
lf.query.Context.prototype.bindValuesInSearchCondition = function(values) {
  var searchCondition = (this.where);
  if (goog.isDefAndNotNull(searchCondition)) {
    searchCondition.traverse(function(node) {
      if (node instanceof lf.pred.ValuePredicate) {
        node.bind(values);
      }
    });
  }
};

goog.provide("lf.query.DeleteBuilder");
goog.require("lf.Exception");
goog.require("lf.query.BaseBuilder");
goog.require("lf.query.Delete");
goog.require("lf.query.DeleteContext");
lf.query.DeleteBuilder = function(global) {
  lf.query.DeleteBuilder.base(this, "constructor", global, new lf.query.DeleteContext);
};
goog.inherits(lf.query.DeleteBuilder, lf.query.BaseBuilder);
lf.query.DeleteBuilder.prototype.from = function(table) {
  this.assertFromPreconditions_();
  this.query.from = table;
  return this;
};
lf.query.DeleteBuilder.prototype.where = function(predicate) {
  this.assertWherePreconditions_();
  this.query.where = predicate;
  return this;
};
lf.query.DeleteBuilder.prototype.assertFromPreconditions_ = function() {
  if (goog.isDefAndNotNull(this.query.from)) {
    throw new lf.Exception(lf.Exception.Type.SYNTAX, "from() has already been called.");
  }
};
lf.query.DeleteBuilder.prototype.assertWherePreconditions_ = function() {
  if (goog.isDefAndNotNull(this.query.where)) {
    throw new lf.Exception(lf.Exception.Type.SYNTAX, "where() has already been called.");
  }
};
lf.query.DeleteBuilder.prototype.assertExecPreconditions = function() {
  lf.query.DeleteBuilder.base(this, "assertExecPreconditions");
  if (!goog.isDefAndNotNull(this.query.from)) {
    throw new lf.Exception(lf.Exception.Type.SYNTAX, "Invalid usage of delete()");
  }
};

goog.provide("lf.query.DeleteContext");
goog.require("lf.query.Context");
lf.query.DeleteContext = function() {
  lf.query.DeleteContext.base(this, "constructor");
  this.from;
};
goog.inherits(lf.query.DeleteContext, lf.query.Context);
lf.query.DeleteContext.prototype.clone = function() {
  var context = new lf.query.DeleteContext;
  context.cloneBase(this);
  context.from = this.from;
  return context;
};
lf.query.DeleteContext.prototype.bind = function(values) {
  lf.query.DeleteContext.base(this, "bind", values);
  this.bindValuesInSearchCondition(values);
  return this;
};

goog.provide("lf.query.InsertBuilder");
goog.require("lf.Binder");
goog.require("lf.Exception");
goog.require("lf.query.BaseBuilder");
goog.require("lf.query.Insert");
goog.require("lf.query.InsertContext");
lf.query.InsertBuilder = function(global, opt_allowReplace) {
  lf.query.InsertBuilder.base(this, "constructor", global, new lf.query.InsertContext);
  this.query.allowReplace = opt_allowReplace || false;
};
goog.inherits(lf.query.InsertBuilder, lf.query.BaseBuilder);
lf.query.InsertBuilder.prototype.assertExecPreconditions = function() {
  lf.query.InsertBuilder.base(this, "assertExecPreconditions");
  var context = this.query;
  if (!goog.isDefAndNotNull(context.into) || !goog.isDefAndNotNull(context.values)) {
    throw new lf.Exception(lf.Exception.Type.SYNTAX, "Invalid usage of insert()");
  }
  if (context.allowReplace && goog.isNull(context.into.getConstraint().getPrimaryKey())) {
    throw new lf.Exception(lf.Exception.Type.SYNTAX, "Attemted to insert or replace in a table with no primary key.");
  }
};
lf.query.InsertBuilder.prototype.into = function(table) {
  this.assertIntoPreconditions_();
  this.query.into = table;
  return this;
};
lf.query.InsertBuilder.prototype.values = function(rows) {
  this.assertValuesPreconditions_();
  if (rows instanceof lf.Binder || rows.some(function(r) {
    return r instanceof lf.Binder;
  })) {
    this.query.binder = rows;
  } else {
    this.query.values = rows;
  }
  return this;
};
lf.query.InsertBuilder.prototype.assertIntoPreconditions_ = function() {
  if (goog.isDefAndNotNull(this.query.into)) {
    throw new lf.Exception(lf.Exception.Type.SYNTAX, "into() has already been called.");
  }
};
lf.query.InsertBuilder.prototype.assertValuesPreconditions_ = function() {
  if (goog.isDefAndNotNull(this.query.values)) {
    throw new lf.Exception(lf.Exception.Type.SYNTAX, "values() has already been called.");
  }
};

goog.provide("lf.query.InsertContext");
goog.require("lf.Binder");
goog.require("lf.query.Context");
lf.query.InsertContext = function() {
  lf.query.InsertContext.base(this, "constructor");
  this.into;
  this.binder;
  this.values;
  this.allowReplace;
};
goog.inherits(lf.query.InsertContext, lf.query.Context);
lf.query.InsertContext.prototype.clone = function() {
  var context = new lf.query.InsertContext;
  context.cloneBase(this);
  context.into = this.into;
  if (this.values) {
    context.values = this.values instanceof lf.Binder ? this.values : this.values.slice();
  }
  context.allowReplace = this.allowReplace;
  context.binder = this.binder;
  return context;
};
lf.query.InsertContext.prototype.bind = function(values) {
  lf.query.InsertContext.base(this, "bind", values);
  if (this.binder) {
    if (this.binder instanceof lf.Binder) {
      this.values = (values[this.binder.getIndex()]);
    } else {
      this.values = this.binder.map(function(val) {
        return val instanceof lf.Binder ? values[val.getIndex()] : val;
      });
    }
  }
  return this;
};

goog.provide("lf.query.SelectBuilder");
goog.require("lf.Binder");
goog.require("lf.Exception");
goog.require("lf.Order");
goog.require("lf.Type");
goog.require("lf.fn.AggregatedColumn");
goog.require("lf.fn.Type");
goog.require("lf.op");
goog.require("lf.query.BaseBuilder");
goog.require("lf.query.Select");
goog.require("lf.query.SelectContext");
lf.query.SelectBuilder = function(global, columns) {
  lf.query.SelectBuilder.base(this, "constructor", global, new lf.query.SelectContext);
  this.whereAlreadyCalled_ = false;
  this.fromAlreadyCalled_ = false;
  this.query.columns = columns;
  this.checkDistinctColumn_();
  this.checkAggregations_();
};
goog.inherits(lf.query.SelectBuilder, lf.query.BaseBuilder);
lf.query.SelectBuilder.prototype.assertExecPreconditions = function() {
  lf.query.SelectBuilder.base(this, "assertExecPreconditions");
  var context = this.query;
  if (!goog.isDefAndNotNull(context.from)) {
    throw new lf.Exception(lf.Exception.Type.SYNTAX, "Invalid usage of select()");
  }
  if (goog.isDef(context.limitBinder) && !goog.isDef(context.limit) || goog.isDef(context.skipBinder) && !goog.isDef(context.skip)) {
    throw new lf.Exception(lf.Exception.Type.SYNTAX, "Binding parameters of limit/skip without providing values");
  }
  this.checkProjectionList_();
};
lf.query.SelectBuilder.prototype.checkDistinctColumn_ = function() {
  var distinctColumns = this.query.columns.filter(function(column) {
    return column instanceof lf.fn.AggregatedColumn && column.aggregatorType == lf.fn.Type.DISTINCT;
  }, this);
  var isValidCombination = distinctColumns.length == 0 || distinctColumns.length == 1 && this.query.columns.length == 1;
  if (!isValidCombination) {
    throw new lf.Exception(lf.Exception.Type.SYNTAX, "Invalid usage of lf.fn.distinct()");
  }
};
lf.query.SelectBuilder.prototype.checkProjectionList_ = function() {
  goog.isDefAndNotNull(this.query.groupBy) ? this.checkGroupByColumns_() : this.checkProjectionListNotMixed_();
};
lf.query.SelectBuilder.prototype.checkGroupByColumns_ = function() {
  var nonAggregatedColumns = this.query.columns.filter(function(column) {
    return !(column instanceof lf.fn.AggregatedColumn);
  }).map(function(column) {
    return column.getNormalizedName();
  });
  var isInvalid = false;
  if (this.query.groupBy.length == 0 || this.query.columns.length == 0) {
    isInvalid = true;
  } else {
    var groupByColumns = this.query.groupBy.map(function(column) {
      return column.getNormalizedName();
    });
    isInvalid = nonAggregatedColumns.some(function(column) {
      return groupByColumns.indexOf(column) == -1;
    });
    if (!isInvalid) {
      isInvalid = this.query.groupBy.some(function(column) {
        var type = column.getType();
        return type == lf.Type.OBJECT || type == lf.Type.ARRAY_BUFFER;
      });
    }
  }
  if (isInvalid) {
    throw new lf.Exception(lf.Exception.Type.SYNTAX, "Invalid projection list or groupBy columns");
  }
};
lf.query.SelectBuilder.prototype.checkProjectionListNotMixed_ = function() {
  var aggregatedColumnsExist = this.query.columns.some(function(column) {
    return column instanceof lf.fn.AggregatedColumn;
  }, this);
  var nonAggregatedColumnsExist = this.query.columns.some(function(column) {
    return !(column instanceof lf.fn.AggregatedColumn);
  }, this) || this.query.columns.length == 0;
  if (aggregatedColumnsExist && nonAggregatedColumnsExist) {
    throw new lf.Exception(lf.Exception.Type.SYNTAX, "Invalid projection list, aggregated and non-aggregated " + "can't be mixed.");
  }
};
lf.query.SelectBuilder.prototype.checkAggregations_ = function() {
  this.query.columns.forEach(function(column) {
    var isValidAggregation = !(column instanceof lf.fn.AggregatedColumn) || lf.query.SelectBuilder.isAggregationValid_(column.aggregatorType, column.getType());
    if (!isValidAggregation) {
      throw new lf.Exception(lf.Exception.Type.SYNTAX, "Invalid aggregation detected for" + column.getNormalizedName());
    }
  }, this);
};
lf.query.SelectBuilder.prototype.assertNotAlreadyCalled_ = function(field, name) {
  if (goog.isDefAndNotNull(field)) {
    throw new lf.Exception(lf.Exception.Type.SYNTAX, name + "() has already been called.");
  }
};
lf.query.SelectBuilder.prototype.assertNotNegative_ = function(numberOfRows, name) {
  if (numberOfRows < 0) {
    throw new lf.Exception(lf.Exception.Type.SYNTAX, name + "() does not accept negative values");
  }
};
lf.query.SelectBuilder.prototype.from = function(var_args) {
  if (this.fromAlreadyCalled_) {
    throw new lf.Exception(lf.Exception.Type.SYNTAX, "from() has already been called.");
  }
  this.fromAlreadyCalled_ = true;
  if (!goog.isDefAndNotNull(this.query.from)) {
    this.query.from = [];
  }
  this.query.from.push.apply(this.query.from, Array.prototype.slice.call(arguments));
  return this;
};
lf.query.SelectBuilder.prototype.where = function(predicate) {
  if (this.whereAlreadyCalled_) {
    throw new lf.Exception(lf.Exception.Type.SYNTAX, "where() has already been called.");
  }
  this.whereAlreadyCalled_ = true;
  this.augmentWhereClause_(predicate);
  return this;
};
lf.query.SelectBuilder.prototype.augmentWhereClause_ = function(predicate) {
  if (goog.isDefAndNotNull(this.query.where)) {
    var newPredicate = lf.op.and(predicate, this.query.where);
    this.query.where = newPredicate;
  } else {
    this.query.where = predicate;
  }
};
lf.query.SelectBuilder.prototype.innerJoin = function(table, predicate) {
  if (!goog.isDefAndNotNull(this.query.from)) {
    this.query.from = [];
  }
  this.query.from.push(table);
  this.augmentWhereClause_(predicate);
  return this;
};
lf.query.SelectBuilder.prototype.leftOuterJoin = function(table, predicate) {
  throw new lf.Exception(lf.Exception.Type.NOT_SUPPORTED, "Not implemented yet");
};
lf.query.SelectBuilder.prototype.limit = function(numberOfRows) {
  this.assertNotAlreadyCalled_(this.query.limit || this.query.limitBinder, "limit");
  if (numberOfRows instanceof lf.Binder) {
    this.query.limitBinder = numberOfRows;
  } else {
    this.assertNotNegative_(numberOfRows, "limit");
    this.query.limit = numberOfRows;
  }
  return this;
};
lf.query.SelectBuilder.prototype.skip = function(numberOfRows) {
  this.assertNotAlreadyCalled_(this.query.skip || this.query.skipBinder, "skip");
  if (numberOfRows instanceof lf.Binder) {
    this.query.skipBinder = numberOfRows;
  } else {
    this.assertNotNegative_(numberOfRows, "skip");
    this.query.skip = numberOfRows;
  }
  return this;
};
lf.query.SelectBuilder.prototype.orderBy = function(column, opt_order) {
  if (!goog.isDefAndNotNull(this.query.orderBy)) {
    this.query.orderBy = [];
  }
  this.query.orderBy.push({column:column, order:goog.isDefAndNotNull(opt_order) ? opt_order : lf.Order.ASC});
  return this;
};
lf.query.SelectBuilder.prototype.groupBy = function(var_args) {
  this.assertNotAlreadyCalled_(this.query.groupBy, "groupBy");
  if (!goog.isDefAndNotNull(this.query.groupBy)) {
    this.query.groupBy = [];
  }
  this.query.groupBy.push.apply(this.query.groupBy, Array.prototype.slice.call(arguments));
  return this;
};
lf.query.SelectBuilder.isAggregationValid_ = function(aggregatorType, columnType) {
  switch(aggregatorType) {
    case lf.fn.Type.COUNT:
    ;
    case lf.fn.Type.DISTINCT:
      return true;
    case lf.fn.Type.AVG:
    ;
    case lf.fn.Type.GEOMEAN:
    ;
    case lf.fn.Type.STDDEV:
    ;
    case lf.fn.Type.SUM:
      return columnType == lf.Type.NUMBER || columnType == lf.Type.INTEGER;
    case lf.fn.Type.MAX:
    ;
    case lf.fn.Type.MIN:
      return columnType == lf.Type.NUMBER || columnType == lf.Type.INTEGER || columnType == lf.Type.STRING || columnType == lf.Type.DATE_TIME;
  }
  return false;
};
lf.query.SelectBuilder.prototype.clone = function() {
  var builder = new lf.query.SelectBuilder(this.global, this.query.columns);
  builder.query = this.query.clone();
  builder.query.clonedFrom = null;
  return builder;
};

goog.provide("lf.query.SelectContext");
goog.provide("lf.query.SelectContext.OrderBy");
goog.require("lf.Order");
goog.require("lf.query.Context");
lf.query.SelectContext = function() {
  lf.query.SelectContext.base(this, "constructor");
  this.columns;
  this.from;
  this.limit;
  this.skip;
  this.orderBy;
  this.groupBy;
  this.limitBinder;
  this.skipBinder;
};
goog.inherits(lf.query.SelectContext, lf.query.Context);
lf.query.SelectContext.OrderBy;
lf.query.SelectContext.orderByToString = function(orderBy) {
  var out = "";
  orderBy.forEach(function(orderByEl, index) {
    out += orderByEl.column.getNormalizedName() + " ";
    out += orderByEl.order == lf.Order.ASC ? "ASC" : "DESC";
    if (index < orderBy.length - 1) {
      out += ", ";
    }
  });
  return out;
};
lf.query.SelectContext.prototype.clone = function() {
  var context = new lf.query.SelectContext;
  context.cloneBase(this);
  if (this.columns) {
    context.columns = this.columns.slice();
  }
  if (this.from) {
    context.from = this.from.slice();
  }
  context.limit = this.limit;
  context.skip = this.skip;
  if (this.orderBy) {
    context.orderBy = this.orderBy.slice();
  }
  if (this.groupBy) {
    context.groupBy = this.groupBy.slice();
  }
  if (this.limitBinder) {
    context.limitBinder = this.limitBinder;
  }
  if (this.skipBinder) {
    context.skipBinder = this.skipBinder;
  }
  return context;
};
lf.query.SelectContext.prototype.bind = function(values) {
  lf.query.SelectContext.base(this, "bind", values);
  if (goog.isDefAndNotNull(this.limitBinder)) {
    this.limit = (values[this.limitBinder.getIndex()]);
  }
  if (goog.isDefAndNotNull(this.skipBinder)) {
    this.skip = (values[this.skipBinder.getIndex()]);
  }
  this.bindValuesInSearchCondition(values);
  return this;
};

goog.provide("lf.query.toSql");
goog.require("lf.Binder");
goog.require("lf.Exception");
goog.require("lf.Order");
goog.require("lf.Row");
goog.require("lf.Type");
goog.require("lf.eval.Type");
goog.require("lf.pred.CombinedPredicate");
goog.require("lf.pred.JoinPredicate");
goog.require("lf.pred.Operator");
goog.require("lf.pred.ValuePredicate");
goog.require("lf.query.DeleteContext");
goog.require("lf.query.InsertContext");
goog.require("lf.query.SelectContext");
goog.require("lf.query.UpdateContext");
lf.query.escapeSqlValue_ = function(type, value) {
  if (!goog.isDefAndNotNull(value)) {
    return "NULL";
  }
  switch(type) {
    case lf.Type.BOOLEAN:
      return value ? 1 : 0;
    case lf.Type.INTEGER:
    ;
    case lf.Type.NUMBER:
      return (value);
    case lf.Type.ARRAY_BUFFER:
      return "'" + lf.Row.binToHex((value)) + "'";
    default:
      return "'" + value.toString() + "'";
  }
};
lf.query.insertToSql_ = function(query, stripValueInfo) {
  var prefix = query.allowReplace ? "INSERT OR REPLACE" : "INSERT";
  var columns = query.into.getColumns();
  prefix += " INTO " + query.into.getName() + "(";
  prefix += columns.map(function(col) {
    return col.getName();
  }).join(", ");
  prefix += ") VALUES (";
  var sqls = query.values.map(function(row) {
    var values = columns.map(function(col) {
      var rawVal = row.payload()[col.getName()];
      return stripValueInfo ? goog.isDefAndNotNull(rawVal) ? "#" : "NULL" : lf.query.escapeSqlValue_(col.getType(), rawVal);
    });
    return prefix + values.join(", ") + ");";
  });
  return sqls.join("\n");
};
lf.query.evaluatorToSql_ = function(op) {
  switch(op) {
    case lf.eval.Type.BETWEEN:
      return "BETWEEN";
    case lf.eval.Type.EQ:
      return "=";
    case lf.eval.Type.GTE:
      return ">=";
    case lf.eval.Type.GT:
      return ">";
    case lf.eval.Type.IN:
      return "IN";
    case lf.eval.Type.LTE:
      return "<=";
    case lf.eval.Type.LT:
      return "<";
    case lf.eval.Type.MATCH:
      return "LIKE";
    case lf.eval.Type.NEQ:
      return "<>";
    default:
      return "UNKNOWN";
  }
};
lf.query.valueToSql_ = function(value, op, type, stripValueInfo) {
  if (value instanceof lf.Binder) {
    return "?" + value.getIndex().toString();
  }
  if (stripValueInfo) {
    return goog.isDefAndNotNull(value) ? "#" : "NULL";
  } else {
    if (op == lf.eval.Type.MATCH) {
      return "'" + value.toString() + "'";
    } else {
      if (op == lf.eval.Type.IN) {
        var array = (value);
        var vals = array.map(function(e) {
          return lf.query.escapeSqlValue_(type, e);
        });
        return "(" + vals.join(", ") + ")";
      } else {
        if (op == lf.eval.Type.BETWEEN) {
          return lf.query.escapeSqlValue_(type, value[0]) + " AND " + lf.query.escapeSqlValue_(type, value[1]);
        }
      }
    }
  }
  return lf.query.escapeSqlValue_(type, (value)).toString();
};
lf.query.valuePredicateToSql_ = function(pred, stripValueInfo) {
  return [pred.column.getNormalizedName(), lf.query.evaluatorToSql_(pred.evaluatorType), lf.query.valueToSql_(pred.value, pred.evaluatorType, pred.column.getType(), stripValueInfo)].join(" ");
};
lf.query.combinedPredicateToSql_ = function(pred, stripValueInfo) {
  var children = pred.getChildren().map(function(childNode) {
    return "(" + lf.query.parseSearchCondition_((childNode), stripValueInfo) + ")";
  });
  var joinToken = pred.operator == lf.pred.Operator.AND ? " AND " : " OR ";
  return children.join(joinToken);
};
lf.query.joinPredicateToSql_ = function(pred) {
  return [pred.leftColumn.getNormalizedName(), lf.query.evaluatorToSql_(pred.evaluatorType), pred.rightColumn.getNormalizedName()].join(" ");
};
lf.query.parseSearchCondition_ = function(pred, stripValueInfo) {
  if (pred instanceof lf.pred.ValuePredicate) {
    return lf.query.valuePredicateToSql_(pred, stripValueInfo);
  } else {
    if (pred instanceof lf.pred.CombinedPredicate) {
      return lf.query.combinedPredicateToSql_(pred, stripValueInfo);
    } else {
      if (pred instanceof lf.pred.JoinPredicate) {
        return lf.query.joinPredicateToSql_(pred);
      }
    }
  }
  throw new lf.Exception(lf.Exception.Type.NOT_SUPPORTED, "toSql does not support predicate type: " + typeof pred);
};
lf.query.predicateToSql_ = function(pred, stripValueInfo) {
  var whereClause = lf.query.parseSearchCondition_(pred, stripValueInfo);
  if (whereClause) {
    return " WHERE " + whereClause;
  }
  return "";
};
lf.query.deleteToSql_ = function(query, stripValueInfo) {
  var sql = "DELETE FROM " + query.from.getName();
  if (query.where) {
    sql += lf.query.predicateToSql_(query.where, stripValueInfo);
  }
  sql += ";";
  return sql;
};
lf.query.updateToSql_ = function(query, stripValueInfo) {
  var sql = "UPDATE " + query.table.getName() + " SET ";
  sql += query.set.map(function(set) {
    var setter = set.column.getNormalizedName() + " = ";
    if (set.binding != -1) {
      return setter + "?" + set.binding.toString();
    }
    return setter + lf.query.escapeSqlValue_(set.column.getType(), (set.value)).toString();
  }).join(", ");
  if (query.where) {
    sql += lf.query.predicateToSql_(query.where, stripValueInfo);
  }
  sql += ";";
  return sql;
};
lf.query.selectToSql_ = function(query, stripValueInfo) {
  var colList = "*";
  if (query.columns.length) {
    colList = query.columns.map(function(col) {
      if (col.getAlias()) {
        return col.getNormalizedName() + " AS " + col.getAlias();
      } else {
        return col.getNormalizedName();
      }
    }).join(", ");
  }
  var fromList = query.from.map(function(table) {
    if (table.getEffectiveName() != table.getName()) {
      return table.getName() + " AS " + table.getEffectiveName();
    } else {
      return table.getName();
    }
  }).join(", ");
  var sql = "SELECT " + colList + " FROM " + fromList;
  if (query.where) {
    sql += lf.query.predicateToSql_(query.where, stripValueInfo);
  }
  if (query.orderBy) {
    var orderBy = query.orderBy.map(function(order) {
      return order.column.getNormalizedName() + (order.order == lf.Order.DESC ? " DESC" : " ASC");
    }).join(", ");
    sql += " ORDER BY " + orderBy;
  }
  if (query.groupBy) {
    var groupBy = query.groupBy.map(function(col) {
      return col.getNormalizedName();
    }).join(", ");
    sql += " GROUP BY " + groupBy;
  }
  if (query.limit) {
    sql += " LIMIT " + query.limit.toString();
  }
  if (query.skip) {
    sql += " SKIP " + query.skip.toString();
  }
  sql += ";";
  return sql;
};
lf.query.toSql = function(builder, opt_stripValueInfo) {
  var stripValueInfo = opt_stripValueInfo || false;
  var query = builder.getQuery();
  if (query instanceof lf.query.InsertContext) {
    return lf.query.insertToSql_(query, stripValueInfo);
  }
  if (query instanceof lf.query.DeleteContext) {
    return lf.query.deleteToSql_(query, stripValueInfo);
  }
  if (query instanceof lf.query.UpdateContext) {
    return lf.query.updateToSql_(query, stripValueInfo);
  }
  if (query instanceof lf.query.SelectContext) {
    return lf.query.selectToSql_(query, stripValueInfo);
  }
  throw new lf.Exception(lf.Exception.Type.NOT_SUPPORTED, "toSql not implemented for " + typeof query);
};

goog.provide("lf.query.UpdateBuilder");
goog.require("lf.Binder");
goog.require("lf.Exception");
goog.require("lf.query.BaseBuilder");
goog.require("lf.query.Update");
goog.require("lf.query.UpdateContext");
lf.query.UpdateBuilder = function(global, table) {
  lf.query.UpdateBuilder.base(this, "constructor", global, new lf.query.UpdateContext);
  this.query.table = table;
};
goog.inherits(lf.query.UpdateBuilder, lf.query.BaseBuilder);
lf.query.UpdateBuilder.prototype.set = function(column, value) {
  var set = {binding:value instanceof lf.Binder ? value.getIndex() : -1, column:column, value:value};
  if (goog.isDefAndNotNull(this.query.set)) {
    this.query.set.push(set);
  } else {
    this.query.set = [set];
  }
  return this;
};
lf.query.UpdateBuilder.prototype.where = function(predicate) {
  this.assertWherePreconditions_();
  this.query.where = predicate;
  return this;
};
lf.query.UpdateBuilder.prototype.assertWherePreconditions_ = function() {
  if (goog.isDefAndNotNull(this.query.where)) {
    throw new lf.Exception(lf.Exception.Type.SYNTAX, "where() has already been called.");
  }
};
lf.query.UpdateBuilder.prototype.assertExecPreconditions = function() {
  lf.query.UpdateBuilder.base(this, "assertExecPreconditions");
  if (!goog.isDefAndNotNull(this.query.set)) {
    throw new lf.Exception(lf.Exception.Type.SYNTAX, "Invalid usage of update()");
  }
  var notBound = this.query.set.some(function(set) {
    return set.value instanceof lf.Binder;
  });
  if (notBound) {
    throw new lf.Exception(lf.Exception.Type.SYNTAX, "Update set value not bound");
  }
};

goog.provide("lf.query.UpdateContext");
goog.provide("lf.query.UpdateContext.Set");
goog.require("lf.query.Context");
lf.query.UpdateContext = function() {
  lf.query.UpdateContext.base(this, "constructor");
  this.table;
  this.set;
};
goog.inherits(lf.query.UpdateContext, lf.query.Context);
lf.query.UpdateContext.Set;
lf.query.UpdateContext.prototype.clone = function() {
  var context = new lf.query.UpdateContext;
  context.cloneBase(this);
  context.table = this.table;
  context.set = this.set ? this.set.slice() : this.set;
  return context;
};
lf.query.UpdateContext.prototype.bind = function(values) {
  lf.query.UpdateContext.base(this, "bind", values);
  this.set.forEach(function(set) {
    if (set.binding != -1) {
      set.value = values[set.binding];
    }
  });
  this.bindValuesInSearchCondition(values);
  return this;
};

goog.provide("lf.structs.Map");
goog.require("goog.structs.Map");
lf.structs.MapPolyFill_ = goog.defineClass(null, {constructor:function() {
  this.map_ = new goog.structs.Map;
  Object.defineProperty(this, "size", {get:function() {
    return this.map_.getCount();
  }});
}, clear:function() {
  this.map_.clear();
}, delete:function(key) {
  return this.map_.remove(key);
}, entries:function() {
  return (this.map_.__iterator__());
}, forEach:function(callback, opt_thisArg) {
  return this.map_.forEach(callback, opt_thisArg);
}, get:function(key) {
  return this.map_.get(key);
}, has:function(key) {
  return this.map_.containsKey(key);
}, keys:function() {
  return (this.map_.getKeyIterator());
}, set:function(key, value) {
  return this.map_.set(key, value);
}, values:function() {
  return (this.map_.getValueIterator());
}});
lf.structs.Map = goog.isDef(window.Map) && goog.isDef(window.Map.prototype.keys) ? window.Map : lf.structs.MapPolyFill_;

goog.provide("lf.proc.AggregationStep");
goog.require("goog.structs.Map");
goog.require("lf.fn.AggregatedColumn");
goog.require("lf.fn.Type");
goog.require("lf.proc.PhysicalQueryPlanNode");
goog.require("lf.proc.Relation");
lf.proc.AggregationStep = function(aggregatedColumns) {
  lf.proc.AggregationStep.base(this, "constructor", lf.proc.PhysicalQueryPlanNode.ANY, lf.proc.PhysicalQueryPlanNode.ExecType.FIRST_CHILD);
  this.aggregatedColumns = aggregatedColumns;
};
goog.inherits(lf.proc.AggregationStep, lf.proc.PhysicalQueryPlanNode);
lf.proc.AggregationStep.prototype.toString = function() {
  var columnNames = this.aggregatedColumns.map(function(column) {
    return column.getNormalizedName();
  });
  return "aggregation(" + columnNames.toString() + ")";
};
lf.proc.AggregationStep.prototype.execInternal = function(journal, relations) {
  relations.forEach(function(relation) {
    var calculator = new lf.proc.AggregationStep.Calculator_(relation, this.aggregatedColumns);
    calculator.calculate();
  }, this);
  return relations;
};
lf.proc.AggregationStep.Calculator_ = function(relation, columns) {
  this.relation_ = relation;
  this.columns_ = columns;
};
lf.proc.AggregationStep.Calculator_.prototype.calculate = function() {
  this.columns_.forEach(function(column) {
    var reverseColumnChain = column.getColumnChain().reverse();
    for (var i = 1;i < reverseColumnChain.length;i++) {
      var currentColumn = reverseColumnChain[i];
      var leafColumn = currentColumn.getColumnChain().slice(-1)[0];
      var inputRelation = this.getInputRelationFor_(currentColumn);
      var result = lf.proc.AggregationStep.Calculator_.evalAggregation_(currentColumn.aggregatorType, inputRelation, leafColumn);
      this.relation_.setAggregationResult(currentColumn, result);
    }
  }, this);
};
lf.proc.AggregationStep.Calculator_.prototype.getInputRelationFor_ = function(column) {
  return column.child instanceof lf.fn.AggregatedColumn ? (this.relation_.getAggregationResult(column.child)) : this.relation_;
};
lf.proc.AggregationStep.Calculator_.evalAggregation_ = function(aggregatorType, relation, column) {
  var result = null;
  var Calculator = lf.proc.AggregationStep.Calculator_;
  switch(aggregatorType) {
    case lf.fn.Type.MIN:
      result = Calculator.min_(relation, column);
      break;
    case lf.fn.Type.MAX:
      result = Calculator.max_(relation, column);
      break;
    case lf.fn.Type.DISTINCT:
      result = Calculator.distinct_(relation, column);
      break;
    case lf.fn.Type.COUNT:
      result = relation.entries.length;
      break;
    case lf.fn.Type.SUM:
      result = Calculator.sum_(relation, column);
      break;
    case lf.fn.Type.AVG:
      if (relation.entries.length > 0) {
        result = Calculator.sum_(relation, column) / relation.entries.length;
      }
      break;
    case lf.fn.Type.GEOMEAN:
      result = Calculator.geomean_(relation, column);
      break;
    default:
      result = Calculator.stddev_(relation, column);
      break;
  }
  return (result);
};
lf.proc.AggregationStep.Calculator_.min_ = function(relation, column) {
  var min = null;
  relation.entries.forEach(function(entry) {
    var value = entry.getField(column);
    if (goog.isNull(min) || value < min) {
      min = value;
    }
  });
  return (min);
};
lf.proc.AggregationStep.Calculator_.max_ = function(relation, column) {
  var max = null;
  relation.entries.forEach(function(entry) {
    var value = entry.getField(column);
    if (goog.isNull(max) || value > max) {
      max = value;
    }
  });
  return (max);
};
lf.proc.AggregationStep.Calculator_.sum_ = function(relation, column) {
  return relation.entries.reduce(function(soFar, entry) {
    return soFar + entry.getField(column);
  }, 0);
};
lf.proc.AggregationStep.Calculator_.stddev_ = function(relation, column) {
  var values = relation.entries.map(function(entry) {
    return entry.getField(column);
  });
  return goog.math.standardDeviation.apply(null, values);
};
lf.proc.AggregationStep.Calculator_.geomean_ = function(relation, column) {
  var nonZeroEntriesCount = 0;
  var reduced = relation.entries.reduce(function(soFar, entry) {
    var value = entry.getField(column);
    if (value != 0) {
      nonZeroEntriesCount++;
      return soFar + Math.log(value);
    } else {
      return soFar;
    }
  }, 0);
  return nonZeroEntriesCount == 0 ? null : Math.pow(Math.E, reduced / nonZeroEntriesCount);
};
lf.proc.AggregationStep.Calculator_.distinct_ = function(relation, column) {
  var distinctMap = new goog.structs.Map;
  relation.entries.forEach(function(entry) {
    var value = entry.getField(column);
    distinctMap.set(value, entry);
  });
  return new lf.proc.Relation(distinctMap.getValues(), relation.getTables());
};

goog.provide("lf.proc.AndPredicatePass");
goog.require("goog.array");
goog.require("goog.asserts");
goog.require("lf.pred.Operator");
goog.require("lf.proc.RewritePass");
goog.require("lf.proc.SelectNode");
goog.require("lf.tree");
goog.forwardDeclare("lf.pred.CombinedPredicate");
lf.proc.AndPredicatePass = function() {
  lf.proc.AndPredicatePass.base(this, "constructor");
};
goog.inherits(lf.proc.AndPredicatePass, lf.proc.RewritePass);
lf.proc.AndPredicatePass.prototype.rewrite = function(rootNode) {
  this.rootNode = rootNode;
  this.traverse_(this.rootNode);
  return this.rootNode;
};
lf.proc.AndPredicatePass.prototype.traverse_ = function(rootNode) {
  if (rootNode instanceof lf.proc.SelectNode) {
    goog.asserts.assert(rootNode.getChildCount() == 1, "SelectNode must have exactly one child.");
    var predicates = this.breakAndPredicate_((rootNode.predicate));
    var newNodes = this.createSelectNodeChain_(predicates);
    lf.tree.replaceNodeWithChain(rootNode, newNodes[0], newNodes[1]);
    if (rootNode == this.rootNode) {
      this.rootNode = newNodes[0];
    }
    rootNode = newNodes[0];
  }
  rootNode.getChildren().forEach(function(child) {
    this.traverse_((child));
  }, this);
};
lf.proc.AndPredicatePass.prototype.breakAndPredicate_ = function(predicate) {
  if (predicate.getChildCount() == 0) {
    return [predicate];
  }
  var combinedPredicate = (predicate);
  if (combinedPredicate.operator != lf.pred.Operator.AND) {
    return [predicate];
  }
  var predicates = combinedPredicate.getChildren().slice().map(function(childPredicate) {
    combinedPredicate.removeChild(childPredicate);
    return this.breakAndPredicate_((childPredicate));
  }, this);
  return goog.array.flatten(predicates);
};
lf.proc.AndPredicatePass.prototype.createSelectNodeChain_ = function(predicates) {
  var parentNode = null;
  var lastNode = null;
  predicates.map(function(predicate, index) {
    var node = new lf.proc.SelectNode(predicate);
    index == 0 ? parentNode = node : lastNode.addChild(node);
    lastNode = node;
  }, this);
  return [parentNode, lastNode];
};

goog.provide("lf.proc.CrossProductPass");
goog.require("goog.asserts");
goog.require("lf.proc.CrossProductNode");
goog.require("lf.proc.RewritePass");
lf.proc.CrossProductPass = function() {
  lf.proc.CrossProductPass.base(this, "constructor");
};
goog.inherits(lf.proc.CrossProductPass, lf.proc.RewritePass);
lf.proc.CrossProductPass.prototype.rewrite = function(rootNode) {
  this.rootNode = rootNode;
  this.traverse_(this.rootNode);
  return this.rootNode;
};
lf.proc.CrossProductPass.prototype.traverse_ = function(rootNode) {
  if (rootNode instanceof lf.proc.CrossProductNode) {
    while (rootNode.getChildCount() > 2) {
      var crossProduct = new lf.proc.CrossProductNode;
      for (var i = 0;i < 2;i++) {
        var child = rootNode.removeChildAt(0);
        crossProduct.addChild((child));
      }
      rootNode.addChildAt(crossProduct, 0);
    }
  }
  rootNode.getChildren().forEach(function(child) {
    this.traverse_((child));
  }, this);
};

goog.provide("lf.proc.CrossProductStep");
goog.require("goog.Promise");
goog.require("goog.asserts");
goog.require("lf.proc.PhysicalQueryPlanNode");
goog.require("lf.proc.Relation");
goog.require("lf.proc.RelationEntry");
lf.proc.CrossProductStep = function() {
  lf.proc.CrossProductStep.base(this, "constructor", 2, lf.proc.PhysicalQueryPlanNode.ExecType.ALL);
};
goog.inherits(lf.proc.CrossProductStep, lf.proc.PhysicalQueryPlanNode);
lf.proc.CrossProductStep.prototype.toString = function() {
  return "cross_product";
};
lf.proc.CrossProductStep.prototype.execInternal = function(journal, relations) {
  return lf.proc.CrossProductStep.crossProduct_(relations[0], relations[1]);
};
lf.proc.CrossProductStep.crossProduct_ = function(leftRelation, rightRelation) {
  var combinedEntries = [];
  var leftRelationTableNames = leftRelation.getTables();
  var rightRelationTableNames = rightRelation.getTables();
  for (var i = 0;i < leftRelation.entries.length;i++) {
    for (var j = 0;j < rightRelation.entries.length;j++) {
      var combinedEntry = lf.proc.RelationEntry.combineEntries(leftRelation.entries[i], leftRelationTableNames, rightRelation.entries[j], rightRelationTableNames);
      combinedEntries.push(combinedEntry);
    }
  }
  var srcTables = leftRelation.getTables().concat(rightRelation.getTables());
  return [new lf.proc.Relation(combinedEntries, srcTables)];
};

goog.provide("lf.proc.Database");
goog.require("lf.Database");
goog.require("lf.Exception");
goog.require("lf.base");
goog.require("lf.proc.Transaction");
goog.require("lf.query.DeleteBuilder");
goog.require("lf.query.InsertBuilder");
goog.require("lf.query.SelectBuilder");
goog.require("lf.query.UpdateBuilder");
goog.require("lf.service");
lf.proc.Database = function(global) {
  this.global_ = global;
  this.schema_ = global.getService(lf.service.SCHEMA);
  this.initialized_ = false;
};
lf.proc.Database.prototype.init = function(opt_options) {
  this.global_.registerService(lf.service.SCHEMA, this.schema_);
  return (lf.base.init(this.global_, opt_options).then(goog.bind(function() {
    this.initialized_ = true;
    return this;
  }, this)));
};
lf.proc.Database.prototype.getSchema = function() {
  return this.schema_;
};
lf.proc.Database.prototype.checkInit_ = function() {
  if (!this.initialized_) {
    throw new lf.Exception(lf.Exception.Type.UNINITIALIZED, "Database is not initialized");
  }
};
lf.proc.Database.prototype.select = function(var_args) {
  this.checkInit_();
  var columns = arguments.length == 1 && !goog.isDefAndNotNull(arguments[0]) ? [] : Array.prototype.slice.call(arguments);
  return new lf.query.SelectBuilder(this.global_, columns);
};
lf.proc.Database.prototype.insert = function() {
  this.checkInit_();
  return new lf.query.InsertBuilder(this.global_);
};
lf.proc.Database.prototype.insertOrReplace = function() {
  this.checkInit_();
  return new lf.query.InsertBuilder(this.global_, true);
};
lf.proc.Database.prototype.update = function(table) {
  this.checkInit_();
  return new lf.query.UpdateBuilder(this.global_, table);
};
lf.proc.Database.prototype.delete = function() {
  this.checkInit_();
  return new lf.query.DeleteBuilder(this.global_);
};
lf.proc.Database.prototype.observe = function(query, callback) {
  var observerRegistry = this.global_.getService(lf.service.OBSERVER_REGISTRY);
  observerRegistry.addObserver(query, callback);
};
lf.proc.Database.prototype.unobserve = function(query, callback) {
  var observerRegistry = this.global_.getService(lf.service.OBSERVER_REGISTRY);
  observerRegistry.removeObserver(query, callback);
};
lf.proc.Database.prototype.createTransaction = function(opt_type) {
  this.checkInit_();
  return new lf.proc.Transaction(this.global_);
};
lf.proc.Database.prototype.close = function() {
  lf.base.closeDatabase(this.global_);
  this.global_.clear();
  this.initialized_ = false;
};

goog.provide("lf.proc.DefaultQueryEngine");
goog.require("lf.proc.LogicalPlanFactory");
goog.require("lf.proc.PhysicalPlanFactory");
goog.require("lf.proc.QueryEngine");
lf.proc.DefaultQueryEngine = function(global) {
  this.logicalPlanFactory_ = new lf.proc.LogicalPlanFactory;
  this.physicalPlanFactory_ = new lf.proc.PhysicalPlanFactory(global);
};
lf.proc.DefaultQueryEngine.prototype.getPlan = function(query) {
  var logicalQueryPlan = this.logicalPlanFactory_.create(query);
  return this.physicalPlanFactory_.create(logicalQueryPlan, query);
};

goog.provide("lf.proc.DeleteLogicalPlanGenerator");
goog.require("lf.proc.AndPredicatePass");
goog.require("lf.proc.BaseLogicalPlanGenerator");
goog.require("lf.proc.DeleteNode");
goog.require("lf.proc.LogicalPlanRewriter");
goog.require("lf.proc.SelectNode");
goog.require("lf.proc.TableAccessNode");
lf.proc.DeleteLogicalPlanGenerator = function(query) {
  lf.proc.DeleteLogicalPlanGenerator.base(this, "constructor", query);
};
goog.inherits(lf.proc.DeleteLogicalPlanGenerator, lf.proc.BaseLogicalPlanGenerator);
lf.proc.DeleteLogicalPlanGenerator.prototype.generateInternal = function() {
  var deleteNode = new lf.proc.DeleteNode(this.query.from);
  var selectNode = goog.isDefAndNotNull(this.query.where) ? new lf.proc.SelectNode(this.query.where.copy()) : null;
  var tableAccessNode = new lf.proc.TableAccessNode(this.query.from);
  if (goog.isNull(selectNode)) {
    deleteNode.addChild(tableAccessNode);
  } else {
    selectNode.addChild(tableAccessNode);
    deleteNode.addChild(selectNode);
  }
  var rewritePasses = [new lf.proc.AndPredicatePass];
  var planRewriter = new lf.proc.LogicalPlanRewriter((deleteNode), rewritePasses);
  return planRewriter.generate();
};

goog.provide("lf.proc.DeleteStep");
goog.require("goog.Promise");
goog.require("lf.proc.PhysicalQueryPlanNode");
goog.require("lf.proc.Relation");
lf.proc.DeleteStep = function(table) {
  lf.proc.DeleteStep.base(this, "constructor", 1, lf.proc.PhysicalQueryPlanNode.ExecType.FIRST_CHILD);
  this.table_ = table;
};
goog.inherits(lf.proc.DeleteStep, lf.proc.PhysicalQueryPlanNode);
lf.proc.DeleteStep.prototype.toString = function() {
  return "delete(" + this.table_.getName() + ")";
};
lf.proc.DeleteStep.prototype.getScope = function() {
  return this.table_;
};
lf.proc.DeleteStep.prototype.execInternal = function(journal, relations) {
  var rows = relations[0].entries.map(function(entry) {
    return entry.row;
  });
  journal.remove(this.table_, rows);
  return [lf.proc.Relation.createEmpty()];
};

goog.provide("lf.proc.ExternalChangeTask");
goog.require("goog.Promise");
goog.require("goog.structs.Set");
goog.require("lf.TransactionType");
goog.require("lf.cache.InMemoryUpdater");
goog.require("lf.proc.ObserverQueryTask");
goog.require("lf.proc.Task");
goog.require("lf.proc.TaskPriority");
goog.require("lf.service");
lf.proc.ExternalChangeTask = function(global, tableDiffs) {
  this.global_ = global;
  this.observerRegistry_ = global.getService(lf.service.OBSERVER_REGISTRY);
  this.runner_ = global.getService(lf.service.RUNNER);
  this.inMemoryUpdater_ = new lf.cache.InMemoryUpdater(global);
  this.tableDiffs_ = tableDiffs;
  var schema = global.getService(lf.service.SCHEMA);
  var tableSchemas = this.tableDiffs_.map(function(tableDiff) {
    return schema.table(tableDiff.getName());
  });
  this.scope_ = new goog.structs.Set(tableSchemas);
  this.resolver_ = goog.Promise.withResolver();
};
lf.proc.ExternalChangeTask.prototype.exec = function() {
  this.inMemoryUpdater_.update(this.tableDiffs_);
  this.scheduleObserverTask_();
  return goog.Promise.resolve();
};
lf.proc.ExternalChangeTask.prototype.getType = function() {
  return lf.TransactionType.READ_WRITE;
};
lf.proc.ExternalChangeTask.prototype.getScope = function() {
  return this.scope_;
};
lf.proc.ExternalChangeTask.prototype.getResolver = function() {
  return this.resolver_;
};
lf.proc.ExternalChangeTask.prototype.getId = function() {
  return goog.getUid(this);
};
lf.proc.ExternalChangeTask.prototype.getPriority = function() {
  return lf.proc.TaskPriority.EXTERNAL_CHANGE_TASK;
};
lf.proc.ExternalChangeTask.prototype.scheduleObserverTask_ = function() {
  var items = this.observerRegistry_.getTaskItemsForTables(this.scope_.getValues());
  if (items.length != 0) {
    var observerTask = new lf.proc.ObserverQueryTask(this.global_, items);
    this.runner_.scheduleTask(observerTask);
  }
};

goog.provide("lf.proc.GroupByStep");
goog.require("goog.labs.structs.Multimap");
goog.require("lf.proc.PhysicalQueryPlanNode");
goog.require("lf.proc.Relation");
lf.proc.GroupByStep = function(groupByColumns) {
  lf.proc.GroupByStep.base(this, "constructor", 1, lf.proc.PhysicalQueryPlanNode.ExecType.FIRST_CHILD);
  this.groupByColumns_ = groupByColumns;
};
goog.inherits(lf.proc.GroupByStep, lf.proc.PhysicalQueryPlanNode);
lf.proc.GroupByStep.prototype.toString = function() {
  var columnNames = this.groupByColumns_.map(function(column) {
    return column.getNormalizedName();
  });
  return "groupBy(" + columnNames.toString() + ")";
};
lf.proc.GroupByStep.prototype.execInternal = function(journal, relations) {
  return this.calculateGroupedRelations_(relations[0]);
};
lf.proc.GroupByStep.prototype.calculateGroupedRelations_ = function(relation) {
  var groupMap = new goog.labs.structs.Multimap;
  var getKey = function(entry) {
    var keys = this.groupByColumns_.map(function(column) {
      return entry.getField(column);
    }, this);
    return keys.join(",");
  }.bind(this);
  relation.entries.forEach(function(entry) {
    groupMap.add(getKey(entry), entry);
  }, this);
  return groupMap.getKeys().map(function(key) {
    return new lf.proc.Relation(groupMap.get(key), relation.getTables());
  }, this);
};

goog.provide("lf.proc.ImplicitJoinsPass");
goog.require("goog.asserts");
goog.require("lf.pred.JoinPredicate");
goog.require("lf.proc.CrossProductNode");
goog.require("lf.proc.JoinNode");
goog.require("lf.proc.RewritePass");
goog.require("lf.proc.SelectNode");
goog.require("lf.tree");
lf.proc.ImplicitJoinsPass = function() {
  lf.proc.ImplicitJoinsPass.base(this, "constructor");
};
goog.inherits(lf.proc.ImplicitJoinsPass, lf.proc.RewritePass);
lf.proc.ImplicitJoinsPass.prototype.rewrite = function(rootNode) {
  this.rootNode = rootNode;
  this.traverse_(this.rootNode);
  return this.rootNode;
};
lf.proc.ImplicitJoinsPass.prototype.traverse_ = function(rootNode) {
  if (rootNode instanceof lf.proc.SelectNode && rootNode.predicate instanceof lf.pred.JoinPredicate) {
    goog.asserts.assert(rootNode.getChildCount() == 1, "SelectNode must have exactly one child.");
    var child = (rootNode.getChildAt(0));
    if (child instanceof lf.proc.CrossProductNode) {
      var joinNode = new lf.proc.JoinNode(rootNode.predicate);
      lf.tree.replaceChainWithNode(rootNode, child, joinNode);
      if (rootNode == this.rootNode) {
        this.rootNode = joinNode;
      }
      rootNode = joinNode;
    }
  }
  rootNode.getChildren().forEach(function(child) {
    this.traverse_((child));
  }, this);
};

goog.provide("lf.proc.IndexCostEstimator");
goog.provide("lf.proc.IndexRangeCandidate");
goog.require("goog.asserts");
goog.require("goog.iter");
goog.require("goog.labs.structs.Multimap");
goog.require("goog.structs.Map");
goog.require("goog.structs.Set");
goog.require("lf.pred.ValuePredicate");
goog.require("lf.proc.BoundKeyRangeCalculator");
goog.require("lf.service");
goog.scope(function() {
  lf.proc.IndexCostEstimator = function(global, tableSchema) {
    this.tableSchema_ = tableSchema;
    this.indexStore_ = global.getService(lf.service.INDEX_STORE);
  };
  lf.proc.IndexCostEstimator.prototype.chooseIndexFor = function(queryContext, predicates) {
    var candidatePredicates = (predicates.filter(this.isCandidate_, this));
    if (candidatePredicates.length == 0) {
      return null;
    }
    var indexRangeCandidates = this.generateIndexRangeCandidates_(candidatePredicates);
    if (indexRangeCandidates.length == 0) {
      return null;
    }
    if (indexRangeCandidates.length == 1) {
      return indexRangeCandidates[0];
    }
    var minCost = Number.MAX_VALUE;
    return indexRangeCandidates.reduce(function(prev, curr) {
      var cost = curr.calculateCost(queryContext);
      if (cost < minCost) {
        minCost = cost;
        return curr;
      }
      return prev;
    }, null);
  };
  lf.proc.IndexCostEstimator.prototype.generateIndexRangeCandidates_ = function(predicates) {
    var indexSchemas = this.tableSchema_.getIndices();
    return indexSchemas.map(function(indexSchema) {
      var indexRangeCandidate = new lf.proc.IndexRangeCandidate(this.indexStore_, indexSchema);
      indexRangeCandidate.consumePredicates_(predicates);
      return indexRangeCandidate;
    }, this).filter(function(indexRangeCandidate) {
      return indexRangeCandidate.isUsable();
    });
  };
  lf.proc.IndexCostEstimator.prototype.isCandidate_ = function(predicate) {
    if (!(predicate instanceof lf.pred.ValuePredicate) || !predicate.isKeyRangeCompatible()) {
      return false;
    }
    return predicate.column.getTable() == this.tableSchema_;
  };
  lf.proc.IndexRangeCandidate = function(indexStore, indexSchema) {
    this.indexStore_ = indexStore;
    this.indexSchema = indexSchema;
    this.indexedColumnNames_ = new goog.structs.Set;
    this.indexedColumnNames_.addAll(this.indexSchema.columns.map(function(col) {
      return col.schema.getName();
    }));
    this.predicateMap_ = null;
    this.keyRangeCalculator_ = null;
  };
  lf.proc.IndexRangeCandidate.prototype.getPredicateIds = function() {
    return !goog.isNull(this.predicateMap_) ? this.predicateMap_.getValues() : [];
  };
  lf.proc.IndexRangeCandidate.prototype.getKeyRangeCalculator = function() {
    goog.asserts.assert(this.predicateMap_);
    if (goog.isNull(this.keyRangeCalculator_)) {
      this.keyRangeCalculator_ = new lf.proc.BoundKeyRangeCalculator(this.indexSchema, this.predicateMap_);
    }
    return this.keyRangeCalculator_;
  };
  lf.proc.IndexRangeCandidate.prototype.consumePredicates_ = function(predicates) {
    predicates.forEach(function(predicate) {
      var columnName = predicate.getColumns()[0].getName();
      if (this.indexedColumnNames_.contains(columnName)) {
        if (goog.isNull(this.predicateMap_)) {
          this.predicateMap_ = new goog.labs.structs.Multimap;
        }
        this.predicateMap_.add(columnName, predicate.getId());
      }
    }, this);
  };
  lf.proc.IndexRangeCandidate.prototype.isUsable = function() {
    if (goog.isNull(this.predicateMap_)) {
      return false;
    }
    var unboundColumnFound = false;
    var isUsable = true;
    for (var i = 0;i < this.indexSchema.columns.length;i++) {
      var column = this.indexSchema.columns[i];
      var isBound = this.predicateMap_.containsKey(column.schema.getName());
      if (unboundColumnFound && isBound) {
        isUsable = false;
        break;
      }
      if (!isBound) {
        unboundColumnFound = true;
      }
    }
    return isUsable;
  };
  lf.proc.IndexRangeCandidate.prototype.calculateCost = function(queryContext) {
    var combinations = this.getKeyRangeCalculator().getKeyRangeCombinations(queryContext);
    var indexData = this.indexStore_.get(this.indexSchema.getNormalizedName());
    return combinations.reduce(function(costSoFar, combination) {
      return costSoFar + indexData.cost(combination);
    }, 0);
  };
});

goog.provide("lf.proc.BoundKeyRangeCalculator");
goog.provide("lf.proc.IndexKeyRangeCalculator");
goog.provide("lf.proc.NotBoundKeyRangeCalculator");
goog.require("goog.asserts");
goog.require("goog.structs.Map");
goog.require("lf.index.SingleKeyRange");
goog.require("lf.index.SingleKeyRangeSet");
goog.scope(function() {
  lf.proc.IndexKeyRangeCalculator = function() {
  };
  lf.proc.IndexKeyRangeCalculator.prototype.getKeyRangeCombinations;
  lf.proc.NotBoundKeyRangeCalculator = function(indexSchema) {
    this.indexSchema_ = indexSchema;
  };
  lf.proc.NotBoundKeyRangeCalculator.prototype.getKeyRangeCombinations = function(queryContext) {
    return this.indexSchema_.columns.length == 1 ? [lf.index.SingleKeyRange.all()] : [this.indexSchema_.columns.map(function(column) {
      return lf.index.SingleKeyRange.all();
    })];
  };
  lf.proc.BoundKeyRangeCalculator = function(indexSchema, predicateMap) {
    this.indexSchema_ = indexSchema;
    this.predicateMap_ = predicateMap;
    this.lastQueryContext_ = null;
    this.combinations_ = null;
  };
  lf.proc.BoundKeyRangeCalculator.prototype.calculateKeyRangeMap_ = function(queryContext) {
    var keyRangeMap = new goog.structs.Map;
    this.predicateMap_.getKeys().forEach(function(columnName) {
      var predicateIds = (this.predicateMap_.get(columnName));
      var predicates = predicateIds.map(function(predicateId) {
        return queryContext.getPredicate(predicateId);
      }, this);
      var keyRangeSetSoFar = new lf.index.SingleKeyRangeSet([lf.index.SingleKeyRange.all()]);
      predicates.forEach(function(predicate) {
        var predicateKeyRangeSet = new lf.index.SingleKeyRangeSet(predicate.toKeyRange());
        keyRangeSetSoFar = lf.index.SingleKeyRangeSet.intersect(keyRangeSetSoFar, predicateKeyRangeSet);
      });
      keyRangeMap.set(columnName, keyRangeSetSoFar);
    }, this);
    return keyRangeMap;
  };
  lf.proc.BoundKeyRangeCalculator.prototype.fillMissingKeyRanges_ = function(keyRangeMap) {
    var getAllKeyRange = function() {
      return new lf.index.SingleKeyRangeSet([lf.index.SingleKeyRange.all()]);
    };
    for (var i = this.indexSchema_.columns.length - 1;i >= 0;i--) {
      var column = this.indexSchema_.columns[i];
      var keyRangeSet = keyRangeMap.get(column.schema.getName(), null);
      if (!goog.isNull(keyRangeSet)) {
        break;
      }
      keyRangeMap.set(column.schema.getName(), getAllKeyRange());
    }
  };
  lf.proc.BoundKeyRangeCalculator.prototype.getKeyRangeCombinations = function(queryContext) {
    if (this.lastQueryContext_ == queryContext) {
      return (this.combinations_);
    }
    var keyRangeMap = this.calculateKeyRangeMap_(queryContext);
    this.fillMissingKeyRanges_(keyRangeMap);
    this.combinations_ = this.indexSchema_.columns.length == 1 ? keyRangeMap.getValues()[0].getValues() : calculateCartesianProduct(this.getSortedKeyRangeSets_(keyRangeMap));
    this.lastQueryContext_ = queryContext;
    return this.combinations_;
  };
  lf.proc.BoundKeyRangeCalculator.prototype.getSortedKeyRangeSets_ = function(keyRangeMap) {
    var sortHelper = new goog.structs.Map;
    var priority = 0;
    this.indexSchema_.columns.forEach(function(column) {
      sortHelper.set(column.schema.getName(), priority);
      priority++;
    });
    var sortedColumnNames = keyRangeMap.getKeys().sort(function(a, b) {
      return sortHelper.get(a) - sortHelper.get(b);
    });
    return sortedColumnNames.map(function(columnName) {
      return keyRangeMap.get(columnName);
    });
  };
  function calculateCartesianProduct(keyRangeSets) {
    goog.asserts.assert(keyRangeSets.length > 1, "Should only be called for cross-column indices.");
    var keyRangeSetsAsArrays = keyRangeSets.map(function(keyRangeSet) {
      return keyRangeSet.getValues();
    });
    var it = goog.iter.product.apply(null, keyRangeSetsAsArrays);
    var combinations = [];
    goog.iter.forEach(it, function(value) {
      combinations.push(value);
    });
    return combinations;
  }
});

goog.provide("lf.proc.IndexRangeScanPass");
goog.require("goog.asserts");
goog.require("goog.structs.Map");
goog.require("lf.proc.IndexCostEstimator");
goog.require("lf.proc.IndexRangeScanStep");
goog.require("lf.proc.RewritePass");
goog.require("lf.proc.SelectStep");
goog.require("lf.proc.TableAccessByRowIdStep");
goog.require("lf.proc.TableAccessFullStep");
goog.require("lf.tree");
lf.proc.IndexRangeScanPass = function(global) {
  lf.proc.IndexRangeScanPass.base(this, "constructor");
  this.global_ = global;
};
goog.inherits(lf.proc.IndexRangeScanPass, lf.proc.RewritePass);
lf.proc.IndexRangeScanPass.prototype.rewrite = function(rootNode, queryContext) {
  this.rootNode = rootNode;
  var tableAccessFullSteps = (lf.tree.find(rootNode, function(node) {
    return node instanceof lf.proc.TableAccessFullStep;
  }));
  tableAccessFullSteps.forEach(function(tableAccessFullStep) {
    var selectStepsCandidates = this.findSelectSteps_(tableAccessFullStep);
    if (selectStepsCandidates.length == 0) {
      return;
    }
    var costEstimator = new lf.proc.IndexCostEstimator(this.global_, tableAccessFullStep.table);
    var indexRangeCandidate = costEstimator.chooseIndexFor((queryContext), selectStepsCandidates.map(function(c) {
      return queryContext.getPredicate(c.predicateId);
    }));
    if (goog.isNull(indexRangeCandidate)) {
      return;
    }
    var predicateToSelectStepMap = new goog.structs.Map;
    selectStepsCandidates.forEach(function(selectStep) {
      predicateToSelectStepMap.set(selectStep.predicateId, selectStep);
    }, this);
    this.rootNode = this.replaceWithIndexRangeScanStep_(indexRangeCandidate, predicateToSelectStepMap, tableAccessFullStep, (queryContext));
  }, this);
  return this.rootNode;
};
lf.proc.IndexRangeScanPass.prototype.findSelectSteps_ = function(startNode) {
  var selectSteps = [];
  var node = startNode.getParent();
  while (node) {
    if (node instanceof lf.proc.SelectStep) {
      selectSteps.push(node);
    }
    node = node.getParent();
  }
  return selectSteps;
};
lf.proc.IndexRangeScanPass.prototype.replaceWithIndexRangeScanStep_ = function(indexRangeCandidate, predicateToSelectStepMap, tableAccessFullStep, queryContext) {
  var predicateIds = indexRangeCandidate.getPredicateIds();
  var selectSteps = predicateIds.map(function(predicateId) {
    return predicateToSelectStepMap.get(predicateId);
  });
  selectSteps.forEach(lf.tree.removeNode);
  var indexRangeScanStep = new lf.proc.IndexRangeScanStep(this.global_, indexRangeCandidate.indexSchema, indexRangeCandidate.getKeyRangeCalculator(), false);
  var tableAccessByRowIdStep = new lf.proc.TableAccessByRowIdStep(this.global_, tableAccessFullStep.table);
  tableAccessByRowIdStep.addChild(indexRangeScanStep);
  lf.tree.replaceNodeWithChain(tableAccessFullStep, tableAccessByRowIdStep, indexRangeScanStep);
  return (indexRangeScanStep.getRoot());
};

goog.provide("lf.proc.IndexRangeScanStep");
goog.require("lf.Row");
goog.require("lf.proc.PhysicalQueryPlanNode");
goog.require("lf.proc.Relation");
goog.require("lf.service");
lf.proc.IndexRangeScanStep = function(global, index, keyRangeCalculator, reverseOrder) {
  lf.proc.IndexRangeScanStep.base(this, "constructor", 0, lf.proc.PhysicalQueryPlanNode.ExecType.NO_CHILD);
  this.indexStore_ = global.getService(lf.service.INDEX_STORE);
  this.index = index;
  this.keyRangeCalculator = keyRangeCalculator;
  this.reverseOrder = reverseOrder;
  this.useLimit = false;
  this.useSkip = false;
};
goog.inherits(lf.proc.IndexRangeScanStep, lf.proc.PhysicalQueryPlanNode);
lf.proc.IndexRangeScanStep.prototype.toString = function() {
  return "index_range_scan(" + this.index.getNormalizedName() + ", " + "?, " + (this.reverseOrder ? "reverse" : "natural") + (this.useLimit ? ", limit:?" : "") + (this.useSkip ? ", skip:?" : "") + ")";
};
lf.proc.IndexRangeScanStep.prototype.toContextString = function(context) {
  var string = this.toString();
  var keyRanges = this.keyRangeCalculator.getKeyRangeCombinations(context);
  string = string.replace("?", keyRanges.toString());
  if (this.useLimit) {
    string = string.replace("?", context.limit.toString());
  }
  if (this.useSkip) {
    string = string.replace("?", context.skip.toString());
  }
  return string;
};
lf.proc.IndexRangeScanStep.prototype.execInternal = function(journal, relations, context) {
  var keyRanges = this.keyRangeCalculator.getKeyRangeCombinations((context));
  var index = this.indexStore_.get(this.index.getNormalizedName());
  var rowIds = index.getRange(keyRanges, this.reverseOrder, this.useLimit ? context.limit : undefined, this.useSkip ? context.skip : undefined);
  var rows = rowIds.map(function(rowId) {
    return new lf.Row(rowId, {});
  }, this);
  return [lf.proc.Relation.fromRows(rows, [this.index.tableName])];
};

goog.provide("lf.proc.InsertOrReplaceStep");
goog.provide("lf.proc.InsertStep");
goog.require("lf.proc.PhysicalQueryPlanNode");
goog.require("lf.proc.Relation");
goog.require("lf.service");
lf.proc.InsertStep = function(global, table) {
  lf.proc.InsertStep.base(this, "constructor", 0, lf.proc.PhysicalQueryPlanNode.ExecType.NO_CHILD);
  this.indexStore_ = global.getService(lf.service.INDEX_STORE);
  this.table_ = table;
};
goog.inherits(lf.proc.InsertStep, lf.proc.PhysicalQueryPlanNode);
lf.proc.InsertStep.prototype.toString = function() {
  return "insert(" + this.table_.getName() + ")";
};
lf.proc.InsertStep.prototype.getScope = function() {
  return this.table_;
};
lf.proc.InsertStep.prototype.execInternal = function(journal, relations, context) {
  var queryContext = (context);
  lf.proc.InsertStep.assignAutoIncrementPks_(this.table_, queryContext.values, this.indexStore_);
  journal.insert(this.table_, queryContext.values);
  return [lf.proc.Relation.fromRows(queryContext.values, [this.table_.getName()])];
};
lf.proc.InsertStep.assignAutoIncrementPks_ = function(table, values, indexStore) {
  var pkIndexSchema = table.getConstraint().getPrimaryKey();
  var autoIncrement = goog.isNull(pkIndexSchema) ? false : pkIndexSchema.columns[0].autoIncrement;
  if (autoIncrement) {
    var pkColumnName = pkIndexSchema.columns[0].schema.getName();
    var index = indexStore.get(pkIndexSchema.getNormalizedName());
    var maxKey = index.max()[0] || 0;
    values.forEach(function(row) {
      if (row.payload()[pkColumnName] == 0 || !goog.isDefAndNotNull(row.payload()[pkColumnName])) {
        maxKey++;
        row.payload()[pkColumnName] = maxKey;
      }
    });
  }
};
lf.proc.InsertOrReplaceStep = function(global, table) {
  lf.proc.InsertOrReplaceStep.base(this, "constructor", 0, lf.proc.PhysicalQueryPlanNode.ExecType.NO_CHILD);
  this.indexStore_ = global.getService(lf.service.INDEX_STORE);
  this.table_ = table;
};
goog.inherits(lf.proc.InsertOrReplaceStep, lf.proc.PhysicalQueryPlanNode);
lf.proc.InsertOrReplaceStep.prototype.toString = function() {
  return "insert_replace(" + this.table_.getName() + ")";
};
lf.proc.InsertOrReplaceStep.prototype.getScope = function() {
  return this.table_;
};
lf.proc.InsertOrReplaceStep.prototype.execInternal = function(journal, relations, context) {
  var queryContext = (context);
  lf.proc.InsertStep.assignAutoIncrementPks_(this.table_, queryContext.values, this.indexStore_);
  journal.insertOrReplace(this.table_, queryContext.values);
  return [lf.proc.Relation.fromRows(queryContext.values, [this.table_.getName()])];
};

goog.provide("lf.proc.JoinStep");
goog.require("goog.Promise");
goog.require("goog.asserts");
goog.require("lf.proc.PhysicalQueryPlanNode");
lf.proc.JoinStep = function(predicate) {
  lf.proc.JoinStep.base(this, "constructor", 2, lf.proc.PhysicalQueryPlanNode.ExecType.ALL);
  this.predicate_ = predicate;
};
goog.inherits(lf.proc.JoinStep, lf.proc.PhysicalQueryPlanNode);
lf.proc.JoinStep.prototype.toString = function() {
  return "join(" + this.predicate_.toString() + ")";
};
lf.proc.JoinStep.prototype.execInternal = function(journal, relations) {
  return [this.predicate_.evalRelations(relations[0], relations[1])];
};

goog.provide("lf.proc.LimitSkipByIndexPass");
goog.require("lf.proc.IndexRangeScanStep");
goog.require("lf.proc.LimitStep");
goog.require("lf.proc.OrderByStep");
goog.require("lf.proc.ProjectStep");
goog.require("lf.proc.RewritePass");
goog.require("lf.proc.SelectStep");
goog.require("lf.proc.SkipStep");
goog.require("lf.tree");
lf.proc.LimitSkipByIndexPass = function() {
  lf.proc.LimitSkipByIndexPass.base(this, "constructor");
};
goog.inherits(lf.proc.LimitSkipByIndexPass, lf.proc.RewritePass);
lf.proc.LimitSkipByIndexPass.prototype.rewrite = function(rootNode) {
  var nodes = lf.tree.find(rootNode, function(node) {
    return node instanceof lf.proc.LimitStep || node instanceof lf.proc.SkipStep;
  });
  if (nodes.length == 0) {
    return rootNode;
  }
  var indexRangeScanStep = this.findIndexRangeScanStep_(rootNode);
  if (goog.isNull(indexRangeScanStep)) {
    return rootNode;
  }
  nodes.forEach(function(node) {
    this.mergeToIndexRangeScanStep_((node), (indexRangeScanStep));
  }, this);
  return (indexRangeScanStep.getRoot());
};
lf.proc.LimitSkipByIndexPass.prototype.mergeToIndexRangeScanStep_ = function(node, indexRangeScanStep) {
  if (node instanceof lf.proc.LimitStep) {
    indexRangeScanStep.useLimit = true;
  } else {
    indexRangeScanStep.useSkip = true;
  }
  return (lf.tree.removeNode(node).parent);
};
lf.proc.LimitSkipByIndexPass.prototype.findIndexRangeScanStep_ = function(rootNode) {
  var filterFn = function(node) {
    return node instanceof lf.proc.IndexRangeScanStep;
  };
  var stopFn = function(node) {
    var hasAggregators = node instanceof lf.proc.ProjectStep && node.hasAggregators();
    return hasAggregators || node instanceof lf.proc.OrderByStep || node.getChildCount() != 1 || node instanceof lf.proc.SelectStep;
  };
  var indexRangeScanSteps = (lf.tree.find(rootNode, filterFn, stopFn));
  return indexRangeScanSteps.length > 0 ? indexRangeScanSteps[0] : null;
};

goog.provide("lf.proc.LimitStep");
goog.require("lf.proc.PhysicalQueryPlanNode");
lf.proc.LimitStep = function() {
  lf.proc.LimitStep.base(this, "constructor", 1, lf.proc.PhysicalQueryPlanNode.ExecType.FIRST_CHILD);
};
goog.inherits(lf.proc.LimitStep, lf.proc.PhysicalQueryPlanNode);
lf.proc.LimitStep.prototype.toString = function() {
  return "limit(?)";
};
lf.proc.LimitStep.prototype.toContextString = function(context) {
  return this.toString().replace("?", context.limit.toString());
};
lf.proc.LimitStep.prototype.execInternal = function(journal, relations, context) {
  relations[0].entries.splice(context.limit);
  return relations;
};

goog.provide("lf.proc.LockManager");
goog.provide("lf.proc.LockType");
goog.require("goog.structs.Map");
goog.require("goog.structs.Set");
lf.proc.LockManager = function() {
  this.lockTable_ = new goog.structs.Map;
};
lf.proc.LockType = {EXCLUSIVE:0, RESERVED_READ_ONLY:1, RESERVED_READ_WRITE:2, SHARED:3};
lf.proc.LockManager.prototype.getEntry_ = function(dataItem) {
  var lockTableEntry = this.lockTable_.get(dataItem.getName(), null);
  if (goog.isNull(lockTableEntry)) {
    lockTableEntry = new lf.proc.LockTableEntry_;
    this.lockTable_.set(dataItem.getName(), lockTableEntry);
  }
  return lockTableEntry;
};
lf.proc.LockManager.prototype.grantLock_ = function(taskId, dataItems, lockType) {
  dataItems.forEach(function(dataItem) {
    var lockTableEntry = this.getEntry_(dataItem);
    lockTableEntry.grantLock(taskId, lockType);
  }, this);
};
lf.proc.LockManager.prototype.canAcquireLock_ = function(taskId, dataItems, lockType) {
  return dataItems.every(function(dataItem) {
    var lockTableEntry = this.getEntry_(dataItem);
    return lockTableEntry.canAcquireLock(taskId, lockType);
  }, this);
};
lf.proc.LockManager.prototype.requestLock = function(taskId, dataItems, lockType) {
  var canAcquireLock = this.canAcquireLock_(taskId, dataItems, lockType);
  if (canAcquireLock) {
    this.grantLock_(taskId, dataItems, lockType);
  }
  return canAcquireLock;
};
lf.proc.LockManager.prototype.releaseLock = function(taskId, dataItems) {
  dataItems.forEach(function(dataItem) {
    var lockTableEntry = this.getEntry_(dataItem);
    lockTableEntry.releaseLock(taskId);
  }, this);
};
lf.proc.LockManager.prototype.clearReservedLocks = function(dataItems) {
  dataItems.forEach(function(dataItem) {
    var lockTableEntry = this.getEntry_(dataItem);
    lockTableEntry.reservedReadWriteLock = null;
  }, this);
};
lf.proc.LockTableEntry_ = function() {
  this.exclusiveLock = null;
  this.reservedReadWriteLock = null;
  this.reservedReadOnlyLocks = null;
  this.sharedLocks = null;
};
lf.proc.LockTableEntry_.prototype.releaseLock = function(taskId) {
  if (this.exclusiveLock == taskId) {
    this.exclusiveLock = null;
  }
  if (this.reservedReadWriteLock == taskId) {
    this.reservedReadWriteLock = null;
  }
  if (!goog.isNull(this.reservedReadOnlyLocks)) {
    this.reservedReadOnlyLocks.remove(taskId);
  }
  if (!goog.isNull(this.sharedLocks)) {
    this.sharedLocks.remove(taskId);
  }
};
lf.proc.LockTableEntry_.prototype.canAcquireLock = function(taskId, lockType) {
  var noReservedReadOnlyLocksExist = goog.isNull(this.reservedReadOnlyLocks) || this.reservedReadOnlyLocks.isEmpty();
  if (lockType == lf.proc.LockType.EXCLUSIVE) {
    var noSharedLocksExist = goog.isNull(this.sharedLocks) || this.sharedLocks.isEmpty();
    return noSharedLocksExist && noReservedReadOnlyLocksExist && goog.isNull(this.exclusiveLock) && !goog.isNull(this.reservedReadWriteLock) && this.reservedReadWriteLock == taskId;
  } else {
    if (lockType == lf.proc.LockType.SHARED) {
      return goog.isNull(this.exclusiveLock) && goog.isNull(this.reservedReadWriteLock) && !goog.isNull(this.reservedReadOnlyLocks) && this.reservedReadOnlyLocks.contains(taskId);
    } else {
      if (lockType == lf.proc.LockType.RESERVED_READ_ONLY) {
        return goog.isNull(this.reservedReadWriteLock);
      } else {
        return noReservedReadOnlyLocksExist && (goog.isNull(this.reservedReadWriteLock) || this.reservedReadWriteLock == taskId);
      }
    }
  }
};
lf.proc.LockTableEntry_.prototype.grantLock = function(taskId, lockType) {
  if (lockType == lf.proc.LockType.EXCLUSIVE) {
    this.reservedReadWriteLock = null;
    this.exclusiveLock = taskId;
  } else {
    if (lockType == lf.proc.LockType.SHARED) {
      if (goog.isNull(this.sharedLocks)) {
        this.sharedLocks = new goog.structs.Set;
      }
      this.sharedLocks.add(taskId);
      if (goog.isNull(this.reservedReadOnlyLocks)) {
        this.reservedReadOnlyLocks = new goog.structs.Set;
      }
      this.reservedReadOnlyLocks.remove(taskId);
    } else {
      if (lockType == lf.proc.LockType.RESERVED_READ_ONLY) {
        if (goog.isNull(this.reservedReadOnlyLocks)) {
          this.reservedReadOnlyLocks = new goog.structs.Set;
        }
        this.reservedReadOnlyLocks.add(taskId);
      } else {
        if (lockType == lf.proc.LockType.RESERVED_READ_WRITE) {
          this.reservedReadWriteLock = taskId;
        }
      }
    }
  }
};

goog.provide("lf.proc.LogicalPlanFactory");
goog.require("lf.Exception");
goog.require("lf.proc.DeleteLogicalPlanGenerator");
goog.require("lf.proc.InsertLogicalPlanGenerator");
goog.require("lf.proc.SelectLogicalPlanGenerator");
goog.require("lf.proc.UpdateLogicalPlanGenerator");
goog.require("lf.query.DeleteContext");
goog.require("lf.query.InsertContext");
goog.require("lf.query.SelectContext");
goog.require("lf.query.UpdateContext");
lf.proc.LogicalPlanFactory = function() {
};
lf.proc.LogicalPlanFactory.prototype.create = function(query) {
  var generator = null;
  if (query instanceof lf.query.InsertContext) {
    generator = new lf.proc.InsertLogicalPlanGenerator(query);
  } else {
    if (query instanceof lf.query.DeleteContext) {
      generator = new lf.proc.DeleteLogicalPlanGenerator(query);
    } else {
      if (query instanceof lf.query.SelectContext) {
        generator = new lf.proc.SelectLogicalPlanGenerator(query);
      } else {
        if (query instanceof lf.query.UpdateContext) {
          generator = new lf.proc.UpdateLogicalPlanGenerator(query);
        } else {
          throw new lf.Exception(lf.Exception.Type.SYNTAX, "Unknown query context");
        }
      }
    }
  }
  return generator.generate();
};

goog.provide("lf.proc.BaseLogicalPlanGenerator");
goog.provide("lf.proc.InsertLogicalPlanGenerator");
goog.provide("lf.proc.LogicalPlanGenerator");
goog.provide("lf.proc.UpdateLogicalPlanGenerator");
goog.require("lf.proc.InsertNode");
goog.require("lf.proc.InsertOrReplaceNode");
goog.require("lf.proc.SelectNode");
goog.require("lf.proc.TableAccessNode");
goog.require("lf.proc.UpdateNode");
lf.proc.LogicalPlanGenerator = function() {
};
lf.proc.LogicalPlanGenerator.prototype.generate = function() {
};
lf.proc.BaseLogicalPlanGenerator = function(query) {
  this.query = query;
  this.rootNode_ = null;
};
lf.proc.BaseLogicalPlanGenerator.prototype.generate = function() {
  if (goog.isNull(this.rootNode_)) {
    this.rootNode_ = this.generateInternal();
  }
  return (this.rootNode_);
};
lf.proc.BaseLogicalPlanGenerator.prototype.generateInternal = goog.abstractMethod;
lf.proc.InsertLogicalPlanGenerator = function(query) {
  lf.proc.InsertLogicalPlanGenerator.base(this, "constructor", query);
};
goog.inherits(lf.proc.InsertLogicalPlanGenerator, lf.proc.BaseLogicalPlanGenerator);
lf.proc.InsertLogicalPlanGenerator.prototype.generateInternal = function() {
  return this.query.allowReplace ? new lf.proc.InsertOrReplaceNode(this.query.into, this.query.values) : new lf.proc.InsertNode(this.query.into, this.query.values);
};
lf.proc.UpdateLogicalPlanGenerator = function(query) {
  lf.proc.UpdateLogicalPlanGenerator.base(this, "constructor", query);
};
goog.inherits(lf.proc.UpdateLogicalPlanGenerator, lf.proc.BaseLogicalPlanGenerator);
lf.proc.UpdateLogicalPlanGenerator.prototype.generateInternal = function() {
  var updateNode = new lf.proc.UpdateNode(this.query.table, this.query.set);
  var selectNode = goog.isDefAndNotNull(this.query.where) ? new lf.proc.SelectNode(this.query.where.copy()) : null;
  var tableAccessNode = new lf.proc.TableAccessNode(this.query.table);
  if (goog.isNull(selectNode)) {
    updateNode.addChild(tableAccessNode);
  } else {
    selectNode.addChild(tableAccessNode);
    updateNode.addChild(selectNode);
  }
  return updateNode;
};

goog.provide("lf.proc.LogicalPlanRewriter");
goog.require("lf.proc.LogicalPlanGenerator");
lf.proc.LogicalPlanRewriter = function(rootNode, rewritePasses) {
  this.rootNode_ = rootNode;
  this.rewritePasses_ = rewritePasses;
};
lf.proc.LogicalPlanRewriter.prototype.generate = function() {
  this.rewritePasses_.forEach(function(rewritePass) {
    this.rootNode_ = rewritePass.rewrite(this.rootNode_);
  }, this);
  return this.rootNode_;
};

goog.provide("lf.proc.AggregationNode");
goog.provide("lf.proc.CrossProductNode");
goog.provide("lf.proc.DeleteNode");
goog.provide("lf.proc.GroupByNode");
goog.provide("lf.proc.InsertNode");
goog.provide("lf.proc.InsertOrReplaceNode");
goog.provide("lf.proc.JoinNode");
goog.provide("lf.proc.LimitNode");
goog.provide("lf.proc.LogicalQueryPlanNode");
goog.provide("lf.proc.OrderByNode");
goog.provide("lf.proc.ProjectNode");
goog.provide("lf.proc.SelectNode");
goog.provide("lf.proc.SkipNode");
goog.provide("lf.proc.TableAccessNode");
goog.provide("lf.proc.UpdateNode");
goog.require("goog.structs.TreeNode");
goog.require("lf.query.SelectContext");
lf.proc.LogicalQueryPlanNode = function() {
  lf.proc.LogicalQueryPlanNode.base(this, "constructor", "", "");
};
goog.inherits(lf.proc.LogicalQueryPlanNode, goog.structs.TreeNode);
lf.proc.InsertNode = function(table, values) {
  lf.proc.InsertNode.base(this, "constructor");
  this.table = table;
  this.values = values;
};
goog.inherits(lf.proc.InsertNode, lf.proc.LogicalQueryPlanNode);
lf.proc.InsertOrReplaceNode = function(table, values) {
  lf.proc.InsertOrReplaceNode.base(this, "constructor", table, values);
};
goog.inherits(lf.proc.InsertOrReplaceNode, lf.proc.InsertNode);
lf.proc.DeleteNode = function(table) {
  lf.proc.DeleteNode.base(this, "constructor");
  this.table = table;
};
goog.inherits(lf.proc.DeleteNode, lf.proc.LogicalQueryPlanNode);
lf.proc.DeleteNode.prototype.toString = function() {
  return "delete(" + this.table.getName() + ")";
};
lf.proc.UpdateNode = function(table, updates) {
  lf.proc.UpdateNode.base(this, "constructor");
  this.table = table;
  this.updates = updates;
};
goog.inherits(lf.proc.UpdateNode, lf.proc.LogicalQueryPlanNode);
lf.proc.UpdateNode.prototype.toString = function() {
  var columns = [];
  if (this.updates) {
    columns = this.updates.map(function(update) {
      return update.column.getName();
    }, this);
  }
  return "update(" + this.table.getName() + ", [" + columns.join(",") + "])";
};
lf.proc.SelectNode = function(predicate) {
  lf.proc.SelectNode.base(this, "constructor");
  this.predicate = predicate;
};
goog.inherits(lf.proc.SelectNode, lf.proc.LogicalQueryPlanNode);
lf.proc.SelectNode.prototype.toString = function() {
  return "select(" + this.predicate.toString() + ")";
};
lf.proc.TableAccessNode = function(table) {
  lf.proc.TableAccessNode.base(this, "constructor");
  this.table = table;
};
goog.inherits(lf.proc.TableAccessNode, lf.proc.LogicalQueryPlanNode);
lf.proc.TableAccessNode.prototype.toString = function() {
  var out = "table_access(" + this.table.getName();
  if (!goog.isNull(this.table.getAlias())) {
    out += " as " + this.table.getAlias();
  }
  out += ")";
  return out;
};
lf.proc.CrossProductNode = function() {
  lf.proc.CrossProductNode.base(this, "constructor");
};
goog.inherits(lf.proc.CrossProductNode, lf.proc.LogicalQueryPlanNode);
lf.proc.CrossProductNode.prototype.toString = function() {
  return "cross_product";
};
lf.proc.ProjectNode = function(columns, groupByColumns) {
  lf.proc.ProjectNode.base(this, "constructor");
  this.columns = columns;
  this.groupByColumns = groupByColumns;
};
goog.inherits(lf.proc.ProjectNode, lf.proc.LogicalQueryPlanNode);
lf.proc.ProjectNode.prototype.toString = function() {
  var string = "project(" + this.columns.toString();
  if (!goog.isNull(this.groupByColumns)) {
    var groupBy = this.groupByColumns.map(function(col) {
      return col.getNormalizedName();
    }).join(", ");
    string += ", groupBy(" + groupBy + ")";
  }
  string += ")";
  return string;
};
lf.proc.OrderByNode = function(orderBy) {
  lf.proc.OrderByNode.base(this, "constructor");
  this.orderBy = orderBy;
};
goog.inherits(lf.proc.OrderByNode, lf.proc.LogicalQueryPlanNode);
lf.proc.OrderByNode.prototype.toString = function() {
  return "order_by(" + lf.query.SelectContext.orderByToString(this.orderBy) + ")";
};
lf.proc.AggregationNode = function(columns) {
  lf.proc.AggregationNode.base(this, "constructor");
  this.columns = columns;
};
goog.inherits(lf.proc.AggregationNode, lf.proc.LogicalQueryPlanNode);
lf.proc.AggregationNode.prototype.toString = function() {
  return "aggregation(" + this.columns.toString() + ")";
};
lf.proc.GroupByNode = function(columns) {
  lf.proc.GroupByNode.base(this, "constructor");
  this.columns = columns;
};
goog.inherits(lf.proc.GroupByNode, lf.proc.LogicalQueryPlanNode);
lf.proc.GroupByNode.prototype.toString = function() {
  return "group_by(" + this.columns.toString() + ")";
};
lf.proc.LimitNode = function(limit) {
  lf.proc.LimitNode.base(this, "constructor");
  this.limit = limit;
};
goog.inherits(lf.proc.LimitNode, lf.proc.LogicalQueryPlanNode);
lf.proc.LimitNode.prototype.toString = function() {
  return "limit(" + this.limit + ")";
};
lf.proc.SkipNode = function(skip) {
  lf.proc.SkipNode.base(this, "constructor");
  this.skip = skip;
};
goog.inherits(lf.proc.SkipNode, lf.proc.LogicalQueryPlanNode);
lf.proc.SkipNode.prototype.toString = function() {
  return "skip(" + this.skip + ")";
};
lf.proc.JoinNode = function(predicate) {
  lf.proc.JoinNode.base(this, "constructor");
  this.predicate = predicate;
};
goog.inherits(lf.proc.JoinNode, lf.proc.LogicalQueryPlanNode);
lf.proc.JoinNode.prototype.toString = function() {
  return "join(" + this.predicate.toString() + ")";
};

goog.provide("lf.proc.ObserverQueryTask");
goog.require("lf.proc.QueryTask");
goog.require("lf.proc.TaskPriority");
goog.require("lf.service");
lf.proc.ObserverQueryTask = function(global, items) {
  lf.proc.ObserverQueryTask.base(this, "constructor", global, items);
  this.observerRegistry_ = global.getService(lf.service.OBSERVER_REGISTRY);
};
goog.inherits(lf.proc.ObserverQueryTask, lf.proc.QueryTask);
lf.proc.ObserverQueryTask.prototype.getPriority = function() {
  return lf.proc.TaskPriority.OBSERVER_QUERY_TASK;
};
lf.proc.ObserverQueryTask.prototype.onSuccess = function(results) {
  var queries = (this.queries);
  queries.forEach(function(query, index) {
    this.observerRegistry_.updateResultsForQuery(query, results[index]);
  }, this);
};

goog.provide("lf.proc.OrderByIndexPass");
goog.require("goog.asserts");
goog.require("lf.Order");
goog.require("lf.proc.IndexRangeScanStep");
goog.require("lf.proc.NotBoundKeyRangeCalculator");
goog.require("lf.proc.OrderByStep");
goog.require("lf.proc.RewritePass");
goog.require("lf.proc.TableAccessByRowIdStep");
goog.require("lf.proc.TableAccessFullStep");
goog.require("lf.tree");
lf.proc.OrderByIndexPass = function(global) {
  lf.proc.OrderByIndexPass.base(this, "constructor");
  this.global_ = global;
};
goog.inherits(lf.proc.OrderByIndexPass, lf.proc.RewritePass);
lf.proc.OrderByIndexPass.prototype.rewrite = function(rootNode) {
  var orderByStep = lf.proc.OrderByIndexPass.findOrderByStep_(rootNode);
  if (goog.isNull(orderByStep)) {
    return rootNode;
  }
  var newSubtreeRoot = this.applyTableAccessFullOptimization_(orderByStep);
  if (newSubtreeRoot == orderByStep) {
    newSubtreeRoot = this.applyIndexRangeScanStepOptimization_(orderByStep);
  }
  return (newSubtreeRoot.getRoot());
};
lf.proc.OrderByIndexPass.prototype.applyTableAccessFullOptimization_ = function(orderByStep) {
  var rootNode = orderByStep;
  var tableAccessFullStep = lf.proc.OrderByIndexPass.findTableAccessFullStep_((orderByStep.getChildAt(0)));
  if (!goog.isNull(tableAccessFullStep)) {
    var indexRangeCandidate = lf.proc.OrderByIndexPass.findIndexCandidateForOrderBy_(tableAccessFullStep.table, orderByStep.orderBy);
    if (goog.isNull(indexRangeCandidate)) {
      return rootNode;
    }
    var indexRangeScanStep = new lf.proc.IndexRangeScanStep(this.global_, indexRangeCandidate.indexSchema, new lf.proc.NotBoundKeyRangeCalculator(indexRangeCandidate.indexSchema), indexRangeCandidate.isReverse);
    var tableAccessByRowIdStep = new lf.proc.TableAccessByRowIdStep(this.global_, tableAccessFullStep.table);
    tableAccessByRowIdStep.addChild(indexRangeScanStep);
    lf.tree.removeNode(orderByStep);
    rootNode = (lf.tree.replaceNodeWithChain(tableAccessFullStep, tableAccessByRowIdStep, indexRangeScanStep));
  }
  return rootNode;
};
lf.proc.OrderByIndexPass.prototype.applyIndexRangeScanStepOptimization_ = function(orderByStep) {
  var rootNode = orderByStep;
  var indexRangeScanStep = lf.proc.OrderByIndexPass.findIndexRangeScanStep_((orderByStep.getChildAt(0)));
  if (!goog.isNull(indexRangeScanStep)) {
    var indexRangeCandidate = lf.proc.OrderByIndexPass.getIndexCandidateForIndexSchema_(indexRangeScanStep.index, orderByStep.orderBy);
    if (goog.isNull(indexRangeCandidate)) {
      return rootNode;
    }
    indexRangeScanStep.reverseOrder = indexRangeCandidate.isReverse;
    rootNode = (lf.tree.removeNode(orderByStep).parent);
  }
  return rootNode;
};
lf.proc.OrderByIndexPass.findIndexRangeScanStep_ = function(rootNode) {
  var filterFn = function(node) {
    return node instanceof lf.proc.IndexRangeScanStep;
  };
  var stopFn = function(node) {
    return node.getChildCount() != 1;
  };
  var indexRangeScanSteps = (lf.tree.find(rootNode, filterFn, stopFn));
  return indexRangeScanSteps.length > 0 ? indexRangeScanSteps[0] : null;
};
lf.proc.OrderByIndexPass.findTableAccessFullStep_ = function(rootNode) {
  var filterFn = function(node) {
    return node instanceof lf.proc.TableAccessFullStep;
  };
  var stopFn = function(node) {
    return node.getChildCount() != 1;
  };
  var tableAccessFullSteps = (lf.tree.find(rootNode, filterFn, stopFn));
  return tableAccessFullSteps.length > 0 ? tableAccessFullSteps[0] : null;
};
lf.proc.OrderByIndexPass.findOrderByStep_ = function(rootNode) {
  var filterFn = function(node) {
    return node instanceof lf.proc.OrderByStep;
  };
  var orderBySteps = lf.tree.find(rootNode, filterFn);
  return orderBySteps.length > 0 ? (orderBySteps[0]) : null;
};
lf.proc.OrderByIndexPass.findIndexCandidateForOrderBy_ = function(tableSchema, orderBy) {
  var indexCandidate = null;
  var indexSchemas = tableSchema.getIndices();
  for (var i = 0;i < indexSchemas.length && goog.isNull(indexCandidate);i++) {
    indexCandidate = lf.proc.OrderByIndexPass.getIndexCandidateForIndexSchema_(indexSchemas[i], orderBy);
  }
  return indexCandidate;
};
lf.proc.OrderByIndexPass.getIndexCandidateForIndexSchema_ = function(indexSchema, orderBy) {
  var columnsMatch = indexSchema.columns.length == orderBy.length && orderBy.every(function(singleOrderBy, j) {
    var indexedColumn = indexSchema.columns[j];
    return singleOrderBy.column.getName() == indexedColumn.schema.getName();
  });
  if (!columnsMatch) {
    return null;
  }
  var isNaturalOrReverse = lf.proc.OrderByIndexPass.checkOrder_(orderBy, indexSchema);
  if (!isNaturalOrReverse[0] && !isNaturalOrReverse[1]) {
    return null;
  }
  return {indexSchema:indexSchema, isReverse:isNaturalOrReverse[1]};
};
lf.proc.OrderByIndexPass.IndexRangeCandidate_;
lf.proc.OrderByIndexPass.checkOrder_ = function(orderBy, indexSchema) {
  var ordersLeftBitmask = orderBy.reduce(function(soFar, columnOrderBy) {
    return soFar << 1 | (columnOrderBy.order == lf.Order.DESC ? 0 : 1);
  }, 0);
  var ordersRightBitmask = indexSchema.columns.reduce(function(soFar, indexedColumn) {
    return soFar << 1 | (indexedColumn.order == lf.Order.DESC ? 0 : 1);
  }, 0);
  var xorBitmask = ordersLeftBitmask ^ ordersRightBitmask;
  var isNatural = xorBitmask == 0;
  var isReverse = xorBitmask == Math.pow(2, Math.max(orderBy.length, indexSchema.columns.length)) - 1;
  return [isNatural, isReverse];
};

goog.provide("lf.proc.OrderByStep");
goog.require("lf.Order");
goog.require("lf.fn");
goog.require("lf.fn.AggregatedColumn");
goog.require("lf.proc.PhysicalQueryPlanNode");
goog.require("lf.query.SelectContext");
lf.proc.OrderByStep = function(orderBy) {
  lf.proc.OrderByStep.base(this, "constructor", lf.proc.PhysicalQueryPlanNode.ANY, lf.proc.PhysicalQueryPlanNode.ExecType.FIRST_CHILD);
  this.orderBy = orderBy;
};
goog.inherits(lf.proc.OrderByStep, lf.proc.PhysicalQueryPlanNode);
lf.proc.OrderByStep.prototype.toString = function() {
  return "order_by(" + lf.query.SelectContext.orderByToString(this.orderBy) + ")";
};
lf.proc.OrderByStep.prototype.execInternal = function(journal, relations) {
  if (relations.length == 1) {
    var distinctColumn = this.findDistinctColumn_(relations[0]);
    var relationToSort = goog.isNull(distinctColumn) ? relations[0] : relations[0].getAggregationResult(distinctColumn);
    relationToSort.entries.sort(this.entryComparatorFn_.bind(this));
  } else {
    relations.sort(this.relationComparatorFn_.bind(this));
  }
  return relations;
};
lf.proc.OrderByStep.prototype.findDistinctColumn_ = function(relation) {
  var distinctColumn = null;
  for (var i = 0;i < this.orderBy.length;i++) {
    var tempDistinctColumn = lf.fn.distinct((this.orderBy[i].column));
    if (relation.hasAggregationResult(tempDistinctColumn)) {
      distinctColumn = tempDistinctColumn;
      break;
    }
  }
  return distinctColumn;
};
lf.proc.OrderByStep.prototype.comparator_ = function(getLeftPayload, getRightPayload) {
  var order = null;
  var leftPayload = null;
  var rightPayload = null;
  var comparisonIndex = -1;
  do {
    comparisonIndex++;
    var column = this.orderBy[comparisonIndex].column;
    order = this.orderBy[comparisonIndex].order;
    leftPayload = getLeftPayload(column);
    rightPayload = getRightPayload(column);
  } while (leftPayload == rightPayload && comparisonIndex + 1 < this.orderBy.length);
  var result = leftPayload < rightPayload ? -1 : leftPayload > rightPayload ? 1 : 0;
  result = order == lf.Order.ASC ? result : -result;
  return result;
};
lf.proc.OrderByStep.prototype.relationComparatorFn_ = function(lhs, rhs) {
  return this.comparator_(function(column) {
    return column instanceof lf.fn.AggregatedColumn ? lhs.getAggregationResult(column) : lhs.entries[lhs.entries.length - 1].getField(column);
  }, function(column) {
    return column instanceof lf.fn.AggregatedColumn ? rhs.getAggregationResult(column) : rhs.entries[rhs.entries.length - 1].getField(column);
  });
};
lf.proc.OrderByStep.prototype.entryComparatorFn_ = function(lhs, rhs) {
  return this.comparator_(function(column) {
    return lhs.getField(column);
  }, function(column) {
    return rhs.getField(column);
  });
};

goog.provide("lf.proc.PhysicalPlanFactory");
goog.require("lf.Exception");
goog.require("lf.proc.AggregationNode");
goog.require("lf.proc.AggregationStep");
goog.require("lf.proc.CrossProductNode");
goog.require("lf.proc.CrossProductStep");
goog.require("lf.proc.DeleteNode");
goog.require("lf.proc.DeleteStep");
goog.require("lf.proc.GroupByNode");
goog.require("lf.proc.GroupByStep");
goog.require("lf.proc.IndexRangeScanPass");
goog.require("lf.proc.InsertNode");
goog.require("lf.proc.InsertOrReplaceNode");
goog.require("lf.proc.InsertOrReplaceStep");
goog.require("lf.proc.InsertStep");
goog.require("lf.proc.JoinNode");
goog.require("lf.proc.JoinStep");
goog.require("lf.proc.LimitNode");
goog.require("lf.proc.LimitSkipByIndexPass");
goog.require("lf.proc.LimitStep");
goog.require("lf.proc.OrderByIndexPass");
goog.require("lf.proc.OrderByNode");
goog.require("lf.proc.OrderByStep");
goog.require("lf.proc.PhysicalPlanRewriter");
goog.require("lf.proc.PhysicalQueryPlan");
goog.require("lf.proc.ProjectNode");
goog.require("lf.proc.ProjectStep");
goog.require("lf.proc.SelectNode");
goog.require("lf.proc.SelectStep");
goog.require("lf.proc.SkipNode");
goog.require("lf.proc.SkipStep");
goog.require("lf.proc.TableAccessFullStep");
goog.require("lf.proc.TableAccessNode");
goog.require("lf.proc.UpdateNode");
goog.require("lf.proc.UpdateStep");
goog.require("lf.tree");
lf.proc.PhysicalPlanFactory = function(global) {
  this.global_ = global;
};
lf.proc.PhysicalPlanFactory.prototype.create = function(logicalQueryPlanRoot, queryContext) {
  if (logicalQueryPlanRoot instanceof lf.proc.InsertOrReplaceNode || logicalQueryPlanRoot instanceof lf.proc.InsertNode) {
    return this.createPlan_(logicalQueryPlanRoot, queryContext);
  }
  if (logicalQueryPlanRoot instanceof lf.proc.ProjectNode || logicalQueryPlanRoot instanceof lf.proc.LimitNode || logicalQueryPlanRoot instanceof lf.proc.SkipNode) {
    return this.createPlan_(logicalQueryPlanRoot, queryContext, [new lf.proc.IndexRangeScanPass(this.global_), new lf.proc.OrderByIndexPass(this.global_), new lf.proc.LimitSkipByIndexPass]);
  }
  if (logicalQueryPlanRoot instanceof lf.proc.DeleteNode || logicalQueryPlanRoot instanceof lf.proc.UpdateNode) {
    return this.createPlan_(logicalQueryPlanRoot, queryContext, [new lf.proc.IndexRangeScanPass(this.global_)]);
  }
  throw new lf.Exception(lf.Exception.Type.NOT_SUPPORTED, "Unknown query plan node");
};
lf.proc.PhysicalPlanFactory.prototype.createPlan_ = function(rootNode, queryContext, opt_rewritePasses) {
  var rootStep = lf.tree.map(rootNode, goog.bind(this.mapFn_, this));
  if (goog.isDefAndNotNull(opt_rewritePasses)) {
    var planRewriter = new lf.proc.PhysicalPlanRewriter(rootStep, queryContext, opt_rewritePasses);
    return new lf.proc.PhysicalQueryPlan(planRewriter.generate());
  } else {
    return new lf.proc.PhysicalQueryPlan(rootStep);
  }
};
lf.proc.PhysicalPlanFactory.prototype.mapFn_ = function(node) {
  if (node instanceof lf.proc.ProjectNode) {
    return new lf.proc.ProjectStep(node.columns, node.groupByColumns);
  } else {
    if (node instanceof lf.proc.GroupByNode) {
      return new lf.proc.GroupByStep(node.columns);
    } else {
      if (node instanceof lf.proc.AggregationNode) {
        return new lf.proc.AggregationStep(node.columns);
      } else {
        if (node instanceof lf.proc.OrderByNode) {
          return new lf.proc.OrderByStep(node.orderBy);
        } else {
          if (node instanceof lf.proc.SkipNode) {
            return new lf.proc.SkipStep;
          } else {
            if (node instanceof lf.proc.LimitNode) {
              return new lf.proc.LimitStep;
            } else {
              if (node instanceof lf.proc.SelectNode) {
                return new lf.proc.SelectStep(node.predicate.getId());
              } else {
                if (node instanceof lf.proc.CrossProductNode) {
                  return new lf.proc.CrossProductStep;
                } else {
                  if (node instanceof lf.proc.JoinNode) {
                    return new lf.proc.JoinStep(node.predicate);
                  } else {
                    if (node instanceof lf.proc.TableAccessNode) {
                      return new lf.proc.TableAccessFullStep(this.global_, node.table);
                    } else {
                      if (node instanceof lf.proc.DeleteNode) {
                        return new lf.proc.DeleteStep(node.table);
                      } else {
                        if (node instanceof lf.proc.UpdateNode) {
                          return new lf.proc.UpdateStep(node.table, node.updates);
                        } else {
                          if (node instanceof lf.proc.InsertOrReplaceNode) {
                            return new lf.proc.InsertOrReplaceStep(this.global_, node.table);
                          } else {
                            if (node instanceof lf.proc.InsertNode) {
                              return new lf.proc.InsertStep(this.global_, node.table);
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  throw new lf.Exception(lf.Exception.Type.NOT_SUPPORTED, "Unknown node type");
};

goog.provide("lf.proc.PhysicalPlanRewriter");
lf.proc.PhysicalPlanRewriter = function(rootNode, queryContext, rewritePasses) {
  this.rootNode_ = rootNode;
  this.queryContext_ = queryContext;
  this.rewritePasses_ = rewritePasses;
};
lf.proc.PhysicalPlanRewriter.prototype.generate = function() {
  this.rewritePasses_.forEach(function(rewritePass) {
    this.rootNode_ = rewritePass.rewrite(this.rootNode_, this.queryContext_);
  }, this);
  return this.rootNode_;
};

goog.provide("lf.proc.PhysicalQueryPlan");
goog.require("goog.Promise");
goog.require("goog.structs.Set");
lf.proc.PhysicalQueryPlan = function(rootNode) {
  this.rootNode_ = rootNode;
};
lf.proc.PhysicalQueryPlan.prototype.getRoot = function() {
  return this.rootNode_;
};
lf.proc.PhysicalQueryPlan.prototype.explain = function() {
  return "plan description";
};
lf.proc.PhysicalQueryPlan.prototype.getScope = function() {
  var scope = new goog.structs.Set;
  var traverse = function(node) {
    var table = node.getScope();
    if (table) {
      scope.add(table);
    }
    node.getChildren().forEach(function(child) {
      traverse((child));
    });
  };
  traverse(this.rootNode_);
  return scope.getValues();
};
lf.proc.PhysicalQueryPlan.getCombinedScope = function(plans) {
  var tableSet = new goog.structs.Set;
  plans.forEach(function(plan) {
    tableSet.addAll(plan.getScope());
  });
  return tableSet;
};

goog.provide("lf.proc.PhysicalQueryPlanNode");
goog.require("goog.Promise");
goog.require("goog.asserts");
goog.require("goog.structs.TreeNode");
goog.forwardDeclare("lf.cache.Journal");
goog.forwardDeclare("lf.query.Context");
goog.forwardDeclare("lf.schema.Table");
lf.proc.PhysicalQueryPlanNode = function(numRelations, type) {
  lf.proc.PhysicalQueryPlanNode.base(this, "constructor", "", "");
  this.execType_ = type;
  this.numRelations_ = numRelations;
};
goog.inherits(lf.proc.PhysicalQueryPlanNode, goog.structs.TreeNode);
lf.proc.PhysicalQueryPlanNode.ExecType = {NO_CHILD:-1, ALL:0, FIRST_CHILD:1};
lf.proc.PhysicalQueryPlanNode.ANY = -1;
lf.proc.PhysicalQueryPlanNode.prototype.getScope = function() {
  return null;
};
lf.proc.PhysicalQueryPlanNode.prototype.execInternal = goog.abstractMethod;
lf.proc.PhysicalQueryPlanNode.prototype.exec = function(journal, opt_context) {
  switch(this.execType_) {
    case lf.proc.PhysicalQueryPlanNode.ExecType.FIRST_CHILD:
      return this.execFirstChild_(journal, opt_context);
    case lf.proc.PhysicalQueryPlanNode.ExecType.ALL:
      return this.execAllChildren_(journal, opt_context);
    default:
      return this.execNoChild_(journal, opt_context);
  }
};
lf.proc.PhysicalQueryPlanNode.prototype.toString = function() {
  return "dummy_node";
};
lf.proc.PhysicalQueryPlanNode.prototype.toContextString = function(context) {
  return this.toString();
};
lf.proc.PhysicalQueryPlanNode.prototype.assertInput_ = function(relations) {
  goog.asserts.assert(this.numRelations_ == lf.proc.PhysicalQueryPlanNode.ANY || relations.length == this.numRelations_);
};
lf.proc.PhysicalQueryPlanNode.prototype.execNoChild_ = function(journal, opt_context) {
  return new goog.Promise(goog.bind(function(resolve, reject) {
    resolve(this.execInternal(journal, [], opt_context));
  }, this));
};
lf.proc.PhysicalQueryPlanNode.prototype.execFirstChild_ = function(journal, opt_context) {
  return this.getChildAt(0).exec(journal, opt_context).then(goog.bind(function(results) {
    this.assertInput_(results);
    return this.execInternal(journal, results, opt_context);
  }, this));
};
lf.proc.PhysicalQueryPlanNode.prototype.execAllChildren_ = function(journal, opt_context) {
  var promises = this.getChildren().map(function(child) {
    return child.exec(journal, opt_context);
  });
  return goog.Promise.all(promises).then(goog.bind(function(results) {
    var relations = [];
    results.forEach(function(result) {
      for (var i = 0;i < result.length;++i) {
        relations.push(result[i]);
      }
    });
    this.assertInput_(relations);
    return this.execInternal(journal, relations, opt_context);
  }, this));
};

goog.provide("lf.proc.ProjectStep");
goog.require("goog.labs.structs.Multimap");
goog.require("lf.fn.AggregatedColumn");
goog.require("lf.proc.PhysicalQueryPlanNode");
goog.require("lf.proc.Relation");
goog.require("lf.proc.RelationTransformer");
lf.proc.ProjectStep = function(columns, groupByColumns) {
  lf.proc.ProjectStep.base(this, "constructor", lf.proc.PhysicalQueryPlanNode.ANY, lf.proc.PhysicalQueryPlanNode.ExecType.FIRST_CHILD);
  this.columns = columns;
  this.groupByColumns = groupByColumns;
};
goog.inherits(lf.proc.ProjectStep, lf.proc.PhysicalQueryPlanNode);
lf.proc.ProjectStep.prototype.toString = function() {
  var string = "project(" + this.columns.toString();
  if (!goog.isNull(this.groupByColumns)) {
    var groupBy = this.groupByColumns.map(function(col) {
      return col.getNormalizedName();
    }).join(", ");
    string += ", groupBy(" + groupBy + ")";
  }
  string += ")";
  return string;
};
lf.proc.ProjectStep.prototype.execInternal = function(journal, relations) {
  if (relations.length == 0) {
    return [lf.proc.Relation.createEmpty()];
  } else {
    if (relations.length == 1) {
      return [this.execNonGroupByProjection_(relations[0])];
    } else {
      return [this.execGroupByProjection_(relations)];
    }
  }
};
lf.proc.ProjectStep.prototype.hasAggregators = function() {
  var hasAggregators = this.columns.some(function(column) {
    return column instanceof lf.fn.AggregatedColumn;
  });
  return hasAggregators || !goog.isNull(this.groupByColumns);
};
lf.proc.ProjectStep.prototype.execGroupByProjection_ = function(relations) {
  return lf.proc.RelationTransformer.transformMany(relations, this.columns);
};
lf.proc.ProjectStep.prototype.execNonGroupByProjection_ = function(relation) {
  if (this.columns.length == 0) {
    return relation;
  }
  var relationTransformer = new lf.proc.RelationTransformer(relation, this.columns);
  return relationTransformer.getTransformed();
};

goog.provide("lf.proc.PushDownSelectionsPass");
goog.require("goog.structs.Set");
goog.require("lf.pred.CombinedPredicate");
goog.require("lf.pred.ValuePredicate");
goog.require("lf.proc.CrossProductNode");
goog.require("lf.proc.JoinNode");
goog.require("lf.proc.RewritePass");
goog.require("lf.proc.SelectNode");
goog.require("lf.proc.TableAccessNode");
goog.require("lf.tree");
lf.proc.PushDownSelectionsPass = function() {
  lf.proc.PushDownSelectionsPass.base(this, "constructor");
  this.alreadyPushedDown_ = new goog.structs.Set;
};
goog.inherits(lf.proc.PushDownSelectionsPass, lf.proc.RewritePass);
lf.proc.PushDownSelectionsPass.prototype.rewrite = function(rootNode) {
  this.rootNode = rootNode;
  this.traverse_(this.rootNode);
  this.alreadyPushedDown_.clear();
  return this.rootNode;
};
lf.proc.PushDownSelectionsPass.prototype.traverse_ = function(node) {
  if (this.isCandidateNode_(node)) {
    var selectNode = (node);
    var newRoot = selectNode.predicate instanceof lf.pred.ValuePredicate ? this.pushDownValuePredNodeRec_(selectNode) : this.pushDownJoinPredNodeRec_(selectNode);
    this.alreadyPushedDown_.add(selectNode);
    if (newRoot == selectNode) {
      newRoot = selectNode.getChildAt(0);
    }
    if (!goog.isNull(newRoot)) {
      if (goog.isNull(newRoot.getParent())) {
        this.rootNode = (newRoot);
      }
      if (this.isCandidateNode_(newRoot) && !this.alreadyPushedDown_.contains(newRoot)) {
        this.traverse_((newRoot));
      }
    }
    return;
  }
  node.getChildren().forEach(function(child) {
    this.traverse_((child));
  }, this);
};
lf.proc.PushDownSelectionsPass.prototype.pushDownNodeRec_ = function(node, shouldPushDownFn) {
  var newRoot = node;
  if (this.shouldSwapWithChild_(node)) {
    newRoot = lf.tree.swapNodeWithChild(node);
    this.pushDownNodeRec_(node, shouldPushDownFn);
  } else {
    if (this.shouldPushBelowChild_(node)) {
      var newNodes = [];
      var cloneFn = function(node) {
        var newNode = new lf.proc.SelectNode(node.predicate);
        newNodes.push(newNode);
        return newNode;
      };
      newRoot = lf.tree.pushNodeBelowChild(node, shouldPushDownFn, cloneFn);
      newNodes.forEach(function(newNode) {
        this.pushDownNodeRec_(newNode, shouldPushDownFn);
      }, this);
    }
  }
  return (newRoot);
};
lf.proc.PushDownSelectionsPass.prototype.pushDownValuePredNodeRec_ = function(node) {
  var selectNodeTables = new goog.structs.Set([node.predicate.column.getTable().getEffectiveName()]);
  var shouldPushDownFn = function(child) {
    return this.doesReferToTables_(child, selectNodeTables);
  }.bind(this);
  return this.pushDownNodeRec_(node, shouldPushDownFn);
};
lf.proc.PushDownSelectionsPass.prototype.pushDownJoinPredNodeRec_ = function(node) {
  var selectNodeTables = new goog.structs.Set([node.predicate.leftColumn.getTable().getEffectiveName(), node.predicate.rightColumn.getTable().getEffectiveName()]);
  var shouldPushDownFn = function(child) {
    return this.doesReferToTables_(child, selectNodeTables);
  }.bind(this);
  return this.pushDownNodeRec_(node, shouldPushDownFn);
};
lf.proc.PushDownSelectionsPass.prototype.doesReferToTables_ = function(root, tables) {
  var referredTables = new goog.structs.Set;
  lf.tree.getLeafNodes(root).forEach(function(tableAccessNode) {
    referredTables.add(tableAccessNode.table.getEffectiveName());
  }, this);
  if (root instanceof lf.proc.TableAccessNode) {
    referredTables.add(root.table.getEffectiveName());
  }
  return referredTables.containsAll(tables);
};
lf.proc.PushDownSelectionsPass.prototype.isCandidateNode_ = function(node) {
  return node instanceof lf.proc.SelectNode && !(node.predicate instanceof lf.pred.CombinedPredicate);
};
lf.proc.PushDownSelectionsPass.prototype.shouldPushBelowChild_ = function(node) {
  var child = node.getChildAt(0);
  return child instanceof lf.proc.CrossProductNode || child instanceof lf.proc.JoinNode;
};
lf.proc.PushDownSelectionsPass.prototype.shouldSwapWithChild_ = function(node) {
  return node.getChildAt(0) instanceof lf.proc.SelectNode;
};

goog.provide("lf.proc.QueryEngine");
lf.proc.QueryEngine = function() {
};
lf.proc.QueryEngine.prototype.getPlan;

goog.provide("lf.proc.QueryTask");
goog.require("goog.Promise");
goog.require("lf.TransactionType");
goog.require("lf.cache.Journal");
goog.require("lf.proc.PhysicalQueryPlan");
goog.require("lf.proc.Task");
goog.require("lf.query.SelectContext");
goog.require("lf.service");
lf.proc.QueryTask = function(global, items) {
  this.global = global;
  this.backStore_ = global.getService(lf.service.BACK_STORE);
  this.queries = items.map(function(item) {
    return item.context;
  });
  this.plans_ = items.map(function(item) {
    return item.plan;
  });
  this.combinedScope_ = lf.proc.PhysicalQueryPlan.getCombinedScope(this.plans_);
  this.txType_ = this.detectType_();
  this.resolver_ = goog.Promise.withResolver();
};
lf.proc.QueryTask.prototype.detectType_ = function() {
  var txType = this.queries.some(function(query) {
    return !(query instanceof lf.query.SelectContext);
  }) ? lf.TransactionType.READ_WRITE : lf.TransactionType.READ_ONLY;
  return txType;
};
lf.proc.QueryTask.prototype.exec = function() {
  var journal = new lf.cache.Journal(this.global, this.combinedScope_.getValues());
  var results = [];
  var remainingPlans = this.plans_.slice();
  var sequentiallyExec = goog.bind(function() {
    var plan = remainingPlans.shift();
    if (plan) {
      var queryContext = this.queries[results.length];
      return plan.getRoot().exec(journal, queryContext).then(function(relations) {
        results.push(relations[0]);
        return sequentiallyExec();
      });
    }
    return goog.Promise.resolve();
  }, this);
  return sequentiallyExec().then(goog.bind(function() {
    var tx = this.backStore_.createTx(this.txType_, journal);
    return tx.commit();
  }, this)).then(goog.bind(function() {
    this.onSuccess(results);
    return results;
  }, this), goog.bind(function(e) {
    journal.rollback();
    throw e;
  }, this));
};
lf.proc.QueryTask.prototype.getType = function() {
  return this.txType_;
};
lf.proc.QueryTask.prototype.getScope = function() {
  return this.combinedScope_;
};
lf.proc.QueryTask.prototype.getResolver = function() {
  return this.resolver_;
};
lf.proc.QueryTask.prototype.getId = function() {
  return goog.getUid(this);
};
lf.proc.QueryTask.prototype.getPriority = goog.abstractMethod;
lf.proc.QueryTask.prototype.onSuccess = function(results) {
};

goog.provide("lf.proc.AggregationResult");
goog.provide("lf.proc.Relation");
goog.provide("lf.proc.RelationEntry");
goog.require("goog.asserts");
goog.require("goog.structs.Map");
goog.require("goog.structs.Set");
goog.require("lf.Row");
goog.forwardDeclare("lf.schema.Column");
lf.proc.Relation = function(entries, tables) {
  this.entries = entries;
  this.tables_ = new goog.structs.Set(tables);
  this.aggregationResults_ = null;
};
lf.proc.AggregationResult;
lf.proc.Relation.prototype.isCompatible = function(relation) {
  return this.tables_.equals(relation.tables_);
};
lf.proc.Relation.assertCompatible_ = function(lhs, rhs) {
  goog.asserts.assert(lhs.isCompatible(rhs), "Intersection/union operations only apply to compatible relations.");
};
lf.proc.Relation.prototype.getTables = function() {
  return this.tables_.getValues();
};
lf.proc.Relation.prototype.isPrefixApplied = function() {
  return this.tables_.getCount() > 1;
};
lf.proc.Relation.prototype.getPayloads = function() {
  return this.entries.map(function(entry) {
    return entry.row.payload();
  });
};
lf.proc.Relation.prototype.getRowIds = function() {
  return this.entries.map(function(entry) {
    return entry.row.id();
  });
};
lf.proc.Relation.prototype.setAggregationResult = function(column, result) {
  if (goog.isNull(this.aggregationResults_)) {
    this.aggregationResults_ = new goog.structs.Map;
  }
  this.aggregationResults_.set(column.getNormalizedName(), result);
};
lf.proc.Relation.prototype.getAggregationResult = function(column) {
  goog.asserts.assert(!goog.isNull(this.aggregationResults_), "getAggregationResult called before any results have been calculated.");
  var result = this.aggregationResults_.get(column.getNormalizedName(), undefined);
  goog.asserts.assert(goog.isDef(result), "Could not find result for " + column.getNormalizedName());
  return result;
};
lf.proc.Relation.prototype.hasAggregationResult = function(column) {
  return !goog.isNull(this.aggregationResults_) && this.aggregationResults_.containsKey(column.getNormalizedName());
};
lf.proc.Relation.emptyRelation_ = null;
lf.proc.Relation.createEmpty = function() {
  if (goog.isNull(lf.proc.Relation.emptyRelation_)) {
    lf.proc.Relation.emptyRelation_ = new lf.proc.Relation([], []);
  }
  return lf.proc.Relation.emptyRelation_;
};
lf.proc.Relation.intersect = function(relations) {
  if (relations.length == 0) {
    return lf.proc.Relation.createEmpty();
  }
  var totalCount = relations.reduce(function(soFar, relation) {
    lf.proc.Relation.assertCompatible_(relations[0], relation);
    return soFar + relation.entries.length;
  }, 0);
  var allEntries = new Array(totalCount);
  var entryCounter = 0;
  var relationMaps = relations.map(function(relation) {
    var map = new goog.structs.Map;
    relation.entries.forEach(function(entry) {
      allEntries[entryCounter++] = entry;
      map.set(entry.id, entry);
    });
    return map;
  });
  var intersection = new goog.structs.Map;
  for (var i = 0;i < allEntries.length;i++) {
    var existsInAll = relationMaps.every(function(relation) {
      return relation.containsKey(allEntries[i].id);
    });
    if (existsInAll) {
      intersection.set(allEntries[i].id, allEntries[i]);
    }
  }
  return new lf.proc.Relation(intersection.getValues(), relations[0].tables_.getValues());
};
lf.proc.Relation.union = function(relations) {
  if (relations.length == 0) {
    return lf.proc.Relation.createEmpty();
  }
  var union = new goog.structs.Map;
  relations.forEach(function(relation) {
    lf.proc.Relation.assertCompatible_(relations[0], relation);
    relation.entries.forEach(function(entry) {
      union.set(entry.id, entry);
    });
  });
  return new lf.proc.Relation(union.getValues(), relations[0].tables_.getValues());
};
lf.proc.Relation.fromRows = function(rows, tables) {
  var isPrefixApplied = tables.length > 1;
  var entries = rows.map(function(row) {
    return new lf.proc.RelationEntry(row, isPrefixApplied);
  });
  return new lf.proc.Relation(entries, tables);
};
lf.proc.RelationEntry = function(row, isPrefixApplied) {
  this.row = row;
  this.id = lf.proc.RelationEntry.getNextId_();
  this.isPrefixApplied_ = isPrefixApplied;
};
lf.proc.RelationEntry.id_ = 0;
lf.proc.RelationEntry.getNextId_ = function() {
  return lf.proc.RelationEntry.id_++;
};
lf.proc.RelationEntry.prototype.getField = function(column) {
  var alias = column.getAlias();
  if (!goog.isNull(alias) && this.row.payload().hasOwnProperty(alias)) {
    return this.row.payload()[alias];
  }
  if (this.isPrefixApplied_) {
    return this.row.payload()[column.getTable().getEffectiveName()][column.getName()];
  } else {
    return this.row.payload()[column.getName()];
  }
};
lf.proc.RelationEntry.prototype.setField = function(column, value) {
  var alias = column.getAlias();
  if (goog.isDefAndNotNull(alias)) {
    this.row.payload()[alias] = value;
    return;
  }
  if (this.isPrefixApplied_) {
    var tableName = column.getTable().getEffectiveName();
    var containerObj = this.row.payload()[tableName];
    if (!goog.isDefAndNotNull(containerObj)) {
      containerObj = {};
      this.row.payload()[tableName] = containerObj;
    }
    containerObj[column.getName()] = value;
  } else {
    this.row.payload()[column.getName()] = value;
  }
};
lf.proc.RelationEntry.combineEntries = function(leftEntry, leftEntryTables, rightEntry, rightEntryTables) {
  var result = {};
  var mergeEntry = function(entry, entryTables) {
    if (entry.isPrefixApplied_) {
      var payload = entry.row.payload();
      for (var prefix in payload) {
        result[prefix] = payload[prefix];
      }
    } else {
      goog.asserts.assert(!result.hasOwnProperty(entryTables[0]), "Attempted to join table with itself, without using table alias, " + "or same alias " + entryTables[0] + "is reused for multiple tables.");
      result[entryTables[0]] = entry.row.payload();
    }
  };
  mergeEntry(leftEntry, leftEntryTables);
  mergeEntry(rightEntry, rightEntryTables);
  var row = new lf.Row(lf.Row.DUMMY_ID, result);
  return new lf.proc.RelationEntry(row, true);
};

goog.provide("lf.proc.RelationTransformer");
goog.require("goog.math");
goog.require("goog.structs.Map");
goog.require("lf.Row");
goog.require("lf.fn.AggregatedColumn");
goog.require("lf.fn.Type");
goog.require("lf.proc.Relation");
goog.require("lf.proc.RelationEntry");
lf.proc.RelationTransformer = function(relation, columns) {
  this.relation_ = relation;
  this.columns_ = columns;
};
lf.proc.RelationTransformer.prototype.getTransformed = function() {
  var aggregatedColumnsExist = this.columns_.some(function(column) {
    return column instanceof lf.fn.AggregatedColumn;
  }, this);
  return aggregatedColumnsExist ? this.handleAggregatedColumns_() : this.handleNonAggregatedColumns_();
};
lf.proc.RelationTransformer.prototype.handleAggregatedColumns_ = function() {
  if (this.columns_.length == 1 && this.columns_[0].aggregatorType == lf.fn.Type.DISTINCT) {
    var distinctRelation = (this.relation_.getAggregationResult(this.columns_[0]));
    var newEntries = distinctRelation.entries.map(function(entry) {
      var newEntry = new lf.proc.RelationEntry(new lf.Row(lf.Row.DUMMY_ID, {}), this.relation_.isPrefixApplied());
      newEntry.setField(this.columns_[0], entry.getField(this.columns_[0].child));
      return newEntry;
    }, this);
    return new lf.proc.Relation(newEntries, []);
  }
  var entry = new lf.proc.RelationEntry(new lf.Row(lf.Row.DUMMY_ID, {}), this.relation_.isPrefixApplied());
  this.columns_.forEach(function(column) {
    var value = column instanceof lf.fn.AggregatedColumn ? this.relation_.getAggregationResult(column) : this.relation_.entries[0].getField(column);
    entry.setField(column, value);
  }, this);
  return new lf.proc.Relation([entry], this.relation_.getTables());
};
lf.proc.RelationTransformer.prototype.handleNonAggregatedColumns_ = function() {
  var transformedEntries = new Array(this.relation_.entries.length);
  var isPrefixApplied = this.relation_.isPrefixApplied();
  this.relation_.entries.forEach(function(entry, index) {
    transformedEntries[index] = new lf.proc.RelationEntry(new lf.Row(entry.row.id(), {}), isPrefixApplied);
    this.columns_.forEach(function(column) {
      transformedEntries[index].setField(column, entry.getField(column));
    }, this);
  }, this);
  return new lf.proc.Relation(transformedEntries, this.relation_.getTables());
};
lf.proc.RelationTransformer.transformMany = function(relations, columns) {
  var entries = relations.map(function(relation) {
    var relationTransformer = new lf.proc.RelationTransformer(relation, columns);
    var singleEntryRelation = relationTransformer.getTransformed();
    return singleEntryRelation.entries[0];
  });
  return new lf.proc.Relation(entries, relations[0].getTables());
};

goog.provide("lf.proc.RewritePass");
lf.proc.RewritePass = function() {
  this.rootNode;
};
lf.proc.RewritePass.prototype.rewrite = goog.abstractMethod;

goog.provide("lf.proc.Runner");
goog.require("goog.array");
goog.require("lf.TransactionType");
goog.require("lf.proc.LockManager");
goog.require("lf.proc.LockType");
goog.require("lf.proc.TaskPriority");
goog.forwardDeclare("lf.proc.Task");
lf.proc.Runner = function() {
  this.queue_ = new lf.proc.Runner.TaskQueue_;
  this.lockManager_ = new lf.proc.LockManager;
};
lf.proc.Runner.prototype.scheduleTask = function(task) {
  if (task.getPriority() < lf.proc.TaskPriority.USER_QUERY_TASK || task.getPriority() < lf.proc.TaskPriority.TRANSACTION_TASK) {
    this.lockManager_.clearReservedLocks(task.getScope().getValues());
  }
  this.queue_.insert(task);
  this.consumePending_();
  return task.getResolver().promise;
};
lf.proc.Runner.prototype.consumePending_ = function() {
  var queue = this.queue_.getValues();
  for (var i = 0;i < queue.length;i++) {
    var task = queue[i];
    var acquiredLock = false;
    if (task.getType() == lf.TransactionType.READ_ONLY) {
      acquiredLock = this.requestTwoPhaseLock_(task, lf.proc.LockType.RESERVED_READ_ONLY, lf.proc.LockType.SHARED);
    } else {
      acquiredLock = this.requestTwoPhaseLock_(task, lf.proc.LockType.RESERVED_READ_WRITE, lf.proc.LockType.EXCLUSIVE);
    }
    if (acquiredLock) {
      this.queue_.remove(task);
      this.execTask_(task);
    }
  }
};
lf.proc.Runner.prototype.requestTwoPhaseLock_ = function(task, lockType1, lockType2) {
  var acquiredLock = false;
  var scope = task.getScope().getValues();
  var acquiredFirstLock = this.lockManager_.requestLock(task.getId(), scope, lockType1);
  if (acquiredFirstLock) {
    acquiredLock = this.lockManager_.requestLock(task.getId(), scope, lockType2);
  }
  return acquiredLock;
};
lf.proc.Runner.prototype.execTask_ = function(task) {
  task.exec().then(goog.bind(this.onTaskSuccess_, this, task), goog.bind((this.onTaskError_), this, task));
};
lf.proc.Runner.prototype.onTaskSuccess_ = function(task, results) {
  this.lockManager_.releaseLock(task.getId(), task.getScope().getValues());
  task.getResolver().resolve(results);
  this.consumePending_();
};
lf.proc.Runner.prototype.onTaskError_ = function(task, error) {
  this.lockManager_.releaseLock(task.getId(), task.getScope().getValues());
  task.getResolver().reject(error);
  this.consumePending_();
};
lf.proc.Runner.TaskQueue_ = function() {
  this.queue_ = [];
};
lf.proc.Runner.TaskQueue_.prototype.insert = function(task) {
  goog.array.binaryInsert(this.queue_, task, function(t1, t2) {
    var priorityDiff = t1.getPriority() - t2.getPriority();
    return priorityDiff == 0 ? t1.getId() - t2.getId() : priorityDiff;
  });
};
lf.proc.Runner.TaskQueue_.prototype.getValues = function() {
  return this.queue_.slice();
};
lf.proc.Runner.TaskQueue_.prototype.remove = function(task) {
  return goog.array.remove(this.queue_, task);
};

goog.provide("lf.proc.SelectLogicalPlanGenerator");
goog.require("lf.fn.AggregatedColumn");
goog.require("lf.proc.AggregationNode");
goog.require("lf.proc.AndPredicatePass");
goog.require("lf.proc.BaseLogicalPlanGenerator");
goog.require("lf.proc.CrossProductNode");
goog.require("lf.proc.CrossProductPass");
goog.require("lf.proc.GroupByNode");
goog.require("lf.proc.ImplicitJoinsPass");
goog.require("lf.proc.LimitNode");
goog.require("lf.proc.LogicalPlanRewriter");
goog.require("lf.proc.OrderByNode");
goog.require("lf.proc.ProjectNode");
goog.require("lf.proc.PushDownSelectionsPass");
goog.require("lf.proc.SelectNode");
goog.require("lf.proc.SkipNode");
goog.require("lf.proc.TableAccessNode");
lf.proc.SelectLogicalPlanGenerator = function(query) {
  lf.proc.SelectLogicalPlanGenerator.base(this, "constructor", query);
  this.tableAccessNodes_ = null;
  this.crossProductNode_ = null;
  this.selectNode_ = null;
  this.groupByNode_ = null;
  this.aggregationNode_ = null;
  this.orderByNode_ = null;
  this.skipNode_ = null;
  this.limitNode_ = null;
  this.projectNode_ = null;
};
goog.inherits(lf.proc.SelectLogicalPlanGenerator, lf.proc.BaseLogicalPlanGenerator);
lf.proc.SelectLogicalPlanGenerator.prototype.generateInternal = function() {
  this.generateNodes_();
  var rootNode = this.connectNodes_();
  var rewritePasses = [new lf.proc.AndPredicatePass, new lf.proc.CrossProductPass, new lf.proc.PushDownSelectionsPass, new lf.proc.ImplicitJoinsPass];
  var planRewriter = new lf.proc.LogicalPlanRewriter(rootNode, rewritePasses);
  return planRewriter.generate();
};
lf.proc.SelectLogicalPlanGenerator.prototype.generateNodes_ = function() {
  this.generateTableAcessNodes_();
  this.generateCrossProductNode_();
  this.generateSelectNode_();
  this.generateOrderByNode_();
  this.generateSkipNode_();
  this.generateLimitNode_();
  this.generateGroupByNode_();
  this.generateAggregationNode_();
  this.generateProjectNode_();
};
lf.proc.SelectLogicalPlanGenerator.prototype.connectNodes_ = function() {
  var parentOrder = [this.limitNode_, this.skipNode_, this.projectNode_, this.orderByNode_, this.aggregationNode_, this.groupByNode_, this.selectNode_, this.crossProductNode_];
  var lastExistingParentIndex = null;
  var rootNode = null;
  for (var i = 0;i < parentOrder.length;i++) {
    var node = parentOrder[i];
    if (!goog.isNull(node)) {
      if (goog.isNull(rootNode)) {
        rootNode = node;
      } else {
        parentOrder[lastExistingParentIndex].addChild(node);
      }
      lastExistingParentIndex = i;
    }
  }
  this.tableAccessNodes_.forEach(function(tableAccessNode) {
    parentOrder[lastExistingParentIndex].addChild(tableAccessNode);
  });
  return rootNode;
};
lf.proc.SelectLogicalPlanGenerator.prototype.generateTableAcessNodes_ = function() {
  this.tableAccessNodes_ = this.query.from.map(function(table) {
    return new lf.proc.TableAccessNode(table);
  }, this);
};
lf.proc.SelectLogicalPlanGenerator.prototype.generateCrossProductNode_ = function() {
  if (this.query.from.length >= 2) {
    this.crossProductNode_ = new lf.proc.CrossProductNode;
  }
};
lf.proc.SelectLogicalPlanGenerator.prototype.generateSelectNode_ = function() {
  this.selectNode_ = goog.isDefAndNotNull(this.query.where) ? new lf.proc.SelectNode(this.query.where.copy()) : null;
};
lf.proc.SelectLogicalPlanGenerator.prototype.generateOrderByNode_ = function() {
  if (this.query.orderBy) {
    this.orderByNode_ = new lf.proc.OrderByNode(this.query.orderBy);
  }
};
lf.proc.SelectLogicalPlanGenerator.prototype.generateLimitNode_ = function() {
  if (goog.isDefAndNotNull(this.query.limit)) {
    this.limitNode_ = new lf.proc.LimitNode(this.query.limit);
  }
};
lf.proc.SelectLogicalPlanGenerator.prototype.generateSkipNode_ = function() {
  if (goog.isDefAndNotNull(this.query.skip) && this.query.skip > 0) {
    this.skipNode_ = new lf.proc.SkipNode(this.query.skip);
  }
};
lf.proc.SelectLogicalPlanGenerator.prototype.generateGroupByNode_ = function() {
  if (goog.isDefAndNotNull(this.query.groupBy)) {
    this.groupByNode_ = new lf.proc.GroupByNode(this.query.groupBy);
  }
};
lf.proc.SelectLogicalPlanGenerator.prototype.generateAggregationNode_ = function() {
  var aggregatedColumns = this.query.columns.filter(function(column) {
    return column instanceof lf.fn.AggregatedColumn;
  });
  if (goog.isDefAndNotNull(this.query.orderBy)) {
    this.query.orderBy.forEach(function(orderBy) {
      if (orderBy.column instanceof lf.fn.AggregatedColumn) {
        aggregatedColumns.push(orderBy.column);
      }
    });
  }
  if (aggregatedColumns.length > 0) {
    this.aggregationNode_ = new lf.proc.AggregationNode(aggregatedColumns);
  }
};
lf.proc.SelectLogicalPlanGenerator.prototype.generateProjectNode_ = function() {
  this.projectNode_ = new lf.proc.ProjectNode(this.query.columns || [], this.query.groupBy || null);
};

goog.provide("lf.proc.SelectStep");
goog.require("lf.proc.PhysicalQueryPlanNode");
lf.proc.SelectStep = function(predicateId) {
  lf.proc.SelectStep.base(this, "constructor", 1, lf.proc.PhysicalQueryPlanNode.ExecType.FIRST_CHILD);
  this.predicateId = predicateId;
};
goog.inherits(lf.proc.SelectStep, lf.proc.PhysicalQueryPlanNode);
lf.proc.SelectStep.prototype.toString = function() {
  return "select(?)";
};
lf.proc.SelectStep.prototype.toContextString = function(context) {
  var predicate = context.getPredicate(this.predicateId);
  return this.toString().replace("?", predicate.toString());
};
lf.proc.SelectStep.prototype.execInternal = function(journal, relations, context) {
  var predicate = context.getPredicate(this.predicateId);
  return [predicate.eval(relations[0])];
};

goog.provide("lf.proc.SkipStep");
goog.require("lf.proc.PhysicalQueryPlanNode");
goog.require("lf.proc.Relation");
lf.proc.SkipStep = function() {
  lf.proc.SkipStep.base(this, "constructor", 1, lf.proc.PhysicalQueryPlanNode.ExecType.FIRST_CHILD);
};
goog.inherits(lf.proc.SkipStep, lf.proc.PhysicalQueryPlanNode);
lf.proc.SkipStep.prototype.toString = function() {
  return "skip(?)";
};
lf.proc.SkipStep.prototype.toContextString = function(context) {
  return this.toString().replace("?", context.skip.toString());
};
lf.proc.SkipStep.prototype.execInternal = function(journal, relations, context) {
  return [new lf.proc.Relation(relations[0].entries.slice(context.skip), relations[0].getTables())];
};

goog.provide("lf.proc.TableAccessByRowIdStep");
goog.require("goog.Promise");
goog.require("lf.proc.PhysicalQueryPlanNode");
goog.require("lf.proc.Relation");
goog.require("lf.service");
lf.proc.TableAccessByRowIdStep = function(global, table) {
  lf.proc.TableAccessByRowIdStep.base(this, "constructor", 1, lf.proc.PhysicalQueryPlanNode.ExecType.FIRST_CHILD);
  this.cache_ = global.getService(lf.service.CACHE);
  this.table_ = table;
};
goog.inherits(lf.proc.TableAccessByRowIdStep, lf.proc.PhysicalQueryPlanNode);
lf.proc.TableAccessByRowIdStep.prototype.toString = function() {
  return "table_access_by_row_id(" + this.table_.getName() + ")";
};
lf.proc.TableAccessByRowIdStep.prototype.getScope = function() {
  return this.table_;
};
lf.proc.TableAccessByRowIdStep.prototype.execInternal = function(journal, relations) {
  return [lf.proc.Relation.fromRows(this.cache_.get(relations[0].getRowIds()), [this.table_.getEffectiveName()])];
};

goog.provide("lf.proc.TableAccessFullStep");
goog.require("goog.Promise");
goog.require("lf.proc.PhysicalQueryPlanNode");
goog.require("lf.proc.Relation");
goog.require("lf.service");
lf.proc.TableAccessFullStep = function(global, table) {
  lf.proc.TableAccessFullStep.base(this, "constructor", 0, lf.proc.PhysicalQueryPlanNode.ExecType.NO_CHILD);
  this.cache_ = global.getService(lf.service.CACHE);
  this.indexStore_ = global.getService(lf.service.INDEX_STORE);
  this.table = table;
};
goog.inherits(lf.proc.TableAccessFullStep, lf.proc.PhysicalQueryPlanNode);
lf.proc.TableAccessFullStep.prototype.toString = function() {
  var out = "table_access(" + this.table.getName();
  if (!goog.isNull(this.table.getAlias())) {
    out += " as " + this.table.getAlias();
  }
  out += ")";
  return out;
};
lf.proc.TableAccessFullStep.prototype.getScope = function() {
  return this.table;
};
lf.proc.TableAccessFullStep.prototype.execInternal = function(journal) {
  var rowIds = this.indexStore_.get(this.table.getRowIdIndexName()).getRange();
  return [lf.proc.Relation.fromRows(this.cache_.get(rowIds), [this.table.getEffectiveName()])];
};

goog.provide("lf.proc.Task");
goog.provide("lf.proc.TaskItem");
goog.provide("lf.proc.TaskPriority");
lf.proc.Task = function() {
};
lf.proc.Task.prototype.exec;
lf.proc.Task.prototype.getType;
lf.proc.Task.prototype.getScope;
lf.proc.Task.prototype.getResolver;
lf.proc.Task.prototype.getId;
lf.proc.Task.prototype.getPriority;
lf.proc.TaskPriority = {OBSERVER_QUERY_TASK:0, EXTERNAL_CHANGE_TASK:1, USER_QUERY_TASK:2, TRANSACTION_TASK:2};
lf.proc.TaskItem;

goog.provide("lf.proc.Transaction");
goog.require("goog.Promise");
goog.require("goog.structs.Map");
goog.require("goog.structs.Set");
goog.require("lf.Exception");
goog.require("lf.Transaction");
goog.require("lf.proc.TransactionTask");
goog.require("lf.proc.UserQueryTask");
goog.require("lf.service");
lf.proc.Transaction = function(global) {
  this.global_ = global;
  this.runner_ = global.getService(lf.service.RUNNER);
  this.transactionTask_ = null;
  this.state_ = lf.proc.TransactionState_.CREATED;
};
lf.proc.TransactionState_ = {CREATED:0, ACQUIRING_SCOPE:1, ACQUIRED_SCOPE:2, EXECUTING_QUERY:3, EXECUTING_AND_COMMITTING:4, COMMITTING:5, ROLLING_BACK:6, FINALIZED:7};
lf.proc.StateTransitions_ = new goog.structs.Map(lf.proc.TransactionState_.CREATED, new goog.structs.Set([lf.proc.TransactionState_.ACQUIRING_SCOPE, lf.proc.TransactionState_.EXECUTING_AND_COMMITTING]), lf.proc.TransactionState_.ACQUIRING_SCOPE, new goog.structs.Set([lf.proc.TransactionState_.ACQUIRED_SCOPE]), lf.proc.TransactionState_.ACQUIRED_SCOPE, new goog.structs.Set([lf.proc.TransactionState_.EXECUTING_QUERY, lf.proc.TransactionState_.COMMITTING, lf.proc.TransactionState_.ROLLING_BACK]), lf.proc.TransactionState_.EXECUTING_QUERY, 
new goog.structs.Set([lf.proc.TransactionState_.ACQUIRED_SCOPE, lf.proc.TransactionState_.FINALIZED]), lf.proc.TransactionState_.EXECUTING_AND_COMMITTING, new goog.structs.Set([lf.proc.TransactionState_.FINALIZED]), lf.proc.TransactionState_.COMMITTING, new goog.structs.Set([lf.proc.TransactionState_.FINALIZED]), lf.proc.TransactionState_.ROLLING_BACK, new goog.structs.Set([lf.proc.TransactionState_.FINALIZED]));
lf.proc.Transaction.prototype.stateTransition_ = function(newState) {
  var nextStates = lf.proc.StateTransitions_.get(this.state_, null);
  if (goog.isNull(nextStates) || !nextStates.contains(newState)) {
    throw new lf.Exception(lf.Exception.Type.TRANSACTION, "Invalid transaction state transition, from " + this.state_ + " to " + newState + ".");
  } else {
    this.state_ = newState;
  }
};
lf.proc.Transaction.prototype.exec = function(queryBuilders) {
  this.stateTransition_(lf.proc.TransactionState_.EXECUTING_AND_COMMITTING);
  var taskItems = [];
  try {
    queryBuilders.forEach(function(queryBuilder) {
      queryBuilder.assertExecPreconditions();
      taskItems.push(queryBuilder.getTaskItem());
    }, this);
  } catch (e) {
    this.stateTransition_(lf.proc.TransactionState_.FINALIZED);
    return goog.Promise.reject(e);
  }
  var queryTask = new lf.proc.UserQueryTask(this.global_, taskItems);
  return this.runner_.scheduleTask(queryTask).then(goog.bind(function(results) {
    this.stateTransition_(lf.proc.TransactionState_.FINALIZED);
    return results.map(function(relation) {
      return relation.getPayloads();
    });
  }, this), goog.bind(function(e) {
    this.stateTransition_(lf.proc.TransactionState_.FINALIZED);
    throw e;
  }, this));
};
lf.proc.Transaction.prototype.begin = function(scope) {
  this.stateTransition_(lf.proc.TransactionState_.ACQUIRING_SCOPE);
  this.transactionTask_ = new lf.proc.TransactionTask(this.global_, scope);
  return this.transactionTask_.acquireScope().then(goog.bind(function() {
    this.stateTransition_(lf.proc.TransactionState_.ACQUIRED_SCOPE);
  }, this));
};
lf.proc.Transaction.prototype.attach = function(query) {
  this.stateTransition_(lf.proc.TransactionState_.EXECUTING_QUERY);
  return this.transactionTask_.attachQuery(query).then(goog.bind(function(result) {
    this.stateTransition_(lf.proc.TransactionState_.ACQUIRED_SCOPE);
    return result;
  }, this), goog.bind(function(e) {
    this.stateTransition_(lf.proc.TransactionState_.FINALIZED);
    throw e;
  }, this));
};
lf.proc.Transaction.prototype.commit = function() {
  this.stateTransition_(lf.proc.TransactionState_.COMMITTING);
  return this.transactionTask_.commit().then(goog.bind(function() {
    this.stateTransition_(lf.proc.TransactionState_.FINALIZED);
  }, this));
};
lf.proc.Transaction.prototype.rollback = function() {
  this.stateTransition_(lf.proc.TransactionState_.ROLLING_BACK);
  return this.transactionTask_.rollback().then(goog.bind(function() {
    this.stateTransition_(lf.proc.TransactionState_.FINALIZED);
  }, this));
};

goog.provide("lf.proc.TransactionTask");
goog.require("goog.Promise");
goog.require("goog.structs.Set");
goog.require("lf.TransactionType");
goog.require("lf.cache.Journal");
goog.require("lf.proc.ObserverQueryTask");
goog.require("lf.proc.Task");
goog.require("lf.proc.TaskPriority");
goog.require("lf.service");
lf.proc.TransactionTask = function(global, scope) {
  this.global_ = global;
  this.backStore_ = global.getService(lf.service.BACK_STORE);
  this.runner_ = global.getService(lf.service.RUNNER);
  this.observerRegistry_ = global.getService(lf.service.OBSERVER_REGISTRY);
  this.scope_ = new goog.structs.Set(scope);
  this.journal_ = new lf.cache.Journal(this.global_, this.scope_.getValues());
  this.resolver_ = goog.Promise.withResolver();
  this.execResolver_ = goog.Promise.withResolver();
  this.acquireScopeResolver_ = goog.Promise.withResolver();
};
lf.proc.TransactionTask.prototype.exec = function() {
  this.acquireScopeResolver_.resolve();
  return this.execResolver_.promise;
};
lf.proc.TransactionTask.prototype.getType = function() {
  return lf.TransactionType.READ_WRITE;
};
lf.proc.TransactionTask.prototype.getScope = function() {
  return this.scope_;
};
lf.proc.TransactionTask.prototype.getResolver = function() {
  return this.resolver_;
};
lf.proc.TransactionTask.prototype.getId = function() {
  return goog.getUid(this);
};
lf.proc.TransactionTask.prototype.getPriority = function() {
  return lf.proc.TaskPriority.TRANSACTION_TASK;
};
lf.proc.TransactionTask.prototype.acquireScope = function() {
  this.runner_.scheduleTask(this);
  return this.acquireScopeResolver_.promise;
};
lf.proc.TransactionTask.prototype.attachQuery = function(queryBuilder) {
  var taskItem = queryBuilder.getTaskItem();
  return taskItem.plan.getRoot().exec(this.journal_, taskItem.context).then(function(relations) {
    return relations[0].getPayloads();
  }, goog.bind(function(e) {
    this.journal_.rollback();
    var error = new goog.Promise.CancellationError(e.name);
    this.execResolver_.reject(error);
    throw e;
  }, this));
};
lf.proc.TransactionTask.prototype.commit = function() {
  var tx = this.backStore_.createTx(this.getType(), this.journal_);
  tx.commit().then(goog.bind(function() {
    this.scheduleObserverTask_();
    this.execResolver_.resolve();
  }, this), goog.bind(function(e) {
    this.journal_.rollback();
    this.execResolver_.reject(e);
  }, this));
  return this.resolver_.promise;
};
lf.proc.TransactionTask.prototype.rollback = function() {
  this.journal_.rollback();
  this.execResolver_.resolve();
  return this.resolver_.promise;
};
lf.proc.TransactionTask.prototype.scheduleObserverTask_ = function() {
  var items = this.observerRegistry_.getTaskItemsForTables(this.scope_.getValues());
  if (items.length != 0) {
    var observerTask = new lf.proc.ObserverQueryTask(this.global_, items);
    this.runner_.scheduleTask(observerTask);
  }
};

goog.provide("lf.proc.UpdateStep");
goog.require("goog.Promise");
goog.require("lf.proc.PhysicalQueryPlanNode");
goog.require("lf.proc.Relation");
lf.proc.UpdateStep = function(table, updates) {
  lf.proc.UpdateStep.base(this, "constructor", 1, lf.proc.PhysicalQueryPlanNode.ExecType.FIRST_CHILD);
  this.table_ = table;
  this.updates_ = updates;
};
goog.inherits(lf.proc.UpdateStep, lf.proc.PhysicalQueryPlanNode);
lf.proc.UpdateStep.prototype.toString = function() {
  return "update(" + this.table_.getName() + ")";
};
lf.proc.UpdateStep.prototype.getScope = function() {
  return this.table_;
};
lf.proc.UpdateStep.prototype.execInternal = function(journal, relations) {
  var rows = relations[0].entries.map(function(entry) {
    var clone = this.table_.deserializeRow(entry.row.serialize());
    this.updates_.forEach(function(update) {
      clone.payload()[update.column.getName()] = update.value;
    }, this);
    return clone;
  }, this);
  journal.update(this.table_, rows);
  return [lf.proc.Relation.createEmpty()];
};

goog.provide("lf.proc.UserQueryTask");
goog.require("lf.TransactionType");
goog.require("lf.proc.ObserverQueryTask");
goog.require("lf.proc.QueryTask");
goog.require("lf.proc.TaskPriority");
goog.require("lf.query.SelectContext");
goog.require("lf.service");
lf.proc.UserQueryTask = function(global, items) {
  lf.proc.UserQueryTask.base(this, "constructor", global, items);
  this.runner_ = global.getService(lf.service.RUNNER);
  this.observerRegistry_ = global.getService(lf.service.OBSERVER_REGISTRY);
};
goog.inherits(lf.proc.UserQueryTask, lf.proc.QueryTask);
lf.proc.UserQueryTask.prototype.getPriority = function() {
  return lf.proc.TaskPriority.USER_QUERY_TASK;
};
lf.proc.UserQueryTask.prototype.onSuccess = function(results) {
  this.getType() == lf.TransactionType.READ_ONLY ? this.notifyObserversDirectly_(results) : this.scheduleObserverTask_();
};
lf.proc.UserQueryTask.prototype.notifyObserversDirectly_ = function(results) {
  this.queries.forEach(function(query, index) {
    if (query instanceof lf.query.SelectContext) {
      this.observerRegistry_.updateResultsForQuery(query, results[index]);
    }
  }, this);
};
lf.proc.UserQueryTask.prototype.scheduleObserverTask_ = function() {
  var items = this.observerRegistry_.getTaskItemsForTables(this.getScope().getValues());
  if (items.length != 0) {
    var observerTask = new lf.proc.ObserverQueryTask(this.global, items);
    this.runner_.scheduleTask(observerTask);
  }
};

