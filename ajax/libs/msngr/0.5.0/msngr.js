
var msngr = msngr || (function () {
	"use strict";
	
	return {
		version: "0.5.0",
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
	"use strict";

	return {
		utils: {
			argumentsToArray: function (args) {
				return Array.prototype.slice.call(args, 0);
			}
		}
	};
}()));

msngr.extend((function () {
    "use strict";
    
    return {
        utils: {
            isHtmlElement: function (obj) {
                var t = this.getType(obj);
                return (t.indexOf("[object HTML") === 0) || (t.indexOf("[object global]") === 0);
            },
            isNodeList: function (obj) {
                return (this.getType(obj) === "[object NodeList]");
            },
            findElement: function (element) {
                var elm;
                if (msngr.utils.isHtmlElement(element)) {
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
            },
            getDomPath: function (element) {
                var node = msngr.utils.isHtmlElement(element) ? element : undefined;
                if (node === undefined) {
                    return undefined;
                }

                if (node.id === undefined) {
                    node.id = msngr.utils.id();
                }

                return "#" + node.id;
            },
            querySelectorAllWithEq: function (selector) {
                if (selector === undefined) {
                    return null;
                }
                var queue = [];
                var process = function (input) {
                    if (input.indexOf(":eq(") === -1) {
                        return undefined;
                    }

                    var eqlLoc = input.indexOf(":eq(");
                    var sel = input.substring(0, eqlLoc);
                    var ind = input.substring((eqlLoc + 4), input.indexOf(")", eqlLoc));
                    selector = input.substring(input.indexOf(")", eqlLoc) + 1, input.length);

                    if (sel.charAt(0) === ">") {
                        sel = sel.substring(1, sel.length);
                    }

                    if (selector.charAt(0) === ">") {
                        selector = selector.substring(1, selector.length);
                    }

                    queue.push({
                        selector: sel,
                        index: parseInt(ind, 10)
                    });
                }
                while (selector.indexOf(":eq") !== -1) {
                    process(selector);
                }

                var result;
                while (queue.length > 0) {
                    var item = queue.shift();
                    result = (result || document).querySelectorAll(item.selector)[item.index];
                }

                if (selector.trim().length > 0) {
                    return (result || document).querySelectorAll(selector);
                }
                return [result];
            },
            querySelectorWithEq: function (selector) {
                return msngr.utils.querySelectorAllWithEq(selector)[0];
            }
        }
    };
}()));

msngr.extend((function () {
	"use strict";

	var nowPerformance = function () {
		return performance.now();
	};

	var nowNode = function () {
		return (process.hrtime()[1] / 1000000);
	};

	var nowLegacy = function () {
		return (new Date).getTime();
	};

	var nowExec = undefined;
	var nowExecDebugLabel = "";
	var lastNow = undefined;

	return {
		utils: {
			id: function () {
				var d = msngr.utils.now();
				var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
					var r = (d + Math.random()*16)%16 | 0;
					d = Math.floor(d/16);
					return (c=='x' ? r : (r&0x3|0x8)).toString(16);
				});
				return uuid;
			},
			now: function (noDuplicate) {
				if (nowExec === undefined) {
					if (typeof performance !== "undefined") {
						nowExec = nowPerformance;
						nowExecDebugLabel = "performance";
					} else if (typeof process !== "undefined") {
						nowExec = nowNode;
						nowExecDebugLabel = "node";
					} else {
						nowExec = nowLegacy;
						nowExecDebugLabel = "legacy";
					}
				}
				var now = nowExec();
				if (noDuplicate && lastNow === now) {
					return msngr.utils.now(noDuplicate);
				}
				lastNow = now;
				return now;
			}
		}
	};
}()));

msngr.extend((function () {
	"use strict";

	return {
		utils: {
			getType: function (obj) {
				return Object.prototype.toString.call(obj);
			},
			isNullOrUndefined: function (obj) {
				return (obj === undefined || obj === null);
			},
			exists: function (obj) {
				return !this.isNullOrUndefined(obj);
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
	            if (str === undefined || str === null || (isStr && str.toString().trim().length === 0)) {
	                return true;
	            }
	            return false;
	        },
			hasWildCard: function (str) {
				return (str.indexOf("*") !== -1);
			}
	    }
	};
}()));

