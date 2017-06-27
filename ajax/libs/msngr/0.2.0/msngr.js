var msngr = msngr || (function () {
	return {
		version: "0.2.0",
		extend: function (obj, target) {
			target = (target || msngr);
			if (Object.prototype.toString.call(obj) === "[object Object]") {
				for (var key in obj) {
					if (obj.hasOwnProperty(key)) {
						if (Object.prototype.toString.call(obj[key]) === "[object Object]") {
							if (target[key] === undefined) {
								target[key] = { };
							}
							target[key] = msngr.extend(obj[key], target[key]);
						} else if (Object.prototype.toString.call(obj[key]) === "[object Array]") {
							target[key] = (target[key] || []).concat(obj[key]);
						} else {
							target[key] = obj[key];
						}
					}
				}
			}
			return target;
		}
	};
}());

msngr.extend((function () {
	return {
		utils: {
			argumentsToArray: function (args) {
				return Array.prototype.slice.call(args, 0);
			}
		}
	}
}()));

msngr.extend((function () {
	return {
		utils: {
			ensureMessage: function (message) {
				if (!msngr.utils.isNullOrUndefined(message)) {
					if (msngr.utils.isString(message) && !msngr.utils.isEmptyString(message)) {
						return {
							topic: message
						};
					}
					return message;
				}
				return undefined;
			}
		}
	}
}()));
msngr.extend((function () {
	return {
		utils: {
			ThrowNotImplementedException: function () {
				throw "Method is not implemented";
			},
			ThrowRequiredParameterMissingOrUndefinedException: function (params) {
				if (msngr.utils.isArray(params)) {
					throw params.join(",") + " are required parameters and must not be missing or undefined";
				} else {
					throw params + " is a required parameter and must not be missing or undefined";
				}
			},
			ThrowMismatchedInterfaceException: function (interface) {
				throw "The implementation does not match the " + (interface || "unknown") + " interface";
			},
			ThrowInvalidMessage: function () {
				throw "The message is not valid";
			},
			ThrowEventNotFoundException: function () {
				throw "The event is not found to be unregistered"
			}
		}
	};
}()));

msngr.extend((function () {
    var messages = [];
    return {
        utils: {
            indexer: {
                index: function (message, key) {
                    messages.push({
                        message: message,
                        key: key
                    });
                },
                query: function (message) {
                    var result = [];
                    for (var i = 0; i < messages.length; ++i) {
                        if (msngr.utils.isMessageMatch(message, messages[i].message)) {
                            result.push(messages[i].key);
                        }
                    }
                    return result;
                },
                remove: function (receiver) {
                    for (var i = 0; i < messages.length; ++i) {
                        if (messages[i].key === receiver) {
                            // Swapping values is faster than splice in most cases and makes removal easier.
                            var last = messages[messages.length - 1];
                            messages[messages.length - 1] = messages[i];
                            messages[i] = last;
                            messages.pop();
                        }
                    }
                }
            }
        }
    }
}()));

