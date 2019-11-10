(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("Babel"));
	else if(typeof define === 'function' && define.amd)
		define(["Babel"], factory);
	else if(typeof exports === 'object')
		exports["Babili"] = factory(require("Babel"));
	else
		root["Babili"] = factory(root["Babel"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_44__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ((function(modules) {
	// Check all modules for deduplicated modules
	for(var i in modules) {
		if(Object.prototype.hasOwnProperty.call(modules, i)) {
			switch(typeof modules[i]) {
			case "function": break;
			case "object":
				// Module can be created from a template
				modules[i] = (function(_m) {
					var args = _m.slice(1), fn = modules[_m[0]];
					return function (a,b,c) {
						fn.apply(this, [a,b,c].concat(args));
					};
				}(modules[i]));
				break;
			default:
				// Module is a copy of another module
				modules[i] = modules[modules[i]];
				break;
			}
		}
	}
	return modules;
}([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.version = undefined;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports.transform = transform;

	var _babelStandalone = __webpack_require__(44);

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	(0, _babelStandalone.registerPlugins)({
	  'minify-constant-folding': __webpack_require__(5),
	  'minify-dead-code-elimination': __webpack_require__(6),
	  'minify-empty-function': __webpack_require__(23),
	  'minify-flip-comparisons': __webpack_require__(7),
	  'minify-guarded-expressions': __webpack_require__(8),
	  'minify-infinity': __webpack_require__(24),
	  'minify-mangle-names': __webpack_require__(9),
	  'minify-replace': __webpack_require__(26),
	  'minify-simplify': __webpack_require__(10),
	  'minify-type-constructors': __webpack_require__(11),
	  'transform-inline-environment-variables': __webpack_require__(33),
	  'transform-member-expression-literals': __webpack_require__(12),
	  'transform-merge-sibling-variables': __webpack_require__(13),
	  'transform-minify-booleans': __webpack_require__(14),
	  'transform-node-env-inline': __webpack_require__(34),
	  'transform-property-literals': __webpack_require__(15),
	  'transform-remove-console': __webpack_require__(16),
	  'transform-remove-debugger': __webpack_require__(17),
	  'transform-simplify-comparison-operators': __webpack_require__(18),
	  'transform-undefined-to-void': __webpack_require__(19)
	});
	(0, _babelStandalone.registerPreset)('babili', __webpack_require__(37));

	function transform(code) {
	  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	  return (0, _babelStandalone.transform)(code, _extends({}, options, {
	    presets: [].concat(_toConsumableArray(options.presets || []), ['babili'])
	  }));
	}

	var version = exports.version = ("0.0.9");

/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";

	var _createClass = function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
	    }
	  }return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
	  };
	}();

	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	}

	var NotImplementedError = Error("NotImplementedError");

	var Collapser = function () {
	  function Collapser() {
	    _classCallCheck(this, Collapser);
	  }

	  _createClass(Collapser, [{
	    key: "isInitTypeValid",
	    value: function isInitTypeValid() {
	      throw NotImplementedError;
	    }
	  }, {
	    key: "isExpressionTypeValid",
	    value: function isExpressionTypeValid() {
	      throw NotImplementedError;
	    }
	  }, {
	    key: "getExpressionChecker",
	    value: function getExpressionChecker() {
	      throw NotImplementedError;
	    }
	  }, {
	    key: "extractAssignment",
	    value: function extractAssignment() {
	      throw NotImplementedError;
	    }
	  }, {
	    key: "addSuccessfully",
	    value: function addSuccessfully() {
	      throw NotImplementedError;
	    }
	  }, {
	    key: "isSizeSmaller",
	    value: function isSizeSmaller() {
	      return true;
	    }
	  }]);

	  return Collapser;
	}();

	module.exports = Collapser;

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";

	var flipSeen = Symbol("flipSeen");

	module.exports = function (t) {
	  return {
	    hasSeen: function hasSeen(node) {
	      return !!node[flipSeen];
	    },


	    // Takes an expressions and determines if it has
	    // more nodes that could benifit from flipping than not.
	    shouldFlip: function shouldFlip(topNode) {
	      var savings = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

	      visit(topNode);
	      return savings > 0;

	      function visit(node) {
	        if (t.isUnaryExpression(node, { operator: "!" })) {
	          savings++;
	          return;
	        }

	        if (t.isLogicalExpression(node)) {
	          visit(node.left);
	          visit(node.right);
	          return;
	        }

	        if (!(t.isBinaryExpression(node) && t.EQUALITY_BINARY_OPERATORS.indexOf(node.operator) > -1)) {
	          // Binary expressions wouldn't hurut because we know how to flip them
	          savings--;
	        }
	      }
	    },
	    flip: function flip(node, resultNotUsed) {
	      var lastNodeDesc = void 0;
	      var ret = visit(node);

	      ret[flipSeen] = true;

	      if (resultNotUsed && lastNodeDesc) {
	        var _lastNodeDesc = lastNodeDesc,
	            parent = _lastNodeDesc.parent,
	            key = _lastNodeDesc.key;

	        if (parent && key && t.isUnaryExpression(parent[key], { operator: "!" })) {
	          parent[key] = parent[key].argument;
	        }
	      }

	      return ret;

	      function visit(node, parent, key) {
	        lastNodeDesc = { parent: parent, key: key };

	        if (t.isUnaryExpression(node, { operator: "!" })) {
	          return node.argument;
	        }

	        if (t.isLogicalExpression(node)) {
	          node.operator = node.operator === "&&" ? "||" : "&&";
	          node.left = visit(node.left, node, "left");
	          node.right = visit(node.right, node, "right");
	          return node;
	        }

	        if (t.isBinaryExpression(node)) {
	          var operator = void 0;
	          switch (node.operator) {
	            case "!==":
	              operator = "===";break;
	            case "===":
	              operator = "!==";break;
	            case "!=":
	              operator = "==";break;
	            case "==":
	              operator = "!=";break;
	          }

	          if (operator) {
	            node.operator = operator;
	            return node;
	          }

	          // Falls through to unary expression
	        }

	        return t.unaryExpression("!", node, true);
	      }
	    }
	  };
	};

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";

	module.exports = function (t) {
	  return function isVoid0(expr) {
	    return t.isUnaryExpression(expr, { operator: "void" }) && t.isNumericLiteral(expr.argument, { value: 0 });
	  };
	};

/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";

	module.exports = function (t) {
	  // If we can't remove the expression we'll just replace it with an empty statement.
	  function removeOrVoid(path) {
	    // If we are working with the expression of an expression statement we want to deal
	    // with the expression statement instead.
	    if (path.parentPath.isExpressionStatement({ expression: path.node })) {
	      path = path.parentPath;
	    }

	    // If we are working with a variable declarator and there is only one then
	    // we need to look at the parent.
	    if (path.isVariableDeclarator() && path.parent.declarations[0] === path.node && path.parent.declarations.length === 1) {
	      path = path.parentPath;
	    }

	    if (!path.inList && path.scope.path.type !== "ForStatement") {
	      path.replaceWith(t.emptyStatement());
	    } else {
	      path.remove();
	    }
	  }

	  return removeOrVoid;
	};

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var evaluate = __webpack_require__(21);

	module.exports = function (_ref) {
	  var t = _ref.types,
	      traverse = _ref.traverse;

	  var seen = Symbol("seen");

	  return {
	    name: "minify-constant-folding",
	    visitor: {

	      // Evaluate string expressions that are next to each other
	      // but are not actually a binary expression.
	      // "a" + b + "c" + "d" -> "a" + b + "cd"
	      BinaryExpression: function BinaryExpression(path) {
	        var literal = void 0,
	            bin = void 0;
	        if (path.get("right").isStringLiteral()) {
	          literal = path.get("right");
	          if (path.get("left").isBinaryExpression({ operator: "+" })) {
	            bin = path.get("left");
	          } else {
	            return;
	          }
	        } else if (path.get("left").isStringLiteral()) {
	          literal = path.get("left");
	          if (path.get("right").isBinaryExpression({ operator: "+" })) {
	            bin = path.get("right");
	          } else {
	            return;
	          }
	        } else {
	          return;
	        }

	        var relevant = getLeaf(bin, literal.key);

	        if (!relevant) {
	          return;
	        }

	        var value = literal.key === "right" ? relevant.node.value + literal.node.value : literal.node.value + relevant.node.value;

	        relevant.replaceWith(t.stringLiteral(value));
	        path.replaceWith(bin.node);

	        function getLeaf(path, direction) {
	          if (path.isStringLiteral()) {
	            return path;
	          } else if (path.isBinaryExpression({ operator: "+" })) {
	            return getLeaf(path.get(direction), direction);
	          }
	        }
	      },

	      // TODO: look into evaluating binding too (could result in more code, but gzip?)
	      Expression: function Expression(path) {
	        var node = path.node;

	        if (node[seen]) {
	          return;
	        }

	        if (path.isLiteral()) {
	          return;
	        }

	        if (!path.isPure()) {
	          return;
	        }

	        if (traverse.hasType(node, path.scope, "Identifier", t.FUNCTION_TYPES)) {
	          return;
	        }

	        // -0 maybe compared via dividing and then checking against -Infinity
	        // Also -X will always be -X.
	        if (t.isUnaryExpression(node, { operator: "-" }) && t.isNumericLiteral(node.argument)) {
	          return;
	        }

	        // We have a transform that converts true/false to !0/!1
	        if (t.isUnaryExpression(node, { operator: "!" }) && t.isNumericLiteral(node.argument)) {
	          if (node.argument.value === 0 || node.argument.value === 1) {
	            return;
	          }
	        }

	        // void 0 is used for undefined.
	        if (t.isUnaryExpression(node, { operator: "void" }) && t.isNumericLiteral(node.argument, { value: 0 })) {
	          return;
	        }

	        var res = evaluate(path);
	        if (res.confident) {
	          // Avoid fractions because they can be longer than the original expression.
	          // There is also issues with number percision?
	          if (typeof res.value === "number" && !Number.isInteger(res.value)) {
	            return;
	          }

	          // Preserve -0
	          if (typeof res.value === "number" && res.value === 0) {
	            if (1 / res.value === -Infinity) {
	              var _node2 = t.unaryExpression("-", t.numericLiteral(0), true);
	              _node2[seen] = true;
	              path.replaceWith(_node2);
	              return;
	            }
	          }

	          var _node = t.valueToNode(res.value);
	          _node[seen] = true;
	          path.replaceWith(_node);
	        }
	      }
	    }
	  };
	};

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	function _toConsumableArray(arr) {
	  if (Array.isArray(arr)) {
	    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
	      arr2[i] = arr[i];
	    }return arr2;
	  } else {
	    return Array.from(arr);
	  }
	}

	var some = __webpack_require__(41);

	module.exports = function (_ref) {
	  var t = _ref.types,
	      traverse = _ref.traverse;

	  var removeOrVoid = __webpack_require__(4)(t);
	  var shouldRevisit = Symbol("shouldRevisit");

	  // this is used for tracking fn params that can be removed
	  // as traversal takes place from left and
	  // unused params can be removed only on the right
	  var markForRemoval = Symbol("markForRemoval");

	  var main = {
	    // remove side effectless statement
	    ExpressionStatement: function ExpressionStatement(path) {
	      if (path.get("expression").isPure()) {
	        removeOrVoid(path);
	      }
	    },


	    Function: {

	      // Let's take all the vars in a function that are not in the top level scope and hoist them
	      // with the first var declaration in the top-level scope. This transform in itself may
	      // not yield much returns (or even can be marginally harmful to size). However it's great
	      // for taking away statements from blocks that can be only expressions which the `simplify`
	      // plugin can turn into other things (e.g. if => conditional).
	      exit: function exit(path) {
	        // This hurts gzip size.
	        if (!this.optimizeRawSize) {
	          return;
	        }

	        var node = path.node,
	            scope = path.scope;

	        var seen = new Set();
	        var declars = [];
	        var mutations = [];

	        var _loop = function _loop(name) {
	          var binding = scope.bindings[name];
	          if (!binding.path.isVariableDeclarator()) {
	            return "continue";
	          }

	          var declarPath = binding.path.parentPath;
	          if (seen.has(declarPath)) {
	            return "continue";
	          }
	          seen.add(declarPath);

	          if (declarPath.parentPath.isForInStatement()) {
	            return "continue";
	          }

	          if (declarPath.parentPath.parentPath.isFunction()) {
	            return "continue";
	          }

	          if (!declarPath.node || !declarPath.node.declarations) {
	            return "continue";
	          }

	          var assignmentSequence = [];

	          var _loop2 = function _loop2(declar) {
	            declars.push(declar);
	            if (declar.init) {
	              assignmentSequence.push(t.assignmentExpression("=", declar.id, declar.init));
	              mutations.push(function () {
	                declar.init = null;
	              });
	            }
	          };

	          var _iteratorNormalCompletion2 = true;
	          var _didIteratorError2 = false;
	          var _iteratorError2 = undefined;

	          try {
	            for (var _iterator2 = declarPath.node.declarations[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	              var declar = _step2.value;

	              _loop2(declar);
	            }
	          } catch (err) {
	            _didIteratorError2 = true;
	            _iteratorError2 = err;
	          } finally {
	            try {
	              if (!_iteratorNormalCompletion2 && _iterator2.return) {
	                _iterator2.return();
	              }
	            } finally {
	              if (_didIteratorError2) {
	                throw _iteratorError2;
	              }
	            }
	          }

	          if (assignmentSequence.length) {
	            mutations.push(function () {
	              return declarPath.replaceWith(t.sequenceExpression(assignmentSequence));
	            });
	          } else {
	            mutations.push(function () {
	              return removeOrVoid(declarPath);
	            });
	          }
	        };

	        for (var name in scope.bindings) {
	          var _ret = _loop(name);

	          if (_ret === "continue") continue;
	        }

	        if (declars.length) {
	          mutations.forEach(function (f) {
	            return f();
	          });
	          var _iteratorNormalCompletion = true;
	          var _didIteratorError = false;
	          var _iteratorError = undefined;

	          try {
	            for (var _iterator = node.body.body[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	              var statement = _step.value;

	              if (t.isVariableDeclaration(statement)) {
	                var _statement$declaratio;

	                (_statement$declaratio = statement.declarations).push.apply(_statement$declaratio, declars);
	                return;
	              }
	            }
	          } catch (err) {
	            _didIteratorError = true;
	            _iteratorError = err;
	          } finally {
	            try {
	              if (!_iteratorNormalCompletion && _iterator.return) {
	                _iterator.return();
	              }
	            } finally {
	              if (_didIteratorError) {
	                throw _iteratorError;
	              }
	            }
	          }

	          var varDecl = t.variableDeclaration("var", declars);
	          node.body.body.unshift(varDecl);
	        }
	      }
	    },

	    // Remove bindings with no references.
	    Scope: {
	      exit: function exit(path) {
	        if (path.node[shouldRevisit]) {
	          delete path.node[shouldRevisit];
	          path.visit();
	        }
	      },
	      enter: function enter(path) {
	        var _this = this;

	        if (path.isProgram()) {
	          return;
	        }

	        var scope = path.scope;

	        // if the scope is created by a function, we obtain its
	        // parameter list

	        var canRemoveParams = path.isFunction() && path.node.kind !== "set";
	        var paramsList = canRemoveParams ? path.get("params") : [];

	        for (var i = paramsList.length - 1; i >= 0; i--) {
	          var param = paramsList[i];

	          if (param.isIdentifier()) {
	            var binding = scope.bindings[param.node.name];
	            if (binding.referenced) {
	              // when the first binding is referenced (right to left)
	              // exit without marking anything after this
	              break;
	            }

	            binding[markForRemoval] = true;
	            continue;
	          } else if (param.isAssignmentPattern()) {
	            var left = param.get("left");
	            var right = param.get("right");

	            if (left.isIdentifier() && right.isPure()) {
	              var _binding = scope.bindings[left.node.name];
	              if (_binding.referenced) {
	                // when the first binding is referenced (right to left)
	                // exit without marking anything after this
	                break;
	              }

	              _binding[markForRemoval] = true;
	              continue;
	            }
	          }

	          // other patterns - assignment, object have side-effects
	          // and cannot be safely removed
	          break;
	        }

	        var _loop3 = function _loop3(name) {
	          var binding = scope.bindings[name];

	          if (!binding.referenced && binding.kind !== "module") {
	            var _ret4 = function () {
	              if (binding.kind === "param" && (_this.keepFnArgs || !binding[markForRemoval])) {
	                return {
	                  v: "continue"
	                };
	              } else if (binding.path.isVariableDeclarator()) {
	                if (binding.path.parentPath.parentPath && binding.path.parentPath.parentPath.isForXStatement()) {
	                  // Can't remove if in a for-in/for-of/for-await statement `for (var x in wat)`.
	                  return {
	                    v: "continue"
	                  };
	                }
	              } else if (!scope.isPure(binding.path.node)) {
	                // TODO: AssignmentPattern are marked as impure and unused ids aren't removed yet
	                return {
	                  v: "continue"
	                };
	              } else if (binding.path.isFunctionExpression() || binding.path.isClassExpression()) {
	                // `bar(function foo() {})` foo is not referenced but it's used.
	                return {
	                  v: "continue"
	                };
	              }

	              var mutations = [];
	              var bail = false;
	              // Make sure none of the assignments value is used
	              binding.constantViolations.forEach(function (p) {
	                if (bail || p === binding.path) {
	                  return;
	                }

	                if (!p.parentPath.isExpressionStatement()) {
	                  bail = true;
	                }

	                if (p.isAssignmentExpression() && !p.get("right").isPure()) {
	                  mutations.push(function () {
	                    return p.replaceWith(p.get("right"));
	                  });
	                } else {
	                  mutations.push(function () {
	                    return removeOrVoid(p);
	                  });
	                }
	              });

	              if (bail) {
	                return {
	                  v: "continue"
	                };
	              }

	              if (binding.path.isVariableDeclarator() && binding.path.node.init && !scope.isPure(binding.path.node.init) && binding.path.parentPath.node.declarations) {
	                if (binding.path.parentPath.node.declarations.length !== 1) {
	                  return {
	                    v: "continue"
	                  };
	                }
	                // Bail out for ArrayPattern and ObjectPattern
	                if (!binding.path.get("id").isIdentifier()) {
	                  return {
	                    v: "continue"
	                  };
	                }

	                binding.path.parentPath.replaceWith(binding.path.node.init);
	              } else {
	                updateReferences(binding.path, _this);
	                removeOrVoid(binding.path);
	              }

	              mutations.forEach(function (f) {
	                return f();
	              });
	              scope.removeBinding(name);
	            }();

	            if ((typeof _ret4 === "undefined" ? "undefined" : _typeof(_ret4)) === "object") return _ret4.v;
	          } else if (binding.constant) {
	            if (binding.path.isFunctionDeclaration() || binding.path.isVariableDeclarator() && binding.path.get("init").isFunction()) {
	              var _ret5 = function () {
	                var fun = binding.path.isFunctionDeclaration() ? binding.path : binding.path.get("init");
	                var allInside = true;
	                var _iteratorNormalCompletion3 = true;
	                var _didIteratorError3 = false;
	                var _iteratorError3 = undefined;

	                try {
	                  for (var _iterator3 = binding.referencePaths[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
	                    var ref = _step3.value;

	                    if (!ref.find(function (p) {
	                      return p.node === fun.node;
	                    })) {
	                      allInside = false;
	                      break;
	                    }
	                  }
	                } catch (err) {
	                  _didIteratorError3 = true;
	                  _iteratorError3 = err;
	                } finally {
	                  try {
	                    if (!_iteratorNormalCompletion3 && _iterator3.return) {
	                      _iterator3.return();
	                    }
	                  } finally {
	                    if (_didIteratorError3) {
	                      throw _iteratorError3;
	                    }
	                  }
	                }

	                if (allInside) {
	                  scope.removeBinding(name);
	                  updateReferences(binding.path, _this);
	                  removeOrVoid(binding.path);
	                  return {
	                    v: "continue"
	                  };
	                }
	              }();

	              if ((typeof _ret5 === "undefined" ? "undefined" : _typeof(_ret5)) === "object") return _ret5.v;
	            }

	            if (binding.references === 1 && binding.kind !== "param" && binding.kind !== "module" && binding.constant) {
	              var _ret6 = function () {
	                var replacement = binding.path.node;
	                var replacementPath = binding.path;
	                if (t.isVariableDeclarator(replacement)) {
	                  replacement = replacement.init;
	                  // Bail out for ArrayPattern and ObjectPattern
	                  // TODO: maybe a more intelligent approach instead of simply bailing out
	                  if (!replacementPath.get("id").isIdentifier()) {
	                    return {
	                      v: "continue"
	                    };
	                  }
	                  replacementPath = replacementPath.get("init");
	                }
	                if (!replacement) {
	                  return {
	                    v: "continue"
	                  };
	                }

	                if (!scope.isPure(replacement, true)) {
	                  return {
	                    v: "continue"
	                  };
	                }

	                if (binding.referencePaths.length > 1) {
	                  throw new Error("Expected only one reference");
	                }

	                var bail = false;
	                var refPath = binding.referencePaths[0];

	                if (replacementPath.isIdentifier()) {
	                  bail = refPath.scope.getBinding(replacement.name) !== scope.getBinding(replacement.name);
	                } else {
	                  replacementPath.traverse({
	                    Function: function Function(path) {
	                      path.skip();
	                    },
	                    ReferencedIdentifier: function ReferencedIdentifier(_ref2) {
	                      var node = _ref2.node;

	                      if (bail) {
	                        return;
	                      }
	                      bail = refPath.scope.getBinding(node.name) !== scope.getBinding(node.name);
	                    }
	                  });
	                }

	                if (bail) {
	                  return {
	                    v: "continue"
	                  };
	                }

	                var parent = binding.path.parent;
	                if (t.isVariableDeclaration(parent)) {
	                  parent = binding.path.parentPath.parent;
	                }

	                // 1. Make sure we share the parent with the node. In other words it's lexically defined
	                // and not in an if statement or otherwise.
	                // 2. If the replacement is an object then we have to make sure we are not in a loop or a function
	                // because otherwise we'll be inlining and doing a lot more allocation than we have to
	                // which would also could affect correctness in that they are not the same reference.
	                var mayLoop = false;
	                var sharesRoot = refPath.find(function (_ref3) {
	                  var node = _ref3.node;

	                  if (!mayLoop) {
	                    mayLoop = t.isWhileStatement(node) || t.isFor(node) || t.isFunction(node);
	                  }
	                  return node === parent;
	                });

	                // Anything that inherits from Object.
	                var isObj = function isObj(n) {
	                  return t.isFunction(n) || t.isObjectExpression(n) || t.isArrayExpression(n);
	                };
	                var isReplacementObj = isObj(replacement) || some(replacement, isObj);

	                if (!sharesRoot || isReplacementObj && mayLoop) {
	                  return {
	                    v: "continue"
	                  };
	                }

	                var replaced = replace(binding.referencePaths[0], {
	                  binding: binding,
	                  scope: scope,
	                  replacement: replacement
	                });

	                if (replaced) {
	                  scope.removeBinding(name);
	                  if (binding.path.node) {
	                    removeOrVoid(binding.path);
	                  }
	                }
	              }();

	              if ((typeof _ret6 === "undefined" ? "undefined" : _typeof(_ret6)) === "object") return _ret6.v;
	            }
	          }
	        };

	        for (var name in scope.bindings) {
	          var _ret3 = _loop3(name);

	          if (_ret3 === "continue") continue;
	        }
	      }
	    },

	    // Remove unreachable code.
	    BlockStatement: function BlockStatement(path) {
	      var paths = path.get("body");

	      var purge = false;

	      for (var i = 0; i < paths.length; i++) {
	        var p = paths[i];

	        if (!purge && p.isCompletionStatement()) {
	          purge = true;
	          continue;
	        }

	        if (purge && !canExistAfterCompletion(p)) {
	          removeOrVoid(p);
	        }
	      }
	    },


	    // Double check unreachable code and remove return statements that
	    // have no semantic meaning
	    ReturnStatement: function ReturnStatement(path) {
	      var node = path.node;

	      if (!path.inList) {
	        return;
	      }

	      // Not last in it's block? (See BlockStatement visitor)
	      if (path.container.length - 1 !== path.key && !canExistAfterCompletion(path.getSibling(path.key + 1)) && path.parentPath.isBlockStatement()) {
	        // This is probably a new oppurtinity by some other transform
	        // let's call the block visitor on this again before proceeding.
	        path.parentPath.pushContext(path.context);
	        path.parentPath.visit();
	        path.parentPath.popContext();

	        return;
	      }

	      if (node.argument) {
	        return;
	      }

	      var noNext = true;
	      var parentPath = path.parentPath;
	      while (parentPath && !parentPath.isFunction() && noNext) {
	        // https://github.com/babel/babili/issues/265
	        if (hasLoopParent(parentPath)) {
	          noNext = false;
	          break;
	        }

	        var nextPath = parentPath.getSibling(parentPath.key + 1);
	        if (nextPath.node) {
	          if (nextPath.isReturnStatement()) {
	            nextPath.pushContext(path.context);
	            nextPath.visit();
	            nextPath.popContext();
	            if (parentPath.getSibling(parentPath.key + 1).node) {
	              noNext = false;
	              break;
	            }
	          } else {
	            noNext = false;
	            break;
	          }
	        }

	        parentPath = parentPath.parentPath;
	      }

	      if (noNext) {
	        removeOrVoid(path);
	      }
	    },
	    ConditionalExpression: function ConditionalExpression(path) {
	      var node = path.node;

	      var evaluateTest = path.get("test").evaluateTruthy();
	      if (evaluateTest === true) {
	        path.replaceWith(node.consequent);
	      } else if (evaluateTest === false) {
	        path.replaceWith(node.alternate);
	      }
	    },


	    IfStatement: {
	      exit: function exit(path) {
	        var consequent = path.get("consequent");
	        var alternate = path.get("alternate");
	        var test = path.get("test");

	        var evaluateTest = test.evaluateTruthy();

	        // we can check if a test will be truthy 100% and if so then we can inline
	        // the consequent and completely ignore the alternate
	        //
	        //   if (true) { foo; } -> { foo; }
	        //   if ("foo") { foo; } -> { foo; }
	        //
	        if (evaluateTest === true) {
	          path.replaceWithMultiple([].concat(_toConsumableArray(toStatements(consequent)), _toConsumableArray(extractVars(alternate))));
	          return;
	        }

	        // we can check if a test will be falsy 100% and if so we can inline the
	        // alternate if there is one and completely remove the consequent
	        //
	        //   if ("") { bar; } else { foo; } -> { foo; }
	        //   if ("") { bar; } ->
	        //
	        if (evaluateTest === false) {
	          if (alternate.node) {
	            path.replaceWithMultiple([].concat(_toConsumableArray(toStatements(alternate)), _toConsumableArray(extractVars(consequent))));
	            return;
	          } else {
	            path.replaceWithMultiple(extractVars(consequent));
	          }
	        }

	        // remove alternate blocks that are empty
	        //
	        //   if (foo) { foo; } else {} -> if (foo) { foo; }
	        //
	        if (alternate.isBlockStatement() && !alternate.node.body.length) {
	          alternate.remove();
	          // For if-statements babel-traverse replaces with an empty block
	          path.node.alternate = null;
	        }

	        // if the consequent block is empty turn alternate blocks into a consequent
	        // and flip the test
	        //
	        //   if (foo) {} else { bar; } -> if (!foo) { bar; }
	        //
	        if (consequent.isBlockStatement() && !consequent.node.body.length && alternate.isBlockStatement() && alternate.node.body.length) {
	          consequent.replaceWith(alternate.node);
	          alternate.remove();
	          // For if-statements babel-traverse replaces with an empty block
	          path.node.alternate = null;
	          test.replaceWith(t.unaryExpression("!", test.node, true));
	        }
	      }
	    },

	    SwitchStatement: {
	      exit: function exit(path) {
	        var evaluated = path.get("discriminant").evaluate();

	        if (!evaluated.confident) return;

	        var discriminant = evaluated.value;
	        var cases = path.get("cases");

	        var matchingCaseIndex = -1;
	        var defaultCaseIndex = -1;

	        for (var i = 0; i < cases.length; i++) {
	          var test = cases[i].get("test");

	          // handle default case
	          if (test.node === null) {
	            defaultCaseIndex = i;
	            continue;
	          }

	          var testResult = test.evaluate();

	          // if we are not able to deternine a test during
	          // compile time, we terminate immediately
	          if (!testResult.confident) return;

	          if (testResult.value === discriminant) {
	            matchingCaseIndex = i;
	            break;
	          }
	        }

	        var result = void 0;

	        if (matchingCaseIndex === -1) {
	          if (defaultCaseIndex === -1) {
	            path.skip();
	            path.replaceWithMultiple(extractVars(path));
	            return;
	          } else {
	            result = getStatementsUntilBreak(defaultCaseIndex);
	          }
	        } else {
	          result = getStatementsUntilBreak(matchingCaseIndex);
	        }

	        if (result.bail) return;

	        // we extract vars from the entire switch statement
	        // and there will be duplicates which
	        // will be again removed by DCE
	        replaceSwitch([].concat(_toConsumableArray(extractVars(path)), _toConsumableArray(result.statements)));

	        function getStatementsUntilBreak(start) {
	          var result = {
	            bail: false,
	            statements: []
	          };

	          for (var _i = start; _i < cases.length; _i++) {
	            var consequent = cases[_i].get("consequent");

	            for (var j = 0; j < consequent.length; j++) {
	              var _isBreaking = isBreaking(consequent[j], path);
	              if (_isBreaking.bail) {
	                result.bail = true;
	                return result;
	              }
	              if (_isBreaking.break) {
	                // compute no more
	                // exit out of the loop
	                return result;
	              } else {
	                result.statements.push(consequent[j].node);
	              }
	            }
	          }

	          return result;
	        }

	        function replaceSwitch(statements) {
	          var isBlockRequired = false;

	          for (var _i2 = 0; _i2 < statements.length; _i2++) {
	            if (t.isVariableDeclaration(statements[_i2], { kind: "let" })) {
	              isBlockRequired = true;
	              break;
	            }
	            if (t.isVariableDeclaration(statements[_i2], { kind: "const" })) {
	              isBlockRequired = true;
	              break;
	            }
	          }

	          if (isBlockRequired) {
	            path.replaceWith(t.BlockStatement(statements));
	          } else {
	            path.replaceWithMultiple(statements);
	          }
	        }
	      }
	    },

	    WhileStatement: function WhileStatement(path) {
	      var test = path.get("test");
	      var result = test.evaluate();
	      if (result.confident && !result.value) {
	        path.remove();
	      }
	    },
	    ForStatement: function ForStatement(path) {
	      var test = path.get("test");
	      var result = test.evaluate();
	      if (result.confident) {
	        if (result.value) {
	          test.remove();
	        } else {
	          path.remove();
	        }
	      }
	    },
	    DoWhileStatement: function DoWhileStatement(path) {
	      var test = path.get("test");
	      var result = test.evaluate();
	      if (result.confident && !result.value) {
	        path.replaceWith(path.get("body").node);
	      }
	    },


	    // Join assignment and definition when in sequence.
	    // var x; x = 1; -> var x = 1;
	    AssignmentExpression: function AssignmentExpression(path) {
	      if (!path.get("left").isIdentifier() || !path.parentPath.isExpressionStatement()) {
	        return;
	      }

	      var prev = path.parentPath.getSibling(path.parentPath.key - 1);
	      if (!(prev && prev.isVariableDeclaration())) {
	        return;
	      }

	      var declars = prev.node.declarations;
	      if (declars.length !== 1 || declars[0].init || declars[0].id.name !== path.get("left").node.name) {
	        return;
	      }
	      declars[0].init = path.node.right;
	      removeOrVoid(path);
	    },


	    // Remove named function expression name. While this is dangerous as it changes
	    // `function.name` all minifiers do it and hence became a standard.
	    "FunctionExpression": function FunctionExpression(path) {
	      if (!this.keepFnName) {
	        removeUnreferencedId(path);
	      }
	    },


	    // remove class names
	    "ClassExpression": function ClassExpression(path) {
	      if (!this.keepClassName) {
	        removeUnreferencedId(path);
	      }
	    },


	    // Put the `var` in the left if feasible.
	    ForInStatement: function ForInStatement(path) {
	      var left = path.get("left");
	      if (!left.isIdentifier()) {
	        return;
	      }

	      var binding = path.scope.getBinding(left.node.name);
	      if (!binding) {
	        return;
	      }

	      if (binding.scope.getFunctionParent() !== path.scope.getFunctionParent()) {
	        return;
	      }

	      if (!binding.path.isVariableDeclarator()) {
	        return;
	      }

	      if (binding.path.parentPath.parentPath.isForInStatement({ left: binding.path.parent })) {
	        return;
	      }

	      // If it has company then it's probably more efficient to keep.
	      if (binding.path.parent.declarations.length > 1) {
	        return;
	      }

	      // meh
	      if (binding.path.node.init) {
	        return;
	      }

	      removeOrVoid(binding.path);
	      path.node.left = t.variableDeclaration("var", [t.variableDeclarator(left.node)]);
	      binding.path = path.get("left").get("declarations")[0];
	    }
	  };

	  return {
	    name: "minify-dead-code-elimination",
	    visitor: {
	      EmptyStatement: function EmptyStatement(path) {
	        if (path.parentPath.isBlockStatement() || path.parentPath.isProgram()) {
	          path.remove();
	        }
	      },

	      Program: {
	        exit: function exit(path) {
	          var _ref4 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
	              _ref4$opts = _ref4.opts;

	          _ref4$opts = _ref4$opts === undefined ? {} : _ref4$opts;
	          var _ref4$opts$optimizeRa = _ref4$opts.optimizeRawSize,
	              optimizeRawSize = _ref4$opts$optimizeRa === undefined ? false : _ref4$opts$optimizeRa,
	              _ref4$opts$keepFnName = _ref4$opts.keepFnName,
	              keepFnName = _ref4$opts$keepFnName === undefined ? false : _ref4$opts$keepFnName,
	              _ref4$opts$keepClassN = _ref4$opts.keepClassName,
	              keepClassName = _ref4$opts$keepClassN === undefined ? false : _ref4$opts$keepClassN,
	              _ref4$opts$keepFnArgs = _ref4$opts.keepFnArgs,
	              keepFnArgs = _ref4$opts$keepFnArgs === undefined ? false : _ref4$opts$keepFnArgs;

	          traverse.clearCache();
	          path.scope.crawl();

	          // We need to run this plugin in isolation.
	          path.traverse(main, {
	            functionToBindings: new Map(),
	            optimizeRawSize: optimizeRawSize,
	            keepFnName: keepFnName,
	            keepClassName: keepClassName,
	            keepFnArgs: keepFnArgs
	          });
	        }
	      }
	    }
	  };

	  function toStatements(path) {
	    var node = path.node;

	    if (path.isBlockStatement()) {
	      var hasBlockScoped = false;

	      for (var i = 0; i < node.body.length; i++) {
	        var bodyNode = node.body[i];
	        if (t.isBlockScoped(bodyNode)) {
	          hasBlockScoped = true;
	        }
	      }

	      if (!hasBlockScoped) {
	        return node.body;
	      }
	    }
	    return [node];
	  }

	  // Extracts vars from a path
	  // Useful for removing blocks or paths that can contain
	  // variable declarations inside them
	  // Note:
	  // drops are inits
	  // extractVars({ var x = 5, y = x }) => var x, y;
	  function extractVars(path) {
	    var declarators = [];

	    if (path.isVariableDeclaration({ kind: "var" })) {
	      var _iteratorNormalCompletion4 = true;
	      var _didIteratorError4 = false;
	      var _iteratorError4 = undefined;

	      try {
	        for (var _iterator4 = path.node.declarations[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
	          var decl = _step4.value;

	          declarators.push(t.variableDeclarator(decl.id));
	        }
	      } catch (err) {
	        _didIteratorError4 = true;
	        _iteratorError4 = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion4 && _iterator4.return) {
	            _iterator4.return();
	          }
	        } finally {
	          if (_didIteratorError4) {
	            throw _iteratorError4;
	          }
	        }
	      }
	    } else {
	      path.traverse({
	        VariableDeclaration: function VariableDeclaration(varPath) {
	          if (!varPath.isVariableDeclaration({ kind: "var" })) return;
	          if (!isSameFunctionScope(varPath, path)) return;

	          var _iteratorNormalCompletion5 = true;
	          var _didIteratorError5 = false;
	          var _iteratorError5 = undefined;

	          try {
	            for (var _iterator5 = varPath.node.declarations[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
	              var _decl = _step5.value;

	              declarators.push(t.variableDeclarator(_decl.id));
	            }
	          } catch (err) {
	            _didIteratorError5 = true;
	            _iteratorError5 = err;
	          } finally {
	            try {
	              if (!_iteratorNormalCompletion5 && _iterator5.return) {
	                _iterator5.return();
	              }
	            } finally {
	              if (_didIteratorError5) {
	                throw _iteratorError5;
	              }
	            }
	          }
	        }
	      });
	    }

	    if (declarators.length <= 0) return [];

	    return [t.variableDeclaration("var", declarators)];
	  }

	  function replace(path, options) {
	    var replacement = options.replacement,
	        scope = options.scope,
	        binding = options.binding;

	    // Same name, different binding.

	    if (scope.getBinding(path.node.name) !== binding) {
	      return;
	    }

	    // We don't want to move code around to different scopes because:
	    // 1. Original bindings that is referenced could be shadowed
	    // 2. Moving defintions to potentially hot code is bad
	    if (scope !== path.scope) {
	      var _ret7 = function () {
	        if (t.isClass(replacement) || t.isFunction(replacement)) {
	          return {
	            v: void 0
	          };
	        }

	        var bail = false;
	        traverse(replacement, {
	          Function: function Function(path) {
	            if (bail) {
	              return;
	            }
	            bail = true;
	            path.stop();
	          }
	        }, scope);

	        if (bail) {
	          return {
	            v: void 0
	          };
	        }
	      }();

	      if ((typeof _ret7 === "undefined" ? "undefined" : _typeof(_ret7)) === "object") return _ret7.v;
	    }

	    // Avoid recursion.
	    if (path.find(function (_ref5) {
	      var node = _ref5.node;
	      return node === replacement;
	    })) {
	      return;
	    }

	    // https://github.com/babel/babili/issues/130
	    if (!t.isExpression(replacement)) {
	      t.toExpression(replacement);
	    }

	    // We don't remove fn name here, we let the FnExpr & ClassExpr visitors
	    // check its references and remove unreferenced ones
	    // if (t.isFunction(replacement)) {
	    //   replacement.id = null;
	    // }

	    path.replaceWith(replacement);
	    return true;
	  }

	  function updateReferences(fnToDeletePath) {
	    if (!fnToDeletePath.isFunction()) {
	      return;
	    }

	    fnToDeletePath.traverse({
	      ReferencedIdentifier: function ReferencedIdentifier(path) {
	        var node = path.node,
	            scope = path.scope;

	        var binding = scope.getBinding(node.name);

	        if (!binding || !binding.path.isFunction() || binding.scope === scope || !binding.constant) {
	          return;
	        }

	        var index = binding.referencePaths.indexOf(path);
	        if (index === -1) {
	          return;
	        }
	        binding.references--;
	        binding.referencePaths.splice(index, 1);
	        if (binding.references === 0) {
	          binding.referenced = false;
	        }

	        if (binding.references <= 1 && binding.scope.path.node) {
	          binding.scope.path.node[shouldRevisit] = true;
	        }
	      }
	    });
	  }

	  function removeUnreferencedId(path) {
	    var id = path.get("id").node;
	    if (!id) {
	      return;
	    }

	    var node = path.node,
	        scope = path.scope;

	    var binding = scope.getBinding(id.name);

	    // Check if shadowed or is not referenced.
	    if (binding && (binding.path.node !== node || !binding.referenced)) {
	      node.id = null;
	    }
	  }

	  // path1 -> path2
	  // is path1 an ancestor of path2
	  function isAncestor(path1, path2) {
	    return !!path2.findParent(function (parent) {
	      return parent === path1;
	    });
	  }

	  function isSameFunctionScope(path1, path2) {
	    return path1.scope.getFunctionParent() === path2.scope.getFunctionParent();
	  }

	  // tells if a "stmt" is a break statement that would break the "path"
	  function isBreaking(stmt, path) {
	    if (stmt.isBreakStatement()) {
	      return _isBreaking(stmt, path);
	    }

	    var isBroken = false;
	    var result = {
	      break: false,
	      bail: false
	    };

	    stmt.traverse({
	      BreakStatement: function BreakStatement(breakPath) {
	        // if we already detected a break statement,
	        if (isBroken) return;

	        result = _isBreaking(breakPath, path);

	        if (result.bail || result.break) {
	          isBroken = true;
	        }
	      }
	    });

	    return result;

	    function _isBreaking(breakPath, path) {
	      var label = breakPath.get("label");

	      if (label.node !== null) {
	        // labels are fn scoped and not accessible by inner functions
	        // path is the switch statement
	        if (!isSameFunctionScope(path, breakPath)) {
	          // we don't have to worry about this break statement
	          return {
	            break: false,
	            bail: false
	          };
	        }

	        // here we handle the break labels
	        // if they are outside switch, we bail out
	        // if they are within the case, we keep them
	        var labelPath = void 0;
	        if (path.scope.getLabel) {
	          labelPath = getLabel(label.node.name, path);
	        } else {
	          labelPath = path.scope.getBinding(label.node.name).path;
	        }
	        var _isAncestor = isAncestor(labelPath, path);

	        return {
	          bail: _isAncestor,
	          break: _isAncestor
	        };
	      }

	      // set the flag that it is indeed breaking
	      var isBreak = true;

	      // this flag is to capture
	      // switch(0) { case 0: while(1) if (x) break; }
	      var possibleRunTimeBreak = false;

	      // and compute if it's breaking the correct thing
	      var parent = breakPath.parentPath;

	      while (parent !== stmt.parentPath) {
	        // loops and nested switch cases
	        if (parent.isLoop() || parent.isSwitchCase()) {
	          // invalidate all the possible runtime breaks captured
	          // while (1) { if (x) break; }
	          possibleRunTimeBreak = false;

	          // and set that it's not breaking our switch statement
	          isBreak = false;
	          break;
	        }
	        //
	        // this is a special case and depends on
	        // the fact that SwitchStatement is handled in the
	        // exit hook of the traverse
	        //
	        // switch (0) {
	        //   case 0: if (x) break;
	        // }
	        //
	        // here `x` is runtime only.
	        // in this case, we need to bail out. So we depend on exit hook
	        // of switch so that, it would have visited the IfStatement first
	        // before the SwitchStatement and would have removed the
	        // IfStatement if it was a compile time determined
	        //
	        if (parent.isIfStatement()) {
	          possibleRunTimeBreak = true;
	        }
	        parent = parent.parentPath;
	      }

	      return {
	        break: possibleRunTimeBreak || isBreak,
	        bail: possibleRunTimeBreak
	      };
	    }
	  }

	  // things that are hoisted
	  function canExistAfterCompletion(path) {
	    return path.isFunctionDeclaration() || path.isVariableDeclaration({ kind: "var" });
	  }

	  function getLabel(name, _path) {
	    var label = void 0,
	        path = _path;
	    do {
	      label = path.scope.getLabel(name);
	      if (label) {
	        return label;
	      }
	    } while (path = path.parentPath);
	    return null;
	  }

	  function hasLoopParent(path) {
	    var parent = path;
	    do {
	      if (parent.isLoop()) {
	        return true;
	      }
	    } while (parent = parent.parentPath);
	    return false;
	  }
	};

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	module.exports = function (_ref) {
	  var t = _ref.types;

	  var isVoid0 = __webpack_require__(3)(t);

	  return {
	    name: "minify-flip-comparisons",
	    visitor: {
	      // flip comparisons with a pure right hand value, this ensures
	      // consistency with comparisons and increases the length of
	      // strings that gzip can match
	      // typeof blah === 'function' -> 'function' === typeof blah
	      BinaryExpression: function BinaryExpression(path) {
	        var node = path.node;
	        var right = node.right,
	            left = node.left;

	        // Make sure we have a constant on the right.

	        if (!t.isLiteral(right) && !isVoid0(right) && !(t.isUnaryExpression(right) && t.isLiteral(right.argument)) && !t.isObjectExpression(right) && !t.isArrayExpression(right)) {
	          return;
	        }

	        // Commutative operators.
	        if (t.EQUALITY_BINARY_OPERATORS.indexOf(node.operator) >= 0 || ["*", "^", "&", "|"].indexOf(node.operator) >= 0) {
	          node.left = right;
	          node.right = left;
	          return;
	        }

	        if (t.BOOLEAN_NUMBER_BINARY_OPERATORS.indexOf(node.operator) >= 0) {
	          node.left = right;
	          node.right = left;
	          var operator = void 0;
	          switch (node.operator) {
	            case ">":
	              operator = "<";break;
	            case "<":
	              operator = ">";break;
	            case ">=":
	              operator = "<=";break;
	            case "<=":
	              operator = ">=";break;
	          }
	          node.operator = operator;
	          return;
	        }
	      }
	    }
	  };
	};

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	module.exports = function (_ref) {
	  var t = _ref.types;

	  var flipExpressions = __webpack_require__(2)(t);

	  return {
	    name: "minify-guarded-expressions",
	    visitor: {
	      // Convert guarded expressions
	      // !a && b() --> a || b();
	      // This could change the return result of the expression so we only do it
	      // on things where the result is ignored.
	      LogicalExpression: {
	        enter: [function (path) {
	          var node = path.node;

	          var left = path.get("left");
	          var right = path.get("right");

	          // issues - 171, 174, 176
	          // we assume that it is returned/assigned/part of a bigger expression
	          // or utilized somehow
	          // we check if we shouldBail only when evaluating
	          // the rightside of the expression;
	          // if the left side is evaluated to be deterministic,
	          // we can safely replace the entire expression
	          var shouldBail = !path.parentPath.isExpressionStatement();

	          if (node.operator === "&&") {
	            var leftTruthy = left.evaluateTruthy();
	            if (leftTruthy === false) {
	              // Short-circuit
	              path.replaceWith(node.left);
	            } else if (leftTruthy === true && left.isPure()) {
	              path.replaceWith(node.right);
	            } else if (right.evaluateTruthy() === false && right.isPure() && !shouldBail) {
	              path.replaceWith(node.left);
	            }
	          } else if (node.operator === "||") {
	            var _leftTruthy = left.evaluateTruthy();
	            if (_leftTruthy === false && left.isPure()) {
	              path.replaceWith(node.right);
	            } else if (_leftTruthy === true) {
	              // Short-circuit
	              path.replaceWith(node.left);
	            } else if (right.evaluateTruthy() === false && right.isPure() && !shouldBail) {
	              path.replaceWith(node.left);
	            }
	          }
	        }, function (path) {
	          var node = path.node;

	          if (flipExpressions.hasSeen(node)) {
	            return;
	          }

	          if (!path.parentPath.isExpressionStatement() && !(path.parentPath.isSequenceExpression() && path.parentPath.parentPath.isExpressionStatement())) {
	            return;
	          }

	          // Start counting savings from one since we can ignore the last
	          // expression.
	          if (flipExpressions.shouldFlip(node, 1)) {
	            var newNode = flipExpressions.flip(node, true);
	            path.replaceWith(newNode);
	          }
	        }]
	      }
	    }
	  };
	};

/***/ },
/* 9 */
/***/ function(module, exports) {

	"use strict";

	var _createClass = function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
	    }
	  }return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
	  };
	}();

	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	}

	module.exports = function (_ref) {
	  var t = _ref.types;

	  var hop = Object.prototype.hasOwnProperty;

	  var Mangler = function () {
	    function Mangler(charset, program) {
	      var _ref2 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
	          _ref2$blacklist = _ref2.blacklist,
	          blacklist = _ref2$blacklist === undefined ? {} : _ref2$blacklist,
	          _ref2$keepFnName = _ref2.keepFnName,
	          keepFnName = _ref2$keepFnName === undefined ? false : _ref2$keepFnName,
	          _ref2$keepClassName = _ref2.keepClassName,
	          keepClassName = _ref2$keepClassName === undefined ? false : _ref2$keepClassName,
	          _ref2$eval = _ref2.eval,
	          _eval = _ref2$eval === undefined ? false : _ref2$eval;

	      _classCallCheck(this, Mangler);

	      this.charset = charset;
	      this.program = program;
	      this.blacklist = blacklist;
	      this.keepFnName = keepFnName;
	      this.keepClassName = keepClassName;
	      this.eval = _eval;

	      this.unsafeScopes = new Set();
	      this.visitedScopes = new Set();

	      this.referencesToUpdate = new Map();
	    }

	    _createClass(Mangler, [{
	      key: "run",
	      value: function run() {
	        this.collect();
	        this.charset.sort();
	        this.mangle();
	      }
	    }, {
	      key: "isBlacklist",
	      value: function isBlacklist(name) {
	        return hop.call(this.blacklist, name);
	      }
	    }, {
	      key: "markUnsafeScopes",
	      value: function markUnsafeScopes(scope) {
	        var evalScope = scope;
	        do {
	          this.unsafeScopes.add(evalScope);
	        } while (evalScope = evalScope.parent);
	      }
	    }, {
	      key: "collect",
	      value: function collect() {
	        var mangler = this;

	        var collectVisitor = {
	          // capture direct evals
	          CallExpression: function CallExpression(path) {
	            var callee = path.get("callee");

	            if (callee.isIdentifier() && callee.node.name === "eval" && !callee.scope.getBinding("eval")) {
	              mangler.markUnsafeScopes(path.scope);
	            }
	          }
	        };

	        if (this.charset.shouldConsider) {
	          // charset considerations
	          collectVisitor.Identifier = function Identifier(path) {
	            var node = path.node;

	            if (path.parentPath.isMemberExpression({ property: node }) || path.parentPath.isObjectProperty({ key: node })) {
	              mangler.charset.consider(node.name);
	            }
	          };

	          // charset considerations
	          collectVisitor.Literal = function Literal(_ref3) {
	            var node = _ref3.node;

	            mangler.charset.consider(String(node.value));
	          };
	        }

	        this.program.traverse(collectVisitor);
	      }
	    }, {
	      key: "mangle",
	      value: function mangle() {
	        var mangler = this;

	        this.program.traverse({
	          Scopable: function Scopable(path) {
	            var scope = path.scope;

	            if (!mangler.eval && mangler.unsafeScopes.has(scope)) return;

	            if (mangler.visitedScopes.has(scope)) return;
	            mangler.visitedScopes.add(scope);

	            var i = 0;
	            function getNext() {
	              return mangler.charset.getIdentifier(i++);
	            }

	            // This is useful when we have vars of single character
	            // => var a, ...z, A, ...Z, $, _;
	            // to
	            // => var aa, a, b ,c;
	            // instead of
	            // => var aa, ab, ...;
	            // TODO:
	            // Re-enable after enabling this feature
	            // This doesn't work right now as we are concentrating
	            // on performance improvements
	            // function resetNext() {
	            //   i = 0;
	            // }

	            var bindings = scope.getAllBindings();
	            var names = Object.keys(bindings);

	            for (var _i = 0; _i < names.length; _i++) {
	              var oldName = names[_i];
	              var binding = bindings[oldName];

	              if (
	              // already renamed bindings
	              binding.renamed
	              // arguments
	              || oldName === "arguments"
	              // globals
	              || mangler.program.scope.bindings[oldName] === binding
	              // other scope bindings
	              || !scope.hasOwnBinding(oldName)
	              // labels
	              || binding.path.isLabeledStatement()
	              // blacklisted
	              || mangler.isBlacklist(oldName)
	              // function names
	              || (mangler.keepFnName ? isFunction(binding.path) : false)
	              // class names
	              || (mangler.keepClassName ? isClass(binding.path) : false)) {
	                continue;
	              }

	              var next = void 0;
	              do {
	                next = getNext();
	              } while (!t.isValidIdentifier(next) || hop.call(bindings, next) || scope.hasGlobal(next) || scope.hasReference(next));

	              // TODO:
	              // re-enable this - check above
	              // resetNext();
	              mangler.rename(scope, oldName, next);
	              // mark the binding as renamed
	              binding.renamed = true;
	            }
	          }
	        });

	        // TODO:
	        // re-enable
	        // check above
	        // this.updateReferences();
	      }
	    }, {
	      key: "rename",
	      value: function rename(scope, oldName, newName) {
	        var binding = scope.getBinding(oldName);

	        // rename at the declaration level
	        binding.identifier.name = newName;

	        var bindings = scope.bindings;

	        bindings[newName] = binding;
	        delete bindings[oldName];

	        // update all constant violations & redeclarations
	        var violations = binding.constantViolations;

	        var _loop = function _loop(i) {
	          if (violations[i].isLabeledStatement()) return "continue";

	          var bindings = violations[i].getBindingIdentifiers();
	          Object.keys(bindings).map(function (b) {
	            bindings[b].name = newName;
	          });
	        };

	        for (var i = 0; i < violations.length; i++) {
	          var _ret = _loop(i);

	          if (_ret === "continue") continue;
	        }

	        // update all referenced places
	        var refs = binding.referencePaths;
	        for (var _i2 = 0; _i2 < refs.length; _i2++) {
	          var path = refs[_i2];
	          var node = path.node;

	          if (!path.isIdentifier()) {
	            // Ideally, this should not happen
	            // it happens in these places now -
	            // case 1: Export Statements
	            // This is a bug in babel
	            // https://github.com/babel/babel/pull/3629
	            // case 2: Replacements in other plugins
	            // eg: https://github.com/babel/babili/issues/122
	            // replacement in dce from `x` to `!x` gives referencePath as `!x`
	            path.traverse({
	              ReferencedIdentifier: function ReferencedIdentifier(refPath) {
	                if (refPath.node.name === oldName && refPath.scope === scope) {
	                  refPath.node.name = newName;
	                }
	              }
	            });
	          } else if (!isLabelIdentifier(path)) {
	            node.name = newName;
	          }
	        }
	      }
	    }]);

	    return Mangler;
	  }();

	  return {
	    name: "minify-mangle-names",
	    visitor: {
	      Program: function Program(path) {
	        // If the source code is small then we're going to assume that the user
	        // is running on this on single files before bundling. Therefore we
	        // need to achieve as much determinisim and we will not do any frequency
	        // sorting on the character set. Currently the number is pretty arbitrary.
	        var shouldConsiderSource = path.getSource().length > 70000;

	        var charset = new Charset(shouldConsiderSource);

	        var mangler = new Mangler(charset, path, this.opts);
	        mangler.run();
	      }
	    }
	  };
	};

	var CHARSET = ("abcdefghijklmnopqrstuvwxyz" + "ABCDEFGHIJKLMNOPQRSTUVWXYZ$_").split("");

	var Charset = function () {
	  function Charset(shouldConsider) {
	    var _this = this;

	    _classCallCheck(this, Charset);

	    this.shouldConsider = shouldConsider;
	    this.chars = CHARSET.slice();
	    this.frequency = {};
	    this.chars.forEach(function (c) {
	      _this.frequency[c] = 0;
	    });
	    this.finalized = false;
	  }

	  _createClass(Charset, [{
	    key: "consider",
	    value: function consider(str) {
	      var _this2 = this;

	      if (!this.shouldConsider) {
	        return;
	      }

	      str.split("").forEach(function (c) {
	        if (_this2.frequency[c] != null) {
	          _this2.frequency[c]++;
	        }
	      });
	    }
	  }, {
	    key: "sort",
	    value: function sort() {
	      var _this3 = this;

	      if (this.shouldConsider) {
	        this.chars = this.chars.sort(function (a, b) {
	          return _this3.frequency[b] - _this3.frequency[a];
	        });
	      }

	      this.finalized = true;
	    }
	  }, {
	    key: "getIdentifier",
	    value: function getIdentifier(num) {
	      if (!this.finalized) {
	        throw new Error("Should sort first");
	      }

	      var ret = "";
	      num++;
	      do {
	        num--;
	        ret += this.chars[num % this.chars.length];
	        num = Math.floor(num / this.chars.length);
	      } while (num > 0);
	      return ret;
	    }
	  }]);

	  return Charset;
	}();

	// for keepFnName


	function isFunction(path) {
	  return path.isFunctionExpression() || path.isFunctionDeclaration();
	}

	// for keepClassName
	function isClass(path) {
	  return path.isClassExpression() || path.isClassDeclaration();
	}

	function isLabelIdentifier(path) {
	  var node = path.node;

	  return path.parentPath.isLabeledStatement({ label: node }) || path.parentPath.isBreakStatement({ label: node }) || path.parentPath.isContinueStatement({ label: node });
	}

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _slicedToArray = function () {
	  function sliceIterator(arr, i) {
	    var _arr = [];var _n = true;var _d = false;var _e = undefined;try {
	      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
	        _arr.push(_s.value);if (i && _arr.length === i) break;
	      }
	    } catch (err) {
	      _d = true;_e = err;
	    } finally {
	      try {
	        if (!_n && _i["return"]) _i["return"]();
	      } finally {
	        if (_d) throw _e;
	      }
	    }return _arr;
	  }return function (arr, i) {
	    if (Array.isArray(arr)) {
	      return arr;
	    } else if (Symbol.iterator in Object(arr)) {
	      return sliceIterator(arr, i);
	    } else {
	      throw new TypeError("Invalid attempt to destructure non-iterable instance");
	    }
	  };
	}();

	function _toConsumableArray(arr) {
	  if (Array.isArray(arr)) {
	    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
	      arr2[i] = arr[i];
	    }return arr2;
	  } else {
	    return Array.from(arr);
	  }
	}

	var PatternMatch = __webpack_require__(27);

	module.exports = function (_ref) {
	  var t = _ref.types;

	  var flipExpressions = __webpack_require__(2)(t);
	  var toMultipleSequenceExpressions = __webpack_require__(22)(t);

	  var VOID_0 = t.unaryExpression("void", t.numericLiteral(0), true);
	  var condExprSeen = Symbol("condExprSeen");
	  var seqExprSeen = Symbol("seqExprSeen");
	  var shouldRevisit = Symbol("shouldRevisit");

	  // Types as symbols for comparisions
	  var types = {};
	  t.TYPES.forEach(function (type) {
	    types[type] = Symbol.for(type);
	  });
	  var isNodeOfType = function isNodeOfType(node, typeSymbol) {
	    if ((typeof typeSymbol === "undefined" ? "undefined" : _typeof(typeSymbol)) !== "symbol") return false;
	    return t["is" + Symbol.keyFor(typeSymbol)](node);
	  };

	  // small abstractions
	  var not = function not(node) {
	    return t.unaryExpression("!", node);
	  };
	  var notnot = function notnot(node) {
	    return not(not(node));
	  };
	  var or = function or(a, b) {
	    return t.logicalExpression("||", a, b);
	  };
	  var and = function and(a, b) {
	    return t.logicalExpression("&&", a, b);
	  };

	  var operators = new Set(["+", "-", "*", "%", "<<", ">>", ">>>", "&", "|", "^", "/", "**"]);

	  var updateOperators = new Set(["+", "-"]);

	  function areArraysEqual(arr1, arr2) {
	    return arr1.every(function (value, index) {
	      return String(value) === String(arr2[index]);
	    });
	  }

	  function getName(node) {
	    if (node.type === "ThisExpression") {
	      return "this";
	    }
	    if (node.type === "Super") {
	      return "super";
	    }
	    if (node.type === "NullLiteral") {
	      return "null";
	    }
	    // augment identifiers so that they don't match
	    // string/number literals
	    // but still match against each other
	    return node.name ? node.name + "_" : node.value /* Literal */;
	  }

	  function getPropNames(path) {
	    if (!path.isMemberExpression()) {
	      return;
	    }

	    var obj = path.get("object");

	    var prop = path.get("property");
	    var propNames = [getName(prop.node)];

	    while (obj.type === "MemberExpression") {
	      var node = obj.get("property").node;
	      if (node) {
	        propNames.push(getName(node));
	      }
	      obj = obj.get("object");
	    }
	    propNames.push(getName(obj.node));

	    return propNames;
	  }
	  var OP_AND = function OP_AND(input) {
	    return input === "&&";
	  };
	  var OP_OR = function OP_OR(input) {
	    return input === "||";
	  };

	  return {
	    name: "minify-simplify",
	    visitor: {
	      Statement: {
	        exit: function exit(path) {
	          if (path.node[shouldRevisit]) {
	            delete path.node[shouldRevisit];
	            path.visit();
	          }
	        }
	      },

	      // CallExpression(path) {
	      // const { node } = path;

	      /* (function() {})() -> !function() {}()
	      There is a bug in babel in printing this. Disabling for now.
	      if (t.isFunctionExpression(node.callee) &&
	          (t.isExpressionStatement(parent) ||
	           (t.isSequenceExpression(parent) && parent.expressions[0] === node))
	      ) {
	        path.replaceWith(
	          t.callExpression(
	            t.unaryExpression("!", node.callee, true),
	            node.arguments
	          )
	        );
	        return;
	      }*/
	      // },

	      UnaryExpression: {
	        enter: [

	        // Demorgans.
	        function (path) {
	          var node = path.node;

	          if (node.operator !== "!" || flipExpressions.hasSeen(node)) {
	            return;
	          }

	          var expr = node.argument;

	          // We need to make sure that the return type will always be boolean.
	          if (!(t.isLogicalExpression(expr) || t.isConditionalExpression(expr) || t.isBinaryExpression(expr))) {
	            return;
	          }
	          if (t.isBinaryExpression(expr) && t.COMPARISON_BINARY_OPERATORS.indexOf(expr.operator) === -1) {
	            return;
	          }

	          if (flipExpressions.shouldFlip(expr, 1)) {
	            var newNode = flipExpressions.flip(expr);
	            path.replaceWith(newNode);
	          }
	        },

	        // !(a, b, c) -> a, b, !c
	        function (path) {
	          var node = path.node;

	          if (node.operator !== "!") {
	            return;
	          }

	          if (!t.isSequenceExpression(node.argument)) {
	            return;
	          }

	          var seq = node.argument.expressions;
	          var expr = seq[seq.length - 1];
	          seq[seq.length - 1] = t.unaryExpression("!", expr, true);
	          path.replaceWith(node.argument);
	        },

	        // !(a ? b : c) -> a ? !b : !c
	        function (path) {
	          var node = path.node;

	          if (node.operator !== "!") {
	            return;
	          }

	          if (!t.isConditional(node.argument)) {
	            return;
	          }

	          var cond = node.argument;
	          cond.alternate = t.unaryExpression("!", cond.alternate, true);
	          cond.consequent = t.unaryExpression("!", cond.consequent, true);
	          path.replaceWith(node.argument);
	        }]
	      },

	      LogicalExpression: {
	        exit: function exit(path) {
	          // cache of path.evaluate()
	          var evaluateMemo = new Map();

	          var TRUTHY = function TRUTHY(input) {
	            // !NaN and !undefined are truthy
	            // separate check here as they are considered impure by babel
	            if (input.isUnaryExpression() && input.get("argument").isIdentifier()) {
	              if (input.node.argument.name === "NaN" || input.node.argument.name === "undefined") {
	                return true;
	              }
	            }
	            var evalResult = input.evaluate();
	            evaluateMemo.set(input, evalResult);
	            return evalResult.confident && input.isPure() && evalResult.value;
	          };

	          var FALSY = function FALSY(input) {
	            // NaN and undefined are falsy
	            // separate check here as they are considered impure by babel
	            if (input.isIdentifier()) {
	              if (input.node.name === "NaN" || input.node.name === "undefined") {
	                return true;
	              }
	            }
	            var evalResult = input.evaluate();
	            evaluateMemo.set(input, evalResult);
	            return evalResult.confident && input.isPure() && !evalResult.value;
	          };

	          var EX = types.Expression;

	          // Convention:
	          // [left, operator, right, handler(leftNode, rightNode)]

	          var matcher = new PatternMatch([[TRUTHY, OP_AND, EX, function (l, r) {
	            return r;
	          }], [FALSY, OP_AND, EX, function (l) {
	            return l;
	          }], [TRUTHY, OP_OR, EX, function (l) {
	            return l;
	          }], [FALSY, OP_OR, EX, function (l, r) {
	            return r;
	          }]]);

	          var left = path.get("left");
	          var right = path.get("right");
	          var operator = path.node.operator;

	          var result = matcher.match([left, operator, right], isPatternMatchesPath);

	          if (result.match) {
	            // here we are sure that left.evaluate is always confident becuase
	            // it satisfied one of TRUTHY/FALSY paths
	            var value = void 0;
	            if (evaluateMemo.has(left)) {
	              value = evaluateMemo.get(left).value;
	            } else {
	              value = left.evaluate().value;
	            }
	            path.replaceWith(result.value(t.valueToNode(value), right.node));
	          }
	        }
	      },

	      AssignmentExpression: function AssignmentExpression(path) {

	        var rightExpr = path.get("right");
	        var leftExpr = path.get("left");

	        if (path.node.operator !== "=") {
	          return;
	        }

	        var canBeUpdateExpression = rightExpr.get("right").isNumericLiteral() && rightExpr.get("right").node.value === 1 && updateOperators.has(rightExpr.node.operator);

	        if (leftExpr.isMemberExpression()) {

	          var leftPropNames = getPropNames(leftExpr);
	          var rightPropNames = getPropNames(rightExpr.get("left"));

	          if (!leftPropNames || leftPropNames.indexOf(undefined) > -1 || !rightPropNames || rightPropNames.indexOf(undefined) > -1 || !operators.has(rightExpr.node.operator) || !areArraysEqual(leftPropNames, rightPropNames)) {
	            return;
	          }
	        } else {
	          if (!rightExpr.isBinaryExpression() || !operators.has(rightExpr.node.operator) || leftExpr.node.name !== rightExpr.node.left.name) {
	            return;
	          }
	        }

	        var newExpression = void 0;

	        // special case x=x+1 --> ++x
	        if (canBeUpdateExpression) {
	          newExpression = t.updateExpression(rightExpr.node.operator + rightExpr.node.operator, t.clone(leftExpr.node), true /* prefix */);
	        } else {
	          newExpression = t.assignmentExpression(rightExpr.node.operator + "=", t.clone(leftExpr.node), t.clone(rightExpr.node.right));
	        }

	        path.replaceWith(newExpression);
	      },


	      ConditionalExpression: {
	        enter: [
	        // !foo ? 'foo' : 'bar' -> foo ? 'bar' : 'foo'
	        // foo !== 'lol' ? 'foo' : 'bar' -> foo === 'lol' ? 'bar' : 'foo'
	        function flipIfOrConditional(path) {
	          var node = path.node;

	          if (!path.get("test").isLogicalExpression()) {
	            flipNegation(node);
	            return;
	          }

	          if (flipExpressions.shouldFlip(node.test)) {
	            node.test = flipExpressions.flip(node.test);
	            var _ref2 = [node.consequent, node.alternate];
	            node.alternate = _ref2[0];
	            node.consequent = _ref2[1];
	          }
	        }, function simplifyPatterns(path) {
	          var test = path.get("test");
	          var consequent = path.get("consequent");
	          var alternate = path.get("alternate");

	          var EX = types.Expression,
	              LE = types.LogicalExpression;

	          // Convention:
	          // ===============
	          // for each pattern [test, consequent, alternate, handler(expr, cons, alt)]

	          var matcher = new PatternMatch([[LE, true, false, function (e) {
	            return e;
	          }], [EX, true, false, function (e) {
	            return notnot(e);
	          }], [EX, false, true, function (e) {
	            return not(e);
	          }], [LE, true, EX, function (e, c, a) {
	            return or(e, a);
	          }], [EX, true, EX, function (e, c, a) {
	            return or(notnot(e), a);
	          }], [EX, false, EX, function (e, c, a) {
	            return and(not(e), a);
	          }], [EX, EX, true, function (e, c) {
	            return or(not(e), c);
	          }], [LE, EX, false, function (e, c) {
	            return and(e, c);
	          }], [EX, EX, false, function (e, c) {
	            return and(notnot(e), c);
	          }]]);

	          var result = matcher.match([test, consequent, alternate], isPatternMatchesPath);

	          if (result.match) {
	            path.replaceWith(result.value(test.node, consequent.node, alternate.node));
	          }
	        }],

	        exit: [
	        // a ? x = foo : b ? x = bar : x = baz;
	        // x = a ? foo : b ? bar : baz;
	        function (topPath) {
	          if (!topPath.parentPath.isExpressionStatement() && !topPath.parentPath.isSequenceExpression()) {
	            return;
	          }

	          var mutations = [];
	          var firstLeft = null;
	          var operator = null;
	          function visit(path) {
	            if (path.isConditionalExpression()) {
	              var _bail = visit(path.get("consequent"));
	              if (_bail) {
	                return true;
	              }
	              _bail = visit(path.get("alternate"));
	              return _bail;
	            }

	            if (operator == null) {
	              operator = path.node.operator;
	            } else if (path.node.operator !== operator) {
	              return true;
	            }

	            if (!path.isAssignmentExpression() || !(path.get("left").isIdentifier() || path.get("left").isMemberExpression())) {
	              return true;
	            }

	            var left = path.get("left").node;
	            if (firstLeft == null) {
	              firstLeft = left;
	            } else if (!t.isNodesEquivalent(left, firstLeft)) {
	              return true;
	            }

	            mutations.push(function () {
	              return path.replaceWith(path.get("right").node);
	            });
	          }

	          var bail = visit(topPath);
	          if (bail) {
	            return;
	          }

	          mutations.forEach(function (f) {
	            return f();
	          });
	          topPath.replaceWith(t.assignmentExpression(operator, firstLeft, topPath.node));
	        },

	        // bar ? void 0 : void 0
	        // (bar, void 0)
	        // TODO: turn this into general equiv check
	        function (path) {
	          var node = path.node;

	          if (isVoid0(node.consequent) && isVoid0(node.alternate)) {
	            path.replaceWith(t.sequenceExpression([path.node.test, VOID_0]));
	          }
	        },

	        // bar ? void 0 : foo ? void 0 : <etc>
	        // bar || foo : void 0
	        // TODO: turn this into general equiv check
	        function (path) {
	          var node = path.node;

	          if (node[condExprSeen] || !isVoid0(node.consequent)) {
	            return;
	          }

	          node[condExprSeen] = true;

	          var tests = [node.test];
	          var mutations = [];
	          var alt = void 0;

	          var _loop = function _loop(next) {
	            next.node[condExprSeen] = true;
	            alt = next.node.alternate;

	            if (isVoid0(next.node.consequent)) {
	              tests.push(next.node.test);
	              mutations.push(function () {
	                return next.remove();
	              });
	            } else {
	              alt = next.node;
	              return "break";
	            }
	          };

	          for (var next = path.get("alternate"); next.isConditionalExpression(); next = next.get("alternate")) {
	            var _ret = _loop(next);

	            if (_ret === "break") break;
	          }

	          if (tests.length === 1) {
	            return;
	          }

	          var test = tests.reduce(function (expr, curTest) {
	            return t.logicalExpression("||", expr, curTest);
	          });

	          path.replaceWith(t.conditionalExpression(test, VOID_0, alt));
	        }]
	      },

	      // concat
	      VariableDeclaration: {
	        enter: [
	        // Put vars with no init at the top.
	        function (path) {
	          var node = path.node;

	          if (node.declarations.length < 2) {
	            return;
	          }

	          var inits = [];
	          var empty = [];
	          var _iteratorNormalCompletion = true;
	          var _didIteratorError = false;
	          var _iteratorError = undefined;

	          try {
	            for (var _iterator = node.declarations[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	              var decl = _step.value;

	              if (!decl.init) {
	                empty.push(decl);
	              } else {
	                inits.push(decl);
	              }
	            }

	            // This is based on exprimintation but there is a significant
	            // imrpovement when we place empty vars at the top in smaller
	            // files. Whereas it hurts in larger files.
	          } catch (err) {
	            _didIteratorError = true;
	            _iteratorError = err;
	          } finally {
	            try {
	              if (!_iteratorNormalCompletion && _iterator.return) {
	                _iterator.return();
	              }
	            } finally {
	              if (_didIteratorError) {
	                throw _iteratorError;
	              }
	            }
	          }

	          if (this.fitsInSlidingWindow) {
	            node.declarations = empty.concat(inits);
	          } else {
	            node.declarations = inits.concat(empty);
	          }
	        }]
	      },

	      Function: {
	        exit: function exit(path) {
	          earlyReturnTransform(path);

	          if (!path.node[shouldRevisit]) {
	            return;
	          }

	          delete path.node[shouldRevisit];
	          path.visit();
	        }
	      },

	      For: {
	        enter: earlyContinueTransform,
	        exit: earlyContinueTransform
	      },

	      ForStatement: {

	        // Merge previous expressions in the init part of the for.
	        enter: function enter(path) {
	          var node = path.node;

	          if (!path.inList || node.init && !t.isExpression(node.init)) {
	            return;
	          }

	          var prev = path.getSibling(path.key - 1);
	          var consumed = false;
	          if (prev.isVariableDeclaration()) {
	            var referencedOutsideLoop = false;

	            // we don't care if vars are referenced outside the loop as they are fn scope
	            if (prev.node.kind === "let" || prev.node.kind === "const") {
	              var ids = Object.keys(prev.getBindingIdentifiers());

	              idloop: for (var i = 0; i < ids.length; i++) {
	                var refs = prev.scope.bindings[ids[i]].referencePaths;
	                for (var j = 0; j < refs.length; j++) {
	                  if (!isAncestor(path, refs[j])) {
	                    referencedOutsideLoop = true;
	                    break idloop;
	                  }
	                }
	              }
	            }

	            if (!node.init && !referencedOutsideLoop) {
	              node.init = prev.node;
	              consumed = true;
	            }
	          } else if (prev.isExpressionStatement()) {
	            var expr = prev.node.expression;
	            if (node.init) {
	              if (t.isSequenceExpression(expr)) {
	                expr.expressions.push(node.init);
	                node.init = expr;
	              } else {
	                node.init = t.sequenceExpression([expr, node.init]);
	              }
	            } else {
	              node.init = expr;
	            }
	            consumed = true;
	          }
	          if (consumed) {
	            prev.remove();
	          }
	        },
	        exit: function exit(path) {
	          var node = path.node;

	          if (!node.test) {
	            return;
	          }

	          if (!path.get("body").isBlockStatement()) {
	            var bodyNode = path.get("body").node;
	            if (!t.isIfStatement(bodyNode)) {
	              return;
	            }

	            if (t.isBreakStatement(bodyNode.consequent, { label: null })) {
	              node.test = t.logicalExpression("&&", node.test, t.unaryExpression("!", bodyNode.test, true));
	              node.body = bodyNode.alternate || t.emptyStatement();
	              return;
	            }

	            if (t.isBreakStatement(bodyNode.alternate, { label: null })) {
	              node.test = t.logicalExpression("&&", node.test, bodyNode.test);
	              node.body = bodyNode.consequent || t.emptyStatement();
	              return;
	            }

	            return;
	          }

	          var statements = node.body.body;
	          var exprs = [];
	          var ifStatement = null;
	          var breakAt = null;
	          var i = 0;
	          for (var statement; statement = statements[i]; i++) {
	            if (t.isIfStatement(statement)) {
	              if (t.isBreakStatement(statement.consequent, { label: null })) {
	                ifStatement = statement;
	                breakAt = "consequent";
	              } else if (t.isBreakStatement(statement.alternate, { label: null })) {
	                ifStatement = statement;
	                breakAt = "alternate";
	              }
	              break;
	            }

	            // A statement appears before the break statement then bail.
	            if (!t.isExpressionStatement(statement)) {
	              return;
	            }

	            exprs.push(statement.expression);
	          }

	          if (!ifStatement) {
	            return;
	          }

	          var rest = [];

	          if (breakAt = "consequent") {
	            if (t.isBlockStatement(ifStatement.alternate)) {
	              rest.push.apply(rest, _toConsumableArray(ifStatement.alternate.body));
	            } else if (ifStatement.alternate) {
	              rest.push(ifStatement.alternate);
	            }
	          } else {
	            if (t.isBlockStatement(ifStatement.consequent)) {
	              rest.push.apply(rest, _toConsumableArray(ifStatement.consequent.body));
	            } else if (ifStatement.consequent) {
	              rest.push(ifStatement.consequent);
	            }
	          }

	          rest.push.apply(rest, _toConsumableArray(statements.slice(i + 1)));

	          var test = breakAt === "consequent" ? t.unaryExpression("!", ifStatement.test, true) : ifStatement.test;
	          var expr = void 0;
	          if (exprs.length === 1) {
	            expr = t.sequenceExpression([exprs[0], test]);
	          } else if (exprs.length) {
	            exprs.push(test);
	            expr = t.sequenceExpression(exprs);
	          } else {
	            expr = test;
	          }

	          node.test = t.logicalExpression("&&", node.test, expr);
	          if (rest.length === 1) {
	            node.body = rest[0];
	          } else if (rest.length) {
	            node.body = t.blockStatement(rest);
	          } else {
	            node.body = t.emptyStatement();
	          }
	        }
	      },

	      Program: function Program(path) {
	        // An approximation of the resultant gzipped code after minification
	        this.fitsInSlidingWindow = path.getSource().length / 10 < 33000;

	        var node = path.node;

	        var statements = toMultipleSequenceExpressions(node.body);
	        if (!statements.length) {
	          return;
	        }
	        node.body = statements;
	      },


	      BlockStatement: {
	        enter: function enter(path) {
	          var node = path.node,
	              parent = path.parent;

	          var top = [];
	          var bottom = [];

	          for (var i = 0; i < node.body.length; i++) {
	            var bodyNode = node.body[i];
	            if (t.isFunctionDeclaration(bodyNode)) {
	              top.push(bodyNode);
	            } else {
	              bottom.push(bodyNode);
	            }
	          }

	          var statements = top.concat(toMultipleSequenceExpressions(bottom));

	          if (!statements.length) {
	            return;
	          }

	          if (statements.length > 1 || needsBlock(node, parent) || node.directives) {
	            node.body = statements;
	            return;
	          }

	          if (statements.length) {
	            path.replaceWith(statements[0]);
	            return;
	          }
	        },
	        exit: function exit(path) {
	          var node = path.node,
	              parent = path.parent;

	          if (needsBlock(node, parent)) {
	            return;
	          }

	          if (node.body.length === 1) {
	            path.get("body")[0].inList = false;
	            path.replaceWith(node.body[0]);
	            return;
	          }

	          if (node.body.length === 0) {
	            path.replaceWith(t.emptyStatement());
	            return;
	          }

	          // Check if oppurtinties to merge statements are available.
	          var statements = node.body;
	          if (!statements.length) {
	            return;
	          }

	          var _iteratorNormalCompletion2 = true;
	          var _didIteratorError2 = false;
	          var _iteratorError2 = undefined;

	          try {
	            for (var _iterator2 = statements[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	              var statement = _step2.value;

	              if (!t.isExpressionStatement(statement)) {
	                return;
	              }
	            }
	          } catch (err) {
	            _didIteratorError2 = true;
	            _iteratorError2 = err;
	          } finally {
	            try {
	              if (!_iteratorNormalCompletion2 && _iterator2.return) {
	                _iterator2.return();
	              }
	            } finally {
	              if (_didIteratorError2) {
	                throw _iteratorError2;
	              }
	            }
	          }

	          path.visit();
	        }
	      },

	      ThrowStatement: createPrevExpressionEater("throw"),

	      // Try to merge previous statements into a sequence
	      ReturnStatement: {
	        enter: [createPrevExpressionEater("return"),

	        // Remove return if last statement with no argument.
	        // Replace return with `void` argument with argument.
	        function (path) {
	          var node = path.node;

	          if (!path.parentPath.parentPath.isFunction() || path.getSibling(path.key + 1).node) {
	            return;
	          }

	          if (!node.argument) {
	            path.remove();
	            return;
	          }

	          if (t.isUnaryExpression(node.argument, { operator: "void" })) {
	            path.replaceWith(node.argument.argument);
	          }
	        }]
	      },

	      // turn blocked ifs into single statements
	      IfStatement: {
	        exit: [
	        // Merge nested if statements if possible
	        function (_ref3) {
	          var node = _ref3.node;

	          if (!t.isIfStatement(node.consequent)) {
	            return;
	          }

	          if (node.alternate || node.consequent.alternate) {
	            return;
	          }

	          node.test = t.logicalExpression("&&", node.test, node.consequent.test);
	          node.consequent = node.consequent.consequent;
	        }, function (path) {
	          var node = path.node;

	          // No alternate, make into a guarded expression

	          if (node.consequent && !node.alternate && node.consequent.type === "ExpressionStatement") {
	            var op = "&&";
	            if (t.isUnaryExpression(node.test, { operator: "!" })) {
	              node.test = node.test.argument;
	              op = "||";
	            }

	            path.replaceWith(t.expressionStatement(t.logicalExpression(op, node.test, node.consequent.expression)));
	            return;
	          }

	          // Easy, both are expressions, turn into ternary
	          if (t.isExpressionStatement(node.consequent) && t.isExpressionStatement(node.alternate)) {
	            path.replaceWith(t.conditionalExpression(node.test, node.consequent.expression, node.alternate.expression));
	            return;
	          }

	          // Easy: consequent and alternate are return -- conditional.
	          if (t.isReturnStatement(node.consequent) && t.isReturnStatement(node.alternate)) {
	            if (!node.consequent.argument && !node.alternate.argument) {
	              path.replaceWith(t.expressionStatement(node.test));
	              return;
	            }

	            path.replaceWith(t.returnStatement(t.conditionalExpression(node.test, node.consequent.argument || VOID_0, node.alternate.argument || VOID_0)));
	            return;
	          }

	          // There is nothing after this block. And one or both
	          // of the consequent and alternate are either expression statment
	          // or return statements.
	          if (!path.getSibling(path.key + 1).node && path.parentPath && path.parentPath.parentPath && path.parentPath.parentPath.isFunction()) {
	            // Only the consequent is a return, void the alternate.
	            if (t.isReturnStatement(node.consequent) && t.isExpressionStatement(node.alternate)) {
	              if (!node.consequent.argument) {
	                path.replaceWith(t.expressionStatement(t.logicalExpression("||", node.test, node.alternate.expression)));
	                return;
	              }

	              path.replaceWith(t.returnStatement(t.conditionalExpression(node.test, node.consequent.argument || VOID_0, t.unaryExpression("void", node.alternate.expression, true))));
	              return;
	            }

	            // Only the alternate is a return, void the consequent.
	            if (t.isReturnStatement(node.alternate) && t.isExpressionStatement(node.consequent)) {
	              if (!node.alternate.argument) {
	                path.replaceWith(t.expressionStatement(t.logicalExpression("&&", node.test, node.consequent.expression)));
	                return;
	              }

	              path.replaceWith(t.returnStatement(t.conditionalExpression(node.test, t.unaryExpression("void", node.consequent.expression, true), node.alternate.argument || VOID_0)));
	              return;
	            }

	            if (t.isReturnStatement(node.consequent) && !node.alternate) {
	              if (!node.consequent.argument) {
	                path.replaceWith(t.expressionStatement(node.test));
	                return;
	              }

	              // This would only be worth it if the previous statement was an if
	              // because then we may merge to create a conditional.
	              if (path.getSibling(path.key - 1).isIfStatement()) {
	                path.replaceWith(t.returnStatement(t.conditionalExpression(node.test, node.consequent.argument || VOID_0, VOID_0)));
	                return;
	              }
	            }

	            if (t.isReturnStatement(node.alternate) && !node.consequent) {
	              if (!node.alternate.argument) {
	                path.replaceWith(t.expressionStatement(node.test));
	                return;
	              }

	              // Same as above.
	              if (path.getSibling(path.key - 1).isIfStatement()) {
	                path.replaceWith(t.returnStatement(t.conditionalExpression(node.test, node.alternate.argument || VOID_0, VOID_0)));
	                return;
	              }
	            }
	          }

	          var next = path.getSibling(path.key + 1);

	          // If the next satatement(s) is an if statement and we can simplify that
	          // to potentailly be an expression (or a return) then this will make it
	          // easier merge.
	          if (next.isIfStatement()) {
	            next.pushContext(path.context);
	            next.visit();
	            next.popContext();
	            next = path.getSibling(path.key + 1);
	          }

	          // Some other visitor might have deleted our node. OUR NODE ;_;
	          if (!path.node) {
	            return;
	          }

	          // No alternate but the next statement is a return
	          // also turn into a return conditional
	          if (t.isReturnStatement(node.consequent) && !node.alternate && next.isReturnStatement()) {
	            var nextArg = next.node.argument || VOID_0;
	            next.remove();
	            path.replaceWith(t.returnStatement(t.conditionalExpression(node.test, node.consequent.argument || VOID_0, nextArg)));
	            return;
	          }

	          // Next is the last expression, turn into a return while void'ing the exprs
	          if (path.parentPath && path.parentPath.parentPath && path.parentPath.parentPath.isFunction() && !path.getSibling(path.key + 2).node && t.isReturnStatement(node.consequent) && !node.alternate && next.isExpressionStatement()) {
	            var nextExpr = next.node.expression;
	            next.remove();
	            if (node.consequent.argument) {
	              path.replaceWith(t.returnStatement(t.conditionalExpression(node.test, node.consequent.argument, t.unaryExpression("void", nextExpr, true))));
	              return;
	            }

	            path.replaceWith(t.logicalExpression("||", node.test, nextExpr));
	            return;
	          }

	          if (node.consequent && node.alternate && (t.isReturnStatement(node.consequent) || t.isBlockStatement(node.consequent) && t.isReturnStatement(node.consequent.body[node.consequent.body.length - 1]))) {
	            path.insertAfter(t.isBlockStatement(node.alternate) ? node.alternate.body : node.alternate);
	            node.alternate = null;
	            return;
	          }
	        },

	        // If the consequent is if and the altenrate is not then
	        // switch them out. That way we know we don't have to print
	        // a block.x
	        function (path) {
	          var node = path.node;

	          if (!node.alternate) {
	            return;
	          }

	          if (!t.isIfStatement(node.consequent)) {
	            return;
	          }

	          if (t.isIfStatement(node.alternate)) {
	            return;
	          }

	          node.test = t.unaryExpression("!", node.test, true);
	          var _ref4 = [node.consequent, node.alternate];
	          node.alternate = _ref4[0];
	          node.consequent = _ref4[1];
	        },

	        // Make if statements with conditional returns in the body into
	        // an if statement that guards the rest of the block.
	        function (path) {
	          var node = path.node;

	          if (!path.inList || !path.get("consequent").isBlockStatement() || node.alternate) {
	            return;
	          }

	          var ret = void 0;
	          var test = void 0;
	          var exprs = [];
	          var statements = node.consequent.body;

	          for (var i = 0, statement; statement = statements[i]; i++) {
	            if (t.isExpressionStatement(statement)) {
	              exprs.push(statement.expression);
	            } else if (t.isIfStatement(statement)) {
	              if (i < statements.length - 1) {
	                // This isn't the last statement. Bail.
	                return;
	              }
	              if (statement.alternate) {
	                return;
	              }
	              if (!t.isReturnStatement(statement.consequent)) {
	                return;
	              }
	              ret = statement.consequent;
	              test = statement.test;
	            } else {
	              return;
	            }
	          }

	          if (!test || !ret) {
	            return;
	          }

	          exprs.push(test);

	          var expr = exprs.length === 1 ? exprs[0] : t.sequenceExpression(exprs);

	          var replacement = t.logicalExpression("&&", node.test, expr);

	          path.replaceWith(t.ifStatement(replacement, ret, null));
	        }, createPrevExpressionEater("if")]
	      },

	      WhileStatement: function WhileStatement(path) {
	        var node = path.node;

	        path.replaceWith(t.forStatement(null, node.test, null, node.body));
	      },


	      ForInStatement: createPrevExpressionEater("for-in"),

	      // Flatten sequence expressions.
	      SequenceExpression: {
	        exit: function exit(path) {
	          if (path.node[seqExprSeen]) {
	            return;
	          }

	          function flatten(node) {
	            node[seqExprSeen] = true;
	            var ret = [];
	            var _iteratorNormalCompletion3 = true;
	            var _didIteratorError3 = false;
	            var _iteratorError3 = undefined;

	            try {
	              for (var _iterator3 = node.expressions[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
	                var n = _step3.value;

	                if (t.isSequenceExpression(n)) {
	                  ret.push.apply(ret, _toConsumableArray(flatten(n)));
	                } else {
	                  ret.push(n);
	                }
	              }
	            } catch (err) {
	              _didIteratorError3 = true;
	              _iteratorError3 = err;
	            } finally {
	              try {
	                if (!_iteratorNormalCompletion3 && _iterator3.return) {
	                  _iterator3.return();
	                }
	              } finally {
	                if (_didIteratorError3) {
	                  throw _iteratorError3;
	                }
	              }
	            }

	            return ret;
	          }

	          path.node.expressions = flatten(path.node);
	        }
	      },

	      SwitchCase: function SwitchCase(path) {
	        var node = path.node;

	        if (!node.consequent.length) {
	          return;
	        }

	        node.consequent = toMultipleSequenceExpressions(node.consequent);
	      },


	      SwitchStatement: {
	        exit: [

	        // Convert switch statements with all returns in their cases
	        // to return conditional.
	        function (path) {
	          var node = path.node;

	          // Need to be careful of side-effects.

	          if (!t.isIdentifier(node.discriminant)) {
	            return;
	          }

	          if (!node.cases.length) {
	            return;
	          }

	          var consTestPairs = [];
	          var fallThru = [];
	          var defaultRet = void 0;
	          var _iteratorNormalCompletion4 = true;
	          var _didIteratorError4 = false;
	          var _iteratorError4 = undefined;

	          try {
	            for (var _iterator4 = node.cases[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
	              var switchCase = _step4.value;

	              if (switchCase.consequent.length > 1) {
	                return;
	              }

	              var cons = switchCase.consequent[0];

	              if (!switchCase.test) {
	                if (!t.isReturnStatement(cons)) {
	                  return;
	                }
	                defaultRet = cons;
	                continue;
	              }

	              if (!switchCase.consequent.length) {
	                if (fallThru.length) {
	                  fallThru.push(switchCase.test);
	                } else {
	                  fallThru = [switchCase.test];
	                }
	                continue;
	              }

	              // TODO: can we void it?
	              if (!t.isReturnStatement(cons)) {
	                return;
	              }

	              var test = t.binaryExpression("===", node.discriminant, switchCase.test);
	              if (fallThru.length) {
	                test = fallThru.reduceRight(function (right, test) {
	                  return t.logicalExpression("||", t.binaryExpression("===", node.discriminant, test), right);
	                }, test);
	                fallThru = [];
	              }

	              consTestPairs.push([test, cons.argument || VOID_0]);
	            }

	            // Bail if we have any remaining fallthrough
	          } catch (err) {
	            _didIteratorError4 = true;
	            _iteratorError4 = err;
	          } finally {
	            try {
	              if (!_iteratorNormalCompletion4 && _iterator4.return) {
	                _iterator4.return();
	              }
	            } finally {
	              if (_didIteratorError4) {
	                throw _iteratorError4;
	              }
	            }
	          }

	          if (fallThru.length) {
	            return;
	          }

	          // We need the default to be there to make sure there is an oppurtinity
	          // not to return.
	          if (!defaultRet) {
	            if (path.inList) {
	              var nextPath = path.getSibling(path.key + 1);
	              if (nextPath.isReturnStatement()) {
	                defaultRet = nextPath.node;
	                nextPath.remove();
	              } else if (!nextPath.node && path.parentPath.parentPath.isFunction()) {
	                // If this is the last statement in a function we just fake a void return.
	                defaultRet = t.returnStatement(VOID_0);
	              } else {
	                return;
	              }
	            } else {
	              return;
	            }
	          }

	          var cond = consTestPairs.reduceRight(function (alt, _ref5) {
	            var _ref6 = _slicedToArray(_ref5, 2),
	                test = _ref6[0],
	                cons = _ref6[1];

	            return t.conditionalExpression(test, cons, alt);
	          }, defaultRet.argument || VOID_0);

	          path.replaceWith(t.returnStatement(cond));

	          // Maybe now we can merge with some previous switch statement.
	          if (path.inList) {
	            var prev = path.getSibling(path.key - 1);
	            if (prev.isSwitchStatement()) {
	              prev.visit();
	            }
	          }
	        },

	        // Convert switches into conditionals.
	        function (path) {
	          var node = path.node;

	          // Need to be careful of side-effects.

	          if (!t.isIdentifier(node.discriminant)) {
	            return;
	          }

	          if (!node.cases.length) {
	            return;
	          }

	          var exprTestPairs = [];
	          var fallThru = [];
	          var defaultExpr = void 0;
	          var _iteratorNormalCompletion5 = true;
	          var _didIteratorError5 = false;
	          var _iteratorError5 = undefined;

	          try {
	            for (var _iterator5 = node.cases[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
	              var switchCase = _step5.value;

	              if (!switchCase.test) {
	                if (switchCase.consequent.length !== 1) {
	                  return;
	                }
	                if (!t.isExpressionStatement(switchCase.consequent[0])) {
	                  return;
	                }
	                defaultExpr = switchCase.consequent[0].expression;
	                continue;
	              }

	              if (!switchCase.consequent.length) {
	                if (fallThru.length) {
	                  fallThru.push(switchCase.test);
	                } else {
	                  fallThru = [switchCase.test];
	                }
	                continue;
	              }

	              var _switchCase$consequen = _slicedToArray(switchCase.consequent, 2),
	                  cons = _switchCase$consequen[0],
	                  breakStatement = _switchCase$consequen[1];

	              if (switchCase === node.cases[node.cases.length - 1]) {
	                if (breakStatement && !t.isBreakStatement(breakStatement)) {
	                  return;
	                }
	              } else if (!t.isBreakStatement(breakStatement)) {
	                return;
	              }

	              if (!t.isExpressionStatement(cons) || switchCase.consequent.length > 2) {
	                return;
	              }

	              var test = t.binaryExpression("===", node.discriminant, switchCase.test);
	              if (fallThru.length) {
	                test = fallThru.reduceRight(function (right, test) {
	                  return t.logicalExpression("||", t.binaryExpression("===", node.discriminant, test), right);
	                }, test);
	                fallThru = [];
	              }

	              exprTestPairs.push([test, cons.expression]);
	            }
	          } catch (err) {
	            _didIteratorError5 = true;
	            _iteratorError5 = err;
	          } finally {
	            try {
	              if (!_iteratorNormalCompletion5 && _iterator5.return) {
	                _iterator5.return();
	              }
	            } finally {
	              if (_didIteratorError5) {
	                throw _iteratorError5;
	              }
	            }
	          }

	          if (fallThru.length) {
	            return;
	          }

	          var cond = exprTestPairs.reduceRight(function (alt, _ref7) {
	            var _ref8 = _slicedToArray(_ref7, 2),
	                test = _ref8[0],
	                cons = _ref8[1];

	            return t.conditionalExpression(test, cons, alt);
	          }, defaultExpr || VOID_0);

	          path.replaceWith(cond);
	        }, function (path) {
	          var node = path.node;

	          if (!node.cases.length) {
	            return;
	          }

	          var lastCase = path.get("cases")[node.cases.length - 1];
	          if (!lastCase.node.consequent.length) {
	            return;
	          }

	          var potentialBreak = lastCase.get("consequent")[lastCase.node.consequent.length - 1];
	          if (t.isBreakStatement(potentialBreak) && potentialBreak.node.label === null) {
	            potentialBreak.remove();
	          }
	        }, createPrevExpressionEater("switch")]
	      }
	    }
	  };

	  function flipNegation(node) {
	    if (!node.consequent || !node.alternate) {
	      return;
	    }

	    var test = node.test;
	    var flip = false;

	    if (t.isBinaryExpression(test)) {
	      if (test.operator === "!==") {
	        test.operator = "===";
	        flip = true;
	      }

	      if (test.operator === "!=") {
	        test.operator = "==";
	        flip = true;
	      }
	    }

	    if (t.isUnaryExpression(test, { operator: "!" })) {
	      node.test = test.argument;
	      flip = true;
	    }

	    if (flip) {
	      var consequent = node.consequent;
	      node.consequent = node.alternate;
	      node.alternate = consequent;
	    }
	  }

	  function needsBlock(node, parent) {
	    return t.isFunction(parent) && node === parent.body || t.isTryStatement(parent) || t.isCatchClause(parent) || t.isSwitchStatement(parent) || isSingleBlockScopeDeclaration(node) && t.isIfStatement(parent);
	  }

	  function isSingleBlockScopeDeclaration(block) {
	    return t.isBlockStatement(block) && block.body.length === 1 && (t.isVariableDeclaration(block.body[0], { kind: "let" }) || t.isVariableDeclaration(block.body[0], { kind: "const" }) || t.isFunctionDeclaration(block.body[0]));
	  }

	  function isVoid0(expr) {
	    return expr === VOID_0 || t.isUnaryExpression(expr, { operator: "void" }) && t.isNumericLiteral(expr.argument, { value: 0 });
	  }

	  function earlyReturnTransform(path) {
	    var node = path.node;

	    if (!t.isBlockStatement(node.body)) {
	      return;
	    }

	    for (var i = node.body.body.length; i >= 0; i--) {
	      var statement = node.body.body[i];
	      if (t.isIfStatement(statement) && !statement.alternate && t.isReturnStatement(statement.consequent) && !statement.consequent.argument) {
	        genericEarlyExitTransform(path.get("body").get("body")[i]);
	      }
	    }
	  }

	  function earlyContinueTransform(path) {
	    var node = path.node;

	    if (!t.isBlockStatement(node.body)) {
	      return;
	    }

	    for (var i = node.body.body.length; i >= 0; i--) {
	      var statement = node.body.body[i];
	      if (t.isIfStatement(statement) && !statement.alternate && t.isContinueStatement(statement.consequent) && !statement.consequent.label) {
	        genericEarlyExitTransform(path.get("body").get("body")[i]);
	      }
	    }

	    // We may have reduced the body to a single statement.
	    if (node.body.body.length === 1) {
	      path.get("body").replaceWith(node.body.body[0]);
	    }
	  }

	  function genericEarlyExitTransform(path) {
	    var node = path.node;

	    var statements = path.container.slice(path.key + 1).filter(function (stmt) {
	      return !t.isFunctionDeclaration(stmt);
	    });

	    if (!statements.length) {
	      path.replaceWith(t.expressionStatement(node.test));
	      return;
	    }

	    var test = node.test;
	    if (t.isBinaryExpression(test) && test.operator === "!==") {
	      test.operator = "===";
	    } else if (t.isBinaryExpression(test) && test.operator === "!=") {
	      test.operator = "==";
	    } else if (t.isUnaryExpression(test, { operator: "!" })) {
	      node.test = test.argument;
	    } else {
	      node.test = t.unaryExpression("!", node.test, true);
	    }

	    var l = statements.length;
	    while (l-- > 0) {
	      if (!t.isFunctionDeclaration(statements[l])) {
	        path.getSibling(path.key + 1).remove();
	      }
	    }

	    node.consequent = t.blockStatement(statements);

	    // this should take care of removing the block
	    path.visit();
	  }

	  function createPrevExpressionEater(keyword) {
	    var key = void 0;
	    switch (keyword) {
	      case "switch":
	        key = "discriminant";break;
	      case "throw":
	      case "return":
	        key = "argument";break;
	      case "if":
	        key = "test";break;
	      case "for-in":
	        key = "right";break;
	    }

	    return function (path) {
	      if (!path.inList) {
	        return;
	      }

	      var node = path.node;

	      var prev = path.getSibling(path.key - 1);
	      if (!prev.isExpressionStatement()) {
	        return;
	      }

	      var seq = prev.node.expression;
	      if (node[key]) {
	        if (t.isSequenceExpression(seq)) {
	          seq.expressions.push(node[key]);
	        } else {
	          seq = t.sequenceExpression([seq, node[key]]);
	        }
	      } else {
	        if (t.isSequenceExpression(seq)) {
	          var lastExpr = seq.expressions[seq.expressions.length - 1];
	          seq.expressions[seq.expressions.length - 1] = t.unaryExpression("void", lastExpr, true);
	        } else {
	          seq = t.unaryExpression("void", seq, true);
	        }
	      }

	      if (seq) {
	        node[key] = seq;
	        prev.remove();

	        // Since we were able to merge some stuff it's possible that this has opened
	        // oppurtinties for other transforms to happen.
	        // TODO: Look into changing the traversal order from bottom to up to avoid
	        // having to revisit things.
	        if (path.parentPath.parent) {
	          path.parentPath.parent[shouldRevisit] = true;
	        }
	      }
	    };
	  }

	  function isPatternMatchesPath(patternValue, inputPath) {
	    if (Array.isArray(patternValue)) {
	      for (var i = 0; i < patternValue.length; i++) {
	        if (isPatternMatchesPath(patternValue[i], inputPath)) {
	          return true;
	        }
	      }
	      return false;
	    }
	    if (typeof patternValue === "function") {
	      return patternValue(inputPath);
	    }
	    if (isNodeOfType(inputPath.node, patternValue)) return true;
	    var evalResult = inputPath.evaluate();
	    if (!evalResult.confident || !inputPath.isPure()) return false;
	    return evalResult.value === patternValue;
	  }

	  // path1 -> path2
	  // is path1 an ancestor of path2
	  function isAncestor(path1, path2) {
	    return !!path2.findParent(function (parent) {
	      return parent === path1;
	    });
	  }
	};

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	function replaceArray(t, path) {
	  var node = path.node;
	  // arguments is taken :(

	  var constructorArgs = path.get("arguments");
	  if (t.isIdentifier(node.callee, { name: "Array" }) && !path.scope.getBinding("Array")) {

	    if (constructorArgs.length === 0) {
	      // Array() -> []
	      path.replaceWith(t.arrayExpression([]));
	    } else if (constructorArgs.length === 1) {
	      var arg = constructorArgs[0];
	      var result = arg.evaluate();

	      if (result.confident) {
	        if (typeof result.value === "number") {
	          if (result.value >= 0 && result.value <= 6 && result.value % 1 === 0) {
	            // "Array(7)" is shorter than "[,,,,,,,]"
	            path.replaceWith(t.arrayExpression(Array(result.value).fill(null)));
	          } else {
	            dropNewIfPresent();
	          }
	        } else {
	          // Array("Asdf"), Array(true), Array(false)
	          path.replaceWith(t.arrayExpression([t.valueToNode(result.value)]));
	        }
	      } else {
	        var transformables = ["ArrayExpression", "ObjectExpression", "FunctionExpression", "ArrowFunctionExpression", "ClassExpression"];
	        if (transformables.indexOf(arg.node.type) !== -1) {
	          // Array([]), Array({})
	          // Array(()=>{}), Array(class{}), Array(function(){})
	          path.replaceWith(t.arrayExpression([arg.node]));
	        } else {
	          // Array(x); Array(a.b);
	          dropNewIfPresent();
	        }
	      }
	    } else {
	      // Array(2,3), Array(a,b) => [2,3], [a,b]
	      path.replaceWith(t.arrayExpression(node.arguments));
	    }
	    return true;
	  }

	  function dropNewIfPresent() {
	    if (path.isNewExpression()) {
	      path.replaceWith(t.callExpression(node.callee, node.arguments));
	    }
	  }
	}

	function replaceObject(t, path) {
	  var node = path.node;

	  if (t.isIdentifier(node.callee, { name: "Object" }) && !path.scope.getBinding("Object")) {

	    var isVoid0 = __webpack_require__(3)(t);
	    var arg = node.arguments[0];
	    var binding = arg && t.isIdentifier(arg) && path.scope.getBinding(arg.name);

	    // Object() -> {}
	    if (node.arguments.length === 0) {
	      path.replaceWith(t.objectExpression([]));

	      // Object([]) -> []
	    } else if (arg.type === "ArrayExpression" || t.isFunctionExpression(arg)) {
	      path.replaceWith(arg);

	      // Object(null) -> {}
	    } else if (isVoid0(arg) || arg.name === "undefined" || arg.type === "NullLiteral" || arg.type === "ObjectExpression" && arg.properties.length === 0) {
	      path.replaceWith(t.objectExpression([]));

	      // Object(localFn) -> localFn
	    } else if (binding && binding.path.isFunction()) {
	      path.replaceWith(arg);

	      // Object({a:b}) -> {a:b}
	    } else if (arg.type === "ObjectExpression") {
	      path.replaceWith(arg);

	      // new Object(a) -> Object(a)
	    } else if (node.type === "NewExpression") {
	      path.replaceWith(t.callExpression(node.callee, node.arguments));
	    }
	    return true;
	  }
	}

	function defaults() {
	  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
	      _ref$boolean = _ref.boolean,
	      boolean = _ref$boolean === undefined ? true : _ref$boolean,
	      _ref$number = _ref.number,
	      number = _ref$number === undefined ? true : _ref$number,
	      _ref$string = _ref.string,
	      string = _ref$string === undefined ? true : _ref$string,
	      _ref$array = _ref.array,
	      array = _ref$array === undefined ? true : _ref$array,
	      _ref$object = _ref.object,
	      object = _ref$object === undefined ? true : _ref$object;

	  return {
	    boolean: boolean, number: number, string: string, array: array, object: object
	  };
	}

	module.exports = function (_ref2) {
	  var t = _ref2.types;

	  return {
	    name: "minify-type-constructors",
	    visitor: {
	      CallExpression: function CallExpression(path) {
	        var node = path.node;

	        var opts = defaults(this.opts);

	        // Boolean(foo) -> !!foo
	        if (opts.boolean && t.isIdentifier(node.callee, { name: "Boolean" }) && node.arguments.length === 1 && !path.scope.getBinding("Boolean")) {
	          path.replaceWith(t.unaryExpression("!", t.unaryExpression("!", node.arguments[0], true), true));
	          return;
	        }

	        // Number(foo) -> +foo
	        if (opts.number && t.isIdentifier(node.callee, { name: "Number" }) && node.arguments.length === 1 && !path.scope.getBinding("Number")) {
	          path.replaceWith(t.unaryExpression("+", node.arguments[0], true));
	          return;
	        }

	        // String(foo) -> foo + ''
	        if (opts.string && t.isIdentifier(node.callee, { name: "String" }) && node.arguments.length === 1 && !path.scope.getBinding("String")) {
	          path.replaceWith(t.binaryExpression("+", node.arguments[0], t.stringLiteral("")));
	          return;
	        }

	        // Array() -> []
	        if (opts.array && replaceArray(t, path)) {
	          return;
	        }

	        // Object() -> {}
	        if (opts.object && replaceObject(t, path)) {
	          return;
	        }
	      },
	      NewExpression: function NewExpression(path) {
	        var opts = defaults(this.opts);

	        // new Array() -> []
	        if (opts.array && replaceArray(t, path)) {
	          return;
	        }

	        // new Object() -> {}
	        if (opts.object && replaceObject(t, path)) {
	          return;
	        }
	      }
	    }
	  };
	};

/***/ },
/* 12 */
/***/ function(module, exports) {

	"use strict";

	module.exports = function (_ref) {
	  var t = _ref.types;

	  return {
	    name: "transform-member-expression-literals",
	    visitor: {
	      // foo['bar'] -> foo.bar
	      MemberExpression: {
	        exit: function exit(_ref2) {
	          var node = _ref2.node;

	          var prop = node.property;
	          if (!node.computed || !t.isStringLiteral(prop)) {
	            return;
	          }

	          if (prop.value.match(/^\d+$/)) {
	            node.property = t.numericLiteral(parseInt(prop.value, 10));
	            node.computed = false;
	          } else if (t.isValidIdentifier(prop.value)) {
	            node.property = t.identifier(prop.value);
	            node.computed = false;
	          }
	        }
	      }
	    }
	  };
	};

/***/ },
/* 13 */
/***/ function(module, exports) {

	"use strict";

	module.exports = function (_ref) {
	  var t = _ref.types;

	  function liftDeclaration(path, body, kind) {
	    if (body[0] && body[0].isVariableDeclaration({ kind: kind })) {

	      if (body[0].node.declarations.length > 1) {
	        return;
	      }

	      if (body[1] && body[1].isVariableDeclaration({ kind: kind })) {
	        return;
	      }

	      var firstNode = body[0].node.declarations[0];

	      if (!t.isIdentifier(firstNode.id) || !firstNode.init) {
	        return;
	      }

	      var init = path.get("init");
	      if (!init.isVariableDeclaration({ kind: kind })) {
	        return;
	      }

	      init.node.declarations = init.node.declarations.concat(firstNode.id);

	      body[0].replaceWith(t.assignmentExpression("=", t.clone(firstNode.id), t.clone(firstNode.init)));
	    }
	  }

	  return {
	    name: "transform-merge-sibling-variables",
	    visitor: {
	      ForStatement: function ForStatement(path) {

	        // Lift declarations to the loop initializer
	        var body = path.get("body");
	        body = body.isBlockStatement() ? body.get("body") : [body];

	        liftDeclaration(path, body, "var");
	        liftDeclaration(path, body, "let");
	      },

	      VariableDeclaration: {
	        enter: [
	        // concat variables of the same kind with their siblings
	        function (path) {
	          if (!path.inList) {
	            return;
	          }

	          var node = path.node;

	          while (true) {
	            var sibling = path.getSibling(path.key + 1);
	            if (!sibling.isVariableDeclaration({ kind: node.kind })) {
	              break;
	            }

	            node.declarations = node.declarations.concat(sibling.node.declarations);
	            sibling.remove();
	          }
	        },

	        // concat `var` declarations next to for loops with it's initialisers.
	        // block-scoped `let` and `const` are not moved because the for loop
	        // is a different block scope.
	        function (path) {
	          if (!path.inList) {
	            return;
	          }

	          var node = path.node;

	          if (node.kind !== "var") {
	            return;
	          }

	          var next = path.getSibling(path.key + 1);
	          if (!next.isForStatement()) {
	            return;
	          }

	          var init = next.get("init");
	          if (!init.isVariableDeclaration({ kind: node.kind })) {
	            return;
	          }

	          init.node.declarations = node.declarations.concat(init.node.declarations);
	          path.remove();
	        }]
	      }
	    }
	  };
	};

/***/ },
/* 14 */
/***/ function(module, exports) {

	/*istanbul ignore next*/"use strict";

	exports.__esModule = true;

	exports.default = function ( /*istanbul ignore next*/_ref) {
	  /*istanbul ignore next*/var t = _ref.types;

	  return {
	    visitor: { /*istanbul ignore next*/
	      Literal: function Literal(path) {
	        if (typeof path.node.value === "boolean") {
	          path.replaceWith(t.unaryExpression("!", t.numericLiteral(+!path.node.value), true));
	        }
	      }
	    }
	  };
	};

	/*istanbul ignore next*/module.exports = exports["default"];

/***/ },
/* 15 */
/***/ function(module, exports) {

	"use strict";

	module.exports = function (_ref) {
	  var t = _ref.types;

	  return {
	    name: "transform-property-literals",
	    visitor: {
	      // { 'foo': 'bar' } -> { foo: 'bar' }
	      ObjectProperty: {
	        exit: function exit(_ref2) {
	          var node = _ref2.node;

	          var key = node.key;
	          if (!t.isStringLiteral(key)) {
	            return;
	          }

	          if (key.value.match(/^\d+$/)) {
	            node.key = t.numericLiteral(parseInt(node.key.value, 10));
	            node.computed = false;
	          } else if (t.isValidIdentifier(key.value)) {
	            node.key = t.identifier(key.value);
	            node.computed = false;
	          }
	        }
	      }
	    }
	  };
	};

/***/ },
/* 16 */
/***/ function(module, exports) {

	/*istanbul ignore next*/"use strict";

	exports.__esModule = true;

	exports.default = function () {
	  return {
	    visitor: { /*istanbul ignore next*/
	      CallExpression: function CallExpression(path) {
	        if (path.get("callee").matchesPattern("console", true)) {
	          path.remove();
	        }
	      }
	    }
	  };
	};

	/*istanbul ignore next*/module.exports = exports["default"];

/***/ },
/* 17 */
/***/ function(module, exports) {

	/*istanbul ignore next*/"use strict";

	exports.__esModule = true;

	exports.default = function () {
	  return {
	    visitor: { /*istanbul ignore next*/
	      DebuggerStatement: function DebuggerStatement(path) {
	        path.remove();
	      }
	    }
	  };
	};

	/*istanbul ignore next*/module.exports = exports["default"];

/***/ },
/* 18 */
/***/ function(module, exports) {

	"use strict";

	module.exports = function () {
	  return {
	    name: "transform-simplify-comparison-operators",
	    visitor: {
	      // simplify comparison operations if we're 100% certain
	      // that each value will always be of the same type
	      BinaryExpression: function BinaryExpression(path) {
	        var node = path.node;

	        var op = node.operator;
	        if (op !== "===" && op !== "!==") {
	          return;
	        }

	        var left = path.get("left");
	        var right = path.get("right");
	        var strictMatch = left.baseTypeStrictlyMatches(right);
	        if (strictMatch) {
	          node.operator = node.operator.slice(0, -1);
	        }
	      }
	    }
	  };
	};

/***/ },
/* 19 */
/***/ function(module, exports) {

	/*istanbul ignore next*/"use strict";

	exports.__esModule = true;

	exports.default = function ( /*istanbul ignore next*/_ref) {
	  /*istanbul ignore next*/var t = _ref.types;

	  return {
	    visitor: { /*istanbul ignore next*/
	      ReferencedIdentifier: function ReferencedIdentifier(path) {
	        if (path.node.name === "undefined") {
	          path.replaceWith(t.unaryExpression("void", t.numericLiteral(0), true));
	        }
	      }
	    }
	  };
	};

	/*istanbul ignore next*/module.exports = exports["default"];

/***/ },
/* 20 */
/***/ function(module, exports) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	/**
	 * lodash (Custom Build) <https://lodash.com/>
	 * Build: `lodash modularize exports="npm" -o ./`
	 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
	 * Released under MIT license <https://lodash.com/license>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 */

	/** `Object#toString` result references. */
	var objectTag = '[object Object]';

	/**
	 * Checks if `value` is a host object in IE < 9.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a host object, else `false`.
	 */
	function isHostObject(value) {
	  // Many host objects are `Object` objects that can coerce to strings
	  // despite having improperly defined `toString` methods.
	  var result = false;
	  if (value != null && typeof value.toString != 'function') {
	    try {
	      result = !!(value + '');
	    } catch (e) {}
	  }
	  return result;
	}

	/**
	 * Creates a unary function that invokes `func` with its argument transformed.
	 *
	 * @private
	 * @param {Function} func The function to wrap.
	 * @param {Function} transform The argument transform.
	 * @returns {Function} Returns the new function.
	 */
	function overArg(func, transform) {
	  return function (arg) {
	    return func(transform(arg));
	  };
	}

	/** Used for built-in method references. */
	var funcProto = Function.prototype,
	    objectProto = Object.prototype;

	/** Used to resolve the decompiled source of functions. */
	var funcToString = funcProto.toString;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/** Used to infer the `Object` constructor. */
	var objectCtorString = funcToString.call(Object);

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;

	/** Built-in value references. */
	var getPrototype = overArg(Object.getPrototypeOf, Object);

	/**
	 * Checks if `value` is object-like. A value is object-like if it's not `null`
	 * and has a `typeof` result of "object".
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 * @example
	 *
	 * _.isObjectLike({});
	 * // => true
	 *
	 * _.isObjectLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isObjectLike(_.noop);
	 * // => false
	 *
	 * _.isObjectLike(null);
	 * // => false
	 */
	function isObjectLike(value) {
	  return !!value && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) == 'object';
	}

	/**
	 * Checks if `value` is a plain object, that is, an object created by the
	 * `Object` constructor or one with a `[[Prototype]]` of `null`.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.8.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 * }
	 *
	 * _.isPlainObject(new Foo);
	 * // => false
	 *
	 * _.isPlainObject([1, 2, 3]);
	 * // => false
	 *
	 * _.isPlainObject({ 'x': 0, 'y': 0 });
	 * // => true
	 *
	 * _.isPlainObject(Object.create(null));
	 * // => true
	 */
	function isPlainObject(value) {
	  if (!isObjectLike(value) || objectToString.call(value) != objectTag || isHostObject(value)) {
	    return false;
	  }
	  var proto = getPrototype(value);
	  if (proto === null) {
	    return true;
	  }
	  var Ctor = hasOwnProperty.call(proto, 'constructor') && proto.constructor;
	  return typeof Ctor == 'function' && Ctor instanceof Ctor && funcToString.call(Ctor) == objectCtorString;
	}

	module.exports = isPlainObject;

/***/ },
/* 21 */
/***/ function(module, exports) {

	"use strict";

	module.exports = function evaluate(path) {
	  try {
	    return path.evaluate();
	  } catch (e) {
	    return {
	      confident: false,
	      error: e
	    };
	  }
	};

/***/ },
/* 22 */
/***/ function(module, exports) {

	"use strict";

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	module.exports = function (t) {
	  return function toMultipleSequenceExpressions(statements) {
	    var retStatements = [];
	    var bailed = void 0;
	    do {
	      var res = convert(statements);
	      bailed = res.bailed;
	      var seq = res.seq,
	          bailedAtIndex = res.bailedAtIndex;

	      if (seq) {
	        retStatements.push(t.expressionStatement(seq));
	      }
	      if (bailed && statements[bailedAtIndex]) {
	        retStatements.push(statements[bailedAtIndex]);
	      }
	      if (bailed) {
	        statements = statements.slice(bailedAtIndex + 1);
	        if (!statements.length) {
	          bailed = false;
	        }
	      }
	    } while (bailed);

	    return retStatements;

	    function convert(nodes) {
	      var exprs = [];

	      var _loop = function _loop(i) {
	        var bail = function bail() {
	          var seq = void 0;
	          if (exprs.length === 1) {
	            seq = exprs[0];
	          } else if (exprs.length) {
	            seq = t.sequenceExpression(exprs);
	          }

	          return {
	            seq: seq,
	            bailed: true,
	            bailedAtIndex: i
	          };
	        };

	        var node = nodes[i];
	        if (t.isExpression(node)) {
	          exprs.push(node);
	        } else if (t.isExpressionStatement(node)) {
	          exprs.push(node.expression);
	        } else if (t.isIfStatement(node)) {
	          var consequent = void 0;
	          if (node.consequent) {
	            var _res = convert([node.consequent]);
	            if (_res.bailed) {
	              return {
	                v: bail()
	              };
	            }
	            consequent = _res.seq;
	          }
	          var alternate = void 0;
	          if (node.alternate) {
	            var _res2 = convert([node.alternate]);
	            if (_res2.bailed) {
	              return {
	                v: bail()
	              };
	            }
	            alternate = _res2.seq;
	          }

	          if (!alternate && !consequent) {
	            exprs.push(node.test);
	          } else if (!alternate) {
	            exprs.push(t.logicalExpression("&&", node.test, consequent));
	          } else if (!consequent) {
	            exprs.push(t.logicalExpression("||", node.test, alternate));
	          } else {
	            exprs.push(t.conditionalExpression(node.test, consequent, alternate));
	          }
	        } else if (t.isBlockStatement(node)) {
	          var _res3 = convert(node.body);
	          if (_res3.bailed) {
	            return {
	              v: bail()
	            };
	          }
	          if (_res3.seq) {
	            exprs.push(_res3.seq);
	          }
	        } else {
	          return {
	            v: bail()
	          };
	        }
	      };

	      for (var i = 0; i < nodes.length; i++) {
	        var _ret = _loop(i);

	        if ((typeof _ret === "undefined" ? "undefined" : _typeof(_ret)) === "object") return _ret.v;
	      }

	      var seq = void 0;
	      if (exprs.length === 1) {
	        seq = exprs[0];
	      } else if (exprs.length) {
	        seq = t.sequenceExpression(exprs);
	      }

	      /* eslint-disable no-self-assign */
	      seq = seq;
	      return { seq: seq };
	    }
	  };
	};

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	module.exports = function (_ref) {
	  var t = _ref.types;

	  var removeOrVoid = __webpack_require__(4)(t);

	  var visitor = {
	    // Remove the call if it stands on it's own.
	    ExpressionStatement: function ExpressionStatement(path) {
	      var node = path.node;

	      if (isEmptyFunction(node.expression)) {
	        removeOrVoid(path);
	      }
	    },

	    // If we're not in an expression statement we can't remove
	    // the call.
	    CallExpression: function CallExpression(path) {
	      var node = path.node;

	      if (isEmptyFunction(node)) {
	        path.replaceWith(t.booleanLiteral(false));
	      }
	    }
	  };

	  return {
	    name: "minify-empty-function",
	    visitor: {
	      // Unfortunately we have to do it in a seperate pass to ensure that
	      // the expression statements are removed otherwise the calls may
	      // end in conditionals or sequence expressions.
	      Program: function Program(path) {
	        path.traverse(visitor, {});
	      }
	    }
	  };

	  function isEmptyFunction(node) {
	    return t.isCallExpression(node) && t.isIdentifier(node.callee, { name: "emptyFunction" });
	  }
	};

/***/ },
/* 24 */
/***/ function(module, exports) {

	"use strict";

	module.exports = function (_ref) {
	  var t = _ref.types;

	  var INFINITY = t.binaryExpression("/", t.numericLiteral(1), t.numericLiteral(0));
	  return {
	    name: "minify-infinity",
	    visitor: {
	      // Infinity -> 1 / 0
	      Identifier: function Identifier(path) {
	        if (path.node.name !== "Infinity") {
	          return;
	        }

	        // It's a referenced identifier
	        if (path.scope.getBinding("Infinity")) {
	          return;
	        }

	        if (path.parentPath.isObjectProperty({ key: path.node })) {
	          return;
	        }

	        if (path.parentPath.isMemberExpression()) {
	          return;
	        }

	        path.replaceWith(INFINITY);
	      }
	    }
	  };
	};

/***/ },
/* 25 */
/***/ function(module, exports) {

	"use strict";

	module.exports = function (_ref) {
	  var t = _ref.types;

	  return {
	    name: "minify-numeric-literals",
	    visitor: {
	      NumericLiteral: function NumericLiteral(path) {
	        if (!path.node.extra) return;

	        var exponential = path.node.value.toExponential().replace(/\+/g, "").replace(/e0/, "");

	        if (path.node.extra.raw.length > exponential.length) {
	          var literal = t.numericLiteral(path.node.value);
	          literal.extra = {
	            raw: exponential,
	            rawValue: path.node.value
	          };
	          path.replaceWith(literal);
	        }
	      }
	    }
	  };
	};

/***/ },
/* 26 */
/***/ function(module, exports) {

	"use strict";

	module.exports = function (_ref) {
	  var t = _ref.types;

	  var NO_MEMBER = Symbol("no member");

	  var replaceVisitor = {
	    ReferencedIdentifier: function ReferencedIdentifier(path) {
	      var _path = path;
	      var node = _path.node;

	      var optionsMap = this.replacements[node.name];
	      if (!optionsMap) {
	        return;
	      }

	      var options = void 0;
	      if (path.parentPath.isMemberExpression({ object: node })) {
	        var property = path.parent.property;

	        var key = t.isIdentifier(property) && property.name;
	        if (typeof key === "string") {
	          options = optionsMap[key];
	          path = path.parentPath;
	        }
	      }

	      if (!options) {
	        options = optionsMap[NO_MEMBER];
	      }

	      if (!options) {
	        return;
	      }

	      path.replaceWith(options.node);
	    }
	  };

	  return {
	    name: "minify-replace",
	    visitor: {
	      Program: function Program(path) {
	        /**
	           Replacements is an array of objects like this:
	           {
	             identifierName: 'console',
	             member: 'log', // optional
	             replacement: {
	               type: 'identifier',
	               value: '',
	             },
	           }
	        **/

	        if (!this.opts.replacements) {
	          // No replacements. Bail.
	          return;
	        }

	        var map = Object.create(null);
	        this.opts.replacements.forEach(function (_ref2) {
	          var identifierName = _ref2.identifierName;
	          var replacement = _ref2.replacement;
	          var member = _ref2.member;

	          if (path.scope.globals[identifierName]) {
	            // Convert to a node, we only allow identifiers and literals as replacements
	            if (!replacement.type.match(/literal|identifier/i)) {
	              throw new Error("Only literals and identifier are supported as replacements");
	            }

	            var node = t[replacement.type](replacement.value);
	            var options = {
	              identifierName: identifierName,
	              node: node,
	              member: member
	            };

	            if (!map[identifierName]) {
	              map[identifierName] = {};
	            }

	            if (member && map[identifierName][member]) {
	              throw new Error("Replacement collision " + identifierName + "." + member);
	            }
	            map[identifierName][member || NO_MEMBER] = options;
	          }
	        });

	        path.traverse(replaceVisitor, { replacements: map });
	      }
	    }
	  };
	};

/***/ },
/* 27 */
/***/ function(module, exports) {

	"use strict";

	var _createClass = function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
	    }
	  }return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
	  };
	}();

	function _toArray(arr) {
	  return Array.isArray(arr) ? arr : Array.from(arr);
	}

	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	}

	var LEAF_NODE = Symbol("LEAF_NODE");

	module.exports = function () {
	  function PatternMatch(patterns) {
	    _classCallCheck(this, PatternMatch);

	    this.decisionTree = this.makeDecisionTree(patterns);
	  }

	  _createClass(PatternMatch, [{
	    key: "handle",
	    value: function handle(input, isMatch) {
	      var result = this.match(input, isMatch);

	      if (!result.match) {
	        throw new Error("No Match Found for " + input.toString());
	      }

	      if (typeof result.value !== "function") {
	        throw new Error("Expecting a function. Instead got - " + result.value.toString());
	      }

	      result.value.call(null, input, result.keys);
	    }
	  }, {
	    key: "match",
	    value: function match(input) {
	      var isMatch = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function (a, b) {
	        return a === b;
	      };

	      var current = this.decisionTree;
	      var result = {
	        match: false,
	        value: void 0,
	        keys: []
	      };

	      // to handle falsy keys
	      var NO_MATCH = Symbol("NO_MATCH");

	      for (var i = 0; i < input.length; i++) {
	        var matchedKey = NO_MATCH;

	        // because map doesn't support custom key equal function
	        var _iteratorNormalCompletion = true;
	        var _didIteratorError = false;
	        var _iteratorError = undefined;

	        try {
	          for (var _iterator = current.keys()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	            var key = _step.value;

	            if (isMatch(key, input[i])) {
	              matchedKey = key;
	              result.keys.push(matchedKey);
	              break;
	            }
	          }
	        } catch (err) {
	          _didIteratorError = true;
	          _iteratorError = err;
	        } finally {
	          try {
	            if (!_iteratorNormalCompletion && _iterator.return) {
	              _iterator.return();
	            }
	          } finally {
	            if (_didIteratorError) {
	              throw _iteratorError;
	            }
	          }
	        }

	        if (matchedKey !== NO_MATCH) {
	          current = current.get(matchedKey);

	          if (i === input.length - 1) {
	            if (current.has(LEAF_NODE)) {
	              result.match = true;
	              result.value = current.get(LEAF_NODE);
	            }
	            break;
	          }
	        } else {
	          break;
	        }
	      }
	      return result;
	    }
	  }, {
	    key: "makeDecisionTree",
	    value: function makeDecisionTree(patterns) {
	      // order of keys in a Map is the order of insertion
	      var root = new Map();

	      var _iteratorNormalCompletion2 = true;
	      var _didIteratorError2 = false;
	      var _iteratorError2 = undefined;

	      try {
	        for (var _iterator2 = patterns[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	          var pattern = _step2.value;

	          make(root, pattern);
	        }
	      } catch (err) {
	        _didIteratorError2 = true;
	        _iteratorError2 = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion2 && _iterator2.return) {
	            _iterator2.return();
	          }
	        } finally {
	          if (_didIteratorError2) {
	            throw _iteratorError2;
	          }
	        }
	      }

	      return root;

	      function make(parent, pattern) {
	        if (pattern.length < 2) {
	          throw new Error("at least 2 elements required in a pattern");
	        }

	        if (pattern.length === 2) {
	          if (parent.has(pattern[0])) {
	            var pattern0 = parent.get(pattern[0]);
	            if (!pattern0.has(LEAF_NODE)) {
	              pattern0.set(LEAF_NODE, pattern[1]);
	            }
	            // here we don't handle duplicates
	            // this pattern would have already been matched
	          } else {
	            parent.set(pattern[0], new Map([[LEAF_NODE, pattern[1]]]));
	          }

	          return parent;
	        }

	        var _pattern = _toArray(pattern),
	            current = _pattern[0],
	            rest = _pattern.slice(1);

	        if (parent.has(current)) {
	          make(parent.get(current), rest);
	        } else {
	          parent.set(current, make(new Map(), rest));
	        }
	        return parent;
	      }
	    }
	  }]);

	  return PatternMatch;
	}();

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _createClass = function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
	    }
	  }return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
	  };
	}();

	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	}

	function _possibleConstructorReturn(self, call) {
	  if (!self) {
	    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	  }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
	}

	function _inherits(subClass, superClass) {
	  if (typeof superClass !== "function" && superClass !== null) {
	    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
	  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
	}

	var Collapser = __webpack_require__(1);

	var ArrayCollapser = function (_Collapser) {
	  _inherits(ArrayCollapser, _Collapser);

	  function ArrayCollapser() {
	    _classCallCheck(this, ArrayCollapser);

	    return _possibleConstructorReturn(this, (ArrayCollapser.__proto__ || Object.getPrototypeOf(ArrayCollapser)).apply(this, arguments));
	  }

	  _createClass(ArrayCollapser, [{
	    key: "isInitTypeValid",
	    value: function isInitTypeValid(init) {
	      return init.isArrayExpression();
	    }
	  }, {
	    key: "isExpressionTypeValid",
	    value: function isExpressionTypeValid(expr) {
	      return expr.isCallExpression();
	    }
	  }, {
	    key: "getExpressionChecker",
	    value: function getExpressionChecker(objName, checkReference) {
	      return function (expr) {
	        // checks expr is of form:
	        // foo.push(rval1, ...nrvals)

	        var callee = expr.get("callee");

	        if (!callee.isMemberExpression()) {
	          return false;
	        }

	        var obj = callee.get("object"),
	            prop = callee.get("property");
	        if (!obj.isIdentifier() || obj.node.name !== objName || !prop.isIdentifier() || prop.node.name !== "push") {
	          return false;
	        }

	        var args = expr.get("arguments");
	        if (args.some(checkReference)) {
	          return false;
	        }
	        return true;
	      };
	    }
	  }, {
	    key: "extractAssignment",
	    value: function extractAssignment(expr) {
	      return expr.node.arguments;
	    }
	  }, {
	    key: "addSuccessfully",
	    value: function addSuccessfully(t, args, init) {
	      args.map(function (a) {
	        return init.elements.push(a);
	      });
	      return true;
	    }
	  }]);

	  return ArrayCollapser;
	}(Collapser);

	module.exports = ArrayCollapser;

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _slicedToArray = function () {
	  function sliceIterator(arr, i) {
	    var _arr = [];var _n = true;var _d = false;var _e = undefined;try {
	      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
	        _arr.push(_s.value);if (i && _arr.length === i) break;
	      }
	    } catch (err) {
	      _d = true;_e = err;
	    } finally {
	      try {
	        if (!_n && _i["return"]) _i["return"]();
	      } finally {
	        if (_d) throw _e;
	      }
	    }return _arr;
	  }return function (arr, i) {
	    if (Array.isArray(arr)) {
	      return arr;
	    } else if (Symbol.iterator in Object(arr)) {
	      return sliceIterator(arr, i);
	    } else {
	      throw new TypeError("Invalid attempt to destructure non-iterable instance");
	    }
	  };
	}();

	var _createClass = function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
	    }
	  }return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
	  };
	}();

	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	}

	function _possibleConstructorReturn(self, call) {
	  if (!self) {
	    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	  }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
	}

	function _inherits(subClass, superClass) {
	  if (typeof superClass !== "function" && superClass !== null) {
	    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
	  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
	}

	var Collapser = __webpack_require__(1);

	var ArrayPropertyCollapser = function (_Collapser) {
	  _inherits(ArrayPropertyCollapser, _Collapser);

	  function ArrayPropertyCollapser() {
	    _classCallCheck(this, ArrayPropertyCollapser);

	    return _possibleConstructorReturn(this, (ArrayPropertyCollapser.__proto__ || Object.getPrototypeOf(ArrayPropertyCollapser)).apply(this, arguments));
	  }

	  _createClass(ArrayPropertyCollapser, [{
	    key: "isInitTypeValid",
	    value: function isInitTypeValid(init) {
	      return init.isArrayExpression();
	    }
	  }, {
	    key: "isExpressionTypeValid",
	    value: function isExpressionTypeValid(expr) {
	      return expr.isAssignmentExpression();
	    }
	  }, {
	    key: "getExpressionChecker",
	    value: function getExpressionChecker(objName, checkReference) {
	      return function (expr) {
	        // checks expr is of form:
	        // foo[num] = rval

	        var left = expr.get("left");

	        if (!left.isMemberExpression()) {
	          return false;
	        }

	        var obj = left.get("object"),
	            prop = left.get("property");
	        if (!obj.isIdentifier() || obj.node.name !== objName) {
	          return false;
	        }

	        var checkIndex = function checkIndex(num) {
	          return Number.isInteger(num) && num >= 0;
	        };

	        if (!(prop.isNumericLiteral() || prop.isStringLiteral()) || !checkIndex(Number(prop.node.value))) {
	          return false;
	        }

	        var right = expr.get("right");
	        if (checkReference(right)) {
	          return false;
	        }

	        return true;
	      };
	    }
	  }, {
	    key: "extractAssignment",
	    value: function extractAssignment(expr) {
	      return [expr.node.left.property.value, expr.get("right")];
	    }
	  }, {
	    key: "addSuccessfully",
	    value: function addSuccessfully(t, _ref, init) {
	      var _ref2 = _slicedToArray(_ref, 2),
	          index = _ref2[0],
	          rval = _ref2[1];

	      var elements = init.elements;
	      for (var i = elements.length; i <= index; i++) {
	        elements.push(null);
	      }
	      if (elements[index] !== null) {
	        return false;
	      }
	      elements[index] = rval.node;
	      return true;
	    }
	  }, {
	    key: "isSizeSmaller",
	    value: function isSizeSmaller(_ref3) {
	      var newInit = _ref3.newInit,
	          oldInit = _ref3.oldInit,
	          varDecl = _ref3.varDecl,
	          assignments = _ref3.assignments,
	          statements = _ref3.statements;

	      var anyUndefined = function anyUndefined(args) {
	        return args.some(function (a) {
	          return a === undefined;
	        });
	      };

	      // We make an inexact calculation of how much space we save.
	      // It's inexact because we don't know how whitespaces will get minimized,
	      // and other factors.
	      if (anyUndefined([statements[statements.length - 1].node.end, varDecl.node.end])) {
	        return false;
	      }
	      var statementsLength = statements[statements.length - 1].node.end - varDecl.node.end;

	      // Approx. formula of the change in `init`'s length =
	      // (# commas added) + (size of all the new rvals added), where
	      // # commas added = (difference between the lengths of the old and new arrays)

	      var numCommaAdded = newInit.elements.length - oldInit.elements.length;
	      if (anyUndefined(assignments.map(function (_ref4) {
	        var _ref5 = _slicedToArray(_ref4, 2),
	            rval = _ref5[1];

	        return rval.node.end;
	      })) || anyUndefined(assignments.map(function (_ref6) {
	        var _ref7 = _slicedToArray(_ref6, 2),
	            rval = _ref7[1];

	        return rval.node.start;
	      }))) {
	        return false;
	      }
	      var sizeOfRvals = assignments.map(function (_ref8) {
	        var _ref9 = _slicedToArray(_ref8, 2),
	            rval = _ref9[1];

	        return rval.node.end - rval.node.start + 1;
	      }) // add 1 for space in front
	      .reduce(function (a, b) {
	        return a + b;
	      }, 0); // sum

	      return numCommaAdded + sizeOfRvals < statementsLength;
	    }
	  }]);

	  return ArrayPropertyCollapser;
	}(Collapser);

	module.exports = ArrayPropertyCollapser;

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _slicedToArray = function () {
	  function sliceIterator(arr, i) {
	    var _arr = [];var _n = true;var _d = false;var _e = undefined;try {
	      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
	        _arr.push(_s.value);if (i && _arr.length === i) break;
	      }
	    } catch (err) {
	      _d = true;_e = err;
	    } finally {
	      try {
	        if (!_n && _i["return"]) _i["return"]();
	      } finally {
	        if (_d) throw _e;
	      }
	    }return _arr;
	  }return function (arr, i) {
	    if (Array.isArray(arr)) {
	      return arr;
	    } else if (Symbol.iterator in Object(arr)) {
	      return sliceIterator(arr, i);
	    } else {
	      throw new TypeError("Invalid attempt to destructure non-iterable instance");
	    }
	  };
	}();

	var COLLAPSERS = [__webpack_require__(31), __webpack_require__(28), __webpack_require__(29), __webpack_require__(32)].map(function (Collapser) {
	  return new Collapser();
	});

	function getFunctionParent(path, scopeParent) {
	  var parent = path.findParent(function (p) {
	    return p.isFunction();
	  });
	  // don"t traverse higher than the function the var is defined in.
	  return parent === scopeParent ? null : parent;
	}

	function getFunctionReferences(path, scopeParent) {
	  var references = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : new Set();

	  for (var func = getFunctionParent(path, scopeParent); func; func = getFunctionParent(func, scopeParent)) {
	    var id = func.node.id;
	    var binding = id && func.scope.getBinding(id.name);

	    if (!binding) {
	      continue;
	    }

	    binding.referencePaths.forEach(function (path) {
	      if (!references.has(path)) {
	        references.add(path);
	        getFunctionReferences(path, scopeParent, references);
	      }
	    });
	  }
	  return references;
	}

	function getIdAndFunctionReferences(name, parent) {
	  // Returns false if there's an error. Otherwise returns a list of references.
	  var binding = parent.scope.getBinding(name);
	  if (!binding) {
	    return false;
	  }

	  var references = binding.referencePaths.reduce(function (references, ref) {
	    references.add(ref);
	    getFunctionReferences(ref, parent, references);
	    return references;
	  }, new Set());

	  return Array.from(references);
	}

	function validateTopLevel(path) {
	  // Ensures the structure is of the form (roughly):
	  // {
	  //   ...
	  //   var foo = expr;
	  //   ...
	  // }
	  // returns null if not of this form
	  // otherwise returns [foo as string, ?rval, index of the variable declaration]

	  var declarations = path.get("declarations");
	  if (declarations.length !== 1) {
	    return;
	  }

	  var declaration = declarations[0];
	  var id = declaration.get("id"),
	      init = declaration.get("init");
	  if (!id.isIdentifier()) {
	    return;
	  }

	  var parent = path.parentPath;
	  if (!parent.isBlockParent() || !parent.isScopable()) {
	    return;
	  }

	  var body = parent.get("body");
	  if (!Array.isArray(body)) {
	    return;
	  }
	  var startIndex = body.indexOf(path);
	  if (startIndex === -1) {
	    return;
	  }

	  return [id.node.name, init, startIndex];
	}

	function collectExpressions(path, isExprTypeValid) {
	  // input: ExprStatement => 'a | SequenceExpression
	  // SequenceExpression => 'a list
	  // Validates 'a is of the right type
	  // returns null if found inconsistency, else returns Array<"a>
	  if (path.isExpressionStatement()) {
	    var exprs = collectExpressions(path.get("expression"), isExprTypeValid);
	    return exprs !== null ? exprs : null;
	  }

	  if (path.isSequenceExpression()) {
	    var _exprs = path.get("expressions").map(function (p) {
	      return collectExpressions(p, isExprTypeValid);
	    });
	    if (_exprs.some(function (e) {
	      return e === null;
	    })) {
	      return null;
	    } else {
	      return _exprs.reduce(function (s, n) {
	        return s.concat(n);
	      }, []); // === Array.flatten
	    }
	  }

	  if (isExprTypeValid(path)) {
	    return [path];
	  }

	  return null;
	}

	function getContiguousStatementsAndExpressions(body, start, end, isExprTypeValid, checkExpr) {
	  var statements = [];
	  var allExprs = [];
	  for (var i = start; i < end; i++) {
	    var exprs = collectExpressions(body[i], isExprTypeValid);
	    if (exprs === null || !exprs.every(function (e) {
	      return checkExpr(e);
	    })) {
	      break;
	    }
	    statements.push(body[i]);
	    allExprs = allExprs.concat(exprs);
	  }
	  return [statements, allExprs];
	}

	function getReferenceChecker(references) {
	  // returns a function s.t. given an expr, returns true iff expr is an ancestor of a reference
	  return function (expr) {
	    return references.some(function (r) {
	      return r.isDescendant(expr);
	    });
	  };
	}

	function tryUseCollapser(t, collapser, varDecl, topLevel, checkReference) {
	  // Returns true iff successfully used the collapser. Otherwise returns undefined.
	  var _topLevel = _slicedToArray(topLevel, 3),
	      name = _topLevel[0],
	      init = _topLevel[1],
	      startIndex = _topLevel[2];

	  var body = varDecl.parentPath.get("body");
	  if (!collapser.isInitTypeValid(init)) {
	    return;
	  }

	  var _getContiguousStateme = getContiguousStatementsAndExpressions(body, startIndex + 1, body.length, collapser.isExpressionTypeValid, collapser.getExpressionChecker(name, checkReference)),
	      _getContiguousStateme2 = _slicedToArray(_getContiguousStateme, 2),
	      statements = _getContiguousStateme2[0],
	      exprs = _getContiguousStateme2[1];

	  if (statements.length === 0) {
	    return;
	  }

	  var assignments = exprs.map(function (e) {
	    return collapser.extractAssignment(e);
	  });
	  var oldInit = init.node;
	  var newInit = t.cloneDeep(oldInit);
	  if (!assignments.every(function (assignment) {
	    return collapser.addSuccessfully(t, assignment, newInit);
	  })) {
	    return;
	  }

	  // some collapses may increase the size
	  if (!collapser.isSizeSmaller({ newInit: newInit, oldInit: oldInit, varDecl: varDecl, assignments: assignments, statements: statements })) {
	    return;
	  }

	  init.replaceWith(newInit);
	  statements.forEach(function (s) {
	    return s.remove();
	  });
	  return true;
	}

	module.exports = function (_ref) {
	  var t = _ref.types;

	  return {
	    name: "transform-inline-consecutive-adds",
	    visitor: {
	      VariableDeclaration: function VariableDeclaration(varDecl) {
	        var topLevel = validateTopLevel(varDecl);
	        if (!topLevel) {
	          return;
	        }

	        var _topLevel2 = _slicedToArray(topLevel, 1),
	            name = _topLevel2[0];

	        var references = getIdAndFunctionReferences(name, varDecl.parentPath);
	        if (references === false) {
	          return;
	        }
	        var checkReference = getReferenceChecker(references);

	        if (COLLAPSERS.some(function (c) {
	          return tryUseCollapser(t, c, varDecl, topLevel, checkReference);
	        })) {
	          return;
	        }
	      }
	    }
	  };
	};

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _slicedToArray = function () {
	  function sliceIterator(arr, i) {
	    var _arr = [];var _n = true;var _d = false;var _e = undefined;try {
	      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
	        _arr.push(_s.value);if (i && _arr.length === i) break;
	      }
	    } catch (err) {
	      _d = true;_e = err;
	    } finally {
	      try {
	        if (!_n && _i["return"]) _i["return"]();
	      } finally {
	        if (_d) throw _e;
	      }
	    }return _arr;
	  }return function (arr, i) {
	    if (Array.isArray(arr)) {
	      return arr;
	    } else if (Symbol.iterator in Object(arr)) {
	      return sliceIterator(arr, i);
	    } else {
	      throw new TypeError("Invalid attempt to destructure non-iterable instance");
	    }
	  };
	}();

	var _createClass = function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
	    }
	  }return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
	  };
	}();

	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	}

	function _possibleConstructorReturn(self, call) {
	  if (!self) {
	    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	  }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
	}

	function _inherits(subClass, superClass) {
	  if (typeof superClass !== "function" && superClass !== null) {
	    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
	  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
	}

	var Collapser = __webpack_require__(1);

	var ObjectCollapser = function (_Collapser) {
	  _inherits(ObjectCollapser, _Collapser);

	  function ObjectCollapser() {
	    _classCallCheck(this, ObjectCollapser);

	    return _possibleConstructorReturn(this, (ObjectCollapser.__proto__ || Object.getPrototypeOf(ObjectCollapser)).apply(this, arguments));
	  }

	  _createClass(ObjectCollapser, [{
	    key: "isInitTypeValid",
	    value: function isInitTypeValid(init) {
	      return init.isObjectExpression();
	    }
	  }, {
	    key: "isExpressionTypeValid",
	    value: function isExpressionTypeValid(expr) {
	      return expr.isAssignmentExpression();
	    }
	  }, {
	    key: "getExpressionChecker",
	    value: function getExpressionChecker(objName, checkReference) {
	      return function (expr) {
	        // checks expr is of form:
	        // foo.a = rval | foo[a] = rval

	        var left = expr.get("left");
	        if (!left.isMemberExpression()) {
	          return false;
	        }

	        var obj = left.get("object"),
	            prop = left.get("property");
	        if (!obj.isIdentifier() || obj.node.name !== objName) {
	          return false;
	        }
	        if (!prop.isIdentifier() && checkReference(prop)) {
	          return false;
	        }
	        if (left.node.computed && !(prop.isStringLiteral() || prop.isNumericLiteral())) {
	          return false;
	        }

	        var right = expr.get("right");
	        if (checkReference(right)) {
	          return false;
	        }

	        return true;
	      };
	    }
	  }, {
	    key: "extractAssignment",
	    value: function extractAssignment(expr) {
	      return [expr.node.left.property, expr.node.right];
	    }
	  }, {
	    key: "addSuccessfully",
	    value: function addSuccessfully(t, _ref, init) {
	      var _ref2 = _slicedToArray(_ref, 2),
	          left = _ref2[0],
	          right = _ref2[1];

	      init.properties.push(t.objectProperty(left, right));
	      return true;
	    }
	  }]);

	  return ObjectCollapser;
	}(Collapser);

	module.exports = ObjectCollapser;

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _createClass = function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
	    }
	  }return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
	  };
	}();

	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	}

	function _possibleConstructorReturn(self, call) {
	  if (!self) {
	    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	  }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
	}

	function _inherits(subClass, superClass) {
	  if (typeof superClass !== "function" && superClass !== null) {
	    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
	  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
	}

	var Collapser = __webpack_require__(1);

	var SetCollapser = function (_Collapser) {
	  _inherits(SetCollapser, _Collapser);

	  function SetCollapser() {
	    _classCallCheck(this, SetCollapser);

	    return _possibleConstructorReturn(this, (SetCollapser.__proto__ || Object.getPrototypeOf(SetCollapser)).apply(this, arguments));
	  }

	  _createClass(SetCollapser, [{
	    key: "isInitTypeValid",
	    value: function isInitTypeValid(init) {
	      return init.isNewExpression() && init.get("callee").isIdentifier() && init.node.callee.name === "Set" && (
	      // other iterables might not be append-able
	      init.node.arguments.length === 0 || init.node.arguments.length === 1 && init.get("arguments")[0].isArrayExpression());
	    }
	  }, {
	    key: "isExpressionTypeValid",
	    value: function isExpressionTypeValid(expr) {
	      return expr.isCallExpression();
	    }
	  }, {
	    key: "getExpressionChecker",
	    value: function getExpressionChecker(objName, checkReference) {
	      return function (expr) {
	        // checks expr is of form:
	        // foo.add(rval)

	        var callee = expr.get("callee");

	        if (!callee.isMemberExpression()) {
	          return false;
	        }

	        var obj = callee.get("object"),
	            prop = callee.get("property");
	        if (!obj.isIdentifier() || obj.node.name !== objName || !prop.isIdentifier() || prop.node.name !== "add") {
	          return false;
	        }

	        var args = expr.get("arguments");
	        if (args.length !== 1) {
	          return false;
	        }
	        if (checkReference(args)) {
	          return false;
	        }
	        return true;
	      };
	    }
	  }, {
	    key: "extractAssignment",
	    value: function extractAssignment(expr) {
	      return expr.node.arguments[0];
	    }
	  }, {
	    key: "addSuccessfully",
	    value: function addSuccessfully(t, arg, init) {
	      if (init.arguments.length === 0) {
	        init.arguments.push(t.arrayExpression());
	      }
	      init.arguments[0].elements.push(arg);
	      return true;
	    }
	  }]);

	  return SetCollapser;
	}(Collapser);

	module.exports = SetCollapser;

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/*istanbul ignore next*/"use strict";

	exports.__esModule = true;

	exports.default = function ( /*istanbul ignore next*/_ref) {
	  /*istanbul ignore next*/var t = _ref.types;

	  return {
	    visitor: { /*istanbul ignore next*/
	      MemberExpression: function MemberExpression(path) {
	        if (path.get("object").matchesPattern("process.env")) {
	          var key = path.toComputedKey();
	          if (t.isStringLiteral(key)) {
	            path.replaceWith(t.valueToNode(process.env[key.value]));
	          }
	        }
	      }
	    }
	  };
	};

	/*istanbul ignore next*/module.exports = exports["default"];
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(42)))

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	/*istanbul ignore next*/"use strict";

	exports.__esModule = true;

	exports.default = function ( /*istanbul ignore next*/_ref) {
	  /*istanbul ignore next*/var t = _ref.types;

	  return {
	    visitor: { /*istanbul ignore next*/
	      MemberExpression: function MemberExpression(path) {
	        if (path.matchesPattern("process.env.NODE_ENV")) {
	          path.replaceWith(t.valueToNode(("production")));

	          if (path.parentPath.isBinaryExpression()) {
	            var evaluated = path.parentPath.evaluate();
	            if (evaluated.confident) {
	              path.parentPath.replaceWith(t.valueToNode(evaluated.value));
	            }
	          }
	        }
	      }
	    }
	  };
	};

	/*istanbul ignore next*/module.exports = exports["default"];

