"use strict";

module.exports = SortedSet;

var Shim = require("./shim");
var GenericCollection = require("./generic-collection");
var GenericSet = require("./generic-set");
var PropertyChanges = require("./listen/property-changes");
var RangeChanges = require("./listen/range-changes");
var TreeLog = require("./tree-log");

function SortedSet(values, equals, compare, getDefault) {
    if (!(this instanceof SortedSet)) {
        return new SortedSet(values, equals, compare, getDefault);
    }
    this.contentEquals = equals || Object.equals;
    this.contentCompare = compare || Object.compare;
    this.getDefault = getDefault || Function.noop;
    this.root = null;
    this.length = 0;
    this.addEach(values);
}

// hack so require("sorted-set").SortedSet will work in MontageJS
SortedSet.SortedSet = SortedSet;

Object.addEach(SortedSet.prototype, GenericCollection.prototype);
Object.addEach(SortedSet.prototype, GenericSet.prototype);
Object.addEach(SortedSet.prototype, PropertyChanges.prototype);
Object.addEach(SortedSet.prototype, RangeChanges.prototype);
Object.defineProperty(SortedSet.prototype,"size",GenericCollection._sizePropertyDescriptor);
SortedSet.from = GenericCollection.from;

SortedSet.prototype.isSorted = true;

SortedSet.prototype.constructClone = function (values) {
    return new this.constructor(
        values,
        this.contentEquals,
        this.contentCompare,
        this.getDefault
    );
};

SortedSet.prototype.has = function (value, equals) {
    if (equals) {
        throw new Error("SortedSet#has does not support second argument: equals");
    }
    if (this.root) {
        this.splay(value);
        return this.contentEquals(value, this.root.value);
    } else {
        return false;
    }
};

SortedSet.prototype.get = function (value, equals) {
    if (equals) {
        throw new Error("SortedSet#get does not support second argument: equals");
    }
    if (this.root) {
        this.splay(value);
        if (this.contentEquals(value, this.root.value)) {
            return this.root.value;
        }
    }
    return this.getDefault(value);
};

SortedSet.prototype.add = function (value) {
    var node = new this.Node(value);
    if (this.root) {
        this.splay(value);
        if (!this.contentEquals(value, this.root.value)) {
            var comparison = this.contentCompare(value, this.root.value);
            if (comparison === 0) {
                throw new Error("SortedSet cannot contain incomparable but inequal values: " + value + " and " + this.root.value);
            }
            if (this.dispatchesRangeChanges) {
                this.dispatchBeforeRangeChange([value], [], this.root.index);
            }
            if (comparison < 0) {
                // rotate right
                //   R        N
                //  / \  ->  / \
                // l   r    l   R
                // :   :    :    \
                //                r
                //                :
                node.right = this.root;
                node.left = this.root.left;
                this.root.left = null;
                this.root.touch();
            } else {
                // rotate left
                //   R        N
                //  / \  ->  / \
                // l   r    R   r
                // :   :   /    :
                //        l
                //        :
                node.left = this.root;
                node.right = this.root.right;
                this.root.right = null;
                this.root.touch();
            }
            node.touch();
            this.root = node;
            this.length++;
            if (this.dispatchesRangeChanges) {
                this.dispatchRangeChange([value], [], this.root.index);
            }
            return true;
        }
    } else {
        if (this.dispatchesRangeChanges) {
            this.dispatchBeforeRangeChange([value], [], 0);
        }
        this.root = node;
        this.length++;
        if (this.dispatchesRangeChanges) {
            this.dispatchRangeChange([value], [], 0);
        }
        return true;
    }
    return false;
};

