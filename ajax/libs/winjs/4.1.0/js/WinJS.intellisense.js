// Copyright (c) Microsoft Corporation.  All Rights Reserved. Licensed under the MIT License. See License.txt in the project root for license information.
/* global intellisense, window, document, setTimeout, WinJS */
(function () {
    "use strict";
    var redirect = intellisense.redirectDefinition;

    function makeAllEnumerable(v) {
        /// <param name="v" type="Object" />
        if (v && typeof v === "object") {
            Object.getOwnPropertyNames(v).forEach(function (name) {
                var pd = Object.getOwnPropertyDescriptor(v, name);
                if (!pd.enumerable && pd.configurable) {
                    pd.enumerable = true;
                    Object.defineProperty(v, name, pd);
                }
            });
        }
        return v;
    }

    function wrap(old) {
        /// <param name="old" type="Function" />
        var wrapper = function () {
            var args = [];
            for (var i = 0, len = arguments.length; i < len; i++) {
                args.push(makeAllEnumerable(arguments[i]));
            }
            return old.apply(this, args);
        };
        redirect(wrapper, old);
        return wrapper;
    }

    function wrapAllMethods(v) {
        /// <param name="v" type="Object" />
        if (v) {
            Object.getOwnPropertyNames(v).forEach(function (name) {
                var value = v[name];
                if (typeof value === "function") {
                    v[name] = wrap(value);
                }
            });
        }
        return v;
    }

    if (this.WinJS) {
        wrapAllMethods(WinJS.Namespace);
        wrapAllMethods(WinJS.Class);
    }

    (function () {
        var originalApplicationStart = WinJS.Application.start;
        WinJS.Application.start = function () {
            // Call app.stop() when execution completes to ensure that the subsequent calls to app.start() do not see the app as running.
            var app = this;
            setTimeout(function () {
                app.stop();
            }, 0);
            return originalApplicationStart.apply(this, arguments);
        };
        redirect(WinJS.Application.start, originalApplicationStart);

        var originalPagesDefine = WinJS.UI.Pages.define;
        WinJS.UI.Pages.define = function (uri, members) {
            var result = originalPagesDefine.apply(this, arguments);

            intellisense.callerDefines(result, members);
            if (typeof uri === 'string') {
                intellisense.declareNavigationContainer(result, "Page (" + uri + ")");
            }

            // Set the call contexts for IPageControlMembers
            if (members) {
                var pageInstance = new result();

                if (typeof members.error === 'function') {
                    intellisense.setCallContext(members.error, { thisArg: pageInstance, args: [new Error()] });
                }
                if (typeof members.init === 'function') {
                    intellisense.setCallContext(members.init, { thisArg: pageInstance, args: [document.createElement('element'), {}] });
                }
                if (typeof members.load === 'function') {
                    intellisense.setCallContext(members.load, { thisArg: pageInstance, args: [""] });
                }
                if (typeof members.processed === 'function') {
                    intellisense.setCallContext(members.processed, { thisArg: pageInstance, args: [document.createElement('element'), {}] });
                }
                if (typeof members.ready === 'function') {
                    intellisense.setCallContext(members.ready, { thisArg: pageInstance, args: [document.createElement('element'), {}] });
                }
                if (typeof members.render === 'function') {
                    intellisense.setCallContext(members.render, { thisArg: pageInstance, args: [document.createElement('element'), {}, WinJS.Promise.wrap()] });
                }
            }

            return result;
        };
        redirect(WinJS.UI.Pages.define, originalPagesDefine);

        // Simulate a call to a class' instance/static methods for WinJS.Class.define
        var originalClassDefine = WinJS.Class.define;
        WinJS.Class.define = function (constructor, instanceMembers, staticMembers) {
            var result = originalClassDefine.call(this, constructor, instanceMembers, staticMembers);
            // Go through the instance members to find methods
            if (instanceMembers) {
                var classInstance;
                Object.getOwnPropertyNames(instanceMembers).forEach(function (name) {
                    var member = instanceMembers[name];
                    if (typeof member === 'function') {
                        intellisense.setCallContext(member, {
                            get thisArg() {
                                if (!classInstance) {
                                    classInstance = new result();
                                }
                                return classInstance;
                            }
                        });
                    }
                });
            }
            // Go through the static members to find methods
            if (staticMembers) {
                Object.getOwnPropertyNames(staticMembers).forEach(function (name) {
                    var member = staticMembers[name];
                    if (typeof member === 'function') {
                        intellisense.setCallContext(member, { thisArg: result });
                    }
                });
            }

            return result;
        };
        redirect(WinJS.Class.define, originalClassDefine);

        // Define the caller location property for WinJS.Namespace.define
        var originalNamespaceDefine = WinJS.Namespace.define;
        WinJS.Namespace.define = function (name, members) {
            var result = originalNamespaceDefine.call(this, name, members);
            if (typeof name === 'string' && result) {
                // Get the global object
                var globalObj = (function () {
                    return this;
                })();

                // Define the caller location of parent namespaces that haven't yet been defined
                var path;
                var namespaceParts = name.split(".");
                for (var i = 0; i < namespaceParts.length - 1; i++) {
                    path = ((i === 0) ? namespaceParts[i] : path += "." + namespaceParts[i]);
                    var item = globalObj[path];
                    if (item) {
                        intellisense.callerDefines(item);
                    }
                }

                // Define the caller location of the original namespace
                intellisense.callerDefines(result, members);
            }
            return result;
        };
        redirect(WinJS.Namespace.define, originalNamespaceDefine);

        intellisense.setCallContext(WinJS.Promise, { thisArg: {}, args: [function () { }] });
    })();

    (function () {
        // In the language serivce all promises are completed promises. The completed promise class is private
        // to WinJS, however, we can get access to the prototype through one of the promise instances by
        // getting the instance's constructor's prototype.
        var promisePrototype = WinJS.Promise.as(1).constructor.prototype;

        // Setting the argument calling context of the done and then methods to be an instance of Error().
        // The completion callback is handled in WinJS itself through a <returns> metadata comment.
        var originalDone = promisePrototype.done;
        promisePrototype.done = function (c, e, p) {
            intellisense.setCallContext(e, { thisArg: this, args: [new Error()] });
            return originalDone.apply(this, arguments);
        };
        redirect(promisePrototype.done, originalDone);

        var originalThen = promisePrototype.then;
        promisePrototype.then = function (c, e, p) {
            intellisense.setCallContext(e, { thisArg: this, args: [new Error()] });
            return originalThen.apply(this, arguments);
        };
        redirect(promisePrototype.then, originalThen);
    })();

    if (window._$originalAddEventListener) {
        window.addEventListener = window._$originalAddEventListener;
        window._$originalAddEventListener = null;
        delete window._$originalAddEventListener;
    }
})();