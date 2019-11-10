/*! HTML - v0.9.2 - 2013-07-29
* http://nbubna.github.io/HTML/
* Copyright (c) 2013 ESHA Research; Licensed MIT, GPL */
(function(window, document, Observer) {
    "use strict";

    var _ = {
        version: "0.9.2",
        slice: Array.prototype.slice,
        list: function(list) {
            if (list.length === 1){ return _.node(list[0]); }
            if (!list.each) {
                if (!list.slice){ list = _.slice.call(list); }
                _.methods(list);
                //TODO: children traversal into first child of list
            }
            return list;
        },
        node: function(node) {
            if (!node.each) {
                _.methods(node);
                _.children(node);
            }
            return node;
        },
        methods: function(o) {
            for (var method in _.fn) {
                o[method] = _.fn[method].bind(o);
            }
        },
        children: function(node) {
            var children = node._children = {};
            for (var i=0, m=node.childNodes.length; i<m; i++) {
                var child = node.childNodes[i],
                    key = _.key(child);
                (children[key]||(children[key]=[])).push(child);
                if (!(key in node)){ _.define(node, key); }
            }
            return children;
        },
        key: function(node) {
            return node.tagName ? node.tagName.toLowerCase() : '_other';
        },
        define: function(node, key) {
            try {
                Object.defineProperty(node, key, {
                    get: function() {
                        if (!node._children){ _.children(node); }
                        return _.list(node._children[key]||[]);
                    }
                });
            } catch (e) {}
        },
        mutation: function(e) {
            var node = e.target;// only wipe cache for 3rd party changes
            delete node[node._internal ? '_internal' : '_children'];
        },
        fn: {
            each: function(fn) {
                var self = this.forEach ? this : [this],
                    fields;
                if (typeof fn === "string") {
                    fields = [];
                    fn = _.field.apply(self, arguments);
                }
                self.forEach(function(el, i, arr) {
                    var ret = fn.call(self, _.node(el), i, arr);
                    if (fields && ret !== undefined) {
                        fields.push(ret);
                    }
                });
                return fields && fields.length ? fields : this;
            },
            find: function(selector) {
                var self = this.forEach ? this : [this];
                for (var list=[],i=0,m=self.length; i<m; i++) {
                    list = list.concat(_.slice.call(self[i].querySelectorAll(selector)));
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
                            function(el){ return el[_.matches](b); }
                        )
                );
            }
        },
        field: function(key) {
            var args = _.slice.call(arguments, 1);
            key = _.field[key] || key;// e.g. _.fn.each['+class'] = 'classList.add';
            return function(el, i){ return _.resolve(key, el, args, i); };
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
            else if (args) { el.setAttribute(_key, args[0]); }
            else { return el.getAttribute(_key); }
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
    HTML.ify = function(o) {
        return !o || 'length' in o ? _.list(o||[]) : _.node(o);
    };
    ['webkitM','mozM','msM','m'].forEach(function(prefix) {
        if (HTML[prefix+'atchesSelector']) {
            _.matches = prefix+'atchesSelector';
        }
    });
    if (Observer) {
        new Observer(function(list){ list.forEach(_.mutation); })
            .observe(HTML, { childList: true, subtree: true });
    } else {
        document.addEventListener("DOMSubtreeModified", _.mutation);
    }
    if (typeof define === 'function' && define.amd) {
        define(function(){ return HTML; });
    } else if (typeof module !== 'undefined' && module.exports) {
        module.exports = HTML;
    } else {
        window.HTML = HTML;
    }
    // eventual consistency
    document.addEventListener("DOMContentLoaded", function(){ _.children(HTML); });

})(window, document, window.MutationObserver);

(function(document, _) {
    "use strict";

    var add = _.fn.add = function(arg, ref) {
        var list = [];
        this.each(function(node) {
            list = list.concat(add.all(node, arg, ref));
        });
        return _.list(list);
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

    _.fn.remove = function(noDeadEnd) {
        var parents = [];
        this.each(function(node) {
            var parent = node.parentNode;
            if (noDeadEnd && parents.indexOf(parent) < 0) {
                parents.push(parent);
            }
            parent.removeChild(node);
            _.updated(parent);
        });
        return noDeadEnd ? _.list(parents) : this;
    };

})(document, HTML._);