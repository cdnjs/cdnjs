YUI.add('node-base', function(Y) {

/**
 * The Node Utility provides a DOM-like interface for interacting with DOM nodes.
 * @module node
 * @submodule node-base
 */    

/**
 * The NodeList class provides a wrapper for manipulating DOM NodeLists.
 * NodeList properties can be accessed via the set/get methods.
 * Use Y.get() to retrieve NodeList instances.
 *
 * <strong>NOTE:</strong> NodeList properties are accessed using
 * the <code>set</code> and <code>get</code> methods.
 *
 * @class NodeList
 * @constructor
 */

// "globals"
var g_nodes = {},
    g_restrict = {},
    g_slice = Array.prototype.slice,

    DOT = '.',
    NODE_NAME = 'nodeName',
    NODE_TYPE = 'nodeType',
    OWNER_DOCUMENT = 'ownerDocument',
    TAG_NAME = 'tagName',
    UID = '_yuid',

    SuperConstr = Y.Base,
    SuperConstrProto = Y.Base.prototype,

    Node = function(config) {
        this[UID] = Y.stamp(config.node);
        g_nodes[this[UID]] = config.node;
        Node._instances[this[UID]] = this;

        if (config.restricted) {
            g_restrict[this[UID]] = true; 
        }

        SuperConstr.apply(this, arguments);
    },

    // used with previous/next/ancestor tests
    _wrapFn = function(fn) {
        var ret = null;
        if (fn) {
            ret = (typeof fn === 'string') ?
            function(n) {
                return Y.Selector.test(n, fn);
            } : 
            function(n) {
                return fn(Node.get(n));
            };
        }

        return ret;
    };
// end "globals"

Node.NAME = 'Node';

Node.DOM_EVENTS = {
    'click': true,
    'dblclick': true,
    'keydown': true,
    'keypress': true,
    'keyup': true,
    'mousedown': true,
    'mousemove': true,
    'mouseout': true, 
    'mouseover': true, 
    'mouseup': true,
    'focus': true,
    'blur': true,
    'submit': true,
    'change': true,
    'error': true,
    'load': true,
    'mouseenter': true,
    'mouseleave': true
};

Node._instances = {};

/**
 * Retrieves the DOM node bound to a Node instance
 * @method getDOMNode
 * @static
 *
 * @param {Y.Node || HTMLNode} node The Node instance or an HTMLNode
 * @return {HTMLNode} The DOM node bound to the Node instance.  If a DOM node is passed
 * as the node argument, it is simply returned.
 */
Node.getDOMNode = function(node) {
    if (node) {
        if (node instanceof Node) {
            node = g_nodes[node[UID]];
        } else if (!node[NODE_NAME] || Y.DOM.isWindow(node)) { // must already be a DOMNode 
            node = null;
        }
    }
    return node || null;
};
 
Node.scrubVal = function(val, node, depth) {
    var isWindow = false;
    if (node && val) { // only truthy values are risky
        if (typeof val === 'object' || typeof val === 'function') { // safari nodeList === function
            if (NODE_TYPE in val || Y.DOM.isWindow(val)) {// node || window
                if (g_restrict[node[UID]] && !node.contains(val)) {
                    val = null; // not allowed to go outside of root node
                } else {
                    val = Node.get(val);
                }
            } else if (val.item || // dom collection or Node instance // TODO: check each node for restrict? block ancestor?
                    (val[0] && val[0][NODE_TYPE])) { // array of DOM Nodes
                val = Y.all(val);
            } else {
                depth = (depth === undefined) ? 4 : depth;
                if (depth > 0) {
                    for (var i in val) { // TODO: test this and pull hasOwnProperty check if safe?
                        if (val.hasOwnProperty && val.hasOwnProperty(i)) {
                            val[i] = Node.scrubVal(val[i], node, --depth);
                        }
                    }
                }
            }
        }
    } else if (val === undefined) {
        val = node; // for chaining
    }

    return val;
};

Node.addMethod = function(name, fn, context) {
    if (name && fn && typeof fn === 'function') {
        Node.prototype[name] = function() {
            context = context || this;
            var args = g_slice.call(arguments),
                ret;

            if (args[0] && args[0] instanceof Node) {
                args[0] = Node.getDOMNode(args[0]);
            }
            args.unshift(g_nodes[this[UID]]);
            ret = Node.scrubVal(fn.apply(context, args), this);
            return ret;
        };
    } else {
        Y.log('unable to add method: ' + name, 'warn', 'Node');
    }
};

Node.importMethod = function(host, name, altName) {
    if (typeof name === 'string') {
        altName = altName || name;
        Node.addMethod(altName, host[name], host);
    } else {
        Y.each(name, function(n) {
            Node.importMethod(host, n);
        });
    }
};

Node.get = function(node, doc, restrict) {
    var instance = null;

    if (typeof node === 'string') {
        if (node.indexOf('doc') === 0) { // doc OR document
            node = Y.config.doc;
        } else if (node.indexOf('win') === 0) { // doc OR document
            node = Y.config.win;
        } else {
            node = Y.Selector.query(node, doc, true);
        }
    }

    if (node) {
        instance = Node._instances[node[UID]]; // reuse exising instances
        if (!instance) {
            instance = new Node({
                node: node,
                restricted: restrict
            });
        } else if (restrict) {
            g_restrict[instance[UID]] = true;
            instance._set('restricted', true);
        }
    }
    // TODO: restrict on subsequent call?
    return instance;
};

Node.create = function() {
    return Node.get(Y.DOM.create.apply(Y.DOM, arguments));
};

Node.ATTRS = {
    text: {
        getter: function() {
            return Y.DOM.getText(g_nodes[this[UID]]);
        },

        readOnly: true
    },

    'options': {
        getter: function() {
            return this.getElementsByTagName('option');
        }
    },

    /**
     * Returns a NodeList instance. 
     * @property children
     * @type NodeList
     */
    'children': {
        getter: function() {
            var node = g_nodes[this[UID]],
                children = node.children,
                childNodes, i, len;

            if (children === undefined) {
                childNodes = node.childNodes;
                children = [];

                for (i = 0, len = childNodes.length; i < len; ++i) {
                    if (childNodes[i][TAG_NAME]) {
                        children[children.length] = childNodes[i];
                    }
                }
            }
            return Y.all(children);
        }
    },

    restricted: {
        writeOnce: true,
        value: false
    }
};

// call with instance context
Node.DEFAULT_SETTER = function(name, val) {
    var node = g_nodes[this[UID]],
        strPath;

    if (name.indexOf(DOT) !== -1) {
        strPath = name;
        name = name.split(DOT);
        Y.Object.setValue(node, name, val);
    } else {
        node[name] = val;    
    }

    return this;
};

// call with instance context
Node.DEFAULT_GETTER = function(name) {
    var node = g_nodes[this[UID]],
        val;

    if (name.indexOf && name.indexOf(DOT) > -1) {
        val = Y.Object.getValue(node, name.split(DOT));
    } else {
        val = node[name];
    }

    return val ? Y.Node.scrubVal(val, this) : val;
};

Y.extend(Node, Y.Base);

Y.mix(Node.prototype, {
    toString: function() {
        var str = '',
            errorMsg = this[UID] + ': not bound to a node',
            node = g_nodes[this[UID]];

        if (node) {
            str += node[NODE_NAME];
            if (node.id) {
                str += '#' + node.id; 
            }

            if (node.className) {
                str += '.' + node.className.replace(' ', '.'); 
            }

            // TODO: add yuid?
            str += ' ' + this[UID];
        }
        return str || errorMsg;
    },

    _addDOMAttr: function(attr) {
        var domNode = g_nodes[this[UID]];

        if (domNode && domNode[attr] !== undefined) {
            this.addAttr(attr, {
                getter: function() {
                    return Node.DEFAULT_GETTER.call(this, attr);
                },

                setter: function(val) {
                    return Node.DEFAULT_SETTER.call(this, attr, val);
                }
            });
        } else {
            Y.log('unable to add DOM attribute: ' + attr + ' to node: ' + this, 'warn', 'Node');
        }
    },

    on: function(type, fn, context, arg) {
        var args;
            ret = null;

        if (Node.DOM_EVENTS[type]) {
            args = g_slice.call(arguments, 0),
            args.splice(2, 0, g_nodes[this[UID]]);
            ret = Y.Event.attach.apply(Y.Event, args);
        } else {
            ret = SuperConstrProto.on.apply(this, arguments);
        }
        return ret;
    },

   /**
     * Detaches a DOM event handler. 
     * @method detach
     * @param {String} type The type of DOM Event
     * @param {Function} fn The handler to call when the event fires 
     */
    detach: function(type, fn) {
        var args, ret = null;
        if (Node.DOM_EVENTS[type]) {
            args = g_slice.call(arguments, 0);
            args.splice(2, 0, g_nodes[this[UID]]);

            ret = Y.Event.detach.apply(Y.Event, args);
        } else {
            ret = SuperConstrProto.detach.apply(this, arguments);
        }
        return ret;
    },

    get: function(attr) {
        if (!this.attrAdded(attr)) {
            if (attr.indexOf(DOT) < 0) { // handling chained properties at Node level
                this._addDOMAttr(attr);
            } else {
                return Node.DEFAULT_GETTER.apply(this, arguments);
            }
        }

        return SuperConstrProto.get.apply(this, arguments);
    },

    set: function(attr, val) {
        if (!this.attrAdded(attr)) {
            if (attr.indexOf(DOT) < 0) { // handling chained properties at Node level
                this._addDOMAttr(attr);
            } else { // handle chained properties TODO: can Attribute do this? Not sure we want events
                return Node.DEFAULT_SETTER.call(this, attr, val);
            }
        }

        return SuperConstrProto.set.apply(this, arguments);
    },

    create: Node.create,

    /**
     * Compares nodes to determine if they match.
     * Node instances can be compared to each other and/or HTMLElements.
     * @method compareTo
     * @param {HTMLElement | Node} refNode The reference node to compare to the node.
     * @return {Boolean} True if the nodes match, false if they do not. 
     */
    compareTo: function(refNode) {
        var node = g_nodes[this[UID]];
        if (refNode instanceof Y.Node) { 
            refNode = Y.Node.getDOMNode(refNode);
        }
        return node === refNode;
    },

    /**
     * Determines whether the node is appended to the document.
     * @method inDoc
     * @param {Node|HTMLElement} doc optional An optional document to check against.
     * Defaults to current document. 
     * @return {Boolean} Whether or not this node is appended to the document. 
     */
    inDoc: function(doc) {
        var node = g_nodes[this[UID]];
        doc = (doc) ? Node.getDOMNode(doc) : node[OWNER_DOCUMENT];
        if (doc.documentElement) {
            return Y.DOM.contains(doc.documentElement, node);
        }
    },

    getById: function(id) {
        var node = g_nodes[this[UID]],
            ret = Y.DOM.byId(id, node[OWNER_DOCUMENT]);
        if (ret && Y.DOM.contains(node, ret)) {
            ret = Y.get(ret);
        } else {
            ret = null;
        }
        return ret;
    },

   /**
     * Returns the nearest ancestor that passes the test applied by supplied boolean method.
     * @method ancestor
     * @param {String | Function} fn A selector or boolean method for testing elements.
     * If a function is used, it receives the current node being tested as the only argument.
     * @return {Node} The matching Node instance or null if not found
     */
    ancestor: function(fn) {
        return Node.get(Y.DOM.elementByAxis(g_nodes[this[UID]], 'parentNode', _wrapFn(fn)));
    },

    /**
     * Returns the previous matching sibling. 
     * Returns the nearest element node sibling if no method provided.
     * @method previous
     * @param {String | Function} fn A selector or boolean method for testing elements.
     * If a function is used, it receives the current node being tested as the only argument.
     * @param {Boolean} all optional Whether all node types should be returned, or just element nodes.
     * @return {Node} Node instance or null if not found
     */
    previous: function(fn, all) {
        return Node.get(Y.DOM.elementByAxis(g_nodes[this[UID]], 'previousSibling', _wrapFn(fn), all));
    }, 

    /**
     * Returns the next matching sibling. 
     * Returns the nearest element node sibling if no method provided.
     * @method next
     * @param {String | Function} fn A selector or boolean method for testing elements.
     * If a function is used, it receives the current node being tested as the only argument.
     * @param {Boolean} all optional Whether all node types should be returned, or just element nodes.
     * @return {Node} Node instance or null if not found
     */
    next: function(node, fn, all) {
        return Node.get(Y.DOM.elementByAxis(g_nodes[this[UID]], 'nextSibling', _wrapFn(fn), all));
    },
        
    /**
     * Retrieves a Node instance of nodes based on the given CSS selector. 
     * @method query
     *
     * @param {string} selector The CSS selector to test against.
     * @return {Node} A Node instance for the matching HTMLElement.
     */
    query: function(selector) {
        return Y.get(Y.Selector.query(selector, g_nodes[this[UID]], true));
    },

    /**
     * Retrieves a nodeList based on the given CSS selector. 
     * @method queryAll
     *
     * @param {string} selector The CSS selector to test against.
     * @return {NodeList} A NodeList instance for the matching HTMLCollection/Array.
     */
    queryAll: function(selector) {
        return Y.all(Y.Selector.query(selector, g_nodes[this[UID]]));
    },

    // TODO: allow fn test
    /**
     * Test if the supplied node matches the supplied selector.
     * @method test
     *
     * @param {string} selector The CSS selector to test against.
     * @return {boolean} Whether or not the node matches the selector.
     */
    test: function(selector) {
        return Y.Selector.test(g_nodes[this[UID]], selector);
    },

    remove: function() {
        g_nodes[this[UID]].parentNode.removeChild();
        return this;
    },

    // TODO: safe enough? 
    invoke: function(method, a, b, c, d, e) {
        var node = g_nodes[this[UID]],
            ret;

        if (a && a instanceof Y.Node) { // first 2 may be Node instances
            a = Node.getDOMNode(a);
        }

        if (b && b instanceof Y.Node) { // first 2 may be Node instances
            b = Node.getDOMNode(b);
        }

        ret = node[method](a, b, c, d, e);    
        return Y.Node.scrubVal(ret, this);
    },

    destructor: function() {
        g_nodes[this[UID]] = [];
        delete Node._instances[this[UID]];
    },

    /**
     * Applies the given function to each Node in the NodeList.
     * @method each
     * @deprecated Use NodeList
     * @param {Function} fn The function to apply 
     * @param {Object} context optional An optional context to apply the function with
     * Default context is the NodeList instance
     * @return {NodeList} NodeList containing the updated collection 
     * @chainable
     */
    each: function(fn, context) {
        context = context || this;
        Y.log('each is deprecated on Node', 'warn', 'Node');
        return fn.call(context, this);
    },

    /**
     * Retrieves the Node instance at the given index. 
     * @method item
     * @deprecated Use NodeList
     *
     * @param {Number} index The index of the target Node.
     * @return {Node} The Node instance at the given index.
     */
    item: function(index) {
        Y.log('item is deprecated on Node', 'warn', 'Node');
        return this;
    },

    /**
     * Returns the current number of items in the Node.
     * @method size
     * @deprecated Use NodeList
     * @return {Int} The number of items in the Node. 
     */

    size: function() {
        Y.log('size is deprecated on Node', 'warn', 'Node');
        return g_nodes[this[UID]] ? 1 : 0;
    },

    addEventListener: function() {
        var args = g_slice.call(arguments);
        args.unshift(g_nodes[this[UID]]);
        return Y.Event.nativeAdd.apply(Y.Event, args);
    },
    
    removeEventListener: function() {
        var args = g_slice.call(arguments);
        args.unshift(g_nodes[this[UID]]);
        return Y.Event.nativeRemove.apply(Y.Event, arguments);
    },

    // TODO: need this?  check for fn; document this
    hasMethod: function(method) {
        var node = g_nodes[this[UID]];
        return (node && (typeof node === 'function'));
    }
}, true);

Y.Node = Node;
Y.get = Y.Node.get;
    /**
     * The NodeList Utility provides a DOM-like interface for interacting with DOM nodes.
     * @module node
     * @submodule node-list
     */    

    /**
     * The NodeList class provides a wrapper for manipulating DOM NodeLists.
     * NodeList properties can be accessed via the set/get methods.
     * Use Y.get() to retrieve NodeList instances.
     *
     * <strong>NOTE:</strong> NodeList properties are accessed using
     * the <code>set</code> and <code>get</code> methods.
     *
     * @class NodeList
     * @constructor
     */

Y.Array._diff = function(a, b) {
    var removed = [],
        present = false,
        i, j, lenA, lenB;

    outer:
    for (i = 0, lenA = a.length; i < lenA; i++) {
        present = false;
        for (j = 0, lenB = b.length; j < lenB; j++) {
            if (a[i] === b[j]) {
                present = true;
                continue outer;
            }
        }
        if (!present) {
            removed[removed.length] = a[i];
        }
    }
    return removed;
};

Y.Array.diff = function(a, b) {
    return {
        added: Y.Array._diff(b, a),
        removed: Y.Array._diff(a, b)
    }; 
};

// "globals"
var g_nodelists = {},
    g_slice = Array.prototype.slice,

    UID = '_yuid',

    NodeList = function(config) {
        var doc = config.doc || Y.config.doc,
            nodes = config.nodes || [];

        if (typeof nodes === 'string') {
            this._query = nodes;
            nodes = Y.Selector.query(nodes, doc);
        }

        Y.stamp(this);
        NodeList._instances[this[UID]] = this;
        g_nodelists[this[UID]] = nodes;

        if (config.restricted) {
            g_restrict = this[UID];
        }
        NodeList.superclass.constructor.apply(this, arguments);
    };
// end "globals"

NodeList.NAME = 'NodeList';

/**
 * Retrieves the DOM nodes bound to a NodeList instance
 * @method getDOMNodes
 * @static
 *
 * @param {Y.NodeList} node The NodeList instance
 * @return {Array} The array of DOM nodes bound to the NodeList
 */
NodeList.getDOMNodes = function(nodeList) {
    return g_nodelists[nodeList[UID]];
};

NodeList._instances = [];

NodeList.each = function(instance, fn, context) {
    var nodes = g_nodelists[instance[UID]];
    if (nodes && nodes.length) {
        Y.Array.each(nodes, fn, context || instance);
    } else {
        Y.log('no nodes bound to ' + this, 'warn', 'NodeList');
    }
};

NodeList.addMethod = function(name, fn, context) {
    var tmp = NodeList._getTempNode();
    if (name && fn) {
        NodeList.prototype[name] = function() {
            var ret = [],
                args = arguments;

            NodeList.each(this, function(node) {
                var instance = Y.Node._instances[node[UID]],
                    ctx,
                    result;

                if (!instance) {
                    g_nodes[tmp[UID]] = node;
                    instance = tmp;
                }
                ctx = context || instance;
                result = fn.apply(ctx, args);
                if (result !== undefined && result !== instance) {
                    ret[ret.length] = result;
                }
            });

            // TODO: remove tmp pointer
            return ret.length ? ret : this;
        };
    } else {
        Y.log('unable to add method: ' + name, 'warn', 'Node');
    }
};

NodeList.importMethod = function(host, name, altName) {
    if (typeof name === 'string') {
        altName = altName || name;
        NodeList.addMethod(name, host[name]);
    } else {
        Y.each(name, function(n) {
            NodeList.importMethod(host, n);
        });
    }
};

NodeList._getTempNode = function() {
    var tmp = NodeList._tempNode;
        if (!tmp) {
            tmp = Y.Node.create('<div></div>');
            NodeList._tempNode = tmp;
        }
    return tmp;
};

// call with instance context
NodeList.DEFAULT_SETTER = function(attr, val) {
    var tmp = NodeList._getTempNode();
    NodeList.each(this, function(node) {
        var instance = Y.Node._instances[node[UID]];
        if (!instance) {
            g_nodes[tmp[UID]] = node;
            instance = tmp;
        }
        instance.set(attr, val);
    });
};

// call with instance context
NodeList.DEFAULT_GETTER = function(attr) {
    var tmp = NodeList._getTempNode(),
        ret = [];

    NodeList.each(this, function(node) {
        var instance = Y.Node._instances[node[UID]];
        if (!instance) { // reuse tmp instance
            g_nodes[tmp[UID]] = node;
            instance = tmp;
        }
        ret[ret.length] = instance.get(attr);
    });

    return ret;
};

Y.extend(NodeList, Y.Base);

Y.mix(NodeList.prototype, {
    /**
     * Retrieves the Node instance at the given index. 
     * @method item
     *
     * @param {Number} index The index of the target Node.
     * @return {Node} The Node instance at the given index.
     */
    item: function(index) {
        return Y.get((g_nodelists[this[UID]] || [])[index]);
    },

    /**
     * Applies the given function to each Node in the NodeList.
     * @method each
     * @param {Function} fn The function to apply 
     * @param {Object} context optional An optional context to apply the function with
     * Default context is the NodeList instance
     * @return {NodeList} NodeList containing the updated collection 
     * @chainable
     */
    each: function(fn, context) {
        var instance = this;
        context = context || this;
        Y.Array.each(g_nodelists[this[UID]], function(node, index) {
            return fn.call(context, Y.get(node), index, instance);
        });
        return instance;
    },

    /**
     * Filters the NodeList instance down to only nodes matching the given selector.
     * @method filter
     * @param {String} selector The selector to filter against
     * @return {NodeList} NodeList containing the updated collection 
     * @see Selector
     */
    filter: function(selector) {
        return Node.scrubVal(Y.Selector.filter(g_nodelists[this[UID]], selector), this);
    },

    get: function(attr) {
        if (!this.attrAdded(attr) && (!this._conf.data.getter || !this._conf.data.getter[attr])) {
        //if (!this.attrAdded(attr)) {
            //this._addAttr(attr);
            return NodeList.DEFAULT_GETTER.call(this, attr);
            //return NodeList.DEFAULT_GETTER.call(this, attr);
        }

        return NodeList.superclass.constructor.prototype.get.apply(this, arguments);
    },

    set: function(attr, val) {
        if (!this.attrAdded(attr)) {
            this._addAttr(attr);
        }

        return NodeList.superclass.constructor.prototype.set.apply(this, arguments);
    },

    on: function(type, fn, context, arg) {
        var args = g_slice.call(arguments, 0);

        args.splice(2, 0, g_nodelists[this[UID]]);
        if (Node.DOM_EVENTS[type]) {
            Y.Event.attach.apply(Y.Event, args);
        }

        return NodeList.superclass.constructor.prototype.on.apply(this, arguments);
    },

    destructor: function() {
        g_nodelists[this[UID]] = [];
        delete NodeList._instances[this[UID]];
    },

    plug: function() {
        var args = arguments;
        this.each(function(node) {
            node.plug.apply(node, args);
        });
        return this;
    },

    unplug: function() {
        var args = arguments;
        this.each(function(node) {
            node.unplug.apply(node, args);
        });
        return this;
    },

    refresh: function() {
        var doc,
            diff,
            oldList = g_nodelists[this[UID]];
        if (this._query) {
            if (g_nodelists[this[UID]] &&
                    g_nodelists[this[UID]][0] && 
                    g_nodelists[this[UID]][0].ownerDocument) {
                doc = g_nodelists[this[UID]][0].ownerDocument;
            }

            g_nodelists[this[UID]] = Y.Selector.query(this._query, doc || Y.config.doc);        
            diff = Y.Array.diff(oldList, g_nodelists[this[UID]]); 
            diff.added = diff.added ? Y.all(diff.added) : null;
            diff.removed = diff.removed ? Y.all(diff.removed) : null;
            this.fire('refresh', diff);
        }
        return this;
    },

    /**
     * Returns the current number of items in the NodeList.
     * @method size
     * @return {Int} The number of items in the NodeList. 
     */
    size: function() {
        return g_nodelists[this[UID]].length;
    },

    toString: function() {
        var str = '',
            errorMsg = this[UID] + ': not bound to any nodes',
            nodes = g_nodelists[this[UID]],
            node;

        if (nodes && nodes[0]) {
            node = nodes[0];
            str += node[NODE_NAME];
            if (node.id) {
                str += '#' + node.id; 
            }

            if (node.className) {
                str += '.' + node.className.replace(' ', '.'); 
            }

            if (nodes.length > 1) {
                str += '...[' + nodes.length + ' items]';
            }
        }
        return str || errorMsg;
    },

    _addAttr: function(attr) {
        this.addAttr(attr.split(DOT)[0], {
            getter: function() {
                return NodeList.DEFAULT_GETTER.call(this, attr);
            },

            setter: function(val) {
                NodeList.DEFAULT_SETTER.call(this, attr, val);
            }
        });
    }
}, true);

NodeList.importMethod(Y.Node.prototype, [
    'addEventListener',
    'removeEventListener',
    'remove'
]);

Y.NodeList = NodeList;
Y.all = function(nodes, doc, restrict) {
    // TODO: propagate restricted to nodes?
    var nodeList = new NodeList({
        nodes: nodes,
        doc: doc,
        restricted: restrict
    });

    // zero-length result returns null
    return nodeList;
};
Y.Node.all = Y.all; // TODO: deprecated
var UID = '_yuid';

Y.Array.each([
    /**
     * Passes through to DOM method.
     * @method replaceChild
     * @param {HTMLElement | Node} node Node to be inserted 
     * @param {HTMLElement | Node} refNode Node to be replaced 
     * @return {Node} The replaced node 
     */
    'replaceChild',

    /**
     * Passes through to DOM method.
     * @method appendChild
     * @param {HTMLElement | Node} node Node to be appended 
     * @return {Node} The appended node 
     */
    'appendChild',

    /**
     * Passes through to DOM method.
     * @method insertBefore
     * @param {HTMLElement | Node} newNode Node to be appended 
     * @param {HTMLElement | Node} refNode Node to be inserted before 
     * @return {Node} The inserted node 
     */
    'insertBefore',

    /**
     * Passes through to DOM method.
     * @method removeChild
     * @param {HTMLElement | Node} node Node to be removed 
     * @return {Node} The removed node 
     */
    'removeChild',

    /**
     * Passes through to DOM method.
     * @method hasChildNodes
     * @return {Boolean} Whether or not the node has any childNodes 
     */
    'hasChildNodes',

    /**
     * Passes through to DOM method.
     * @method cloneNode
     * @param {HTMLElement | Node} node Node to be cloned 
     * @return {Node} The clone 
     */
    'cloneNode',

    /**
     * Passes through to DOM method.
     * @method hasAttribute
     * @param {String} attribute The attribute to test for 
     * @return {Boolean} Whether or not the attribute is present 
     */
    'hasAttribute',

    /**
     * Passes through to DOM method.
     * @method removeAttribute
     * @param {String} attribute The attribute to be removed 
     * @chainable
     */
    'removeAttribute',

    /**
     * Passes through to DOM method.
     * @method scrollIntoView
     * @chainable
     */
    'scrollIntoView',

    /**
     * Passes through to DOM method.
     * @method getElementsByTagName
     * @param {String} tagName The tagName to collect 
     * @return {NodeList} A NodeList representing the HTMLCollection
     */
    'getElementsByTagName',

    /**
     * Passes through to DOM method.
     * @method focus
     * @chainable
     */
    'focus',

    /**
     * Passes through to DOM method.
     * @method blur
     * @chainable
     */
    'blur',

    /**
     * Passes through to DOM method.
     * Only valid on FORM elements
     * @method submit
     * @chainable
     */
    'submit',

    /**
     * Passes through to DOM method.
     * Only valid on FORM elements
     * @method reset
     * @chainable
     */
    'reset',

    /**
     * Passes through to DOM method.
     * @method select
     * @chainable
     */
     'select'
], function(method) {
    Y.Node.prototype[method] = function(arg1, arg2, arg3) {
        var ret = this.invoke(method, arg1, arg2, arg3);
        return ret;
    };
});

Node.importMethod(Y.DOM, [
    /**
     * Determines whether the ndoe is an ancestor of another HTML element in the DOM hierarchy.
     * @method contains
     * @chainable
     * @param {Node | HTMLElement} needle The possible node or descendent
     * @return {Boolean} Whether or not this node is the needle its ancestor
     */
    'contains',
    /**
     * Normalizes troublesome attributes 
     * @chainable
     * @method setAttribute
     * @param {string} name The attribute name 
     * @param {string} value The value to set
     */
    'setAttribute',
    /**
     * Normalizes troublesome attributes 
     * @chainable
     * @method getAttribute
     * @param {string} name The attribute name 
     * @return {string} The attribute value 
     */
    'getAttribute',

    'insertHTML'
]);

if (!document.documentElement.hasAttribute) { // IE < 8
    Y.Node.prototype.hasAttribute = function(attr) {
        return this.getAttribute(attr) !== '';
    };
}

Y.NodeList.importMethod(Y.Node.prototype, ['getAttribute', 'setAttribute', 'insertHTML']);

(function() { // IE clones expandos; regenerate UID
    var node = document.createElement('div');
    Y.stamp(node);
    if (node[UID] === node.cloneNode(true)[UID]) {
        Y.Node.prototype.cloneNode = function(deep) {
            var node = Y.Node.getDOMNode(this).cloneNode(deep);
            node[UID] = Y.guid();
            return Y.get(node);
        };
    }
})();
/**
 * Extended Node interface for managing classNames.
 * @module node
 * @submodule node
 * @for Node
 */

    var methods = [
        /**
         * Determines whether the node has the given className.
         * @method hasClass
         * @param {String} className the class name to search for
         * @return {Boolean} Whether or not the node has the given class. 
         */
        'hasClass',

        /**
         * Adds a class name to the node.
         * @method addClass         
         * @param {String} className the class name to add to the node's class attribute
         * @chainable
         */
        'addClass',

        /**
         * Removes a class name from the node.
         * @method removeClass         
         * @param {String} className the class name to remove from the node's class attribute
         * @chainable
         */
        'removeClass',

        /**
         * Replace a class with another class.
         * If no oldClassName is present, the newClassName is simply added.
         * @method replaceClass  
         * @param {String} oldClassName the class name to be replaced
         * @param {String} newClassName the class name that will be replacing the old class name
         * @chainable
         */
        'replaceClass',

        /**
         * If the className exists on the node it is removed, if it doesn't exist it is added.
         * @method toggleClass  
         * @param {String} className the class name to be toggled
         * @chainable
         */
        'toggleClass'
    ];

    Y.Node.importMethod(Y.DOM, methods);
    Y.NodeList.importMethod(Y.Node.prototype, methods);


}, '@VERSION@' ,{requires:['dom-base', 'base', 'selector']});