SortedSet.prototype['delete'] = function (value, equals) {
    if (equals) {
        throw new Error("SortedSet#delete does not support second argument: equals");
    }
    if (this.root) {
        this.splay(value);
        if (this.contentEquals(value, this.root.value)) {
            var index = this.root.index;
            if (this.dispatchesRangeChanges) {
                this.dispatchBeforeRangeChange([], [value], index);
            }
            if (!this.root.left) {
                this.root = this.root.right;
            } else {
                // remove the right side of the tree,
                var right = this.root.right;
                this.root = this.root.left;
                // the tree now only contains the left side of the tree, so all
                // values are less than the value deleted.
                // splay so that the root has an empty right child
                this.splay(value);
                // put the right side of the tree back
                this.root.right = right;
            }
            this.length--;
            if (this.root) {
                this.root.touch();
            }
            if (this.dispatchesRangeChanges) {
                this.dispatchRangeChange([], [value], index);
            }
            return true;
        }
    }
    return false;
};

SortedSet.prototype.indexOf = function (value, index) {
    if (index) {
        throw new Error("SortedSet#indexOf does not support second argument: startIndex");
    }
    if (this.root) {
        this.splay(value);
        if (this.contentEquals(value, this.root.value)) {
            return this.root.index;
        }
    }
    return -1;
};

SortedSet.prototype.find = function (value, equals, index) {
    if (equals) {
        throw new Error("SortedSet#find does not support second argument: equals");
    }
    if (index) {
        // TODO contemplate using splayIndex to isolate a subtree in
        // which to search.
        throw new Error("SortedSet#find does not support third argument: index");
    }
    if (this.root) {
        this.splay(value);
        if (this.contentEquals(value, this.root.value)) {
            return this.root;
        }
    }
};

SortedSet.prototype.findGreatest = function (at) {
    if (this.root) {
        at = at || this.root;
        while (at.right) {
            at = at.right;
        }
        return at;
    }
};

SortedSet.prototype.findLeast = function (at) {
    if (this.root) {
        at = at || this.root;
        while (at.left) {
            at = at.left;
        }
        return at;
    }
};

SortedSet.prototype.findGreatestLessThanOrEqual = function (value) {
    if (this.root) {
        this.splay(value);
        if (this.contentCompare(this.root.value, value) > 0) {
            return this.root.getPrevious();
        } else {
            return this.root;
        }
    }
};

SortedSet.prototype.findGreatestLessThan = function (value) {
    if (this.root) {
        this.splay(value);
        if (this.contentCompare(this.root.value, value) >= 0) {
            return this.root.getPrevious();
        } else {
            return this.root;
        }
    }
};

SortedSet.prototype.findLeastGreaterThanOrEqual = function (value) {
    if (this.root) {
        this.splay(value);
        if (this.contentCompare(this.root.value, value) >= 0) {
            return this.root;
        } else {
            return this.root.getNext();
        }
    }
};

SortedSet.prototype.findLeastGreaterThan = function (value) {
    if (this.root) {
        this.splay(value);
        if (this.contentCompare(this.root.value, value) <= 0) {
            return this.root.getNext();
        } else {
            return this.root;
        }
    }
};

SortedSet.prototype.pop = function () {
    if (this.root) {
        var found = this.findGreatest();
        this["delete"](found.value);
        return found.value;
    }
};

SortedSet.prototype.shift = function () {
    if (this.root) {
        var found = this.findLeast();
        this["delete"](found.value);
        return found.value;
    }
};

SortedSet.prototype.push = function () {
    this.addEach(arguments);
};

SortedSet.prototype.unshift = function () {
    this.addEach(arguments);
};

SortedSet.prototype.slice = function (start, end) {
    var temp;
    start = start || 0;
    end = end || this.length;
    if (start < 0) {
        start += this.length;
    }
    if (end < 0) {
        end += this.length;
    }
    var sliced = [];
    if (this.root) {
        this.splayIndex(start);
        while (this.root.index < end) {
            sliced.push(this.root.value);
            if (!this.root.right) {
                break;
            }
            this.splay(this.root.getNext().value);
        }
    }
    return sliced;
};

