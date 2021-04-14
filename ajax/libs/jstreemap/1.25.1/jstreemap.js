(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * @private
 */
const RED = 1;
/**
 * @private
 */
const BLACK = 2;

/**
 * @private
 * A node for a red-black tree
 */
class TreeNode {

    /**
     * Default constructor
     */
    constructor() {
        /** left child */
        this.left = null;
        /** right child */
        this.right = null;
        /** parent node */
        this.parent = null;
        /** key object (additional 'value' data member is added in map-like classes) */
        this.key = null;
        /** by default new node is red */
        this.color = RED;
    }

    /**
     * @returns parent of parent
     */
    grandparent() {
        let p = this.parent;
        if (p === null) {
            return null;
        } // No parent means no grandparent
        return p.parent;
    }

    /**
     * @returns the other child of the same parent
     */
    sibling() {
        let p = this.parent;
        if (p === null) {
            return null;
        } // No parent means no sibling
        if (this === p.left) {
            return p.right;
        }
        else {
            return p.left;
        }
    }

    /**
     * @returns another child of the grandparent
     */
    uncle() {
        let p = this.parent;
        if (p === null) {
            return null;
        } // No parent means no uncle
        let g = p.parent;
        if (g === null) {
            return null;
        } // No grandparent means no uncle
        return p.sibling();
    }
}

module.exports = {
    TreeNode: TreeNode,
    BLACK: BLACK,
    RED: RED
};

/***/ }),
/* 1 */
/***/ (function(module, exports) {

/**
 * Used by sets
 * @private
 */
class KeyOnlyPolicy {
    /**
     * Returns key data from the specified node
     * @param {*} n
     */
    fetch(n) {
        return n.key;
    }

    /**
     * Copies key data from one node to another
     * @param {*} dst
     * @param {*} src
     */
    copy(dst, src) {
        dst.key = src.key;
    }

    /**
     * @returns string representation of the key
     * @param {*} node
     */
    toString(node) {
        return String(node.key);
    }
}

/**
 * Used by maps
 * @private
 */
class KeyValuePolicy {
    /**
     * Returns key-value data from the specified node
     * @param {*} n
     */
    fetch(n) {
        return [n.key, n.value];
    }

    /**
     * Copies key-value data from one node to another
     * @param {*} dst
     * @param {*} src
     */
    copy(dst, src) {
        dst.key = src.key;
        dst.value = src.value;
    }

    /**
     * @returns string representation of key-value pair
     * @param {*} node
     */
    toString(node) {
        return String(node.key) + ':' + String(node.value);
    }
}

/**
 * Used for iteration through values of a map
 * @private
 */
class ValueOnlyPolicy {
    /**
     * Returns data from the specified node
     * @param {*} n
     */
    fetch(n) {
        return n.value;
    }

    /**
     * Copies value data from one node to another
     * @param {*} dst
     * @param {*} src
     */
    copy(dst, src) {
        dst.value = src.value;
    }

    /**
     * @returns string representation of node's value
     * @param {*} node
     */
    toString(node) {
        return String(node.value);
    }
}

module.exports = {
    KeyOnlyPolicy: KeyOnlyPolicy,
    ValueOnlyPolicy: ValueOnlyPolicy,
    KeyValuePolicy: KeyValuePolicy
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/** @ignore */
const {TreeNode, RED, BLACK} = __webpack_require__(0);
/** @ignore */
const {JsIterator, JsReverseIterator} = __webpack_require__(3);
/** @ignore */
const {Iterator, ReverseIterator} = __webpack_require__(4);
/** @ignore */
const {KeyOnlyPolicy, ValueOnlyPolicy, KeyValuePolicy} = __webpack_require__(1);
/** @ignore */
const {InsertionResult} = __webpack_require__(8);

/** insertion mode of a multimap, nodes with the same keys can be added */
const INSERT_MULTI = 1;
/** if a node with the same key already exists then the subsequent attempts are ignored */
const INSERT_UNIQUE = 2;
/** if a node with the same key already exists then it's value is replaced on subsequent attempts */
const INSERT_REPLACE = 3;

/**
 * @private
 * Special node in a tree is created for performance reasons
 */
class Head {
    /** default constructor */
    constructor() {
        /** node with the smallest key */
        this.leftmost = this;
        /** node with the largest key */
        this.rightmost = this;
        /** root node of the tree */
        this.root = this;
        /** number of nodes in the tree */
        this.size = 0;
        /** extra tag used in debuggin of unit tests */
        this.id = 'HEAD';
    }
}

/**
 * @private
 * 3-way comparison, similar to strcmp and memcp in C programming language
 * @returns +1 if the value of rhs is greater than lhs
 *          -1 if the value of rhs is less than lhs
 *           0 if values are the same
 */
function compare(lhs, rhs) {
    if (lhs < rhs) {
        return -1;
    }
    else if (lhs === rhs) {
        return 0;
    }
    else {
        return 1;
    }
}

/**
 * Red-black tree
 * @access private
 */
class Tree {
    /** default constructor of an empty tree */
    constructor() {
        /** head */
        this.head = new Head();
        /** 3-way comparison function */
        this.compare = compare;
        /** must be an instance of KeyOnlyPolicy for sets, or KeyValuePolicy for maps */
        this.valuePolicy = new KeyOnlyPolicy();
    }

    /**
     * Deletes all nodes in the tree
     */
    clear() {
        this.head = new Head();
    }

    /**
     * @returns number of nodes in the tree
     */
    size() {
        return this.head.size;
    }

    /**
     * @private
     * A wrapper that calls 3-way comparison of node keys
     * @param {*} lhs
     * @param {*} rhs
     */
    compareNodes(lhs, rhs) {
        return this.compare(lhs.key, rhs.key);
    }

    /**
     * @private
     * used by rotation operations
     */
    replaceNode(oldNode, newNode) {
        if (oldNode === newNode) {
            return;
        }
        if (oldNode.parent === null) {
            this.head.root = newNode;
        }
        else {
            if (oldNode === oldNode.parent.left) {
                oldNode.parent.left = newNode;
            }
            else {
                oldNode.parent.right = newNode;
            }
        }

        if (!this.isLeaf(newNode)) {
            newNode.parent = oldNode.parent;
        }
    }

    /**
     * Rebalances tree as described below

              X                                           Y
             / \                                         / \
            Y   c         right rotate -->              a   X
           / \            <--  left rotate                 / \
          a   b                                           b   c
     * @private
     */
    rotateLeft(node) {
        let right = node.right;
        if (this.isLeaf(right)) {
            throw new Error('rotateLeft can\'t be performed. The tree is corrupted');
        }
        this.replaceNode(node, right);

        node.right = right.left;
        if (right.left !== null) {
            right.left.parent = node;
        }

        right.left = node;
        node.parent = right;
    }

    /**
     * Rebalances tree as described in rotateLeft
     * @param {*} node - parent node
     */
    rotateRight(node) {
        let left = node.left;
        if (this.isLeaf(left)) {
            throw new Error('rotateRight can\'t be performed. The tree is corrupted');
        }
        this.replaceNode(node, left);

        node.left = left.right;
        if (left.right !== null) {
            left.right.parent = node;
        }

        left.right = node;
        node.parent = left;
    }

    /**
     * @returns true - for null pointers and head node; false - for all other nodes
     * @param {*} node
     */
    isLeaf(node) {
        if (node === null || node === this.head) {
            return true;
        }
        return false;
    }

    /**
     * Leaf nodes are considered 'black'. All real nodes contain 'color' data member
     * @param {*} node
     */
    fetchColor(node) {
        if (this.isLeaf(node)) {
            return BLACK;
        }
        else {
            return node.color;
        }
    }

    /**
     * Tests a node for 'blackness'.
     * @param {*} node
     */
    isBlack(node) {
        return (this.fetchColor(node) === BLACK);
    }

    /**
     * Tests node for 'redness'.
     * @param {*} node
     */
    isRed(node) {
        return (this.fetchColor(node) === RED);
    }

    /* ===========================
       INSERT
       =========================== */
    /**
     * A node will be inserted into the tree even if nodes with the same key already exist
     * @param {*} node
     * @returns {InsertionResult} - indicates whether a node was added and provides iterator to it.
     */
    insertMulti(node) {
        return this.insertNode(node, INSERT_MULTI);
    }

    /**
     * The node is inserted into the tree only if nodes with the same key do not exist there
     * @param {*} node
     * @returns {InsertionResult} - indicates whether a node was added and provides iterator to it.
     */
    insertUnique(node) {
        return this.insertNode(node, INSERT_UNIQUE);
    }

    /**
     * The node is inserted. If a node with the same key exists it's value will be replaced by the value of the new node
     * @param {*} node
     * @returns {InsertionResult} - indicates whether a node was added and provides iterator to it.
     */
    insertOrReplace(node) {
        return this.insertNode(node, INSERT_REPLACE);
    }

    /**
     * @private
     * Inserts node. Updates head node. Rebalances tree.
     * @param {*} n - node
     * @param {*} mode - one of INSERT_MULTI, INSERT_UNIQUE, INSERT_REPLACE
     * @returns {InsertionResult} - indicates whether a node was added and provides iterator to it.
     */
    insertNode(n, mode = INSERT_MULTI) {
        let res = this.insertNodeInternal(this.head.root, n, mode);
        if (res.wasAdded) {
            if (this.head.size === 0) {
                this.head.root = n;
                this.head.leftmost = n;
                this.head.rightmost = n;

                n.left = this.head;
                n.right = this.head;
            }
            else if (this.head.leftmost.left === n) {
                this.head.leftmost = n;
                n.left = this.head;
            }
            else if (this.head.rightmost.right === n) {
                this.head.rightmost = n;
                n.right = this.head;
            }
            this.insertRepairTree(n);
            this.head.size = this.head.size + 1;
        }
        return res;
    }

    /**
     * @private
     * Inserts node according to the mode
     * @param {*} root - root node of the tree
     * @param {*} n - node to be inserted
     * @param {*} mode - one of INSERT_MULTI, INSERT_UNIQUE, INSERT_REPLACE
     * @returns {InsertionResult} - indicates whether a node was added and provides iterator to it.
     */
    insertNodeInternal(root, n, mode) {
        // recursively descend the tree until a leaf is found
        let x = root;
        let y = null;
        let rc = -1;
        // find matching node
        while (!this.isLeaf(x)) {
            y = x;
            rc = this.compareNodes(n, y);
            if (rc < 0) {
                x = y.left;
            }
            else if (rc > 0) {
                x = y.right;
            }
            else {
                // node with the same key value
                switch (mode) {
                    case INSERT_UNIQUE:
                        // it's a duplicate
                        return new InsertionResult(false, false, undefined);
                    case INSERT_REPLACE:
                        this.valuePolicy.copy(y, n);
                        return new InsertionResult(false, true, new Iterator(y, this));
                    default:
                        // INSERT_MULTI
                        x = y.right;
                }
            }
        }
        if (this.isLeaf(y)) {
            n.parent = null;
            n.left = this.head;
            n.right = this.head;
        }
        else {
            n.parent = y;
            if (rc < 0) {
                y.left = n;
            }
            else {
                y.right = n;
            }
        }
        return new InsertionResult(true, false, new Iterator(n, this));
    }

    /**
     * @private
     * The method is decribed at: https://en.wikipedia.org/wiki/Red%E2%80%93black_tree#Insertion
     * @param {*} n - node
     */
    insertRepairTree(n) {
        if (n.parent === null) {
            this.repairCase1(n);
        }
        else if (this.isBlack(n.parent)) {
        /* insert_case2(n);
           // do nothing */
        }
        else if (this.isRed(n.uncle())) {
            this.repairCase3(n);
        }
        else {
            this.repairCase4(n);
        }
    }

    /**
     * @private
     * The method is decribed at: https://en.wikipedia.org/wiki/Red%E2%80%93black_tree#Insertion
     * @param {*} n - node
     */
    repairCase1(n) {
        n.color = BLACK;
    }

    /**
     * @private
     * The method is decribed at: https://en.wikipedia.org/wiki/Red%E2%80%93black_tree#Insertion
     * @param {*} n - node
     */
    repairCase3(n) {
        n.parent.color = BLACK;
        n.uncle().color = BLACK;
        n.grandparent().color = RED;
        this.insertRepairTree(n.grandparent());
    }

    /**
     * @private
     * The method is decribed at: https://en.wikipedia.org/wiki/Red%E2%80%93black_tree#Insertion
     * @param {*} n - node
     */
    repairCase4(n) {
        let p = n.parent;
        let g = n.grandparent();

        let nr = null;
        if ((g.left !== null)
            && (n === g.left.right)) {
            this.rotateLeft(p);
            n = n.left;
        }
        else if ((g.right !== null)
            && (n === g.right.left)) {
            this.rotateRight(p);
            n = n.right;
        }

        p = n.parent;
        g = n.grandparent();
        if (n === p.left) {
            this.rotateRight(g);
        }
        else {
            this.rotateLeft(g);
        }

        p.color = BLACK;
        g.color = RED;
    }

    /**
     * @returns the node with the highest key for the subtree of the specified root node
     * @param {*} node - root node of the subtree to be evaluated
     */
    fetchMaximum(node) {
        while (!this.isLeaf(node.right)) {
            node = node.right;
        }

        return node;
    }

    /**
     * @returns the node with the lowest key for the subtree of the specified root node
     * @param {*} node - root node of the subtree to be evaluated
     */
    fetchMinimum(node) {
        while (!this.isLeaf(node.left)) {
            node = node.left;
        }

        return node;
    }

    /* ===========================
       ERASE
       =========================== */
    /**
     * Removes node from the tree
     * @param {*} node
     */
    erase(node) {
        if (this.isLeaf(node)) {
            return;
        }

        this.eraseInternal(node);
        let h = this.head;
        h.size = h.size - 1;
    }

    /**
     * @private
     * The method is decribed at: https://en.wikipedia.org/wiki/Red%E2%80%93black_tree#Removal
     * @param {*} node - node
     */
    eraseInternal(node) {
        if (!this.isLeaf(node.left)
            && !this.isLeaf(node.right)) {
            let pred = this.fetchMaximum(node.left);

            this.valuePolicy.copy(node, pred);
            node = pred;
        }

        let child = (this.isLeaf(node.right)) ? node.left : node.right;

        if (this.isBlack(node)) {
            this.eraseCase1(node);
        }
        this.replaceNode(node, child);
        if (this.head.size === 2) {
            if (!this.isLeaf(child)) {
                // Root node must be BLACK
                child.color = BLACK;
            }
        }

        let h = this.head;
        if (this.isLeaf(child)) {
            /* The node didn't have children and it was removed
               the head needs to update leftmost, rightmost pointers */
            if (h.leftmost === node) {
                let p = node.parent;
                if (p !== null) {
                    h.leftmost = p;
                    p.left = h;
                }
                else {
                    h.leftmost = h;
                }
            }
            if (h.rightmost === node) {
                let p = node.parent;
                if (p !== null) {
                    h.rightmost = p;
                    p.right = h;
                }
                else {
                    h.rightmost = h;
                }
            }
        }
        else {
            // the node had a child. Now node is removed. Any references should point to the child now
            if (h.leftmost === node) {
                h.leftmost = child;
                child.left = h;
            }
            if (h.rightmost === node) {
                h.rightmost = child;
                child.right = h;
            }
        }
    }

    /**
     * @private
     * The method is decribed at: https://en.wikipedia.org/wiki/Red%E2%80%93black_tree#Removal
     * @param {*} node
     */
    eraseCase1(node) {
        if (node.parent === null) {
            return;
        }
        else {
            this.eraseCase2(node);
        }
    }

    /**
     * @private
     * The method is decribed at: https://en.wikipedia.org/wiki/Red%E2%80%93black_tree#Removal
     * @param {*} node
     */
    eraseCase2(node) {
        let s = node.sibling();

        if (this.isRed(s)) {
            node.parent.color = RED;
            s.color = BLACK;

            if (node === node.parent.left) {
                this.rotateLeft(node.parent);
            }
            else {
                this.rotateRight(node.parent);
            }
        }
        this.eraseCase3(node);
    }

    /**
     * @private
     * The method is decribed at: https://en.wikipedia.org/wiki/Red%E2%80%93black_tree#Removal
     * @param {*} node
     */
    eraseCase3(node) {
        let s = node.sibling();
        let p = node.parent;
        if (this.isBlack(p)
            && this.isBlack(s)
            && this.isBlack(s.left)
            && this.isBlack(s.right)) {

            s.color = RED;
            this.eraseCase1(p);
        }
        else {
            this.eraseCase4(node);
        }
    }

    /**
     * @private
     * The method is decribed at: https://en.wikipedia.org/wiki/Red%E2%80%93black_tree#Removal
     * @param {*} node
     */
    eraseCase4(node) {
        let s = node.sibling();
        let p = node.parent;
        if (this.isRed(p)
            && this.isBlack(s)
            && this.isBlack(s.left)
            && this.isBlack(s.right)) {

            s.color = RED;
            p.color = BLACK;
        }
        else {
            this.eraseCase5(node);
        }
    }

    /**
     * @private
     * The method is decribed at: https://en.wikipedia.org/wiki/Red%E2%80%93black_tree#Removal
     * @param {*} node
     */
    eraseCase5(node) {
        let s = node.sibling();
        let p = node.parent;
        /* The check below is unnecessary
           due to case 2 (even though case 2 changed the sibling to a sibling's child,
           the sibling's child can't be red, since no red parent can have a red child). */
        /* if ((!this.isLeaf(s))
               && this.isBlack(s)) { */

        /* the following statements just force the red to be on the left of the left of the parent,
           or right of the right, so case six will rotate correctly. */
        if (node === p.left
            && this.isRed(s.left)
			&& this.isBlack(s.right)) {

            s.color = RED;
            s.left.color = BLACK;
            this.rotateRight(s);
        }
        else if (node === p.right
            && this.isBlack(s.left)
            && this.isRed(s.right)) {

            s.color = RED;
            s.right.color = BLACK;
            this.rotateLeft(s);
        }
        //}
        this.eraseCase6(node);
    }

    /**
     * @private
     * The method is decribed at: https://en.wikipedia.org/wiki/Red%E2%80%93black_tree#Removal
     * @param {*} node
     */
    eraseCase6(node) {
        let s = node.sibling();
        let p = node.parent;
        s.color = this.fetchColor(p);
        p.color = BLACK;

        if (node === p.left) {
            s.right.color = BLACK;
            this.rotateLeft(p);
        }
        else {
            s.left.color = BLACK;
            this.rotateRight(p);
        }
    }

    /* ===========================
       SEARCH BY KEY
       =========================== */
    /**
    * @returns an iterator pointin to a node with matching key value. If node is not found then end() iterator is returned.
    * @param {*} k - key value
    */
    find(k) {
        let y = this.head;
        let x = y.root;
        while (!this.isLeaf(x)) {
            let rc = this.compare(x.key, k);
            if (rc > 0) {
                y = x;
                x = x.left;
            }
            else if (rc < 0) {
                y = x;
                x = x.right;
            }
            else {
                return new Iterator(x, this);
            }
        }
        return new Iterator(this.head, this);
    }

    /**
     * @returns an iterator pointing to the first node in the tree that is not less than
     * (i.e. greater or equal to) the specified key value, or end() if no such node is found.
     * @param {*} k - key value
     */
    lowerBound(k) {
        let y = this.head;
        let x = y.root;
        while (!this.isLeaf(x)) {
            let rc = this.compare(x.key, k);
            if (rc >= 0) {
                y = x;
                x = x.left;
            }
            else {
                x = x.right;
            }
        }
        return new Iterator(y, this);
    }

    /**
     * @returns an iterator pointing to the first node in the tree that is greater than
     * the specified key value, or end() if no such node is found.
     * @param {*} k - key value
     */
    upperBound(k) {
        let y = this.head;
        let x = y.root;
        while (!this.isLeaf(x)) {
            let rc = this.compare(x.key, k);
            if (rc > 0) {
                y = x;
                x = x.left;
            }
            else {
                x = x.right;
            }
        }
        return new Iterator(y, this);
    }

    /* ===========================
       ITERATORS
       =========================== */

    /**
     * @returns iterator pointing to the node with the lowest key
     */
    begin() {
        return new Iterator(this.head.leftmost, this);
    }

    /**
     * @returns iterator pointing to the node following the node with the highest key
     */
    end() {
        return new Iterator(this.head, this);
    }

    /**
     * @returns iterator pointing to the node with the highest key
     */
    rbegin() {
        return new ReverseIterator(this.head.rightmost, this);
    }

    /**
     * @returns iterator pointing to the node preceding the node with the lowest key
     */
    rend() {
        return new ReverseIterator(this.head, this);
    }

    /**
     * @private
     * provides support for ES6 forward iteration
     */
    jsBegin() {
        return this.head.leftmost;
    }

    /**
     * @private
     * provides support for ES6 forward iteration
     */
    jsEnd() {
        return this.head;
    }

    /**
     * @private
     * provides support for ES6 reverse iteration
     */
    jsRbegin() {
        return this.head.rightmost;
    }

    /**
     * @private
     * provides support for ES6 forward iteration
     */
    jsRend() {
        return this.head;
    }

    /**
     * @returns node following the specified node in ascending order of their keys
     * @param {*} n - node
     */
    next(n) {
        if (n === this.head) {
            return this.head.leftmost;
        }
        if (n.right === this.head) {
            return this.head;
        }
        if (n.right !== null) {
            let res = this.fetchMinimum(n.right);
            return res;
        }
        else {
            while (n.parent.left !== n) {
                n = n.parent;
            }
            return n.parent;
        }
    }

    /**
     * @returns node preceding the specified node in ascending order of their keys
     * @param {*} n - node
     */
    prev(n) {
        if (n === this.head) {
            return this.head.rightmost;
        }
        if (n.left === this.head) {
            return this.head;
        }
        if (n.left !== null) {
            let res = this.fetchMaximum(n.left);
            return res;
        }
        else {
            while (n.parent.right !== n) {
                n = n.parent;
            }
            return n.parent;
        }
    }

    /**
     * ES6 forward iteration
     */
    [Symbol.iterator]() {
        return new JsIterator(this);
    }

    /**
     * ES6 reverse iteration
     */
    backward() {
        return new JsReverseIterator(this);
    }

    /**
     * @returns a new JsIterator object that contains the [key, value] pairs for each element in the order of the keys.
     */
    entries() {
        return new JsIterator(this);
    }

    /**
     * @returns a new JsIterator object that contains the keys for each element in the order of the keys.
     */
    keys() {
        return new JsIterator(this, new KeyOnlyPolicy());
    }

    /**
     * @returns a new JsIterator object that contains the values for each element in the order of the keys.
     */
    values() {
        return new JsIterator(this, new ValueOnlyPolicy());
    }

    /**
     * @returns first element of the container, or undefined if container is empty
     */
    first() {
        if (this.size() === 0) {
            return undefined;
        }
        else {
            let it = this.begin();
            return this.valuePolicy.fetch(it.node);
        }
    }

    /**
     * @returns last element of the container, or undefined if container is empty
     */
    last() {
        if (this.size() === 0) {
            return undefined;
        }
        else {
            let it = this.rbegin();
            return this.valuePolicy.fetch(it.node);
        }
    }

    /**
     * @returns String representation of the container
     */
    toString() {
        let parts = [];
        for (let it = this.begin(); !it.equals(this.end()); it.next()) {
            // convert each key-value pair
            parts.push(this.valuePolicy.toString(it.node));
        }
        return '{' + parts.join(',') + '}';
    }

    /**
     * @returns String tag of this class
     */
    get [Symbol.toStringTag]() {
        return 'Tree';
    }

    /**
     * @returns constructor object for this class
     */
    static get [Symbol.species]() {
        return Tree;
    }

}

module.exports = {
    Tree: Tree,
    compare: compare
};


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/* Containers are expected to support the following methods:
   jsBegin() - returns the very first node
   jsEnd() - returns the node beyond the last one
   next(node) - returns the next node
   prev(node) - returns the previous node
   valuePolicy - an instance of KeyOnlyPolicy, or KeyValuePolicy */
/**
  * ES6-style forward iterator.
  *
  * @example
  * let m = new TreeMap();
  * ...
  * for (let [key, value] of m) {
  *   console.log(`key: ${key}, value: ${value}`);
  * }
  * // iterate values
  * for (let value of m.values()) {
  *   console.log(`value: ${value}`);
  * }
  */
class JsIterator {
    /**
     * @param {*} container
     */
    constructor(container, valuePolicy = container.valuePolicy) {
        /**
         * @private
         * Internal reference to a container
         */
        this.container = container;
        /**
         * @private
         * valuePolicy implements what members of the node will be returned: key, value, or key and value
         */
        this.valuePolicy = valuePolicy;
        /**
         * @private
         * current node
         */
        this.node = container.jsBegin();
    }

    /**
     * As documented in ES6 iteration protocol. It can be used for manual iteration.
     * Iterators are documented here: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Iterators_and_Generators
     *
     * @example
     * let m = new TreeMap();
     * ...
     * let jsIt = m.entries();
     * while (true) {
     *   let res = it.next();
     *   if (res.done) {
     *     break;
     *   }
     *   console.log(`key: ${res.value[0]}, value: ${res.value[1]`});
     * }
     */
    next() {
        let res = {};
        res.done = (this.node === this.container.jsEnd());
        if (!res.done) {
            res.value = this.valuePolicy.fetch(this.node);
            this.node = this.container.next(this.node);
        }
        return res;
    }

    /**
     * Support for ES6 for-of loops.
     * @returns {JsIterator}
     */
    [Symbol.iterator]() {
        return this;
    }

    /**
     * A reverse iterator for the same container.
     * @returns {JsReverseIterator}
     * @example
     * let m = new TreeMap();
     * ...
     * // iterate all key-value pairs in reverse order
     * for (let [key, value] of m.backwards()) {
     *   console.log(`key: ${key}, value: ${value}`);
     * }
    */
    backwards() {
        // eslint-disable-next-line no-use-before-define
        return new JsReverseIterator(this.container, this.valuePolicy);
    }
}

/* Containers are expected to support the following methods:
   jsRbegin() - returns the very first node in reverse order (e.g. the very last node)
   jsrEnd() - returns the node beyond the last one in reverse order (e.g. the node before the first one)
   next(node) - returns the next node
   prev(node) - returns the previous node
   valuePolicy - an instance of KeyOnlyPolicy, or KeyValuePolicy */
/**
  * ES6-style backward iterator
  * @example
  * let m = new TreeMap();
  * ...
  * // iterate all key-value pairs in reverse order
  * for (let [key, value] of m.backwards()) {
  *   console.log(`key: ${key}, value: ${value}`);
  * }
  * // iterate keys in reverse order
  * for (let key of m.keys().backwards()) {
  *   console.log(`key: ${key}`);
  * }
 */
class JsReverseIterator {
    /**
     * @param {*} container
     */
    constructor(container, valuePolicy = container.valuePolicy) {
        /**
         * @private
         * Internal reference to a container
         */
        this.container = container;
        /**
         * @private
         * valuePolicy implements what members of the node will be returned: key, value, or key and value
         */
        this.valuePolicy = valuePolicy;
        /**
         * @private
         * current node
         */
        this.node = container.jsRbegin();
    }

    /**
     * As documented in ES6 iteration protocol. It can be used for manual iteration.
     * Iterators are documented here: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Iterators_and_Generators
     *
     * @example
     * let m = new TreeMap();
     * ...
     * let jsIt = m.entries().backwards();
     * while (true) {
     *   let res = it.next();
     *   if (res.done) {
     *     break;
     *   }
     *   console.log(`key: ${res.value[0]}, value: ${res.value[1]`});
     * }
     */
    next() {
        let res = {};
        res.done = (this.node === this.container.jsRend());
        if (!res.done) {
            res.value = this.valuePolicy.fetch(this.node);
            this.node = this.container.prev(this.node);
        }
        return res;
    }

    /**
     * Support for ES6 for-of loops.
     * @returns {JsReverseIterator}
     */
    [Symbol.iterator]() {
        return this;
    }

    /**
     * A forward iterator for the same container
     * @returns {JsIterator}
     * @example
     * let m = new TreeMap();
     * ...
     * // iterate all key-value pairs in direct order
     * for (let [key, value] of m.backwards().backwards()) {
     *   console.log(`key: ${key}, value: ${value}`);
     */
    backwards() {
        return new JsIterator(this.container, this.valuePolicy);
    }
}

module.exports = {
    JsIterator: JsIterator,
    JsReverseIterator: JsReverseIterator
};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * Base class for STL-like iterators. It references a node (or index) and a container.
 * Navigation is achieved by calling container's prev() and next() methods.
 */
class BaseIterator {
    /**
     * @param {*} node - current node
     * @param {*} container - container
     */
    constructor(node, container) {
        /**
         * @private
         * __n - internal node reference
         */
        this.__n = node;
        /**
         * @private
         * __c - internal container reference
         */
        this.__c = container;
    }

    /**
     * Two iterators are considered to be equal if they point to the same node of the same container
     * @param {BaseIterator} rhs - object on the 'right-hand side' of .eq. operator
     * @returns {boolean}
     */
    equals(rhs) {
        let lhsClass = this.constructor.name;
        let rhsClass = rhs.constructor.name;
        if (lhsClass !== rhsClass) {
            throw new Error(`Can't compare an instance of ${lhsClass} with an instance of ${rhsClass}`);
        }
        if (this.__c !== rhs.__c) {
            throw new Error('Iterators belong to different containers');
        }
        return this.__n === rhs.__n;
    }

    /**
     * @private
     * @returns current node
     */
    get node() {
        return this.__n;
    }

    /**
     * @private
     * @returns key of the current node
     */
    get key() {
        return this.__n.key;
    }

    /**
     * @private
     * @returns value of the current node
     */
    get value() {
        return this.__n.value;
    }

    /**
     * @private
     * @returns container that holds current node
     */
    get container() {
        return this.__c;
    }
}

/**
 * STL-like forward iterator. It's more verbose than ES6 iterators, but allows iteration over any part of the container
 *
 * @example
 * let m = new TreeMap();
 * ...
 * for (let it = m.begin(); !it.equals(m.end()); it.next()) {
 *   console.log(`key: ${it.key}, value: ${it.value}`);
 * }
 */
class Iterator extends BaseIterator {
    /**
     * There are 3 ways to construct an iterator:
     *
     * 1. Using a node and a container
     * 2. Copy constructor / clone
     * 3. Copy constructor / clone from ReverseIterator instance
     * @param {*} args
     *
     * @example
     * // Using a node and a container
     * let it = new Iterator(node, container);
     *
     * // Copy constructor / clone
     * let it1 = new Iterator(node, container);
     * let it2 = new Iterator(it1);
     *
     * // Copy constructor / clone from ReverseIterator instance
     * let it1 = new ReverseIterator(node, container);
     * let it2 = new Iterator(it1);
     */
    constructor(...args) {
        if (args.length === 2) {
            let [node, container] = args;
            super(node, container);
        }
        else if (args.length === 1) {
            let [obj] = args;
            let className = obj.constructor.name;
            if (className === Iterator.name) {
                super(obj.__n, obj.__c);
            }
            // eslint-disable-next-line no-use-before-define
            else if (className === ReverseIterator.name) {
                let c = obj.__c;
                super(c.next(obj.__n), c);
            }
            else {
                throw new Error(`Can't create an Iterator from ${className}`);
            }
        }
        else {
            throw new Error('Can\'t create an Iterator with provided parameters');
        }
    }

    /**
     * Replaces node reference with the reference of the next node in the container.
     * Can be used for manual iteration over a range of key-value pairs.
     * @example
     * let m = new TreeMap();
     * ... // add key-value pairs., using numbers as keys
     * let from = t.lowerBound(0);
     * let to = t.upperBound(50);
     * let it = from;
     * while (!it.equals(to)) {
     *   console.log(it.key);
     *   it.next();
     * }
     */
    next() {
        /**
         * __n and __c are defined in the base class
         */
        this.__n = this.__c.next(this.__n);
    }

    /**
     * Replaces node reference with the reference of the previous node in the container
     * Can be used for manual reverse iteration over a range of key-value pairs.
     * @example
     * let m = new TreeMap();
     * ... // add key-value pairs., using numbers as keys
     * let from = t.lowerBound(0);
     * let to = t.upperBound(50);
     * let it = to;
     * while (!it.equals(from)) {
     *   it.prev();
     *   console.log(it.key);
     * }
     */
    prev() {
        this.__n = this.__c.prev(this.__n);
    }
}

/**
 * STL-like backward iterator. Can be used to traverse container or a range in the reverse order.
 * It's more verbose than ES6 iterators, but allows iteration over any part of the container
 *
 * @example
 * let m = new TreeMap();
 * ...
 * for (let it = m.rbegin(); !it.equals(m.rend()); it.next()) {
 *   console.log(`key: ${it.key}, value: ${it.value}`);
 * }
 */
class ReverseIterator extends BaseIterator {
    /**
     * There are 3 ways to construct a reverse iterator:
     *
     * 1. Using a node and a container
     * 2. Copy constructor / clone
     * 3. Copy constructor / clone from forward Iterator instance
     * @param {*} args
     *
     * @example
     * // Using a node and a container
     * let it = new ReverseIterator(node, container);
     *
     * // Copy constructor / clone
     * let it1 = new ReverseIterator(node, container);
     * let it2 = new ReverseIterator(it1);
     *
     * // Copy constructor / clone from forward Iterator instance
     * let it1 = new Iterator(node, container);
     * let it2 = new ReverseIterator(it1);
     */
    constructor(...args) {
        if (args.length === 2) {
            let [node, container] = args;
            super(node, container);
        }
        else if (args.length === 1) {
            let [obj] = args;
            let className = obj.constructor.name;
            if (className === ReverseIterator.name) {
                super(obj.__n, obj.__c);
            }
            else if (className === Iterator.name) {
                let c = obj.__c;
                super(c.prev(obj.__n), c);
            }
            else {
                throw new Error(`Can't create an ReverseIterator from ${className}`);
            }
        }
        else {
            throw new Error('Can\'t create a Reverse Iterator with provided parameters');
        }
    }

    /**
     *  Replaces node reference with the reference of the previous node in the container, because it works in reverse order
     * Can be used for manual reverse iteration over a range of key-value pairs.
     * @example
     * let m = new TreeMap();
     * ... // add key-value pairs., using numbers as keys
     * let from = new ReverseIterator(t.upperBound(50));
     * let to = new ReverseIterator(t.lowerBound(0));
     * let it = from;
     * while (!it.equals(to)) {
     *   console.log(it.key);
     *   it.next();
     * }
     */
    next() {
        /**
         * __n and __c are defined in the base class
         */
        this.__n = this.__c.prev(this.__n);
    }

    /**
     *  Replaces node reference with the reference of the next node in the container, because it works in reverse order
     * Can be used for manual forward iteration over a range of key-value pairs.
     * @example
     * let m = new TreeMap();
     * ... // add key-value pairs., using numbers as keys
     * let from = new ReverseIterator(t.upperBound(50));
     * let to = new ReverseIterator(t.lowerBound(0));
     * let it = to;
     * while (!it.equals(from)) {
     *   it.prev();
     *   console.log(it.key);
     * }
     */
    prev() {
        this.__n = this.__c.next(this.__n);
    }
}

module.exports = {
    Iterator: Iterator,
    ReverseIterator: ReverseIterator
};

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(6);


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

/* This is an entry point to the library.
   It collects all public classes and re-exports them */
/**@private */
const {TreeMap} = __webpack_require__(7);
/**@private */
const {TreeMultiMap} = __webpack_require__(9);
/**@private */
const {TreeSet} = __webpack_require__(10);
/**@private */
const {TreeMultiSet} = __webpack_require__(11);
/**@private */
const {Iterator, ReverseIterator} = __webpack_require__(4);
/**@private */
const {JsIterator, JsReverseIterator} = __webpack_require__(3);

module.exports = {
    Iterator: Iterator,
    ReverseIterator: ReverseIterator,
    JsIterator: JsIterator,
    JsReverseIterator: JsReverseIterator,
    TreeMap: TreeMap,
    TreeMultiMap: TreeMultiMap,
    TreeSet: TreeSet,
    TreeMultiSet: TreeMultiSet,
};

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

/** An implementation of red-black tree */
const {Tree} = __webpack_require__(2);
/** Classes that regulate whether tree nodes hold keys only, or key-value pairs */
const {KeyValuePolicy} = __webpack_require__(1);
/** Node for a red-black tree */
const {TreeNode} = __webpack_require__(0);

/**
 * TreeMap is an associative container that stores elements formed
 * by a combination of a key value and a mapped value, following a specific order.
 *
 * In a TreeMap, the key values are generally used to sort and uniquely identify
 * the elements, while the mapped values store the content associated to this key.
 * The types of key and mapped value may differ.
 *
 * ## Container properties
 * * **Associative** - Elements in associative containers are referenced by their key
 * and not by their absolute position in the container.
 * * **Ordered** - The elements in the container follow a strict order at all times.
 * All inserted elements are given a position in this order.
 * * **Map** - Each element associates a key to a mapped value. Keys are meant
 * to identify the elements whose main content is the mapped value.
 * * **Unique keys** - No two elements in the container can have equivalent keys.
 *
 * @example
 * let map = new TreeMap();
 * // add few values
 * map.set(1, 'a');
 * map.set(2, 'b');
 * // find a value by key
 * let v = map.get(1); // << 'a'
 * // print all key-value pairs
 * for (let [key, value] of map) {
 *   console.log(`key: ${key}, value: ${value}`);
 * }
 */
class TreeMap {
    /*======================================================
     * Methods of ES6 Map
     *======================================================*/

    /**
     * Creates an empty, or a pre-initialized map.
     * @param {*} [iterable] Another iterable object whose key-value pairs are added into the newly created map.
     * @example
     * // Create an empty map
     * let map1 = new TreeMap();
     * // Create and initialize map
     * let map2 = new TreeMap([[1, 'A'], [2, 'B'], [3, 'C']]);
     */
    constructor(iterable) {
        /** Internal tree */
        this.__t = new Tree();
        this.__t.valuePolicy = new KeyValuePolicy();
        if ((iterable !== undefined)
            && (iterable !== null)) {
            if (iterable[Symbol.iterator] !== undefined) {
                // copy contents
                for (let [k, v] of iterable) {
                    this.set(k, v);
                }
            }
            else {
                throw new Error('TreeMap constructor accepts only iterable objects');
            }
        }
    }

    /**
     * String tag of this class
     * @returns {String}
     * @example
     * Object.prototype.toString.call(new TreeMap()); // "[object TreeMap]"
     */
    get [Symbol.toStringTag]() {
        return 'TreeMap';
    }

    /**
     * Allows to create programmatically an instance of the same class
     * @returns constructor object for this class.
     * @example
     * let map = new TreeMap();
     * let constrFunc = Object.getPrototypeOf(map).constructor[Symbol.species];
     * let map2 = new constrFunc();
     */
    static get [Symbol.species]() {
        return TreeMap;
    }

    /**
     * Removes all key-value pairs.
     * @example
     * let map = new TreeMap([[1, 'A'], [2, 'B'], [3, 'C']]);
     * map.clear();
     * console.log(map.size); // 0
     */
    clear() {
        this.__t.clear();
    }

    /**
     * Removes key-value pair with the specified key if such entry exists. Does nothing otherwise.
     * @example
     * let map = new TreeMap([[1, 'A'], [2, 'B'], [3, 'C']]);
     * map.delete(2);
     * console.log(map.toString()); // {1:A,3:C}
     */
    delete(key) {
        let it = this.__t.find(key);
        if (!it.equals(this.__t.end())) {
            this.__t.erase(it.node);
        }
    }

    /**
     * Forward ES6 iterator for all key-value pairs in ascending order of the keys.
     * @returns {JsIterator}
     * @example
     * let map = new TreeMap([[1, 'A'], [2, 'B'], [3, 'C']]);
     * for (let [key,value] of map.entries()) {
     *   console.log(`key: ${key}, value: ${value}`);
     * }
     */
    entries() {
        return this.__t.entries();
    }

    /**
     * Iterates all key-value pairs using a callback in ascending order of the keys.
     * Note that ES6 specifies the order of key value parameters in the callback differently from for-of loop.
     * @example
     * let map = new TreeMap([[1, 'A'], [2, 'B'], [3, 'C']]);
     * map.forEach(function(value, key, container) {
     *   console.log(`key: ${key}, value: ${value}`);
     * });
     */
    forEach(callback) {
        for (let [k, v] of this.__t) {
            callback(v, k, this);
        }
    }

    /**
     * Finds value associated with the specified key. If specified key does not exist then undefined is returned.
     * @returns {*}
     * @param {*} key a value of any type that can be compared with a key
     * @example
     * let map = new TreeMap([[1, 'A'], [2, 'B'], [3, 'C']]);
     * let v = map.get(3); // 'C'
     * * let v = map.get(4); // returns undefined
     */
    get(key) {
        let it = this.__t.find(key);
        if (!it.equals(this.__t.end())) {
            return it.value;
        }
        else {
            return undefined;
        }
    }

    /**
     * A boolean indicator whether map contains a key-value pair with the specified key
     * @returns {Boolean}
     * @param {*} key a value of any type that can be compared with a key
     * @example
     * let map = new TreeMap([[1, 'A'], [2, 'B'], [3, 'C']]);
     * let b = map.get(3); // true
     */
    has(key) {
        let it = this.__t.find(key);
        if (!it.equals(this.__t.end())) {
            return true;
        }
        else {
            return false;
        }
    }

    /**
     * Forward ES6 iterator for all keys in ascending order of the keys.
     * @returns {JsIterator}
     * @example
     * // iterate all keys
     * let map = new TreeMap([[1, 'A'], [2, 'B'], [3, 'C']]);
     * for (let k of map.keys()) {
     *   console.log(k); // 1, 2, 3
     * }
     * // iterate all keys in reverse order
     * let map = new TreeMap([[1, 'A'], [2, 'B'], [3, 'C']]);
     * for (let k of map.keys().backward()) {
     *   console.log(k); // 3, 2, 1
     * }
     */
    keys() {
        return this.__t.keys();
    }

    /**
     * Adds or updates key-value pair to the map.
     * @param {*} key
     * @param {*} value
     * @example
     * let map = new TreeMap();
     * map.set(1, 'A');
     */
    set(key, value) {
        let n = new TreeNode();
        n.key = key;
        n.value = value;
        this.__t.insertOrReplace(n);
    }

    /**
     * Number of key-value pairs in the map.
     * @returns {Number}
     */
    get size() {
        return this.__t.size();
    }

    /**
     * Forward ES6 iterator for all values in ascending order of the keys.
     * @returns {JsITerator}
     * @example
     * // iterate all values
     * let map = new TreeMap([[1, 'A'], [2, 'B'], [3, 'C']]);
     * for (let v of map.values()) {
     *   console.log(v); // 'A', 'B', 'C'
     * }
     * // iterate all values in reverse order
     * let map = new TreeMap([[1, 'A'], [2, 'B'], [3, 'C']]);
     * for (let v of map.values().backward()) {
     *   console.log(v); // 'C', 'B', 'A'
     * }
     */
    values() {
        return this.__t.values();
    }

    /**
     * Forward ES6 iterator for all key-value pairs in ascending order of the keys. The same as entries() method
     * @returns {JsIterator}
     * @example
     * let map = new TreeMap([[1, 'A'], [2, 'B'], [3, 'C']]);
     * for (let [key,value] of map) {
     *   console.log(`key: ${key}, value: ${value}`);
     * }
     */
    [Symbol.iterator]() {
        return this.__t[Symbol.iterator]();
    }

    /*======================================================
     * More methods
     *======================================================*/
    /**
     * ES6 reverse iterator for all key-value pairs in descending order of the keys.
     * @returns {JsReverseIterator}
     * @example
     * let map = new TreeMap([[1, 'A'], [2, 'B'], [3, 'C']]);
     * for (let [key,value] of map.backwards()) {
     *   console.log(`key: ${key}, value: ${value}`);
     * }
     */
    backward() {
        return this.__t.backward();
    }

    /**
     * Sets custom comparison function if key values are not of primitive types.
     * Callback is a 3-way comparison function accepts two key values (lhs, rhs). It is expected to return
     *      +1 if the value of rhs is greater than lhs
     *      -1 if the value of rhs is less than lhs
     *       0 if values are the same
     */
    set compareFunc(func) {
        this.clear();
        this.__t.compare = func;
    }

    /*======================================================
     * STL-like methods
     *======================================================*/

    /**
     * Forward iterator to the first element
     * @returns {Iterator}
     * @example
     * let m = new TreeMap();
     * ...
     * for (let it = m.begin(); !it.equals(m.end()); it.next()) {
     *   console.log(`key: ${it.key}, value: ${it.value}`);
     * }
     */
    begin() {
        return this.__t.begin();
    }

    /**
     * Forward iterator to the element following the last element
     * @returns {Iterator}
     * @example
     * let m = new TreeMap();
     * ...
     * for (let it = m.begin(); !it.equals(m.end()); it.next()) {
     *   console.log(`key: ${it.key}, value: ${it.value}`);
     * }
     */
    end() {
        return this.__t.end();
    }

    /**
     * Finds an element with key equivalent to the specified one. If such key does not exist end() iterator is returned.
     * @param {*} key
     * @returns {Iterator}
     * @example
     * let m = new TreeMap([[1, 'A'], [2, 'B'], [3, 'C']]);
     * ...
     * let it = m.find(1);
     * if (!it.equals(m.end())) {
     *   console.log(`key: ${it.key}, value: ${it.value}`); // 1, 'A'
     * }
     */
    find(key) {
        return this.__t.find(key);
    }

    /**
     * Adds key-value pair if such key does not exist in the map
     * @param {*} key
     * @param {*} value
     * @returns {InsertionResult} - indicates whether a node was added and provides iterator to it.
     * @example
     * let m = new TreeMap();
     * let res = m.insertUnique(1, 'A');
     * if (res.wasInserted) {
     *   console.log(`Inserted ${res.iterator.value}`); // prints A
     * }
     * res = m.insertUnique(1, 'B') // this step has no effect on the map
     * if (res.wasInserted) {
     *   console.log(`Inserted ${res.iterator.key}`); // not executed
     * }
     */
    insertUnique(key, value) {
        let n = new TreeNode();
        n.key = key;
        n.value = value;
        return this.__t.insertUnique(n);
    }

    /**
     * Adds key-value pair if such key does not exist in the map. Replaces value if such key exists
     * @param {*} key
     * @param {*} value
     * @returns {InsertionResult} - indicates whether a node was added and provides iterator to it.
     * @example
     * let m = new TreeMap();
     * let res = m.insertOrReplace(1, 'A');
     * if (res.wasInserted) {
     *   console.log(`Inserted ${res.iterator.value}`); // prints A
     * }
     * res = m.insertOrReplace(1, 'B') // replaces value on the existing node
     * if (res.wasInserted) {
     *   console.log(`Inserted ${res.iterator.key}`); // prints B
     * }
     */
    insertOrReplace(key, value) {
        let n = new TreeNode();
        n.key = key;
        n.value = value;
        return this.__t.insertOrReplace(n);
    }

    /**
     * Removes key-value pair for the specified iterator.
     * @param {Iterator} iterator
     * @example
     * let map = new TreeMap([[1, 'A'], [2, 'B'], [3, 'C']]);
     * let it = map.find(2);
     * it.prev();
     * map.erase(it); // removes a node with key 1
     * console.log(map.toString()); // {2:B,3:C}
     */
    erase(iterator) {
        this.__t.erase(iterator.node);
    }

    /**
     * Iterator pointing to the first element that is not less than specified key. If no such element is found, see end() iterator is returned.
     * @param {*} key
     * @returns {Iterator}
     * @example
     * let m = new TreeMap();
     * ... // add key-value pairs., using numbers as keys
     * // iterate through all key-value pairs with keys between 0 and 50 inclusive
     * let from = m.lowerBound(0);
     * let to = m.upperBound(50);
     * let it = from;
     * while (!it.equals(to)) {
     *   console.log(it.key);
     *   it.next();
     * }
     *
     * let m = new TreeMap();
     * ... // add key-value pairs., using numbers as keys
     * // iterate through all key-value pairs with keys between 0 and 50 inclusive in reverse order
     * let from = new ReverseIterator(m.upperBound(50));
     * let to = new ReverseIterator(m.lowerBound(0));
     * let it = from;
     * while (!it.equals(to)) {
     *   console.log(it.key);
     *   it.next();
     * }
     */
    lowerBound(key) {
        return this.__t.lowerBound(key);
    }

    /**
     * Reverse iterator to the last element.
     * @returns {ReverseIterator}
     * @example
     * let m = new TreeMap();
     * ...
     * for (let it = m.rbegin(); !it.equals(m.rend()); it.next()) {
     *   console.log(`key: ${it.key}, value: ${it.value}`);
     * }
     */
    rbegin() {
        return this.__t.rbegin();
    }

    /**
     * Reverse iterator pointing to before the first element.
     * @returns {ReverseIterator}
     * @example
     * let m = new TreeMap();
     * ...
     * for (let it = m.rbegin(); !it.equals(m.rend()); it.next()) {
     *   console.log(`key: ${it.key}, value: ${it.value}`);
     * }
     */
    rend() {
        return this.__t.rend();
    }

    /**
     * Iterator pointing to the first element that is greater than key. If no such element is found end() iterator is returned.
     * @param {*} key
     * @returns {Iterator}
     * @example
     * let m = new TreeMap();
     * ... // add key-value pairs., using numbers as keys
     * // iterate through all key-value pairs with keys between 0 and 50 inclusive
     * let from = m.lowerBound(0);
     * let to = m.upperBound(50);
     * let it = from;
     * while (!it.equals(to)) {
     *   console.log(it.key);
     *   it.next();
     * }
     *
     * let m = new TreeMap();
     * ... // add key-value pairs., using numbers as keys
     * // iterate through all key-value pairs with keys between 0 and 50 inclusive in reverse order
     * let from = new ReverseIterator(m.upperBound(50));
     * let to = new ReverseIterator(m.lowerBound(0));
     * let it = from;
     * while (!it.equals(to)) {
     *   console.log(it.key);
     *   it.next();
     * }
     */
    upperBound(key) {
        return this.__t.upperBound(key);
    }

    /**
     * @returns first key/value pair of the container, or undefined if container is empty
     * @example
     * let m = new TreeMap([[1, 'A'], [2, 'B'], [3, 'C']]);
     * let first = m.first();
     * if (first) {
     *   let key = first[0];   // 1
     *   let value = first[1]; // 'A'
     * }
     */
    first() {
        return this.__t.first();
    }

    /**
     * @returns last key/value pair of the container, or undefined if container is empty
     * @example
     * let m = new TreeMap([[1, 'A'], [2, 'B'], [3, 'C']]);
     * let last = m.last();
     * if (last) {
     *   let key = last[0];   // 3
     *   let value = last[1]; // 'C'
     * }
     */
    last() {
        return this.__t.last();
    }

    /**
     * Serializes contents of the map in the form {key1:value1,key2:value2,...}
     * @returns {String}
     */
    toString() {
        return this.__t.toString();
    }
}

module.exports = {
    TreeMap: TreeMap,
};

/***/ }),
/* 8 */
/***/ (function(module, exports) {

/**
 * An instance of this class reports whether insert operation was successful.
 * if a node was added, or an existing one replaced then an iterator is provided. Otherwise the value of iterator is undefined
 */
class InsertionResult {
    /**
     * Default constructor
     * @param {Boolean} wasAdded
     * @param {Boolean} wasReplaced
     * @param {Iterator} iterator only provided if the node was added, or replaced
     */
    constructor(wasAdded, wasReplaced, iterator) {
        /**
         * Boolean flag indicating whether an element was added
         */
        this.wasAdded = wasAdded;
        /**
         * Boolean flag indicating whether an existing node was updated
         */
        this.wasReplaced = wasReplaced;
        /**
         * {Iterator} instance pointing to the newly added node
         */
        this.iterator = iterator;
    }
}

module.exports = {
    InsertionResult: InsertionResult
};

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

/** An implementation of red-black tree */
const {Tree} = __webpack_require__(2);
/** Classes that regulate whether tree nodes hold keys only, or key-value pairs */
const {KeyValuePolicy} = __webpack_require__(1);
/** Node for a red-black tree */
const {TreeNode} = __webpack_require__(0);

/**
 * TreeMultiMap is an associative container that stores elements formed by
 * a combination of a key value and a mapped value, following a specific order,
 * and where multiple elements can have equivalent keys.
 *
 * In a TreeMultiMap, the key values are generally used to sort and uniquely
 * identify the elements, while the mapped values store the content
 * associated to this key. The types of key and mapped value may differ.
 *
 * ## Container properties
 * * **Associative** - Elements in associative containers are referenced
 * by their key and not by their absolute position in the container.
 * * **Ordered** - The elements in the container follow a strict order
 * at all times. All inserted elements are given a position in this order.
 * * **Map** - Each element associates a key to a mapped value. Keys are meant
 * to identify the elements whose main content is the mapped value.
 * * **Multiple equivalent keys** - Multiple elements in the container
 * can have equivalent keys.
 *
 * @example
 * let map = new TreeMultiMap();
 * // add few values
 * map.set(1, 'a');
 * map.set(2, 'b');
 * map.set(2, 'c');
 * // find a value by key
 * let v = map.get(1); // << 'a'
 * find all values for a given key
 * // print all key-value pairs
 * let from = map.lowerBound(2);
 * let to = map.upperBound(2);
 * let it = from;
 * while (!it.equals(to)) {
 *   console.log(it.key);
 *   it.next();
 * }
 */
class TreeMultiMap {
    /*======================================================
     * Methods of ES6 Map
     *======================================================*/

    /**
     * Creates an empty, or a pre-initialized map.
     * @param {*} [iterable] Another iterable object whose key-value pairs are added into the newly created map.
     * @example
     * // Create an empty map
     * let map1 = new TreeMultiMap();
     * // Create and initialize map
     * let map2 = new TreeMultiMap([[1, 'A'], [2, 'B'], [3, 'C']]);
     */
    constructor(iterable) {
        /** Internal tree */
        this.__t = new Tree();
        this.__t.valuePolicy = new KeyValuePolicy();
        if ((iterable !== undefined)
            && (iterable !== null)) {
            if (iterable[Symbol.iterator] !== undefined) {
                // copy contents
                for (let [k, v] of iterable) {
                    this.set(k, v);
                }
            }
            else {
                throw new Error('TreeMultiMap constructor accepts only iterable objects');
            }
        }
    }

    /**
     * String tag of this class
     * @returns {String}
     * @example
     * Object.prototype.toString.call(new TreeMultiMap()); // "[object TreeMultiMap]"
     */
    get [Symbol.toStringTag]() {
        return 'TreeMultiMap';
    }

    /**
     * Allows to create programmatically an instance of the same class
     * @returns constructor object for this class.
     * @example
     * let map = new TreeMultiMap();
     * let constrFunc = Object.getPrototypeOf(map).constructor[Symbol.species];
     * let map2 = new constrFunc();
     */
    static get [Symbol.species]() {
        return TreeMultiMap;
    }

    /**
     * Removes all key-value pairs.
     * @example
     * let map = new TreeMultiMap([[1, 'A'], [2, 'B'], [3, 'C']]);
     * map.clear();
     * console.log(map.size); // 0
     */
    clear() {
        this.__t.clear();
    }

    /**
     * Removes key-value pair with the specified key if such entry exists. Does nothing otherwise.
     * @example
     * let map = new TreeMultiMap([[1, 'A'], [2, 'B'], [3, 'C']]);
     * map.delete(2);
     * console.log(map.toString()); // {1:A,3:C}
     */
    delete(key) {
        let it = this.__t.find(key);
        if (!it.equals(this.__t.end())) {
            this.__t.erase(it.node);
        }
    }

    /**
     * Forward ES6 iterator for all key-value pairs in ascending order of the keys.
     * @returns {JsIterator}
     * @example
     * let map = new TreeMultiMap([[1, 'A'], [2, 'B'], [3, 'C']]);
     * for (let [key,value] of map.entries()) {
     *   console.log(`key: ${key}, value: ${value}`);
     * }
     */
    entries() {
        return this.__t.entries();
    }

    /**
     * Iterates all key-value pairs using a callback in ascending order of the keys.
     * Note that ES6 specifies the order of key value parameters in the callback differently from for-of loop.
     * @example
     * let map = new TreeMultiMap([[1, 'A'], [2, 'B'], [3, 'C']]);
     * map.forEach(function(value, key, container) {
     *   console.log(`key: ${key}, value: ${value}`);
     * });
     */
    forEach(callback) {
        for (let [k, v] of this.__t) {
            callback(v, k, this);
        }
    }

    /**
     * Finds value associated with the specified key. If specified key does not exist then undefined is returned.
     * @returns {*}
     * @param {*} key a value of any type that can be compared with a key
     * @example
     * let map = new TreeMultiMap([[1, 'A'], [2, 'B'], [3, 'C']]);
     * let v = map.get(3); // 'C'
     * * let v = map.get(4); // returns undefined
     */
    get(key) {
        let it = this.__t.find(key);
        if (!it.equals(this.__t.end())) {
            return it.value;
        }
        else {
            return undefined;
        }
    }

    /**
     * A boolean indicator whether map contains a key-value pair with the specified key
     * @returns {Boolean}
     * @param {*} key a value of any type that can be compared with a key
     * @example
     * let map = new TreeMultiMap([[1, 'A'], [2, 'B'], [3, 'C']]);
     * let b = map.get(3); // true
     */
    has(key) {
        let it = this.__t.find(key);
        if (!it.equals(this.__t.end())) {
            return true;
        }
        else {
            return false;
        }
    }

    /**
     * Forward ES6 iterator for all keys in ascending order of the keys.
     * @returns {JsIterator}
     * @example
     * // iterate all keys
     * let map = new TreeMultiMap([[1, 'A'], [2, 'B'], [3, 'C']]);
     * for (let k of map.keys()) {
     *   console.log(k); // 1, 2, 3
     * }
     * // iterate all keys in reverse order
     * let map = new TreeMultiMap([[1, 'A'], [2, 'B'], [3, 'C']]);
     * for (let k of map.keys().backward()) {
     *   console.log(k); // 3, 2, 1
     * }
     */
    keys() {
        return this.__t.keys();
    }

    /**
     * Adds a key-value pair to the map. Multiple key-value pairs with the same key are allowed in TreeMultiMap.
     * @param {*} key
     * @param {*} value
     * @example
     * let map = new TreeMultiMap();
     * map.set(1, 'A');
     * map.set(1, 'B');
     * map.set(2, 'C');
     * for (let k of map.values()) {
     *   console.log(k); // A, B, C
     * }
     */
    set(key, value) {
        let n = new TreeNode();
        n.key = key;
        n.value = value;
        this.__t.insertMulti(n);
    }

    /**
     * Number of key-value pairs in the map.
     * @returns {Number}
     */
    get size() {
        return this.__t.size();
    }

    /**
     * Forward ES6 iterator for all values in ascending order of the keys.
     * @returns {JsITerator}
     * @example
     * // iterate all values
     * let map = new TreeMultiMap([[1, 'A'], [2, 'B'], [3, 'C']]);
     * for (let v of map.values()) {
     *   console.log(v); // 'A', 'B', 'C'
     * }
     * // iterate all values in reverse order
     * let map = new TreeMultiMap([[1, 'A'], [2, 'B'], [3, 'C']]);
     * for (let v of map.values().backward()) {
     *   console.log(v); // 'C', 'B', 'A'
     * }
     */
    values() {
        return this.__t.values();
    }

    /**
     * Forward ES6 iterator for all key-value pairs in ascending order of the keys. The same as entries() method
     * @returns {JsIterator}
     * @example
     * let map = new TreeMultiMap([[1, 'A'], [2, 'B'], [3, 'C']]);
     * for (let [key,value] of map) {
     *   console.log(`key: ${key}, value: ${value}`);
     * }
     */
    [Symbol.iterator]() {
        return this.__t[Symbol.iterator]();
    }

    /*======================================================
     * More methods
     *======================================================*/
    /**
     * ES6 reverse iterator for all key-value pairs in descending order of the keys.
     * @returns {JsReverseIterator}
     * @example
     * let map = new TreeMultiMap([[1, 'A'], [2, 'B'], [3, 'C']]);
     * for (let [key,value] of map.backwards()) {
     *   console.log(`key: ${key}, value: ${value}`);
     * }
     */
    backward() {
        return this.__t.backward();
    }

    /**
     * Sets custom comparison function if key values are not of primitive types.
     * Callback is a 3-way comparison function accepts two key values (lhs, rhs). It is expected to return
     *      +1 if the value of rhs is greater than lhs
     *      -1 if the value of rhs is less than lhs
     *       0 if values are the same
     */
    set compareFunc(func) {
        this.clear();
        this.__t.compare = func;
    }

    /*======================================================
     * STL-like methods
     *======================================================*/

    /**
     * Forward iterator to the first element
     * @returns {Iterator}
     * @example
     * let m = new TreeMultiMap();
     * ...
     * for (let it = m.begin(); !it.equals(m.end()); it.next()) {
     *   console.log(`key: ${it.key}, value: ${it.value}`);
     * }
     */
    begin() {
        return this.__t.begin();
    }

    /**
     * Forward iterator to the element following the last element
     * @returns {Iterator}
     * @example
     * let m = new TreeMultiMap();
     * ...
     * for (let it = m.begin(); !it.equals(m.end()); it.next()) {
     *   console.log(`key: ${it.key}, value: ${it.value}`);
     * }
     */
    end() {
        return this.__t.end();
    }

    /**
     * Finds an element with key equivalent to the specified one. If such key does not exist end() iterator is returned.
     * @param {*} key
     * @returns {Iterator}
     * @example
     * let m = new TreeMultiMap([[1, 'A'], [2, 'B'], [3, 'C']]);
     * ...
     * let it = m.find(1);
     * if (!it.equals(m.end())) {
     *   console.log(`key: ${it.key}, value: ${it.value}`); // 1, 'A'
     * }
     */
    find(key) {
        return this.__t.find(key);
    }

    /**
     * Adds key-value pair if such key does not exist in the map
     * @param {*} key
     * @param {*} value
     * @returns {InsertionResult} - indicates whether a node was added and provides iterator to it.
     * @example
     * let m = new TreeMultiMap();
     * let res = m.insertUnique(1, 'A');
     * if (res.wasInserted) {
     *   console.log(`Inserted ${res.iterator.value}`); // prints A
     * }
     * res = m.insertUnique(1, 'B') // this step has no effect on the map
     * if (res.wasInserted) {
     *   console.log(`Inserted ${res.iterator.key}`); // not executed
     * }
     */
    insertUnique(key, value) {
        let n = new TreeNode();
        n.key = key;
        n.value = value;
        return this.__t.insertUnique(n);
    }

    /**
     * Adds key-value pair if such key does not exist in the map. Replaces value if such key exists
     * @param {*} key
     * @param {*} value
     * @returns {InsertionResult} - indicates whether a node was added and provides iterator to it.
     * @example
     * let m = new TreeMultiMap();
     * let res = m.insertOrReplace(1, 'A');
     * if (res.wasInserted) {
     *   console.log(`Inserted ${res.iterator.value}`); // prints A
     * }
     * res = m.insertOrReplace(1, 'B') // replaces value on the existing node
     * if (res.wasInserted) {
     *   console.log(`Inserted ${res.iterator.key}`); // prints B
     * }
     */
    insertOrReplace(key, value) {
        let n = new TreeNode();
        n.key = key;
        n.value = value;
        return this.__t.insertOrReplace(n);
    }

    /**
     * Adds key-value pair. If such key already exists in the map then adds another node with the same key and a new value.
     * @param {*} key
     * @param {*} value
     * @returns {InsertionResult} - indicates whether a node was added and provides iterator to it.
     * @example
     * let m = new TreeMultiMap();
     * let res = m.insertMulti(1, 'A');
     * if (res.wasInserted) {
     *   console.log(`Inserted ${res.iterator.value}`); // prints A
     * }
     * res = m.insertMulti(1, 'B') // adds a new node
     * if (res.wasInserted) {
     *   console.log(`Inserted ${res.iterator.value}`); // prints B
     *   it.prev();
     *   console.log(`Previously inserted ${res.iterator.value}`); // prints A
     * }
     */
    insertMulti(key, value) {
        let n = new TreeNode();
        n.key = key;
        n.value = value;
        return this.__t.insertMulti(n);
    }

    /**
     * Removes key-value pair for the specified iterator.
     * @param {Iterator} iterator
     * @example
     * let map = new TreeMultiMap([[1, 'A'], [2, 'B'], [3, 'C']]);
     * let it = map.find(2);
     * it.prev();
     * map.erase(it); // removes a node with key 1
     * console.log(map.toString()); // {2:B,3:C}
     */
    erase(iterator) {
        this.__t.erase(iterator.node);
    }

    /**
     * Iterator pointing to the first element that is not less than specified key. If no such element is found, see end() iterator is returned.
     * @param {*} key
     * @returns {Iterator}
     * @example
     * let m = new TreeMultiMap();
     * ... // add key-value pairs., using numbers as keys
     * // iterate through all key-value pairs with keys between 0 and 50 inclusive
     * let from = m.lowerBound(0);
     * let to = m.upperBound(50);
     * let it = from;
     * while (!it.equals(to)) {
     *   console.log(it.key);
     *   it.next();
     * }
     *
     * let m = new TreeMultiMap();
     * ... // add key-value pairs., using numbers as keys
     * // iterate through all key-value pairs with keys between 0 and 50 inclusive in reverse order
     * let from = new ReverseIterator(m.upperBound(50));
     * let to = new ReverseIterator(m.lowerBound(0));
     * let it = from;
     * while (!it.equals(to)) {
     *   console.log(it.key);
     *   it.next();
     * }
     */
    lowerBound(key) {
        return this.__t.lowerBound(key);
    }

    /**
     * Reverse iterator to the last element.
     * @returns {ReverseIterator}
     * @example
     * let m = new TreeMultiMap();
     * ...
     * for (let it = m.rbegin(); !it.equals(m.rend()); it.next()) {
     *   console.log(`key: ${it.key}, value: ${it.value}`);
     * }
     */
    rbegin() {
        return this.__t.rbegin();
    }

    /**
     * Reverse iterator pointing to before the first element.
     * @returns {ReverseIterator}
     * @example
     * let m = new TreeMultiMap();
     * ...
     * for (let it = m.rbegin(); !it.equals(m.rend()); it.next()) {
     *   console.log(`key: ${it.key}, value: ${it.value}`);
     * }
     */
    rend() {
        return this.__t.rend();
    }

    /**
     * Iterator pointing to the first element that is greater than key. If no such element is found end() iterator is returned.
     * @param {*} key
     * @returns {Iterator}
     * @example
     * let m = new TreeMultiMap();
     * ... // add key-value pairs., using numbers as keys
     * // iterate through all key-value pairs with keys between 0 and 50 inclusive
     * let from = m.lowerBound(0);
     * let to = m.upperBound(50);
     * let it = from;
     * while (!it.equals(to)) {
     *   console.log(it.key);
     *   it.next();
     * }
     *
     * let m = new TreeMultiMap();
     * ... // add key-value pairs., using numbers as keys
     * // iterate through all key-value pairs with keys between 0 and 50 inclusive in reverse order
     * let from = new ReverseIterator(m.upperBound(50));
     * let to = new ReverseIterator(m.lowerBound(0));
     * let it = from;
     * while (!it.equals(to)) {
     *   console.log(it.key);
     *   it.next();
     * }
     */
    upperBound(key) {
        return this.__t.upperBound(key);
    }

    /**
     * @returns first key/value pair of the container, or undefined if container is empty
     * @example
     * let m = new TreeMultiMap([[1, 'A'], [2, 'B'], [3, 'C']]);
     * let first = m.first();
     * if (first) {
     *   let key = first[0];   // 1
     *   let value = first[1]; // 'A'
     * }
     */
    first() {
        return this.__t.first();
    }

    /**
     * @returns last key/value pair of the container, or undefined if container is empty
     * @example
     * let m = new TreeMultiMap([[1, 'A'], [2, 'B'], [3, 'C']]);
     * let last = m.last();
     * if (last) {
     *   let key = last[0];   // 3
     *   let value = last[1]; // 'C'
     * }
     */
    last() {
        return this.__t.last();
    }

    /**
     * Serializes contents of the map in the form {key1:value1,key2:value2,...}
     * @returns {String}
     */
    toString() {
        return this.__t.toString();
    }
}

module.exports = {
    TreeMultiMap: TreeMultiMap,
};

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

/** An implementation of red-black tree */
const {Tree} = __webpack_require__(2);
/** Classes that regulate whether tree nodes hold keys only, or key-value pairs */
const {KeyOnlyPolicy} = __webpack_require__(1);
/** Node for a red-black tree */
const {TreeNode} = __webpack_require__(0);

/**
 * TreeSet is a container that stores unique elements following a specific order.
 *
 * In a TreeSet, the value of an element also identifies it (the value is itself the key),
 * and each value must be unique. The value of the elements in a TreeSet cannot be modified
 * once in the container (the elements are immutable), but they can be inserted or removed
 * from the container.
 *
 * ## Container properties
 * * **Associative** - Elements in associative containers are referenced by their key and
 * not by their absolute position in the container.</li>
 * * **Ordered** - The elements in the container follow a strict order at all times.
 * All inserted elements are given a position in this order.</li>
 * * **Set** - The value of an element is also the key used to identify it.</li>
 * * **Unique keys** - No two elements in the container can have equivalent keys.</li>
 *
 *
 * @example
 * let set = new TreeSet();
 * // add few values
 * set.add(1);
 * set.add(2);
 * // check whether key exists
 * let flag = set.has(1); // << true
 * // print all keys
 * for (let key of set) {
 *   console.log(`key: ${key}`);
 * }
 */
class TreeSet {
    /*======================================================
     * Methods of ES6 Set
     *======================================================*/

    /**
     * Creates an empty, or a pre-initialized set.
     * @param {*} [iterable] Another iterable object whose values are added into the newly created set.
     * @example
     * // Create an empty set
     * let set = new TreeSet();
     * // Create and initialize set
     * let set2 = new TreeSet([1, 2, 3]);
     */
    constructor(iterable) {
        /** Internal tree */
        this.__t = new Tree();
        this.__t.valuePolicy = new KeyOnlyPolicy();
        if ((iterable !== undefined)
            && (iterable !== null)) {
            if (iterable[Symbol.iterator] !== undefined) {
                // copy contents
                for (let k of iterable) {
                    this.add(k);
                }
            }
            else {
                throw new Error('TreeSet constructor accepts only iterable objects');
            }
        }
    }

    /**
     * String tag of this class
     * @returns {String}
     * @example
     * Object.prototype.toString.call(new TreeSet()); // "[object TreeSet]"
     */
    get [Symbol.toStringTag]() {
        return 'TreeSet';
    }

    /**
     * Allows to create programmatically an instance of the same class
     * @returns constructor object for this class.
     * @example
     * let set = new TreeSet();
     * let constrFunc = Object.getPrototypeOf(set).constructor[Symbol.species];
     * let set2 = new constrFunc();
     */
    static get [Symbol.species]() {
        return TreeSet;
    }

    /**
     * Removes all key-value pairs.
     * @example
     * let set = new TreeSet([1, 2, 3]);
     * set.clear();
     * console.log(set.size); // 0
     */
    clear() {
        this.__t.clear();
    }

    /**
     * Removes key-value pair with the specified key if such entry exists. Does nothing otherwise.
     * @example
     * let set = new TreeSet([1, 2, 3]);
     * set.delete(2);
     * console.log(set.toString()); // {1,3}
     */
    delete(key) {
        let it = this.__t.find(key);
        if (!it.equals(this.__t.end())) {
            this.__t.erase(it.node);
        }
    }

    /**
     * Forward ES6 iterator for all values in ascending order.
     * @returns {JsIterator}
     * @example
     * let set = new TreeSet([1, 2, 3]);
     * for (let key of set.entries()) {
     *   console.log(`key: ${key}`);
     * }
     */
    entries() {
        return this.__t.entries();
    }

    /**
     * Iterates all values using a callback in ascending order.
     * Note that ES6 specifies the order of key parameters in the callback differently from for-of loop.
     * @example
     * let set = new TreeSet([1, 2, 3]);
     * set.forEach(function(value, key, container) {
     *   // value is the same as key
     *   console.log(`key: ${key}, value: ${value}`);
     * });
     */
    forEach(callback) {
        for (let k of this.__t) {
            callback(k, k, this);
        }
    }

    /**
     * A boolean indicator whether set contains the specified key.
     * @returns {Boolean}
     * @param {*} key a value of any type that can be compared with a key
     * @example
     * let set = new TreeSet([1, 2, 3]);
     * let b = set.get(3); // true
     * b = set.get(4); // false
     */
    has(key) {
        let it = this.__t.find(key);
        if (!it.equals(this.__t.end())) {
            return true;
        }
        else {
            return false;
        }
    }

    /**
     * Forward ES6 iterator for all keys in ascending order.
     * @returns {JsIterator}
     * @example
     * // iterate all keys
     * let set = new TreeSet([1, 2, 3]);
     * for (let k of set.keys()) {
     *   console.log(k); // 1, 2, 3
     * }
     * // iterate all keys in reverse order
     * let set = new TreeSet([1, 2, 3]);
     * for (let k of set.keys().backward()) {
     *   console.log(k); // 3, 2, 1
     * }
     */
    keys() {
        return this.__t.keys();
    }

    /**
     * Adds a key to the set, unless the key already exists.
     * @param {*} key
     * @example
     * let set = new TreeSet();
     * set.add(1);
     */
    add(key) {
        let n = new TreeNode();
        n.key = key;
        this.__t.insertUnique(n);
    }

    /**
     * Number of keys in the set.
     * @returns {Number}
     */
    get size() {
        return this.__t.size();
    }

    /**
     * Forward ES6 iterator for all keys in ascending order. It is the same as keys() method
     * @returns {JsITerator}
     * @example
     * // iterate all values
     * let set = new TreeSet([1, 2, 3]);
     * for (let v of set.values()) {
     *   console.log(v); // '1', '2', '3'
     * }
     * // iterate all values in reverse order
     * let set = new TreeSet([1, 2, 3]);
     * for (let v of set.values().backward()) {
     *   console.log(v); // '3', '2', '1'
     * }
     */
    values() {
        return this.__t.keys();
    }

    /**
     * Forward ES6 iterator for all keys in ascending order. The same as entries() method
     * @returns {JsIterator}
     * @example
     * let set = new TreeSet([1, 2, 3]);
     * for (let key of set) {
     *   console.log(`key: ${key}, value: ${value}`);
     * }
     */
    [Symbol.iterator]() {
        return this.__t[Symbol.iterator]();
    }

    /*======================================================
     * More methods
     *======================================================*/
    /**
     * ES6 reverse iterator for all keys in descending order.
     * @returns {JsReverseIterator}
     * @example
     * let set = new TreeSet([1, 2, 3]);
     * for (let key of set.backwards()) {
     *   console.log(`key: ${key}`);
     * }
     */
    backward() {
        return this.__t.backward();
    }

    /**
     * Sets custom comparison function if key values are not of primitive types.
     * Callback is a 3-way comparison function accepts two key values (lhs, rhs). It is expected to return
     *      +1 if the value of rhs is greater than lhs
     *      -1 if the value of rhs is less than lhs
     *       0 if values are the same
     */
    set compareFunc(func) {
        this.clear();
        this.__t.compare = func;
    }

    /*======================================================
     * STL-like methods
     *======================================================*/

    /**
     * Forward iterator to the first element
     * @returns {Iterator}
     * @example
     * let set = new TreeSet();
     * ...
     * for (let it = set.begin(); !it.equals(set.end()); it.next()) {
     *   console.log(`key: ${it.key}`);
     * }
     */
    begin() {
        return this.__t.begin();
    }

    /**
     * Forward iterator to the element following the last element
     * @returns {Iterator}
     * @example
     * let set = new TreeSet();
     * ...
     * for (let it = set.begin(); !it.equals(set.end()); it.next()) {
     *   console.log(`key: ${it.key}`);
     * }
     */
    end() {
        return this.__t.end();
    }

    /**
     * Finds an element with key equivalent to the specified one. If such key does not exist end() iterator is returned.
     * @param {*} key
     * @returns {Iterator}
     * @example
     * let set = new TreeSet([1, 2, 3]);
     * ...
     * let it = set.find(1);
     * if (!it.equals(set.end())) {
     *   console.log(`Found key: ${it.key}`); // 1
     * }
     */
    find(key) {
        return this.__t.find(key);
    }

    /**
     * Adds a key if it doesn't exist
     * @param {*} key
     * @returns {InsertionResult} - indicates whether a node was added and provides iterator to it.
     * @example
     * let set = new TreeSet();
     * let res = set.insertUnique(1);
     * if (res.wasInserted) {
     *   console.log(`Inserted ${res.iterator.key}`); // prints 1
     * }
     * res = set.insertUnique(1); // this step has no effect on the set
     * if (res.wasInserted) {
     *   console.log(`Inserted ${res.iterator.key}`); // not executed
     * }
     */
    insertUnique(key) {
        let n = new TreeNode();
        n.key = key;
        return this.__t.insertUnique(n);
    }

    /**
     * Adds key-value pair if such key does not exist in the map. Replaces value if such key exists
     * @param {*} key
     * @returns {InsertionResult} - indicates whether a node was added and provides iterator to it.
     * @example
     * let set = new TreeSet();
     * let res = set.insertOrReplace(1);
     * if (res.wasInserted) {
     *   console.log(`Inserted ${res.iterator.key}`); // prints 1
     * }
     * res = set.insertOrReplace(1) // returns iterator to the previously added node
     * if (res.wasInserted) {
     *   console.log(`Inserted ${res.iterator.key}`); // prints 1
     * }
     */
    insertOrReplace(key) {
        let n = new TreeNode();
        n.key = key;
        return this.__t.insertOrReplace(n);
    }

    /**
     * Removes value for the specified iterator.
     * @param {Iterator} iterator
     * @example
     * let set = new TreeSet([1,2,3]);
     * let it = set.find(2);
     * it.prev();
     * set.erase(it); // removes a node with key 1
     * console.log(set.toString()); // {2,3}
     */
    erase(iterator) {
        this.__t.erase(iterator.node);
    }

    /**
     * Iterator pointing to the first element that is not less than specified key. If no such element is found, see end() iterator is returned.
     * @param {*} key
     * @returns {Iterator}
     * @example
     * let set = new TreeSet();
     * ... // add key-value pairs., using numbers as keys
     * // iterate through all key-value pairs with keys between 0 and 50 inclusive
     * let from = set.lowerBound(0);
     * let to = set.upperBound(50);
     * let it = from;
     * while (!it.equals(to)) {
     *   console.log(it.key);
     *   it.next();
     * }
     *
     * let set = new TreeSet();
     * ... // add key-value pairs., using numbers as keys
     * // iterate through all key-value pairs with keys between 0 and 50 inclusive in reverse order
     * let from = new ReverseIterator(set.upperBound(50));
     * let to = new ReverseIterator(set.lowerBound(0));
     * let it = from;
     * while (!it.equals(to)) {
     *   console.log(it.key);
     *   it.next();
     * }
     */
    lowerBound(key) {
        return this.__t.lowerBound(key);
    }

    /**
     * Reverse iterator to the last element.
     * @returns {ReverseIterator}
     * @example
     * let set = new TreeSet();
     * ...
     * for (let it = set.rbegin(); !it.equals(set.rend()); it.next()) {
     *   console.log(`key: ${it.key}`);
     * }
     */
    rbegin() {
        return this.__t.rbegin();
    }

    /**
     * Reverse iterator pointing to before the first element.
     * @returns {ReverseIterator}
     * @example
     * let set = new TreeSet();
     * ...
     * for (let it = set.rbegin(); !it.equals(set.rend()); it.next()) {
     *   console.log(`key: ${it.key}`);
     * }
     */
    rend() {
        return this.__t.rend();
    }

    /**
     * Iterator pointing to the first element that is greater than key. If no such element is found end() iterator is returned.
     * @param {*} key
     * @returns {Iterator}
     * @example
     * let set = new TreeSet();
     * ... // add key-value pairs., using numbers as keys
     * // iterate through all key-value pairs with keys between 0 and 50 inclusive
     * let from = set.lowerBound(0);
     * let to = set.upperBound(50);
     * let it = from;
     * while (!it.equals(to)) {
     *   console.log(it.key);
     *   it.next();
     * }
     *
     * let set = new TreeSet();
     * ... // add key-value pairs., using numbers as keys
     * // iterate through all key-value pairs with keys between 0 and 50 inclusive in reverse order
     * let from = new ReverseIterator(set.upperBound(50));
     * let to = new ReverseIterator(set.lowerBound(0));
     * let it = from;
     * while (!it.equals(to)) {
     *   console.log(it.key);
     *   it.next();
     * }
     */
    upperBound(key) {
        return this.__t.upperBound(key);
    }

    /**
     * @returns first element of the container, or undefined if container is empty
     * @example
     * let set = new TreeSet([1, 2, 3]);
     * let first = set.first(); // 1
     */
    first() {
        return this.__t.first();
    }

    /**
     * @returns last element of the container, or undefined if container is empty
     * @example
     * let set = new TreeSet([1, 2, 3]);
     * let last = set.last(); // 3
     */
    last() {
        return this.__t.last();
    }

    /**
     * Serializes contents of the set in the form {key1,key2,...}
     * @returns {String}
     */
    toString() {
        return this.__t.toString();
    }
}

module.exports = {
    TreeSet: TreeSet,
};

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

/** An implementation of red-black tree */
const {Tree} = __webpack_require__(2);
/** Classes that regulate whether tree nodes hold keys only, or key-value pairs */
const {KeyOnlyPolicy} = __webpack_require__(1);
/** Node for a red-black tree */
const {TreeNode} = __webpack_require__(0);

/**
 * TreeMultiSet is a container that stores elements following a specific order,
 * and where multiple elements can have equivalent values.
 *
 * In a TreeMultiSet, the value of an element also identifies it
 * (the value is itself the key). The value of the elements in a multiset
 * cannot be modified once in the container (the elements are always immutable),
 * but they can be inserted or removed from the container.
 *
 * ## Container properties
 * * **Associative** - Elements in associative containers are referenced
 * by their key and not by their absolute position in the container.
 * * **Ordered** - The elements in the container follow a strict order
 * at all times. All inserted elements are given a position in this order.
 * * **Set** - The value of an element is also the key used to identify it.
 * * **Multiple equivalent keys** - Multiple elements in the container
 * can have equivalent keys.
 *
 * @example
 * let set = new TreeMultiSet();
 * // add few values
 * set.add(1);
 * set.add(2);
 * set.add(2);
 * // check whether key exists
 * let flag = set.has(1); // << true
 * // print all keys
 * for (let key of set) {
 *   console.log(`key: ${key}`); // 1, 2, 2
 * }
 */
class TreeMultiSet {
    /*======================================================
     * Methods of ES6 Set
     *======================================================*/

    /**
     * Creates an empty, or a pre-initialized set.
     * @param {*} [iterable] Another iterable object whose values are added into the newly created set.
     * @example
     * // Create an empty set
     * let set = new TreeMultiSet();
     * // Create and initialize set
     * let set2 = new TreeMultiSet([1, 2, 3]);
     */
    constructor(iterable) {
        /** Internal tree */
        this.__t = new Tree();
        this.__t.valuePolicy = new KeyOnlyPolicy();
        if ((iterable !== undefined)
            && (iterable !== null)) {
            if (iterable[Symbol.iterator] !== undefined) {
                // copy contents
                for (let k of iterable) {
                    this.add(k);
                }
            }
            else {
                throw new Error('TreeMultiSet constructor accepts only iterable objects');
            }
        }
    }

    /**
     * String tag of this class
     * @returns {String}
     * @example
     * Object.prototype.toString.call(new TreeMultiSet()); // "[object TreeMultiSet]"
     */
    get [Symbol.toStringTag]() {
        return 'TreeMultiSet';
    }

    /**
     * Allows to create programmatically an instance of the same class
     * @returns constructor object for this class.
     * @example
     * let set = new TreeMultiSet();
     * let constrFunc = Object.getPrototypeOf(set).constructor[Symbol.species];
     * let set2 = new constrFunc();
     */
    static get [Symbol.species]() {
        return TreeMultiSet;
    }

    /**
     * Removes all key-value pairs.
     * @example
     * let set = new TreeMultiSet([1, 2, 3]);
     * set.clear();
     * console.log(set.size); // 0
     */
    clear() {
        this.__t.clear();
    }

    /**
     * Removes key-value pair with the specified key if such entry exists. Does nothing otherwise.
     * @example
     * let set = new TreeMultiSet([1, 2, 2, 3]);
     * set.delete(2);
     * console.log(set.toString()); // {1,2,3}
     * set.delete(2); / remove the second copy of the key
     * console.log(set.toString()); // {1,3}
     */
    delete(key) {
        let it = this.__t.find(key);
        if (!it.equals(this.__t.end())) {
            this.__t.erase(it.node);
        }
    }

    /**
     * Forward ES6 iterator for all values in ascending order.
     * @returns {JsIterator}
     * @example
     * let set = new TreeMultiSet([1, 2, 3]);
     * for (let key of set.entries()) {
     *   console.log(`key: ${key}`);
     * }
     */
    entries() {
        return this.__t.entries();
    }

    /**
     * Iterates all values using a callback in ascending order.
     * Note that ES6 specifies the order of key parameters in the callback differently from for-of loop.
     * @example
     * let set = new TreeMultiSet([1, 2, 3]);
     * set.forEach(function(value, key, container) {
     *   // value is the same as key
     *   console.log(`key: ${key}, value: ${value}`);
     * });
     */
    forEach(callback) {
        for (let k of this.__t) {
            callback(k, k, this);
        }
    }

    /**
     * A boolean indicator whether set contains the specified key.
     * @returns {Boolean}
     * @param {*} key a value of any type that can be compared with a key
     * @example
     * let set = new TreeMultiSet([1, 2, 3]);
     * let b = set.get(3); // true
     * b = set.get(4); // false
     */
    has(key) {
        let it = this.__t.find(key);
        if (!it.equals(this.__t.end())) {
            return true;
        }
        else {
            return false;
        }
    }

    /**
     * Forward ES6 iterator for all keys in ascending order.
     * @returns {JsIterator}
     * @example
     * // iterate all keys
     * let set = new TreeMultiSet([1, 2, 3]);
     * for (let k of set.keys()) {
     *   console.log(k); // 1, 2, 3
     * }
     * // iterate all keys in reverse order
     * let set = new TreeMultiSet([1, 2, 3]);
     * for (let k of set.keys().backward()) {
     *   console.log(k); // 3, 2, 1
     * }
     */
    keys() {
        return this.__t.keys();
    }

    /**
     * Adds a key to the set. If the key already exists then another entry with the same value is added.
     * @param {*} key
     * @example
     * let set = new TreeMultiSet();
     * set.add(1);
     * set.add(1);
     * set.add(2);
     * // print all keys
     * for (let key of set) {
     *   console.log(`key: ${key}`); // 1, 1, 2
     * }
     */
    add(key) {
        let n = new TreeNode();
        n.key = key;
        this.__t.insertMulti(n);
    }

    /**
     * Number of keys in the set.
     * @returns {Number}
     */
    get size() {
        return this.__t.size();
    }

    /**
     * Forward ES6 iterator for all keys in ascending order. It is the same as keys() method
     * @returns {JsITerator}
     * @example
     * // iterate all values
     * let set = new TreeMultiSet([1, 2, 3]);
     * for (let v of set.values()) {
     *   console.log(v); // '1', '2', '3'
     * }
     * // iterate all values in reverse order
     * let set = new TreeMultiSet([1, 2, 3]);
     * for (let v of set.values().backward()) {
     *   console.log(v); // '3', '2', '1'
     * }
     */
    values() {
        return this.__t.keys();
    }

    /**
     * Forward ES6 iterator for all keys in ascending order. The same as entries() method
     * @returns {JsIterator}
     * @example
     * let set = new TreeMultiSet([1, 2, 3]);
     * for (let key of set) {
     *   console.log(`key: ${key}, value: ${value}`);
     * }
     */
    [Symbol.iterator]() {
        return this.__t[Symbol.iterator]();
    }

    /*======================================================
     * More methods
     *======================================================*/
    /**
     * ES6 reverse iterator for all keys in descending order.
     * @returns {JsReverseIterator}
     * @example
     * let set = new TreeMultiSet([1, 2, 3]);
     * for (let key of set.backwards()) {
     *   console.log(`key: ${key}`);
     * }
     */
    backward() {
        return this.__t.backward();
    }

    /**
     * Sets custom comparison function if key values are not of primitive types.
     * Callback is a 3-way comparison function accepts two key values (lhs, rhs). It is expected to return
     *      +1 if the value of rhs is greater than lhs
     *      -1 if the value of rhs is less than lhs
     *       0 if values are the same
     */
    set compareFunc(func) {
        this.clear();
        this.__t.compare = func;
    }

    /*======================================================
     * STL-like methods
     *======================================================*/

    /**
     * Forward iterator to the first element
     * @returns {Iterator}
     * @example
     * let set = new TreeMultiSet();
     * ...
     * for (let it = set.begin(); !it.equals(set.end()); it.next()) {
     *   console.log(`key: ${it.key}`);
     * }
     */
    begin() {
        return this.__t.begin();
    }

    /**
     * Forward iterator to the element following the last element
     * @returns {Iterator}
     * @example
     * let set = new TreeMultiSet();
     * ...
     * for (let it = set.begin(); !it.equals(set.end()); it.next()) {
     *   console.log(`key: ${it.key}`);
     * }
     */
    end() {
        return this.__t.end();
    }

    /**
     * Finds an element with key equivalent to the specified one. If such key does not exist end() iterator is returned.
     * @param {*} key
     * @returns {Iterator}
     * @example
     * let set = new TreeMultiSet([1, 2, 3]);
     * ...
     * let it = set.find(1);
     * if (!it.equals(set.end())) {
     *   console.log(`Found key: ${it.key}`); // 1
     * }
     */
    find(key) {
        return this.__t.find(key);
    }

    /**
     * Adds key if such key does not exist in the set.
     * @param {*} key
     * @returns {InsertionResult} - indicates whether a node was added and provides iterator to it.
     * @example
     * let set = new TreeMultiSet();
     * set.insertUnique(1);
     * set.insertUnique(1); // this step has no effect on the set
     * let flag = set.has(1); // true
     * let size = set.size; // 1
     */
    insertUnique(key) {
        let n = new TreeNode();
        n.key = key;
        return this.__t.insertUnique(n);
    }

    /**
     * Adds key if such key does not exist in the set. Same as insertUnique()
     * @param {*} key
     * @returns {InsertionResult} - indicates whether a node was added and provides iterator to it.
     * @example
     * let set = new TreeMultiSet();
     * set.insertOrReplace(1);
     * set.insertOrReplace(1); // this step has no effect on the set
     * let flag = set.has(1); // true
     * let size = set.size; // 1
     */
    insertOrReplace(key) {
        let n = new TreeNode();
        n.key = key;
        return this.__t.insertOrReplace(n);
    }

    /**
     * Adds key whether it exists or not in the set.
     * @param {*} key
     * @returns {InsertionResult} - indicates whether a node was added and provides iterator to it.
     * @example
     * let set = new TreeMultiSet();
     * set.insertMulti(1);
     * set.insertMulti(1); // this step has no effect on the map
     * let flag = set.has(1); // true
     * let size = set.size; // 2
     */
    insertMulti(key) {
        let n = new TreeNode();
        n.key = key;
        return this.__t.insertMulti(n);
    }

    /**
     * Removes value for the specified iterator.
     * @param {Iterator} iterator
     * @example
     * let set = new TreeMultiSet([1,2,3]);
     * let it = set.find(2);
     * it.prev();
     * set.erase(it); // removes a node with key 1
     * console.log(set.toString()); // {2,3}
     */
    erase(iterator) {
        this.__t.erase(iterator.node);
    }

    /**
     * Iterator pointing to the first element that is not less than specified key. If no such element is found, see end() iterator is returned.
     * @param {*} key
     * @returns {Iterator}
     * @example
     * let set = new TreeMultiSet();
     * ... // add key-value pairs., using numbers as keys
     * // iterate through all key-value pairs with keys between 0 and 50 inclusive
     * let from = set.lowerBound(0);
     * let to = set.upperBound(50);
     * let it = from;
     * while (!it.equals(to)) {
     *   console.log(it.key);
     *   it.next();
     * }
     *
     * let set = new TreeMultiSet();
     * ... // add key-value pairs., using numbers as keys
     * // iterate through all key-value pairs with keys between 0 and 50 inclusive in reverse order
     * let from = new ReverseIterator(set.upperBound(50));
     * let to = new ReverseIterator(set.lowerBound(0));
     * let it = from;
     * while (!it.equals(to)) {
     *   console.log(it.key);
     *   it.next();
     * }
     */
    lowerBound(key) {
        return this.__t.lowerBound(key);
    }

    /**
     * Reverse iterator to the last element.
     * @returns {ReverseIterator}
     * @example
     * let set = new TreeMultiSet();
     * ...
     * for (let it = set.rbegin(); !it.equals(set.rend()); it.next()) {
     *   console.log(`key: ${it.key}`);
     * }
     */
    rbegin() {
        return this.__t.rbegin();
    }

    /**
     * Reverse iterator pointing to before the first element.
     * @returns {ReverseIterator}
     * @example
     * let set = new TreeMultiSet();
     * ...
     * for (let it = set.rbegin(); !it.equals(set.rend()); it.next()) {
     *   console.log(`key: ${it.key}`);
     * }
     */
    rend() {
        return this.__t.rend();
    }

    /**
     * Iterator pointing to the first element that is greater than key. If no such element is found end() iterator is returned.
     * @param {*} key
     * @returns {Iterator}
     * @example
     * let set = new TreeMultiSet();
     * ... // add key-value pairs., using numbers as keys
     * // iterate through all key-value pairs with keys between 0 and 50 inclusive
     * let from = set.lowerBound(0);
     * let to = set.upperBound(50);
     * let it = from;
     * while (!it.equals(to)) {
     *   console.log(it.key);
     *   it.next();
     * }
     *
     * let set = new TreeMultiSet();
     * ... // add key-value pairs., using numbers as keys
     * // iterate through all key-value pairs with keys between 0 and 50 inclusive in reverse order
     * let from = new ReverseIterator(set.upperBound(50));
     * let to = new ReverseIterator(set.lowerBound(0));
     * let it = from;
     * while (!it.equals(to)) {
     *   console.log(it.key);
     *   it.next();
     * }
     */
    upperBound(key) {
        return this.__t.upperBound(key);
    }

    /**
     * @returns first element of the container, or undefined if container is empty
     * @example
     * let set = new TreeMultiSet([1, 2, 3]);
     * let first = set.first(); // 1
     */
    first() {
        return this.__t.first();
    }

    /**
     * @returns last element of the container, or undefined if container is empty
     * @example
     * let set = new TreeMultiSet([1, 2, 3]);
     * let last = set.last(); // 3
     */
    last() {
        return this.__t.last();
    }

    /**
     * Serializes contents of the set in the form {key1,key2,...}
     * @returns {String}
     */
    toString() {
        return this.__t.toString();
    }
}

module.exports = {
    TreeMultiSet: TreeMultiSet,
};

/***/ })
/******/ ]);
});