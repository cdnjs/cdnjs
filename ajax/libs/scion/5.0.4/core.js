(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["module", "exports"], factory);
  } else if (typeof exports !== "undefined") {
    factory(module, exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports);
    global.scion = global.scion || {}; global.scion.core = mod.exports;
  }
})(this, function (module, exports) {
  "use strict";

  var _typeof2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  };

  (function (f) {
    if ((typeof exports === "undefined" ? "undefined" : _typeof2(exports)) === "object" && typeof module !== "undefined") {
      module.exports = f();
    } else if (typeof define === "function" && define.amd) {
      define([], f);
    } else {
      var g;if (typeof window !== "undefined") {
        g = window;
      } else if (typeof global !== "undefined") {
        g = global;
      } else if (typeof self !== "undefined") {
        g = self;
      } else {
        g = this;
      }g.core = f();
    }
  })(function () {
    var define, module, exports;return function () {
      function r(e, n, t) {
        function o(i, f) {
          if (!n[i]) {
            if (!e[i]) {
              var c = "function" == typeof require && require;if (!f && c) return c(i, !0);if (u) return u(i, !0);var a = new Error("Cannot find module '" + i + "'");throw a.code = "MODULE_NOT_FOUND", a;
            }var p = n[i] = { exports: {} };e[i][0].call(p.exports, function (r) {
              var n = e[i][1][r];return o(n || r);
            }, p, p.exports, r, e, n, t);
          }return n[i].exports;
        }for (var u = "function" == typeof require && require, i = 0; i < t.length; i++) {
          o(t[i]);
        }return o;
      }return r;
    }()({ 1: [function (require, module, exports) {
        'use strict';

        /* begin ArraySet */

        /** @constructor */

        function ArraySet(l) {
          l = l || [];
          this.o = new Set(l);
        }

        ArraySet.prototype = {

          add: function add(x) {
            this.o.add(x);
          },

          remove: function remove(x) {
            return this.o.delete(x);
          },

          union: function union(l) {
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
              for (var _iterator = l.o[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var v = _step.value;

                this.o.add(v);
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

            return this;
          },

          difference: function difference(l) {
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
              for (var _iterator2 = l.o[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                var v = _step2.value;

                this.o.delete(v);
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

            return this;
          },

          contains: function contains(x) {
            return this.o.has(x);
          },

          iter: function iter() {
            return Array.from(this.o);
          },

          isEmpty: function isEmpty() {
            return !this.o.size;
          },

          size: function size() {
            return this.o.size;
          },

          equals: function equals(s2) {
            if (this.o.size !== s2.size()) {
              return false;
            }

            var _iteratorNormalCompletion3 = true;
            var _didIteratorError3 = false;
            var _iteratorError3 = undefined;

            try {
              for (var _iterator3 = this.o[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                var v = _step3.value;

                if (!s2.contains(v)) {
                  return false;
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

            return true;
          },

          toString: function toString() {
            return this.o.size === 0 ? '<empty>' : Array.from(this.o).join(',\n');
          }
        };

        module.exports = ArraySet;
      }, {}], 2: [function (require, module, exports) {
        'use strict';

        var STATE_TYPES = {
          BASIC: 0,
          COMPOSITE: 1,
          PARALLEL: 2,
          HISTORY: 3,
          INITIAL: 4,
          FINAL: 5
        };

        var SCXML_IOPROCESSOR_TYPE = 'http://www.w3.org/TR/scxml/#SCXMLEventProcessor';
        var HTTP_IOPROCESSOR_TYPE = 'http://www.w3.org/TR/scxml/#BasicHTTPEventProcessor';
        var RX_TRAILING_WILDCARD = /\.\*$/;

        module.exports = {
          STATE_TYPES: STATE_TYPES,
          SCXML_IOPROCESSOR_TYPE: SCXML_IOPROCESSOR_TYPE,
          HTTP_IOPROCESSOR_TYPE: HTTP_IOPROCESSOR_TYPE,
          RX_TRAILING_WILDCARD: RX_TRAILING_WILDCARD
        };
      }, {}], 3: [function (require, module, exports) {
        'use strict';

        var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
          return typeof obj === "undefined" ? "undefined" : _typeof2(obj);
        } : function (obj) {
          return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof2(obj);
        };

        var constants = require('./constants'),
            STATE_TYPES = constants.STATE_TYPES,
            RX_TRAILING_WILDCARD = constants.RX_TRAILING_WILDCARD;

        var printTrace = false;

        module.exports = {
          extend: extend,
          transitionWithTargets: transitionWithTargets,
          transitionComparator: transitionComparator,
          initializeModel: initializeModel,
          isEventPrefixMatch: isEventPrefixMatch,
          isTransitionMatch: isTransitionMatch,
          scxmlPrefixTransitionSelector: scxmlPrefixTransitionSelector,
          eventlessTransitionSelector: eventlessTransitionSelector,
          getTransitionWithHigherSourceChildPriority: getTransitionWithHigherSourceChildPriority,
          sortInEntryOrder: sortInEntryOrder,
          getStateWithHigherSourceChildPriority: getStateWithHigherSourceChildPriority,
          initializeModelGeneratorFn: initializeModelGeneratorFn,
          deserializeSerializedConfiguration: deserializeSerializedConfiguration,
          deserializeHistory: deserializeHistory
        };

        function extend(to, from) {
          Object.keys(from).forEach(function (k) {
            to[k] = from[k];
          });
          return to;
        };

        function transitionWithTargets(t) {
          return t.targets;
        }

        function transitionComparator(t1, t2) {
          return t1.documentOrder - t2.documentOrder;
        }

        function initializeModel(rootState, opts) {
          var transitions = [],
              idToStateMap = new Map(),
              documentOrder = 0;

          //TODO: need to add fake ids to anyone that doesn't have them
          //FIXME: make this safer - break into multiple passes
          var idCount = {};

          function generateId(type) {
            if (idCount[type] === undefined) idCount[type] = 0;

            do {
              var count = idCount[type]++;
              var id = '$generated-' + type + '-' + count;
            } while (idToStateMap.has(id));

            return id;
          }

          function wrapInFakeRootState(state) {
            return {
              $deserializeDatamodel: state.$deserializeDatamodel || function () {},
              $serializeDatamodel: state.$serializeDatamodel || function () {
                return null;
              },
              $idToStateMap: idToStateMap, //keep this for handy deserialization of serialized configuration
              docUrl: state.docUrl,
              name: state.name,
              states: [{
                $type: 'initial',
                transitions: [{
                  target: state
                }]
              }, state]
            };
          }

          var statesWithInitialAttributes = [];

          /**
            @this {SCTransition}
          */
          function transitionToString(sourceState) {
            return sourceState + ' -- ' + (this.events ? '(' + this.events.join(',') + ')' : null) + (this.cond ? '[' + this.cond.name + ']' : '') + ' --> ' + (this.targets ? this.targets.join(',') : null);
          }

          /**
            @this {SCState}
          */
          function stateToString() {
            return this.id;
          }

          function populateStateIdMap(state) {
            //populate state id map
            if (state.id) {
              idToStateMap.set(state.id, state);
            }

            if (state.states) {
              for (var j = 0, len = state.states.length; j < len; j++) {
                populateStateIdMap(state.states[j]);
              }
            }
          }

          function traverse(ancestors, state) {

            if (printTrace) state.toString = stateToString;

            //add to global transition and state id caches
            if (state.transitions) transitions.push.apply(transitions, state.transitions);

            //create a default type, just to normalize things
            //this way we can check for unsupported types below
            state.$type = state.$type || 'state';

            //add ancestors and depth properties
            state.ancestors = ancestors;
            state.depth = ancestors.length;
            state.parent = ancestors[0];
            state.documentOrder = documentOrder++;

            //add some information to transitions
            state.transitions = state.transitions || [];
            for (var j = 0, len = state.transitions.length; j < len; j++) {
              var transition = state.transitions[j];
              transition.documentOrder = documentOrder++;
              transition.source = state;
              if (printTrace) transition.toString = transitionToString.bind(transition, state);
            };

            //recursive step
            if (state.states) {
              var ancs = [state].concat(ancestors);
              for (var j = 0, len = state.states.length; j < len; j++) {
                traverse(ancs, state.states[j]);
              }
            }

            //setup fast state type
            switch (state.$type) {
              case 'parallel':
                state.typeEnum = STATE_TYPES.PARALLEL;
                state.isAtomic = false;
                break;
              case 'initial':
                state.typeEnum = STATE_TYPES.INITIAL;
                state.isAtomic = true;
                break;
              case 'history':
                state.typeEnum = STATE_TYPES.HISTORY;
                state.isAtomic = true;
                break;
              case 'final':
                state.typeEnum = STATE_TYPES.FINAL;
                state.isAtomic = true;
                break;
              case 'state':
              case 'scxml':
                if (state.states && state.states.length) {
                  state.typeEnum = STATE_TYPES.COMPOSITE;
                  state.isAtomic = false;
                } else {
                  state.typeEnum = STATE_TYPES.BASIC;
                  state.isAtomic = true;
                }
                break;
              default:
                throw new Error('Unknown state type: ' + state.$type);
            }

            //descendants property on states will now be populated. add descendants to this state
            if (state.states) {
              state.descendants = state.states.concat(state.states.map(function (s) {
                return s.descendants;
              }).reduce(function (a, b) {
                return a.concat(b);
              }, []));
            } else {
              state.descendants = [];
            }

            var initialChildren;
            if (state.typeEnum === STATE_TYPES.COMPOSITE) {
              //set up initial state

              if (Array.isArray(state.initial) || typeof state.initial === 'string') {
                statesWithInitialAttributes.push(state);
              } else {
                //take the first child that has initial type, or first child
                initialChildren = state.states.filter(function (child) {
                  return child.$type === 'initial';
                });

                state.initialRef = [initialChildren.length ? initialChildren[0] : state.states[0]];
                checkInitialRef(state);
              }
            }

            //hook up history
            if (state.typeEnum === STATE_TYPES.COMPOSITE || state.typeEnum === STATE_TYPES.PARALLEL) {

              var historyChildren = state.states.filter(function (s) {
                return s.$type === 'history';
              });

              state.historyRef = historyChildren;
            }

            //now it's safe to fill in fake state ids
            if (!state.id) {
              state.id = generateId(state.$type);
              idToStateMap.set(state.id, state);
            }

            //normalize onEntry/onExit, which can be single fn or array, or array of arrays (blocks)
            ['onEntry', 'onExit'].forEach(function (prop) {
              if (state[prop]) {
                if (!Array.isArray(state[prop])) {
                  state[prop] = [state[prop]];
                }
                if (!state[prop].every(function (handler) {
                  return Array.isArray(handler);
                })) {
                  state[prop] = [state[prop]];
                }
              }
            });

            if (state.invokes && !Array.isArray(state.invokes)) {
              state.invokes = [state.invokes];
              state.invokes.forEach(function (invoke) {
                if (invoke.finalize && !Array.isArray(invoke.finalize)) {
                  invoke.finalize = [invoke.finalize];
                }
              });
            }
          }

          //TODO: convert events to regular expressions in advance

          function checkInitialRef(state) {
            if (!state.initialRef) throw new Error('Unable to locate initial state for composite state: ' + state.id);
          }
          function connectIntialAttributes() {
            for (var j = 0, len = statesWithInitialAttributes.length; j < len; j++) {
              var s = statesWithInitialAttributes[j];

              var initialStates = Array.isArray(s.initial) ? s.initial : [s.initial];
              s.initialRef = initialStates.map(function (initialState) {
                return idToStateMap.get(initialState);
              });
              checkInitialRef(s);
            }
          }

          var RX_WHITESPACE = /\s+/;

          function connectTransitionGraph() {
            //normalize as with onEntry/onExit
            for (var i = 0, len = transitions.length; i < len; i++) {
              var t = transitions[i];
              if (t.onTransition && !Array.isArray(t.onTransition)) {
                t.onTransition = [t.onTransition];
              }

              //normalize "event" attribute into "events" attribute
              if (typeof t.event === 'string') {
                t.events = t.event.trim().split(RX_WHITESPACE);
              }
              delete t.event;

              if (t.targets || typeof t.target === 'undefined') {
                //targets have already been set up
                continue;
              }

              if (typeof t.target === 'string') {
                var target = idToStateMap.get(t.target);
                if (!target) throw new Error('Unable to find target state with id ' + t.target);
                t.target = target;
                t.targets = [t.target];
              } else if (Array.isArray(t.target)) {
                t.targets = t.target.map(function (target) {
                  if (typeof target === 'string') {
                    target = idToStateMap.get(target);
                    if (!target) throw new Error('Unable to find target state with id ' + t.target);
                    return target;
                  } else {
                    return target;
                  }
                });
              } else if (_typeof(t.target) === 'object') {
                t.targets = [t.target];
              } else {
                throw new Error('Transition target has unknown type: ' + t.target);
              }
            }

            //hook up LCA - optimization
            for (var i = 0, len = transitions.length; i < len; i++) {
              var t = transitions[i];
              if (t.targets) t.lcca = getLCCA(t.source, t.targets[0]); //FIXME: we technically do not need to hang onto the lcca. only the scope is used by the algorithm

              t.scope = getScope(t);
            }
          }

          function getScope(transition) {
            //Transition scope is normally the least common compound ancestor (lcca).
            //Internal transitions have a scope equal to the source state.
            var transitionIsReallyInternal = transition.type === 'internal' && transition.source.typeEnum === STATE_TYPES.COMPOSITE && //is transition source a composite state
            transition.source.parent && //root state won't have parent
            transition.targets && //does it target its descendants
            transition.targets.every(function (target) {
              return transition.source.descendants.indexOf(target) > -1;
            });

            if (!transition.targets) {
              return null;
            } else if (transitionIsReallyInternal) {
              return transition.source;
            } else {
              return transition.lcca;
            }
          }

          function getLCCA(s1, s2) {
            var commonAncestors = [];
            for (var j = 0, len = s1.ancestors.length; j < len; j++) {
              var anc = s1.ancestors[j];
              if ((opts && opts.legacySemantics ? anc.typeEnum === STATE_TYPES.COMPOSITE : anc.typeEnum === STATE_TYPES.COMPOSITE || anc.typeEnum === STATE_TYPES.PARALLEL) && anc.descendants.indexOf(s2) > -1) {

                commonAncestors.push(anc);
              }
            };
            if (!commonAncestors.length) throw new Error("Could not find LCA for states.");
            return commonAncestors[0];
          }

          //main execution starts here
          //FIXME: only wrap in root state if it's not a compound state
          populateStateIdMap(rootState);
          var fakeRootState = wrapInFakeRootState(rootState); //I wish we had pointer semantics and could make this a C-style "out argument". Instead we return him
          traverse([], fakeRootState);
          connectTransitionGraph();
          connectIntialAttributes();

          return fakeRootState;
        }

        function isEventPrefixMatch(prefix, fullName) {
          prefix = prefix.replace(RX_TRAILING_WILDCARD, '');

          if (prefix === fullName) {
            return true;
          }

          if (prefix.length > fullName.length) {
            return false;
          }

          if (fullName.charAt(prefix.length) !== '.') {
            return false;
          }

          return fullName.indexOf(prefix) === 0;
        }

        function isTransitionMatch(t, eventName) {
          return t.events.some(function (tEvent) {
            return tEvent === '*' || isEventPrefixMatch(tEvent, eventName);
          });
        }

        function scxmlPrefixTransitionSelector(t, event, evaluator, selectEventlessTransitions) {
          return (selectEventlessTransitions ? !t.events : t.events && event && event.name && isTransitionMatch(t, event.name)) && (!t.cond || evaluator(t.cond));
        }

        function eventlessTransitionSelector(state) {
          return state.transitions.filter(function (transition) {
            return !transition.events || transition.events && transition.events.length === 0;
          });
        }

        //priority comparison functions
        function getTransitionWithHigherSourceChildPriority(_args) {
          var t1 = _args[0],
              t2 = _args[1];
          var r = getStateWithHigherSourceChildPriority(t1.source, t2.source);
          //compare transitions based first on depth, then based on document order
          if (t1.source.depth < t2.source.depth) {
            return t2;
          } else if (t2.source.depth < t1.source.depth) {
            return t1;
          } else {
            if (t1.documentOrder < t2.documentOrder) {
              return t1;
            } else {
              return t2;
            }
          }
        }

        function sortInEntryOrder(s1, s2) {
          return getStateWithHigherSourceChildPriority(s1, s2) * -1;
        }

        function getStateWithHigherSourceChildPriority(s1, s2) {
          //compare states based first on depth, then based on document order
          if (s1.depth > s2.depth) {
            return -1;
          } else if (s1.depth < s2.depth) {
            return 1;
          } else {
            //Equality
            if (s1.documentOrder < s2.documentOrder) {
              return 1;
            } else if (s1.documentOrder > s2.documentOrder) {
              return -1;
            } else {
              return 0;
            }
          }
        }

        function initializeModelGeneratorFn(modelFn, opts, interpreter) {
          return modelFn.call(interpreter, opts._x, opts._x._sessionid, opts._x._ioprocessors, interpreter.isIn.bind(interpreter));
        }

        function deserializeSerializedConfiguration(serializedConfiguration, idToStateMap) {
          return serializedConfiguration.map(function (id) {
            var state = idToStateMap.get(id);
            if (!state) throw new Error('Error loading serialized configuration. Unable to locate state with id ' + id);
            return state;
          });
        }

        function deserializeHistory(serializedHistory, idToStateMap) {
          var o = {};
          Object.keys(serializedHistory).forEach(function (sid) {
            o[sid] = serializedHistory[sid].map(function (id) {
              var state = idToStateMap.get(id);
              if (!state) throw new Error('Error loading serialized history. Unable to locate state with id ' + id);
              return state;
            });
          });
          return o;
        }
      }, { "./constants": 2 }], 4: [function (require, module, exports) {
        'use strict';

        var constants = require('./constants');

        //model accessor functions
        var query = {
          isDescendant: function isDescendant(s1, s2) {
            //Returns 'true' if state1 is a descendant of state2 (a child, or a child of a child, or a child of a child of a child, etc.) Otherwise returns 'false'.
            return s2.descendants.indexOf(s1) > -1;
          },
          getAncestors: function getAncestors(s, root) {
            var ancestors, index, state;
            index = s.ancestors.indexOf(root);
            if (index > -1) {
              return s.ancestors.slice(0, index);
            } else {
              return s.ancestors;
            }
          },
          isOrthogonalTo: function isOrthogonalTo(s1, s2) {
            //Two control states are orthogonal if they are not ancestrally
            //related, and their smallest, mutual parent is a Concurrent-state.
            return !this.isAncestrallyRelatedTo(s1, s2) && this.getLCA(s1, s2).typeEnum === constants.STATE_TYPES.PARALLEL;
          },
          isAncestrallyRelatedTo: function isAncestrallyRelatedTo(s1, s2) {
            //Two control states are ancestrally related if one is child/grandchild of another.
            return this.getAncestorsOrSelf(s2).indexOf(s1) > -1 || this.getAncestorsOrSelf(s1).indexOf(s2) > -1;
          },
          getAncestorsOrSelf: function getAncestorsOrSelf(s, root) {
            return [s].concat(query.getAncestors(s, root));
          },
          getDescendantsOrSelf: function getDescendantsOrSelf(s) {
            return [s].concat(s.descendants);
          },
          getLCA: function getLCA(s1, s2) {
            var commonAncestors = this.getAncestors(s1).filter(function (a) {
              return a.descendants.indexOf(s2) > -1;
            }, this);
            return commonAncestors[0];
          }
        };

        module.exports = query;
      }, { "./constants": 2 }], 5: [function (require, module, exports) {
        (function (process, setImmediate) {
          //   Copyright 2012-2012 Jacob Beard, INFICON, and other SCION contributors
          //
          //   Licensed under the Apache License, Version 2.0 (the "License");
          //   you may not use this file except in compliance with the License.
          //   You may obtain a copy of the License at
          //
          //       http://www.apache.org/licenses/LICENSE-2.0
          //
          //   Unless required by applicable law or agreed to in writing, software
          //   distributed under the License is distributed on an "AS IS" BASIS,
          //   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
          //   See the License for the specific language governing permissions and
          //   limitations under the License.

          /**
           * SCION-CORE global object
           * @namespace scion
           */

          /**
           * An Array of strings representing the ids all of the basic states the
           * interpreter is in after a big-step completes.
           * @typedef {Array<string>} Configuration
           */

          /**
           * A set of basic and composite state ids.
           * @typedef {Array<string>} FullConfiguration
           */

          /**
           * A set of basic and composite state ids.
           * @typedef {Array<string>} FullConfiguration
           */

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

          var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
            return typeof obj === "undefined" ? "undefined" : _typeof2(obj);
          } : function (obj) {
            return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof2(obj);
          };

          var _createClass = function () {
            function defineProperties(target, props) {
              for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
              }
            }return function (Constructor, protoProps, staticProps) {
              if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
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

          function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) {
              throw new TypeError("Cannot call a class as a function");
            }
          }

          function _possibleConstructorReturn(self, call) {
            if (!self) {
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            }return call && ((typeof call === "undefined" ? "undefined" : _typeof2(call)) === "object" || typeof call === "function") ? call : self;
          }

          function _inherits(subClass, superClass) {
            if (typeof superClass !== "function" && superClass !== null) {
              throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof2(superClass)));
            }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
          }

          var EventEmitter = require('tiny-events').EventEmitter,
              util = require('util'),
              ArraySet = require('./ArraySet'),
              constants = require('./constants'),
              helpers = require('./helpers'),
              query = require('./query'),
              extend = helpers.extend,
              transitionWithTargets = helpers.transitionWithTargets,
              transitionComparator = helpers.transitionComparator,
              initializeModel = helpers.initializeModel,
              isEventPrefixMatch = helpers.isEventPrefixMatch,
              isTransitionMatch = helpers.isTransitionMatch,
              scxmlPrefixTransitionSelector = helpers.scxmlPrefixTransitionSelector,
              eventlessTransitionSelector = helpers.eventlessTransitionSelector,
              getTransitionWithHigherSourceChildPriority = helpers.getTransitionWithHigherSourceChildPriority,
              sortInEntryOrder = helpers.sortInEntryOrder,
              getStateWithHigherSourceChildPriority = helpers.getStateWithHigherSourceChildPriority,
              initializeModelGeneratorFn = helpers.initializeModelGeneratorFn,
              deserializeSerializedConfiguration = helpers.deserializeSerializedConfiguration,
              deserializeHistory = helpers.deserializeHistory,
              BASIC = constants.STATE_TYPES.BASIC,
              COMPOSITE = constants.STATE_TYPES.COMPOSITE,
              PARALLEL = constants.STATE_TYPES.PARALLEL,
              HISTORY = constants.STATE_TYPES.HISTORY,
              INITIAL = constants.STATE_TYPES.INITIAL,
              FINAL = constants.STATE_TYPES.FINAL,
              SCXML_IOPROCESSOR_TYPE = constants.SCXML_IOPROCESSOR_TYPE;

          var printTrace = typeof process !== 'undefined' && !!process.env.DEBUG;

          /**
           * @interface EventEmitter
           */

          /**
          * @event scion.BaseInterpreter#onError
          * @property {string} tagname The name of the element that produced the error. 
          * @property {number} line The line in the source file in which the error occurred.
          * @property {number} column The column in the source file in which the error occurred.
          * @property {string} reason An informative error message. The text is platform-specific and subject to change.
          */

          /**
           * @function
           * @name EventEmitter.prototype#on
           * @param {string} type
           * @param {callback} listener
           */

          /**
           * @function
           * @name EventEmitter.prototype#once
           * @param {string} type
           * @param {callback} listener
           */

          /**
           * @function
           * @name EventEmitter.prototype#off
           * @param {string} type
           * @param {callback} listener
           */

          /**
           * @function
           * @name EventEmitter.prototype#emit
           * @param {string} type
           * @param {any} args
           */
          /** 
           * @description The SCXML constructor creates an interpreter instance from a model object.
           * @abstract
           * @class BaseInterpreter
           * @memberof scion
           * @extends EventEmitter
           * @param {SCJSON | scxml.ModelFactory} modelOrModelFactory Either an SCJSON root state; or an scxml.ModelFactory, which is a function which returns an SCJSON object. 
           * @param opts
           * @param {string} [opts.sessionid] Used to populate SCXML _sessionid.
           * @param {function} [opts.generateSessionid] Factory used to generate sessionid if sessionid keyword is not specified
           * @param {Map<string, BaseInterpreter>} [opts.sessionRegistry] Map used to map sessionid strings to Statechart instances.
           * @param [opts.Set] Class to use as an ArraySet. Defaults to ES6 Set.
           * @param {object} [opts.params]  Used to pass params from invoke. Sets the datamodel when interpreter is instantiated.
           * @param {Snapshot} [opts.snapshot] State machine snapshot. Used to restore a serialized state machine.
           * @param {Statechart} [opts.parentSession]  Used to pass parent session during invoke.
           * @param {string }[opts.invokeid]  Support for id of invoke element at runtime.
           * @param {boolean} [opts.legacySemantics]
           * @param [opts.console]
           * @param [opts.transitionSelector]
           * @param [opts.customCancel]
           * @param [opts.customSend]
           * @param [opts.sendAsync]
           * @param [opts.doSend]
           * @param [opts.invokers]
           * @param [opts.xmlParser]
           * @param [opts.interpreterScriptingContext]
           * @param [opts.invokerExecutionContext]
           */

          var BaseInterpreter = function (_EventEmitter) {
            _inherits(BaseInterpreter, _EventEmitter);

            function BaseInterpreter(modelOrModelFactory, opts) {
              _classCallCheck(this, BaseInterpreter);

              var _this = _possibleConstructorReturn(this, (BaseInterpreter.__proto__ || Object.getPrototypeOf(BaseInterpreter)).call(this));

              _this.opts = opts;

              _this.opts.InterpreterScriptingContext = _this.opts.InterpreterScriptingContext || InterpreterScriptingContext;

              _this._isStepping = false;

              _this._scriptingContext = _this.opts.interpreterScriptingContext || (_this.opts.InterpreterScriptingContext ? new _this.opts.InterpreterScriptingContext(_this) : {});

              _this.opts.generateSessionid = _this.opts.generateSessionid || BaseInterpreter.generateSessionid;
              _this.opts.sessionid = _this.opts.sessionid || _this.opts.generateSessionid();
              _this.opts.sessionRegistry = _this.opts.sessionRegistry || BaseInterpreter.sessionRegistry; //TODO: define a better interface. For now, assume a Map<sessionid, session>
              _this.opts.invokerExecutionContext = opts.invokerExecutionContext || modelOrModelFactory._executionContext;

              var _ioprocessors = {};
              _ioprocessors[SCXML_IOPROCESSOR_TYPE] = {
                location: '#_scxml_' + _this.opts.sessionid
              };
              _ioprocessors.scxml = _ioprocessors[SCXML_IOPROCESSOR_TYPE]; //alias

              //SCXML system variables:
              _this.opts._x = {
                _sessionid: _this.opts.sessionid,
                _ioprocessors: _ioprocessors
              };

              var model;
              if (typeof modelOrModelFactory === 'function') {
                model = initializeModelGeneratorFn(modelOrModelFactory, _this.opts, _this);
              } else if ((typeof modelOrModelFactory === 'undefined' ? 'undefined' : _typeof(modelOrModelFactory)) === 'object') {
                model = JSON.parse(JSON.stringify(modelOrModelFactory)); //assume object
              } else {
                throw new Error('Unexpected model type. Expected model factory function, or scjson object.');
              }

              _this._model = initializeModel(model, _this.opts);

              _this.opts.console = _this.opts.console || (typeof console === 'undefined' ? { log: function log() {} } : console); //rely on global console if this console is undefined
              _this.opts.Set = _this.opts.Set || ArraySet;
              _this.opts.priorityComparisonFn = _this.opts.priorityComparisonFn || getTransitionWithHigherSourceChildPriority;
              _this.opts.transitionSelector = _this.opts.transitionSelector || scxmlPrefixTransitionSelector;

              _this.opts.sessionRegistry.set(String(_this.opts.sessionid), _this);

              _this._scriptingContext.log = _this._scriptingContext.log || function log() {
                if (this.opts.console.log.apply) {
                  this.opts.console.log.apply(this.opts.console, arguments);
                } else {
                  //console.log on older IE does not support Function.apply, so just pass him the first argument. Best we can do for now.
                  this.opts.console.log(Array.prototype.slice.apply(arguments).join(','));
                }
              }.bind(_this); //set up default scripting context log function

              _this._externalEventQueue = [];
              _this._internalEventQueue = [];

              if (_this.opts.params) {
                _this._model.$deserializeDatamodel(_this.opts.params); //load up the datamodel
              }

              //check if we're loading from a previous snapshot
              if (_this.opts.snapshot) {
                _this._configuration = new _this.opts.Set(deserializeSerializedConfiguration(_this.opts.snapshot[0], _this._model.$idToStateMap));
                _this._historyValue = deserializeHistory(_this.opts.snapshot[1], _this._model.$idToStateMap);
                _this._isInFinalState = _this.opts.snapshot[2];
                _this._model.$deserializeDatamodel(_this.opts.snapshot[3]); //load up the datamodel
                _this._internalEventQueue = _this.opts.snapshot[4];
              } else {
                _this._configuration = new _this.opts.Set();
                _this._historyValue = {};
                _this._isInFinalState = false;
              }

              //add debug logging
              BaseInterpreter.EVENTS.forEach(function (event) {
                this.on(event, this._log.bind(this, event));
              }, _this);

              module.exports.emit('new', _this);
              return _this;
            }

            /** 
            * Cancels the session. This clears all timers; puts the interpreter in a
            * final state; and runs all exit actions on current states.
            * @memberof BaseInterpreter.prototype
            */

            _createClass(BaseInterpreter, [{
              key: 'cancel',
              value: function cancel() {
                delete this.opts.parentSession;
                if (this._isInFinalState) return;
                this._isInFinalState = true;
                this._log('session cancelled ' + this.opts.invokeid);
                this._exitInterpreter(null);
              }
            }, {
              key: '_exitInterpreter',
              value: function _exitInterpreter(event) {
                var _this2 = this;

                //TODO: cancel invoked sessions
                //cancel all delayed sends when we enter into a final state.
                this._cancelAllDelayedSends();

                var statesToExit = this._getFullConfiguration().sort(getStateWithHigherSourceChildPriority);

                for (var j = 0, len = statesToExit.length; j < len; j++) {
                  var stateExited = statesToExit[j];

                  if (stateExited.onExit !== undefined) {
                    for (var exitIdx = 0, exitLen = stateExited.onExit.length; exitIdx < exitLen; exitIdx++) {
                      var block = stateExited.onExit[exitIdx];
                      for (var blockIdx = 0, blockLen = block.length; blockIdx < blockLen; blockIdx++) {
                        var actionRef = block[blockIdx];
                        try {
                          actionRef.call(this._scriptingContext, null);
                        } catch (e) {
                          this._handleError(e, actionRef);
                          break;
                        }
                      }
                    }
                  }

                  //cancel invoked session
                  if (stateExited.invokes) stateExited.invokes.forEach(function (invoke) {
                    _this2._scriptingContext.cancelInvoke(invoke.id);
                  });

                  //if he is a top-level <final> state, then return the done event
                  if (stateExited.$type === 'final' && stateExited.parent.$type === 'scxml') {

                    if (this.opts.parentSession) {
                      this._scriptingContext.send({
                        target: '#_parent',
                        name: 'done.invoke.' + this.opts.invokeid,
                        data: stateExited.donedata && stateExited.donedata.call(this._scriptingContext, event)
                      });
                    }

                    this.opts.sessionRegistry.delete(this.opts.sessionid);
                    this.emit('onExitInterpreter', event);
                  }
                }
              }

              /** 
               * Starts the interpreter. Should only be called once, and should be called
               * before BaseInterpreter.prototype#gen is called for the first time.  Returns a
               * Configuration.
               * @return {Configuration}
               * @memberof BaseInterpreter.prototype
               * @emits scion.BaseInterpreter#onEntry
               * @emits scion.BaseInterpreter#onExit
               * @emits scion.BaseInterpreter#onTransition
               * @emits scion.BaseInterpreter#onDefaultEntry
               * @emits scion.BaseInterpreter#onError
               * @emits scion.BaseInterpreter#onBigStepBegin
               * @emits scion.BaseInterpreter#onBigStepEnd
               * @emits scion.BaseInterpreter#onBigStepSuspend
               * @emits scion.BaseInterpreter#onBigStepResume
               * @emits scion.BaseInterpreter#onSmallStepBegin
               * @emits scion.BaseInterpreter#onSmallStepEnd
               * @emits scion.BaseInterpreter#onBigStepEnd
               * @emits scion.BaseInterpreter#onExitInterpreter
               */

            }, {
              key: 'start',
              value: function start() {
                this._initStart();
                this._performBigStep();
                return this.getConfiguration();
              }

              /**
               * This callback is displayed as a global member.
               * @callback genCallback
               * @param {Error} err
               * @param {Configuration} configuration
               */

              /**
               * Starts the interpreter asynchronously
               * @param  {genCallback} cb Callback invoked with an error or the interpreter's stable configuration
               * @memberof BaseInterpreter.prototype 
               * @emits scion.BaseInterpreter#onEntry
               * @emits scion.BaseInterpreter#onExit
               * @emits scion.BaseInterpreter#onTransition
               * @emits scion.BaseInterpreter#onDefaultEntry
               * @emits scion.BaseInterpreter#onError
               * @emits scion.BaseInterpreter#onBigStepBegin
               * @emits scion.BaseInterpreter#onBigStepEnd
               * @emits scion.BaseInterpreter#onBigStepSuspend
               * @emits scion.BaseInterpreter#onBigStepResume
               * @emits scion.BaseInterpreter#onSmallStepBegin
               * @emits scion.BaseInterpreter#onSmallStepEnd
               * @emits scion.BaseInterpreter#onBigStepEnd
               * @emits scion.BaseInterpreter#onExitInterpreter
               */

            }, {
              key: 'startAsync',
              value: function startAsync(cb) {
                cb = this._initStart(cb);
                this.genAsync(null, cb);
              }
            }, {
              key: '_initStart',
              value: function _initStart(cb) {
                var _this3 = this;

                if (typeof cb !== 'function') {
                  cb = nop;
                }

                this._log("performing initial big step");

                //We effectively need to figure out states to enter here to populate initial config. assuming root is compound state makes this simple.
                //but if we want it to be parallel, then this becomes more complex. so when initializing the model, we add a 'fake' root state, which
                //makes the following operation safe.
                this._model.initialRef.forEach(function (s) {
                  return _this3._configuration.add(s);
                });

                return cb;
              }

              /** 
              * Returns state machine {@link Configuration}.
              * @return {Configuration}
              * @memberof BaseInterpreter.prototype 
              */

            }, {
              key: 'getConfiguration',
              value: function getConfiguration() {
                return this._configuration.iter().map(function (s) {
                  return s.id;
                });
              }
            }, {
              key: '_getFullConfiguration',
              value: function _getFullConfiguration() {
                return this._configuration.iter().map(function (s) {
                  return [s].concat(query.getAncestors(s));
                }, this).reduce(function (a, b) {
                  return a.concat(b);
                }, []). //flatten
                reduce(function (a, b) {
                  return a.indexOf(b) > -1 ? a : a.concat(b);
                }, []); //uniq
              }

              /** 
              * @return {FullConfiguration}
              * @memberof BaseInterpreter.prototype 
              */

            }, {
              key: 'getFullConfiguration',
              value: function getFullConfiguration() {
                return this._getFullConfiguration().map(function (s) {
                  return s.id;
                });
              }

              /** 
              * @return {boolean}
              * @memberof BaseInterpreter.prototype 
              * @param {string} stateName
              */

            }, {
              key: 'isIn',
              value: function isIn(stateName) {
                return this.getFullConfiguration().indexOf(stateName) > -1;
              }

              /** 
              * Is the state machine in a final state?
              * @return {boolean}
              * @memberof BaseInterpreter.prototype 
              */

            }, {
              key: 'isFinal',
              value: function isFinal() {
                return this._isInFinalState;
              }

              /** @private */

            }, {
              key: '_performBigStep',
              value: function _performBigStep(e) {
                var currentEvent = void 0,
                    keepGoing = void 0,
                    allStatesExited = void 0,
                    allStatesEntered = void 0;

                var _startBigStep2 = this._startBigStep(e);

                var _startBigStep3 = _slicedToArray(_startBigStep2, 4);

                allStatesExited = _startBigStep3[0];
                allStatesEntered = _startBigStep3[1];
                keepGoing = _startBigStep3[2];
                currentEvent = _startBigStep3[3];

                while (keepGoing) {
                  var _selectTransitionsAnd = this._selectTransitionsAndPerformSmallStep(currentEvent, allStatesEntered, allStatesExited);

                  var _selectTransitionsAnd2 = _slicedToArray(_selectTransitionsAnd, 2);

                  currentEvent = _selectTransitionsAnd2[0];
                  keepGoing = _selectTransitionsAnd2[1];
                }

                this._finishBigStep(currentEvent, allStatesEntered, allStatesExited);
              }
            }, {
              key: '_selectTransitionsAndPerformSmallStep',
              value: function _selectTransitionsAndPerformSmallStep(currentEvent, allStatesEntered, allStatesExited) {
                //first select with null event
                var selectedTransitions = this._selectTransitions(currentEvent, true);
                if (selectedTransitions.isEmpty()) {
                  var ev = this._internalEventQueue.shift();
                  if (ev) {
                    currentEvent = ev;
                    selectedTransitions = this._selectTransitions(currentEvent, false);
                  }
                }

                if (!selectedTransitions.isEmpty()) {
                  this.emit('onSmallStepBegin', currentEvent);
                  var statesExited = void 0,
                      statesEntered = void 0;

                  var _performSmallStep2 = this._performSmallStep(currentEvent, selectedTransitions);

                  var _performSmallStep3 = _slicedToArray(_performSmallStep2, 2);

                  statesExited = _performSmallStep3[0];
                  statesEntered = _performSmallStep3[1];

                  if (statesExited) statesExited.forEach(function (s) {
                    return allStatesExited.add(s);
                  });
                  if (statesEntered) statesEntered.forEach(function (s) {
                    return allStatesEntered.add(s);
                  });
                  this.emit('onSmallStepEnd', currentEvent);
                }
                var keepGoing = !selectedTransitions.isEmpty() || this._internalEventQueue.length;
                return [currentEvent, keepGoing];
              }
            }, {
              key: '_startBigStep',
              value: function _startBigStep(e) {
                var _this4 = this;

                this.emit('onBigStepBegin', e);

                //do applyFinalize and autoforward
                this._configuration.iter().forEach(function (state) {
                  if (state.invokes) state.invokes.forEach(function (invoke) {
                    if (invoke.autoforward) {
                      //autoforward
                      _this4._scriptingContext.send({
                        target: '#_' + invoke.id,
                        name: e.name,
                        data: e.data
                      });
                    }
                    if (invoke.id === e.invokeid) {
                      //applyFinalize
                      if (invoke.finalize) invoke.finalize.forEach(function (action) {
                        return _this4._evaluateAction(e, action);
                      });
                    }
                  });
                });

                if (e) this._internalEventQueue.push(e);

                var allStatesExited = new Set(),
                    allStatesEntered = new Set();
                var keepGoing = true;
                var currentEvent = e;
                return [allStatesEntered, allStatesExited, keepGoing, currentEvent];
              }
            }, {
              key: '_finishBigStep',
              value: function _finishBigStep(e, allStatesEntered, allStatesExited, cb) {
                var _this5 = this;

                var statesToInvoke = Array.from(new Set([].concat(_toConsumableArray(allStatesEntered)).filter(function (s) {
                  return s.invokes && !allStatesExited.has(s);
                }))).sort(sortInEntryOrder);

                // Here we invoke whatever needs to be invoked. The implementation of 'invoke' is platform-specific
                statesToInvoke.forEach(function (s) {
                  s.invokes.forEach(function (f) {
                    return _this5._evaluateAction(e, f);
                  });
                });

                // cancel invoke for allStatesExited
                allStatesExited.forEach(function (s) {
                  if (s.invokes) s.invokes.forEach(function (invoke) {
                    _this5._scriptingContext.cancelInvoke(invoke.id);
                  });
                });

                // TODO: Invoking may have raised internal error events and we iterate to handle them        
                //if not internalQueue.isEmpty():
                //    continue

                this._isInFinalState = this._configuration.iter().every(function (s) {
                  return s.typeEnum === FINAL;
                });
                if (this._isInFinalState) {
                  this._exitInterpreter(e);
                }
                this.emit('onBigStepEnd', e);
                if (cb) cb(undefined, this.getConfiguration());
              }
            }, {
              key: '_cancelAllDelayedSends',
              value: function _cancelAllDelayedSends() {
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                  for (var _iterator = this._scriptingContext._timeouts[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var timeoutOptions = _step.value;

                    if (!timeoutOptions.sendOptions.delay) continue;
                    this._log('cancelling delayed send', timeoutOptions);
                    clearTimeout(timeoutOptions.timeoutHandle);
                    this._scriptingContext._timeouts.delete(timeoutOptions);
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

                Object.keys(this._scriptingContext._timeoutMap).forEach(function (key) {
                  delete this._scriptingContext._timeoutMap[key];
                }, this);
              }
            }, {
              key: '_performBigStepAsync',
              value: function _performBigStepAsync(e, cb) {
                var currentEvent = void 0,
                    keepGoing = void 0,
                    allStatesExited = void 0,
                    allStatesEntered = void 0;

                var _startBigStep4 = this._startBigStep(e);

                var _startBigStep5 = _slicedToArray(_startBigStep4, 4);

                allStatesExited = _startBigStep5[0];
                allStatesEntered = _startBigStep5[1];
                keepGoing = _startBigStep5[2];
                currentEvent = _startBigStep5[3];

                function nextStep(emit) {
                  this.emit(emit);

                  var _selectTransitionsAnd3 = this._selectTransitionsAndPerformSmallStep(currentEvent, allStatesEntered, allStatesExited);

                  var _selectTransitionsAnd4 = _slicedToArray(_selectTransitionsAnd3, 2);

                  currentEvent = _selectTransitionsAnd4[0];
                  keepGoing = _selectTransitionsAnd4[1];

                  if (keepGoing) {
                    this.emit('onBigStepSuspend');
                    setImmediate(nextStep.bind(this, 'onBigStepResume'));
                  } else {
                    this._finishBigStep(currentEvent, allStatesEntered, allStatesExited, cb);
                  }
                }
                nextStep.call(this, 'onBigStepBegin');
              }

              /** @private */

            }, {
              key: '_performSmallStep',
              value: function _performSmallStep(currentEvent, selectedTransitions) {

                this._log("selecting transitions with currentEvent", currentEvent);

                this._log("selected transitions", selectedTransitions);

                var statesExited = void 0,
                    statesEntered = void 0;

                if (!selectedTransitions.isEmpty()) {

                  //we only want to enter and exit states from transitions with targets
                  //filter out targetless transitions here - we will only use these to execute transition actions
                  var selectedTransitionsWithTargets = new this.opts.Set(selectedTransitions.iter().filter(transitionWithTargets));

                  statesExited = this._exitStates(currentEvent, selectedTransitionsWithTargets);
                  this._executeTransitions(currentEvent, selectedTransitions);
                  statesEntered = this._enterStates(currentEvent, selectedTransitionsWithTargets);

                  this._log("new configuration ", this._configuration);
                }

                return [statesExited, statesEntered];
              }
            }, {
              key: '_exitStates',
              value: function _exitStates(currentEvent, selectedTransitionsWithTargets) {
                var basicStatesExited = void 0,
                    statesExited = void 0;

                var _getStatesExited2 = this._getStatesExited(selectedTransitionsWithTargets);

                var _getStatesExited3 = _slicedToArray(_getStatesExited2, 2);

                basicStatesExited = _getStatesExited3[0];
                statesExited = _getStatesExited3[1];

                this._log('exiting states');
                for (var j = 0, len = statesExited.length; j < len; j++) {
                  var stateExited = statesExited[j];

                  if (stateExited.isAtomic) this._configuration.remove(stateExited);

                  this._log("exiting ", stateExited.id);

                  //invoke listeners
                  this.emit('onExit', stateExited.id);

                  if (stateExited.onExit !== undefined) {
                    for (var exitIdx = 0, exitLen = stateExited.onExit.length; exitIdx < exitLen; exitIdx++) {
                      var block = stateExited.onExit[exitIdx];
                      for (var blockIdx = 0, blockLen = block.length; blockIdx < blockLen; blockIdx++) {
                        var actionRef = block[blockIdx];
                        try {
                          actionRef.call(this._scriptingContext, currentEvent);
                        } catch (e) {
                          this._handleError(e, actionRef);
                          break;
                        }
                      }
                    }
                  }

                  var f;
                  if (stateExited.historyRef) {
                    var _iteratorNormalCompletion2 = true;
                    var _didIteratorError2 = false;
                    var _iteratorError2 = undefined;

                    try {
                      for (var _iterator2 = stateExited.historyRef[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                        var historyRef = _step2.value;

                        if (historyRef.isDeep) {
                          f = function f(s0) {
                            return s0.typeEnum === BASIC && stateExited.descendants.indexOf(s0) > -1;
                          };
                        } else {
                          f = function f(s0) {
                            return s0.parent === stateExited;
                          };
                        }
                        //update history
                        this._historyValue[historyRef.id] = statesExited.filter(f);
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
                  }
                }

                return statesExited;
              }

              /** @private */

            }, {
              key: '_getStatesExited',
              value: function _getStatesExited(transitions) {
                var statesExited = new this.opts.Set();
                var basicStatesExited = new this.opts.Set();

                //States exited are defined to be active states that are
                //descendants of the scope of each priority-enabled transition.
                //Here, we iterate through the transitions, and collect states
                //that match this condition. 
                var transitionList = transitions.iter();
                for (var txIdx = 0, txLen = transitionList.length; txIdx < txLen; txIdx++) {
                  var transition = transitionList[txIdx];
                  var scope = transition.scope,
                      desc = scope.descendants;

                  //For each state in the configuration
                  //is that state a descendant of the transition scope?
                  //Store ancestors of that state up to but not including the scope.
                  var configList = this._configuration.iter();
                  for (var cfgIdx = 0, cfgLen = configList.length; cfgIdx < cfgLen; cfgIdx++) {
                    var state = configList[cfgIdx];
                    if (desc.indexOf(state) > -1) {
                      basicStatesExited.add(state);
                      statesExited.add(state);
                      var ancestors = query.getAncestors(state, scope);
                      for (var ancIdx = 0, ancLen = ancestors.length; ancIdx < ancLen; ancIdx++) {
                        statesExited.add(ancestors[ancIdx]);
                      }
                    }
                  }
                }

                var sortedStatesExited = statesExited.iter().sort(getStateWithHigherSourceChildPriority);
                return [basicStatesExited, sortedStatesExited];
              }
            }, {
              key: '_executeTransitions',
              value: function _executeTransitions(currentEvent, selectedTransitions) {
                var sortedTransitions = selectedTransitions.iter().sort(transitionComparator);

                this._log("executing transitition actions");
                for (var stxIdx = 0, len = sortedTransitions.length; stxIdx < len; stxIdx++) {
                  var transition = sortedTransitions[stxIdx];

                  var targetIds = transition.targets && transition.targets.map(function (target) {
                    return target.id;
                  });

                  this.emit('onTransition', transition.source.id, targetIds, transition.source.transitions.indexOf(transition));

                  if (transition.onTransition !== undefined) {
                    for (var txIdx = 0, txLen = transition.onTransition.length; txIdx < txLen; txIdx++) {
                      var actionRef = transition.onTransition[txIdx];
                      try {
                        actionRef.call(this._scriptingContext, currentEvent);
                      } catch (e) {
                        this._handleError(e, actionRef);
                        break;
                      }
                    }
                  }
                }
              }
            }, {
              key: '_enterStates',
              value: function _enterStates(currentEvent, selectedTransitionsWithTargets) {
                var _this6 = this;

                this._log("entering states");

                var statesEntered = new Set();
                var statesForDefaultEntry = new Set();
                // initialize the temporary table for default content in history states
                var defaultHistoryContent = {};
                this._computeEntrySet(selectedTransitionsWithTargets, statesEntered, statesForDefaultEntry, defaultHistoryContent);
                statesEntered = Array.from(statesEntered).sort(sortInEntryOrder);

                this._log("statesEntered ", statesEntered);

                for (var enterIdx = 0, enterLen = statesEntered.length; enterIdx < enterLen; enterIdx++) {
                  var stateEntered = statesEntered[enterIdx];

                  if (stateEntered.isAtomic) this._configuration.add(stateEntered);

                  this._log("entering", stateEntered.id);

                  this.emit('onEntry', stateEntered.id);

                  if (stateEntered.onEntry !== undefined) {
                    for (var entryIdx = 0, entryLen = stateEntered.onEntry.length; entryIdx < entryLen; entryIdx++) {
                      var block = stateEntered.onEntry[entryIdx];
                      for (var blockIdx = 0, blockLen = block.length; blockIdx < blockLen; blockIdx++) {
                        var actionRef = block[blockIdx];
                        try {
                          actionRef.call(this._scriptingContext, currentEvent);
                        } catch (e) {
                          this._handleError(e, actionRef);
                          break;
                        }
                      }
                    }
                  }

                  if (statesForDefaultEntry.has(stateEntered)) {
                    var _iteratorNormalCompletion3 = true;
                    var _didIteratorError3 = false;
                    var _iteratorError3 = undefined;

                    try {
                      for (var _iterator3 = stateEntered.initialRef[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                        var initialState = _step3.value;

                        this.emit('onDefaultEntry', initialState.id);
                        if (initialState.typeEnum === INITIAL) {
                          var transition = initialState.transitions[0];
                          if (transition.onTransition !== undefined) {
                            this._log('executing initial transition content for initial state of parent state', stateEntered.id);
                            for (var txIdx = 0, txLen = transition.onTransition.length; txIdx < txLen; txIdx++) {
                              var _actionRef = transition.onTransition[txIdx];
                              try {
                                _actionRef.call(this._scriptingContext, currentEvent);
                              } catch (e) {
                                this._handleError(e, _actionRef);
                                break;
                              }
                            }
                          }
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
                  }

                  if (defaultHistoryContent[stateEntered.id]) {
                    var _transition = defaultHistoryContent[stateEntered.id];
                    if (_transition.onTransition !== undefined) {
                      this._log('executing history transition content for history state of parent state', stateEntered.id);
                      for (var txIdx = 0, txLen = _transition.onTransition.length; txIdx < txLen; txIdx++) {
                        var _actionRef2 = _transition.onTransition[txIdx];
                        try {
                          _actionRef2.call(this._scriptingContext, currentEvent);
                        } catch (e) {
                          this._handleError(e, _actionRef2);
                          break;
                        }
                      }
                    }
                  }
                }

                for (var enterIdx = 0, enterLen = statesEntered.length; enterIdx < enterLen; enterIdx++) {
                  var stateEntered = statesEntered[enterIdx];
                  if (stateEntered.typeEnum === FINAL) {
                    var parent = stateEntered.parent;
                    var grandparent = parent.parent;
                    this._internalEventQueue.push({ name: "done.state." + parent.id, data: stateEntered.donedata && stateEntered.donedata.call(this._scriptingContext, currentEvent) });
                    if (grandparent && grandparent.typeEnum === PARALLEL) {
                      if (grandparent.states.every(function (s) {
                        return _this6.isInFinalState(s);
                      })) {
                        this._internalEventQueue.push({ name: "done.state." + grandparent.id });
                      }
                    }
                  }
                }

                return statesEntered;
              }
            }, {
              key: '_getEffectiveTargetStates',
              value: function _getEffectiveTargetStates(transition) {
                var targets = new Set();
                var _iteratorNormalCompletion4 = true;
                var _didIteratorError4 = false;
                var _iteratorError4 = undefined;

                try {
                  for (var _iterator4 = transition.targets[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                    var s = _step4.value;

                    if (s.typeEnum === HISTORY) {
                      if (s.id in this._historyValue) this._historyValue[s.id].forEach(function (state) {
                        return targets.add(state);
                      });else [].concat(_toConsumableArray(this._getEffectiveTargetStates(s.transitions[0]))).forEach(function (state) {
                        return targets.add(state);
                      });
                    } else {
                      targets.add(s);
                    }
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

                return targets;
              }
            }, {
              key: '_computeEntrySet',
              value: function _computeEntrySet(transitions, statesToEnter, statesForDefaultEntry, defaultHistoryContent) {
                var _iteratorNormalCompletion5 = true;
                var _didIteratorError5 = false;
                var _iteratorError5 = undefined;

                try {
                  for (var _iterator5 = transitions.iter()[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
                    var t = _step5.value;
                    var _iteratorNormalCompletion6 = true;
                    var _didIteratorError6 = false;
                    var _iteratorError6 = undefined;

                    try {
                      for (var _iterator6 = t.targets[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
                        var s = _step6.value;

                        this._addDescendantStatesToEnter(s, statesToEnter, statesForDefaultEntry, defaultHistoryContent);
                      }
                    } catch (err) {
                      _didIteratorError6 = true;
                      _iteratorError6 = err;
                    } finally {
                      try {
                        if (!_iteratorNormalCompletion6 && _iterator6.return) {
                          _iterator6.return();
                        }
                      } finally {
                        if (_didIteratorError6) {
                          throw _iteratorError6;
                        }
                      }
                    }

                    var ancestor = t.scope;
                    var _iteratorNormalCompletion7 = true;
                    var _didIteratorError7 = false;
                    var _iteratorError7 = undefined;

                    try {
                      for (var _iterator7 = this._getEffectiveTargetStates(t)[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
                        var _s = _step7.value;

                        this._addAncestorStatesToEnter(_s, ancestor, statesToEnter, statesForDefaultEntry, defaultHistoryContent);
                      }
                    } catch (err) {
                      _didIteratorError7 = true;
                      _iteratorError7 = err;
                    } finally {
                      try {
                        if (!_iteratorNormalCompletion7 && _iterator7.return) {
                          _iterator7.return();
                        }
                      } finally {
                        if (_didIteratorError7) {
                          throw _iteratorError7;
                        }
                      }
                    }
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
            }, {
              key: '_computeExitSet',
              value: function _computeExitSet(transitions) {
                var statesToExit = new Set();
                var _iteratorNormalCompletion8 = true;
                var _didIteratorError8 = false;
                var _iteratorError8 = undefined;

                try {
                  for (var _iterator8 = transitions[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
                    var t = _step8.value;

                    if (t.targets) {
                      var scope = t.scope;
                      var _iteratorNormalCompletion9 = true;
                      var _didIteratorError9 = false;
                      var _iteratorError9 = undefined;

                      try {
                        for (var _iterator9 = this._getFullConfiguration()[Symbol.iterator](), _step9; !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
                          var s = _step9.value;

                          if (query.isDescendant(s, scope)) statesToExit.add(s);
                        }
                      } catch (err) {
                        _didIteratorError9 = true;
                        _iteratorError9 = err;
                      } finally {
                        try {
                          if (!_iteratorNormalCompletion9 && _iterator9.return) {
                            _iterator9.return();
                          }
                        } finally {
                          if (_didIteratorError9) {
                            throw _iteratorError9;
                          }
                        }
                      }
                    }
                  }
                } catch (err) {
                  _didIteratorError8 = true;
                  _iteratorError8 = err;
                } finally {
                  try {
                    if (!_iteratorNormalCompletion8 && _iterator8.return) {
                      _iterator8.return();
                    }
                  } finally {
                    if (_didIteratorError8) {
                      throw _iteratorError8;
                    }
                  }
                }

                return statesToExit;
              }
            }, {
              key: '_addAncestorStatesToEnter',
              value: function _addAncestorStatesToEnter(state, ancestor, statesToEnter, statesForDefaultEntry, defaultHistoryContent) {
                var _this7 = this;

                var traverse = function traverse(anc) {
                  if (anc.typeEnum === PARALLEL) {
                    var _iteratorNormalCompletion10 = true;
                    var _didIteratorError10 = false;
                    var _iteratorError10 = undefined;

                    try {
                      var _loop = function _loop() {
                        var child = _step10.value;

                        if (child.typeEnum !== HISTORY && ![].concat(_toConsumableArray(statesToEnter)).some(function (s) {
                          return query.isDescendant(s, child);
                        })) {
                          _this7._addDescendantStatesToEnter(child, statesToEnter, statesForDefaultEntry, defaultHistoryContent);
                        }
                      };

                      for (var _iterator10 = anc.states[Symbol.iterator](), _step10; !(_iteratorNormalCompletion10 = (_step10 = _iterator10.next()).done); _iteratorNormalCompletion10 = true) {
                        _loop();
                      }
                    } catch (err) {
                      _didIteratorError10 = true;
                      _iteratorError10 = err;
                    } finally {
                      try {
                        if (!_iteratorNormalCompletion10 && _iterator10.return) {
                          _iterator10.return();
                        }
                      } finally {
                        if (_didIteratorError10) {
                          throw _iteratorError10;
                        }
                      }
                    }
                  }
                };
                var _iteratorNormalCompletion11 = true;
                var _didIteratorError11 = false;
                var _iteratorError11 = undefined;

                try {
                  for (var _iterator11 = query.getAncestors(state, ancestor)[Symbol.iterator](), _step11; !(_iteratorNormalCompletion11 = (_step11 = _iterator11.next()).done); _iteratorNormalCompletion11 = true) {
                    var anc = _step11.value;

                    statesToEnter.add(anc);
                    traverse(anc);
                  }
                } catch (err) {
                  _didIteratorError11 = true;
                  _iteratorError11 = err;
                } finally {
                  try {
                    if (!_iteratorNormalCompletion11 && _iterator11.return) {
                      _iterator11.return();
                    }
                  } finally {
                    if (_didIteratorError11) {
                      throw _iteratorError11;
                    }
                  }
                }

                traverse(ancestor);
              }
            }, {
              key: '_addDescendantStatesToEnter',
              value: function _addDescendantStatesToEnter(state, statesToEnter, statesForDefaultEntry, defaultHistoryContent) {
                var _this8 = this;

                if (state.typeEnum === HISTORY) {
                  if (this._historyValue[state.id]) {
                    var _iteratorNormalCompletion12 = true;
                    var _didIteratorError12 = false;
                    var _iteratorError12 = undefined;

                    try {
                      for (var _iterator12 = this._historyValue[state.id][Symbol.iterator](), _step12; !(_iteratorNormalCompletion12 = (_step12 = _iterator12.next()).done); _iteratorNormalCompletion12 = true) {
                        var s = _step12.value;

                        this._addDescendantStatesToEnter(s, statesToEnter, statesForDefaultEntry, defaultHistoryContent);
                      }
                    } catch (err) {
                      _didIteratorError12 = true;
                      _iteratorError12 = err;
                    } finally {
                      try {
                        if (!_iteratorNormalCompletion12 && _iterator12.return) {
                          _iterator12.return();
                        }
                      } finally {
                        if (_didIteratorError12) {
                          throw _iteratorError12;
                        }
                      }
                    }

                    var _iteratorNormalCompletion13 = true;
                    var _didIteratorError13 = false;
                    var _iteratorError13 = undefined;

                    try {
                      for (var _iterator13 = this._historyValue[state.id][Symbol.iterator](), _step13; !(_iteratorNormalCompletion13 = (_step13 = _iterator13.next()).done); _iteratorNormalCompletion13 = true) {
                        var _s2 = _step13.value;

                        this._addAncestorStatesToEnter(_s2, state.parent, statesToEnter, statesForDefaultEntry, defaultHistoryContent);
                      }
                    } catch (err) {
                      _didIteratorError13 = true;
                      _iteratorError13 = err;
                    } finally {
                      try {
                        if (!_iteratorNormalCompletion13 && _iterator13.return) {
                          _iterator13.return();
                        }
                      } finally {
                        if (_didIteratorError13) {
                          throw _iteratorError13;
                        }
                      }
                    }
                  } else {
                    defaultHistoryContent[state.parent.id] = state.transitions[0];
                    var _iteratorNormalCompletion14 = true;
                    var _didIteratorError14 = false;
                    var _iteratorError14 = undefined;

                    try {
                      for (var _iterator14 = state.transitions[0].targets[Symbol.iterator](), _step14; !(_iteratorNormalCompletion14 = (_step14 = _iterator14.next()).done); _iteratorNormalCompletion14 = true) {
                        var _s3 = _step14.value;

                        this._addDescendantStatesToEnter(_s3, statesToEnter, statesForDefaultEntry, defaultHistoryContent);
                      }
                    } catch (err) {
                      _didIteratorError14 = true;
                      _iteratorError14 = err;
                    } finally {
                      try {
                        if (!_iteratorNormalCompletion14 && _iterator14.return) {
                          _iterator14.return();
                        }
                      } finally {
                        if (_didIteratorError14) {
                          throw _iteratorError14;
                        }
                      }
                    }

                    var _iteratorNormalCompletion15 = true;
                    var _didIteratorError15 = false;
                    var _iteratorError15 = undefined;

                    try {
                      for (var _iterator15 = state.transitions[0].targets[Symbol.iterator](), _step15; !(_iteratorNormalCompletion15 = (_step15 = _iterator15.next()).done); _iteratorNormalCompletion15 = true) {
                        var _s4 = _step15.value;

                        this._addAncestorStatesToEnter(_s4, state.parent, statesToEnter, statesForDefaultEntry, defaultHistoryContent);
                      }
                    } catch (err) {
                      _didIteratorError15 = true;
                      _iteratorError15 = err;
                    } finally {
                      try {
                        if (!_iteratorNormalCompletion15 && _iterator15.return) {
                          _iterator15.return();
                        }
                      } finally {
                        if (_didIteratorError15) {
                          throw _iteratorError15;
                        }
                      }
                    }
                  }
                } else {
                  statesToEnter.add(state);
                  if (state.typeEnum === COMPOSITE) {
                    statesForDefaultEntry.add(state);
                    //for each state in initialRef, if it is an initial state, then add ancestors and descendants.
                    var _iteratorNormalCompletion16 = true;
                    var _didIteratorError16 = false;
                    var _iteratorError16 = undefined;

                    try {
                      for (var _iterator16 = state.initialRef[Symbol.iterator](), _step16; !(_iteratorNormalCompletion16 = (_step16 = _iterator16.next()).done); _iteratorNormalCompletion16 = true) {
                        var _s5 = _step16.value;

                        var targets = _s5.typeEnum === INITIAL ? _s5.transitions[0].targets : [_s5];
                        var _iteratorNormalCompletion18 = true;
                        var _didIteratorError18 = false;
                        var _iteratorError18 = undefined;

                        try {
                          for (var _iterator18 = targets[Symbol.iterator](), _step18; !(_iteratorNormalCompletion18 = (_step18 = _iterator18.next()).done); _iteratorNormalCompletion18 = true) {
                            var targetState = _step18.value;

                            this._addDescendantStatesToEnter(targetState, statesToEnter, statesForDefaultEntry, defaultHistoryContent);
                          }
                        } catch (err) {
                          _didIteratorError18 = true;
                          _iteratorError18 = err;
                        } finally {
                          try {
                            if (!_iteratorNormalCompletion18 && _iterator18.return) {
                              _iterator18.return();
                            }
                          } finally {
                            if (_didIteratorError18) {
                              throw _iteratorError18;
                            }
                          }
                        }
                      }
                    } catch (err) {
                      _didIteratorError16 = true;
                      _iteratorError16 = err;
                    } finally {
                      try {
                        if (!_iteratorNormalCompletion16 && _iterator16.return) {
                          _iterator16.return();
                        }
                      } finally {
                        if (_didIteratorError16) {
                          throw _iteratorError16;
                        }
                      }
                    }

                    var _iteratorNormalCompletion17 = true;
                    var _didIteratorError17 = false;
                    var _iteratorError17 = undefined;

                    try {
                      for (var _iterator17 = state.initialRef[Symbol.iterator](), _step17; !(_iteratorNormalCompletion17 = (_step17 = _iterator17.next()).done); _iteratorNormalCompletion17 = true) {
                        var _s6 = _step17.value;

                        var _targets = _s6.typeEnum === INITIAL ? _s6.transitions[0].targets : [_s6];
                        var _iteratorNormalCompletion19 = true;
                        var _didIteratorError19 = false;
                        var _iteratorError19 = undefined;

                        try {
                          for (var _iterator19 = _targets[Symbol.iterator](), _step19; !(_iteratorNormalCompletion19 = (_step19 = _iterator19.next()).done); _iteratorNormalCompletion19 = true) {
                            var _targetState = _step19.value;

                            this._addAncestorStatesToEnter(_targetState, state, statesToEnter, statesForDefaultEntry, defaultHistoryContent);
                          }
                        } catch (err) {
                          _didIteratorError19 = true;
                          _iteratorError19 = err;
                        } finally {
                          try {
                            if (!_iteratorNormalCompletion19 && _iterator19.return) {
                              _iterator19.return();
                            }
                          } finally {
                            if (_didIteratorError19) {
                              throw _iteratorError19;
                            }
                          }
                        }
                      }
                    } catch (err) {
                      _didIteratorError17 = true;
                      _iteratorError17 = err;
                    } finally {
                      try {
                        if (!_iteratorNormalCompletion17 && _iterator17.return) {
                          _iterator17.return();
                        }
                      } finally {
                        if (_didIteratorError17) {
                          throw _iteratorError17;
                        }
                      }
                    }
                  } else {
                    if (state.typeEnum === PARALLEL) {
                      var _iteratorNormalCompletion20 = true;
                      var _didIteratorError20 = false;
                      var _iteratorError20 = undefined;

                      try {
                        var _loop2 = function _loop2() {
                          var child = _step20.value;

                          if (child.typeEnum !== HISTORY && ![].concat(_toConsumableArray(statesToEnter)).some(function (s) {
                            return query.isDescendant(s, child);
                          })) {
                            _this8._addDescendantStatesToEnter(child, statesToEnter, statesForDefaultEntry, defaultHistoryContent);
                          }
                        };

                        for (var _iterator20 = state.states[Symbol.iterator](), _step20; !(_iteratorNormalCompletion20 = (_step20 = _iterator20.next()).done); _iteratorNormalCompletion20 = true) {
                          _loop2();
                        }
                      } catch (err) {
                        _didIteratorError20 = true;
                        _iteratorError20 = err;
                      } finally {
                        try {
                          if (!_iteratorNormalCompletion20 && _iterator20.return) {
                            _iterator20.return();
                          }
                        } finally {
                          if (_didIteratorError20) {
                            throw _iteratorError20;
                          }
                        }
                      }
                    }
                  }
                }
              }
            }, {
              key: 'isInFinalState',
              value: function isInFinalState(s) {
                var _this9 = this;

                if (s.typeEnum === COMPOSITE) {
                  return s.states.some(function (s) {
                    return s.typeEnum === FINAL && _this9._configuration.contains(s);
                  });
                } else if (s.typeEnum === PARALLEL) {
                  return s.states.every(this.isInFinalState.bind(this));
                } else {
                  return false;
                }
              }

              /** @private */

            }, {
              key: '_evaluateAction',
              value: function _evaluateAction(currentEvent, actionRef) {
                try {
                  return actionRef.call(this._scriptingContext, currentEvent); //SCXML system variables
                } catch (e) {
                  this._handleError(e, actionRef);
                }
              }
            }, {
              key: '_handleError',
              value: function _handleError(e, actionRef) {
                var event = e instanceof Error || typeof e.__proto__.name === 'string' && e.__proto__.name.match(/^.*Error$/) ? //we can't just do 'e instanceof Error', because the Error object in the sandbox is from a different context, and instanceof will return false
                {
                  name: 'error.execution',
                  data: {
                    tagname: actionRef.tagname,
                    line: actionRef.line,
                    column: actionRef.column,
                    reason: e.message
                  },
                  type: 'platform'
                } : e.name ? e : {
                  name: 'error.execution',
                  data: e,
                  type: 'platform'
                };
                this._internalEventQueue.push(event);
                this.emit('onError', event);
              }
            }, {
              key: '_log',
              value: function _log() {
                if (printTrace) {
                  var args = Array.from(arguments);
                  this.opts.console.log(args[0] + ': ' + args.slice(1).map(function (arg) {
                    return arg === null ? 'null' : arg === undefined ? 'undefined' : typeof arg === 'string' ? arg : arg.toString() === '[object Object]' ? util.inspect(arg) : arg.toString();
                  }).join(', ') + '\n');
                }
              }

              /**
              * @interface Listener
              */

              /**
              * @function
              * @name Listener#onEntry 
              * @param {string} stateId
              */

              /**
              * @function
              * @name Listener#onExit 
              * @param {string} stateId
              */

              /**
              * @function
              * @name Listener#onTransition 
              * @param {string} sourceStateId Id of the source state
              * @param {Array<string>} targetStatesIds Ids of the target states
              * @param {number} transitionIndex Index of the transition relative to other transitions originating from source state.
              */

              /**
              * @function
              * @name Listener#onError
              * @param {Error} errorInfo
              */

              /**
              * @function
              * @name Listener#onBigStepBegin
              */

              /**
              * @function
              * @name Listener#onBigStepResume
              */

              /**
              * @function
              * @name Listener#onBigStepSuspend
              */

              /**
              * @function
              * @name Listener#onBigStepEnd
              */

              /**
              * @function
              * @name Listener#onSmallStepBegin
              * @param {string} event
              */

              /**
              * @function
              * @name Listener#onSmallStepEnd
              */

              /** 
              * Provides a generic mechanism to subscribe to state change and runtime
              * error notifications.  Can be used for logging and debugging. For example,
              * can attach a logger that simply logs the state changes.  Or can attach a
              * network debugging client that sends state change notifications to a
              * debugging server.
              * This is an alternative interface to {@link EventEmitter.prototype#on}.
              * @memberof BaseInterpreter.prototype 
              * @param {Listener} listener
              */

            }, {
              key: 'registerListener',
              value: function registerListener(listener) {
                BaseInterpreter.EVENTS.forEach(function (event) {
                  if (listener[event]) this.on(event, listener[event]);
                }, this);
              }

              /** 
              * Unregister a Listener
              * @memberof BaseInterpreter.prototype 
              * @param {Listener} listener
              */

            }, {
              key: 'unregisterListener',
              value: function unregisterListener(listener) {
                BaseInterpreter.EVENTS.forEach(function (event) {
                  if (listener[event]) this.off(event, listener[event]);
                }, this);
              }

              /** 
              * Query the model to get all transition events.
              * @return {Array<string>} Transition events.
              * @memberof BaseInterpreter.prototype 
              */

            }, {
              key: 'getAllTransitionEvents',
              value: function getAllTransitionEvents() {
                var events = {};
                function getEvents(state) {

                  if (state.transitions) {
                    for (var txIdx = 0, txLen = state.transitions.length; txIdx < txLen; txIdx++) {
                      events[state.transitions[txIdx].event] = true;
                    }
                  }

                  if (state.states) {
                    for (var stateIdx = 0, stateLen = state.states.length; stateIdx < stateLen; stateIdx++) {
                      getEvents(state.states[stateIdx]);
                    }
                  }
                }

                getEvents(this._model);

                return Object.keys(events);
              }

              /**
              * Three things capture the current snapshot of a running SCION interpreter:
              *
              *      <ul>
              *      <li> basic configuration (the set of basic states the state machine is in)</li>
              *      <li> history state values (the states the state machine was in last time it was in the parent of a history state)</li>
              *      <li> the datamodel</li>
              *      </ul>
              *      
              * The snapshot object can be serialized as JSON and saved to a database. It can
              * later be passed to the SCXML constructor to restore the state machine
              * using the snapshot argument.
              *
              * @return {Snapshot} 
              * @memberof BaseInterpreter.prototype 
              */

            }, {
              key: 'getSnapshot',
              value: function getSnapshot() {
                return [this.getConfiguration(), this._serializeHistory(), this._isInFinalState, this._model.$serializeDatamodel(), this._internalEventQueue.slice()];
              }
            }, {
              key: '_serializeHistory',
              value: function _serializeHistory() {
                var o = {};
                Object.keys(this._historyValue).forEach(function (sid) {
                  o[sid] = this._historyValue[sid].map(function (state) {
                    return state.id;
                  });
                }, this);
                return o;
              }

              /**
               * @interface Event
               */

              /** 
              * @member name
              * @memberof Event.prototype 
              * @type string
              * @description The name of the event
              */

              /** 
              * @member data
              * @memberof Event.prototype 
              * @type any
              * @description The event data
              */

              /** 
              * An SCXML interpreter takes SCXML events as input, where an SCXML event is an
              * object with "name" and "data" properties. These can be passed to method `gen`
              * as two positional arguments, or as a single object.
              * @param {string|Event} evtObjOrName
              * @param {any=} optionalData
              * @emits scion.BaseInterpreter#onEntry
              * @emits scion.BaseInterpreter#onExit
              * @emits scion.BaseInterpreter#onTransition
              * @emits scion.BaseInterpreter#onDefaultEntry
              * @emits scion.BaseInterpreter#onError
              * @emits scion.BaseInterpreter#onBigStepBegin
              * @emits scion.BaseInterpreter#onBigStepEnd
              * @emits scion.BaseInterpreter#onBigStepSuspend
              * @emits scion.BaseInterpreter#onBigStepResume
              * @emits scion.BaseInterpreter#onSmallStepBegin
              * @emits scion.BaseInterpreter#onSmallStepEnd
              * @emits scion.BaseInterpreter#onBigStepEnd
              * @emits scion.BaseInterpreter#onExitInterpreter
              */

            }, {
              key: 'gen',
              value: function gen(evtObjOrName, optionalData) {
                var currentEvent;
                switch (typeof evtObjOrName === 'undefined' ? 'undefined' : _typeof(evtObjOrName)) {
                  case 'string':
                    currentEvent = { name: evtObjOrName, data: optionalData };
                    break;
                  case 'object':
                    if (typeof evtObjOrName.name === 'string') {
                      currentEvent = evtObjOrName;
                    } else {
                      throw new Error('Event object must have "name" property of type string.');
                    }
                    break;
                  default:
                    throw new Error('First argument to gen must be a string or object.');
                }

                if (this._isStepping) throw new Error('Cannot call gen during a big-step');

                //otherwise, kick him off
                this._isStepping = true;

                this._performBigStep(currentEvent);

                this._isStepping = false;
                return this.getConfiguration();
              }

              /**
              * Injects an external event into the interpreter asynchronously
              * @param {Event}  currentEvent The event to inject
              * @param {genCallback} cb Callback invoked with an error or the interpreter's stable configuration
              * @emits scion.BaseInterpreter#onEntry
              * @emits scion.BaseInterpreter#onExit
              * @emits scion.BaseInterpreter#onTransition
              * @emits scion.BaseInterpreter#onDefaultEntry
              * @emits scion.BaseInterpreter#onError
              * @emits scion.BaseInterpreter#onBigStepBegin
              * @emits scion.BaseInterpreter#onBigStepEnd
              * @emits scion.BaseInterpreter#onBigStepSuspend
              * @emits scion.BaseInterpreter#onBigStepResume
              * @emits scion.BaseInterpreter#onSmallStepBegin
              * @emits scion.BaseInterpreter#onSmallStepEnd
              * @emits scion.BaseInterpreter#onBigStepEnd
              * @emits scion.BaseInterpreter#onExitInterpreter
              */

            }, {
              key: 'genAsync',
              value: function genAsync(currentEvent, cb) {
                if (currentEvent !== null && ((typeof currentEvent === 'undefined' ? 'undefined' : _typeof(currentEvent)) !== 'object' || !currentEvent || typeof currentEvent.name !== 'string')) {
                  throw new Error('Expected currentEvent to be null or an Object with a name');
                }

                if (typeof cb !== 'function') {
                  cb = nop;
                }

                this._externalEventQueue.push([currentEvent, cb]);

                //the semantics we want are to return to the cb the results of processing that particular event.
                function nextStep(e, c) {
                  this._performBigStepAsync(e, function (err, config) {
                    c(err, config);

                    if (this._externalEventQueue.length) {
                      nextStep.apply(this, this._externalEventQueue.shift());
                    } else {
                      this._isStepping = false;
                    }
                  }.bind(this));
                }
                if (!this._isStepping) {
                  this._isStepping = true;
                  nextStep.apply(this, this._externalEventQueue.shift());
                }
              }
            }]);

            return BaseInterpreter;
          }(EventEmitter);

          BaseInterpreter.EVENTS = ['onEntry', 'onExit', 'onTransition', 'onDefaultEntry', 'onError', 'onBigStepBegin', 'onBigStepSuspend', 'onBigStepResume', 'onSmallStepBegin', 'onSmallStepEnd', 'onBigStepEnd', 'onExitInterpreter'];

          //some global singletons to use to generate in-memory session ids, in case the user does not specify these data structures
          BaseInterpreter.sessionIdCounter = 1;
          BaseInterpreter.generateSessionid = function () {
            return BaseInterpreter.sessionIdCounter++;
          };
          BaseInterpreter.sessionRegistry = new Map();

          // Do nothing

          function nop() {}

          var InterpreterScriptingContext = function () {
            function InterpreterScriptingContext(interpreter) {
              _classCallCheck(this, InterpreterScriptingContext);

              this._interpreter = interpreter;
              this._timeoutMap = {};
              this._invokeMap = {};
              this._timeouts = new Set();

              //Regex from:
              //  http://daringfireball.net/2010/07/improved_regex_for_matching_urls
              //  http://stackoverflow.com/a/6927878
              this.validateUriRegex = /(#_.*)|\b((?:[a-z][\w-]+:(?:\/{1,3}|[a-z0-9%])|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’]))/i;

              this.invokeSendTargetRegex = /^#_(.*)$/;
              this.scxmlSendTargetRegex = /^#_scxml_(.*)$/;
            }

            _createClass(InterpreterScriptingContext, [{
              key: 'raise',
              value: function raise(event) {
                this._installDefaultPropsOnEvent(event, true);
                this._interpreter._internalEventQueue.push(event);
              }
            }, {
              key: 'parseXmlStringAsDOM',
              value: function parseXmlStringAsDOM(xmlString) {
                return (this._interpreter.opts.xmlParser || InterpreterScriptingContext.xmlParser).parse(xmlString);
              }
            }, {
              key: 'invoke',
              value: function invoke(invokeObj) {
                var _this10 = this;

                //look up invoker by type. assume invokers are passed in as an option to constructor
                this._invokeMap[invokeObj.id] = new Promise(function (resolve, reject) {
                  (_this10._interpreter.opts.invokers || InterpreterScriptingContext.invokers)[invokeObj.type](_this10._interpreter, invokeObj, _this10._interpreter.opts.invokerExecutionContext, function (err, session) {
                    if (err) return reject(err);

                    _this10._interpreter.emit('onInvokedSessionInitialized', session);
                    resolve(session);
                  });
                });
              }
            }, {
              key: 'cancelInvoke',
              value: function cancelInvoke(invokeid) {
                var _this11 = this;

                //TODO: on cancel invoke clean up this._invokeMap
                var sessionPromise = this._invokeMap[invokeid];
                this._interpreter._log('cancelling session with invokeid ' + invokeid);
                if (sessionPromise) {
                  this._interpreter._log('sessionPromise found');
                  sessionPromise.then(function (session) {
                    _this11._interpreter._log('resolved session ' + invokeid + '. cancelling... ');
                    session.cancel();
                    //clean up
                    delete _this11._invokeMap[invokeid];
                  }, function (err) {
                    //TODO: dispatch error back into the state machine as error.communication
                  });
                }
              }
            }, {
              key: '_installDefaultPropsOnEvent',
              value: function _installDefaultPropsOnEvent(event, isInternal) {
                if (!isInternal) {
                  event.origin = this._interpreter.opts._x._ioprocessors.scxml.location; //TODO: preserve original origin when we autoforward? 
                  event.origintype = event.type || SCXML_IOPROCESSOR_TYPE;
                }
                if (typeof event.type === 'undefined') {
                  event.type = isInternal ? 'internal' : 'external';
                }
                ['name', 'sendid', 'invokeid', 'data', 'origin', 'origintype'].forEach(function (prop) {
                  if (typeof event[prop] === 'undefined') {
                    event[prop] = undefined;
                  }
                });
              }
            }, {
              key: 'send',
              value: function send(event, options) {
                this._interpreter._log('send event', event, options);
                options = options || {};
                var sendType = options.type || SCXML_IOPROCESSOR_TYPE;
                //TODO: move these out
                function validateSend(event, options, sendAction) {
                  if (event.target) {
                    var targetIsValidUri = this.validateUriRegex.test(event.target);
                    if (!targetIsValidUri) {
                      throw { name: "error.execution", data: 'Target is not valid URI', sendid: event.sendid, type: 'platform' };
                    }
                  }
                  if (sendType !== SCXML_IOPROCESSOR_TYPE) {
                    //TODO: extend this to support HTTP, and other IO processors
                    throw { name: "error.execution", data: 'Unsupported event processor type', sendid: event.sendid, type: 'platform' };
                  }

                  sendAction.call(this, event, options);
                }

                function defaultSendAction(event, options) {
                  var _this12 = this;

                  if (typeof setTimeout === 'undefined') throw new Error('Default implementation of BaseInterpreter.prototype.send will not work unless setTimeout is defined globally.');

                  var match;
                  if (event.target === '#_internal') {
                    this.raise(event);
                  } else {
                    this._installDefaultPropsOnEvent(event, false);
                    event.origintype = SCXML_IOPROCESSOR_TYPE; //TODO: extend this to support HTTP, and other IO processors
                    //TODO : paramterize this based on send/@type?
                    if (!event.target) {
                      doSend.call(this, this._interpreter);
                    } else if (event.target === '#_parent') {
                      if (this._interpreter.opts.parentSession) {
                        event.invokeid = this._interpreter.opts.invokeid;
                        doSend.call(this, this._interpreter.opts.parentSession);
                      } else {
                        throw { name: "error.communication", data: 'Parent session not specified', sendid: event.sendid, type: 'platform' };
                      }
                    } else if (match = event.target.match(this.scxmlSendTargetRegex)) {
                      var targetSessionId = match[1];
                      var session = this._interpreter.opts.sessionRegistry.get(targetSessionId);
                      if (session) {
                        doSend.call(this, session);
                      } else {
                        throw { name: 'error.communication', sendid: event.sendid, type: 'platform' };
                      }
                    } else if (match = event.target.match(this.invokeSendTargetRegex)) {
                      //TODO: test this code path.
                      var invokeId = match[1];
                      this._invokeMap[invokeId].then(function (session) {
                        doSend.call(_this12, session);
                      });
                    } else {
                      throw new Error('Unrecognized send target.'); //TODO: dispatch error back into the state machine
                    }
                  }

                  function doSend(session) {
                    //TODO: we probably now need to refactor data structures:
                    //    this._timeouts
                    //    this._timeoutMap
                    var timeoutHandle = setTimeout(function () {
                      if (event.sendid) delete this._timeoutMap[event.sendid];
                      this._timeouts.delete(timeoutOptions);
                      if (this._interpreter.opts.doSend) {
                        this._interpreter.opts.doSend(session, event);
                      } else {
                        session[this._interpreter.opts.sendAsync ? 'genAsync' : 'gen'](event);
                      }
                    }.bind(this), options.delay || 0);

                    var timeoutOptions = {
                      sendOptions: options,
                      timeoutHandle: timeoutHandle
                    };
                    if (event.sendid) this._timeoutMap[event.sendid] = timeoutHandle;
                    this._timeouts.add(timeoutOptions);
                  }
                }

                function publish() {
                  this._interpreter.emit(event.name, event.data);
                }

                //choose send function
                //TODO: rethink how this custom send works
                var sendFn;
                if (event.type === 'https://github.com/jbeard4/SCION#publish') {
                  sendFn = publish;
                } else if (this._interpreter.opts.customSend) {
                  sendFn = this._interpreter.opts.customSend;
                } else {
                  sendFn = defaultSendAction;
                }

                options = options || {};

                this._interpreter._log("sending event", event.name, "with content", event.data, "after delay", options.delay);

                validateSend.call(this, event, options, sendFn);
              }
            }, {
              key: 'cancel',
              value: function cancel(sendid) {
                if (this._interpreter.opts.customCancel) {
                  return this._interpreter.opts.customCancel.apply(this, [sendid]);
                }

                if (typeof clearTimeout === 'undefined') throw new Error('Default implementation of BaseInterpreter.prototype.cancel will not work unless setTimeout is defined globally.');

                if (sendid in this._timeoutMap) {
                  this._interpreter._log("cancelling ", sendid, " with timeout id ", this._timeoutMap[sendid]);
                  clearTimeout(this._timeoutMap[sendid]);
                }
              }
            }]);

            return InterpreterScriptingContext;
          }();

          module.exports = extend(new EventEmitter(), {
            BaseInterpreter: BaseInterpreter,
            ArraySet: ArraySet,
            STATE_TYPES: constants.STATE_TYPES,
            initializeModel: initializeModel,
            InterpreterScriptingContext: InterpreterScriptingContext,
            helpers: helpers,
            query: query
          });
        }).call(this, require('_process'), require("timers").setImmediate);
      }, { "./ArraySet": 1, "./constants": 2, "./helpers": 3, "./query": 4, "_process": 9, "timers": 10, "tiny-events": 6, "util": 12 }], 6: [function (require, module, exports) {
        function EventEmitter() {
          this._listeners = {};
        }

        EventEmitter.prototype.on = function _on(type, listener) {
          if (!Array.isArray(this._listeners[type])) {
            this._listeners[type] = [];
          }

          if (this._listeners[type].indexOf(listener) === -1) {
            this._listeners[type].push(listener);
          }

          return this;
        };

        EventEmitter.prototype.once = function _once(type, listener) {
          var self = this;

          function __once() {
            for (var args = [], i = 0; i < arguments.length; i += 1) {
              args[i] = arguments[i];
            }

            self.off(type, __once);
            listener.apply(self, args);
          }

          __once.listener = listener;

          return this.on(type, __once);
        };

        EventEmitter.prototype.off = function _off(type, listener) {
          if (!Array.isArray(this._listeners[type])) {
            return this;
          }

          if (typeof listener === 'undefined') {
            this._listeners[type] = [];
            return this;
          }

          var index = this._listeners[type].indexOf(listener);

          if (index === -1) {
            for (var i = 0; i < this._listeners[type].length; i += 1) {
              if (this._listeners[type][i].listener === listener) {
                index = i;
                break;
              }
            }
          }

          this._listeners[type].splice(index, 1);
          return this;
        };

        EventEmitter.prototype.emit = function _emit(type) {
          if (!Array.isArray(this._listeners[type])) {
            return this;
          }

          for (var args = [], i = 1; i < arguments.length; i += 1) {
            args[i - 1] = arguments[i];
          }

          this._listeners[type].forEach(function __emit(listener) {
            listener.apply(this, args);
          }, this);

          return this;
        };

        module.exports.EventEmitter = EventEmitter;
      }, {}], 7: [function (require, module, exports) {
        'use strict';

        var _createClass = function () {
          function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
              var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
            }
          }return function (Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
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

        function _classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
          }
        }

        function _possibleConstructorReturn(self, call) {
          if (!self) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
          }return call && ((typeof call === "undefined" ? "undefined" : _typeof2(call)) === "object" || typeof call === "function") ? call : self;
        }

        function _inherits(subClass, superClass) {
          if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof2(superClass)));
          }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
        }

        var base = require('@scion-scxml/core-base'),
            helpers = base.helpers,
            query = base.query,
            transitionComparator = base.helpers.transitionComparator;

        /** 
         * @description Implements semantics described in Algorithm D of the SCXML specification. 
         * See {@link scion.BaseInterpreter} for information on the constructor arguments.
         * @class SCInterpreter 
         * @extends BaseInterpreter
         */

        var Statechart = function (_base$BaseInterpreter) {
          _inherits(Statechart, _base$BaseInterpreter);

          function Statechart(modelOrModelFactory, opts) {
            _classCallCheck(this, Statechart);

            opts = opts || {};
            opts.legacySemantics = false;

            return _possibleConstructorReturn(this, (Statechart.__proto__ || Object.getPrototypeOf(Statechart)).call(this, modelOrModelFactory, opts));
          }

          /** @private */

          _createClass(Statechart, [{
            key: '_selectTransitions',
            value: function _selectTransitions(currentEvent, selectEventlessTransitions) {
              var transitionSelector = this.opts.transitionSelector;
              var enabledTransitions = new this.opts.Set();

              var e = this._evaluateAction.bind(this, currentEvent);

              var atomicStates = this._configuration.iter().sort(transitionComparator);
              var _iteratorNormalCompletion = true;
              var _didIteratorError = false;
              var _iteratorError = undefined;

              try {
                for (var _iterator = atomicStates[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                  var state = _step.value;
                  var _iteratorNormalCompletion2 = true;
                  var _didIteratorError2 = false;
                  var _iteratorError2 = undefined;

                  try {
                    loop: for (var _iterator2 = [state].concat(query.getAncestors(state))[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                      var s = _step2.value;
                      var _iteratorNormalCompletion3 = true;
                      var _didIteratorError3 = false;
                      var _iteratorError3 = undefined;

                      try {
                        for (var _iterator3 = s.transitions[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                          var t = _step3.value;

                          if (transitionSelector(t, currentEvent, e, selectEventlessTransitions)) {
                            enabledTransitions.add(t);
                            break loop;
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

              var priorityEnabledTransitions = this._removeConflictingTransition(enabledTransitions);

              this._log("priorityEnabledTransitions", priorityEnabledTransitions);

              return priorityEnabledTransitions;
            }

            /** @private */

          }, {
            key: '_removeConflictingTransition',
            value: function _removeConflictingTransition(enabledTransitions) {
              var _this2 = this;

              var filteredTransitions = new this.opts.Set();
              //toList sorts the transitions in the order of the states that selected them
              var _iteratorNormalCompletion4 = true;
              var _didIteratorError4 = false;
              var _iteratorError4 = undefined;

              try {
                for (var _iterator4 = enabledTransitions.iter()[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                  var t1 = _step4.value;

                  var t1Preempted = false;
                  var transitionsToRemove = new Set();
                  var _iteratorNormalCompletion5 = true;
                  var _didIteratorError5 = false;
                  var _iteratorError5 = undefined;

                  try {
                    var _loop = function _loop() {
                      var t2 = _step5.value;

                      //TODO: can we compute this statically? for example, by checking if the transition scopes are arena orthogonal?
                      var t1ExitSet = _this2._computeExitSet([t1]);
                      var t2ExitSet = _this2._computeExitSet([t2]);
                      var hasIntersection = [].concat(_toConsumableArray(t1ExitSet)).some(function (s) {
                        return t2ExitSet.has(s);
                      }) || [].concat(_toConsumableArray(t2ExitSet)).some(function (s) {
                        return t1ExitSet.has(s);
                      });
                      _this2._log('t1ExitSet', t1.source.id, [].concat(_toConsumableArray(t1ExitSet)).map(function (s) {
                        return s.id;
                      }));
                      _this2._log('t2ExitSet', t2.source.id, [].concat(_toConsumableArray(t2ExitSet)).map(function (s) {
                        return s.id;
                      }));
                      _this2._log('hasIntersection', hasIntersection);
                      if (hasIntersection) {
                        if (t2.source.descendants.indexOf(t1.source) > -1) {
                          //is this the same as being ancestrally related?
                          transitionsToRemove.add(t2);
                        } else {
                          t1Preempted = true;
                          return 'break';
                        }
                      }
                    };

                    for (var _iterator5 = filteredTransitions.iter()[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
                      var _ret = _loop();

                      if (_ret === 'break') break;
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

                  if (!t1Preempted) {
                    var _iteratorNormalCompletion6 = true;
                    var _didIteratorError6 = false;
                    var _iteratorError6 = undefined;

                    try {
                      for (var _iterator6 = transitionsToRemove[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
                        var t3 = _step6.value;

                        filteredTransitions.remove(t3);
                      }
                    } catch (err) {
                      _didIteratorError6 = true;
                      _iteratorError6 = err;
                    } finally {
                      try {
                        if (!_iteratorNormalCompletion6 && _iterator6.return) {
                          _iterator6.return();
                        }
                      } finally {
                        if (_didIteratorError6) {
                          throw _iteratorError6;
                        }
                      }
                    }

                    filteredTransitions.add(t1);
                  }
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

              return filteredTransitions;
            }
          }]);

          return Statechart;
        }(base.BaseInterpreter);

        base.Statechart = Statechart;
        module.exports = base;
      }, { "@scion-scxml/core-base": 5 }], 8: [function (require, module, exports) {
        if (typeof Object.create === 'function') {
          // implementation from standard node.js 'util' module
          module.exports = function inherits(ctor, superCtor) {
            ctor.super_ = superCtor;
            ctor.prototype = Object.create(superCtor.prototype, {
              constructor: {
                value: ctor,
                enumerable: false,
                writable: true,
                configurable: true
              }
            });
          };
        } else {
          // old school shim for old browsers
          module.exports = function inherits(ctor, superCtor) {
            ctor.super_ = superCtor;
            var TempCtor = function TempCtor() {};
            TempCtor.prototype = superCtor.prototype;
            ctor.prototype = new TempCtor();
            ctor.prototype.constructor = ctor;
          };
        }
      }, {}], 9: [function (require, module, exports) {
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
        process.prependListener = noop;
        process.prependOnceListener = noop;

        process.listeners = function (name) {
          return [];
        };

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
      }, {}], 10: [function (require, module, exports) {
        (function (setImmediate, clearImmediate) {
          var nextTick = require('process/browser.js').nextTick;
          var apply = Function.prototype.apply;
          var slice = Array.prototype.slice;
          var immediateIds = {};
          var nextImmediateId = 0;

          // DOM APIs, for completeness

          exports.setTimeout = function () {
            return new Timeout(apply.call(setTimeout, window, arguments), clearTimeout);
          };
          exports.setInterval = function () {
            return new Timeout(apply.call(setInterval, window, arguments), clearInterval);
          };
          exports.clearTimeout = exports.clearInterval = function (timeout) {
            timeout.close();
          };

          function Timeout(id, clearFn) {
            this._id = id;
            this._clearFn = clearFn;
          }
          Timeout.prototype.unref = Timeout.prototype.ref = function () {};
          Timeout.prototype.close = function () {
            this._clearFn.call(window, this._id);
          };

          // Does not start the time, just sets up the members needed.
          exports.enroll = function (item, msecs) {
            clearTimeout(item._idleTimeoutId);
            item._idleTimeout = msecs;
          };

          exports.unenroll = function (item) {
            clearTimeout(item._idleTimeoutId);
            item._idleTimeout = -1;
          };

          exports._unrefActive = exports.active = function (item) {
            clearTimeout(item._idleTimeoutId);

            var msecs = item._idleTimeout;
            if (msecs >= 0) {
              item._idleTimeoutId = setTimeout(function onTimeout() {
                if (item._onTimeout) item._onTimeout();
              }, msecs);
            }
          };

          // That's not how node.js implements it but the exposed api is the same.
          exports.setImmediate = typeof setImmediate === "function" ? setImmediate : function (fn) {
            var id = nextImmediateId++;
            var args = arguments.length < 2 ? false : slice.call(arguments, 1);

            immediateIds[id] = true;

            nextTick(function onNextTick() {
              if (immediateIds[id]) {
                // fn.call() is faster so we optimize for the common use-case
                // @see http://jsperf.com/call-apply-segu
                if (args) {
                  fn.apply(null, args);
                } else {
                  fn.call(null);
                }
                // Prevent ids from leaking
                exports.clearImmediate(id);
              }
            });

            return id;
          };

          exports.clearImmediate = typeof clearImmediate === "function" ? clearImmediate : function (id) {
            delete immediateIds[id];
          };
        }).call(this, require("timers").setImmediate, require("timers").clearImmediate);
      }, { "process/browser.js": 9, "timers": 10 }], 11: [function (require, module, exports) {
        module.exports = function isBuffer(arg) {
          return arg && (typeof arg === "undefined" ? "undefined" : _typeof2(arg)) === 'object' && typeof arg.copy === 'function' && typeof arg.fill === 'function' && typeof arg.readUInt8 === 'function';
        };
      }, {}], 12: [function (require, module, exports) {
        (function (process, global) {
          // Copyright Joyent, Inc. and other Node contributors.
          //
          // Permission is hereby granted, free of charge, to any person obtaining a
          // copy of this software and associated documentation files (the
          // "Software"), to deal in the Software without restriction, including
          // without limitation the rights to use, copy, modify, merge, publish,
          // distribute, sublicense, and/or sell copies of the Software, and to permit
          // persons to whom the Software is furnished to do so, subject to the
          // following conditions:
          //
          // The above copyright notice and this permission notice shall be included
          // in all copies or substantial portions of the Software.
          //
          // THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
          // OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
          // MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
          // NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
          // DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
          // OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
          // USE OR OTHER DEALINGS IN THE SOFTWARE.

          var formatRegExp = /%[sdj%]/g;
          exports.format = function (f) {
            if (!isString(f)) {
              var objects = [];
              for (var i = 0; i < arguments.length; i++) {
                objects.push(inspect(arguments[i]));
              }
              return objects.join(' ');
            }

            var i = 1;
            var args = arguments;
            var len = args.length;
            var str = String(f).replace(formatRegExp, function (x) {
              if (x === '%%') return '%';
              if (i >= len) return x;
              switch (x) {
                case '%s':
                  return String(args[i++]);
                case '%d':
                  return Number(args[i++]);
                case '%j':
                  try {
                    return JSON.stringify(args[i++]);
                  } catch (_) {
                    return '[Circular]';
                  }
                default:
                  return x;
              }
            });
            for (var x = args[i]; i < len; x = args[++i]) {
              if (isNull(x) || !isObject(x)) {
                str += ' ' + x;
              } else {
                str += ' ' + inspect(x);
              }
            }
            return str;
          };

          // Mark that a method should not be used.
          // Returns a modified function which warns once by default.
          // If --no-deprecation is set, then it is a no-op.
          exports.deprecate = function (fn, msg) {
            // Allow for deprecating things in the process of starting up.
            if (isUndefined(global.process)) {
              return function () {
                return exports.deprecate(fn, msg).apply(this, arguments);
              };
            }

            if (process.noDeprecation === true) {
              return fn;
            }

            var warned = false;
            function deprecated() {
              if (!warned) {
                if (process.throwDeprecation) {
                  throw new Error(msg);
                } else if (process.traceDeprecation) {
                  console.trace(msg);
                } else {
                  console.error(msg);
                }
                warned = true;
              }
              return fn.apply(this, arguments);
            }

            return deprecated;
          };

          var debugs = {};
          var debugEnviron;
          exports.debuglog = function (set) {
            if (isUndefined(debugEnviron)) debugEnviron = process.env.NODE_DEBUG || '';
            set = set.toUpperCase();
            if (!debugs[set]) {
              if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
                var pid = process.pid;
                debugs[set] = function () {
                  var msg = exports.format.apply(exports, arguments);
                  console.error('%s %d: %s', set, pid, msg);
                };
              } else {
                debugs[set] = function () {};
              }
            }
            return debugs[set];
          };

          /**
           * Echos the value of a value. Trys to print the value out
           * in the best way possible given the different types.
           *
           * @param {Object} obj The object to print out.
           * @param {Object} opts Optional options object that alters the output.
           */
          /* legacy: obj, showHidden, depth, colors*/
          function inspect(obj, opts) {
            // default options
            var ctx = {
              seen: [],
              stylize: stylizeNoColor
            };
            // legacy...
            if (arguments.length >= 3) ctx.depth = arguments[2];
            if (arguments.length >= 4) ctx.colors = arguments[3];
            if (isBoolean(opts)) {
              // legacy...
              ctx.showHidden = opts;
            } else if (opts) {
              // got an "options" object
              exports._extend(ctx, opts);
            }
            // set default options
            if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
            if (isUndefined(ctx.depth)) ctx.depth = 2;
            if (isUndefined(ctx.colors)) ctx.colors = false;
            if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
            if (ctx.colors) ctx.stylize = stylizeWithColor;
            return formatValue(ctx, obj, ctx.depth);
          }
          exports.inspect = inspect;

          // http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
          inspect.colors = {
            'bold': [1, 22],
            'italic': [3, 23],
            'underline': [4, 24],
            'inverse': [7, 27],
            'white': [37, 39],
            'grey': [90, 39],
            'black': [30, 39],
            'blue': [34, 39],
            'cyan': [36, 39],
            'green': [32, 39],
            'magenta': [35, 39],
            'red': [31, 39],
            'yellow': [33, 39]
          };

          // Don't use 'blue' not visible on cmd.exe
          inspect.styles = {
            'special': 'cyan',
            'number': 'yellow',
            'boolean': 'yellow',
            'undefined': 'grey',
            'null': 'bold',
            'string': 'green',
            'date': 'magenta',
            // "name": intentionally not styling
            'regexp': 'red'
          };

          function stylizeWithColor(str, styleType) {
            var style = inspect.styles[styleType];

            if (style) {
              return "\x1B[" + inspect.colors[style][0] + 'm' + str + "\x1B[" + inspect.colors[style][1] + 'm';
            } else {
              return str;
            }
          }

          function stylizeNoColor(str, styleType) {
            return str;
          }

          function arrayToHash(array) {
            var hash = {};

            array.forEach(function (val, idx) {
              hash[val] = true;
            });

            return hash;
          }

          function formatValue(ctx, value, recurseTimes) {
            // Provide a hook for user-specified inspect functions.
            // Check that value is an object with an inspect function on it
            if (ctx.customInspect && value && isFunction(value.inspect) &&
            // Filter out the util module, it's inspect function is special
            value.inspect !== exports.inspect &&
            // Also filter out any prototype objects using the circular check.
            !(value.constructor && value.constructor.prototype === value)) {
              var ret = value.inspect(recurseTimes, ctx);
              if (!isString(ret)) {
                ret = formatValue(ctx, ret, recurseTimes);
              }
              return ret;
            }

            // Primitive types cannot have properties
            var primitive = formatPrimitive(ctx, value);
            if (primitive) {
              return primitive;
            }

            // Look up the keys of the object.
            var keys = Object.keys(value);
            var visibleKeys = arrayToHash(keys);

            if (ctx.showHidden) {
              keys = Object.getOwnPropertyNames(value);
            }

            // IE doesn't make error fields non-enumerable
            // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
            if (isError(value) && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
              return formatError(value);
            }

            // Some type of object without properties can be shortcutted.
            if (keys.length === 0) {
              if (isFunction(value)) {
                var name = value.name ? ': ' + value.name : '';
                return ctx.stylize('[Function' + name + ']', 'special');
              }
              if (isRegExp(value)) {
                return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
              }
              if (isDate(value)) {
                return ctx.stylize(Date.prototype.toString.call(value), 'date');
              }
              if (isError(value)) {
                return formatError(value);
              }
            }

            var base = '',
                array = false,
                braces = ['{', '}'];

            // Make Array say that they are Array
            if (isArray(value)) {
              array = true;
              braces = ['[', ']'];
            }

            // Make functions say that they are functions
            if (isFunction(value)) {
              var n = value.name ? ': ' + value.name : '';
              base = ' [Function' + n + ']';
            }

            // Make RegExps say that they are RegExps
            if (isRegExp(value)) {
              base = ' ' + RegExp.prototype.toString.call(value);
            }

            // Make dates with properties first say the date
            if (isDate(value)) {
              base = ' ' + Date.prototype.toUTCString.call(value);
            }

            // Make error with message first say the error
            if (isError(value)) {
              base = ' ' + formatError(value);
            }

            if (keys.length === 0 && (!array || value.length == 0)) {
              return braces[0] + base + braces[1];
            }

            if (recurseTimes < 0) {
              if (isRegExp(value)) {
                return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
              } else {
                return ctx.stylize('[Object]', 'special');
              }
            }

            ctx.seen.push(value);

            var output;
            if (array) {
              output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
            } else {
              output = keys.map(function (key) {
                return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
              });
            }

            ctx.seen.pop();

            return reduceToSingleString(output, base, braces);
          }

          function formatPrimitive(ctx, value) {
            if (isUndefined(value)) return ctx.stylize('undefined', 'undefined');
            if (isString(value)) {
              var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '').replace(/'/g, "\\'").replace(/\\"/g, '"') + '\'';
              return ctx.stylize(simple, 'string');
            }
            if (isNumber(value)) return ctx.stylize('' + value, 'number');
            if (isBoolean(value)) return ctx.stylize('' + value, 'boolean');
            // For some reason typeof null is "object", so special case here.
            if (isNull(value)) return ctx.stylize('null', 'null');
          }

          function formatError(value) {
            return '[' + Error.prototype.toString.call(value) + ']';
          }

          function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
            var output = [];
            for (var i = 0, l = value.length; i < l; ++i) {
              if (hasOwnProperty(value, String(i))) {
                output.push(formatProperty(ctx, value, recurseTimes, visibleKeys, String(i), true));
              } else {
                output.push('');
              }
            }
            keys.forEach(function (key) {
              if (!key.match(/^\d+$/)) {
                output.push(formatProperty(ctx, value, recurseTimes, visibleKeys, key, true));
              }
            });
            return output;
          }

          function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
            var name, str, desc;
            desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
            if (desc.get) {
              if (desc.set) {
                str = ctx.stylize('[Getter/Setter]', 'special');
              } else {
                str = ctx.stylize('[Getter]', 'special');
              }
            } else {
              if (desc.set) {
                str = ctx.stylize('[Setter]', 'special');
              }
            }
            if (!hasOwnProperty(visibleKeys, key)) {
              name = '[' + key + ']';
            }
            if (!str) {
              if (ctx.seen.indexOf(desc.value) < 0) {
                if (isNull(recurseTimes)) {
                  str = formatValue(ctx, desc.value, null);
                } else {
                  str = formatValue(ctx, desc.value, recurseTimes - 1);
                }
                if (str.indexOf('\n') > -1) {
                  if (array) {
                    str = str.split('\n').map(function (line) {
                      return '  ' + line;
                    }).join('\n').substr(2);
                  } else {
                    str = '\n' + str.split('\n').map(function (line) {
                      return '   ' + line;
                    }).join('\n');
                  }
                }
              } else {
                str = ctx.stylize('[Circular]', 'special');
              }
            }
            if (isUndefined(name)) {
              if (array && key.match(/^\d+$/)) {
                return str;
              }
              name = JSON.stringify('' + key);
              if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
                name = name.substr(1, name.length - 2);
                name = ctx.stylize(name, 'name');
              } else {
                name = name.replace(/'/g, "\\'").replace(/\\"/g, '"').replace(/(^"|"$)/g, "'");
                name = ctx.stylize(name, 'string');
              }
            }

            return name + ': ' + str;
          }

          function reduceToSingleString(output, base, braces) {
            var numLinesEst = 0;
            var length = output.reduce(function (prev, cur) {
              numLinesEst++;
              if (cur.indexOf('\n') >= 0) numLinesEst++;
              return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
            }, 0);

            if (length > 60) {
              return braces[0] + (base === '' ? '' : base + '\n ') + ' ' + output.join(',\n  ') + ' ' + braces[1];
            }

            return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
          }

          // NOTE: These type checking functions intentionally don't use `instanceof`
          // because it is fragile and can be easily faked with `Object.create()`.
          function isArray(ar) {
            return Array.isArray(ar);
          }
          exports.isArray = isArray;

          function isBoolean(arg) {
            return typeof arg === 'boolean';
          }
          exports.isBoolean = isBoolean;

          function isNull(arg) {
            return arg === null;
          }
          exports.isNull = isNull;

          function isNullOrUndefined(arg) {
            return arg == null;
          }
          exports.isNullOrUndefined = isNullOrUndefined;

          function isNumber(arg) {
            return typeof arg === 'number';
          }
          exports.isNumber = isNumber;

          function isString(arg) {
            return typeof arg === 'string';
          }
          exports.isString = isString;

          function isSymbol(arg) {
            return (typeof arg === "undefined" ? "undefined" : _typeof2(arg)) === 'symbol';
          }
          exports.isSymbol = isSymbol;

          function isUndefined(arg) {
            return arg === void 0;
          }
          exports.isUndefined = isUndefined;

          function isRegExp(re) {
            return isObject(re) && objectToString(re) === '[object RegExp]';
          }
          exports.isRegExp = isRegExp;

          function isObject(arg) {
            return (typeof arg === "undefined" ? "undefined" : _typeof2(arg)) === 'object' && arg !== null;
          }
          exports.isObject = isObject;

          function isDate(d) {
            return isObject(d) && objectToString(d) === '[object Date]';
          }
          exports.isDate = isDate;

          function isError(e) {
            return isObject(e) && (objectToString(e) === '[object Error]' || e instanceof Error);
          }
          exports.isError = isError;

          function isFunction(arg) {
            return typeof arg === 'function';
          }
          exports.isFunction = isFunction;

          function isPrimitive(arg) {
            return arg === null || typeof arg === 'boolean' || typeof arg === 'number' || typeof arg === 'string' || (typeof arg === "undefined" ? "undefined" : _typeof2(arg)) === 'symbol' || // ES6 symbol
            typeof arg === 'undefined';
          }
          exports.isPrimitive = isPrimitive;

          exports.isBuffer = require('./support/isBuffer');

          function objectToString(o) {
            return Object.prototype.toString.call(o);
          }

          function pad(n) {
            return n < 10 ? '0' + n.toString(10) : n.toString(10);
          }

          var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

          // 26 Feb 16:19:34
          function timestamp() {
            var d = new Date();
            var time = [pad(d.getHours()), pad(d.getMinutes()), pad(d.getSeconds())].join(':');
            return [d.getDate(), months[d.getMonth()], time].join(' ');
          }

          // log is just a thin wrapper to console.log that prepends a timestamp
          exports.log = function () {
            console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
          };

          /**
           * Inherit the prototype methods from one constructor into another.
           *
           * The Function.prototype.inherits from lang.js rewritten as a standalone
           * function (not on Function.prototype). NOTE: If this file is to be loaded
           * during bootstrapping this function needs to be rewritten using some native
           * functions as prototype setup using normal JavaScript does not work as
           * expected during bootstrapping (see mirror.js in r114903).
           *
           * @param {function} ctor Constructor function which needs to inherit the
           *     prototype.
           * @param {function} superCtor Constructor function to inherit prototype from.
           */
          exports.inherits = require('inherits');

          exports._extend = function (origin, add) {
            // Don't do anything if add isn't an object
            if (!add || !isObject(add)) return origin;

            var keys = Object.keys(add);
            var i = keys.length;
            while (i--) {
              origin[keys[i]] = add[keys[i]];
            }
            return origin;
          };

          function hasOwnProperty(obj, prop) {
            return Object.prototype.hasOwnProperty.call(obj, prop);
          }
        }).call(this, require('_process'), typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
      }, { "./support/isBuffer": 11, "_process": 9, "inherits": 8 }] }, {}, [7])(7);
  });
});
//# sourceMappingURL=core.js.map
