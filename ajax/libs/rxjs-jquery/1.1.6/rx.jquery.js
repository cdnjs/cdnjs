// Copyright (c) Microsoft Open Technologies, Inc. All rights reserved. See License.txt in the project root for license information.
(function (root, factory) {
    var freeExports = typeof exports == 'object' && exports &&
    (typeof root == 'object' && root && root == root.global && (window = root), exports);

    // Because of build optimizers
    if (typeof define === 'function' && define.amd) {
        define(['rx', 'jquery', 'exports'], function (Rx, jQuery, exports) {
            root.Rx = factory(root, exports, Rx, jQuery);
            return root.Rx;
        });
    } else if (typeof module == 'object' && module && module.exports == freeExports) {
        module.exports = factory(root, module.exports, require('rx'), require('jquery'));
    } else {
        root.Rx = factory(root, {}, root.Rx, jQuery);
    }
}(this, function (global, exp, Rx, $, undefined) {
        // Headers
    var observable = Rx.Observable,
        observableProto = observable.prototype,
        AsyncSubject = Rx.AsyncSubject,
        observableCreate = observable.create,
        observableCreateWithDisposable = observable.createWithDisposable,
        disposableEmpty = Rx.Disposable.empty,
        slice = Array.prototype.slice,
        proto = $.fn;

    function observableCreateRefCount(subscribe) {
    	return observableCreate(subscribe).publish().refCount();
    }
        // Check for deferred as of jQuery 1.5
    if ($.Deferred) {
        /**
         * Converts the jQuery Deferred to an Observable sequence
         * @returns {Observable} An Observable sequence created from a jQuery Deferred object.
         */    
        $.Deferred.toObservable = function (deferred) {
            var subject = new AsyncSubject();
            deferred.done(function () {
                subject.onNext(slice.call(arguments));
                subject.onCompleted();
            }).fail(function () {
                subject.onError(slice.call(arguments));
            });
            return subject;
        };

        /**
         * Converts an existing Observable sequence to a jQuery Deferred object.
         * @returns {Deferred} A jQuery Deferred object wrapping the Observable sequence.
         */
        observableProto.toDeferred = function () {
            var deferred = $.Deferred();
            this.subscribe(function (value) {
                deferred.resolve(value);
            }, function (e) { 
                deferred.reject(e);
            });
            return deferred;  
        };        
    }
        //in order to support jQuery 1.6.*
    if ($.Callbacks) {

        /**
         * Converts an existing Callbacks object to an Observable sequence
         * @returns {Observable} An Observable sequence created from a jQuery Callbacks object.
         */
        $.Callbacks.prototype.toObservable = function () {
            var parent = this;
            return observableCreate(function (observer) {

                function handler(values) {
                    observer.onNext(values);
                }

                parent.add(handler);

                return function () {
                    parent.remove(handler);
                };
            });
        };
    }    if (!!proto.on) {
        /**
         * Attach an event handler function for one or more events to the selected elements as an Observable sequence.
         *
         * @param {String} events One or more space-separated event types and optional namespaces, such as "click" or "keydown.myPlugin".
         * @param {String} [selector] A selector string to filter the descendants of the selected elements that trigger the event. If the selector is null or omitted, the event is always triggered when it reaches the selected element.
         * @param {Any} [data] Data to be passed to the handler in event.data when an event is triggered.
         * @returns {Observable} An Observable sequence which wraps the jQuery on method.
         */
        proto.onAsObservable = function () {
            var parent = this, oargs = slice.call(arguments, 0), args;
            return observableCreateRefCount(function(observer) {

                function handler(eventObject) {
                    eventObject.additionalArguments = slice.call(arguments, 1);
                    observer.onNext(eventObject);
                }

                args = oargs.slice();
                args.push(handler);

                parent.on.apply(parent, args);

                return function() {
                    parent.off.apply(parent, args);
                };
            });         
        };
    }

    /** 
     * Attach a handler to an event for the elements as an Observable sequence.
     *
     * @param {String} eventType A string containing one or more DOM event types, such as "click" or "submit," or custom event names.
     * @param {Object} eventData An object containing data that will be passed to the event handler.
     * @returns {Observable} An Observable sequence which wraps the jQuery bind method.
     */
    proto.bindAsObservable = function(eventType, eventData) {
        var parent = this;
        return observableCreateRefCount(function(observer) {

            function handler(eventObject) {
                eventObject.additionalArguments = slice.call(arguments, 1);
                observer.onNext(eventObject);
            }

            parent.bind(eventType, eventData, handler);

            return function() {
                parent.unbind(eventType, eventData, handler);
            };
        });
    };

    /**
     * Attach a handler to one or more events for all elements that match the selector, now or in the future, based on a specific set of root elements as an Observable sequence
     *
     * @param {String} selector A selector to filter the elements that trigger the event.
     * @param {String} eventType A string containing one or more space-separated JavaScript event types, such as "click" or "keydown," or custom event names.
     * @param {Object} eventData An object containing data that will be passed to the event handler.
     * @returns {Observable} An Observable sequence which wraps the jQuery delegate method
     */
    proto.delegateAsObservable = function(selector, eventType, eventData) {
        var parent = this;
        return observableCreateRefCount(function(observer) {

            function handler(eventObject) {
                eventObject.additionalArguments = slice.call(arguments, 1);
                observer.onNext(eventObject);
            }

            parent.delegate(selector, eventType, eventData, handler);

            return function() {
                parent.undelegate(selector, eventType, handler);
            };
        });
    };

    // Removed as of 1.9
    if (!!proto.live) {
        /**
         * Attach an event handler for all elements which match the current selector, now and in the future as an Observable sequence
         *
         * @param {String} eventType A string containing a JavaScript event type, such as "click" or "keydown." As of jQuery 1.4 the string can contain multiple, space-separated event types or custom event names.
         * @param {Object} data An object containing data that will be passed to the event handler.
         * @returns {Observable} An Observable sequence which wraps the jQuery live method
         */
        proto.liveAsObservable = function(eventType, data) {
            var parent = this;
            return observableCreateRefCount(function(observer) {

                function handler(eventObject) {
                    eventObject.additionalArguments = slice.call(arguments, 1);
                    observer.onNext(eventObject);
                }

                parent.live(eventType, data, handler);
                
                return function() {
                    parent.die(eventType, data, handler);
                };
            });
        };
    }

    /**
     * Bind an event handler to the “change” JavaScript event, or trigger that event on an element as an Observable sequence.
     *
     * @param {Object} [eventData] An object containing data that will be passed to the event handler.
     * @returns {Observable} An Observable sequence which wraps the jQuery “change” event.
     */
    proto.changeAsObservable = function (eventData) {
        return this.bindAsObservable('change', eventData);
    };

    /**
     * Bind an event handler to the “click” JavaScript event, or trigger that event on an element as an Observable sequence.
     *
     * @param {Object} [eventData] An object containing data that will be passed to the event handler.
     * @returns {Observable} An Observable sequence which wraps the jQuery “click” event.
     */
    proto.clickAsObservable = function (eventData) {
        return this.bindAsObservable('click', eventData);
    };

    /**
     * Bind an event handler to the “dblclick” JavaScript event, or trigger that event on an element as an Observable sequence.
     *
     * @param {Object} [eventData] An object containing data that will be passed to the event handler.
     * @returns {Observable} An Observable sequence which wraps the jQuery "“dblclick”" event.
     */
    proto.dblclickAsObservable = function (eventData) {
        return this.bindAsObservable('dblclick', eventData);
    };    

    /**
     * Bind an event handler to the “focus” JavaScript event, or trigger that event on an element as an Observable sequence.
     *
     * @param {Object} [eventData] An object containing data that will be passed to the event handler.
     * @returns {Observable} An Observable sequence which wraps the jQuery "“focus”" event.
     */
    proto.focusAsObservable = function(eventData) {
        return this.bindAsObservable('focus', eventData);
    };

    /**
     * Bind an event handler to the “focusin” event as an Observable sequence.
     *
     * @param {Object} [eventData] An object containing data that will be passed to the event handler.
     * @returns {Observable} An Observable sequence which wraps the jQuery “focusin” event.
     */
    proto.focusinAsObservable = function(eventData) {
        return this.bindAsObservable('focusin', eventData);
    };

    /**
     * Bind an event handler to the “focusin” event as an Observable sequence.
     *
     * @param {Object} [eventData] An object containing data that will be passed to the event handler.
     * @returns {Observable} An Observable sequence which wraps the jQuery “focusin” event.
     */
    proto.focusoutAsObservable = function(eventData) {
        return this.bindAsObservable('focusout', eventData);
    };

    /**
     * Bind an event handler to the “keydown” JavaScript event, or trigger that event on an element as an Observable sequence.
     *
     * @param {Object} [eventData] An object containing data that will be passed to the event handler.
     * @returns {Observable} An Observable sequence which wraps the jQuery “keydown” event.
     */
    proto.keydownAsObservable = function(eventData) {
        return this.bindAsObservable('keydown', eventData);
    };

    /**
     * Bind an event handler to the “keyup” JavaScript event, or trigger that event on an element as an Observable sequence.
     *
     * @param {Object} [eventData] An object containing data that will be passed to the event handler.
     * @returns {Observable} An Observable sequence which wraps the jQuery “keyup” event.
     */
    proto.keyupAsObservable = function(eventData) {
        return this.bindAsObservable('keyup', eventData);
    };

    /**
     * Bind an event handler to the “load” JavaScript event as an Observable sequence.
     *
     * @param {Object} [eventData] An object containing data that will be passed to the event handler.
     * @returns {Observable} An Observable sequence which wraps the jQuery “load” event.
     */
    proto.loadAsObservable = function(eventData) {
        return this.bindAsObservable('load', eventData);
    };

    /**
     * Bind an event handler to the “mousedown” JavaScript event, or trigger that event on an element as an Observable sequence.
     *
     * @param {Object} [eventData] An object containing data that will be passed to the event handler.
     * @returns {Observable} An Observable sequence which wraps the jQuery “mousedown” event.
     */
    proto.mousedownAsObservable = function(eventData) {
        return this.bindAsObservable('mousedown', eventData);
    };

    /**
     * Bind an event handler to be fired when the mouse enters an element, or trigger that handler on an element as an Observable sequence.
     *
     * @param {Object} [eventData] An object containing data that will be passed to the event handler.
     * @returns {Observable} An Observable sequence which wraps the jQuery “mouseenter” event.
     */
    proto.mouseenterAsObservable = function(eventData) {
        return this.bindAsObservable('mouseenter', eventData);
    };

    /**
     * Bind an event handler to be fired when the mouse leaves an element, or trigger that handler on an element as an Observable sequence.
     *
     * @param {Object} [eventData] An object containing data that will be passed to the event handler.
     * @returns {Observable} An Observable sequence which wraps the jQuery “mouseleave” event.
     */
    proto.mouseleaveAsObservable = function(eventData) {
        return this.bindAsObservable('mouseleave', eventData);
    };

    /**
     * Bind an event handler to the “mousemove” JavaScript event, or trigger that event on an element as an Observable sequence.
     *
     * @param {Object} [eventData] An object containing data that will be passed to the event handler.
     * @returns {Observable} An Observable sequence which wraps the jQuery “mousemove” event.
     */
    proto.mousemoveAsObservable = function(eventData) {
        return this.bindAsObservable('mousemove', eventData);
    };

    /**
     * Bind an event handler to the “mouseout” JavaScript event, or trigger that event on an element as an Observable sequence.
     *
     * @param {Object} [eventData] An object containing data that will be passed to the event handler.
     * @returns {Observable} An Observable sequence which wraps the jQuery “mouseout” event.
     */
    proto.mouseoutAsObservable = function(eventData) {
        return this.bindAsObservable('mouseout', eventData);  
    };

    /**
     * Bind an event handler to the “mouseover” JavaScript event, or trigger that event on an element as an Observable sequence.
     *
     * @param {Object} [eventData] An object containing data that will be passed to the event handler.
     * @returns {Observable} An Observable sequence which wraps the jQuery “mouseover” event.
     */
    proto.mouseoverAsObservable = function(eventData) {
        return this.bindAsObservable('mouseover', eventData);
    };

    /**
     * Bind an event handler to the “mouseup” JavaScript event, or trigger that event on an element as an Observable sequence.
     *
     * @param {Object} [eventData] An object containing data that will be passed to the event handler.
     * @returns {Observable} An Observable sequence which wraps the jQuery “mouseup” event.
     */
    proto.mouseupAsObservable = function(eventData) {
        return this.bindAsObservable('mouseup', eventData);
    };

    /**
     * Bind an event handler to the “resize” JavaScript event, or trigger that event on an element as an Observable sequence.
     *
     * @param {Object} [eventData] An object containing data that will be passed to the event handler.
     * @returns {Observable} An Observable sequence which wraps the jQuery “resize” event.
     */
    proto.resizeAsObservable = function(eventData) {
        return this.bindAsObservable('resize', eventData);
    };

    /**
     * Bind an event handler to the “scroll” JavaScript event, or trigger that event on an element as an Observable sequence.
     *
     * @param {Object} [eventData] An object containing data that will be passed to the event handler.
     * @returns {Observable} An Observable sequence which wraps the jQuery “scroll” event.
     */
    proto.scrollAsObservable = function(eventData) {
        return this.bindAsObservable('scroll', eventData);
    };

    /**
     * Bind an event handler to the “select” JavaScript event, or trigger that event on an element as an Observable sequence.
     *
     * @param {Object} [eventData] An object containing data that will be passed to the event handler.
     * @returns {Observable} An Observable sequence which wraps the jQuery “select” event.
     */
    proto.selectAsObservable = function(eventData) {
        return this.bindAsObservable('select', eventData);
    };

    /**
     * Bind an event handler to the “select” JavaScript event, or trigger that event on an element as an Observable sequence.
     *
     * @param {Object} [eventData] An object containing data that will be passed to the event handler.
     * @returns {Observable} An Observable sequence which wraps the jQuery “select” event.
     */
    proto.submitAsObservable = function(eventData) {
        return this.bindAsObservable('submit', eventData);
    };

    /**
     * Bind an event handler to the “unload” JavaScript event as an Observable sequence.  This is deprecated as of jQuery 1.8.
     *
     * @param {Object} [eventData] An object containing data that will be passed to the event handler.
     * @returns {Observable} An Observable sequence which wraps the jQuery “unload” event.
     */
    proto.unloadAsObservable = function(eventData) {
        return this.bindAsObservable('unload', eventData);
    };

    /**
     * Attach a handler to an event for the elements as an Observable sequence. The handler is executed at most once per element.
     *
     * @param {String} events A string containing one or more JavaScript event types, such as "click" or "submit," or custom event names.
     * @param {String} [selector] A selector string to filter the descendants of the selected elements that trigger the event. If the selector is null or omitted, the event is always triggered when it reaches the selected element.
     * @param {Object} [data] An object containing data that will be passed to the event handler.
     * @returns {Observable} An Observable sequence which wraps the jQuery one method.
     */
    proto.oneAsObservable = function(events) {
        var parent = this, oargs = slice.call(arguments, 0), args;
        return observableCreateRefCount(function(observer) {

            function handler (eventObject) {
                eventObject.additionalArguments = slice.call(arguments, 1);
                observer.onNext(eventObject);	
            }

            args = oargs.slice();
            args.push(handler);
            
            parent.one.apply(parent, args);
        });
    };

    /**
     * Specify a function to execute when the DOM is fully loaded as an Observable sequence.
     *
     * @returns {Observable} An Observable sequence which wraps the jQuery ready method.
     */
    proto.readyAsObservable = function() {
        var parent = this;
        return observableCreateRefCount(function(observer) {

            function handler(eventObject) {
                observer.onNext(eventObject);
            }

            parent.ready(handler);
        });
    };
    function handleAnimation(jQueryProto, method, args) {
        var options = args[0];

        // Check for duration
        if (typeof options === 'number' || typeof options === 'string') {
            options = { duration: options };
        } else if (!options) {
            options = {};
        }

        // Check for easing
        if (args.length === 2) {
            options.easing = args[1];
        }    

        var subject = new AsyncSubject();

        options.complete = function() {
            subject.onNext(jQueryProto);
            subject.onCompleted();
        };

        jQueryProto[method](options);

        return subject.asObservable();
    }

    /**
     * Hide the matched elements as an Observable sequence.
     *
     * @param {String|Number} [duration] A string or number determining how long the animation will run.  If not specified, defaults to 400.
     * @param {String} [easing] A string indicating which easing function to use for the transition.        
     * @param {Object} [options] A map of additional options to pass to the method.
     * @param {String|Number} [options.duration] A string or number determining how long the animation will run.
     * @param {String} [options.easing] A string indicating which easing function to use for the transition.
     * @param {String|Boolean} [options.queue] A Boolean indicating whether to place the animation in the effects queue. If false, the animation will begin immediately. As of jQuery 1.7, the queue option can also accept a string, in which case the animation is added to the queue represented by that string. When a custom queue name is used the animation does not automatically start; you must call .dequeue("queuename") to start it.
     * @param {Object} [options.specialEasing] A map of one or more of the CSS properties defined by the properties argument and their corresponding easing functions.
     * @param {Number} [options.step] A function to be called for each animated property of each animated element. This function provides an opportunity to modify the Tween object to change the value of the property before it is set.
     * @returns {Observable} An Observable sequence which wraps the jQuery hide method.     
     */
    proto.hideAsObservable = function (options) {
        return handleAnimation(this, 'hide', arguments);
    };

    /**
     * Display the matched elements as an Observable sequence.
     *
     * @param {String|Number} [duration] A string or number determining how long the animation will run.  If not specified, defaults to 400.
     * @param {String} [easing] A string indicating which easing function to use for the transition.     
     * @param {Object} [options] A map of additional options to pass to the method.
     * @param {String|Number} [options.duration] A string or number determining how long the animation will run.
     * @param {String} [options.easing] A string indicating which easing function to use for the transition.
     * @param {String|Boolean} [options.queue] A Boolean indicating whether to place the animation in the effects queue. If false, the animation will begin immediately. As of jQuery 1.7, the queue option can also accept a string, in which case the animation is added to the queue represented by that string. When a custom queue name is used the animation does not automatically start; you must call .dequeue("queuename") to start it.
     * @param {Object} [options.specialEasing] A map of one or more of the CSS properties defined by the properties argument and their corresponding easing functions.
     * @param {Number} [options.step] A function to be called for each animated property of each animated element. This function provides an opportunity to modify the Tween object to change the value of the property before it is set.
     * @returns {Observable} An Observable sequence which wraps the jQuery show method.     
     */
    proto.showAsObservable = function(options) {
        return handleAnimation(this, 'show', arguments);
    };

    /**
     * Display the matched elements as an Observable sequence.
     *
     * @param {Object} properties An object of CSS properties and values that the animation will move toward.
     * @param {String|Number} [duration] A string or number determining how long the animation will run.  If not specified, defaults to 400.
     * @param {String} [easing] A string indicating which easing function to use for the transition.     
     * @param {Object} [options] A map of additional options to pass to the method.
     * @param {String|Number} [options.duration] A string or number determining how long the animation will run.
     * @param {String} [options.easing] A string indicating which easing function to use for the transition.
     * @param {String|Boolean} [options.queue] A Boolean indicating whether to place the animation in the effects queue. If false, the animation will begin immediately. As of jQuery 1.7, the queue option can also accept a string, in which case the animation is added to the queue represented by that string. When a custom queue name is used the animation does not automatically start; you must call .dequeue("queuename") to start it.
     * @param {Object} [options.specialEasing] A map of one or more of the CSS properties defined by the properties argument and their corresponding easing functions.
     * @param {Number} [options.step] A function to be called for each animated property of each animated element. This function provides an opportunity to modify the Tween object to change the value of the property before it is set.
     * @returns {Observable} An Observable sequence which wraps the jQuery show method.     
     */
    proto.animateAsObservable = function(properties, options) {
        // Check for duration
        if (typeof options === 'number' || typeof options === 'string') {
            options = { duration: options };
        } else if (!options) {
            options = {};
        }

        // Check for easing
        if (arguments.length === 3) {
            options.easing = arguments[2];
        }  

        var subject = new AsyncSubject();

        options.complete = function() {
            subject.onNext(this);
            subject.onCompleted();
        };        

        this.animate(properties, options);

        return subject.asObservable();
    };

    /**
     * Display the matched elements as an Observable sequence.
     *
     * @param {String|Number} [duration] A string or number determining how long the animation will run.  If not specified, defaults to 400.
     * @param {String} [easing] A string indicating which easing function to use for the transition.     
     * @param {Object} [options] A map of additional options to pass to the method.
     * @param {String|Number} [options.duration] A string or number determining how long the animation will run.
     * @param {String} [options.easing] A string indicating which easing function to use for the transition.
     * @param {String|Boolean} [options.queue] A Boolean indicating whether to place the animation in the effects queue. If false, the animation will begin immediately. As of jQuery 1.7, the queue option can also accept a string, in which case the animation is added to the queue represented by that string. When a custom queue name is used the animation does not automatically start; you must call .dequeue("queuename") to start it.
     * @param {Object} [options.specialEasing] A map of one or more of the CSS properties defined by the properties argument and their corresponding easing functions.
     * @param {Number} [options.step] A function to be called for each animated property of each animated element. This function provides an opportunity to modify the Tween object to change the value of the property before it is set.
     * @returns {Observable} An Observable sequence which wraps the jQuery fadeIn method.     
     */
    proto.fadeInAsObservable = function(options) {
        return handleAnimation(this, 'fadeIn', arguments);
    };

    /**
     * Adjust the opacity of the matched elements as an Observable sequence
     *
     * @param {String|Number} duration A string or number determining how long the animation will run.
     * @param {Number} opacity A number between 0 and 1 denoting the target opacity.
     * @param {String} [easing] A string indicating which easing function to use for the transition.
     * @returns {Observable} An Observable sequence which wraps the jQuery fadeTo method.   
     */
    proto.fadeToAsObservable = function(duration, opacity, easing) {
        var subject = new AsyncSubject();

        this.fadeTo(duration, opacity, easing, function() {
            subject.onNext(proto);
            subject.onCompleted();
        });

        return subject.asObservable();
    };

    /**
     * Hide the matched elements by fading them to transparent as an Observable sequence.
     *
     * @param {String|Number} [duration] A string or number determining how long the animation will run.  If not specified, defaults to 400.
     * @param {String} [easing] A string indicating which easing function to use for the transition.     
     * @param {Object} [options] A map of additional options to pass to the method.
     * @param {String|Number} [options.duration] A string or number determining how long the animation will run.
     * @param {String} [options.easing] A string indicating which easing function to use for the transition.
     * @param {String|Boolean} [options.queue] A Boolean indicating whether to place the animation in the effects queue. If false, the animation will begin immediately. As of jQuery 1.7, the queue option can also accept a string, in which case the animation is added to the queue represented by that string. When a custom queue name is used the animation does not automatically start; you must call .dequeue("queuename") to start it.
     * @param {Object} [options.specialEasing] A map of one or more of the CSS properties defined by the properties argument and their corresponding easing functions.
     * @param {Number} [options.step] A function to be called for each animated property of each animated element. This function provides an opportunity to modify the Tween object to change the value of the property before it is set.
     * @returns {Observable} An Observable sequence which wraps the jQuery fadeOut method.     
     */
    proto.fadeOutAsObservable = function(options) {
        return handleAnimation(this, 'fadeOut', arguments);
    };

    /**
     * Display or hide the matched elements by animating their opacity as an Observable sequence.
     *
     * @param {String|Number} [duration] A string or number determining how long the animation will run.  If not specified, defaults to 400.
     * @param {String} [easing] A string indicating which easing function to use for the transition.     
     * @param {Object} [options] A map of additional options to pass to the method.
     * @param {String|Number} [options.duration] A string or number determining how long the animation will run.
     * @param {String} [options.easing] A string indicating which easing function to use for the transition.
     * @param {String|Boolean} [options.queue] A Boolean indicating whether to place the animation in the effects queue. If false, the animation will begin immediately. As of jQuery 1.7, the queue option can also accept a string, in which case the animation is added to the queue represented by that string. When a custom queue name is used the animation does not automatically start; you must call .dequeue("queuename") to start it.
     * @param {Object} [options.specialEasing] A map of one or more of the CSS properties defined by the properties argument and their corresponding easing functions.
     * @param {Number} [options.step] A function to be called for each animated property of each animated element. This function provides an opportunity to modify the Tween object to change the value of the property before it is set.
     * @returns {Observable} An Observable sequence which wraps the jQuery fadeToggle method.     
     */
    proto.fadeToggleAsObservable = function(options) {
        return handleAnimation(this, 'fadeToggle', arguments);
    };

    /**
     * Display the matched elements with a sliding motion as an Observable sequence.
     *
     * @param {String|Number} [duration] A string or number determining how long the animation will run.  If not specified, defaults to 400.
     * @param {String} [easing] A string indicating which easing function to use for the transition.     
     * @param {Object} [options] A map of additional options to pass to the method.
     * @param {String|Number} [options.duration] A string or number determining how long the animation will run.
     * @param {String} [options.easing] A string indicating which easing function to use for the transition.
     * @param {String|Boolean} [options.queue] A Boolean indicating whether to place the animation in the effects queue. If false, the animation will begin immediately. As of jQuery 1.7, the queue option can also accept a string, in which case the animation is added to the queue represented by that string. When a custom queue name is used the animation does not automatically start; you must call .dequeue("queuename") to start it.
     * @param {Object} [options.specialEasing] A map of one or more of the CSS properties defined by the properties argument and their corresponding easing functions.
     * @param {Number} [options.step] A function to be called for each animated property of each animated element. This function provides an opportunity to modify the Tween object to change the value of the property before it is set.
     * @returns {Observable} An Observable sequence which wraps the jQuery slideDown method.     
     */
    proto.slideDownAsObservable = function(options) {
        return handleAnimation(this, 'slideDown', arguments);
    };

    /**
     * Hide the matched elements with a sliding motion as an Observable sequence.
     *
     * @param {String|Number} [duration] A string or number determining how long the animation will run.  If not specified, defaults to 400.
     * @param {String} [easing] A string indicating which easing function to use for the transition.     
     * @param {Object} [options] A map of additional options to pass to the method.
     * @param {String|Number} [options.duration] A string or number determining how long the animation will run.
     * @param {String} [options.easing] A string indicating which easing function to use for the transition.
     * @param {String|Boolean} [options.queue] A Boolean indicating whether to place the animation in the effects queue. If false, the animation will begin immediately. As of jQuery 1.7, the queue option can also accept a string, in which case the animation is added to the queue represented by that string. When a custom queue name is used the animation does not automatically start; you must call .dequeue("queuename") to start it.
     * @param {Object} [options.specialEasing] A map of one or more of the CSS properties defined by the properties argument and their corresponding easing functions.
     * @param {Number} [options.step] A function to be called for each animated property of each animated element. This function provides an opportunity to modify the Tween object to change the value of the property before it is set.
     * @returns {Observable} An Observable sequence which wraps the jQuery slideUp method.     
     */
    proto.slideUpAsObservable = function(options) {
        return handleAnimation(this, 'slideUp', arguments);
    };

    /**
     * Hide the matched elements with a sliding motion as an Observable sequence.
     *
     * @param {String|Number} [duration] A string or number determining how long the animation will run.  If not specified, defaults to 400.
     * @param {String} [easing] A string indicating which easing function to use for the transition.     
     * @param {Object} [options] A map of additional options to pass to the method.
     * @param {String|Number} [options.duration] A string or number determining how long the animation will run.
     * @param {String} [options.easing] A string indicating which easing function to use for the transition.
     * @param {String|Boolean} [options.queue] A Boolean indicating whether to place the animation in the effects queue. If false, the animation will begin immediately. As of jQuery 1.7, the queue option can also accept a string, in which case the animation is added to the queue represented by that string. When a custom queue name is used the animation does not automatically start; you must call .dequeue("queuename") to start it.
     * @param {Object} [options.specialEasing] A map of one or more of the CSS properties defined by the properties argument and their corresponding easing functions.
     * @param {Number} [options.step] A function to be called for each animated property of each animated element. This function provides an opportunity to modify the Tween object to change the value of the property before it is set.
     * @returns {Observable} An Observable sequence which wraps the jQuery slideToggle method.     
     */
    proto.slideToggleAsObservable = function(options) {
        return handleAnimation(this, 'slideToggle', arguments);
    };

    /**
     * Display or hide the matched elements as an Observable sequence.
     *
     * @param {String|Number} [duration] A string or number determining how long the animation will run.  If not specified, defaults to 400.
     * @param {String} [easing] A string indicating which easing function to use for the transition.     
     * @param {Object} [options] A map of additional options to pass to the method.
     * @param {String|Number} [options.duration] A string or number determining how long the animation will run.
     * @param {String} [options.easing] A string indicating which easing function to use for the transition.
     * @param {String|Boolean} [options.queue] A Boolean indicating whether to place the animation in the effects queue. If false, the animation will begin immediately. As of jQuery 1.7, the queue option can also accept a string, in which case the animation is added to the queue represented by that string. When a custom queue name is used the animation does not automatically start; you must call .dequeue("queuename") to start it.
     * @param {Object} [options.specialEasing] A map of one or more of the CSS properties defined by the properties argument and their corresponding easing functions.
     * @param {Number} [options.step] A function to be called for each animated property of each animated element. This function provides an opportunity to modify the Tween object to change the value of the property before it is set.
     * @returns {Observable} An Observable sequence which wraps the jQuery slideToggle method.     
     */
    proto.toggleAsObservable = function(duration, easing) {
        return handleAnimation(this, 'toggle', arguments);
    };
    var ajaxAsObservable = $.ajaxAsObservable = function(settings) {      
        var subject = new AsyncSubject();

        var internalSettings = {
            success: function(data, textStatus, jqXHR) {
                subject.onNext({ data: data, textStatus: textStatus, jqXHR: jqXHR });
                subject.onCompleted();
            },
            error: function(jqXHR, textStatus, errorThrown) {
                subject.onError({ jqXHR: jqXHR, textStatus: textStatus, errorThrown: errorThrown });
            }
        };
        
        $.extend(true, internalSettings, settings);

        $.ajax(internalSettings);

        return subject;
    };

    /**
     * Load data from the server using a HTTP GET request as an Observable sequence.
     *
     * @param {String} url A string containing the URL to which the request is sent.
     * @param {Object} [data] A plain object or string that is sent to the server with the request.
     * @param {String} [dataType] The type of data expected from the server. Default: Intelligent Guess (xml, json, script, or html).
     * @returns {Observable} An Observable sequence which wraps the jQuery get method.       
     */
    $.getAsObservable = function(url, data, dataType) {
        return ajaxAsObservable({ url: url, dataType: dataType, data: data });
    };

    /**
     * Load JSON-encoded data from the server using a GET HTTP request as an Observable sequence.
     *
     * @param {String} url A string containing the URL to which the request is sent.
     * @param {Object} [data] A plain object or string that is sent to the server with the request.
     * @returns {Observable} An Observable sequence which wraps the jQuery getJSON method.       
     */
    $.getJSONAsObservable = function(url, data) {
        return ajaxAsObservable({ url: url, dataType: 'json', data: data });
    };

    /**
     * Load a JavaScript file from the server using a GET HTTP request, then execute it as an Observable sequence.
     *
     * @param {String} url A string containing the URL to which the request is sent.
     * @returns {Observable} An Observable sequence which wraps the jQuery getJSON method.       
     */
    $.getScriptAsObservable = function(url) {
        return ajaxAsObservable({ url: url, dataType: 'script'});
    };

    /**
     * Load data from the server using a HTTP POST request as an Observable sequence.
     *
     * @param {String} url A string containing the URL to which the request is sent.
     * @param {Object} [data] A plain object or string that is sent to the server with the request.
     * @param {String} [dataType] The type of data expected from the server. Default: Intelligent Guess (xml, json, script, or html).
     * @returns {Observable} An Observable sequence which wraps the jQuery get method.       
     */
    $.postAsObservable = function(url, data, dataType) {
        return ajaxAsObservable({ url: url, dataType: dataType, data: data, type: 'POST'});	
    };
    return Rx;
}));