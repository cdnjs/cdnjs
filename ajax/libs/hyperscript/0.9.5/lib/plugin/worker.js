///=========================================================================
/// This module provides the worker feature for hyperscript
///=========================================================================

/**
 * @param {HyperscriptObject} _hyperscript
 */
export default _hyperscript => {

	var invocationIdCounter = 0;

	var workerFunc = function (self) {
		self.onmessage = function (e) {
			switch (e.data.type) {
				case "init":
					self.importScripts(e.data._hyperscript);
					self.importScripts.apply(self, e.data.extraScripts);
					const _hyperscript = self['_hyperscript']
					var tokens = _hyperscript.internals.lexer.makeTokensObject(e.data.tokens, [], e.data.source);
					var hyperscript = _hyperscript.internals.parser.parseElement("hyperscript", tokens);
					hyperscript.apply(self, self);
					postMessage({ type: "didInit" });
					break;
				case "call":
					try {
						var result = self['_hyperscript'].internals.runtime
							.getHyperscriptFeatures(self)[e.data.function]
							.apply(self, e.data.args);
						Promise.resolve(result)
							.then(function (value) {
								postMessage({
									type: "resolve",
									id: e.data.id,
									value: value,
								});
							})
							.catch(function (error) {
								postMessage({
									type: "reject",
									id: e.data.id,
									error: error.toString(),
								});
							});
					} catch (error) {
						postMessage({
							type: "reject",
							id: e.data.id,
							error: error.toString(),
						});
					}
					break;
			}
		};
	};

	// extract the body of the function, which was only defined so
	// that we can get syntax highlighting
	var workerCode = "(" + workerFunc.toString() + ")(self)";
	var blob = new Blob([workerCode], { type: "text/javascript" });
	var workerUri = URL.createObjectURL(blob);

	_hyperscript.addFeature("worker", function (parser, runtime, tokens) {
		if (tokens.matchToken("worker")) {
			var name = parser.requireElement("dotOrColonPath", tokens);
			var qualifiedName = name.evaluate();
			var nameSpace = qualifiedName.split(".");
			var workerName = nameSpace.pop();

			// Parse extra scripts
			var extraScripts = [];
			if (tokens.matchOpToken("(")) {
				if (tokens.matchOpToken(")")) {
					// no external scripts
				} else {
					do {
						var extraScript = tokens.requireTokenType("STRING").value;
						var absoluteUrl = new URL(extraScript, location.href).href;
						extraScripts.push(absoluteUrl);
					} while (tokens.matchOpToken(","));
					tokens.requireOpToken(")");
				}
			}

			// Consume worker methods

			var funcNames = [];
			var bodyStartIndex = tokens.consumed.length;
			var bodyEndIndex = tokens.consumed.length;
			do {
				var feature = parser.parseAnyOf(["defFeature", "jsFeature"], tokens);
				if (feature) {
					if (feature.type === "defFeature") {
						funcNames.push(feature.name);
						bodyEndIndex = tokens.consumed.length;
					} else {
						if (tokens.hasMore()) continue;
					}
				} else break;
			} while (tokens.matchToken("end") && tokens.hasMore()); // worker end

			var bodyTokens = tokens.consumed.slice(bodyStartIndex, bodyEndIndex + 1);

			// Create worker

			var worker = new Worker(workerUri);

			// Send init message to worker

			worker.postMessage({
				type: "init",
				_hyperscript: runtime.hyperscriptUrl,
				extraScripts: extraScripts,
				tokens: bodyTokens,
				source: tokens.source,
			});

			var workerPromise = new Promise(function (resolve, reject) {
				worker.addEventListener(
					"message",
					function (e) {
						if (e.data.type === "didInit") resolve();
					},
					{ once: true }
				);
			});

			// Create function stubs
			var stubs = {};
			funcNames.forEach(function (funcName) {
				console.log(funcName)
				stubs[funcName] = function () {
					var args = arguments;
					return new Promise(function (resolve, reject) {
						var id = invocationIdCounter++;
						worker.addEventListener("message", function returnListener(e) {
							if (e.data.id !== id) return;
							worker.removeEventListener("message", returnListener);
							if (e.data.type === "resolve") resolve(e.data.value);
							else reject(e.data.error);
						});
						workerPromise.then(function () {
							// Worker has been initialized, send invocation.
							worker.postMessage({
								type: "call",
								function: funcName,
								args: Array.from(args),
								id: id,
							});
						});
					});
				};
			});

			return {
				name: workerName,
				worker: worker,
				install: function (target) {
					runtime.assignToNamespace(target, nameSpace, workerName, stubs);
				},
			};
		}
	});
}
