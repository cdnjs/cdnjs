// knockout-delegatedEvents 0.5.0 | (c) 2015 Ryan Niemeyer |  http://www.opensource.org/licenses/mit-license
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
    var prefix = "ko_delegated_";
    var createDelegatedHandler = function(eventName, root, bubble) {
        return function(event) {
            var data, method, context, action, owner, matchingParent, command, result,
                el = event.target || event.srcElement,
                attr = "data-" + eventName,
                key = prefix + eventName;

            //loop until we either find an action, run out of elements, or hit the root element that has our delegated handler
            while (!method && el) {
                method = el.nodeType === 1 && !el.disabled && (el.getAttribute(attr) || ko.utils.domData.get(el, key));

                if (!method) {
                    el = el !== root ? el.parentNode : null;
                }
            }

            if (method) {
                //get context of the element that actually held the action
                context = ko.contextFor(el);

                if (context) {
                    //need to ensure that the clicked element is not inside a disabled element
                    while (el && el !== root) {
                        if (el.disabled) {
                            return;
                        }

                        el = el.parentNode;
                    }

                    data = context.$data;

                    if (typeof method === "string") {
                        //check defined actions
                        if (method in actions) {
                            command = actions[method];
                            if (command) {
                                action = typeof command === "function" ? command : command.action;
                                owner = command.owner || data;
                            }
                        }
                        //search for the action
                        else if (data && data[method] && typeof data[method] === "function") {
                            action = data[method];
                            owner = data;
                        }

                        //search parents for the action
                        if (!action) {
                            matchingParent = ko.utils.arrayFirst(context.$parents, function(parent) {
                                return parent[method] && typeof parent[method] === "function";
                            });

                            action = matchingParent && matchingParent[method];
                            owner = matchingParent;
                        }
                    }
                    //a binding handler was used to associate the element with a function
                    else if (typeof method === "function") {
                        action = method;
                        owner = data;
                    }
                }

                //execute the action as KO normally would
                if (action) {
                    //if the event is a submit event, we want to just pass
                    //the form element, and set the context to 'this'.
                    //This matches the knockout behaviour for submit bindings.
                    if (eventName === "submit") {
                      result = action.call(data, event.target);
                    } else {
                      result = action.call(owner, data, event);
                    }

                    //prevent default action, if handler does not return true
                    if (result !== true) {
                        if (event.preventDefault) {
                            event.preventDefault();
                        }
                        else {
                            event.returnValue = false;
                        }
                    }

                    //prevent bubbling if not enabled
                    if (bubble !== true) {
                        event.cancelBubble = true;

                        if (typeof event.stopPropagation === "function") {
                            event.stopPropagation();
                        }
                    }
                }
            }
        };
    };

    //create binding handler name from event name
    var createBindingName = function(eventName) {
        return "delegated" + eventName.substr(0, 1).toUpperCase() + eventName.slice(1);
    };

    //create a binding for an event to associate a function with the element
    var createDelegatedBinding = function(event) {
        var bindingName;
        if (!event) {
            return;
        }

        //get binding name
        bindingName = createBindingName(event);

        //create the binding, if it does not exist
        if (!ko.bindingHandlers[bindingName]) {
            ko.bindingHandlers[bindingName] = {
                init: function(element, valueAccessor) {
                    var action = valueAccessor();
                    ko.utils.domData.set(element, prefix + event, action);
                }
            };
        }
    };

    //add a handler on a parent element that responds to events from the children
    ko.bindingHandlers.delegatedHandler = {
        init: function(element, valueAccessor, allBindings) {
            var events = ko.utils.unwrapObservable(valueAccessor()) || [];

            if (typeof events === "string") {
                events = [events];
            }

            ko.utils.arrayForEach(events, function(event) {
                //check if the associated "delegated<EventName>Bubble" is true (optionally allows bubbling)
                var bubble = allBindings.get(createBindingName(event + "Bubble")) === true;

                createDelegatedBinding(event);
                ko.utils.registerEventHandler(element, event, createDelegatedHandler(event, element, bubble));
            });
        }
    };
}));
