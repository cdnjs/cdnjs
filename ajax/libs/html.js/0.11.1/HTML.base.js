/*! HTML - v0.11.1 - 2014-04-05
* http://nbubna.github.io/HTML/
* Copyright (c) 2014 ESHA Research; Licensed MIT, GPL */
(function(window, document, Observer) {
    "use strict";

    var _ = {
        version: "0.11.1",
        slice: Array.prototype.slice,
        list: function(list, force) {
            if (list.length === 1){ return _.node(list[0], force); }
            if (force || !list.each) {
                if (!list.slice){ list = _.slice.call(list); }
                _.methods(list);
                if (list.length){ _.children(list[0], list); }// proxy dot-traversal into first element
            }
            return list;
        },
        node: function(node, force) {
            if (force || !node.each) {
                _.methods(node);
                _.children(node);
            }
            return node;
        },
        methods: function(o) {
            for (var method in _.fn) {
                _.define(o, method, _.fn[method]);
            }
        },
        children: function(node, list) {
            var children = node._children = {};
            for (var i=0, m=node.childNodes.length; i<m; i++) {
                var child = node.childNodes[i],
                    key = _.key(child);
                (children[key]||(children[key]=[])).push(child);
                _.define(node, key);
                if (list){ _.define(list, key, undefined, node); }
            }
            return children;
        },
        key: function(node) {
            return node.tagName ? node.tagName.toLowerCase() : '_other';
        },
        define: function(o, key, val, node) {
            if (!(key in o)) { try {// never redefine, never fail
                node = node || o;// children needn't belong to define's target
                Object.defineProperty(o, key,
                    val !== undefined ? { value: val } :
                    {
                        get: function() {
                            if (!node._children){ _.children(node); }
                            return _.list(node._children[key]||[]);
                        }
                    }
                );
            } catch (e) {} }
        },
        mutation: function(e) {
            var node = e.target;// only wipe cache for 3rd party changes
            delete node[node._internal ? '_internal' : '_children'];
        },
        unique: function(node, i, arr){ return arr.indexOf(node) === i; },
        fn: {
            each: function(fn) {
                var self = this.forEach ? this : [this],
                    results = [],
                    prop, args;
                if (typeof fn === "string") {
                    prop = _.resolve[fn] || fn;// e.g. _.resolve['+class'] = 'classList.add';
                    args = _.slice.call(arguments, 1);
                    fn = function(el, i){ return _.resolve(prop, el, args, i); };
                }
                for (var i=0,m=self.length, result; i<m; i++) {
                    result = fn.call(self, _.node(self[i]), i, self);
                    if (result || (prop && result !== undefined)) {
                        if (result.forEach) {
                            results.push.apply(results, result);
                        } else {
                            results.push(result);
                        }
                    }
                }
                return !results[0] && results[0] !== false ? this :
                    results[0].matches ? _.list(results.filter(_.unique)) :
                    //self.length === 1 ? results[0] :
                    results;
            },
            find: function() {
                try{ window.console.warn('find() is deprecated. Please use query().'); }
                finally{ return this.query.apply(this, arguments); }
            },
            query: function(selector, count) {
                var self = this.forEach ? this : [this];
                for (var list=[], i=0, m=self.length; i<m && (!count || list.length < count); i++) {
                    if (count === list.length + 1) {
                        var node = self[i].querySelector(selector);
                        if (node){ list.push(node); }
                    } else {
                        var nodes = self[i].querySelectorAll(selector);
                        for (var j=0, l=nodes.length; j<l && (!count || list.length < count); j++) {
                            list.push(nodes[j]);
                        }
                    }
                }
                return _.list(list);
            },
            only: function(b, e) {
                var self = this.forEach ? this : [this];
                return _.list(
                    b >= 0 || b < 0 ?
                        self.slice(b, e || (b + 1) || undefined) :
                        self.filter(
                            typeof b === "function" ? b :
                            function(el){ return el.matches(b); }
                        )
                );
            }
        },
        resolve: function(_key, _el, args, i) {
            var key = _key, el = _el;// copy prefixed originals so we can recover them if need be
            args = args.length ? _.fill(args, i, el) : null;
            if (key.indexOf('.') > 0) {
                var keys = key.split('.');
                while (keys.length > 1 && (el = el[key = keys.shift()])){}
                // if lookup failed, reset to originals
                el = el || _el;
                key = el ? keys[0] : _key;
            }
            var val = el[key];
            if (val !== undefined) {
                if (typeof val === "function") { return val.apply(el, args); }
                else if (args) { el[key] = args[0]; }
                else { return val; }
            }
            else if (args) {
                if (args[0] === null){ _el.removeAttribute(_key); }
                else { _el.setAttribute(_key, args[0]); }
            } else { return _el.getAttribute(_key); }
        },
        fill: function(args, index, el) {
            var ret = [];
            for (var i=0,m=args.length; i<m; i++) {
                var arg = args[i],
                    type = typeof arg;
                ret[i] = type === "string" ? arg.replace(/\$\{i\}/g, index) :
                         type === "function" ? arg(el, index, args) :
                         arg;
            }
            return ret;
        }
    };

    var HTML = _.node(document.documentElement);// early availability
    HTML._ = _;
    _.define(HTML, 'ify', function(o, force) {
        return !o || 'length' in o ? _.list(o||[], force) : _.node(o, force);
    });
    // ensure element.matches(selector) availability
    var Ep = Element.prototype,
        aS = 'atchesSelector';
    _.define(Ep, 'matches', Ep['m'] || Ep['webkitM'+aS] || Ep['mozM'+aS] || Ep['msM'+aS]);
    // watch for changes in children
    if (Observer) {
        new Observer(function(list){ list.forEach(_.mutation); })
            .observe(HTML, { childList: true, subtree: true });
    } else {
        document.addEventListener("DOMSubtreeModified", _.mutation);
    }
    // export 
    if (typeof define === 'function' && define.amd) {
        define(function(){ return HTML; });
    } else if (typeof module !== 'undefined' && module.exports) {
        module.exports = HTML;
    } else {
        window[HTML.getAttribute('data-html-reference')||'HTML'] = HTML;
    }
    // eventual consistency
    document.addEventListener("DOMContentLoaded", function(){ _.node(HTML, true); });

})(window, document, window.MutationObserver);