msngr.extend((function () {
  "use strict";

  // Index for id to message objects
  var id_to_message = { };

  // Direct index (no partials) for message
  var direct_index = {
      topic_to_id: { },
      topic_cat_to_id: { },
      topic_type_to_id: { },
      topic_cat_type_to_id: { }
  };

  // Message index count
  var index_count = 0;

  var deleteValueFromArray = function (arr, value) {
      var inx = arr.indexOf(value);
      var endIndex = arr.length - 1;
      if (inx !== endIndex) {
          var temp = arr[endIndex];
          arr[endIndex] = arr[inx];
          arr[inx] = temp;
      }
      arr.pop();
  };

  return {
      stores: {
          memory: {
              index: function (message) {
                  if (msngr.utils.exists(message) && msngr.utils.exists(message.topic)) {
                      var uuid = msngr.utils.id();
                      id_to_message[uuid] = message;

                      if (direct_index.topic_to_id[message.topic] === undefined) {
                          direct_index.topic_to_id[message.topic] = [];
                      }
                      direct_index.topic_to_id[message.topic].push(uuid);

                      if (msngr.utils.exists(message.category)) {
                          if (direct_index.topic_cat_to_id[message.topic] === undefined) {
                              direct_index.topic_cat_to_id[message.topic] = { };
                          }

                          if (direct_index.topic_cat_to_id[message.topic][message.category] === undefined) {
                              direct_index.topic_cat_to_id[message.topic][message.category] = [];
                          }

                          direct_index.topic_cat_to_id[message.topic][message.category].push(uuid);
                      }

                      if (msngr.utils.exists(message.dataType)) {
                          if (direct_index.topic_type_to_id[message.topic] === undefined) {
                              direct_index.topic_type_to_id[message.topic] = { };
                          }

                          if (direct_index.topic_type_to_id[message.topic][message.dataType] === undefined) {
                              direct_index.topic_type_to_id[message.topic][message.dataType] = [];
                          }

                          direct_index.topic_type_to_id[message.topic][message.dataType].push(uuid);
                      }

                      if (msngr.utils.exists(message.category) && msngr.utils.exists(message.dataType)) {
                          if (direct_index.topic_cat_type_to_id[message.topic] === undefined) {
                              direct_index.topic_cat_type_to_id[message.topic] = { };
                          }

                          if (direct_index.topic_cat_type_to_id[message.topic][message.category] === undefined) {
                              direct_index.topic_cat_type_to_id[message.topic][message.category] = { };
                          }

                          if (direct_index.topic_cat_type_to_id[message.topic][message.category][message.dataType] === undefined) {
                              direct_index.topic_cat_type_to_id[message.topic][message.category][message.dataType] = [];
                          }

                          direct_index.topic_cat_type_to_id[message.topic][message.category][message.dataType].push(uuid);
                      }

                      index_count++;

                      return uuid;
                  }
                  return undefined;
              },
              delete: function (uuid) {
                  if (msngr.utils.exists(uuid) && msngr.utils.exists(id_to_message[uuid])) {
                      var message = id_to_message[uuid];

                      if (msngr.utils.exists(message.topic)) {
                          deleteValueFromArray(direct_index.topic_to_id[message.topic], uuid);

                          if (msngr.utils.exists(message.category)) {
                              deleteValueFromArray(direct_index.topic_cat_to_id[message.topic][message.category], uuid);
                          }

                          if (msngr.utils.exists(message.dataType)) {
                              deleteValueFromArray(direct_index.topic_type_to_id[message.topic][message.dataType], uuid);
                          }

                          if (msngr.utils.exists(message.category) && msngr.utils.exists(message.dataType)) {
                              deleteValueFromArray(direct_index.topic_cat_type_to_id[message.topic][message.category][message.dataType], uuid);
                          }
                      }

                      delete id_to_message[uuid];
                      index_count--;

                      return true;
                  }
              },
              query: function (message) {
                  if (msngr.utils.exists(message)) {
                      if (msngr.utils.exists(message.topic)) {
                          // Topic Only Results
                          if (!msngr.utils.exists(message.category) && !msngr.utils.exists(message.dataType)) {
                              return direct_index.topic_to_id[message.topic] || [];
                          }

                          // Topic + Category Results
                          if (msngr.utils.exists(message.category) && !msngr.utils.exists(message.dataType)) {
                              return (direct_index.topic_cat_to_id[message.topic] || { })[message.category] || [];
                          }

                          // Topic + Data Type Results
                          if (msngr.utils.exists(message.dataType) && !msngr.utils.exists(message.category)) {
                              return (direct_index.topic_type_to_id[message.topic] || { })[message.dataType] || [];
                          }

                          // Topic + Category + Data Type Results
                          if (msngr.utils.exists(message.category) && msngr.utils.exists(message.dataType)) {
                              return ((direct_index.topic_cat_type_to_id[message.topic] || { })[message.category] || { })[message.dataType] || [];
                          }
                      }
                  }

                  return [];
              },
              clear: function () {
                  // Index for id to message objects
                  id_to_message = { };

                  // Direct index (no partials) for message
                  direct_index = {
                      topic_to_id: { },
                      topic_cat_to_id: { },
                      topic_type_to_id: { },
                      topic_cat_type_to_id: { }
                  };

                  index_count = 0;

                  return true;
              },
              count: function () {
                  return index_count;
              }
          }
      }
  };
}()));

