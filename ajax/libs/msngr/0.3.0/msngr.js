var msngr = msngr || (function () {
	return {
		version: "0.3.0",
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
			},
			ThrowForeignKeyNotUniqueException: function () {
				throw "The provided foreign key is not unique"
			}
		}
	};
}()));

msngr.extend((function () {
    // deprecatedMessages holds the deprecated indexer data.
    // DO NOT REMOVE until deprecatedIndexer is removed.
    var deprecatedMessages = [];

    // NEW STUFF BELOW THIS COMMENT
    var index = {
        fk_message: { },
        exact: {
            topic: { },
            category: { },
            dataType: { }
        }
    };

    var indexField = function (field, message, fk) {
        if (msngr.utils.isNullOrUndefined(field) || msngr.utils.isEmptyString(field)) {
            return false;
        }

        if (msngr.utils.doesFieldContainWildcard(field, message)) {
            return false;
        }

        if (index.exact[field][message[field]] === undefined) {
            index.exact[field][message[field]] = { };
        }
        index.exact[field][message[field]][fk] = 0;

        return true;
    };

    var queryField = function (field, message) {
        if (message[field] === undefined || message[field] === undefined) {
            return undefined;
        }

        var result = { };

        if (!msngr.utils.doesFieldContainWildcard(field, message)) {
            // Field does not contain wildcard; perform exact query
            result = index.exact[field][message[field]];
            return result;
        } else {
            // Field contains wildcard; perform partial query
            var start = (msngr.utils.isNullOrUndefined(message[field]) ? undefined : message[field].substring(0, message[field].indexOf("*")));
            if (msngr.utils.isEmptyString(start)) {
                start = undefined;
            }
            for (var key in index.exact[field]) {
                if (index.exact[field].hasOwnProperty(key)) {
                    if (start === undefined && index.exact[field][key] !== undefined) {
                        for (var fk in index.exact[field][key]) {
                            if (index.exact[field][key].hasOwnProperty(fk)) {
                                result[fk] = 0;
                            }
                        }
                    } else {
                        if (index.exact[field][key] !== undefined && key.indexOf(start) === 0) {
                            for (var fk in index.exact[field][key]) {
                                if (index.exact[field][key].hasOwnProperty(fk)) {
                                    result[fk] = 0;
                                }
                            }
                        }
                    }
                }
            }
            return result;
        }
    };

    var deIndexField = function (field, message, fk) {
        var count = 0;
        for (var key in index.exact[field][message[field]]) {
            if (index.exact[field][message[field]].hasOwnProperty(key)) {
                count++;
            }
        }

        if (count === 1) {
            delete index.exact[field][message[field]];
            return true;
        } else {
            delete index.exact[field][message[field]][fk];
            return true;
        }
    };

    return {
        utils: {
            indexer: {
                index: function (message, fk) {
                    if (index.fk_message[fk] !== undefined) {
                        msngr.utils.ThrowForeignKeyNotUniqueException();
                    }

                    message = msngr.utils.ensureMessage(message);

                    index.fk_message[fk] = message;

                    indexField("topic", message, fk);

                    if (!msngr.utils.isNullOrUndefined(message.category)) {
                        indexField("category", message, fk);
                    }

                    if (!msngr.utils.isNullOrUndefined(message.dataType)) {
                        indexField("dataType", message, fk);
                    }

                },
                query: function (message) {
                    message = msngr.utils.ensureMessage(message);

                    var topics = queryField("topic", message);

                    var categories = queryField("category", message);
                    var dataTypes = queryField("dataType", message);

                    var result = {
                        count: 0,
                        items: { }
                    };

                    for (var fk in topics) {
                        if (topics.hasOwnProperty(fk)) {
                            if (message.category === undefined && message.dataType === undefined) {
                                result.items[fk] = 0;
                                result.count = (result.count + 1);
                            } else {
                                var cats = { };
                                if (categories !== undefined && categories[fk] !== undefined) {
                                    cats[fk] = 0;
                                }

                                var datas = { };
                                if (dataTypes !== undefined && dataTypes[fk] !== undefined) {
                                    datas[fk] = 0;
                                }

                                if (categories !== undefined && dataTypes !== undefined && categories[fk] === dataTypes[fk]) {
                                    result.items[fk] = 0;
                                    result.count = result.count + 1;
                                }

                                if ((message.category === undefined && categories === undefined) && dataTypes !== undefined && dataTypes[fk] !== undefined) {
                                    result.items[fk] = 0;
                                    result.count = result.count + 1;
                                }

                                if (categories !== undefined && (message.dataType === undefined && dataTypes === undefined) && categories[fk] !== undefined) {
                                    result.items[fk] = 0;
                                    result.count = result.count + 1;
                                }
                            }
                        }
                    }

                    return result;
                },
                remove: function (fk) {
                    if (index.fk_message[fk] !== undefined) {
                        var message = index.fk_message[fk];

                        deIndexField("topic", message, fk);

                        if (!msngr.utils.isNullOrUndefined(message.category)) {
                            deIndexField("category", message, fk);
                        }

                        if (!msngr.utils.isNullOrUndefined(message.dataType)) {
                            deIndexField("dataType", message, fk);
                        }

                        delete index.fk_message[fk];
                    }
                }
            },
            deprecatedIndexer: {
                index: function (message, fk) {
                    deprecatedMessages.push({
                        message: message,
                        key: fk
                    });
                },
                query: function (message) {
                    var result = [];
                    for (var i = 0; i < deprecatedMessages.length; ++i) {
                        if (msngr.utils.isMessageMatch(message, deprecatedMessages[i].message)) {
                            result.push(deprecatedMessages[i].key);
                        }
                    }
                    return result;
                },
                remove: function (fk) {
                    for (var i = 0; i < deprecatedMessages.length; ++i) {
                        if (deprecatedMessages[i].key === fk) {
                            // Swapping values is faster than splice in most cases and makes removal easier.
                            var last = deprecatedMessages[deprecatedMessages.length - 1];
                            deprecatedMessages[deprecatedMessages.length - 1] = deprecatedMessages[i];
                            deprecatedMessages[i] = last;
                            deprecatedMessages.pop();
                        }
                    }
                }
            }
        }
    }
}()));