SortedSet.prototype.splice = function (at, length /*...plus*/) {
    return this.swap(at, length, Array.prototype.slice.call(arguments, 2));
};

SortedSet.prototype.swap = function (start, length, plus) {
    if (start === undefined && length === undefined) {
        return [];
    }
    start = start || 0;
    if (start < 0) {
        start += this.length;
    }
    if (length === undefined) {
        length = Infinity;
    }
    var swapped = [];

    if (this.root) {

        // start
        this.splayIndex(start);

        // minus length
        for (var i = 0; i < length; i++) {
            swapped.push(this.root.value);
            var next = this.root.getNext();
            this["delete"](this.root.value);
            if (!next) {
                break;
            }
            this.splay(next.value);
        }
    }

    // plus
    this.addEach(plus);

    return swapped;
};

// This is the simplified top-down splaying algorithm from: "Self-adjusting
// Binary Search Trees" by Sleator and Tarjan. Guarantees that root.value
// equals value if value exists. If value does not exist, then root will be
// the node whose value either immediately preceeds or immediately follows value.
// - as described in https://github.com/hij1nx/forest
SortedSet.prototype.splay = function (value) {
    var stub, left, right, temp, root, history;

    if (!this.root) {
        return;
    }

    // Create a stub node.  The use of the stub node is a bit
    // counter-intuitive: The right child of the stub node will hold the L tree
    // of the algorithm.  The left child of the stub node will hold the R tree
    // of the algorithm.  Using a stub node, left and right will always be
    // nodes and we avoid special cases.
    // - http://code.google.com/p/v8/source/browse/branches/bleeding_edge/src/splay-tree-inl.h
    stub = left = right = new this.Node();
    // The history is an upside down tree used to propagate new tree sizes back
    // up the left and right arms of a traversal.  The right children of the
    // transitive left side of the tree will be former roots while linking
    // left.  The left children of the transitive walk to the right side of the
    // history tree will all be previous roots from linking right.  The last
    // node of the left and right traversal will each become a child of the new
    // root.
    history = new this.Node();
    root = this.root;

    while (true) {
        var comparison = this.contentCompare(value, root.value);
        if (comparison < 0) {
            if (root.left) {
                if (this.contentCompare(value, root.left.value) < 0) {
                    // rotate right
                    //        Root         L(temp)
                    //      /     \       / \
                    //     L(temp) R    LL    Root
                    //    / \                /    \
                    //  LL   LR            LR      R
                    temp = root.left;
                    root.left = temp.right;
                    root.touch();
                    temp.right = root;
                    temp.touch();
                    root = temp;
                    if (!root.left) {
                        break;
                    }
                }
                // remember former root for repropagating length
                temp = new Node();
                temp.right = root;
                temp.left = history.left;
                history.left = temp;
                // link left
                right.left = root;
                right.touch();
                right = root;
                root = root.left;
            } else {
                break;
            }
        } else if (comparison > 0) {
            if (root.right) {
                if (this.contentCompare(value, root.right.value) > 0) {
                    // rotate left
                    //        Root         L(temp)
                    //      /     \       / \
                    //     L(temp) R    LL    Root
                    //    / \                /    \
                    //  LL   LR            LR      R
                    temp = root.right;
                    root.right = temp.left;
                    root.touch();
                    temp.left = root;
                    temp.touch();
                    root = temp;
                    if (!root.right) {
                        break;
                    }
                }
                // remember former root for repropagating length
                temp = new Node();
                temp.left = root;
                temp.right = history.right;
                history.right = temp;
                // link right
                left.right = root;
                left.touch();
                left = root;
                root = root.right;
            } else {
                break;
            }
        } else { // equal or incomparable
            break;
        }
    }

    // reassemble
    left.right = root.left;
    left.touch();
    right.left = root.right;
    right.touch();
    root.left = stub.right;
    root.right = stub.left;

    // propagate new lengths
    while (history.left) {
        history.left.right.touch();
        history.left = history.left.left;
    }
    while (history.right) {
        history.right.left.touch();
        history.right = history.right.right;
    }
    root.touch();

    this.root = root;
};