msngr.extend((function () {
    "use strict";

    var registerdPaths = { };
    var registerdEvents = 0;

    var listener = function (event) {
        var node = this;
        var path = msngr.utils.getDomPath(node);

        if (msngr.utils.exists(registerdPaths[path])) {
            if (msngr.utils.exists(registerdPaths[path][event.type])) {
                return msngr.emit(registerdPaths[path][event.type], event);
            }
        }

        // How did we get here? Must be a memory leak or something
        console.log("Warning: msngr core event listener triggered without a message. Memory leak?");
        return msngr;
    };

    return {
        bind: function (element, event, message) {
            var node = msngr.utils.findElement(element);
            var path = msngr.utils.getDomPath(node);

            if (!msngr.utils.exists(registerdPaths[path])) {
                registerdPaths[path] = { };
            }

            registerdPaths[path][event] = message;

            node.addEventListener(event, listener);

            registerdEvents++;

            return msngr;
        },
        unbind: function (element, event) {
            var node = msngr.utils.findElement(element);
            var path = msngr.utils.getDomPath(node);

            if (msngr.utils.exists(registerdPaths[path])) {
                if (msngr.utils.exists(registerdPaths[path][event])) {
                    node.removeEventListener(event, listener);

                    delete registerdPaths[path][event];

                    registerdEvents--;
                }
            }

            return msngr;
        },
        getBindCount: function () {
            return registerdEvents;
        }
    };
}()));

msngr.extend((function () {
    "use strict";

    var delegates = { };
    var delegateCount = 0;

    var executeSync = function (method, context, params) {
        method.apply(context, params);
    };

    var execute = function (method, context, params) {
        (function (m, c, p) {
            setTimeout(function () {
                executeSync(m, c, p);
            }, 0);
        }(method, context, params));
    };

    return {
        emit: function (message, payload) {
            var uuids = msngr.stores.memory.query(message);
            if (uuids.length > 0) {
                for (var i = 0; i < uuids.length; ++i) {
                    var del = delegates[uuids[i]];
                    execute(del.callback, del.context, [payload || message.payload]);
                }
            }

            return msngr;
        },
        register: function (message, callback) {
            var uuid = msngr.stores.memory.index(message);
            delegates[uuid] = {
                callback: callback,
                context: (message.context || this),
                registeredMessage: message
            };
            delegateCount++;

            return msngr;
        },
        unregister: function (message) {
            var uuids = msngr.stores.memory.query(message);
            if (uuids.length > 0) {
                for (var i = 0; i < uuids.length; ++i) {
                    var uuid = uuids[i];
                    delete delegates[uuid];
                    delegateCount--;

                    msngr.stores.memory.delete(uuid);
                }
            }

            return msngr;
        },
        unregisterAll: function () {
            delegates = { };
            delegateCount = 0;
            msngr.stores.memory.clear();

            return msngr;
        },
        getDelegateCount: function () {
            return delegateCount;
        }
    };
}()));

if (typeof module !== "undefined" && typeof module.exports !== "undefined") {
	module.exports = msngr;
}