msngr.extend((function () {
	return {
		utils: {
			arrayContains: function (arr, values) {
				if (msngr.utils.isNullOrUndefined(arr)) {
					return false;
				}

				if (!msngr.utils.isArray(values)) {
					values = [values];
				}

				for (var i = 0; i < values.length; ++i) {
					if (arr.indexOf(values[i]) === -1) {
						return false;
					}
				}
				return true;
			}
		}
	}
}()));
msngr.extend((function () {
	return {
		utils: {
			getType: function (obj) {
				return Object.prototype.toString.call(obj);
			},
			isNullOrUndefined: function (obj) {
				return (obj === undefined || obj === null);
			},
			isHtmlElement: function (obj) {
				var t = this.getType(obj);
				return (t.indexOf("[object HTML") === 0) || (t.indexOf("[object global]") === 0);
			},
			isNodeList: function (obj) {
				return (this.getType(obj) === "[object NodeList]");
			},
			isString: function (str) {
	            return (this.getType(str) === "[object String]");
	        },
	        isDate: function (obj) {
	            return (this.getType(obj) === "[object Date]");
	        },
	        isArray: function (obj) {
	            return (this.getType(obj) === "[object Array]");
	        },
	        isNumber: function (obj) {
	            return (this.getType(obj) === "[object Number]");
	        },
	        isObject: function (obj) {
	            return (this.getType(obj) === "[object Object]");
	        },
	        isFunction: function (func) {
	            return (this.getType(func) === "[object Function]");
	        },
	        isEmptyString: function (str) {
	            var isStr = this.isString(str);
	            if (str === undefined || str === null || (isStr && str.toString().length === 0)) {
	                return true;
	            }
	            return false;
	        },
	        isWildCardStringMatch: function (str1, str2) {
	        	// SHort circuits
	        	if (!this.isNullOrUndefined(str1) && !this.isString(str1)) {
	        		return false;
	        	}
	        	if (!this.isNullOrUndefined(str2) && !this.isString(str2)) {
	        		return false;
	        	}
	            var str1Star = -1, str2Star = -1, shorterIndex = -1, str1EmptyResult, str2EmptyResult;

	            str1EmptyResult = this.isEmptyString(str1);
	            str2EmptyResult = this.isEmptyString(str2);

	            if (str1EmptyResult === true || str2EmptyResult === true) {
	                return true;
	            }

	            if (str1.toLowerCase() === str2.toLowerCase()) {
	                return true;
	            }
	            str1Star = str1.indexOf("*");
	            str2Star = str2.indexOf("*");
	            shorterIndex = shorterIndex = (str1Star === -1 || str2Star === -1) ? shorterIndex = Math.max(str1Star, str2Star) : shorterIndex = Math.min(str1Star, str2Star);
	            if ((str1Star !== -1 || str2Star !== -1) && shorterIndex !== -1) {
	                if (str1.substring(0, shorterIndex).toLowerCase() === str2.substring(0, shorterIndex).toLowerCase()) {
	                    return true;
	                }
	            }

	            return false;
	        },
	        isValidMessage: function (message) {
	        	// Short circuit if null or undefined
	        	if (this.isNullOrUndefined(message)) {
	        		return false;
	        	}

	        	// Short circuit if topic shortcut is used
	        	if (this.isString(message) && !this.isEmptyString(message)) {
	        		return true;
	        	}

	        	if (this.isNullOrUndefined(message.topic) || !this.isString(message.topic) || this.isEmptyString(message.topic)) {
	        		return false;
	        	}

	        	if (!this.isNullOrUndefined(message.category) && !this.isString(message.category)) {
	        		return false;
	        	}

	        	if (!this.isNullOrUndefined(message.dataType) && !this.isString(message.dataType)) {
	        		return false;
	        	}

	        	return true;

	        },
	        isMessageMatch: function (sent, target) {
	        	if (this.isWildCardStringMatch(sent.topic, target.topic)) {
	        		if (this.isWildCardStringMatch(sent.category, target.category)) {
	        			if (this.isWildCardStringMatch(sent.dataType, target.dataType)) {
	        				return true;
	        			}
	        		}
	        	}
	        	return false;
	        },
	        doesMessageContainWildcard: function (message) {
	        	message = this.ensureMessage(message);
	        	if (this.isValidMessage(message)) {
	        		if ((message.topic || "").indexOf("*") !== -1 || (message.category || "").indexOf("*") !== -1 || (message.dataType || ""	).indexOf("*") !== -1) {
	        			return true;
	        		}
	        	}
	        	return false;
	        },
			getPropertiesWithWildcards: function (message) {
				var results = [];

				if ((message.topic || "").indexOf("*") !== -1) {
					results.push("topic");
				}

				if ((message.category || "").indexOf("*") !== -1) {
					results.push("category");
				}

				if ((message.dataType || "").indexOf("*") !== -1) {
					results.push("dataType");
				}

				return results;
			}
	    }
	};
}()));

msngr.extend((function () {
	var registered = {
		routers: [],
		binders: []
	};

	var add = function (item, type) {
		if (item === undefined) {
			msngr.utils.ThrowRequiredParameterMissingOrUndefinedException("item");
		}

		registered[type].push(item);
	};

	var get = function (index, type) {
		if (index === undefined) {
			msngr.utils.ThrowRequiredParameterMissingOrUndefinedException("index");
		}
		return registered[type][index];
	};

	var count = function (type) {
		return registered[type].length;
	};

	var remove = function (index, type) {
		if (index === undefined) {
			msngr.utils.ThrowRequiredParameterMissingOrUndefinedException("index");
		}

		// This is faster than splice if we have a lot of items and we're not at the end
		var endIndex = registered[type].length -1;
		if (index !== endIndex) {
			var temp = registered[type][endIndex];
			registered[type][endIndex] = registered[type][index];
			registered[type][index] = temp;
		}
		registered[type].pop();
		return this;
	}

	return {
		registry: {
			routers: {
				add: function (router) {
					return add(router, "routers");
				},
				get: function (index) {
					return get(index, "routers");
				},
				count: function () {
					return count("routers");
				},
				remove: function (index) {
					return remove(index, "routers");
				}
			},
			binders: {
				add: function (binder) {
					return add(binder, "binders");
				},
				get: function (index) {
					return get(index, "binders");
				},
				count: function () {
					return count("binders");
				},
				remove: function (index) {
					return remove(index, "binders");
				}
			}
		}
	};
}()));