// an internal utility for splaying a node based on its index
SortedSet.prototype.splayIndex = function (index) {
    if (this.root) {
        var at = this.root;
        var atIndex = this.root.index;

        while (atIndex !== index) {
            if (atIndex > index && at.left) {
                at = at.left;
                atIndex -= 1 + (at.right ? at.right.length : 0);
            } else if (atIndex < index && at.right) {
                at = at.right;
                atIndex += 1 + (at.left ? at.left.length : 0);
            } else {
                break;
            }
        }

        this.splay(at.value);

        return this.root.index === index;
    }
    return false;
};

SortedSet.prototype.reduce = function (callback, basis, thisp) {
    if (this.root) {
        basis = this.root.reduce(callback, basis, 0, thisp, this);
    }
    return basis;
};

SortedSet.prototype.reduceRight = function (callback, basis, thisp) {
    if (this.root) {
        basis = this.root.reduceRight(callback, basis, this.length - 1, thisp, this);
    }
    return basis;
};

SortedSet.prototype.min = function (at) {
    var least = this.findLeast(at);
    if (least) {
        return least.value;
    }
};

SortedSet.prototype.max = function (at) {
    var greatest = this.findGreatest(at);
    if (greatest) {
        return greatest.value;
    }
};

SortedSet.prototype.one = function () {
    return this.min();
};

SortedSet.prototype.clear = function () {
    var minus;
    if (this.dispatchesRangeChanges) {
        minus = this.toArray();
        this.dispatchBeforeRangeChange([], minus, 0);
    }
    this.root = null;
    this.length = 0;
    if (this.dispatchesRangeChanges) {
        this.dispatchRangeChange([], minus, 0);
    }
};

SortedSet.prototype.iterate = function (start, end) {
    return new this.Iterator(this, start, end);
};

SortedSet.prototype.Iterator = Iterator;

SortedSet.prototype.summary = function () {
    if (this.root) {
        return this.root.summary();
    } else {
        return "()";
    }
};

SortedSet.prototype.log = function (charmap, logNode, callback, thisp) {
    charmap = charmap || TreeLog.unicodeRound;
    logNode = logNode || this.logNode;
    if (!callback) {
        callback = console.log;
        thisp = console;
    }
    callback = callback.bind(thisp);
    if (this.root) {
        this.root.log(charmap, logNode, callback, callback);
    }
};

SortedSet.prototype.logNode = function (node, log, logBefore) {
    log(" " + node.value);
};

SortedSet.logCharsets = TreeLog;

SortedSet.prototype.Node = Node;

function Node(value) {
    this.value = value;
    this.left = null;
    this.right = null;
    this.length = 1;
}

// TODO case where no basis is provided for reduction

Node.prototype.reduce = function (callback, basis, index, thisp, tree, depth) {
    depth = depth || 0;
    if (this.left) {
        // prerecord length to be resistant to mutation
        var length = this.left.length;
        basis = this.left.reduce(callback, basis, index, thisp, tree, depth + 1);
        index += length;
    }
    basis = callback.call(thisp, basis, this.value, index, tree, this, depth);
    index += 1;
    if (this.right) {
        basis = this.right.reduce(callback, basis, index, thisp, tree, depth + 1);
    }
    return basis;
};

Node.prototype.reduceRight = function (callback, basis, index, thisp, tree, depth) {
    depth = depth || 0;
    if (this.right) {
        basis = this.right.reduceRight(callback, basis, index, thisp, tree, depth + 1);
        index -= this.right.length;
    }
    basis = callback.call(thisp, basis, this.value, this.value, tree, this, depth);
    index -= 1;
    if (this.left) {
        basis = this.left.reduceRight(callback, basis, index, thisp, tree, depth + 1);
    }
    return basis;
};

