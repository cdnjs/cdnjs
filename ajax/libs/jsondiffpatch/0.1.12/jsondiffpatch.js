!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.jsondiffpatch=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (process){

var DiffPatcher = require('./diffpatcher').DiffPatcher;
exports.DiffPatcher = DiffPatcher;

exports.create = function(options){
	return new DiffPatcher(options);
};

exports.dateReviver = require('./date-reviver');

var defaultInstance;

exports.diff = function() {
	if (!defaultInstance) {
		defaultInstance = new DiffPatcher();
	}
	return defaultInstance.diff.apply(defaultInstance, arguments);
};

exports.patch = function() {
	if (!defaultInstance) {
		defaultInstance = new DiffPatcher();
	}
	return defaultInstance.patch.apply(defaultInstance, arguments);
};

exports.unpatch = function() {
	if (!defaultInstance) {
		defaultInstance = new DiffPatcher();
	}
	return defaultInstance.unpatch.apply(defaultInstance, arguments);
};

exports.reverse = function() {
	if (!defaultInstance) {
		defaultInstance = new DiffPatcher();
	}
	return defaultInstance.reverse.apply(defaultInstance, arguments);
};

if (process.browser) {
	exports.homepage = 'https://github.com/benjamine/jsondiffpatch';
	exports.version = '0.1.11';
} else {
	var packageInfoModuleName = '../package.json';
	var packageInfo = require(packageInfoModuleName);
	exports.homepage = packageInfo.homepage;
	exports.version = packageInfo.version;

	var formatterModuleName = './formatters';
	var formatters = require(formatterModuleName);
	exports.formatters = formatters;
	// shortcut for console
	exports.console = formatters.console;
}

}).call(this,require('_process'))
},{"./date-reviver":7,"./diffpatcher":8,"_process":2}],2:[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};

process.nextTick = (function () {
    var canSetImmediate = typeof window !== 'undefined'
    && window.setImmediate;
    var canPost = typeof window !== 'undefined'
    && window.postMessage && window.addEventListener
    ;

    if (canSetImmediate) {
        return function (f) { return window.setImmediate(f) };
    }

    if (canPost) {
        var queue = [];
        window.addEventListener('message', function (ev) {
            var source = ev.source;
            if ((source === window || source === null) && ev.data === 'process-tick') {
                ev.stopPropagation();
                if (queue.length > 0) {
                    var fn = queue.shift();
                    fn();
                }
            }
        }, true);

        return function nextTick(fn) {
            queue.push(fn);
            window.postMessage('process-tick', '*');
        };
    }

    return function nextTick(fn) {
        setTimeout(fn, 0);
    };
})();

process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
}