(function(document, _) {
    "use strict";

    var add = _.fn.add = function(arg, ref) {
        return this.each(function(node) {
            return add.all(node, arg, ref);
        });
    };
    add.all = function(node, arg, ref) {
        if (typeof arg === "string") {// turn arg into an appendable
            return add.create(node, arg, ref);
        }
        if ('length' in arg) {// array of append-ables
            var ret = [];
            for (var i=0,m=arg.length; i<m; i++) {
                ret.push(add.all(node, arg[i], ref));
            }
            return ret;
        }
        add.insert(node, arg, ref);// arg is an append-able
        return arg;
    };
    add.create = function(node, tag, ref) {
        return add.insert(node, document.createElement(tag), ref);
    };
    add.insert = function(node, child, ref) {
        var sibling = add.find(node, ref);
        if (sibling) {
            node.insertBefore(child, sibling);
        } else {
            node.appendChild(child);
        }
        _.updated(node);
        return child;
    };
    add.find = function(node, ref) {
        switch (typeof ref) {
            case "string": return node[ref+'Child'];
            case "number": return node.children[ref];
            case "object": return ref;
            case "function": return ref.call(node, node);
        }
    };

    _.updated = function(node) {
        node._internal = true;
        _.children(node);
    };

    _.fn.remove = function(chain) {
        return this.each(function(node) {
            var parent = node.parentNode;
            if (parent) {
                parent.removeChild(node);
                _.updated(parent);
                if (chain){ return parent; }
            }
        });
    };

})(document, document.documentElement._);

(function(document, HTML) {
    "use strict";

    var _ = HTML._,
    event = _.fn.event = function() {
        var args = _.slice.call(arguments),
            self = this,
            action,
            ret = [];
        if (!args[0]) {// first is falsy
            action = 'off';
            args.shift();
            if (typeof args[1] === "function"){ args.splice(1, 0, false); }// selector omitted
        } else if (!args[1] || args[1].forEach) {// second is absent or data
            action = 'trigger';
        } else {
            action = 'on';
            if (args[0] === 1){ args[4] = args.shift(); }// first is _once
            if (!args[2] || args[2].forEach) {// selector omitted
                args.splice(1, 0, false);
                args.splice(4, 1);// put _once back as fifth arg
            }
            args[3] = (args[3]||[]).slice(0);// don't let listener data change
            if (typeof args[2] === "string") {// third is _prop for each
                args[5] = args[2];
                args[3].unshift(args[2]);// _prop becomes first item in data
                args[2] = _.fn.each;// and is replace by each()
            }
        }
        (args[0]||'').split(' ').forEach(function(type) {
            args[0] = type;
            self.each(function(node) {
                ret.push(event[action].apply(node, args));
            });
        });
        return action === 'trigger' ? ret.length === 1 ? ret[0] : ret : this;
    },
    concat = Array.prototype.concat;

    event.on = function(type, selector, fn, data, _once, _prop) {
        var listener = function(e) {
            event.heard.call(this, e, selector, fn, data, _once, _prop);
        };
        this.addEventListener(type, listener);
        _.define(this, '_evt', []);
        this._evt.push([type, selector, _prop||fn, listener]);
    };
    event.off = function(type, selector, fn) {
        if (this._evt) {
            for (var i=0; i<this._evt.length; i++) {
                var evt = this._evt[i];
                if ((!type || evt[0] === type) &&
                    (!selector || evt[1] === selector) &&
                    (!fn || evt[2] === fn)) {
                    this.removeEventListener(evt[0], evt[3]);
                    this._evt.splice(i--, 1);
                }
            }
        } else {
            this.removeEventListener(type, fn);
        }
    };
    event.trigger = function(type, data) {
        var e = document.createEvent('HTMLEvents');
        e.initEvent(type, true, true);
        if (data){ e.data = data; }
        this.dispatchEvent(e);
        return e;
    };

    event.heard = function(e, selector, fn, data, _once, _prop) {
        var self = selector ? event.closest.call(e, selector) : this;
        if (self) {
            var args = [e];
            if (e.data){ args.push(e.data); }
            if (data){ args.unshift(data); }
            _.node(e.target);
            _.define(e, 'closest', event.closest);
            if (_once){ event.off.call(this, e.type, selector, _prop || fn); }
            fn.apply(self, concat.apply([], args));
        }
    };
    event.closest = function(selector) {
        var el = this.target;
        while (el && el.matches) {
            if (el.matches(selector)) {
                return _.node(el);
            }
            el = el.parentNode;
        }
    };

})(document, document.documentElement);