Node.prototype.touch = function () {
    this.length = 1 +
        (this.left ? this.left.length : 0) +
        (this.right ? this.right.length : 0);
    this.index = this.left ? this.left.length : 0;
};

Node.prototype.checkIntegrity = function () {
    var length = 1;
    length += this.left ? this.left.checkIntegrity() : 0;
    length += this.right ? this.right.checkIntegrity() : 0;
    if (this.length !== length)
        throw new Error("Integrity check failed: " + this.summary());
    return length;
}

// get the next node in this subtree
Node.prototype.getNext = function () {
    var node = this;
    if (node.right) {
        node = node.right;
        while (node.left) {
            node = node.left;
        }
        return node;
    }
};

// get the previous node in this subtree
Node.prototype.getPrevious = function () {
    var node = this;
    if (node.left) {
        node = node.left;
        while (node.right) {
            node = node.right;
        }
        return node;
    }
};

Node.prototype.summary = function () {
    var value = this.value || "-";
    value += " <" + this.length;
    if (!this.left && !this.right) {
        return "(" + value + ")";
    }
    return "(" + value + " " + (
        this.left ? this.left.summary() : "()"
    ) + ", " + (
        this.right ? this.right.summary() : "()"
    ) + ")";
};

Node.prototype.log = function (charmap, logNode, log, logAbove) {
    var self = this;

    var branch;
    if (this.left && this.right) {
        branch = charmap.intersection;
    } else if (this.left) {
        branch = charmap.branchUp;
    } else if (this.right) {
        branch = charmap.branchDown;
    } else {
        branch = charmap.through;
    }

    var loggedAbove;
    this.left && this.left.log(
        charmap,
        logNode,
        function innerWrite(line) {
            if (!loggedAbove) {
                loggedAbove = true;
                // leader
                logAbove(charmap.fromBelow + charmap.through + line);
            } else {
                // below
                logAbove(charmap.strafe + " " + line);
            }
        },
        function innerWriteAbove(line) {
            // above
            logAbove("  " + line);
        }
    );

    var loggedOn;
    logNode(
        this,
        function innerWrite(line) {
            if (!loggedOn) {
                loggedOn = true;
                log(branch + line);
            } else {
                log((self.right ? charmap.strafe : " ") + line);
            }
        },
        function innerWriteAbove(line) {
            logAbove((self.left ? charmap.strafe : " ") + line);
        }
    );

    var loggedBelow;
    this.right && this.right.log(
        charmap,
        logNode,
        function innerWrite(line) {
            if (!loggedBelow) {
                loggedBelow = true;
                log(charmap.fromAbove + charmap.through + line);
            } else {
                log("  " + line);
            }
        },
        function innerWriteAbove(line) {
            log(charmap.strafe + " " + line);
        }
    );
};

function Iterator(set, start, end) {
    this.set = set;
    this.prev = null;
    this.end = end;
    if (start) {
        var next = this.set.findLeastGreaterThanOrEqual(start);
        if (next) {
            this.set.splay(next.value);
            this.prev = next.getPrevious();
        }
    }
}
Iterator.prototype.__iterationObject = null;
Object.defineProperty(Iterator.prototype,"_iterationObject", {
    get: function() {
        return this.__iterationObject || (this.__iterationObject = { done: false, value:null});
    }
});

Iterator.prototype.next = function () {
    var next;
    if (this.prev) {
        next = this.set.findLeastGreaterThan(this.prev.value);
    } else {
        next = this.set.findLeast();
    }
    if (!next) {
        this._iterationObject.done = true;
        this._iterationObject.value = void 0;
    }
    else {
        if (
            this.end !== undefined &&
            this.set.contentCompare(next.value, this.end) >= 0
        ) {
            this._iterationObject.done = true;
            this._iterationObject.value = void 0;
        }
        else {
            this.prev = next;
            this._iterationObject.value =  next.value;
        }

    }
    return this._iterationObject;
};
