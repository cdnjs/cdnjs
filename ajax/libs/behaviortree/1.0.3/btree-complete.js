/**
 * BehaviorTree.js
 * https://github.com/Calamari/BehaviorTree.js
 *
 * Copyright 2013-2104, Georg Tavonius
 * Licensed under the MIT license.
 *
 * Includes Dean Edward's Base.js, version 1.1a
 * Copyright 2006-2010, Dean Edwards
 * License: http://www.opensource.org/licenses/mit-license.php
 *
 * Version: 1.0.3
 */
!function(e){if("object"==typeof exports)module.exports=e();else if("function"==typeof define&&define.amd)define(e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.BehaviorTree=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"Base":[function(_dereq_,module,exports){
module.exports=_dereq_('3iKuuX');
},{}],"3iKuuX":[function(_dereq_,module,exports){
(function (global){
(function browserifyShim(module, exports, define, browserify_shim__define__module__export__) {
/*
  Base.js, version 1.1a
  Copyright 2006-2010, Dean Edwards
  License: http://www.opensource.org/licenses/mit-license.php
*/

var Base = function() {
  // dummy
};

Base.extend = function(_instance, _static) { // subclass
  var extend = Base.prototype.extend;

  // build the prototype
  Base._prototyping = true;
  var proto = new this;
  extend.call(proto, _instance);
  proto.base = function() {
    // call this method from any other method to invoke that method's ancestor
  };
  delete Base._prototyping;

  // create the wrapper for the constructor function
  //var constructor = proto.constructor.valueOf(); //-dean
  var constructor = proto.constructor;
  var klass = proto.constructor = function() {
    if (!Base._prototyping) {
      if (this._constructing || this.constructor == klass) { // instantiation
        this._constructing = true;
        constructor.apply(this, arguments);
        delete this._constructing;
      } else if (arguments[0] != null) { // casting
        return (arguments[0].extend || extend).call(arguments[0], proto);
      }
    }
  };

  // build the class interface
  klass.ancestor = this;
  klass.extend = this.extend;
  klass.forEach = this.forEach;
  klass.implement = this.implement;
  klass.prototype = proto;
  klass.toString = this.toString;
  klass.valueOf = function(type) {
    //return (type == "object") ? klass : constructor; //-dean
    return (type == "object") ? klass : constructor.valueOf();
  };
  extend.call(klass, _static);
  // class initialisation
  if (typeof klass.init == "function") klass.init();
  return klass;
};

Base.prototype = {
  extend: function(source, value) {
    if (arguments.length > 1) { // extending with a name/value pair
      var ancestor = this[source];
      if (ancestor && (typeof value == "function") && // overriding a method?
        // the valueOf() comparison is to avoid circular references
        (!ancestor.valueOf || ancestor.valueOf() != value.valueOf()) &&
        /\bbase\b/.test(value)) {
        // get the underlying method
        var method = value.valueOf();
        // override
        value = function() {
          var previous = this.base || Base.prototype.base;
          this.base = ancestor;
          var returnValue = method.apply(this, arguments);
          this.base = previous;
          return returnValue;
        };
        // point to the underlying method
        value.valueOf = function(type) {
          return (type == "object") ? value : method;
        };
        value.toString = Base.toString;
      }
      this[source] = value;
    } else if (source) { // extending with an object literal
      var extend = Base.prototype.extend;
      // if this object has a customised extend method then use it
      if (!Base._prototyping && typeof this != "function") {
        extend = this.extend || extend;
      }
      var proto = {toSource: null};
      // do the "toString" and other methods manually
      var hidden = ["constructor", "toString", "valueOf"];
      // if we are prototyping then include the constructor
      var i = Base._prototyping ? 0 : 1;
      while (key = hidden[i++]) {
        if (source[key] != proto[key]) {
          extend.call(this, key, source[key]);

        }
      }
      // copy each of the source object's properties to this object
      for (var key in source) {
        if (!proto[key]) extend.call(this, key, source[key]);
      }
    }
    return this;
  }
};

// initialise
Base = Base.extend({
  constructor: function() {
    this.extend(arguments[0]);
  }
}, {
  ancestor: Object,
  version: "1.1",

  forEach: function(object, block, context) {
    for (var key in object) {
      if (this.prototype[key] === undefined) {
        block.call(context, object[key], key, object);
      }
    }
  },

  implement: function() {
    for (var i = 0; i < arguments.length; i++) {
      if (typeof arguments[i] == "function") {
        // if it's a function, call it
        arguments[i](this.prototype);
      } else {
        // add the interface using the extend method
        this.prototype.extend(arguments[i]);
      }
    }
    return this;
  },

  toString: function() {
    return String(this.valueOf());
  }
});

; browserify_shim__define__module__export__(typeof Base != "undefined" ? Base : window.Base);

}).call(global, undefined, undefined, undefined, function defineExport(ex) { module.exports = ex; });

}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],3:[function(_dereq_,module,exports){

module.exports = _dereq_('./decorator').extend({
  success: function() {
    this._control.fail();
  },
  fail: function() {
    this._control.fail();
  },
});

},{"./decorator":7}],4:[function(_dereq_,module,exports){

module.exports = _dereq_('./decorator').extend({
  success: function() {
    this._control.success();
  },
  fail: function() {
    this._control.success();
  },
});

},{"./decorator":7}],5:[function(_dereq_,module,exports){
/**
 * BehaviorTree.js
 * https://github.com/Calamari/BehaviorTree.js
 *
 * Copyright 2013, Georg Tavonius
 * Licensed under the MIT license.
 *
 * Version: 0.9.3
 */

var countUnnamed = 0,
    BehaviorTree;

BehaviorTree = _dereq_('../lib/base').extend({
  constructor: function(config) {
    countUnnamed += 1;
    this.title = config.title || 'btree' + (countUnnamed);
    this._rootNode = config.tree;
    this._object = config.object;
  },
  setObject: function(obj) {
    this._object = obj;
  },
  step: function() {
    if (this._started) {
      throw new Error('the BehaviorTree "' + this.title + '" did call step but one Task did not finish on last call of step.');
    }
    this._started = true;
    var node = BehaviorTree.getNode(this._rootNode);
    this._actualNode = node;
    node.setControl(this);
    node.start(this._object);
    node.run(this._object);
  },
  running: function() {
    this._started = false;
  },
  success: function() {
    this._actualNode.end(this._object);
    this._started = false;
  },
  fail: function() {
    this._actualNode.end(this._object);
    this._started = false;
  }
});
BehaviorTree._registeredNodes = {};
BehaviorTree.register = function(name, node) {
  if (typeof name === 'string') {
    this._registeredNodes[name] = node;
  } else {
    // name is the node
    this._registeredNodes[name.title] = name;
  }
};
BehaviorTree.getNode = function(name) {
  var node = name instanceof BehaviorTree.Node ? name : this._registeredNodes[name];
  if (!node) {
    throw new Error('The node "' + name + '" could not be looked up. Maybe it was never registered?');
  }
  return node;
};

module.exports = BehaviorTree;

},{"../lib/base":"3iKuuX"}],6:[function(_dereq_,module,exports){

var BehaviorTree = _dereq_('./behavior_tree');

module.exports = _dereq_('./node').extend({
  constructor: function(config) {
    this.base(config);
    this.children = this.nodes || [];
  },
  start: function() {
    this._actualTask = 0;
  },
  run: function(object) {
    this._object = object;
    this.start();
    if (this._actualTask < this.children.length) {
      this._run();
    }
    this.end();
  },
  _run: function() {
    var node = BehaviorTree.getNode(this.children[this._actualTask]);
    this._runningNode = node;
    node.setControl(this);
    node.start(this._object);
    node.run(this._object);
  },
  running: function(node) {
    this._nodeRunning = node;
    this._control.running(node);
  },
  success: function() {
    this._nodeRunning = null;
    this._runningNode.end(this._object);
  },
  fail: function() {
    this._nodeRunning = null;
    this._runningNode.end(this._object);
  }
});

},{"./behavior_tree":5,"./node":10}],7:[function(_dereq_,module,exports){

var BehaviorTree = _dereq_('./behavior_tree');

module.exports = _dereq_('./node').extend({
  constructor: function(config) {
    // let config override instance properties
    this.base(config);
    if (this.node) {
      this.node = BehaviorTree.getNode(this.node);
    }
  },
  setNode: function(node) {
    this.node = BehaviorTree.getNode(node);
  },
  start: function() {
    this.node.setControl(this);
    this.node.start();
  },
  end: function() {
    this.node.end();
  },
  run: function(blackboard) {
    this.node.run(blackboard);
  },
});

},{"./behavior_tree":5,"./node":10}],8:[function(_dereq_,module,exports){
var BehaviorTree = _dereq_('./behavior_tree');
BehaviorTree.Node = _dereq_('./node');
BehaviorTree.Task = _dereq_('./task');
BehaviorTree.BranchNode = _dereq_('./branch_node');
BehaviorTree.Priority = _dereq_('./priority');
BehaviorTree.Sequence = _dereq_('./sequence');
BehaviorTree.Random = _dereq_('./random');

BehaviorTree.Decorator = _dereq_('./decorator');
BehaviorTree.InvertDecorator = _dereq_('./invert_decorator');
BehaviorTree.AlwaysFailDecorator = _dereq_('./always_fail_decorator');
BehaviorTree.AlwaysSucceedDecorator = _dereq_('./always_succeed_decorator');

module.exports = BehaviorTree;

},{"./always_fail_decorator":3,"./always_succeed_decorator":4,"./behavior_tree":5,"./branch_node":6,"./decorator":7,"./invert_decorator":9,"./node":10,"./priority":11,"./random":12,"./sequence":13,"./task":14}],9:[function(_dereq_,module,exports){

module.exports = _dereq_('./decorator').extend({
  success: function() {
    this._control.fail();
  },
  fail: function() {
    this._control.success();
  },
});

},{"./decorator":7}],10:[function(_dereq_,module,exports){

module.exports = _dereq_('../lib/base').extend({
  constructor: function(config) {
    // let config override instance properties
    this.base(config);
  },
  start: function() {},
  end: function() {},
  run: function() { throw new Error('Warning: run of ' + this.title + ' not implemented!'); },
  setControl: function(control) {
    this._control = control;
  },
  running: function() {
    this._control.running(this);
  },
  success: function() {
    this._control.success();
  },
  fail: function() {
    this._control.fail();
  }
});

},{"../lib/base":"3iKuuX"}],11:[function(_dereq_,module,exports){

module.exports = _dereq_('./branch_node').extend({
  success: function() {
    this.base();
    this._control.success();
  },
  fail: function() {
    this.base();
    this._actualTask += 1;
    if (this._actualTask < this.children.length) {
      this._run(this._object);
    } else {
      this._control.fail();
    }
  }
});

},{"./branch_node":6}],12:[function(_dereq_,module,exports){

module.exports = _dereq_('./branch_node').extend({
  start: function() {
    this.base();
    if (!this._nodeRunning) {
      this._actualTask = Math.floor(Math.random()*this.children.length);
    }
  },
  success: function() {
    this.base();
    this._control.success();
  },
  fail: function() {
    this.base();
    this._control.fail();
  },
  _run: function() {
    if (!this._runningNode) {
      this.base();
    } else {
      this._runningNode.run(this._object);
    }
  }
});

},{"./branch_node":6}],13:[function(_dereq_,module,exports){

module.exports = _dereq_('./branch_node').extend({
  _run: function() {
    if (this._nodeRunning) {
      this._nodeRunning.run(this._object);
    } else {
      this.base();
    }
  },
  success: function() {
    this.base();
    this._actualTask += 1;
    if (this._actualTask < this.children.length) {
      this._run(this._object);
    } else {
      this._control.success();
    }
  },
  fail: function() {
    this.base();
    this._control.fail();
  }
});

},{"./branch_node":6}],14:[function(_dereq_,module,exports){

module.exports = _dereq_('./node').extend({});

},{"./node":10}]},{},[8])
(8)
});