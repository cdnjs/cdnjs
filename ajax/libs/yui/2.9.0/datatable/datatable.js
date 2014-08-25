/*
Copyright (c) 2011, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.com/yui/license.html
version: 2.9.0
*/
/**
 * Mechanism to execute a series of callbacks in a non-blocking queue.  Each callback is executed via setTimout unless configured with a negative timeout, in which case it is run in blocking mode in the same execution thread as the previous callback.  Callbacks can be function references or object literals with the following keys:
 * <ul>
 *    <li><code>method</code> - {Function} REQUIRED the callback function.</li>
 *    <li><code>scope</code> - {Object} the scope from which to execute the callback.  Default is the global window scope.</li>
 *    <li><code>argument</code> - {Array} parameters to be passed to method as individual arguments.</li>
 *    <li><code>timeout</code> - {number} millisecond delay to wait after previous callback completion before executing this callback.  Negative values cause immediate blocking execution.  Default 0.</li>
 *    <li><code>until</code> - {Function} boolean function executed before each iteration.  Return true to indicate completion and proceed to the next callback.</li>
 *    <li><code>iterations</code> - {Number} number of times to execute the callback before proceeding to the next callback in the chain. Incompatible with <code>until</code>.</li>
 * </ul>
 *
 * @namespace YAHOO.util
 * @class Chain
 * @constructor
 * @param callback* {Function|Object} Any number of callbacks to initialize the queue
*/
YAHOO.util.Chain = function () {
    /**
     * The callback queue
     * @property q
     * @type {Array}
     * @private
     */
    this.q = [].slice.call(arguments);

    /**
     * Event fired when the callback queue is emptied via execution (not via
     * a call to chain.stop().
     * @event end
     */
    this.createEvent('end');
};

YAHOO.util.Chain.prototype = {
    /**
     * Timeout id used to pause or stop execution and indicate the execution state of the Chain.  0 indicates paused or stopped, -1 indicates blocking execution, and any positive number indicates non-blocking execution.
     * @property id
     * @type {number}
     * @private
     */
    id   : 0,

    /**
     * Begin executing the chain, or resume execution from the last paused position.
     * @method run
     * @return {Chain} the Chain instance
     */
    run : function () {
        // Grab the first callback in the queue
        var c  = this.q[0],
            fn;

        // If there is no callback in the queue or the Chain is currently
        // in an execution mode, return
        if (!c) {
            this.fireEvent('end');
            return this;
        } else if (this.id) {
            return this;
        }

        fn = c.method || c;

        if (typeof fn === 'function') {
            var o    = c.scope || {},
                args = c.argument || [],
                ms   = c.timeout || 0,
                me   = this;
                
            if (!(args instanceof Array)) {
                args = [args];
            }

            // Execute immediately if the callback timeout is negative.
            if (ms < 0) {
                this.id = ms;
                if (c.until) {
                    for (;!c.until();) {
                        // Execute the callback from scope, with argument
                        fn.apply(o,args);
                    }
                } else if (c.iterations) {
                    for (;c.iterations-- > 0;) {
                        fn.apply(o,args);
                    }
                } else {
                    fn.apply(o,args);
                }
                this.q.shift();
                this.id = 0;
                return this.run();
            } else {
                // If the until condition is set, check if we're done
                if (c.until) {
                    if (c.until()) {
                        // Shift this callback from the queue and execute the next
                        // callback
                        this.q.shift();
                        return this.run();
                    }
                // Otherwise if either iterations is not set or we're
                // executing the last iteration, shift callback from the queue
                } else if (!c.iterations || !--c.iterations) {
                    this.q.shift();
                }

                // Otherwise set to execute after the configured timeout
                this.id = setTimeout(function () {
                    // Execute the callback from scope, with argument
                    fn.apply(o,args);
                    // Check if the Chain was not paused from inside the callback
                    if (me.id) {
                        // Indicate ready to run state
                        me.id = 0;
                        // Start the fun all over again
                        me.run();
                    }
                },ms);
            }
        }

        return this;
    },
    
    /**
     * Add a callback to the end of the queue
     * @method add
     * @param c {Function|Object} the callback function ref or object literal
     * @return {Chain} the Chain instance
     */
    add  : function (c) {
        this.q.push(c);
        return this;
    },

    /**
     * Pause the execution of the Chain after the current execution of the
     * current callback completes.  If called interstitially, clears the
     * timeout for the pending callback. Paused Chains can be restarted with
     * chain.run()
     * @method pause
     * @return {Chain} the Chain instance
     */
    pause: function () {
        // Conditional added for Caja compatibility
        if (this.id > 0) {
            clearTimeout(this.id);
        }
        this.id = 0;
        return this;
    },

    /**
     * Stop and clear the Chain's queue after the current execution of the
     * current callback completes.
     * @method stop
     * @return {Chain} the Chain instance
     */
    stop : function () { 
        this.pause();
        this.q = [];
        return this;
    }
};
YAHOO.lang.augmentProto(YAHOO.util.Chain,YAHOO.util.EventProvider);

/**
 * Augments the Event Utility with a <code>delegate</code> method that 
 * facilitates easy creation of delegated event listeners.  (Note: Using CSS 
 * selectors as the filtering criteria for delegated event listeners requires 
 * inclusion of the Selector Utility.)
 *
 * @module event-delegate
 * @title Event Utility Event Delegation Module
 * @namespace YAHOO.util
 * @requires event
 */

(function () {

    var Event = YAHOO.util.Event,
        Lang = YAHOO.lang,
        delegates = [],


        getMatch = function(el, selector, container) {
        
            var returnVal;
        
            if (!el || el === container) {
                returnVal = false;
            }
            else {
                returnVal = YAHOO.util.Selector.test(el, selector) ? el: getMatch(el.parentNode, selector, container);
            }
        
            return returnVal;
        
        };


    Lang.augmentObject(Event, {

        /**
         * Creates a delegate function used to call event listeners specified 
         * via the <code>YAHOO.util.Event.delegate</code> method.
         *
         * @method _createDelegate
         *
         * @param {Function} fn        The method (event listener) to call.
         * @param {Function|string} filter Function or CSS selector used to 
         * determine for what element(s) the event listener should be called.        
         * @param {Object}   obj    An arbitrary object that will be 
         *                             passed as a parameter to the listener.
         * @param {Boolean|object}  overrideContext  If true, the value of the 
         *                             obj parameter becomes the execution context
         *                          of the listener. If an object, this object
         *                          becomes the execution context.
         * @return {Function} Function that will call the event listener 
         * specified by the <code>YAHOO.util.Event.delegate</code> method.
         * @private
         * @for Event
         * @static
         */
        _createDelegate: function (fn, filter, obj, overrideContext) {

            return function (event) {

                var container = this,
                    target = Event.getTarget(event),
                    selector = filter,

                    //    The user might have specified the document object 
                    //    as the delegation container, in which case it is not 
                    //    nessary to scope the provided CSS selector(s) to the 
                    //    delegation container
                    bDocument = (container.nodeType === 9),

                    matchedEl,
                    context,
                    sID,
                    sIDSelector;


                if (Lang.isFunction(filter)) {
                    matchedEl = filter(target);
                }
                else if (Lang.isString(filter)) {

                    if (!bDocument) {

                        sID = container.id;

                        if (!sID) {
                            sID = Event.generateId(container);
                        }                        

                        //    Scope all selectors to the container
                        sIDSelector = ("#" + sID + " ");
                        selector = (sIDSelector + filter).replace(/,/gi, ("," + sIDSelector));

                    }


                    if (YAHOO.util.Selector.test(target, selector)) {
                        matchedEl = target;
                    }
                    else if (YAHOO.util.Selector.test(target, ((selector.replace(/,/gi, " *,")) + " *"))) {

                        //    The target is a descendant of an element matching 
                        //    the selector, so crawl up to find the ancestor that 
                        //    matches the selector

                        matchedEl = getMatch(target, selector, container);

                    }

                }


                if (matchedEl) {

                    //    The default context for delegated listeners is the 
                    //    element that matched the filter.

                    context = matchedEl;

                    if (overrideContext) {
                        if (overrideContext === true) {
                            context = obj;
                        } else {
                            context = overrideContext;
                        }
                    }

                    //    Call the listener passing in the container and the 
                    //    element that matched the filter in case the user 
                    //    needs those.

                    return fn.call(context, event, matchedEl, container, obj);

                }

            };

        },


        /**
         * Appends a delegated event listener.  Delegated event listeners 
         * receive three arguments by default: the DOM event, the element  
         * specified by the filtering function or CSS selector, and the 
         * container element (the element to which the event listener is 
         * bound).  (Note: Using the delegate method requires the event-delegate 
         * module.  Using CSS selectors as the filtering criteria for delegated 
         * event listeners requires inclusion of the Selector Utility.)
         *
         * @method delegate
         *
         * @param {String|HTMLElement|Array|NodeList} container An id, an element 
         *  reference, or a collection of ids and/or elements to assign the 
         *  listener to.
         * @param {String}   type     The type of event listener to append
         * @param {Function} fn        The method the event invokes
         * @param {Function|string} filter Function or CSS selector used to 
         * determine for what element(s) the event listener should be called. 
         * When a function is specified, the function should return an 
         * HTML element.  Using a CSS Selector requires the inclusion of the 
         * CSS Selector Utility.
         * @param {Object}   obj    An arbitrary object that will be 
         *                             passed as a parameter to the listener
         * @param {Boolean|object}  overrideContext  If true, the value of the obj parameter becomes
         *                             the execution context of the listener. If an
         *                             object, this object becomes the execution
         *                             context.
         * @return {Boolean} Returns true if the action was successful or defered,
         *                   false if one or more of the elements 
         *                   could not have the listener attached,
         *                   or if the operation throws an exception.
         * @static
         * @for Event
         */
        delegate: function (container, type, fn, filter, obj, overrideContext) {

            var sType = type,
                fnMouseDelegate,
                fnDelegate;


            if (Lang.isString(filter) && !YAHOO.util.Selector) {
                return false;
            }


            if (type == "mouseenter" || type == "mouseleave") {

                if (!Event._createMouseDelegate) {
                    return false;
                }

                //    Look up the real event--either mouseover or mouseout
                sType = Event._getType(type);

                fnMouseDelegate = Event._createMouseDelegate(fn, obj, overrideContext);

                fnDelegate = Event._createDelegate(function (event, matchedEl, container) {

                    return fnMouseDelegate.call(matchedEl, event, container);

                }, filter, obj, overrideContext);

            }
            else {

                fnDelegate = Event._createDelegate(fn, filter, obj, overrideContext);

            }

            delegates.push([container, sType, fn, fnDelegate]);
            
            return Event.on(container, sType, fnDelegate);

        },


        /**
         * Removes a delegated event listener.
         *
         * @method removeDelegate
         *
         * @param {String|HTMLElement|Array|NodeList} container An id, an element 
         *  reference, or a collection of ids and/or elements to remove
         *  the listener from.
         * @param {String} type The type of event to remove.
         * @param {Function} fn The method the event invokes.  If fn is
         *  undefined, then all event listeners for the type of event are 
         *  removed.
         * @return {boolean} Returns true if the unbind was successful, false 
         *  otherwise.
         * @static
         * @for Event
         */
        removeDelegate: function (container, type, fn) {

            var sType = type,
                returnVal = false,
                index,
                cacheItem;

            //    Look up the real event--either mouseover or mouseout
            if (type == "mouseenter" || type == "mouseleave") {
                sType = Event._getType(type);
            }

            index = Event._getCacheIndex(delegates, container, sType, fn);

            if (index >= 0) {
                cacheItem = delegates[index];
            }


            if (container && cacheItem) {

                returnVal = Event.removeListener(cacheItem[0], cacheItem[1], cacheItem[3]);

                if (returnVal) {
                    delete delegates[index][2];
                    delete delegates[index][3];
                    delegates.splice(index, 1);
                }        
        
            }

            return returnVal;

        }
        
    });

}());


/**
 * Augments the Event Utility with support for the mouseenter and mouseleave
 * events:  A mouseenter event fires the first time the mouse enters an
 * element; a mouseleave event first the first time the mouse leaves an
 * element.
 *
 * @module event-mouseenter
 * @title Event Utility mouseenter and mouseout Module
 * @namespace YAHOO.util
 * @requires event
 */

(function () {

    var Event = YAHOO.util.Event,
        Lang = YAHOO.lang,

        addListener = Event.addListener,
        removeListener = Event.removeListener,
        getListeners = Event.getListeners,

        delegates = [],

        specialTypes = {
            mouseenter: "mouseover",
            mouseleave: "mouseout"
        },

        remove = function(el, type, fn) {

            var index = Event._getCacheIndex(delegates, el, type, fn),
                cacheItem,
                returnVal;

            if (index >= 0) {
                cacheItem = delegates[index];
            }

            if (el && cacheItem) {

                //    removeListener will translate the value of type
                returnVal = removeListener.call(Event, cacheItem[0], type, cacheItem[3]);

                if (returnVal) {
                    delete delegates[index][2];
                    delete delegates[index][3];
                    delegates.splice(index, 1);
                }

            }

            return returnVal;

        };


    Lang.augmentObject(Event._specialTypes, specialTypes);

    Lang.augmentObject(Event, {

        /**
         * Creates a delegate function used to call mouseover and mouseleave
         * event listeners specified via the
         * <code>YAHOO.util.Event.addListener</code>
         * or <code>YAHOO.util.Event.on</code> method.
         *
         * @method _createMouseDelegate
         *
         * @param {Function} fn        The method (event listener) to call
         * @param {Object}   obj    An arbitrary object that will be
         *                             passed as a parameter to the listener
         * @param {Boolean|object}  overrideContext  If true, the value of the
         *                             obj parameter becomes the execution context
         *                          of the listener. If an object, this object
         *                          becomes the execution context.
         * @return {Function} Function that will call the event listener
         * specified by either the <code>YAHOO.util.Event.addListener</code>
         * or <code>YAHOO.util.Event.on</code> method.
         * @private
         * @static
         * @for Event
         */
        _createMouseDelegate: function (fn, obj, overrideContext) {

            return function (event, container) {

                var el = this,
                    relatedTarget = Event.getRelatedTarget(event),
                    context,
                    args;

                if (el != relatedTarget && !YAHOO.util.Dom.isAncestor(el, relatedTarget)) {

                    context = el;

                    if (overrideContext) {
                        if (overrideContext === true) {
                            context = obj;
                        } else {
                            context = overrideContext;
                        }
                    }

                    // The default args passed back to a mouseenter or
                    // mouseleave listener are: the event, and any object
                    // the user passed when subscribing

                    args = [event, obj];

                    // Add the element and delegation container as arguments
                    // when delegating mouseenter and mouseleave

                    if (container) {
                        args.splice(1, 0, el, container);
                    }

                    return fn.apply(context, args);

                }

            };

        },

        addListener: function (el, type, fn, obj, overrideContext) {

            var fnDelegate,
                returnVal;

            if (specialTypes[type]) {

                fnDelegate = Event._createMouseDelegate(fn, obj, overrideContext);

                fnDelegate.mouseDelegate = true;

                delegates.push([el, type, fn, fnDelegate]);

                //    addListener will translate the value of type
                returnVal = addListener.call(Event, el, type, fnDelegate);

            }
            else {
                returnVal = addListener.apply(Event, arguments);
            }

            return returnVal;

        },

        removeListener: function (el, type, fn) {

            var returnVal;

            if (specialTypes[type]) {
                returnVal = remove.apply(Event, arguments);
            }
            else {
                returnVal = removeListener.apply(Event, arguments);
            }

            return returnVal;

        },

        getListeners: function (el, type) {

            //    If the user specified the type as mouseover or mouseout,
            //    need to filter out those used by mouseenter and mouseleave.
            //    If the user specified the type as mouseenter or mouseleave,
            //    need to filter out the true mouseover and mouseout listeners.

            var listeners = [],
                elListeners,
                bMouseOverOrOut = (type === "mouseover" || type === "mouseout"),
                bMouseDelegate,
                i,
                l;

            if (type && (bMouseOverOrOut || specialTypes[type])) {

                elListeners = getListeners.call(Event, el, this._getType(type));

                if (elListeners) {

                    for (i=elListeners.length-1; i>-1; i--) {

                        l = elListeners[i];
                        bMouseDelegate = l.fn.mouseDelegate;

                        if ((specialTypes[type] && bMouseDelegate) || (bMouseOverOrOut && !bMouseDelegate)) {
                            listeners.push(l);
                        }

                    }

                }

            }
            else {
                listeners = getListeners.apply(Event, arguments);
            }

            return (listeners && listeners.length) ? listeners : null;

        }

    }, true);

    Event.on = Event.addListener;

}());
YAHOO.register("event-mouseenter", YAHOO.util.Event, {version: "2.9.0", build: "2800"});

var Y = YAHOO,
    Y_DOM = YAHOO.util.Dom,
    EMPTY_ARRAY = [],
    Y_UA = Y.env.ua,
    Y_Lang = Y.lang,
    Y_DOC = document,
    Y_DOCUMENT_ELEMENT = Y_DOC.documentElement,

    Y_DOM_inDoc = Y_DOM.inDocument,
    Y_mix = Y_Lang.augmentObject,
    Y_guid = Y_DOM.generateId,

    Y_getDoc = function(element) {
        var doc = Y_DOC;
        if (element) {
            doc = (element.nodeType === 9) ? element : // element === document
                element.ownerDocument || // element === DOM node
                element.document || // element === window
                Y_DOC; // default
        }

        return doc;
    },

    Y_Array = function(o, startIdx) {
        var l, a, start = startIdx || 0;

        // IE errors when trying to slice HTMLElement collections
        try {
            return Array.prototype.slice.call(o, start);
        } catch (e) {
            a = [];
            l = o.length;
            for (; start < l; start++) {
                a.push(o[start]);
            }
            return a;
        }
    },

    Y_DOM_allById = function(id, root) {
        root = root || Y_DOC;
        var nodes = [],
            ret = [],
            i,
            node;

        if (root.querySelectorAll) {
            ret = root.querySelectorAll('[id="' + id + '"]');
        } else if (root.all) {
            nodes = root.all(id);

            if (nodes) {
                // root.all may return HTMLElement or HTMLCollection.
                // some elements are also HTMLCollection (FORM, SELECT).
                if (nodes.nodeName) {
                    if (nodes.id === id) { // avoid false positive on name
                        ret.push(nodes);
                        nodes = EMPTY_ARRAY; // done, no need to filter
                    } else { //  prep for filtering
                        nodes = [nodes];
                    }
                }

                if (nodes.length) {
                    // filter out matches on node.name
                    // and element.id as reference to element with id === 'id'
                    for (i = 0; node = nodes[i++];) {
                        if (node.id === id  ||
                                (node.attributes && node.attributes.id &&
                                node.attributes.id.value === id)) {
                            ret.push(node);
                        }
                    }
                }
            }
        } else {
            ret = [Y_getDoc(root).getElementById(id)];
        }

        return ret;
    };

/**
 * The selector-native module provides support for native querySelector
 * @module dom
 * @submodule selector-native
 * @for Selector
 */

/**
 * Provides support for using CSS selectors to query the DOM
 * @class Selector
 * @static
 * @for Selector
 */

var COMPARE_DOCUMENT_POSITION = 'compareDocumentPosition',
    OWNER_DOCUMENT = 'ownerDocument',

Selector = {
    _foundCache: [],

    useNative: true,

    _compare: ('sourceIndex' in Y_DOCUMENT_ELEMENT) ?
        function(nodeA, nodeB) {
            var a = nodeA.sourceIndex,
                b = nodeB.sourceIndex;

            if (a === b) {
                return 0;
            } else if (a > b) {
                return 1;
            }

            return -1;

        } : (Y_DOCUMENT_ELEMENT[COMPARE_DOCUMENT_POSITION] ?
        function(nodeA, nodeB) {
            if (nodeA[COMPARE_DOCUMENT_POSITION](nodeB) & 4) {
                return -1;
            } else {
                return 1;
            }
        } :
        function(nodeA, nodeB) {
            var rangeA, rangeB, compare;
            if (nodeA && nodeB) {
                rangeA = nodeA[OWNER_DOCUMENT].createRange();
                rangeA.setStart(nodeA, 0);
                rangeB = nodeB[OWNER_DOCUMENT].createRange();
                rangeB.setStart(nodeB, 0);
                compare = rangeA.compareBoundaryPoints(1, rangeB); // 1 === Range.START_TO_END
            }

            return compare;

    }),

    _sort: function(nodes) {
        if (nodes) {
            nodes = Y_Array(nodes, 0, true);
            if (nodes.sort) {
                nodes.sort(Selector._compare);
            }
        }

        return nodes;
    },

    _deDupe: function(nodes) {
        var ret = [],
            i, node;

        for (i = 0; (node = nodes[i++]);) {
            if (!node._found) {
                ret[ret.length] = node;
                node._found = true;
            }
        }

        for (i = 0; (node = ret[i++]);) {
            node._found = null;
            node.removeAttribute('_found');
        }

        return ret;
    },

    /**
     * Retrieves a set of nodes based on a given CSS selector.
     * @method query
     *
     * @param {string} selector The CSS Selector to test the node against.
     * @param {HTMLElement} root optional An HTMLElement to start the query from. Defaults to Y.config.doc
     * @param {Boolean} firstOnly optional Whether or not to return only the first match.
     * @return {Array} An array of nodes that match the given selector.
     * @static
     */
    query: function(selector, root, firstOnly, skipNative) {
        if (typeof root == 'string') {
            root = Y_DOM.get(root);
            if (!root) {
                return (firstOnly) ? null : [];
            }
        } else {
            root = root || Y_DOC;
        }

        var ret = [],
            useNative = (Selector.useNative && Y_DOC.querySelector && !skipNative),
            queries = [[selector, root]],
            query,
            result,
            i,
            fn = (useNative) ? Selector._nativeQuery : Selector._bruteQuery;

        if (selector && fn) {
            // split group into seperate queries
            if (!skipNative && // already done if skipping
                    (!useNative || root.tagName)) { // split native when element scoping is needed
                queries = Selector._splitQueries(selector, root);
            }

            for (i = 0; (query = queries[i++]);) {
                result = fn(query[0], query[1], firstOnly);
                if (!firstOnly) { // coerce DOM Collection to Array
                    result = Y_Array(result, 0, true);
                }
                if (result) {
                    ret = ret.concat(result);
                }
            }

            if (queries.length > 1) { // remove dupes and sort by doc order
                ret = Selector._sort(Selector._deDupe(ret));
            }
        }

        Y.log('query: ' + selector + ' returning: ' + ret.length, 'info', 'Selector');
        return (firstOnly) ? (ret[0] || null) : ret;

    },

    // allows element scoped queries to begin with combinator
    // e.g. query('> p', document.body) === query('body > p')
    _splitQueries: function(selector, node) {
        var groups = selector.split(','),
            queries = [],
            prefix = '',
            i, len;

        if (node) {
            // enforce for element scoping
            if (node.tagName) {
                node.id = node.id || Y_guid();
                prefix = '[id="' + node.id + '"] ';
            }

            for (i = 0, len = groups.length; i < len; ++i) {
                selector =  prefix + groups[i];
                queries.push([selector, node]);
            }
        }

        return queries;
    },

    _nativeQuery: function(selector, root, one) {
        if (Y_UA.webkit && selector.indexOf(':checked') > -1 &&
                (Selector.pseudos && Selector.pseudos.checked)) { // webkit (chrome, safari) fails to find "selected"
            return Selector.query(selector, root, one, true); // redo with skipNative true to try brute query
        }
        try {
            //Y.log('trying native query with: ' + selector, 'info', 'selector-native');
            return root['querySelector' + (one ? '' : 'All')](selector);
        } catch(e) { // fallback to brute if available
            //Y.log('native query error; reverting to brute query with: ' + selector, 'info', 'selector-native');
            return Selector.query(selector, root, one, true); // redo with skipNative true
        }
    },

    filter: function(nodes, selector) {
        var ret = [],
            i, node;

        if (nodes && selector) {
            for (i = 0; (node = nodes[i++]);) {
                if (Selector.test(node, selector)) {
                    ret[ret.length] = node;
                }
            }
        } else {
            Y.log('invalid filter input (nodes: ' + nodes +
                    ', selector: ' + selector + ')', 'warn', 'Selector');
        }

        return ret;
    },

    test: function(node, selector, root) {
        var ret = false,
            groups = selector.split(','),
            useFrag = false,
            parent,
            item,
            items,
            frag,
            i, j, group;

        if (node && node.tagName) { // only test HTMLElements

            // we need a root if off-doc
            if (!root && !Y_DOM_inDoc(node)) {
                parent = node.parentNode;
                if (parent) {
                    root = parent;
                } else { // only use frag when no parent to query
                    frag = node[OWNER_DOCUMENT].createDocumentFragment();
                    frag.appendChild(node);
                    root = frag;
                    useFrag = true;
                }
            }
            root = root || node[OWNER_DOCUMENT];

            if (!node.id) {
                node.id = Y_guid();
            }
            for (i = 0; (group = groups[i++]);) { // TODO: off-dom test
                group += '[id="' + node.id + '"]';
                items = Selector.query(group, root);

                for (j = 0; item = items[j++];) {
                    if (item === node) {
                        ret = true;
                        break;
                    }
                }
                if (ret) {
                    break;
                }
            }

            if (useFrag) { // cleanup
                frag.removeChild(node);
            }
        }

        return ret;
    }

};

YAHOO.util.Selector = Selector;
/**
 * The selector module provides helper methods allowing CSS2 Selectors to be used with DOM elements.
 * @module dom
 * @submodule selector-css2
 * @for Selector
 */

/**
 * Provides helper methods for collecting and filtering DOM elements.
 */

var PARENT_NODE = 'parentNode',
    TAG_NAME = 'tagName',
    ATTRIBUTES = 'attributes',
    COMBINATOR = 'combinator',
    PSEUDOS = 'pseudos',

    SelectorCSS2 = {
        _reRegExpTokens: /([\^\$\?\[\]\*\+\-\.\(\)\|\\])/, // TODO: move?
        SORT_RESULTS: true,
        _children: function(node, tag) {
            var ret = node.children,
                i,
                children = [],
                childNodes,
                child;

            if (node.children && tag && node.children.tags) {
                children = node.children.tags(tag);
            } else if ((!ret && node[TAG_NAME]) || (ret && tag)) { // only HTMLElements have children
                childNodes = ret || node.childNodes;
                ret = [];
                for (i = 0; (child = childNodes[i++]);) {
                    if (child.tagName) {
                        if (!tag || tag === child.tagName) {
                            ret.push(child);
                        }
                    }
                }
            }

            return ret || [];
        },

        _re: {
            //attr: /(\[.*\])/g,
            attr: /(\[[^\]]*\])/g,
            //esc: /\\[:\[][\w\d\]]*/gi,
            esc: /\\[:\[\]\(\)#\.\'\>+~"]/gi,
            //pseudos: /:([\-\w]+(?:\(?:['"]?(.+)['"]?\))*)/i
            pseudos: /(\([^\)]*\))/g
        },

        /**
         * Mapping of shorthand tokens to corresponding attribute selector
         * @property shorthand
         * @type object
         */
        shorthand: {
            //'\\#([^\\s\\\\(\\[:]*)': '[id=$1]',
            '\\#(-?[_a-z]+[-\\w\\uE000]*)': '[id=$1]',
            //'\\#([^\\s\\\.:\\[\\]]*)': '[id=$1]',
            //'\\.([^\\s\\\\(\\[:]*)': '[className=$1]'
            '\\.(-?[_a-z]+[-\\w\\uE000]*)': '[className~=$1]'
        },

        /**
         * List of operators and corresponding boolean functions.
         * These functions are passed the attribute and the current node's value of the attribute.
         * @property operators
         * @type object
         */
        operators: {
            '': function(node, attr) { return !!node.getAttribute(attr); }, // Just test for existence of attribute
            //'': '.+',
            //'=': '^{val}$', // equality
            '~=': '(?:^|\\s+){val}(?:\\s+|$)', // space-delimited
            '|=': '^{val}(?:-|$)' // optional hyphen-delimited
        },

        pseudos: {
           'first-child': function(node) {
                return Selector._children(node[PARENT_NODE])[0] === node;
            }
        },

        _bruteQuery: function(selector, root, firstOnly) {
            var ret = [],
                nodes = [],
                tokens = Selector._tokenize(selector),
                token = tokens[tokens.length - 1],
                rootDoc = Y_getDoc(root),
                child,
                id,
                className,
                tagName;


            // if we have an initial ID, set to root when in document
            /*
            if (tokens[0] && rootDoc === root &&
                    (id = tokens[0].id) &&
                    rootDoc.getElementById(id)) {
                root = rootDoc.getElementById(id);
            }
            */

            if (token) {
                // prefilter nodes
                id = token.id;
                className = token.className;
                tagName = token.tagName || '*';

                if (root.getElementsByTagName) { // non-IE lacks DOM api on doc frags
                    // try ID first, unless no root.all && root not in document
                    // (root.all works off document, but not getElementById)
                    // TODO: move to allById?
                    if (id && (root.all || (root.nodeType === 9 || Y_DOM_inDoc(root)))) {
                        nodes = Y_DOM_allById(id, root);
                    // try className
                    } else if (className) {
                        nodes = root.getElementsByClassName(className);
                    } else { // default to tagName
                        nodes = root.getElementsByTagName(tagName);
                    }

                } else { // brute getElementsByTagName('*')
                    child = root.firstChild;
                    while (child) {
                        if (child.tagName) { // only collect HTMLElements
                            nodes.push(child);
                        }
                        child = child.nextSilbing || child.firstChild;
                    }
                }
                if (nodes.length) {
                    ret = Selector._filterNodes(nodes, tokens, firstOnly);
                }
            }

            return ret;
        },

        _filterNodes: function(nodes, tokens, firstOnly) {
            var i = 0,
                j,
                len = tokens.length,
                n = len - 1,
                result = [],
                node = nodes[0],
                tmpNode = node,
                getters = Selector.getters,
                operator,
                combinator,
                token,
                path,
                pass,
                //FUNCTION = 'function',
                value,
                tests,
                test;

            //do {
            for (i = 0; (tmpNode = node = nodes[i++]);) {
                n = len - 1;
                path = null;

                testLoop:
                while (tmpNode && tmpNode.tagName) {
                    token = tokens[n];
                    tests = token.tests;
                    j = tests.length;
                    if (j && !pass) {
                        while ((test = tests[--j])) {
                            operator = test[1];
                            if (getters[test[0]]) {
                                value = getters[test[0]](tmpNode, test[0]);
                            } else {
                                value = tmpNode[test[0]];
                                // use getAttribute for non-standard attributes
                                if (value === undefined && tmpNode.getAttribute) {
                                    value = tmpNode.getAttribute(test[0]);
                                }
                            }

                            if ((operator === '=' && value !== test[2]) ||  // fast path for equality
                                (typeof operator !== 'string' && // protect against String.test monkey-patch (Moo)
                                operator.test && !operator.test(value)) ||  // regex test
                                (!operator.test && // protect against RegExp as function (webkit)
                                        typeof operator === 'function' && !operator(tmpNode, test[0], test[2]))) { // function test

                                // skip non element nodes or non-matching tags
                                if ((tmpNode = tmpNode[path])) {
                                    while (tmpNode &&
                                        (!tmpNode.tagName ||
                                            (token.tagName && token.tagName !== tmpNode.tagName))
                                    ) {
                                        tmpNode = tmpNode[path];
                                    }
                                }
                                continue testLoop;
                            }
                        }
                    }

                    n--; // move to next token
                    // now that we've passed the test, move up the tree by combinator
                    if (!pass && (combinator = token.combinator)) {
                        path = combinator.axis;
                        tmpNode = tmpNode[path];

                        // skip non element nodes
                        while (tmpNode && !tmpNode.tagName) {
                            tmpNode = tmpNode[path];
                        }

                        if (combinator.direct) { // one pass only
                            path = null;
                        }

                    } else { // success if we made it this far
                        result.push(node);
                        if (firstOnly) {
                            return result;
                        }
                        break;
                    }
                }
            }// while (tmpNode = node = nodes[++i]);
            node = tmpNode = null;
            return result;
        },

        combinators: {
            ' ': {
                axis: 'parentNode'
            },

            '>': {
                axis: 'parentNode',
                direct: true
            },


            '+': {
                axis: 'previousSibling',
                direct: true
            }
        },

        _parsers: [
            {
                name: ATTRIBUTES,
                //re: /^\[(-?[a-z]+[\w\-]*)+([~\|\^\$\*!=]=?)?['"]?([^\]]*?)['"]?\]/i,
                re: /^\uE003(-?[a-z]+[\w\-]*)+([~\|\^\$\*!=]=?)?['"]?([^\uE004'"]*)['"]?\uE004/i,
                fn: function(match, token) {
                    var operator = match[2] || '',
                        operators = Selector.operators,
                        escVal = (match[3]) ? match[3].replace(/\\/g, '') : '',
                        test;

                    // add prefiltering for ID and CLASS
                    if ((match[1] === 'id' && operator === '=') ||
                            (match[1] === 'className' &&
                            Y_DOCUMENT_ELEMENT.getElementsByClassName &&
                            (operator === '~=' || operator === '='))) {
                        token.prefilter = match[1];


                        match[3] = escVal;

                        // escape all but ID for prefilter, which may run through QSA (via Dom.allById)
                        token[match[1]] = (match[1] === 'id') ? match[3] : escVal;

                    }

                    // add tests
                    if (operator in operators) {
                        test = operators[operator];
                        if (typeof test === 'string') {
                            match[3] = escVal.replace(Selector._reRegExpTokens, '\\$1');
                            test = new RegExp(test.replace('{val}', match[3]));
                        }
                        match[2] = test;
                    }
                    if (!token.last || token.prefilter !== match[1]) {
                        return match.slice(1);
                    }
                }

            },
            {
                name: TAG_NAME,
                re: /^((?:-?[_a-z]+[\w-]*)|\*)/i,
                fn: function(match, token) {
                    var tag = match[1].toUpperCase();
                    token.tagName = tag;

                    if (tag !== '*' && (!token.last || token.prefilter)) {
                        return [TAG_NAME, '=', tag];
                    }
                    if (!token.prefilter) {
                        token.prefilter = 'tagName';
                    }
                }
            },
            {
                name: COMBINATOR,
                re: /^\s*([>+~]|\s)\s*/,
                fn: function(match, token) {
                }
            },
            {
                name: PSEUDOS,
                re: /^:([\-\w]+)(?:\uE005['"]?([^\uE005]*)['"]?\uE006)*/i,
                fn: function(match, token) {
                    var test = Selector[PSEUDOS][match[1]];
                    if (test) { // reorder match array and unescape special chars for tests
                        if (match[2]) {
                            match[2] = match[2].replace(/\\/g, '');
                        }
                        return [match[2], test];
                    } else { // selector token not supported (possibly missing CSS3 module)
                        return false;
                    }
                }
            }
            ],

        _getToken: function(token) {
            return {
                tagName: null,
                id: null,
                className: null,
                attributes: {},
                combinator: null,
                tests: []
            };
        },

        /**
            Break selector into token units per simple selector.
            Combinator is attached to the previous token.
         */
        _tokenize: function(selector) {
            selector = selector || '';
            selector = Selector._replaceShorthand(Y_Lang.trim(selector));
            var token = Selector._getToken(),     // one token per simple selector (left selector holds combinator)
                query = selector, // original query for debug report
                tokens = [],    // array of tokens
                found = false,  // whether or not any matches were found this pass
                match,         // the regex match
                test,
                i, parser;

            /*
                Search for selector patterns, store, and strip them from the selector string
                until no patterns match (invalid selector) or we run out of chars.

                Multiple attributes and pseudos are allowed, in any order.
                for example:
                    'form:first-child[type=button]:not(button)[lang|=en]'
            */

            outer:
            do {
                found = false; // reset after full pass

                for (i = 0; (parser = Selector._parsers[i++]);) {
                    if ( (match = parser.re.exec(selector)) ) { // note assignment
                        if (parser.name !== COMBINATOR ) {
                            token.selector = selector;
                        }
                        selector = selector.replace(match[0], ''); // strip current match from selector
                        if (!selector.length) {
                            token.last = true;
                        }

                        if (Selector._attrFilters[match[1]]) { // convert class to className, etc.
                            match[1] = Selector._attrFilters[match[1]];
                        }

                        test = parser.fn(match, token);
                        if (test === false) { // selector not supported
                            found = false;
                            break outer;
                        } else if (test) {
                            token.tests.push(test);
                        }

                        if (!selector.length || parser.name === COMBINATOR) {
                            tokens.push(token);
                            token = Selector._getToken(token);
                            if (parser.name === COMBINATOR) {
                                token.combinator = Selector.combinators[match[1]];
                            }
                        }
                        found = true;


                    }
                }
            } while (found && selector.length);

            if (!found || selector.length) { // not fully parsed
                Y.log('query: ' + query + ' contains unsupported token in: ' + selector, 'warn', 'Selector');
                tokens = [];
            }
            return tokens;
        },

        _replaceShorthand: function(selector) {
            var shorthand = Selector.shorthand,
                esc = selector.match(Selector._re.esc), // pull escaped colon, brackets, etc.
                attrs,
                pseudos,
                re, i, len;

            if (esc) {
                selector = selector.replace(Selector._re.esc, '\uE000');
            }

            attrs = selector.match(Selector._re.attr);
            pseudos = selector.match(Selector._re.pseudos);

            if (attrs) {
                selector = selector.replace(Selector._re.attr, '\uE001');
            }

            if (pseudos) {
                selector = selector.replace(Selector._re.pseudos, '\uE002');
            }


            for (re in shorthand) {
                if (shorthand.hasOwnProperty(re)) {
                    selector = selector.replace(new RegExp(re, 'gi'), shorthand[re]);
                }
            }

            if (attrs) {
                for (i = 0, len = attrs.length; i < len; ++i) {
                    selector = selector.replace(/\uE001/, attrs[i]);
                }
            }

            if (pseudos) {
                for (i = 0, len = pseudos.length; i < len; ++i) {
                    selector = selector.replace(/\uE002/, pseudos[i]);
                }
            }

            selector = selector.replace(/\[/g, '\uE003');
            selector = selector.replace(/\]/g, '\uE004');

            selector = selector.replace(/\(/g, '\uE005');
            selector = selector.replace(/\)/g, '\uE006');

            if (esc) {
                for (i = 0, len = esc.length; i < len; ++i) {
                    selector = selector.replace('\uE000', esc[i]);
                }
            }

            return selector;
        },

        _attrFilters: {
            'class': 'className',
            'for': 'htmlFor'
        },

        getters: {
            href: function(node, attr) {
                return Y_DOM.getAttribute(node, attr);
            }
        }
    };

Y_mix(Selector, SelectorCSS2, true);
Selector.getters.src = Selector.getters.rel = Selector.getters.href;

// IE wants class with native queries
if (Selector.useNative && Y_DOC.querySelector) {
    Selector.shorthand['\\.([^\\s\\\\(\\[:]*)'] = '[class~=$1]';
}

/**
 * The selector css3 module provides support for css3 selectors.
 * @module dom
 * @submodule selector-css3
 * @for Selector
 */

/*
    an+b = get every _a_th node starting at the _b_th
    0n+b = no repeat ("0" and "n" may both be omitted (together) , e.g. "0n+1" or "1", not "0+1"), return only the _b_th element
    1n+b =  get every element starting from b ("1" may may be omitted, e.g. "1n+0" or "n+0" or "n")
    an+0 = get every _a_th element, "0" may be omitted
*/

Selector._reNth = /^(?:([\-]?\d*)(n){1}|(odd|even)$)*([\-+]?\d*)$/;

Selector._getNth = function(node, expr, tag, reverse) {
    Selector._reNth.test(expr);
    var a = parseInt(RegExp.$1, 10), // include every _a_ elements (zero means no repeat, just first _a_)
        n = RegExp.$2, // "n"
        oddeven = RegExp.$3, // "odd" or "even"
        b = parseInt(RegExp.$4, 10) || 0, // start scan from element _b_
        result = [],
        siblings = Selector._children(node.parentNode, tag),
        op;

    if (oddeven) {
        a = 2; // always every other
        op = '+';
        n = 'n';
        b = (oddeven === 'odd') ? 1 : 0;
    } else if ( isNaN(a) ) {
        a = (n) ? 1 : 0; // start from the first or no repeat
    }

    if (a === 0) { // just the first
        if (reverse) {
            b = siblings.length - b + 1;
        }

        if (siblings[b - 1] === node) {
            return true;
        } else {
            return false;
        }

    } else if (a < 0) {
        reverse = !!reverse;
        a = Math.abs(a);
    }

    if (!reverse) {
        for (var i = b - 1, len = siblings.length; i < len; i += a) {
            if ( i >= 0 && siblings[i] === node ) {
                return true;
            }
        }
    } else {
        for (var i = siblings.length - b, len = siblings.length; i >= 0; i -= a) {
            if ( i < len && siblings[i] === node ) {
                return true;
            }
        }
    }
    return false;
};

Y_mix(Selector.pseudos, {
    'root': function(node) {
        return node === node.ownerDocument.documentElement;
    },

    'nth-child': function(node, expr) {
        return Selector._getNth(node, expr);
    },

    'nth-last-child': function(node, expr) {
        return Selector._getNth(node, expr, null, true);
    },

    'nth-of-type': function(node, expr) {
        return Selector._getNth(node, expr, node.tagName);
    },

    'nth-last-of-type': function(node, expr) {
        return Selector._getNth(node, expr, node.tagName, true);
    },

    'last-child': function(node) {
        var children = Selector._children(node.parentNode);
        return children[children.length - 1] === node;
    },

    'first-of-type': function(node) {
        return Selector._children(node.parentNode, node.tagName)[0] === node;
    },

    'last-of-type': function(node) {
        var children = Selector._children(node.parentNode, node.tagName);
        return children[children.length - 1] === node;
    },

    'only-child': function(node) {
        var children = Selector._children(node.parentNode);
        return children.length === 1 && children[0] === node;
    },

    'only-of-type': function(node) {
        var children = Selector._children(node.parentNode, node.tagName);
        return children.length === 1 && children[0] === node;
    },

    'empty': function(node) {
        return node.childNodes.length === 0;
    },

    'not': function(node, expr) {
        return !Selector.test(node, expr);
    },

    'contains': function(node, expr) {
        var text = node.innerText || node.textContent || '';
        return text.indexOf(expr) > -1;
    },

    'checked': function(node) {
        return (node.checked === true || node.selected === true);
    },

    enabled: function(node) {
        return (node.disabled !== undefined && !node.disabled);
    },

    disabled: function(node) {
        return (node.disabled);
    }
});

Y_mix(Selector.operators, {
    '^=': '^{val}', // Match starts with value
    '!=': function(node, attr, val) { return node[attr] !== val; }, // Match starts with value
    '$=': '{val}$', // Match ends with value
    '*=': '{val}' // Match contains value as substring
});

Selector.combinators['~'] = {
    axis: 'previousSibling'
};
YAHOO.register("selector", YAHOO.util.Selector, {version: "2.9.0", build: "2800"});



/****************************************************************************/
/****************************************************************************/
/****************************************************************************/

var Dom = YAHOO.util.Dom;

/**
 * The ColumnSet class defines and manages a DataTable's Columns,
 * including nested hierarchies and access to individual Column instances.
 *
 * @namespace YAHOO.widget
 * @class ColumnSet
 * @uses YAHOO.util.EventProvider
 * @constructor
 * @param aDefinitions {Object[]} Array of object literals that define cells in
 * the THEAD.
 */
YAHOO.widget.ColumnSet = function(aDefinitions) {
    this._sId = Dom.generateId(null, "yui-cs"); // "yui-cs" + YAHOO.widget.ColumnSet._nCount;

    // First clone the defs
    aDefinitions = YAHOO.widget.DataTable._cloneObject(aDefinitions);
    this._init(aDefinitions);

    YAHOO.widget.ColumnSet._nCount++;
};

/////////////////////////////////////////////////////////////////////////////
//
// Private member variables
//
/////////////////////////////////////////////////////////////////////////////

/**
 * Internal class variable to index multiple ColumnSet instances.
 *
 * @property ColumnSet._nCount
 * @type Number
 * @private
 * @static
 */
YAHOO.widget.ColumnSet._nCount = 0;

YAHOO.widget.ColumnSet.prototype = {
    /**
     * Unique instance name.
     *
     * @property _sId
     * @type String
     * @private
     */
    _sId : null,

    /**
     * Array of object literal Column definitions passed to the constructor.
     *
     * @property _aDefinitions
     * @type Object[]
     * @private
     */
    _aDefinitions : null,

    /////////////////////////////////////////////////////////////////////////////
    //
    // Public member variables
    //
    /////////////////////////////////////////////////////////////////////////////

    /**
     * Top-down tree representation of Column hierarchy.
     *
     * @property tree
     * @type YAHOO.widget.Column[]
     */
    tree : null,

    /**
     * Flattened representation of all Columns.
     *
     * @property flat
     * @type YAHOO.widget.Column[]
     * @default []
     */
    flat : null,

    /**
     * Array of Columns that map one-to-one to a table column.
     *
     * @property keys
     * @type YAHOO.widget.Column[]
     * @default []
     */
    keys : null,

    /**
     * ID index of nested parent hierarchies for HEADERS accessibility attribute.
     *
     * @property headers
     * @type String[]
     * @default []
     */
    headers : null,

    /////////////////////////////////////////////////////////////////////////////
    //
    // Private methods
    //
    /////////////////////////////////////////////////////////////////////////////

    /**
     * Initializes ColumnSet instance with data from Column definitions.
     *
     * @method _init
     * @param aDefinitions {Object[]} Array of object literals that define cells in
     * the THEAD .
     * @private
     */

    _init : function(aDefinitions) {        
        // DOM tree representation of all Columns
        var tree = [];
        // Flat representation of all Columns
        var flat = [];
        // Flat representation of only Columns that are meant to display data
        var keys = [];
        // Array of HEADERS attribute values for all keys in the "keys" array
        var headers = [];

        // Tracks current node list depth being tracked
        var nodeDepth = -1;

        // Internal recursive function to define Column instances
        var parseColumns = function(nodeList, parent) {
            // One level down
            nodeDepth++;

            // Create corresponding tree node if not already there for this depth
            if(!tree[nodeDepth]) {
                tree[nodeDepth] = [];
            }


            // Parse each node at this depth for attributes and any children
            for(var j=0; j<nodeList.length; j++) {
                var currentNode = nodeList[j];

                // Instantiate a new Column for each node
                var oColumn = new YAHOO.widget.Column(currentNode);
                
                // Cross-reference Column ID back to the original object literal definition
                currentNode.yuiColumnId = oColumn._sId;
                
                // Add the new Column to the flat list
                flat.push(oColumn);

                // Assign its parent as an attribute, if applicable
                if(parent) {
                    oColumn._oParent = parent;
                }

                // The Column has descendants
                if(YAHOO.lang.isArray(currentNode.children)) {
                    oColumn.children = currentNode.children;

                    // Determine COLSPAN value for this Column
                    var terminalChildNodes = 0;
                    var countTerminalChildNodes = function(ancestor) {
                        var descendants = ancestor.children;
                        // Drill down each branch and count terminal nodes
                        for(var k=0; k<descendants.length; k++) {
                            // Keep drilling down
                            if(YAHOO.lang.isArray(descendants[k].children)) {
                                countTerminalChildNodes(descendants[k]);
                            }
                            // Reached branch terminus
                            else {
                                terminalChildNodes++;
                            }
                        }
                    };
                    countTerminalChildNodes(currentNode);
                    oColumn._nColspan = terminalChildNodes;

                    // Cascade certain properties to children if not defined on their own
                    var currentChildren = currentNode.children;
                    for(var k=0; k<currentChildren.length; k++) {
                        var child = currentChildren[k];
                        if(oColumn.className && (child.className === undefined)) {
                            child.className = oColumn.className;
                        }
                        if(oColumn.editor && (child.editor === undefined)) {
                            child.editor = oColumn.editor;
                        }
                        //TODO: Deprecated
                        if(oColumn.editorOptions && (child.editorOptions === undefined)) {
                            child.editorOptions = oColumn.editorOptions;
                        }
                        if(oColumn.formatter && (child.formatter === undefined)) {
                            child.formatter = oColumn.formatter;
                        }
                        if(oColumn.resizeable && (child.resizeable === undefined)) {
                            child.resizeable = oColumn.resizeable;
                        }
                        if(oColumn.sortable && (child.sortable === undefined)) {
                            child.sortable = oColumn.sortable;
                        }
                        if(oColumn.hidden) {
                            child.hidden = true;
                        }
                        if(oColumn.width && (child.width === undefined)) {
                            child.width = oColumn.width;
                        }
                        if(oColumn.minWidth && (child.minWidth === undefined)) {
                            child.minWidth = oColumn.minWidth;
                        }
                        if(oColumn.maxAutoWidth && (child.maxAutoWidth === undefined)) {
                            child.maxAutoWidth = oColumn.maxAutoWidth;
                        }
                        // Backward compatibility
                        if(oColumn.type && (child.type === undefined)) {
                            child.type = oColumn.type;
                        }
                        if(oColumn.type && !oColumn.formatter) {
                            oColumn.formatter = oColumn.type;
                        }
                        if(oColumn.text && !YAHOO.lang.isValue(oColumn.label)) {
                            oColumn.label = oColumn.text;
                        }
                        if(oColumn.parser) {
                        }
                        if(oColumn.sortOptions && ((oColumn.sortOptions.ascFunction) ||
                                (oColumn.sortOptions.descFunction))) {
                        }
                    }

                    // The children themselves must also be parsed for Column instances
                    if(!tree[nodeDepth+1]) {
                        tree[nodeDepth+1] = [];
                    }
                    parseColumns(currentChildren, oColumn);
                }
                // This Column does not have any children
                else {
                    oColumn._nKeyIndex = keys.length;
                    oColumn._nColspan = 1;
                    keys.push(oColumn);
                }

                // Add the Column to the top-down tree
                tree[nodeDepth].push(oColumn);
            }
            nodeDepth--;
        };

        // Parse out Column instances from the array of object literals
        if(YAHOO.lang.isArray(aDefinitions)) {
            parseColumns(aDefinitions);

            // Store the array
            this._aDefinitions = aDefinitions;
        }
        else {
            return null;
        }

        var i;

        // Determine ROWSPAN value for each Column in the tree
        var parseTreeForRowspan = function(tree) {
            var maxRowDepth = 1;
            var currentRow;
            var currentColumn;

            // Calculate the max depth of descendants for this row
            var countMaxRowDepth = function(row, tmpRowDepth) {
                tmpRowDepth = tmpRowDepth || 1;

                for(var n=0; n<row.length; n++) {
                    var col = row[n];
                    // Column has children, so keep counting
                    if(YAHOO.lang.isArray(col.children)) {
                        tmpRowDepth++;
                        countMaxRowDepth(col.children, tmpRowDepth);
                        tmpRowDepth--;
                    }
                    // No children, is it the max depth?
                    else {
                        if(tmpRowDepth > maxRowDepth) {
                            maxRowDepth = tmpRowDepth;
                        }
                    }

                }
            };

            // Count max row depth for each row
            for(var m=0; m<tree.length; m++) {
                currentRow = tree[m];
                countMaxRowDepth(currentRow);

                // Assign the right ROWSPAN values to each Column in the row
                for(var p=0; p<currentRow.length; p++) {
                    currentColumn = currentRow[p];
                    if(!YAHOO.lang.isArray(currentColumn.children)) {
                        currentColumn._nRowspan = maxRowDepth;
                    }
                    else {
                        currentColumn._nRowspan = 1;
                    }
                }

                // Reset counter for next row
                maxRowDepth = 1;
            }
        };
        parseTreeForRowspan(tree);

        // Store tree index values
        for(i=0; i<tree[0].length; i++) {
            tree[0][i]._nTreeIndex = i;
        }

        // Store header relationships in an array for HEADERS attribute
        var recurseAncestorsForHeaders = function(i, oColumn) {
            headers[i].push(oColumn.getSanitizedKey());
            if(oColumn._oParent) {
                recurseAncestorsForHeaders(i, oColumn._oParent);
            }
        };
        for(i=0; i<keys.length; i++) {
            headers[i] = [];
            recurseAncestorsForHeaders(i, keys[i]);
            headers[i] = headers[i].reverse();
        }

        // Save to the ColumnSet instance
        this.tree = tree;
        this.flat = flat;
        this.keys = keys;
        this.headers = headers;
    },

    /////////////////////////////////////////////////////////////////////////////
    //
    // Public methods
    //
    /////////////////////////////////////////////////////////////////////////////

    /**
     * Returns unique name of the ColumnSet instance.
     *
     * @method getId
     * @return {String} Unique name of the ColumnSet instance.
     */

    getId : function() {
        return this._sId;
    },

    /**
     * ColumnSet instance name, for logging.
     *
     * @method toString
     * @return {String} Unique name of the ColumnSet instance.
     */

    toString : function() {
        return "ColumnSet instance " + this._sId;
    },

    /**
     * Public accessor to the definitions array.
     *
     * @method getDefinitions
     * @return {Object[]} Array of object literal Column definitions.
     */

    getDefinitions : function() {
        var aDefinitions = this._aDefinitions;
        
        // Internal recursive function to define Column instances
        var parseColumns = function(nodeList, oSelf) {
            // Parse each node at this depth for attributes and any children
            for(var j=0; j<nodeList.length; j++) {
                var currentNode = nodeList[j];
                
                // Get the Column for each node
                var oColumn = oSelf.getColumnById(currentNode.yuiColumnId);
                
                if(oColumn) {    
                    // Update the current values
                    var oDefinition = oColumn.getDefinition();
                    for(var name in oDefinition) {
                        if(YAHOO.lang.hasOwnProperty(oDefinition, name)) {
                            currentNode[name] = oDefinition[name];
                        }
                    }
                }
                            
                // The Column has descendants
                if(YAHOO.lang.isArray(currentNode.children)) {
                    // The children themselves must also be parsed for Column instances
                    parseColumns(currentNode.children, oSelf);
                }
            }
        };

        parseColumns(aDefinitions, this);
        this._aDefinitions = aDefinitions;
        return aDefinitions;
    },

    /**
     * Returns Column instance with given ID.
     *
     * @method getColumnById
     * @param column {String} Column ID.
     * @return {YAHOO.widget.Column} Column instance.
     */

    getColumnById : function(column) {
        if(YAHOO.lang.isString(column)) {
            var allColumns = this.flat;
            for(var i=allColumns.length-1; i>-1; i--) {
                if(allColumns[i]._sId === column) {
                    return allColumns[i];
                }
            }
        }
        return null;
    },

    /**
     * Returns Column instance with given key or ColumnSet key index.
     *
     * @method getColumn
     * @param column {String | Number} Column key or ColumnSet key index.
     * @return {YAHOO.widget.Column} Column instance.
     */

    getColumn : function(column) {
        if(YAHOO.lang.isNumber(column) && this.keys[column]) {
            return this.keys[column];
        }
        else if(YAHOO.lang.isString(column)) {
            var allColumns = this.flat;
            var aColumns = [];
            for(var i=0; i<allColumns.length; i++) {
                if(allColumns[i].key === column) {
                    aColumns.push(allColumns[i]);
                }
            }
            if(aColumns.length === 1) {
                return aColumns[0];
            }
            else if(aColumns.length > 1) {
                return aColumns;
            }
        }
        return null;
    },

    /**
     * Public accessor returns array of given Column's desendants (if any), including itself.
     *
     * @method getDescendants
     * @parem {YAHOO.widget.Column} Column instance.
     * @return {Array} Array including the Column itself and all descendants (if any).
     */
    getDescendants : function(oColumn) {
        var oSelf = this;
        var allDescendants = [];
        var i;

        // Recursive function to loop thru all children
        var parse = function(oParent) {
            allDescendants.push(oParent);
            // This Column has children
            if(oParent.children) {
                for(i=0; i<oParent.children.length; i++) {
                    parse(oSelf.getColumn(oParent.children[i].key));
                }
            }
        };
        parse(oColumn);

        return allDescendants;
    }
};

/****************************************************************************/
/****************************************************************************/
/****************************************************************************/

/**
 * The Column class defines and manages attributes of DataTable Columns
 *
 * @namespace YAHOO.widget
 * @class Column
 * @constructor
 * @param oConfigs {Object} Object literal of definitions.
 */
YAHOO.widget.Column = function(oConfigs) {
    this._sId = Dom.generateId(null, "yui-col"); // "yui-col" + YAHOO.widget.Column._nCount;
    
    // Object literal defines Column attributes
    if(oConfigs && YAHOO.lang.isObject(oConfigs)) {
        for(var sConfig in oConfigs) {
            if(sConfig) {
                this[sConfig] = oConfigs[sConfig];
            }
        }
    }

    // Assign a key if not found
    if(!YAHOO.lang.isValue(this.key)) {
        this.key = Dom.generateId(null, "yui-dt-col"); //"yui-dt-col" + YAHOO.widget.Column._nCount;
    }
    
    // Assign a field if not found, defaults to key
    if(!YAHOO.lang.isValue(this.field)) {
        this.field = this.key;
    }

    // Increment counter
    YAHOO.widget.Column._nCount++;

    // Backward compatibility
    if(this.width && !YAHOO.lang.isNumber(this.width)) {
        this.width = null;
    }
    if(this.editor && YAHOO.lang.isString(this.editor)) {
        this.editor = new YAHOO.widget.CellEditor(this.editor, this.editorOptions);
    }
};

/////////////////////////////////////////////////////////////////////////////
//
// Private member variables
//
/////////////////////////////////////////////////////////////////////////////

YAHOO.lang.augmentObject(YAHOO.widget.Column, {
    /**
     * Internal class variable to index multiple Column instances.
     *
     * @property Column._nCount
     * @type Number
     * @private
     * @static
     */
    _nCount : 0,

    formatCheckbox : function(elCell, oRecord, oColumn, oData) {
        YAHOO.widget.DataTable.formatCheckbox(elCell, oRecord, oColumn, oData);
    },

    formatCurrency : function(elCell, oRecord, oColumn, oData) {
        YAHOO.widget.DataTable.formatCurrency(elCell, oRecord, oColumn, oData);
    },

    formatDate : function(elCell, oRecord, oColumn, oData) {
        YAHOO.widget.DataTable.formatDate(elCell, oRecord, oColumn, oData);
    },

    formatEmail : function(elCell, oRecord, oColumn, oData) {
        YAHOO.widget.DataTable.formatEmail(elCell, oRecord, oColumn, oData);
    },

    formatLink : function(elCell, oRecord, oColumn, oData) {
        YAHOO.widget.DataTable.formatLink(elCell, oRecord, oColumn, oData);
    },

    formatNumber : function(elCell, oRecord, oColumn, oData) {
        YAHOO.widget.DataTable.formatNumber(elCell, oRecord, oColumn, oData);
    },

    formatSelect : function(elCell, oRecord, oColumn, oData) {
        YAHOO.widget.DataTable.formatDropdown(elCell, oRecord, oColumn, oData);
    }
});

YAHOO.widget.Column.prototype = {
    /**
     * Unique String identifier assigned at instantiation.
     *
     * @property _sId
     * @type String
     * @private
     */
    _sId : null,

    /**
     * Reference to Column's current position index within its ColumnSet's keys
     * array, if applicable. This property only applies to non-nested and bottom-
     * level child Columns.
     *
     * @property _nKeyIndex
     * @type Number
     * @private
     */
    _nKeyIndex : null,

    /**
     * Reference to Column's current position index within its ColumnSet's tree
     * array, if applicable. This property only applies to non-nested and top-
     * level parent Columns.
     *
     * @property _nTreeIndex
     * @type Number
     * @private
     */
    _nTreeIndex : null,

    /**
     * Number of table cells the Column spans.
     *
     * @property _nColspan
     * @type Number
     * @private
     */
    _nColspan : 1,

    /**
     * Number of table rows the Column spans.
     *
     * @property _nRowspan
     * @type Number
     * @private
     */
    _nRowspan : 1,

    /**
     * Column's parent Column instance, or null.
     *
     * @property _oParent
     * @type YAHOO.widget.Column
     * @private
     */
    _oParent : null,

    /**
     * The DOM reference to the associated TH element.
     *
     * @property _elTh
     * @type HTMLElement
     * @private
     */
    _elTh : null,

    /**
     * The DOM reference to the associated TH element's liner DIV element.
     *
     * @property _elThLiner
     * @type HTMLElement
     * @private
     */
    _elThLiner : null,

    /**
     * The DOM reference to the associated TH element's label SPAN element.
     *
     * @property _elThLabel
     * @type HTMLElement
     * @private
     */
    _elThLabel : null,

    /**
     * The DOM reference to the associated resizerelement (if any).
     *
     * @property _elResizer
     * @type HTMLElement
     * @private
     */
    _elResizer : null,

    /**
     * Internal width tracker.
     *
     * @property _nWidth
     * @type Number
     * @private
     */
    _nWidth : null,

    /**
     * For unreg() purposes, a reference to the Column's DragDrop instance.
     *
     * @property _dd
     * @type YAHOO.util.DragDrop
     * @private
     */
    _dd : null,

    /**
     * For unreg() purposes, a reference to the Column resizer's DragDrop instance.
     *
     * @property _ddResizer
     * @type YAHOO.util.DragDrop
     * @private
     */
    _ddResizer : null,

    /////////////////////////////////////////////////////////////////////////////
    //
    // Public member variables
    //
    /////////////////////////////////////////////////////////////////////////////

    /**
     * Unique name, required. If "label" property is not provided, the "key"
     * value will be treated as markup and inserted into the DOM as innerHTML.
     *
     * @property key
     * @type String|HTML
     */
    key : null,

    /**
     * Associated database field, or null.
     *
     * @property field
     * @type String
     */
    field : null,

    /**
     * Value displayed as Column header in the TH element. String value is
     * treated as markup and inserted into the DOM as innerHTML.
     *
     * @property label
     * @type HTML
     */
    label : null,

    /**
     * Column head cell ABBR for accessibility.
     *
     * @property abbr
     * @type String
     */
    abbr : null,

    /**
     * Array of object literals that define children (nested headers) of a Column.
     *
     * @property children
     * @type Object[]
     */
    children : null,

    /**
     * Column width (in pixels).
     *
     * @property width
     * @type Number
     */
    width : null,

    /**
     * Minimum Column width (in pixels).
     *
     * @property minWidth
     * @type Number
     * @default null
     */
    minWidth : null,

    /**
     * When a width is not defined for a Column, maxAutoWidth defines an upper
     * limit that the Column should be auto-sized to. If resizeable is enabled, 
     * users may still resize to a greater width. Most useful for Columns intended
     * to hold long unbroken, unwrapped Strings, such as URLs, to prevent very
     * wide Columns from disrupting visual readability by inducing truncation.
     *
     * @property maxAutoWidth
     * @type Number
     * @default null
     */
    maxAutoWidth : null,

    /**
     * True if Column is in hidden state.
     *
     * @property hidden
     * @type Boolean
     * @default false     
     */
    hidden : false,

    /**
     * True if Column is in selected state.
     *
     * @property selected
     * @type Boolean
     * @default false     
     */
    selected : false,

    /**
     * Custom CSS class or array of classes to be applied to every cell in the Column.
     *
     * @property className
     * @type String || String[]
     */
    className : null,

    /**
     * Cell formatter function, or a shortcut pointer to a function in the
     * DataTable.Formatter object. The function, called from the DataTable's
     * formatCell method, renders markup into the cell liner
     * element and accepts the following arguments:
     * <dl>
     *    <dt>elLiner</dt>
     *    <dd>The element to write innerHTML to.</dd>
     *    <dt>oRecord</dt>
     *    <dd>The associated Record for the row.</dd>
     *    <dt>oColumn</dt>
     *    <dd>The Column instance for the cell.</dd>
     *    <dt>oData</dt>
     *    <dd>The data value for the cell.</dd>
     * </dl>
     *
     * @property formatter
     * @type String || HTMLFunction
     */
    formatter : null,
    
    /**
     * Config passed to YAHOO.util.Number.format() by the 'currency' Column formatter.
     *
     * @property currencyOptions
     * @type Object
     * @default null
     */
    currencyOptions : null,

    /**
     * Config passed to YAHOO.util.Date.format() by the 'date' Column formatter.
     *
     * @property dateOptions
     * @type Object
     * @default null
     */
    dateOptions : null,

    /**
     * Array of dropdown values for formatter:"dropdown" cases. Can either be a
     * simple array (e.g., ["Alabama","Alaska","Arizona","Arkansas"]) or a an
     * array of objects (e.g., [{label:"Alabama", value:"AL"},
     * {label:"Alaska", value:"AK"}, {label:"Arizona", value:"AZ"},
     * {label:"Arkansas", value:"AR"}]). String values are treated as markup and
     * inserted into the DOM as innerHTML.
     *
     * @property dropdownOptions
     * @type HTML[] | Object[]
     */
    dropdownOptions : null,
     
    /**
     * A CellEditor instance, otherwise Column is not editable.     
     *
     * @property editor
     * @type YAHOO.widget.CellEditor
     */
    editor : null,

    /**
     * True if Column is resizeable, false otherwise. The Drag & Drop Utility is
     * required to enable this feature. Only bottom-level and non-nested Columns are
     * resizeble. 
     *
     * @property resizeable
     * @type Boolean
     * @default false
     */
    resizeable : false,

    /**
     * True if Column is sortable, false otherwise.
     *
     * @property sortable
     * @type Boolean
     * @default false
     */
    sortable : false,

    /**
     * @property sortOptions.defaultOrder
     * @deprecated Use sortOptions.defaultDir.
     */
    /**
     * Default sort direction for Column: YAHOO.widget.DataTable.CLASS_ASC or YAHOO.widget.DataTable.CLASS_DESC.
     *
     * @property sortOptions.defaultDir
     * @type String
     * @default null
     */
    /**
     * Custom field to sort on.
     *
     * @property sortOptions.field
     * @type String
     * @default null
     */
    /**
     * Custom sort handler. Signature: sortFunction(a, b, desc, field) where field is the sortOptions.field value
     *
     * @property sortOptions.sortFunction
     * @type Function
     * @default null
     */
    sortOptions : null,















    /////////////////////////////////////////////////////////////////////////////
    //
    // Public methods
    //
    /////////////////////////////////////////////////////////////////////////////

    /**
     * Returns unique ID string.
     *
     * @method getId
     * @return {String} Unique ID string.
     */
    getId : function() {
        return this._sId;
    },

    /**
     * Column instance name, for logging.
     *
     * @method toString
     * @return {String} Column's unique name.
     */
    toString : function() {
        return "Column instance " + this._sId;
    },

    /**
     * Returns object literal definition.
     *
     * @method getDefinition
     * @return {Object} Object literal definition.
     */
    getDefinition : function() {
        var oDefinition = {};
        
        // Update the definition
        oDefinition.abbr = this.abbr;
        oDefinition.className = this.className;
        oDefinition.editor = this.editor;
        oDefinition.editorOptions = this.editorOptions; //TODO: deprecated
        oDefinition.field = this.field;
        oDefinition.formatter = this.formatter;
        oDefinition.hidden = this.hidden;
        oDefinition.key = this.key;
        oDefinition.label = this.label;
        oDefinition.minWidth = this.minWidth;
        oDefinition.maxAutoWidth = this.maxAutoWidth;
        oDefinition.resizeable = this.resizeable;
        oDefinition.selected = this.selected;
        oDefinition.sortable = this.sortable;
        oDefinition.sortOptions = this.sortOptions;
        oDefinition.width = this.width;
        
        // Bug 2529147
        oDefinition._calculatedWidth = this._calculatedWidth;

        return oDefinition;
    },

    /**
     * Returns unique Column key.
     *
     * @method getKey
     * @return {String} Column key.
     */
    getKey : function() {
        return this.key;
    },
    
    /**
     * Returns field.
     *
     * @method getField
     * @return {String} Column field.
     */
    getField : function() {
        return this.field;
    },
    
    /**
     * Returns Column key which has been sanitized for DOM (class and ID) usage
     * starts with letter, contains only letters, numbers, hyphen, or period.
     *
     * @method getSanitizedKey
     * @return {String} Sanitized Column key.
     */
    getSanitizedKey : function() {
        return this.getKey().replace(/[^\w\-]/g,"");
    },

    /**
     * Public accessor returns Column's current position index within its
     * ColumnSet's keys array, if applicable. Only non-nested and bottom-level
     * child Columns will return a value.
     *
     * @method getKeyIndex
     * @return {Number} Position index, or null.
     */
    getKeyIndex : function() {
        return this._nKeyIndex;
    },

    /**
     * Public accessor returns Column's current position index within its
     * ColumnSet's tree array, if applicable. Only non-nested and top-level parent
     * Columns will return a value;
     *
     * @method getTreeIndex
     * @return {Number} Position index, or null.
     */
    getTreeIndex : function() {
        return this._nTreeIndex;
    },

    /**
     * Public accessor returns Column's parent instance if any, or null otherwise.
     *
     * @method getParent
     * @return {YAHOO.widget.Column} Column's parent instance.
     */
    getParent : function() {
        return this._oParent;
    },

    /**
     * Public accessor returns Column's calculated COLSPAN value.
     *
     * @method getColspan
     * @return {Number} Column's COLSPAN value.
     */
    getColspan : function() {
        return this._nColspan;
    },
    // Backward compatibility
    getColSpan : function() {
        return this.getColspan();
    },

    /**
     * Public accessor returns Column's calculated ROWSPAN value.
     *
     * @method getRowspan
     * @return {Number} Column's ROWSPAN value.
     */
    getRowspan : function() {
        return this._nRowspan;
    },

    /**
     * Returns DOM reference to the key TH element.
     *
     * @method getThEl
     * @return {HTMLElement} TH element.
     */
    getThEl : function() {
        return this._elTh;
    },

    /**
     * Returns DOM reference to the TH's liner DIV element. Introduced since
     * resizeable Columns may have an extra resizer liner, making the DIV liner
     * not reliably the TH element's first child.               
     *
     * @method getThLInerEl
     * @return {HTMLElement} TH element.
     */
    getThLinerEl : function() {
        return this._elThLiner;
    },
    
    /**
     * Returns DOM reference to the resizer element, or null.
     *
     * @method getResizerEl
     * @return {HTMLElement} DIV element.
     */
    getResizerEl : function() {
        return this._elResizer;
    },

    // Backward compatibility
    /**
     * @method getColEl
     * @deprecated Use getThEl
     */
    getColEl : function() {
        return this.getThEl();
    },
    getIndex : function() {
        return this.getKeyIndex();
    },
    format : function() {
    }
};

/****************************************************************************/
/****************************************************************************/
/****************************************************************************/

/**
 * Sort static utility to support Column sorting.
 *
 * @namespace YAHOO.util
 * @class Sort
 * @static
 */
YAHOO.util.Sort = {
    /////////////////////////////////////////////////////////////////////////////
    //
    // Public methods
    //
    /////////////////////////////////////////////////////////////////////////////

    /**
     * Comparator function for simple case-insensitive string sorting.
     *
     * @method compare
     * @param a {Object} First sort argument.
     * @param b {Object} Second sort argument.
     * @param desc {Boolean} True if sort direction is descending, false if
     * sort direction is ascending.
     * @return {Boolean} Return -1 when a < b. Return 0 when a = b.
     * Return 1 when a > b.
     */
    compare: function(a, b, desc) {
        if((a === null) || (typeof a == "undefined")) {
            if((b === null) || (typeof b == "undefined")) {
                return 0;
            }
            else {
                return 1;
            }
        }
        else if((b === null) || (typeof b == "undefined")) {
            return -1;
        }

        if(a.constructor == String) {
            a = a.toLowerCase();
        }
        if(b.constructor == String) {
            b = b.toLowerCase();
        }
        if(a < b) {
            return (desc) ? 1 : -1;
        }
        else if (a > b) {
            return (desc) ? -1 : 1;
        }
        else {
            return 0;
        }
    }
};

/****************************************************************************/
/****************************************************************************/
/****************************************************************************/

/**
 * ColumnDD subclasses DragDrop to support rearrangeable Columns.
 *
 * @namespace YAHOO.util
 * @class ColumnDD
 * @extends YAHOO.util.DDProxy
 * @constructor
 * @param oDataTable {YAHOO.widget.DataTable} DataTable instance.
 * @param oColumn {YAHOO.widget.Column} Column instance.
 * @param elTh {HTMLElement} TH element reference.
 * @param elTarget {HTMLElement} Drag target element.
 */
YAHOO.widget.ColumnDD = function(oDataTable, oColumn, elTh, elTarget) {
    if(oDataTable && oColumn && elTh && elTarget) {
        this.datatable = oDataTable;
        this.table = oDataTable.getTableEl();
        this.column = oColumn;
        this.headCell = elTh;
        this.pointer = elTarget;
        this.newIndex = null;
        this.init(elTh);
        this.initFrame(); // Needed for DDProxy
        this.invalidHandleTypes = {};

        // Set top/bottom padding to account for children of nested columns
        this.setPadding(10, 0, (this.datatable.getTheadEl().offsetHeight + 10) , 0);

        YAHOO.util.Event.on(window, 'resize', function() {
            this.initConstraints();
        }, this, true);
    }
    else {
    }
};

if(YAHOO.util.DDProxy) {
    YAHOO.extend(YAHOO.widget.ColumnDD, YAHOO.util.DDProxy, {
        initConstraints: function() {
            //Get the top, right, bottom and left positions
            var region = YAHOO.util.Dom.getRegion(this.table),
                //Get the element we are working on
                el = this.getEl(),
                //Get the xy position of it
                xy = YAHOO.util.Dom.getXY(el),
                //Get the width and height
                width = parseInt(YAHOO.util.Dom.getStyle(el, 'width'), 10),
                height = parseInt(YAHOO.util.Dom.getStyle(el, 'height'), 10),
                //Set left to x minus left
                left = ((xy[0] - region.left) + 15), //Buffer of 15px
                //Set right to right minus x minus width
                right = ((region.right - xy[0] - width) + 15);
    
            //Set the constraints based on the above calculations
            this.setXConstraint(left, right);
            this.setYConstraint(10, 10);            
        },
        _resizeProxy: function() {
            YAHOO.widget.ColumnDD.superclass._resizeProxy.apply(this, arguments);
            var dragEl = this.getDragEl(),
                el = this.getEl();

            YAHOO.util.Dom.setStyle(this.pointer, 'height', (this.table.parentNode.offsetHeight + 10) + 'px');
            YAHOO.util.Dom.setStyle(this.pointer, 'display', 'block');
            var xy = YAHOO.util.Dom.getXY(el);
            YAHOO.util.Dom.setXY(this.pointer, [xy[0], (xy[1] - 5)]);
            
            YAHOO.util.Dom.setStyle(dragEl, 'height', this.datatable.getContainerEl().offsetHeight + "px");
            YAHOO.util.Dom.setStyle(dragEl, 'width', (parseInt(YAHOO.util.Dom.getStyle(dragEl, 'width'),10) + 4) + 'px');
            YAHOO.util.Dom.setXY(this.dragEl, xy);
        },
        onMouseDown: function() {
                this.initConstraints();
                this.resetConstraints();
        },
        clickValidator: function(e) {
            if(!this.column.hidden) {
                var target = YAHOO.util.Event.getTarget(e);
                return ( this.isValidHandleChild(target) &&
                            (this.id == this.handleElId ||
                                this.DDM.handleWasClicked(target, this.id)) );
            }
        },
        onDragOver: function(ev, id) {
            // Validate target as a Column
            var target = this.datatable.getColumn(id);
            if(target) {                
                // Validate target as a top-level parent
                var targetIndex = target.getTreeIndex();
                while((targetIndex === null) && target.getParent()) {
                    target = target.getParent();
                    targetIndex = target.getTreeIndex();
                }
                if(targetIndex !== null) {
                    // Are we placing to left or right of target?
                    var elTarget = target.getThEl();
                    var newIndex = targetIndex;
                    var mouseX = YAHOO.util.Event.getPageX(ev),
                        targetX = YAHOO.util.Dom.getX(elTarget),
                        midX = targetX + ((YAHOO.util.Dom.get(elTarget).offsetWidth)/2),
                        currentIndex =  this.column.getTreeIndex();
                    
                    if (mouseX < midX) {
                       YAHOO.util.Dom.setX(this.pointer, targetX);
                    } else {
                        var targetWidth = parseInt(elTarget.offsetWidth, 10);
                        YAHOO.util.Dom.setX(this.pointer, (targetX + targetWidth));
                        newIndex++;
                    }
                    if (targetIndex > currentIndex) {
                        newIndex--;
                    }
                    if(newIndex < 0) {
                        newIndex = 0;
                    }
                    else if(newIndex > this.datatable.getColumnSet().tree[0].length) {
                        newIndex = this.datatable.getColumnSet().tree[0].length;
                    }
                    this.newIndex = newIndex;
                }
            }
        },
        onDragDrop: function() {
            this.datatable.reorderColumn(this.column, this.newIndex);
        },
        endDrag: function() {
            this.newIndex = null;
            YAHOO.util.Dom.setStyle(this.pointer, 'display', 'none');
        }
    });
}

/****************************************************************************/
/****************************************************************************/
/****************************************************************************/

/**
 * ColumnResizer subclasses DragDrop to support resizeable Columns.
 *
 * @namespace YAHOO.util
 * @class ColumnResizer
 * @extends YAHOO.util.DDProxy
 * @constructor
 * @param oDataTable {YAHOO.widget.DataTable} DataTable instance.
 * @param oColumn {YAHOO.widget.Column} Column instance.
 * @param elTh {HTMLElement} TH element reference.
 * @param sHandleElId {String} DOM ID of the handle element that causes the resize.
 * @param elProxy {HTMLElement} Resizer proxy element.
 */
YAHOO.util.ColumnResizer = function(oDataTable, oColumn, elTh, sHandleId, elProxy) {
    if(oDataTable && oColumn && elTh && sHandleId) {
        this.datatable = oDataTable;
        this.column = oColumn;
        this.headCell = elTh;
        this.headCellLiner = oColumn.getThLinerEl();
        this.resizerLiner = elTh.firstChild;
        this.init(sHandleId, sHandleId, {dragOnly:true, dragElId: elProxy.id});
        this.initFrame(); // Needed for proxy
        this.resetResizerEl(); // Needed when rowspan > 0

        // Set right padding for bug 1858462
        this.setPadding(0, 1, 0, 0);
    }
    else {
    }
};

if(YAHOO.util.DD) {
    YAHOO.extend(YAHOO.util.ColumnResizer, YAHOO.util.DDProxy, {
        /////////////////////////////////////////////////////////////////////////////
        //
        // Public methods
        //
        /////////////////////////////////////////////////////////////////////////////
        /**
         * Resets resizer element.
         *
         * @method resetResizerEl
         */
        resetResizerEl : function() {
            var resizerStyle = YAHOO.util.Dom.get(this.handleElId).style;
            resizerStyle.left = "auto";
            resizerStyle.right = 0;
            resizerStyle.top = "auto";
            resizerStyle.bottom = 0;
            resizerStyle.height = this.headCell.offsetHeight+"px";
        },
    
        /////////////////////////////////////////////////////////////////////////////
        //
        // Public DOM event handlers
        //
        /////////////////////////////////////////////////////////////////////////////
    
        /**
         * Handles mouseup events on the Column resizer.
         *
         * @method onMouseUp
         * @param e {string} The mouseup event
         */
        onMouseUp : function(e) {
            // Reset height of all resizer els in case TH's have changed height
            var allKeys = this.datatable.getColumnSet().keys,
                col;
            for(var i=0, len=allKeys.length; i<len; i++) {
                col = allKeys[i];
                if(col._ddResizer) {
                    col._ddResizer.resetResizerEl();
                }
            }
            this.resetResizerEl();
            
            var el = this.headCellLiner;
            var newWidth = el.offsetWidth -
                (parseInt(YAHOO.util.Dom.getStyle(el,"paddingLeft"),10)|0) -
                (parseInt(YAHOO.util.Dom.getStyle(el,"paddingRight"),10)|0);

            this.datatable.fireEvent("columnResizeEvent", {column:this.column,target:this.headCell,width:newWidth});
        },
    
        /**
         * Handles mousedown events on the Column resizer.
         *
         * @method onMouseDown
         * @param e {string} The mousedown event
         */
        onMouseDown : function(e) {
            this.startWidth = this.headCellLiner.offsetWidth;
            this.startX = YAHOO.util.Event.getXY(e)[0];
            this.nLinerPadding = (parseInt(YAHOO.util.Dom.getStyle(this.headCellLiner,"paddingLeft"),10)|0) +
                    (parseInt(YAHOO.util.Dom.getStyle(this.headCellLiner,"paddingRight"),10)|0);
        },
    
        /**
         * Custom clickValidator to ensure Column is not in hidden state.
         *
         * @method clickValidator
         * @param {Event} e
         * @private
         */
        clickValidator : function(e) {
            if(!this.column.hidden) {
                var target = YAHOO.util.Event.getTarget(e);
                return ( this.isValidHandleChild(target) &&
                            (this.id == this.handleElId ||
                                this.DDM.handleWasClicked(target, this.id)) );
            }
        },
    
        /**
         * Handles start drag on the Column resizer.
         *
         * @method startDrag
         * @param e {string} The drag event
         */
        startDrag : function() {
            // Shrinks height of all resizer els to not hold open TH els
            var allKeys = this.datatable.getColumnSet().keys,
                thisKey = this.column.getKeyIndex(),
                col;
            for(var i=0, len=allKeys.length; i<len; i++) {
                col = allKeys[i];
                if(col._ddResizer) {
                    YAHOO.util.Dom.get(col._ddResizer.handleElId).style.height = "1em";
                }
            }
        },

        /**
         * Handles drag events on the Column resizer.
         *
         * @method onDrag
         * @param e {string} The drag event
         */
        onDrag : function(e) {
            var newX = YAHOO.util.Event.getXY(e)[0];
            if(newX > YAHOO.util.Dom.getX(this.headCellLiner)) {
                var offsetX = newX - this.startX;
                var newWidth = this.startWidth + offsetX - this.nLinerPadding;
                if(newWidth > 0) {
                    this.datatable.setColumnWidth(this.column, newWidth);
                }
            }
        }
    });
}

/////////////////////////////////////////////////////////////////////////////
//
// Deprecated
//
/////////////////////////////////////////////////////////////////////////////

/**
 * @property editorOptions
 * @deprecated Pass configs directly to CellEditor constructor. 
 */


(function () {

var lang   = YAHOO.lang,
    util   = YAHOO.util,
    widget = YAHOO.widget,
    
    Dom    = util.Dom,
    Ev     = util.Event,
    DT     = widget.DataTable;

/****************************************************************************/
/****************************************************************************/
/****************************************************************************/

/**
 * A RecordSet defines and manages a set of Records.
 *
 * @namespace YAHOO.widget
 * @class RecordSet
 * @param data {Object || Object[]} An object literal or an array of data.
 * @constructor
 */
YAHOO.widget.RecordSet = function(data) {
    this._init(data);
};

var RS = widget.RecordSet;

/**
 * Internal class variable to name multiple Recordset instances.
 *
 * @property RecordSet._nCount
 * @type Number
 * @private
 * @static
 */
RS._nCount = 0;

RS.prototype = {

    /////////////////////////////////////////////////////////////////////////////
    //
    // Private member variables
    //
    /////////////////////////////////////////////////////////////////////////////
    /**
     * Unique String identifier assigned at instantiation.
     *
     * @property _sId
     * @type String
     * @private
     */
    _sId : null,

    /**
     * Internal counter of how many Records are in the RecordSet.
     *
     * @property _length
     * @type Number
     * @private
     * @deprecated No longer used
     */
    //_length : null,

    /////////////////////////////////////////////////////////////////////////////
    //
    // Private methods
    //
    /////////////////////////////////////////////////////////////////////////////
    
    /**
     * Initializer.
     *
     * @method _init
     * @param data {Object || Object[]} An object literal or an array of data.
     * @private
     */
    _init : function(data) {
        // Internal variables
        this._sId = Dom.generateId(null, "yui-rs");// "yui-rs" + widget.RecordSet._nCount;
        widget.RecordSet._nCount++;
        this._records = [];
        //this._length = 0;

        this._initEvents();

        if(data) {
            if(lang.isArray(data)) {
                this.addRecords(data);
            }
            else if(lang.isObject(data)) {
                this.addRecord(data);
            }
        }

    },
    
    /**
     * Initializes custom events.
     *
     * @method _initEvents
     * @private
     */
    _initEvents : function() {
        this.createEvent("recordAddEvent");
        this.createEvent("recordsAddEvent");
        this.createEvent("recordSetEvent");
        this.createEvent("recordsSetEvent");
        this.createEvent("recordUpdateEvent");
        this.createEvent("recordDeleteEvent");
        this.createEvent("recordsDeleteEvent");
        this.createEvent("resetEvent");
        this.createEvent("recordValueUpdateEvent");
    },

    /**
     * Adds one Record to the RecordSet at the given index. If index is null,
     * then adds the Record to the end of the RecordSet.
     *
     * @method _addRecord
     * @param oData {Object} An object literal of data.
     * @param index {Number} (optional) Position index.
     * @return {YAHOO.widget.Record} A Record instance.
     * @private
     */
    _addRecord : function(oData, index) {
        var oRecord = new YAHOO.widget.Record(oData);
        
        if(YAHOO.lang.isNumber(index) && (index > -1)) {
            this._records.splice(index,0,oRecord);
        }
        else {
            //index = this.getLength();
            //this._records[index] = oRecord;
            this._records[this._records.length] = oRecord;
        }
        //this._length++;
        return oRecord;
    },

    /**
     * Sets/replaces one Record to the RecordSet at the given index.  Existing
     * Records with higher indexes are not shifted.  If no index specified, the
     * Record is added to the end of the RecordSet.
     *
     * @method _setRecord
     * @param oData {Object} An object literal of data.
     * @param index {Number} (optional) Position index.
     * @return {YAHOO.widget.Record} A Record instance.
     * @private
     */
    _setRecord : function(oData, index) {
        if (!lang.isNumber(index) || index < 0) {
            index = this._records.length;
        }
        return (this._records[index] = new widget.Record(oData));
        /*
        if(lang.isNumber(index) && (index > -1)) {
            this._records[index] = oRecord;
            if((index+1) > this.getLength()) {
                this._length = index+1;
            }
        }
        else {
            this._records[this.getLength()] = oRecord;
            this._length++;
        }
        return oRecord;
        */
    },

    /**
     * Deletes Records from the RecordSet at the given index. If range is null,
     * then only one Record is deleted.
     *
     * @method _deleteRecord
     * @param index {Number} Position index.
     * @param range {Number} (optional) How many Records to delete
     * @private
     */
    _deleteRecord : function(index, range) {
        if(!lang.isNumber(range) || (range < 0)) {
            range = 1;
        }
        this._records.splice(index, range);
        //this._length = this._length - range;
    },

    /////////////////////////////////////////////////////////////////////////////
    //
    // Public methods
    //
    /////////////////////////////////////////////////////////////////////////////

    /**
     * Returns unique name of the RecordSet instance.
     *
     * @method getId
     * @return {String} Unique name of the RecordSet instance.
     */
    getId : function() {
        return this._sId;
    },

    /**
     * Public accessor to the unique name of the RecordSet instance.
     *
     * @method toString
     * @return {String} Unique name of the RecordSet instance.
     */
    toString : function() {
        return "RecordSet instance " + this._sId;
    },

    /**
     * Returns the number of Records held in the RecordSet.
     *
     * @method getLength
     * @return {Number} Number of records in the RecordSet.
     */
    getLength : function() {
            //return this._length;
            return this._records.length;
    },

    /**
     * Returns Record by ID or RecordSet position index.
     *
     * @method getRecord
     * @param record {YAHOO.widget.Record | Number | String} Record instance,
     * RecordSet position index, or Record ID.
     * @return {YAHOO.widget.Record} Record object.
     */
    getRecord : function(record) {
        var i;
        if(record instanceof widget.Record) {
            for(i=0; i<this._records.length; i++) {
                if(this._records[i] && (this._records[i]._sId === record._sId)) {
                    return record;
                }
            }
        }
        else if(lang.isNumber(record)) {
            if((record > -1) && (record < this.getLength())) {
                return this._records[record];
            }
        }
        else if(lang.isString(record)) {
            for(i=0; i<this._records.length; i++) {
                if(this._records[i] && (this._records[i]._sId === record)) {
                    return this._records[i];
                }
            }
        }
        // Not a valid Record for this RecordSet
        return null;

    },

    /**
     * Returns an array of Records from the RecordSet.
     *
     * @method getRecords
     * @param index {Number} (optional) Recordset position index of which Record to
     * start at.
     * @param range {Number} (optional) Number of Records to get.
     * @return {YAHOO.widget.Record[]} Array of Records starting at given index and
     * length equal to given range. If index is not given, all Records are returned.
     */
    getRecords : function(index, range) {
        if(!lang.isNumber(index)) {
            return this._records;
        }
        if(!lang.isNumber(range)) {
            return this._records.slice(index);
        }
        return this._records.slice(index, index+range);
    },

    /**
     * Returns a boolean indicating whether Records exist in the RecordSet at the
     * specified index range.  Returns true if and only if a Record exists at each
     * index in the range.
     * @method hasRecords
     * @param index
     * @param range
     * @return {Boolean} true if all indices are populated in the RecordSet
     */
    hasRecords : function (index, range) {
        var recs = this.getRecords(index,range);
        for (var i = 0; i < range; ++i) {
            if (typeof recs[i] === 'undefined') {
                return false;
            }
        }
        return true;
    },

    /**
     * Returns current position index for the given Record.
     *
     * @method getRecordIndex
     * @param oRecord {YAHOO.widget.Record} Record instance.
     * @return {Number} Record's RecordSet position index.
     */

    getRecordIndex : function(oRecord) {
        if(oRecord) {
            for(var i=this._records.length-1; i>-1; i--) {
                if(this._records[i] && oRecord.getId() === this._records[i].getId()) {
                    return i;
                }
            }
        }
        return null;

    },

    /**
     * Adds one Record to the RecordSet at the given index. If index is null,
     * then adds the Record to the end of the RecordSet.
     *
     * @method addRecord
     * @param oData {Object} An object literal of data.
     * @param index {Number} (optional) Position index.
     * @return {YAHOO.widget.Record} A Record instance.
     */
    addRecord : function(oData, index) {
        if(lang.isObject(oData)) {
            var oRecord = this._addRecord(oData, index);
            this.fireEvent("recordAddEvent",{record:oRecord,data:oData});
            return oRecord;
        }
        else {
            return null;
        }
    },

    /**
     * Adds multiple Records at once to the RecordSet at the given index with the
     * given object literal data. If index is null, then the new Records are
     * added to the end of the RecordSet.
     *
     * @method addRecords
     * @param aData {Object[]} An object literal data or an array of data object literals.
     * @param index {Number} (optional) Position index.
     * @return {YAHOO.widget.Record[]} An array of Record instances.
     */
    addRecords : function(aData, index) {
        if(lang.isArray(aData)) {
            var newRecords = [],
                idx,i,len;

            index = lang.isNumber(index) ? index : this._records.length;
            idx = index;

            // Can't go backwards bc we need to preserve order
            for(i=0,len=aData.length; i<len; ++i) {
                if(lang.isObject(aData[i])) {
                    var record = this._addRecord(aData[i], idx++);
                    newRecords.push(record);
                }
           }
            this.fireEvent("recordsAddEvent",{records:newRecords,data:aData});
           return newRecords;
        }
        else if(lang.isObject(aData)) {
            var oRecord = this._addRecord(aData);
            this.fireEvent("recordsAddEvent",{records:[oRecord],data:aData});
            return oRecord;
        }
        else {
            return null;
        }
    },

    /**
     * Sets or replaces one Record to the RecordSet at the given index. Unlike
     * addRecord, an existing Record at that index is not shifted to preserve it.
     * If no index is specified, it adds the Record to the end of the RecordSet.
     *
     * @method setRecord
     * @param oData {Object} An object literal of data.
     * @param index {Number} (optional) Position index.
     * @return {YAHOO.widget.Record} A Record instance.
     */
    setRecord : function(oData, index) {
        if(lang.isObject(oData)) {
            var oRecord = this._setRecord(oData, index);
            this.fireEvent("recordSetEvent",{record:oRecord,data:oData});
            return oRecord;
        }
        else {
            return null;
        }
    },

    /**
     * Sets or replaces multiple Records at once to the RecordSet with the given
     * data, starting at the given index. If index is not specified, then the new
     * Records are added to the end of the RecordSet.
     *
     * @method setRecords
     * @param aData {Object[]} An array of object literal data.
     * @param index {Number} (optional) Position index.
     * @return {YAHOO.widget.Record[]} An array of Record instances.
     */
    setRecords : function(aData, index) {
        var Rec   = widget.Record,
            a     = lang.isArray(aData) ? aData : [aData],
            added = [],
            i = 0, l = a.length, j = 0;

        index = parseInt(index,10)|0;

        for(; i < l; ++i) {
            if (typeof a[i] === 'object' && a[i]) {
                added[j++] = this._records[index + i] = new Rec(a[i]);
            }
        }

        this.fireEvent("recordsSetEvent",{records:added,data:aData});
        // Backward compatibility for bug 1918245
        this.fireEvent("recordsSet",{records:added,data:aData});

        if (a.length && !added.length) {
        }

        return added;
    },

    /**
     * Updates given Record with given data.
     *
     * @method updateRecord
     * @param record {YAHOO.widget.Record | Number | String} A Record instance,
     * a RecordSet position index, or a Record ID.
     * @param oData {Object} Object literal of new data.
     * @return {YAHOO.widget.Record} Updated Record, or null.
     */
    updateRecord : function(record, oData) {
        var oRecord = this.getRecord(record);
        if(oRecord && lang.isObject(oData)) {
            // Copy data from the Record for the event that gets fired later
            var oldData = {};
            for(var key in oRecord._oData) {
                if(lang.hasOwnProperty(oRecord._oData, key)) {
                    oldData[key] = oRecord._oData[key];
                }
            }
            oRecord._oData = oData;
            this.fireEvent("recordUpdateEvent",{record:oRecord,newData:oData,oldData:oldData});
            return oRecord;
        }
        else {
            return null;
        }
    },

    /**
     * @method updateKey
     * @deprecated Use updateRecordValue
     */
    updateKey : function(record, sKey, oData) {
        this.updateRecordValue(record, sKey, oData);
    },
    /**
     * Sets given Record at given key to given data.
     *
     * @method updateRecordValue
     * @param record {YAHOO.widget.Record | Number | String} A Record instance,
     * a RecordSet position index, or a Record ID.
     * @param sKey {String} Key name.
     * @param oData {Object} New data.
     */
    updateRecordValue : function(record, sKey, oData) {
        var oRecord = this.getRecord(record);
        if(oRecord) {
            var oldData = null;
            var keyValue = oRecord._oData[sKey];
            // Copy data from the Record for the event that gets fired later
            if(keyValue && lang.isObject(keyValue)) {
                oldData = {};
                for(var key in keyValue)  {
                    if(lang.hasOwnProperty(keyValue, key)) {
                        oldData[key] = keyValue[key];
                    }
                }
            }
            // Copy by value
            else {
                oldData = keyValue;
            }

            oRecord._oData[sKey] = oData;
            this.fireEvent("keyUpdateEvent",{record:oRecord,key:sKey,newData:oData,oldData:oldData});
            this.fireEvent("recordValueUpdateEvent",{record:oRecord,key:sKey,newData:oData,oldData:oldData});
        }
        else {
        }
    },

    /**
     * Replaces all Records in RecordSet with new object literal data.
     *
     * @method replaceRecords
     * @param data {Object || Object[]} An object literal of data or an array of
     * data object literals.
     * @return {YAHOO.widget.Record || YAHOO.widget.Record[]} A Record instance or
     * an array of Records.
     */
    replaceRecords : function(data) {
        this.reset();
        return this.addRecords(data);
    },

    /**
     * Sorts all Records by given function. Records keep their unique IDs but will
     * have new RecordSet position indexes.
     *
     * @method sortRecords
     * @param fnSort {Function} Reference to a sort function.
     * @param desc {Boolean} True if sort direction is descending, false if sort
     * direction is ascending.
     * @param field {String} The field to sort by, from sortOptions.field
     * @return {YAHOO.widget.Record[]} Sorted array of Records.
     */
    sortRecords : function(fnSort, desc, field) {
        return this._records.sort(function(a, b) {return fnSort(a, b, desc, field);});
    },

    /**
     * Reverses all Records, so ["one", "two", "three"] becomes ["three", "two", "one"].
     *
     * @method reverseRecords
     * @return {YAHOO.widget.Record[]} Reverse-sorted array of Records.
     */
    reverseRecords : function() {
        return this._records.reverse();
    },

    /**
     * Removes the Record at the given position index from the RecordSet. If a range
     * is also provided, removes that many Records, starting from the index. Length
     * of RecordSet is correspondingly shortened.
     *
     * @method deleteRecord
     * @param index {Number} Record's RecordSet position index.
     * @return {Object} A copy of the data held by the deleted Record.
     */
    deleteRecord : function(index) {
        if(lang.isNumber(index) && (index > -1) && (index < this.getLength())) {
            var oData = this.getRecord(index).getData();
            
            this._deleteRecord(index);
            this.fireEvent("recordDeleteEvent",{data:oData,index:index});
            return oData;
        }
        else {
            return null;
        }
    },

    /**
     * Removes the Record at the given position index from the RecordSet. If a range
     * is also provided, removes that many Records, starting from the index. Length
     * of RecordSet is correspondingly shortened.
     *
     * @method deleteRecords
     * @param index {Number} Record's RecordSet position index.
     * @param range {Number} (optional) How many Records to delete.
     * @return {Object[]} An array of copies of the data held by the deleted Records.     
     */
    deleteRecords : function(index, range) {
        if(!lang.isNumber(range)) {
            range = 1;
        }
        if(lang.isNumber(index) && (index > -1) && (index < this.getLength())) {
            var recordsToDelete = this.getRecords(index, range);
            var deletedData = [], // this mistakenly held Records, not data
                deletedObjects = []; // this passes data only
            
            for(var i=0; i<recordsToDelete.length; i++) {
                deletedData[deletedData.length] = recordsToDelete[i]; // backward compatibility
                deletedObjects[deletedObjects.length] = recordsToDelete[i].getData();
            }
            this._deleteRecord(index, range);

            this.fireEvent("recordsDeleteEvent",{data:deletedData,deletedData:deletedObjects,index:index});

            return deletedData;
        }
        else {
            return null;
        }
    },

    /**
     * Deletes all Records from the RecordSet.
     *
     * @method reset
     */
    reset : function() {
        this._records = [];
        //this._length = 0;
        this.fireEvent("resetEvent");
    }
};

/////////////////////////////////////////////////////////////////////////////
//
// Custom Events
//
/////////////////////////////////////////////////////////////////////////////

// RecordSet uses EventProvider
lang.augmentProto(RS, util.EventProvider);

/**
 * Fired when a new Record is added to the RecordSet.
 *
 * @event recordAddEvent
 * @param oArgs.record {YAHOO.widget.Record} The Record instance.
 * @param oArgs.data {Object} Data added.
 */

/**
 * Fired when multiple Records are added to the RecordSet at once.
 *
 * @event recordsAddEvent
 * @param oArgs.records {YAHOO.widget.Record[]} An array of Record instances.
 * @param oArgs.data {Object[]} Data added.
 */

/**
 * Fired when a Record is set in the RecordSet.
 *
 * @event recordSetEvent
 * @param oArgs.record {YAHOO.widget.Record} The Record instance.
 * @param oArgs.data {Object} Data added.
 */

/**
 * Fired when multiple Records are set in the RecordSet at once.
 *
 * @event recordsSetEvent
 * @param oArgs.records {YAHOO.widget.Record[]} An array of Record instances.
 * @param oArgs.data {Object[]} Data added.
 */

/**
 * Fired when a Record is updated with new data.
 *
 * @event recordUpdateEvent
 * @param oArgs.record {YAHOO.widget.Record} The Record instance.
 * @param oArgs.newData {Object} New data.
 * @param oArgs.oldData {Object} Old data.
 */

/**
 * Fired when a Record is deleted from the RecordSet.
 *
 * @event recordDeleteEvent
 * @param oArgs.data {Object} The data held by the deleted Record,
 * or an array of data object literals if multiple Records were deleted at once.
 * @param oArgs.index {Object} Index of the deleted Record.
 */

/**
 * Fired when multiple Records are deleted from the RecordSet at once.
 *
 * @event recordsDeleteEvent
 * @param oArgs.data {Object[]} An array of deleted Records.
 * @param oArgs.deletedData {Object[]} An array of deleted data.
 * @param oArgs.index {Object} Index of the first deleted Record.
 */

/**
 * Fired when all Records are deleted from the RecordSet at once.
 *
 * @event resetEvent
 */

/**
 * @event keyUpdateEvent    
 * @deprecated Use recordValueUpdateEvent     
 */

/**
 * Fired when a Record value is updated with new data.
 *
 * @event recordValueUpdateEvent
 * @param oArgs.record {YAHOO.widget.Record} The Record instance.
 * @param oArgs.key {String} The updated key.
 * @param oArgs.newData {Object} New data.
 * @param oArgs.oldData {Object} Old data.
 *
 */


/****************************************************************************/
/****************************************************************************/
/****************************************************************************/

/**
 * The Record class defines a DataTable record.
 *
 * @namespace YAHOO.widget
 * @class Record
 * @constructor
 * @param oConfigs {Object} (optional) Object literal of key/value pairs.
 */
YAHOO.widget.Record = function(oLiteral) {
    this._nCount = widget.Record._nCount;
    this._sId = Dom.generateId(null, "yui-rec");//"yui-rec" + this._nCount;
    widget.Record._nCount++;
    this._oData = {};
    if(lang.isObject(oLiteral)) {
        for(var sKey in oLiteral) {
            if(lang.hasOwnProperty(oLiteral, sKey)) {
                this._oData[sKey] = oLiteral[sKey];
            }
        }
    }
};

/////////////////////////////////////////////////////////////////////////////
//
// Private member variables
//
/////////////////////////////////////////////////////////////////////////////

/**
 * Internal class variable to give unique IDs to Record instances.
 *
 * @property Record._nCount
 * @type Number
 * @private
 */
YAHOO.widget.Record._nCount = 0;

YAHOO.widget.Record.prototype = {
    /**
     * Immutable unique count assigned at instantiation. Remains constant while a
     * Record's position index can change from sorting.
     *
     * @property _nCount
     * @type Number
     * @private
     */
    _nCount : null,

    /**
     * Immutable unique ID assigned at instantiation. Remains constant while a
     * Record's position index can change from sorting.
     *
     * @property _sId
     * @type String
     * @private
     */
    _sId : null,

    /**
     * Holds data for the Record in an object literal.
     *
     * @property _oData
     * @type Object
     * @private
     */
    _oData : null,

    /////////////////////////////////////////////////////////////////////////////
    //
    // Public member variables
    //
    /////////////////////////////////////////////////////////////////////////////

    /////////////////////////////////////////////////////////////////////////////
    //
    // Public methods
    //
    /////////////////////////////////////////////////////////////////////////////

    /**
     * Returns unique count assigned at instantiation.
     *
     * @method getCount
     * @return Number
     */
    getCount : function() {
        return this._nCount;
    },

    /**
     * Returns unique ID assigned at instantiation.
     *
     * @method getId
     * @return String
     */
    getId : function() {
        return this._sId;
    },

    /**
     * Returns data for the Record for a field if given, or the entire object
     * literal otherwise.
     *
     * @method getData
     * @param sField {String} (Optional) The field from which to retrieve data value.
     * @return Object
     */
    getData : function(sField) {
        if(lang.isString(sField)) {
            return this._oData[sField];
        }
        else {
            return this._oData;
        }
    },

    /**
     * Sets given data at the given key. Use the RecordSet method updateRecordValue to trigger
     * events. 
     *
     * @method setData
     * @param sKey {String} The key of the new value.
     * @param oData {MIXED} The new value.
     */
    setData : function(sKey, oData) {
        this._oData[sKey] = oData;
    }
};

})();

(function () {

var lang   = YAHOO.lang,
    util   = YAHOO.util,
    widget = YAHOO.widget,
    ua     = YAHOO.env.ua,
    
    Dom    = util.Dom,
    Ev     = util.Event,
    DS     = util.DataSourceBase;

/**
 * The DataTable widget provides a progressively enhanced DHTML control for
 * displaying tabular data across A-grade browsers.
 *
 * @module datatable
 * @requires yahoo, dom, event, element, datasource
 * @optional dragdrop, dragdrop
 * @title DataTable Widget
 */

/****************************************************************************/
/****************************************************************************/
/****************************************************************************/

/**
 * DataTable class for the YUI DataTable widget.
 *
 * @namespace YAHOO.widget
 * @class DataTable
 * @extends YAHOO.util.Element
 * @constructor
 * @param elContainer {HTMLElement} Container element for the TABLE.
 * @param aColumnDefs {Object[]} Array of object literal Column definitions.
 * @param oDataSource {YAHOO.util.DataSource} DataSource instance.
 * @param oConfigs {object} (optional) Object literal of configuration values.
 */
YAHOO.widget.DataTable = function(elContainer,aColumnDefs,oDataSource,oConfigs) {
    var DT = widget.DataTable;
    
    ////////////////////////////////////////////////////////////////////////////
    // Backward compatibility for SDT, but prevent infinite loops
    
    if(oConfigs && oConfigs.scrollable) {
        return new YAHOO.widget.ScrollingDataTable(elContainer,aColumnDefs,oDataSource,oConfigs);
    }
    
    ////////////////////////////////////////////////////////////////////////////
    // Initialization

    // Internal vars
    this._nIndex = DT._nCount;
    this._sId = Dom.generateId(null, "yui-dt");// "yui-dt"+this._nIndex;
    this._oChainRender = new YAHOO.util.Chain();
    this._oChainRender.subscribe("end",this._onRenderChainEnd, this, true);

    // Initialize configs
    this._initConfigs(oConfigs);

    // Initialize DataSource
    this._initDataSource(oDataSource);
    if(!this._oDataSource) {
        return;
    }

    // Initialize ColumnSet
    this._initColumnSet(aColumnDefs);
    if(!this._oColumnSet) {
        return;
    }

    // Initialize RecordSet
    this._initRecordSet();
    if(!this._oRecordSet) {
    }

    // Initialize Attributes
    DT.superclass.constructor.call(this, elContainer, this.configs);

    // Initialize DOM elements
    var okDom = this._initDomElements(elContainer);
    if(!okDom) {
        return;
    }
            
    // Show message as soon as config is available
    this.showTableMessage(this.get("MSG_LOADING"), DT.CLASS_LOADING);
    
    ////////////////////////////////////////////////////////////////////////////
    // Once per instance
    this._initEvents();

    DT._nCount++;
    DT._nCurrentCount++;
    
    ////////////////////////////////////////////////////////////////////////////
    // Data integration

    // Send a simple initial request
    var oCallback = {
        success : this.onDataReturnSetRows,
        failure : this.onDataReturnSetRows,
        scope   : this,
        argument: this.getState()
    };
    
    var initialLoad = this.get("initialLoad");
    if(initialLoad === true) {
        this._oDataSource.sendRequest(this.get("initialRequest"), oCallback);
    }
    // Do not send an initial request at all
    else if(initialLoad === false) {
        this.showTableMessage(this.get("MSG_EMPTY"), DT.CLASS_EMPTY);
    }
    // Send an initial request with a custom payload
    else {
        var oCustom = initialLoad || {};
        oCallback.argument = oCustom.argument || {};
        this._oDataSource.sendRequest(oCustom.request, oCallback);
    }
};

var DT = widget.DataTable;

/////////////////////////////////////////////////////////////////////////////
//
// Public constants
//
/////////////////////////////////////////////////////////////////////////////

lang.augmentObject(DT, {

    /**
     * Class name assigned to outer DataTable container.
     *
     * @property DataTable.CLASS_DATATABLE
     * @type String
     * @static
     * @final
     * @default "yui-dt"
     */
    CLASS_DATATABLE : "yui-dt",

    /**
     * Class name assigned to liner DIV elements.
     *
     * @property DataTable.CLASS_LINER
     * @type String
     * @static
     * @final
     * @default "yui-dt-liner"
     */
    CLASS_LINER : "yui-dt-liner",

    /**
     * Class name assigned to display label elements.
     *
     * @property DataTable.CLASS_LABEL
     * @type String
     * @static
     * @final
     * @default "yui-dt-label"
     */
    CLASS_LABEL : "yui-dt-label",

    /**
     * Class name assigned to messaging elements.
     *
     * @property DataTable.CLASS_MESSAGE
     * @type String
     * @static
     * @final
     * @default "yui-dt-message"
     */
    CLASS_MESSAGE : "yui-dt-message",

    /**
     * Class name assigned to mask element when DataTable is disabled.
     *
     * @property DataTable.CLASS_MASK
     * @type String
     * @static
     * @final
     * @default "yui-dt-mask"
     */
    CLASS_MASK : "yui-dt-mask",

    /**
     * Class name assigned to data elements.
     *
     * @property DataTable.CLASS_DATA
     * @type String
     * @static
     * @final
     * @default "yui-dt-data"
     */
    CLASS_DATA : "yui-dt-data",

    /**
     * Class name assigned to Column drag target.
     *
     * @property DataTable.CLASS_COLTARGET
     * @type String
     * @static
     * @final
     * @default "yui-dt-coltarget"
     */
    CLASS_COLTARGET : "yui-dt-coltarget",

    /**
     * Class name assigned to resizer handle elements.
     *
     * @property DataTable.CLASS_RESIZER
     * @type String
     * @static
     * @final
     * @default "yui-dt-resizer"
     */
    CLASS_RESIZER : "yui-dt-resizer",

    /**
     * Class name assigned to resizer liner elements.
     *
     * @property DataTable.CLASS_RESIZERLINER
     * @type String
     * @static
     * @final
     * @default "yui-dt-resizerliner"
     */
    CLASS_RESIZERLINER : "yui-dt-resizerliner",

    /**
     * Class name assigned to resizer proxy elements.
     *
     * @property DataTable.CLASS_RESIZERPROXY
     * @type String
     * @static
     * @final
     * @default "yui-dt-resizerproxy"
     */
    CLASS_RESIZERPROXY : "yui-dt-resizerproxy",

    /**
     * Class name assigned to CellEditor container elements.
     *
     * @property DataTable.CLASS_EDITOR
     * @type String
     * @static
     * @final
     * @default "yui-dt-editor"
     */
    CLASS_EDITOR : "yui-dt-editor",

    /**
     * Class name assigned to CellEditor container shim.
     *
     * @property DataTable.CLASS_EDITOR_SHIM
     * @type String
     * @static
     * @final
     * @default "yui-dt-editor-shim"
     */
    CLASS_EDITOR_SHIM : "yui-dt-editor-shim",

    /**
     * Class name assigned to paginator container elements.
     *
     * @property DataTable.CLASS_PAGINATOR
     * @type String
     * @static
     * @final
     * @default "yui-dt-paginator"
     */
    CLASS_PAGINATOR : "yui-dt-paginator",

    /**
     * Class name assigned to page number indicators.
     *
     * @property DataTable.CLASS_PAGE
     * @type String
     * @static
     * @final
     * @default "yui-dt-page"
     */
    CLASS_PAGE : "yui-dt-page",

    /**
     * Class name assigned to default indicators.
     *
     * @property DataTable.CLASS_DEFAULT
     * @type String
     * @static
     * @final
     * @default "yui-dt-default"
     */
    CLASS_DEFAULT : "yui-dt-default",

    /**
     * Class name assigned to previous indicators.
     *
     * @property DataTable.CLASS_PREVIOUS
     * @type String
     * @static
     * @final
     * @default "yui-dt-previous"
     */
    CLASS_PREVIOUS : "yui-dt-previous",

    /**
     * Class name assigned next indicators.
     *
     * @property DataTable.CLASS_NEXT
     * @type String
     * @static
     * @final
     * @default "yui-dt-next"
     */
    CLASS_NEXT : "yui-dt-next",

    /**
     * Class name assigned to first elements.
     *
     * @property DataTable.CLASS_FIRST
     * @type String
     * @static
     * @final
     * @default "yui-dt-first"
     */
    CLASS_FIRST : "yui-dt-first",

    /**
     * Class name assigned to last elements.
     *
     * @property DataTable.CLASS_LAST
     * @type String
     * @static
     * @final
     * @default "yui-dt-last"
     */
    CLASS_LAST : "yui-dt-last",

    /**
     * Class name assigned to Record elements.
     *
     * @property DataTable.CLASS_REC
     * @type String
     * @static
     * @final
     * @default "yui-dt-rec"
     */
    CLASS_REC : "yui-dt-rec",

    /**
     * Class name assigned to even elements.
     *
     * @property DataTable.CLASS_EVEN
     * @type String
     * @static
     * @final
     * @default "yui-dt-even"
     */
    CLASS_EVEN : "yui-dt-even",

    /**
     * Class name assigned to odd elements.
     *
     * @property DataTable.CLASS_ODD
     * @type String
     * @static
     * @final
     * @default "yui-dt-odd"
     */
    CLASS_ODD : "yui-dt-odd",

    /**
     * Class name assigned to selected elements.
     *
     * @property DataTable.CLASS_SELECTED
     * @type String
     * @static
     * @final
     * @default "yui-dt-selected"
     */
    CLASS_SELECTED : "yui-dt-selected",

    /**
     * Class name assigned to highlighted elements.
     *
     * @property DataTable.CLASS_HIGHLIGHTED
     * @type String
     * @static
     * @final
     * @default "yui-dt-highlighted"
     */
    CLASS_HIGHLIGHTED : "yui-dt-highlighted",

    /**
     * Class name assigned to hidden elements.
     *
     * @property DataTable.CLASS_HIDDEN
     * @type String
     * @static
     * @final
     * @default "yui-dt-hidden"
     */
    CLASS_HIDDEN : "yui-dt-hidden",

    /**
     * Class name assigned to disabled elements.
     *
     * @property DataTable.CLASS_DISABLED
     * @type String
     * @static
     * @final
     * @default "yui-dt-disabled"
     */
    CLASS_DISABLED : "yui-dt-disabled",

    /**
     * Class name assigned to empty indicators.
     *
     * @property DataTable.CLASS_EMPTY
     * @type String
     * @static
     * @final
     * @default "yui-dt-empty"
     */
    CLASS_EMPTY : "yui-dt-empty",

    /**
     * Class name assigned to loading indicatorx.
     *
     * @property DataTable.CLASS_LOADING
     * @type String
     * @static
     * @final
     * @default "yui-dt-loading"
     */
    CLASS_LOADING : "yui-dt-loading",

    /**
     * Class name assigned to error indicators.
     *
     * @property DataTable.CLASS_ERROR
     * @type String
     * @static
     * @final
     * @default "yui-dt-error"
     */
    CLASS_ERROR : "yui-dt-error",

    /**
     * Class name assigned to editable elements.
     *
     * @property DataTable.CLASS_EDITABLE
     * @type String
     * @static
     * @final
     * @default "yui-dt-editable"
     */
    CLASS_EDITABLE : "yui-dt-editable",

    /**
     * Class name assigned to draggable elements.
     *
     * @property DataTable.CLASS_DRAGGABLE
     * @type String
     * @static
     * @final
     * @default "yui-dt-draggable"
     */
    CLASS_DRAGGABLE : "yui-dt-draggable",

    /**
     * Class name assigned to resizeable elements.
     *
     * @property DataTable.CLASS_RESIZEABLE
     * @type String
     * @static
     * @final
     * @default "yui-dt-resizeable"
     */
    CLASS_RESIZEABLE : "yui-dt-resizeable",

    /**
     * Class name assigned to scrollable elements.
     *
     * @property DataTable.CLASS_SCROLLABLE
     * @type String
     * @static
     * @final
     * @default "yui-dt-scrollable"
     */
    CLASS_SCROLLABLE : "yui-dt-scrollable",

    /**
     * Class name assigned to sortable elements.
     *
     * @property DataTable.CLASS_SORTABLE
     * @type String
     * @static
     * @final
     * @default "yui-dt-sortable"
     */
    CLASS_SORTABLE : "yui-dt-sortable",

    /**
     * Class name assigned to ascending elements.
     *
     * @property DataTable.CLASS_ASC
     * @type String
     * @static
     * @final
     * @default "yui-dt-asc"
     */
    CLASS_ASC : "yui-dt-asc",

    /**
     * Class name assigned to descending elements.
     *
     * @property DataTable.CLASS_DESC
     * @type String
     * @static
     * @final
     * @default "yui-dt-desc"
     */
    CLASS_DESC : "yui-dt-desc",

    /**
     * Class name assigned to BUTTON elements and/or container elements.
     *
     * @property DataTable.CLASS_BUTTON
     * @type String
     * @static
     * @final
     * @default "yui-dt-button"
     */
    CLASS_BUTTON : "yui-dt-button",

    /**
     * Class name assigned to INPUT TYPE=CHECKBOX elements and/or container elements.
     *
     * @property DataTable.CLASS_CHECKBOX
     * @type String
     * @static
     * @final
     * @default "yui-dt-checkbox"
     */
    CLASS_CHECKBOX : "yui-dt-checkbox",

    /**
     * Class name assigned to SELECT elements and/or container elements.
     *
     * @property DataTable.CLASS_DROPDOWN
     * @type String
     * @static
     * @final
     * @default "yui-dt-dropdown"
     */
    CLASS_DROPDOWN : "yui-dt-dropdown",

    /**
     * Class name assigned to INPUT TYPE=RADIO elements and/or container elements.
     *
     * @property DataTable.CLASS_RADIO
     * @type String
     * @static
     * @final
     * @default "yui-dt-radio"
     */
    CLASS_RADIO : "yui-dt-radio",

    /////////////////////////////////////////////////////////////////////////
    //
    // Private static properties
    //
    /////////////////////////////////////////////////////////////////////////

    /**
     * Internal class variable for indexing multiple DataTable instances.
     *
     * @property DataTable._nCount
     * @type Number
     * @private
     * @static
     */
    _nCount : 0,

    /**
     * Internal class variable tracking current number of DataTable instances,
     * so that certain class values can be reset when all instances are destroyed.          
     *
     * @property DataTable._nCurrentCount
     * @type Number
     * @private
     * @static
     */
    _nCurrentCount : 0,

    /**
     * Reference to the STYLE node that is dynamically created and updated
     * in order to manage Column widths.
     *
     * @property DataTable._elDynStyleNode
     * @type HTMLElement
     * @private
     * @static     
     */
    _elDynStyleNode : null,

    /**
     * Set to true if _elDynStyleNode cannot be populated due to browser incompatibility.
     *
     * @property DataTable._bDynStylesFallback
     * @type boolean
     * @private
     * @static     
     */
    _bDynStylesFallback : (ua.ie) ? true : false,

    /**
     * Object literal hash of Columns and their dynamically create style rules.
     *
     * @property DataTable._oDynStyles
     * @type Object
     * @private
     * @static     
     */
    _oDynStyles : {},

    /////////////////////////////////////////////////////////////////////////
    //
    // Private static methods
    //
    /////////////////////////////////////////////////////////////////////////

    /**
     * Clones object literal or array of object literals.
     *
     * @method DataTable._cloneObject
     * @param o {Object} Object.
     * @private
     * @static     
     */
    _cloneObject: function(o) {
        if(!lang.isValue(o)) {
            return o;
        }

        var copy = {};

        if(o instanceof YAHOO.widget.BaseCellEditor) {
            copy = o;
        }
        else if(Object.prototype.toString.apply(o) === "[object RegExp]") {
            copy = o;
        }
        else if(lang.isFunction(o)) {
            copy = o;
        }
        else if(lang.isArray(o)) {
            var array = [];
            for(var i=0,len=o.length;i<len;i++) {
                array[i] = DT._cloneObject(o[i]);
            }
            copy = array;
        }
        else if(lang.isObject(o)) {
            for (var x in o){
                if(lang.hasOwnProperty(o, x)) {
                    if(lang.isValue(o[x]) && lang.isObject(o[x]) || lang.isArray(o[x])) {
                        copy[x] = DT._cloneObject(o[x]);
                    }
                    else {
                        copy[x] = o[x];
                    }
                }
            }
        }
        else {
            copy = o;
        }

        return copy;
    },

    /**
     * Formats a BUTTON element.
     *
     * @method DataTable.formatButton
     * @param el {HTMLElement} The element to format with markup.
     * @param oRecord {YAHOO.widget.Record} Record instance.
     * @param oColumn {YAHOO.widget.Column} Column instance.
     * @param oData {HTML} Data value for the cell. By default, the value
     * is what gets written to the BUTTON. String values are treated as markup
     * and inserted into the DOM with innerHTML.
     * @param oDataTable {YAHOO.widget.DataTable} DataTable instance.
     * @static
     */
    formatButton : function(el, oRecord, oColumn, oData, oDataTable) {
        var sValue = lang.isValue(oData) ? oData : "Click";
        //TODO: support YAHOO.widget.Button
        //if(YAHOO.widget.Button) {

        //}
        //else {
            el.innerHTML = "<button type=\"button\" class=\""+
                    DT.CLASS_BUTTON + "\">" + sValue + "</button>";
        //}
    },

    /**
     * Formats a CHECKBOX element.
     *
     * @method DataTable.formatCheckbox
     * @param el {HTMLElement} The element to format with markup.
     * @param oRecord {YAHOO.widget.Record} Record instance.
     * @param oColumn {YAHOO.widget.Column} Column instance.
     * @param oData {Object | Boolean | HTML} Data value for the cell. Can be a simple
     * Boolean to indicate whether checkbox is checked or not. Can be object literal
     * {checked:bBoolean, label:sLabel}. String values are treated as markup
     * and inserted into the DOM with innerHTML.
     * @param oDataTable {YAHOO.widget.DataTable} DataTable instance.
     * @static
     */
    formatCheckbox : function(el, oRecord, oColumn, oData, oDataTable) {
        var bChecked = oData;
        bChecked = (bChecked) ? " checked=\"checked\"" : "";
        el.innerHTML = "<input type=\"checkbox\"" + bChecked +
                " class=\"" + DT.CLASS_CHECKBOX + "\" />";
    },

    /**
     * Formats currency. Default unit is USD.
     *
     * @method DataTable.formatCurrency
     * @param el {HTMLElement} The element to format with markup.
     * @param oRecord {YAHOO.widget.Record} Record instance.
     * @param oColumn {YAHOO.widget.Column} Column instance.
     * @param oData {Number} Data value for the cell.
     * @param oDataTable {YAHOO.widget.DataTable} DataTable instance.
     * @static
     */
    formatCurrency : function(el, oRecord, oColumn, oData, oDataTable) {
        var oDT = oDataTable || this;
        el.innerHTML = util.Number.format(oData, oColumn.currencyOptions || oDT.get("currencyOptions"));
    },

    /**
     * Formats JavaScript Dates.
     *
     * @method DataTable.formatDate
     * @param el {HTMLElement} The element to format with markup.
     * @param oRecord {YAHOO.widget.Record} Record instance.
     * @param oColumn {YAHOO.widget.Column} Column instance.
     * @param oData {Object} Data value for the cell, or null. String values are
     * treated as markup and inserted into the DOM with innerHTML.
     * @param oDataTable {YAHOO.widget.DataTable} DataTable instance.
     * @static
     */
    formatDate : function(el, oRecord, oColumn, oData, oDataTable) {
        var oDT = oDataTable || this,
            oConfig = oColumn.dateOptions || oDT.get("dateOptions");
        el.innerHTML = util.Date.format(oData, oConfig, oConfig.locale);
    },

    /**
     * Formats SELECT elements.
     *
     * @method DataTable.formatDropdown
     * @param el {HTMLElement} The element to format with markup.
     * @param oRecord {YAHOO.widget.Record} Record instance.
     * @param oColumn {YAHOO.widget.Column} Column instance.
     * @param oData {Object} Data value for the cell, or null. String values may
     * be treated as markup and inserted into the DOM with innerHTML as element
     * label.
     * @param oDataTable {YAHOO.widget.DataTable} DataTable instance.
     * @static
     */
    formatDropdown : function(el, oRecord, oColumn, oData, oDataTable) {
        var oDT = oDataTable || this,
            selectedValue = (lang.isValue(oData)) ? oData : oRecord.getData(oColumn.field),
            options = (lang.isArray(oColumn.dropdownOptions)) ?
                oColumn.dropdownOptions : null,

            selectEl,
            collection = el.getElementsByTagName("select");

        // Create the form element only once, so we can attach the onChange listener
        if(collection.length === 0) {
            // Create SELECT element
            selectEl = document.createElement("select");
            selectEl.className = DT.CLASS_DROPDOWN;
            selectEl = el.appendChild(selectEl);

            // Add event listener
            Ev.addListener(selectEl,"change",oDT._onDropdownChange,oDT);
        }

        selectEl = collection[0];

        // Update the form element
        if(selectEl) {
            // Clear out previous options
            selectEl.innerHTML = "";

            // We have options to populate
            if(options) {
                // Create OPTION elements
                for(var i=0; i<options.length; i++) {
                    var option = options[i];
                    var optionEl = document.createElement("option");
                    optionEl.value = (lang.isValue(option.value)) ?
                            option.value : option;
                    // Bug 2334323: Support legacy text, support label for consistency with DropdownCellEditor
                    optionEl.innerHTML = (lang.isValue(option.text)) ?
                            option.text : (lang.isValue(option.label)) ? option.label : option;
                    optionEl = selectEl.appendChild(optionEl);
                    if (optionEl.value == selectedValue) {
                        optionEl.selected = true;
                    }
                }
            }
            // Selected value is our only option
            else {
                selectEl.innerHTML = "<option selected value=\"" + selectedValue + "\">" + selectedValue + "</option>";
            }
        }
        else {
            el.innerHTML = lang.isValue(oData) ? oData : "";
        }
    },

    /**
     * Formats emails.
     *
     * @method DataTable.formatEmail
     * @param el {HTMLElement} The element to format with markup.
     * @param oRecord {YAHOO.widget.Record} Record instance.
     * @param oColumn {YAHOO.widget.Column} Column instance.
     * @param oData {String} Data value for the cell, or null. Values are
     * HTML-escaped.
     * @param oDataTable {YAHOO.widget.DataTable} DataTable instance.
     * @static
     */
    formatEmail : function(el, oRecord, oColumn, oData, oDataTable) {
        if(lang.isString(oData)) {
            oData = lang.escapeHTML(oData);
            el.innerHTML = "<a href=\"mailto:" + oData + "\">" + oData + "</a>";
        }
        else {
            el.innerHTML = lang.isValue(oData) ? lang.escapeHTML(oData.toString()) : "";
        }
    },

    /**
     * Formats links.
     *
     * @method DataTable.formatLink
     * @param el {HTMLElement} The element to format with markup.
     * @param oRecord {YAHOO.widget.Record} Record instance.
     * @param oColumn {YAHOO.widget.Column} Column instance.
     * @param oData {String} Data value for the cell, or null. Values are
     * HTML-escaped
     * @param oDataTable {YAHOO.widget.DataTable} DataTable instance.
     * @static
     */
    formatLink : function(el, oRecord, oColumn, oData, oDataTable) {
        if(lang.isString(oData)) {
            oData = lang.escapeHTML(oData);
            el.innerHTML = "<a href=\"" + oData + "\">" + oData + "</a>";
        }
        else {
            el.innerHTML = lang.isValue(oData) ? lang.escapeHTML(oData.toString()) : "";
        }
    },

    /**
     * Formats numbers.
     *
     * @method DataTable.formatNumber
     * @param el {HTMLElement} The element to format with markup.
     * @param oRecord {YAHOO.widget.Record} Record instance.
     * @param oColumn {YAHOO.widget.Column} Column instance.
     * @param oData {Object} Data value for the cell, or null.
     * @param oDataTable {YAHOO.widget.DataTable} DataTable instance.
     * @static
     */
    formatNumber : function(el, oRecord, oColumn, oData, oDataTable) {
        var oDT = oDataTable || this;
        el.innerHTML = util.Number.format(oData, oColumn.numberOptions || oDT.get("numberOptions"));
    },

    /**
     * Formats INPUT TYPE=RADIO elements.
     *
     * @method DataTable.formatRadio
     * @param el {HTMLElement} The element to format with markup.
     * @param oRecord {YAHOO.widget.Record} Record instance.
     * @param oColumn {YAHOO.widget.Column} Column instance.
     * @param oData {Object} (Optional) Data value for the cell.
     * @param oDataTable {YAHOO.widget.DataTable} DataTable instance.
     * @static
     */
    formatRadio : function(el, oRecord, oColumn, oData, oDataTable) {
        var oDT = oDataTable || this,
            bChecked = oData;
        bChecked = (bChecked) ? " checked=\"checked\"" : "";
        el.innerHTML = "<input type=\"radio\"" + bChecked +
                " name=\""+oDT.getId()+"-col-" + oColumn.getSanitizedKey() + "\"" +
                " class=\"" + DT.CLASS_RADIO+ "\" />";
    },

    /**
     * Formats text strings.
     *
     * @method DataTable.formatText
     * @param el {HTMLElement} The element to format with markup.
     * @param oRecord {YAHOO.widget.Record} Record instance.
     * @param oColumn {YAHOO.widget.Column} Column instance.
     * @param oData {String} (Optional) Data value for the cell. Values are
     * HTML-escaped.
     * @param oDataTable {YAHOO.widget.DataTable} DataTable instance.
     * @static
     */
    formatText : function(el, oRecord, oColumn, oData, oDataTable) {
        var value = (lang.isValue(oData)) ? oData : "";
        el.innerHTML = lang.escapeHTML(value.toString());
    },

    /**
     * Formats TEXTAREA elements.
     *
     * @method DataTable.formatTextarea
     * @param el {HTMLElement} The element to format with markup.
     * @param oRecord {YAHOO.widget.Record} Record instance.
     * @param oColumn {YAHOO.widget.Column} Column instance.
     * @param oData {Object} (Optional) Data value for the cell. Values are
     * HTML-escaped.
     * @param oDataTable {YAHOO.widget.DataTable} DataTable instance.
     * @static
     */
    formatTextarea : function(el, oRecord, oColumn, oData, oDataTable) {
        var value = (lang.isValue(oData)) ? lang.escapeHTML(oData.toString()) : "",
            markup = "<textarea>" + value + "</textarea>";
        el.innerHTML = markup;
    },

    /**
     * Formats INPUT TYPE=TEXT elements.
     *
     * @method DataTable.formatTextbox
     * @param el {HTMLElement} The element to format with markup.
     * @param oRecord {YAHOO.widget.Record} Record instance.
     * @param oColumn {YAHOO.widget.Column} Column instance.
     * @param oData {Object} (Optional) Data value for the cell. Values are
     * HTML-escaped.
     * @param oDataTable {YAHOO.widget.DataTable} DataTable instance.
     * @static
     */
    formatTextbox : function(el, oRecord, oColumn, oData, oDataTable) {
        var value = (lang.isValue(oData)) ? lang.escapeHTML(oData.toString()) : "",
            markup = "<input type=\"text\" value=\"" + value + "\" />";
        el.innerHTML = markup;
    },

    /**
     * Default cell formatter
     *
     * @method DataTable.formatDefault
     * @param el {HTMLElement} The element to format with markup.
     * @param oRecord {YAHOO.widget.Record} Record instance.
     * @param oColumn {YAHOO.widget.Column} Column instance.
     * @param oData {HTML} (Optional) Data value for the cell. String values are
     * treated as markup and inserted into the DOM with innerHTML.
     * @param oDataTable {YAHOO.widget.DataTable} DataTable instance.
     * @static
     */
    formatDefault : function(el, oRecord, oColumn, oData, oDataTable) {
        el.innerHTML = (lang.isValue(oData) && oData !== "") ? oData.toString() : "&#160;";
    },

    /**
     * Validates data value to type Number, doing type conversion as
     * necessary. A valid Number value is return, else null is returned
     * if input value does not validate.
     *
     *
     * @method DataTable.validateNumber
     * @param oData {Object} Data to validate.
     * @static
    */
    validateNumber : function(oData) {
        //Convert to number
        var number = oData * 1;

        // Validate
        if(lang.isNumber(number)) {
            return number;
        }
        else {
            return undefined;
        }
    }
});

// Done in separate step so referenced functions are defined.
/**
 * Registry of cell formatting functions, enables shortcut pointers in Column
 * definition formatter value (i.e., {key:"myColumn", formatter:"date"}).
 * @property DataTable.Formatter
 * @type Object
 * @static
 */
DT.Formatter = {
    button   : DT.formatButton,
    checkbox : DT.formatCheckbox,
    currency : DT.formatCurrency,
    "date"   : DT.formatDate,
    dropdown : DT.formatDropdown,
    email    : DT.formatEmail,
    link     : DT.formatLink,
    "number" : DT.formatNumber,
    radio    : DT.formatRadio,
    text     : DT.formatText,
    textarea : DT.formatTextarea,
    textbox  : DT.formatTextbox,

    defaultFormatter : DT.formatDefault
};

lang.extend(DT, util.Element, {

/////////////////////////////////////////////////////////////////////////////
//
// Superclass methods
//
/////////////////////////////////////////////////////////////////////////////

/**
 * Implementation of Element's abstract method. Sets up config values.
 *
 * @method initAttributes
 * @param oConfigs {Object} (Optional) Object literal definition of configuration values.
 * @private
 */

initAttributes : function(oConfigs) {
    oConfigs = oConfigs || {};
    DT.superclass.initAttributes.call(this, oConfigs);

    /**
    * @attribute summary
    * @description String value for the SUMMARY attribute.
    * @type String
    * @default ""    
    */
    this.setAttributeConfig("summary", {
        value: "",
        validator: lang.isString,
        method: function(sSummary) {
            if(this._elTable) {
                this._elTable.summary = sSummary;
            }
        }
    });

    /**
    * @attribute selectionMode
    * @description Specifies row or cell selection mode. Accepts the following strings:
    *    <dl>
    *      <dt>"standard"</dt>
    *      <dd>Standard row selection with support for modifier keys to enable
    *      multiple selections.</dd>
    *
    *      <dt>"single"</dt>
    *      <dd>Row selection with modifier keys disabled to not allow
    *      multiple selections.</dd>
    *
    *      <dt>"singlecell"</dt>
    *      <dd>Cell selection with modifier keys disabled to not allow
    *      multiple selections.</dd>
    *
    *      <dt>"cellblock"</dt>
    *      <dd>Cell selection with support for modifier keys to enable multiple
    *      selections in a block-fashion, like a spreadsheet.</dd>
    *
    *      <dt>"cellrange"</dt>
    *      <dd>Cell selection with support for modifier keys to enable multiple
    *      selections in a range-fashion, like a calendar.</dd>
    *    </dl>
    *
    * @default "standard"
    * @type String
    */
    this.setAttributeConfig("selectionMode", {
        value: "standard",
        validator: lang.isString
    });

    /**
    * @attribute sortedBy
    * @description Object literal provides metadata for initial sort values if
    * data will arrive pre-sorted:
    * <dl>
    *     <dt>sortedBy.key</dt>
    *     <dd>{String} Key of sorted Column</dd>
    *     <dt>sortedBy.dir</dt>
    *     <dd>{String} Initial sort direction, either YAHOO.widget.DataTable.CLASS_ASC or YAHOO.widget.DataTable.CLASS_DESC</dd>
    * </dl>
    * @type Object | null
    */
    this.setAttributeConfig("sortedBy", {
        value: null,
        // TODO: accepted array for nested sorts
        validator: function(oNewSortedBy) {
            if(oNewSortedBy) {
                return (lang.isObject(oNewSortedBy) && oNewSortedBy.key);
            }
            else {
                return (oNewSortedBy === null);
            }
        },
        method: function(oNewSortedBy) {
            // Stash the previous value
            var oOldSortedBy = this.get("sortedBy");
            
            // Workaround for bug 1827195
            this._configs.sortedBy.value = oNewSortedBy;

            // Remove ASC/DESC from TH
            var oOldColumn,
                nOldColumnKeyIndex,
                oNewColumn,
                nNewColumnKeyIndex;
                
            if(this._elThead) {
                if(oOldSortedBy && oOldSortedBy.key && oOldSortedBy.dir) {
                    oOldColumn = this._oColumnSet.getColumn(oOldSortedBy.key);
                    nOldColumnKeyIndex = oOldColumn.getKeyIndex();
                    
                    // Remove previous UI from THEAD
                    var elOldTh = oOldColumn.getThEl();
                    Dom.removeClass(elOldTh, oOldSortedBy.dir);
                    this.formatTheadCell(oOldColumn.getThLinerEl().firstChild, oOldColumn, oNewSortedBy);
                }
                if(oNewSortedBy) {
                    oNewColumn = (oNewSortedBy.column) ? oNewSortedBy.column : this._oColumnSet.getColumn(oNewSortedBy.key);
                    nNewColumnKeyIndex = oNewColumn.getKeyIndex();
    
                    // Update THEAD with new UI
                    var elNewTh = oNewColumn.getThEl();
                    // Backward compatibility
                    if(oNewSortedBy.dir && ((oNewSortedBy.dir == "asc") ||  (oNewSortedBy.dir == "desc"))) {
                        var newClass = (oNewSortedBy.dir == "desc") ?
                                DT.CLASS_DESC :
                                DT.CLASS_ASC;
                        Dom.addClass(elNewTh, newClass);
                    }
                    else {
                         var sortClass = oNewSortedBy.dir || DT.CLASS_ASC;
                         Dom.addClass(elNewTh, sortClass);
                    }
                    this.formatTheadCell(oNewColumn.getThLinerEl().firstChild, oNewColumn, oNewSortedBy);
                }
            }
          
            if(this._elTbody) {
                // Update TBODY UI
                this._elTbody.style.display = "none";
                var allRows = this._elTbody.rows,
                    allCells;
                for(var i=allRows.length-1; i>-1; i--) {
                    allCells = allRows[i].childNodes;
                    if(allCells[nOldColumnKeyIndex]) {
                        Dom.removeClass(allCells[nOldColumnKeyIndex], oOldSortedBy.dir);
                    }
                    if(allCells[nNewColumnKeyIndex]) {
                        Dom.addClass(allCells[nNewColumnKeyIndex], oNewSortedBy.dir);
                    }
                }
                this._elTbody.style.display = "";
            }
                
            this._clearTrTemplateEl();
        }
    });
    
    /**
    * @attribute paginator
    * @description An instance of YAHOO.widget.Paginator.
    * @default null
    * @type {Object|YAHOO.widget.Paginator}
    */
    this.setAttributeConfig("paginator", {
        value : null,
        validator : function (val) {
            return val === null || val instanceof widget.Paginator;
        },
        method : function () { this._updatePaginator.apply(this,arguments); }
    });

    /**
    * @attribute caption
    * @description Value for the CAPTION element. String values are treated as
    * markup and inserted into the DOM with innerHTML. NB: Not supported in
    * ScrollingDataTable.    
    * @type HTML
    */
    this.setAttributeConfig("caption", {
        value: null,
        validator: lang.isString,
        method: function(sCaption) {
            this._initCaptionEl(sCaption);
        }
    });

    /**
    * @attribute draggableColumns
    * @description True if Columns are draggable to reorder, false otherwise.
    * The Drag & Drop Utility is required to enable this feature. Only top-level
    * and non-nested Columns are draggable. Write once.
    * @default false
    * @type Boolean
    */
    this.setAttributeConfig("draggableColumns", {
        value: false,
        validator: lang.isBoolean,
        method: function(oParam) {
            if(this._elThead) {
                if(oParam) {
                    this._initDraggableColumns();
                }
                else {
                    this._destroyDraggableColumns();
                }
            }
        }
    });

    /**
    * @attribute renderLoopSize      
    * @description A value greater than 0 enables DOM rendering of rows to be
    * executed from a non-blocking timeout queue and sets how many rows to be
    * rendered per timeout. Recommended for very large data sets.     
    * @type Number      
    * @default 0      
    */      
     this.setAttributeConfig("renderLoopSize", {
         value: 0,
         validator: lang.isNumber
     });

    /**
    * @attribute sortFunction
    * @description Default Column sort function, receives the following args:
    *    <dl>
    *      <dt>a {Object}</dt>
    *      <dd>First sort argument.</dd>
    *      <dt>b {Object}</dt>
    *      <dd>Second sort argument.</dd>

    *      <dt>desc {Boolean}</dt>
    *      <dd>True if sort direction is descending, false if
    * sort direction is ascending.</dd>
    *      <dt>field {String}</dt>
    *      <dd>The field to sort by, from sortOptions.field</dd>
    *   </dl>
    * @type function
    */
    this.setAttributeConfig("sortFunction", {
        value: function(a, b, desc, field) {
            var compare = YAHOO.util.Sort.compare,
                sorted = compare(a.getData(field),b.getData(field), desc);
            if(sorted === 0) {
                return compare(a.getCount(),b.getCount(), desc); // Bug 1932978
            }
            else {
                return sorted;
            }
        }
    });

    /**
    * @attribute formatRow
    * @description A function that accepts a TR element and its associated Record
    * for custom formatting. The function must return TRUE in order to automatically
    * continue formatting of child TD elements, else TD elements will not be
    * automatically formatted.
    * @type function
    * @default null
    */
    this.setAttributeConfig("formatRow", {
        value: null,
        validator: lang.isFunction
    });

    /**
    * @attribute generateRequest
    * @description A function that converts an object literal of desired DataTable
    * states into a request value which is then passed to the DataSource's
    * sendRequest method in order to retrieve data for those states. This
    * function is passed an object literal of state data and a reference to the
    * DataTable instance:
    *     
    * <dl>
    *   <dt>pagination<dt>
    *   <dd>        
    *         <dt>offsetRecord</dt>
    *         <dd>{Number} Index of the first Record of the desired page</dd>
    *         <dt>rowsPerPage</dt>
    *         <dd>{Number} Number of rows per page</dd>
    *   </dd>
    *   <dt>sortedBy</dt>
    *   <dd>                
    *         <dt>key</dt>
    *         <dd>{String} Key of sorted Column</dd>
    *         <dt>dir</dt>
    *         <dd>{String} Sort direction, either YAHOO.widget.DataTable.CLASS_ASC or YAHOO.widget.DataTable.CLASS_DESC</dd>
    *   </dd>
    *   <dt>self</dt>
    *   <dd>The DataTable instance</dd>
    * </dl>
    * 
    * and by default returns a String of syntax:
    * "sort={sortColumn}&dir={sortDir}&startIndex={pageStartIndex}&results={rowsPerPage}"
    * @type function
    * @default HTMLFunction
    */
    this.setAttributeConfig("generateRequest", {
        value: function(oState, oSelf) {
            // Set defaults
            oState = oState || {pagination:null, sortedBy:null};
            var sort = encodeURIComponent((oState.sortedBy) ? oState.sortedBy.key : oSelf.getColumnSet().keys[0].getKey());
            var dir = (oState.sortedBy && oState.sortedBy.dir === YAHOO.widget.DataTable.CLASS_DESC) ? "desc" : "asc";
            var startIndex = (oState.pagination) ? oState.pagination.recordOffset : 0;
            var results = (oState.pagination) ? oState.pagination.rowsPerPage : null;
            
            // Build the request
            return  "sort=" + sort +
                    "&dir=" + dir +
                    "&startIndex=" + startIndex +
                    ((results !== null) ? "&results=" + results : "");
        },
        validator: lang.isFunction
    });

    /**
    * @attribute initialRequest
    * @description Defines the initial request that gets sent to the DataSource
    * during initialization. Value is ignored if initialLoad is set to any value
    * other than true.    
    * @type MIXED
    * @default null
    */
    this.setAttributeConfig("initialRequest", {
        value: null
    });

    /**
    * @attribute initialLoad
    * @description Determines whether or not to load data at instantiation. By
    * default, will trigger a sendRequest() to the DataSource and pass in the
    * request defined by initialRequest. If set to false, data will not load
    * at instantiation. Alternatively, implementers who wish to work with a 
    * custom payload may pass in an object literal with the following values:
    *     
    *    <dl>
    *      <dt>request (MIXED)</dt>
    *      <dd>Request value.</dd>
    *
    *      <dt>argument (MIXED)</dt>
    *      <dd>Custom data that will be passed through to the callback function.</dd>
    *    </dl>
    *
    *                    
    * @type Boolean | Object
    * @default true
    */
    this.setAttributeConfig("initialLoad", {
        value: true
    });
    
    /**
    * @attribute dynamicData
    * @description If true, sorting and pagination are relegated to the DataSource
    * for handling, using the request returned by the "generateRequest" function.
    * Each new DataSource response blows away all previous Records. False by default, so 
    * sorting and pagination will be handled directly on the client side, without
    * causing any new requests for data from the DataSource.
    * @type Boolean
    * @default false
    */
    this.setAttributeConfig("dynamicData", {
        value: false,
        validator: lang.isBoolean
    });

    /**
     * @attribute MSG_EMPTY
     * @description Message to display if DataTable has no data. String
     * values are treated as markup and inserted into the DOM with innerHTML.
     * @type HTML
     * @default "No records found."
     */
     this.setAttributeConfig("MSG_EMPTY", {
         value: "No records found.",
         validator: lang.isString
     });      

    /**
     * @attribute MSG_LOADING
     * @description Message to display while DataTable is loading data. String
     * values are treated as markup and inserted into the DOM with innerHTML.
     * @type HTML
     * @default "Loading..."
     */      
     this.setAttributeConfig("MSG_LOADING", {
         value: "Loading...",
         validator: lang.isString
     });      

    /**
     * @attribute MSG_ERROR
     * @description Message to display while DataTable has data error. String
     * values are treated as markup and inserted into the DOM with innerHTML.
     * @type HTML
     * @default "Data error."
     */      
     this.setAttributeConfig("MSG_ERROR", {
         value: "Data error.",
         validator: lang.isString
     });

    /**
     * @attribute MSG_SORTASC
     * @description Message to display in tooltip to sort Column in ascending
     * order. String values are treated as markup and inserted into the DOM as
     * innerHTML.
     * @type HTML
     * @default "Click to sort ascending"
     */      
     this.setAttributeConfig("MSG_SORTASC", {      
         value: "Click to sort ascending",      
         validator: lang.isString,
         method: function(sParam) {
            if(this._elThead) {
                for(var i=0, allKeys=this.getColumnSet().keys, len=allKeys.length; i<len; i++) {
                    if(allKeys[i].sortable && this.getColumnSortDir(allKeys[i]) === DT.CLASS_ASC) {
                        allKeys[i]._elThLabel.firstChild.title = sParam;
                    }
                }
            }      
         }
     });

    /**
     * @attribute MSG_SORTDESC
     * @description Message to display in tooltip to sort Column in descending
     * order. String values are treated as markup and inserted into the DOM as
     * innerHTML.
     * @type HTML
     * @default "Click to sort descending"
     */      
     this.setAttributeConfig("MSG_SORTDESC", {      
         value: "Click to sort descending",      
         validator: lang.isString,
         method: function(sParam) {
            if(this._elThead) {
                for(var i=0, allKeys=this.getColumnSet().keys, len=allKeys.length; i<len; i++) {
                    if(allKeys[i].sortable && this.getColumnSortDir(allKeys[i]) === DT.CLASS_DESC) {
                        allKeys[i]._elThLabel.firstChild.title = sParam;
                    }
                }
            }               
         }
     });
     
    /**
     * @attribute currencySymbol
     * @deprecated Use currencyOptions.
     */
    this.setAttributeConfig("currencySymbol", {
        value: "$",
        validator: lang.isString
    });
    
    /**
     * Default config passed to YAHOO.util.Number.format() by the 'currency' Column formatter.
     * @attribute currencyOptions
     * @type Object
     * @default {prefix: $, decimalPlaces:2, decimalSeparator:".", thousandsSeparator:","}
     */
    this.setAttributeConfig("currencyOptions", {
        value: {
            prefix: this.get("currencySymbol"), // TODO: deprecate currencySymbol
            decimalPlaces:2,
            decimalSeparator:".",
            thousandsSeparator:","
        }
    });
    
    /**
     * Default config passed to YAHOO.util.Date.format() by the 'date' Column formatter.
     * @attribute dateOptions
     * @type Object
     * @default {format:"%m/%d/%Y", locale:"en"}
     */
    this.setAttributeConfig("dateOptions", {
        value: {format:"%m/%d/%Y", locale:"en"}
    });
    
    /**
     * Default config passed to YAHOO.util.Number.format() by the 'number' Column formatter.
     * @attribute numberOptions
     * @type Object
     * @default {decimalPlaces:0, thousandsSeparator:","}
     */
    this.setAttributeConfig("numberOptions", {
        value: {
            decimalPlaces:0,
            thousandsSeparator:","
        }
    });

},

/////////////////////////////////////////////////////////////////////////////
//
// Private member variables
//
/////////////////////////////////////////////////////////////////////////////

/**
 * True if instance is initialized, so as to fire the initEvent after render.
 *
 * @property _bInit
 * @type Boolean
 * @default true
 * @private
 */
_bInit : true,

/**
 * Index assigned to instance.
 *
 * @property _nIndex
 * @type Number
 * @private
 */
_nIndex : null,

/**
 * Counter for IDs assigned to TR elements.
 *
 * @property _nTrCount
 * @type Number
 * @private
 */
_nTrCount : 0,

/**
 * Counter for IDs assigned to TD elements.
 *
 * @property _nTdCount
 * @type Number
 * @private
 */
_nTdCount : 0,

/**
 * Unique id assigned to instance "yui-dtN", useful prefix for generating unique
 * DOM ID strings and log messages.
 *
 * @property _sId
 * @type String
 * @private
 */
_sId : null,

/**
 * Render chain.
 *
 * @property _oChainRender
 * @type YAHOO.util.Chain
 * @private
 */
_oChainRender : null,

/**
 * DOM reference to the container element for the DataTable instance into which
 * all other elements get created.
 *
 * @property _elContainer
 * @type HTMLElement
 * @private
 */
_elContainer : null,

/**
 * DOM reference to the mask element for the DataTable instance which disables it.
 *
 * @property _elMask
 * @type HTMLElement
 * @private
 */
_elMask : null,

/**
 * DOM reference to the TABLE element for the DataTable instance.
 *
 * @property _elTable
 * @type HTMLElement
 * @private
 */
_elTable : null,

/**
 * DOM reference to the CAPTION element for the DataTable instance.
 *
 * @property _elCaption
 * @type HTMLElement
 * @private
 */
_elCaption : null,

/**
 * DOM reference to the COLGROUP element for the DataTable instance.
 *
 * @property _elColgroup
 * @type HTMLElement
 * @private
 */
_elColgroup : null,

/**
 * DOM reference to the THEAD element for the DataTable instance.
 *
 * @property _elThead
 * @type HTMLElement
 * @private
 */
_elThead : null,

/**
 * DOM reference to the primary TBODY element for the DataTable instance.
 *
 * @property _elTbody
 * @type HTMLElement
 * @private
 */
_elTbody : null,

/**
 * DOM reference to the secondary TBODY element used to display DataTable messages.
 *
 * @property _elMsgTbody
 * @type HTMLElement
 * @private
 */
_elMsgTbody : null,

/**
 * DOM reference to the secondary TBODY element's single TR element used to display DataTable messages.
 *
 * @property _elMsgTr
 * @type HTMLElement
 * @private
 */
_elMsgTr : null,

/**
 * DOM reference to the secondary TBODY element's single TD element used to display DataTable messages.
 *
 * @property _elMsgTd
 * @type HTMLElement
 * @private
 */
_elMsgTd : null,

/**
 * Element reference to shared Column drag target.
 *
 * @property _elColumnDragTarget
 * @type HTMLElement
 * @private
 */
_elColumnDragTarget : null,

/**
 * Element reference to shared Column resizer proxy.
 *
 * @property _elColumnResizerProxy
 * @type HTMLElement
 * @private
 */
_elColumnResizerProxy : null,

/**
 * DataSource instance for the DataTable instance.
 *
 * @property _oDataSource
 * @type YAHOO.util.DataSource
 * @private
 */
_oDataSource : null,

/**
 * ColumnSet instance for the DataTable instance.
 *
 * @property _oColumnSet
 * @type YAHOO.widget.ColumnSet
 * @private
 */
_oColumnSet : null,

/**
 * RecordSet instance for the DataTable instance.
 *
 * @property _oRecordSet
 * @type YAHOO.widget.RecordSet
 * @private
 */
_oRecordSet : null,

/**
 * The active CellEditor instance for the DataTable instance.
 *
 * @property _oCellEditor
 * @type YAHOO.widget.CellEditor
 * @private
 */
_oCellEditor : null,

/**
 * ID string of first TR element of the current DataTable page.
 *
 * @property _sFirstTrId
 * @type String
 * @private
 */
_sFirstTrId : null,

/**
 * ID string of the last TR element of the current DataTable page.
 *
 * @property _sLastTrId
 * @type String
 * @private
 */
_sLastTrId : null,

/**
 * Template row to create all new rows from.
 * @property _elTrTemplate
 * @type {HTMLElement}
 * @private 
 */
_elTrTemplate : null,

/**
 * Sparse array of custom functions to set column widths for browsers that don't
 * support dynamic CSS rules.  Functions are added at the index representing
 * the number of rows they update.
 *
 * @property _aDynFunctions
 * @type Array
 * @private
 */
_aDynFunctions : [],

/**
 * Disabled state.
 *
 * @property _disabled
 * @type Boolean
 * @private
 */
_disabled : false,




























/////////////////////////////////////////////////////////////////////////////
//
// Private methods
//
/////////////////////////////////////////////////////////////////////////////

/**
 * Clears browser text selection. Useful to call on rowSelectEvent or
 * cellSelectEvent to prevent clicks or dblclicks from selecting text in the
 * browser.
 *
 * @method clearTextSelection
 */
clearTextSelection : function() {
    var sel;
    if(window.getSelection) {
        sel = window.getSelection();
    }
    else if(document.getSelection) {
        sel = document.getSelection();
    }
    else if(document.selection) {
        sel = document.selection;
    }
    if(sel) {
        if(sel.empty) {
            sel.empty();
        }
        else if (sel.removeAllRanges) {
            sel.removeAllRanges();
        }
        else if(sel.collapse) {
            sel.collapse();
        }
    }
},

/**
 * Sets focus on the given element.
 *
 * @method _focusEl
 * @param el {HTMLElement} Element.
 * @private
 */
_focusEl : function(el) {
    el = el || this._elTbody;
    // http://developer.mozilla.org/en/docs/index.php?title=Key-navigable_custom_DHTML_widgets
    // The timeout is necessary in both IE and Firefox 1.5, to prevent scripts from doing
    // strange unexpected things as the user clicks on buttons and other controls.
    setTimeout(function() {
        try {
            el.focus();
        }
        catch(e) {
        }
    },0);
},

/**
 * Forces Gecko repaint.
 *
 * @method _repaintGecko
 * @el {HTMLElement} (Optional) Element to repaint, otherwise entire document body.
 * @private
 */
_repaintGecko : (ua.gecko) ? 
    function(el) {
        el = el || this._elContainer;
        var parent = el.parentNode;
        var nextSibling = el.nextSibling;
        parent.insertBefore(parent.removeChild(el), nextSibling);
    } : function() {},

/**
 * Forces Opera repaint.
 *
 * @method _repaintOpera
 * @private 
 */
_repaintOpera : (ua.opera) ? 
    function() {
        if(ua.opera) {
            document.documentElement.className += " ";
            document.documentElement.className = YAHOO.lang.trim(document.documentElement.className);
        }
    } : function() {} ,

/**
 * Forces Webkit repaint.
 *
 * @method _repaintWebkit
 * @el {HTMLElement} (Optional) Element to repaint, otherwise entire document body.
 * @private
 */
_repaintWebkit : (ua.webkit) ? 
    function(el) {
        el = el || this._elContainer;
        var parent = el.parentNode;
        var nextSibling = el.nextSibling;
        parent.insertBefore(parent.removeChild(el), nextSibling);
    } : function() {},






















// INIT FUNCTIONS

/**
 * Initializes object literal of config values.
 *
 * @method _initConfigs
 * @param oConfig {Object} Object literal of config values.
 * @private
 */
_initConfigs : function(oConfigs) {
    if(!oConfigs || !lang.isObject(oConfigs)) {
        oConfigs = {};
    }
    this.configs = oConfigs;
},

/**
 * Initializes ColumnSet.
 *
 * @method _initColumnSet
 * @param aColumnDefs {Object[]} Array of object literal Column definitions.
 * @private
 */
_initColumnSet : function(aColumnDefs) {
    var oColumn, i, len;
    
    if(this._oColumnSet) {
        // First clear _oDynStyles for existing ColumnSet and
        // uregister CellEditor Custom Events
        for(i=0, len=this._oColumnSet.keys.length; i<len; i++) {
            oColumn = this._oColumnSet.keys[i];
            DT._oDynStyles["."+this.getId()+"-col-"+oColumn.getSanitizedKey()+" ."+DT.CLASS_LINER] = undefined;
            if(oColumn.editor && oColumn.editor.unsubscribeAll) { // Backward compatibility
                oColumn.editor.unsubscribeAll();
            }
        }
        
        this._oColumnSet = null;
        this._clearTrTemplateEl();
    }
    
    if(lang.isArray(aColumnDefs)) {
        this._oColumnSet =  new YAHOO.widget.ColumnSet(aColumnDefs);
    }
    // Backward compatibility
    else if(aColumnDefs instanceof YAHOO.widget.ColumnSet) {
        this._oColumnSet =  aColumnDefs;
    }

    // Register CellEditor Custom Events
    var allKeys = this._oColumnSet.keys;
    for(i=0, len=allKeys.length; i<len; i++) {
        oColumn = allKeys[i];
        if(oColumn.editor && oColumn.editor.subscribe) { // Backward incompatibility
            oColumn.editor.subscribe("showEvent", this._onEditorShowEvent, this, true);
            oColumn.editor.subscribe("keydownEvent", this._onEditorKeydownEvent, this, true);
            oColumn.editor.subscribe("revertEvent", this._onEditorRevertEvent, this, true);
            oColumn.editor.subscribe("saveEvent", this._onEditorSaveEvent, this, true);
            oColumn.editor.subscribe("cancelEvent", this._onEditorCancelEvent, this, true);
            oColumn.editor.subscribe("blurEvent", this._onEditorBlurEvent, this, true);
            oColumn.editor.subscribe("blockEvent", this._onEditorBlockEvent, this, true);
            oColumn.editor.subscribe("unblockEvent", this._onEditorUnblockEvent, this, true);
        }
    }
},

/**
 * Initializes DataSource.
 *
 * @method _initDataSource
 * @param oDataSource {YAHOO.util.DataSource} DataSource instance.
 * @private
 */
_initDataSource : function(oDataSource) {
    this._oDataSource = null;
    if(oDataSource && (lang.isFunction(oDataSource.sendRequest))) {
        this._oDataSource = oDataSource;
    }
    // Backward compatibility
    else {
        var tmpTable = null;
        var tmpContainer = this._elContainer;
        var i=0;
        //TODO: this will break if re-initing DS at runtime for SDT
        // Peek in container child nodes to see if TABLE already exists
        if(tmpContainer.hasChildNodes()) {
            var tmpChildren = tmpContainer.childNodes;
            for(i=0; i<tmpChildren.length; i++) {
                if(tmpChildren[i].nodeName && tmpChildren[i].nodeName.toLowerCase() == "table") {
                    tmpTable = tmpChildren[i];
                    break;
                }
            }
            if(tmpTable) {
                var tmpFieldsArray = [];
                for(; i<this._oColumnSet.keys.length; i++) {
                    tmpFieldsArray.push({key:this._oColumnSet.keys[i].key});
                }

                this._oDataSource = new DS(tmpTable);
                this._oDataSource.responseType = DS.TYPE_HTMLTABLE;
                this._oDataSource.responseSchema = {fields: tmpFieldsArray};
            }
        }
    }
},

/**
 * Initializes RecordSet.
 *
 * @method _initRecordSet
 * @private
 */
_initRecordSet : function() {
    if(this._oRecordSet) {
        this._oRecordSet.reset();
    }
    else {
        this._oRecordSet = new YAHOO.widget.RecordSet();
    }
},

/**
 * Initializes DOM elements.
 *
 * @method _initDomElements
 * @param elContainer {HTMLElement | String} HTML DIV element by reference or ID. 
 * return {Boolean} False in case of error, otherwise true 
 * @private
 */
_initDomElements : function(elContainer) {
    // Outer container
    this._initContainerEl(elContainer);
    // TABLE
    this._initTableEl(this._elContainer);
    // COLGROUP
    this._initColgroupEl(this._elTable);
    // THEAD
    this._initTheadEl(this._elTable);
    
    // Message TBODY
    this._initMsgTbodyEl(this._elTable);  

    // Primary TBODY
    this._initTbodyEl(this._elTable);

    if(!this._elContainer || !this._elTable || !this._elColgroup ||  !this._elThead || !this._elTbody || !this._elMsgTbody) {
        return false;
    }
    else {
        return true;
    }
},

/**
 * Destroy's the DataTable outer container element, if available.
 *
 * @method _destroyContainerEl
 * @param elContainer {HTMLElement} Reference to the container element. 
 * @private
 */
_destroyContainerEl : function(elContainer) {
        var columns = this._oColumnSet.keys,
        elements, i;

        Dom.removeClass(elContainer, DT.CLASS_DATATABLE);

    // Bug 2528783
    Ev.purgeElement( elContainer );
    Ev.purgeElement( this._elThead, true ); // recursive to get resize handles
    Ev.purgeElement( this._elTbody );
    Ev.purgeElement( this._elMsgTbody );

    // because change doesn't bubble, each select (via formatDropdown) gets
    // its own subscription
    elements = elContainer.getElementsByTagName( 'select' );

    if ( elements.length ) {
        Ev.detachListener( elements, 'change' );
    }

    for ( i = columns.length - 1; i >= 0; --i ) {
        if ( columns[i].editor ) {
            Ev.purgeElement( columns[i].editor._elContainer );
        }
    }

    elContainer.innerHTML = "";
    
    this._elContainer = null;
    this._elColgroup = null;
    this._elThead = null;
    this._elTbody = null;
},

/**
 * Initializes the DataTable outer container element, including a mask.
 *
 * @method _initContainerEl
 * @param elContainer {HTMLElement | String} HTML DIV element by reference or ID.
 * @private
 */
_initContainerEl : function(elContainer) {
    // Validate container
    elContainer = Dom.get(elContainer);
    
    if(elContainer && elContainer.nodeName && (elContainer.nodeName.toLowerCase() == "div")) {
        // Destroy previous
        this._destroyContainerEl(elContainer);

        Dom.addClass(elContainer, DT.CLASS_DATATABLE);
        Ev.addListener(elContainer, "focus", this._onTableFocus, this);
        Ev.addListener(elContainer, "dblclick", this._onTableDblclick, this);
        this._elContainer = elContainer;
        
        var elMask = document.createElement("div");
        elMask.className = DT.CLASS_MASK;
        elMask.style.display = "none";
        this._elMask = elContainer.appendChild(elMask);
    }
},

/**
 * Destroy's the DataTable TABLE element, if available.
 *
 * @method _destroyTableEl
 * @private
 */
_destroyTableEl : function() {
    var elTable = this._elTable;
    if(elTable) {
        Ev.purgeElement(elTable, true);
        elTable.parentNode.removeChild(elTable);
        this._elCaption = null;
        this._elColgroup = null;
        this._elThead = null;
        this._elTbody = null;
    }
},

/**
 * Creates HTML markup CAPTION element.
 *
 * @method _initCaptionEl
 * @param sCaption {HTML} Caption value. String values are treated as markup and
 * inserted into the DOM with innerHTML.
 * @private
 */
_initCaptionEl : function(sCaption) {
    if(this._elTable && sCaption) {
        // Create CAPTION element
        if(!this._elCaption) { 
            this._elCaption = this._elTable.createCaption();
        }
        // Set CAPTION value
        this._elCaption.innerHTML = sCaption;
    }
    else if(this._elCaption) {
        this._elCaption.parentNode.removeChild(this._elCaption);
    }
},

/**
 * Creates HTML markup for TABLE, COLGROUP, THEAD and TBODY elements in outer
 * container element.
 *
 * @method _initTableEl
 * @param elContainer {HTMLElement} Container element into which to create TABLE.
 * @private
 */
_initTableEl : function(elContainer) {
    if(elContainer) {
        // Destroy previous
        this._destroyTableEl();
    
        // Create TABLE
        this._elTable = elContainer.appendChild(document.createElement("table"));  
         
        // Set SUMMARY attribute
        this._elTable.summary = this.get("summary");
        
        // Create CAPTION element
        if(this.get("caption")) {
            this._initCaptionEl(this.get("caption"));
        }

        // Set up mouseover/mouseout events via mouseenter/mouseleave delegation
        Ev.delegate(this._elTable, "mouseenter", this._onTableMouseover, "thead ."+DT.CLASS_LABEL, this);
        Ev.delegate(this._elTable, "mouseleave", this._onTableMouseout, "thead ."+DT.CLASS_LABEL, this);
        Ev.delegate(this._elTable, "mouseenter", this._onTableMouseover, "tbody.yui-dt-data>tr>td", this);
        Ev.delegate(this._elTable, "mouseleave", this._onTableMouseout, "tbody.yui-dt-data>tr>td", this);
        Ev.delegate(this._elTable, "mouseenter", this._onTableMouseover, "tbody.yui-dt-message>tr>td", this);
        Ev.delegate(this._elTable, "mouseleave", this._onTableMouseout, "tbody.yui-dt-message>tr>td", this);
    }
},

/**
 * Destroy's the DataTable COLGROUP element, if available.
 *
 * @method _destroyColgroupEl
 * @private
 */
_destroyColgroupEl : function() {
    var elColgroup = this._elColgroup;
    if(elColgroup) {
        var elTable = elColgroup.parentNode;
        Ev.purgeElement(elColgroup, true);
        elTable.removeChild(elColgroup);
        this._elColgroup = null;
    }
},

/**
 * Initializes COLGROUP and COL elements for managing minWidth.
 *
 * @method _initColgroupEl
 * @param elTable {HTMLElement} TABLE element into which to create COLGROUP.
 * @private
 */
_initColgroupEl : function(elTable) {
    if(elTable) {
        // Destroy previous
        this._destroyColgroupEl();

        // Add COLs to DOCUMENT FRAGMENT
        var allCols = this._aColIds || [],
            allKeys = this._oColumnSet.keys,
            i = 0, len = allCols.length,
            elCol, oColumn,
            elFragment = document.createDocumentFragment(),
            elColTemplate = document.createElement("col");
    
        for(i=0,len=allKeys.length; i<len; i++) {
            oColumn = allKeys[i];
            elCol = elFragment.appendChild(elColTemplate.cloneNode(false));
        }
    
        // Create COLGROUP
        var elColgroup = elTable.insertBefore(document.createElement("colgroup"), elTable.firstChild);
        elColgroup.appendChild(elFragment);
        this._elColgroup = elColgroup;
    }
},

/**
 * Adds a COL element to COLGROUP at given index.
 *
 * @method _insertColgroupColEl
 * @param index {Number} Index of new COL element.
 * @private
 */
_insertColgroupColEl : function(index) {
    if(lang.isNumber(index)&& this._elColgroup) {
        var nextSibling = this._elColgroup.childNodes[index] || null;
        this._elColgroup.insertBefore(document.createElement("col"), nextSibling);
    }
},

/**
 * Removes a COL element to COLGROUP at given index.
 *
 * @method _removeColgroupColEl
 * @param index {Number} Index of removed COL element.
 * @private
 */
_removeColgroupColEl : function(index) {
    if(lang.isNumber(index) && this._elColgroup && this._elColgroup.childNodes[index]) {
        this._elColgroup.removeChild(this._elColgroup.childNodes[index]);
    }
},

/**
 * Reorders a COL element from old index(es) to new index.
 *
 * @method _reorderColgroupColEl
 * @param aKeyIndexes {Number[]} Array of indexes of removed COL element.
 * @param newIndex {Number} New index. 
 * @private
 */
_reorderColgroupColEl : function(aKeyIndexes, newIndex) {
    if(lang.isArray(aKeyIndexes) && lang.isNumber(newIndex) && this._elColgroup && (this._elColgroup.childNodes.length > aKeyIndexes[aKeyIndexes.length-1])) {
        var i,
            tmpCols = [];
        // Remove COL
        for(i=aKeyIndexes.length-1; i>-1; i--) {
            tmpCols.push(this._elColgroup.removeChild(this._elColgroup.childNodes[aKeyIndexes[i]]));
        }
        // Insert COL
        var nextSibling = this._elColgroup.childNodes[newIndex] || null;
        for(i=tmpCols.length-1; i>-1; i--) {
            this._elColgroup.insertBefore(tmpCols[i], nextSibling);
        }
    }
},

/**
 * Destroy's the DataTable THEAD element, if available.
 *
 * @method _destroyTheadEl
 * @private
 */
_destroyTheadEl : function() {
    var elThead = this._elThead;
    if(elThead) {
        var elTable = elThead.parentNode;
        Ev.purgeElement(elThead, true);
        this._destroyColumnHelpers();
        elTable.removeChild(elThead);
        this._elThead = null;
    }
},

/**
 * Initializes THEAD element.
 *
 * @method _initTheadEl
 * @param elTable {HTMLElement} TABLE element into which to create COLGROUP.
 * @param {HTMLElement} Initialized THEAD element. 
 * @private
 */
_initTheadEl : function(elTable) {
    elTable = elTable || this._elTable;
    
    if(elTable) {
        // Destroy previous
        this._destroyTheadEl();
    
        //TODO: append to DOM later for performance
        var elThead = (this._elColgroup) ?
            elTable.insertBefore(document.createElement("thead"), this._elColgroup.nextSibling) :
            elTable.appendChild(document.createElement("thead"));
    
        // Set up DOM events for THEAD
        Ev.addListener(elThead, "focus", this._onTheadFocus, this);
        Ev.addListener(elThead, "keydown", this._onTheadKeydown, this);
        Ev.addListener(elThead, "mousedown", this._onTableMousedown, this);
        Ev.addListener(elThead, "mouseup", this._onTableMouseup, this);
        Ev.addListener(elThead, "click", this._onTheadClick, this);
        
        // Bug 2528073: mouseover/mouseout handled via mouseenter/mouseleave
        // delegation at the TABLE level

        // Since we can't listen for click and dblclick on the same element...
        // Attach separately to THEAD and TBODY
        ///Ev.addListener(elThead, "dblclick", this._onTableDblclick, this);
        
       var oColumnSet = this._oColumnSet,
            oColumn, i,j, l;
        
        // Add TRs to the THEAD
        var colTree = oColumnSet.tree;
        var elTh;
        for(i=0; i<colTree.length; i++) {
            var elTheadTr = elThead.appendChild(document.createElement("tr"));
    
            // ...and create TH cells
            for(j=0; j<colTree[i].length; j++) {
                oColumn = colTree[i][j];
                elTh = elTheadTr.appendChild(document.createElement("th"));
                this._initThEl(elTh,oColumn);
            }
    
                // Set FIRST/LAST on THEAD rows
                if(i === 0) {
                    Dom.addClass(elTheadTr, DT.CLASS_FIRST);
                }
                if(i === (colTree.length-1)) {
                    Dom.addClass(elTheadTr, DT.CLASS_LAST);
                }

        }

        // Set FIRST/LAST on edge TH elements using the values in ColumnSet headers array
        var aFirstHeaders = oColumnSet.headers[0] || [];
        for(i=0; i<aFirstHeaders.length; i++) {
            Dom.addClass(Dom.get(this.getId() +"-th-"+aFirstHeaders[i]), DT.CLASS_FIRST);
        }
        var aLastHeaders = oColumnSet.headers[oColumnSet.headers.length-1] || [];
        for(i=0; i<aLastHeaders.length; i++) {
            Dom.addClass(Dom.get(this.getId() +"-th-"+aLastHeaders[i]), DT.CLASS_LAST);
        }
        

        ///TODO: try _repaintGecko(this._elContainer) instead
        // Bug 1806891
        if(ua.webkit && ua.webkit < 420) {
            var oSelf = this;
            setTimeout(function() {
                elThead.style.display = "";
            },0);
            elThead.style.display = 'none';
        }
        
        this._elThead = elThead;
        
        // Column helpers needs _elThead to exist
        this._initColumnHelpers();  
    }
},

/**
 * Populates TH element as defined by Column.
 *
 * @method _initThEl
 * @param elTh {HTMLElement} TH element reference.
 * @param oColumn {YAHOO.widget.Column} Column object.
 * @private
 */
_initThEl : function(elTh, oColumn) {
    elTh.id = this.getId() + "-th-" + oColumn.getSanitizedKey(); // Needed for accessibility, getColumn by TH, and ColumnDD
    elTh.innerHTML = "";
    elTh.rowSpan = oColumn.getRowspan();
    elTh.colSpan = oColumn.getColspan();
    oColumn._elTh = elTh;
    
    var elThLiner = elTh.appendChild(document.createElement("div"));
    elThLiner.id = elTh.id + "-liner"; // Needed for resizer
    elThLiner.className = DT.CLASS_LINER;
    oColumn._elThLiner = elThLiner;
    
    var elThLabel = elThLiner.appendChild(document.createElement("span"));
    elThLabel.className = DT.CLASS_LABEL;    

    // Assign abbr attribute
    if(oColumn.abbr) {
        elTh.abbr = oColumn.abbr;
    }
    // Clear minWidth on hidden Columns
    if(oColumn.hidden) {
        this._clearMinWidth(oColumn);
    }
        
    elTh.className = this._getColumnClassNames(oColumn);
            
    // Set Column width...
    if(oColumn.width) {
        // Validate minWidth
        var nWidth = (oColumn.minWidth && (oColumn.width < oColumn.minWidth)) ?
                oColumn.minWidth : oColumn.width;
        // ...for fallback cases
        if(DT._bDynStylesFallback) {
            elTh.firstChild.style.overflow = 'hidden';
            elTh.firstChild.style.width = nWidth + 'px';        
        }
        // ...for non fallback cases
        else {
            this._setColumnWidthDynStyles(oColumn, nWidth + 'px', 'hidden');
        }
    }

    this.formatTheadCell(elThLabel, oColumn, this.get("sortedBy"));
    oColumn._elThLabel = elThLabel;
},

/**
 * Outputs markup into the given TH based on given Column.
 *
 * @method formatTheadCell
 * @param elCellLabel {HTMLElement} The label SPAN element within the TH liner,
 * not the liner DIV element.     
 * @param oColumn {YAHOO.widget.Column} Column instance.
 * @param oSortedBy {Object} Sort state object literal.
*/
formatTheadCell : function(elCellLabel, oColumn, oSortedBy) {
    var sKey = oColumn.getKey();
    var sLabel = lang.isValue(oColumn.label) ? oColumn.label : sKey;

    // Add accessibility link for sortable Columns
    if(oColumn.sortable) {
        // Calculate the direction
        var sSortClass = this.getColumnSortDir(oColumn, oSortedBy);
        var bDesc = (sSortClass === DT.CLASS_DESC);

        // This is the sorted Column
        if(oSortedBy && (oColumn.key === oSortedBy.key)) {
            bDesc = !(oSortedBy.dir === DT.CLASS_DESC);
        }

        // Generate a unique HREF for visited status
        var sHref = this.getId() + "-href-" + oColumn.getSanitizedKey();
        
        // Generate a dynamic TITLE for sort status
        var sTitle = (bDesc) ? this.get("MSG_SORTDESC") : this.get("MSG_SORTASC");
        
        // Format the element
        elCellLabel.innerHTML = "<a href=\"" + sHref + "\" title=\"" + sTitle + "\" class=\"" + DT.CLASS_SORTABLE + "\">" + sLabel + "</a>";
    }
    // Just display the label for non-sortable Columns
    else {
        elCellLabel.innerHTML = sLabel;
    }
},

/**
 * Disables DD from top-level Column TH elements.
 *
 * @method _destroyDraggableColumns
 * @private
 */
_destroyDraggableColumns : function() {
    var oColumn, elTh;
    for(var i=0, len=this._oColumnSet.tree[0].length; i<len; i++) {
        oColumn = this._oColumnSet.tree[0][i];
        if(oColumn._dd) {
            oColumn._dd = oColumn._dd.unreg();
            Dom.removeClass(oColumn.getThEl(), DT.CLASS_DRAGGABLE);       
        }
    }
    
    // Destroy column drag proxy
    this._destroyColumnDragTargetEl();
},

/**
 * Initializes top-level Column TH elements into DD instances.
 *
 * @method _initDraggableColumns
 * @private
 */
_initDraggableColumns : function() {
    this._destroyDraggableColumns();
    if(util.DD) {
        var oColumn, elTh, elDragTarget;
        for(var i=0, len=this._oColumnSet.tree[0].length; i<len; i++) {
            oColumn = this._oColumnSet.tree[0][i];
            elTh = oColumn.getThEl();
            Dom.addClass(elTh, DT.CLASS_DRAGGABLE);
            elDragTarget = this._initColumnDragTargetEl();
            oColumn._dd = new YAHOO.widget.ColumnDD(this, oColumn, elTh, elDragTarget);
        }
    }
    else {
    }
},

/**
 * Destroys shared Column drag target.
 *
 * @method _destroyColumnDragTargetEl
 * @private
 */
_destroyColumnDragTargetEl : function() {
    if(this._elColumnDragTarget) {
        var el = this._elColumnDragTarget;
        YAHOO.util.Event.purgeElement(el);
        el.parentNode.removeChild(el);
        this._elColumnDragTarget = null;
    }
},

/**
 * Creates HTML markup for shared Column drag target.
 *
 * @method _initColumnDragTargetEl
 * @return {HTMLElement} Reference to Column drag target.
 * @private
 */
_initColumnDragTargetEl : function() {
    if(!this._elColumnDragTarget) {
        // Attach Column drag target element as first child of body
        var elColumnDragTarget = document.createElement('div');
        elColumnDragTarget.id = this.getId() + "-coltarget";
        elColumnDragTarget.className = DT.CLASS_COLTARGET;
        elColumnDragTarget.style.display = "none";
        document.body.insertBefore(elColumnDragTarget, document.body.firstChild);

        // Internal tracker of Column drag target
        this._elColumnDragTarget = elColumnDragTarget;

    }
    return this._elColumnDragTarget;
},

/**
 * Disables resizeability on key Column TH elements.
 *
 * @method _destroyResizeableColumns
 * @private
 */
_destroyResizeableColumns : function() {
    var aKeys = this._oColumnSet.keys;
    for(var i=0, len=aKeys.length; i<len; i++) {
        if(aKeys[i]._ddResizer) {
            aKeys[i]._ddResizer = aKeys[i]._ddResizer.unreg();
            Dom.removeClass(aKeys[i].getThEl(), DT.CLASS_RESIZEABLE);
        }
    }

    // Destroy resizer proxy
    this._destroyColumnResizerProxyEl();
},

/**
 * Initializes resizeability on key Column TH elements.
 *
 * @method _initResizeableColumns
 * @private
 */
_initResizeableColumns : function() {
    this._destroyResizeableColumns();
    if(util.DD) {
        var oColumn, elTh, elThLiner, elThResizerLiner, elThResizer, elResizerProxy, cancelClick;
        for(var i=0, len=this._oColumnSet.keys.length; i<len; i++) {
            oColumn = this._oColumnSet.keys[i];
            if(oColumn.resizeable) {
                elTh = oColumn.getThEl();
                Dom.addClass(elTh, DT.CLASS_RESIZEABLE);
                elThLiner = oColumn.getThLinerEl();
                
                // Bug 1915349: So resizer is as tall as TH when rowspan > 1
                // Create a separate resizer liner with position:relative
                elThResizerLiner = elTh.appendChild(document.createElement("div"));
                elThResizerLiner.className = DT.CLASS_RESIZERLINER;
                
                // Move TH contents into the new resizer liner
                elThResizerLiner.appendChild(elThLiner);
                
                // Create the resizer
                elThResizer = elThResizerLiner.appendChild(document.createElement("div"));
                elThResizer.id = elTh.id + "-resizer"; // Needed for ColumnResizer
                elThResizer.className = DT.CLASS_RESIZER;
                oColumn._elResizer = elThResizer;

                // Create the resizer proxy, once per instance
                elResizerProxy = this._initColumnResizerProxyEl();
                oColumn._ddResizer = new YAHOO.util.ColumnResizer(
                        this, oColumn, elTh, elThResizer, elResizerProxy);
                cancelClick = function(e) {
                    Ev.stopPropagation(e);
                };
                Ev.addListener(elThResizer,"click",cancelClick);
            }
        }
    }
    else {
    }
},

/**
 * Destroys shared Column resizer proxy.
 *
 * @method _destroyColumnResizerProxyEl
 * @return {HTMLElement} Reference to Column resizer proxy.
 * @private
 */
_destroyColumnResizerProxyEl : function() {
    if(this._elColumnResizerProxy) {
        var el = this._elColumnResizerProxy;
        YAHOO.util.Event.purgeElement(el);
        el.parentNode.removeChild(el);
        this._elColumnResizerProxy = null;
    }
},

/**
 * Creates HTML markup for shared Column resizer proxy.
 *
 * @method _initColumnResizerProxyEl
 * @return {HTMLElement} Reference to Column resizer proxy.
 * @private
 */
_initColumnResizerProxyEl : function() {
    if(!this._elColumnResizerProxy) {
        // Attach Column resizer element as first child of body
        var elColumnResizerProxy = document.createElement("div");
        elColumnResizerProxy.id = this.getId() + "-colresizerproxy"; // Needed for ColumnResizer
        elColumnResizerProxy.className = DT.CLASS_RESIZERPROXY;
        document.body.insertBefore(elColumnResizerProxy, document.body.firstChild);

        // Internal tracker of Column resizer proxy
        this._elColumnResizerProxy = elColumnResizerProxy;
    }
    return this._elColumnResizerProxy;
},

/**
 * Destroys elements associated with Column functionality: ColumnDD and ColumnResizers.
 *
 * @method _destroyColumnHelpers
 * @private
 */
_destroyColumnHelpers : function() {
    this._destroyDraggableColumns();
    this._destroyResizeableColumns();
},

/**
 * Initializes elements associated with Column functionality: ColumnDD and ColumnResizers.
 *
 * @method _initColumnHelpers
 * @private
 */
_initColumnHelpers : function() {
    if(this.get("draggableColumns")) {
        this._initDraggableColumns();
    }
    this._initResizeableColumns();
},

/**
 * Destroy's the DataTable TBODY element, if available.
 *
 * @method _destroyTbodyEl
 * @private
 */
_destroyTbodyEl : function() {
    var elTbody = this._elTbody;
    if(elTbody) {
        var elTable = elTbody.parentNode;
        Ev.purgeElement(elTbody, true);
        elTable.removeChild(elTbody);
        this._elTbody = null;
    }
},

/**
 * Initializes TBODY element for data.
 *
 * @method _initTbodyEl
 * @param elTable {HTMLElement} TABLE element into which to create TBODY .
 * @private
 */
_initTbodyEl : function(elTable) {
    if(elTable) {
        // Destroy previous
        this._destroyTbodyEl();
        
        // Create TBODY
        var elTbody = elTable.appendChild(document.createElement("tbody"));
        elTbody.tabIndex = 0;
        elTbody.className = DT.CLASS_DATA;
    
        // Set up DOM events for TBODY
        Ev.addListener(elTbody, "focus", this._onTbodyFocus, this);
        Ev.addListener(elTbody, "mousedown", this._onTableMousedown, this);
        Ev.addListener(elTbody, "mouseup", this._onTableMouseup, this);
        Ev.addListener(elTbody, "keydown", this._onTbodyKeydown, this);
        Ev.addListener(elTbody, "click", this._onTbodyClick, this);

        // Bug 2528073: mouseover/mouseout handled via mouseenter/mouseleave
        // delegation at the TABLE level

        // Since we can't listen for click and dblclick on the same element...
        // Attach separately to THEAD and TBODY
        ///Ev.addListener(elTbody, "dblclick", this._onTableDblclick, this);
        
    
        // IE puts focus outline in the wrong place
        if(ua.ie) {
            elTbody.hideFocus=true;
        }

        this._elTbody = elTbody;
    }
},

/**
 * Destroy's the DataTable message TBODY element, if available.
 *
 * @method _destroyMsgTbodyEl
 * @private
 */
_destroyMsgTbodyEl : function() {
    var elMsgTbody = this._elMsgTbody;
    if(elMsgTbody) {
        var elTable = elMsgTbody.parentNode;
        Ev.purgeElement(elMsgTbody, true);
        elTable.removeChild(elMsgTbody);
        this._elTbody = null;
    }
},

/**
 * Initializes TBODY element for messaging.
 *
 * @method _initMsgTbodyEl
 * @param elTable {HTMLElement} TABLE element into which to create TBODY 
 * @private
 */
_initMsgTbodyEl : function(elTable) {
    if(elTable) {
        var elMsgTbody = document.createElement("tbody");
        elMsgTbody.className = DT.CLASS_MESSAGE;
        var elMsgTr = elMsgTbody.appendChild(document.createElement("tr"));
        elMsgTr.className = DT.CLASS_FIRST + " " + DT.CLASS_LAST;
        this._elMsgTr = elMsgTr;
        var elMsgTd = elMsgTr.appendChild(document.createElement("td"));
        elMsgTd.colSpan = this._oColumnSet.keys.length || 1;
        elMsgTd.className = DT.CLASS_FIRST + " " + DT.CLASS_LAST;
        this._elMsgTd = elMsgTd;
        elMsgTbody = elTable.insertBefore(elMsgTbody, this._elTbody);
        var elMsgLiner = elMsgTd.appendChild(document.createElement("div"));
        elMsgLiner.className = DT.CLASS_LINER;
        this._elMsgTbody = elMsgTbody;

        // Set up DOM events for TBODY
        Ev.addListener(elMsgTbody, "focus", this._onTbodyFocus, this);
        Ev.addListener(elMsgTbody, "mousedown", this._onTableMousedown, this);
        Ev.addListener(elMsgTbody, "mouseup", this._onTableMouseup, this);
        Ev.addListener(elMsgTbody, "keydown", this._onTbodyKeydown, this);
        Ev.addListener(elMsgTbody, "click", this._onTbodyClick, this);

        // Bug 2528073: mouseover/mouseout handled via mouseenter/mouseleave
        // delegation at the TABLE level
    }
},

/**
 * Initialize internal event listeners
 *
 * @method _initEvents
 * @private
 */
_initEvents : function () {
    // Initialize Column sort
    this._initColumnSort();
        
    // Add the document level click listener
    YAHOO.util.Event.addListener(document, "click", this._onDocumentClick, this);

    // Paginator integration
    this.subscribe("paginatorChange",function () {
        this._handlePaginatorChange.apply(this,arguments);
    });

    this.subscribe("initEvent",function () {
        this.renderPaginator();
    });

    // Initialize CellEditor integration
    this._initCellEditing();
},

/**      
  * Initializes Column sorting.      
  *      
  * @method _initColumnSort      
  * @private      
  */      
_initColumnSort : function() {
    this.subscribe("theadCellClickEvent", this.onEventSortColumn);      

    // Backward compatibility
    var oSortedBy = this.get("sortedBy");
    if(oSortedBy) {
        if(oSortedBy.dir == "desc") {
            this._configs.sortedBy.value.dir = DT.CLASS_DESC;
        }
        else if(oSortedBy.dir == "asc") {
            this._configs.sortedBy.value.dir = DT.CLASS_ASC;
        }
    }
},

/**      
  * Initializes CellEditor integration.      
  *      
  * @method _initCellEditing      
  * @private      
  */      
_initCellEditing : function() {
    this.subscribe("editorBlurEvent",function () {
        this.onEditorBlurEvent.apply(this,arguments);
    });
    this.subscribe("editorBlockEvent",function () {
        this.onEditorBlockEvent.apply(this,arguments);
    });
    this.subscribe("editorUnblockEvent",function () {
        this.onEditorUnblockEvent.apply(this,arguments);
    });
},

































// DOM MUTATION FUNCTIONS

/**
 * Retruns classnames to represent current Column states.
 * @method _getColumnClassnames 
 * @param oColumn {YAHOO.widget.Column} Column instance.
 * @param aAddClasses {String[]} An array of additional classnames to add to the
 * return value.  
 * @return {String} A String of classnames to be assigned to TH or TD elements
 * for given Column.  
 * @private 
 */
_getColumnClassNames : function (oColumn, aAddClasses) {
    var allClasses;
    
    // Add CSS classes
    if(lang.isString(oColumn.className)) {
        // Single custom class
        allClasses = [oColumn.className];
    }
    else if(lang.isArray(oColumn.className)) {
        // Array of custom classes
        allClasses = oColumn.className;
    }
    else {
        // no custom classes
        allClasses = [];
    }
    
    // Hook for setting width with via dynamic style uses key since ID is too disposable
    allClasses[allClasses.length] = this.getId() + "-col-" +oColumn.getSanitizedKey();

    // Column key - minus any chars other than "A-Z", "a-z", "0-9", "_", "-", ".", or ":"
    allClasses[allClasses.length] = "yui-dt-col-" +oColumn.getSanitizedKey();

    var isSortedBy = this.get("sortedBy") || {};
    // Sorted
    if(oColumn.key === isSortedBy.key) {
        allClasses[allClasses.length] = isSortedBy.dir || '';
    }
    // Hidden
    if(oColumn.hidden) {
        allClasses[allClasses.length] = DT.CLASS_HIDDEN;
    }
    // Selected
    if(oColumn.selected) {
        allClasses[allClasses.length] = DT.CLASS_SELECTED;
    }
    // Sortable
    if(oColumn.sortable) {
        allClasses[allClasses.length] = DT.CLASS_SORTABLE;
    }
    // Resizeable
    if(oColumn.resizeable) {
        allClasses[allClasses.length] = DT.CLASS_RESIZEABLE;
    }
    // Editable
    if(oColumn.editor) {
        allClasses[allClasses.length] = DT.CLASS_EDITABLE;
    }
    
    // Addtnl classes, including First/Last
    if(aAddClasses) {
        allClasses = allClasses.concat(aAddClasses);
    }
    
    return allClasses.join(' ');  
},

/**
 * Clears TR element template in response to any Column state change.
 * @method _clearTrTemplateEl
 * @private 
 */
_clearTrTemplateEl : function () {
    this._elTrTemplate = null;
},

/**
 * Returns a new TR element template with TD elements classed with current
 * Column states.
 * @method _getTrTemplateEl 
 * @return {HTMLElement} A TR element to be cloned and added to the DOM.
 * @private 
 */
_getTrTemplateEl : function (oRecord, index) {
    // Template is already available
    if(this._elTrTemplate) {
        return this._elTrTemplate;
    }
    // Template needs to be created
    else {
        var d   = document,
            tr  = d.createElement('tr'),
            td  = d.createElement('td'),
            div = d.createElement('div');
    
        // Append the liner element
        td.appendChild(div);

        // Create TD elements into DOCUMENT FRAGMENT
        var df = document.createDocumentFragment(),
            allKeys = this._oColumnSet.keys,
            elTd;

        // Set state for each TD;
        var aAddClasses;
        for(var i=0, keysLen=allKeys.length; i<keysLen; i++) {
            // Clone the TD template
            elTd = td.cloneNode(true);

            // Format the base TD
            elTd = this._formatTdEl(allKeys[i], elTd, i, (i===keysLen-1));
                        
            df.appendChild(elTd);
        }
        tr.appendChild(df);
        tr.className = DT.CLASS_REC;
        this._elTrTemplate = tr;
        return tr;
    }   
},

/**
 * Formats a basic TD element.
 * @method _formatTdEl 
 * @param oColumn {YAHOO.widget.Column} Associated Column instance. 
 * @param elTd {HTMLElement} An unformatted TD element.
 * @param index {Number} Column key index. 
 * @param isLast {Boolean} True if Column is last key of the ColumnSet.
 * @return {HTMLElement} A formatted TD element.
 * @private 
 */
_formatTdEl : function (oColumn, elTd, index, isLast) {
    var oColumnSet = this._oColumnSet;
    
    // Set the TD's accessibility headers
    var allHeaders = oColumnSet.headers,
        allColHeaders = allHeaders[index],
        sTdHeaders = "",
        sHeader;
    for(var j=0, headersLen=allColHeaders.length; j < headersLen; j++) {
        sHeader = this._sId + "-th-" + allColHeaders[j] + ' ';
        sTdHeaders += sHeader;
    }
    elTd.headers = sTdHeaders;
    
    // Class the TD element
    var aAddClasses = [];
    if(index === 0) {
        aAddClasses[aAddClasses.length] = DT.CLASS_FIRST;
    }
    if(isLast) {
        aAddClasses[aAddClasses.length] = DT.CLASS_LAST;
    }
    elTd.className = this._getColumnClassNames(oColumn, aAddClasses);

    // Class the liner element
    elTd.firstChild.className = DT.CLASS_LINER;

    // Set Column width for fallback cases
    if(oColumn.width && DT._bDynStylesFallback) {
        // Validate minWidth
        var nWidth = (oColumn.minWidth && (oColumn.width < oColumn.minWidth)) ?
                oColumn.minWidth : oColumn.width;
        elTd.firstChild.style.overflow = 'hidden';
        elTd.firstChild.style.width = nWidth + 'px';
    }
    
    return elTd;
},


/**
 * Create a new TR element for a given Record and appends it with the correct
 * number of Column-state-classed TD elements. Striping is the responsibility of
 * the calling function, which may decide to stripe the single row, a subset of
 * rows, or all the rows.
 * @method _createTrEl
 * @param oRecord {YAHOO.widget.Record} Record instance
 * @return {HTMLElement} The new TR element.  This must be added to the DOM.
 * @private 
 */
_addTrEl : function (oRecord) {
    var elTrTemplate = this._getTrTemplateEl();
    
    // Clone the TR template.
    var elTr = elTrTemplate.cloneNode(true);
    
    // Populate content
    return this._updateTrEl(elTr,oRecord);
},

/**
 * Formats the contents of the given TR's TD elements with data from the given
 * Record. Only innerHTML should change, nothing structural.
 *
 * @method _updateTrEl
 * @param elTr {HTMLElement} The TR element to update.
 * @param oRecord {YAHOO.widget.Record} The associated Record instance.
 * @return {HTMLElement} DOM reference to the new TR element.
 * @private
 */
_updateTrEl : function(elTr, oRecord) {
    var ok = this.get("formatRow") ? this.get("formatRow").call(this, elTr, oRecord) : true;
    if(ok) {
        // Hide the row to prevent constant reflows
        elTr.style.display = 'none';
        
        // Update TD elements with new data
        var allTds = elTr.childNodes,
            elTd;
        for(var i=0,len=allTds.length; i<len; ++i) {
            elTd = allTds[i];
            
            // Set the cell content
            this.formatCell(allTds[i].firstChild, oRecord, this._oColumnSet.keys[i]);
        }
        
        // Redisplay the row for reflow
        elTr.style.display = '';
    }
    
     // Record-to-TR association and tracking of FIRST/LAST
    var oldId = elTr.id,
        newId = oRecord.getId();
    if(this._sFirstTrId === oldId) {
        this._sFirstTrId = newId;
    }
    if(this._sLastTrId === oldId) {
        this._sLastTrId = newId;
    }
    elTr.id = newId;
    return elTr;
},


/**
 * Deletes TR element by DOM reference or by DataTable page row index.
 *
 * @method _deleteTrEl
 * @param row {HTMLElement | Number} TR element reference or Datatable page row index.
 * @return {Boolean} Returns true if successful, else returns false.
 * @private
 */
_deleteTrEl : function(row) {
    var rowIndex;

    // Get page row index for the element
    if(!lang.isNumber(row)) {
        rowIndex = Dom.get(row).sectionRowIndex;
    }
    else {
        rowIndex = row;
    }
    if(lang.isNumber(rowIndex) && (rowIndex > -2) && (rowIndex < this._elTbody.rows.length)) {
        // Cannot use tbody.deleteRow due to IE6 instability
        //return this._elTbody.deleteRow(rowIndex);
        return this._elTbody.removeChild(this._elTbody.rows[row]);
    }
    else {
        return null;
    }
},



























// CSS/STATE FUNCTIONS




/**
 * Removes the class YAHOO.widget.DataTable.CLASS_FIRST from the first TR element
 * of the DataTable page and updates internal tracker.
 *
 * @method _unsetFirstRow
 * @private
 */
_unsetFirstRow : function() {
    // Remove FIRST
    if(this._sFirstTrId) {
        Dom.removeClass(this._sFirstTrId, DT.CLASS_FIRST);
        this._sFirstTrId = null;
    }
},

/**
 * Assigns the class YAHOO.widget.DataTable.CLASS_FIRST to the first TR element
 * of the DataTable page and updates internal tracker.
 *
 * @method _setFirstRow
 * @private
 */
_setFirstRow : function() {
    this._unsetFirstRow();
    var elTr = this.getFirstTrEl();
    if(elTr) {
        // Set FIRST
        Dom.addClass(elTr, DT.CLASS_FIRST);
        this._sFirstTrId = elTr.id;
    }
},

/**
 * Removes the class YAHOO.widget.DataTable.CLASS_LAST from the last TR element
 * of the DataTable page and updates internal tracker.
 *
 * @method _unsetLastRow
 * @private
 */
_unsetLastRow : function() {
    // Unassign previous class
    if(this._sLastTrId) {
        Dom.removeClass(this._sLastTrId, DT.CLASS_LAST);
        this._sLastTrId = null;
    }   
},

/**
 * Assigns the class YAHOO.widget.DataTable.CLASS_LAST to the last TR element
 * of the DataTable page and updates internal tracker.
 *
 * @method _setLastRow
 * @private
 */
_setLastRow : function() {
    this._unsetLastRow();
    var elTr = this.getLastTrEl();
    if(elTr) {
        // Assign class
        Dom.addClass(elTr, DT.CLASS_LAST);
        this._sLastTrId = elTr.id;
    }
},

/**
 * Assigns the classes DT.CLASS_EVEN and DT.CLASS_ODD to one, many, or all TR elements.
 *
 * @method _setRowStripes
 * @param row {HTMLElement | String | Number} (optional) HTML TR element reference
 * or string ID, or page row index of where to start striping.
 * @param range {Number} (optional) If given, how many rows to stripe, otherwise
 * stripe all the rows until the end.
 * @private
 */
_setRowStripes : function(row, range) {
    // Default values stripe all rows
    var allRows = this._elTbody.rows,
        nStartIndex = 0,
        nEndIndex = allRows.length,
        aOdds = [], nOddIdx = 0,
        aEvens = [], nEvenIdx = 0;

    // Stripe a subset
    if((row !== null) && (row !== undefined)) {
        // Validate given start row
        var elStartRow = this.getTrEl(row);
        if(elStartRow) {
            nStartIndex = elStartRow.sectionRowIndex;

            // Validate given range
            if(lang.isNumber(range) && (range > 1)) {
                nEndIndex = nStartIndex + range;
            }
        }
    }

    for(var i=nStartIndex; i<nEndIndex; i++) {
        if(i%2) {
            aOdds[nOddIdx++] = allRows[i];
        } else {
            aEvens[nEvenIdx++] = allRows[i];
        }
    }

    if (aOdds.length) {
        Dom.replaceClass(aOdds, DT.CLASS_EVEN, DT.CLASS_ODD);
    }

    if (aEvens.length) {
        Dom.replaceClass(aEvens, DT.CLASS_ODD, DT.CLASS_EVEN);
    }
},

/**
 * Assigns the class DT.CLASS_SELECTED to TR and TD elements.
 *
 * @method _setSelections
 * @private
 */
_setSelections : function() {
    // Keep track of selected rows
    var allSelectedRows = this.getSelectedRows();
    // Keep track of selected cells
    var allSelectedCells = this.getSelectedCells();
    // Anything to select?
    if((allSelectedRows.length>0) || (allSelectedCells.length > 0)) {
        var oColumnSet = this._oColumnSet,
            el;
        // Loop over each row
        for(var i=0; i<allSelectedRows.length; i++) {
            el = Dom.get(allSelectedRows[i]);
            if(el) {
                Dom.addClass(el, DT.CLASS_SELECTED);
            }
        }
        // Loop over each cell
        for(i=0; i<allSelectedCells.length; i++) {
            el = Dom.get(allSelectedCells[i].recordId);
            if(el) {
                Dom.addClass(el.childNodes[oColumnSet.getColumn(allSelectedCells[i].columnKey).getKeyIndex()], DT.CLASS_SELECTED);
            }
        }
    }       
},











































/////////////////////////////////////////////////////////////////////////////
//
// Private DOM Event Handlers
//
/////////////////////////////////////////////////////////////////////////////

/**
 * Validates minWidths whenever the render chain ends.
 *
 * @method _onRenderChainEnd
 * @private
 */
_onRenderChainEnd : function() {
    // Hide loading message
    this.hideTableMessage();
    
    // Show empty message
    if(this._elTbody.rows.length === 0) {
        this.showTableMessage(this.get("MSG_EMPTY"), DT.CLASS_EMPTY);        
    }

    // Execute in timeout thread to give implementers a chance
    // to subscribe after the constructor
    var oSelf = this;
    setTimeout(function() {
        if((oSelf instanceof DT) && oSelf._sId) {        
            // Init event
            if(oSelf._bInit) {
                oSelf._bInit = false;
                oSelf.fireEvent("initEvent");
            }
    
            // Render event
            oSelf.fireEvent("renderEvent");
            // Backward compatibility
            oSelf.fireEvent("refreshEvent");
    
            // Post-render routine
            oSelf.validateColumnWidths();
    
            // Post-render event
            oSelf.fireEvent("postRenderEvent");
            
            /*if(YAHOO.example.Performance.trialStart) {
                YAHOO.example.Performance.trialStart = null;
            }*/
            
        }
    }, 0);
},

/**
 * Handles click events on the DOCUMENT.
 *
 * @method _onDocumentClick
 * @param e {HTMLEvent} The click event.
 * @param oSelf {YAHOO.wiget.DataTable} DataTable instance.
 * @private
 */
_onDocumentClick : function(e, oSelf) {
    var elTarget = Ev.getTarget(e);
    var elTag = elTarget.nodeName.toLowerCase();

    if(!Dom.isAncestor(oSelf._elContainer, elTarget)) {
        oSelf.fireEvent("tableBlurEvent");

        // Fires editorBlurEvent when click is not within the TABLE.
        // For cases when click is within the TABLE, due to timing issues,
        // the editorBlurEvent needs to get fired by the lower-level DOM click
        // handlers below rather than by the TABLE click handler directly.
        if(oSelf._oCellEditor) {
            if(oSelf._oCellEditor.getContainerEl) {
                var elContainer = oSelf._oCellEditor.getContainerEl();
                // Only if the click was not within the CellEditor container
                if(!Dom.isAncestor(elContainer, elTarget) &&
                        (elContainer.id !== elTarget.id)) {
                    oSelf._oCellEditor.fireEvent("blurEvent", {editor: oSelf._oCellEditor});
                }
            }
            // Backward Compatibility
            else if(oSelf._oCellEditor.isActive) {
                // Only if the click was not within the Cell Editor container
                if(!Dom.isAncestor(oSelf._oCellEditor.container, elTarget) &&
                        (oSelf._oCellEditor.container.id !== elTarget.id)) {
                    oSelf.fireEvent("editorBlurEvent", {editor:oSelf._oCellEditor});
                }
            }
        }
    }
},

/**
 * Handles focus events on the DataTable instance.
 *
 * @method _onTableFocus
 * @param e {HTMLEvent} The focus event.
 * @param oSelf {YAHOO.wiget.DataTable} DataTable instance.
 * @private
 */
_onTableFocus : function(e, oSelf) {
    oSelf.fireEvent("tableFocusEvent");
},

/**
 * Handles focus events on the THEAD element.
 *
 * @method _onTheadFocus
 * @param e {HTMLEvent} The focus event.
 * @param oSelf {YAHOO.wiget.DataTable} DataTable instance.
 * @private
 */
_onTheadFocus : function(e, oSelf) {
    oSelf.fireEvent("theadFocusEvent");
    oSelf.fireEvent("tableFocusEvent");
},

/**
 * Handles focus events on the TBODY element.
 *
 * @method _onTbodyFocus
 * @param e {HTMLEvent} The focus event.
 * @param oSelf {YAHOO.wiget.DataTable} DataTable instance.
 * @private
 */
_onTbodyFocus : function(e, oSelf) {
    oSelf.fireEvent("tbodyFocusEvent");
    oSelf.fireEvent("tableFocusEvent");
},

/**
 * Handles mouseover events on the DataTable instance.
 *
 * @method _onTableMouseover
 * @param e {HTMLEvent} The mouseover event.
 * @param origTarget {HTMLElement} The mouseenter delegated element.
 * @param container {HTMLElement} The mouseenter delegation container.
 * @param oSelf {YAHOO.wiget.DataTable} DataTable instance.
 * @private
 */
_onTableMouseover : function(e, origTarget, container, oSelf) {
    var elTarget = origTarget;
    var elTag = elTarget.nodeName && elTarget.nodeName.toLowerCase();
    var bKeepBubbling = true;
    while(elTarget && (elTag != "table")) {
        switch(elTag) {
            case "body":
                 return;
            case "a":
                break;
            case "td":
                bKeepBubbling = oSelf.fireEvent("cellMouseoverEvent",{target:elTarget,event:e});
                break;
            case "span":
                if(Dom.hasClass(elTarget, DT.CLASS_LABEL)) {
                    bKeepBubbling = oSelf.fireEvent("theadLabelMouseoverEvent",{target:elTarget,event:e});
                    // Backward compatibility
                    bKeepBubbling = oSelf.fireEvent("headerLabelMouseoverEvent",{target:elTarget,event:e});
                }
                break;
            case "th":
                bKeepBubbling = oSelf.fireEvent("theadCellMouseoverEvent",{target:elTarget,event:e});
                // Backward compatibility
                bKeepBubbling = oSelf.fireEvent("headerCellMouseoverEvent",{target:elTarget,event:e});
                break;
            case "tr":
                if(elTarget.parentNode.nodeName.toLowerCase() == "thead") {
                    bKeepBubbling = oSelf.fireEvent("theadRowMouseoverEvent",{target:elTarget,event:e});
                    // Backward compatibility
                    bKeepBubbling = oSelf.fireEvent("headerRowMouseoverEvent",{target:elTarget,event:e});
                }
                else {
                    bKeepBubbling = oSelf.fireEvent("rowMouseoverEvent",{target:elTarget,event:e});
                }
                break;
            default:
                break;
        }
        if(bKeepBubbling === false) {
            return;
        }
        else {
            elTarget = elTarget.parentNode;
            if(elTarget) {
                elTag = elTarget.nodeName.toLowerCase();
            }
        }
    }
    oSelf.fireEvent("tableMouseoverEvent",{target:(elTarget || oSelf._elContainer),event:e});
},

/**
 * Handles mouseout events on the DataTable instance.
 *
 * @method _onTableMouseout
 * @param e {HTMLEvent} The mouseout event.
 * @param origTarget {HTMLElement} The mouseleave delegated element.
 * @param container {HTMLElement} The mouseleave delegation container.
 * @param oSelf {YAHOO.wiget.DataTable} DataTable instance.
 * @private
 */
_onTableMouseout : function(e, origTarget, container, oSelf) {
    var elTarget = origTarget;
    var elTag = elTarget.nodeName && elTarget.nodeName.toLowerCase();
    var bKeepBubbling = true;
    while(elTarget && (elTag != "table")) {
        switch(elTag) {
            case "body":
                return;
            case "a":
                break;
            case "td":
                bKeepBubbling = oSelf.fireEvent("cellMouseoutEvent",{target:elTarget,event:e});
                break;
            case "span":
                if(Dom.hasClass(elTarget, DT.CLASS_LABEL)) {
                    bKeepBubbling = oSelf.fireEvent("theadLabelMouseoutEvent",{target:elTarget,event:e});
                    // Backward compatibility
                    bKeepBubbling = oSelf.fireEvent("headerLabelMouseoutEvent",{target:elTarget,event:e});
                }
                break;
            case "th":
                bKeepBubbling = oSelf.fireEvent("theadCellMouseoutEvent",{target:elTarget,event:e});
                // Backward compatibility
                bKeepBubbling = oSelf.fireEvent("headerCellMouseoutEvent",{target:elTarget,event:e});
                break;
            case "tr":
                if(elTarget.parentNode.nodeName.toLowerCase() == "thead") {
                    bKeepBubbling = oSelf.fireEvent("theadRowMouseoutEvent",{target:elTarget,event:e});
                    // Backward compatibility
                    bKeepBubbling = oSelf.fireEvent("headerRowMouseoutEvent",{target:elTarget,event:e});
                }
                else {
                    bKeepBubbling = oSelf.fireEvent("rowMouseoutEvent",{target:elTarget,event:e});
                }
                break;
            default:
                break;
        }
        if(bKeepBubbling === false) {
            return;
        }
        else {
            elTarget = elTarget.parentNode;
            if(elTarget) {
                elTag = elTarget.nodeName.toLowerCase();
            }
        }
    }
    oSelf.fireEvent("tableMouseoutEvent",{target:(elTarget || oSelf._elContainer),event:e});
},

/**
 * Handles mousedown events on the DataTable instance.
 *
 * @method _onTableMousedown
 * @param e {HTMLEvent} The mousedown event.
 * @param oSelf {YAHOO.wiget.DataTable} DataTable instance.
 * @private
 */
_onTableMousedown : function(e, oSelf) {
    var elTarget = Ev.getTarget(e);
    var elTag = elTarget.nodeName && elTarget.nodeName.toLowerCase();
    var bKeepBubbling = true;
    while(elTarget && (elTag != "table")) {
        switch(elTag) {
            case "body":
                return;
            case "a":
                break;
            case "td":
                bKeepBubbling = oSelf.fireEvent("cellMousedownEvent",{target:elTarget,event:e});
                break;
            case "span":
                if(Dom.hasClass(elTarget, DT.CLASS_LABEL)) {
                    bKeepBubbling = oSelf.fireEvent("theadLabelMousedownEvent",{target:elTarget,event:e});
                    // Backward compatibility
                    bKeepBubbling = oSelf.fireEvent("headerLabelMousedownEvent",{target:elTarget,event:e});
                }
                break;
            case "th":
                bKeepBubbling = oSelf.fireEvent("theadCellMousedownEvent",{target:elTarget,event:e});
                // Backward compatibility
                bKeepBubbling = oSelf.fireEvent("headerCellMousedownEvent",{target:elTarget,event:e});
                break;
            case "tr":
                if(elTarget.parentNode.nodeName.toLowerCase() == "thead") {
                    bKeepBubbling = oSelf.fireEvent("theadRowMousedownEvent",{target:elTarget,event:e});
                    // Backward compatibility
                    bKeepBubbling = oSelf.fireEvent("headerRowMousedownEvent",{target:elTarget,event:e});
                }
                else {
                    bKeepBubbling = oSelf.fireEvent("rowMousedownEvent",{target:elTarget,event:e});
                }
                break;
            default:
                break;
        }
        if(bKeepBubbling === false) {
            return;
        }
        else {
            elTarget = elTarget.parentNode;
            if(elTarget) {
                elTag = elTarget.nodeName.toLowerCase();
            }
        }
    }
    oSelf.fireEvent("tableMousedownEvent",{target:(elTarget || oSelf._elContainer),event:e});
},

/**
 * Handles mouseup events on the DataTable instance.
 *
 * @method _onTableMouseup
 * @param e {HTMLEvent} The mouseup event.
 * @param oSelf {YAHOO.wiget.DataTable} DataTable instance.
 * @private
 */
_onTableMouseup : function(e, oSelf) {
    var elTarget = Ev.getTarget(e);
    var elTag = elTarget.nodeName && elTarget.nodeName.toLowerCase();
    var bKeepBubbling = true;
    while(elTarget && (elTag != "table")) {
        switch(elTag) {
            case "body":
                return;
            case "a":
                break;
            case "td":
                bKeepBubbling = oSelf.fireEvent("cellMouseupEvent",{target:elTarget,event:e});
                break;
            case "span":
                if(Dom.hasClass(elTarget, DT.CLASS_LABEL)) {
                    bKeepBubbling = oSelf.fireEvent("theadLabelMouseupEvent",{target:elTarget,event:e});
                    // Backward compatibility
                    bKeepBubbling = oSelf.fireEvent("headerLabelMouseupEvent",{target:elTarget,event:e});
                }
                break;
            case "th":
                bKeepBubbling = oSelf.fireEvent("theadCellMouseupEvent",{target:elTarget,event:e});
                // Backward compatibility
                bKeepBubbling = oSelf.fireEvent("headerCellMouseupEvent",{target:elTarget,event:e});
                break;
            case "tr":
                if(elTarget.parentNode.nodeName.toLowerCase() == "thead") {
                    bKeepBubbling = oSelf.fireEvent("theadRowMouseupEvent",{target:elTarget,event:e});
                    // Backward compatibility
                    bKeepBubbling = oSelf.fireEvent("headerRowMouseupEvent",{target:elTarget,event:e});
                }
                else {
                    bKeepBubbling = oSelf.fireEvent("rowMouseupEvent",{target:elTarget,event:e});
                }
                break;
            default:
                break;
        }
        if(bKeepBubbling === false) {
            return;
        }
        else {
            elTarget = elTarget.parentNode;
            if(elTarget) {
                elTag = elTarget.nodeName.toLowerCase();
            }
        }
    }
    oSelf.fireEvent("tableMouseupEvent",{target:(elTarget || oSelf._elContainer),event:e});
},

/**
 * Handles dblclick events on the DataTable instance.
 *
 * @method _onTableDblclick
 * @param e {HTMLEvent} The dblclick event.
 * @param oSelf {YAHOO.wiget.DataTable} DataTable instance.
 * @private
 */
_onTableDblclick : function(e, oSelf) {
    var elTarget = Ev.getTarget(e);
    var elTag = elTarget.nodeName && elTarget.nodeName.toLowerCase();
    var bKeepBubbling = true;
    while(elTarget && (elTag != "table")) {
        switch(elTag) {
            case "body":
                return;
            case "td":
                bKeepBubbling = oSelf.fireEvent("cellDblclickEvent",{target:elTarget,event:e});
                break;
            case "span":
                if(Dom.hasClass(elTarget, DT.CLASS_LABEL)) {
                    bKeepBubbling = oSelf.fireEvent("theadLabelDblclickEvent",{target:elTarget,event:e});
                    // Backward compatibility
                    bKeepBubbling = oSelf.fireEvent("headerLabelDblclickEvent",{target:elTarget,event:e});
                }
                break;
            case "th":
                bKeepBubbling = oSelf.fireEvent("theadCellDblclickEvent",{target:elTarget,event:e});
                // Backward compatibility
                bKeepBubbling = oSelf.fireEvent("headerCellDblclickEvent",{target:elTarget,event:e});
                break;
            case "tr":
                if(elTarget.parentNode.nodeName.toLowerCase() == "thead") {
                    bKeepBubbling = oSelf.fireEvent("theadRowDblclickEvent",{target:elTarget,event:e});
                    // Backward compatibility
                    bKeepBubbling = oSelf.fireEvent("headerRowDblclickEvent",{target:elTarget,event:e});
                }
                else {
                    bKeepBubbling = oSelf.fireEvent("rowDblclickEvent",{target:elTarget,event:e});
                }
                break;
            default:
                break;
        }
        if(bKeepBubbling === false) {
            return;
        }
        else {
            elTarget = elTarget.parentNode;
            if(elTarget) {
                elTag = elTarget.nodeName.toLowerCase();
            }
        }
    }
    oSelf.fireEvent("tableDblclickEvent",{target:(elTarget || oSelf._elContainer),event:e});
},
/**
 * Handles keydown events on the THEAD element.
 *
 * @method _onTheadKeydown
 * @param e {HTMLEvent} The key event.
 * @param oSelf {YAHOO.wiget.DataTable} DataTable instance.
 * @private
 */
_onTheadKeydown : function(e, oSelf) {
    var elTarget = Ev.getTarget(e);
    var elTag = elTarget.nodeName && elTarget.nodeName.toLowerCase();
    var bKeepBubbling = true;
    while(elTarget && (elTag != "table")) {
        switch(elTag) {
            case "body":
                return;
            case "input":
            case "textarea":
                // TODO: implement textareaKeyEvent
                break;
            case "thead":
                bKeepBubbling = oSelf.fireEvent("theadKeyEvent",{target:elTarget,event:e});
                break;
            default:
                break;
        }
        if(bKeepBubbling === false) {
            return;
        }
        else {
            elTarget = elTarget.parentNode;
            if(elTarget) {
                elTag = elTarget.nodeName.toLowerCase();
            }
        }
    }
    oSelf.fireEvent("tableKeyEvent",{target:(elTarget || oSelf._elContainer),event:e});
},

/**
 * Handles keydown events on the TBODY element. Handles selection behavior,
 * provides hooks for ENTER to edit functionality.
 *
 * @method _onTbodyKeydown
 * @param e {HTMLEvent} The key event.
 * @param oSelf {YAHOO.wiget.DataTable} DataTable instance.
 * @private
 */
_onTbodyKeydown : function(e, oSelf) {
    var sMode = oSelf.get("selectionMode");

    if(sMode == "standard") {
        oSelf._handleStandardSelectionByKey(e);
    }
    else if(sMode == "single") {
        oSelf._handleSingleSelectionByKey(e);
    }
    else if(sMode == "cellblock") {
        oSelf._handleCellBlockSelectionByKey(e);
    }
    else if(sMode == "cellrange") {
        oSelf._handleCellRangeSelectionByKey(e);
    }
    else if(sMode == "singlecell") {
        oSelf._handleSingleCellSelectionByKey(e);
    }
    
    if(oSelf._oCellEditor) {
        if(oSelf._oCellEditor.fireEvent) {
            oSelf._oCellEditor.fireEvent("blurEvent", {editor: oSelf._oCellEditor});
        }
        else if(oSelf._oCellEditor.isActive) {
            oSelf.fireEvent("editorBlurEvent", {editor:oSelf._oCellEditor});
        }
    }

    var elTarget = Ev.getTarget(e);
    var elTag = elTarget.nodeName && elTarget.nodeName.toLowerCase();
    var bKeepBubbling = true;
    while(elTarget && (elTag != "table")) {
        switch(elTag) {
            case "body":
                return;
            case "tbody":
                bKeepBubbling = oSelf.fireEvent("tbodyKeyEvent",{target:elTarget,event:e});
                break;
            default:
                break;
        }
        if(bKeepBubbling === false) {
            return;
        }
        else {
            elTarget = elTarget.parentNode;
            if(elTarget) {
                elTag = elTarget.nodeName.toLowerCase();
            }
        }
    }
    oSelf.fireEvent("tableKeyEvent",{target:(elTarget || oSelf._elContainer),event:e});
},

/**
 * Handles click events on the THEAD element.
 *
 * @method _onTheadClick
 * @param e {HTMLEvent} The click event.
 * @param oSelf {YAHOO.wiget.DataTable} DataTable instance.
 * @private
 */
_onTheadClick : function(e, oSelf) {
    // This blurs the CellEditor
    if(oSelf._oCellEditor) {
        if(oSelf._oCellEditor.fireEvent) {
            oSelf._oCellEditor.fireEvent("blurEvent", {editor: oSelf._oCellEditor});
        }
        // Backward compatibility
        else if(oSelf._oCellEditor.isActive) {
            oSelf.fireEvent("editorBlurEvent", {editor:oSelf._oCellEditor});
        }
    }

    var elTarget = Ev.getTarget(e),
        elTag = elTarget.nodeName && elTarget.nodeName.toLowerCase(),
        bKeepBubbling = true;
    while(elTarget && (elTag != "table")) {
        switch(elTag) {
            case "body":
                return;
            case "input":
                var sType = elTarget.type.toLowerCase();
                if(sType == "checkbox") {
                    bKeepBubbling = oSelf.fireEvent("theadCheckboxClickEvent",{target:elTarget,event:e});
                }
                else if(sType == "radio") {
                    bKeepBubbling = oSelf.fireEvent("theadRadioClickEvent",{target:elTarget,event:e});
                }
                else if((sType == "button") || (sType == "image") || (sType == "submit") || (sType == "reset")) {
                    if(!elTarget.disabled) {
                        bKeepBubbling = oSelf.fireEvent("theadButtonClickEvent",{target:elTarget,event:e});
                    }
                    else {
                        bKeepBubbling = false;
                    }
                }
                else if (elTarget.disabled){
                    bKeepBubbling = false;
                }
                break;
            case "a":
                bKeepBubbling = oSelf.fireEvent("theadLinkClickEvent",{target:elTarget,event:e});
                break;
            case "button":
                if(!elTarget.disabled) {
                    bKeepBubbling = oSelf.fireEvent("theadButtonClickEvent",{target:elTarget,event:e});
                }
                else {
                    bKeepBubbling = false;
                }
                break;
            case "span":
                if(Dom.hasClass(elTarget, DT.CLASS_LABEL)) {
                    bKeepBubbling = oSelf.fireEvent("theadLabelClickEvent",{target:elTarget,event:e});
                    // Backward compatibility
                    bKeepBubbling = oSelf.fireEvent("headerLabelClickEvent",{target:elTarget,event:e});
                }
                break;
            case "th":
                bKeepBubbling = oSelf.fireEvent("theadCellClickEvent",{target:elTarget,event:e});
                // Backward compatibility
                bKeepBubbling = oSelf.fireEvent("headerCellClickEvent",{target:elTarget,event:e});
                break;
            case "tr":
                bKeepBubbling = oSelf.fireEvent("theadRowClickEvent",{target:elTarget,event:e});
                // Backward compatibility
                bKeepBubbling = oSelf.fireEvent("headerRowClickEvent",{target:elTarget,event:e});
                break;
            default:
                break;
        }
        if(bKeepBubbling === false) {
            return;
        }
        else {
            elTarget = elTarget.parentNode;
            if(elTarget) {
                elTag = elTarget.nodeName.toLowerCase();
            }
        }
    }
    oSelf.fireEvent("tableClickEvent",{target:(elTarget || oSelf._elContainer),event:e});
},

/**
 * Handles click events on the primary TBODY element.
 *
 * @method _onTbodyClick
 * @param e {HTMLEvent} The click event.
 * @param oSelf {YAHOO.wiget.DataTable} DataTable instance.
 * @private
 */
_onTbodyClick : function(e, oSelf) {
    // This blurs the CellEditor
    if(oSelf._oCellEditor) {
        if(oSelf._oCellEditor.fireEvent) {
            oSelf._oCellEditor.fireEvent("blurEvent", {editor: oSelf._oCellEditor});
        }
        else if(oSelf._oCellEditor.isActive) {
            oSelf.fireEvent("editorBlurEvent", {editor:oSelf._oCellEditor});
        }
    }

    // Fire Custom Events
    var elTarget = Ev.getTarget(e),
        elTag = elTarget.nodeName && elTarget.nodeName.toLowerCase(),
        bKeepBubbling = true;
    while(elTarget && (elTag != "table")) {
        switch(elTag) {
            case "body":
                return;
            case "input":
                var sType = elTarget.type.toLowerCase();
                if(sType == "checkbox") {
                    bKeepBubbling = oSelf.fireEvent("checkboxClickEvent",{target:elTarget,event:e});
                }
                else if(sType == "radio") {
                    bKeepBubbling = oSelf.fireEvent("radioClickEvent",{target:elTarget,event:e});
                }
                else if((sType == "button") || (sType == "image") || (sType == "submit") || (sType == "reset")) {
                    if(!elTarget.disabled) {
                        bKeepBubbling = oSelf.fireEvent("buttonClickEvent",{target:elTarget,event:e});
                    }
                    else {
                        bKeepBubbling = false;
                    }
                }
                else if (elTarget.disabled){
                    bKeepBubbling = false;
                }
                break;
            case "a":
                bKeepBubbling = oSelf.fireEvent("linkClickEvent",{target:elTarget,event:e});
                break;
            case "button":
                if(!elTarget.disabled) {
                    bKeepBubbling = oSelf.fireEvent("buttonClickEvent",{target:elTarget,event:e});
                }
                else {
                    bKeepBubbling = false;
                }
                break;
            case "td":
                bKeepBubbling = oSelf.fireEvent("cellClickEvent",{target:elTarget,event:e});
                break;
            case "tr":
                bKeepBubbling = oSelf.fireEvent("rowClickEvent",{target:elTarget,event:e});
                break;
            default:
                break;
        }
        if(bKeepBubbling === false) {
            return;
        }
        else {
            elTarget = elTarget.parentNode;
            if(elTarget) {
                elTag = elTarget.nodeName.toLowerCase();
            }
        }
    }
    oSelf.fireEvent("tableClickEvent",{target:(elTarget || oSelf._elContainer),event:e});
},

/**
 * Handles change events on SELECT elements within DataTable.
 *
 * @method _onDropdownChange
 * @param e {HTMLEvent} The change event.
 * @param oSelf {YAHOO.wiget.DataTable} DataTable instance.
 * @private
 */
_onDropdownChange : function(e, oSelf) {
    var elTarget = Ev.getTarget(e);
    oSelf.fireEvent("dropdownChangeEvent", {event:e, target:elTarget});
},
































/////////////////////////////////////////////////////////////////////////////
//
// Public member variables
//
/////////////////////////////////////////////////////////////////////////////
/**
 * Returns object literal of initial configs.
 *
 * @property configs
 * @type Object
 * @default {} 
 */
configs: null,


/////////////////////////////////////////////////////////////////////////////
//
// Public methods
//
/////////////////////////////////////////////////////////////////////////////

/**
 * Returns unique id assigned to instance, which is a useful prefix for
 * generating unique DOM ID strings.
 *
 * @method getId
 * @return {String} Unique ID of the DataSource instance.
 */
getId : function() {
    return this._sId;
},

/**
 * DataSource instance name, for logging.
 *
 * @method toString
 * @return {String} Unique name of the DataSource instance.
 */

toString : function() {
    return "DataTable instance " + this._sId;
},

/**
 * Returns the DataTable instance's DataSource instance.
 *
 * @method getDataSource
 * @return {YAHOO.util.DataSource} DataSource instance.
 */
getDataSource : function() {
    return this._oDataSource;
},

/**
 * Returns the DataTable instance's ColumnSet instance.
 *
 * @method getColumnSet
 * @return {YAHOO.widget.ColumnSet} ColumnSet instance.
 */
getColumnSet : function() {
    return this._oColumnSet;
},

/**
 * Returns the DataTable instance's RecordSet instance.
 *
 * @method getRecordSet
 * @return {YAHOO.widget.RecordSet} RecordSet instance.
 */
getRecordSet : function() {
    return this._oRecordSet;
},

/**
 * Returns on object literal representing the DataTable instance's current
 * state with the following properties:
 * <dl>
 * <dt>pagination</dt>
 * <dd>Instance of YAHOO.widget.Paginator</dd>
 *
 * <dt>sortedBy</dt>
 * <dd>
 *     <dl>
 *         <dt>sortedBy.key</dt>
 *         <dd>{String} Key of sorted Column</dd>
 *         <dt>sortedBy.dir</dt>
 *         <dd>{String} Initial sort direction, either YAHOO.widget.DataTable.CLASS_ASC or YAHOO.widget.DataTable.CLASS_DESC</dd>
 *     </dl>
 * </dd>
 *
 * <dt>selectedRows</dt>
 * <dd>Array of selected rows by Record ID.</dd>
 *
 * <dt>selectedCells</dt>
 * <dd>Selected cells as an array of object literals:
 *     {recordId:sRecordId, columnKey:sColumnKey}</dd>
 * </dl>
 *  
 * @method getState
 * @return {Object} DataTable instance state object literal values.
 */
getState : function() {
    return {
        totalRecords: this.get('paginator') ? this.get('paginator').get("totalRecords") : this._oRecordSet.getLength(),
        pagination: this.get("paginator") ? this.get("paginator").getState() : null,
        sortedBy: this.get("sortedBy"),
        selectedRows: this.getSelectedRows(),
        selectedCells: this.getSelectedCells()
    };
},











































// DOM ACCESSORS

/**
 * Returns DOM reference to the DataTable's container element.
 *
 * @method getContainerEl
 * @return {HTMLElement} Reference to DIV element.
 */
getContainerEl : function() {
    return this._elContainer;
},

/**
 * Returns DOM reference to the DataTable's TABLE element.
 *
 * @method getTableEl
 * @return {HTMLElement} Reference to TABLE element.
 */
getTableEl : function() {
    return this._elTable;
},

/**
 * Returns DOM reference to the DataTable's THEAD element.
 *
 * @method getTheadEl
 * @return {HTMLElement} Reference to THEAD element.
 */
getTheadEl : function() {
    return this._elThead;
},

/**
 * Returns DOM reference to the DataTable's primary TBODY element.
 *
 * @method getTbodyEl
 * @return {HTMLElement} Reference to TBODY element.
 */
getTbodyEl : function() {
    return this._elTbody;
},

/**
 * Returns DOM reference to the DataTable's secondary TBODY element that is
 * used to display messages.
 *
 * @method getMsgTbodyEl
 * @return {HTMLElement} Reference to TBODY element.
 */
getMsgTbodyEl : function() {
    return this._elMsgTbody;
},

/**
 * Returns DOM reference to the TD element within the secondary TBODY that is
 * used to display messages.
 *
 * @method getMsgTdEl
 * @return {HTMLElement} Reference to TD element.
 */
getMsgTdEl : function() {
    return this._elMsgTd;
},

/**
 * Returns the corresponding TR reference for a given DOM element, ID string or
 * page row index. If the given identifier is a child of a TR element,
 * then DOM tree is traversed until a parent TR element is returned, otherwise
 * null. Returns null if the row is not considered a primary row (i.e., row
 * extensions).
 *
 * @method getTrEl
 * @param row {HTMLElement | String | Number | YAHOO.widget.Record} Which row to
 * get: by element reference, ID string, page row index, or Record.
 * @return {HTMLElement} Reference to TR element, or null.
 */
getTrEl : function(row) {
    // By Record
    if(row instanceof YAHOO.widget.Record) {
        return document.getElementById(row.getId());
    }
    // By page row index
    else if(lang.isNumber(row)) {
        var dataRows = Dom.getElementsByClassName(DT.CLASS_REC, "tr", this._elTbody);
        return dataRows && dataRows[row] ? dataRows[row] : null;
    }
    // By ID string or element reference
    else if(row) {
        var elRow = (lang.isString(row)) ? document.getElementById(row) : row;

        // Validate HTML element
        if(elRow && elRow.ownerDocument == document) {
            // Validate TR element
            if(elRow.nodeName.toLowerCase() != "tr") {
                // Traverse up the DOM to find the corresponding TR element
                elRow = Dom.getAncestorByTagName(elRow,"tr");
            }

            return elRow;
        }
    }

    return null;
},

/**
 * Returns DOM reference to the first primary TR element in the DataTable page, or null.
 *
 * @method getFirstTrEl
 * @return {HTMLElement} Reference to TR element.
 */
getFirstTrEl : function() {
    var allRows = this._elTbody.rows,
        i=0;
    while(allRows[i]) {
        if(this.getRecord(allRows[i])) {
            return allRows[i];
        }
        i++;
    }
    return null;

},

/**
 * Returns DOM reference to the last primary TR element in the DataTable page, or null.
 *
 * @method getLastTrEl
 * @return {HTMLElement} Reference to last TR element.
 */
getLastTrEl : function() {
    var allRows = this._elTbody.rows,
        i=allRows.length-1;
    while(i>-1) {
        if(this.getRecord(allRows[i])) {
            return allRows[i];
        }
        i--;
    }
    return null;
},

/**
 * Returns DOM reference to the next TR element from the given primary TR element, or null.
 *
 * @method getNextTrEl
 * @param row {HTMLElement | String | Number | YAHOO.widget.Record} Element
 * reference, ID string, page row index, or Record from which to get next TR element.
 * @param forcePrimary {Boolean} (optional) If true, will only return TR elements
 * that correspond to Records. Non-primary rows (such as row expansions)
 * will be skipped.
 * @return {HTMLElement} Reference to next TR element.
 */
getNextTrEl : function(row, forcePrimary) {
    var nThisTrIndex = this.getTrIndex(row);
    if(nThisTrIndex !== null) {
        var allRows = this._elTbody.rows;
        if(forcePrimary) {
            while(nThisTrIndex < allRows.length-1) {
                row = allRows[nThisTrIndex+1];
                if(this.getRecord(row)) {
                    return row;
                }
                nThisTrIndex++;
            }
        }
        else {
            if(nThisTrIndex < allRows.length-1) {
                return allRows[nThisTrIndex+1];
            }
        }
    }

    return null;
},

/**
 * Returns DOM reference to the previous TR element from the given primary TR element, or null.
 *
 * @method getPreviousTrEl
 * @param row {HTMLElement | String | Number | YAHOO.widget.Record} Element
 * reference, ID string, page row index, or Record from which to get previous TR element.
 * @param forcePrimary {Boolean} (optional) If true, will only return TR elements
 * from rothat correspond to Records. Non-primary rows (such as row expansions)
 * will be skipped.
 * @return {HTMLElement} Reference to previous TR element.
 */
getPreviousTrEl : function(row, forcePrimary) {
    var nThisTrIndex = this.getTrIndex(row);
    if(nThisTrIndex !== null) {
        var allRows = this._elTbody.rows;

        if(forcePrimary) {
            while(nThisTrIndex > 0) {
                row = allRows[nThisTrIndex-1];
                if(this.getRecord(row)) {
                    return row;
                }
                nThisTrIndex--;
            }
        }
        else {
            if(nThisTrIndex > 0) {
                return allRows[nThisTrIndex-1];
            }
        }
    }

    return null;
},


/**
 * Workaround for IE bug where hidden or not-in-dom elements cause cellIndex
 * value to be incorrect.
 *
 * @method getCellIndex
 * @param cell {HTMLElement | Object} TD element or child of a TD element, or
 * object literal of syntax {record:oRecord, column:oColumn}.
 * @return {Number} TD.cellIndex value.
 */
getCellIndex : function(cell) {
    cell = this.getTdEl(cell);
    if(cell) {
        if(ua.ie > 0) {
            var i=0,
                tr = cell.parentNode,
                allCells = tr.childNodes,
                len = allCells.length;
            for(; i<len; i++) {
                if(allCells[i] == cell) {
                    return i;
                }
            }
        }
        else {
            return cell.cellIndex;
        }
    }
},

/**
 * Returns DOM reference to a TD liner element.
 *
 * @method getTdLinerEl
 * @param cell {HTMLElement | Object} TD element or child of a TD element, or
 * object literal of syntax {record:oRecord, column:oColumn}.
 * @return {HTMLElement} Reference to TD liner element.
 */
getTdLinerEl : function(cell) {
    var elCell = this.getTdEl(cell);
    return elCell.firstChild || null;
},

/**
 * Returns DOM reference to a TD element. Returns null if the row is not
 * considered a primary row (i.e., row extensions).
 *
 * @method getTdEl
 * @param cell {HTMLElement | String | Object} TD element or child of a TD element, or
 * object literal of syntax {record:oRecord, column:oColumn}.
 * @return {HTMLElement} Reference to TD element.
 */
getTdEl : function(cell) {
    var elCell;
    var el = Dom.get(cell);

    // Validate HTML element
    if(el && (el.ownerDocument == document)) {
        // Validate TD element
        if(el.nodeName.toLowerCase() != "td") {
            // Traverse up the DOM to find the corresponding TR element
            elCell = Dom.getAncestorByTagName(el, "td");
        }
        else {
            elCell = el;
        }
        
        // Make sure the TD is in this TBODY or is not in DOM
        // Bug 2527707 and bug 2263558
        if(elCell && ((elCell.parentNode.parentNode == this._elTbody) ||
            (elCell.parentNode.parentNode === null) ||
            (elCell.parentNode.parentNode.nodeType === 11))) {
            // Now we can return the TD element
            return elCell;
        }
    }
    else if(cell) {
        var oRecord, nColKeyIndex;

        if(lang.isString(cell.columnKey) && lang.isString(cell.recordId)) {
            oRecord = this.getRecord(cell.recordId);
            var oColumn = this.getColumn(cell.columnKey);
            if(oColumn) {
                nColKeyIndex = oColumn.getKeyIndex();
            }

        }
        if(cell.record && cell.column && cell.column.getKeyIndex) {
            oRecord = cell.record;
            nColKeyIndex = cell.column.getKeyIndex();
        }
        var elRow = this.getTrEl(oRecord);
        if((nColKeyIndex !== null) && elRow && elRow.cells && elRow.cells.length > 0) {
            return elRow.cells[nColKeyIndex] || null;
        }
    }

    return null;
},

/**
 * Returns DOM reference to the first primary TD element in the DataTable page (by default),
 * the first TD element of the optionally given row, or null.
 *
 * @method getFirstTdEl
 * @param row {HTMLElement} (optional) row from which to get first TD
 * @return {HTMLElement} Reference to TD element.
 */
getFirstTdEl : function(row) {
    var elRow = lang.isValue(row) ? this.getTrEl(row) : this.getFirstTrEl();
    if(elRow) {
        if(elRow.cells && elRow.cells.length > 0) {
            return elRow.cells[0];
        }
        else if(elRow.childNodes && elRow.childNodes.length > 0) {
            return elRow.childNodes[0];
        }
    }
    return null;
},

/**
 * Returns DOM reference to the last primary TD element in the DataTable page (by default),
 * the first TD element of the optionally given row, or null.
 *
 * @method getLastTdEl
 * @param row {HTMLElement} (optional) row from which to get first TD
 * @return {HTMLElement} Reference to last TD element.
 */
getLastTdEl : function(row) {
    var elRow = lang.isValue(row) ? this.getTrEl(row) : this.getLastTrEl();
    if(elRow) {
        if(elRow.cells && elRow.cells.length > 0) {
            return elRow.cells[elRow.cells.length-1];
        }
        else if(elRow.childNodes && elRow.childNodes.length > 0) {
            return elRow.childNodes[elRow.childNodes.length-1];
        }
    }
    return null;
},

/**
 * Returns DOM reference to the next TD element from the given cell, or null.
 *
 * @method getNextTdEl
 * @param cell {HTMLElement | String | Object} DOM element reference or string ID, or
 * object literal of syntax {record:oRecord, column:oColumn} from which to get next TD element.
 * @return {HTMLElement} Reference to next TD element, or null.
 */
getNextTdEl : function(cell) {
    var elCell = this.getTdEl(cell);
    if(elCell) {
        var nThisTdIndex = this.getCellIndex(elCell);
        var elRow = this.getTrEl(elCell);
        if(elRow.cells && (elRow.cells.length) > 0 && (nThisTdIndex < elRow.cells.length-1)) {
            return elRow.cells[nThisTdIndex+1];
        }
        else if(elRow.childNodes && (elRow.childNodes.length) > 0 && (nThisTdIndex < elRow.childNodes.length-1)) {
            return elRow.childNodes[nThisTdIndex+1];
        }
        else {
            var elNextRow = this.getNextTrEl(elRow);
            if(elNextRow) {
                return elNextRow.cells[0];
            }
        }
    }
    return null;
},

/**
 * Returns DOM reference to the previous TD element from the given cell, or null.
 *
 * @method getPreviousTdEl
 * @param cell {HTMLElement | String | Object} DOM element reference or string ID, or
 * object literal of syntax {record:oRecord, column:oColumn} from which to get previous TD element.
 * @return {HTMLElement} Reference to previous TD element, or null.
 */
getPreviousTdEl : function(cell) {
    var elCell = this.getTdEl(cell);
    if(elCell) {
        var nThisTdIndex = this.getCellIndex(elCell);
        var elRow = this.getTrEl(elCell);
        if(nThisTdIndex > 0) {
            if(elRow.cells && elRow.cells.length > 0) {
                return elRow.cells[nThisTdIndex-1];
            }
            else if(elRow.childNodes && elRow.childNodes.length > 0) {
                return elRow.childNodes[nThisTdIndex-1];
            }
        }
        else {
            var elPreviousRow = this.getPreviousTrEl(elRow);
            if(elPreviousRow) {
                return this.getLastTdEl(elPreviousRow);
            }
        }
    }
    return null;
},

/**
 * Returns DOM reference to the above TD element from the given cell, or null.
 *
 * @method getAboveTdEl
 * @param cell {HTMLElement | String | Object} DOM element reference or string ID, or
 * object literal of syntax {record:oRecord, column:oColumn} from which to get next TD element.
 * @param forcePrimary {Boolean} (optional) If true, will only return TD elements
 * from rows that correspond to Records. Non-primary rows (such as row expansions)
 * will be skipped.
 * @return {HTMLElement} Reference to above TD element, or null.
 */
getAboveTdEl : function(cell, forcePrimary) {
    var elCell = this.getTdEl(cell);
    if(elCell) {
        var elPreviousRow = this.getPreviousTrEl(elCell, forcePrimary);
        if(elPreviousRow ) {
            var cellIndex = this.getCellIndex(elCell);
            if(elPreviousRow.cells && elPreviousRow.cells.length > 0) {
                return elPreviousRow.cells[cellIndex] ? elPreviousRow.cells[cellIndex] : null;
            }
            else if(elPreviousRow.childNodes && elPreviousRow.childNodes.length > 0) {
                return elPreviousRow.childNodes[cellIndex] ? elPreviousRow.childNodes[cellIndex] : null;
            }
        }
    }
    return null;
},

/**
 * Returns DOM reference to the below TD element from the given cell, or null.
 *
 * @method getBelowTdEl
 * @param cell {HTMLElement | String | Object} DOM element reference or string ID, or
 * object literal of syntax {record:oRecord, column:oColumn} from which to get previous TD element.
 * @param forcePrimary {Boolean} (optional) If true, will only return TD elements
 * from rows that correspond to Records. Non-primary rows (such as row expansions)
 * will be skipped.
 * @return {HTMLElement} Reference to below TD element, or null.
 */
getBelowTdEl : function(cell, forcePrimary) {
    var elCell = this.getTdEl(cell);
    if(elCell) {
        var elNextRow = this.getNextTrEl(elCell, forcePrimary);
        if(elNextRow) {
            var cellIndex = this.getCellIndex(elCell);
            if(elNextRow.cells && elNextRow.cells.length > 0) {
                return elNextRow.cells[cellIndex] ? elNextRow.cells[cellIndex] : null;
            }
            else if(elNextRow.childNodes && elNextRow.childNodes.length > 0) {
                return elNextRow.childNodes[cellIndex] ? elNextRow.childNodes[cellIndex] : null;
            }
        }
    }
    return null;
},

/**
 * Returns DOM reference to a TH liner element. Needed to normalize for resizeable 
 * Columns, which have an additional resizer liner DIV element between the TH
 * element and the liner DIV element. 
 *
 * @method getThLinerEl
 * @param theadCell {YAHOO.widget.Column | HTMLElement | String} Column instance,
 * DOM element reference, or string ID.
 * @return {HTMLElement} Reference to TH liner element.
 */
getThLinerEl : function(theadCell) {
    var oColumn = this.getColumn(theadCell);
    return (oColumn) ? oColumn.getThLinerEl() : null;
},

/**
 * Returns DOM reference to a TH element.
 *
 * @method getThEl
 * @param theadCell {YAHOO.widget.Column | HTMLElement | String} Column instance,
 * DOM element reference, or string ID.
 * @return {HTMLElement} Reference to TH element.
 */
getThEl : function(theadCell) {
    var elTh;

    // Validate Column instance
    if(theadCell instanceof YAHOO.widget.Column) {
        var oColumn = theadCell;
        elTh = oColumn.getThEl();
        if(elTh) {
            return elTh;
        }
    }
    // Validate HTML element
    else {
        var el = Dom.get(theadCell);

        if(el && (el.ownerDocument == document)) {
            // Validate TH element
            if(el.nodeName.toLowerCase() != "th") {
                // Traverse up the DOM to find the corresponding TR element
                elTh = Dom.getAncestorByTagName(el,"th");
            }
            else {
                elTh = el;
            }

            return elTh;
        }
    }

    return null;
},

/**
 * Returns the page row index of given primary row. Returns null if the row is not on the
 * current DataTable page, or if row is not considered a primary row (i.e., row
 * extensions).
 *
 * @method getTrIndex
 * @param row {HTMLElement | String | YAHOO.widget.Record | Number} DOM or ID
 * string reference to an element within the DataTable page, a Record instance,
 * or a Record's RecordSet index.
 * @return {Number} Page row index, or null if data row does not exist or is not on current page.
 */
getTrIndex : function(row) {
    var record = this.getRecord(row),
        index = this.getRecordIndex(record),
        tr;
    if(record) {
        tr = this.getTrEl(record);
        if(tr) {
            return tr.sectionRowIndex;
        }
        else {
            var oPaginator = this.get("paginator");
            if(oPaginator) {
                return oPaginator.get('recordOffset') + index;
            }
            else {
                return index;
            }
        }
    }
    return null;
},














































// TABLE FUNCTIONS

/**
 * Loads new data. Convenience method that calls DataSource's sendRequest()
 * method under the hood.
 *
 * @method load
 * @param oConfig {object} Optional configuration parameters:
 *
 * <dl>
 * <dt>request</dt><dd>Pass in a new request, or initialRequest is used.</dd>
 * <dt>callback</dt><dd>Pass in DataSource sendRequest() callback object, or the following is used:
 *    <dl>
 *      <dt>success</dt><dd>datatable.onDataReturnInitializeTable</dd>
 *      <dt>failure</dt><dd>datatable.onDataReturnInitializeTable</dd>
 *      <dt>scope</dt><dd>datatable</dd>
 *      <dt>argument</dt><dd>datatable.getState()</dd>
 *    </dl>
 * </dd>
 * <dt>datasource</dt><dd>Pass in a new DataSource instance to override the current DataSource for this transaction.</dd>
 * </dl>
 */
load : function(oConfig) {
    oConfig = oConfig || {};

    (oConfig.datasource || this._oDataSource).sendRequest(oConfig.request || this.get("initialRequest"), oConfig.callback || {
        success: this.onDataReturnInitializeTable,
        failure: this.onDataReturnInitializeTable,
        scope: this,
        argument: this.getState()
    });
},

/**
 * Resets a RecordSet with the given data and populates the page view
 * with the new data. Any previous data, and selection and sort states are
 * cleared. New data should be added as a separate step. 
 *
 * @method initializeTable
 */
initializeTable : function() {
    // Reset init flag
    this._bInit = true;
    
    // Clear the RecordSet
    this._oRecordSet.reset();

    // Clear the Paginator's totalRecords if paginating
    var pag = this.get('paginator');
    if (pag) {
        pag.set('totalRecords',0);
    }

    // Clear selections
    this._unselectAllTrEls();
    this._unselectAllTdEls();
    this._aSelections = null;
    this._oAnchorRecord = null;
    this._oAnchorCell = null;
    
    // Clear sort
    this.set("sortedBy", null);
},

/**
 * Internal wrapper calls run() on render Chain instance.
 *
 * @method _runRenderChain
 * @private 
 */
_runRenderChain : function() {
    this._oChainRender.run();
},

/**
 * Returns array of Records for current view. For example, if paginated, it
 * returns the subset of Records for current page.
 *
 * @method _getViewRecords
 * @protected
 * @return {Array} Array of Records to display in current view.
 */
_getViewRecords : function() {
    // Paginator is enabled, show a subset of Records
    var oPaginator = this.get('paginator');
    if(oPaginator) {
        return this._oRecordSet.getRecords(
                        oPaginator.getStartIndex(),
                        oPaginator.getRowsPerPage());
    }
    // Not paginated, show all records
    else {
        return this._oRecordSet.getRecords();
    }

},

/**
 * Renders the view with existing Records from the RecordSet while
 * maintaining sort, pagination, and selection states. For performance, reuses
 * existing DOM elements when possible while deleting extraneous elements.
 *
 * @method render
 */
render : function() {
//YAHOO.example.Performance.trialStart = new Date();

    this._oChainRender.stop();

    this.fireEvent("beforeRenderEvent");

    var i, j, k, len,
        allRecords = this._getViewRecords();


    // From the top, update in-place existing rows, so as to reuse DOM elements
    var elTbody = this._elTbody,
        loopN = this.get("renderLoopSize"),
        nRecordsLength = allRecords.length;
    
    // Table has rows
    if(nRecordsLength > 0) {                
        elTbody.style.display = "none";
        while(elTbody.lastChild) {
            elTbody.removeChild(elTbody.lastChild);
        }
        elTbody.style.display = "";

        // Set up the loop Chain to render rows
        this._oChainRender.add({
            method: function(oArg) {
                if((this instanceof DT) && this._sId) {
                    var i = oArg.nCurrentRecord,
                        endRecordIndex = ((oArg.nCurrentRecord+oArg.nLoopLength) > nRecordsLength) ?
                                nRecordsLength : (oArg.nCurrentRecord+oArg.nLoopLength),
                        elRow, nextSibling;

                    elTbody.style.display = "none";
                    
                    for(; i<endRecordIndex; i++) {
                        elRow = Dom.get(allRecords[i].getId());
                        elRow = elRow || this._addTrEl(allRecords[i]);
                        nextSibling = elTbody.childNodes[i] || null;
                        elTbody.insertBefore(elRow, nextSibling);
                    }
                    elTbody.style.display = "";
                    
                    // Set up for the next loop
                    oArg.nCurrentRecord = i;
                }
            },
            scope: this,
            iterations: (loopN > 0) ? Math.ceil(nRecordsLength/loopN) : 1,
            argument: {
                nCurrentRecord: 0,//nRecordsLength-1,  // Start at first Record
                nLoopLength: (loopN > 0) ? loopN : nRecordsLength
            },
            timeout: (loopN > 0) ? 0 : -1
        });
        
        // Post-render tasks
        this._oChainRender.add({
            method: function(oArg) {
                if((this instanceof DT) && this._sId) {
                    while(elTbody.rows.length > nRecordsLength) {
                        elTbody.removeChild(elTbody.lastChild);
                    }
                    this._setFirstRow();
                    this._setLastRow();
                    this._setRowStripes();
                    this._setSelections();
                }
            },
            scope: this,
            timeout: (loopN > 0) ? 0 : -1
        });
     
    }
    // Table has no rows
    else {
        // Set up the loop Chain to delete rows
        var nTotal = elTbody.rows.length;
        if(nTotal > 0) {
            this._oChainRender.add({
                method: function(oArg) {
                    if((this instanceof DT) && this._sId) {
                        var i = oArg.nCurrent,
                            loopN = oArg.nLoopLength,
                            nIterEnd = (i - loopN < 0) ? 0 : i - loopN;
    
                        elTbody.style.display = "none";
                        
                        for(; i>nIterEnd; i--) {
                            elTbody.deleteRow(-1);
                        }
                        elTbody.style.display = "";
                        
                        // Set up for the next loop
                        oArg.nCurrent = i;
                    }
                },
                scope: this,
                iterations: (loopN > 0) ? Math.ceil(nTotal/loopN) : 1,
                argument: {
                    nCurrent: nTotal, 
                    nLoopLength: (loopN > 0) ? loopN : nTotal
                },
                timeout: (loopN > 0) ? 0 : -1
            });
        }
    }
    this._runRenderChain();
},

/**
 * Disables DataTable UI.
 *
 * @method disable
 */
disable : function() {
    this._disabled = true;
    var elTable = this._elTable;
    var elMask = this._elMask;
    elMask.style.width = elTable.offsetWidth + "px";
    elMask.style.height = elTable.offsetHeight + "px";
    elMask.style.left = elTable.offsetLeft + "px";
    elMask.style.display = "";
    this.fireEvent("disableEvent");
},

/**
 * Undisables DataTable UI.
 *
 * @method undisable
 */
undisable : function() {
    this._disabled = false;
    this._elMask.style.display = "none";
    this.fireEvent("undisableEvent");
},

 /**
 * Returns disabled state.
 *
 * @method isDisabled
 * @return {Boolean} True if UI is disabled, otherwise false
 */
isDisabled : function() {
    return this._disabled;
},

/**
 * Nulls out the entire DataTable instance and related objects, removes attached
 * event listeners, and clears out DOM elements inside the container. After
 * calling this method, the instance reference should be expliclitly nulled by
 * implementer, as in myDataTable = null. Use with caution!
 *
 * @method destroy
 */
destroy : function() {
    // Store for later
    var instanceName = this.toString();

    this._oChainRender.stop();
    
    // Destroy ColumnDD and ColumnResizers
    this._destroyColumnHelpers();
    
    // Destroy all CellEditors
    var oCellEditor;
    for(var i=0, len=this._oColumnSet.flat.length; i<len; i++) {
        oCellEditor = this._oColumnSet.flat[i].editor;
        if(oCellEditor && oCellEditor.destroy) {
            oCellEditor.destroy();
            this._oColumnSet.flat[i].editor = null;
        }
    }

    // Destroy Paginator
    this._destroyPaginator();

    // Unhook custom events
    this._oRecordSet.unsubscribeAll();
    this.unsubscribeAll();

    // Unhook DOM events
    Ev.removeListener(document, "click", this._onDocumentClick);
    
    // Clear out the container
    this._destroyContainerEl(this._elContainer);

    // Null out objects
    for(var param in this) {
        if(lang.hasOwnProperty(this, param)) {
            this[param] = null;
        }
    }
    
    // Clean up static values
    DT._nCurrentCount--;
    
    if(DT._nCurrentCount < 1) {
        if(DT._elDynStyleNode) {
            document.getElementsByTagName('head')[0].removeChild(DT._elDynStyleNode);
            DT._elDynStyleNode = null;
        }
    }

},

/**
 * Displays message within secondary TBODY.
 *
 * @method showTableMessage
 * @param sHTML {HTML} (optional) Value for innerHTML.
 * @param sClassName {String} (optional) Classname.
 */
showTableMessage : function(sHTML, sClassName) {
    var elCell = this._elMsgTd;
    if(lang.isString(sHTML)) {
        elCell.firstChild.innerHTML = sHTML;
    }
    if(lang.isString(sClassName)) {
        elCell.className = sClassName;
    }

    this._elMsgTbody.style.display = "";

    this.fireEvent("tableMsgShowEvent", {html:sHTML, className:sClassName});
},

/**
 * Hides secondary TBODY.
 *
 * @method hideTableMessage
 */
hideTableMessage : function() {
    if(this._elMsgTbody.style.display != "none") {
        this._elMsgTbody.style.display = "none";
        this._elMsgTbody.parentNode.style.width = "";
        this.fireEvent("tableMsgHideEvent");
    }
},

/**
 * Brings focus to the TBODY element. Alias to focusTbodyEl.
 *
 * @method focus
 */
focus : function() {
    this.focusTbodyEl();
},

/**
 * Brings focus to the THEAD element.
 *
 * @method focusTheadEl
 */
focusTheadEl : function() {
    this._focusEl(this._elThead);
},

/**
 * Brings focus to the TBODY element.
 *
 * @method focusTbodyEl
 */
focusTbodyEl : function() {
    this._focusEl(this._elTbody);
},

/**
 * Setting display:none on DataTable or any parent may impact width validations.
 * After setting display back to "", implementers should call this method to 
 * manually perform those validations.
 *
 * @method onShow
 */
onShow : function() {
    this.validateColumnWidths();
    
    for(var allKeys = this._oColumnSet.keys, i=0, len=allKeys.length, col; i<len; i++) {
        col = allKeys[i];
        if(col._ddResizer) {
            col._ddResizer.resetResizerEl();
        }
    }
},



































































// RECORDSET FUNCTIONS

/**
 * Returns Record index for given TR element or page row index.
 *
 * @method getRecordIndex
 * @param row {YAHOO.widget.Record | HTMLElement | Number} Record instance, TR
 * element reference or page row index.
 * @return {Number} Record's RecordSet index, or null.
 */
getRecordIndex : function(row) {
    var nTrIndex;

    if(!lang.isNumber(row)) {
        // By Record
        if(row instanceof YAHOO.widget.Record) {
            return this._oRecordSet.getRecordIndex(row);
        }
        // By element reference
        else {
            // Find the TR element
            var el = this.getTrEl(row);
            if(el) {
                nTrIndex = el.sectionRowIndex;
            }
        }
    }
    // By page row index
    else {
        nTrIndex = row;
    }

    if(lang.isNumber(nTrIndex)) {
        var oPaginator = this.get("paginator");
        if(oPaginator) {
            return oPaginator.get('recordOffset') + nTrIndex;
        }
        else {
            return nTrIndex;
        }
    }

    return null;
},

/**
 * For the given identifier, returns the associated Record instance.
 *
 * @method getRecord
 * @param row {HTMLElement | Number | String} DOM reference to a TR element (or
 * child of a TR element), RecordSet position index, or Record ID.
 * @return {YAHOO.widget.Record} Record instance.
 */
getRecord : function(row) {
    var oRecord = this._oRecordSet.getRecord(row);

    if(!oRecord) {
        // Validate TR element
        var elRow = this.getTrEl(row);
        if(elRow) {
            oRecord = this._oRecordSet.getRecord(elRow.id);
        }
    }

    if(oRecord instanceof YAHOO.widget.Record) {
        return this._oRecordSet.getRecord(oRecord);
    }
    else {
        return null;
    }
},














































// COLUMN FUNCTIONS

/**
 * For the given identifier, returns the associated Column instance. Note: For
 * getting Columns by Column ID string, please use the method getColumnById().
 *
 * @method getColumn
 * @param column {HTMLElement | String | Number} TH/TD element (or child of a
 * TH/TD element), a Column key, or a ColumnSet key index.
 * @return {YAHOO.widget.Column} Column instance.
 */
getColumn : function(column) {
    var oColumn = this._oColumnSet.getColumn(column);

    if(!oColumn) {
        // Validate TD element
        var elCell = this.getTdEl(column);
        if(elCell) {
            oColumn = this._oColumnSet.getColumn(this.getCellIndex(elCell));
        }
        // Validate TH element
        else {
            elCell = this.getThEl(column);
            if(elCell) {
                // Find by TH el ID
                var allColumns = this._oColumnSet.flat;
                for(var i=0, len=allColumns.length; i<len; i++) {
                    if(allColumns[i].getThEl().id === elCell.id) {
                        oColumn = allColumns[i];
                    } 
                }
            }
        }
    }
    if(!oColumn) {
    }
    return oColumn;
},

/**
 * For the given Column ID, returns the associated Column instance. Note: For
 * getting Columns by key, please use the method getColumn().
 *
 * @method getColumnById
 * @param column {String} Column ID string.
 * @return {YAHOO.widget.Column} Column instance.
 */
getColumnById : function(column) {
    return this._oColumnSet.getColumnById(column);
},

/**
 * For the given Column instance, returns next direction to sort.
 *
 * @method getColumnSortDir
 * @param oColumn {YAHOO.widget.Column} Column instance.
 * @param oSortedBy {Object} (optional) Specify the state, or use current state. 
 * @return {String} YAHOO.widget.DataTable.CLASS_ASC or YAHOO.widget.DataTableCLASS_DESC.
 */
getColumnSortDir : function(oColumn, oSortedBy) {
    // Backward compatibility
    if(oColumn.sortOptions && oColumn.sortOptions.defaultDir) {
        if(oColumn.sortOptions.defaultDir == "asc") {
            oColumn.sortOptions.defaultDir = DT.CLASS_ASC;
        }
        else if (oColumn.sortOptions.defaultDir == "desc") {
            oColumn.sortOptions.defaultDir = DT.CLASS_DESC;
        }
    }
    
    // What is the Column's default sort direction?
    var sortDir = (oColumn.sortOptions && oColumn.sortOptions.defaultDir) ? oColumn.sortOptions.defaultDir : DT.CLASS_ASC;

    // Is the Column currently sorted?
    var bSorted = false;
    oSortedBy = oSortedBy || this.get("sortedBy");
    if(oSortedBy && (oSortedBy.key === oColumn.key)) {
        bSorted = true;
        if(oSortedBy.dir) {
            sortDir = (oSortedBy.dir === DT.CLASS_ASC) ? DT.CLASS_DESC : DT.CLASS_ASC;
        }
        else {
            sortDir = (sortDir === DT.CLASS_ASC) ? DT.CLASS_DESC : DT.CLASS_ASC;
        }
    }
    return sortDir;
},

/**
 * Overridable method gives implementers a hook to show loading message before
 * sorting Column.
 *
 * @method doBeforeSortColumn
 * @param oColumn {YAHOO.widget.Column} Column instance.
 * @param sSortDir {String} YAHOO.widget.DataTable.CLASS_ASC or
 * YAHOO.widget.DataTable.CLASS_DESC.
 * @return {Boolean} Return true to continue sorting Column.
 */
doBeforeSortColumn : function(oColumn, sSortDir) {
    this.showTableMessage(this.get("MSG_LOADING"), DT.CLASS_LOADING);
    return true;
},

/**
 * Sorts given Column. If "dynamicData" is true, current selections are purged before
 * a request is sent to the DataSource for data for the new state (using the
 * request returned by "generateRequest()").
 *
 * @method sortColumn
 * @param oColumn {YAHOO.widget.Column} Column instance.
 * @param sDir {String} (Optional) YAHOO.widget.DataTable.CLASS_ASC or
 * YAHOO.widget.DataTable.CLASS_DESC
 */
sortColumn : function(oColumn, sDir) {
    if(oColumn && (oColumn instanceof YAHOO.widget.Column)) {
        if(!oColumn.sortable) {
            Dom.addClass(this.getThEl(oColumn), DT.CLASS_SORTABLE);
        }
        
        // Validate given direction
        if(sDir && (sDir !== DT.CLASS_ASC) && (sDir !== DT.CLASS_DESC)) {
            sDir = null;
        }
        
        // Get the sort dir
        var sSortDir = sDir || this.getColumnSortDir(oColumn);

        // Is the Column currently sorted?
        var oSortedBy = this.get("sortedBy") || {};
        var bSorted = (oSortedBy.key === oColumn.key) ? true : false;

        var ok = this.doBeforeSortColumn(oColumn, sSortDir);
        if(ok) {
            // Server-side sort
            if(this.get("dynamicData")) {
                // Get current state
                var oState = this.getState();
                
                // Reset record offset, if paginated
                if(oState.pagination) {
                    oState.pagination.recordOffset = 0;
                }
                
                // Update sortedBy to new values
                oState.sortedBy = {
                    key: oColumn.key,
                    dir: sSortDir
                };
                
                // Get the request for the new state
                var request = this.get("generateRequest")(oState, this);

                // Purge selections
                this.unselectAllRows();
                this.unselectAllCells();

                // Send request for new data
                var callback = {
                    success : this.onDataReturnSetRows,
                    failure : this.onDataReturnSetRows,
                    argument : oState, // Pass along the new state to the callback
                    scope : this
                };
                this._oDataSource.sendRequest(request, callback);            
            }
            // Client-side sort
            else {
                // Is there a custom sort handler function defined?
                var sortFnc = (oColumn.sortOptions && lang.isFunction(oColumn.sortOptions.sortFunction)) ?
                        // Custom sort function
                        oColumn.sortOptions.sortFunction : null;
                   
                // Sort the Records
                if(!bSorted || sDir || sortFnc) {
                    // Default sort function if necessary
                    sortFnc = sortFnc || this.get("sortFunction");
                    // Get the field to sort
                    var sField = (oColumn.sortOptions && oColumn.sortOptions.field) ? oColumn.sortOptions.field : oColumn.field;

                    // Sort the Records        
                    this._oRecordSet.sortRecords(sortFnc, ((sSortDir == DT.CLASS_DESC) ? true : false), sField);
                }
                // Just reverse the Records
                else {
                    this._oRecordSet.reverseRecords();
                }
        
                // Reset to first page if paginated
                var oPaginator = this.get('paginator');
                if (oPaginator) {
                    // Set page silently, so as not to fire change event.
                    oPaginator.setPage(1,true);
                }
        
                // Update UI via sortedBy
                this.render();
                this.set("sortedBy", {key:oColumn.key, dir:sSortDir, column:oColumn}); 
            }       
            
            this.fireEvent("columnSortEvent",{column:oColumn,dir:sSortDir});
            return;
        }
    }
},

/**
 * Sets given Column to given pixel width. If new width is less than minimum
 * width, sets to minimum width. Updates oColumn.width value.
 *
 * @method setColumnWidth
 * @param oColumn {YAHOO.widget.Column} Column instance.
 * @param nWidth {Number} New width in pixels. A null value auto-sizes Column,
 * subject to minWidth and maxAutoWidth validations. 
 */
setColumnWidth : function(oColumn, nWidth) {
    if(!(oColumn instanceof YAHOO.widget.Column)) {
        oColumn = this.getColumn(oColumn);
    }
    if(oColumn) {
        // Validate new width against minimum width
        if(lang.isNumber(nWidth)) {
            // This is why we must require a Number... :-|
            nWidth = (nWidth > oColumn.minWidth) ? nWidth : oColumn.minWidth;

            // Save state
            oColumn.width = nWidth;
            
            // Resize the DOM elements
            this._setColumnWidth(oColumn, nWidth+"px");
            
            this.fireEvent("columnSetWidthEvent",{column:oColumn,width:nWidth});
        }
        // Unsets a width to auto-size
        else if(nWidth === null) {
            // Save state
            oColumn.width = nWidth;
            
            // Resize the DOM elements
            this._setColumnWidth(oColumn, "auto");
            this.validateColumnWidths(oColumn);
            this.fireEvent("columnUnsetWidthEvent",{column:oColumn});
        }
                
        // Bug 2339454: resize then sort misaligment
        this._clearTrTemplateEl();
    }
    else {
    }
},

/**
 * Sets liner DIV elements of given Column to given width. When value should be
 * auto-calculated to fit content overflow is set to visible, otherwise overflow
 * is set to hidden. No validations against minimum width and no updating
 * Column.width value.
 *
 * @method _setColumnWidth
 * @param oColumn {YAHOO.widget.Column} Column instance.
 * @param sWidth {String} New width value.
 * @param sOverflow {String} Should be "hidden" when Column width is explicitly
 * being set to a value, but should be "visible" when Column is meant to auto-fit content.  
 * @private
 */
_setColumnWidth : function(oColumn, sWidth, sOverflow) {
    if(oColumn && (oColumn.getKeyIndex() !== null)) {
        sOverflow = sOverflow || (((sWidth === '') || (sWidth === 'auto')) ? 'visible' : 'hidden');
    
        // Dynamic style algorithm
        if(!DT._bDynStylesFallback) {
            this._setColumnWidthDynStyles(oColumn, sWidth, sOverflow);
        }
        // Dynamic function algorithm
        else {
            this._setColumnWidthDynFunction(oColumn, sWidth, sOverflow);
        }
    }
    else {
    }
},

/**
 * Updates width of a Column's liner DIV elements by dynamically creating a
 * STYLE node and writing and updating CSS style rules to it. If this fails during
 * runtime, the fallback method _setColumnWidthDynFunction() will be called.
 * Notes: This technique is not performant in IE6. IE7 crashes if DataTable is
 * nested within another TABLE element. For these cases, it is recommended to
 * use the method _setColumnWidthDynFunction by setting _bDynStylesFallback to TRUE.
 *
 * @method _setColumnWidthDynStyles
 * @param oColumn {YAHOO.widget.Column} Column instance.
 * @param sWidth {String} New width value.
 * @private
 */
_setColumnWidthDynStyles : function(oColumn, sWidth, sOverflow) {
    var s = DT._elDynStyleNode,
        rule;
    
    // Create a new STYLE node
    if(!s) {
        s = document.createElement('style');
        s.type = 'text/css';
        s = document.getElementsByTagName('head').item(0).appendChild(s);
        DT._elDynStyleNode = s;
    }
    
    // We have a STYLE node to update
    if(s) {
        // Use unique classname for this Column instance as a hook for resizing
        var sClassname = "." + this.getId() + "-col-" + oColumn.getSanitizedKey() + " ." + DT.CLASS_LINER;
        
        // Hide for performance
        if(this._elTbody) {
            this._elTbody.style.display = 'none';
        }
        
        rule = DT._oDynStyles[sClassname];

        // The Column does not yet have a rule
        if(!rule) {
            if(s.styleSheet && s.styleSheet.addRule) {
                s.styleSheet.addRule(sClassname,"overflow:"+sOverflow);
                s.styleSheet.addRule(sClassname,'width:'+sWidth);
                rule = s.styleSheet.rules[s.styleSheet.rules.length-1];
                DT._oDynStyles[sClassname] = rule;
            }
            else if(s.sheet && s.sheet.insertRule) {
                s.sheet.insertRule(sClassname+" {overflow:"+sOverflow+";width:"+sWidth+";}",s.sheet.cssRules.length);
                rule = s.sheet.cssRules[s.sheet.cssRules.length-1];
                DT._oDynStyles[sClassname] = rule;
            }
        }
        // We have a rule to update
        else {
            rule.style.overflow = sOverflow;
            rule.style.width = sWidth;
        } 
        
        // Unhide
        if(this._elTbody) {
            this._elTbody.style.display = '';
        }
    }
    
    // That was not a success, we must call the fallback routine
    if(!rule) {
        DT._bDynStylesFallback = true;
        this._setColumnWidthDynFunction(oColumn, sWidth);
    }
},

/**
 * Updates width of a Column's liner DIV elements by dynamically creating a
 * function to update all element style properties in one pass. Note: This
 * technique is not supported in sandboxed environments that prohibit EVALs.    
 *
 * @method _setColumnWidthDynFunction
 * @param oColumn {YAHOO.widget.Column} Column instance.
 * @param sWidth {String} New width value.
 * @private
 */
_setColumnWidthDynFunction : function(oColumn, sWidth, sOverflow) {
    // TODO: why is this here?
    if(sWidth == 'auto') {
        sWidth = ''; 
    }
    
    // Create one function for each value of rows.length
    var rowslen = this._elTbody ? this._elTbody.rows.length : 0;
    
    // Dynamically create the function
    if (!this._aDynFunctions[rowslen]) {
        
        //Compile a custom function to do all the liner div width
        //assignments at the same time.  A unique function is required
        //for each unique number of rows in _elTbody.  This will
        //result in a function declaration like:
        //function (oColumn,sWidth,sOverflow) {
        //    var colIdx = oColumn.getKeyIndex();
        //    oColumn.getThLinerEl().style.overflow =
        //    this._elTbody.rows[0].cells[colIdx].firstChild.style.overflow =
        //    this._elTbody.rows[1].cells[colIdx].firstChild.style.overflow =
        //    ... (for all row indices in this._elTbody.rows.length - 1)
        //    this._elTbody.rows[99].cells[colIdx].firstChild.style.overflow =
        //    sOverflow;
        //    oColumn.getThLinerEl().style.width =
        //    this._elTbody.rows[0].cells[colIdx].firstChild.style.width =
        //    this._elTbody.rows[1].cells[colIdx].firstChild.style.width =
        //    ... (for all row indices in this._elTbody.rows.length - 1)
        //    this._elTbody.rows[99].cells[colIdx].firstChild.style.width =
        //    sWidth;
        //}
        
        var i,j,k;
        var resizerDef = [
            'var colIdx=oColumn.getKeyIndex();',
            'oColumn.getThLinerEl().style.overflow='
        ];
        for (i=rowslen-1, j=2; i >= 0; --i) {
            resizerDef[j++] = 'this._elTbody.rows[';
            resizerDef[j++] = i;
            resizerDef[j++] = '].cells[colIdx].firstChild.style.overflow=';
        }
        resizerDef[j] = 'sOverflow;';
        resizerDef[j+1] = 'oColumn.getThLinerEl().style.width=';
        for (i=rowslen-1, k=j+2; i >= 0; --i) {
            resizerDef[k++] = 'this._elTbody.rows[';
            resizerDef[k++] = i;
            resizerDef[k++] = '].cells[colIdx].firstChild.style.width=';
        }
        resizerDef[k] = 'sWidth;';
        this._aDynFunctions[rowslen] =
            new Function('oColumn','sWidth','sOverflow',resizerDef.join(''));
    }
    
    // Get the function to execute
    var resizerFn = this._aDynFunctions[rowslen];

    // TODO: Hide TBODY for performance in _setColumnWidthDynFunction?
    if (resizerFn) {
        resizerFn.call(this,oColumn,sWidth,sOverflow);
    }
},

/**
 * For one or all Columns, when Column is not hidden, width is not set, and minWidth
 * and/or maxAutoWidth is set, validates auto-width against minWidth and maxAutoWidth.
 *
 * @method validateColumnWidths
 * @param oArg.column {YAHOO.widget.Column} (optional) One Column to validate. If null, all Columns' widths are validated.
 */
validateColumnWidths : function(oColumn) {
    var elColgroup = this._elColgroup;
    var elColgroupClone = elColgroup.cloneNode(true);
    var bNeedsValidation = false;
    var allKeys = this._oColumnSet.keys;
    var elThLiner;
    // Validate just one Column's minWidth and/or maxAutoWidth
    if(oColumn && !oColumn.hidden && !oColumn.width && (oColumn.getKeyIndex() !== null)) {
            elThLiner = oColumn.getThLinerEl();
            if((oColumn.minWidth > 0) && (elThLiner.offsetWidth < oColumn.minWidth)) {
                elColgroupClone.childNodes[oColumn.getKeyIndex()].style.width = 
                        oColumn.minWidth + 
                        (parseInt(Dom.getStyle(elThLiner,"paddingLeft"),10)|0) +
                        (parseInt(Dom.getStyle(elThLiner,"paddingRight"),10)|0) + "px";
                bNeedsValidation = true;
            }
            else if((oColumn.maxAutoWidth > 0) && (elThLiner.offsetWidth > oColumn.maxAutoWidth)) {
                this._setColumnWidth(oColumn, oColumn.maxAutoWidth+"px", "hidden");
            }
    }
    // Validate all Columns
    else {
        for(var i=0, len=allKeys.length; i<len; i++) {
            oColumn = allKeys[i];
            if(!oColumn.hidden && !oColumn.width) {
                elThLiner = oColumn.getThLinerEl();
                if((oColumn.minWidth > 0) && (elThLiner.offsetWidth < oColumn.minWidth)) {
                    elColgroupClone.childNodes[i].style.width = 
                            oColumn.minWidth + 
                            (parseInt(Dom.getStyle(elThLiner,"paddingLeft"),10)|0) +
                            (parseInt(Dom.getStyle(elThLiner,"paddingRight"),10)|0) + "px";
                    bNeedsValidation = true;
                }
                else if((oColumn.maxAutoWidth > 0) && (elThLiner.offsetWidth > oColumn.maxAutoWidth)) {
                    this._setColumnWidth(oColumn, oColumn.maxAutoWidth+"px", "hidden");
                }
            }
        }
    }
    if(bNeedsValidation) {
        elColgroup.parentNode.replaceChild(elColgroupClone, elColgroup);
        this._elColgroup = elColgroupClone;
    }
},

/**
 * Clears minWidth.
 *
 * @method _clearMinWidth
 * @param oColumn {YAHOO.widget.Column} Which Column.
 * @private
 */
_clearMinWidth : function(oColumn) {
    if(oColumn.getKeyIndex() !== null) {
        this._elColgroup.childNodes[oColumn.getKeyIndex()].style.width = '';
    }
},

/**
 * Restores minWidth.
 *
 * @method _restoreMinWidth
 * @param oColumn {YAHOO.widget.Column} Which Column.
 * @private
 */
_restoreMinWidth : function(oColumn) {
    if(oColumn.minWidth && (oColumn.getKeyIndex() !== null)) {
        this._elColgroup.childNodes[oColumn.getKeyIndex()].style.width = oColumn.minWidth + 'px';
    }
},

/**
 * Hides given Column. NOTE: You cannot hide/show nested Columns. You can only
 * hide/show non-nested Columns, and top-level parent Columns (which will
 * hide/show all children Columns).
 *
 * @method hideColumn
 * @param oColumn {YAHOO.widget.Column | HTMLElement | String | Number} Column
 * instance, TH/TD element (or child of a TH/TD element), a Column key, or a
 * ColumnSet key index.
 */
hideColumn : function(oColumn) {
    if(!(oColumn instanceof YAHOO.widget.Column)) {
        oColumn = this.getColumn(oColumn);
    }
    // Only top-level Columns can get hidden due to issues in FF2 and SF3
    if(oColumn && !oColumn.hidden && oColumn.getTreeIndex() !== null) {
        
        var allrows = this.getTbodyEl().rows;
        var l = allrows.length;
        var allDescendants = this._oColumnSet.getDescendants(oColumn);
        
        // Hide each nested Column
        for(var i=0, len=allDescendants.length; i<len; i++) {
            var thisColumn = allDescendants[i];
            thisColumn.hidden = true;

            // Style the head cell
            Dom.addClass(thisColumn.getThEl(), DT.CLASS_HIDDEN);
            
            // Does this Column have body cells?
            var thisKeyIndex = thisColumn.getKeyIndex();
            if(thisKeyIndex !== null) {                    
                // Clear minWidth
                this._clearMinWidth(oColumn);
                
                // Style the body cells
                for(var j=0;j<l;j++) {
                    Dom.addClass(allrows[j].cells[thisKeyIndex],DT.CLASS_HIDDEN);
                }
            }
            
            this.fireEvent("columnHideEvent",{column:thisColumn});
        }
      
        this._repaintOpera();
        this._clearTrTemplateEl();
    }
    else {
    }
},

/**
 * Shows given Column. NOTE: You cannot hide/show nested Columns. You can only
 * hide/show non-nested Columns, and top-level parent Columns (which will
 * hide/show all children Columns).
 *
 * @method showColumn
 * @param oColumn {YAHOO.widget.Column | HTMLElement | String | Number} Column
 * instance, TH/TD element (or child of a TH/TD element), a Column key, or a
 * ColumnSet key index.
 */
showColumn : function(oColumn) {
    if(!(oColumn instanceof YAHOO.widget.Column)) {
        oColumn = this.getColumn(oColumn);
    }
    // Only top-level Columns can get hidden
    if(oColumn && oColumn.hidden && (oColumn.getTreeIndex() !== null)) {
        var allrows = this.getTbodyEl().rows;
        var l = allrows.length;
        var allDescendants = this._oColumnSet.getDescendants(oColumn);
        
        // Show each nested Column
        for(var i=0, len=allDescendants.length; i<len; i++) {
            var thisColumn = allDescendants[i];
            thisColumn.hidden = false;
            
            // Unstyle the head cell
            Dom.removeClass(thisColumn.getThEl(), DT.CLASS_HIDDEN);

            // Does this Column have body cells?
            var thisKeyIndex = thisColumn.getKeyIndex();
            if(thisKeyIndex !== null) {
                // Restore minWidth
                this._restoreMinWidth(oColumn);
                
            
                // Unstyle the body cells
                for(var j=0;j<l;j++) {
                    Dom.removeClass(allrows[j].cells[thisKeyIndex],DT.CLASS_HIDDEN);
                }
            }

            this.fireEvent("columnShowEvent",{column:thisColumn});
        }
        this._clearTrTemplateEl();
    }
    else {
    }
},

/**
 * Removes given Column. NOTE: You cannot remove nested Columns. You can only remove
 * non-nested Columns, and top-level parent Columns (which will remove all
 * children Columns).
 *
 * @method removeColumn
 * @param oColumn {YAHOO.widget.Column} Column instance.
 * @return oColumn {YAHOO.widget.Column} Removed Column instance.
 */
removeColumn : function(oColumn) {
    // Validate Column
    if(!(oColumn instanceof YAHOO.widget.Column)) {
        oColumn = this.getColumn(oColumn);
    }
    if(oColumn) {
        var nColTreeIndex = oColumn.getTreeIndex();
        if(nColTreeIndex !== null) {
            // Which key index(es)
            var i, len,
                aKeyIndexes = oColumn.getKeyIndex();
            // Must be a parent Column
            if(aKeyIndexes === null) {
                var descKeyIndexes = [];
                var allDescendants = this._oColumnSet.getDescendants(oColumn);
                for(i=0, len=allDescendants.length; i<len; i++) {
                    // Is this descendant a key Column?
                    var thisKey = allDescendants[i].getKeyIndex();
                    if(thisKey !== null) {
                        descKeyIndexes[descKeyIndexes.length] = thisKey;
                    }
                }
                if(descKeyIndexes.length > 0) {
                    aKeyIndexes = descKeyIndexes;
                }
            }
            // Must be a key Column
            else {
                aKeyIndexes = [aKeyIndexes];
            }
            
            if(aKeyIndexes !== null) {
                // Sort the indexes so we can remove from the right
                aKeyIndexes.sort(function(a, b) {return YAHOO.util.Sort.compare(a, b);});
                
                // Destroy previous THEAD
                this._destroyTheadEl();
    
                // Create new THEAD
                var aOrigColumnDefs = this._oColumnSet.getDefinitions();
                oColumn = aOrigColumnDefs.splice(nColTreeIndex,1)[0];
                this._initColumnSet(aOrigColumnDefs);
                this._initTheadEl();
                
                // Remove COL
                for(i=aKeyIndexes.length-1; i>-1; i--) {
                    this._removeColgroupColEl(aKeyIndexes[i]);
                }
                
                // Remove TD
                var allRows = this._elTbody.rows;
                if(allRows.length > 0) {
                    var loopN = this.get("renderLoopSize"),
                        loopEnd = allRows.length;
                    this._oChainRender.add({
                        method: function(oArg) {
                            if((this instanceof DT) && this._sId) {
                                var i = oArg.nCurrentRow,
                                    len = loopN > 0 ? Math.min(i + loopN,allRows.length) : allRows.length,
                                    aIndexes = oArg.aIndexes,
                                    j;
                                for(; i < len; ++i) {
                                    for(j = aIndexes.length-1; j>-1; j--) {
                                        allRows[i].removeChild(allRows[i].childNodes[aIndexes[j]]);
                                    }
                                }
                                oArg.nCurrentRow = i;
                            }
                        },
                        iterations: (loopN > 0) ? Math.ceil(loopEnd/loopN) : 1,
                        argument: {nCurrentRow:0, aIndexes:aKeyIndexes},
                        scope: this,
                        timeout: (loopN > 0) ? 0 : -1
                    });
                    this._runRenderChain();
                }
        
                this.fireEvent("columnRemoveEvent",{column:oColumn});
                return oColumn;
            }
        }
    }
},

/**
 * Inserts given Column at the index if given, otherwise at the end. NOTE: You
 * can only add non-nested Columns and top-level parent Columns. You cannot add
 * a nested Column to an existing parent.
 *
 * @method insertColumn
 * @param oColumn {Object | YAHOO.widget.Column} Object literal Column
 * definition or a Column instance.
 * @param index {Number} (optional) New tree index.
 * @return oColumn {YAHOO.widget.Column} Inserted Column instance. 
 */
insertColumn : function(oColumn, index) {
    // Validate Column
    if(oColumn instanceof YAHOO.widget.Column) {
        oColumn = oColumn.getDefinition();
    }
    else if(oColumn.constructor !== Object) {
        return;
    }
    
    // Validate index or append new Column to the end of the ColumnSet
    var oColumnSet = this._oColumnSet;
    if(!lang.isValue(index) || !lang.isNumber(index)) {
        index = oColumnSet.tree[0].length;
    }
    
    // Destroy previous THEAD
    this._destroyTheadEl();
    
    // Create new THEAD
    var aNewColumnDefs = this._oColumnSet.getDefinitions();
    aNewColumnDefs.splice(index, 0, oColumn);
    this._initColumnSet(aNewColumnDefs);
    this._initTheadEl();
    
    // Need to refresh the reference
    oColumnSet = this._oColumnSet;
    var oNewColumn = oColumnSet.tree[0][index];
    
    // Get key index(es) for new Column
    var i, len,
        descKeyIndexes = [];
    var allDescendants = oColumnSet.getDescendants(oNewColumn);
    for(i=0, len=allDescendants.length; i<len; i++) {
        // Is this descendant a key Column?
        var thisKey = allDescendants[i].getKeyIndex();
        if(thisKey !== null) {
            descKeyIndexes[descKeyIndexes.length] = thisKey;
        }
    }
    
    if(descKeyIndexes.length > 0) {  
        // Sort the indexes
        var newIndex = descKeyIndexes.sort(function(a, b) {return YAHOO.util.Sort.compare(a, b);})[0];
        
        // Add COL
        for(i=descKeyIndexes.length-1; i>-1; i--) {
            this._insertColgroupColEl(descKeyIndexes[i]);
        }
            
        // Add TD
        var allRows = this._elTbody.rows;
        if(allRows.length > 0) {
            var loopN = this.get("renderLoopSize"),
                loopEnd = allRows.length;
            
            // Get templates for each new TD
            var aTdTemplates = [],
                elTdTemplate;
            for(i=0, len=descKeyIndexes.length; i<len; i++) {
                var thisKeyIndex = descKeyIndexes[i];
                elTdTemplate = this._getTrTemplateEl().childNodes[i].cloneNode(true);
                elTdTemplate = this._formatTdEl(this._oColumnSet.keys[thisKeyIndex], elTdTemplate, thisKeyIndex, (thisKeyIndex===this._oColumnSet.keys.length-1));
                aTdTemplates[thisKeyIndex] = elTdTemplate;
            }
            
            this._oChainRender.add({
                method: function(oArg) {
                    if((this instanceof DT) && this._sId) {
                        var i = oArg.nCurrentRow, j,
                            descKeyIndexes = oArg.descKeyIndexes,
                            len = loopN > 0 ? Math.min(i + loopN,allRows.length) : allRows.length,
                            nextSibling;
                        for(; i < len; ++i) {
                            nextSibling = allRows[i].childNodes[newIndex] || null;
                            for(j=descKeyIndexes.length-1; j>-1; j--) {
                                allRows[i].insertBefore(oArg.aTdTemplates[descKeyIndexes[j]].cloneNode(true), nextSibling);
                            }
                        }
                        oArg.nCurrentRow = i;
                    }
                },
                iterations: (loopN > 0) ? Math.ceil(loopEnd/loopN) : 1,
                argument: {nCurrentRow:0,aTdTemplates:aTdTemplates,descKeyIndexes:descKeyIndexes},
                scope: this,
                timeout: (loopN > 0) ? 0 : -1
            });
            this._runRenderChain(); 
        }

        this.fireEvent("columnInsertEvent",{column:oColumn,index:index});
        return oNewColumn;
    }
},

/**
 * Removes given Column and inserts into given tree index. NOTE: You
 * can only reorder non-nested Columns and top-level parent Columns. You cannot
 * reorder a nested Column to an existing parent.
 *
 * @method reorderColumn
 * @param oColumn {YAHOO.widget.Column} Column instance.
 * @param index {Number} New tree index.
 * @return oColumn {YAHOO.widget.Column} Reordered Column instance. 
 */
reorderColumn : function(oColumn, index) {
    // Validate Column and new index
    if(!(oColumn instanceof YAHOO.widget.Column)) {
        oColumn = this.getColumn(oColumn);
    }
    if(oColumn && YAHOO.lang.isNumber(index)) {
        var nOrigTreeIndex = oColumn.getTreeIndex();
        if((nOrigTreeIndex !== null) && (nOrigTreeIndex !== index)) {
            // Which key index(es)
            var i, len,
                aOrigKeyIndexes = oColumn.getKeyIndex(),
                allDescendants,
                descKeyIndexes = [],
                thisKey;
            // Must be a parent Column...
            if(aOrigKeyIndexes === null) {
                allDescendants = this._oColumnSet.getDescendants(oColumn);
                for(i=0, len=allDescendants.length; i<len; i++) {
                    // Is this descendant a key Column?
                    thisKey = allDescendants[i].getKeyIndex();
                    if(thisKey !== null) {
                        descKeyIndexes[descKeyIndexes.length] = thisKey;
                    }
                }
                if(descKeyIndexes.length > 0) {
                    aOrigKeyIndexes = descKeyIndexes;
                }
            }
            // ...or else must be a key Column
            else {
                aOrigKeyIndexes = [aOrigKeyIndexes];
            }
            
            if(aOrigKeyIndexes !== null) {                   
                // Sort the indexes
                aOrigKeyIndexes.sort(function(a, b) {return YAHOO.util.Sort.compare(a, b);});
                
                // Destroy previous THEAD
                this._destroyTheadEl();
    
                // Create new THEAD
                var aColumnDefs = this._oColumnSet.getDefinitions();
                var oColumnDef = aColumnDefs.splice(nOrigTreeIndex,1)[0];
                aColumnDefs.splice(index, 0, oColumnDef);
                this._initColumnSet(aColumnDefs);
                this._initTheadEl();
                
                // Need to refresh the reference
                var oNewColumn = this._oColumnSet.tree[0][index];

                // What are new key index(es)
                var aNewKeyIndexes = oNewColumn.getKeyIndex();
                // Must be a parent Column
                if(aNewKeyIndexes === null) {
                    descKeyIndexes = [];
                    allDescendants = this._oColumnSet.getDescendants(oNewColumn);
                    for(i=0, len=allDescendants.length; i<len; i++) {
                        // Is this descendant a key Column?
                        thisKey = allDescendants[i].getKeyIndex();
                        if(thisKey !== null) {
                            descKeyIndexes[descKeyIndexes.length] = thisKey;
                        }
                    }
                    if(descKeyIndexes.length > 0) {
                        aNewKeyIndexes = descKeyIndexes;
                    }
                }
                // Must be a key Column
                else {
                    aNewKeyIndexes = [aNewKeyIndexes];
                }
                
                // Sort the new indexes and grab the first one for the new location
                var newIndex = aNewKeyIndexes.sort(function(a, b) {return YAHOO.util.Sort.compare(a, b);})[0];

                // Reorder COL
                this._reorderColgroupColEl(aOrigKeyIndexes, newIndex);
                
                // Reorder TD
                var allRows = this._elTbody.rows;
                if(allRows.length > 0) {
                    var loopN = this.get("renderLoopSize"),
                        loopEnd = allRows.length;
                    this._oChainRender.add({
                        method: function(oArg) {
                            if((this instanceof DT) && this._sId) {
                                var i = oArg.nCurrentRow, j, tmpTds, nextSibling,
                                    len = loopN > 0 ? Math.min(i + loopN,allRows.length) : allRows.length,
                                    aIndexes = oArg.aIndexes, thisTr;
                                // For each row
                                for(; i < len; ++i) {
                                    tmpTds = [];
                                    thisTr = allRows[i];
                                    
                                    // Remove each TD
                                    for(j=aIndexes.length-1; j>-1; j--) {
                                        tmpTds.push(thisTr.removeChild(thisTr.childNodes[aIndexes[j]]));
                                    }
                                    
                                    // Insert each TD
                                    nextSibling = thisTr.childNodes[newIndex] || null;
                                    for(j=tmpTds.length-1; j>-1; j--) {
                                        thisTr.insertBefore(tmpTds[j], nextSibling);
                                    }                                    
                                }
                                oArg.nCurrentRow = i;
                            }
                        },
                        iterations: (loopN > 0) ? Math.ceil(loopEnd/loopN) : 1,
                        argument: {nCurrentRow:0, aIndexes:aOrigKeyIndexes},
                        scope: this,
                        timeout: (loopN > 0) ? 0 : -1
                    });
                    this._runRenderChain();
                }
        
                this.fireEvent("columnReorderEvent",{column:oNewColumn, oldIndex:nOrigTreeIndex});
                return oNewColumn;
            }
        }
    }
},

/**
 * Selects given Column. NOTE: You cannot select/unselect nested Columns. You can only
 * select/unselect non-nested Columns, and bottom-level key Columns.
 *
 * @method selectColumn
 * @param column {HTMLElement | String | Number} DOM reference or ID string to a
 * TH/TD element (or child of a TH/TD element), a Column key, or a ColumnSet key index.
 */
selectColumn : function(oColumn) {
    oColumn = this.getColumn(oColumn);
    if(oColumn && !oColumn.selected) {
        // Only bottom-level Columns can get hidden
        if(oColumn.getKeyIndex() !== null) {
            oColumn.selected = true;
            
            // Update head cell
            var elTh = oColumn.getThEl();
            Dom.addClass(elTh,DT.CLASS_SELECTED);

            // Update body cells
            var allRows = this.getTbodyEl().rows;
            var oChainRender = this._oChainRender;
            oChainRender.add({
                method: function(oArg) {
                    if((this instanceof DT) && this._sId && allRows[oArg.rowIndex] && allRows[oArg.rowIndex].cells[oArg.cellIndex]) {
                        Dom.addClass(allRows[oArg.rowIndex].cells[oArg.cellIndex],DT.CLASS_SELECTED);                    
                    }
                    oArg.rowIndex++;
                },
                scope: this,
                iterations: allRows.length,
                argument: {rowIndex:0,cellIndex:oColumn.getKeyIndex()}
            });

            this._clearTrTemplateEl();
            
            this._elTbody.style.display = "none";
            this._runRenderChain();
            this._elTbody.style.display = "";      
            
            this.fireEvent("columnSelectEvent",{column:oColumn});
        }
        else {
        }
    }
},

/**
 * Unselects given Column. NOTE: You cannot select/unselect nested Columns. You can only
 * select/unselect non-nested Columns, and bottom-level key Columns.
 *
 * @method unselectColumn
 * @param column {HTMLElement | String | Number} DOM reference or ID string to a
 * TH/TD element (or child of a TH/TD element), a Column key, or a ColumnSet key index.
 */
unselectColumn : function(oColumn) {
    oColumn = this.getColumn(oColumn);
    if(oColumn && oColumn.selected) {
        // Only bottom-level Columns can get hidden
        if(oColumn.getKeyIndex() !== null) {
            oColumn.selected = false;
            
            // Update head cell
            var elTh = oColumn.getThEl();
            Dom.removeClass(elTh,DT.CLASS_SELECTED);

            // Update body cells
            var allRows = this.getTbodyEl().rows;
            var oChainRender = this._oChainRender;
            oChainRender.add({
                method: function(oArg) {
                    if((this instanceof DT) && this._sId && allRows[oArg.rowIndex] && allRows[oArg.rowIndex].cells[oArg.cellIndex]) {
                        Dom.removeClass(allRows[oArg.rowIndex].cells[oArg.cellIndex],DT.CLASS_SELECTED); 
                    }                   
                    oArg.rowIndex++;
                },
                scope: this,
                iterations:allRows.length,
                argument: {rowIndex:0,cellIndex:oColumn.getKeyIndex()}
            });
            
            this._clearTrTemplateEl();

            this._elTbody.style.display = "none";
            this._runRenderChain();
            this._elTbody.style.display = "";      
            
            this.fireEvent("columnUnselectEvent",{column:oColumn});
        }
        else {
        }
    }
},

/**
 * Returns an array selected Column instances.
 *
 * @method getSelectedColumns
 * @return {YAHOO.widget.Column[]} Array of Column instances.
 */
getSelectedColumns : function(oColumn) {
    var selectedColumns = [];
    var aKeys = this._oColumnSet.keys;
    for(var i=0,len=aKeys.length; i<len; i++) {
        if(aKeys[i].selected) {
            selectedColumns[selectedColumns.length] = aKeys[i];
        }
    }
    return selectedColumns;
},

/**
 * Assigns the class YAHOO.widget.DataTable.CLASS_HIGHLIGHTED to cells of the given Column.
 * NOTE: You cannot highlight/unhighlight nested Columns. You can only
 * highlight/unhighlight non-nested Columns, and bottom-level key Columns.
 *
 * @method highlightColumn
 * @param column {HTMLElement | String | Number} DOM reference or ID string to a
 * TH/TD element (or child of a TH/TD element), a Column key, or a ColumnSet key index.
 */
highlightColumn : function(column) {
    var oColumn = this.getColumn(column);
    // Only bottom-level Columns can get highlighted
    if(oColumn && (oColumn.getKeyIndex() !== null)) {            
        // Update head cell
        var elTh = oColumn.getThEl();
        Dom.addClass(elTh,DT.CLASS_HIGHLIGHTED);

        // Update body cells
        var allRows = this.getTbodyEl().rows;
        var oChainRender = this._oChainRender;
        oChainRender.add({
            method: function(oArg) {
                if((this instanceof DT) && this._sId && allRows[oArg.rowIndex] && allRows[oArg.rowIndex].cells[oArg.cellIndex]) {
                    Dom.addClass(allRows[oArg.rowIndex].cells[oArg.cellIndex],DT.CLASS_HIGHLIGHTED);   
                }                 
                oArg.rowIndex++;
            },
            scope: this,
            iterations:allRows.length,
            argument: {rowIndex:0,cellIndex:oColumn.getKeyIndex()},
            timeout: -1
        });
        this._elTbody.style.display = "none";
        this._runRenderChain();
        this._elTbody.style.display = "";      
            
        this.fireEvent("columnHighlightEvent",{column:oColumn});
    }
    else {
    }
},

/**
 * Removes the class YAHOO.widget.DataTable.CLASS_HIGHLIGHTED to cells of the given Column.
 * NOTE: You cannot highlight/unhighlight nested Columns. You can only
 * highlight/unhighlight non-nested Columns, and bottom-level key Columns.
 *
 * @method unhighlightColumn
 * @param column {HTMLElement | String | Number} DOM reference or ID string to a
 * TH/TD element (or child of a TH/TD element), a Column key, or a ColumnSet key index.
 */
unhighlightColumn : function(column) {
    var oColumn = this.getColumn(column);
    // Only bottom-level Columns can get highlighted
    if(oColumn && (oColumn.getKeyIndex() !== null)) {
        // Update head cell
        var elTh = oColumn.getThEl();
        Dom.removeClass(elTh,DT.CLASS_HIGHLIGHTED);

        // Update body cells
        var allRows = this.getTbodyEl().rows;
        var oChainRender = this._oChainRender;
        oChainRender.add({
            method: function(oArg) {
                if((this instanceof DT) && this._sId && allRows[oArg.rowIndex] && allRows[oArg.rowIndex].cells[oArg.cellIndex]) {
                    Dom.removeClass(allRows[oArg.rowIndex].cells[oArg.cellIndex],DT.CLASS_HIGHLIGHTED);
                }                 
                oArg.rowIndex++;
            },
            scope: this,
            iterations:allRows.length,
            argument: {rowIndex:0,cellIndex:oColumn.getKeyIndex()},
            timeout: -1
        });
        this._elTbody.style.display = "none";
        this._runRenderChain();
        this._elTbody.style.display = "";     
            
        this.fireEvent("columnUnhighlightEvent",{column:oColumn});
    }
    else {
    }
},












































// ROW FUNCTIONS

/**
 * Adds one new Record of data into the RecordSet at the index if given,
 * otherwise at the end. If the new Record is in page view, the
 * corresponding DOM elements are also updated.
 *
 * @method addRow
 * @param oData {Object} Object literal of data for the row.
 * @param index {Number} (optional) RecordSet position index at which to add data.
 */
addRow : function(oData, index) {
    if(lang.isNumber(index) && (index < 0 || index > this._oRecordSet.getLength())) {
        return;
    }

    if(oData && lang.isObject(oData)) {
        var oRecord = this._oRecordSet.addRecord(oData, index);
        if(oRecord) {
            var recIndex;
            var oPaginator = this.get('paginator');

            // Paginated
            if (oPaginator) {     
                // Update the paginator's totalRecords
                var totalRecords = oPaginator.get('totalRecords');
                if (totalRecords !== widget.Paginator.VALUE_UNLIMITED) {
                    oPaginator.set('totalRecords',totalRecords + 1);
                }

                recIndex = this.getRecordIndex(oRecord);
                var endRecIndex = (oPaginator.getPageRecords())[1];

                // New record affects the view
                if (recIndex <= endRecIndex) {
                    // Defer UI updates to the render method
                    this.render();
                }
                
                this.fireEvent("rowAddEvent", {record:oRecord});
                return;
            }
            // Not paginated
            else {
                recIndex = this.getRecordIndex(oRecord);
                if(lang.isNumber(recIndex)) {
                    // Add the TR element
                    this._oChainRender.add({
                        method: function(oArg) {
                            if((this instanceof DT) && this._sId) {
                                var oRecord = oArg.record;
                                var recIndex = oArg.recIndex;
                                var elNewTr = this._addTrEl(oRecord);
                                if(elNewTr) {
                                    var elNext = (this._elTbody.rows[recIndex]) ? this._elTbody.rows[recIndex] : null;
                                    this._elTbody.insertBefore(elNewTr, elNext);

                                    // Set FIRST/LAST
                                    if(recIndex === 0) {
                                        this._setFirstRow();
                                    }
                                    if(elNext === null) {
                                        this._setLastRow();
                                    }
                                    // Set EVEN/ODD
                                    this._setRowStripes();                           
                                    
                                    this.hideTableMessage();
            
                                    this.fireEvent("rowAddEvent", {record:oRecord});
                                }
                            }
                        },
                        argument: {record: oRecord, recIndex: recIndex},
                        scope: this,
                        timeout: (this.get("renderLoopSize") > 0) ? 0 : -1
                    });
                    this._runRenderChain();
                    return;
                }
            }            
        }
    }
},

/**
 * Convenience method to add multiple rows.
 *
 * @method addRows
 * @param aData {Object[]} Array of object literal data for the rows.
 * @param index {Number} (optional) RecordSet position index at which to add data.
 */
addRows : function(aData, index) {
    if(lang.isNumber(index) && (index < 0 || index > this._oRecordSet.getLength())) {
        return;
    }

    if(lang.isArray(aData)) {
        var aRecords = this._oRecordSet.addRecords(aData, index);
        if(aRecords) {
            var recIndex = this.getRecordIndex(aRecords[0]);
            
            // Paginated
            var oPaginator = this.get('paginator');
            if (oPaginator) {
                // Update the paginator's totalRecords
                var totalRecords = oPaginator.get('totalRecords');
                if (totalRecords !== widget.Paginator.VALUE_UNLIMITED) {
                    oPaginator.set('totalRecords',totalRecords + aRecords.length);
                }
    
                var endRecIndex = (oPaginator.getPageRecords())[1];

                // At least one of the new records affects the view
                if (recIndex <= endRecIndex) {
                    this.render();
                }
                
                this.fireEvent("rowsAddEvent", {records:aRecords});
                return;
            }
            // Not paginated
            else {
                // Add the TR elements
                var loopN = this.get("renderLoopSize");
                var loopEnd = recIndex + aData.length;
                var nRowsNeeded = (loopEnd - recIndex); // how many needed
                var isLast = (recIndex >= this._elTbody.rows.length);
                this._oChainRender.add({
                    method: function(oArg) {
                        if((this instanceof DT) && this._sId) {
                            var aRecords = oArg.aRecords,
                                i = oArg.nCurrentRow,
                                j = oArg.nCurrentRecord,
                                len = loopN > 0 ? Math.min(i + loopN,loopEnd) : loopEnd,
                                df = document.createDocumentFragment(),
                                elNext = (this._elTbody.rows[i]) ? this._elTbody.rows[i] : null;
                            for(; i < len; i++, j++) {
                                df.appendChild(this._addTrEl(aRecords[j]));
                            }
                            this._elTbody.insertBefore(df, elNext);
                            oArg.nCurrentRow = i;
                            oArg.nCurrentRecord = j;
                        }
                    },
                    iterations: (loopN > 0) ? Math.ceil(loopEnd/loopN) : 1,
                    argument: {nCurrentRow:recIndex,nCurrentRecord:0,aRecords:aRecords},
                    scope: this,
                    timeout: (loopN > 0) ? 0 : -1
                });
                this._oChainRender.add({
                    method: function(oArg) {
                        var recIndex = oArg.recIndex;
                        // Set FIRST/LAST
                        if(recIndex === 0) {
                            this._setFirstRow();
                        }
                        if(oArg.isLast) {
                            this._setLastRow();
                        }
                        // Set EVEN/ODD
                        this._setRowStripes();                           

                        this.fireEvent("rowsAddEvent", {records:aRecords});
                    },
                    argument: {recIndex: recIndex, isLast: isLast},
                    scope: this,
                    timeout: -1 // Needs to run immediately after the DOM insertions above
                });
                this._runRenderChain();
                this.hideTableMessage();                
                return;
            }            
        }
    }
},

/**
 * For the given row, updates the associated Record with the given data. If the
 * row is on current page, the corresponding DOM elements are also updated.
 *
 * @method updateRow
 * @param row {YAHOO.widget.Record | Number | HTMLElement | String}
 * Which row to update: By Record instance, by Record's RecordSet
 * position index, by HTMLElement reference to the TR element, or by ID string
 * of the TR element.
 * @param oData {Object} Object literal of data for the row.
 */
updateRow : function(row, oData) {
    var index = row;
    if (!lang.isNumber(index)) {
        index = this.getRecordIndex(row);
    }

    // Update the Record
    if(lang.isNumber(index) && (index >= 0)) {
        var oRecordSet = this._oRecordSet,
            oldRecord = oRecordSet.getRecord(index);

        if(oldRecord) {
            var updatedRecord = this._oRecordSet.setRecord(oData, index),
                elRow = this.getTrEl(oldRecord),
                // Copy data from the Record for the event that gets fired later
                oldData = oldRecord ? oldRecord.getData() : null;

            if(updatedRecord) {
                // Update selected rows as necessary
                var tracker = this._aSelections || [],
                i=0,
                oldId = oldRecord.getId(),
                newId = updatedRecord.getId();
                for(; i<tracker.length; i++) {
                    if((tracker[i] === oldId)) {
                        tracker[i] = newId;
                    }
                    else if(tracker[i].recordId === oldId) {
                        tracker[i].recordId = newId;
                    }
                }

                // Update anchors as necessary
                if(this._oAnchorRecord && this._oAnchorRecord.getId() === oldId) {
                    this._oAnchorRecord = updatedRecord;
                }
                if(this._oAnchorCell && this._oAnchorCell.record.getId() === oldId) {
                    this._oAnchorCell.record = updatedRecord;
                }

                // Update the TR only if row is on current page
                this._oChainRender.add({
                    method: function() {
                        if((this instanceof DT) && this._sId) {
                            // Paginated
                            var oPaginator = this.get('paginator');
                            if (oPaginator) {
                                var pageStartIndex = (oPaginator.getPageRecords())[0],
                                    pageLastIndex = (oPaginator.getPageRecords())[1];

                                // At least one of the new records affects the view
                                if ((index >= pageStartIndex) || (index <= pageLastIndex)) {
                                    this.render();
                                }
                            }
                            else {
                                if(elRow) {
                                    this._updateTrEl(elRow, updatedRecord);
                                }
                                else {
                                    this.getTbodyEl().appendChild(this._addTrEl(updatedRecord));
                                }
                            }
                            this.fireEvent("rowUpdateEvent", {record:updatedRecord, oldData:oldData});
                        }
                    },
                    scope: this,
                    timeout: (this.get("renderLoopSize") > 0) ? 0 : -1
                });
                this._runRenderChain();
                return;
            }
        }
    }
    return;
},

/**
 * Starting with the given row, updates associated Records with the given data.
 * The number of rows to update are determined by the array of data provided.
 * Undefined data (i.e., not an object literal) causes a row to be skipped. If
 * any of the rows are on current page, the corresponding DOM elements are also
 * updated.
 *
 * @method updateRows
 * @param startrow {YAHOO.widget.Record | Number | HTMLElement | String}
 * Starting row to update: By Record instance, by Record's RecordSet
 * position index, by HTMLElement reference to the TR element, or by ID string
 * of the TR element.
 * @param aData {Object[]} Array of object literal of data for the rows.
 */
updateRows : function(startrow, aData) {
    if(lang.isArray(aData)) {
        var startIndex = startrow,
            oRecordSet = this._oRecordSet,
            lastRowIndex = oRecordSet.getLength();

        if (!lang.isNumber(startrow)) {
            startIndex = this.getRecordIndex(startrow);
        }
            
        if(lang.isNumber(startIndex) && (startIndex >= 0) && (startIndex < oRecordSet.getLength())) {
            var lastIndex = startIndex + aData.length,
                aOldRecords = oRecordSet.getRecords(startIndex, aData.length),
                aNewRecords = oRecordSet.setRecords(aData, startIndex);
            if(aNewRecords) {
                var tracker = this._aSelections || [],
                    i=0, j, newRecord, newId, oldId,
                    anchorRecord = this._oAnchorRecord ? this._oAnchorRecord.getId() : null,
                    anchorCell = this._oAnchorCell ? this._oAnchorCell.record.getId() : null;
                for(; i<aOldRecords.length; i++) {
                    oldId = aOldRecords[i].getId();
                    newRecord = aNewRecords[i];
                    newId = newRecord.getId();

                    // Update selected rows as necessary
                    for(j=0; j<tracker.length; j++) {
                        if((tracker[j] === oldId)) {
                            tracker[j] = newId;
                        }
                        else if(tracker[j].recordId === oldId) {
                            tracker[j].recordId = newId;
                        }
                    }

                    // Update anchors as necessary
                    if(anchorRecord && anchorRecord === oldId) {
                        this._oAnchorRecord = newRecord;
                    }
                    if(anchorCell && anchorCell === oldId) {
                        this._oAnchorCell.record = newRecord;
                    }
               }

                // Paginated
                var oPaginator = this.get('paginator');
                if (oPaginator) {
                    var pageStartIndex = (oPaginator.getPageRecords())[0],
                        pageLastIndex = (oPaginator.getPageRecords())[1];
    
                    // At least one of the new records affects the view
                    if ((startIndex >= pageStartIndex) || (lastIndex <= pageLastIndex)) {
                        this.render();
                    }

                    this.fireEvent("rowsAddEvent", {newRecords:aNewRecords, oldRecords:aOldRecords});
                    return;
                }
                // Not paginated
                else {
                    // Update the TR elements
                    var loopN = this.get("renderLoopSize"),
                        rowCount = aData.length, // how many needed
                        isLast = (lastIndex >= lastRowIndex),
                        isAdding = (lastIndex > lastRowIndex);
                                           
                    this._oChainRender.add({
                        method: function(oArg) {
                            if((this instanceof DT) && this._sId) {
                                var aRecords = oArg.aRecords,
                                    i = oArg.nCurrentRow,
                                    j = oArg.nDataPointer,
                                    len = loopN > 0 ? Math.min(i+loopN, startIndex+aRecords.length) : startIndex+aRecords.length;
                                    
                                for(; i < len; i++,j++) {
                                    if(isAdding && (i>=lastRowIndex)) {
                                        this._elTbody.appendChild(this._addTrEl(aRecords[j]));
                                    }
                                    else {
                                        this._updateTrEl(this._elTbody.rows[i], aRecords[j]);
                                    }
                                }
                                oArg.nCurrentRow = i;
                                oArg.nDataPointer = j;
                            }
                        },
                        iterations: (loopN > 0) ? Math.ceil(rowCount/loopN) : 1,
                        argument: {nCurrentRow:startIndex,aRecords:aNewRecords,nDataPointer:0,isAdding:isAdding},
                        scope: this,
                        timeout: (loopN > 0) ? 0 : -1
                    });
                    this._oChainRender.add({
                        method: function(oArg) {
                            var recIndex = oArg.recIndex;
                            // Set FIRST/LAST
                            if(recIndex === 0) {
                                this._setFirstRow();
                            }
                            if(oArg.isLast) {
                                this._setLastRow();
                            }
                            // Set EVEN/ODD
                            this._setRowStripes();                           
    
                            this.fireEvent("rowsAddEvent", {newRecords:aNewRecords, oldRecords:aOldRecords});
                        },
                        argument: {recIndex: startIndex, isLast: isLast},
                        scope: this,
                        timeout: -1 // Needs to run immediately after the DOM insertions above
                    });
                    this._runRenderChain();
                    this.hideTableMessage();                
                    return;
                }            
            }
        }
    }
},

/**
 * Deletes the given row's Record from the RecordSet. If the row is on current page,
 * the corresponding DOM elements are also deleted.
 *
 * @method deleteRow
 * @param row {HTMLElement | String | Number} DOM element reference or ID string
 * to DataTable page element or RecordSet index.
 */
deleteRow : function(row) {
    var nRecordIndex = (lang.isNumber(row)) ? row : this.getRecordIndex(row);
    if(lang.isNumber(nRecordIndex)) {
        var oRecord = this.getRecord(nRecordIndex);
        if(oRecord) {
            var nTrIndex = this.getTrIndex(nRecordIndex);
            
            // Remove from selection tracker if there
            var sRecordId = oRecord.getId();
            var tracker = this._aSelections || [];
            for(var j=tracker.length-1; j>-1; j--) {
                if((lang.isString(tracker[j]) && (tracker[j] === sRecordId)) ||
                        (lang.isObject(tracker[j]) && (tracker[j].recordId === sRecordId))) {
                    tracker.splice(j,1);
                }
            }
    
            // Delete Record from RecordSet
            var oData = this._oRecordSet.deleteRecord(nRecordIndex);
    
            // Update the UI
            if(oData) {
                // If paginated and the deleted row was on this or a prior page, just
                // re-render
                var oPaginator = this.get('paginator');
                if (oPaginator) {
                    // Update the paginator's totalRecords
                    var totalRecords = oPaginator.get('totalRecords'),
                        // must capture before the totalRecords change because
                        // Paginator shifts to previous page automatically
                        rng = oPaginator.getPageRecords();

                    if (totalRecords !== widget.Paginator.VALUE_UNLIMITED) {
                        oPaginator.set('totalRecords',totalRecords - 1);
                    }
    
                    // The deleted record was on this or a prior page, re-render
                    if (!rng || nRecordIndex <= rng[1]) {
                        this.render();
                    }

                    this._oChainRender.add({
                        method: function() {
                            if((this instanceof DT) && this._sId) {
                                this.fireEvent("rowDeleteEvent", {recordIndex:nRecordIndex, oldData:oData, trElIndex:nTrIndex});
                            }
                        },
                        scope: this,
                        timeout: (this.get("renderLoopSize") > 0) ? 0 : -1
                    });
                    this._runRenderChain();
                }
                // Not paginated
                else {
                    if(lang.isNumber(nTrIndex)) {
                        this._oChainRender.add({
                            method: function() {
                                if((this instanceof DT) && this._sId) {
                                    var isLast = (nRecordIndex === this._oRecordSet.getLength());//(nTrIndex == this.getLastTrEl().sectionRowIndex);
                                    this._deleteTrEl(nTrIndex);
                    
                                    // Post-delete tasks
                                    if(this._elTbody.rows.length > 0) {
                                        // Set FIRST/LAST
                                        if(nTrIndex === 0) {
                                            this._setFirstRow();
                                        }
                                        if(isLast) {
                                            this._setLastRow();
                                        }
                                        // Set EVEN/ODD
                                        if(nTrIndex != this._elTbody.rows.length) {
                                            this._setRowStripes(nTrIndex);
                                        }                                
                                    }
                    
                                    this.fireEvent("rowDeleteEvent", {recordIndex:nRecordIndex,oldData:oData, trElIndex:nTrIndex});
                                }
                            },
                            scope: this,
                            timeout: (this.get("renderLoopSize") > 0) ? 0 : -1
                        });
                        this._runRenderChain();
                        return;
                    }
                }
            }
        }
    }
    return null;
},

/**
 * Convenience method to delete multiple rows.
 *
 * @method deleteRows
 * @param row {HTMLElement | String | Number} DOM element reference or ID string
 * to DataTable page element or RecordSet index.
 * @param count {Number} (optional) How many rows to delete. A negative value
 * will delete towards the beginning.
 */
deleteRows : function(row, count) {
    var nRecordIndex = (lang.isNumber(row)) ? row : this.getRecordIndex(row);
    if(lang.isNumber(nRecordIndex)) {
        var oRecord = this.getRecord(nRecordIndex);
        if(oRecord) {
            var nTrIndex = this.getTrIndex(nRecordIndex);
            
            // Remove from selection tracker if there
            var sRecordId = oRecord.getId();
            var tracker = this._aSelections || [];
            for(var j=tracker.length-1; j>-1; j--) {
                if((lang.isString(tracker[j]) && (tracker[j] === sRecordId)) ||
                        (lang.isObject(tracker[j]) && (tracker[j].recordId === sRecordId))) {
                    tracker.splice(j,1);
                }
            }
    
            // Delete Record from RecordSet
            var highIndex = nRecordIndex;
            var lowIndex = nRecordIndex;
        
            // Validate count and account for negative value
            if(count && lang.isNumber(count)) {
                highIndex = (count > 0) ? nRecordIndex + count -1 : nRecordIndex;
                lowIndex = (count > 0) ? nRecordIndex : nRecordIndex + count + 1;
                count = (count > 0) ? count : count*-1;
                if(lowIndex < 0) {
                    lowIndex = 0;
                    count = highIndex - lowIndex + 1;
                }
            }
            else {
                count = 1;
            }
            
            var aData = this._oRecordSet.deleteRecords(lowIndex, count);
    
            // Update the UI
            if(aData) {
                var oPaginator = this.get('paginator'),
                    loopN = this.get("renderLoopSize");
                // If paginated and the deleted row was on this or a prior page, just
                // re-render
                if (oPaginator) {
                    // Update the paginator's totalRecords
                    var totalRecords = oPaginator.get('totalRecords'),
                        // must capture before the totalRecords change because
                        // Paginator shifts to previous page automatically
                        rng = oPaginator.getPageRecords();

                    if (totalRecords !== widget.Paginator.VALUE_UNLIMITED) {
                        oPaginator.set('totalRecords',totalRecords - aData.length);
                    }
    
                    // The records were on this or a prior page, re-render
                    if (!rng || lowIndex <= rng[1]) {
                        this.render();
                    }

                    this._oChainRender.add({
                        method: function(oArg) {
                            if((this instanceof DT) && this._sId) {
                                this.fireEvent("rowsDeleteEvent", {recordIndex:lowIndex, oldData:aData, count:count});
                            }
                        },
                        scope: this,
                        timeout: (loopN > 0) ? 0 : -1
                    });
                    this._runRenderChain();
                    return;
                }
                // Not paginated
                else {
                    if(lang.isNumber(nTrIndex)) {
                        // Delete the TR elements starting with highest index
                        var loopEnd = lowIndex;
                        var nRowsNeeded = count; // how many needed
                        this._oChainRender.add({
                            method: function(oArg) {
                                if((this instanceof DT) && this._sId) {
                                    var i = oArg.nCurrentRow,
                                        len = (loopN > 0) ? (Math.max(i - loopN,loopEnd)-1) : loopEnd-1;
                                    for(; i>len; --i) {
                                        this._deleteTrEl(i);
                                    }
                                    oArg.nCurrentRow = i;
                                }
                            },
                            iterations: (loopN > 0) ? Math.ceil(count/loopN) : 1,
                            argument: {nCurrentRow:highIndex},
                            scope: this,
                            timeout: (loopN > 0) ? 0 : -1
                        });
                        this._oChainRender.add({
                            method: function() {    
                                // Post-delete tasks
                                if(this._elTbody.rows.length > 0) {
                                    this._setFirstRow();
                                    this._setLastRow();
                                    this._setRowStripes();
                                }
                                
                                this.fireEvent("rowsDeleteEvent", {recordIndex:lowIndex, oldData:aData, count:count});
                            },
                            scope: this,
                            timeout: -1 // Needs to run immediately after the DOM deletions above
                        });
                        this._runRenderChain();
                        return;
                    }
                }
            }
        }
    }
    return null;
},














































// CELL FUNCTIONS

/**
 * Outputs markup into the given TD based on given Record.
 *
 * @method formatCell
 * @param elLiner {HTMLElement} The liner DIV element within the TD.
 * @param oRecord {YAHOO.widget.Record} (Optional) Record instance.
 * @param oColumn {YAHOO.widget.Column} (Optional) Column instance.
 */
formatCell : function(elLiner, oRecord, oColumn) {
    if(!oRecord) {
        oRecord = this.getRecord(elLiner);
    }
    if(!oColumn) {
        oColumn = this.getColumn(this.getCellIndex(elLiner.parentNode));
    }

    if(oRecord && oColumn) {
        var sField = oColumn.field;
        var oData = oRecord.getData(sField);

        var fnFormatter = typeof oColumn.formatter === 'function' ?
                          oColumn.formatter :
                          DT.Formatter[oColumn.formatter+''] ||
                          DT.Formatter.defaultFormatter;

        // Apply special formatter
        if(fnFormatter) {
            fnFormatter.call(this, elLiner, oRecord, oColumn, oData);
        }
        else {
            elLiner.innerHTML = oData;
        }

        this.fireEvent("cellFormatEvent", {record:oRecord, column:oColumn, key:oColumn.key, el:elLiner});
    }
    else {
    }
},

/**
 * For the given row and column, updates the Record with the given data. If the
 * cell is on current page, the corresponding DOM elements are also updated.
 *
 * @method updateCell
 * @param oRecord {YAHOO.widget.Record} Record instance.
 * @param oColumn {YAHOO.widget.Column | String | Number} A Column key, or a ColumnSet key index.
 * @param oData {Object} New data value for the cell.
 * @param skipRender {Boolean} Skips render step. Editors that update multiple
 * cells in ScrollingDataTable should render only on the last call to updateCell().
 */
updateCell : function(oRecord, oColumn, oData, skipRender) {
    // Validate Column and Record
    oColumn = (oColumn instanceof YAHOO.widget.Column) ? oColumn : this.getColumn(oColumn);
    if(oColumn && oColumn.getField() && (oRecord instanceof YAHOO.widget.Record)) {
        var sKey = oColumn.getField(),
        
        // Copy data from the Record for the event that gets fired later
        //var oldData = YAHOO.widget.DataTable._cloneObject(oRecord.getData());
            oldData = oRecord.getData(sKey);

        // Update Record with new data
        this._oRecordSet.updateRecordValue(oRecord, sKey, oData);
    
        // Update the TD only if row is on current page
        var elTd = this.getTdEl({record: oRecord, column: oColumn});
        if(elTd) {
            this._oChainRender.add({
                method: function() {
                    if((this instanceof DT) && this._sId) {
                        this.formatCell(elTd.firstChild, oRecord, oColumn);
                        this.fireEvent("cellUpdateEvent", {record:oRecord, column: oColumn, oldData:oldData});
                    }
                },
                scope: this,
                timeout: (this.get("renderLoopSize") > 0) ? 0 : -1
            });
            // Bug 2529024
            if(!skipRender) {
                this._runRenderChain();
            }
        }
        else {
            this.fireEvent("cellUpdateEvent", {record:oRecord, column: oColumn, oldData:oldData});
        }
    }
},



















































// PAGINATION
/**
 * Method executed during set() operation for the "paginator" attribute.
 * Adds and/or severs event listeners between DataTable and Paginator
 *
 * @method _updatePaginator
 * @param newPag {Paginator} Paginator instance (or null) for DataTable to use
 * @private
 */
_updatePaginator : function (newPag) {
    var oldPag = this.get('paginator');
    if (oldPag && newPag !== oldPag) {
        oldPag.unsubscribe('changeRequest', this.onPaginatorChangeRequest, this, true);
    }
    if (newPag) {
        newPag.subscribe('changeRequest', this.onPaginatorChangeRequest, this, true);
    }
},

/**
 * Update the UI infrastructure in response to a "paginator" attribute change.
 *
 * @method _handlePaginatorChange
 * @param e {Object} Change event object containing keys 'type','newValue',
 *                   and 'prevValue'
 * @private
 */
_handlePaginatorChange : function (e) {
    if (e.prevValue === e.newValue) { return; }

    var newPag     = e.newValue,
        oldPag     = e.prevValue,
        containers = this._defaultPaginatorContainers();

    if (oldPag) {
        if (oldPag.getContainerNodes()[0] == containers[0]) {
            oldPag.set('containers',[]);
        }
        oldPag.destroy();

        // Convenience: share the default containers if possible.
        // Otherwise, remove the default containers from the DOM.
        if (containers[0]) {
            if (newPag && !newPag.getContainerNodes().length) {
                newPag.set('containers',containers);
            } else {
                // No new Paginator to use existing containers, OR new
                // Paginator has configured containers.
                for (var i = containers.length - 1; i >= 0; --i) {
                    if (containers[i]) {
                        containers[i].parentNode.removeChild(containers[i]);
                    }
                }
            }
        }
    }

    if (!this._bInit) {
        this.render();

    }

    if (newPag) {
        this.renderPaginator();
    }

},

/**
 * Returns the default containers used for Paginators.  If create param is
 * passed, the containers will be created and added to the DataTable container.
 *
 * @method _defaultPaginatorContainers
 * @param create {boolean} Create the default containers if not found
 * @private
 */
_defaultPaginatorContainers : function (create) {
    var above_id = this._sId + '-paginator0',
        below_id = this._sId + '-paginator1',
        above    = Dom.get(above_id),
        below    = Dom.get(below_id);

    if (create && (!above || !below)) {
        // One above and one below the table
        if (!above) {
            above    = document.createElement('div');
            above.id = above_id;
            Dom.addClass(above, DT.CLASS_PAGINATOR);

            this._elContainer.insertBefore(above,this._elContainer.firstChild);
        }

        if (!below) {
            below    = document.createElement('div');
            below.id = below_id;
            Dom.addClass(below, DT.CLASS_PAGINATOR);

            this._elContainer.appendChild(below);
        }
    }

    return [above,below];
},

/**
 * Calls Paginator's destroy() method
 *
 * @method _destroyPaginator
 * @private
 */
_destroyPaginator : function () {
    var oldPag = this.get('paginator');
    if (oldPag) {
        oldPag.destroy();
    }
},

/**
 * Renders the Paginator to the DataTable UI
 *
 * @method renderPaginator
 */
renderPaginator : function () {
    var pag = this.get("paginator");
    if (!pag) { return; }

    // Add the containers if the Paginator is not configured with containers
    if (!pag.getContainerNodes().length) {
        pag.set('containers',this._defaultPaginatorContainers(true));
    }

    pag.render();
},

/**
 * Overridable method gives implementers a hook to show loading message before
 * changing Paginator value.
 *
 * @method doBeforePaginatorChange
 * @param oPaginatorState {Object} An object literal describing the proposed pagination state.
 * @return {Boolean} Return true to continue changing Paginator value.
 */
doBeforePaginatorChange : function(oPaginatorState) {
    this.showTableMessage(this.get("MSG_LOADING"), DT.CLASS_LOADING);
    return true;
},

/**
 * Responds to new Pagination states. By default, updates the UI to reflect the
 * new state. If "dynamicData" is true, current selections are purged before
 * a request is sent to the DataSource for data for the new state (using the
 * request returned by "generateRequest()").
 *  
 * @method onPaginatorChangeRequest
 * @param oPaginatorState {Object} An object literal describing the proposed pagination state.
 */
onPaginatorChangeRequest : function (oPaginatorState) {
    var ok = this.doBeforePaginatorChange(oPaginatorState);
    if(ok) {
        // Server-side pagination
        if(this.get("dynamicData")) {
            // Get the current state
            var oState = this.getState();
            
            // Update pagination values
            oState.pagination = oPaginatorState;
    
            // Get the request for the new state
            var request = this.get("generateRequest")(oState, this);
            
            // Purge selections
            this.unselectAllRows();
            this.unselectAllCells();
            
            // Get the new data from the server
            var callback = {
                success : this.onDataReturnSetRows,
                failure : this.onDataReturnSetRows,
                argument : oState, // Pass along the new state to the callback
                scope : this
            };
            this._oDataSource.sendRequest(request, callback);
        }
        // Client-side pagination
        else {
            // Set the core pagination values silently (the second param)
            // to avoid looping back through the changeRequest mechanism
            oPaginatorState.paginator.setStartIndex(oPaginatorState.recordOffset,true);
            oPaginatorState.paginator.setRowsPerPage(oPaginatorState.rowsPerPage,true);
    
            // Update the UI
            this.render();
        }
    }
    else {
    }
},


















































// SELECTION/HIGHLIGHTING

/*
 * Reference to last highlighted cell element
 *
 * @property _elLastHighlightedTd
 * @type HTMLElement
 * @private
 */
_elLastHighlightedTd : null,

/*
 * ID string of last highlighted row element
 *
 * @property _sLastHighlightedTrElId
 * @type String
 * @private
 */
//_sLastHighlightedTrElId : null,

/**
 * Array to track row selections (by sRecordId) and/or cell selections
 * (by {recordId:sRecordId, columnKey:sColumnKey})
 *
 * @property _aSelections
 * @type Object[]
 * @private
 */
_aSelections : null,

/**
 * Record instance of the row selection anchor.
 *
 * @property _oAnchorRecord
 * @type YAHOO.widget.Record
 * @private
 */
_oAnchorRecord : null,

/**
 * Object literal representing cell selection anchor:
 * {recordId:sRecordId, columnKey:sColumnKey}.
 *
 * @property _oAnchorCell
 * @type Object
 * @private
 */
_oAnchorCell : null,

/**
 * Convenience method to remove the class YAHOO.widget.DataTable.CLASS_SELECTED
 * from all TR elements on the page.
 *
 * @method _unselectAllTrEls
 * @private
 */
_unselectAllTrEls : function() {
    var selectedRows = Dom.getElementsByClassName(DT.CLASS_SELECTED,"tr",this._elTbody);
    Dom.removeClass(selectedRows, DT.CLASS_SELECTED);
},

/**
 * Returns object literal of values that represent the selection trigger. Used
 * to determine selection behavior resulting from a key event.
 *
 * @method _getSelectionTrigger
 * @private
 */
_getSelectionTrigger : function() {
    var sMode = this.get("selectionMode");
    var oTrigger = {};
    var oTriggerCell, oTriggerRecord, nTriggerRecordIndex, elTriggerRow, nTriggerTrIndex;

    // Cell mode
    if((sMode == "cellblock") || (sMode == "cellrange") || (sMode == "singlecell")) {
        oTriggerCell = this.getLastSelectedCell();
        // No selected cells found
        if(!oTriggerCell) {
            return null;
        }
        else {
            oTriggerRecord = this.getRecord(oTriggerCell.recordId);
            nTriggerRecordIndex = this.getRecordIndex(oTriggerRecord);
            elTriggerRow = this.getTrEl(oTriggerRecord);
            nTriggerTrIndex = this.getTrIndex(elTriggerRow);

            // Selected cell not found on this page
            if(nTriggerTrIndex === null) {
                return null;
            }
            else {
                oTrigger.record = oTriggerRecord;
                oTrigger.recordIndex = nTriggerRecordIndex;
                oTrigger.el = this.getTdEl(oTriggerCell);
                oTrigger.trIndex = nTriggerTrIndex;
                oTrigger.column = this.getColumn(oTriggerCell.columnKey);
                oTrigger.colKeyIndex = oTrigger.column.getKeyIndex();
                oTrigger.cell = oTriggerCell;
                return oTrigger;
            }
        }
    }
    // Row mode
    else {
        oTriggerRecord = this.getLastSelectedRecord();
        // No selected rows found
        if(!oTriggerRecord) {
                return null;
        }
        else {
            // Selected row found, but is it on current page?
            oTriggerRecord = this.getRecord(oTriggerRecord);
            nTriggerRecordIndex = this.getRecordIndex(oTriggerRecord);
            elTriggerRow = this.getTrEl(oTriggerRecord);
            nTriggerTrIndex = this.getTrIndex(elTriggerRow);

            // Selected row not found on this page
            if(nTriggerTrIndex === null) {
                return null;
            }
            else {
                oTrigger.record = oTriggerRecord;
                oTrigger.recordIndex = nTriggerRecordIndex;
                oTrigger.el = elTriggerRow;
                oTrigger.trIndex = nTriggerTrIndex;
                return oTrigger;
            }
        }
    }
},

/**
 * Returns object literal of values that represent the selection anchor. Used
 * to determine selection behavior resulting from a user event.
 *
 * @method _getSelectionAnchor
 * @param oTrigger {Object} (Optional) Object literal of selection trigger values
 * (for key events).
 * @private
 */
_getSelectionAnchor : function(oTrigger) {
    var sMode = this.get("selectionMode");
    var oAnchor = {};
    var oAnchorRecord, nAnchorRecordIndex, nAnchorTrIndex;

    // Cell mode
    if((sMode == "cellblock") || (sMode == "cellrange") || (sMode == "singlecell")) {
        // Validate anchor cell
        var oAnchorCell = this._oAnchorCell;
        if(!oAnchorCell) {
            if(oTrigger) {
                oAnchorCell = this._oAnchorCell = oTrigger.cell;
            }
            else {
                return null;
            }
        }
        oAnchorRecord = this._oAnchorCell.record;
        nAnchorRecordIndex = this._oRecordSet.getRecordIndex(oAnchorRecord);
        nAnchorTrIndex = this.getTrIndex(oAnchorRecord);
        // If anchor cell is not on this page...
        if(nAnchorTrIndex === null) {
            // ...set TR index equal to top TR
            if(nAnchorRecordIndex < this.getRecordIndex(this.getFirstTrEl())) {
                nAnchorTrIndex = 0;
            }
            // ...set TR index equal to bottom TR
            else {
                nAnchorTrIndex = this.getRecordIndex(this.getLastTrEl());
            }
        }

        oAnchor.record = oAnchorRecord;
        oAnchor.recordIndex = nAnchorRecordIndex;
        oAnchor.trIndex = nAnchorTrIndex;
        oAnchor.column = this._oAnchorCell.column;
        oAnchor.colKeyIndex = oAnchor.column.getKeyIndex();
        oAnchor.cell = oAnchorCell;
        return oAnchor;
    }
    // Row mode
    else {
        oAnchorRecord = this._oAnchorRecord;
        if(!oAnchorRecord) {
            if(oTrigger) {
                oAnchorRecord = this._oAnchorRecord = oTrigger.record;
            }
            else {
                return null;
            }
        }

        nAnchorRecordIndex = this.getRecordIndex(oAnchorRecord);
        nAnchorTrIndex = this.getTrIndex(oAnchorRecord);
        // If anchor row is not on this page...
        if(nAnchorTrIndex === null) {
            // ...set TR index equal to top TR
            if(nAnchorRecordIndex < this.getRecordIndex(this.getFirstTrEl())) {
                nAnchorTrIndex = 0;
            }
            // ...set TR index equal to bottom TR
            else {
                nAnchorTrIndex = this.getRecordIndex(this.getLastTrEl());
            }
        }

        oAnchor.record = oAnchorRecord;
        oAnchor.recordIndex = nAnchorRecordIndex;
        oAnchor.trIndex = nAnchorTrIndex;
        return oAnchor;
    }
},

/**
 * Determines selection behavior resulting from a mouse event when selection mode
 * is set to "standard".
 *
 * @method _handleStandardSelectionByMouse
 * @param oArgs.event {HTMLEvent} Event object.
 * @param oArgs.target {HTMLElement} Target element.
 * @private
 */
_handleStandardSelectionByMouse : function(oArgs) {
    var elTarget = oArgs.target;

    // Validate target row
    var elTargetRow = this.getTrEl(elTarget);
    if(elTargetRow) {
        var e = oArgs.event;
        var bSHIFT = e.shiftKey;
        var bCTRL = e.ctrlKey || ((navigator.userAgent.toLowerCase().indexOf("mac") != -1) && e.metaKey);

        var oTargetRecord = this.getRecord(elTargetRow);
        var nTargetRecordIndex = this._oRecordSet.getRecordIndex(oTargetRecord);

        var oAnchor = this._getSelectionAnchor();

        var i;

        // Both SHIFT and CTRL
        if(bSHIFT && bCTRL) {
            // Validate anchor
            if(oAnchor) {
                if(this.isSelected(oAnchor.record)) {
                    // Select all rows between anchor row and target row, including target row
                    if(oAnchor.recordIndex < nTargetRecordIndex) {
                        for(i=oAnchor.recordIndex+1; i<=nTargetRecordIndex; i++) {
                            if(!this.isSelected(i)) {
                                this.selectRow(i);
                            }
                        }
                    }
                    // Select all rows between target row and anchor row, including target row
                    else {
                        for(i=oAnchor.recordIndex-1; i>=nTargetRecordIndex; i--) {
                            if(!this.isSelected(i)) {
                                this.selectRow(i);
                            }
                        }
                    }
                }
                else {
                    // Unselect all rows between anchor row and target row
                    if(oAnchor.recordIndex < nTargetRecordIndex) {
                        for(i=oAnchor.recordIndex+1; i<=nTargetRecordIndex-1; i++) {
                            if(this.isSelected(i)) {
                                this.unselectRow(i);
                            }
                        }
                    }
                    // Unselect all rows between target row and anchor row
                    else {
                        for(i=nTargetRecordIndex+1; i<=oAnchor.recordIndex-1; i++) {
                            if(this.isSelected(i)) {
                                this.unselectRow(i);
                            }
                        }
                    }
                    // Select the target row
                    this.selectRow(oTargetRecord);
                }
            }
            // Invalid anchor
            else {
                // Set anchor
                this._oAnchorRecord = oTargetRecord;

                // Toggle selection of target
                if(this.isSelected(oTargetRecord)) {
                    this.unselectRow(oTargetRecord);
                }
                else {
                    this.selectRow(oTargetRecord);
                }
            }
        }
         // Only SHIFT
        else if(bSHIFT) {
            this.unselectAllRows();

            // Validate anchor
            if(oAnchor) {
                // Select all rows between anchor row and target row,
                // including the anchor row and target row
                if(oAnchor.recordIndex < nTargetRecordIndex) {
                    for(i=oAnchor.recordIndex; i<=nTargetRecordIndex; i++) {
                        this.selectRow(i);
                    }
                }
                // Select all rows between target row and anchor row,
                // including the target row and anchor row
                else {
                    for(i=oAnchor.recordIndex; i>=nTargetRecordIndex; i--) {
                        this.selectRow(i);
                    }
                }
            }
            // Invalid anchor
            else {
                // Set anchor
                this._oAnchorRecord = oTargetRecord;

                // Select target row only
                this.selectRow(oTargetRecord);
            }
        }
        // Only CTRL
        else if(bCTRL) {
            // Set anchor
            this._oAnchorRecord = oTargetRecord;

            // Toggle selection of target
            if(this.isSelected(oTargetRecord)) {
                this.unselectRow(oTargetRecord);
            }
            else {
                this.selectRow(oTargetRecord);
            }
        }
        // Neither SHIFT nor CTRL
        else {
            this._handleSingleSelectionByMouse(oArgs);
            return;
        }
    }
},

/**
 * Determines selection behavior resulting from a key event when selection mode
 * is set to "standard".
 *
 * @method _handleStandardSelectionByKey
 * @param e {HTMLEvent} Event object.
 * @private
 */
_handleStandardSelectionByKey : function(e) {
    var nKey = Ev.getCharCode(e);

    if((nKey == 38) || (nKey == 40)) {
        var bSHIFT = e.shiftKey;

        // Validate trigger
        var oTrigger = this._getSelectionTrigger();
        // Arrow selection only works if last selected row is on current page
        if(!oTrigger) {
            return null;
        }

        Ev.stopEvent(e);

        // Validate anchor
        var oAnchor = this._getSelectionAnchor(oTrigger);

        // Determine which direction we're going to
        if(bSHIFT) {
            // Selecting down away from anchor row
            if((nKey == 40) && (oAnchor.recordIndex <= oTrigger.trIndex)) {
                this.selectRow(this.getNextTrEl(oTrigger.el));
            }
            // Selecting up away from anchor row
            else if((nKey == 38) && (oAnchor.recordIndex >= oTrigger.trIndex)) {
                this.selectRow(this.getPreviousTrEl(oTrigger.el));
            }
            // Unselect trigger
            else {
                this.unselectRow(oTrigger.el);
            }
        }
        else {
            this._handleSingleSelectionByKey(e);
        }
    }
},

/**
 * Determines selection behavior resulting from a mouse event when selection mode
 * is set to "single".
 *
 * @method _handleSingleSelectionByMouse
 * @param oArgs.event {HTMLEvent} Event object.
 * @param oArgs.target {HTMLElement} Target element.
 * @private
 */
_handleSingleSelectionByMouse : function(oArgs) {
    var elTarget = oArgs.target;

    // Validate target row
    var elTargetRow = this.getTrEl(elTarget);
    if(elTargetRow) {
        var oTargetRecord = this.getRecord(elTargetRow);

        // Set anchor
        this._oAnchorRecord = oTargetRecord;

        // Select only target
        this.unselectAllRows();
        this.selectRow(oTargetRecord);
    }
},

/**
 * Determines selection behavior resulting from a key event when selection mode
 * is set to "single".
 *
 * @method _handleSingleSelectionByKey
 * @param e {HTMLEvent} Event object.
 * @private
 */
_handleSingleSelectionByKey : function(e) {
    var nKey = Ev.getCharCode(e);

    if((nKey == 38) || (nKey == 40)) {
        // Validate trigger
        var oTrigger = this._getSelectionTrigger();
        // Arrow selection only works if last selected row is on current page
        if(!oTrigger) {
            return null;
        }

        Ev.stopEvent(e);

        // Determine the new row to select
        var elNew;
        if(nKey == 38) { // arrow up
            elNew = this.getPreviousTrEl(oTrigger.el);

            // Validate new row
            if(elNew === null) {
                //TODO: wrap around to last tr on current page
                //elNew = this.getLastTrEl();

                //TODO: wrap back to last tr of previous page

                // Top row selection is sticky
                elNew = this.getFirstTrEl();
            }
        }
        else if(nKey == 40) { // arrow down
            elNew = this.getNextTrEl(oTrigger.el);

            // Validate new row
            if(elNew === null) {
                //TODO: wrap around to first tr on current page
                //elNew = this.getFirstTrEl();

                //TODO: wrap forward to first tr of previous page

                // Bottom row selection is sticky
                elNew = this.getLastTrEl();
            }
        }

        // Unselect all rows
        this.unselectAllRows();

        // Select the new row
        this.selectRow(elNew);

        // Set new anchor
        this._oAnchorRecord = this.getRecord(elNew);
    }
},

/**
 * Determines selection behavior resulting from a mouse event when selection mode
 * is set to "cellblock".
 *
 * @method _handleCellBlockSelectionByMouse
 * @param oArgs.event {HTMLEvent} Event object.
 * @param oArgs.target {HTMLElement} Target element.
 * @private
 */
_handleCellBlockSelectionByMouse : function(oArgs) {
    var elTarget = oArgs.target;

    // Validate target cell
    var elTargetCell = this.getTdEl(elTarget);
    if(elTargetCell) {
        var e = oArgs.event;
        var bSHIFT = e.shiftKey;
        var bCTRL = e.ctrlKey || ((navigator.userAgent.toLowerCase().indexOf("mac") != -1) && e.metaKey);

        var elTargetRow = this.getTrEl(elTargetCell);
        var nTargetTrIndex = this.getTrIndex(elTargetRow);
        var oTargetColumn = this.getColumn(elTargetCell);
        var nTargetColKeyIndex = oTargetColumn.getKeyIndex();
        var oTargetRecord = this.getRecord(elTargetRow);
        var nTargetRecordIndex = this._oRecordSet.getRecordIndex(oTargetRecord);
        var oTargetCell = {record:oTargetRecord, column:oTargetColumn};

        var oAnchor = this._getSelectionAnchor();

        var allRows = this.getTbodyEl().rows;
        var startIndex, endIndex, currentRow, i, j;

        // Both SHIFT and CTRL
        if(bSHIFT && bCTRL) {

            // Validate anchor
            if(oAnchor) {
                // Anchor is selected
                if(this.isSelected(oAnchor.cell)) {
                    // All cells are on the same row
                    if(oAnchor.recordIndex === nTargetRecordIndex) {
                        // Select all cells between anchor cell and target cell, including target cell
                        if(oAnchor.colKeyIndex < nTargetColKeyIndex) {
                            for(i=oAnchor.colKeyIndex+1; i<=nTargetColKeyIndex; i++) {
                                this.selectCell(elTargetRow.cells[i]);
                            }
                        }
                        // Select all cells between target cell and anchor cell, including target cell
                        else if(nTargetColKeyIndex < oAnchor.colKeyIndex) {
                            for(i=nTargetColKeyIndex; i<oAnchor.colKeyIndex; i++) {
                                this.selectCell(elTargetRow.cells[i]);
                            }
                        }
                    }
                    // Anchor row is above target row
                    else if(oAnchor.recordIndex < nTargetRecordIndex) {
                        startIndex = Math.min(oAnchor.colKeyIndex, nTargetColKeyIndex);
                        endIndex = Math.max(oAnchor.colKeyIndex, nTargetColKeyIndex);

                        // Select all cells from startIndex to endIndex on rows between anchor row and target row
                        for(i=oAnchor.trIndex; i<=nTargetTrIndex; i++) {
                            for(j=startIndex; j<=endIndex; j++) {
                                this.selectCell(allRows[i].cells[j]);
                            }
                        }
                    }
                    // Anchor row is below target row
                    else {
                        startIndex = Math.min(oAnchor.trIndex, nTargetColKeyIndex);
                        endIndex = Math.max(oAnchor.trIndex, nTargetColKeyIndex);

                        // Select all cells from startIndex to endIndex on rows between target row and anchor row
                        for(i=oAnchor.trIndex; i>=nTargetTrIndex; i--) {
                            for(j=endIndex; j>=startIndex; j--) {
                                this.selectCell(allRows[i].cells[j]);
                            }
                        }
                    }
                }
                // Anchor cell is unselected
                else {
                    // All cells are on the same row
                    if(oAnchor.recordIndex === nTargetRecordIndex) {
                        // Unselect all cells between anchor cell and target cell
                        if(oAnchor.colKeyIndex < nTargetColKeyIndex) {
                            for(i=oAnchor.colKeyIndex+1; i<nTargetColKeyIndex; i++) {
                                this.unselectCell(elTargetRow.cells[i]);
                            }
                        }
                        // Select all cells between target cell and anchor cell
                        else if(nTargetColKeyIndex < oAnchor.colKeyIndex) {
                            for(i=nTargetColKeyIndex+1; i<oAnchor.colKeyIndex; i++) {
                                this.unselectCell(elTargetRow.cells[i]);
                            }
                        }
                    }
                    // Anchor row is above target row
                    if(oAnchor.recordIndex < nTargetRecordIndex) {
                        // Unselect all cells from anchor cell to target cell
                        for(i=oAnchor.trIndex; i<=nTargetTrIndex; i++) {
                            currentRow = allRows[i];
                            for(j=0; j<currentRow.cells.length; j++) {
                                // This is the anchor row, only unselect cells after the anchor cell
                                if(currentRow.sectionRowIndex === oAnchor.trIndex) {
                                    if(j>oAnchor.colKeyIndex) {
                                        this.unselectCell(currentRow.cells[j]);
                                    }
                                }
                                // This is the target row, only unelect cells before the target cell
                                else if(currentRow.sectionRowIndex === nTargetTrIndex) {
                                    if(j<nTargetColKeyIndex) {
                                        this.unselectCell(currentRow.cells[j]);
                                    }
                                }
                                // Unselect all cells on this row
                                else {
                                    this.unselectCell(currentRow.cells[j]);
                                }
                            }
                        }
                    }
                    // Anchor row is below target row
                    else {
                        // Unselect all cells from target cell to anchor cell
                        for(i=nTargetTrIndex; i<=oAnchor.trIndex; i++) {
                            currentRow = allRows[i];
                            for(j=0; j<currentRow.cells.length; j++) {
                                // This is the target row, only unselect cells after the target cell
                                if(currentRow.sectionRowIndex == nTargetTrIndex) {
                                    if(j>nTargetColKeyIndex) {
                                        this.unselectCell(currentRow.cells[j]);
                                    }
                                }
                                // This is the anchor row, only unselect cells before the anchor cell
                                else if(currentRow.sectionRowIndex == oAnchor.trIndex) {
                                    if(j<oAnchor.colKeyIndex) {
                                        this.unselectCell(currentRow.cells[j]);
                                    }
                                }
                                // Unselect all cells on this row
                                else {
                                    this.unselectCell(currentRow.cells[j]);
                                }
                            }
                        }
                    }

                    // Select the target cell
                    this.selectCell(elTargetCell);
                }
            }
            // Invalid anchor
            else {
                // Set anchor
                this._oAnchorCell = oTargetCell;

                // Toggle selection of target
                if(this.isSelected(oTargetCell)) {
                    this.unselectCell(oTargetCell);
                }
                else {
                    this.selectCell(oTargetCell);
                }
            }

        }
         // Only SHIFT
        else if(bSHIFT) {
            this.unselectAllCells();

            // Validate anchor
            if(oAnchor) {
                // All cells are on the same row
                if(oAnchor.recordIndex === nTargetRecordIndex) {
                    // Select all cells between anchor cell and target cell,
                    // including the anchor cell and target cell
                    if(oAnchor.colKeyIndex < nTargetColKeyIndex) {
                        for(i=oAnchor.colKeyIndex; i<=nTargetColKeyIndex; i++) {
                            this.selectCell(elTargetRow.cells[i]);
                        }
                    }
                    // Select all cells between target cell and anchor cell
                    // including the target cell and anchor cell
                    else if(nTargetColKeyIndex < oAnchor.colKeyIndex) {
                        for(i=nTargetColKeyIndex; i<=oAnchor.colKeyIndex; i++) {
                            this.selectCell(elTargetRow.cells[i]);
                        }
                    }
                }
                // Anchor row is above target row
                else if(oAnchor.recordIndex < nTargetRecordIndex) {
                    // Select the cellblock from anchor cell to target cell
                    // including the anchor cell and the target cell
                    startIndex = Math.min(oAnchor.colKeyIndex, nTargetColKeyIndex);
                    endIndex = Math.max(oAnchor.colKeyIndex, nTargetColKeyIndex);

                    for(i=oAnchor.trIndex; i<=nTargetTrIndex; i++) {
                        for(j=startIndex; j<=endIndex; j++) {
                            this.selectCell(allRows[i].cells[j]);
                        }
                    }
                }
                // Anchor row is below target row
                else {
                    // Select the cellblock from target cell to anchor cell
                    // including the target cell and the anchor cell
                    startIndex = Math.min(oAnchor.colKeyIndex, nTargetColKeyIndex);
                    endIndex = Math.max(oAnchor.colKeyIndex, nTargetColKeyIndex);

                    for(i=nTargetTrIndex; i<=oAnchor.trIndex; i++) {
                        for(j=startIndex; j<=endIndex; j++) {
                            this.selectCell(allRows[i].cells[j]);
                        }
                    }
                }
            }
            // Invalid anchor
            else {
                // Set anchor
                this._oAnchorCell = oTargetCell;

                // Select target only
                this.selectCell(oTargetCell);
            }
        }
        // Only CTRL
        else if(bCTRL) {

            // Set anchor
            this._oAnchorCell = oTargetCell;

            // Toggle selection of target
            if(this.isSelected(oTargetCell)) {
                this.unselectCell(oTargetCell);
            }
            else {
                this.selectCell(oTargetCell);
            }

        }
        // Neither SHIFT nor CTRL
        else {
            this._handleSingleCellSelectionByMouse(oArgs);
        }
    }
},

/**
 * Determines selection behavior resulting from a key event when selection mode
 * is set to "cellblock".
 *
 * @method _handleCellBlockSelectionByKey
 * @param e {HTMLEvent} Event object.
 * @private
 */
_handleCellBlockSelectionByKey : function(e) {
    var nKey = Ev.getCharCode(e);
    var bSHIFT = e.shiftKey;
    if((nKey == 9) || !bSHIFT) {
        this._handleSingleCellSelectionByKey(e);
        return;
    }

    if((nKey > 36) && (nKey < 41)) {
        // Validate trigger
        var oTrigger = this._getSelectionTrigger();
        // Arrow selection only works if last selected row is on current page
        if(!oTrigger) {
            return null;
        }

        Ev.stopEvent(e);

        // Validate anchor
        var oAnchor = this._getSelectionAnchor(oTrigger);

        var i, startIndex, endIndex, elNew, elNewRow;
        var allRows = this.getTbodyEl().rows;
        var elThisRow = oTrigger.el.parentNode;

        // Determine which direction we're going to

        if(nKey == 40) { // arrow down
            // Selecting away from anchor cell
            if(oAnchor.recordIndex <= oTrigger.recordIndex) {
                // Select the horiz block on the next row...
                // ...making sure there is room below the trigger row
                elNewRow = this.getNextTrEl(oTrigger.el);
                if(elNewRow) {
                    startIndex = oAnchor.colKeyIndex;
                    endIndex = oTrigger.colKeyIndex;
                    // ...going left
                    if(startIndex > endIndex) {
                        for(i=startIndex; i>=endIndex; i--) {
                            elNew = elNewRow.cells[i];
                            this.selectCell(elNew);
                        }
                    }
                    // ... going right
                    else {
                        for(i=startIndex; i<=endIndex; i++) {
                            elNew = elNewRow.cells[i];
                            this.selectCell(elNew);
                        }
                    }
                }
            }
            // Unselecting towards anchor cell
            else {
                startIndex = Math.min(oAnchor.colKeyIndex, oTrigger.colKeyIndex);
                endIndex = Math.max(oAnchor.colKeyIndex, oTrigger.colKeyIndex);
                // Unselect the horiz block on this row towards the next row
                for(i=startIndex; i<=endIndex; i++) {
                    this.unselectCell(elThisRow.cells[i]);
                }
            }
        }
        // Arrow up
        else if(nKey == 38) {
            // Selecting away from anchor cell
            if(oAnchor.recordIndex >= oTrigger.recordIndex) {
                // Select the horiz block on the previous row...
                // ...making sure there is room
                elNewRow = this.getPreviousTrEl(oTrigger.el);
                if(elNewRow) {
                    // Select in order from anchor to trigger...
                    startIndex = oAnchor.colKeyIndex;
                    endIndex = oTrigger.colKeyIndex;
                    // ...going left
                    if(startIndex > endIndex) {
                        for(i=startIndex; i>=endIndex; i--) {
                            elNew = elNewRow.cells[i];
                            this.selectCell(elNew);
                        }
                    }
                    // ... going right
                    else {
                        for(i=startIndex; i<=endIndex; i++) {
                            elNew = elNewRow.cells[i];
                            this.selectCell(elNew);
                        }
                    }
                }
            }
            // Unselecting towards anchor cell
            else {
                startIndex = Math.min(oAnchor.colKeyIndex, oTrigger.colKeyIndex);
                endIndex = Math.max(oAnchor.colKeyIndex, oTrigger.colKeyIndex);
                // Unselect the horiz block on this row towards the previous row
                for(i=startIndex; i<=endIndex; i++) {
                    this.unselectCell(elThisRow.cells[i]);
                }
            }
        }
        // Arrow right
        else if(nKey == 39) {
            // Selecting away from anchor cell
            if(oAnchor.colKeyIndex <= oTrigger.colKeyIndex) {
                // Select the next vert block to the right...
                // ...making sure there is room
                if(oTrigger.colKeyIndex < elThisRow.cells.length-1) {
                    // Select in order from anchor to trigger...
                    startIndex = oAnchor.trIndex;
                    endIndex = oTrigger.trIndex;
                    // ...going up
                    if(startIndex > endIndex) {
                        for(i=startIndex; i>=endIndex; i--) {
                            elNew = allRows[i].cells[oTrigger.colKeyIndex+1];
                            this.selectCell(elNew);
                        }
                    }
                    // ... going down
                    else {
                        for(i=startIndex; i<=endIndex; i++) {
                            elNew = allRows[i].cells[oTrigger.colKeyIndex+1];
                            this.selectCell(elNew);
                        }
                    }
                }
            }
            // Unselecting towards anchor cell
            else {
                // Unselect the vert block on this column towards the right
                startIndex = Math.min(oAnchor.trIndex, oTrigger.trIndex);
                endIndex = Math.max(oAnchor.trIndex, oTrigger.trIndex);
                for(i=startIndex; i<=endIndex; i++) {
                    this.unselectCell(allRows[i].cells[oTrigger.colKeyIndex]);
                }
            }
        }
        // Arrow left
        else if(nKey == 37) {
            // Selecting away from anchor cell
            if(oAnchor.colKeyIndex >= oTrigger.colKeyIndex) {
                //Select the previous vert block to the left
                if(oTrigger.colKeyIndex > 0) {
                    // Select in order from anchor to trigger...
                    startIndex = oAnchor.trIndex;
                    endIndex = oTrigger.trIndex;
                    // ...going up
                    if(startIndex > endIndex) {
                        for(i=startIndex; i>=endIndex; i--) {
                            elNew = allRows[i].cells[oTrigger.colKeyIndex-1];
                            this.selectCell(elNew);
                        }
                    }
                    // ... going down
                    else {
                        for(i=startIndex; i<=endIndex; i++) {
                            elNew = allRows[i].cells[oTrigger.colKeyIndex-1];
                            this.selectCell(elNew);
                        }
                    }
                }
            }
            // Unselecting towards anchor cell
            else {
                // Unselect the vert block on this column towards the left
                startIndex = Math.min(oAnchor.trIndex, oTrigger.trIndex);
                endIndex = Math.max(oAnchor.trIndex, oTrigger.trIndex);
                for(i=startIndex; i<=endIndex; i++) {
                    this.unselectCell(allRows[i].cells[oTrigger.colKeyIndex]);
                }
            }
        }
    }
},

/**
 * Determines selection behavior resulting from a mouse event when selection mode
 * is set to "cellrange".
 *
 * @method _handleCellRangeSelectionByMouse
 * @param oArgs.event {HTMLEvent} Event object.
 * @param oArgs.target {HTMLElement} Target element.
 * @private
 */
_handleCellRangeSelectionByMouse : function(oArgs) {
    var elTarget = oArgs.target;

    // Validate target cell
    var elTargetCell = this.getTdEl(elTarget);
    if(elTargetCell) {
        var e = oArgs.event;
        var bSHIFT = e.shiftKey;
        var bCTRL = e.ctrlKey || ((navigator.userAgent.toLowerCase().indexOf("mac") != -1) && e.metaKey);

        var elTargetRow = this.getTrEl(elTargetCell);
        var nTargetTrIndex = this.getTrIndex(elTargetRow);
        var oTargetColumn = this.getColumn(elTargetCell);
        var nTargetColKeyIndex = oTargetColumn.getKeyIndex();
        var oTargetRecord = this.getRecord(elTargetRow);
        var nTargetRecordIndex = this._oRecordSet.getRecordIndex(oTargetRecord);
        var oTargetCell = {record:oTargetRecord, column:oTargetColumn};

        var oAnchor = this._getSelectionAnchor();

        var allRows = this.getTbodyEl().rows;
        var currentRow, i, j;

        // Both SHIFT and CTRL
        if(bSHIFT && bCTRL) {

            // Validate anchor
            if(oAnchor) {
                // Anchor is selected
                if(this.isSelected(oAnchor.cell)) {
                    // All cells are on the same row
                    if(oAnchor.recordIndex === nTargetRecordIndex) {
                        // Select all cells between anchor cell and target cell, including target cell
                        if(oAnchor.colKeyIndex < nTargetColKeyIndex) {
                            for(i=oAnchor.colKeyIndex+1; i<=nTargetColKeyIndex; i++) {
                                this.selectCell(elTargetRow.cells[i]);
                            }
                        }
                        // Select all cells between target cell and anchor cell, including target cell
                        else if(nTargetColKeyIndex < oAnchor.colKeyIndex) {
                            for(i=nTargetColKeyIndex; i<oAnchor.colKeyIndex; i++) {
                                this.selectCell(elTargetRow.cells[i]);
                            }
                        }
                    }
                    // Anchor row is above target row
                    else if(oAnchor.recordIndex < nTargetRecordIndex) {
                        // Select all cells on anchor row from anchor cell to the end of the row
                        for(i=oAnchor.colKeyIndex+1; i<elTargetRow.cells.length; i++) {
                            this.selectCell(elTargetRow.cells[i]);
                        }

                        // Select all cells on all rows between anchor row and target row
                        for(i=oAnchor.trIndex+1; i<nTargetTrIndex; i++) {
                            for(j=0; j<allRows[i].cells.length; j++){
                                this.selectCell(allRows[i].cells[j]);
                            }
                        }

                        // Select all cells on target row from first cell to the target cell
                        for(i=0; i<=nTargetColKeyIndex; i++) {
                            this.selectCell(elTargetRow.cells[i]);
                        }
                    }
                    // Anchor row is below target row
                    else {
                        // Select all cells on target row from target cell to the end of the row
                        for(i=nTargetColKeyIndex; i<elTargetRow.cells.length; i++) {
                            this.selectCell(elTargetRow.cells[i]);
                        }

                        // Select all cells on all rows between target row and anchor row
                        for(i=nTargetTrIndex+1; i<oAnchor.trIndex; i++) {
                            for(j=0; j<allRows[i].cells.length; j++){
                                this.selectCell(allRows[i].cells[j]);
                            }
                        }

                        // Select all cells on anchor row from first cell to the anchor cell
                        for(i=0; i<oAnchor.colKeyIndex; i++) {
                            this.selectCell(elTargetRow.cells[i]);
                        }
                    }
                }
                // Anchor cell is unselected
                else {
                    // All cells are on the same row
                    if(oAnchor.recordIndex === nTargetRecordIndex) {
                        // Unselect all cells between anchor cell and target cell
                        if(oAnchor.colKeyIndex < nTargetColKeyIndex) {
                            for(i=oAnchor.colKeyIndex+1; i<nTargetColKeyIndex; i++) {
                                this.unselectCell(elTargetRow.cells[i]);
                            }
                        }
                        // Select all cells between target cell and anchor cell
                        else if(nTargetColKeyIndex < oAnchor.colKeyIndex) {
                            for(i=nTargetColKeyIndex+1; i<oAnchor.colKeyIndex; i++) {
                                this.unselectCell(elTargetRow.cells[i]);
                            }
                        }
                    }
                    // Anchor row is above target row
                    if(oAnchor.recordIndex < nTargetRecordIndex) {
                        // Unselect all cells from anchor cell to target cell
                        for(i=oAnchor.trIndex; i<=nTargetTrIndex; i++) {
                            currentRow = allRows[i];
                            for(j=0; j<currentRow.cells.length; j++) {
                                // This is the anchor row, only unselect cells after the anchor cell
                                if(currentRow.sectionRowIndex === oAnchor.trIndex) {
                                    if(j>oAnchor.colKeyIndex) {
                                        this.unselectCell(currentRow.cells[j]);
                                    }
                                }
                                // This is the target row, only unelect cells before the target cell
                                else if(currentRow.sectionRowIndex === nTargetTrIndex) {
                                    if(j<nTargetColKeyIndex) {
                                        this.unselectCell(currentRow.cells[j]);
                                    }
                                }
                                // Unselect all cells on this row
                                else {
                                    this.unselectCell(currentRow.cells[j]);
                                }
                            }
                        }
                    }
                    // Anchor row is below target row
                    else {
                        // Unselect all cells from target cell to anchor cell
                        for(i=nTargetTrIndex; i<=oAnchor.trIndex; i++) {
                            currentRow = allRows[i];
                            for(j=0; j<currentRow.cells.length; j++) {
                                // This is the target row, only unselect cells after the target cell
                                if(currentRow.sectionRowIndex == nTargetTrIndex) {
                                    if(j>nTargetColKeyIndex) {
                                        this.unselectCell(currentRow.cells[j]);
                                    }
                                }
                                // This is the anchor row, only unselect cells before the anchor cell
                                else if(currentRow.sectionRowIndex == oAnchor.trIndex) {
                                    if(j<oAnchor.colKeyIndex) {
                                        this.unselectCell(currentRow.cells[j]);
                                    }
                                }
                                // Unselect all cells on this row
                                else {
                                    this.unselectCell(currentRow.cells[j]);
                                }
                            }
                        }
                    }

                    // Select the target cell
                    this.selectCell(elTargetCell);
                }
            }
            // Invalid anchor
            else {
                // Set anchor
                this._oAnchorCell = oTargetCell;

                // Toggle selection of target
                if(this.isSelected(oTargetCell)) {
                    this.unselectCell(oTargetCell);
                }
                else {
                    this.selectCell(oTargetCell);
                }
            }
        }
         // Only SHIFT
        else if(bSHIFT) {

            this.unselectAllCells();

            // Validate anchor
            if(oAnchor) {
                // All cells are on the same row
                if(oAnchor.recordIndex === nTargetRecordIndex) {
                    // Select all cells between anchor cell and target cell,
                    // including the anchor cell and target cell
                    if(oAnchor.colKeyIndex < nTargetColKeyIndex) {
                        for(i=oAnchor.colKeyIndex; i<=nTargetColKeyIndex; i++) {
                            this.selectCell(elTargetRow.cells[i]);
                        }
                    }
                    // Select all cells between target cell and anchor cell
                    // including the target cell and anchor cell
                    else if(nTargetColKeyIndex < oAnchor.colKeyIndex) {
                        for(i=nTargetColKeyIndex; i<=oAnchor.colKeyIndex; i++) {
                            this.selectCell(elTargetRow.cells[i]);
                        }
                    }
                }
                // Anchor row is above target row
                else if(oAnchor.recordIndex < nTargetRecordIndex) {
                    // Select all cells from anchor cell to target cell
                    // including the anchor cell and target cell
                    for(i=oAnchor.trIndex; i<=nTargetTrIndex; i++) {
                        currentRow = allRows[i];
                        for(j=0; j<currentRow.cells.length; j++) {
                            // This is the anchor row, only select the anchor cell and after
                            if(currentRow.sectionRowIndex == oAnchor.trIndex) {
                                if(j>=oAnchor.colKeyIndex) {
                                    this.selectCell(currentRow.cells[j]);
                                }
                            }
                            // This is the target row, only select the target cell and before
                            else if(currentRow.sectionRowIndex == nTargetTrIndex) {
                                if(j<=nTargetColKeyIndex) {
                                    this.selectCell(currentRow.cells[j]);
                                }
                            }
                            // Select all cells on this row
                            else {
                                this.selectCell(currentRow.cells[j]);
                            }
                        }
                    }
                }
                // Anchor row is below target row
                else {
                    // Select all cells from target cell to anchor cell,
                    // including the target cell and anchor cell
                    for(i=nTargetTrIndex; i<=oAnchor.trIndex; i++) {
                        currentRow = allRows[i];
                        for(j=0; j<currentRow.cells.length; j++) {
                            // This is the target row, only select the target cell and after
                            if(currentRow.sectionRowIndex == nTargetTrIndex) {
                                if(j>=nTargetColKeyIndex) {
                                    this.selectCell(currentRow.cells[j]);
                                }
                            }
                            // This is the anchor row, only select the anchor cell and before
                            else if(currentRow.sectionRowIndex == oAnchor.trIndex) {
                                if(j<=oAnchor.colKeyIndex) {
                                    this.selectCell(currentRow.cells[j]);
                                }
                            }
                            // Select all cells on this row
                            else {
                                this.selectCell(currentRow.cells[j]);
                            }
                        }
                    }
                }
            }
            // Invalid anchor
            else {
                // Set anchor
                this._oAnchorCell = oTargetCell;

                // Select target only
                this.selectCell(oTargetCell);
            }


        }
        // Only CTRL
        else if(bCTRL) {

            // Set anchor
            this._oAnchorCell = oTargetCell;

            // Toggle selection of target
            if(this.isSelected(oTargetCell)) {
                this.unselectCell(oTargetCell);
            }
            else {
                this.selectCell(oTargetCell);
            }

        }
        // Neither SHIFT nor CTRL
        else {
            this._handleSingleCellSelectionByMouse(oArgs);
        }
    }
},

/**
 * Determines selection behavior resulting from a key event when selection mode
 * is set to "cellrange".
 *
 * @method _handleCellRangeSelectionByKey
 * @param e {HTMLEvent} Event object.
 * @private
 */
_handleCellRangeSelectionByKey : function(e) {
    var nKey = Ev.getCharCode(e);
    var bSHIFT = e.shiftKey;
    if((nKey == 9) || !bSHIFT) {
        this._handleSingleCellSelectionByKey(e);
        return;
    }

    if((nKey > 36) && (nKey < 41)) {
        // Validate trigger
        var oTrigger = this._getSelectionTrigger();
        // Arrow selection only works if last selected row is on current page
        if(!oTrigger) {
            return null;
        }

        Ev.stopEvent(e);

        // Validate anchor
        var oAnchor = this._getSelectionAnchor(oTrigger);

        var i, elNewRow, elNew;
        var allRows = this.getTbodyEl().rows;
        var elThisRow = oTrigger.el.parentNode;

        // Arrow down
        if(nKey == 40) {
            elNewRow = this.getNextTrEl(oTrigger.el);

            // Selecting away from anchor cell
            if(oAnchor.recordIndex <= oTrigger.recordIndex) {
                // Select all cells to the end of this row
                for(i=oTrigger.colKeyIndex+1; i<elThisRow.cells.length; i++){
                    elNew = elThisRow.cells[i];
                    this.selectCell(elNew);
                }

                // Select some of the cells on the next row down
                if(elNewRow) {
                    for(i=0; i<=oTrigger.colKeyIndex; i++){
                        elNew = elNewRow.cells[i];
                        this.selectCell(elNew);
                    }
                }
            }
            // Unselecting towards anchor cell
            else {
                // Unselect all cells to the end of this row
                for(i=oTrigger.colKeyIndex; i<elThisRow.cells.length; i++){
                    this.unselectCell(elThisRow.cells[i]);
                }

                // Unselect some of the cells on the next row down
                if(elNewRow) {
                    for(i=0; i<oTrigger.colKeyIndex; i++){
                        this.unselectCell(elNewRow.cells[i]);
                    }
                }
            }
        }
        // Arrow up
        else if(nKey == 38) {
            elNewRow = this.getPreviousTrEl(oTrigger.el);

            // Selecting away from anchor cell
            if(oAnchor.recordIndex >= oTrigger.recordIndex) {
                // Select all the cells to the beginning of this row
                for(i=oTrigger.colKeyIndex-1; i>-1; i--){
                    elNew = elThisRow.cells[i];
                    this.selectCell(elNew);
                }

                // Select some of the cells from the end of the previous row
                if(elNewRow) {
                    for(i=elThisRow.cells.length-1; i>=oTrigger.colKeyIndex; i--){
                        elNew = elNewRow.cells[i];
                        this.selectCell(elNew);
                    }
                }
            }
            // Unselecting towards anchor cell
            else {
                // Unselect all the cells to the beginning of this row
                for(i=oTrigger.colKeyIndex; i>-1; i--){
                    this.unselectCell(elThisRow.cells[i]);
                }

                // Unselect some of the cells from the end of the previous row
                if(elNewRow) {
                    for(i=elThisRow.cells.length-1; i>oTrigger.colKeyIndex; i--){
                        this.unselectCell(elNewRow.cells[i]);
                    }
                }
            }
        }
        // Arrow right
        else if(nKey == 39) {
            elNewRow = this.getNextTrEl(oTrigger.el);

            // Selecting away from anchor cell
            if(oAnchor.recordIndex < oTrigger.recordIndex) {
                // Select the next cell to the right
                if(oTrigger.colKeyIndex < elThisRow.cells.length-1) {
                    elNew = elThisRow.cells[oTrigger.colKeyIndex+1];
                    this.selectCell(elNew);
                }
                // Select the first cell of the next row
                else if(elNewRow) {
                    elNew = elNewRow.cells[0];
                    this.selectCell(elNew);
                }
            }
            // Unselecting towards anchor cell
            else if(oAnchor.recordIndex > oTrigger.recordIndex) {
                this.unselectCell(elThisRow.cells[oTrigger.colKeyIndex]);

                // Unselect this cell towards the right
                if(oTrigger.colKeyIndex < elThisRow.cells.length-1) {
                }
                // Unselect this cells towards the first cell of the next row
                else {
                }
            }
            // Anchor is on this row
            else {
                // Selecting away from anchor
                if(oAnchor.colKeyIndex <= oTrigger.colKeyIndex) {
                    // Select the next cell to the right
                    if(oTrigger.colKeyIndex < elThisRow.cells.length-1) {
                        elNew = elThisRow.cells[oTrigger.colKeyIndex+1];
                        this.selectCell(elNew);
                    }
                    // Select the first cell on the next row
                    else if(oTrigger.trIndex < allRows.length-1){
                        elNew = elNewRow.cells[0];
                        this.selectCell(elNew);
                    }
                }
                // Unselecting towards anchor
                else {
                    // Unselect this cell towards the right
                    this.unselectCell(elThisRow.cells[oTrigger.colKeyIndex]);
                }
            }
        }
        // Arrow left
        else if(nKey == 37) {
            elNewRow = this.getPreviousTrEl(oTrigger.el);

            // Unselecting towards the anchor
            if(oAnchor.recordIndex < oTrigger.recordIndex) {
                this.unselectCell(elThisRow.cells[oTrigger.colKeyIndex]);

                // Unselect this cell towards the left
                if(oTrigger.colKeyIndex > 0) {
                }
                // Unselect this cell towards the last cell of the previous row
                else {
                }
            }
            // Selecting towards the anchor
            else if(oAnchor.recordIndex > oTrigger.recordIndex) {
                // Select the next cell to the left
                if(oTrigger.colKeyIndex > 0) {
                    elNew = elThisRow.cells[oTrigger.colKeyIndex-1];
                    this.selectCell(elNew);
                }
                // Select the last cell of the previous row
                else if(oTrigger.trIndex > 0){
                    elNew = elNewRow.cells[elNewRow.cells.length-1];
                    this.selectCell(elNew);
                }
            }
            // Anchor is on this row
            else {
                // Selecting away from anchor cell
                if(oAnchor.colKeyIndex >= oTrigger.colKeyIndex) {
                    // Select the next cell to the left
                    if(oTrigger.colKeyIndex > 0) {
                        elNew = elThisRow.cells[oTrigger.colKeyIndex-1];
                        this.selectCell(elNew);
                    }
                    // Select the last cell of the previous row
                    else if(oTrigger.trIndex > 0){
                        elNew = elNewRow.cells[elNewRow.cells.length-1];
                        this.selectCell(elNew);
                    }
                }
                // Unselecting towards anchor cell
                else {
                    this.unselectCell(elThisRow.cells[oTrigger.colKeyIndex]);

                    // Unselect this cell towards the left
                    if(oTrigger.colKeyIndex > 0) {
                    }
                    // Unselect this cell towards the last cell of the previous row
                    else {
                    }
                }
            }
        }
    }
},

/**
 * Determines selection behavior resulting from a mouse event when selection mode
 * is set to "singlecell".
 *
 * @method _handleSingleCellSelectionByMouse
 * @param oArgs.event {HTMLEvent} Event object.
 * @param oArgs.target {HTMLElement} Target element.
 * @private
 */
_handleSingleCellSelectionByMouse : function(oArgs) {
    var elTarget = oArgs.target;

    // Validate target cell
    var elTargetCell = this.getTdEl(elTarget);
    if(elTargetCell) {
        var elTargetRow = this.getTrEl(elTargetCell);
        var oTargetRecord = this.getRecord(elTargetRow);
        var oTargetColumn = this.getColumn(elTargetCell);
        var oTargetCell = {record:oTargetRecord, column:oTargetColumn};

        // Set anchor
        this._oAnchorCell = oTargetCell;

        // Select only target
        this.unselectAllCells();
        this.selectCell(oTargetCell);
    }
},

/**
 * Determines selection behavior resulting from a key event when selection mode
 * is set to "singlecell".
 *
 * @method _handleSingleCellSelectionByKey
 * @param e {HTMLEvent} Event object.
 * @private
 */
_handleSingleCellSelectionByKey : function(e) {
    var nKey = Ev.getCharCode(e);
    if((nKey == 9) || ((nKey > 36) && (nKey < 41))) {
        var bSHIFT = e.shiftKey;

        // Validate trigger
        var oTrigger = this._getSelectionTrigger();
        // Arrow selection only works if last selected row is on current page
        if(!oTrigger) {
            return null;
        }

        // Determine the new cell to select
        var elNew;
        if(nKey == 40) { // Arrow down
            elNew = this.getBelowTdEl(oTrigger.el);

            // Validate new cell
            if(elNew === null) {
                //TODO: wrap around to first tr on current page

                //TODO: wrap forward to first tr of next page

                // Bottom selection is sticky
                elNew = oTrigger.el;
            }
        }
        else if(nKey == 38) { // Arrow up
            elNew = this.getAboveTdEl(oTrigger.el);

            // Validate new cell
            if(elNew === null) {
                //TODO: wrap around to last tr on current page

                //TODO: wrap back to last tr of previous page

                // Top selection is sticky
                elNew = oTrigger.el;
            }
        }
        else if((nKey == 39) || (!bSHIFT && (nKey == 9))) { // Arrow right or tab
            elNew = this.getNextTdEl(oTrigger.el);

            // Validate new cell
            if(elNew === null) {
                //TODO: wrap around to first td on current page

                //TODO: wrap forward to first td of next page

                // Top-left selection is sticky, and release TAB focus
                //elNew = oTrigger.el;
                return;
            }
        }
        else if((nKey == 37) || (bSHIFT && (nKey == 9))) { // Arrow left or shift-tab
            elNew = this.getPreviousTdEl(oTrigger.el);

            // Validate new cell
            if(elNew === null) {
                //TODO: wrap around to last td on current page

                //TODO: wrap back to last td of previous page

                // Bottom-right selection is sticky, and release TAB focus
                //elNew = oTrigger.el;
                return;
            }
        }

        Ev.stopEvent(e);
        
        // Unselect all cells
        this.unselectAllCells();

        // Select the new cell
        this.selectCell(elNew);

        // Set new anchor
        this._oAnchorCell = {record:this.getRecord(elNew), column:this.getColumn(elNew)};
    }
},

/**
 * Returns array of selected TR elements on the page.
 *
 * @method getSelectedTrEls
 * @return {HTMLElement[]} Array of selected TR elements.
 */
getSelectedTrEls : function() {
    return Dom.getElementsByClassName(DT.CLASS_SELECTED,"tr",this._elTbody);
},

/**
 * Sets given row to the selected state.
 *
 * @method selectRow
 * @param row {HTMLElement | String | YAHOO.widget.Record | Number} HTML element
 * reference or ID string, Record instance, or RecordSet position index.
 */
selectRow : function(row) {
    var oRecord, elRow;

    if(row instanceof YAHOO.widget.Record) {
        oRecord = this._oRecordSet.getRecord(row);
        elRow = this.getTrEl(oRecord);
    }
    else if(lang.isNumber(row)) {
        oRecord = this.getRecord(row);
        elRow = this.getTrEl(oRecord);
    }
    else {
        elRow = this.getTrEl(row);
        oRecord = this.getRecord(elRow);
    }

    if(oRecord) {
        // Update selection trackers
        var tracker = this._aSelections || [];
        var sRecordId = oRecord.getId();
        var index = -1;

        // Remove if already there:
        // Use Array.indexOf if available...
        /*if(tracker.indexOf && (tracker.indexOf(sRecordId) >  -1)) {
            tracker.splice(tracker.indexOf(sRecordId),1);
        }*/
        if(tracker.indexOf) {
            index = tracker.indexOf(sRecordId);
            
        }
        // ...or do it the old-fashioned way
        else {
            for(var j=tracker.length-1; j>-1; j--) {
                if(tracker[j] === sRecordId){
                    index = j;
                    break;
                }
            }
        }
        if(index > -1) {
            tracker.splice(index,1);
        }
        
        // Add to the end
        tracker.push(sRecordId);
        this._aSelections = tracker;

        // Update trackers
        if(!this._oAnchorRecord) {
            this._oAnchorRecord = oRecord;
        }

        // Update UI
        if(elRow) {
            Dom.addClass(elRow, DT.CLASS_SELECTED);
        }

        this.fireEvent("rowSelectEvent", {record:oRecord, el:elRow});
    }
    else {
    }
},

/**
 * Sets given row to the unselected state.
 *
 * @method unselectRow
 * @param row {HTMLElement | String | YAHOO.widget.Record | Number} HTML element
 * reference or ID string, Record instance, or RecordSet position index.
 */
unselectRow : function(row) {
    var elRow = this.getTrEl(row);

    var oRecord;
    if(row instanceof YAHOO.widget.Record) {
        oRecord = this._oRecordSet.getRecord(row);
    }
    else if(lang.isNumber(row)) {
        oRecord = this.getRecord(row);
    }
    else {
        oRecord = this.getRecord(elRow);
    }

    if(oRecord) {
        // Update selection trackers
        var tracker = this._aSelections || [];
        var sRecordId = oRecord.getId();
        var index = -1;

        // Use Array.indexOf if available...
        if(tracker.indexOf) {
            index = tracker.indexOf(sRecordId);
        }
        // ...or do it the old-fashioned way
        else {
            for(var j=tracker.length-1; j>-1; j--) {
                if(tracker[j] === sRecordId){
                    index = j;
                    break;
                }
            }
        }
        if(index > -1) {
            // Update tracker
            tracker.splice(index,1);
            this._aSelections = tracker;

            // Update the UI
            Dom.removeClass(elRow, DT.CLASS_SELECTED);

            this.fireEvent("rowUnselectEvent", {record:oRecord, el:elRow});

            return;
        }
    }
},

/**
 * Clears out all row selections.
 *
 * @method unselectAllRows
 */
unselectAllRows : function() {
    // Remove all rows from tracker
    var tracker = this._aSelections || [],
        recId,
        removed = [];
    for(var j=tracker.length-1; j>-1; j--) {
       if(lang.isString(tracker[j])){
            recId = tracker.splice(j,1);
            removed[removed.length] = this.getRecord(lang.isArray(recId) ? recId[0] : recId);
        }
    }

    // Update tracker
    this._aSelections = tracker;

    // Update UI
    this._unselectAllTrEls();

    this.fireEvent("unselectAllRowsEvent", {records: removed});
},

/**
 * Convenience method to remove the class YAHOO.widget.DataTable.CLASS_SELECTED
 * from all TD elements in the internal tracker.
 *
 * @method _unselectAllTdEls
 * @private
 */
_unselectAllTdEls : function() {
    var selectedCells = Dom.getElementsByClassName(DT.CLASS_SELECTED,"td",this._elTbody);
    Dom.removeClass(selectedCells, DT.CLASS_SELECTED);
},

/**
 * Returns array of selected TD elements on the page.
 *
 * @method getSelectedTdEls
 * @return {HTMLElement[]} Array of selected TD elements.
 */
getSelectedTdEls : function() {
    return Dom.getElementsByClassName(DT.CLASS_SELECTED,"td",this._elTbody);
},

/**
 * Sets given cell to the selected state.
 *
 * @method selectCell
 * @param cell {HTMLElement | String | Object} TD element or child of a TD element, or
 * object literal of syntax {record:oRecord, column:oColumn}.
 */
selectCell : function(cell) {
//TODO: accept {record} in selectCell()
    var elCell = this.getTdEl(cell);

    if(elCell) {
        var oRecord = this.getRecord(elCell);
        var oColumn = this.getColumn(this.getCellIndex(elCell));
        var sColumnKey = oColumn.getKey();

        if(oRecord && sColumnKey) {
            // Get Record ID
            var tracker = this._aSelections || [];
            var sRecordId = oRecord.getId();

            // Remove if there
            for(var j=tracker.length-1; j>-1; j--) {
               if((tracker[j].recordId === sRecordId) && (tracker[j].columnKey === sColumnKey)){
                    tracker.splice(j,1);
                    break;
                }
            }

            // Add to the end
            tracker.push({recordId:sRecordId, columnKey:sColumnKey});

            // Update trackers
            this._aSelections = tracker;
            if(!this._oAnchorCell) {
                this._oAnchorCell = {record:oRecord, column:oColumn};
            }

            // Update the UI
            Dom.addClass(elCell, DT.CLASS_SELECTED);

            this.fireEvent("cellSelectEvent", {record:oRecord, column:oColumn, key: sColumnKey, el:elCell});
            return;
        }
    }
},

/**
 * Sets given cell to the unselected state.
 *
 * @method unselectCell
 * @param cell {HTMLElement | String | Object} TD element or child of a TD element, or
 * object literal of syntax {record:oRecord, column:oColumn}.
 * @param cell {HTMLElement | String} DOM element reference or ID string
 * to DataTable page element or RecordSet index.
 */
unselectCell : function(cell) {
    var elCell = this.getTdEl(cell);

    if(elCell) {
        var oRecord = this.getRecord(elCell);
        var oColumn = this.getColumn(this.getCellIndex(elCell));
        var sColumnKey = oColumn.getKey();

        if(oRecord && sColumnKey) {
            // Get Record ID
            var tracker = this._aSelections || [];
            var id = oRecord.getId();

            // Is it selected?
            for(var j=tracker.length-1; j>-1; j--) {
                if((tracker[j].recordId === id) && (tracker[j].columnKey === sColumnKey)){
                    // Remove from tracker
                    tracker.splice(j,1);

                    // Update tracker
                    this._aSelections = tracker;

                    // Update the UI
                    Dom.removeClass(elCell, DT.CLASS_SELECTED);

                    this.fireEvent("cellUnselectEvent", {record:oRecord, column: oColumn, key:sColumnKey, el:elCell});
                    return;
                }
            }
        }
    }
},

/**
 * Clears out all cell selections.
 *
 * @method unselectAllCells
 */
unselectAllCells : function() {
    // Remove all cells from tracker
    var tracker = this._aSelections || [];
    for(var j=tracker.length-1; j>-1; j--) {
       if(lang.isObject(tracker[j])){
            tracker.splice(j,1);
        }
    }

    // Update tracker
    this._aSelections = tracker;

    // Update UI
    this._unselectAllTdEls();

    //TODO: send data to unselectAllCellsEvent handler
    this.fireEvent("unselectAllCellsEvent");
},

/**
 * Returns true if given item is selected, false otherwise.
 *
 * @method isSelected
 * @param o {String | HTMLElement | YAHOO.widget.Record | Number
 * {record:YAHOO.widget.Record, column:YAHOO.widget.Column} } TR or TD element by
 * reference or ID string, a Record instance, a RecordSet position index,
 * or an object literal representation
 * of a cell.
 * @return {Boolean} True if item is selected.
 */
isSelected : function(o) {
    if(o && (o.ownerDocument == document)) {
        return (Dom.hasClass(this.getTdEl(o),DT.CLASS_SELECTED) || Dom.hasClass(this.getTrEl(o),DT.CLASS_SELECTED));
    }
    else {
        var oRecord, sRecordId, j;
        var tracker = this._aSelections;
        if(tracker && tracker.length > 0) {
            // Looking for a Record?
            if(o instanceof YAHOO.widget.Record) {
                oRecord = o;
            }
            else if(lang.isNumber(o)) {
                oRecord = this.getRecord(o);
            }
            if(oRecord) {
                sRecordId = oRecord.getId();

                // Is it there?
                // Use Array.indexOf if available...
                if(tracker.indexOf) {
                    if(tracker.indexOf(sRecordId) >  -1) {
                        return true;
                    }
                }
                // ...or do it the old-fashioned way
                else {
                    for(j=tracker.length-1; j>-1; j--) {
                       if(tracker[j] === sRecordId){
                        return true;
                       }
                    }
                }
            }
            // Looking for a cell
            else if(o.record && o.column){
                sRecordId = o.record.getId();
                var sColumnKey = o.column.getKey();

                for(j=tracker.length-1; j>-1; j--) {
                    if((tracker[j].recordId === sRecordId) && (tracker[j].columnKey === sColumnKey)){
                        return true;
                    }
                }
            }
        }
    }
    return false;
},

/**
 * Returns selected rows as an array of Record IDs.
 *
 * @method getSelectedRows
 * @return {String[]} Array of selected rows by Record ID.
 */
getSelectedRows : function() {
    var aSelectedRows = [];
    var tracker = this._aSelections || [];
    for(var j=0; j<tracker.length; j++) {
       if(lang.isString(tracker[j])){
            aSelectedRows.push(tracker[j]);
        }
    }
    return aSelectedRows;
},

/**
 * Returns selected cells as an array of object literals:
 *     {recordId:sRecordId, columnKey:sColumnKey}.
 *
 * @method getSelectedCells
 * @return {Object[]} Array of selected cells by Record ID and Column ID.
 */
getSelectedCells : function() {
    var aSelectedCells = [];
    var tracker = this._aSelections || [];
    for(var j=0; j<tracker.length; j++) {
       if(tracker[j] && lang.isObject(tracker[j])){
            aSelectedCells.push(tracker[j]);
        }
    }
    return aSelectedCells;
},

/**
 * Returns last selected Record ID.
 *
 * @method getLastSelectedRecord
 * @return {String} Record ID of last selected row.
 */
getLastSelectedRecord : function() {
    var tracker = this._aSelections;
    if(tracker && tracker.length > 0) {
        for(var i=tracker.length-1; i>-1; i--) {
           if(lang.isString(tracker[i])){
                return tracker[i];
            }
        }
    }
},

/**
 * Returns last selected cell as an object literal:
 *     {recordId:sRecordId, columnKey:sColumnKey}.
 *
 * @method getLastSelectedCell
 * @return {Object} Object literal representation of a cell.
 */
getLastSelectedCell : function() {
    var tracker = this._aSelections;
    if(tracker && tracker.length > 0) {
        for(var i=tracker.length-1; i>-1; i--) {
           if(tracker[i].recordId && tracker[i].columnKey){
                return tracker[i];
            }
        }
    }
},

/**
 * Assigns the class YAHOO.widget.DataTable.CLASS_HIGHLIGHTED to the given row.
 *
 * @method highlightRow
 * @param row {HTMLElement | String} DOM element reference or ID string.
 */
highlightRow : function(row) {
    var elRow = this.getTrEl(row);

    if(elRow) {
        // Make sure previous row is unhighlighted
/*        if(this._sLastHighlightedTrElId) {
            Dom.removeClass(this._sLastHighlightedTrElId,DT.CLASS_HIGHLIGHTED);
        }*/
        var oRecord = this.getRecord(elRow);
        Dom.addClass(elRow,DT.CLASS_HIGHLIGHTED);
        //this._sLastHighlightedTrElId = elRow.id;
        this.fireEvent("rowHighlightEvent", {record:oRecord, el:elRow});
        return;
    }
},

/**
 * Removes the class YAHOO.widget.DataTable.CLASS_HIGHLIGHTED from the given row.
 *
 * @method unhighlightRow
 * @param row {HTMLElement | String} DOM element reference or ID string.
 */
unhighlightRow : function(row) {
    var elRow = this.getTrEl(row);

    if(elRow) {
        var oRecord = this.getRecord(elRow);
        Dom.removeClass(elRow,DT.CLASS_HIGHLIGHTED);
        this.fireEvent("rowUnhighlightEvent", {record:oRecord, el:elRow});
        return;
    }
},

/**
 * Assigns the class YAHOO.widget.DataTable.CLASS_HIGHLIGHTED to the given cell.
 *
 * @method highlightCell
 * @param cell {HTMLElement | String} DOM element reference or ID string.
 */
highlightCell : function(cell) {
    var elCell = this.getTdEl(cell);

    if(elCell) {
        // Make sure previous cell is unhighlighted
        if(this._elLastHighlightedTd) {
            this.unhighlightCell(this._elLastHighlightedTd);
        }

        var oRecord = this.getRecord(elCell);
        var oColumn = this.getColumn(this.getCellIndex(elCell));
        var sColumnKey = oColumn.getKey();
        Dom.addClass(elCell,DT.CLASS_HIGHLIGHTED);
        this._elLastHighlightedTd = elCell;
        this.fireEvent("cellHighlightEvent", {record:oRecord, column:oColumn, key:sColumnKey, el:elCell});
        return;
    }
},

/**
 * Removes the class YAHOO.widget.DataTable.CLASS_HIGHLIGHTED from the given cell.
 *
 * @method unhighlightCell
 * @param cell {HTMLElement | String} DOM element reference or ID string.
 */
unhighlightCell : function(cell) {
    var elCell = this.getTdEl(cell);

    if(elCell) {
        var oRecord = this.getRecord(elCell);
        Dom.removeClass(elCell,DT.CLASS_HIGHLIGHTED);
        this._elLastHighlightedTd = null;
        this.fireEvent("cellUnhighlightEvent", {record:oRecord, column:this.getColumn(this.getCellIndex(elCell)), key:this.getColumn(this.getCellIndex(elCell)).getKey(), el:elCell});
        return;
    }
},













































// INLINE EDITING

/**
 * Assigns CellEditor instance to existing Column.
 * @method addCellEditor
 * @param oColumn {YAHOO.widget.Column} Column instance.
 * @param oEditor {YAHOO.wdiget.CellEditor} CellEditor instance.
 */
addCellEditor : function(oColumn, oEditor) {
    oColumn.editor = oEditor;
    oColumn.editor.subscribe("showEvent", this._onEditorShowEvent, this, true);
    oColumn.editor.subscribe("keydownEvent", this._onEditorKeydownEvent, this, true);
    oColumn.editor.subscribe("revertEvent", this._onEditorRevertEvent, this, true);
    oColumn.editor.subscribe("saveEvent", this._onEditorSaveEvent, this, true);
    oColumn.editor.subscribe("cancelEvent", this._onEditorCancelEvent, this, true);
    oColumn.editor.subscribe("blurEvent", this._onEditorBlurEvent, this, true);
    oColumn.editor.subscribe("blockEvent", this._onEditorBlockEvent, this, true);
    oColumn.editor.subscribe("unblockEvent", this._onEditorUnblockEvent, this, true);
},

/**
 * Returns current CellEditor instance, or null.
 * @method getCellEditor
 * @return {YAHOO.widget.CellEditor} CellEditor instance.
 */
getCellEditor : function() {
    return this._oCellEditor;
},


/**
 * Activates and shows CellEditor instance for the given cell while deactivating and
 * canceling previous CellEditor. It is baked into DataTable that only one CellEditor
 * can be active at any given time. 
 *
 * @method showCellEditor
 * @param elCell {HTMLElement | String} Cell to edit.
 */
showCellEditor : function(elCell, oRecord, oColumn) {
    // Get a particular CellEditor
    elCell = this.getTdEl(elCell);
    if(elCell) {
        oColumn = this.getColumn(elCell);
        if(oColumn && oColumn.editor) {
            var oCellEditor = this._oCellEditor;
            // Clean up active CellEditor
            if(oCellEditor) {
                if(this._oCellEditor.cancel) {
                    this._oCellEditor.cancel();
                }
                else if(oCellEditor.isActive) {
                    this.cancelCellEditor();
                }
            }
            
            if(oColumn.editor instanceof YAHOO.widget.BaseCellEditor) {
                // Get CellEditor
                oCellEditor = oColumn.editor;
                var ok = oCellEditor.attach(this, elCell);
                if(ok) {
                    oCellEditor.render();
                    oCellEditor.move();
                    ok = this.doBeforeShowCellEditor(oCellEditor);
                    if(ok) {
                        oCellEditor.show();
                        this._oCellEditor = oCellEditor;
                    }
                }
            }
            // Backward compatibility
            else {
                    if(!oRecord || !(oRecord instanceof YAHOO.widget.Record)) {
                        oRecord = this.getRecord(elCell);
                    }
                    if(!oColumn || !(oColumn instanceof YAHOO.widget.Column)) {
                        oColumn = this.getColumn(elCell);
                    }
                    if(oRecord && oColumn) {
                        if(!this._oCellEditor || this._oCellEditor.container) {
                            this._initCellEditorEl();
                        }
                        
                        // Update Editor values
                        oCellEditor = this._oCellEditor;
                        oCellEditor.cell = elCell;
                        oCellEditor.record = oRecord;
                        oCellEditor.column = oColumn;
                        oCellEditor.validator = (oColumn.editorOptions &&
                                lang.isFunction(oColumn.editorOptions.validator)) ?
                                oColumn.editorOptions.validator : null;
                        oCellEditor.value = oRecord.getData(oColumn.key);
                        oCellEditor.defaultValue = null;
            
                        // Move Editor
                        var elContainer = oCellEditor.container;
                        var x = Dom.getX(elCell);
                        var y = Dom.getY(elCell);
            
                        // SF doesn't get xy for cells in scrolling table
                        // when tbody display is set to block
                        if(isNaN(x) || isNaN(y)) {
                            x = elCell.offsetLeft + // cell pos relative to table
                                    Dom.getX(this._elTbody.parentNode) - // plus table pos relative to document
                                    this._elTbody.scrollLeft; // minus tbody scroll
                            y = elCell.offsetTop + // cell pos relative to table
                                    Dom.getY(this._elTbody.parentNode) - // plus table pos relative to document
                                    this._elTbody.scrollTop + // minus tbody scroll
                                    this._elThead.offsetHeight; // account for fixed THEAD cells
                        }
            
                        elContainer.style.left = x + "px";
                        elContainer.style.top = y + "px";
            
                        // Hook to customize the UI
                        this.doBeforeShowCellEditor(this._oCellEditor);
            
                        //TODO: This is temporarily up here due so elements can be focused
                        // Show Editor
                        elContainer.style.display = "";
            
                        // Handle ESC key
                        Ev.addListener(elContainer, "keydown", function(e, oSelf) {
                            // ESC hides Cell Editor
                            if((e.keyCode == 27)) {
                                oSelf.cancelCellEditor();
                                oSelf.focusTbodyEl();
                            }
                            else {
                                oSelf.fireEvent("editorKeydownEvent", {editor:oSelf._oCellEditor, event:e});
                            }
                        }, this);
            
                        // Render Editor markup
                        var fnEditor;
                        if(lang.isString(oColumn.editor)) {
                            switch(oColumn.editor) {
                                case "checkbox":
                                    fnEditor = DT.editCheckbox;
                                    break;
                                case "date":
                                    fnEditor = DT.editDate;
                                    break;
                                case "dropdown":
                                    fnEditor = DT.editDropdown;
                                    break;
                                case "radio":
                                    fnEditor = DT.editRadio;
                                    break;
                                case "textarea":
                                    fnEditor = DT.editTextarea;
                                    break;
                                case "textbox":
                                    fnEditor = DT.editTextbox;
                                    break;
                                default:
                                    fnEditor = null;
                            }
                        }
                        else if(lang.isFunction(oColumn.editor)) {
                            fnEditor = oColumn.editor;
                        }
            
                        if(fnEditor) {
                            // Create DOM input elements
                            fnEditor(this._oCellEditor, this);
            
                            // Show Save/Cancel buttons
                            if(!oColumn.editorOptions || !oColumn.editorOptions.disableBtns) {
                                this.showCellEditorBtns(elContainer);
                            }
            
                            oCellEditor.isActive = true;
            
                            //TODO: verify which args to pass
                            this.fireEvent("editorShowEvent", {editor:oCellEditor});
                            return;
                        }
                    }



            
            }
        }
    }
},

/**
 * Backward compatibility.
 *
 * @method _initCellEditorEl
 * @private
 * @deprecated Use BaseCellEditor class.
 */
_initCellEditorEl : function() {
    // Attach Cell Editor container element as first child of body
    var elCellEditor = document.createElement("div");
    elCellEditor.id = this._sId + "-celleditor";
    elCellEditor.style.display = "none";
    elCellEditor.tabIndex = 0;
    Dom.addClass(elCellEditor, DT.CLASS_EDITOR);
    var elFirstChild = Dom.getFirstChild(document.body);
    if(elFirstChild) {
        elCellEditor = Dom.insertBefore(elCellEditor, elFirstChild);
    }
    else {
        elCellEditor = document.body.appendChild(elCellEditor);
    }
    
    // Internal tracker of Cell Editor values
    var oCellEditor = {};
    oCellEditor.container = elCellEditor;
    oCellEditor.value = null;
    oCellEditor.isActive = false;
    this._oCellEditor = oCellEditor;
},

/**
 * Overridable abstract method to customize CellEditor before showing.
 *
 * @method doBeforeShowCellEditor
 * @param oCellEditor {YAHOO.widget.CellEditor} The CellEditor instance.
 * @return {Boolean} Return true to continue showing CellEditor.
 */
doBeforeShowCellEditor : function(oCellEditor) {
    return true;
},

/**
 * Saves active CellEditor input to Record and upates DOM UI.
 *
 * @method saveCellEditor
 */
saveCellEditor : function() {
    if(this._oCellEditor) {
        if(this._oCellEditor.save) {
            this._oCellEditor.save();
        }
        // Backward compatibility
        else if(this._oCellEditor.isActive) {
            var newData = this._oCellEditor.value;
            // Copy the data to pass to the event
            //var oldData = YAHOO.widget.DataTable._cloneObject(this._oCellEditor.record.getData(this._oCellEditor.column.key));
            var oldData = this._oCellEditor.record.getData(this._oCellEditor.column.key);
    
            // Validate input data
            if(this._oCellEditor.validator) {
                newData = this._oCellEditor.value = this._oCellEditor.validator.call(this, newData, oldData, this._oCellEditor);
                if(newData === null ) {
                    this.resetCellEditor();
                    this.fireEvent("editorRevertEvent",
                            {editor:this._oCellEditor, oldData:oldData, newData:newData});
                    return;
                }
            }
            // Update the Record
            this._oRecordSet.updateRecordValue(this._oCellEditor.record, this._oCellEditor.column.key, this._oCellEditor.value);
            // Update the UI
            this.formatCell(this._oCellEditor.cell.firstChild, this._oCellEditor.record, this._oCellEditor.column);
            
            // Bug fix 1764044
            this._oChainRender.add({
                method: function() {
                    this.validateColumnWidths();
                },
                scope: this
            });
            this._oChainRender.run();
            // Clear out the Cell Editor
            this.resetCellEditor();
    
            this.fireEvent("editorSaveEvent",
                    {editor:this._oCellEditor, oldData:oldData, newData:newData});
        }
    }   
},

/**
 * Cancels active CellEditor.
 *
 * @method cancelCellEditor
 */
cancelCellEditor : function() {
    if(this._oCellEditor) {
        if(this._oCellEditor.cancel) {
            this._oCellEditor.cancel();
        }
        // Backward compatibility
        else if(this._oCellEditor.isActive) {
            this.resetCellEditor();
            //TODO: preserve values for the event?
            this.fireEvent("editorCancelEvent", {editor:this._oCellEditor});
        }

    }
},

/**
 * Destroys active CellEditor instance and UI.
 *
 * @method destroyCellEditor
 */
destroyCellEditor : function() {
    if(this._oCellEditor) {
        this._oCellEditor.destroy();
        this._oCellEditor = null;
    }   
},

/**
 * Passes through showEvent of the active CellEditor.
 *
 * @method _onEditorShowEvent
 * @param oArgs {Object}  Custom Event args.
 * @private 
 */
_onEditorShowEvent : function(oArgs) {
    this.fireEvent("editorShowEvent", oArgs);
},

/**
 * Passes through keydownEvent of the active CellEditor.
 * @param oArgs {Object}  Custom Event args. 
 *
 * @method _onEditorKeydownEvent
 * @private 
 */
_onEditorKeydownEvent : function(oArgs) {
    this.fireEvent("editorKeydownEvent", oArgs);
},

/**
 * Passes through revertEvent of the active CellEditor.
 *
 * @method _onEditorRevertEvent
 * @param oArgs {Object}  Custom Event args. 
 * @private  
 */
_onEditorRevertEvent : function(oArgs) {
    this.fireEvent("editorRevertEvent", oArgs);
},

/**
 * Passes through saveEvent of the active CellEditor.
 *
 * @method _onEditorSaveEvent
 * @param oArgs {Object}  Custom Event args.  
 * @private 
 */
_onEditorSaveEvent : function(oArgs) {
    this.fireEvent("editorSaveEvent", oArgs);
},

/**
 * Passes through cancelEvent of the active CellEditor.
 *
 * @method _onEditorCancelEvent
 * @param oArgs {Object}  Custom Event args.
 * @private   
 */
_onEditorCancelEvent : function(oArgs) {
    this.fireEvent("editorCancelEvent", oArgs);
},

/**
 * Passes through blurEvent of the active CellEditor.
 *
 * @method _onEditorBlurEvent
 * @param oArgs {Object}  Custom Event args. 
 * @private  
 */
_onEditorBlurEvent : function(oArgs) {
    this.fireEvent("editorBlurEvent", oArgs);
},

/**
 * Passes through blockEvent of the active CellEditor.
 *
 * @method _onEditorBlockEvent
 * @param oArgs {Object}  Custom Event args. 
 * @private  
 */
_onEditorBlockEvent : function(oArgs) {
    this.fireEvent("editorBlockEvent", oArgs);
},

/**
 * Passes through unblockEvent of the active CellEditor.
 *
 * @method _onEditorUnblockEvent
 * @param oArgs {Object}  Custom Event args. 
 * @private  
 */
_onEditorUnblockEvent : function(oArgs) {
    this.fireEvent("editorUnblockEvent", oArgs);
},

/**
 * Public handler of the editorBlurEvent. By default, saves on blur if
 * disableBtns is true, otherwise cancels on blur. 
 *
 * @method onEditorBlurEvent
 * @param oArgs {Object}  Custom Event args.  
 */
onEditorBlurEvent : function(oArgs) {
    if(oArgs.editor.disableBtns) {
        // Save on blur
        if(oArgs.editor.save) { // Backward incompatible
            oArgs.editor.save();
        }
    }      
    else if(oArgs.editor.cancel) { // Backward incompatible
        // Cancel on blur
        oArgs.editor.cancel();
    }      
},

/**
 * Public handler of the editorBlockEvent. By default, disables DataTable UI.
 *
 * @method onEditorBlockEvent
 * @param oArgs {Object}  Custom Event args.  
 */
onEditorBlockEvent : function(oArgs) {
    this.disable();
},

/**
 * Public handler of the editorUnblockEvent. By default, undisables DataTable UI.
 *
 * @method onEditorUnblockEvent
 * @param oArgs {Object}  Custom Event args.  
 */
onEditorUnblockEvent : function(oArgs) {
    this.undisable();
},






































// ABSTRACT METHODS

/**
 * Overridable method gives implementers a hook to access data before
 * it gets added to RecordSet and rendered to the TBODY.
 *
 * @method doBeforeLoadData
 * @param sRequest {String} Original request.
 * @param oResponse {Object} <a href="http://developer.yahoo.com/yui/datasource/#ds_oParsedResponse">Response object</a>.
 * @param oPayload {MIXED} additional arguments
 * @return {Boolean} Return true to continue loading data into RecordSet and
 * updating DataTable with new Records, false to cancel.
 */
doBeforeLoadData : function(sRequest, oResponse, oPayload) {
    return true;
},































































/////////////////////////////////////////////////////////////////////////////
//
// Public Custom Event Handlers
//
/////////////////////////////////////////////////////////////////////////////

/**
 * Custom event handler to sort Column.
 *
 * @method onEventSortColumn
 * @param oArgs.event {HTMLEvent} Event object.
 * @param oArgs.target {HTMLElement} Target element.
 */
onEventSortColumn : function(oArgs) {
//TODO: support form elements in sortable columns
    var evt = oArgs.event;
    var target = oArgs.target;

    var el = this.getThEl(target) || this.getTdEl(target);
    if(el) {
        var oColumn = this.getColumn(el);
        if(oColumn.sortable) {
            Ev.stopEvent(evt);
            this.sortColumn(oColumn);
        }
    }
    else {
    }
},

/**
 * Custom event handler to select Column.
 *
 * @method onEventSelectColumn
 * @param oArgs.event {HTMLEvent} Event object.
 * @param oArgs.target {HTMLElement} Target element.
 */
onEventSelectColumn : function(oArgs) {
    this.selectColumn(oArgs.target);
},

/**
 * Custom event handler to highlight Column. Accounts for spurious
 * caused-by-child events. 
 *
 * @method onEventHighlightColumn
 * @param oArgs.event {HTMLEvent} Event object.
 * @param oArgs.target {HTMLElement} Target element.
 */
onEventHighlightColumn : function(oArgs) {
    this.highlightColumn(oArgs.target);
},

/**
 * Custom event handler to unhighlight Column. Accounts for spurious
 * caused-by-child events. 
 *
 * @method onEventUnhighlightColumn
 * @param oArgs.event {HTMLEvent} Event object.
 * @param oArgs.target {HTMLElement} Target element.
 */
onEventUnhighlightColumn : function(oArgs) {
    this.unhighlightColumn(oArgs.target);
},

/**
 * Custom event handler to manage selection according to desktop paradigm.
 *
 * @method onEventSelectRow
 * @param oArgs.event {HTMLEvent} Event object.
 * @param oArgs.target {HTMLElement} Target element.
 */
onEventSelectRow : function(oArgs) {
    var sMode = this.get("selectionMode");
    if(sMode == "single") {
        this._handleSingleSelectionByMouse(oArgs);
    }
    else {
        this._handleStandardSelectionByMouse(oArgs);
    }
},

/**
 * Custom event handler to select cell.
 *
 * @method onEventSelectCell
 * @param oArgs.event {HTMLEvent} Event object.
 * @param oArgs.target {HTMLElement} Target element.
 */
onEventSelectCell : function(oArgs) {
    var sMode = this.get("selectionMode");
    if(sMode == "cellblock") {
        this._handleCellBlockSelectionByMouse(oArgs);
    }
    else if(sMode == "cellrange") {
        this._handleCellRangeSelectionByMouse(oArgs);
    }
    else {
        this._handleSingleCellSelectionByMouse(oArgs);
    }
},

/**
 * Custom event handler to highlight row. Accounts for spurious
 * caused-by-child events. 
 *
 * @method onEventHighlightRow
 * @param oArgs.event {HTMLEvent} Event object.
 * @param oArgs.target {HTMLElement} Target element.
 */
onEventHighlightRow : function(oArgs) {
    this.highlightRow(oArgs.target);
},

/**
 * Custom event handler to unhighlight row. Accounts for spurious
 * caused-by-child events. 
 *
 * @method onEventUnhighlightRow
 * @param oArgs.event {HTMLEvent} Event object.
 * @param oArgs.target {HTMLElement} Target element.
 */
onEventUnhighlightRow : function(oArgs) {
    this.unhighlightRow(oArgs.target);
},

/**
 * Custom event handler to highlight cell. Accounts for spurious
 * caused-by-child events. 
 *
 * @method onEventHighlightCell
 * @param oArgs.event {HTMLEvent} Event object.
 * @param oArgs.target {HTMLElement} Target element.
 */
onEventHighlightCell : function(oArgs) {
    this.highlightCell(oArgs.target);
},

/**
 * Custom event handler to unhighlight cell. Accounts for spurious
 * caused-by-child events. 
 *
 * @method onEventUnhighlightCell
 * @param oArgs.event {HTMLEvent} Event object.
 * @param oArgs.target {HTMLElement} Target element.
 */
onEventUnhighlightCell : function(oArgs) {
    this.unhighlightCell(oArgs.target);
},

/**
 * Custom event handler to format cell.
 *
 * @method onEventFormatCell
 * @param oArgs.event {HTMLEvent} Event object.
 * @param oArgs.target {HTMLElement} Target element.
 */
onEventFormatCell : function(oArgs) {
    var target = oArgs.target;

    var elCell = this.getTdEl(target);
    if(elCell) {
        var oColumn = this.getColumn(this.getCellIndex(elCell));
        this.formatCell(elCell.firstChild, this.getRecord(elCell), oColumn);
    }
    else {
    }
},

/**
 * Custom event handler to edit cell.
 *
 * @method onEventShowCellEditor
 * @param oArgs.event {HTMLEvent} Event object.
 * @param oArgs.target {HTMLElement} Target element.
 */
onEventShowCellEditor : function(oArgs) {
    if(!this.isDisabled()) {
        this.showCellEditor(oArgs.target);
    }
},

/**
 * Custom event handler to save active CellEditor input.
 *
 * @method onEventSaveCellEditor
 */
onEventSaveCellEditor : function(oArgs) {
    if(this._oCellEditor) {
        if(this._oCellEditor.save) {
            this._oCellEditor.save();
        }
        // Backward compatibility
        else {
            this.saveCellEditor();
        }
    }
},

/**
 * Custom event handler to cancel active CellEditor.
 *
 * @method onEventCancelCellEditor
 */
onEventCancelCellEditor : function(oArgs) {
    if(this._oCellEditor) {
        if(this._oCellEditor.cancel) {
            this._oCellEditor.cancel();
        }
        // Backward compatibility
        else {
            this.cancelCellEditor();
        }
    }
},

/**
 * Callback function receives data from DataSource and populates an entire
 * DataTable with Records and TR elements, clearing previous Records, if any.
 *
 * @method onDataReturnInitializeTable
 * @param sRequest {String} Original request.
 * @param oResponse {Object} <a href="http://developer.yahoo.com/yui/datasource/#ds_oParsedResponse">Response object</a>.
 * @param oPayload {MIXED} (optional) Additional argument(s)
 */
onDataReturnInitializeTable : function(sRequest, oResponse, oPayload) {
    if((this instanceof DT) && this._sId) {
        this.initializeTable();
    
        this.onDataReturnSetRows(sRequest,oResponse,oPayload);
    }
},

/**
 * Callback function receives reponse from DataSource, replaces all existing
 * Records in  RecordSet, updates TR elements with new data, and updates state
 * UI for pagination and sorting from payload data, if necessary. 
 *  
 * @method onDataReturnReplaceRows
 * @param oRequest {MIXED} Original generated request.
 * @param oResponse {Object} <a href="http://developer.yahoo.com/yui/datasource/#ds_oParsedResponse">Response object</a>.
 * @param oPayload {MIXED} (optional) Additional argument(s)
 */
onDataReturnReplaceRows : function(oRequest, oResponse, oPayload) {
    if((this instanceof DT) && this._sId) {
        this.fireEvent("dataReturnEvent", {request:oRequest,response:oResponse,payload:oPayload});
    
        // Pass data through abstract method for any transformations
        var ok    = this.doBeforeLoadData(oRequest, oResponse, oPayload),
            pag   = this.get('paginator'),
            index = 0;
    
        // Data ok to set
        if(ok && oResponse && !oResponse.error && lang.isArray(oResponse.results)) {
            // Update Records
            this._oRecordSet.reset();
    
            if (this.get('dynamicData')) {
                if (oPayload && oPayload.pagination &&
                    lang.isNumber(oPayload.pagination.recordOffset)) {
                    index = oPayload.pagination.recordOffset;
                } else if (pag) {
                    index = pag.getStartIndex();
                }
            }
    
            this._oRecordSet.setRecords(oResponse.results, index | 0);
            
            // Update state
            this._handleDataReturnPayload(oRequest, oResponse, oPayload);
            
            // Update UI
            this.render();    
        }
        // Error
        else if(ok && oResponse.error) {
            this.showTableMessage(this.get("MSG_ERROR"), DT.CLASS_ERROR);
        }
    }
},

/**
 * Callback function receives data from DataSource and appends to an existing
 * DataTable new Records and, if applicable, creates or updates
 * corresponding TR elements.
 *
 * @method onDataReturnAppendRows
 * @param sRequest {String} Original request.
 * @param oResponse {Object} <a href="http://developer.yahoo.com/yui/datasource/#ds_oParsedResponse">Response object</a>.
 * @param oPayload {MIXED} (optional) Additional argument(s)
 */
onDataReturnAppendRows : function(sRequest, oResponse, oPayload) {
    if((this instanceof DT) && this._sId) {
        this.fireEvent("dataReturnEvent", {request:sRequest,response:oResponse,payload:oPayload});
    
        // Pass data through abstract method for any transformations
        var ok = this.doBeforeLoadData(sRequest, oResponse, oPayload);
    
        // Data ok to append
        if(ok && oResponse && !oResponse.error && lang.isArray(oResponse.results)) {        
            // Append rows
            this.addRows(oResponse.results);
    
            // Update state
            this._handleDataReturnPayload(sRequest, oResponse, oPayload);
        }
        // Error
        else if(ok && oResponse.error) {
            this.showTableMessage(this.get("MSG_ERROR"), DT.CLASS_ERROR);
        }
    }
},

/**
 * Callback function receives data from DataSource and inserts new records
 * starting at the index specified in oPayload.insertIndex. The value for
 * oPayload.insertIndex can be populated when sending the request to the DataSource,
 * or by accessing oPayload.insertIndex with the doBeforeLoadData() method at runtime.
 * If applicable, creates or updates corresponding TR elements.
 *
 * @method onDataReturnInsertRows
 * @param sRequest {String} Original request.
 * @param oResponse {Object} <a href="http://developer.yahoo.com/yui/datasource/#ds_oParsedResponse">Response object</a>.
 * @param oPayload {MIXED} Argument payload, looks in oPayload.insertIndex.
 */
onDataReturnInsertRows : function(sRequest, oResponse, oPayload) {
    if((this instanceof DT) && this._sId) {
        this.fireEvent("dataReturnEvent", {request:sRequest,response:oResponse,payload:oPayload});
    
        // Pass data through abstract method for any transformations
        var ok = this.doBeforeLoadData(sRequest, oResponse, oPayload);
    
        // Data ok to append
        if(ok && oResponse && !oResponse.error && lang.isArray(oResponse.results)) {
            // Insert rows
            this.addRows(oResponse.results, (oPayload ? oPayload.insertIndex : 0));
    
            // Update state
            this._handleDataReturnPayload(sRequest, oResponse, oPayload);
        }
        // Error
        else if(ok && oResponse.error) {
            this.showTableMessage(this.get("MSG_ERROR"), DT.CLASS_ERROR);
        }
    }
},

/**
 * Callback function receives data from DataSource and incrementally updates Records
 * starting at the index specified in oPayload.updateIndex. The value for
 * oPayload.updateIndex can be populated when sending the request to the DataSource,
 * or by accessing oPayload.updateIndex with the doBeforeLoadData() method at runtime.
 * If applicable, creates or updates corresponding TR elements.
 *
 * @method onDataReturnUpdateRows
 * @param sRequest {String} Original request.
 * @param oResponse {Object} <a href="http://developer.yahoo.com/yui/datasource/#ds_oParsedResponse">Response object</a>.
 * @param oPayload {MIXED} Argument payload, looks in oPayload.updateIndex.
 */
onDataReturnUpdateRows : function(sRequest, oResponse, oPayload) {
    if((this instanceof DT) && this._sId) {
        this.fireEvent("dataReturnEvent", {request:sRequest,response:oResponse,payload:oPayload});
    
        // Pass data through abstract method for any transformations
        var ok = this.doBeforeLoadData(sRequest, oResponse, oPayload);
    
        // Data ok to append
        if(ok && oResponse && !oResponse.error && lang.isArray(oResponse.results)) {
            // Insert rows
            this.updateRows((oPayload ? oPayload.updateIndex : 0), oResponse.results);
    
            // Update state
            this._handleDataReturnPayload(sRequest, oResponse, oPayload);
        }
        // Error
        else if(ok && oResponse.error) {
            this.showTableMessage(this.get("MSG_ERROR"), DT.CLASS_ERROR);
        }
    }
},

/**
 * Callback function receives reponse from DataSource and populates the
 * RecordSet with the results.
 *  
 * @method onDataReturnSetRows
 * @param oRequest {MIXED} Original generated request.
 * @param oResponse {Object} <a href="http://developer.yahoo.com/yui/datasource/#ds_oParsedResponse">Response object</a>.
 * @param oPayload {MIXED} (optional) Additional argument(s)
 */
onDataReturnSetRows : function(oRequest, oResponse, oPayload) {
    if((this instanceof DT) && this._sId) {
        this.fireEvent("dataReturnEvent", {request:oRequest,response:oResponse,payload:oPayload});
    
        // Pass data through abstract method for any transformations
        var ok    = this.doBeforeLoadData(oRequest, oResponse, oPayload),
            pag   = this.get('paginator'),
            index = 0;
    
        // Data ok to set
        if(ok && oResponse && !oResponse.error && lang.isArray(oResponse.results)) {
            // Update Records
            if (this.get('dynamicData')) {
                if (oPayload && oPayload.pagination &&
                    lang.isNumber(oPayload.pagination.recordOffset)) {
                    index = oPayload.pagination.recordOffset;
                } else if (pag) {
                    index = pag.getStartIndex();
                }
                
                this._oRecordSet.reset(); // Bug 2290604: dyanmic data shouldn't keep accumulating by default
            }
    
            this._oRecordSet.setRecords(oResponse.results, index | 0);
    
            // Update state
            this._handleDataReturnPayload(oRequest, oResponse, oPayload);
            
            // Update UI
            this.render();
        }
        // Error
        else if(ok && oResponse.error) {
            this.showTableMessage(this.get("MSG_ERROR"), DT.CLASS_ERROR);
        }
    }
    else {
    }
},

/**
 * Hook to update oPayload before consumption.
 *  
 * @method handleDataReturnPayload
 * @param oRequest {MIXED} Original generated request.
 * @param oResponse {Object} <a href="http://developer.yahoo.com/yui/datasource/#ds_oParsedResponse">Response object</a>.
 * @param oPayload {MIXED} State values.
 * @return oPayload {MIXED} State values.
 */
handleDataReturnPayload : function (oRequest, oResponse, oPayload) {
    return oPayload || {};
},

/**
 * Updates the DataTable with state data sent in an onDataReturn* payload.
 *  
 * @method _handleDataReturnPayload
 * @param oRequest {MIXED} Original generated request.
 * @param oResponse {Object} <a href="http://developer.yahoo.com/yui/datasource/#ds_oParsedResponse">Response object</a>.
 * @param oPayload {MIXED} State values
 * @private
 */
_handleDataReturnPayload : function (oRequest, oResponse, oPayload) {
    oPayload = this.handleDataReturnPayload(oRequest, oResponse, oPayload);
    if(oPayload) {
        // Update pagination
        var oPaginator = this.get('paginator');
        if (oPaginator) {
            // Update totalRecords
            if(this.get("dynamicData")) {
                if (widget.Paginator.isNumeric(oPayload.totalRecords)) {
                    oPaginator.set('totalRecords',oPayload.totalRecords);
                }
            }
            else {
                oPaginator.set('totalRecords',this._oRecordSet.getLength());
            }
            // Update other paginator values
            if (lang.isObject(oPayload.pagination)) {
                oPaginator.set('rowsPerPage',oPayload.pagination.rowsPerPage);
                oPaginator.set('recordOffset',oPayload.pagination.recordOffset);
            }
        }

        // Update sorting
        if (oPayload.sortedBy) {
            // Set the sorting values in preparation for refresh
            this.set('sortedBy', oPayload.sortedBy);
        }
        // Backwards compatibility for sorting
        else if (oPayload.sorting) {
            // Set the sorting values in preparation for refresh
            this.set('sortedBy', oPayload.sorting);
        }
    }
},

































    /////////////////////////////////////////////////////////////////////////////
    //
    // Custom Events
    //
    /////////////////////////////////////////////////////////////////////////////

    /**
     * Fired when the DataTable's rows are rendered from an initialized state.
     *
     * @event initEvent
     */

    /**
     * Fired before the DataTable's DOM is rendered or modified.
     *
     * @event beforeRenderEvent
     */

    /**
     * Fired when the DataTable's DOM is rendered or modified.
     *
     * @event renderEvent
     */

    /**
     * Fired when the DataTable's post-render routine is complete, including
     * Column width validations.
     *
     * @event postRenderEvent
     */

    /**
     * Fired when the DataTable is disabled.
     *
     * @event disableEvent
     */

    /**
     * Fired when the DataTable is undisabled.
     *
     * @event undisableEvent
     */

    /**
     * Fired when data is returned from DataSource but before it is consumed by
     * DataTable.
     *
     * @event dataReturnEvent
     * @param oArgs.request {String} Original request.
     * @param oArgs.response {Object} Response object.
     */

    /**
     * Fired when the DataTable has a focus event.
     *
     * @event tableFocusEvent
     */

    /**
     * Fired when the DataTable THEAD element has a focus event.
     *
     * @event theadFocusEvent
     */

    /**
     * Fired when the DataTable TBODY element has a focus event.
     *
     * @event tbodyFocusEvent
     */

    /**
     * Fired when the DataTable has a blur event.
     *
     * @event tableBlurEvent
     */

    /*TODO implement theadBlurEvent
     * Fired when the DataTable THEAD element has a blur event.
     *
     * @event theadBlurEvent
     */

    /*TODO: implement tbodyBlurEvent
     * Fired when the DataTable TBODY element has a blur event.
     *
     * @event tbodyBlurEvent
     */

    /**
     * Fired when the DataTable has a key event.
     *
     * @event tableKeyEvent
     * @param oArgs.event {HTMLEvent} The event object.
     * @param oArgs.target {HTMLElement} The DataTable's TABLE element.
     */

    /**
     * Fired when the DataTable THEAD element has a key event.
     *
     * @event theadKeyEvent
     * @param oArgs.event {HTMLEvent} The event object.
     * @param oArgs.target {HTMLElement} The DataTable's TABLE element.
     */

    /**
     * Fired when the DataTable TBODY element has a key event.
     *
     * @event tbodyKeyEvent
     * @param oArgs.event {HTMLEvent} The event object.
     * @param oArgs.target {HTMLElement} The DataTable's TABLE element.
     */

    /**
     * Fired when the DataTable has a mouseover.
     *
     * @event tableMouseoverEvent
     * @param oArgs.event {HTMLEvent} The event object.
     * @param oArgs.target {HTMLElement} The DataTable's TABLE element.
     *
     */

    /**
     * Fired when the DataTable has a mouseout.
     *
     * @event tableMouseoutEvent
     * @param oArgs.event {HTMLEvent} The event object.
     * @param oArgs.target {HTMLElement} The DataTable's TABLE element.
     *
     */

    /**
     * Fired when the DataTable has a mousedown.
     *
     * @event tableMousedownEvent
     * @param oArgs.event {HTMLEvent} The event object.
     * @param oArgs.target {HTMLElement} The DataTable's TABLE element.
     *
     */

    /**
     * Fired when the DataTable has a mouseup.
     *
     * @event tableMouseupEvent
     * @param oArgs.event {HTMLEvent} The event object.
     * @param oArgs.target {HTMLElement} The DataTable's TABLE element.
     *
     */

    /**
     * Fired when the DataTable has a click.
     *
     * @event tableClickEvent
     * @param oArgs.event {HTMLEvent} The event object.
     * @param oArgs.target {HTMLElement} The DataTable's TABLE element.
     *
     */

    /**
     * Fired when the DataTable has a dblclick.
     *
     * @event tableDblclickEvent
     * @param oArgs.event {HTMLEvent} The event object.
     * @param oArgs.target {HTMLElement} The DataTable's TABLE element.
     *
     */

    /**
     * Fired when a message is shown in the DataTable's message element.
     *
     * @event tableMsgShowEvent
     * @param oArgs.html {HTML} The HTML displayed.
     * @param oArgs.className {String} The className assigned.
     *
     */

    /**
     * Fired when the DataTable's message element is hidden.
     *
     * @event tableMsgHideEvent
     */

    /**
     * Fired when a THEAD row has a mouseover.
     *
     * @event theadRowMouseoverEvent
     * @param oArgs.event {HTMLEvent} The event object.
     * @param oArgs.target {HTMLElement} The TR element.
     */

    /**
     * Fired when a THEAD row has a mouseout.
     *
     * @event theadRowMouseoutEvent
     * @param oArgs.event {HTMLEvent} The event object.
     * @param oArgs.target {HTMLElement} The TR element.
     */

    /**
     * Fired when a THEAD row has a mousedown.
     *
     * @event theadRowMousedownEvent
     * @param oArgs.event {HTMLEvent} The event object.
     * @param oArgs.target {HTMLElement} The TR element.
     */

    /**
     * Fired when a THEAD row has a mouseup.
     *
     * @event theadRowMouseupEvent
     * @param oArgs.event {HTMLEvent} The event object.
     * @param oArgs.target {HTMLElement} The TR element.
     */

    /**
     * Fired when a THEAD row has a click.
     *
     * @event theadRowClickEvent
     * @param oArgs.event {HTMLEvent} The event object.
     * @param oArgs.target {HTMLElement} The TR element.
     */

    /**
     * Fired when a THEAD row has a dblclick.
     *
     * @event theadRowDblclickEvent
     * @param oArgs.event {HTMLEvent} The event object.
     * @param oArgs.target {HTMLElement} The TR element.
     */

    /**
     * Fired when a THEAD cell has a mouseover.
     *
     * @event theadCellMouseoverEvent
     * @param oArgs.event {HTMLEvent} The event object.
     * @param oArgs.target {HTMLElement} The TH element.
     *
     */

    /**
     * Fired when a THEAD cell has a mouseout.
     *
     * @event theadCellMouseoutEvent
     * @param oArgs.event {HTMLEvent} The event object.
     * @param oArgs.target {HTMLElement} The TH element.
     *
     */

    /**
     * Fired when a THEAD cell has a mousedown.
     *
     * @event theadCellMousedownEvent
     * @param oArgs.event {HTMLEvent} The event object.
     * @param oArgs.target {HTMLElement} The TH element.
     */

    /**
     * Fired when a THEAD cell has a mouseup.
     *
     * @event theadCellMouseupEvent
     * @param oArgs.event {HTMLEvent} The event object.
     * @param oArgs.target {HTMLElement} The TH element.
     */

    /**
     * Fired when a THEAD cell has a click.
     *
     * @event theadCellClickEvent
     * @param oArgs.event {HTMLEvent} The event object.
     * @param oArgs.target {HTMLElement} The TH element.
     */

    /**
     * Fired when a THEAD cell has a dblclick.
     *
     * @event theadCellDblclickEvent
     * @param oArgs.event {HTMLEvent} The event object.
     * @param oArgs.target {HTMLElement} The TH element.
     */

    /**
     * Fired when a THEAD label has a mouseover.
     *
     * @event theadLabelMouseoverEvent
     * @param oArgs.event {HTMLEvent} The event object.
     * @param oArgs.target {HTMLElement} The SPAN element.
     *
     */

    /**
     * Fired when a THEAD label has a mouseout.
     *
     * @event theadLabelMouseoutEvent
     * @param oArgs.event {HTMLEvent} The event object.
     * @param oArgs.target {HTMLElement} The SPAN element.
     *
     */

    /**
     * Fired when a THEAD label has a mousedown.
     *
     * @event theadLabelMousedownEvent
     * @param oArgs.event {HTMLEvent} The event object.
     * @param oArgs.target {HTMLElement} The SPAN element.
     */

    /**
     * Fired when a THEAD label has a mouseup.
     *
     * @event theadLabelMouseupEvent
     * @param oArgs.event {HTMLEvent} The event object.
     * @param oArgs.target {HTMLElement} The SPAN element.
     */

    /**
     * Fired when a THEAD label has a click.
     *
     * @event theadLabelClickEvent
     * @param oArgs.event {HTMLEvent} The event object.
     * @param oArgs.target {HTMLElement} The SPAN element.
     */

    /**
     * Fired when a THEAD label has a dblclick.
     *
     * @event theadLabelDblclickEvent
     * @param oArgs.event {HTMLEvent} The event object.
     * @param oArgs.target {HTMLElement} The SPAN element.
     */

    /**
     * Fired when a column is sorted.
     *
     * @event columnSortEvent
     * @param oArgs.column {YAHOO.widget.Column} The Column instance.
     * @param oArgs.dir {String} Sort direction: YAHOO.widget.DataTable.CLASS_ASC
     * or YAHOO.widget.DataTable.CLASS_DESC.
     */

    /**
     * Fired when a column width is set.
     *
     * @event columnSetWidthEvent
     * @param oArgs.column {YAHOO.widget.Column} The Column instance.
     * @param oArgs.width {Number} The width in pixels.
     */

    /**
     * Fired when a column width is unset.
     *
     * @event columnUnsetWidthEvent
     * @param oArgs.column {YAHOO.widget.Column} The Column instance.
     */

    /**
     * Fired when a column is drag-resized.
     *
     * @event columnResizeEvent
     * @param oArgs.column {YAHOO.widget.Column} The Column instance.
     * @param oArgs.target {HTMLElement} The TH element.
     * @param oArgs.width {Number} Width in pixels.     
     */

    /**
     * Fired when a Column is moved to a new index.
     *
     * @event columnReorderEvent
     * @param oArgs.column {YAHOO.widget.Column} The Column instance.
     * @param oArgs.oldIndex {Number} The previous tree index position.
     */

    /**
     * Fired when a column is hidden.
     *
     * @event columnHideEvent
     * @param oArgs.column {YAHOO.widget.Column} The Column instance.
     */

    /**
     * Fired when a column is shown.
     *
     * @event columnShowEvent
     * @param oArgs.column {YAHOO.widget.Column} The Column instance.
     */

    /**
     * Fired when a column is selected.
     *
     * @event columnSelectEvent
     * @param oArgs.column {YAHOO.widget.Column} The Column instance.
     */

    /**
     * Fired when a column is unselected.
     *
     * @event columnUnselectEvent
     * @param oArgs.column {YAHOO.widget.Column} The Column instance.
     */
    /**
     * Fired when a column is removed.
     *
     * @event columnRemoveEvent
     * @param oArgs.column {YAHOO.widget.Column} The Column instance.
     */

    /**
     * Fired when a column is inserted.
     *
     * @event columnInsertEvent
     * @param oArgs.column {YAHOO.widget.Column} The Column instance.
     * @param oArgs.index {Number} The index position.
     */

    /**
     * Fired when a column is highlighted.
     *
     * @event columnHighlightEvent
     * @param oArgs.column {YAHOO.widget.Column} The highlighted Column.
     */

    /**
     * Fired when a column is unhighlighted.
     *
     * @event columnUnhighlightEvent
     * @param oArgs.column {YAHOO.widget.Column} The unhighlighted Column.
     */


    /**
     * Fired when a row has a mouseover.
     *
     * @event rowMouseoverEvent
     * @param oArgs.event {HTMLEvent} The event object.
     * @param oArgs.target {HTMLElement} The TR element.
     */

    /**
     * Fired when a row has a mouseout.
     *
     * @event rowMouseoutEvent
     * @param oArgs.event {HTMLEvent} The event object.
     * @param oArgs.target {HTMLElement} The TR element.
     */

    /**
     * Fired when a row has a mousedown.
     *
     * @event rowMousedownEvent
     * @param oArgs.event {HTMLEvent} The event object.
     * @param oArgs.target {HTMLElement} The TR element.
     */

    /**
     * Fired when a row has a mouseup.
     *
     * @event rowMouseupEvent
     * @param oArgs.event {HTMLEvent} The event object.
     * @param oArgs.target {HTMLElement} The TR element.
     */

    /**
     * Fired when a row has a click.
     *
     * @event rowClickEvent
     * @param oArgs.event {HTMLEvent} The event object.
     * @param oArgs.target {HTMLElement} The TR element.
     */

    /**
     * Fired when a row has a dblclick.
     *
     * @event rowDblclickEvent
     * @param oArgs.event {HTMLEvent} The event object.
     * @param oArgs.target {HTMLElement} The TR element.
     */

    /**
     * Fired when a row is added.
     *
     * @event rowAddEvent
     * @param oArgs.record {YAHOO.widget.Record} The added Record.
     */
     
    /**
     * Fired when rows are added.
     *
     * @event rowsAddEvent
     * @param oArgs.record {YAHOO.widget.Record[]} The added Records.
     */

    /**
     * Fired when a row is updated.
     *
     * @event rowUpdateEvent
     * @param oArgs.record {YAHOO.widget.Record} The updated Record.
     * @param oArgs.oldData {Object} Object literal of the old data.
     */

    /**
     * Fired when a row is deleted.
     *
     * @event rowDeleteEvent
     * @param oArgs.oldData {Object} Object literal of the deleted data.
     * @param oArgs.recordIndex {Number} Index of the deleted Record.
     * @param oArgs.trElIndex {Number} Index of the deleted TR element, if on current page.
     */
     
    /**
     * Fired when rows are deleted.
     *
     * @event rowsDeleteEvent
     * @param oArgs.oldData {Object[]} Array of object literals of the deleted data.
     * @param oArgs.recordIndex {Number} Index of the first deleted Record.
     * @param oArgs.count {Number} Number of deleted Records.
     */

    /**
     * Fired when a row is selected.
     *
     * @event rowSelectEvent
     * @param oArgs.el {HTMLElement} The selected TR element, if applicable.
     * @param oArgs.record {YAHOO.widget.Record} The selected Record.
     */

    /**
     * Fired when a row is unselected.
     *
     * @event rowUnselectEvent
     * @param oArgs.el {HTMLElement} The unselected TR element, if applicable.
     * @param oArgs.record {YAHOO.widget.Record} The unselected Record.
     */

    /**
     * Fired when all row selections are cleared.
     *
     * @event unselectAllRowsEvent
     */

    /**
     * Fired when a row is highlighted.
     *
     * @event rowHighlightEvent
     * @param oArgs.el {HTMLElement} The highlighted TR element.
     * @param oArgs.record {YAHOO.widget.Record} The highlighted Record.
     */

    /**
     * Fired when a row is unhighlighted.
     *
     * @event rowUnhighlightEvent
     * @param oArgs.el {HTMLElement} The highlighted TR element.
     * @param oArgs.record {YAHOO.widget.Record} The highlighted Record.
     */

    /**
     * Fired when a cell is updated.
     *
     * @event cellUpdateEvent
     * @param oArgs.record {YAHOO.widget.Record} The updated Record.
     * @param oArgs.column {YAHOO.widget.Column} The updated Column.
     * @param oArgs.oldData {Object} Original data value of the updated cell.
     */

    /**
     * Fired when a cell has a mouseover.
     *
     * @event cellMouseoverEvent
     * @param oArgs.event {HTMLEvent} The event object.
     * @param oArgs.target {HTMLElement} The TD element.
     */

    /**
     * Fired when a cell has a mouseout.
     *
     * @event cellMouseoutEvent
     * @param oArgs.event {HTMLEvent} The event object.
     * @param oArgs.target {HTMLElement} The TD element.
     */

    /**
     * Fired when a cell has a mousedown.
     *
     * @event cellMousedownEvent
     * @param oArgs.event {HTMLEvent} The event object.
     * @param oArgs.target {HTMLElement} The TD element.
     */

    /**
     * Fired when a cell has a mouseup.
     *
     * @event cellMouseupEvent
     * @param oArgs.event {HTMLEvent} The event object.
     * @param oArgs.target {HTMLElement} The TD element.
     */

    /**
     * Fired when a cell has a click.
     *
     * @event cellClickEvent
     * @param oArgs.event {HTMLEvent} The event object.
     * @param oArgs.target {HTMLElement} The TD element.
     */

    /**
     * Fired when a cell has a dblclick.
     *
     * @event cellDblclickEvent
     * @param oArgs.event {HTMLEvent} The event object.
     * @param oArgs.target {HTMLElement} The TD element.
     */

    /**
     * Fired when a cell is formatted.
     *
     * @event cellFormatEvent
     * @param oArgs.el {HTMLElement} The formatted TD element.
     * @param oArgs.record {YAHOO.widget.Record} The associated Record instance.
     * @param oArgs.column {YAHOO.widget.Column} The associated Column instance.
     * @param oArgs.key {String} (deprecated) The key of the formatted cell.
     */

    /**
     * Fired when a cell is selected.
     *
     * @event cellSelectEvent
     * @param oArgs.el {HTMLElement} The selected TD element.
     * @param oArgs.record {YAHOO.widget.Record} The associated Record instance.
     * @param oArgs.column {YAHOO.widget.Column} The associated Column instance.
     * @param oArgs.key {String} (deprecated) The key of the selected cell.
     */

    /**
     * Fired when a cell is unselected.
     *
     * @event cellUnselectEvent
     * @param oArgs.el {HTMLElement} The unselected TD element.
     * @param oArgs.record {YAHOO.widget.Record} The associated Record.
     * @param oArgs.column {YAHOO.widget.Column} The associated Column instance.
     * @param oArgs.key {String} (deprecated) The key of the unselected cell.

     */

    /**
     * Fired when a cell is highlighted.
     *
     * @event cellHighlightEvent
     * @param oArgs.el {HTMLElement} The highlighted TD element.
     * @param oArgs.record {YAHOO.widget.Record} The associated Record instance.
     * @param oArgs.column {YAHOO.widget.Column} The associated Column instance.
     * @param oArgs.key {String} (deprecated) The key of the highlighted cell.

     */

    /**
     * Fired when a cell is unhighlighted.
     *
     * @event cellUnhighlightEvent
     * @param oArgs.el {HTMLElement} The unhighlighted TD element.
     * @param oArgs.record {YAHOO.widget.Record} The associated Record instance.
     * @param oArgs.column {YAHOO.widget.Column} The associated Column instance.
     * @param oArgs.key {String} (deprecated) The key of the unhighlighted cell.

     */

    /**
     * Fired when all cell selections are cleared.
     *
     * @event unselectAllCellsEvent
     */

    /**
     * Fired when a CellEditor is shown.
     *
     * @event editorShowEvent
     * @param oArgs.editor {YAHOO.widget.CellEditor} The CellEditor instance.
     */

    /**
     * Fired when a CellEditor has a keydown.
     *
     * @event editorKeydownEvent
     * @param oArgs.editor {YAHOO.widget.CellEditor} The CellEditor instance.
     * @param oArgs.event {HTMLEvent} The event object.
     */

    /**
     * Fired when a CellEditor input is reverted.
     *
     * @event editorRevertEvent
     * @param oArgs.editor {YAHOO.widget.CellEditor} The CellEditor instance.
     * @param oArgs.newData {Object} New data value from form input field.
     * @param oArgs.oldData {Object} Old data value.
     */

    /**
     * Fired when a CellEditor input is saved.
     *
     * @event editorSaveEvent
     * @param oArgs.editor {YAHOO.widget.CellEditor} The CellEditor instance.
     * @param oArgs.newData {Object} New data value from form input field.
     * @param oArgs.oldData {Object} Old data value.
     */

    /**
     * Fired when a CellEditor input is canceled.
     *
     * @event editorCancelEvent
     * @param oArgs.editor {YAHOO.widget.CellEditor} The CellEditor instance.
     */

    /**
     * Fired when a CellEditor has a blur event.
     *
     * @event editorBlurEvent
     * @param oArgs.editor {YAHOO.widget.CellEditor} The CellEditor instance.
     */

    /**
     * Fired when a CellEditor is blocked.
     *
     * @event editorBlockEvent
     * @param oArgs.editor {YAHOO.widget.CellEditor} The CellEditor instance.
     */

    /**
     * Fired when a CellEditor is unblocked.
     *
     * @event editorUnblockEvent
     * @param oArgs.editor {YAHOO.widget.CellEditor} The CellEditor instance.
     */





    /**
     * Fired when a link is clicked.
     *
     * @event linkClickEvent
     * @param oArgs.event {HTMLEvent} The event object.
     * @param oArgs.target {HTMLElement} The A element.
     */

    /**
     * Fired when a BUTTON element or INPUT element of type "button", "image",
     * "submit", "reset" is clicked.
     *
     * @event buttonClickEvent
     * @param oArgs.event {HTMLEvent} The event object.
     * @param oArgs.target {HTMLElement} The BUTTON element.
     */

    /**
     * Fired when a CHECKBOX element is clicked.
     *
     * @event checkboxClickEvent
     * @param oArgs.event {HTMLEvent} The event object.
     * @param oArgs.target {HTMLElement} The CHECKBOX element.
     */

    /**
     * Fired when a SELECT element is changed.
     *
     * @event dropdownChangeEvent
     * @param oArgs.event {HTMLEvent} The event object.
     * @param oArgs.target {HTMLElement} The SELECT element.
     */

    /**
     * Fired when a RADIO element is clicked.
     *
     * @event radioClickEvent
     * @param oArgs.event {HTMLEvent} The event object.
     * @param oArgs.target {HTMLElement} The RADIO element.
     */


























/////////////////////////////////////////////////////////////////////////////
//
// Deprecated APIs
//
/////////////////////////////////////////////////////////////////////////////
  
/*
 * @method showCellEditorBtns
 * @deprecated Use CellEditor.renderBtns() 
 */
showCellEditorBtns : function(elContainer) {
    // Buttons
    var elBtnsDiv = elContainer.appendChild(document.createElement("div"));
    Dom.addClass(elBtnsDiv, DT.CLASS_BUTTON);

    // Save button
    var elSaveBtn = elBtnsDiv.appendChild(document.createElement("button"));
    Dom.addClass(elSaveBtn, DT.CLASS_DEFAULT);
    elSaveBtn.innerHTML = "OK";
    Ev.addListener(elSaveBtn, "click", function(oArgs, oSelf) {
        oSelf.onEventSaveCellEditor(oArgs, oSelf);
        oSelf.focusTbodyEl();
    }, this, true);

    // Cancel button
    var elCancelBtn = elBtnsDiv.appendChild(document.createElement("button"));
    elCancelBtn.innerHTML = "Cancel";
    Ev.addListener(elCancelBtn, "click", function(oArgs, oSelf) {
        oSelf.onEventCancelCellEditor(oArgs, oSelf);
        oSelf.focusTbodyEl();
    }, this, true);

},

/**
 * @method resetCellEditor
 * @deprecated Use destroyCellEditor 
 */
resetCellEditor : function() {
    var elContainer = this._oCellEditor.container;
    elContainer.style.display = "none";
    Ev.purgeElement(elContainer, true);
    elContainer.innerHTML = "";
    this._oCellEditor.value = null;
    this._oCellEditor.isActive = false;

},

/**
 * @event editorUpdateEvent
 * @deprecated Use CellEditor class.
 */

/**
 * @method getBody
 * @deprecated Use getTbodyEl().
 */
getBody : function() {
    // Backward compatibility
    return this.getTbodyEl();
},

/**
 * @method getCell
 * @deprecated Use getTdEl().
 */
getCell : function(index) {
    // Backward compatibility
    return this.getTdEl(index);
},

/**
 * @method getRow
 * @deprecated Use getTrEl().
 */
getRow : function(index) {
    // Backward compatibility
    return this.getTrEl(index);
},

/**
 * @method refreshView
 * @deprecated Use render.
 */
refreshView : function() {
    // Backward compatibility
    this.render();
},

/**
 * @method select
 * @deprecated Use selectRow.
 */
select : function(els) {
    // Backward compatibility
    if(!lang.isArray(els)) {
        els = [els];
    }
    for(var i=0; i<els.length; i++) {
        this.selectRow(els[i]);
    }
},

/**
 * @method onEventEditCell
 * @deprecated Use onEventShowCellEditor.
 */
onEventEditCell : function(oArgs) {
    // Backward compatibility
    this.onEventShowCellEditor(oArgs);
},

/**
 * @method _syncColWidths
 * @deprecated Use validateColumnWidths.
 */
_syncColWidths : function() {
    // Backward compatibility
    this.validateColumnWidths();
}

/**
 * @event headerRowMouseoverEvent
 * @deprecated Use theadRowMouseoverEvent.
 */

/**
 * @event headerRowMouseoutEvent
 * @deprecated Use theadRowMouseoutEvent.
 */

/**
 * @event headerRowMousedownEvent
 * @deprecated Use theadRowMousedownEvent.
 */

/**
 * @event headerRowClickEvent
 * @deprecated Use theadRowClickEvent.
 */

/**
 * @event headerRowDblclickEvent
 * @deprecated Use theadRowDblclickEvent.
 */

/**
 * @event headerCellMouseoverEvent
 * @deprecated Use theadCellMouseoverEvent.
 */

/**
 * @event headerCellMouseoutEvent
 * @deprecated Use theadCellMouseoutEvent.
 */

/**
 * @event headerCellMousedownEvent
 * @deprecated Use theadCellMousedownEvent.
 */

/**
 * @event headerCellClickEvent
 * @deprecated Use theadCellClickEvent.
 */

/**
 * @event headerCellDblclickEvent
 * @deprecated Use theadCellDblclickEvent.
 */

/**
 * @event headerLabelMouseoverEvent
 * @deprecated Use theadLabelMouseoverEvent.
 */

/**
 * @event headerLabelMouseoutEvent
 * @deprecated Use theadLabelMouseoutEvent.
 */

/**
 * @event headerLabelMousedownEvent
 * @deprecated Use theadLabelMousedownEvent.
 */

/**
 * @event headerLabelClickEvent
 * @deprecated Use theadLabelClickEvent.
 */

/**
 * @event headerLabelDbllickEvent
 * @deprecated Use theadLabelDblclickEvent.
 */

});

/**
 * Alias for onDataReturnSetRows for backward compatibility
 * @method onDataReturnSetRecords
 * @deprecated Use onDataReturnSetRows
 */
DT.prototype.onDataReturnSetRecords = DT.prototype.onDataReturnSetRows;

/**
 * Alias for onPaginatorChange for backward compatibility
 * @method onPaginatorChange
 * @deprecated Use onPaginatorChangeRequest
 */
DT.prototype.onPaginatorChange = DT.prototype.onPaginatorChangeRequest;

/////////////////////////////////////////////////////////////////////////////
//
// Deprecated static APIs
//
/////////////////////////////////////////////////////////////////////////////
/**
 * @method DataTable.editCheckbox
 * @deprecated  Use YAHOO.widget.CheckboxCellEditor.
 */
DT.editCheckbox = function() {};

/**
 * @method DataTable.editDate
 * @deprecated Use YAHOO.widget.DateCellEditor.
 */
DT.editDate = function() {};

/**
 * @method DataTable.editDropdown
 * @deprecated Use YAHOO.widget.DropdownCellEditor.
 */
DT.editDropdown = function() {};

/**
 * @method DataTable.editRadio
 * @deprecated Use YAHOO.widget.RadioCellEditor.
 */
DT.editRadio = function() {};

/**
 * @method DataTable.editTextarea
 * @deprecated Use YAHOO.widget.TextareaCellEditor
 */
DT.editTextarea = function() {};

/**
 * @method DataTable.editTextbox
 * @deprecated Use YAHOO.widget.TextboxCellEditor
 */
DT.editTextbox= function() {};

})();

(function () {

var lang   = YAHOO.lang,
    util   = YAHOO.util,
    widget = YAHOO.widget,
    ua     = YAHOO.env.ua,
    
    Dom    = util.Dom,
    Ev     = util.Event,
    DS     = util.DataSourceBase,
    DT     = widget.DataTable,
    Pag    = widget.Paginator;
    
/**
 * The ScrollingDataTable class extends the DataTable class to provide
 * functionality for x-scrolling, y-scrolling, and xy-scrolling.
 *
 * @namespace YAHOO.widget
 * @class ScrollingDataTable
 * @extends YAHOO.widget.DataTable
 * @constructor
 * @param elContainer {HTMLElement} Container element for the TABLE.
 * @param aColumnDefs {Object[]} Array of object literal Column definitions.
 * @param oDataSource {YAHOO.util.DataSource} DataSource instance.
 * @param oConfigs {object} (optional) Object literal of configuration values.
 */
widget.ScrollingDataTable = function(elContainer,aColumnDefs,oDataSource,oConfigs) {
    oConfigs = oConfigs || {};
    
    // Prevent infinite loop
    if(oConfigs.scrollable) {
        oConfigs.scrollable = false;
    }

    this._init();

    widget.ScrollingDataTable.superclass.constructor.call(this, elContainer,aColumnDefs,oDataSource,oConfigs); 

    // Once per instance
    this.subscribe("columnShowEvent", this._onColumnChange);
};

var SDT = widget.ScrollingDataTable;

/////////////////////////////////////////////////////////////////////////////
//
// Public constants
//
/////////////////////////////////////////////////////////////////////////////
lang.augmentObject(SDT, {

    /**
     * Class name assigned to inner DataTable header container.
     *
     * @property DataTable.CLASS_HEADER
     * @type String
     * @static
     * @final
     * @default "yui-dt-hd"
     */
    CLASS_HEADER : "yui-dt-hd",
    
    /**
     * Class name assigned to inner DataTable body container.
     *
     * @property DataTable.CLASS_BODY
     * @type String
     * @static
     * @final
     * @default "yui-dt-bd"
     */
    CLASS_BODY : "yui-dt-bd"
});

lang.extend(SDT, DT, {

/**
 * Container for fixed header TABLE element.
 *
 * @property _elHdContainer
 * @type HTMLElement
 * @private
 */
_elHdContainer : null,

/**
 * Fixed header TABLE element.
 *
 * @property _elHdTable
 * @type HTMLElement
 * @private
 */
_elHdTable : null,

/**
 * Container for scrolling body TABLE element.
 *
 * @property _elBdContainer
 * @type HTMLElement
 * @private
 */
_elBdContainer : null,

/**
 * Body THEAD element.
 *
 * @property _elBdThead
 * @type HTMLElement
 * @private
 */
_elBdThead : null,

/**
 * Offscreen container to temporarily clone SDT for auto-width calculation.
 *
 * @property _elTmpContainer
 * @type HTMLElement
 * @private
 */
_elTmpContainer : null,

/**
 * Offscreen TABLE element for auto-width calculation.
 *
 * @property _elTmpTable
 * @type HTMLElement
 * @private
 */
_elTmpTable : null,

/**
 * True if x-scrollbar is currently visible.
 * @property _bScrollbarX
 * @type Boolean
 * @private 
 */
_bScrollbarX : null,















/////////////////////////////////////////////////////////////////////////////
//
// Superclass methods
//
/////////////////////////////////////////////////////////////////////////////

/**
 * Implementation of Element's abstract method. Sets up config values.
 *
 * @method initAttributes
 * @param oConfigs {Object} (Optional) Object literal definition of configuration values.
 * @private
 */

initAttributes : function(oConfigs) {
    oConfigs = oConfigs || {};
    SDT.superclass.initAttributes.call(this, oConfigs);

    /**
    * @attribute width
    * @description Table width for scrollable tables (e.g., "40em").
    * @type String
    */
    this.setAttributeConfig("width", {
        value: null,
        validator: lang.isString,
        method: function(oParam) {
            if(this._elHdContainer && this._elBdContainer) {
                this._elHdContainer.style.width = oParam;
                this._elBdContainer.style.width = oParam;            
                this._syncScrollX();      
                this._syncScrollOverhang();
            }
        }
    });

    /**
    * @attribute height
    * @description Table body height for scrollable tables, not including headers (e.g., "40em").
    * @type String
    */
    this.setAttributeConfig("height", {
        value: null,
        validator: lang.isString,
        method: function(oParam) {
            if(this._elHdContainer && this._elBdContainer) {
                this._elBdContainer.style.height = oParam;    
                this._syncScrollX();   
                this._syncScrollY();
                this._syncScrollOverhang();
            }
        }
    });

    /**
    * @attribute COLOR_COLUMNFILLER
    * @description CSS color value assigned to header filler on scrollable tables.  
    * @type String
    * @default "#F2F2F2"
    */
    this.setAttributeConfig("COLOR_COLUMNFILLER", {
        value: "#F2F2F2",
        validator: lang.isString,
        method: function(oParam) {
            if(this._elHdContainer) {
                this._elHdContainer.style.backgroundColor = oParam;
            }
        }
    });
},

/**
 * Initializes internal variables.
 *
 * @method _init
 * @private
 */
_init : function() {
    this._elHdContainer = null;
    this._elHdTable = null;
    this._elBdContainer = null;
    this._elBdThead = null;
    this._elTmpContainer = null;
    this._elTmpTable = null;
},

/**
 * Initializes DOM elements for a ScrollingDataTable, including creation of
 * two separate TABLE elements.
 *
 * @method _initDomElements
 * @param elContainer {HTMLElement | String} HTML DIV element by reference or ID. 
 * return {Boolean} False in case of error, otherwise true 
 * @private
 */
_initDomElements : function(elContainer) {
    // Outer and inner containers
    this._initContainerEl(elContainer);
    if(this._elContainer && this._elHdContainer && this._elBdContainer) {
        // TABLEs
        this._initTableEl();
        
        if(this._elHdTable && this._elTable) {
            // COLGROUPs
            ///this._initColgroupEl(this._elHdTable, this._elTable);  
            this._initColgroupEl(this._elHdTable);        
            
            // THEADs
            this._initTheadEl(this._elHdTable, this._elTable);
            
            // Primary TBODY
            this._initTbodyEl(this._elTable);
            // Message TBODY
            this._initMsgTbodyEl(this._elTable);            
        }
    }
    if(!this._elContainer || !this._elTable || !this._elColgroup ||  !this._elThead || !this._elTbody || !this._elMsgTbody ||
            !this._elHdTable || !this._elBdThead) {
        return false;
    }
    else {
        return true;
    }
},

/**
 * Destroy's the DataTable outer and inner container elements, if available.
 *
 * @method _destroyContainerEl
 * @param elContainer {HTMLElement} Reference to the container element. 
 * @private
 */
_destroyContainerEl : function(elContainer) {
    Dom.removeClass(elContainer, DT.CLASS_SCROLLABLE);
    SDT.superclass._destroyContainerEl.call(this, elContainer);
    this._elHdContainer = null;
    this._elBdContainer = null;
},

/**
 * Initializes the DataTable outer container element and creates inner header
 * and body container elements.
 *
 * @method _initContainerEl
 * @param elContainer {HTMLElement | String} HTML DIV element by reference or ID.
 * @private
 */
_initContainerEl : function(elContainer) {
    SDT.superclass._initContainerEl.call(this, elContainer);
    
    if(this._elContainer) {
        elContainer = this._elContainer; // was constructor input, now is DOM ref
        Dom.addClass(elContainer, DT.CLASS_SCROLLABLE);
        
        // Container for header TABLE
        var elHdContainer = document.createElement("div");
        elHdContainer.style.width = this.get("width") || "";
        elHdContainer.style.backgroundColor = this.get("COLOR_COLUMNFILLER");
        Dom.addClass(elHdContainer, SDT.CLASS_HEADER);
        this._elHdContainer = elHdContainer;
        elContainer.appendChild(elHdContainer);
    
        // Container for body TABLE
        var elBdContainer = document.createElement("div");
        elBdContainer.style.width = this.get("width") || "";
        elBdContainer.style.height = this.get("height") || "";
        Dom.addClass(elBdContainer, SDT.CLASS_BODY);
        Ev.addListener(elBdContainer, "scroll", this._onScroll, this); // to sync horiz scroll headers
        this._elBdContainer = elBdContainer;
        elContainer.appendChild(elBdContainer);
    }
},

/**
 * Creates HTML markup CAPTION element.
 *
 * @method _initCaptionEl
 * @param sCaption {String} Text for caption.
 * @private
 */
_initCaptionEl : function(sCaption) {
    // Not yet supported
    /*if(this._elHdTable && sCaption) {
        // Create CAPTION element
        if(!this._elCaption) { 
            this._elCaption = this._elHdTable.createCaption();
        }
        // Set CAPTION value
        this._elCaption.innerHTML = sCaption;
    }
    else if(this._elCaption) {
        this._elCaption.parentNode.removeChild(this._elCaption);
    }*/
},

/**
 * Destroy's the DataTable head TABLE element, if available.
 *
 * @method _destroyHdTableEl
 * @private
 */
_destroyHdTableEl : function() {
    var elTable = this._elHdTable;
    if(elTable) {
        Ev.purgeElement(elTable, true);
        elTable.parentNode.removeChild(elTable);
        
        // A little out of place, but where else can we null out these extra elements?
        ///this._elBdColgroup = null;
        this._elBdThead = null;
    }
},

/**
 * Initializes ScrollingDataTable TABLE elements into the two inner containers.
 *
 * @method _initTableEl
 * @private
 */
_initTableEl : function() {
    // Head TABLE
    if(this._elHdContainer) {
        this._destroyHdTableEl();
    
        // Create TABLE
        this._elHdTable = this._elHdContainer.appendChild(document.createElement("table"));   

        // Set up mouseover/mouseout events via mouseenter/mouseleave delegation
        Ev.delegate(this._elHdTable, "mouseenter", this._onTableMouseover, "thead ."+DT.CLASS_LABEL, this);
        Ev.delegate(this._elHdTable, "mouseleave", this._onTableMouseout, "thead ."+DT.CLASS_LABEL, this);
    }
    // Body TABLE
    SDT.superclass._initTableEl.call(this, this._elBdContainer);
},

/**
 * Initializes ScrollingDataTable THEAD elements into the two inner containers.
 *
 * @method _initTheadEl
 * @param elHdTable {HTMLElement} (optional) Fixed header TABLE element reference.
 * @param elTable {HTMLElement} (optional) TABLE element reference.
 * @private
 */
_initTheadEl : function(elHdTable, elTable) {
    elHdTable = elHdTable || this._elHdTable;
    elTable = elTable || this._elTable;
    
    // Scrolling body's THEAD
    this._initBdTheadEl(elTable);
    // Standard fixed head THEAD
    SDT.superclass._initTheadEl.call(this, elHdTable);
},

/**
 * SDT changes ID so as not to duplicate the accessibility TH IDs.
 *
 * @method _initThEl
 * @param elTh {HTMLElement} TH element reference.
 * @param oColumn {YAHOO.widget.Column} Column object.
 * @private
 */
_initThEl : function(elTh, oColumn) {
    SDT.superclass._initThEl.call(this, elTh, oColumn);
    elTh.id = this.getId() +"-fixedth-" + oColumn.getSanitizedKey(); // Needed for getColumn by TH and ColumnDD
},

/**
 * Destroy's the DataTable body THEAD element, if available.
 *
 * @method _destroyBdTheadEl
 * @private
 */
_destroyBdTheadEl : function() {
    var elBdThead = this._elBdThead;
    if(elBdThead) {
        var elTable = elBdThead.parentNode;
        Ev.purgeElement(elBdThead, true);
        elTable.removeChild(elBdThead);
        this._elBdThead = null;

        this._destroyColumnHelpers();
    }
},

/**
 * Initializes body THEAD element.
 *
 * @method _initBdTheadEl
 * @param elTable {HTMLElement} TABLE element into which to create THEAD.
 * @return {HTMLElement} Initialized THEAD element. 
 * @private
 */
_initBdTheadEl : function(elTable) {
    if(elTable) {
        // Destroy previous
        this._destroyBdTheadEl();

        var elThead = elTable.insertBefore(document.createElement("thead"), elTable.firstChild);
        
        // Add TRs to the THEAD;
        var oColumnSet = this._oColumnSet,
            colTree = oColumnSet.tree,
            elTh, elTheadTr, oColumn, i, j, k, len;

        for(i=0, k=colTree.length; i<k; i++) {
            elTheadTr = elThead.appendChild(document.createElement("tr"));
    
            // ...and create TH cells
            for(j=0, len=colTree[i].length; j<len; j++) {
                oColumn = colTree[i][j];
                elTh = elTheadTr.appendChild(document.createElement("th"));
                this._initBdThEl(elTh,oColumn,i,j);
            }
        }
        this._elBdThead = elThead;
    }
},

/**
 * Populates TH element for the body THEAD element.
 *
 * @method _initBdThEl
 * @param elTh {HTMLElement} TH element reference.
 * @param oColumn {YAHOO.widget.Column} Column object.
 * @private
 */
_initBdThEl : function(elTh, oColumn) {
    elTh.id = this.getId()+"-th-" + oColumn.getSanitizedKey(); // Needed for accessibility
    elTh.rowSpan = oColumn.getRowspan();
    elTh.colSpan = oColumn.getColspan();
    // Assign abbr attribute
    if(oColumn.abbr) {
        elTh.abbr = oColumn.abbr;
    }

    // TODO: strip links and form elements
    var sKey = oColumn.getKey();
    var sLabel = lang.isValue(oColumn.label) ? oColumn.label : sKey;
    elTh.innerHTML = sLabel;
},

/**
 * Initializes ScrollingDataTable TBODY element for data
 *
 * @method _initTbodyEl
 * @param elTable {HTMLElement} TABLE element into which to create TBODY .
 * @private
 */
_initTbodyEl : function(elTable) {
    SDT.superclass._initTbodyEl.call(this, elTable);
    
    // Bug 2105534 - Safari 3 gap
    // Bug 2492591 - IE8 offsetTop
    elTable.style.marginTop = (this._elTbody.offsetTop > 0) ?
            "-"+this._elTbody.offsetTop+"px" : 0;
},





























/**
 * Sets focus on the given element.
 *
 * @method _focusEl
 * @param el {HTMLElement} Element.
 * @private
 */
_focusEl : function(el) {
    el = el || this._elTbody;
    var oSelf = this;
    this._storeScrollPositions();
    // http://developer.mozilla.org/en/docs/index.php?title=Key-navigable_custom_DHTML_widgets
    // The timeout is necessary in both IE and Firefox 1.5, to prevent scripts from doing
    // strange unexpected things as the user clicks on buttons and other controls.
    
    // Bug 1921135: Wrap the whole thing in a setTimeout
    setTimeout(function() {
        setTimeout(function() {
            try {
                el.focus();
                oSelf._restoreScrollPositions();
            }
            catch(e) {
            }
        },0);
    }, 0);
},



















/**
 * Internal wrapper calls run() on render Chain instance.
 *
 * @method _runRenderChain
 * @private 
 */
_runRenderChain : function() {
    this._storeScrollPositions();
    this._oChainRender.run();
},

/**
 * Stores scroll positions so they can be restored after a render.
 *
 * @method _storeScrollPositions
 * @private
 */
 _storeScrollPositions : function() {
    this._nScrollTop = this._elBdContainer.scrollTop;
    this._nScrollLeft = this._elBdContainer.scrollLeft;
},

/**
 * Clears stored scroll positions to interrupt the automatic restore mechanism.
 * Useful for setting scroll positions programmatically rather than as part of
 * the post-render cleanup process.
 *
 * @method clearScrollPositions
 * @private
 */
 clearScrollPositions : function() {
    this._nScrollTop = 0;
    this._nScrollLeft = 0;
},

/**
 * Restores scroll positions to stored value. 
 *
 * @method _retoreScrollPositions
 * @private 
 */
 _restoreScrollPositions : function() {
    // Reset scroll positions
    if(this._nScrollTop) {
        this._elBdContainer.scrollTop = this._nScrollTop;
        this._nScrollTop = null;
    } 
    if(this._nScrollLeft) {
        this._elBdContainer.scrollLeft = this._nScrollLeft;
        // Bug 2529024
        this._elHdContainer.scrollLeft = this._nScrollLeft; 
        this._nScrollLeft = null;
    } 
},

/**
 * Helper function calculates and sets a validated width for a Column in a ScrollingDataTable.
 *
 * @method _validateColumnWidth
 * @param oColumn {YAHOO.widget.Column} Column instance.
 * @param elTd {HTMLElement} TD element to validate against.
 * @private
 */
_validateColumnWidth : function(oColumn, elTd) {
    // Only Columns without widths that are not hidden
    if(!oColumn.width && !oColumn.hidden) {
        var elTh = oColumn.getThEl();
        // Unset a calculated auto-width
        if(oColumn._calculatedWidth) {
            this._setColumnWidth(oColumn, "auto", "visible");
        }
        // Compare auto-widths
        if(elTh.offsetWidth !== elTd.offsetWidth) {
            var elWider = (elTh.offsetWidth > elTd.offsetWidth) ?
                    oColumn.getThLinerEl() : elTd.firstChild;               

            // Grab the wider liner width, unless the minWidth is wider
            var newWidth = Math.max(0,
                (elWider.offsetWidth -(parseInt(Dom.getStyle(elWider,"paddingLeft"),10)|0) - (parseInt(Dom.getStyle(elWider,"paddingRight"),10)|0)),
                oColumn.minWidth);
                
            var sOverflow = 'visible';
            
            // Now validate against maxAutoWidth
            if((oColumn.maxAutoWidth > 0) && (newWidth > oColumn.maxAutoWidth)) {
                newWidth = oColumn.maxAutoWidth;
                sOverflow = "hidden";
            }

            // Set to the wider auto-width
            this._elTbody.style.display = "none";
            this._setColumnWidth(oColumn, newWidth+'px', sOverflow);
            oColumn._calculatedWidth = newWidth;
            this._elTbody.style.display = "";
        }
    }
},

/**
 * For one or all Columns of a ScrollingDataTable, when Column is not hidden,
 * and width is not set, syncs widths of header and body cells and 
 * validates that width against minWidth and/or maxAutoWidth as necessary.
 *
 * @method validateColumnWidths
 * @param oArg.column {YAHOO.widget.Column} (optional) One Column to validate. If null, all Columns' widths are validated.
 */
validateColumnWidths : function(oColumn) {
    // Validate there is at least one TR with proper TDs
    var allKeys   = this._oColumnSet.keys,
        allKeysLength = allKeys.length,
        elRow     = this.getFirstTrEl();

    // Reset overhang for IE
    if(ua.ie) {
        this._setOverhangValue(1);
    }

    if(allKeys && elRow && (elRow.childNodes.length === allKeysLength)) {
        // Temporarily unsnap container since it causes inaccurate calculations
        var sWidth = this.get("width");
        if(sWidth) {
            this._elHdContainer.style.width = "";
            this._elBdContainer.style.width = "";
        }
        this._elContainer.style.width = "";
        
        //Validate just one Column
        if(oColumn && lang.isNumber(oColumn.getKeyIndex())) {
            this._validateColumnWidth(oColumn, elRow.childNodes[oColumn.getKeyIndex()]);
        }
        // Iterate through all Columns to unset calculated widths in one pass
        else {
            var elTd, todos = [], thisTodo, i, len;
            for(i=0; i<allKeysLength; i++) {
                oColumn = allKeys[i];
                // Only Columns without widths that are not hidden, unset a calculated auto-width
                if(!oColumn.width && !oColumn.hidden && oColumn._calculatedWidth) {
                    todos[todos.length] = oColumn;      
                }
            }
            
            this._elTbody.style.display = "none";
            for(i=0, len=todos.length; i<len; i++) {
                this._setColumnWidth(todos[i], "auto", "visible");
            }
            this._elTbody.style.display = "";
            
            todos = [];

            // Iterate through all Columns and make the store the adjustments to make in one pass
            for(i=0; i<allKeysLength; i++) {
                oColumn = allKeys[i];
                elTd = elRow.childNodes[i];
                // Only Columns without widths that are not hidden
                if(!oColumn.width && !oColumn.hidden) {
                    var elTh = oColumn.getThEl();

                    // Compare auto-widths
                    if(elTh.offsetWidth !== elTd.offsetWidth) {
                        var elWider = (elTh.offsetWidth > elTd.offsetWidth) ?
                                oColumn.getThLinerEl() : elTd.firstChild;               
                
                        // Grab the wider liner width, unless the minWidth is wider
                        var newWidth = Math.max(0,
                            (elWider.offsetWidth -(parseInt(Dom.getStyle(elWider,"paddingLeft"),10)|0) - (parseInt(Dom.getStyle(elWider,"paddingRight"),10)|0)),
                            oColumn.minWidth);
                            
                        var sOverflow = 'visible';
                        
                        // Now validate against maxAutoWidth
                        if((oColumn.maxAutoWidth > 0) && (newWidth > oColumn.maxAutoWidth)) {
                            newWidth = oColumn.maxAutoWidth;
                            sOverflow = "hidden";
                        }
                
                        todos[todos.length] = [oColumn, newWidth, sOverflow];
                    }
                }
            }
            
            this._elTbody.style.display = "none";
            for(i=0, len=todos.length; i<len; i++) {
                thisTodo = todos[i];
                // Set to the wider auto-width
                this._setColumnWidth(thisTodo[0], thisTodo[1]+"px", thisTodo[2]);
                thisTodo[0]._calculatedWidth = thisTodo[1];
            }
            this._elTbody.style.display = "";
        }
    
        // Resnap unsnapped containers
        if(sWidth) {
            this._elHdContainer.style.width = sWidth;
            this._elBdContainer.style.width = sWidth;
        } 
    }
    
    this._syncScroll();
    this._restoreScrollPositions();
},

/**
 * Syncs padding around scrollable tables, including Column header right-padding
 * and container width and height.
 *
 * @method _syncScroll
 * @private 
 */
_syncScroll : function() {
    this._syncScrollX();
    this._syncScrollY();
    this._syncScrollOverhang();
    if(ua.opera) {
        // Bug 1925874
        this._elHdContainer.scrollLeft = this._elBdContainer.scrollLeft;
        if(!this.get("width")) {
            // Bug 1926125
            document.body.style += '';
        }
    }
 },

/**
 * Snaps container width for y-scrolling tables.
 *
 * @method _syncScrollY
 * @private
 */
_syncScrollY : function() {
    var elTbody = this._elTbody,
        elBdContainer = this._elBdContainer;
    
    // X-scrolling not enabled
    if(!this.get("width")) {
        // Snap outer container width to content
        this._elContainer.style.width = 
                (elBdContainer.scrollHeight > elBdContainer.clientHeight) ?
                // but account for y-scrollbar since it is visible
                (elTbody.parentNode.clientWidth + 19) + "px" :
                // no y-scrollbar, just borders
                (elTbody.parentNode.clientWidth + 2) + "px";
    }
},

/**
 * Snaps container height for x-scrolling tables in IE. Syncs message TBODY width.
 *
 * @method _syncScrollX
 * @private
 */
_syncScrollX : function() {
    var elTbody = this._elTbody,
        elBdContainer = this._elBdContainer;
    
    // IE 6 and 7 only when y-scrolling not enabled
    if(!this.get("height") && (ua.ie)) {
        // Snap outer container height to content
        elBdContainer.style.height = 
                // but account for x-scrollbar if it is visible
                (elBdContainer.scrollWidth > elBdContainer.offsetWidth ) ?
                (elTbody.parentNode.offsetHeight + 18) + "px" : 
                elTbody.parentNode.offsetHeight + "px";
    }

    // Sync message tbody
    if(this._elTbody.rows.length === 0) {
        this._elMsgTbody.parentNode.style.width = this.getTheadEl().parentNode.offsetWidth + "px";
    }
    else {
        this._elMsgTbody.parentNode.style.width = "";
    }
},

/**
 * Adds/removes Column header overhang as necesary.
 *
 * @method _syncScrollOverhang
 * @private
 */
_syncScrollOverhang : function() {
    var elBdContainer = this._elBdContainer,
        // Overhang should be either 1 (default) or 18px, depending on the location of the right edge of the table
        nPadding = 1;
    
    // Y-scrollbar is visible, which is when the overhang needs to jut out
    if((elBdContainer.scrollHeight > elBdContainer.clientHeight) &&
        // X-scrollbar is also visible, which means the right is jagged, not flush with the Column
        (elBdContainer.scrollWidth > elBdContainer.clientWidth)) {
        nPadding = 18;
    }
    
    this._setOverhangValue(nPadding);
    
},

/**
 * Sets Column header overhang to given width.
 *
 * @method _setOverhangValue
 * @param nBorderWidth {Number} Value of new border for overhang. 
 * @private
 */
_setOverhangValue : function(nBorderWidth) {
    var aLastHeaders = this._oColumnSet.headers[this._oColumnSet.headers.length-1] || [],
        len = aLastHeaders.length,
        sPrefix = this._sId+"-fixedth-",
        sValue = nBorderWidth + "px solid " + this.get("COLOR_COLUMNFILLER");

    this._elThead.style.display = "none";
    for(var i=0; i<len; i++) {
        Dom.get(sPrefix+aLastHeaders[i]).style.borderRight = sValue;
    }
    this._elThead.style.display = "";
},






































/**
 * Returns DOM reference to the DataTable's fixed header container element.
 *
 * @method getHdContainerEl
 * @return {HTMLElement} Reference to DIV element.
 */
getHdContainerEl : function() {
    return this._elHdContainer;
},

/**
 * Returns DOM reference to the DataTable's scrolling body container element.
 *
 * @method getBdContainerEl
 * @return {HTMLElement} Reference to DIV element.
 */
getBdContainerEl : function() {
    return this._elBdContainer;
},

/**
 * Returns DOM reference to the DataTable's fixed header TABLE element.
 *
 * @method getHdTableEl
 * @return {HTMLElement} Reference to TABLE element.
 */
getHdTableEl : function() {
    return this._elHdTable;
},

/**
 * Returns DOM reference to the DataTable's scrolling body TABLE element.
 *
 * @method getBdTableEl
 * @return {HTMLElement} Reference to TABLE element.
 */
getBdTableEl : function() {
    return this._elTable;
},

/**
 * Disables ScrollingDataTable UI.
 *
 * @method disable
 */
disable : function() {
    var elMask = this._elMask;
    elMask.style.width = this._elBdContainer.offsetWidth + "px";
    elMask.style.height = this._elHdContainer.offsetHeight + this._elBdContainer.offsetHeight + "px";
    elMask.style.display = "";
    this.fireEvent("disableEvent");
},

/**
 * Removes given Column. NOTE: You cannot remove nested Columns. You can only remove
 * non-nested Columns, and top-level parent Columns (which will remove all
 * children Columns).
 *
 * @method removeColumn
 * @param oColumn {YAHOO.widget.Column} Column instance.
 * @return oColumn {YAHOO.widget.Column} Removed Column instance.
 */
removeColumn : function(oColumn) {
    // Store scroll pos
    var hdPos = this._elHdContainer.scrollLeft;
    var bdPos = this._elBdContainer.scrollLeft;
    
    // Call superclass method
    oColumn = SDT.superclass.removeColumn.call(this, oColumn);
    
    // Restore scroll pos
    this._elHdContainer.scrollLeft = hdPos;
    this._elBdContainer.scrollLeft = bdPos;
    
    return oColumn;
},

/**
 * Inserts given Column at the index if given, otherwise at the end. NOTE: You
 * can only add non-nested Columns and top-level parent Columns. You cannot add
 * a nested Column to an existing parent.
 *
 * @method insertColumn
 * @param oColumn {Object | YAHOO.widget.Column} Object literal Column
 * definition or a Column instance.
 * @param index {Number} (optional) New tree index.
 * @return oColumn {YAHOO.widget.Column} Inserted Column instance. 
 */
insertColumn : function(oColumn, index) {
    // Store scroll pos
    var hdPos = this._elHdContainer.scrollLeft;
    var bdPos = this._elBdContainer.scrollLeft;
    
    // Call superclass method
    var oNewColumn = SDT.superclass.insertColumn.call(this, oColumn, index);
    
    // Restore scroll pos
    this._elHdContainer.scrollLeft = hdPos;
    this._elBdContainer.scrollLeft = bdPos;
    
    return oNewColumn;
},

/**
 * Removes given Column and inserts into given tree index. NOTE: You
 * can only reorder non-nested Columns and top-level parent Columns. You cannot
 * reorder a nested Column to an existing parent.
 *
 * @method reorderColumn
 * @param oColumn {YAHOO.widget.Column} Column instance.
 * @param index {Number} New tree index.
 */
reorderColumn : function(oColumn, index) {
    // Store scroll pos
    var hdPos = this._elHdContainer.scrollLeft;
    var bdPos = this._elBdContainer.scrollLeft;
    
    // Call superclass method
    var oNewColumn = SDT.superclass.reorderColumn.call(this, oColumn, index);
    
    // Restore scroll pos
    this._elHdContainer.scrollLeft = hdPos;
    this._elBdContainer.scrollLeft = bdPos;

    return oNewColumn;
},

/**
 * Sets given Column to given pixel width. If new width is less than minWidth
 * width, sets to minWidth. Updates oColumn.width value.
 *
 * @method setColumnWidth
 * @param oColumn {YAHOO.widget.Column} Column instance.
 * @param nWidth {Number} New width in pixels.
 */
setColumnWidth : function(oColumn, nWidth) {
    oColumn = this.getColumn(oColumn);
    if(oColumn) {
        this._storeScrollPositions();

        // Validate new width against minWidth
        if(lang.isNumber(nWidth)) {
            nWidth = (nWidth > oColumn.minWidth) ? nWidth : oColumn.minWidth;

            // Save state
            oColumn.width = nWidth;
            
            // Resize the DOM elements
            this._setColumnWidth(oColumn, nWidth+"px");
            this._syncScroll();
            
            this.fireEvent("columnSetWidthEvent",{column:oColumn,width:nWidth});
        }
        // Unsets a width to auto-size
        else if(nWidth === null) {
            // Save state
            oColumn.width = nWidth;
            
            // Resize the DOM elements
            this._setColumnWidth(oColumn, "auto");
            this.validateColumnWidths(oColumn);
            this.fireEvent("columnUnsetWidthEvent",{column:oColumn});
        }
        
        // Bug 2339454: resize then sort misaligment
        this._clearTrTemplateEl();
    }
    else {
    }
},

/**
 * Scrolls to given row or cell
 *
 * @method scrollTo
 * @param to {YAHOO.widget.Record | HTMLElement } Itme to scroll to.
 */
scrollTo : function(to) {
        var td = this.getTdEl(to);
        if(td) {
            this.clearScrollPositions();
            this.getBdContainerEl().scrollLeft = td.offsetLeft;
            this.getBdContainerEl().scrollTop = td.parentNode.offsetTop;
        }
        else {
            var tr = this.getTrEl(to);
            if(tr) {
                this.clearScrollPositions();
                this.getBdContainerEl().scrollTop = tr.offsetTop;
            }
        }
},

/**
 * Displays message within secondary TBODY.
 *
 * @method showTableMessage
 * @param sHTML {String} (optional) Value for innerHTMlang.
 * @param sClassName {String} (optional) Classname.
 */
showTableMessage : function(sHTML, sClassName) {
    var elCell = this._elMsgTd;
    if(lang.isString(sHTML)) {
        elCell.firstChild.innerHTML = sHTML;
    }
    if(lang.isString(sClassName)) {
        Dom.addClass(elCell.firstChild, sClassName);
    }

    // Needed for SDT only
    var elThead = this.getTheadEl();
    var elTable = elThead.parentNode;
    var newWidth = elTable.offsetWidth;
    this._elMsgTbody.parentNode.style.width = this.getTheadEl().parentNode.offsetWidth + "px";

    this._elMsgTbody.style.display = "";

    this.fireEvent("tableMsgShowEvent", {html:sHTML, className:sClassName});
},













/////////////////////////////////////////////////////////////////////////////
//
// Private Custom Event Handlers
//
/////////////////////////////////////////////////////////////////////////////

/**
 * Handles Column mutations
 *
 * @method onColumnChange
 * @param oArgs {Object} Custom Event data.
 */
_onColumnChange : function(oArg) {
    // Figure out which Column changed
    var oColumn = (oArg.column) ? oArg.column :
            (oArg.editor) ? oArg.editor.column : null;
    this._storeScrollPositions();
    this.validateColumnWidths(oColumn);
},















/////////////////////////////////////////////////////////////////////////////
//
// Private DOM Event Handlers
//
/////////////////////////////////////////////////////////////////////////////

/**
 * Syncs scrolltop and scrollleft of all TABLEs.
 *
 * @method _onScroll
 * @param e {HTMLEvent} The scroll event.
 * @param oSelf {YAHOO.widget.ScrollingDataTable} ScrollingDataTable instance.
 * @private
 */
_onScroll : function(e, oSelf) {
    oSelf._elHdContainer.scrollLeft = oSelf._elBdContainer.scrollLeft;

    if(oSelf._oCellEditor && oSelf._oCellEditor.isActive) {
        oSelf.fireEvent("editorBlurEvent", {editor:oSelf._oCellEditor});
        oSelf.cancelCellEditor();
    }

    var elTarget = Ev.getTarget(e);
    var elTag = elTarget.nodeName.toLowerCase();
    oSelf.fireEvent("tableScrollEvent", {event:e, target:elTarget});
},

/**
 * Handles keydown events on the THEAD element.
 *
 * @method _onTheadKeydown
 * @param e {HTMLEvent} The key event.
 * @param oSelf {YAHOO.widget.ScrollingDataTable} ScrollingDataTable instance.
 * @private
 */
_onTheadKeydown : function(e, oSelf) {
    // If tabbing to next TH label link causes THEAD to scroll,
    // need to sync scrollLeft with TBODY
    if(Ev.getCharCode(e) === 9) {
        setTimeout(function() {
            if((oSelf instanceof SDT) && oSelf._sId) {
                oSelf._elBdContainer.scrollLeft = oSelf._elHdContainer.scrollLeft;
            }
        },0);
    }
    
    var elTarget = Ev.getTarget(e);
    var elTag = elTarget.nodeName.toLowerCase();
    var bKeepBubbling = true;
    while(elTarget && (elTag != "table")) {
        switch(elTag) {
            case "body":
                return;
            case "input":
            case "textarea":
                // TODO: implement textareaKeyEvent
                break;
            case "thead":
                bKeepBubbling = oSelf.fireEvent("theadKeyEvent",{target:elTarget,event:e});
                break;
            default:
                break;
        }
        if(bKeepBubbling === false) {
            return;
        }
        else {
            elTarget = elTarget.parentNode;
            if(elTarget) {
                elTag = elTarget.nodeName.toLowerCase();
            }
        }
    }
    oSelf.fireEvent("tableKeyEvent",{target:(elTarget || oSelf._elContainer),event:e});
}




/**
 * Fired when a fixed scrolling DataTable has a scroll.
 *
 * @event tableScrollEvent
 * @param oArgs.event {HTMLEvent} The event object.
 * @param oArgs.target {HTMLElement} The DataTable's CONTAINER element (in IE)
 * or the DataTable's TBODY element (everyone else).
 *
 */




});

})();

(function () {

var lang   = YAHOO.lang,
    util   = YAHOO.util,
    widget = YAHOO.widget,
    ua     = YAHOO.env.ua,
    
    Dom    = util.Dom,
    Ev     = util.Event,
    
    DT     = widget.DataTable;
/****************************************************************************/
/****************************************************************************/
/****************************************************************************/
    
/**
 * The BaseCellEditor class provides base functionality common to all inline cell
 * editors for a DataTable widget.
 *
 * @namespace YAHOO.widget
 * @class BaseCellEditor
 * @uses YAHOO.util.EventProvider 
 * @constructor
 * @param sType {String} Type indicator, to map to YAHOO.widget.DataTable.Editors.
 * @param oConfigs {Object} (Optional) Object literal of configs.
 */
widget.BaseCellEditor = function(sType, oConfigs) {
    this._sId = this._sId || Dom.generateId(null, "yui-ceditor"); // "yui-ceditor" + YAHOO.widget.BaseCellEditor._nCount++;
    YAHOO.widget.BaseCellEditor._nCount++;
    this._sType = sType;
    
    // Validate inputs
    this._initConfigs(oConfigs); 
    
    // Create Custom Events
    this._initEvents();
             
    // UI needs to be drawn
    this._needsRender = true;
};

var BCE = widget.BaseCellEditor;

/////////////////////////////////////////////////////////////////////////////
//
// Static members
//
/////////////////////////////////////////////////////////////////////////////
lang.augmentObject(BCE, {

/**
 * Global instance counter.
 *
 * @property CellEditor._nCount
 * @type Number
 * @static
 * @default 0
 * @private 
 */
_nCount : 0,

/**
 * Class applied to CellEditor container.
 *
 * @property CellEditor.CLASS_CELLEDITOR
 * @type String
 * @static
 * @default "yui-ceditor"
 */
CLASS_CELLEDITOR : "yui-ceditor"

});

BCE.prototype = {
/////////////////////////////////////////////////////////////////////////////
//
// Private members
//
/////////////////////////////////////////////////////////////////////////////
/**
 * Unique id assigned to instance "yui-ceditorN", useful prefix for generating unique
 * DOM ID strings and log messages.
 *
 * @property _sId
 * @type String
 * @private
 */
_sId : null,

/**
 * Editor type.
 *
 * @property _sType
 * @type String
 * @private
 */
_sType : null,

/**
 * DataTable instance.
 *
 * @property _oDataTable
 * @type YAHOO.widget.DataTable
 * @private 
 */
_oDataTable : null,

/**
 * Column instance.
 *
 * @property _oColumn
 * @type YAHOO.widget.Column
 * @default null
 * @private 
 */
_oColumn : null,

/**
 * Record instance.
 *
 * @property _oRecord
 * @type YAHOO.widget.Record
 * @default null
 * @private 
 */
_oRecord : null,

/**
 * TD element.
 *
 * @property _elTd
 * @type HTMLElement
 * @default null
 * @private
 */
_elTd : null,

/**
 * Container for inline editor.
 *
 * @property _elContainer
 * @type HTMLElement
 * @private 
 */
_elContainer : null,

/**
 * Reference to Cancel button, if available.
 *
 * @property _elCancelBtn
 * @type HTMLElement
 * @default null
 * @private 
 */
_elCancelBtn : null,

/**
 * Reference to Save button, if available.
 *
 * @property _elSaveBtn
 * @type HTMLElement
 * @default null
 * @private 
 */
_elSaveBtn : null,








/////////////////////////////////////////////////////////////////////////////
//
// Private methods
//
/////////////////////////////////////////////////////////////////////////////

/**
 * Initialize configs.
 *
 * @method _initConfigs
 * @private   
 */
_initConfigs : function(oConfigs) {
    // Object literal defines CellEditor configs
    if(oConfigs && YAHOO.lang.isObject(oConfigs)) {
        for(var sConfig in oConfigs) {
            if(sConfig) {
                this[sConfig] = oConfigs[sConfig];
            }
        }
    }
},

/**
 * Initialize Custom Events.
 *
 * @method _initEvents
 * @private   
 */
_initEvents : function() {
    this.createEvent("showEvent");
    this.createEvent("keydownEvent");
    this.createEvent("invalidDataEvent");
    this.createEvent("revertEvent");
    this.createEvent("saveEvent");
    this.createEvent("cancelEvent");
    this.createEvent("blurEvent");
    this.createEvent("blockEvent");
    this.createEvent("unblockEvent");
},

/**
 * Initialize container element.
 *
 * @method _initContainerEl
 * @private
 */
_initContainerEl : function() {
    if(this._elContainer) {
        YAHOO.util.Event.purgeElement(this._elContainer, true);
        this._elContainer.innerHTML = "";
    }

    var elContainer = document.createElement("div");
    elContainer.id = this.getId() + "-container"; // Needed for tracking blur event
    elContainer.style.display = "none";
    elContainer.tabIndex = 0;
    
    this.className = lang.isArray(this.className) ? this.className : this.className ? [this.className] : [];
    this.className[this.className.length] = DT.CLASS_EDITOR;
    elContainer.className = this.className.join(" ");
    
    document.body.insertBefore(elContainer, document.body.firstChild);
    this._elContainer = elContainer;
},

/**
 * Initialize container shim element.
 *
 * @method _initShimEl
 * @private
 */
_initShimEl : function() {
    // Iframe shim
    if(this.useIFrame) {
        if(!this._elIFrame) {
            var elIFrame = document.createElement("iframe");
            elIFrame.src = "javascript:false";
            elIFrame.frameBorder = 0;
            elIFrame.scrolling = "no";
            elIFrame.style.display = "none";
            elIFrame.className = DT.CLASS_EDITOR_SHIM;
            elIFrame.tabIndex = -1;
            elIFrame.role = "presentation";
            elIFrame.title = "Presentational iframe shim";
            document.body.insertBefore(elIFrame, document.body.firstChild);
            this._elIFrame = elIFrame;
        }
    }
},

/**
 * Hides CellEditor UI at end of interaction.
 *
 * @method _hide
 */
_hide : function() {
    this.getContainerEl().style.display = "none";
    if(this._elIFrame) {
        this._elIFrame.style.display = "none";
    }
    this.isActive = false;
    this.getDataTable()._oCellEditor =  null;
},











/////////////////////////////////////////////////////////////////////////////
//
// Public properties
//
/////////////////////////////////////////////////////////////////////////////
/**
 * Implementer defined function that can submit the input value to a server. This
 * function must accept the arguments fnCallback and oNewValue. When the submission
 * is complete, the function must also call fnCallback(bSuccess, oNewValue) to 
 * finish the save routine in the CellEditor. This function can also be used to 
 * perform extra validation or input value manipulation. 
 *
 * @property asyncSubmitter
 * @type HTMLFunction
 */
asyncSubmitter : null,

/**
 * Current value.
 *
 * @property value
 * @type MIXED
 */
value : null,

/**
 * Default value in case Record data is undefined. NB: Null values will not trigger
 * the default value.
 *
 * @property defaultValue
 * @type MIXED
 * @default null
 */
defaultValue : null,

/**
 * Validator function for input data, called from the DataTable instance scope,
 * receives the arguments (inputValue, currentValue, editorInstance) and returns
 * either the validated (or type-converted) value or undefined.
 *
 * @property validator
 * @type HTMLFunction
 * @default null
 */
validator : null,

/**
 * If validation is enabled, resets input field of invalid data.
 *
 * @property resetInvalidData
 * @type Boolean
 * @default true
 */
resetInvalidData : true,

/**
 * True if currently active.
 *
 * @property isActive
 * @type Boolean
 */
isActive : false,

/**
 * Text to display on Save button.
 *
 * @property LABEL_SAVE
 * @type HTML
 * @default "Save"
 */
LABEL_SAVE : "Save",

/**
 * Text to display on Cancel button.
 *
 * @property LABEL_CANCEL
 * @type HTML
 * @default "Cancel"
 */
LABEL_CANCEL : "Cancel",

/**
 * True if Save/Cancel buttons should not be displayed in the CellEditor.
 *
 * @property disableBtns
 * @type Boolean
 * @default false
 */
disableBtns : false,

/**
 * True if iframe shim for container element should be enabled.
 *
 * @property useIFrame
 * @type Boolean
 * @default false
 */
useIFrame : false,

/**
 * Custom CSS class or array of classes applied to the container element.
 *
 * @property className
 * @type String || String[]
 */
className : null,





/////////////////////////////////////////////////////////////////////////////
//
// Public methods
//
/////////////////////////////////////////////////////////////////////////////
/**
 * CellEditor instance name, for logging.
 *
 * @method toString
 * @return {String} Unique name of the CellEditor instance.
 */

toString : function() {
    return "CellEditor instance " + this._sId;
},

/**
 * CellEditor unique ID.
 *
 * @method getId
 * @return {String} Unique ID of the CellEditor instance.
 */

getId : function() {
    return this._sId;
},

/**
 * Returns reference to associated DataTable instance.
 *
 * @method getDataTable
 * @return {YAHOO.widget.DataTable} DataTable instance.
 */

getDataTable : function() {
    return this._oDataTable;
},

/**
 * Returns reference to associated Column instance.
 *
 * @method getColumn
 * @return {YAHOO.widget.Column} Column instance.
 */

getColumn : function() {
    return this._oColumn;
},

/**
 * Returns reference to associated Record instance.
 *
 * @method getRecord
 * @return {YAHOO.widget.Record} Record instance.
 */

getRecord : function() {
    return this._oRecord;
},



/**
 * Returns reference to associated TD element.
 *
 * @method getTdEl
 * @return {HTMLElement} TD element.
 */

getTdEl : function() {
    return this._elTd;
},

/**
 * Returns container element.
 *
 * @method getContainerEl
 * @return {HTMLElement} Reference to container element.
 */

getContainerEl : function() {
    return this._elContainer;
},

/**
 * Nulls out the entire CellEditor instance and related objects, removes attached
 * event listeners, and clears out DOM elements inside the container, removes
 * container from the DOM.
 *
 * @method destroy
 */
destroy : function() {
    this.unsubscribeAll();
    
    // Column is late-binding in attach()
    var oColumn = this.getColumn();
    if(oColumn) {
        oColumn.editor = null;
    }
    
    var elContainer = this.getContainerEl();
    if (elContainer) {
        Ev.purgeElement(elContainer, true);
        elContainer.parentNode.removeChild(elContainer);
    }
},

/**
 * Renders DOM elements and attaches event listeners.
 *
 * @method render
 */
render : function() {
    if (!this._needsRender) {
        return;
    }

    this._initContainerEl();
    this._initShimEl();

    // Handle ESC key
    Ev.addListener(this.getContainerEl(), "keydown", function(e, oSelf) {
        // ESC cancels Cell Editor
        if((e.keyCode == 27)) {
            var target = Ev.getTarget(e);
            // workaround for Mac FF3 bug that disabled clicks when ESC hit when
            // select is open. [bug 2273056]
            if (target.nodeName && target.nodeName.toLowerCase() === 'select') {
                target.blur();
            }
            oSelf.cancel();
        }
        // Pass through event
        oSelf.fireEvent("keydownEvent", {editor:oSelf, event:e});
    }, this);

    this.renderForm();

    // Show Save/Cancel buttons
    if(!this.disableBtns) {
        this.renderBtns();
    }
    
    this.doAfterRender();
    this._needsRender = false;
},

/**
 * Renders Save/Cancel buttons.
 *
 * @method renderBtns
 */
renderBtns : function() {
    // Buttons
    var elBtnsDiv = this.getContainerEl().appendChild(document.createElement("div"));
    elBtnsDiv.className = DT.CLASS_BUTTON;

    // Save button
    var elSaveBtn = elBtnsDiv.appendChild(document.createElement("button"));
    elSaveBtn.className = DT.CLASS_DEFAULT;
    elSaveBtn.innerHTML = this.LABEL_SAVE;
    Ev.addListener(elSaveBtn, "click", function(oArgs) {
        this.save();
    }, this, true);
    this._elSaveBtn = elSaveBtn;

    // Cancel button
    var elCancelBtn = elBtnsDiv.appendChild(document.createElement("button"));
    elCancelBtn.innerHTML = this.LABEL_CANCEL;
    Ev.addListener(elCancelBtn, "click", function(oArgs) {
        this.cancel();
    }, this, true);
    this._elCancelBtn = elCancelBtn;
},

/**
 * Attach CellEditor for a new interaction.
 *
 * @method attach
 * @param oDataTable {YAHOO.widget.DataTable} Associated DataTable instance.
 * @param elCell {HTMLElement} Cell to edit.  
 */
attach : function(oDataTable, elCell) {
    // Validate 
    if(oDataTable instanceof YAHOO.widget.DataTable) {
        this._oDataTable = oDataTable;
        
        // Validate cell
        elCell = oDataTable.getTdEl(elCell);
        if(elCell) {
            this._elTd = elCell;

            // Validate Column
            var oColumn = oDataTable.getColumn(elCell);
            if(oColumn) {
                this._oColumn = oColumn;
                
                // Validate Record
                var oRecord = oDataTable.getRecord(elCell);
                if(oRecord) {
                    this._oRecord = oRecord;
                    var value = oRecord.getData(this.getColumn().getField());
                    this.value = (value !== undefined) ? value : this.defaultValue;
                    return true;
                }
            }            
        }
    }
    return false;
},

/**
 * Moves container into position for display.
 *
 * @method move
 */
move : function() {
    // Move Editor
    var elContainer = this.getContainerEl(),
        elTd = this.getTdEl(),
        x = Dom.getX(elTd),
        y = Dom.getY(elTd);

    //TODO: remove scrolling logic
    // SF doesn't get xy for cells in scrolling table
    // when tbody display is set to block
    if(isNaN(x) || isNaN(y)) {
        var elTbody = this.getDataTable().getTbodyEl();
        x = elTd.offsetLeft + // cell pos relative to table
                Dom.getX(elTbody.parentNode) - // plus table pos relative to document
                elTbody.scrollLeft; // minus tbody scroll
        y = elTd.offsetTop + // cell pos relative to table
                Dom.getY(elTbody.parentNode) - // plus table pos relative to document
                elTbody.scrollTop + // minus tbody scroll
                this.getDataTable().getTheadEl().offsetHeight; // account for fixed THEAD cells
    }

    elContainer.style.left = x + "px";
    elContainer.style.top = y + "px";

    if(this._elIFrame) {
        this._elIFrame.style.left = x + "px";
        this._elIFrame.style.top = y + "px";
    }
},

/**
 * Displays CellEditor UI in the correct position.
 *
 * @method show
 */
show : function() {
    var elContainer = this.getContainerEl(),
        elIFrame = this._elIFrame;
    this.resetForm();
    this.isActive = true;
    elContainer.style.display = "";
    if(elIFrame) {
        elIFrame.style.width = elContainer.offsetWidth + "px";
        elIFrame.style.height = elContainer.offsetHeight + "px";
        elIFrame.style.display = "";
    }
    this.focus();
    this.fireEvent("showEvent", {editor:this});
},

/**
 * Fires blockEvent
 *
 * @method block
 */
block : function() {
    this.fireEvent("blockEvent", {editor:this});
},

/**
 * Fires unblockEvent
 *
 * @method unblock
 */
unblock : function() {
    this.fireEvent("unblockEvent", {editor:this});
},

/**
 * Saves value of CellEditor and hides UI.
 *
 * @method save
 */
save : function() {
    // Get new value
    var inputValue = this.getInputValue();
    var validValue = inputValue;
    
    // Validate new value
    if(this.validator) {
        validValue = this.validator.call(this.getDataTable(), inputValue, this.value, this);
        if(validValue === undefined ) {
            if(this.resetInvalidData) {
                this.resetForm();
            }
            this.fireEvent("invalidDataEvent",
                    {editor:this, oldData:this.value, newData:inputValue});
            return;
        }
    }
        
    var oSelf = this;
    var finishSave = function(bSuccess, oNewValue) {
        var oOrigValue = oSelf.value;
        if(bSuccess) {
            // Update new value
            oSelf.value = oNewValue;
            oSelf.getDataTable().updateCell(oSelf.getRecord(), oSelf.getColumn(), oNewValue);
            
            // Hide CellEditor
            oSelf._hide();
            
            oSelf.fireEvent("saveEvent",
                    {editor:oSelf, oldData:oOrigValue, newData:oSelf.value});
        }
        else {
            oSelf.resetForm();
            oSelf.fireEvent("revertEvent",
                    {editor:oSelf, oldData:oOrigValue, newData:oNewValue});
        }
        oSelf.unblock();
    };
    
    this.block();
    if(lang.isFunction(this.asyncSubmitter)) {
        this.asyncSubmitter.call(this, finishSave, validValue);
    } 
    else {   
        finishSave(true, validValue);
    }
},

/**
 * Cancels CellEditor input and hides UI.
 *
 * @method cancel
 */
cancel : function() {
    if(this.isActive) {
        this._hide();
        this.fireEvent("cancelEvent", {editor:this});
    }
    else {
    }
},

/**
 * Renders form elements.
 *
 * @method renderForm
 */
renderForm : function() {
    // To be implemented by subclass
},

/**
 * Access to add additional event listeners.
 *
 * @method doAfterRender
 */
doAfterRender : function() {
    // To be implemented by subclass
},


/**
 * After rendering form, if disabledBtns is set to true, then sets up a mechanism
 * to save input without them. 
 *
 * @method handleDisabledBtns
 */
handleDisabledBtns : function() {
    // To be implemented by subclass
},

/**
 * Resets CellEditor UI to initial state.
 *
 * @method resetForm
 */
resetForm : function() {
    // To be implemented by subclass
},

/**
 * Sets focus in CellEditor.
 *
 * @method focus
 */
focus : function() {
    // To be implemented by subclass
},

/**
 * Retrieves input value from CellEditor.
 *
 * @method getInputValue
 */
getInputValue : function() {
    // To be implemented by subclass
}

};

lang.augmentProto(BCE, util.EventProvider);


/////////////////////////////////////////////////////////////////////////////
//
// Custom Events
//
/////////////////////////////////////////////////////////////////////////////

/**
 * Fired when a CellEditor is shown.
 *
 * @event showEvent
 * @param oArgs.editor {YAHOO.widget.CellEditor} The CellEditor instance.
 */

/**
 * Fired when a CellEditor has a keydown.
 *
 * @event keydownEvent
 * @param oArgs.editor {YAHOO.widget.CellEditor} The CellEditor instance. 
 * @param oArgs.event {HTMLEvent} The event object.
 */

/**
 * Fired when a CellEditor input is reverted due to invalid data.
 *
 * @event invalidDataEvent
 * @param oArgs.editor {YAHOO.widget.CellEditor} The CellEditor instance. 
 * @param oArgs.newData {Object} New data value from form input field.
 * @param oArgs.oldData {Object} Old data value.
 */

/**
 * Fired when a CellEditor input is reverted due to asyncSubmitter failure.
 *
 * @event revertEvent
 * @param oArgs.editor {YAHOO.widget.CellEditor} The CellEditor instance. 
 * @param oArgs.newData {Object} New data value from form input field.
 * @param oArgs.oldData {Object} Old data value.
 */

/**
 * Fired when a CellEditor input is saved.
 *
 * @event saveEvent
 * @param oArgs.editor {YAHOO.widget.CellEditor} The CellEditor instance. 
 * @param oArgs.newData {Object} New data value from form input field.
 * @param oArgs.oldData {Object} Old data value.
 */

/**
 * Fired when a CellEditor input is canceled.
 *
 * @event cancelEvent
 * @param oArgs.editor {YAHOO.widget.CellEditor} The CellEditor instance. 
 */

/**
 * Fired when a CellEditor has a blur event.
 *
 * @event blurEvent
 * @param oArgs.editor {YAHOO.widget.CellEditor} The CellEditor instance. 
 */














/****************************************************************************/
/****************************************************************************/
/****************************************************************************/
    
/**
 * The CheckboxCellEditor class provides functionality for inline editing
 * DataTable cell data with checkboxes.
 *
 * @namespace YAHOO.widget
 * @class CheckboxCellEditor
 * @extends YAHOO.widget.BaseCellEditor
 * @constructor
 * @param oConfigs {Object} (Optional) Object literal of configs.
 */
widget.CheckboxCellEditor = function(oConfigs) {
    oConfigs = oConfigs || {};
    this._sId = this._sId || Dom.generateId(null, "yui-checkboxceditor"); // "yui-checkboxceditor" + YAHOO.widget.BaseCellEditor._nCount++;
    YAHOO.widget.BaseCellEditor._nCount++;
    widget.CheckboxCellEditor.superclass.constructor.call(this, oConfigs.type || "checkbox", oConfigs);
};

// CheckboxCellEditor extends BaseCellEditor
lang.extend(widget.CheckboxCellEditor, BCE, {

/////////////////////////////////////////////////////////////////////////////
//
// CheckboxCellEditor public properties
//
/////////////////////////////////////////////////////////////////////////////
/**
 * Array of checkbox values. Can either be a simple array (e.g., ["red","green","blue"])
 * or a an array of objects (e.g., [{label:"red", value:"#FF0000"},
 * {label:"green", value:"#00FF00"}, {label:"blue", value:"#0000FF"}]). String
 * values are treated as markup and inserted into the DOM as innerHTML.
 *
 * @property checkboxOptions
 * @type HTML[] | Object[]
 */
checkboxOptions : null,

/**
 * Reference to the checkbox elements.
 *
 * @property checkboxes
 * @type HTMLElement[] 
 */
checkboxes : null,

/**
 * Array of checked values
 *
 * @property value
 * @type String[] 
 */
value : null,

/////////////////////////////////////////////////////////////////////////////
//
// CheckboxCellEditor public methods
//
/////////////////////////////////////////////////////////////////////////////

/**
 * Render a form with input(s) type=checkbox.
 *
 * @method renderForm
 */
renderForm : function() {
    if(lang.isArray(this.checkboxOptions)) {
        var checkboxOption, checkboxValue, checkboxId, elLabel, j, len;
        
        // Create the checkbox buttons in an IE-friendly way...
        for(j=0,len=this.checkboxOptions.length; j<len; j++) {
            checkboxOption = this.checkboxOptions[j];
            checkboxValue = lang.isValue(checkboxOption.value) ?
                    checkboxOption.value : checkboxOption;

            checkboxId = this.getId() + "-chk" + j;
            this.getContainerEl().innerHTML += "<input type=\"checkbox\"" +
                    " id=\"" + checkboxId + "\"" + // Needed for label
                    " value=\"" + checkboxValue + "\" />";
            
            // Create the labels in an IE-friendly way
            elLabel = this.getContainerEl().appendChild(document.createElement("label"));
            elLabel.htmlFor = checkboxId;
            elLabel.innerHTML = lang.isValue(checkboxOption.label) ?
                    checkboxOption.label : checkboxOption;
        }
        
        // Store the reference to the checkbox elements
        var allCheckboxes = [];
        for(j=0; j<len; j++) {
            allCheckboxes[allCheckboxes.length] = this.getContainerEl().childNodes[j*2];
        }
        this.checkboxes = allCheckboxes;

        if(this.disableBtns) {
            this.handleDisabledBtns();
        }
    }
    else {
    }
},

/**
 * After rendering form, if disabledBtns is set to true, then sets up a mechanism
 * to save input without them. 
 *
 * @method handleDisabledBtns
 */
handleDisabledBtns : function() {
    Ev.addListener(this.getContainerEl(), "click", function(v){
        if(Ev.getTarget(v).tagName.toLowerCase() === "input") {
            // Save on blur
            this.save();
        }
    }, this, true);
},

/**
 * Resets CheckboxCellEditor UI to initial state.
 *
 * @method resetForm
 */
resetForm : function() {
    // Normalize to array
    var originalValues = lang.isArray(this.value) ? this.value : [this.value];
    
    // Match checks to value
    for(var i=0, j=this.checkboxes.length; i<j; i++) {
        this.checkboxes[i].checked = false;
        for(var k=0, len=originalValues.length; k<len; k++) {
            if(this.checkboxes[i].value == originalValues[k]) {
                this.checkboxes[i].checked = true;
            }
        }
    }
},

/**
 * Sets focus in CheckboxCellEditor.
 *
 * @method focus
 */
focus : function() {
    this.checkboxes[0].focus();
},

/**
 * Retrieves input value from CheckboxCellEditor.
 *
 * @method getInputValue
 */
getInputValue : function() {
    var checkedValues = [];
    for(var i=0, j=this.checkboxes.length; i<j; i++) {
        if(this.checkboxes[i].checked) {
            checkedValues[checkedValues.length] = this.checkboxes[i].value;
        }
    }  
    return checkedValues;
}

});

// Copy static members to CheckboxCellEditor class
lang.augmentObject(widget.CheckboxCellEditor, BCE);








/****************************************************************************/
/****************************************************************************/
/****************************************************************************/
    
/**
 * The DataCellEditor class provides functionality for inline editing
 * DataTable cell data with a YUI Calendar.
 *
 * @namespace YAHOO.widget
 * @class DateCellEditor
 * @extends YAHOO.widget.BaseCellEditor 
 * @constructor
 * @param oConfigs {Object} (Optional) Object literal of configs.
 */
widget.DateCellEditor = function(oConfigs) {
    oConfigs = oConfigs || {};
    this._sId = this._sId || Dom.generateId(null, "yui-dateceditor"); // "yui-dateceditor" + YAHOO.widget.BaseCellEditor._nCount++;
    YAHOO.widget.BaseCellEditor._nCount++;
    widget.DateCellEditor.superclass.constructor.call(this, oConfigs.type || "date", oConfigs);
};

// CheckboxCellEditor extends BaseCellEditor
lang.extend(widget.DateCellEditor, BCE, {

/////////////////////////////////////////////////////////////////////////////
//
// DateCellEditor public properties
//
/////////////////////////////////////////////////////////////////////////////
/**
 * Reference to Calendar instance.
 *
 * @property calendar
 * @type YAHOO.widget.Calendar
 */
calendar : null,

/**
 * Configs for the calendar instance, to be passed to Calendar constructor.
 *
 * @property calendarOptions
 * @type Object
 */
calendarOptions : null,

/**
 * Default value.
 *
 * @property defaultValue
 * @type Date
 * @default new Date()
 */
defaultValue : new Date(),


/////////////////////////////////////////////////////////////////////////////
//
// DateCellEditor public methods
//
/////////////////////////////////////////////////////////////////////////////

/**
 * Render a Calendar.
 *
 * @method renderForm
 */
renderForm : function() {
    // Calendar widget
    if(YAHOO.widget.Calendar) {
        var calContainer = this.getContainerEl().appendChild(document.createElement("div"));
        calContainer.id = this.getId() + "-dateContainer"; // Needed for Calendar constructor
        var calendar =
                new YAHOO.widget.Calendar(this.getId() + "-date",
                calContainer.id, this.calendarOptions);
        calendar.render();
        calContainer.style.cssFloat = "none";
        
        // Bug 2528576
        calendar.hideEvent.subscribe(function() {this.cancel();}, this, true);

        if(ua.ie) {
            var calFloatClearer = this.getContainerEl().appendChild(document.createElement("div"));
            calFloatClearer.style.clear = "both";
        }
        
        this.calendar = calendar;

        if(this.disableBtns) {
            this.handleDisabledBtns();
        }
    }
    else {
    }
    
},

/**
 * After rendering form, if disabledBtns is set to true, then sets up a mechanism
 * to save input without them. 
 *
 * @method handleDisabledBtns
 */
handleDisabledBtns : function() {
    this.calendar.selectEvent.subscribe(function(v){
        // Save on select
        this.save();
    }, this, true);
},

/**
 * Resets DateCellEditor UI to initial state.
 *
 * @method resetForm
 */
resetForm : function() {
    var value = this.value || (new Date());
    this.calendar.select(value);
    this.calendar.cfg.setProperty("pagedate",value,false);
	this.calendar.render();
	// Bug 2528576
	this.calendar.show();
},

/**
 * Sets focus in DateCellEditor.
 *
 * @method focus
 */
focus : function() {
    // To be impmlemented by subclass
},

/**
 * Retrieves input value from DateCellEditor.
 *
 * @method getInputValue
 */
getInputValue : function() {
    return this.calendar.getSelectedDates()[0];
}

});

// Copy static members to DateCellEditor class
lang.augmentObject(widget.DateCellEditor, BCE);









/****************************************************************************/
/****************************************************************************/
/****************************************************************************/
    
/**
 * The DropdownCellEditor class provides functionality for inline editing
 * DataTable cell data a SELECT element.
 *
 * @namespace YAHOO.widget
 * @class DropdownCellEditor
 * @extends YAHOO.widget.BaseCellEditor 
 * @constructor
 * @param oConfigs {Object} (Optional) Object literal of configs.
 */
widget.DropdownCellEditor = function(oConfigs) {
    oConfigs = oConfigs || {};
    this._sId = this._sId || Dom.generateId(null, "yui-dropdownceditor"); // "yui-dropdownceditor" + YAHOO.widget.BaseCellEditor._nCount++;
    YAHOO.widget.BaseCellEditor._nCount++;
    widget.DropdownCellEditor.superclass.constructor.call(this, oConfigs.type || "dropdown", oConfigs);
};

// DropdownCellEditor extends BaseCellEditor
lang.extend(widget.DropdownCellEditor, BCE, {

/////////////////////////////////////////////////////////////////////////////
//
// DropdownCellEditor public properties
//
/////////////////////////////////////////////////////////////////////////////
/**
 * Array of dropdown values. Can either be a simple array (e.g.,
 * ["Alabama","Alaska","Arizona","Arkansas"]) or a an array of objects (e.g., 
 * [{label:"Alabama", value:"AL"}, {label:"Alaska", value:"AK"},
 * {label:"Arizona", value:"AZ"}, {label:"Arkansas", value:"AR"}]). String
 * values are treated as markup and inserted into the DOM as innerHTML.
 *
 * @property dropdownOptions
 * @type HTML[] | Object[]
 */
dropdownOptions : null,

/**
 * Reference to Dropdown element.
 *
 * @property dropdown
 * @type HTMLElement
 */
dropdown : null,

/**
 * Enables multi-select.
 *
 * @property multiple
 * @type Boolean
 */
multiple : false,

/**
 * Specifies number of visible options.
 *
 * @property size
 * @type Number
 */
size : null,

/////////////////////////////////////////////////////////////////////////////
//
// DropdownCellEditor public methods
//
/////////////////////////////////////////////////////////////////////////////

/**
 * Render a form with select element.
 *
 * @method renderForm
 */
renderForm : function() {
    var elDropdown = this.getContainerEl().appendChild(document.createElement("select"));
    elDropdown.style.zoom = 1;
    if(this.multiple) {
        elDropdown.multiple = "multiple";
    }
    if(lang.isNumber(this.size)) {
        elDropdown.size = this.size;
    }
    this.dropdown = elDropdown;
    
    if(lang.isArray(this.dropdownOptions)) {
        var dropdownOption, elOption;
        for(var i=0, j=this.dropdownOptions.length; i<j; i++) {
            dropdownOption = this.dropdownOptions[i];
            elOption = document.createElement("option");
            elOption.value = (lang.isValue(dropdownOption.value)) ?
                    dropdownOption.value : dropdownOption;
            elOption.innerHTML = (lang.isValue(dropdownOption.label)) ?
                    dropdownOption.label : dropdownOption;
            elOption = elDropdown.appendChild(elOption);
        }
        
        if(this.disableBtns) {
            this.handleDisabledBtns();
        }
    }
},

/**
 * After rendering form, if disabledBtns is set to true, then sets up a mechanism
 * to save input without them. 
 *
 * @method handleDisabledBtns
 */
handleDisabledBtns : function() {
    // Save on blur for multi-select
    if(this.multiple) {
        Ev.addListener(this.dropdown, "blur", function(v){
            // Save on change
            this.save();
        }, this, true);
    }
    // Save on change for single-select
    else {
        if(!ua.ie) {
            Ev.addListener(this.dropdown, "change", function(v){
                // Save on change
                this.save();
            }, this, true);
        }
        else {
            // Bug 2529274: "change" event is not keyboard accessible in IE6
            Ev.addListener(this.dropdown, "blur", function(v){
                this.save();
            }, this, true);
            Ev.addListener(this.dropdown, "click", function(v){
                this.save();
            }, this, true);
        }
    }
},

/**
 * Resets DropdownCellEditor UI to initial state.
 *
 * @method resetForm
 */
resetForm : function() {
    var allOptions = this.dropdown.options,
        i=0, j=allOptions.length;

    // Look for multi-select selections
    if(lang.isArray(this.value)) {
        var allValues = this.value,
            m=0, n=allValues.length,
            hash = {};
        // Reset all selections and stash options in a value hash
        for(; i<j; i++) {
            allOptions[i].selected = false;
            hash[allOptions[i].value] = allOptions[i];
        }
        for(; m<n; m++) {
            if(hash[allValues[m]]) {
                hash[allValues[m]].selected = true;
            }
        }
    }
    // Only need to look for a single selection
    else {
        for(; i<j; i++) {
            if(this.value == allOptions[i].value) {
                allOptions[i].selected = true;
            }
        }
    }
},

/**
 * Sets focus in DropdownCellEditor.
 *
 * @method focus
 */
focus : function() {
    this.getDataTable()._focusEl(this.dropdown);
},

/**
 * Retrieves input value from DropdownCellEditor.
 *
 * @method getInputValue
 */
getInputValue : function() {
    var allOptions = this.dropdown.options;
    
    // Look for multiple selections
    if(this.multiple) {
        var values = [],
            i=0, j=allOptions.length;
        for(; i<j; i++) {
            if(allOptions[i].selected) {
                values.push(allOptions[i].value);
            }
        }
        return values;
    }
    // Only need to look for single selection
    else {
        return allOptions[allOptions.selectedIndex].value;
    }
}

});

// Copy static members to DropdownCellEditor class
lang.augmentObject(widget.DropdownCellEditor, BCE);






/****************************************************************************/
/****************************************************************************/
/****************************************************************************/
    
/**
 * The RadioCellEditor class provides functionality for inline editing
 * DataTable cell data with radio buttons.
 *
 * @namespace YAHOO.widget
 * @class RadioCellEditor
 * @extends YAHOO.widget.BaseCellEditor 
 * @constructor
 * @param oConfigs {Object} (Optional) Object literal of configs.
 */
widget.RadioCellEditor = function(oConfigs) {
    oConfigs = oConfigs || {};
    this._sId = this._sId || Dom.generateId(null, "yui-radioceditor"); // "yui-radioceditor" + YAHOO.widget.BaseCellEditor._nCount++;
    YAHOO.widget.BaseCellEditor._nCount++;
    widget.RadioCellEditor.superclass.constructor.call(this, oConfigs.type || "radio", oConfigs);
};

// RadioCellEditor extends BaseCellEditor
lang.extend(widget.RadioCellEditor, BCE, {

/////////////////////////////////////////////////////////////////////////////
//
// RadioCellEditor public properties
//
/////////////////////////////////////////////////////////////////////////////
/**
 * Reference to radio elements.
 *
 * @property radios
 * @type HTMLElement[]
 */
radios : null,

/**
 * Array of radio values. Can either be a simple array (e.g., ["yes","no","maybe"])
 * or a an array of objects (e.g., [{label:"yes", value:1}, {label:"no", value:-1},
 * {label:"maybe", value:0}]). String values are treated as markup and inserted
 * into the DOM as innerHTML.
 *
 * @property radioOptions
 * @type HTML[] | Object[]
 */
radioOptions : null,

/////////////////////////////////////////////////////////////////////////////
//
// RadioCellEditor public methods
//
/////////////////////////////////////////////////////////////////////////////

/**
 * Render a form with input(s) type=radio.
 *
 * @method renderForm
 */
renderForm : function() {
    if(lang.isArray(this.radioOptions)) {
        var radioOption, radioValue, radioId, elLabel;
        
        // Create the radio buttons in an IE-friendly way
        for(var i=0, len=this.radioOptions.length; i<len; i++) {
            radioOption = this.radioOptions[i];
            radioValue = lang.isValue(radioOption.value) ?
                    radioOption.value : radioOption;
            radioId = this.getId() + "-radio" + i;
            this.getContainerEl().innerHTML += "<input type=\"radio\"" +
                    " name=\"" + this.getId() + "\"" +
                    " value=\"" + radioValue + "\"" +
                    " id=\"" +  radioId + "\" />"; // Needed for label
            
            // Create the labels in an IE-friendly way
            elLabel = this.getContainerEl().appendChild(document.createElement("label"));
            elLabel.htmlFor = radioId;
            elLabel.innerHTML = (lang.isValue(radioOption.label)) ?
                    radioOption.label : radioOption;
        }
        
        // Store the reference to the checkbox elements
        var allRadios = [],
            elRadio;
        for(var j=0; j<len; j++) {
            elRadio = this.getContainerEl().childNodes[j*2];
            allRadios[allRadios.length] = elRadio;
        }
        this.radios = allRadios;

        if(this.disableBtns) {
            this.handleDisabledBtns();
        }
    }
    else {
    }
},

/**
 * After rendering form, if disabledBtns is set to true, then sets up a mechanism
 * to save input without them. 
 *
 * @method handleDisabledBtns
 */
handleDisabledBtns : function() {
    Ev.addListener(this.getContainerEl(), "click", function(v){
        if(Ev.getTarget(v).tagName.toLowerCase() === "input") {
            // Save on blur
            this.save();
        }
    }, this, true);
},

/**
 * Resets RadioCellEditor UI to initial state.
 *
 * @method resetForm
 */
resetForm : function() {
    for(var i=0, j=this.radios.length; i<j; i++) {
        var elRadio = this.radios[i];
        if(this.value == elRadio.value) {
            elRadio.checked = true;
            return;
        }
    }
},

/**
 * Sets focus in RadioCellEditor.
 *
 * @method focus
 */
focus : function() {
    for(var i=0, j=this.radios.length; i<j; i++) {
        if(this.radios[i].checked) {
            this.radios[i].focus();
            return;
        }
    }
},

/**
 * Retrieves input value from RadioCellEditor.
 *
 * @method getInputValue
 */
getInputValue : function() {
    for(var i=0, j=this.radios.length; i<j; i++) {
        if(this.radios[i].checked) {
            return this.radios[i].value;
        }
    }
}

});

// Copy static members to RadioCellEditor class
lang.augmentObject(widget.RadioCellEditor, BCE);






/****************************************************************************/
/****************************************************************************/
/****************************************************************************/
    
/**
 * The TextareaCellEditor class provides functionality for inline editing
 * DataTable cell data with a TEXTAREA element.
 *
 * @namespace YAHOO.widget
 * @class TextareaCellEditor
 * @extends YAHOO.widget.BaseCellEditor 
 * @constructor
 * @param oConfigs {Object} (Optional) Object literal of configs.
 */
widget.TextareaCellEditor = function(oConfigs) {
    oConfigs = oConfigs || {};
    this._sId = this._sId || Dom.generateId(null, "yui-textareaceditor");// "yui-textareaceditor" + ;
    YAHOO.widget.BaseCellEditor._nCount++;
    widget.TextareaCellEditor.superclass.constructor.call(this, oConfigs.type || "textarea", oConfigs);
};

// TextareaCellEditor extends BaseCellEditor
lang.extend(widget.TextareaCellEditor, BCE, {

/////////////////////////////////////////////////////////////////////////////
//
// TextareaCellEditor public properties
//
/////////////////////////////////////////////////////////////////////////////
/**
 * Reference to textarea element.
 *
 * @property textarea
 * @type HTMLElement
 */
textarea : null,


/////////////////////////////////////////////////////////////////////////////
//
// TextareaCellEditor public methods
//
/////////////////////////////////////////////////////////////////////////////

/**
 * Render a form with textarea.
 *
 * @method renderForm
 */
renderForm : function() {
    var elTextarea = this.getContainerEl().appendChild(document.createElement("textarea"));
    this.textarea = elTextarea;

    if(this.disableBtns) {
        this.handleDisabledBtns();
    }
},

/**
 * After rendering form, if disabledBtns is set to true, then sets up a mechanism
 * to save input without them. 
 *
 * @method handleDisabledBtns
 */
handleDisabledBtns : function() {
    Ev.addListener(this.textarea, "blur", function(v){
        // Save on blur
        this.save();
    }, this, true);        
},

/**
 * Moves TextareaCellEditor UI to a cell.
 *
 * @method move
 */
move : function() {
    this.textarea.style.width = this.getTdEl().offsetWidth + "px";
    this.textarea.style.height = "3em";
    YAHOO.widget.TextareaCellEditor.superclass.move.call(this);
},

/**
 * Resets TextareaCellEditor UI to initial state.
 *
 * @method resetForm
 */
resetForm : function() {
    this.textarea.value = this.value;
},

/**
 * Sets focus in TextareaCellEditor.
 *
 * @method focus
 */
focus : function() {
    // Bug 2303181, Bug 2263600
    this.getDataTable()._focusEl(this.textarea);
    this.textarea.select();
},

/**
 * Retrieves input value from TextareaCellEditor.
 *
 * @method getInputValue
 */
getInputValue : function() {
    return this.textarea.value;
}

});

// Copy static members to TextareaCellEditor class
lang.augmentObject(widget.TextareaCellEditor, BCE);









/****************************************************************************/
/****************************************************************************/
/****************************************************************************/
    
/**
 * The TextboxCellEditor class provides functionality for inline editing
 * DataTable cell data with an INPUT TYPE=TEXT element.
 *
 * @namespace YAHOO.widget
 * @class TextboxCellEditor
 * @extends YAHOO.widget.BaseCellEditor 
 * @constructor
 * @param oConfigs {Object} (Optional) Object literal of configs.
 */
widget.TextboxCellEditor = function(oConfigs) {
    oConfigs = oConfigs || {};
    this._sId = this._sId || Dom.generateId(null, "yui-textboxceditor");// "yui-textboxceditor" + YAHOO.widget.BaseCellEditor._nCount++;
    YAHOO.widget.BaseCellEditor._nCount++;
    widget.TextboxCellEditor.superclass.constructor.call(this, oConfigs.type || "textbox", oConfigs);
};

// TextboxCellEditor extends BaseCellEditor
lang.extend(widget.TextboxCellEditor, BCE, {

/////////////////////////////////////////////////////////////////////////////
//
// TextboxCellEditor public properties
//
/////////////////////////////////////////////////////////////////////////////
/**
 * Reference to the textbox element.
 *
 * @property textbox
 */
textbox : null,

/////////////////////////////////////////////////////////////////////////////
//
// TextboxCellEditor public methods
//
/////////////////////////////////////////////////////////////////////////////

/**
 * Render a form with input type=text.
 *
 * @method renderForm
 */
renderForm : function() {
    var elTextbox;
    // Bug 1802582: SF3/Mac needs a form element wrapping the input
    if(ua.webkit>420) {
        elTextbox = this.getContainerEl().appendChild(document.createElement("form")).appendChild(document.createElement("input"));
    }
    else {
        elTextbox = this.getContainerEl().appendChild(document.createElement("input"));
    }
    elTextbox.type = "text";
    this.textbox = elTextbox;

    // Save on enter by default
    // Bug: 1802582 Set up a listener on each textbox to track on keypress
    // since SF/OP can't preventDefault on keydown
    Ev.addListener(elTextbox, "keypress", function(v){
        if((v.keyCode === 13)) {
            // Prevent form submit
            YAHOO.util.Event.preventDefault(v);
            this.save();
        }
    }, this, true);

    if(this.disableBtns) {
        // By default this is no-op since enter saves by default
        this.handleDisabledBtns();
    }
},

/**
 * Moves TextboxCellEditor UI to a cell.
 *
 * @method move
 */
move : function() {
    this.textbox.style.width = this.getTdEl().offsetWidth + "px";
    widget.TextboxCellEditor.superclass.move.call(this);
},

/**
 * Resets TextboxCellEditor UI to initial state.
 *
 * @method resetForm
 */
resetForm : function() {
    this.textbox.value = lang.isValue(this.value) ? this.value.toString() : "";
},

/**
 * Sets focus in TextboxCellEditor.
 *
 * @method focus
 */
focus : function() {
    // Bug 2303181, Bug 2263600
    this.getDataTable()._focusEl(this.textbox);
    this.textbox.select();
},

/**
 * Returns new value for TextboxCellEditor.
 *
 * @method getInputValue
 */
getInputValue : function() {
    return this.textbox.value;
}

});

// Copy static members to TextboxCellEditor class
lang.augmentObject(widget.TextboxCellEditor, BCE);







/////////////////////////////////////////////////////////////////////////////
//
// DataTable extension
//
/////////////////////////////////////////////////////////////////////////////

/**
 * CellEditor subclasses.
 * @property DataTable.Editors
 * @type Object
 * @static
 */
DT.Editors = {
    checkbox : widget.CheckboxCellEditor,
    "date"   : widget.DateCellEditor,
    dropdown : widget.DropdownCellEditor,
    radio    : widget.RadioCellEditor,
    textarea : widget.TextareaCellEditor,
    textbox  : widget.TextboxCellEditor
};

/****************************************************************************/
/****************************************************************************/
/****************************************************************************/
    
/**
 * Factory class for instantiating a BaseCellEditor subclass.
 *
 * @namespace YAHOO.widget
 * @class CellEditor
 * @extends YAHOO.widget.BaseCellEditor 
 * @constructor
 * @param sType {String} Type indicator, to map to YAHOO.widget.DataTable.Editors.
 * @param oConfigs {Object} (Optional) Object literal of configs.
 */
widget.CellEditor = function(sType, oConfigs) {
    // Point to one of the subclasses
    if(sType && DT.Editors[sType]) {
        lang.augmentObject(BCE, DT.Editors[sType]);
        return new DT.Editors[sType](oConfigs);
    }
    else {
        return new BCE(null, oConfigs);
    }
};

var CE = widget.CellEditor;

// Copy static members to CellEditor class
lang.augmentObject(CE, BCE);


})();

YAHOO.register("datatable", YAHOO.widget.DataTable, {version: "2.9.0", build: "2800"});
