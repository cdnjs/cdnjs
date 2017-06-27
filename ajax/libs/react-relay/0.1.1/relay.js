/**
 * Relay v0.1.1
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("React"));
	else if(typeof define === 'function' && define.amd)
		define(["React"], factory);
	else if(typeof exports === 'object')
		exports["Relay"] = factory(require("React"));
	else
		root["Relay"] = factory(root["React"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_53__) {
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

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule Relay
	 * @typechecks
	 * 
	 */

	'use strict';

	var _extends = __webpack_require__(11)['default'];

	var RelayDefaultNetworkLayer = __webpack_require__(137);
	var RelayPublic = __webpack_require__(145);

	// By default, assume that GraphQL is served at `/graphql` on the same domain.
	RelayPublic.injectNetworkLayer(new RelayDefaultNetworkLayer('/graphql'));

	module.exports = _extends({}, RelayPublic, {
	  // Expose the default network layer to allow convenient re-configuration.
	  DefaultNetworkLayer: RelayDefaultNetworkLayer
	});

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule invariant
	 */

	"use strict";

	/**
	 * Use invariant() to assert state which your program assumes to be true.
	 *
	 * Provide sprintf-style format (only %s is supported) and arguments
	 * to provide information about what broke and what you were
	 * expecting.
	 *
	 * The invariant message will be stripped in production, but the invariant
	 * will remain to ensure logic does not differ in production.
	 */

	var invariant = function invariant(condition, format, a, b, c, d, e, f) {
	  if (true) {
	    if (format === undefined) {
	      throw new Error('invariant requires an error message argument');
	    }
	  }

	  if (!condition) {
	    var error;
	    if (format === undefined) {
	      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
	    } else {
	      var args = [a, b, c, d, e, f];
	      var argIndex = 0;
	      error = new Error('Invariant Violation: ' + format.replace(/%s/g, function () {
	        return args[argIndex++];
	      }));
	    }

	    error.framesToPop = 1; // we don't care about invariant's own frame
	    throw error;
	  }
	};

	module.exports = invariant;

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";

	exports["default"] = function (instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	};

	exports.__esModule = true;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule RelayQuery
	 * 
	 * @typechecks
	 */

	'use strict';

	var _classCallCheck = __webpack_require__(2)['default'];

	var _inherits = __webpack_require__(6)['default'];

	var _extends = __webpack_require__(11)['default'];

	var GraphQL = __webpack_require__(18);
	var RelayConnectionInterface = __webpack_require__(9);
	var RelayFragmentReference = __webpack_require__(41);

	var RelayMetaRoute = __webpack_require__(26);
	var RelayRouteFragment = __webpack_require__(81);

	var areEqual = __webpack_require__(108);
	var callsFromGraphQL = __webpack_require__(60);
	var callsToGraphQL = __webpack_require__(82);
	var generateRQLFieldAlias = __webpack_require__(160);
	var getWeakIdForObject = __webpack_require__(88);
	var invariant = __webpack_require__(1);
	var printRelayQueryCall = __webpack_require__(45);
	var shallowEqual = __webpack_require__(71);
	var stableStringify = __webpack_require__(93);

	// TODO: replace once #6525923 is resolved

	// conditional field calls/values
	var IF = 'if';
	var UNLESS = 'unless';
	var TRUE = 'true';
	var FALSE = 'false';

	var QUERY_ID_PREFIX = 'q';
	var REF_PARAM_PREFIX = 'ref_';

	var _nextQueryID = 0;

	/**
	 * @internal
	 *
	 * Queries in Relay are represented as trees. Possible nodes include the root,
	 * fields, and fragments. Fields can have children, or they can be leaf nodes.
	 * Root and fragment nodes must always have children.
	 *
	 * `RelayQueryNode` provides access to information such as the field name,
	 * generated alias, sub-fields, and call values.
	 *
	 * Nodes are immutable; query modification is supported via `clone`:
	 *
	 * ```
	 * var next = prev.clone(prev.getChildren().filter(f => ...));
	 * ```
	 *
	 * Note: Mediating access to actual query nodes is necessary so that we can
	 * replace the current mutable GraphQL nodes with an immutable query
	 * representation. This class *must not* mutate the underlying `concreteNode`.
	 * Instead, use an instance variable (see `clone()`).
	 *
	 * TODO (#6937314): RelayQueryNode support for toJSON/fromJSON
	 */

	var RelayQueryNode = (function () {
	  RelayQueryNode.create = function create(concreteNode, route, variables) {
	    var node = createNode(concreteNode, route, variables);
	    !(node instanceof RelayQueryNode) ?  true ? invariant(false, 'RelayQueryNode.create(): Expected a node.') : invariant(false) : undefined;
	    return node;
	  };

	  /**
	   * Helper to construct a new root query with the given attributes and 'empty'
	   * route/variables.
	   */

	  RelayQueryNode.buildRoot = function buildRoot(rootCall, rootCallValue, children, metadata, name) {
	    var nextChildren = children ? children.filter(function (child) {
	      return !!child;
	    }) : [];
	    var concreteRoot = new GraphQL.Query(rootCall, rootCallValue || null, null, null, metadata, name);
	    var root = new RelayQueryRoot(concreteRoot, RelayMetaRoute.get('$RelayQuery'), {});
	    root.__children__ = nextChildren;
	    return root;
	  };

	  /**
	   * Helper to construct a new fragment with the given attributes and 'empty'
	   * route/variables.
	   */

	  RelayQueryNode.buildFragment = function buildFragment(name, type, children, metadata) {
	    var nextChildren = children ? children.filter(function (child) {
	      return !!child;
	    }) : [];
	    var concreteFragment = new GraphQL.QueryFragment(name, type, null, null, metadata);
	    var fragment = new RelayQueryFragment(concreteFragment, RelayMetaRoute.get('$RelayQuery'), {}, !!(metadata && metadata.isDeferred), !!(metadata && metadata.isReferenceFragment));
	    fragment.__children__ = nextChildren;
	    return fragment;
	  };

	  /**
	   * Helper to construct a new field with the given attributes and 'empty'
	   * route/variables.
	   */

	  RelayQueryNode.buildField = function buildField(fieldName, calls, children, metadata, alias) {
	    var nextChildren = children ? children.filter(function (child) {
	      return !!child;
	    }) : [];
	    var concreteField = new GraphQL.Field(fieldName, null, null, calls ? callsToGraphQL(calls) : null, alias, null, metadata);
	    var field = new RelayQueryField(concreteField, RelayMetaRoute.get('$RelayQuery'), {});
	    field.__children__ = nextChildren;
	    return field;
	  };

	  /**
	   * Helper to construct a new mutation with the given attributes and 'empty'
	   * route/variables.
	   */

	  RelayQueryNode.buildMutation = function buildMutation(mutationName, responseType, callName, children, metadata) {
	    var nextChildren = children ? children.filter(function (child) {
	      return !!child;
	    }) : [];
	    var concreteMutation = new GraphQL.Mutation(mutationName, responseType, new GraphQL.Callv(callName, new GraphQL.CallVariable('input')), null, null, metadata);
	    var mutation = new RelayQueryMutation(concreteMutation, RelayMetaRoute.get('$RelayQuery'), { input: '' });
	    mutation.__children__ = nextChildren;
	    return mutation;
	  };

	  RelayQueryNode.createFragment = function createFragment(concreteNode, route, variables, isDeferred) {
	    !GraphQL.isFragment(concreteNode) ?  true ? invariant(false, 'RelayQuery.createQuery(): Expected a concrete query fragment, got: %s', concreteNode) : invariant(false) : undefined;
	    return createMemoizedFragment(concreteNode, route, variables, !!isDeferred, false);
	  };

	  RelayQueryNode.createQuery = function createQuery(concreteNode, route, variables) {
	    !GraphQL.isQuery(concreteNode) ?  true ? invariant(false, 'RelayQuery.createQuery(): Expected a concrete query, got: %s', concreteNode) : invariant(false) : undefined;
	    return new RelayQueryRoot(concreteNode, route, variables);
	  };

	  /**
	   * @private
	   *
	   * Base class for all node types, must not be directly instantiated.
	   */

	  function RelayQueryNode(concreteNode, route, variables) {
	    _classCallCheck(this, RelayQueryNode);

	    !(this.constructor.name !== 'RelayQueryNode') ?  true ? invariant(false, 'RelayQueryNode: Abstract class cannot be instantiated.') : invariant(false) : undefined;
	    this.__concreteNode__ = concreteNode;
	    this.__route__ = route;
	    this.__variables__ = variables;

	    // lazily computed properties
	    this.__calls__ = null;
	    this.__children__ = null;
	    this.__fieldMap__ = null;
	    this.__hasDeferredDescendant__ = null;
	    this.__hasValidatedConnectionCalls__ = null;
	    this.__metadata__ = null;
	    this.__serializationKey__ = null;
	    this.__storageKey__ = null;

	    // TODO(#7161070) Remove this once `toGraphQL` is no longer needed.
	    this.__isConcreteNodeCached__ = false;
	  }

	  /**
	   * @internal
	   *
	   * Wraps access to query root nodes.
	   */

	  RelayQueryNode.prototype.isGenerated = function isGenerated() {
	    return false;
	  };

	  RelayQueryNode.prototype.isRefQueryDependency = function isRefQueryDependency() {
	    return false;
	  };

	  RelayQueryNode.prototype.isScalar = function isScalar() {
	    return false;
	  };

	  RelayQueryNode.prototype.clone = function clone(children) {
	    if (this.isScalar()) {
	      // Compact new children *after* this check, for consistency.
	      !(children.length === 0) ?  true ? invariant(false, 'RelayQueryNode: Cannot add children to scalar fields.') : invariant(false) : undefined;
	      return this;
	    }

	    var prevChildren = this.getChildren();
	    var nextChildren = cloneChildren(prevChildren, children);

	    if (!nextChildren.length) {
	      return null;
	    } else if (nextChildren === prevChildren) {
	      return this;
	    }

	    var clone = RelayQueryNode.create(this.__concreteNode__, this.__route__, this.__variables__);
	    clone.__children__ = nextChildren;
	    clone.__calls__ = this.__calls__;
	    clone.__serializationKey__ = this.__serializationKey__;
	    clone.__storageKey__ = this.__storageKey__;

	    return clone;
	  };

	  RelayQueryNode.prototype.getChildren = function getChildren() {
	    var _this = this;

	    var children = this.__children__;
	    if (!children) {
	      var nextChildren = [];
	      this.__concreteNode__.children.forEach(function (concreteChild) {
	        var node = createNode(concreteChild, _this.__route__, _this.__variables__);
	        if (node) {
	          nextChildren.push(node);
	        }
	      });
	      this.__children__ = nextChildren;
	      children = nextChildren;
	    }
	    return children;
	  };

	  RelayQueryNode.prototype.getField = function getField(field) {
	    return this.getFieldByStorageKey(field.getStorageKey());
	  };

	  RelayQueryNode.prototype.getFieldByStorageKey = function getFieldByStorageKey(storageKey) {
	    var fieldMap = this.__fieldMap__;
	    if (!fieldMap) {
	      fieldMap = {};
	      var child;
	      var children = this.getChildren();
	      for (var ii = 0; ii < children.length; ii++) {
	        child = children[ii];
	        if (child instanceof RelayQueryField) {
	          fieldMap[child.getStorageKey()] = child;
	        }
	      }
	      this.__fieldMap__ = fieldMap;
	    }
	    return fieldMap[storageKey];
	  };

	  RelayQueryNode.prototype.getRoute = function getRoute() {
	    return this.__route__;
	  };

	  RelayQueryNode.prototype.getVariables = function getVariables() {
	    return this.__variables__;
	  };

	  RelayQueryNode.prototype.hasDeferredDescendant = function hasDeferredDescendant() {
	    var hasDeferredDescendant = this.__hasDeferredDescendant__;
	    if (hasDeferredDescendant == null) {
	      hasDeferredDescendant = !this.isScalar() && this.getChildren().some(function (child) {
	        return child.hasDeferredDescendant();
	      });
	      this.__hasDeferredDescendant__ = hasDeferredDescendant;
	    }
	    return hasDeferredDescendant;
	  };

	  RelayQueryNode.prototype.isRequisite = function isRequisite() {
	    return false;
	  };

	  /**
	   * Determine if `this` and `that` are deeply equal.
	   */

	  RelayQueryNode.prototype.equals = function equals(that) {
	    var thisChildren = this.getChildren();
	    var thatChildren = that.getChildren();

	    return thisChildren === thatChildren || thisChildren.length === thatChildren.length && thisChildren.every(function (c, ii) {
	      return c.equals(thatChildren[ii]);
	    });
	  };

	  /**
	   * Performs a fast comparison of whether `this` and `that` represent identical
	   * query nodes. Returns true only if the concrete nodes, routes, and variables
	   * are all the same.
	   *
	   * Note that it is possible that this method can return false in cases where
	   * `equals` would return true. This can happen when the concrete nodes are
	   * different but structurally identical, or when the route/variables are
	   * different but do not have an effect on the structure of the query.
	   */

	  RelayQueryNode.prototype.isEquivalent = function isEquivalent(that) {
	    return this.__concreteNode__ === that.__concreteNode__ && this.__route__ === that.__route__ && shallowEqual(this.__variables__, that.__variables__);
	  };

	  RelayQueryNode.prototype.createNode = function createNode(concreteNode) {
	    return RelayQueryNode.create(concreteNode, this.__route__, this.__variables__);
	  };

	  RelayQueryNode.prototype.getConcreteQueryNode = function getConcreteQueryNode(onCacheMiss) {
	    if (!this.__isConcreteNodeCached__) {
	      this.__concreteNode__ = onCacheMiss();
	      this.__isConcreteNodeCached__ = true;
	    }
	    return this.__concreteNode__;
	  };

	  return RelayQueryNode;
	})();

	var RelayQueryRoot = (function (_RelayQueryNode) {
	  _inherits(RelayQueryRoot, _RelayQueryNode);

	  function RelayQueryRoot(concreteNode, route, variables) {
	    _classCallCheck(this, RelayQueryRoot);

	    _RelayQueryNode.call(this, concreteNode, route, variables);
	    this.__batchCall__ = undefined;
	    this.__deferredFragmentNames__ = undefined;
	    this.__id__ = undefined;

	    // Ensure IDs are generated in the order that queries are created
	    this.getID();
	  }

	  /**
	   * @internal
	   *
	   * Abstract base class for mutations and subscriptions.
	   */

	  RelayQueryRoot.prototype.getName = function getName() {
	    var name = this.__concreteNode__.name;
	    if (!name) {
	      name = this.getID();
	      this.__concreteNode__.name = name;
	    }
	    return name;
	  };

	  RelayQueryRoot.prototype.getID = function getID() {
	    var id = this.__id__;
	    if (id == null) {
	      id = QUERY_ID_PREFIX + _nextQueryID++;
	      this.__id__ = id;
	    }
	    return id;
	  };

	  RelayQueryRoot.prototype.getBatchCall = function getBatchCall() {
	    var batchCall = this.__batchCall__;
	    if (batchCall === undefined) {
	      var concreteCalls = this.__concreteNode__.calls;
	      var callArg = concreteCalls[0].value;
	      if (GraphQL.isBatchCallVariable(callArg)) {
	        batchCall = {
	          refParamName: REF_PARAM_PREFIX + callArg.sourceQueryID,
	          sourceQueryID: callArg.sourceQueryID,
	          sourceQueryPath: callArg.jsonPath
	        };
	      } else {
	        batchCall = null;
	      }
	      this.__batchCall__ = batchCall;
	    }
	    return batchCall;
	  };

	  RelayQueryRoot.prototype.getRootCall = function getRootCall() {
	    var calls = this.__calls__;
	    if (!calls) {
	      var concreteCalls = this.__concreteNode__.calls;
	      calls = callsFromGraphQL(concreteCalls, this.__variables__);
	      this.__calls__ = calls;
	    }
	    return calls[0];
	  };

	  RelayQueryRoot.prototype.getCallType = function getCallType() {
	    if (this.__concreteNode__.calls.length > 0) {
	      return this.__concreteNode__.metadata.rootCallType;
	    }
	  };

	  RelayQueryRoot.prototype.getRootCallArgument = function getRootCallArgument() {
	    return this.__concreteNode__.metadata.rootArg;
	  };

	  RelayQueryRoot.prototype.hasDeferredDescendant = function hasDeferredDescendant() {
	    return this.isDeferred() || _RelayQueryNode.prototype.hasDeferredDescendant.call(this);
	  };

	  RelayQueryRoot.prototype.isDeferred = function isDeferred() {
	    return this.__concreteNode__.isDeferred;
	  };

	  RelayQueryRoot.prototype.getDeferredFragmentNames = function getDeferredFragmentNames() {
	    var fragmentNames = this.__deferredFragmentNames__;
	    if (!fragmentNames) {
	      fragmentNames = {};
	      getDeferredFragmentNamesForField(this, fragmentNames);
	      this.__deferredFragmentNames__ = fragmentNames;
	    }
	    return fragmentNames;
	  };

	  RelayQueryRoot.prototype.equals = function equals(that) {
	    if (this === that) {
	      return true;
	    }
	    if (!(that instanceof RelayQueryRoot)) {
	      return false;
	    }
	    if (!areEqual(this.getRootCall(), that.getRootCall())) {
	      return false;
	    }
	    if (!areEqual(this.getBatchCall(), that.getBatchCall())) {
	      return false;
	    }
	    if (this.getRootCallArgument() !== that.getRootCallArgument()) {
	      return false;
	    }
	    return _RelayQueryNode.prototype.equals.call(this, that);
	  };

	  return RelayQueryRoot;
	})(RelayQueryNode);

	var RelayQueryOperation = (function (_RelayQueryNode2) {
	  _inherits(RelayQueryOperation, _RelayQueryNode2);

	  function RelayQueryOperation(concreteNode, route, variables) {
	    _classCallCheck(this, RelayQueryOperation);

	    _RelayQueryNode2.call(this, concreteNode, route, variables);
	    !(this.constructor.name !== 'RelayQueryOperation') ?  true ? invariant(false, 'RelayQueryOperation: Abstract class cannot be instantiated.') : invariant(false) : undefined;
	  }

	  /**
	   * @internal
	   *
	   * Represents a GraphQL mutation.
	   */

	  RelayQueryOperation.prototype.getName = function getName() {
	    return this.__concreteNode__.name;
	  };

	  RelayQueryOperation.prototype.getResponseType = function getResponseType() {
	    return this.__concreteNode__.responseType;
	  };

	  RelayQueryOperation.prototype.getInputType = function getInputType() {
	    var inputType = this.__concreteNode__.metadata.inputType;
	    !inputType ?  true ? invariant(false, 'RelayQuery: Expected operation `%s` to be annotated with the type of ' + 'its argument. Either the babel transform was configured incorrectly, ' + 'or the schema failed to define an argument for this mutation.', this.getCall().name) : invariant(false) : undefined;
	    return inputType;
	  };

	  RelayQueryOperation.prototype.getCall = function getCall() {
	    var calls = this.__calls__;
	    if (!calls) {
	      var concreteCalls = this.__concreteNode__.calls;
	      calls = callsFromGraphQL(concreteCalls, this.__variables__);
	      this.__calls__ = calls;
	    }
	    return calls[0];
	  };

	  RelayQueryOperation.prototype.getCallVariableName = function getCallVariableName() {
	    if (!this.__callVariableName__) {
	      var concreteCalls = this.__concreteNode__.calls;
	      var callArg = concreteCalls[0].value;
	      !GraphQL.isCallVariable(callArg) ?  true ? invariant(false, 'RelayQuery: Expected mutation to have a single argument.') : invariant(false) : undefined;
	      this.__callVariableName__ = callArg.callVariableName;
	    }
	    return this.__callVariableName__;
	  };

	  return RelayQueryOperation;
	})(RelayQueryNode);

	var RelayQueryMutation = (function (_RelayQueryOperation) {
	  _inherits(RelayQueryMutation, _RelayQueryOperation);

	  function RelayQueryMutation() {
	    _classCallCheck(this, RelayQueryMutation);

	    _RelayQueryOperation.apply(this, arguments);
	  }

	  /**
	   * @internal
	   *
	   * Represents a GraphQL subscription.
	   */

	  RelayQueryMutation.prototype.equals = function equals(that) {
	    if (this === that) {
	      return true;
	    }
	    if (!(that instanceof RelayQueryMutation)) {
	      return false;
	    }
	    if (!areEqual(this.getResponseType(), that.getResponseType())) {
	      return false;
	    }
	    if (!areEqual(this.getCall(), that.getCall())) {
	      return false;
	    }
	    return _RelayQueryOperation.prototype.equals.call(this, that);
	  };

	  return RelayQueryMutation;
	})(RelayQueryOperation);

	var RelayQuerySubscription = (function (_RelayQueryOperation2) {
	  _inherits(RelayQuerySubscription, _RelayQueryOperation2);

	  function RelayQuerySubscription() {
	    _classCallCheck(this, RelayQuerySubscription);

	    _RelayQueryOperation2.apply(this, arguments);
	  }

	  /**
	   * @internal
	   *
	   * Wraps access to query fragments.
	   *
	   * Note: place proxy methods for `GraphQL.QueryFragment` here.
	   */

	  RelayQuerySubscription.prototype.getPublishedPayloadType = function getPublishedPayloadType() {
	    return this.getResponseType();
	  };

	  RelayQuerySubscription.prototype.equals = function equals(that) {
	    if (this === that) {
	      return true;
	    }
	    if (!(that instanceof RelayQuerySubscription)) {
	      return false;
	    }
	    if (!areEqual(this.getPublishedPayloadType(), that.getPublishedPayloadType())) {
	      return false;
	    }
	    if (!areEqual(this.getCall(), that.getCall())) {
	      return false;
	    }
	    return _RelayQueryOperation2.prototype.equals.call(this, that);
	  };

	  return RelayQuerySubscription;
	})(RelayQueryOperation);

	var RelayQueryFragment = (function (_RelayQueryNode3) {
	  _inherits(RelayQueryFragment, _RelayQueryNode3);

	  function RelayQueryFragment(concreteNode, route, variables, isDeferred, isReferenceFragment) {
	    _classCallCheck(this, RelayQueryFragment);

	    _RelayQueryNode3.call(this, concreteNode, route, variables);
	    this.__fragmentID__ = null;
	    this.__isDeferred__ = !!isDeferred;
	    this.__isReferenceFragment__ = !!isReferenceFragment;
	  }

	  /**
	   * @internal
	   *
	   * Wraps access to query fields.
	   *
	   * Note: place proxy methods for `GraphQL.Field` here.
	   */

	  RelayQueryFragment.prototype.getDebugName = function getDebugName() {
	    return this.__concreteNode__.name;
	  };

	  /**
	   * Returns the weak ID for the concrete fragment. Unlike `getFragmentID`,
	   * this value is identical for any `RelayQueryFragment` with the same concrete
	   * fragment, regardless of params/route.
	   */

	  RelayQueryFragment.prototype.getConcreteFragmentID = function getConcreteFragmentID() {
	    return getWeakIdForObject(this.__concreteNode__);
	  };

	  /**
	   * Returns an identifier for a fragment that is unique for any combination of
	   * concrete fragment, route name, and variables.
	   */

	  RelayQueryFragment.prototype.getFragmentID = function getFragmentID() {
	    var fragmentID = this.__fragmentID__;
	    if (!fragmentID) {
	      fragmentID = generateRQLFieldAlias(this.getConcreteFragmentID() + '.' + this.__route__.name + '.' + stableStringify(this.__variables__));
	      this.__fragmentID__ = fragmentID;
	    }
	    return fragmentID;
	  };

	  RelayQueryFragment.prototype.getType = function getType() {
	    return this.__concreteNode__.type;
	  };

	  RelayQueryFragment.prototype.isPlural = function isPlural() {
	    return !!(this.__concreteNode__.isPlural || // RQLPrinter
	    this.__concreteNode__.metadata.plural);
	  };

	  // GraphQLPrinter

	  RelayQueryFragment.prototype.isReferenceFragment = function isReferenceFragment() {
	    return this.__isReferenceFragment__;
	  };

	  RelayQueryFragment.prototype.hasDeferredDescendant = function hasDeferredDescendant() {
	    return this.isDeferred() || _RelayQueryNode3.prototype.hasDeferredDescendant.call(this);
	  };

	  RelayQueryFragment.prototype.isDeferred = function isDeferred() {
	    return this.__isDeferred__;
	  };

	  RelayQueryFragment.prototype.clone = function clone(children) {
	    var clone = _RelayQueryNode3.prototype.clone.call(this, children);
	    if (clone instanceof RelayQueryFragment) {
	      clone.__isDeferred__ = this.__isDeferred__;
	    }
	    return clone;
	  };

	  RelayQueryFragment.prototype.equals = function equals(that) {
	    if (this === that) {
	      return true;
	    }
	    if (!(that instanceof RelayQueryFragment)) {
	      return false;
	    }
	    if (this.getType() !== that.getType()) {
	      return false;
	    }
	    return _RelayQueryNode3.prototype.equals.call(this, that);
	  };

	  return RelayQueryFragment;
	})(RelayQueryNode);

	var RelayQueryField = (function (_RelayQueryNode4) {
	  _inherits(RelayQueryField, _RelayQueryNode4);

	  function RelayQueryField() {
	    _classCallCheck(this, RelayQueryField);

	    _RelayQueryNode4.apply(this, arguments);
	  }

	  RelayQueryField.prototype.isRequisite = function isRequisite() {
	    return this.__concreteNode__.metadata.isRequisite;
	  };

	  RelayQueryField.prototype.isFindable = function isFindable() {
	    return this.__concreteNode__.metadata.isFindable;
	  };

	  RelayQueryField.prototype.isGenerated = function isGenerated() {
	    return this.__concreteNode__.metadata.isGenerated;
	  };

	  RelayQueryField.prototype.isConnection = function isConnection() {
	    return this.__concreteNode__.metadata.isConnection;
	  };

	  RelayQueryField.prototype.isPlural = function isPlural() {
	    return this.__concreteNode__.metadata.isPlural;
	  };

	  RelayQueryField.prototype.isRefQueryDependency = function isRefQueryDependency() {
	    return !!(this.__metadata__ && this.__metadata__.isRefQueryDependency);
	  };

	  RelayQueryField.prototype.isScalar = function isScalar() {
	    return (!this.__children__ || this.__children__.length === 0) && this.__concreteNode__.children.length === 0;
	  };

	  RelayQueryField.prototype.isUnionOrInterface = function isUnionOrInterface() {
	    return this.__concreteNode__.metadata.isUnionOrInterface;
	  };

	  RelayQueryField.prototype.getParentType = function getParentType() {
	    var parentType = this.__concreteNode__.metadata.parentType;
	    !parentType ?  true ? invariant(false, 'RelayQueryField(): Expected field `%s` to be annotated with the ' + 'type of the parent field.', this.getSchemaName()) : invariant(false) : undefined;
	    return parentType;
	  };

	  /**
	   * The canonical name for the referenced field in the schema.
	   */

	  RelayQueryField.prototype.getSchemaName = function getSchemaName() {
	    return this.__concreteNode__.fieldName;
	  };

	  /**
	   * The name for the field when serializing the query or interpreting query
	   * responses from the server. The serialization key is derived from
	   * all calls/values and hashed for compactness.
	   *
	   * Given the graphql
	   * `news_feed.first(10).orderby(TOP_STORIES)`
	   *
	   * the serialization key is
	   * `generateRQLFieldAlias('news_feed.first(10).orderby(TOP_STORIES')`
	   */

	  RelayQueryField.prototype.getSerializationKey = function getSerializationKey() {
	    var serializationKey = this.__serializationKey__;
	    if (!serializationKey) {
	      serializationKey = this.getSchemaName();
	      var calls = this.getCallsWithValues();
	      for (var ii = 0; ii < calls.length; ii++) {
	        serializationKey += printRelayQueryCall(calls[ii]);
	      }
	      serializationKey = generateRQLFieldAlias(serializationKey);
	      this.__serializationKey__ = serializationKey;
	    }
	    return serializationKey;
	  };

	  /**
	   * The name which Relay internals can use to reference this field, without
	   * collisions. The storage key is derived from arguments with the following
	   * exclusions:
	   *
	   *  - Range calls such as `first` or `find` on connections.
	   *  - Conditionals when the field is present.
	   *
	   * Given the graphql
	   * `news_feed.first(10).orderby(TOP_STORIES).if(true)`
	   *
	   * the storage key is
	   * `'news_feed.orderby(TOP_STORIES)'`
	   */

	  RelayQueryField.prototype.getStorageKey = function getStorageKey() {
	    var storageKey = this.__storageKey__;
	    if (!storageKey) {
	      var isConnection = this.isConnection();
	      storageKey = this.getSchemaName();
	      var calls = this.getCallsWithValues();
	      for (var ii = 0; ii < calls.length; ii++) {
	        var call = calls[ii];
	        if (isConnection && RelayConnectionInterface.isConnectionCall(call)) {
	          continue;
	        } else if (call.name === IF && String(call.value) === TRUE || call.name === UNLESS && String(call.value) === FALSE) {
	          // `name.if(true)`, `name.unless(false)`, and `name` are all
	          // equivalent fields.
	          continue;
	        }
	        storageKey += printRelayQueryCall(call);
	      }
	      this.__storageKey__ = storageKey;
	    }
	    return storageKey;
	  };

	  /**
	   * The name by which this field's results should be made available to the
	   * application.
	   */

	  RelayQueryField.prototype.getApplicationName = function getApplicationName() {
	    return this.__concreteNode__.alias || this.__concreteNode__.fieldName;
	  };

	  RelayQueryField.prototype.getInferredRootCallName = function getInferredRootCallName() {
	    return this.__concreteNode__.metadata.inferredRootCallName;
	  };

	  RelayQueryField.prototype.getInferredPrimaryKey = function getInferredPrimaryKey() {
	    return this.__concreteNode__.metadata.inferredPrimaryKey;
	  };

	  RelayQueryField.prototype.getCallsWithValues = function getCallsWithValues() {
	    var calls = this.__calls__;
	    if (!calls) {
	      var concreteCalls = this.__concreteNode__.calls;
	      calls = callsFromGraphQL(concreteCalls, this.__variables__);
	      this.__calls__ = calls;
	    }
	    return calls;
	  };

	  RelayQueryField.prototype.getCallType = function getCallType(callName) {
	    var concreteCall = this.__concreteNode__.calls.filter(function (call) {
	      return call.name === callName;
	    })[0];
	    if (concreteCall) {
	      return concreteCall.metadata.type;
	    }
	  };

	  RelayQueryField.prototype.equals = function equals(that) {
	    if (this === that) {
	      return true;
	    }
	    if (!(that instanceof RelayQueryField)) {
	      return false;
	    }
	    if (this.getSchemaName() !== that.getSchemaName() || this.getApplicationName() !== that.getApplicationName() || !areEqual(this.getCallsWithValues(), that.getCallsWithValues())) {
	      return false;
	    }
	    return _RelayQueryNode4.prototype.equals.call(this, that);
	  };

	  RelayQueryField.prototype.cloneAsRefQueryDependency = function cloneAsRefQueryDependency() {
	    var field = new RelayQueryField(this.__concreteNode__, this.__route__, this.__variables__);
	    field.__children__ = [];
	    field.__metadata__ = _extends({}, field.__metadata__, {
	      isRefQueryDependency: true
	    });
	    return field;
	  };

	  RelayQueryField.prototype.cloneFieldWithCalls = function cloneFieldWithCalls(children, calls) {
	    if (this.isScalar()) {
	      // Compact new children *after* this check, for consistency.
	      !(children.length === 0) ?  true ? invariant(false, 'RelayQueryField: Cannot add children to scalar fields.') : invariant(false) : undefined;
	    }

	    // use `clone()` if call values do not change
	    if (areEqual(this.getCallsWithValues(), calls)) {
	      var clone = this.clone(children);
	      return clone;
	    }

	    var nextChildren = cloneChildren(this.getChildren(), children);
	    if (!nextChildren.length) {
	      return null;
	    }

	    var field = new RelayQueryField(this.__concreteNode__, this.__route__, this.__variables__);
	    field.__children__ = nextChildren;
	    field.__calls__ = calls;

	    return field;
	  };

	  return RelayQueryField;
	})(RelayQueryNode);

	function createNode(_x, _x2, _x3) {
	  var _again = true;

	  _function: while (_again) {
	    var concreteNode = _x,
	        route = _x2,
	        variables = _x3;
	    type = routeFragment = fragment = fragmentVariables = undefined;
	    _again = false;

	    // unused default value keeps flow happy
	    var type = RelayQueryNode;
	    if (GraphQL.isField(concreteNode)) {
	      type = RelayQueryField;
	    } else if (GraphQL.isFragment(concreteNode)) {
	      type = RelayQueryFragment;
	    } else if (GraphQL.isQuery(concreteNode)) {
	      type = RelayQueryRoot;
	    } else if (GraphQL.isQueryWithValues(concreteNode)) {
	      concreteNode = concreteNode.query;
	      type = RelayQueryRoot;
	    } else if (GraphQL.isMutation(concreteNode)) {
	      type = RelayQueryMutation;
	    } else if (GraphQL.isSubscription(concreteNode)) {
	      type = RelayQuerySubscription;
	    } else if (concreteNode instanceof RelayRouteFragment) {
	      var routeFragment = concreteNode.getFragmentForRoute(route);
	      if (routeFragment) {
	        // may be null if no value was defined for this route.
	        _x = routeFragment;
	        _x2 = route;
	        _x3 = variables;
	        _again = true;
	        continue _function;
	      }
	      return null;
	    } else if (concreteNode instanceof RelayFragmentReference) {
	      var fragment = concreteNode.getFragment(variables);
	      var fragmentVariables = concreteNode.getVariables(route, variables);
	      if (fragment) {
	        // the fragment may be null when `if` or `unless` conditions are not met.
	        !GraphQL.isFragment(fragment) ?  true ? invariant(false, 'RelayQuery: Invalid fragment reference, expected query fragment.') : invariant(false) : undefined;
	        return createMemoizedFragment(fragment, route, fragmentVariables, concreteNode.isDeferred(), true);
	      }
	      return null;
	    } else {
	       true ?  true ? invariant(false, 'RelayQueryNode: Invalid concrete node.') : invariant(false) : undefined;
	    }
	    return new type(concreteNode, route, variables);
	  }
	}

	/**
	 * Memoizes the `RelayQueryFragment` equivalent of a given `GraphQL` fragment
	 * for the given route, variables, and deferred status.
	 */
	function createMemoizedFragment(concreteFragment, route, variables, isDeferred, isReferenceFragment) {
	  var cacheKey = route.name + ':' + stableStringify(variables) + ':' + String(isDeferred) + ':' + String(isReferenceFragment);
	  var fragment = concreteFragment.__cachedFragment__;
	  var fragmentCacheKey = concreteFragment.__cacheKey__;
	  if (!fragment || fragmentCacheKey !== cacheKey) {
	    fragment = new RelayQueryFragment(concreteFragment, route, variables, isDeferred, isReferenceFragment);
	    concreteFragment.__cachedFragment__ = fragment;
	    concreteFragment.__cacheKey__ = cacheKey;
	  }
	  return fragment;
	}

	/**
	 * Compacts new children and compares them to the previous children.
	 * - If all items are equal, returns previous array
	 * - If any items differ, returns new array
	 */
	function cloneChildren(prevChildren, nextChildren) {
	  var children = [];
	  var isSameChildren = true;

	  var prevIndex = 0;
	  for (var ii = 0; ii < nextChildren.length; ii++) {
	    var child = nextChildren[ii];
	    if (child) {
	      children.push(child);
	      isSameChildren = isSameChildren && child === prevChildren[prevIndex++];
	    }
	  }

	  if (isSameChildren && children.length === prevChildren.length) {
	    return prevChildren;
	  } else {
	    return children;
	  }
	}

	/**
	 * Returns the names of the deferred fragments in the query. Does not return
	 * nested deferred fragment names.
	 */
	function getDeferredFragmentNamesForField(node, fragmentNames) {
	  if (node instanceof RelayQueryFragment && node.isDeferred()) {
	    var fragmentID = node.getFragmentID();
	    fragmentNames[fragmentID] = fragmentID;
	    return;
	  }
	  node.getChildren().forEach(function (child) {
	    return getDeferredFragmentNamesForField(child, fragmentNames);
	  });
	}

	module.exports = {
	  Field: RelayQueryField,
	  Fragment: RelayQueryFragment,
	  Mutation: RelayQueryMutation,
	  Node: RelayQueryNode,
	  Operation: RelayQueryOperation,
	  Root: RelayQueryRoot,
	  Subscription: RelayQuerySubscription
	};
	// for flow

	// TODO(#7161070) Remove this once `toGraphQL` is no longer needed.

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule RelayProfiler
	 * @typechecks
	 * 
	 */

	'use strict';

	var emptyFunction = __webpack_require__(33);
	var forEachObject = __webpack_require__(7);
	var removeFromArray = __webpack_require__(219);

	var aggregateHandlersByName = {};
	var profileHandlersByName = {};

	var NOT_INVOKED = {};
	var defaultProfiler = { stop: emptyFunction };
	var enableProfile = !!(("development") !== 'production');

	/**
	 * @public
	 *
	 * Instruments methods to allow profiling various parts of Relay. Profiling code
	 * in Relay consists of three steps:
	 *
	 *  - Instrument the function to be profiled.
	 *  - Attach handlers to the instrumented function.
	 *  - Run the code which triggers the handlers.
	 *
	 * Handlers attached to instrumented methods are called with an instrumentation
	 * name and a callback that must be synchronously executed:
	 *
	 *   instrumentedMethod.attachHandler(function(name, callback) {
	 *     var start = performance.now();
	 *     callback();
	 *     console.log('Duration', performance.now() - start);
	 *   });
	 *
	 * Handlers for profiles consist of callbacks for `onStart` and `onStop`:
	 *
	 *   var start;
	 *   RelayProfiler.attachProfileHandler('profileName', {
	 *     onStart: function(name, state) {
	 *       start = performance.now();
	 *     },
	 *     onStop: function(name, state) {
	 *       console.log('Duration', performance.now() - start);
	 *     }
	 *   });
	 *
	 */
	var RelayProfiler = {
	  /**
	   * This only controls whether `profile()`, `attachProfileHandler()` and
	   * `detachProfileHandler` is enabled, normal instrument methods cannot be
	   * enabled if they're not enabled at module require time.
	   */
	  setEnableProfile: function setEnableProfile(isEnabled) {
	    enableProfile = isEnabled;
	  },

	  /**
	   * Instruments methods on a class or object. This re-assigns the method in
	   * order to preserve function names in stack traces (which are detected by
	   * modern debuggers via heuristics). Example usage:
	   *
	   *   var RelayStore = { primeCache: function() {...} };
	   *   RelayProfiler.instrumentMethods(RelayStore, {
	   *     primeCache: 'RelayStore.primeCache'
	   *   });
	   *
	   *   RelayStore.primeCache.attachHandler(...);
	   *
	   * As a result, the methods will be replaced by wrappers that provide the
	   * `attachHandler` and `detachHandler` methods.
	   */
	  instrumentMethods: function instrumentMethods(object, names) {
	    forEachObject(names, function (name, key) {
	      object[key] = RelayProfiler.instrument(name, object[key]);
	    });
	  },

	  /**
	   * Wraps the supplied function with one that provides the `attachHandler` and
	   * `detachHandler` methods. Example usage:
	   *
	   *   var printRelayQuery =
	   *     RelayProfiler.instrument('printRelayQuery', printRelayQuery);
	   *
	   *   printRelayQuery.attachHandler(...);
	   *
	   */
	  instrument: function instrument(name, originalFunction) {
	    if (true) {
	      var handlers = [];
	      var instrumentedCallback = function instrumentedCallback() {
	        var _this = this;

	        var originalReturn = NOT_INVOKED;
	        var boundArguments = arguments;
	        var invokeCallback = function invokeCallback() {
	          originalReturn = originalFunction.apply(_this, boundArguments);
	        };
	        var wrapCallback = function wrapCallback(handler) {
	          invokeCallback = handler.bind(_this, name, invokeCallback);
	        };
	        handlers.forEach(wrapCallback);
	        if (aggregateHandlersByName.hasOwnProperty(name)) {
	          aggregateHandlersByName[name].forEach(wrapCallback);
	        }
	        invokeCallback();
	        if (originalReturn === NOT_INVOKED) {
	          throw new Error('RelayProfiler: Handler did not invoke original function.');
	        }
	        return originalReturn;
	      };
	      instrumentedCallback.attachHandler = function (handler) {
	        handlers.push(handler);
	      };
	      instrumentedCallback.detachHandler = function (handler) {
	        removeFromArray(handlers, handler);
	      };
	      instrumentedCallback.displayName = '(instrumented ' + name + ')';
	      return instrumentedCallback;
	    }
	    originalFunction.attachHandler = emptyFunction;
	    originalFunction.detachHandler = emptyFunction;
	    return originalFunction;
	  },

	  /**
	   * Attaches a handler to all methods instrumented with the supplied name.
	   *
	   *   function createRenderer() {
	   *     return RelayProfiler.instrument('render', function() {...});
	   *   }
	   *   var renderA = createRenderer();
	   *   var renderB = createRenderer();
	   *
	   *   // Only profiles `renderA`.
	   *   renderA.attachHandler(...);
	   *
	   *   // Profiles both `renderA` and `renderB`.
	   *   RelayProfiler.attachAggregateHandler('render', ...);
	   *
	   */
	  attachAggregateHandler: function attachAggregateHandler(name, handler) {
	    if (true) {
	      if (!aggregateHandlersByName.hasOwnProperty(name)) {
	        aggregateHandlersByName[name] = [];
	      }
	      aggregateHandlersByName[name].push(handler);
	    }
	  },

	  /**
	   * Detaches a handler attached via `attachAggregateHandler`.
	   */
	  detachAggregateHandler: function detachAggregateHandler(name, handler) {
	    if (true) {
	      if (aggregateHandlersByName.hasOwnProperty(name)) {
	        removeFromArray(aggregateHandlersByName[name], handler);
	      }
	    }
	  },

	  /**
	   * Instruments profiling for arbitrarily asynchronous code by a name.
	   *
	   *   var timerProfiler = RelayProfiler.profile('timeout');
	   *   setTimeout(function() {
	   *     timerProfiler.stop();
	   *   }, 1000);
	   *
	   *   RelayProfiler.attachProfileHandler('timeout', ...);
	   *
	   * Arbitrary state can also be passed into `profile` as a second argument. The
	   * attached profile handlers will receive this as the second argument.
	   */
	  profile: function profile(name, state) {
	    if (enableProfile) {
	      if (profileHandlersByName.hasOwnProperty(name)) {
	        var profileHandlers = profileHandlersByName[name];
	        for (var ii = profileHandlers.length - 1; ii >= 0; ii--) {
	          var profileHandler = profileHandlers[ii];
	          if (profileHandler.onStart) {
	            profileHandler.onStart(name, state);
	          }
	        }
	        return {
	          stop: function stop() {
	            profileHandlersByName[name].forEach(function (profileHandler) {
	              if (profileHandler.onStop) {
	                profileHandler.onStop(name, state);
	              }
	            });
	          }
	        };
	      }
	    }
	    return defaultProfiler;
	  },

	  /**
	   * Attaches a handler to profiles with the supplied name.
	   */
	  attachProfileHandler: function attachProfileHandler(name, handler) {
	    if (enableProfile) {
	      if (!profileHandlersByName.hasOwnProperty(name)) {
	        profileHandlersByName[name] = [];
	      }
	      profileHandlersByName[name].push(handler);
	    }
	  },

	  /**
	   * Detaches a handler attached via `attachProfileHandler`.
	   */
	  detachProfileHandler: function detachProfileHandler(name, handler) {
	    if (enableProfile) {
	      if (profileHandlersByName.hasOwnProperty(name)) {
	        removeFromArray(profileHandlersByName[name], handler);
	      }
	    }
	  }

	};

	module.exports = RelayProfiler;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	module.exports = { "default": __webpack_require__(185), __esModule: true };

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _Object$create = __webpack_require__(175)["default"];

	var _Object$setPrototypeOf = __webpack_require__(177)["default"];

	exports["default"] = function (subClass, superClass) {
	  if (typeof superClass !== "function" && superClass !== null) {
	    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
	  }

	  subClass.prototype = _Object$create(superClass && superClass.prototype, {
	    constructor: {
	      value: subClass,
	      enumerable: false,
	      writable: true,
	      configurable: true
	    }
	  });
	  if (superClass) _Object$setPrototypeOf ? _Object$setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
	};

	exports.__esModule = true;

/***/ },
/* 7 */
/***/ function(module, exports) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule forEachObject
	 * @typechecks
	 */

	'use strict';

	var hasOwnProperty = Object.prototype.hasOwnProperty;

	/**
	 * Executes the provided `callback` once for each enumerable own property in the
	 * object. The `callback` is invoked with three arguments:
	 *
	 *  - the property value
	 *  - the property name
	 *  - the object being traversed
	 *
	 * Properties that are added after the call to `forEachObject` will not be
	 * visited by `callback`. If the values of existing properties are changed, the
	 * value passed to `callback` will be the value at the time `forEachObject`
	 * visits them. Properties that are deleted before being visited are not
	 * visited.
	 *
	 * @param {?object} object
	 * @param {function} callback
	 * @param {*} context
	 */
	function forEachObject(object, callback, context) {
	  for (var name in object) {
	    if (hasOwnProperty.call(object, name)) {
	      callback.call(context, object[name], name, object);
	    }
	  }
	}

	module.exports = forEachObject;

/***/ },
/* 8 */
/***/ function(module, exports) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule GraphQLStoreDataHandler
	 * 
	 * @typechecks
	 */

	'use strict';

	var METADATA_KEYS = {
	  __dataID__: true,
	  __range__: true,
	  __status__: true
	};

	/**
	 * Utility functions for working with data stored in GraphQLStore.
	 *
	 * @internal
	 */
	var GraphQLStoreDataHandler = {
	  /**
	   * Returns the id that can be used to reference the given node in
	   * the store.
	   */
	  getID: function getID(node) {
	    return node.__dataID__;
	  },

	  /**
	   * Returns a pointer object containing a `__dataID__` property for the node
	   * corresponding to the given id.
	   */
	  createPointerWithID: function createPointerWithID(dataID) {
	    return { __dataID__: dataID };
	  },

	  /**
	   * Checks whether the given ID was created on the client, as opposed to an ID
	   * that's understood by the server as well.
	   */
	  isClientID: function isClientID(dataID) {
	    return dataID.substring(0, 7) === 'client:';
	  },

	  /**
	   * Checks whether the given key is a valid metadata key.
	   */
	  isMetadataKey: function isMetadataKey(key) {
	    return METADATA_KEYS[key] || false;
	  }
	};

	module.exports = GraphQLStoreDataHandler;

/***/ },
/* 9 */
/***/ function(module, exports) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule RelayConnectionInterface
	 * @typechecks
	 * 
	 */

	'use strict';

	var CONNECTION_CALLS = {
	  'after': true,
	  'before': true,
	  'find': true,
	  'first': true,
	  'last': true,
	  'surrounds': true
	};
	var REQUIRED_RANGE_CALLS = {
	  'find': true,
	  'first': true,
	  'last': true
	};

	/**
	 * @internal
	 *
	 * Defines logic relevant to the informal "Connection" GraphQL interface.
	 */
	var RelayConnectionInterface = {
	  CLIENT_MUTATION_ID: 'clientMutationId',
	  CURSOR: 'cursor',
	  EDGES: 'edges',
	  END_CURSOR: 'endCursor',
	  HAS_NEXT_PAGE: 'hasNextPage',
	  HAS_PREV_PAGE: 'hasPreviousPage',
	  NODE: 'node',
	  PAGE_INFO: 'pageInfo',
	  START_CURSOR: 'startCursor',

	  /**
	   * Whether `edges` fields are expected to have `source` fields.
	   */
	  EDGES_HAVE_SOURCE_FIELD: false,

	  /**
	   * Checks whether a call exists strictly to encode which parts of a connection
	   * to fetch. Fields that only differ by connection call values should have the
	   * same identity.
	   */
	  isConnectionCall: function isConnectionCall(call) {
	    return CONNECTION_CALLS.hasOwnProperty(call.name);
	  },

	  /**
	   * Checks whether a set of calls on a connection supply enough information to
	   * fetch the range fields (i.e. `edges` and `page_info`).
	   */
	  hasRangeCalls: function hasRangeCalls(calls) {
	    return calls.some(function (call) {
	      return REQUIRED_RANGE_CALLS.hasOwnProperty(call.name);
	    });
	  },

	  /**
	   * Gets a default record representing a connection's `PAGE_INFO`.
	   */
	  getDefaultPageInfo: function getDefaultPageInfo() {
	    var pageInfo = {};
	    pageInfo[RelayConnectionInterface.START_CURSOR] = undefined;
	    pageInfo[RelayConnectionInterface.END_CURSOR] = undefined;
	    pageInfo[RelayConnectionInterface.HAS_NEXT_PAGE] = false;
	    pageInfo[RelayConnectionInterface.HAS_PREV_PAGE] = false;
	    return pageInfo;
	  }
	};

	module.exports = RelayConnectionInterface;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2014-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule warning
	 */

	"use strict";

	var emptyFunction = __webpack_require__(33);

	/**
	 * Similar to invariant but only logs a warning if the condition is not met.
	 * This can be used to log issues in development environments in critical
	 * paths. Removing the logging code for production environments will keep the
	 * same logic and follow the same code paths.
	 */

	var warning = emptyFunction;

	if (true) {
	  warning = function (condition, format) {
	    for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
	      args[_key - 2] = arguments[_key];
	    }

	    if (format === undefined) {
	      throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
	    }

	    if (format.indexOf('Failed Composite propType: ') === 0) {
	      return; // Ignore CompositeComponent proptype check.
	    }

	    if (!condition) {
	      var argIndex = 0;
	      var message = 'Warning: ' + format.replace(/%s/g, function () {
	        return args[argIndex++];
	      });
	      if (typeof console !== 'undefined') {
	        console.error(message);
	      }
	      try {
	        // --- Welcome to debugging React ---
	        // This error was thrown as a convenience so that you can use this stack
	        // to find the callsite that caused this warning to fire.
	        throw new Error(message);
	      } catch (x) {}
	    }
	  };
	}

	module.exports = warning;

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _Object$assign = __webpack_require__(46)["default"];

	exports["default"] = _Object$assign || function (target) {
	  for (var i = 1; i < arguments.length; i++) {
	    var source = arguments[i];

	    for (var key in source) {
	      if (Object.prototype.hasOwnProperty.call(source, key)) {
	        target[key] = source[key];
	      }
	    }
	  }

	  return target;
	};

	exports.__esModule = true;

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule RelayStoreData
	 * 
	 * @typechecks
	 */

	'use strict';

	var _classCallCheck = __webpack_require__(2)['default'];

	var _Object$keys = __webpack_require__(5)['default'];

	var GraphQLStoreChangeEmitter = __webpack_require__(38);
	var GraphQLStoreDataHandler = __webpack_require__(8);
	var RelayChangeTracker = __webpack_require__(133);
	var RelayConnectionInterface = __webpack_require__(9);

	var RelayNodeInterface = __webpack_require__(15);
	var RelayProfiler = __webpack_require__(4);
	var RelayQuery = __webpack_require__(3);
	var RelayQueryTracker = __webpack_require__(148);
	var RelayQueryWriter = __webpack_require__(149);
	var RelayRecordStore = __webpack_require__(150);

	var RelayStoreGarbageCollector = __webpack_require__(154);

	var forEachObject = __webpack_require__(7);
	var invariant = __webpack_require__(1);
	var generateForceIndex = __webpack_require__(86);
	var refragmentRelayQuery = __webpack_require__(92);
	var resolveImmediate = __webpack_require__(19);
	var warning = __webpack_require__(10);
	var writeRelayQueryPayload = __webpack_require__(170);
	var writeRelayUpdatePayload = __webpack_require__(171);

	var CLIENT_MUTATION_ID = RelayConnectionInterface.CLIENT_MUTATION_ID;

	// The source of truth for application data.
	var _instance;

	/**
	 * @internal
	 *
	 * Wraps the data caches and associated metadata tracking objects used by
	 * GraphQLStore/RelayStore.
	 */

	var RelayStoreData = (function () {

	  /**
	   * Get the data set backing actual Relay operations. Used in GraphQLStore.
	   */

	  RelayStoreData.getDefaultInstance = function getDefaultInstance() {
	    if (!_instance) {
	      _instance = new RelayStoreData();
	    }
	    return _instance;
	  };

	  function RelayStoreData() {
	    _classCallCheck(this, RelayStoreData);

	    var cachedRecords = {};
	    var cachedRootCallMap = {};
	    var queuedRecords = {};
	    var records = {};
	    var rootCallMap = {};
	    var nodeRangeMap = {};

	    this._cacheManager = null;
	    this._cachePopulated = true;
	    this._cachedRecords = cachedRecords;
	    this._cachedRootCalls = cachedRootCallMap;
	    this._nodeRangeMap = nodeRangeMap;
	    this._records = records;
	    this._queuedRecords = queuedRecords;
	    this._queuedStore = new RelayRecordStore({ cachedRecords: cachedRecords, queuedRecords: queuedRecords, records: records }, { cachedRootCallMap: cachedRootCallMap, rootCallMap: rootCallMap }, nodeRangeMap);
	    this._recordStore = new RelayRecordStore({ records: records }, { rootCallMap: rootCallMap }, nodeRangeMap);
	    this._queryTracker = new RelayQueryTracker();
	    this._rootCalls = rootCallMap;
	  }

	  /**
	   * Creates a garbage collector for this instance. After initialization all
	   * newly added DataIDs will be registered in the created garbage collector.
	   * This will show a warning if data has already been added to the instance.
	   */

	  RelayStoreData.prototype.initializeGarbageCollector = function initializeGarbageCollector() {
	    !!this._garbageCollector ?  true ? invariant(false, 'RelayStoreData: Garbage collector is already initialized.') : invariant(false) : undefined;
	    var shouldInitialize = this._isStoreDataEmpty();
	     true ? warning(shouldInitialize, 'RelayStoreData: Garbage collection can only be initialized when no ' + 'data is present.') : undefined;
	    if (shouldInitialize) {
	      this._garbageCollector = new RelayStoreGarbageCollector(this);
	    }
	  };

	  /**
	   * Sets/clears the cache manager that is used to cache changes written to
	   * the store.
	   */

	  RelayStoreData.prototype.injectCacheManager = function injectCacheManager(cacheManager) {
	    var cachedRecords = this._cachedRecords;
	    var cachedRootCallMap = this._cachedRootCalls;
	    var rootCallMap = this._rootCalls;
	    var queuedRecords = this._queuedRecords;
	    var records = this._records;

	    this._cacheManager = cacheManager;
	    this._cachePopulated = false;
	    this._queuedStore = new RelayRecordStore({ cachedRecords: cachedRecords, queuedRecords: queuedRecords, records: records }, { cachedRootCallMap: cachedRootCallMap, rootCallMap: rootCallMap }, this._nodeRangeMap, cacheManager);
	    this._recordStore = new RelayRecordStore({ records: records }, { rootCallMap: rootCallMap }, this._nodeRangeMap, cacheManager);
	  };

	  /**
	   * Runs the callback after all data has been read out from diskc cache into
	   * cachedRecords
	   */

	  RelayStoreData.prototype.runWithDiskCache = function runWithDiskCache(callback) {
	    var _this = this;

	    if (this._cachePopulated || !this._cacheManager) {
	      resolveImmediate(callback);
	    } else {
	      this._cacheManager.readAllData(this._cachedRecords, this._cachedRootCalls, function () {
	        _this._cachePopulated = true;
	        callback();
	      });
	    }
	  };

	  /**
	   * Write the results of a query into the base record store.
	   */

	  RelayStoreData.prototype.handleQueryPayload = function handleQueryPayload(query, response, forceIndex) {
	    var changeTracker = new RelayChangeTracker();
	    var writer = new RelayQueryWriter(this._recordStore, this._queryTracker, changeTracker, {
	      forceIndex: forceIndex,
	      updateTrackedQueries: true
	    });
	    writeRelayQueryPayload(writer, query, response);
	    this._handleChangedAndNewDataIDs(changeTracker.getChangeSet());
	  };

	  /**
	   * Write the results of an update into the base record store.
	   */

	  RelayStoreData.prototype.handleUpdatePayload = function handleUpdatePayload(operation, payload, _ref) {
	    var configs = _ref.configs;
	    var isOptimisticUpdate = _ref.isOptimisticUpdate;

	    var changeTracker = new RelayChangeTracker();
	    var store = isOptimisticUpdate ? this.getRecordStoreForOptimisticMutation(payload[CLIENT_MUTATION_ID]) : this._recordStore;
	    var writer = new RelayQueryWriter(store, this._queryTracker, changeTracker, {
	      forceIndex: generateForceIndex(),
	      updateTrackedQueries: false
	    });
	    writeRelayUpdatePayload(writer, operation, payload, { configs: configs, isOptimisticUpdate: isOptimisticUpdate });
	    this._handleChangedAndNewDataIDs(changeTracker.getChangeSet());
	  };

	  /**
	   * Given a query fragment and a data ID, returns a root query that applies
	   * the fragment to the object specified by the data ID.
	   */

	  RelayStoreData.prototype.buildFragmentQueryForDataID = function buildFragmentQueryForDataID(fragment, dataID) {
	    if (GraphQLStoreDataHandler.isClientID(dataID)) {
	      var path = this._queuedStore.getPathToRecord(dataID);
	      !path ?  true ? invariant(false, 'RelayStoreData.buildFragmentQueryForDataID(): Cannot refetch ' + 'record `%s` without a path.', dataID) : invariant(false) : undefined;
	      var query = refragmentRelayQuery(path.getQuery(fragment));
	      !query ?  true ? invariant(false, 'RelayStoreData.buildFragmentQueryForDataID(): Expected a query for ' + 'record `%s`.', dataID) : invariant(false) : undefined;
	      return query;
	    }
	    // Fragment fields cannot be spread directly into the root because they
	    // may not exist on the `Node` type.
	    return RelayQuery.Node.buildRoot(RelayNodeInterface.NODE, dataID, [fragment], { rootArg: RelayNodeInterface.ID }, fragment.getDebugName() || 'UnknownQuery');
	  };

	  RelayStoreData.prototype.getNodeData = function getNodeData() {
	    return this._records;
	  };

	  RelayStoreData.prototype.getQueuedData = function getQueuedData() {
	    return this._queuedRecords;
	  };

	  RelayStoreData.prototype.clearQueuedData = function clearQueuedData() {
	    var _this2 = this;

	    forEachObject(this._queuedRecords, function (_, key) {
	      delete _this2._queuedRecords[key];
	      GraphQLStoreChangeEmitter.broadcastChangeForID(key);
	    });
	  };

	  RelayStoreData.prototype.getCachedData = function getCachedData() {
	    return this._cachedRecords;
	  };

	  RelayStoreData.prototype.getGarbageCollector = function getGarbageCollector() {
	    return this._garbageCollector;
	  };

	  /**
	   * Get the record store with full data (cached, base, queued).
	   */

	  RelayStoreData.prototype.getQueuedStore = function getQueuedStore() {
	    return this._queuedStore;
	  };

	  /**
	   * Get the record store with only the base data (no queued/cached data).
	   */

	  RelayStoreData.prototype.getRecordStore = function getRecordStore() {
	    return this._recordStore;
	  };

	  RelayStoreData.prototype.getQueryTracker = function getQueryTracker() {
	    return this._queryTracker;
	  };

	  /**
	   * @deprecated
	   *
	   * Used temporarily by GraphQLStore, but all updates to this object are now
	   * handled through a `RelayRecordStore` instance.
	   */

	  RelayStoreData.prototype.getRootCallData = function getRootCallData() {
	    return this._rootCalls;
	  };

	  RelayStoreData.prototype._isStoreDataEmpty = function _isStoreDataEmpty() {
	    return _Object$keys(this._records).length === 0 && _Object$keys(this._queuedRecords).length === 0 && _Object$keys(this._cachedRecords).length === 0;
	  };

	  /**
	   * Given a ChangeSet, broadcasts changes for updated DataIDs
	   * and registers new DataIDs with the garbage collector.
	   */

	  RelayStoreData.prototype._handleChangedAndNewDataIDs = function _handleChangedAndNewDataIDs(changeSet) {
	    var updatedDataIDs = _Object$keys(changeSet.updated);
	    updatedDataIDs.forEach(GraphQLStoreChangeEmitter.broadcastChangeForID);
	    if (this._garbageCollector) {
	      var createdDataIDs = _Object$keys(changeSet.created);
	      var garbageCollector = this._garbageCollector;
	      createdDataIDs.forEach(function (dataID) {
	        return garbageCollector.register(dataID);
	      });
	    }
	  };

	  RelayStoreData.prototype.getRecordStoreForOptimisticMutation = function getRecordStoreForOptimisticMutation(clientMutationID) {
	    var cachedRecords = this._cachedRecords;
	    var cachedRootCallMap = this._cachedRootCalls;
	    var rootCallMap = this._rootCalls;
	    var queuedRecords = this._queuedRecords;
	    var records = this._records;

	    return new RelayRecordStore({ cachedRecords: cachedRecords, queuedRecords: queuedRecords, records: records }, { cachedRootCallMap: cachedRootCallMap, rootCallMap: rootCallMap }, this._nodeRangeMap, this._cacheManager, clientMutationID);
	  };

	  return RelayStoreData;
	})();

	RelayProfiler.instrumentMethods(RelayStoreData.prototype, {
	  handleQueryPayload: 'RelayStoreData.prototype.handleQueryPayload'
	});

	module.exports = RelayStoreData;

/***/ },
/* 13 */
/***/ function(module, exports) {

	'use strict';

	var core = module.exports = {};
	if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef

/***/ },
/* 14 */
/***/ function(module, exports) {

	"use strict";

	var $Object = Object;
	module.exports = {
	  create: $Object.create,
	  getProto: $Object.getPrototypeOf,
	  isEnum: ({}).propertyIsEnumerable,
	  getDesc: $Object.getOwnPropertyDescriptor,
	  setDesc: $Object.defineProperty,
	  setDescs: $Object.defineProperties,
	  getKeys: $Object.keys,
	  getNames: $Object.getOwnPropertyNames,
	  getSymbols: $Object.getOwnPropertySymbols,
	  each: [].forEach
	};

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule RelayNodeInterface
	 * @typechecks
	 * 
	 */

	'use strict';

	var forEachRootCallArg = __webpack_require__(28);
	var generateClientID = __webpack_require__(62);
	var invariant = __webpack_require__(1);

	/**
	 * @internal
	 *
	 * Defines logic relevant to the informal "Node" GraphQL interface.
	 */
	var RelayNodeInterface = {
	  ID: 'id',
	  NODE: 'node',
	  NODE_TYPE: 'Node',
	  NODES: 'nodes',

	  isNodeRootCall: function isNodeRootCall(rootCallName) {
	    return rootCallName === RelayNodeInterface.NODE || rootCallName === RelayNodeInterface.NODES;
	  },

	  getResultsFromPayload: function getResultsFromPayload(store, query, payload) {
	    var results = [];

	    var rootBatchCall = query.getBatchCall();
	    if (rootBatchCall) {
	      getPayloadRecords(query, payload).forEach(function (result) {
	        if (typeof result !== 'object' || !result) {
	          return;
	        }
	        var dataID = result[RelayNodeInterface.ID];
	        !(dataID != null) ?  true ? invariant(false, 'RelayNodeInterface.getResultsFromPayload(): Unable to write result ' + 'with no `%s` field for query, `%s`.', RelayNodeInterface.ID, query.getName()) : invariant(false) : undefined;
	        results.push({ dataID: dataID, result: result });
	      });
	    } else {
	      var records = getPayloadRecords(query, payload);
	      var ii = 0;
	      forEachRootCallArg(query, function (rootCallArg, rootCallName) {
	        var result = records[ii++];
	        if (result == null) {
	          return;
	        }
	        var dataID = store.getRootCallID(rootCallName, rootCallArg);
	        if (dataID == null) {
	          var payloadID = typeof result === 'object' && result ? result[RelayNodeInterface.ID] : null;
	          if (payloadID != null) {
	            dataID = payloadID;
	          } else if (rootCallArg == null) {
	            dataID = 'client:' + rootCallName;
	          } else {
	            dataID = generateClientID();
	          }
	          store.putRootCallID(rootCallName, rootCallArg, dataID);
	        }
	        results.push({ dataID: dataID, result: result });
	      });
	    }

	    return results;
	  }
	};

	function getPayloadRecords(query, payload) {
	  var records = payload[query.getRootCall().name];
	  return Array.isArray(records) ? records : [records];
	}

	module.exports = RelayNodeInterface;

/***/ },
/* 16 */
[269, 200, 31, 204],
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule Promise
	 */

	'use strict';

	module.exports = __webpack_require__(243);

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule GraphQL
	 * @typechecks
	 */

	'use strict';

	var _classCallCheck = __webpack_require__(2)['default'];

	var _inherits = __webpack_require__(6)['default'];

	var _extends = __webpack_require__(11)['default'];

	var _slicedToArray = __webpack_require__(22)['default'];

	var _Object$freeze = __webpack_require__(64)['default'];

	var RelayNodeInterface = __webpack_require__(15);

	var invariant = __webpack_require__(1);

	var EMPTY_OBJECT = {};
	var EMPTY_ARRAY = [];

	if (true) {
	  _Object$freeze(EMPTY_OBJECT);
	  _Object$freeze(EMPTY_ARRAY);
	}

	var BATCH_CALL_VARIABLE = 'BatchCallVariable';
	var CALL = 'Call';
	var CALL_VALUE = 'CallValue';
	var CALL_VARIABLE = 'CallVariable';
	var FIELD = 'Field';
	var FRAGMENT = 'Fragment';
	var MUTATION = 'Mutation';
	var QUERY = 'Query';
	var QUERY_WITH_VALUES = 'QueryWithValues';
	var SUBSCRIPTION = 'Subscription';

	var JSON_TYPES = {
	  QUERY: 1,
	  FRAGMENT: 2,
	  FIELD: 3,
	  CALL: 4,
	  CALL_VALUE: 5,
	  CALL_VARIABLE: 6,
	  BATCH_VARIABLE: 7,
	  MUTATION: 8,
	  QUERY_WITH_VALUES: 9,
	  SUBSCRIPTION: 10
	};

	/**
	 * Represents a GraphQL node.
	 *
	 * A node may contain zero or more fields and/or query fragments.
	 *
	 * Note that we don't actually export this class (rather, we export subclasses
	 * corresponding to fields, fragments, queries and mutations); we do, however,
	 * use `GraphQLNode` as a type throughout Dlite.
	 */

	var GraphQLNode =

	/**
	 * @param {?array<GraphQLFieldNode>} fields
	 * @param {?array<GraphQLQueryFragment|RelayRouteFragment|RelayFragmentReference>} fragments
	 */
	function GraphQLNode(fields, fragments) {
	  _classCallCheck(this, GraphQLNode);

	  this.fields = fields || EMPTY_ARRAY;
	  this.fragments = fragments && fragments.length > 0 ? fragments.filter(isTruthy) : EMPTY_ARRAY;

	  this.children = this.fields.concat(this.fragments);
	}

	/**
	 * Represents a GraphQL call such as `size(50, 50)` or `(size: 32)`.
	 */
	;

	var GraphQLCallvNode = (function () {
	  /**
	   * @param {string} name
	   * @param {*} value (array or scalar)
	   * @param {?object} metadata
	   */

	  function GraphQLCallvNode(name, value, metadata) {
	    _classCallCheck(this, GraphQLCallvNode);

	    this.kind = CALL;
	    this.value = map(value, castArg) || null;
	    this.name = name;
	    this.metadata = metadata || EMPTY_OBJECT;
	  }

	  /**
	   * Represents a value passed to a GraphQL call (for example, the value 5 passed
	   * in a call like `first(5)`).
	   */

	  /**
	   * @param {array} descriptor
	   * @return {GraphQLCallvNode}
	   */

	  GraphQLCallvNode.fromJSON = function fromJSON(descriptor) {
	    var _descriptor = _slicedToArray(descriptor, 4);

	    var type = _descriptor[0];
	    var name = _descriptor[1];
	    var value = _descriptor[2];
	    var metadata = _descriptor[3];

	    !(type === JSON_TYPES.CALL) ?  true ? invariant(false, 'Expected call descriptor') : invariant(false) : undefined;
	    return new GraphQLCallvNode(name, callArgsFromJSON(value), metadata);
	  };

	  GraphQLCallvNode.prototype.toJSON = function toJSON() {
	    return trimArray([JSON_TYPES.CALL, this.name, this.value, this.metadata === EMPTY_OBJECT ? null : this.metadata]);
	  };

	  return GraphQLCallvNode;
	})();

	var GraphQLCallValue = (function () {
	  /**
	   * @param {*} value
	   */

	  function GraphQLCallValue(value) {
	    _classCallCheck(this, GraphQLCallValue);

	    this.kind = CALL_VALUE;
	    this.callValue = value;
	  }

	  /**
	   * Represents a GraphQL call variable for use with the GraphQL Batch API.
	   *
	   * For example, given a source query identified by "q0", we would make a batch
	   * call variable "<ref_q0>" as follows:
	   *
	   *     new GraphQL.BatchCallVariable('q0', '$.*.actor.id');
	   *
	   * The batch API allows streaming responses to the client, re-using information
	   * from previous queries via ref_params; the query identifier ("q0" in the
	   * example above) combined with a JSONPath to the node to be extended
	   * ("$.*.actor.id") allow us to define a supplementary query that retrieves
	   * additional information (example: https://fburl.com/65122329) for that node.
	   *
	   * @see https://our.intern.facebook.com/intern/dex/graphql-batch-api
	   */

	  /**
	   * @param {array} descriptor
	   * @return {GraphQLCallValue}
	   */

	  GraphQLCallValue.fromJSON = function fromJSON(descriptor) {
	    var _descriptor2 = _slicedToArray(descriptor, 2);

	    var type = _descriptor2[0];
	    var value = _descriptor2[1];

	    !(type === JSON_TYPES.CALL_VALUE) ?  true ? invariant(false, 'Expected value descriptor') : invariant(false) : undefined;
	    return new GraphQLCallValue(value);
	  };

	  GraphQLCallValue.prototype.toJSON = function toJSON() {
	    return [JSON_TYPES.CALL_VALUE, this.callValue];
	  };

	  return GraphQLCallValue;
	})();

	var GraphQLBatchCallVariable = (function () {
	  /**
	   * @param {string} sourceQueryID
	   * @param {string} jsonPath
	   */

	  function GraphQLBatchCallVariable(sourceQueryID, jsonPath) {
	    _classCallCheck(this, GraphQLBatchCallVariable);

	    this.kind = BATCH_CALL_VARIABLE;
	    this.sourceQueryID = sourceQueryID;
	    this.jsonPath = jsonPath;
	  }

	  /**
	   * Represents a variable used in a GraphQL call.
	   *
	   * For example:
	   *
	   *     new GraphQL.CallVariable('foo') // variable: <foo>
	   */

	  /**
	   * @param {array} descriptor
	   * @return {GraphQLBatchCallVariable}
	   */

	  GraphQLBatchCallVariable.fromJSON = function fromJSON(descriptor) {
	    var _descriptor3 = _slicedToArray(descriptor, 3);

	    var type = _descriptor3[0];
	    var sourceQueryID = _descriptor3[1];
	    var jsonPath = _descriptor3[2];

	    !(type === JSON_TYPES.BATCH_VARIABLE) ?  true ? invariant(false, 'Expected batch variable descriptor') : invariant(false) : undefined;
	    return new GraphQLBatchCallVariable(sourceQueryID, jsonPath);
	  };

	  GraphQLBatchCallVariable.prototype.toJSON = function toJSON() {
	    return [JSON_TYPES.BATCH_VARIABLE, this.sourceQueryID, this.jsonPath];
	  };

	  return GraphQLBatchCallVariable;
	})();

	var GraphQLCallVariable = (function () {
	  /**
	   * @param {string} variableName
	   */

	  function GraphQLCallVariable(variableName) {
	    _classCallCheck(this, GraphQLCallVariable);

	    this.kind = CALL_VARIABLE;
	    this.callVariableName = variableName;
	  }

	  /**
	   * Represents a field in a GraphQL query.
	   *
	   * A field may be simple or arbitrarily complex, including calls, and containing
	   * subfields, nested fragments.
	   */

	  /**
	   * @param {array} descriptor
	   * @return {GraphQLCallVariable}
	   */

	  GraphQLCallVariable.fromJSON = function fromJSON(descriptor) {
	    var _descriptor4 = _slicedToArray(descriptor, 2);

	    var type = _descriptor4[0];
	    var name = _descriptor4[1];

	    !(type === JSON_TYPES.CALL_VARIABLE) ?  true ? invariant(false, 'Expected variable descriptor') : invariant(false) : undefined;
	    return new GraphQLCallVariable(name);
	  };

	  GraphQLCallVariable.prototype.toJSON = function toJSON() {
	    return [JSON_TYPES.CALL_VARIABLE, this.callVariableName];
	  };

	  return GraphQLCallVariable;
	})();

	var GraphQLFieldNode = (function (_GraphQLNode) {
	  _inherits(GraphQLFieldNode, _GraphQLNode);

	  /**
	   * @param {string} fieldName
	   * @param {?array<GraphQLFieldNode>} fields
	   * @param {?array<GraphQLQueryFragment|RelayRouteFragment|RelayFragmentReference>} fragments
	   * @param {?array<GraphQLCallvNode>} calls
	   * @param {?string} alias
	   * @param {?string} condition
	   * @param {?object} metadata
	   */

	  function GraphQLFieldNode(fieldName, fields, fragments, calls, alias, condition, metadata) {
	    _classCallCheck(this, GraphQLFieldNode);

	    _GraphQLNode.call(this, fields, fragments);

	    this.kind = FIELD;
	    this.fieldName = fieldName;
	    this.calls = calls || EMPTY_ARRAY;
	    this.alias = alias || null;
	    this.condition = condition || null;

	    metadata = metadata || EMPTY_OBJECT;
	    this.__metadata__ = metadata;
	    this.metadata = {
	      edgesID: metadata.edgesID,
	      inferredRootCallName: metadata.rootCall,
	      inferredPrimaryKey: metadata.pk,
	      isConnection: !!metadata.connection,
	      isFindable: !!metadata.connection && !metadata.nonFindable,
	      isGenerated: !!metadata.generated,
	      isPlural: !!metadata.plural,
	      isRequisite: !!metadata.requisite,
	      isUnionOrInterface: !!metadata.dynamic,
	      parentType: metadata.parentType
	    };
	  }

	  /**
	   * Represents a query fragment in a GraphQL query.
	   *
	   * A fragment may contain zero or more fields and/or additional fragments.
	   */

	  /**
	   * @param {array} descriptor
	   * @return {GraphQLFieldNode}
	   */

	  GraphQLFieldNode.fromJSON = function fromJSON(descriptor) {
	    var _descriptor5 = _slicedToArray(descriptor, 8);

	    var type = _descriptor5[0];
	    var fieldName = _descriptor5[1];
	    var fields = _descriptor5[2];
	    var fragments = _descriptor5[3];
	    var calls = _descriptor5[4];
	    var alias = _descriptor5[5];
	    var condition = _descriptor5[6];
	    var metadata = _descriptor5[7];

	    !(type === JSON_TYPES.FIELD) ?  true ? invariant(false, 'Expected field descriptor') : invariant(false) : undefined;
	    return new GraphQLFieldNode(fieldName, fields ? fields.map(GraphQLFieldNode.fromJSON) : null, fragments ? fragments.map(GraphQLQueryFragment.fromJSON) : null, calls ? calls.map(GraphQLCallvNode.fromJSON) : null, alias, condition, metadata);
	  };

	  GraphQLFieldNode.prototype.toJSON = function toJSON() {
	    return trimArray([JSON_TYPES.FIELD, this.fieldName, this.fields.length ? this.fields : null, this.fragments.length ? this.fragments : null, this.calls.length ? this._calls : null, this.alias, this.condition, this.__metadata__ === EMPTY_OBJECT ? null : this.__metadata__]);
	  };

	  return GraphQLFieldNode;
	})(GraphQLNode);

	var GraphQLQueryFragment = (function (_GraphQLNode2) {
	  _inherits(GraphQLQueryFragment, _GraphQLNode2);

	  /**
	   * @param {string} name
	   * @param {string} type
	   * @param {?array<GraphQLFieldNode>} fields
	   * @param {?array<GraphQLQueryFragment|RelayRouteFragment|RelayFragmentReference>} fragments
	   */

	  function GraphQLQueryFragment(name, type, fields, fragments, metadata) {
	    _classCallCheck(this, GraphQLQueryFragment);

	    _GraphQLNode2.call(this, fields, fragments);
	    this.kind = FRAGMENT;
	    this.name = name;
	    this.type = type;
	    this.metadata = this.__metadata__ = metadata || EMPTY_OBJECT;
	    this.isPlural = !!this.metadata.isPlural;
	  }

	  /**
	   * Represents a root GraphQL query such as `viewer() { ... }` or `me() { ... }`.
	   *
	   * Queries may contain zero or more fields, and/or subfragments.
	   */

	  /**
	   * @param {array} descriptor
	   * @return {GraphQLQueryFragment}
	   */

	  GraphQLQueryFragment.fromJSON = function fromJSON(descriptor) {
	    var _descriptor6 = _slicedToArray(descriptor, 6);

	    var type = _descriptor6[0];
	    var name = _descriptor6[1];
	    var fragmentType = _descriptor6[2];
	    var fields = _descriptor6[3];
	    var fragments = _descriptor6[4];
	    var metadata = _descriptor6[5];

	    !(type === JSON_TYPES.FRAGMENT) ?  true ? invariant(false, 'Expected fragment descriptor') : invariant(false) : undefined;
	    var frag = new GraphQLQueryFragment(name, fragmentType, fields ? fields.map(GraphQLFieldNode.fromJSON) : null, fragments ? fragments.map(GraphQLQueryFragment.fromJSON) : null, metadata);
	    return frag;
	  };

	  GraphQLQueryFragment.prototype.toJSON = function toJSON() {
	    return trimArray([JSON_TYPES.FRAGMENT, this.name, this.type, this.fields.length ? this.fields : null, this.fragments.length ? this.fragments : null, this.metadata]);
	  };

	  return GraphQLQueryFragment;
	})(GraphQLNode);

	var GraphQLQuery = (function (_GraphQLNode3) {
	  _inherits(GraphQLQuery, _GraphQLNode3);

	  /**
	   * @param {string} rootCall
	   * @param {*} value
	   * @param {?array<GraphQLFieldNode>} fields
	   * @param {?array<GraphQLQueryFragment|RelayRouteFragment|RelayFragmentReference>} fragments
	   * @param {?object} metadata
	   * @param {?string} queryName
	   */

	  function GraphQLQuery(rootCall, value, fields, fragments, metadata, queryName) {
	    _classCallCheck(this, GraphQLQuery);

	    _GraphQLNode3.call(this, fields, fragments);
	    this.__metadata__ = metadata || EMPTY_OBJECT;
	    var rootArg = this.__metadata__.rootArg;
	    if (rootArg == null && RelayNodeInterface.isNodeRootCall(rootCall)) {
	      rootArg = RelayNodeInterface.ID;
	    }
	    this.kind = QUERY;
	    this.metadata = _extends({}, this.__metadata__, {
	      rootArg: rootArg
	    });
	    this.name = queryName;
	    this.fieldName = rootCall;
	    this.isDeferred = !!this.__metadata__.isDeferred;

	    var callMetadata = this.__metadata__.varargs ? { varargs: this.__metadata__.varargs } : null;
	    this.calls = [new GraphQLCallvNode(rootCall, value, callMetadata)];
	  }

	  /**
	   * Comprises a GraphQL query (see `GraphQLQuery`) and a set of values.
	   *
	   * In practice, we're don't currently make use of the values anywhere in Dlite,
	   * but we use `GraphQLQueryWithValues` widely within Dlite as a type.
	   */

	  /**
	   * @param {array} descriptor
	   * @return {GraphQLQuery}
	   */

	  GraphQLQuery.fromJSON = function fromJSON(descriptor) {
	    var _descriptor7 = _slicedToArray(descriptor, 7);

	    var type = _descriptor7[0];
	    var name = _descriptor7[1];
	    var value = _descriptor7[2];
	    var fields = _descriptor7[3];
	    var fragments = _descriptor7[4];
	    var metadata = _descriptor7[5];
	    var queryName = _descriptor7[6];

	    !(type === JSON_TYPES.QUERY) ?  true ? invariant(false, 'Expected query descriptor') : invariant(false) : undefined;
	    return new GraphQLQuery(name, callArgsFromJSON(value), fields ? fields.map(GraphQLFieldNode.fromJSON) : null, fragments ? fragments.map(GraphQLQueryFragment.fromJSON) : null, metadata, queryName);
	  };

	  GraphQLQuery.prototype.toJSON = function toJSON() {
	    return trimArray([JSON_TYPES.QUERY, this.fieldName, this.calls[0].value, this.fields.length ? this.fields : null, this.fragments.length ? this.fragments : null, this.__metadata__ !== EMPTY_OBJECT ? this.__metadata__ : null, this.name || null]);
	  };

	  return GraphQLQuery;
	})(GraphQLNode);

	var GraphQLQueryWithValues = (function () {
	  /**
	   * @param {GraphQLQuery} query
	   * @param {*} values
	   */

	  function GraphQLQueryWithValues(query, values) {
	    _classCallCheck(this, GraphQLQueryWithValues);

	    this.kind = QUERY_WITH_VALUES;
	    this.query = query;
	    this.values = values;
	  }

	  /**
	   * Base class from which GraphQLMutation and GraphQLSubscription extend.
	   */

	  GraphQLQueryWithValues.prototype.getQuery = function getQuery() {
	    return this.query;
	  };

	  /**
	   * @param {array} descriptor
	   * @return {GraphQLQueryWithValues}
	   */

	  GraphQLQueryWithValues.fromJSON = function fromJSON(descriptor) {
	    var _descriptor8 = _slicedToArray(descriptor, 3);

	    var type = _descriptor8[0];
	    var query = _descriptor8[1];
	    var values = _descriptor8[2];

	    !(type === JSON_TYPES.QUERY_WITH_VALUES) ?  true ? invariant(false, 'Expected query descriptor') : invariant(false) : undefined;
	    return new GraphQLQueryWithValues(GraphQLQuery.fromJSON(query), values);
	  };

	  GraphQLQueryWithValues.prototype.toJSON = function toJSON() {
	    return trimArray([JSON_TYPES.QUERY_WITH_VALUES, this.query, this.values]);
	  };

	  return GraphQLQueryWithValues;
	})();

	var GraphQLOperation = (function (_GraphQLNode4) {
	  _inherits(GraphQLOperation, _GraphQLNode4);

	  /**
	   * @param {string} name
	   * @param {string} responseType
	   * @param {GraphQLCallvNode} call
	   */

	  function GraphQLOperation(name, responseType, call, fields, fragments, metadata) {
	    _classCallCheck(this, GraphQLOperation);

	    _GraphQLNode4.call(this, fields, fragments);
	    this.name = name;
	    this.responseType = responseType;
	    this.calls = [call];
	    this.metadata = metadata || EMPTY_OBJECT;
	  }

	  /**
	   * Represents a GraphQL mutation.
	   */

	  GraphQLOperation.prototype.toJSON = function toJSON() {
	    return trimArray([this.getJSONType(), this.name, this.responseType, this.calls[0], this.fields.length ? this.fields : null, this.fragments.length ? this.fragments : null, this.metadata === EMPTY_OBJECT ? null : this.metadata]);
	  };

	  return GraphQLOperation;
	})(GraphQLNode);

	var GraphQLMutation = (function (_GraphQLOperation) {
	  _inherits(GraphQLMutation, _GraphQLOperation);

	  function GraphQLMutation() {
	    _classCallCheck(this, GraphQLMutation);

	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    _GraphQLOperation.call.apply(_GraphQLOperation, [this].concat(args));
	    this.kind = MUTATION;
	  }

	  /**
	   * Represents a GraphQL subscription.
	   */

	  /**
	   * @param {array} descriptor
	   * @return {GraphQLMutation}
	   */

	  GraphQLMutation.fromJSON = function fromJSON(descriptor) {
	    var _descriptor9 = _slicedToArray(descriptor, 7);

	    var type = _descriptor9[0];
	    var name = _descriptor9[1];
	    var responseType = _descriptor9[2];
	    var mutationCall = _descriptor9[3];
	    var fields = _descriptor9[4];
	    var fragments = _descriptor9[5];
	    var metadata = _descriptor9[6];

	    !(type === JSON_TYPES.MUTATION) ?  true ? invariant(false, 'Expected mutation descriptor') : invariant(false) : undefined;
	    return new GraphQLMutation(name, responseType, GraphQLCallvNode.fromJSON(mutationCall), fields ? fields.map(GraphQLFieldNode.fromJSON) : null, fragments ? fragments.map(GraphQLQueryFragment.fromJSON) : null, metadata);
	  };

	  /**
	   * @return {number}
	   */

	  GraphQLMutation.prototype.getJSONType = function getJSONType() {
	    return JSON_TYPES.MUTATION;
	  };

	  return GraphQLMutation;
	})(GraphQLOperation);

	var GraphQLSubscription = (function (_GraphQLOperation2) {
	  _inherits(GraphQLSubscription, _GraphQLOperation2);

	  function GraphQLSubscription() {
	    _classCallCheck(this, GraphQLSubscription);

	    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	      args[_key2] = arguments[_key2];
	    }

	    _GraphQLOperation2.call.apply(_GraphQLOperation2, [this].concat(args));
	    this.kind = SUBSCRIPTION;
	  }

	  /**
	   * @param {*} thing
	   * @return {boolean}
	   */

	  /**
	   * @param {array} descriptor
	   * @return {GraphQLSubscription}
	   */

	  GraphQLSubscription.fromJSON = function fromJSON(descriptor) {
	    var _descriptor10 = _slicedToArray(descriptor, 7);

	    var type = _descriptor10[0];
	    var name = _descriptor10[1];
	    var responseType = _descriptor10[2];
	    var subscriptionCall = _descriptor10[3];
	    var fields = _descriptor10[4];
	    var fragments = _descriptor10[5];
	    var metadata = _descriptor10[6];

	    !(type === JSON_TYPES.SUBSCRIPTION) ?  true ? invariant(false, 'Expected subscription descriptor') : invariant(false) : undefined;
	    return new GraphQLSubscription(name, responseType, GraphQLCallvNode.fromJSON(subscriptionCall), fields ? fields.map(GraphQLFieldNode.fromJSON) : null, fragments ? fragments.map(GraphQLQueryFragment.fromJSON) : null, metadata);
	  };

	  /**
	   * @return {number}
	   */

	  GraphQLSubscription.prototype.getJSONType = function getJSONType() {
	    return JSON_TYPES.SUBSCRIPTION;
	  };

	  return GraphQLSubscription;
	})(GraphQLOperation);

	function isTruthy(thing) {
	  return !!thing;
	}

	/**
	 * Map a singular/array value with the supplied function.
	 */
	function map(value, fn) {
	  if (value == null) {
	    return value;
	  } else if (Array.isArray(value)) {
	    return value.map(fn);
	  } else {
	    return fn(value);
	  }
	}

	/**
	 * @param {*} arg
	 */
	function castArg(arg) {
	  if (arg instanceof GraphQLCallValue || arg instanceof GraphQLCallVariable || arg instanceof GraphQLBatchCallVariable) {
	    return arg;
	  } else if (arg == null) {
	    return new GraphQLCallVariable('__null__');
	  } else {
	    return new GraphQLCallValue(arg);
	  }
	}

	function trimArray(arr) {
	  var lastIndex = -1;
	  for (var ii = arr.length - 1; ii >= 0; ii--) {
	    if (arr[ii] !== null) {
	      lastIndex = ii;
	      break;
	    }
	  }
	  arr.length = lastIndex + 1;
	  return arr;
	}

	function callArgsFromJSON(value) {
	  if (Array.isArray(value) && Array.isArray(value[0])) {
	    return value.map(callArgFromJSON);
	  } else if (value) {
	    return callArgFromJSON(value);
	  }
	  return value;
	}

	/**
	 * @param {array} descriptor
	 * @return {GraphQLCallValue|GraphQLCallVariable|GraphQLBatchCallVariable}
	 */
	function callArgFromJSON(descriptor) {
	  var type = descriptor[0];
	  switch (type) {
	    case JSON_TYPES.CALL_VALUE:
	      return GraphQLCallValue.fromJSON(descriptor);
	    case JSON_TYPES.CALL_VARIABLE:
	      return GraphQLCallVariable.fromJSON(descriptor);
	    case JSON_TYPES.BATCH_VARIABLE:
	      return GraphQLBatchCallVariable.fromJSON(descriptor);
	    default:
	       true ?  true ? invariant(false, 'GraphQL: Unexpected call type, got `%s` from `%s`.', type, descriptor) : invariant(false) : undefined;
	  }
	}

	function isType(node, type) {
	  return typeof node === 'object' && node !== null && node.kind === type;
	}

	function isCall(node) {
	  return isType(node, CALL);
	}

	function isCallValue(node) {
	  return isType(node, CALL_VALUE);
	}

	function isCallVariable(node) {
	  return isType(node, CALL_VARIABLE);
	}

	function isBatchCallVariable(node) {
	  return isType(node, BATCH_CALL_VARIABLE);
	}

	function isField(node) {
	  return isType(node, FIELD);
	}

	function isFragment(node) {
	  return isType(node, FRAGMENT);
	}

	function isQuery(node) {
	  return isType(node, QUERY);
	}

	function isQueryWithValues(node) {
	  return isType(node, QUERY_WITH_VALUES);
	}

	function isMutation(node) {
	  return isType(node, MUTATION);
	}

	function isSubscription(node) {
	  return isType(node, SUBSCRIPTION);
	}

	/**
	 * This module exports the building blocks for creating a structured
	 * representation (ie. an AST) of GraphQL queries in JavaScript.
	 *
	 * @see https://our.intern.facebook.com/intern/dex/introduction-to-graphql/
	 * @internal
	 */
	var GraphQL = {
	  BatchCallVariable: GraphQLBatchCallVariable,
	  Callv: GraphQLCallvNode,
	  CallValue: GraphQLCallValue,
	  CallVariable: GraphQLCallVariable,
	  Field: GraphQLFieldNode,
	  Mutation: GraphQLMutation,
	  Query: GraphQLQuery,
	  QueryFragment: GraphQLQueryFragment,
	  QueryWithValues: GraphQLQueryWithValues,
	  Subscription: GraphQLSubscription,
	  isBatchCallVariable: isBatchCallVariable,
	  isCall: isCall,
	  isCallValue: isCallValue,
	  isCallVariable: isCallVariable,
	  isField: isField,
	  isFragment: isFragment,
	  isMutation: isMutation,
	  isQuery: isQuery,
	  isQueryWithValues: isQueryWithValues,
	  isSubscription: isSubscription
	};

	module.exports = GraphQL;

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule resolveImmediate
	 * 
	 */

	'use strict';

	var Promise = __webpack_require__(17);

	var resolvedPromise = Promise.resolve();

	/**
	 * An alternative to setImmediate based on Promise.
	 */
	function resolveImmediate(callback) {
	  resolvedPromise.then(callback)['catch'](throwNext);
	}

	function throwNext(error) {
	  setTimeout(function () {
	    throw error;
	  }, 0);
	}

	module.exports = resolveImmediate;

/***/ },
/* 20 */
[269, 231, 34, 126],
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule RelayQueryVisitor
	 * 
	 * @typechecks
	 */

	'use strict';

	var _classCallCheck = __webpack_require__(2)['default'];

	var RelayQuery = __webpack_require__(3);

	/**
	 * @internal
	 *
	 * Base class for traversing a Relay Query.
	 *
	 * Subclasses can optionally implement methods to customize the traversal:
	 *
	 * - `visitField(field, state)`: Called for each field.
	 * - `visitFragment(fragment, state)`: Called for each fragment.
	 * - `visitQuery(fragment, state)`: Called for the top level query.
	 *
	 * A `state` variable is passed along to all callbacks and can be used to
	 * accumulate data while traversing (effectively passing data back up the tree),
	 * or modify the behavior of later callbacks (effectively passing data down the
	 * tree).
	 *
	 * There are two additional methods for controlling the traversal:
	 *
	 * - `traverse(parent, state)`: Visits all children of `parent`. Subclasses
	 *   may override in order to short-circuit traversal. Note that
	 *   `visit{Field,Fragment,Query}` are //not// called on `parent`, as it will
	 *   already have been visited by the time this method is called.
	 * - `visit(child, state)`: Processes the `child` node, calling the appropriate
	 *   `visit{Field,Fragment,Query}` method based on the node type.
	 *
	 * By convention, each of the callback methods returns the visited node. This is
	 * used by the `RelayQueryTransform` subclass to implement mapping and filtering
	 * behavior, but purely-visitor subclases do not need to follow this convention.
	 *
	 * @see RelayQueryTransform
	 */

	var RelayQueryVisitor = (function () {
	  function RelayQueryVisitor() {
	    _classCallCheck(this, RelayQueryVisitor);
	  }

	  RelayQueryVisitor.prototype.visit = function visit(node, nextState) {
	    if (node instanceof RelayQuery.Field) {
	      return this.visitField(node, nextState);
	    } else if (node instanceof RelayQuery.Fragment) {
	      return this.visitFragment(node, nextState);
	    } else if (node instanceof RelayQuery.Root) {
	      return this.visitRoot(node, nextState);
	    }
	  };

	  RelayQueryVisitor.prototype.traverse = function traverse(node, nextState) {
	    var _this = this;

	    if (!node.isScalar()) {
	      node.getChildren().forEach(function (child) {
	        return _this.visit(child, nextState);
	      });
	    }
	    return node;
	  };

	  RelayQueryVisitor.prototype.visitField = function visitField(node, nextState) {
	    return this.traverse(node, nextState);
	  };

	  RelayQueryVisitor.prototype.visitFragment = function visitFragment(node, nextState) {
	    return this.traverse(node, nextState);
	  };

	  RelayQueryVisitor.prototype.visitRoot = function visitRoot(node, nextState) {
	    return this.traverse(node, nextState);
	  };

	  return RelayQueryVisitor;
	})();

	module.exports = RelayQueryVisitor;

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _getIterator = __webpack_require__(173)["default"];

	var _isIterable = __webpack_require__(174)["default"];

	exports["default"] = (function () {
	  function sliceIterator(arr, i) {
	    var _arr = [];
	    var _n = true;
	    var _d = false;
	    var _e = undefined;

	    try {
	      for (var _i = _getIterator(arr), _s; !(_n = (_s = _i.next()).done); _n = true) {
	        _arr.push(_s.value);

	        if (i && _arr.length === i) break;
	      }
	    } catch (err) {
	      _d = true;
	      _e = err;
	    } finally {
	      try {
	        if (!_n && _i["return"]) _i["return"]();
	      } finally {
	        if (_d) throw _e;
	      }
	    }

	    return _arr;
	  }

	  return function (arr, i) {
	    if (Array.isArray(arr)) {
	      return arr;
	    } else if (_isIterable(Object(arr))) {
	      return sliceIterator(arr, i);
	    } else {
	      throw new TypeError("Invalid attempt to destructure non-iterable instance");
	    }
	  };
	})();

	exports.__esModule = true;

/***/ },
/* 23 */
/***/ function(module, exports) {

	"use strict";

	module.exports = {};

/***/ },
/* 24 */
[258, 25, 122, 52],
/* 25 */
14,
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule RelayMetaRoute
	 * 
	 * @typechecks
	 */

	'use strict';

	/**
	 * Meta route based on the real route; provides access to the route name in
	 * queries.
	 */

	var _classCallCheck = __webpack_require__(2)['default'];

	var RelayMetaRoute = (function () {
	  function RelayMetaRoute(name) {
	    _classCallCheck(this, RelayMetaRoute);

	    Object.defineProperty(this, 'name', {
	      enumerable: true,
	      value: name,
	      writable: false
	    });
	  }

	  RelayMetaRoute.get = function get(name) {
	    return cache[name] || (cache[name] = new RelayMetaRoute(name));
	  };

	  return RelayMetaRoute;
	})();

	var cache = {};

	module.exports = RelayMetaRoute;

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule RelayNetworkLayer
	 * @typechecks
	 * 
	 */

	'use strict';

	var Promise = __webpack_require__(17);

	var invariant = __webpack_require__(1);

	var injectedNetworkLayer;

	/**
	 * @internal
	 *
	 * `RelayNetworkLayer` provides a method to inject custom network behavior.
	 */
	var RelayNetworkLayer = {
	  injectNetworkLayer: function injectNetworkLayer(networkLayer) {
	    injectedNetworkLayer = networkLayer;
	  },

	  sendMutation: function sendMutation(mutationRequest) {
	    var networkLayer = getCurrentNetworkLayer();
	    var promise = networkLayer.sendMutation(mutationRequest);
	    if (promise) {
	      Promise.resolve(promise).done();
	    }
	  },

	  sendQueries: function sendQueries(queryRequests) {
	    var networkLayer = getCurrentNetworkLayer();
	    var promise = networkLayer.sendQueries(queryRequests);
	    if (promise) {
	      Promise.resolve(promise).done();
	    }
	  },

	  supports: function supports() {
	    var networkLayer = getCurrentNetworkLayer();
	    return networkLayer.supports.apply(networkLayer, arguments);
	  }
	};

	function getCurrentNetworkLayer() {
	  !injectedNetworkLayer ?  true ? invariant(false, 'RelayNetworkLayer: Use `injectNetworkLayer` to configure a network layer.') : invariant(false) : undefined;
	  return injectedNetworkLayer;
	}

	module.exports = RelayNetworkLayer;

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule forEachRootCallArg
	 * @typechecks
	 * 
	 */

	'use strict';

	var invariant = __webpack_require__(1);

	/**
	 * @internal
	 *
	 * Iterates over the arguments in the supplied root call. If the root call value
	 * is null or undefined, the supplied callback will be invoked once.
	 */
	function forEachRootCallArg(query, callback) {
	  !!query.getBatchCall() ?  true ? invariant(false, 'forEachRootCallArg(): Cannot iterate over batch call variables.') : invariant(false) : undefined;

	  var _query$getRootCall = query.getRootCall();

	  var name = _query$getRootCall.name;
	  var value = _query$getRootCall.value;

	  function each(callArg, fn) {
	    if (Array.isArray(callArg)) {
	      callArg.forEach(function (arg) {
	        return each(arg, fn);
	      });
	    } else if (callArg == null) {
	      fn(callArg, name);
	    } else {
	      !(typeof callArg === 'string' || typeof callArg === 'number') ?  true ? invariant(false, 'Relay: Expected arguments to root field `%s` to each be strings/' + 'numbers, got `%s`.', name, JSON.stringify(callArg)) : invariant(false) : undefined;
	      fn('' + callArg, name);
	    }
	  }
	  each(value, callback);
	}

	module.exports = forEachRootCallArg;

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _Array$from = __webpack_require__(172)["default"];

	exports["default"] = function (arr) {
	  if (Array.isArray(arr)) {
	    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

	    return arr2;
	  } else {
	    return _Array$from(arr);
	  }
	};

	exports.__esModule = true;

/***/ },
/* 30 */
[256, 31, 13],
/* 31 */
/***/ function(module, exports) {

	'use strict';

	var global = typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
	module.exports = global;
	if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef

/***/ },
/* 32 */
[268, 98, 97],
/* 33 */
/***/ function(module, exports) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule emptyFunction
	 */

	"use strict";

	function makeEmptyFunction(arg) {
	  return function () {
	    return arg;
	  };
	}

	/**
	 * This function accepts and discards inputs; it has no side effects. This is
	 * primarily useful idiomatically for overridable function endpoints which
	 * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
	 */
	function emptyFunction() {}

	emptyFunction.thatReturns = makeEmptyFunction;
	emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
	emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
	emptyFunction.thatReturnsNull = makeEmptyFunction(null);
	emptyFunction.thatReturnsThis = function () {
	  return this;
	};
	emptyFunction.thatReturnsArgument = function (arg) {
	  return arg;
	};

	module.exports = emptyFunction;

/***/ },
/* 34 */
31,
/* 35 */
23,
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var asap = __webpack_require__(127);

	function noop() {}

	// States:
	//
	// 0 - pending
	// 1 - fulfilled with _value
	// 2 - rejected with _value
	// 3 - adopted the state of another promise, _value
	//
	// once the state is no longer pending (0) it is immutable

	// All `_` prefixed properties will be reduced to `_{random number}`
	// at build time to obfuscate them and discourage their use.
	// We don't use symbols or Object.defineProperty to fully hide them
	// because the performance isn't good enough.

	// to avoid using try/catch inside critical functions, we
	// extract them to here.
	var LAST_ERROR = null;
	var IS_ERROR = {};
	function getThen(obj) {
	  try {
	    return obj.then;
	  } catch (ex) {
	    LAST_ERROR = ex;
	    return IS_ERROR;
	  }
	}

	function tryCallOne(fn, a) {
	  try {
	    return fn(a);
	  } catch (ex) {
	    LAST_ERROR = ex;
	    return IS_ERROR;
	  }
	}
	function tryCallTwo(fn, a, b) {
	  try {
	    fn(a, b);
	  } catch (ex) {
	    LAST_ERROR = ex;
	    return IS_ERROR;
	  }
	}

	module.exports = Promise;

	function Promise(fn) {
	  if (typeof this !== 'object') {
	    throw new TypeError('Promises must be constructed via new');
	  }
	  if (typeof fn !== 'function') {
	    throw new TypeError('not a function');
	  }
	  this._37 = 0;
	  this._12 = null;
	  this._59 = [];
	  if (fn === noop) return;
	  doResolve(fn, this);
	}
	Promise._99 = noop;

	Promise.prototype.then = function (onFulfilled, onRejected) {
	  if (this.constructor !== Promise) {
	    return safeThen(this, onFulfilled, onRejected);
	  }
	  var res = new Promise(noop);
	  handle(this, new Handler(onFulfilled, onRejected, res));
	  return res;
	};

	function safeThen(self, onFulfilled, onRejected) {
	  return new self.constructor(function (resolve, reject) {
	    var res = new Promise(noop);
	    res.then(resolve, reject);
	    handle(self, new Handler(onFulfilled, onRejected, res));
	  });
	};
	function handle(self, deferred) {
	  while (self._37 === 3) {
	    self = self._12;
	  }
	  if (self._37 === 0) {
	    self._59.push(deferred);
	    return;
	  }
	  asap(function () {
	    var cb = self._37 === 1 ? deferred.onFulfilled : deferred.onRejected;
	    if (cb === null) {
	      if (self._37 === 1) {
	        resolve(deferred.promise, self._12);
	      } else {
	        reject(deferred.promise, self._12);
	      }
	      return;
	    }
	    var ret = tryCallOne(cb, self._12);
	    if (ret === IS_ERROR) {
	      reject(deferred.promise, LAST_ERROR);
	    } else {
	      resolve(deferred.promise, ret);
	    }
	  });
	}
	function resolve(self, newValue) {
	  // Promise Resolution Procedure: https://github.com/promises-aplus/promises-spec#the-promise-resolution-procedure
	  if (newValue === self) {
	    return reject(self, new TypeError('A promise cannot be resolved with itself.'));
	  }
	  if (newValue && (typeof newValue === 'object' || typeof newValue === 'function')) {
	    var then = getThen(newValue);
	    if (then === IS_ERROR) {
	      return reject(self, LAST_ERROR);
	    }
	    if (then === self.then && newValue instanceof Promise) {
	      self._37 = 3;
	      self._12 = newValue;
	      finale(self);
	      return;
	    } else if (typeof then === 'function') {
	      doResolve(then.bind(newValue), self);
	      return;
	    }
	  }
	  self._37 = 1;
	  self._12 = newValue;
	  finale(self);
	}

	function reject(self, newValue) {
	  self._37 = 2;
	  self._12 = newValue;
	  finale(self);
	}
	function finale(self) {
	  for (var i = 0; i < self._59.length; i++) {
	    handle(self, self._59[i]);
	  }
	  self._59 = null;
	}

	function Handler(onFulfilled, onRejected, promise) {
	  this.onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : null;
	  this.onRejected = typeof onRejected === 'function' ? onRejected : null;
	  this.promise = promise;
	}

	/**
	 * Take a potentially misbehaving resolver function and make sure
	 * onFulfilled and onRejected are only called once.
	 *
	 * Makes no guarantees about asynchrony.
	 */
	function doResolve(fn, promise) {
	  var done = false;
	  var res = tryCallTwo(fn, function (value) {
	    if (done) return;
	    done = true;
	    resolve(promise, value);
	  }, function (reason) {
	    if (done) return;
	    done = true;
	    reject(promise, reason);
	  });
	  if (!done && res === IS_ERROR) {
	    done = true;
	    reject(promise, LAST_ERROR);
	  }
	}

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule GraphQLFragmentPointer
	 * 
	 * @typechecks
	 */

	'use strict';

	var _classCallCheck = __webpack_require__(2)['default'];

	var GraphQLStoreDataHandler = __webpack_require__(8);
	var RelayQuery = __webpack_require__(3);

	var invariant = __webpack_require__(1);
	var shallowEqual = __webpack_require__(71);

	/**
	 * Fragment pointers encapsulate the fetched data for a fragment reference. They
	 * are opaque tokens that are used by Relay containers to read data that is then
	 * passed to the underlying React component.
	 */

	var GraphQLFragmentPointer = (function () {

	  /**
	   * Creates a valid prop value to be passed into the top-level Relay container.
	   */

	  GraphQLFragmentPointer.createForRoot = function createForRoot(store, query) {
	    var fragment = getRootFragment(query);
	    if (!fragment) {
	      return null;
	    }
	    var concreteFragmentID = fragment.getConcreteFragmentID();
	    var rootCall = query.getRootCall();
	    var rootCallName = rootCall.name;
	    var rootCallArgs = rootCall.value;
	    if (Array.isArray(rootCallArgs)) {
	      var rootFragment = fragment; // for Flow
	      return rootCallArgs.map(function (rootCallArg) {
	        var dataID = store.getRootCallID(rootCallName, rootCallArg);
	        if (!dataID) {
	          return null;
	        }
	        var pointer = GraphQLStoreDataHandler.createPointerWithID(dataID);
	        pointer[concreteFragmentID] = new GraphQLFragmentPointer([dataID], rootFragment);
	        return pointer;
	      });
	    }
	    !(typeof rootCallArgs === 'string' || rootCallArgs == null) ?  true ? invariant(false, 'GraphQLFragmentPointer: Expected the root field argument to be a ' + 'string, got `%s`.', rootCallArgs) : invariant(false) : undefined;
	    var dataIDOrIDs = store.getRootCallID(rootCallName, rootCallArgs);
	    if (!dataIDOrIDs) {
	      return null;
	    }
	    var result = {};
	    // TODO(t7765591): Throw if `fragment` is not optional.
	    var fragmentPointer = new GraphQLFragmentPointer(dataIDOrIDs, fragment);
	    result[concreteFragmentID] = fragmentPointer;
	    return result;
	  };

	  function GraphQLFragmentPointer(dataIDOrIDs, fragment) {
	    _classCallCheck(this, GraphQLFragmentPointer);

	    var isArray = Array.isArray(dataIDOrIDs);
	    var isPlural = fragment.isPlural();
	    !(isArray === isPlural) ?  true ? invariant(false, 'GraphQLFragmentPointer: Wrong plurality, %s supplied with %s fragment.', isArray ? 'array of data IDs' : 'single data ID', isPlural ? 'plural' : 'non-plural') : invariant(false) : undefined;

	    this._dataIDOrIDs = dataIDOrIDs;
	    this._fragment = fragment;
	  }

	  /**
	   * Get the data ID for a singular query fragment.
	   */

	  GraphQLFragmentPointer.prototype.getDataID = function getDataID() {
	    !!Array.isArray(this._dataIDOrIDs) ?  true ? invariant(false, 'GraphQLFragmentPointer.getDataID(): Bad call for plural fragment.') : invariant(false) : undefined;
	    return this._dataIDOrIDs;
	  };

	  /**
	   * Get the data ID for a plural query fragment.
	   */

	  GraphQLFragmentPointer.prototype.getDataIDs = function getDataIDs() {
	    !Array.isArray(this._dataIDOrIDs) ?  true ? invariant(false, 'GraphQLFragmentPointer.getDataIDs(): Bad call for non-plural fragment.') : invariant(false) : undefined;
	    return this._dataIDOrIDs;
	  };

	  GraphQLFragmentPointer.prototype.getFragment = function getFragment() {
	    return this._fragment;
	  };

	  GraphQLFragmentPointer.prototype.equals = function equals(that) {
	    return shallowEqual(this._dataIDOrIDs, that._dataIDOrIDs) && this._fragment.isEquivalent(that._fragment);
	  };

	  /**
	   * @unstable
	   *
	   * For debugging only, do not rely on this for comparing values at runtime.
	   * Instead, use `pointer.getFragment().getFragmentID()`.
	   */

	  GraphQLFragmentPointer.prototype.toString = function toString() {
	    return 'GraphQLFragmentPointer(ids: ' + JSON.stringify(this._dataIDOrIDs) + ', fragment: `' + this.getFragment().getDebugName() + ', params: ' + JSON.stringify(this._fragment.getVariables()) + ')';
	  };

	  return GraphQLFragmentPointer;
	})();

	function getRootFragment(query) {
	  var batchCall = query.getBatchCall();
	  if (batchCall) {
	     true ?  true ? invariant(false, 'Queries supplied at the root cannot have batch call variables. Query ' + '`%s` has a batch call variable, `%s`.', query.getName(), batchCall.refParamName) : invariant(false) : undefined;
	  }
	  var fragment;
	  query.getChildren().forEach(function (child) {
	    if (child instanceof RelayQuery.Fragment) {
	      !!fragment ?  true ? invariant(false, 'Queries supplied at the root should contain exactly one fragment ' + '(e.g. `${Component.getFragment(\'...\')}`). Query `%s` contains ' + 'more than one fragment.', query.getName()) : invariant(false) : undefined;
	      fragment = child;
	    } else if (child instanceof RelayQuery.Field) {
	      !child.isGenerated() ?  true ? invariant(false, 'Queries supplied at the root should contain exactly one fragment ' + 'and no fields. Query `%s` contains a field, `%s`. If you need to ' + 'fetch fields, declare them in a Relay container.', query.getName(), child.getSchemaName()) : invariant(false) : undefined;
	    }
	  });
	  return fragment;
	}

	module.exports = GraphQLFragmentPointer;

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule GraphQLStoreChangeEmitter
	 * @typechecks
	 * 
	 */

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	var ErrorUtils = __webpack_require__(49);
	var GraphQLStoreRangeUtils = __webpack_require__(39);
	var RelayProfiler = __webpack_require__(4);

	var resolveImmediate = __webpack_require__(19);

	var batchUpdate = function batchUpdate(callback) {
	  return callback();
	};
	var subscribers = [];

	var executingIDs = {};
	var scheduledIDs = null;

	/**
	 * Asynchronous change emitter for nodes stored in GraphQLStore.
	 *
	 * Callers which broadcast changes include:
	 *
	 * - `GraphQLStore`: broadcasts status changes when mutations have an error or
	 *   are retried
	 * - `GraphQLWriter`: broadcasts when changes are written to the store (such as
	 *   nodes being added or deleted)
	 *
	 * Callers which add listeners include:
	 *
	 * - `GraphQLStoreQueryResolver`: sets up listeners when resolving (retrieving)
	 *   data from the store; called via Relay containers as part of the React
	 *   lifecycle (ie. in `componentWillMount` and `componentWillReceiveProps`)
	 *
	 * @internal
	 */
	var GraphQLStoreChangeEmitter = {

	  addListenerForIDs: function addListenerForIDs(ids, callback) {
	    var subscribedIDs = ids.map(getBroadcastID);
	    var index = subscribers.length;
	    subscribers.push({ subscribedIDs: subscribedIDs, callback: callback });
	    return {
	      remove: function remove() {
	        delete subscribers[index];
	      }
	    };
	  },

	  broadcastChangeForID: function broadcastChangeForID(id) {
	    if (scheduledIDs === null) {
	      resolveImmediate(processBroadcasts);
	      scheduledIDs = {};
	    }
	    // Record index of the last subscriber so we do not later unintentionally
	    // invoke callbacks that were subscribed after this broadcast.
	    scheduledIDs[getBroadcastID(id)] = subscribers.length - 1;
	  },

	  injectBatchingStrategy: function injectBatchingStrategy(batchStrategy) {
	    batchUpdate = batchStrategy;
	  },

	  /**
	   * Exposed for profiling reasons.
	   * @private
	   */
	  _processSubscribers: processSubscribers

	};

	function processBroadcasts() {
	  if (scheduledIDs) {
	    executingIDs = scheduledIDs;
	    scheduledIDs = null;
	    batchUpdate(processSubscribers);
	  }
	}

	function processSubscribers() {
	  subscribers.forEach(processSubscriber);
	}

	function processSubscriber(_ref, subscriberIndex) {
	  var subscribedIDs = _ref.subscribedIDs;
	  var callback = _ref.callback;

	  for (var broadcastID in executingIDs) {
	    if (executingIDs.hasOwnProperty(broadcastID)) {
	      var broadcastIndex = executingIDs[broadcastID];
	      if (broadcastIndex < subscriberIndex) {
	        // Callback was subscribed after this particular broadcast.
	        break;
	      }
	      if (subscribedIDs.indexOf(broadcastID) >= 0) {
	        ErrorUtils.applyWithGuard(callback, null, null, null, 'GraphQLStoreChangeEmitter');
	        break;
	      }
	    }
	  }
	}

	/**
	 * Ranges publish events for the entire range, not the specific view of that
	 * range. For example, if "client:1" is a range, the event is on "client:1",
	 * not "client:1_first(5)".
	 */
	function getBroadcastID(id) {
	  return GraphQLStoreRangeUtils.getCanonicalClientID(id);
	}

	RelayProfiler.instrumentMethods(GraphQLStoreChangeEmitter, {
	  addListenerForIDs: 'GraphQLStoreChangeEmitter.addListenerForIDs',
	  broadcastChangeForID: 'GraphQLStoreChangeEmitter.broadcastChangeForID',
	  _processSubscribers: 'GraphQLStoreChangeEmitter.processSubscribers'
	});

	module.exports = GraphQLStoreChangeEmitter;

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule GraphQLStoreRangeUtils
	 * @typechecks
	 */

	'use strict';

	var callsFromGraphQL = __webpack_require__(60);
	var printRelayQueryCall = __webpack_require__(45);

	var rangeData = {};

	/**
	 * Utilities used by GraphQLStore for storing ranges
	 *
	 * GraphQLStore stores all of the parts of a range in a single GraphQLRange
	 * object. For example, `node(4808495){friends.first(5){id,name}}` might be
	 * stored similar to this (pseudo-code):
	 *
	 *   "4808495": {
	 *     "friends": { __dataID__: "client:1" }
	 *   },
	 *   "client:1": {
	 *     "nodes": new GraphQLRange(...) // all friends, not just the first 5
	 *   }
	 *
	 * and when that query is run, the store would return a result pointing at
	 * a specific part of the range, encoded into the data ID:
	 *
	 * {
	 *   "4808495": {
	 *     "friends": { __dataID__: "client:1_first(5)" }
	 *   }
	 * }
	 *
	 * That "client:1_first(5)" ID can then be used to query for the first 5
	 * friends.
	 *
	 * @internal
	 */
	var GraphQLStoreRangeUtils = {

	  /**
	   * Returns a token that can be parsed using parseRangeClientID to recover
	   * the attributes needed to retrieve the corresponding items from a
	   * GraphQLRange.
	   *
	   * @param {array<GraphQLCallvNode>} calls
	   * @param {object} callValues
	   * @param {string} dataID
	   * @return {string}
	   */
	  getClientIDForRangeWithID: function getClientIDForRangeWithID(calls, callValues, dataID) {
	    var callsAsString = callsFromGraphQL(calls, callValues).map(function (call) {
	      return printRelayQueryCall(call).substring(1);
	    }).join(',');
	    var key = dataID + '_' + callsAsString;
	    var edge = rangeData[key];
	    if (!edge) {
	      rangeData[key] = {
	        dataID: dataID,
	        calls: calls,
	        callValues: callValues
	      };
	    }
	    return key;
	  },

	  /**
	   * Parses an ID back into its data ID and calls
	   *
	   * @param {string} rangeSpecificClientID
	   * @return {?object}
	   */
	  parseRangeClientID: function parseRangeClientID(rangeSpecificClientID) {
	    return rangeData[rangeSpecificClientID] || null;
	  },

	  /**
	   * If given the client id for a range view, returns the canonical client id
	   * for the entire range. e.g. converts "client:1_first(5)" to "client:1".
	   * Otherwise returns the input.
	   *
	   * @param {string} dataID
	   * @return {string}
	   */
	  getCanonicalClientID: function getCanonicalClientID(dataID) {
	    return rangeData[dataID] ? rangeData[dataID].dataID : dataID;
	  }
	};

	module.exports = GraphQLStoreRangeUtils;

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule RelayDeprecated
	 * @typechecks
	 * 
	 */

	'use strict';

	var RelayQL = __webpack_require__(56);

	var forEachObject = __webpack_require__(7);
	var invariant = __webpack_require__(1);
	var mapObject = __webpack_require__(111);
	var warning = __webpack_require__(10);

	/**
	 * @internal
	 */
	var RelayDeprecated = {

	  /**
	   * Prints a deprecation warning.
	   */
	  warn: function warn(_ref) {
	    var was = _ref.was;
	    var now = _ref.now;
	    return (function () {
	       true ? warning(false, 'Relay: `%s` is deprecated; use `%s`.', was, now) : undefined;
	    })();
	  },

	  /**
	   * Wraps a deprecated method to warn when invoked.
	   */
	  createWarning: function createWarning(_ref2) {
	    var was = _ref2.was;
	    var now = _ref2.now;
	    var adapter = _ref2.adapter;
	    return (function () {
	      return function () {
	        RelayDeprecated.warn({ was: was, now: now });
	        return adapter.apply(this, arguments);
	      };
	    })();
	  },

	  /**
	   * Upgrades a deprecated RelayContainer spec.
	   */
	  upgradeContainerSpec: function upgradeContainerSpec(maybeSpec) {
	    var deprecatedProperties = ['queries', 'queryParams', 'processQueryParams'].filter(function (property) {
	      return maybeSpec.hasOwnProperty(property);
	    });

	    var modernProperties = ['fragments', 'initialVariables', 'prepareVariables'].filter(function (property) {
	      return maybeSpec.hasOwnProperty(property);
	    });

	    if (modernProperties.length) {
	      !(deprecatedProperties.length === 0) ?  true ? invariant(false, 'Relay.createContainer(...): Spec contains a mixture of valid and ' + 'deprecated properties: %s', deprecatedProperties.join(', ')) : invariant(false) : undefined;
	      return maybeSpec;
	    }

	    var spec = {};
	    forEachObject(maybeSpec, function (property, name) {
	      switch (name) {
	        case 'queries':
	          spec.fragments = mapObject(property, function (queryBuilder, propName) {
	            return function (variables) {
	              return queryBuilder(undefined, RelayQL, variables);
	            };
	          });
	          break;
	        case 'queryParams':
	          spec.initialVariables = property;
	          break;
	        case 'processQueryParams':
	          spec.prepareVariables = function (prevVariables, route) {
	            return property(route, prevVariables);
	          };
	          break;
	      }
	    });
	    return spec;
	  },

	  getMutationInitialVariables: function getMutationInitialVariables(Mutation) {
	    var queryParams = Mutation.queryParams;
	    if (queryParams && !Mutation.initialVariables) {
	      RelayDeprecated.warn({
	        was: Mutation.name + '.queryParams',
	        now: Mutation.name + '.initialVariables'
	      });
	      Mutation.initialVariables = queryParams;
	    }
	    return Mutation.initialVariables;
	  },

	  getMutationFragments: function getMutationFragments(Mutation) {
	    var queries = Mutation.queries;
	    if (queries && !Mutation.fragments) {
	      RelayDeprecated.warn({
	        was: Mutation.name + '.queries',
	        now: Mutation.name + '.fragments'
	      });
	      Mutation.fragments = queries;
	    }
	    return Mutation.fragments;
	  }

	};

	module.exports = RelayDeprecated;

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule RelayFragmentReference
	 * @typechecks
	 * 
	 */

	'use strict';

	var _classCallCheck = __webpack_require__(2)['default'];

	var _extends = __webpack_require__(11)['default'];

	var GraphQL = __webpack_require__(18);

	var forEachObject = __webpack_require__(7);
	var getWeakIdForObject = __webpack_require__(88);
	var invariant = __webpack_require__(1);

	/**
	 * @internal
	 *
	 * RelayFragmentReference is the return type of fragment composition:
	 *
	 *   fragment on Foo {
	 *     ${Child.getFragment('bar', {baz: variables.qux})}
	 *   }
	 *
	 * Whereas a fragment defines a sub-query's structure, a fragment reference is
	 * a particular instantiation of the fragment as it is composed within a query
	 * or another fragment. It encodes the source fragment, initial variables, and
	 * a mapping from variables in the composing query's (or fragment's) scope to
	 * variables in the fragment's scope.
	 *
	 * The variable mapping is represented by `variableMapping`, a dictionary that
	 * maps from names of variables in the parent scope to variables that exist in
	 * the fragment. Example:
	 *
	 * ```
	 * // Fragment:
	 * var Container = Relay.createContainer(..., {
	 *   initialVariables: {
	 *     private: 'foo',
	 *     public: 'bar',
	 *     variable: null,
	 *   },
	 *   fragments: {
	 *     foo: ...
	 *   }
	 * });
	 *
	 * // Reference:
	 * ${Container.getQuery(
	 *   'foo',
	 *   // Variable Mapping:
	 *   {
	 *     public: 'BAR',
	 *     variable: variables.source,
	 *   }
	 * )}
	 * ```
	 *
	 * When evaluating the referenced fragment, `$public` will be overridden with
	 * `'Bar'`. The value of `$variable` will become the value of `$source` in the
	 * outer scope. This is analagous to:
	 *
	 * ```
	 * function inner(private = 'foo', public = 'bar', variable) {}
	 * function outer(source) {
	 *   inner(public = 'BAR', variable = source);
	 * }
	 * ```
	 *
	 * Where the value of the inner `variable` depends on how `outer` is called.
	 *
	 * The `prepareVariables` function allows for variables to be modified based on
	 * the runtime environment or route name.
	 */

	var RelayFragmentReference = (function () {
	  function RelayFragmentReference(fragmentGetter, defaultVariables, variableMapping, prepareVariables) {
	    _classCallCheck(this, RelayFragmentReference);

	    this._initialVariables = defaultVariables;
	    this._fragment = undefined;
	    this._fragmentGetter = fragmentGetter;
	    this._isDeferred = false;
	    this._variableMapping = variableMapping;
	    this._prepareVariables = prepareVariables;

	    // Help find `getFragment` calls with undefined variable values.
	    // For example, `${Child.getFragment('foo', {variable: undefined})}`.
	    if (true) {
	      if (variableMapping) {
	        forEachObject(variableMapping, function (variableValue, variableName) {
	          if (variableValue === undefined) {
	            console.error('RelayFragmentReference: Variable `%s` cannot be undefined.', variableName);
	          }
	        });
	      }
	    }
	  }

	  /**
	   * Mark this usage of the fragment as deferred.
	   */

	  RelayFragmentReference.prototype.defer = function defer() {
	    this._isDeferred = true;
	    return this;
	  };

	  /**
	   * Mark this fragment for inclusion only if the given variable is truthy.
	   */

	  RelayFragmentReference.prototype['if'] = function _if(callVariable) {
	    !GraphQL.isCallVariable(callVariable) ?  true ? invariant(false, 'RelayFragmentReference: Invalid value `%s` supplied to `if()`. ' + 'Expected a variable.', callVariable) : invariant(false) : undefined;
	    this._addCondition(function (variables) {
	      return !!variables[callVariable.callVariableName];
	    });
	    return this;
	  };

	  /**
	   * Mark this fragment for inclusion only if the given variable is falsy.
	   */

	  RelayFragmentReference.prototype.unless = function unless(callVariable) {
	    !GraphQL.isCallVariable(callVariable) ?  true ? invariant(false, 'RelayFragmentReference: Invalid value `%s` supplied to `unless()`. ' + 'Expected a variable.', callVariable) : invariant(false) : undefined;
	    this._addCondition(function (variables) {
	      return !variables[callVariable.callVariableName];
	    });
	    return this;
	  };

	  /**
	   * @private
	   *
	   * Memoize the fragment so it has the same `getWeakIdForObject`.
	   */

	  RelayFragmentReference.prototype._getFragment = function _getFragment() {
	    if (this._fragment == null) {
	      this._fragment = this._fragmentGetter();
	    }
	    return this._fragment;
	  };

	  /**
	   * Get the referenced fragment if all conditions are met.
	   */

	  RelayFragmentReference.prototype.getFragment = function getFragment(variables) {
	    // determine if the variables match the supplied if/unless conditions
	    var conditions = this._conditions;
	    if (conditions && !conditions.every(function (cb) {
	      return cb(variables);
	    })) {
	      return null;
	    }
	    return this._getFragment();
	  };

	  /**
	   * Get the variables to pass to the referenced fragment, accounting for
	   * initial values, overrides, and route-specific variables.
	   */

	  RelayFragmentReference.prototype.getVariables = function getVariables(route, variables) {
	    var innerVariables = _extends({}, this._initialVariables);

	    // map variables from outer -> inner scope
	    var variableMapping = this._variableMapping;
	    if (variableMapping) {
	      forEachObject(variableMapping, function (value, name) {
	        if (GraphQL.isCallVariable(value)) {
	          value = variables[value.callVariableName];
	        }
	        if (value !== undefined) {
	          innerVariables[name] = value;
	        }
	      });
	    }

	    var prepareVariables = this._prepareVariables;
	    if (prepareVariables) {
	      innerVariables = prepareVariables(innerVariables, route);
	    }

	    return innerVariables;
	  };

	  RelayFragmentReference.prototype.getFragmentName = function getFragmentName() {
	    return getWeakIdForObject(this._getFragment());
	  };

	  RelayFragmentReference.prototype.isDeferred = function isDeferred() {
	    return this._isDeferred;
	  };

	  RelayFragmentReference.prototype._addCondition = function _addCondition(condition) {
	    var conditions = this._conditions;
	    if (!conditions) {
	      conditions = [];
	      this._conditions = conditions;
	    }
	    conditions.push(condition);
	  };

	  return RelayFragmentReference;
	})();

	module.exports = RelayFragmentReference;

/***/ },
/* 42 */
/***/ function(module, exports) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule RelayRecordStatus
	 * 
	 * @typechecks
	 */

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var RelayRecordStatus = {
	  /**
	   * Record exists (either fetched from the server or produced by a local,
	   * optimistic update).
	   */
	  EXISTENT: 'EXISTENT',

	  /**
	   * Record is known not to exist (either as the result of a mutation, or
	   * because the server returned `null` when queried for the record).
	   */
	  NONEXISTENT: 'NONEXISTENT',

	  /**
	   * Record status is unknown because it has not yet been fetched from the
	   * server.
	   */
	  UNKNOWN: 'UNKNOWN'
	};

	module.exports = RelayRecordStatus;

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule RelayStore
	 * @typechecks
	 * 
	 */

	'use strict';

	var GraphQLQueryRunner = __webpack_require__(128);

	var RelayMutationTransaction = __webpack_require__(78);

	var RelayStoreData = __webpack_require__(12);

	var forEachRootCallArg = __webpack_require__(28);
	var observeAllRelayQueryData = __webpack_require__(163);
	var observeRelayQueryData = __webpack_require__(90);
	var readRelayQueryData = __webpack_require__(63);

	var queuedStore = RelayStoreData.getDefaultInstance().getQueuedStore();

	/**
	 * @public
	 *
	 * RelayStore is a caching layer that records GraphQL response data and enables
	 * resolving and subscribing to queries.
	 *
	 * === onReadyStateChange ===
	 *
	 * Whenever Relay sends a request for data via GraphQL, an "onReadyStateChange"
	 * callback can be supplied. This callback is called one or more times with a
	 * `readyState` object with the following properties:
	 *
	 *   aborted: Whether the request was aborted.
	 *   done: Whether all response data has been fetched.
	 *   error: An error in the event of a failure, or null if none.
	 *   ready: Whether the queries are at least partially resolvable.
	 *   stale: When resolvable during `forceFetch`, whether data is stale.
	 *
	 * If the callback is invoked with `aborted`, `done`, or a non-null `error`, the
	 * callback will never be called again. Example usage:
	 *
	 *  function onReadyStateChange(readyState) {
	 *    if (readyState.aborted) {
	 *      // Request was aborted.
	 *    } else if (readyState.error) {
	 *      // Failure occured.
	 *    } else if (readyState.ready) {
	 *      // Queries are at least partially resolvable.
	 *      if (readyState.done) {
	 *        // Queries are completely resolvable.
	 *      }
	 *    }
	 *  }
	 *
	 */
	var RelayStore = {

	  /**
	   * Primes the store by sending requests for any missing data that would be
	   * required to satisfy the supplied set of queries.
	   */
	  primeCache: function primeCache(querySet, callback) {
	    return GraphQLQueryRunner.run(querySet, callback);
	  },

	  /**
	   * Forces the supplied set of queries to be fetched and written to the store.
	   * Any data that previously satisfied the queries will be overwritten.
	   */
	  forceFetch: function forceFetch(querySet, callback) {
	    return GraphQLQueryRunner.forceFetch(querySet, callback);
	  },

	  /**
	   * Reads query data anchored at the supplied data ID.
	   */
	  read: function read(node, dataID, options) {
	    return readRelayQueryData(queuedStore, node, dataID, options).data;
	  },

	  /**
	   * Reads query data anchored at the supplied data IDs.
	   */
	  readAll: function readAll(node, dataIDs, options) {
	    return dataIDs.map(function (dataID) {
	      return readRelayQueryData(queuedStore, node, dataID, options).data;
	    });
	  },

	  /**
	   * Reads query data, where each element in the result array corresponds to a
	   * root call argument. If the root call has no arguments, the result array
	   * will contain exactly one element.
	   */
	  readQuery: function readQuery(root, options) {
	    var results = [];
	    forEachRootCallArg(root, function (rootCallArg, rootCallName) {
	      var data;
	      var dataID = queuedStore.getRootCallID(rootCallName, rootCallArg);
	      if (dataID != null) {
	        data = RelayStore.read(root, dataID, options);
	      }
	      results.push(data);
	    });
	    return results;
	  },

	  /**
	   * Reads and subscribes to query data anchored at the supplied data ID. The
	   * returned observable emits updates as the data changes over time.
	   */
	  observe: function observe(node, dataID, options) {
	    return observeRelayQueryData(queuedStore, node, dataID, options);
	  },

	  /**
	   * Reads and subscribes to query data anchored at the supplied data IDs. The
	   * returned observable emits updates as the data changes over time.
	   */
	  observeAll: function observeAll(node, dataIDs, options) {
	    return observeAllRelayQueryData(queuedStore, node, dataIDs, options);
	  },

	  update: function update(mutation, callbacks) {
	    var transaction = new RelayMutationTransaction(mutation);
	    transaction.commit(callbacks);
	  }
	};

	module.exports = RelayStore;

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule RelayTaskScheduler
	 * @typechecks
	 * 
	 */

	'use strict';

	var Promise = __webpack_require__(17);

	var invariant = __webpack_require__(1);

	var queue = [];
	var schedule;
	var running = false;

	/**
	 * Task scheduler used by Relay internals. Each task is a synchronous unit of
	 * work that can be deferred by an injected scheduler function. For example,
	 * an injected scheduler can defer each task to the next animation frame:
	 *
	 *   RelayTaskScheduler.injectScheduler(function(executeTask) {
	 *     // This function will be invoked whenever a task is enqueued. It will not
	 *     // be invoked again until `executeTask` has been invoked. Also, invoking
	 *     // `executeTask` more than once is an error.
	 *     requestAnimationFrame(executeTask);
	 *   });
	 *
	 * By default, the next task is executed synchronously after the previous one is
	 * finished. An injected scheduler using `setImmediate` can alter this behavior.
	 */
	var RelayTaskScheduler = {
	  /**
	   * @public
	   *
	   * Injects a scheduling function that is invoked with a callback that will
	   * execute the next unit of work. The callback will return a promise that
	   * resolves with a new callback when the next unit of work is available.
	   */
	  injectScheduler: function injectScheduler(injectedScheduler) {
	    schedule = injectedScheduler;
	  },

	  /**
	   * @internal
	   *
	   * Enqueues one or more callbacks that each represent a synchronous unit of
	   * work that can be scheduled to be executed at a later time.
	   *
	   * The return value of each callback will be passed in as an argument to the
	   * next callback. If one of the callbacks throw an error, the execution will
	   * be aborted and the returned promise be rejected with the thrown error.
	   * Otherwise, the returned promise will be resolved with the return value of
	   * the last callback. For example:
	   *
	   *   RelayTaskScheduler.await(
	   *     function() {
	   *       return 'foo';
	   *     },
	   *     function(foo) {
	   *       return 'bar';
	   *     }
	   *   ).then(
	   *     function(bar) {
	   *       // ...
	   *     }
	   *   );
	   *
	   *   RelayTaskScheduler.await(
	   *     function() {
	   *       return 'foo';
	   *     },
	   *     function(foo) {
	   *       throw new Error();
	   *     },
	   *     function() {
	   *       // Never executed.
	   *     }
	   *   ).catch(
	   *     function(error) {}
	   *   );
	    */
	  await: function await() {
	    for (var _len = arguments.length, callbacks = Array(_len), _key = 0; _key < _len; _key++) {
	      callbacks[_key] = arguments[_key];
	    }

	    var promise = new Promise(function (resolve, reject) {
	      var nextIndex = 0;
	      var error = null;
	      function enqueueNext(value) {
	        if (error) {
	          reject(error);
	          return;
	        }
	        if (nextIndex >= callbacks.length) {
	          resolve(value);
	        } else {
	          queue.push(function () {
	            enqueueNext((function () {
	              var nextCallback = callbacks[nextIndex++];
	              try {
	                value = nextCallback(value);
	              } catch (e) {
	                error = e;
	                value = undefined;
	              }
	              return value;
	            })());
	          });
	        }
	      }
	      enqueueNext(undefined);
	    });
	    scheduleIfNecessary();
	    return promise;
	  }
	};

	function scheduleIfNecessary() {
	  if (running) {
	    return;
	  }
	  if (queue.length) {
	    running = true;
	    var executeTask = createTaskExecutor(queue.shift());
	    if (schedule) {
	      schedule(executeTask);
	    } else {
	      executeTask();
	    }
	  } else {
	    running = false;
	  }
	}

	function createTaskExecutor(callback) {
	  var invoked = false;
	  return function () {
	    !!invoked ?  true ? invariant(false, 'RelayTaskScheduler: Tasks can only be executed once.') : invariant(false) : undefined;
	    invoked = true;
	    invokeWithinScopedQueue(callback);
	    running = false;
	    scheduleIfNecessary();
	  };
	}

	function invokeWithinScopedQueue(callback) {
	  var originalQueue = queue;
	  queue = [];
	  try {
	    callback();
	  } finally {
	    Array.prototype.unshift.apply(originalQueue, queue);
	    queue = originalQueue;
	  }
	}

	module.exports = RelayTaskScheduler;

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule printRelayQueryCall
	 * @typechecks
	 * 
	 */

	'use strict';

	var flattenArray = __webpack_require__(214);

	/**
	 * @internal
	 *
	 * Used to both print queries (to create requests) and to serialize nodes.
	 */
	function printRelayQueryCall(call) {
	  var value = call.value;

	  var valueString;
	  if (Array.isArray(value)) {
	    valueString = flattenArray(value).map(sanitizeCallValue).join(',');
	  } else if (value != null) {
	    valueString = sanitizeCallValue(value);
	  } else {
	    valueString = '';
	  }
	  return '.' + call.name + '(' + valueString + ')';
	}

	function sanitizeCallValue(value) {
	  if (value == null) {
	    return '';
	  }
	  if (typeof value !== 'string') {
	    value = JSON.stringify(value);
	  }
	  value = value.replace(/[)(}{><,.\\]/g, '\\$&');
	  // Works around a bug in Legacy GraphQL, see Task #7599025.
	  if (/ $/.test(value)) {
	    value += ' ';
	  }
	  return value.replace(/^( *)(.*?)( *)$/, function (_, prefix, body, suffix) {
	    return '\\ '.repeat(prefix.length) + body + '\\ '.repeat(suffix.length);
	  });
	}

	module.exports = printRelayQueryCall;

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	module.exports = { "default": __webpack_require__(181), __esModule: true };

/***/ },
/* 47 */
[258, 14, 100, 202],
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule Deferred
	 * @typechecks
	 * 
	 */

	'use strict';

	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError('Cannot call a class as a function');
	  }
	}

	var Promise = __webpack_require__(17);

	/**
	 * Deferred provides a Promise-like API that exposes methods to resolve and
	 * reject the Promise. It is most useful when converting non-Promise code to use
	 * Promises.
	 *
	 * If you want to export the Promise without exposing access to the resolve and
	 * reject methods, you should export `getPromise` which returns a Promise with
	 * the same semantics excluding those methods.
	 */

	var Deferred = (function () {
	  function Deferred() {
	    var _this = this;

	    _classCallCheck(this, Deferred);

	    this._settled = false;
	    this._promise = new Promise(function (resolve, reject) {
	      _this._resolve = resolve;
	      _this._reject = reject;
	    });
	  }

	  Deferred.prototype.getPromise = function getPromise() {
	    return this._promise;
	  };

	  Deferred.prototype.resolve = function resolve(value) {
	    this._settled = true;
	    this._resolve(value);
	  };

	  Deferred.prototype.reject = function reject(reason) {
	    this._settled = true;
	    this._reject(reason);
	  };

	  Deferred.prototype.then = function then() {
	    return Promise.prototype.then.apply(this._promise, arguments);
	  };

	  Deferred.prototype.done = function done() {
	    Promise.prototype.done.apply(this._promise, arguments);
	  };

	  Deferred.prototype.isSettled = function isSettled() {
	    return this._settled;
	  };

	  return Deferred;
	})();

	module.exports = Deferred;

/***/ },
/* 49 */
/***/ function(module, exports) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ErrorUtils
	 */

	/* jslint unused:false */

	"use strict";

	var ErrorUtils = {
	  applyWithGuard: function applyWithGuard(callback, context, args, onError, name) {
	    return callback.apply(context, args);
	  },
	  guard: function guard(callback, name) {
	    return callback;
	  }
	};

	module.exports = ErrorUtils;

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule Map
	 */

	'use strict';

	module.exports = __webpack_require__(221);

/***/ },
/* 51 */
13,
/* 52 */
/***/ function(module, exports) {

	// Thank's IE8 for his funny defineProperty
	'use strict';

	module.exports = !!(function () {
	  try {
	    return Object.defineProperty({}, 'a', { get: function get() {
	        return 2;
	      } }).a == 2;
	  } catch (e) {/* empty */}
	})();

/***/ },
/* 53 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_53__;

/***/ },
/* 54 */
/***/ function(module, exports) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule GraphQLMutatorConstants
	 * @typechecks
	 */

	'use strict';

	var GraphQLMutatorConstants = {
	  APPEND: 'append',
	  PREPEND: 'prepend',
	  REMOVE: 'remove',

	  NODE_DELETE_HANDLER: 'node_delete',
	  RANGE_ADD_HANDLER: 'range_add',
	  RANGE_DELETE_HANDLER: 'range_delete',

	  HANDLER_TYPES: {},

	  OPTIMISTIC_UPDATE: 'optimistic',
	  SERVER_UPDATE: 'server',
	  POLLER_UPDATE: 'poller',

	  UPDATE_TYPES: {},

	  RANGE_OPERATIONS: {}
	};

	GraphQLMutatorConstants.HANDLER_TYPES[GraphQLMutatorConstants.NODE_DELETE_HANDLER] = true;
	GraphQLMutatorConstants.HANDLER_TYPES[GraphQLMutatorConstants.RANGE_ADD_HANDLER] = true;
	GraphQLMutatorConstants.HANDLER_TYPES[GraphQLMutatorConstants.RANGE_DELETE_HANDLER] = true;

	GraphQLMutatorConstants.UPDATE_TYPES[GraphQLMutatorConstants.OPTIMISTIC_UPDATE] = true;
	GraphQLMutatorConstants.UPDATE_TYPES[GraphQLMutatorConstants.SERVER_UPDATE] = true;
	GraphQLMutatorConstants.UPDATE_TYPES[GraphQLMutatorConstants.POLLER_UPDATE] = true;

	GraphQLMutatorConstants.RANGE_OPERATIONS[GraphQLMutatorConstants.APPEND] = true;
	GraphQLMutatorConstants.RANGE_OPERATIONS[GraphQLMutatorConstants.PREPEND] = true;
	GraphQLMutatorConstants.RANGE_OPERATIONS[GraphQLMutatorConstants.REMOVE] = true;

	module.exports = GraphQLMutatorConstants;

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule RelayPropTypes
	 * 
	 * @typechecks
	 */

	'use strict';

	var _require = __webpack_require__(53);

	var PropTypes = _require.PropTypes;

	var isRelayContainer = __webpack_require__(89);

	var RelayPropTypes = {
	  Container: function Container(props, propName) {
	    var component = props[propName];
	    if (component == null) {
	      return new Error('Required prop `Component` was not specified in `RelayRootContainer`.');
	    } else if (!isRelayContainer(component)) {
	      return new Error('Invalid prop `Component` supplied to `RelayRootContainer`, ' + 'expected a RelayContainer.');
	    }
	    return null;
	  },

	  QueryConfig: PropTypes.shape({
	    name: PropTypes.string.isRequired,
	    params: PropTypes.object.isRequired,
	    queries: PropTypes.object.isRequired,
	    uri: PropTypes.object
	  })
	};

	module.exports = RelayPropTypes;

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule RelayQL
	 * @typechecks
	 * 
	 */

	'use strict';

	var _Object$assign = __webpack_require__(46)['default'];

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	var GraphQL = __webpack_require__(18);
	var RelayFragmentReference = __webpack_require__(41);
	var RelayRouteFragment = __webpack_require__(81);

	var invariant = __webpack_require__(1);
	var warning = __webpack_require__(10);

	/**
	 * @public
	 *
	 * This is a tag function used with template strings to provide the facade of a
	 * runtime GraphQL parser. Example usage:
	 *
	 *   Relay.QL`fragment on User { name }`
	 *
	 * In actuality, a Babel transform parses these tag templates and replaces it
	 * with an internal representation of the query structure.
	 */
	function RelayQL(strings) {
	   true ?  true ? invariant(false, 'RelayQL: Unexpected invocation at runtime. Either the Babel transform ' + 'was not set up, or it failed to identify this call site. Make sure it ' + 'is being used verbatim as `Relay.QL`.') : invariant(false) : undefined;
	}

	/**
	 * Private helper methods used by the transformed code.
	 */
	_Object$assign(RelayQL, {
	  __GraphQL: GraphQL,
	  __frag: function __frag(substitution) {
	    if (typeof substitution === 'function') {
	      // Route conditional fragment, e.g. `${route => matchRoute(route, ...)}`.
	      return new RelayRouteFragment(substitution);
	    }
	    if (substitution != null) {
	      !(substitution instanceof RelayFragmentReference || GraphQL.isFragment(substitution)) ?  true ? invariant(false, 'RelayQL: Invalid fragment composition, use ' + '`${Child.getFragment(\'name\')}`.') : invariant(false) : undefined;
	    }
	    return substitution;
	  },
	  // NOTE: This exists to support deprecated usage of `${variables.value}`.
	  __var: function __var(substitution) {
	    if (substitution === undefined) {
	       true ? warning(false, 'RelayQL: Invalid undefined argument; use null.') : undefined;
	      substitution = null;
	    } else if (!GraphQL.isCallVariable(substitution)) {
	       true ? warning(false, 'RelayQL: Invalid argument `%s` supplied via template substitution. ' + 'Instead, use an inline argument (e.g. `field(size: 32)`) or a ' + 'variable (e.g. `field(size: $size)`).', substitution) : undefined;
	    }
	    return substitution;
	  }
	});

	module.exports = RelayQL;

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule RelayQueryPath
	 * 
	 * @typechecks
	 */

	// Placeholder to mark fields as non-scalar
	'use strict';

	var _classCallCheck = __webpack_require__(2)['default'];

	var _extends = __webpack_require__(11)['default'];

	var RelayNodeInterface = __webpack_require__(15);
	var GraphQLStoreDataHandler = __webpack_require__(8);
	var RelayQuery = __webpack_require__(3);
	var RelayQuerySerializer = __webpack_require__(147);

	var invariant = __webpack_require__(1);

	var EMPTY_FRAGMENT = RelayQuery.Node.buildFragment('$RelayQueryPath', 'Node');

	/**
	 * @internal
	 *
	 * Represents the path (root plus fields) within a query that fetched a
	 * particular node. Each step of the path may represent a root query (for
	 * refetchable nodes) or the field path from the nearest refetchable node.
	 */

	var RelayQueryPath = (function () {
	  function RelayQueryPath(node, parent) {
	    _classCallCheck(this, RelayQueryPath);

	    if (node instanceof RelayQuery.Root) {
	      !!parent ?  true ? invariant(false, 'RelayQueryPath: Root paths may not have a parent.') : invariant(false) : undefined;
	      this._name = node.getName();
	    } else {
	      !parent ?  true ? invariant(false, 'RelayQueryPath: A parent is required for field paths.') : invariant(false) : undefined;
	      this._name = parent.getName();
	    }
	    this._node = node;
	    this._parent = parent;
	  }

	  /**
	   * Creates a shallow version of `node` with only a primary key field. If the
	   * node is not scalar and would otherwise be empty, an empty fragment is added.
	   */

	  /**
	   * Returns true if this is a root path (the node is a root node with an ID),
	   * false otherwise.
	   */

	  RelayQueryPath.prototype.isRootPath = function isRootPath() {
	    return !this._parent;
	  };

	  /**
	   * Gets the parent path, throwing if it does not exist. Use `!isRootPath()`
	   * to check if there is a parent.
	   */

	  RelayQueryPath.prototype.getParent = function getParent() {
	    var parent = this._parent;
	    !parent ?  true ? invariant(false, 'RelayQueryPath.getParent(): Cannot get the parent of a root path.') : invariant(false) : undefined;
	    return parent;
	  };

	  /**
	   * Helper to get the name of the root query node.
	   */

	  RelayQueryPath.prototype.getName = function getName() {
	    return this._name;
	  };

	  /**
	   * Gets a new path that describes how to access the given `node` via the
	   * current path. Returns a new, root path if `dataID` is provided and
	   * refetchable, otherwise returns an extension of the current path.
	   */

	  RelayQueryPath.prototype.getPath = function getPath(node, dataID) {
	    if (GraphQLStoreDataHandler.isClientID(dataID)) {
	      return new RelayQueryPath(node, this);
	    } else {
	      // refetchable ID
	      var root = RelayQuery.Node.buildRoot(RelayNodeInterface.NODE, dataID, [RelayQuery.Node.buildField('id')], { rootArg: RelayNodeInterface.ID }, this.getName());
	      return new RelayQueryPath(root);
	    }
	  };

	  /**
	   * Returns a new root query that follows only the fields in this path and then
	   * appends the specified field/fragment at the node reached by the path.
	   *
	   * The query also includes any ID fields along the way.
	   */

	  RelayQueryPath.prototype.getQuery = function getQuery(appendNode) {
	    var node = this._node;
	    var path = this;
	    var child = appendNode;
	    while (node instanceof RelayQuery.Field) {
	      var idFieldName = node.getInferredPrimaryKey();
	      if (idFieldName) {
	        child = node.clone([child, node.getFieldByStorageKey(idFieldName)]);
	      } else {
	        child = node.clone([child]);
	      }
	      path = path._parent;
	      !path ?  true ? invariant(false, 'RelayQueryPath.getQuery(): Expected field to have a parent path.') : invariant(false) : undefined;
	      node = path._node;
	    }
	    !child ?  true ? invariant(false, 'RelayQueryPath: Expected a leaf node.') : invariant(false) : undefined;
	    !(node instanceof RelayQuery.Root) ?  true ? invariant(false, 'RelayQueryPath: Expected a root node.') : invariant(false) : undefined;
	    var rootCall = node.getRootCall();
	    return RelayQuery.Node.buildRoot(rootCall.name, rootCall.value, [child, node.getFieldByStorageKey('id')], _extends({}, node.__concreteNode__.metatada, {
	      rootArg: node.getRootCallArgument()
	    }), this.getName());
	  };

	  RelayQueryPath.prototype.toJSON = function toJSON() {
	    var path = [];
	    var next = this;
	    while (!!next) {
	      path.unshift(RelayQuerySerializer.toJSON(getShallowClone(next._node)));
	      next = next._parent;
	    }
	    return path;
	  };

	  RelayQueryPath.fromJSON = function fromJSON(data) {
	    !(Array.isArray(data) && data.length > 0) ?  true ? invariant(false, 'RelayQueryPath.fromJSON(): expected an array with at least one item.') : invariant(false) : undefined;
	    var root = RelayQuerySerializer.fromJSON(data[0]);
	    !(root instanceof RelayQuery.Root) ?  true ? invariant(false, 'RelayQueryPath.fromJSON(): invalid path, expected first node to be ' + 'a `RelayQueryRoot`.') : invariant(false) : undefined;
	    var path = new RelayQueryPath(root);

	    for (var ii = 1; ii < data.length; ii++) {
	      var field = RelayQuerySerializer.fromJSON(data[ii]);
	      !(field instanceof RelayQuery.Field) ?  true ? invariant(false, 'RelayQueryPath.fromJSON(): invalid path, expected node at index %s ' + 'to be a `RelayQueryField`.', ii) : invariant(false) : undefined;
	      path = new RelayQueryPath(field, path);
	    }
	    return path;
	  };

	  return RelayQueryPath;
	})();

	function getShallowClone(node) {
	  // cloning with non-empty children guarantees result is non-null
	  if (node instanceof RelayQuery.Field) {
	    var idFieldName = node.getInferredPrimaryKey();
	    var idField = idFieldName && node.getFieldByStorageKey(idFieldName);
	    return node.clone([idField || EMPTY_FRAGMENT]);
	  }
	  return node.clone([node.getFieldByStorageKey('id') || EMPTY_FRAGMENT]);
	}

	module.exports = RelayQueryPath;

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule RelayQueryTransform
	 * 
	 * @typechecks
	 */

	'use strict';

	var _inherits = __webpack_require__(6)['default'];

	var _classCallCheck = __webpack_require__(2)['default'];

	var RelayQueryVisitor = __webpack_require__(21);

	/**
	 * @internal
	 *
	 * `RelayQueryTransform` is a `RelayQueryVisitor` subclass that simplifies the
	 * process of traversing, filtering, or transforming a Relay Query.
	 *
	 * The traversal is a map operation from `RelayQuery` nodes to nodes. The
	 * default implementation traverses all nodes and maps each one to its
	 * original value (ie. a no-op).
	 *
	 * Just like `RelayQueryVisitor`, subclasses of `RelayQueryTransform` can
	 * optionally implement methods to customize the traversal and mapping of
	 * different RelayQuery node types:
	 *
	 * - `visitField(field, state)`: Returns the new value for the visited field, or
	 *   `null` to remove it from the output.
	 * - `visitFragment(fragment, state)`: Returns the new value for the visited
	 *   fragment, or `null` to remove it from the output.
	 * - `visitQuery(fragment, state)`: Returns the new value for the top-level
	 *   query, or `null` to transform the entire query out of existence.
	 *
	 * There are two additional methods for controlling the traversal:
	 *
	 * - `traverse(parent, state)`: Returns a cloned copy of the parent node after
	 *   processing all of its children. Does not clone if nothing changed.
	 * - `visit(child, state)`: Processes the child node, calling the appropriate
	 *   `visit{Field,Fragment,Root` method based on the node type.
	 *
	 * All of these methods may return the original node in order to leave it
	 * intact.
	 *
	 * @see RelayQueryVisitor
	 */

	var RelayQueryTransform = (function (_RelayQueryVisitor) {
	  _inherits(RelayQueryTransform, _RelayQueryVisitor);

	  function RelayQueryTransform() {
	    _classCallCheck(this, RelayQueryTransform);

	    _RelayQueryVisitor.apply(this, arguments);
	  }

	  RelayQueryTransform.prototype.traverse = function traverse(node, nextState) {
	    if (node.isScalar()) {
	      return node;
	    }

	    var nextChildren;
	    var children = node.getChildren();
	    for (var ii = 0; ii < children.length; ii++) {
	      var prevChild = children[ii];
	      var nextChild = this.visit(prevChild, nextState);
	      if (nextChild !== prevChild) {
	        nextChildren = nextChildren || children.slice(0, ii);
	      }
	      if (nextChildren && nextChild) {
	        nextChildren.push(nextChild);
	      }
	    }
	    if (nextChildren) {
	      if (!nextChildren.length) {
	        return null;
	      }
	      return node.clone(nextChildren);
	    }
	    return node;
	  };

	  return RelayQueryTransform;
	})(RelayQueryVisitor);

	module.exports = RelayQueryTransform;

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule buildRQL
	 * 
	 * @typechecks
	 */

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	var GraphQL = __webpack_require__(18);
	var Map = __webpack_require__(50);
	var RelayQL = __webpack_require__(56);

	// Cache results of executing fragment query builders.
	var fragmentCache = new Map();

	// Cache results of executing component-specific route query builders.
	var queryCache = new Map();

	function isDeprecatedCallWithArgCountGreaterThan(nodeBuilder, count) {
	  var argLength = nodeBuilder.length;
	  if (true) {
	    var mockImpl = nodeBuilder;
	    while (mockImpl && mockImpl._getMockImplementation) {
	      mockImpl = mockImpl._getMockImplementation();
	    }
	    if (mockImpl) {
	      argLength = mockImpl.length;
	    }
	  }
	  return argLength > count;
	}

	/**
	 * @internal
	 *
	 * Builds a static node representation using a supplied query or fragment
	 * builder. This is used for routes, containers, and mutations.
	 *
	 * If the supplied fragment builder produces an invalid node (e.g. the wrong
	 * node type), these will return `undefined`. This is not to be confused with
	 * a return value of `null`, which may result from the lack of a node.
	 */
	var buildRQL = {
	  Fragment: function Fragment(fragmentBuilder, variableNames) {
	    var node = fragmentCache.get(fragmentBuilder);
	    if (!node) {
	      var variables = toVariables(variableNames);
	      if (isDeprecatedCallWithArgCountGreaterThan(fragmentBuilder, 1)) {
	        // TODO: Delete legacy support, (_, query, variables) => query`...`.
	        node = fragmentBuilder(undefined, RelayQL, variables);
	      } else {
	        node = fragmentBuilder(variables);
	      }
	      fragmentCache.set(fragmentBuilder, node);
	    }
	    return GraphQL.isFragment(node) ? node : undefined;
	  },

	  Query: (function (_Query) {
	    function Query(_x, _x2, _x3) {
	      return _Query.apply(this, arguments);
	    }

	    Query.toString = function () {
	      return _Query.toString();
	    };

	    return Query;
	  })(function (queryBuilder, Component, variableNames) {
	    var componentCache = queryCache.get(queryBuilder);
	    var node;
	    if (!componentCache) {
	      componentCache = new Map();
	      queryCache.set(queryBuilder, componentCache);
	    } else {
	      node = componentCache.get(Component);
	    }
	    if (!node) {
	      var variables = toVariables(variableNames);
	      if (isDeprecatedCallWithArgCountGreaterThan(queryBuilder, 2)) {
	        // TODO: Delete legacy support, (Component, variables, rql) => rql`...`.
	        node = queryBuilder(Component, variables, RelayQL);
	      } else {
	        node = queryBuilder(Component, variables);
	      }
	      componentCache.set(Component, node);
	    }
	    if (node) {
	      return GraphQL.isQuery(node) ? node : undefined;
	    }
	    return null;
	  })
	};

	function toVariables(variableNames) {
	  var variables = {};
	  variableNames.forEach(function (name) {
	    variables[name] = new GraphQL.CallVariable(name);
	  });
	  return variables;
	}

	module.exports = buildRQL;

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule callsFromGraphQL
	 * 
	 * @typechecks
	 */

	'use strict';

	var GraphQL = __webpack_require__(18);

	var invariant = __webpack_require__(1);

	/**
	 * @internal
	 *
	 * Convert from GraphQL call nodes to plain object `{name,value}` calls.
	 */
	function callsFromGraphQL(concreteCalls, variables) {
	  var orderedCalls = [];
	  for (var ii = 0; ii < concreteCalls.length; ii++) {
	    var _concreteCalls$ii = concreteCalls[ii];
	    var name = _concreteCalls$ii.name;
	    var value = _concreteCalls$ii.value;

	    // Batch calls are handled separately
	    if (GraphQL.isBatchCallVariable(value) || Array.isArray(value) && value.some(GraphQL.isBatchCallVariable)) {
	      value = null;
	    } else if (Array.isArray(value)) {
	      value = value.map(function (arg) {
	        return getCallValue(arg, variables);
	      });
	    } else if (value != null) {
	      value = getCallValue(value, variables);
	    }

	    orderedCalls.push({ name: name, value: value });
	  }
	  return orderedCalls;
	}

	function getCallValue(arg, variables) {
	  if (GraphQL.isCallVariable(arg)) {
	    var variableName = arg.callVariableName;
	    !variables.hasOwnProperty(variableName) ?  true ? invariant(false, 'callsFromGraphQL(): Expected a declared value for variable, `<%s>`.', variableName) : invariant(false) : undefined;
	    return variables[variableName];
	  } else {
	    !GraphQL.isCallValue(arg) ?  true ? invariant(false, 'callsFromGraphQL(): Expected an inline value or variable, got `%s`.', JSON.stringify(arg)) : invariant(false) : undefined;
	    return arg.callValue;
	  }
	}

	module.exports = callsFromGraphQL;

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule filterExclusiveKeys
	 * @typechecks
	 * 
	 */

	'use strict';

	var _Object$keys = __webpack_require__(5)['default'];

	var hasOwnProperty = Object.prototype.hasOwnProperty;

	/**
	 * Returns two arrays of keys that contain each object's exclusive keys.
	 */
	function filterExclusiveKeys(a, b) {
	  var keysA = a ? _Object$keys(a) : [];
	  var keysB = b ? _Object$keys(b) : [];

	  if (keysA.length === 0 || keysB.length === 0) {
	    return [keysA, keysB];
	  }
	  return [keysA.filter(function (key) {
	    return !hasOwnProperty.call(b, key);
	  }), keysB.filter(function (key) {
	    return !hasOwnProperty.call(a, key);
	  })];
	}

	module.exports = filterExclusiveKeys;

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule generateClientID
	 * @typechecks
	 */

	'use strict';

	var crc32 = __webpack_require__(106);
	var performanceNow = __webpack_require__(218);

	var _clientID = 1;
	var _prefix = 'client:' + crc32('' + performanceNow());

	/**
	 * Generate a unique clientID for GraphQL data objects that do not already have
	 * an ID or their ID = null
	 *
	 * @internal
	 */
	function generateClientID() {
	  return _prefix + _clientID++;
	}

	module.exports = generateClientID;

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule readRelayQueryData
	 * 
	 * @typechecks
	 */

	'use strict';

	var _inherits = __webpack_require__(6)['default'];

	var _classCallCheck = __webpack_require__(2)['default'];

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	var GraphQLStoreDataHandler = __webpack_require__(8);
	var GraphQLFragmentPointer = __webpack_require__(37);
	var GraphQLStoreRangeUtils = __webpack_require__(39);
	var RelayConnectionInterface = __webpack_require__(9);

	var RelayProfiler = __webpack_require__(4);
	var RelayQuery = __webpack_require__(3);
	var RelayQueryVisitor = __webpack_require__(21);
	var RelayRecordStatus = __webpack_require__(42);

	var callsFromGraphQL = __webpack_require__(60);
	var callsToGraphQL = __webpack_require__(82);
	var invariant = __webpack_require__(1);
	var validateRelayReadQuery = __webpack_require__(169);

	var EDGES = RelayConnectionInterface.EDGES;
	var PAGE_INFO = RelayConnectionInterface.PAGE_INFO;

	/**
	 * @internal
	 *
	 * Retrieves data from the `RelayStore`.
	 */
	function readRelayQueryData(store, queryNode, dataID, options) {
	  var reader = new RelayStoreReader(store, options);
	  var data = reader.retrieveData(queryNode, dataID);

	  // We validate only after retrieving the data, to give our `invariant`
	  // checks below a chance to fail fast.
	  validateRelayReadQuery(queryNode, options);

	  return data;
	}

	var RelayStoreReader = (function (_RelayQueryVisitor) {
	  _inherits(RelayStoreReader, _RelayQueryVisitor);

	  function RelayStoreReader(recordStore, options) {
	    _classCallCheck(this, RelayStoreReader);

	    _RelayQueryVisitor.call(this);
	    this._recordStore = recordStore;
	    this._traverseFragmentReferences = options && options.traverseFragmentReferences || false;
	    this._traverseGeneratedFields = options && options.traverseGeneratedFields || false;
	  }

	  /**
	   * Checks that `parent` either has range calls on it or does not contain either
	   * `page_info` or `edges` fields. This enforcement intentionally transcends
	   * traverseFragmentReferences boundaries.
	   */

	  /**
	   * Runs `queryNode` against the data in `dataID` and returns the result.
	   */

	  RelayStoreReader.prototype.retrieveData = function retrieveData(queryNode, dataID) {
	    var result = {
	      data: undefined,
	      dataIDs: {}
	    };
	    var rangeData = GraphQLStoreRangeUtils.parseRangeClientID(dataID);
	    var status = this._recordStore.getRecordStatus(rangeData ? rangeData.dataID : dataID);
	    if (status === RelayRecordStatus.EXISTENT) {
	      var state = {
	        componentDataID: null,
	        data: undefined,
	        parent: null,
	        rangeInfo: null,
	        seenDataIDs: result.dataIDs,
	        storeDataID: dataID
	      };
	      this.visit(queryNode, state);
	      result.data = state.data;
	    } else if (status === RelayRecordStatus.NONEXISTENT) {
	      result.data = null;
	    }
	    return result;
	  };

	  RelayStoreReader.prototype.visitField = function visitField(node, state) {
	    // Check for range client IDs (eg. `someID_first(25)`) and unpack if
	    // present, overriding `state`.
	    this._handleRangeInfo(node, state);

	    if (!node.isScalar() || node.isGenerated()) {
	      // Make sure we return at least the __dataID__.
	      getDataObject(state);
	    }

	    if (node.isGenerated() && !this._traverseGeneratedFields) {
	      return;
	    }
	    var rangeInfo = state.rangeInfo;
	    if (rangeInfo && node.getSchemaName() === EDGES) {
	      this._readEdges(node, rangeInfo, state);
	    } else if (rangeInfo && node.getSchemaName() === PAGE_INFO) {
	      this._readPageInfo(node, rangeInfo, state);
	    } else if (node.isScalar()) {
	      this._readScalar(node, state);
	    } else if (node.isPlural()) {
	      this._readPlural(node, state);
	    } else if (node.isConnection()) {
	      this._readConnection(node, state);
	    } else {
	      this._readLinkedField(node, state);
	    }
	    state.seenDataIDs[state.storeDataID] = true;
	  };

	  RelayStoreReader.prototype.visitFragment = function visitFragment(node, state) {
	    if (node.isReferenceFragment() && !this._traverseFragmentReferences) {
	      var dataID = getComponentDataID(state);
	      var fragmentPointer = new GraphQLFragmentPointer(node.isPlural() ? [dataID] : dataID, node);
	      this._setDataValue(state, fragmentPointer.getFragment().getConcreteFragmentID(), fragmentPointer);
	    } else {
	      this.traverse(node, state);
	    }
	  };

	  RelayStoreReader.prototype._readScalar = function _readScalar(node, state) {
	    var storageKey = node.getStorageKey();
	    var field = this._recordStore.getField(state.storeDataID, storageKey);
	    if (field === undefined) {
	      return;
	    } else if (field === null && !state.data) {
	      state.data = null;
	    } else {
	      this._setDataValue(state, node.getApplicationName(), Array.isArray(field) ? field.slice() : field);
	    }
	  };

	  RelayStoreReader.prototype._readPlural = function _readPlural(node, state) {
	    var _this = this;

	    var storageKey = node.getStorageKey();
	    var dataIDs = this._recordStore.getLinkedRecordIDs(state.storeDataID, storageKey);
	    if (dataIDs) {
	      var applicationName = node.getApplicationName();
	      var previousData = getDataValue(state, applicationName);
	      var nextData = dataIDs.map(function (dataID, ii) {
	        var data;
	        if (previousData instanceof Object) {
	          data = previousData[ii];
	        }
	        var nextState = {
	          componentDataID: null,
	          data: data,
	          parent: node,
	          rangeInfo: null,
	          seenDataIDs: state.seenDataIDs,
	          storeDataID: dataID
	        };
	        node.getChildren().forEach(function (child) {
	          return _this.visit(child, nextState);
	        });
	        return nextState.data;
	      });
	      this._setDataValue(state, applicationName, nextData);
	    }
	  };

	  RelayStoreReader.prototype._readConnection = function _readConnection(node, state) {
	    var applicationName = node.getApplicationName();
	    var storageKey = node.getStorageKey();
	    var calls = node.getCallsWithValues();
	    var dataID = this._recordStore.getLinkedRecordID(state.storeDataID, storageKey);
	    if (!dataID) {
	      return;
	    }
	    enforceRangeCalls(node);
	    var metadata = this._recordStore.getRangeMetadata(dataID, calls);
	    var nextState = {
	      componentDataID: getConnectionClientID(node, dataID),
	      data: getDataValue(state, applicationName),
	      parent: node,
	      rangeInfo: metadata && calls.length ? metadata : null,
	      seenDataIDs: state.seenDataIDs,
	      storeDataID: dataID
	    };
	    this.traverse(node, nextState);
	    this._setDataValue(state, applicationName, nextState.data);
	  };

	  RelayStoreReader.prototype._readEdges = function _readEdges(node, rangeInfo, state) {
	    var _this2 = this;

	    var previousData = getDataValue(state, EDGES);
	    var edges = rangeInfo.requestedEdges.map(function (edgeData, ii) {
	      var data;
	      if (previousData instanceof Object) {
	        data = previousData[ii];
	      }
	      var nextState = {
	        componentDataID: null,
	        data: data,
	        parent: node,
	        rangeInfo: null,
	        seenDataIDs: state.seenDataIDs,
	        storeDataID: edgeData.edgeID
	      };
	      _this2.traverse(node, nextState);
	      return nextState.data;
	    });
	    this._setDataValue(state, EDGES, edges);
	  };

	  RelayStoreReader.prototype._readPageInfo = function _readPageInfo(node, rangeInfo, state) {
	    var _this3 = this;

	    var pageInfo = rangeInfo.pageInfo;

	    !pageInfo ?  true ? invariant(false, 'readRelayQueryData(): Missing field, `%s`.', PAGE_INFO) : invariant(false) : undefined;
	    var info = pageInfo; // for Flow
	    var nextData;

	    // Page info comes from the range metadata, so we do a custom traversal here
	    // which is simpler than passing through page-info-related state as a hint
	    // for the normal traversal.
	    var read = function read(child) {
	      if (child instanceof RelayQuery.Fragment) {
	        if (child.isReferenceFragment() && !_this3._traverseFragmentReferences) {
	          var fragmentPointer = new GraphQLFragmentPointer(getComponentDataID(state), child);
	          nextData = nextData || {};
	          var concreteFragmentID = fragmentPointer.getFragment().getConcreteFragmentID();
	          nextData[concreteFragmentID] = fragmentPointer;
	        } else {
	          child.getChildren().forEach(read);
	        }
	      } else {
	        var field = child;
	        if (!field.isGenerated() || _this3._traverseGeneratedFields) {
	          nextData = nextData || {};
	          nextData[field.getApplicationName()] = info[field.getStorageKey()];
	        }
	      }
	    };
	    node.getChildren().forEach(read);

	    this._setDataValue(state, PAGE_INFO, nextData);
	  };

	  RelayStoreReader.prototype._readLinkedField = function _readLinkedField(node, state) {
	    var storageKey = node.getStorageKey();
	    var applicationName = node.getApplicationName();
	    var dataID = this._recordStore.getLinkedRecordID(state.storeDataID, storageKey);
	    if (dataID == null) {
	      this._setDataValue(state, applicationName, dataID);
	      return;
	    }
	    var nextState = {
	      componentDataID: null,
	      data: getDataValue(state, applicationName),
	      parent: node,
	      rangeInfo: null,
	      seenDataIDs: state.seenDataIDs,
	      storeDataID: dataID
	    };
	    var status = this._recordStore.getRecordStatus(dataID);
	    if (status === RelayRecordStatus.EXISTENT) {
	      // Make sure we return at least the __dataID__.
	      getDataObject(nextState);
	    }
	    this.traverse(node, nextState);
	    this._setDataValue(state, applicationName, nextState.data);
	  };

	  /**
	   * Assigns `value` to the property of `state.data` identified by `key`.
	   *
	   * Pre-populates `state` with a suitable `data` object if needed, and copies
	   * over any `__status__` field, if present.
	   */

	  RelayStoreReader.prototype._setDataValue = function _setDataValue(state, key, value) {
	    var data = getDataObject(state); // ensure __dataID__
	    if (value === undefined) {
	      return;
	    }
	    data[key] = value;

	    // Copy over the status, if any.
	    var status = this._recordStore.getField(state.storeDataID, '__status__');
	    if (status != null) {
	      data.__status__ = status;
	    }
	  };

	  /**
	   * Checks to see if we have a range client ID (eg. `someID_first(25)`), and if
	   * so, unpacks the range metadata, stashing it into (and overriding) `state`.
	   */

	  RelayStoreReader.prototype._handleRangeInfo = function _handleRangeInfo(node, state) {
	    var rangeData = GraphQLStoreRangeUtils.parseRangeClientID(state.storeDataID);
	    if (rangeData != null) {
	      state.componentDataID = state.storeDataID;
	      state.storeDataID = rangeData.dataID;
	      state.rangeInfo = this._recordStore.getRangeMetadata(state.storeDataID, callsFromGraphQL(rangeData.calls, rangeData.callValues));
	    }
	  };

	  return RelayStoreReader;
	})(RelayQueryVisitor);

	function enforceRangeCalls(parent) {
	  if (!parent.__hasValidatedConnectionCalls__) {
	    var calls = parent.getCallsWithValues();
	    if (!RelayConnectionInterface.hasRangeCalls(calls)) {
	      rangeCallEnforcer.traverse(parent, parent);
	    }
	    parent.__hasValidatedConnectionCalls__ = true;
	  }
	}

	var RelayRangeCallEnforcer = (function (_RelayQueryVisitor2) {
	  _inherits(RelayRangeCallEnforcer, _RelayQueryVisitor2);

	  function RelayRangeCallEnforcer() {
	    _classCallCheck(this, RelayRangeCallEnforcer);

	    _RelayQueryVisitor2.apply(this, arguments);
	  }

	  RelayRangeCallEnforcer.prototype.visitField = function visitField(node, parent) {
	    var schemaName = node.getSchemaName();
	    !(schemaName !== EDGES && schemaName !== PAGE_INFO) ?  true ? invariant(false, 'readRelayQueryData(): The field `%s` is a connection. Fields `%s` and ' + '`%s` cannot be fetched without a `first`, `last` or `find` argument.', parent.getApplicationName(), EDGES, PAGE_INFO) : invariant(false) : undefined;
	  };

	  return RelayRangeCallEnforcer;
	})(RelayQueryVisitor);

	var rangeCallEnforcer = new RelayRangeCallEnforcer();

	/**
	 * Obtains a client ID (eg. `someDataID_first(10)`) for the connection
	 * identified by `connectionID`. If there are no range calls on the supplied
	 * `node`, then a call-less connection ID (eg. `someDataID`) will be returned
	 * instead.
	 */
	function getConnectionClientID(node, connectionID) {
	  var calls = node.getCallsWithValues();
	  if (!RelayConnectionInterface.hasRangeCalls(calls)) {
	    return connectionID;
	  }
	  return GraphQLStoreRangeUtils.getClientIDForRangeWithID(callsToGraphQL(calls), {}, connectionID);
	}

	/**
	 * Returns the component-specific DataID stored in `state`, falling back to the
	 * generic "store" DataID.
	 *
	 * For most nodes, the generic "store" DataID can be used for both reading out
	 * of the store and writing into the result object that will be passed back to
	 * the component. For connections with range calls on them the "store" and
	 * "component" ID will be different because the component needs a special
	 * client-ID that encodes the range calls.
	 */
	function getComponentDataID(state) {
	  if (state.componentDataID != null) {
	    return state.componentDataID;
	  } else {
	    return state.storeDataID;
	  }
	}

	/**
	 * Retrieves `state.data`, initializing it if necessary.
	 */
	function getDataObject(state) {
	  var data = state.data;
	  if (!data) {
	    var pointer = GraphQLStoreDataHandler.createPointerWithID(getComponentDataID(state));
	    data = state.data = pointer;
	  }
	  !(data instanceof Object) ?  true ? invariant(false, 'readRelayQueryData(): Unable to read field on non-object.') : invariant(false) : undefined;
	  return data;
	}

	/**
	 * Looks up the value identified by `key` in `state.data`.
	 *
	 * Pre-populates `state` with a suitable `data` objects if needed.
	 */
	function getDataValue(state, key) {
	  var data = getDataObject(state);
	  return data[key];
	}

	var instrumented = RelayProfiler.instrument('readRelayQueryData', readRelayQueryData);

	// #7573861: Type export collides with CommonJS export in presence of
	// `instrument()` call:
	module.exports = instrumented;

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	module.exports = { "default": __webpack_require__(184), __esModule: true };

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _Object$defineProperty = __webpack_require__(176)["default"];

	exports["default"] = function (obj, key, value) {
	  if (key in obj) {
	    _Object$defineProperty(obj, key, {
	      value: value,
	      enumerable: true,
	      configurable: true,
	      writable: true
	    });
	  } else {
	    obj[key] = value;
	  }

	  return obj;
	};

	exports.__esModule = true;

/***/ },
/* 66 */
[253, 68],
/* 67 */
/***/ function(module, exports) {

	"use strict";

	var hasOwnProperty = ({}).hasOwnProperty;
	module.exports = function (it, key) {
	  return hasOwnProperty.call(it, key);
	};

/***/ },
/* 68 */
/***/ function(module, exports) {

	// http://jsperf.com/core-js-isobject
	'use strict';

	module.exports = function (it) {
	  return it !== null && (typeof it == 'object' || typeof it == 'function');
	};

/***/ },
/* 69 */
[272, 201, 99],
/* 70 */
/***/ function(module, exports) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule nullthrows
	 * 
	 */

	"use strict";

	var nullthrows = function nullthrows(x) {
	  if (x != null) {
	    return x;
	  }
	  throw new Error("Got unexpected null or undefined");
	};

	module.exports = nullthrows;

/***/ },
/* 71 */
/***/ function(module, exports) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule shallowEqual
	 * @typechecks
	 * 
	 */

	'use strict';

	var hasOwnProperty = Object.prototype.hasOwnProperty;

	/**
	 * Performs equality by iterating through keys on an object and returning false
	 * when any key has values which are not strictly equal between the arguments.
	 * Returns true when the values of all keys are strictly equal.
	 */
	function shallowEqual(objA, objB) {
	  if (objA === objB) {
	    return true;
	  }

	  if (typeof objA !== 'object' || objA === null || typeof objB !== 'object' || objB === null) {
	    return false;
	  }

	  var keysA = Object.keys(objA);
	  var keysB = Object.keys(objB);

	  if (keysA.length !== keysB.length) {
	    return false;
	  }

	  // Test for A's keys different from B.
	  var bHasOwnProperty = hasOwnProperty.bind(objB);
	  for (var i = 0; i < keysA.length; i++) {
	    if (!bHasOwnProperty(keysA[i]) || objA[keysA[i]] !== objB[keysA[i]]) {
	      return false;
	    }
	  }

	  return true;
	}

	module.exports = shallowEqual;

/***/ },
/* 72 */
/***/ function(module, exports) {

	"use strict";

	module.exports = function (it) {
	  if (it == undefined) throw TypeError("Can't call method on  " + it);
	  return it;
	};

/***/ },
/* 73 */
67,
/* 74 */
[262, 230, 116, 123, 24, 73, 20, 35, 229, 25, 75, 119],
/* 75 */
[266, 73, 24, 20],
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule DliteFetchModeConstants
	 * @typechecks
	 */

	'use strict';

	var keyMirror = __webpack_require__(216);

	var DliteFetchModeConstants = keyMirror({
	  FETCH_MODE_CLIENT: null,
	  FETCH_MODE_PRELOAD: null,
	  FETCH_MODE_REFETCH: null
	});

	module.exports = DliteFetchModeConstants;

/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule GraphQLDeferredQueryTracker
	 * @typechecks
	 * 
	 */

	'use strict';

	var _Object$assign = __webpack_require__(46)['default'];

	var ErrorUtils = __webpack_require__(49);
	var Map = __webpack_require__(50);

	var RelayStoreData = __webpack_require__(12);

	var forEachObject = __webpack_require__(7);
	var forEachRootCallArg = __webpack_require__(28);
	var invariant = __webpack_require__(1);
	var isEmpty = __webpack_require__(215);
	var resolveImmediate = __webpack_require__(19);

	var recordStore = RelayStoreData.getDefaultInstance().getRecordStore();

	/**
	 * List of all subscriptions of form {callback, dataID, fragmentID}
	 */
	var subscribers = [];

	/**
	 * List of all deferred queries that have resolved/failed since last broadcast.
	 */
	var broadcastItems = null;

	/**
	 * Map of pending dataID => Set<fragmentID>
	 * Stores a set as object<string,string> of all pending deferred fragmentIDs
	 * for a given dataID. Presence of dataID => fragmentID pair
	 * means that the query is pending, absence that it has resolved.
	 */
	var dataIDToFragmentNameMap = new Map();

	/**
	 * Map of pending rootCall => Set<fragmentID>
	 * Stores a temporary mapping of fragmentIDs when the correct dataID is
	 * unknown. Entries will get moved to dataIDToFragmentNameMap as the dataID
	 * for the rootCall is determinble.
	 */
	var rootCallToFragmentNameMap = new Map();

	/**
	 * Map of parent query ID => [child queries]
	 */
	var parentToChildQueryMap = new Map();

	/**
	 * This module tracks pending queries and maintains information about which
	 * deferred data is pending or resolved. It also provides a method to observe
	 * when a deferred query for a given node either resolves or fails.
	 *
	 * @internal
	 */
	var GraphQLDeferredQueryTracker = {

	  /**
	   * Add a listener for when the given fragment resolves/fails for dataID.
	   * Returns a subscription object {remove} where calling remove cancels the
	   * subscription.
	   */
	  addListenerForFragment: function addListenerForFragment(dataID, fragmentID, callbacks) {
	    var subscriber = {
	      callbacks: callbacks,
	      dataID: dataID,
	      fragmentID: fragmentID
	    };
	    subscribers.push(subscriber);
	    return {
	      remove: function remove() {
	        var index = subscribers.indexOf(subscriber);
	        !(index >= 0) ?  true ? invariant(false, 'remove() can only be called once') : invariant(false) : undefined;
	        subscribers[index] = null;
	      }
	    };
	  },

	  /**
	   * Record the query as being sent, updating internal tracking to note
	   * that the dataID/fragment pairs are pending.
	   */
	  recordQuery: function recordQuery(query) {
	    var parentID = getQueryParentID(query);
	    if (parentID) {
	      // child query: record parent => [children] list
	      var children = parentToChildQueryMap.get(parentID) || [];
	      children.push(query);
	      parentToChildQueryMap.set(parentID, children);
	    } else {
	      var deferredFragmentNames = query.getDeferredFragmentNames();
	      if (deferredFragmentNames) {
	        // deferred query: record ID => fragment set
	        var dataIDs = getRootCallToIDMap(query);
	        forEachObject(dataIDs, function (dataID, rootCall) {
	          if (dataID) {
	            var dataIDSet = dataIDToFragmentNameMap.get(dataID) || {};
	            _Object$assign(dataIDSet, deferredFragmentNames); // set union
	            dataIDToFragmentNameMap.set(dataID, dataIDSet);
	          } else {
	            var rootCallSet = rootCallToFragmentNameMap.get(rootCall) || {};
	            _Object$assign(rootCallSet, deferredFragmentNames);
	            rootCallToFragmentNameMap.set(rootCall, rootCallSet);
	          }
	        });
	      }
	    }
	  },

	  /**
	   * Record the query as being resolved with the given data, updating
	   * internal tracking and firing subscriptions.
	   */
	  resolveQuery: function resolveQuery(query, response, refParams) {
	    var parentID = getQueryParentID(query);
	    resolveFragmentsForRootCall(query);
	    if (query.isDeferred()) {
	      resolveDeferredQuery(query, broadcastChangeForFragment, refParams);
	      if (parentID) {
	        resolveDeferredRefQuery(query);
	      }
	    } else if (response) {
	      resolveDeferredParentQuery(query, response);
	    }
	  },

	  /**
	   * Record that the query has resolved with an error.
	   */
	  rejectQuery: function rejectQuery(query, error) {
	    var parentID = getQueryParentID(query);
	    if (query.isDeferred()) {
	      rejectDeferredFragmentsForRootCall(query);
	      resolveDeferredQuery(query, function (dataID, fragmentID) {
	        broadcastErrorForFragment(dataID, fragmentID, error);
	      });
	      if (parentID) {
	        resolveDeferredRefQuery(query);
	      }
	    } else {
	      rejectDeferredParentQuery(query);
	    }
	  },

	  /**
	   * Determine if the given query is pending by checking if it is fetching
	   * the same dataID/fragments as any pending queries.
	   */
	  isQueryPending: function isQueryPending(dataID, fragmentID) {
	    if (dataIDToFragmentNameMap.has(dataID)) {
	      var dataIDSet = dataIDToFragmentNameMap.get(dataID);
	      if (dataIDSet.hasOwnProperty(fragmentID)) {
	        return true;
	      }
	    }

	    return false;
	  },

	  /**
	   * Clear all query tracking and subscriptions.
	   */
	  reset: function reset() {
	    dataIDToFragmentNameMap = new Map();
	    parentToChildQueryMap = new Map();
	    rootCallToFragmentNameMap = new Map();
	    subscribers = [];
	    broadcastItems = null;
	  }
	};

	/**
	 * Clears all pending dataID => fragmentID associations for this query
	 * and calls the callback for each (dataID, fragmentID) pair.
	 */
	function resolveDeferredQuery(query, callback, refParams) {
	  var deferredFragmentNames = query.getDeferredFragmentNames();
	  if (!deferredFragmentNames) {
	    return;
	  }
	  var dataIDs = {};
	  var batchCall = query.getBatchCall();
	  if (batchCall) {
	    // refParams can be undefined if the node is null in the parent query.
	    var refIDs = refParams && refParams[batchCall.refParamName];
	    if (refIDs != null) {
	      refIDs = Array.isArray(refIDs) ? refIDs : [refIDs];
	      refIDs.forEach(function (id) {
	        return dataIDs[id] = id;
	      });
	    }
	  } else {
	    dataIDs = getRootCallToIDMap(query);
	  }
	  forEachObject(dataIDs, function (dataID) {
	    if (dataID && dataIDToFragmentNameMap.has(dataID)) {
	      var dataIDSet = dataIDToFragmentNameMap.get(dataID);
	      forEachObject(deferredFragmentNames, function (fragmentID) {
	        delete dataIDSet[fragmentID];
	        callback(dataID, fragmentID);
	      });
	      if (!isEmpty(dataIDSet)) {
	        dataIDToFragmentNameMap.set(dataID, dataIDSet);
	      } else {
	        dataIDToFragmentNameMap['delete'](dataID);
	      }
	    }
	  });
	}

	/**
	 * Clears the deferred query from its parent's list of dependent queries.
	 */
	function resolveDeferredRefQuery(query) {
	  var parentID = getQueryParentID(query);
	  var children = parentToChildQueryMap.get(parentID) || [];
	  children = children.filter(function (q) {
	    return q !== query;
	  });
	  if (children.length) {
	    parentToChildQueryMap.set(parentID, children);
	  } else {
	    parentToChildQueryMap['delete'](parentID);
	  }
	}

	/**
	 * Resolves the root IDs for any dependent queries of the given query.
	 */
	function resolveDeferredParentQuery(query, response) {
	  // resolve IDs in child queries, add to ID => fragment set
	  var children = parentToChildQueryMap.get(query.getID()) || [];
	  for (var ii = 0; ii < children.length; ii++) {
	    var childQuery = children[ii];
	    var childFragmentNames = childQuery.getDeferredFragmentNames();
	    var childDataIDs = getRefParamFromResponse(response, childQuery);
	    forEachObject(childDataIDs, function (dataID) {
	      var dataIDSet = dataIDToFragmentNameMap.get(dataID) || {};
	      _Object$assign(dataIDSet, childFragmentNames);
	      dataIDToFragmentNameMap.set(dataID, dataIDSet);
	    });
	  }
	}

	/**
	 * Maps the deferred fragments for a root call with a previously unknown ID to
	 * the resolved ID value.
	 */
	function resolveFragmentsForRootCall(query) {
	  var rootCallMap = getRootCallToIDMap(query);
	  forEachObject(rootCallMap, function (dataID, rootCall) {
	    if (dataID && rootCallToFragmentNameMap.has(rootCall)) {
	      var rootCallSet = rootCallToFragmentNameMap.get(rootCall) || {};
	      var dataIDSet = dataIDToFragmentNameMap.get(dataID) || {};
	      _Object$assign(dataIDSet, rootCallSet);
	      dataIDToFragmentNameMap.set(dataID, dataIDSet);
	      rootCallToFragmentNameMap['delete'](rootCall);
	    }
	  });
	}

	/**
	 * Removes the deferred fragments for a previously unresolved root call ID.
	 */
	function rejectDeferredFragmentsForRootCall(query) {
	  var rootCallMap = getRootCallToIDMap(query);
	  var deferredFragmentNames = query.getDeferredFragmentNames();
	  forEachObject(rootCallMap, function (dataID, rootCall) {
	    if (rootCallToFragmentNameMap.has(rootCall)) {
	      var rootCallSet = rootCallToFragmentNameMap.get(rootCall) || {};
	      forEachObject(deferredFragmentNames, function (fragmentID) {
	        delete rootCallSet[fragmentID];
	      });
	      if (!isEmpty(rootCallSet)) {
	        rootCallToFragmentNameMap['delete'](rootCall);
	      } else {
	        rootCallToFragmentNameMap.set(rootCall, rootCallSet);
	      }
	    }
	  });
	}

	/**
	 * Rejects the parent ID, clearing all tracking for both the parent and all
	 * its dependent deferred ref queries.
	 */
	function rejectDeferredParentQuery(query) {
	  var parentID = query.getID();
	  parentToChildQueryMap['delete'](parentID);
	}

	/**
	 * Notify observers that the given deferred fragment has resolved for node
	 * with dataID.
	 */
	function broadcastChangeForFragment(dataID, fragmentID) {
	  if (!broadcastItems) {
	    broadcastItems = [];
	    resolveImmediate(processBroadcasts);
	  }
	  broadcastItems.push({ dataID: dataID, fragmentID: fragmentID, error: null });
	}

	/**
	 * Record that an error occurred for this dataID, fragment pair
	 * and broadcast an update.
	 */
	function broadcastErrorForFragment(dataID, fragmentID, error) {
	  if (!broadcastItems) {
	    broadcastItems = [];
	    resolveImmediate(processBroadcasts);
	  }
	  broadcastItems.push({ dataID: dataID, fragmentID: fragmentID, error: error });
	}

	/**
	 * Process broadcast items from previous event loop.
	 */
	function processBroadcasts() {
	  if (!broadcastItems) {
	    return;
	  }

	  for (var ii = 0; ii < subscribers.length; ii++) {
	    for (var jj = 0; jj < broadcastItems.length; jj++) {
	      var subscriber = subscribers[ii];
	      if (subscriber) {
	        var _broadcastItems$jj = broadcastItems[jj];
	        var dataID = _broadcastItems$jj.dataID;
	        var error = _broadcastItems$jj.error;
	        var fragmentID = _broadcastItems$jj.fragmentID;

	        var method;
	        var args;
	        if (error) {
	          method = subscriber.callbacks.onFailure;
	          args = [dataID, fragmentID, error];
	        } else {
	          method = subscriber.callbacks.onSuccess;
	          args = [dataID, fragmentID];
	        }
	        ErrorUtils.applyWithGuard(method, null, args, null, 'GraphQLDeferredQueryTracker');
	      }
	    }
	  }

	  subscribers = subscribers.filter(function (subscriber) {
	    return subscriber !== null;
	  });
	  broadcastItems = null;
	}

	/**
	 * Helper to extract the JSONPath value(s) of a query from a response.
	 */
	function getRefParamFromResponse(response, query) {
	  var batchCall = query.getBatchCall();
	  var refTarget = batchCall ? batchCall.sourceQueryPath : null;
	  if (!refTarget) {
	    return {};
	  }
	  var values = {};
	  var tokens = refTarget.split('.');

	  getRefParamFromNode(values, response, tokens, 1); // skip root '$' marker
	  return values;
	}

	/**
	 * Recursive helper to extract the ref parameter (represented as tokens)
	 * into the values object.
	 */
	function getRefParamFromNode(values, node, tokens, index) {
	  if (index === tokens.length && typeof node === 'string') {
	    // base case
	    values[node] = node;
	    return;
	  } else if (
	  // mismatched path/response
	  index >= tokens.length || !node || typeof node !== 'object' || Array.isArray(node)) {
	    return;
	  }
	  var token = tokens[index];
	  if (token === '*') {
	    forEachObject(node, function (subNode) {
	      getRefParamFromNode(values, subNode, tokens, index + 1);
	    });
	  } else if (node.hasOwnProperty(token)) {
	    getRefParamFromNode(values, node[token], tokens, index + 1);
	  }
	}

	/**
	 * Helper to get a query's sourceQueryID
	 */
	function getQueryParentID(query) {
	  var batchCall = query.getBatchCall();
	  if (batchCall) {
	    return batchCall.sourceQueryID;
	  }
	  return null;
	}

	function getRootCallToIDMap(query) {
	  var mapping = {};
	  if (!query.getBatchCall()) {
	    forEachRootCallArg(query, function (rootCallArg, rootCallName) {
	      var rootCallString = rootCallArg == null ? rootCallName + '()' : rootCallName + '(' + rootCallArg + ')';

	      mapping[rootCallString] = recordStore.getRootCallID(rootCallName, rootCallArg);
	    });
	  }
	  return mapping;
	}
	module.exports = GraphQLDeferredQueryTracker;

/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule RelayMutationTransaction
	 * @typechecks
	 * 
	 */

	'use strict';

	var _classCallCheck = __webpack_require__(2)['default'];

	var _extends = __webpack_require__(11)['default'];

	var _defineProperty = __webpack_require__(65)['default'];

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	var ErrorUtils = __webpack_require__(49);

	var RelayConnectionInterface = __webpack_require__(9);
	var RelayMutationQuery = __webpack_require__(140);
	var RelayMutationRequest = __webpack_require__(141);
	var RelayMutationTransactionStatus = __webpack_require__(143);
	var RelayNetworkLayer = __webpack_require__(27);
	var RelayStoreData = __webpack_require__(12);

	var fromGraphQL = __webpack_require__(84);
	var invariant = __webpack_require__(1);
	var nullthrows = __webpack_require__(70);
	var resolveImmediate = __webpack_require__(19);

	var CLIENT_MUTATION_ID = RelayConnectionInterface.CLIENT_MUTATION_ID;

	var collisionQueueMap = {};
	var pendingTransactionMap = {};
	var queue = [];
	var transactionIDCounter = 0;

	/**
	 * @internal
	 */

	var RelayMutationTransaction = (function () {
	  function RelayMutationTransaction(mutation) {
	    _classCallCheck(this, RelayMutationTransaction);

	    this._id = (transactionIDCounter++).toString(36);
	    this._mutation = mutation;
	    this._status = RelayMutationTransactionStatus.UNCOMMITTED;

	    pendingTransactionMap[this._id] = this;
	    queue.push(this);
	    this._handleOptimisticUpdate();
	  }

	  RelayMutationTransaction.get = function get(id) {
	    var transaction = pendingTransactionMap[id];
	    !transaction ?  true ? invariant(false, 'RelayMutationTransaction: `%s` is not a valid pending transaction ID.', id) : invariant(false) : undefined;
	    return transaction;
	  };

	  RelayMutationTransaction.prototype._assertIsPending = function _assertIsPending() {
	    !pendingTransactionMap[this._id] ?  true ? invariant(false, 'RelayMutationTransaction: Only pending transactions can be interacted ' + 'with.') : invariant(false) : undefined;
	  };

	  RelayMutationTransaction.prototype.commit = function commit(callbacks) {
	    this._assertIsPending();
	    !(this._status === RelayMutationTransactionStatus.UNCOMMITTED) ?  true ? invariant(false, 'RelayMutationTransaction: Only transactions with status `UNCOMMITTED` ' + 'can be comitted.') : invariant(false) : undefined;

	    if (callbacks) {
	      this._onCommitFailureCallback = callbacks.onFailure;
	      this._onCommitSuccessCallback = callbacks.onSuccess;
	    }

	    this._queueForCommit();
	  };

	  RelayMutationTransaction.prototype.getError = function getError() {
	    this._assertIsPending();
	    return this._error;
	  };

	  RelayMutationTransaction.prototype.getStatus = function getStatus() {
	    this._assertIsPending();
	    return this._status;
	  };

	  RelayMutationTransaction.prototype.recommit = function recommit() {
	    this._assertIsPending();
	    !(this._status === RelayMutationTransactionStatus.COMMIT_FAILED || this._status === RelayMutationTransactionStatus.COLLISION_COMMIT_FAILED) ?  true ? invariant(false, 'RelayMutationTransaction: Only transaction with status ' + '`COMMIT_FAILED` or `COLLISION_COMMIT_FAILED` can be comitted.') : invariant(false) : undefined;

	    this._queueForCommit();
	  };

	  RelayMutationTransaction.prototype.rollback = function rollback() {
	    this._assertIsPending();
	    !(this._status === RelayMutationTransactionStatus.UNCOMMITTED || this._status === RelayMutationTransactionStatus.COMMIT_FAILED || this._status === RelayMutationTransactionStatus.COLLISION_COMMIT_FAILED) ?  true ? invariant(false, 'RelayMutationTransaction: Only transactions with status `UNCOMMITTED` ' + '`COMMIT_FAILED` or `COLLISION_COMMIT_FAILED` can be rolledback.') : invariant(false) : undefined;

	    this._handleRollback();
	  };

	  RelayMutationTransaction.prototype._getCallName = function _getCallName() {
	    if (!this._callName) {
	      this._callName = this._getMutationNode().calls[0].name;
	    }
	    return this._callName;
	  };

	  RelayMutationTransaction.prototype._getConfigs = function _getConfigs() {
	    if (!this._configs) {
	      this._configs = this._mutation.getConfigs();
	    }
	    return this._configs;
	  };

	  RelayMutationTransaction.prototype._getCollisionKey = function _getCollisionKey() {
	    if (this._collisionKey === undefined) {
	      this._collisionKey = this._mutation.getCollisionKey() || null;
	    }
	    return this._collisionKey;
	  };

	  RelayMutationTransaction.prototype._getFatQuery = function _getFatQuery() {
	    if (!this._fatQuery) {
	      this._fatQuery = fromGraphQL.Fragment(this._mutation.getFatQuery());
	    }
	    return this._fatQuery;
	  };

	  RelayMutationTransaction.prototype._getMutationNode = function _getMutationNode() {
	    if (!this._mutationNode) {
	      this._mutationNode = this._mutation.getMutation();
	    }
	    return this._mutationNode;
	  };

	  RelayMutationTransaction.prototype._getQuery = function _getQuery() {
	    if (!this._query) {
	      this._query = RelayMutationQuery.buildQuery({
	        configs: this._getConfigs(),
	        fatQuery: this._getFatQuery(),
	        mutationName: this._mutation.constructor.name,
	        mutation: this._getMutationNode()
	      });
	    }
	    return this._query;
	  };

	  RelayMutationTransaction.prototype._getVariables = function _getVariables() {
	    if (!this._variables) {
	      var input = _extends({}, this._mutation.getVariables(), _defineProperty({}, CLIENT_MUTATION_ID, this._id));
	      this._variables = { input: input };
	    }
	    return this._variables;
	  };

	  RelayMutationTransaction.prototype._getFiles = function _getFiles() {
	    if (this._files === undefined) {
	      this._files = this._mutation.getFiles() || null;
	    }
	    return this._files;
	  };

	  RelayMutationTransaction.prototype._getOptimisticConfigs = function _getOptimisticConfigs() {
	    if (this._optimisticConfigs === undefined) {
	      this._optimisticConfigs = this._mutation.getOptimisticConfigs() || null;
	    }
	    return this._optimisticConfigs;
	  };

	  RelayMutationTransaction.prototype._getOptimisticQuery = function _getOptimisticQuery() {
	    if (this._optimisticQuery === undefined) {
	      var optimisticResponse = this._getOptimisticResponse();
	      if (optimisticResponse) {
	        var optimisticConfigs = this._getOptimisticConfigs();
	        if (optimisticConfigs) {
	          this._optimisticQuery = RelayMutationQuery.buildQuery({
	            configs: optimisticConfigs,
	            fatQuery: this._getFatQuery(),
	            mutationName: this._mutation.constructor.name,
	            mutation: this._getMutationNode()
	          });
	        } else {
	          this._optimisticQuery = RelayMutationQuery.buildQueryForOptimisticUpdate({
	            response: optimisticResponse,
	            fatQuery: this._getFatQuery(),
	            mutation: this._getMutationNode()
	          });
	        }
	      } else {
	        this._optimisticQuery = null;
	      }
	    }
	    return this._optimisticQuery;
	  };

	  RelayMutationTransaction.prototype._getOptimisticResponse = function _getOptimisticResponse() {
	    if (this._optimisticResponse === undefined) {
	      var optimisticResponse = this._mutation.getOptimisticResponse() || null;
	      if (optimisticResponse) {
	        optimisticResponse[CLIENT_MUTATION_ID] = this._id;
	      }
	      this._optimisticResponse = optimisticResponse;
	    }
	    return this._optimisticResponse;
	  };

	  RelayMutationTransaction.prototype._queueForCommit = function _queueForCommit() {
	    var collisionKey = this._getCollisionKey();
	    if (collisionKey) {
	      if (!collisionQueueMap.hasOwnProperty(collisionKey)) {
	        collisionQueueMap[collisionKey] = [this];
	        this._handleCommit();
	      } else {
	        collisionQueueMap[collisionKey].push(this);
	        this._status = RelayMutationTransactionStatus.COMMIT_QUEUED;
	      }
	    } else {
	      this._handleCommit();
	    }
	  };

	  RelayMutationTransaction.prototype._markAsNotPending = function _markAsNotPending() {
	    var _this = this;

	    delete pendingTransactionMap[this._id];
	    queue = queue.filter(function (transaction) {
	      return transaction !== _this;
	    });
	  };

	  RelayMutationTransaction.prototype._handleOptimisticUpdate = function _handleOptimisticUpdate() {
	    var optimisticResponse = this._getOptimisticResponse();
	    var optimisticQuery = this._getOptimisticQuery();
	    if (optimisticResponse && optimisticQuery) {
	      var configs = this._getOptimisticConfigs() || this._getConfigs();
	      optimisticResponse[CLIENT_MUTATION_ID] = this._id; // Repeating for Flow
	      RelayStoreData.getDefaultInstance().handleUpdatePayload(optimisticQuery, optimisticResponse, { configs: configs, isOptimisticUpdate: true });
	    }
	  };

	  RelayMutationTransaction.prototype._handleCommit = function _handleCommit() {
	    var _this2 = this;

	    this._status = RelayMutationTransactionStatus.COMMITTING;

	    var request = new RelayMutationRequest(this._getQuery(), this._getVariables(), this._getFiles());
	    RelayNetworkLayer.sendMutation(request);

	    request.getPromise().done(function (result) {
	      return _this2._handleCommitSuccess(result.response);
	    }, function (error) {
	      _this2._error = error;
	      _this2._handleCommitFailure(true);
	    });
	  };

	  RelayMutationTransaction.prototype._handleCommitFailure = function _handleCommitFailure(isServerError) {
	    this._status = isServerError ? RelayMutationTransactionStatus.COMMIT_FAILED : RelayMutationTransactionStatus.COLLISION_COMMIT_FAILED;

	    var shouldRollback = true;
	    var commitFailureCallback = this._onCommitFailureCallback;
	    if (commitFailureCallback) {
	      var preventAutoRollback = function preventAutoRollback() {
	        shouldRollback = false;
	      };
	      ErrorUtils.applyWithGuard(commitFailureCallback, null, [this, preventAutoRollback], null, 'RelayMutationTransaction:onCommitFailure');
	    }

	    if (isServerError) {
	      RelayMutationTransaction._failCollisionQueue(this._getCollisionKey());
	    }

	    // Might have already been rolled back via `commitFailureCallback`.
	    var wasRolledback = !pendingTransactionMap[this._id];
	    if (shouldRollback && !wasRolledback) {
	      this._handleRollback();
	    } else {
	      RelayMutationTransaction._batchRefreshQueuedData();
	    }
	  };

	  RelayMutationTransaction.prototype._handleRollback = function _handleRollback() {
	    this._markAsNotPending();
	    RelayMutationTransaction._batchRefreshQueuedData();
	  };

	  RelayMutationTransaction.prototype._handleCommitSuccess = function _handleCommitSuccess(response) {
	    RelayMutationTransaction._advanceCollisionQueue(this._getCollisionKey());
	    this._markAsNotPending();

	    RelayMutationTransaction._refreshQueuedData();
	    RelayStoreData.getDefaultInstance().handleUpdatePayload(this._getQuery(), response[this._getCallName()], { configs: this._getConfigs(), isOptimisticUpdate: false });

	    if (this._onCommitSuccessCallback) {
	      ErrorUtils.applyWithGuard(this._onCommitSuccessCallback, null, [response], null, 'RelayMutationTransaction:onCommitSuccess');
	    }
	  };

	  RelayMutationTransaction._advanceCollisionQueue = function _advanceCollisionQueue(collisionKey) {
	    if (collisionKey) {
	      var collisionQueue = nullthrows(collisionQueueMap[collisionKey]);
	      // Remove the transaction that called this function.
	      collisionQueue.shift();

	      if (collisionQueue.length) {
	        collisionQueue[0]._handleCommit();
	      } else {
	        delete collisionQueueMap[collisionKey];
	      }
	    }
	  };

	  RelayMutationTransaction._failCollisionQueue = function _failCollisionQueue(collisionKey) {
	    if (collisionKey) {
	      var collisionQueue = nullthrows(collisionQueueMap[collisionKey]);
	      // Remove the transaction that called this function.
	      collisionQueue.shift();
	      collisionQueue.forEach(function (transaction) {
	        return transaction._handleCommitFailure(false);
	      });
	      delete collisionQueueMap[collisionKey];
	    }
	  };

	  RelayMutationTransaction._refreshQueuedData = function _refreshQueuedData() {
	    RelayStoreData.getDefaultInstance().clearQueuedData();
	    queue.forEach(function (transaction) {
	      return transaction._handleOptimisticUpdate();
	    });
	  };

	  RelayMutationTransaction._batchRefreshQueuedData = function _batchRefreshQueuedData() {
	    if (!RelayMutationTransaction._willBatchRefreshQueuedData) {
	      RelayMutationTransaction._willBatchRefreshQueuedData = true;
	      resolveImmediate(function () {
	        RelayMutationTransaction._willBatchRefreshQueuedData = false;
	        RelayMutationTransaction._refreshQueuedData();
	      });
	    }
	  };

	  return RelayMutationTransaction;
	})();

	module.exports = RelayMutationTransaction;

	// These are lazily computed and memoized.

	/* $FlowIssue #7728187 - Computed Property */

/***/ },
/* 79 */
/***/ function(module, exports) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule RelayMutationType
	 * @typechecks
	 * 
	 */

	'use strict';

	var RelayMutationType = {
	  FIELDS_CHANGE: 'FIELDS_CHANGE',
	  NODE_DELETE: 'NODE_DELETE',
	  RANGE_ADD: 'RANGE_ADD',
	  RANGE_DELETE: 'RANGE_DELETE',
	  REQUIRED_CHILDREN: 'REQUIRED_CHILDREN'
	};

	module.exports = RelayMutationType;

/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule RelayPendingQueryTracker
	 * @typechecks
	 * 
	 */

	'use strict';

	var _classCallCheck = __webpack_require__(2)['default'];

	var _Object$keys = __webpack_require__(5)['default'];

	var Deferred = __webpack_require__(48);
	var DliteFetchModeConstants = __webpack_require__(76);
	var GraphQLDeferredQueryTracker = __webpack_require__(77);
	var Promise = __webpack_require__(17);
	var PromiseMap = __webpack_require__(212);

	var RelayTaskScheduler = __webpack_require__(44);

	var containsRelayQueryRootCall = __webpack_require__(156);
	var everyObject = __webpack_require__(109);
	var fetchRelayQuery = __webpack_require__(158);
	var invariant = __webpack_require__(1);
	var subtractRelayQuery = __webpack_require__(168);
	var warning = __webpack_require__(10);

	var pendingFetchMap = {};

	// Asynchronous mapping from preload query IDs to results.
	var preloadQueryMap = new PromiseMap();

	var PendingFetch = (function () {
	  function PendingFetch(_ref) {
	    var fetchMode = _ref.fetchMode;
	    var forceIndex = _ref.forceIndex;
	    var query = _ref.query;
	    var storeData = _ref.storeData;

	    _classCallCheck(this, PendingFetch);

	    var queryID = query.getID();
	    this._storeData = storeData;
	    this._query = query;
	    this._forceIndex = forceIndex;

	    this._resolvedSubtractedQuery = false;
	    this._resolvedDeferred = new Deferred();

	    this._dependents = [];
	    this._pendingDependencyMap = {};

	    var subtractedQuery;
	    if (fetchMode === DliteFetchModeConstants.FETCH_MODE_PRELOAD) {
	      subtractedQuery = query;
	      this._fetchSubtractedQueryPromise = preloadQueryMap.get(queryID);
	    } else {
	      subtractedQuery = this._subtractPending(query);
	      this._fetchSubtractedQueryPromise = subtractedQuery ? fetchRelayQuery(subtractedQuery) : Promise.resolve();
	    }

	    this._fetchedSubtractedQuery = !subtractedQuery;
	    this._errors = [];

	    if (subtractedQuery) {
	      pendingFetchMap[queryID] = {
	        fetch: this,
	        query: subtractedQuery
	      };
	      GraphQLDeferredQueryTracker.recordQuery(subtractedQuery);
	      this._fetchSubtractedQueryPromise.done(this._handleSubtractedQuerySuccess.bind(this, subtractedQuery), this._handleSubtractedQueryFailure.bind(this, subtractedQuery));
	    } else {
	      this._markSubtractedQueryAsResolved();
	    }
	  }

	  /**
	   * Subtracts all pending queries from the supplied `query` and returns the
	   * resulting difference. The difference can be null if the entire query is
	   * pending.
	   *
	   * If any pending queries were subtracted, they will be added as dependencies
	   * and the query will only resolve once the subtracted query and all
	   * dependencies have resolved.
	   *
	   * This, combined with our use of diff queries (see `diffRelayQuery`) means
	   * that we only go to the server for things that are not in (or not on their
	   * way to) the cache (`RelayRecordStore`).
	   */

	  PendingFetch.prototype._subtractPending = function _subtractPending(query) {
	    var _this = this;

	    everyObject(pendingFetchMap, function (pending) {
	      // Stop if the entire query is subtracted.
	      if (!query) {
	        return false;
	      }
	      if (containsRelayQueryRootCall(pending.query, query)) {
	        var subtractedQuery = subtractRelayQuery(query, pending.query);
	        if (subtractedQuery !== query) {
	          query = subtractedQuery;
	          _this._addPendingDependency(pending.fetch);
	        }
	      }
	      return true;
	    });
	    return query;
	  };

	  PendingFetch.prototype._addPendingDependency = function _addPendingDependency(pendingFetch) {
	    var queryID = pendingFetch.getQuery().getID();
	    this._pendingDependencyMap[queryID] = pendingFetch;
	    pendingFetch._addDependent(this);
	  };

	  PendingFetch.prototype._addDependent = function _addDependent(pendingFetch) {
	    this._dependents.push(pendingFetch);
	  };

	  PendingFetch.prototype._handleSubtractedQuerySuccess = function _handleSubtractedQuerySuccess(subtractedQuery, result) {
	    var _this2 = this;

	    this._fetchedSubtractedQuery = true;

	    RelayTaskScheduler.await(function () {
	      var response = result.response;
	      !(response && typeof response === 'object') ?  true ? invariant(false, 'RelayPendingQueryTracker: Expected response to be an object, got ' + '`%s`.', response ? typeof response : response) : invariant(false) : undefined;
	      _this2._storeData.handleQueryPayload(subtractedQuery, response, _this2._forceIndex);
	      GraphQLDeferredQueryTracker.resolveQuery(subtractedQuery, response, result.ref_params);
	    }).done(this._markSubtractedQueryAsResolved.bind(this), this._markAsRejected.bind(this));
	  };

	  PendingFetch.prototype._handleSubtractedQueryFailure = function _handleSubtractedQueryFailure(subtractedQuery, error) {
	    GraphQLDeferredQueryTracker.rejectQuery(subtractedQuery, error);

	    this._markAsRejected(error);
	  };

	  PendingFetch.prototype._markSubtractedQueryAsResolved = function _markSubtractedQueryAsResolved() {
	    var queryID = this.getQuery().getID();
	    delete pendingFetchMap[queryID];

	    this._resolvedSubtractedQuery = true;
	    this._updateResolvedDeferred();

	    this._dependents.forEach(function (dependent) {
	      return dependent._markDependencyAsResolved(queryID);
	    });
	  };

	  PendingFetch.prototype._markAsRejected = function _markAsRejected(error) {
	    var queryID = this.getQuery().getID();
	    delete pendingFetchMap[queryID];

	     true ? warning(false, error.message) : undefined;

	    this._errors.push(error);
	    this._updateResolvedDeferred();

	    this._dependents.forEach(function (dependent) {
	      return dependent._markDependencyAsRejected(queryID, error);
	    });
	  };

	  PendingFetch.prototype._markDependencyAsResolved = function _markDependencyAsResolved(dependencyQueryID) {
	    delete this._pendingDependencyMap[dependencyQueryID];

	    this._updateResolvedDeferred();
	  };

	  PendingFetch.prototype._markDependencyAsRejected = function _markDependencyAsRejected(dependencyQueryID, error) {
	    delete this._pendingDependencyMap[dependencyQueryID];

	    this._errors.push(error);
	    this._updateResolvedDeferred();

	    // Dependencies further down the graph are either not affected or informed
	    // by `dependencyQueryID`.
	  };

	  PendingFetch.prototype._updateResolvedDeferred = function _updateResolvedDeferred() {
	    if (this._isSettled() && !this._resolvedDeferred.isSettled()) {
	      if (this._errors.length) {
	        this._resolvedDeferred.reject(this._errors[0]);
	      } else {
	        this._resolvedDeferred.resolve(undefined);
	      }
	    }
	  };

	  PendingFetch.prototype._isSettled = function _isSettled() {
	    return this._errors.length > 0 || this._resolvedSubtractedQuery && !hasItems(this._pendingDependencyMap);
	  };

	  PendingFetch.prototype.getQuery = function getQuery() {
	    return this._query;
	  };

	  PendingFetch.prototype.getResolvedPromise = function getResolvedPromise() {
	    return this._resolvedDeferred.getPromise();
	  };

	  /**
	   * A pending query is resolvable if it is already resolved or will be resolved
	   * imminently (i.e. its subtracted query and the subtracted queries of all its
	   * pending dependencies have been fetched).
	   */

	  PendingFetch.prototype.isResolvable = function isResolvable() {
	    if (this._fetchedSubtractedQuery) {
	      return everyObject(this._pendingDependencyMap, function (pendingDependency) {
	        return pendingDependency._fetchedSubtractedQuery;
	      });
	      // Pending dependencies further down the graph either don't affect the
	      // result or are already in `_pendingDependencyMap`.
	    }
	    return false;
	  };

	  return PendingFetch;
	})();

	function hasItems(map) {
	  return !!_Object$keys(map).length;
	}

	/**
	 * @internal
	 *
	 * Tracks pending (in-flight) queries.
	 *
	 * In order to send minimal queries and avoid re-retrieving data,
	 * `RelayPendingQueryTracker` maintains a registry of pending queries, and
	 * "subtracts" those from any new queries that callers enqueue.
	 */
	var RelayPendingQueryTracker = {

	  /**
	   * Used by `GraphQLQueryRunner` to enqueue new queries.
	   */
	  add: function add(params) {
	    return new PendingFetch(params);
	  },

	  hasPendingQueries: function hasPendingQueries() {
	    return hasItems(pendingFetchMap);
	  },

	  /**
	   * Clears all pending query tracking. Does not cancel the queries themselves.
	   */
	  resetPending: function resetPending() {
	    pendingFetchMap = {};
	    GraphQLDeferredQueryTracker.reset();
	  },

	  resolvePreloadQuery: function resolvePreloadQuery(queryID, result) {
	    preloadQueryMap.resolveKey(queryID, result);
	  },

	  rejectPreloadQuery: function rejectPreloadQuery(queryID, error) {
	    preloadQueryMap.rejectKey(queryID, error);
	  },

	  // TODO: Use `export type`.
	  PendingFetch: PendingFetch

	};

	module.exports = RelayPendingQueryTracker;

	/**
	 * Error(s) in fetching/handleUpdate-ing its or one of its pending
	 * dependency's subtracted query. There may be more than one error. However,
	 * `_resolvedDeferred` is rejected with the earliest encountered error.
	 */

/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule RelayRouteFragment
	 * 
	 * @typechecks
	 */

	'use strict';

	var _classCallCheck = __webpack_require__(2)['default'];

	/**
	 * Represents a query fragment that is conditional upon the active route as a
	 * function that returns either a literal fragment or a fragment reference.
	 *
	 * Example GraphQL:
	 *
	 * ```
	 * Node {
	 *   ${(route) => matchRoute(route, ...)}
	 * }
	 * ```
	 */

	var RelayRouteFragment = (function () {
	  function RelayRouteFragment(builder) {
	    _classCallCheck(this, RelayRouteFragment);

	    this._builder = builder;
	  }

	  /**
	   * Returns the query fragment that matches the given route, if any.
	   */

	  RelayRouteFragment.prototype.getFragmentForRoute = function getFragmentForRoute(route) {
	    return this._builder(route);
	  };

	  return RelayRouteFragment;
	})();

	module.exports = RelayRouteFragment;

/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule callsToGraphQL
	 * 
	 * @typechecks
	 */

	'use strict';

	var GraphQL = __webpack_require__(18);

	/**
	 * @internal
	 *
	 * Convert from plain object `{name,value}` calls to GraphQL call nodes.
	 */
	function callsToGraphQL(calls) {
	  return calls.map(function (_ref) {
	    var name = _ref.name;
	    var value = _ref.value;
	    return new GraphQL.Callv(name, value);
	  });
	}

	module.exports = callsToGraphQL;

/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule flattenRelayQuery
	 * 
	 * @typechecks
	 */

	'use strict';

	var _inherits = __webpack_require__(6)['default'];

	var _classCallCheck = __webpack_require__(2)['default'];

	var _Object$keys = __webpack_require__(5)['default'];

	var RelayProfiler = __webpack_require__(4);

	var RelayQueryVisitor = __webpack_require__(21);

	var sortTypeFirst = __webpack_require__(166);

	/**
	 * @internal
	 *
	 * `flattenRelayQuery(query)` returns a clone of `query` with fields inside of
	 * fragments recursively flattened into the nearest ancestor field.
	 *
	 * The result can be null if `node` only contains empty fragments or fragments
	 * that only contain empty fragments.
	 */
	function flattenRelayQuery(node) {
	  var flattener = new RelayQueryFlattener();
	  var flattenedFieldMap = {};
	  flattener.traverse(node, { node: node, flattenedFieldMap: flattenedFieldMap });
	  return toQuery(node, flattenedFieldMap);
	}

	function toQuery(node, flattenedFieldMap) {
	  var keys = _Object$keys(flattenedFieldMap).sort(sortTypeFirst);
	  return node.clone(keys.map(function (alias) {
	    var field = flattenedFieldMap[alias];
	    if (field) {
	      return toQuery(field.node, field.flattenedFieldMap);
	    }
	  }));
	}

	var RelayQueryFlattener = (function (_RelayQueryVisitor) {
	  _inherits(RelayQueryFlattener, _RelayQueryVisitor);

	  function RelayQueryFlattener() {
	    _classCallCheck(this, RelayQueryFlattener);

	    _RelayQueryVisitor.apply(this, arguments);
	  }

	  RelayQueryFlattener.prototype.visitField = function visitField(node, state) {
	    var serializationKey = node.getSerializationKey();
	    var flattenedField = state.flattenedFieldMap[serializationKey];
	    if (!flattenedField) {
	      flattenedField = {
	        node: node,
	        flattenedFieldMap: {}
	      };
	      state.flattenedFieldMap[serializationKey] = flattenedField;
	    }
	    this.traverse(node, flattenedField);
	  };

	  return RelayQueryFlattener;
	})(RelayQueryVisitor);

	module.exports = RelayProfiler.instrument('flattenRelayQuery', flattenRelayQuery);

/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule fromGraphQL
	 * 
	 */

	'use strict';

	var RelayQuery = __webpack_require__(3);
	var RelayMetaRoute = __webpack_require__(26);
	var RelayProfiler = __webpack_require__(4);

	var invariant = __webpack_require__(1);

	/**
	 * @internal
	 *
	 * Converts GraphQL nodes to RelayQuery nodes.
	 */
	var fromGraphQL = {
	  Node: (function (_Node) {
	    function Node(_x) {
	      return _Node.apply(this, arguments);
	    }

	    Node.toString = function () {
	      return _Node.toString();
	    };

	    return Node;
	  })(function (query) {
	    var variables = {};
	    var route = RelayMetaRoute.get('$fromGraphQL');
	    return RelayQuery.Node.create(query, route, variables);
	  }),
	  Field: (function (_Field) {
	    function Field(_x2) {
	      return _Field.apply(this, arguments);
	    }

	    Field.toString = function () {
	      return _Field.toString();
	    };

	    return Field;
	  })(function (query) {
	    var node = fromGraphQL.Node(query);
	    !(node instanceof RelayQuery.Field) ?  true ? invariant(false, 'fromGraphQL.Field(): Expected a GraphQL field node.') : invariant(false) : undefined;
	    return node;
	  }),
	  Fragment: (function (_Fragment) {
	    function Fragment(_x3) {
	      return _Fragment.apply(this, arguments);
	    }

	    Fragment.toString = function () {
	      return _Fragment.toString();
	    };

	    return Fragment;
	  })(function (query) {
	    var node = fromGraphQL.Node(query);
	    !(node instanceof RelayQuery.Fragment) ?  true ? invariant(false, 'fromGraphQL.Fragment(): Expected a GraphQL fragment node.') : invariant(false) : undefined;
	    return node;
	  }),
	  Query: function Query(query) {
	    var node = fromGraphQL.Node(query);
	    !(node instanceof RelayQuery.Root) ?  true ? invariant(false, 'fromGraphQL.Query(): Expected a GraphQL query root node.') : invariant(false) : undefined;
	    return node;
	  },
	  Operation: (function (_Operation) {
	    function Operation(_x4) {
	      return _Operation.apply(this, arguments);
	    }

	    Operation.toString = function () {
	      return _Operation.toString();
	    };

	    return Operation;
	  })(function (query) {
	    var node = fromGraphQL.Node(query);
	    !(node instanceof RelayQuery.Operation) ?  true ? invariant(false, 'fromGraphQL.Operation(): Expected a mutation/subscription node.') : invariant(false) : undefined;
	    return node;
	  })
	};

	RelayProfiler.instrumentMethods(fromGraphQL, {
	  Node: 'fromGraphQL.Node',
	  Field: 'fromGraphQL.Field',
	  Fragment: 'fromGraphQL.Fragment',
	  Query: 'fromGraphQL.Query'
	});

	module.exports = fromGraphQL;

/***/ },
/* 85 */
/***/ function(module, exports) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule generateClientEdgeID
	 * 
	 * @typechecks
	 */

	'use strict';

	/**
	 * Generate an edge client id for edges on connections based on the range it
	 * belongs to and the node it contains.
	 *
	 * @internal
	 */
	function generateClientEdgeID(rangeID, nodeID) {
	  return 'client:' + rangeID + ':' + nodeID;
	}

	module.exports = generateClientEdgeID;

/***/ },
/* 86 */
/***/ function(module, exports) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule generateForceIndex
	 * 
	 * @typechecks
	 */

	'use strict';

	var _index = 1;

	/**
	 * Generate a new force index used to write GraphQL data in the store. A new
	 * force index can be used to overwrite previous ranges.
	 *
	 * @internal
	 */
	function generateForceIndex() {
	  return _index++;
	}

	module.exports = generateForceIndex;

/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule getRelayQueries
	 * 
	 */

	'use strict';

	var _Object$keys = __webpack_require__(5)['default'];

	var Map = __webpack_require__(50);

	var RelayMetaRoute = __webpack_require__(26);
	var RelayProfiler = __webpack_require__(4);
	var RelayQuery = __webpack_require__(3);

	var buildRQL = __webpack_require__(59);
	var invariant = __webpack_require__(1);
	var stableStringify = __webpack_require__(93);

	var queryCache = new Map();

	/**
	 * @internal
	 *
	 * `getRelayQueries` retrieves all queries for a component given a route.
	 */
	function getRelayQueries(Component, route) {
	  if (!queryCache.has(Component)) {
	    queryCache.set(Component, {});
	  }
	  var cacheKey = route.name + ':' + stableStringify(route.params);
	  var cache = queryCache.get(Component);
	  if (cache.hasOwnProperty(cacheKey)) {
	    return cache[cacheKey];
	  }
	  var querySet = {};
	  Component.getFragmentNames().forEach(function (fragmentName) {
	    // TODO: Fix this. It relies on the query and fragment names matching.
	    var queryName = fragmentName;
	    var queryBuilder = route.queries[queryName];
	    if (queryBuilder) {
	      var concreteQuery = buildRQL.Query(queryBuilder, Component, _Object$keys(route.params));
	      !(concreteQuery !== undefined) ?  true ? invariant(false, 'Relay.QL defined on route `%s` named `%s` is not a valid query. A ' + 'A typical query is defined using: Relay.QL`query {...}`', route.name, queryName) : invariant(false) : undefined;
	      if (concreteQuery) {
	        var rootQuery = RelayQuery.Node.createQuery(concreteQuery, RelayMetaRoute.get(route.name), route.params);
	        var rootCall = rootQuery.getRootCall();
	        if (rootCall.value !== undefined) {
	          querySet[fragmentName] = rootQuery;
	          return;
	        }
	      }
	    }
	    querySet[fragmentName] = null;
	  });
	  cache[cacheKey] = querySet;
	  return querySet;
	}

	module.exports = RelayProfiler.instrument('Relay.getQueries', getRelayQueries);

/***/ },
/* 88 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule getWeakIdForObject
	 * 
	 * @typechecks
	 */

	'use strict';

	// Ensure non-guessable names for the id property in dev.
	var KEY = '$getWeakIdForObject';
	if (true) {
	  KEY += Math.random().toString(36).slice(2);
	}

	var _nextNodeID = 0;

	/**
	 * @internal
	 *
	 * Returns an ID which uniquely identifies the given `node` instance.
	 */
	function getWeakIdForObject(node) {
	  var id = node[KEY];
	  if (id == null) {
	    id = (_nextNodeID++).toString(36);
	    node[KEY] = id;
	  }
	  return id;
	}

	module.exports = getWeakIdForObject;

/***/ },
/* 89 */
/***/ function(module, exports) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule isRelayContainer
	 * 
	 * @typechecks
	 */

	'use strict';

	function isRelayContainer(component) {
	  return !!(component && component.getQueryNames && component.getQuery);
	}

	module.exports = isRelayContainer;

/***/ },
/* 90 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule observeRelayQueryData
	 * @typechecks
	 * 
	 */

	'use strict';

	var _classCallCheck = __webpack_require__(2)['default'];

	var _slicedToArray = __webpack_require__(22)['default'];

	var _Object$keys = __webpack_require__(5)['default'];

	var GraphQLStoreChangeEmitter = __webpack_require__(38);
	var RelayError = __webpack_require__(138);

	var RelayStoreData = __webpack_require__(12);

	var emptyFunction = __webpack_require__(33);
	var filterExclusiveKeys = __webpack_require__(61);
	var invariant = __webpack_require__(1);
	var readRelayQueryData = __webpack_require__(63);

	/**
	 * @internal
	 */
	function observeRelayQueryData(store, queryNode, dataID, options) {
	  return new RelayQueryDataObservable(readRelayQueryData.bind(null, store, queryNode, dataID, options), dataID);
	}

	var RelayQueryDataObservable = (function () {
	  function RelayQueryDataObservable(readQueryData, dataID) {
	    _classCallCheck(this, RelayQueryDataObservable);

	    this._activeSubscriptions = 0;
	    this._changeListener = null;
	    this._data = null;
	    this._dataID = dataID;
	    this._lastError = null;
	    this._observedDataIDs = {};
	    this._readQueryData = readQueryData;
	    this._subscriptions = [];

	    this._handleChange = this._handleChange.bind(this);
	    this._handleData = this._handleData.bind(this);
	    this._handleError = this._handleError.bind(this);

	    this._garbageCollector = RelayStoreData.getDefaultInstance().getGarbageCollector();
	  }

	  RelayQueryDataObservable.prototype.subscribe = function subscribe(callbacks) {
	    var _this = this;

	    // We only ever start watching for data once the first subscriber is
	    // registered
	    if (!this._subscriptions.length) {
	      this._watchQueryData();
	    }

	    // An error occured earlier, we immediately inform the new subscriber
	    // and return a function that does nothing
	    if (this._lastError) {
	      callbacks.onError(this._lastError);
	      return {
	        dispose: emptyFunction
	      };
	    }

	    var index = this._subscriptions.length;
	    var isDisposed = false;
	    this._subscriptions.push(callbacks);
	    callbacks.onNext(this._data);
	    this._activeSubscriptions++;

	    return {
	      dispose: function dispose() {
	        !!isDisposed ?  true ? invariant(false, 'RelayObserver.dispose(): Subscription was already disposed.') : invariant(false) : undefined;

	        _this._subscriptions[index] = null;
	        _this._activeSubscriptions--;
	        isDisposed = true;
	        // If this is the last subscription we stop watching for new data and
	        // forget the data we have.
	        if (!_this._activeSubscriptions) {
	          _this._unregisterChangeListener();
	          _this._data = null;
	          _this._subscriptions = [];
	          // Decrease count for all dataIDs observed by this observable
	          _this._updateGarbageCollectorSubscriptionCount({});
	          // No longer observing any dataIDs
	          _this._observedDataIDs = {};
	        }
	      }
	    };
	  };

	  /**
	   * Invoked when the registered change listener is notified, if first reads new
	   * data from the store and registered eventual new change listeners than
	   * notifies any subscribers.
	   * @callback
	   */

	  RelayQueryDataObservable.prototype._handleChange = function _handleChange() {
	    // Run _watchQueryData to react to any subtree changes, this will
	    // also update the value of `this._data`
	    this._watchQueryData();
	    this._subscriptions.forEach(this._lastError ? this._handleError : this._handleData);
	  };

	  /**
	   * Calls `onNext` on all subscribers with new data
	   */

	  RelayQueryDataObservable.prototype._handleData = function _handleData(subscriber) {
	    subscriber && subscriber.onNext(this._data);
	  };

	  /**
	    * Calls `onError` on all subscribers informing them that the observed data
	    * is gone from the store.
	    */

	  RelayQueryDataObservable.prototype._handleError = function _handleError(subscriber) {
	    subscriber && this._lastError && subscriber.onError(this._lastError);
	  };

	  /**
	   * Registers a change listener for a set of data ids. A previous listener will
	   * be unregistered.
	   */

	  RelayQueryDataObservable.prototype._registerChangeListener = function _registerChangeListener(dataIDs) {
	    this._unregisterChangeListener();

	    if (dataIDs.length) {
	      this._changeListener = GraphQLStoreChangeEmitter.addListenerForIDs(dataIDs, this._handleChange);
	    }
	  };

	  /**
	   * Unregisters the current change listener.
	   */

	  RelayQueryDataObservable.prototype._unregisterChangeListener = function _unregisterChangeListener() {
	    if (this._changeListener) {
	      this._changeListener.remove();
	      this._changeListener = null;
	    }
	  };

	  /**
	   * Reads data from the store and registers a change listener for all the data
	   * ids that are in the subtree below the root data.
	   */

	  RelayQueryDataObservable.prototype._watchQueryData = function _watchQueryData() {
	    var _readQueryData = this._readQueryData();

	    var data = _readQueryData.data;
	    var dataIDs = _readQueryData.dataIDs;

	    if (data === undefined) {
	      this._lastError = RelayError.create('RelayObserverError', this._changeListener !== null ? 'Record `%s` was purged from the store.' : 'Record `%s` has not been fetched.', this._dataID);

	      // Stop watching for data once an error occured, the store is in an
	      // invalid state and it is not guaranteed it will ever recover
	      this._unregisterChangeListener();
	      // Decrease count for all dataIDs observed by this observable
	      this._updateGarbageCollectorSubscriptionCount({});
	      // No longer observing any dataIDs
	      this._observedDataIDs = {};
	      return;
	    }

	    this._data = data;
	    this._registerChangeListener(_Object$keys(dataIDs));
	    this._updateGarbageCollectorSubscriptionCount(dataIDs);
	    // Only observing dataIDs returned by `readQueryData`
	    this._observedDataIDs = dataIDs;
	  };

	  /**
	   * Calculates the added and removed dataIDs between `nextDataIDs` and
	   * `this._currentDataIDs`.
	   * For all added DataIDs the subscription-count in the garbage collector will
	   * be increased, for each removed DataID the count will be decreased.
	   */

	  RelayQueryDataObservable.prototype._updateGarbageCollectorSubscriptionCount = function _updateGarbageCollectorSubscriptionCount(nextDataIDs) {
	    if (this._garbageCollector) {
	      var garbageCollector = this._garbageCollector;

	      var prevDataIDs = this._observedDataIDs;

	      var _filterExclusiveKeys = filterExclusiveKeys(prevDataIDs, nextDataIDs);

	      var _filterExclusiveKeys2 = _slicedToArray(_filterExclusiveKeys, 2);

	      var removed = _filterExclusiveKeys2[0];
	      var added = _filterExclusiveKeys2[1];

	      added.forEach(function (id) {
	        return garbageCollector.increaseSubscriptionsFor(id);
	      });
	      removed.forEach(function (id) {
	        return garbageCollector.decreaseSubscriptionsFor(id);
	      });
	    }
	  };

	  return RelayQueryDataObservable;
	})();

	module.exports = observeRelayQueryData;

/***/ },
/* 91 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule printRelayQuery
	 * @typechecks
	 * 
	 */

	'use strict';

	var _Object$keys = __webpack_require__(5)['default'];

	var RelayProfiler = __webpack_require__(4);
	var RelayQuery = __webpack_require__(3);

	var invariant = __webpack_require__(1);

	/**
	 * @internal
	 *
	 * `printRelayQuery(query)` returns a string representation of the query. The
	 * supplied `node` must be flattened (and not contain fragments).
	 */
	function printRelayQuery(node) {
	  var fragmentMap = {};
	  var queryText = null;
	  if (node instanceof RelayQuery.Root) {
	    queryText = printRoot(node, fragmentMap);
	  } else if (node instanceof RelayQuery.Fragment) {
	    queryText = printFragment(node, fragmentMap);
	  } else if (node instanceof RelayQuery.Field) {
	    queryText = printField(node, fragmentMap);
	  } else if (node instanceof RelayQuery.Mutation) {
	    queryText = printMutation(node, fragmentMap);
	  }
	  !queryText ?  true ? invariant(false, 'printRelayQuery(): Unsupported node type.') : invariant(false) : undefined;
	  // Reassign to preserve Flow type refinement within closure.
	  var query = queryText;
	  _Object$keys(fragmentMap).forEach(function (fragmentID) {
	    var fragmentText = fragmentMap[fragmentID];
	    if (fragmentText) {
	      query = query + ' ' + fragmentText;
	    }
	  });
	  return query;
	}

	function printRoot(node, fragmentMap) {
	  !!node.getBatchCall() ?  true ? invariant(false, 'printRelayQuery(): Deferred queries are not supported.') : invariant(false) : undefined;

	  var rootCall = node.getRootCall();
	  var rootArgumentName = node.getRootCallArgument();
	  var rootFieldString = rootCall.name;
	  if (rootCall.value != null) {
	    !rootArgumentName ?  true ? invariant(false, 'printRelayQuery(): Expected an argument name for root field `%s`.', rootCall.name) : invariant(false) : undefined;
	    var rootArgString = printArgument(rootArgumentName, rootCall.value, node.getCallType());
	    if (rootArgString) {
	      rootFieldString += '(' + rootArgString + ')';
	    }
	  }

	  return 'query ' + node.getName() + '{' + rootFieldString + printChildren(node, fragmentMap) + '}';
	}

	function printMutation(node, fragmentMap) {
	  var inputName = node.getCallVariableName();
	  var call = '(' + inputName + ':$' + inputName + ')';
	  return 'mutation ' + node.getName() + '($' + inputName + ':' + node.getInputType() + ')' + '{' + node.getCall().name + call + printChildren(node, fragmentMap) + '}';
	}

	function printFragment(node, fragmentMap) {
	  return 'fragment ' + node.getDebugName() + ' on ' + node.getType() + printChildren(node, fragmentMap);
	}

	function printInlineFragment(node, fragmentMap) {
	  var fragmentID = node.getFragmentID();
	  if (!(fragmentID in fragmentMap)) {
	    fragmentMap[fragmentID] = 'fragment ' + fragmentID + ' on ' + node.getType() + printChildren(node, fragmentMap);
	  }
	  return '...' + fragmentID;
	}

	function printField(node, fragmentMap) {
	  !(node instanceof RelayQuery.Field) ?  true ? invariant(false, 'printRelayQuery(): Query must be flattened before printing.') : invariant(false) : undefined;
	  var schemaName = node.getSchemaName();
	  var serializationKey = node.getSerializationKey();
	  var callsWithValues = node.getCallsWithValues();
	  var fieldString = schemaName;
	  var argStrings = null;
	  if (callsWithValues.length) {
	    callsWithValues.forEach(function (_ref) {
	      var name = _ref.name;
	      var value = _ref.value;

	      var argString = printArgument(name, value, node.getCallType(name));
	      if (argString) {
	        argStrings = argStrings || [];
	        argStrings.push(argString);
	      }
	    });
	    if (argStrings) {
	      fieldString += '(' + argStrings.join(',') + ')';
	    }
	  }
	  return (serializationKey !== schemaName ? serializationKey + ':' : '') + fieldString + printChildren(node, fragmentMap);
	}

	function printChildren(node, fragmentMap) {
	  var children = node.getChildren().map(function (node) {
	    if (node instanceof RelayQuery.Field) {
	      return printField(node, fragmentMap);
	    } else {
	      !(node instanceof RelayQuery.Fragment) ?  true ? invariant(false, 'printRelayQuery(): expected child node to be a `Field` or ' + '`Fragment`, got `%s`.', node.constructor.name) : invariant(false) : undefined;
	      return printInlineFragment(node, fragmentMap);
	    }
	  });
	  if (!children.length) {
	    return '';
	  }
	  return '{' + children.join(',') + '}';
	}

	function printArgument(name, value, type) {
	  var stringValue;
	  if (value == null) {
	    return value;
	  }
	  if (type === 'enum') {
	    !(typeof value === 'string') ?  true ? invariant(false, 'RelayQuery: Expected enum argument `%s` to be a string, got `%s`.', name, value) : invariant(false) : undefined;
	    stringValue = value;
	  } else if (type === 'object') {
	    !(typeof value === 'object' && !Array.isArray(value) && value !== null) ?  true ? invariant(false, 'RelayQuery: Expected object argument `%s` to be an object, got `%s`.', name, value) : invariant(false) : undefined;
	    stringValue = stringifyInputObject(name, value);
	  } else {
	    stringValue = JSON.stringify(value);
	  }
	  return name + ':' + stringValue;
	}

	function stringifyInputObject(name, value) {
	  !(value != null) ?  true ? invariant(false, 'RelayQuery: Expected input object `%s` to have non-null values.', name) : invariant(false) : undefined;
	  if (typeof value !== 'object') {
	    return JSON.stringify(value);
	  }
	  if (Array.isArray(value)) {
	    return '[' + value.map(stringifyInputObject.bind(null, name)).join(',') + ']';
	  }
	  // Reassign to preserve Flow type refinement within closure.
	  var objectValue = value; // non-null object
	  return '{' + _Object$keys(objectValue).map(function (key) {
	    return key + ':' + stringifyInputObject(name, objectValue[key]);
	  }).join(',') + '}';
	}

	module.exports = RelayProfiler.instrument('printRelayQuery', printRelayQuery);

/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule refragmentRelayQuery
	 * 
	 * @typechecks
	 */

	'use strict';

	var _Object$keys = __webpack_require__(5)['default'];

	var RelayQuery = __webpack_require__(3);

	var invariant = __webpack_require__(1);

	/**
	 * @internal
	 *
	 * `refragmentRelayQuery(query)` returns a clone of `query` such that child
	 * fields of dynamically-typed nodes are split into fragments by type. This is
	 * necessary when refetching information about a record. The fields fetched for
	 * a record may only be available via certain types:
	 *
	 * ```
	 * // Input:
	 * {
	 *   id,    // fetched via a field of type `Node`
	 *   name,  // fetched via a field of type `User`
	 * }
	 *
	 * // Becomes:
	 * {
	 *   ...on Node { id },
	 *   ...on User { name },
	 * }
	 * ```
	 */
	function refragmentRelayQuery(node) {
	  // Refragmenting is not necessary in these cases:
	  // - fragments are primarily constructed by end users, and their fields are
	  //   validated at transpile-time.
	  // - fields that have a concrete type will always have valid fields.
	  if (node instanceof RelayQuery.Fragment || node instanceof RelayQuery.Field && !node.isUnionOrInterface()) {
	    return node.clone(node.getChildren().map(refragmentRelayQuery));
	  }

	  // In all other cases, the fields of a node may be type-dependent:
	  // - fields with union/interface types may have varying fields that must
	  //   be fragmented.
	  // - root fields are fragmented for simplicity, though they can eventually
	  //   be annotated with the `isUnionOrInterface` metadata and be treated as
	  //   fields.
	  var children = [];
	  var fieldsByType = {};
	  node.getChildren().forEach(function (child) {
	    var clone = refragmentRelayQuery(child);
	    if (clone == null) {
	      return;
	    }
	    if (clone instanceof RelayQuery.Fragment) {
	      children.push(clone);
	    } else {
	      !(clone instanceof RelayQuery.Field) ?  true ? invariant(false, 'refragmentRelayQuery(): invalid node type, expected a `Field` or ' + '`Fragment`.') : invariant(false) : undefined;
	      var parentType = clone.getParentType();
	      var fields = fieldsByType[parentType];
	      if (!fields) {
	        fieldsByType[parentType] = fields = [];
	      }
	      fields.push(clone);
	    }
	  });
	  _Object$keys(fieldsByType).forEach(function (type) {
	    children.push(RelayQuery.Node.buildFragment('refragmentRelayQuery', type, fieldsByType[type]));
	  });
	  return node.clone(children);
	}

	module.exports = refragmentRelayQuery;

/***/ },
/* 93 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule stableStringify
	 * 
	 */

	'use strict';

	var _Object$keys = __webpack_require__(5)['default'];

	function isObject(value) {
	  return value !== null && Object.prototype.toString.call(value) === '[object Object]';
	}

	/**
	 * Simple recursive stringifier that handles basic objects (does not handle
	 * corner cases such as circular references) and produces a JSON-like
	 * serialization suitable for use as a cache key or other similar internal
	 * book-keeping detail.
	 *
	 * Sample input:
	 *
	 *     var object = {
	 *       top2: {
	 *         middle: {
	 *           inner: [1, 'foo', ['bar', 2]],
	 *           other: false,
	 *         },
	 *       },
	 *       top1: [
	 *         {first: true},
	 *         {first: false},
	 *         'random',
	 *       ],
	 *       misc: true,
	 *       extra: null,
	 *     };
	 *
	 * Sample output (some whitespace added for clarity):
	 *
	 *    {
	 *      extra:null,
	 *      misc:true,
	 *      top1:[0:{first:true},1:{first:false},2:"random"],
	 *      top2:{middle:{inner:[0:1,1:"foo",2:[0:"bar",1:2]],other:false}}
	 *    }
	 */
	function stableStringify(object) {
	  var keys = _Object$keys(object);
	  if (keys.length) {
	    var result = [];
	    keys.sort();

	    for (var i = 0; i < keys.length; i++) {
	      var key = keys[i];
	      var value = object[key];
	      if (isObject(value) || Array.isArray(value)) {
	        value = stableStringify(value);
	      } else {
	        value = JSON.stringify(value);
	      }
	      result.push(key + ':' + value);
	    }

	    if (Array.isArray(object)) {
	      return '[' + result.join(',') + ']';
	    } else {
	      return '{' + result.join(',') + '}';
	    }
	  }
	  return JSON.stringify(object);
	}

	module.exports = stableStringify;

/***/ },
/* 94 */
[254, 95, 16],
/* 95 */
/***/ function(module, exports) {

	"use strict";

	var toString = ({}).toString;

	module.exports = function (it) {
	  return toString.call(it).slice(8, -1);
	};

/***/ },
/* 96 */
[255, 187],
/* 97 */
72,
/* 98 */
[257, 95],
/* 99 */
[262, 197, 30, 198, 47, 67, 16, 23, 194, 14, 101, 192],
/* 100 */
/***/ function(module, exports) {

	"use strict";

	module.exports = function (bitmap, value) {
	  return {
	    enumerable: !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable: !(bitmap & 4),
	    value: value
	  };
	};

/***/ },
/* 101 */
[266, 67, 47, 16],
/* 102 */
/***/ function(module, exports) {

	// 7.1.4 ToInteger
	"use strict";

	var ceil = Math.ceil,
	    floor = Math.floor;
	module.exports = function (it) {
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};

/***/ },
/* 103 */
[270, 31, 94, 16, 23, 13],
/* 104 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var $ = __webpack_require__(14),
	    core = __webpack_require__(13),
	    $def = __webpack_require__(30),
	    toObject = __webpack_require__(32),
	    isObject = __webpack_require__(68);
	$.each.call(('freeze,seal,preventExtensions,isFrozen,isSealed,isExtensible,' + 'getOwnPropertyDescriptor,getPrototypeOf,keys,getOwnPropertyNames').split(','), function (KEY, ID) {
	  var fn = (core.Object || {})[KEY] || Object[KEY],
	      forced = 0,
	      method = {};
	  method[KEY] = ID == 0 ? function freeze(it) {
	    return isObject(it) ? fn(it) : it;
	  } : ID == 1 ? function seal(it) {
	    return isObject(it) ? fn(it) : it;
	  } : ID == 2 ? function preventExtensions(it) {
	    return isObject(it) ? fn(it) : it;
	  } : ID == 3 ? function isFrozen(it) {
	    return isObject(it) ? fn(it) : true;
	  } : ID == 4 ? function isSealed(it) {
	    return isObject(it) ? fn(it) : true;
	  } : ID == 5 ? function isExtensible(it) {
	    return isObject(it) ? fn(it) : false;
	  } : ID == 6 ? function getOwnPropertyDescriptor(it, key) {
	    return fn(toObject(it), key);
	  } : ID == 7 ? function getPrototypeOf(it) {
	    return fn(toObject(it, true));
	  } : ID == 8 ? function keys(it) {
	    return fn(toObject(it));
	  } : __webpack_require__(190).get;
	  try {
	    fn('z');
	  } catch (e) {
	    forced = 1;
	  }
	  $def($def.S + $def.F * forced, 'Object', method);
	});

/***/ },
/* 105 */
[273, 209, 23],
/* 106 */
/***/ function(module, exports) {

	'use strict';

	(function () {
		'use strict';

		var table = [],
		    poly = 0xEDB88320; // reverse polynomial

		// build the table
		function makeTable() {
			var c, n, k;

			for (n = 0; n < 256; n += 1) {
				c = n;
				for (k = 0; k < 8; k += 1) {
					if (c & 1) {
						c = poly ^ c >>> 1;
					} else {
						c = c >>> 1;
					}
				}
				table[n] = c >>> 0;
			}
		}

		function strToArr(str) {
			// sweet hack to turn string into a 'byte' array
			return Array.prototype.map.call(str, function (c) {
				return c.charCodeAt(0);
			});
		}

		/*
	  * Compute CRC of array directly.
	  *
	  * This is slower for repeated calls, so append mode is not supported.
	  */
		function crcDirect(arr) {
			var crc = -1,
			    // initial contents of LFBSR
			i,
			    j,
			    l,
			    temp;

			for (i = 0, l = arr.length; i < l; i += 1) {
				temp = (crc ^ arr[i]) & 0xff;

				// read 8 bits one at a time
				for (j = 0; j < 8; j += 1) {
					if ((temp & 1) === 1) {
						temp = temp >>> 1 ^ poly;
					} else {
						temp = temp >>> 1;
					}
				}
				crc = crc >>> 8 ^ temp;
			}

			// flip bits
			return crc ^ -1;
		}

		/*
	  * Compute CRC with the help of a pre-calculated table.
	  *
	  * This supports append mode, if the second parameter is set.
	  */
		function crcTable(arr, append) {
			var crc, i, l;

			// if we're in append mode, don't reset crc
			// if arr is null or undefined, reset table and return
			if (typeof crcTable.crc === 'undefined' || !append || !arr) {
				crcTable.crc = 0 ^ -1;

				if (!arr) {
					return;
				}
			}

			// store in temp variable for minor speed gain
			crc = crcTable.crc;

			for (i = 0, l = arr.length; i < l; i += 1) {
				crc = crc >>> 8 ^ table[(crc ^ arr[i]) & 0xff];
			}

			crcTable.crc = crc;

			return crc ^ -1;
		}

		// build the table
		// this isn't that costly, and most uses will be for table assisted mode
		makeTable();

		module.exports = function (val, direct) {
			var val = typeof val === 'string' ? strToArr(val) : val,
			    ret = direct ? crcDirect(val) : crcTable(val);

			// convert to 2's complement hex
			return (ret >>> 0).toString(16);
		};
		module.exports.direct = crcDirect;
		module.exports.table = crcTable;
	})();

/***/ },
/* 107 */
/***/ function(module, exports) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ExecutionEnvironment
	 */

	'use strict';

	var canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);

	/**
	 * Simple, lightweight module assisting with the detection and context of
	 * Worker. Helps avoid circular dependencies and allows code to reason about
	 * whether or not they are in a Worker, even if they never include the main
	 * `ReactWorker` dependency.
	 */
	var ExecutionEnvironment = {

	  canUseDOM: canUseDOM,

	  canUseWorkers: typeof Worker !== 'undefined',

	  canUseEventListeners: canUseDOM && !!(window.addEventListener || window.attachEvent),

	  canUseViewport: canUseDOM && !!window.screen,

	  isInWorker: !canUseDOM // For now, this is true - might change in the future.

	};

	module.exports = ExecutionEnvironment;

/***/ },
/* 108 */
/***/ function(module, exports) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule areEqual
	 * 
	 */

	'use strict';

	var aStackPool = [];
	var bStackPool = [];

	/**
	 * Checks if two values are equal. Values may be primitives, arrays, or objects.
	 * Returns true if both arguments have the same keys and values.
	 *
	 * @see http://underscorejs.org
	 * @copyright 2009-2013 Jeremy Ashkenas, DocumentCloud Inc.
	 * @license MIT
	 */
	function areEqual(a, b) {
	  var aStack = aStackPool.length ? aStackPool.pop() : [];
	  var bStack = bStackPool.length ? bStackPool.pop() : [];
	  var result = eq(a, b, aStack, bStack);
	  aStack.length = 0;
	  bStack.length = 0;
	  aStackPool.push(aStack);
	  bStackPool.push(bStack);
	  return result;
	}

	function eq(a, b, aStack, bStack) {
	  if (a === b) {
	    // Identical objects are equal. `0 === -0`, but they aren't identical.
	    return a !== 0 || 1 / a == 1 / b;
	  }
	  if (a == null || b == null) {
	    // a or b can be `null` or `undefined`
	    return false;
	  }
	  if (typeof a != 'object' || typeof b != 'object') {
	    return false;
	  }
	  var objToStr = Object.prototype.toString;
	  var className = objToStr.call(a);
	  if (className != objToStr.call(b)) {
	    return false;
	  }
	  switch (className) {
	    case '[object String]':
	      return a == String(b);
	    case '[object Number]':
	      return isNaN(a) || isNaN(b) ? false : a == Number(b);
	    case '[object Date]':
	    case '[object Boolean]':
	      return +a == +b;
	    case '[object RegExp]':
	      return a.source == b.source && a.global == b.global && a.multiline == b.multiline && a.ignoreCase == b.ignoreCase;
	  }
	  // Assume equality for cyclic structures.
	  var length = aStack.length;
	  while (length--) {
	    if (aStack[length] == a) {
	      return bStack[length] == b;
	    }
	  }
	  aStack.push(a);
	  bStack.push(b);
	  var size = 0;
	  // Recursively compare objects and arrays.
	  if (className === '[object Array]') {
	    size = a.length;
	    if (size !== b.length) {
	      return false;
	    }
	    // Deep compare the contents, ignoring non-numeric properties.
	    while (size--) {
	      if (!eq(a[size], b[size], aStack, bStack)) {
	        return false;
	      }
	    }
	  } else {
	    if (a.constructor !== b.constructor) {
	      return false;
	    }
	    if (a.hasOwnProperty('valueOf') && b.hasOwnProperty('valueOf')) {
	      return a.valueOf() == b.valueOf();
	    }
	    var keys = Object.keys(a);
	    if (keys.length != Object.keys(b).length) {
	      return false;
	    }
	    for (var i = 0; i < keys.length; i++) {
	      if (!eq(a[keys[i]], b[keys[i]], aStack, bStack)) {
	        return false;
	      }
	    }
	  }
	  aStack.pop();
	  bStack.pop();
	  return true;
	}

	module.exports = areEqual;

/***/ },
/* 109 */
/***/ function(module, exports) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule everyObject
	 * 
	 * @typechecks
	 */

	'use strict';

	var hasOwnProperty = Object.prototype.hasOwnProperty;

	/**
	 * Executes the provided `callback` once for each enumerable own property in the
	 * object until it finds one where callback returns a falsy value. If such a
	 * property is found, `everyObject` immediately returns false. Otherwise, it
	 * returns true.
	 *
	 * The `callback` is invoked with three arguments:
	 *
	 *  - the property value
	 *  - the property name
	 *  - the object being traversed
	 *
	 * Properties that are added after the call to `everyObject` will not be
	 * visited by `callback`. If the values of existing properties are changed, the
	 * value passed to `callback` will be the value at the time `everyObject`
	 * visits them. Properties that are deleted before being visited are not
	 * visited.
	 */
	function everyObject(object, callback, context) {
	  for (var name in object) {
	    if (hasOwnProperty.call(object, name)) {
	      if (!callback.call(context, object[name], name, object)) {
	        return false;
	      }
	    }
	  }
	  return true;
	}

	module.exports = everyObject;

/***/ },
/* 110 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule fetch
	 */

	'use strict';

	__webpack_require__(250);
	module.exports = self.fetch.bind(self);

/***/ },
/* 111 */
/***/ function(module, exports) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule mapObject
	 */

	'use strict';

	var hasOwnProperty = Object.prototype.hasOwnProperty;

	/**
	 * Executes the provided `callback` once for each enumerable own property in the
	 * object and constructs a new object from the results. The `callback` is
	 * invoked with three arguments:
	 *
	 *  - the property value
	 *  - the property name
	 *  - the object being traversed
	 *
	 * Properties that are added after the call to `mapObject` will not be visited
	 * by `callback`. If the values of existing properties are changed, the value
	 * passed to `callback` will be the value at the time `mapObject` visits them.
	 * Properties that are deleted before being visited are not visited.
	 *
	 * @grep function objectMap()
	 * @grep function objMap()
	 *
	 * @param {?object} object
	 * @param {function} callback
	 * @param {*} context
	 * @return {?object}
	 */
	function mapObject(object, callback, context) {
	  if (!object) {
	    return null;
	  }
	  var result = {};
	  for (var name in object) {
	    if (hasOwnProperty.call(object, name)) {
	      result[name] = callback.call(context, object[name], name, object);
	    }
	  }
	  return result;
	}

	module.exports = mapObject;

/***/ },
/* 112 */
/***/ function(module, exports) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule sprintf
	 * @typechecks
	 */

	/**
	 * Simple function for formatting strings.
	 *
	 * Replaces placeholders with values passed as extra arguments
	 *
	 * @param {string} format the base string
	 * @param ...args the values to insert
	 * @return {string} the replaced string
	 */
	"use strict";

	function sprintf(format) {
	  for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	    args[_key - 1] = arguments[_key];
	  }

	  var index = 0;
	  return format.replace(/%s/g, function (match) {
	    return args[index++];
	  });
	}

	module.exports = sprintf;

/***/ },
/* 113 */
[253, 118],
/* 114 */
95,
/* 115 */
[255, 222],
/* 116 */
[256, 34, 51],
/* 117 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var ctx = __webpack_require__(115),
	    call = __webpack_require__(228),
	    isArrayIter = __webpack_require__(227),
	    anObject = __webpack_require__(113),
	    toLength = __webpack_require__(234),
	    getIterFn = __webpack_require__(237);
	module.exports = function (iterable, entries, fn, that) {
	  var iterFn = getIterFn(iterable),
	      f = ctx(fn, that, entries ? 2 : 1),
	      index = 0,
	      length,
	      step,
	      iterator;
	  if (typeof iterFn != 'function') throw TypeError(iterable + ' is not iterable!');
	  // fast case for arrays with default iterator
	  if (isArrayIter(iterFn)) for (length = toLength(iterable.length); length > index; index++) {
	    entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
	  } else for (iterator = iterFn.call(iterable); !(step = iterator.next()).done;) {
	    call(iterator, f, step.value, entries);
	  }
	};

/***/ },
/* 118 */
68,
/* 119 */
/***/ function(module, exports) {

	// Safari has buggy iterators w/o `next`
	'use strict';

	module.exports = 'keys' in [] && !('next' in [].keys());

/***/ },
/* 120 */
/***/ function(module, exports) {

	"use strict";

	module.exports = function (done, value) {
	  return { value: value, done: !!done };
	};

/***/ },
/* 121 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var $redef = __webpack_require__(123);
	module.exports = function (target, src) {
	  for (var key in src) $redef(target, key, src[key]);
	  return target;
	};

/***/ },
/* 122 */
100,
/* 123 */
[263, 24],
/* 124 */
/***/ function(module, exports) {

	"use strict";

	module.exports = function (it, Constructor, name) {
	  if (!(it instanceof Constructor)) throw TypeError(name + ": use the 'new' operator!");
	  return it;
	};

/***/ },
/* 125 */
102,
/* 126 */
/***/ function(module, exports) {

	'use strict';

	var id = 0,
	    px = Math.random();
	module.exports = function (key) {
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

/***/ },
/* 127 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {"use strict";

	// Use the fastest means possible to execute a task in its own turn, with
	// priority over other events including IO, animation, reflow, and redraw
	// events in browsers.
	//
	// An exception thrown by a task will permanently interrupt the processing of
	// subsequent tasks. The higher level `asap` function ensures that if an
	// exception is thrown by a task, that the task queue will continue flushing as
	// soon as possible, but if you use `rawAsap` directly, you are responsible to
	// either ensure that no exceptions are thrown from your task, or to manually
	// call `rawAsap.requestFlush` if an exception is thrown.
	module.exports = rawAsap;
	function rawAsap(task) {
	    if (!queue.length) {
	        requestFlush();
	        flushing = true;
	    }
	    // Equivalent to push, but avoids a function call.
	    queue[queue.length] = task;
	}

	var queue = [];
	// Once a flush has been requested, no further calls to `requestFlush` are
	// necessary until the next `flush` completes.
	var flushing = false;
	// `requestFlush` is an implementation-specific method that attempts to kick
	// off a `flush` event as quickly as possible. `flush` will attempt to exhaust
	// the event queue before yielding to the browser's own event loop.
	var requestFlush;
	// The position of the next task to execute in the task queue. This is
	// preserved between calls to `flush` so that it can be resumed if
	// a task throws an exception.
	var index = 0;
	// If a task schedules additional tasks recursively, the task queue can grow
	// unbounded. To prevent memory exhaustion, the task queue will periodically
	// truncate already-completed tasks.
	var capacity = 1024;

	// The flush function processes all tasks that have been scheduled with
	// `rawAsap` unless and until one of those tasks throws an exception.
	// If a task throws an exception, `flush` ensures that its state will remain
	// consistent and will resume where it left off when called again.
	// However, `flush` does not make any arrangements to be called again if an
	// exception is thrown.
	function flush() {
	    while (index < queue.length) {
	        var currentIndex = index;
	        // Advance the index before calling the task. This ensures that we will
	        // begin flushing on the next task the task throws an error.
	        index = index + 1;
	        queue[currentIndex].call();
	        // Prevent leaking memory for long chains of recursive calls to `asap`.
	        // If we call `asap` within tasks scheduled by `asap`, the queue will
	        // grow, but to avoid an O(n) walk for every task we execute, we don't
	        // shift tasks off the queue after they have been executed.
	        // Instead, we periodically shift 1024 tasks off the queue.
	        if (index > capacity) {
	            // Manually shift all values starting at the index back to the
	            // beginning of the queue.
	            for (var scan = 0, newLength = queue.length - index; scan < newLength; scan++) {
	                queue[scan] = queue[scan + index];
	            }
	            queue.length -= index;
	            index = 0;
	        }
	    }
	    queue.length = 0;
	    index = 0;
	    flushing = false;
	}

	// `requestFlush` is implemented using a strategy based on data collected from
	// every available SauceLabs Selenium web driver worker at time of writing.
	// https://docs.google.com/spreadsheets/d/1mG-5UYGup5qxGdEMWkhP6BWCz053NUb2E1QoUTU16uA/edit#gid=783724593

	// Safari 6 and 6.1 for desktop, iPad, and iPhone are the only browsers that
	// have WebKitMutationObserver but not un-prefixed MutationObserver.
	// Must use `global` instead of `window` to work in both frames and web
	// workers. `global` is a provision of Browserify, Mr, Mrs, or Mop.
	var BrowserMutationObserver = global.MutationObserver || global.WebKitMutationObserver;

	// MutationObservers are desirable because they have high priority and work
	// reliably everywhere they are implemented.
	// They are implemented in all modern browsers.
	//
	// - Android 4-4.3
	// - Chrome 26-34
	// - Firefox 14-29
	// - Internet Explorer 11
	// - iPad Safari 6-7.1
	// - iPhone Safari 7-7.1
	// - Safari 6-7
	if (typeof BrowserMutationObserver === "function") {
	    requestFlush = makeRequestCallFromMutationObserver(flush);

	    // MessageChannels are desirable because they give direct access to the HTML
	    // task queue, are implemented in Internet Explorer 10, Safari 5.0-1, and Opera
	    // 11-12, and in web workers in many engines.
	    // Although message channels yield to any queued rendering and IO tasks, they
	    // would be better than imposing the 4ms delay of timers.
	    // However, they do not work reliably in Internet Explorer or Safari.

	    // Internet Explorer 10 is the only browser that has setImmediate but does
	    // not have MutationObservers.
	    // Although setImmediate yields to the browser's renderer, it would be
	    // preferrable to falling back to setTimeout since it does not have
	    // the minimum 4ms penalty.
	    // Unfortunately there appears to be a bug in Internet Explorer 10 Mobile (and
	    // Desktop to a lesser extent) that renders both setImmediate and
	    // MessageChannel useless for the purposes of ASAP.
	    // https://github.com/kriskowal/q/issues/396

	    // Timers are implemented universally.
	    // We fall back to timers in workers in most engines, and in foreground
	    // contexts in the following browsers.
	    // However, note that even this simple case requires nuances to operate in a
	    // broad spectrum of browsers.
	    //
	    // - Firefox 3-13
	    // - Internet Explorer 6-9
	    // - iPad Safari 4.3
	    // - Lynx 2.8.7
	} else {
	        requestFlush = makeRequestCallFromTimer(flush);
	    }

	// `requestFlush` requests that the high priority event queue be flushed as
	// soon as possible.
	// This is useful to prevent an error thrown in a task from stalling the event
	// queue if the exception handled by Node.js’s
	// `process.on("uncaughtException")` or by a domain.
	rawAsap.requestFlush = requestFlush;

	// To request a high priority event, we induce a mutation observer by toggling
	// the text of a text node between "1" and "-1".
	function makeRequestCallFromMutationObserver(callback) {
	    var toggle = 1;
	    var observer = new BrowserMutationObserver(callback);
	    var node = document.createTextNode("");
	    observer.observe(node, { characterData: true });
	    return function requestCall() {
	        toggle = -toggle;
	        node.data = toggle;
	    };
	}

	// The message channel technique was discovered by Malte Ubl and was the
	// original foundation for this library.
	// http://www.nonblocking.io/2011/06/windownexttick.html

	// Safari 6.0.5 (at least) intermittently fails to create message ports on a
	// page's first load. Thankfully, this version of Safari supports
	// MutationObservers, so we don't need to fall back in that case.

	// function makeRequestCallFromMessageChannel(callback) {
	//     var channel = new MessageChannel();
	//     channel.port1.onmessage = callback;
	//     return function requestCall() {
	//         channel.port2.postMessage(0);
	//     };
	// }

	// For reasons explained above, we are also unable to use `setImmediate`
	// under any circumstances.
	// Even if we were, there is another bug in Internet Explorer 10.
	// It is not sufficient to assign `setImmediate` to `requestFlush` because
	// `setImmediate` must be called *by name* and therefore must be wrapped in a
	// closure.
	// Never forget.

	// function makeRequestCallFromSetImmediate(callback) {
	//     return function requestCall() {
	//         setImmediate(callback);
	//     };
	// }

	// Safari 6.0 has a problem where timers will get lost while the user is
	// scrolling. This problem does not impact ASAP because Safari 6.0 supports
	// mutation observers, so that implementation is used instead.
	// However, if we ever elect to use timers in Safari, the prevalent work-around
	// is to add a scroll event listener that calls for a flush.

	// `setTimeout` does not call the passed callback if the delay is less than
	// approximately 7 in web workers in Firefox 8 through 18, and sometimes not
	// even then.

	function makeRequestCallFromTimer(callback) {
	    return function requestCall() {
	        // We dispatch a timeout with a specified delay of 0 for engines that
	        // can reliably accommodate that request. This will usually be snapped
	        // to a 4 milisecond delay, but once we're flushing, there's no delay
	        // between events.
	        var timeoutHandle = setTimeout(handleTimer, 0);
	        // However, since this timer gets frequently dropped in Firefox
	        // workers, we enlist an interval handle that will try to fire
	        // an event 20 times per second until it succeeds.
	        var intervalHandle = setInterval(handleTimer, 50);

	        function handleTimer() {
	            // Whichever timer succeeds will cancel both timers and
	            // execute the callback.
	            clearTimeout(timeoutHandle);
	            clearInterval(intervalHandle);
	            callback();
	        }
	    };
	}

	// This is for `asap.js` only.
	// Its name will be periodically randomized to break any code that depends on
	// its existence.
	rawAsap.makeRequestCallFromTimer = makeRequestCallFromTimer;

	// ASAP was originally a nextTick shim included in Q. This was factored out
	// into this ASAP package. It was later adapted to RSVP which made further
	// amendments. These decisions, particularly to marginalize MessageChannel and
	// to capture the MutationObserver implementation in a closure, were integrated
	// back into ASAP proper.
	// https://github.com/tildeio/rsvp.js/blob/cddf7232546a9cf858524b75cde6f9edf72620a7/lib/rsvp/asap.js
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 128 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule GraphQLQueryRunner
	 * @typechecks
	 * 
	 */

	'use strict';

	var _toConsumableArray = __webpack_require__(29)['default'];

	var _Object$keys = __webpack_require__(5)['default'];

	var DliteFetchModeConstants = __webpack_require__(76);

	var RelayNetworkLayer = __webpack_require__(27);
	var RelayPendingQueryTracker = __webpack_require__(80);
	var RelayProfiler = __webpack_require__(4);

	var RelayStoreData = __webpack_require__(12);
	var RelayTaskScheduler = __webpack_require__(44);

	var checkRelayQueryData = __webpack_require__(155);
	var diffRelayQuery = __webpack_require__(157);
	var everyObject = __webpack_require__(109);
	var flattenSplitRelayQueries = __webpack_require__(159);
	var forEachObject = __webpack_require__(7);
	var generateForceIndex = __webpack_require__(86);
	var invariant = __webpack_require__(1);
	var resolveImmediate = __webpack_require__(19);
	var someObject = __webpack_require__(220);
	var splitDeferredRelayQueries = __webpack_require__(167);
	var warning = __webpack_require__(10);

	// The source of truth for application data.
	var storeData = RelayStoreData.getDefaultInstance();

	/**
	 * This is the high-level entry point for sending queries to the GraphQL
	 * endpoint. It provides methods for scheduling queries (`run`), force-fetching
	 * queries (ie. ignoring the cache; `forceFetch`).
	 *
	 * In order to send minimal queries and avoid re-retrieving data,
	 * `GraphQLQueryRunner` maintains a registry of pending (in-flight) queries, and
	 * "subtracts" those from any new queries that callers enqueue.
	 *
	 * @internal
	 */
	var GraphQLQueryRunner = {

	  /**
	   * Fetches data required to resolve a set of queries. See the `RelayStore`
	   * module for documentation on the callback.
	   *
	   * Fetch mode must be a value in `DliteFetchModeConstants`.
	   */
	  run: function run(querySet, callback, fetchMode) {
	    var profiler = RelayProfiler.profile('RelayStore.primeCache', querySet);
	    fetchMode = fetchMode || DliteFetchModeConstants.FETCH_MODE_CLIENT;

	    var diffQueries = [];
	    if (fetchMode === DliteFetchModeConstants.FETCH_MODE_CLIENT) {
	      forEachObject(querySet, function (query) {
	        if (query) {
	          diffQueries.push.apply(diffQueries, _toConsumableArray(diffRelayQuery(query, storeData.getRecordStore(), storeData.getQueryTracker())));
	        }
	      });
	    } else {
	      forEachObject(querySet, function (query) {
	        if (query) {
	          diffQueries.push(query);
	        }
	      });
	    }

	    return runQueries(diffQueries, callback, fetchMode, profiler);
	  },

	  /**
	   * Ignores the cache and fetches data required to resolve a set of queries.
	   * Uses the data we get back from the server to overwrite data in the cache.
	   *
	   * Even though we're ignoring the cache, we will still invoke the callback
	   * immediately with `ready: true` if `querySet` can be resolved by the cache.
	   */
	  forceFetch: function forceFetch(querySet, callback) {
	    var profiler = RelayProfiler.profile('RelayStore.forceFetch', querySet);
	    var queries = [];
	    forEachObject(querySet, function (query) {
	      query && queries.push(query);
	    });

	    var fetchMode = DliteFetchModeConstants.FETCH_MODE_REFETCH;
	    return runQueries(queries, callback, fetchMode, profiler);
	  }

	};

	function canResolve(fetch) {
	  return checkRelayQueryData(storeData.getQueuedStore(), fetch.getQuery());
	}

	function hasItems(map) {
	  return !!_Object$keys(map).length;
	}

	function splitAndFlattenQueries(queries) {
	  if (!RelayNetworkLayer.supports('defer')) {
	    var hasDeferredDescendant = queries.some(function (query) {
	      if (query.hasDeferredDescendant()) {
	         true ? warning(false, 'Relay: Query `%s` contains a deferred fragment (e.g. ' + '`getFragment(\'foo\').defer()`) which is not supported by the ' + 'default network layer. This query will be sent without deferral.', query.getName()) : undefined;
	        return true;
	      }
	    });
	    if (hasDeferredDescendant) {
	      return queries;
	    }
	  }

	  var flattenedQueries = [];
	  queries.forEach(function (query) {
	    return flattenedQueries.push.apply(flattenedQueries, _toConsumableArray(flattenSplitRelayQueries(splitDeferredRelayQueries(query))));
	  });
	  return flattenedQueries;
	}

	function runQueries(queries, callback, fetchMode, profiler) {
	  var readyState = {
	    aborted: false,
	    done: false,
	    error: null,
	    ready: false,
	    stale: false
	  };
	  var scheduled = false;
	  function setReadyState(partial) {
	    if (readyState.aborted) {
	      return;
	    }
	    if (readyState.done || readyState.error) {
	      !partial.aborted ?  true ? invariant(false, 'GraphQLQueryRunner: Unexpected ready state change.') : invariant(false) : undefined;
	      return;
	    }
	    readyState = {
	      aborted: partial.aborted != null ? partial.aborted : readyState.aborted,
	      done: partial.done != null ? partial.done : readyState.done,
	      error: partial.error != null ? partial.error : readyState.error,
	      ready: partial.ready != null ? partial.ready : readyState.ready,
	      stale: partial.stale != null ? partial.stale : readyState.stale
	    };
	    if (scheduled) {
	      return;
	    }
	    scheduled = true;
	    resolveImmediate(function () {
	      scheduled = false;
	      callback(readyState);
	    });
	  }

	  var remainingFetchMap = {};
	  var remainingRequiredFetchMap = {};

	  function onResolved(pendingFetch) {
	    var pendingQuery = pendingFetch.getQuery();
	    var pendingQueryID = pendingQuery.getID();
	    delete remainingFetchMap[pendingQueryID];
	    if (!pendingQuery.isDeferred()) {
	      delete remainingRequiredFetchMap[pendingQueryID];
	    }

	    if (hasItems(remainingRequiredFetchMap)) {
	      return;
	    }

	    if (someObject(remainingFetchMap, function (query) {
	      return query.isResolvable();
	    })) {
	      // The other resolvable query will resolve imminently and call
	      // `setReadyState` instead.
	      return;
	    }

	    if (hasItems(remainingFetchMap)) {
	      setReadyState({ done: false, ready: true, stale: false });
	    } else {
	      setReadyState({ done: true, ready: true, stale: false });
	    }
	  }

	  function onRejected(pendingFetch, error) {
	    setReadyState({ error: error });

	    var pendingQuery = pendingFetch.getQuery();
	    var pendingQueryID = pendingQuery.getID();
	    delete remainingFetchMap[pendingQueryID];
	    if (!pendingQuery.isDeferred()) {
	      delete remainingRequiredFetchMap[pendingQueryID];
	    }
	  }

	  RelayTaskScheduler.await(function () {
	    var forceIndex = fetchMode === DliteFetchModeConstants.FETCH_MODE_REFETCH ? generateForceIndex() : null;

	    splitAndFlattenQueries(queries).forEach(function (query) {
	      var pendingFetch = RelayPendingQueryTracker.add({ query: query, fetchMode: fetchMode, forceIndex: forceIndex, storeData: storeData });
	      var queryID = query.getID();
	      remainingFetchMap[queryID] = pendingFetch;
	      if (!query.isDeferred()) {
	        remainingRequiredFetchMap[queryID] = pendingFetch;
	      }
	      pendingFetch.getResolvedPromise().then(onResolved.bind(null, pendingFetch), onRejected.bind(null, pendingFetch));
	    });

	    if (!hasItems(remainingFetchMap)) {
	      setReadyState({ done: true, ready: true });
	    } else {
	      if (!hasItems(remainingRequiredFetchMap)) {
	        setReadyState({ ready: true });
	      } else {
	        setReadyState({ ready: false });
	        storeData.runWithDiskCache(function () {
	          if (hasItems(remainingRequiredFetchMap)) {
	            if (everyObject(remainingRequiredFetchMap, canResolve)) {
	              setReadyState({ ready: true, stale: true });
	            }
	          }
	        });
	      }
	    }
	  }).done();

	  // Stop profiling when synchronous work has completed.
	  profiler.stop();

	  return {
	    abort: function abort() {
	      setReadyState({ aborted: true });
	    }
	  };
	}

	module.exports = GraphQLQueryRunner;

/***/ },
/* 129 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule GraphQLRange
	 * @typechecks
	 */

	'use strict';

	var _classCallCheck = __webpack_require__(2)['default'];

	var _defineProperty = __webpack_require__(65)['default'];

	var _extends = __webpack_require__(11)['default'];

	var _slicedToArray = __webpack_require__(22)['default'];

	var _toConsumableArray = __webpack_require__(29)['default'];

	var GraphQLMutatorConstants = __webpack_require__(54);
	var GraphQLSegment = __webpack_require__(130);
	var GraphQLStoreDataHandler = __webpack_require__(8);
	var RelayConnectionInterface = __webpack_require__(9);

	var forEachObject = __webpack_require__(7);
	var invariant = __webpack_require__(1);
	var printRelayQueryCall = __webpack_require__(45);
	var warning = __webpack_require__(10);

	var END_CURSOR = RelayConnectionInterface.END_CURSOR;
	var HAS_NEXT_PAGE = RelayConnectionInterface.HAS_NEXT_PAGE;
	var HAS_PREV_PAGE = RelayConnectionInterface.HAS_PREV_PAGE;
	var START_CURSOR = RelayConnectionInterface.START_CURSOR;

	/**
	 * @param {array<object>} queryCalls
	 * @return {object}
	 */
	function callsArrayToObject(queryCalls) {
	  var calls = {};
	  for (var ii = 0; ii < queryCalls.length; ii++) {
	    if (RelayConnectionInterface.isConnectionCall(queryCalls[ii])) {
	      var _queryCalls$ii = queryCalls[ii];
	      var name = _queryCalls$ii.name;
	      var value = _queryCalls$ii.value;

	      // assuming that range calls will only have a single argument
	      if (Array.isArray(value) && value.length) {
	        value = value[0];
	      }
	      // Ignore the whole call when the value is null
	      if (value === null) {
	        continue;
	      }
	      calls[name] = value;
	    }
	  }
	  // update first and last call values to be numbers
	  if (calls.first) {
	    !!isNaN(calls.first) ?  true ? invariant(false, 'GraphQLRange: Expected `first` argument to be a number, got ' + '`%s`.', calls.first) : invariant(false) : undefined;
	    calls.first = +calls.first;
	  } else if (calls.last) {
	    !!isNaN(calls.last) ?  true ? invariant(false, 'GraphQLRange: Expected `last` argument to be a number, got ' + '`%s`.', calls.last) : invariant(false) : undefined;
	    calls.last = +calls.last;
	  }
	  return calls;
	}

	/**
	 * Returns whether this is currently a set of static calls that GraphQLRange
	 * supports. Static calls define ranges that do not change over a period
	 * of time, given the same set of arguments.
	 *
	 * @param {object} calls
	 * @return {?boolean}
	 */
	function isStaticCall(calls) {
	  return calls.hasOwnProperty('surrounds') || calls.hasOwnProperty('find');
	}

	/**
	 * Returns whether this is currently a set of calls that GraphQLRange
	 * supports
	 *
	 * @param {object} calls
	 * @return {boolean}
	 */
	function isValidRangeCall(calls) {
	  var hasFirst = calls.hasOwnProperty('first');
	  var hasLast = calls.hasOwnProperty('last');

	  // Currently only supports: first(), after().first(), last(), before().last()
	  // before().first(), after().last(), after().before().first(), and
	  // after().before().last()
	  // first() can never be called with last().
	  return (hasFirst || hasLast) && !(hasFirst && hasLast);
	}

	/**
	 * Returns whether the call values are supported by GraphQLRange
	 *
	 * @param {object} calls
	 * @return {boolean}
	 */
	function isValidRangeCallValues(calls) {
	  return calls.hasOwnProperty('first') && calls.first > 0 || calls.hasOwnProperty('last') && calls.last > 0;
	}

	/**
	 * Validates edge to ensure it has all the fields needed to be store properly.
	 *
	 * @param {object} edge
	 */
	function validateEdge(edge) {
	  !(GraphQLStoreDataHandler.getID(edge) !== undefined) ?  true ? invariant(false, 'GraphQLStore: `edge` must have a data id') : invariant(false) : undefined;
	  !(edge.node !== undefined) ?  true ? invariant(false, 'GraphQLStore: `edge` must have `node` field') : invariant(false) : undefined;
	}

	/**
	 * @param {array<object>} edges
	 */
	function validateEdges(edges) {
	  edges.forEach(validateEdge);
	}

	/**
	 * A range represents an ordered set of edges. Methods are provided for adding
	 * edges (`appendEdge`, `prependEdge`, `addItems`) and removing them
	 * (`removeEdgeWithID`).
	 *
	 * Within a range, each contiguous group of edges is modeled using a
	 * `GraphQLSegment`, but this is an implementation detail that `GraphQLRange`
	 * hides from its callers.
	 *
	 * Ranges model GraphQL connections, which are the means of traversing from a
	 * node to a set of associated objects; for example, in the following query the
	 * "friends" connection produces a range containing edges that lead to the
	 * requested friend nodes:
	 *
	 *     node(4) {
	 *       friends.first(2) {
	 *         edges {
	 *           node {
	 *             id,
	 *             name,
	 *           },
	 *         },
	 *       },
	 *     }
	 *
	 * @see `GraphQLSegment`
	 * @see "Connections" in https://fburl.com/graphql-connections
	 * @internal
	 */

	var GraphQLRange = (function () {
	  function GraphQLRange() {
	    _classCallCheck(this, GraphQLRange);

	    this.reset();
	  }

	  /**
	   * @param {array<object>} calls
	   * @return {string}
	   */

	  GraphQLRange.prototype.reset = function reset() {
	    // List of segments where each segment is a continuous chunk.
	    // There are gaps in between the segments. The first segment in the list
	    // should be cursors beginning at the top of the range (i.e. first(N)).
	    // The last segment in the list should be cursors at the bottom of
	    // the range (i.e. last(N)).
	    this._orderedSegments = [new GraphQLSegment(), new GraphQLSegment()];

	    // GraphQLRange nodes can also support static queries like surrounds,
	    // find, whose contents won't ever change for a given set of arguments.
	    // Store these queries' results in this map, since you can't do first()
	    // or last() queries on these ranges.
	    this._staticQueriesMap = {};

	    this._hasFirst = false;
	    this._hasLast = false;
	  };

	  /**
	   * @param {number} index
	   */

	  GraphQLRange.prototype._resetSegment = function _resetSegment(index) {
	    !(index >= 0 && index < this._orderedSegments.length) ?  true ? invariant(false, 'cannot reset non-existent segment') : invariant(false) : undefined;
	    this._orderedSegments[index] = new GraphQLSegment();
	  };

	  /**
	   * @param {string} cursor
	   * @return {?number}
	   */

	  GraphQLRange.prototype._getSegmentIndexByCursor = function _getSegmentIndexByCursor(cursor) {
	    // TODO: revisit if we end up having too many segments
	    for (var ii = 0; ii < this._orderedSegments.length; ii++) {
	      if (this._orderedSegments[ii].containsEdgeWithCursor(cursor)) {
	        return ii;
	      }
	    }
	    return null;
	  };

	  /**
	   * @param {string} id
	   * @return {?number}
	   */

	  GraphQLRange.prototype._getSegmentIndexByID = function _getSegmentIndexByID(id) {
	    // TODO: revisit if we end up having too many segments
	    for (var ii = 0; ii < this._orderedSegments.length; ii++) {
	      if (this._orderedSegments[ii].containsEdgeWithID(id)) {
	        return ii;
	      }
	    }
	    return null;
	  };

	  /**
	   * Add edges' data into the static queries map for the query calls,
	   * overwriting any previously existing data for these calls.
	   * @param {array<object>} queryCalls
	   * @param {array} edges
	   */

	  GraphQLRange.prototype._addStaticEdges = function _addStaticEdges(queryCalls, edges) {
	    var calls = _callsToString(queryCalls);
	    var edgeIDsToStore = [];
	    var cursorsToStore = [];

	    for (var ii = 0; ii < edges.length; ii++) {
	      var edge = edges[ii];
	      edgeIDsToStore.push(GraphQLStoreDataHandler.getID(edge));
	      cursorsToStore.push(edge.cursor);
	    }

	    this._staticQueriesMap[calls] = {
	      edgeIDs: edgeIDsToStore,
	      cursors: cursorsToStore
	    };
	  };

	  /**
	   * Add edges into the range based on the query calls. New edges will replace
	   * previous edges in the range.
	   * @param {array<object>} queryCalls
	   * @param {array} edges
	   * @param {object} pageInfo
	   */

	  GraphQLRange.prototype.addItems = function addItems(queryCalls, edges, pageInfo) {
	    validateEdges(edges);
	    var calls = callsArrayToObject(queryCalls);
	    var segmentCount, segmentIndex;

	    if (isStaticCall(calls)) {
	      this._addStaticEdges(queryCalls, edges);
	      return;
	    }

	    if (!isValidRangeCall(calls)) {
	      console.error('GraphQLRange currently only handles first(<count>), ' + 'after(<cursor>).first(<count>), last(<count>), ' + 'before(<cursor>).last(<count>), before(<cursor>).first(<count>), ' + 'and after(<cursor>).last(<count>)');
	      return;
	    }

	    // Skip the update if cursors are invalid
	    if (calls.before === null || calls.after === null) {
	      console.error('GraphQLRange received null as a cursor.');
	      return;
	    }

	    if (calls.first) {
	      // before().first() calls can produce gaps
	      if (calls.before && !calls.after) {
	        // make a new segment if there is a gap
	        if (pageInfo[HAS_NEXT_PAGE] === true) {
	          if (this._getSegmentIndexByCursor(calls.before) === 0) {
	            this._orderedSegments.unshift(new GraphQLSegment());
	          }
	          // When there is a gap from before().first() query, this is the same
	          // as just storing a first().
	          this._addAfterFirstItems(edges, pageInfo[HAS_NEXT_PAGE], undefined, calls.before);
	        } else {
	          // Since there is no gap, we can stitch into the beginning
	          // of existing segment
	          this._addBeforeLastItems(edges, pageInfo[HAS_PREV_PAGE], calls.before);
	        }
	      } else {
	        // These elements are added from paging to extend the the range.
	        if (!calls.after) {
	          segmentIndex = 0;
	          segmentCount = this.getFirstSegment().getCount();
	          if (segmentCount && (calls.first > segmentCount || edges.length > segmentCount) && !this.getFirstSegment().getFirstCursor()) {
	            // this is a range for which we don't have a cursor, and we've
	            // fetched more data by increasing the `first(N)` variable; we
	            // blow away and replace the first segment in order to side-step
	            // issues where the order of IDs in the range may change between
	            // queries
	            this._resetSegment(segmentIndex);
	          }
	        }
	        this._addAfterFirstItems(edges, pageInfo[HAS_NEXT_PAGE], calls.after, calls.before);
	      }
	    } else if (calls.last) {
	      // after().last() calls can produce gaps
	      if (calls.after && !calls.before) {
	        // make a new segment if there is a gap
	        if (pageInfo[HAS_PREV_PAGE] === true) {
	          if (this._getSegmentIndexByCursor(calls.after) === this._orderedSegments.length - 1) {
	            this._orderedSegments.push(new GraphQLSegment());
	          }
	          // When there is a gap from after().last() query, this is the same as
	          // just storing a last().
	          this._addBeforeLastItems(edges, pageInfo[HAS_PREV_PAGE], undefined, calls.after);
	        } else {
	          // Since there is no gap, we can stitch to the end
	          // of existing segment
	          this._addAfterFirstItems(edges, pageInfo[HAS_NEXT_PAGE], calls.after);
	        }
	      } else {
	        // These elements are added from paging to extend the the range.
	        if (!calls.before) {
	          segmentIndex = this._orderedSegments.length - 1;
	          segmentCount = this.getLastSegment().getCount();
	          if (segmentCount && (calls.last > segmentCount || edges.length > segmentCount) && !this.getLastSegment().getLastCursor()) {
	            // this is a range for which we don't have a cursor, and we've
	            // fetched more data by increasing the `last(N)` variable; we
	            // blow away and replace the last segment in order to side-step
	            // issues where the order of IDs in the range may change between
	            // queries
	            this._resetSegment(segmentIndex);
	          }
	        }
	        this._addBeforeLastItems(edges, pageInfo[HAS_PREV_PAGE], calls.before, calls.after);
	      }
	    }
	  };

	  /**
	   * @return {GraphQLSegment}
	   */

	  GraphQLRange.prototype.getFirstSegment = function getFirstSegment() {
	    return this._orderedSegments[0];
	  };

	  /**
	   * @return {GraphQLSegment}
	   */

	  GraphQLRange.prototype.getLastSegment = function getLastSegment() {
	    return this._orderedSegments[this._orderedSegments.length - 1];
	  };

	  /**
	   * Tries to concat segments at segmentIndex and segmentIndex + 1.
	   * This is an all or nothing operation.
	   * If concat is successful, we'll remove the segment at segmentIndex + 1
	   * from the orderedSegments after all elements has been added to the segment
	   * at segmentIndex.
	   * If concat is unsuccessful, nothing will be changed.
	   * @param {number} segmentIndex
	   */

	  GraphQLRange.prototype._concatSegments = function _concatSegments(segmentIndex) {
	    !(segmentIndex + 1 < this._orderedSegments.length && segmentIndex >= 0) ?  true ? invariant(false, 'GraphQLRange cannot concat segments outside the range ' + 'of orderedSegments') : invariant(false) : undefined;
	    var firstSegment = this._orderedSegments[segmentIndex];
	    var secondSegment = this._orderedSegments[segmentIndex + 1];
	    if (firstSegment.concatSegment(secondSegment)) {
	      this._orderedSegments.splice(segmentIndex + 1, 1);
	    } else {
	      console.error('GraphQLRange was unable to concat segment %d and segment %d', segmentIndex, segmentIndex + 1);
	    }
	  };

	  /**
	   * Adds the edge to the front of the range. New edge will replace previous
	   * edge that have the same id.
	   * @param {object} edge
	   */

	  GraphQLRange.prototype.prependEdge = function prependEdge(edge) {
	    validateEdge(edge);
	    this._hasFirst = true;
	    this._removeEdgeIfApplicable(edge);
	    var segment = this.getFirstSegment();
	    segment.prependEdge(edge);
	  };

	  /**
	   * Adds the edge to the end of the range. New edge will replace previous
	   * edge that have the same id.
	   * @param {object} edge
	   */

	  GraphQLRange.prototype.appendEdge = function appendEdge(edge) {
	    validateEdge(edge);
	    this._hasLast = true;
	    this._removeEdgeIfApplicable(edge);
	    var segment = this.getLastSegment();
	    segment.appendEdge(edge);
	  };

	  /**
	   * Removes edge in range if it matches id in input edge.
	   * @param {object} edge
	   */

	  GraphQLRange.prototype._removeEdgeIfApplicable = function _removeEdgeIfApplicable(edge) {
	    var id = GraphQLStoreDataHandler.getID(edge);
	    var index = this._getSegmentIndexByID(id);
	    if (index != null) {
	      this._orderedSegments[index].removeEdge(id);
	    }
	  };

	  /**
	   * Remove any edges in the range if it matches any of the ids in the input.
	   * This function is used to prevent us from adding any id that already exist
	   * in the range.
	   *
	   * @param {array} edges
	   */

	  GraphQLRange.prototype._removeEdgesIfApplicable = function _removeEdgesIfApplicable(edges) {
	    for (var ii = 0; ii < edges.length; ii++) {
	      this._removeEdgeIfApplicable(edges[ii]);
	    }
	  };

	  /**
	   * Add items into the correct segment with the cursor. If no cursor
	   * is present, items are added to the very first segment.
	   *
	   * @param {array} edges
	   * @param {boolean} hasNextPage
	   * @param {?string} afterCursor
	   * @param {?string} beforeCursor
	   */

	  GraphQLRange.prototype._addAfterFirstItems = function _addAfterFirstItems(edges, hasNextPage, afterCursor, beforeCursor) {
	    var segment;
	    var segmentIndex;
	    var lastCursor;
	    if (afterCursor !== undefined) {
	      segmentIndex = this._getSegmentIndexByCursor(afterCursor);
	      if (segmentIndex == null) {
	         true ? warning(false, 'GraphQLRange cannot find a segment that has the cursor: %s', afterCursor) : undefined;
	        return;
	      }
	      segment = this._orderedSegments[segmentIndex];
	      lastCursor = segment.getLastCursor();
	      if (lastCursor !== afterCursor) {
	        edges = this._reconcileAfterFirstEdges(segment, edges, afterCursor);
	        afterCursor = lastCursor;
	        if (!edges) {
	          return;
	        }
	      }
	    } else {
	      segmentIndex = 0;
	      segment = this._orderedSegments[segmentIndex];
	      lastCursor = segment.getLastCursor();
	      if (lastCursor !== undefined) {
	        edges = this._reconcileAfterFirstEdges(segment, edges);
	        afterCursor = lastCursor;
	        if (!edges) {
	          return;
	        }
	      }
	    }
	    if (beforeCursor !== undefined) {
	      if (segmentIndex === this._orderedSegments.length - 1) {
	        console.error('GraphQLRange cannot add because there is no next segment');
	        return;
	      } else if (this._orderedSegments[segmentIndex + 1].getFirstCursor() !== beforeCursor) {
	         true ? warning(false, 'GraphQLRange cannot add because beforeCursor does not match first ' + 'cursor of the next segment') : undefined;
	        return;
	      }
	    }

	    if (afterCursor === undefined) {
	      this._hasFirst = true;
	    }

	    this._removeEdgesIfApplicable(edges);
	    segment.addEdgesAfterCursor(edges, afterCursor);
	    if (!hasNextPage) {
	      if (beforeCursor !== undefined) {
	        // If we have a beforeCursor and there is no next page,
	        // then there is no gap between the current segment and the next.
	        // We can concat the two segments when there is no gap.
	        this._concatSegments(segmentIndex);
	      } else {
	        this._hasLast = true;
	        // If this segment already has the last element, we don't
	        // need any segments after this.
	        this._orderedSegments.splice(segmentIndex + 1, this._orderedSegments.length - 1 - segmentIndex);
	      }
	    }
	  };

	  /**
	   * In the case the cursor does not correspond last cursor,
	   * walk through the edges to see if we can trim edges to
	   * only those after the last cursor. Returns undefined when
	   * the input cannot be reconciled.
	   *
	   * @param {GraphQLSegment} segment
	   * @param {array} edges
	   * @param {?string} cursor
	   * @return {?array} trimmed edges
	   */

	  GraphQLRange.prototype._reconcileAfterFirstEdges = function _reconcileAfterFirstEdges(segment, edges, cursor) {
	    var metadata = segment.getMetadataAfterCursor(edges.length + 1, cursor);
	    var edgeIDs = metadata.edgeIDs;
	    if (edgeIDs.length > edges.length) {
	      // Already have more edges than the input.
	      return undefined;
	    }

	    for (var ii = 0; ii < edgeIDs.length; ii++) {
	      if (edgeIDs[ii] !== GraphQLStoreDataHandler.getID(edges[ii])) {
	         true ? warning(false, 'Relay was unable to reconcile edges on a connection. This most ' + 'likely occurred while trying to handle a server response that ' + 'includes connection edges with nodes that lack an `id` field.') : undefined;
	        return undefined;
	      }
	    }
	    return edges.slice(edgeIDs.length);
	  };

	  /**
	   * Add items into the correct segment with the cursor. If no cursor
	   * is present, items are added to the very last segment.
	   * @param {array} edges
	   * @param {boolean} hasPrevPage
	   * @param {?string} beforeCursor
	   * @param {?string} afterCursor
	   */

	  GraphQLRange.prototype._addBeforeLastItems = function _addBeforeLastItems(edges, hasPrevPage, beforeCursor, afterCursor) {
	    var segment;
	    var segmentIndex;
	    var firstCursor;
	    if (beforeCursor !== undefined) {
	      segmentIndex = this._getSegmentIndexByCursor(beforeCursor);
	      if (segmentIndex == null) {
	         true ? warning(false, 'GraphQLRange cannot find a segment that has the cursor: %s', beforeCursor) : undefined;
	        return;
	      }
	      segment = this._orderedSegments[segmentIndex];
	      firstCursor = segment.getFirstCursor();
	      if (firstCursor !== beforeCursor) {
	        edges = this._reconcileBeforeLastEdges(segment, edges, beforeCursor);
	        beforeCursor = firstCursor;
	        if (!edges) {
	          return;
	        }
	      }
	    } else {
	      segmentIndex = this._orderedSegments.length - 1;
	      segment = this._orderedSegments[segmentIndex];
	      firstCursor = segment.getFirstCursor();
	      if (firstCursor !== undefined) {
	        edges = this._reconcileBeforeLastEdges(segment, edges, beforeCursor);
	        beforeCursor = firstCursor;
	        if (!edges) {
	          return;
	        }
	      }
	    }

	    if (afterCursor !== undefined) {
	      if (segmentIndex === 0) {
	        console.error('GraphQLRange cannot add because there is no previous segment');
	        return;
	      } else if (this._orderedSegments[segmentIndex - 1].getLastCursor() !== afterCursor) {
	         true ? warning(false, 'GraphQLRange cannot add because afterCursor does not match last ' + 'cursor of the previous segment') : undefined;
	        return;
	      }
	    }

	    if (beforeCursor === undefined) {
	      this._hasLast = true;
	    }

	    this._removeEdgesIfApplicable(edges);
	    segment.addEdgesBeforeCursor(edges, beforeCursor);
	    if (!hasPrevPage) {
	      if (afterCursor !== undefined) {
	        // If we have an afterCursor and there is no previous page,
	        // then there is no gap between the current segment and the previous.
	        // We can concat the two segments when there is no gap.
	        this._concatSegments(segmentIndex - 1);
	      } else {
	        this._hasFirst = true;
	        // If this segment already has the first element, we don't
	        // need any segments before this.
	        this._orderedSegments.splice(0, segmentIndex);
	      }
	    }
	  };

	  /**
	   * In the case the cursor does not correspond first cursor,
	   * walk through the edges to see if we can trim edges to
	   * only those before the first cursor. Returns undefined when
	   * the input cannot be reconciled.
	   *
	   * @param {GraphQLSegment} segment
	   * @param {array} edges
	   * @param {?string} cursor
	   * @return {?array} trimmed edges
	   */

	  GraphQLRange.prototype._reconcileBeforeLastEdges = function _reconcileBeforeLastEdges(segment, edges, cursor) {
	    var metadata = segment.getMetadataBeforeCursor(edges.length + 1, cursor);
	    var edgeIDs = metadata.edgeIDs;
	    if (edgeIDs.length > edges.length) {
	      // Already have more edges than the input.
	      return undefined;
	    }

	    for (var ii = 1; ii <= edgeIDs.length; ii++) {
	      if (edgeIDs[edgeIDs.length - ii] !== GraphQLStoreDataHandler.getID(edges[edges.length - ii])) {
	         true ? warning(false, 'Relay was unable to reconcile edges on a connection. This most ' + 'likely occurred while trying to handle a server response that ' + 'includes connection edges with nodes that lack an `id` field.') : undefined;
	        return undefined;
	      }
	    }
	    return edges.slice(0, edges.length - edgeIDs.length);
	  };

	  /**
	   * Removes an edge from this range such that the edge will never be reachable
	   * regardless of the client session. This is used by delete mutations.
	   *
	   * @param {string} id
	   */

	  GraphQLRange.prototype.removeEdgeWithID = function removeEdgeWithID(id) {
	    for (var ii = 0; ii < this._orderedSegments.length; ii++) {
	      this._orderedSegments[ii].removeAllEdges(id);
	    }
	  };

	  /**
	   * @param {array<object>} queryCalls
	   * @param {?object} optimisticData
	   * @return {object} includes fields: requestedEdgeIDs, diffCalls
	   */

	  GraphQLRange.prototype.retrieveRangeInfoForQuery = function retrieveRangeInfoForQuery(queryCalls, optimisticData) {
	    var calls = callsArrayToObject(queryCalls);

	    if (isStaticCall(calls)) {
	      return this._retrieveRangeInfoForStaticCalls(queryCalls);
	    }

	    // Convert to name => true, so we can test for whether the key exists
	    // without comparing to undefined
	    if (!isValidRangeCall(calls)) {
	      console.error('GraphQLRange currently only handles first(<count>), ' + 'after(<cursor>).first(<count>), last(<count>), ' + 'before(<cursor>).last(<count>), before(<cursor>).first(<count>), ' + 'and after(<cursor>).last(<count>)');
	      return {
	        requestedEdgeIDs: [],
	        diffCalls: [],
	        pageInfo: RelayConnectionInterface.getDefaultPageInfo()
	      };
	    }
	    if (calls.first && calls.before || calls.last && calls.after) {
	      // TODO #7556678: add support for first/before and last/after
	      console.warn('GraphQLRange does not currently handle retrieval for ' + 'before(<cursor>).first(<count>) and after(<cursor>).last(<count>)');
	      return {
	        requestedEdgeIDs: [],
	        diffCalls: [],
	        pageInfo: RelayConnectionInterface.getDefaultPageInfo()
	      };
	    }
	    if (!isValidRangeCallValues(calls)) {
	      console.error('GraphQLRange only supports first(<count>) or last(<count>) ' + 'where count is greater than 0');
	      return {
	        requestedEdgeIDs: [],
	        diffCalls: [],
	        pageInfo: RelayConnectionInterface.getDefaultPageInfo()
	      };
	    }
	    if (calls.first) {
	      return this._retrieveRangeInfoForFirstQuery(queryCalls, optimisticData);
	    } else if (calls.last) {
	      return this._retrieveRangeInfoForLastQuery(queryCalls, optimisticData);
	    }
	  };

	  /**
	   * @param {array<object>} queryCalls
	   * @return {object} includes fields: requestedEdgeIDs, diffCalls
	   */

	  GraphQLRange.prototype._retrieveRangeInfoForStaticCalls = function _retrieveRangeInfoForStaticCalls(queryCalls) {
	    var calls = _callsToString(queryCalls);
	    var storedInfo = this._staticQueriesMap[calls];

	    if (storedInfo) {
	      var _pageInfo;

	      return {
	        requestedEdgeIDs: storedInfo.edgeIDs,
	        diffCalls: [],
	        pageInfo: (_pageInfo = {}, _defineProperty(_pageInfo, START_CURSOR, storedInfo.cursors[0]), _defineProperty(_pageInfo, END_CURSOR, storedInfo.cursors[storedInfo.cursors.length - 1]), _defineProperty(_pageInfo, HAS_NEXT_PAGE, true), _defineProperty(_pageInfo, HAS_PREV_PAGE, true), _pageInfo)
	      };
	    }

	    // if we don't have the data for this static call already,
	    // return empty arrays with the corresponding diffCalls
	    return {
	      requestedEdgeIDs: [],
	      diffCalls: queryCalls,
	      pageInfo: RelayConnectionInterface.getDefaultPageInfo()
	    };
	  };

	  /**
	   * @param {array<object>} queryCalls
	   * @param {?object} optimisticData
	   * @return {object} includes fields: requestedEdgeIDs, diffCalls
	   */

	  GraphQLRange.prototype._retrieveRangeInfoForFirstQuery = function _retrieveRangeInfoForFirstQuery(queryCalls, optimisticData) {
	    var prependEdgeIDs = [];
	    var deleteIDs = [];
	    if (optimisticData) {
	      prependEdgeIDs = optimisticData[GraphQLMutatorConstants.PREPEND] || [];
	      deleteIDs = optimisticData[GraphQLMutatorConstants.REMOVE] || [];
	    }

	    var calls = callsArrayToObject(queryCalls);
	    var countNeeded = calls.first + deleteIDs.length;
	    var segment;
	    var segmentIndex;
	    var pageInfo = _extends({}, RelayConnectionInterface.getDefaultPageInfo());

	    var afterCursor = calls.after;
	    if (afterCursor !== undefined) {
	      segmentIndex = this._getSegmentIndexByCursor(afterCursor);
	      if (segmentIndex == null) {
	        console.error('GraphQLRange cannot find a segment that has the cursor: ' + afterCursor);
	        return {
	          requestedEdgeIDs: [],
	          diffCalls: [],
	          pageInfo: pageInfo
	        };
	      }
	      segment = this._orderedSegments[segmentIndex];
	    } else {
	      var prependEdgesCount = prependEdgeIDs.length;
	      countNeeded -= prependEdgesCount;

	      segmentIndex = 0;
	      segment = this._orderedSegments[segmentIndex];
	    }

	    var requestedMetadata = segment.getMetadataAfterCursor(countNeeded, afterCursor);
	    var requestedEdgeIDs = requestedMetadata.edgeIDs;
	    var requestedCursors = requestedMetadata.cursors;
	    var diffCalls = [];
	    if (requestedCursors.length) {
	      pageInfo[START_CURSOR] = requestedCursors[0];
	      pageInfo[END_CURSOR] = requestedCursors[requestedCursors.length - 1];
	    }
	    var lastID = requestedEdgeIDs[requestedEdgeIDs.length - 1];
	    // Only requested segment that does not include very last item from
	    // the range can have next page and diff calls
	    if (!this._hasLast || segmentIndex !== this._orderedSegments.length - 1 || lastID && lastID !== segment.getLastID()) {
	      pageInfo[HAS_NEXT_PAGE] = true;
	      if (requestedEdgeIDs.length < countNeeded) {
	        countNeeded -= requestedEdgeIDs.length;
	        var lastCursor = segment.getLastCursor();
	        // If segment has null cursors, retrieve whole range.
	        if (lastCursor === null) {
	          diffCalls.push({ name: 'first', value: calls.first });
	        } else {
	          if (lastCursor !== undefined) {
	            diffCalls.push({ name: 'after', value: lastCursor });
	          }
	          // If this is not the last segment, we should not request edges
	          // that would overlap the first element of the next segment.
	          if (segmentIndex !== this._orderedSegments.length - 1) {
	            var nextSegment = this._orderedSegments[segmentIndex + 1];
	            var firstCursor = nextSegment.getFirstCursor();
	            if (firstCursor !== undefined) {
	              diffCalls.push({ name: 'before', value: firstCursor });
	            }
	          }
	          diffCalls.push({ name: 'first', value: countNeeded });
	        }
	      }
	    }

	    if (!calls.after) {
	      requestedEdgeIDs = prependEdgeIDs.concat(requestedEdgeIDs);
	    }

	    if (deleteIDs.length) {
	      requestedEdgeIDs = requestedEdgeIDs.filter(function (edgeID) {
	        return deleteIDs.indexOf(edgeID) == -1;
	      });
	    }

	    return {
	      requestedEdgeIDs: requestedEdgeIDs,
	      diffCalls: diffCalls,
	      pageInfo: pageInfo
	    };
	  };

	  /**
	   * @param {array<object>} queryCalls
	   * @param {?object} optimisticData
	   * @return {object} includes fields: requestedEdgeIDs, diffCalls
	   */

	  GraphQLRange.prototype._retrieveRangeInfoForLastQuery = function _retrieveRangeInfoForLastQuery(queryCalls, optimisticData) {
	    var appendEdgeIDs = [];
	    var deleteIDs = [];
	    if (optimisticData) {
	      appendEdgeIDs = optimisticData[GraphQLMutatorConstants.APPEND] || [];
	      deleteIDs = optimisticData[GraphQLMutatorConstants.REMOVE] || [];
	    }
	    var calls = callsArrayToObject(queryCalls);
	    var countNeeded = calls.last + deleteIDs.length;
	    var segment;
	    var segmentIndex;
	    var pageInfo = _extends({}, RelayConnectionInterface.getDefaultPageInfo());

	    var beforeCursor = calls.before;
	    if (beforeCursor !== undefined) {
	      segmentIndex = this._getSegmentIndexByCursor(beforeCursor);
	      if (segmentIndex == null) {
	        console.error('GraphQLRange cannot find a segment that has the cursor: ' + beforeCursor);
	        return {
	          requestedEdgeIDs: [],
	          diffCalls: [],
	          pageInfo: pageInfo
	        };
	      }
	      segment = this._orderedSegments[segmentIndex];
	    } else {
	      var appendEdgesCount = appendEdgeIDs.length;
	      countNeeded -= appendEdgesCount;

	      segmentIndex = this._orderedSegments.length - 1;
	      segment = this._orderedSegments[segmentIndex];
	    }

	    var requestedMetadata = segment.getMetadataBeforeCursor(countNeeded, beforeCursor);
	    var requestedEdgeIDs = requestedMetadata.edgeIDs;
	    var requestedCursors = requestedMetadata.cursors;
	    var diffCalls = [];
	    if (requestedCursors.length) {
	      pageInfo[START_CURSOR] = requestedCursors[0];
	      pageInfo[END_CURSOR] = requestedCursors[requestedCursors.length - 1];
	    }
	    var firstID = requestedEdgeIDs[0];
	    // Only requested segment that does not include very first item from
	    // the range can have next page and diff calls
	    if (!this._hasFirst || segmentIndex !== 0 || firstID && firstID !== segment.getFirstID()) {
	      pageInfo[HAS_PREV_PAGE] = true;
	      if (requestedEdgeIDs.length < countNeeded) {
	        countNeeded -= requestedEdgeIDs.length;
	        var firstCursor = segment.getFirstCursor();
	        // If segment has null cursors, retrieve whole range.
	        if (firstCursor === null) {
	          diffCalls.push({ name: 'last', value: calls.last });
	        } else {
	          if (firstCursor !== undefined) {
	            diffCalls.push({ name: 'before', value: firstCursor });
	          }
	          // If this is not the first segment, we should not request edges
	          // that would overlap the last element of the previous segment.
	          if (segmentIndex !== 0) {
	            var prevSegment = this._orderedSegments[segmentIndex - 1];
	            var lastCursor = prevSegment.getLastCursor();
	            if (lastCursor !== undefined) {
	              diffCalls.push({ name: 'after', value: lastCursor });
	            }
	          }
	          diffCalls.push({ name: 'last', value: countNeeded });
	        }
	      }
	    }

	    if (!calls.before) {
	      requestedEdgeIDs = requestedEdgeIDs.concat(appendEdgeIDs);
	    }

	    if (deleteIDs.length) {
	      requestedEdgeIDs = requestedEdgeIDs.filter(function (edgeID) {
	        return deleteIDs.indexOf(edgeID) == -1;
	      });
	    }

	    return {
	      requestedEdgeIDs: requestedEdgeIDs,
	      diffCalls: diffCalls,
	      pageInfo: pageInfo
	    };
	  };

	  GraphQLRange.fromJSON = function fromJSON(descriptor) {
	    var _descriptor = _slicedToArray(descriptor, 4);

	    var hasFirst = _descriptor[0];
	    var hasLast = _descriptor[1];
	    var staticQueriesMap = _descriptor[2];
	    var orderedSegments = _descriptor[3];

	    var range = new GraphQLRange();
	    range._hasFirst = hasFirst;
	    range._hasLast = hasLast;
	    range._staticQueriesMap = staticQueriesMap;
	    range._orderedSegments = orderedSegments.map(function (descriptor) {
	      return GraphQLSegment.fromJSON(descriptor);
	    });
	    return range;
	  };

	  GraphQLRange.prototype.toJSON = function toJSON() {
	    return [this._hasFirst, this._hasLast, this._staticQueriesMap, this._orderedSegments];
	  };

	  GraphQLRange.prototype.__debug = function __debug() {
	    return {
	      orderedSegments: this._orderedSegments
	    };
	  };

	  GraphQLRange.prototype.getEdgeIDs = function getEdgeIDs() {
	    var edgeIDs = [];
	    this._orderedSegments.forEach(function (segment) {
	      edgeIDs.push.apply(edgeIDs, _toConsumableArray(segment.getEdgeIDs()));
	    });
	    forEachObject(this._staticQueriesMap, function (query) {
	      edgeIDs.push.apply(edgeIDs, _toConsumableArray(query.edgeIDs));
	    });
	    return edgeIDs;
	  };

	  return GraphQLRange;
	})();

	function _callsToString(calls) {
	  return calls.map(function (call) {
	    return printRelayQueryCall(call).substring(1);
	  }).join(',');
	}

	module.exports = GraphQLRange;

/***/ },
/* 130 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule GraphQLSegment
	 * @typechecks
	 */

	'use strict';

	var _classCallCheck = __webpack_require__(2)['default'];

	var _slicedToArray = __webpack_require__(22)['default'];

	var _Object$assign = __webpack_require__(46)['default'];

	var _Object$keys = __webpack_require__(5)['default'];

	var GraphQLStoreDataHandler = __webpack_require__(8);

	/**
	 * Represents one contiguous segment of edges within a `GraphQLRange`. Has
	 * methods for adding/removing edges (`appendEdge`, `prependEdge`, `removeEdge`)
	 * and working with cursors (`getFirstCursor`, `getLastCursor` etc)
	 *
	 * Edges are never actually deleted from segments; they are merely marked as
	 * being deleted. As such, `GraphQLSegment` offers both a `getCount` method
	 * (returning the number of non-deleted edges) and a `getLength` method (which
	 * returns the total number, including deleted edges).
	 *
	 * Used mostly as an implementation detail internal to `GraphQLRange`.
	 *
	 * @internal
	 */

	var GraphQLSegment = (function () {
	  function GraphQLSegment() {
	    _classCallCheck(this, GraphQLSegment);

	    // We use a map rather than an array because indices can become negative
	    // when prepending.
	    this._indexToMetadataMap = {};

	    // We keep track of past indices to ensure we can delete them completely.
	    this._idToIndicesMap = {};
	    this._cursorToIndexMap = {};

	    this._count = 0;
	    this._minIndex = null;
	    this._maxIndex = null;
	  }

	  /**
	   * @param {string} cursor
	   * @return {?number}
	   */

	  GraphQLSegment.prototype._getIndexForCursor = function _getIndexForCursor(cursor) {
	    return this._cursorToIndexMap[cursor];
	  };

	  /**
	   * @param {string} id
	   * @return {?number}
	   */

	  GraphQLSegment.prototype._getIndexForID = function _getIndexForID(id) {
	    var indices = this._idToIndicesMap[id];
	    return indices && indices[0];
	  };

	  /**
	   * @return {?string} cursor for first non-deleted edge
	   */

	  GraphQLSegment.prototype.getFirstCursor = function getFirstCursor() {
	    if (this.getLength()) {
	      for (var ii = this._minIndex; ii <= this._maxIndex; ii++) {
	        var metadata = this._indexToMetadataMap[ii];
	        if (!metadata.deleted) {
	          return metadata.cursor;
	        }
	      }
	    }
	  };

	  /**
	   * @return {?string} cursor for last non-deleted edge
	   */

	  GraphQLSegment.prototype.getLastCursor = function getLastCursor() {
	    if (this.getLength()) {
	      for (var ii = this._maxIndex; ii >= this._minIndex; ii--) {
	        var metadata = this._indexToMetadataMap[ii];
	        if (!metadata.deleted) {
	          return metadata.cursor;
	        }
	      }
	    }
	  };

	  /**
	   * @return {?string} id for first non-deleted edge
	   */

	  GraphQLSegment.prototype.getFirstID = function getFirstID() {
	    if (this.getLength()) {
	      for (var ii = this._minIndex; ii <= this._maxIndex; ii++) {
	        var metadata = this._indexToMetadataMap[ii];
	        if (!metadata.deleted) {
	          return metadata.edgeID;
	        }
	      }
	    }
	  };

	  /**
	   * @return {?string} id for last non-deleted edge
	   */

	  GraphQLSegment.prototype.getLastID = function getLastID() {
	    if (this.getLength()) {
	      for (var ii = this._maxIndex; ii >= this._minIndex; ii--) {
	        var metadata = this._indexToMetadataMap[ii];
	        if (!metadata.deleted) {
	          return metadata.edgeID;
	        }
	      }
	    }
	  };

	  /**
	   * @param {number} index
	   * @return {?object} Returns the not-deleted edge at index
	   */

	  GraphQLSegment.prototype._getEdgeAtIndex = function _getEdgeAtIndex(index) {
	    var edge = this._indexToMetadataMap[index];
	    return edge && !edge.deleted ? edge : null;
	  };

	  /**
	   * Returns whether there is a non-deleted edge for id
	   * @param {string} id
	   * @return {boolean}
	   */

	  GraphQLSegment.prototype.containsEdgeWithID = function containsEdgeWithID(id) {
	    var index = this._getIndexForID(id);
	    if (index === undefined) {
	      return false;
	    }
	    return !!this._getEdgeAtIndex(index);
	  };

	  /**
	   * Returns whether there is a non-deleted edge for cursor
	   * @param {string} cursor
	   * @return {boolean}
	   */

	  GraphQLSegment.prototype.containsEdgeWithCursor = function containsEdgeWithCursor(cursor) {
	    var index = this._getIndexForCursor(cursor);
	    if (index === undefined) {
	      return false;
	    }
	    return !!this._getEdgeAtIndex(index);
	  };

	  /**
	   * Returns up to count number of ids and cursors that is after input cursor
	   * @param {number} count
	   * @param {?string} cursor
	   * @return {object} object with arrays of ids and cursors
	   */

	  GraphQLSegment.prototype.getMetadataAfterCursor = function getMetadataAfterCursor(count, cursor) {
	    if (!this.getLength()) {
	      return {
	        edgeIDs: [],
	        cursors: []
	      };
	    }
	    var currentIndex = this._minIndex;
	    if (cursor) {
	      var index = this._getIndexForCursor(cursor);
	      if (index === undefined) {
	        console.error('This segment does not have a cursor %s', cursor);
	        return {
	          edgeIDs: [],
	          cursors: []
	        };
	      }
	      currentIndex = index + 1;
	    }
	    var total = 0;
	    var edgeIDs = [];
	    var cursors = [];

	    while (currentIndex <= this._maxIndex && total < count) {
	      var metadata = this._indexToMetadataMap[currentIndex];
	      if (!metadata.deleted) {
	        edgeIDs.push(metadata.edgeID);
	        cursors.push(metadata.cursor);
	        total++;
	      }
	      currentIndex++;
	    }
	    return {
	      edgeIDs: edgeIDs,
	      cursors: cursors
	    };
	  };

	  /**
	   * Returns up to count number of ids and cursors that is before index
	   * @param {number} count
	   * @param {?string} cursor
	   * @return {object} object with arrays of ids and cursors
	   */

	  GraphQLSegment.prototype.getMetadataBeforeCursor = function getMetadataBeforeCursor(count, cursor) {
	    if (!this.getLength()) {
	      return {
	        edgeIDs: [],
	        cursors: []
	      };
	    }
	    var currentIndex = this._maxIndex;
	    if (cursor) {
	      var index = this._getIndexForCursor(cursor);
	      if (index === undefined) {
	        console.error('This segment does not have a cursor %s', cursor);
	        return {
	          edgeIDs: [],
	          cursors: []
	        };
	      }
	      currentIndex = index - 1;
	    }
	    var total = 0;
	    var edgeIDs = [];
	    var cursors = [];
	    while (currentIndex >= this._minIndex && total < count) {
	      var metadata = this._indexToMetadataMap[currentIndex];
	      if (!metadata.deleted) {
	        edgeIDs.push(metadata.edgeID);
	        cursors.push(metadata.cursor);
	        total++;
	      }
	      currentIndex--;
	    }

	    // Reverse edges because larger index were added first
	    return {
	      edgeIDs: edgeIDs.reverse(),
	      cursors: cursors.reverse()
	    };
	  };

	  /**
	   * @param {object} edge
	   * @param {number} index
	   */

	  GraphQLSegment.prototype._addEdgeAtIndex = function _addEdgeAtIndex(edge, index) {
	    if (this.getLength() === 0) {
	      this._minIndex = index;
	      this._maxIndex = index;
	    } else if (this._minIndex == index + 1) {
	      this._minIndex = index;
	    } else if (this._maxIndex == index - 1) {
	      this._maxIndex = index;
	    } else {
	      console.error('Attempted to add noncontiguous index to GraphQLSegment: ' + index + ' to (' + this._minIndex + ", " + this._maxIndex + ")");

	      return;
	    }
	    var edgeID = GraphQLStoreDataHandler.getID(edge);
	    var cursor = edge.cursor;

	    var idIndex = this._getIndexForID(edgeID);
	    // If the id is has an index and is not deleted
	    if (idIndex !== undefined && this._getEdgeAtIndex(idIndex)) {
	      console.error('Attempted to add an ID already in GraphQLSegment: %s', edgeID);
	      return;
	    }

	    this._indexToMetadataMap[index] = {
	      edgeID: edgeID,
	      cursor: cursor,
	      deleted: false
	    };
	    this._idToIndicesMap[edgeID] = this._idToIndicesMap[edgeID] || [];
	    this._idToIndicesMap[edgeID].unshift(index);
	    this._count++;

	    if (cursor) {
	      this._cursorToIndexMap[cursor] = index;
	    }
	  };

	  /**
	   * @param {object} edge should have cursor and a node with id
	   */

	  GraphQLSegment.prototype.prependEdge = function prependEdge(edge) {
	    this._addEdgeAtIndex(edge, this._minIndex !== null ? this._minIndex - 1 : 0);
	  };

	  /**
	   * @param {object} edge should have cursor and a node with id
	   */

	  GraphQLSegment.prototype.appendEdge = function appendEdge(edge) {
	    this._addEdgeAtIndex(edge, this._maxIndex !== null ? this._maxIndex + 1 : 0);
	  };

	  /**
	   * Mark the currently valid edge with given id to be deleted.
	   *
	   * @param {string} id the id of the edge to be removed
	   */

	  GraphQLSegment.prototype.removeEdge = function removeEdge(id) {
	    var index = this._getIndexForID(id);
	    if (index === undefined) {
	      console.error('Attempted to remove edge with ID that was never in GraphQLSegment: ' + id);
	      return;
	    }
	    var data = this._indexToMetadataMap[index];
	    if (data.deleted) {
	      console.error('Attempted to remove edge with ID that was already removed: ' + id);
	      return;
	    }
	    data.deleted = true;
	    this._count--;
	  };

	  /**
	   * Mark all edges with given id to be deleted. This is used by
	   * delete mutations to ensure both the current and past edges are no longer
	   * accessible.
	   *
	   * @param {string} id the id of the edge to be removed
	   */

	  GraphQLSegment.prototype.removeAllEdges = function removeAllEdges(id) {
	    var indices = this._idToIndicesMap[id];
	    if (!indices) {
	      return;
	    }
	    for (var ii = 0; ii < indices.length; ii++) {
	      var data = this._indexToMetadataMap[indices[ii]];
	      if (!data.deleted) {
	        data.deleted = true;
	        this._count--;
	      }
	    }
	  };

	  /**
	   * @param {array} edges
	   * @param {?string} cursor
	   */

	  GraphQLSegment.prototype.addEdgesAfterCursor = function addEdgesAfterCursor(edges, cursor) {
	    // Default adding after with no cursor to -1
	    // So the first element in the segment is stored at index 0
	    var index = -1;
	    if (cursor) {
	      index = this._getIndexForCursor(cursor);
	      if (index === undefined) {
	        console.error('This segment does not have a cursor %s', cursor);
	        return;
	      }
	    }

	    while (this._maxIndex !== null && index < this._maxIndex) {
	      var data = this._indexToMetadataMap[index + 1];
	      // Skip over elements that have been deleted
	      // so we can add new edges on the end.
	      if (data.deleted) {
	        index++;
	      } else {
	        console.error('Attempted to do an overwrite to GraphQLSegment: ' + 'last index is ' + this._maxIndex + ' trying to add edges before ' + index);
	        return;
	      }
	    }

	    var startIndex = index + 1;
	    for (var ii = 0; ii < edges.length; ii++) {
	      var edge = edges[ii];
	      this._addEdgeAtIndex(edge, startIndex + ii);
	    }
	  };

	  /**
	   * @param {array} edges - should be in increasing order of index
	   * @param {?string} cursor
	   */

	  GraphQLSegment.prototype.addEdgesBeforeCursor = function addEdgesBeforeCursor(edges, cursor) {
	    // Default adding before with no cursor to 1
	    // So the first element in the segment is stored at index 0
	    var index = 1;
	    if (cursor) {
	      index = this._getIndexForCursor(cursor);
	      if (index === undefined) {
	        console.error('This segment does not have a cursor %s', cursor);
	        return;
	      }
	    }

	    while (this._minIndex !== null && index > this._minIndex) {
	      var data = this._indexToMetadataMap[index - 1];
	      // Skip over elements that have been deleted
	      // so we can add new edges in the front.
	      if (data.deleted) {
	        index--;
	      } else {
	        console.error('Attempted to do an overwrite to GraphQLSegment: ' + 'first index is ' + this._minIndex + ' trying to add edges after ' + index);
	        return;
	      }
	    }

	    // Edges must be added in reverse order since the
	    // segment must be continuous at all times.
	    var startIndex = index - 1;
	    for (var ii = 0; ii < edges.length; ii++) {
	      // Iterates from edges.length - 1 to 0
	      var edge = edges[edges.length - ii - 1];
	      this._addEdgeAtIndex(edge, startIndex - ii);
	    }
	  };

	  /**
	   * This is the total length of the segment including the deleted edges.
	   * Non-zero length guarantees value max and min indices.
	   * DO NOT USE THIS TO DETERMINE THE TOTAL NUMBER OF EDGES; use `getCount`
	   * instead.
	   * @return {number}
	   */

	  GraphQLSegment.prototype.getLength = function getLength() {
	    if (this._minIndex === null && this._maxIndex === null) {
	      return 0;
	    }

	    return this._maxIndex - this._minIndex + 1;
	  };

	  /**
	   * Returns the total number of non-deleted edges in the segment.
	   *
	   * @return {number}
	   */

	  GraphQLSegment.prototype.getCount = function getCount() {
	    return this._count;
	  };

	  /**
	   * In the event of a failed `concatSegment` operation, rollback internal
	   * properties to their former values.
	   *
	   * @param {object} cursorRollbackMap
	   * @param {object} idRollbackMap
	   * @param {object} counters
	   */

	  GraphQLSegment.prototype._rollback = function _rollback(cursorRollbackMap, idRollbackMap, counters) {
	    _Object$assign(this._cursorToIndexMap, cursorRollbackMap);
	    _Object$assign(this._idToIndicesMap, idRollbackMap);

	    // no need to reset _indexToMetadataMap; resetting counters is enough
	    this._count = counters.count;
	    this._maxIndex = counters.maxIndex;
	    this._minIndex = counters.minIndex;
	  };

	  /**
	   * @return {object} Captured counter state.
	   */

	  GraphQLSegment.prototype._getCounterState = function _getCounterState() {
	    return {
	      count: this._count,
	      maxIndex: this._maxIndex,
	      minIndex: this._minIndex
	    };
	  };

	  /**
	   * Copies over content of the input segment and add to the current
	   * segment.
	   * @param {GraphQLSegment} segment - the segment to be copied over
	   * @return {boolean} whether or not we successfully concatenated the segments
	   */

	  GraphQLSegment.prototype.concatSegment = function concatSegment(segment) {
	    if (!segment.getLength()) {
	      return true;
	    }
	    var idRollbackMap = {};
	    var cursorRollbackMap = {};
	    var counterState = this._getCounterState();
	    var newEdges = segment._indexToMetadataMap;
	    for (var ii = segment._minIndex; ii <= segment._maxIndex; ii++) {
	      var index;
	      if (this.getLength()) {
	        index = this._maxIndex + 1;
	      } else {
	        index = 0;
	        this._minIndex = 0;
	      }
	      this._maxIndex = index;

	      var newEdge = newEdges[ii];
	      var idIndex = this._getIndexForID(newEdge.edgeID);
	      if (!idRollbackMap.hasOwnProperty(newEdge.edgeID)) {
	        if (this._idToIndicesMap[newEdge.edgeID]) {
	          idRollbackMap[newEdge.edgeID] = this._idToIndicesMap[newEdge.edgeID].slice();
	        } else {
	          idRollbackMap[newEdge.edgeID] = undefined;
	        }
	      }
	      // Check for id collision. Can't have same id twice
	      if (idIndex !== undefined) {
	        var idEdge = this._indexToMetadataMap[idIndex];
	        if (idEdge.deleted && !newEdge.deleted) {
	          // We want to map to most recent edge. Only write to the front of map
	          // if existing edge with id is deleted or have an older deletion
	          // time.
	          this._idToIndicesMap[newEdge.edgeID].unshift(index);
	        } else if (!newEdge.deleted) {
	          console.error('Attempt to concat an ID already in GraphQLSegment: %s', newEdge.edgeID);
	          this._rollback(cursorRollbackMap, idRollbackMap, counterState);
	          return false;
	        } else {
	          // We want to keep track of past edges as well. Write these indices
	          // to the end of the array.
	          this._idToIndicesMap[newEdge.edgeID] = this._idToIndicesMap[newEdge.edgeID] || [];
	          this._idToIndicesMap[newEdge.edgeID].push(index);
	        }
	      } else {
	        this._idToIndicesMap[newEdge.edgeID] = this._idToIndicesMap[newEdge.edgeID] || [];
	        this._idToIndicesMap[newEdge.edgeID].unshift(index);
	      }
	      var cursorIndex = this._getIndexForCursor(newEdge.cursor);
	      // Check for cursor collision. Can't have same cursor twice
	      if (cursorIndex !== undefined) {
	        var cursorEdge = this._indexToMetadataMap[cursorIndex];
	        if (cursorEdge.deleted && !newEdge.deleted) {
	          // We want to map to most recent edge. Only write in the cursor map if
	          // existing edge with cursor is deleted or have and older deletion
	          // time.
	          cursorRollbackMap[newEdge.cursor] = this._cursorToIndexMap[newEdge.cursor];
	          this._cursorToIndexMap[newEdge.cursor] = index;
	        } else if (!newEdge.deleted) {
	          console.error('Attempt to concat a cursor already in GraphQLSegment: %s', newEdge.cursor);
	          this._rollback(cursorRollbackMap, idRollbackMap, counterState);
	          return false;
	        }
	      } else if (newEdge.cursor) {
	        cursorRollbackMap[newEdge.cursor] = this._cursorToIndexMap[newEdge.cursor];
	        this._cursorToIndexMap[newEdge.cursor] = index;
	      }
	      if (!newEdge.deleted) {
	        this._count++;
	      }
	      this._indexToMetadataMap[index] = _Object$assign({}, newEdge);
	    }

	    return true;
	  };

	  GraphQLSegment.prototype.toJSON = function toJSON() {
	    return [this._indexToMetadataMap, this._idToIndicesMap, this._cursorToIndexMap, this._minIndex, this._maxIndex, this._count];
	  };

	  GraphQLSegment.fromJSON = function fromJSON(descriptor) {
	    var _descriptor = _slicedToArray(descriptor, 6);

	    var indexToMetadataMap = _descriptor[0];
	    var idToIndicesMap = _descriptor[1];
	    var cursorToIndexMap = _descriptor[2];
	    var minIndex = _descriptor[3];
	    var maxIndex = _descriptor[4];
	    var count = _descriptor[5];

	    var segment = new GraphQLSegment();
	    segment._indexToMetadataMap = indexToMetadataMap;
	    segment._idToIndicesMap = idToIndicesMap;
	    segment._cursorToIndexMap = cursorToIndexMap;
	    segment._minIndex = minIndex;
	    segment._maxIndex = maxIndex;
	    segment._count = count;
	    return segment;
	  };

	  GraphQLSegment.prototype.__debug = function __debug() {
	    return {
	      metadata: this._indexToMetadataMap,
	      idToIndices: this._idToIndicesMap,
	      cursorToIndex: this._cursorToIndexMap
	    };
	  };

	  /**
	   * Returns a list of all IDs that were registered for this segment. Including
	   * edges that were deleted.
	   */

	  GraphQLSegment.prototype.getEdgeIDs = function getEdgeIDs() {
	    return _Object$keys(this._idToIndicesMap);
	  };

	  return GraphQLSegment;
	})();

	module.exports = GraphQLSegment;

/***/ },
/* 131 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule GraphQLStoreQueryResolver
	 * @typechecks
	 * 
	 */

	'use strict';

	var _classCallCheck = __webpack_require__(2)['default'];

	var _slicedToArray = __webpack_require__(22)['default'];

	var _Object$keys = __webpack_require__(5)['default'];

	var GraphQLStoreChangeEmitter = __webpack_require__(38);
	var GraphQLStoreRangeUtils = __webpack_require__(39);

	var RelayProfiler = __webpack_require__(4);

	var RelayStoreData = __webpack_require__(12);

	var invariant = __webpack_require__(1);
	var filterExclusiveKeys = __webpack_require__(61);
	var readRelayQueryData = __webpack_require__(63);
	var recycleNodesInto = __webpack_require__(165);

	/**
	 * @internal
	 *
	 * Resolves data from fragment pointers.
	 *
	 * The supplied `callback` will be invoked whenever data returned by the last
	 * invocation to `resolve` has changed.
	 */

	var GraphQLStoreQueryResolver = (function () {
	  function GraphQLStoreQueryResolver(fragmentPointer, callback) {
	    _classCallCheck(this, GraphQLStoreQueryResolver);

	    this.reset();
	    this._fragmentPointer = fragmentPointer;
	    this._callback = callback;
	    this._resolver = null;
	  }

	  /**
	   * Resolves plural fragments.
	   */

	  /**
	   * Resets the resolver's internal state such that future `resolve()` results
	   * will not be `===` to previous results, and unsubscribes any subscriptions.
	   */

	  GraphQLStoreQueryResolver.prototype.reset = function reset() {
	    if (this._resolver) {
	      this._resolver.reset();
	    }
	  };

	  GraphQLStoreQueryResolver.prototype.resolve = function resolve(fragmentPointer) {
	    var resolver = this._resolver;
	    if (!resolver) {
	      resolver = this._fragmentPointer.getFragment().isPlural() ? new GraphQLStorePluralQueryResolver(this._callback) : new GraphQLStoreSingleQueryResolver(this._callback);
	      this._resolver = resolver;
	    }
	    return resolver.resolve(fragmentPointer);
	  };

	  return GraphQLStoreQueryResolver;
	})();

	var GraphQLStorePluralQueryResolver = (function () {
	  function GraphQLStorePluralQueryResolver(callback) {
	    _classCallCheck(this, GraphQLStorePluralQueryResolver);

	    this.reset();
	    this._callback = callback;
	  }

	  /**
	   * Resolves non-plural fragments.
	   */

	  GraphQLStorePluralQueryResolver.prototype.reset = function reset() {
	    if (this._resolvers) {
	      this._resolvers.forEach(function (resolver) {
	        return resolver.reset();
	      });
	    }
	    this._resolvers = [];
	    this._results = [];
	  };

	  /**
	   * Resolves a plural fragment pointer into an array of records.
	   *
	   * If the data, order, and number of resolved records has not changed since
	   * the last call to `resolve`, the same array will be returned. Otherwise, a
	   * new array will be returned.
	   */

	  GraphQLStorePluralQueryResolver.prototype.resolve = function resolve(fragmentPointer) {
	    var prevResults = this._results;
	    var nextResults;

	    var nextIDs = fragmentPointer.getDataIDs();
	    var prevLength = prevResults.length;
	    var nextLength = nextIDs.length;
	    var resolvers = this._resolvers;

	    // Ensure that we have exactly `nextLength` resolvers.
	    while (resolvers.length < nextLength) {
	      resolvers.push(new GraphQLStoreSingleQueryResolver(this._callback));
	    }
	    while (resolvers.length > nextLength) {
	      resolvers.pop().reset();
	    }

	    // Allocate `nextResults` if and only if results have changed.
	    if (prevLength !== nextLength) {
	      nextResults = [];
	    }
	    for (var ii = 0; ii < nextLength; ii++) {
	      var nextResult = resolvers[ii].resolve(fragmentPointer, nextIDs[ii]);
	      if (nextResults || ii >= prevLength || nextResult !== prevResults[ii]) {
	        nextResults = nextResults || prevResults.slice(0, ii);
	        nextResults.push(nextResult);
	      }
	    }

	    if (nextResults) {
	      this._results = nextResults;
	    }
	    return this._results;
	  };

	  return GraphQLStorePluralQueryResolver;
	})();

	var GraphQLStoreSingleQueryResolver = (function () {
	  function GraphQLStoreSingleQueryResolver(callback) {
	    _classCallCheck(this, GraphQLStoreSingleQueryResolver);

	    this.reset();
	    this._callback = callback;
	    this._garbageCollector = RelayStoreData.getDefaultInstance().getGarbageCollector();
	    this._subscribedIDs = {};
	  }

	  GraphQLStoreSingleQueryResolver.prototype.reset = function reset() {
	    if (this._subscription) {
	      this._subscription.remove();
	    }
	    this._hasDataChanged = false;
	    this._fragment = null;
	    this._result = null;
	    this._resultID = null;
	    this._subscription = null;
	    this._updateGarbageCollectorSubscriptionCount({});
	    this._subscribedIDs = {};
	  };

	  /**
	   * Resolves data for a single fragment pointer.
	   *
	   * NOTE: `nextPluralID` should only be passed by the plural query resolver.
	   */

	  GraphQLStoreSingleQueryResolver.prototype.resolve = function resolve(fragmentPointer, nextPluralID) {
	    var nextFragment = fragmentPointer.getFragment();
	    var prevFragment = this._fragment;

	    var nextID = nextPluralID || fragmentPointer.getDataID();
	    var prevID = this._resultID;
	    var nextResult;
	    var prevResult = this._result;
	    var subscribedIDs;

	    if (prevFragment != null && prevID != null && getCanonicalID(prevID) === getCanonicalID(nextID)) {
	      if (this._hasDataChanged || !nextFragment.isEquivalent(prevFragment)) {
	        var _resolveFragment = resolveFragment(nextFragment, nextID);

	        // same ID but the data, route and/or variables have changed

	        var _resolveFragment2 = _slicedToArray(_resolveFragment, 2);

	        nextResult = _resolveFragment2[0];
	        subscribedIDs = _resolveFragment2[1];

	        nextResult = recycleNodesInto(prevResult, nextResult);
	      } else {
	        // same id, route, variables, and data
	        nextResult = prevResult;
	      }
	    } else {
	      var _resolveFragment3 = resolveFragment(nextFragment, nextID);

	      // Pointer has a different ID or is/was fake data.

	      var _resolveFragment32 = _slicedToArray(_resolveFragment3, 2);

	      nextResult = _resolveFragment32[0];
	      subscribedIDs = _resolveFragment32[1];
	    }

	    // update subscriptions whenever results change
	    if (prevResult !== nextResult) {
	      if (this._subscription) {
	        this._subscription.remove();
	        this._subscription = null;
	      }
	      if (subscribedIDs) {
	        this._subscription = GraphQLStoreChangeEmitter.addListenerForIDs(_Object$keys(subscribedIDs), this._handleChange.bind(this));
	        this._updateGarbageCollectorSubscriptionCount(subscribedIDs);
	        this._subscribedIDs = subscribedIDs;
	      }
	      this._resultID = nextID;
	      this._result = nextResult;
	    }

	    this._hasDataChanged = false;
	    this._fragment = nextFragment;

	    return this._result;
	  };

	  GraphQLStoreSingleQueryResolver.prototype._handleChange = function _handleChange() {
	    if (!this._hasDataChanged) {
	      this._hasDataChanged = true;
	      this._callback();
	    }
	  };

	  /**
	   * Updates bookkeeping about the number of subscribers on each record.
	   */

	  GraphQLStoreSingleQueryResolver.prototype._updateGarbageCollectorSubscriptionCount = function _updateGarbageCollectorSubscriptionCount(nextDataIDs) {
	    if (this._garbageCollector) {
	      var garbageCollector = this._garbageCollector;

	      var prevDataIDs = this._subscribedIDs;

	      var _filterExclusiveKeys = filterExclusiveKeys(prevDataIDs, nextDataIDs);

	      var _filterExclusiveKeys2 = _slicedToArray(_filterExclusiveKeys, 2);

	      var removed = _filterExclusiveKeys2[0];
	      var added = _filterExclusiveKeys2[1];

	      added.forEach(function (id) {
	        return garbageCollector.increaseSubscriptionsFor(id);
	      });
	      removed.forEach(function (id) {
	        return garbageCollector.decreaseSubscriptionsFor(id);
	      });
	    }
	  };

	  return GraphQLStoreSingleQueryResolver;
	})();

	function resolveFragment(fragment, dataID) {
	  var store = RelayStoreData.getDefaultInstance().getQueuedStore();

	  var _readRelayQueryData = readRelayQueryData(store, fragment, dataID);

	  var data = _readRelayQueryData.data;
	  var dataIDs = _readRelayQueryData.dataIDs;

	  return [data, dataIDs];
	}

	/**
	 * Ranges publish events for the entire range, not the specific view of that
	 * range. For example, if "client:1" is a range, the event is on "client:1",
	 * not "client:1_first(5)".
	 */
	function getCanonicalID(id) {
	  return GraphQLStoreRangeUtils.getCanonicalClientID(id);
	}

	RelayProfiler.instrumentMethods(GraphQLStoreQueryResolver.prototype, {
	  resolve: 'GraphQLStoreQueryResolver.resolve'
	});

	module.exports = GraphQLStoreQueryResolver;

/***/ },
/* 132 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule RelayBufferedNeglectionStateMap
	 * 
	 * @typechecks
	 */

	'use strict';

	var _classCallCheck = __webpack_require__(2)['default'];

	var invariant = __webpack_require__(1);

	/**
	 * @internal
	 *
	 * A class that implements the `SortedMap` interface for a mapping from
	 * DataID to NeglectionState.
	 */

	var RelayBufferedNeglectionStateMap = (function () {
	  function RelayBufferedNeglectionStateMap(neglectionStateMap) {
	    _classCallCheck(this, RelayBufferedNeglectionStateMap);

	    this._bufferedChanges = [];
	    this._neglectionStateMap = neglectionStateMap;
	  }

	  /**
	   * Creates a buffered change that, once the buffer is flushed, decreases the
	   * subscriptions-count for the given data ID.
	   */

	  RelayBufferedNeglectionStateMap.prototype.decreaseSubscriptionsFor = function decreaseSubscriptionsFor(dataID) {
	    this._bufferedChanges.push({
	      type: 'decrease',
	      dataID: dataID
	    });
	  };

	  /**
	   * Creates a buffered change that, once the buffer is flushed, increases the
	   * subscriptions-count for the given data ID.
	   */

	  RelayBufferedNeglectionStateMap.prototype.increaseSubscriptionsFor = function increaseSubscriptionsFor(dataID) {
	    this._bufferedChanges.push({
	      type: 'increase',
	      dataID: dataID
	    });
	  };

	  /**
	   * Creates a buffered change that, once the buffer is flushed, creates an
	   * entry for the data ID in the underlying `RelayNeglectionStateMap`.
	   */

	  RelayBufferedNeglectionStateMap.prototype.register = function register(dataID) {
	    this._bufferedChanges.push({
	      type: 'register',
	      dataID: dataID
	    });
	  };

	  /**
	   * Creates a buffered change that, once the buffer is flushed, removes the
	   * data ID from the underlying `RelayNeglectionStateMap`.
	   */

	  RelayBufferedNeglectionStateMap.prototype.remove = function remove(dataID) {
	    this._bufferedChanges.push({
	      type: 'remove',
	      dataID: dataID
	    });
	  };

	  /**
	   * Returns the number of registered data IDs in the underlying
	   * `RelayStoreNeglectionStates`.
	   */

	  RelayBufferedNeglectionStateMap.prototype.size = function size() {
	    return this._neglectionStateMap.size();
	  };

	  /**
	   * Returns the iterator returned by `values` on the underlying
	   * `RelayNeglectionStateMap`.
	   */

	  RelayBufferedNeglectionStateMap.prototype.values = function values() {
	    return this._neglectionStateMap.values();
	  };

	  RelayBufferedNeglectionStateMap.prototype.flushBuffer = function flushBuffer() {
	    var _this = this;

	    this._bufferedChanges.forEach(function (action) {
	      var type = action.type;
	      var dataID = action.dataID;

	      switch (type) {
	        case 'decrease':
	          _this._neglectionStateMap.decreaseSubscriptionsFor(dataID);
	          break;
	        case 'increase':
	          _this._neglectionStateMap.increaseSubscriptionsFor(dataID);
	          break;
	        case 'register':
	          _this._neglectionStateMap.register(dataID);
	          break;
	        case 'remove':
	          _this._neglectionStateMap.remove(dataID);
	          break;
	        default:
	           true ?  true ? invariant(false, 'RelayBufferedNeglectionStateMap._flushBufferedChanges: ' + 'Invalid type %s for buffered chaged', type) : invariant(false) : undefined;
	      }
	    });
	    this._bufferedChanges = [];
	  };

	  return RelayBufferedNeglectionStateMap;
	})();

	module.exports = RelayBufferedNeglectionStateMap;

/***/ },
/* 133 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule RelayChangeTracker
	 * 
	 * @typechecks
	 */

	'use strict';

	var _classCallCheck = __webpack_require__(2)['default'];

	var _Object$freeze = __webpack_require__(64)['default'];

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	/**
	 * @internal
	 *
	 * Keeps track of records that have been created or updated; used primarily to
	 * record changes during the course of a `write` operation.
	 */

	var RelayChangeTracker = (function () {
	  function RelayChangeTracker() {
	    _classCallCheck(this, RelayChangeTracker);

	    this._created = {};
	    this._updated = {};
	  }

	  /**
	   * Record the creation of a record.
	   */

	  RelayChangeTracker.prototype.createID = function createID(recordID) {
	    this._created[recordID] = true;
	  };

	  /**
	   * Record an update to a record.
	   */

	  RelayChangeTracker.prototype.updateID = function updateID(recordID) {
	    if (!this._created.hasOwnProperty(recordID)) {
	      this._updated[recordID] = true;
	    }
	  };

	  /**
	   * Determine if the record has any changes (was created or updated).
	   */

	  RelayChangeTracker.prototype.hasChange = function hasChange(recordID) {
	    return !!(this._updated[recordID] || this._created[recordID]);
	  };

	  /**
	   * Determine if the record was created.
	   */

	  RelayChangeTracker.prototype.isNewRecord = function isNewRecord(recordID) {
	    return !!this._created[recordID];
	  };

	  /**
	   * Get the ids of records that were created/updated.
	   */

	  RelayChangeTracker.prototype.getChangeSet = function getChangeSet() {
	    if (true) {
	      return {
	        created: _Object$freeze(this._created),
	        updated: _Object$freeze(this._updated)
	      };
	    }
	    return {
	      created: this._created,
	      updated: this._updated
	    };
	  };

	  return RelayChangeTracker;
	})();

	module.exports = RelayChangeTracker;

/***/ },
/* 134 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule RelayContainer
	 * @typechecks
	 * 
	 */

	'use strict';

	var _inherits = __webpack_require__(6)['default'];

	var _classCallCheck = __webpack_require__(2)['default'];

	var _extends = __webpack_require__(11)['default'];

	var _Object$keys = __webpack_require__(5)['default'];

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	var ErrorUtils = __webpack_require__(49);

	var GraphQLDeferredQueryTracker = __webpack_require__(77);
	var GraphQLFragmentPointer = __webpack_require__(37);
	var GraphQLStoreChangeEmitter = __webpack_require__(38);
	var GraphQLStoreDataHandler = __webpack_require__(8);
	var GraphQLStoreQueryResolver = __webpack_require__(131);
	var React = __webpack_require__(53);
	var RelayContainerComparators = __webpack_require__(135);
	var RelayContainerProxy = __webpack_require__(136);
	var RelayDeprecated = __webpack_require__(40);
	var RelayFragmentReference = __webpack_require__(41);

	var RelayMetaRoute = __webpack_require__(26);
	var RelayMutationTransaction = __webpack_require__(78);
	var RelayPendingQueryTracker = __webpack_require__(80);
	var RelayPropTypes = __webpack_require__(55);
	var RelayProfiler = __webpack_require__(4);
	var RelayQuery = __webpack_require__(3);

	var RelayStore = __webpack_require__(43);
	var RelayStoreData = __webpack_require__(12);

	var buildRQL = __webpack_require__(59);

	var forEachObject = __webpack_require__(7);
	var invariant = __webpack_require__(1);
	var nullthrows = __webpack_require__(70);
	var prepareRelayContainerProps = __webpack_require__(164);
	var shallowEqual = __webpack_require__(71);
	var warning = __webpack_require__(10);

	GraphQLStoreChangeEmitter.injectBatchingStrategy(React /* #7887700 */.unstable_batchedUpdates);

	var containerContextTypes = {
	  route: RelayPropTypes.QueryConfig.isRequired
	};
	var nextContainerID = 0;

	var storeData = RelayStoreData.getDefaultInstance();

	/**
	 * @public
	 *
	 * RelayContainer is a higher order component that provides the ability to:
	 *
	 *  - Encode data dependencies using query fragments that are parameterized by
	 *    routes and variables.
	 *  - Manipulate variables via methods on `this.props.relay`.
	 *  - Automatically subscribe to data changes.
	 *  - Avoid unnecessary updates if data is unchanged.
	 *  - Propagate the `route` via context (available on `this.props.relay`).
	 *
	 */
	function createContainerComponent(Component, spec, containerID) {
	  var componentName = Component.displayName || Component.name;
	  var containerName = 'Relay(' + componentName + ')';

	  var fragments = spec.fragments;
	  var fragmentNames = _Object$keys(fragments);
	  var initialVariables = spec.initialVariables || {};
	  var prepareVariables = spec.prepareVariables;

	  var RelayContainer = (function (_React$Component) {
	    _inherits(RelayContainer, _React$Component);

	    function RelayContainer(props, context) {
	      _classCallCheck(this, RelayContainer);

	      _React$Component.call(this, props, context);

	      var route = context.route;

	      !(route && typeof route.name === 'string') ?  true ? invariant(false, 'RelayContainer: `%s` was rendered without a valid route. Make sure ' + 'the route is valid, and make sure that it is correctly set on the ' + 'parent component\'s context (e.g. using <RelayRootContainer>).', containerName) : invariant(false) : undefined;

	      var self = this;
	      self.forceFetch = this.forceFetch.bind(this);
	      self.getFragmentError = this.getFragmentError.bind(this);
	      self.getPendingTransactions = this.getPendingTransactions.bind(this);
	      self.hasFragmentData = this.hasFragmentData.bind(this);
	      self.hasOptimisticUpdate = this.hasOptimisticUpdate.bind(this);
	      self.setVariables = this.setVariables.bind(this);

	      this._deferredErrors = null;
	      this._deferredSubscriptions = null;
	      this._didShowFakeDataWarning = false;
	      this._fragmentPointers = {};
	      this._hasNewDeferredData = false;
	      this._hasStaleQueryData = false;
	      this._queryResolvers = {};

	      this.mounted = true;
	      this.pending = null;
	      this.state = {
	        variables: {},
	        queryData: {}
	      };
	    }

	    /**
	     * Requests an update to variables. This primes the cache for the new
	     * variables and notifies the caller of changes via the callback. As data
	     * becomes ready, the component will be updated.
	     */

	    RelayContainer.prototype.setVariables = function setVariables(partialVariables, callback) {
	      this._runVariables(partialVariables, callback, false);
	    };

	    /**
	     * Requests an update to variables. Unlike `setVariables`, this forces data
	     * to be fetched and written for the supplied variables. Any data that
	     * previously satisfied the queries will be overwritten.
	     */

	    RelayContainer.prototype.forceFetch = function forceFetch(partialVariables, callback) {
	      this._runVariables(partialVariables, callback, true);
	    };

	    /**
	     * Creates a query for each of the component's fragments using the given
	     * variables, and fragment pointers that can be used to resolve the results
	     * of those queries. The fragment pointers are of the same shape as the
	     * `_fragmentPointers` property.
	     */

	    RelayContainer.prototype._createQuerySetAndFragmentPointers = function _createQuerySetAndFragmentPointers(variables) {
	      var _this = this;

	      var fragmentPointers = {};
	      var querySet = {};
	      fragmentNames.forEach(function (fragmentName) {
	        var fragment = getFragment(fragmentName, _this.context.route, variables);
	        var queryData = _this.state.queryData[fragmentName];
	        if (!fragment || queryData == null) {
	          return;
	        }

	        var fragmentPointer;
	        if (fragment.isPlural()) {
	          !Array.isArray(queryData) ?  true ? invariant(false, 'RelayContainer: Invalid queryData for `%s`, expected an array ' + 'of records because the corresponding fragment is plural.', fragmentName) : invariant(false) : undefined;
	          var dataIDs = [];
	          queryData.forEach(function (data, ii) {
	            var dataID = GraphQLStoreDataHandler.getID(data);
	            if (dataID) {
	              querySet[fragmentName + ii] = storeData.buildFragmentQueryForDataID(fragment, dataID);
	              dataIDs.push(dataID);
	            }
	          });
	          if (dataIDs.length) {
	            fragmentPointer = new GraphQLFragmentPointer(dataIDs, fragment);
	          }
	        } else {
	          var dataID = GraphQLStoreDataHandler.getID(queryData);
	          if (dataID) {
	            fragmentPointer = new GraphQLFragmentPointer(dataID, fragment);
	            querySet[fragmentName] = storeData.buildFragmentQueryForDataID(fragment, dataID);
	          }
	        }

	        fragmentPointers[fragmentName] = fragmentPointer;
	      });
	      return { fragmentPointers: fragmentPointers, querySet: querySet };
	    };

	    RelayContainer.prototype._runVariables = function _runVariables(partialVariables, callback, forceFetch) {
	      var _this2 = this;

	      var lastVariables = this.state.variables;
	      var prevVariables = this.pending ? this.pending.variables : lastVariables;
	      var nextVariables = mergeVariables(prevVariables, partialVariables);

	      this.pending && this.pending.request.abort();

	      var completeProfiler = RelayProfiler.profile('RelayContainer.setVariables', {
	        containerName: containerName,
	        nextVariables: nextVariables
	      });

	      // If variables changed or we are force-fetching, we need to build a new
	      // set of queries that includes the updated variables. Because the pending
	      // fetch is always canceled, always initiate a new fetch.
	      var querySet = {};
	      var fragmentPointers = null;
	      if (forceFetch || !shallowEqual(nextVariables, lastVariables)) {
	        var _createQuerySetAndFragmentPointers2 = this._createQuerySetAndFragmentPointers(nextVariables);

	        querySet = _createQuerySetAndFragmentPointers2.querySet;
	        fragmentPointers = _createQuerySetAndFragmentPointers2.fragmentPointers;
	      }

	      var onReadyStateChange = ErrorUtils.guard(function (readyState) {
	        var aborted = readyState.aborted;
	        var done = readyState.done;
	        var error = readyState.error;
	        var ready = readyState.ready;

	        var isComplete = aborted || done || error;
	        if (isComplete && _this2.pending === current) {
	          _this2.pending = null;
	        }
	        var partialState;
	        if (ready && fragmentPointers) {
	          // Only update query data if variables changed. Otherwise, `querySet`
	          // and `fragmentPointers` will be empty, and `nextVariables` will be
	          // equal to `lastVariables`.
	          _this2._fragmentPointers = fragmentPointers;
	          _this2._updateQueryResolvers();
	          var queryData = _this2._getQueryData(_this2.props);
	          partialState = { variables: nextVariables, queryData: queryData };
	        } else {
	          partialState = {};
	        }
	        var mounted = _this2.mounted;
	        if (mounted) {
	          var updateProfiler = RelayProfiler.profile('RelayContainer.update');
	          React /* #7887700 */.unstable_batchedUpdates(function () {
	            _this2.setState(partialState, function () {
	              updateProfiler.stop();
	              if (isComplete) {
	                completeProfiler.stop();
	              }
	            });
	            if (callback) {
	              callback.call(_this2.refs.component, _extends({}, readyState, { mounted: mounted }));
	            }
	          });
	        } else {
	          if (callback) {
	            callback(_extends({}, readyState, { mounted: mounted }));
	          }
	          if (isComplete) {
	            completeProfiler.stop();
	          }
	        }
	      }, 'RelayContainer.onReadyStateChange');

	      var current = {
	        variables: nextVariables,
	        request: forceFetch ? RelayStore.forceFetch(querySet, onReadyStateChange) : RelayStore.primeCache(querySet, onReadyStateChange)
	      };
	      this.pending = current;
	    };

	    /**
	     * Determine if the supplied record reflects an optimistic update.
	     */

	    RelayContainer.prototype.hasOptimisticUpdate = function hasOptimisticUpdate(record) {
	      var dataID = GraphQLStoreDataHandler.getID(record);
	      !(dataID != null) ?  true ? invariant(false, 'RelayContainer.hasOptimisticUpdate(): Expected a record in `%s`.', componentName) : invariant(false) : undefined;
	      return storeData.getQueuedStore().hasOptimisticUpdate(dataID);
	    };

	    /**
	     * Returns the pending mutation transactions affecting the given record.
	     */

	    RelayContainer.prototype.getPendingTransactions = function getPendingTransactions(record) {
	      var dataID = GraphQLStoreDataHandler.getID(record);
	      !(dataID != null) ?  true ? invariant(false, 'RelayContainer.getPendingTransactions(): Expected a record in `%s`.', componentName) : invariant(false) : undefined;
	      var mutationIDs = storeData.getQueuedStore().getClientMutationIDs(dataID);
	      if (!mutationIDs) {
	        return null;
	      }
	      return mutationIDs.map(RelayMutationTransaction.get);
	    };

	    /**
	     * Returns any error related to fetching data for a deferred fragment.
	     */

	    RelayContainer.prototype.getFragmentError = function getFragmentError(fragmentReference, record) {
	      var deferredErrors = this._deferredErrors;
	      if (!deferredErrors) {
	        return null;
	      }
	      var dataID = GraphQLStoreDataHandler.getID(record);
	      if (dataID == null) {
	        // TODO: Throw instead, like we do in `hasFragmentData`, #7857010.
	         true ? warning(false, 'RelayContainer.getFragmentError(): Invalid call from `%s`. Second ' + 'argument is not a valid record.', componentName) : undefined;
	        return null;
	      }
	      var fragment = RelayQuery.Node.create(fragmentReference.defer(), RelayMetaRoute.get(this.context.route.name), this.state.variables);
	      !(fragment instanceof RelayQuery.Fragment) ?  true ? invariant(false, 'RelayContainer.getFragmentError(): First argument is not a valid ' + 'fragment. Ensure that there are no failing `if` or `unless` ' + 'conditions.') : invariant(false) : undefined;
	      var fragmentID = fragment.getFragmentID();
	      var subscriptionKey = getSubscriptionKey(dataID, fragmentID);
	      return deferredErrors[subscriptionKey];
	    };

	    /**
	     * Checks if data for a deferred fragment is ready. This method should
	     * *always* be called before rendering a child component whose fragment was
	     * deferred (unless that child can handle null or missing data).
	     */

	    RelayContainer.prototype.hasFragmentData = function hasFragmentData(fragmentReference, record) {
	      if (!RelayPendingQueryTracker.hasPendingQueries() && !this._deferredErrors) {
	        // nothing can be missing => must have data
	        return true;
	      }
	      // convert builder -> fragment in order to get the fragment's name
	      var dataID = GraphQLStoreDataHandler.getID(record);
	      !(dataID != null) ?  true ? invariant(false, 'RelayContainer.hasFragmentData(): Second argument is not a valid ' + 'record. For `<%s X={this.props.X} />`, use ' + '`this.props.hasFragmentData(%s.getQuery(\'X\'), this.props.X)`.', componentName, componentName) : invariant(false) : undefined;
	      var fragment = RelayQuery.Node.create(fragmentReference.defer(), RelayMetaRoute.get(this.context.route.name), this.state.variables);
	      !(fragment instanceof RelayQuery.Fragment) ?  true ? invariant(false, 'RelayContainer.hasFragmentData(): First argument is not a valid ' + 'fragment. Ensure that there are no failing `if` or `unless` ' + 'conditions.') : invariant(false) : undefined;
	      var fragmentID = fragment.getFragmentID();
	      var hasData = !GraphQLDeferredQueryTracker.isQueryPending(dataID, fragmentID);

	      var subscriptionKey = getSubscriptionKey(dataID, fragmentID);
	      if (!hasData) {
	        // Query is pending: subscribe for updates to any missing deferred data.
	        var deferredSubscriptions = this._deferredSubscriptions || {};
	        if (!this._deferredSubscriptions) {
	          this._deferredSubscriptions = deferredSubscriptions;
	        }
	        if (!deferredSubscriptions.hasOwnProperty(subscriptionKey)) {
	          deferredSubscriptions[subscriptionKey] = GraphQLDeferredQueryTracker.addListenerForFragment(dataID, fragmentID, {
	            onSuccess: this._handleDeferredSuccess.bind(this),
	            onFailure: this._handleDeferredFailure.bind(this)
	          });
	        }
	      } else {
	        // query completed: check for errors
	        if (this._deferredErrors && this._deferredErrors.hasOwnProperty(subscriptionKey)) {
	          hasData = false;
	        }
	      }

	      return hasData;
	    };

	    RelayContainer.prototype.componentWillMount = function componentWillMount() {
	      var variables = getVariablesWithPropOverrides(spec, this.props, initialVariables);
	      this._updateFragmentPointers(this.props, this.context.route, variables);
	      this._updateQueryResolvers();
	      var queryData = this._getQueryData(this.props);

	      this.setState({
	        queryData: queryData,
	        variables: variables
	      });
	    };

	    RelayContainer.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps, nextContext) {
	      var _this3 = this;

	      var _nullthrows = nullthrows(nextContext);

	      var route = _nullthrows.route;

	      this.setState(function (state) {
	        var variables = getVariablesWithPropOverrides(spec, nextProps, resetPropOverridesForVariables(spec, nextProps, state.variables));
	        _this3._updateFragmentPointers(nextProps, route, variables);
	        _this3._updateQueryResolvers();
	        return {
	          variables: variables,
	          queryData: _this3._getQueryData(nextProps)
	        };
	      });
	    };

	    RelayContainer.prototype.componentWillUnmount = function componentWillUnmount() {
	      // A guarded error in mounting might prevent initialization of resolvers.
	      if (this._queryResolvers) {
	        forEachObject(this._queryResolvers, function (queryResolver) {
	          return queryResolver && queryResolver.reset();
	        });
	      }

	      // Remove any subscriptions for pending deferred queries.
	      var deferredSubscriptions = this._deferredSubscriptions;
	      if (deferredSubscriptions) {
	        forEachObject(deferredSubscriptions, function (subscription) {
	          subscription && subscription.remove();
	        });
	      }

	      this._deferredErrors = null;
	      this._deferredSubscriptions = null;
	      this._fragmentPointers = {};
	      this._queryResolvers = {};

	      var pending = this.pending;
	      if (pending) {
	        pending.request.abort();
	        this.pending = null;
	      }
	      this.mounted = false;
	    };

	    RelayContainer.prototype._updateQueryResolvers = function _updateQueryResolvers() {
	      var _this4 = this;

	      var fragmentPointers = this._fragmentPointers;
	      var queryResolvers = this._queryResolvers;
	      fragmentNames.forEach(function (fragmentName) {
	        var fragmentPointer = fragmentPointers[fragmentName];
	        var queryResolver = queryResolvers[fragmentName];
	        if (!fragmentPointer) {
	          if (queryResolver) {
	            queryResolver.reset();
	            queryResolvers[fragmentName] = null;
	          }
	        } else if (!queryResolver) {
	          queryResolver = new GraphQLStoreQueryResolver(fragmentPointer, _this4._handleFragmentDataUpdate.bind(_this4));
	          queryResolvers[fragmentName] = queryResolver;
	        }
	      });
	    };

	    RelayContainer.prototype._handleFragmentDataUpdate = function _handleFragmentDataUpdate() {
	      var queryData = this._getQueryData(this.props);
	      var updateProfiler = RelayProfiler.profile('RelayContainer.handleFragmentDataUpdate');
	      this.setState({ queryData: queryData }, updateProfiler.stop);
	    };

	    RelayContainer.prototype._updateFragmentPointers = function _updateFragmentPointers(props, route, variables) {
	      var _this5 = this;

	      var fragmentPointers = this._fragmentPointers;
	      fragmentNames.forEach(function (fragmentName) {
	        var propValue = props[fragmentName];
	         true ? warning(propValue !== undefined, 'RelayContainer: Expected query `%s` to be supplied to `%s` as ' + 'a prop from the parent. Pass an explicit `null` if this is ' + 'intentional.', fragmentName, componentName) : undefined;
	        if (!propValue) {
	          fragmentPointers[fragmentName] = null;
	          return;
	        }
	        var fragment = getFragment(fragmentName, route, variables);
	        var concreteFragmentID = fragment.getConcreteFragmentID();
	        var dataIDOrIDs;

	        if (fragment.isPlural()) {
	          // Plural fragments require the prop value to be an array of fragment
	          // pointers, which are merged into a single fragment pointer to pass
	          // to the query resolver `resolve`.
	          !Array.isArray(propValue) ?  true ? invariant(false, 'RelayContainer: Invalid prop `%s` supplied to `%s`, expected an ' + 'array of records because the corresponding fragment is plural.', fragmentName, componentName) : invariant(false) : undefined;
	          if (propValue.length) {
	            dataIDOrIDs = propValue.reduce(function (acc, item, ii) {
	              var eachFragmentPointer = item[concreteFragmentID];
	              !eachFragmentPointer ?  true ? invariant(false, 'RelayContainer: Invalid prop `%s` supplied to `%s`, ' + 'expected element at index %s to have query data.', fragmentName, componentName, ii) : invariant(false) : undefined;
	              return acc.concat(eachFragmentPointer.getDataIDs());
	            }, []);
	          } else {
	            // An empty plural fragment cannot be observed; the empty array prop
	            // can be passed as-is to the component.
	            dataIDOrIDs = null;
	          }
	        } else {
	          !!Array.isArray(propValue) ?  true ? invariant(false, 'RelayContainer: Invalid prop `%s` supplied to `%s`, expected a ' + 'single record because the corresponding fragment is not plural.', fragmentName, componentName) : invariant(false) : undefined;
	          var fragmentPointer = propValue[concreteFragmentID];
	          if (fragmentPointer) {
	            dataIDOrIDs = fragmentPointer.getDataID();
	          } else {
	            // TODO: Throw when we have mock data validation, #6332949.
	            dataIDOrIDs = null;
	            if (true) {
	              if (!_this5._didShowFakeDataWarning) {
	                _this5._didShowFakeDataWarning = true;
	                 true ? warning(false, 'RelayContainer: Expected prop `%s` supplied to `%s` to ' + 'be data fetched by Relay. This is likely an error unless ' + 'you are purposely passing in mock data that conforms to ' + 'the shape of this component\'s fragment.', fragmentName, componentName) : undefined;
	              }
	            }
	          }
	        }
	        fragmentPointers[fragmentName] = dataIDOrIDs ? new GraphQLFragmentPointer(dataIDOrIDs, fragment) : null;
	      });
	    };

	    RelayContainer.prototype._getQueryData = function _getQueryData(props) {
	      var _this6 = this;

	      var queryData = {};
	      var fragmentPointers = this._fragmentPointers;
	      forEachObject(this._queryResolvers, function (queryResolver, propName) {
	        var propValue = props[propName];
	        var fragmentPointer = fragmentPointers[propName];

	        if (!propValue || !fragmentPointer) {
	          // Clear any subscriptions since there is no data.
	          queryResolver && queryResolver.reset();
	          // Allow mock data to pass through without modification.
	          queryData[propName] = propValue;
	        } else {
	          queryData[propName] = queryResolver.resolve(fragmentPointer);
	        }
	        if (_this6.state.queryData.hasOwnProperty(propName) && queryData[propName] !== _this6.state.queryData[propName]) {
	          _this6._hasStaleQueryData = true;
	        }
	      });
	      return queryData;
	    };

	    /**
	     * Update query props when deferred data becomes available.
	     */

	    RelayContainer.prototype._handleDeferredSuccess = function _handleDeferredSuccess(dataID, fragmentID) {
	      var subscriptionKey = getSubscriptionKey(dataID, fragmentID);
	      var deferredSubscriptions = this._deferredSubscriptions;
	      if (deferredSubscriptions && deferredSubscriptions.hasOwnProperty(subscriptionKey)) {
	        // Flag to force `shouldComponentUpdate` to return true.
	        this._hasNewDeferredData = true;
	        deferredSubscriptions[subscriptionKey].remove();
	        delete deferredSubscriptions[subscriptionKey];

	        var deferredSuccessProfiler = RelayProfiler.profile('RelayContainer.handleDeferredSuccess');
	        var queryData = this._getQueryData(this.props);
	        this.setState({ queryData: queryData }, deferredSuccessProfiler.stop);
	      }
	    };

	    /**
	     * Update query props when deferred queries fail.
	     */

	    RelayContainer.prototype._handleDeferredFailure = function _handleDeferredFailure(dataID, fragmentID, error) {
	      var subscriptionKey = getSubscriptionKey(dataID, fragmentID);
	      var deferredErrors = this._deferredErrors;
	      if (!deferredErrors) {
	        this._deferredErrors = deferredErrors = {};
	      }
	      // Flag to force `shouldComponentUpdate` to return true.
	      this._hasNewDeferredData = true;
	      deferredErrors[subscriptionKey] = error;

	      var deferredFailureProfiler = RelayProfiler.profile('RelayContainer.handleDeferredFailure');
	      // Dummy `setState` to trigger re-render.
	      this.setState(this.state, deferredFailureProfiler.stop);
	    };

	    RelayContainer.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps, nextState, nextContext) {
	      // TODO: Fix bug with `_hasStaleQueryData` and `_hasNewDeferredData` both
	      // being true. (This will return true two times in a row.)

	      // Flag indicating that query data changed since previous render.
	      if (this._hasStaleQueryData) {
	        this._hasStaleQueryData = false;
	        return true;
	      }
	      // Flag indicating that deferred data has resolved - this component's data
	      // will not change since the data is for a child component, therefore
	      // we force update here.
	      if (this._hasNewDeferredData) {
	        this._hasNewDeferredData = false;
	        return true;
	      }

	      if (this.context.route !== nextContext.route) {
	        return true;
	      }

	      var fragmentPointers = this._fragmentPointers;
	      return !RelayContainerComparators.areNonQueryPropsEqual(fragments, this.props, nextProps) || fragmentPointers && !RelayContainerComparators.areQueryResultsEqual(fragmentPointers, this.state.queryData, nextState.queryData) || !RelayContainerComparators.areQueryVariablesEqual(this.state.variables, nextState.variables);
	    };

	    RelayContainer.prototype.render = function render() {
	      var relayProps = {
	        forceFetch: this.forceFetch,
	        getFragmentError: this.getFragmentError,
	        getPendingTransactions: this.getPendingTransactions,
	        hasFragmentData: this.hasFragmentData,
	        hasOptimisticUpdate: this.hasOptimisticUpdate,
	        route: this.context.route,
	        setVariables: this.setVariables,
	        variables: this.state.variables
	      };
	      return React.createElement(Component, _extends({}, this.props, this.state.queryData, prepareRelayContainerProps(relayProps), {
	        ref: 'component'
	      }));
	    };

	    return RelayContainer;
	  })(React.Component);

	  function getFragment(fragmentName, route, variables) {
	    var fragmentBuilder = fragments[fragmentName];
	    !fragmentBuilder ?  true ? invariant(false, 'RelayContainer: Expected `%s` to have a query fragment named `%s`.', containerName, fragmentName) : invariant(false) : undefined;
	    var fragment = buildContainerFragment(containerName, fragmentName, fragmentBuilder, initialVariables);
	    // TODO: Allow routes without names, #7856965.
	    var metaRoute = RelayMetaRoute.get(route.name);
	    if (prepareVariables) {
	      variables = prepareVariables(variables, metaRoute);
	    }
	    return RelayQuery.Node.createFragment(fragment, metaRoute, variables);
	  }

	  initializeProfiler(RelayContainer);
	  RelayContainer.contextTypes = containerContextTypes;
	  RelayContainer.displayName = containerName;
	  RelayContainerProxy.proxyMethods(RelayContainer, Component);

	  return RelayContainer;
	}

	/**
	 * TODO: Stop allowing props to override variables, #7856288.
	 */
	function getVariablesWithPropOverrides(spec, props, variables) {
	  var initialVariables = spec.initialVariables;
	  if (initialVariables) {
	    var mergedVariables;
	    for (var key in initialVariables) {
	      if (key in props) {
	        mergedVariables = mergedVariables || _extends({}, variables);
	        mergedVariables[key] = props[key];
	      }
	    }
	    variables = mergedVariables || variables;
	  }
	  return variables;
	}

	/**
	 * Compare props and variables and reset the internal query variables if outside
	 * query variables change the component.
	 *
	 * TODO: Stop allowing props to override variables, #7856288.
	 */
	function resetPropOverridesForVariables(spec, props, variables) {
	  var initialVariables = spec.initialVariables;
	  for (var key in initialVariables) {
	    if (key in props && props[key] != variables[key]) {
	      return initialVariables;
	    }
	  }
	  return variables;
	}

	/**
	 * Constructs a unique key for a deferred subscription.
	 */
	function getSubscriptionKey(dataID, fragmentID) {
	  return dataID + '.' + fragmentID;
	}

	function initializeProfiler(RelayContainer) {
	  RelayProfiler.instrumentMethods(RelayContainer.prototype, {
	    componentWillMount: 'RelayContainer.prototype.componentWillMount',
	    componentWillReceiveProps: 'RelayContainer.prototype.componentWillReceiveProps',
	    shouldComponentUpdate: 'RelayContainer.prototype.shouldComponentUpdate'
	  });
	}

	/**
	 * Merges a partial update into a set of variables. If no variables changed, the
	 * same object is returned. Otherwise, a new object is returned.
	 */
	function mergeVariables(currentVariables, partialVariables) {
	  if (partialVariables) {
	    for (var key in partialVariables) {
	      if (currentVariables[key] !== partialVariables[key]) {
	        return _extends({}, currentVariables, partialVariables);
	      }
	    }
	  }
	  return currentVariables;
	}

	/**
	 * Wrapper around `buildRQL.Fragment` with contextual error messages.
	 */
	function buildContainerFragment(containerName, fragmentName, fragmentBuilder, variables) {
	  var fragment = buildRQL.Fragment(fragmentBuilder, _Object$keys(variables));
	  !fragment ?  true ? invariant(false, 'Relay.QL defined on container `%s` named `%s` is not a valid fragment. ' + 'A typical fragment is defined using: Relay.QL`fragment on Type {...}`', containerName, fragmentName) : invariant(false) : undefined;
	  return fragment;
	}

	/**
	 * Creates a lazy Relay container. The actual container is created the first
	 * time a container is being constructed by React's rendering engine.
	 */
	function create(Component, maybeSpec // spec: RelayContainerSpec
	) {
	  var spec = RelayDeprecated.upgradeContainerSpec(maybeSpec);

	  var componentName = Component.displayName || Component.name;
	  var containerName = 'Relay(' + componentName + ')';
	  var containerID = (nextContainerID++).toString(36);

	  var fragments = spec.fragments;
	  !(typeof fragments === 'object' && fragments) ?  true ? invariant(false, 'Relay.createContainer(%s, ...): Missing `fragments`, which is expected ' + 'to be an object mapping from `propName` to: () => Relay.QL`...`', componentName) : invariant(false) : undefined;
	  var fragmentNames = _Object$keys(fragments);
	  var initialVariables = spec.initialVariables || {};
	  var prepareVariables = spec.prepareVariables;

	  var Container;
	  function ContainerConstructor(props, context) {
	    if (!Container) {
	      Container = createContainerComponent(Component, spec, containerID);
	    }
	    return new Container(props, context);
	  }

	  ContainerConstructor.getFragmentNames = function () {
	    return fragmentNames;
	  };
	  ContainerConstructor.getQueryNames = RelayDeprecated.createWarning({
	    was: componentName + '.getQueryNames',
	    now: componentName + '.getFragmentNames',
	    adapter: ContainerConstructor.getFragmentNames
	  });

	  /**
	   * Retrieves a reference to the fragment by name. An optional second argument
	   * can be supplied to override the component's default variables.
	   */
	  ContainerConstructor.getFragment = function (fragmentName, variableMapping) {
	    var fragmentBuilder = fragments[fragmentName];
	    if (!fragmentBuilder) {
	       true ?  true ? invariant(false, '%s.getFragment(): `%s` is not a valid fragment name. Available ' + 'fragments names: %s', containerName, fragmentName, fragmentNames.map(function (name) {
	        return '`' + name + '`';
	      }).join(', ')) : invariant(false) : undefined;
	    }
	    return new RelayFragmentReference(function () {
	      return buildContainerFragment(containerName, fragmentName, fragmentBuilder, initialVariables);
	    }, initialVariables, variableMapping, prepareVariables);
	  };
	  ContainerConstructor.getQuery = RelayDeprecated.createWarning({
	    was: componentName + '.getQuery',
	    now: componentName + '.getFragment',
	    adapter: ContainerConstructor.getFragment
	  });

	  ContainerConstructor.contextTypes = containerContextTypes;
	  ContainerConstructor.displayName = containerName;
	  ContainerConstructor.moduleName = null;

	  return ContainerConstructor;
	}

	module.exports = { create: create };

/***/ },
/* 135 */
/***/ function(module, exports) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule RelayContainerComparators
	 * 
	 * @typechecks
	 */

	'use strict';

	/**
	 * Compares `objectA` and `objectB` using the provided `isEqual` function.
	 *
	 * If a `filter` object is provided, only its keys will be checked during
	 * comparison.
	 */
	function compareObjects(isEqual, objectA, objectB, filter) {
	  var key;

	  // Test for A's keys different from B.
	  for (key in objectA) {
	    if (filter && !filter.hasOwnProperty(key)) {
	      continue;
	    }

	    if (objectA.hasOwnProperty(key) && (!objectB.hasOwnProperty(key) || !isEqual(objectA[key], objectB[key], key))) {
	      return false;
	    }
	  }
	  // Test for B's keys missing from A.
	  for (key in objectB) {
	    if (filter && !filter.hasOwnProperty(key)) {
	      continue;
	    }

	    if (objectB.hasOwnProperty(key) && !objectA.hasOwnProperty(key)) {
	      return false;
	    }
	  }
	  return true;
	}

	function isScalarAndEqual(valueA, valueB) {
	  return valueA === valueB && (valueA === null || typeof valueA !== 'object');
	}

	function isQueryDataEqual(fragmentPointers, currProp, nextProp, propName) {
	  return(
	    // resolved data did not change
	    fragmentPointers[propName] && currProp === nextProp ||
	    // otherwise compare fake data
	    isScalarAndEqual(currProp, nextProp)
	  );
	}

	function isNonQueryPropEqual(fragments, currProp, nextProp, propName) {
	  return(
	    // ignore props with fragments (instead resolved values are compared)
	    fragments.hasOwnProperty(propName) ||
	    // otherwise props must be scalar and === in order to skip
	    isScalarAndEqual(currProp, nextProp)
	  );
	}

	/**
	 * Relay-aware comparators for props and state provide a reasonable default
	 * implementation of `shouldComponentUpdate`.
	 */
	var RelayContainerComparators = {
	  areQueryResultsEqual: function areQueryResultsEqual(fragmentPointers, prevQueryData, nextQueryData) {
	    return compareObjects(isQueryDataEqual.bind(null, fragmentPointers), prevQueryData, nextQueryData);
	  },

	  areNonQueryPropsEqual: function areNonQueryPropsEqual(fragments, props, nextProps) {
	    return compareObjects(isNonQueryPropEqual.bind(null, fragments), props, nextProps);
	  },

	  areQueryVariablesEqual: function areQueryVariablesEqual(variables, nextVariables) {
	    return compareObjects(isScalarAndEqual, variables, nextVariables);
	  }
	};

	module.exports = RelayContainerComparators;

/***/ },
/* 136 */
/***/ function(module, exports) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule RelayContainerProxy
	 * @typechecks
	 * 
	 */

	/**
	 * This feature is deprecated and unavailable in open source.
	 */
	'use strict';

	var RelayContainerProxy = {
	  proxyMethods: function proxyMethods(RelayContainer, Component) {}
	};

	module.exports = RelayContainerProxy;

/***/ },
/* 137 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule RelayDefaultNetworkLayer
	 * @typechecks
	 * 
	 */

	'use strict';

	var _classCallCheck = __webpack_require__(2)['default'];

	var Promise = __webpack_require__(17);

	var fetch = __webpack_require__(110);
	var fetchWithRetries = __webpack_require__(213);

	var DEFAULT_FETCH_TIMEOUT = 15000;
	var DEFAULT_RETRY_DELAYS = [1000, 3000];

	var RelayDefaultNetworkLayer = (function () {
	  function RelayDefaultNetworkLayer(uri, timeout, retryDelays) {
	    _classCallCheck(this, RelayDefaultNetworkLayer);

	    this._uri = uri;
	    this._timeout = typeof timeout === 'number' ? timeout : DEFAULT_FETCH_TIMEOUT;
	    this._retryDelays = retryDelays || DEFAULT_RETRY_DELAYS;

	    // Bind instance methods to facilitate reuse when creating custom network
	    // layers.
	    var self = this;
	    self.sendMutation = this.sendMutation.bind(this);
	    self.sendQueries = this.sendQueries.bind(this);
	    self.supports = this.supports.bind(this);
	  }

	  /**
	   * Rejects HTTP responses with a status code that is not >= 200 and < 300.
	   * This is done to follow the internal behavior of `fetchWithRetries`.
	   */

	  RelayDefaultNetworkLayer.prototype.sendMutation = function sendMutation(request) {
	    return this._sendMutation(request).then(function (result) {
	      return result.json();
	    }).then(function (payload) {
	      if (payload.hasOwnProperty('errors')) {
	        var error = new Error('Server request for mutation `' + request.getDebugName() + '` ' + 'failed for the following reasons:\n\n' + formatRequestErrors(request, payload.errors));
	        error.source = payload;
	        request.reject(error);
	      } else {
	        request.resolve({ response: payload.data });
	      }
	    })['catch'](function (error) {
	      return request.reject(error);
	    });
	  };

	  RelayDefaultNetworkLayer.prototype.sendQueries = function sendQueries(requests) {
	    var _this = this;

	    return Promise.all(requests.map(function (request) {
	      return _this._sendQuery(request).then(function (result) {
	        return result.json();
	      }).then(function (payload) {
	        if (payload.hasOwnProperty('errors')) {
	          var error = new Error('Server request for query `' + request.getDebugName() + '` ' + 'failed for the following reasons:\n\n' + formatRequestErrors(request, payload.errors));
	          error.source = payload;
	          request.reject(error);
	        } else if (!payload.hasOwnProperty('data')) {
	          request.reject(new Error('Server response was missing for query `' + request.getDebugName() + '`.'));
	        } else {
	          request.resolve({ response: payload.data });
	        }
	      })['catch'](function (error) {
	        return request.reject(error);
	      });
	    }));
	  };

	  RelayDefaultNetworkLayer.prototype.supports = function supports() {
	    // Does not support the only defined option, "defer".
	    return false;
	  };

	  /**
	   * Sends a POST request with optional files.
	   */

	  RelayDefaultNetworkLayer.prototype._sendMutation = function _sendMutation(request) {
	    var init;
	    var files = request.getFiles();
	    if (files) {
	      if (!global.FormData) {
	        throw new Error('Uploading files without `FormData` not supported.');
	      }
	      var formData = new FormData();
	      formData.append('query', request.getQueryString());
	      formData.append('variables', JSON.stringify(request.getVariables()));
	      for (var filename in files) {
	        if (files.hasOwnProperty(filename)) {
	          formData.append(filename, files[filename]);
	        }
	      }
	      init = {
	        body: formData,
	        method: 'POST'
	      };
	    } else {
	      init = {
	        body: JSON.stringify({
	          query: request.getQueryString(),
	          variables: request.getVariables()
	        }),
	        credentials: 'same-origin',
	        headers: { 'Content-Type': 'application/json' },
	        method: 'POST'
	      };
	    }
	    return fetch(this._uri, init).then(throwOnServerError);
	  };

	  /**
	   * Sends a POST request and retries if the request fails or times out.
	   */

	  RelayDefaultNetworkLayer.prototype._sendQuery = function _sendQuery(request) {
	    return fetchWithRetries(this._uri, {
	      body: JSON.stringify({
	        query: request.getQueryString(),
	        variables: request.getVariables()
	      }),
	      credentials: 'same-origin',
	      fetchTimeout: this._timeout,
	      headers: { 'Content-Type': 'application/json' },
	      method: 'POST',
	      retryDelays: this._retryDelays
	    });
	  };

	  return RelayDefaultNetworkLayer;
	})();

	function throwOnServerError(response) {
	  if (response.status >= 200 && response.status < 300) {
	    return response;
	  } else {
	    throw response;
	  }
	}

	/**
	 * Formats an error response from GraphQL server request.
	 */
	function formatRequestErrors(request, errors) {
	  var CONTEXT_BEFORE = 20;
	  var CONTEXT_LENGTH = 60;

	  var queryLines = request.getQueryString().split('\n');
	  return errors.map(function (_ref, ii) {
	    var locations = _ref.locations;
	    var message = _ref.message;

	    var prefix = ii + 1 + '. ';
	    var indent = ' '.repeat(prefix.length);
	    return prefix + message + '\n' + locations.map(function (_ref2) {
	      var column = _ref2.column;
	      var line = _ref2.line;

	      var queryLine = queryLines[line - 1];
	      var offset = Math.min(column - 1, CONTEXT_BEFORE);
	      return [queryLine.substr(column - 1 - offset, CONTEXT_LENGTH), ' '.repeat(offset) + '^^^'].map(function (messageLine) {
	        return indent + messageLine;
	      }).join('\n');
	    }).join('\n');
	  }).join('\n');
	}

	module.exports = RelayDefaultNetworkLayer;
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 138 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule RelayError
	 * @typechecks
	 * 
	 */

	'use strict';

	var sprintf = __webpack_require__(112);

	/**
	 * @internal
	 *
	 * Factory methods for constructing errors in Relay.
	 */
	var RelayError = {
	  create: function create(name, format) {
	    for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
	      args[_key - 2] = arguments[_key];
	    }

	    return createError('mustfix', name, format, args);
	  },
	  createWarning: function createWarning(name, format) {
	    for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
	      args[_key2 - 2] = arguments[_key2];
	    }

	    return createError('warn', name, format, args);
	  },
	  createForResponse: function createForResponse(errorData) {
	    var error = RelayError.create('RelayResponseError', '%s (%s)\n%s', errorData.description, errorData.code, errorData.debug_info || '');
	    error.source = errorData;
	    return error;
	  }
	};

	/**
	 * @private
	 */
	function createError(type, name, format, args) {
	  var error = new Error(sprintf.apply(undefined, [format].concat(args)));
	  error.name = name;
	  error.type = type;
	  error.framesToPop = 2;
	  return error;
	}

	module.exports = RelayError;

/***/ },
/* 139 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule RelayMutation
	 * @typechecks
	 * 
	 */

	'use strict';

	var _classCallCheck = __webpack_require__(2)['default'];

	var _extends = __webpack_require__(11)['default'];

	var _Object$keys = __webpack_require__(5)['default'];

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var RelayDeprecated = __webpack_require__(40);
	var RelayFragmentReference = __webpack_require__(41);

	var RelayStore = __webpack_require__(43);

	var buildRQL = __webpack_require__(59);

	var forEachObject = __webpack_require__(7);
	var fromGraphQL = __webpack_require__(84);
	var invariant = __webpack_require__(1);
	var warning = __webpack_require__(10);

	/**
	 * @public
	 *
	 * RelayMutation is the base class for modeling mutations of data.
	 */

	var RelayMutation = (function () {
	  function RelayMutation(props) {
	    _classCallCheck(this, RelayMutation);

	    this._didShowFakeDataWarning = false;
	    this._resolveProps(props);
	  }

	  /**
	   * Wrapper around `buildRQL.Fragment` with contextual error messages.
	   */

	  /**
	   * Each mutation has a server name which is used by clients to communicate the
	   * type of mutation that should be executed on the server.
	   */

	  RelayMutation.prototype.getMutation = function getMutation() {
	     true ?  true ? invariant(false, '%s: Expected abstract method `getMutation` to be implemented.', this.constructor.name) : invariant(false) : undefined;
	  };

	  /**
	   * "Fat queries" represent a predetermined set of fields that may change as a
	   * result of a mutation, and which should therefore be queried in order to get
	   * a consistent view of the data after performing a mutation. In practice, we
	   * query for a subset of those fields because we intersect the fat query with
	   * the tracked query we have for a given node (ie. the pieces of data we've
	   * previously queried for and have therefore written to the store).
	   *
	   * Fat queries can be written like normal graphql queries with one main
	   * exception: fat queries use childless non-scalar fields to indicate that
	   * anything under that field may change. For example, the fat query for
	   * feedback_like contains the field `like_sentence` with no child fields.
	   * This means that any field below `like_sentence` may change as a result of
	   * feedback_like.
	   *
	   * When adding a fat query, consider *all* of the data that might change as a
	   * result of the mutation - not just data that we currently use in Relay. We
	   * don't need to worry about overfetching here (this query is never executed
	   * on its own; the infrastructure always intersects it with what is actually
	   * needed), and if we omit fields here we might get odd consistency behavior
	   * in the future when we add new views or modify existing ones.
	   */

	  RelayMutation.prototype.getFatQuery = function getFatQuery() {
	     true ?  true ? invariant(false, '%s: Expected abstract method `getFatQuery` to be implemented.', this.constructor.name) : invariant(false) : undefined;
	  };

	  /**
	   * These configurations are used to generate the query for the mutation to be
	   * sent to the server and to correctly write the server's response into the
	   * client store.
	   *
	   * Possible configuration types:
	   *
	   * -  FIELDS_CHANGE provides configuration for mutation fields.
	   *    {
	   *      type: RelayMutationType.FIELDS_CHANGE;
	   *      fieldIDs: {[fieldName: string]: DataID | Array<DataID>};
	   *    }
	   *    where fieldIDs map `fieldName`s from the fatQuery to a DataID or
	   *    array of DataIDs to be updated in the store.
	   *
	   * -  RANGE_ADD provides configuration for adding a new edge to a range.
	   *    {
	   *      type: RelayMutationType.RANGE_ADD;
	   *      parentName: string;
	   *      parentID: string;
	   *      connectionName: string;
	   *      edgeName: string;
	   *      rangeBehaviors:
	   *        {[call: string]: GraphQLMutatorConstants.RANGE_OPERATIONS};
	   *    }
	   *    where `parentName` is the field in the fatQuery that contains the range,
	   *    `parentID` is the DataID of `parentName` in the store, `connectionName`
	   *    is the name of the range, `edgeName` is the name of the key in server
	   *    response that contains the newly created edge, `rangeBehaviors` maps
	   *    stringified representation of calls on the connection to
	   *    GraphQLMutatorConstants.RANGE_OPERATIONS.
	   *
	   * -  NODE_DELETE provides configuration for deleting a node and the
	   *    corresponding edge from a range.
	   *    {
	   *      type: RelayMutationType.NODE_DELETE;
	   *      parentName: string;
	   *      parentID: string;
	   *      connectionName: string;
	   *      deletedIDFieldName: string;
	   *    }
	   *    where `parentName`, `parentID` and `connectionName` refer to the same
	   *    things as in RANGE_ADD, `deletedIDFieldName` is the name of the key in
	   *    the server response that contains the DataID of the deleted node.
	   *
	   * -  RANGE_DELETE provides configuration for deleting an edge from a range
	   *    but doesn't delete the node.
	   *    {
	   *      type: RelayMutationType.RANGE_DELETE;
	   *      parentName: string;
	   *      parentID: string;
	   *      connectionName: string;
	   *      deletedIDFieldName: string;
	   *      pathToConnection: Array<string>;
	   *    }
	   *    where `parentName`, `parentID`, `connectionName` and
	   *    `deletedIDFieldName` refer to the same things as in NODE_DELETE,
	   *    `pathToConnection` provides a path from `parentName` to
	   *    `connectionName`.
	   *
	   * -  REQUIRED_CHILDREN is used to append additional children (fragments or
	   *    fields) to the mutation query. Any data fetched as a result of these
	   *    children is not written to the client store. Please avoid using this.
	   *    {
	   *      type: RelayMutationType.REQUIRED_CHILDREN;
	   *      children: Array<RelayQuery.Node>;
	   *    }
	   */

	  RelayMutation.prototype.getConfigs = function getConfigs() {
	     true ?  true ? invariant(false, '%s: Expected abstract method `getConfigs` to be implemented.', this.constructor.name) : invariant(false) : undefined;
	  };

	  /**
	   * These variables form the "input" to the mutation query sent to the server.
	   */

	  RelayMutation.prototype.getVariables = function getVariables() {
	     true ?  true ? invariant(false, '%s: Expected abstract method `getVariables` to be implemented.', this.constructor.name) : invariant(false) : undefined;
	  };

	  /**
	   * These will be sent along with the mutation query to the server.
	   */

	  RelayMutation.prototype.getFiles = function getFiles() {
	    return null;
	  };

	  /**
	   * When a request is sent to the server, mutations can optionally construct an
	   * optimistic response that has the same shape as the server response payload.
	   * This optimistic response is used to pre-emptively update the client cache
	   * to simulate an instantaneous response.
	   *
	   * The optimistic response may be a subset or superset of the actual response
	   * payload. It can be a subset if certain fields are impossible to create on
	   * the client (and if views are expected to handle the data inconsistency). It
	   * can be a superset of the actual response payload if certain fields that are
	   * affected have not been queried by the client, yet.
	   */

	  RelayMutation.prototype.getOptimisticResponse = function getOptimisticResponse() {
	    return null;
	  };

	  /**
	   * Optional. Similar to `getConfig`, this is used to create the query
	   * corresponding to the `optimisticResponse`. If not provided, the query
	   * will be inferred from the optimistic response. Most subclasses shouldn't
	   * need to extend this method.
	   */

	  RelayMutation.prototype.getOptimisticConfigs = function getOptimisticConfigs() {
	    return null;
	  };

	  /**
	   * An optional collision key allows a mutation to identify itself with other
	   * mutations that affect the same fields. Mutations with the same collision
	   * are sent to the server serially and in-order to avoid unpredictable and
	   * potentially incorrect behavior.
	   */

	  RelayMutation.prototype.getCollisionKey = function getCollisionKey() {
	    return null;
	  };

	  RelayMutation.prototype._resolveProps = function _resolveProps(props) {
	    var _this = this;

	    var fragments = RelayDeprecated.getMutationFragments(this.constructor);
	    var initialVariables = RelayDeprecated.getMutationInitialVariables(this.constructor) || {};

	    var resolvedProps = _extends({}, props);
	    forEachObject(fragments, function (fragmentBuilder, fragmentName) {
	      var propValue = props[fragmentName];
	       true ? warning(propValue !== undefined, 'RelayMutation: Expected data for fragment `%s` to be supplied to ' + '`%s` as a prop. Pass an explicit `null` if this is intentional.', fragmentName, _this.constructor.name) : undefined;

	      if (!propValue) {
	        return;
	      }

	      var fragment = fromGraphQL.Fragment(buildMutationFragment(_this.constructor.name, fragmentName, fragmentBuilder, initialVariables));
	      var concreteFragmentID = fragment.getConcreteFragmentID();

	      if (fragment.isPlural()) {
	        !Array.isArray(propValue) ?  true ? invariant(false, 'RelayMutation: Invalid prop `%s` supplied to `%s`, expected an ' + 'array of records because the corresponding fragment is plural.', fragmentName, _this.constructor.name) : invariant(false) : undefined;
	        var dataIDs = propValue.reduce(function (acc, item, ii) {
	          var eachFragmentPointer = item[concreteFragmentID];
	          !eachFragmentPointer ?  true ? invariant(false, 'RelayMutation: Invalid prop `%s` supplied to `%s`, ' + 'expected element at index %s to have query data.', fragmentName, _this.constructor.name, ii) : invariant(false) : undefined;
	          return acc.concat(eachFragmentPointer.getDataIDs());
	        }, []);

	        resolvedProps[fragmentName] = RelayStore.readAll(fragment, dataIDs);
	      } else {
	        !!Array.isArray(propValue) ?  true ? invariant(false, 'RelayMutation: Invalid prop `%s` supplied to `%s`, expected a ' + 'single record because the corresponding fragment is not plural.', fragmentName, _this.constructor.name) : invariant(false) : undefined;
	        var fragmentPointer = propValue[concreteFragmentID];
	        if (fragmentPointer) {
	          var dataID = fragmentPointer.getDataID();
	          resolvedProps[fragmentName] = RelayStore.read(fragment, dataID);
	        } else {
	          if (true) {
	            if (!_this._didShowFakeDataWarning) {
	              _this._didShowFakeDataWarning = true;
	               true ? warning(false, 'RelayMutation: Expected prop `%s` supplied to `%s` to ' + 'be data fetched by Relay. This is likely an error unless ' + 'you are purposely passing in mock data that conforms to ' + 'the shape of this mutation\'s fragment.', fragmentName, _this.constructor.name) : undefined;
	            }
	          }
	        }
	      }
	    });
	    this.props = resolvedProps;
	  };

	  RelayMutation.getFragment = function getFragment(fragmentName, variableMapping) {
	    var _this2 = this;

	    // TODO: Unify fragment API for containers and mutations, #7860172.
	    var fragments = RelayDeprecated.getMutationFragments(this);
	    var fragmentBuilder = fragments[fragmentName];
	    if (!fragmentBuilder) {
	       true ?  true ? invariant(false, '%s.getFragment(): `%s` is not a valid fragment name. Available ' + 'fragments names: %s', this.name, fragmentName, _Object$keys(fragments).map(function (name) {
	        return '`' + name + '`';
	      }).join(', ')) : invariant(false) : undefined;
	    }

	    // $FlowFixMe - Deprecated APIs.
	    var processQueryParams = this.processQueryParams;
	    if (processQueryParams && !this.prepareVariables) {
	      RelayDeprecated.warn({
	        was: this.name + '.getQuery',
	        now: this.name + '.getFragment'
	      });
	      this.prepareVariables = function (prevVariables, route) {
	        return processQueryParams(route, prevVariables);
	      };
	    }
	    var initialVariables = RelayDeprecated.getMutationInitialVariables(this) || {};
	    var prepareVariables = this.prepareVariables;

	    return new RelayFragmentReference(function () {
	      return buildMutationFragment(_this2.name, fragmentName, fragmentBuilder, initialVariables);
	    }, initialVariables, variableMapping, prepareVariables);
	  };

	  /**
	   * @deprecated
	   */

	  RelayMutation.getQuery = function getQuery() {
	    RelayDeprecated.warn({
	      was: this.name + '.getQuery',
	      now: this.name + '.getFragment'
	    });
	    return this.getFragment.apply(this, arguments);
	  };

	  return RelayMutation;
	})();

	function buildMutationFragment(mutationName, fragmentName, fragmentBuilder, variables) {
	  var fragment = buildRQL.Fragment(fragmentBuilder, _Object$keys(variables));
	  !fragment ?  true ? invariant(false, 'Relay.QL defined on mutation `%s` named `%s` is not a valid fragment. ' + 'A typical fragment is defined using: Relay.QL`fragment on Type {...}`', mutationName, fragmentName) : invariant(false) : undefined;
	  return fragment;
	}

	module.exports = RelayMutation;

/***/ },
/* 140 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule RelayMutationQuery
	 * @typechecks
	 * 
	 */

	'use strict';

	var _toConsumableArray = __webpack_require__(29)['default'];

	var GraphQLStoreDataHandler = __webpack_require__(8);
	var RelayConnectionInterface = __webpack_require__(9);

	var RelayMetaRoute = __webpack_require__(26);
	var RelayMutationType = __webpack_require__(79);
	var RelayQuery = __webpack_require__(3);

	var RelayStoreData = __webpack_require__(12);

	var flattenRelayQuery = __webpack_require__(83);
	var forEachObject = __webpack_require__(7);
	var nullthrows = __webpack_require__(70);
	var inferRelayFieldsFromData = __webpack_require__(161);
	var intersectRelayQuery = __webpack_require__(162);
	var invariant = __webpack_require__(1);
	var refragmentRelayQuery = __webpack_require__(92);

	var CLIENT_MUTATION_ID = RelayConnectionInterface.CLIENT_MUTATION_ID;

	/**
	 * @internal
	 *
	 * Constructs query fragments that are sent with mutations, which should ensure
	 * that any records changed as a result of mutations are brought up-to-date.
	 *
	 * The fragments are a minimal subset created by intersecting the "fat query"
	 * (fields that a mutation declares may have changed) with the "tracked query"
	 * (fields representing data previously queried and written into the store).
	 */
	var RelayMutationQuery = {
	  /**
	   * Accepts a mapping from field names to data IDs. The field names must exist
	   * as top-level fields in the fat query. These top-level fields are used to
	   * re-fetch any data that has changed for records identified by the data IDs.
	   *
	   * The supplied mapping may contain multiple field names. In addition, each
	   * field name may map to an array of data IDs if the field is plural.
	   */
	  buildFragmentForFields: function buildFragmentForFields(_ref) {
	    var tracker = _ref.tracker;
	    var fatQuery = _ref.fatQuery;
	    var fieldIDs = _ref.fieldIDs;

	    var queryTracker = tracker || RelayStoreData.getDefaultInstance().getQueryTracker();
	    var mutatedFields = [];
	    forEachObject(fieldIDs, function (dataIDOrIDs, fieldName) {
	      var fatField = getFieldFromFatQuery(fatQuery, fieldName);
	      var dataIDs = [].concat(dataIDOrIDs);
	      var trackedChildren = [];
	      dataIDs.forEach(function (dataID) {
	        trackedChildren.push.apply(trackedChildren, _toConsumableArray(queryTracker.getTrackedChildrenForID(dataID)));
	      });
	      var trackedField = fatField.clone(trackedChildren);
	      if (trackedField) {
	        var mutationField = intersectRelayQuery(trackedField, fatField);
	        if (mutationField) {
	          mutatedFields.push(mutationField);
	        }
	      }
	    });
	    return buildMutationFragment(fatQuery, mutatedFields);
	  },

	  /**
	   * Creates a fragment used to update any data as a result of a mutation that
	   * deletes an edge from a connection. The primary difference between this and
	   * `createForFields` is whether or not the connection edges are re-fetched.
	   *
	   * `connectionName`
	   *   Name of the connection field from which the edge is being deleted.
	   *
	   * `parentID`
	   *   ID of the parent record containing the connection which may have metadata
	   *   that needs to be re-fetched.
	   *
	   * `parentName`
	   *   Name of the top-level field in the fat query that corresponds to the
	   *   parent record.
	   */
	  buildFragmentForEdgeDeletion: function buildFragmentForEdgeDeletion(_ref2) {
	    var tracker = _ref2.tracker;
	    var fatQuery = _ref2.fatQuery;
	    var connectionName = _ref2.connectionName;
	    var parentID = _ref2.parentID;
	    var parentName = _ref2.parentName;

	    tracker = tracker || RelayStoreData.getDefaultInstance().getQueryTracker();
	    var fatParent = getFieldFromFatQuery(fatQuery, parentName);
	    var mutatedFields = [];
	    var trackedParent = fatParent.clone(tracker.getTrackedChildrenForID(parentID));
	    if (trackedParent) {
	      var filterUnterminatedRange = function filterUnterminatedRange(node) {
	        return node.getSchemaName() === connectionName;
	      };
	      var mutatedField = intersectRelayQuery(trackedParent, fatParent, filterUnterminatedRange);
	      if (mutatedField) {
	        mutatedFields.push(mutatedField);
	      }
	    }
	    return buildMutationFragment(fatQuery, mutatedFields);
	  },

	  /**
	   * Creates a fragment used to fetch data necessary to insert a new edge into
	   * an existing connection.
	   *
	   * `connectionName`
	   *   Name of the connection field into which the edge is being inserted.
	   *
	   * `parentID`
	   *   ID of the parent record containing the connection which may have metadata
	   *   that needs to be re-fetched.
	   *
	   * `edgeName`
	   *   Name of the top-level field in the fat query that corresponds to the
	   *   newly inserted edge.
	   *
	   * `parentName`
	   *   Name of the top-level field in the fat query that corresponds to the
	   *   parent record. If not supplied, metadata on the parent record and any
	   *   connections without entries in `rangeBehaviors` will not be updated.
	   */
	  buildFragmentForEdgeInsertion: function buildFragmentForEdgeInsertion(_ref3) {
	    var tracker = _ref3.tracker;
	    var fatQuery = _ref3.fatQuery;
	    var connectionName = _ref3.connectionName;
	    var parentID = _ref3.parentID;
	    var edgeName = _ref3.edgeName;
	    var parentName = _ref3.parentName;
	    var rangeBehaviors = _ref3.rangeBehaviors;

	    tracker = tracker || RelayStoreData.getDefaultInstance().getQueryTracker();
	    var trackedChildren = tracker.getTrackedChildrenForID(parentID);

	    var mutatedFields = [];
	    var trackedConnections = trackedChildren.filter(function (trackedChild) {
	      return trackedChild instanceof RelayQuery.Field && trackedChild.getSchemaName() === connectionName;
	    }); // $FlowIssue

	    if (trackedConnections.length) {
	      var keysWithoutRangeBehavior = {};
	      var mutatedEdgeFields = [];
	      trackedConnections.forEach(function (trackedConnection) {
	        var trackedEdge = trackedConnection.getFieldByStorageKey('edges');
	        if (trackedEdge == null) {
	          return;
	        }
	        if (getRangeBehaviorKey(trackedConnection) in rangeBehaviors) {
	          // Include edges from all connections that exist in `rangeBehaviors`.
	          // This may add duplicates, but they will eventually be flattened.
	          mutatedEdgeFields.push.apply(mutatedEdgeFields, _toConsumableArray(trackedEdge.getChildren()));
	        } else {
	          // If the connection is not in `rangeBehaviors`, re-fetch it.
	          var key = trackedConnection.getSerializationKey();
	          keysWithoutRangeBehavior[key] = true;
	        }
	      });
	      if (mutatedEdgeFields.length) {
	        mutatedFields.push(buildEdgeField(parentID, edgeName, mutatedEdgeFields));
	      }

	      // TODO: Do this even if there are no tracked connections.
	      if (parentName != null) {
	        var fatParent = getFieldFromFatQuery(fatQuery, parentName);
	        var trackedParent = fatParent.clone(trackedChildren);
	        if (trackedParent) {
	          var filterUnterminatedRange = function filterUnterminatedRange(node) {
	            return !keysWithoutRangeBehavior.hasOwnProperty(node.getSerializationKey());
	          };
	          var mutatedParent = intersectRelayQuery(trackedParent, fatParent, filterUnterminatedRange);
	          if (mutatedParent) {
	            mutatedFields.push(mutatedParent);
	          }
	        }
	      }
	    }
	    return buildMutationFragment(fatQuery, mutatedFields);
	  },

	  /**
	   * Creates a fragment used to fetch the given optimistic response.
	   */
	  buildFragmentForOptimisticUpdate: function buildFragmentForOptimisticUpdate(_ref4) {
	    var response = _ref4.response;
	    var fatQuery = _ref4.fatQuery;

	    // Silences RelayQueryNode being incompatible with sub-class RelayQueryField
	    // A detailed error description is available in #7635477
	    var mutatedFields = inferRelayFieldsFromData(response);
	    return buildMutationFragment(fatQuery, mutatedFields);
	  },

	  /**
	   * Creates a RelayQuery.Mutation used to fetch the given optimistic response.
	   */
	  buildQueryForOptimisticUpdate: function buildQueryForOptimisticUpdate(_ref5) {
	    var response = _ref5.response;
	    var fatQuery = _ref5.fatQuery;
	    var mutation = _ref5.mutation;

	    var children = [nullthrows(RelayMutationQuery.buildFragmentForOptimisticUpdate({
	      response: response,
	      fatQuery: fatQuery
	    }))];
	    // TODO: Can this method ever return null? Task #7705258.
	    return nullthrows(flattenRelayQuery(RelayQuery.Node.buildMutation('OptimisticQuery', fatQuery.getType(), mutation.calls[0].name, children)));
	  },

	  /**
	   * Creates a RelayQuery.Mutation for the given config. See type
	   * `MutationConfig` and the `buildFragmentForEdgeInsertion`,
	   * `buildFragmentForEdgeDeletion` and `buildFragmentForFields` methods above
	   * for possible configs.
	   */
	  buildQuery: function buildQuery(_ref6) {
	    var configs = _ref6.configs;
	    var fatQuery = _ref6.fatQuery;
	    var mutationName = _ref6.mutationName;
	    var mutation = _ref6.mutation;
	    var tracker = _ref6.tracker;
	    return (function () {
	      tracker = tracker || RelayStoreData.getDefaultInstance().getQueryTracker();

	      var children = [RelayQuery.Node.buildField(CLIENT_MUTATION_ID, null, null, { 'requisite': true })];

	      configs.forEach(function (config) {
	        switch (config.type) {
	          case RelayMutationType.REQUIRED_CHILDREN:
	            children = children.concat(config.children.map(function (child) {
	              return RelayQuery.Node.create(child, RelayMetaRoute.get('$buildQuery'), {});
	            }));
	            break;

	          case RelayMutationType.RANGE_ADD:
	            children.push(RelayMutationQuery.buildFragmentForEdgeInsertion({
	              connectionName: config.connectionName,
	              edgeName: config.edgeName,
	              fatQuery: fatQuery,
	              parentID: config.parentID,
	              parentName: config.parentName,
	              rangeBehaviors: config.rangeBehaviors,
	              tracker: tracker
	            }));
	            break;

	          case RelayMutationType.RANGE_DELETE:
	          case RelayMutationType.NODE_DELETE:
	            children.push(RelayMutationQuery.buildFragmentForEdgeDeletion({
	              connectionName: config.connectionName,
	              fatQuery: fatQuery,
	              parentID: config.parentID,
	              parentName: config.parentName,
	              tracker: tracker
	            }));
	            children.push(RelayQuery.Node.buildField(config.deletedIDFieldName));
	            break;

	          case RelayMutationType.FIELDS_CHANGE:
	            children.push(RelayMutationQuery.buildFragmentForFields({
	              fatQuery: fatQuery,
	              fieldIDs: config.fieldIDs,
	              tracker: tracker
	            }));
	            break;
	        }
	      });

	      // TODO: Can this method ever return null? Task #7705258.
	      return nullthrows(flattenRelayQuery(RelayQuery.Node.buildMutation(mutationName, fatQuery.getType(), mutation.calls[0].name, children, mutation.metadata)));
	    })();
	  }
	};

	function getFieldFromFatQuery(fatQuery, fieldName) {
	  var field = fatQuery.getFieldByStorageKey(fieldName);
	  !field ?  true ? invariant(false, 'RelayMutationQuery: Invalid field name on fat query, `%s`.', fieldName) : invariant(false) : undefined;
	  return field;
	}

	function buildMutationFragment(fatQuery, fields) {
	  // create a dummy field to re-fragment the input `fields`
	  var fragmentedFields = fields.length ? refragmentRelayQuery(RelayQuery.Node.buildField('build_mutation_fragment', null, fields)) : null;

	  var fragment = RelayQuery.Node.buildFragment('MutationQuery', fatQuery.getType(), fragmentedFields ? fragmentedFields.getChildren() : null);
	  if (fragment) {
	    !(fragment instanceof RelayQuery.Fragment) ?  true ? invariant(false, 'RelayMutationQuery: Expected a fragment.') : invariant(false) : undefined;
	    return fragment;
	  }
	  return null;
	}

	function buildEdgeField(parentID, edgeName, edgeFields) {
	  var fields = [RelayQuery.Node.buildField('cursor')];
	  if (RelayConnectionInterface.EDGES_HAVE_SOURCE_FIELD && !GraphQLStoreDataHandler.isClientID(parentID)) {
	    fields.push(RelayQuery.Node.buildField('source', null, [RelayQuery.Node.buildField('id')]));
	  }
	  fields.push.apply(fields, edgeFields);
	  return RelayQuery.Node.buildField(edgeName, null, fields);
	}

	function getRangeBehaviorKey(connectionField) {
	  // TODO: Replace `rangeBehavior` keys with `getStorageKey()`.
	  return connectionField.getStorageKey().substr(connectionField.getSchemaName().length + 1);
	}

	module.exports = RelayMutationQuery;

/***/ },
/* 141 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule RelayMutationRequest
	 * @typechecks
	 * 
	 */

	'use strict';

	var _inherits = __webpack_require__(6)['default'];

	var _classCallCheck = __webpack_require__(2)['default'];

	var Deferred = __webpack_require__(48);

	var printRelayQuery = __webpack_require__(91);

	/**
	 * @internal
	 *
	 * Instances of these are made available via `RelayNetworkLayer.sendMutation`.
	 */

	var RelayMutationRequest = (function (_Deferred) {
	  _inherits(RelayMutationRequest, _Deferred);

	  function RelayMutationRequest(mutation, variables, files) {
	    _classCallCheck(this, RelayMutationRequest);

	    _Deferred.call(this);
	    this._mutation = mutation;
	    this._variables = variables;
	    this._files = files;
	  }

	  /**
	   * @public
	   *
	   * Gets a string name used to refer to this request for printing debug output.
	   */

	  RelayMutationRequest.prototype.getDebugName = function getDebugName() {
	    return this._mutation.getName();
	  };

	  /**
	   * @public
	   *
	   * Gets an optional map from name to File objects.
	   */

	  RelayMutationRequest.prototype.getFiles = function getFiles() {
	    return this._files;
	  };

	  /**
	   * @public
	   *
	   * Gets the variables used by the mutation. These variables should be
	   * serialized and send in the GraphQL request.
	   */

	  RelayMutationRequest.prototype.getVariables = function getVariables() {
	    return this._variables;
	  };

	  /**
	   * @public
	   *
	   * Gets a string representation of the GraphQL mutation.
	   */

	  RelayMutationRequest.prototype.getQueryString = function getQueryString() {
	    return printRelayQuery(this._mutation);
	  };

	  /**
	   * @public
	   * @unstable
	   */

	  RelayMutationRequest.prototype.getMutation = function getMutation() {
	    return this._mutation;
	  };

	  return RelayMutationRequest;
	})(Deferred);

	module.exports = RelayMutationRequest;

/***/ },
/* 142 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule RelayMutationTracker
	 * 
	 * @typechecks
	 */

	// Maintains a map from the client id to the server id of
	// optimistically added nodes
	'use strict';

	var GraphQLStoreDataHandler = __webpack_require__(8);

	var clientIDToServerIDMap = {};

	// For node-create mutations, maintains an index of the mutation to the
	// client ID of an optimistically created node (if it exists).
	var mutationIDToClientNodeIDMap = {};

	// For mutations that have errors, maintains a two-directional index of the
	// mutation and node with an error.
	var clientMutationIDToErrorNodeID = {};
	var clientNodeIDToErrorMutationID = {};

	/**
	 * @internal
	 *
	 * Records the client ID and error status of mutations as well as maintaining
	 * a mapping of optimistic client IDs to server IDs.
	 */
	var RelayMutationTracker = {

	  /**
	   * Checks if the given id represents an object only known on the client side
	   * or not. In this case, it is both a client id and does not have a
	   * corresponding mapping in the client server id map.
	   */
	  isClientOnlyID: function isClientOnlyID(dataID) {
	    return GraphQLStoreDataHandler.isClientID(dataID) && !clientIDToServerIDMap[dataID];
	  },

	  /**
	   * Updates the map from the client id to the server id for optimistically
	   * added nodes.
	   */
	  updateClientServerIDMap: function updateClientServerIDMap(clientID, serverID) {
	    clientIDToServerIDMap[clientID] = serverID;
	  },

	  /**
	   * Gets the serverID (if one exists) for a given clientID
	   */
	  getServerIDForClientID: function getServerIDForClientID(clientID) {
	    return clientIDToServerIDMap[clientID] || null;
	  },

	  /**
	   * Record the root node ID associated with the mutation.
	   */
	  putClientIDForMutation: function putClientIDForMutation(clientID, clientMutationID) {
	    mutationIDToClientNodeIDMap[clientMutationID] = clientID;

	    // if an error exists for this mutation ID, remove the error on the previous
	    // client ID and 'move' the error on the new client ID
	    var errorNodeID = RelayMutationTracker.getErrorNodeForMutation(clientMutationID);
	    if (errorNodeID) {
	      RelayMutationTracker.deleteMutationForErrorNode(errorNodeID);
	      RelayMutationTracker.putErrorNodeForMutation(clientID, clientMutationID);
	    }
	  },

	  /**
	   * Get the root record ID associated with the muation.
	   */
	  getClientIDForMutation: function getClientIDForMutation(clientMutationID) {
	    return mutationIDToClientNodeIDMap[clientMutationID];
	  },

	  /**
	   * Delete the root record ID associated with the mutation.
	   */
	  deleteClientIDForMutation: function deleteClientIDForMutation(clientMutationID) {
	    delete mutationIDToClientNodeIDMap[clientMutationID];
	  },

	  /**
	   * Record that an error occurred while creating the given (client) record ID.
	   */
	  putErrorNodeForMutation: function putErrorNodeForMutation(clientID, clientMutationID) {
	    clientNodeIDToErrorMutationID[clientID] = clientMutationID;
	    clientMutationIDToErrorNodeID[clientMutationID] = clientID;
	  },

	  /**
	   * Find the failed mutation that created the given (client) record ID,
	   * if any.
	   */
	  getMutationForErrorNode: function getMutationForErrorNode(clientID) {
	    return clientNodeIDToErrorMutationID[clientID];
	  },

	  /**
	   * Find the (client) ID of the record associated with the given mutation,
	   * if any.
	   */
	  getErrorNodeForMutation: function getErrorNodeForMutation(clientMutationID) {
	    return clientMutationIDToErrorNodeID[clientMutationID];
	  },

	  deleteMutationForErrorNode: function deleteMutationForErrorNode(clientID) {
	    delete clientNodeIDToErrorMutationID[clientID];
	  },

	  deleteErrorNodeForMutation: function deleteErrorNodeForMutation(clientMutationID) {
	    delete clientMutationIDToErrorNodeID[clientMutationID];
	  }
	};

	module.exports = RelayMutationTracker;

/***/ },
/* 143 */
/***/ function(module, exports) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule RelayMutationTransactionStatus
	 * @typechecks
	 * 
	 */

	'use strict';

	var RelayMutationTransactionStatus = {
	  /**
	   * Transaction hasn't yet been sent to the server. Client has an optimistic
	   * update applied if the mutation defined one. Transaction can be committed or
	   * rolledback.
	   */
	  UNCOMMITTED: 'UNCOMMITTED',

	  /**
	   * Transaction was committed but another transaction with the same collision
	   * key is pending, so the transaction has been queued to send to the server.
	   */
	  COMMIT_QUEUED: 'COMMIT_QUEUED',

	  /**
	   * Transaction was queued for commit but another transaction with the same
	   * collision queue failed to commit. All transactions in the collision
	   * queue, including this one, have been failed as well. Transaction can be
	   * recommitted or rolledback.
	   */
	  COLLISION_COMMIT_FAILED: 'COLLISION_COMMIT_FAILED',

	  /**
	   * Transaction was sent to the server for comitting and a response is awaited.
	   */
	  COMMITTING: 'COMMITTING',

	  /**
	   * Transaction was sent to the server for comitting but was failed.
	   */
	  COMMIT_FAILED: 'COMMIT_FAILED'
	};

	module.exports = RelayMutationTransactionStatus;

/***/ },
/* 144 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule RelayNeglectionStateMap
	 * 
	 * @typechecks
	 */

	'use strict';

	var _classCallCheck = __webpack_require__(2)['default'];

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	var Map = __webpack_require__(50);

	var invariant = __webpack_require__(1);

	/**
	 * @internal
	 *
	 * A class that implements the `SortedMap` interface for a mapping from
	 * DataID to NeglectionState.
	 */

	var RelayNeglectionStateMap = (function () {
	  function RelayNeglectionStateMap() {
	    _classCallCheck(this, RelayNeglectionStateMap);

	    this._isSorted = true;
	    this._map = new Map();
	    this._states = [];
	  }

	  RelayNeglectionStateMap.prototype.decreaseSubscriptionsFor = function decreaseSubscriptionsFor(dataID) {
	    this._isSorted = false;
	    !this._map.has(dataID) ?  true ? invariant(false, 'RelayNeglectionStatesMap.decreaseSubscriptionsFor(): Cannot ' + 'decrease subscriptions for unregistered record `%s`.', dataID) : invariant(false) : undefined;

	    var data = this._map.get(dataID);
	    !(data.subscriptions > 0) ?  true ? invariant(false, 'RelayNeglectionStatesMap.decreaseSubscriptionsFor(): Cannot ' + 'decrease subscriptions below 0 for record `%s`.', dataID) : invariant(false) : undefined;
	    data.subscriptions--;
	    this._map.set(dataID, data);
	  };

	  RelayNeglectionStateMap.prototype.increaseSubscriptionsFor = function increaseSubscriptionsFor(dataID) {
	    this._isSorted = false;
	    if (!this._map.has(dataID)) {
	      this._registerWithSubscriptionCount(dataID, 1);
	      return;
	    }
	    var data = this._map.get(dataID);
	    data.subscriptions++;
	    this._map.set(dataID, data);
	  };

	  RelayNeglectionStateMap.prototype.register = function register(dataID) {
	    this._isSorted = false;
	    if (!this._map.has(dataID)) {
	      this._registerWithSubscriptionCount(dataID, 0);
	    }
	  };

	  RelayNeglectionStateMap.prototype.remove = function remove(dataID) {
	    this._map['delete'](dataID);
	  };

	  RelayNeglectionStateMap.prototype.size = function size() {
	    return this._map.size;
	  };

	  RelayNeglectionStateMap.prototype.values = function values() {
	    this._sort();
	    var done = false;
	    var ii = 0;
	    var states = this._states.slice();
	    /* $FlowFixMe(>=0.14.0) - So all iterators are supposed to also be
	     * iterable. That means myIterator[Symbol.iterator]() should probably return
	     * myIterator. However Flow and many browsers don't have support for Symbol
	     * yet.
	     *
	     * So yeah...this should probably be re-written to use a generator instead,
	     * assuming a generator transform is available.
	     */
	    return {
	      next: function next() {
	        if (done || ii === states.length) {
	          done = true;
	          states = [];
	          return { done: done };
	        }
	        var value = states[ii++];
	        return { done: done, value: value };
	      }
	    };
	  };

	  /**
	   * Registers the given dataID and sets the initial number of subscriptions
	   * for it.
	   */

	  RelayNeglectionStateMap.prototype._registerWithSubscriptionCount = function _registerWithSubscriptionCount(dataID, subscriptions) {
	    this._isSorted = false;
	    this._map.set(dataID, {
	      dataID: dataID,
	      collectible: false,
	      generations: 0,
	      subscriptions: subscriptions
	    });
	  };

	  RelayNeglectionStateMap.prototype._sort = function _sort() {
	    var _this = this;

	    if (!this._isSorted) {
	      this._states = [];
	      this._map.forEach(function (state) {
	        return state && _this._states.push(state);
	      });
	      this._states.sort(function (a, b) {
	        return a.subscriptions - b.subscriptions;
	      });
	      this._isSorted = true;
	    }
	  };

	  return RelayNeglectionStateMap;
	})();

	module.exports = RelayNeglectionStateMap;

/***/ },
/* 145 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule RelayPublic
	 * @typechecks
	 * 
	 */

	'use strict';

	var RelayContainer = __webpack_require__(134);
	var RelayMutation = __webpack_require__(139);
	var RelayNetworkLayer = __webpack_require__(27);
	var RelayPropTypes = __webpack_require__(55);
	var RelayQL = __webpack_require__(56);
	var RelayRootContainer = __webpack_require__(152);
	var RelayRoute = __webpack_require__(153);
	var RelayStore = __webpack_require__(43);
	var RelayTaskScheduler = __webpack_require__(44);

	var getRelayQueries = __webpack_require__(87);
	var isRelayContainer = __webpack_require__(89);

	if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ !== 'undefined') {
	  __REACT_DEVTOOLS_GLOBAL_HOOK__._relayInternals = {
	    NetworkLayer: __webpack_require__(27),
	    DefaultStoreData: __webpack_require__(12).getDefaultInstance()
	  };
	}

	/**
	 * Relay contains the set of public methods used to initialize and orchestrate
	 * a React application that uses GraphQL to declare data dependencies.
	 */
	var RelayPublic = {
	  Mutation: RelayMutation,
	  PropTypes: RelayPropTypes,
	  QL: RelayQL,
	  RootContainer: RelayRootContainer,
	  Route: RelayRoute,
	  Store: RelayStore,

	  createContainer: RelayContainer.create,
	  getQueries: getRelayQueries,
	  injectNetworkLayer: RelayNetworkLayer.injectNetworkLayer,
	  injectTaskScheduler: RelayTaskScheduler.injectScheduler,
	  isContainer: isRelayContainer
	};

	module.exports = RelayPublic;

/***/ },
/* 146 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule RelayQueryRequest
	 * @typechecks
	 * 
	 */

	'use strict';

	var _inherits = __webpack_require__(6)['default'];

	var _classCallCheck = __webpack_require__(2)['default'];

	var Deferred = __webpack_require__(48);

	var printRelayQuery = __webpack_require__(91);

	/**
	 * @internal
	 *
	 * Instances of these are made available via `RelayNetworkLayer.sendQueries`.
	 */

	var RelayQueryRequest = (function (_Deferred) {
	  _inherits(RelayQueryRequest, _Deferred);

	  function RelayQueryRequest(query) {
	    _classCallCheck(this, RelayQueryRequest);

	    _Deferred.call(this);
	    this._query = query;
	  }

	  /**
	   * @public
	   *
	   * Gets a string name used to refer to this request for printing debug output.
	   */

	  RelayQueryRequest.prototype.getDebugName = function getDebugName() {
	    return this._query.getName();
	  };

	  /**
	   * @public
	   *
	   * Gets a unique identifier for this query. These identifiers are useful for
	   * assigning response payloads to their corresponding queries when sent in a
	   * single GraphQL request.
	   */

	  RelayQueryRequest.prototype.getID = function getID() {
	    return this._query.getID();
	  };

	  /**
	   * @public
	   *
	   * Gets the variables used by the query. These variables should be serialized
	   * and send in the GraphQL request.
	   */

	  RelayQueryRequest.prototype.getVariables = function getVariables() {
	    return this._query.getVariables();
	  };

	  /**
	   * @public
	   *
	   * Gets a string representation of the GraphQL query.
	   */

	  RelayQueryRequest.prototype.getQueryString = function getQueryString() {
	    return printRelayQuery(this._query);
	  };

	  /**
	   * @public
	   * @unstable
	   */

	  RelayQueryRequest.prototype.getQuery = function getQuery() {
	    return this._query;
	  };

	  return RelayQueryRequest;
	})(Deferred);

	module.exports = RelayQueryRequest;

/***/ },
/* 147 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule RelayQuerySerializer
	 * 
	 * @typechecks
	 */

	'use strict';

	var _extends = __webpack_require__(11)['default'];

	var RelayQuery = __webpack_require__(3);

	var invariant = __webpack_require__(1);

	var FIELD = 'Field';
	var FRAGMENT_DEFINITION = 'FragmentDefinition';
	var QUERY = 'Query';

	/**
	 * @internal
	 *
	 * Methods for (de)serializing `RelayQueryNode`s to/from JSON.
	 */
	var RelayQuerySerializer = {
	  fromJSON: function fromJSON(data) {
	    !(typeof data === 'object' && data !== null && !Array.isArray(data)) ?  true ? invariant(false, 'RelayQuerySerializer.fromJSON(): expected an object.') : invariant(false) : undefined;
	    var alias = data.alias;
	    var calls = data.calls;
	    var children = data.children;
	    var kind = data.kind;
	    var metadata = data.metadata;
	    var name = data.name;
	    var type = data.type;

	    !(alias == null || typeof alias === 'string') ?  true ? invariant(false, 'RelayQuerySerializer.fromJSON(): expected `alias` to be a string, got ' + '`%s`.', alias) : invariant(false) : undefined;
	    !(calls == null || Array.isArray(calls)) ?  true ? invariant(false, 'RelayQuerySerializer.fromJSON(): expected `calls` to be an array.') : invariant(false) : undefined;
	    !(typeof kind === 'string') ?  true ? invariant(false, 'RelayQuerySerializer.fromJSON(): expected `kind` to be a string.') : invariant(false) : undefined;
	    !(!metadata || typeof metadata === 'object' && !Array.isArray(metadata)) ?  true ? invariant(false, 'RelayQuerySerializer.fromJSON(): expected `metadata` to be an object.') : invariant(false) : undefined;
	    !(typeof name === 'string') ?  true ? invariant(false, 'RelayQuerySerializer.fromJSON(): expected `name` to be a string.') : invariant(false) : undefined;
	    !(!children || Array.isArray(children)) ?  true ? invariant(false, 'RelayQuerySerializer.fromJSON(): expected `children` to be an array.') : invariant(false) : undefined;
	    children = children.map(RelayQuerySerializer.fromJSON);

	    if (kind === FIELD) {
	      var field = RelayQuery.Node.buildField(name, calls, children, metadata, alias);
	      !(field != null) ?  true ? invariant(false, 'RelayQuerySerializer.fromJSON(): expected a `Field`.') : invariant(false) : undefined;
	      return field;
	    } else if (kind === FRAGMENT_DEFINITION) {
	      !(typeof type === 'string') ?  true ? invariant(false, 'RelayQuerySerializer.fromJSON(): expected `type` to be a string.') : invariant(false) : undefined;
	      var fragment = RelayQuery.Node.buildFragment(name, type, children, metadata);
	      !(fragment != null) ?  true ? invariant(false, 'RelayQuerySerializer.fromJSON(): expected a `Fragment`.') : invariant(false) : undefined;
	      return fragment;
	    } else {
	      !(kind === QUERY) ?  true ? invariant(false, 'RelayQuerySerializer.fromJSON(): invalid kind %s.', kind) : invariant(false) : undefined;
	      var rootCall = calls[0];
	      var root = RelayQuery.Node.buildRoot(rootCall.name, rootCall.value, children, metadata, name);
	      !(root != null) ?  true ? invariant(false, 'RelayQuerySerializer.fromJSON(): expected a `Root`.') : invariant(false) : undefined;
	      return root;
	    }
	  },

	  toJSON: function toJSON(node) {
	    var children = node.getChildren().map(RelayQuerySerializer.toJSON);
	    if (node instanceof RelayQuery.Field) {
	      var name = node.getSchemaName();
	      var alias = node.getApplicationName();
	      return {
	        kind: FIELD,
	        name: name,
	        alias: alias !== name ? alias : null,
	        calls: node.getCallsWithValues(),
	        children: children,
	        metadata: node.__concreteNode__.__metadata__
	      };
	    } else if (node instanceof RelayQuery.Fragment) {
	      return {
	        kind: FRAGMENT_DEFINITION,
	        name: node.getDebugName(),
	        type: node.getType(),
	        children: children,
	        metadata: _extends({}, node.__concreteNode__.__metadata__, {
	          isDeferred: node.isDeferred(),
	          isReferenceFragment: node.isReferenceFragment()
	        })
	      };
	    } else {
	      !(node instanceof RelayQuery.Root) ?  true ? invariant(false, 'RelayQuerySerializer.toJSON(): invalid node type, only `Field`, ' + '`Fragment`, and `Root` are supported, got `%s`.', node.constructor.name) : invariant(false) : undefined;
	      var rootCall = node.getRootCall();
	      return {
	        kind: QUERY,
	        name: node.getName(),
	        calls: [rootCall],
	        children: children,
	        metadata: node.__concreteNode__.__metadata__
	      };
	    }
	  }
	};

	module.exports = RelayQuerySerializer;

/***/ },
/* 148 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule RelayQueryTracker
	 * 
	 * @typechecks
	 */

	'use strict';

	var _classCallCheck = __webpack_require__(2)['default'];

	var _toConsumableArray = __webpack_require__(29)['default'];

	var GraphQLStoreDataHandler = __webpack_require__(8);
	var RelayQuery = __webpack_require__(3);

	var flattenRelayQuery = __webpack_require__(83);
	var invariant = __webpack_require__(1);

	var TYPE = '__type__';

	var RelayQueryTracker = (function () {
	  function RelayQueryTracker() {
	    _classCallCheck(this, RelayQueryTracker);

	    this._trackedNodesByID = {};
	  }

	  RelayQueryTracker.prototype.trackNodeForID = function trackNodeForID(node, dataID, path) {
	    // Non-refetchable nodes are tracked via their nearest-refetchable parent
	    // (except for root call nodes)
	    if (GraphQLStoreDataHandler.isClientID(dataID)) {
	      !path ?  true ? invariant(false, 'RelayQueryTracker.trackNodeForID(): Expected `path` for client ID, ' + '`%s`.', dataID) : invariant(false) : undefined;
	      if (!path.isRootPath()) {
	        return;
	      }
	    }
	    // Don't track `__type__` fields
	    if (node instanceof RelayQuery.Field && node.getSchemaName() === TYPE) {
	      return;
	    }

	    this._trackedNodesByID[dataID] = this._trackedNodesByID[dataID] || {
	      trackedNodes: [],
	      isFlattened: false
	    };
	    this._trackedNodesByID[dataID].trackedNodes.push(node);
	    this._trackedNodesByID[dataID].isFlattened = false;
	  };

	  /**
	   * Get the children that are tracked for the given `dataID`, if any.
	   */

	  RelayQueryTracker.prototype.getTrackedChildrenForID = function getTrackedChildrenForID(dataID) {
	    var trackedNodesByID = this._trackedNodesByID[dataID];
	    if (!trackedNodesByID) {
	      return [];
	    }
	    var isFlattened = trackedNodesByID.isFlattened;
	    var trackedNodes = trackedNodesByID.trackedNodes;

	    if (!isFlattened) {
	      var trackedChildren = [];
	      trackedNodes.forEach(function (trackedQuery) {
	        trackedChildren.push.apply(trackedChildren, _toConsumableArray(trackedQuery.getChildren()));
	      });
	      trackedNodes.length = 0;
	      trackedNodesByID.isFlattened = true;
	      var containerNode = RelayQuery.Node.buildFragment('RelayQueryTracker', 'Node', trackedChildren);
	      if (containerNode) {
	        var flattenedNode = flattenRelayQuery(containerNode);
	        if (flattenedNode) {
	          trackedNodes.push(flattenedNode);
	        }
	      }
	    }
	    var trackedNode = trackedNodes[0];
	    if (trackedNode) {
	      return trackedNode.getChildren();
	    }
	    return [];
	  };

	  /**
	   * Removes all nodes that are tracking the given DataID from the
	   * query-tracker.
	   */

	  RelayQueryTracker.prototype.untrackNodesForID = function untrackNodesForID(dataID) {
	    delete this._trackedNodesByID[dataID];
	  };

	  return RelayQueryTracker;
	})();

	module.exports = RelayQueryTracker;

/***/ },
/* 149 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule RelayQueryWriter
	 * 
	 * @typechecks
	 */

	'use strict';

	var _inherits = __webpack_require__(6)['default'];

	var _classCallCheck = __webpack_require__(2)['default'];

	var RelayQuery = __webpack_require__(3);

	var RelayConnectionInterface = __webpack_require__(9);

	var RelayQueryVisitor = __webpack_require__(21);
	var RelayRecordStatus = __webpack_require__(42);

	var generateClientEdgeID = __webpack_require__(85);
	var generateClientID = __webpack_require__(62);
	var invariant = __webpack_require__(1);
	var warning = __webpack_require__(10);

	var EDGES = RelayConnectionInterface.EDGES;
	var NODE = RelayConnectionInterface.NODE;
	var PAGE_INFO = RelayConnectionInterface.PAGE_INFO;

	var ID = 'id';

	/**
	 * @internal
	 *
	 * Helper for writing the result of one or more queries/operations into the
	 * store, updating tracked queries, and recording changed record IDs.
	 */

	var RelayQueryWriter = (function (_RelayQueryVisitor) {
	  _inherits(RelayQueryWriter, _RelayQueryVisitor);

	  function RelayQueryWriter(store, queryTracker, changeTracker, options) {
	    _classCallCheck(this, RelayQueryWriter);

	    _RelayQueryVisitor.call(this);
	    this._changeTracker = changeTracker;
	    this._forceIndex = options && options.forceIndex ? options.forceIndex : 0;
	    this._store = store;
	    this._queryTracker = queryTracker;
	    this._updateTrackedQueries = !!(options && options.updateTrackedQueries);
	  }

	  RelayQueryWriter.prototype.getRecordStore = function getRecordStore() {
	    return this._store;
	  };

	  /**
	   * Traverses a query and payload in parallel, writing the results into the
	   * store.
	   */

	  RelayQueryWriter.prototype.writePayload = function writePayload(node, recordID, responseData, path) {
	    var _this = this;

	    var state = {
	      nodeID: null,
	      recordID: recordID,
	      responseData: responseData,
	      path: path
	    };

	    if (node instanceof RelayQuery.Field && !node.isScalar()) {
	      // for non-scalar fields, the recordID is the parent
	      node.getChildren().forEach(function (child) {
	        _this.visit(child, state);
	      });
	      return;
	    }

	    this.visit(node, state);
	  };

	  /**
	   * Records are "created" whenever an entry did not previously exist for the
	   * `recordID`, including cases when a `recordID` is created with a null value.
	   */

	  RelayQueryWriter.prototype.recordCreate = function recordCreate(recordID) {
	    this._changeTracker.createID(recordID);
	  };

	  /**
	   * Records are "updated" if any field changes (including being set to null).
	   * Updates are not recorded for newly created records.
	   */

	  RelayQueryWriter.prototype.recordUpdate = function recordUpdate(recordID) {
	    this._changeTracker.updateID(recordID);
	  };

	  /**
	   * Determine if the record was created or updated by this write operation.
	   */

	  RelayQueryWriter.prototype.hasChangeToRecord = function hasChangeToRecord(recordID) {
	    return this._changeTracker.hasChange(recordID);
	  };

	  /**
	   * Determine if the record was created by this write operation.
	   */

	  RelayQueryWriter.prototype.isNewRecord = function isNewRecord(recordID) {
	    return this._changeTracker.isNewRecord(recordID);
	  };

	  /**
	   * Helper to create a record and the corresponding notification.
	   */

	  RelayQueryWriter.prototype.createRecordIfMissing = function createRecordIfMissing(node, recordID, path) {
	    var recordStatus = this._store.getRecordStatus(recordID);
	    if (recordStatus !== RelayRecordStatus.EXISTENT) {
	      this._store.putRecord(recordID, path);
	      this.recordCreate(recordID);
	    }
	    if (this.isNewRecord(recordID) || this._updateTrackedQueries) {
	      this._queryTracker.trackNodeForID(node, recordID, path);
	    }
	  };

	  RelayQueryWriter.prototype.visitRoot = function visitRoot(root, state) {
	    var path = state.path;
	    var recordID = state.recordID;
	    var responseData = state.responseData;

	    var recordStatus = this._store.getRecordStatus(recordID);

	    // GraphQL should never return undefined for a field
	    if (responseData == null) {
	      !(responseData !== undefined) ?  true ? invariant(false, 'RelayQueryWriter: Unexpectedly encountered `undefined` in payload. ' + 'Cannot set root record `%s` to undefined.', recordID) : invariant(false) : undefined;
	      this._store.deleteRecord(recordID);
	      if (recordStatus === RelayRecordStatus.EXISTENT) {
	        this.recordUpdate(recordID);
	      }
	      return;
	    }
	    if (recordStatus !== RelayRecordStatus.EXISTENT) {
	      this._store.putRecord(recordID, path);
	      this.recordCreate(recordID);
	    }
	    if (this.isNewRecord(recordID) || this._updateTrackedQueries) {
	      this._queryTracker.trackNodeForID(root, recordID, path);
	    }
	    this.traverse(root, state);
	  };

	  RelayQueryWriter.prototype.visitField = function visitField(field, state) {
	    var recordID = state.recordID;
	    var responseData = state.responseData;

	    !(this._store.getRecordStatus(recordID) === RelayRecordStatus.EXISTENT) ?  true ? invariant(false, 'RelayQueryWriter: Cannot update a non-existent record, `%s`.', recordID) : invariant(false) : undefined;
	    !(typeof responseData === 'object' && responseData !== null) ?  true ? invariant(false, 'RelayQueryWriter: Cannot update record `%s`, expected response to be ' + 'an object.', recordID) : invariant(false) : undefined;

	    // handle missing data
	    var fieldData = responseData[field.getSerializationKey()];
	    if (fieldData === undefined) {
	      return;
	    }
	    if (fieldData === null) {
	      this._store.deleteField(recordID, field.getStorageKey());
	      this.recordUpdate(recordID);
	      return;
	    }

	    if (field.isScalar()) {
	      this._writeScalar(field, state, recordID, fieldData);
	    } else if (field.isConnection()) {
	      this._writeConnection(field, state, recordID, fieldData);
	    } else if (field.isPlural()) {
	      this._writePluralLink(field, state, recordID, fieldData);
	    } else {
	      this._writeLink(field, state, recordID, fieldData);
	    }
	  };

	  /**
	   * Writes the value for a 'scalar' field such as `id` or `name`. The response
	   * data is expected to be scalar values or arrays of scalar values.
	   */

	  RelayQueryWriter.prototype._writeScalar = function _writeScalar(field, state, recordID, nextValue) {
	    var storageKey = field.getStorageKey();
	    var prevValue = this._store.getField(recordID, storageKey);

	    // always update the store to ensure the value is present in the appropriate
	    // data sink (records/queuedRecords), but only record an update if the value
	    // changed.
	    this._store.putField(recordID, storageKey, nextValue);

	    // TODO: Flow: `nextValue` is an array, array indexing should work
	    if (Array.isArray(prevValue) && Array.isArray(nextValue) && prevValue.length === nextValue.length && prevValue.every(function (prev, ii) {
	      return prev === nextValue[ii];
	    })) {
	      return;
	    } else if (prevValue === nextValue) {
	      return;
	    }
	    this.recordUpdate(recordID);
	  };

	  /**
	   * Writes data for connection fields such as `news_feed` or `friends`. The
	   * response data is expected to be array of edge objects.
	   */

	  RelayQueryWriter.prototype._writeConnection = function _writeConnection(field, state, recordID, connectionData) {
	    // Each unique combination of filter calls is stored in its own
	    // generated record (ex: `field.orderby(x)` results are separate from
	    // `field.orderby(y)` results).
	    var storageKey = field.getStorageKey();
	    var connectionID = this._store.getLinkedRecordID(recordID, storageKey);
	    if (!connectionID) {
	      connectionID = generateClientID();
	    }
	    var connectionRecordStatus = this._store.getRecordStatus(connectionID);
	    var hasEdges = !!(field.getFieldByStorageKey(EDGES) || connectionData != null && typeof connectionData === 'object' && connectionData[EDGES]);
	    var path = state.path.getPath(field, connectionID);
	    // always update the store to ensure the value is present in the appropriate
	    // data sink (records/queuedRecords), but only record an update if the value
	    // changed.
	    this._store.putRecord(connectionID, path);
	    this._store.putLinkedRecordID(recordID, storageKey, connectionID);
	    // record the create/update only if something changed
	    if (connectionRecordStatus !== RelayRecordStatus.EXISTENT) {
	      this.recordUpdate(recordID);
	      this.recordCreate(connectionID);
	    }
	    if (this.isNewRecord(connectionID) || this._updateTrackedQueries) {
	      this._queryTracker.trackNodeForID(field, connectionID, path);
	    }

	    // Only create a range if `edges` field is present
	    // Overwrite an existing range only if the new force index is greater
	    if (hasEdges && (!this._store.hasRange(connectionID) || this._forceIndex && this._forceIndex > this._store.getRangeForceIndex(connectionID))) {
	      this._store.putRange(connectionID, field.getCallsWithValues(), this._forceIndex);
	      this.recordUpdate(connectionID);
	    }

	    var connectionState = {
	      path: path,
	      nodeID: null,
	      recordID: connectionID,
	      responseData: connectionData
	    };
	    this._traverseConnection(field, field, connectionState);
	  };

	  /**
	   * Recurse through connection subfields and write their results. This is
	   * necessary because handling an `edges` field also requires information about
	   * the parent connection field (see `_writeEdges`).
	   */

	  RelayQueryWriter.prototype._traverseConnection = function _traverseConnection(connection, // the parent connection
	  node, // the parent connection or an intermediary fragment
	  state) {
	    var _this2 = this;

	    node.getChildren().forEach(function (child) {
	      if (child instanceof RelayQuery.Field) {
	        if (child.getSchemaName() === EDGES) {
	          _this2._writeEdges(connection, child, state);
	        } else if (child.getSchemaName() !== PAGE_INFO) {
	          // Page info is handled by the range
	          // Otherwise, write metadata fields normally (ex: `count`)
	          _this2.visit(child, state);
	        }
	      } else {
	        // Fragment case, recurse keeping track of parent connection
	        _this2._traverseConnection(connection, child, state);
	      }
	    });
	  };

	  /**
	   * Update a connection with newly fetched edges.
	   */

	  RelayQueryWriter.prototype._writeEdges = function _writeEdges(connection, edges, state) {
	    var _this3 = this;

	    var connectionID = state.recordID;
	    var connectionData = state.responseData;

	    var storageKey = connection.getStorageKey();
	    !(typeof connectionData === 'object' && connectionData !== null) ?  true ? invariant(false, 'RelayQueryWriter: Cannot write edges for malformed connection `%s` on ' + 'record `%s`, expected the response to be an object.', storageKey, connectionID) : invariant(false) : undefined;
	    var edgesData = connectionData[EDGES];

	    // Validate response data.
	    if (edgesData == null) {
	       true ? warning(false, 'RelayQueryWriter: Cannot write edges for connection `%s` on record ' + '`%s`, expected a response for field `edges`.', storageKey, connectionID) : undefined;
	      return;
	    }
	    !Array.isArray(edgesData) ?  true ? invariant(false, 'RelayQueryWriter: Cannot write edges for connection `%s` on record ' + '`%s`, expected `edges` to be an array.', storageKey, connectionID) : invariant(false) : undefined;

	    var rangeCalls = connection.getCallsWithValues();
	    !RelayConnectionInterface.hasRangeCalls(rangeCalls) ?  true ? invariant(false, 'RelayQueryWriter: Cannot write edges for connection `%s` on record ' + '`%s` without `first`, `last`, or `find` argument.', storageKey, connectionID) : invariant(false) : undefined;
	    var rangeInfo = this._store.getRangeMetadata(connectionID, rangeCalls);
	    !rangeInfo ?  true ? invariant(false, 'RelayQueryWriter: Expected a range to exist for connection field `%s` ' + 'on record `%s`.', storageKey, connectionID) : invariant(false) : undefined;
	    var fetchedEdgeIDs = [];
	    var isUpdate = false;
	    var nextIndex = 0;
	    var requestedEdges = rangeInfo.requestedEdges;
	    // Traverse connection edges, reusing existing edges if they exist
	    edgesData.forEach(function (edgeData) {
	      // validate response data
	      if (edgeData == null) {
	        return;
	      }
	      !(typeof edgeData === 'object' && edgeData) ?  true ? invariant(false, 'RelayQueryWriter: Cannot write edge for connection field `%s` on ' + 'record `%s`, expected an object.', storageKey, connectionID) : invariant(false) : undefined;

	      var nodeData = edgeData[NODE];
	      if (nodeData == null) {
	        return;
	      }

	      !(typeof nodeData === 'object') ?  true ? invariant(false, 'RelayQueryWriter: Expected node to be an object for field `%s` on ' + 'record `%s`.', storageKey, connectionID) : invariant(false) : undefined;

	      // For consistency, edge IDs are calculated from the connection & node ID.
	      // A node ID is only generated if the node does not have an id and
	      // there is no existing edge.
	      var prevEdge = requestedEdges[nextIndex++];
	      var nodeID = nodeData && nodeData[ID] || prevEdge && _this3._store.getLinkedRecordID(prevEdge.edgeID, NODE) || generateClientID();
	      // TODO: Flow: `nodeID` is `string`
	      var edgeID = generateClientEdgeID(connectionID, nodeID);
	      var path = state.path.getPath(edges, edgeID);
	      _this3.createRecordIfMissing(edges, edgeID, path);
	      fetchedEdgeIDs.push(edgeID);

	      // Write data for the edge, using `nodeID` as the id for direct descendant
	      // `node` fields. This is necessary for `node`s that do not have an `id`,
	      // which would cause the generated ID here to not match the ID generated
	      // in `_writeLink`.
	      _this3.traverse(edges, {
	        path: path,
	        nodeID: nodeID,
	        recordID: edgeID,
	        responseData: edgeData
	      });
	      isUpdate = isUpdate || _this3.hasChangeToRecord(edgeID);
	    });

	    var pageInfo = connectionData[PAGE_INFO] || RelayConnectionInterface.getDefaultPageInfo();
	    this._store.putRangeEdges(connectionID, rangeCalls, pageInfo, fetchedEdgeIDs);

	    // Only broadcast an update to the range if an edge was added/changed.
	    // Node-level changes will broadcast at the node ID.
	    if (isUpdate) {
	      this.recordUpdate(connectionID);
	    }
	  };

	  /**
	   * Writes a plural linked field such as `actors`. The response data is
	   * expected to be an array of item objects. These fields are similar to
	   * connections, but do not support range calls such as `first` or `after`.
	   */

	  RelayQueryWriter.prototype._writePluralLink = function _writePluralLink(field, state, recordID, fieldData) {
	    var _this4 = this;

	    var storageKey = field.getStorageKey();
	    !Array.isArray(fieldData) ?  true ? invariant(false, 'RelayQueryWriter: Expected array data for field `%s` on record `%s`.', storageKey, recordID) : invariant(false) : undefined;

	    var prevLinkedIDs = this._store.getLinkedRecordIDs(recordID, storageKey);
	    var nextLinkedIDs = [];
	    var isUpdate = !prevLinkedIDs;
	    var nextIndex = 0;
	    fieldData.forEach(function (nextRecord) {
	      // validate response data
	      if (nextRecord == null) {
	        return;
	      }
	      !(typeof nextRecord === 'object' && nextRecord) ?  true ? invariant(false, 'RelayQueryWriter: Expected elements for plural field `%s` to be ' + 'objects.', storageKey) : invariant(false) : undefined;

	      // Reuse existing generated IDs if the node does not have its own `id`.
	      // TODO: Flow: `nextRecord` is asserted as typeof === 'object'
	      var prevLinkedID = prevLinkedIDs && prevLinkedIDs[nextIndex];
	      var nextLinkedID = nextRecord[ID] || prevLinkedID || generateClientID();
	      nextLinkedIDs.push(nextLinkedID);

	      var path = state.path.getPath(field, nextLinkedID);
	      _this4.createRecordIfMissing(field, nextLinkedID, path);
	      isUpdate = isUpdate || nextLinkedID !== prevLinkedID || _this4.isNewRecord(nextLinkedID);

	      _this4.traverse(field, {
	        path: path,
	        nodeID: null, // never propagate `nodeID` past the first linked field
	        recordID: nextLinkedID,
	        responseData: nextRecord
	      });
	      isUpdate = isUpdate || _this4.hasChangeToRecord(nextLinkedID);
	      nextIndex++;
	    });

	    this._store.putLinkedRecordIDs(recordID, storageKey, nextLinkedIDs);

	    // Only broadcast a list-level change if a record was changed/added
	    if (isUpdate) {
	      this.recordUpdate(recordID);
	    }
	  };

	  /**
	   * Writes a link from one record to another, for example linking the `viewer`
	   * record to the `actor` record in the query `viewer { actor }`. The `field`
	   * variable is the field being linked (`actor` in the example).
	   */

	  RelayQueryWriter.prototype._writeLink = function _writeLink(field, state, recordID, fieldData) {
	    var nodeID = state.nodeID;

	    var storageKey = field.getStorageKey();
	    !(typeof fieldData === 'object') ?  true ? invariant(false, 'RelayQueryWriter: Expected data for non-scalar field `%s` on record ' + '`%s` to be an object.', storageKey, recordID) : invariant(false) : undefined;

	    // Prefer the actual `id` if present, otherwise generate one (if an id
	    // was already generated it is reused). `node`s within a connection are
	    // a special case as the ID used here must match the one generated prior to
	    // storing the parent `edge`.
	    // TODO: Flow: `fieldData` is asserted as typeof === 'object'
	    var prevLinkedID = this._store.getLinkedRecordID(recordID, storageKey);
	    var nextLinkedID = field.getSchemaName() === NODE && nodeID || fieldData[ID] || prevLinkedID || generateClientID();

	    var path = state.path.getPath(field, nextLinkedID);
	    this.createRecordIfMissing(field, nextLinkedID, path);
	    // always update the store to ensure the value is present in the appropriate
	    // data sink (record/queuedRecords), but only record an update if the value
	    // changed.
	    this._store.putLinkedRecordID(recordID, storageKey, nextLinkedID);
	    if (prevLinkedID !== nextLinkedID || this.isNewRecord(nextLinkedID)) {
	      this.recordUpdate(recordID);
	    }

	    this.traverse(field, {
	      path: path,
	      nodeID: null,
	      recordID: nextLinkedID,
	      responseData: fieldData
	    });
	  };

	  return RelayQueryWriter;
	})(RelayQueryVisitor);

	module.exports = RelayQueryWriter;

/***/ },
/* 150 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule RelayRecordStore
	 * 
	 * @typechecks
	 */

	'use strict';

	var _classCallCheck = __webpack_require__(2)['default'];

	var _Object$keys = __webpack_require__(5)['default'];

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var GraphQLMutatorConstants = __webpack_require__(54);
	var GraphQLRange = __webpack_require__(129);
	var GraphQLStoreDataHandler = __webpack_require__(8);
	var GraphQLStoreRangeUtils = __webpack_require__(39);
	var RelayConnectionInterface = __webpack_require__(9);

	var RelayNodeInterface = __webpack_require__(15);

	var forEachObject = __webpack_require__(7);
	var invariant = __webpack_require__(1);
	var warning = __webpack_require__(10);

	var CURSOR = RelayConnectionInterface.CURSOR;
	var NODE = RelayConnectionInterface.NODE;

	var EMPTY = '';
	var FILTER_CALLS = '__filterCalls__';
	var FORCE_INDEX = '__forceIndex__';
	var RANGE = '__range__';
	var PATH = '__path__';
	var APPEND = GraphQLMutatorConstants.APPEND;
	var PREPEND = GraphQLMutatorConstants.PREPEND;
	var REMOVE = GraphQLMutatorConstants.REMOVE;

	// maps root call args to IDs. ex `username(joe)` -> 123`

	/**
	 * @internal
	 *
	 * `RelayRecordStore` is the central repository for all data fetched by the
	 * client. Data is stored as a map of IDs to Records. Records are maps of
	 * field names to values.
	 *
	 * TODO: #6584253 Mediate access to node/cached/queued data via RelayRecordStore
	 */

	var RelayRecordStore = (function () {
	  function RelayRecordStore(records, rootCallMaps, nodeConnectionMap, cacheManager, clientMutationID) {
	    _classCallCheck(this, RelayRecordStore);

	    this._cacheManager = cacheManager;
	    this._cachedRecords = records.cachedRecords;
	    this._cachedRootCallMap = rootCallMaps && rootCallMaps.cachedRootCallMap || {};
	    this._clientMutationID = clientMutationID;
	    this._queuedRecords = records.queuedRecords;
	    this._nodeConnectionMap = nodeConnectionMap || {};
	    this._records = records.records;
	    this._rootCallMap = rootCallMaps && rootCallMaps.rootCallMap || {};
	    this._storage = [];
	    if (this._queuedRecords) {
	      this._storage.push(this._queuedRecords);
	    }
	    if (this._records) {
	      this._storage.push(this._records);
	    }
	    if (this._cachedRecords) {
	      this._storage.push(this._cachedRecords);
	    }
	  }

	  /**
	   * Filter calls to only those that specify conditions on the returned results
	   * (ex: `orderby(TOP_STORIES)`), removing generic calls (ex: `first`, `find`).
	   */

	  /**
	   * Get the data ID associated with this root call/value pair.
	   */

	  RelayRecordStore.prototype.getRootCallID = function getRootCallID(rootCall, rootCallArg) {
	    if (RelayNodeInterface.isNodeRootCall(rootCall)) {
	      !(rootCallArg != null) ?  true ? invariant(false, 'RelayRecordStore.getRootCallID(): Argument to `%s()` cannot be null ' + 'or undefined.', rootCall) : invariant(false) : undefined;
	      return rootCallArg;
	    }
	    if (rootCallArg == null) {
	      rootCallArg = EMPTY;
	    }
	    if (this._rootCallMap.hasOwnProperty(rootCall) && this._rootCallMap[rootCall].hasOwnProperty(rootCallArg)) {
	      return this._rootCallMap[rootCall][rootCallArg];
	    } else if (this._cachedRootCallMap.hasOwnProperty(rootCall)) {
	      return this._cachedRootCallMap[rootCall][rootCallArg];
	    }
	  };

	  /**
	   * Associate a data ID with the given root call/value pair.
	   */

	  RelayRecordStore.prototype.putRootCallID = function putRootCallID(rootCall, rootCallArg, dataID) {
	    if (RelayNodeInterface.isNodeRootCall(rootCall)) {
	      !(rootCallArg != null) ?  true ? invariant(false, 'RelayRecordStore.putRootCallID(): Argument to `%s()` cannot be null ' + 'or undefined.', rootCall) : invariant(false) : undefined;
	      return;
	    }
	    if (rootCallArg == null) {
	      rootCallArg = EMPTY;
	    }
	    this._rootCallMap[rootCall] = this._rootCallMap[rootCall] || {};
	    this._rootCallMap[rootCall][rootCallArg] = dataID;
	    if (this._cacheManager) {
	      this._cacheManager.cacheRootCall(rootCall, rootCallArg, dataID);
	    }
	  };

	  /**
	   * Returns the status of the record stored at `dataID`.
	   */

	  RelayRecordStore.prototype.getRecordStatus = function getRecordStatus(dataID) {
	    var record = this._getRecord(dataID);
	    if (record === null) {
	      return 'NONEXISTENT';
	    } else if (record === undefined) {
	      return 'UNKNOWN';
	    }
	    return 'EXISTENT';
	  };

	  /**
	   * Create an empty record at `dataID` if a record does not already exist.
	   */

	  RelayRecordStore.prototype.putRecord = function putRecord(dataID, path) {
	    var target = this._queuedRecords || this._records;
	    var prevRecord = target[dataID];
	    if (prevRecord) {
	      if (target === this._queuedRecords) {
	        this._setClientMutationID(prevRecord);
	      }
	      return;
	    }
	    var nextRecord = {
	      __dataID__: dataID
	    };
	    if (target === this._queuedRecords) {
	      this._setClientMutationID(nextRecord);
	    }
	    if (GraphQLStoreDataHandler.isClientID(dataID)) {
	      !path ?  true ? invariant(false, 'RelayRecordStore.putRecord(): Expected a path for non-refetchable ' + 'record `%s`.', dataID) : invariant(false) : undefined;
	      nextRecord[PATH] = path;
	    }
	    target[dataID] = nextRecord;
	    var cacheManager = this._cacheManager;
	    if (!this._queuedRecords && cacheManager) {
	      cacheManager.cacheField(dataID, '__dataID__', dataID);
	      var cachedPath = nextRecord[PATH];
	      if (cachedPath) {
	        cacheManager.cacheField(dataID, '__path__', cachedPath);
	      }
	    }
	  };

	  /**
	   * Returns the path to a non-refetchable record.
	   */

	  RelayRecordStore.prototype.getPathToRecord = function getPathToRecord(dataID) {
	    var path = this._getField(dataID, PATH);
	    return path;
	  };

	  /**
	   * Returns whether a given record is affected by an optimistic update.
	   */

	  RelayRecordStore.prototype.hasOptimisticUpdate = function hasOptimisticUpdate(dataID) {
	    dataID = GraphQLStoreRangeUtils.getCanonicalClientID(dataID);
	    !this._queuedRecords ?  true ? invariant(false, 'RelayRecordStore.hasOptimisticUpdate(): Optimistic updates require ' + 'queued records.') : invariant(false) : undefined;
	    return this._queuedRecords.hasOwnProperty(dataID);
	  };

	  /**
	   * Returns a list of client mutation IDs for queued mutations whose optimistic
	   * updates are affecting the record corresponding the given dataID. Returns
	   * null if the record isn't affected by any optimistic updates.
	   */

	  RelayRecordStore.prototype.getClientMutationIDs = function getClientMutationIDs(dataID) {
	    dataID = GraphQLStoreRangeUtils.getCanonicalClientID(dataID);
	    !this._queuedRecords ?  true ? invariant(false, 'RelayRecordStore.getClientMutationIDs(): Optimistic updates require ' + 'queued records.') : invariant(false) : undefined;
	    var record = this._queuedRecords[dataID];
	    return record ? record.__mutationIDs__ : null;
	  };

	  /**
	   * Returns whether an error occurred during a mutation affecting the
	   * given (queued) record.
	   */

	  RelayRecordStore.prototype.hasMutationError = function hasMutationError(dataID) {
	    if (this._queuedRecords) {
	      var record = this._queuedRecords[dataID];
	      return !!(record && record.__hasError__);
	    }
	    return false;
	  };

	  /**
	   * Sets the mutation status of a queued record to the given value.
	   */

	  RelayRecordStore.prototype.setMutationErrorStatus = function setMutationErrorStatus(dataID, hasError) {
	    !this._queuedRecords ?  true ? invariant(false, 'RelayRecordStore.setMutationErrorStatus(): Can only set the ' + 'mutation status of queued records.') : invariant(false) : undefined;
	    var record = this._queuedRecords[dataID];
	    !record ?  true ? invariant(false, 'RelayRecordStore.setMutationErrorStatus(): Expected record `%s` to ' + 'exist before settings its mutation error status.', dataID) : invariant(false) : undefined;
	    record.__hasError__ = hasError;
	  };

	  /**
	   * Delete the record at `dataID`, setting its value to `null`.
	   */

	  RelayRecordStore.prototype.deleteRecord = function deleteRecord(dataID) {
	    var target = this._queuedRecords || this._records;
	    target[dataID] = null;

	    // Remove any links for this record
	    if (!this._queuedRecords) {
	      delete this._nodeConnectionMap[dataID];
	      if (this._cacheManager) {
	        this._cacheManager.cacheNode(dataID, null);
	      }
	    }
	  };

	  /**
	   * Returns the value of the field for the given dataID.
	   */

	  RelayRecordStore.prototype.getField = function getField(dataID, storageKey) {
	    return this._getField(dataID, storageKey);
	  };

	  /**
	   * Sets the value of a scalar field.
	   */

	  RelayRecordStore.prototype.putField = function putField(dataID, storageKey, value) {
	    var record = this._getRecordForWrite(dataID);
	    !record ?  true ? invariant(false, 'RelayRecordStore.putField(): Expected record `%s` to exist before ' + 'writing field `%s`.', dataID, storageKey) : invariant(false) : undefined;
	    record[storageKey] = value;
	    if (!this._queuedRecords && this._cacheManager) {
	      this._cacheManager.cacheField(dataID, storageKey, value);
	    }
	  };

	  /**
	   * Clears the value of a field by setting it to null/undefined.
	   */

	  RelayRecordStore.prototype.deleteField = function deleteField(dataID, storageKey) {
	    var record = this._getRecordForWrite(dataID);
	    !record ?  true ? invariant(false, 'RelayRecordStore.deleteField(): Expected record `%s` to exist before ' + 'deleting field `%s`.', dataID, storageKey) : invariant(false) : undefined;
	    record[storageKey] = null;
	    if (!this._queuedRecords && this._cacheManager) {
	      this._cacheManager.cacheField(dataID, storageKey, null);
	    }
	  };

	  /**
	   * Returns the Data ID of a linked record (eg the ID of the `address` record
	   * in `actor{address}`).
	   */

	  RelayRecordStore.prototype.getLinkedRecordID = function getLinkedRecordID(dataID, storageKey) {
	    var field = this._getField(dataID, storageKey);
	    if (field == null) {
	      return field;
	    }
	    !(typeof field === 'object' && field !== null && !Array.isArray(field)) ?  true ? invariant(false, 'RelayRecordStore.getLinkedRecordID(): Expected field `%s` for record ' + '`%s` to have a linked record.', storageKey, dataID) : invariant(false) : undefined;
	    return field.__dataID__;
	  };

	  /**
	   * Creates/updates a link between two records via the given field.
	   */

	  RelayRecordStore.prototype.putLinkedRecordID = function putLinkedRecordID(parentID, storageKey, recordID) {
	    var parent = this._getRecordForWrite(parentID);
	    !parent ?  true ? invariant(false, 'RelayRecordStore.putLinkedRecordID(): Expected record `%s` to exist ' + 'before linking to record `%s`.', parentID, recordID) : invariant(false) : undefined;
	    var record = this._getRecord(recordID);
	    !record ?  true ? invariant(false, 'RelayRecordStore.putLinkedRecordID(): Expected record `%s` to exist ' + 'before linking from record `%s`.', recordID, parentID) : invariant(false) : undefined;
	    var fieldValue = {
	      __dataID__: recordID
	    };
	    parent[storageKey] = fieldValue;
	    if (!this._queuedRecords && this._cacheManager) {
	      this._cacheManager.cacheField(parentID, storageKey, fieldValue);
	    }
	  };

	  /**
	   * Returns an array of Data ID for a plural linked field (eg the actor IDs of
	   * the `likers` in `story{likers}`).
	   */

	  RelayRecordStore.prototype.getLinkedRecordIDs = function getLinkedRecordIDs(dataID, storageKey) {
	    var field = this._getField(dataID, storageKey);
	    if (field == null) {
	      return field;
	    }
	    !Array.isArray(field) ?  true ? invariant(false, 'RelayRecordStore.getLinkedRecordIDs(): Expected field `%s` for ' + 'record `%s` to have an array of linked records.', storageKey, dataID) : invariant(false) : undefined;
	    return field.map(function (item, ii) {
	      !(typeof item === 'object' && item.__dataID__) ?  true ? invariant(false, 'RelayRecordStore.getLinkedRecordIDs(): Expected element at index %s ' + 'in field `%s` for record `%s` to be a linked record.', ii, storageKey, dataID) : invariant(false) : undefined;
	      return item.__dataID__;
	    });
	  };

	  /**
	   * Creates/updates a one-to-many link between records via the given field.
	   */

	  RelayRecordStore.prototype.putLinkedRecordIDs = function putLinkedRecordIDs(parentID, storageKey, recordIDs) {
	    var _this = this;

	    var parent = this._getRecordForWrite(parentID);
	    !parent ?  true ? invariant(false, 'RelayRecordStore.putLinkedRecordIDs(): Expected record `%s` to exist ' + 'before linking records.', parentID) : invariant(false) : undefined;
	    var records = recordIDs.map(function (recordID) {
	      var record = _this._getRecord(recordID);
	      !record ?  true ? invariant(false, 'RelayRecordStore.putLinkedRecordIDs(): Expected record `%s` to ' + 'exist before linking from `%s`.', recordID, parentID) : invariant(false) : undefined;
	      return {
	        __dataID__: recordID
	      };
	    });
	    parent[storageKey] = records;
	    if (!this._queuedRecords && this._cacheManager) {
	      this._cacheManager.cacheField(parentID, storageKey, records);
	    }
	  };

	  /**
	   * Gets the connectionIDs for all the connections that contain the given
	   * record as a `node`, or null if the record does not appear as a `node` in
	   * any connection.
	   */

	  RelayRecordStore.prototype.getConnectionIDsForRecord = function getConnectionIDsForRecord(dataID) {
	    var connectionIDs = this._nodeConnectionMap[dataID];
	    if (connectionIDs) {
	      return _Object$keys(connectionIDs);
	    }
	    return null;
	  };

	  /**
	   * Gets the connectionIDs for all variations of calls for the given base
	   * schema name (Ex: `posts.orderby(recent)` and `posts.orderby(likes)`).
	   */

	  RelayRecordStore.prototype.getConnectionIDsForField = function getConnectionIDsForField(dataID, schemaName) {
	    // ignore queued records because not all range fields may be present there
	    var record = this._records[dataID];
	    if (record == null) {
	      return record;
	    }
	    var connectionIDs;
	    forEachObject(record, function (datum, key) {
	      if (datum && getFieldNameFromKey(key) === schemaName) {
	        var dataID = datum.__dataID__;
	        if (dataID) {
	          connectionIDs = connectionIDs || [];
	          connectionIDs.push(dataID);
	        }
	      }
	    });
	    return connectionIDs;
	  };

	  /**
	   * Get the force index associated with the range at `connectionID`.
	   */

	  RelayRecordStore.prototype.getRangeForceIndex = function getRangeForceIndex(connectionID) {
	    var forceIndex = this._getField(connectionID, FORCE_INDEX);
	    if (forceIndex === null) {
	      return -1;
	    }
	    // __forceIndex__ can only be a number
	    return forceIndex || 0;
	  };

	  /**
	   * Get the condition calls that were used to fetch the given connection.
	   * Ex: for a field `photos.orderby(recent)`, this would be
	   * [{name: 'orderby', value: 'recent'}]
	   */

	  RelayRecordStore.prototype.getRangeFilterCalls = function getRangeFilterCalls(connectionID) {
	    return this._getField(connectionID, FILTER_CALLS);
	  };

	  /**
	   * Returns range information for the given connection field:
	   * - `requestedEdges`: any edges already fetched for the given `calls`.
	   * - `diffCalls`: an array of calls describing the difference
	   *   between the given `calls` and already fetched data. Includes conditional
	   *   calls (`orderby`) and range/offset calls (`first`, `after`).
	   * - `filterCalls`: the subset of `calls` that are condition calls
	   *   (`orderby`).
	   */

	  RelayRecordStore.prototype.getRangeMetadata = function getRangeMetadata(connectionID, calls) {
	    var _this2 = this;

	    if (connectionID == null) {
	      return connectionID;
	    }
	    var range = this._getField(connectionID, RANGE);
	    if (range == null) {
	      if (range === null) {
	         true ? warning(false, 'RelayRecordStore.getRangeMetadata(): Expected range to exist if ' + '`edges` has been fetched.') : undefined;
	      }
	      return undefined;
	    }
	    var filterCalls = getFilterCalls(calls);
	    // Edges can only be fetched if a range call (first/last/find) is given.
	    // Otherwise return diffCalls/filterCalls with empty edges.
	    if (calls.length === filterCalls.length) {
	      return {
	        diffCalls: calls,
	        filterCalls: filterCalls,
	        pageInfo: undefined,
	        requestedEdges: []
	      };
	    }
	    // Convert ordered `{name,value}` objects to `GraphQL.Call`s
	    // TODO: make GraphQLRange accept output of `getCallsWithValues()`
	    var queuedRecord = this._queuedRecords ? this._queuedRecords[connectionID] : null;

	    var _range$retrieveRangeInfoForQuery = range.retrieveRangeInfoForQuery(calls, queuedRecord);

	    var diffCalls = _range$retrieveRangeInfoForQuery.diffCalls;
	    var pageInfo = _range$retrieveRangeInfoForQuery.pageInfo;
	    var requestedEdgeIDs = _range$retrieveRangeInfoForQuery.requestedEdgeIDs;

	    if (diffCalls && diffCalls.length) {
	      diffCalls = filterCalls.concat(diffCalls);
	    } else {
	      diffCalls = [];
	    }
	    var requestedEdges;
	    if (requestedEdgeIDs) {
	      requestedEdges = requestedEdgeIDs.map(function (edgeID) {
	        return {
	          edgeID: edgeID,
	          nodeID: _this2.getLinkedRecordID(edgeID, NODE)
	        };
	      }).filter(function (edge) {
	        return _this2._getRecord(edge.nodeID);
	      });
	    } else {
	      requestedEdges = [];
	    }
	    return {
	      diffCalls: diffCalls,
	      filterCalls: filterCalls,
	      pageInfo: pageInfo,
	      requestedEdges: requestedEdges
	    };
	  };

	  /**
	   * Creates a range at `dataID` with an optional `forceIndex`.
	   */

	  RelayRecordStore.prototype.putRange = function putRange(connectionID, calls, forceIndex) {
	    !!this._queuedRecords ?  true ? invariant(false, 'RelayRecordStore.putRange(): Cannot create a queued range.') : invariant(false) : undefined;
	    var record = this._getRecord(connectionID);
	    !record ?  true ? invariant(false, 'RelayRecordStore.putRange(): Expected record `%s` to exist before ' + 'adding a range.', connectionID) : invariant(false) : undefined;
	    var range = new GraphQLRange();
	    var filterCalls = getFilterCalls(calls);
	    forceIndex = forceIndex || 0;
	    record.__filterCalls__ = filterCalls;
	    record.__forceIndex__ = forceIndex;
	    record.__range__ = range;

	    var cacheManager = this._cacheManager;
	    if (!this._queuedRecords && cacheManager) {
	      cacheManager.cacheField(connectionID, FILTER_CALLS, filterCalls);
	      cacheManager.cacheField(connectionID, FORCE_INDEX, forceIndex);
	      cacheManager.cacheField(connectionID, RANGE, range);
	    }
	  };

	  /**
	   * Returns whether there is a range at `connectionID`.
	   */

	  RelayRecordStore.prototype.hasRange = function hasRange(connectionID) {
	    return !!this._getField(connectionID, RANGE);
	  };

	  /**
	   * Adds newly fetched edges to a range.
	   */

	  RelayRecordStore.prototype.putRangeEdges = function putRangeEdges(connectionID, calls, pageInfo, edges) {
	    var _this3 = this;

	    var range = this._getField(connectionID, RANGE);
	    !range ?  true ? invariant(false, 'RelayRecordStore.putRangeEdges(): Expected record `%s` to exist and ' + 'have a range.', connectionID) : invariant(false) : undefined;
	    var edgesData = [];
	    edges.forEach(function (edgeID) {
	      var edgeData = _this3._getRangeEdgeData(edgeID);
	      edgesData.push(edgeData);
	      _this3._addConnectionForNode(connectionID, edgeData.node.__dataID__);
	    });
	    range.addItems(calls, edgesData, pageInfo);
	    if (!this._queuedRecords && this._cacheManager) {
	      this._cacheManager.cacheField(connectionID, RANGE, range);
	    }
	  };

	  /**
	   * Prepend, append, or delete edges to/from a range.
	   */

	  RelayRecordStore.prototype.applyRangeUpdate = function applyRangeUpdate(connectionID, edgeID, operation) {
	    if (this._queuedRecords) {
	      this._applyOptimisticRangeUpdate(connectionID, edgeID, operation);
	    } else {
	      this._applyServerRangeUpdate(connectionID, edgeID, operation);
	    }
	  };

	  /**
	   * Completely removes the record identified by `dataID` from the store
	   */

	  RelayRecordStore.prototype.removeRecord = function removeRecord(dataID) {
	    delete this._records[dataID];
	    if (this._queuedRecords) {
	      delete this._queuedRecords[dataID];
	    }
	    if (this._cachedRecords) {
	      delete this._cachedRecords[dataID];
	    }
	  };

	  /**
	   * Get edge data in a format compatibile with `GraphQLRange`.
	   * TODO: change `GraphQLRange` to accept `(edgeID, cursor, nodeID)` tuple
	   */

	  RelayRecordStore.prototype._getRangeEdgeData = function _getRangeEdgeData(edgeID) {
	    var nodeID = this.getLinkedRecordID(edgeID, NODE);
	    !nodeID ?  true ? invariant(false, 'RelayRecordStore: Expected edge `%s` to have a `node` record.', edgeID) : invariant(false) : undefined;
	    return {
	      __dataID__: edgeID,
	      cursor: this.getField(edgeID, CURSOR),
	      node: {
	        __dataID__: nodeID
	      }
	    };
	  };

	  RelayRecordStore.prototype._applyOptimisticRangeUpdate = function _applyOptimisticRangeUpdate(connectionID, edgeID, operation) {
	    !this._queuedRecords ?  true ? invariant(false, 'RelayRecordStore: Expected queued records to exist for optimistic ' + '`%s` update to record `%s`.', operation, connectionID) : invariant(false) : undefined;
	    var record = this._queuedRecords[connectionID];
	    if (!record) {
	      /* $FlowIssue #5995526 - Ideally we want to do something like
	       * record = ({ ... }: Record)
	       * however a bug in Flow is preventing that from working.
	       */
	      record = { __dataID__: connectionID };
	      this._queuedRecords[connectionID] = record;
	    }
	    this._setClientMutationID(record);
	    var queue = record[operation];
	    if (!queue) {
	      queue = [];
	      record[operation] = queue;
	    }
	    if (operation === PREPEND) {
	      queue.unshift(edgeID);
	    } else {
	      queue.push(edgeID);
	    }
	  };

	  RelayRecordStore.prototype._applyServerRangeUpdate = function _applyServerRangeUpdate(connectionID, edgeID, operation) {
	    !this._records ?  true ? invariant(false, 'RelayRecordStore: Expected base records to exist for `%s` update to ' + 'record `%s`.', operation, connectionID) : invariant(false) : undefined;
	    var range = this._getField(connectionID, RANGE);
	    !range ?  true ? invariant(false, 'RelayRecordStore: Cannot apply `%s` update to non-existent record `%s`.', operation, connectionID) : invariant(false) : undefined;
	    if (operation === REMOVE) {
	      range.removeEdgeWithID(edgeID);
	      var nodeID = this.getLinkedRecordID(edgeID, 'node');
	      if (nodeID) {
	        this._removeConnectionForNode(connectionID, nodeID);
	      }
	    } else {
	      var edgeData = this._getRangeEdgeData(edgeID);
	      this._addConnectionForNode(connectionID, edgeData.node.__dataID__);
	      if (operation === APPEND) {
	        range.appendEdge(this._getRangeEdgeData(edgeID));
	      } else {
	        // prepend
	        range.prependEdge(this._getRangeEdgeData(edgeID));
	      }
	    }
	    if (this._cacheManager) {
	      this._cacheManager.cacheField(connectionID, RANGE, range);
	    }
	  };

	  /**
	   * Record that the node is contained in the connection.
	   */

	  RelayRecordStore.prototype._addConnectionForNode = function _addConnectionForNode(connectionID, nodeID) {
	    var connectionMap = this._nodeConnectionMap[nodeID];
	    if (!connectionMap) {
	      connectionMap = {};
	      this._nodeConnectionMap[nodeID] = connectionMap;
	    }
	    connectionMap[connectionID] = true;
	  };

	  /**
	   * Record that the given node is no longer part of the connection.
	   */

	  RelayRecordStore.prototype._removeConnectionForNode = function _removeConnectionForNode(connectionID, nodeID) {
	    var connectionMap = this._nodeConnectionMap[nodeID];
	    if (connectionMap) {
	      delete connectionMap[connectionID];
	      if (_Object$keys(connectionMap).length === 0) {
	        delete this._nodeConnectionMap[nodeID];
	      }
	    }
	  };

	  /**
	   * Gets the first version of the record from the available caches.
	   */

	  RelayRecordStore.prototype._getRecord = function _getRecord(dataID) {
	    if (this._queuedRecords && this._queuedRecords.hasOwnProperty(dataID)) {
	      return this._queuedRecords[dataID];
	    } else if (this._records.hasOwnProperty(dataID)) {
	      return this._records[dataID];
	    } else if (this._cachedRecords) {
	      return this._cachedRecords[dataID];
	    }
	  };

	  /**
	   * If the record is in the store, gets or creates a version of the record
	   * in the store being used for writes.
	   */

	  RelayRecordStore.prototype._getRecordForWrite = function _getRecordForWrite(dataID) {
	    // Cannot write to non-existent records, so ensure the record exists first.
	    // Returning null/undefined allows for local invariant checks at call sites
	    // with specific error messaging.
	    var record = this._getRecord(dataID);
	    if (!record) {
	      return record;
	    }
	    // Create an empty version of the record in the writable store if it does
	    // not already exist there.
	    var source = this._queuedRecords || this._records;
	    if (!source[dataID]) {
	      record = source[dataID] = {
	        __dataID__: dataID
	      };
	    }
	    if (source === this._queuedRecords) {
	      this._setClientMutationID(record);
	    }
	    return record;
	  };

	  /**
	   * Get the value of the field from the first version of the record for which
	   * the field is defined, returning `null` if the record has been deleted or
	   * `undefined` if the record has not been fetched.
	   */

	  RelayRecordStore.prototype._getField = function _getField(dataID, storageKey) {
	    var storage = this._storage;
	    for (var ii = 0; ii < storage.length; ii++) {
	      var record = storage[ii][dataID];
	      if (record === null) {
	        return null;
	      } else if (record && record.hasOwnProperty(storageKey)) {
	        return record[storageKey];
	      }
	    }
	    return undefined;
	  };

	  /**
	   * Injects the client mutation id associated with the record store instance
	   * into the given record.
	   */

	  RelayRecordStore.prototype._setClientMutationID = function _setClientMutationID(record) {
	    var clientMutationID = this._clientMutationID;
	    !clientMutationID ?  true ? invariant(false, 'RelayRecordStore: _clientMutationID cannot be null/undefined.') : invariant(false) : undefined;
	    var mutationIDs = record.__mutationIDs__ || [];
	    if (mutationIDs.indexOf(clientMutationID) === -1) {
	      mutationIDs.push(clientMutationID);
	      record.__mutationIDs__ = mutationIDs;
	    }
	  };

	  return RelayRecordStore;
	})();

	function getFilterCalls(calls) {
	  return calls.filter(function (call) {
	    return !RelayConnectionInterface.isConnectionCall(call);
	  });
	}

	/**
	 * Returns the field name based on the object key used to store the data in
	 * nodeData. It returns the field name without any calls. For example, the
	 * field name for 'profile_picture.size(50)' will be 'profile_picture'
	 */
	function getFieldNameFromKey(key) {
	  return key.split('.')[0];
	}

	module.exports = RelayRecordStore;

	/**
	 * $FlowIssue: the catch-all "mixed" type above should allow us to set
	 * "append", "prepend" etc as keys in _applyOptimisticRangeUpdate, but it does
	 * not.
	 */

/***/ },
/* 151 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule RelayRefQueryDescriptor
	 * 
	 * @typechecks
	 */

	'use strict';

	var _classCallCheck = __webpack_require__(2)['default'];

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	/**
	 * @internal
	 *
	 * Represents a node that will eventually become a "ref query".
	 *
	 * Includes the "path" context (ancestor nodes) that can be used to construct an
	 * appropriate the JSONPath for the query.
	 *
	 * @see splitDeferredRelayQueries
	 */

	var RelayRefQueryDescriptor = function RelayRefQueryDescriptor(node, path) {
	  _classCallCheck(this, RelayRefQueryDescriptor);

	  this.node = node;
	  this.path = path;
	};

	module.exports = RelayRefQueryDescriptor;

/***/ },
/* 152 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule RelayRootContainer
	 * @typechecks
	 * 
	 */

	'use strict';

	var _inherits = __webpack_require__(6)['default'];

	var _classCallCheck = __webpack_require__(2)['default'];

	var _extends = __webpack_require__(11)['default'];

	var GraphQLFragmentPointer = __webpack_require__(37);
	var React = __webpack_require__(53);
	var RelayDeprecated = __webpack_require__(40);

	var RelayStore = __webpack_require__(43);
	var RelayStoreData = __webpack_require__(12);
	var RelayPropTypes = __webpack_require__(55);

	var StaticContainer = __webpack_require__(251);

	var getRelayQueries = __webpack_require__(87);
	var invariant = __webpack_require__(1);
	var mapObject = __webpack_require__(111);

	var PropTypes = React.PropTypes;

	var storeData = RelayStoreData.getDefaultInstance();

	/**
	 * @public
	 *
	 * RelayRootContainer sends requests for data required to render the supplied
	 * `Component` and `route`. The `Component` must be a container created using
	 * `Relay.createContainer`.
	 *
	 * See the `RelayStore` module for documentation on `onReadyStateChange`.
	 *
	 * === Render Callbacks ===
	 *
	 * Whenever the RelayRootContainer renders, one of three render callback props
	 * are invoked depending on whether data is being loaded, can be resolved, or if
	 * an error is incurred.
	 *
	 *  ReactDOM.render(
	 *    <RelayRootContainer
	 *      Component={FooComponent}
	 *      route={fooRoute}
	 *      renderLoading={function() {
	 *        return <View>Loading...</View>;
	 *      }}
	 *      renderFetched={function(data) {
	 *        // Must spread `data` into <FooComponent>.
	 *        return <FooComponent {...data} />;
	 *      }}
	 *      renderFailure={function(error) {
	 *        return <View>Error: {error.message}</View>;
	 *      }}
	 *    />,
	 *    ...
	 *  );
	 *
	 * If a callback is not supplied, it has a default behavior:
	 *
	 *  - Without `renderFetched`, `Component` will be rendered with fetched data.
	 *  - Without `renderFailure`, an error will render to null.
	 *  - Without `renderLoading`, the existing view will continue to render. If
	 *    this is the initial mount (with no existing view), renders to null.
	 *
	 * In addition, supplying a `renderLoading` that returns undefined has the same
	 * effect as not supplying the callback. (Usually, an undefined return value is
	 * an error in React).
	 *
	 * === Refs ===
	 *
	 * References to elements rendered by any of these callbacks can be obtained by
	 * using the React `ref` prop. For example:
	 *
	 *   <FooComponent {...data} ref={handleFooRef} />
	 *
	 *   function handleFooRef(component) {
	 *     // Invoked when `<FooComponent>` is mounted or unmounted. When mounted,
	 *     // `component` will be the component. When unmounted, `component` will
	 *     // be null.
	 *   }
	 *
	 */

	var RelayRootContainer = (function (_React$Component) {
	  _inherits(RelayRootContainer, _React$Component);

	  function RelayRootContainer(props, context) {
	    _classCallCheck(this, RelayRootContainer);

	    _React$Component.call(this, props, context);
	    this.mounted = true;
	    this.state = this._runQueries(this.props);
	  }

	  RelayRootContainer.prototype.getChildContext = function getChildContext() {
	    return { route: this.props.route };
	  };

	  /**
	   * @private
	   */

	  RelayRootContainer.prototype._runQueries = function _runQueries(_ref) {
	    var _this = this;

	    var Component = _ref.Component;
	    var forceFetch = _ref.forceFetch;
	    var refetchRoute = _ref.refetchRoute;
	    var route = _ref.route;

	    var querySet = getRelayQueries(Component, route);
	    var onReadyStateChange = function onReadyStateChange(readyState) {
	      if (!_this.mounted) {
	        _this._handleReadyStateChange(_extends({}, readyState, { mounted: false }));
	        return;
	      }
	      var _state = _this.state;
	      var fragmentPointers = _state.fragmentPointers;
	      var pendingRequest = _state.pendingRequest;

	      if (request !== pendingRequest) {
	        // Ignore (abort) ready state if we have a new pending request.
	        return;
	      }
	      if (readyState.aborted || readyState.done || readyState.error) {
	        pendingRequest = null;
	      }
	      if (readyState.ready && !fragmentPointers) {
	        fragmentPointers = mapObject(querySet, function (query) {
	          return query ? GraphQLFragmentPointer.createForRoot(storeData.getRecordStore(), query) : null;
	        });
	      }
	      _this.setState({
	        activeComponent: Component,
	        activeRoute: route,
	        error: readyState.error,
	        fragmentPointers: fragmentPointers,
	        pendingRequest: pendingRequest,
	        readyState: _extends({}, readyState, { mounted: true }),
	        fetchState: {
	          done: readyState.done,
	          stale: readyState.stale
	        }
	      });
	    };

	    if (typeof refetchRoute !== 'undefined') {
	      RelayDeprecated.warn({
	        was: 'RelayRootContainer.refetchRoute',
	        now: 'RelayRootContainer.forceFetch'
	      });
	      forceFetch = refetchRoute;
	    }

	    var request = forceFetch ? RelayStore.forceFetch(querySet, onReadyStateChange) : RelayStore.primeCache(querySet, onReadyStateChange);

	    return {
	      activeComponent: null,
	      activeRoute: null,
	      error: null,
	      fragmentPointers: null,
	      pendingRequest: request,
	      readyState: null,
	      fetchState: {
	        done: false,
	        stale: false
	      }
	    };
	  };

	  /**
	   * Returns whether or not the view should be updated during the current render
	   * pass. This is false between invoking `Relay.Store.{primeCache,forceFetch}`
	   * and the first invocation of the `onReadyStateChange` callback.
	   *
	   * @private
	   */

	  RelayRootContainer.prototype._shouldUpdate = function _shouldUpdate() {
	    return this.props.Component === this.state.activeComponent && this.props.route === this.state.activeRoute;
	  };

	  /**
	   * Exposed as the second argument to the `onFailure` prop.
	   *
	   * @private
	   */

	  RelayRootContainer.prototype._retry = function _retry() {
	    !this.state.error ?  true ? invariant(false, 'RelayRootContainer: Can only invoke `retry` in a failure state.') : invariant(false) : undefined;
	    this.setState(this._runQueries(this.props));
	  };

	  RelayRootContainer.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
	    if (nextProps.Component !== this.props.Component || nextProps.route !== this.props.route) {
	      if (this.state.pendingRequest) {
	        this.state.pendingRequest.abort();
	      }
	      this.setState(this._runQueries(nextProps));
	    }
	  };

	  RelayRootContainer.prototype.componentDidUpdate = function componentDidUpdate(prevProps, prevState) {
	    // `prevState` should exist; the truthy check is for Flow soundness.
	    var readyState = this.state.readyState;
	    if (readyState) {
	      if (!prevState || readyState !== prevState.readyState) {
	        this._handleReadyStateChange(readyState);
	      }
	    }
	  };

	  /**
	   * @private
	   */

	  RelayRootContainer.prototype._handleReadyStateChange = function _handleReadyStateChange(readyState) {
	    var onReadyStateChange = this.props.onReadyStateChange;
	    if (onReadyStateChange) {
	      onReadyStateChange(readyState);
	    }
	  };

	  RelayRootContainer.prototype.componentWillUnmount = function componentWillUnmount() {
	    if (this.state.pendingRequest) {
	      this.state.pendingRequest.abort();
	    }
	    this.mounted = false;
	  };

	  RelayRootContainer.prototype.render = function render() {
	    var children = null;
	    var shouldUpdate = this._shouldUpdate();
	    if (shouldUpdate && this.state.error) {
	      var renderFailure = this.props.renderFailure;
	      if (renderFailure) {
	        children = renderFailure(this.state.error, this._retry.bind(this));
	      }
	    } else if (shouldUpdate && this.state.fragmentPointers) {
	      var renderFetched = this.props.renderFetched;
	      if (renderFetched) {
	        children = renderFetched(_extends({}, this.props.route.params, this.state.fragmentPointers), this.state.fetchState);
	      } else {
	        var Component = this.props.Component;
	        children = React.createElement(Component, _extends({}, this.props.route.params, this.state.fragmentPointers));
	      }
	    } else {
	      var renderLoading = this.props.renderLoading;
	      if (renderLoading) {
	        children = renderLoading();
	      } else {
	        children = undefined;
	      }
	      if (children === undefined) {
	        children = null;
	        shouldUpdate = false;
	      }
	    }
	    return React.createElement(StaticContainer, { shouldUpdate: shouldUpdate }, children);
	  };

	  return RelayRootContainer;
	})(React.Component);

	RelayRootContainer.propTypes = {
	  Component: RelayPropTypes.Container,
	  forceFetch: PropTypes.bool,
	  onReadyStateChange: PropTypes.func,
	  renderFailure: PropTypes.func,
	  renderFetched: PropTypes.func,
	  renderLoading: PropTypes.func,
	  route: RelayPropTypes.QueryConfig.isRequired
	};

	RelayRootContainer.childContextTypes = {
	  route: RelayPropTypes.QueryConfig.isRequired
	};

	module.exports = RelayRootContainer;
	// TODO: Deprecate, #6247867.

/***/ },
/* 153 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule RelayRoute
	 * 
	 * @typechecks
	 */

	'use strict';

	var _classCallCheck = __webpack_require__(2)['default'];

	var _Object$freeze = __webpack_require__(64)['default'];

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var RelayDeprecated = __webpack_require__(40);

	var forEachObject = __webpack_require__(7);
	var invariant = __webpack_require__(1);

	var createURI = function createURI() {
	  return null;
	};

	/**
	 * Describes the root queries, param definitions and other metadata for a given
	 * path (URI).
	 */

	var RelayRoute = (function () {
	  function RelayRoute(initialParams, uri) {
	    _classCallCheck(this, RelayRoute);

	    var constructor = this.constructor;
	    var routeName = constructor.routeName;
	    var queries = constructor.queries;
	    var paramDefinitions = constructor.paramDefinitions;
	    var path = constructor.path;
	    var prepareParams = constructor.prepareParams;

	    !(constructor !== RelayRoute) ?  true ? invariant(false, 'RelayRoute: Abstract class cannot be instantiated.') : invariant(false) : undefined;
	    !routeName ?  true ? invariant(false, '%s: Subclasses of RelayRoute must define a `routeName`.', constructor.name || '<<anonymous>>') : invariant(false) : undefined;

	    var processQueryParams = constructor.processQueryParams;
	    if (processQueryParams && !prepareParams) {
	      RelayDeprecated.warn({
	        was: routeName + '.processQueryParams',
	        now: routeName + '.prepareParams'
	      });
	      prepareParams = processQueryParams;
	    }

	    var params = initialParams || {};
	    if (prepareParams) {
	      params = prepareParams(params);
	    }

	    queries = queries || {};
	    if (!uri && path) {
	      uri = createURI(constructor, params);
	    }

	    forEachObject(paramDefinitions, function (paramDefinition, paramName) {
	      if (params.hasOwnProperty(paramName)) {
	        return;
	      }
	      !!paramDefinition.required ?  true ? invariant(false, 'RelayRoute: Missing required parameter `%s` in `%s`. Check the ' + 'supplied params or URI (%s).', paramName, routeName, uri) : invariant(false) : undefined;
	      // Backfill param so that a call variable is created for it.
	      params[paramName] = undefined;
	    });

	    Object.defineProperty(this, 'name', {
	      enumerable: true,
	      value: routeName,
	      writable: false
	    });
	    Object.defineProperty(this, 'params', {
	      enumerable: true,
	      value: params,
	      writable: false
	    });
	    Object.defineProperty(this, 'queries', {
	      enumerable: true,
	      value: queries,
	      writable: false
	    });
	    Object.defineProperty(this, 'uri', {
	      enumerable: true,
	      value: uri,
	      writable: false
	    });
	    if (true) {
	      _Object$freeze(this.params);
	      _Object$freeze(this.queries);
	    }
	  }

	  RelayRoute.injectURICreator = function injectURICreator(creator) {
	    createURI = creator;
	  };

	  return RelayRoute;
	})();

	module.exports = RelayRoute;

/***/ },
/* 154 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule RelayStoreGarbageCollector
	 * 
	 * @typechecks
	 */

	'use strict';

	var _classCallCheck = __webpack_require__(2)['default'];

	var GraphQLStoreDataHandler = __webpack_require__(8);
	var RelayBufferedNeglectionStateMap = __webpack_require__(132);

	var RelayNeglectionStateMap = __webpack_require__(144);

	var RelayProfiler = __webpack_require__(4);

	var RelayTaskScheduler = __webpack_require__(44);

	var forEachObject = __webpack_require__(7);
	var resolveImmediate = __webpack_require__(19);

	var RANGE = '__range__';

	/**
	 * @internal
	 *
	 * Provides a garbage collector.
	 */

	var RelayStoreGarbageCollector = (function () {
	  function RelayStoreGarbageCollector(relayStoreData) {
	    _classCallCheck(this, RelayStoreGarbageCollector);

	    this._directNeglectionStates = new RelayNeglectionStateMap();
	    this._bufferedNeglectionStates = new RelayBufferedNeglectionStateMap(this._directNeglectionStates);
	    this._neglectionStates = this._bufferedNeglectionStates;
	    this._relayStoreData = relayStoreData;

	    this._cycles = 0;
	  }

	  /**
	   * Checks if the given object is a linked record with a client-site DataID
	   */

	  /**
	   * Removes all data for registered dataIDs that are set to collectible and
	   * have no subscriptions
	   */

	  RelayStoreGarbageCollector.prototype.scheduleCollection = function scheduleCollection(stepLength) {
	    var _this = this;

	    this._bufferedNeglectionStates.flushBuffer();
	    var iterator = this._neglectionStates.values();
	    var currentCycle = ++this._cycles;
	    // During garbage collection we don't want to buffer any changes.
	    this._neglectionStates = this._directNeglectionStates;
	    RelayTaskScheduler.await(function () {
	      return _this._collectGarbageStep(currentCycle, iterator, iterator.next(), stepLength);
	    });
	  };

	  /**
	   * Removes registered DataIDs that are eligible for removal in steps of length
	   * `stepLength`, starting with the record referenced by the `NeglectionState`
	   * in `offset`.
	   *
	   * `_collectGarbageInSteps` will invoke itself using `RelayTaskScheduler`
	   * until all registered DataIDs have been processed (either removed or flagged
	   * as collectible). If `collect` is invoked before a run of
	   * `_collectGarbageInSteps` has recursively processed all DataIDs the
	   * remaining DataIDs will only be marked as collectible and no attempt to
	   * remove these DataID will be done.
	   */

	  RelayStoreGarbageCollector.prototype._collectGarbageStep = function _collectGarbageStep(currentCycle, remainingDataIDs, offset, stepLength) {
	    var _this2 = this;

	    var iterator = offset;
	    var neglectionState;
	    // Check if the current collection cycle is still the most recent one. If
	    // there was a subsequent call to `collect` we mark all not yet processed
	    // DataIDs as collectible.
	    if (currentCycle !== this._cycles) {
	      for (iterator = offset; !iterator.done; iterator = remainingDataIDs.next()) {
	        var _iterator = iterator;
	        neglectionState = _iterator.value;

	        if (neglectionState) {
	          neglectionState.collectible = true;
	        }
	      }
	      return;
	    }

	    // Iterate over registered DataIDs until `_stepLength` records were seen or
	    // all registered records were processed.
	    iterator = offset;
	    var profileState = {
	      count: -1,
	      stepLength: stepLength
	    };
	    var profile = RelayProfiler.profile('RelayStoreGarbageCollector.collect', profileState);
	    var recordsBefore = this._neglectionStates.size();
	    var seenRecords = 0;
	    for (iterator = offset; !iterator.done && (stepLength == null || seenRecords < stepLength); iterator = remainingDataIDs.next()) {
	      var _iterator2 = iterator;
	      neglectionState = _iterator2.value;

	      if (neglectionState) {
	        if (this._isCollectible(neglectionState)) {
	          seenRecords += this._removeRecordAndDescendentClientRecords(neglectionState.dataID);
	        } else {
	          seenRecords++;
	        }
	        neglectionState.collectible = true;
	      }
	    }
	    var recordsAfter = this._neglectionStates.size();
	    profileState.count = recordsBefore - recordsAfter;
	    profile.stop();

	    // Schedule next run if there are records left that have not been processed.
	    if (!iterator.done) {
	      resolveImmediate(function () {
	        return RelayTaskScheduler.await(function () {
	          return _this2._collectGarbageStep(currentCycle, remainingDataIDs, iterator, stepLength);
	        });
	      });
	    } else {
	      this._neglectionStates = this._bufferedNeglectionStates;
	    }
	  };

	  /**
	   * Decreases the number of subscriptions for the given dataID by 1
	   */

	  RelayStoreGarbageCollector.prototype.decreaseSubscriptionsFor = function decreaseSubscriptionsFor(dataID) {
	    this._neglectionStates.decreaseSubscriptionsFor(dataID);
	  };

	  /**
	   * Increases the number of subscriptions for the given dataID by 1. If the
	   * dataID is not yet registered it will be registered.
	   */

	  RelayStoreGarbageCollector.prototype.increaseSubscriptionsFor = function increaseSubscriptionsFor(dataID) {
	    this._neglectionStates.increaseSubscriptionsFor(dataID);
	  };

	  /**
	   * Makes the Garbage Collector aware of dataID and make it its responsibility
	   * to clean the data if possible.
	   */

	  RelayStoreGarbageCollector.prototype.register = function register(dataID) {
	    this._neglectionStates.register(dataID);
	  };

	  /**
	   * Checks if a record can be garbage collected based on its neglection state.
	   *
	   * A record is collectible if the collectible flag is set to true and there
	   * are no active subscriptions to the record. Due to current limitations we
	   * are further limited to only collecting records that are refetchable. (I.e.
	   * have a server ID or are a range of records.)
	   */

	  RelayStoreGarbageCollector.prototype._isCollectible = function _isCollectible(neglectionState) {
	    var isEligibleForCollection = neglectionState.collectible && !neglectionState.subscriptions;
	    var queuedStore = this._relayStoreData.getQueuedStore();

	    return isEligibleForCollection && (!GraphQLStoreDataHandler.isClientID(neglectionState.dataID) || queuedStore.hasRange(neglectionState.dataID));
	  };

	  /**
	   * Removes the record identified by the given DataID and any descendent
	   * records that have client-site DataIDs.
	   */

	  RelayStoreGarbageCollector.prototype._removeRecordAndDescendentClientRecords = function _removeRecordAndDescendentClientRecords(dataID) {
	    var records = this._relayStoreData.getNodeData();
	    var queuedRecords = this._relayStoreData.getQueuedData();
	    var cachedRecords = this._relayStoreData.getCachedData();

	    var removalStatusMap = {};
	    removalStatusMap[dataID] = 'pending';
	    var removedRecords = 0;

	    // Since the descendant records in the different stores might differ we
	    // extract the client-site DataIDs for the record out of all stores.
	    var remainingRecords = [records[dataID], queuedRecords[dataID], cachedRecords[dataID]];

	    // If `field` contains a linked record and the linked record has a
	    // client-site DataID the record will be added to `remainingRecords` and
	    // it's DataID will be set to `true` in `removalStatusMap`.
	    function enqueueField(field) {
	      var dataID = getClientIDFromLinkedRecord(field);
	      // If we have a dataID we haven't seen before we add it to the remaining
	      // records
	      if (dataID && !removalStatusMap[dataID]) {
	        removalStatusMap[dataID] = 'pending';
	        remainingRecords.push(records[dataID], queuedRecords[dataID], cachedRecords[dataID]);
	      }
	    }

	    while (remainingRecords.length) {
	      var currentRecord = remainingRecords.shift();
	      if (currentRecord && typeof currentRecord === 'object') {
	        // Special handling for `GraphQLRange` data, which isn't stored like
	        // other node data.
	        var range = currentRecord[RANGE];
	        if (range) {
	          // Wrapping each dataID in a object that resembles an record so
	          // `enqueueField` can handle it.
	          range.getEdgeIDs().forEach(function (id) {
	            return enqueueField({ __dataID__: id });
	          });
	        } else {
	          // Walk all fields of the record, skipping meta-fields and adding any
	          // linked records with a client-site DataID to `remainingRecords`.
	          forEachObject(currentRecord, function (field, fieldName) {
	            if (GraphQLStoreDataHandler.isMetadataKey(fieldName)) {
	              return;
	            }

	            // Handling plural linked fields
	            if (Array.isArray(field)) {
	              field.forEach(enqueueField);
	            } else {
	              enqueueField(field);
	            }
	          });
	        }

	        var currentDataID = GraphQLStoreDataHandler.getID(currentRecord);
	        if (currentDataID && removalStatusMap[currentDataID] === 'pending') {
	          this._removeRecord(currentRecord);
	          removalStatusMap[currentDataID] = 'removed';
	          removedRecords++;
	        }
	      }
	    }
	    return removedRecords;
	  };

	  /**
	   * Removes the records identified by `dataID` from the queued-store, the
	   * query-tracker, and the garbage-collector itself.
	   */

	  RelayStoreGarbageCollector.prototype._removeRecord = function _removeRecord(record) {
	    var dataID = record.__dataID__;
	    this._relayStoreData.getQueryTracker().untrackNodesForID(dataID);
	    this._relayStoreData.getQueuedStore().removeRecord(dataID);
	    this._neglectionStates.remove(dataID);
	  };

	  return RelayStoreGarbageCollector;
	})();

	function getClientIDFromLinkedRecord(field) {
	  if (!field || typeof field !== 'object') {
	    return null;
	  }

	  // Downcast to `any`-type since it can be upcasted to any other type.
	  // We checked field is an object before and can be sure this cast is safe.
	  var dataID = GraphQLStoreDataHandler.getID(field);
	  if (dataID && GraphQLStoreDataHandler.isClientID(dataID)) {
	    return dataID;
	  }
	  return null;
	}

	RelayProfiler.instrumentMethods(RelayStoreGarbageCollector.prototype, {
	  decreaseSubscriptionsFor: 'RelayStoreGarbageCollector.prototype.decreaseSubscriptionsFor',
	  increaseSubscriptionsFor: 'RelayStoreGarbageCollector.prototype.increaseSubscriptionsFor',
	  register: 'RelayStoreGarbageCollector.prototype.register'
	});

	module.exports = RelayStoreGarbageCollector;

/***/ },
/* 155 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule checkRelayQueryData
	 * 
	 * @typechecks
	 */

	'use strict';

	var _inherits = __webpack_require__(6)['default'];

	var _classCallCheck = __webpack_require__(2)['default'];

	var RelayConnectionInterface = __webpack_require__(9);

	var RelayProfiler = __webpack_require__(4);

	var RelayQueryVisitor = __webpack_require__(21);
	var RelayRecordStatus = __webpack_require__(42);

	var forEachRootCallArg = __webpack_require__(28);

	var EDGES = RelayConnectionInterface.EDGES;
	var PAGE_INFO = RelayConnectionInterface.PAGE_INFO;

	/**
	 * @internal
	 *
	 * Traverses a query and data in the record store to determine whether we have
	 * enough data to satisfy the query.
	 */
	function checkRelayQueryData(store, query) {

	  var checker = new RelayQueryChecker(store);

	  var state = {
	    dataID: undefined,
	    rangeInfo: undefined,
	    result: true
	  };

	  checker.visit(query, state);
	  return state.result;
	}

	var RelayQueryChecker = (function (_RelayQueryVisitor) {
	  _inherits(RelayQueryChecker, _RelayQueryVisitor);

	  function RelayQueryChecker(store) {
	    _classCallCheck(this, RelayQueryChecker);

	    _RelayQueryVisitor.call(this);
	    this._store = store;
	  }

	  /**
	   * Skip visiting children if result is already false.
	   */

	  RelayQueryChecker.prototype.traverse = function traverse(node, state) {
	    var children = node.getChildren();
	    for (var ii = 0; ii < children.length; ii++) {
	      if (!state.result) {
	        return;
	      }
	      this.visit(children[ii], state);
	    }
	  };

	  RelayQueryChecker.prototype.visitRoot = function visitRoot(root, state) {
	    var _this = this;

	    var nextState;

	    forEachRootCallArg(root, function (rootCallArg, rootCallName) {
	      var dataID = _this._store.getRootCallID(rootCallName, rootCallArg);
	      if (dataID == null) {
	        state.result = false;
	      } else {
	        nextState = {
	          dataID: dataID,
	          rangeInfo: undefined,
	          result: true
	        };
	        _this.traverse(root, nextState);
	        state.result = state.result && nextState.result;
	      }
	    });
	  };

	  RelayQueryChecker.prototype.visitField = function visitField(field, state) {
	    var dataID = state.dataID;
	    var recordStatus = dataID && this._store.getRecordStatus(dataID);
	    if (recordStatus === RelayRecordStatus.UNKNOWN) {
	      state.result = false;
	      return;
	    } else if (recordStatus === RelayRecordStatus.NONEXISTENT) {
	      return;
	    }
	    var rangeInfo = state.rangeInfo;
	    if (rangeInfo && field.getSchemaName() === EDGES) {
	      this._checkEdges(field, state);
	    } else if (rangeInfo && field.getSchemaName() === PAGE_INFO) {
	      this._checkPageInfo(field, state);
	    } else if (field.isScalar()) {
	      this._checkScalar(field, state);
	    } else if (field.isPlural()) {
	      this._checkPlural(field, state);
	    } else if (field.isConnection()) {
	      this._checkConnection(field, state);
	    } else {
	      this._checkLinkedField(field, state);
	    }
	  };

	  RelayQueryChecker.prototype._checkScalar = function _checkScalar(field, state) {
	    var fieldData = state.dataID && this._store.getField(state.dataID, field.getStorageKey());
	    if (fieldData === undefined) {
	      state.result = false;
	    }
	  };

	  RelayQueryChecker.prototype._checkPlural = function _checkPlural(field, state) {
	    var dataIDs = state.dataID && this._store.getLinkedRecordIDs(state.dataID, field.getStorageKey());
	    if (dataIDs === undefined) {
	      state.result = false;
	      return;
	    }
	    if (dataIDs) {
	      for (var ii = 0; ii < dataIDs.length; ii++) {
	        if (!state.result) {
	          break;
	        }
	        var nextState = {
	          dataID: dataIDs[ii],
	          rangeInfo: undefined,
	          result: true
	        };
	        this.traverse(field, nextState);
	        state.result = nextState.result;
	      }
	    }
	  };

	  RelayQueryChecker.prototype._checkConnection = function _checkConnection(field, state) {
	    var calls = field.getCallsWithValues();
	    var dataID = state.dataID && this._store.getLinkedRecordID(state.dataID, field.getStorageKey());
	    if (dataID === undefined) {
	      state.result = false;
	      return;
	    }
	    var nextState = {
	      dataID: dataID,
	      rangeInfo: null, // Flow rejects `undefined` here
	      result: true
	    };
	    var metadata = this._store.getRangeMetadata(dataID, calls);
	    if (metadata) {
	      nextState.rangeInfo = metadata;
	    }
	    this.traverse(field, nextState);
	    state.result = state.result && nextState.result;
	  };

	  RelayQueryChecker.prototype._checkEdges = function _checkEdges(field, state) {
	    var rangeInfo = state.rangeInfo;
	    if (!rangeInfo) {
	      state.result = false;
	      return;
	    }
	    if (rangeInfo.diffCalls.length) {
	      state.result = false;
	      return;
	    }
	    var edges = rangeInfo.requestedEdges;
	    for (var ii = 0; ii < edges.length; ii++) {
	      if (!state.result) {
	        break;
	      }
	      var nextState = {
	        dataID: edges[ii].edgeID,
	        rangeInfo: undefined,
	        result: true
	      };
	      this.traverse(field, nextState);
	      state.result = nextState.result;
	    }
	  };

	  RelayQueryChecker.prototype._checkPageInfo = function _checkPageInfo(field, state) {
	    var rangeInfo = state.rangeInfo;
	    if (!rangeInfo || !rangeInfo.pageInfo) {
	      state.result = false;
	      return;
	    }
	  };

	  RelayQueryChecker.prototype._checkLinkedField = function _checkLinkedField(field, state) {
	    var dataID = state.dataID && this._store.getLinkedRecordID(state.dataID, field.getStorageKey());
	    if (dataID === undefined) {
	      state.result = false;
	      return;
	    }
	    if (dataID) {
	      var nextState = {
	        dataID: dataID,
	        rangeInfo: undefined,
	        result: true
	      };
	      this.traverse(field, nextState);
	      state.result = state.result && nextState.result;
	    }
	  };

	  return RelayQueryChecker;
	})(RelayQueryVisitor);

	module.exports = RelayProfiler.instrument('checkRelayQueryData', checkRelayQueryData);

/***/ },
/* 156 */
/***/ function(module, exports) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule containsRelayQueryRootCall
	 * @typechecks
	 * 
	 */

	/**
	 * @internal
	 *
	 * Compares two query root nodes and returns true if the nodes fetched by
	 * `thisRoot` would be a superset of the nodes fetched by `thatRoot`.
	 */
	'use strict';

	function containsRelayQueryRootCall(thisRoot, thatRoot) {
	  if (thisRoot === thatRoot) {
	    return true;
	  }
	  var thisCall = thisRoot.getRootCall();
	  var thatCall = thatRoot.getRootCall();
	  if (getCanonicalName(thisCall.name) !== getCanonicalName(thatCall.name)) {
	    return false;
	  }
	  if (thisCall.value == null && thatCall.value == null) {
	    return true;
	  }
	  if (thisCall.value == null || thatCall.value == null) {
	    return false;
	  }
	  var thisValue = thisCall.value;
	  var thatValue = thatCall.value;
	  if (Array.isArray(thisValue)) {
	    var thisArray = thisValue;
	    if (Array.isArray(thatValue)) {
	      return thatValue.every(function (eachValue) {
	        return thisArray.indexOf(eachValue) >= 0;
	      });
	    } else {
	      return thisValue.indexOf(thatValue) >= 0;
	    }
	  } else {
	    if (Array.isArray(thatValue)) {
	      return thatValue.every(function (eachValue) {
	        return eachValue === thisValue;
	      });
	    } else {
	      return thatValue === thisValue;
	    }
	  }
	}

	var canonicalRootCalls = {
	  'nodes': 'node',
	  'usernames': 'username'
	};

	/**
	 * @private
	 *
	 * This is required to support legacy versions of GraphQL.
	 */
	function getCanonicalName(name) {
	  if (canonicalRootCalls.hasOwnProperty(name)) {
	    return canonicalRootCalls[name];
	  }
	  return name;
	}

	module.exports = containsRelayQueryRootCall;

/***/ },
/* 157 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule diffRelayQuery
	 * 
	 * @typechecks
	 */

	'use strict';

	var _classCallCheck = __webpack_require__(2)['default'];

	var GraphQLStoreDataHandler = __webpack_require__(8);
	var RelayConnectionInterface = __webpack_require__(9);
	var RelayNodeInterface = __webpack_require__(15);
	var RelayProfiler = __webpack_require__(4);
	var RelayQuery = __webpack_require__(3);
	var RelayQueryPath = __webpack_require__(57);

	var forEachRootCallArg = __webpack_require__(28);
	var invariant = __webpack_require__(1);
	var warning = __webpack_require__(10);

	var EDGES = RelayConnectionInterface.EDGES;
	var NODE = RelayConnectionInterface.NODE;
	var PAGE_INFO = RelayConnectionInterface.PAGE_INFO;

	var nodeWithID = RelayQuery.Node.buildField(RelayNodeInterface.NODE, null, [RelayQuery.Node.buildField('id', null, null, { requisite: true })]);

	/**
	 * @internal
	 *
	 * Computes the difference between the data requested in `root` and the data
	 * available in `store`. It returns a minimal set of queries that will fulfill
	 * the difference, or an empty array if the query can be resolved locally.
	 */
	function diffRelayQuery(root, store, tracker) {
	  var path = new RelayQueryPath(root);
	  var queries = [];

	  var visitor = new RelayDiffQueryBuilder(store, tracker);
	  var rootCallValue = root.getRootCall().value;
	  var isPluralCall = Array.isArray(rootCallValue) && rootCallValue.length > 1;

	  forEachRootCallArg(root, function (rootCallArg, rootCallName) {
	    var nodeRoot;
	    if (isPluralCall) {
	      !(rootCallArg != null) ?  true ? invariant(false, 'diffRelayQuery(): Unexpected null or undefined value in root call ' + 'argument array for query, `%s(...).', rootCallName) : invariant(false) : undefined;
	      nodeRoot = RelayQuery.Node.buildRoot(rootCallName, rootCallArg, root.getChildren(), { rootArg: root.getRootCallArgument() }, root.getName());
	    } else {
	      // Reuse `root` if it only maps to one result.
	      nodeRoot = root;
	    }

	    // The whole query must be fetched if the root dataID is unknown.
	    var dataID = store.getRootCallID(rootCallName, rootCallArg);
	    if (dataID == null) {
	      queries.push(nodeRoot);
	      return;
	    }

	    // Diff the current dataID
	    var scope = makeScope(dataID);
	    var diffOutput = visitor.visit(nodeRoot, path, scope);
	    var diffNode = diffOutput ? diffOutput.diffNode : null;
	    if (diffNode) {
	      !(diffNode instanceof RelayQuery.Root) ?  true ? invariant(false, 'diffRelayQuery(): Expected result to be a root query.') : invariant(false) : undefined;
	      queries.push(diffNode);
	    }
	  });
	  return queries.concat(visitor.getSplitQueries());
	}

	/**
	 * @internal
	 *
	 * A transform for (node + store) -> (diff + tracked queries). It is analagous
	 * to `RelayQueryTransform` with the main differences as follows:
	 * - there is no `state` (which allowed for passing data up and down the tree).
	 * - data is passed down via `scope`, which flows from a parent field down
	 *   through interemediary fragments to the nearest child field.
	 * - data is passed up via the return type `{diffNode, trackedNode}`, where:
	 *   - `diffNode`: subset of the input that could not diffed out
	 *   - `trackedNode`: subset of the input that must be tracked
	 *
	 * The provided `tracker` is updated whenever the traversal of a node results
	 * in a `trackedNode` being created. New top-level queries are not returned
	 * up the tree, and instead are available via `getSplitQueries()`.
	 */

	var RelayDiffQueryBuilder = (function () {
	  function RelayDiffQueryBuilder(store, tracker) {
	    _classCallCheck(this, RelayDiffQueryBuilder);

	    this._store = store;
	    this._splitQueries = [];
	    this._tracker = tracker;
	  }

	  /**
	   * Helper to construct a plain scope for the given `dataID`.
	   */

	  RelayDiffQueryBuilder.prototype.splitQuery = function splitQuery(root) {
	    this._splitQueries.push(root);
	  };

	  RelayDiffQueryBuilder.prototype.getSplitQueries = function getSplitQueries() {
	    return this._splitQueries;
	  };

	  RelayDiffQueryBuilder.prototype.visit = function visit(node, path, scope) {
	    if (node instanceof RelayQuery.Field) {
	      return this.visitField(node, path, scope);
	    } else if (node instanceof RelayQuery.Fragment) {
	      return this.visitFragment(node, path, scope);
	    } else if (node instanceof RelayQuery.Root) {
	      return this.visitRoot(node, path, scope);
	    }
	  };

	  RelayDiffQueryBuilder.prototype.visitRoot = function visitRoot(node, path, scope) {
	    return this.traverse(node, path, scope);
	  };

	  RelayDiffQueryBuilder.prototype.visitFragment = function visitFragment(node, path, scope) {
	    return this.traverse(node, path, scope);
	  };

	  /**
	   * Diffs the field conditionally based on the `scope` from the nearest
	   * ancestor field.
	   */

	  RelayDiffQueryBuilder.prototype.visitField = function visitField(node, path, _ref) {
	    var connectionField = _ref.connectionField;
	    var dataID = _ref.dataID;
	    var edgeID = _ref.edgeID;
	    var rangeInfo = _ref.rangeInfo;

	    // special case when inside a connection traversal
	    if (connectionField && rangeInfo) {
	      if (edgeID) {
	        // When traversing a specific connection edge only look at `edges`
	        if (node.getSchemaName() === EDGES) {
	          return this.diffConnectionEdge(connectionField, node, // edge field
	          path.getPath(node, edgeID), edgeID, rangeInfo);
	        } else {
	          return null;
	        }
	      } else {
	        // When traversing connection metadata fields, edges/page_info are
	        // only kept if there are range extension calls. Other fields fall
	        // through to regular diffing.
	        if (node.getSchemaName() === EDGES || node.getSchemaName() === PAGE_INFO) {
	          return rangeInfo.diffCalls.length > 0 ? {
	            diffNode: node,
	            trackedNode: null
	          } : null;
	        }
	      }
	    }

	    // default field diffing algorithm
	    if (node.isScalar()) {
	      return this.diffScalar(node, dataID);
	    } else if (node.isGenerated()) {
	      return {
	        diffNode: node,
	        trackedNode: null
	      };
	    } else if (node.isConnection()) {
	      return this.diffConnection(node, path, dataID);
	    } else if (node.isPlural()) {
	      return this.diffPluralLink(node, path, dataID);
	    } else {
	      return this.diffLink(node, path, dataID);
	    }
	  };

	  /**
	   * Visit all the children of the given `node` and merge their results.
	   */

	  RelayDiffQueryBuilder.prototype.traverse = function traverse(node, path, scope) {
	    var _this = this;

	    var diffNode;
	    var diffChildren;
	    var trackedNode;
	    var trackedChildren;
	    var hasDiffField = false;
	    var hasTrackedField = false;

	    node.getChildren().forEach(function (child) {
	      var diffOutput = _this.visit(child, path, scope);
	      var diffChild = diffOutput ? diffOutput.diffNode : null;
	      var trackedChild = diffOutput ? diffOutput.trackedNode : null;

	      // Diff uses child nodes and keeps requisite fields
	      if (diffChild) {
	        diffChildren = diffChildren || [];
	        diffChildren.push(diffChild);
	        hasDiffField = hasDiffField || !diffChild.isGenerated();
	      } else if (child.isRequisite() && !scope.rangeInfo) {
	        // The presence of `rangeInfo` indicates that we are traversing
	        // connection metadata fields, in which case `visitField` will ensure
	        // that `edges` and `page_info` are kept when necessary. The requisite
	        // check alone could cause these fields to be added back when not
	        // needed.
	        //
	        // Example: `friends.first(3) {count, edges {...}, page_info {...} }
	        // If all `edges` were fetched but `count` is unfetched, the diff
	        // should be `friends.first(3) {count}` and not include `page_info`.
	        diffChildren = diffChildren || [];
	        diffChildren.push(child);
	      }
	      // Tracker uses tracked children and keeps requisite fields
	      if (trackedChild) {
	        trackedChildren = trackedChildren || [];
	        trackedChildren.push(trackedChild);
	        hasTrackedField = hasTrackedField || !trackedChild.isGenerated();
	      } else if (child.isRequisite()) {
	        trackedChildren = trackedChildren || [];
	        trackedChildren.push(child);
	      }
	    });

	    // Only return diff/tracked node if there are non-generated fields
	    if (diffChildren && hasDiffField) {
	      diffNode = node.clone(diffChildren);
	    }
	    if (trackedChildren && hasTrackedField) {
	      trackedNode = node.clone(trackedChildren);
	    }
	    // Record tracked nodes. Fragments can be skipped because these will
	    // always be composed into, and therefore tracked by, their nearest
	    // non-fragment parent.
	    if (trackedNode && !(trackedNode instanceof RelayQuery.Fragment)) {
	      this._tracker.trackNodeForID(trackedNode, scope.dataID, path);
	    }

	    return {
	      diffNode: diffNode,
	      trackedNode: trackedNode
	    };
	  };

	  /**
	   * Diff a scalar field such as `name` or `id`.
	   */

	  RelayDiffQueryBuilder.prototype.diffScalar = function diffScalar(field, dataID) {
	    if (this._store.getField(dataID, field.getStorageKey()) === undefined) {
	      return {
	        diffNode: field,
	        trackedNode: null
	      };
	    }
	    return null;
	  };

	  /**
	   * Diff a field-of-fields such as `profile_picture {...}`. Returns early if
	   * the field has not been fetched, otherwise the result of traversal.
	   */

	  RelayDiffQueryBuilder.prototype.diffLink = function diffLink(field, path, dataID) {
	    var nextDataID = this._store.getLinkedRecordID(dataID, field.getStorageKey());
	    if (nextDataID === undefined) {
	      return {
	        diffNode: field,
	        trackedNode: null
	      };
	    }
	    if (nextDataID === null) {
	      return null;
	    }

	    return this.traverse(field, path.getPath(field, nextDataID), makeScope(nextDataID));
	  };

	  /**
	   * Diffs a non-connection plural field against each of the fetched items.
	   * Note that scalar plural fields are handled by `_diffScalar`.
	   */

	  RelayDiffQueryBuilder.prototype.diffPluralLink = function diffPluralLink(field, path, dataID) {
	    var _this2 = this;

	    var linkedIDs = this._store.getLinkedRecordIDs(dataID, field.getStorageKey());
	    if (linkedIDs === undefined) {
	      // not fetched
	      return {
	        diffNode: field,
	        trackedNode: null
	      };
	    } else if (linkedIDs === null || linkedIDs.length === 0) {
	      // empty array means nothing to fetch
	      return null;
	    } else if (field.getInferredRootCallName() === NODE) {
	      // The items in this array are fetchable and may have been filled in
	      // from other sources, so check them all. For example, `Story{actors}`
	      // is an array (but not a range), and the Actors in that array likely
	      // had data fetched for them elsewhere (like `viewer(){actor}`).
	      var hasSplitQueries = false;
	      linkedIDs.forEach(function (itemID) {
	        var itemState = _this2.traverse(field, path.getPath(field, itemID), makeScope(itemID));
	        if (itemState) {
	          // If any child was tracked then `field` will also be tracked
	          hasSplitQueries = hasSplitQueries || !!itemState.trackedNode || !!itemState.diffNode;
	          // split diff nodes into root queries
	          if (itemState.diffNode) {
	            _this2.splitQuery(RelayQuery.Node.buildRoot(NODE, itemID, itemState.diffNode.getChildren(), { rootArg: RelayNodeInterface.ID }, path.getName()));
	          }
	        }
	      });
	      // if sub-queries are split then this *entire* field will be tracked,
	      // therefore we don't need to merge the `trackedNode` from each item
	      if (hasSplitQueries) {
	        return {
	          diffNode: null,
	          trackedNode: field
	        };
	      }
	    } else {
	      // The items in this array are not fetchable by ID, so nothing else
	      // could have fetched additional data for individual items. Therefore,
	      // we only need to diff the first record to figure out which fields have
	      // previously been fetched.
	      var sampleItemID = linkedIDs[0];
	      return this.traverse(field, path.getPath(field, sampleItemID), makeScope(sampleItemID));
	    }
	    return null;
	  };

	  /**
	   * Diff a connection field such as `news_feed.first(3)`. Returns early if
	   * the range has not been fetched or the entire range has already been
	   * fetched. Otherwise the diff output is a clone of `field` with updated
	   * after/first and before/last calls.
	   */

	  RelayDiffQueryBuilder.prototype.diffConnection = function diffConnection(field, path, dataID) {
	    var _this3 = this;

	    var store = this._store;
	    var connectionID = store.getLinkedRecordID(dataID, field.getStorageKey());
	    var rangeInfo = store.getRangeMetadata(connectionID, field.getCallsWithValues());
	    // Keep the field if the connection is unfetched
	    if (connectionID === undefined) {
	      return {
	        diffNode: field,
	        trackedNode: null
	      };
	    }
	    // Skip if the connection is deleted.
	    if (connectionID === null) {
	      return null;
	    }
	    // If metadata fields but not edges are fetched, diff as a normal field.
	    // In practice, `rangeInfo` is `undefined` if unfetched, `null` if the
	    // connection was deleted (in which case `connectionID` is null too).
	    if (rangeInfo == null) {
	      return this.traverse(field, path.getPath(field, connectionID), makeScope(connectionID));
	    }
	    var diffCalls = rangeInfo.diffCalls;
	    var requestedEdges = rangeInfo.requestedEdges;

	    // check existing edges for missing fields
	    var hasSplitQueries = false;
	    requestedEdges.forEach(function (edge) {
	      // Flow loses type information in closures
	      if (rangeInfo && connectionID) {
	        var scope = {
	          connectionField: field,
	          dataID: connectionID,
	          edgeID: edge.edgeID,
	          rangeInfo: rangeInfo
	        };
	        var diffOutput = _this3.traverse(field, path.getPath(field, edge.edgeID), scope);
	        // If any edges were missing data (resulting in a split query),
	        // then the entire original connection field must be tracked.
	        if (diffOutput) {
	          hasSplitQueries = hasSplitQueries || !!diffOutput.trackedNode;
	        }
	      }
	    });

	    // Scope has null `edgeID` to skip looking at `edges` fields.
	    var scope = {
	      connectionField: field,
	      dataID: connectionID,
	      edgeID: null,
	      rangeInfo: rangeInfo
	    };
	    // diff non-`edges` fields such as `count`
	    var diffOutput = this.traverse(field, path.getPath(field, connectionID), scope);
	    var diffNode = diffOutput ? diffOutput.diffNode : null;
	    var trackedNode = diffOutput ? diffOutput.trackedNode : null;
	    if (diffCalls.length && diffNode instanceof RelayQuery.Field) {
	      diffNode = diffNode.cloneFieldWithCalls(diffNode.getChildren(), diffCalls);
	    }
	    // if a sub-query was split, then we must track the entire field, which will
	    // be a superset of the `trackedNode` from traversing any metadata fields.
	    // Example:
	    // dataID: `4`
	    // node: `friends.first(3)`
	    // diffNode: null
	    // splitQueries: `node(friend1) {...}`, `node(friend2) {...}`
	    //
	    // In this case the two fetched `node` queries do not reflect the fact that
	    // `friends.first(3)` were fetched for item `4`, so `friends.first(3)` has
	    // to be tracked as-is.
	    if (hasSplitQueries) {
	      trackedNode = field;
	    }

	    return {
	      diffNode: diffNode,
	      trackedNode: trackedNode
	    };
	  };

	  /**
	   * Diff an `edges` field for the edge rooted at `edgeID`, splitting a new
	   * root query to fetch any missing data (via a `node(id)` root if the
	   * field is refetchable or a `...{connection.find(id){}}` query if the
	   * field is not refetchable).
	   */

	  RelayDiffQueryBuilder.prototype.diffConnectionEdge = function diffConnectionEdge(connectionField, edgeField, path, edgeID, rangeInfo) {
	    var nodeID = this._store.getLinkedRecordID(edgeID, NODE);
	    if (!nodeID || GraphQLStoreDataHandler.isClientID(nodeID)) {
	       true ? warning(false, 'RelayDiffQueryBuilder: connection `node{*}` can only be refetched ' + 'if the node is refetchable by `id`. Cannot refetch data for field ' + '`%s`.', connectionField.getStorageKey()) : undefined;
	      return;
	    }

	    var hasSplitQueries = false;
	    var diffOutput = this.traverse(edgeField, path.getPath(edgeField, edgeID), makeScope(edgeID));
	    var diffNode = diffOutput ? diffOutput.diffNode : null;
	    var trackedNode = diffOutput ? diffOutput.trackedNode : null;

	    if (diffNode) {
	      var _splitNodeAndEdgesFields = splitNodeAndEdgesFields(diffNode);

	      var diffEdgesField = _splitNodeAndEdgesFields.edges;
	      var diffNodeField = _splitNodeAndEdgesFields.node;

	      // split missing `node` fields into a `node(id)` root query
	      if (diffNodeField) {
	        hasSplitQueries = true;
	        this.splitQuery(RelayQuery.Node.buildRoot(NODE, nodeID, diffNodeField.getChildren(), { rootArg: RelayNodeInterface.ID }, path.getName()));
	      }

	      // split missing `edges` fields into a `connection.find(id)` query
	      // if `find` is supported, otherwise warn
	      if (diffEdgesField) {
	        if (connectionField.isFindable()) {
	          diffEdgesField = diffEdgesField.clone(diffEdgesField.getChildren().concat(nodeWithID));
	          var connectionFind = connectionField.cloneFieldWithCalls([diffEdgesField], rangeInfo.filterCalls.concat({ name: 'find', value: nodeID }));
	          if (connectionFind) {
	            hasSplitQueries = true;
	            // current path has `parent`, `connection`, `edges`; pop to parent
	            var connectionParent = path.getParent().getParent();
	            this.splitQuery(connectionParent.getQuery(connectionFind));
	          }
	        } else {
	           true ? warning(false, 'RelayDiffQueryBuilder: connection `edges{*}` fields can only be ' + 'refetched if the connection supports the `find` call. Cannot ' + 'refetch data for field `%s`.', connectionField.getStorageKey()) : undefined;
	        }
	      }
	    }

	    // Connection edges will never return diff nodes; instead missing fields
	    // are fetched by new root queries. Tracked nodes are returned if either
	    // a child field was tracked or missing fields were split into a new query.
	    // The returned `trackedNode` is never tracked directly: instead it serves
	    // as an indicator to `diffConnection` that the entire connection field must
	    // be tracked.
	    return {
	      diffNode: null,
	      trackedNode: hasSplitQueries ? edgeField : trackedNode
	    };
	  };

	  return RelayDiffQueryBuilder;
	})();

	function makeScope(dataID) {
	  return {
	    connectionField: null,
	    dataID: dataID,
	    edgeID: null,
	    rangeInfo: null
	  };
	}

	/**
	 * Returns a clone of the input with `edges` and `node` sub-fields split into
	 * separate `edges` and `node` roots. Example:
	 *
	 * Input:
	 * edges {
	 *   edge_field,
	 *   node {
	 *     a,
	 *     b
	 *   },
	 *   ${
	 *     Fragment {
	 *       edge_field_2,
	 *       node {
	 *         c
	 *       }
	 *     }
	 *   }
	 * }
	 *
	 * Output:
	 * node:
	 *   edges {
	 *     a,      // flattened
	 *     b,      // flattend
	 *     ${
	 *       Fragment {
	 *         c  // flattened
	 *       }
	 *     }
	 *   }
	 * edges:
	 *   edges {
	 *     edge_field,
	 *     ${
	 *       Fragment {
	 *         edge_field_2
	 *       }
	 *     }
	 *   }
	 */
	function splitNodeAndEdgesFields(edgeOrFragment) {
	  var children = edgeOrFragment.getChildren();
	  var edgeChildren = [];
	  var hasNodeChild = false;
	  var nodeChildren = [];
	  var hasEdgeChild = false;
	  for (var ii = 0; ii < children.length; ii++) {
	    var child = children[ii];
	    if (child instanceof RelayQuery.Field) {
	      if (child.getSchemaName() === NODE) {
	        var subFields = child.getChildren();
	        nodeChildren = nodeChildren.concat(subFields);
	        // can skip if `node` only has an `id` field
	        hasNodeChild = hasNodeChild || subFields.length !== 1 || !(subFields[0] instanceof RelayQuery.Field) ||
	        /* $FlowFixMe(>=0.13.0) - subFields[0] needs to be in a local for Flow to
	         * narrow its type, otherwise Flow thinks its a RelayQueryNode without
	         * method `getSchemaName`
	         */
	        subFields[0].getSchemaName() !== 'id';
	      } else {
	        edgeChildren.push(child);
	        hasEdgeChild = hasEdgeChild || !child.isRequisite();
	      }
	    } else if (child instanceof RelayQuery.Fragment) {
	      var _splitNodeAndEdgesFields2 = splitNodeAndEdgesFields(child);

	      var edges = _splitNodeAndEdgesFields2.edges;
	      var node = _splitNodeAndEdgesFields2.node;

	      if (edges) {
	        edgeChildren.push(edges);
	        hasEdgeChild = true;
	      }
	      if (node) {
	        nodeChildren.push(node);
	        hasNodeChild = true;
	      }
	    }
	  }
	  return {
	    edges: hasEdgeChild ? edgeOrFragment.clone(edgeChildren) : null,
	    node: hasNodeChild ? edgeOrFragment.clone(nodeChildren) : null
	  };
	}

	module.exports = RelayProfiler.instrument('diffRelayQuery', diffRelayQuery);

/***/ },
/* 158 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule fetchRelayQuery
	 * @typechecks
	 * 
	 */

	'use strict';

	var Promise = __webpack_require__(17);
	var RelayNetworkLayer = __webpack_require__(27);
	var RelayProfiler = __webpack_require__(4);
	var RelayQueryRequest = __webpack_require__(146);

	var resolveImmediate = __webpack_require__(19);

	var queue = null;

	/**
	 * @internal
	 *
	 * Schedules the supplied `query` to be sent to the server.
	 *
	 * This is a low-level transport API; application code should use higher-level
	 * interfaces exposed by RelayContainer for retrieving data transparently via
	 * queries defined on components.
	 */
	function fetchRelayQuery(query) {
	  if (!queue) {
	    queue = [];
	    var currentQueue = queue;
	    resolveImmediate(function () {
	      queue = null;
	      profileQueue(currentQueue);
	      processQueue(currentQueue);
	    });
	  }
	  var request = new RelayQueryRequest(query);
	  queue.push(request);
	  return request.getPromise();
	}

	function processQueue(currentQueue) {
	  RelayNetworkLayer.sendQueries(currentQueue);
	}

	/**
	 * Profiles time from request to receiving the first server response.
	 */
	function profileQueue(currentQueue) {
	  var profiler = RelayProfiler.profile('fetchRelayQuery');
	  var promises = currentQueue.map(function (request) {
	    return request.getPromise();
	  });
	  Promise.race(promises)['finally'](profiler.stop);
	}

	module.exports = fetchRelayQuery;

/***/ },
/* 159 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule flattenSplitRelayQueries
	 * 
	 * @typechecks
	 */

	/**
	 * Flattens the nested structure returned by `splitDeferredRelayQueries`.
	 *
	 * Right now our internals discard the information about the relationship
	 * between the queries that is encoded in the nested structure.
	 *
	 * @internal
	 */
	'use strict';

	var _toConsumableArray = __webpack_require__(29)['default'];

	function flattenSplitRelayQueries(splitQueries) {
	  var flattenedQueries = [];
	  var queue = [splitQueries];
	  while (queue.length) {
	    splitQueries = queue.shift();
	    var _splitQueries = splitQueries;
	    var required = _splitQueries.required;
	    var deferred = _splitQueries.deferred;

	    if (required) {
	      flattenedQueries.push(required);
	    }
	    if (deferred.length) {
	      queue.push.apply(queue, _toConsumableArray(deferred));
	    }
	  }
	  return flattenedQueries;
	}

	module.exports = flattenSplitRelayQueries;

/***/ },
/* 160 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule generateRQLFieldAlias
	 * @typechecks
	 */

	'use strict';

	var crc32 = __webpack_require__(106);

	var PREFIX = '_';

	/**
	 * Sanitizes a stringified GraphQL field (including any calls and their values)
	 * to produce a valid alias.
	 *
	 * This is used to auto-alias fields in generated queries, so that developers
	 * composing multiple components together don't have to worry about collisions
	 * between components requesting the same fields. (Explicit aliases are only
	 * needed within a single component when it uses the same field multiple times,
	 * in order to differentiate these fields in the props).
	 *
	 * @internal
	 *
	 * @param {string} input
	 * @return {string}
	 */
	function generateRQLFieldAlias(input) {
	  // Field names with no calls can be used as aliases without encoding
	  var index = input.indexOf('.');
	  if (index === -1) {
	    return input;
	  }

	  return PREFIX + input.substr(0, index) + crc32(input).toString(36);
	}

	module.exports = generateRQLFieldAlias;

/***/ },
/* 161 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule inferRelayFieldsFromData
	 * @typechecks
	 * 
	 */

	'use strict';

	var GraphQLStoreDataHandler = __webpack_require__(8);
	var RelayConnectionInterface = __webpack_require__(9);
	var RelayQuery = __webpack_require__(3);

	var forEachObject = __webpack_require__(7);
	var invariant = __webpack_require__(1);

	var FIELD_ARGUMENT_ENCODING = /^(\w+)\((.*?)\)$/;
	var NODE = RelayConnectionInterface.NODE;
	var EDGES = RelayConnectionInterface.EDGES;

	/**
	 * @internal
	 *
	 * Given a record-like object, infers fields that could be used to fetch them.
	 * Properties that are fetched via fields with arguments can be encoded by
	 * serializing the arguments in property keys.
	 */
	function inferRelayFieldsFromData(data) {
	  var fields = [];
	  forEachObject(data, function (value, key) {
	    if (!GraphQLStoreDataHandler.isMetadataKey(key)) {
	      fields.push(inferField(value, key));
	    }
	  });
	  return fields;
	}

	function inferField(value, key) {
	  var children;
	  var metadata;
	  if (Array.isArray(value)) {
	    var element = value[0];
	    if (element && typeof element === 'object') {
	      children = inferRelayFieldsFromData(element);
	    } else {
	      children = [];
	    }
	    metadata = { plural: true };
	  } else if (typeof value === 'object' && value !== null) {
	    children = inferRelayFieldsFromData(value);
	  } else {
	    children = [];
	  }
	  if (key === NODE) {
	    children.push(RelayQuery.Node.buildField('id'));
	  } else if (key === EDGES) {
	    children.push(RelayQuery.Node.buildField('cursor'));
	  }
	  return buildField(key, children, metadata);
	}

	function buildField(key, children, metadata) {
	  var fieldName = key;
	  var calls = null;
	  var parts = key.split('.');
	  if (parts.length > 1) {
	    fieldName = parts.shift();
	    calls = parts.map(function (callString) {
	      var captures = callString.match(FIELD_ARGUMENT_ENCODING);
	      !captures ?  true ? invariant(false, 'inferRelayFieldsFromData(): Malformed data key, `%s`.', key) : invariant(false) : undefined;
	      var value = captures[2].split(',');
	      return {
	        name: captures[1],
	        value: value.length === 1 ? value[0] : value
	      };
	    });
	  }
	  return RelayQuery.Node.buildField(fieldName, calls, children, metadata);
	}

	module.exports = inferRelayFieldsFromData;

/***/ },
/* 162 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule intersectRelayQuery
	 * @typechecks
	 * 
	 */

	'use strict';

	var _inherits = __webpack_require__(6)['default'];

	var _classCallCheck = __webpack_require__(2)['default'];

	var RelayConnectionInterface = __webpack_require__(9);
	var RelayQuery = __webpack_require__(3);
	var RelayQueryTransform = __webpack_require__(58);

	var invariant = __webpack_require__(1);

	/**
	 * @internal
	 *
	 * `intersectRelayQuery(subjectNode, patternNode)` returns a node with fields in
	 * `subjectNode` that also exist in `patternNode`. `patternNode` is expected to
	 * be flattened (and not contain fragments).
	 *
	 * If any field in `patternNode` is unterminated (i.e. has no sub-fields), we
	 * treat the field as though it contains every descendant sub-field.
	 *
	 * If `filterUnterminatedRange` is supplied, it will be invoked with any fields
	 * from `subjectNode` that are connections and unterminated in `patternNode`. If
	 * it returns true, the `edges` and `page_info` fields will be filtered out.
	 */
	function intersectRelayQuery(subjectNode, patternNode, filterUnterminatedRange) {
	  filterUnterminatedRange = filterUnterminatedRange || returnsFalse;
	  var visitor = new RelayQueryIntersector(filterUnterminatedRange);
	  return visitor.traverse(subjectNode, patternNode);
	}

	var RelayQueryIntersector = (function (_RelayQueryTransform) {
	  _inherits(RelayQueryIntersector, _RelayQueryTransform);

	  function RelayQueryIntersector(filterUnterminatedRange) {
	    _classCallCheck(this, RelayQueryIntersector);

	    _RelayQueryTransform.call(this);
	    this._filterUnterminatedRange = filterUnterminatedRange;
	  }

	  /**
	   * @private
	   */

	  RelayQueryIntersector.prototype.traverse = function traverse(subjectNode, patternNode) {
	    var _this = this;

	    if (subjectNode.isScalar()) {
	      // Since `patternNode` exists, `subjectNode` must be in the intersection.
	      return subjectNode;
	    }
	    if (!hasChildren(patternNode)) {
	      if (subjectNode instanceof RelayQuery.Field && subjectNode.isConnection() && this._filterUnterminatedRange(subjectNode)) {
	        return filterRangeFields(subjectNode);
	      }
	      // Unterminated `patternNode` is the same as containing every descendant
	      // sub-field, so `subjectNode` must be in the intersection.
	      return subjectNode;
	    }
	    return subjectNode.clone(subjectNode.getChildren().map(function (subjectChild) {
	      if (subjectChild instanceof RelayQuery.Fragment) {
	        return _this.visit(subjectChild, patternNode);
	      }
	      if (subjectChild instanceof RelayQuery.Field) {
	        var schemaName = subjectChild.getSchemaName();
	        var patternChild;
	        var patternChildren = patternNode.getChildren();
	        for (var ii = 0; ii < patternChildren.length; ii++) {
	          var child = patternChildren[ii];
	          !(child instanceof RelayQuery.Field) ?  true ? invariant(false, 'intersectRelayQuery(): Nodes in `patternNode` must be fields.') : invariant(false) : undefined;
	          if (child.getSchemaName() === schemaName) {
	            patternChild = child;
	            break;
	          }
	        }
	        if (patternChild) {
	          return _this.visit(subjectChild, patternChild);
	        }
	      }
	      return null;
	    }));
	  };

	  return RelayQueryIntersector;
	})(RelayQueryTransform);

	var RelayQueryRangeFilter = (function (_RelayQueryTransform2) {
	  _inherits(RelayQueryRangeFilter, _RelayQueryTransform2);

	  function RelayQueryRangeFilter() {
	    _classCallCheck(this, RelayQueryRangeFilter);

	    _RelayQueryTransform2.apply(this, arguments);
	  }

	  RelayQueryRangeFilter.prototype.visitField = function visitField(node) {
	    var schemaName = node.getSchemaName();
	    if (schemaName === RelayConnectionInterface.EDGES || schemaName === RelayConnectionInterface.PAGE_INFO) {
	      return null;
	    } else {
	      return node;
	    }
	  };

	  return RelayQueryRangeFilter;
	})(RelayQueryTransform);

	var rangeFilter = new RelayQueryRangeFilter();
	function filterRangeFields(node) {
	  return rangeFilter.traverse(node, undefined);
	}

	function returnsFalse() {
	  return false;
	}

	function hasChildren(node) {
	  return !node.getChildren().every(isGenerated);
	}

	function isGenerated(node) {
	  return node.isGenerated();
	}

	module.exports = intersectRelayQuery;

/***/ },
/* 163 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule observeAllRelayQueryData
	 * @typechecks
	 * 
	 */

	'use strict';

	var _classCallCheck = __webpack_require__(2)['default'];

	var _slicedToArray = __webpack_require__(22)['default'];

	var _Object$keys = __webpack_require__(5)['default'];

	var emptyFunction = __webpack_require__(33);
	var filterExclusiveKeys = __webpack_require__(61);
	var forEachObject = __webpack_require__(7);
	var invariant = __webpack_require__(1);
	var observeRelayQueryData = __webpack_require__(90);

	var DATAID_REMOVED = {};

	function observeAllRelayQueryData(store, queryNode, dataIDs, options) {
	  return new RelayQueryMultipleDataObservable(function (dataID) {
	    return observeRelayQueryData(store, queryNode, dataID, options);
	  }, dataIDs);
	}

	var RelayQueryMultipleDataObservable = (function () {
	  function RelayQueryMultipleDataObservable(observeRelayQueryData, dataIDs) {
	    _classCallCheck(this, RelayQueryMultipleDataObservable);

	    this._activeSubscriptions = 0;
	    this._dataIDs = _Object$keys(toObject(dataIDs));
	    this._lastError = null;
	    this._observeRelayQueryData = observeRelayQueryData;
	    this._observers = null;
	    this._shouldExecuteCallbacks = false;
	    this._subscribeCalls = [];
	    this._subscriptions = {};
	    this._wrappedData = {};
	  }

	  /**
	   * Returns a new object with the keys in the same order as they appear in
	   * `reference`.
	   */

	  RelayQueryMultipleDataObservable.prototype.subscribe = function subscribe(callbacks) {
	    var _this = this;

	    // An error occurred earlier, it is no longer possible to subscribe to this
	    // observer
	    if (this._lastError) {
	      callbacks.onError(this._lastError);
	      return {
	        dispose: emptyFunction
	      };
	    }

	    // Only create observers on the first subscribe call
	    if (!this._observers) {
	      this._setupObservers(this._dataIDs);
	    }

	    // List of indices of where in the list of subscription per dataID this
	    // subscription is
	    var dataIDToSubscriptionIndex = {};
	    this._addSubscriptions(this._dataIDs, dataIDToSubscriptionIndex, callbacks);

	    // An error occurred while creating the subscriptions, rolling back
	    if (this._lastError) {
	      callbacks.onError(this._lastError);
	      this._disposeSubscriptions(dataIDToSubscriptionIndex);
	      return {
	        dispose: emptyFunction
	      };
	    }
	    this._subscribeCalls.push({ callbacks: callbacks, dataIDToSubscriptionIndex: dataIDToSubscriptionIndex });

	    callbacks.onNext(unwrapData(this._wrappedData));
	    var index = this._subscribeCalls.length - 1;
	    var isDisposed = false;
	    this._activeSubscriptions++;

	    return {
	      dispose: function dispose() {
	        !!isDisposed ?  true ? invariant(false, 'RelayObserver.dispose(): Subscription was already disposed.') : invariant(false) : undefined;
	        isDisposed = true;

	        _this._activeSubscriptions--;
	        _this._disposeSubscriptions(dataIDToSubscriptionIndex);
	        _this._subscribeCalls[index] = null;

	        if (!_this._activeSubscriptions) {
	          _this._observers = null;
	          _this._subscribeCalls = [];
	          _this._subscriptions = {};
	          _this._wrappedData = {};
	        }
	      }
	    };
	  };

	  /**
	   * Changes the observed dataIDs to the given dataIDs, the order of the new
	   * dataIDs is kept.
	   */

	  RelayQueryMultipleDataObservable.prototype.setDataIDs = function setDataIDs(dataIDs) {
	    var _this2 = this;

	    !!this._lastError ?  true ? invariant(false, 'RelayObserver.setDataIDs(): Unable to update records on a defunct ' + 'observer.') : invariant(false) : undefined;
	    var dataIDSet = toObject(dataIDs);
	    this._dataIDs = _Object$keys(dataIDSet);

	    var _filterExclusiveKeys = filterExclusiveKeys(this._observers, dataIDSet);

	    var _filterExclusiveKeys2 = _slicedToArray(_filterExclusiveKeys, 2);

	    var removedDataIDs = _filterExclusiveKeys2[0];
	    var addedDataIDs = _filterExclusiveKeys2[1];

	    // Unsubscribe subscriptions for removed data IDs
	    removedDataIDs.forEach(function (dataID) {
	      var subscriptions = _this2._subscriptions[dataID];
	      if (subscriptions) {
	        subscriptions.forEach(function (subscription) {
	          subscription && subscription.dispose();
	          _this2._wrappedData[dataID] = DATAID_REMOVED;
	        });
	        _this2._subscriptions[dataID] = null;
	      }
	    });

	    this._setupObservers(addedDataIDs);
	    this._subscribeCalls.forEach(function (call) {
	      // Add the dataIDs to any previously attached callbacks
	      call && _this2._addSubscriptions(addedDataIDs, call.dataIDToSubscriptionIndex);
	    });

	    // All subscriptions have been added and data has been ordered, invoke
	    // callback on all subscriptions
	    if (this._lastError) {
	      this._callOnError();
	    } else {
	      this._wrappedData = reorderObjectKeys(this._dataIDs, this._wrappedData);
	      this._callOnNext();
	    }
	  };

	  /**
	   * Adds subscriptions for dataIDs that were added after the initial call to
	   * `subscribe`.
	   */

	  RelayQueryMultipleDataObservable.prototype._addSubscriptions = function _addSubscriptions(dataIDs, indices) {
	    var _this3 = this;

	    this._shouldExecuteCallbacks = false;
	    dataIDs.forEach(function (dataID) {
	      if (_this3._observers) {
	        var observer = _this3._observers[dataID];
	        if (observer) {
	          var subscriptions = _this3._subscriptions[dataID] || (_this3._subscriptions[dataID] = []);
	          // The index the subscription will be stored at in the array.
	          indices[dataID] = subscriptions.length;
	          subscriptions.push(observer.subscribe({
	            onCompleted: function onCompleted() {
	              return _this3._handleCompleted(dataID);
	            },
	            onError: function onError(error) {
	              return _this3._handleError(dataID, error);
	            },
	            onNext: function onNext(data) {
	              return _this3._handleNext(dataID, data);
	            }
	          }));
	        }
	      }
	    });
	    this._shouldExecuteCallbacks = true;
	  };

	  /**
	   * Calls `onError` on all subscriptions but only if `_shouldExecuteCallbacks`
	   * is `true`. This is handy to prevent excessive calls of `onError` when
	   * observed DataIDs change
	   */

	  RelayQueryMultipleDataObservable.prototype._callOnError = function _callOnError() {
	    var _this4 = this;

	    this._shouldExecuteCallbacks && this._subscribeCalls.forEach(function (call) {
	      call && _this4._lastError && call.callbacks.onError(_this4._lastError);
	    });
	  };

	  /**
	   * Calls `onNext` on all subscriptions but only if `_shouldExecuteCallbacks`
	   * is `true`. This is handy to prevent excessive calls of `onNext` when
	   * observed DataIDs change
	   */

	  RelayQueryMultipleDataObservable.prototype._callOnNext = function _callOnNext() {
	    var _this5 = this;

	    this._shouldExecuteCallbacks && this._subscribeCalls.forEach(function (call) {
	      if (call) {
	        call.callbacks.onNext(unwrapData(_this5._wrappedData));
	      }
	    });
	  };

	  /**
	   * Remove a set of subscriptions based on their dataID
	   */

	  RelayQueryMultipleDataObservable.prototype._disposeSubscriptions = function _disposeSubscriptions(indices) {
	    var _this6 = this;

	    forEachObject(indices, function (index, dataID) {
	      var subscriptions = _this6._subscriptions[dataID];
	      if (subscriptions && subscriptions[index]) {
	        subscriptions[index].dispose();
	        subscriptions[index] = null;
	      }
	    });
	  };

	  RelayQueryMultipleDataObservable.prototype._handleCompleted = function _handleCompleted(dataID) {
	    this._subscribeCalls.forEach(function (call) {
	      call && call.callbacks.onCompleted();
	    });
	  };

	  /**
	   * Notify all subscribers that an error occurred
	   */

	  RelayQueryMultipleDataObservable.prototype._handleError = function _handleError(dataID, error) {
	    this._lastError = error;
	    this._callOnError();
	  };

	  RelayQueryMultipleDataObservable.prototype._handleNext = function _handleNext(dataID, data) {
	    this._wrappedData[dataID] = data;
	    this._callOnNext();
	  };

	  /**
	   * Creates observers for the given dataIDs, if an observer for the given
	   * dataID already exists nothing will be done for this dataID
	   */

	  RelayQueryMultipleDataObservable.prototype._setupObservers = function _setupObservers(dataIDs) {
	    var _this7 = this;

	    if (!this._observers) {
	      this._observers = {};
	    }
	    dataIDs.forEach(function (dataID) {
	      var observer = _this7._observeRelayQueryData(dataID);
	      // Additional check if dataIDToObserver exists for Flow
	      if (_this7._observers) {
	        _this7._observers[dataID] = observer;
	      }
	    });
	  };

	  return RelayQueryMultipleDataObservable;
	})();

	function reorderObjectKeys(reference, input) {
	  var orderedInput = {};
	  reference.forEach(function (key) {
	    !input.hasOwnProperty(key) ?  true ? invariant(false, 'RelayObserver.setDataIDs(): Expected object to have key `%s`.', key) : invariant(false) : undefined;
	    orderedInput[key] = input[key];
	  });
	  return orderedInput;
	}

	function toObject(dataIDs) {
	  var dataIDSet = {};
	  dataIDs.forEach(function (dataID) {
	    dataIDSet[dataID] = null;
	  });
	  return dataIDSet;
	}

	function unwrapData(wrappedData) {
	  var unwrappedData = [];
	  forEachObject(wrappedData, function (data) {
	    if (data !== DATAID_REMOVED) {
	      unwrappedData.push(data);
	    }
	  });
	  return unwrappedData;
	}

	module.exports = observeAllRelayQueryData;

/***/ },
/* 164 */
/***/ function(module, exports) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule prepareRelayContainerProps
	 * @typechecks
	 * 
	 */

	'use strict';

	/**
	 * @internal
	 *
	 * Provides an opportunity for Relay to fork how RelayContainer props are spread
	 * into the inner component.
	 */
	function prepareRelayContainerProps(relayProps) {
	  return { relay: relayProps };
	}

	module.exports = prepareRelayContainerProps;

/***/ },
/* 165 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule recycleNodesInto
	 * @typechecks
	 * 
	 */

	'use strict';

	var _Object$keys = __webpack_require__(5)['default'];

	var GraphQLFragmentPointer = __webpack_require__(37);

	/**
	 * Recycles subtrees from `prevData` by replacing equal subtrees in `nextData`.
	 */
	function recycleNodesInto(prevData, nextData) {
	  if (typeof prevData !== 'object' || !prevData || typeof nextData !== 'object' || !nextData) {
	    return nextData;
	  }
	  var canRecycle = false;
	  if (prevData instanceof GraphQLFragmentPointer) {
	    canRecycle = nextData instanceof GraphQLFragmentPointer && nextData.equals(prevData);
	  } else {
	    var isPrevArray = Array.isArray(prevData);
	    var isNextArray = Array.isArray(nextData);
	    if (isPrevArray && isNextArray) {
	      // Assign local variables to preserve Flow type refinement.
	      var prevArray = prevData;
	      var nextArray = nextData;
	      canRecycle = nextArray.reduce(function (wasEqual, nextItem, ii) {
	        nextArray[ii] = recycleNodesInto(prevArray[ii], nextItem);
	        return wasEqual && nextArray[ii] === prevArray[ii];
	      }, true) && prevArray.length === nextArray.length;
	    } else if (!isPrevArray && !isNextArray) {
	      // Assign local variables to preserve Flow type refinement.
	      var prevObject = prevData;
	      var nextObject = nextData;
	      var prevKeys = _Object$keys(prevObject);
	      var nextKeys = _Object$keys(nextObject);
	      canRecycle = nextKeys.reduce(function (wasEqual, key) {
	        var nextValue = nextObject[key];
	        nextObject[key] = recycleNodesInto(prevObject[key], nextValue);
	        return wasEqual && nextObject[key] === prevObject[key];
	      }, true) && prevKeys.length === nextKeys.length;
	    }
	  }
	  return canRecycle ? prevData : nextData;
	}

	module.exports = recycleNodesInto;

/***/ },
/* 166 */
/***/ function(module, exports) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule sortTypeFirst
	 * @typechecks
	 * 
	 */

	'use strict';

	var TYPE = '__type__';

	function sortTypeFirst(a, b) {
	  if (a === b) {
	    return 0;
	  }
	  if (a === TYPE) {
	    return -1;
	  }
	  if (b === TYPE) {
	    return 1;
	  }
	  if (a < b) {
	    return -1;
	  }
	  // a > b
	  return 1;
	}

	module.exports = sortTypeFirst;

/***/ },
/* 167 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule splitDeferredRelayQueries
	 * 
	 * @typechecks
	 */

	'use strict';

	var _inherits = __webpack_require__(6)['default'];

	var _classCallCheck = __webpack_require__(2)['default'];

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	var GraphQL = __webpack_require__(18);
	var RelayNodeInterface = __webpack_require__(15);
	var RelayProfiler = __webpack_require__(4);
	var RelayQuery = __webpack_require__(3);
	var RelayQueryTransform = __webpack_require__(58);
	var RelayRefQueryDescriptor = __webpack_require__(151);

	var invariant = __webpack_require__(1);

	/**
	 * Traverse `node` splitting off deferred query fragments into separate queries.
	 *
	 * @internal
	 */
	function splitDeferredRelayQueries(node) {
	  var splitter = new GraphQLSplitDeferredQueries();
	  var splitQueries = {
	    __parent__: null,
	    __path__: [],
	    __refQuery__: null,
	    deferred: [],
	    required: null
	  };
	  splitter.visit(node, splitQueries);

	  return buildQueries(splitQueries);
	}

	/**
	 * Returns the requisite siblings of `node`, but filters any non-requisite
	 * children of those siblings.
	 */
	function getRequisiteSiblings(node, parent) {
	  // Get the requisite siblings.
	  var siblings = parent.getChildren().filter(function (child) {
	    return child !== node && child instanceof RelayQuery.Field && child.isRequisite();
	  });

	  // Filter the non-requisite children from those siblings.
	  return siblings.map(function (sibling) {
	    var children = sibling.getChildren().filter(function (child) {
	      return child instanceof RelayQuery.Field && child.isRequisite();
	    });
	    var clone = sibling.clone(children);
	    !clone ?  true ? invariant(false, 'splitDeferredRelayQueries(): Unexpected non-scalar, requisite field.') : invariant(false) : undefined;
	    return clone;
	  });
	}

	/**
	 * Traverse the parent chain of `node` wrapping it at each level until it is
	 * either:
	 *
	 * - wrapped in a RelayQuery.Root node
	 * - wrapped in a non-root node that can be split off in a "ref query" (ie. a
	 *   root call with a ref param that references another query)
	 *
	 * Additionally ensures that any requisite sibling fields are embedded in each
	 * layer of the wrapper.
	 */
	function wrapNode(node, path) {
	  for (var ii = path.length - 1; ii >= 0; ii--) {
	    var parent = path[ii];
	    if (parent instanceof RelayQuery.Field && parent.getInferredRootCallName()) {
	      // We can make a "ref query" at this point, so stop wrapping.
	      return new RelayRefQueryDescriptor(node, path.slice(0, ii + 1));
	    }

	    var siblings = getRequisiteSiblings(node, parent);
	    var children = [node].concat(siblings);

	    // Cast here because we know that `clone` will never return `null` (because
	    // we always give it at least one child).
	    node = parent.clone(children);
	  }
	  !(node instanceof RelayQuery.Root) ?  true ? invariant(false, 'splitDeferredRelayQueries(): Cannot build query without a root node.') : invariant(false) : undefined;
	  var rootCall = node.getRootCall();
	  return RelayQuery.Node.buildRoot(rootCall.name, rootCall.value, node.getChildren(), {
	    isDeferred: true,
	    rootArg: node.getRootCallArgument()
	  }, node.getName());
	}

	/**
	 * Returns `true` if `node` is considered "empty", which means that it contains
	 * no non-generated fields, and no ref query dependencies.
	 */
	function isEmpty(node) {
	  if (node.isScalar()) {
	    return node.isGenerated() && !node.isRefQueryDependency();
	  } else {
	    return node.getChildren().every(isEmpty);
	  }
	}

	/**
	 * Mutates and returns a nested `SplitQueries` structure, updating any deferred
	 * "ref queries" to actually reference their contexts.
	 */
	function buildQueries(splitQueries) {
	  if (splitQueries.required && isEmpty(splitQueries.required)) {
	    splitQueries.required = null;
	  }
	  splitQueries.deferred = splitQueries.deferred.map(function (nestedSplitQueries) {
	    var descriptor = nestedSplitQueries.__refQuery__;
	    if (descriptor) {
	      // Wrap the ref query node with a reference to the required query that is
	      // its context.
	      var context = splitQueries.required;
	      if (!context) {
	        // Traverse upwards looking for context.
	        var parentSplitQueries = splitQueries;
	        while (parentSplitQueries.__parent__) {
	          context = parentSplitQueries.__parent__.required;
	          if (context) {
	            break;
	          }
	          parentSplitQueries = parentSplitQueries.__parent__;
	        }
	      }
	      !context ?  true ? invariant(false, 'splitDeferredRelayQueries(): Expected a context root query.') : invariant(false) : undefined;
	      nestedSplitQueries.required = createRefQuery(descriptor, context);
	    }

	    return buildQueries(nestedSplitQueries);
	  });
	  return splitQueries;
	}

	/**
	 * Wraps `descriptor` in a new top-level ref query.
	 */
	function createRefQuery(descriptor, context) {
	  var node = descriptor.node;
	  !(node instanceof RelayQuery.Field || node instanceof RelayQuery.Fragment) ?  true ? invariant(false, 'splitDeferredRelayQueries(): Ref query requires a field or fragment.') : invariant(false) : undefined;

	  // Build up JSONPath.
	  var path = ['$', '*'];
	  var parent;
	  for (var ii = 0; ii < descriptor.path.length; ii++) {
	    parent = descriptor.path[ii];
	    if (parent instanceof RelayQuery.Field) {
	      path.push(parent.getSerializationKey());
	      if (parent.isPlural()) {
	        path.push('*');
	      }
	    }
	  }
	  !(path.length > 2) ?  true ? invariant(false, 'splitDeferredRelayQueries(): Ref query requires a complete path.') : invariant(false) : undefined;
	  var field = parent; // Flow
	  var primaryKey = field.getInferredPrimaryKey();
	  !primaryKey ?  true ? invariant(false, 'splitDeferredRelayQueries(): Ref query requires a primary key.') : invariant(false) : undefined;
	  path.push(primaryKey);

	  // Create the wrapper root query.
	  var root = RelayQuery.Node.buildRoot(RelayNodeInterface.NODES, new GraphQL.BatchCallVariable(context.getID(), path.join('.')), [node], {
	    isDeferred: true,
	    rootArg: RelayNodeInterface.ID
	  }, context.getName());

	  var result = root; // Flow
	  return result;
	}

	/**
	 * Traverses an input query, updating the passed in `SplitQueries` state object
	 * to contain a nested structure representing the required and deferred portions
	 * of the input query.
	 */

	var GraphQLSplitDeferredQueries = (function (_RelayQueryTransform) {
	  _inherits(GraphQLSplitDeferredQueries, _RelayQueryTransform);

	  function GraphQLSplitDeferredQueries() {
	    _classCallCheck(this, GraphQLSplitDeferredQueries);

	    _RelayQueryTransform.apply(this, arguments);
	  }

	  GraphQLSplitDeferredQueries.prototype.visitField = function visitField(node, splitQueries) {
	    if (!node.hasDeferredDescendant()) {
	      return node;
	    }

	    splitQueries.__path__.push(node);
	    var result = this.traverse(node, splitQueries);
	    splitQueries.__path__.pop();

	    if (result && node.getInferredRootCallName()) {
	      // The node is a ref query dependency; mark it as one.
	      var key = node.getInferredPrimaryKey();
	      var children = result.getChildren().map(function (child) {
	        if (child instanceof RelayQuery.Field && child.getSchemaName() === key) {
	          return child.cloneAsRefQueryDependency();
	        } else {
	          return child;
	        }
	      });
	      result = result.clone(children);
	    }

	    return result;
	  };

	  GraphQLSplitDeferredQueries.prototype.visitFragment = function visitFragment(node, splitQueries) {
	    if (!node.getChildren().length) {
	      return null;
	    }

	    if (node.isDeferred()) {
	      var path = splitQueries.__path__;
	      var deferred = {
	        __parent__: splitQueries,
	        __path__: path,
	        __refQuery__: null,
	        deferred: [],
	        required: null
	      };
	      var result = this.traverse(node, deferred);
	      if (result) {
	        var wrapped = wrapNode(result, path);
	        if (wrapped instanceof RelayQuery.Root) {
	          deferred.required = wrapped;
	        } else if (wrapped instanceof RelayRefQueryDescriptor) {
	          // for Flow
	          deferred.__refQuery__ = wrapped;
	        }
	      }
	      if (result || deferred.deferred.length) {
	        splitQueries.deferred.push(deferred);
	      }
	      return null;
	    } else if (node.hasDeferredDescendant()) {
	      return this.traverse(node, splitQueries);
	    } else {
	      return node;
	    }
	  };

	  GraphQLSplitDeferredQueries.prototype.visitRoot = function visitRoot(node, splitQueries) {
	    var result;
	    if (!node.hasDeferredDescendant()) {
	      splitQueries.required = node;
	      return node;
	    } else {
	      splitQueries.__path__.push(node);
	      result = this.traverse(node, splitQueries);
	      splitQueries.__path__.pop();
	      splitQueries.required = result;
	      return result;
	    }
	  };

	  return GraphQLSplitDeferredQueries;
	})(RelayQueryTransform);

	var instrumented = RelayProfiler.instrument('splitDeferredRelayQueries', splitDeferredRelayQueries);

	// #7573861: Type export collides with CommonJS export in presence of
	// `instrument()` call:
	module.exports = instrumented;

/***/ },
/* 168 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule subtractRelayQuery
	 * 
	 * @typechecks
	 */

	'use strict';

	var _inherits = __webpack_require__(6)['default'];

	var _classCallCheck = __webpack_require__(2)['default'];

	var RelayProfiler = __webpack_require__(4);
	var RelayQuery = __webpack_require__(3);
	var RelayQueryTransform = __webpack_require__(58);

	var areEqual = __webpack_require__(108);
	var invariant = __webpack_require__(1);

	/**
	 * @internal
	 *
	 * `subtractRelayQuery(minuend, subtrahend)` returns a new query
	 * that matches the structure of `minuend`, minus any fields which also
	 * occur in `subtrahend`. Returns null if all fields can be subtracted,
	 * `minuend` if no fields can be subtracted, and a new query otherwise.
	 */
	function subtractRelayQuery(minuend, subtrahend) {
	  var visitor = new RelayQuerySubtractor();
	  var state = {
	    isEmpty: true,
	    subtrahend: subtrahend
	  };
	  var diff = visitor.visit(minuend, state);
	  if (!state.isEmpty) {
	    !(diff instanceof RelayQuery.Root) ?  true ? invariant(false, 'subtractRelayQuery(): Expected a subtracted query root.') : invariant(false) : undefined;
	    return diff;
	  }
	  return null;
	}

	var RelayQuerySubtractor = (function (_RelayQueryTransform) {
	  _inherits(RelayQuerySubtractor, _RelayQueryTransform);

	  function RelayQuerySubtractor() {
	    _classCallCheck(this, RelayQuerySubtractor);

	    _RelayQueryTransform.apply(this, arguments);
	  }

	  /**
	   * Determine if the subtree is effectively 'empty'; all non-metadata sub-fields
	   * have been removed.
	   */

	  RelayQuerySubtractor.prototype.visitRoot = function visitRoot(node, state) {
	    var subtrahend = state.subtrahend;

	    !(subtrahend instanceof RelayQuery.Root) ?  true ? invariant(false, 'subtractRelayQuery(): Cannot subtract a non-root node from a root.') : invariant(false) : undefined;
	    if (!canSubtractRoot(node, subtrahend)) {
	      state.isEmpty = false;
	      return node;
	    }
	    return this._subtractChildren(node, state);
	  };

	  RelayQuerySubtractor.prototype.visitFragment = function visitFragment(node, state) {
	    return this._subtractChildren(node, state);
	  };

	  RelayQuerySubtractor.prototype.visitField = function visitField(node, state) {
	    var diff;
	    if (node.isScalar()) {
	      diff = this._subtractScalar(node, state);
	    } else if (node.isConnection()) {
	      diff = this._subtractConnection(node, state);
	    } else {
	      diff = this._subtractField(node, state);
	    }
	    if (diff && (diff.isRequisite() || !state.isEmpty)) {
	      return diff;
	    }
	    return null;
	  };

	  RelayQuerySubtractor.prototype._subtractScalar = function _subtractScalar(node, state) {
	    var subField = state.subtrahend.getField(node);

	    if (subField && !node.isRequisite()) {
	      return null;
	    }
	    state.isEmpty = isEmptyField(node);
	    return node;
	  };

	  RelayQuerySubtractor.prototype._subtractConnection = function _subtractConnection(node, state) {
	    var subtrahendRanges = getMatchingRangeFields(node, state.subtrahend);

	    if (!subtrahendRanges.length) {
	      state.isEmpty = isEmptyField(node);
	      return node;
	    }

	    var diff = node;
	    var fieldState;
	    for (var ii = 0; ii < subtrahendRanges.length; ii++) {
	      fieldState = {
	        isEmpty: true,
	        subtrahend: subtrahendRanges[ii]
	      };
	      diff = this._subtractChildren(diff, fieldState);
	      state.isEmpty = fieldState.isEmpty;
	      if (!diff) {
	        break;
	      }
	    }
	    return diff;
	  };

	  /**
	   * Subtract a non-scalar/range field.
	   */

	  RelayQuerySubtractor.prototype._subtractField = function _subtractField(node, state) {
	    var subField = state.subtrahend.getField(node);

	    if (!subField) {
	      state.isEmpty = isEmptyField(node);
	      return node;
	    }

	    var fieldState = {
	      isEmpty: true,
	      subtrahend: subField
	    };
	    var diff = this._subtractChildren(node, fieldState);
	    state.isEmpty = fieldState.isEmpty;
	    return diff;
	  };

	  /**
	   * Subtracts any RelayQuery.Node that contains subfields.
	   */

	  RelayQuerySubtractor.prototype._subtractChildren = function _subtractChildren(node, state) {
	    var _this = this;

	    return node.clone(node.getChildren().map(function (child) {
	      var childState = {
	        isEmpty: true,
	        subtrahend: state.subtrahend
	      };
	      var diff = _this.visit(child, childState);
	      state.isEmpty = state.isEmpty && childState.isEmpty;
	      return diff;
	    }));
	  };

	  return RelayQuerySubtractor;
	})(RelayQueryTransform);

	function isEmptyField(node) {
	  if (node instanceof RelayQuery.Field && node.isScalar()) {
	    // Note: product-specific hacks use aliased cursors/ids to poll for data.
	    // Without the alias check these queries would be considered empty.
	    return node.isRequisite() && !node.isRefQueryDependency() && node.getApplicationName() === node.getSchemaName();
	  } else {
	    return node.getChildren().every(isEmptyField);
	  }
	}

	/**
	 * Determine if the two queries have the same root call & args.
	 */
	function canSubtractRoot(min, sub) {
	  var minArg = min.getRootCall();
	  var subArg = sub.getRootCall();
	  return areEqual(minArg, subArg);
	}

	/**
	 * Find all subfields that may overlap with the range rooted at `node`.
	 */
	function getMatchingRangeFields(node, subtrahend) {
	  return subtrahend.getChildren().filter(function (child) {
	    return child instanceof RelayQuery.Field && canSubtractField(node, child);
	  });
	}

	/**
	 * Determine if `minField` is a subset of the range specified by `subField`
	 * such that they can be subtracted.
	 */
	function canSubtractField(minField, subField) {
	  if (minField.getSchemaName() !== subField.getSchemaName()) {
	    return false;
	  }
	  var minArgs = minField.getCallsWithValues();
	  var subArgs = subField.getCallsWithValues();
	  if (minArgs.length !== subArgs.length) {
	    return false;
	  }
	  return minArgs.every(function (minArg, ii) {
	    var subArg = subArgs[ii];
	    if (subArg == null) {
	      return false;
	    }
	    if (minArg.name !== subArg.name) {
	      return false;
	    }
	    if (minArg.name === 'first' || minArg.name === 'last') {
	      /* $FlowFixMe(>=0.13.0)
	       *
	       * subArg and minArg are of type 'Call' (defined in RelayQueryField) which
	       * specifies that its 'value' property is nullable. This code assumes that
	       * it is not, however, and Flow points out that it may produce
	       * `parseInt('undefined')`.
	       */
	      return parseInt('' + minArg.value, 10) <= parseInt('' + subArg.value, 10);
	    }
	    return areEqual(minArg.value, subArg.value);
	  });
	}

	module.exports = RelayProfiler.instrument('subtractRelayQuery', subtractRelayQuery);

/***/ },
/* 169 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule validateRelayReadQuery
	 * 
	 * @typechecks
	 */

	'use strict';

	var _inherits = __webpack_require__(6)['default'];

	var _classCallCheck = __webpack_require__(2)['default'];

	var RelayQueryVisitor = __webpack_require__(21);

	var emptyFunction = __webpack_require__(33);

	var SERIALIZATION_KEY = '__serializationKey__'; // task #7117200

	var validateRelayReadQuery = emptyFunction;

	if (true) {
	  // Wrap in an IIFE to avoid unwanted function hoisting.
	  (function () {
	    /**
	     * @internal
	     *
	     * `validateRelayReadQuery` is a `__DEV__`-only validator that checks that a
	     * query used to read data from `RelayStore` is well-formed. Validation
	     * problems are reported via `console.error`.
	     *
	     * At the moment, "well-formed" means that the query does not contain
	     * duplicate aliases.
	     */
	    validateRelayReadQuery = function validateRelayReadQuery(queryNode, options) {
	      var validator = new RelayStoreReadValidator(options);
	      validator.visit(queryNode, {});
	    };

	    function assertUniqueAlias(field, aliasMap) {
	      var serializationKey = field.getSerializationKey();
	      if (aliasMap[SERIALIZATION_KEY]) {
	        if (aliasMap[SERIALIZATION_KEY] !== serializationKey) {
	          console.error('`%s` is used as an alias more than once. Please use unique ' + 'aliases.', field.getApplicationName());
	        }
	      } else {
	        aliasMap[SERIALIZATION_KEY] = serializationKey;
	      }
	    }

	    /**
	     * Returns the nested AliasMap for `node`, initializing it to an empty map
	     * if it does not already exist.
	     */
	    function getAliasMap(node, aliasMap) {
	      var applicationName = node.getApplicationName();
	      if (!aliasMap[applicationName]) {
	        aliasMap[applicationName] = {};
	      }
	      return aliasMap[applicationName];
	    }

	    var RelayStoreReadValidator = (function (_RelayQueryVisitor) {
	      _inherits(RelayStoreReadValidator, _RelayQueryVisitor);

	      function RelayStoreReadValidator(options) {
	        _classCallCheck(this, RelayStoreReadValidator);

	        _RelayQueryVisitor.call(this);
	        this._traverseFragmentReferences = options && options.traverseFragmentReferences || false;
	      }

	      RelayStoreReadValidator.prototype.visitField = function visitField(node, aliasMap) {
	        aliasMap = getAliasMap(node, aliasMap);
	        assertUniqueAlias(node, aliasMap);

	        if (node.isGenerated()) {
	          return;
	        } else if (node.isScalar()) {
	          return;
	        } else if (node.isPlural()) {
	          this._readPlural(node, aliasMap);
	        } else {
	          // No special handling needed for connections, edges, page_info etc.
	          this._readLinkedField(node, aliasMap);
	        }
	      };

	      RelayStoreReadValidator.prototype.visitFragment = function visitFragment(node, aliasMap) {
	        if (this._traverseFragmentReferences || !node.isReferenceFragment()) {
	          this.traverse(node, aliasMap);
	        }
	      };

	      RelayStoreReadValidator.prototype._readPlural = function _readPlural(node, aliasMap) {
	        var _this = this;

	        node.getChildren().forEach(function (child) {
	          return _this.visit(child, aliasMap);
	        });
	      };

	      RelayStoreReadValidator.prototype._readLinkedField = function _readLinkedField(node, aliasMap) {
	        aliasMap = getAliasMap(node, aliasMap);
	        this.traverse(node, aliasMap);
	      };

	      return RelayStoreReadValidator;
	    })(RelayQueryVisitor);
	  })();
	}

	module.exports = validateRelayReadQuery;

/***/ },
/* 170 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule writeRelayQueryPayload
	 * 
	 * @typechecks
	 */

	/**
	 * @internal
	 *
	 * Traverses a query and payload in parallel, writing the results into the
	 * store.
	 */
	'use strict';

	var RelayNodeInterface = __webpack_require__(15);
	var RelayProfiler = __webpack_require__(4);

	var RelayQueryPath = __webpack_require__(57);
	function writeRelayQueryPayload(writer, query, payload) {
	  var store = writer.getRecordStore();
	  var path = new RelayQueryPath(query);

	  RelayNodeInterface.getResultsFromPayload(store, query, payload).forEach(function (_ref) {
	    var dataID = _ref.dataID;
	    var result = _ref.result;

	    writer.writePayload(query, dataID, result, path);
	  });
	}

	module.exports = RelayProfiler.instrument('writeRelayQueryPayload', writeRelayQueryPayload);

/***/ },
/* 171 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule writeRelayUpdatePayload
	 * 
	 * @typechecks
	 */

	'use strict';

	var _defineProperty = __webpack_require__(65)['default'];

	var _extends = __webpack_require__(11)['default'];

	var GraphQLMutatorConstants = __webpack_require__(54);
	var RelayConnectionInterface = __webpack_require__(9);

	var RelayMutationTracker = __webpack_require__(142);
	var RelayMutationType = __webpack_require__(79);
	var RelayNodeInterface = __webpack_require__(15);
	var RelayQuery = __webpack_require__(3);
	var RelayQueryPath = __webpack_require__(57);

	var RelayProfiler = __webpack_require__(4);
	var RelayRecordStatus = __webpack_require__(42);

	var generateClientEdgeID = __webpack_require__(85);
	var generateClientID = __webpack_require__(62);
	var invariant = __webpack_require__(1);
	var printRelayQueryCall = __webpack_require__(45);
	var warning = __webpack_require__(10);

	var CLIENT_MUTATION_ID = RelayConnectionInterface.CLIENT_MUTATION_ID;
	var EDGES = RelayConnectionInterface.EDGES;
	var APPEND = GraphQLMutatorConstants.APPEND;
	var PREPEND = GraphQLMutatorConstants.PREPEND;
	var REMOVE = GraphQLMutatorConstants.REMOVE;

	var EDGES_FIELD = RelayQuery.Node.buildField(EDGES, null, null, { plural: true });
	var EMPTY = '';
	var ID = 'id';
	var IGNORED_KEYS = _defineProperty({
	  error: true
	}, CLIENT_MUTATION_ID, true);
	var STUB_CURSOR_ID = 'client:cursor';

	/**
	 * @internal
	 *
	 * Applies the results of an update operation (mutation/subscription) to the
	 * store.
	 */
	function writeRelayUpdatePayload(writer, operation, payload, _ref) {
	  var configs = _ref.configs;
	  var isOptimisticUpdate = _ref.isOptimisticUpdate;

	  configs.forEach(function (config) {
	    switch (config.type) {
	      case RelayMutationType.NODE_DELETE:
	        handleNodeDelete(writer, payload, config);
	        break;
	      case RelayMutationType.RANGE_ADD:
	        handleRangeAdd(writer, payload, operation, config, isOptimisticUpdate);
	        break;
	      case RelayMutationType.RANGE_DELETE:
	        handleRangeDelete(writer, payload, config);
	        break;
	      case RelayMutationType.FIELDS_CHANGE:
	      case RelayMutationType.REQUIRED_CHILDREN:
	        break;
	      default:
	        console.error('Expected a valid mutation handler type, got `%s`.', config.type);
	    }
	  });

	  handleMerge(writer, payload, operation);
	}

	/**
	 * Handles the payload for a node deletion mutation, reading the ID of the node
	 * to delete from the payload based on the config and then deleting references
	 * to the node.
	 */
	function handleNodeDelete(writer, payload, config) {
	  var recordIDs = payload[config.deletedIDFieldName];
	  if (!recordIDs) {
	    // for some mutations, deletions don't always occur so if there's no field
	    // in the payload, carry on
	    return;
	  }

	  if (Array.isArray(recordIDs)) {
	    recordIDs.forEach(function (id) {
	      deleteRecord(writer, id);
	    });
	  } else {
	    deleteRecord(writer, recordIDs);
	  }
	}

	/**
	 * Deletes the record from the store, also removing any references to the node
	 * from any ranges that contain it (along with the containing edges).
	 */
	function deleteRecord(writer, recordID) {
	  var store = writer.getRecordStore();
	  // skip if already deleted
	  var status = store.getRecordStatus(recordID);
	  if (status === RelayRecordStatus.NONEXISTENT) {
	    return;
	  }

	  // Delete the node from any ranges it may be a part of
	  var connectionIDs = store.getConnectionIDsForRecord(recordID);
	  if (connectionIDs) {
	    connectionIDs.forEach(function (connectionID) {
	      var edgeID = generateClientEdgeID(connectionID, recordID);
	      store.applyRangeUpdate(connectionID, edgeID, REMOVE);
	      writer.recordUpdate(edgeID);
	      writer.recordUpdate(connectionID);
	      // edges are never nodes, so this will not infinitely recurse
	      deleteRecord(writer, edgeID);
	    });
	  }

	  // delete the node
	  store.deleteRecord(recordID);
	  writer.recordUpdate(recordID);
	}

	/**
	 * Handles merging the results of the mutation/subscription into the store,
	 * updating each top-level field in the data according the fetched
	 * fields/fragments.
	 */
	function handleMerge(writer, payload, operation) {
	  var store = writer.getRecordStore();

	  // because optimistic payloads may not contain all fields, we loop over
	  // the data that is present and then have to recurse the query to find
	  // the matching fields.
	  //
	  // TODO #7167718: more efficient mutation/subscription writes
	  for (var fieldName in payload) {
	    if (!payload.hasOwnProperty(fieldName)) {
	      continue;
	    }
	    var payloadData = payload[fieldName];
	    if (payloadData == null || typeof payloadData !== 'object') {
	      continue;
	    }
	    // if the field is an argument-less root call, determine the corresponding
	    // root record ID
	    var rootID = store.getRootCallID(fieldName, EMPTY);
	    // check for valid data (has an ID or is an array) and write the field
	    if (ID in payloadData || rootID || Array.isArray(payloadData)) {
	      mergeField(writer, fieldName, payloadData, // checked above: != null and typeof object
	      operation);
	    }
	  }
	}

	/**
	 * Merges the results of a single top-level field into the store.
	 */
	function mergeField(writer, fieldName, payload, operation) {
	  // don't write mutation/subscription metadata fields
	  if (fieldName in IGNORED_KEYS) {
	    return;
	  }
	  if (Array.isArray(payload)) {
	    payload.forEach(function (item) {
	      if (item[ID]) {
	        mergeField(writer, fieldName, item, operation);
	      }
	    });
	    return;
	  }

	  var store = writer.getRecordStore();
	  var recordID = payload[ID];
	  var path;

	  if (recordID) {
	    path = new RelayQueryPath(RelayQuery.Node.buildRoot(RelayNodeInterface.NODE, recordID, null, { rootArg: RelayNodeInterface.ID }));
	  } else {
	    recordID = store.getRootCallID(fieldName, EMPTY);
	    // Root fields that do not accept arguments
	    path = new RelayQueryPath(RelayQuery.Node.buildRoot(fieldName));
	  }
	  !recordID ?  true ? invariant(false, 'writeRelayUpdatePayload(): Expected a record ID in the response payload ' + 'supplied to update the store.') : invariant(false) : undefined;

	  // write the results for only the current field, for every instance of that
	  // field in any subfield/fragment in the query.
	  var handleNode = function handleNode(node) {
	    node.getChildren().forEach(function (child) {
	      if (child instanceof RelayQuery.Fragment) {
	        handleNode(child);
	      } else if (child instanceof RelayQuery.Field && child.getSerializationKey() === fieldName) {
	        // for flow: types are lost in closures
	        if (path && recordID) {
	          // ensure the record exists and then update it
	          writer.createRecordIfMissing(child, recordID, path);
	          writer.writePayload(child, recordID, payload, path);
	        }
	      }
	    });
	  };
	  handleNode(operation);
	}

	/**
	 * Handles the payload for a range addition. The configuration specifies:
	 * - which field in the payload contains data for the new edge
	 * - the list of fetched ranges to which the edge should be added
	 * - whether to append/prepend to each of those ranges
	 */
	function handleRangeAdd(writer, payload, operation, config, isOptimisticUpdate) {
	  var clientMutationID = payload[CLIENT_MUTATION_ID];
	  var store = writer.getRecordStore();

	  // Extracts the new edge from the payload
	  var edge = payload[config.edgeName];
	  if (!edge || !edge.node) {
	     true ? warning(false, 'writeRelayUpdatePayload(): Expected response payload to include the ' + 'newly created edge `%s` and its `node` field. Did you forget to ' + 'update the `RANGE_ADD` mutation config?', config.edgeName) : undefined;
	    return;
	  }

	  // Extract the id of the node with the connection that we are adding to.
	  var connectionParentID = config.parentID || edge.source && edge.source.id;
	  !connectionParentID ?  true ? invariant(false, 'writeRelayUpdatePayload(): Cannot insert edge without a configured ' + '`parentID` or a `%s.source.id` field.', config.edgeName) : invariant(false) : undefined;

	  var nodeID = edge.node.id || generateClientID();
	  var cursor = edge.cursor || STUB_CURSOR_ID;
	  var edgeData = _extends({}, edge, {
	    cursor: cursor,
	    node: _extends({}, edge.node, {
	      id: nodeID
	    })
	  });

	  // add the node to every connection for this field
	  var connectionIDs = store.getConnectionIDsForField(connectionParentID, config.connectionName);
	  if (connectionIDs) {
	    connectionIDs.forEach(function (connectionID) {
	      return addRangeNode(writer, operation, config, connectionID, nodeID, edgeData);
	    });
	  }

	  if (isOptimisticUpdate) {
	    // optimistic updates need to record the generated client ID for
	    // a to-be-created node
	    RelayMutationTracker.putClientIDForMutation(nodeID, clientMutationID);
	  } else {
	    // non-optimistic updates check for the existence of a generated client
	    // ID (from the above `if` clause) and link the client ID to the actual
	    // server ID.
	    var clientNodeID = RelayMutationTracker.getClientIDForMutation(clientMutationID);
	    if (clientNodeID) {
	      RelayMutationTracker.updateClientServerIDMap(clientNodeID, nodeID);
	      RelayMutationTracker.deleteClientIDForMutation(clientMutationID);
	    }
	  }
	}

	/**
	 * Writes the node data for the given field to the store and prepends/appends
	 * the node to the given connection.
	 */
	function addRangeNode(writer, operation, config, connectionID, nodeID, edgeData) {
	  var store = writer.getRecordStore();
	  var filterCalls = store.getRangeFilterCalls(connectionID);
	  var rangeBehavior = filterCalls ? getRangeBehavior(config.rangeBehaviors, filterCalls) : null;

	  // no range behavior specified for this combination of filter calls
	  if (!rangeBehavior) {
	    return;
	  }

	  var edgeID = generateClientEdgeID(connectionID, nodeID);
	  var path = store.getPathToRecord(connectionID);
	  !path ?  true ? invariant(false, 'writeRelayUpdatePayload(): Expected a path for connection record, `%s`.', connectionID) : invariant(false) : undefined;
	  path = path.getPath(EDGES_FIELD, edgeID);

	  // create the edge record
	  writer.createRecordIfMissing(EDGES_FIELD, edgeID, path);

	  // write data for all `edges` fields
	  // TODO #7167718: more efficient mutation/subscription writes
	  var hasEdgeField = false;
	  var handleNode = function handleNode(node) {
	    node.getChildren().forEach(function (child) {
	      if (child instanceof RelayQuery.Fragment) {
	        handleNode(child);
	      } else if (child instanceof RelayQuery.Field && child.getSchemaName() === config.edgeName) {
	        hasEdgeField = true;
	        if (path) {
	          writer.writePayload(child, edgeID, edgeData, path);
	        }
	      }
	    });
	  };
	  handleNode(operation);

	  !hasEdgeField ?  true ? invariant(false, 'writeRelayUpdatePayload(): Expected mutation query to include the ' + 'relevant edge field, `%s`.', config.edgeName) : invariant(false) : undefined;

	  // append/prepend the item to the range.
	  if (rangeBehavior in GraphQLMutatorConstants.RANGE_OPERATIONS) {
	    store.applyRangeUpdate(connectionID, edgeID, rangeBehavior);
	    if (writer.hasChangeToRecord(edgeID)) {
	      writer.recordUpdate(connectionID);
	    }
	  } else {
	    console.error('writeRelayUpdatePayload(): invalid range operation `%s`, valid ' + 'options are `%s` or `%s`.', rangeBehavior, APPEND, PREPEND);
	  }
	}

	/**
	 * Handles the payload for a range edge deletion, which removes the edge from
	 * a specified range but does not delete the node for that edge. The config
	 * specifies the path within the payload that contains the connection ID.
	 */
	function handleRangeDelete(writer, payload, config) {
	  var recordID = payload[config.deletedIDFieldName];
	  !(recordID !== undefined) ?  true ? invariant(false, 'writeRelayUpdatePayload(): Missing ID for deleted record at field `%s`.', config.deletedIDFieldName) : invariant(false) : undefined;

	  // Extract the id of the node with the connection that we are deleting from.
	  var store = writer.getRecordStore();
	  var connectionName = config.pathToConnection.pop();
	  var connectionParentID = getIDFromPath(store, config.pathToConnection, payload);
	  // Restore pathToConnection to its original state
	  config.pathToConnection.push(connectionName);
	  if (!connectionParentID) {
	    return;
	  }

	  var connectionIDs = store.getConnectionIDsForField(connectionParentID, connectionName);
	  if (connectionIDs) {
	    connectionIDs.forEach(function (connectionID) {
	      deleteRangeEdge(writer, connectionID, recordID);
	    });
	  }
	}

	/**
	 * Removes an edge from a connection without modifying the node data.
	 */
	function deleteRangeEdge(writer, connectionID, nodeID) {
	  var store = writer.getRecordStore();
	  var edgeID = generateClientEdgeID(connectionID, nodeID);
	  store.applyRangeUpdate(connectionID, edgeID, REMOVE);

	  deleteRecord(writer, edgeID);
	  if (writer.hasChangeToRecord(edgeID)) {
	    writer.recordUpdate(connectionID);
	  }
	}

	/**
	 * Return the action (prepend/append) to use when adding an item to
	 * the range with the specified calls.
	 *
	 * Ex:
	 * rangeBehaviors: `{'orderby(recent)': 'append'}`
	 * calls: `[{name: 'orderby', value: 'recent'}]`
	 *
	 * Returns `'append'`
	 */
	function getRangeBehavior(rangeBehaviors, calls) {
	  var call = calls.map(printRelayQueryCall).join('').slice(1);
	  return rangeBehaviors[call] || null;
	}

	/**
	 * Given a payload of data and a path of fields, extracts the `id` of the node
	 * specified by the path.
	 *
	 * Example:
	 * path: ['root', 'field']
	 * data: {root: {field: {id: 'xyz'}}}
	 *
	 * Returns:
	 * 'xyz'
	 */
	function getIDFromPath(store, path, payload) {
	  // We have a special case for the path for root nodes without ids like
	  // ['viewer']. We try to match it up with something in the root call mapping
	  // first.
	  if (path.length === 1) {
	    var rootCallID = store.getRootCallID(path[0], EMPTY);
	    if (rootCallID) {
	      return rootCallID;
	    }
	  }
	  for (var ii = 0; ii < path.length; ii++) {
	    var step = path[ii];
	    if (!payload || typeof payload !== 'object') {
	      return null;
	    }
	    payload = payload[step]; // $FlowIssue: `payload` is an object
	  }
	  if (payload && typeof payload === 'object') {
	    return payload.id;
	  }
	  return null;
	}

	module.exports = RelayProfiler.instrument('writeRelayUpdatePayload', writeRelayUpdatePayload);
	/* $FlowIssue #7728187 - Computed Property */

/***/ },
/* 172 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	module.exports = { "default": __webpack_require__(178), __esModule: true };

/***/ },
/* 173 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	module.exports = { "default": __webpack_require__(179), __esModule: true };

/***/ },
/* 174 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	module.exports = { "default": __webpack_require__(180), __esModule: true };

/***/ },
/* 175 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	module.exports = { "default": __webpack_require__(182), __esModule: true };

/***/ },
/* 176 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	module.exports = { "default": __webpack_require__(183), __esModule: true };

/***/ },
/* 177 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	module.exports = { "default": __webpack_require__(186), __esModule: true };

/***/ },
/* 178 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(69);
	__webpack_require__(208);
	module.exports = __webpack_require__(13).Array.from;

/***/ },
/* 179 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(105);
	__webpack_require__(69);
	module.exports = __webpack_require__(206);

/***/ },
/* 180 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(105);
	__webpack_require__(69);
	module.exports = __webpack_require__(207);

/***/ },
/* 181 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(210);
	module.exports = __webpack_require__(13).Object.assign;

/***/ },
/* 182 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var $ = __webpack_require__(14);
	module.exports = function create(P, D) {
	  return $.create(P, D);
	};

/***/ },
/* 183 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var $ = __webpack_require__(14);
	module.exports = function defineProperty(it, key, desc) {
	  return $.setDesc(it, key, desc);
	};

/***/ },
/* 184 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(104);
	module.exports = __webpack_require__(13).Object.freeze;

/***/ },
/* 185 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(104);
	module.exports = __webpack_require__(13).Object.keys;

/***/ },
/* 186 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(211);
	module.exports = __webpack_require__(13).Object.setPrototypeOf;

/***/ },
/* 187 */
/***/ function(module, exports) {

	'use strict';

	module.exports = function (it) {
	  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
	  return it;
	};

/***/ },
/* 188 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var toObject = __webpack_require__(32),
	    ES5Object = __webpack_require__(98),
	    enumKeys = __webpack_require__(189);
	// 19.1.2.1 Object.assign(target, source, ...)
	/* eslint-disable no-unused-vars */
	module.exports = Object.assign || function assign(target, source) {
	  /* eslint-enable no-unused-vars */
	  var T = toObject(target, true),
	      l = arguments.length,
	      i = 1;
	  while (l > i) {
	    var S = ES5Object(arguments[i++]),
	        keys = enumKeys(S),
	        length = keys.length,
	        j = 0,
	        key;
	    while (length > j) T[key = keys[j++]] = S[key];
	  }
	  return T;
	};

/***/ },
/* 189 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var $ = __webpack_require__(14);
	module.exports = function (it) {
	  var keys = $.getKeys(it),
	      isEnum = $.isEnum,
	      getSymbols = $.getSymbols;
	  if (getSymbols) for (var symbols = getSymbols(it), i = 0, key; symbols.length > i;) {
	    if (isEnum.call(it, key = symbols[i++])) keys.push(key);
	  }
	  return keys;
	};

/***/ },
/* 190 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
	'use strict';

	var toString = ({}).toString,
	    toObject = __webpack_require__(32),
	    getNames = __webpack_require__(14).getNames;

	var windowNames = typeof window == 'object' && Object.getOwnPropertyNames ? Object.getOwnPropertyNames(window) : [];

	function getWindowNames(it) {
	  try {
	    return getNames(it);
	  } catch (e) {
	    return windowNames.slice();
	  }
	}

	module.exports.get = function getOwnPropertyNames(it) {
	  if (windowNames && toString.call(it) == '[object Window]') return getWindowNames(it);
	  return getNames(toObject(it));
	};

/***/ },
/* 191 */
[259, 23, 16],
/* 192 */
119,
/* 193 */
[260, 66],
/* 194 */
[261, 14, 47, 16, 100, 101],
/* 195 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var SYMBOL_ITERATOR = __webpack_require__(16)('iterator'),
	    SAFE_CLOSING = false;
	try {
	  var riter = [7][SYMBOL_ITERATOR]();
	  riter['return'] = function () {
	    SAFE_CLOSING = true;
	  };
	  Array.from(riter, function () {
	    throw 2;
	  });
	} catch (e) {/* empty */}
	module.exports = function (exec) {
	  if (!SAFE_CLOSING) return false;
	  var safe = false;
	  try {
	    var arr = [7],
	        iter = arr[SYMBOL_ITERATOR]();
	    iter.next = function () {
	      safe = true;
	    };
	    arr[SYMBOL_ITERATOR] = function () {
	      return iter;
	    };
	    exec(arr);
	  } catch (e) {/* empty */}
	  return safe;
	};

/***/ },
/* 196 */
120,
/* 197 */
/***/ function(module, exports) {

	"use strict";

	module.exports = true;

/***/ },
/* 198 */
[263, 47],
/* 199 */
/***/ function(module, exports, __webpack_require__) {

	// Works with __proto__ only. Old v8 can't work with null proto objects.
	/* eslint-disable no-proto */
	'use strict';

	var getDesc = __webpack_require__(14).getDesc,
	    isObject = __webpack_require__(68),
	    anObject = __webpack_require__(66);
	function check(O, proto) {
	  anObject(O);
	  if (!isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
	}
	module.exports = {
	  set: Object.setPrototypeOf || ('__proto__' in {} // eslint-disable-line
	  ? (function (buggy, set) {
	    try {
	      set = __webpack_require__(96)(Function.call, getDesc(Object.prototype, '__proto__').set, 2);
	      set({}, []);
	    } catch (e) {
	      buggy = true;
	    }
	    return function setPrototypeOf(O, proto) {
	      check(O, proto);
	      if (buggy) O.__proto__ = proto;else set(O, proto);
	      return O;
	    };
	  })() : undefined),
	  check: check
	};

/***/ },
/* 200 */
[264, 31],
/* 201 */
[265, 102, 97],
/* 202 */
52,
/* 203 */
[267, 102],
/* 204 */
126,
/* 205 */
/***/ function(module, exports) {

	"use strict";

	module.exports = function () {/* empty */};

/***/ },
/* 206 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var anObject = __webpack_require__(66),
	    get = __webpack_require__(103);
	module.exports = __webpack_require__(13).getIterator = function (it) {
	  var iterFn = get(it);
	  if (typeof iterFn != 'function') throw TypeError(it + ' is not iterable!');
	  return anObject(iterFn.call(it));
	};

/***/ },
/* 207 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var global = __webpack_require__(31),
	    has = __webpack_require__(67),
	    classof = __webpack_require__(94),
	    ITERATOR = __webpack_require__(16)('iterator'),
	    Iterators = __webpack_require__(23);
	module.exports = __webpack_require__(13).isIterable = function (it) {
	  var O = Object(it),
	      Symbol = global.Symbol;
	  return (Symbol && Symbol.iterator || '@@iterator') in O || ITERATOR in O || has(Iterators, classof(O));
	};

/***/ },
/* 208 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var ctx = __webpack_require__(96),
	    $def = __webpack_require__(30),
	    toObject = __webpack_require__(32),
	    call = __webpack_require__(193),
	    isArrayIter = __webpack_require__(191),
	    toLength = __webpack_require__(203),
	    getIterFn = __webpack_require__(103);
	$def($def.S + $def.F * !__webpack_require__(195)(function (iter) {
	  Array.from(iter);
	}), 'Array', {
	  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
	  from: function from(arrayLike /*, mapfn = undefined, thisArg = undefined*/) {
	    var O = toObject(arrayLike, true),
	        C = typeof this == 'function' ? this : Array,
	        mapfn = arguments[1],
	        mapping = mapfn !== undefined,
	        index = 0,
	        iterFn = getIterFn(O),
	        length,
	        result,
	        step,
	        iterator;
	    if (mapping) mapfn = ctx(mapfn, arguments[2], 2);
	    // if object isn't iterable or it's array with default iterator - use simple case
	    if (iterFn != undefined && !(C == Array && isArrayIter(iterFn))) {
	      for (iterator = iterFn.call(O), result = new C(); !(step = iterator.next()).done; index++) {
	        result[index] = mapping ? call(iterator, mapfn, [step.value, index], true) : step.value;
	      }
	    } else {
	      for (result = new C(length = toLength(O.length)); length > index; index++) {
	        result[index] = mapping ? mapfn(O[index], index) : O[index];
	      }
	    }
	    result.length = index;
	    return result;
	  }
	});

/***/ },
/* 209 */
[271, 205, 196, 23, 32, 99],
/* 210 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.3.1 Object.assign(target, source)
	'use strict';

	var $def = __webpack_require__(30);
	$def($def.S, 'Object', { assign: __webpack_require__(188) });

/***/ },
/* 211 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.3.19 Object.setPrototypeOf(O, proto)
	'use strict';

	var $def = __webpack_require__(30);
	$def($def.S, 'Object', { setPrototypeOf: __webpack_require__(199).set });

/***/ },
/* 212 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule PromiseMap
	 * 
	 */

	/**
	 * A map of asynchronous values that can be get or set in any order. Unlike a
	 * normal map, setting the value for a particular key more than once throws.
	 * Also unlike a normal map, a key can either be resolved or rejected.
	 */
	'use strict';

	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError('Cannot call a class as a function');
	  }
	}

	var Deferred = __webpack_require__(48);

	var invariant = __webpack_require__(1);

	var PromiseMap = (function () {
	  function PromiseMap() {
	    _classCallCheck(this, PromiseMap);

	    this._deferred = {};
	  }

	  PromiseMap.prototype.get = function get(key) {
	    return getDeferred(this._deferred, key).getPromise();
	  };

	  PromiseMap.prototype.resolveKey = function resolveKey(key, value) {
	    var entry = getDeferred(this._deferred, key);
	    !!entry.isSettled() ?  true ? invariant(false, 'PromiseMap: Already settled `%s`.', key) : invariant(false) : undefined;
	    entry.resolve(value);
	  };

	  PromiseMap.prototype.rejectKey = function rejectKey(key, reason) {
	    var entry = getDeferred(this._deferred, key);
	    !!entry.isSettled() ?  true ? invariant(false, 'PromiseMap: Already settled `%s`.', key) : invariant(false) : undefined;
	    entry.reject(reason);
	  };

	  return PromiseMap;
	})();

	function getDeferred(entries, key) {
	  if (!entries.hasOwnProperty(key)) {
	    entries[key] = new Deferred();
	  }
	  return entries[key];
	}

	module.exports = PromiseMap;

/***/ },
/* 213 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule fetchWithRetries
	 * @typechecks
	 * 
	 */

	'use strict';

	function _objectWithoutProperties(obj, keys) {
	  var target = {};for (var i in obj) {
	    if (keys.indexOf(i) >= 0) continue;if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;target[i] = obj[i];
	  }return target;
	}

	var ExecutionEnvironment = __webpack_require__(107);
	var Promise = __webpack_require__(17);

	var sprintf = __webpack_require__(112);
	var fetch = __webpack_require__(110);
	var warning = __webpack_require__(10);

	var DEFAULT_FETCH_TIMEOUT = 15000;
	var DEFAULT_RETRY_DELAYS = [1000, 3000];

	/**
	 * Posts a request to the server with the given data as the payload.
	 * Automatic retries are done based on the values in `retryDelays`.
	 */
	function fetchWithRetries(uri, initWithRetries) {
	  var fetchTimeout = initWithRetries.fetchTimeout;
	  var retryDelays = initWithRetries.retryDelays;

	  var init = _objectWithoutProperties(initWithRetries, ['fetchTimeout', 'retryDelays']);

	  var nonNullFetchTimeout = fetchTimeout || DEFAULT_FETCH_TIMEOUT;
	  var nonNullRetryDelays = retryDelays || DEFAULT_RETRY_DELAYS;

	  var requestsAttempted = 0;
	  var requestStartTime = 0;
	  return new Promise(function (resolve, reject) {
	    /**
	     * Sends a request to the server that will timeout after `fetchTimeout`.
	     * If the request fails or times out a new request might be scheduled.
	     */
	    function sendTimedRequest() {
	      requestsAttempted++;
	      requestStartTime = Date.now();
	      var isRequestAlive = true;
	      var request = fetch(uri, init);
	      var requestTimeout = setTimeout(function () {
	        isRequestAlive = false;
	        if (shouldRetry(requestsAttempted)) {
	           true ? warning(false, 'fetchWithRetries: HTTP timeout, retrying.') : undefined;
	          retryRequest();
	        } else {
	          reject(new Error(sprintf('fetchWithRetries(): Failed to get response from server, ' + 'tried %s times.', requestsAttempted)));
	        }
	      }, nonNullFetchTimeout);

	      request.then(function (response) {
	        clearTimeout(requestTimeout);
	        if (isRequestAlive) {
	          // We got a response, we can clear the timeout.
	          if (response.status >= 200 && response.status < 300) {
	            // Got a response code that indicates success, resolve the promise.
	            resolve(response);
	          } else if (shouldRetry(requestsAttempted)) {
	            // Fetch was not successful, retrying.
	            // TODO(#7595849): Only retry on transient HTTP errors.
	             true ?  true ? warning(false, 'fetchWithRetries: HTTP error, retrying.') : undefined : undefined, retryRequest();
	          } else {
	            // Request was not successful, giving up.
	            reject(response);
	          }
	        }
	      })['catch'](function (error) {
	        clearTimeout(requestTimeout);
	        if (shouldRetry(requestsAttempted)) {
	          retryRequest();
	        } else {
	          reject(error);
	        }
	      });
	    }

	    /**
	     * Schedules another run of sendTimedRequest based on how much time has
	     * passed between the time the last request was sent and now.
	     */
	    function retryRequest() {
	      var retryDelay = nonNullRetryDelays[requestsAttempted - 1];
	      var retryStartTime = requestStartTime + retryDelay;
	      // Schedule retry for a configured duration after last request started.
	      setTimeout(sendTimedRequest, retryStartTime - Date.now());
	    }

	    /**
	     * Checks if another attempt should be done to send a request to the server.
	     */
	    function shouldRetry(attempt) {
	      return ExecutionEnvironment.canUseDOM && attempt <= nonNullRetryDelays.length;
	    }

	    sendTimedRequest();
	  });
	}

	module.exports = fetchWithRetries;

/***/ },
/* 214 */
/***/ function(module, exports) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule flattenArray
	 * @typechecks
	 * 
	 */

	/**
	 * Returns a flattened array that represents the DFS traversal of the supplied
	 * input array. For example:
	 *
	 *   var deep = ["a", ["b", "c"], "d", {"e": [1, 2]}, [["f"], "g"]];
	 *   var flat = flattenArray(deep);
	 *   console.log(flat);
	 *   > ["a", "b", "c", "d", {"e": [1, 2]}, "f", "g"];
	 *
	 * @see https://github.com/jonschlinkert/arr-flatten
	 * @copyright 2014-2015 Jon Schlinkert
	 * @license MIT
	 */
	"use strict";

	function flattenArray(array) {
	  var result = [];
	  flatten(array, result);
	  return result;
	}

	function flatten(array, result) {
	  var length = array.length;
	  var ii = 0;

	  while (length--) {
	    var current = array[ii++];
	    if (Array.isArray(current)) {
	      flatten(current, result);
	    } else {
	      result.push(current);
	    }
	  }
	}

	module.exports = flattenArray;

/***/ },
/* 215 */
/***/ function(module, exports) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule isEmpty
	 */

	/*eslint-disable no-unused-vars */

	/**
	 * Mimics empty from PHP.
	 */
	'use strict';

	function isEmpty(obj) {
	  if (Array.isArray(obj)) {
	    return obj.length === 0;
	  } else if (typeof obj === 'object') {
	    for (var i in obj) {
	      return false;
	    }
	    return true;
	  } else {
	    return !obj;
	  }
	}

	module.exports = isEmpty;

/***/ },
/* 216 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule keyMirror
	 * @typechecks static-only
	 */

	'use strict';

	var invariant = __webpack_require__(1);

	/**
	 * Constructs an enumeration with keys equal to their value.
	 *
	 * For example:
	 *
	 *   var COLORS = keyMirror({blue: null, red: null});
	 *   var myColor = COLORS.blue;
	 *   var isColorValid = !!COLORS[myColor];
	 *
	 * The last line could not be performed if the values of the generated enum were
	 * not equal to their keys.
	 *
	 *   Input:  {key1: val1, key2: val2}
	 *   Output: {key1: key1, key2: key2}
	 *
	 * @param {object} obj
	 * @return {object}
	 */
	var keyMirror = function keyMirror(obj) {
	  var ret = {};
	  var key;
	  !(obj instanceof Object && !Array.isArray(obj)) ?  true ? invariant(false, 'keyMirror(...): Argument must be an object.') : invariant(false) : undefined;
	  for (key in obj) {
	    if (!obj.hasOwnProperty(key)) {
	      continue;
	    }
	    ret[key] = key;
	  }
	  return ret;
	};

	module.exports = keyMirror;

/***/ },
/* 217 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule performance
	 * @typechecks
	 */

	'use strict';

	var ExecutionEnvironment = __webpack_require__(107);

	var performance;

	if (ExecutionEnvironment.canUseDOM) {
	  performance = window.performance || window.msPerformance || window.webkitPerformance;
	}

	module.exports = performance || {};

/***/ },
/* 218 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule performanceNow
	 * @typechecks
	 */

	'use strict';

	var performance = __webpack_require__(217);
	var curPerformance = performance;

	/**
	 * Detect if we can use `window.performance.now()` and gracefully fallback to
	 * `Date.now()` if it doesn't exist. We need to support Firefox < 15 for now
	 * because of Facebook's testing infrastructure.
	 */
	if (!curPerformance || !curPerformance.now) {
	  curPerformance = Date;
	}

	var performanceNow = curPerformance.now.bind(curPerformance);

	module.exports = performanceNow;

/***/ },
/* 219 */
/***/ function(module, exports) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule removeFromArray
	 * @typechecks
	 * 
	 */

	/**
	 * Removes an element from an array.
	 */
	"use strict";

	function removeFromArray(array, element) {
	  var index = array.indexOf(element);
	  if (index !== -1) {
	    array.splice(index, 1);
	  }
	}

	module.exports = removeFromArray;

/***/ },
/* 220 */
/***/ function(module, exports) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule someObject
	 * 
	 * @typechecks
	 */

	'use strict';

	var hasOwnProperty = Object.prototype.hasOwnProperty;

	/**
	 * Executes the provided `callback` once for each enumerable own property in the
	 * object until it finds one where callback returns a truthy value. If such a
	 * property is found, `someObject` immediately returns true. Otherwise, it
	 * returns false.
	 *
	 * The `callback` is invoked with three arguments:
	 *
	 *  - the property value
	 *  - the property name
	 *  - the object being traversed
	 *
	 * Properties that are added after the call to `someObject` will not be
	 * visited by `callback`. If the values of existing properties are changed, the
	 * value passed to `callback` will be the value at the time `someObject`
	 * visits them. Properties that are deleted before being visited are not
	 * visited.
	 */
	function someObject(object, callback, context) {
	  for (var name in object) {
	    if (hasOwnProperty.call(object, name)) {
	      if (callback.call(context, object[name], name, object)) {
	        return true;
	      }
	    }
	  }
	  return false;
	}

	module.exports = someObject;

/***/ },
/* 221 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(240);
	__webpack_require__(241);
	__webpack_require__(242);
	__webpack_require__(239);
	module.exports = __webpack_require__(51).Map;

/***/ },
/* 222 */
187,
/* 223 */
[254, 114, 20],
/* 224 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $ = __webpack_require__(25),
	    hide = __webpack_require__(24),
	    ctx = __webpack_require__(115),
	    species = __webpack_require__(232),
	    strictNew = __webpack_require__(124),
	    defined = __webpack_require__(72),
	    forOf = __webpack_require__(117),
	    step = __webpack_require__(120),
	    ID = __webpack_require__(126)('id'),
	    $has = __webpack_require__(73),
	    isObject = __webpack_require__(118),
	    isExtensible = Object.isExtensible || isObject,
	    SUPPORT_DESC = __webpack_require__(52),
	    SIZE = SUPPORT_DESC ? '_s' : 'size',
	    id = 0;

	function fastKey(it, create) {
	  // return primitive with prefix
	  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
	  if (!$has(it, ID)) {
	    // can't set id to frozen object
	    if (!isExtensible(it)) return 'F';
	    // not necessary to add id
	    if (!create) return 'E';
	    // add missing object id
	    hide(it, ID, ++id);
	    // return object id with prefix
	  }return 'O' + it[ID];
	}

	function getEntry(that, key) {
	  // fast case
	  var index = fastKey(key),
	      entry;
	  if (index !== 'F') return that._i[index];
	  // frozen object case
	  for (entry = that._f; entry; entry = entry.n) {
	    if (entry.k == key) return entry;
	  }
	}

	module.exports = {
	  getConstructor: function getConstructor(wrapper, NAME, IS_MAP, ADDER) {
	    var C = wrapper(function (that, iterable) {
	      strictNew(that, C, NAME);
	      that._i = $.create(null); // index
	      that._f = undefined; // first entry
	      that._l = undefined; // last entry
	      that[SIZE] = 0; // size
	      if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
	    });
	    __webpack_require__(121)(C.prototype, {
	      // 23.1.3.1 Map.prototype.clear()
	      // 23.2.3.2 Set.prototype.clear()
	      clear: function clear() {
	        for (var that = this, data = that._i, entry = that._f; entry; entry = entry.n) {
	          entry.r = true;
	          if (entry.p) entry.p = entry.p.n = undefined;
	          delete data[entry.i];
	        }
	        that._f = that._l = undefined;
	        that[SIZE] = 0;
	      },
	      // 23.1.3.3 Map.prototype.delete(key)
	      // 23.2.3.4 Set.prototype.delete(value)
	      'delete': function _delete(key) {
	        var that = this,
	            entry = getEntry(that, key);
	        if (entry) {
	          var next = entry.n,
	              prev = entry.p;
	          delete that._i[entry.i];
	          entry.r = true;
	          if (prev) prev.n = next;
	          if (next) next.p = prev;
	          if (that._f == entry) that._f = next;
	          if (that._l == entry) that._l = prev;
	          that[SIZE]--;
	        }return !!entry;
	      },
	      // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
	      // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
	      forEach: function forEach(callbackfn /*, that = undefined */) {
	        var f = ctx(callbackfn, arguments[1], 3),
	            entry;
	        while (entry = entry ? entry.n : this._f) {
	          f(entry.v, entry.k, this);
	          // revert to the last existing entry
	          while (entry && entry.r) entry = entry.p;
	        }
	      },
	      // 23.1.3.7 Map.prototype.has(key)
	      // 23.2.3.7 Set.prototype.has(value)
	      has: function has(key) {
	        return !!getEntry(this, key);
	      }
	    });
	    if (SUPPORT_DESC) $.setDesc(C.prototype, 'size', {
	      get: function get() {
	        return defined(this[SIZE]);
	      }
	    });
	    return C;
	  },
	  def: function def(that, key, value) {
	    var entry = getEntry(that, key),
	        prev,
	        index;
	    // change existing entry
	    if (entry) {
	      entry.v = value;
	      // create new entry
	    } else {
	        that._l = entry = {
	          i: index = fastKey(key, true), // <- index
	          k: key, // <- key
	          v: value, // <- value
	          p: prev = that._l, // <- previous entry
	          n: undefined, // <- next entry
	          r: false // <- removed
	        };
	        if (!that._f) that._f = entry;
	        if (prev) prev.n = entry;
	        that[SIZE]++;
	        // add to index
	        if (index !== 'F') that._i[index] = entry;
	      }return that;
	  },
	  getEntry: getEntry,
	  setStrong: function setStrong(C, NAME, IS_MAP) {
	    // add .keys, .values, .entries, [@@iterator]
	    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
	    __webpack_require__(74)(C, NAME, function (iterated, kind) {
	      this._t = iterated; // target
	      this._k = kind; // kind
	      this._l = undefined; // previous
	    }, function () {
	      var that = this,
	          kind = that._k,
	          entry = that._l;
	      // revert to the last existing entry
	      while (entry && entry.r) entry = entry.p;
	      // get next entry
	      if (!that._t || !(that._l = entry = entry ? entry.n : that._t._f)) {
	        // or finish the iteration
	        that._t = undefined;
	        return step(1);
	      }
	      // return step by kind
	      if (kind == 'keys') return step(0, entry.k);
	      if (kind == 'values') return step(0, entry.v);
	      return step(0, [entry.k, entry.v]);
	    }, IS_MAP ? 'entries' : 'values', !IS_MAP, true);

	    // add [@@species], 23.1.2.2, 23.2.2.2
	    species(C);
	    species(__webpack_require__(51)[NAME]); // for wrapper
	  }
	};

/***/ },
/* 225 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $ = __webpack_require__(25),
	    $def = __webpack_require__(116),
	    hide = __webpack_require__(24),
	    BUGGY = __webpack_require__(119),
	    forOf = __webpack_require__(117),
	    strictNew = __webpack_require__(124);

	module.exports = function (NAME, wrapper, methods, common, IS_MAP, IS_WEAK) {
	  var Base = __webpack_require__(34)[NAME],
	      C = Base,
	      ADDER = IS_MAP ? 'set' : 'add',
	      proto = C && C.prototype,
	      O = {};
	  if (!__webpack_require__(52) || typeof C != 'function' || !(IS_WEAK || !BUGGY && proto.forEach && proto.entries)) {
	    // create collection constructor
	    C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
	    __webpack_require__(121)(C.prototype, methods);
	  } else {
	    C = wrapper(function (target, iterable) {
	      strictNew(target, C, NAME);
	      target._c = new Base();
	      if (iterable != undefined) forOf(iterable, IS_MAP, target[ADDER], target);
	    });
	    $.each.call('add,clear,delete,forEach,get,has,set,keys,values,entries'.split(','), function (KEY) {
	      var chain = KEY == 'add' || KEY == 'set';
	      if (KEY in proto && !(IS_WEAK && KEY == 'clear')) hide(C.prototype, KEY, function (a, b) {
	        var result = this._c[KEY](a === 0 ? 0 : a, b);
	        return chain ? this : result;
	      });
	    });
	    if ('size' in proto) $.setDesc(C.prototype, 'size', {
	      get: function get() {
	        return this._c.size;
	      }
	    });
	  }

	  __webpack_require__(75)(C, NAME);

	  O[NAME] = C;
	  $def($def.G + $def.W + $def.F, O);

	  if (!IS_WEAK) common.setStrong(C, NAME, IS_MAP);

	  return C;
	};

/***/ },
/* 226 */
[257, 114],
/* 227 */
[259, 35, 20],
/* 228 */
[260, 113],
/* 229 */
[261, 25, 24, 20, 122, 75],
/* 230 */
197,
/* 231 */
[264, 34],
/* 232 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var $ = __webpack_require__(25),
	    SPECIES = __webpack_require__(20)('species');
	module.exports = function (C) {
	  if (__webpack_require__(52) && !(SPECIES in C)) $.setDesc(C, SPECIES, {
	    configurable: true,
	    get: function get() {
	      return this;
	    }
	  });
	};

/***/ },
/* 233 */
[265, 125, 72],
/* 234 */
[267, 125],
/* 235 */
[268, 226, 72],
/* 236 */
205,
/* 237 */
[270, 34, 223, 20, 35, 51],
/* 238 */
[271, 236, 120, 35, 235, 74],
/* 239 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var strong = __webpack_require__(224);

	// 23.1 Map Objects
	__webpack_require__(225)('Map', function (get) {
	  return function Map() {
	    return get(this, arguments[0]);
	  };
	}, {
	  // 23.1.3.6 Map.prototype.get(key)
	  get: function get(key) {
	    var entry = strong.getEntry(this, key);
	    return entry && entry.v;
	  },
	  // 23.1.3.9 Map.prototype.set(key, value)
	  set: function set(key, value) {
	    return strong.def(this, key === 0 ? 0 : key, value);
	  }
	}, strong, true);

/***/ },
/* 240 */
/***/ function(module, exports) {

	"use strict";

/***/ },
/* 241 */
[272, 233, 74],
/* 242 */
[273, 238, 35],
/* 243 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(247);

/***/ },
/* 244 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Promise = __webpack_require__(36);

	module.exports = Promise;
	Promise.prototype.done = function (onFulfilled, onRejected) {
	  var self = arguments.length ? this.then.apply(this, arguments) : this;
	  self.then(null, function (err) {
	    setTimeout(function () {
	      throw err;
	    }, 0);
	  });
	};

/***/ },
/* 245 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	//This file contains the ES6 extensions to the core Promises/A+ API

	var Promise = __webpack_require__(36);

	module.exports = Promise;

	/* Static Functions */

	var TRUE = valuePromise(true);
	var FALSE = valuePromise(false);
	var NULL = valuePromise(null);
	var UNDEFINED = valuePromise(undefined);
	var ZERO = valuePromise(0);
	var EMPTYSTRING = valuePromise('');

	function valuePromise(value) {
	  var p = new Promise(Promise._99);
	  p._37 = 1;
	  p._12 = value;
	  return p;
	}
	Promise.resolve = function (value) {
	  if (value instanceof Promise) return value;

	  if (value === null) return NULL;
	  if (value === undefined) return UNDEFINED;
	  if (value === true) return TRUE;
	  if (value === false) return FALSE;
	  if (value === 0) return ZERO;
	  if (value === '') return EMPTYSTRING;

	  if (typeof value === 'object' || typeof value === 'function') {
	    try {
	      var then = value.then;
	      if (typeof then === 'function') {
	        return new Promise(then.bind(value));
	      }
	    } catch (ex) {
	      return new Promise(function (resolve, reject) {
	        reject(ex);
	      });
	    }
	  }
	  return valuePromise(value);
	};

	Promise.all = function (arr) {
	  var args = Array.prototype.slice.call(arr);

	  return new Promise(function (resolve, reject) {
	    if (args.length === 0) return resolve([]);
	    var remaining = args.length;
	    function res(_x, _x2) {
	      var _again = true;

	      _function: while (_again) {
	        var i = _x,
	            val = _x2;
	        then = p = undefined;
	        _again = false;

	        if (val && (typeof val === 'object' || typeof val === 'function')) {
	          if (val instanceof Promise && val.then === Promise.prototype.then) {
	            while (val._37 === 3) {
	              val = val._12;
	            }
	            if (val._37 === 1) {
	              _x = i;
	              _x2 = val._12;
	              _again = true;
	              continue _function;
	            }
	            if (val._37 === 2) reject(val._12);
	            val.then(function (val) {
	              res(i, val);
	            }, reject);
	            return;
	          } else {
	            var then = val.then;
	            if (typeof then === 'function') {
	              var p = new Promise(then.bind(val));
	              p.then(function (val) {
	                res(i, val);
	              }, reject);
	              return;
	            }
	          }
	        }
	        args[i] = val;
	        if (--remaining === 0) {
	          resolve(args);
	        }
	      }
	    }
	    for (var i = 0; i < args.length; i++) {
	      res(i, args[i]);
	    }
	  });
	};

	Promise.reject = function (value) {
	  return new Promise(function (resolve, reject) {
	    reject(value);
	  });
	};

	Promise.race = function (values) {
	  return new Promise(function (resolve, reject) {
	    values.forEach(function (value) {
	      Promise.resolve(value).then(resolve, reject);
	    });
	  });
	};

	/* Prototype Methods */

	Promise.prototype['catch'] = function (onRejected) {
	  return this.then(null, onRejected);
	};

/***/ },
/* 246 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Promise = __webpack_require__(36);

	module.exports = Promise;
	Promise.prototype['finally'] = function (f) {
	  return this.then(function (value) {
	    return Promise.resolve(f()).then(function () {
	      return value;
	    });
	  }, function (err) {
	    return Promise.resolve(f()).then(function () {
	      throw err;
	    });
	  });
	};

/***/ },
/* 247 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(36);
	__webpack_require__(244);
	__webpack_require__(246);
	__webpack_require__(245);
	__webpack_require__(248);

/***/ },
/* 248 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// This file contains then/promise specific extensions that are only useful
	// for node.js interop

	var Promise = __webpack_require__(36);
	var asap = __webpack_require__(249);

	module.exports = Promise;

	/* Static Functions */

	Promise.denodeify = function (fn, argumentCount) {
	  argumentCount = argumentCount || Infinity;
	  return function () {
	    var self = this;
	    var args = Array.prototype.slice.call(arguments, 0, argumentCount > 0 ? argumentCount : 0);
	    return new Promise(function (resolve, reject) {
	      args.push(function (err, res) {
	        if (err) reject(err);else resolve(res);
	      });
	      var res = fn.apply(self, args);
	      if (res && (typeof res === 'object' || typeof res === 'function') && typeof res.then === 'function') {
	        resolve(res);
	      }
	    });
	  };
	};
	Promise.nodeify = function (fn) {
	  return function () {
	    var args = Array.prototype.slice.call(arguments);
	    var callback = typeof args[args.length - 1] === 'function' ? args.pop() : null;
	    var ctx = this;
	    try {
	      return fn.apply(this, arguments).nodeify(callback, ctx);
	    } catch (ex) {
	      if (callback === null || typeof callback == 'undefined') {
	        return new Promise(function (resolve, reject) {
	          reject(ex);
	        });
	      } else {
	        asap(function () {
	          callback.call(ctx, ex);
	        });
	      }
	    }
	  };
	};

	Promise.prototype.nodeify = function (callback, ctx) {
	  if (typeof callback != 'function') return this;

	  this.then(function (value) {
	    asap(function () {
	      callback.call(ctx, null, value);
	    });
	  }, function (err) {
	    asap(function () {
	      callback.call(ctx, err);
	    });
	  });
	};

/***/ },
/* 249 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	// rawAsap provides everything we need except exception management.
	var rawAsap = __webpack_require__(127);
	// RawTasks are recycled to reduce GC churn.
	var freeTasks = [];
	// We queue errors to ensure they are thrown in right order (FIFO).
	// Array-as-queue is good enough here, since we are just dealing with exceptions.
	var pendingErrors = [];
	var requestErrorThrow = rawAsap.makeRequestCallFromTimer(throwFirstError);

	function throwFirstError() {
	    if (pendingErrors.length) {
	        throw pendingErrors.shift();
	    }
	}

	/**
	 * Calls a task as soon as possible after returning, in its own event, with priority
	 * over other events like animation, reflow, and repaint. An error thrown from an
	 * event will not interrupt, nor even substantially slow down the processing of
	 * other events, but will be rather postponed to a lower priority event.
	 * @param {{call}} task A callable object, typically a function that takes no
	 * arguments.
	 */
	module.exports = asap;
	function asap(task) {
	    var rawTask;
	    if (freeTasks.length) {
	        rawTask = freeTasks.pop();
	    } else {
	        rawTask = new RawTask();
	    }
	    rawTask.task = task;
	    rawAsap(rawTask);
	}

	// We wrap tasks with recyclable task objects.  A task object implements
	// `call`, just like a function.
	function RawTask() {
	    this.task = null;
	}

	// The sole purpose of wrapping the task is to catch the exception and recycle
	// the task object after its single use.
	RawTask.prototype.call = function () {
	    try {
	        this.task.call();
	    } catch (error) {
	        if (asap.onerror) {
	            // This hook exists purely for testing purposes.
	            // Its name will be periodically randomized to break any code that
	            // depends on its existence.
	            asap.onerror(error);
	        } else {
	            // In a web browser, exceptions are not fatal. However, to avoid
	            // slowing down the queue of pending tasks, we rethrow the error in a
	            // lower priority turn.
	            pendingErrors.push(error);
	            requestErrorThrow();
	        }
	    } finally {
	        this.task = null;
	        freeTasks[freeTasks.length] = this;
	    }
	};

/***/ },
/* 250 */
/***/ function(module, exports) {

	'use strict';

	(function () {
	  'use strict';

	  if (self.fetch) {
	    return;
	  }

	  function normalizeName(name) {
	    if (typeof name !== 'string') {
	      name = name.toString();
	    }
	    if (/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(name)) {
	      throw new TypeError('Invalid character in header field name');
	    }
	    return name.toLowerCase();
	  }

	  function normalizeValue(value) {
	    if (typeof value !== 'string') {
	      value = value.toString();
	    }
	    return value;
	  }

	  function Headers(headers) {
	    this.map = {};

	    if (headers instanceof Headers) {
	      headers.forEach(function (value, name) {
	        this.append(name, value);
	      }, this);
	    } else if (headers) {
	      Object.getOwnPropertyNames(headers).forEach(function (name) {
	        this.append(name, headers[name]);
	      }, this);
	    }
	  }

	  Headers.prototype.append = function (name, value) {
	    name = normalizeName(name);
	    value = normalizeValue(value);
	    var list = this.map[name];
	    if (!list) {
	      list = [];
	      this.map[name] = list;
	    }
	    list.push(value);
	  };

	  Headers.prototype['delete'] = function (name) {
	    delete this.map[normalizeName(name)];
	  };

	  Headers.prototype.get = function (name) {
	    var values = this.map[normalizeName(name)];
	    return values ? values[0] : null;
	  };

	  Headers.prototype.getAll = function (name) {
	    return this.map[normalizeName(name)] || [];
	  };

	  Headers.prototype.has = function (name) {
	    return this.map.hasOwnProperty(normalizeName(name));
	  };

	  Headers.prototype.set = function (name, value) {
	    this.map[normalizeName(name)] = [normalizeValue(value)];
	  };

	  Headers.prototype.forEach = function (callback, thisArg) {
	    Object.getOwnPropertyNames(this.map).forEach(function (name) {
	      this.map[name].forEach(function (value) {
	        callback.call(thisArg, value, name, this);
	      }, this);
	    }, this);
	  };

	  function consumed(body) {
	    if (body.bodyUsed) {
	      return Promise.reject(new TypeError('Already read'));
	    }
	    body.bodyUsed = true;
	  }

	  function fileReaderReady(reader) {
	    return new Promise(function (resolve, reject) {
	      reader.onload = function () {
	        resolve(reader.result);
	      };
	      reader.onerror = function () {
	        reject(reader.error);
	      };
	    });
	  }

	  function readBlobAsArrayBuffer(blob) {
	    var reader = new FileReader();
	    reader.readAsArrayBuffer(blob);
	    return fileReaderReady(reader);
	  }

	  function readBlobAsText(blob) {
	    var reader = new FileReader();
	    reader.readAsText(blob);
	    return fileReaderReady(reader);
	  }

	  var support = {
	    blob: 'FileReader' in self && 'Blob' in self && (function () {
	      try {
	        new Blob();
	        return true;
	      } catch (e) {
	        return false;
	      }
	    })(),
	    formData: 'FormData' in self
	  };

	  function Body() {
	    this.bodyUsed = false;

	    this._initBody = function (body) {
	      this._bodyInit = body;
	      if (typeof body === 'string') {
	        this._bodyText = body;
	      } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
	        this._bodyBlob = body;
	      } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
	        this._bodyFormData = body;
	      } else if (!body) {
	        this._bodyText = '';
	      } else {
	        throw new Error('unsupported BodyInit type');
	      }
	    };

	    if (support.blob) {
	      this.blob = function () {
	        var rejected = consumed(this);
	        if (rejected) {
	          return rejected;
	        }

	        if (this._bodyBlob) {
	          return Promise.resolve(this._bodyBlob);
	        } else if (this._bodyFormData) {
	          throw new Error('could not read FormData body as blob');
	        } else {
	          return Promise.resolve(new Blob([this._bodyText]));
	        }
	      };

	      this.arrayBuffer = function () {
	        return this.blob().then(readBlobAsArrayBuffer);
	      };

	      this.text = function () {
	        var rejected = consumed(this);
	        if (rejected) {
	          return rejected;
	        }

	        if (this._bodyBlob) {
	          return readBlobAsText(this._bodyBlob);
	        } else if (this._bodyFormData) {
	          throw new Error('could not read FormData body as text');
	        } else {
	          return Promise.resolve(this._bodyText);
	        }
	      };
	    } else {
	      this.text = function () {
	        var rejected = consumed(this);
	        return rejected ? rejected : Promise.resolve(this._bodyText);
	      };
	    }

	    if (support.formData) {
	      this.formData = function () {
	        return this.text().then(decode);
	      };
	    }

	    this.json = function () {
	      return this.text().then(JSON.parse);
	    };

	    return this;
	  }

	  // HTTP methods whose capitalization should be normalized
	  var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT'];

	  function normalizeMethod(method) {
	    var upcased = method.toUpperCase();
	    return methods.indexOf(upcased) > -1 ? upcased : method;
	  }

	  function Request(url, options) {
	    options = options || {};
	    this.url = url;

	    this.credentials = options.credentials || 'omit';
	    this.headers = new Headers(options.headers);
	    this.method = normalizeMethod(options.method || 'GET');
	    this.mode = options.mode || null;
	    this.referrer = null;

	    if ((this.method === 'GET' || this.method === 'HEAD') && options.body) {
	      throw new TypeError('Body not allowed for GET or HEAD requests');
	    }
	    this._initBody(options.body);
	  }

	  function decode(body) {
	    var form = new FormData();
	    body.trim().split('&').forEach(function (bytes) {
	      if (bytes) {
	        var split = bytes.split('=');
	        var name = split.shift().replace(/\+/g, ' ');
	        var value = split.join('=').replace(/\+/g, ' ');
	        form.append(decodeURIComponent(name), decodeURIComponent(value));
	      }
	    });
	    return form;
	  }

	  function headers(xhr) {
	    var head = new Headers();
	    var pairs = xhr.getAllResponseHeaders().trim().split('\n');
	    pairs.forEach(function (header) {
	      var split = header.trim().split(':');
	      var key = split.shift().trim();
	      var value = split.join(':').trim();
	      head.append(key, value);
	    });
	    return head;
	  }

	  Body.call(Request.prototype);

	  function Response(bodyInit, options) {
	    if (!options) {
	      options = {};
	    }

	    this._initBody(bodyInit);
	    this.type = 'default';
	    this.url = null;
	    this.status = options.status;
	    this.ok = this.status >= 200 && this.status < 300;
	    this.statusText = options.statusText;
	    this.headers = options.headers instanceof Headers ? options.headers : new Headers(options.headers);
	    this.url = options.url || '';
	  }

	  Body.call(Response.prototype);

	  self.Headers = Headers;
	  self.Request = Request;
	  self.Response = Response;

	  self.fetch = function (input, init) {
	    // TODO: Request constructor should accept input, init
	    var request;
	    if (Request.prototype.isPrototypeOf(input) && !init) {
	      request = input;
	    } else {
	      request = new Request(input, init);
	    }

	    return new Promise(function (resolve, reject) {
	      var xhr = new XMLHttpRequest();

	      function responseURL() {
	        if ('responseURL' in xhr) {
	          return xhr.responseURL;
	        }

	        // Avoid security warnings on getResponseHeader when not allowed by CORS
	        if (/^X-Request-URL:/m.test(xhr.getAllResponseHeaders())) {
	          return xhr.getResponseHeader('X-Request-URL');
	        }

	        return;
	      }

	      xhr.onload = function () {
	        var status = xhr.status === 1223 ? 204 : xhr.status;
	        if (status < 100 || status > 599) {
	          reject(new TypeError('Network request failed'));
	          return;
	        }
	        var options = {
	          status: status,
	          statusText: xhr.statusText,
	          headers: headers(xhr),
	          url: responseURL()
	        };
	        var body = 'response' in xhr ? xhr.response : xhr.responseText;
	        resolve(new Response(body, options));
	      };

	      xhr.onerror = function () {
	        reject(new TypeError('Network request failed'));
	      };

	      xhr.open(request.method, request.url, true);

	      if (request.credentials === 'include') {
	        xhr.withCredentials = true;
	      }

	      if ('responseType' in xhr && support.blob) {
	        xhr.responseType = 'blob';
	      }

	      request.headers.forEach(function (value, name) {
	        xhr.setRequestHeader(name, value);
	      });

	      xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit);
	    });
	  };
	  self.fetch.polyfill = true;
	})();

/***/ },
/* 251 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 */

	'use strict';

	module.exports = __webpack_require__(252);

/***/ },
/* 252 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule StaticContainer.react
	 * @typechecks
	 * 
	 */

	'use strict';

	var _createClass = (function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ('value' in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
	    }
	  }return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
	  };
	})();

	var _get = function get(_x, _x2, _x3) {
	  var _again = true;_function: while (_again) {
	    var object = _x,
	        property = _x2,
	        receiver = _x3;desc = parent = getter = undefined;_again = false;if (object === null) object = Function.prototype;var desc = Object.getOwnPropertyDescriptor(object, property);if (desc === undefined) {
	      var parent = Object.getPrototypeOf(object);if (parent === null) {
	        return undefined;
	      } else {
	        _x = parent;_x2 = property;_x3 = receiver;_again = true;continue _function;
	      }
	    } else if ('value' in desc) {
	      return desc.value;
	    } else {
	      var getter = desc.get;if (getter === undefined) {
	        return undefined;
	      }return getter.call(receiver);
	    }
	  }
	};

	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError('Cannot call a class as a function');
	  }
	}

	function _inherits(subClass, superClass) {
	  if (typeof superClass !== 'function' && superClass !== null) {
	    throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass);
	  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
	}

	var React = __webpack_require__(53);

	/**
	 * Renders static content efficiently by allowing React to short-circuit the
	 * reconciliation process. This component should be used when you know that a
	 * subtree of components will never need to be updated.
	 *
	 *   var someValue = ...; // We know for certain this value will never change.
	 *   return (
	 *     <StaticContainer>
	 *       <MyComponent value={someValue} />
	 *     </StaticContainer>
	 *   );
	 *
	 * Typically, you will not need to use this component and should opt for normal
	 * React reconciliation.
	 */

	var StaticContainer = (function (_React$Component) {
	  _inherits(StaticContainer, _React$Component);

	  function StaticContainer() {
	    _classCallCheck(this, StaticContainer);

	    _get(Object.getPrototypeOf(StaticContainer.prototype), 'constructor', this).apply(this, arguments);
	  }

	  _createClass(StaticContainer, [{
	    key: 'shouldComponentUpdate',
	    value: function shouldComponentUpdate(nextProps) {
	      return !!nextProps.shouldUpdate;
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var child = this.props.children;
	      if (child === null || child === false) {
	        return null;
	      }
	      return React.Children.only(child);
	    }
	  }]);

	  return StaticContainer;
	})(React.Component);

	module.exports = StaticContainer;

/***/ },
/* 253 */
/***/ function(module, exports, __webpack_require__, __webpack_module_template_argument_0__) {

	'use strict';

	var isObject = __webpack_require__(__webpack_module_template_argument_0__);
	module.exports = function (it) {
	  if (!isObject(it)) throw TypeError(it + ' is not an object!');
	  return it;
	};

/***/ },
/* 254 */
/***/ function(module, exports, __webpack_require__, __webpack_module_template_argument_0__, __webpack_module_template_argument_1__) {

	'use strict';

	var cof = __webpack_require__(__webpack_module_template_argument_0__),
	    TAG = __webpack_require__(__webpack_module_template_argument_1__)('toStringTag'),

	// ES3 wrong here
	ARG = cof((function () {
	  return arguments;
	})()) == 'Arguments';

	module.exports = function (it) {
	  var O, T, B;
	  return it === undefined ? 'Undefined' : it === null ? 'Null'
	  // @@toStringTag case
	  : typeof (T = (O = Object(it))[TAG]) == 'string' ? T
	  // builtinTag case
	  : ARG ? cof(O)
	  // ES3 arguments fallback
	  : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
	};

/***/ },
/* 255 */
/***/ function(module, exports, __webpack_require__, __webpack_module_template_argument_0__) {

	// Optional / simple context binding
	'use strict';

	var aFunction = __webpack_require__(__webpack_module_template_argument_0__);
	module.exports = function (fn, that, length) {
	  aFunction(fn);
	  if (~length && that === undefined) return fn;
	  switch (length) {
	    case 1:
	      return function (a) {
	        return fn.call(that, a);
	      };
	    case 2:
	      return function (a, b) {
	        return fn.call(that, a, b);
	      };
	    case 3:
	      return function (a, b, c) {
	        return fn.call(that, a, b, c);
	      };
	  }return function () /* ...args */{
	    return fn.apply(that, arguments);
	  };
	};

/***/ },
/* 256 */
/***/ function(module, exports, __webpack_require__, __webpack_module_template_argument_0__, __webpack_module_template_argument_1__) {

	'use strict';

	var global = __webpack_require__(__webpack_module_template_argument_0__),
	    core = __webpack_require__(__webpack_module_template_argument_1__),
	    PROTOTYPE = 'prototype';
	function ctx(fn, that) {
	  return function () {
	    return fn.apply(that, arguments);
	  };
	}
	// type bitmap
	$def.F = 1; // forced
	$def.G = 2; // global
	$def.S = 4; // static
	$def.P = 8; // proto
	$def.B = 16; // bind
	$def.W = 32; // wrap
	function $def(type, name, source) {
	  var key,
	      own,
	      out,
	      exp,
	      isGlobal = type & $def.G,
	      isProto = type & $def.P,
	      target = isGlobal ? global : type & $def.S ? global[name] : (global[name] || {})[PROTOTYPE],
	      exports = isGlobal ? core : core[name] || (core[name] = {});
	  if (isGlobal) source = name;
	  for (key in source) {
	    // contains in native
	    own = !(type & $def.F) && target && key in target;
	    if (own && key in exports) continue;
	    // export native or passed
	    out = own ? target[key] : source[key];
	    // prevent global pollution for namespaces
	    if (isGlobal && typeof target[key] != 'function') exp = source[key];
	    // bind timers to global for call from export context
	    else if (type & $def.B && own) exp = ctx(out, global);
	      // wrap global constructors for prevent change them in library
	      else if (type & $def.W && target[key] == out) !(function (C) {
	          exp = function (param) {
	            return this instanceof C ? new C(param) : C(param);
	          };
	          exp[PROTOTYPE] = C[PROTOTYPE];
	        })(out);else exp = isProto && typeof out == 'function' ? ctx(Function.call, out) : out;
	    // export
	    exports[key] = exp;
	    if (isProto) (exports[PROTOTYPE] || (exports[PROTOTYPE] = {}))[key] = out;
	  }
	}
	module.exports = $def;

/***/ },
/* 257 */
/***/ function(module, exports, __webpack_require__, __webpack_module_template_argument_0__) {

	// fallback for not array-like ES3 strings
	'use strict';

	var cof = __webpack_require__(__webpack_module_template_argument_0__),
	    $Object = Object;
	module.exports = 0 in $Object('z') ? $Object : function (it) {
	  return cof(it) == 'String' ? it.split('') : $Object(it);
	};

/***/ },
/* 258 */
/***/ function(module, exports, __webpack_require__, __webpack_module_template_argument_0__, __webpack_module_template_argument_1__, __webpack_module_template_argument_2__) {

	'use strict';

	var $ = __webpack_require__(__webpack_module_template_argument_0__),
	    createDesc = __webpack_require__(__webpack_module_template_argument_1__);
	module.exports = __webpack_require__(__webpack_module_template_argument_2__) ? function (object, key, value) {
	  return $.setDesc(object, key, createDesc(1, value));
	} : function (object, key, value) {
	  object[key] = value;
	  return object;
	};

/***/ },
/* 259 */
/***/ function(module, exports, __webpack_require__, __webpack_module_template_argument_0__, __webpack_module_template_argument_1__) {

	'use strict';

	var Iterators = __webpack_require__(__webpack_module_template_argument_0__),
	    ITERATOR = __webpack_require__(__webpack_module_template_argument_1__)('iterator');
	module.exports = function (it) {
	  return ('Array' in Iterators ? Iterators.Array : Array.prototype[ITERATOR]) === it;
	};

/***/ },
/* 260 */
/***/ function(module, exports, __webpack_require__, __webpack_module_template_argument_0__) {

	'use strict';

	var anObject = __webpack_require__(__webpack_module_template_argument_0__);
	function close(iterator) {
	  var ret = iterator['return'];
	  if (ret !== undefined) anObject(ret.call(iterator));
	}
	module.exports = function (iterator, fn, value, entries) {
	  try {
	    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
	  } catch (e) {
	    close(iterator);
	    throw e;
	  }
	};

/***/ },
/* 261 */
/***/ function(module, exports, __webpack_require__, __webpack_module_template_argument_0__, __webpack_module_template_argument_1__, __webpack_module_template_argument_2__, __webpack_module_template_argument_3__, __webpack_module_template_argument_4__) {

	'use strict';
	var $ = __webpack_require__(__webpack_module_template_argument_0__),
	    IteratorPrototype = {};

	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	__webpack_require__(__webpack_module_template_argument_1__)(IteratorPrototype, __webpack_require__(__webpack_module_template_argument_2__)('iterator'), function () {
	  return this;
	});

	module.exports = function (Constructor, NAME, next) {
	  Constructor.prototype = $.create(IteratorPrototype, { next: __webpack_require__(__webpack_module_template_argument_3__)(1, next) });
	  __webpack_require__(__webpack_module_template_argument_4__)(Constructor, NAME + ' Iterator');
	};

/***/ },
/* 262 */
/***/ function(module, exports, __webpack_require__, __webpack_module_template_argument_0__, __webpack_module_template_argument_1__, __webpack_module_template_argument_2__, __webpack_module_template_argument_3__, __webpack_module_template_argument_4__, __webpack_module_template_argument_5__, __webpack_module_template_argument_6__, __webpack_module_template_argument_7__, __webpack_module_template_argument_8__, __webpack_module_template_argument_9__, __webpack_module_template_argument_10__) {

	'use strict';
	var LIBRARY = __webpack_require__(__webpack_module_template_argument_0__),
	    $def = __webpack_require__(__webpack_module_template_argument_1__),
	    $redef = __webpack_require__(__webpack_module_template_argument_2__),
	    hide = __webpack_require__(__webpack_module_template_argument_3__),
	    has = __webpack_require__(__webpack_module_template_argument_4__),
	    SYMBOL_ITERATOR = __webpack_require__(__webpack_module_template_argument_5__)('iterator'),
	    Iterators = __webpack_require__(__webpack_module_template_argument_6__),
	    FF_ITERATOR = '@@iterator',
	    KEYS = 'keys',
	    VALUES = 'values';
	function returnThis() {
	  return this;
	}
	module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCE) {
	  __webpack_require__(__webpack_module_template_argument_7__)(Constructor, NAME, next);
	  function createMethod(kind) {
	    switch (kind) {
	      case KEYS:
	        return function keys() {
	          return new Constructor(this, kind);
	        };
	      case VALUES:
	        return function values() {
	          return new Constructor(this, kind);
	        };
	    }return function entries() {
	      return new Constructor(this, kind);
	    };
	  }
	  var TAG = NAME + ' Iterator',
	      proto = Base.prototype,
	      _native = proto[SYMBOL_ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT],
	      _default = _native || createMethod(DEFAULT),
	      methods,
	      key;
	  // Fix native
	  if (_native) {
	    var IteratorPrototype = __webpack_require__(__webpack_module_template_argument_8__).getProto(_default.call(new Base()));
	    // Set @@toStringTag to native iterators
	    __webpack_require__(__webpack_module_template_argument_9__)(IteratorPrototype, TAG, true);
	    // FF fix
	    if (!LIBRARY && has(proto, FF_ITERATOR)) hide(IteratorPrototype, SYMBOL_ITERATOR, returnThis);
	  }
	  // Define iterator
	  if (!LIBRARY || FORCE) hide(proto, SYMBOL_ITERATOR, _default);
	  // Plug for library
	  Iterators[NAME] = _default;
	  Iterators[TAG] = returnThis;
	  if (DEFAULT) {
	    methods = {
	      keys: IS_SET ? _default : createMethod(KEYS),
	      values: DEFAULT == VALUES ? _default : createMethod(VALUES),
	      entries: DEFAULT != VALUES ? _default : createMethod('entries')
	    };
	    if (FORCE) for (key in methods) {
	      if (!(key in proto)) $redef(proto, key, methods[key]);
	    } else $def($def.P + $def.F * __webpack_require__(__webpack_module_template_argument_10__), NAME, methods);
	  }
	};

/***/ },
/* 263 */
/***/ function(module, exports, __webpack_require__, __webpack_module_template_argument_0__) {

	'use strict';

	module.exports = __webpack_require__(__webpack_module_template_argument_0__);

/***/ },
/* 264 */
/***/ function(module, exports, __webpack_require__, __webpack_module_template_argument_0__) {

	'use strict';

	var global = __webpack_require__(__webpack_module_template_argument_0__),
	    SHARED = '__core-js_shared__',
	    store = global[SHARED] || (global[SHARED] = {});
	module.exports = function (key) {
	  return store[key] || (store[key] = {});
	};

/***/ },
/* 265 */
/***/ function(module, exports, __webpack_require__, __webpack_module_template_argument_0__, __webpack_module_template_argument_1__) {

	// true  -> String#at
	// false -> String#codePointAt
	'use strict';

	var toInteger = __webpack_require__(__webpack_module_template_argument_0__),
	    defined = __webpack_require__(__webpack_module_template_argument_1__);
	module.exports = function (TO_STRING) {
	  return function (that, pos) {
	    var s = String(defined(that)),
	        i = toInteger(pos),
	        l = s.length,
	        a,
	        b;
	    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
	    a = s.charCodeAt(i);
	    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff ? TO_STRING ? s.charAt(i) : a : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
	  };
	};

/***/ },
/* 266 */
/***/ function(module, exports, __webpack_require__, __webpack_module_template_argument_0__, __webpack_module_template_argument_1__, __webpack_module_template_argument_2__) {

	'use strict';

	var has = __webpack_require__(__webpack_module_template_argument_0__),
	    hide = __webpack_require__(__webpack_module_template_argument_1__),
	    TAG = __webpack_require__(__webpack_module_template_argument_2__)('toStringTag');

	module.exports = function (it, tag, stat) {
	  if (it && !has(it = stat ? it : it.prototype, TAG)) hide(it, TAG, tag);
	};

/***/ },
/* 267 */
/***/ function(module, exports, __webpack_require__, __webpack_module_template_argument_0__) {

	// 7.1.15 ToLength
	'use strict';

	var toInteger = __webpack_require__(__webpack_module_template_argument_0__),
	    min = Math.min;
	module.exports = function (it) {
	  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};

/***/ },
/* 268 */
/***/ function(module, exports, __webpack_require__, __webpack_module_template_argument_0__, __webpack_module_template_argument_1__) {

	'use strict';

	var ES5Object = __webpack_require__(__webpack_module_template_argument_0__),
	    defined = __webpack_require__(__webpack_module_template_argument_1__);
	module.exports = function (it, realString) {
	  return (realString ? Object : ES5Object)(defined(it));
	};

/***/ },
/* 269 */
/***/ function(module, exports, __webpack_require__, __webpack_module_template_argument_0__, __webpack_module_template_argument_1__, __webpack_module_template_argument_2__) {

	'use strict';

	var store = __webpack_require__(__webpack_module_template_argument_0__)('wks'),
	    Symbol = __webpack_require__(__webpack_module_template_argument_1__).Symbol;
	module.exports = function (name) {
	  return store[name] || (store[name] = Symbol && Symbol[name] || (Symbol || __webpack_require__(__webpack_module_template_argument_2__))('Symbol.' + name));
	};

/***/ },
/* 270 */
/***/ function(module, exports, __webpack_require__, __webpack_module_template_argument_0__, __webpack_module_template_argument_1__, __webpack_module_template_argument_2__, __webpack_module_template_argument_3__, __webpack_module_template_argument_4__) {

	'use strict';

	var global = __webpack_require__(__webpack_module_template_argument_0__),
	    classof = __webpack_require__(__webpack_module_template_argument_1__),
	    ITERATOR = __webpack_require__(__webpack_module_template_argument_2__)('iterator'),
	    Iterators = __webpack_require__(__webpack_module_template_argument_3__);
	module.exports = __webpack_require__(__webpack_module_template_argument_4__).getIteratorMethod = function (it) {
	  var Symbol = global.Symbol;
	  if (it != undefined) {
	    return it[Symbol && Symbol.iterator || '@@iterator'] || it[ITERATOR] || Iterators[classof(it)];
	  }
	};

/***/ },
/* 271 */
/***/ function(module, exports, __webpack_require__, __webpack_module_template_argument_0__, __webpack_module_template_argument_1__, __webpack_module_template_argument_2__, __webpack_module_template_argument_3__, __webpack_module_template_argument_4__) {

	'use strict';

	var setUnscope = __webpack_require__(__webpack_module_template_argument_0__),
	    step = __webpack_require__(__webpack_module_template_argument_1__),
	    Iterators = __webpack_require__(__webpack_module_template_argument_2__),
	    toObject = __webpack_require__(__webpack_module_template_argument_3__);

	// 22.1.3.4 Array.prototype.entries()
	// 22.1.3.13 Array.prototype.keys()
	// 22.1.3.29 Array.prototype.values()
	// 22.1.3.30 Array.prototype[@@iterator]()
	__webpack_require__(__webpack_module_template_argument_4__)(Array, 'Array', function (iterated, kind) {
	  this._t = toObject(iterated); // target
	  this._i = 0; // next index
	  this._k = kind; // kind
	  // 22.1.5.2.1 %ArrayIteratorPrototype%.next()
	}, function () {
	  var O = this._t,
	      kind = this._k,
	      index = this._i++;
	  if (!O || index >= O.length) {
	    this._t = undefined;
	    return step(1);
	  }
	  if (kind == 'keys') return step(0, index);
	  if (kind == 'values') return step(0, O[index]);
	  return step(0, [index, O[index]]);
	}, 'values');

	// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
	Iterators.Arguments = Iterators.Array;

	setUnscope('keys');
	setUnscope('values');
	setUnscope('entries');

/***/ },
/* 272 */
/***/ function(module, exports, __webpack_require__, __webpack_module_template_argument_0__, __webpack_module_template_argument_1__) {

	'use strict';

	var $at = __webpack_require__(__webpack_module_template_argument_0__)(true);

	// 21.1.3.27 String.prototype[@@iterator]()
	__webpack_require__(__webpack_module_template_argument_1__)(String, 'String', function (iterated) {
	  this._t = String(iterated); // target
	  this._i = 0; // next index
	  // 21.1.5.2.1 %StringIteratorPrototype%.next()
	}, function () {
	  var O = this._t,
	      index = this._i,
	      point;
	  if (index >= O.length) return { value: undefined, done: true };
	  point = $at(O, index);
	  this._i += point.length;
	  return { value: point, done: false };
	});

/***/ },
/* 273 */
/***/ function(module, exports, __webpack_require__, __webpack_module_template_argument_0__, __webpack_module_template_argument_1__) {

	'use strict';

	__webpack_require__(__webpack_module_template_argument_0__);
	var Iterators = __webpack_require__(__webpack_module_template_argument_1__);
	Iterators.NodeList = Iterators.HTMLCollection = Iterators.Array;

/***/ }
/******/ ])))
});
;