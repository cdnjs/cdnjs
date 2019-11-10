/*! HTML - v0.10.2 - 2013-08-25
* http://nbubna.github.io/HTML/
* Copyright (c) 2013 ESHA Research; Licensed MIT, GPL */
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