/***/ },
/* 35 */
/***/ function(module, exports) {

	"use strict";

	function createRegExpLiteral(args, prettify, t) {
	  var evaluatedArgs = args.map(function (a) {
	    return a.evaluate();
	  });
	  if (!evaluatedArgs.every(function (a) {
	    return a.confident === true && typeof a.value === "string";
	  })) {
	    return;
	  }
	  var pattern = evaluatedArgs.length >= 1 && evaluatedArgs[0].value !== "" ? evaluatedArgs[0].value : "(?:)";
	  var flags = evaluatedArgs.length >= 2 ? evaluatedArgs[1].value : "";

	  pattern = new RegExp(pattern).source;
	  if (prettify) {
	    pattern = pattern.replace(/\n/g, "\\n").replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029").replace(/[\b]/g, "[\\b]").replace(/\v/g, "\\v").replace(/\f/g, "\\f").replace(/\r/g, "\\r");
	  }
	  return t.regExpLiteral(pattern, flags);
	}

	function maybeReplaceWithRegExpLiteral(path, t) {
	  if (!t.isIdentifier(path.node.callee, { name: "RegExp" })) {
	    return;
	  }
	  var regExpLiteral = createRegExpLiteral(path.get("arguments"), true, t);
	  if (regExpLiteral) {
	    path.replaceWith(regExpLiteral);
	  }
	}

	module.exports = function (_ref) {
	  var t = _ref.types;

	  return {
	    name: "transform-regexp-constructors",
	    visitor: {
	      NewExpression: function NewExpression(path) {
	        maybeReplaceWithRegExpLiteral(path, t);
	      },
	      CallExpression: function CallExpression(path) {
	        // equivalent to `new RegExp()` according to §21.2.3
	        maybeReplaceWithRegExpLiteral(path, t);
	      }
	    }
	  };
	};

/***/ },
/* 36 */
/***/ function(module, exports) {

	"use strict";

	function isPureAndUndefined(rval) {
	  if (rval.isIdentifier() && rval.node.name === "undefined") {
	    return true;
	  }
	  if (!rval.isPure()) {
	    return false;
	  }
	  var evaluation = rval.evaluate();
	  return evaluation.confident === true && evaluation.value === undefined;
	}

	function getLoopParent(path, scopeParent) {
	  var parent = path.findParent(function (p) {
	    return p.isLoop() || p === scopeParent;
	  });
	  // don't traverse higher than the function the var is defined in.
	  return parent === scopeParent ? null : parent;
	}

	function getFunctionParent(path, scopeParent) {
	  var parent = path.findParent(function (p) {
	    return p.isFunction();
	  });
	  // don't traverse higher than the function the var is defined in.
	  return parent === scopeParent ? null : parent;
	}

	function getFunctionReferences(path, scopeParent) {
	  var references = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : new Set();

	  for (var func = getFunctionParent(path, scopeParent); func; func = getFunctionParent(func, scopeParent)) {
	    var id = func.node.id;
	    var binding = id && func.scope.getBinding(id.name);

	    if (!binding) {
	      continue;
	    }

	    binding.referencePaths.forEach(function (path) {
	      if (!references.has(path)) {
	        references.add(path);
	        getFunctionReferences(path, scopeParent, references);
	      }
	    });
	  }
	  return references;
	}

	function hasViolation(declarator, scope, start) {
	  var binding = scope.getBinding(declarator.node.id.name);
	  if (!binding) {
	    return true;
	  }

	  var scopeParent = declarator.getFunctionParent();

	  var violation = binding.constantViolations.some(function (v) {
	    // return 'true' if we cannot guarantee the violation references
	    // the initialized identifier after
	    var violationStart = v.node.start;
	    if (violationStart === undefined || violationStart < start) {
	      return true;
	    }

	    var references = getFunctionReferences(v, scopeParent);
	    var _iteratorNormalCompletion = true;
	    var _didIteratorError = false;
	    var _iteratorError = undefined;

	    try {
	      for (var _iterator = references[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	        var ref = _step.value;

	        if (ref.node.start === undefined || ref.node.start < start) {
	          return true;
	        }
	      }
	    } catch (err) {
	      _didIteratorError = true;
	      _iteratorError = err;
	    } finally {
	      try {
	        if (!_iteratorNormalCompletion && _iterator.return) {
	          _iterator.return();
	        }
	      } finally {
	        if (_didIteratorError) {
	          throw _iteratorError;
	        }
	      }
	    }

	    for (var loop = getLoopParent(declarator, scopeParent); loop; loop = getLoopParent(loop, scopeParent)) {
	      if (loop.node.end === undefined || loop.node.end > violationStart) {
	        return true;
	      }
	    }
	  });

	  return violation;
	}

	module.exports = function () {
	  return {
	    name: "transform-remove-undefined",
	    visitor: {
	      ReturnStatement: function ReturnStatement(path) {
	        if (path.node.argument !== null) {
	          if (isPureAndUndefined(path.get("argument"))) {
	            path.node.argument = null;
	          }
	        }
	      },
	      VariableDeclaration: function VariableDeclaration(path) {
	        switch (path.node.kind) {
	          case "const":
	            break;
	          case "let":
	            var _iteratorNormalCompletion2 = true;
	            var _didIteratorError2 = false;
	            var _iteratorError2 = undefined;

	            try {
	              for (var _iterator2 = path.get("declarations")[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	                var declarator = _step2.value;

	                if (isPureAndUndefined(declarator.get("init"))) {
	                  declarator.node.init = null;
	                }
	              }
	            } catch (err) {
	              _didIteratorError2 = true;
	              _iteratorError2 = err;
	            } finally {
	              try {
	                if (!_iteratorNormalCompletion2 && _iterator2.return) {
	                  _iterator2.return();
	                }
	              } finally {
	                if (_didIteratorError2) {
	                  throw _iteratorError2;
	                }
	              }
	            }

	            break;
	          case "var":
	            var start = path.node.start;
	            if (start === undefined) {
	              // This is common for plugin-generated nodes
	              break;
	            }
	            var scope = path.scope;
	            var _iteratorNormalCompletion3 = true;
	            var _didIteratorError3 = false;
	            var _iteratorError3 = undefined;

	            try {
	              for (var _iterator3 = path.get("declarations")[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
	                var _declarator = _step3.value;

	                if (isPureAndUndefined(_declarator.get("init")) && !hasViolation(_declarator, scope, start)) {
	                  _declarator.node.init = null;
	                }
	              }
	            } catch (err) {
	              _didIteratorError3 = true;
	              _iteratorError3 = err;
	            } finally {
	              try {
	                if (!_iteratorNormalCompletion3 && _iterator3.return) {
	                  _iterator3.return();
	                }
	              } finally {
	                if (_didIteratorError3) {
	                  throw _iteratorError3;
	                }
	              }
	            }

	            break;
	        }
	      }
	    }
	  };
	};

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var isPlainObject = __webpack_require__(20);

	var _require = __webpack_require__(38),
	    group = _require.group,
	    option = _require.option,
	    proxy = _require.proxy,
	    generate = _require.generate;

	// the flat plugin map
	// This is to prevent dynamic requires - require('babel-plugin-' + name);
	// as it suffers during bundling of this code with webpack/browserify


	var PLUGINS = [["booleans", __webpack_require__(14), true], ["consecutiveAdds", __webpack_require__(30), true], ["deadcode", __webpack_require__(6), true], ["evaluate", __webpack_require__(5), true], ["flipComparisons", __webpack_require__(7), true], ["guards", __webpack_require__(8), true], ["infinity", __webpack_require__(39), true], ["mangle", __webpack_require__(9), true], ["memberExpressions", __webpack_require__(12), true], ["mergeVars", __webpack_require__(13), true], ["numericLiterals", __webpack_require__(25), true], ["propertyLiterals", __webpack_require__(15), true], ["regexpConstructors", __webpack_require__(35), true], ["removeConsole", __webpack_require__(16), false], ["removeDebugger", __webpack_require__(17), false], ["removeUndefined", __webpack_require__(36), true], ["replace", __webpack_require__(40), true], ["simplify", __webpack_require__(10), true], ["simplifyComparisons", __webpack_require__(18), true], ["typeConstructors", __webpack_require__(11), true], ["undefinedToVoid", __webpack_require__(19), true]];

	module.exports = preset;

	function preset(context) {
	  var _opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	  var opts = isPlainObject(_opts) ? _opts : {};

	  // to track every plugin is used
	  var usedPlugins = new Set();

	  var optionsMap = PLUGINS.map(function (plugin) {
	    return option(plugin[0], plugin[1], plugin[2]);
	  }).reduce(function (acc, cur) {
	    Object.defineProperty(acc, cur.name, {
	      get: function get() {
	        usedPlugins.add(cur.name);
	        return cur;
	      }
	    });
	    return acc;
	  }, {});

	  var optionsTree = group("options", [optionsMap.evaluate, optionsMap.deadcode, group("unsafe", [optionsMap.flipComparisons, optionsMap.simplifyComparisons, optionsMap.guards, optionsMap.typeConstructors]), optionsMap.infinity, optionsMap.mangle, optionsMap.numericLiterals, optionsMap.replace, optionsMap.simplify, group("properties", [optionsMap.consecutiveAdds, optionsMap.memberExpressions, optionsMap.propertyLiterals]), optionsMap.mergeVars, optionsMap.booleans, optionsMap.undefinedToVoid, optionsMap.regexpConstructors, optionsMap.removeConsole, optionsMap.removeDebugger, optionsMap.removeUndefined, proxy("keepFnName", [optionsMap.mangle, optionsMap.deadcode]), proxy("keepClassName", [optionsMap.mangle, optionsMap.deadcode])], "some");

	  // verify all plugins are used
	  if (usedPlugins.size !== PLUGINS.length) {
	    var unusedPlugins = PLUGINS.filter(function (plugin) {
	      return !usedPlugins.has(plugin[0]);
	    }).map(function (plugin) {
	      return plugin[0];
	    });
	    throw new Error("Some imported plugins unused\n" + unusedPlugins);
	  }

	  var plugins = generate(optionsTree, opts);

	  return {
	    minified: true,
	    comments: false,
	    presets: [{ plugins: plugins }],
	    passPerPreset: true
	  };
	}

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	function _toConsumableArray(arr) {
	  if (Array.isArray(arr)) {
	    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
	      arr2[i] = arr[i];
	    }return arr2;
	  } else {
	    return Array.from(arr);
	  }
	}

	var isPlainObject = __webpack_require__(20);

	/**
	 * Options Manager
	 *
	 * Input Options: Object
	 * Output: Array of plugins enabled with their options
	 *
	 * Handles multiple types of input option keys
	 *
	 * 1. boolean and object values
	 * { mangle: true } // should enable mangler
	 * { mangle: { blacklist: ["foo"] } } // should enabled mangler
	 *                                    // and pass obj to mangle plugin
	 *
	 * 2. group
	 * { unsafe: true } // should enable all plugins under unsafe
	 * { unsafe: { flip: false } } // should disable flip-comparisons plugin
	 *                             // and other plugins should take their defaults
	 * { unsafe: { simplify: {multipass: true}}} // should pass obj to simplify
	 *                                           // other plugins take defaults
	 *
	 * 3. same option passed on to multiple plugins
	 * { keepFnames: false } // should be passed on to mangle & dce
	 *                       // without disturbing their own options
	 */

	module.exports = {
	  option: option,
	  proxy: proxy,
	  group: group,
	  generate: generate,
	  resolveOptions: resolveOptions,
	  generateResult: generateResult
	};

	/**
	 * Generate the plugin list from option tree and inputOpts
	 */
	function generate(optionTree, inputOpts) {
	  return generateResult(resolveOptions(optionTree, inputOpts));
	}

	/**
	 * Generate plugin list from the resolvedOptionTree
	 * where resolvedOptionTree = for every node, node.resolved = true;
	 */
	function generateResult(resolvedOpts) {
	  var options = resolvedOpts.children;
	  var result = [];

	  for (var i = 0; i < options.length; i++) {
	    var _option = options[i];

	    switch (_option.type) {
	      case "option":
	        if (_option.resolvedValue) {
	          result.push(_option.resolvedValue);
	        }
	        break;
	      case "group":
	        result.push.apply(result, _toConsumableArray(generateResult(_option)));
	        break;
	    }
	  }

	  return result;
	}

	/**
	 * Traverses input @param{optionTree} and adds resolvedValue
	 * calculated from @param{inputOpts} for each Node in the tree
	 */
	function resolveOptions(optionTree) {
	  var inputOpts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	  var options = optionTree.children;

	  // a queue to resolve proxies at the end after all options groups are resolved
	  var proxiesToResolve = [];

	  for (var i = 0; i < options.length; i++) {
	    var _option2 = options[i];
	    switch (_option2.type) {
	      case "option":
	        resolveTypeOption(_option2, inputOpts);
	        break;

	      case "group":
	        resolveTypeGroup(_option2, inputOpts);
	        break;

	      case "proxy":
	        if (!hop(inputOpts, _option2.name)) {
	          break;
	        }
	        proxiesToResolve.push(_option2);
	        break;

	      default:
	        throw new TypeError("Option type not supported - " + _option2.type);
	    }
	  }

	  // resolve proxies
	  for (var _i = 0; _i < proxiesToResolve.length; _i++) {
	    var _proxy = proxiesToResolve[_i];
	    for (var j = 0; j < _proxy.to.length; j++) {
	      var _option3 = _proxy.to[j];
	      switch (_option3.type) {
	        case "option":
	          resolveTypeProxyToOption(_proxy, _option3, inputOpts);
	          break;

	        case "group":
	        case "proxy":
	          throw new Error("proxy option cannot proxy to group/proxy. " + _proxy.name + " proxied to " + _option3.name);

	        default:
	          throw new Error("Unsupported option type ${option.name}");
	      }
	    }
	  }

	  // return the same tree after modifications
	  return optionTree;
	}

	/**
	 * Resolve the type - simple option using the @param{inputOpts}
	 */
	function resolveTypeOption(option, inputOpts) {
	  option.resolved = true;

	  // option does NOT exist in inputOpts
	  if (!hop(inputOpts, option.name)) {
	    // default value
	    option.resolvedValue = option.defaultValue ? option.resolvingValue : null;
	    return;
	  }

	  // Object
	  // { mangle: { blacklist: ["foo", "bar"] } }
	  if (isPlainObject(inputOpts[option.name])) {
	    option.resolvedValue = [option.resolvingValue, inputOpts[option.name]];
	    return;
	  }

	  // any other truthy value, just enables the plugin
	  // { mangle: true }
	  if (inputOpts[option.name]) {
	    option.resolvedValue = option.resolvingValue;
	    return;
	  }

	  // disabled
	  option.resolvedValue = null;
	}

	/**
	 * Resolve the group using @param{inputOpts}
	 */
	function resolveTypeGroup(option, inputOpts) {
	  option.resolved = true;

	  // option does NOT exist in inputOpts
	  if (!hop(inputOpts, option.name)) {
	    var _newInputOpts = option.children.filter(function (opt) {
	      return opt.type !== "proxy";
	    }).reduce(function (acc, cur) {
	      var value = void 0;
	      switch (option.defaultValue) {
	        case "all":
	          value = true;break;
	        case "some":
	          value = cur.defaultValue;break;
	        case "none":
	          value = false;break;
	        default:
	          throw new Error("Unsupported defaultValue - " + option.defaultValue + " for option " + option.name);
	      }
	      return Object.assign({}, acc, _defineProperty({}, cur.name, value));
	    }, {});

	    // recurse
	    resolveOptions(option, _newInputOpts);
	    return;
	  }

	  // has individual options for items in group
	  // { unsafe: { flipComparisons: true } }
	  if (isPlainObject(inputOpts[option.name])) {
	    resolveOptions(option, inputOpts[option.name]);
	    return;
	  }

	  // else
	  // { unsafe: <true | false> }
	  var newInputOpts = option.children.filter(function (opt) {
	    return opt.type !== "proxy";
	  }).reduce(function (acc, cur) {
	    return Object.assign({}, acc, _defineProperty({}, cur.name, !!inputOpts[option.name]));
	  }, {});
	  resolveOptions(option, newInputOpts);
	}

	/**
	 * Resolve proxies and update the already resolved Options
	 */
	function resolveTypeProxyToOption(proxy, option, inputOpts) {
	  if (!option.resolved) {
	    throw new Error("Proxies cannot be applied before the original option is resolved");
	  }

	  // option is disabled
	  if (!option.resolvedValue) {
	    return;
	  }

	  // option doesn't contain any option on its own
	  if (option.resolvedValue === option.resolvingValue) {
	    option.resolvedValue = [option.resolvedValue, _defineProperty({}, proxy.name, inputOpts[proxy.name])];
	  }

	  // option already has its own set of options to be passed to plugins
	  else if (Array.isArray(option.resolvedValue) && option.resolvedValue.length === 2) {
	      // proxies should not override
	      if (!hop(option.resolvedValue[1], proxy.name)) {
	        option.resolvedValue = [option.resolvingValue, Object.assign({}, option.resolvedValue[1], _defineProperty({}, proxy.name, inputOpts[proxy.name]))];
	      }
	    }

	    // plugin is invalid
	    else {
	        throw new Error("Invalid resolved value for option " + option.name);
	      }
	}

	// create an option of type simple option
	function option(name, resolvingValue) {
	  var defaultValue = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

	  assertName(name);
	  if (!resolvingValue) {
	    // as plugins are truthy values
	    throw new Error("Only truthy resolving values are supported");
	  }
	  return {
	    type: "option",
	    name: name,
	    resolvingValue: resolvingValue,
	    defaultValue: defaultValue
	  };
	}

	// create an option of type proxy
	function proxy(name, to) {
	  assertName(name);
	  assertArray(name, "to", to);
	  return {
	    type: "proxy",
	    name: name,
	    to: to
	  };
	}

	// create an option of type - group of options
	function group(name, children) {
	  var defaultValue = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "some";

	  assertName(name);
	  assertArray(name, "children", children);
	  return {
	    type: "group",
	    name: name,
	    children: children.filter(function (x) {
	      return !!x;
	    }),
	    defaultValue: defaultValue
	  };
	}

	function hop(o, key) {
	  return Object.hasOwnProperty.call(o, key);
	}

	function assertArray(name, prop, arr) {
	  if (!Array.isArray(arr)) {
	    throw new Error("Expected " + prop + " to be an array in option " + name);
	  }
	}

	function assertName(name) {
	  if (!name) {
	    throw new Error("Invalid option name " + name);
	  }
	}

/***/ },
/* 39 */
/***/ function(module, exports) {

	"use strict";

	module.exports = function (_ref) {
	  var t = _ref.types;

	  var INFINITY = t.binaryExpression("/", t.numericLiteral(1), t.numericLiteral(0));
	  return {
	    name: "minify-infinity",
	    visitor: {
	      // Infinity -> 1 / 0
	      Identifier: function Identifier(path) {
	        if (path.node.name !== "Infinity") {
	          return;
	        }

	        // It's a referenced identifier
	        if (path.scope.getBinding("Infinity")) {
	          return;
	        }

	        if (path.parentPath.isObjectProperty({ key: path.node })) {
	          return;
	        }

	        if (path.parentPath.isMemberExpression()) {
	          return;
	        }

	        if (path.isLVal() && !path.parentPath.isExpressionStatement()) {
	          return;
	        }

	        path.replaceWith(INFINITY);
	      }
	    }
	  };
	};

/***/ },
/* 40 */
26,
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global, module) {'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	/**
	 * lodash (Custom Build) <https://lodash.com/>
	 * Build: `lodash modularize exports="npm" -o ./`
	 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
	 * Released under MIT license <https://lodash.com/license>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 */

	/** Used as the size to enable large array optimizations. */
	var LARGE_ARRAY_SIZE = 200;

	/** Used as the `TypeError` message for "Functions" methods. */
	var FUNC_ERROR_TEXT = 'Expected a function';

	/** Used to stand-in for `undefined` hash values. */
	var HASH_UNDEFINED = '__lodash_hash_undefined__';

	/** Used to compose bitmasks for comparison styles. */
	var UNORDERED_COMPARE_FLAG = 1,
	    PARTIAL_COMPARE_FLAG = 2;

	/** Used as references for various `Number` constants. */
	var INFINITY = 1 / 0,
	    MAX_SAFE_INTEGER = 9007199254740991;

	/** `Object#toString` result references. */
	var argsTag = '[object Arguments]',
	    arrayTag = '[object Array]',
	    boolTag = '[object Boolean]',
	    dateTag = '[object Date]',
	    errorTag = '[object Error]',
	    funcTag = '[object Function]',
	    genTag = '[object GeneratorFunction]',
	    mapTag = '[object Map]',
	    numberTag = '[object Number]',
	    objectTag = '[object Object]',
	    promiseTag = '[object Promise]',
	    regexpTag = '[object RegExp]',
	    setTag = '[object Set]',
	    stringTag = '[object String]',
	    symbolTag = '[object Symbol]',
	    weakMapTag = '[object WeakMap]';

	var arrayBufferTag = '[object ArrayBuffer]',
	    dataViewTag = '[object DataView]',
	    float32Tag = '[object Float32Array]',
	    float64Tag = '[object Float64Array]',
	    int8Tag = '[object Int8Array]',
	    int16Tag = '[object Int16Array]',
	    int32Tag = '[object Int32Array]',
	    uint8Tag = '[object Uint8Array]',
	    uint8ClampedTag = '[object Uint8ClampedArray]',
	    uint16Tag = '[object Uint16Array]',
	    uint32Tag = '[object Uint32Array]';

	/** Used to match property names within property paths. */
	var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
	    reIsPlainProp = /^\w*$/,
	    reLeadingDot = /^\./,
	    rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;

	/**
	 * Used to match `RegExp`
	 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
	 */
	var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

	/** Used to match backslashes in property paths. */
	var reEscapeChar = /\\(\\)?/g;

	/** Used to detect host constructors (Safari). */
	var reIsHostCtor = /^\[object .+?Constructor\]$/;

	/** Used to detect unsigned integer values. */
	var reIsUint = /^(?:0|[1-9]\d*)$/;

	/** Used to identify `toStringTag` values of typed arrays. */
	var typedArrayTags = {};
	typedArrayTags[float32Tag] = typedArrayTags[float64Tag] = typedArrayTags[int8Tag] = typedArrayTags[int16Tag] = typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] = typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] = typedArrayTags[uint32Tag] = true;
	typedArrayTags[argsTag] = typedArrayTags[arrayTag] = typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] = typedArrayTags[dataViewTag] = typedArrayTags[dateTag] = typedArrayTags[errorTag] = typedArrayTags[funcTag] = typedArrayTags[mapTag] = typedArrayTags[numberTag] = typedArrayTags[objectTag] = typedArrayTags[regexpTag] = typedArrayTags[setTag] = typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;

	/** Detect free variable `global` from Node.js. */
	var freeGlobal = (typeof global === 'undefined' ? 'undefined' : _typeof(global)) == 'object' && global && global.Object === Object && global;

	/** Detect free variable `self`. */
	var freeSelf = (typeof self === 'undefined' ? 'undefined' : _typeof(self)) == 'object' && self && self.Object === Object && self;

	/** Used as a reference to the global object. */
	var root = freeGlobal || freeSelf || Function('return this')();

	/** Detect free variable `exports`. */
	var freeExports = ( false ? 'undefined' : _typeof(exports)) == 'object' && exports && !exports.nodeType && exports;

	/** Detect free variable `module`. */
	var freeModule = freeExports && ( false ? 'undefined' : _typeof(module)) == 'object' && module && !module.nodeType && module;

	/** Detect the popular CommonJS extension `module.exports`. */
	var moduleExports = freeModule && freeModule.exports === freeExports;

	/** Detect free variable `process` from Node.js. */
	var freeProcess = moduleExports && freeGlobal.process;

	/** Used to access faster Node.js helpers. */
	var nodeUtil = function () {
	  try {
	    return freeProcess && freeProcess.binding('util');
	  } catch (e) {}
	}();

	/* Node.js helper references. */
	var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;

	/**
	 * A specialized version of `_.some` for arrays without support for iteratee
	 * shorthands.
	 *
	 * @private
	 * @param {Array} [array] The array to iterate over.
	 * @param {Function} predicate The function invoked per iteration.
	 * @returns {boolean} Returns `true` if any element passes the predicate check,
	 *  else `false`.
	 */
	function arraySome(array, predicate) {
	  var index = -1,
	      length = array ? array.length : 0;

	  while (++index < length) {
	    if (predicate(array[index], index, array)) {
	      return true;
	    }
	  }
	  return false;
	}

	/**
	 * The base implementation of `_.property` without support for deep paths.
	 *
	 * @private
	 * @param {string} key The key of the property to get.
	 * @returns {Function} Returns the new accessor function.
	 */
	function baseProperty(key) {
	  return function (object) {
	    return object == null ? undefined : object[key];
	  };
	}

	/**
	 * The base implementation of `_.times` without support for iteratee shorthands
	 * or max array length checks.
	 *
	 * @private
	 * @param {number} n The number of times to invoke `iteratee`.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array} Returns the array of results.
	 */
	function baseTimes(n, iteratee) {
	  var index = -1,
	      result = Array(n);

	  while (++index < n) {
	    result[index] = iteratee(index);
	  }
	  return result;
	}

	/**
	 * The base implementation of `_.unary` without support for storing metadata.
	 *
	 * @private
	 * @param {Function} func The function to cap arguments for.
	 * @returns {Function} Returns the new capped function.
	 */
	function baseUnary(func) {
	  return function (value) {
	    return func(value);
	  };
	}

	/**
	 * Gets the value at `key` of `object`.
	 *
	 * @private
	 * @param {Object} [object] The object to query.
	 * @param {string} key The key of the property to get.
	 * @returns {*} Returns the property value.
	 */
	function getValue(object, key) {
	  return object == null ? undefined : object[key];
	}

	/**
	 * Checks if `value` is a host object in IE < 9.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a host object, else `false`.
	 */
	function isHostObject(value) {
	  // Many host objects are `Object` objects that can coerce to strings
	  // despite having improperly defined `toString` methods.
	  var result = false;
	  if (value != null && typeof value.toString != 'function') {
	    try {
	      result = !!(value + '');
	    } catch (e) {}
	  }
	  return result;
	}

	/**
	 * Converts `map` to its key-value pairs.
	 *
	 * @private
	 * @param {Object} map The map to convert.
	 * @returns {Array} Returns the key-value pairs.
	 */
	function mapToArray(map) {
	  var index = -1,
	      result = Array(map.size);

	  map.forEach(function (value, key) {
	    result[++index] = [key, value];
	  });
	  return result;
	}

	/**
	 * Creates a unary function that invokes `func` with its argument transformed.
	 *
	 * @private
	 * @param {Function} func The function to wrap.
	 * @param {Function} transform The argument transform.
	 * @returns {Function} Returns the new function.
	 */
	function overArg(func, transform) {
	  return function (arg) {
	    return func(transform(arg));
	  };
	}

	/**
	 * Converts `set` to an array of its values.
	 *
	 * @private
	 * @param {Object} set The set to convert.
	 * @returns {Array} Returns the values.
	 */
	function setToArray(set) {
	  var index = -1,
	      result = Array(set.size);

	  set.forEach(function (value) {
	    result[++index] = value;
	  });
	  return result;
	}

	/** Used for built-in method references. */
	var arrayProto = Array.prototype,
	    funcProto = Function.prototype,
	    objectProto = Object.prototype;

	/** Used to detect overreaching core-js shims. */
	var coreJsData = root['__core-js_shared__'];

	/** Used to detect methods masquerading as native. */
	var maskSrcKey = function () {
	  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
	  return uid ? 'Symbol(src)_1.' + uid : '';
	}();

	/** Used to resolve the decompiled source of functions. */
	var funcToString = funcProto.toString;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;

	/** Used to detect if a method is native. */
	var reIsNative = RegExp('^' + funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&').replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$');

	/** Built-in value references. */
	var _Symbol = root.Symbol,
	    Uint8Array = root.Uint8Array,
	    propertyIsEnumerable = objectProto.propertyIsEnumerable,
	    splice = arrayProto.splice;

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeKeys = overArg(Object.keys, Object);

	/* Built-in method references that are verified to be native. */
	var DataView = getNative(root, 'DataView'),
	    Map = getNative(root, 'Map'),
	    Promise = getNative(root, 'Promise'),
	    Set = getNative(root, 'Set'),
	    WeakMap = getNative(root, 'WeakMap'),
	    nativeCreate = getNative(Object, 'create');

	/** Used to detect maps, sets, and weakmaps. */
	var dataViewCtorString = toSource(DataView),
	    mapCtorString = toSource(Map),
	    promiseCtorString = toSource(Promise),
	    setCtorString = toSource(Set),
	    weakMapCtorString = toSource(WeakMap);

	/** Used to convert symbols to primitives and strings. */
	var symbolProto = _Symbol ? _Symbol.prototype : undefined,
	    symbolValueOf = symbolProto ? symbolProto.valueOf : undefined,
	    symbolToString = symbolProto ? symbolProto.toString : undefined;

	/**
	 * Creates a hash object.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [entries] The key-value pairs to cache.
	 */
	function Hash(entries) {
	  var index = -1,
	      length = entries ? entries.length : 0;

	  this.clear();
	  while (++index < length) {
	    var entry = entries[index];
	    this.set(entry[0], entry[1]);
	  }
	}

	/**
	 * Removes all key-value entries from the hash.
	 *
	 * @private
	 * @name clear
	 * @memberOf Hash
	 */
	function hashClear() {
	  this.__data__ = nativeCreate ? nativeCreate(null) : {};
	}

	/**
	 * Removes `key` and its value from the hash.
	 *
	 * @private
	 * @name delete
	 * @memberOf Hash
	 * @param {Object} hash The hash to modify.
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function hashDelete(key) {
	  return this.has(key) && delete this.__data__[key];
	}

	/**
	 * Gets the hash value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf Hash
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function hashGet(key) {
	  var data = this.__data__;
	  if (nativeCreate) {
	    var result = data[key];
	    return result === HASH_UNDEFINED ? undefined : result;
	  }
	  return hasOwnProperty.call(data, key) ? data[key] : undefined;
	}

	/**
	 * Checks if a hash value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf Hash
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function hashHas(key) {
	  var data = this.__data__;
	  return nativeCreate ? data[key] !== undefined : hasOwnProperty.call(data, key);
	}

	/**
	 * Sets the hash `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf Hash
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the hash instance.
	 */
	function hashSet(key, value) {
	  var data = this.__data__;
	  data[key] = nativeCreate && value === undefined ? HASH_UNDEFINED : value;
	  return this;
	}

	// Add methods to `Hash`.
	Hash.prototype.clear = hashClear;
	Hash.prototype['delete'] = hashDelete;
	Hash.prototype.get = hashGet;
	Hash.prototype.has = hashHas;
	Hash.prototype.set = hashSet;

	/**
	 * Creates an list cache object.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [entries] The key-value pairs to cache.
	 */
	function ListCache(entries) {
	  var index = -1,
	      length = entries ? entries.length : 0;

	  this.clear();
	  while (++index < length) {
	    var entry = entries[index];
	    this.set(entry[0], entry[1]);
	  }
	}

	/**
	 * Removes all key-value entries from the list cache.
	 *
	 * @private
	 * @name clear
	 * @memberOf ListCache
	 */
	function listCacheClear() {
	  this.__data__ = [];
	}

	/**
	 * Removes `key` and its value from the list cache.
	 *
	 * @private
	 * @name delete
	 * @memberOf ListCache
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function listCacheDelete(key) {
	  var data = this.__data__,
	      index = assocIndexOf(data, key);

	  if (index < 0) {
	    return false;
	  }
	  var lastIndex = data.length - 1;
	  if (index == lastIndex) {
	    data.pop();
	  } else {
	    splice.call(data, index, 1);
	  }
	  return true;
	}

	/**
	 * Gets the list cache value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf ListCache
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function listCacheGet(key) {
	  var data = this.__data__,
	      index = assocIndexOf(data, key);

	  return index < 0 ? undefined : data[index][1];
	}

	/**
	 * Checks if a list cache value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf ListCache
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function listCacheHas(key) {
	  return assocIndexOf(this.__data__, key) > -1;
	}

	/**
	 * Sets the list cache `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf ListCache
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the list cache instance.
	 */
	function listCacheSet(key, value) {
	  var data = this.__data__,
	      index = assocIndexOf(data, key);

	  if (index < 0) {
	    data.push([key, value]);
	  } else {
	    data[index][1] = value;
	  }
	  return this;
	}

	// Add methods to `ListCache`.
	ListCache.prototype.clear = listCacheClear;
	ListCache.prototype['delete'] = listCacheDelete;
	ListCache.prototype.get = listCacheGet;
	ListCache.prototype.has = listCacheHas;
	ListCache.prototype.set = listCacheSet;

	/**
	 * Creates a map cache object to store key-value pairs.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [entries] The key-value pairs to cache.
	 */
	function MapCache(entries) {
	  var index = -1,
	      length = entries ? entries.length : 0;

	  this.clear();
	  while (++index < length) {
	    var entry = entries[index];
	    this.set(entry[0], entry[1]);
	  }
	}

	/**
	 * Removes all key-value entries from the map.
	 *
	 * @private
	 * @name clear
	 * @memberOf MapCache
	 */
	function mapCacheClear() {
	  this.__data__ = {
	    'hash': new Hash(),
	    'map': new (Map || ListCache)(),
	    'string': new Hash()
	  };
	}

	/**
	 * Removes `key` and its value from the map.
	 *
	 * @private
	 * @name delete
	 * @memberOf MapCache
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function mapCacheDelete(key) {
	  return getMapData(this, key)['delete'](key);
	}

	/**
	 * Gets the map value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf MapCache
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function mapCacheGet(key) {
	  return getMapData(this, key).get(key);
	}

	/**
	 * Checks if a map value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf MapCache
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function mapCacheHas(key) {
	  return getMapData(this, key).has(key);
	}

	/**
	 * Sets the map `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf MapCache
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the map cache instance.
	 */
	function mapCacheSet(key, value) {
	  getMapData(this, key).set(key, value);
	  return this;
	}

	// Add methods to `MapCache`.
	MapCache.prototype.clear = mapCacheClear;
	MapCache.prototype['delete'] = mapCacheDelete;
	MapCache.prototype.get = mapCacheGet;
	MapCache.prototype.has = mapCacheHas;
	MapCache.prototype.set = mapCacheSet;

	/**
	 *
	 * Creates an array cache object to store unique values.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [values] The values to cache.
	 */
	function SetCache(values) {
	  var index = -1,
	      length = values ? values.length : 0;

	  this.__data__ = new MapCache();
	  while (++index < length) {
	    this.add(values[index]);
	  }
	}

	/**
	 * Adds `value` to the array cache.
	 *
	 * @private
	 * @name add
	 * @memberOf SetCache
	 * @alias push
	 * @param {*} value The value to cache.
	 * @returns {Object} Returns the cache instance.
	 */
	function setCacheAdd(value) {
	  this.__data__.set(value, HASH_UNDEFINED);
	  return this;
	}

	/**
	 * Checks if `value` is in the array cache.
	 *
	 * @private
	 * @name has
	 * @memberOf SetCache
	 * @param {*} value The value to search for.
	 * @returns {number} Returns `true` if `value` is found, else `false`.
	 */
	function setCacheHas(value) {
	  return this.__data__.has(value);
	}

	// Add methods to `SetCache`.
	SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
	SetCache.prototype.has = setCacheHas;

	/**
	 * Creates a stack cache object to store key-value pairs.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [entries] The key-value pairs to cache.
	 */
	function Stack(entries) {
	  this.__data__ = new ListCache(entries);
	}

	/**
	 * Removes all key-value entries from the stack.
	 *
	 * @private
	 * @name clear
	 * @memberOf Stack
	 */
	function stackClear() {
	  this.__data__ = new ListCache();
	}

	/**
	 * Removes `key` and its value from the stack.
	 *
	 * @private
	 * @name delete
	 * @memberOf Stack
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function stackDelete(key) {
	  return this.__data__['delete'](key);
	}

	/**
	 * Gets the stack value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf Stack
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function stackGet(key) {
	  return this.__data__.get(key);
	}

	/**
	 * Checks if a stack value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf Stack
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function stackHas(key) {
	  return this.__data__.has(key);
	}

	/**
	 * Sets the stack `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf Stack
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the stack cache instance.
	 */
	function stackSet(key, value) {
	  var cache = this.__data__;
	  if (cache instanceof ListCache) {
	    var pairs = cache.__data__;
	    if (!Map || pairs.length < LARGE_ARRAY_SIZE - 1) {
	      pairs.push([key, value]);
	      return this;
	    }
	    cache = this.__data__ = new MapCache(pairs);
	  }
	  cache.set(key, value);
	  return this;
	}

	// Add methods to `Stack`.
	Stack.prototype.clear = stackClear;
	Stack.prototype['delete'] = stackDelete;
	Stack.prototype.get = stackGet;
	Stack.prototype.has = stackHas;
	Stack.prototype.set = stackSet;

	/**
	 * Creates an array of the enumerable property names of the array-like `value`.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @param {boolean} inherited Specify returning inherited property names.
	 * @returns {Array} Returns the array of property names.
	 */
	function arrayLikeKeys(value, inherited) {
	  // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
	  // Safari 9 makes `arguments.length` enumerable in strict mode.
	  var result = isArray(value) || isArguments(value) ? baseTimes(value.length, String) : [];

	  var length = result.length,
	      skipIndexes = !!length;

	  for (var key in value) {
	    if ((inherited || hasOwnProperty.call(value, key)) && !(skipIndexes && (key == 'length' || isIndex(key, length)))) {
	      result.push(key);
	    }
	  }
	  return result;
	}

	/**
	 * Gets the index at which the `key` is found in `array` of key-value pairs.
	 *
	 * @private
	 * @param {Array} array The array to inspect.
	 * @param {*} key The key to search for.
	 * @returns {number} Returns the index of the matched value, else `-1`.
	 */
	function assocIndexOf(array, key) {
	  var length = array.length;
	  while (length--) {
	    if (eq(array[length][0], key)) {
	      return length;
	    }
	  }
	  return -1;
	}

	/**
	 * The base implementation of `_.forEach` without support for iteratee shorthands.
	 *
	 * @private
	 * @param {Array|Object} collection The collection to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array|Object} Returns `collection`.
	 */
	var baseEach = createBaseEach(baseForOwn);

	/**
	 * The base implementation of `baseForOwn` which iterates over `object`
	 * properties returned by `keysFunc` and invokes `iteratee` for each property.
	 * Iteratee functions may exit iteration early by explicitly returning `false`.
	 *
	 * @private
	 * @param {Object} object The object to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @param {Function} keysFunc The function to get the keys of `object`.
	 * @returns {Object} Returns `object`.
	 */
	var baseFor = createBaseFor();

	/**
	 * The base implementation of `_.forOwn` without support for iteratee shorthands.
	 *
	 * @private
	 * @param {Object} object The object to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Object} Returns `object`.
	 */
	function baseForOwn(object, iteratee) {
	  return object && baseFor(object, iteratee, keys);
	}

	/**
	 * The base implementation of `_.get` without support for default values.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {Array|string} path The path of the property to get.
	 * @returns {*} Returns the resolved value.
	 */
	function baseGet(object, path) {
	  path = isKey(path, object) ? [path] : castPath(path);

	  var index = 0,
	      length = path.length;

	  while (object != null && index < length) {
	    object = object[toKey(path[index++])];
	  }
	  return index && index == length ? object : undefined;
	}

	/**
	 * The base implementation of `getTag`.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @returns {string} Returns the `toStringTag`.
	 */
	function baseGetTag(value) {
	  return objectToString.call(value);
	}

	/**
	 * The base implementation of `_.hasIn` without support for deep paths.
	 *
	 * @private
	 * @param {Object} [object] The object to query.
	 * @param {Array|string} key The key to check.
	 * @returns {boolean} Returns `true` if `key` exists, else `false`.
	 */
	function baseHasIn(object, key) {
	  return object != null && key in Object(object);
	}

	/**
	 * The base implementation of `_.isEqual` which supports partial comparisons
	 * and tracks traversed objects.
	 *
	 * @private
	 * @param {*} value The value to compare.
	 * @param {*} other The other value to compare.
	 * @param {Function} [customizer] The function to customize comparisons.
	 * @param {boolean} [bitmask] The bitmask of comparison flags.
	 *  The bitmask may be composed of the following flags:
	 *     1 - Unordered comparison
	 *     2 - Partial comparison
	 * @param {Object} [stack] Tracks traversed `value` and `other` objects.
	 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
	 */
	function baseIsEqual(value, other, customizer, bitmask, stack) {
	  if (value === other) {
	    return true;
	  }
	  if (value == null || other == null || !isObject(value) && !isObjectLike(other)) {
	    return value !== value && other !== other;
	  }
	  return baseIsEqualDeep(value, other, baseIsEqual, customizer, bitmask, stack);
	}

	/**
	 * A specialized version of `baseIsEqual` for arrays and objects which performs
	 * deep comparisons and tracks traversed objects enabling objects with circular
	 * references to be compared.
	 *
	 * @private
	 * @param {Object} object The object to compare.
	 * @param {Object} other The other object to compare.
	 * @param {Function} equalFunc The function to determine equivalents of values.
	 * @param {Function} [customizer] The function to customize comparisons.
	 * @param {number} [bitmask] The bitmask of comparison flags. See `baseIsEqual`
	 *  for more details.
	 * @param {Object} [stack] Tracks traversed `object` and `other` objects.
	 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	 */
	function baseIsEqualDeep(object, other, equalFunc, customizer, bitmask, stack) {
	  var objIsArr = isArray(object),
	      othIsArr = isArray(other),
	      objTag = arrayTag,
	      othTag = arrayTag;

	  if (!objIsArr) {
	    objTag = getTag(object);
	    objTag = objTag == argsTag ? objectTag : objTag;
	  }
	  if (!othIsArr) {
	    othTag = getTag(other);
	    othTag = othTag == argsTag ? objectTag : othTag;
	  }
	  var objIsObj = objTag == objectTag && !isHostObject(object),
	      othIsObj = othTag == objectTag && !isHostObject(other),
	      isSameTag = objTag == othTag;

	  if (isSameTag && !objIsObj) {
	    stack || (stack = new Stack());
	    return objIsArr || isTypedArray(object) ? equalArrays(object, other, equalFunc, customizer, bitmask, stack) : equalByTag(object, other, objTag, equalFunc, customizer, bitmask, stack);
	  }
	  if (!(bitmask & PARTIAL_COMPARE_FLAG)) {
	    var objIsWrapped = objIsObj && hasOwnProperty.call(object, '__wrapped__'),
	        othIsWrapped = othIsObj && hasOwnProperty.call(other, '__wrapped__');

	    if (objIsWrapped || othIsWrapped) {
	      var objUnwrapped = objIsWrapped ? object.value() : object,
	          othUnwrapped = othIsWrapped ? other.value() : other;

	      stack || (stack = new Stack());
	      return equalFunc(objUnwrapped, othUnwrapped, customizer, bitmask, stack);
	    }
	  }
	  if (!isSameTag) {
	    return false;
	  }
	  stack || (stack = new Stack());
	  return equalObjects(object, other, equalFunc, customizer, bitmask, stack);
	}

	/**
	 * The base implementation of `_.isMatch` without support for iteratee shorthands.
	 *
	 * @private
	 * @param {Object} object The object to inspect.
	 * @param {Object} source The object of property values to match.
	 * @param {Array} matchData The property names, values, and compare flags to match.
	 * @param {Function} [customizer] The function to customize comparisons.
	 * @returns {boolean} Returns `true` if `object` is a match, else `false`.
	 */
	function baseIsMatch(object, source, matchData, customizer) {
	  var index = matchData.length,
	      length = index,
	      noCustomizer = !customizer;

	  if (object == null) {
	    return !length;
	  }
	  object = Object(object);
	  while (index--) {
	    var data = matchData[index];
	    if (noCustomizer && data[2] ? data[1] !== object[data[0]] : !(data[0] in object)) {
	      return false;
	    }
	  }
	  while (++index < length) {
	    data = matchData[index];
	    var key = data[0],
	        objValue = object[key],
	        srcValue = data[1];

	    if (noCustomizer && data[2]) {
	      if (objValue === undefined && !(key in object)) {
	        return false;
	      }
	    } else {
	      var stack = new Stack();
	      if (customizer) {
	        var result = customizer(objValue, srcValue, key, object, source, stack);
	      }
	      if (!(result === undefined ? baseIsEqual(srcValue, objValue, customizer, UNORDERED_COMPARE_FLAG | PARTIAL_COMPARE_FLAG, stack) : result)) {
	        return false;
	      }
	    }
	  }
	  return true;
	}

	/**
	 * The base implementation of `_.isNative` without bad shim checks.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a native function,
	 *  else `false`.
	 */
	function baseIsNative(value) {
	  if (!isObject(value) || isMasked(value)) {
	    return false;
	  }
	  var pattern = isFunction(value) || isHostObject(value) ? reIsNative : reIsHostCtor;
	  return pattern.test(toSource(value));
	}

	/**
	 * The base implementation of `_.isTypedArray` without Node.js optimizations.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
	 */
	function baseIsTypedArray(value) {
	  return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[objectToString.call(value)];
	}

	/**
	 * The base implementation of `_.iteratee`.
	 *
	 * @private
	 * @param {*} [value=_.identity] The value to convert to an iteratee.
	 * @returns {Function} Returns the iteratee.
	 */
	function baseIteratee(value) {
	  // Don't store the `typeof` result in a variable to avoid a JIT bug in Safari 9.
	  // See https://bugs.webkit.org/show_bug.cgi?id=156034 for more details.
	  if (typeof value == 'function') {
	    return value;
	  }
	  if (value == null) {
	    return identity;
	  }
	  if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) == 'object') {
	    return isArray(value) ? baseMatchesProperty(value[0], value[1]) : baseMatches(value);
	  }
	  return property(value);
	}

	/**
	 * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 */
	function baseKeys(object) {
	  if (!isPrototype(object)) {
	    return nativeKeys(object);
	  }
	  var result = [];
	  for (var key in Object(object)) {
	    if (hasOwnProperty.call(object, key) && key != 'constructor') {
	      result.push(key);
	    }
	  }
	  return result;
	}

	/**
	 * The base implementation of `_.matches` which doesn't clone `source`.
	 *
	 * @private
	 * @param {Object} source The object of property values to match.
	 * @returns {Function} Returns the new spec function.
	 */
	function baseMatches(source) {
	  var matchData = getMatchData(source);
	  if (matchData.length == 1 && matchData[0][2]) {
	    return matchesStrictComparable(matchData[0][0], matchData[0][1]);
	  }
	  return function (object) {
	    return object === source || baseIsMatch(object, source, matchData);
	  };
	}

	/**
	 * The base implementation of `_.matchesProperty` which doesn't clone `srcValue`.
	 *
	 * @private
	 * @param {string} path The path of the property to get.
	 * @param {*} srcValue The value to match.
	 * @returns {Function} Returns the new spec function.
	 */
	function baseMatchesProperty(path, srcValue) {
	  if (isKey(path) && isStrictComparable(srcValue)) {
	    return matchesStrictComparable(toKey(path), srcValue);
	  }
	  return function (object) {
	    var objValue = get(object, path);
	    return objValue === undefined && objValue === srcValue ? hasIn(object, path) : baseIsEqual(srcValue, objValue, undefined, UNORDERED_COMPARE_FLAG | PARTIAL_COMPARE_FLAG);
	  };
	}

	/**
	 * A specialized version of `baseProperty` which supports deep paths.
	 *
	 * @private
	 * @param {Array|string} path The path of the property to get.
	 * @returns {Function} Returns the new accessor function.
	 */
	function basePropertyDeep(path) {
	  return function (object) {
	    return baseGet(object, path);
	  };
	}

	/**
	 * The base implementation of `_.some` without support for iteratee shorthands.
	 *
	 * @private
	 * @param {Array|Object} collection The collection to iterate over.
	 * @param {Function} predicate The function invoked per iteration.
	 * @returns {boolean} Returns `true` if any element passes the predicate check,
	 *  else `false`.
	 */
	function baseSome(collection, predicate) {
	  var result;

	  baseEach(collection, function (value, index, collection) {
	    result = predicate(value, index, collection);
	    return !result;
	  });
	  return !!result;
	}

	/**
	 * The base implementation of `_.toString` which doesn't convert nullish
	 * values to empty strings.
	 *
	 * @private
	 * @param {*} value The value to process.
	 * @returns {string} Returns the string.
	 */
	function baseToString(value) {
	  // Exit early for strings to avoid a performance hit in some environments.
	  if (typeof value == 'string') {
	    return value;
	  }
	  if (isSymbol(value)) {
	    return symbolToString ? symbolToString.call(value) : '';
	  }
	  var result = value + '';
	  return result == '0' && 1 / value == -INFINITY ? '-0' : result;
	}

	/**
	 * Casts `value` to a path array if it's not one.
	 *
	 * @private
	 * @param {*} value The value to inspect.
	 * @returns {Array} Returns the cast property path array.
	 */
	function castPath(value) {
	  return isArray(value) ? value : stringToPath(value);
	}

	/**
	 * Creates a `baseEach` or `baseEachRight` function.
	 *
	 * @private
	 * @param {Function} eachFunc The function to iterate over a collection.
	 * @param {boolean} [fromRight] Specify iterating from right to left.
	 * @returns {Function} Returns the new base function.
	 */
	function createBaseEach(eachFunc, fromRight) {
	  return function (collection, iteratee) {
	    if (collection == null) {
	      return collection;
	    }
	    if (!isArrayLike(collection)) {
	      return eachFunc(collection, iteratee);
	    }
	    var length = collection.length,
	        index = fromRight ? length : -1,
	        iterable = Object(collection);

	    while (fromRight ? index-- : ++index < length) {
	      if (iteratee(iterable[index], index, iterable) === false) {
	        break;
	      }
	    }
	    return collection;
	  };
	}

	/**
	 * Creates a base function for methods like `_.forIn` and `_.forOwn`.
	 *
	 * @private
	 * @param {boolean} [fromRight] Specify iterating from right to left.
	 * @returns {Function} Returns the new base function.
	 */
	function createBaseFor(fromRight) {
	  return function (object, iteratee, keysFunc) {
	    var index = -1,
	        iterable = Object(object),
	        props = keysFunc(object),
	        length = props.length;

	    while (length--) {
	      var key = props[fromRight ? length : ++index];
	      if (iteratee(iterable[key], key, iterable) === false) {
	        break;
	      }
	    }
	    return object;
	  };
	}

	/**
	 * A specialized version of `baseIsEqualDeep` for arrays with support for
	 * partial deep comparisons.
	 *
	 * @private
	 * @param {Array} array The array to compare.
	 * @param {Array} other The other array to compare.
	 * @param {Function} equalFunc The function to determine equivalents of values.
	 * @param {Function} customizer The function to customize comparisons.
	 * @param {number} bitmask The bitmask of comparison flags. See `baseIsEqual`
	 *  for more details.
	 * @param {Object} stack Tracks traversed `array` and `other` objects.
	 * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
	 */
	function equalArrays(array, other, equalFunc, customizer, bitmask, stack) {
	  var isPartial = bitmask & PARTIAL_COMPARE_FLAG,
	      arrLength = array.length,
	      othLength = other.length;

	  if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
	    return false;
	  }
	  // Assume cyclic values are equal.
	  var stacked = stack.get(array);
	  if (stacked && stack.get(other)) {
	    return stacked == other;
	  }
	  var index = -1,
	      result = true,
	      seen = bitmask & UNORDERED_COMPARE_FLAG ? new SetCache() : undefined;

	  stack.set(array, other);
	  stack.set(other, array);

	  // Ignore non-index properties.
	  while (++index < arrLength) {
	    var arrValue = array[index],
	        othValue = other[index];

	    if (customizer) {
	      var compared = isPartial ? customizer(othValue, arrValue, index, other, array, stack) : customizer(arrValue, othValue, index, array, other, stack);
	    }
	    if (compared !== undefined) {
	      if (compared) {
	        continue;
	      }
	      result = false;
	      break;
	    }
	    // Recursively compare arrays (susceptible to call stack limits).
	    if (seen) {
	      if (!arraySome(other, function (othValue, othIndex) {
	        if (!seen.has(othIndex) && (arrValue === othValue || equalFunc(arrValue, othValue, customizer, bitmask, stack))) {
	          return seen.add(othIndex);
	        }
	      })) {
	        result = false;
	        break;
	      }
	    } else if (!(arrValue === othValue || equalFunc(arrValue, othValue, customizer, bitmask, stack))) {
	      result = false;
	      break;
	    }
	  }
	  stack['delete'](array);
	  stack['delete'](other);
	  return result;
	}

	/**
	 * A specialized version of `baseIsEqualDeep` for comparing objects of
	 * the same `toStringTag`.
	 *
	 * **Note:** This function only supports comparing values with tags of
	 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
	 *
	 * @private
	 * @param {Object} object The object to compare.
	 * @param {Object} other The other object to compare.
	 * @param {string} tag The `toStringTag` of the objects to compare.
	 * @param {Function} equalFunc The function to determine equivalents of values.
	 * @param {Function} customizer The function to customize comparisons.
	 * @param {number} bitmask The bitmask of comparison flags. See `baseIsEqual`
	 *  for more details.
	 * @param {Object} stack Tracks traversed `object` and `other` objects.
	 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	 */
	function equalByTag(object, other, tag, equalFunc, customizer, bitmask, stack) {
	  switch (tag) {
	    case dataViewTag:
	      if (object.byteLength != other.byteLength || object.byteOffset != other.byteOffset) {
	        return false;
	      }
	      object = object.buffer;
	      other = other.buffer;

	    case arrayBufferTag:
	      if (object.byteLength != other.byteLength || !equalFunc(new Uint8Array(object), new Uint8Array(other))) {
	        return false;
	      }
	      return true;

	    case boolTag:
	    case dateTag:
	    case numberTag:
	      // Coerce booleans to `1` or `0` and dates to milliseconds.
	      // Invalid dates are coerced to `NaN`.
	      return eq(+object, +other);

	    case errorTag:
	      return object.name == other.name && object.message == other.message;

	    case regexpTag:
	    case stringTag:
	      // Coerce regexes to strings and treat strings, primitives and objects,
	      // as equal. See http://www.ecma-international.org/ecma-262/7.0/#sec-regexp.prototype.tostring
	      // for more details.
	      return object == other + '';

	    case mapTag:
	      var convert = mapToArray;

	    case setTag:
	      var isPartial = bitmask & PARTIAL_COMPARE_FLAG;
	      convert || (convert = setToArray);

	      if (object.size != other.size && !isPartial) {
	        return false;
	      }
	      // Assume cyclic values are equal.
	      var stacked = stack.get(object);
	      if (stacked) {
	        return stacked == other;
	      }
	      bitmask |= UNORDERED_COMPARE_FLAG;

	      // Recursively compare objects (susceptible to call stack limits).
	      stack.set(object, other);
	      var result = equalArrays(convert(object), convert(other), equalFunc, customizer, bitmask, stack);
	      stack['delete'](object);
	      return result;

	    case symbolTag:
	      if (symbolValueOf) {
	        return symbolValueOf.call(object) == symbolValueOf.call(other);
	      }
	  }
	  return false;
	}

	/**
	 * A specialized version of `baseIsEqualDeep` for objects with support for
	 * partial deep comparisons.
	 *
	 * @private
	 * @param {Object} object The object to compare.
	 * @param {Object} other The other object to compare.
	 * @param {Function} equalFunc The function to determine equivalents of values.
	 * @param {Function} customizer The function to customize comparisons.
	 * @param {number} bitmask The bitmask of comparison flags. See `baseIsEqual`
	 *  for more details.
	 * @param {Object} stack Tracks traversed `object` and `other` objects.
	 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	 */
	function equalObjects(object, other, equalFunc, customizer, bitmask, stack) {
	  var isPartial = bitmask & PARTIAL_COMPARE_FLAG,
	      objProps = keys(object),
	      objLength = objProps.length,
	      othProps = keys(other),
	      othLength = othProps.length;

	  if (objLength != othLength && !isPartial) {
	    return false;
	  }
	  var index = objLength;
	  while (index--) {
	    var key = objProps[index];
	    if (!(isPartial ? key in other : hasOwnProperty.call(other, key))) {
	      return false;
	    }
	  }
	  // Assume cyclic values are equal.
	  var stacked = stack.get(object);
	  if (stacked && stack.get(other)) {
	    return stacked == other;
	  }
	  var result = true;
	  stack.set(object, other);
	  stack.set(other, object);

	  var skipCtor = isPartial;
	  while (++index < objLength) {
	    key = objProps[index];
	    var objValue = object[key],
	        othValue = other[key];

	    if (customizer) {
	      var compared = isPartial ? customizer(othValue, objValue, key, other, object, stack) : customizer(objValue, othValue, key, object, other, stack);
	    }
	    // Recursively compare objects (susceptible to call stack limits).
	    if (!(compared === undefined ? objValue === othValue || equalFunc(objValue, othValue, customizer, bitmask, stack) : compared)) {
	      result = false;
	      break;
	    }
	    skipCtor || (skipCtor = key == 'constructor');
	  }
	  if (result && !skipCtor) {
	    var objCtor = object.constructor,
	        othCtor = other.constructor;

	    // Non `Object` object instances with different constructors are not equal.
	    if (objCtor != othCtor && 'constructor' in object && 'constructor' in other && !(typeof objCtor == 'function' && objCtor instanceof objCtor && typeof othCtor == 'function' && othCtor instanceof othCtor)) {
	      result = false;
	    }
	  }
	  stack['delete'](object);
	  stack['delete'](other);
	  return result;
	}

	/**
	 * Gets the data for `map`.
	 *
	 * @private
	 * @param {Object} map The map to query.
	 * @param {string} key The reference key.
	 * @returns {*} Returns the map data.
	 */
	function getMapData(map, key) {
	  var data = map.__data__;
	  return isKeyable(key) ? data[typeof key == 'string' ? 'string' : 'hash'] : data.map;
	}

	/**
	 * Gets the property names, values, and compare flags of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the match data of `object`.
	 */
	function getMatchData(object) {
	  var result = keys(object),
	      length = result.length;

	  while (length--) {
	    var key = result[length],
	        value = object[key];

	    result[length] = [key, value, isStrictComparable(value)];
	  }
	  return result;
	}

	/**
	 * Gets the native function at `key` of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {string} key The key of the method to get.
	 * @returns {*} Returns the function if it's native, else `undefined`.
	 */
	function getNative(object, key) {
	  var value = getValue(object, key);
	  return baseIsNative(value) ? value : undefined;
	}

	/**
	 * Gets the `toStringTag` of `value`.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @returns {string} Returns the `toStringTag`.
	 */
	var getTag = baseGetTag;

	// Fallback for data views, maps, sets, and weak maps in IE 11,
	// for data views in Edge < 14, and promises in Node.js.
	if (DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag || Map && getTag(new Map()) != mapTag || Promise && getTag(Promise.resolve()) != promiseTag || Set && getTag(new Set()) != setTag || WeakMap && getTag(new WeakMap()) != weakMapTag) {
	  getTag = function getTag(value) {
	    var result = objectToString.call(value),
	        Ctor = result == objectTag ? value.constructor : undefined,
	        ctorString = Ctor ? toSource(Ctor) : undefined;

	    if (ctorString) {
	      switch (ctorString) {
	        case dataViewCtorString:
	          return dataViewTag;
	        case mapCtorString:
	          return mapTag;
	        case promiseCtorString:
	          return promiseTag;
	        case setCtorString:
	          return setTag;
	        case weakMapCtorString:
	          return weakMapTag;
	      }
	    }
	    return result;
	  };
	}

	/**
	 * Checks if `path` exists on `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {Array|string} path The path to check.
	 * @param {Function} hasFunc The function to check properties.
	 * @returns {boolean} Returns `true` if `path` exists, else `false`.
	 */
	function hasPath(object, path, hasFunc) {
	  path = isKey(path, object) ? [path] : castPath(path);

	  var result,
	      index = -1,
	      length = path.length;

	  while (++index < length) {
	    var key = toKey(path[index]);
	    if (!(result = object != null && hasFunc(object, key))) {
	      break;
	    }
	    object = object[key];
	  }
	  if (result) {
	    return result;
	  }
	  var length = object ? object.length : 0;
	  return !!length && isLength(length) && isIndex(key, length) && (isArray(object) || isArguments(object));
	}

	/**
	 * Checks if `value` is a valid array-like index.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
	 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
	 */
	function isIndex(value, length) {
	  length = length == null ? MAX_SAFE_INTEGER : length;
	  return !!length && (typeof value == 'number' || reIsUint.test(value)) && value > -1 && value % 1 == 0 && value < length;
	}

	/**
	 * Checks if the given arguments are from an iteratee call.
	 *
	 * @private
	 * @param {*} value The potential iteratee value argument.
	 * @param {*} index The potential iteratee index or key argument.
	 * @param {*} object The potential iteratee object argument.
	 * @returns {boolean} Returns `true` if the arguments are from an iteratee call,
	 *  else `false`.
	 */
	function isIterateeCall(value, index, object) {
	  if (!isObject(object)) {
	    return false;
	  }
	  var type = typeof index === 'undefined' ? 'undefined' : _typeof(index);
	  if (type == 'number' ? isArrayLike(object) && isIndex(index, object.length) : type == 'string' && index in object) {
	    return eq(object[index], value);
	  }
	  return false;
	}

	/**
	 * Checks if `value` is a property name and not a property path.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @param {Object} [object] The object to query keys on.
	 * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
	 */
	function isKey(value, object) {
	  if (isArray(value)) {
	    return false;
	  }
	  var type = typeof value === 'undefined' ? 'undefined' : _typeof(value);
	  if (type == 'number' || type == 'symbol' || type == 'boolean' || value == null || isSymbol(value)) {
	    return true;
	  }
	  return reIsPlainProp.test(value) || !reIsDeepProp.test(value) || object != null && value in Object(object);
	}

	/**
	 * Checks if `value` is suitable for use as unique object key.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
	 */
	function isKeyable(value) {
	  var type = typeof value === 'undefined' ? 'undefined' : _typeof(value);
	  return type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean' ? value !== '__proto__' : value === null;
	}

	/**
	 * Checks if `func` has its source masked.
	 *
	 * @private
	 * @param {Function} func The function to check.
	 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
	 */
	function isMasked(func) {
	  return !!maskSrcKey && maskSrcKey in func;
	}

	/**
	 * Checks if `value` is likely a prototype object.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
	 */
	function isPrototype(value) {
	  var Ctor = value && value.constructor,
	      proto = typeof Ctor == 'function' && Ctor.prototype || objectProto;

	  return value === proto;
	}

	/**
	 * Checks if `value` is suitable for strict equality comparisons, i.e. `===`.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` if suitable for strict
	 *  equality comparisons, else `false`.
	 */
	function isStrictComparable(value) {
	  return value === value && !isObject(value);
	}

	/**
	 * A specialized version of `matchesProperty` for source values suitable
	 * for strict equality comparisons, i.e. `===`.
	 *
	 * @private
	 * @param {string} key The key of the property to get.
	 * @param {*} srcValue The value to match.
	 * @returns {Function} Returns the new spec function.
	 */
	function matchesStrictComparable(key, srcValue) {
	  return function (object) {
	    if (object == null) {
	      return false;
	    }
	    return object[key] === srcValue && (srcValue !== undefined || key in Object(object));
	  };
	}

	/**
	 * Converts `string` to a property path array.
	 *
	 * @private
	 * @param {string} string The string to convert.
	 * @returns {Array} Returns the property path array.
	 */
	var stringToPath = memoize(function (string) {
	  string = toString(string);

	  var result = [];
	  if (reLeadingDot.test(string)) {
	    result.push('');
	  }
	  string.replace(rePropName, function (match, number, quote, string) {
	    result.push(quote ? string.replace(reEscapeChar, '$1') : number || match);
	  });
	  return result;
	});

	/**
	 * Converts `value` to a string key if it's not a string or symbol.
	 *
	 * @private
	 * @param {*} value The value to inspect.
	 * @returns {string|symbol} Returns the key.
	 */
	function toKey(value) {
	  if (typeof value == 'string' || isSymbol(value)) {
	    return value;
	  }
	  var result = value + '';
	  return result == '0' && 1 / value == -INFINITY ? '-0' : result;
	}

	/**
	 * Converts `func` to its source code.
	 *
	 * @private
	 * @param {Function} func The function to process.
	 * @returns {string} Returns the source code.
	 */
	function toSource(func) {
	  if (func != null) {
	    try {
	      return funcToString.call(func);
	    } catch (e) {}
	    try {
	      return func + '';
	    } catch (e) {}
	  }
	  return '';
	}

	/**
	 * Checks if `predicate` returns truthy for **any** element of `collection`.
	 * Iteration is stopped once `predicate` returns truthy. The predicate is
	 * invoked with three arguments: (value, index|key, collection).
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Collection
	 * @param {Array|Object} collection The collection to iterate over.
	 * @param {Function} [predicate=_.identity] The function invoked per iteration.
	 * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
	 * @returns {boolean} Returns `true` if any element passes the predicate check,
	 *  else `false`.
	 * @example
	 *
	 * _.some([null, 0, 'yes', false], Boolean);
	 * // => true
	 *
	 * var users = [
	 *   { 'user': 'barney', 'active': true },
	 *   { 'user': 'fred',   'active': false }
	 * ];
	 *
	 * // The `_.matches` iteratee shorthand.
	 * _.some(users, { 'user': 'barney', 'active': false });
	 * // => false
	 *
	 * // The `_.matchesProperty` iteratee shorthand.
	 * _.some(users, ['active', false]);
	 * // => true
	 *
	 * // The `_.property` iteratee shorthand.
	 * _.some(users, 'active');
	 * // => true
	 */
	function some(collection, predicate, guard) {
	  var func = isArray(collection) ? arraySome : baseSome;
	  if (guard && isIterateeCall(collection, predicate, guard)) {
	    predicate = undefined;
	  }
	  return func(collection, baseIteratee(predicate, 3));
	}

	/**
	 * Creates a function that memoizes the result of `func`. If `resolver` is
	 * provided, it determines the cache key for storing the result based on the
	 * arguments provided to the memoized function. By default, the first argument
	 * provided to the memoized function is used as the map cache key. The `func`
	 * is invoked with the `this` binding of the memoized function.
	 *
	 * **Note:** The cache is exposed as the `cache` property on the memoized
	 * function. Its creation may be customized by replacing the `_.memoize.Cache`
	 * constructor with one whose instances implement the
	 * [`Map`](http://ecma-international.org/ecma-262/7.0/#sec-properties-of-the-map-prototype-object)
	 * method interface of `delete`, `get`, `has`, and `set`.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Function
	 * @param {Function} func The function to have its output memoized.
	 * @param {Function} [resolver] The function to resolve the cache key.
	 * @returns {Function} Returns the new memoized function.
	 * @example
	 *
	 * var object = { 'a': 1, 'b': 2 };
	 * var other = { 'c': 3, 'd': 4 };
	 *
	 * var values = _.memoize(_.values);
	 * values(object);
	 * // => [1, 2]
	 *
	 * values(other);
	 * // => [3, 4]
	 *
	 * object.a = 2;
	 * values(object);
	 * // => [1, 2]
	 *
	 * // Modify the result cache.
	 * values.cache.set(object, ['a', 'b']);
	 * values(object);
	 * // => ['a', 'b']
	 *
	 * // Replace `_.memoize.Cache`.
	 * _.memoize.Cache = WeakMap;
	 */
	function memoize(func, resolver) {
	  if (typeof func != 'function' || resolver && typeof resolver != 'function') {
	    throw new TypeError(FUNC_ERROR_TEXT);
	  }
	  var memoized = function memoized() {
	    var args = arguments,
	        key = resolver ? resolver.apply(this, args) : args[0],
	        cache = memoized.cache;

	    if (cache.has(key)) {
	      return cache.get(key);
	    }
	    var result = func.apply(this, args);
	    memoized.cache = cache.set(key, result);
	    return result;
	  };
	  memoized.cache = new (memoize.Cache || MapCache)();
	  return memoized;
	}

	// Assign cache to `_.memoize`.
	memoize.Cache = MapCache;

	/**
	 * Performs a
	 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
	 * comparison between two values to determine if they are equivalent.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to compare.
	 * @param {*} other The other value to compare.
	 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
	 * @example
	 *
	 * var object = { 'a': 1 };
	 * var other = { 'a': 1 };
	 *
	 * _.eq(object, object);
	 * // => true
	 *
	 * _.eq(object, other);
	 * // => false
	 *
	 * _.eq('a', 'a');
	 * // => true
	 *
	 * _.eq('a', Object('a'));
	 * // => false
	 *
	 * _.eq(NaN, NaN);
	 * // => true
	 */
	function eq(value, other) {
	  return value === other || value !== value && other !== other;
	}

	/**
	 * Checks if `value` is likely an `arguments` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
	 *  else `false`.
	 * @example
	 *
	 * _.isArguments(function() { return arguments; }());
	 * // => true
	 *
	 * _.isArguments([1, 2, 3]);
	 * // => false
	 */
	function isArguments(value) {
	  // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
	  return isArrayLikeObject(value) && hasOwnProperty.call(value, 'callee') && (!propertyIsEnumerable.call(value, 'callee') || objectToString.call(value) == argsTag);
	}

	/**
	 * Checks if `value` is classified as an `Array` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
	 * @example
	 *
	 * _.isArray([1, 2, 3]);
	 * // => true
	 *
	 * _.isArray(document.body.children);
	 * // => false
	 *
	 * _.isArray('abc');
	 * // => false
	 *
	 * _.isArray(_.noop);
	 * // => false
	 */
	var isArray = Array.isArray;

	/**
	 * Checks if `value` is array-like. A value is considered array-like if it's
	 * not a function and has a `value.length` that's an integer greater than or
	 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
	 * @example
	 *
	 * _.isArrayLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isArrayLike(document.body.children);
	 * // => true
	 *
	 * _.isArrayLike('abc');
	 * // => true
	 *
	 * _.isArrayLike(_.noop);
	 * // => false
	 */
	function isArrayLike(value) {
	  return value != null && isLength(value.length) && !isFunction(value);
	}

	/**
	 * This method is like `_.isArrayLike` except that it also checks if `value`
	 * is an object.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an array-like object,
	 *  else `false`.
	 * @example
	 *
	 * _.isArrayLikeObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isArrayLikeObject(document.body.children);
	 * // => true
	 *
	 * _.isArrayLikeObject('abc');
	 * // => false
	 *
	 * _.isArrayLikeObject(_.noop);
	 * // => false
	 */
	function isArrayLikeObject(value) {
	  return isObjectLike(value) && isArrayLike(value);
	}

	/**
	 * Checks if `value` is classified as a `Function` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
	 * @example
	 *
	 * _.isFunction(_);
	 * // => true
	 *
	 * _.isFunction(/abc/);
	 * // => false
	 */
	function isFunction(value) {
	  // The use of `Object#toString` avoids issues with the `typeof` operator
	  // in Safari 8-9 which returns 'object' for typed array and other constructors.
	  var tag = isObject(value) ? objectToString.call(value) : '';
	  return tag == funcTag || tag == genTag;
	}

	/**
	 * Checks if `value` is a valid array-like length.
	 *
	 * **Note:** This method is loosely based on
	 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
	 * @example
	 *
	 * _.isLength(3);
	 * // => true
	 *
	 * _.isLength(Number.MIN_VALUE);
	 * // => false
	 *
	 * _.isLength(Infinity);
	 * // => false
	 *
	 * _.isLength('3');
	 * // => false
	 */
	function isLength(value) {
	  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
	}

	/**
	 * Checks if `value` is the
	 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
	 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(_.noop);
	 * // => true
	 *
	 * _.isObject(null);
	 * // => false
	 */
	function isObject(value) {
	  var type = typeof value === 'undefined' ? 'undefined' : _typeof(value);
	  return !!value && (type == 'object' || type == 'function');
	}

	/**
	 * Checks if `value` is object-like. A value is object-like if it's not `null`
	 * and has a `typeof` result of "object".
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 * @example
	 *
	 * _.isObjectLike({});
	 * // => true
	 *
	 * _.isObjectLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isObjectLike(_.noop);
	 * // => false
	 *
	 * _.isObjectLike(null);
	 * // => false
	 */
	function isObjectLike(value) {
	  return !!value && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) == 'object';
	}

	/**
	 * Checks if `value` is classified as a `Symbol` primitive or object.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
	 * @example
	 *
	 * _.isSymbol(Symbol.iterator);
	 * // => true
	 *
	 * _.isSymbol('abc');
	 * // => false
	 */
	function isSymbol(value) {
	  return (typeof value === 'undefined' ? 'undefined' : _typeof(value)) == 'symbol' || isObjectLike(value) && objectToString.call(value) == symbolTag;
	}

	/**
	 * Checks if `value` is classified as a typed array.
	 *
	 * @static
	 * @memberOf _
	 * @since 3.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
	 * @example
	 *
	 * _.isTypedArray(new Uint8Array);
	 * // => true
	 *
	 * _.isTypedArray([]);
	 * // => false
	 */
	var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;

	/**
	 * Converts `value` to a string. An empty string is returned for `null`
	 * and `undefined` values. The sign of `-0` is preserved.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to process.
	 * @returns {string} Returns the string.
	 * @example
	 *
	 * _.toString(null);
	 * // => ''
	 *
	 * _.toString(-0);
	 * // => '-0'
	 *
	 * _.toString([1, 2, 3]);
	 * // => '1,2,3'
	 */
	function toString(value) {
	  return value == null ? '' : baseToString(value);
	}

	/**
	 * Gets the value at `path` of `object`. If the resolved value is
	 * `undefined`, the `defaultValue` is returned in its place.
	 *
	 * @static
	 * @memberOf _
	 * @since 3.7.0
	 * @category Object
	 * @param {Object} object The object to query.
	 * @param {Array|string} path The path of the property to get.
	 * @param {*} [defaultValue] The value returned for `undefined` resolved values.
	 * @returns {*} Returns the resolved value.
	 * @example
	 *
	 * var object = { 'a': [{ 'b': { 'c': 3 } }] };
	 *
	 * _.get(object, 'a[0].b.c');
	 * // => 3
	 *
	 * _.get(object, ['a', '0', 'b', 'c']);
	 * // => 3
	 *
	 * _.get(object, 'a.b.c', 'default');
	 * // => 'default'
	 */
	function get(object, path, defaultValue) {
	  var result = object == null ? undefined : baseGet(object, path);
	  return result === undefined ? defaultValue : result;
	}

	/**
	 * Checks if `path` is a direct or inherited property of `object`.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Object
	 * @param {Object} object The object to query.
	 * @param {Array|string} path The path to check.
	 * @returns {boolean} Returns `true` if `path` exists, else `false`.
	 * @example
	 *
	 * var object = _.create({ 'a': _.create({ 'b': 2 }) });
	 *
	 * _.hasIn(object, 'a');
	 * // => true
	 *
	 * _.hasIn(object, 'a.b');
	 * // => true
	 *
	 * _.hasIn(object, ['a', 'b']);
	 * // => true
	 *
	 * _.hasIn(object, 'b');
	 * // => false
	 */
	function hasIn(object, path) {
	  return object != null && hasPath(object, path, baseHasIn);
	}

	/**
	 * Creates an array of the own enumerable property names of `object`.
	 *
	 * **Note:** Non-object values are coerced to objects. See the
	 * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
	 * for more details.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.keys(new Foo);
	 * // => ['a', 'b'] (iteration order is not guaranteed)
	 *
	 * _.keys('hi');
	 * // => ['0', '1']
	 */
	function keys(object) {
	  return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
	}

	/**
	 * This method returns the first argument it receives.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Util
	 * @param {*} value Any value.
	 * @returns {*} Returns `value`.
	 * @example
	 *
	 * var object = { 'a': 1 };
	 *
	 * console.log(_.identity(object) === object);
	 * // => true
	 */
	function identity(value) {
	  return value;
	}

	/**
	 * Creates a function that returns the value at `path` of a given object.
	 *
	 * @static
	 * @memberOf _
	 * @since 2.4.0
	 * @category Util
	 * @param {Array|string} path The path of the property to get.
	 * @returns {Function} Returns the new accessor function.
	 * @example
	 *
	 * var objects = [
	 *   { 'a': { 'b': 2 } },
	 *   { 'a': { 'b': 1 } }
	 * ];
	 *
	 * _.map(objects, _.property('a.b'));
	 * // => [2, 1]
	 *
	 * _.map(_.sortBy(objects, _.property(['a', 'b'])), 'a.b');
	 * // => [1, 2]
	 */
	function property(path) {
	  return isKey(path) ? baseProperty(toKey(path)) : basePropertyDeep(path);
	}

	module.exports = some;
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(43)(module)))

