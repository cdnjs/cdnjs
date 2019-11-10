// knockout-delegatedEvents 0.6.1 | (c) 2015 Ryan Niemeyer |  http://www.opensource.org/licenses/mit-license
;(function(factory) {
    //CommonJS
    if (typeof require === "function" && typeof exports === "object" && typeof module === "object") {
        factory(require("knockout"), exports);
        //AMD
    } else if (typeof define === "function" && define.amd) {
        define(["knockout", "exports"], factory);
        //normal script tag
    } else {
        factory(ko, ko.actions = {});
    }
}(function(ko, actions) {
    var prefix = "ko_delegated_",
        prefixParent = "ko_delegated_parent_";

    // determine the method to call from a parent binding that specifies the function(s) directly
    function findMethodFromParent(callback, originalElement, root, eventName) {
        var attr = "data-" + eventName + "-parent";

        // locate the element containing the data-<eventName>-parent attribute
        while (originalElement && originalElement.nodeType === 1 && !originalElement.disabled && !originalElement.hasAttribute(attr)) {
            originalElement = originalElement !== root ? originalElement.parentNode : null;
        }

        if (!originalElement){
            return;
        }

        var methodName = originalElement.getAttribute(attr),
            method = methodName === "true" ? callback : callback[methodName];

        if (method && (typeof method === "function")) {
             return {
                 method: method,
                 element: originalElement,
                 owner: ko.dataFor(root)
             };
        }
    }

    // find the method or method name by looking at the appropriate attributes and domData
    function findMethod(originalElement, root, eventName) {
        var method, owner, parentAttribute, contextElement,
            attr = "data-" + eventName,
            key = prefix + eventName,
            keyParent = prefixParent + eventName,
            attrParent = "data-" + eventName + "-parent";

        while (!method && originalElement && originalElement !== root) {
            if (originalElement.nodeType === 1 && !originalElement.disabled) {
                if (parentAttribute) {
                    method = ko.utils.domData.get(originalElement, keyParent);
                    if (method) {
                        method = parentAttribute === "true" ? method : method[parentAttribute];
                        owner = ko.dataFor(originalElement);
                    }
                }
                else {
                    method = (originalElement.getAttribute(attr) || ko.utils.domData.get(originalElement, key));
                    if (!method) {
                        // set a flag that indicates that we need to find a method on the appropriate parent
                        parentAttribute = originalElement.getAttribute(attrParent);
                        if (parentAttribute) {
                            // we need this element later to pass the appropriate data
                            contextElement = originalElement;
                        }
                    }
                }
            }

            if (!method) {
                originalElement = originalElement.parentNode;
            }
        }

        if (method) {
            return {
                method: method,
                element: contextElement || originalElement,
                owner: owner
            };
        }
    }

    // create an event handler that locates the appropriate method and executes it with the proper context and args
    function createDelegatedHandler(eventName, root, bubble, findMethodCallBack) {
        return function(event) {
            var search = findMethodCallBack(event.target || event.srcElement, root, eventName);

            if (!search) {
                return;
            }

            var data, context, action, matchingParent, command, result, 
                el = search.element,
                method = search.method,
                owner = search.owner;

            if (method) {
                // get context of the element that actually held the action
                context = ko.contextFor(el);

                if (context) {
                    // need to ensure that the clicked element is not inside a disabled element
                    while (el && el !== root) {
                        if (el.disabled) {
                            return;
                        }

                        el = el.parentNode;
                    }

                    data = context.$data;

                    if (typeof method === "string") {
                        // check defined actions
                        if (method in actions) {
                            command = actions[method];
                            if (command) {
                                action = typeof command === "function" ? command : command.action;
                                owner = command.owner || data;
                            }
                        }
                        // search for the action
                        else if (data && data[method] && typeof data[method] === "function") {
                            action = data[method];
                            owner = data;
                        }

                        // search parents for the action
                        if (!action) {
                            matchingParent = ko.utils.arrayFirst(context.$parents, function(parent) {
                                return parent[method] && typeof parent[method] === "function";
                            });

                            action = matchingParent && matchingParent[method];
                            owner = matchingParent;
                        }
                    }
                    // a binding handler was used to associate the element with a function
                    else if (typeof method === "function") {
                        action = method;
                        owner = owner || data;
                    }
                }

                // execute the action as KO normally would
                if (action) {
                    // if the event is a submit event, we want to just pass
                    // the form element, and set the context to 'this'.
                    // This matches the knockout behaviour for submit bindings.
                    if (eventName === "submit") {
                      result = action.call(data, event.target);
                    } else {
                      result = action.call(owner, data, event);
                    }

                    // prevent default action, if handler does not return true
                    if (result !== true) {
                        if (event.preventDefault) {
                            event.preventDefault();
                        }
                        else {
                            event.returnValue = false;
                        }
                    }

                    // prevent bubbling if not enabled
                    if (bubble !== true) {
                        event.cancelBubble = true;

                        if (typeof event.stopPropagation === "function") {
                            event.stopPropagation();
                        }
                    }
                }
            }
        };
    }

    // build a camel-case binding name
    function getBindingName(bindingPrefix, eventName) {
        return bindingPrefix + eventName.substr(0, 1).toUpperCase() + eventName.slice(1);
    }

    // create a binding that associates a function with an element via domData
    function createBinding(bindingName, attributeName){
        if (!ko.bindingHandlers[bindingName]) {
            ko.bindingHandlers[bindingName] = {
                init: function(element, valueAccessor) {
                    var action = valueAccessor();
                    ko.utils.domData.set(element, attributeName, action);
                }
            };
        }
    }

    // create bindings for an event to associate a function with the element
    function createDelegatedBindings(event) {
        createBinding(getBindingName("delegated", event), prefix + event);
        createBinding(getBindingName("delegatedParent", event), prefixParent + event);
    }

     // add a handler on a parent element that responds to events from the children
    ko.bindingHandlers.delegatedHandler = {
        init: function(element, valueAccessor, allBindings) {
            var events = ko.utils.unwrapObservable(valueAccessor()) || [];

            if (typeof events === "string") {
                events = [events];
            }

            ko.utils.arrayForEach(events, function(event) {
                // check if the associated "delegated<EventName>Bubble" is true (optionally allows bubbling)
                var bubble = allBindings.get(getBindingName("delegated", event + "Bubble")) === true;

                createDelegatedBindings(event);
                ko.utils.registerEventHandler(element, event, createDelegatedHandler(event, element, bubble, findMethod));
            });
        }
    };

    ko.bindingHandlers.delegatedParentHandler = {
        init: function(element, valueAccessor, allBindings) {
            var events = ko.utils.unwrapObservable(valueAccessor());

            ko.utils.objectForEach(events, function(event) {
                // check if the associated "delegated<EventName>Bubble" is true (optionally allows bubbling)
                var bubble = allBindings.get(getBindingName("delegated", event + "Bubble")) === true;

                ko.utils.registerEventHandler(element, event, createDelegatedHandler(event, element, bubble, findMethodFromParent.bind(null, events[event])));
            });
        }
    };
}));
