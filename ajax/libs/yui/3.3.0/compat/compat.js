YUI.add('compat', function(Y) {


/*global YAHOO*/
/*global YUI*/
/*global YUI_config*/

var COMPAT_ARG = '~yui|2|compat~', o, L;


if (window.YAHOO != YUI) {

    // get any existing YAHOO obj props
    o = (window.YAHOO) ? YUI.merge(window.YAHOO) : null;

    // Make the YUI global the YAHOO global
    window.YAHOO = YUI;

    // augment old YAHOO props
    if (o) {
        Y.mix(Y, o);
    }
}

// add old namespaces
Y.namespace("util", "widget", "example");

// case/location change
Y.env = (Y.env) ? Y.mix(Y.env, Y.Env) : Y.Env;
Y.lang = (Y.lang) ? Y.mix(Y.lang, Y.Lang) : Y.Lang;
Y.env.ua = Y.UA;

// support Y.register
Y.mix(Y.env, {
        modules: [],
        listeners: [],
        getVersion: function(name) {
            return this.Env.modules[name] || null;
        }
});

L = Y.lang;

// add old lang properties
Y.mix(L, {

    augmentObject: function(r, s) {
        var a = arguments, wl = (a.length > 2) ? Y.Array(a, 2, true) : null,
            ov = (wl), args = [r, s, ov];

        if (wl && wl[0] !== true) {
            args.push(wl);
        }

        return Y.mix.apply(Y, args);
    },

    augmentProto: function(r, s) {
        var a = arguments, wl = (a.length > 2) ? Y.Array(a, 2, true) : null,
            ov = (wl), args = [r, s, ov];
        return Y.augment.apply(Y, args);
    },

    // extend: Y.bind(Y.extend, Y),
    extend: Y.extend,
    // merge: Y.bind(Y.merge, Y)
    merge: Y.merge
}, true);

L.augment = L.augmentProto;

L.hasOwnProperty = function(o, k) {
    return (o.hasOwnProperty(k));
};

Y.augmentProto = L.augmentProto;

// add register function
Y.mix(Y, {
    register: function(name, mainClass, data) {
        var mods = Y.Env.modules;
        if (!mods[name]) {
            mods[name] = { versions:[], builds:[] };
        }
        var m=mods[name],v=data.version,b=data.build,ls=Y.Env.listeners;
        m.name = name;
        m.version = v;
        m.build = b;
        m.versions.push(v);
        m.builds.push(b);
        m.mainClass = mainClass;
        // fire the module load listeners
        for (var i=0;i<ls.length;i=i+1) {
            ls[i](m);
        }
        // label the main class
        if (mainClass) {
            mainClass.VERSION = v;
            mainClass.BUILD = b;
        } else {
        }
    }
});

// add old load listeners
if ("undefined" != typeof YAHOO_config) {
    var l=YAHOO_config.listener,ls=Y.Env.listeners,unique=true,i;
    if (l) {
        // if YAHOO is loaded multiple times we need to check to see if
        // this is a new config object.  If it is, add the new component
        // load listener to the stack
        for (i=0;i<ls.length;i=i+1) {
            if (ls[i]==l) {
                unique=false;
                break;
            }
        }
        if (unique) {
            ls.push(l);
        }
    }
}

// add old registration for yahoo
Y.register("yahoo", Y, {version: "@VERSION@", build: "@BUILD@"});

if (Y.Event) {

    o = {

        /**
         * Safari detection
         * @property isSafari
         * @private
         * @static
         * @deprecated use Y.Env.UA.webkit
         */
        isSafari: Y.UA.webkit,

        /**
         * webkit version
         * @property webkit
         * @type string
         * @private
         * @static
         * @deprecated use Y.Env.UA.webkit
         */
        webkit: Y.UA.webkit,

        /**
         * Normalized keycodes for webkit/safari
         * @property webkitKeymap
         * @type {int: int}
         * @private
         * @static
         * @final
         */
        webkitKeymap: {
            63232: 38, // up
            63233: 40, // down
            63234: 37, // left
            63235: 39, // right
            63276: 33, // page up
            63277: 34, // page down
            25: 9      // SHIFT-TAB (Safari provides a different key code in
                       // this case, even though the shiftKey modifier is set)
        },

        /**
         * IE detection
         * @property isIE
         * @private
         * @static
         * @deprecated use Y.Env.UA.ie
         */
        isIE: Y.UA.ie,

        /**
         * Returns scrollLeft
         * @method _getScrollLeft
         * @static
         * @private
         */
        _getScrollLeft: function() {
            return this._getScroll()[1];
        },

        /**
         * Returns scrollTop
         * @method _getScrollTop
         * @static
         * @private
         */
        _getScrollTop: function() {
            return this._getScroll()[0];
        },

        /**
         * Returns the scrollTop and scrollLeft.  Used to calculate the
         * pageX and pageY in Internet Explorer
         * @method _getScroll
         * @static
         * @private
         */
        _getScroll: function() {
            var d = Y.config.doc, dd = d.documentElement, db = d.body;
            if (dd && (dd.scrollTop || dd.scrollLeft)) {
                return [dd.scrollTop, dd.scrollLeft];
            } else if (db) {
                return [db.scrollTop, db.scrollLeft];
            } else {
                return [0, 0];
            }
        },

        /**
         * Returns the event's pageX
         * @method getPageX
         * @param {Event} ev the event
         * @return {int} the event's pageX
         * @static
         */
        getPageX: function(ev) {
            var x = ev.pageX;
            if (!x && 0 !== x) {
                x = ev.clientX || 0;

                if ( Y.UA.ie ) {
                    x += this._getScrollLeft();
                }
            }

            return x;
        },

        /**
         * Returns the charcode for an event
         * @method getCharCode
         * @param {Event} ev the event
         * @return {int} the event's charCode
         * @static
         */
        getCharCode: function(ev) {
            var code = ev.keyCode || ev.charCode || 0;

            // webkit normalization
            if (Y.UA.webkit && (code in Y.Event.webkitKeymap)) {
                code = Y.Event.webkitKeymap[code];
            }
            return code;
        },

        /**
         * Returns the event's pageY
         * @method getPageY
         * @param {Event} ev the event
         * @return {int} the event's pageY
         * @static
         */
        getPageY: function(ev) {
            var y = ev.pageY;
            if (!y && 0 !== y) {
                y = ev.clientY || 0;

                if ( Y.UA.ie ) {
                    y += this._getScrollTop();
                }
            }


            return y;
        },

        /**
         * Returns the pageX and pageY properties as an indexed array.
         * @method getXY
         * @param {Event} ev the event
         * @return {[x, y]} the pageX and pageY properties of the event
         * @static
         */
        getXY: function(ev) {
            return [this.getPageX(ev), this.getPageY(ev)];
        },

        /**
         * Returns the event's related target
         * @method getRelatedTarget
         * @param {Event} ev the event
         * @return {HTMLElement} the event's relatedTarget
         * @static
         */
        getRelatedTarget: function(ev) {
            var t = ev.relatedTarget;
            if (!t) {
                if (ev.type == "mouseout") {
                    t = ev.toElement;
                } else if (ev.type == "mouseover") {
                    t = ev.fromElement;
                }
            }

            return this.resolveTextNode(t);
        },

        /**
         * Returns the time of the event.  If the time is not included, the
         * event is modified using the current time.
         * @method getTime
         * @param {Event} ev the event
         * @return {Date} the time of the event
         * @static
         */
        getTime: function(ev) {
            if (!ev.time) {
                var t = new Date().getTime();
                try {
                    ev.time = t;
                } catch(ex) {
                    this.lastError = ex;
                    return t;
                }
            }

            return ev.time;
        },

        /**
         * Convenience method for stopPropagation + preventDefault
         * @method stopEvent
         * @param {Event} ev the event
         * @static
         */
        stopEvent: function(ev) {
            this.stopPropagation(ev);
            this.preventDefault(ev);
        },

        /**
         * Stops event propagation
         * @method stopPropagation
         * @param {Event} ev the event
         * @static
         */
        stopPropagation: function(ev) {
            if (ev.stopPropagation) {
                ev.stopPropagation();
            } else {
                ev.cancelBubble = true;
            }
        },

        /**
         * Prevents the default behavior of the event
         * @method preventDefault
         * @param {Event} ev the event
         * @static
         */
        preventDefault: function(ev) {
            if (ev.preventDefault) {
                ev.preventDefault();
            } else {
                ev.returnValue = false;
            }
        },

        /**
         * Returns the event's target element.  Safari sometimes provides
         * a text node, and this is automatically resolved to the text
         * node's parent so that it behaves like other browsers.
         * @method getTarget
         * @param {Event} ev the event
         * @param {boolean} resolveTextNode when set to true the target's
         *                  parent will be returned if the target is a
         *                  text node.  @deprecated, the text node is
         *                  now resolved automatically
         * @return {HTMLElement} the event's target
         * @static
         */
        getTarget: function(ev, resolveTextNode) {
            var t = ev.target || ev.srcElement;
            return this.resolveTextNode(t);
        },

        /**
         * In some cases, some browsers will return a text node inside
         * the actual element that was targeted.  This normalizes the
         * return value for getTarget and getRelatedTarget.
         * @method resolveTextNode
         * @param {HTMLElement} node node to resolve
         * @return {HTMLElement} the normized node
         * @static
         */
        resolveTextNode: function(node) {
            if (node && 3 == node.nodeType) {
                return node.parentNode;
            } else {
                return node;
            }
        },

        /**
         * We cache elements bound by id because when the unload event
         * fires, we can no longer use document.getElementById
         * @method getEl
         * @static
         * @private
         * @deprecated Elements are not cached any longer
         */
        getEl: function(id) {
            return Y.get(id);
        }
    };

    Y.mix(Y.Event, o);

    /**
     * Calls Y.Event.attach with the correct argument order
     * @method removeListener
     */
    Y.Event.removeListener = function(el, type, fn, data, override) {

        var context, a=[type, fn, el];

        if (data) {

            if (override) {
                context = (override === true) ? data : override;
            }

            a.push(context);
            a.push(data);
        }

        a.push(COMPAT_ARG);

        return Y.Event.detach.apply(Y.Event, a);
    };

    /**
     * Calls Y.Event.detach with the correct argument order
     * @method addListener
     */
    Y.Event.addListener = function(el, type, fn, data, override) {


        // var a = Y.Array(arguments, 0, true), el = a.shift();
        // a.splice(2, 0, el);
        // return Y.Event.attach.apply(Y.Event, a);
        var context, a=[type, fn, el];

        if (data) {

            if (override) {
                context = (override === true) ? data : override;
            }

            a.push(context);
            a.push(data);
        }

        a.push(COMPAT_ARG);

        return Y.Event.attach.apply(Y.Event, a);
    };

    Y.Event.on = Y.Event.addListener;

    var newOnavail = Y.Event.onAvailable;

    Y.Event.onAvailable = function(id, fn, p_obj, p_override) {
        return newOnavail(id, fn, p_obj, p_override, false, true);
    };

    Y.Event.onContentReady = function(id, fn, p_obj, p_override) {
        return newOnavail(id, fn, p_obj, p_override, true, true);
    };

    Y.Event.onDOMReady = function() {
        var a = Y.Array(arguments, 0, true);
        a.unshift('domready');
        return Y.on.apply(Y, a);
    };

    Y.util.Event = Y.Event;

    var CE = function(type, oScope, silent, signature) {
        //debugger;

        var o = {
            context: oScope,
            silent: silent || false
            // signature: signature || CE.LIST
        };

        CE.superclass.constructor.call(this, type, o);

        this.signature = signature || CE.LIST;
    };

    Y.extend(CE, Y.CustomEvent, {

    });

    /**
     * Subscriber listener sigature constant.  The LIST type returns three
     * parameters: the event type, the array of args passed to fire, and
     * the optional custom object
     * @property YAHOO.util.CustomEvent.LIST
     * @static
     * @type int
     */
    CE.LIST = 0;

    /**
     * Subscriber listener sigature constant.  The FLAT type returns two
     * parameters: the first argument passed to fire and the optional
     * custom object
     * @property YAHOO.util.CustomEvent.FLAT
     * @static
     * @type int
     */
    CE.FLAT = 1;

    Y.util.CustomEvent = CE;

    var EP = function() {
        //console.log('Compat CustomEvent constructor executed: ' + this._yuid);
        if (!this._yuievt) {
            var sub = this.subscribe;
            Y.EventTarget.apply(this, arguments);
            this.subscribe = sub;
            this.__yuiepinit = function() {};
        }
    };

    Y.extend(EP, Y.EventTarget, {

        createEvent: function(type, o) {
            // if (!this._yuievt) {
            //     Y.EventTarget.call(this);
            // }
            o = o || {};
            o.signature = o.signature || CE.FLAT;
            return this.publish(type, o);
        },

        subscribe: function(type, fn, obj, override) {
            var ce = this._yuievt.events[type] || this.createEvent(type),
                a = Y.Array(arguments);

            if (override && true !== override) {
                // a[2] = override;
                // a[1] = obj;
            }

            Y.EventTarget.prototype.on.apply(this, a);
        },

        fireEvent: function(type) {
            return this.fire.apply(this, arguments);
        },

        hasEvent: function(type) {
            if (!this._yuievt) {
                Y.EventTarget.call(this);
            }
            return this.getEvent(type);
        }
    });

    Y.util.EventProvider = EP;

}


Y.register("event", Y.util.Event, {version: "@VERSION@", build: "@BUILD@"});


var propertyCache = {};
var patterns = {
    HYPHEN: /(-[a-z])/i, // to normalize get/setStyle
    ROOT_TAG: /^body|html$/i, // body for quirks mode, html for standards,
    OP_SCROLL:/^(?:inline|table-row)$/i
};
var slice = [].slice;

var hyphenToCamel = function(property) {
    if ( !patterns.HYPHEN.test(property) ) {
        return property; // no hyphens
    }

    if (propertyCache[property]) { // already converted
        return propertyCache[property];
    }

    var converted = property;

    while( patterns.HYPHEN.exec(converted) ) {
        converted = converted.replace(RegExp.$1,
                RegExp.$1.substr(1).toUpperCase());
    }

    propertyCache[property] = converted;
    return converted;
    //return property.replace(/-([a-z])/gi, function(m0, m1) {return m1.toUpperCase()}) // cant use function as 2nd arg yet due to safari bug
};

var Dom = {
    _firstChild: function(node) {
        return Y.Selector.query('> *', node, true);
    },

    get: function(el) {
        if (el) {
            if (el.nodeType || el.item) { // Node, or NodeList
                return el;
            }

            if (typeof el === 'string') { // id
                return document.getElementById(el);
            }

            if ('length' in el) { // array-like
                var c = [];
                for (var i = 0, len = el.length; i < len; ++i) {
                    c[c.length] = Dom.get(el[i]);
                }

                return c;
            }

            return el; // some other object, just pass it back
        }

        return null;
    },

    isAncestor: function(haystack, needle) {
        return YUI.DOM.contains(Dom.get(haystack), Dom.get(needle));
    },

    inDocument: function(el) {
        return Dom.isAncestor(Y.config.doc.documentElement, el);
    },

    batch: function(el, method, o, override, args) {
        el = (el && (el.tagName || el.item)) ? el : Dom.get(el); // skip get() when possible

        if (!el || !method) {
            return false;
        }
        if (args) {
            args = Y.Array(args);
        }
        var scope = (override) ? o : window;

        var apply = function(el) {
            if (args) {
                var tmp = slice.call(args);
                tmp.unshift(el);
                return method.apply(scope, tmp);
            } else {
                return method.call(scope, el, o);
            }
        };

        if (el.tagName || el.length === undefined) { // element or not array-like
            return apply(el);
        }

        var collection = [];

        for (var i = 0, len = el.length; i < len; ++i) {
            collection[collection.length] = apply(el[i]);
        }

        return collection;
    },

    // 2.x returns false if already present
    _addClass: function(el, className) {
        if ( YUI.DOM.hasClass(el, className) ) {
            return false;
        }

        YUI.DOM.addClass(el, className);
        return true;
    },

    // 2.x returns false if not present
    _removeClass: function(el, className) {
        if ( !YUI.DOM.hasClass(el, className) ) {
            return false;
        }

        YUI.DOM.removeClass(el, className);
        return true;
    },

    // 2.x returns false if no newClass or same as oldClass
    _replaceClass: function(el, oldClass, newClass) {
        if (!newClass || oldClass === newClass) {
            return false;
        }

        YUI.DOM.replaceClass(el, oldClass, newClass);
        return true;
    },

    getElementsByClassName: function(className, tag, root) {
        tag = tag || '*';
        root = (root) ? Dom.get(root) : Y.config.doc;
        var nodes = [];
        if (root) {
            nodes = Y.Selector.query(tag + '.' + className, root);
        }
        return nodes;
    },

    getElementsBy: function(method, tag, root) {
        tag = tag || '*';
        root = (root) ? Dom.get(root) : null || document;


        var nodes = Y.Selector.query(tag, root);
        return nodes;
    },

    getViewportWidth: YUI.DOM.winWidth,
    getViewportHeight: YUI.DOM.winHeight,
    getDocumentWidth: YUI.DOM.docWidth,
    getDocumentHeight: YUI.DOM.docHeight,
    getDocumentScrollTop: YUI.DOM.docScrollY,
    getDocumentScrollLeft: YUI.DOM.docScrollX,

    _guid: function(el, prefix) {
        prefix = prefix || 'yui-gen';
        Dom._id_counter = Dom._id_counter || 0;

        if (el && el.id) { // do not override existing ID
            return el.id;
        }

        var id = prefix + Dom._id_counter++;

        if (el) {
            el.id = id;
        }

        return id;
    },

    _region: function(el) {
        if ( (el.parentNode === null || el.offsetParent === null ||
                YUI.DOM.getStyle(el, 'display') == 'none') && el != el.ownerDocument.body) {
            return false;
        }

        return YUI.DOM.region(el);

    },

    _ancestorByClass: function(element, className) {
        return YUI.DOM.ancestor(element, function(el) {
            return YUI.DOM.hasClass(el, className);
        });
    },

    _ancestorByTag: function(element, tag) {
        tag = tag.toUpperCase();
        return YUI.DOM.ancestor(element, function(el) {
            return el.tagName.toUpperCase() === tag;
        });
    }
};


var wrap = function(fn, name) {
    Dom[name] = function() {
        var args = slice.call(arguments);
        args[0] = Dom.get(args[0]);
        return fn.apply(Dom, args);
    };
};

var wrapped = {
    getAncestorBy: YUI.DOM.ancestor,
    getAncestorByClassName: Dom._ancestorByClass,
    getAncestorByTagName: Dom._ancestorByTag,
    getPreviousSiblingBy: YUI.DOM.previous,
    getPreviousSibling: YUI.DOM.previous,
    getNextSiblingBy: YUI.DOM.next,
    getNextSibling: YUI.DOM.next,
    getFirstChildBy: Dom._firstChild,
    getFirstChild: Dom._firstChild,
    getLastChildBy: YUI.DOM.lastChild,
    getLastChild: YUI.DOM.lastChild,
    getChildrenBy: YUI.DOM.children,
    getChildren: YUI.DOM.children,
    insertBefore: function(newNode, refNode) {
        YUI.DOM.insertBefore(Dom.get(newNode), Dom.get(refNode));
    },
    insertAfter: function(newNode, refNode) {
        YUI.DOM.insertAfter(Dom.get(newNode), Dom.get(refNode));
    }
};

Y.each(wrapped, wrap);

var batched = {
    getStyle: YUI.DOM.getStyle,
    setStyle: YUI.DOM.setStyle,
    getXY: YUI.DOM.getXY,
    setXY: YUI.DOM.setXY,
    getX: YUI.DOM.getX,
    getY: YUI.DOM.getY,
    setX: YUI.DOM.setX,
    setY: YUI.DOM.setY,
    getRegion: Dom._region,
    hasClass: YUI.DOM.hasClass,
    addClass: Dom._addClass,
    removeClass: Dom._removeClass,
    replaceClass: Dom._replaceClass,
    generateId: Dom._guid
};

Y.each(batched, function(v, n) {
    Dom[n] = function(el) {
        var args = slice.call(arguments, 1);
        return Dom.batch(el, v, null, null, args);
    };
});

Y.util.Dom = Dom;

YAHOO.util.Region = function(t, r, b, l) {
    this.top = t;
    this[1] = t;
    this.right = r;
    this.bottom = b;
    this.left = l;
    this[0] = l;
};

YAHOO.util.Region.prototype.contains = function(region) {
    return ( region.left   >= this.left   &&
             region.right  <= this.right  &&
             region.top    >= this.top    &&
             region.bottom <= this.bottom    );

};

YAHOO.util.Region.prototype.getArea = function() {
    return ( (this.bottom - this.top) * (this.right - this.left) );
};

YAHOO.util.Region.prototype.intersect = function(region) {
    var t = Math.max( this.top,    region.top    );
    var r = Math.min( this.right,  region.right  );
    var b = Math.min( this.bottom, region.bottom );
    var l = Math.max( this.left,   region.left   );

    if (b >= t && r >= l) {
        return new YAHOO.util.Region(t, r, b, l);
    } else {
        return null;
    }
};

YAHOO.util.Region.prototype.union = function(region) {
    var t = Math.min( this.top,    region.top    );
    var r = Math.max( this.right,  region.right  );
    var b = Math.max( this.bottom, region.bottom );
    var l = Math.min( this.left,   region.left   );

    return new YAHOO.util.Region(t, r, b, l);
};

YAHOO.util.Region.prototype.toString = function() {
    return ( "Region {"    +
             "top: "       + this.top    +
             ", right: "   + this.right  +
             ", bottom: "  + this.bottom +
             ", left: "    + this.left   +
             "}" );
};

YAHOO.util.Region.getRegion = function(el) {
    return YUI.DOM.region(el);
};

YAHOO.util.Point = function(x, y) {
   if (YAHOO.lang.isArray(x)) { // accept input from Dom.getXY, Event.getXY, etc.
      y = x[1]; // dont blow away x yet
      x = x[0];
   }

    this.x = this.right = this.left = this[0] = x;
    this.y = this.top = this.bottom = this[1] = y;
};

YAHOO.util.Point.prototype = new YAHOO.util.Region();

YAHOO.register("dom", YAHOO.util.Dom, {version: "@VERSION@", build: "@BUILD@"});



}, '@VERSION@' ,{requires:['dom','dom-style-ie','event-base','dump','substitute']});
YUI._setup(); YUI.use('compat');
