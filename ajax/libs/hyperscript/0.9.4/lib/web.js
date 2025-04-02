///=========================================================================
/// This module provides the core web functionality for hyperscript
///=========================================================================

import { mergeObjects } from "./utils.js"

/**
 * @param {HyperscriptObject} _hyperscript
 */
export default _hyperscript => {
	_hyperscript.addCommand("settle", function (parser, runtime, tokens) {
		if (tokens.matchToken("settle")) {
			if (!parser.commandBoundary(tokens.currentToken())) {
				var onExpr = parser.requireElement("expression", tokens);
			} else {
				var onExpr = parser.requireElement("implicitMeTarget", tokens);
			}

			var settleCommand = {
				type: "settleCmd",
				args: [onExpr],
				op: function (context, on) {
					runtime.nullCheck(on, onExpr);
					var resolve = null;
					var resolved = false;
					var transitionStarted = false;

					var promise = new Promise(function (r) {
						resolve = r;
					});

					// listen for a transition begin
					on.addEventListener(
						"transitionstart",
						function () {
							transitionStarted = true;
						},
						{ once: true }
					);

					// if no transition begins in 500ms, cancel
					setTimeout(function () {
						if (!transitionStarted && !resolved) {
							resolve(runtime.findNext(settleCommand, context));
						}
					}, 500);

					// continue on a transition emd
					on.addEventListener(
						"transitionend",
						function () {
							if (!resolved) {
								resolve(runtime.findNext(settleCommand, context));
							}
						},
						{ once: true }
					);
					return promise;
				},
				execute: function (context) {
					return runtime.unifiedExec(this, context);
				},
			};
			return settleCommand;
		}
	});

	_hyperscript.addCommand("add", function (parser, runtime, tokens) {
		if (tokens.matchToken("add")) {
			var classRef = parser.parseElement("classRef", tokens);
			var attributeRef = null;
			var cssDeclaration = null;
			if (classRef == null) {
				attributeRef = parser.parseElement("attributeRef", tokens);
				if (attributeRef == null) {
					cssDeclaration = parser.parseElement("styleLiteral", tokens);
					if (cssDeclaration == null) {
						parser.raiseParseError(tokens, "Expected either a class reference or attribute expression");
					}
				}
			} else {
				var classRefs = [classRef];
				while ((classRef = parser.parseElement("classRef", tokens))) {
					classRefs.push(classRef);
				}
			}

			if (tokens.matchToken("to")) {
				var toExpr = parser.requireElement("expression", tokens);
			} else {
				var toExpr = parser.requireElement("implicitMeTarget", tokens);
			}

			if (classRefs) {
				return {
					classRefs: classRefs,
					to: toExpr,
					args: [toExpr, classRefs],
					op: function (context, to, classRefs) {
						runtime.nullCheck(to, toExpr);
						runtime.forEach(classRefs, function (classRef) {
							runtime.implicitLoop(to, function (target) {
								if (target instanceof Element) target.classList.add(classRef.className);
							});
						});
						return runtime.findNext(this, context);
					},
				};
			} else if (attributeRef) {
				return {
					type: "addCmd",
					attributeRef: attributeRef,
					to: toExpr,
					args: [toExpr],
					op: function (context, to, attrRef) {
						runtime.nullCheck(to, toExpr);
						runtime.implicitLoop(to, function (target) {
							target.setAttribute(attributeRef.name, attributeRef.value);
						});
						return runtime.findNext(this, context);
					},
					execute: function (ctx) {
						return runtime.unifiedExec(this, ctx);
					},
				};
			} else {
				return {
					type: "addCmd",
					cssDeclaration: cssDeclaration,
					to: toExpr,
					args: [toExpr, cssDeclaration],
					op: function (context, to, css) {
						runtime.nullCheck(to, toExpr);
						runtime.implicitLoop(to, function (target) {
							target.style.cssText += css;
						});
						return runtime.findNext(this, context);
					},
					execute: function (ctx) {
						return runtime.unifiedExec(this, ctx);
					},
				};
			}
		}
	});

	_hyperscript.internals.parser.addGrammarElement("styleLiteral", function (parser, runtime, tokens) {
		if (!tokens.matchOpToken("{")) return;

		var stringParts = [""]
		var exprs = []

		while (tokens.hasMore()) {
			if (tokens.matchOpToken("\\")) {
				tokens.consumeToken();
			} else if (tokens.matchOpToken("}")) {
				break;
			} else if (tokens.matchToken("$")) {
				var opencurly = tokens.matchOpToken("{");
				var expr = parser.parseElement("expression", tokens);
				if (opencurly) tokens.requireOpToken("}");

				exprs.push(expr)
				stringParts.push("")
			} else {
				var tok = tokens.consumeToken();
				stringParts[stringParts.length-1] += tokens.source.substring(tok.start, tok.end);
			}

			stringParts[stringParts.length-1] += tokens.lastWhitespace();
		}

		return {
			type: "styleLiteral",
			args: [exprs],
			op: function (ctx, exprs) {
				var rv = "";

				stringParts.forEach(function (part, idx) {
					rv += part;
					if (idx in exprs) rv += exprs[idx];
				});

				return rv;
			},
			evaluate: function(ctx) {
				return runtime.unifiedEval(this, ctx);
			}
		}
	})

	_hyperscript.addCommand("remove", function (parser, runtime, tokens) {
		if (tokens.matchToken("remove")) {
			var classRef = parser.parseElement("classRef", tokens);
			var attributeRef = null;
			var elementExpr = null;
			if (classRef == null) {
				attributeRef = parser.parseElement("attributeRef", tokens);
				if (attributeRef == null) {
					elementExpr = parser.parseElement("expression", tokens);
					if (elementExpr == null) {
						parser.raiseParseError(
							tokens,
							"Expected either a class reference, attribute expression or value expression"
						);
					}
				}
			} else {
				var classRefs = [classRef];
				while ((classRef = parser.parseElement("classRef", tokens))) {
					classRefs.push(classRef);
				}
			}

			if (tokens.matchToken("from")) {
				var fromExpr = parser.requireElement("expression", tokens);
			} else {
				var fromExpr = parser.requireElement("implicitMeTarget", tokens);
			}

			if (elementExpr) {
				return {
					elementExpr: elementExpr,
					from: fromExpr,
					args: [elementExpr],
					op: function (context, element) {
						runtime.nullCheck(element, elementExpr);
						runtime.implicitLoop(element, function (target) {
							if (target.parentElement) {
								target.parentElement.removeChild(target);
							}
						});
						return runtime.findNext(this, context);
					},
				};
			} else {
				return {
					classRefs: classRefs,
					attributeRef: attributeRef,
					elementExpr: elementExpr,
					from: fromExpr,
					args: [classRefs, fromExpr],
					op: function (context, classRefs, from) {
						runtime.nullCheck(from, fromExpr);
						if (classRefs) {
							runtime.forEach(classRefs, function (classRef) {
								runtime.implicitLoop(from, function (target) {
									target.classList.remove(classRef.className);
								});
							});
						} else {
							runtime.implicitLoop(from, function (target) {
								target.removeAttribute(attributeRef.name);
							});
						}
						return runtime.findNext(this, context);
					},
				};
			}
		}
	});

	_hyperscript.addCommand("toggle", function (parser, runtime, tokens) {
		if (tokens.matchToken("toggle")) {
			tokens.matchAnyToken("the", "my");
			if (tokens.currentToken().type === "STYLE_REF") {
				let styleRef = tokens.consumeToken();
				var name = styleRef.value.substr(1);
				var visibility = true;
				var hideShowStrategy = resolveStrategy(parser, tokens, name);
				if (tokens.matchToken("of")) {
					tokens.pushFollow("with");
					try {
						var onExpr = parser.requireElement("expression", tokens);
					} finally {
						tokens.popFollow();
					}
				} else {
					var onExpr = parser.requireElement("implicitMeTarget", tokens);
				}
			} else if (tokens.matchToken("between")) {
				var between = true;
				var classRef = parser.parseElement("classRef", tokens);
				tokens.requireToken("and");
				var classRef2 = parser.requireElement("classRef", tokens);
			} else {
				var classRef = parser.parseElement("classRef", tokens);
				var attributeRef = null;
				if (classRef == null) {
					attributeRef = parser.parseElement("attributeRef", tokens);
					if (attributeRef == null) {
						parser.raiseParseError(tokens, "Expected either a class reference or attribute expression");
					}
				} else {
					var classRefs = [classRef];
					while ((classRef = parser.parseElement("classRef", tokens))) {
						classRefs.push(classRef);
					}
				}
			}

			if (visibility !== true) {
				if (tokens.matchToken("on")) {
					var onExpr = parser.requireElement("expression", tokens);
				} else {
					var onExpr = parser.requireElement("implicitMeTarget", tokens);
				}
			}

			if (tokens.matchToken("for")) {
				var time = parser.requireElement("expression", tokens);
			} else if (tokens.matchToken("until")) {
				var evt = parser.requireElement("dotOrColonPath", tokens, "Expected event name");
				if (tokens.matchToken("from")) {
					var from = parser.requireElement("expression", tokens);
				}
			}

			var toggleCmd = {
				classRef: classRef,
				classRef2: classRef2,
				classRefs: classRefs,
				attributeRef: attributeRef,
				on: onExpr,
				time: time,
				evt: evt,
				from: from,
				toggle: function (on, classRef, classRef2, classRefs) {
					runtime.nullCheck(on, onExpr);
					if (visibility) {
						runtime.implicitLoop(on, function (target) {
							hideShowStrategy("toggle", target);
						});
					} else if (between) {
						runtime.implicitLoop(on, function (target) {
							if (target.classList.contains(classRef.className)) {
								target.classList.remove(classRef.className);
								target.classList.add(classRef2.className);
							} else {
								target.classList.add(classRef.className);
								target.classList.remove(classRef2.className);
							}
						});
					} else if (classRefs) {
						runtime.forEach(classRefs, function (classRef) {
							runtime.implicitLoop(on, function (target) {
								target.classList.toggle(classRef.className);
							});
						});
					} else {
						runtime.forEach(on, function (target) {
							if (target.hasAttribute(attributeRef.name)) {
								target.removeAttribute(attributeRef.name);
							} else {
								target.setAttribute(attributeRef.name, attributeRef.value);
							}
						});
					}
				},
				args: [onExpr, time, evt, from, classRef, classRef2, classRefs],
				op: function (context, on, time, evt, from, classRef, classRef2, classRefs) {
					if (time) {
						return new Promise(function (resolve) {
							toggleCmd.toggle(on, classRef, classRef2, classRefs);
							setTimeout(function () {
								toggleCmd.toggle(on, classRef, classRef2, classRefs);
								resolve(runtime.findNext(toggleCmd, context));
							}, time);
						});
					} else if (evt) {
						return new Promise(function (resolve) {
							var target = from || context.me;
							target.addEventListener(
								evt,
								function () {
									toggleCmd.toggle(on, classRef, classRef2, classRefs);
									resolve(runtime.findNext(toggleCmd, context));
								},
								{ once: true }
							);
							toggleCmd.toggle(on, classRef, classRef2, classRefs);
						});
					} else {
						this.toggle(on, classRef, classRef2, classRefs);
						return runtime.findNext(toggleCmd, context);
					}
				},
			};
			return toggleCmd;
		}
	});

	var HIDE_SHOW_STRATEGIES = {
		display: function (op, element, arg) {
			if (arg) {
				element.style.display = arg;
			} else if (op === "toggle") {
				if (getComputedStyle(element).display === "none") {
					HIDE_SHOW_STRATEGIES.display("show", element, arg);
				} else {
					HIDE_SHOW_STRATEGIES.display("hide", element, arg);
				}
			} else if (op === "hide") {
				const internalData = _hyperscript.internals.runtime.getInternalData(element);
				if (internalData.originalDisplay == null) {
					internalData.originalDisplay = element.style.display;
				}
				element.style.display = "none";
			} else {
				const internalData = _hyperscript.internals.runtime.getInternalData(element);
				if (internalData.originalDisplay && internalData.originalDisplay !== 'none') {
					element.style.display = internalData.originalDisplay;
				} else {
					element.style.removeProperty('display');
				}
			}
		},
		visibility: function (op, element, arg) {
			if (arg) {
				element.style.visibility = arg;
			} else if (op === "toggle") {
				if (getComputedStyle(element).visibility === "hidden") {
					HIDE_SHOW_STRATEGIES.visibility("show", element, arg);
				} else {
					HIDE_SHOW_STRATEGIES.visibility("hide", element, arg);
				}
			} else if (op === "hide") {
				element.style.visibility = "hidden";
			} else {
				element.style.visibility = "visible";
			}
		},
		opacity: function (op, element, arg) {
			if (arg) {
				element.style.opacity = arg;
			} else if (op === "toggle") {
				if (getComputedStyle(element).opacity === "0") {
					HIDE_SHOW_STRATEGIES.opacity("show", element, arg);
				} else {
					HIDE_SHOW_STRATEGIES.opacity("hide", element, arg);
				}
			} else if (op === "hide") {
				element.style.opacity = "0";
			} else {
				element.style.opacity = "1";
			}
		},
	};

	var parseShowHideTarget = function (parser, runtime, tokens) {
		var target;
		var currentTokenValue = tokens.currentToken();
		if (currentTokenValue.value === "when" || currentTokenValue.value === "with" || parser.commandBoundary(currentTokenValue)) {
			target = parser.parseElement("implicitMeTarget", tokens);
		} else {
			target = parser.parseElement("expression", tokens);
		}
		return target;
	};

	var resolveStrategy = function (parser, tokens, name) {
		var configDefault = _hyperscript.config.defaultHideShowStrategy;
		var strategies = HIDE_SHOW_STRATEGIES;
		if (_hyperscript.config.hideShowStrategies) {
			strategies = mergeObjects(strategies, _hyperscript.config.hideShowStrategies); // merge in user provided strategies
		}
		name = name || configDefault || "display";
		var value = strategies[name];
		if (value == null) {
			parser.raiseParseError(tokens, "Unknown show/hide strategy : " + name);
		}
		return value;
	};

	_hyperscript.addCommand("hide", function (parser, runtime, tokens) {
		if (tokens.matchToken("hide")) {
			var targetExpr = parseShowHideTarget(parser, runtime, tokens);

			var name = null;
			if (tokens.matchToken("with")) {
				name = tokens.requireTokenType("IDENTIFIER", "STYLE_REF").value;
				if (name.indexOf("*") === 0) {
					name = name.substr(1);
				}
			}
			var hideShowStrategy = resolveStrategy(parser, tokens, name);

			return {
				target: targetExpr,
				args: [targetExpr],
				op: function (ctx, target) {
					runtime.nullCheck(target, targetExpr);
					runtime.implicitLoop(target, function (elt) {
						hideShowStrategy("hide", elt);
					});
					return runtime.findNext(this, ctx);
				},
			};
		}
	});

	_hyperscript.addCommand("show", function (parser, runtime, tokens) {
		if (tokens.matchToken("show")) {
			var targetExpr = parseShowHideTarget(parser, runtime, tokens);

			var name = null;
			if (tokens.matchToken("with")) {
				name = tokens.requireTokenType("IDENTIFIER", "STYLE_REF").value;
				if (name.indexOf("*") === 0) {
					name = name.substr(1);
				}
			}
			var arg = null;
			if (tokens.matchOpToken(":")) {
				var tokenArr = tokens.consumeUntilWhitespace();
				tokens.matchTokenType("WHITESPACE");
				arg = tokenArr
					.map(function (t) {
						return t.value;
					})
					.join("");
			}

			if (tokens.matchToken("when")) {
				var when = parser.requireElement("expression", tokens);
			}

			var hideShowStrategy = resolveStrategy(parser, tokens, name);

			return {
				target: targetExpr,
				when: when,
				args: [targetExpr],
				op: function (ctx, target) {
					runtime.nullCheck(target, targetExpr);
					runtime.implicitLoop(target, function (elt) {
						if (when) {
							ctx['result'] = elt;
							let whenResult = runtime.evaluateNoPromise(when, ctx);
							if (whenResult) {
								hideShowStrategy("show", elt, arg);
							} else {
								hideShowStrategy("hide", elt);
							}
							ctx['result'] = null;
						} else {
							hideShowStrategy("show", elt, arg);
						}
					});
					return runtime.findNext(this, ctx);
				},
			};
		}
	});

	_hyperscript.addCommand("take", function (parser, runtime, tokens) {
		if (tokens.matchToken("take")) {
			var classRef = parser.requireElement("classRef", tokens);

			if (tokens.matchToken("from")) {
				var fromExpr = parser.requireElement("expression", tokens);
			} else {
				var fromExpr = classRef;
			}

			if (tokens.matchToken("for")) {
				var forExpr = parser.requireElement("expression", tokens);
			} else {
				var forExpr = parser.requireElement("implicitMeTarget", tokens);
			}

			var takeCmd = {
				classRef: classRef,
				from: fromExpr,
				forElt: forExpr,
				args: [classRef, fromExpr, forExpr],
				op: function (context, eltColl, from, forElt) {
					runtime.nullCheck(from, fromExpr);
					runtime.nullCheck(forElt, forExpr);
					var clazz = eltColl.className;
					runtime.implicitLoop(from, function (target) {
						target.classList.remove(clazz);
					});
					runtime.implicitLoop(forElt, function (target) {
						target.classList.add(clazz);
					});
					return runtime.findNext(this, context);
				},
			};
			return takeCmd;
		}
	});

	function putInto(runtime, context, prop, valueToPut) {
		if (prop) {
			var value = runtime.resolveSymbol(prop, context);
		} else {
			var value = context;
		}
		if (value instanceof Element || value instanceof HTMLDocument) {
			while (value.firstChild) value.removeChild(value.firstChild);
			value.append(_hyperscript.internals.runtime.convertValue(valueToPut, "Fragment"));
		} else {
			if (prop) {
				runtime.setSymbol(prop, context, null, valueToPut);
			} else {
				throw "Don't know how to put a value into " + typeof context;
			}
		}
	}

	_hyperscript.addCommand("put", function (parser, runtime, tokens) {
		if (tokens.matchToken("put")) {
			var value = parser.requireElement("expression", tokens);

			var operationToken = tokens.matchAnyToken("into", "before", "after");

			if (operationToken == null && tokens.matchToken("at")) {
				tokens.matchToken("the"); // optional "the"
				operationToken = tokens.matchAnyToken("start", "end");
				tokens.requireToken("of");
			}

			if (operationToken == null) {
				parser.raiseParseError(tokens, "Expected one of 'into', 'before', 'at start of', 'at end of', 'after'");
			}
			var target = parser.requireElement("expression", tokens);

			var operation = operationToken.value;

			var symbolWrite = false;
			var rootExpr = null;
			var prop = null;
			if (target.prop && target.root && operation === "into") {
				prop = target.prop.value;
				rootExpr = target.root;
			} else if (target.type === "symbol" && operation === "into") {
				symbolWrite = true;
				prop = target.name;
			} else if (target.type === "attributeRef" && operation === "into") {
				var attributeWrite = true;
				prop = target.name;
				rootExpr = parser.requireElement("implicitMeTarget", tokens);
			} else if (target.type === "styleRef" && operation === "into") {
				var styleWrite = true;
				prop = target.name;
				rootExpr = parser.requireElement("implicitMeTarget", tokens);
			} else if (target.attribute && operation === "into") {
				var attributeWrite = target.attribute.type === "attributeRef";
				var styleWrite = target.attribute.type === "styleRef";
				prop = target.attribute.name;
				rootExpr = target.root;
			} else {
				rootExpr = target;
			}

			var putCmd = {
				target: target,
				operation: operation,
				symbolWrite: symbolWrite,
				value: value,
				args: [rootExpr, value],
				op: function (context, root, valueToPut) {
					if (symbolWrite) {
						putInto(runtime, context, prop, valueToPut);
					} else {
						runtime.nullCheck(root, rootExpr);
						if (operation === "into") {
							if (attributeWrite) {
								runtime.implicitLoop(root, function (elt) {
									elt.setAttribute(prop, valueToPut);
								});
							} else if (styleWrite) {
								runtime.implicitLoop(root, function (elt) {
									elt.style[prop] = valueToPut;
								});
							} else {
								runtime.implicitLoop(root, function (elt) {
									putInto(runtime, elt, prop, valueToPut);
								});
							}
						} else {
							var op =
								operation === "before"
									? Element.prototype.before
									: operation === "after"
									? Element.prototype.after
									: operation === "start"
									? Element.prototype.prepend
									: operation === "end"
									? Element.prototype.append
									: Element.prototype.append; // unreachable

							runtime.implicitLoop(root, function (elt) {
								op.call(
									elt,
									valueToPut instanceof Node
										? valueToPut
										: runtime.convertValue(valueToPut, "Fragment")
								);
							});
						}
					}
					return runtime.findNext(this, context);
				},
			};
			return putCmd;
		}
	});

	function parsePseudopossessiveTarget(parser, runtime, tokens) {
		var targets;
		if (
			tokens.matchToken("the") ||
			tokens.matchToken("element") ||
			tokens.matchToken("elements") ||
			tokens.currentToken().type === "CLASS_REF" ||
			tokens.currentToken().type === "ID_REF" ||
			(tokens.currentToken().op && tokens.currentToken().value === "<")
		) {
			parser.possessivesDisabled = true;
			try {
				targets = parser.parseElement("expression", tokens);
			} finally {
				delete parser.possessivesDisabled;
			}
			// optional possessive
			if (tokens.matchOpToken("'")) {
				tokens.requireToken("s");
			}
		} else if (tokens.currentToken().type === "IDENTIFIER" && tokens.currentToken().value === "its") {
			var identifier = tokens.matchToken("its");
			targets = {
				type: "pseudopossessiveIts",
				token: identifier,
				name: identifier.value,
				evaluate: function (context) {
					return runtime.resolveSymbol("it", context);
				},
			};
		} else {
			tokens.matchToken("my") || tokens.matchToken("me"); // consume optional 'my'
			targets = parser.parseElement("implicitMeTarget", tokens);
		}
		return targets;
	}

	_hyperscript.addCommand("transition", function (parser, runtime, tokens) {
		if (tokens.matchToken("transition")) {
			var targetsExpr = parsePseudopossessiveTarget(parser, runtime, tokens);

			var properties = [];
			var from = [];
			var to = [];
			var currentToken = tokens.currentToken();
			while (
				!parser.commandBoundary(currentToken) &&
				currentToken.value !== "over" &&
				currentToken.value !== "using"
			) {
				if (tokens.currentToken().type === "STYLE_REF") {
					let styleRef = tokens.consumeToken();
					let styleProp = styleRef.value.substr(1);
					properties.push({
						type: "styleRefValue",
						evaluate: function () {
							return styleProp;
						},
					});
				} else {
					properties.push(parser.requireElement("stringLike", tokens));
				}

				if (tokens.matchToken("from")) {
					from.push(parser.requireElement("expression", tokens));
				} else {
					from.push(null);
				}
				tokens.requireToken("to");
				if (tokens.matchToken("initial")) {
					to.push({
						type: "initial_literal",
						evaluate : function(){
							return "initial";
						}
					});
				} else {
					to.push(parser.requireElement("expression", tokens));
				}
				currentToken = tokens.currentToken();
			}
			if (tokens.matchToken("over")) {
				var over = parser.requireElement("expression", tokens);
			} else if (tokens.matchToken("using")) {
				var using = parser.requireElement("expression", tokens);
			}

			var transition = {
				to: to,
				args: [targetsExpr, properties, from, to, using, over],
				op: function (context, targets, properties, from, to, using, over) {
					runtime.nullCheck(targets, targetsExpr);
					var promises = [];
					runtime.implicitLoop(targets, function (target) {
						var promise = new Promise(function (resolve, reject) {
							var initialTransition = target.style.transition;
							if (over) {
								target.style.transition = "all " + over + "ms ease-in";
							} else if (using) {
								target.style.transition = using;
							} else {
								target.style.transition = _hyperscript.config.defaultTransition;
							}
							var internalData = runtime.getInternalData(target);
							var computedStyles = getComputedStyle(target);

							var initialStyles = {};
							for (var i = 0; i < computedStyles.length; i++) {
								var name = computedStyles[i];
								var initialValue = computedStyles[name];
								initialStyles[name] = initialValue;
							}

							// store intitial values
							if (!internalData.initalStyles) {
								internalData.initalStyles = initialStyles;
							}

							for (var i = 0; i < properties.length; i++) {
								var property = properties[i];
								var fromVal = from[i];
								if (fromVal === "computed" || fromVal == null) {
									target.style[property] = initialStyles[property];
								} else {
									target.style[property] = fromVal;
								}
							}
							//console.log("transition started", transition);

							var transitionStarted = false;
							var resolved = false;

							target.addEventListener(
								"transitionend",
								function () {
									if (!resolved) {
										//console.log("transition ended", transition);
										target.style.transition = initialTransition;
										resolved = true;
										resolve();
									}
								},
								{ once: true }
							);

							target.addEventListener(
								"transitionstart",
								function () {
									transitionStarted = true;
								},
								{ once: true }
							);

							// it no transition has started in 100ms, continue
							setTimeout(function () {
								if (!resolved && !transitionStarted) {
									//console.log("transition ended", transition);
									target.style.transition = initialTransition;
									resolved = true;
									resolve();
								}
							}, 100);

							setTimeout(function () {
								var autoProps = [];
								for (var i = 0; i < properties.length; i++) {
									var property = properties[i];
									var toVal = to[i];
									if (toVal === "initial") {
										var propertyValue = internalData.initalStyles[property];
										target.style[property] = propertyValue;
									} else {
										target.style[property] = toVal;
									}
									//console.log("set", property, "to", target.style[property], "on", target, "value passed in : ", toVal);
								}
							}, 0);
						});
						promises.push(promise);
					});
					return Promise.all(promises).then(function () {
						return runtime.findNext(transition, context);
					});
				},
			};
			return transition;
		}
	});

	_hyperscript.addCommand("measure", function (parser, runtime, tokens) {
		if (!tokens.matchToken("measure")) return;

		var targetExpr = parsePseudopossessiveTarget(parser, runtime, tokens);

		var propsToMeasure = [];
		if (!parser.commandBoundary(tokens.currentToken()))
			do {
				propsToMeasure.push(tokens.matchTokenType("IDENTIFIER").value);
			} while (tokens.matchOpToken(","));

		return {
			properties: propsToMeasure,
			args: [targetExpr],
			op: function (ctx, target) {
				runtime.nullCheck(target, targetExpr);
				if (0 in target) target = target[0]; // not measuring multiple elts
				var rect = target.getBoundingClientRect();
				var scroll = {
					top: target.scrollTop,
					left: target.scrollLeft,
					topMax: target.scrollTopMax,
					leftMax: target.scrollLeftMax,
					height: target.scrollHeight,
					width: target.scrollWidth,
				};

				ctx.result = {
					x: rect.x,
					y: rect.y,
					left: rect.left,
					top: rect.top,
					right: rect.right,
					bottom: rect.bottom,
					width: rect.width,
					height: rect.height,
					bounds: rect,

					scrollLeft: scroll.left,
					scrollTop: scroll.top,
					scrollLeftMax: scroll.leftMax,
					scrollTopMax: scroll.topMax,
					scrollWidth: scroll.width,
					scrollHeight: scroll.height,
					scroll: scroll,
				};

				runtime.forEach(propsToMeasure, function (prop) {
					if (prop in ctx.result) ctx[prop] = ctx.result[prop];
					else throw "No such measurement as " + prop;
				});

				return runtime.findNext(this, ctx);
			},
		};
	});

	_hyperscript.addLeafExpression("closestExpr", function (parser, runtime, tokens) {
		if (tokens.matchToken("closest")) {
			if (tokens.matchToken("parent")) {
				var parentSearch = true;
			}

			var css = null;
			if (tokens.currentToken().type === "ATTRIBUTE_REF") {
				var attributeRef = parser.requireElement("attributeRefAccess", tokens, null);
				css = "[" + attributeRef.attribute.name + "]";
			}

			if (css == null) {
				var expr = parser.requireElement("expression", tokens);
				if (expr.css == null) {
					parser.raiseParseError(tokens, "Expected a CSS expression");
				} else {
					css = expr.css;
				}
			}

			if (tokens.matchToken("to")) {
				var to = parser.parseElement("expression", tokens);
			} else {
				var to = parser.parseElement("implicitMeTarget", tokens);
			}

			var closestExpr = {
				type: "closestExpr",
				parentSearch: parentSearch,
				expr: expr,
				css: css,
				to: to,
				args: [to],
				op: function (ctx, to) {
					if (to == null || !(to instanceof Element)) {
						return null;
					} else {
						if (parentSearch) {
							var node = to.parentElement ? to.parentElement.closest(css) : null;
						} else {
							var node = to.closest(css);
						}
						return node;
					}
				},
				evaluate: function (context) {
					return runtime.unifiedEval(this, context);
				},
			};

			if (attributeRef) {
				attributeRef.root = closestExpr;
				attributeRef.args = [closestExpr];
				return attributeRef;
			} else {
				return closestExpr;
			}
		}
	});

	_hyperscript.addCommand("go", function (parser, runtime, tokens) {
		if (tokens.matchToken("go")) {
			if (tokens.matchToken("back")) {
				var back = true;
			} else {
				tokens.matchToken("to");
				if (tokens.matchToken("url")) {
					var target = parser.requireElement("stringLike", tokens);
					var url = true;
					if (tokens.matchToken("in")) {
						tokens.requireToken("new");
						tokens.requireToken("window");
						var newWindow = true;
					}
				} else {
					tokens.matchToken("the"); // optional the
					var verticalPosition = tokens.matchAnyToken("top", "bottom", "middle");
					var horizontalPosition = tokens.matchAnyToken("left", "center", "right");
					if (verticalPosition || horizontalPosition) {
						tokens.requireToken("of");
					}
					var target = parser.requireElement("expression", tokens);
					var smoothness = tokens.matchAnyToken("smoothly", "instantly");

					var scrollOptions = {};
					if (verticalPosition) {
						if (verticalPosition.value === "top") {
							scrollOptions.block = "start";
						} else if (verticalPosition.value === "bottom") {
							scrollOptions.block = "end";
						} else if (verticalPosition.value === "middle") {
							scrollOptions.block = "center";
						}
					}

					if (horizontalPosition) {
						if (horizontalPosition.value === "left") {
							scrollOptions.inline = "start";
						} else if (horizontalPosition.value === "center") {
							scrollOptions.inline = "center";
						} else if (horizontalPosition.value === "right") {
							scrollOptions.inline = "end";
						}
					}

					if (smoothness) {
						if (smoothness.value === "smoothly") {
							scrollOptions.behavior = "smooth";
						} else if (smoothness.value === "instantly") {
							scrollOptions.behavior = "instant";
						}
					}
				}
			}

			var goCmd = {
				target: target,
				args: [target],
				op: function (ctx, to) {
					if (back) {
						window.history.back();
					} else if (url) {
						if (to) {
							if (to.indexOf("#") === 0 && !newWindow) {
								window.location.href = to;
							} else {
								window.open(to, newWindow ? "_blank" : null);
							}
						}
					} else {
						runtime.forEach(to, function (target) {
							target.scrollIntoView(scrollOptions);
						});
					}
					return runtime.findNext(goCmd, ctx);
				},
			};
			return goCmd;
		}
	});

	_hyperscript.config.conversions["Values"] = function (/** @type {Node | NodeList} */ node) {
		/** @type Object<string,string | string[]> */
		var result = {};

		var implicitLoop = _hyperscript.internals.runtime.implicitLoop;

		implicitLoop(node, function (/** @type HTMLInputElement */ node) {
			// Try to get a value directly from this node
			var input = getInputInfo(node);

			if (input !== undefined) {
				result[input.name] = input.value;
				return;
			}

			// Otherwise, try to query all child elements of this node that *should* contain values.
			if (node.querySelectorAll != undefined) {
				var children = node.querySelectorAll("input,select,textarea");
				children.forEach(appendValue);
			}
		});

		return result;

		/**
		 * @param {HTMLInputElement} node
		 */
		function appendValue(node) {
			var info = getInputInfo(node);

			if (info == undefined) {
				return;
			}

			// If there is no value already stored in this space.
			if (result[info.name] == undefined) {
				result[info.name] = info.value;
				return;
			}

			if (Array.isArray(result[info.name]) && Array.isArray(info.value)) {
				result[info.name] = [].concat(result[info.name], info.value);
				return;
			}
		}

		/**
		 * @param {HTMLInputElement} node
		 * @returns {{name:string, value:string | string[]} | undefined}
		 */
		function getInputInfo(node) {
			try {
				/** @type {{name: string, value: string | string[]}}*/
				var result = {
					name: node.name,
					value: node.value,
				};

				if (result.name == undefined || result.value == undefined) {
					return undefined;
				}

				if (node.type == "radio" && node.checked == false) {
					return undefined;
				}

				if (node.type == "checkbox") {
					if (node.checked == false) {
						result.value = undefined;
					} else if (typeof result.value === "string") {
						result.value = [result.value];
					}
				}

				if (node.type == "select-multiple") {
					/** @type {NodeListOf<HTMLSelectElement>} */
					var selected = node.querySelectorAll("option[selected]");

					result.value = [];
					for (var index = 0; index < selected.length; index++) {
						result.value.push(selected[index].value);
					}
				}
				return result;
			} catch (e) {
				return undefined;
			}
		}
	};

	_hyperscript.config.conversions["HTML"] = function (value) {
		var toHTML = /** @returns {string}*/ function (/** @type any*/ value) {
			if (value instanceof Array) {
				return value
					.map(function (item) {
						return toHTML(item);
					})
					.join("");
			}

			if (value instanceof HTMLElement) {
				return value.outerHTML;
			}

			if (value instanceof NodeList) {
				var result = "";
				for (var i = 0; i < value.length; i++) {
					var node = value[i];
					if (node instanceof HTMLElement) {
						result += node.outerHTML;
					}
				}
				return result;
			}

			if (value.toString) {
				return value.toString();
			}

			return "";
		};

		return toHTML(value);
	};

	_hyperscript.config.conversions["Fragment"] = function (val) {
		var frag = document.createDocumentFragment();
		_hyperscript.internals.runtime.implicitLoop(val, function (val) {
			if (val instanceof Node) frag.append(val);
			else {
				var temp = document.createElement("template");
				temp.innerHTML = val;
				frag.append(temp.content);
			}
		});
		return frag;
	};
}
