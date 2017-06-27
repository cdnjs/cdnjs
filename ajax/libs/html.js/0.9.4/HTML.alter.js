/*! HTML - v0.9.3 - 2013-08-15
* http://nbubna.github.io/HTML/
* Copyright (c) 2013 ESHA Research; Licensed MIT, GPL */
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

})(document, document.documentElement._);