msngr.registry.routers.add((function () {
	// receivers should be an object versus array for better efficiencies
	// when deleting items.
	var receivers = { };
	var receiverCount = 0;

	var executeReceiverSync = function (method, context, params) {
		method.apply(context, params);
	};

	var executeReceiver = function (method, context, params) {
		(function (m, c, p) {
			setTimeout(function () {
				executeReceiverSync(m, c, p);
			}, 0);
		}(method, context, params));
	};

	var handleEmit = function (message) {
		if (!msngr.utils.isValidMessage(message)) {
			msngr.utils.ThrowRequiredParameterMissingOrUndefinedException("message");
		}

		var keys = msngr.utils.indexer.query(message);
		for (var i = 0; i < keys.length; ++i) {
			executeReceiver(receivers[keys[i]].callback, receivers[keys[i]].context, [message.payload]);
		}
	};

	var handleReceiverRegistration = function (message, callback, context) {
		receivers[callback] = {
			message: message,
			callback: callback,
			context: context
		};
		msngr.utils.indexer.index(message, callback);
		receiverCount++;
		return callback;
	};

	var handleReceiverRemoval = function (receiver) {
		msngr.utils.indexer.remove(receiver);
		delete receivers[receiver];
	};

	return {
		domain: "local",
		emit: function (message) {
			if (!msngr.utils.isValidMessage(message)) {
				msngr.utils.ThrowRequiredParameterMissingOrUndefinedException("message");
			}
			return handleEmit(message);
		},
		register: function (message, callback, context) {
			if (!msngr.utils.isValidMessage(message)) {
				msngr.utils.ThrowRequiredParameterMissingOrUndefinedException("message");
			}
			return handleReceiverRegistration(message, callback, (context || this));
		},
		unregister: function (receiver) {
			if (msngr.utils.isNullOrUndefined(receiver)) {
				msngr.utils.ThrowRequiredParameterMissingOrUndefinedException("receiver");
			}
			return handleReceiverRemoval(receiver);
		}
	};
}()));

msngr.registry.binders.add((function () {
    var listeners = {};
    var eventListeners = {
        passThrough: function (e, message) {
            msngr.emit({
                topic: message.topic,
                category: message.category,
                dataType: message.dataType,
                payload: e
            });
        }
    };

    var findElement = function (element) {
        var elm;
        if (elm === undefined && msngr.utils.isHtmlElement(element)) {
            elm = element;
        }

        if (elm === undefined && msngr.utils.isString(element)) {
            var result = document.getElementById(element);
            result = (result !== null) ? result : document.querySelector(element);
            if (result !== null) {
                elm = result;
            }
        }

        return elm;
    };

    var getListener = function (evnt, message, context) {
        var func = function (e) {
            if (eventListeners[evnt] !== undefined) {
                eventListeners[evnt].apply(context, [e, message]);
            } else {
                eventListeners.passThrough.apply(context, [e, message]);
            }
        };
        console.log(func);
        return func;
    };

    return {
        domain: "dom",
        bind: function (element, evnt, message) {
            if (msngr.utils.isNullOrUndefined(element)) {
                msngr.utils.ThrowRequiredParameterMissingOrUndefinedException("element");
            }

            if (msngr.utils.isNullOrUndefined(evnt)) {
                msngr.utils.ThrowRequiredParameterMissingOrUndefinedException("event");
            }

            if (msngr.utils.isNullOrUndefined(message)) {
                msngr.utils.ThrowRequiredParameterMissingOrUndefinedException("message");
            }

            if (!msngr.utils.isValidMessage(message)) {
                msngr.utils.ThrowInvalidMessage();
            }

            message = msngr.utils.ensureMessage(message);
            var elm = findElement(element);

            if (elm === undefined) {
                msngr.utils.ThrowRequiredParameterMissingOrUndefinedException("element");
            }

            if (listeners[elm] === undefined) {
                listeners[elm] = {};
            }

            if (listeners[elm][evnt] === undefined) {
                listeners[elm][evnt] = {};
            }

            if (listeners[elm][evnt][message] === undefined) {
                listeners[elm][evnt][message] = [];
            }

            var listener = getListener(evnt, message, this);
            listeners[elm][evnt][message].push(getListener(message, this));

            elm.addEventListener(evnt, listener, false);

            return this;
        },
        unbind: function (element, evnt, message) {
            if (msngr.utils.isNullOrUndefined(element)) {
                msngr.utils.ThrowRequiredParameterMissingOrUndefinedException("element");
            }

            if (msngr.utils.isNullOrUndefined(evnt)) {
                msngr.utils.ThrowRequiredParameterMissingOrUndefinedException("event");
            }

            if (msngr.utils.isNullOrUndefined(message)) {
                msngr.utils.ThrowRequiredParameterMissingOrUndefinedException("message");
            }

            if (!msngr.utils.isValidMessage(message)) {
                msngr.utils.ThrowInvalidMessage();
            }

            message = msngr.utils.ensureMessage(message);
            var elm = findElement(element);

            if (elm === undefined) {
                msngr.utils.ThrowRequiredParameterMissingOrUndefinedException("element");
            }

            if (listeners[elm] === undefined || listeners[elm][evnt] === undefined || listeners[elm][evnt][message] === undefined || listeners[elm][evnt][message].length === 0) {
                msngr.utils.ThrowEventNotFoundException();
            }

            for (var i = 0; i < listeners[elm][evnt][message].length; ++i) {
                elm.removeEventListener(evnt, listeners[elm][evnt][message], false);
            }
            listeners[elm][evnt][message] = [];
        }
    };
}()));