// TODO(shtylman)
process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};

},{}],3:[function(require,module,exports){

var Pipe = require('../pipe').Pipe;

var Context = function Context(){
};

Context.prototype.setResult = function(result) {
	this.result = result;
	this.hasResult = true;
	return this;
};

Context.prototype.exit = function() {
	this.exiting = true;
	return this;
};

Context.prototype.switchTo = function(next, pipe) {
	if (typeof next === 'string' || next instanceof Pipe) {
		this.nextPipe = next;
	} else {
		this.next = next;
		if (pipe) {
			this.nextPipe = pipe;
		}
	}
	return this;
};

Context.prototype.push = function(child, name) {
	child.parent = this;
	if (typeof name !== 'undefined') {
		child.childName = name;
	}
	child.root = this.root || this;
	child.options = child.options || this.options;
	if (!this.children) {
		this.children = [child];
		this.nextAfterChildren = this.next || null;
		this.next = child;
	} else {
		this.children[this.children.length - 1].next = child;
		this.children.push(child);
	}
	child.next = this;
	return this;
};

exports.Context = Context;
},{"../pipe":15}],4:[function(require,module,exports){

var Context = require('./context').Context;

var DiffContext = function DiffContext(left, right){
    this.left = left;
    this.right = right;
    this.pipe = 'diff';
};

DiffContext.prototype = new Context();

exports.DiffContext = DiffContext;
},{"./context":3}],5:[function(require,module,exports){

var Context = require('./context').Context;

var PatchContext = function PatchContext(left, delta){
    this.left = left;
    this.delta = delta;
    this.pipe = 'patch';
};

PatchContext.prototype = new Context();

exports.PatchContext = PatchContext;
},{"./context":3}],6:[function(require,module,exports){

var Context = require('./context').Context;

var ReverseContext = function ReverseContext(delta){
    this.delta = delta;
    this.pipe = 'reverse';
};

ReverseContext.prototype = new Context();

exports.ReverseContext = ReverseContext;
},{"./context":3}],7:[function(require,module,exports){

// use as 2nd parameter for JSON.parse to revive Date instances
module.exports = function dateReviver(key, value) {
    var parts;
    if (typeof value === 'string') {
        parts = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(?:\.(\d*))?(Z|([+\-])(\d{2}):(\d{2}))$/.exec(value);
        if (parts) {
            return new Date(Date.UTC(+parts[1], +parts[2] - 1, +parts[3],
              +parts[4], +parts[5], +parts[6], +(parts[7] || 0)));
        }
    }
    return value;
};

},{}],8:[function(require,module,exports){

var Processor = require('./processor').Processor;
var Pipe = require('./pipe').Pipe;
var DiffContext = require('./contexts/diff').DiffContext;
var PatchContext = require('./contexts/patch').PatchContext;
var ReverseContext = require('./contexts/reverse').ReverseContext;

var trivial = require('./filters/trivial');
var nested = require('./filters/nested');
var arrays = require('./filters/arrays');
var dates = require('./filters/dates');
var texts = require('./filters/texts');

var DiffPatcher = function DiffPatcher(options){
    this.processor = new Processor(options);
    this.processor.pipe(new Pipe('diff').append(
        nested.collectChildrenDiffFilter,
        trivial.diffFilter,
        dates.diffFilter,
        texts.diffFilter,
        nested.objectsDiffFilter,
        arrays.diffFilter
        ).shouldHaveResult());
    this.processor.pipe(new Pipe('patch').append(
        nested.collectChildrenPatchFilter,
        arrays.collectChildrenPatchFilter,
        trivial.patchFilter,
        texts.patchFilter,
        nested.patchFilter,
        arrays.patchFilter
        ).shouldHaveResult());
    this.processor.pipe(new Pipe('reverse').append(
        nested.collectChildrenReverseFilter,
        arrays.collectChildrenReverseFilter,
        trivial.reverseFilter,
        texts.reverseFilter,
        nested.reverseFilter,
        arrays.reverseFilter
        ).shouldHaveResult());
};

DiffPatcher.prototype.options = function() {
    return this.processor.options.apply(this.processor, arguments);
};

DiffPatcher.prototype.diff = function(left, right) {
    return this.processor.process(new DiffContext(left, right));
};

DiffPatcher.prototype.patch = function(left, delta) {
    return this.processor.process(new PatchContext(left, delta));
};

DiffPatcher.prototype.reverse = function(delta) {
    return this.processor.process(new ReverseContext(delta));
};

DiffPatcher.prototype.unpatch = function(right, delta) {
    return this.patch(right, this.reverse(delta));
};

exports.DiffPatcher = DiffPatcher;

},{"./contexts/diff":4,"./contexts/patch":5,"./contexts/reverse":6,"./filters/arrays":9,"./filters/dates":10,"./filters/nested":12,"./filters/texts":13,"./filters/trivial":14,"./pipe":15,"./processor":16}],9:[function(require,module,exports){

var DiffContext = require('../contexts/diff').DiffContext;
var PatchContext = require('../contexts/patch').PatchContext;
var ReverseContext = require('../contexts/reverse').ReverseContext;

var lcs = require('./lcs');

var ARRAY_MOVE = 3;

var isArray = (typeof Array.isArray === 'function') ?
    // use native function
    Array.isArray :
    // use instanceof operator
    function(a) {
        return a instanceof Array;
    };

var arrayIndexOf = typeof Array.prototype.indexOf === 'function' ?
    function(array, item) {
        return array.indexOf(item);
    } : function(array, item) {
        var length = array.length;
        for (var i = 0; i < length; i++) {
            if (array[i] === item) {
                return i;
            }
        }
        return -1;
    };

var diffFilter = function arraysDiffFilter(context){
    if (!context.leftIsArray) { return; }

    var objectHash = context.options && context.options.objectHash;

    var match = function(array1, array2, index1, index2, context) {
        var value1 = array1[index1];
        var value2 = array2[index2];
        if (value1 === value2) {
            return true;
        }
        if (typeof value1 !== 'object' || typeof value2 !== 'object') {
            return false;
        }
        if (!objectHash) { return false; }
        var hash1, hash2;
        if (typeof index1 === 'number') {
            context.hashCache1 = context.hashCache1 || [];
            hash1 = context.hashCache1[index1];
            if (typeof hash1 === 'undefined') {
                context.hashCache1[index1] = hash1 = objectHash(value1, index1);
            }
        } else {
            hash1 = objectHash(value1);
        }
        if (typeof hash1 === 'undefined') {
            return false;
        }
        if (typeof index2 === 'number') {
            context.hashCache2 = context.hashCache2 || [];
            hash2 = context.hashCache2[index2];
            if (typeof hash2 === 'undefined') {
                context.hashCache2[index2] = hash2 = objectHash(value2, index2);
            }
        } else {
            hash2 = objectHash(value2);
        }
        if (typeof hash2 === 'undefined') {
            return false;
        }
        return hash1 === hash2;
    };

    var matchContext = {};
    var commonHead = 0, commonTail = 0, index, index1, index2;
    var array1 = context.left;
    var array2 = context.right;
    var len1 = array1.length;
    var len2 = array2.length;

    var child;

    // separate common head
    while (commonHead < len1 && commonHead < len2 &&
        match(array1, array2, commonHead, commonHead, matchContext)) {
        index = commonHead;
        child = new DiffContext(context.left[index], context.right[index]);
        context.push(child, index);
        commonHead++;
    }
    // separate common tail
    while (commonTail + commonHead < len1 && commonTail + commonHead < len2 &&
        match(array1, array2, len1 - 1 - commonTail, len2 - 1 - commonTail, matchContext)) {
        index1 = len1 - 1 - commonTail;
        index2 = len2 - 1 - commonTail;
        child = new DiffContext(context.left[index1], context.right[index2]);
        context.push(child, index2);
        commonTail++;
    }
    var result;
    if (commonHead + commonTail === len1) {
        if (len1 === len2) {
            // arrays are identical
            context.setResult(undefined).exit();
            return;
        }
        // trivial case, a block (1 or more consecutive items) was added
        result = result || { _t: 'a' };
        for (index = commonHead; index < len2 - commonTail; index++) {
            result[index] = [array2[index]];
        }
        context.setResult(result).exit();
        return;
    }
    if (commonHead + commonTail === len2) {
        // trivial case, a block (1 or more consecutive items) was removed
        result = result || { _t: 'a' };
        for (index = commonHead; index < len1 - commonTail; index++) {
            result['_'+index] = [array1[index], 0, 0];
        }
        context.setResult(result).exit();
        return;
    }
    // reset hash cache
    matchContext = {};
    // diff is not trivial, find the LCS (Longest Common Subsequence)
    var trimmed1 = array1.slice(commonHead, len1 - commonTail);
    var trimmed2 = array2.slice(commonHead, len2 - commonTail);
    var seq = lcs.get(
        trimmed1, trimmed2,
        match,
        matchContext
    );
    var removedItems = [];
    result = result || { _t: 'a' };
    for (index = commonHead; index < len1 - commonTail; index++) {
        if (arrayIndexOf(seq.indices1, index - commonHead) < 0) {
            // removed
            result['_'+index] = [array1[index], 0, 0];
            removedItems.push(index);
        }
    }

    var detectMove = true;
    if (context.options && context.options.arrays && context.options.arrays.detectMove === false) {
        detectMove = false;
    }
    var includeValueOnMove = false;
    if (context.options && context.options.arrays && context.options.arrays.includeValueOnMove) {
        includeValueOnMove = true;
    }

    var removedItemsLength = removedItems.length;
    for (index = commonHead; index < len2 - commonTail; index++) {
        var indexOnArray2 = arrayIndexOf(seq.indices2, index - commonHead);
        if (indexOnArray2 < 0) {
            // added, try to match with a removed item and register as position move
            var isMove = false;
            if (detectMove && removedItemsLength > 0) {
                for (var removeItemIndex1 = 0; removeItemIndex1 < removedItemsLength; removeItemIndex1++) {
                    index1 = removedItems[removeItemIndex1];
                    if (match(trimmed1, trimmed2, index1 - commonHead,
                        index - commonHead, matchContext)) {
                        // store position move as: [originalValue, newPosition, ARRAY_MOVE]
                        result['_' + index1].splice(1, 2, index, ARRAY_MOVE);
                        if (!includeValueOnMove) {
                            // don't include moved value on diff, to save bytes
                            result['_' + index1][0] = '';
                        }

                        index2 = index;
                        child = new DiffContext(context.left[index1], context.right[index2]);
                        context.push(child, index2);
                        removedItems.splice(removeItemIndex1, 1);
                        isMove = true;
                        break;
                    }
                }
            }
            if (!isMove) {
                // added
                result[index] = [array2[index]];
            }
        } else {
            // match, do inner diff
            index1 = seq.indices1[indexOnArray2] + commonHead;
            index2 = seq.indices2[indexOnArray2] + commonHead;
            child = new DiffContext(context.left[index1], context.right[index2]);
            context.push(child, index2);
        }
    }

    context.setResult(result).exit();

};
diffFilter.filterName = 'arrays';

var compare = {
    numerically: function(a, b) {
        return a - b;
    },
    numericallyBy: function(name) {
        return function(a, b) {
            return a[name] - b[name];
        };
    }
};

var patchFilter = function nestedPatchFilter(context) {
    if (!context.nested) { return; }
    if (context.delta._t !== 'a') { return; }
    var index, index1;

    var delta = context.delta;
    var array = context.left;

    // first, separate removals, insertions and modifications
    var toRemove = [];
    var toInsert = [];
    var toModify = [];
    for (index in delta) {
        if (index !== '_t') {
            if (index[0] === '_') {
                // removed item from original array
                if (delta[index][2] === 0 || delta[index][2] === ARRAY_MOVE) {
                    toRemove.push(parseInt(index.slice(1), 10));
                } else {
                    throw new Error('only removal or move can be applied at original array indices' +
                        ', invalid diff type: ' + delta[index][2]);
                }
            } else {
                if (delta[index].length === 1) {
                    // added item at new array
                    toInsert.push({
                        index: parseInt(index, 10),
                        value: delta[index][0]
                    });
                } else {
                    // modified item at new array
                    toModify.push({
                        index: parseInt(index, 10),
                        delta: delta[index]
                    });
                }
            }
        }
    }

    // remove items, in reverse order to avoid sawing our own floor
    toRemove = toRemove.sort(compare.numerically);
    for (index = toRemove.length - 1; index >= 0; index--) {
        index1 = toRemove[index];
        var indexDiff = delta['_' + index1];
        var removedValue = array.splice(index1, 1)[0];
        if (indexDiff[2] === ARRAY_MOVE) {
            // reinsert later
            toInsert.push({
                index: indexDiff[1],
                value: removedValue
            });
        }
    }

    // insert items, in reverse order to avoid moving our own floor
    toInsert = toInsert.sort(compare.numericallyBy('index'));
    var toInsertLength = toInsert.length;
    for (index = 0; index < toInsertLength; index++) {
        var insertion = toInsert[index];
        array.splice(insertion.index, 0, insertion.value);
    }

    // apply modifications
    var toModifyLength = toModify.length;
    var child;
    if (toModifyLength > 0) {
        for (index = 0; index < toModifyLength; index++) {
            var modification = toModify[index];
            child = new PatchContext(context.left[modification.index], modification.delta);
            context.push(child, modification.index);
        }
    }

    if (!context.children) {
        context.setResult(context.left).exit();
        return;
    }
    context.exit();
};
patchFilter.filterName = 'arrays';

var collectChildrenPatchFilter = function collectChildrenPatchFilter(context) {
    if (!context || !context.children) { return; }
    if (context.delta._t !== 'a') { return; }
    var length = context.children.length;
    var child;
    for (var index = 0; index < length; index++) {
        child = context.children[index];
        context.left[child.childName] = child.result;
    }
    context.setResult(context.left).exit();
};
collectChildrenPatchFilter.filterName = 'arraysCollectChildren';

var reverseFilter = function arraysReverseFilter(context) {
    if (!context.nested) {
        if (context.delta[2] === ARRAY_MOVE) {
            context.newName = '_' + context.delta[1];
            context.setResult([context.delta[0], parseInt(context.childName.substr(1), 10), ARRAY_MOVE]).exit();
        }
        return;
    }
    if (context.delta._t !== 'a') { return; }
    var name, child;
    for (name in context.delta) {
        if (name === '_t') { continue; }
        child = new ReverseContext(context.delta[name]);
        context.push(child, name);
    }
    context.exit();
};
reverseFilter.filterName = 'arrays';

var reverseArrayDeltaIndex = function(delta, index, itemDelta) {
    var newIndex = index;
    if (typeof index === 'string' && index[0] === '_') {
        newIndex = parseInt(index.substr(1), 10);
    } else {
        var uindex = '_' + index;
        if (isArray(itemDelta) && itemDelta[2] === 0) {
            newIndex = uindex;
        } else {
            for (var index2 in delta) {
                var itemDelta2 = delta[index2];
                if (isArray(itemDelta2) && itemDelta2[2] === ARRAY_MOVE && itemDelta2[1].toString() === index) {
                    newIndex = index2.substr(1);
                }
            }
        }
    }
    return newIndex;
};

var collectChildrenReverseFilter = function collectChildrenReverseFilter(context) {
    if (!context || !context.children) { return; }
    if (context.delta._t !== 'a') { return; }
    var length = context.children.length;
    var child;
    var delta = { _t: 'a' };
    for (var index = 0; index < length; index++) {
        child = context.children[index];
        var name = child.newName;
        if (typeof name === 'undefined') {
            name = reverseArrayDeltaIndex(context.delta, child.childName, child.result);
        }
        if (delta[name] !== child.result) {
            delta[name] = child.result;
        }
    }
    context.setResult(delta).exit();
};
collectChildrenReverseFilter.filterName = 'arraysCollectChildren';

exports.diffFilter = diffFilter;
exports.patchFilter = patchFilter;
exports.collectChildrenPatchFilter = collectChildrenPatchFilter;
exports.reverseFilter = reverseFilter;
exports.collectChildrenReverseFilter = collectChildrenReverseFilter;

},{"../contexts/diff":4,"../contexts/patch":5,"../contexts/reverse":6,"./lcs":11}],10:[function(require,module,exports){
var diffFilter = function datesDiffFilter(context) {
    if (context.left instanceof Date) {
        if (context.right instanceof Date) {
            if (context.left.getTime() !== context.right.getTime()) {
                context.setResult([context.left, context.right]);
            } else {
                context.setResult(undefined);
            }
        } else {
            context.setResult([context.left, context.right]);
        }
        context.exit();
    } else if (context.right instanceof Date) {
        context.setResult([context.left, context.right]).exit();
    }
};
diffFilter.filterName = 'dates';

exports.diffFilter = diffFilter;
},{}],11:[function(require,module,exports){
/*

LCS implementation that supports arrays or strings

reference: http://en.wikipedia.org/wiki/Longest_common_subsequence_problem

*/

var defaultMatch = function(array1, array2, index1, index2) {
    return array1[index1] === array2[index2];
};

var lengthMatrix = function(array1, array2, match, context) {
    var len1 = array1.length;
    var len2 = array2.length;
    var x, y;

    // initialize empty matrix of len1+1 x len2+1
    var matrix = [len1 + 1];
    for (x = 0; x < len1 + 1; x++) {
        matrix[x] = [len2 + 1];
        for (y = 0; y < len2 + 1; y++) {
            matrix[x][y] = 0;
        }
    }
    matrix.match = match;
    // save sequence lengths for each coordinate
    for (x = 1; x < len1 + 1; x++) {
        for (y = 1; y < len2 + 1; y++) {
            if (match(array1, array2, x - 1, y - 1, context)) {
                matrix[x][y] = matrix[x - 1][y - 1] + 1;
            } else {
                matrix[x][y] = Math.max(matrix[x - 1][y], matrix[x][y - 1]);
            }
        }
    }
    return matrix;
};

var backtrack = function(matrix, array1, array2, index1, index2, context) {
    if (index1 === 0 || index2 === 0) {
        return {
            sequence: [],
            indices1: [],
            indices2: []
        };
    }

    if (matrix.match(array1, array2, index1 - 1, index2 - 1, context)) {
        var subsequence = backtrack(matrix, array1, array2, index1 - 1, index2 - 1, context);
        subsequence.sequence.push(array1[index1 - 1]);
        subsequence.indices1.push(index1 - 1);
        subsequence.indices2.push(index2 - 1);
        return subsequence;
    }

    if (matrix[index1][index2 - 1] > matrix[index1 - 1][index2]) {
        return backtrack(matrix, array1, array2, index1, index2 - 1, context);
    } else {
        return backtrack(matrix, array1, array2, index1 - 1, index2, context);
    }
};

var get = function(array1, array2, match, context) {
    context = context || {};
    var matrix = lengthMatrix(array1, array2, match || defaultMatch, context);
    var result = backtrack(matrix, array1, array2, array1.length, array2.length, context);
    if (typeof array1 === 'string' && typeof array2 === 'string') {
        result.sequence = result.sequence.join('');
    }
    return result;
};

exports.get = get;

},{}],12:[function(require,module,exports){

var DiffContext = require('../contexts/diff').DiffContext;
var PatchContext = require('../contexts/patch').PatchContext;
var ReverseContext = require('../contexts/reverse').ReverseContext;

var collectChildrenDiffFilter = function collectChildrenDiffFilter(context) {
    if (!context || !context.children) { return; }
    var length = context.children.length;
    var child;
    var result = context.result;
    for (var index = 0; index < length; index++) {
        child = context.children[index];
        if (typeof child.result === 'undefined') {
            continue;
        }
        result = result || {};
        result[child.childName] = child.result;
    }
    if (result && context.leftIsArray) {
        result._t = 'a';
    }
    context.setResult(result).exit();
};
collectChildrenDiffFilter.filterName = 'collectChildren';

var objectsDiffFilter = function objectsDiffFilter(context) {
    if (context.leftIsArray || context.leftType !== 'object') { return; }

    var name, child;
    for (name in context.left) {
        child = new DiffContext(context.left[name], context.right[name]);
        context.push(child, name);
    }
    for (name in context.right) {
        if (typeof context.left[name] === 'undefined') {
            child = new DiffContext(undefined, context.right[name]);
            context.push(child, name);
        }
    }

    if (!context.children || context.children.length === 0) {
        context.setResult(undefined).exit();
        return;
    }
    context.exit();
};
objectsDiffFilter.filterName = 'objects';

var patchFilter = function nestedPatchFilter(context) {
    if (!context.nested) { return; }
    if (context.delta._t) { return; }
    var name, child;
    for (name in context.delta) {
        child = new PatchContext(context.left[name], context.delta[name]);
        context.push(child, name);
    }
    context.exit();
};
patchFilter.filterName = 'objects';

var collectChildrenPatchFilter = function collectChildrenPatchFilter(context) {
    if (!context || !context.children) { return; }
    if (context.delta._t) { return; }
    var length = context.children.length;
    var child;
    for (var index = 0; index < length; index++) {
        child = context.children[index];
        if (context.left[child.childName] !== child.result) {
            context.left[child.childName] = child.result;
        }
    }
    context.setResult(context.left).exit();
};
collectChildrenPatchFilter.filterName = 'collectChildren';

var reverseFilter = function nestedReverseFilter(context) {
    if (!context.nested) { return; }
    if (context.delta._t) { return; }
    var name, child;
    for (name in context.delta) {
        child = new ReverseContext(context.delta[name]);
        context.push(child, name);
    }
    context.exit();
};
reverseFilter.filterName = 'objects';

var collectChildrenReverseFilter = function collectChildrenReverseFilter(context) {
    if (!context || !context.children) { return; }
    if (context.delta._t) { return; }
    var length = context.children.length;
    var child;
    var delta = {};
    for (var index = 0; index < length; index++) {
        child = context.children[index];
        if (delta[child.childName] !== child.result) {
            delta[child.childName] = child.result;
        }
    }
    context.setResult(delta).exit();
};
collectChildrenReverseFilter.filterName = 'collectChildren';

exports.collectChildrenDiffFilter = collectChildrenDiffFilter;
exports.objectsDiffFilter = objectsDiffFilter;
exports.patchFilter = patchFilter;
exports.collectChildrenPatchFilter = collectChildrenPatchFilter;
exports.reverseFilter = reverseFilter;
exports.collectChildrenReverseFilter = collectChildrenReverseFilter;
},{"../contexts/diff":4,"../contexts/patch":5,"../contexts/reverse":6}],13:[function(require,module,exports){
/* global diff_match_patch */
var TEXT_DIFF = 2;
var DEFAULT_MIN_LENGTH = 60;
var cachedDiffPatch = null;

var getDiffMatchPatch = function(){
    /*jshint camelcase: false */

    if (!cachedDiffPatch) {
        var instance;
        if (typeof diff_match_patch !== 'undefined') {
            // already loaded, probably a browser
            instance = typeof diff_match_patch === 'function' ?
              new diff_match_patch() : new diff_match_patch.diff_match_patch();
        } else if (typeof require === 'function') {
            try {
                var dmpModuleName = 'diff_match_patch_uncompressed';
                var dmp = require('../../public/external/' + dmpModuleName);
                instance = new dmp.diff_match_patch();
            } catch (err) {
                instance = null;
            }
        }
        if (!instance) {
            var error = new Error('text diff_match_patch library not found');
            error.diff_match_patch_not_found = true;
            throw error;
        }
        cachedDiffPatch = {
            diff: function(txt1, txt2){
                return instance.patch_toText(instance.patch_make(txt1, txt2));
            },
            patch: function(txt1, patch){
                var results = instance.patch_apply(instance.patch_fromText(patch), txt1);
                for (var i = 0; i < results[1].length; i++) {
                    if (!results[1][i]) {
                        var error = new Error('text patch failed');
                        error.textPatchFailed = true;
                    }
                }
                return results[0];
            }
        };
    }
    return cachedDiffPatch;
};

var diffFilter = function textsDiffFilter(context) {
    if (context.leftType !== 'string') { return; }
    var minLength = (context.options && context.options.textDiff &&
        context.options.textDiff.minLength) || DEFAULT_MIN_LENGTH;
    if (context.left.length < minLength ||
        context.right.length < minLength) {
        context.setResult([context.left, context.right]).exit();
        return;
    }
    // large text, use a text-diff algorithm
    var diff = getDiffMatchPatch().diff;
    context.setResult([diff(context.left, context.right), 0, TEXT_DIFF]).exit();
};
diffFilter.filterName = 'texts';

var patchFilter = function textsPatchFilter(context) {
    if (context.nested) { return; }
    if (context.delta[2] !== TEXT_DIFF) { return; }

    // text-diff, use a text-patch algorithm
    var patch = getDiffMatchPatch().patch;
    context.setResult(patch(context.left, context.delta[0])).exit();
};
patchFilter.filterName = 'texts';

var textDeltaReverse = function(delta){
    var i, l, lines, line, lineTmp, header = null,
    headerRegex = /^@@ +\-(\d+),(\d+) +\+(\d+),(\d+) +@@$/,
    lineHeader, lineAdd, lineRemove;
    lines = delta.split('\n');
    for (i = 0, l = lines.length; i<l; i++) {
        line = lines[i];
        var lineStart = line.slice(0,1);
        if (lineStart==='@'){
            header = headerRegex.exec(line);
            lineHeader = i;
            lineAdd = null;
            lineRemove = null;

            // fix header
            lines[lineHeader] = '@@ -' + header[3] + ',' + header[4] + ' +' + header[1] + ',' + header[2] + ' @@';
        } else if (lineStart === '+'){
            lineAdd = i;
            lines[i] = '-' + lines[i].slice(1);
            if (lines[i-1].slice(0,1)==='+') {
                // swap lines to keep default order (-+)
                lineTmp = lines[i];
                lines[i] = lines[i-1];
                lines[i-1] = lineTmp;
            }
        } else if (lineStart === '-'){
            lineRemove = i;
            lines[i] = '+' + lines[i].slice(1);
        }
    }
    return lines.join('\n');
};

var reverseFilter = function textsReverseFilter(context) {
    if (context.nested) { return; }
    if (context.delta[2] !== TEXT_DIFF) { return; }

    // text-diff, use a text-diff algorithm
    context.setResult([textDeltaReverse(context.delta[0]), 0, TEXT_DIFF]).exit();
};
reverseFilter.filterName = 'texts';

exports.diffFilter = diffFilter;
exports.patchFilter = patchFilter;
exports.reverseFilter = reverseFilter;

},{}],14:[function(require,module,exports){

var isArray = (typeof Array.isArray === 'function') ?
    // use native function
    Array.isArray :
    // use instanceof operator
    function(a) {
        return a instanceof Array;
    };

var diffFilter = function trivialMatchesDiffFilter(context) {
    if (context.left === context.right) {
        context.setResult(undefined).exit();
        return;
    }
    if (typeof context.left === 'undefined') {
        if (typeof context.right === 'function') {
            throw new Error('functions are not supported');
        }
        context.setResult([context.right]).exit();
        return;
    }
    if (typeof context.right === 'undefined') {
        context.setResult([context.left, 0, 0]).exit();
        return;
    }
    if (typeof context.left === 'function' || typeof context.right === 'function' ) {
        throw new Error('functions are not supported');
    }
    context.leftType = context.left === null ? 'null' : typeof context.left;
    context.rightType = context.right === null ? 'null' : typeof context.right;
    if (context.leftType !== context.rightType) {
        context.setResult([context.left, context.right]).exit();
        return;
    }
    if (context.leftType === 'boolean' || context.leftType === 'number') {
        context.setResult([context.left, context.right]).exit();
        return;
    }
    if (context.leftType === 'object') {
        context.leftIsArray = isArray(context.left);
    }
    if (context.rightType === 'object') {
        context.rightIsArray = isArray(context.right);
    }
    if (context.leftIsArray !== context.rightIsArray) {
        context.setResult([context.left, context.right]).exit();
        return;
    }
};
diffFilter.filterName = 'trivial';

var patchFilter = function trivialMatchesPatchFilter(context) {
    if (typeof context.delta === 'undefined') {
        context.setResult(context.left).exit();
        return;
    }
    context.nested = !isArray(context.delta);
    if (context.nested) { return; }
    if (context.delta.length === 1) {
        context.setResult(context.delta[0]).exit();
        return;
    }
    if (context.delta.length === 2) {
        context.setResult(context.delta[1]).exit();
        return;
    }
    if (context.delta.length === 3 && context.delta[2] === 0) {
        context.setResult(undefined).exit();
        return;
    }
};
patchFilter.filterName = 'trivial';

var reverseFilter = function trivialReferseFilter(context) {
    if (typeof context.delta === 'undefined') {
        context.setResult(context.delta).exit();
        return;
    }
    context.nested = !isArray(context.delta);
    if (context.nested) { return; }
    if (context.delta.length === 1) {
        context.setResult([context.delta[0], 0, 0]).exit();
        return;
    }
    if (context.delta.length === 2) {
        context.setResult([context.delta[1], context.delta[0]]).exit();
        return;
    }
    if (context.delta.length === 3 && context.delta[2] === 0) {
        context.setResult([context.delta[0]]).exit();
        return;
    }
};
reverseFilter.filterName = 'trivial';

exports.diffFilter = diffFilter;
exports.patchFilter = patchFilter;
exports.reverseFilter = reverseFilter;

},{}],15:[function(require,module,exports){

var Pipe = function Pipe(name){
    this.name = name;
    this.filters = [];
};

Pipe.prototype.process = function(input) {
    if (!this.processor) {
        throw new Error('add this pipe to a processor before using it');
    }
    var debug = this.debug;
    var length = this.filters.length;
    var context = input;
    for (var index = 0; index < length; index++) {
        var filter = this.filters[index];
        if (debug) {
            this.log('filter: ' + filter.filterName);
        }
        filter(context);
        if (typeof context === 'object' && context.exiting) {
            context.exiting = false;
            break;
        }
    }
    if (!context.next && this.resultCheck) {
        this.resultCheck(context);
    }
};

Pipe.prototype.log = function(msg) {
    console.log('[jsondiffpatch] ' + this.name + ' pipe, ' + msg);
};

Pipe.prototype.append = function() {
    this.filters.push.apply(this.filters, arguments);
    return this;
};

Pipe.prototype.prepend = function() {
    this.filters.unshift.apply(this.filters, arguments);
    return this;
};

Pipe.prototype.indexOf = function(filterName) {
    if (!filterName) {
        throw new Error('a filter name is required');
    }
    for (var index = 0; index < this.filters.length; index++) {
        var filter = this.filters[index];
        if (filter.filterName === filterName) {
            return index;
        }
    }
    throw new Error('filter not found: ' + filterName);
};

Pipe.prototype.list = function() {
    var names = [];
    for (var index = 0; index < this.filters.length; index++) {
        var filter = this.filters[index];
        names.push(filter.filterName);
    }
    return names;
};

Pipe.prototype.after = function(filterName) {
    var index = this.indexOf(filterName);
    var params = Array.prototype.slice.call(arguments, 1);
    if (!params.length) {
        throw new Error('a filter is required');
    }
    params.unshift(index + 1, 0);
    Array.prototype.splice.apply(this.filters, params);
    return this;
};

Pipe.prototype.before = function(filterName) {
    var index = this.indexOf(filterName);
    var params = Array.prototype.slice.call(arguments, 1);
    if (!params.length) {
        throw new Error('a filter is required');
    }
    params.unshift(index, 0);
    Array.prototype.splice.apply(this.filters, params);
    return this;
};

Pipe.prototype.clear = function() {
    this.filters.length = 0;
    return this;
};

Pipe.prototype.shouldHaveResult = function(should) {
    if (should === false) {
        this.resultCheck = null;
        return;
    }
    if (this.resultCheck) { return; }
    var pipe = this;
    this.resultCheck = function(context) {
        if (!context.hasResult) {
            console.log(context);
            var error = new Error(pipe.name + ' failed');
            error.noResult = true;
            throw error;
        }
    };
    return this;
};

exports.Pipe = Pipe;
},{}],16:[function(require,module,exports){

var Processor = function Processor(options){
	this.selfOptions = options;
	this.pipes = {};
};

Processor.prototype.options = function(options) {
	if (options) {
		this.selfOptions = options;
	}
	return this.selfOptions;
};

Processor.prototype.pipe = function(name, pipe) {
	if (typeof name === 'string') {
		if (typeof pipe === 'undefined') {
			return this.pipes[name];
		} else {
			this.pipes[name] = pipe;
		}
	}
	if (name && name.name) {
		pipe = name;
		if (pipe.processor === this) { return pipe; }
		this.pipes[pipe.name] = pipe;
	}
	pipe.processor = this;
	return pipe;
};

Processor.prototype.process = function(input, pipe) {
	var context = input;
	context.options = this.options();
	var nextPipe = pipe || input.pipe || 'default';
	var lastPipe, lastContext;
	while (nextPipe) {
		if (typeof context.nextAfterChildren !== 'undefined') {
			// children processed and coming back to parent
			context.next = context.nextAfterChildren;
			context.nextAfterChildren = null;
		}

		if (typeof nextPipe === 'string') {
			nextPipe = this.pipe(nextPipe);
		}
		nextPipe.process(context);
		lastContext = context;
		lastPipe = nextPipe;
		nextPipe = null;
		if (context) {
			if (context.next) {
				context = context.next;
				nextPipe = lastContext.nextPipe || context.pipe || lastPipe;
			}
		}
	}
	return context.hasResult ? context.result : undefined;
};

exports.Processor = Processor;

},{}]},{},[1])(1)
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9zb3VyY2UtZmlsZXMvanNvbmRpZmZwYXRjaC9ub2RlX21vZHVsZXMvZmliZXJnbGFzcy9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiL3NvdXJjZS1maWxlcy9qc29uZGlmZnBhdGNoL3NyYy9tYWluLmpzIiwiL3NvdXJjZS1maWxlcy9qc29uZGlmZnBhdGNoL25vZGVfbW9kdWxlcy9maWJlcmdsYXNzL25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9wcm9jZXNzL2Jyb3dzZXIuanMiLCIvc291cmNlLWZpbGVzL2pzb25kaWZmcGF0Y2gvc3JjL2NvbnRleHRzL2NvbnRleHQuanMiLCIvc291cmNlLWZpbGVzL2pzb25kaWZmcGF0Y2gvc3JjL2NvbnRleHRzL2RpZmYuanMiLCIvc291cmNlLWZpbGVzL2pzb25kaWZmcGF0Y2gvc3JjL2NvbnRleHRzL3BhdGNoLmpzIiwiL3NvdXJjZS1maWxlcy9qc29uZGlmZnBhdGNoL3NyYy9jb250ZXh0cy9yZXZlcnNlLmpzIiwiL3NvdXJjZS1maWxlcy9qc29uZGlmZnBhdGNoL3NyYy9kYXRlLXJldml2ZXIuanMiLCIvc291cmNlLWZpbGVzL2pzb25kaWZmcGF0Y2gvc3JjL2RpZmZwYXRjaGVyLmpzIiwiL3NvdXJjZS1maWxlcy9qc29uZGlmZnBhdGNoL3NyYy9maWx0ZXJzL2FycmF5cy5qcyIsIi9zb3VyY2UtZmlsZXMvanNvbmRpZmZwYXRjaC9zcmMvZmlsdGVycy9kYXRlcy5qcyIsIi9zb3VyY2UtZmlsZXMvanNvbmRpZmZwYXRjaC9zcmMvZmlsdGVycy9sY3MuanMiLCIvc291cmNlLWZpbGVzL2pzb25kaWZmcGF0Y2gvc3JjL2ZpbHRlcnMvbmVzdGVkLmpzIiwiL3NvdXJjZS1maWxlcy9qc29uZGlmZnBhdGNoL3NyYy9maWx0ZXJzL3RleHRzLmpzIiwiL3NvdXJjZS1maWxlcy9qc29uZGlmZnBhdGNoL3NyYy9maWx0ZXJzL3RyaXZpYWwuanMiLCIvc291cmNlLWZpbGVzL2pzb25kaWZmcGF0Y2gvc3JjL3BpcGUuanMiLCIvc291cmNlLWZpbGVzL2pzb25kaWZmcGF0Y2gvc3JjL3Byb2Nlc3Nvci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvV0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbEdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5R0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiKGZ1bmN0aW9uIChwcm9jZXNzKXtcblxudmFyIERpZmZQYXRjaGVyID0gcmVxdWlyZSgnLi9kaWZmcGF0Y2hlcicpLkRpZmZQYXRjaGVyO1xuZXhwb3J0cy5EaWZmUGF0Y2hlciA9IERpZmZQYXRjaGVyO1xuXG5leHBvcnRzLmNyZWF0ZSA9IGZ1bmN0aW9uKG9wdGlvbnMpe1xuXHRyZXR1cm4gbmV3IERpZmZQYXRjaGVyKG9wdGlvbnMpO1xufTtcblxuZXhwb3J0cy5kYXRlUmV2aXZlciA9IHJlcXVpcmUoJy4vZGF0ZS1yZXZpdmVyJyk7XG5cbnZhciBkZWZhdWx0SW5zdGFuY2U7XG5cbmV4cG9ydHMuZGlmZiA9IGZ1bmN0aW9uKCkge1xuXHRpZiAoIWRlZmF1bHRJbnN0YW5jZSkge1xuXHRcdGRlZmF1bHRJbnN0YW5jZSA9IG5ldyBEaWZmUGF0Y2hlcigpO1xuXHR9XG5cdHJldHVybiBkZWZhdWx0SW5zdGFuY2UuZGlmZi5hcHBseShkZWZhdWx0SW5zdGFuY2UsIGFyZ3VtZW50cyk7XG59O1xuXG5leHBvcnRzLnBhdGNoID0gZnVuY3Rpb24oKSB7XG5cdGlmICghZGVmYXVsdEluc3RhbmNlKSB7XG5cdFx0ZGVmYXVsdEluc3RhbmNlID0gbmV3IERpZmZQYXRjaGVyKCk7XG5cdH1cblx0cmV0dXJuIGRlZmF1bHRJbnN0YW5jZS5wYXRjaC5hcHBseShkZWZhdWx0SW5zdGFuY2UsIGFyZ3VtZW50cyk7XG59O1xuXG5leHBvcnRzLnVucGF0Y2ggPSBmdW5jdGlvbigpIHtcblx0aWYgKCFkZWZhdWx0SW5zdGFuY2UpIHtcblx0XHRkZWZhdWx0SW5zdGFuY2UgPSBuZXcgRGlmZlBhdGNoZXIoKTtcblx0fVxuXHRyZXR1cm4gZGVmYXVsdEluc3RhbmNlLnVucGF0Y2guYXBwbHkoZGVmYXVsdEluc3RhbmNlLCBhcmd1bWVudHMpO1xufTtcblxuZXhwb3J0cy5yZXZlcnNlID0gZnVuY3Rpb24oKSB7XG5cdGlmICghZGVmYXVsdEluc3RhbmNlKSB7XG5cdFx0ZGVmYXVsdEluc3RhbmNlID0gbmV3IERpZmZQYXRjaGVyKCk7XG5cdH1cblx0cmV0dXJuIGRlZmF1bHRJbnN0YW5jZS5yZXZlcnNlLmFwcGx5KGRlZmF1bHRJbnN0YW5jZSwgYXJndW1lbnRzKTtcbn07XG5cbmlmIChwcm9jZXNzLmJyb3dzZXIpIHtcblx0ZXhwb3J0cy5ob21lcGFnZSA9ICd7e3BhY2thZ2UtaG9tZXBhZ2V9fSc7XG5cdGV4cG9ydHMudmVyc2lvbiA9ICd7e3BhY2thZ2UtdmVyc2lvbn19Jztcbn0gZWxzZSB7XG5cdHZhciBwYWNrYWdlSW5mb01vZHVsZU5hbWUgPSAnLi4vcGFja2FnZS5qc29uJztcblx0dmFyIHBhY2thZ2VJbmZvID0gcmVxdWlyZShwYWNrYWdlSW5mb01vZHVsZU5hbWUpO1xuXHRleHBvcnRzLmhvbWVwYWdlID0gcGFja2FnZUluZm8uaG9tZXBhZ2U7XG5cdGV4cG9ydHMudmVyc2lvbiA9IHBhY2thZ2VJbmZvLnZlcnNpb247XG5cblx0dmFyIGZvcm1hdHRlck1vZHVsZU5hbWUgPSAnLi9mb3JtYXR0ZXJzJztcblx0dmFyIGZvcm1hdHRlcnMgPSByZXF1aXJlKGZvcm1hdHRlck1vZHVsZU5hbWUpO1xuXHRleHBvcnRzLmZvcm1hdHRlcnMgPSBmb3JtYXR0ZXJzO1xuXHQvLyBzaG9ydGN1dCBmb3IgY29uc29sZVxuXHRleHBvcnRzLmNvbnNvbGUgPSBmb3JtYXR0ZXJzLmNvbnNvbGU7XG59XG5cbn0pLmNhbGwodGhpcyxyZXF1aXJlKCdfcHJvY2VzcycpKSIsIi8vIHNoaW0gZm9yIHVzaW5nIHByb2Nlc3MgaW4gYnJvd3NlclxuXG52YXIgcHJvY2VzcyA9IG1vZHVsZS5leHBvcnRzID0ge307XG5cbnByb2Nlc3MubmV4dFRpY2sgPSAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBjYW5TZXRJbW1lZGlhdGUgPSB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJ1xuICAgICYmIHdpbmRvdy5zZXRJbW1lZGlhdGU7XG4gICAgdmFyIGNhblBvc3QgPSB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJ1xuICAgICYmIHdpbmRvdy5wb3N0TWVzc2FnZSAmJiB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lclxuICAgIDtcblxuICAgIGlmIChjYW5TZXRJbW1lZGlhdGUpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChmKSB7IHJldHVybiB3aW5kb3cuc2V0SW1tZWRpYXRlKGYpIH07XG4gICAgfVxuXG4gICAgaWYgKGNhblBvc3QpIHtcbiAgICAgICAgdmFyIHF1ZXVlID0gW107XG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgZnVuY3Rpb24gKGV2KSB7XG4gICAgICAgICAgICB2YXIgc291cmNlID0gZXYuc291cmNlO1xuICAgICAgICAgICAgaWYgKChzb3VyY2UgPT09IHdpbmRvdyB8fCBzb3VyY2UgPT09IG51bGwpICYmIGV2LmRhdGEgPT09ICdwcm9jZXNzLXRpY2snKSB7XG4gICAgICAgICAgICAgICAgZXYuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICAgICAgaWYgKHF1ZXVlLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGZuID0gcXVldWUuc2hpZnQoKTtcbiAgICAgICAgICAgICAgICAgICAgZm4oKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIHRydWUpO1xuXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiBuZXh0VGljayhmbikge1xuICAgICAgICAgICAgcXVldWUucHVzaChmbik7XG4gICAgICAgICAgICB3aW5kb3cucG9zdE1lc3NhZ2UoJ3Byb2Nlc3MtdGljaycsICcqJyk7XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgcmV0dXJuIGZ1bmN0aW9uIG5leHRUaWNrKGZuKSB7XG4gICAgICAgIHNldFRpbWVvdXQoZm4sIDApO1xuICAgIH07XG59KSgpO1xuXG5wcm9jZXNzLnRpdGxlID0gJ2Jyb3dzZXInO1xucHJvY2Vzcy5icm93c2VyID0gdHJ1ZTtcbnByb2Nlc3MuZW52ID0ge307XG5wcm9jZXNzLmFyZ3YgPSBbXTtcblxuZnVuY3Rpb24gbm9vcCgpIHt9XG5cbnByb2Nlc3Mub24gPSBub29wO1xucHJvY2Vzcy5hZGRMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLm9uY2UgPSBub29wO1xucHJvY2Vzcy5vZmYgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUFsbExpc3RlbmVycyA9IG5vb3A7XG5wcm9jZXNzLmVtaXQgPSBub29wO1xuXG5wcm9jZXNzLmJpbmRpbmcgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5iaW5kaW5nIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn1cblxuLy8gVE9ETyhzaHR5bG1hbilcbnByb2Nlc3MuY3dkID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gJy8nIH07XG5wcm9jZXNzLmNoZGlyID0gZnVuY3Rpb24gKGRpcikge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5jaGRpciBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xuIiwiXG52YXIgUGlwZSA9IHJlcXVpcmUoJy4uL3BpcGUnKS5QaXBlO1xuXG52YXIgQ29udGV4dCA9IGZ1bmN0aW9uIENvbnRleHQoKXtcbn07XG5cbkNvbnRleHQucHJvdG90eXBlLnNldFJlc3VsdCA9IGZ1bmN0aW9uKHJlc3VsdCkge1xuXHR0aGlzLnJlc3VsdCA9IHJlc3VsdDtcblx0dGhpcy5oYXNSZXN1bHQgPSB0cnVlO1xuXHRyZXR1cm4gdGhpcztcbn07XG5cbkNvbnRleHQucHJvdG90eXBlLmV4aXQgPSBmdW5jdGlvbigpIHtcblx0dGhpcy5leGl0aW5nID0gdHJ1ZTtcblx0cmV0dXJuIHRoaXM7XG59O1xuXG5Db250ZXh0LnByb3RvdHlwZS5zd2l0Y2hUbyA9IGZ1bmN0aW9uKG5leHQsIHBpcGUpIHtcblx0aWYgKHR5cGVvZiBuZXh0ID09PSAnc3RyaW5nJyB8fCBuZXh0IGluc3RhbmNlb2YgUGlwZSkge1xuXHRcdHRoaXMubmV4dFBpcGUgPSBuZXh0O1xuXHR9IGVsc2Uge1xuXHRcdHRoaXMubmV4dCA9IG5leHQ7XG5cdFx0aWYgKHBpcGUpIHtcblx0XHRcdHRoaXMubmV4dFBpcGUgPSBwaXBlO1xuXHRcdH1cblx0fVxuXHRyZXR1cm4gdGhpcztcbn07XG5cbkNvbnRleHQucHJvdG90eXBlLnB1c2ggPSBmdW5jdGlvbihjaGlsZCwgbmFtZSkge1xuXHRjaGlsZC5wYXJlbnQgPSB0aGlzO1xuXHRpZiAodHlwZW9mIG5hbWUgIT09ICd1bmRlZmluZWQnKSB7XG5cdFx0Y2hpbGQuY2hpbGROYW1lID0gbmFtZTtcblx0fVxuXHRjaGlsZC5yb290ID0gdGhpcy5yb290IHx8IHRoaXM7XG5cdGNoaWxkLm9wdGlvbnMgPSBjaGlsZC5vcHRpb25zIHx8IHRoaXMub3B0aW9ucztcblx0aWYgKCF0aGlzLmNoaWxkcmVuKSB7XG5cdFx0dGhpcy5jaGlsZHJlbiA9IFtjaGlsZF07XG5cdFx0dGhpcy5uZXh0QWZ0ZXJDaGlsZHJlbiA9IHRoaXMubmV4dCB8fCBudWxsO1xuXHRcdHRoaXMubmV4dCA9IGNoaWxkO1xuXHR9IGVsc2Uge1xuXHRcdHRoaXMuY2hpbGRyZW5bdGhpcy5jaGlsZHJlbi5sZW5ndGggLSAxXS5uZXh0ID0gY2hpbGQ7XG5cdFx0dGhpcy5jaGlsZHJlbi5wdXNoKGNoaWxkKTtcblx0fVxuXHRjaGlsZC5uZXh0ID0gdGhpcztcblx0cmV0dXJuIHRoaXM7XG59O1xuXG5leHBvcnRzLkNvbnRleHQgPSBDb250ZXh0OyIsIlxudmFyIENvbnRleHQgPSByZXF1aXJlKCcuL2NvbnRleHQnKS5Db250ZXh0O1xuXG52YXIgRGlmZkNvbnRleHQgPSBmdW5jdGlvbiBEaWZmQ29udGV4dChsZWZ0LCByaWdodCl7XG4gICAgdGhpcy5sZWZ0ID0gbGVmdDtcbiAgICB0aGlzLnJpZ2h0ID0gcmlnaHQ7XG4gICAgdGhpcy5waXBlID0gJ2RpZmYnO1xufTtcblxuRGlmZkNvbnRleHQucHJvdG90eXBlID0gbmV3IENvbnRleHQoKTtcblxuZXhwb3J0cy5EaWZmQ29udGV4dCA9IERpZmZDb250ZXh0OyIsIlxudmFyIENvbnRleHQgPSByZXF1aXJlKCcuL2NvbnRleHQnKS5Db250ZXh0O1xuXG52YXIgUGF0Y2hDb250ZXh0ID0gZnVuY3Rpb24gUGF0Y2hDb250ZXh0KGxlZnQsIGRlbHRhKXtcbiAgICB0aGlzLmxlZnQgPSBsZWZ0O1xuICAgIHRoaXMuZGVsdGEgPSBkZWx0YTtcbiAgICB0aGlzLnBpcGUgPSAncGF0Y2gnO1xufTtcblxuUGF0Y2hDb250ZXh0LnByb3RvdHlwZSA9IG5ldyBDb250ZXh0KCk7XG5cbmV4cG9ydHMuUGF0Y2hDb250ZXh0ID0gUGF0Y2hDb250ZXh0OyIsIlxudmFyIENvbnRleHQgPSByZXF1aXJlKCcuL2NvbnRleHQnKS5Db250ZXh0O1xuXG52YXIgUmV2ZXJzZUNvbnRleHQgPSBmdW5jdGlvbiBSZXZlcnNlQ29udGV4dChkZWx0YSl7XG4gICAgdGhpcy5kZWx0YSA9IGRlbHRhO1xuICAgIHRoaXMucGlwZSA9ICdyZXZlcnNlJztcbn07XG5cblJldmVyc2VDb250ZXh0LnByb3RvdHlwZSA9IG5ldyBDb250ZXh0KCk7XG5cbmV4cG9ydHMuUmV2ZXJzZUNvbnRleHQgPSBSZXZlcnNlQ29udGV4dDsiLCJcbi8vIHVzZSBhcyAybmQgcGFyYW1ldGVyIGZvciBKU09OLnBhcnNlIHRvIHJldml2ZSBEYXRlIGluc3RhbmNlc1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBkYXRlUmV2aXZlcihrZXksIHZhbHVlKSB7XG4gICAgdmFyIHBhcnRzO1xuICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHBhcnRzID0gL14oXFxkezR9KS0oXFxkezJ9KS0oXFxkezJ9KVQoXFxkezJ9KTooXFxkezJ9KTooXFxkezJ9KSg/OlxcLihcXGQqKSk/KFp8KFsrXFwtXSkoXFxkezJ9KTooXFxkezJ9KSkkLy5leGVjKHZhbHVlKTtcbiAgICAgICAgaWYgKHBhcnRzKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IERhdGUoRGF0ZS5VVEMoK3BhcnRzWzFdLCArcGFydHNbMl0gLSAxLCArcGFydHNbM10sXG4gICAgICAgICAgICAgICtwYXJ0c1s0XSwgK3BhcnRzWzVdLCArcGFydHNbNl0sICsocGFydHNbN10gfHwgMCkpKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdmFsdWU7XG59O1xuIiwiXG52YXIgUHJvY2Vzc29yID0gcmVxdWlyZSgnLi9wcm9jZXNzb3InKS5Qcm9jZXNzb3I7XG52YXIgUGlwZSA9IHJlcXVpcmUoJy4vcGlwZScpLlBpcGU7XG52YXIgRGlmZkNvbnRleHQgPSByZXF1aXJlKCcuL2NvbnRleHRzL2RpZmYnKS5EaWZmQ29udGV4dDtcbnZhciBQYXRjaENvbnRleHQgPSByZXF1aXJlKCcuL2NvbnRleHRzL3BhdGNoJykuUGF0Y2hDb250ZXh0O1xudmFyIFJldmVyc2VDb250ZXh0ID0gcmVxdWlyZSgnLi9jb250ZXh0cy9yZXZlcnNlJykuUmV2ZXJzZUNvbnRleHQ7XG5cbnZhciB0cml2aWFsID0gcmVxdWlyZSgnLi9maWx0ZXJzL3RyaXZpYWwnKTtcbnZhciBuZXN0ZWQgPSByZXF1aXJlKCcuL2ZpbHRlcnMvbmVzdGVkJyk7XG52YXIgYXJyYXlzID0gcmVxdWlyZSgnLi9maWx0ZXJzL2FycmF5cycpO1xudmFyIGRhdGVzID0gcmVxdWlyZSgnLi9maWx0ZXJzL2RhdGVzJyk7XG52YXIgdGV4dHMgPSByZXF1aXJlKCcuL2ZpbHRlcnMvdGV4dHMnKTtcblxudmFyIERpZmZQYXRjaGVyID0gZnVuY3Rpb24gRGlmZlBhdGNoZXIob3B0aW9ucyl7XG4gICAgdGhpcy5wcm9jZXNzb3IgPSBuZXcgUHJvY2Vzc29yKG9wdGlvbnMpO1xuICAgIHRoaXMucHJvY2Vzc29yLnBpcGUobmV3IFBpcGUoJ2RpZmYnKS5hcHBlbmQoXG4gICAgICAgIG5lc3RlZC5jb2xsZWN0Q2hpbGRyZW5EaWZmRmlsdGVyLFxuICAgICAgICB0cml2aWFsLmRpZmZGaWx0ZXIsXG4gICAgICAgIGRhdGVzLmRpZmZGaWx0ZXIsXG4gICAgICAgIHRleHRzLmRpZmZGaWx0ZXIsXG4gICAgICAgIG5lc3RlZC5vYmplY3RzRGlmZkZpbHRlcixcbiAgICAgICAgYXJyYXlzLmRpZmZGaWx0ZXJcbiAgICAgICAgKS5zaG91bGRIYXZlUmVzdWx0KCkpO1xuICAgIHRoaXMucHJvY2Vzc29yLnBpcGUobmV3IFBpcGUoJ3BhdGNoJykuYXBwZW5kKFxuICAgICAgICBuZXN0ZWQuY29sbGVjdENoaWxkcmVuUGF0Y2hGaWx0ZXIsXG4gICAgICAgIGFycmF5cy5jb2xsZWN0Q2hpbGRyZW5QYXRjaEZpbHRlcixcbiAgICAgICAgdHJpdmlhbC5wYXRjaEZpbHRlcixcbiAgICAgICAgdGV4dHMucGF0Y2hGaWx0ZXIsXG4gICAgICAgIG5lc3RlZC5wYXRjaEZpbHRlcixcbiAgICAgICAgYXJyYXlzLnBhdGNoRmlsdGVyXG4gICAgICAgICkuc2hvdWxkSGF2ZVJlc3VsdCgpKTtcbiAgICB0aGlzLnByb2Nlc3Nvci5waXBlKG5ldyBQaXBlKCdyZXZlcnNlJykuYXBwZW5kKFxuICAgICAgICBuZXN0ZWQuY29sbGVjdENoaWxkcmVuUmV2ZXJzZUZpbHRlcixcbiAgICAgICAgYXJyYXlzLmNvbGxlY3RDaGlsZHJlblJldmVyc2VGaWx0ZXIsXG4gICAgICAgIHRyaXZpYWwucmV2ZXJzZUZpbHRlcixcbiAgICAgICAgdGV4dHMucmV2ZXJzZUZpbHRlcixcbiAgICAgICAgbmVzdGVkLnJldmVyc2VGaWx0ZXIsXG4gICAgICAgIGFycmF5cy5yZXZlcnNlRmlsdGVyXG4gICAgICAgICkuc2hvdWxkSGF2ZVJlc3VsdCgpKTtcbn07XG5cbkRpZmZQYXRjaGVyLnByb3RvdHlwZS5vcHRpb25zID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMucHJvY2Vzc29yLm9wdGlvbnMuYXBwbHkodGhpcy5wcm9jZXNzb3IsIGFyZ3VtZW50cyk7XG59O1xuXG5EaWZmUGF0Y2hlci5wcm90b3R5cGUuZGlmZiA9IGZ1bmN0aW9uKGxlZnQsIHJpZ2h0KSB7XG4gICAgcmV0dXJuIHRoaXMucHJvY2Vzc29yLnByb2Nlc3MobmV3IERpZmZDb250ZXh0KGxlZnQsIHJpZ2h0KSk7XG59O1xuXG5EaWZmUGF0Y2hlci5wcm90b3R5cGUucGF0Y2ggPSBmdW5jdGlvbihsZWZ0LCBkZWx0YSkge1xuICAgIHJldHVybiB0aGlzLnByb2Nlc3Nvci5wcm9jZXNzKG5ldyBQYXRjaENvbnRleHQobGVmdCwgZGVsdGEpKTtcbn07XG5cbkRpZmZQYXRjaGVyLnByb3RvdHlwZS5yZXZlcnNlID0gZnVuY3Rpb24oZGVsdGEpIHtcbiAgICByZXR1cm4gdGhpcy5wcm9jZXNzb3IucHJvY2VzcyhuZXcgUmV2ZXJzZUNvbnRleHQoZGVsdGEpKTtcbn07XG5cbkRpZmZQYXRjaGVyLnByb3RvdHlwZS51bnBhdGNoID0gZnVuY3Rpb24ocmlnaHQsIGRlbHRhKSB7XG4gICAgcmV0dXJuIHRoaXMucGF0Y2gocmlnaHQsIHRoaXMucmV2ZXJzZShkZWx0YSkpO1xufTtcblxuZXhwb3J0cy5EaWZmUGF0Y2hlciA9IERpZmZQYXRjaGVyO1xuIiwiXG52YXIgRGlmZkNvbnRleHQgPSByZXF1aXJlKCcuLi9jb250ZXh0cy9kaWZmJykuRGlmZkNvbnRleHQ7XG52YXIgUGF0Y2hDb250ZXh0ID0gcmVxdWlyZSgnLi4vY29udGV4dHMvcGF0Y2gnKS5QYXRjaENvbnRleHQ7XG52YXIgUmV2ZXJzZUNvbnRleHQgPSByZXF1aXJlKCcuLi9jb250ZXh0cy9yZXZlcnNlJykuUmV2ZXJzZUNvbnRleHQ7XG5cbnZhciBsY3MgPSByZXF1aXJlKCcuL2xjcycpO1xuXG52YXIgQVJSQVlfTU9WRSA9IDM7XG5cbnZhciBpc0FycmF5ID0gKHR5cGVvZiBBcnJheS5pc0FycmF5ID09PSAnZnVuY3Rpb24nKSA/XG4gICAgLy8gdXNlIG5hdGl2ZSBmdW5jdGlvblxuICAgIEFycmF5LmlzQXJyYXkgOlxuICAgIC8vIHVzZSBpbnN0YW5jZW9mIG9wZXJhdG9yXG4gICAgZnVuY3Rpb24oYSkge1xuICAgICAgICByZXR1cm4gYSBpbnN0YW5jZW9mIEFycmF5O1xuICAgIH07XG5cbnZhciBhcnJheUluZGV4T2YgPSB0eXBlb2YgQXJyYXkucHJvdG90eXBlLmluZGV4T2YgPT09ICdmdW5jdGlvbicgP1xuICAgIGZ1bmN0aW9uKGFycmF5LCBpdGVtKSB7XG4gICAgICAgIHJldHVybiBhcnJheS5pbmRleE9mKGl0ZW0pO1xuICAgIH0gOiBmdW5jdGlvbihhcnJheSwgaXRlbSkge1xuICAgICAgICB2YXIgbGVuZ3RoID0gYXJyYXkubGVuZ3RoO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoYXJyYXlbaV0gPT09IGl0ZW0pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gLTE7XG4gICAgfTtcblxudmFyIGRpZmZGaWx0ZXIgPSBmdW5jdGlvbiBhcnJheXNEaWZmRmlsdGVyKGNvbnRleHQpe1xuICAgIGlmICghY29udGV4dC5sZWZ0SXNBcnJheSkgeyByZXR1cm47IH1cblxuICAgIHZhciBvYmplY3RIYXNoID0gY29udGV4dC5vcHRpb25zICYmIGNvbnRleHQub3B0aW9ucy5vYmplY3RIYXNoO1xuXG4gICAgdmFyIG1hdGNoID0gZnVuY3Rpb24oYXJyYXkxLCBhcnJheTIsIGluZGV4MSwgaW5kZXgyLCBjb250ZXh0KSB7XG4gICAgICAgIHZhciB2YWx1ZTEgPSBhcnJheTFbaW5kZXgxXTtcbiAgICAgICAgdmFyIHZhbHVlMiA9IGFycmF5MltpbmRleDJdO1xuICAgICAgICBpZiAodmFsdWUxID09PSB2YWx1ZTIpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0eXBlb2YgdmFsdWUxICE9PSAnb2JqZWN0JyB8fCB0eXBlb2YgdmFsdWUyICE9PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGlmICghb2JqZWN0SGFzaCkgeyByZXR1cm4gZmFsc2U7IH1cbiAgICAgICAgdmFyIGhhc2gxLCBoYXNoMjtcbiAgICAgICAgaWYgKHR5cGVvZiBpbmRleDEgPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICBjb250ZXh0Lmhhc2hDYWNoZTEgPSBjb250ZXh0Lmhhc2hDYWNoZTEgfHwgW107XG4gICAgICAgICAgICBoYXNoMSA9IGNvbnRleHQuaGFzaENhY2hlMVtpbmRleDFdO1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBoYXNoMSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICBjb250ZXh0Lmhhc2hDYWNoZTFbaW5kZXgxXSA9IGhhc2gxID0gb2JqZWN0SGFzaCh2YWx1ZTEsIGluZGV4MSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBoYXNoMSA9IG9iamVjdEhhc2godmFsdWUxKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodHlwZW9mIGhhc2gxID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0eXBlb2YgaW5kZXgyID09PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgY29udGV4dC5oYXNoQ2FjaGUyID0gY29udGV4dC5oYXNoQ2FjaGUyIHx8IFtdO1xuICAgICAgICAgICAgaGFzaDIgPSBjb250ZXh0Lmhhc2hDYWNoZTJbaW5kZXgyXTtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgaGFzaDIgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgY29udGV4dC5oYXNoQ2FjaGUyW2luZGV4Ml0gPSBoYXNoMiA9IG9iamVjdEhhc2godmFsdWUyLCBpbmRleDIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaGFzaDIgPSBvYmplY3RIYXNoKHZhbHVlMik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHR5cGVvZiBoYXNoMiA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gaGFzaDEgPT09IGhhc2gyO1xuICAgIH07XG5cbiAgICB2YXIgbWF0Y2hDb250ZXh0ID0ge307XG4gICAgdmFyIGNvbW1vbkhlYWQgPSAwLCBjb21tb25UYWlsID0gMCwgaW5kZXgsIGluZGV4MSwgaW5kZXgyO1xuICAgIHZhciBhcnJheTEgPSBjb250ZXh0LmxlZnQ7XG4gICAgdmFyIGFycmF5MiA9IGNvbnRleHQucmlnaHQ7XG4gICAgdmFyIGxlbjEgPSBhcnJheTEubGVuZ3RoO1xuICAgIHZhciBsZW4yID0gYXJyYXkyLmxlbmd0aDtcblxuICAgIHZhciBjaGlsZDtcblxuICAgIC8vIHNlcGFyYXRlIGNvbW1vbiBoZWFkXG4gICAgd2hpbGUgKGNvbW1vbkhlYWQgPCBsZW4xICYmIGNvbW1vbkhlYWQgPCBsZW4yICYmXG4gICAgICAgIG1hdGNoKGFycmF5MSwgYXJyYXkyLCBjb21tb25IZWFkLCBjb21tb25IZWFkLCBtYXRjaENvbnRleHQpKSB7XG4gICAgICAgIGluZGV4ID0gY29tbW9uSGVhZDtcbiAgICAgICAgY2hpbGQgPSBuZXcgRGlmZkNvbnRleHQoY29udGV4dC5sZWZ0W2luZGV4XSwgY29udGV4dC5yaWdodFtpbmRleF0pO1xuICAgICAgICBjb250ZXh0LnB1c2goY2hpbGQsIGluZGV4KTtcbiAgICAgICAgY29tbW9uSGVhZCsrO1xuICAgIH1cbiAgICAvLyBzZXBhcmF0ZSBjb21tb24gdGFpbFxuICAgIHdoaWxlIChjb21tb25UYWlsICsgY29tbW9uSGVhZCA8IGxlbjEgJiYgY29tbW9uVGFpbCArIGNvbW1vbkhlYWQgPCBsZW4yICYmXG4gICAgICAgIG1hdGNoKGFycmF5MSwgYXJyYXkyLCBsZW4xIC0gMSAtIGNvbW1vblRhaWwsIGxlbjIgLSAxIC0gY29tbW9uVGFpbCwgbWF0Y2hDb250ZXh0KSkge1xuICAgICAgICBpbmRleDEgPSBsZW4xIC0gMSAtIGNvbW1vblRhaWw7XG4gICAgICAgIGluZGV4MiA9IGxlbjIgLSAxIC0gY29tbW9uVGFpbDtcbiAgICAgICAgY2hpbGQgPSBuZXcgRGlmZkNvbnRleHQoY29udGV4dC5sZWZ0W2luZGV4MV0sIGNvbnRleHQucmlnaHRbaW5kZXgyXSk7XG4gICAgICAgIGNvbnRleHQucHVzaChjaGlsZCwgaW5kZXgyKTtcbiAgICAgICAgY29tbW9uVGFpbCsrO1xuICAgIH1cbiAgICB2YXIgcmVzdWx0O1xuICAgIGlmIChjb21tb25IZWFkICsgY29tbW9uVGFpbCA9PT0gbGVuMSkge1xuICAgICAgICBpZiAobGVuMSA9PT0gbGVuMikge1xuICAgICAgICAgICAgLy8gYXJyYXlzIGFyZSBpZGVudGljYWxcbiAgICAgICAgICAgIGNvbnRleHQuc2V0UmVzdWx0KHVuZGVmaW5lZCkuZXhpdCgpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIC8vIHRyaXZpYWwgY2FzZSwgYSBibG9jayAoMSBvciBtb3JlIGNvbnNlY3V0aXZlIGl0ZW1zKSB3YXMgYWRkZWRcbiAgICAgICAgcmVzdWx0ID0gcmVzdWx0IHx8IHsgX3Q6ICdhJyB9O1xuICAgICAgICBmb3IgKGluZGV4ID0gY29tbW9uSGVhZDsgaW5kZXggPCBsZW4yIC0gY29tbW9uVGFpbDsgaW5kZXgrKykge1xuICAgICAgICAgICAgcmVzdWx0W2luZGV4XSA9IFthcnJheTJbaW5kZXhdXTtcbiAgICAgICAgfVxuICAgICAgICBjb250ZXh0LnNldFJlc3VsdChyZXN1bHQpLmV4aXQoKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoY29tbW9uSGVhZCArIGNvbW1vblRhaWwgPT09IGxlbjIpIHtcbiAgICAgICAgLy8gdHJpdmlhbCBjYXNlLCBhIGJsb2NrICgxIG9yIG1vcmUgY29uc2VjdXRpdmUgaXRlbXMpIHdhcyByZW1vdmVkXG4gICAgICAgIHJlc3VsdCA9IHJlc3VsdCB8fCB7IF90OiAnYScgfTtcbiAgICAgICAgZm9yIChpbmRleCA9IGNvbW1vbkhlYWQ7IGluZGV4IDwgbGVuMSAtIGNvbW1vblRhaWw7IGluZGV4KyspIHtcbiAgICAgICAgICAgIHJlc3VsdFsnXycraW5kZXhdID0gW2FycmF5MVtpbmRleF0sIDAsIDBdO1xuICAgICAgICB9XG4gICAgICAgIGNvbnRleHQuc2V0UmVzdWx0KHJlc3VsdCkuZXhpdCgpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIC8vIHJlc2V0IGhhc2ggY2FjaGVcbiAgICBtYXRjaENvbnRleHQgPSB7fTtcbiAgICAvLyBkaWZmIGlzIG5vdCB0cml2aWFsLCBmaW5kIHRoZSBMQ1MgKExvbmdlc3QgQ29tbW9uIFN1YnNlcXVlbmNlKVxuICAgIHZhciB0cmltbWVkMSA9IGFycmF5MS5zbGljZShjb21tb25IZWFkLCBsZW4xIC0gY29tbW9uVGFpbCk7XG4gICAgdmFyIHRyaW1tZWQyID0gYXJyYXkyLnNsaWNlKGNvbW1vbkhlYWQsIGxlbjIgLSBjb21tb25UYWlsKTtcbiAgICB2YXIgc2VxID0gbGNzLmdldChcbiAgICAgICAgdHJpbW1lZDEsIHRyaW1tZWQyLFxuICAgICAgICBtYXRjaCxcbiAgICAgICAgbWF0Y2hDb250ZXh0XG4gICAgKTtcbiAgICB2YXIgcmVtb3ZlZEl0ZW1zID0gW107XG4gICAgcmVzdWx0ID0gcmVzdWx0IHx8IHsgX3Q6ICdhJyB9O1xuICAgIGZvciAoaW5kZXggPSBjb21tb25IZWFkOyBpbmRleCA8IGxlbjEgLSBjb21tb25UYWlsOyBpbmRleCsrKSB7XG4gICAgICAgIGlmIChhcnJheUluZGV4T2Yoc2VxLmluZGljZXMxLCBpbmRleCAtIGNvbW1vbkhlYWQpIDwgMCkge1xuICAgICAgICAgICAgLy8gcmVtb3ZlZFxuICAgICAgICAgICAgcmVzdWx0WydfJytpbmRleF0gPSBbYXJyYXkxW2luZGV4XSwgMCwgMF07XG4gICAgICAgICAgICByZW1vdmVkSXRlbXMucHVzaChpbmRleCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgZGV0ZWN0TW92ZSA9IHRydWU7XG4gICAgaWYgKGNvbnRleHQub3B0aW9ucyAmJiBjb250ZXh0Lm9wdGlvbnMuYXJyYXlzICYmIGNvbnRleHQub3B0aW9ucy5hcnJheXMuZGV0ZWN0TW92ZSA9PT0gZmFsc2UpIHtcbiAgICAgICAgZGV0ZWN0TW92ZSA9IGZhbHNlO1xuICAgIH1cbiAgICB2YXIgaW5jbHVkZVZhbHVlT25Nb3ZlID0gZmFsc2U7XG4gICAgaWYgKGNvbnRleHQub3B0aW9ucyAmJiBjb250ZXh0Lm9wdGlvbnMuYXJyYXlzICYmIGNvbnRleHQub3B0aW9ucy5hcnJheXMuaW5jbHVkZVZhbHVlT25Nb3ZlKSB7XG4gICAgICAgIGluY2x1ZGVWYWx1ZU9uTW92ZSA9IHRydWU7XG4gICAgfVxuXG4gICAgdmFyIHJlbW92ZWRJdGVtc0xlbmd0aCA9IHJlbW92ZWRJdGVtcy5sZW5ndGg7XG4gICAgZm9yIChpbmRleCA9IGNvbW1vbkhlYWQ7IGluZGV4IDwgbGVuMiAtIGNvbW1vblRhaWw7IGluZGV4KyspIHtcbiAgICAgICAgdmFyIGluZGV4T25BcnJheTIgPSBhcnJheUluZGV4T2Yoc2VxLmluZGljZXMyLCBpbmRleCAtIGNvbW1vbkhlYWQpO1xuICAgICAgICBpZiAoaW5kZXhPbkFycmF5MiA8IDApIHtcbiAgICAgICAgICAgIC8vIGFkZGVkLCB0cnkgdG8gbWF0Y2ggd2l0aCBhIHJlbW92ZWQgaXRlbSBhbmQgcmVnaXN0ZXIgYXMgcG9zaXRpb24gbW92ZVxuICAgICAgICAgICAgdmFyIGlzTW92ZSA9IGZhbHNlO1xuICAgICAgICAgICAgaWYgKGRldGVjdE1vdmUgJiYgcmVtb3ZlZEl0ZW1zTGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIGZvciAodmFyIHJlbW92ZUl0ZW1JbmRleDEgPSAwOyByZW1vdmVJdGVtSW5kZXgxIDwgcmVtb3ZlZEl0ZW1zTGVuZ3RoOyByZW1vdmVJdGVtSW5kZXgxKyspIHtcbiAgICAgICAgICAgICAgICAgICAgaW5kZXgxID0gcmVtb3ZlZEl0ZW1zW3JlbW92ZUl0ZW1JbmRleDFdO1xuICAgICAgICAgICAgICAgICAgICBpZiAobWF0Y2godHJpbW1lZDEsIHRyaW1tZWQyLCBpbmRleDEgLSBjb21tb25IZWFkLFxuICAgICAgICAgICAgICAgICAgICAgICAgaW5kZXggLSBjb21tb25IZWFkLCBtYXRjaENvbnRleHQpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBzdG9yZSBwb3NpdGlvbiBtb3ZlIGFzOiBbb3JpZ2luYWxWYWx1ZSwgbmV3UG9zaXRpb24sIEFSUkFZX01PVkVdXG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHRbJ18nICsgaW5kZXgxXS5zcGxpY2UoMSwgMiwgaW5kZXgsIEFSUkFZX01PVkUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFpbmNsdWRlVmFsdWVPbk1vdmUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBkb24ndCBpbmNsdWRlIG1vdmVkIHZhbHVlIG9uIGRpZmYsIHRvIHNhdmUgYnl0ZXNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHRbJ18nICsgaW5kZXgxXVswXSA9ICcnO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICBpbmRleDIgPSBpbmRleDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkID0gbmV3IERpZmZDb250ZXh0KGNvbnRleHQubGVmdFtpbmRleDFdLCBjb250ZXh0LnJpZ2h0W2luZGV4Ml0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dC5wdXNoKGNoaWxkLCBpbmRleDIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVtb3ZlZEl0ZW1zLnNwbGljZShyZW1vdmVJdGVtSW5kZXgxLCAxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzTW92ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghaXNNb3ZlKSB7XG4gICAgICAgICAgICAgICAgLy8gYWRkZWRcbiAgICAgICAgICAgICAgICByZXN1bHRbaW5kZXhdID0gW2FycmF5MltpbmRleF1dO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gbWF0Y2gsIGRvIGlubmVyIGRpZmZcbiAgICAgICAgICAgIGluZGV4MSA9IHNlcS5pbmRpY2VzMVtpbmRleE9uQXJyYXkyXSArIGNvbW1vbkhlYWQ7XG4gICAgICAgICAgICBpbmRleDIgPSBzZXEuaW5kaWNlczJbaW5kZXhPbkFycmF5Ml0gKyBjb21tb25IZWFkO1xuICAgICAgICAgICAgY2hpbGQgPSBuZXcgRGlmZkNvbnRleHQoY29udGV4dC5sZWZ0W2luZGV4MV0sIGNvbnRleHQucmlnaHRbaW5kZXgyXSk7XG4gICAgICAgICAgICBjb250ZXh0LnB1c2goY2hpbGQsIGluZGV4Mik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb250ZXh0LnNldFJlc3VsdChyZXN1bHQpLmV4aXQoKTtcblxufTtcbmRpZmZGaWx0ZXIuZmlsdGVyTmFtZSA9ICdhcnJheXMnO1xuXG52YXIgY29tcGFyZSA9IHtcbiAgICBudW1lcmljYWxseTogZnVuY3Rpb24oYSwgYikge1xuICAgICAgICByZXR1cm4gYSAtIGI7XG4gICAgfSxcbiAgICBudW1lcmljYWxseUJ5OiBmdW5jdGlvbihuYW1lKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbihhLCBiKSB7XG4gICAgICAgICAgICByZXR1cm4gYVtuYW1lXSAtIGJbbmFtZV07XG4gICAgICAgIH07XG4gICAgfVxufTtcblxudmFyIHBhdGNoRmlsdGVyID0gZnVuY3Rpb24gbmVzdGVkUGF0Y2hGaWx0ZXIoY29udGV4dCkge1xuICAgIGlmICghY29udGV4dC5uZXN0ZWQpIHsgcmV0dXJuOyB9XG4gICAgaWYgKGNvbnRleHQuZGVsdGEuX3QgIT09ICdhJykgeyByZXR1cm47IH1cbiAgICB2YXIgaW5kZXgsIGluZGV4MTtcblxuICAgIHZhciBkZWx0YSA9IGNvbnRleHQuZGVsdGE7XG4gICAgdmFyIGFycmF5ID0gY29udGV4dC5sZWZ0O1xuXG4gICAgLy8gZmlyc3QsIHNlcGFyYXRlIHJlbW92YWxzLCBpbnNlcnRpb25zIGFuZCBtb2RpZmljYXRpb25zXG4gICAgdmFyIHRvUmVtb3ZlID0gW107XG4gICAgdmFyIHRvSW5zZXJ0ID0gW107XG4gICAgdmFyIHRvTW9kaWZ5ID0gW107XG4gICAgZm9yIChpbmRleCBpbiBkZWx0YSkge1xuICAgICAgICBpZiAoaW5kZXggIT09ICdfdCcpIHtcbiAgICAgICAgICAgIGlmIChpbmRleFswXSA9PT0gJ18nKSB7XG4gICAgICAgICAgICAgICAgLy8gcmVtb3ZlZCBpdGVtIGZyb20gb3JpZ2luYWwgYXJyYXlcbiAgICAgICAgICAgICAgICBpZiAoZGVsdGFbaW5kZXhdWzJdID09PSAwIHx8IGRlbHRhW2luZGV4XVsyXSA9PT0gQVJSQVlfTU9WRSkge1xuICAgICAgICAgICAgICAgICAgICB0b1JlbW92ZS5wdXNoKHBhcnNlSW50KGluZGV4LnNsaWNlKDEpLCAxMCkpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignb25seSByZW1vdmFsIG9yIG1vdmUgY2FuIGJlIGFwcGxpZWQgYXQgb3JpZ2luYWwgYXJyYXkgaW5kaWNlcycgK1xuICAgICAgICAgICAgICAgICAgICAgICAgJywgaW52YWxpZCBkaWZmIHR5cGU6ICcgKyBkZWx0YVtpbmRleF1bMl0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKGRlbHRhW2luZGV4XS5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gYWRkZWQgaXRlbSBhdCBuZXcgYXJyYXlcbiAgICAgICAgICAgICAgICAgICAgdG9JbnNlcnQucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgICAgICBpbmRleDogcGFyc2VJbnQoaW5kZXgsIDEwKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBkZWx0YVtpbmRleF1bMF1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gbW9kaWZpZWQgaXRlbSBhdCBuZXcgYXJyYXlcbiAgICAgICAgICAgICAgICAgICAgdG9Nb2RpZnkucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgICAgICBpbmRleDogcGFyc2VJbnQoaW5kZXgsIDEwKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlbHRhOiBkZWx0YVtpbmRleF1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gcmVtb3ZlIGl0ZW1zLCBpbiByZXZlcnNlIG9yZGVyIHRvIGF2b2lkIHNhd2luZyBvdXIgb3duIGZsb29yXG4gICAgdG9SZW1vdmUgPSB0b1JlbW92ZS5zb3J0KGNvbXBhcmUubnVtZXJpY2FsbHkpO1xuICAgIGZvciAoaW5kZXggPSB0b1JlbW92ZS5sZW5ndGggLSAxOyBpbmRleCA+PSAwOyBpbmRleC0tKSB7XG4gICAgICAgIGluZGV4MSA9IHRvUmVtb3ZlW2luZGV4XTtcbiAgICAgICAgdmFyIGluZGV4RGlmZiA9IGRlbHRhWydfJyArIGluZGV4MV07XG4gICAgICAgIHZhciByZW1vdmVkVmFsdWUgPSBhcnJheS5zcGxpY2UoaW5kZXgxLCAxKVswXTtcbiAgICAgICAgaWYgKGluZGV4RGlmZlsyXSA9PT0gQVJSQVlfTU9WRSkge1xuICAgICAgICAgICAgLy8gcmVpbnNlcnQgbGF0ZXJcbiAgICAgICAgICAgIHRvSW5zZXJ0LnB1c2goe1xuICAgICAgICAgICAgICAgIGluZGV4OiBpbmRleERpZmZbMV0sXG4gICAgICAgICAgICAgICAgdmFsdWU6IHJlbW92ZWRWYWx1ZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBpbnNlcnQgaXRlbXMsIGluIHJldmVyc2Ugb3JkZXIgdG8gYXZvaWQgbW92aW5nIG91ciBvd24gZmxvb3JcbiAgICB0b0luc2VydCA9IHRvSW5zZXJ0LnNvcnQoY29tcGFyZS5udW1lcmljYWxseUJ5KCdpbmRleCcpKTtcbiAgICB2YXIgdG9JbnNlcnRMZW5ndGggPSB0b0luc2VydC5sZW5ndGg7XG4gICAgZm9yIChpbmRleCA9IDA7IGluZGV4IDwgdG9JbnNlcnRMZW5ndGg7IGluZGV4KyspIHtcbiAgICAgICAgdmFyIGluc2VydGlvbiA9IHRvSW5zZXJ0W2luZGV4XTtcbiAgICAgICAgYXJyYXkuc3BsaWNlKGluc2VydGlvbi5pbmRleCwgMCwgaW5zZXJ0aW9uLnZhbHVlKTtcbiAgICB9XG5cbiAgICAvLyBhcHBseSBtb2RpZmljYXRpb25zXG4gICAgdmFyIHRvTW9kaWZ5TGVuZ3RoID0gdG9Nb2RpZnkubGVuZ3RoO1xuICAgIHZhciBjaGlsZDtcbiAgICBpZiAodG9Nb2RpZnlMZW5ndGggPiAwKSB7XG4gICAgICAgIGZvciAoaW5kZXggPSAwOyBpbmRleCA8IHRvTW9kaWZ5TGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgICAgICAgICB2YXIgbW9kaWZpY2F0aW9uID0gdG9Nb2RpZnlbaW5kZXhdO1xuICAgICAgICAgICAgY2hpbGQgPSBuZXcgUGF0Y2hDb250ZXh0KGNvbnRleHQubGVmdFttb2RpZmljYXRpb24uaW5kZXhdLCBtb2RpZmljYXRpb24uZGVsdGEpO1xuICAgICAgICAgICAgY29udGV4dC5wdXNoKGNoaWxkLCBtb2RpZmljYXRpb24uaW5kZXgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaWYgKCFjb250ZXh0LmNoaWxkcmVuKSB7XG4gICAgICAgIGNvbnRleHQuc2V0UmVzdWx0KGNvbnRleHQubGVmdCkuZXhpdCgpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnRleHQuZXhpdCgpO1xufTtcbnBhdGNoRmlsdGVyLmZpbHRlck5hbWUgPSAnYXJyYXlzJztcblxudmFyIGNvbGxlY3RDaGlsZHJlblBhdGNoRmlsdGVyID0gZnVuY3Rpb24gY29sbGVjdENoaWxkcmVuUGF0Y2hGaWx0ZXIoY29udGV4dCkge1xuICAgIGlmICghY29udGV4dCB8fCAhY29udGV4dC5jaGlsZHJlbikgeyByZXR1cm47IH1cbiAgICBpZiAoY29udGV4dC5kZWx0YS5fdCAhPT0gJ2EnKSB7IHJldHVybjsgfVxuICAgIHZhciBsZW5ndGggPSBjb250ZXh0LmNoaWxkcmVuLmxlbmd0aDtcbiAgICB2YXIgY2hpbGQ7XG4gICAgZm9yICh2YXIgaW5kZXggPSAwOyBpbmRleCA8IGxlbmd0aDsgaW5kZXgrKykge1xuICAgICAgICBjaGlsZCA9IGNvbnRleHQuY2hpbGRyZW5baW5kZXhdO1xuICAgICAgICBjb250ZXh0LmxlZnRbY2hpbGQuY2hpbGROYW1lXSA9IGNoaWxkLnJlc3VsdDtcbiAgICB9XG4gICAgY29udGV4dC5zZXRSZXN1bHQoY29udGV4dC5sZWZ0KS5leGl0KCk7XG59O1xuY29sbGVjdENoaWxkcmVuUGF0Y2hGaWx0ZXIuZmlsdGVyTmFtZSA9ICdhcnJheXNDb2xsZWN0Q2hpbGRyZW4nO1xuXG52YXIgcmV2ZXJzZUZpbHRlciA9IGZ1bmN0aW9uIGFycmF5c1JldmVyc2VGaWx0ZXIoY29udGV4dCkge1xuICAgIGlmICghY29udGV4dC5uZXN0ZWQpIHtcbiAgICAgICAgaWYgKGNvbnRleHQuZGVsdGFbMl0gPT09IEFSUkFZX01PVkUpIHtcbiAgICAgICAgICAgIGNvbnRleHQubmV3TmFtZSA9ICdfJyArIGNvbnRleHQuZGVsdGFbMV07XG4gICAgICAgICAgICBjb250ZXh0LnNldFJlc3VsdChbY29udGV4dC5kZWx0YVswXSwgcGFyc2VJbnQoY29udGV4dC5jaGlsZE5hbWUuc3Vic3RyKDEpLCAxMCksIEFSUkFZX01PVkVdKS5leGl0KCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoY29udGV4dC5kZWx0YS5fdCAhPT0gJ2EnKSB7IHJldHVybjsgfVxuICAgIHZhciBuYW1lLCBjaGlsZDtcbiAgICBmb3IgKG5hbWUgaW4gY29udGV4dC5kZWx0YSkge1xuICAgICAgICBpZiAobmFtZSA9PT0gJ190JykgeyBjb250aW51ZTsgfVxuICAgICAgICBjaGlsZCA9IG5ldyBSZXZlcnNlQ29udGV4dChjb250ZXh0LmRlbHRhW25hbWVdKTtcbiAgICAgICAgY29udGV4dC5wdXNoKGNoaWxkLCBuYW1lKTtcbiAgICB9XG4gICAgY29udGV4dC5leGl0KCk7XG59O1xucmV2ZXJzZUZpbHRlci5maWx0ZXJOYW1lID0gJ2FycmF5cyc7XG5cbnZhciByZXZlcnNlQXJyYXlEZWx0YUluZGV4ID0gZnVuY3Rpb24oZGVsdGEsIGluZGV4LCBpdGVtRGVsdGEpIHtcbiAgICB2YXIgbmV3SW5kZXggPSBpbmRleDtcbiAgICBpZiAodHlwZW9mIGluZGV4ID09PSAnc3RyaW5nJyAmJiBpbmRleFswXSA9PT0gJ18nKSB7XG4gICAgICAgIG5ld0luZGV4ID0gcGFyc2VJbnQoaW5kZXguc3Vic3RyKDEpLCAxMCk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgdmFyIHVpbmRleCA9ICdfJyArIGluZGV4O1xuICAgICAgICBpZiAoaXNBcnJheShpdGVtRGVsdGEpICYmIGl0ZW1EZWx0YVsyXSA9PT0gMCkge1xuICAgICAgICAgICAgbmV3SW5kZXggPSB1aW5kZXg7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBmb3IgKHZhciBpbmRleDIgaW4gZGVsdGEpIHtcbiAgICAgICAgICAgICAgICB2YXIgaXRlbURlbHRhMiA9IGRlbHRhW2luZGV4Ml07XG4gICAgICAgICAgICAgICAgaWYgKGlzQXJyYXkoaXRlbURlbHRhMikgJiYgaXRlbURlbHRhMlsyXSA9PT0gQVJSQVlfTU9WRSAmJiBpdGVtRGVsdGEyWzFdLnRvU3RyaW5nKCkgPT09IGluZGV4KSB7XG4gICAgICAgICAgICAgICAgICAgIG5ld0luZGV4ID0gaW5kZXgyLnN1YnN0cigxKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG5ld0luZGV4O1xufTtcblxudmFyIGNvbGxlY3RDaGlsZHJlblJldmVyc2VGaWx0ZXIgPSBmdW5jdGlvbiBjb2xsZWN0Q2hpbGRyZW5SZXZlcnNlRmlsdGVyKGNvbnRleHQpIHtcbiAgICBpZiAoIWNvbnRleHQgfHwgIWNvbnRleHQuY2hpbGRyZW4pIHsgcmV0dXJuOyB9XG4gICAgaWYgKGNvbnRleHQuZGVsdGEuX3QgIT09ICdhJykgeyByZXR1cm47IH1cbiAgICB2YXIgbGVuZ3RoID0gY29udGV4dC5jaGlsZHJlbi5sZW5ndGg7XG4gICAgdmFyIGNoaWxkO1xuICAgIHZhciBkZWx0YSA9IHsgX3Q6ICdhJyB9O1xuICAgIGZvciAodmFyIGluZGV4ID0gMDsgaW5kZXggPCBsZW5ndGg7IGluZGV4KyspIHtcbiAgICAgICAgY2hpbGQgPSBjb250ZXh0LmNoaWxkcmVuW2luZGV4XTtcbiAgICAgICAgdmFyIG5hbWUgPSBjaGlsZC5uZXdOYW1lO1xuICAgICAgICBpZiAodHlwZW9mIG5hbWUgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICBuYW1lID0gcmV2ZXJzZUFycmF5RGVsdGFJbmRleChjb250ZXh0LmRlbHRhLCBjaGlsZC5jaGlsZE5hbWUsIGNoaWxkLnJlc3VsdCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGRlbHRhW25hbWVdICE9PSBjaGlsZC5yZXN1bHQpIHtcbiAgICAgICAgICAgIGRlbHRhW25hbWVdID0gY2hpbGQucmVzdWx0O1xuICAgICAgICB9XG4gICAgfVxuICAgIGNvbnRleHQuc2V0UmVzdWx0KGRlbHRhKS5leGl0KCk7XG59O1xuY29sbGVjdENoaWxkcmVuUmV2ZXJzZUZpbHRlci5maWx0ZXJOYW1lID0gJ2FycmF5c0NvbGxlY3RDaGlsZHJlbic7XG5cbmV4cG9ydHMuZGlmZkZpbHRlciA9IGRpZmZGaWx0ZXI7XG5leHBvcnRzLnBhdGNoRmlsdGVyID0gcGF0Y2hGaWx0ZXI7XG5leHBvcnRzLmNvbGxlY3RDaGlsZHJlblBhdGNoRmlsdGVyID0gY29sbGVjdENoaWxkcmVuUGF0Y2hGaWx0ZXI7XG5leHBvcnRzLnJldmVyc2VGaWx0ZXIgPSByZXZlcnNlRmlsdGVyO1xuZXhwb3J0cy5jb2xsZWN0Q2hpbGRyZW5SZXZlcnNlRmlsdGVyID0gY29sbGVjdENoaWxkcmVuUmV2ZXJzZUZpbHRlcjtcbiIsInZhciBkaWZmRmlsdGVyID0gZnVuY3Rpb24gZGF0ZXNEaWZmRmlsdGVyKGNvbnRleHQpIHtcbiAgICBpZiAoY29udGV4dC5sZWZ0IGluc3RhbmNlb2YgRGF0ZSkge1xuICAgICAgICBpZiAoY29udGV4dC5yaWdodCBpbnN0YW5jZW9mIERhdGUpIHtcbiAgICAgICAgICAgIGlmIChjb250ZXh0LmxlZnQuZ2V0VGltZSgpICE9PSBjb250ZXh0LnJpZ2h0LmdldFRpbWUoKSkge1xuICAgICAgICAgICAgICAgIGNvbnRleHQuc2V0UmVzdWx0KFtjb250ZXh0LmxlZnQsIGNvbnRleHQucmlnaHRdKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY29udGV4dC5zZXRSZXN1bHQodW5kZWZpbmVkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnRleHQuc2V0UmVzdWx0KFtjb250ZXh0LmxlZnQsIGNvbnRleHQucmlnaHRdKTtcbiAgICAgICAgfVxuICAgICAgICBjb250ZXh0LmV4aXQoKTtcbiAgICB9IGVsc2UgaWYgKGNvbnRleHQucmlnaHQgaW5zdGFuY2VvZiBEYXRlKSB7XG4gICAgICAgIGNvbnRleHQuc2V0UmVzdWx0KFtjb250ZXh0LmxlZnQsIGNvbnRleHQucmlnaHRdKS5leGl0KCk7XG4gICAgfVxufTtcbmRpZmZGaWx0ZXIuZmlsdGVyTmFtZSA9ICdkYXRlcyc7XG5cbmV4cG9ydHMuZGlmZkZpbHRlciA9IGRpZmZGaWx0ZXI7IiwiLypcblxuTENTIGltcGxlbWVudGF0aW9uIHRoYXQgc3VwcG9ydHMgYXJyYXlzIG9yIHN0cmluZ3NcblxucmVmZXJlbmNlOiBodHRwOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0xvbmdlc3RfY29tbW9uX3N1YnNlcXVlbmNlX3Byb2JsZW1cblxuKi9cblxudmFyIGRlZmF1bHRNYXRjaCA9IGZ1bmN0aW9uKGFycmF5MSwgYXJyYXkyLCBpbmRleDEsIGluZGV4Mikge1xuICAgIHJldHVybiBhcnJheTFbaW5kZXgxXSA9PT0gYXJyYXkyW2luZGV4Ml07XG59O1xuXG52YXIgbGVuZ3RoTWF0cml4ID0gZnVuY3Rpb24oYXJyYXkxLCBhcnJheTIsIG1hdGNoLCBjb250ZXh0KSB7XG4gICAgdmFyIGxlbjEgPSBhcnJheTEubGVuZ3RoO1xuICAgIHZhciBsZW4yID0gYXJyYXkyLmxlbmd0aDtcbiAgICB2YXIgeCwgeTtcblxuICAgIC8vIGluaXRpYWxpemUgZW1wdHkgbWF0cml4IG9mIGxlbjErMSB4IGxlbjIrMVxuICAgIHZhciBtYXRyaXggPSBbbGVuMSArIDFdO1xuICAgIGZvciAoeCA9IDA7IHggPCBsZW4xICsgMTsgeCsrKSB7XG4gICAgICAgIG1hdHJpeFt4XSA9IFtsZW4yICsgMV07XG4gICAgICAgIGZvciAoeSA9IDA7IHkgPCBsZW4yICsgMTsgeSsrKSB7XG4gICAgICAgICAgICBtYXRyaXhbeF1beV0gPSAwO1xuICAgICAgICB9XG4gICAgfVxuICAgIG1hdHJpeC5tYXRjaCA9IG1hdGNoO1xuICAgIC8vIHNhdmUgc2VxdWVuY2UgbGVuZ3RocyBmb3IgZWFjaCBjb29yZGluYXRlXG4gICAgZm9yICh4ID0gMTsgeCA8IGxlbjEgKyAxOyB4KyspIHtcbiAgICAgICAgZm9yICh5ID0gMTsgeSA8IGxlbjIgKyAxOyB5KyspIHtcbiAgICAgICAgICAgIGlmIChtYXRjaChhcnJheTEsIGFycmF5MiwgeCAtIDEsIHkgLSAxLCBjb250ZXh0KSkge1xuICAgICAgICAgICAgICAgIG1hdHJpeFt4XVt5XSA9IG1hdHJpeFt4IC0gMV1beSAtIDFdICsgMTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbWF0cml4W3hdW3ldID0gTWF0aC5tYXgobWF0cml4W3ggLSAxXVt5XSwgbWF0cml4W3hdW3kgLSAxXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG1hdHJpeDtcbn07XG5cbnZhciBiYWNrdHJhY2sgPSBmdW5jdGlvbihtYXRyaXgsIGFycmF5MSwgYXJyYXkyLCBpbmRleDEsIGluZGV4MiwgY29udGV4dCkge1xuICAgIGlmIChpbmRleDEgPT09IDAgfHwgaW5kZXgyID09PSAwKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBzZXF1ZW5jZTogW10sXG4gICAgICAgICAgICBpbmRpY2VzMTogW10sXG4gICAgICAgICAgICBpbmRpY2VzMjogW11cbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBpZiAobWF0cml4Lm1hdGNoKGFycmF5MSwgYXJyYXkyLCBpbmRleDEgLSAxLCBpbmRleDIgLSAxLCBjb250ZXh0KSkge1xuICAgICAgICB2YXIgc3Vic2VxdWVuY2UgPSBiYWNrdHJhY2sobWF0cml4LCBhcnJheTEsIGFycmF5MiwgaW5kZXgxIC0gMSwgaW5kZXgyIC0gMSwgY29udGV4dCk7XG4gICAgICAgIHN1YnNlcXVlbmNlLnNlcXVlbmNlLnB1c2goYXJyYXkxW2luZGV4MSAtIDFdKTtcbiAgICAgICAgc3Vic2VxdWVuY2UuaW5kaWNlczEucHVzaChpbmRleDEgLSAxKTtcbiAgICAgICAgc3Vic2VxdWVuY2UuaW5kaWNlczIucHVzaChpbmRleDIgLSAxKTtcbiAgICAgICAgcmV0dXJuIHN1YnNlcXVlbmNlO1xuICAgIH1cblxuICAgIGlmIChtYXRyaXhbaW5kZXgxXVtpbmRleDIgLSAxXSA+IG1hdHJpeFtpbmRleDEgLSAxXVtpbmRleDJdKSB7XG4gICAgICAgIHJldHVybiBiYWNrdHJhY2sobWF0cml4LCBhcnJheTEsIGFycmF5MiwgaW5kZXgxLCBpbmRleDIgLSAxLCBjb250ZXh0KTtcbiAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gYmFja3RyYWNrKG1hdHJpeCwgYXJyYXkxLCBhcnJheTIsIGluZGV4MSAtIDEsIGluZGV4MiwgY29udGV4dCk7XG4gICAgfVxufTtcblxudmFyIGdldCA9IGZ1bmN0aW9uKGFycmF5MSwgYXJyYXkyLCBtYXRjaCwgY29udGV4dCkge1xuICAgIGNvbnRleHQgPSBjb250ZXh0IHx8IHt9O1xuICAgIHZhciBtYXRyaXggPSBsZW5ndGhNYXRyaXgoYXJyYXkxLCBhcnJheTIsIG1hdGNoIHx8IGRlZmF1bHRNYXRjaCwgY29udGV4dCk7XG4gICAgdmFyIHJlc3VsdCA9IGJhY2t0cmFjayhtYXRyaXgsIGFycmF5MSwgYXJyYXkyLCBhcnJheTEubGVuZ3RoLCBhcnJheTIubGVuZ3RoLCBjb250ZXh0KTtcbiAgICBpZiAodHlwZW9mIGFycmF5MSA9PT0gJ3N0cmluZycgJiYgdHlwZW9mIGFycmF5MiA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgcmVzdWx0LnNlcXVlbmNlID0gcmVzdWx0LnNlcXVlbmNlLmpvaW4oJycpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xufTtcblxuZXhwb3J0cy5nZXQgPSBnZXQ7XG4iLCJcbnZhciBEaWZmQ29udGV4dCA9IHJlcXVpcmUoJy4uL2NvbnRleHRzL2RpZmYnKS5EaWZmQ29udGV4dDtcbnZhciBQYXRjaENvbnRleHQgPSByZXF1aXJlKCcuLi9jb250ZXh0cy9wYXRjaCcpLlBhdGNoQ29udGV4dDtcbnZhciBSZXZlcnNlQ29udGV4dCA9IHJlcXVpcmUoJy4uL2NvbnRleHRzL3JldmVyc2UnKS5SZXZlcnNlQ29udGV4dDtcblxudmFyIGNvbGxlY3RDaGlsZHJlbkRpZmZGaWx0ZXIgPSBmdW5jdGlvbiBjb2xsZWN0Q2hpbGRyZW5EaWZmRmlsdGVyKGNvbnRleHQpIHtcbiAgICBpZiAoIWNvbnRleHQgfHwgIWNvbnRleHQuY2hpbGRyZW4pIHsgcmV0dXJuOyB9XG4gICAgdmFyIGxlbmd0aCA9IGNvbnRleHQuY2hpbGRyZW4ubGVuZ3RoO1xuICAgIHZhciBjaGlsZDtcbiAgICB2YXIgcmVzdWx0ID0gY29udGV4dC5yZXN1bHQ7XG4gICAgZm9yICh2YXIgaW5kZXggPSAwOyBpbmRleCA8IGxlbmd0aDsgaW5kZXgrKykge1xuICAgICAgICBjaGlsZCA9IGNvbnRleHQuY2hpbGRyZW5baW5kZXhdO1xuICAgICAgICBpZiAodHlwZW9mIGNoaWxkLnJlc3VsdCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIHJlc3VsdCA9IHJlc3VsdCB8fCB7fTtcbiAgICAgICAgcmVzdWx0W2NoaWxkLmNoaWxkTmFtZV0gPSBjaGlsZC5yZXN1bHQ7XG4gICAgfVxuICAgIGlmIChyZXN1bHQgJiYgY29udGV4dC5sZWZ0SXNBcnJheSkge1xuICAgICAgICByZXN1bHQuX3QgPSAnYSc7XG4gICAgfVxuICAgIGNvbnRleHQuc2V0UmVzdWx0KHJlc3VsdCkuZXhpdCgpO1xufTtcbmNvbGxlY3RDaGlsZHJlbkRpZmZGaWx0ZXIuZmlsdGVyTmFtZSA9ICdjb2xsZWN0Q2hpbGRyZW4nO1xuXG52YXIgb2JqZWN0c0RpZmZGaWx0ZXIgPSBmdW5jdGlvbiBvYmplY3RzRGlmZkZpbHRlcihjb250ZXh0KSB7XG4gICAgaWYgKGNvbnRleHQubGVmdElzQXJyYXkgfHwgY29udGV4dC5sZWZ0VHlwZSAhPT0gJ29iamVjdCcpIHsgcmV0dXJuOyB9XG5cbiAgICB2YXIgbmFtZSwgY2hpbGQ7XG4gICAgZm9yIChuYW1lIGluIGNvbnRleHQubGVmdCkge1xuICAgICAgICBjaGlsZCA9IG5ldyBEaWZmQ29udGV4dChjb250ZXh0LmxlZnRbbmFtZV0sIGNvbnRleHQucmlnaHRbbmFtZV0pO1xuICAgICAgICBjb250ZXh0LnB1c2goY2hpbGQsIG5hbWUpO1xuICAgIH1cbiAgICBmb3IgKG5hbWUgaW4gY29udGV4dC5yaWdodCkge1xuICAgICAgICBpZiAodHlwZW9mIGNvbnRleHQubGVmdFtuYW1lXSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIGNoaWxkID0gbmV3IERpZmZDb250ZXh0KHVuZGVmaW5lZCwgY29udGV4dC5yaWdodFtuYW1lXSk7XG4gICAgICAgICAgICBjb250ZXh0LnB1c2goY2hpbGQsIG5hbWUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaWYgKCFjb250ZXh0LmNoaWxkcmVuIHx8IGNvbnRleHQuY2hpbGRyZW4ubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIGNvbnRleHQuc2V0UmVzdWx0KHVuZGVmaW5lZCkuZXhpdCgpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnRleHQuZXhpdCgpO1xufTtcbm9iamVjdHNEaWZmRmlsdGVyLmZpbHRlck5hbWUgPSAnb2JqZWN0cyc7XG5cbnZhciBwYXRjaEZpbHRlciA9IGZ1bmN0aW9uIG5lc3RlZFBhdGNoRmlsdGVyKGNvbnRleHQpIHtcbiAgICBpZiAoIWNvbnRleHQubmVzdGVkKSB7IHJldHVybjsgfVxuICAgIGlmIChjb250ZXh0LmRlbHRhLl90KSB7IHJldHVybjsgfVxuICAgIHZhciBuYW1lLCBjaGlsZDtcbiAgICBmb3IgKG5hbWUgaW4gY29udGV4dC5kZWx0YSkge1xuICAgICAgICBjaGlsZCA9IG5ldyBQYXRjaENvbnRleHQoY29udGV4dC5sZWZ0W25hbWVdLCBjb250ZXh0LmRlbHRhW25hbWVdKTtcbiAgICAgICAgY29udGV4dC5wdXNoKGNoaWxkLCBuYW1lKTtcbiAgICB9XG4gICAgY29udGV4dC5leGl0KCk7XG59O1xucGF0Y2hGaWx0ZXIuZmlsdGVyTmFtZSA9ICdvYmplY3RzJztcblxudmFyIGNvbGxlY3RDaGlsZHJlblBhdGNoRmlsdGVyID0gZnVuY3Rpb24gY29sbGVjdENoaWxkcmVuUGF0Y2hGaWx0ZXIoY29udGV4dCkge1xuICAgIGlmICghY29udGV4dCB8fCAhY29udGV4dC5jaGlsZHJlbikgeyByZXR1cm47IH1cbiAgICBpZiAoY29udGV4dC5kZWx0YS5fdCkgeyByZXR1cm47IH1cbiAgICB2YXIgbGVuZ3RoID0gY29udGV4dC5jaGlsZHJlbi5sZW5ndGg7XG4gICAgdmFyIGNoaWxkO1xuICAgIGZvciAodmFyIGluZGV4ID0gMDsgaW5kZXggPCBsZW5ndGg7IGluZGV4KyspIHtcbiAgICAgICAgY2hpbGQgPSBjb250ZXh0LmNoaWxkcmVuW2luZGV4XTtcbiAgICAgICAgaWYgKGNvbnRleHQubGVmdFtjaGlsZC5jaGlsZE5hbWVdICE9PSBjaGlsZC5yZXN1bHQpIHtcbiAgICAgICAgICAgIGNvbnRleHQubGVmdFtjaGlsZC5jaGlsZE5hbWVdID0gY2hpbGQucmVzdWx0O1xuICAgICAgICB9XG4gICAgfVxuICAgIGNvbnRleHQuc2V0UmVzdWx0KGNvbnRleHQubGVmdCkuZXhpdCgpO1xufTtcbmNvbGxlY3RDaGlsZHJlblBhdGNoRmlsdGVyLmZpbHRlck5hbWUgPSAnY29sbGVjdENoaWxkcmVuJztcblxudmFyIHJldmVyc2VGaWx0ZXIgPSBmdW5jdGlvbiBuZXN0ZWRSZXZlcnNlRmlsdGVyKGNvbnRleHQpIHtcbiAgICBpZiAoIWNvbnRleHQubmVzdGVkKSB7IHJldHVybjsgfVxuICAgIGlmIChjb250ZXh0LmRlbHRhLl90KSB7IHJldHVybjsgfVxuICAgIHZhciBuYW1lLCBjaGlsZDtcbiAgICBmb3IgKG5hbWUgaW4gY29udGV4dC5kZWx0YSkge1xuICAgICAgICBjaGlsZCA9IG5ldyBSZXZlcnNlQ29udGV4dChjb250ZXh0LmRlbHRhW25hbWVdKTtcbiAgICAgICAgY29udGV4dC5wdXNoKGNoaWxkLCBuYW1lKTtcbiAgICB9XG4gICAgY29udGV4dC5leGl0KCk7XG59O1xucmV2ZXJzZUZpbHRlci5maWx0ZXJOYW1lID0gJ29iamVjdHMnO1xuXG52YXIgY29sbGVjdENoaWxkcmVuUmV2ZXJzZUZpbHRlciA9IGZ1bmN0aW9uIGNvbGxlY3RDaGlsZHJlblJldmVyc2VGaWx0ZXIoY29udGV4dCkge1xuICAgIGlmICghY29udGV4dCB8fCAhY29udGV4dC5jaGlsZHJlbikgeyByZXR1cm47IH1cbiAgICBpZiAoY29udGV4dC5kZWx0YS5fdCkgeyByZXR1cm47IH1cbiAgICB2YXIgbGVuZ3RoID0gY29udGV4dC5jaGlsZHJlbi5sZW5ndGg7XG4gICAgdmFyIGNoaWxkO1xuICAgIHZhciBkZWx0YSA9IHt9O1xuICAgIGZvciAodmFyIGluZGV4ID0gMDsgaW5kZXggPCBsZW5ndGg7IGluZGV4KyspIHtcbiAgICAgICAgY2hpbGQgPSBjb250ZXh0LmNoaWxkcmVuW2luZGV4XTtcbiAgICAgICAgaWYgKGRlbHRhW2NoaWxkLmNoaWxkTmFtZV0gIT09IGNoaWxkLnJlc3VsdCkge1xuICAgICAgICAgICAgZGVsdGFbY2hpbGQuY2hpbGROYW1lXSA9IGNoaWxkLnJlc3VsdDtcbiAgICAgICAgfVxuICAgIH1cbiAgICBjb250ZXh0LnNldFJlc3VsdChkZWx0YSkuZXhpdCgpO1xufTtcbmNvbGxlY3RDaGlsZHJlblJldmVyc2VGaWx0ZXIuZmlsdGVyTmFtZSA9ICdjb2xsZWN0Q2hpbGRyZW4nO1xuXG5leHBvcnRzLmNvbGxlY3RDaGlsZHJlbkRpZmZGaWx0ZXIgPSBjb2xsZWN0Q2hpbGRyZW5EaWZmRmlsdGVyO1xuZXhwb3J0cy5vYmplY3RzRGlmZkZpbHRlciA9IG9iamVjdHNEaWZmRmlsdGVyO1xuZXhwb3J0cy5wYXRjaEZpbHRlciA9IHBhdGNoRmlsdGVyO1xuZXhwb3J0cy5jb2xsZWN0Q2hpbGRyZW5QYXRjaEZpbHRlciA9IGNvbGxlY3RDaGlsZHJlblBhdGNoRmlsdGVyO1xuZXhwb3J0cy5yZXZlcnNlRmlsdGVyID0gcmV2ZXJzZUZpbHRlcjtcbmV4cG9ydHMuY29sbGVjdENoaWxkcmVuUmV2ZXJzZUZpbHRlciA9IGNvbGxlY3RDaGlsZHJlblJldmVyc2VGaWx0ZXI7IiwiLyogZ2xvYmFsIGRpZmZfbWF0Y2hfcGF0Y2ggKi9cbnZhciBURVhUX0RJRkYgPSAyO1xudmFyIERFRkFVTFRfTUlOX0xFTkdUSCA9IDYwO1xudmFyIGNhY2hlZERpZmZQYXRjaCA9IG51bGw7XG5cbnZhciBnZXREaWZmTWF0Y2hQYXRjaCA9IGZ1bmN0aW9uKCl7XG4gICAgLypqc2hpbnQgY2FtZWxjYXNlOiBmYWxzZSAqL1xuXG4gICAgaWYgKCFjYWNoZWREaWZmUGF0Y2gpIHtcbiAgICAgICAgdmFyIGluc3RhbmNlO1xuICAgICAgICBpZiAodHlwZW9mIGRpZmZfbWF0Y2hfcGF0Y2ggIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAvLyBhbHJlYWR5IGxvYWRlZCwgcHJvYmFibHkgYSBicm93c2VyXG4gICAgICAgICAgICBpbnN0YW5jZSA9IHR5cGVvZiBkaWZmX21hdGNoX3BhdGNoID09PSAnZnVuY3Rpb24nID9cbiAgICAgICAgICAgICAgbmV3IGRpZmZfbWF0Y2hfcGF0Y2goKSA6IG5ldyBkaWZmX21hdGNoX3BhdGNoLmRpZmZfbWF0Y2hfcGF0Y2goKTtcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgcmVxdWlyZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICB2YXIgZG1wTW9kdWxlTmFtZSA9ICdkaWZmX21hdGNoX3BhdGNoX3VuY29tcHJlc3NlZCc7XG4gICAgICAgICAgICAgICAgdmFyIGRtcCA9IHJlcXVpcmUoJy4uLy4uL3B1YmxpYy9leHRlcm5hbC8nICsgZG1wTW9kdWxlTmFtZSk7XG4gICAgICAgICAgICAgICAgaW5zdGFuY2UgPSBuZXcgZG1wLmRpZmZfbWF0Y2hfcGF0Y2goKTtcbiAgICAgICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgICAgIGluc3RhbmNlID0gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoIWluc3RhbmNlKSB7XG4gICAgICAgICAgICB2YXIgZXJyb3IgPSBuZXcgRXJyb3IoJ3RleHQgZGlmZl9tYXRjaF9wYXRjaCBsaWJyYXJ5IG5vdCBmb3VuZCcpO1xuICAgICAgICAgICAgZXJyb3IuZGlmZl9tYXRjaF9wYXRjaF9ub3RfZm91bmQgPSB0cnVlO1xuICAgICAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICAgIH1cbiAgICAgICAgY2FjaGVkRGlmZlBhdGNoID0ge1xuICAgICAgICAgICAgZGlmZjogZnVuY3Rpb24odHh0MSwgdHh0Mil7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGluc3RhbmNlLnBhdGNoX3RvVGV4dChpbnN0YW5jZS5wYXRjaF9tYWtlKHR4dDEsIHR4dDIpKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBwYXRjaDogZnVuY3Rpb24odHh0MSwgcGF0Y2gpe1xuICAgICAgICAgICAgICAgIHZhciByZXN1bHRzID0gaW5zdGFuY2UucGF0Y2hfYXBwbHkoaW5zdGFuY2UucGF0Y2hfZnJvbVRleHQocGF0Y2gpLCB0eHQxKTtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHJlc3VsdHNbMV0ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFyZXN1bHRzWzFdW2ldKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZXJyb3IgPSBuZXcgRXJyb3IoJ3RleHQgcGF0Y2ggZmFpbGVkJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBlcnJvci50ZXh0UGF0Y2hGYWlsZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHRzWzBdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH1cbiAgICByZXR1cm4gY2FjaGVkRGlmZlBhdGNoO1xufTtcblxudmFyIGRpZmZGaWx0ZXIgPSBmdW5jdGlvbiB0ZXh0c0RpZmZGaWx0ZXIoY29udGV4dCkge1xuICAgIGlmIChjb250ZXh0LmxlZnRUeXBlICE9PSAnc3RyaW5nJykgeyByZXR1cm47IH1cbiAgICB2YXIgbWluTGVuZ3RoID0gKGNvbnRleHQub3B0aW9ucyAmJiBjb250ZXh0Lm9wdGlvbnMudGV4dERpZmYgJiZcbiAgICAgICAgY29udGV4dC5vcHRpb25zLnRleHREaWZmLm1pbkxlbmd0aCkgfHwgREVGQVVMVF9NSU5fTEVOR1RIO1xuICAgIGlmIChjb250ZXh0LmxlZnQubGVuZ3RoIDwgbWluTGVuZ3RoIHx8XG4gICAgICAgIGNvbnRleHQucmlnaHQubGVuZ3RoIDwgbWluTGVuZ3RoKSB7XG4gICAgICAgIGNvbnRleHQuc2V0UmVzdWx0KFtjb250ZXh0LmxlZnQsIGNvbnRleHQucmlnaHRdKS5leGl0KCk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgLy8gbGFyZ2UgdGV4dCwgdXNlIGEgdGV4dC1kaWZmIGFsZ29yaXRobVxuICAgIHZhciBkaWZmID0gZ2V0RGlmZk1hdGNoUGF0Y2goKS5kaWZmO1xuICAgIGNvbnRleHQuc2V0UmVzdWx0KFtkaWZmKGNvbnRleHQubGVmdCwgY29udGV4dC5yaWdodCksIDAsIFRFWFRfRElGRl0pLmV4aXQoKTtcbn07XG5kaWZmRmlsdGVyLmZpbHRlck5hbWUgPSAndGV4dHMnO1xuXG52YXIgcGF0Y2hGaWx0ZXIgPSBmdW5jdGlvbiB0ZXh0c1BhdGNoRmlsdGVyKGNvbnRleHQpIHtcbiAgICBpZiAoY29udGV4dC5uZXN0ZWQpIHsgcmV0dXJuOyB9XG4gICAgaWYgKGNvbnRleHQuZGVsdGFbMl0gIT09IFRFWFRfRElGRikgeyByZXR1cm47IH1cblxuICAgIC8vIHRleHQtZGlmZiwgdXNlIGEgdGV4dC1wYXRjaCBhbGdvcml0aG1cbiAgICB2YXIgcGF0Y2ggPSBnZXREaWZmTWF0Y2hQYXRjaCgpLnBhdGNoO1xuICAgIGNvbnRleHQuc2V0UmVzdWx0KHBhdGNoKGNvbnRleHQubGVmdCwgY29udGV4dC5kZWx0YVswXSkpLmV4aXQoKTtcbn07XG5wYXRjaEZpbHRlci5maWx0ZXJOYW1lID0gJ3RleHRzJztcblxudmFyIHRleHREZWx0YVJldmVyc2UgPSBmdW5jdGlvbihkZWx0YSl7XG4gICAgdmFyIGksIGwsIGxpbmVzLCBsaW5lLCBsaW5lVG1wLCBoZWFkZXIgPSBudWxsLFxuICAgIGhlYWRlclJlZ2V4ID0gL15AQCArXFwtKFxcZCspLChcXGQrKSArXFwrKFxcZCspLChcXGQrKSArQEAkLyxcbiAgICBsaW5lSGVhZGVyLCBsaW5lQWRkLCBsaW5lUmVtb3ZlO1xuICAgIGxpbmVzID0gZGVsdGEuc3BsaXQoJ1xcbicpO1xuICAgIGZvciAoaSA9IDAsIGwgPSBsaW5lcy5sZW5ndGg7IGk8bDsgaSsrKSB7XG4gICAgICAgIGxpbmUgPSBsaW5lc1tpXTtcbiAgICAgICAgdmFyIGxpbmVTdGFydCA9IGxpbmUuc2xpY2UoMCwxKTtcbiAgICAgICAgaWYgKGxpbmVTdGFydD09PSdAJyl7XG4gICAgICAgICAgICBoZWFkZXIgPSBoZWFkZXJSZWdleC5leGVjKGxpbmUpO1xuICAgICAgICAgICAgbGluZUhlYWRlciA9IGk7XG4gICAgICAgICAgICBsaW5lQWRkID0gbnVsbDtcbiAgICAgICAgICAgIGxpbmVSZW1vdmUgPSBudWxsO1xuXG4gICAgICAgICAgICAvLyBmaXggaGVhZGVyXG4gICAgICAgICAgICBsaW5lc1tsaW5lSGVhZGVyXSA9ICdAQCAtJyArIGhlYWRlclszXSArICcsJyArIGhlYWRlcls0XSArICcgKycgKyBoZWFkZXJbMV0gKyAnLCcgKyBoZWFkZXJbMl0gKyAnIEBAJztcbiAgICAgICAgfSBlbHNlIGlmIChsaW5lU3RhcnQgPT09ICcrJyl7XG4gICAgICAgICAgICBsaW5lQWRkID0gaTtcbiAgICAgICAgICAgIGxpbmVzW2ldID0gJy0nICsgbGluZXNbaV0uc2xpY2UoMSk7XG4gICAgICAgICAgICBpZiAobGluZXNbaS0xXS5zbGljZSgwLDEpPT09JysnKSB7XG4gICAgICAgICAgICAgICAgLy8gc3dhcCBsaW5lcyB0byBrZWVwIGRlZmF1bHQgb3JkZXIgKC0rKVxuICAgICAgICAgICAgICAgIGxpbmVUbXAgPSBsaW5lc1tpXTtcbiAgICAgICAgICAgICAgICBsaW5lc1tpXSA9IGxpbmVzW2ktMV07XG4gICAgICAgICAgICAgICAgbGluZXNbaS0xXSA9IGxpbmVUbXA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAobGluZVN0YXJ0ID09PSAnLScpe1xuICAgICAgICAgICAgbGluZVJlbW92ZSA9IGk7XG4gICAgICAgICAgICBsaW5lc1tpXSA9ICcrJyArIGxpbmVzW2ldLnNsaWNlKDEpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBsaW5lcy5qb2luKCdcXG4nKTtcbn07XG5cbnZhciByZXZlcnNlRmlsdGVyID0gZnVuY3Rpb24gdGV4dHNSZXZlcnNlRmlsdGVyKGNvbnRleHQpIHtcbiAgICBpZiAoY29udGV4dC5uZXN0ZWQpIHsgcmV0dXJuOyB9XG4gICAgaWYgKGNvbnRleHQuZGVsdGFbMl0gIT09IFRFWFRfRElGRikgeyByZXR1cm47IH1cblxuICAgIC8vIHRleHQtZGlmZiwgdXNlIGEgdGV4dC1kaWZmIGFsZ29yaXRobVxuICAgIGNvbnRleHQuc2V0UmVzdWx0KFt0ZXh0RGVsdGFSZXZlcnNlKGNvbnRleHQuZGVsdGFbMF0pLCAwLCBURVhUX0RJRkZdKS5leGl0KCk7XG59O1xucmV2ZXJzZUZpbHRlci5maWx0ZXJOYW1lID0gJ3RleHRzJztcblxuZXhwb3J0cy5kaWZmRmlsdGVyID0gZGlmZkZpbHRlcjtcbmV4cG9ydHMucGF0Y2hGaWx0ZXIgPSBwYXRjaEZpbHRlcjtcbmV4cG9ydHMucmV2ZXJzZUZpbHRlciA9IHJldmVyc2VGaWx0ZXI7XG4iLCJcbnZhciBpc0FycmF5ID0gKHR5cGVvZiBBcnJheS5pc0FycmF5ID09PSAnZnVuY3Rpb24nKSA/XG4gICAgLy8gdXNlIG5hdGl2ZSBmdW5jdGlvblxuICAgIEFycmF5LmlzQXJyYXkgOlxuICAgIC8vIHVzZSBpbnN0YW5jZW9mIG9wZXJhdG9yXG4gICAgZnVuY3Rpb24oYSkge1xuICAgICAgICByZXR1cm4gYSBpbnN0YW5jZW9mIEFycmF5O1xuICAgIH07XG5cbnZhciBkaWZmRmlsdGVyID0gZnVuY3Rpb24gdHJpdmlhbE1hdGNoZXNEaWZmRmlsdGVyKGNvbnRleHQpIHtcbiAgICBpZiAoY29udGV4dC5sZWZ0ID09PSBjb250ZXh0LnJpZ2h0KSB7XG4gICAgICAgIGNvbnRleHQuc2V0UmVzdWx0KHVuZGVmaW5lZCkuZXhpdCgpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICh0eXBlb2YgY29udGV4dC5sZWZ0ID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICBpZiAodHlwZW9mIGNvbnRleHQucmlnaHQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignZnVuY3Rpb25zIGFyZSBub3Qgc3VwcG9ydGVkJyk7XG4gICAgICAgIH1cbiAgICAgICAgY29udGV4dC5zZXRSZXN1bHQoW2NvbnRleHQucmlnaHRdKS5leGl0KCk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiBjb250ZXh0LnJpZ2h0ID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICBjb250ZXh0LnNldFJlc3VsdChbY29udGV4dC5sZWZ0LCAwLCAwXSkuZXhpdCgpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICh0eXBlb2YgY29udGV4dC5sZWZ0ID09PSAnZnVuY3Rpb24nIHx8IHR5cGVvZiBjb250ZXh0LnJpZ2h0ID09PSAnZnVuY3Rpb24nICkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2Z1bmN0aW9ucyBhcmUgbm90IHN1cHBvcnRlZCcpO1xuICAgIH1cbiAgICBjb250ZXh0LmxlZnRUeXBlID0gY29udGV4dC5sZWZ0ID09PSBudWxsID8gJ251bGwnIDogdHlwZW9mIGNvbnRleHQubGVmdDtcbiAgICBjb250ZXh0LnJpZ2h0VHlwZSA9IGNvbnRleHQucmlnaHQgPT09IG51bGwgPyAnbnVsbCcgOiB0eXBlb2YgY29udGV4dC5yaWdodDtcbiAgICBpZiAoY29udGV4dC5sZWZ0VHlwZSAhPT0gY29udGV4dC5yaWdodFR5cGUpIHtcbiAgICAgICAgY29udGV4dC5zZXRSZXN1bHQoW2NvbnRleHQubGVmdCwgY29udGV4dC5yaWdodF0pLmV4aXQoKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoY29udGV4dC5sZWZ0VHlwZSA9PT0gJ2Jvb2xlYW4nIHx8IGNvbnRleHQubGVmdFR5cGUgPT09ICdudW1iZXInKSB7XG4gICAgICAgIGNvbnRleHQuc2V0UmVzdWx0KFtjb250ZXh0LmxlZnQsIGNvbnRleHQucmlnaHRdKS5leGl0KCk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKGNvbnRleHQubGVmdFR5cGUgPT09ICdvYmplY3QnKSB7XG4gICAgICAgIGNvbnRleHQubGVmdElzQXJyYXkgPSBpc0FycmF5KGNvbnRleHQubGVmdCk7XG4gICAgfVxuICAgIGlmIChjb250ZXh0LnJpZ2h0VHlwZSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgY29udGV4dC5yaWdodElzQXJyYXkgPSBpc0FycmF5KGNvbnRleHQucmlnaHQpO1xuICAgIH1cbiAgICBpZiAoY29udGV4dC5sZWZ0SXNBcnJheSAhPT0gY29udGV4dC5yaWdodElzQXJyYXkpIHtcbiAgICAgICAgY29udGV4dC5zZXRSZXN1bHQoW2NvbnRleHQubGVmdCwgY29udGV4dC5yaWdodF0pLmV4aXQoKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbn07XG5kaWZmRmlsdGVyLmZpbHRlck5hbWUgPSAndHJpdmlhbCc7XG5cbnZhciBwYXRjaEZpbHRlciA9IGZ1bmN0aW9uIHRyaXZpYWxNYXRjaGVzUGF0Y2hGaWx0ZXIoY29udGV4dCkge1xuICAgIGlmICh0eXBlb2YgY29udGV4dC5kZWx0YSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgY29udGV4dC5zZXRSZXN1bHQoY29udGV4dC5sZWZ0KS5leGl0KCk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29udGV4dC5uZXN0ZWQgPSAhaXNBcnJheShjb250ZXh0LmRlbHRhKTtcbiAgICBpZiAoY29udGV4dC5uZXN0ZWQpIHsgcmV0dXJuOyB9XG4gICAgaWYgKGNvbnRleHQuZGVsdGEubGVuZ3RoID09PSAxKSB7XG4gICAgICAgIGNvbnRleHQuc2V0UmVzdWx0KGNvbnRleHQuZGVsdGFbMF0pLmV4aXQoKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoY29udGV4dC5kZWx0YS5sZW5ndGggPT09IDIpIHtcbiAgICAgICAgY29udGV4dC5zZXRSZXN1bHQoY29udGV4dC5kZWx0YVsxXSkuZXhpdCgpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChjb250ZXh0LmRlbHRhLmxlbmd0aCA9PT0gMyAmJiBjb250ZXh0LmRlbHRhWzJdID09PSAwKSB7XG4gICAgICAgIGNvbnRleHQuc2V0UmVzdWx0KHVuZGVmaW5lZCkuZXhpdCgpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxufTtcbnBhdGNoRmlsdGVyLmZpbHRlck5hbWUgPSAndHJpdmlhbCc7XG5cbnZhciByZXZlcnNlRmlsdGVyID0gZnVuY3Rpb24gdHJpdmlhbFJlZmVyc2VGaWx0ZXIoY29udGV4dCkge1xuICAgIGlmICh0eXBlb2YgY29udGV4dC5kZWx0YSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgY29udGV4dC5zZXRSZXN1bHQoY29udGV4dC5kZWx0YSkuZXhpdCgpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnRleHQubmVzdGVkID0gIWlzQXJyYXkoY29udGV4dC5kZWx0YSk7XG4gICAgaWYgKGNvbnRleHQubmVzdGVkKSB7IHJldHVybjsgfVxuICAgIGlmIChjb250ZXh0LmRlbHRhLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICBjb250ZXh0LnNldFJlc3VsdChbY29udGV4dC5kZWx0YVswXSwgMCwgMF0pLmV4aXQoKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoY29udGV4dC5kZWx0YS5sZW5ndGggPT09IDIpIHtcbiAgICAgICAgY29udGV4dC5zZXRSZXN1bHQoW2NvbnRleHQuZGVsdGFbMV0sIGNvbnRleHQuZGVsdGFbMF1dKS5leGl0KCk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKGNvbnRleHQuZGVsdGEubGVuZ3RoID09PSAzICYmIGNvbnRleHQuZGVsdGFbMl0gPT09IDApIHtcbiAgICAgICAgY29udGV4dC5zZXRSZXN1bHQoW2NvbnRleHQuZGVsdGFbMF1dKS5leGl0KCk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG59O1xucmV2ZXJzZUZpbHRlci5maWx0ZXJOYW1lID0gJ3RyaXZpYWwnO1xuXG5leHBvcnRzLmRpZmZGaWx0ZXIgPSBkaWZmRmlsdGVyO1xuZXhwb3J0cy5wYXRjaEZpbHRlciA9IHBhdGNoRmlsdGVyO1xuZXhwb3J0cy5yZXZlcnNlRmlsdGVyID0gcmV2ZXJzZUZpbHRlcjtcbiIsIlxudmFyIFBpcGUgPSBmdW5jdGlvbiBQaXBlKG5hbWUpe1xuICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgdGhpcy5maWx0ZXJzID0gW107XG59O1xuXG5QaXBlLnByb3RvdHlwZS5wcm9jZXNzID0gZnVuY3Rpb24oaW5wdXQpIHtcbiAgICBpZiAoIXRoaXMucHJvY2Vzc29yKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignYWRkIHRoaXMgcGlwZSB0byBhIHByb2Nlc3NvciBiZWZvcmUgdXNpbmcgaXQnKTtcbiAgICB9XG4gICAgdmFyIGRlYnVnID0gdGhpcy5kZWJ1ZztcbiAgICB2YXIgbGVuZ3RoID0gdGhpcy5maWx0ZXJzLmxlbmd0aDtcbiAgICB2YXIgY29udGV4dCA9IGlucHV0O1xuICAgIGZvciAodmFyIGluZGV4ID0gMDsgaW5kZXggPCBsZW5ndGg7IGluZGV4KyspIHtcbiAgICAgICAgdmFyIGZpbHRlciA9IHRoaXMuZmlsdGVyc1tpbmRleF07XG4gICAgICAgIGlmIChkZWJ1Zykge1xuICAgICAgICAgICAgdGhpcy5sb2coJ2ZpbHRlcjogJyArIGZpbHRlci5maWx0ZXJOYW1lKTtcbiAgICAgICAgfVxuICAgICAgICBmaWx0ZXIoY29udGV4dCk7XG4gICAgICAgIGlmICh0eXBlb2YgY29udGV4dCA9PT0gJ29iamVjdCcgJiYgY29udGV4dC5leGl0aW5nKSB7XG4gICAgICAgICAgICBjb250ZXh0LmV4aXRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuICAgIGlmICghY29udGV4dC5uZXh0ICYmIHRoaXMucmVzdWx0Q2hlY2spIHtcbiAgICAgICAgdGhpcy5yZXN1bHRDaGVjayhjb250ZXh0KTtcbiAgICB9XG59O1xuXG5QaXBlLnByb3RvdHlwZS5sb2cgPSBmdW5jdGlvbihtc2cpIHtcbiAgICBjb25zb2xlLmxvZygnW2pzb25kaWZmcGF0Y2hdICcgKyB0aGlzLm5hbWUgKyAnIHBpcGUsICcgKyBtc2cpO1xufTtcblxuUGlwZS5wcm90b3R5cGUuYXBwZW5kID0gZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5maWx0ZXJzLnB1c2guYXBwbHkodGhpcy5maWx0ZXJzLCBhcmd1bWVudHMpO1xuICAgIHJldHVybiB0aGlzO1xufTtcblxuUGlwZS5wcm90b3R5cGUucHJlcGVuZCA9IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuZmlsdGVycy51bnNoaWZ0LmFwcGx5KHRoaXMuZmlsdGVycywgYXJndW1lbnRzKTtcbiAgICByZXR1cm4gdGhpcztcbn07XG5cblBpcGUucHJvdG90eXBlLmluZGV4T2YgPSBmdW5jdGlvbihmaWx0ZXJOYW1lKSB7XG4gICAgaWYgKCFmaWx0ZXJOYW1lKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignYSBmaWx0ZXIgbmFtZSBpcyByZXF1aXJlZCcpO1xuICAgIH1cbiAgICBmb3IgKHZhciBpbmRleCA9IDA7IGluZGV4IDwgdGhpcy5maWx0ZXJzLmxlbmd0aDsgaW5kZXgrKykge1xuICAgICAgICB2YXIgZmlsdGVyID0gdGhpcy5maWx0ZXJzW2luZGV4XTtcbiAgICAgICAgaWYgKGZpbHRlci5maWx0ZXJOYW1lID09PSBmaWx0ZXJOYW1lKSB7XG4gICAgICAgICAgICByZXR1cm4gaW5kZXg7XG4gICAgICAgIH1cbiAgICB9XG4gICAgdGhyb3cgbmV3IEVycm9yKCdmaWx0ZXIgbm90IGZvdW5kOiAnICsgZmlsdGVyTmFtZSk7XG59O1xuXG5QaXBlLnByb3RvdHlwZS5saXN0ID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIG5hbWVzID0gW107XG4gICAgZm9yICh2YXIgaW5kZXggPSAwOyBpbmRleCA8IHRoaXMuZmlsdGVycy5sZW5ndGg7IGluZGV4KyspIHtcbiAgICAgICAgdmFyIGZpbHRlciA9IHRoaXMuZmlsdGVyc1tpbmRleF07XG4gICAgICAgIG5hbWVzLnB1c2goZmlsdGVyLmZpbHRlck5hbWUpO1xuICAgIH1cbiAgICByZXR1cm4gbmFtZXM7XG59O1xuXG5QaXBlLnByb3RvdHlwZS5hZnRlciA9IGZ1bmN0aW9uKGZpbHRlck5hbWUpIHtcbiAgICB2YXIgaW5kZXggPSB0aGlzLmluZGV4T2YoZmlsdGVyTmFtZSk7XG4gICAgdmFyIHBhcmFtcyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSk7XG4gICAgaWYgKCFwYXJhbXMubGVuZ3RoKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignYSBmaWx0ZXIgaXMgcmVxdWlyZWQnKTtcbiAgICB9XG4gICAgcGFyYW1zLnVuc2hpZnQoaW5kZXggKyAxLCAwKTtcbiAgICBBcnJheS5wcm90b3R5cGUuc3BsaWNlLmFwcGx5KHRoaXMuZmlsdGVycywgcGFyYW1zKTtcbiAgICByZXR1cm4gdGhpcztcbn07XG5cblBpcGUucHJvdG90eXBlLmJlZm9yZSA9IGZ1bmN0aW9uKGZpbHRlck5hbWUpIHtcbiAgICB2YXIgaW5kZXggPSB0aGlzLmluZGV4T2YoZmlsdGVyTmFtZSk7XG4gICAgdmFyIHBhcmFtcyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSk7XG4gICAgaWYgKCFwYXJhbXMubGVuZ3RoKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignYSBmaWx0ZXIgaXMgcmVxdWlyZWQnKTtcbiAgICB9XG4gICAgcGFyYW1zLnVuc2hpZnQoaW5kZXgsIDApO1xuICAgIEFycmF5LnByb3RvdHlwZS5zcGxpY2UuYXBwbHkodGhpcy5maWx0ZXJzLCBwYXJhbXMpO1xuICAgIHJldHVybiB0aGlzO1xufTtcblxuUGlwZS5wcm90b3R5cGUuY2xlYXIgPSBmdW5jdGlvbigpIHtcbiAgICB0aGlzLmZpbHRlcnMubGVuZ3RoID0gMDtcbiAgICByZXR1cm4gdGhpcztcbn07XG5cblBpcGUucHJvdG90eXBlLnNob3VsZEhhdmVSZXN1bHQgPSBmdW5jdGlvbihzaG91bGQpIHtcbiAgICBpZiAoc2hvdWxkID09PSBmYWxzZSkge1xuICAgICAgICB0aGlzLnJlc3VsdENoZWNrID0gbnVsbDtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAodGhpcy5yZXN1bHRDaGVjaykgeyByZXR1cm47IH1cbiAgICB2YXIgcGlwZSA9IHRoaXM7XG4gICAgdGhpcy5yZXN1bHRDaGVjayA9IGZ1bmN0aW9uKGNvbnRleHQpIHtcbiAgICAgICAgaWYgKCFjb250ZXh0Lmhhc1Jlc3VsdCkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coY29udGV4dCk7XG4gICAgICAgICAgICB2YXIgZXJyb3IgPSBuZXcgRXJyb3IocGlwZS5uYW1lICsgJyBmYWlsZWQnKTtcbiAgICAgICAgICAgIGVycm9yLm5vUmVzdWx0ID0gdHJ1ZTtcbiAgICAgICAgICAgIHRocm93IGVycm9yO1xuICAgICAgICB9XG4gICAgfTtcbiAgICByZXR1cm4gdGhpcztcbn07XG5cbmV4cG9ydHMuUGlwZSA9IFBpcGU7IiwiXG52YXIgUHJvY2Vzc29yID0gZnVuY3Rpb24gUHJvY2Vzc29yKG9wdGlvbnMpe1xuXHR0aGlzLnNlbGZPcHRpb25zID0gb3B0aW9ucztcblx0dGhpcy5waXBlcyA9IHt9O1xufTtcblxuUHJvY2Vzc29yLnByb3RvdHlwZS5vcHRpb25zID0gZnVuY3Rpb24ob3B0aW9ucykge1xuXHRpZiAob3B0aW9ucykge1xuXHRcdHRoaXMuc2VsZk9wdGlvbnMgPSBvcHRpb25zO1xuXHR9XG5cdHJldHVybiB0aGlzLnNlbGZPcHRpb25zO1xufTtcblxuUHJvY2Vzc29yLnByb3RvdHlwZS5waXBlID0gZnVuY3Rpb24obmFtZSwgcGlwZSkge1xuXHRpZiAodHlwZW9mIG5hbWUgPT09ICdzdHJpbmcnKSB7XG5cdFx0aWYgKHR5cGVvZiBwaXBlID09PSAndW5kZWZpbmVkJykge1xuXHRcdFx0cmV0dXJuIHRoaXMucGlwZXNbbmFtZV07XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRoaXMucGlwZXNbbmFtZV0gPSBwaXBlO1xuXHRcdH1cblx0fVxuXHRpZiAobmFtZSAmJiBuYW1lLm5hbWUpIHtcblx0XHRwaXBlID0gbmFtZTtcblx0XHRpZiAocGlwZS5wcm9jZXNzb3IgPT09IHRoaXMpIHsgcmV0dXJuIHBpcGU7IH1cblx0XHR0aGlzLnBpcGVzW3BpcGUubmFtZV0gPSBwaXBlO1xuXHR9XG5cdHBpcGUucHJvY2Vzc29yID0gdGhpcztcblx0cmV0dXJuIHBpcGU7XG59O1xuXG5Qcm9jZXNzb3IucHJvdG90eXBlLnByb2Nlc3MgPSBmdW5jdGlvbihpbnB1dCwgcGlwZSkge1xuXHR2YXIgY29udGV4dCA9IGlucHV0O1xuXHRjb250ZXh0Lm9wdGlvbnMgPSB0aGlzLm9wdGlvbnMoKTtcblx0dmFyIG5leHRQaXBlID0gcGlwZSB8fCBpbnB1dC5waXBlIHx8ICdkZWZhdWx0Jztcblx0dmFyIGxhc3RQaXBlLCBsYXN0Q29udGV4dDtcblx0d2hpbGUgKG5leHRQaXBlKSB7XG5cdFx0aWYgKHR5cGVvZiBjb250ZXh0Lm5leHRBZnRlckNoaWxkcmVuICE9PSAndW5kZWZpbmVkJykge1xuXHRcdFx0Ly8gY2hpbGRyZW4gcHJvY2Vzc2VkIGFuZCBjb21pbmcgYmFjayB0byBwYXJlbnRcblx0XHRcdGNvbnRleHQubmV4dCA9IGNvbnRleHQubmV4dEFmdGVyQ2hpbGRyZW47XG5cdFx0XHRjb250ZXh0Lm5leHRBZnRlckNoaWxkcmVuID0gbnVsbDtcblx0XHR9XG5cblx0XHRpZiAodHlwZW9mIG5leHRQaXBlID09PSAnc3RyaW5nJykge1xuXHRcdFx0bmV4dFBpcGUgPSB0aGlzLnBpcGUobmV4dFBpcGUpO1xuXHRcdH1cblx0XHRuZXh0UGlwZS5wcm9jZXNzKGNvbnRleHQpO1xuXHRcdGxhc3RDb250ZXh0ID0gY29udGV4dDtcblx0XHRsYXN0UGlwZSA9IG5leHRQaXBlO1xuXHRcdG5leHRQaXBlID0gbnVsbDtcblx0XHRpZiAoY29udGV4dCkge1xuXHRcdFx0aWYgKGNvbnRleHQubmV4dCkge1xuXHRcdFx0XHRjb250ZXh0ID0gY29udGV4dC5uZXh0O1xuXHRcdFx0XHRuZXh0UGlwZSA9IGxhc3RDb250ZXh0Lm5leHRQaXBlIHx8IGNvbnRleHQucGlwZSB8fCBsYXN0UGlwZTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblx0cmV0dXJuIGNvbnRleHQuaGFzUmVzdWx0ID8gY29udGV4dC5yZXN1bHQgOiB1bmRlZmluZWQ7XG59O1xuXG5leHBvcnRzLlByb2Nlc3NvciA9IFByb2Nlc3NvcjtcbiJdfQ==
