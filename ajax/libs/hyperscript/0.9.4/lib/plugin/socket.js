
import { mergeObjects } from "../utils.js";

function genUUID() {
	return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
		var r = (Math.random() * 16) | 0,
		v = c == "x" ? r : (r & 0x3) | 0x8;
		return v.toString(16);
	});
}

function createSocket(url) {
	return new WebSocket(url.evaluate());
}

/**
 * @param {HyperscriptObject} _hyperscript
 */
export default _hyperscript => {

	/** @type {(string | symbol)[]} */
	var PROXY_BLACKLIST = ["then", "catch", "length", "asyncWrapper", "toJSON"];

	_hyperscript.addFeature("socket", function (parser, runtime, tokens) {
		function getProxy(timeout) {
			return new Proxy(
				{},
				{
					get: function (obj, property) {
						if (PROXY_BLACKLIST.indexOf(property) >= 0) {
							return null;
						} else if (property === "noTimeout") {
							return getProxy(-1);
						} else if (property === "timeout") {
							return function (i) {
								return getProxy(parseInt(i));
							};
						} else {
							return function () {
								var uuid = genUUID();
								var args = [];
								for (var i = 0; i < arguments.length; i++) {
									args.push(arguments[i]);
								}
								var rpcInfo = {
									iid: uuid,
									function: property,
									args: args,
								};
								socket = socket ? socket : createSocket(url); //recreate socket if needed
								socket.send(JSON.stringify(rpcInfo));

								var promise = new Promise(function (resolve, reject) {
									promises[uuid] = {
										resolve: resolve,
										reject: reject,
									};
								});

								if (timeout >= 0) {
									setTimeout(function () {
										if (promises[uuid]) {
											promises[uuid].reject("Timed out");
										}
										delete promises[uuid];
									}, timeout); // TODO configurable?
								}
								return promise;
							};
						}
					},
				}
			);
		}

		if (tokens.matchToken("socket")) {
			var name = parser.requireElement("dotOrColonPath", tokens);
			var qualifiedName = name.evaluate();
			var nameSpace = qualifiedName.split(".");
			var socketName = nameSpace.pop();

			var promises = {};
			var url = parser.requireElement("stringLike", tokens);

			var defaultTimeout = 10000;
			if (tokens.matchToken("with")) {
				tokens.requireToken("timeout");
				defaultTimeout = parser.requireElement("expression", tokens).evaluate();
			}

			if (tokens.matchToken("on")) {
				tokens.requireToken("message");
				if (tokens.matchToken("as")) {
					tokens.requireToken("json");
					var jsonMessages = true;
				}
				var messageHandler = parser.requireElement("commandList", tokens);
				var implicitReturn = {
					type: "implicitReturn",
					op: function (context) {
						return runtime.HALT;
					},
					execute: function (context) {
						// do nothing
					},
				};
				var end = messageHandler;
				while (end.next) {
					end = end.next;
				}
				end.next = implicitReturn;
				// TODO set parent?
				// parser.setParent(implicitReturn, initFeature);
			}

			var socket = createSocket(url);
			var rpcProxy = getProxy(defaultTimeout);

			var socketObject = {
				raw: socket,
				dispatchEvent: function (evt) {
					var details = evt.detail;
					// remove hyperscript internals
					delete details.sender;
					delete details._namedArgList_;
					socket.send(JSON.stringify(mergeObjects({ type: evt.type }, details)));
				},
				rpc: rpcProxy,
			};

			var socketFeature = {
				name: socketName,
				socket: socketObject,
				install: function (target) {
					runtime.assignToNamespace(target, nameSpace, socketName, socketObject);
				},
			};

			socket.onmessage = function (evt) {
				var data = evt.data;
				try {
					var dataAsJson = JSON.parse(data);
				} catch (e) {
					// not JSON
				}

				// RPC reply
				if (dataAsJson && dataAsJson.iid) {
					if (dataAsJson.throw) {
						promises[dataAsJson.iid].reject(dataAsJson.throw);
					} else {
						promises[dataAsJson.iid].resolve(dataAsJson.return);
					}
					delete promises[dataAsJson.iid];
				}

				if (messageHandler) {
					var context = runtime.makeContext(socketObject, socketFeature, socketObject);
					if (jsonMessages) {
						if (dataAsJson) {
							context.message = dataAsJson;
							context.result = dataAsJson;
						} else {
							throw "Received non-JSON message from socket: " + data;
						}
					} else {
						context.message = data;
						context.result = data;
					}
					messageHandler.execute(context);
				}
			};

			// clear socket on close to be recreated
			socket.addEventListener("close", function (e) {
				socket = null;
			});

			return socketFeature;
		}
	});
}
