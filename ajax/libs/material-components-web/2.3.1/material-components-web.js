/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/material-components/material-components-web/blob/master/LICENSE
 */
(function webpackUniversalModuleDefinition(root, factory) {
    if (typeof exports === "object" && typeof module === "object") module.exports = factory(); else if (typeof define === "function" && define.amd) define([], factory); else if (typeof exports === "object") exports["mdc"] = factory(); else root["mdc"] = factory();
})(this, function() {
    return function(modules) {
        var installedModules = {};
        function __webpack_require__(moduleId) {
            if (installedModules[moduleId]) {
                return installedModules[moduleId].exports;
            }
            var module = installedModules[moduleId] = {
                i: moduleId,
                l: false,
                exports: {}
            };
            modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
            module.l = true;
            return module.exports;
        }
        __webpack_require__.m = modules;
        __webpack_require__.c = installedModules;
        __webpack_require__.d = function(exports, name, getter) {
            if (!__webpack_require__.o(exports, name)) {
                Object.defineProperty(exports, name, {
                    configurable: false,
                    enumerable: true,
                    get: getter
                });
            }
        };
        __webpack_require__.n = function(module) {
            var getter = module && module.__esModule ? function getDefault() {
                return module["default"];
            } : function getModuleExports() {
                return module;
            };
            __webpack_require__.d(getter, "a", getter);
            return getter;
        };
        __webpack_require__.o = function(object, property) {
            return Object.prototype.hasOwnProperty.call(object, property);
        };
        __webpack_require__.p = "";
        return __webpack_require__(__webpack_require__.s = 100);
    }([ function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var MDCFoundation = function() {
            function MDCFoundation(adapter) {
                if (adapter === void 0) {
                    adapter = {};
                }
                this.adapter_ = adapter;
            }
            Object.defineProperty(MDCFoundation, "cssClasses", {
                get: function get() {
                    return {};
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MDCFoundation, "strings", {
                get: function get() {
                    return {};
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MDCFoundation, "numbers", {
                get: function get() {
                    return {};
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MDCFoundation, "defaultAdapter", {
                get: function get() {
                    return {};
                },
                enumerable: true,
                configurable: true
            });
            MDCFoundation.prototype.init = function() {};
            MDCFoundation.prototype.destroy = function() {};
            return MDCFoundation;
        }();
        exports.MDCFoundation = MDCFoundation;
        exports.default = MDCFoundation;
    }, function(module, exports, __webpack_require__) {
        "use strict";
        var __read = this && this.__read || function(o, n) {
            var m = typeof Symbol === "function" && o[Symbol.iterator];
            if (!m) return o;
            var i = m.call(o), r, ar = [], e;
            try {
                while ((n === void 0 || n-- > 0) && !(r = i.next()).done) {
                    ar.push(r.value);
                }
            } catch (error) {
                e = {
                    error: error
                };
            } finally {
                try {
                    if (r && !r.done && (m = i["return"])) m.call(i);
                } finally {
                    if (e) throw e.error;
                }
            }
            return ar;
        };
        var __spread = this && this.__spread || function() {
            for (var ar = [], i = 0; i < arguments.length; i++) {
                ar = ar.concat(__read(arguments[i]));
            }
            return ar;
        };
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var foundation_1 = __webpack_require__(0);
        var MDCComponent = function() {
            function MDCComponent(root, foundation) {
                var args = [];
                for (var _i = 2; _i < arguments.length; _i++) {
                    args[_i - 2] = arguments[_i];
                }
                this.root_ = root;
                this.initialize.apply(this, __spread(args));
                this.foundation_ = foundation === undefined ? this.getDefaultFoundation() : foundation;
                this.foundation_.init();
                this.initialSyncWithDOM();
            }
            MDCComponent.attachTo = function(root) {
                return new MDCComponent(root, new foundation_1.MDCFoundation({}));
            };
            MDCComponent.prototype.initialize = function() {
                var _args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    _args[_i] = arguments[_i];
                }
            };
            MDCComponent.prototype.getDefaultFoundation = function() {
                throw new Error("Subclasses must override getDefaultFoundation to return a properly configured " + "foundation class");
            };
            MDCComponent.prototype.initialSyncWithDOM = function() {};
            MDCComponent.prototype.destroy = function() {
                this.foundation_.destroy();
            };
            MDCComponent.prototype.listen = function(evtType, handler) {
                this.root_.addEventListener(evtType, handler);
            };
            MDCComponent.prototype.unlisten = function(evtType, handler) {
                this.root_.removeEventListener(evtType, handler);
            };
            MDCComponent.prototype.emit = function(evtType, evtData, shouldBubble) {
                if (shouldBubble === void 0) {
                    shouldBubble = false;
                }
                var evt;
                if (typeof CustomEvent === "function") {
                    evt = new CustomEvent(evtType, {
                        bubbles: shouldBubble,
                        detail: evtData
                    });
                } else {
                    evt = document.createEvent("CustomEvent");
                    evt.initCustomEvent(evtType, shouldBubble, false, evtData);
                }
                this.root_.dispatchEvent(evt);
            };
            return MDCComponent;
        }();
        exports.MDCComponent = MDCComponent;
        exports.default = MDCComponent;
    }, function(module, exports, __webpack_require__) {
        "use strict";
        var __extends = this && this.__extends || function() {
            var _extendStatics = function extendStatics(d, b) {
                _extendStatics = Object.setPrototypeOf || {
                    __proto__: []
                } instanceof Array && function(d, b) {
                    d.__proto__ = b;
                } || function(d, b) {
                    for (var p in b) {
                        if (b.hasOwnProperty(p)) d[p] = b[p];
                    }
                };
                return _extendStatics(d, b);
            };
            return function(d, b) {
                _extendStatics(d, b);
                function __() {
                    this.constructor = d;
                }
                d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
            };
        }();
        var __importStar = this && this.__importStar || function(mod) {
            if (mod && mod.__esModule) return mod;
            var result = {};
            if (mod != null) for (var k in mod) {
                if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
            }
            result["default"] = mod;
            return result;
        };
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var component_1 = __webpack_require__(1);
        var ponyfill_1 = __webpack_require__(3);
        var foundation_1 = __webpack_require__(4);
        var util = __importStar(__webpack_require__(13));
        var MDCRipple = function(_super) {
            __extends(MDCRipple, _super);
            function MDCRipple() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.disabled = false;
                return _this;
            }
            MDCRipple.attachTo = function(root, opts) {
                if (opts === void 0) {
                    opts = {
                        isUnbounded: undefined
                    };
                }
                var ripple = new MDCRipple(root);
                if (opts.isUnbounded !== undefined) {
                    ripple.unbounded = opts.isUnbounded;
                }
                return ripple;
            };
            MDCRipple.createAdapter = function(instance) {
                return {
                    addClass: function addClass(className) {
                        return instance.root_.classList.add(className);
                    },
                    browserSupportsCssVars: function browserSupportsCssVars() {
                        return util.supportsCssVariables(window);
                    },
                    computeBoundingRect: function computeBoundingRect() {
                        return instance.root_.getBoundingClientRect();
                    },
                    containsEventTarget: function containsEventTarget(target) {
                        return instance.root_.contains(target);
                    },
                    deregisterDocumentInteractionHandler: function deregisterDocumentInteractionHandler(evtType, handler) {
                        return document.documentElement.removeEventListener(evtType, handler, util.applyPassive());
                    },
                    deregisterInteractionHandler: function deregisterInteractionHandler(evtType, handler) {
                        return instance.root_.removeEventListener(evtType, handler, util.applyPassive());
                    },
                    deregisterResizeHandler: function deregisterResizeHandler(handler) {
                        return window.removeEventListener("resize", handler);
                    },
                    getWindowPageOffset: function getWindowPageOffset() {
                        return {
                            x: window.pageXOffset,
                            y: window.pageYOffset
                        };
                    },
                    isSurfaceActive: function isSurfaceActive() {
                        return ponyfill_1.matches(instance.root_, ":active");
                    },
                    isSurfaceDisabled: function isSurfaceDisabled() {
                        return Boolean(instance.disabled);
                    },
                    isUnbounded: function isUnbounded() {
                        return Boolean(instance.unbounded);
                    },
                    registerDocumentInteractionHandler: function registerDocumentInteractionHandler(evtType, handler) {
                        return document.documentElement.addEventListener(evtType, handler, util.applyPassive());
                    },
                    registerInteractionHandler: function registerInteractionHandler(evtType, handler) {
                        return instance.root_.addEventListener(evtType, handler, util.applyPassive());
                    },
                    registerResizeHandler: function registerResizeHandler(handler) {
                        return window.addEventListener("resize", handler);
                    },
                    removeClass: function removeClass(className) {
                        return instance.root_.classList.remove(className);
                    },
                    updateCssVariable: function updateCssVariable(varName, value) {
                        return instance.root_.style.setProperty(varName, value);
                    }
                };
            };
            Object.defineProperty(MDCRipple.prototype, "unbounded", {
                get: function get() {
                    return Boolean(this.unbounded_);
                },
                set: function set(unbounded) {
                    this.unbounded_ = Boolean(unbounded);
                    this.setUnbounded_();
                },
                enumerable: true,
                configurable: true
            });
            MDCRipple.prototype.activate = function() {
                this.foundation_.activate();
            };
            MDCRipple.prototype.deactivate = function() {
                this.foundation_.deactivate();
            };
            MDCRipple.prototype.layout = function() {
                this.foundation_.layout();
            };
            MDCRipple.prototype.getDefaultFoundation = function() {
                return new foundation_1.MDCRippleFoundation(MDCRipple.createAdapter(this));
            };
            MDCRipple.prototype.initialSyncWithDOM = function() {
                var root = this.root_;
                this.unbounded = "mdcRippleIsUnbounded" in root.dataset;
            };
            MDCRipple.prototype.setUnbounded_ = function() {
                this.foundation_.setUnbounded(Boolean(this.unbounded_));
            };
            return MDCRipple;
        }(component_1.MDCComponent);
        exports.MDCRipple = MDCRipple;
    }, function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        function closest(element, selector) {
            if (element.closest) {
                return element.closest(selector);
            }
            var el = element;
            while (el) {
                if (matches(el, selector)) {
                    return el;
                }
                el = el.parentElement;
            }
            return null;
        }
        exports.closest = closest;
        function matches(element, selector) {
            var nativeMatches = element.matches || element.webkitMatchesSelector || element.msMatchesSelector;
            return nativeMatches.call(element, selector);
        }
        exports.matches = matches;
    }, function(module, exports, __webpack_require__) {
        "use strict";
        var __extends = this && this.__extends || function() {
            var _extendStatics = function extendStatics(d, b) {
                _extendStatics = Object.setPrototypeOf || {
                    __proto__: []
                } instanceof Array && function(d, b) {
                    d.__proto__ = b;
                } || function(d, b) {
                    for (var p in b) {
                        if (b.hasOwnProperty(p)) d[p] = b[p];
                    }
                };
                return _extendStatics(d, b);
            };
            return function(d, b) {
                _extendStatics(d, b);
                function __() {
                    this.constructor = d;
                }
                d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
            };
        }();
        var __assign = this && this.__assign || function() {
            __assign = Object.assign || function(t) {
                for (var s, i = 1, n = arguments.length; i < n; i++) {
                    s = arguments[i];
                    for (var p in s) {
                        if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
                    }
                }
                return t;
            };
            return __assign.apply(this, arguments);
        };
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var foundation_1 = __webpack_require__(0);
        var constants_1 = __webpack_require__(34);
        var util_1 = __webpack_require__(13);
        var ACTIVATION_EVENT_TYPES = [ "touchstart", "pointerdown", "mousedown", "keydown" ];
        var POINTER_DEACTIVATION_EVENT_TYPES = [ "touchend", "pointerup", "mouseup", "contextmenu" ];
        var activatedTargets = [];
        var MDCRippleFoundation = function(_super) {
            __extends(MDCRippleFoundation, _super);
            function MDCRippleFoundation(adapter) {
                var _this = _super.call(this, __assign({}, MDCRippleFoundation.defaultAdapter, adapter)) || this;
                _this.activationAnimationHasEnded_ = false;
                _this.activationTimer_ = 0;
                _this.fgDeactivationRemovalTimer_ = 0;
                _this.fgScale_ = "0";
                _this.frame_ = {
                    width: 0,
                    height: 0
                };
                _this.initialSize_ = 0;
                _this.layoutFrame_ = 0;
                _this.maxRadius_ = 0;
                _this.unboundedCoords_ = {
                    left: 0,
                    top: 0
                };
                _this.activationState_ = _this.defaultActivationState_();
                _this.activationTimerCallback_ = function() {
                    _this.activationAnimationHasEnded_ = true;
                    _this.runDeactivationUXLogicIfReady_();
                };
                _this.activateHandler_ = function(e) {
                    return _this.activate_(e);
                };
                _this.deactivateHandler_ = function() {
                    return _this.deactivate_();
                };
                _this.focusHandler_ = function() {
                    return _this.handleFocus();
                };
                _this.blurHandler_ = function() {
                    return _this.handleBlur();
                };
                _this.resizeHandler_ = function() {
                    return _this.layout();
                };
                return _this;
            }
            Object.defineProperty(MDCRippleFoundation, "cssClasses", {
                get: function get() {
                    return constants_1.cssClasses;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MDCRippleFoundation, "strings", {
                get: function get() {
                    return constants_1.strings;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MDCRippleFoundation, "numbers", {
                get: function get() {
                    return constants_1.numbers;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MDCRippleFoundation, "defaultAdapter", {
                get: function get() {
                    return {
                        addClass: function addClass() {
                            return undefined;
                        },
                        browserSupportsCssVars: function browserSupportsCssVars() {
                            return true;
                        },
                        computeBoundingRect: function computeBoundingRect() {
                            return {
                                top: 0,
                                right: 0,
                                bottom: 0,
                                left: 0,
                                width: 0,
                                height: 0
                            };
                        },
                        containsEventTarget: function containsEventTarget() {
                            return true;
                        },
                        deregisterDocumentInteractionHandler: function deregisterDocumentInteractionHandler() {
                            return undefined;
                        },
                        deregisterInteractionHandler: function deregisterInteractionHandler() {
                            return undefined;
                        },
                        deregisterResizeHandler: function deregisterResizeHandler() {
                            return undefined;
                        },
                        getWindowPageOffset: function getWindowPageOffset() {
                            return {
                                x: 0,
                                y: 0
                            };
                        },
                        isSurfaceActive: function isSurfaceActive() {
                            return true;
                        },
                        isSurfaceDisabled: function isSurfaceDisabled() {
                            return true;
                        },
                        isUnbounded: function isUnbounded() {
                            return true;
                        },
                        registerDocumentInteractionHandler: function registerDocumentInteractionHandler() {
                            return undefined;
                        },
                        registerInteractionHandler: function registerInteractionHandler() {
                            return undefined;
                        },
                        registerResizeHandler: function registerResizeHandler() {
                            return undefined;
                        },
                        removeClass: function removeClass() {
                            return undefined;
                        },
                        updateCssVariable: function updateCssVariable() {
                            return undefined;
                        }
                    };
                },
                enumerable: true,
                configurable: true
            });
            MDCRippleFoundation.prototype.init = function() {
                var _this = this;
                var supportsPressRipple = this.supportsPressRipple_();
                this.registerRootHandlers_(supportsPressRipple);
                if (supportsPressRipple) {
                    var _a = MDCRippleFoundation.cssClasses, ROOT_1 = _a.ROOT, UNBOUNDED_1 = _a.UNBOUNDED;
                    requestAnimationFrame(function() {
                        _this.adapter_.addClass(ROOT_1);
                        if (_this.adapter_.isUnbounded()) {
                            _this.adapter_.addClass(UNBOUNDED_1);
                            _this.layoutInternal_();
                        }
                    });
                }
            };
            MDCRippleFoundation.prototype.destroy = function() {
                var _this = this;
                if (this.supportsPressRipple_()) {
                    if (this.activationTimer_) {
                        clearTimeout(this.activationTimer_);
                        this.activationTimer_ = 0;
                        this.adapter_.removeClass(MDCRippleFoundation.cssClasses.FG_ACTIVATION);
                    }
                    if (this.fgDeactivationRemovalTimer_) {
                        clearTimeout(this.fgDeactivationRemovalTimer_);
                        this.fgDeactivationRemovalTimer_ = 0;
                        this.adapter_.removeClass(MDCRippleFoundation.cssClasses.FG_DEACTIVATION);
                    }
                    var _a = MDCRippleFoundation.cssClasses, ROOT_2 = _a.ROOT, UNBOUNDED_2 = _a.UNBOUNDED;
                    requestAnimationFrame(function() {
                        _this.adapter_.removeClass(ROOT_2);
                        _this.adapter_.removeClass(UNBOUNDED_2);
                        _this.removeCssVars_();
                    });
                }
                this.deregisterRootHandlers_();
                this.deregisterDeactivationHandlers_();
            };
            MDCRippleFoundation.prototype.activate = function(evt) {
                this.activate_(evt);
            };
            MDCRippleFoundation.prototype.deactivate = function() {
                this.deactivate_();
            };
            MDCRippleFoundation.prototype.layout = function() {
                var _this = this;
                if (this.layoutFrame_) {
                    cancelAnimationFrame(this.layoutFrame_);
                }
                this.layoutFrame_ = requestAnimationFrame(function() {
                    _this.layoutInternal_();
                    _this.layoutFrame_ = 0;
                });
            };
            MDCRippleFoundation.prototype.setUnbounded = function(unbounded) {
                var UNBOUNDED = MDCRippleFoundation.cssClasses.UNBOUNDED;
                if (unbounded) {
                    this.adapter_.addClass(UNBOUNDED);
                } else {
                    this.adapter_.removeClass(UNBOUNDED);
                }
            };
            MDCRippleFoundation.prototype.handleFocus = function() {
                var _this = this;
                requestAnimationFrame(function() {
                    return _this.adapter_.addClass(MDCRippleFoundation.cssClasses.BG_FOCUSED);
                });
            };
            MDCRippleFoundation.prototype.handleBlur = function() {
                var _this = this;
                requestAnimationFrame(function() {
                    return _this.adapter_.removeClass(MDCRippleFoundation.cssClasses.BG_FOCUSED);
                });
            };
            MDCRippleFoundation.prototype.supportsPressRipple_ = function() {
                return this.adapter_.browserSupportsCssVars();
            };
            MDCRippleFoundation.prototype.defaultActivationState_ = function() {
                return {
                    activationEvent: undefined,
                    hasDeactivationUXRun: false,
                    isActivated: false,
                    isProgrammatic: false,
                    wasActivatedByPointer: false,
                    wasElementMadeActive: false
                };
            };
            MDCRippleFoundation.prototype.registerRootHandlers_ = function(supportsPressRipple) {
                var _this = this;
                if (supportsPressRipple) {
                    ACTIVATION_EVENT_TYPES.forEach(function(evtType) {
                        _this.adapter_.registerInteractionHandler(evtType, _this.activateHandler_);
                    });
                    if (this.adapter_.isUnbounded()) {
                        this.adapter_.registerResizeHandler(this.resizeHandler_);
                    }
                }
                this.adapter_.registerInteractionHandler("focus", this.focusHandler_);
                this.adapter_.registerInteractionHandler("blur", this.blurHandler_);
            };
            MDCRippleFoundation.prototype.registerDeactivationHandlers_ = function(evt) {
                var _this = this;
                if (evt.type === "keydown") {
                    this.adapter_.registerInteractionHandler("keyup", this.deactivateHandler_);
                } else {
                    POINTER_DEACTIVATION_EVENT_TYPES.forEach(function(evtType) {
                        _this.adapter_.registerDocumentInteractionHandler(evtType, _this.deactivateHandler_);
                    });
                }
            };
            MDCRippleFoundation.prototype.deregisterRootHandlers_ = function() {
                var _this = this;
                ACTIVATION_EVENT_TYPES.forEach(function(evtType) {
                    _this.adapter_.deregisterInteractionHandler(evtType, _this.activateHandler_);
                });
                this.adapter_.deregisterInteractionHandler("focus", this.focusHandler_);
                this.adapter_.deregisterInteractionHandler("blur", this.blurHandler_);
                if (this.adapter_.isUnbounded()) {
                    this.adapter_.deregisterResizeHandler(this.resizeHandler_);
                }
            };
            MDCRippleFoundation.prototype.deregisterDeactivationHandlers_ = function() {
                var _this = this;
                this.adapter_.deregisterInteractionHandler("keyup", this.deactivateHandler_);
                POINTER_DEACTIVATION_EVENT_TYPES.forEach(function(evtType) {
                    _this.adapter_.deregisterDocumentInteractionHandler(evtType, _this.deactivateHandler_);
                });
            };
            MDCRippleFoundation.prototype.removeCssVars_ = function() {
                var _this = this;
                var rippleStrings = MDCRippleFoundation.strings;
                var keys = Object.keys(rippleStrings);
                keys.forEach(function(key) {
                    if (key.indexOf("VAR_") === 0) {
                        _this.adapter_.updateCssVariable(rippleStrings[key], null);
                    }
                });
            };
            MDCRippleFoundation.prototype.activate_ = function(evt) {
                var _this = this;
                if (this.adapter_.isSurfaceDisabled()) {
                    return;
                }
                var activationState = this.activationState_;
                if (activationState.isActivated) {
                    return;
                }
                var previousActivationEvent = this.previousActivationEvent_;
                var isSameInteraction = previousActivationEvent && evt !== undefined && previousActivationEvent.type !== evt.type;
                if (isSameInteraction) {
                    return;
                }
                activationState.isActivated = true;
                activationState.isProgrammatic = evt === undefined;
                activationState.activationEvent = evt;
                activationState.wasActivatedByPointer = activationState.isProgrammatic ? false : evt !== undefined && (evt.type === "mousedown" || evt.type === "touchstart" || evt.type === "pointerdown");
                var hasActivatedChild = evt !== undefined && activatedTargets.length > 0 && activatedTargets.some(function(target) {
                    return _this.adapter_.containsEventTarget(target);
                });
                if (hasActivatedChild) {
                    this.resetActivationState_();
                    return;
                }
                if (evt !== undefined) {
                    activatedTargets.push(evt.target);
                    this.registerDeactivationHandlers_(evt);
                }
                activationState.wasElementMadeActive = this.checkElementMadeActive_(evt);
                if (activationState.wasElementMadeActive) {
                    this.animateActivation_();
                }
                requestAnimationFrame(function() {
                    activatedTargets = [];
                    if (!activationState.wasElementMadeActive && evt !== undefined && (evt.key === " " || evt.keyCode === 32)) {
                        activationState.wasElementMadeActive = _this.checkElementMadeActive_(evt);
                        if (activationState.wasElementMadeActive) {
                            _this.animateActivation_();
                        }
                    }
                    if (!activationState.wasElementMadeActive) {
                        _this.activationState_ = _this.defaultActivationState_();
                    }
                });
            };
            MDCRippleFoundation.prototype.checkElementMadeActive_ = function(evt) {
                return evt !== undefined && evt.type === "keydown" ? this.adapter_.isSurfaceActive() : true;
            };
            MDCRippleFoundation.prototype.animateActivation_ = function() {
                var _this = this;
                var _a = MDCRippleFoundation.strings, VAR_FG_TRANSLATE_START = _a.VAR_FG_TRANSLATE_START, VAR_FG_TRANSLATE_END = _a.VAR_FG_TRANSLATE_END;
                var _b = MDCRippleFoundation.cssClasses, FG_DEACTIVATION = _b.FG_DEACTIVATION, FG_ACTIVATION = _b.FG_ACTIVATION;
                var DEACTIVATION_TIMEOUT_MS = MDCRippleFoundation.numbers.DEACTIVATION_TIMEOUT_MS;
                this.layoutInternal_();
                var translateStart = "";
                var translateEnd = "";
                if (!this.adapter_.isUnbounded()) {
                    var _c = this.getFgTranslationCoordinates_(), startPoint = _c.startPoint, endPoint = _c.endPoint;
                    translateStart = startPoint.x + "px, " + startPoint.y + "px";
                    translateEnd = endPoint.x + "px, " + endPoint.y + "px";
                }
                this.adapter_.updateCssVariable(VAR_FG_TRANSLATE_START, translateStart);
                this.adapter_.updateCssVariable(VAR_FG_TRANSLATE_END, translateEnd);
                clearTimeout(this.activationTimer_);
                clearTimeout(this.fgDeactivationRemovalTimer_);
                this.rmBoundedActivationClasses_();
                this.adapter_.removeClass(FG_DEACTIVATION);
                this.adapter_.computeBoundingRect();
                this.adapter_.addClass(FG_ACTIVATION);
                this.activationTimer_ = setTimeout(function() {
                    return _this.activationTimerCallback_();
                }, DEACTIVATION_TIMEOUT_MS);
            };
            MDCRippleFoundation.prototype.getFgTranslationCoordinates_ = function() {
                var _a = this.activationState_, activationEvent = _a.activationEvent, wasActivatedByPointer = _a.wasActivatedByPointer;
                var startPoint;
                if (wasActivatedByPointer) {
                    startPoint = util_1.getNormalizedEventCoords(activationEvent, this.adapter_.getWindowPageOffset(), this.adapter_.computeBoundingRect());
                } else {
                    startPoint = {
                        x: this.frame_.width / 2,
                        y: this.frame_.height / 2
                    };
                }
                startPoint = {
                    x: startPoint.x - this.initialSize_ / 2,
                    y: startPoint.y - this.initialSize_ / 2
                };
                var endPoint = {
                    x: this.frame_.width / 2 - this.initialSize_ / 2,
                    y: this.frame_.height / 2 - this.initialSize_ / 2
                };
                return {
                    startPoint: startPoint,
                    endPoint: endPoint
                };
            };
            MDCRippleFoundation.prototype.runDeactivationUXLogicIfReady_ = function() {
                var _this = this;
                var FG_DEACTIVATION = MDCRippleFoundation.cssClasses.FG_DEACTIVATION;
                var _a = this.activationState_, hasDeactivationUXRun = _a.hasDeactivationUXRun, isActivated = _a.isActivated;
                var activationHasEnded = hasDeactivationUXRun || !isActivated;
                if (activationHasEnded && this.activationAnimationHasEnded_) {
                    this.rmBoundedActivationClasses_();
                    this.adapter_.addClass(FG_DEACTIVATION);
                    this.fgDeactivationRemovalTimer_ = setTimeout(function() {
                        _this.adapter_.removeClass(FG_DEACTIVATION);
                    }, constants_1.numbers.FG_DEACTIVATION_MS);
                }
            };
            MDCRippleFoundation.prototype.rmBoundedActivationClasses_ = function() {
                var FG_ACTIVATION = MDCRippleFoundation.cssClasses.FG_ACTIVATION;
                this.adapter_.removeClass(FG_ACTIVATION);
                this.activationAnimationHasEnded_ = false;
                this.adapter_.computeBoundingRect();
            };
            MDCRippleFoundation.prototype.resetActivationState_ = function() {
                var _this = this;
                this.previousActivationEvent_ = this.activationState_.activationEvent;
                this.activationState_ = this.defaultActivationState_();
                setTimeout(function() {
                    return _this.previousActivationEvent_ = undefined;
                }, MDCRippleFoundation.numbers.TAP_DELAY_MS);
            };
            MDCRippleFoundation.prototype.deactivate_ = function() {
                var _this = this;
                var activationState = this.activationState_;
                if (!activationState.isActivated) {
                    return;
                }
                var state = __assign({}, activationState);
                if (activationState.isProgrammatic) {
                    requestAnimationFrame(function() {
                        return _this.animateDeactivation_(state);
                    });
                    this.resetActivationState_();
                } else {
                    this.deregisterDeactivationHandlers_();
                    requestAnimationFrame(function() {
                        _this.activationState_.hasDeactivationUXRun = true;
                        _this.animateDeactivation_(state);
                        _this.resetActivationState_();
                    });
                }
            };
            MDCRippleFoundation.prototype.animateDeactivation_ = function(_a) {
                var wasActivatedByPointer = _a.wasActivatedByPointer, wasElementMadeActive = _a.wasElementMadeActive;
                if (wasActivatedByPointer || wasElementMadeActive) {
                    this.runDeactivationUXLogicIfReady_();
                }
            };
            MDCRippleFoundation.prototype.layoutInternal_ = function() {
                var _this = this;
                this.frame_ = this.adapter_.computeBoundingRect();
                var maxDim = Math.max(this.frame_.height, this.frame_.width);
                var getBoundedRadius = function getBoundedRadius() {
                    var hypotenuse = Math.sqrt(Math.pow(_this.frame_.width, 2) + Math.pow(_this.frame_.height, 2));
                    return hypotenuse + MDCRippleFoundation.numbers.PADDING;
                };
                this.maxRadius_ = this.adapter_.isUnbounded() ? maxDim : getBoundedRadius();
                this.initialSize_ = Math.floor(maxDim * MDCRippleFoundation.numbers.INITIAL_ORIGIN_SCALE);
                this.fgScale_ = "" + this.maxRadius_ / this.initialSize_;
                this.updateLayoutCssVars_();
            };
            MDCRippleFoundation.prototype.updateLayoutCssVars_ = function() {
                var _a = MDCRippleFoundation.strings, VAR_FG_SIZE = _a.VAR_FG_SIZE, VAR_LEFT = _a.VAR_LEFT, VAR_TOP = _a.VAR_TOP, VAR_FG_SCALE = _a.VAR_FG_SCALE;
                this.adapter_.updateCssVariable(VAR_FG_SIZE, this.initialSize_ + "px");
                this.adapter_.updateCssVariable(VAR_FG_SCALE, this.fgScale_);
                if (this.adapter_.isUnbounded()) {
                    this.unboundedCoords_ = {
                        left: Math.round(this.frame_.width / 2 - this.initialSize_ / 2),
                        top: Math.round(this.frame_.height / 2 - this.initialSize_ / 2)
                    };
                    this.adapter_.updateCssVariable(VAR_LEFT, this.unboundedCoords_.left + "px");
                    this.adapter_.updateCssVariable(VAR_TOP, this.unboundedCoords_.top + "px");
                }
            };
            return MDCRippleFoundation;
        }(foundation_1.MDCFoundation);
        exports.MDCRippleFoundation = MDCRippleFoundation;
        exports.default = MDCRippleFoundation;
    }, function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var cssClasses = {
            ANCHOR: "mdc-menu-surface--anchor",
            ANIMATING_CLOSED: "mdc-menu-surface--animating-closed",
            ANIMATING_OPEN: "mdc-menu-surface--animating-open",
            FIXED: "mdc-menu-surface--fixed",
            OPEN: "mdc-menu-surface--open",
            ROOT: "mdc-menu-surface"
        };
        exports.cssClasses = cssClasses;
        var strings = {
            CLOSED_EVENT: "MDCMenuSurface:closed",
            OPENED_EVENT: "MDCMenuSurface:opened",
            FOCUSABLE_ELEMENTS: [ "button:not(:disabled)", '[href]:not([aria-disabled="true"])', "input:not(:disabled)", "select:not(:disabled)", "textarea:not(:disabled)", '[tabindex]:not([tabindex="-1"]):not([aria-disabled="true"])' ].join(", ")
        };
        exports.strings = strings;
        var numbers = {
            TRANSITION_OPEN_DURATION: 120,
            TRANSITION_CLOSE_DURATION: 75,
            MARGIN_TO_EDGE: 32,
            ANCHOR_TO_MENU_SURFACE_WIDTH_RATIO: .67
        };
        exports.numbers = numbers;
        var CornerBit;
        (function(CornerBit) {
            CornerBit[CornerBit["BOTTOM"] = 1] = "BOTTOM";
            CornerBit[CornerBit["CENTER"] = 2] = "CENTER";
            CornerBit[CornerBit["RIGHT"] = 4] = "RIGHT";
            CornerBit[CornerBit["FLIP_RTL"] = 8] = "FLIP_RTL";
        })(CornerBit || (CornerBit = {}));
        exports.CornerBit = CornerBit;
        var Corner;
        (function(Corner) {
            Corner[Corner["TOP_LEFT"] = 0] = "TOP_LEFT";
            Corner[Corner["TOP_RIGHT"] = 4] = "TOP_RIGHT";
            Corner[Corner["BOTTOM_LEFT"] = 1] = "BOTTOM_LEFT";
            Corner[Corner["BOTTOM_RIGHT"] = 5] = "BOTTOM_RIGHT";
            Corner[Corner["TOP_START"] = 8] = "TOP_START";
            Corner[Corner["TOP_END"] = 12] = "TOP_END";
            Corner[Corner["BOTTOM_START"] = 9] = "BOTTOM_START";
            Corner[Corner["BOTTOM_END"] = 13] = "BOTTOM_END";
        })(Corner || (Corner = {}));
        exports.Corner = Corner;
    }, function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var cssClasses = {
            FIXED_CLASS: "mdc-top-app-bar--fixed",
            FIXED_SCROLLED_CLASS: "mdc-top-app-bar--fixed-scrolled",
            SHORT_CLASS: "mdc-top-app-bar--short",
            SHORT_COLLAPSED_CLASS: "mdc-top-app-bar--short-collapsed",
            SHORT_HAS_ACTION_ITEM_CLASS: "mdc-top-app-bar--short-has-action-item"
        };
        exports.cssClasses = cssClasses;
        var numbers = {
            DEBOUNCE_THROTTLE_RESIZE_TIME_MS: 100,
            MAX_TOP_APP_BAR_HEIGHT: 128
        };
        exports.numbers = numbers;
        var strings = {
            ACTION_ITEM_SELECTOR: ".mdc-top-app-bar__action-item",
            NAVIGATION_EVENT: "MDCTopAppBar:nav",
            NAVIGATION_ICON_SELECTOR: ".mdc-top-app-bar__navigation-icon",
            ROOT_SELECTOR: ".mdc-top-app-bar",
            TITLE_SELECTOR: ".mdc-top-app-bar__title"
        };
        exports.strings = strings;
    }, function(module, exports, __webpack_require__) {
        "use strict";
        var __extends = this && this.__extends || function() {
            var _extendStatics = function extendStatics(d, b) {
                _extendStatics = Object.setPrototypeOf || {
                    __proto__: []
                } instanceof Array && function(d, b) {
                    d.__proto__ = b;
                } || function(d, b) {
                    for (var p in b) {
                        if (b.hasOwnProperty(p)) d[p] = b[p];
                    }
                };
                return _extendStatics(d, b);
            };
            return function(d, b) {
                _extendStatics(d, b);
                function __() {
                    this.constructor = d;
                }
                d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
            };
        }();
        var __assign = this && this.__assign || function() {
            __assign = Object.assign || function(t) {
                for (var s, i = 1, n = arguments.length; i < n; i++) {
                    s = arguments[i];
                    for (var p in s) {
                        if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
                    }
                }
                return t;
            };
            return __assign.apply(this, arguments);
        };
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var foundation_1 = __webpack_require__(0);
        var constants_1 = __webpack_require__(17);
        var ELEMENTS_KEY_ALLOWED_IN = [ "input", "button", "textarea", "select" ];
        function isNumberArray(selectedIndex) {
            return selectedIndex instanceof Array;
        }
        var MDCListFoundation = function(_super) {
            __extends(MDCListFoundation, _super);
            function MDCListFoundation(adapter) {
                var _this = _super.call(this, __assign({}, MDCListFoundation.defaultAdapter, adapter)) || this;
                _this.wrapFocus_ = false;
                _this.isVertical_ = true;
                _this.isSingleSelectionList_ = false;
                _this.selectedIndex_ = constants_1.numbers.UNSET_INDEX;
                _this.focusedItemIndex_ = constants_1.numbers.UNSET_INDEX;
                _this.useActivatedClass_ = false;
                _this.ariaCurrentAttrValue_ = null;
                _this.isCheckboxList_ = false;
                _this.isRadioList_ = false;
                return _this;
            }
            Object.defineProperty(MDCListFoundation, "strings", {
                get: function get() {
                    return constants_1.strings;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MDCListFoundation, "cssClasses", {
                get: function get() {
                    return constants_1.cssClasses;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MDCListFoundation, "numbers", {
                get: function get() {
                    return constants_1.numbers;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MDCListFoundation, "defaultAdapter", {
                get: function get() {
                    return {
                        addClassForElementIndex: function addClassForElementIndex() {
                            return undefined;
                        },
                        focusItemAtIndex: function focusItemAtIndex() {
                            return undefined;
                        },
                        getAttributeForElementIndex: function getAttributeForElementIndex() {
                            return null;
                        },
                        getFocusedElementIndex: function getFocusedElementIndex() {
                            return 0;
                        },
                        getListItemCount: function getListItemCount() {
                            return 0;
                        },
                        hasCheckboxAtIndex: function hasCheckboxAtIndex() {
                            return false;
                        },
                        hasRadioAtIndex: function hasRadioAtIndex() {
                            return false;
                        },
                        isCheckboxCheckedAtIndex: function isCheckboxCheckedAtIndex() {
                            return false;
                        },
                        isFocusInsideList: function isFocusInsideList() {
                            return false;
                        },
                        isRootFocused: function isRootFocused() {
                            return false;
                        },
                        notifyAction: function notifyAction() {
                            return undefined;
                        },
                        removeClassForElementIndex: function removeClassForElementIndex() {
                            return undefined;
                        },
                        setAttributeForElementIndex: function setAttributeForElementIndex() {
                            return undefined;
                        },
                        setCheckedCheckboxOrRadioAtIndex: function setCheckedCheckboxOrRadioAtIndex() {
                            return undefined;
                        },
                        setTabIndexForListItemChildren: function setTabIndexForListItemChildren() {
                            return undefined;
                        }
                    };
                },
                enumerable: true,
                configurable: true
            });
            MDCListFoundation.prototype.layout = function() {
                if (this.adapter_.getListItemCount() === 0) {
                    return;
                }
                if (this.adapter_.hasCheckboxAtIndex(0)) {
                    this.isCheckboxList_ = true;
                } else if (this.adapter_.hasRadioAtIndex(0)) {
                    this.isRadioList_ = true;
                }
            };
            MDCListFoundation.prototype.setWrapFocus = function(value) {
                this.wrapFocus_ = value;
            };
            MDCListFoundation.prototype.setVerticalOrientation = function(value) {
                this.isVertical_ = value;
            };
            MDCListFoundation.prototype.setSingleSelection = function(value) {
                this.isSingleSelectionList_ = value;
            };
            MDCListFoundation.prototype.setUseActivatedClass = function(useActivated) {
                this.useActivatedClass_ = useActivated;
            };
            MDCListFoundation.prototype.getSelectedIndex = function() {
                return this.selectedIndex_;
            };
            MDCListFoundation.prototype.setSelectedIndex = function(index) {
                if (!this.isIndexValid_(index)) {
                    return;
                }
                if (this.isCheckboxList_) {
                    this.setCheckboxAtIndex_(index);
                } else if (this.isRadioList_) {
                    this.setRadioAtIndex_(index);
                } else {
                    this.setSingleSelectionAtIndex_(index);
                }
            };
            MDCListFoundation.prototype.handleFocusIn = function(_, listItemIndex) {
                if (listItemIndex >= 0) {
                    this.adapter_.setTabIndexForListItemChildren(listItemIndex, "0");
                }
            };
            MDCListFoundation.prototype.handleFocusOut = function(_, listItemIndex) {
                var _this = this;
                if (listItemIndex >= 0) {
                    this.adapter_.setTabIndexForListItemChildren(listItemIndex, "-1");
                }
                setTimeout(function() {
                    if (!_this.adapter_.isFocusInsideList()) {
                        _this.setTabindexToFirstSelectedItem_();
                    }
                }, 0);
            };
            MDCListFoundation.prototype.handleKeydown = function(evt, isRootListItem, listItemIndex) {
                var isArrowLeft = evt.key === "ArrowLeft" || evt.keyCode === 37;
                var isArrowUp = evt.key === "ArrowUp" || evt.keyCode === 38;
                var isArrowRight = evt.key === "ArrowRight" || evt.keyCode === 39;
                var isArrowDown = evt.key === "ArrowDown" || evt.keyCode === 40;
                var isHome = evt.key === "Home" || evt.keyCode === 36;
                var isEnd = evt.key === "End" || evt.keyCode === 35;
                var isEnter = evt.key === "Enter" || evt.keyCode === 13;
                var isSpace = evt.key === "Space" || evt.keyCode === 32;
                if (this.adapter_.isRootFocused()) {
                    if (isArrowUp || isEnd) {
                        evt.preventDefault();
                        this.focusLastElement();
                    } else if (isArrowDown || isHome) {
                        evt.preventDefault();
                        this.focusFirstElement();
                    }
                    return;
                }
                var currentIndex = this.adapter_.getFocusedElementIndex();
                if (currentIndex === -1) {
                    currentIndex = listItemIndex;
                    if (currentIndex < 0) {
                        return;
                    }
                }
                var nextIndex;
                if (this.isVertical_ && isArrowDown || !this.isVertical_ && isArrowRight) {
                    this.preventDefaultEvent_(evt);
                    nextIndex = this.focusNextElement(currentIndex);
                } else if (this.isVertical_ && isArrowUp || !this.isVertical_ && isArrowLeft) {
                    this.preventDefaultEvent_(evt);
                    nextIndex = this.focusPrevElement(currentIndex);
                } else if (isHome) {
                    this.preventDefaultEvent_(evt);
                    nextIndex = this.focusFirstElement();
                } else if (isEnd) {
                    this.preventDefaultEvent_(evt);
                    nextIndex = this.focusLastElement();
                } else if (isEnter || isSpace) {
                    if (isRootListItem) {
                        var target = evt.target;
                        if (target && target.tagName === "A" && isEnter) {
                            return;
                        }
                        this.preventDefaultEvent_(evt);
                        if (this.isSelectableList_()) {
                            this.setSelectedIndexOnAction_(currentIndex);
                        }
                        this.adapter_.notifyAction(currentIndex);
                    }
                }
                this.focusedItemIndex_ = currentIndex;
                if (nextIndex !== undefined) {
                    this.setTabindexAtIndex_(nextIndex);
                    this.focusedItemIndex_ = nextIndex;
                }
            };
            MDCListFoundation.prototype.handleClick = function(index, toggleCheckbox) {
                if (index === constants_1.numbers.UNSET_INDEX) {
                    return;
                }
                if (this.isSelectableList_()) {
                    this.setSelectedIndexOnAction_(index, toggleCheckbox);
                }
                this.adapter_.notifyAction(index);
                this.setTabindexAtIndex_(index);
                this.focusedItemIndex_ = index;
            };
            MDCListFoundation.prototype.focusNextElement = function(index) {
                var count = this.adapter_.getListItemCount();
                var nextIndex = index + 1;
                if (nextIndex >= count) {
                    if (this.wrapFocus_) {
                        nextIndex = 0;
                    } else {
                        return index;
                    }
                }
                this.adapter_.focusItemAtIndex(nextIndex);
                return nextIndex;
            };
            MDCListFoundation.prototype.focusPrevElement = function(index) {
                var prevIndex = index - 1;
                if (prevIndex < 0) {
                    if (this.wrapFocus_) {
                        prevIndex = this.adapter_.getListItemCount() - 1;
                    } else {
                        return index;
                    }
                }
                this.adapter_.focusItemAtIndex(prevIndex);
                return prevIndex;
            };
            MDCListFoundation.prototype.focusFirstElement = function() {
                this.adapter_.focusItemAtIndex(0);
                return 0;
            };
            MDCListFoundation.prototype.focusLastElement = function() {
                var lastIndex = this.adapter_.getListItemCount() - 1;
                this.adapter_.focusItemAtIndex(lastIndex);
                return lastIndex;
            };
            MDCListFoundation.prototype.preventDefaultEvent_ = function(evt) {
                var target = evt.target;
                var tagName = ("" + target.tagName).toLowerCase();
                if (ELEMENTS_KEY_ALLOWED_IN.indexOf(tagName) === -1) {
                    evt.preventDefault();
                }
            };
            MDCListFoundation.prototype.setSingleSelectionAtIndex_ = function(index) {
                if (this.selectedIndex_ === index) {
                    return;
                }
                var selectedClassName = constants_1.cssClasses.LIST_ITEM_SELECTED_CLASS;
                if (this.useActivatedClass_) {
                    selectedClassName = constants_1.cssClasses.LIST_ITEM_ACTIVATED_CLASS;
                }
                if (this.selectedIndex_ !== constants_1.numbers.UNSET_INDEX) {
                    this.adapter_.removeClassForElementIndex(this.selectedIndex_, selectedClassName);
                }
                this.adapter_.addClassForElementIndex(index, selectedClassName);
                this.setAriaForSingleSelectionAtIndex_(index);
                this.selectedIndex_ = index;
            };
            MDCListFoundation.prototype.setAriaForSingleSelectionAtIndex_ = function(index) {
                if (this.selectedIndex_ === constants_1.numbers.UNSET_INDEX) {
                    this.ariaCurrentAttrValue_ = this.adapter_.getAttributeForElementIndex(index, constants_1.strings.ARIA_CURRENT);
                }
                var isAriaCurrent = this.ariaCurrentAttrValue_ !== null;
                var ariaAttribute = isAriaCurrent ? constants_1.strings.ARIA_CURRENT : constants_1.strings.ARIA_SELECTED;
                if (this.selectedIndex_ !== constants_1.numbers.UNSET_INDEX) {
                    this.adapter_.setAttributeForElementIndex(this.selectedIndex_, ariaAttribute, "false");
                }
                var ariaAttributeValue = isAriaCurrent ? this.ariaCurrentAttrValue_ : "true";
                this.adapter_.setAttributeForElementIndex(index, ariaAttribute, ariaAttributeValue);
            };
            MDCListFoundation.prototype.setRadioAtIndex_ = function(index) {
                this.adapter_.setCheckedCheckboxOrRadioAtIndex(index, true);
                if (this.selectedIndex_ !== constants_1.numbers.UNSET_INDEX) {
                    this.adapter_.setAttributeForElementIndex(this.selectedIndex_, constants_1.strings.ARIA_CHECKED, "false");
                }
                this.adapter_.setAttributeForElementIndex(index, constants_1.strings.ARIA_CHECKED, "true");
                this.selectedIndex_ = index;
            };
            MDCListFoundation.prototype.setCheckboxAtIndex_ = function(index) {
                for (var i = 0; i < this.adapter_.getListItemCount(); i++) {
                    var isChecked = false;
                    if (index.indexOf(i) >= 0) {
                        isChecked = true;
                    }
                    this.adapter_.setCheckedCheckboxOrRadioAtIndex(i, isChecked);
                    this.adapter_.setAttributeForElementIndex(i, constants_1.strings.ARIA_CHECKED, isChecked ? "true" : "false");
                }
                this.selectedIndex_ = index;
            };
            MDCListFoundation.prototype.setTabindexAtIndex_ = function(index) {
                if (this.focusedItemIndex_ === constants_1.numbers.UNSET_INDEX && index !== 0) {
                    this.adapter_.setAttributeForElementIndex(0, "tabindex", "-1");
                } else if (this.focusedItemIndex_ >= 0 && this.focusedItemIndex_ !== index) {
                    this.adapter_.setAttributeForElementIndex(this.focusedItemIndex_, "tabindex", "-1");
                }
                this.adapter_.setAttributeForElementIndex(index, "tabindex", "0");
            };
            MDCListFoundation.prototype.isSelectableList_ = function() {
                return this.isSingleSelectionList_ || this.isCheckboxList_ || this.isRadioList_;
            };
            MDCListFoundation.prototype.setTabindexToFirstSelectedItem_ = function() {
                var targetIndex = 0;
                if (this.isSelectableList_()) {
                    if (typeof this.selectedIndex_ === "number" && this.selectedIndex_ !== constants_1.numbers.UNSET_INDEX) {
                        targetIndex = this.selectedIndex_;
                    } else if (isNumberArray(this.selectedIndex_) && this.selectedIndex_.length > 0) {
                        targetIndex = this.selectedIndex_.reduce(function(currentIndex, minIndex) {
                            return Math.min(currentIndex, minIndex);
                        });
                    }
                }
                this.setTabindexAtIndex_(targetIndex);
            };
            MDCListFoundation.prototype.isIndexValid_ = function(index) {
                var _this = this;
                if (index instanceof Array) {
                    if (!this.isCheckboxList_) {
                        throw new Error("MDCListFoundation: Array of index is only supported for checkbox based list");
                    }
                    if (index.length === 0) {
                        return true;
                    } else {
                        return index.some(function(i) {
                            return _this.isIndexInRange_(i);
                        });
                    }
                } else if (typeof index === "number") {
                    if (this.isCheckboxList_) {
                        throw new Error("MDCListFoundation: Expected array of index for checkbox based list but got number: " + index);
                    }
                    return this.isIndexInRange_(index);
                } else {
                    return false;
                }
            };
            MDCListFoundation.prototype.isIndexInRange_ = function(index) {
                var listSize = this.adapter_.getListItemCount();
                return index >= 0 && index < listSize;
            };
            MDCListFoundation.prototype.setSelectedIndexOnAction_ = function(index, toggleCheckbox) {
                if (toggleCheckbox === void 0) {
                    toggleCheckbox = true;
                }
                if (this.isCheckboxList_) {
                    this.toggleCheckboxAtIndex_(index, toggleCheckbox);
                } else {
                    this.setSelectedIndex(index);
                }
            };
            MDCListFoundation.prototype.toggleCheckboxAtIndex_ = function(index, toggleCheckbox) {
                var isChecked = this.adapter_.isCheckboxCheckedAtIndex(index);
                if (toggleCheckbox) {
                    isChecked = !isChecked;
                    this.adapter_.setCheckedCheckboxOrRadioAtIndex(index, isChecked);
                }
                this.adapter_.setAttributeForElementIndex(index, constants_1.strings.ARIA_CHECKED, isChecked ? "true" : "false");
                var selectedIndexes = this.selectedIndex_ === constants_1.numbers.UNSET_INDEX ? [] : this.selectedIndex_.slice();
                if (isChecked) {
                    selectedIndexes.push(index);
                } else {
                    selectedIndexes = selectedIndexes.filter(function(i) {
                        return i !== index;
                    });
                }
                this.selectedIndex_ = selectedIndexes;
            };
            return MDCListFoundation;
        }(foundation_1.MDCFoundation);
        exports.MDCListFoundation = MDCListFoundation;
        exports.default = MDCListFoundation;
    }, function(module, exports, __webpack_require__) {
        "use strict";
        var __extends = this && this.__extends || function() {
            var _extendStatics = function extendStatics(d, b) {
                _extendStatics = Object.setPrototypeOf || {
                    __proto__: []
                } instanceof Array && function(d, b) {
                    d.__proto__ = b;
                } || function(d, b) {
                    for (var p in b) {
                        if (b.hasOwnProperty(p)) d[p] = b[p];
                    }
                };
                return _extendStatics(d, b);
            };
            return function(d, b) {
                _extendStatics(d, b);
                function __() {
                    this.constructor = d;
                }
                d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
            };
        }();
        var __assign = this && this.__assign || function() {
            __assign = Object.assign || function(t) {
                for (var s, i = 1, n = arguments.length; i < n; i++) {
                    s = arguments[i];
                    for (var p in s) {
                        if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
                    }
                }
                return t;
            };
            return __assign.apply(this, arguments);
        };
        var __values = this && this.__values || function(o) {
            var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
            if (m) return m.call(o);
            return {
                next: function next() {
                    if (o && i >= o.length) o = void 0;
                    return {
                        value: o && o[i++],
                        done: !o
                    };
                }
            };
        };
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var foundation_1 = __webpack_require__(0);
        var constants_1 = __webpack_require__(5);
        var MDCMenuSurfaceFoundation = function(_super) {
            __extends(MDCMenuSurfaceFoundation, _super);
            function MDCMenuSurfaceFoundation(adapter) {
                var _this = _super.call(this, __assign({}, MDCMenuSurfaceFoundation.defaultAdapter, adapter)) || this;
                _this.isOpen_ = false;
                _this.isQuickOpen_ = false;
                _this.isHoistedElement_ = false;
                _this.isFixedPosition_ = false;
                _this.openAnimationEndTimerId_ = 0;
                _this.closeAnimationEndTimerId_ = 0;
                _this.animationRequestId_ = 0;
                _this.anchorCorner_ = constants_1.Corner.TOP_START;
                _this.anchorMargin_ = {
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0
                };
                _this.position_ = {
                    x: 0,
                    y: 0
                };
                return _this;
            }
            Object.defineProperty(MDCMenuSurfaceFoundation, "cssClasses", {
                get: function get() {
                    return constants_1.cssClasses;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MDCMenuSurfaceFoundation, "strings", {
                get: function get() {
                    return constants_1.strings;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MDCMenuSurfaceFoundation, "numbers", {
                get: function get() {
                    return constants_1.numbers;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MDCMenuSurfaceFoundation, "Corner", {
                get: function get() {
                    return constants_1.Corner;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MDCMenuSurfaceFoundation, "defaultAdapter", {
                get: function get() {
                    return {
                        addClass: function addClass() {
                            return undefined;
                        },
                        removeClass: function removeClass() {
                            return undefined;
                        },
                        hasClass: function hasClass() {
                            return false;
                        },
                        hasAnchor: function hasAnchor() {
                            return false;
                        },
                        isElementInContainer: function isElementInContainer() {
                            return false;
                        },
                        isFocused: function isFocused() {
                            return false;
                        },
                        isFirstElementFocused: function isFirstElementFocused() {
                            return false;
                        },
                        isLastElementFocused: function isLastElementFocused() {
                            return false;
                        },
                        isRtl: function isRtl() {
                            return false;
                        },
                        getInnerDimensions: function getInnerDimensions() {
                            return {
                                height: 0,
                                width: 0
                            };
                        },
                        getAnchorDimensions: function getAnchorDimensions() {
                            return null;
                        },
                        getWindowDimensions: function getWindowDimensions() {
                            return {
                                height: 0,
                                width: 0
                            };
                        },
                        getBodyDimensions: function getBodyDimensions() {
                            return {
                                height: 0,
                                width: 0
                            };
                        },
                        getWindowScroll: function getWindowScroll() {
                            return {
                                x: 0,
                                y: 0
                            };
                        },
                        setPosition: function setPosition() {
                            return undefined;
                        },
                        setMaxHeight: function setMaxHeight() {
                            return undefined;
                        },
                        setTransformOrigin: function setTransformOrigin() {
                            return undefined;
                        },
                        saveFocus: function saveFocus() {
                            return undefined;
                        },
                        restoreFocus: function restoreFocus() {
                            return undefined;
                        },
                        focusFirstElement: function focusFirstElement() {
                            return undefined;
                        },
                        focusLastElement: function focusLastElement() {
                            return undefined;
                        },
                        notifyClose: function notifyClose() {
                            return undefined;
                        },
                        notifyOpen: function notifyOpen() {
                            return undefined;
                        }
                    };
                },
                enumerable: true,
                configurable: true
            });
            MDCMenuSurfaceFoundation.prototype.init = function() {
                var _a = MDCMenuSurfaceFoundation.cssClasses, ROOT = _a.ROOT, OPEN = _a.OPEN;
                if (!this.adapter_.hasClass(ROOT)) {
                    throw new Error(ROOT + " class required in root element.");
                }
                if (this.adapter_.hasClass(OPEN)) {
                    this.isOpen_ = true;
                }
            };
            MDCMenuSurfaceFoundation.prototype.destroy = function() {
                clearTimeout(this.openAnimationEndTimerId_);
                clearTimeout(this.closeAnimationEndTimerId_);
                cancelAnimationFrame(this.animationRequestId_);
            };
            MDCMenuSurfaceFoundation.prototype.setAnchorCorner = function(corner) {
                this.anchorCorner_ = corner;
            };
            MDCMenuSurfaceFoundation.prototype.setAnchorMargin = function(margin) {
                this.anchorMargin_.top = margin.top || 0;
                this.anchorMargin_.right = margin.right || 0;
                this.anchorMargin_.bottom = margin.bottom || 0;
                this.anchorMargin_.left = margin.left || 0;
            };
            MDCMenuSurfaceFoundation.prototype.setIsHoisted = function(isHoisted) {
                this.isHoistedElement_ = isHoisted;
            };
            MDCMenuSurfaceFoundation.prototype.setFixedPosition = function(isFixedPosition) {
                this.isFixedPosition_ = isFixedPosition;
            };
            MDCMenuSurfaceFoundation.prototype.setAbsolutePosition = function(x, y) {
                this.position_.x = this.isFinite_(x) ? x : 0;
                this.position_.y = this.isFinite_(y) ? y : 0;
            };
            MDCMenuSurfaceFoundation.prototype.setQuickOpen = function(quickOpen) {
                this.isQuickOpen_ = quickOpen;
            };
            MDCMenuSurfaceFoundation.prototype.isOpen = function() {
                return this.isOpen_;
            };
            MDCMenuSurfaceFoundation.prototype.open = function() {
                var _this = this;
                this.adapter_.saveFocus();
                if (!this.isQuickOpen_) {
                    this.adapter_.addClass(MDCMenuSurfaceFoundation.cssClasses.ANIMATING_OPEN);
                }
                this.animationRequestId_ = requestAnimationFrame(function() {
                    _this.adapter_.addClass(MDCMenuSurfaceFoundation.cssClasses.OPEN);
                    _this.dimensions_ = _this.adapter_.getInnerDimensions();
                    _this.autoPosition_();
                    if (_this.isQuickOpen_) {
                        _this.adapter_.notifyOpen();
                    } else {
                        _this.openAnimationEndTimerId_ = setTimeout(function() {
                            _this.openAnimationEndTimerId_ = 0;
                            _this.adapter_.removeClass(MDCMenuSurfaceFoundation.cssClasses.ANIMATING_OPEN);
                            _this.adapter_.notifyOpen();
                        }, constants_1.numbers.TRANSITION_OPEN_DURATION);
                    }
                });
                this.isOpen_ = true;
            };
            MDCMenuSurfaceFoundation.prototype.close = function() {
                var _this = this;
                if (!this.isQuickOpen_) {
                    this.adapter_.addClass(MDCMenuSurfaceFoundation.cssClasses.ANIMATING_CLOSED);
                }
                requestAnimationFrame(function() {
                    _this.adapter_.removeClass(MDCMenuSurfaceFoundation.cssClasses.OPEN);
                    if (_this.isQuickOpen_) {
                        _this.adapter_.notifyClose();
                    } else {
                        _this.closeAnimationEndTimerId_ = setTimeout(function() {
                            _this.closeAnimationEndTimerId_ = 0;
                            _this.adapter_.removeClass(MDCMenuSurfaceFoundation.cssClasses.ANIMATING_CLOSED);
                            _this.adapter_.notifyClose();
                        }, constants_1.numbers.TRANSITION_CLOSE_DURATION);
                    }
                });
                this.isOpen_ = false;
                this.maybeRestoreFocus_();
            };
            MDCMenuSurfaceFoundation.prototype.handleBodyClick = function(evt) {
                var el = evt.target;
                if (this.adapter_.isElementInContainer(el)) {
                    return;
                }
                this.close();
            };
            MDCMenuSurfaceFoundation.prototype.handleKeydown = function(evt) {
                var keyCode = evt.keyCode, key = evt.key, shiftKey = evt.shiftKey;
                var isEscape = key === "Escape" || keyCode === 27;
                var isTab = key === "Tab" || keyCode === 9;
                if (isEscape) {
                    this.close();
                } else if (isTab) {
                    if (this.adapter_.isLastElementFocused() && !shiftKey) {
                        this.adapter_.focusFirstElement();
                        evt.preventDefault();
                    } else if (this.adapter_.isFirstElementFocused() && shiftKey) {
                        this.adapter_.focusLastElement();
                        evt.preventDefault();
                    }
                }
            };
            MDCMenuSurfaceFoundation.prototype.autoPosition_ = function() {
                var _a;
                this.measurements_ = this.getAutoLayoutMeasurements_();
                var corner = this.getOriginCorner_();
                var maxMenuSurfaceHeight = this.getMenuSurfaceMaxHeight_(corner);
                var verticalAlignment = this.hasBit_(corner, constants_1.CornerBit.BOTTOM) ? "bottom" : "top";
                var horizontalAlignment = this.hasBit_(corner, constants_1.CornerBit.RIGHT) ? "right" : "left";
                var horizontalOffset = this.getHorizontalOriginOffset_(corner);
                var verticalOffset = this.getVerticalOriginOffset_(corner);
                var _b = this.measurements_, anchorSize = _b.anchorSize, surfaceSize = _b.surfaceSize;
                var position = (_a = {}, _a[horizontalAlignment] = horizontalOffset, _a[verticalAlignment] = verticalOffset, 
                _a);
                if (anchorSize.width / surfaceSize.width > constants_1.numbers.ANCHOR_TO_MENU_SURFACE_WIDTH_RATIO) {
                    horizontalAlignment = "center";
                }
                if (this.isHoistedElement_ || this.isFixedPosition_) {
                    this.adjustPositionForHoistedElement_(position);
                }
                this.adapter_.setTransformOrigin(horizontalAlignment + " " + verticalAlignment);
                this.adapter_.setPosition(position);
                this.adapter_.setMaxHeight(maxMenuSurfaceHeight ? maxMenuSurfaceHeight + "px" : "");
            };
            MDCMenuSurfaceFoundation.prototype.getAutoLayoutMeasurements_ = function() {
                var anchorRect = this.adapter_.getAnchorDimensions();
                var bodySize = this.adapter_.getBodyDimensions();
                var viewportSize = this.adapter_.getWindowDimensions();
                var windowScroll = this.adapter_.getWindowScroll();
                if (!anchorRect) {
                    anchorRect = {
                        top: this.position_.y,
                        right: this.position_.x,
                        bottom: this.position_.y,
                        left: this.position_.x,
                        width: 0,
                        height: 0
                    };
                }
                return {
                    anchorSize: anchorRect,
                    bodySize: bodySize,
                    surfaceSize: this.dimensions_,
                    viewportDistance: {
                        top: anchorRect.top,
                        right: viewportSize.width - anchorRect.right,
                        bottom: viewportSize.height - anchorRect.bottom,
                        left: anchorRect.left
                    },
                    viewportSize: viewportSize,
                    windowScroll: windowScroll
                };
            };
            MDCMenuSurfaceFoundation.prototype.getOriginCorner_ = function() {
                var corner = constants_1.Corner.TOP_LEFT;
                var _a = this.measurements_, viewportDistance = _a.viewportDistance, anchorSize = _a.anchorSize, surfaceSize = _a.surfaceSize;
                var isBottomAligned = this.hasBit_(this.anchorCorner_, constants_1.CornerBit.BOTTOM);
                var availableTop = isBottomAligned ? viewportDistance.top + anchorSize.height + this.anchorMargin_.bottom : viewportDistance.top + this.anchorMargin_.top;
                var availableBottom = isBottomAligned ? viewportDistance.bottom - this.anchorMargin_.bottom : viewportDistance.bottom + anchorSize.height - this.anchorMargin_.top;
                var topOverflow = surfaceSize.height - availableTop;
                var bottomOverflow = surfaceSize.height - availableBottom;
                if (bottomOverflow > 0 && topOverflow < bottomOverflow) {
                    corner = this.setBit_(corner, constants_1.CornerBit.BOTTOM);
                }
                var isRtl = this.adapter_.isRtl();
                var isFlipRtl = this.hasBit_(this.anchorCorner_, constants_1.CornerBit.FLIP_RTL);
                var avoidHorizontalOverlap = this.hasBit_(this.anchorCorner_, constants_1.CornerBit.RIGHT);
                var isAlignedRight = avoidHorizontalOverlap && !isRtl || !avoidHorizontalOverlap && isFlipRtl && isRtl;
                var availableLeft = isAlignedRight ? viewportDistance.left + anchorSize.width + this.anchorMargin_.right : viewportDistance.left + this.anchorMargin_.left;
                var availableRight = isAlignedRight ? viewportDistance.right - this.anchorMargin_.right : viewportDistance.right + anchorSize.width - this.anchorMargin_.left;
                var leftOverflow = surfaceSize.width - availableLeft;
                var rightOverflow = surfaceSize.width - availableRight;
                if (leftOverflow < 0 && isAlignedRight && isRtl || avoidHorizontalOverlap && !isAlignedRight && leftOverflow < 0 || rightOverflow > 0 && leftOverflow < rightOverflow) {
                    corner = this.setBit_(corner, constants_1.CornerBit.RIGHT);
                }
                return corner;
            };
            MDCMenuSurfaceFoundation.prototype.getMenuSurfaceMaxHeight_ = function(corner) {
                var viewportDistance = this.measurements_.viewportDistance;
                var maxHeight = 0;
                var isBottomAligned = this.hasBit_(corner, constants_1.CornerBit.BOTTOM);
                var isBottomAnchored = this.hasBit_(this.anchorCorner_, constants_1.CornerBit.BOTTOM);
                var MARGIN_TO_EDGE = MDCMenuSurfaceFoundation.numbers.MARGIN_TO_EDGE;
                if (isBottomAligned) {
                    maxHeight = viewportDistance.top + this.anchorMargin_.top - MARGIN_TO_EDGE;
                    if (!isBottomAnchored) {
                        maxHeight += this.measurements_.anchorSize.height;
                    }
                } else {
                    maxHeight = viewportDistance.bottom - this.anchorMargin_.bottom + this.measurements_.anchorSize.height - MARGIN_TO_EDGE;
                    if (isBottomAnchored) {
                        maxHeight -= this.measurements_.anchorSize.height;
                    }
                }
                return maxHeight;
            };
            MDCMenuSurfaceFoundation.prototype.getHorizontalOriginOffset_ = function(corner) {
                var anchorSize = this.measurements_.anchorSize;
                var isRightAligned = this.hasBit_(corner, constants_1.CornerBit.RIGHT);
                var avoidHorizontalOverlap = this.hasBit_(this.anchorCorner_, constants_1.CornerBit.RIGHT);
                if (isRightAligned) {
                    var rightOffset = avoidHorizontalOverlap ? anchorSize.width - this.anchorMargin_.left : this.anchorMargin_.right;
                    if (this.isHoistedElement_ || this.isFixedPosition_) {
                        return rightOffset - (this.measurements_.viewportSize.width - this.measurements_.bodySize.width);
                    }
                    return rightOffset;
                }
                return avoidHorizontalOverlap ? anchorSize.width - this.anchorMargin_.right : this.anchorMargin_.left;
            };
            MDCMenuSurfaceFoundation.prototype.getVerticalOriginOffset_ = function(corner) {
                var anchorSize = this.measurements_.anchorSize;
                var isBottomAligned = this.hasBit_(corner, constants_1.CornerBit.BOTTOM);
                var avoidVerticalOverlap = this.hasBit_(this.anchorCorner_, constants_1.CornerBit.BOTTOM);
                var y = 0;
                if (isBottomAligned) {
                    y = avoidVerticalOverlap ? anchorSize.height - this.anchorMargin_.top : -this.anchorMargin_.bottom;
                } else {
                    y = avoidVerticalOverlap ? anchorSize.height + this.anchorMargin_.bottom : this.anchorMargin_.top;
                }
                return y;
            };
            MDCMenuSurfaceFoundation.prototype.adjustPositionForHoistedElement_ = function(position) {
                var e_1, _a;
                var _b = this.measurements_, windowScroll = _b.windowScroll, viewportDistance = _b.viewportDistance;
                var props = Object.keys(position);
                try {
                    for (var props_1 = __values(props), props_1_1 = props_1.next(); !props_1_1.done; props_1_1 = props_1.next()) {
                        var prop = props_1_1.value;
                        var value = position[prop] || 0;
                        value += viewportDistance[prop];
                        if (!this.isFixedPosition_) {
                            if (prop === "top") {
                                value += windowScroll.y;
                            } else if (prop === "bottom") {
                                value -= windowScroll.y;
                            } else if (prop === "left") {
                                value += windowScroll.x;
                            } else {
                                value -= windowScroll.x;
                            }
                        }
                        position[prop] = value;
                    }
                } catch (e_1_1) {
                    e_1 = {
                        error: e_1_1
                    };
                } finally {
                    try {
                        if (props_1_1 && !props_1_1.done && (_a = props_1.return)) _a.call(props_1);
                    } finally {
                        if (e_1) throw e_1.error;
                    }
                }
            };
            MDCMenuSurfaceFoundation.prototype.maybeRestoreFocus_ = function() {
                var isRootFocused = this.adapter_.isFocused();
                var childHasFocus = document.activeElement && this.adapter_.isElementInContainer(document.activeElement);
                if (isRootFocused || childHasFocus) {
                    this.adapter_.restoreFocus();
                }
            };
            MDCMenuSurfaceFoundation.prototype.hasBit_ = function(corner, bit) {
                return Boolean(corner & bit);
            };
            MDCMenuSurfaceFoundation.prototype.setBit_ = function(corner, bit) {
                return corner | bit;
            };
            MDCMenuSurfaceFoundation.prototype.isFinite_ = function(num) {
                return typeof num === "number" && isFinite(num);
            };
            return MDCMenuSurfaceFoundation;
        }(foundation_1.MDCFoundation);
        exports.MDCMenuSurfaceFoundation = MDCMenuSurfaceFoundation;
        exports.default = MDCMenuSurfaceFoundation;
    }, function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var cssClasses = {
            MENU_SELECTED_LIST_ITEM: "mdc-menu-item--selected",
            MENU_SELECTION_GROUP: "mdc-menu__selection-group",
            ROOT: "mdc-menu"
        };
        exports.cssClasses = cssClasses;
        var strings = {
            ARIA_SELECTED_ATTR: "aria-selected",
            CHECKBOX_SELECTOR: 'input[type="checkbox"]',
            LIST_SELECTOR: ".mdc-list",
            SELECTED_EVENT: "MDCMenu:selected"
        };
        exports.strings = strings;
        var numbers = {
            FOCUS_ROOT_INDEX: -1
        };
        exports.numbers = numbers;
        var DefaultFocusState;
        (function(DefaultFocusState) {
            DefaultFocusState[DefaultFocusState["NONE"] = 0] = "NONE";
            DefaultFocusState[DefaultFocusState["LIST_ROOT"] = 1] = "LIST_ROOT";
            DefaultFocusState[DefaultFocusState["FIRST_ITEM"] = 2] = "FIRST_ITEM";
            DefaultFocusState[DefaultFocusState["LAST_ITEM"] = 3] = "LAST_ITEM";
        })(DefaultFocusState || (DefaultFocusState = {}));
        exports.DefaultFocusState = DefaultFocusState;
    }, function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var cssClasses = {
            CLOSING: "mdc-snackbar--closing",
            OPEN: "mdc-snackbar--open",
            OPENING: "mdc-snackbar--opening"
        };
        exports.cssClasses = cssClasses;
        var strings = {
            ACTION_SELECTOR: ".mdc-snackbar__action",
            ARIA_LIVE_LABEL_TEXT_ATTR: "data-mdc-snackbar-label-text",
            CLOSED_EVENT: "MDCSnackbar:closed",
            CLOSING_EVENT: "MDCSnackbar:closing",
            DISMISS_SELECTOR: ".mdc-snackbar__dismiss",
            LABEL_SELECTOR: ".mdc-snackbar__label",
            OPENED_EVENT: "MDCSnackbar:opened",
            OPENING_EVENT: "MDCSnackbar:opening",
            REASON_ACTION: "action",
            REASON_DISMISS: "dismiss",
            SURFACE_SELECTOR: ".mdc-snackbar__surface"
        };
        exports.strings = strings;
        var numbers = {
            DEFAULT_AUTO_DISMISS_TIMEOUT_MS: 5e3,
            MAX_AUTO_DISMISS_TIMEOUT_MS: 1e4,
            MIN_AUTO_DISMISS_TIMEOUT_MS: 4e3,
            SNACKBAR_ANIMATION_CLOSE_TIME_MS: 75,
            SNACKBAR_ANIMATION_OPEN_TIME_MS: 150,
            ARIA_LIVE_DELAY_MS: 1e3
        };
        exports.numbers = numbers;
    }, function(module, exports, __webpack_require__) {
        "use strict";
        var __extends = this && this.__extends || function() {
            var _extendStatics = function extendStatics(d, b) {
                _extendStatics = Object.setPrototypeOf || {
                    __proto__: []
                } instanceof Array && function(d, b) {
                    d.__proto__ = b;
                } || function(d, b) {
                    for (var p in b) {
                        if (b.hasOwnProperty(p)) d[p] = b[p];
                    }
                };
                return _extendStatics(d, b);
            };
            return function(d, b) {
                _extendStatics(d, b);
                function __() {
                    this.constructor = d;
                }
                d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
            };
        }();
        var __assign = this && this.__assign || function() {
            __assign = Object.assign || function(t) {
                for (var s, i = 1, n = arguments.length; i < n; i++) {
                    s = arguments[i];
                    for (var p in s) {
                        if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
                    }
                }
                return t;
            };
            return __assign.apply(this, arguments);
        };
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var foundation_1 = __webpack_require__(0);
        var constants_1 = __webpack_require__(83);
        var MDCTabIndicatorFoundation = function(_super) {
            __extends(MDCTabIndicatorFoundation, _super);
            function MDCTabIndicatorFoundation(adapter) {
                return _super.call(this, __assign({}, MDCTabIndicatorFoundation.defaultAdapter, adapter)) || this;
            }
            Object.defineProperty(MDCTabIndicatorFoundation, "cssClasses", {
                get: function get() {
                    return constants_1.cssClasses;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MDCTabIndicatorFoundation, "strings", {
                get: function get() {
                    return constants_1.strings;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MDCTabIndicatorFoundation, "defaultAdapter", {
                get: function get() {
                    return {
                        addClass: function addClass() {
                            return undefined;
                        },
                        removeClass: function removeClass() {
                            return undefined;
                        },
                        computeContentClientRect: function computeContentClientRect() {
                            return {
                                top: 0,
                                right: 0,
                                bottom: 0,
                                left: 0,
                                width: 0,
                                height: 0
                            };
                        },
                        setContentStyleProperty: function setContentStyleProperty() {
                            return undefined;
                        }
                    };
                },
                enumerable: true,
                configurable: true
            });
            MDCTabIndicatorFoundation.prototype.computeContentClientRect = function() {
                return this.adapter_.computeContentClientRect();
            };
            return MDCTabIndicatorFoundation;
        }(foundation_1.MDCFoundation);
        exports.MDCTabIndicatorFoundation = MDCTabIndicatorFoundation;
        exports.default = MDCTabIndicatorFoundation;
    }, function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var cssPropertyNameMap = {
            animation: {
                prefixed: "-webkit-animation",
                standard: "animation"
            },
            transform: {
                prefixed: "-webkit-transform",
                standard: "transform"
            },
            transition: {
                prefixed: "-webkit-transition",
                standard: "transition"
            }
        };
        var jsEventTypeMap = {
            animationend: {
                cssProperty: "animation",
                prefixed: "webkitAnimationEnd",
                standard: "animationend"
            },
            animationiteration: {
                cssProperty: "animation",
                prefixed: "webkitAnimationIteration",
                standard: "animationiteration"
            },
            animationstart: {
                cssProperty: "animation",
                prefixed: "webkitAnimationStart",
                standard: "animationstart"
            },
            transitionend: {
                cssProperty: "transition",
                prefixed: "webkitTransitionEnd",
                standard: "transitionend"
            }
        };
        function isWindow(windowObj) {
            return Boolean(windowObj.document) && typeof windowObj.document.createElement === "function";
        }
        function getCorrectPropertyName(windowObj, cssProperty) {
            if (isWindow(windowObj) && cssProperty in cssPropertyNameMap) {
                var el = windowObj.document.createElement("div");
                var _a = cssPropertyNameMap[cssProperty], standard = _a.standard, prefixed = _a.prefixed;
                var isStandard = standard in el.style;
                return isStandard ? standard : prefixed;
            }
            return cssProperty;
        }
        exports.getCorrectPropertyName = getCorrectPropertyName;
        function getCorrectEventName(windowObj, eventType) {
            if (isWindow(windowObj) && eventType in jsEventTypeMap) {
                var el = windowObj.document.createElement("div");
                var _a = jsEventTypeMap[eventType], standard = _a.standard, prefixed = _a.prefixed, cssProperty = _a.cssProperty;
                var isStandard = cssProperty in el.style;
                return isStandard ? standard : prefixed;
            }
            return eventType;
        }
        exports.getCorrectEventName = getCorrectEventName;
    }, function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var supportsCssVariables_;
        var supportsPassive_;
        function detectEdgePseudoVarBug(windowObj) {
            var document = windowObj.document;
            var node = document.createElement("div");
            node.className = "mdc-ripple-surface--test-edge-var-bug";
            document.body.appendChild(node);
            var computedStyle = windowObj.getComputedStyle(node);
            var hasPseudoVarBug = computedStyle !== null && computedStyle.borderTopStyle === "solid";
            if (node.parentNode) {
                node.parentNode.removeChild(node);
            }
            return hasPseudoVarBug;
        }
        function supportsCssVariables(windowObj, forceRefresh) {
            if (forceRefresh === void 0) {
                forceRefresh = false;
            }
            var CSS = windowObj.CSS;
            var supportsCssVars = supportsCssVariables_;
            if (typeof supportsCssVariables_ === "boolean" && !forceRefresh) {
                return supportsCssVariables_;
            }
            var supportsFunctionPresent = CSS && typeof CSS.supports === "function";
            if (!supportsFunctionPresent) {
                return false;
            }
            var explicitlySupportsCssVars = CSS.supports("--css-vars", "yes");
            var weAreFeatureDetectingSafari10plus = CSS.supports("(--css-vars: yes)") && CSS.supports("color", "#00000000");
            if (explicitlySupportsCssVars || weAreFeatureDetectingSafari10plus) {
                supportsCssVars = !detectEdgePseudoVarBug(windowObj);
            } else {
                supportsCssVars = false;
            }
            if (!forceRefresh) {
                supportsCssVariables_ = supportsCssVars;
            }
            return supportsCssVars;
        }
        exports.supportsCssVariables = supportsCssVariables;
        function applyPassive(globalObj, forceRefresh) {
            if (globalObj === void 0) {
                globalObj = window;
            }
            if (forceRefresh === void 0) {
                forceRefresh = false;
            }
            if (supportsPassive_ === undefined || forceRefresh) {
                var isSupported_1 = false;
                try {
                    globalObj.document.addEventListener("test", function() {
                        return undefined;
                    }, {
                        get passive() {
                            isSupported_1 = true;
                            return isSupported_1;
                        }
                    });
                } catch (e) {}
                supportsPassive_ = isSupported_1;
            }
            return supportsPassive_ ? {
                passive: true
            } : false;
        }
        exports.applyPassive = applyPassive;
        function getNormalizedEventCoords(evt, pageOffset, clientRect) {
            if (!evt) {
                return {
                    x: 0,
                    y: 0
                };
            }
            var x = pageOffset.x, y = pageOffset.y;
            var documentX = x + clientRect.left;
            var documentY = y + clientRect.top;
            var normalizedX;
            var normalizedY;
            if (evt.type === "touchstart") {
                var touchEvent = evt;
                normalizedX = touchEvent.changedTouches[0].pageX - documentX;
                normalizedY = touchEvent.changedTouches[0].pageY - documentY;
            } else {
                var mouseEvent = evt;
                normalizedX = mouseEvent.pageX - documentX;
                normalizedY = mouseEvent.pageY - documentY;
            }
            return {
                x: normalizedX,
                y: normalizedY
            };
        }
        exports.getNormalizedEventCoords = getNormalizedEventCoords;
    }, function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports.strings = {
            CHECKMARK_SELECTOR: ".mdc-chip__checkmark",
            ENTRY_ANIMATION_NAME: "mdc-chip-entry",
            INTERACTION_EVENT: "MDCChip:interaction",
            LEADING_ICON_SELECTOR: ".mdc-chip__icon--leading",
            REMOVAL_EVENT: "MDCChip:removal",
            SELECTION_EVENT: "MDCChip:selection",
            TRAILING_ICON_INTERACTION_EVENT: "MDCChip:trailingIconInteraction",
            TRAILING_ICON_SELECTOR: ".mdc-chip__icon--trailing"
        };
        exports.cssClasses = {
            CHECKMARK: "mdc-chip__checkmark",
            CHIP_EXIT: "mdc-chip--exit",
            HIDDEN_LEADING_ICON: "mdc-chip__icon--leading-hidden",
            LEADING_ICON: "mdc-chip__icon--leading",
            SELECTED: "mdc-chip--selected",
            TRAILING_ICON: "mdc-chip__icon--trailing"
        };
    }, function(module, exports, __webpack_require__) {
        "use strict";
        var __extends = this && this.__extends || function() {
            var _extendStatics = function extendStatics(d, b) {
                _extendStatics = Object.setPrototypeOf || {
                    __proto__: []
                } instanceof Array && function(d, b) {
                    d.__proto__ = b;
                } || function(d, b) {
                    for (var p in b) {
                        if (b.hasOwnProperty(p)) d[p] = b[p];
                    }
                };
                return _extendStatics(d, b);
            };
            return function(d, b) {
                _extendStatics(d, b);
                function __() {
                    this.constructor = d;
                }
                d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
            };
        }();
        var __assign = this && this.__assign || function() {
            __assign = Object.assign || function(t) {
                for (var s, i = 1, n = arguments.length; i < n; i++) {
                    s = arguments[i];
                    for (var p in s) {
                        if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
                    }
                }
                return t;
            };
            return __assign.apply(this, arguments);
        };
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var foundation_1 = __webpack_require__(0);
        var constants_1 = __webpack_require__(14);
        var emptyClientRect = {
            bottom: 0,
            height: 0,
            left: 0,
            right: 0,
            top: 0,
            width: 0
        };
        var MDCChipFoundation = function(_super) {
            __extends(MDCChipFoundation, _super);
            function MDCChipFoundation(adapter) {
                var _this = _super.call(this, __assign({}, MDCChipFoundation.defaultAdapter, adapter)) || this;
                _this.shouldRemoveOnTrailingIconClick_ = true;
                return _this;
            }
            Object.defineProperty(MDCChipFoundation, "strings", {
                get: function get() {
                    return constants_1.strings;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MDCChipFoundation, "cssClasses", {
                get: function get() {
                    return constants_1.cssClasses;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MDCChipFoundation, "defaultAdapter", {
                get: function get() {
                    return {
                        addClass: function addClass() {
                            return undefined;
                        },
                        addClassToLeadingIcon: function addClassToLeadingIcon() {
                            return undefined;
                        },
                        eventTargetHasClass: function eventTargetHasClass() {
                            return false;
                        },
                        getCheckmarkBoundingClientRect: function getCheckmarkBoundingClientRect() {
                            return emptyClientRect;
                        },
                        getComputedStyleValue: function getComputedStyleValue() {
                            return "";
                        },
                        getRootBoundingClientRect: function getRootBoundingClientRect() {
                            return emptyClientRect;
                        },
                        hasClass: function hasClass() {
                            return false;
                        },
                        hasLeadingIcon: function hasLeadingIcon() {
                            return false;
                        },
                        notifyInteraction: function notifyInteraction() {
                            return undefined;
                        },
                        notifyRemoval: function notifyRemoval() {
                            return undefined;
                        },
                        notifySelection: function notifySelection() {
                            return undefined;
                        },
                        notifyTrailingIconInteraction: function notifyTrailingIconInteraction() {
                            return undefined;
                        },
                        removeClass: function removeClass() {
                            return undefined;
                        },
                        removeClassFromLeadingIcon: function removeClassFromLeadingIcon() {
                            return undefined;
                        },
                        setStyleProperty: function setStyleProperty() {
                            return undefined;
                        }
                    };
                },
                enumerable: true,
                configurable: true
            });
            MDCChipFoundation.prototype.isSelected = function() {
                return this.adapter_.hasClass(constants_1.cssClasses.SELECTED);
            };
            MDCChipFoundation.prototype.setSelected = function(selected) {
                if (selected) {
                    this.adapter_.addClass(constants_1.cssClasses.SELECTED);
                } else {
                    this.adapter_.removeClass(constants_1.cssClasses.SELECTED);
                }
                this.adapter_.notifySelection(selected);
            };
            MDCChipFoundation.prototype.getShouldRemoveOnTrailingIconClick = function() {
                return this.shouldRemoveOnTrailingIconClick_;
            };
            MDCChipFoundation.prototype.setShouldRemoveOnTrailingIconClick = function(shouldRemove) {
                this.shouldRemoveOnTrailingIconClick_ = shouldRemove;
            };
            MDCChipFoundation.prototype.getDimensions = function() {
                var _this = this;
                var getRootRect = function getRootRect() {
                    return _this.adapter_.getRootBoundingClientRect();
                };
                var getCheckmarkRect = function getCheckmarkRect() {
                    return _this.adapter_.getCheckmarkBoundingClientRect();
                };
                if (!this.adapter_.hasLeadingIcon()) {
                    var checkmarkRect = getCheckmarkRect();
                    if (checkmarkRect) {
                        var rootRect = getRootRect();
                        return {
                            bottom: rootRect.bottom,
                            height: rootRect.height,
                            left: rootRect.left,
                            right: rootRect.right,
                            top: rootRect.top,
                            width: rootRect.width + checkmarkRect.height
                        };
                    }
                }
                return getRootRect();
            };
            MDCChipFoundation.prototype.beginExit = function() {
                this.adapter_.addClass(constants_1.cssClasses.CHIP_EXIT);
            };
            MDCChipFoundation.prototype.handleInteraction = function(evt) {
                var isEnter = evt.key === "Enter" || evt.keyCode === 13;
                if (evt.type === "click" || isEnter) {
                    this.adapter_.notifyInteraction();
                }
            };
            MDCChipFoundation.prototype.handleTransitionEnd = function(evt) {
                var _this = this;
                if (this.adapter_.eventTargetHasClass(evt.target, constants_1.cssClasses.CHIP_EXIT)) {
                    if (evt.propertyName === "width") {
                        this.adapter_.notifyRemoval();
                    } else if (evt.propertyName === "opacity") {
                        var chipWidth_1 = this.adapter_.getComputedStyleValue("width");
                        requestAnimationFrame(function() {
                            _this.adapter_.setStyleProperty("width", chipWidth_1);
                            _this.adapter_.setStyleProperty("padding", "0");
                            _this.adapter_.setStyleProperty("margin", "0");
                            requestAnimationFrame(function() {
                                _this.adapter_.setStyleProperty("width", "0");
                            });
                        });
                    }
                    return;
                }
                if (evt.propertyName !== "opacity") {
                    return;
                }
                if (this.adapter_.eventTargetHasClass(evt.target, constants_1.cssClasses.LEADING_ICON) && this.adapter_.hasClass(constants_1.cssClasses.SELECTED)) {
                    this.adapter_.addClassToLeadingIcon(constants_1.cssClasses.HIDDEN_LEADING_ICON);
                } else if (this.adapter_.eventTargetHasClass(evt.target, constants_1.cssClasses.CHECKMARK) && !this.adapter_.hasClass(constants_1.cssClasses.SELECTED)) {
                    this.adapter_.removeClassFromLeadingIcon(constants_1.cssClasses.HIDDEN_LEADING_ICON);
                }
            };
            MDCChipFoundation.prototype.handleTrailingIconInteraction = function(evt) {
                var isEnter = evt.key === "Enter" || evt.keyCode === 13;
                evt.stopPropagation();
                if (evt.type === "click" || isEnter) {
                    this.adapter_.notifyTrailingIconInteraction();
                    if (this.shouldRemoveOnTrailingIconClick_) {
                        this.beginExit();
                    }
                }
            };
            return MDCChipFoundation;
        }(foundation_1.MDCFoundation);
        exports.MDCChipFoundation = MDCChipFoundation;
        exports.default = MDCChipFoundation;
    }, function(module, exports, __webpack_require__) {
        "use strict";
        var __extends = this && this.__extends || function() {
            var _extendStatics = function extendStatics(d, b) {
                _extendStatics = Object.setPrototypeOf || {
                    __proto__: []
                } instanceof Array && function(d, b) {
                    d.__proto__ = b;
                } || function(d, b) {
                    for (var p in b) {
                        if (b.hasOwnProperty(p)) d[p] = b[p];
                    }
                };
                return _extendStatics(d, b);
            };
            return function(d, b) {
                _extendStatics(d, b);
                function __() {
                    this.constructor = d;
                }
                d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
            };
        }();
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var component_1 = __webpack_require__(1);
        var ponyfill_1 = __webpack_require__(3);
        var constants_1 = __webpack_require__(17);
        var foundation_1 = __webpack_require__(7);
        var MDCList = function(_super) {
            __extends(MDCList, _super);
            function MDCList() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            Object.defineProperty(MDCList.prototype, "vertical", {
                set: function set(value) {
                    this.foundation_.setVerticalOrientation(value);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MDCList.prototype, "listElements", {
                get: function get() {
                    return [].slice.call(this.root_.querySelectorAll("." + constants_1.cssClasses.LIST_ITEM_CLASS));
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MDCList.prototype, "wrapFocus", {
                set: function set(value) {
                    this.foundation_.setWrapFocus(value);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MDCList.prototype, "singleSelection", {
                set: function set(isSingleSelectionList) {
                    this.foundation_.setSingleSelection(isSingleSelectionList);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MDCList.prototype, "selectedIndex", {
                get: function get() {
                    return this.foundation_.getSelectedIndex();
                },
                set: function set(index) {
                    this.foundation_.setSelectedIndex(index);
                },
                enumerable: true,
                configurable: true
            });
            MDCList.attachTo = function(root) {
                return new MDCList(root);
            };
            MDCList.prototype.initialSyncWithDOM = function() {
                this.handleClick_ = this.handleClickEvent_.bind(this);
                this.handleKeydown_ = this.handleKeydownEvent_.bind(this);
                this.focusInEventListener_ = this.handleFocusInEvent_.bind(this);
                this.focusOutEventListener_ = this.handleFocusOutEvent_.bind(this);
                this.listen("keydown", this.handleKeydown_);
                this.listen("click", this.handleClick_);
                this.listen("focusin", this.focusInEventListener_);
                this.listen("focusout", this.focusOutEventListener_);
                this.layout();
                this.initializeListType();
            };
            MDCList.prototype.destroy = function() {
                this.unlisten("keydown", this.handleKeydown_);
                this.unlisten("click", this.handleClick_);
                this.unlisten("focusin", this.focusInEventListener_);
                this.unlisten("focusout", this.focusOutEventListener_);
            };
            MDCList.prototype.layout = function() {
                var direction = this.root_.getAttribute(constants_1.strings.ARIA_ORIENTATION);
                this.vertical = direction !== constants_1.strings.ARIA_ORIENTATION_HORIZONTAL;
                [].slice.call(this.root_.querySelectorAll(".mdc-list-item:not([tabindex])")).forEach(function(el) {
                    el.setAttribute("tabindex", "-1");
                });
                [].slice.call(this.root_.querySelectorAll(constants_1.strings.FOCUSABLE_CHILD_ELEMENTS)).forEach(function(el) {
                    return el.setAttribute("tabindex", "-1");
                });
                this.foundation_.layout();
            };
            MDCList.prototype.initializeListType = function() {
                var _this = this;
                var checkboxListItems = this.root_.querySelectorAll(constants_1.strings.ARIA_ROLE_CHECKBOX_SELECTOR);
                var singleSelectedListItem = this.root_.querySelector("\n      ." + constants_1.cssClasses.LIST_ITEM_ACTIVATED_CLASS + ",\n      ." + constants_1.cssClasses.LIST_ITEM_SELECTED_CLASS + "\n    ");
                var radioSelectedListItem = this.root_.querySelector(constants_1.strings.ARIA_CHECKED_RADIO_SELECTOR);
                if (checkboxListItems.length) {
                    var preselectedItems = this.root_.querySelectorAll(constants_1.strings.ARIA_CHECKED_CHECKBOX_SELECTOR);
                    this.selectedIndex = [].map.call(preselectedItems, function(listItem) {
                        return _this.listElements.indexOf(listItem);
                    });
                } else if (singleSelectedListItem) {
                    if (singleSelectedListItem.classList.contains(constants_1.cssClasses.LIST_ITEM_ACTIVATED_CLASS)) {
                        this.foundation_.setUseActivatedClass(true);
                    }
                    this.singleSelection = true;
                    this.selectedIndex = this.listElements.indexOf(singleSelectedListItem);
                } else if (radioSelectedListItem) {
                    this.selectedIndex = this.listElements.indexOf(radioSelectedListItem);
                }
            };
            MDCList.prototype.getDefaultFoundation = function() {
                var _this = this;
                var adapter = {
                    addClassForElementIndex: function addClassForElementIndex(index, className) {
                        var element = _this.listElements[index];
                        if (element) {
                            element.classList.add(className);
                        }
                    },
                    focusItemAtIndex: function focusItemAtIndex(index) {
                        var element = _this.listElements[index];
                        if (element) {
                            element.focus();
                        }
                    },
                    getAttributeForElementIndex: function getAttributeForElementIndex(index, attr) {
                        return _this.listElements[index].getAttribute(attr);
                    },
                    getFocusedElementIndex: function getFocusedElementIndex() {
                        return _this.listElements.indexOf(document.activeElement);
                    },
                    getListItemCount: function getListItemCount() {
                        return _this.listElements.length;
                    },
                    hasCheckboxAtIndex: function hasCheckboxAtIndex(index) {
                        var listItem = _this.listElements[index];
                        return !!listItem.querySelector(constants_1.strings.CHECKBOX_SELECTOR);
                    },
                    hasRadioAtIndex: function hasRadioAtIndex(index) {
                        var listItem = _this.listElements[index];
                        return !!listItem.querySelector(constants_1.strings.RADIO_SELECTOR);
                    },
                    isCheckboxCheckedAtIndex: function isCheckboxCheckedAtIndex(index) {
                        var listItem = _this.listElements[index];
                        var toggleEl = listItem.querySelector(constants_1.strings.CHECKBOX_SELECTOR);
                        return toggleEl.checked;
                    },
                    isFocusInsideList: function isFocusInsideList() {
                        return _this.root_.contains(document.activeElement);
                    },
                    isRootFocused: function isRootFocused() {
                        return document.activeElement === _this.root_;
                    },
                    notifyAction: function notifyAction(index) {
                        _this.emit(constants_1.strings.ACTION_EVENT, {
                            index: index
                        }, true);
                    },
                    removeClassForElementIndex: function removeClassForElementIndex(index, className) {
                        var element = _this.listElements[index];
                        if (element) {
                            element.classList.remove(className);
                        }
                    },
                    setAttributeForElementIndex: function setAttributeForElementIndex(index, attr, value) {
                        var element = _this.listElements[index];
                        if (element) {
                            element.setAttribute(attr, value);
                        }
                    },
                    setCheckedCheckboxOrRadioAtIndex: function setCheckedCheckboxOrRadioAtIndex(index, isChecked) {
                        var listItem = _this.listElements[index];
                        var toggleEl = listItem.querySelector(constants_1.strings.CHECKBOX_RADIO_SELECTOR);
                        toggleEl.checked = isChecked;
                        var event = document.createEvent("Event");
                        event.initEvent("change", true, true);
                        toggleEl.dispatchEvent(event);
                    },
                    setTabIndexForListItemChildren: function setTabIndexForListItemChildren(listItemIndex, tabIndexValue) {
                        var element = _this.listElements[listItemIndex];
                        var listItemChildren = [].slice.call(element.querySelectorAll(constants_1.strings.CHILD_ELEMENTS_TO_TOGGLE_TABINDEX));
                        listItemChildren.forEach(function(el) {
                            return el.setAttribute("tabindex", tabIndexValue);
                        });
                    }
                };
                return new foundation_1.MDCListFoundation(adapter);
            };
            MDCList.prototype.getListItemIndex_ = function(evt) {
                var eventTarget = evt.target;
                var nearestParent = ponyfill_1.closest(eventTarget, "." + constants_1.cssClasses.LIST_ITEM_CLASS + ", ." + constants_1.cssClasses.ROOT);
                if (nearestParent && ponyfill_1.matches(nearestParent, "." + constants_1.cssClasses.LIST_ITEM_CLASS)) {
                    return this.listElements.indexOf(nearestParent);
                }
                return -1;
            };
            MDCList.prototype.handleFocusInEvent_ = function(evt) {
                var index = this.getListItemIndex_(evt);
                this.foundation_.handleFocusIn(evt, index);
            };
            MDCList.prototype.handleFocusOutEvent_ = function(evt) {
                var index = this.getListItemIndex_(evt);
                this.foundation_.handleFocusOut(evt, index);
            };
            MDCList.prototype.handleKeydownEvent_ = function(evt) {
                var index = this.getListItemIndex_(evt);
                var target = evt.target;
                this.foundation_.handleKeydown(evt, target.classList.contains(constants_1.cssClasses.LIST_ITEM_CLASS), index);
            };
            MDCList.prototype.handleClickEvent_ = function(evt) {
                var index = this.getListItemIndex_(evt);
                var target = evt.target;
                var toggleCheckbox = !ponyfill_1.matches(target, constants_1.strings.CHECKBOX_RADIO_SELECTOR);
                this.foundation_.handleClick(index, toggleCheckbox);
            };
            return MDCList;
        }(component_1.MDCComponent);
        exports.MDCList = MDCList;
    }, function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var cssClasses = {
            LIST_ITEM_ACTIVATED_CLASS: "mdc-list-item--activated",
            LIST_ITEM_CLASS: "mdc-list-item",
            LIST_ITEM_DISABLED_CLASS: "mdc-list-item--disabled",
            LIST_ITEM_SELECTED_CLASS: "mdc-list-item--selected",
            ROOT: "mdc-list"
        };
        exports.cssClasses = cssClasses;
        var strings = {
            ACTION_EVENT: "MDCList:action",
            ARIA_CHECKED: "aria-checked",
            ARIA_CHECKED_CHECKBOX_SELECTOR: '[role="checkbox"][aria-checked="true"]',
            ARIA_CHECKED_RADIO_SELECTOR: '[role="radio"][aria-checked="true"]',
            ARIA_CURRENT: "aria-current",
            ARIA_ORIENTATION: "aria-orientation",
            ARIA_ORIENTATION_HORIZONTAL: "horizontal",
            ARIA_ROLE_CHECKBOX_SELECTOR: '[role="checkbox"]',
            ARIA_SELECTED: "aria-selected",
            CHECKBOX_RADIO_SELECTOR: 'input[type="checkbox"]:not(:disabled), input[type="radio"]:not(:disabled)',
            CHECKBOX_SELECTOR: 'input[type="checkbox"]:not(:disabled)',
            CHILD_ELEMENTS_TO_TOGGLE_TABINDEX: "\n    ." + cssClasses.LIST_ITEM_CLASS + " button:not(:disabled),\n    ." + cssClasses.LIST_ITEM_CLASS + " a\n  ",
            FOCUSABLE_CHILD_ELEMENTS: "\n    ." + cssClasses.LIST_ITEM_CLASS + " button:not(:disabled),\n    ." + cssClasses.LIST_ITEM_CLASS + " a,\n    ." + cssClasses.LIST_ITEM_CLASS + ' input[type="radio"]:not(:disabled),\n    .' + cssClasses.LIST_ITEM_CLASS + ' input[type="checkbox"]:not(:disabled)\n  ',
            RADIO_SELECTOR: 'input[type="radio"]:not(:disabled)'
        };
        exports.strings = strings;
        var numbers = {
            UNSET_INDEX: -1
        };
        exports.numbers = numbers;
    }, function(module, exports, __webpack_require__) {
        "use strict";
        var __extends = this && this.__extends || function() {
            var _extendStatics = function extendStatics(d, b) {
                _extendStatics = Object.setPrototypeOf || {
                    __proto__: []
                } instanceof Array && function(d, b) {
                    d.__proto__ = b;
                } || function(d, b) {
                    for (var p in b) {
                        if (b.hasOwnProperty(p)) d[p] = b[p];
                    }
                };
                return _extendStatics(d, b);
            };
            return function(d, b) {
                _extendStatics(d, b);
                function __() {
                    this.constructor = d;
                }
                d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
            };
        }();
        var __assign = this && this.__assign || function() {
            __assign = Object.assign || function(t) {
                for (var s, i = 1, n = arguments.length; i < n; i++) {
                    s = arguments[i];
                    for (var p in s) {
                        if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
                    }
                }
                return t;
            };
            return __assign.apply(this, arguments);
        };
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var foundation_1 = __webpack_require__(0);
        var constants_1 = __webpack_require__(45);
        var MDCDismissibleDrawerFoundation = function(_super) {
            __extends(MDCDismissibleDrawerFoundation, _super);
            function MDCDismissibleDrawerFoundation(adapter) {
                var _this = _super.call(this, __assign({}, MDCDismissibleDrawerFoundation.defaultAdapter, adapter)) || this;
                _this.animationFrame_ = 0;
                _this.animationTimer_ = 0;
                return _this;
            }
            Object.defineProperty(MDCDismissibleDrawerFoundation, "strings", {
                get: function get() {
                    return constants_1.strings;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MDCDismissibleDrawerFoundation, "cssClasses", {
                get: function get() {
                    return constants_1.cssClasses;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MDCDismissibleDrawerFoundation, "defaultAdapter", {
                get: function get() {
                    return {
                        addClass: function addClass() {
                            return undefined;
                        },
                        removeClass: function removeClass() {
                            return undefined;
                        },
                        hasClass: function hasClass() {
                            return false;
                        },
                        elementHasClass: function elementHasClass() {
                            return false;
                        },
                        notifyClose: function notifyClose() {
                            return undefined;
                        },
                        notifyOpen: function notifyOpen() {
                            return undefined;
                        },
                        saveFocus: function saveFocus() {
                            return undefined;
                        },
                        restoreFocus: function restoreFocus() {
                            return undefined;
                        },
                        focusActiveNavigationItem: function focusActiveNavigationItem() {
                            return undefined;
                        },
                        trapFocus: function trapFocus() {
                            return undefined;
                        },
                        releaseFocus: function releaseFocus() {
                            return undefined;
                        }
                    };
                },
                enumerable: true,
                configurable: true
            });
            MDCDismissibleDrawerFoundation.prototype.destroy = function() {
                if (this.animationFrame_) {
                    cancelAnimationFrame(this.animationFrame_);
                }
                if (this.animationTimer_) {
                    clearTimeout(this.animationTimer_);
                }
            };
            MDCDismissibleDrawerFoundation.prototype.open = function() {
                var _this = this;
                if (this.isOpen() || this.isOpening() || this.isClosing()) {
                    return;
                }
                this.adapter_.addClass(constants_1.cssClasses.OPEN);
                this.adapter_.addClass(constants_1.cssClasses.ANIMATE);
                this.runNextAnimationFrame_(function() {
                    _this.adapter_.addClass(constants_1.cssClasses.OPENING);
                });
                this.adapter_.saveFocus();
            };
            MDCDismissibleDrawerFoundation.prototype.close = function() {
                if (!this.isOpen() || this.isOpening() || this.isClosing()) {
                    return;
                }
                this.adapter_.addClass(constants_1.cssClasses.CLOSING);
            };
            MDCDismissibleDrawerFoundation.prototype.isOpen = function() {
                return this.adapter_.hasClass(constants_1.cssClasses.OPEN);
            };
            MDCDismissibleDrawerFoundation.prototype.isOpening = function() {
                return this.adapter_.hasClass(constants_1.cssClasses.OPENING) || this.adapter_.hasClass(constants_1.cssClasses.ANIMATE);
            };
            MDCDismissibleDrawerFoundation.prototype.isClosing = function() {
                return this.adapter_.hasClass(constants_1.cssClasses.CLOSING);
            };
            MDCDismissibleDrawerFoundation.prototype.handleKeydown = function(evt) {
                var keyCode = evt.keyCode, key = evt.key;
                var isEscape = key === "Escape" || keyCode === 27;
                if (isEscape) {
                    this.close();
                }
            };
            MDCDismissibleDrawerFoundation.prototype.handleTransitionEnd = function(evt) {
                var OPENING = constants_1.cssClasses.OPENING, CLOSING = constants_1.cssClasses.CLOSING, OPEN = constants_1.cssClasses.OPEN, ANIMATE = constants_1.cssClasses.ANIMATE, ROOT = constants_1.cssClasses.ROOT;
                var isRootElement = this.isElement_(evt.target) && this.adapter_.elementHasClass(evt.target, ROOT);
                if (!isRootElement) {
                    return;
                }
                if (this.isClosing()) {
                    this.adapter_.removeClass(OPEN);
                    this.closed_();
                    this.adapter_.restoreFocus();
                    this.adapter_.notifyClose();
                } else {
                    this.adapter_.focusActiveNavigationItem();
                    this.opened_();
                    this.adapter_.notifyOpen();
                }
                this.adapter_.removeClass(ANIMATE);
                this.adapter_.removeClass(OPENING);
                this.adapter_.removeClass(CLOSING);
            };
            MDCDismissibleDrawerFoundation.prototype.opened_ = function() {};
            MDCDismissibleDrawerFoundation.prototype.closed_ = function() {};
            MDCDismissibleDrawerFoundation.prototype.runNextAnimationFrame_ = function(callback) {
                var _this = this;
                cancelAnimationFrame(this.animationFrame_);
                this.animationFrame_ = requestAnimationFrame(function() {
                    _this.animationFrame_ = 0;
                    clearTimeout(_this.animationTimer_);
                    _this.animationTimer_ = setTimeout(callback, 0);
                });
            };
            MDCDismissibleDrawerFoundation.prototype.isElement_ = function(element) {
                return Boolean(element.classList);
            };
            return MDCDismissibleDrawerFoundation;
        }(foundation_1.MDCFoundation);
        exports.MDCDismissibleDrawerFoundation = MDCDismissibleDrawerFoundation;
        exports.default = MDCDismissibleDrawerFoundation;
    }, function(module, exports, __webpack_require__) {
        "use strict";
        var __extends = this && this.__extends || function() {
            var _extendStatics = function extendStatics(d, b) {
                _extendStatics = Object.setPrototypeOf || {
                    __proto__: []
                } instanceof Array && function(d, b) {
                    d.__proto__ = b;
                } || function(d, b) {
                    for (var p in b) {
                        if (b.hasOwnProperty(p)) d[p] = b[p];
                    }
                };
                return _extendStatics(d, b);
            };
            return function(d, b) {
                _extendStatics(d, b);
                function __() {
                    this.constructor = d;
                }
                d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
            };
        }();
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var component_1 = __webpack_require__(1);
        var foundation_1 = __webpack_require__(20);
        var MDCFloatingLabel = function(_super) {
            __extends(MDCFloatingLabel, _super);
            function MDCFloatingLabel() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            MDCFloatingLabel.attachTo = function(root) {
                return new MDCFloatingLabel(root);
            };
            MDCFloatingLabel.prototype.shake = function(shouldShake) {
                this.foundation_.shake(shouldShake);
            };
            MDCFloatingLabel.prototype.float = function(shouldFloat) {
                this.foundation_.float(shouldFloat);
            };
            MDCFloatingLabel.prototype.getWidth = function() {
                return this.foundation_.getWidth();
            };
            MDCFloatingLabel.prototype.getDefaultFoundation = function() {
                var _this = this;
                var adapter = {
                    addClass: function addClass(className) {
                        return _this.root_.classList.add(className);
                    },
                    removeClass: function removeClass(className) {
                        return _this.root_.classList.remove(className);
                    },
                    getWidth: function getWidth() {
                        return _this.root_.scrollWidth;
                    },
                    registerInteractionHandler: function registerInteractionHandler(evtType, handler) {
                        return _this.listen(evtType, handler);
                    },
                    deregisterInteractionHandler: function deregisterInteractionHandler(evtType, handler) {
                        return _this.unlisten(evtType, handler);
                    }
                };
                return new foundation_1.MDCFloatingLabelFoundation(adapter);
            };
            return MDCFloatingLabel;
        }(component_1.MDCComponent);
        exports.MDCFloatingLabel = MDCFloatingLabel;
    }, function(module, exports, __webpack_require__) {
        "use strict";
        var __extends = this && this.__extends || function() {
            var _extendStatics = function extendStatics(d, b) {
                _extendStatics = Object.setPrototypeOf || {
                    __proto__: []
                } instanceof Array && function(d, b) {
                    d.__proto__ = b;
                } || function(d, b) {
                    for (var p in b) {
                        if (b.hasOwnProperty(p)) d[p] = b[p];
                    }
                };
                return _extendStatics(d, b);
            };
            return function(d, b) {
                _extendStatics(d, b);
                function __() {
                    this.constructor = d;
                }
                d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
            };
        }();
        var __assign = this && this.__assign || function() {
            __assign = Object.assign || function(t) {
                for (var s, i = 1, n = arguments.length; i < n; i++) {
                    s = arguments[i];
                    for (var p in s) {
                        if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
                    }
                }
                return t;
            };
            return __assign.apply(this, arguments);
        };
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var foundation_1 = __webpack_require__(0);
        var constants_1 = __webpack_require__(47);
        var MDCFloatingLabelFoundation = function(_super) {
            __extends(MDCFloatingLabelFoundation, _super);
            function MDCFloatingLabelFoundation(adapter) {
                var _this = _super.call(this, __assign({}, MDCFloatingLabelFoundation.defaultAdapter, adapter)) || this;
                _this.shakeAnimationEndHandler_ = function() {
                    return _this.handleShakeAnimationEnd_();
                };
                return _this;
            }
            Object.defineProperty(MDCFloatingLabelFoundation, "cssClasses", {
                get: function get() {
                    return constants_1.cssClasses;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MDCFloatingLabelFoundation, "defaultAdapter", {
                get: function get() {
                    return {
                        addClass: function addClass() {
                            return undefined;
                        },
                        removeClass: function removeClass() {
                            return undefined;
                        },
                        getWidth: function getWidth() {
                            return 0;
                        },
                        registerInteractionHandler: function registerInteractionHandler() {
                            return undefined;
                        },
                        deregisterInteractionHandler: function deregisterInteractionHandler() {
                            return undefined;
                        }
                    };
                },
                enumerable: true,
                configurable: true
            });
            MDCFloatingLabelFoundation.prototype.init = function() {
                this.adapter_.registerInteractionHandler("animationend", this.shakeAnimationEndHandler_);
            };
            MDCFloatingLabelFoundation.prototype.destroy = function() {
                this.adapter_.deregisterInteractionHandler("animationend", this.shakeAnimationEndHandler_);
            };
            MDCFloatingLabelFoundation.prototype.getWidth = function() {
                return this.adapter_.getWidth();
            };
            MDCFloatingLabelFoundation.prototype.shake = function(shouldShake) {
                var LABEL_SHAKE = MDCFloatingLabelFoundation.cssClasses.LABEL_SHAKE;
                if (shouldShake) {
                    this.adapter_.addClass(LABEL_SHAKE);
                } else {
                    this.adapter_.removeClass(LABEL_SHAKE);
                }
            };
            MDCFloatingLabelFoundation.prototype.float = function(shouldFloat) {
                var _a = MDCFloatingLabelFoundation.cssClasses, LABEL_FLOAT_ABOVE = _a.LABEL_FLOAT_ABOVE, LABEL_SHAKE = _a.LABEL_SHAKE;
                if (shouldFloat) {
                    this.adapter_.addClass(LABEL_FLOAT_ABOVE);
                } else {
                    this.adapter_.removeClass(LABEL_FLOAT_ABOVE);
                    this.adapter_.removeClass(LABEL_SHAKE);
                }
            };
            MDCFloatingLabelFoundation.prototype.handleShakeAnimationEnd_ = function() {
                var LABEL_SHAKE = MDCFloatingLabelFoundation.cssClasses.LABEL_SHAKE;
                this.adapter_.removeClass(LABEL_SHAKE);
            };
            return MDCFloatingLabelFoundation;
        }(foundation_1.MDCFoundation);
        exports.MDCFloatingLabelFoundation = MDCFloatingLabelFoundation;
        exports.default = MDCFloatingLabelFoundation;
    }, function(module, exports, __webpack_require__) {
        "use strict";
        var __extends = this && this.__extends || function() {
            var _extendStatics = function extendStatics(d, b) {
                _extendStatics = Object.setPrototypeOf || {
                    __proto__: []
                } instanceof Array && function(d, b) {
                    d.__proto__ = b;
                } || function(d, b) {
                    for (var p in b) {
                        if (b.hasOwnProperty(p)) d[p] = b[p];
                    }
                };
                return _extendStatics(d, b);
            };
            return function(d, b) {
                _extendStatics(d, b);
                function __() {
                    this.constructor = d;
                }
                d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
            };
        }();
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var component_1 = __webpack_require__(1);
        var foundation_1 = __webpack_require__(54);
        var MDCLineRipple = function(_super) {
            __extends(MDCLineRipple, _super);
            function MDCLineRipple() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            MDCLineRipple.attachTo = function(root) {
                return new MDCLineRipple(root);
            };
            MDCLineRipple.prototype.activate = function() {
                this.foundation_.activate();
            };
            MDCLineRipple.prototype.deactivate = function() {
                this.foundation_.deactivate();
            };
            MDCLineRipple.prototype.setRippleCenter = function(xCoordinate) {
                this.foundation_.setRippleCenter(xCoordinate);
            };
            MDCLineRipple.prototype.getDefaultFoundation = function() {
                var _this = this;
                var adapter = {
                    addClass: function addClass(className) {
                        return _this.root_.classList.add(className);
                    },
                    removeClass: function removeClass(className) {
                        return _this.root_.classList.remove(className);
                    },
                    hasClass: function hasClass(className) {
                        return _this.root_.classList.contains(className);
                    },
                    setStyle: function setStyle(propertyName, value) {
                        return _this.root_.style.setProperty(propertyName, value);
                    },
                    registerEventHandler: function registerEventHandler(evtType, handler) {
                        return _this.listen(evtType, handler);
                    },
                    deregisterEventHandler: function deregisterEventHandler(evtType, handler) {
                        return _this.unlisten(evtType, handler);
                    }
                };
                return new foundation_1.MDCLineRippleFoundation(adapter);
            };
            return MDCLineRipple;
        }(component_1.MDCComponent);
        exports.MDCLineRipple = MDCLineRipple;
    }, function(module, exports, __webpack_require__) {
        "use strict";
        var __extends = this && this.__extends || function() {
            var _extendStatics = function extendStatics(d, b) {
                _extendStatics = Object.setPrototypeOf || {
                    __proto__: []
                } instanceof Array && function(d, b) {
                    d.__proto__ = b;
                } || function(d, b) {
                    for (var p in b) {
                        if (b.hasOwnProperty(p)) d[p] = b[p];
                    }
                };
                return _extendStatics(d, b);
            };
            return function(d, b) {
                _extendStatics(d, b);
                function __() {
                    this.constructor = d;
                }
                d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
            };
        }();
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var component_1 = __webpack_require__(1);
        var foundation_1 = __webpack_require__(20);
        var constants_1 = __webpack_require__(23);
        var foundation_2 = __webpack_require__(62);
        var MDCNotchedOutline = function(_super) {
            __extends(MDCNotchedOutline, _super);
            function MDCNotchedOutline() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            MDCNotchedOutline.attachTo = function(root) {
                return new MDCNotchedOutline(root);
            };
            MDCNotchedOutline.prototype.initialSyncWithDOM = function() {
                this.notchElement_ = this.root_.querySelector(constants_1.strings.NOTCH_ELEMENT_SELECTOR);
                var label = this.root_.querySelector("." + foundation_1.MDCFloatingLabelFoundation.cssClasses.ROOT);
                if (label) {
                    label.style.transitionDuration = "0s";
                    this.root_.classList.add(constants_1.cssClasses.OUTLINE_UPGRADED);
                    requestAnimationFrame(function() {
                        label.style.transitionDuration = "";
                    });
                } else {
                    this.root_.classList.add(constants_1.cssClasses.NO_LABEL);
                }
            };
            MDCNotchedOutline.prototype.notch = function(notchWidth) {
                this.foundation_.notch(notchWidth);
            };
            MDCNotchedOutline.prototype.closeNotch = function() {
                this.foundation_.closeNotch();
            };
            MDCNotchedOutline.prototype.getDefaultFoundation = function() {
                var _this = this;
                var adapter = {
                    addClass: function addClass(className) {
                        return _this.root_.classList.add(className);
                    },
                    removeClass: function removeClass(className) {
                        return _this.root_.classList.remove(className);
                    },
                    setNotchWidthProperty: function setNotchWidthProperty(width) {
                        return _this.notchElement_.style.setProperty("width", width + "px");
                    },
                    removeNotchWidthProperty: function removeNotchWidthProperty() {
                        return _this.notchElement_.style.removeProperty("width");
                    }
                };
                return new foundation_2.MDCNotchedOutlineFoundation(adapter);
            };
            return MDCNotchedOutline;
        }(component_1.MDCComponent);
        exports.MDCNotchedOutline = MDCNotchedOutline;
    }, function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var strings = {
            NOTCH_ELEMENT_SELECTOR: ".mdc-notched-outline__notch"
        };
        exports.strings = strings;
        var numbers = {
            NOTCH_ELEMENT_PADDING: 8
        };
        exports.numbers = numbers;
        var cssClasses = {
            NO_LABEL: "mdc-notched-outline--no-label",
            OUTLINE_NOTCHED: "mdc-notched-outline--notched",
            OUTLINE_UPGRADED: "mdc-notched-outline--upgraded"
        };
        exports.cssClasses = cssClasses;
    }, function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var cssClasses = {
            ACTIVATED: "mdc-select--activated",
            DISABLED: "mdc-select--disabled",
            FOCUSED: "mdc-select--focused",
            INVALID: "mdc-select--invalid",
            OUTLINED: "mdc-select--outlined",
            REQUIRED: "mdc-select--required",
            ROOT: "mdc-select",
            SELECTED_ITEM_CLASS: "mdc-list-item--selected",
            WITH_LEADING_ICON: "mdc-select--with-leading-icon"
        };
        exports.cssClasses = cssClasses;
        var strings = {
            ARIA_CONTROLS: "aria-controls",
            ARIA_SELECTED_ATTR: "aria-selected",
            CHANGE_EVENT: "MDCSelect:change",
            ENHANCED_VALUE_ATTR: "data-value",
            HIDDEN_INPUT_SELECTOR: 'input[type="hidden"]',
            LABEL_SELECTOR: ".mdc-floating-label",
            LEADING_ICON_SELECTOR: ".mdc-select__icon",
            LINE_RIPPLE_SELECTOR: ".mdc-line-ripple",
            MENU_SELECTOR: ".mdc-select__menu",
            NATIVE_CONTROL_SELECTOR: ".mdc-select__native-control",
            OUTLINE_SELECTOR: ".mdc-notched-outline",
            SELECTED_ITEM_SELECTOR: "." + cssClasses.SELECTED_ITEM_CLASS,
            SELECTED_TEXT_SELECTOR: ".mdc-select__selected-text"
        };
        exports.strings = strings;
        var numbers = {
            LABEL_SCALE: .75
        };
        exports.numbers = numbers;
    }, function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var cssClasses = {
            ACTIVE: "mdc-slider--active",
            DISABLED: "mdc-slider--disabled",
            DISCRETE: "mdc-slider--discrete",
            FOCUS: "mdc-slider--focus",
            HAS_TRACK_MARKER: "mdc-slider--display-markers",
            IN_TRANSIT: "mdc-slider--in-transit",
            IS_DISCRETE: "mdc-slider--discrete"
        };
        exports.cssClasses = cssClasses;
        var strings = {
            ARIA_DISABLED: "aria-disabled",
            ARIA_VALUEMAX: "aria-valuemax",
            ARIA_VALUEMIN: "aria-valuemin",
            ARIA_VALUENOW: "aria-valuenow",
            CHANGE_EVENT: "MDCSlider:change",
            INPUT_EVENT: "MDCSlider:input",
            LAST_TRACK_MARKER_SELECTOR: ".mdc-slider__track-marker:last-child",
            PIN_VALUE_MARKER_SELECTOR: ".mdc-slider__pin-value-marker",
            STEP_DATA_ATTR: "data-step",
            THUMB_CONTAINER_SELECTOR: ".mdc-slider__thumb-container",
            TRACK_MARKER_CONTAINER_SELECTOR: ".mdc-slider__track-marker-container",
            TRACK_SELECTOR: ".mdc-slider__track"
        };
        exports.strings = strings;
        var numbers = {
            PAGE_FACTOR: 4
        };
        exports.numbers = numbers;
    }, function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var cssClasses = {
            ANIMATING: "mdc-tab-scroller--animating",
            SCROLL_AREA_SCROLL: "mdc-tab-scroller__scroll-area--scroll",
            SCROLL_TEST: "mdc-tab-scroller__test"
        };
        exports.cssClasses = cssClasses;
        var strings = {
            AREA_SELECTOR: ".mdc-tab-scroller__scroll-area",
            CONTENT_SELECTOR: ".mdc-tab-scroller__scroll-content"
        };
        exports.strings = strings;
    }, function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var MDCTabScrollerRTL = function() {
            function MDCTabScrollerRTL(adapter) {
                this.adapter_ = adapter;
            }
            return MDCTabScrollerRTL;
        }();
        exports.MDCTabScrollerRTL = MDCTabScrollerRTL;
        exports.default = MDCTabScrollerRTL;
    }, function(module, exports, __webpack_require__) {
        "use strict";
        var __extends = this && this.__extends || function() {
            var _extendStatics = function extendStatics(d, b) {
                _extendStatics = Object.setPrototypeOf || {
                    __proto__: []
                } instanceof Array && function(d, b) {
                    d.__proto__ = b;
                } || function(d, b) {
                    for (var p in b) {
                        if (b.hasOwnProperty(p)) d[p] = b[p];
                    }
                };
                return _extendStatics(d, b);
            };
            return function(d, b) {
                _extendStatics(d, b);
                function __() {
                    this.constructor = d;
                }
                d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
            };
        }();
        var __assign = this && this.__assign || function() {
            __assign = Object.assign || function(t) {
                for (var s, i = 1, n = arguments.length; i < n; i++) {
                    s = arguments[i];
                    for (var p in s) {
                        if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
                    }
                }
                return t;
            };
            return __assign.apply(this, arguments);
        };
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var foundation_1 = __webpack_require__(0);
        var constants_1 = __webpack_require__(85);
        var MDCTabFoundation = function(_super) {
            __extends(MDCTabFoundation, _super);
            function MDCTabFoundation(adapter) {
                var _this = _super.call(this, __assign({}, MDCTabFoundation.defaultAdapter, adapter)) || this;
                _this.focusOnActivate_ = true;
                return _this;
            }
            Object.defineProperty(MDCTabFoundation, "cssClasses", {
                get: function get() {
                    return constants_1.cssClasses;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MDCTabFoundation, "strings", {
                get: function get() {
                    return constants_1.strings;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MDCTabFoundation, "defaultAdapter", {
                get: function get() {
                    return {
                        addClass: function addClass() {
                            return undefined;
                        },
                        removeClass: function removeClass() {
                            return undefined;
                        },
                        hasClass: function hasClass() {
                            return false;
                        },
                        setAttr: function setAttr() {
                            return undefined;
                        },
                        activateIndicator: function activateIndicator() {
                            return undefined;
                        },
                        deactivateIndicator: function deactivateIndicator() {
                            return undefined;
                        },
                        notifyInteracted: function notifyInteracted() {
                            return undefined;
                        },
                        getOffsetLeft: function getOffsetLeft() {
                            return 0;
                        },
                        getOffsetWidth: function getOffsetWidth() {
                            return 0;
                        },
                        getContentOffsetLeft: function getContentOffsetLeft() {
                            return 0;
                        },
                        getContentOffsetWidth: function getContentOffsetWidth() {
                            return 0;
                        },
                        focus: function focus() {
                            return undefined;
                        }
                    };
                },
                enumerable: true,
                configurable: true
            });
            MDCTabFoundation.prototype.handleClick = function() {
                this.adapter_.notifyInteracted();
            };
            MDCTabFoundation.prototype.isActive = function() {
                return this.adapter_.hasClass(constants_1.cssClasses.ACTIVE);
            };
            MDCTabFoundation.prototype.setFocusOnActivate = function(focusOnActivate) {
                this.focusOnActivate_ = focusOnActivate;
            };
            MDCTabFoundation.prototype.activate = function(previousIndicatorClientRect) {
                this.adapter_.addClass(constants_1.cssClasses.ACTIVE);
                this.adapter_.setAttr(constants_1.strings.ARIA_SELECTED, "true");
                this.adapter_.setAttr(constants_1.strings.TABINDEX, "0");
                this.adapter_.activateIndicator(previousIndicatorClientRect);
                if (this.focusOnActivate_) {
                    this.adapter_.focus();
                }
            };
            MDCTabFoundation.prototype.deactivate = function() {
                if (!this.isActive()) {
                    return;
                }
                this.adapter_.removeClass(constants_1.cssClasses.ACTIVE);
                this.adapter_.setAttr(constants_1.strings.ARIA_SELECTED, "false");
                this.adapter_.setAttr(constants_1.strings.TABINDEX, "-1");
                this.adapter_.deactivateIndicator();
            };
            MDCTabFoundation.prototype.computeDimensions = function() {
                var rootWidth = this.adapter_.getOffsetWidth();
                var rootLeft = this.adapter_.getOffsetLeft();
                var contentWidth = this.adapter_.getContentOffsetWidth();
                var contentLeft = this.adapter_.getContentOffsetLeft();
                return {
                    contentLeft: rootLeft + contentLeft,
                    contentRight: rootLeft + contentLeft + contentWidth,
                    rootLeft: rootLeft,
                    rootRight: rootLeft + rootWidth
                };
            };
            return MDCTabFoundation;
        }(foundation_1.MDCFoundation);
        exports.MDCTabFoundation = MDCTabFoundation;
        exports.default = MDCTabFoundation;
    }, function(module, exports, __webpack_require__) {
        "use strict";
        var __extends = this && this.__extends || function() {
            var _extendStatics = function extendStatics(d, b) {
                _extendStatics = Object.setPrototypeOf || {
                    __proto__: []
                } instanceof Array && function(d, b) {
                    d.__proto__ = b;
                } || function(d, b) {
                    for (var p in b) {
                        if (b.hasOwnProperty(p)) d[p] = b[p];
                    }
                };
                return _extendStatics(d, b);
            };
            return function(d, b) {
                _extendStatics(d, b);
                function __() {
                    this.constructor = d;
                }
                d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
            };
        }();
        var __assign = this && this.__assign || function() {
            __assign = Object.assign || function(t) {
                for (var s, i = 1, n = arguments.length; i < n; i++) {
                    s = arguments[i];
                    for (var p in s) {
                        if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
                    }
                }
                return t;
            };
            return __assign.apply(this, arguments);
        };
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var foundation_1 = __webpack_require__(0);
        var constants_1 = __webpack_require__(89);
        var MDCTextFieldCharacterCounterFoundation = function(_super) {
            __extends(MDCTextFieldCharacterCounterFoundation, _super);
            function MDCTextFieldCharacterCounterFoundation(adapter) {
                return _super.call(this, __assign({}, MDCTextFieldCharacterCounterFoundation.defaultAdapter, adapter)) || this;
            }
            Object.defineProperty(MDCTextFieldCharacterCounterFoundation, "cssClasses", {
                get: function get() {
                    return constants_1.cssClasses;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MDCTextFieldCharacterCounterFoundation, "strings", {
                get: function get() {
                    return constants_1.strings;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MDCTextFieldCharacterCounterFoundation, "defaultAdapter", {
                get: function get() {
                    return {
                        setContent: function setContent() {
                            return undefined;
                        }
                    };
                },
                enumerable: true,
                configurable: true
            });
            MDCTextFieldCharacterCounterFoundation.prototype.setCounterValue = function(currentLength, maxLength) {
                currentLength = Math.min(currentLength, maxLength);
                this.adapter_.setContent(currentLength + " / " + maxLength);
            };
            return MDCTextFieldCharacterCounterFoundation;
        }(foundation_1.MDCFoundation);
        exports.MDCTextFieldCharacterCounterFoundation = MDCTextFieldCharacterCounterFoundation;
        exports.default = MDCTextFieldCharacterCounterFoundation;
    }, function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var strings = {
            ARIA_CONTROLS: "aria-controls",
            ICON_SELECTOR: ".mdc-text-field__icon",
            INPUT_SELECTOR: ".mdc-text-field__input",
            LABEL_SELECTOR: ".mdc-floating-label",
            LINE_RIPPLE_SELECTOR: ".mdc-line-ripple",
            OUTLINE_SELECTOR: ".mdc-notched-outline"
        };
        exports.strings = strings;
        var cssClasses = {
            DENSE: "mdc-text-field--dense",
            DISABLED: "mdc-text-field--disabled",
            FOCUSED: "mdc-text-field--focused",
            FULLWIDTH: "mdc-text-field--fullwidth",
            HELPER_LINE: "mdc-text-field-helper-line",
            INVALID: "mdc-text-field--invalid",
            NO_LABEL: "mdc-text-field--no-label",
            OUTLINED: "mdc-text-field--outlined",
            ROOT: "mdc-text-field",
            TEXTAREA: "mdc-text-field--textarea",
            WITH_LEADING_ICON: "mdc-text-field--with-leading-icon",
            WITH_TRAILING_ICON: "mdc-text-field--with-trailing-icon"
        };
        exports.cssClasses = cssClasses;
        var numbers = {
            DENSE_LABEL_SCALE: .923,
            LABEL_SCALE: .75
        };
        exports.numbers = numbers;
        var VALIDATION_ATTR_WHITELIST = [ "pattern", "min", "max", "required", "step", "minlength", "maxlength" ];
        exports.VALIDATION_ATTR_WHITELIST = VALIDATION_ATTR_WHITELIST;
        var ALWAYS_FLOAT_TYPES = [ "color", "date", "datetime-local", "month", "range", "time", "week" ];
        exports.ALWAYS_FLOAT_TYPES = ALWAYS_FLOAT_TYPES;
    }, function(module, exports, __webpack_require__) {
        "use strict";
        var __extends = this && this.__extends || function() {
            var _extendStatics = function extendStatics(d, b) {
                _extendStatics = Object.setPrototypeOf || {
                    __proto__: []
                } instanceof Array && function(d, b) {
                    d.__proto__ = b;
                } || function(d, b) {
                    for (var p in b) {
                        if (b.hasOwnProperty(p)) d[p] = b[p];
                    }
                };
                return _extendStatics(d, b);
            };
            return function(d, b) {
                _extendStatics(d, b);
                function __() {
                    this.constructor = d;
                }
                d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
            };
        }();
        var __assign = this && this.__assign || function() {
            __assign = Object.assign || function(t) {
                for (var s, i = 1, n = arguments.length; i < n; i++) {
                    s = arguments[i];
                    for (var p in s) {
                        if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
                    }
                }
                return t;
            };
            return __assign.apply(this, arguments);
        };
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var foundation_1 = __webpack_require__(0);
        var constants_1 = __webpack_require__(92);
        var MDCTextFieldHelperTextFoundation = function(_super) {
            __extends(MDCTextFieldHelperTextFoundation, _super);
            function MDCTextFieldHelperTextFoundation(adapter) {
                return _super.call(this, __assign({}, MDCTextFieldHelperTextFoundation.defaultAdapter, adapter)) || this;
            }
            Object.defineProperty(MDCTextFieldHelperTextFoundation, "cssClasses", {
                get: function get() {
                    return constants_1.cssClasses;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MDCTextFieldHelperTextFoundation, "strings", {
                get: function get() {
                    return constants_1.strings;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MDCTextFieldHelperTextFoundation, "defaultAdapter", {
                get: function get() {
                    return {
                        addClass: function addClass() {
                            return undefined;
                        },
                        removeClass: function removeClass() {
                            return undefined;
                        },
                        hasClass: function hasClass() {
                            return false;
                        },
                        setAttr: function setAttr() {
                            return undefined;
                        },
                        removeAttr: function removeAttr() {
                            return undefined;
                        },
                        setContent: function setContent() {
                            return undefined;
                        }
                    };
                },
                enumerable: true,
                configurable: true
            });
            MDCTextFieldHelperTextFoundation.prototype.setContent = function(content) {
                this.adapter_.setContent(content);
            };
            MDCTextFieldHelperTextFoundation.prototype.setPersistent = function(isPersistent) {
                if (isPersistent) {
                    this.adapter_.addClass(constants_1.cssClasses.HELPER_TEXT_PERSISTENT);
                } else {
                    this.adapter_.removeClass(constants_1.cssClasses.HELPER_TEXT_PERSISTENT);
                }
            };
            MDCTextFieldHelperTextFoundation.prototype.setValidation = function(isValidation) {
                if (isValidation) {
                    this.adapter_.addClass(constants_1.cssClasses.HELPER_TEXT_VALIDATION_MSG);
                } else {
                    this.adapter_.removeClass(constants_1.cssClasses.HELPER_TEXT_VALIDATION_MSG);
                }
            };
            MDCTextFieldHelperTextFoundation.prototype.showToScreenReader = function() {
                this.adapter_.removeAttr(constants_1.strings.ARIA_HIDDEN);
            };
            MDCTextFieldHelperTextFoundation.prototype.setValidity = function(inputIsValid) {
                var helperTextIsPersistent = this.adapter_.hasClass(constants_1.cssClasses.HELPER_TEXT_PERSISTENT);
                var helperTextIsValidationMsg = this.adapter_.hasClass(constants_1.cssClasses.HELPER_TEXT_VALIDATION_MSG);
                var validationMsgNeedsDisplay = helperTextIsValidationMsg && !inputIsValid;
                if (validationMsgNeedsDisplay) {
                    this.adapter_.setAttr(constants_1.strings.ROLE, "alert");
                } else {
                    this.adapter_.removeAttr(constants_1.strings.ROLE);
                }
                if (!helperTextIsPersistent && !validationMsgNeedsDisplay) {
                    this.hide_();
                }
            };
            MDCTextFieldHelperTextFoundation.prototype.hide_ = function() {
                this.adapter_.setAttr(constants_1.strings.ARIA_HIDDEN, "true");
            };
            return MDCTextFieldHelperTextFoundation;
        }(foundation_1.MDCFoundation);
        exports.MDCTextFieldHelperTextFoundation = MDCTextFieldHelperTextFoundation;
        exports.default = MDCTextFieldHelperTextFoundation;
    }, function(module, exports, __webpack_require__) {
        "use strict";
        var __extends = this && this.__extends || function() {
            var _extendStatics = function extendStatics(d, b) {
                _extendStatics = Object.setPrototypeOf || {
                    __proto__: []
                } instanceof Array && function(d, b) {
                    d.__proto__ = b;
                } || function(d, b) {
                    for (var p in b) {
                        if (b.hasOwnProperty(p)) d[p] = b[p];
                    }
                };
                return _extendStatics(d, b);
            };
            return function(d, b) {
                _extendStatics(d, b);
                function __() {
                    this.constructor = d;
                }
                d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
            };
        }();
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var constants_1 = __webpack_require__(6);
        var foundation_1 = __webpack_require__(33);
        var INITIAL_VALUE = 0;
        var MDCTopAppBarFoundation = function(_super) {
            __extends(MDCTopAppBarFoundation, _super);
            function MDCTopAppBarFoundation(adapter) {
                var _this = _super.call(this, adapter) || this;
                _this.wasDocked_ = true;
                _this.isDockedShowing_ = true;
                _this.currentAppBarOffsetTop_ = 0;
                _this.isCurrentlyBeingResized_ = false;
                _this.resizeThrottleId_ = INITIAL_VALUE;
                _this.resizeDebounceId_ = INITIAL_VALUE;
                _this.lastScrollPosition_ = _this.adapter_.getViewportScrollY();
                _this.topAppBarHeight_ = _this.adapter_.getTopAppBarHeight();
                _this.scrollHandler_ = function() {
                    return _this.topAppBarScrollHandler_();
                };
                _this.resizeHandler_ = function() {
                    return _this.topAppBarResizeHandler_();
                };
                return _this;
            }
            MDCTopAppBarFoundation.prototype.destroy = function() {
                _super.prototype.destroy.call(this);
                this.adapter_.setStyle("top", "");
            };
            MDCTopAppBarFoundation.prototype.checkForUpdate_ = function() {
                var offscreenBoundaryTop = -this.topAppBarHeight_;
                var hasAnyPixelsOffscreen = this.currentAppBarOffsetTop_ < 0;
                var hasAnyPixelsOnscreen = this.currentAppBarOffsetTop_ > offscreenBoundaryTop;
                var partiallyShowing = hasAnyPixelsOffscreen && hasAnyPixelsOnscreen;
                if (partiallyShowing) {
                    this.wasDocked_ = false;
                } else {
                    if (!this.wasDocked_) {
                        this.wasDocked_ = true;
                        return true;
                    } else if (this.isDockedShowing_ !== hasAnyPixelsOnscreen) {
                        this.isDockedShowing_ = hasAnyPixelsOnscreen;
                        return true;
                    }
                }
                return partiallyShowing;
            };
            MDCTopAppBarFoundation.prototype.moveTopAppBar_ = function() {
                if (this.checkForUpdate_()) {
                    var offset = this.currentAppBarOffsetTop_;
                    if (Math.abs(offset) >= this.topAppBarHeight_) {
                        offset = -constants_1.numbers.MAX_TOP_APP_BAR_HEIGHT;
                    }
                    this.adapter_.setStyle("top", offset + "px");
                }
            };
            MDCTopAppBarFoundation.prototype.topAppBarScrollHandler_ = function() {
                var currentScrollPosition = Math.max(this.adapter_.getViewportScrollY(), 0);
                var diff = currentScrollPosition - this.lastScrollPosition_;
                this.lastScrollPosition_ = currentScrollPosition;
                if (!this.isCurrentlyBeingResized_) {
                    this.currentAppBarOffsetTop_ -= diff;
                    if (this.currentAppBarOffsetTop_ > 0) {
                        this.currentAppBarOffsetTop_ = 0;
                    } else if (Math.abs(this.currentAppBarOffsetTop_) > this.topAppBarHeight_) {
                        this.currentAppBarOffsetTop_ = -this.topAppBarHeight_;
                    }
                    this.moveTopAppBar_();
                }
            };
            MDCTopAppBarFoundation.prototype.topAppBarResizeHandler_ = function() {
                var _this = this;
                if (!this.resizeThrottleId_) {
                    this.resizeThrottleId_ = setTimeout(function() {
                        _this.resizeThrottleId_ = INITIAL_VALUE;
                        _this.throttledResizeHandler_();
                    }, constants_1.numbers.DEBOUNCE_THROTTLE_RESIZE_TIME_MS);
                }
                this.isCurrentlyBeingResized_ = true;
                if (this.resizeDebounceId_) {
                    clearTimeout(this.resizeDebounceId_);
                }
                this.resizeDebounceId_ = setTimeout(function() {
                    _this.topAppBarScrollHandler_();
                    _this.isCurrentlyBeingResized_ = false;
                    _this.resizeDebounceId_ = INITIAL_VALUE;
                }, constants_1.numbers.DEBOUNCE_THROTTLE_RESIZE_TIME_MS);
            };
            MDCTopAppBarFoundation.prototype.throttledResizeHandler_ = function() {
                var currentHeight = this.adapter_.getTopAppBarHeight();
                if (this.topAppBarHeight_ !== currentHeight) {
                    this.wasDocked_ = false;
                    this.currentAppBarOffsetTop_ -= this.topAppBarHeight_ - currentHeight;
                    this.topAppBarHeight_ = currentHeight;
                }
                this.topAppBarScrollHandler_();
            };
            return MDCTopAppBarFoundation;
        }(foundation_1.MDCTopAppBarBaseFoundation);
        exports.MDCTopAppBarFoundation = MDCTopAppBarFoundation;
        exports.default = MDCTopAppBarFoundation;
    }, function(module, exports, __webpack_require__) {
        "use strict";
        var __extends = this && this.__extends || function() {
            var _extendStatics = function extendStatics(d, b) {
                _extendStatics = Object.setPrototypeOf || {
                    __proto__: []
                } instanceof Array && function(d, b) {
                    d.__proto__ = b;
                } || function(d, b) {
                    for (var p in b) {
                        if (b.hasOwnProperty(p)) d[p] = b[p];
                    }
                };
                return _extendStatics(d, b);
            };
            return function(d, b) {
                _extendStatics(d, b);
                function __() {
                    this.constructor = d;
                }
                d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
            };
        }();
        var __assign = this && this.__assign || function() {
            __assign = Object.assign || function(t) {
                for (var s, i = 1, n = arguments.length; i < n; i++) {
                    s = arguments[i];
                    for (var p in s) {
                        if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
                    }
                }
                return t;
            };
            return __assign.apply(this, arguments);
        };
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var foundation_1 = __webpack_require__(0);
        var constants_1 = __webpack_require__(6);
        var MDCTopAppBarBaseFoundation = function(_super) {
            __extends(MDCTopAppBarBaseFoundation, _super);
            function MDCTopAppBarBaseFoundation(adapter) {
                var _this = _super.call(this, __assign({}, MDCTopAppBarBaseFoundation.defaultAdapter, adapter)) || this;
                _this.navClickHandler_ = function() {
                    return _this.adapter_.notifyNavigationIconClicked();
                };
                return _this;
            }
            Object.defineProperty(MDCTopAppBarBaseFoundation, "strings", {
                get: function get() {
                    return constants_1.strings;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MDCTopAppBarBaseFoundation, "cssClasses", {
                get: function get() {
                    return constants_1.cssClasses;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MDCTopAppBarBaseFoundation, "numbers", {
                get: function get() {
                    return constants_1.numbers;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MDCTopAppBarBaseFoundation, "defaultAdapter", {
                get: function get() {
                    return {
                        addClass: function addClass() {
                            return undefined;
                        },
                        removeClass: function removeClass() {
                            return undefined;
                        },
                        hasClass: function hasClass() {
                            return false;
                        },
                        setStyle: function setStyle() {
                            return undefined;
                        },
                        getTopAppBarHeight: function getTopAppBarHeight() {
                            return 0;
                        },
                        registerNavigationIconInteractionHandler: function registerNavigationIconInteractionHandler() {
                            return undefined;
                        },
                        deregisterNavigationIconInteractionHandler: function deregisterNavigationIconInteractionHandler() {
                            return undefined;
                        },
                        notifyNavigationIconClicked: function notifyNavigationIconClicked() {
                            return undefined;
                        },
                        registerScrollHandler: function registerScrollHandler() {
                            return undefined;
                        },
                        deregisterScrollHandler: function deregisterScrollHandler() {
                            return undefined;
                        },
                        registerResizeHandler: function registerResizeHandler() {
                            return undefined;
                        },
                        deregisterResizeHandler: function deregisterResizeHandler() {
                            return undefined;
                        },
                        getViewportScrollY: function getViewportScrollY() {
                            return 0;
                        },
                        getTotalActionItems: function getTotalActionItems() {
                            return 0;
                        }
                    };
                },
                enumerable: true,
                configurable: true
            });
            MDCTopAppBarBaseFoundation.prototype.init = function() {
                this.initScrollHandler();
                this.initResizeHandler_();
                this.adapter_.registerNavigationIconInteractionHandler("click", this.navClickHandler_);
            };
            MDCTopAppBarBaseFoundation.prototype.destroy = function() {
                this.destroyScrollHandler();
                this.destroyResizeHandler_();
                this.adapter_.deregisterNavigationIconInteractionHandler("click", this.navClickHandler_);
            };
            MDCTopAppBarBaseFoundation.prototype.initScrollHandler = function() {
                if (this.scrollHandler_) {
                    this.adapter_.registerScrollHandler(this.scrollHandler_);
                }
            };
            MDCTopAppBarBaseFoundation.prototype.destroyScrollHandler = function() {
                if (this.scrollHandler_) {
                    this.adapter_.deregisterScrollHandler(this.scrollHandler_);
                }
            };
            MDCTopAppBarBaseFoundation.prototype.initResizeHandler_ = function() {
                if (this.resizeHandler_) {
                    this.adapter_.registerResizeHandler(this.resizeHandler_);
                }
            };
            MDCTopAppBarBaseFoundation.prototype.destroyResizeHandler_ = function() {
                if (this.resizeHandler_) {
                    this.adapter_.deregisterResizeHandler(this.resizeHandler_);
                }
            };
            return MDCTopAppBarBaseFoundation;
        }(foundation_1.MDCFoundation);
        exports.MDCTopAppBarBaseFoundation = MDCTopAppBarBaseFoundation;
        exports.default = MDCTopAppBarBaseFoundation;
    }, function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports.cssClasses = {
            BG_FOCUSED: "mdc-ripple-upgraded--background-focused",
            FG_ACTIVATION: "mdc-ripple-upgraded--foreground-activation",
            FG_DEACTIVATION: "mdc-ripple-upgraded--foreground-deactivation",
            ROOT: "mdc-ripple-upgraded",
            UNBOUNDED: "mdc-ripple-upgraded--unbounded"
        };
        exports.strings = {
            VAR_FG_SCALE: "--mdc-ripple-fg-scale",
            VAR_FG_SIZE: "--mdc-ripple-fg-size",
            VAR_FG_TRANSLATE_END: "--mdc-ripple-fg-translate-end",
            VAR_FG_TRANSLATE_START: "--mdc-ripple-fg-translate-start",
            VAR_LEFT: "--mdc-ripple-left",
            VAR_TOP: "--mdc-ripple-top"
        };
        exports.numbers = {
            DEACTIVATION_TIMEOUT_MS: 225,
            FG_DEACTIVATION_MS: 150,
            INITIAL_ORIGIN_SCALE: .6,
            PADDING: 10,
            TAP_DELAY_MS: 300
        };
    }, function(module, exports, __webpack_require__) {
        "use strict";
        var __extends = this && this.__extends || function() {
            var _extendStatics = function extendStatics(d, b) {
                _extendStatics = Object.setPrototypeOf || {
                    __proto__: []
                } instanceof Array && function(d, b) {
                    d.__proto__ = b;
                } || function(d, b) {
                    for (var p in b) {
                        if (b.hasOwnProperty(p)) d[p] = b[p];
                    }
                };
                return _extendStatics(d, b);
            };
            return function(d, b) {
                _extendStatics(d, b);
                function __() {
                    this.constructor = d;
                }
                d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
            };
        }();
        var __assign = this && this.__assign || function() {
            __assign = Object.assign || function(t) {
                for (var s, i = 1, n = arguments.length; i < n; i++) {
                    s = arguments[i];
                    for (var p in s) {
                        if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
                    }
                }
                return t;
            };
            return __assign.apply(this, arguments);
        };
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var foundation_1 = __webpack_require__(0);
        var constants_1 = __webpack_require__(36);
        var MDCCheckboxFoundation = function(_super) {
            __extends(MDCCheckboxFoundation, _super);
            function MDCCheckboxFoundation(adapter) {
                var _this = _super.call(this, __assign({}, MDCCheckboxFoundation.defaultAdapter, adapter)) || this;
                _this.currentCheckState_ = constants_1.strings.TRANSITION_STATE_INIT;
                _this.currentAnimationClass_ = "";
                _this.animEndLatchTimer_ = 0;
                _this.enableAnimationEndHandler_ = false;
                return _this;
            }
            Object.defineProperty(MDCCheckboxFoundation, "cssClasses", {
                get: function get() {
                    return constants_1.cssClasses;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MDCCheckboxFoundation, "strings", {
                get: function get() {
                    return constants_1.strings;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MDCCheckboxFoundation, "numbers", {
                get: function get() {
                    return constants_1.numbers;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MDCCheckboxFoundation, "defaultAdapter", {
                get: function get() {
                    return {
                        addClass: function addClass() {
                            return undefined;
                        },
                        forceLayout: function forceLayout() {
                            return undefined;
                        },
                        hasNativeControl: function hasNativeControl() {
                            return false;
                        },
                        isAttachedToDOM: function isAttachedToDOM() {
                            return false;
                        },
                        isChecked: function isChecked() {
                            return false;
                        },
                        isIndeterminate: function isIndeterminate() {
                            return false;
                        },
                        removeClass: function removeClass() {
                            return undefined;
                        },
                        removeNativeControlAttr: function removeNativeControlAttr() {
                            return undefined;
                        },
                        setNativeControlAttr: function setNativeControlAttr() {
                            return undefined;
                        },
                        setNativeControlDisabled: function setNativeControlDisabled() {
                            return undefined;
                        }
                    };
                },
                enumerable: true,
                configurable: true
            });
            MDCCheckboxFoundation.prototype.init = function() {
                this.currentCheckState_ = this.determineCheckState_();
                this.updateAriaChecked_();
                this.adapter_.addClass(constants_1.cssClasses.UPGRADED);
            };
            MDCCheckboxFoundation.prototype.destroy = function() {
                clearTimeout(this.animEndLatchTimer_);
            };
            MDCCheckboxFoundation.prototype.setDisabled = function(disabled) {
                this.adapter_.setNativeControlDisabled(disabled);
                if (disabled) {
                    this.adapter_.addClass(constants_1.cssClasses.DISABLED);
                } else {
                    this.adapter_.removeClass(constants_1.cssClasses.DISABLED);
                }
            };
            MDCCheckboxFoundation.prototype.handleAnimationEnd = function() {
                var _this = this;
                if (!this.enableAnimationEndHandler_) {
                    return;
                }
                clearTimeout(this.animEndLatchTimer_);
                this.animEndLatchTimer_ = setTimeout(function() {
                    _this.adapter_.removeClass(_this.currentAnimationClass_);
                    _this.enableAnimationEndHandler_ = false;
                }, constants_1.numbers.ANIM_END_LATCH_MS);
            };
            MDCCheckboxFoundation.prototype.handleChange = function() {
                this.transitionCheckState_();
            };
            MDCCheckboxFoundation.prototype.transitionCheckState_ = function() {
                if (!this.adapter_.hasNativeControl()) {
                    return;
                }
                var oldState = this.currentCheckState_;
                var newState = this.determineCheckState_();
                if (oldState === newState) {
                    return;
                }
                this.updateAriaChecked_();
                var TRANSITION_STATE_UNCHECKED = constants_1.strings.TRANSITION_STATE_UNCHECKED;
                var SELECTED = constants_1.cssClasses.SELECTED;
                if (newState === TRANSITION_STATE_UNCHECKED) {
                    this.adapter_.removeClass(SELECTED);
                } else {
                    this.adapter_.addClass(SELECTED);
                }
                if (this.currentAnimationClass_.length > 0) {
                    clearTimeout(this.animEndLatchTimer_);
                    this.adapter_.forceLayout();
                    this.adapter_.removeClass(this.currentAnimationClass_);
                }
                this.currentAnimationClass_ = this.getTransitionAnimationClass_(oldState, newState);
                this.currentCheckState_ = newState;
                if (this.adapter_.isAttachedToDOM() && this.currentAnimationClass_.length > 0) {
                    this.adapter_.addClass(this.currentAnimationClass_);
                    this.enableAnimationEndHandler_ = true;
                }
            };
            MDCCheckboxFoundation.prototype.determineCheckState_ = function() {
                var TRANSITION_STATE_INDETERMINATE = constants_1.strings.TRANSITION_STATE_INDETERMINATE, TRANSITION_STATE_CHECKED = constants_1.strings.TRANSITION_STATE_CHECKED, TRANSITION_STATE_UNCHECKED = constants_1.strings.TRANSITION_STATE_UNCHECKED;
                if (this.adapter_.isIndeterminate()) {
                    return TRANSITION_STATE_INDETERMINATE;
                }
                return this.adapter_.isChecked() ? TRANSITION_STATE_CHECKED : TRANSITION_STATE_UNCHECKED;
            };
            MDCCheckboxFoundation.prototype.getTransitionAnimationClass_ = function(oldState, newState) {
                var TRANSITION_STATE_INIT = constants_1.strings.TRANSITION_STATE_INIT, TRANSITION_STATE_CHECKED = constants_1.strings.TRANSITION_STATE_CHECKED, TRANSITION_STATE_UNCHECKED = constants_1.strings.TRANSITION_STATE_UNCHECKED;
                var _a = MDCCheckboxFoundation.cssClasses, ANIM_UNCHECKED_CHECKED = _a.ANIM_UNCHECKED_CHECKED, ANIM_UNCHECKED_INDETERMINATE = _a.ANIM_UNCHECKED_INDETERMINATE, ANIM_CHECKED_UNCHECKED = _a.ANIM_CHECKED_UNCHECKED, ANIM_CHECKED_INDETERMINATE = _a.ANIM_CHECKED_INDETERMINATE, ANIM_INDETERMINATE_CHECKED = _a.ANIM_INDETERMINATE_CHECKED, ANIM_INDETERMINATE_UNCHECKED = _a.ANIM_INDETERMINATE_UNCHECKED;
                switch (oldState) {
                  case TRANSITION_STATE_INIT:
                    if (newState === TRANSITION_STATE_UNCHECKED) {
                        return "";
                    }
                    return newState === TRANSITION_STATE_CHECKED ? ANIM_INDETERMINATE_CHECKED : ANIM_INDETERMINATE_UNCHECKED;

                  case TRANSITION_STATE_UNCHECKED:
                    return newState === TRANSITION_STATE_CHECKED ? ANIM_UNCHECKED_CHECKED : ANIM_UNCHECKED_INDETERMINATE;

                  case TRANSITION_STATE_CHECKED:
                    return newState === TRANSITION_STATE_UNCHECKED ? ANIM_CHECKED_UNCHECKED : ANIM_CHECKED_INDETERMINATE;

                  default:
                    return newState === TRANSITION_STATE_CHECKED ? ANIM_INDETERMINATE_CHECKED : ANIM_INDETERMINATE_UNCHECKED;
                }
            };
            MDCCheckboxFoundation.prototype.updateAriaChecked_ = function() {
                if (this.adapter_.isIndeterminate()) {
                    this.adapter_.setNativeControlAttr(constants_1.strings.ARIA_CHECKED_ATTR, constants_1.strings.ARIA_CHECKED_INDETERMINATE_VALUE);
                } else {
                    this.adapter_.removeNativeControlAttr(constants_1.strings.ARIA_CHECKED_ATTR);
                }
            };
            return MDCCheckboxFoundation;
        }(foundation_1.MDCFoundation);
        exports.MDCCheckboxFoundation = MDCCheckboxFoundation;
        exports.default = MDCCheckboxFoundation;
    }, function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports.cssClasses = {
            ANIM_CHECKED_INDETERMINATE: "mdc-checkbox--anim-checked-indeterminate",
            ANIM_CHECKED_UNCHECKED: "mdc-checkbox--anim-checked-unchecked",
            ANIM_INDETERMINATE_CHECKED: "mdc-checkbox--anim-indeterminate-checked",
            ANIM_INDETERMINATE_UNCHECKED: "mdc-checkbox--anim-indeterminate-unchecked",
            ANIM_UNCHECKED_CHECKED: "mdc-checkbox--anim-unchecked-checked",
            ANIM_UNCHECKED_INDETERMINATE: "mdc-checkbox--anim-unchecked-indeterminate",
            BACKGROUND: "mdc-checkbox__background",
            CHECKED: "mdc-checkbox--checked",
            CHECKMARK: "mdc-checkbox__checkmark",
            CHECKMARK_PATH: "mdc-checkbox__checkmark-path",
            DISABLED: "mdc-checkbox--disabled",
            INDETERMINATE: "mdc-checkbox--indeterminate",
            MIXEDMARK: "mdc-checkbox__mixedmark",
            NATIVE_CONTROL: "mdc-checkbox__native-control",
            ROOT: "mdc-checkbox",
            SELECTED: "mdc-checkbox--selected",
            UPGRADED: "mdc-checkbox--upgraded"
        };
        exports.strings = {
            ARIA_CHECKED_ATTR: "aria-checked",
            ARIA_CHECKED_INDETERMINATE_VALUE: "mixed",
            NATIVE_CONTROL_SELECTOR: ".mdc-checkbox__native-control",
            TRANSITION_STATE_CHECKED: "checked",
            TRANSITION_STATE_INDETERMINATE: "indeterminate",
            TRANSITION_STATE_INIT: "init",
            TRANSITION_STATE_UNCHECKED: "unchecked"
        };
        exports.numbers = {
            ANIM_END_LATCH_MS: 250
        };
    }, function(module, exports, __webpack_require__) {
        "use strict";
        var __extends = this && this.__extends || function() {
            var _extendStatics = function extendStatics(d, b) {
                _extendStatics = Object.setPrototypeOf || {
                    __proto__: []
                } instanceof Array && function(d, b) {
                    d.__proto__ = b;
                } || function(d, b) {
                    for (var p in b) {
                        if (b.hasOwnProperty(p)) d[p] = b[p];
                    }
                };
                return _extendStatics(d, b);
            };
            return function(d, b) {
                _extendStatics(d, b);
                function __() {
                    this.constructor = d;
                }
                d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
            };
        }();
        var __assign = this && this.__assign || function() {
            __assign = Object.assign || function(t) {
                for (var s, i = 1, n = arguments.length; i < n; i++) {
                    s = arguments[i];
                    for (var p in s) {
                        if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
                    }
                }
                return t;
            };
            return __assign.apply(this, arguments);
        };
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var component_1 = __webpack_require__(1);
        var component_2 = __webpack_require__(2);
        var foundation_1 = __webpack_require__(4);
        var constants_1 = __webpack_require__(14);
        var foundation_2 = __webpack_require__(15);
        var INTERACTION_EVENTS = [ "click", "keydown" ];
        var MDCChip = function(_super) {
            __extends(MDCChip, _super);
            function MDCChip() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            Object.defineProperty(MDCChip.prototype, "selected", {
                get: function get() {
                    return this.foundation_.isSelected();
                },
                set: function set(selected) {
                    this.foundation_.setSelected(selected);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MDCChip.prototype, "shouldRemoveOnTrailingIconClick", {
                get: function get() {
                    return this.foundation_.getShouldRemoveOnTrailingIconClick();
                },
                set: function set(shouldRemove) {
                    this.foundation_.setShouldRemoveOnTrailingIconClick(shouldRemove);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MDCChip.prototype, "ripple", {
                get: function get() {
                    return this.ripple_;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MDCChip.prototype, "id", {
                get: function get() {
                    return this.root_.id;
                },
                enumerable: true,
                configurable: true
            });
            MDCChip.attachTo = function(root) {
                return new MDCChip(root);
            };
            MDCChip.prototype.initialize = function(rippleFactory) {
                var _this = this;
                if (rippleFactory === void 0) {
                    rippleFactory = function rippleFactory(el, foundation) {
                        return new component_2.MDCRipple(el, foundation);
                    };
                }
                this.leadingIcon_ = this.root_.querySelector(constants_1.strings.LEADING_ICON_SELECTOR);
                this.trailingIcon_ = this.root_.querySelector(constants_1.strings.TRAILING_ICON_SELECTOR);
                this.checkmark_ = this.root_.querySelector(constants_1.strings.CHECKMARK_SELECTOR);
                var rippleAdapter = __assign({}, component_2.MDCRipple.createAdapter(this), {
                    computeBoundingRect: function computeBoundingRect() {
                        return _this.foundation_.getDimensions();
                    }
                });
                this.ripple_ = rippleFactory(this.root_, new foundation_1.MDCRippleFoundation(rippleAdapter));
            };
            MDCChip.prototype.initialSyncWithDOM = function() {
                var _this = this;
                this.handleInteraction_ = function(evt) {
                    return _this.foundation_.handleInteraction(evt);
                };
                this.handleTransitionEnd_ = function(evt) {
                    return _this.foundation_.handleTransitionEnd(evt);
                };
                this.handleTrailingIconInteraction_ = function(evt) {
                    return _this.foundation_.handleTrailingIconInteraction(evt);
                };
                INTERACTION_EVENTS.forEach(function(evtType) {
                    _this.listen(evtType, _this.handleInteraction_);
                });
                this.listen("transitionend", this.handleTransitionEnd_);
                if (this.trailingIcon_) {
                    INTERACTION_EVENTS.forEach(function(evtType) {
                        _this.trailingIcon_.addEventListener(evtType, _this.handleTrailingIconInteraction_);
                    });
                }
            };
            MDCChip.prototype.destroy = function() {
                var _this = this;
                this.ripple_.destroy();
                INTERACTION_EVENTS.forEach(function(evtType) {
                    _this.unlisten(evtType, _this.handleInteraction_);
                });
                this.unlisten("transitionend", this.handleTransitionEnd_);
                if (this.trailingIcon_) {
                    INTERACTION_EVENTS.forEach(function(evtType) {
                        _this.trailingIcon_.removeEventListener(evtType, _this.handleTrailingIconInteraction_);
                    });
                }
                _super.prototype.destroy.call(this);
            };
            MDCChip.prototype.beginExit = function() {
                this.foundation_.beginExit();
            };
            MDCChip.prototype.getDefaultFoundation = function() {
                var _this = this;
                var adapter = {
                    addClass: function addClass(className) {
                        return _this.root_.classList.add(className);
                    },
                    addClassToLeadingIcon: function addClassToLeadingIcon(className) {
                        if (_this.leadingIcon_) {
                            _this.leadingIcon_.classList.add(className);
                        }
                    },
                    eventTargetHasClass: function eventTargetHasClass(target, className) {
                        return target ? target.classList.contains(className) : false;
                    },
                    getCheckmarkBoundingClientRect: function getCheckmarkBoundingClientRect() {
                        return _this.checkmark_ ? _this.checkmark_.getBoundingClientRect() : null;
                    },
                    getComputedStyleValue: function getComputedStyleValue(propertyName) {
                        return window.getComputedStyle(_this.root_).getPropertyValue(propertyName);
                    },
                    getRootBoundingClientRect: function getRootBoundingClientRect() {
                        return _this.root_.getBoundingClientRect();
                    },
                    hasClass: function hasClass(className) {
                        return _this.root_.classList.contains(className);
                    },
                    hasLeadingIcon: function hasLeadingIcon() {
                        return !!_this.leadingIcon_;
                    },
                    notifyInteraction: function notifyInteraction() {
                        return _this.emit(constants_1.strings.INTERACTION_EVENT, {
                            chipId: _this.id
                        }, true);
                    },
                    notifyRemoval: function notifyRemoval() {
                        return _this.emit(constants_1.strings.REMOVAL_EVENT, {
                            chipId: _this.id,
                            root: _this.root_
                        }, true);
                    },
                    notifySelection: function notifySelection(selected) {
                        return _this.emit(constants_1.strings.SELECTION_EVENT, {
                            chipId: _this.id,
                            selected: selected
                        }, true);
                    },
                    notifyTrailingIconInteraction: function notifyTrailingIconInteraction() {
                        return _this.emit(constants_1.strings.TRAILING_ICON_INTERACTION_EVENT, {
                            chipId: _this.id
                        }, true);
                    },
                    removeClass: function removeClass(className) {
                        return _this.root_.classList.remove(className);
                    },
                    removeClassFromLeadingIcon: function removeClassFromLeadingIcon(className) {
                        if (_this.leadingIcon_) {
                            _this.leadingIcon_.classList.remove(className);
                        }
                    },
                    setStyleProperty: function setStyleProperty(propertyName, value) {
                        return _this.root_.style.setProperty(propertyName, value);
                    }
                };
                return new foundation_2.MDCChipFoundation(adapter);
            };
            return MDCChip;
        }(component_1.MDCComponent);
        exports.MDCChip = MDCChip;
    }, function(module, exports, __webpack_require__) {
        "use strict";
        var __extends = this && this.__extends || function() {
            var _extendStatics = function extendStatics(d, b) {
                _extendStatics = Object.setPrototypeOf || {
                    __proto__: []
                } instanceof Array && function(d, b) {
                    d.__proto__ = b;
                } || function(d, b) {
                    for (var p in b) {
                        if (b.hasOwnProperty(p)) d[p] = b[p];
                    }
                };
                return _extendStatics(d, b);
            };
            return function(d, b) {
                _extendStatics(d, b);
                function __() {
                    this.constructor = d;
                }
                d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
            };
        }();
        var __assign = this && this.__assign || function() {
            __assign = Object.assign || function(t) {
                for (var s, i = 1, n = arguments.length; i < n; i++) {
                    s = arguments[i];
                    for (var p in s) {
                        if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
                    }
                }
                return t;
            };
            return __assign.apply(this, arguments);
        };
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var foundation_1 = __webpack_require__(0);
        var constants_1 = __webpack_require__(39);
        var MDCChipSetFoundation = function(_super) {
            __extends(MDCChipSetFoundation, _super);
            function MDCChipSetFoundation(adapter) {
                var _this = _super.call(this, __assign({}, MDCChipSetFoundation.defaultAdapter, adapter)) || this;
                _this.selectedChipIds_ = [];
                return _this;
            }
            Object.defineProperty(MDCChipSetFoundation, "strings", {
                get: function get() {
                    return constants_1.strings;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MDCChipSetFoundation, "cssClasses", {
                get: function get() {
                    return constants_1.cssClasses;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MDCChipSetFoundation, "defaultAdapter", {
                get: function get() {
                    return {
                        hasClass: function hasClass() {
                            return false;
                        },
                        removeChip: function removeChip() {
                            return undefined;
                        },
                        setSelected: function setSelected() {
                            return undefined;
                        }
                    };
                },
                enumerable: true,
                configurable: true
            });
            MDCChipSetFoundation.prototype.getSelectedChipIds = function() {
                return this.selectedChipIds_.slice();
            };
            MDCChipSetFoundation.prototype.select = function(chipId) {
                if (this.selectedChipIds_.indexOf(chipId) >= 0) {
                    return;
                }
                if (this.adapter_.hasClass(constants_1.cssClasses.CHOICE) && this.selectedChipIds_.length > 0) {
                    var previouslySelectedChip = this.selectedChipIds_[0];
                    this.selectedChipIds_.length = 0;
                    this.adapter_.setSelected(previouslySelectedChip, false);
                }
                this.selectedChipIds_.push(chipId);
                this.adapter_.setSelected(chipId, true);
            };
            MDCChipSetFoundation.prototype.handleChipInteraction = function(chipId) {
                if (this.adapter_.hasClass(constants_1.cssClasses.CHOICE) || this.adapter_.hasClass(constants_1.cssClasses.FILTER)) {
                    this.toggleSelect_(chipId);
                }
            };
            MDCChipSetFoundation.prototype.handleChipSelection = function(chipId, selected) {
                var chipIsSelected = this.selectedChipIds_.indexOf(chipId) >= 0;
                if (selected && !chipIsSelected) {
                    this.select(chipId);
                } else if (!selected && chipIsSelected) {
                    this.deselect_(chipId);
                }
            };
            MDCChipSetFoundation.prototype.handleChipRemoval = function(chipId) {
                this.deselect_(chipId);
                this.adapter_.removeChip(chipId);
            };
            MDCChipSetFoundation.prototype.deselect_ = function(chipId) {
                var index = this.selectedChipIds_.indexOf(chipId);
                if (index >= 0) {
                    this.selectedChipIds_.splice(index, 1);
                    this.adapter_.setSelected(chipId, false);
                }
            };
            MDCChipSetFoundation.prototype.toggleSelect_ = function(chipId) {
                if (this.selectedChipIds_.indexOf(chipId) >= 0) {
                    this.deselect_(chipId);
                } else {
                    this.select(chipId);
                }
            };
            return MDCChipSetFoundation;
        }(foundation_1.MDCFoundation);
        exports.MDCChipSetFoundation = MDCChipSetFoundation;
        exports.default = MDCChipSetFoundation;
    }, function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports.strings = {
            CHIP_SELECTOR: ".mdc-chip"
        };
        exports.cssClasses = {
            CHOICE: "mdc-chip-set--choice",
            FILTER: "mdc-chip-set--filter"
        };
    }, function(module, exports, __webpack_require__) {
        "use strict";
        var __importDefault = this && this.__importDefault || function(mod) {
            return mod && mod.__esModule ? mod : {
                default: mod
            };
        };
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var focus_trap_1 = __importDefault(__webpack_require__(111));
        function createFocusTrapInstance(surfaceEl, focusTrapFactory, initialFocusEl) {
            if (focusTrapFactory === void 0) {
                focusTrapFactory = focus_trap_1.default;
            }
            return focusTrapFactory(surfaceEl, {
                clickOutsideDeactivates: true,
                escapeDeactivates: false,
                initialFocus: initialFocusEl
            });
        }
        exports.createFocusTrapInstance = createFocusTrapInstance;
        function isScrollable(el) {
            return el ? el.scrollHeight > el.offsetHeight : false;
        }
        exports.isScrollable = isScrollable;
        function areTopsMisaligned(els) {
            var tops = new Set();
            [].forEach.call(els, function(el) {
                return tops.add(el.offsetTop);
            });
            return tops.size > 1;
        }
        exports.areTopsMisaligned = areTopsMisaligned;
    }, function(module, exports, __webpack_require__) {
        "use strict";
        var __extends = this && this.__extends || function() {
            var _extendStatics = function extendStatics(d, b) {
                _extendStatics = Object.setPrototypeOf || {
                    __proto__: []
                } instanceof Array && function(d, b) {
                    d.__proto__ = b;
                } || function(d, b) {
                    for (var p in b) {
                        if (b.hasOwnProperty(p)) d[p] = b[p];
                    }
                };
                return _extendStatics(d, b);
            };
            return function(d, b) {
                _extendStatics(d, b);
                function __() {
                    this.constructor = d;
                }
                d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
            };
        }();
        var __assign = this && this.__assign || function() {
            __assign = Object.assign || function(t) {
                for (var s, i = 1, n = arguments.length; i < n; i++) {
                    s = arguments[i];
                    for (var p in s) {
                        if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
                    }
                }
                return t;
            };
            return __assign.apply(this, arguments);
        };
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var foundation_1 = __webpack_require__(0);
        var constants_1 = __webpack_require__(42);
        var MDCDialogFoundation = function(_super) {
            __extends(MDCDialogFoundation, _super);
            function MDCDialogFoundation(adapter) {
                var _this = _super.call(this, __assign({}, MDCDialogFoundation.defaultAdapter, adapter)) || this;
                _this.isOpen_ = false;
                _this.animationFrame_ = 0;
                _this.animationTimer_ = 0;
                _this.layoutFrame_ = 0;
                _this.escapeKeyAction_ = constants_1.strings.CLOSE_ACTION;
                _this.scrimClickAction_ = constants_1.strings.CLOSE_ACTION;
                _this.autoStackButtons_ = true;
                _this.areButtonsStacked_ = false;
                return _this;
            }
            Object.defineProperty(MDCDialogFoundation, "cssClasses", {
                get: function get() {
                    return constants_1.cssClasses;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MDCDialogFoundation, "strings", {
                get: function get() {
                    return constants_1.strings;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MDCDialogFoundation, "numbers", {
                get: function get() {
                    return constants_1.numbers;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MDCDialogFoundation, "defaultAdapter", {
                get: function get() {
                    return {
                        addBodyClass: function addBodyClass() {
                            return undefined;
                        },
                        addClass: function addClass() {
                            return undefined;
                        },
                        areButtonsStacked: function areButtonsStacked() {
                            return false;
                        },
                        clickDefaultButton: function clickDefaultButton() {
                            return undefined;
                        },
                        eventTargetMatches: function eventTargetMatches() {
                            return false;
                        },
                        getActionFromEvent: function getActionFromEvent() {
                            return "";
                        },
                        hasClass: function hasClass() {
                            return false;
                        },
                        isContentScrollable: function isContentScrollable() {
                            return false;
                        },
                        notifyClosed: function notifyClosed() {
                            return undefined;
                        },
                        notifyClosing: function notifyClosing() {
                            return undefined;
                        },
                        notifyOpened: function notifyOpened() {
                            return undefined;
                        },
                        notifyOpening: function notifyOpening() {
                            return undefined;
                        },
                        releaseFocus: function releaseFocus() {
                            return undefined;
                        },
                        removeBodyClass: function removeBodyClass() {
                            return undefined;
                        },
                        removeClass: function removeClass() {
                            return undefined;
                        },
                        reverseButtons: function reverseButtons() {
                            return undefined;
                        },
                        trapFocus: function trapFocus() {
                            return undefined;
                        }
                    };
                },
                enumerable: true,
                configurable: true
            });
            MDCDialogFoundation.prototype.init = function() {
                if (this.adapter_.hasClass(constants_1.cssClasses.STACKED)) {
                    this.setAutoStackButtons(false);
                }
            };
            MDCDialogFoundation.prototype.destroy = function() {
                if (this.isOpen_) {
                    this.close(constants_1.strings.DESTROY_ACTION);
                }
                if (this.animationTimer_) {
                    clearTimeout(this.animationTimer_);
                    this.handleAnimationTimerEnd_();
                }
                if (this.layoutFrame_) {
                    cancelAnimationFrame(this.layoutFrame_);
                    this.layoutFrame_ = 0;
                }
            };
            MDCDialogFoundation.prototype.open = function() {
                var _this = this;
                this.isOpen_ = true;
                this.adapter_.notifyOpening();
                this.adapter_.addClass(constants_1.cssClasses.OPENING);
                this.runNextAnimationFrame_(function() {
                    _this.adapter_.addClass(constants_1.cssClasses.OPEN);
                    _this.adapter_.addBodyClass(constants_1.cssClasses.SCROLL_LOCK);
                    _this.layout();
                    _this.animationTimer_ = setTimeout(function() {
                        _this.handleAnimationTimerEnd_();
                        _this.adapter_.trapFocus();
                        _this.adapter_.notifyOpened();
                    }, constants_1.numbers.DIALOG_ANIMATION_OPEN_TIME_MS);
                });
            };
            MDCDialogFoundation.prototype.close = function(action) {
                var _this = this;
                if (action === void 0) {
                    action = "";
                }
                if (!this.isOpen_) {
                    return;
                }
                this.isOpen_ = false;
                this.adapter_.notifyClosing(action);
                this.adapter_.addClass(constants_1.cssClasses.CLOSING);
                this.adapter_.removeClass(constants_1.cssClasses.OPEN);
                this.adapter_.removeBodyClass(constants_1.cssClasses.SCROLL_LOCK);
                cancelAnimationFrame(this.animationFrame_);
                this.animationFrame_ = 0;
                clearTimeout(this.animationTimer_);
                this.animationTimer_ = setTimeout(function() {
                    _this.adapter_.releaseFocus();
                    _this.handleAnimationTimerEnd_();
                    _this.adapter_.notifyClosed(action);
                }, constants_1.numbers.DIALOG_ANIMATION_CLOSE_TIME_MS);
            };
            MDCDialogFoundation.prototype.isOpen = function() {
                return this.isOpen_;
            };
            MDCDialogFoundation.prototype.getEscapeKeyAction = function() {
                return this.escapeKeyAction_;
            };
            MDCDialogFoundation.prototype.setEscapeKeyAction = function(action) {
                this.escapeKeyAction_ = action;
            };
            MDCDialogFoundation.prototype.getScrimClickAction = function() {
                return this.scrimClickAction_;
            };
            MDCDialogFoundation.prototype.setScrimClickAction = function(action) {
                this.scrimClickAction_ = action;
            };
            MDCDialogFoundation.prototype.getAutoStackButtons = function() {
                return this.autoStackButtons_;
            };
            MDCDialogFoundation.prototype.setAutoStackButtons = function(autoStack) {
                this.autoStackButtons_ = autoStack;
            };
            MDCDialogFoundation.prototype.layout = function() {
                var _this = this;
                if (this.layoutFrame_) {
                    cancelAnimationFrame(this.layoutFrame_);
                }
                this.layoutFrame_ = requestAnimationFrame(function() {
                    _this.layoutInternal_();
                    _this.layoutFrame_ = 0;
                });
            };
            MDCDialogFoundation.prototype.handleInteraction = function(evt) {
                var isClick = evt.type === "click";
                var isEnter = evt.key === "Enter" || evt.keyCode === 13;
                var isSpace = evt.key === "Space" || evt.keyCode === 32;
                var isScrim = this.adapter_.eventTargetMatches(evt.target, constants_1.strings.SCRIM_SELECTOR);
                var isDefault = !this.adapter_.eventTargetMatches(evt.target, constants_1.strings.SUPPRESS_DEFAULT_PRESS_SELECTOR);
                if (isClick && isScrim && this.scrimClickAction_ !== "") {
                    this.close(this.scrimClickAction_);
                } else if (isClick || isSpace || isEnter) {
                    var action = this.adapter_.getActionFromEvent(evt);
                    if (action) {
                        this.close(action);
                    } else if (isEnter && isDefault) {
                        this.adapter_.clickDefaultButton();
                    }
                }
            };
            MDCDialogFoundation.prototype.handleDocumentKeydown = function(evt) {
                var isEscape = evt.key === "Escape" || evt.keyCode === 27;
                if (isEscape && this.escapeKeyAction_ !== "") {
                    this.close(this.escapeKeyAction_);
                }
            };
            MDCDialogFoundation.prototype.layoutInternal_ = function() {
                if (this.autoStackButtons_) {
                    this.detectStackedButtons_();
                }
                this.detectScrollableContent_();
            };
            MDCDialogFoundation.prototype.handleAnimationTimerEnd_ = function() {
                this.animationTimer_ = 0;
                this.adapter_.removeClass(constants_1.cssClasses.OPENING);
                this.adapter_.removeClass(constants_1.cssClasses.CLOSING);
            };
            MDCDialogFoundation.prototype.runNextAnimationFrame_ = function(callback) {
                var _this = this;
                cancelAnimationFrame(this.animationFrame_);
                this.animationFrame_ = requestAnimationFrame(function() {
                    _this.animationFrame_ = 0;
                    clearTimeout(_this.animationTimer_);
                    _this.animationTimer_ = setTimeout(callback, 0);
                });
            };
            MDCDialogFoundation.prototype.detectStackedButtons_ = function() {
                this.adapter_.removeClass(constants_1.cssClasses.STACKED);
                var areButtonsStacked = this.adapter_.areButtonsStacked();
                if (areButtonsStacked) {
                    this.adapter_.addClass(constants_1.cssClasses.STACKED);
                }
                if (areButtonsStacked !== this.areButtonsStacked_) {
                    this.adapter_.reverseButtons();
                    this.areButtonsStacked_ = areButtonsStacked;
                }
            };
            MDCDialogFoundation.prototype.detectScrollableContent_ = function() {
                this.adapter_.removeClass(constants_1.cssClasses.SCROLLABLE);
                if (this.adapter_.isContentScrollable()) {
                    this.adapter_.addClass(constants_1.cssClasses.SCROLLABLE);
                }
            };
            return MDCDialogFoundation;
        }(foundation_1.MDCFoundation);
        exports.MDCDialogFoundation = MDCDialogFoundation;
        exports.default = MDCDialogFoundation;
    }, function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports.cssClasses = {
            CLOSING: "mdc-dialog--closing",
            OPEN: "mdc-dialog--open",
            OPENING: "mdc-dialog--opening",
            SCROLLABLE: "mdc-dialog--scrollable",
            SCROLL_LOCK: "mdc-dialog-scroll-lock",
            STACKED: "mdc-dialog--stacked"
        };
        exports.strings = {
            ACTION_ATTRIBUTE: "data-mdc-dialog-action",
            BUTTON_SELECTOR: ".mdc-dialog__button",
            CLOSED_EVENT: "MDCDialog:closed",
            CLOSE_ACTION: "close",
            CLOSING_EVENT: "MDCDialog:closing",
            CONTAINER_SELECTOR: ".mdc-dialog__container",
            CONTENT_SELECTOR: ".mdc-dialog__content",
            DEFAULT_BUTTON_SELECTOR: ".mdc-dialog__button--default",
            DESTROY_ACTION: "destroy",
            OPENED_EVENT: "MDCDialog:opened",
            OPENING_EVENT: "MDCDialog:opening",
            SCRIM_SELECTOR: ".mdc-dialog__scrim",
            SUPPRESS_DEFAULT_PRESS_SELECTOR: [ "textarea", ".mdc-menu .mdc-list-item" ].join(", "),
            SURFACE_SELECTOR: ".mdc-dialog__surface"
        };
        exports.numbers = {
            DIALOG_ANIMATION_CLOSE_TIME_MS: 75,
            DIALOG_ANIMATION_OPEN_TIME_MS: 150
        };
    }, function(module, exports, __webpack_require__) {
        "use strict";
        var __importDefault = this && this.__importDefault || function(mod) {
            return mod && mod.__esModule ? mod : {
                default: mod
            };
        };
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var focus_trap_1 = __importDefault(__webpack_require__(44));
        function createFocusTrapInstance(surfaceEl, focusTrapFactory) {
            if (focusTrapFactory === void 0) {
                focusTrapFactory = focus_trap_1.default;
            }
            return focusTrapFactory(surfaceEl, {
                clickOutsideDeactivates: true,
                escapeDeactivates: false,
                initialFocus: undefined,
                returnFocusOnDeactivate: false
            });
        }
        exports.createFocusTrapInstance = createFocusTrapInstance;
    }, function(module, exports, __webpack_require__) {
        var tabbable = __webpack_require__(117);
        var xtend = __webpack_require__(118);
        var activeFocusTraps = function() {
            var trapQueue = [];
            return {
                activateTrap: function(trap) {
                    if (trapQueue.length > 0) {
                        var activeTrap = trapQueue[trapQueue.length - 1];
                        if (activeTrap !== trap) {
                            activeTrap.pause();
                        }
                    }
                    var trapIndex = trapQueue.indexOf(trap);
                    if (trapIndex === -1) {
                        trapQueue.push(trap);
                    } else {
                        trapQueue.splice(trapIndex, 1);
                        trapQueue.push(trap);
                    }
                },
                deactivateTrap: function(trap) {
                    var trapIndex = trapQueue.indexOf(trap);
                    if (trapIndex !== -1) {
                        trapQueue.splice(trapIndex, 1);
                    }
                    if (trapQueue.length > 0) {
                        trapQueue[trapQueue.length - 1].unpause();
                    }
                }
            };
        }();
        function focusTrap(element, userOptions) {
            var doc = document;
            var container = typeof element === "string" ? doc.querySelector(element) : element;
            var config = xtend({
                returnFocusOnDeactivate: true,
                escapeDeactivates: true
            }, userOptions);
            var state = {
                firstTabbableNode: null,
                lastTabbableNode: null,
                nodeFocusedBeforeActivation: null,
                mostRecentlyFocusedNode: null,
                active: false,
                paused: false
            };
            var trap = {
                activate: activate,
                deactivate: deactivate,
                pause: pause,
                unpause: unpause
            };
            return trap;
            function activate(activateOptions) {
                if (state.active) return;
                updateTabbableNodes();
                state.active = true;
                state.paused = false;
                state.nodeFocusedBeforeActivation = doc.activeElement;
                var onActivate = activateOptions && activateOptions.onActivate ? activateOptions.onActivate : config.onActivate;
                if (onActivate) {
                    onActivate();
                }
                addListeners();
                return trap;
            }
            function deactivate(deactivateOptions) {
                if (!state.active) return;
                removeListeners();
                state.active = false;
                state.paused = false;
                activeFocusTraps.deactivateTrap(trap);
                var onDeactivate = deactivateOptions && deactivateOptions.onDeactivate !== undefined ? deactivateOptions.onDeactivate : config.onDeactivate;
                if (onDeactivate) {
                    onDeactivate();
                }
                var returnFocus = deactivateOptions && deactivateOptions.returnFocus !== undefined ? deactivateOptions.returnFocus : config.returnFocusOnDeactivate;
                if (returnFocus) {
                    delay(function() {
                        tryFocus(state.nodeFocusedBeforeActivation);
                    });
                }
                return trap;
            }
            function pause() {
                if (state.paused || !state.active) return;
                state.paused = true;
                removeListeners();
            }
            function unpause() {
                if (!state.paused || !state.active) return;
                state.paused = false;
                updateTabbableNodes();
                addListeners();
            }
            function addListeners() {
                if (!state.active) return;
                activeFocusTraps.activateTrap(trap);
                delay(function() {
                    tryFocus(getInitialFocusNode());
                });
                doc.addEventListener("focusin", checkFocusIn, true);
                doc.addEventListener("mousedown", checkPointerDown, {
                    capture: true,
                    passive: false
                });
                doc.addEventListener("touchstart", checkPointerDown, {
                    capture: true,
                    passive: false
                });
                doc.addEventListener("click", checkClick, {
                    capture: true,
                    passive: false
                });
                doc.addEventListener("keydown", checkKey, {
                    capture: true,
                    passive: false
                });
                return trap;
            }
            function removeListeners() {
                if (!state.active) return;
                doc.removeEventListener("focusin", checkFocusIn, true);
                doc.removeEventListener("mousedown", checkPointerDown, true);
                doc.removeEventListener("touchstart", checkPointerDown, true);
                doc.removeEventListener("click", checkClick, true);
                doc.removeEventListener("keydown", checkKey, true);
                return trap;
            }
            function getNodeForOption(optionName) {
                var optionValue = config[optionName];
                var node = optionValue;
                if (!optionValue) {
                    return null;
                }
                if (typeof optionValue === "string") {
                    node = doc.querySelector(optionValue);
                    if (!node) {
                        throw new Error("`" + optionName + "` refers to no known node");
                    }
                }
                if (typeof optionValue === "function") {
                    node = optionValue();
                    if (!node) {
                        throw new Error("`" + optionName + "` did not return a node");
                    }
                }
                return node;
            }
            function getInitialFocusNode() {
                var node;
                if (getNodeForOption("initialFocus") !== null) {
                    node = getNodeForOption("initialFocus");
                } else if (container.contains(doc.activeElement)) {
                    node = doc.activeElement;
                } else {
                    node = state.firstTabbableNode || getNodeForOption("fallbackFocus");
                }
                if (!node) {
                    throw new Error("You can't have a focus-trap without at least one focusable element");
                }
                return node;
            }
            function checkPointerDown(e) {
                if (container.contains(e.target)) return;
                if (config.clickOutsideDeactivates) {
                    deactivate({
                        returnFocus: !tabbable.isFocusable(e.target)
                    });
                } else {
                    e.preventDefault();
                }
            }
            function checkFocusIn(e) {
                if (container.contains(e.target) || e.target instanceof Document) {
                    return;
                }
                e.stopImmediatePropagation();
                tryFocus(state.mostRecentlyFocusedNode || getInitialFocusNode());
            }
            function checkKey(e) {
                if (config.escapeDeactivates !== false && isEscapeEvent(e)) {
                    e.preventDefault();
                    deactivate();
                    return;
                }
                if (isTabEvent(e)) {
                    checkTab(e);
                    return;
                }
            }
            function checkTab(e) {
                updateTabbableNodes();
                if (e.shiftKey && e.target === state.firstTabbableNode) {
                    e.preventDefault();
                    tryFocus(state.lastTabbableNode);
                    return;
                }
                if (!e.shiftKey && e.target === state.lastTabbableNode) {
                    e.preventDefault();
                    tryFocus(state.firstTabbableNode);
                    return;
                }
            }
            function checkClick(e) {
                if (config.clickOutsideDeactivates) return;
                if (container.contains(e.target)) return;
                e.preventDefault();
                e.stopImmediatePropagation();
            }
            function updateTabbableNodes() {
                var tabbableNodes = tabbable(container);
                state.firstTabbableNode = tabbableNodes[0] || getInitialFocusNode();
                state.lastTabbableNode = tabbableNodes[tabbableNodes.length - 1] || getInitialFocusNode();
            }
            function tryFocus(node) {
                if (node === doc.activeElement) return;
                if (!node || !node.focus) {
                    tryFocus(getInitialFocusNode());
                    return;
                }
                node.focus();
                state.mostRecentlyFocusedNode = node;
                if (isSelectableInput(node)) {
                    node.select();
                }
            }
        }
        function isSelectableInput(node) {
            return node.tagName && node.tagName.toLowerCase() === "input" && typeof node.select === "function";
        }
        function isEscapeEvent(e) {
            return e.key === "Escape" || e.key === "Esc" || e.keyCode === 27;
        }
        function isTabEvent(e) {
            return e.key === "Tab" || e.keyCode === 9;
        }
        function delay(fn) {
            return setTimeout(fn, 0);
        }
        module.exports = focusTrap;
    }, function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var cssClasses = {
            ANIMATE: "mdc-drawer--animate",
            CLOSING: "mdc-drawer--closing",
            DISMISSIBLE: "mdc-drawer--dismissible",
            MODAL: "mdc-drawer--modal",
            OPEN: "mdc-drawer--open",
            OPENING: "mdc-drawer--opening",
            ROOT: "mdc-drawer"
        };
        exports.cssClasses = cssClasses;
        var strings = {
            APP_CONTENT_SELECTOR: ".mdc-drawer-app-content",
            CLOSE_EVENT: "MDCDrawer:closed",
            OPEN_EVENT: "MDCDrawer:opened",
            SCRIM_SELECTOR: ".mdc-drawer-scrim"
        };
        exports.strings = strings;
    }, function(module, exports, __webpack_require__) {
        "use strict";
        var __extends = this && this.__extends || function() {
            var _extendStatics = function extendStatics(d, b) {
                _extendStatics = Object.setPrototypeOf || {
                    __proto__: []
                } instanceof Array && function(d, b) {
                    d.__proto__ = b;
                } || function(d, b) {
                    for (var p in b) {
                        if (b.hasOwnProperty(p)) d[p] = b[p];
                    }
                };
                return _extendStatics(d, b);
            };
            return function(d, b) {
                _extendStatics(d, b);
                function __() {
                    this.constructor = d;
                }
                d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
            };
        }();
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var foundation_1 = __webpack_require__(18);
        var MDCModalDrawerFoundation = function(_super) {
            __extends(MDCModalDrawerFoundation, _super);
            function MDCModalDrawerFoundation() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            MDCModalDrawerFoundation.prototype.handleScrimClick = function() {
                this.close();
            };
            MDCModalDrawerFoundation.prototype.opened_ = function() {
                this.adapter_.trapFocus();
            };
            MDCModalDrawerFoundation.prototype.closed_ = function() {
                this.adapter_.releaseFocus();
            };
            return MDCModalDrawerFoundation;
        }(foundation_1.MDCDismissibleDrawerFoundation);
        exports.MDCModalDrawerFoundation = MDCModalDrawerFoundation;
        exports.default = MDCModalDrawerFoundation;
    }, function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports.cssClasses = {
            LABEL_FLOAT_ABOVE: "mdc-floating-label--float-above",
            LABEL_SHAKE: "mdc-floating-label--shake",
            ROOT: "mdc-floating-label"
        };
    }, function(module, exports, __webpack_require__) {
        "use strict";
        var __extends = this && this.__extends || function() {
            var _extendStatics = function extendStatics(d, b) {
                _extendStatics = Object.setPrototypeOf || {
                    __proto__: []
                } instanceof Array && function(d, b) {
                    d.__proto__ = b;
                } || function(d, b) {
                    for (var p in b) {
                        if (b.hasOwnProperty(p)) d[p] = b[p];
                    }
                };
                return _extendStatics(d, b);
            };
            return function(d, b) {
                _extendStatics(d, b);
                function __() {
                    this.constructor = d;
                }
                d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
            };
        }();
        var __assign = this && this.__assign || function() {
            __assign = Object.assign || function(t) {
                for (var s, i = 1, n = arguments.length; i < n; i++) {
                    s = arguments[i];
                    for (var p in s) {
                        if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
                    }
                }
                return t;
            };
            return __assign.apply(this, arguments);
        };
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var foundation_1 = __webpack_require__(0);
        var constants_1 = __webpack_require__(49);
        var MDCFormFieldFoundation = function(_super) {
            __extends(MDCFormFieldFoundation, _super);
            function MDCFormFieldFoundation(adapter) {
                var _this = _super.call(this, __assign({}, MDCFormFieldFoundation.defaultAdapter, adapter)) || this;
                _this.clickHandler_ = function() {
                    return _this.handleClick_();
                };
                return _this;
            }
            Object.defineProperty(MDCFormFieldFoundation, "cssClasses", {
                get: function get() {
                    return constants_1.cssClasses;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MDCFormFieldFoundation, "strings", {
                get: function get() {
                    return constants_1.strings;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MDCFormFieldFoundation, "defaultAdapter", {
                get: function get() {
                    return {
                        activateInputRipple: function activateInputRipple() {
                            return undefined;
                        },
                        deactivateInputRipple: function deactivateInputRipple() {
                            return undefined;
                        },
                        deregisterInteractionHandler: function deregisterInteractionHandler() {
                            return undefined;
                        },
                        registerInteractionHandler: function registerInteractionHandler() {
                            return undefined;
                        }
                    };
                },
                enumerable: true,
                configurable: true
            });
            MDCFormFieldFoundation.prototype.init = function() {
                this.adapter_.registerInteractionHandler("click", this.clickHandler_);
            };
            MDCFormFieldFoundation.prototype.destroy = function() {
                this.adapter_.deregisterInteractionHandler("click", this.clickHandler_);
            };
            MDCFormFieldFoundation.prototype.handleClick_ = function() {
                var _this = this;
                this.adapter_.activateInputRipple();
                requestAnimationFrame(function() {
                    return _this.adapter_.deactivateInputRipple();
                });
            };
            return MDCFormFieldFoundation;
        }(foundation_1.MDCFoundation);
        exports.MDCFormFieldFoundation = MDCFormFieldFoundation;
        exports.default = MDCFormFieldFoundation;
    }, function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports.cssClasses = {
            ROOT: "mdc-form-field"
        };
        exports.strings = {
            LABEL_SELECTOR: ".mdc-form-field > label"
        };
    }, function(module, exports, __webpack_require__) {
        "use strict";
        var __extends = this && this.__extends || function() {
            var _extendStatics = function extendStatics(d, b) {
                _extendStatics = Object.setPrototypeOf || {
                    __proto__: []
                } instanceof Array && function(d, b) {
                    d.__proto__ = b;
                } || function(d, b) {
                    for (var p in b) {
                        if (b.hasOwnProperty(p)) d[p] = b[p];
                    }
                };
                return _extendStatics(d, b);
            };
            return function(d, b) {
                _extendStatics(d, b);
                function __() {
                    this.constructor = d;
                }
                d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
            };
        }();
        var __assign = this && this.__assign || function() {
            __assign = Object.assign || function(t) {
                for (var s, i = 1, n = arguments.length; i < n; i++) {
                    s = arguments[i];
                    for (var p in s) {
                        if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
                    }
                }
                return t;
            };
            return __assign.apply(this, arguments);
        };
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var foundation_1 = __webpack_require__(0);
        var constants_1 = __webpack_require__(51);
        var MDCGridListFoundation = function(_super) {
            __extends(MDCGridListFoundation, _super);
            function MDCGridListFoundation(adapter) {
                var _this = _super.call(this, __assign({}, MDCGridListFoundation.defaultAdapter, adapter)) || this;
                _this.resizeFrame_ = 0;
                _this.resizeHandler_ = _this.alignCenter.bind(_this);
                return _this;
            }
            Object.defineProperty(MDCGridListFoundation, "strings", {
                get: function get() {
                    return constants_1.strings;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MDCGridListFoundation, "defaultAdapter", {
                get: function get() {
                    return {
                        deregisterResizeHandler: function deregisterResizeHandler() {
                            return undefined;
                        },
                        getNumberOfTiles: function getNumberOfTiles() {
                            return 0;
                        },
                        getOffsetWidth: function getOffsetWidth() {
                            return 0;
                        },
                        getOffsetWidthForTileAtIndex: function getOffsetWidthForTileAtIndex() {
                            return 0;
                        },
                        registerResizeHandler: function registerResizeHandler() {
                            return undefined;
                        },
                        setStyleForTilesElement: function setStyleForTilesElement() {
                            return undefined;
                        }
                    };
                },
                enumerable: true,
                configurable: true
            });
            MDCGridListFoundation.prototype.init = function() {
                this.alignCenter();
                this.adapter_.registerResizeHandler(this.resizeHandler_);
            };
            MDCGridListFoundation.prototype.destroy = function() {
                this.adapter_.deregisterResizeHandler(this.resizeHandler_);
            };
            MDCGridListFoundation.prototype.alignCenter = function() {
                var _this = this;
                cancelAnimationFrame(this.resizeFrame_);
                this.resizeFrame_ = requestAnimationFrame(function() {
                    _this.alignCenter_();
                    _this.resizeFrame_ = 0;
                });
            };
            MDCGridListFoundation.prototype.alignCenter_ = function() {
                if (this.adapter_.getNumberOfTiles() === 0) {
                    return;
                }
                var gridWidth = this.adapter_.getOffsetWidth();
                var itemWidth = this.adapter_.getOffsetWidthForTileAtIndex(0);
                var tilesWidth = itemWidth * Math.floor(gridWidth / itemWidth);
                this.adapter_.setStyleForTilesElement("width", tilesWidth + "px");
            };
            return MDCGridListFoundation;
        }(foundation_1.MDCFoundation);
        exports.MDCGridListFoundation = MDCGridListFoundation;
        exports.default = MDCGridListFoundation;
    }, function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports.strings = {
            TILES_SELECTOR: ".mdc-grid-list__tiles",
            TILE_SELECTOR: ".mdc-grid-tile"
        };
    }, function(module, exports, __webpack_require__) {
        "use strict";
        var __extends = this && this.__extends || function() {
            var _extendStatics = function extendStatics(d, b) {
                _extendStatics = Object.setPrototypeOf || {
                    __proto__: []
                } instanceof Array && function(d, b) {
                    d.__proto__ = b;
                } || function(d, b) {
                    for (var p in b) {
                        if (b.hasOwnProperty(p)) d[p] = b[p];
                    }
                };
                return _extendStatics(d, b);
            };
            return function(d, b) {
                _extendStatics(d, b);
                function __() {
                    this.constructor = d;
                }
                d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
            };
        }();
        var __assign = this && this.__assign || function() {
            __assign = Object.assign || function(t) {
                for (var s, i = 1, n = arguments.length; i < n; i++) {
                    s = arguments[i];
                    for (var p in s) {
                        if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
                    }
                }
                return t;
            };
            return __assign.apply(this, arguments);
        };
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var foundation_1 = __webpack_require__(0);
        var constants_1 = __webpack_require__(53);
        var MDCIconButtonToggleFoundation = function(_super) {
            __extends(MDCIconButtonToggleFoundation, _super);
            function MDCIconButtonToggleFoundation(adapter) {
                return _super.call(this, __assign({}, MDCIconButtonToggleFoundation.defaultAdapter, adapter)) || this;
            }
            Object.defineProperty(MDCIconButtonToggleFoundation, "cssClasses", {
                get: function get() {
                    return constants_1.cssClasses;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MDCIconButtonToggleFoundation, "strings", {
                get: function get() {
                    return constants_1.strings;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MDCIconButtonToggleFoundation, "defaultAdapter", {
                get: function get() {
                    return {
                        addClass: function addClass() {
                            return undefined;
                        },
                        hasClass: function hasClass() {
                            return false;
                        },
                        notifyChange: function notifyChange() {
                            return undefined;
                        },
                        removeClass: function removeClass() {
                            return undefined;
                        },
                        setAttr: function setAttr() {
                            return undefined;
                        }
                    };
                },
                enumerable: true,
                configurable: true
            });
            MDCIconButtonToggleFoundation.prototype.init = function() {
                this.adapter_.setAttr(constants_1.strings.ARIA_PRESSED, "" + this.isOn());
            };
            MDCIconButtonToggleFoundation.prototype.handleClick = function() {
                this.toggle();
                this.adapter_.notifyChange({
                    isOn: this.isOn()
                });
            };
            MDCIconButtonToggleFoundation.prototype.isOn = function() {
                return this.adapter_.hasClass(constants_1.cssClasses.ICON_BUTTON_ON);
            };
            MDCIconButtonToggleFoundation.prototype.toggle = function(isOn) {
                if (isOn === void 0) {
                    isOn = !this.isOn();
                }
                if (isOn) {
                    this.adapter_.addClass(constants_1.cssClasses.ICON_BUTTON_ON);
                } else {
                    this.adapter_.removeClass(constants_1.cssClasses.ICON_BUTTON_ON);
                }
                this.adapter_.setAttr(constants_1.strings.ARIA_PRESSED, "" + isOn);
            };
            return MDCIconButtonToggleFoundation;
        }(foundation_1.MDCFoundation);
        exports.MDCIconButtonToggleFoundation = MDCIconButtonToggleFoundation;
        exports.default = MDCIconButtonToggleFoundation;
    }, function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports.cssClasses = {
            ICON_BUTTON_ON: "mdc-icon-button--on",
            ROOT: "mdc-icon-button"
        };
        exports.strings = {
            ARIA_PRESSED: "aria-pressed",
            CHANGE_EVENT: "MDCIconButtonToggle:change"
        };
    }, function(module, exports, __webpack_require__) {
        "use strict";
        var __extends = this && this.__extends || function() {
            var _extendStatics = function extendStatics(d, b) {
                _extendStatics = Object.setPrototypeOf || {
                    __proto__: []
                } instanceof Array && function(d, b) {
                    d.__proto__ = b;
                } || function(d, b) {
                    for (var p in b) {
                        if (b.hasOwnProperty(p)) d[p] = b[p];
                    }
                };
                return _extendStatics(d, b);
            };
            return function(d, b) {
                _extendStatics(d, b);
                function __() {
                    this.constructor = d;
                }
                d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
            };
        }();
        var __assign = this && this.__assign || function() {
            __assign = Object.assign || function(t) {
                for (var s, i = 1, n = arguments.length; i < n; i++) {
                    s = arguments[i];
                    for (var p in s) {
                        if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
                    }
                }
                return t;
            };
            return __assign.apply(this, arguments);
        };
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var foundation_1 = __webpack_require__(0);
        var constants_1 = __webpack_require__(55);
        var MDCLineRippleFoundation = function(_super) {
            __extends(MDCLineRippleFoundation, _super);
            function MDCLineRippleFoundation(adapter) {
                var _this = _super.call(this, __assign({}, MDCLineRippleFoundation.defaultAdapter, adapter)) || this;
                _this.transitionEndHandler_ = function(evt) {
                    return _this.handleTransitionEnd(evt);
                };
                return _this;
            }
            Object.defineProperty(MDCLineRippleFoundation, "cssClasses", {
                get: function get() {
                    return constants_1.cssClasses;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MDCLineRippleFoundation, "defaultAdapter", {
                get: function get() {
                    return {
                        addClass: function addClass() {
                            return undefined;
                        },
                        removeClass: function removeClass() {
                            return undefined;
                        },
                        hasClass: function hasClass() {
                            return false;
                        },
                        setStyle: function setStyle() {
                            return undefined;
                        },
                        registerEventHandler: function registerEventHandler() {
                            return undefined;
                        },
                        deregisterEventHandler: function deregisterEventHandler() {
                            return undefined;
                        }
                    };
                },
                enumerable: true,
                configurable: true
            });
            MDCLineRippleFoundation.prototype.init = function() {
                this.adapter_.registerEventHandler("transitionend", this.transitionEndHandler_);
            };
            MDCLineRippleFoundation.prototype.destroy = function() {
                this.adapter_.deregisterEventHandler("transitionend", this.transitionEndHandler_);
            };
            MDCLineRippleFoundation.prototype.activate = function() {
                this.adapter_.removeClass(constants_1.cssClasses.LINE_RIPPLE_DEACTIVATING);
                this.adapter_.addClass(constants_1.cssClasses.LINE_RIPPLE_ACTIVE);
            };
            MDCLineRippleFoundation.prototype.setRippleCenter = function(xCoordinate) {
                this.adapter_.setStyle("transform-origin", xCoordinate + "px center");
            };
            MDCLineRippleFoundation.prototype.deactivate = function() {
                this.adapter_.addClass(constants_1.cssClasses.LINE_RIPPLE_DEACTIVATING);
            };
            MDCLineRippleFoundation.prototype.handleTransitionEnd = function(evt) {
                var isDeactivating = this.adapter_.hasClass(constants_1.cssClasses.LINE_RIPPLE_DEACTIVATING);
                if (evt.propertyName === "opacity") {
                    if (isDeactivating) {
                        this.adapter_.removeClass(constants_1.cssClasses.LINE_RIPPLE_ACTIVE);
                        this.adapter_.removeClass(constants_1.cssClasses.LINE_RIPPLE_DEACTIVATING);
                    }
                }
            };
            return MDCLineRippleFoundation;
        }(foundation_1.MDCFoundation);
        exports.MDCLineRippleFoundation = MDCLineRippleFoundation;
        exports.default = MDCLineRippleFoundation;
    }, function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var cssClasses = {
            LINE_RIPPLE_ACTIVE: "mdc-line-ripple--active",
            LINE_RIPPLE_DEACTIVATING: "mdc-line-ripple--deactivating"
        };
        exports.cssClasses = cssClasses;
    }, function(module, exports, __webpack_require__) {
        "use strict";
        var __extends = this && this.__extends || function() {
            var _extendStatics = function extendStatics(d, b) {
                _extendStatics = Object.setPrototypeOf || {
                    __proto__: []
                } instanceof Array && function(d, b) {
                    d.__proto__ = b;
                } || function(d, b) {
                    for (var p in b) {
                        if (b.hasOwnProperty(p)) d[p] = b[p];
                    }
                };
                return _extendStatics(d, b);
            };
            return function(d, b) {
                _extendStatics(d, b);
                function __() {
                    this.constructor = d;
                }
                d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
            };
        }();
        var __assign = this && this.__assign || function() {
            __assign = Object.assign || function(t) {
                for (var s, i = 1, n = arguments.length; i < n; i++) {
                    s = arguments[i];
                    for (var p in s) {
                        if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
                    }
                }
                return t;
            };
            return __assign.apply(this, arguments);
        };
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var util_1 = __webpack_require__(12);
        var foundation_1 = __webpack_require__(0);
        var constants_1 = __webpack_require__(57);
        var MDCLinearProgressFoundation = function(_super) {
            __extends(MDCLinearProgressFoundation, _super);
            function MDCLinearProgressFoundation(adapter) {
                return _super.call(this, __assign({}, MDCLinearProgressFoundation.defaultAdapter, adapter)) || this;
            }
            Object.defineProperty(MDCLinearProgressFoundation, "cssClasses", {
                get: function get() {
                    return constants_1.cssClasses;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MDCLinearProgressFoundation, "strings", {
                get: function get() {
                    return constants_1.strings;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MDCLinearProgressFoundation, "defaultAdapter", {
                get: function get() {
                    return {
                        addClass: function addClass() {
                            return undefined;
                        },
                        getBuffer: function getBuffer() {
                            return null;
                        },
                        getPrimaryBar: function getPrimaryBar() {
                            return null;
                        },
                        hasClass: function hasClass() {
                            return false;
                        },
                        removeClass: function removeClass() {
                            return undefined;
                        },
                        setStyle: function setStyle() {
                            return undefined;
                        }
                    };
                },
                enumerable: true,
                configurable: true
            });
            MDCLinearProgressFoundation.prototype.init = function() {
                this.isDeterminate_ = !this.adapter_.hasClass(constants_1.cssClasses.INDETERMINATE_CLASS);
                this.isReversed_ = this.adapter_.hasClass(constants_1.cssClasses.REVERSED_CLASS);
                this.progress_ = 0;
            };
            MDCLinearProgressFoundation.prototype.setDeterminate = function(isDeterminate) {
                this.isDeterminate_ = isDeterminate;
                if (this.isDeterminate_) {
                    this.adapter_.removeClass(constants_1.cssClasses.INDETERMINATE_CLASS);
                    this.setScale_(this.adapter_.getPrimaryBar(), this.progress_);
                } else {
                    this.adapter_.addClass(constants_1.cssClasses.INDETERMINATE_CLASS);
                    this.setScale_(this.adapter_.getPrimaryBar(), 1);
                    this.setScale_(this.adapter_.getBuffer(), 1);
                }
            };
            MDCLinearProgressFoundation.prototype.setProgress = function(value) {
                this.progress_ = value;
                if (this.isDeterminate_) {
                    this.setScale_(this.adapter_.getPrimaryBar(), value);
                }
            };
            MDCLinearProgressFoundation.prototype.setBuffer = function(value) {
                if (this.isDeterminate_) {
                    this.setScale_(this.adapter_.getBuffer(), value);
                }
            };
            MDCLinearProgressFoundation.prototype.setReverse = function(isReversed) {
                this.isReversed_ = isReversed;
                if (this.isReversed_) {
                    this.adapter_.addClass(constants_1.cssClasses.REVERSED_CLASS);
                } else {
                    this.adapter_.removeClass(constants_1.cssClasses.REVERSED_CLASS);
                }
            };
            MDCLinearProgressFoundation.prototype.open = function() {
                this.adapter_.removeClass(constants_1.cssClasses.CLOSED_CLASS);
            };
            MDCLinearProgressFoundation.prototype.close = function() {
                this.adapter_.addClass(constants_1.cssClasses.CLOSED_CLASS);
            };
            MDCLinearProgressFoundation.prototype.setScale_ = function(el, scaleValue) {
                if (!el) {
                    return;
                }
                var value = "scaleX(" + scaleValue + ")";
                this.adapter_.setStyle(el, util_1.getCorrectPropertyName(window, "transform"), value);
            };
            return MDCLinearProgressFoundation;
        }(foundation_1.MDCFoundation);
        exports.MDCLinearProgressFoundation = MDCLinearProgressFoundation;
        exports.default = MDCLinearProgressFoundation;
    }, function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports.cssClasses = {
            CLOSED_CLASS: "mdc-linear-progress--closed",
            INDETERMINATE_CLASS: "mdc-linear-progress--indeterminate",
            REVERSED_CLASS: "mdc-linear-progress--reversed"
        };
        exports.strings = {
            BUFFER_SELECTOR: ".mdc-linear-progress__buffer",
            PRIMARY_BAR_SELECTOR: ".mdc-linear-progress__primary-bar"
        };
    }, function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var cachedCssTransformPropertyName_;
        function getTransformPropertyName(globalObj, forceRefresh) {
            if (forceRefresh === void 0) {
                forceRefresh = false;
            }
            if (cachedCssTransformPropertyName_ === undefined || forceRefresh) {
                var el = globalObj.document.createElement("div");
                cachedCssTransformPropertyName_ = "transform" in el.style ? "transform" : "webkitTransform";
            }
            return cachedCssTransformPropertyName_;
        }
        exports.getTransformPropertyName = getTransformPropertyName;
    }, function(module, exports, __webpack_require__) {
        "use strict";
        var __extends = this && this.__extends || function() {
            var _extendStatics = function extendStatics(d, b) {
                _extendStatics = Object.setPrototypeOf || {
                    __proto__: []
                } instanceof Array && function(d, b) {
                    d.__proto__ = b;
                } || function(d, b) {
                    for (var p in b) {
                        if (b.hasOwnProperty(p)) d[p] = b[p];
                    }
                };
                return _extendStatics(d, b);
            };
            return function(d, b) {
                _extendStatics(d, b);
                function __() {
                    this.constructor = d;
                }
                d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
            };
        }();
        var __importStar = this && this.__importStar || function(mod) {
            if (mod && mod.__esModule) return mod;
            var result = {};
            if (mod != null) for (var k in mod) {
                if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
            }
            result["default"] = mod;
            return result;
        };
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var component_1 = __webpack_require__(1);
        var constants_1 = __webpack_require__(5);
        var foundation_1 = __webpack_require__(8);
        var util = __importStar(__webpack_require__(58));
        var MDCMenuSurface = function(_super) {
            __extends(MDCMenuSurface, _super);
            function MDCMenuSurface() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            MDCMenuSurface.attachTo = function(root) {
                return new MDCMenuSurface(root);
            };
            MDCMenuSurface.prototype.initialSyncWithDOM = function() {
                var _this = this;
                var parentEl = this.root_.parentElement;
                this.anchorElement = parentEl && parentEl.classList.contains(constants_1.cssClasses.ANCHOR) ? parentEl : null;
                if (this.root_.classList.contains(constants_1.cssClasses.FIXED)) {
                    this.setFixedPosition(true);
                }
                this.handleKeydown_ = function(evt) {
                    return _this.foundation_.handleKeydown(evt);
                };
                this.handleBodyClick_ = function(evt) {
                    return _this.foundation_.handleBodyClick(evt);
                };
                this.registerBodyClickListener_ = function() {
                    return document.body.addEventListener("click", _this.handleBodyClick_);
                };
                this.deregisterBodyClickListener_ = function() {
                    return document.body.removeEventListener("click", _this.handleBodyClick_);
                };
                this.listen("keydown", this.handleKeydown_);
                this.listen(constants_1.strings.OPENED_EVENT, this.registerBodyClickListener_);
                this.listen(constants_1.strings.CLOSED_EVENT, this.deregisterBodyClickListener_);
            };
            MDCMenuSurface.prototype.destroy = function() {
                this.unlisten("keydown", this.handleKeydown_);
                this.unlisten(constants_1.strings.OPENED_EVENT, this.registerBodyClickListener_);
                this.unlisten(constants_1.strings.CLOSED_EVENT, this.deregisterBodyClickListener_);
                _super.prototype.destroy.call(this);
            };
            Object.defineProperty(MDCMenuSurface.prototype, "open", {
                get: function get() {
                    return this.foundation_.isOpen();
                },
                set: function set(value) {
                    if (value) {
                        var focusableElements = this.root_.querySelectorAll(constants_1.strings.FOCUSABLE_ELEMENTS);
                        this.firstFocusableElement_ = focusableElements[0];
                        this.lastFocusableElement_ = focusableElements[focusableElements.length - 1];
                        this.foundation_.open();
                    } else {
                        this.foundation_.close();
                    }
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MDCMenuSurface.prototype, "quickOpen", {
                set: function set(quickOpen) {
                    this.foundation_.setQuickOpen(quickOpen);
                },
                enumerable: true,
                configurable: true
            });
            MDCMenuSurface.prototype.hoistMenuToBody = function() {
                document.body.appendChild(this.root_);
                this.setIsHoisted(true);
            };
            MDCMenuSurface.prototype.setIsHoisted = function(isHoisted) {
                this.foundation_.setIsHoisted(isHoisted);
            };
            MDCMenuSurface.prototype.setMenuSurfaceAnchorElement = function(element) {
                this.anchorElement = element;
            };
            MDCMenuSurface.prototype.setFixedPosition = function(isFixed) {
                if (isFixed) {
                    this.root_.classList.add(constants_1.cssClasses.FIXED);
                } else {
                    this.root_.classList.remove(constants_1.cssClasses.FIXED);
                }
                this.foundation_.setFixedPosition(isFixed);
            };
            MDCMenuSurface.prototype.setAbsolutePosition = function(x, y) {
                this.foundation_.setAbsolutePosition(x, y);
                this.setIsHoisted(true);
            };
            MDCMenuSurface.prototype.setAnchorCorner = function(corner) {
                this.foundation_.setAnchorCorner(corner);
            };
            MDCMenuSurface.prototype.setAnchorMargin = function(margin) {
                this.foundation_.setAnchorMargin(margin);
            };
            MDCMenuSurface.prototype.getDefaultFoundation = function() {
                var _this = this;
                var adapter = {
                    addClass: function addClass(className) {
                        return _this.root_.classList.add(className);
                    },
                    removeClass: function removeClass(className) {
                        return _this.root_.classList.remove(className);
                    },
                    hasClass: function hasClass(className) {
                        return _this.root_.classList.contains(className);
                    },
                    hasAnchor: function hasAnchor() {
                        return !!_this.anchorElement;
                    },
                    notifyClose: function notifyClose() {
                        return _this.emit(foundation_1.MDCMenuSurfaceFoundation.strings.CLOSED_EVENT, {});
                    },
                    notifyOpen: function notifyOpen() {
                        return _this.emit(foundation_1.MDCMenuSurfaceFoundation.strings.OPENED_EVENT, {});
                    },
                    isElementInContainer: function isElementInContainer(el) {
                        return _this.root_.contains(el);
                    },
                    isRtl: function isRtl() {
                        return getComputedStyle(_this.root_).getPropertyValue("direction") === "rtl";
                    },
                    setTransformOrigin: function setTransformOrigin(origin) {
                        var propertyName = util.getTransformPropertyName(window) + "-origin";
                        _this.root_.style.setProperty(propertyName, origin);
                    },
                    isFocused: function isFocused() {
                        return document.activeElement === _this.root_;
                    },
                    saveFocus: function saveFocus() {
                        _this.previousFocus_ = document.activeElement;
                    },
                    restoreFocus: function restoreFocus() {
                        if (_this.root_.contains(document.activeElement)) {
                            if (_this.previousFocus_ && _this.previousFocus_.focus) {
                                _this.previousFocus_.focus();
                            }
                        }
                    },
                    isFirstElementFocused: function isFirstElementFocused() {
                        return _this.firstFocusableElement_ ? _this.firstFocusableElement_ === document.activeElement : false;
                    },
                    isLastElementFocused: function isLastElementFocused() {
                        return _this.lastFocusableElement_ ? _this.lastFocusableElement_ === document.activeElement : false;
                    },
                    focusFirstElement: function focusFirstElement() {
                        return _this.firstFocusableElement_ && _this.firstFocusableElement_.focus && _this.firstFocusableElement_.focus();
                    },
                    focusLastElement: function focusLastElement() {
                        return _this.lastFocusableElement_ && _this.lastFocusableElement_.focus && _this.lastFocusableElement_.focus();
                    },
                    getInnerDimensions: function getInnerDimensions() {
                        return {
                            width: _this.root_.offsetWidth,
                            height: _this.root_.offsetHeight
                        };
                    },
                    getAnchorDimensions: function getAnchorDimensions() {
                        return _this.anchorElement ? _this.anchorElement.getBoundingClientRect() : null;
                    },
                    getWindowDimensions: function getWindowDimensions() {
                        return {
                            width: window.innerWidth,
                            height: window.innerHeight
                        };
                    },
                    getBodyDimensions: function getBodyDimensions() {
                        return {
                            width: document.body.clientWidth,
                            height: document.body.clientHeight
                        };
                    },
                    getWindowScroll: function getWindowScroll() {
                        return {
                            x: window.pageXOffset,
                            y: window.pageYOffset
                        };
                    },
                    setPosition: function setPosition(position) {
                        _this.root_.style.left = "left" in position ? position.left + "px" : "";
                        _this.root_.style.right = "right" in position ? position.right + "px" : "";
                        _this.root_.style.top = "top" in position ? position.top + "px" : "";
                        _this.root_.style.bottom = "bottom" in position ? position.bottom + "px" : "";
                    },
                    setMaxHeight: function setMaxHeight(height) {
                        _this.root_.style.maxHeight = height;
                    }
                };
                return new foundation_1.MDCMenuSurfaceFoundation(adapter);
            };
            return MDCMenuSurface;
        }(component_1.MDCComponent);
        exports.MDCMenuSurface = MDCMenuSurface;
    }, function(module, exports, __webpack_require__) {
        "use strict";
        var __extends = this && this.__extends || function() {
            var _extendStatics = function extendStatics(d, b) {
                _extendStatics = Object.setPrototypeOf || {
                    __proto__: []
                } instanceof Array && function(d, b) {
                    d.__proto__ = b;
                } || function(d, b) {
                    for (var p in b) {
                        if (b.hasOwnProperty(p)) d[p] = b[p];
                    }
                };
                return _extendStatics(d, b);
            };
            return function(d, b) {
                _extendStatics(d, b);
                function __() {
                    this.constructor = d;
                }
                d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
            };
        }();
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var component_1 = __webpack_require__(1);
        var component_2 = __webpack_require__(16);
        var foundation_1 = __webpack_require__(7);
        var component_3 = __webpack_require__(59);
        var foundation_2 = __webpack_require__(8);
        var constants_1 = __webpack_require__(9);
        var foundation_3 = __webpack_require__(61);
        var MDCMenu = function(_super) {
            __extends(MDCMenu, _super);
            function MDCMenu() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            MDCMenu.attachTo = function(root) {
                return new MDCMenu(root);
            };
            MDCMenu.prototype.initialize = function(menuSurfaceFactory, listFactory) {
                if (menuSurfaceFactory === void 0) {
                    menuSurfaceFactory = function menuSurfaceFactory(el) {
                        return new component_3.MDCMenuSurface(el);
                    };
                }
                if (listFactory === void 0) {
                    listFactory = function listFactory(el) {
                        return new component_2.MDCList(el);
                    };
                }
                this.menuSurfaceFactory_ = menuSurfaceFactory;
                this.listFactory_ = listFactory;
            };
            MDCMenu.prototype.initialSyncWithDOM = function() {
                var _this = this;
                this.menuSurface_ = this.menuSurfaceFactory_(this.root_);
                var list = this.root_.querySelector(constants_1.strings.LIST_SELECTOR);
                if (list) {
                    this.list_ = this.listFactory_(list);
                    this.list_.wrapFocus = true;
                } else {
                    this.list_ = null;
                }
                this.handleKeydown_ = function(evt) {
                    return _this.foundation_.handleKeydown(evt);
                };
                this.handleItemAction_ = function(evt) {
                    return _this.foundation_.handleItemAction(_this.items[evt.detail.index]);
                };
                this.handleMenuSurfaceOpened_ = function() {
                    return _this.foundation_.handleMenuSurfaceOpened();
                };
                this.menuSurface_.listen(foundation_2.MDCMenuSurfaceFoundation.strings.OPENED_EVENT, this.handleMenuSurfaceOpened_);
                this.listen("keydown", this.handleKeydown_);
                this.listen(foundation_1.MDCListFoundation.strings.ACTION_EVENT, this.handleItemAction_);
            };
            MDCMenu.prototype.destroy = function() {
                if (this.list_) {
                    this.list_.destroy();
                }
                this.menuSurface_.destroy();
                this.menuSurface_.unlisten(foundation_2.MDCMenuSurfaceFoundation.strings.OPENED_EVENT, this.handleMenuSurfaceOpened_);
                this.unlisten("keydown", this.handleKeydown_);
                this.unlisten(foundation_1.MDCListFoundation.strings.ACTION_EVENT, this.handleItemAction_);
                _super.prototype.destroy.call(this);
            };
            Object.defineProperty(MDCMenu.prototype, "open", {
                get: function get() {
                    return this.menuSurface_.open;
                },
                set: function set(value) {
                    this.menuSurface_.open = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MDCMenu.prototype, "wrapFocus", {
                get: function get() {
                    return this.list_ ? this.list_.wrapFocus : false;
                },
                set: function set(value) {
                    if (this.list_) {
                        this.list_.wrapFocus = value;
                    }
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MDCMenu.prototype, "items", {
                get: function get() {
                    return this.list_ ? this.list_.listElements : [];
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MDCMenu.prototype, "quickOpen", {
                set: function set(quickOpen) {
                    this.menuSurface_.quickOpen = quickOpen;
                },
                enumerable: true,
                configurable: true
            });
            MDCMenu.prototype.setDefaultFocusState = function(focusState) {
                this.foundation_.setDefaultFocusState(focusState);
            };
            MDCMenu.prototype.setAnchorCorner = function(corner) {
                this.menuSurface_.setAnchorCorner(corner);
            };
            MDCMenu.prototype.setAnchorMargin = function(margin) {
                this.menuSurface_.setAnchorMargin(margin);
            };
            MDCMenu.prototype.getOptionByIndex = function(index) {
                var items = this.items;
                if (index < items.length) {
                    return this.items[index];
                } else {
                    return null;
                }
            };
            MDCMenu.prototype.setFixedPosition = function(isFixed) {
                this.menuSurface_.setFixedPosition(isFixed);
            };
            MDCMenu.prototype.hoistMenuToBody = function() {
                this.menuSurface_.hoistMenuToBody();
            };
            MDCMenu.prototype.setIsHoisted = function(isHoisted) {
                this.menuSurface_.setIsHoisted(isHoisted);
            };
            MDCMenu.prototype.setAbsolutePosition = function(x, y) {
                this.menuSurface_.setAbsolutePosition(x, y);
            };
            MDCMenu.prototype.setAnchorElement = function(element) {
                this.menuSurface_.anchorElement = element;
            };
            MDCMenu.prototype.getDefaultFoundation = function() {
                var _this = this;
                var adapter = {
                    addClassToElementAtIndex: function addClassToElementAtIndex(index, className) {
                        var list = _this.items;
                        list[index].classList.add(className);
                    },
                    removeClassFromElementAtIndex: function removeClassFromElementAtIndex(index, className) {
                        var list = _this.items;
                        list[index].classList.remove(className);
                    },
                    addAttributeToElementAtIndex: function addAttributeToElementAtIndex(index, attr, value) {
                        var list = _this.items;
                        list[index].setAttribute(attr, value);
                    },
                    removeAttributeFromElementAtIndex: function removeAttributeFromElementAtIndex(index, attr) {
                        var list = _this.items;
                        list[index].removeAttribute(attr);
                    },
                    elementContainsClass: function elementContainsClass(element, className) {
                        return element.classList.contains(className);
                    },
                    closeSurface: function closeSurface() {
                        return _this.open = false;
                    },
                    getElementIndex: function getElementIndex(element) {
                        return _this.items.indexOf(element);
                    },
                    getParentElement: function getParentElement(element) {
                        return element.parentElement;
                    },
                    getSelectedElementIndex: function getSelectedElementIndex(selectionGroup) {
                        var selectedListItem = selectionGroup.querySelector("." + constants_1.cssClasses.MENU_SELECTED_LIST_ITEM);
                        return selectedListItem ? _this.items.indexOf(selectedListItem) : -1;
                    },
                    notifySelected: function notifySelected(evtData) {
                        return _this.emit(constants_1.strings.SELECTED_EVENT, {
                            index: evtData.index,
                            item: _this.items[evtData.index]
                        });
                    },
                    getMenuItemCount: function getMenuItemCount() {
                        return _this.items.length;
                    },
                    focusItemAtIndex: function focusItemAtIndex(index) {
                        return _this.items[index].focus();
                    },
                    focusListRoot: function focusListRoot() {
                        return _this.root_.querySelector(constants_1.strings.LIST_SELECTOR).focus();
                    }
                };
                return new foundation_3.MDCMenuFoundation(adapter);
            };
            return MDCMenu;
        }(component_1.MDCComponent);
        exports.MDCMenu = MDCMenu;
    }, function(module, exports, __webpack_require__) {
        "use strict";
        var __extends = this && this.__extends || function() {
            var _extendStatics = function extendStatics(d, b) {
                _extendStatics = Object.setPrototypeOf || {
                    __proto__: []
                } instanceof Array && function(d, b) {
                    d.__proto__ = b;
                } || function(d, b) {
                    for (var p in b) {
                        if (b.hasOwnProperty(p)) d[p] = b[p];
                    }
                };
                return _extendStatics(d, b);
            };
            return function(d, b) {
                _extendStatics(d, b);
                function __() {
                    this.constructor = d;
                }
                d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
            };
        }();
        var __assign = this && this.__assign || function() {
            __assign = Object.assign || function(t) {
                for (var s, i = 1, n = arguments.length; i < n; i++) {
                    s = arguments[i];
                    for (var p in s) {
                        if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
                    }
                }
                return t;
            };
            return __assign.apply(this, arguments);
        };
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var foundation_1 = __webpack_require__(0);
        var foundation_2 = __webpack_require__(7);
        var foundation_3 = __webpack_require__(8);
        var constants_1 = __webpack_require__(9);
        var MDCMenuFoundation = function(_super) {
            __extends(MDCMenuFoundation, _super);
            function MDCMenuFoundation(adapter) {
                var _this = _super.call(this, __assign({}, MDCMenuFoundation.defaultAdapter, adapter)) || this;
                _this.closeAnimationEndTimerId_ = 0;
                _this.defaultFocusState_ = constants_1.DefaultFocusState.LIST_ROOT;
                return _this;
            }
            Object.defineProperty(MDCMenuFoundation, "cssClasses", {
                get: function get() {
                    return constants_1.cssClasses;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MDCMenuFoundation, "strings", {
                get: function get() {
                    return constants_1.strings;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MDCMenuFoundation, "numbers", {
                get: function get() {
                    return constants_1.numbers;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MDCMenuFoundation, "defaultAdapter", {
                get: function get() {
                    return {
                        addClassToElementAtIndex: function addClassToElementAtIndex() {
                            return undefined;
                        },
                        removeClassFromElementAtIndex: function removeClassFromElementAtIndex() {
                            return undefined;
                        },
                        addAttributeToElementAtIndex: function addAttributeToElementAtIndex() {
                            return undefined;
                        },
                        removeAttributeFromElementAtIndex: function removeAttributeFromElementAtIndex() {
                            return undefined;
                        },
                        elementContainsClass: function elementContainsClass() {
                            return false;
                        },
                        closeSurface: function closeSurface() {
                            return undefined;
                        },
                        getElementIndex: function getElementIndex() {
                            return -1;
                        },
                        getParentElement: function getParentElement() {
                            return null;
                        },
                        getSelectedElementIndex: function getSelectedElementIndex() {
                            return -1;
                        },
                        notifySelected: function notifySelected() {
                            return undefined;
                        },
                        getMenuItemCount: function getMenuItemCount() {
                            return 0;
                        },
                        focusItemAtIndex: function focusItemAtIndex() {
                            return undefined;
                        },
                        focusListRoot: function focusListRoot() {
                            return undefined;
                        }
                    };
                },
                enumerable: true,
                configurable: true
            });
            MDCMenuFoundation.prototype.destroy = function() {
                if (this.closeAnimationEndTimerId_) {
                    clearTimeout(this.closeAnimationEndTimerId_);
                }
                this.adapter_.closeSurface();
            };
            MDCMenuFoundation.prototype.handleKeydown = function(evt) {
                var key = evt.key, keyCode = evt.keyCode;
                var isTab = key === "Tab" || keyCode === 9;
                if (isTab) {
                    this.adapter_.closeSurface();
                }
            };
            MDCMenuFoundation.prototype.handleItemAction = function(listItem) {
                var _this = this;
                var index = this.adapter_.getElementIndex(listItem);
                if (index < 0) {
                    return;
                }
                this.adapter_.notifySelected({
                    index: index
                });
                this.adapter_.closeSurface();
                this.closeAnimationEndTimerId_ = setTimeout(function() {
                    var selectionGroup = _this.getSelectionGroup_(listItem);
                    if (selectionGroup) {
                        _this.handleSelectionGroup_(selectionGroup, index);
                    }
                }, foundation_3.MDCMenuSurfaceFoundation.numbers.TRANSITION_CLOSE_DURATION);
            };
            MDCMenuFoundation.prototype.handleMenuSurfaceOpened = function() {
                switch (this.defaultFocusState_) {
                  case constants_1.DefaultFocusState.FIRST_ITEM:
                    this.adapter_.focusItemAtIndex(0);
                    break;

                  case constants_1.DefaultFocusState.LAST_ITEM:
                    this.adapter_.focusItemAtIndex(this.adapter_.getMenuItemCount() - 1);
                    break;

                  case constants_1.DefaultFocusState.NONE:
                    break;

                  default:
                    this.adapter_.focusListRoot();
                    break;
                }
            };
            MDCMenuFoundation.prototype.setDefaultFocusState = function(focusState) {
                this.defaultFocusState_ = focusState;
            };
            MDCMenuFoundation.prototype.handleSelectionGroup_ = function(selectionGroup, index) {
                var selectedIndex = this.adapter_.getSelectedElementIndex(selectionGroup);
                if (selectedIndex >= 0) {
                    this.adapter_.removeAttributeFromElementAtIndex(selectedIndex, constants_1.strings.ARIA_SELECTED_ATTR);
                    this.adapter_.removeClassFromElementAtIndex(selectedIndex, constants_1.cssClasses.MENU_SELECTED_LIST_ITEM);
                }
                this.adapter_.addClassToElementAtIndex(index, constants_1.cssClasses.MENU_SELECTED_LIST_ITEM);
                this.adapter_.addAttributeToElementAtIndex(index, constants_1.strings.ARIA_SELECTED_ATTR, "true");
            };
            MDCMenuFoundation.prototype.getSelectionGroup_ = function(listItem) {
                var parent = this.adapter_.getParentElement(listItem);
                if (!parent) {
                    return null;
                }
                var isGroup = this.adapter_.elementContainsClass(parent, constants_1.cssClasses.MENU_SELECTION_GROUP);
                while (!isGroup && parent && !this.adapter_.elementContainsClass(parent, foundation_2.MDCListFoundation.cssClasses.ROOT)) {
                    parent = this.adapter_.getParentElement(parent);
                    isGroup = parent ? this.adapter_.elementContainsClass(parent, constants_1.cssClasses.MENU_SELECTION_GROUP) : false;
                }
                if (isGroup) {
                    return parent;
                } else {
                    return null;
                }
            };
            return MDCMenuFoundation;
        }(foundation_1.MDCFoundation);
        exports.MDCMenuFoundation = MDCMenuFoundation;
        exports.default = MDCMenuFoundation;
    }, function(module, exports, __webpack_require__) {
        "use strict";
        var __extends = this && this.__extends || function() {
            var _extendStatics = function extendStatics(d, b) {
                _extendStatics = Object.setPrototypeOf || {
                    __proto__: []
                } instanceof Array && function(d, b) {
                    d.__proto__ = b;
                } || function(d, b) {
                    for (var p in b) {
                        if (b.hasOwnProperty(p)) d[p] = b[p];
                    }
                };
                return _extendStatics(d, b);
            };
            return function(d, b) {
                _extendStatics(d, b);
                function __() {
                    this.constructor = d;
                }
                d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
            };
        }();
        var __assign = this && this.__assign || function() {
            __assign = Object.assign || function(t) {
                for (var s, i = 1, n = arguments.length; i < n; i++) {
                    s = arguments[i];
                    for (var p in s) {
                        if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
                    }
                }
                return t;
            };
            return __assign.apply(this, arguments);
        };
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var foundation_1 = __webpack_require__(0);
        var constants_1 = __webpack_require__(23);
        var MDCNotchedOutlineFoundation = function(_super) {
            __extends(MDCNotchedOutlineFoundation, _super);
            function MDCNotchedOutlineFoundation(adapter) {
                return _super.call(this, __assign({}, MDCNotchedOutlineFoundation.defaultAdapter, adapter)) || this;
            }
            Object.defineProperty(MDCNotchedOutlineFoundation, "strings", {
                get: function get() {
                    return constants_1.strings;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MDCNotchedOutlineFoundation, "cssClasses", {
                get: function get() {
                    return constants_1.cssClasses;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MDCNotchedOutlineFoundation, "numbers", {
                get: function get() {
                    return constants_1.numbers;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MDCNotchedOutlineFoundation, "defaultAdapter", {
                get: function get() {
                    return {
                        addClass: function addClass() {
                            return undefined;
                        },
                        removeClass: function removeClass() {
                            return undefined;
                        },
                        setNotchWidthProperty: function setNotchWidthProperty() {
                            return undefined;
                        },
                        removeNotchWidthProperty: function removeNotchWidthProperty() {
                            return undefined;
                        }
                    };
                },
                enumerable: true,
                configurable: true
            });
            MDCNotchedOutlineFoundation.prototype.notch = function(notchWidth) {
                var OUTLINE_NOTCHED = MDCNotchedOutlineFoundation.cssClasses.OUTLINE_NOTCHED;
                if (notchWidth > 0) {
                    notchWidth += constants_1.numbers.NOTCH_ELEMENT_PADDING;
                }
                this.adapter_.setNotchWidthProperty(notchWidth);
                this.adapter_.addClass(OUTLINE_NOTCHED);
            };
            MDCNotchedOutlineFoundation.prototype.closeNotch = function() {
                var OUTLINE_NOTCHED = MDCNotchedOutlineFoundation.cssClasses.OUTLINE_NOTCHED;
                this.adapter_.removeClass(OUTLINE_NOTCHED);
                this.adapter_.removeNotchWidthProperty();
            };
            return MDCNotchedOutlineFoundation;
        }(foundation_1.MDCFoundation);
        exports.MDCNotchedOutlineFoundation = MDCNotchedOutlineFoundation;
        exports.default = MDCNotchedOutlineFoundation;
    }, function(module, exports, __webpack_require__) {
        "use strict";
        var __extends = this && this.__extends || function() {
            var _extendStatics = function extendStatics(d, b) {
                _extendStatics = Object.setPrototypeOf || {
                    __proto__: []
                } instanceof Array && function(d, b) {
                    d.__proto__ = b;
                } || function(d, b) {
                    for (var p in b) {
                        if (b.hasOwnProperty(p)) d[p] = b[p];
                    }
                };
                return _extendStatics(d, b);
            };
            return function(d, b) {
                _extendStatics(d, b);
                function __() {
                    this.constructor = d;
                }
                d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
            };
        }();
        var __assign = this && this.__assign || function() {
            __assign = Object.assign || function(t) {
                for (var s, i = 1, n = arguments.length; i < n; i++) {
                    s = arguments[i];
                    for (var p in s) {
                        if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
                    }
                }
                return t;
            };
            return __assign.apply(this, arguments);
        };
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var foundation_1 = __webpack_require__(0);
        var constants_1 = __webpack_require__(64);
        var MDCRadioFoundation = function(_super) {
            __extends(MDCRadioFoundation, _super);
            function MDCRadioFoundation(adapter) {
                return _super.call(this, __assign({}, MDCRadioFoundation.defaultAdapter, adapter)) || this;
            }
            Object.defineProperty(MDCRadioFoundation, "cssClasses", {
                get: function get() {
                    return constants_1.cssClasses;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MDCRadioFoundation, "strings", {
                get: function get() {
                    return constants_1.strings;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MDCRadioFoundation, "defaultAdapter", {
                get: function get() {
                    return {
                        addClass: function addClass() {
                            return undefined;
                        },
                        removeClass: function removeClass() {
                            return undefined;
                        },
                        setNativeControlDisabled: function setNativeControlDisabled() {
                            return undefined;
                        }
                    };
                },
                enumerable: true,
                configurable: true
            });
            MDCRadioFoundation.prototype.setDisabled = function(disabled) {
                var DISABLED = MDCRadioFoundation.cssClasses.DISABLED;
                this.adapter_.setNativeControlDisabled(disabled);
                if (disabled) {
                    this.adapter_.addClass(DISABLED);
                } else {
                    this.adapter_.removeClass(DISABLED);
                }
            };
            return MDCRadioFoundation;
        }(foundation_1.MDCFoundation);
        exports.MDCRadioFoundation = MDCRadioFoundation;
        exports.default = MDCRadioFoundation;
    }, function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var strings = {
            NATIVE_CONTROL_SELECTOR: ".mdc-radio__native-control"
        };
        exports.strings = strings;
        var cssClasses = {
            DISABLED: "mdc-radio--disabled",
            ROOT: "mdc-radio"
        };
        exports.cssClasses = cssClasses;
    }, function(module, exports, __webpack_require__) {
        "use strict";
        var __extends = this && this.__extends || function() {
            var _extendStatics = function extendStatics(d, b) {
                _extendStatics = Object.setPrototypeOf || {
                    __proto__: []
                } instanceof Array && function(d, b) {
                    d.__proto__ = b;
                } || function(d, b) {
                    for (var p in b) {
                        if (b.hasOwnProperty(p)) d[p] = b[p];
                    }
                };
                return _extendStatics(d, b);
            };
            return function(d, b) {
                _extendStatics(d, b);
                function __() {
                    this.constructor = d;
                }
                d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
            };
        }();
        var __assign = this && this.__assign || function() {
            __assign = Object.assign || function(t) {
                for (var s, i = 1, n = arguments.length; i < n; i++) {
                    s = arguments[i];
                    for (var p in s) {
                        if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
                    }
                }
                return t;
            };
            return __assign.apply(this, arguments);
        };
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var foundation_1 = __webpack_require__(0);
        var constants_1 = __webpack_require__(24);
        var MDCSelectFoundation = function(_super) {
            __extends(MDCSelectFoundation, _super);
            function MDCSelectFoundation(adapter, foundationMap) {
                if (foundationMap === void 0) {
                    foundationMap = {};
                }
                var _this = _super.call(this, __assign({}, MDCSelectFoundation.defaultAdapter, adapter)) || this;
                _this.leadingIcon_ = foundationMap.leadingIcon;
                _this.helperText_ = foundationMap.helperText;
                return _this;
            }
            Object.defineProperty(MDCSelectFoundation, "cssClasses", {
                get: function get() {
                    return constants_1.cssClasses;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MDCSelectFoundation, "numbers", {
                get: function get() {
                    return constants_1.numbers;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MDCSelectFoundation, "strings", {
                get: function get() {
                    return constants_1.strings;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MDCSelectFoundation, "defaultAdapter", {
                get: function get() {
                    return {
                        addClass: function addClass() {
                            return undefined;
                        },
                        removeClass: function removeClass() {
                            return undefined;
                        },
                        hasClass: function hasClass() {
                            return false;
                        },
                        activateBottomLine: function activateBottomLine() {
                            return undefined;
                        },
                        deactivateBottomLine: function deactivateBottomLine() {
                            return undefined;
                        },
                        setValue: function setValue() {
                            return undefined;
                        },
                        getValue: function getValue() {
                            return "";
                        },
                        floatLabel: function floatLabel() {
                            return undefined;
                        },
                        getLabelWidth: function getLabelWidth() {
                            return 0;
                        },
                        hasOutline: function hasOutline() {
                            return false;
                        },
                        notchOutline: function notchOutline() {
                            return undefined;
                        },
                        closeOutline: function closeOutline() {
                            return undefined;
                        },
                        openMenu: function openMenu() {
                            return undefined;
                        },
                        closeMenu: function closeMenu() {
                            return undefined;
                        },
                        isMenuOpen: function isMenuOpen() {
                            return false;
                        },
                        setSelectedIndex: function setSelectedIndex() {
                            return undefined;
                        },
                        setDisabled: function setDisabled() {
                            return undefined;
                        },
                        setRippleCenter: function setRippleCenter() {
                            return undefined;
                        },
                        notifyChange: function notifyChange() {
                            return undefined;
                        },
                        checkValidity: function checkValidity() {
                            return false;
                        },
                        setValid: function setValid() {
                            return undefined;
                        }
                    };
                },
                enumerable: true,
                configurable: true
            });
            MDCSelectFoundation.prototype.setSelectedIndex = function(index) {
                this.adapter_.setSelectedIndex(index);
                this.adapter_.closeMenu();
                var didChange = true;
                this.handleChange(didChange);
            };
            MDCSelectFoundation.prototype.setValue = function(value) {
                this.adapter_.setValue(value);
                var didChange = true;
                this.handleChange(didChange);
            };
            MDCSelectFoundation.prototype.getValue = function() {
                return this.adapter_.getValue();
            };
            MDCSelectFoundation.prototype.setDisabled = function(isDisabled) {
                if (isDisabled) {
                    this.adapter_.addClass(constants_1.cssClasses.DISABLED);
                } else {
                    this.adapter_.removeClass(constants_1.cssClasses.DISABLED);
                }
                this.adapter_.setDisabled(isDisabled);
                this.adapter_.closeMenu();
                if (this.leadingIcon_) {
                    this.leadingIcon_.setDisabled(isDisabled);
                }
            };
            MDCSelectFoundation.prototype.setHelperTextContent = function(content) {
                if (this.helperText_) {
                    this.helperText_.setContent(content);
                }
            };
            MDCSelectFoundation.prototype.layout = function() {
                var openNotch = this.getValue().length > 0;
                this.notchOutline(openNotch);
            };
            MDCSelectFoundation.prototype.handleMenuOpened = function() {
                this.adapter_.addClass(constants_1.cssClasses.ACTIVATED);
            };
            MDCSelectFoundation.prototype.handleMenuClosed = function() {
                this.adapter_.removeClass(constants_1.cssClasses.ACTIVATED);
            };
            MDCSelectFoundation.prototype.handleChange = function(didChange) {
                if (didChange === void 0) {
                    didChange = true;
                }
                var value = this.getValue();
                var optionHasValue = value.length > 0;
                var isRequired = this.adapter_.hasClass(constants_1.cssClasses.REQUIRED);
                this.notchOutline(optionHasValue);
                if (!this.adapter_.hasClass(constants_1.cssClasses.FOCUSED)) {
                    this.adapter_.floatLabel(optionHasValue);
                }
                if (didChange) {
                    this.adapter_.notifyChange(value);
                    if (isRequired) {
                        this.setValid(this.isValid());
                        if (this.helperText_) {
                            this.helperText_.setValidity(this.isValid());
                        }
                    }
                }
            };
            MDCSelectFoundation.prototype.handleFocus = function() {
                this.adapter_.addClass(constants_1.cssClasses.FOCUSED);
                this.adapter_.floatLabel(true);
                this.notchOutline(true);
                this.adapter_.activateBottomLine();
                if (this.helperText_) {
                    this.helperText_.showToScreenReader();
                }
            };
            MDCSelectFoundation.prototype.handleBlur = function() {
                if (this.adapter_.isMenuOpen()) {
                    return;
                }
                this.adapter_.removeClass(constants_1.cssClasses.FOCUSED);
                this.handleChange(false);
                this.adapter_.deactivateBottomLine();
                var isRequired = this.adapter_.hasClass(constants_1.cssClasses.REQUIRED);
                if (isRequired) {
                    this.setValid(this.isValid());
                    if (this.helperText_) {
                        this.helperText_.setValidity(this.isValid());
                    }
                }
            };
            MDCSelectFoundation.prototype.handleClick = function(normalizedX) {
                if (this.adapter_.isMenuOpen()) {
                    return;
                }
                this.adapter_.setRippleCenter(normalizedX);
                this.adapter_.openMenu();
            };
            MDCSelectFoundation.prototype.handleKeydown = function(event) {
                if (this.adapter_.isMenuOpen()) {
                    return;
                }
                var isEnter = event.key === "Enter" || event.keyCode === 13;
                var isSpace = event.key === "Space" || event.keyCode === 32;
                var arrowUp = event.key === "ArrowUp" || event.keyCode === 38;
                var arrowDown = event.key === "ArrowDown" || event.keyCode === 40;
                if (this.adapter_.hasClass(constants_1.cssClasses.FOCUSED) && (isEnter || isSpace || arrowUp || arrowDown)) {
                    this.adapter_.openMenu();
                    event.preventDefault();
                }
            };
            MDCSelectFoundation.prototype.notchOutline = function(openNotch) {
                if (!this.adapter_.hasOutline()) {
                    return;
                }
                var isFocused = this.adapter_.hasClass(constants_1.cssClasses.FOCUSED);
                if (openNotch) {
                    var labelScale = constants_1.numbers.LABEL_SCALE;
                    var labelWidth = this.adapter_.getLabelWidth() * labelScale;
                    this.adapter_.notchOutline(labelWidth);
                } else if (!isFocused) {
                    this.adapter_.closeOutline();
                }
            };
            MDCSelectFoundation.prototype.setLeadingIconAriaLabel = function(label) {
                if (this.leadingIcon_) {
                    this.leadingIcon_.setAriaLabel(label);
                }
            };
            MDCSelectFoundation.prototype.setLeadingIconContent = function(content) {
                if (this.leadingIcon_) {
                    this.leadingIcon_.setContent(content);
                }
            };
            MDCSelectFoundation.prototype.setValid = function(isValid) {
                this.adapter_.setValid(isValid);
            };
            MDCSelectFoundation.prototype.isValid = function() {
                return this.adapter_.checkValidity();
            };
            return MDCSelectFoundation;
        }(foundation_1.MDCFoundation);
        exports.MDCSelectFoundation = MDCSelectFoundation;
        exports.default = MDCSelectFoundation;
    }, function(module, exports, __webpack_require__) {
        "use strict";
        var __extends = this && this.__extends || function() {
            var _extendStatics = function extendStatics(d, b) {
                _extendStatics = Object.setPrototypeOf || {
                    __proto__: []
                } instanceof Array && function(d, b) {
                    d.__proto__ = b;
                } || function(d, b) {
                    for (var p in b) {
                        if (b.hasOwnProperty(p)) d[p] = b[p];
                    }
                };
                return _extendStatics(d, b);
            };
            return function(d, b) {
                _extendStatics(d, b);
                function __() {
                    this.constructor = d;
                }
                d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
            };
        }();
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var component_1 = __webpack_require__(1);
        var foundation_1 = __webpack_require__(67);
        var MDCSelectHelperText = function(_super) {
            __extends(MDCSelectHelperText, _super);
            function MDCSelectHelperText() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            MDCSelectHelperText.attachTo = function(root) {
                return new MDCSelectHelperText(root);
            };
            Object.defineProperty(MDCSelectHelperText.prototype, "foundation", {
                get: function get() {
                    return this.foundation_;
                },
                enumerable: true,
                configurable: true
            });
            MDCSelectHelperText.prototype.getDefaultFoundation = function() {
                var _this = this;
                var adapter = {
                    addClass: function addClass(className) {
                        return _this.root_.classList.add(className);
                    },
                    removeClass: function removeClass(className) {
                        return _this.root_.classList.remove(className);
                    },
                    hasClass: function hasClass(className) {
                        return _this.root_.classList.contains(className);
                    },
                    setAttr: function setAttr(attr, value) {
                        return _this.root_.setAttribute(attr, value);
                    },
                    removeAttr: function removeAttr(attr) {
                        return _this.root_.removeAttribute(attr);
                    },
                    setContent: function setContent(content) {
                        _this.root_.textContent = content;
                    }
                };
                return new foundation_1.MDCSelectHelperTextFoundation(adapter);
            };
            return MDCSelectHelperText;
        }(component_1.MDCComponent);
        exports.MDCSelectHelperText = MDCSelectHelperText;
    }, function(module, exports, __webpack_require__) {
        "use strict";
        var __extends = this && this.__extends || function() {
            var _extendStatics = function extendStatics(d, b) {
                _extendStatics = Object.setPrototypeOf || {
                    __proto__: []
                } instanceof Array && function(d, b) {
                    d.__proto__ = b;
                } || function(d, b) {
                    for (var p in b) {
                        if (b.hasOwnProperty(p)) d[p] = b[p];
                    }
                };
                return _extendStatics(d, b);
            };
            return function(d, b) {
                _extendStatics(d, b);
                function __() {
                    this.constructor = d;
                }
                d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
            };
        }();
        var __assign = this && this.__assign || function() {
            __assign = Object.assign || function(t) {
                for (var s, i = 1, n = arguments.length; i < n; i++) {
                    s = arguments[i];
                    for (var p in s) {
                        if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
                    }
                }
                return t;
            };
            return __assign.apply(this, arguments);
        };
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var foundation_1 = __webpack_require__(0);
        var constants_1 = __webpack_require__(68);
        var MDCSelectHelperTextFoundation = function(_super) {
            __extends(MDCSelectHelperTextFoundation, _super);
            function MDCSelectHelperTextFoundation(adapter) {
                return _super.call(this, __assign({}, MDCSelectHelperTextFoundation.defaultAdapter, adapter)) || this;
            }
            Object.defineProperty(MDCSelectHelperTextFoundation, "cssClasses", {
                get: function get() {
                    return constants_1.cssClasses;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MDCSelectHelperTextFoundation, "strings", {
                get: function get() {
                    return constants_1.strings;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MDCSelectHelperTextFoundation, "defaultAdapter", {
                get: function get() {
                    return {
                        addClass: function addClass() {
                            return undefined;
                        },
                        removeClass: function removeClass() {
                            return undefined;
                        },
                        hasClass: function hasClass() {
                            return false;
                        },
                        setAttr: function setAttr() {
                            return undefined;
                        },
                        removeAttr: function removeAttr() {
                            return undefined;
                        },
                        setContent: function setContent() {
                            return undefined;
                        }
                    };
                },
                enumerable: true,
                configurable: true
            });
            MDCSelectHelperTextFoundation.prototype.setContent = function(content) {
                this.adapter_.setContent(content);
            };
            MDCSelectHelperTextFoundation.prototype.setPersistent = function(isPersistent) {
                if (isPersistent) {
                    this.adapter_.addClass(constants_1.cssClasses.HELPER_TEXT_PERSISTENT);
                } else {
                    this.adapter_.removeClass(constants_1.cssClasses.HELPER_TEXT_PERSISTENT);
                }
            };
            MDCSelectHelperTextFoundation.prototype.setValidation = function(isValidation) {
                if (isValidation) {
                    this.adapter_.addClass(constants_1.cssClasses.HELPER_TEXT_VALIDATION_MSG);
                } else {
                    this.adapter_.removeClass(constants_1.cssClasses.HELPER_TEXT_VALIDATION_MSG);
                }
            };
            MDCSelectHelperTextFoundation.prototype.showToScreenReader = function() {
                this.adapter_.removeAttr(constants_1.strings.ARIA_HIDDEN);
            };
            MDCSelectHelperTextFoundation.prototype.setValidity = function(selectIsValid) {
                var helperTextIsPersistent = this.adapter_.hasClass(constants_1.cssClasses.HELPER_TEXT_PERSISTENT);
                var helperTextIsValidationMsg = this.adapter_.hasClass(constants_1.cssClasses.HELPER_TEXT_VALIDATION_MSG);
                var validationMsgNeedsDisplay = helperTextIsValidationMsg && !selectIsValid;
                if (validationMsgNeedsDisplay) {
                    this.adapter_.setAttr(constants_1.strings.ROLE, "alert");
                } else {
                    this.adapter_.removeAttr(constants_1.strings.ROLE);
                }
                if (!helperTextIsPersistent && !validationMsgNeedsDisplay) {
                    this.hide_();
                }
            };
            MDCSelectHelperTextFoundation.prototype.hide_ = function() {
                this.adapter_.setAttr(constants_1.strings.ARIA_HIDDEN, "true");
            };
            return MDCSelectHelperTextFoundation;
        }(foundation_1.MDCFoundation);
        exports.MDCSelectHelperTextFoundation = MDCSelectHelperTextFoundation;
        exports.default = MDCSelectHelperTextFoundation;
    }, function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var strings = {
            ARIA_HIDDEN: "aria-hidden",
            ROLE: "role"
        };
        exports.strings = strings;
        var cssClasses = {
            HELPER_TEXT_PERSISTENT: "mdc-select-helper-text--persistent",
            HELPER_TEXT_VALIDATION_MSG: "mdc-select-helper-text--validation-msg"
        };
        exports.cssClasses = cssClasses;
    }, function(module, exports, __webpack_require__) {
        "use strict";
        var __extends = this && this.__extends || function() {
            var _extendStatics = function extendStatics(d, b) {
                _extendStatics = Object.setPrototypeOf || {
                    __proto__: []
                } instanceof Array && function(d, b) {
                    d.__proto__ = b;
                } || function(d, b) {
                    for (var p in b) {
                        if (b.hasOwnProperty(p)) d[p] = b[p];
                    }
                };
                return _extendStatics(d, b);
            };
            return function(d, b) {
                _extendStatics(d, b);
                function __() {
                    this.constructor = d;
                }
                d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
            };
        }();
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var component_1 = __webpack_require__(1);
        var foundation_1 = __webpack_require__(70);
        var MDCSelectIcon = function(_super) {
            __extends(MDCSelectIcon, _super);
            function MDCSelectIcon() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            MDCSelectIcon.attachTo = function(root) {
                return new MDCSelectIcon(root);
            };
            Object.defineProperty(MDCSelectIcon.prototype, "foundation", {
                get: function get() {
                    return this.foundation_;
                },
                enumerable: true,
                configurable: true
            });
            MDCSelectIcon.prototype.getDefaultFoundation = function() {
                var _this = this;
                var adapter = {
                    getAttr: function getAttr(attr) {
                        return _this.root_.getAttribute(attr);
                    },
                    setAttr: function setAttr(attr, value) {
                        return _this.root_.setAttribute(attr, value);
                    },
                    removeAttr: function removeAttr(attr) {
                        return _this.root_.removeAttribute(attr);
                    },
                    setContent: function setContent(content) {
                        _this.root_.textContent = content;
                    },
                    registerInteractionHandler: function registerInteractionHandler(evtType, handler) {
                        return _this.listen(evtType, handler);
                    },
                    deregisterInteractionHandler: function deregisterInteractionHandler(evtType, handler) {
                        return _this.unlisten(evtType, handler);
                    },
                    notifyIconAction: function notifyIconAction() {
                        return _this.emit(foundation_1.MDCSelectIconFoundation.strings.ICON_EVENT, {}, true);
                    }
                };
                return new foundation_1.MDCSelectIconFoundation(adapter);
            };
            return MDCSelectIcon;
        }(component_1.MDCComponent);
        exports.MDCSelectIcon = MDCSelectIcon;
    }, function(module, exports, __webpack_require__) {
        "use strict";
        var __extends = this && this.__extends || function() {
            var _extendStatics = function extendStatics(d, b) {
                _extendStatics = Object.setPrototypeOf || {
                    __proto__: []
                } instanceof Array && function(d, b) {
                    d.__proto__ = b;
                } || function(d, b) {
                    for (var p in b) {
                        if (b.hasOwnProperty(p)) d[p] = b[p];
                    }
                };
                return _extendStatics(d, b);
            };
            return function(d, b) {
                _extendStatics(d, b);
                function __() {
                    this.constructor = d;
                }
                d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
            };
        }();
        var __assign = this && this.__assign || function() {
            __assign = Object.assign || function(t) {
                for (var s, i = 1, n = arguments.length; i < n; i++) {
                    s = arguments[i];
                    for (var p in s) {
                        if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
                    }
                }
                return t;
            };
            return __assign.apply(this, arguments);
        };
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var foundation_1 = __webpack_require__(0);
        var constants_1 = __webpack_require__(71);
        var INTERACTION_EVENTS = [ "click", "keydown" ];
        var MDCSelectIconFoundation = function(_super) {
            __extends(MDCSelectIconFoundation, _super);
            function MDCSelectIconFoundation(adapter) {
                var _this = _super.call(this, __assign({}, MDCSelectIconFoundation.defaultAdapter, adapter)) || this;
                _this.savedTabIndex_ = null;
                _this.interactionHandler_ = function(evt) {
                    return _this.handleInteraction(evt);
                };
                return _this;
            }
            Object.defineProperty(MDCSelectIconFoundation, "strings", {
                get: function get() {
                    return constants_1.strings;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MDCSelectIconFoundation, "defaultAdapter", {
                get: function get() {
                    return {
                        getAttr: function getAttr() {
                            return null;
                        },
                        setAttr: function setAttr() {
                            return undefined;
                        },
                        removeAttr: function removeAttr() {
                            return undefined;
                        },
                        setContent: function setContent() {
                            return undefined;
                        },
                        registerInteractionHandler: function registerInteractionHandler() {
                            return undefined;
                        },
                        deregisterInteractionHandler: function deregisterInteractionHandler() {
                            return undefined;
                        },
                        notifyIconAction: function notifyIconAction() {
                            return undefined;
                        }
                    };
                },
                enumerable: true,
                configurable: true
            });
            MDCSelectIconFoundation.prototype.init = function() {
                var _this = this;
                this.savedTabIndex_ = this.adapter_.getAttr("tabindex");
                INTERACTION_EVENTS.forEach(function(evtType) {
                    _this.adapter_.registerInteractionHandler(evtType, _this.interactionHandler_);
                });
            };
            MDCSelectIconFoundation.prototype.destroy = function() {
                var _this = this;
                INTERACTION_EVENTS.forEach(function(evtType) {
                    _this.adapter_.deregisterInteractionHandler(evtType, _this.interactionHandler_);
                });
            };
            MDCSelectIconFoundation.prototype.setDisabled = function(disabled) {
                if (!this.savedTabIndex_) {
                    return;
                }
                if (disabled) {
                    this.adapter_.setAttr("tabindex", "-1");
                    this.adapter_.removeAttr("role");
                } else {
                    this.adapter_.setAttr("tabindex", this.savedTabIndex_);
                    this.adapter_.setAttr("role", constants_1.strings.ICON_ROLE);
                }
            };
            MDCSelectIconFoundation.prototype.setAriaLabel = function(label) {
                this.adapter_.setAttr("aria-label", label);
            };
            MDCSelectIconFoundation.prototype.setContent = function(content) {
                this.adapter_.setContent(content);
            };
            MDCSelectIconFoundation.prototype.handleInteraction = function(evt) {
                var isEnterKey = evt.key === "Enter" || evt.keyCode === 13;
                if (evt.type === "click" || isEnterKey) {
                    this.adapter_.notifyIconAction();
                }
            };
            return MDCSelectIconFoundation;
        }(foundation_1.MDCFoundation);
        exports.MDCSelectIconFoundation = MDCSelectIconFoundation;
        exports.default = MDCSelectIconFoundation;
    }, function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var strings = {
            ICON_EVENT: "MDCSelect:icon",
            ICON_ROLE: "button"
        };
        exports.strings = strings;
    }, function(module, exports, __webpack_require__) {
        "use strict";
        var __extends = this && this.__extends || function() {
            var _extendStatics = function extendStatics(d, b) {
                _extendStatics = Object.setPrototypeOf || {
                    __proto__: []
                } instanceof Array && function(d, b) {
                    d.__proto__ = b;
                } || function(d, b) {
                    for (var p in b) {
                        if (b.hasOwnProperty(p)) d[p] = b[p];
                    }
                };
                return _extendStatics(d, b);
            };
            return function(d, b) {
                _extendStatics(d, b);
                function __() {
                    this.constructor = d;
                }
                d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
            };
        }();
        var __assign = this && this.__assign || function() {
            __assign = Object.assign || function(t) {
                for (var s, i = 1, n = arguments.length; i < n; i++) {
                    s = arguments[i];
                    for (var p in s) {
                        if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
                    }
                }
                return t;
            };
            return __assign.apply(this, arguments);
        };
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var util_1 = __webpack_require__(12);
        var foundation_1 = __webpack_require__(0);
        var constants_1 = __webpack_require__(25);
        var DOWN_EVENTS = [ "mousedown", "pointerdown", "touchstart" ];
        var UP_EVENTS = [ "mouseup", "pointerup", "touchend" ];
        var MOVE_EVENT_MAP = {
            mousedown: "mousemove",
            pointerdown: "pointermove",
            touchstart: "touchmove"
        };
        var KEY_IDS = {
            ARROW_DOWN: "ArrowDown",
            ARROW_LEFT: "ArrowLeft",
            ARROW_RIGHT: "ArrowRight",
            ARROW_UP: "ArrowUp",
            END: "End",
            HOME: "Home",
            PAGE_DOWN: "PageDown",
            PAGE_UP: "PageUp"
        };
        var MDCSliderFoundation = function(_super) {
            __extends(MDCSliderFoundation, _super);
            function MDCSliderFoundation(adapter) {
                var _this = _super.call(this, __assign({}, MDCSliderFoundation.defaultAdapter, adapter)) || this;
                _this.savedTabIndex_ = NaN;
                _this.active_ = false;
                _this.inTransit_ = false;
                _this.isDiscrete_ = false;
                _this.hasTrackMarker_ = false;
                _this.handlingThumbTargetEvt_ = false;
                _this.min_ = 0;
                _this.max_ = 100;
                _this.step_ = 0;
                _this.value_ = 0;
                _this.disabled_ = false;
                _this.preventFocusState_ = false;
                _this.thumbContainerPointerHandler_ = function() {
                    return _this.handlingThumbTargetEvt_ = true;
                };
                _this.interactionStartHandler_ = function(evt) {
                    return _this.handleDown_(evt);
                };
                _this.keydownHandler_ = function(evt) {
                    return _this.handleKeydown_(evt);
                };
                _this.focusHandler_ = function() {
                    return _this.handleFocus_();
                };
                _this.blurHandler_ = function() {
                    return _this.handleBlur_();
                };
                _this.resizeHandler_ = function() {
                    return _this.layout();
                };
                return _this;
            }
            Object.defineProperty(MDCSliderFoundation, "cssClasses", {
                get: function get() {
                    return constants_1.cssClasses;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MDCSliderFoundation, "strings", {
                get: function get() {
                    return constants_1.strings;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MDCSliderFoundation, "numbers", {
                get: function get() {
                    return constants_1.numbers;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MDCSliderFoundation, "defaultAdapter", {
                get: function get() {
                    return {
                        hasClass: function hasClass() {
                            return false;
                        },
                        addClass: function addClass() {
                            return undefined;
                        },
                        removeClass: function removeClass() {
                            return undefined;
                        },
                        getAttribute: function getAttribute() {
                            return null;
                        },
                        setAttribute: function setAttribute() {
                            return undefined;
                        },
                        removeAttribute: function removeAttribute() {
                            return undefined;
                        },
                        computeBoundingRect: function computeBoundingRect() {
                            return {
                                top: 0,
                                right: 0,
                                bottom: 0,
                                left: 0,
                                width: 0,
                                height: 0
                            };
                        },
                        getTabIndex: function getTabIndex() {
                            return 0;
                        },
                        registerInteractionHandler: function registerInteractionHandler() {
                            return undefined;
                        },
                        deregisterInteractionHandler: function deregisterInteractionHandler() {
                            return undefined;
                        },
                        registerThumbContainerInteractionHandler: function registerThumbContainerInteractionHandler() {
                            return undefined;
                        },
                        deregisterThumbContainerInteractionHandler: function deregisterThumbContainerInteractionHandler() {
                            return undefined;
                        },
                        registerBodyInteractionHandler: function registerBodyInteractionHandler() {
                            return undefined;
                        },
                        deregisterBodyInteractionHandler: function deregisterBodyInteractionHandler() {
                            return undefined;
                        },
                        registerResizeHandler: function registerResizeHandler() {
                            return undefined;
                        },
                        deregisterResizeHandler: function deregisterResizeHandler() {
                            return undefined;
                        },
                        notifyInput: function notifyInput() {
                            return undefined;
                        },
                        notifyChange: function notifyChange() {
                            return undefined;
                        },
                        setThumbContainerStyleProperty: function setThumbContainerStyleProperty() {
                            return undefined;
                        },
                        setTrackStyleProperty: function setTrackStyleProperty() {
                            return undefined;
                        },
                        setMarkerValue: function setMarkerValue() {
                            return undefined;
                        },
                        appendTrackMarkers: function appendTrackMarkers() {
                            return undefined;
                        },
                        removeTrackMarkers: function removeTrackMarkers() {
                            return undefined;
                        },
                        setLastTrackMarkersStyleProperty: function setLastTrackMarkersStyleProperty() {
                            return undefined;
                        },
                        isRTL: function isRTL() {
                            return false;
                        }
                    };
                },
                enumerable: true,
                configurable: true
            });
            MDCSliderFoundation.prototype.init = function() {
                var _this = this;
                this.isDiscrete_ = this.adapter_.hasClass(constants_1.cssClasses.IS_DISCRETE);
                this.hasTrackMarker_ = this.adapter_.hasClass(constants_1.cssClasses.HAS_TRACK_MARKER);
                DOWN_EVENTS.forEach(function(evtName) {
                    _this.adapter_.registerInteractionHandler(evtName, _this.interactionStartHandler_);
                    _this.adapter_.registerThumbContainerInteractionHandler(evtName, _this.thumbContainerPointerHandler_);
                });
                this.adapter_.registerInteractionHandler("keydown", this.keydownHandler_);
                this.adapter_.registerInteractionHandler("focus", this.focusHandler_);
                this.adapter_.registerInteractionHandler("blur", this.blurHandler_);
                this.adapter_.registerResizeHandler(this.resizeHandler_);
                this.layout();
                if (this.isDiscrete_ && this.getStep() === 0) {
                    this.step_ = 1;
                }
            };
            MDCSliderFoundation.prototype.destroy = function() {
                var _this = this;
                DOWN_EVENTS.forEach(function(evtName) {
                    _this.adapter_.deregisterInteractionHandler(evtName, _this.interactionStartHandler_);
                    _this.adapter_.deregisterThumbContainerInteractionHandler(evtName, _this.thumbContainerPointerHandler_);
                });
                this.adapter_.deregisterInteractionHandler("keydown", this.keydownHandler_);
                this.adapter_.deregisterInteractionHandler("focus", this.focusHandler_);
                this.adapter_.deregisterInteractionHandler("blur", this.blurHandler_);
                this.adapter_.deregisterResizeHandler(this.resizeHandler_);
            };
            MDCSliderFoundation.prototype.setupTrackMarker = function() {
                if (this.isDiscrete_ && this.hasTrackMarker_ && this.getStep() !== 0) {
                    var min = this.getMin();
                    var max = this.getMax();
                    var step = this.getStep();
                    var numMarkers = (max - min) / step;
                    var indivisible = Math.ceil(numMarkers) !== numMarkers;
                    if (indivisible) {
                        numMarkers = Math.ceil(numMarkers);
                    }
                    this.adapter_.removeTrackMarkers();
                    this.adapter_.appendTrackMarkers(numMarkers);
                    if (indivisible) {
                        var lastStepRatio = (max - numMarkers * step) / step + 1;
                        this.adapter_.setLastTrackMarkersStyleProperty("flex-grow", String(lastStepRatio));
                    }
                }
            };
            MDCSliderFoundation.prototype.layout = function() {
                this.rect_ = this.adapter_.computeBoundingRect();
                this.updateUIForCurrentValue_();
            };
            MDCSliderFoundation.prototype.getValue = function() {
                return this.value_;
            };
            MDCSliderFoundation.prototype.setValue = function(value) {
                this.setValue_(value, false);
            };
            MDCSliderFoundation.prototype.getMax = function() {
                return this.max_;
            };
            MDCSliderFoundation.prototype.setMax = function(max) {
                if (max < this.min_) {
                    throw new Error("Cannot set max to be less than the slider's minimum value");
                }
                this.max_ = max;
                this.setValue_(this.value_, false, true);
                this.adapter_.setAttribute(constants_1.strings.ARIA_VALUEMAX, String(this.max_));
                this.setupTrackMarker();
            };
            MDCSliderFoundation.prototype.getMin = function() {
                return this.min_;
            };
            MDCSliderFoundation.prototype.setMin = function(min) {
                if (min > this.max_) {
                    throw new Error("Cannot set min to be greater than the slider's maximum value");
                }
                this.min_ = min;
                this.setValue_(this.value_, false, true);
                this.adapter_.setAttribute(constants_1.strings.ARIA_VALUEMIN, String(this.min_));
                this.setupTrackMarker();
            };
            MDCSliderFoundation.prototype.getStep = function() {
                return this.step_;
            };
            MDCSliderFoundation.prototype.setStep = function(step) {
                if (step < 0) {
                    throw new Error("Step cannot be set to a negative number");
                }
                if (this.isDiscrete_ && (typeof step !== "number" || step < 1)) {
                    step = 1;
                }
                this.step_ = step;
                this.setValue_(this.value_, false, true);
                this.setupTrackMarker();
            };
            MDCSliderFoundation.prototype.isDisabled = function() {
                return this.disabled_;
            };
            MDCSliderFoundation.prototype.setDisabled = function(disabled) {
                this.disabled_ = disabled;
                this.toggleClass_(constants_1.cssClasses.DISABLED, this.disabled_);
                if (this.disabled_) {
                    this.savedTabIndex_ = this.adapter_.getTabIndex();
                    this.adapter_.setAttribute(constants_1.strings.ARIA_DISABLED, "true");
                    this.adapter_.removeAttribute("tabindex");
                } else {
                    this.adapter_.removeAttribute(constants_1.strings.ARIA_DISABLED);
                    if (!isNaN(this.savedTabIndex_)) {
                        this.adapter_.setAttribute("tabindex", String(this.savedTabIndex_));
                    }
                }
            };
            MDCSliderFoundation.prototype.handleDown_ = function(downEvent) {
                var _this = this;
                if (this.disabled_) {
                    return;
                }
                this.preventFocusState_ = true;
                this.setInTransit_(!this.handlingThumbTargetEvt_);
                this.handlingThumbTargetEvt_ = false;
                this.setActive_(true);
                var moveHandler = function moveHandler(moveEvent) {
                    _this.handleMove_(moveEvent);
                };
                var moveEventType = MOVE_EVENT_MAP[downEvent.type];
                var upHandler = function upHandler() {
                    _this.handleUp_();
                    _this.adapter_.deregisterBodyInteractionHandler(moveEventType, moveHandler);
                    UP_EVENTS.forEach(function(evtName) {
                        return _this.adapter_.deregisterBodyInteractionHandler(evtName, upHandler);
                    });
                };
                this.adapter_.registerBodyInteractionHandler(moveEventType, moveHandler);
                UP_EVENTS.forEach(function(evtName) {
                    return _this.adapter_.registerBodyInteractionHandler(evtName, upHandler);
                });
                this.setValueFromEvt_(downEvent);
            };
            MDCSliderFoundation.prototype.handleMove_ = function(evt) {
                evt.preventDefault();
                this.setValueFromEvt_(evt);
            };
            MDCSliderFoundation.prototype.handleUp_ = function() {
                this.setActive_(false);
                this.adapter_.notifyChange();
            };
            MDCSliderFoundation.prototype.getPageX_ = function(evt) {
                if (evt.targetTouches && evt.targetTouches.length > 0) {
                    return evt.targetTouches[0].pageX;
                }
                return evt.pageX;
            };
            MDCSliderFoundation.prototype.setValueFromEvt_ = function(evt) {
                var pageX = this.getPageX_(evt);
                var value = this.computeValueFromPageX_(pageX);
                this.setValue_(value, true);
            };
            MDCSliderFoundation.prototype.computeValueFromPageX_ = function(pageX) {
                var _a = this, max = _a.max_, min = _a.min_;
                var xPos = pageX - this.rect_.left;
                var pctComplete = xPos / this.rect_.width;
                if (this.adapter_.isRTL()) {
                    pctComplete = 1 - pctComplete;
                }
                return min + pctComplete * (max - min);
            };
            MDCSliderFoundation.prototype.handleKeydown_ = function(evt) {
                var keyId = this.getKeyId_(evt);
                var value = this.getValueForKeyId_(keyId);
                if (isNaN(value)) {
                    return;
                }
                evt.preventDefault();
                this.adapter_.addClass(constants_1.cssClasses.FOCUS);
                this.setValue_(value, true);
                this.adapter_.notifyChange();
            };
            MDCSliderFoundation.prototype.getKeyId_ = function(kbdEvt) {
                if (kbdEvt.key === KEY_IDS.ARROW_LEFT || kbdEvt.keyCode === 37) {
                    return KEY_IDS.ARROW_LEFT;
                }
                if (kbdEvt.key === KEY_IDS.ARROW_RIGHT || kbdEvt.keyCode === 39) {
                    return KEY_IDS.ARROW_RIGHT;
                }
                if (kbdEvt.key === KEY_IDS.ARROW_UP || kbdEvt.keyCode === 38) {
                    return KEY_IDS.ARROW_UP;
                }
                if (kbdEvt.key === KEY_IDS.ARROW_DOWN || kbdEvt.keyCode === 40) {
                    return KEY_IDS.ARROW_DOWN;
                }
                if (kbdEvt.key === KEY_IDS.HOME || kbdEvt.keyCode === 36) {
                    return KEY_IDS.HOME;
                }
                if (kbdEvt.key === KEY_IDS.END || kbdEvt.keyCode === 35) {
                    return KEY_IDS.END;
                }
                if (kbdEvt.key === KEY_IDS.PAGE_UP || kbdEvt.keyCode === 33) {
                    return KEY_IDS.PAGE_UP;
                }
                if (kbdEvt.key === KEY_IDS.PAGE_DOWN || kbdEvt.keyCode === 34) {
                    return KEY_IDS.PAGE_DOWN;
                }
                return "";
            };
            MDCSliderFoundation.prototype.getValueForKeyId_ = function(keyId) {
                var _a = this, max = _a.max_, min = _a.min_, step = _a.step_;
                var delta = step || (max - min) / 100;
                var valueNeedsToBeFlipped = this.adapter_.isRTL() && (keyId === KEY_IDS.ARROW_LEFT || keyId === KEY_IDS.ARROW_RIGHT);
                if (valueNeedsToBeFlipped) {
                    delta = -delta;
                }
                switch (keyId) {
                  case KEY_IDS.ARROW_LEFT:
                  case KEY_IDS.ARROW_DOWN:
                    return this.value_ - delta;

                  case KEY_IDS.ARROW_RIGHT:
                  case KEY_IDS.ARROW_UP:
                    return this.value_ + delta;

                  case KEY_IDS.HOME:
                    return this.min_;

                  case KEY_IDS.END:
                    return this.max_;

                  case KEY_IDS.PAGE_UP:
                    return this.value_ + delta * constants_1.numbers.PAGE_FACTOR;

                  case KEY_IDS.PAGE_DOWN:
                    return this.value_ - delta * constants_1.numbers.PAGE_FACTOR;

                  default:
                    return NaN;
                }
            };
            MDCSliderFoundation.prototype.handleFocus_ = function() {
                if (this.preventFocusState_) {
                    return;
                }
                this.adapter_.addClass(constants_1.cssClasses.FOCUS);
            };
            MDCSliderFoundation.prototype.handleBlur_ = function() {
                this.preventFocusState_ = false;
                this.adapter_.removeClass(constants_1.cssClasses.FOCUS);
            };
            MDCSliderFoundation.prototype.setValue_ = function(value, shouldFireInput, force) {
                if (force === void 0) {
                    force = false;
                }
                if (value === this.value_ && !force) {
                    return;
                }
                var _a = this, min = _a.min_, max = _a.max_;
                var valueSetToBoundary = value === min || value === max;
                if (this.step_ && !valueSetToBoundary) {
                    value = this.quantize_(value);
                }
                if (value < min) {
                    value = min;
                } else if (value > max) {
                    value = max;
                }
                this.value_ = value;
                this.adapter_.setAttribute(constants_1.strings.ARIA_VALUENOW, String(this.value_));
                this.updateUIForCurrentValue_();
                if (shouldFireInput) {
                    this.adapter_.notifyInput();
                    if (this.isDiscrete_) {
                        this.adapter_.setMarkerValue(value);
                    }
                }
            };
            MDCSliderFoundation.prototype.quantize_ = function(value) {
                var numSteps = Math.round(value / this.step_);
                return numSteps * this.step_;
            };
            MDCSliderFoundation.prototype.updateUIForCurrentValue_ = function() {
                var _this = this;
                var _a = this, max = _a.max_, min = _a.min_, value = _a.value_;
                var pctComplete = (value - min) / (max - min);
                var translatePx = pctComplete * this.rect_.width;
                if (this.adapter_.isRTL()) {
                    translatePx = this.rect_.width - translatePx;
                }
                var transformProp = util_1.getCorrectPropertyName(window, "transform");
                var transitionendEvtName = util_1.getCorrectEventName(window, "transitionend");
                if (this.inTransit_) {
                    var onTransitionEnd_1 = function onTransitionEnd_1() {
                        _this.setInTransit_(false);
                        _this.adapter_.deregisterThumbContainerInteractionHandler(transitionendEvtName, onTransitionEnd_1);
                    };
                    this.adapter_.registerThumbContainerInteractionHandler(transitionendEvtName, onTransitionEnd_1);
                }
                requestAnimationFrame(function() {
                    _this.adapter_.setThumbContainerStyleProperty(transformProp, "translateX(" + translatePx + "px) translateX(-50%)");
                    _this.adapter_.setTrackStyleProperty(transformProp, "scaleX(" + pctComplete + ")");
                });
            };
            MDCSliderFoundation.prototype.setActive_ = function(active) {
                this.active_ = active;
                this.toggleClass_(constants_1.cssClasses.ACTIVE, this.active_);
            };
            MDCSliderFoundation.prototype.setInTransit_ = function(inTransit) {
                this.inTransit_ = inTransit;
                this.toggleClass_(constants_1.cssClasses.IN_TRANSIT, this.inTransit_);
            };
            MDCSliderFoundation.prototype.toggleClass_ = function(className, shouldBePresent) {
                if (shouldBePresent) {
                    this.adapter_.addClass(className);
                } else {
                    this.adapter_.removeClass(className);
                }
            };
            return MDCSliderFoundation;
        }(foundation_1.MDCFoundation);
        exports.MDCSliderFoundation = MDCSliderFoundation;
        exports.default = MDCSliderFoundation;
    }, function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var constants_1 = __webpack_require__(10);
        var ARIA_LIVE_DELAY_MS = constants_1.numbers.ARIA_LIVE_DELAY_MS;
        var ARIA_LIVE_LABEL_TEXT_ATTR = constants_1.strings.ARIA_LIVE_LABEL_TEXT_ATTR;
        function announce(ariaEl, labelEl) {
            if (labelEl === void 0) {
                labelEl = ariaEl;
            }
            var priority = ariaEl.getAttribute("aria-live");
            var labelText = labelEl.textContent.trim();
            if (!labelText || !priority) {
                return;
            }
            ariaEl.setAttribute("aria-live", "off");
            labelEl.textContent = "";
            labelEl.innerHTML = '<span style="display: inline-block; width: 0; height: 1px;">&nbsp;</span>';
            labelEl.setAttribute(ARIA_LIVE_LABEL_TEXT_ATTR, labelText);
            setTimeout(function() {
                ariaEl.setAttribute("aria-live", priority);
                labelEl.removeAttribute(ARIA_LIVE_LABEL_TEXT_ATTR);
                labelEl.textContent = labelText;
            }, ARIA_LIVE_DELAY_MS);
        }
        exports.announce = announce;
    }, function(module, exports, __webpack_require__) {
        "use strict";
        var __extends = this && this.__extends || function() {
            var _extendStatics = function extendStatics(d, b) {
                _extendStatics = Object.setPrototypeOf || {
                    __proto__: []
                } instanceof Array && function(d, b) {
                    d.__proto__ = b;
                } || function(d, b) {
                    for (var p in b) {
                        if (b.hasOwnProperty(p)) d[p] = b[p];
                    }
                };
                return _extendStatics(d, b);
            };
            return function(d, b) {
                _extendStatics(d, b);
                function __() {
                    this.constructor = d;
                }
                d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
            };
        }();
        var __assign = this && this.__assign || function() {
            __assign = Object.assign || function(t) {
                for (var s, i = 1, n = arguments.length; i < n; i++) {
                    s = arguments[i];
                    for (var p in s) {
                        if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
                    }
                }
                return t;
            };
            return __assign.apply(this, arguments);
        };
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var foundation_1 = __webpack_require__(0);
        var constants_1 = __webpack_require__(10);
        var OPENING = constants_1.cssClasses.OPENING, OPEN = constants_1.cssClasses.OPEN, CLOSING = constants_1.cssClasses.CLOSING;
        var REASON_ACTION = constants_1.strings.REASON_ACTION, REASON_DISMISS = constants_1.strings.REASON_DISMISS;
        var MDCSnackbarFoundation = function(_super) {
            __extends(MDCSnackbarFoundation, _super);
            function MDCSnackbarFoundation(adapter) {
                var _this = _super.call(this, __assign({}, MDCSnackbarFoundation.defaultAdapter, adapter)) || this;
                _this.isOpen_ = false;
                _this.animationFrame_ = 0;
                _this.animationTimer_ = 0;
                _this.autoDismissTimer_ = 0;
                _this.autoDismissTimeoutMs_ = constants_1.numbers.DEFAULT_AUTO_DISMISS_TIMEOUT_MS;
                _this.closeOnEscape_ = true;
                return _this;
            }
            Object.defineProperty(MDCSnackbarFoundation, "cssClasses", {
                get: function get() {
                    return constants_1.cssClasses;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MDCSnackbarFoundation, "strings", {
                get: function get() {
                    return constants_1.strings;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MDCSnackbarFoundation, "numbers", {
                get: function get() {
                    return constants_1.numbers;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MDCSnackbarFoundation, "defaultAdapter", {
                get: function get() {
                    return {
                        addClass: function addClass() {
                            return undefined;
                        },
                        announce: function announce() {
                            return undefined;
                        },
                        notifyClosed: function notifyClosed() {
                            return undefined;
                        },
                        notifyClosing: function notifyClosing() {
                            return undefined;
                        },
                        notifyOpened: function notifyOpened() {
                            return undefined;
                        },
                        notifyOpening: function notifyOpening() {
                            return undefined;
                        },
                        removeClass: function removeClass() {
                            return undefined;
                        }
                    };
                },
                enumerable: true,
                configurable: true
            });
            MDCSnackbarFoundation.prototype.destroy = function() {
                this.clearAutoDismissTimer_();
                cancelAnimationFrame(this.animationFrame_);
                this.animationFrame_ = 0;
                clearTimeout(this.animationTimer_);
                this.animationTimer_ = 0;
                this.adapter_.removeClass(OPENING);
                this.adapter_.removeClass(OPEN);
                this.adapter_.removeClass(CLOSING);
            };
            MDCSnackbarFoundation.prototype.open = function() {
                var _this = this;
                this.clearAutoDismissTimer_();
                this.isOpen_ = true;
                this.adapter_.notifyOpening();
                this.adapter_.removeClass(CLOSING);
                this.adapter_.addClass(OPENING);
                this.adapter_.announce();
                this.runNextAnimationFrame_(function() {
                    _this.adapter_.addClass(OPEN);
                    _this.animationTimer_ = setTimeout(function() {
                        _this.handleAnimationTimerEnd_();
                        _this.adapter_.notifyOpened();
                        _this.autoDismissTimer_ = setTimeout(function() {
                            _this.close(REASON_DISMISS);
                        }, _this.getTimeoutMs());
                    }, constants_1.numbers.SNACKBAR_ANIMATION_OPEN_TIME_MS);
                });
            };
            MDCSnackbarFoundation.prototype.close = function(reason) {
                var _this = this;
                if (reason === void 0) {
                    reason = "";
                }
                if (!this.isOpen_) {
                    return;
                }
                cancelAnimationFrame(this.animationFrame_);
                this.animationFrame_ = 0;
                this.clearAutoDismissTimer_();
                this.isOpen_ = false;
                this.adapter_.notifyClosing(reason);
                this.adapter_.addClass(constants_1.cssClasses.CLOSING);
                this.adapter_.removeClass(constants_1.cssClasses.OPEN);
                this.adapter_.removeClass(constants_1.cssClasses.OPENING);
                clearTimeout(this.animationTimer_);
                this.animationTimer_ = setTimeout(function() {
                    _this.handleAnimationTimerEnd_();
                    _this.adapter_.notifyClosed(reason);
                }, constants_1.numbers.SNACKBAR_ANIMATION_CLOSE_TIME_MS);
            };
            MDCSnackbarFoundation.prototype.isOpen = function() {
                return this.isOpen_;
            };
            MDCSnackbarFoundation.prototype.getTimeoutMs = function() {
                return this.autoDismissTimeoutMs_;
            };
            MDCSnackbarFoundation.prototype.setTimeoutMs = function(timeoutMs) {
                var minValue = constants_1.numbers.MIN_AUTO_DISMISS_TIMEOUT_MS;
                var maxValue = constants_1.numbers.MAX_AUTO_DISMISS_TIMEOUT_MS;
                if (timeoutMs <= maxValue && timeoutMs >= minValue) {
                    this.autoDismissTimeoutMs_ = timeoutMs;
                } else {
                    throw new Error("timeoutMs must be an integer in the range " + minValue + "–" + maxValue + ", but got '" + timeoutMs + "'");
                }
            };
            MDCSnackbarFoundation.prototype.getCloseOnEscape = function() {
                return this.closeOnEscape_;
            };
            MDCSnackbarFoundation.prototype.setCloseOnEscape = function(closeOnEscape) {
                this.closeOnEscape_ = closeOnEscape;
            };
            MDCSnackbarFoundation.prototype.handleKeyDown = function(evt) {
                var isEscapeKey = evt.key === "Escape" || evt.keyCode === 27;
                if (isEscapeKey && this.getCloseOnEscape()) {
                    this.close(REASON_DISMISS);
                }
            };
            MDCSnackbarFoundation.prototype.handleActionButtonClick = function(_evt) {
                this.close(REASON_ACTION);
            };
            MDCSnackbarFoundation.prototype.handleActionIconClick = function(_evt) {
                this.close(REASON_DISMISS);
            };
            MDCSnackbarFoundation.prototype.clearAutoDismissTimer_ = function() {
                clearTimeout(this.autoDismissTimer_);
                this.autoDismissTimer_ = 0;
            };
            MDCSnackbarFoundation.prototype.handleAnimationTimerEnd_ = function() {
                this.animationTimer_ = 0;
                this.adapter_.removeClass(constants_1.cssClasses.OPENING);
                this.adapter_.removeClass(constants_1.cssClasses.CLOSING);
            };
            MDCSnackbarFoundation.prototype.runNextAnimationFrame_ = function(callback) {
                var _this = this;
                cancelAnimationFrame(this.animationFrame_);
                this.animationFrame_ = requestAnimationFrame(function() {
                    _this.animationFrame_ = 0;
                    clearTimeout(_this.animationTimer_);
                    _this.animationTimer_ = setTimeout(callback, 0);
                });
            };
            return MDCSnackbarFoundation;
        }(foundation_1.MDCFoundation);
        exports.MDCSnackbarFoundation = MDCSnackbarFoundation;
        exports.default = MDCSnackbarFoundation;
    }, function(module, exports, __webpack_require__) {
        "use strict";
        var __extends = this && this.__extends || function() {
            var _extendStatics = function extendStatics(d, b) {
                _extendStatics = Object.setPrototypeOf || {
                    __proto__: []
                } instanceof Array && function(d, b) {
                    d.__proto__ = b;
                } || function(d, b) {
                    for (var p in b) {
                        if (b.hasOwnProperty(p)) d[p] = b[p];
                    }
                };
                return _extendStatics(d, b);
            };
            return function(d, b) {
                _extendStatics(d, b);
                function __() {
                    this.constructor = d;
                }
                d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
            };
        }();
        var __assign = this && this.__assign || function() {
            __assign = Object.assign || function(t) {
                for (var s, i = 1, n = arguments.length; i < n; i++) {
                    s = arguments[i];
                    for (var p in s) {
                        if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
                    }
                }
                return t;
            };
            return __assign.apply(this, arguments);
        };
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var foundation_1 = __webpack_require__(0);
        var constants_1 = __webpack_require__(76);
        var MDCSwitchFoundation = function(_super) {
            __extends(MDCSwitchFoundation, _super);
            function MDCSwitchFoundation(adapter) {
                return _super.call(this, __assign({}, MDCSwitchFoundation.defaultAdapter, adapter)) || this;
            }
            Object.defineProperty(MDCSwitchFoundation, "strings", {
                get: function get() {
                    return constants_1.strings;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MDCSwitchFoundation, "cssClasses", {
                get: function get() {
                    return constants_1.cssClasses;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MDCSwitchFoundation, "defaultAdapter", {
                get: function get() {
                    return {
                        addClass: function addClass() {
                            return undefined;
                        },
                        removeClass: function removeClass() {
                            return undefined;
                        },
                        setNativeControlChecked: function setNativeControlChecked() {
                            return undefined;
                        },
                        setNativeControlDisabled: function setNativeControlDisabled() {
                            return undefined;
                        }
                    };
                },
                enumerable: true,
                configurable: true
            });
            MDCSwitchFoundation.prototype.setChecked = function(checked) {
                this.adapter_.setNativeControlChecked(checked);
                this.updateCheckedStyling_(checked);
            };
            MDCSwitchFoundation.prototype.setDisabled = function(disabled) {
                this.adapter_.setNativeControlDisabled(disabled);
                if (disabled) {
                    this.adapter_.addClass(constants_1.cssClasses.DISABLED);
                } else {
                    this.adapter_.removeClass(constants_1.cssClasses.DISABLED);
                }
            };
            MDCSwitchFoundation.prototype.handleChange = function(evt) {
                var nativeControl = evt.target;
                this.updateCheckedStyling_(nativeControl.checked);
            };
            MDCSwitchFoundation.prototype.updateCheckedStyling_ = function(checked) {
                if (checked) {
                    this.adapter_.addClass(constants_1.cssClasses.CHECKED);
                } else {
                    this.adapter_.removeClass(constants_1.cssClasses.CHECKED);
                }
            };
            return MDCSwitchFoundation;
        }(foundation_1.MDCFoundation);
        exports.MDCSwitchFoundation = MDCSwitchFoundation;
        exports.default = MDCSwitchFoundation;
    }, function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var cssClasses = {
            CHECKED: "mdc-switch--checked",
            DISABLED: "mdc-switch--disabled"
        };
        exports.cssClasses = cssClasses;
        var strings = {
            NATIVE_CONTROL_SELECTOR: ".mdc-switch__native-control",
            RIPPLE_SURFACE_SELECTOR: ".mdc-switch__thumb-underlay"
        };
        exports.strings = strings;
    }, function(module, exports, __webpack_require__) {
        "use strict";
        var __extends = this && this.__extends || function() {
            var _extendStatics = function extendStatics(d, b) {
                _extendStatics = Object.setPrototypeOf || {
                    __proto__: []
                } instanceof Array && function(d, b) {
                    d.__proto__ = b;
                } || function(d, b) {
                    for (var p in b) {
                        if (b.hasOwnProperty(p)) d[p] = b[p];
                    }
                };
                return _extendStatics(d, b);
            };
            return function(d, b) {
                _extendStatics(d, b);
                function __() {
                    this.constructor = d;
                }
                d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
            };
        }();
        var __importStar = this && this.__importStar || function(mod) {
            if (mod && mod.__esModule) return mod;
            var result = {};
            if (mod != null) for (var k in mod) {
                if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
            }
            result["default"] = mod;
            return result;
        };
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var component_1 = __webpack_require__(1);
        var ponyfill_1 = __webpack_require__(3);
        var foundation_1 = __webpack_require__(78);
        var util = __importStar(__webpack_require__(79));
        var MDCTabScroller = function(_super) {
            __extends(MDCTabScroller, _super);
            function MDCTabScroller() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            MDCTabScroller.attachTo = function(root) {
                return new MDCTabScroller(root);
            };
            MDCTabScroller.prototype.initialize = function() {
                this.area_ = this.root_.querySelector(foundation_1.MDCTabScrollerFoundation.strings.AREA_SELECTOR);
                this.content_ = this.root_.querySelector(foundation_1.MDCTabScrollerFoundation.strings.CONTENT_SELECTOR);
            };
            MDCTabScroller.prototype.initialSyncWithDOM = function() {
                var _this = this;
                this.handleInteraction_ = function() {
                    return _this.foundation_.handleInteraction();
                };
                this.handleTransitionEnd_ = function(evt) {
                    return _this.foundation_.handleTransitionEnd(evt);
                };
                this.area_.addEventListener("wheel", this.handleInteraction_);
                this.area_.addEventListener("touchstart", this.handleInteraction_);
                this.area_.addEventListener("pointerdown", this.handleInteraction_);
                this.area_.addEventListener("mousedown", this.handleInteraction_);
                this.area_.addEventListener("keydown", this.handleInteraction_);
                this.content_.addEventListener("transitionend", this.handleTransitionEnd_);
            };
            MDCTabScroller.prototype.destroy = function() {
                _super.prototype.destroy.call(this);
                this.area_.removeEventListener("wheel", this.handleInteraction_);
                this.area_.removeEventListener("touchstart", this.handleInteraction_);
                this.area_.removeEventListener("pointerdown", this.handleInteraction_);
                this.area_.removeEventListener("mousedown", this.handleInteraction_);
                this.area_.removeEventListener("keydown", this.handleInteraction_);
                this.content_.removeEventListener("transitionend", this.handleTransitionEnd_);
            };
            MDCTabScroller.prototype.getDefaultFoundation = function() {
                var _this = this;
                var adapter = {
                    eventTargetMatchesSelector: function eventTargetMatchesSelector(evtTarget, selector) {
                        return ponyfill_1.matches(evtTarget, selector);
                    },
                    addClass: function addClass(className) {
                        return _this.root_.classList.add(className);
                    },
                    removeClass: function removeClass(className) {
                        return _this.root_.classList.remove(className);
                    },
                    addScrollAreaClass: function addScrollAreaClass(className) {
                        return _this.area_.classList.add(className);
                    },
                    setScrollAreaStyleProperty: function setScrollAreaStyleProperty(prop, value) {
                        return _this.area_.style.setProperty(prop, value);
                    },
                    setScrollContentStyleProperty: function setScrollContentStyleProperty(prop, value) {
                        return _this.content_.style.setProperty(prop, value);
                    },
                    getScrollContentStyleValue: function getScrollContentStyleValue(propName) {
                        return window.getComputedStyle(_this.content_).getPropertyValue(propName);
                    },
                    setScrollAreaScrollLeft: function setScrollAreaScrollLeft(scrollX) {
                        return _this.area_.scrollLeft = scrollX;
                    },
                    getScrollAreaScrollLeft: function getScrollAreaScrollLeft() {
                        return _this.area_.scrollLeft;
                    },
                    getScrollContentOffsetWidth: function getScrollContentOffsetWidth() {
                        return _this.content_.offsetWidth;
                    },
                    getScrollAreaOffsetWidth: function getScrollAreaOffsetWidth() {
                        return _this.area_.offsetWidth;
                    },
                    computeScrollAreaClientRect: function computeScrollAreaClientRect() {
                        return _this.area_.getBoundingClientRect();
                    },
                    computeScrollContentClientRect: function computeScrollContentClientRect() {
                        return _this.content_.getBoundingClientRect();
                    },
                    computeHorizontalScrollbarHeight: function computeHorizontalScrollbarHeight() {
                        return util.computeHorizontalScrollbarHeight(document);
                    }
                };
                return new foundation_1.MDCTabScrollerFoundation(adapter);
            };
            MDCTabScroller.prototype.getScrollPosition = function() {
                return this.foundation_.getScrollPosition();
            };
            MDCTabScroller.prototype.getScrollContentWidth = function() {
                return this.content_.offsetWidth;
            };
            MDCTabScroller.prototype.incrementScroll = function(scrollXIncrement) {
                this.foundation_.incrementScroll(scrollXIncrement);
            };
            MDCTabScroller.prototype.scrollTo = function(scrollX) {
                this.foundation_.scrollTo(scrollX);
            };
            return MDCTabScroller;
        }(component_1.MDCComponent);
        exports.MDCTabScroller = MDCTabScroller;
    }, function(module, exports, __webpack_require__) {
        "use strict";
        var __extends = this && this.__extends || function() {
            var _extendStatics = function extendStatics(d, b) {
                _extendStatics = Object.setPrototypeOf || {
                    __proto__: []
                } instanceof Array && function(d, b) {
                    d.__proto__ = b;
                } || function(d, b) {
                    for (var p in b) {
                        if (b.hasOwnProperty(p)) d[p] = b[p];
                    }
                };
                return _extendStatics(d, b);
            };
            return function(d, b) {
                _extendStatics(d, b);
                function __() {
                    this.constructor = d;
                }
                d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
            };
        }();
        var __assign = this && this.__assign || function() {
            __assign = Object.assign || function(t) {
                for (var s, i = 1, n = arguments.length; i < n; i++) {
                    s = arguments[i];
                    for (var p in s) {
                        if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
                    }
                }
                return t;
            };
            return __assign.apply(this, arguments);
        };
        var __read = this && this.__read || function(o, n) {
            var m = typeof Symbol === "function" && o[Symbol.iterator];
            if (!m) return o;
            var i = m.call(o), r, ar = [], e;
            try {
                while ((n === void 0 || n-- > 0) && !(r = i.next()).done) {
                    ar.push(r.value);
                }
            } catch (error) {
                e = {
                    error: error
                };
            } finally {
                try {
                    if (r && !r.done && (m = i["return"])) m.call(i);
                } finally {
                    if (e) throw e.error;
                }
            }
            return ar;
        };
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var foundation_1 = __webpack_require__(0);
        var constants_1 = __webpack_require__(26);
        var rtl_default_scroller_1 = __webpack_require__(149);
        var rtl_negative_scroller_1 = __webpack_require__(150);
        var rtl_reverse_scroller_1 = __webpack_require__(151);
        var MDCTabScrollerFoundation = function(_super) {
            __extends(MDCTabScrollerFoundation, _super);
            function MDCTabScrollerFoundation(adapter) {
                var _this = _super.call(this, __assign({}, MDCTabScrollerFoundation.defaultAdapter, adapter)) || this;
                _this.isAnimating_ = false;
                return _this;
            }
            Object.defineProperty(MDCTabScrollerFoundation, "cssClasses", {
                get: function get() {
                    return constants_1.cssClasses;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MDCTabScrollerFoundation, "strings", {
                get: function get() {
                    return constants_1.strings;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MDCTabScrollerFoundation, "defaultAdapter", {
                get: function get() {
                    return {
                        eventTargetMatchesSelector: function eventTargetMatchesSelector() {
                            return false;
                        },
                        addClass: function addClass() {
                            return undefined;
                        },
                        removeClass: function removeClass() {
                            return undefined;
                        },
                        addScrollAreaClass: function addScrollAreaClass() {
                            return undefined;
                        },
                        setScrollAreaStyleProperty: function setScrollAreaStyleProperty() {
                            return undefined;
                        },
                        setScrollContentStyleProperty: function setScrollContentStyleProperty() {
                            return undefined;
                        },
                        getScrollContentStyleValue: function getScrollContentStyleValue() {
                            return "";
                        },
                        setScrollAreaScrollLeft: function setScrollAreaScrollLeft() {
                            return undefined;
                        },
                        getScrollAreaScrollLeft: function getScrollAreaScrollLeft() {
                            return 0;
                        },
                        getScrollContentOffsetWidth: function getScrollContentOffsetWidth() {
                            return 0;
                        },
                        getScrollAreaOffsetWidth: function getScrollAreaOffsetWidth() {
                            return 0;
                        },
                        computeScrollAreaClientRect: function computeScrollAreaClientRect() {
                            return {
                                top: 0,
                                right: 0,
                                bottom: 0,
                                left: 0,
                                width: 0,
                                height: 0
                            };
                        },
                        computeScrollContentClientRect: function computeScrollContentClientRect() {
                            return {
                                top: 0,
                                right: 0,
                                bottom: 0,
                                left: 0,
                                width: 0,
                                height: 0
                            };
                        },
                        computeHorizontalScrollbarHeight: function computeHorizontalScrollbarHeight() {
                            return 0;
                        }
                    };
                },
                enumerable: true,
                configurable: true
            });
            MDCTabScrollerFoundation.prototype.init = function() {
                var horizontalScrollbarHeight = this.adapter_.computeHorizontalScrollbarHeight();
                this.adapter_.setScrollAreaStyleProperty("margin-bottom", -horizontalScrollbarHeight + "px");
                this.adapter_.addScrollAreaClass(MDCTabScrollerFoundation.cssClasses.SCROLL_AREA_SCROLL);
            };
            MDCTabScrollerFoundation.prototype.getScrollPosition = function() {
                if (this.isRTL_()) {
                    return this.computeCurrentScrollPositionRTL_();
                }
                var currentTranslateX = this.calculateCurrentTranslateX_();
                var scrollLeft = this.adapter_.getScrollAreaScrollLeft();
                return scrollLeft - currentTranslateX;
            };
            MDCTabScrollerFoundation.prototype.handleInteraction = function() {
                if (!this.isAnimating_) {
                    return;
                }
                this.stopScrollAnimation_();
            };
            MDCTabScrollerFoundation.prototype.handleTransitionEnd = function(evt) {
                var evtTarget = evt.target;
                if (!this.isAnimating_ || !this.adapter_.eventTargetMatchesSelector(evtTarget, MDCTabScrollerFoundation.strings.CONTENT_SELECTOR)) {
                    return;
                }
                this.isAnimating_ = false;
                this.adapter_.removeClass(MDCTabScrollerFoundation.cssClasses.ANIMATING);
            };
            MDCTabScrollerFoundation.prototype.incrementScroll = function(scrollXIncrement) {
                if (scrollXIncrement === 0) {
                    return;
                }
                if (this.isRTL_()) {
                    return this.incrementScrollRTL_(scrollXIncrement);
                }
                this.incrementScroll_(scrollXIncrement);
            };
            MDCTabScrollerFoundation.prototype.scrollTo = function(scrollX) {
                if (this.isRTL_()) {
                    return this.scrollToRTL_(scrollX);
                }
                this.scrollTo_(scrollX);
            };
            MDCTabScrollerFoundation.prototype.getRTLScroller = function() {
                if (!this.rtlScrollerInstance_) {
                    this.rtlScrollerInstance_ = this.rtlScrollerFactory_();
                }
                return this.rtlScrollerInstance_;
            };
            MDCTabScrollerFoundation.prototype.calculateCurrentTranslateX_ = function() {
                var transformValue = this.adapter_.getScrollContentStyleValue("transform");
                if (transformValue === "none") {
                    return 0;
                }
                var match = /\((.+?)\)/.exec(transformValue);
                if (!match) {
                    return 0;
                }
                var matrixParams = match[1];
                var _a = __read(matrixParams.split(","), 6), a = _a[0], b = _a[1], c = _a[2], d = _a[3], tx = _a[4], ty = _a[5];
                return parseFloat(tx);
            };
            MDCTabScrollerFoundation.prototype.clampScrollValue_ = function(scrollX) {
                var edges = this.calculateScrollEdges_();
                return Math.min(Math.max(edges.left, scrollX), edges.right);
            };
            MDCTabScrollerFoundation.prototype.computeCurrentScrollPositionRTL_ = function() {
                var translateX = this.calculateCurrentTranslateX_();
                return this.getRTLScroller().getScrollPositionRTL(translateX);
            };
            MDCTabScrollerFoundation.prototype.calculateScrollEdges_ = function() {
                var contentWidth = this.adapter_.getScrollContentOffsetWidth();
                var rootWidth = this.adapter_.getScrollAreaOffsetWidth();
                return {
                    left: 0,
                    right: contentWidth - rootWidth
                };
            };
            MDCTabScrollerFoundation.prototype.scrollTo_ = function(scrollX) {
                var currentScrollX = this.getScrollPosition();
                var safeScrollX = this.clampScrollValue_(scrollX);
                var scrollDelta = safeScrollX - currentScrollX;
                this.animate_({
                    finalScrollPosition: safeScrollX,
                    scrollDelta: scrollDelta
                });
            };
            MDCTabScrollerFoundation.prototype.scrollToRTL_ = function(scrollX) {
                var animation = this.getRTLScroller().scrollToRTL(scrollX);
                this.animate_(animation);
            };
            MDCTabScrollerFoundation.prototype.incrementScroll_ = function(scrollX) {
                var currentScrollX = this.getScrollPosition();
                var targetScrollX = scrollX + currentScrollX;
                var safeScrollX = this.clampScrollValue_(targetScrollX);
                var scrollDelta = safeScrollX - currentScrollX;
                this.animate_({
                    finalScrollPosition: safeScrollX,
                    scrollDelta: scrollDelta
                });
            };
            MDCTabScrollerFoundation.prototype.incrementScrollRTL_ = function(scrollX) {
                var animation = this.getRTLScroller().incrementScrollRTL(scrollX);
                this.animate_(animation);
            };
            MDCTabScrollerFoundation.prototype.animate_ = function(animation) {
                var _this = this;
                if (animation.scrollDelta === 0) {
                    return;
                }
                this.stopScrollAnimation_();
                this.adapter_.setScrollAreaScrollLeft(animation.finalScrollPosition);
                this.adapter_.setScrollContentStyleProperty("transform", "translateX(" + animation.scrollDelta + "px)");
                this.adapter_.computeScrollAreaClientRect();
                requestAnimationFrame(function() {
                    _this.adapter_.addClass(MDCTabScrollerFoundation.cssClasses.ANIMATING);
                    _this.adapter_.setScrollContentStyleProperty("transform", "none");
                });
                this.isAnimating_ = true;
            };
            MDCTabScrollerFoundation.prototype.stopScrollAnimation_ = function() {
                this.isAnimating_ = false;
                var currentScrollPosition = this.getAnimatingScrollPosition_();
                this.adapter_.removeClass(MDCTabScrollerFoundation.cssClasses.ANIMATING);
                this.adapter_.setScrollContentStyleProperty("transform", "translateX(0px)");
                this.adapter_.setScrollAreaScrollLeft(currentScrollPosition);
            };
            MDCTabScrollerFoundation.prototype.getAnimatingScrollPosition_ = function() {
                var currentTranslateX = this.calculateCurrentTranslateX_();
                var scrollLeft = this.adapter_.getScrollAreaScrollLeft();
                if (this.isRTL_()) {
                    return this.getRTLScroller().getAnimatingScrollPosition(scrollLeft, currentTranslateX);
                }
                return scrollLeft - currentTranslateX;
            };
            MDCTabScrollerFoundation.prototype.rtlScrollerFactory_ = function() {
                var initialScrollLeft = this.adapter_.getScrollAreaScrollLeft();
                this.adapter_.setScrollAreaScrollLeft(initialScrollLeft - 1);
                var newScrollLeft = this.adapter_.getScrollAreaScrollLeft();
                if (newScrollLeft < 0) {
                    this.adapter_.setScrollAreaScrollLeft(initialScrollLeft);
                    return new rtl_negative_scroller_1.MDCTabScrollerRTLNegative(this.adapter_);
                }
                var rootClientRect = this.adapter_.computeScrollAreaClientRect();
                var contentClientRect = this.adapter_.computeScrollContentClientRect();
                var rightEdgeDelta = Math.round(contentClientRect.right - rootClientRect.right);
                this.adapter_.setScrollAreaScrollLeft(initialScrollLeft);
                if (rightEdgeDelta === newScrollLeft) {
                    return new rtl_reverse_scroller_1.MDCTabScrollerRTLReverse(this.adapter_);
                }
                return new rtl_default_scroller_1.MDCTabScrollerRTLDefault(this.adapter_);
            };
            MDCTabScrollerFoundation.prototype.isRTL_ = function() {
                return this.adapter_.getScrollContentStyleValue("direction") === "rtl";
            };
            return MDCTabScrollerFoundation;
        }(foundation_1.MDCFoundation);
        exports.MDCTabScrollerFoundation = MDCTabScrollerFoundation;
        exports.default = MDCTabScrollerFoundation;
    }, function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var constants_1 = __webpack_require__(26);
        var horizontalScrollbarHeight_;
        function computeHorizontalScrollbarHeight(documentObj, shouldCacheResult) {
            if (shouldCacheResult === void 0) {
                shouldCacheResult = true;
            }
            if (shouldCacheResult && typeof horizontalScrollbarHeight_ !== "undefined") {
                return horizontalScrollbarHeight_;
            }
            var el = documentObj.createElement("div");
            el.classList.add(constants_1.cssClasses.SCROLL_TEST);
            documentObj.body.appendChild(el);
            var horizontalScrollbarHeight = el.offsetHeight - el.clientHeight;
            documentObj.body.removeChild(el);
            if (shouldCacheResult) {
                horizontalScrollbarHeight_ = horizontalScrollbarHeight;
            }
            return horizontalScrollbarHeight;
        }
        exports.computeHorizontalScrollbarHeight = computeHorizontalScrollbarHeight;
    }, function(module, exports, __webpack_require__) {
        "use strict";
        var __extends = this && this.__extends || function() {
            var _extendStatics = function extendStatics(d, b) {
                _extendStatics = Object.setPrototypeOf || {
                    __proto__: []
                } instanceof Array && function(d, b) {
                    d.__proto__ = b;
                } || function(d, b) {
                    for (var p in b) {
                        if (b.hasOwnProperty(p)) d[p] = b[p];
                    }
                };
                return _extendStatics(d, b);
            };
            return function(d, b) {
                _extendStatics(d, b);
                function __() {
                    this.constructor = d;
                }
                d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
            };
        }();
        var __assign = this && this.__assign || function() {
            __assign = Object.assign || function(t) {
                for (var s, i = 1, n = arguments.length; i < n; i++) {
                    s = arguments[i];
                    for (var p in s) {
                        if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
                    }
                }
                return t;
            };
            return __assign.apply(this, arguments);
        };
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var component_1 = __webpack_require__(1);
        var component_2 = __webpack_require__(2);
        var foundation_1 = __webpack_require__(4);
        var component_3 = __webpack_require__(81);
        var foundation_2 = __webpack_require__(28);
        var MDCTab = function(_super) {
            __extends(MDCTab, _super);
            function MDCTab() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            MDCTab.attachTo = function(root) {
                return new MDCTab(root);
            };
            MDCTab.prototype.initialize = function(rippleFactory, tabIndicatorFactory) {
                if (rippleFactory === void 0) {
                    rippleFactory = function rippleFactory(el, foundation) {
                        return new component_2.MDCRipple(el, foundation);
                    };
                }
                if (tabIndicatorFactory === void 0) {
                    tabIndicatorFactory = function tabIndicatorFactory(el) {
                        return new component_3.MDCTabIndicator(el);
                    };
                }
                this.id = this.root_.id;
                var rippleSurface = this.root_.querySelector(foundation_2.MDCTabFoundation.strings.RIPPLE_SELECTOR);
                var rippleAdapter = __assign({}, component_2.MDCRipple.createAdapter(this), {
                    addClass: function addClass(className) {
                        return rippleSurface.classList.add(className);
                    },
                    removeClass: function removeClass(className) {
                        return rippleSurface.classList.remove(className);
                    },
                    updateCssVariable: function updateCssVariable(varName, value) {
                        return rippleSurface.style.setProperty(varName, value);
                    }
                });
                var rippleFoundation = new foundation_1.MDCRippleFoundation(rippleAdapter);
                this.ripple_ = rippleFactory(this.root_, rippleFoundation);
                var tabIndicatorElement = this.root_.querySelector(foundation_2.MDCTabFoundation.strings.TAB_INDICATOR_SELECTOR);
                this.tabIndicator_ = tabIndicatorFactory(tabIndicatorElement);
                this.content_ = this.root_.querySelector(foundation_2.MDCTabFoundation.strings.CONTENT_SELECTOR);
            };
            MDCTab.prototype.initialSyncWithDOM = function() {
                var _this = this;
                this.handleClick_ = function() {
                    return _this.foundation_.handleClick();
                };
                this.listen("click", this.handleClick_);
            };
            MDCTab.prototype.destroy = function() {
                this.unlisten("click", this.handleClick_);
                this.ripple_.destroy();
                _super.prototype.destroy.call(this);
            };
            MDCTab.prototype.getDefaultFoundation = function() {
                var _this = this;
                var adapter = {
                    setAttr: function setAttr(attr, value) {
                        return _this.root_.setAttribute(attr, value);
                    },
                    addClass: function addClass(className) {
                        return _this.root_.classList.add(className);
                    },
                    removeClass: function removeClass(className) {
                        return _this.root_.classList.remove(className);
                    },
                    hasClass: function hasClass(className) {
                        return _this.root_.classList.contains(className);
                    },
                    activateIndicator: function activateIndicator(previousIndicatorClientRect) {
                        return _this.tabIndicator_.activate(previousIndicatorClientRect);
                    },
                    deactivateIndicator: function deactivateIndicator() {
                        return _this.tabIndicator_.deactivate();
                    },
                    notifyInteracted: function notifyInteracted() {
                        return _this.emit(foundation_2.MDCTabFoundation.strings.INTERACTED_EVENT, {
                            tabId: _this.id
                        }, true);
                    },
                    getOffsetLeft: function getOffsetLeft() {
                        return _this.root_.offsetLeft;
                    },
                    getOffsetWidth: function getOffsetWidth() {
                        return _this.root_.offsetWidth;
                    },
                    getContentOffsetLeft: function getContentOffsetLeft() {
                        return _this.content_.offsetLeft;
                    },
                    getContentOffsetWidth: function getContentOffsetWidth() {
                        return _this.content_.offsetWidth;
                    },
                    focus: function focus() {
                        return _this.root_.focus();
                    }
                };
                return new foundation_2.MDCTabFoundation(adapter);
            };
            Object.defineProperty(MDCTab.prototype, "active", {
                get: function get() {
                    return this.foundation_.isActive();
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MDCTab.prototype, "focusOnActivate", {
                set: function set(focusOnActivate) {
                    this.foundation_.setFocusOnActivate(focusOnActivate);
                },
                enumerable: true,
                configurable: true
            });
            MDCTab.prototype.activate = function(computeIndicatorClientRect) {
                this.foundation_.activate(computeIndicatorClientRect);
            };
            MDCTab.prototype.deactivate = function() {
                this.foundation_.deactivate();
            };
            MDCTab.prototype.computeIndicatorClientRect = function() {
                return this.tabIndicator_.computeContentClientRect();
            };
            MDCTab.prototype.computeDimensions = function() {
                return this.foundation_.computeDimensions();
            };
            MDCTab.prototype.focus = function() {
                this.root_.focus();
            };
            return MDCTab;
        }(component_1.MDCComponent);
        exports.MDCTab = MDCTab;
    }, function(module, exports, __webpack_require__) {
        "use strict";
        var __extends = this && this.__extends || function() {
            var _extendStatics = function extendStatics(d, b) {
                _extendStatics = Object.setPrototypeOf || {
                    __proto__: []
                } instanceof Array && function(d, b) {
                    d.__proto__ = b;
                } || function(d, b) {
                    for (var p in b) {
                        if (b.hasOwnProperty(p)) d[p] = b[p];
                    }
                };
                return _extendStatics(d, b);
            };
            return function(d, b) {
                _extendStatics(d, b);
                function __() {
                    this.constructor = d;
                }
                d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
            };
        }();
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var component_1 = __webpack_require__(1);
        var fading_foundation_1 = __webpack_require__(82);
        var foundation_1 = __webpack_require__(11);
        var sliding_foundation_1 = __webpack_require__(84);
        var MDCTabIndicator = function(_super) {
            __extends(MDCTabIndicator, _super);
            function MDCTabIndicator() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            MDCTabIndicator.attachTo = function(root) {
                return new MDCTabIndicator(root);
            };
            MDCTabIndicator.prototype.initialize = function() {
                this.content_ = this.root_.querySelector(foundation_1.MDCTabIndicatorFoundation.strings.CONTENT_SELECTOR);
            };
            MDCTabIndicator.prototype.computeContentClientRect = function() {
                return this.foundation_.computeContentClientRect();
            };
            MDCTabIndicator.prototype.getDefaultFoundation = function() {
                var _this = this;
                var adapter = {
                    addClass: function addClass(className) {
                        return _this.root_.classList.add(className);
                    },
                    removeClass: function removeClass(className) {
                        return _this.root_.classList.remove(className);
                    },
                    computeContentClientRect: function computeContentClientRect() {
                        return _this.content_.getBoundingClientRect();
                    },
                    setContentStyleProperty: function setContentStyleProperty(prop, value) {
                        return _this.content_.style.setProperty(prop, value);
                    }
                };
                if (this.root_.classList.contains(foundation_1.MDCTabIndicatorFoundation.cssClasses.FADE)) {
                    return new fading_foundation_1.MDCFadingTabIndicatorFoundation(adapter);
                }
                return new sliding_foundation_1.MDCSlidingTabIndicatorFoundation(adapter);
            };
            MDCTabIndicator.prototype.activate = function(previousIndicatorClientRect) {
                this.foundation_.activate(previousIndicatorClientRect);
            };
            MDCTabIndicator.prototype.deactivate = function() {
                this.foundation_.deactivate();
            };
            return MDCTabIndicator;
        }(component_1.MDCComponent);
        exports.MDCTabIndicator = MDCTabIndicator;
    }, function(module, exports, __webpack_require__) {
        "use strict";
        var __extends = this && this.__extends || function() {
            var _extendStatics = function extendStatics(d, b) {
                _extendStatics = Object.setPrototypeOf || {
                    __proto__: []
                } instanceof Array && function(d, b) {
                    d.__proto__ = b;
                } || function(d, b) {
                    for (var p in b) {
                        if (b.hasOwnProperty(p)) d[p] = b[p];
                    }
                };
                return _extendStatics(d, b);
            };
            return function(d, b) {
                _extendStatics(d, b);
                function __() {
                    this.constructor = d;
                }
                d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
            };
        }();
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var foundation_1 = __webpack_require__(11);
        var MDCFadingTabIndicatorFoundation = function(_super) {
            __extends(MDCFadingTabIndicatorFoundation, _super);
            function MDCFadingTabIndicatorFoundation() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            MDCFadingTabIndicatorFoundation.prototype.activate = function() {
                this.adapter_.addClass(foundation_1.MDCTabIndicatorFoundation.cssClasses.ACTIVE);
            };
            MDCFadingTabIndicatorFoundation.prototype.deactivate = function() {
                this.adapter_.removeClass(foundation_1.MDCTabIndicatorFoundation.cssClasses.ACTIVE);
            };
            return MDCFadingTabIndicatorFoundation;
        }(foundation_1.MDCTabIndicatorFoundation);
        exports.MDCFadingTabIndicatorFoundation = MDCFadingTabIndicatorFoundation;
        exports.default = MDCFadingTabIndicatorFoundation;
    }, function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var cssClasses = {
            ACTIVE: "mdc-tab-indicator--active",
            FADE: "mdc-tab-indicator--fade",
            NO_TRANSITION: "mdc-tab-indicator--no-transition"
        };
        exports.cssClasses = cssClasses;
        var strings = {
            CONTENT_SELECTOR: ".mdc-tab-indicator__content"
        };
        exports.strings = strings;
    }, function(module, exports, __webpack_require__) {
        "use strict";
        var __extends = this && this.__extends || function() {
            var _extendStatics = function extendStatics(d, b) {
                _extendStatics = Object.setPrototypeOf || {
                    __proto__: []
                } instanceof Array && function(d, b) {
                    d.__proto__ = b;
                } || function(d, b) {
                    for (var p in b) {
                        if (b.hasOwnProperty(p)) d[p] = b[p];
                    }
                };
                return _extendStatics(d, b);
            };
            return function(d, b) {
                _extendStatics(d, b);
                function __() {
                    this.constructor = d;
                }
                d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
            };
        }();
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var foundation_1 = __webpack_require__(11);
        var MDCSlidingTabIndicatorFoundation = function(_super) {
            __extends(MDCSlidingTabIndicatorFoundation, _super);
            function MDCSlidingTabIndicatorFoundation() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            MDCSlidingTabIndicatorFoundation.prototype.activate = function(previousIndicatorClientRect) {
                if (!previousIndicatorClientRect) {
                    this.adapter_.addClass(foundation_1.MDCTabIndicatorFoundation.cssClasses.ACTIVE);
                    return;
                }
                var currentClientRect = this.computeContentClientRect();
                var widthDelta = previousIndicatorClientRect.width / currentClientRect.width;
                var xPosition = previousIndicatorClientRect.left - currentClientRect.left;
                this.adapter_.addClass(foundation_1.MDCTabIndicatorFoundation.cssClasses.NO_TRANSITION);
                this.adapter_.setContentStyleProperty("transform", "translateX(" + xPosition + "px) scaleX(" + widthDelta + ")");
                this.computeContentClientRect();
                this.adapter_.removeClass(foundation_1.MDCTabIndicatorFoundation.cssClasses.NO_TRANSITION);
                this.adapter_.addClass(foundation_1.MDCTabIndicatorFoundation.cssClasses.ACTIVE);
                this.adapter_.setContentStyleProperty("transform", "");
            };
            MDCSlidingTabIndicatorFoundation.prototype.deactivate = function() {
                this.adapter_.removeClass(foundation_1.MDCTabIndicatorFoundation.cssClasses.ACTIVE);
            };
            return MDCSlidingTabIndicatorFoundation;
        }(foundation_1.MDCTabIndicatorFoundation);
        exports.MDCSlidingTabIndicatorFoundation = MDCSlidingTabIndicatorFoundation;
        exports.default = MDCSlidingTabIndicatorFoundation;
    }, function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var cssClasses = {
            ACTIVE: "mdc-tab--active"
        };
        exports.cssClasses = cssClasses;
        var strings = {
            ARIA_SELECTED: "aria-selected",
            CONTENT_SELECTOR: ".mdc-tab__content",
            INTERACTED_EVENT: "MDCTab:interacted",
            RIPPLE_SELECTOR: ".mdc-tab__ripple",
            TABINDEX: "tabIndex",
            TAB_INDICATOR_SELECTOR: ".mdc-tab-indicator"
        };
        exports.strings = strings;
    }, function(module, exports, __webpack_require__) {
        "use strict";
        var __extends = this && this.__extends || function() {
            var _extendStatics = function extendStatics(d, b) {
                _extendStatics = Object.setPrototypeOf || {
                    __proto__: []
                } instanceof Array && function(d, b) {
                    d.__proto__ = b;
                } || function(d, b) {
                    for (var p in b) {
                        if (b.hasOwnProperty(p)) d[p] = b[p];
                    }
                };
                return _extendStatics(d, b);
            };
            return function(d, b) {
                _extendStatics(d, b);
                function __() {
                    this.constructor = d;
                }
                d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
            };
        }();
        var __assign = this && this.__assign || function() {
            __assign = Object.assign || function(t) {
                for (var s, i = 1, n = arguments.length; i < n; i++) {
                    s = arguments[i];
                    for (var p in s) {
                        if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
                    }
                }
                return t;
            };
            return __assign.apply(this, arguments);
        };
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var foundation_1 = __webpack_require__(0);
        var constants_1 = __webpack_require__(87);
        var ACCEPTABLE_KEYS = new Set();
        ACCEPTABLE_KEYS.add(constants_1.strings.ARROW_LEFT_KEY);
        ACCEPTABLE_KEYS.add(constants_1.strings.ARROW_RIGHT_KEY);
        ACCEPTABLE_KEYS.add(constants_1.strings.END_KEY);
        ACCEPTABLE_KEYS.add(constants_1.strings.HOME_KEY);
        ACCEPTABLE_KEYS.add(constants_1.strings.ENTER_KEY);
        ACCEPTABLE_KEYS.add(constants_1.strings.SPACE_KEY);
        var KEYCODE_MAP = new Map();
        KEYCODE_MAP.set(constants_1.numbers.ARROW_LEFT_KEYCODE, constants_1.strings.ARROW_LEFT_KEY);
        KEYCODE_MAP.set(constants_1.numbers.ARROW_RIGHT_KEYCODE, constants_1.strings.ARROW_RIGHT_KEY);
        KEYCODE_MAP.set(constants_1.numbers.END_KEYCODE, constants_1.strings.END_KEY);
        KEYCODE_MAP.set(constants_1.numbers.HOME_KEYCODE, constants_1.strings.HOME_KEY);
        KEYCODE_MAP.set(constants_1.numbers.ENTER_KEYCODE, constants_1.strings.ENTER_KEY);
        KEYCODE_MAP.set(constants_1.numbers.SPACE_KEYCODE, constants_1.strings.SPACE_KEY);
        var MDCTabBarFoundation = function(_super) {
            __extends(MDCTabBarFoundation, _super);
            function MDCTabBarFoundation(adapter) {
                var _this = _super.call(this, __assign({}, MDCTabBarFoundation.defaultAdapter, adapter)) || this;
                _this.useAutomaticActivation_ = false;
                return _this;
            }
            Object.defineProperty(MDCTabBarFoundation, "strings", {
                get: function get() {
                    return constants_1.strings;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MDCTabBarFoundation, "numbers", {
                get: function get() {
                    return constants_1.numbers;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MDCTabBarFoundation, "defaultAdapter", {
                get: function get() {
                    return {
                        scrollTo: function scrollTo() {
                            return undefined;
                        },
                        incrementScroll: function incrementScroll() {
                            return undefined;
                        },
                        getScrollPosition: function getScrollPosition() {
                            return 0;
                        },
                        getScrollContentWidth: function getScrollContentWidth() {
                            return 0;
                        },
                        getOffsetWidth: function getOffsetWidth() {
                            return 0;
                        },
                        isRTL: function isRTL() {
                            return false;
                        },
                        setActiveTab: function setActiveTab() {
                            return undefined;
                        },
                        activateTabAtIndex: function activateTabAtIndex() {
                            return undefined;
                        },
                        deactivateTabAtIndex: function deactivateTabAtIndex() {
                            return undefined;
                        },
                        focusTabAtIndex: function focusTabAtIndex() {
                            return undefined;
                        },
                        getTabIndicatorClientRectAtIndex: function getTabIndicatorClientRectAtIndex() {
                            return {
                                top: 0,
                                right: 0,
                                bottom: 0,
                                left: 0,
                                width: 0,
                                height: 0
                            };
                        },
                        getTabDimensionsAtIndex: function getTabDimensionsAtIndex() {
                            return {
                                rootLeft: 0,
                                rootRight: 0,
                                contentLeft: 0,
                                contentRight: 0
                            };
                        },
                        getPreviousActiveTabIndex: function getPreviousActiveTabIndex() {
                            return -1;
                        },
                        getFocusedTabIndex: function getFocusedTabIndex() {
                            return -1;
                        },
                        getIndexOfTabById: function getIndexOfTabById() {
                            return -1;
                        },
                        getTabListLength: function getTabListLength() {
                            return 0;
                        },
                        notifyTabActivated: function notifyTabActivated() {
                            return undefined;
                        }
                    };
                },
                enumerable: true,
                configurable: true
            });
            MDCTabBarFoundation.prototype.setUseAutomaticActivation = function(useAutomaticActivation) {
                this.useAutomaticActivation_ = useAutomaticActivation;
            };
            MDCTabBarFoundation.prototype.activateTab = function(index) {
                var previousActiveIndex = this.adapter_.getPreviousActiveTabIndex();
                if (!this.indexIsInRange_(index) || index === previousActiveIndex) {
                    return;
                }
                var previousClientRect;
                if (previousActiveIndex !== -1) {
                    this.adapter_.deactivateTabAtIndex(previousActiveIndex);
                    previousClientRect = this.adapter_.getTabIndicatorClientRectAtIndex(previousActiveIndex);
                }
                this.adapter_.activateTabAtIndex(index, previousClientRect);
                this.scrollIntoView(index);
                this.adapter_.notifyTabActivated(index);
            };
            MDCTabBarFoundation.prototype.handleKeyDown = function(evt) {
                var key = this.getKeyFromEvent_(evt);
                if (key === undefined) {
                    return;
                }
                if (!this.isActivationKey_(key)) {
                    evt.preventDefault();
                }
                if (this.useAutomaticActivation_) {
                    if (this.isActivationKey_(key)) {
                        return;
                    }
                    var index = this.determineTargetFromKey_(this.adapter_.getPreviousActiveTabIndex(), key);
                    this.adapter_.setActiveTab(index);
                    this.scrollIntoView(index);
                } else {
                    var focusedTabIndex = this.adapter_.getFocusedTabIndex();
                    if (this.isActivationKey_(key)) {
                        this.adapter_.setActiveTab(focusedTabIndex);
                    } else {
                        var index = this.determineTargetFromKey_(focusedTabIndex, key);
                        this.adapter_.focusTabAtIndex(index);
                        this.scrollIntoView(index);
                    }
                }
            };
            MDCTabBarFoundation.prototype.handleTabInteraction = function(evt) {
                this.adapter_.setActiveTab(this.adapter_.getIndexOfTabById(evt.detail.tabId));
            };
            MDCTabBarFoundation.prototype.scrollIntoView = function(index) {
                if (!this.indexIsInRange_(index)) {
                    return;
                }
                if (index === 0) {
                    return this.adapter_.scrollTo(0);
                }
                if (index === this.adapter_.getTabListLength() - 1) {
                    return this.adapter_.scrollTo(this.adapter_.getScrollContentWidth());
                }
                if (this.isRTL_()) {
                    return this.scrollIntoViewRTL_(index);
                }
                this.scrollIntoView_(index);
            };
            MDCTabBarFoundation.prototype.determineTargetFromKey_ = function(origin, key) {
                var isRTL = this.isRTL_();
                var maxIndex = this.adapter_.getTabListLength() - 1;
                var shouldGoToEnd = key === constants_1.strings.END_KEY;
                var shouldDecrement = key === constants_1.strings.ARROW_LEFT_KEY && !isRTL || key === constants_1.strings.ARROW_RIGHT_KEY && isRTL;
                var shouldIncrement = key === constants_1.strings.ARROW_RIGHT_KEY && !isRTL || key === constants_1.strings.ARROW_LEFT_KEY && isRTL;
                var index = origin;
                if (shouldGoToEnd) {
                    index = maxIndex;
                } else if (shouldDecrement) {
                    index -= 1;
                } else if (shouldIncrement) {
                    index += 1;
                } else {
                    index = 0;
                }
                if (index < 0) {
                    index = maxIndex;
                } else if (index > maxIndex) {
                    index = 0;
                }
                return index;
            };
            MDCTabBarFoundation.prototype.calculateScrollIncrement_ = function(index, nextIndex, scrollPosition, barWidth) {
                var nextTabDimensions = this.adapter_.getTabDimensionsAtIndex(nextIndex);
                var relativeContentLeft = nextTabDimensions.contentLeft - scrollPosition - barWidth;
                var relativeContentRight = nextTabDimensions.contentRight - scrollPosition;
                var leftIncrement = relativeContentRight - constants_1.numbers.EXTRA_SCROLL_AMOUNT;
                var rightIncrement = relativeContentLeft + constants_1.numbers.EXTRA_SCROLL_AMOUNT;
                if (nextIndex < index) {
                    return Math.min(leftIncrement, 0);
                }
                return Math.max(rightIncrement, 0);
            };
            MDCTabBarFoundation.prototype.calculateScrollIncrementRTL_ = function(index, nextIndex, scrollPosition, barWidth, scrollContentWidth) {
                var nextTabDimensions = this.adapter_.getTabDimensionsAtIndex(nextIndex);
                var relativeContentLeft = scrollContentWidth - nextTabDimensions.contentLeft - scrollPosition;
                var relativeContentRight = scrollContentWidth - nextTabDimensions.contentRight - scrollPosition - barWidth;
                var leftIncrement = relativeContentRight + constants_1.numbers.EXTRA_SCROLL_AMOUNT;
                var rightIncrement = relativeContentLeft - constants_1.numbers.EXTRA_SCROLL_AMOUNT;
                if (nextIndex > index) {
                    return Math.max(leftIncrement, 0);
                }
                return Math.min(rightIncrement, 0);
            };
            MDCTabBarFoundation.prototype.findAdjacentTabIndexClosestToEdge_ = function(index, tabDimensions, scrollPosition, barWidth) {
                var relativeRootLeft = tabDimensions.rootLeft - scrollPosition;
                var relativeRootRight = tabDimensions.rootRight - scrollPosition - barWidth;
                var relativeRootDelta = relativeRootLeft + relativeRootRight;
                var leftEdgeIsCloser = relativeRootLeft < 0 || relativeRootDelta < 0;
                var rightEdgeIsCloser = relativeRootRight > 0 || relativeRootDelta > 0;
                if (leftEdgeIsCloser) {
                    return index - 1;
                }
                if (rightEdgeIsCloser) {
                    return index + 1;
                }
                return -1;
            };
            MDCTabBarFoundation.prototype.findAdjacentTabIndexClosestToEdgeRTL_ = function(index, tabDimensions, scrollPosition, barWidth, scrollContentWidth) {
                var rootLeft = scrollContentWidth - tabDimensions.rootLeft - barWidth - scrollPosition;
                var rootRight = scrollContentWidth - tabDimensions.rootRight - scrollPosition;
                var rootDelta = rootLeft + rootRight;
                var leftEdgeIsCloser = rootLeft > 0 || rootDelta > 0;
                var rightEdgeIsCloser = rootRight < 0 || rootDelta < 0;
                if (leftEdgeIsCloser) {
                    return index + 1;
                }
                if (rightEdgeIsCloser) {
                    return index - 1;
                }
                return -1;
            };
            MDCTabBarFoundation.prototype.getKeyFromEvent_ = function(evt) {
                if (ACCEPTABLE_KEYS.has(evt.key)) {
                    return evt.key;
                }
                return KEYCODE_MAP.get(evt.keyCode);
            };
            MDCTabBarFoundation.prototype.isActivationKey_ = function(key) {
                return key === constants_1.strings.SPACE_KEY || key === constants_1.strings.ENTER_KEY;
            };
            MDCTabBarFoundation.prototype.indexIsInRange_ = function(index) {
                return index >= 0 && index < this.adapter_.getTabListLength();
            };
            MDCTabBarFoundation.prototype.isRTL_ = function() {
                return this.adapter_.isRTL();
            };
            MDCTabBarFoundation.prototype.scrollIntoView_ = function(index) {
                var scrollPosition = this.adapter_.getScrollPosition();
                var barWidth = this.adapter_.getOffsetWidth();
                var tabDimensions = this.adapter_.getTabDimensionsAtIndex(index);
                var nextIndex = this.findAdjacentTabIndexClosestToEdge_(index, tabDimensions, scrollPosition, barWidth);
                if (!this.indexIsInRange_(nextIndex)) {
                    return;
                }
                var scrollIncrement = this.calculateScrollIncrement_(index, nextIndex, scrollPosition, barWidth);
                this.adapter_.incrementScroll(scrollIncrement);
            };
            MDCTabBarFoundation.prototype.scrollIntoViewRTL_ = function(index) {
                var scrollPosition = this.adapter_.getScrollPosition();
                var barWidth = this.adapter_.getOffsetWidth();
                var tabDimensions = this.adapter_.getTabDimensionsAtIndex(index);
                var scrollWidth = this.adapter_.getScrollContentWidth();
                var nextIndex = this.findAdjacentTabIndexClosestToEdgeRTL_(index, tabDimensions, scrollPosition, barWidth, scrollWidth);
                if (!this.indexIsInRange_(nextIndex)) {
                    return;
                }
                var scrollIncrement = this.calculateScrollIncrementRTL_(index, nextIndex, scrollPosition, barWidth, scrollWidth);
                this.adapter_.incrementScroll(scrollIncrement);
            };
            return MDCTabBarFoundation;
        }(foundation_1.MDCFoundation);
        exports.MDCTabBarFoundation = MDCTabBarFoundation;
        exports.default = MDCTabBarFoundation;
    }, function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var strings = {
            ARROW_LEFT_KEY: "ArrowLeft",
            ARROW_RIGHT_KEY: "ArrowRight",
            END_KEY: "End",
            ENTER_KEY: "Enter",
            HOME_KEY: "Home",
            SPACE_KEY: "Space",
            TAB_ACTIVATED_EVENT: "MDCTabBar:activated",
            TAB_SCROLLER_SELECTOR: ".mdc-tab-scroller",
            TAB_SELECTOR: ".mdc-tab"
        };
        exports.strings = strings;
        var numbers = {
            ARROW_LEFT_KEYCODE: 37,
            ARROW_RIGHT_KEYCODE: 39,
            END_KEYCODE: 35,
            ENTER_KEYCODE: 13,
            EXTRA_SCROLL_AMOUNT: 20,
            HOME_KEYCODE: 36,
            SPACE_KEYCODE: 32
        };
        exports.numbers = numbers;
    }, function(module, exports, __webpack_require__) {
        "use strict";
        var __extends = this && this.__extends || function() {
            var _extendStatics = function extendStatics(d, b) {
                _extendStatics = Object.setPrototypeOf || {
                    __proto__: []
                } instanceof Array && function(d, b) {
                    d.__proto__ = b;
                } || function(d, b) {
                    for (var p in b) {
                        if (b.hasOwnProperty(p)) d[p] = b[p];
                    }
                };
                return _extendStatics(d, b);
            };
            return function(d, b) {
                _extendStatics(d, b);
                function __() {
                    this.constructor = d;
                }
                d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
            };
        }();
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var component_1 = __webpack_require__(1);
        var foundation_1 = __webpack_require__(29);
        var MDCTextFieldCharacterCounter = function(_super) {
            __extends(MDCTextFieldCharacterCounter, _super);
            function MDCTextFieldCharacterCounter() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            MDCTextFieldCharacterCounter.attachTo = function(root) {
                return new MDCTextFieldCharacterCounter(root);
            };
            Object.defineProperty(MDCTextFieldCharacterCounter.prototype, "foundation", {
                get: function get() {
                    return this.foundation_;
                },
                enumerable: true,
                configurable: true
            });
            MDCTextFieldCharacterCounter.prototype.getDefaultFoundation = function() {
                var _this = this;
                var adapter = {
                    setContent: function setContent(content) {
                        _this.root_.textContent = content;
                    }
                };
                return new foundation_1.MDCTextFieldCharacterCounterFoundation(adapter);
            };
            return MDCTextFieldCharacterCounter;
        }(component_1.MDCComponent);
        exports.MDCTextFieldCharacterCounter = MDCTextFieldCharacterCounter;
    }, function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var cssClasses = {
            ROOT: "mdc-text-field-character-counter"
        };
        exports.cssClasses = cssClasses;
        var strings = {
            ROOT_SELECTOR: "." + cssClasses.ROOT
        };
        exports.strings = strings;
    }, function(module, exports, __webpack_require__) {
        "use strict";
        var __extends = this && this.__extends || function() {
            var _extendStatics = function extendStatics(d, b) {
                _extendStatics = Object.setPrototypeOf || {
                    __proto__: []
                } instanceof Array && function(d, b) {
                    d.__proto__ = b;
                } || function(d, b) {
                    for (var p in b) {
                        if (b.hasOwnProperty(p)) d[p] = b[p];
                    }
                };
                return _extendStatics(d, b);
            };
            return function(d, b) {
                _extendStatics(d, b);
                function __() {
                    this.constructor = d;
                }
                d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
            };
        }();
        var __assign = this && this.__assign || function() {
            __assign = Object.assign || function(t) {
                for (var s, i = 1, n = arguments.length; i < n; i++) {
                    s = arguments[i];
                    for (var p in s) {
                        if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
                    }
                }
                return t;
            };
            return __assign.apply(this, arguments);
        };
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var foundation_1 = __webpack_require__(0);
        var constants_1 = __webpack_require__(30);
        var POINTERDOWN_EVENTS = [ "mousedown", "touchstart" ];
        var INTERACTION_EVENTS = [ "click", "keydown" ];
        var MDCTextFieldFoundation = function(_super) {
            __extends(MDCTextFieldFoundation, _super);
            function MDCTextFieldFoundation(adapter, foundationMap) {
                if (foundationMap === void 0) {
                    foundationMap = {};
                }
                var _this = _super.call(this, __assign({}, MDCTextFieldFoundation.defaultAdapter, adapter)) || this;
                _this.isFocused_ = false;
                _this.receivedUserInput_ = false;
                _this.isValid_ = true;
                _this.useNativeValidation_ = true;
                _this.helperText_ = foundationMap.helperText;
                _this.characterCounter_ = foundationMap.characterCounter;
                _this.leadingIcon_ = foundationMap.leadingIcon;
                _this.trailingIcon_ = foundationMap.trailingIcon;
                _this.inputFocusHandler_ = function() {
                    return _this.activateFocus();
                };
                _this.inputBlurHandler_ = function() {
                    return _this.deactivateFocus();
                };
                _this.inputInputHandler_ = function() {
                    return _this.handleInput();
                };
                _this.setPointerXOffset_ = function(evt) {
                    return _this.setTransformOrigin(evt);
                };
                _this.textFieldInteractionHandler_ = function() {
                    return _this.handleTextFieldInteraction();
                };
                _this.validationAttributeChangeHandler_ = function(attributesList) {
                    return _this.handleValidationAttributeChange(attributesList);
                };
                return _this;
            }
            Object.defineProperty(MDCTextFieldFoundation, "cssClasses", {
                get: function get() {
                    return constants_1.cssClasses;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MDCTextFieldFoundation, "strings", {
                get: function get() {
                    return constants_1.strings;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MDCTextFieldFoundation, "numbers", {
                get: function get() {
                    return constants_1.numbers;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MDCTextFieldFoundation.prototype, "shouldAlwaysFloat_", {
                get: function get() {
                    var type = this.getNativeInput_().type;
                    return constants_1.ALWAYS_FLOAT_TYPES.indexOf(type) >= 0;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MDCTextFieldFoundation.prototype, "shouldFloat", {
                get: function get() {
                    return this.shouldAlwaysFloat_ || this.isFocused_ || Boolean(this.getValue()) || this.isBadInput_();
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MDCTextFieldFoundation.prototype, "shouldShake", {
                get: function get() {
                    return !this.isFocused_ && !this.isValid() && Boolean(this.getValue());
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MDCTextFieldFoundation, "defaultAdapter", {
                get: function get() {
                    return {
                        addClass: function addClass() {
                            return undefined;
                        },
                        removeClass: function removeClass() {
                            return undefined;
                        },
                        hasClass: function hasClass() {
                            return true;
                        },
                        registerTextFieldInteractionHandler: function registerTextFieldInteractionHandler() {
                            return undefined;
                        },
                        deregisterTextFieldInteractionHandler: function deregisterTextFieldInteractionHandler() {
                            return undefined;
                        },
                        registerInputInteractionHandler: function registerInputInteractionHandler() {
                            return undefined;
                        },
                        deregisterInputInteractionHandler: function deregisterInputInteractionHandler() {
                            return undefined;
                        },
                        registerValidationAttributeChangeHandler: function registerValidationAttributeChangeHandler() {
                            return new MutationObserver(function() {
                                return undefined;
                            });
                        },
                        deregisterValidationAttributeChangeHandler: function deregisterValidationAttributeChangeHandler() {
                            return undefined;
                        },
                        getNativeInput: function getNativeInput() {
                            return null;
                        },
                        isFocused: function isFocused() {
                            return false;
                        },
                        activateLineRipple: function activateLineRipple() {
                            return undefined;
                        },
                        deactivateLineRipple: function deactivateLineRipple() {
                            return undefined;
                        },
                        setLineRippleTransformOrigin: function setLineRippleTransformOrigin() {
                            return undefined;
                        },
                        shakeLabel: function shakeLabel() {
                            return undefined;
                        },
                        floatLabel: function floatLabel() {
                            return undefined;
                        },
                        hasLabel: function hasLabel() {
                            return false;
                        },
                        getLabelWidth: function getLabelWidth() {
                            return 0;
                        },
                        hasOutline: function hasOutline() {
                            return false;
                        },
                        notchOutline: function notchOutline() {
                            return undefined;
                        },
                        closeOutline: function closeOutline() {
                            return undefined;
                        }
                    };
                },
                enumerable: true,
                configurable: true
            });
            MDCTextFieldFoundation.prototype.init = function() {
                var _this = this;
                if (this.adapter_.isFocused()) {
                    this.inputFocusHandler_();
                } else if (this.adapter_.hasLabel() && this.shouldFloat) {
                    this.notchOutline(true);
                    this.adapter_.floatLabel(true);
                }
                this.adapter_.registerInputInteractionHandler("focus", this.inputFocusHandler_);
                this.adapter_.registerInputInteractionHandler("blur", this.inputBlurHandler_);
                this.adapter_.registerInputInteractionHandler("input", this.inputInputHandler_);
                POINTERDOWN_EVENTS.forEach(function(evtType) {
                    _this.adapter_.registerInputInteractionHandler(evtType, _this.setPointerXOffset_);
                });
                INTERACTION_EVENTS.forEach(function(evtType) {
                    _this.adapter_.registerTextFieldInteractionHandler(evtType, _this.textFieldInteractionHandler_);
                });
                this.validationObserver_ = this.adapter_.registerValidationAttributeChangeHandler(this.validationAttributeChangeHandler_);
                this.setCharacterCounter_(this.getValue().length);
            };
            MDCTextFieldFoundation.prototype.destroy = function() {
                var _this = this;
                this.adapter_.deregisterInputInteractionHandler("focus", this.inputFocusHandler_);
                this.adapter_.deregisterInputInteractionHandler("blur", this.inputBlurHandler_);
                this.adapter_.deregisterInputInteractionHandler("input", this.inputInputHandler_);
                POINTERDOWN_EVENTS.forEach(function(evtType) {
                    _this.adapter_.deregisterInputInteractionHandler(evtType, _this.setPointerXOffset_);
                });
                INTERACTION_EVENTS.forEach(function(evtType) {
                    _this.adapter_.deregisterTextFieldInteractionHandler(evtType, _this.textFieldInteractionHandler_);
                });
                this.adapter_.deregisterValidationAttributeChangeHandler(this.validationObserver_);
            };
            MDCTextFieldFoundation.prototype.handleTextFieldInteraction = function() {
                var nativeInput = this.adapter_.getNativeInput();
                if (nativeInput && nativeInput.disabled) {
                    return;
                }
                this.receivedUserInput_ = true;
            };
            MDCTextFieldFoundation.prototype.handleValidationAttributeChange = function(attributesList) {
                var _this = this;
                attributesList.some(function(attributeName) {
                    if (constants_1.VALIDATION_ATTR_WHITELIST.indexOf(attributeName) > -1) {
                        _this.styleValidity_(true);
                        return true;
                    }
                    return false;
                });
                if (attributesList.indexOf("maxlength") > -1) {
                    this.setCharacterCounter_(this.getValue().length);
                }
            };
            MDCTextFieldFoundation.prototype.notchOutline = function(openNotch) {
                if (!this.adapter_.hasOutline()) {
                    return;
                }
                if (openNotch) {
                    var isDense = this.adapter_.hasClass(constants_1.cssClasses.DENSE);
                    var labelScale = isDense ? constants_1.numbers.DENSE_LABEL_SCALE : constants_1.numbers.LABEL_SCALE;
                    var labelWidth = this.adapter_.getLabelWidth() * labelScale;
                    this.adapter_.notchOutline(labelWidth);
                } else {
                    this.adapter_.closeOutline();
                }
            };
            MDCTextFieldFoundation.prototype.activateFocus = function() {
                this.isFocused_ = true;
                this.styleFocused_(this.isFocused_);
                this.adapter_.activateLineRipple();
                if (this.adapter_.hasLabel()) {
                    this.notchOutline(this.shouldFloat);
                    this.adapter_.floatLabel(this.shouldFloat);
                    this.adapter_.shakeLabel(this.shouldShake);
                }
                if (this.helperText_) {
                    this.helperText_.showToScreenReader();
                }
            };
            MDCTextFieldFoundation.prototype.setTransformOrigin = function(evt) {
                var touches = evt.touches;
                var targetEvent = touches ? touches[0] : evt;
                var targetClientRect = targetEvent.target.getBoundingClientRect();
                var normalizedX = targetEvent.clientX - targetClientRect.left;
                this.adapter_.setLineRippleTransformOrigin(normalizedX);
            };
            MDCTextFieldFoundation.prototype.handleInput = function() {
                this.autoCompleteFocus();
                this.setCharacterCounter_(this.getValue().length);
            };
            MDCTextFieldFoundation.prototype.autoCompleteFocus = function() {
                if (!this.receivedUserInput_) {
                    this.activateFocus();
                }
            };
            MDCTextFieldFoundation.prototype.deactivateFocus = function() {
                this.isFocused_ = false;
                this.adapter_.deactivateLineRipple();
                var isValid = this.isValid();
                this.styleValidity_(isValid);
                this.styleFocused_(this.isFocused_);
                if (this.adapter_.hasLabel()) {
                    this.notchOutline(this.shouldFloat);
                    this.adapter_.floatLabel(this.shouldFloat);
                    this.adapter_.shakeLabel(this.shouldShake);
                }
                if (!this.shouldFloat) {
                    this.receivedUserInput_ = false;
                }
            };
            MDCTextFieldFoundation.prototype.getValue = function() {
                return this.getNativeInput_().value;
            };
            MDCTextFieldFoundation.prototype.setValue = function(value) {
                if (this.getValue() !== value) {
                    this.getNativeInput_().value = value;
                }
                this.setCharacterCounter_(value.length);
                var isValid = this.isValid();
                this.styleValidity_(isValid);
                if (this.adapter_.hasLabel()) {
                    this.notchOutline(this.shouldFloat);
                    this.adapter_.floatLabel(this.shouldFloat);
                    this.adapter_.shakeLabel(this.shouldShake);
                }
            };
            MDCTextFieldFoundation.prototype.isValid = function() {
                return this.useNativeValidation_ ? this.isNativeInputValid_() : this.isValid_;
            };
            MDCTextFieldFoundation.prototype.setValid = function(isValid) {
                this.isValid_ = isValid;
                this.styleValidity_(isValid);
                var shouldShake = !isValid && !this.isFocused_;
                if (this.adapter_.hasLabel()) {
                    this.adapter_.shakeLabel(shouldShake);
                }
            };
            MDCTextFieldFoundation.prototype.setUseNativeValidation = function(useNativeValidation) {
                this.useNativeValidation_ = useNativeValidation;
            };
            MDCTextFieldFoundation.prototype.isDisabled = function() {
                return this.getNativeInput_().disabled;
            };
            MDCTextFieldFoundation.prototype.setDisabled = function(disabled) {
                this.getNativeInput_().disabled = disabled;
                this.styleDisabled_(disabled);
            };
            MDCTextFieldFoundation.prototype.setHelperTextContent = function(content) {
                if (this.helperText_) {
                    this.helperText_.setContent(content);
                }
            };
            MDCTextFieldFoundation.prototype.setLeadingIconAriaLabel = function(label) {
                if (this.leadingIcon_) {
                    this.leadingIcon_.setAriaLabel(label);
                }
            };
            MDCTextFieldFoundation.prototype.setLeadingIconContent = function(content) {
                if (this.leadingIcon_) {
                    this.leadingIcon_.setContent(content);
                }
            };
            MDCTextFieldFoundation.prototype.setTrailingIconAriaLabel = function(label) {
                if (this.trailingIcon_) {
                    this.trailingIcon_.setAriaLabel(label);
                }
            };
            MDCTextFieldFoundation.prototype.setTrailingIconContent = function(content) {
                if (this.trailingIcon_) {
                    this.trailingIcon_.setContent(content);
                }
            };
            MDCTextFieldFoundation.prototype.setCharacterCounter_ = function(currentLength) {
                if (!this.characterCounter_) {
                    return;
                }
                var maxLength = this.getNativeInput_().maxLength;
                if (maxLength === -1) {
                    throw new Error("MDCTextFieldFoundation: Expected maxlength html property on text input or textarea.");
                }
                this.characterCounter_.setCounterValue(currentLength, maxLength);
            };
            MDCTextFieldFoundation.prototype.isBadInput_ = function() {
                return this.getNativeInput_().validity.badInput || false;
            };
            MDCTextFieldFoundation.prototype.isNativeInputValid_ = function() {
                return this.getNativeInput_().validity.valid;
            };
            MDCTextFieldFoundation.prototype.styleValidity_ = function(isValid) {
                var INVALID = MDCTextFieldFoundation.cssClasses.INVALID;
                if (isValid) {
                    this.adapter_.removeClass(INVALID);
                } else {
                    this.adapter_.addClass(INVALID);
                }
                if (this.helperText_) {
                    this.helperText_.setValidity(isValid);
                }
            };
            MDCTextFieldFoundation.prototype.styleFocused_ = function(isFocused) {
                var FOCUSED = MDCTextFieldFoundation.cssClasses.FOCUSED;
                if (isFocused) {
                    this.adapter_.addClass(FOCUSED);
                } else {
                    this.adapter_.removeClass(FOCUSED);
                }
            };
            MDCTextFieldFoundation.prototype.styleDisabled_ = function(isDisabled) {
                var _a = MDCTextFieldFoundation.cssClasses, DISABLED = _a.DISABLED, INVALID = _a.INVALID;
                if (isDisabled) {
                    this.adapter_.addClass(DISABLED);
                    this.adapter_.removeClass(INVALID);
                } else {
                    this.adapter_.removeClass(DISABLED);
                }
                if (this.leadingIcon_) {
                    this.leadingIcon_.setDisabled(isDisabled);
                }
                if (this.trailingIcon_) {
                    this.trailingIcon_.setDisabled(isDisabled);
                }
            };
            MDCTextFieldFoundation.prototype.getNativeInput_ = function() {
                var nativeInput = this.adapter_ ? this.adapter_.getNativeInput() : null;
                return nativeInput || {
                    disabled: false,
                    maxLength: -1,
                    type: "input",
                    validity: {
                        badInput: false,
                        valid: true
                    },
                    value: ""
                };
            };
            return MDCTextFieldFoundation;
        }(foundation_1.MDCFoundation);
        exports.MDCTextFieldFoundation = MDCTextFieldFoundation;
        exports.default = MDCTextFieldFoundation;
    }, function(module, exports, __webpack_require__) {
        "use strict";
        var __extends = this && this.__extends || function() {
            var _extendStatics = function extendStatics(d, b) {
                _extendStatics = Object.setPrototypeOf || {
                    __proto__: []
                } instanceof Array && function(d, b) {
                    d.__proto__ = b;
                } || function(d, b) {
                    for (var p in b) {
                        if (b.hasOwnProperty(p)) d[p] = b[p];
                    }
                };
                return _extendStatics(d, b);
            };
            return function(d, b) {
                _extendStatics(d, b);
                function __() {
                    this.constructor = d;
                }
                d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
            };
        }();
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var component_1 = __webpack_require__(1);
        var foundation_1 = __webpack_require__(31);
        var MDCTextFieldHelperText = function(_super) {
            __extends(MDCTextFieldHelperText, _super);
            function MDCTextFieldHelperText() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            MDCTextFieldHelperText.attachTo = function(root) {
                return new MDCTextFieldHelperText(root);
            };
            Object.defineProperty(MDCTextFieldHelperText.prototype, "foundation", {
                get: function get() {
                    return this.foundation_;
                },
                enumerable: true,
                configurable: true
            });
            MDCTextFieldHelperText.prototype.getDefaultFoundation = function() {
                var _this = this;
                var adapter = {
                    addClass: function addClass(className) {
                        return _this.root_.classList.add(className);
                    },
                    removeClass: function removeClass(className) {
                        return _this.root_.classList.remove(className);
                    },
                    hasClass: function hasClass(className) {
                        return _this.root_.classList.contains(className);
                    },
                    setAttr: function setAttr(attr, value) {
                        return _this.root_.setAttribute(attr, value);
                    },
                    removeAttr: function removeAttr(attr) {
                        return _this.root_.removeAttribute(attr);
                    },
                    setContent: function setContent(content) {
                        _this.root_.textContent = content;
                    }
                };
                return new foundation_1.MDCTextFieldHelperTextFoundation(adapter);
            };
            return MDCTextFieldHelperText;
        }(component_1.MDCComponent);
        exports.MDCTextFieldHelperText = MDCTextFieldHelperText;
    }, function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var cssClasses = {
            HELPER_TEXT_PERSISTENT: "mdc-text-field-helper-text--persistent",
            HELPER_TEXT_VALIDATION_MSG: "mdc-text-field-helper-text--validation-msg",
            ROOT: "mdc-text-field-helper-text"
        };
        exports.cssClasses = cssClasses;
        var strings = {
            ARIA_HIDDEN: "aria-hidden",
            ROLE: "role",
            ROOT_SELECTOR: "." + cssClasses.ROOT
        };
        exports.strings = strings;
    }, function(module, exports, __webpack_require__) {
        "use strict";
        var __extends = this && this.__extends || function() {
            var _extendStatics = function extendStatics(d, b) {
                _extendStatics = Object.setPrototypeOf || {
                    __proto__: []
                } instanceof Array && function(d, b) {
                    d.__proto__ = b;
                } || function(d, b) {
                    for (var p in b) {
                        if (b.hasOwnProperty(p)) d[p] = b[p];
                    }
                };
                return _extendStatics(d, b);
            };
            return function(d, b) {
                _extendStatics(d, b);
                function __() {
                    this.constructor = d;
                }
                d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
            };
        }();
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var component_1 = __webpack_require__(1);
        var foundation_1 = __webpack_require__(94);
        var MDCTextFieldIcon = function(_super) {
            __extends(MDCTextFieldIcon, _super);
            function MDCTextFieldIcon() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            MDCTextFieldIcon.attachTo = function(root) {
                return new MDCTextFieldIcon(root);
            };
            Object.defineProperty(MDCTextFieldIcon.prototype, "foundation", {
                get: function get() {
                    return this.foundation_;
                },
                enumerable: true,
                configurable: true
            });
            MDCTextFieldIcon.prototype.getDefaultFoundation = function() {
                var _this = this;
                var adapter = {
                    getAttr: function getAttr(attr) {
                        return _this.root_.getAttribute(attr);
                    },
                    setAttr: function setAttr(attr, value) {
                        return _this.root_.setAttribute(attr, value);
                    },
                    removeAttr: function removeAttr(attr) {
                        return _this.root_.removeAttribute(attr);
                    },
                    setContent: function setContent(content) {
                        _this.root_.textContent = content;
                    },
                    registerInteractionHandler: function registerInteractionHandler(evtType, handler) {
                        return _this.listen(evtType, handler);
                    },
                    deregisterInteractionHandler: function deregisterInteractionHandler(evtType, handler) {
                        return _this.unlisten(evtType, handler);
                    },
                    notifyIconAction: function notifyIconAction() {
                        return _this.emit(foundation_1.MDCTextFieldIconFoundation.strings.ICON_EVENT, {}, true);
                    }
                };
                return new foundation_1.MDCTextFieldIconFoundation(adapter);
            };
            return MDCTextFieldIcon;
        }(component_1.MDCComponent);
        exports.MDCTextFieldIcon = MDCTextFieldIcon;
    }, function(module, exports, __webpack_require__) {
        "use strict";
        var __extends = this && this.__extends || function() {
            var _extendStatics = function extendStatics(d, b) {
                _extendStatics = Object.setPrototypeOf || {
                    __proto__: []
                } instanceof Array && function(d, b) {
                    d.__proto__ = b;
                } || function(d, b) {
                    for (var p in b) {
                        if (b.hasOwnProperty(p)) d[p] = b[p];
                    }
                };
                return _extendStatics(d, b);
            };
            return function(d, b) {
                _extendStatics(d, b);
                function __() {
                    this.constructor = d;
                }
                d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
            };
        }();
        var __assign = this && this.__assign || function() {
            __assign = Object.assign || function(t) {
                for (var s, i = 1, n = arguments.length; i < n; i++) {
                    s = arguments[i];
                    for (var p in s) {
                        if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
                    }
                }
                return t;
            };
            return __assign.apply(this, arguments);
        };
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var foundation_1 = __webpack_require__(0);
        var constants_1 = __webpack_require__(95);
        var INTERACTION_EVENTS = [ "click", "keydown" ];
        var MDCTextFieldIconFoundation = function(_super) {
            __extends(MDCTextFieldIconFoundation, _super);
            function MDCTextFieldIconFoundation(adapter) {
                var _this = _super.call(this, __assign({}, MDCTextFieldIconFoundation.defaultAdapter, adapter)) || this;
                _this.savedTabIndex_ = null;
                _this.interactionHandler_ = function(evt) {
                    return _this.handleInteraction(evt);
                };
                return _this;
            }
            Object.defineProperty(MDCTextFieldIconFoundation, "strings", {
                get: function get() {
                    return constants_1.strings;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MDCTextFieldIconFoundation, "cssClasses", {
                get: function get() {
                    return constants_1.cssClasses;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MDCTextFieldIconFoundation, "defaultAdapter", {
                get: function get() {
                    return {
                        getAttr: function getAttr() {
                            return null;
                        },
                        setAttr: function setAttr() {
                            return undefined;
                        },
                        removeAttr: function removeAttr() {
                            return undefined;
                        },
                        setContent: function setContent() {
                            return undefined;
                        },
                        registerInteractionHandler: function registerInteractionHandler() {
                            return undefined;
                        },
                        deregisterInteractionHandler: function deregisterInteractionHandler() {
                            return undefined;
                        },
                        notifyIconAction: function notifyIconAction() {
                            return undefined;
                        }
                    };
                },
                enumerable: true,
                configurable: true
            });
            MDCTextFieldIconFoundation.prototype.init = function() {
                var _this = this;
                this.savedTabIndex_ = this.adapter_.getAttr("tabindex");
                INTERACTION_EVENTS.forEach(function(evtType) {
                    _this.adapter_.registerInteractionHandler(evtType, _this.interactionHandler_);
                });
            };
            MDCTextFieldIconFoundation.prototype.destroy = function() {
                var _this = this;
                INTERACTION_EVENTS.forEach(function(evtType) {
                    _this.adapter_.deregisterInteractionHandler(evtType, _this.interactionHandler_);
                });
            };
            MDCTextFieldIconFoundation.prototype.setDisabled = function(disabled) {
                if (!this.savedTabIndex_) {
                    return;
                }
                if (disabled) {
                    this.adapter_.setAttr("tabindex", "-1");
                    this.adapter_.removeAttr("role");
                } else {
                    this.adapter_.setAttr("tabindex", this.savedTabIndex_);
                    this.adapter_.setAttr("role", constants_1.strings.ICON_ROLE);
                }
            };
            MDCTextFieldIconFoundation.prototype.setAriaLabel = function(label) {
                this.adapter_.setAttr("aria-label", label);
            };
            MDCTextFieldIconFoundation.prototype.setContent = function(content) {
                this.adapter_.setContent(content);
            };
            MDCTextFieldIconFoundation.prototype.handleInteraction = function(evt) {
                var isEnterKey = evt.key === "Enter" || evt.keyCode === 13;
                if (evt.type === "click" || isEnterKey) {
                    this.adapter_.notifyIconAction();
                }
            };
            return MDCTextFieldIconFoundation;
        }(foundation_1.MDCFoundation);
        exports.MDCTextFieldIconFoundation = MDCTextFieldIconFoundation;
        exports.default = MDCTextFieldIconFoundation;
    }, function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var strings = {
            ICON_EVENT: "MDCTextField:icon",
            ICON_ROLE: "button"
        };
        exports.strings = strings;
        var cssClasses = {
            ROOT: "mdc-text-field__icon"
        };
        exports.cssClasses = cssClasses;
    }, function(module, exports, __webpack_require__) {
        "use strict";
        var __extends = this && this.__extends || function() {
            var _extendStatics = function extendStatics(d, b) {
                _extendStatics = Object.setPrototypeOf || {
                    __proto__: []
                } instanceof Array && function(d, b) {
                    d.__proto__ = b;
                } || function(d, b) {
                    for (var p in b) {
                        if (b.hasOwnProperty(p)) d[p] = b[p];
                    }
                };
                return _extendStatics(d, b);
            };
            return function(d, b) {
                _extendStatics(d, b);
                function __() {
                    this.constructor = d;
                }
                d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
            };
        }();
        var __assign = this && this.__assign || function() {
            __assign = Object.assign || function(t) {
                for (var s, i = 1, n = arguments.length; i < n; i++) {
                    s = arguments[i];
                    for (var p in s) {
                        if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
                    }
                }
                return t;
            };
            return __assign.apply(this, arguments);
        };
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var foundation_1 = __webpack_require__(0);
        var constants_1 = __webpack_require__(97);
        var MDCToolbarFoundation = function(_super) {
            __extends(MDCToolbarFoundation, _super);
            function MDCToolbarFoundation(adapter) {
                var _this = _super.call(this, __assign({}, MDCToolbarFoundation.defaultAdapter, adapter)) || this;
                _this.checkRowHeightFrame_ = 0;
                _this.scrollFrame_ = 0;
                _this.executedLastChange_ = false;
                _this.isFixed_ = false;
                _this.isFixedLastRow_ = false;
                _this.hasFlexibleFirstRow_ = false;
                _this.useFlexDefaultBehavior_ = false;
                _this.calculations_ = {
                    flexibleExpansionHeight: 0,
                    flexibleExpansionRatio: 0,
                    maxTranslateYDistance: 0,
                    maxTranslateYRatio: 0,
                    scrollThreshold: 0,
                    scrollThresholdRatio: 0,
                    toolbarHeight: 0,
                    toolbarRatio: 0,
                    toolbarRowHeight: 0
                };
                return _this;
            }
            Object.defineProperty(MDCToolbarFoundation, "cssClasses", {
                get: function get() {
                    return constants_1.cssClasses;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MDCToolbarFoundation, "strings", {
                get: function get() {
                    return constants_1.strings;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MDCToolbarFoundation, "numbers", {
                get: function get() {
                    return constants_1.numbers;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MDCToolbarFoundation, "defaultAdapter", {
                get: function get() {
                    return {
                        hasClass: function hasClass() {
                            return false;
                        },
                        addClass: function addClass() {
                            return undefined;
                        },
                        removeClass: function removeClass() {
                            return undefined;
                        },
                        registerScrollHandler: function registerScrollHandler() {
                            return undefined;
                        },
                        deregisterScrollHandler: function deregisterScrollHandler() {
                            return undefined;
                        },
                        registerResizeHandler: function registerResizeHandler() {
                            return undefined;
                        },
                        deregisterResizeHandler: function deregisterResizeHandler() {
                            return undefined;
                        },
                        getViewportWidth: function getViewportWidth() {
                            return 0;
                        },
                        getViewportScrollY: function getViewportScrollY() {
                            return 0;
                        },
                        getOffsetHeight: function getOffsetHeight() {
                            return 0;
                        },
                        getFirstRowElementOffsetHeight: function getFirstRowElementOffsetHeight() {
                            return 0;
                        },
                        notifyChange: function notifyChange() {
                            return undefined;
                        },
                        setStyle: function setStyle() {
                            return undefined;
                        },
                        setStyleForTitleElement: function setStyleForTitleElement() {
                            return undefined;
                        },
                        setStyleForFlexibleRowElement: function setStyleForFlexibleRowElement() {
                            return undefined;
                        },
                        setStyleForFixedAdjustElement: function setStyleForFixedAdjustElement() {
                            return undefined;
                        }
                    };
                },
                enumerable: true,
                configurable: true
            });
            MDCToolbarFoundation.prototype.init = function() {
                var _this = this;
                this.isFixed_ = this.adapter_.hasClass(constants_1.cssClasses.FIXED);
                this.isFixedLastRow_ = this.adapter_.hasClass(constants_1.cssClasses.FIXED_LASTROW) && this.isFixed_;
                this.hasFlexibleFirstRow_ = this.adapter_.hasClass(constants_1.cssClasses.TOOLBAR_ROW_FLEXIBLE);
                if (this.hasFlexibleFirstRow_) {
                    this.useFlexDefaultBehavior_ = this.adapter_.hasClass(constants_1.cssClasses.FLEXIBLE_DEFAULT_BEHAVIOR);
                }
                this.resizeHandler_ = function() {
                    return _this.checkRowHeight_();
                };
                this.scrollHandler_ = function() {
                    return _this.updateToolbarStyles_();
                };
                this.adapter_.registerResizeHandler(this.resizeHandler_);
                this.adapter_.registerScrollHandler(this.scrollHandler_);
                this.initKeyRatio_();
                this.setKeyHeights_();
            };
            MDCToolbarFoundation.prototype.destroy = function() {
                this.adapter_.deregisterResizeHandler(this.resizeHandler_);
                this.adapter_.deregisterScrollHandler(this.scrollHandler_);
            };
            MDCToolbarFoundation.prototype.updateAdjustElementStyles = function() {
                if (this.isFixed_) {
                    this.adapter_.setStyleForFixedAdjustElement("margin-top", this.calculations_.toolbarHeight + "px");
                }
            };
            MDCToolbarFoundation.prototype.getFlexibleExpansionRatio_ = function(scrollTop) {
                var delta = 1e-4;
                return Math.max(0, 1 - scrollTop / (this.calculations_.flexibleExpansionHeight + delta));
            };
            MDCToolbarFoundation.prototype.checkRowHeight_ = function() {
                var _this = this;
                cancelAnimationFrame(this.checkRowHeightFrame_);
                this.checkRowHeightFrame_ = requestAnimationFrame(function() {
                    return _this.setKeyHeights_();
                });
            };
            MDCToolbarFoundation.prototype.setKeyHeights_ = function() {
                var newToolbarRowHeight = this.getRowHeight_();
                if (newToolbarRowHeight !== this.calculations_.toolbarRowHeight) {
                    this.calculations_.toolbarRowHeight = newToolbarRowHeight;
                    this.calculations_.toolbarHeight = this.calculations_.toolbarRatio * this.calculations_.toolbarRowHeight;
                    this.calculations_.flexibleExpansionHeight = this.calculations_.flexibleExpansionRatio * this.calculations_.toolbarRowHeight;
                    this.calculations_.maxTranslateYDistance = this.calculations_.maxTranslateYRatio * this.calculations_.toolbarRowHeight;
                    this.calculations_.scrollThreshold = this.calculations_.scrollThresholdRatio * this.calculations_.toolbarRowHeight;
                    this.updateAdjustElementStyles();
                    this.updateToolbarStyles_();
                }
            };
            MDCToolbarFoundation.prototype.updateToolbarStyles_ = function() {
                var _this = this;
                cancelAnimationFrame(this.scrollFrame_);
                this.scrollFrame_ = requestAnimationFrame(function() {
                    var scrollTop = _this.adapter_.getViewportScrollY();
                    var hasScrolledOutOfThreshold = _this.scrolledOutOfThreshold_(scrollTop);
                    if (hasScrolledOutOfThreshold && _this.executedLastChange_) {
                        return;
                    }
                    var flexibleExpansionRatio = _this.getFlexibleExpansionRatio_(scrollTop);
                    _this.updateToolbarFlexibleState_(flexibleExpansionRatio);
                    if (_this.isFixedLastRow_) {
                        _this.updateToolbarFixedState_(scrollTop);
                    }
                    if (_this.hasFlexibleFirstRow_) {
                        _this.updateFlexibleRowElementStyles_(flexibleExpansionRatio);
                    }
                    _this.executedLastChange_ = hasScrolledOutOfThreshold;
                    _this.adapter_.notifyChange({
                        flexibleExpansionRatio: flexibleExpansionRatio
                    });
                });
            };
            MDCToolbarFoundation.prototype.scrolledOutOfThreshold_ = function(scrollTop) {
                return scrollTop > this.calculations_.scrollThreshold;
            };
            MDCToolbarFoundation.prototype.initKeyRatio_ = function() {
                var toolbarRowHeight = this.getRowHeight_();
                var firstRowMaxRatio = this.adapter_.getFirstRowElementOffsetHeight() / toolbarRowHeight;
                this.calculations_.toolbarRatio = this.adapter_.getOffsetHeight() / toolbarRowHeight;
                this.calculations_.flexibleExpansionRatio = firstRowMaxRatio - 1;
                this.calculations_.maxTranslateYRatio = this.isFixedLastRow_ ? this.calculations_.toolbarRatio - firstRowMaxRatio : 0;
                this.calculations_.scrollThresholdRatio = (this.isFixedLastRow_ ? this.calculations_.toolbarRatio : firstRowMaxRatio) - 1;
            };
            MDCToolbarFoundation.prototype.getRowHeight_ = function() {
                var breakpoint = constants_1.numbers.TOOLBAR_MOBILE_BREAKPOINT;
                return this.adapter_.getViewportWidth() < breakpoint ? constants_1.numbers.TOOLBAR_ROW_MOBILE_HEIGHT : constants_1.numbers.TOOLBAR_ROW_HEIGHT;
            };
            MDCToolbarFoundation.prototype.updateToolbarFlexibleState_ = function(flexibleExpansionRatio) {
                this.adapter_.removeClass(constants_1.cssClasses.FLEXIBLE_MAX);
                this.adapter_.removeClass(constants_1.cssClasses.FLEXIBLE_MIN);
                if (flexibleExpansionRatio === 1) {
                    this.adapter_.addClass(constants_1.cssClasses.FLEXIBLE_MAX);
                } else if (flexibleExpansionRatio === 0) {
                    this.adapter_.addClass(constants_1.cssClasses.FLEXIBLE_MIN);
                }
            };
            MDCToolbarFoundation.prototype.updateToolbarFixedState_ = function(scrollTop) {
                var translateDistance = Math.max(0, Math.min(scrollTop - this.calculations_.flexibleExpansionHeight, this.calculations_.maxTranslateYDistance));
                this.adapter_.setStyle("transform", "translateY(" + -translateDistance + "px)");
                if (translateDistance === this.calculations_.maxTranslateYDistance) {
                    this.adapter_.addClass(constants_1.cssClasses.FIXED_AT_LAST_ROW);
                } else {
                    this.adapter_.removeClass(constants_1.cssClasses.FIXED_AT_LAST_ROW);
                }
            };
            MDCToolbarFoundation.prototype.updateFlexibleRowElementStyles_ = function(flexibleExpansionRatio) {
                if (this.isFixed_) {
                    var height = this.calculations_.flexibleExpansionHeight * flexibleExpansionRatio;
                    this.adapter_.setStyleForFlexibleRowElement("height", height + this.calculations_.toolbarRowHeight + "px");
                }
                if (this.useFlexDefaultBehavior_) {
                    this.updateElementStylesDefaultBehavior_(flexibleExpansionRatio);
                }
            };
            MDCToolbarFoundation.prototype.updateElementStylesDefaultBehavior_ = function(flexibleExpansionRatio) {
                var maxTitleSize = constants_1.numbers.MAX_TITLE_SIZE;
                var minTitleSize = constants_1.numbers.MIN_TITLE_SIZE;
                var currentTitleSize = (maxTitleSize - minTitleSize) * flexibleExpansionRatio + minTitleSize;
                this.adapter_.setStyleForTitleElement("font-size", currentTitleSize + "rem");
            };
            return MDCToolbarFoundation;
        }(foundation_1.MDCFoundation);
        exports.MDCToolbarFoundation = MDCToolbarFoundation;
        exports.default = MDCToolbarFoundation;
    }, function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports.cssClasses = {
            FIXED: "mdc-toolbar--fixed",
            FIXED_AT_LAST_ROW: "mdc-toolbar--fixed-at-last-row",
            FIXED_LASTROW: "mdc-toolbar--fixed-lastrow-only",
            FLEXIBLE_DEFAULT_BEHAVIOR: "mdc-toolbar--flexible-default-behavior",
            FLEXIBLE_MAX: "mdc-toolbar--flexible-space-maximized",
            FLEXIBLE_MIN: "mdc-toolbar--flexible-space-minimized",
            TOOLBAR_ROW_FLEXIBLE: "mdc-toolbar--flexible"
        };
        exports.strings = {
            CHANGE_EVENT: "MDCToolbar:change",
            FIRST_ROW_SELECTOR: ".mdc-toolbar__row:first-child",
            ICON_SELECTOR: ".mdc-toolbar__icon",
            TITLE_SELECTOR: ".mdc-toolbar__title"
        };
        exports.numbers = {
            MAX_TITLE_SIZE: 2.125,
            MIN_TITLE_SIZE: 1.25,
            TOOLBAR_MOBILE_BREAKPOINT: 600,
            TOOLBAR_ROW_HEIGHT: 64,
            TOOLBAR_ROW_MOBILE_HEIGHT: 56
        };
    }, function(module, exports, __webpack_require__) {
        "use strict";
        var __extends = this && this.__extends || function() {
            var _extendStatics = function extendStatics(d, b) {
                _extendStatics = Object.setPrototypeOf || {
                    __proto__: []
                } instanceof Array && function(d, b) {
                    d.__proto__ = b;
                } || function(d, b) {
                    for (var p in b) {
                        if (b.hasOwnProperty(p)) d[p] = b[p];
                    }
                };
                return _extendStatics(d, b);
            };
            return function(d, b) {
                _extendStatics(d, b);
                function __() {
                    this.constructor = d;
                }
                d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
            };
        }();
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var constants_1 = __webpack_require__(6);
        var foundation_1 = __webpack_require__(32);
        var MDCFixedTopAppBarFoundation = function(_super) {
            __extends(MDCFixedTopAppBarFoundation, _super);
            function MDCFixedTopAppBarFoundation(adapter) {
                var _this = _super.call(this, adapter) || this;
                _this.wasScrolled_ = false;
                _this.scrollHandler_ = function() {
                    return _this.fixedScrollHandler_();
                };
                return _this;
            }
            MDCFixedTopAppBarFoundation.prototype.fixedScrollHandler_ = function() {
                var currentScroll = this.adapter_.getViewportScrollY();
                if (currentScroll <= 0) {
                    if (this.wasScrolled_) {
                        this.adapter_.removeClass(constants_1.cssClasses.FIXED_SCROLLED_CLASS);
                        this.wasScrolled_ = false;
                    }
                } else {
                    if (!this.wasScrolled_) {
                        this.adapter_.addClass(constants_1.cssClasses.FIXED_SCROLLED_CLASS);
                        this.wasScrolled_ = true;
                    }
                }
            };
            return MDCFixedTopAppBarFoundation;
        }(foundation_1.MDCTopAppBarFoundation);
        exports.MDCFixedTopAppBarFoundation = MDCFixedTopAppBarFoundation;
        exports.default = MDCFixedTopAppBarFoundation;
    }, function(module, exports, __webpack_require__) {
        "use strict";
        var __extends = this && this.__extends || function() {
            var _extendStatics = function extendStatics(d, b) {
                _extendStatics = Object.setPrototypeOf || {
                    __proto__: []
                } instanceof Array && function(d, b) {
                    d.__proto__ = b;
                } || function(d, b) {
                    for (var p in b) {
                        if (b.hasOwnProperty(p)) d[p] = b[p];
                    }
                };
                return _extendStatics(d, b);
            };
            return function(d, b) {
                _extendStatics(d, b);
                function __() {
                    this.constructor = d;
                }
                d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
            };
        }();
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var constants_1 = __webpack_require__(6);
        var foundation_1 = __webpack_require__(33);
        var MDCShortTopAppBarFoundation = function(_super) {
            __extends(MDCShortTopAppBarFoundation, _super);
            function MDCShortTopAppBarFoundation(adapter) {
                var _this = _super.call(this, adapter) || this;
                _this.isCollapsed_ = false;
                return _this;
            }
            Object.defineProperty(MDCShortTopAppBarFoundation.prototype, "isCollapsed", {
                get: function get() {
                    return this.isCollapsed_;
                },
                enumerable: true,
                configurable: true
            });
            MDCShortTopAppBarFoundation.prototype.init = function() {
                var _this = this;
                _super.prototype.init.call(this);
                if (this.adapter_.getTotalActionItems() > 0) {
                    this.adapter_.addClass(constants_1.cssClasses.SHORT_HAS_ACTION_ITEM_CLASS);
                }
                if (!this.adapter_.hasClass(constants_1.cssClasses.SHORT_COLLAPSED_CLASS)) {
                    this.scrollHandler_ = function() {
                        return _this.shortAppBarScrollHandler_();
                    };
                    this.adapter_.registerScrollHandler(this.scrollHandler_);
                    this.shortAppBarScrollHandler_();
                }
            };
            MDCShortTopAppBarFoundation.prototype.destroy = function() {
                _super.prototype.destroy.call(this);
            };
            MDCShortTopAppBarFoundation.prototype.shortAppBarScrollHandler_ = function() {
                var currentScroll = this.adapter_.getViewportScrollY();
                if (currentScroll <= 0) {
                    if (this.isCollapsed_) {
                        this.adapter_.removeClass(constants_1.cssClasses.SHORT_COLLAPSED_CLASS);
                        this.isCollapsed_ = false;
                    }
                } else {
                    if (!this.isCollapsed_) {
                        this.adapter_.addClass(constants_1.cssClasses.SHORT_COLLAPSED_CLASS);
                        this.isCollapsed_ = true;
                    }
                }
            };
            return MDCShortTopAppBarFoundation;
        }(foundation_1.MDCTopAppBarBaseFoundation);
        exports.MDCShortTopAppBarFoundation = MDCShortTopAppBarFoundation;
        exports.default = MDCShortTopAppBarFoundation;
    }, function(module, exports, __webpack_require__) {
        "use strict";
        var __importDefault = this && this.__importDefault || function(mod) {
            return mod && mod.__esModule ? mod : {
                default: mod
            };
        };
        var __importStar = this && this.__importStar || function(mod) {
            if (mod && mod.__esModule) return mod;
            var result = {};
            if (mod != null) for (var k in mod) {
                if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
            }
            result["default"] = mod;
            return result;
        };
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var index_1 = __importDefault(__webpack_require__(101));
        exports.autoInit = index_1.default;
        var base = __importStar(__webpack_require__(103));
        exports.base = base;
        var checkbox = __importStar(__webpack_require__(104));
        exports.checkbox = checkbox;
        var chips = __importStar(__webpack_require__(106));
        exports.chips = chips;
        var dialog = __importStar(__webpack_require__(110));
        exports.dialog = dialog;
        var dom = __importStar(__webpack_require__(115));
        exports.dom = dom;
        var drawer = __importStar(__webpack_require__(116));
        exports.drawer = drawer;
        var floatingLabel = __importStar(__webpack_require__(120));
        exports.floatingLabel = floatingLabel;
        var formField = __importStar(__webpack_require__(121));
        exports.formField = formField;
        var gridList = __importStar(__webpack_require__(123));
        exports.gridList = gridList;
        var iconButton = __importStar(__webpack_require__(125));
        exports.iconButton = iconButton;
        var lineRipple = __importStar(__webpack_require__(127));
        exports.lineRipple = lineRipple;
        var linearProgress = __importStar(__webpack_require__(128));
        exports.linearProgress = linearProgress;
        var list = __importStar(__webpack_require__(130));
        exports.list = list;
        var menuSurface = __importStar(__webpack_require__(131));
        exports.menuSurface = menuSurface;
        var menu = __importStar(__webpack_require__(132));
        exports.menu = menu;
        var notchedOutline = __importStar(__webpack_require__(133));
        exports.notchedOutline = notchedOutline;
        var radio = __importStar(__webpack_require__(134));
        exports.radio = radio;
        var ripple = __importStar(__webpack_require__(136));
        exports.ripple = ripple;
        var select = __importStar(__webpack_require__(137));
        exports.select = select;
        var slider = __importStar(__webpack_require__(141));
        exports.slider = slider;
        var snackbar = __importStar(__webpack_require__(143));
        exports.snackbar = snackbar;
        var switchControl = __importStar(__webpack_require__(145));
        exports.switchControl = switchControl;
        var tabBar = __importStar(__webpack_require__(147));
        exports.tabBar = tabBar;
        var tabIndicator = __importStar(__webpack_require__(152));
        exports.tabIndicator = tabIndicator;
        var tabScroller = __importStar(__webpack_require__(153));
        exports.tabScroller = tabScroller;
        var tab = __importStar(__webpack_require__(154));
        exports.tab = tab;
        var textField = __importStar(__webpack_require__(155));
        exports.textField = textField;
        var toolbar = __importStar(__webpack_require__(160));
        exports.toolbar = toolbar;
        var topAppBar = __importStar(__webpack_require__(162));
        exports.topAppBar = topAppBar;
        index_1.default.register("MDCCheckbox", checkbox.MDCCheckbox);
        index_1.default.register("MDCChip", chips.MDCChip);
        index_1.default.register("MDCChipSet", chips.MDCChipSet);
        index_1.default.register("MDCDialog", dialog.MDCDialog);
        index_1.default.register("MDCDrawer", drawer.MDCDrawer);
        index_1.default.register("MDCFloatingLabel", floatingLabel.MDCFloatingLabel);
        index_1.default.register("MDCFormField", formField.MDCFormField);
        index_1.default.register("MDCGridList", gridList.MDCGridList);
        index_1.default.register("MDCIconButtonToggle", iconButton.MDCIconButtonToggle);
        index_1.default.register("MDCLineRipple", lineRipple.MDCLineRipple);
        index_1.default.register("MDCLinearProgress", linearProgress.MDCLinearProgress);
        index_1.default.register("MDCList", list.MDCList);
        index_1.default.register("MDCMenu", menu.MDCMenu);
        index_1.default.register("MDCMenuSurface", menuSurface.MDCMenuSurface);
        index_1.default.register("MDCNotchedOutline", notchedOutline.MDCNotchedOutline);
        index_1.default.register("MDCRadio", radio.MDCRadio);
        index_1.default.register("MDCRipple", ripple.MDCRipple);
        index_1.default.register("MDCSelect", select.MDCSelect);
        index_1.default.register("MDCSlider", slider.MDCSlider);
        index_1.default.register("MDCSnackbar", snackbar.MDCSnackbar);
        index_1.default.register("MDCSwitch", switchControl.MDCSwitch);
        index_1.default.register("MDCTabBar", tabBar.MDCTabBar);
        index_1.default.register("MDCTextField", textField.MDCTextField);
        index_1.default.register("MDCToolbar", toolbar.MDCToolbar);
        index_1.default.register("MDCTopAppBar", topAppBar.MDCTopAppBar);
    }, function(module, exports, __webpack_require__) {
        "use strict";
        var __values = this && this.__values || function(o) {
            var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
            if (m) return m.call(o);
            return {
                next: function next() {
                    if (o && i >= o.length) o = void 0;
                    return {
                        value: o && o[i++],
                        done: !o
                    };
                }
            };
        };
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var constants_1 = __webpack_require__(102);
        var AUTO_INIT_ATTR = constants_1.strings.AUTO_INIT_ATTR, AUTO_INIT_STATE_ATTR = constants_1.strings.AUTO_INIT_STATE_ATTR, INITIALIZED_STATE = constants_1.strings.INITIALIZED_STATE;
        var registry = {};
        var CONSOLE_WARN = console.warn.bind(console);
        function emit(evtType, evtData, shouldBubble) {
            if (shouldBubble === void 0) {
                shouldBubble = false;
            }
            var evt;
            if (typeof CustomEvent === "function") {
                evt = new CustomEvent(evtType, {
                    bubbles: shouldBubble,
                    detail: evtData
                });
            } else {
                evt = document.createEvent("CustomEvent");
                evt.initCustomEvent(evtType, shouldBubble, false, evtData);
            }
            document.dispatchEvent(evt);
        }
        function mdcAutoInit(root) {
            if (root === void 0) {
                root = document;
            }
            var e_1, _a;
            var components = [];
            var nodes = [].slice.call(root.querySelectorAll("[" + AUTO_INIT_ATTR + "]"));
            nodes = nodes.filter(function(node) {
                return node.getAttribute(AUTO_INIT_STATE_ATTR) !== INITIALIZED_STATE;
            });
            try {
                for (var nodes_1 = __values(nodes), nodes_1_1 = nodes_1.next(); !nodes_1_1.done; nodes_1_1 = nodes_1.next()) {
                    var node = nodes_1_1.value;
                    var ctorName = node.getAttribute(AUTO_INIT_ATTR);
                    if (!ctorName) {
                        throw new Error("(mdc-auto-init) Constructor name must be given.");
                    }
                    var Constructor = registry[ctorName];
                    if (typeof Constructor !== "function") {
                        throw new Error("(mdc-auto-init) Could not find constructor in registry for " + ctorName);
                    }
                    var component = Constructor.attachTo(node);
                    Object.defineProperty(node, ctorName, {
                        configurable: true,
                        enumerable: false,
                        value: component,
                        writable: false
                    });
                    components.push(component);
                    node.setAttribute(AUTO_INIT_STATE_ATTR, INITIALIZED_STATE);
                }
            } catch (e_1_1) {
                e_1 = {
                    error: e_1_1
                };
            } finally {
                try {
                    if (nodes_1_1 && !nodes_1_1.done && (_a = nodes_1.return)) _a.call(nodes_1);
                } finally {
                    if (e_1) throw e_1.error;
                }
            }
            emit("MDCAutoInit:End", {});
            return components;
        }
        exports.mdcAutoInit = mdcAutoInit;
        mdcAutoInit.register = function(componentName, Constructor, warn) {
            if (warn === void 0) {
                warn = CONSOLE_WARN;
            }
            if (typeof Constructor !== "function") {
                throw new Error("(mdc-auto-init) Invalid Constructor value: " + Constructor + ". Expected function.");
            }
            var registryValue = registry[componentName];
            if (registryValue) {
                warn("(mdc-auto-init) Overriding registration for " + componentName + " with " + Constructor + ". Was: " + registryValue);
            }
            registry[componentName] = Constructor;
        };
        mdcAutoInit.deregister = function(componentName) {
            delete registry[componentName];
        };
        mdcAutoInit.deregisterAll = function() {
            var keys = Object.keys(registry);
            keys.forEach(this.deregister, this);
        };
        exports.default = mdcAutoInit;
    }, function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports.strings = {
            AUTO_INIT_ATTR: "data-mdc-auto-init",
            AUTO_INIT_STATE_ATTR: "data-mdc-auto-init-state",
            INITIALIZED_STATE: "initialized"
        };
    }, function(module, exports, __webpack_require__) {
        "use strict";
        function __export(m) {
            for (var p in m) {
                if (!exports.hasOwnProperty(p)) exports[p] = m[p];
            }
        }
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        __export(__webpack_require__(1));
        __export(__webpack_require__(0));
    }, function(module, exports, __webpack_require__) {
        "use strict";
        function __export(m) {
            for (var p in m) {
                if (!exports.hasOwnProperty(p)) exports[p] = m[p];
            }
        }
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        __export(__webpack_require__(105));
        __export(__webpack_require__(36));
        __export(__webpack_require__(35));
    }, function(module, exports, __webpack_require__) {
        "use strict";
        var __extends = this && this.__extends || function() {
            var _extendStatics = function extendStatics(d, b) {
                _extendStatics = Object.setPrototypeOf || {
                    __proto__: []
                } instanceof Array && function(d, b) {
                    d.__proto__ = b;
                } || function(d, b) {
                    for (var p in b) {
                        if (b.hasOwnProperty(p)) d[p] = b[p];
                    }
                };
                return _extendStatics(d, b);
            };
            return function(d, b) {
                _extendStatics(d, b);
                function __() {
                    this.constructor = d;
                }
                d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
            };
        }();
        var __assign = this && this.__assign || function() {
            __assign = Object.assign || function(t) {
                for (var s, i = 1, n = arguments.length; i < n; i++) {
                    s = arguments[i];
                    for (var p in s) {
                        if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
                    }
                }
                return t;
            };
            return __assign.apply(this, arguments);
        };
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var util_1 = __webpack_require__(12);
        var component_1 = __webpack_require__(1);
        var ponyfill_1 = __webpack_require__(3);
        var component_2 = __webpack_require__(2);
        var foundation_1 = __webpack_require__(4);
        var foundation_2 = __webpack_require__(35);
        var CB_PROTO_PROPS = [ "checked", "indeterminate" ];
        var MDCCheckbox = function(_super) {
            __extends(MDCCheckbox, _super);
            function MDCCheckbox() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.ripple_ = _this.createRipple_();
                return _this;
            }
            MDCCheckbox.attachTo = function(root) {
                return new MDCCheckbox(root);
            };
            Object.defineProperty(MDCCheckbox.prototype, "ripple", {
                get: function get() {
                    return this.ripple_;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MDCCheckbox.prototype, "checked", {
                get: function get() {
                    return this.nativeControl_.checked;
                },
                set: function set(checked) {
                    this.nativeControl_.checked = checked;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MDCCheckbox.prototype, "indeterminate", {
                get: function get() {
                    return this.nativeControl_.indeterminate;
                },
                set: function set(indeterminate) {
                    this.nativeControl_.indeterminate = indeterminate;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MDCCheckbox.prototype, "disabled", {
                get: function get() {
                    return this.nativeControl_.disabled;
                },
                set: function set(disabled) {
                    this.foundation_.setDisabled(disabled);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MDCCheckbox.prototype, "value", {
                get: function get() {
                    return this.nativeControl_.value;
                },
                set: function set(value) {
                    this.nativeControl_.value = value;
                },
                enumerable: true,
                configurable: true
            });
            MDCCheckbox.prototype.initialSyncWithDOM = function() {
                var _this = this;
                this.handleChange_ = function() {
                    return _this.foundation_.handleChange();
                };
                this.handleAnimationEnd_ = function() {
                    return _this.foundation_.handleAnimationEnd();
                };
                this.nativeControl_.addEventListener("change", this.handleChange_);
                this.listen(util_1.getCorrectEventName(window, "animationend"), this.handleAnimationEnd_);
                this.installPropertyChangeHooks_();
            };
            MDCCheckbox.prototype.destroy = function() {
                this.ripple_.destroy();
                this.nativeControl_.removeEventListener("change", this.handleChange_);
                this.unlisten(util_1.getCorrectEventName(window, "animationend"), this.handleAnimationEnd_);
                this.uninstallPropertyChangeHooks_();
                _super.prototype.destroy.call(this);
            };
            MDCCheckbox.prototype.getDefaultFoundation = function() {
                var _this = this;
                var adapter = {
                    addClass: function addClass(className) {
                        return _this.root_.classList.add(className);
                    },
                    forceLayout: function forceLayout() {
                        return _this.root_.offsetWidth;
                    },
                    hasNativeControl: function hasNativeControl() {
                        return !!_this.nativeControl_;
                    },
                    isAttachedToDOM: function isAttachedToDOM() {
                        return Boolean(_this.root_.parentNode);
                    },
                    isChecked: function isChecked() {
                        return _this.checked;
                    },
                    isIndeterminate: function isIndeterminate() {
                        return _this.indeterminate;
                    },
                    removeClass: function removeClass(className) {
                        return _this.root_.classList.remove(className);
                    },
                    removeNativeControlAttr: function removeNativeControlAttr(attr) {
                        return _this.nativeControl_.removeAttribute(attr);
                    },
                    setNativeControlAttr: function setNativeControlAttr(attr, value) {
                        return _this.nativeControl_.setAttribute(attr, value);
                    },
                    setNativeControlDisabled: function setNativeControlDisabled(disabled) {
                        return _this.nativeControl_.disabled = disabled;
                    }
                };
                return new foundation_2.MDCCheckboxFoundation(adapter);
            };
            MDCCheckbox.prototype.createRipple_ = function() {
                var _this = this;
                var adapter = __assign({}, component_2.MDCRipple.createAdapter(this), {
                    deregisterInteractionHandler: function deregisterInteractionHandler(evtType, handler) {
                        return _this.nativeControl_.removeEventListener(evtType, handler);
                    },
                    isSurfaceActive: function isSurfaceActive() {
                        return ponyfill_1.matches(_this.nativeControl_, ":active");
                    },
                    isUnbounded: function isUnbounded() {
                        return true;
                    },
                    registerInteractionHandler: function registerInteractionHandler(evtType, handler) {
                        return _this.nativeControl_.addEventListener(evtType, handler);
                    }
                });
                return new component_2.MDCRipple(this.root_, new foundation_1.MDCRippleFoundation(adapter));
            };
            MDCCheckbox.prototype.installPropertyChangeHooks_ = function() {
                var _this = this;
                var nativeCb = this.nativeControl_;
                var cbProto = Object.getPrototypeOf(nativeCb);
                CB_PROTO_PROPS.forEach(function(controlState) {
                    var desc = Object.getOwnPropertyDescriptor(cbProto, controlState);
                    if (!validDescriptor(desc)) {
                        return;
                    }
                    var nativeGetter = desc.get;
                    var nativeCbDesc = {
                        configurable: desc.configurable,
                        enumerable: desc.enumerable,
                        get: nativeGetter,
                        set: function set(state) {
                            desc.set.call(nativeCb, state);
                            _this.foundation_.handleChange();
                        }
                    };
                    Object.defineProperty(nativeCb, controlState, nativeCbDesc);
                });
            };
            MDCCheckbox.prototype.uninstallPropertyChangeHooks_ = function() {
                var nativeCb = this.nativeControl_;
                var cbProto = Object.getPrototypeOf(nativeCb);
                CB_PROTO_PROPS.forEach(function(controlState) {
                    var desc = Object.getOwnPropertyDescriptor(cbProto, controlState);
                    if (!validDescriptor(desc)) {
                        return;
                    }
                    Object.defineProperty(nativeCb, controlState, desc);
                });
            };
            Object.defineProperty(MDCCheckbox.prototype, "nativeControl_", {
                get: function get() {
                    var NATIVE_CONTROL_SELECTOR = foundation_2.MDCCheckboxFoundation.strings.NATIVE_CONTROL_SELECTOR;
                    var el = this.root_.querySelector(NATIVE_CONTROL_SELECTOR);
                    if (!el) {
                        throw new Error("Checkbox component requires a " + NATIVE_CONTROL_SELECTOR + " element");
                    }
                    return el;
                },
                enumerable: true,
                configurable: true
            });
            return MDCCheckbox;
        }(component_1.MDCComponent);
        exports.MDCCheckbox = MDCCheckbox;
        function validDescriptor(inputPropDesc) {
            return !!inputPropDesc && typeof inputPropDesc.set === "function";
        }
    }, function(module, exports, __webpack_require__) {
        "use strict";
        function __export(m) {
            for (var p in m) {
                if (!exports.hasOwnProperty(p)) exports[p] = m[p];
            }
        }
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        __export(__webpack_require__(107));
        __export(__webpack_require__(108));
    }, function(module, exports, __webpack_require__) {
        "use strict";
        function __export(m) {
            for (var p in m) {
                if (!exports.hasOwnProperty(p)) exports[p] = m[p];
            }
        }
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        __export(__webpack_require__(37));
        __export(__webpack_require__(15));
        var constants_1 = __webpack_require__(14);
        exports.chipCssClasses = constants_1.cssClasses;
        exports.chipStrings = constants_1.strings;
    }, function(module, exports, __webpack_require__) {
        "use strict";
        function __export(m) {
            for (var p in m) {
                if (!exports.hasOwnProperty(p)) exports[p] = m[p];
            }
        }
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        __export(__webpack_require__(109));
        __export(__webpack_require__(38));
        var constants_1 = __webpack_require__(39);
        exports.chipSetCssClasses = constants_1.cssClasses;
        exports.chipSetStrings = constants_1.strings;
    }, function(module, exports, __webpack_require__) {
        "use strict";
        var __extends = this && this.__extends || function() {
            var _extendStatics = function extendStatics(d, b) {
                _extendStatics = Object.setPrototypeOf || {
                    __proto__: []
                } instanceof Array && function(d, b) {
                    d.__proto__ = b;
                } || function(d, b) {
                    for (var p in b) {
                        if (b.hasOwnProperty(p)) d[p] = b[p];
                    }
                };
                return _extendStatics(d, b);
            };
            return function(d, b) {
                _extendStatics(d, b);
                function __() {
                    this.constructor = d;
                }
                d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
            };
        }();
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var component_1 = __webpack_require__(1);
        var component_2 = __webpack_require__(37);
        var foundation_1 = __webpack_require__(15);
        var foundation_2 = __webpack_require__(38);
        var _a = foundation_1.MDCChipFoundation.strings, INTERACTION_EVENT = _a.INTERACTION_EVENT, SELECTION_EVENT = _a.SELECTION_EVENT, REMOVAL_EVENT = _a.REMOVAL_EVENT;
        var CHIP_SELECTOR = foundation_2.MDCChipSetFoundation.strings.CHIP_SELECTOR;
        var idCounter = 0;
        var MDCChipSet = function(_super) {
            __extends(MDCChipSet, _super);
            function MDCChipSet() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            MDCChipSet.attachTo = function(root) {
                return new MDCChipSet(root);
            };
            Object.defineProperty(MDCChipSet.prototype, "chips", {
                get: function get() {
                    return this.chips_.slice();
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MDCChipSet.prototype, "selectedChipIds", {
                get: function get() {
                    return this.foundation_.getSelectedChipIds();
                },
                enumerable: true,
                configurable: true
            });
            MDCChipSet.prototype.initialize = function(chipFactory) {
                if (chipFactory === void 0) {
                    chipFactory = function chipFactory(el) {
                        return new component_2.MDCChip(el);
                    };
                }
                this.chipFactory_ = chipFactory;
                this.chips_ = this.instantiateChips_(this.chipFactory_);
            };
            MDCChipSet.prototype.initialSyncWithDOM = function() {
                var _this = this;
                this.chips_.forEach(function(chip) {
                    if (chip.id && chip.selected) {
                        _this.foundation_.select(chip.id);
                    }
                });
                this.handleChipInteraction_ = function(evt) {
                    return _this.foundation_.handleChipInteraction(evt.detail.chipId);
                };
                this.handleChipSelection_ = function(evt) {
                    return _this.foundation_.handleChipSelection(evt.detail.chipId, evt.detail.selected);
                };
                this.handleChipRemoval_ = function(evt) {
                    return _this.foundation_.handleChipRemoval(evt.detail.chipId);
                };
                this.listen(INTERACTION_EVENT, this.handleChipInteraction_);
                this.listen(SELECTION_EVENT, this.handleChipSelection_);
                this.listen(REMOVAL_EVENT, this.handleChipRemoval_);
            };
            MDCChipSet.prototype.destroy = function() {
                this.chips_.forEach(function(chip) {
                    chip.destroy();
                });
                this.unlisten(INTERACTION_EVENT, this.handleChipInteraction_);
                this.unlisten(SELECTION_EVENT, this.handleChipSelection_);
                this.unlisten(REMOVAL_EVENT, this.handleChipRemoval_);
                _super.prototype.destroy.call(this);
            };
            MDCChipSet.prototype.addChip = function(chipEl) {
                chipEl.id = chipEl.id || "mdc-chip-" + ++idCounter;
                this.chips_.push(this.chipFactory_(chipEl));
            };
            MDCChipSet.prototype.getDefaultFoundation = function() {
                var _this = this;
                var adapter = {
                    hasClass: function hasClass(className) {
                        return _this.root_.classList.contains(className);
                    },
                    removeChip: function removeChip(chipId) {
                        var index = _this.findChipIndex_(chipId);
                        if (index >= 0) {
                            _this.chips_[index].destroy();
                            _this.chips_.splice(index, 1);
                        }
                    },
                    setSelected: function setSelected(chipId, selected) {
                        var index = _this.findChipIndex_(chipId);
                        if (index >= 0) {
                            _this.chips_[index].selected = selected;
                        }
                    }
                };
                return new foundation_2.MDCChipSetFoundation(adapter);
            };
            MDCChipSet.prototype.instantiateChips_ = function(chipFactory) {
                var chipElements = [].slice.call(this.root_.querySelectorAll(CHIP_SELECTOR));
                return chipElements.map(function(el) {
                    el.id = el.id || "mdc-chip-" + ++idCounter;
                    return chipFactory(el);
                });
            };
            MDCChipSet.prototype.findChipIndex_ = function(chipId) {
                for (var i = 0; i < this.chips_.length; i++) {
                    if (this.chips_[i].id === chipId) {
                        return i;
                    }
                }
                return -1;
            };
            return MDCChipSet;
        }(component_1.MDCComponent);
        exports.MDCChipSet = MDCChipSet;
    }, function(module, exports, __webpack_require__) {
        "use strict";
        function __export(m) {
            for (var p in m) {
                if (!exports.hasOwnProperty(p)) exports[p] = m[p];
            }
        }
        var __importStar = this && this.__importStar || function(mod) {
            if (mod && mod.__esModule) return mod;
            var result = {};
            if (mod != null) for (var k in mod) {
                if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
            }
            result["default"] = mod;
            return result;
        };
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var util = __importStar(__webpack_require__(40));
        exports.util = util;
        __export(__webpack_require__(114));
        __export(__webpack_require__(42));
        __export(__webpack_require__(41));
    }, function(module, exports, __webpack_require__) {
        var tabbable = __webpack_require__(112);
        var xtend = __webpack_require__(113);
        var activeFocusTraps = function() {
            var trapQueue = [];
            return {
                activateTrap: function(trap) {
                    if (trapQueue.length > 0) {
                        var activeTrap = trapQueue[trapQueue.length - 1];
                        if (activeTrap !== trap) {
                            activeTrap.pause();
                        }
                    }
                    var trapIndex = trapQueue.indexOf(trap);
                    if (trapIndex === -1) {
                        trapQueue.push(trap);
                    } else {
                        trapQueue.splice(trapIndex, 1);
                        trapQueue.push(trap);
                    }
                },
                deactivateTrap: function(trap) {
                    var trapIndex = trapQueue.indexOf(trap);
                    if (trapIndex !== -1) {
                        trapQueue.splice(trapIndex, 1);
                    }
                    if (trapQueue.length > 0) {
                        trapQueue[trapQueue.length - 1].unpause();
                    }
                }
            };
        }();
        function focusTrap(element, userOptions) {
            var doc = document;
            var container = typeof element === "string" ? doc.querySelector(element) : element;
            var config = xtend({
                returnFocusOnDeactivate: true,
                escapeDeactivates: true
            }, userOptions);
            var state = {
                firstTabbableNode: null,
                lastTabbableNode: null,
                nodeFocusedBeforeActivation: null,
                mostRecentlyFocusedNode: null,
                active: false,
                paused: false
            };
            var trap = {
                activate: activate,
                deactivate: deactivate,
                pause: pause,
                unpause: unpause
            };
            return trap;
            function activate(activateOptions) {
                if (state.active) return;
                updateTabbableNodes();
                state.active = true;
                state.paused = false;
                state.nodeFocusedBeforeActivation = doc.activeElement;
                var onActivate = activateOptions && activateOptions.onActivate ? activateOptions.onActivate : config.onActivate;
                if (onActivate) {
                    onActivate();
                }
                addListeners();
                return trap;
            }
            function deactivate(deactivateOptions) {
                if (!state.active) return;
                removeListeners();
                state.active = false;
                state.paused = false;
                activeFocusTraps.deactivateTrap(trap);
                var onDeactivate = deactivateOptions && deactivateOptions.onDeactivate !== undefined ? deactivateOptions.onDeactivate : config.onDeactivate;
                if (onDeactivate) {
                    onDeactivate();
                }
                var returnFocus = deactivateOptions && deactivateOptions.returnFocus !== undefined ? deactivateOptions.returnFocus : config.returnFocusOnDeactivate;
                if (returnFocus) {
                    delay(function() {
                        tryFocus(state.nodeFocusedBeforeActivation);
                    });
                }
                return trap;
            }
            function pause() {
                if (state.paused || !state.active) return;
                state.paused = true;
                removeListeners();
            }
            function unpause() {
                if (!state.paused || !state.active) return;
                state.paused = false;
                updateTabbableNodes();
                addListeners();
            }
            function addListeners() {
                if (!state.active) return;
                activeFocusTraps.activateTrap(trap);
                delay(function() {
                    tryFocus(getInitialFocusNode());
                });
                doc.addEventListener("focusin", checkFocusIn, true);
                doc.addEventListener("mousedown", checkPointerDown, {
                    capture: true,
                    passive: false
                });
                doc.addEventListener("touchstart", checkPointerDown, {
                    capture: true,
                    passive: false
                });
                doc.addEventListener("click", checkClick, {
                    capture: true,
                    passive: false
                });
                doc.addEventListener("keydown", checkKey, {
                    capture: true,
                    passive: false
                });
                return trap;
            }
            function removeListeners() {
                if (!state.active) return;
                doc.removeEventListener("focusin", checkFocusIn, true);
                doc.removeEventListener("mousedown", checkPointerDown, true);
                doc.removeEventListener("touchstart", checkPointerDown, true);
                doc.removeEventListener("click", checkClick, true);
                doc.removeEventListener("keydown", checkKey, true);
                return trap;
            }
            function getNodeForOption(optionName) {
                var optionValue = config[optionName];
                var node = optionValue;
                if (!optionValue) {
                    return null;
                }
                if (typeof optionValue === "string") {
                    node = doc.querySelector(optionValue);
                    if (!node) {
                        throw new Error("`" + optionName + "` refers to no known node");
                    }
                }
                if (typeof optionValue === "function") {
                    node = optionValue();
                    if (!node) {
                        throw new Error("`" + optionName + "` did not return a node");
                    }
                }
                return node;
            }
            function getInitialFocusNode() {
                var node;
                if (getNodeForOption("initialFocus") !== null) {
                    node = getNodeForOption("initialFocus");
                } else if (container.contains(doc.activeElement)) {
                    node = doc.activeElement;
                } else {
                    node = state.firstTabbableNode || getNodeForOption("fallbackFocus");
                }
                if (!node) {
                    throw new Error("You can't have a focus-trap without at least one focusable element");
                }
                return node;
            }
            function checkPointerDown(e) {
                if (container.contains(e.target)) return;
                if (config.clickOutsideDeactivates) {
                    deactivate({
                        returnFocus: !tabbable.isFocusable(e.target)
                    });
                } else {
                    e.preventDefault();
                }
            }
            function checkFocusIn(e) {
                if (container.contains(e.target) || e.target instanceof Document) {
                    return;
                }
                e.stopImmediatePropagation();
                tryFocus(state.mostRecentlyFocusedNode || getInitialFocusNode());
            }
            function checkKey(e) {
                if (config.escapeDeactivates !== false && isEscapeEvent(e)) {
                    e.preventDefault();
                    deactivate();
                    return;
                }
                if (isTabEvent(e)) {
                    checkTab(e);
                    return;
                }
            }
            function checkTab(e) {
                updateTabbableNodes();
                if (e.shiftKey && e.target === state.firstTabbableNode) {
                    e.preventDefault();
                    tryFocus(state.lastTabbableNode);
                    return;
                }
                if (!e.shiftKey && e.target === state.lastTabbableNode) {
                    e.preventDefault();
                    tryFocus(state.firstTabbableNode);
                    return;
                }
            }
            function checkClick(e) {
                if (config.clickOutsideDeactivates) return;
                if (container.contains(e.target)) return;
                e.preventDefault();
                e.stopImmediatePropagation();
            }
            function updateTabbableNodes() {
                var tabbableNodes = tabbable(container);
                state.firstTabbableNode = tabbableNodes[0] || getInitialFocusNode();
                state.lastTabbableNode = tabbableNodes[tabbableNodes.length - 1] || getInitialFocusNode();
            }
            function tryFocus(node) {
                if (node === doc.activeElement) return;
                if (!node || !node.focus) {
                    tryFocus(getInitialFocusNode());
                    return;
                }
                node.focus();
                state.mostRecentlyFocusedNode = node;
                if (isSelectableInput(node)) {
                    node.select();
                }
            }
        }
        function isSelectableInput(node) {
            return node.tagName && node.tagName.toLowerCase() === "input" && typeof node.select === "function";
        }
        function isEscapeEvent(e) {
            return e.key === "Escape" || e.key === "Esc" || e.keyCode === 27;
        }
        function isTabEvent(e) {
            return e.key === "Tab" || e.keyCode === 9;
        }
        function delay(fn) {
            return setTimeout(fn, 0);
        }
        module.exports = focusTrap;
    }, function(module, exports) {
        var candidateSelectors = [ "input", "select", "textarea", "a[href]", "button", "[tabindex]", "audio[controls]", "video[controls]", '[contenteditable]:not([contenteditable="false"])' ];
        var candidateSelector = candidateSelectors.join(",");
        var matches = typeof Element === "undefined" ? function() {} : Element.prototype.matches || Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
        function tabbable(el, options) {
            options = options || {};
            var regularTabbables = [];
            var orderedTabbables = [];
            var candidates = el.querySelectorAll(candidateSelector);
            if (options.includeContainer) {
                if (matches.call(el, candidateSelector)) {
                    candidates = Array.prototype.slice.apply(candidates);
                    candidates.unshift(el);
                }
            }
            var i, candidate, candidateTabindex;
            for (i = 0; i < candidates.length; i++) {
                candidate = candidates[i];
                if (!isNodeMatchingSelectorTabbable(candidate)) continue;
                candidateTabindex = getTabindex(candidate);
                if (candidateTabindex === 0) {
                    regularTabbables.push(candidate);
                } else {
                    orderedTabbables.push({
                        documentOrder: i,
                        tabIndex: candidateTabindex,
                        node: candidate
                    });
                }
            }
            var tabbableNodes = orderedTabbables.sort(sortOrderedTabbables).map(function(a) {
                return a.node;
            }).concat(regularTabbables);
            return tabbableNodes;
        }
        tabbable.isTabbable = isTabbable;
        tabbable.isFocusable = isFocusable;
        function isNodeMatchingSelectorTabbable(node) {
            if (!isNodeMatchingSelectorFocusable(node) || isNonTabbableRadio(node) || getTabindex(node) < 0) {
                return false;
            }
            return true;
        }
        function isTabbable(node) {
            if (!node) throw new Error("No node provided");
            if (matches.call(node, candidateSelector) === false) return false;
            return isNodeMatchingSelectorTabbable(node);
        }
        function isNodeMatchingSelectorFocusable(node) {
            if (node.disabled || isHiddenInput(node) || isHidden(node)) {
                return false;
            }
            return true;
        }
        var focusableCandidateSelector = candidateSelectors.concat("iframe").join(",");
        function isFocusable(node) {
            if (!node) throw new Error("No node provided");
            if (matches.call(node, focusableCandidateSelector) === false) return false;
            return isNodeMatchingSelectorFocusable(node);
        }
        function getTabindex(node) {
            var tabindexAttr = parseInt(node.getAttribute("tabindex"), 10);
            if (!isNaN(tabindexAttr)) return tabindexAttr;
            if (isContentEditable(node)) return 0;
            return node.tabIndex;
        }
        function sortOrderedTabbables(a, b) {
            return a.tabIndex === b.tabIndex ? a.documentOrder - b.documentOrder : a.tabIndex - b.tabIndex;
        }
        function isContentEditable(node) {
            return node.contentEditable === "true";
        }
        function isInput(node) {
            return node.tagName === "INPUT";
        }
        function isHiddenInput(node) {
            return isInput(node) && node.type === "hidden";
        }
        function isRadio(node) {
            return isInput(node) && node.type === "radio";
        }
        function isNonTabbableRadio(node) {
            return isRadio(node) && !isTabbableRadio(node);
        }
        function getCheckedRadio(nodes) {
            for (var i = 0; i < nodes.length; i++) {
                if (nodes[i].checked) {
                    return nodes[i];
                }
            }
        }
        function isTabbableRadio(node) {
            if (!node.name) return true;
            var radioSet = node.ownerDocument.querySelectorAll('input[type="radio"][name="' + node.name + '"]');
            var checked = getCheckedRadio(radioSet);
            return !checked || checked === node;
        }
        function isHidden(node) {
            return node.offsetParent === null || getComputedStyle(node).visibility === "hidden";
        }
        module.exports = tabbable;
    }, function(module, exports) {
        module.exports = extend;
        var hasOwnProperty = Object.prototype.hasOwnProperty;
        function extend() {
            var target = {};
            for (var i = 0; i < arguments.length; i++) {
                var source = arguments[i];
                for (var key in source) {
                    if (hasOwnProperty.call(source, key)) {
                        target[key] = source[key];
                    }
                }
            }
            return target;
        }
    }, function(module, exports, __webpack_require__) {
        "use strict";
        var __extends = this && this.__extends || function() {
            var _extendStatics = function extendStatics(d, b) {
                _extendStatics = Object.setPrototypeOf || {
                    __proto__: []
                } instanceof Array && function(d, b) {
                    d.__proto__ = b;
                } || function(d, b) {
                    for (var p in b) {
                        if (b.hasOwnProperty(p)) d[p] = b[p];
                    }
                };
                return _extendStatics(d, b);
            };
            return function(d, b) {
                _extendStatics(d, b);
                function __() {
                    this.constructor = d;
                }
                d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
            };
        }();
        var __values = this && this.__values || function(o) {
            var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
            if (m) return m.call(o);
            return {
                next: function next() {
                    if (o && i >= o.length) o = void 0;
                    return {
                        value: o && o[i++],
                        done: !o
                    };
                }
            };
        };
        var __importStar = this && this.__importStar || function(mod) {
            if (mod && mod.__esModule) return mod;
            var result = {};
            if (mod != null) for (var k in mod) {
                if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
            }
            result["default"] = mod;
            return result;
        };
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var component_1 = __webpack_require__(1);
        var ponyfill_1 = __webpack_require__(3);
        var component_2 = __webpack_require__(2);
        var foundation_1 = __webpack_require__(41);
        var util = __importStar(__webpack_require__(40));
        var strings = foundation_1.MDCDialogFoundation.strings;
        var MDCDialog = function(_super) {
            __extends(MDCDialog, _super);
            function MDCDialog() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            Object.defineProperty(MDCDialog.prototype, "isOpen", {
                get: function get() {
                    return this.foundation_.isOpen();
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MDCDialog.prototype, "escapeKeyAction", {
                get: function get() {
                    return this.foundation_.getEscapeKeyAction();
                },
                set: function set(action) {
                    this.foundation_.setEscapeKeyAction(action);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MDCDialog.prototype, "scrimClickAction", {
                get: function get() {
                    return this.foundation_.getScrimClickAction();
                },
                set: function set(action) {
                    this.foundation_.setScrimClickAction(action);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MDCDialog.prototype, "autoStackButtons", {
                get: function get() {
                    return this.foundation_.getAutoStackButtons();
                },
                set: function set(autoStack) {
                    this.foundation_.setAutoStackButtons(autoStack);
                },
                enumerable: true,
                configurable: true
            });
            MDCDialog.attachTo = function(root) {
                return new MDCDialog(root);
            };
            MDCDialog.prototype.initialize = function(focusTrapFactory, initialFocusEl) {
                var e_1, _a;
                var container = this.root_.querySelector(strings.CONTAINER_SELECTOR);
                if (!container) {
                    throw new Error("Dialog component requires a " + strings.CONTAINER_SELECTOR + " container element");
                }
                this.container_ = container;
                this.content_ = this.root_.querySelector(strings.CONTENT_SELECTOR);
                this.buttons_ = [].slice.call(this.root_.querySelectorAll(strings.BUTTON_SELECTOR));
                this.defaultButton_ = this.root_.querySelector(strings.DEFAULT_BUTTON_SELECTOR);
                this.focusTrapFactory_ = focusTrapFactory;
                this.initialFocusEl_ = initialFocusEl;
                this.buttonRipples_ = [];
                try {
                    for (var _b = __values(this.buttons_), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var buttonEl = _c.value;
                        this.buttonRipples_.push(new component_2.MDCRipple(buttonEl));
                    }
                } catch (e_1_1) {
                    e_1 = {
                        error: e_1_1
                    };
                } finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                    } finally {
                        if (e_1) throw e_1.error;
                    }
                }
            };
            MDCDialog.prototype.initialSyncWithDOM = function() {
                var _this = this;
                this.focusTrap_ = util.createFocusTrapInstance(this.container_, this.focusTrapFactory_, this.initialFocusEl_);
                this.handleInteraction_ = this.foundation_.handleInteraction.bind(this.foundation_);
                this.handleDocumentKeydown_ = this.foundation_.handleDocumentKeydown.bind(this.foundation_);
                this.handleLayout_ = this.layout.bind(this);
                var LAYOUT_EVENTS = [ "resize", "orientationchange" ];
                this.handleOpening_ = function() {
                    LAYOUT_EVENTS.forEach(function(evtType) {
                        return window.addEventListener(evtType, _this.handleLayout_);
                    });
                    document.addEventListener("keydown", _this.handleDocumentKeydown_);
                };
                this.handleClosing_ = function() {
                    LAYOUT_EVENTS.forEach(function(evtType) {
                        return window.removeEventListener(evtType, _this.handleLayout_);
                    });
                    document.removeEventListener("keydown", _this.handleDocumentKeydown_);
                };
                this.listen("click", this.handleInteraction_);
                this.listen("keydown", this.handleInteraction_);
                this.listen(strings.OPENING_EVENT, this.handleOpening_);
                this.listen(strings.CLOSING_EVENT, this.handleClosing_);
            };
            MDCDialog.prototype.destroy = function() {
                this.unlisten("click", this.handleInteraction_);
                this.unlisten("keydown", this.handleInteraction_);
                this.unlisten(strings.OPENING_EVENT, this.handleOpening_);
                this.unlisten(strings.CLOSING_EVENT, this.handleClosing_);
                this.handleClosing_();
                this.buttonRipples_.forEach(function(ripple) {
                    return ripple.destroy();
                });
                _super.prototype.destroy.call(this);
            };
            MDCDialog.prototype.layout = function() {
                this.foundation_.layout();
            };
            MDCDialog.prototype.open = function() {
                this.foundation_.open();
            };
            MDCDialog.prototype.close = function(action) {
                if (action === void 0) {
                    action = "";
                }
                this.foundation_.close(action);
            };
            MDCDialog.prototype.getDefaultFoundation = function() {
                var _this = this;
                var adapter = {
                    addBodyClass: function addBodyClass(className) {
                        return document.body.classList.add(className);
                    },
                    addClass: function addClass(className) {
                        return _this.root_.classList.add(className);
                    },
                    areButtonsStacked: function areButtonsStacked() {
                        return util.areTopsMisaligned(_this.buttons_);
                    },
                    clickDefaultButton: function clickDefaultButton() {
                        return _this.defaultButton_ && _this.defaultButton_.click();
                    },
                    eventTargetMatches: function eventTargetMatches(target, selector) {
                        return target ? ponyfill_1.matches(target, selector) : false;
                    },
                    getActionFromEvent: function getActionFromEvent(evt) {
                        if (!evt.target) {
                            return "";
                        }
                        var element = ponyfill_1.closest(evt.target, "[" + strings.ACTION_ATTRIBUTE + "]");
                        return element && element.getAttribute(strings.ACTION_ATTRIBUTE);
                    },
                    hasClass: function hasClass(className) {
                        return _this.root_.classList.contains(className);
                    },
                    isContentScrollable: function isContentScrollable() {
                        return util.isScrollable(_this.content_);
                    },
                    notifyClosed: function notifyClosed(action) {
                        return _this.emit(strings.CLOSED_EVENT, action ? {
                            action: action
                        } : {});
                    },
                    notifyClosing: function notifyClosing(action) {
                        return _this.emit(strings.CLOSING_EVENT, action ? {
                            action: action
                        } : {});
                    },
                    notifyOpened: function notifyOpened() {
                        return _this.emit(strings.OPENED_EVENT, {});
                    },
                    notifyOpening: function notifyOpening() {
                        return _this.emit(strings.OPENING_EVENT, {});
                    },
                    releaseFocus: function releaseFocus() {
                        return _this.focusTrap_.deactivate();
                    },
                    removeBodyClass: function removeBodyClass(className) {
                        return document.body.classList.remove(className);
                    },
                    removeClass: function removeClass(className) {
                        return _this.root_.classList.remove(className);
                    },
                    reverseButtons: function reverseButtons() {
                        _this.buttons_.reverse();
                        _this.buttons_.forEach(function(button) {
                            button.parentElement.appendChild(button);
                        });
                    },
                    trapFocus: function trapFocus() {
                        return _this.focusTrap_.activate();
                    }
                };
                return new foundation_1.MDCDialogFoundation(adapter);
            };
            return MDCDialog;
        }(component_1.MDCComponent);
        exports.MDCDialog = MDCDialog;
    }, function(module, exports, __webpack_require__) {
        "use strict";
        var __importStar = this && this.__importStar || function(mod) {
            if (mod && mod.__esModule) return mod;
            var result = {};
            if (mod != null) for (var k in mod) {
                if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
            }
            result["default"] = mod;
            return result;
        };
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var ponyfill = __importStar(__webpack_require__(3));
        exports.ponyfill = ponyfill;
    }, function(module, exports, __webpack_require__) {
        "use strict";
        function __export(m) {
            for (var p in m) {
                if (!exports.hasOwnProperty(p)) exports[p] = m[p];
            }
        }
        var __importStar = this && this.__importStar || function(mod) {
            if (mod && mod.__esModule) return mod;
            var result = {};
            if (mod != null) for (var k in mod) {
                if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
            }
            result["default"] = mod;
            return result;
        };
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var util = __importStar(__webpack_require__(43));
        exports.util = util;
        __export(__webpack_require__(119));
        __export(__webpack_require__(45));
        __export(__webpack_require__(18));
        __export(__webpack_require__(46));
    }, function(module, exports) {
        var candidateSelectors = [ "input", "select", "textarea", "a[href]", "button", "[tabindex]", "audio[controls]", "video[controls]", '[contenteditable]:not([contenteditable="false"])' ];
        var candidateSelector = candidateSelectors.join(",");
        var matches = typeof Element === "undefined" ? function() {} : Element.prototype.matches || Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
        function tabbable(el, options) {
            options = options || {};
            var regularTabbables = [];
            var orderedTabbables = [];
            var candidates = el.querySelectorAll(candidateSelector);
            if (options.includeContainer) {
                if (matches.call(el, candidateSelector)) {
                    candidates = Array.prototype.slice.apply(candidates);
                    candidates.unshift(el);
                }
            }
            var i, candidate, candidateTabindex;
            for (i = 0; i < candidates.length; i++) {
                candidate = candidates[i];
                if (!isNodeMatchingSelectorTabbable(candidate)) continue;
                candidateTabindex = getTabindex(candidate);
                if (candidateTabindex === 0) {
                    regularTabbables.push(candidate);
                } else {
                    orderedTabbables.push({
                        documentOrder: i,
                        tabIndex: candidateTabindex,
                        node: candidate
                    });
                }
            }
            var tabbableNodes = orderedTabbables.sort(sortOrderedTabbables).map(function(a) {
                return a.node;
            }).concat(regularTabbables);
            return tabbableNodes;
        }
        tabbable.isTabbable = isTabbable;
        tabbable.isFocusable = isFocusable;
        function isNodeMatchingSelectorTabbable(node) {
            if (!isNodeMatchingSelectorFocusable(node) || isNonTabbableRadio(node) || getTabindex(node) < 0) {
                return false;
            }
            return true;
        }
        function isTabbable(node) {
            if (!node) throw new Error("No node provided");
            if (matches.call(node, candidateSelector) === false) return false;
            return isNodeMatchingSelectorTabbable(node);
        }
        function isNodeMatchingSelectorFocusable(node) {
            if (node.disabled || isHiddenInput(node) || isHidden(node)) {
                return false;
            }
            return true;
        }
        var focusableCandidateSelector = candidateSelectors.concat("iframe").join(",");
        function isFocusable(node) {
            if (!node) throw new Error("No node provided");
            if (matches.call(node, focusableCandidateSelector) === false) return false;
            return isNodeMatchingSelectorFocusable(node);
        }
        function getTabindex(node) {
            var tabindexAttr = parseInt(node.getAttribute("tabindex"), 10);
            if (!isNaN(tabindexAttr)) return tabindexAttr;
            if (isContentEditable(node)) return 0;
            return node.tabIndex;
        }
        function sortOrderedTabbables(a, b) {
            return a.tabIndex === b.tabIndex ? a.documentOrder - b.documentOrder : a.tabIndex - b.tabIndex;
        }
        function isContentEditable(node) {
            return node.contentEditable === "true";
        }
        function isInput(node) {
            return node.tagName === "INPUT";
        }
        function isHiddenInput(node) {
            return isInput(node) && node.type === "hidden";
        }
        function isRadio(node) {
            return isInput(node) && node.type === "radio";
        }
        function isNonTabbableRadio(node) {
            return isRadio(node) && !isTabbableRadio(node);
        }
        function getCheckedRadio(nodes) {
            for (var i = 0; i < nodes.length; i++) {
                if (nodes[i].checked) {
                    return nodes[i];
                }
            }
        }
        function isTabbableRadio(node) {
            if (!node.name) return true;
            var radioSet = node.ownerDocument.querySelectorAll('input[type="radio"][name="' + node.name + '"]');
            var checked = getCheckedRadio(radioSet);
            return !checked || checked === node;
        }
        function isHidden(node) {
            return node.offsetParent === null || getComputedStyle(node).visibility === "hidden";
        }
        module.exports = tabbable;
    }, function(module, exports) {
        module.exports = extend;
        var hasOwnProperty = Object.prototype.hasOwnProperty;
        function extend() {
            var target = {};
            for (var i = 0; i < arguments.length; i++) {
                var source = arguments[i];
                for (var key in source) {
                    if (hasOwnProperty.call(source, key)) {
                        target[key] = source[key];
                    }
                }
            }
            return target;
        }
    }, function(module, exports, __webpack_require__) {
        "use strict";
        var __extends = this && this.__extends || function() {
            var _extendStatics = function extendStatics(d, b) {
                _extendStatics = Object.setPrototypeOf || {
                    __proto__: []
                } instanceof Array && function(d, b) {
                    d.__proto__ = b;
                } || function(d, b) {
                    for (var p in b) {
                        if (b.hasOwnProperty(p)) d[p] = b[p];
                    }
                };
                return _extendStatics(d, b);
            };
            return function(d, b) {
                _extendStatics(d, b);
                function __() {
                    this.constructor = d;
                }
                d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
            };
        }();
        var __importDefault = this && this.__importDefault || function(mod) {
            return mod && mod.__esModule ? mod : {
                default: mod
            };
        };
        var __importStar = this && this.__importStar || function(mod) {
            if (mod && mod.__esModule) return mod;
            var result = {};
            if (mod != null) for (var k in mod) {
                if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
            }
            result["default"] = mod;
            return result;
        };
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var component_1 = __webpack_require__(1);
        var component_2 = __webpack_require__(16);
        var foundation_1 = __webpack_require__(7);
        var focus_trap_1 = __importDefault(__webpack_require__(44));
        var foundation_2 = __webpack_require__(18);
        var foundation_3 = __webpack_require__(46);
        var util = __importStar(__webpack_require__(43));
        var cssClasses = foundation_2.MDCDismissibleDrawerFoundation.cssClasses, strings = foundation_2.MDCDismissibleDrawerFoundation.strings;
        var MDCDrawer = function(_super) {
            __extends(MDCDrawer, _super);
            function MDCDrawer() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            MDCDrawer.attachTo = function(root) {
                return new MDCDrawer(root);
            };
            Object.defineProperty(MDCDrawer.prototype, "open", {
                get: function get() {
                    return this.foundation_.isOpen();
                },
                set: function set(isOpen) {
                    if (isOpen) {
                        this.foundation_.open();
                    } else {
                        this.foundation_.close();
                    }
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MDCDrawer.prototype, "list", {
                get: function get() {
                    return this.list_;
                },
                enumerable: true,
                configurable: true
            });
            MDCDrawer.prototype.initialize = function(focusTrapFactory, listFactory) {
                if (focusTrapFactory === void 0) {
                    focusTrapFactory = focus_trap_1.default;
                }
                if (listFactory === void 0) {
                    listFactory = function listFactory(el) {
                        return new component_2.MDCList(el);
                    };
                }
                var listEl = this.root_.querySelector("." + foundation_1.MDCListFoundation.cssClasses.ROOT);
                if (listEl) {
                    this.list_ = listFactory(listEl);
                    this.list_.wrapFocus = true;
                }
                this.focusTrapFactory_ = focusTrapFactory;
            };
            MDCDrawer.prototype.initialSyncWithDOM = function() {
                var _this = this;
                var MODAL = cssClasses.MODAL;
                var SCRIM_SELECTOR = strings.SCRIM_SELECTOR;
                this.scrim_ = this.root_.parentNode.querySelector(SCRIM_SELECTOR);
                if (this.scrim_ && this.root_.classList.contains(MODAL)) {
                    this.handleScrimClick_ = function() {
                        return _this.foundation_.handleScrimClick();
                    };
                    this.scrim_.addEventListener("click", this.handleScrimClick_);
                    this.focusTrap_ = util.createFocusTrapInstance(this.root_, this.focusTrapFactory_);
                }
                this.handleKeydown_ = function(evt) {
                    return _this.foundation_.handleKeydown(evt);
                };
                this.handleTransitionEnd_ = function(evt) {
                    return _this.foundation_.handleTransitionEnd(evt);
                };
                this.listen("keydown", this.handleKeydown_);
                this.listen("transitionend", this.handleTransitionEnd_);
            };
            MDCDrawer.prototype.destroy = function() {
                this.unlisten("keydown", this.handleKeydown_);
                this.unlisten("transitionend", this.handleTransitionEnd_);
                if (this.list_) {
                    this.list_.destroy();
                }
                var MODAL = cssClasses.MODAL;
                if (this.scrim_ && this.handleScrimClick_ && this.root_.classList.contains(MODAL)) {
                    this.scrim_.removeEventListener("click", this.handleScrimClick_);
                    this.open = false;
                }
            };
            MDCDrawer.prototype.getDefaultFoundation = function() {
                var _this = this;
                var adapter = {
                    addClass: function addClass(className) {
                        return _this.root_.classList.add(className);
                    },
                    removeClass: function removeClass(className) {
                        return _this.root_.classList.remove(className);
                    },
                    hasClass: function hasClass(className) {
                        return _this.root_.classList.contains(className);
                    },
                    elementHasClass: function elementHasClass(element, className) {
                        return element.classList.contains(className);
                    },
                    saveFocus: function saveFocus() {
                        return _this.previousFocus_ = document.activeElement;
                    },
                    restoreFocus: function restoreFocus() {
                        var previousFocus = _this.previousFocus_;
                        if (previousFocus && previousFocus.focus && _this.root_.contains(document.activeElement)) {
                            previousFocus.focus();
                        }
                    },
                    focusActiveNavigationItem: function focusActiveNavigationItem() {
                        var activeNavItemEl = _this.root_.querySelector("." + foundation_1.MDCListFoundation.cssClasses.LIST_ITEM_ACTIVATED_CLASS);
                        if (activeNavItemEl) {
                            activeNavItemEl.focus();
                        }
                    },
                    notifyClose: function notifyClose() {
                        return _this.emit(strings.CLOSE_EVENT, {}, true);
                    },
                    notifyOpen: function notifyOpen() {
                        return _this.emit(strings.OPEN_EVENT, {}, true);
                    },
                    trapFocus: function trapFocus() {
                        return _this.focusTrap_.activate();
                    },
                    releaseFocus: function releaseFocus() {
                        return _this.focusTrap_.deactivate();
                    }
                };
                var DISMISSIBLE = cssClasses.DISMISSIBLE, MODAL = cssClasses.MODAL;
                if (this.root_.classList.contains(DISMISSIBLE)) {
                    return new foundation_2.MDCDismissibleDrawerFoundation(adapter);
                } else if (this.root_.classList.contains(MODAL)) {
                    return new foundation_3.MDCModalDrawerFoundation(adapter);
                } else {
                    throw new Error("MDCDrawer: Failed to instantiate component. Supported variants are " + DISMISSIBLE + " and " + MODAL + ".");
                }
            };
            return MDCDrawer;
        }(component_1.MDCComponent);
        exports.MDCDrawer = MDCDrawer;
    }, function(module, exports, __webpack_require__) {
        "use strict";
        function __export(m) {
            for (var p in m) {
                if (!exports.hasOwnProperty(p)) exports[p] = m[p];
            }
        }
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        __export(__webpack_require__(19));
        __export(__webpack_require__(47));
        __export(__webpack_require__(20));
    }, function(module, exports, __webpack_require__) {
        "use strict";
        function __export(m) {
            for (var p in m) {
                if (!exports.hasOwnProperty(p)) exports[p] = m[p];
            }
        }
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        __export(__webpack_require__(122));
        __export(__webpack_require__(49));
        __export(__webpack_require__(48));
    }, function(module, exports, __webpack_require__) {
        "use strict";
        var __extends = this && this.__extends || function() {
            var _extendStatics = function extendStatics(d, b) {
                _extendStatics = Object.setPrototypeOf || {
                    __proto__: []
                } instanceof Array && function(d, b) {
                    d.__proto__ = b;
                } || function(d, b) {
                    for (var p in b) {
                        if (b.hasOwnProperty(p)) d[p] = b[p];
                    }
                };
                return _extendStatics(d, b);
            };
            return function(d, b) {
                _extendStatics(d, b);
                function __() {
                    this.constructor = d;
                }
                d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
            };
        }();
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var component_1 = __webpack_require__(1);
        var foundation_1 = __webpack_require__(48);
        var MDCFormField = function(_super) {
            __extends(MDCFormField, _super);
            function MDCFormField() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            MDCFormField.attachTo = function(root) {
                return new MDCFormField(root);
            };
            Object.defineProperty(MDCFormField.prototype, "input", {
                get: function get() {
                    return this.input_;
                },
                set: function set(input) {
                    this.input_ = input;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MDCFormField.prototype, "label_", {
                get: function get() {
                    var LABEL_SELECTOR = foundation_1.MDCFormFieldFoundation.strings.LABEL_SELECTOR;
                    return this.root_.querySelector(LABEL_SELECTOR);
                },
                enumerable: true,
                configurable: true
            });
            MDCFormField.prototype.getDefaultFoundation = function() {
                var _this = this;
                var adapter = {
                    activateInputRipple: function activateInputRipple() {
                        if (_this.input_ && _this.input_.ripple) {
                            _this.input_.ripple.activate();
                        }
                    },
                    deactivateInputRipple: function deactivateInputRipple() {
                        if (_this.input_ && _this.input_.ripple) {
                            _this.input_.ripple.deactivate();
                        }
                    },
                    deregisterInteractionHandler: function deregisterInteractionHandler(evtType, handler) {
                        if (_this.label_) {
                            _this.label_.removeEventListener(evtType, handler);
                        }
                    },
                    registerInteractionHandler: function registerInteractionHandler(evtType, handler) {
                        if (_this.label_) {
                            _this.label_.addEventListener(evtType, handler);
                        }
                    }
                };
                return new foundation_1.MDCFormFieldFoundation(adapter);
            };
            return MDCFormField;
        }(component_1.MDCComponent);
        exports.MDCFormField = MDCFormField;
    }, function(module, exports, __webpack_require__) {
        "use strict";
        function __export(m) {
            for (var p in m) {
                if (!exports.hasOwnProperty(p)) exports[p] = m[p];
            }
        }
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        __export(__webpack_require__(124));
        __export(__webpack_require__(51));
        __export(__webpack_require__(50));
    }, function(module, exports, __webpack_require__) {
        "use strict";
        var __extends = this && this.__extends || function() {
            var _extendStatics = function extendStatics(d, b) {
                _extendStatics = Object.setPrototypeOf || {
                    __proto__: []
                } instanceof Array && function(d, b) {
                    d.__proto__ = b;
                } || function(d, b) {
                    for (var p in b) {
                        if (b.hasOwnProperty(p)) d[p] = b[p];
                    }
                };
                return _extendStatics(d, b);
            };
            return function(d, b) {
                _extendStatics(d, b);
                function __() {
                    this.constructor = d;
                }
                d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
            };
        }();
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var component_1 = __webpack_require__(1);
        var foundation_1 = __webpack_require__(50);
        var MDCGridList = function(_super) {
            __extends(MDCGridList, _super);
            function MDCGridList() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            MDCGridList.attachTo = function(root) {
                return new MDCGridList(root);
            };
            MDCGridList.prototype.getDefaultFoundation = function() {
                var _this = this;
                var adapter = {
                    deregisterResizeHandler: function deregisterResizeHandler(handler) {
                        return window.removeEventListener("resize", handler);
                    },
                    getNumberOfTiles: function getNumberOfTiles() {
                        return _this.root_.querySelectorAll(foundation_1.MDCGridListFoundation.strings.TILE_SELECTOR).length;
                    },
                    getOffsetWidth: function getOffsetWidth() {
                        return _this.root_.offsetWidth;
                    },
                    getOffsetWidthForTileAtIndex: function getOffsetWidthForTileAtIndex(index) {
                        var tileEl = _this.root_.querySelectorAll(foundation_1.MDCGridListFoundation.strings.TILE_SELECTOR)[index];
                        return tileEl.offsetWidth;
                    },
                    registerResizeHandler: function registerResizeHandler(handler) {
                        return window.addEventListener("resize", handler);
                    },
                    setStyleForTilesElement: function setStyleForTilesElement(property, value) {
                        var tilesEl = _this.root_.querySelector(foundation_1.MDCGridListFoundation.strings.TILES_SELECTOR);
                        tilesEl.style[property] = value;
                    }
                };
                return new foundation_1.MDCGridListFoundation(adapter);
            };
            return MDCGridList;
        }(component_1.MDCComponent);
        exports.MDCGridList = MDCGridList;
    }, function(module, exports, __webpack_require__) {
        "use strict";
        function __export(m) {
            for (var p in m) {
                if (!exports.hasOwnProperty(p)) exports[p] = m[p];
            }
        }
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        __export(__webpack_require__(126));
        __export(__webpack_require__(53));
        __export(__webpack_require__(52));
    }, function(module, exports, __webpack_require__) {
        "use strict";
        var __extends = this && this.__extends || function() {
            var _extendStatics = function extendStatics(d, b) {
                _extendStatics = Object.setPrototypeOf || {
                    __proto__: []
                } instanceof Array && function(d, b) {
                    d.__proto__ = b;
                } || function(d, b) {
                    for (var p in b) {
                        if (b.hasOwnProperty(p)) d[p] = b[p];
                    }
                };
                return _extendStatics(d, b);
            };
            return function(d, b) {
                _extendStatics(d, b);
                function __() {
                    this.constructor = d;
                }
                d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
            };
        }();
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var component_1 = __webpack_require__(1);
        var component_2 = __webpack_require__(2);
        var foundation_1 = __webpack_require__(52);
        var strings = foundation_1.MDCIconButtonToggleFoundation.strings;
        var MDCIconButtonToggle = function(_super) {
            __extends(MDCIconButtonToggle, _super);
            function MDCIconButtonToggle() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.ripple_ = _this.createRipple_();
                return _this;
            }
            MDCIconButtonToggle.attachTo = function(root) {
                return new MDCIconButtonToggle(root);
            };
            MDCIconButtonToggle.prototype.initialSyncWithDOM = function() {
                var _this = this;
                this.handleClick_ = function() {
                    return _this.foundation_.handleClick();
                };
                this.listen("click", this.handleClick_);
            };
            MDCIconButtonToggle.prototype.destroy = function() {
                this.unlisten("click", this.handleClick_);
                this.ripple_.destroy();
                _super.prototype.destroy.call(this);
            };
            MDCIconButtonToggle.prototype.getDefaultFoundation = function() {
                var _this = this;
                var adapter = {
                    addClass: function addClass(className) {
                        return _this.root_.classList.add(className);
                    },
                    hasClass: function hasClass(className) {
                        return _this.root_.classList.contains(className);
                    },
                    notifyChange: function notifyChange(evtData) {
                        return _this.emit(strings.CHANGE_EVENT, evtData);
                    },
                    removeClass: function removeClass(className) {
                        return _this.root_.classList.remove(className);
                    },
                    setAttr: function setAttr(attrName, attrValue) {
                        return _this.root_.setAttribute(attrName, attrValue);
                    }
                };
                return new foundation_1.MDCIconButtonToggleFoundation(adapter);
            };
            Object.defineProperty(MDCIconButtonToggle.prototype, "ripple", {
                get: function get() {
                    return this.ripple_;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MDCIconButtonToggle.prototype, "on", {
                get: function get() {
                    return this.foundation_.isOn();
                },
                set: function set(isOn) {
                    this.foundation_.toggle(isOn);
                },
                enumerable: true,
                configurable: true
            });
            MDCIconButtonToggle.prototype.createRipple_ = function() {
                var ripple = new component_2.MDCRipple(this.root_);
                ripple.unbounded = true;
                return ripple;
            };
            return MDCIconButtonToggle;
        }(component_1.MDCComponent);
        exports.MDCIconButtonToggle = MDCIconButtonToggle;
    }, function(module, exports, __webpack_require__) {
        "use strict";
        function __export(m) {
            for (var p in m) {
                if (!exports.hasOwnProperty(p)) exports[p] = m[p];
            }
        }
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        __export(__webpack_require__(21));
        __export(__webpack_require__(55));
        __export(__webpack_require__(54));
    }, function(module, exports, __webpack_require__) {
        "use strict";
        function __export(m) {
            for (var p in m) {
                if (!exports.hasOwnProperty(p)) exports[p] = m[p];
            }
        }
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        __export(__webpack_require__(129));
        __export(__webpack_require__(57));
        __export(__webpack_require__(56));
    }, function(module, exports, __webpack_require__) {
        "use strict";
        var __extends = this && this.__extends || function() {
            var _extendStatics = function extendStatics(d, b) {
                _extendStatics = Object.setPrototypeOf || {
                    __proto__: []
                } instanceof Array && function(d, b) {
                    d.__proto__ = b;
                } || function(d, b) {
                    for (var p in b) {
                        if (b.hasOwnProperty(p)) d[p] = b[p];
                    }
                };
                return _extendStatics(d, b);
            };
            return function(d, b) {
                _extendStatics(d, b);
                function __() {
                    this.constructor = d;
                }
                d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
            };
        }();
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var component_1 = __webpack_require__(1);
        var foundation_1 = __webpack_require__(56);
        var MDCLinearProgress = function(_super) {
            __extends(MDCLinearProgress, _super);
            function MDCLinearProgress() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            MDCLinearProgress.attachTo = function(root) {
                return new MDCLinearProgress(root);
            };
            Object.defineProperty(MDCLinearProgress.prototype, "determinate", {
                set: function set(value) {
                    this.foundation_.setDeterminate(value);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MDCLinearProgress.prototype, "progress", {
                set: function set(value) {
                    this.foundation_.setProgress(value);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MDCLinearProgress.prototype, "buffer", {
                set: function set(value) {
                    this.foundation_.setBuffer(value);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MDCLinearProgress.prototype, "reverse", {
                set: function set(value) {
                    this.foundation_.setReverse(value);
                },
                enumerable: true,
                configurable: true
            });
            MDCLinearProgress.prototype.open = function() {
                this.foundation_.open();
            };
            MDCLinearProgress.prototype.close = function() {
                this.foundation_.close();
            };
            MDCLinearProgress.prototype.getDefaultFoundation = function() {
                var _this = this;
                var adapter = {
                    addClass: function addClass(className) {
                        return _this.root_.classList.add(className);
                    },
                    getBuffer: function getBuffer() {
                        return _this.root_.querySelector(foundation_1.MDCLinearProgressFoundation.strings.BUFFER_SELECTOR);
                    },
                    getPrimaryBar: function getPrimaryBar() {
                        return _this.root_.querySelector(foundation_1.MDCLinearProgressFoundation.strings.PRIMARY_BAR_SELECTOR);
                    },
                    hasClass: function hasClass(className) {
                        return _this.root_.classList.contains(className);
                    },
                    removeClass: function removeClass(className) {
                        return _this.root_.classList.remove(className);
                    },
                    setStyle: function setStyle(el, styleProperty, value) {
                        return el.style.setProperty(styleProperty, value);
                    }
                };
                return new foundation_1.MDCLinearProgressFoundation(adapter);
            };
            return MDCLinearProgress;
        }(component_1.MDCComponent);
        exports.MDCLinearProgress = MDCLinearProgress;
    }, function(module, exports, __webpack_require__) {
        "use strict";
        function __export(m) {
            for (var p in m) {
                if (!exports.hasOwnProperty(p)) exports[p] = m[p];
            }
        }
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        __export(__webpack_require__(16));
        __export(__webpack_require__(17));
        __export(__webpack_require__(7));
    }, function(module, exports, __webpack_require__) {
        "use strict";
        function __export(m) {
            for (var p in m) {
                if (!exports.hasOwnProperty(p)) exports[p] = m[p];
            }
        }
        var __importStar = this && this.__importStar || function(mod) {
            if (mod && mod.__esModule) return mod;
            var result = {};
            if (mod != null) for (var k in mod) {
                if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
            }
            result["default"] = mod;
            return result;
        };
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var util = __importStar(__webpack_require__(58));
        exports.util = util;
        var constants_1 = __webpack_require__(5);
        exports.Corner = constants_1.Corner;
        exports.CornerBit = constants_1.CornerBit;
        __export(__webpack_require__(59));
        __export(__webpack_require__(5));
        __export(__webpack_require__(8));
    }, function(module, exports, __webpack_require__) {
        "use strict";
        function __export(m) {
            for (var p in m) {
                if (!exports.hasOwnProperty(p)) exports[p] = m[p];
            }
        }
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var constants_1 = __webpack_require__(5);
        exports.Corner = constants_1.Corner;
        __export(__webpack_require__(60));
        __export(__webpack_require__(9));
        __export(__webpack_require__(61));
    }, function(module, exports, __webpack_require__) {
        "use strict";
        function __export(m) {
            for (var p in m) {
                if (!exports.hasOwnProperty(p)) exports[p] = m[p];
            }
        }
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        __export(__webpack_require__(22));
        __export(__webpack_require__(23));
        __export(__webpack_require__(62));
    }, function(module, exports, __webpack_require__) {
        "use strict";
        function __export(m) {
            for (var p in m) {
                if (!exports.hasOwnProperty(p)) exports[p] = m[p];
            }
        }
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        __export(__webpack_require__(135));
        __export(__webpack_require__(64));
        __export(__webpack_require__(63));
    }, function(module, exports, __webpack_require__) {
        "use strict";
        var __extends = this && this.__extends || function() {
            var _extendStatics = function extendStatics(d, b) {
                _extendStatics = Object.setPrototypeOf || {
                    __proto__: []
                } instanceof Array && function(d, b) {
                    d.__proto__ = b;
                } || function(d, b) {
                    for (var p in b) {
                        if (b.hasOwnProperty(p)) d[p] = b[p];
                    }
                };
                return _extendStatics(d, b);
            };
            return function(d, b) {
                _extendStatics(d, b);
                function __() {
                    this.constructor = d;
                }
                d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
            };
        }();
        var __assign = this && this.__assign || function() {
            __assign = Object.assign || function(t) {
                for (var s, i = 1, n = arguments.length; i < n; i++) {
                    s = arguments[i];
                    for (var p in s) {
                        if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
                    }
                }
                return t;
            };
            return __assign.apply(this, arguments);
        };
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var component_1 = __webpack_require__(1);
        var component_2 = __webpack_require__(2);
        var foundation_1 = __webpack_require__(4);
        var foundation_2 = __webpack_require__(63);
        var MDCRadio = function(_super) {
            __extends(MDCRadio, _super);
            function MDCRadio() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.ripple_ = _this.createRipple_();
                return _this;
            }
            MDCRadio.attachTo = function(root) {
                return new MDCRadio(root);
            };
            Object.defineProperty(MDCRadio.prototype, "checked", {
                get: function get() {
                    return this.nativeControl_.checked;
                },
                set: function set(checked) {
                    this.nativeControl_.checked = checked;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MDCRadio.prototype, "disabled", {
                get: function get() {
                    return this.nativeControl_.disabled;
                },
                set: function set(disabled) {
                    this.foundation_.setDisabled(disabled);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MDCRadio.prototype, "value", {
                get: function get() {
                    return this.nativeControl_.value;
                },
                set: function set(value) {
                    this.nativeControl_.value = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MDCRadio.prototype, "ripple", {
                get: function get() {
                    return this.ripple_;
                },
                enumerable: true,
                configurable: true
            });
            MDCRadio.prototype.destroy = function() {
                this.ripple_.destroy();
                _super.prototype.destroy.call(this);
            };
            MDCRadio.prototype.getDefaultFoundation = function() {
                var _this = this;
                var adapter = {
                    addClass: function addClass(className) {
                        return _this.root_.classList.add(className);
                    },
                    removeClass: function removeClass(className) {
                        return _this.root_.classList.remove(className);
                    },
                    setNativeControlDisabled: function setNativeControlDisabled(disabled) {
                        return _this.nativeControl_.disabled = disabled;
                    }
                };
                return new foundation_2.MDCRadioFoundation(adapter);
            };
            MDCRadio.prototype.createRipple_ = function() {
                var _this = this;
                var adapter = __assign({}, component_2.MDCRipple.createAdapter(this), {
                    registerInteractionHandler: function registerInteractionHandler(evtType, handler) {
                        return _this.nativeControl_.addEventListener(evtType, handler);
                    },
                    deregisterInteractionHandler: function deregisterInteractionHandler(evtType, handler) {
                        return _this.nativeControl_.removeEventListener(evtType, handler);
                    },
                    isSurfaceActive: function isSurfaceActive() {
                        return false;
                    },
                    isUnbounded: function isUnbounded() {
                        return true;
                    }
                });
                return new component_2.MDCRipple(this.root_, new foundation_1.MDCRippleFoundation(adapter));
            };
            Object.defineProperty(MDCRadio.prototype, "nativeControl_", {
                get: function get() {
                    var NATIVE_CONTROL_SELECTOR = foundation_2.MDCRadioFoundation.strings.NATIVE_CONTROL_SELECTOR;
                    var el = this.root_.querySelector(NATIVE_CONTROL_SELECTOR);
                    if (!el) {
                        throw new Error("Radio component requires a " + NATIVE_CONTROL_SELECTOR + " element");
                    }
                    return el;
                },
                enumerable: true,
                configurable: true
            });
            return MDCRadio;
        }(component_1.MDCComponent);
        exports.MDCRadio = MDCRadio;
    }, function(module, exports, __webpack_require__) {
        "use strict";
        function __export(m) {
            for (var p in m) {
                if (!exports.hasOwnProperty(p)) exports[p] = m[p];
            }
        }
        var __importStar = this && this.__importStar || function(mod) {
            if (mod && mod.__esModule) return mod;
            var result = {};
            if (mod != null) for (var k in mod) {
                if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
            }
            result["default"] = mod;
            return result;
        };
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var util = __importStar(__webpack_require__(13));
        exports.util = util;
        __export(__webpack_require__(2));
        __export(__webpack_require__(34));
        __export(__webpack_require__(4));
    }, function(module, exports, __webpack_require__) {
        "use strict";
        function __export(m) {
            for (var p in m) {
                if (!exports.hasOwnProperty(p)) exports[p] = m[p];
            }
        }
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        __export(__webpack_require__(138));
        __export(__webpack_require__(24));
        __export(__webpack_require__(65));
        __export(__webpack_require__(139));
        __export(__webpack_require__(140));
    }, function(module, exports, __webpack_require__) {
        "use strict";
        var __extends = this && this.__extends || function() {
            var _extendStatics = function extendStatics(d, b) {
                _extendStatics = Object.setPrototypeOf || {
                    __proto__: []
                } instanceof Array && function(d, b) {
                    d.__proto__ = b;
                } || function(d, b) {
                    for (var p in b) {
                        if (b.hasOwnProperty(p)) d[p] = b[p];
                    }
                };
                return _extendStatics(d, b);
            };
            return function(d, b) {
                _extendStatics(d, b);
                function __() {
                    this.constructor = d;
                }
                d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
            };
        }();
        var __assign = this && this.__assign || function() {
            __assign = Object.assign || function(t) {
                for (var s, i = 1, n = arguments.length; i < n; i++) {
                    s = arguments[i];
                    for (var p in s) {
                        if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
                    }
                }
                return t;
            };
            return __assign.apply(this, arguments);
        };
        var __importStar = this && this.__importStar || function(mod) {
            if (mod && mod.__esModule) return mod;
            var result = {};
            if (mod != null) for (var k in mod) {
                if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
            }
            result["default"] = mod;
            return result;
        };
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var component_1 = __webpack_require__(1);
        var component_2 = __webpack_require__(19);
        var component_3 = __webpack_require__(21);
        var menuSurfaceConstants = __importStar(__webpack_require__(5));
        var component_4 = __webpack_require__(60);
        var menuConstants = __importStar(__webpack_require__(9));
        var component_5 = __webpack_require__(22);
        var component_6 = __webpack_require__(2);
        var foundation_1 = __webpack_require__(4);
        var constants_1 = __webpack_require__(24);
        var foundation_2 = __webpack_require__(65);
        var component_7 = __webpack_require__(66);
        var component_8 = __webpack_require__(69);
        var VALIDATION_ATTR_WHITELIST = [ "required", "aria-required" ];
        var MDCSelect = function(_super) {
            __extends(MDCSelect, _super);
            function MDCSelect() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            MDCSelect.attachTo = function(root) {
                return new MDCSelect(root);
            };
            MDCSelect.prototype.initialize = function(labelFactory, lineRippleFactory, outlineFactory, menuFactory, iconFactory, helperTextFactory) {
                if (labelFactory === void 0) {
                    labelFactory = function labelFactory(el) {
                        return new component_2.MDCFloatingLabel(el);
                    };
                }
                if (lineRippleFactory === void 0) {
                    lineRippleFactory = function lineRippleFactory(el) {
                        return new component_3.MDCLineRipple(el);
                    };
                }
                if (outlineFactory === void 0) {
                    outlineFactory = function outlineFactory(el) {
                        return new component_5.MDCNotchedOutline(el);
                    };
                }
                if (menuFactory === void 0) {
                    menuFactory = function menuFactory(el) {
                        return new component_4.MDCMenu(el);
                    };
                }
                if (iconFactory === void 0) {
                    iconFactory = function iconFactory(el) {
                        return new component_8.MDCSelectIcon(el);
                    };
                }
                if (helperTextFactory === void 0) {
                    helperTextFactory = function helperTextFactory(el) {
                        return new component_7.MDCSelectHelperText(el);
                    };
                }
                this.isMenuOpen_ = false;
                this.nativeControl_ = this.root_.querySelector(constants_1.strings.NATIVE_CONTROL_SELECTOR);
                this.selectedText_ = this.root_.querySelector(constants_1.strings.SELECTED_TEXT_SELECTOR);
                var targetElement = this.nativeControl_ || this.selectedText_;
                if (!targetElement) {
                    throw new Error("MDCSelect: Missing required element: Exactly one of the following selectors must be present: " + ("'" + constants_1.strings.NATIVE_CONTROL_SELECTOR + "' or '" + constants_1.strings.SELECTED_TEXT_SELECTOR + "'"));
                }
                this.targetElement_ = targetElement;
                if (this.targetElement_.hasAttribute(constants_1.strings.ARIA_CONTROLS)) {
                    var helperTextElement = document.getElementById(this.targetElement_.getAttribute(constants_1.strings.ARIA_CONTROLS));
                    if (helperTextElement) {
                        this.helperText_ = helperTextFactory(helperTextElement);
                    }
                }
                if (this.selectedText_) {
                    this.enhancedSelectSetup_(menuFactory);
                }
                var labelElement = this.root_.querySelector(constants_1.strings.LABEL_SELECTOR);
                this.label_ = labelElement ? labelFactory(labelElement) : null;
                var lineRippleElement = this.root_.querySelector(constants_1.strings.LINE_RIPPLE_SELECTOR);
                this.lineRipple_ = lineRippleElement ? lineRippleFactory(lineRippleElement) : null;
                var outlineElement = this.root_.querySelector(constants_1.strings.OUTLINE_SELECTOR);
                this.outline_ = outlineElement ? outlineFactory(outlineElement) : null;
                var leadingIcon = this.root_.querySelector(constants_1.strings.LEADING_ICON_SELECTOR);
                if (leadingIcon) {
                    this.root_.classList.add(constants_1.cssClasses.WITH_LEADING_ICON);
                    this.leadingIcon_ = iconFactory(leadingIcon);
                    if (this.menuElement_) {
                        this.menuElement_.classList.add(constants_1.cssClasses.WITH_LEADING_ICON);
                    }
                }
                if (!this.root_.classList.contains(constants_1.cssClasses.OUTLINED)) {
                    this.ripple = this.createRipple_();
                }
                this.initialSyncRequiredState_();
                this.addMutationObserverForRequired_();
            };
            MDCSelect.prototype.initialSyncWithDOM = function() {
                var _this = this;
                this.handleChange_ = function() {
                    return _this.foundation_.handleChange(true);
                };
                this.handleFocus_ = function() {
                    return _this.foundation_.handleFocus();
                };
                this.handleBlur_ = function() {
                    return _this.foundation_.handleBlur();
                };
                this.handleClick_ = function(evt) {
                    if (_this.selectedText_) {
                        _this.selectedText_.focus();
                    }
                    _this.foundation_.handleClick(_this.getNormalizedXCoordinate_(evt));
                };
                this.handleKeydown_ = function(evt) {
                    return _this.foundation_.handleKeydown(evt);
                };
                this.handleMenuSelected_ = function(evtData) {
                    return _this.selectedIndex = evtData.detail.index;
                };
                this.handleMenuOpened_ = function() {
                    _this.foundation_.handleMenuOpened();
                    if (_this.menu_.items.length === 0) {
                        return;
                    }
                    var focusItemIndex = _this.selectedIndex >= 0 ? _this.selectedIndex : 0;
                    var focusItemEl = _this.menu_.items[focusItemIndex];
                    focusItemEl.focus();
                };
                this.handleMenuClosed_ = function() {
                    _this.foundation_.handleMenuClosed();
                    _this.isMenuOpen_ = false;
                    _this.selectedText_.removeAttribute("aria-expanded");
                    if (document.activeElement !== _this.selectedText_) {
                        _this.foundation_.handleBlur();
                    }
                };
                this.targetElement_.addEventListener("change", this.handleChange_);
                this.targetElement_.addEventListener("focus", this.handleFocus_);
                this.targetElement_.addEventListener("blur", this.handleBlur_);
                this.targetElement_.addEventListener("click", this.handleClick_);
                if (this.menuElement_) {
                    this.selectedText_.addEventListener("keydown", this.handleKeydown_);
                    this.menu_.listen(menuSurfaceConstants.strings.CLOSED_EVENT, this.handleMenuClosed_);
                    this.menu_.listen(menuSurfaceConstants.strings.OPENED_EVENT, this.handleMenuOpened_);
                    this.menu_.listen(menuConstants.strings.SELECTED_EVENT, this.handleMenuSelected_);
                    if (this.hiddenInput_ && this.hiddenInput_.value) {
                        var enhancedAdapterMethods = this.getEnhancedSelectAdapterMethods_();
                        enhancedAdapterMethods.setValue(this.hiddenInput_.value);
                    } else if (this.menuElement_.querySelector(constants_1.strings.SELECTED_ITEM_SELECTOR)) {
                        var enhancedAdapterMethods = this.getEnhancedSelectAdapterMethods_();
                        enhancedAdapterMethods.setValue(enhancedAdapterMethods.getValue());
                    }
                }
                this.foundation_.handleChange(false);
                if (this.root_.classList.contains(constants_1.cssClasses.DISABLED) || this.nativeControl_ && this.nativeControl_.disabled) {
                    this.disabled = true;
                }
            };
            MDCSelect.prototype.destroy = function() {
                this.targetElement_.removeEventListener("change", this.handleChange_);
                this.targetElement_.removeEventListener("focus", this.handleFocus_);
                this.targetElement_.removeEventListener("blur", this.handleBlur_);
                this.targetElement_.removeEventListener("keydown", this.handleKeydown_);
                this.targetElement_.removeEventListener("click", this.handleClick_);
                if (this.menu_) {
                    this.menu_.unlisten(menuSurfaceConstants.strings.CLOSED_EVENT, this.handleMenuClosed_);
                    this.menu_.unlisten(menuSurfaceConstants.strings.OPENED_EVENT, this.handleMenuOpened_);
                    this.menu_.unlisten(menuConstants.strings.SELECTED_EVENT, this.handleMenuSelected_);
                    this.menu_.destroy();
                }
                if (this.ripple) {
                    this.ripple.destroy();
                }
                if (this.outline_) {
                    this.outline_.destroy();
                }
                if (this.leadingIcon_) {
                    this.leadingIcon_.destroy();
                }
                if (this.helperText_) {
                    this.helperText_.destroy();
                }
                if (this.validationObserver_) {
                    this.validationObserver_.disconnect();
                }
                _super.prototype.destroy.call(this);
            };
            Object.defineProperty(MDCSelect.prototype, "value", {
                get: function get() {
                    return this.foundation_.getValue();
                },
                set: function set(value) {
                    this.foundation_.setValue(value);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MDCSelect.prototype, "selectedIndex", {
                get: function get() {
                    var selectedIndex = -1;
                    if (this.menuElement_ && this.menu_) {
                        var selectedEl = this.menuElement_.querySelector(constants_1.strings.SELECTED_ITEM_SELECTOR);
                        selectedIndex = this.menu_.items.indexOf(selectedEl);
                    } else if (this.nativeControl_) {
                        selectedIndex = this.nativeControl_.selectedIndex;
                    }
                    return selectedIndex;
                },
                set: function set(selectedIndex) {
                    this.foundation_.setSelectedIndex(selectedIndex);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MDCSelect.prototype, "disabled", {
                get: function get() {
                    return this.root_.classList.contains(constants_1.cssClasses.DISABLED) || (this.nativeControl_ ? this.nativeControl_.disabled : false);
                },
                set: function set(disabled) {
                    this.foundation_.setDisabled(disabled);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MDCSelect.prototype, "leadingIconAriaLabel", {
                set: function set(label) {
                    this.foundation_.setLeadingIconAriaLabel(label);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MDCSelect.prototype, "leadingIconContent", {
                set: function set(content) {
                    this.foundation_.setLeadingIconContent(content);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MDCSelect.prototype, "helperTextContent", {
                set: function set(content) {
                    this.foundation_.setHelperTextContent(content);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MDCSelect.prototype, "valid", {
                get: function get() {
                    return this.foundation_.isValid();
                },
                set: function set(isValid) {
                    this.foundation_.setValid(isValid);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MDCSelect.prototype, "required", {
                get: function get() {
                    if (this.nativeControl_) {
                        return this.nativeControl_.required;
                    } else {
                        return this.selectedText_.getAttribute("aria-required") === "true";
                    }
                },
                set: function set(isRequired) {
                    if (this.nativeControl_) {
                        this.nativeControl_.required = isRequired;
                    } else {
                        if (isRequired) {
                            this.selectedText_.setAttribute("aria-required", isRequired.toString());
                        } else {
                            this.selectedText_.removeAttribute("aria-required");
                        }
                    }
                },
                enumerable: true,
                configurable: true
            });
            MDCSelect.prototype.layout = function() {
                this.foundation_.layout();
            };
            MDCSelect.prototype.getDefaultFoundation = function() {
                var adapter = __assign({}, this.nativeControl_ ? this.getNativeSelectAdapterMethods_() : this.getEnhancedSelectAdapterMethods_(), this.getCommonAdapterMethods_(), this.getOutlineAdapterMethods_(), this.getLabelAdapterMethods_());
                return new foundation_2.MDCSelectFoundation(adapter, this.getFoundationMap_());
            };
            MDCSelect.prototype.enhancedSelectSetup_ = function(menuFactory) {
                var isDisabled = this.root_.classList.contains(constants_1.cssClasses.DISABLED);
                this.selectedText_.setAttribute("tabindex", isDisabled ? "-1" : "0");
                this.hiddenInput_ = this.root_.querySelector(constants_1.strings.HIDDEN_INPUT_SELECTOR);
                this.menuElement_ = this.root_.querySelector(constants_1.strings.MENU_SELECTOR);
                this.menu_ = menuFactory(this.menuElement_);
                this.menu_.hoistMenuToBody();
                this.menu_.setAnchorElement(this.root_);
                this.menu_.setAnchorCorner(menuSurfaceConstants.Corner.BOTTOM_START);
                this.menu_.wrapFocus = false;
            };
            MDCSelect.prototype.createRipple_ = function() {
                var _this = this;
                var adapter = __assign({}, component_6.MDCRipple.createAdapter(this), {
                    registerInteractionHandler: function registerInteractionHandler(evtType, handler) {
                        return _this.targetElement_.addEventListener(evtType, handler);
                    },
                    deregisterInteractionHandler: function deregisterInteractionHandler(evtType, handler) {
                        return _this.targetElement_.removeEventListener(evtType, handler);
                    }
                });
                return new component_6.MDCRipple(this.root_, new foundation_1.MDCRippleFoundation(adapter));
            };
            MDCSelect.prototype.getNativeSelectAdapterMethods_ = function() {
                var _this = this;
                return {
                    getValue: function getValue() {
                        return _this.nativeControl_.value;
                    },
                    setValue: function setValue(value) {
                        _this.nativeControl_.value = value;
                    },
                    openMenu: function openMenu() {
                        return undefined;
                    },
                    closeMenu: function closeMenu() {
                        return undefined;
                    },
                    isMenuOpen: function isMenuOpen() {
                        return false;
                    },
                    setSelectedIndex: function setSelectedIndex(index) {
                        _this.nativeControl_.selectedIndex = index;
                    },
                    setDisabled: function setDisabled(isDisabled) {
                        _this.nativeControl_.disabled = isDisabled;
                    },
                    setValid: function setValid(isValid) {
                        if (isValid) {
                            _this.root_.classList.remove(constants_1.cssClasses.INVALID);
                        } else {
                            _this.root_.classList.add(constants_1.cssClasses.INVALID);
                        }
                    },
                    checkValidity: function checkValidity() {
                        return _this.nativeControl_.checkValidity();
                    }
                };
            };
            MDCSelect.prototype.getEnhancedSelectAdapterMethods_ = function() {
                var _this = this;
                return {
                    getValue: function getValue() {
                        var listItem = _this.menuElement_.querySelector(constants_1.strings.SELECTED_ITEM_SELECTOR);
                        if (listItem && listItem.hasAttribute(constants_1.strings.ENHANCED_VALUE_ATTR)) {
                            return listItem.getAttribute(constants_1.strings.ENHANCED_VALUE_ATTR) || "";
                        }
                        return "";
                    },
                    setValue: function setValue(value) {
                        var element = _this.menuElement_.querySelector("[" + constants_1.strings.ENHANCED_VALUE_ATTR + '="' + value + '"]');
                        _this.setEnhancedSelectedIndex_(element ? _this.menu_.items.indexOf(element) : -1);
                    },
                    openMenu: function openMenu() {
                        if (_this.menu_ && !_this.menu_.open) {
                            _this.menu_.open = true;
                            _this.isMenuOpen_ = true;
                            _this.selectedText_.setAttribute("aria-expanded", "true");
                        }
                    },
                    closeMenu: function closeMenu() {
                        if (_this.menu_ && _this.menu_.open) {
                            _this.menu_.open = false;
                        }
                    },
                    isMenuOpen: function isMenuOpen() {
                        return Boolean(_this.menu_) && _this.isMenuOpen_;
                    },
                    setSelectedIndex: function setSelectedIndex(index) {
                        return _this.setEnhancedSelectedIndex_(index);
                    },
                    setDisabled: function setDisabled(isDisabled) {
                        _this.selectedText_.setAttribute("tabindex", isDisabled ? "-1" : "0");
                        _this.selectedText_.setAttribute("aria-disabled", isDisabled.toString());
                        if (_this.hiddenInput_) {
                            _this.hiddenInput_.disabled = isDisabled;
                        }
                    },
                    checkValidity: function checkValidity() {
                        var classList = _this.root_.classList;
                        if (classList.contains(constants_1.cssClasses.REQUIRED) && !classList.contains(constants_1.cssClasses.DISABLED)) {
                            return _this.selectedIndex !== -1 && (_this.selectedIndex !== 0 || Boolean(_this.value));
                        } else {
                            return true;
                        }
                    },
                    setValid: function setValid(isValid) {
                        _this.selectedText_.setAttribute("aria-invalid", (!isValid).toString());
                        if (isValid) {
                            _this.root_.classList.remove(constants_1.cssClasses.INVALID);
                        } else {
                            _this.root_.classList.add(constants_1.cssClasses.INVALID);
                        }
                    }
                };
            };
            MDCSelect.prototype.getCommonAdapterMethods_ = function() {
                var _this = this;
                return {
                    addClass: function addClass(className) {
                        return _this.root_.classList.add(className);
                    },
                    removeClass: function removeClass(className) {
                        return _this.root_.classList.remove(className);
                    },
                    hasClass: function hasClass(className) {
                        return _this.root_.classList.contains(className);
                    },
                    setRippleCenter: function setRippleCenter(normalizedX) {
                        return _this.lineRipple_ && _this.lineRipple_.setRippleCenter(normalizedX);
                    },
                    activateBottomLine: function activateBottomLine() {
                        return _this.lineRipple_ && _this.lineRipple_.activate();
                    },
                    deactivateBottomLine: function deactivateBottomLine() {
                        return _this.lineRipple_ && _this.lineRipple_.deactivate();
                    },
                    notifyChange: function notifyChange(value) {
                        var index = _this.selectedIndex;
                        _this.emit(constants_1.strings.CHANGE_EVENT, {
                            value: value,
                            index: index
                        }, true);
                    }
                };
            };
            MDCSelect.prototype.getOutlineAdapterMethods_ = function() {
                var _this = this;
                return {
                    hasOutline: function hasOutline() {
                        return Boolean(_this.outline_);
                    },
                    notchOutline: function notchOutline(labelWidth) {
                        return _this.outline_ && _this.outline_.notch(labelWidth);
                    },
                    closeOutline: function closeOutline() {
                        return _this.outline_ && _this.outline_.closeNotch();
                    }
                };
            };
            MDCSelect.prototype.getLabelAdapterMethods_ = function() {
                var _this = this;
                return {
                    floatLabel: function floatLabel(shouldFloat) {
                        return _this.label_ && _this.label_.float(shouldFloat);
                    },
                    getLabelWidth: function getLabelWidth() {
                        return _this.label_ ? _this.label_.getWidth() : 0;
                    }
                };
            };
            MDCSelect.prototype.getNormalizedXCoordinate_ = function(evt) {
                var targetClientRect = evt.target.getBoundingClientRect();
                var xCoordinate = this.isTouchEvent_(evt) ? evt.touches[0].clientX : evt.clientX;
                return xCoordinate - targetClientRect.left;
            };
            MDCSelect.prototype.isTouchEvent_ = function(evt) {
                return Boolean(evt.touches);
            };
            MDCSelect.prototype.getFoundationMap_ = function() {
                return {
                    helperText: this.helperText_ ? this.helperText_.foundation : undefined,
                    leadingIcon: this.leadingIcon_ ? this.leadingIcon_.foundation : undefined
                };
            };
            MDCSelect.prototype.setEnhancedSelectedIndex_ = function(index) {
                var selectedItem = this.menu_.items[index];
                this.selectedText_.textContent = selectedItem ? selectedItem.textContent.trim() : "";
                var previouslySelected = this.menuElement_.querySelector(constants_1.strings.SELECTED_ITEM_SELECTOR);
                if (previouslySelected) {
                    previouslySelected.classList.remove(constants_1.cssClasses.SELECTED_ITEM_CLASS);
                    previouslySelected.removeAttribute(constants_1.strings.ARIA_SELECTED_ATTR);
                }
                if (selectedItem) {
                    selectedItem.classList.add(constants_1.cssClasses.SELECTED_ITEM_CLASS);
                    selectedItem.setAttribute(constants_1.strings.ARIA_SELECTED_ATTR, "true");
                }
                if (this.hiddenInput_) {
                    this.hiddenInput_.value = selectedItem ? selectedItem.getAttribute(constants_1.strings.ENHANCED_VALUE_ATTR) || "" : "";
                }
                this.layout();
            };
            MDCSelect.prototype.initialSyncRequiredState_ = function() {
                var isRequired = this.targetElement_.required || this.targetElement_.getAttribute("aria-required") === "true" || this.root_.classList.contains(constants_1.cssClasses.REQUIRED);
                if (isRequired) {
                    if (this.nativeControl_) {
                        this.nativeControl_.required = true;
                    } else {
                        this.selectedText_.setAttribute("aria-required", "true");
                    }
                    this.root_.classList.add(constants_1.cssClasses.REQUIRED);
                }
            };
            MDCSelect.prototype.addMutationObserverForRequired_ = function() {
                var _this = this;
                var observerHandler = function observerHandler(attributesList) {
                    attributesList.some(function(attributeName) {
                        if (VALIDATION_ATTR_WHITELIST.indexOf(attributeName) === -1) {
                            return false;
                        }
                        if (_this.selectedText_) {
                            if (_this.selectedText_.getAttribute("aria-required") === "true") {
                                _this.root_.classList.add(constants_1.cssClasses.REQUIRED);
                            } else {
                                _this.root_.classList.remove(constants_1.cssClasses.REQUIRED);
                            }
                        } else {
                            if (_this.nativeControl_.required) {
                                _this.root_.classList.add(constants_1.cssClasses.REQUIRED);
                            } else {
                                _this.root_.classList.remove(constants_1.cssClasses.REQUIRED);
                            }
                        }
                        return true;
                    });
                };
                var getAttributesList = function getAttributesList(mutationsList) {
                    return mutationsList.map(function(mutation) {
                        return mutation.attributeName;
                    }).filter(function(attributeName) {
                        return attributeName;
                    });
                };
                var observer = new MutationObserver(function(mutationsList) {
                    return observerHandler(getAttributesList(mutationsList));
                });
                observer.observe(this.targetElement_, {
                    attributes: true
                });
                this.validationObserver_ = observer;
            };
            return MDCSelect;
        }(component_1.MDCComponent);
        exports.MDCSelect = MDCSelect;
    }, function(module, exports, __webpack_require__) {
        "use strict";
        function __export(m) {
            for (var p in m) {
                if (!exports.hasOwnProperty(p)) exports[p] = m[p];
            }
        }
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        __export(__webpack_require__(66));
        __export(__webpack_require__(67));
        var constants_1 = __webpack_require__(68);
        exports.helperTextCssClasses = constants_1.cssClasses;
        exports.helperTextStrings = constants_1.strings;
    }, function(module, exports, __webpack_require__) {
        "use strict";
        function __export(m) {
            for (var p in m) {
                if (!exports.hasOwnProperty(p)) exports[p] = m[p];
            }
        }
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        __export(__webpack_require__(69));
        __export(__webpack_require__(70));
        var constants_1 = __webpack_require__(71);
        exports.iconStrings = constants_1.strings;
    }, function(module, exports, __webpack_require__) {
        "use strict";
        function __export(m) {
            for (var p in m) {
                if (!exports.hasOwnProperty(p)) exports[p] = m[p];
            }
        }
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        __export(__webpack_require__(142));
        __export(__webpack_require__(25));
        __export(__webpack_require__(72));
    }, function(module, exports, __webpack_require__) {
        "use strict";
        var __extends = this && this.__extends || function() {
            var _extendStatics = function extendStatics(d, b) {
                _extendStatics = Object.setPrototypeOf || {
                    __proto__: []
                } instanceof Array && function(d, b) {
                    d.__proto__ = b;
                } || function(d, b) {
                    for (var p in b) {
                        if (b.hasOwnProperty(p)) d[p] = b[p];
                    }
                };
                return _extendStatics(d, b);
            };
            return function(d, b) {
                _extendStatics(d, b);
                function __() {
                    this.constructor = d;
                }
                d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
            };
        }();
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var component_1 = __webpack_require__(1);
        var constants_1 = __webpack_require__(25);
        var foundation_1 = __webpack_require__(72);
        var MDCSlider = function(_super) {
            __extends(MDCSlider, _super);
            function MDCSlider() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            MDCSlider.attachTo = function(root) {
                return new MDCSlider(root);
            };
            Object.defineProperty(MDCSlider.prototype, "value", {
                get: function get() {
                    return this.foundation_.getValue();
                },
                set: function set(value) {
                    this.foundation_.setValue(value);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MDCSlider.prototype, "min", {
                get: function get() {
                    return this.foundation_.getMin();
                },
                set: function set(min) {
                    this.foundation_.setMin(min);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MDCSlider.prototype, "max", {
                get: function get() {
                    return this.foundation_.getMax();
                },
                set: function set(max) {
                    this.foundation_.setMax(max);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MDCSlider.prototype, "step", {
                get: function get() {
                    return this.foundation_.getStep();
                },
                set: function set(step) {
                    this.foundation_.setStep(step);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MDCSlider.prototype, "disabled", {
                get: function get() {
                    return this.foundation_.isDisabled();
                },
                set: function set(disabled) {
                    this.foundation_.setDisabled(disabled);
                },
                enumerable: true,
                configurable: true
            });
            MDCSlider.prototype.initialize = function() {
                this.thumbContainer_ = this.root_.querySelector(constants_1.strings.THUMB_CONTAINER_SELECTOR);
                this.track_ = this.root_.querySelector(constants_1.strings.TRACK_SELECTOR);
                this.pinValueMarker_ = this.root_.querySelector(constants_1.strings.PIN_VALUE_MARKER_SELECTOR);
                this.trackMarkerContainer_ = this.root_.querySelector(constants_1.strings.TRACK_MARKER_CONTAINER_SELECTOR);
            };
            MDCSlider.prototype.getDefaultFoundation = function() {
                var _this = this;
                var adapter = {
                    hasClass: function hasClass(className) {
                        return _this.root_.classList.contains(className);
                    },
                    addClass: function addClass(className) {
                        return _this.root_.classList.add(className);
                    },
                    removeClass: function removeClass(className) {
                        return _this.root_.classList.remove(className);
                    },
                    getAttribute: function getAttribute(name) {
                        return _this.root_.getAttribute(name);
                    },
                    setAttribute: function setAttribute(name, value) {
                        return _this.root_.setAttribute(name, value);
                    },
                    removeAttribute: function removeAttribute(name) {
                        return _this.root_.removeAttribute(name);
                    },
                    computeBoundingRect: function computeBoundingRect() {
                        return _this.root_.getBoundingClientRect();
                    },
                    getTabIndex: function getTabIndex() {
                        return _this.root_.tabIndex;
                    },
                    registerInteractionHandler: function registerInteractionHandler(evtType, handler) {
                        return _this.listen(evtType, handler);
                    },
                    deregisterInteractionHandler: function deregisterInteractionHandler(evtType, handler) {
                        return _this.unlisten(evtType, handler);
                    },
                    registerThumbContainerInteractionHandler: function registerThumbContainerInteractionHandler(evtType, handler) {
                        _this.thumbContainer_.addEventListener(evtType, handler);
                    },
                    deregisterThumbContainerInteractionHandler: function deregisterThumbContainerInteractionHandler(evtType, handler) {
                        _this.thumbContainer_.removeEventListener(evtType, handler);
                    },
                    registerBodyInteractionHandler: function registerBodyInteractionHandler(evtType, handler) {
                        return document.body.addEventListener(evtType, handler);
                    },
                    deregisterBodyInteractionHandler: function deregisterBodyInteractionHandler(evtType, handler) {
                        return document.body.removeEventListener(evtType, handler);
                    },
                    registerResizeHandler: function registerResizeHandler(handler) {
                        return window.addEventListener("resize", handler);
                    },
                    deregisterResizeHandler: function deregisterResizeHandler(handler) {
                        return window.removeEventListener("resize", handler);
                    },
                    notifyInput: function notifyInput() {
                        return _this.emit(constants_1.strings.INPUT_EVENT, _this);
                    },
                    notifyChange: function notifyChange() {
                        return _this.emit(constants_1.strings.CHANGE_EVENT, _this);
                    },
                    setThumbContainerStyleProperty: function setThumbContainerStyleProperty(propertyName, value) {
                        _this.thumbContainer_.style.setProperty(propertyName, value);
                    },
                    setTrackStyleProperty: function setTrackStyleProperty(propertyName, value) {
                        return _this.track_.style.setProperty(propertyName, value);
                    },
                    setMarkerValue: function setMarkerValue(value) {
                        return _this.pinValueMarker_.innerText = value.toLocaleString();
                    },
                    appendTrackMarkers: function appendTrackMarkers(numMarkers) {
                        var frag = document.createDocumentFragment();
                        for (var i = 0; i < numMarkers; i++) {
                            var marker = document.createElement("div");
                            marker.classList.add("mdc-slider__track-marker");
                            frag.appendChild(marker);
                        }
                        _this.trackMarkerContainer_.appendChild(frag);
                    },
                    removeTrackMarkers: function removeTrackMarkers() {
                        while (_this.trackMarkerContainer_.firstChild) {
                            _this.trackMarkerContainer_.removeChild(_this.trackMarkerContainer_.firstChild);
                        }
                    },
                    setLastTrackMarkersStyleProperty: function setLastTrackMarkersStyleProperty(propertyName, value) {
                        var lastTrackMarker = _this.root_.querySelector(constants_1.strings.LAST_TRACK_MARKER_SELECTOR);
                        lastTrackMarker.style.setProperty(propertyName, value);
                    },
                    isRTL: function isRTL() {
                        return getComputedStyle(_this.root_).direction === "rtl";
                    }
                };
                return new foundation_1.MDCSliderFoundation(adapter);
            };
            MDCSlider.prototype.initialSyncWithDOM = function() {
                var origValueNow = this.parseFloat_(this.root_.getAttribute(constants_1.strings.ARIA_VALUENOW), this.value);
                var min = this.parseFloat_(this.root_.getAttribute(constants_1.strings.ARIA_VALUEMIN), this.min);
                var max = this.parseFloat_(this.root_.getAttribute(constants_1.strings.ARIA_VALUEMAX), this.max);
                if (min >= this.max) {
                    this.max = max;
                    this.min = min;
                } else {
                    this.min = min;
                    this.max = max;
                }
                this.step = this.parseFloat_(this.root_.getAttribute(constants_1.strings.STEP_DATA_ATTR), this.step);
                this.value = origValueNow;
                this.disabled = this.root_.hasAttribute(constants_1.strings.ARIA_DISABLED) && this.root_.getAttribute(constants_1.strings.ARIA_DISABLED) !== "false";
                this.foundation_.setupTrackMarker();
            };
            MDCSlider.prototype.layout = function() {
                this.foundation_.layout();
            };
            MDCSlider.prototype.stepUp = function(amount) {
                if (amount === void 0) {
                    amount = this.step || 1;
                }
                this.value += amount;
            };
            MDCSlider.prototype.stepDown = function(amount) {
                if (amount === void 0) {
                    amount = this.step || 1;
                }
                this.value -= amount;
            };
            MDCSlider.prototype.parseFloat_ = function(str, defaultValue) {
                var num = parseFloat(str);
                var isNumeric = typeof num === "number" && isFinite(num);
                return isNumeric ? num : defaultValue;
            };
            return MDCSlider;
        }(component_1.MDCComponent);
        exports.MDCSlider = MDCSlider;
    }, function(module, exports, __webpack_require__) {
        "use strict";
        function __export(m) {
            for (var p in m) {
                if (!exports.hasOwnProperty(p)) exports[p] = m[p];
            }
        }
        var __importStar = this && this.__importStar || function(mod) {
            if (mod && mod.__esModule) return mod;
            var result = {};
            if (mod != null) for (var k in mod) {
                if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
            }
            result["default"] = mod;
            return result;
        };
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var util = __importStar(__webpack_require__(73));
        exports.util = util;
        __export(__webpack_require__(144));
        __export(__webpack_require__(10));
        __export(__webpack_require__(74));
    }, function(module, exports, __webpack_require__) {
        "use strict";
        var __extends = this && this.__extends || function() {
            var _extendStatics = function extendStatics(d, b) {
                _extendStatics = Object.setPrototypeOf || {
                    __proto__: []
                } instanceof Array && function(d, b) {
                    d.__proto__ = b;
                } || function(d, b) {
                    for (var p in b) {
                        if (b.hasOwnProperty(p)) d[p] = b[p];
                    }
                };
                return _extendStatics(d, b);
            };
            return function(d, b) {
                _extendStatics(d, b);
                function __() {
                    this.constructor = d;
                }
                d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
            };
        }();
        var __importStar = this && this.__importStar || function(mod) {
            if (mod && mod.__esModule) return mod;
            var result = {};
            if (mod != null) for (var k in mod) {
                if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
            }
            result["default"] = mod;
            return result;
        };
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var component_1 = __webpack_require__(1);
        var ponyfill_1 = __webpack_require__(3);
        var constants_1 = __webpack_require__(10);
        var foundation_1 = __webpack_require__(74);
        var util = __importStar(__webpack_require__(73));
        var SURFACE_SELECTOR = constants_1.strings.SURFACE_SELECTOR, LABEL_SELECTOR = constants_1.strings.LABEL_SELECTOR, ACTION_SELECTOR = constants_1.strings.ACTION_SELECTOR, DISMISS_SELECTOR = constants_1.strings.DISMISS_SELECTOR, OPENING_EVENT = constants_1.strings.OPENING_EVENT, OPENED_EVENT = constants_1.strings.OPENED_EVENT, CLOSING_EVENT = constants_1.strings.CLOSING_EVENT, CLOSED_EVENT = constants_1.strings.CLOSED_EVENT;
        var MDCSnackbar = function(_super) {
            __extends(MDCSnackbar, _super);
            function MDCSnackbar() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            MDCSnackbar.attachTo = function(root) {
                return new MDCSnackbar(root);
            };
            MDCSnackbar.prototype.initialize = function(announcerFactory) {
                if (announcerFactory === void 0) {
                    announcerFactory = function announcerFactory() {
                        return util.announce;
                    };
                }
                this.announce_ = announcerFactory();
            };
            MDCSnackbar.prototype.initialSyncWithDOM = function() {
                var _this = this;
                this.surfaceEl_ = this.root_.querySelector(SURFACE_SELECTOR);
                this.labelEl_ = this.root_.querySelector(LABEL_SELECTOR);
                this.actionEl_ = this.root_.querySelector(ACTION_SELECTOR);
                this.handleKeyDown_ = function(evt) {
                    return _this.foundation_.handleKeyDown(evt);
                };
                this.handleSurfaceClick_ = function(evt) {
                    var target = evt.target;
                    if (_this.isActionButton_(target)) {
                        _this.foundation_.handleActionButtonClick(evt);
                    } else if (_this.isActionIcon_(target)) {
                        _this.foundation_.handleActionIconClick(evt);
                    }
                };
                this.registerKeyDownHandler_(this.handleKeyDown_);
                this.registerSurfaceClickHandler_(this.handleSurfaceClick_);
            };
            MDCSnackbar.prototype.destroy = function() {
                _super.prototype.destroy.call(this);
                this.deregisterKeyDownHandler_(this.handleKeyDown_);
                this.deregisterSurfaceClickHandler_(this.handleSurfaceClick_);
            };
            MDCSnackbar.prototype.open = function() {
                this.foundation_.open();
            };
            MDCSnackbar.prototype.close = function(reason) {
                if (reason === void 0) {
                    reason = "";
                }
                this.foundation_.close(reason);
            };
            MDCSnackbar.prototype.getDefaultFoundation = function() {
                var _this = this;
                var adapter = {
                    addClass: function addClass(className) {
                        return _this.root_.classList.add(className);
                    },
                    announce: function announce() {
                        return _this.announce_(_this.labelEl_);
                    },
                    notifyClosed: function notifyClosed(reason) {
                        return _this.emit(CLOSED_EVENT, reason ? {
                            reason: reason
                        } : {});
                    },
                    notifyClosing: function notifyClosing(reason) {
                        return _this.emit(CLOSING_EVENT, reason ? {
                            reason: reason
                        } : {});
                    },
                    notifyOpened: function notifyOpened() {
                        return _this.emit(OPENED_EVENT, {});
                    },
                    notifyOpening: function notifyOpening() {
                        return _this.emit(OPENING_EVENT, {});
                    },
                    removeClass: function removeClass(className) {
                        return _this.root_.classList.remove(className);
                    }
                };
                return new foundation_1.MDCSnackbarFoundation(adapter);
            };
            Object.defineProperty(MDCSnackbar.prototype, "timeoutMs", {
                get: function get() {
                    return this.foundation_.getTimeoutMs();
                },
                set: function set(timeoutMs) {
                    this.foundation_.setTimeoutMs(timeoutMs);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MDCSnackbar.prototype, "closeOnEscape", {
                get: function get() {
                    return this.foundation_.getCloseOnEscape();
                },
                set: function set(closeOnEscape) {
                    this.foundation_.setCloseOnEscape(closeOnEscape);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MDCSnackbar.prototype, "isOpen", {
                get: function get() {
                    return this.foundation_.isOpen();
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MDCSnackbar.prototype, "labelText", {
                get: function get() {
                    return this.labelEl_.textContent;
                },
                set: function set(labelText) {
                    this.labelEl_.textContent = labelText;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MDCSnackbar.prototype, "actionButtonText", {
                get: function get() {
                    return this.actionEl_.textContent;
                },
                set: function set(actionButtonText) {
                    this.actionEl_.textContent = actionButtonText;
                },
                enumerable: true,
                configurable: true
            });
            MDCSnackbar.prototype.registerKeyDownHandler_ = function(handler) {
                this.listen("keydown", handler);
            };
            MDCSnackbar.prototype.deregisterKeyDownHandler_ = function(handler) {
                this.unlisten("keydown", handler);
            };
            MDCSnackbar.prototype.registerSurfaceClickHandler_ = function(handler) {
                this.surfaceEl_.addEventListener("click", handler);
            };
            MDCSnackbar.prototype.deregisterSurfaceClickHandler_ = function(handler) {
                this.surfaceEl_.removeEventListener("click", handler);
            };
            MDCSnackbar.prototype.isActionButton_ = function(target) {
                return Boolean(ponyfill_1.closest(target, ACTION_SELECTOR));
            };
            MDCSnackbar.prototype.isActionIcon_ = function(target) {
                return Boolean(ponyfill_1.closest(target, DISMISS_SELECTOR));
            };
            return MDCSnackbar;
        }(component_1.MDCComponent);
        exports.MDCSnackbar = MDCSnackbar;
    }, function(module, exports, __webpack_require__) {
        "use strict";
        function __export(m) {
            for (var p in m) {
                if (!exports.hasOwnProperty(p)) exports[p] = m[p];
            }
        }
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        __export(__webpack_require__(146));
        __export(__webpack_require__(76));
        __export(__webpack_require__(75));
    }, function(module, exports, __webpack_require__) {
        "use strict";
        var __extends = this && this.__extends || function() {
            var _extendStatics = function extendStatics(d, b) {
                _extendStatics = Object.setPrototypeOf || {
                    __proto__: []
                } instanceof Array && function(d, b) {
                    d.__proto__ = b;
                } || function(d, b) {
                    for (var p in b) {
                        if (b.hasOwnProperty(p)) d[p] = b[p];
                    }
                };
                return _extendStatics(d, b);
            };
            return function(d, b) {
                _extendStatics(d, b);
                function __() {
                    this.constructor = d;
                }
                d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
            };
        }();
        var __assign = this && this.__assign || function() {
            __assign = Object.assign || function(t) {
                for (var s, i = 1, n = arguments.length; i < n; i++) {
                    s = arguments[i];
                    for (var p in s) {
                        if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
                    }
                }
                return t;
            };
            return __assign.apply(this, arguments);
        };
        var __read = this && this.__read || function(o, n) {
            var m = typeof Symbol === "function" && o[Symbol.iterator];
            if (!m) return o;
            var i = m.call(o), r, ar = [], e;
            try {
                while ((n === void 0 || n-- > 0) && !(r = i.next()).done) {
                    ar.push(r.value);
                }
            } catch (error) {
                e = {
                    error: error
                };
            } finally {
                try {
                    if (r && !r.done && (m = i["return"])) m.call(i);
                } finally {
                    if (e) throw e.error;
                }
            }
            return ar;
        };
        var __spread = this && this.__spread || function() {
            for (var ar = [], i = 0; i < arguments.length; i++) {
                ar = ar.concat(__read(arguments[i]));
            }
            return ar;
        };
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var component_1 = __webpack_require__(1);
        var ponyfill_1 = __webpack_require__(3);
        var component_2 = __webpack_require__(2);
        var foundation_1 = __webpack_require__(4);
        var foundation_2 = __webpack_require__(75);
        var MDCSwitch = function(_super) {
            __extends(MDCSwitch, _super);
            function MDCSwitch() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.ripple_ = _this.createRipple_();
                return _this;
            }
            MDCSwitch.attachTo = function(root) {
                return new MDCSwitch(root);
            };
            MDCSwitch.prototype.destroy = function() {
                _super.prototype.destroy.call(this);
                this.ripple_.destroy();
                this.nativeControl_.removeEventListener("change", this.changeHandler_);
            };
            MDCSwitch.prototype.initialSyncWithDOM = function() {
                var _this = this;
                this.changeHandler_ = function() {
                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        args[_i] = arguments[_i];
                    }
                    var _a;
                    return (_a = _this.foundation_).handleChange.apply(_a, __spread(args));
                };
                this.nativeControl_.addEventListener("change", this.changeHandler_);
                this.checked = this.checked;
            };
            MDCSwitch.prototype.getDefaultFoundation = function() {
                var _this = this;
                var adapter = {
                    addClass: function addClass(className) {
                        return _this.root_.classList.add(className);
                    },
                    removeClass: function removeClass(className) {
                        return _this.root_.classList.remove(className);
                    },
                    setNativeControlChecked: function setNativeControlChecked(checked) {
                        return _this.nativeControl_.checked = checked;
                    },
                    setNativeControlDisabled: function setNativeControlDisabled(disabled) {
                        return _this.nativeControl_.disabled = disabled;
                    }
                };
                return new foundation_2.MDCSwitchFoundation(adapter);
            };
            Object.defineProperty(MDCSwitch.prototype, "ripple", {
                get: function get() {
                    return this.ripple_;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MDCSwitch.prototype, "checked", {
                get: function get() {
                    return this.nativeControl_.checked;
                },
                set: function set(checked) {
                    this.foundation_.setChecked(checked);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MDCSwitch.prototype, "disabled", {
                get: function get() {
                    return this.nativeControl_.disabled;
                },
                set: function set(disabled) {
                    this.foundation_.setDisabled(disabled);
                },
                enumerable: true,
                configurable: true
            });
            MDCSwitch.prototype.createRipple_ = function() {
                var _this = this;
                var RIPPLE_SURFACE_SELECTOR = foundation_2.MDCSwitchFoundation.strings.RIPPLE_SURFACE_SELECTOR;
                var rippleSurface = this.root_.querySelector(RIPPLE_SURFACE_SELECTOR);
                var adapter = __assign({}, component_2.MDCRipple.createAdapter(this), {
                    addClass: function addClass(className) {
                        return rippleSurface.classList.add(className);
                    },
                    computeBoundingRect: function computeBoundingRect() {
                        return rippleSurface.getBoundingClientRect();
                    },
                    deregisterInteractionHandler: function deregisterInteractionHandler(evtType, handler) {
                        _this.nativeControl_.removeEventListener(evtType, handler);
                    },
                    isSurfaceActive: function isSurfaceActive() {
                        return ponyfill_1.matches(_this.nativeControl_, ":active");
                    },
                    isUnbounded: function isUnbounded() {
                        return true;
                    },
                    registerInteractionHandler: function registerInteractionHandler(evtType, handler) {
                        _this.nativeControl_.addEventListener(evtType, handler);
                    },
                    removeClass: function removeClass(className) {
                        return rippleSurface.classList.remove(className);
                    },
                    updateCssVariable: function updateCssVariable(varName, value) {
                        rippleSurface.style.setProperty(varName, value);
                    }
                });
                return new component_2.MDCRipple(this.root_, new foundation_1.MDCRippleFoundation(adapter));
            };
            Object.defineProperty(MDCSwitch.prototype, "nativeControl_", {
                get: function get() {
                    var NATIVE_CONTROL_SELECTOR = foundation_2.MDCSwitchFoundation.strings.NATIVE_CONTROL_SELECTOR;
                    return this.root_.querySelector(NATIVE_CONTROL_SELECTOR);
                },
                enumerable: true,
                configurable: true
            });
            return MDCSwitch;
        }(component_1.MDCComponent);
        exports.MDCSwitch = MDCSwitch;
    }, function(module, exports, __webpack_require__) {
        "use strict";
        function __export(m) {
            for (var p in m) {
                if (!exports.hasOwnProperty(p)) exports[p] = m[p];
            }
        }
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        __export(__webpack_require__(148));
        __export(__webpack_require__(87));
        __export(__webpack_require__(86));
    }, function(module, exports, __webpack_require__) {
        "use strict";
        var __extends = this && this.__extends || function() {
            var _extendStatics = function extendStatics(d, b) {
                _extendStatics = Object.setPrototypeOf || {
                    __proto__: []
                } instanceof Array && function(d, b) {
                    d.__proto__ = b;
                } || function(d, b) {
                    for (var p in b) {
                        if (b.hasOwnProperty(p)) d[p] = b[p];
                    }
                };
                return _extendStatics(d, b);
            };
            return function(d, b) {
                _extendStatics(d, b);
                function __() {
                    this.constructor = d;
                }
                d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
            };
        }();
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var component_1 = __webpack_require__(1);
        var component_2 = __webpack_require__(77);
        var component_3 = __webpack_require__(80);
        var foundation_1 = __webpack_require__(28);
        var foundation_2 = __webpack_require__(86);
        var strings = foundation_2.MDCTabBarFoundation.strings;
        var tabIdCounter = 0;
        var MDCTabBar = function(_super) {
            __extends(MDCTabBar, _super);
            function MDCTabBar() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            MDCTabBar.attachTo = function(root) {
                return new MDCTabBar(root);
            };
            Object.defineProperty(MDCTabBar.prototype, "focusOnActivate", {
                set: function set(focusOnActivate) {
                    this.tabList_.forEach(function(tab) {
                        return tab.focusOnActivate = focusOnActivate;
                    });
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MDCTabBar.prototype, "useAutomaticActivation", {
                set: function set(useAutomaticActivation) {
                    this.foundation_.setUseAutomaticActivation(useAutomaticActivation);
                },
                enumerable: true,
                configurable: true
            });
            MDCTabBar.prototype.initialize = function(tabFactory, tabScrollerFactory) {
                if (tabFactory === void 0) {
                    tabFactory = function tabFactory(el) {
                        return new component_3.MDCTab(el);
                    };
                }
                if (tabScrollerFactory === void 0) {
                    tabScrollerFactory = function tabScrollerFactory(el) {
                        return new component_2.MDCTabScroller(el);
                    };
                }
                this.tabList_ = this.instantiateTabs_(tabFactory);
                this.tabScroller_ = this.instantiateTabScroller_(tabScrollerFactory);
            };
            MDCTabBar.prototype.initialSyncWithDOM = function() {
                var _this = this;
                this.handleTabInteraction_ = function(evt) {
                    return _this.foundation_.handleTabInteraction(evt);
                };
                this.handleKeyDown_ = function(evt) {
                    return _this.foundation_.handleKeyDown(evt);
                };
                this.listen(foundation_1.MDCTabFoundation.strings.INTERACTED_EVENT, this.handleTabInteraction_);
                this.listen("keydown", this.handleKeyDown_);
                for (var i = 0; i < this.tabList_.length; i++) {
                    if (this.tabList_[i].active) {
                        this.scrollIntoView(i);
                        break;
                    }
                }
            };
            MDCTabBar.prototype.destroy = function() {
                _super.prototype.destroy.call(this);
                this.unlisten(foundation_1.MDCTabFoundation.strings.INTERACTED_EVENT, this.handleTabInteraction_);
                this.unlisten("keydown", this.handleKeyDown_);
                this.tabList_.forEach(function(tab) {
                    return tab.destroy();
                });
                if (this.tabScroller_) {
                    this.tabScroller_.destroy();
                }
            };
            MDCTabBar.prototype.getDefaultFoundation = function() {
                var _this = this;
                var adapter = {
                    scrollTo: function scrollTo(scrollX) {
                        return _this.tabScroller_.scrollTo(scrollX);
                    },
                    incrementScroll: function incrementScroll(scrollXIncrement) {
                        return _this.tabScroller_.incrementScroll(scrollXIncrement);
                    },
                    getScrollPosition: function getScrollPosition() {
                        return _this.tabScroller_.getScrollPosition();
                    },
                    getScrollContentWidth: function getScrollContentWidth() {
                        return _this.tabScroller_.getScrollContentWidth();
                    },
                    getOffsetWidth: function getOffsetWidth() {
                        return _this.root_.offsetWidth;
                    },
                    isRTL: function isRTL() {
                        return window.getComputedStyle(_this.root_).getPropertyValue("direction") === "rtl";
                    },
                    setActiveTab: function setActiveTab(index) {
                        return _this.foundation_.activateTab(index);
                    },
                    activateTabAtIndex: function activateTabAtIndex(index, clientRect) {
                        return _this.tabList_[index].activate(clientRect);
                    },
                    deactivateTabAtIndex: function deactivateTabAtIndex(index) {
                        return _this.tabList_[index].deactivate();
                    },
                    focusTabAtIndex: function focusTabAtIndex(index) {
                        return _this.tabList_[index].focus();
                    },
                    getTabIndicatorClientRectAtIndex: function getTabIndicatorClientRectAtIndex(index) {
                        return _this.tabList_[index].computeIndicatorClientRect();
                    },
                    getTabDimensionsAtIndex: function getTabDimensionsAtIndex(index) {
                        return _this.tabList_[index].computeDimensions();
                    },
                    getPreviousActiveTabIndex: function getPreviousActiveTabIndex() {
                        for (var i = 0; i < _this.tabList_.length; i++) {
                            if (_this.tabList_[i].active) {
                                return i;
                            }
                        }
                        return -1;
                    },
                    getFocusedTabIndex: function getFocusedTabIndex() {
                        var tabElements = _this.getTabElements_();
                        var activeElement = document.activeElement;
                        return tabElements.indexOf(activeElement);
                    },
                    getIndexOfTabById: function getIndexOfTabById(id) {
                        for (var i = 0; i < _this.tabList_.length; i++) {
                            if (_this.tabList_[i].id === id) {
                                return i;
                            }
                        }
                        return -1;
                    },
                    getTabListLength: function getTabListLength() {
                        return _this.tabList_.length;
                    },
                    notifyTabActivated: function notifyTabActivated(index) {
                        return _this.emit(strings.TAB_ACTIVATED_EVENT, {
                            index: index
                        }, true);
                    }
                };
                return new foundation_2.MDCTabBarFoundation(adapter);
            };
            MDCTabBar.prototype.activateTab = function(index) {
                this.foundation_.activateTab(index);
            };
            MDCTabBar.prototype.scrollIntoView = function(index) {
                this.foundation_.scrollIntoView(index);
            };
            MDCTabBar.prototype.getTabElements_ = function() {
                return [].slice.call(this.root_.querySelectorAll(strings.TAB_SELECTOR));
            };
            MDCTabBar.prototype.instantiateTabs_ = function(tabFactory) {
                return this.getTabElements_().map(function(el) {
                    el.id = el.id || "mdc-tab-" + ++tabIdCounter;
                    return tabFactory(el);
                });
            };
            MDCTabBar.prototype.instantiateTabScroller_ = function(tabScrollerFactory) {
                var tabScrollerElement = this.root_.querySelector(strings.TAB_SCROLLER_SELECTOR);
                if (tabScrollerElement) {
                    return tabScrollerFactory(tabScrollerElement);
                }
                return null;
            };
            return MDCTabBar;
        }(component_1.MDCComponent);
        exports.MDCTabBar = MDCTabBar;
    }, function(module, exports, __webpack_require__) {
        "use strict";
        var __extends = this && this.__extends || function() {
            var _extendStatics = function extendStatics(d, b) {
                _extendStatics = Object.setPrototypeOf || {
                    __proto__: []
                } instanceof Array && function(d, b) {
                    d.__proto__ = b;
                } || function(d, b) {
                    for (var p in b) {
                        if (b.hasOwnProperty(p)) d[p] = b[p];
                    }
                };
                return _extendStatics(d, b);
            };
            return function(d, b) {
                _extendStatics(d, b);
                function __() {
                    this.constructor = d;
                }
                d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
            };
        }();
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var rtl_scroller_1 = __webpack_require__(27);
        var MDCTabScrollerRTLDefault = function(_super) {
            __extends(MDCTabScrollerRTLDefault, _super);
            function MDCTabScrollerRTLDefault() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            MDCTabScrollerRTLDefault.prototype.getScrollPositionRTL = function() {
                var currentScrollLeft = this.adapter_.getScrollAreaScrollLeft();
                var right = this.calculateScrollEdges_().right;
                return Math.round(right - currentScrollLeft);
            };
            MDCTabScrollerRTLDefault.prototype.scrollToRTL = function(scrollX) {
                var edges = this.calculateScrollEdges_();
                var currentScrollLeft = this.adapter_.getScrollAreaScrollLeft();
                var clampedScrollLeft = this.clampScrollValue_(edges.right - scrollX);
                return {
                    finalScrollPosition: clampedScrollLeft,
                    scrollDelta: clampedScrollLeft - currentScrollLeft
                };
            };
            MDCTabScrollerRTLDefault.prototype.incrementScrollRTL = function(scrollX) {
                var currentScrollLeft = this.adapter_.getScrollAreaScrollLeft();
                var clampedScrollLeft = this.clampScrollValue_(currentScrollLeft - scrollX);
                return {
                    finalScrollPosition: clampedScrollLeft,
                    scrollDelta: clampedScrollLeft - currentScrollLeft
                };
            };
            MDCTabScrollerRTLDefault.prototype.getAnimatingScrollPosition = function(scrollX) {
                return scrollX;
            };
            MDCTabScrollerRTLDefault.prototype.calculateScrollEdges_ = function() {
                var contentWidth = this.adapter_.getScrollContentOffsetWidth();
                var rootWidth = this.adapter_.getScrollAreaOffsetWidth();
                return {
                    left: 0,
                    right: contentWidth - rootWidth
                };
            };
            MDCTabScrollerRTLDefault.prototype.clampScrollValue_ = function(scrollX) {
                var edges = this.calculateScrollEdges_();
                return Math.min(Math.max(edges.left, scrollX), edges.right);
            };
            return MDCTabScrollerRTLDefault;
        }(rtl_scroller_1.MDCTabScrollerRTL);
        exports.MDCTabScrollerRTLDefault = MDCTabScrollerRTLDefault;
        exports.default = MDCTabScrollerRTLDefault;
    }, function(module, exports, __webpack_require__) {
        "use strict";
        var __extends = this && this.__extends || function() {
            var _extendStatics = function extendStatics(d, b) {
                _extendStatics = Object.setPrototypeOf || {
                    __proto__: []
                } instanceof Array && function(d, b) {
                    d.__proto__ = b;
                } || function(d, b) {
                    for (var p in b) {
                        if (b.hasOwnProperty(p)) d[p] = b[p];
                    }
                };
                return _extendStatics(d, b);
            };
            return function(d, b) {
                _extendStatics(d, b);
                function __() {
                    this.constructor = d;
                }
                d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
            };
        }();
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var rtl_scroller_1 = __webpack_require__(27);
        var MDCTabScrollerRTLNegative = function(_super) {
            __extends(MDCTabScrollerRTLNegative, _super);
            function MDCTabScrollerRTLNegative() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            MDCTabScrollerRTLNegative.prototype.getScrollPositionRTL = function(translateX) {
                var currentScrollLeft = this.adapter_.getScrollAreaScrollLeft();
                return Math.round(translateX - currentScrollLeft);
            };
            MDCTabScrollerRTLNegative.prototype.scrollToRTL = function(scrollX) {
                var currentScrollLeft = this.adapter_.getScrollAreaScrollLeft();
                var clampedScrollLeft = this.clampScrollValue_(-scrollX);
                return {
                    finalScrollPosition: clampedScrollLeft,
                    scrollDelta: clampedScrollLeft - currentScrollLeft
                };
            };
            MDCTabScrollerRTLNegative.prototype.incrementScrollRTL = function(scrollX) {
                var currentScrollLeft = this.adapter_.getScrollAreaScrollLeft();
                var clampedScrollLeft = this.clampScrollValue_(currentScrollLeft - scrollX);
                return {
                    finalScrollPosition: clampedScrollLeft,
                    scrollDelta: clampedScrollLeft - currentScrollLeft
                };
            };
            MDCTabScrollerRTLNegative.prototype.getAnimatingScrollPosition = function(scrollX, translateX) {
                return scrollX - translateX;
            };
            MDCTabScrollerRTLNegative.prototype.calculateScrollEdges_ = function() {
                var contentWidth = this.adapter_.getScrollContentOffsetWidth();
                var rootWidth = this.adapter_.getScrollAreaOffsetWidth();
                return {
                    left: rootWidth - contentWidth,
                    right: 0
                };
            };
            MDCTabScrollerRTLNegative.prototype.clampScrollValue_ = function(scrollX) {
                var edges = this.calculateScrollEdges_();
                return Math.max(Math.min(edges.right, scrollX), edges.left);
            };
            return MDCTabScrollerRTLNegative;
        }(rtl_scroller_1.MDCTabScrollerRTL);
        exports.MDCTabScrollerRTLNegative = MDCTabScrollerRTLNegative;
        exports.default = MDCTabScrollerRTLNegative;
    }, function(module, exports, __webpack_require__) {
        "use strict";
        var __extends = this && this.__extends || function() {
            var _extendStatics = function extendStatics(d, b) {
                _extendStatics = Object.setPrototypeOf || {
                    __proto__: []
                } instanceof Array && function(d, b) {
                    d.__proto__ = b;
                } || function(d, b) {
                    for (var p in b) {
                        if (b.hasOwnProperty(p)) d[p] = b[p];
                    }
                };
                return _extendStatics(d, b);
            };
            return function(d, b) {
                _extendStatics(d, b);
                function __() {
                    this.constructor = d;
                }
                d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
            };
        }();
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var rtl_scroller_1 = __webpack_require__(27);
        var MDCTabScrollerRTLReverse = function(_super) {
            __extends(MDCTabScrollerRTLReverse, _super);
            function MDCTabScrollerRTLReverse() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            MDCTabScrollerRTLReverse.prototype.getScrollPositionRTL = function(translateX) {
                var currentScrollLeft = this.adapter_.getScrollAreaScrollLeft();
                return Math.round(currentScrollLeft - translateX);
            };
            MDCTabScrollerRTLReverse.prototype.scrollToRTL = function(scrollX) {
                var currentScrollLeft = this.adapter_.getScrollAreaScrollLeft();
                var clampedScrollLeft = this.clampScrollValue_(scrollX);
                return {
                    finalScrollPosition: clampedScrollLeft,
                    scrollDelta: currentScrollLeft - clampedScrollLeft
                };
            };
            MDCTabScrollerRTLReverse.prototype.incrementScrollRTL = function(scrollX) {
                var currentScrollLeft = this.adapter_.getScrollAreaScrollLeft();
                var clampedScrollLeft = this.clampScrollValue_(currentScrollLeft + scrollX);
                return {
                    finalScrollPosition: clampedScrollLeft,
                    scrollDelta: currentScrollLeft - clampedScrollLeft
                };
            };
            MDCTabScrollerRTLReverse.prototype.getAnimatingScrollPosition = function(scrollX, translateX) {
                return scrollX + translateX;
            };
            MDCTabScrollerRTLReverse.prototype.calculateScrollEdges_ = function() {
                var contentWidth = this.adapter_.getScrollContentOffsetWidth();
                var rootWidth = this.adapter_.getScrollAreaOffsetWidth();
                return {
                    left: contentWidth - rootWidth,
                    right: 0
                };
            };
            MDCTabScrollerRTLReverse.prototype.clampScrollValue_ = function(scrollX) {
                var edges = this.calculateScrollEdges_();
                return Math.min(Math.max(edges.right, scrollX), edges.left);
            };
            return MDCTabScrollerRTLReverse;
        }(rtl_scroller_1.MDCTabScrollerRTL);
        exports.MDCTabScrollerRTLReverse = MDCTabScrollerRTLReverse;
        exports.default = MDCTabScrollerRTLReverse;
    }, function(module, exports, __webpack_require__) {
        "use strict";
        function __export(m) {
            for (var p in m) {
                if (!exports.hasOwnProperty(p)) exports[p] = m[p];
            }
        }
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        __export(__webpack_require__(81));
        __export(__webpack_require__(83));
        __export(__webpack_require__(11));
        __export(__webpack_require__(82));
        __export(__webpack_require__(84));
    }, function(module, exports, __webpack_require__) {
        "use strict";
        function __export(m) {
            for (var p in m) {
                if (!exports.hasOwnProperty(p)) exports[p] = m[p];
            }
        }
        var __importStar = this && this.__importStar || function(mod) {
            if (mod && mod.__esModule) return mod;
            var result = {};
            if (mod != null) for (var k in mod) {
                if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
            }
            result["default"] = mod;
            return result;
        };
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var util = __importStar(__webpack_require__(79));
        exports.util = util;
        __export(__webpack_require__(77));
        __export(__webpack_require__(26));
        __export(__webpack_require__(78));
    }, function(module, exports, __webpack_require__) {
        "use strict";
        function __export(m) {
            for (var p in m) {
                if (!exports.hasOwnProperty(p)) exports[p] = m[p];
            }
        }
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        __export(__webpack_require__(80));
        __export(__webpack_require__(85));
        __export(__webpack_require__(28));
    }, function(module, exports, __webpack_require__) {
        "use strict";
        function __export(m) {
            for (var p in m) {
                if (!exports.hasOwnProperty(p)) exports[p] = m[p];
            }
        }
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        __export(__webpack_require__(156));
        __export(__webpack_require__(30));
        __export(__webpack_require__(90));
        __export(__webpack_require__(157));
        __export(__webpack_require__(158));
        __export(__webpack_require__(159));
    }, function(module, exports, __webpack_require__) {
        "use strict";
        var __extends = this && this.__extends || function() {
            var _extendStatics = function extendStatics(d, b) {
                _extendStatics = Object.setPrototypeOf || {
                    __proto__: []
                } instanceof Array && function(d, b) {
                    d.__proto__ = b;
                } || function(d, b) {
                    for (var p in b) {
                        if (b.hasOwnProperty(p)) d[p] = b[p];
                    }
                };
                return _extendStatics(d, b);
            };
            return function(d, b) {
                _extendStatics(d, b);
                function __() {
                    this.constructor = d;
                }
                d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
            };
        }();
        var __assign = this && this.__assign || function() {
            __assign = Object.assign || function(t) {
                for (var s, i = 1, n = arguments.length; i < n; i++) {
                    s = arguments[i];
                    for (var p in s) {
                        if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
                    }
                }
                return t;
            };
            return __assign.apply(this, arguments);
        };
        var __importStar = this && this.__importStar || function(mod) {
            if (mod && mod.__esModule) return mod;
            var result = {};
            if (mod != null) for (var k in mod) {
                if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
            }
            result["default"] = mod;
            return result;
        };
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var component_1 = __webpack_require__(1);
        var ponyfill = __importStar(__webpack_require__(3));
        var component_2 = __webpack_require__(19);
        var component_3 = __webpack_require__(21);
        var component_4 = __webpack_require__(22);
        var component_5 = __webpack_require__(2);
        var foundation_1 = __webpack_require__(4);
        var component_6 = __webpack_require__(88);
        var foundation_2 = __webpack_require__(29);
        var constants_1 = __webpack_require__(30);
        var foundation_3 = __webpack_require__(90);
        var component_7 = __webpack_require__(91);
        var foundation_4 = __webpack_require__(31);
        var component_8 = __webpack_require__(93);
        var MDCTextField = function(_super) {
            __extends(MDCTextField, _super);
            function MDCTextField() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            MDCTextField.attachTo = function(root) {
                return new MDCTextField(root);
            };
            MDCTextField.prototype.initialize = function(rippleFactory, lineRippleFactory, helperTextFactory, characterCounterFactory, iconFactory, labelFactory, outlineFactory) {
                if (rippleFactory === void 0) {
                    rippleFactory = function rippleFactory(el, foundation) {
                        return new component_5.MDCRipple(el, foundation);
                    };
                }
                if (lineRippleFactory === void 0) {
                    lineRippleFactory = function lineRippleFactory(el) {
                        return new component_3.MDCLineRipple(el);
                    };
                }
                if (helperTextFactory === void 0) {
                    helperTextFactory = function helperTextFactory(el) {
                        return new component_7.MDCTextFieldHelperText(el);
                    };
                }
                if (characterCounterFactory === void 0) {
                    characterCounterFactory = function characterCounterFactory(el) {
                        return new component_6.MDCTextFieldCharacterCounter(el);
                    };
                }
                if (iconFactory === void 0) {
                    iconFactory = function iconFactory(el) {
                        return new component_8.MDCTextFieldIcon(el);
                    };
                }
                if (labelFactory === void 0) {
                    labelFactory = function labelFactory(el) {
                        return new component_2.MDCFloatingLabel(el);
                    };
                }
                if (outlineFactory === void 0) {
                    outlineFactory = function outlineFactory(el) {
                        return new component_4.MDCNotchedOutline(el);
                    };
                }
                this.input_ = this.root_.querySelector(constants_1.strings.INPUT_SELECTOR);
                var labelElement = this.root_.querySelector(constants_1.strings.LABEL_SELECTOR);
                this.label_ = labelElement ? labelFactory(labelElement) : null;
                var lineRippleElement = this.root_.querySelector(constants_1.strings.LINE_RIPPLE_SELECTOR);
                this.lineRipple_ = lineRippleElement ? lineRippleFactory(lineRippleElement) : null;
                var outlineElement = this.root_.querySelector(constants_1.strings.OUTLINE_SELECTOR);
                this.outline_ = outlineElement ? outlineFactory(outlineElement) : null;
                var helperTextStrings = foundation_4.MDCTextFieldHelperTextFoundation.strings;
                var nextElementSibling = this.root_.nextElementSibling;
                var hasHelperLine = nextElementSibling && nextElementSibling.classList.contains(constants_1.cssClasses.HELPER_LINE);
                var helperTextEl = hasHelperLine && nextElementSibling && nextElementSibling.querySelector(helperTextStrings.ROOT_SELECTOR);
                this.helperText_ = helperTextEl ? helperTextFactory(helperTextEl) : null;
                var characterCounterStrings = foundation_2.MDCTextFieldCharacterCounterFoundation.strings;
                var characterCounterEl = this.root_.querySelector(characterCounterStrings.ROOT_SELECTOR);
                if (!characterCounterEl && hasHelperLine && nextElementSibling) {
                    characterCounterEl = nextElementSibling.querySelector(characterCounterStrings.ROOT_SELECTOR);
                }
                this.characterCounter_ = characterCounterEl ? characterCounterFactory(characterCounterEl) : null;
                this.leadingIcon_ = null;
                this.trailingIcon_ = null;
                var iconElements = this.root_.querySelectorAll(constants_1.strings.ICON_SELECTOR);
                if (iconElements.length > 0) {
                    if (iconElements.length > 1) {
                        this.leadingIcon_ = iconFactory(iconElements[0]);
                        this.trailingIcon_ = iconFactory(iconElements[1]);
                    } else {
                        if (this.root_.classList.contains(constants_1.cssClasses.WITH_LEADING_ICON)) {
                            this.leadingIcon_ = iconFactory(iconElements[0]);
                        } else {
                            this.trailingIcon_ = iconFactory(iconElements[0]);
                        }
                    }
                }
                this.ripple = this.createRipple_(rippleFactory);
            };
            MDCTextField.prototype.destroy = function() {
                if (this.ripple) {
                    this.ripple.destroy();
                }
                if (this.lineRipple_) {
                    this.lineRipple_.destroy();
                }
                if (this.helperText_) {
                    this.helperText_.destroy();
                }
                if (this.characterCounter_) {
                    this.characterCounter_.destroy();
                }
                if (this.leadingIcon_) {
                    this.leadingIcon_.destroy();
                }
                if (this.trailingIcon_) {
                    this.trailingIcon_.destroy();
                }
                if (this.label_) {
                    this.label_.destroy();
                }
                if (this.outline_) {
                    this.outline_.destroy();
                }
                _super.prototype.destroy.call(this);
            };
            MDCTextField.prototype.initialSyncWithDOM = function() {
                this.disabled = this.input_.disabled;
            };
            Object.defineProperty(MDCTextField.prototype, "value", {
                get: function get() {
                    return this.foundation_.getValue();
                },
                set: function set(value) {
                    this.foundation_.setValue(value);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MDCTextField.prototype, "disabled", {
                get: function get() {
                    return this.foundation_.isDisabled();
                },
                set: function set(disabled) {
                    this.foundation_.setDisabled(disabled);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MDCTextField.prototype, "valid", {
                get: function get() {
                    return this.foundation_.isValid();
                },
                set: function set(valid) {
                    this.foundation_.setValid(valid);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MDCTextField.prototype, "required", {
                get: function get() {
                    return this.input_.required;
                },
                set: function set(required) {
                    this.input_.required = required;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MDCTextField.prototype, "pattern", {
                get: function get() {
                    return this.input_.pattern;
                },
                set: function set(pattern) {
                    this.input_.pattern = pattern;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MDCTextField.prototype, "minLength", {
                get: function get() {
                    return this.input_.minLength;
                },
                set: function set(minLength) {
                    this.input_.minLength = minLength;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MDCTextField.prototype, "maxLength", {
                get: function get() {
                    return this.input_.maxLength;
                },
                set: function set(maxLength) {
                    if (maxLength < 0) {
                        this.input_.removeAttribute("maxLength");
                    } else {
                        this.input_.maxLength = maxLength;
                    }
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MDCTextField.prototype, "min", {
                get: function get() {
                    return this.input_.min;
                },
                set: function set(min) {
                    this.input_.min = min;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MDCTextField.prototype, "max", {
                get: function get() {
                    return this.input_.max;
                },
                set: function set(max) {
                    this.input_.max = max;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MDCTextField.prototype, "step", {
                get: function get() {
                    return this.input_.step;
                },
                set: function set(step) {
                    this.input_.step = step;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MDCTextField.prototype, "helperTextContent", {
                set: function set(content) {
                    this.foundation_.setHelperTextContent(content);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MDCTextField.prototype, "leadingIconAriaLabel", {
                set: function set(label) {
                    this.foundation_.setLeadingIconAriaLabel(label);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MDCTextField.prototype, "leadingIconContent", {
                set: function set(content) {
                    this.foundation_.setLeadingIconContent(content);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MDCTextField.prototype, "trailingIconAriaLabel", {
                set: function set(label) {
                    this.foundation_.setTrailingIconAriaLabel(label);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MDCTextField.prototype, "trailingIconContent", {
                set: function set(content) {
                    this.foundation_.setTrailingIconContent(content);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MDCTextField.prototype, "useNativeValidation", {
                set: function set(useNativeValidation) {
                    this.foundation_.setUseNativeValidation(useNativeValidation);
                },
                enumerable: true,
                configurable: true
            });
            MDCTextField.prototype.focus = function() {
                this.input_.focus();
            };
            MDCTextField.prototype.layout = function() {
                var openNotch = this.foundation_.shouldFloat;
                this.foundation_.notchOutline(openNotch);
            };
            MDCTextField.prototype.getDefaultFoundation = function() {
                var adapter = __assign({}, this.getRootAdapterMethods_(), this.getInputAdapterMethods_(), this.getLabelAdapterMethods_(), this.getLineRippleAdapterMethods_(), this.getOutlineAdapterMethods_());
                return new foundation_3.MDCTextFieldFoundation(adapter, this.getFoundationMap_());
            };
            MDCTextField.prototype.getRootAdapterMethods_ = function() {
                var _this = this;
                return {
                    addClass: function addClass(className) {
                        return _this.root_.classList.add(className);
                    },
                    removeClass: function removeClass(className) {
                        return _this.root_.classList.remove(className);
                    },
                    hasClass: function hasClass(className) {
                        return _this.root_.classList.contains(className);
                    },
                    registerTextFieldInteractionHandler: function registerTextFieldInteractionHandler(evtType, handler) {
                        return _this.listen(evtType, handler);
                    },
                    deregisterTextFieldInteractionHandler: function deregisterTextFieldInteractionHandler(evtType, handler) {
                        return _this.unlisten(evtType, handler);
                    },
                    registerValidationAttributeChangeHandler: function registerValidationAttributeChangeHandler(handler) {
                        var getAttributesList = function getAttributesList(mutationsList) {
                            return mutationsList.map(function(mutation) {
                                return mutation.attributeName;
                            }).filter(function(attributeName) {
                                return attributeName;
                            });
                        };
                        var observer = new MutationObserver(function(mutationsList) {
                            return handler(getAttributesList(mutationsList));
                        });
                        var config = {
                            attributes: true
                        };
                        observer.observe(_this.input_, config);
                        return observer;
                    },
                    deregisterValidationAttributeChangeHandler: function deregisterValidationAttributeChangeHandler(observer) {
                        return observer.disconnect();
                    }
                };
            };
            MDCTextField.prototype.getInputAdapterMethods_ = function() {
                var _this = this;
                return {
                    getNativeInput: function getNativeInput() {
                        return _this.input_;
                    },
                    isFocused: function isFocused() {
                        return document.activeElement === _this.input_;
                    },
                    registerInputInteractionHandler: function registerInputInteractionHandler(evtType, handler) {
                        return _this.input_.addEventListener(evtType, handler);
                    },
                    deregisterInputInteractionHandler: function deregisterInputInteractionHandler(evtType, handler) {
                        return _this.input_.removeEventListener(evtType, handler);
                    }
                };
            };
            MDCTextField.prototype.getLabelAdapterMethods_ = function() {
                var _this = this;
                return {
                    floatLabel: function floatLabel(shouldFloat) {
                        return _this.label_ && _this.label_.float(shouldFloat);
                    },
                    getLabelWidth: function getLabelWidth() {
                        return _this.label_ ? _this.label_.getWidth() : 0;
                    },
                    hasLabel: function hasLabel() {
                        return Boolean(_this.label_);
                    },
                    shakeLabel: function shakeLabel(shouldShake) {
                        return _this.label_ && _this.label_.shake(shouldShake);
                    }
                };
            };
            MDCTextField.prototype.getLineRippleAdapterMethods_ = function() {
                var _this = this;
                return {
                    activateLineRipple: function activateLineRipple() {
                        if (_this.lineRipple_) {
                            _this.lineRipple_.activate();
                        }
                    },
                    deactivateLineRipple: function deactivateLineRipple() {
                        if (_this.lineRipple_) {
                            _this.lineRipple_.deactivate();
                        }
                    },
                    setLineRippleTransformOrigin: function setLineRippleTransformOrigin(normalizedX) {
                        if (_this.lineRipple_) {
                            _this.lineRipple_.setRippleCenter(normalizedX);
                        }
                    }
                };
            };
            MDCTextField.prototype.getOutlineAdapterMethods_ = function() {
                var _this = this;
                return {
                    closeOutline: function closeOutline() {
                        return _this.outline_ && _this.outline_.closeNotch();
                    },
                    hasOutline: function hasOutline() {
                        return Boolean(_this.outline_);
                    },
                    notchOutline: function notchOutline(labelWidth) {
                        return _this.outline_ && _this.outline_.notch(labelWidth);
                    }
                };
            };
            MDCTextField.prototype.getFoundationMap_ = function() {
                return {
                    characterCounter: this.characterCounter_ ? this.characterCounter_.foundation : undefined,
                    helperText: this.helperText_ ? this.helperText_.foundation : undefined,
                    leadingIcon: this.leadingIcon_ ? this.leadingIcon_.foundation : undefined,
                    trailingIcon: this.trailingIcon_ ? this.trailingIcon_.foundation : undefined
                };
            };
            MDCTextField.prototype.createRipple_ = function(rippleFactory) {
                var _this = this;
                var isTextArea = this.root_.classList.contains(constants_1.cssClasses.TEXTAREA);
                var isOutlined = this.root_.classList.contains(constants_1.cssClasses.OUTLINED);
                if (isTextArea || isOutlined) {
                    return null;
                }
                var adapter = __assign({}, component_5.MDCRipple.createAdapter(this), {
                    isSurfaceActive: function isSurfaceActive() {
                        return ponyfill.matches(_this.input_, ":active");
                    },
                    registerInteractionHandler: function registerInteractionHandler(evtType, handler) {
                        return _this.input_.addEventListener(evtType, handler);
                    },
                    deregisterInteractionHandler: function deregisterInteractionHandler(evtType, handler) {
                        return _this.input_.removeEventListener(evtType, handler);
                    }
                });
                return rippleFactory(this.root_, new foundation_1.MDCRippleFoundation(adapter));
            };
            return MDCTextField;
        }(component_1.MDCComponent);
        exports.MDCTextField = MDCTextField;
    }, function(module, exports, __webpack_require__) {
        "use strict";
        function __export(m) {
            for (var p in m) {
                if (!exports.hasOwnProperty(p)) exports[p] = m[p];
            }
        }
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        __export(__webpack_require__(88));
        __export(__webpack_require__(29));
        var constants_1 = __webpack_require__(89);
        exports.characterCountCssClasses = constants_1.cssClasses;
        exports.characterCountStrings = constants_1.strings;
    }, function(module, exports, __webpack_require__) {
        "use strict";
        function __export(m) {
            for (var p in m) {
                if (!exports.hasOwnProperty(p)) exports[p] = m[p];
            }
        }
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        __export(__webpack_require__(91));
        __export(__webpack_require__(31));
        var constants_1 = __webpack_require__(92);
        exports.helperTextCssClasses = constants_1.cssClasses;
        exports.helperTextStrings = constants_1.strings;
    }, function(module, exports, __webpack_require__) {
        "use strict";
        function __export(m) {
            for (var p in m) {
                if (!exports.hasOwnProperty(p)) exports[p] = m[p];
            }
        }
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        __export(__webpack_require__(93));
        __export(__webpack_require__(94));
        var constants_1 = __webpack_require__(95);
        exports.iconCssClasses = constants_1.cssClasses;
        exports.iconStrings = constants_1.strings;
    }, function(module, exports, __webpack_require__) {
        "use strict";
        function __export(m) {
            for (var p in m) {
                if (!exports.hasOwnProperty(p)) exports[p] = m[p];
            }
        }
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        __export(__webpack_require__(161));
        __export(__webpack_require__(97));
        __export(__webpack_require__(96));
    }, function(module, exports, __webpack_require__) {
        "use strict";
        var __extends = this && this.__extends || function() {
            var _extendStatics = function extendStatics(d, b) {
                _extendStatics = Object.setPrototypeOf || {
                    __proto__: []
                } instanceof Array && function(d, b) {
                    d.__proto__ = b;
                } || function(d, b) {
                    for (var p in b) {
                        if (b.hasOwnProperty(p)) d[p] = b[p];
                    }
                };
                return _extendStatics(d, b);
            };
            return function(d, b) {
                _extendStatics(d, b);
                function __() {
                    this.constructor = d;
                }
                d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
            };
        }();
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var component_1 = __webpack_require__(1);
        var component_2 = __webpack_require__(2);
        var foundation_1 = __webpack_require__(96);
        var strings = foundation_1.MDCToolbarFoundation.strings;
        var MDCToolbar = function(_super) {
            __extends(MDCToolbar, _super);
            function MDCToolbar() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            MDCToolbar.attachTo = function(root) {
                return new MDCToolbar(root);
            };
            MDCToolbar.prototype.initialize = function() {
                var _this = this;
                this.ripples_ = [];
                this.fixedAdjustElement_ = null;
                this.titleElement_ = this.root_.querySelector(strings.TITLE_SELECTOR);
                var firstRowElement = this.root_.querySelector(strings.FIRST_ROW_SELECTOR);
                if (!firstRowElement) {
                    throw new Error("MDCToolbar: Required sub-element '" + strings.FIRST_ROW_SELECTOR + "' is missing");
                }
                this.firstRowElement_ = firstRowElement;
                [].forEach.call(this.root_.querySelectorAll(strings.ICON_SELECTOR), function(icon) {
                    var ripple = component_2.MDCRipple.attachTo(icon);
                    ripple.unbounded = true;
                    _this.ripples_.push(ripple);
                });
            };
            MDCToolbar.prototype.destroy = function() {
                this.ripples_.forEach(function(ripple) {
                    ripple.destroy();
                });
                _super.prototype.destroy.call(this);
            };
            Object.defineProperty(MDCToolbar.prototype, "fixedAdjustElement", {
                get: function get() {
                    return this.fixedAdjustElement_;
                },
                set: function set(element) {
                    this.fixedAdjustElement_ = element;
                    this.foundation_.updateAdjustElementStyles();
                },
                enumerable: true,
                configurable: true
            });
            MDCToolbar.prototype.getDefaultFoundation = function() {
                var _this = this;
                var adapter = {
                    hasClass: function hasClass(className) {
                        return _this.root_.classList.contains(className);
                    },
                    addClass: function addClass(className) {
                        return _this.root_.classList.add(className);
                    },
                    removeClass: function removeClass(className) {
                        return _this.root_.classList.remove(className);
                    },
                    registerScrollHandler: function registerScrollHandler(handler) {
                        return window.addEventListener("scroll", handler);
                    },
                    deregisterScrollHandler: function deregisterScrollHandler(handler) {
                        return window.removeEventListener("scroll", handler);
                    },
                    registerResizeHandler: function registerResizeHandler(handler) {
                        return window.addEventListener("resize", handler);
                    },
                    deregisterResizeHandler: function deregisterResizeHandler(handler) {
                        return window.removeEventListener("resize", handler);
                    },
                    getViewportWidth: function getViewportWidth() {
                        return window.innerWidth;
                    },
                    getViewportScrollY: function getViewportScrollY() {
                        return window.pageYOffset;
                    },
                    getOffsetHeight: function getOffsetHeight() {
                        return _this.root_.offsetHeight;
                    },
                    getFirstRowElementOffsetHeight: function getFirstRowElementOffsetHeight() {
                        return _this.firstRowElement_.offsetHeight;
                    },
                    notifyChange: function notifyChange(evtData) {
                        return _this.emit(strings.CHANGE_EVENT, evtData);
                    },
                    setStyle: function setStyle(property, value) {
                        return _this.root_.style.setProperty(property, value);
                    },
                    setStyleForTitleElement: function setStyleForTitleElement(property, value) {
                        if (_this.titleElement_) {
                            _this.titleElement_.style.setProperty(property, value);
                        }
                    },
                    setStyleForFlexibleRowElement: function setStyleForFlexibleRowElement(property, value) {
                        return _this.firstRowElement_.style.setProperty(property, value);
                    },
                    setStyleForFixedAdjustElement: function setStyleForFixedAdjustElement(property, value) {
                        if (_this.fixedAdjustElement) {
                            _this.fixedAdjustElement.style.setProperty(property, value);
                        }
                    }
                };
                return new foundation_1.MDCToolbarFoundation(adapter);
            };
            return MDCToolbar;
        }(component_1.MDCComponent);
        exports.MDCToolbar = MDCToolbar;
    }, function(module, exports, __webpack_require__) {
        "use strict";
        function __export(m) {
            for (var p in m) {
                if (!exports.hasOwnProperty(p)) exports[p] = m[p];
            }
        }
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        __export(__webpack_require__(163));
        __export(__webpack_require__(6));
        __export(__webpack_require__(33));
        __export(__webpack_require__(98));
        __export(__webpack_require__(99));
        __export(__webpack_require__(32));
    }, function(module, exports, __webpack_require__) {
        "use strict";
        var __extends = this && this.__extends || function() {
            var _extendStatics = function extendStatics(d, b) {
                _extendStatics = Object.setPrototypeOf || {
                    __proto__: []
                } instanceof Array && function(d, b) {
                    d.__proto__ = b;
                } || function(d, b) {
                    for (var p in b) {
                        if (b.hasOwnProperty(p)) d[p] = b[p];
                    }
                };
                return _extendStatics(d, b);
            };
            return function(d, b) {
                _extendStatics(d, b);
                function __() {
                    this.constructor = d;
                }
                d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
            };
        }();
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var component_1 = __webpack_require__(1);
        var component_2 = __webpack_require__(2);
        var constants_1 = __webpack_require__(6);
        var foundation_1 = __webpack_require__(98);
        var foundation_2 = __webpack_require__(99);
        var foundation_3 = __webpack_require__(32);
        var MDCTopAppBar = function(_super) {
            __extends(MDCTopAppBar, _super);
            function MDCTopAppBar() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            MDCTopAppBar.attachTo = function(root) {
                return new MDCTopAppBar(root);
            };
            MDCTopAppBar.prototype.initialize = function(rippleFactory) {
                if (rippleFactory === void 0) {
                    rippleFactory = function rippleFactory(el) {
                        return component_2.MDCRipple.attachTo(el);
                    };
                }
                this.navIcon_ = this.root_.querySelector(constants_1.strings.NAVIGATION_ICON_SELECTOR);
                var icons = [].slice.call(this.root_.querySelectorAll(constants_1.strings.ACTION_ITEM_SELECTOR));
                if (this.navIcon_) {
                    icons.push(this.navIcon_);
                }
                this.iconRipples_ = icons.map(function(icon) {
                    var ripple = rippleFactory(icon);
                    ripple.unbounded = true;
                    return ripple;
                });
                this.scrollTarget_ = window;
            };
            MDCTopAppBar.prototype.destroy = function() {
                this.iconRipples_.forEach(function(iconRipple) {
                    return iconRipple.destroy();
                });
                _super.prototype.destroy.call(this);
            };
            MDCTopAppBar.prototype.setScrollTarget = function(target) {
                this.foundation_.destroyScrollHandler();
                this.scrollTarget_ = target;
                this.foundation_.initScrollHandler();
            };
            MDCTopAppBar.prototype.getDefaultFoundation = function() {
                var _this = this;
                var adapter = {
                    hasClass: function hasClass(className) {
                        return _this.root_.classList.contains(className);
                    },
                    addClass: function addClass(className) {
                        return _this.root_.classList.add(className);
                    },
                    removeClass: function removeClass(className) {
                        return _this.root_.classList.remove(className);
                    },
                    setStyle: function setStyle(property, value) {
                        return _this.root_.style.setProperty(property, value);
                    },
                    getTopAppBarHeight: function getTopAppBarHeight() {
                        return _this.root_.clientHeight;
                    },
                    registerNavigationIconInteractionHandler: function registerNavigationIconInteractionHandler(evtType, handler) {
                        if (_this.navIcon_) {
                            _this.navIcon_.addEventListener(evtType, handler);
                        }
                    },
                    deregisterNavigationIconInteractionHandler: function deregisterNavigationIconInteractionHandler(evtType, handler) {
                        if (_this.navIcon_) {
                            _this.navIcon_.removeEventListener(evtType, handler);
                        }
                    },
                    notifyNavigationIconClicked: function notifyNavigationIconClicked() {
                        return _this.emit(constants_1.strings.NAVIGATION_EVENT, {});
                    },
                    registerScrollHandler: function registerScrollHandler(handler) {
                        return _this.scrollTarget_.addEventListener("scroll", handler);
                    },
                    deregisterScrollHandler: function deregisterScrollHandler(handler) {
                        return _this.scrollTarget_.removeEventListener("scroll", handler);
                    },
                    registerResizeHandler: function registerResizeHandler(handler) {
                        return window.addEventListener("resize", handler);
                    },
                    deregisterResizeHandler: function deregisterResizeHandler(handler) {
                        return window.removeEventListener("resize", handler);
                    },
                    getViewportScrollY: function getViewportScrollY() {
                        var win = _this.scrollTarget_;
                        var el = _this.scrollTarget_;
                        return win.pageYOffset !== undefined ? win.pageYOffset : el.scrollTop;
                    },
                    getTotalActionItems: function getTotalActionItems() {
                        return _this.root_.querySelectorAll(constants_1.strings.ACTION_ITEM_SELECTOR).length;
                    }
                };
                var foundation;
                if (this.root_.classList.contains(constants_1.cssClasses.SHORT_CLASS)) {
                    foundation = new foundation_2.MDCShortTopAppBarFoundation(adapter);
                } else if (this.root_.classList.contains(constants_1.cssClasses.FIXED_CLASS)) {
                    foundation = new foundation_1.MDCFixedTopAppBarFoundation(adapter);
                } else {
                    foundation = new foundation_3.MDCTopAppBarFoundation(adapter);
                }
                return foundation;
            };
            return MDCTopAppBar;
        }(component_1.MDCComponent);
        exports.MDCTopAppBar = MDCTopAppBar;
    } ]);
});
//# sourceMappingURL=material-components-web.js.map