msngr.extend((function () {
	var idsUsed = { };

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
			},
			id: function () {
				var ms = Date.now();
				var rand = Math.floor(((Math.random() + 1) * 10000));
				var i = ms + "-" + rand;

				if (idsUsed[i] !== undefined) {
					return msngr.utils.id();
				}

				idsUsed[i] = 0;
				return i;
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
	        	// Short circuits
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
			doesFieldContainWildcard: function (field, message) {
				message = this.ensureMessage(message);
				if (this.isValidMessage(message)) {
					return (message[field] || "").indexOf("*") !== -1;
				}
			},
			doesStringContainWildcard: function (str) {
				if (!this.isString(str)) {
					return false;
				}
				return (str || "").indexOf("*") !== -1;
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
			},
			fieldShouldMatchAny: function (str) {
				return (this.doesStringContainWildcard(str) || this.isEmptyString(str) || this.isNullOrUndefined(str));
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
		if (keys.count > 0) {
			for (var key in keys.items) {
				if (keys.items.hasOwnProperty(key)) {
					executeReceiver(receivers[key].callback, receivers[key].context, [message.payload]);
				}
			}
		}
	};

	var handleReceiverRegistration = function (message, callback, context) {
		var id = msngr.utils.id();
		receivers[id] = {
			message: message,
			callback: callback,
			context: context,
			fk: id
		};
		msngr.utils.indexer.index(message, id);
		receiverCount++;
		return id;
	};

	var handleReceiverRemoval = function (fk) {
		msngr.utils.indexer.remove(fk);
		delete receivers[fk];
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
