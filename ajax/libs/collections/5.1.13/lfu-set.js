"use strict";

// Based on http://dhruvbird.com/lfu.pdf

var Shim = require("./shim");
var Set = require("./set").CollectionsSet;
var GenericCollection = require("./generic-collection");
var GenericSet = require("./generic-set");
var PropertyChanges = require("./listen/property-changes");
var RangeChanges = require("./listen/range-changes");

module.exports = LfuSet;

function LfuSet(values, capacity, equals, hash, getDefault) {
    if (!(this instanceof LfuSet)) {
        return new LfuSet(values, capacity, equals, hash, getDefault);
    }
    capacity = capacity || Infinity;
    equals = equals || Object.equals;
    hash = hash || Object.hash;
    getDefault = getDefault || Function.noop;

    // TODO
    this.store = new Set(
        undefined,
        function valueEqual(a, b) {
            return equals(a.value, b.value);
        },
        function valueHash(node) {
            return hash(node.value);
        }
    );
    this.frequencyHead = new this.FrequencyNode(0);

    this.contentEquals = equals;
    this.contentHash = hash;
    this.getDefault = getDefault;
    this.capacity = capacity;
    this.length = 0;
    this.addEach(values);
}

LfuSet.LfuSet = LfuSet; // hack so require("lfu-set").LfuSet will work in MontageJS

Object.addEach(LfuSet.prototype, GenericCollection.prototype);
Object.addEach(LfuSet.prototype, GenericSet.prototype);
Object.addEach(LfuSet.prototype, PropertyChanges.prototype);
Object.addEach(LfuSet.prototype, RangeChanges.prototype);
Object.defineProperty(LfuSet.prototype,"size",GenericCollection._sizePropertyDescriptor);
LfuSet.from = GenericCollection.from;

LfuSet.prototype.constructClone = function (values) {
    return new this.constructor(
        values,
        this.capacity,
        this.contentEquals,
        this.contentHash,
        this.getDefault
    );
};

LfuSet.prototype.has = function (value) {
    return this.store.has(new this.Node(value));
};

LfuSet.prototype.get = function (value, equals) {
    if (equals) {
        throw new Error("LfuSet#get does not support second argument: equals");
    }

    var node = this.store.get(new this.Node(value));
    if (node !== undefined) {
        var frequencyNode = node.frequencyNode;
        var nextFrequencyNode = frequencyNode.next;
        if (nextFrequencyNode.frequency !== frequencyNode.frequency + 1) {
            nextFrequencyNode = new this.FrequencyNode(frequencyNode.frequency + 1, frequencyNode, nextFrequencyNode);
        }

        nextFrequencyNode.values.add(node);
        node.frequencyNode = nextFrequencyNode;
        frequencyNode.values["delete"](node);

        if (frequencyNode.values.length === 0) {
            frequencyNode.prev.next = frequencyNode.next;
            frequencyNode.next.prev = frequencyNode.prev;
        }

        return node.value;
    } else {
        return this.getDefault(value);
    }
};

LfuSet.prototype.add = function (value) {
    // if the value already exists, get it so that its frequency increases
    if (this.has(value)) {
        this.get(value);
        return false;
    }

    var plus = [], minus = [], leastFrequentNode, leastFrequent;
    if (this.capacity > 0) {
        plus.push(value);
        if (this.length + 1 > this.capacity) {
            leastFrequentNode = this.frequencyHead.next;
            leastFrequent = leastFrequentNode.values.order.head.next.value;
            minus.push(leastFrequent.value);
        }
        if (this.dispatchesRangeChanges) {
            this.dispatchBeforeRangeChange(plus, minus, 0);
        }

        // removal must happen before addition, otherwise we could remove
        // the value we are about to add
        if (minus.length > 0) {
            this.store["delete"](leastFrequent);
            leastFrequentNode.values["delete"](leastFrequent);
            // Don't remove the frequencyNode with value of 1, because we
            // are about to use it again in the addition.
            if (leastFrequentNode.value !== 1 && leastFrequentNode.values.length === 0) {
                this.frequencyHead.next = leastFrequentNode.next;
                leastFrequentNode.next.prev = this.frequencyHead;
            }
        }

        var node = new this.Node(value);
        var frequencyNode = this.frequencyHead.next;
        if (frequencyNode.frequency !== 1) {
            frequencyNode = new this.FrequencyNode(1, this.frequencyHead, frequencyNode);
        }
        this.store.add(node);
        frequencyNode.values.add(node);
        node.frequencyNode = frequencyNode;

        this.length = this.length + plus.length - minus.length;

        if (this.dispatchesRangeChanges) {
            this.dispatchRangeChange(plus, minus, 0);
        }
    }

    // whether it grew
    return plus.length !== minus.length;
};

LfuSet.prototype["delete"] = function (value, equals) {
    if (equals) {
        throw new Error("LfuSet#delete does not support second argument: equals");
    }

    var node = this.store.get(new this.Node(value));
    var found = !!node;
    if (found) {
        if (this.dispatchesRangeChanges) {
            this.dispatchBeforeRangeChange([], [value], 0);
        }
        var frequencyNode = node.frequencyNode;

        this.store["delete"](node);
        frequencyNode.values["delete"](node);
        if (frequencyNode.values.length === 0) {
            frequencyNode.prev.next = frequencyNode.next;
            frequencyNode.next.prev = frequencyNode.prev;
        }
        this.length--;

        if (this.dispatchesRangeChanges) {
            this.dispatchRangeChange([], [value], 0);
        }
    }

    return found;
};

LfuSet.prototype.one = function () {
    if (this.length > 0) {
        return this.frequencyHead.next.values.one().value;
    }
};

LfuSet.prototype.clear = function () {
    this.store.clear();
    this.frequencyHead.next = this.frequencyHead;
    this.length = 0;
};

LfuSet.prototype.reduce = function (callback, basis /*, thisp*/) {
    var thisp = arguments[2];
    var index = 0;
    var frequencyNode = this.frequencyHead.next;

    while (frequencyNode.frequency !== 0) {
        var set = frequencyNode.values;
        basis = set.reduce(function (basis, node) {
            return callback.call(thisp, basis, node.value, index++, this);
        }, basis, this);

        frequencyNode = frequencyNode.next;
    }

    return basis;
};

LfuSet.prototype.reduceRight = function (callback, basis /*, thisp*/) {
    var thisp = arguments[2];
    var index = this.length - 1;
    var frequencyNode = this.frequencyHead.prev;

    while (frequencyNode.frequency !== 0) {
        var set = frequencyNode.values;
        basis = set.reduceRight(function (basis, node) {
            return callback.call(thisp, basis, node.value, index--, this);
        }, basis, this);

        frequencyNode = frequencyNode.prev;
    }

    return basis;
};

LfuSet.prototype.iterate = function () {
    return this.store.map(function (node) {
        return node.value;
    }).iterate();
};

LfuSet.prototype.Node = Node;

function Node(value, frequencyNode) {
    this.value = value;
    this.frequencyNode = frequencyNode;
}

LfuSet.prototype.FrequencyNode = FrequencyNode;

function FrequencyNode(frequency, prev, next) {
    this.frequency = frequency;
    this.values = new Set();
    this.prev = prev || this;
    this.next = next || this;
    if (prev) {
        prev.next = this;
    }
    if (next) {
        next.prev = this;
    }
}