/***/ },
/* 42 */
/***/ function(module, exports) {

	'use strict';

	// shim for using process in browser
	var process = module.exports = {};

	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.

	var cachedSetTimeout;
	var cachedClearTimeout;

	function defaultSetTimout() {
	    throw new Error('setTimeout has not been defined');
	}
	function defaultClearTimeout() {
	    throw new Error('clearTimeout has not been defined');
	}
	(function () {
	    try {
	        if (typeof setTimeout === 'function') {
	            cachedSetTimeout = setTimeout;
	        } else {
	            cachedSetTimeout = defaultSetTimout;
	        }
	    } catch (e) {
	        cachedSetTimeout = defaultSetTimout;
	    }
	    try {
	        if (typeof clearTimeout === 'function') {
	            cachedClearTimeout = clearTimeout;
	        } else {
	            cachedClearTimeout = defaultClearTimeout;
	        }
	    } catch (e) {
	        cachedClearTimeout = defaultClearTimeout;
	    }
	})();
	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
	        return setTimeout(fun, 0);
	    }
	    // if setTimeout wasn't available but was latter defined
	    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
	        cachedSetTimeout = setTimeout;
	        return setTimeout(fun, 0);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedSetTimeout(fun, 0);
	    } catch (e) {
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch (e) {
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	            return cachedSetTimeout.call(this, fun, 0);
	        }
	    }
	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        //normal enviroments in sane situations
	        return clearTimeout(marker);
	    }
	    // if clearTimeout wasn't available but was latter defined
	    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
	        cachedClearTimeout = clearTimeout;
	        return clearTimeout(marker);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedClearTimeout(marker);
	    } catch (e) {
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e) {
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	            return cachedClearTimeout.call(this, marker);
	        }
	    }
	}
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = runTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while (len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    runClearTimeout(timeout);
	}

	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        runTimeout(drainQueue);
	    }
	};

	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	process.cwd = function () {
	    return '/';
	};
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function () {
	    return 0;
	};

/***/ },
/* 43 */
/***/ function(module, exports) {

	"use strict";

	module.exports = function (module) {
		if (!module.webpackPolyfill) {
			module.deprecate = function () {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	};

/***/ },
/* 44 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_44__;

/***/ }
/******/ ])))
});
;