msngr.extend((function () {
    return {
        bind: function (element, event, message) {
            if (!msngr.utils.isValidMessage(message)) {
                msngr.utils.ThrowRequiredParameterMissingOrUndefinedException("message");
            }

            var msg = msngr.utils.ensureMessage(message);
            msg.domain = msg.domain || "local";

            for (var i = 0; i < msngr.registry.binders.count(); ++i) {
                msngr.registry.binders.get(i).bind(element, event, msg);
            }
        }
    };
}()));

msngr.extend((function () {
	return {
		emit: function (message, context) {
			if (!msngr.utils.isValidMessage(message)) {
				msngr.utils.ThrowRequiredParameterMissingOrUndefinedException("message");
			}

			var msg = msngr.utils.ensureMessage(message);

			for (var i = 0; i < msngr.registry.routers.count(); ++i) {
				var router = msngr.registry.routers.get(i);
				if (msngr.utils.isNullOrUndefined(msg.domain)) {
					msg.domain = "local";
				}
				if (msg.domain === router.domain || msg.domain === "localAndRemote") {
					router.emit(msg, context);
				}
			}
		}
	};
}()));

msngr.extend((function () {
	return {
		register: function (message, callback, context) {
			if (!msngr.utils.isValidMessage(message)) {
				msngr.utils.ThrowRequiredParameterMissingOrUndefinedException("message");
			}

			var result = [];
			for (var i = 0; i < msngr.registry.routers.count(); ++i) {
				result.push(msngr.registry.routers.get(i).register(msngr.utils.ensureMessage(message), callback, context));
			}

			if (result.length === 1) {
				return result[0];
			}
			return result;
		}
	};
}()));

msngr.extend((function () {
    return {
        unbind: function (element, event, message) {
            if (!msngr.utils.isValidMessage(message)) {
                msngr.utils.ThrowRequiredParameterMissingOrUndefinedException("message");
            }

            for (var i = 0; i < msngr.registry.binders.count(); ++i) {
                msngr.registry.binders.get(i).unbind(element, event, msngr.utils.ensureMessage(message));
            }
        }
    };
}()));

msngr.extend((function () {
    return {
        unregister: function (id) {
            if (msngr.utils.isNullOrUndefined(id)) {
                msngr.utils.ThrowRequiredParameterMissingOrUndefinedException("id");
            }

            var result = [];
            for (var i = 0; i < msngr.registry.routers.count(); ++i) {
                result.push(msngr.registry.routers.get(i).unregister(id));
            }

            if (result.length === 1) {
                return result[0];
            }
            return result;
        }
    };
}()));

if (typeof module !== "undefined" && typeof module.exports !== "undefined") {
	module.exports = msngr;
}
