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
	exports.version = '0.1.24';
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

var DiffContext = function DiffContext(left, right) {
  this.left = left;
  this.right = right;
  this.pipe = 'diff';
};

DiffContext.prototype = new Context();

exports.DiffContext = DiffContext;

},{"./context":3}],5:[function(require,module,exports){
var Context = require('./context').Context;

var PatchContext = function PatchContext(left, delta) {
  this.left = left;
  this.delta = delta;
  this.pipe = 'patch';
};

PatchContext.prototype = new Context();

exports.PatchContext = PatchContext;

},{"./context":3}],6:[function(require,module,exports){
var Context = require('./context').Context;

var ReverseContext = function ReverseContext(delta) {
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
      return new Date(Date.UTC(+parts[1], +parts[2] - 1, +parts[3], +parts[4], +parts[5], +parts[6], +(parts[7] || 0)));
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

var DiffPatcher = function DiffPatcher(options) {
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

var diffFilter = function arraysDiffFilter(context) {
  if (!context.leftIsArray) {
    return;
  }

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
    if (!objectHash) {
      return false;
    }
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
  var commonHead = 0,
    commonTail = 0,
    index, index1, index2;
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
    result = result || {
      _t: 'a'
    };
    for (index = commonHead; index < len2 - commonTail; index++) {
      result[index] = [array2[index]];
    }
    context.setResult(result).exit();
    return;
  }
  if (commonHead + commonTail === len2) {
    // trivial case, a block (1 or more consecutive items) was removed
    result = result || {
      _t: 'a'
    };
    for (index = commonHead; index < len1 - commonTail; index++) {
      result['_' + index] = [array1[index], 0, 0];
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
  result = result || {
    _t: 'a'
  };
  for (index = commonHead; index < len1 - commonTail; index++) {
    if (arrayIndexOf(seq.indices1, index - commonHead) < 0) {
      // removed
      result['_' + index] = [array1[index], 0, 0];
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
  if (!context.nested) {
    return;
  }
  if (context.delta._t !== 'a') {
    return;
  }
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
  if (!context || !context.children) {
    return;
  }
  if (context.delta._t !== 'a') {
    return;
  }
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
  if (context.delta._t !== 'a') {
    return;
  }
  var name, child;
  for (name in context.delta) {
    if (name === '_t') {
      continue;
    }
    child = new ReverseContext(context.delta[name]);
    context.push(child, name);
  }
  context.exit();
};
reverseFilter.filterName = 'arrays';

var reverseArrayDeltaIndex = function(delta, index, itemDelta) {
  if (typeof index === 'string' && index[0] === '_') {
    return parseInt(index.substr(1), 10);
  } else if (isArray(itemDelta) && itemDelta[2] === 0) {
    return '_' + index;
  }

  var reverseIndex = +index;
  for (var deltaIndex in delta) {
    var deltaItem = delta[deltaIndex];
    if (isArray(deltaItem)) {
      if (deltaItem[2] === ARRAY_MOVE) {
        var moveFromIndex = parseInt(deltaIndex.substr(1), 10);
        var moveToIndex = deltaItem[1];
        if (moveToIndex === +index) {
          return moveFromIndex;
        }
        if (moveFromIndex <= reverseIndex && moveToIndex > reverseIndex) {
          reverseIndex++;
        } else if (moveFromIndex >= reverseIndex && moveToIndex < reverseIndex) {
          reverseIndex--;
        }
      } else if (deltaItem[2] === 0) {
        var deleteIndex = parseInt(deltaIndex.substr(1), 10);
        if (deleteIndex <= reverseIndex) {
          reverseIndex++;
        }
      } else if (deltaItem.length === 1 && deltaIndex <= reverseIndex) {
        reverseIndex--;
      }
    }
  }

  return reverseIndex;
};

var collectChildrenReverseFilter = function collectChildrenReverseFilter(context) {
  if (!context || !context.children) {
    return;
  }
  if (context.delta._t !== 'a') {
    return;
  }
  var length = context.children.length;
  var child;
  var delta = {
    _t: 'a'
  };

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
  if (!context || !context.children) {
    return;
  }
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
  if (context.leftIsArray || context.leftType !== 'object') {
    return;
  }

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
  if (!context.nested) {
    return;
  }
  if (context.delta._t) {
    return;
  }
  var name, child;
  for (name in context.delta) {
    child = new PatchContext(context.left[name], context.delta[name]);
    context.push(child, name);
  }
  context.exit();
};
patchFilter.filterName = 'objects';

var collectChildrenPatchFilter = function collectChildrenPatchFilter(context) {
  if (!context || !context.children) {
    return;
  }
  if (context.delta._t) {
    return;
  }
  var length = context.children.length;
  var child;
  for (var index = 0; index < length; index++) {
    child = context.children[index];
    if (context.left.hasOwnProperty(child.childName) && child.result === undefined) {
      delete context.left[child.childName];
    } else if (context.left[child.childName] !== child.result) {
      context.left[child.childName] = child.result;
    }
  }
  context.setResult(context.left).exit();
};
collectChildrenPatchFilter.filterName = 'collectChildren';

var reverseFilter = function nestedReverseFilter(context) {
  if (!context.nested) {
    return;
  }
  if (context.delta._t) {
    return;
  }
  var name, child;
  for (name in context.delta) {
    child = new ReverseContext(context.delta[name]);
    context.push(child, name);
  }
  context.exit();
};
reverseFilter.filterName = 'objects';

var collectChildrenReverseFilter = function collectChildrenReverseFilter(context) {
  if (!context || !context.children) {
    return;
  }
  if (context.delta._t) {
    return;
  }
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

var getDiffMatchPatch = function() {
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
      diff: function(txt1, txt2) {
        return instance.patch_toText(instance.patch_make(txt1, txt2));
      },
      patch: function(txt1, patch) {
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
  if (context.leftType !== 'string') {
    return;
  }
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
  if (context.nested) {
    return;
  }
  if (context.delta[2] !== TEXT_DIFF) {
    return;
  }

  // text-diff, use a text-patch algorithm
  var patch = getDiffMatchPatch().patch;
  context.setResult(patch(context.left, context.delta[0])).exit();
};
patchFilter.filterName = 'texts';

var textDeltaReverse = function(delta) {
  var i, l, lines, line, lineTmp, header = null,
    headerRegex = /^@@ +\-(\d+),(\d+) +\+(\d+),(\d+) +@@$/,
    lineHeader, lineAdd, lineRemove;
  lines = delta.split('\n');
  for (i = 0, l = lines.length; i < l; i++) {
    line = lines[i];
    var lineStart = line.slice(0, 1);
    if (lineStart === '@') {
      header = headerRegex.exec(line);
      lineHeader = i;
      lineAdd = null;
      lineRemove = null;

      // fix header
      lines[lineHeader] = '@@ -' + header[3] + ',' + header[4] + ' +' + header[1] + ',' + header[2] + ' @@';
    } else if (lineStart === '+') {
      lineAdd = i;
      lines[i] = '-' + lines[i].slice(1);
      if (lines[i - 1].slice(0, 1) === '+') {
        // swap lines to keep default order (-+)
        lineTmp = lines[i];
        lines[i] = lines[i - 1];
        lines[i - 1] = lineTmp;
      }
    } else if (lineStart === '-') {
      lineRemove = i;
      lines[i] = '+' + lines[i].slice(1);
    }
  }
  return lines.join('\n');
};

var reverseFilter = function textsReverseFilter(context) {
  if (context.nested) {
    return;
  }
  if (context.delta[2] !== TEXT_DIFF) {
    return;
  }

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
  if (typeof context.left === 'function' || typeof context.right === 'function') {
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
  if (context.nested) {
    return;
  }
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
  if (context.nested) {
    return;
  }
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
var Pipe = function Pipe(name) {
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
  if (this.resultCheck) {
    return;
  }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9zb3VyY2UtZmlsZXMvanNvbmRpZmZwYXRjaC9ub2RlX21vZHVsZXMvZmliZXJnbGFzcy9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiL3NvdXJjZS1maWxlcy9qc29uZGlmZnBhdGNoL3NyYy9tYWluLmpzIiwiL3NvdXJjZS1maWxlcy9qc29uZGlmZnBhdGNoL25vZGVfbW9kdWxlcy9maWJlcmdsYXNzL25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9wcm9jZXNzL2Jyb3dzZXIuanMiLCIvc291cmNlLWZpbGVzL2pzb25kaWZmcGF0Y2gvc3JjL2NvbnRleHRzL2NvbnRleHQuanMiLCIvc291cmNlLWZpbGVzL2pzb25kaWZmcGF0Y2gvc3JjL2NvbnRleHRzL2RpZmYuanMiLCIvc291cmNlLWZpbGVzL2pzb25kaWZmcGF0Y2gvc3JjL2NvbnRleHRzL3BhdGNoLmpzIiwiL3NvdXJjZS1maWxlcy9qc29uZGlmZnBhdGNoL3NyYy9jb250ZXh0cy9yZXZlcnNlLmpzIiwiL3NvdXJjZS1maWxlcy9qc29uZGlmZnBhdGNoL3NyYy9kYXRlLXJldml2ZXIuanMiLCIvc291cmNlLWZpbGVzL2pzb25kaWZmcGF0Y2gvc3JjL2RpZmZwYXRjaGVyLmpzIiwiL3NvdXJjZS1maWxlcy9qc29uZGlmZnBhdGNoL3NyYy9maWx0ZXJzL2FycmF5cy5qcyIsIi9zb3VyY2UtZmlsZXMvanNvbmRpZmZwYXRjaC9zcmMvZmlsdGVycy9kYXRlcy5qcyIsIi9zb3VyY2UtZmlsZXMvanNvbmRpZmZwYXRjaC9zcmMvZmlsdGVycy9sY3MuanMiLCIvc291cmNlLWZpbGVzL2pzb25kaWZmcGF0Y2gvc3JjL2ZpbHRlcnMvbmVzdGVkLmpzIiwiL3NvdXJjZS1maWxlcy9qc29uZGlmZnBhdGNoL3NyYy9maWx0ZXJzL3RleHRzLmpzIiwiL3NvdXJjZS1maWxlcy9qc29uZGlmZnBhdGNoL3NyYy9maWx0ZXJzL3RyaXZpYWwuanMiLCIvc291cmNlLWZpbGVzL2pzb25kaWZmcGF0Y2gvc3JjL3BpcGUuanMiLCIvc291cmNlLWZpbGVzL2pzb25kaWZmcGF0Y2gvc3JjL3Byb2Nlc3Nvci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN1pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIoZnVuY3Rpb24gKHByb2Nlc3Mpe1xuXG52YXIgRGlmZlBhdGNoZXIgPSByZXF1aXJlKCcuL2RpZmZwYXRjaGVyJykuRGlmZlBhdGNoZXI7XG5leHBvcnRzLkRpZmZQYXRjaGVyID0gRGlmZlBhdGNoZXI7XG5cbmV4cG9ydHMuY3JlYXRlID0gZnVuY3Rpb24ob3B0aW9ucyl7XG5cdHJldHVybiBuZXcgRGlmZlBhdGNoZXIob3B0aW9ucyk7XG59O1xuXG5leHBvcnRzLmRhdGVSZXZpdmVyID0gcmVxdWlyZSgnLi9kYXRlLXJldml2ZXInKTtcblxudmFyIGRlZmF1bHRJbnN0YW5jZTtcblxuZXhwb3J0cy5kaWZmID0gZnVuY3Rpb24oKSB7XG5cdGlmICghZGVmYXVsdEluc3RhbmNlKSB7XG5cdFx0ZGVmYXVsdEluc3RhbmNlID0gbmV3IERpZmZQYXRjaGVyKCk7XG5cdH1cblx0cmV0dXJuIGRlZmF1bHRJbnN0YW5jZS5kaWZmLmFwcGx5KGRlZmF1bHRJbnN0YW5jZSwgYXJndW1lbnRzKTtcbn07XG5cbmV4cG9ydHMucGF0Y2ggPSBmdW5jdGlvbigpIHtcblx0aWYgKCFkZWZhdWx0SW5zdGFuY2UpIHtcblx0XHRkZWZhdWx0SW5zdGFuY2UgPSBuZXcgRGlmZlBhdGNoZXIoKTtcblx0fVxuXHRyZXR1cm4gZGVmYXVsdEluc3RhbmNlLnBhdGNoLmFwcGx5KGRlZmF1bHRJbnN0YW5jZSwgYXJndW1lbnRzKTtcbn07XG5cbmV4cG9ydHMudW5wYXRjaCA9IGZ1bmN0aW9uKCkge1xuXHRpZiAoIWRlZmF1bHRJbnN0YW5jZSkge1xuXHRcdGRlZmF1bHRJbnN0YW5jZSA9IG5ldyBEaWZmUGF0Y2hlcigpO1xuXHR9XG5cdHJldHVybiBkZWZhdWx0SW5zdGFuY2UudW5wYXRjaC5hcHBseShkZWZhdWx0SW5zdGFuY2UsIGFyZ3VtZW50cyk7XG59O1xuXG5leHBvcnRzLnJldmVyc2UgPSBmdW5jdGlvbigpIHtcblx0aWYgKCFkZWZhdWx0SW5zdGFuY2UpIHtcblx0XHRkZWZhdWx0SW5zdGFuY2UgPSBuZXcgRGlmZlBhdGNoZXIoKTtcblx0fVxuXHRyZXR1cm4gZGVmYXVsdEluc3RhbmNlLnJldmVyc2UuYXBwbHkoZGVmYXVsdEluc3RhbmNlLCBhcmd1bWVudHMpO1xufTtcblxuaWYgKHByb2Nlc3MuYnJvd3Nlcikge1xuXHRleHBvcnRzLmhvbWVwYWdlID0gJ3t7cGFja2FnZS1ob21lcGFnZX19Jztcblx0ZXhwb3J0cy52ZXJzaW9uID0gJ3t7cGFja2FnZS12ZXJzaW9ufX0nO1xufSBlbHNlIHtcblx0dmFyIHBhY2thZ2VJbmZvTW9kdWxlTmFtZSA9ICcuLi9wYWNrYWdlLmpzb24nO1xuXHR2YXIgcGFja2FnZUluZm8gPSByZXF1aXJlKHBhY2thZ2VJbmZvTW9kdWxlTmFtZSk7XG5cdGV4cG9ydHMuaG9tZXBhZ2UgPSBwYWNrYWdlSW5mby5ob21lcGFnZTtcblx0ZXhwb3J0cy52ZXJzaW9uID0gcGFja2FnZUluZm8udmVyc2lvbjtcblxuXHR2YXIgZm9ybWF0dGVyTW9kdWxlTmFtZSA9ICcuL2Zvcm1hdHRlcnMnO1xuXHR2YXIgZm9ybWF0dGVycyA9IHJlcXVpcmUoZm9ybWF0dGVyTW9kdWxlTmFtZSk7XG5cdGV4cG9ydHMuZm9ybWF0dGVycyA9IGZvcm1hdHRlcnM7XG5cdC8vIHNob3J0Y3V0IGZvciBjb25zb2xlXG5cdGV4cG9ydHMuY29uc29sZSA9IGZvcm1hdHRlcnMuY29uc29sZTtcbn1cblxufSkuY2FsbCh0aGlzLHJlcXVpcmUoJ19wcm9jZXNzJykpIiwiLy8gc2hpbSBmb3IgdXNpbmcgcHJvY2VzcyBpbiBicm93c2VyXG5cbnZhciBwcm9jZXNzID0gbW9kdWxlLmV4cG9ydHMgPSB7fTtcblxucHJvY2Vzcy5uZXh0VGljayA9IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGNhblNldEltbWVkaWF0ZSA9IHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnXG4gICAgJiYgd2luZG93LnNldEltbWVkaWF0ZTtcbiAgICB2YXIgY2FuUG9zdCA9IHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnXG4gICAgJiYgd2luZG93LnBvc3RNZXNzYWdlICYmIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyXG4gICAgO1xuXG4gICAgaWYgKGNhblNldEltbWVkaWF0ZSkge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKGYpIHsgcmV0dXJuIHdpbmRvdy5zZXRJbW1lZGlhdGUoZikgfTtcbiAgICB9XG5cbiAgICBpZiAoY2FuUG9zdCkge1xuICAgICAgICB2YXIgcXVldWUgPSBbXTtcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCBmdW5jdGlvbiAoZXYpIHtcbiAgICAgICAgICAgIHZhciBzb3VyY2UgPSBldi5zb3VyY2U7XG4gICAgICAgICAgICBpZiAoKHNvdXJjZSA9PT0gd2luZG93IHx8IHNvdXJjZSA9PT0gbnVsbCkgJiYgZXYuZGF0YSA9PT0gJ3Byb2Nlc3MtdGljaycpIHtcbiAgICAgICAgICAgICAgICBldi5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgICAgICBpZiAocXVldWUubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgZm4gPSBxdWV1ZS5zaGlmdCgpO1xuICAgICAgICAgICAgICAgICAgICBmbigpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgdHJ1ZSk7XG5cbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIG5leHRUaWNrKGZuKSB7XG4gICAgICAgICAgICBxdWV1ZS5wdXNoKGZuKTtcbiAgICAgICAgICAgIHdpbmRvdy5wb3N0TWVzc2FnZSgncHJvY2Vzcy10aWNrJywgJyonKTtcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICByZXR1cm4gZnVuY3Rpb24gbmV4dFRpY2soZm4pIHtcbiAgICAgICAgc2V0VGltZW91dChmbiwgMCk7XG4gICAgfTtcbn0pKCk7XG5cbnByb2Nlc3MudGl0bGUgPSAnYnJvd3Nlcic7XG5wcm9jZXNzLmJyb3dzZXIgPSB0cnVlO1xucHJvY2Vzcy5lbnYgPSB7fTtcbnByb2Nlc3MuYXJndiA9IFtdO1xuXG5mdW5jdGlvbiBub29wKCkge31cblxucHJvY2Vzcy5vbiA9IG5vb3A7XG5wcm9jZXNzLmFkZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3Mub25jZSA9IG5vb3A7XG5wcm9jZXNzLm9mZiA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUxpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlQWxsTGlzdGVuZXJzID0gbm9vcDtcbnByb2Nlc3MuZW1pdCA9IG5vb3A7XG5cbnByb2Nlc3MuYmluZGluZyA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmJpbmRpbmcgaXMgbm90IHN1cHBvcnRlZCcpO1xufVxuXG4vLyBUT0RPKHNodHlsbWFuKVxucHJvY2Vzcy5jd2QgPSBmdW5jdGlvbiAoKSB7IHJldHVybiAnLycgfTtcbnByb2Nlc3MuY2hkaXIgPSBmdW5jdGlvbiAoZGlyKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmNoZGlyIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG4iLCJcbnZhciBQaXBlID0gcmVxdWlyZSgnLi4vcGlwZScpLlBpcGU7XG5cbnZhciBDb250ZXh0ID0gZnVuY3Rpb24gQ29udGV4dCgpe1xufTtcblxuQ29udGV4dC5wcm90b3R5cGUuc2V0UmVzdWx0ID0gZnVuY3Rpb24ocmVzdWx0KSB7XG5cdHRoaXMucmVzdWx0ID0gcmVzdWx0O1xuXHR0aGlzLmhhc1Jlc3VsdCA9IHRydWU7XG5cdHJldHVybiB0aGlzO1xufTtcblxuQ29udGV4dC5wcm90b3R5cGUuZXhpdCA9IGZ1bmN0aW9uKCkge1xuXHR0aGlzLmV4aXRpbmcgPSB0cnVlO1xuXHRyZXR1cm4gdGhpcztcbn07XG5cbkNvbnRleHQucHJvdG90eXBlLnN3aXRjaFRvID0gZnVuY3Rpb24obmV4dCwgcGlwZSkge1xuXHRpZiAodHlwZW9mIG5leHQgPT09ICdzdHJpbmcnIHx8IG5leHQgaW5zdGFuY2VvZiBQaXBlKSB7XG5cdFx0dGhpcy5uZXh0UGlwZSA9IG5leHQ7XG5cdH0gZWxzZSB7XG5cdFx0dGhpcy5uZXh0ID0gbmV4dDtcblx0XHRpZiAocGlwZSkge1xuXHRcdFx0dGhpcy5uZXh0UGlwZSA9IHBpcGU7XG5cdFx0fVxuXHR9XG5cdHJldHVybiB0aGlzO1xufTtcblxuQ29udGV4dC5wcm90b3R5cGUucHVzaCA9IGZ1bmN0aW9uKGNoaWxkLCBuYW1lKSB7XG5cdGNoaWxkLnBhcmVudCA9IHRoaXM7XG5cdGlmICh0eXBlb2YgbmFtZSAhPT0gJ3VuZGVmaW5lZCcpIHtcblx0XHRjaGlsZC5jaGlsZE5hbWUgPSBuYW1lO1xuXHR9XG5cdGNoaWxkLnJvb3QgPSB0aGlzLnJvb3QgfHwgdGhpcztcblx0Y2hpbGQub3B0aW9ucyA9IGNoaWxkLm9wdGlvbnMgfHwgdGhpcy5vcHRpb25zO1xuXHRpZiAoIXRoaXMuY2hpbGRyZW4pIHtcblx0XHR0aGlzLmNoaWxkcmVuID0gW2NoaWxkXTtcblx0XHR0aGlzLm5leHRBZnRlckNoaWxkcmVuID0gdGhpcy5uZXh0IHx8IG51bGw7XG5cdFx0dGhpcy5uZXh0ID0gY2hpbGQ7XG5cdH0gZWxzZSB7XG5cdFx0dGhpcy5jaGlsZHJlblt0aGlzLmNoaWxkcmVuLmxlbmd0aCAtIDFdLm5leHQgPSBjaGlsZDtcblx0XHR0aGlzLmNoaWxkcmVuLnB1c2goY2hpbGQpO1xuXHR9XG5cdGNoaWxkLm5leHQgPSB0aGlzO1xuXHRyZXR1cm4gdGhpcztcbn07XG5cbmV4cG9ydHMuQ29udGV4dCA9IENvbnRleHQ7XG4iLCJ2YXIgQ29udGV4dCA9IHJlcXVpcmUoJy4vY29udGV4dCcpLkNvbnRleHQ7XG5cbnZhciBEaWZmQ29udGV4dCA9IGZ1bmN0aW9uIERpZmZDb250ZXh0KGxlZnQsIHJpZ2h0KSB7XG4gIHRoaXMubGVmdCA9IGxlZnQ7XG4gIHRoaXMucmlnaHQgPSByaWdodDtcbiAgdGhpcy5waXBlID0gJ2RpZmYnO1xufTtcblxuRGlmZkNvbnRleHQucHJvdG90eXBlID0gbmV3IENvbnRleHQoKTtcblxuZXhwb3J0cy5EaWZmQ29udGV4dCA9IERpZmZDb250ZXh0O1xuIiwidmFyIENvbnRleHQgPSByZXF1aXJlKCcuL2NvbnRleHQnKS5Db250ZXh0O1xuXG52YXIgUGF0Y2hDb250ZXh0ID0gZnVuY3Rpb24gUGF0Y2hDb250ZXh0KGxlZnQsIGRlbHRhKSB7XG4gIHRoaXMubGVmdCA9IGxlZnQ7XG4gIHRoaXMuZGVsdGEgPSBkZWx0YTtcbiAgdGhpcy5waXBlID0gJ3BhdGNoJztcbn07XG5cblBhdGNoQ29udGV4dC5wcm90b3R5cGUgPSBuZXcgQ29udGV4dCgpO1xuXG5leHBvcnRzLlBhdGNoQ29udGV4dCA9IFBhdGNoQ29udGV4dDtcbiIsInZhciBDb250ZXh0ID0gcmVxdWlyZSgnLi9jb250ZXh0JykuQ29udGV4dDtcblxudmFyIFJldmVyc2VDb250ZXh0ID0gZnVuY3Rpb24gUmV2ZXJzZUNvbnRleHQoZGVsdGEpIHtcbiAgdGhpcy5kZWx0YSA9IGRlbHRhO1xuICB0aGlzLnBpcGUgPSAncmV2ZXJzZSc7XG59O1xuXG5SZXZlcnNlQ29udGV4dC5wcm90b3R5cGUgPSBuZXcgQ29udGV4dCgpO1xuXG5leHBvcnRzLlJldmVyc2VDb250ZXh0ID0gUmV2ZXJzZUNvbnRleHQ7XG4iLCIvLyB1c2UgYXMgMm5kIHBhcmFtZXRlciBmb3IgSlNPTi5wYXJzZSB0byByZXZpdmUgRGF0ZSBpbnN0YW5jZXNcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZGF0ZVJldml2ZXIoa2V5LCB2YWx1ZSkge1xuICB2YXIgcGFydHM7XG4gIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XG4gICAgcGFydHMgPSAvXihcXGR7NH0pLShcXGR7Mn0pLShcXGR7Mn0pVChcXGR7Mn0pOihcXGR7Mn0pOihcXGR7Mn0pKD86XFwuKFxcZCopKT8oWnwoWytcXC1dKShcXGR7Mn0pOihcXGR7Mn0pKSQvLmV4ZWModmFsdWUpO1xuICAgIGlmIChwYXJ0cykge1xuICAgICAgcmV0dXJuIG5ldyBEYXRlKERhdGUuVVRDKCtwYXJ0c1sxXSwgK3BhcnRzWzJdIC0gMSwgK3BhcnRzWzNdLCArcGFydHNbNF0sICtwYXJ0c1s1XSwgK3BhcnRzWzZdLCArKHBhcnRzWzddIHx8IDApKSk7XG4gICAgfVxuICB9XG4gIHJldHVybiB2YWx1ZTtcbn07XG4iLCJ2YXIgUHJvY2Vzc29yID0gcmVxdWlyZSgnLi9wcm9jZXNzb3InKS5Qcm9jZXNzb3I7XG52YXIgUGlwZSA9IHJlcXVpcmUoJy4vcGlwZScpLlBpcGU7XG52YXIgRGlmZkNvbnRleHQgPSByZXF1aXJlKCcuL2NvbnRleHRzL2RpZmYnKS5EaWZmQ29udGV4dDtcbnZhciBQYXRjaENvbnRleHQgPSByZXF1aXJlKCcuL2NvbnRleHRzL3BhdGNoJykuUGF0Y2hDb250ZXh0O1xudmFyIFJldmVyc2VDb250ZXh0ID0gcmVxdWlyZSgnLi9jb250ZXh0cy9yZXZlcnNlJykuUmV2ZXJzZUNvbnRleHQ7XG5cbnZhciB0cml2aWFsID0gcmVxdWlyZSgnLi9maWx0ZXJzL3RyaXZpYWwnKTtcbnZhciBuZXN0ZWQgPSByZXF1aXJlKCcuL2ZpbHRlcnMvbmVzdGVkJyk7XG52YXIgYXJyYXlzID0gcmVxdWlyZSgnLi9maWx0ZXJzL2FycmF5cycpO1xudmFyIGRhdGVzID0gcmVxdWlyZSgnLi9maWx0ZXJzL2RhdGVzJyk7XG52YXIgdGV4dHMgPSByZXF1aXJlKCcuL2ZpbHRlcnMvdGV4dHMnKTtcblxudmFyIERpZmZQYXRjaGVyID0gZnVuY3Rpb24gRGlmZlBhdGNoZXIob3B0aW9ucykge1xuICB0aGlzLnByb2Nlc3NvciA9IG5ldyBQcm9jZXNzb3Iob3B0aW9ucyk7XG4gIHRoaXMucHJvY2Vzc29yLnBpcGUobmV3IFBpcGUoJ2RpZmYnKS5hcHBlbmQoXG4gICAgbmVzdGVkLmNvbGxlY3RDaGlsZHJlbkRpZmZGaWx0ZXIsXG4gICAgdHJpdmlhbC5kaWZmRmlsdGVyLFxuICAgIGRhdGVzLmRpZmZGaWx0ZXIsXG4gICAgdGV4dHMuZGlmZkZpbHRlcixcbiAgICBuZXN0ZWQub2JqZWN0c0RpZmZGaWx0ZXIsXG4gICAgYXJyYXlzLmRpZmZGaWx0ZXJcbiAgKS5zaG91bGRIYXZlUmVzdWx0KCkpO1xuICB0aGlzLnByb2Nlc3Nvci5waXBlKG5ldyBQaXBlKCdwYXRjaCcpLmFwcGVuZChcbiAgICBuZXN0ZWQuY29sbGVjdENoaWxkcmVuUGF0Y2hGaWx0ZXIsXG4gICAgYXJyYXlzLmNvbGxlY3RDaGlsZHJlblBhdGNoRmlsdGVyLFxuICAgIHRyaXZpYWwucGF0Y2hGaWx0ZXIsXG4gICAgdGV4dHMucGF0Y2hGaWx0ZXIsXG4gICAgbmVzdGVkLnBhdGNoRmlsdGVyLFxuICAgIGFycmF5cy5wYXRjaEZpbHRlclxuICApLnNob3VsZEhhdmVSZXN1bHQoKSk7XG4gIHRoaXMucHJvY2Vzc29yLnBpcGUobmV3IFBpcGUoJ3JldmVyc2UnKS5hcHBlbmQoXG4gICAgbmVzdGVkLmNvbGxlY3RDaGlsZHJlblJldmVyc2VGaWx0ZXIsXG4gICAgYXJyYXlzLmNvbGxlY3RDaGlsZHJlblJldmVyc2VGaWx0ZXIsXG4gICAgdHJpdmlhbC5yZXZlcnNlRmlsdGVyLFxuICAgIHRleHRzLnJldmVyc2VGaWx0ZXIsXG4gICAgbmVzdGVkLnJldmVyc2VGaWx0ZXIsXG4gICAgYXJyYXlzLnJldmVyc2VGaWx0ZXJcbiAgKS5zaG91bGRIYXZlUmVzdWx0KCkpO1xufTtcblxuRGlmZlBhdGNoZXIucHJvdG90eXBlLm9wdGlvbnMgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXMucHJvY2Vzc29yLm9wdGlvbnMuYXBwbHkodGhpcy5wcm9jZXNzb3IsIGFyZ3VtZW50cyk7XG59O1xuXG5EaWZmUGF0Y2hlci5wcm90b3R5cGUuZGlmZiA9IGZ1bmN0aW9uKGxlZnQsIHJpZ2h0KSB7XG4gIHJldHVybiB0aGlzLnByb2Nlc3Nvci5wcm9jZXNzKG5ldyBEaWZmQ29udGV4dChsZWZ0LCByaWdodCkpO1xufTtcblxuRGlmZlBhdGNoZXIucHJvdG90eXBlLnBhdGNoID0gZnVuY3Rpb24obGVmdCwgZGVsdGEpIHtcbiAgcmV0dXJuIHRoaXMucHJvY2Vzc29yLnByb2Nlc3MobmV3IFBhdGNoQ29udGV4dChsZWZ0LCBkZWx0YSkpO1xufTtcblxuRGlmZlBhdGNoZXIucHJvdG90eXBlLnJldmVyc2UgPSBmdW5jdGlvbihkZWx0YSkge1xuICByZXR1cm4gdGhpcy5wcm9jZXNzb3IucHJvY2VzcyhuZXcgUmV2ZXJzZUNvbnRleHQoZGVsdGEpKTtcbn07XG5cbkRpZmZQYXRjaGVyLnByb3RvdHlwZS51bnBhdGNoID0gZnVuY3Rpb24ocmlnaHQsIGRlbHRhKSB7XG4gIHJldHVybiB0aGlzLnBhdGNoKHJpZ2h0LCB0aGlzLnJldmVyc2UoZGVsdGEpKTtcbn07XG5cbmV4cG9ydHMuRGlmZlBhdGNoZXIgPSBEaWZmUGF0Y2hlcjtcbiIsInZhciBEaWZmQ29udGV4dCA9IHJlcXVpcmUoJy4uL2NvbnRleHRzL2RpZmYnKS5EaWZmQ29udGV4dDtcbnZhciBQYXRjaENvbnRleHQgPSByZXF1aXJlKCcuLi9jb250ZXh0cy9wYXRjaCcpLlBhdGNoQ29udGV4dDtcbnZhciBSZXZlcnNlQ29udGV4dCA9IHJlcXVpcmUoJy4uL2NvbnRleHRzL3JldmVyc2UnKS5SZXZlcnNlQ29udGV4dDtcblxudmFyIGxjcyA9IHJlcXVpcmUoJy4vbGNzJyk7XG5cbnZhciBBUlJBWV9NT1ZFID0gMztcblxudmFyIGlzQXJyYXkgPSAodHlwZW9mIEFycmF5LmlzQXJyYXkgPT09ICdmdW5jdGlvbicpID9cbiAgLy8gdXNlIG5hdGl2ZSBmdW5jdGlvblxuICBBcnJheS5pc0FycmF5IDpcbiAgLy8gdXNlIGluc3RhbmNlb2Ygb3BlcmF0b3JcbiAgZnVuY3Rpb24oYSkge1xuICAgIHJldHVybiBhIGluc3RhbmNlb2YgQXJyYXk7XG4gIH07XG5cbnZhciBhcnJheUluZGV4T2YgPSB0eXBlb2YgQXJyYXkucHJvdG90eXBlLmluZGV4T2YgPT09ICdmdW5jdGlvbicgP1xuICBmdW5jdGlvbihhcnJheSwgaXRlbSkge1xuICAgIHJldHVybiBhcnJheS5pbmRleE9mKGl0ZW0pO1xuICB9IDogZnVuY3Rpb24oYXJyYXksIGl0ZW0pIHtcbiAgICB2YXIgbGVuZ3RoID0gYXJyYXkubGVuZ3RoO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmIChhcnJheVtpXSA9PT0gaXRlbSkge1xuICAgICAgICByZXR1cm4gaTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIC0xO1xuICB9O1xuXG52YXIgZGlmZkZpbHRlciA9IGZ1bmN0aW9uIGFycmF5c0RpZmZGaWx0ZXIoY29udGV4dCkge1xuICBpZiAoIWNvbnRleHQubGVmdElzQXJyYXkpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICB2YXIgb2JqZWN0SGFzaCA9IGNvbnRleHQub3B0aW9ucyAmJiBjb250ZXh0Lm9wdGlvbnMub2JqZWN0SGFzaDtcblxuICB2YXIgbWF0Y2ggPSBmdW5jdGlvbihhcnJheTEsIGFycmF5MiwgaW5kZXgxLCBpbmRleDIsIGNvbnRleHQpIHtcbiAgICB2YXIgdmFsdWUxID0gYXJyYXkxW2luZGV4MV07XG4gICAgdmFyIHZhbHVlMiA9IGFycmF5MltpbmRleDJdO1xuICAgIGlmICh2YWx1ZTEgPT09IHZhbHVlMikge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIGlmICh0eXBlb2YgdmFsdWUxICE9PSAnb2JqZWN0JyB8fCB0eXBlb2YgdmFsdWUyICE9PSAnb2JqZWN0Jykge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBpZiAoIW9iamVjdEhhc2gpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgdmFyIGhhc2gxLCBoYXNoMjtcbiAgICBpZiAodHlwZW9mIGluZGV4MSA9PT0gJ251bWJlcicpIHtcbiAgICAgIGNvbnRleHQuaGFzaENhY2hlMSA9IGNvbnRleHQuaGFzaENhY2hlMSB8fCBbXTtcbiAgICAgIGhhc2gxID0gY29udGV4dC5oYXNoQ2FjaGUxW2luZGV4MV07XG4gICAgICBpZiAodHlwZW9mIGhhc2gxID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICBjb250ZXh0Lmhhc2hDYWNoZTFbaW5kZXgxXSA9IGhhc2gxID0gb2JqZWN0SGFzaCh2YWx1ZTEsIGluZGV4MSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGhhc2gxID0gb2JqZWN0SGFzaCh2YWx1ZTEpO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIGhhc2gxID09PSAndW5kZWZpbmVkJykge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIGluZGV4MiA9PT0gJ251bWJlcicpIHtcbiAgICAgIGNvbnRleHQuaGFzaENhY2hlMiA9IGNvbnRleHQuaGFzaENhY2hlMiB8fCBbXTtcbiAgICAgIGhhc2gyID0gY29udGV4dC5oYXNoQ2FjaGUyW2luZGV4Ml07XG4gICAgICBpZiAodHlwZW9mIGhhc2gyID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICBjb250ZXh0Lmhhc2hDYWNoZTJbaW5kZXgyXSA9IGhhc2gyID0gb2JqZWN0SGFzaCh2YWx1ZTIsIGluZGV4Mik7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGhhc2gyID0gb2JqZWN0SGFzaCh2YWx1ZTIpO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIGhhc2gyID09PSAndW5kZWZpbmVkJykge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gaGFzaDEgPT09IGhhc2gyO1xuICB9O1xuXG4gIHZhciBtYXRjaENvbnRleHQgPSB7fTtcbiAgdmFyIGNvbW1vbkhlYWQgPSAwLFxuICAgIGNvbW1vblRhaWwgPSAwLFxuICAgIGluZGV4LCBpbmRleDEsIGluZGV4MjtcbiAgdmFyIGFycmF5MSA9IGNvbnRleHQubGVmdDtcbiAgdmFyIGFycmF5MiA9IGNvbnRleHQucmlnaHQ7XG4gIHZhciBsZW4xID0gYXJyYXkxLmxlbmd0aDtcbiAgdmFyIGxlbjIgPSBhcnJheTIubGVuZ3RoO1xuXG4gIHZhciBjaGlsZDtcblxuICAvLyBzZXBhcmF0ZSBjb21tb24gaGVhZFxuICB3aGlsZSAoY29tbW9uSGVhZCA8IGxlbjEgJiYgY29tbW9uSGVhZCA8IGxlbjIgJiZcbiAgICBtYXRjaChhcnJheTEsIGFycmF5MiwgY29tbW9uSGVhZCwgY29tbW9uSGVhZCwgbWF0Y2hDb250ZXh0KSkge1xuICAgIGluZGV4ID0gY29tbW9uSGVhZDtcbiAgICBjaGlsZCA9IG5ldyBEaWZmQ29udGV4dChjb250ZXh0LmxlZnRbaW5kZXhdLCBjb250ZXh0LnJpZ2h0W2luZGV4XSk7XG4gICAgY29udGV4dC5wdXNoKGNoaWxkLCBpbmRleCk7XG4gICAgY29tbW9uSGVhZCsrO1xuICB9XG4gIC8vIHNlcGFyYXRlIGNvbW1vbiB0YWlsXG4gIHdoaWxlIChjb21tb25UYWlsICsgY29tbW9uSGVhZCA8IGxlbjEgJiYgY29tbW9uVGFpbCArIGNvbW1vbkhlYWQgPCBsZW4yICYmXG4gICAgbWF0Y2goYXJyYXkxLCBhcnJheTIsIGxlbjEgLSAxIC0gY29tbW9uVGFpbCwgbGVuMiAtIDEgLSBjb21tb25UYWlsLCBtYXRjaENvbnRleHQpKSB7XG4gICAgaW5kZXgxID0gbGVuMSAtIDEgLSBjb21tb25UYWlsO1xuICAgIGluZGV4MiA9IGxlbjIgLSAxIC0gY29tbW9uVGFpbDtcbiAgICBjaGlsZCA9IG5ldyBEaWZmQ29udGV4dChjb250ZXh0LmxlZnRbaW5kZXgxXSwgY29udGV4dC5yaWdodFtpbmRleDJdKTtcbiAgICBjb250ZXh0LnB1c2goY2hpbGQsIGluZGV4Mik7XG4gICAgY29tbW9uVGFpbCsrO1xuICB9XG4gIHZhciByZXN1bHQ7XG4gIGlmIChjb21tb25IZWFkICsgY29tbW9uVGFpbCA9PT0gbGVuMSkge1xuICAgIGlmIChsZW4xID09PSBsZW4yKSB7XG4gICAgICAvLyBhcnJheXMgYXJlIGlkZW50aWNhbFxuICAgICAgY29udGV4dC5zZXRSZXN1bHQodW5kZWZpbmVkKS5leGl0KCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIC8vIHRyaXZpYWwgY2FzZSwgYSBibG9jayAoMSBvciBtb3JlIGNvbnNlY3V0aXZlIGl0ZW1zKSB3YXMgYWRkZWRcbiAgICByZXN1bHQgPSByZXN1bHQgfHwge1xuICAgICAgX3Q6ICdhJ1xuICAgIH07XG4gICAgZm9yIChpbmRleCA9IGNvbW1vbkhlYWQ7IGluZGV4IDwgbGVuMiAtIGNvbW1vblRhaWw7IGluZGV4KyspIHtcbiAgICAgIHJlc3VsdFtpbmRleF0gPSBbYXJyYXkyW2luZGV4XV07XG4gICAgfVxuICAgIGNvbnRleHQuc2V0UmVzdWx0KHJlc3VsdCkuZXhpdCgpO1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAoY29tbW9uSGVhZCArIGNvbW1vblRhaWwgPT09IGxlbjIpIHtcbiAgICAvLyB0cml2aWFsIGNhc2UsIGEgYmxvY2sgKDEgb3IgbW9yZSBjb25zZWN1dGl2ZSBpdGVtcykgd2FzIHJlbW92ZWRcbiAgICByZXN1bHQgPSByZXN1bHQgfHwge1xuICAgICAgX3Q6ICdhJ1xuICAgIH07XG4gICAgZm9yIChpbmRleCA9IGNvbW1vbkhlYWQ7IGluZGV4IDwgbGVuMSAtIGNvbW1vblRhaWw7IGluZGV4KyspIHtcbiAgICAgIHJlc3VsdFsnXycgKyBpbmRleF0gPSBbYXJyYXkxW2luZGV4XSwgMCwgMF07XG4gICAgfVxuICAgIGNvbnRleHQuc2V0UmVzdWx0KHJlc3VsdCkuZXhpdCgpO1xuICAgIHJldHVybjtcbiAgfVxuICAvLyByZXNldCBoYXNoIGNhY2hlXG4gIG1hdGNoQ29udGV4dCA9IHt9O1xuICAvLyBkaWZmIGlzIG5vdCB0cml2aWFsLCBmaW5kIHRoZSBMQ1MgKExvbmdlc3QgQ29tbW9uIFN1YnNlcXVlbmNlKVxuICB2YXIgdHJpbW1lZDEgPSBhcnJheTEuc2xpY2UoY29tbW9uSGVhZCwgbGVuMSAtIGNvbW1vblRhaWwpO1xuICB2YXIgdHJpbW1lZDIgPSBhcnJheTIuc2xpY2UoY29tbW9uSGVhZCwgbGVuMiAtIGNvbW1vblRhaWwpO1xuICB2YXIgc2VxID0gbGNzLmdldChcbiAgICB0cmltbWVkMSwgdHJpbW1lZDIsXG4gICAgbWF0Y2gsXG4gICAgbWF0Y2hDb250ZXh0XG4gICk7XG4gIHZhciByZW1vdmVkSXRlbXMgPSBbXTtcbiAgcmVzdWx0ID0gcmVzdWx0IHx8IHtcbiAgICBfdDogJ2EnXG4gIH07XG4gIGZvciAoaW5kZXggPSBjb21tb25IZWFkOyBpbmRleCA8IGxlbjEgLSBjb21tb25UYWlsOyBpbmRleCsrKSB7XG4gICAgaWYgKGFycmF5SW5kZXhPZihzZXEuaW5kaWNlczEsIGluZGV4IC0gY29tbW9uSGVhZCkgPCAwKSB7XG4gICAgICAvLyByZW1vdmVkXG4gICAgICByZXN1bHRbJ18nICsgaW5kZXhdID0gW2FycmF5MVtpbmRleF0sIDAsIDBdO1xuICAgICAgcmVtb3ZlZEl0ZW1zLnB1c2goaW5kZXgpO1xuICAgIH1cbiAgfVxuXG4gIHZhciBkZXRlY3RNb3ZlID0gdHJ1ZTtcbiAgaWYgKGNvbnRleHQub3B0aW9ucyAmJiBjb250ZXh0Lm9wdGlvbnMuYXJyYXlzICYmIGNvbnRleHQub3B0aW9ucy5hcnJheXMuZGV0ZWN0TW92ZSA9PT0gZmFsc2UpIHtcbiAgICBkZXRlY3RNb3ZlID0gZmFsc2U7XG4gIH1cbiAgdmFyIGluY2x1ZGVWYWx1ZU9uTW92ZSA9IGZhbHNlO1xuICBpZiAoY29udGV4dC5vcHRpb25zICYmIGNvbnRleHQub3B0aW9ucy5hcnJheXMgJiYgY29udGV4dC5vcHRpb25zLmFycmF5cy5pbmNsdWRlVmFsdWVPbk1vdmUpIHtcbiAgICBpbmNsdWRlVmFsdWVPbk1vdmUgPSB0cnVlO1xuICB9XG5cbiAgdmFyIHJlbW92ZWRJdGVtc0xlbmd0aCA9IHJlbW92ZWRJdGVtcy5sZW5ndGg7XG4gIGZvciAoaW5kZXggPSBjb21tb25IZWFkOyBpbmRleCA8IGxlbjIgLSBjb21tb25UYWlsOyBpbmRleCsrKSB7XG4gICAgdmFyIGluZGV4T25BcnJheTIgPSBhcnJheUluZGV4T2Yoc2VxLmluZGljZXMyLCBpbmRleCAtIGNvbW1vbkhlYWQpO1xuICAgIGlmIChpbmRleE9uQXJyYXkyIDwgMCkge1xuICAgICAgLy8gYWRkZWQsIHRyeSB0byBtYXRjaCB3aXRoIGEgcmVtb3ZlZCBpdGVtIGFuZCByZWdpc3RlciBhcyBwb3NpdGlvbiBtb3ZlXG4gICAgICB2YXIgaXNNb3ZlID0gZmFsc2U7XG4gICAgICBpZiAoZGV0ZWN0TW92ZSAmJiByZW1vdmVkSXRlbXNMZW5ndGggPiAwKSB7XG4gICAgICAgIGZvciAodmFyIHJlbW92ZUl0ZW1JbmRleDEgPSAwOyByZW1vdmVJdGVtSW5kZXgxIDwgcmVtb3ZlZEl0ZW1zTGVuZ3RoOyByZW1vdmVJdGVtSW5kZXgxKyspIHtcbiAgICAgICAgICBpbmRleDEgPSByZW1vdmVkSXRlbXNbcmVtb3ZlSXRlbUluZGV4MV07XG4gICAgICAgICAgaWYgKG1hdGNoKHRyaW1tZWQxLCB0cmltbWVkMiwgaW5kZXgxIC0gY29tbW9uSGVhZCxcbiAgICAgICAgICAgIGluZGV4IC0gY29tbW9uSGVhZCwgbWF0Y2hDb250ZXh0KSkge1xuICAgICAgICAgICAgLy8gc3RvcmUgcG9zaXRpb24gbW92ZSBhczogW29yaWdpbmFsVmFsdWUsIG5ld1Bvc2l0aW9uLCBBUlJBWV9NT1ZFXVxuICAgICAgICAgICAgcmVzdWx0WydfJyArIGluZGV4MV0uc3BsaWNlKDEsIDIsIGluZGV4LCBBUlJBWV9NT1ZFKTtcbiAgICAgICAgICAgIGlmICghaW5jbHVkZVZhbHVlT25Nb3ZlKSB7XG4gICAgICAgICAgICAgIC8vIGRvbid0IGluY2x1ZGUgbW92ZWQgdmFsdWUgb24gZGlmZiwgdG8gc2F2ZSBieXRlc1xuICAgICAgICAgICAgICByZXN1bHRbJ18nICsgaW5kZXgxXVswXSA9ICcnO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpbmRleDIgPSBpbmRleDtcbiAgICAgICAgICAgIGNoaWxkID0gbmV3IERpZmZDb250ZXh0KGNvbnRleHQubGVmdFtpbmRleDFdLCBjb250ZXh0LnJpZ2h0W2luZGV4Ml0pO1xuICAgICAgICAgICAgY29udGV4dC5wdXNoKGNoaWxkLCBpbmRleDIpO1xuICAgICAgICAgICAgcmVtb3ZlZEl0ZW1zLnNwbGljZShyZW1vdmVJdGVtSW5kZXgxLCAxKTtcbiAgICAgICAgICAgIGlzTW92ZSA9IHRydWU7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmICghaXNNb3ZlKSB7XG4gICAgICAgIC8vIGFkZGVkXG4gICAgICAgIHJlc3VsdFtpbmRleF0gPSBbYXJyYXkyW2luZGV4XV07XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIG1hdGNoLCBkbyBpbm5lciBkaWZmXG4gICAgICBpbmRleDEgPSBzZXEuaW5kaWNlczFbaW5kZXhPbkFycmF5Ml0gKyBjb21tb25IZWFkO1xuICAgICAgaW5kZXgyID0gc2VxLmluZGljZXMyW2luZGV4T25BcnJheTJdICsgY29tbW9uSGVhZDtcbiAgICAgIGNoaWxkID0gbmV3IERpZmZDb250ZXh0KGNvbnRleHQubGVmdFtpbmRleDFdLCBjb250ZXh0LnJpZ2h0W2luZGV4Ml0pO1xuICAgICAgY29udGV4dC5wdXNoKGNoaWxkLCBpbmRleDIpO1xuICAgIH1cbiAgfVxuXG4gIGNvbnRleHQuc2V0UmVzdWx0KHJlc3VsdCkuZXhpdCgpO1xuXG59O1xuZGlmZkZpbHRlci5maWx0ZXJOYW1lID0gJ2FycmF5cyc7XG5cbnZhciBjb21wYXJlID0ge1xuICBudW1lcmljYWxseTogZnVuY3Rpb24oYSwgYikge1xuICAgIHJldHVybiBhIC0gYjtcbiAgfSxcbiAgbnVtZXJpY2FsbHlCeTogZnVuY3Rpb24obmFtZSkge1xuICAgIHJldHVybiBmdW5jdGlvbihhLCBiKSB7XG4gICAgICByZXR1cm4gYVtuYW1lXSAtIGJbbmFtZV07XG4gICAgfTtcbiAgfVxufTtcblxudmFyIHBhdGNoRmlsdGVyID0gZnVuY3Rpb24gbmVzdGVkUGF0Y2hGaWx0ZXIoY29udGV4dCkge1xuICBpZiAoIWNvbnRleHQubmVzdGVkKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmIChjb250ZXh0LmRlbHRhLl90ICE9PSAnYScpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgdmFyIGluZGV4LCBpbmRleDE7XG5cbiAgdmFyIGRlbHRhID0gY29udGV4dC5kZWx0YTtcbiAgdmFyIGFycmF5ID0gY29udGV4dC5sZWZ0O1xuXG4gIC8vIGZpcnN0LCBzZXBhcmF0ZSByZW1vdmFscywgaW5zZXJ0aW9ucyBhbmQgbW9kaWZpY2F0aW9uc1xuICB2YXIgdG9SZW1vdmUgPSBbXTtcbiAgdmFyIHRvSW5zZXJ0ID0gW107XG4gIHZhciB0b01vZGlmeSA9IFtdO1xuICBmb3IgKGluZGV4IGluIGRlbHRhKSB7XG4gICAgaWYgKGluZGV4ICE9PSAnX3QnKSB7XG4gICAgICBpZiAoaW5kZXhbMF0gPT09ICdfJykge1xuICAgICAgICAvLyByZW1vdmVkIGl0ZW0gZnJvbSBvcmlnaW5hbCBhcnJheVxuICAgICAgICBpZiAoZGVsdGFbaW5kZXhdWzJdID09PSAwIHx8IGRlbHRhW2luZGV4XVsyXSA9PT0gQVJSQVlfTU9WRSkge1xuICAgICAgICAgIHRvUmVtb3ZlLnB1c2gocGFyc2VJbnQoaW5kZXguc2xpY2UoMSksIDEwKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdvbmx5IHJlbW92YWwgb3IgbW92ZSBjYW4gYmUgYXBwbGllZCBhdCBvcmlnaW5hbCBhcnJheSBpbmRpY2VzJyArXG4gICAgICAgICAgICAnLCBpbnZhbGlkIGRpZmYgdHlwZTogJyArIGRlbHRhW2luZGV4XVsyXSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChkZWx0YVtpbmRleF0ubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgLy8gYWRkZWQgaXRlbSBhdCBuZXcgYXJyYXlcbiAgICAgICAgICB0b0luc2VydC5wdXNoKHtcbiAgICAgICAgICAgIGluZGV4OiBwYXJzZUludChpbmRleCwgMTApLFxuICAgICAgICAgICAgdmFsdWU6IGRlbHRhW2luZGV4XVswXVxuICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIG1vZGlmaWVkIGl0ZW0gYXQgbmV3IGFycmF5XG4gICAgICAgICAgdG9Nb2RpZnkucHVzaCh7XG4gICAgICAgICAgICBpbmRleDogcGFyc2VJbnQoaW5kZXgsIDEwKSxcbiAgICAgICAgICAgIGRlbHRhOiBkZWx0YVtpbmRleF1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8vIHJlbW92ZSBpdGVtcywgaW4gcmV2ZXJzZSBvcmRlciB0byBhdm9pZCBzYXdpbmcgb3VyIG93biBmbG9vclxuICB0b1JlbW92ZSA9IHRvUmVtb3ZlLnNvcnQoY29tcGFyZS5udW1lcmljYWxseSk7XG4gIGZvciAoaW5kZXggPSB0b1JlbW92ZS5sZW5ndGggLSAxOyBpbmRleCA+PSAwOyBpbmRleC0tKSB7XG4gICAgaW5kZXgxID0gdG9SZW1vdmVbaW5kZXhdO1xuICAgIHZhciBpbmRleERpZmYgPSBkZWx0YVsnXycgKyBpbmRleDFdO1xuICAgIHZhciByZW1vdmVkVmFsdWUgPSBhcnJheS5zcGxpY2UoaW5kZXgxLCAxKVswXTtcbiAgICBpZiAoaW5kZXhEaWZmWzJdID09PSBBUlJBWV9NT1ZFKSB7XG4gICAgICAvLyByZWluc2VydCBsYXRlclxuICAgICAgdG9JbnNlcnQucHVzaCh7XG4gICAgICAgIGluZGV4OiBpbmRleERpZmZbMV0sXG4gICAgICAgIHZhbHVlOiByZW1vdmVkVmFsdWVcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIC8vIGluc2VydCBpdGVtcywgaW4gcmV2ZXJzZSBvcmRlciB0byBhdm9pZCBtb3Zpbmcgb3VyIG93biBmbG9vclxuICB0b0luc2VydCA9IHRvSW5zZXJ0LnNvcnQoY29tcGFyZS5udW1lcmljYWxseUJ5KCdpbmRleCcpKTtcbiAgdmFyIHRvSW5zZXJ0TGVuZ3RoID0gdG9JbnNlcnQubGVuZ3RoO1xuICBmb3IgKGluZGV4ID0gMDsgaW5kZXggPCB0b0luc2VydExlbmd0aDsgaW5kZXgrKykge1xuICAgIHZhciBpbnNlcnRpb24gPSB0b0luc2VydFtpbmRleF07XG4gICAgYXJyYXkuc3BsaWNlKGluc2VydGlvbi5pbmRleCwgMCwgaW5zZXJ0aW9uLnZhbHVlKTtcbiAgfVxuXG4gIC8vIGFwcGx5IG1vZGlmaWNhdGlvbnNcbiAgdmFyIHRvTW9kaWZ5TGVuZ3RoID0gdG9Nb2RpZnkubGVuZ3RoO1xuICB2YXIgY2hpbGQ7XG4gIGlmICh0b01vZGlmeUxlbmd0aCA+IDApIHtcbiAgICBmb3IgKGluZGV4ID0gMDsgaW5kZXggPCB0b01vZGlmeUxlbmd0aDsgaW5kZXgrKykge1xuICAgICAgdmFyIG1vZGlmaWNhdGlvbiA9IHRvTW9kaWZ5W2luZGV4XTtcbiAgICAgIGNoaWxkID0gbmV3IFBhdGNoQ29udGV4dChjb250ZXh0LmxlZnRbbW9kaWZpY2F0aW9uLmluZGV4XSwgbW9kaWZpY2F0aW9uLmRlbHRhKTtcbiAgICAgIGNvbnRleHQucHVzaChjaGlsZCwgbW9kaWZpY2F0aW9uLmluZGV4KTtcbiAgICB9XG4gIH1cblxuICBpZiAoIWNvbnRleHQuY2hpbGRyZW4pIHtcbiAgICBjb250ZXh0LnNldFJlc3VsdChjb250ZXh0LmxlZnQpLmV4aXQoKTtcbiAgICByZXR1cm47XG4gIH1cbiAgY29udGV4dC5leGl0KCk7XG59O1xucGF0Y2hGaWx0ZXIuZmlsdGVyTmFtZSA9ICdhcnJheXMnO1xuXG52YXIgY29sbGVjdENoaWxkcmVuUGF0Y2hGaWx0ZXIgPSBmdW5jdGlvbiBjb2xsZWN0Q2hpbGRyZW5QYXRjaEZpbHRlcihjb250ZXh0KSB7XG4gIGlmICghY29udGV4dCB8fCAhY29udGV4dC5jaGlsZHJlbikge1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAoY29udGV4dC5kZWx0YS5fdCAhPT0gJ2EnKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHZhciBsZW5ndGggPSBjb250ZXh0LmNoaWxkcmVuLmxlbmd0aDtcbiAgdmFyIGNoaWxkO1xuICBmb3IgKHZhciBpbmRleCA9IDA7IGluZGV4IDwgbGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgY2hpbGQgPSBjb250ZXh0LmNoaWxkcmVuW2luZGV4XTtcbiAgICBjb250ZXh0LmxlZnRbY2hpbGQuY2hpbGROYW1lXSA9IGNoaWxkLnJlc3VsdDtcbiAgfVxuICBjb250ZXh0LnNldFJlc3VsdChjb250ZXh0LmxlZnQpLmV4aXQoKTtcbn07XG5jb2xsZWN0Q2hpbGRyZW5QYXRjaEZpbHRlci5maWx0ZXJOYW1lID0gJ2FycmF5c0NvbGxlY3RDaGlsZHJlbic7XG5cbnZhciByZXZlcnNlRmlsdGVyID0gZnVuY3Rpb24gYXJyYXlzUmV2ZXJzZUZpbHRlcihjb250ZXh0KSB7XG4gIGlmICghY29udGV4dC5uZXN0ZWQpIHtcbiAgICBpZiAoY29udGV4dC5kZWx0YVsyXSA9PT0gQVJSQVlfTU9WRSkge1xuICAgICAgY29udGV4dC5uZXdOYW1lID0gJ18nICsgY29udGV4dC5kZWx0YVsxXTtcbiAgICAgIGNvbnRleHQuc2V0UmVzdWx0KFtjb250ZXh0LmRlbHRhWzBdLCBwYXJzZUludChjb250ZXh0LmNoaWxkTmFtZS5zdWJzdHIoMSksIDEwKSwgQVJSQVlfTU9WRV0pLmV4aXQoKTtcbiAgICB9XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmIChjb250ZXh0LmRlbHRhLl90ICE9PSAnYScpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgdmFyIG5hbWUsIGNoaWxkO1xuICBmb3IgKG5hbWUgaW4gY29udGV4dC5kZWx0YSkge1xuICAgIGlmIChuYW1lID09PSAnX3QnKSB7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG4gICAgY2hpbGQgPSBuZXcgUmV2ZXJzZUNvbnRleHQoY29udGV4dC5kZWx0YVtuYW1lXSk7XG4gICAgY29udGV4dC5wdXNoKGNoaWxkLCBuYW1lKTtcbiAgfVxuICBjb250ZXh0LmV4aXQoKTtcbn07XG5yZXZlcnNlRmlsdGVyLmZpbHRlck5hbWUgPSAnYXJyYXlzJztcblxudmFyIHJldmVyc2VBcnJheURlbHRhSW5kZXggPSBmdW5jdGlvbihkZWx0YSwgaW5kZXgsIGl0ZW1EZWx0YSkge1xuICBpZiAodHlwZW9mIGluZGV4ID09PSAnc3RyaW5nJyAmJiBpbmRleFswXSA9PT0gJ18nKSB7XG4gICAgcmV0dXJuIHBhcnNlSW50KGluZGV4LnN1YnN0cigxKSwgMTApO1xuICB9IGVsc2UgaWYgKGlzQXJyYXkoaXRlbURlbHRhKSAmJiBpdGVtRGVsdGFbMl0gPT09IDApIHtcbiAgICByZXR1cm4gJ18nICsgaW5kZXg7XG4gIH1cblxuICB2YXIgcmV2ZXJzZUluZGV4ID0gK2luZGV4O1xuICBmb3IgKHZhciBkZWx0YUluZGV4IGluIGRlbHRhKSB7XG4gICAgdmFyIGRlbHRhSXRlbSA9IGRlbHRhW2RlbHRhSW5kZXhdO1xuICAgIGlmIChpc0FycmF5KGRlbHRhSXRlbSkpIHtcbiAgICAgIGlmIChkZWx0YUl0ZW1bMl0gPT09IEFSUkFZX01PVkUpIHtcbiAgICAgICAgdmFyIG1vdmVGcm9tSW5kZXggPSBwYXJzZUludChkZWx0YUluZGV4LnN1YnN0cigxKSwgMTApO1xuICAgICAgICB2YXIgbW92ZVRvSW5kZXggPSBkZWx0YUl0ZW1bMV07XG4gICAgICAgIGlmIChtb3ZlVG9JbmRleCA9PT0gK2luZGV4KSB7XG4gICAgICAgICAgcmV0dXJuIG1vdmVGcm9tSW5kZXg7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG1vdmVGcm9tSW5kZXggPD0gcmV2ZXJzZUluZGV4ICYmIG1vdmVUb0luZGV4ID4gcmV2ZXJzZUluZGV4KSB7XG4gICAgICAgICAgcmV2ZXJzZUluZGV4Kys7XG4gICAgICAgIH0gZWxzZSBpZiAobW92ZUZyb21JbmRleCA+PSByZXZlcnNlSW5kZXggJiYgbW92ZVRvSW5kZXggPCByZXZlcnNlSW5kZXgpIHtcbiAgICAgICAgICByZXZlcnNlSW5kZXgtLTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChkZWx0YUl0ZW1bMl0gPT09IDApIHtcbiAgICAgICAgdmFyIGRlbGV0ZUluZGV4ID0gcGFyc2VJbnQoZGVsdGFJbmRleC5zdWJzdHIoMSksIDEwKTtcbiAgICAgICAgaWYgKGRlbGV0ZUluZGV4IDw9IHJldmVyc2VJbmRleCkge1xuICAgICAgICAgIHJldmVyc2VJbmRleCsrO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKGRlbHRhSXRlbS5sZW5ndGggPT09IDEgJiYgZGVsdGFJbmRleCA8PSByZXZlcnNlSW5kZXgpIHtcbiAgICAgICAgcmV2ZXJzZUluZGV4LS07XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHJldmVyc2VJbmRleDtcbn07XG5cbnZhciBjb2xsZWN0Q2hpbGRyZW5SZXZlcnNlRmlsdGVyID0gZnVuY3Rpb24gY29sbGVjdENoaWxkcmVuUmV2ZXJzZUZpbHRlcihjb250ZXh0KSB7XG4gIGlmICghY29udGV4dCB8fCAhY29udGV4dC5jaGlsZHJlbikge1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAoY29udGV4dC5kZWx0YS5fdCAhPT0gJ2EnKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHZhciBsZW5ndGggPSBjb250ZXh0LmNoaWxkcmVuLmxlbmd0aDtcbiAgdmFyIGNoaWxkO1xuICB2YXIgZGVsdGEgPSB7XG4gICAgX3Q6ICdhJ1xuICB9O1xuXG4gIGZvciAodmFyIGluZGV4ID0gMDsgaW5kZXggPCBsZW5ndGg7IGluZGV4KyspIHtcbiAgICBjaGlsZCA9IGNvbnRleHQuY2hpbGRyZW5baW5kZXhdO1xuICAgIHZhciBuYW1lID0gY2hpbGQubmV3TmFtZTtcbiAgICBpZiAodHlwZW9mIG5hbWUgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBuYW1lID0gcmV2ZXJzZUFycmF5RGVsdGFJbmRleChjb250ZXh0LmRlbHRhLCBjaGlsZC5jaGlsZE5hbWUsIGNoaWxkLnJlc3VsdCk7XG4gICAgfVxuICAgIGlmIChkZWx0YVtuYW1lXSAhPT0gY2hpbGQucmVzdWx0KSB7XG4gICAgICBkZWx0YVtuYW1lXSA9IGNoaWxkLnJlc3VsdDtcbiAgICB9XG4gIH1cbiAgY29udGV4dC5zZXRSZXN1bHQoZGVsdGEpLmV4aXQoKTtcbn07XG5jb2xsZWN0Q2hpbGRyZW5SZXZlcnNlRmlsdGVyLmZpbHRlck5hbWUgPSAnYXJyYXlzQ29sbGVjdENoaWxkcmVuJztcblxuZXhwb3J0cy5kaWZmRmlsdGVyID0gZGlmZkZpbHRlcjtcbmV4cG9ydHMucGF0Y2hGaWx0ZXIgPSBwYXRjaEZpbHRlcjtcbmV4cG9ydHMuY29sbGVjdENoaWxkcmVuUGF0Y2hGaWx0ZXIgPSBjb2xsZWN0Q2hpbGRyZW5QYXRjaEZpbHRlcjtcbmV4cG9ydHMucmV2ZXJzZUZpbHRlciA9IHJldmVyc2VGaWx0ZXI7XG5leHBvcnRzLmNvbGxlY3RDaGlsZHJlblJldmVyc2VGaWx0ZXIgPSBjb2xsZWN0Q2hpbGRyZW5SZXZlcnNlRmlsdGVyO1xuIiwidmFyIGRpZmZGaWx0ZXIgPSBmdW5jdGlvbiBkYXRlc0RpZmZGaWx0ZXIoY29udGV4dCkge1xuICBpZiAoY29udGV4dC5sZWZ0IGluc3RhbmNlb2YgRGF0ZSkge1xuICAgIGlmIChjb250ZXh0LnJpZ2h0IGluc3RhbmNlb2YgRGF0ZSkge1xuICAgICAgaWYgKGNvbnRleHQubGVmdC5nZXRUaW1lKCkgIT09IGNvbnRleHQucmlnaHQuZ2V0VGltZSgpKSB7XG4gICAgICAgIGNvbnRleHQuc2V0UmVzdWx0KFtjb250ZXh0LmxlZnQsIGNvbnRleHQucmlnaHRdKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnRleHQuc2V0UmVzdWx0KHVuZGVmaW5lZCk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnRleHQuc2V0UmVzdWx0KFtjb250ZXh0LmxlZnQsIGNvbnRleHQucmlnaHRdKTtcbiAgICB9XG4gICAgY29udGV4dC5leGl0KCk7XG4gIH0gZWxzZSBpZiAoY29udGV4dC5yaWdodCBpbnN0YW5jZW9mIERhdGUpIHtcbiAgICBjb250ZXh0LnNldFJlc3VsdChbY29udGV4dC5sZWZ0LCBjb250ZXh0LnJpZ2h0XSkuZXhpdCgpO1xuICB9XG59O1xuZGlmZkZpbHRlci5maWx0ZXJOYW1lID0gJ2RhdGVzJztcblxuZXhwb3J0cy5kaWZmRmlsdGVyID0gZGlmZkZpbHRlcjtcbiIsIi8qXG5cbkxDUyBpbXBsZW1lbnRhdGlvbiB0aGF0IHN1cHBvcnRzIGFycmF5cyBvciBzdHJpbmdzXG5cbnJlZmVyZW5jZTogaHR0cDovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9Mb25nZXN0X2NvbW1vbl9zdWJzZXF1ZW5jZV9wcm9ibGVtXG5cbiovXG5cbnZhciBkZWZhdWx0TWF0Y2ggPSBmdW5jdGlvbihhcnJheTEsIGFycmF5MiwgaW5kZXgxLCBpbmRleDIpIHtcbiAgcmV0dXJuIGFycmF5MVtpbmRleDFdID09PSBhcnJheTJbaW5kZXgyXTtcbn07XG5cbnZhciBsZW5ndGhNYXRyaXggPSBmdW5jdGlvbihhcnJheTEsIGFycmF5MiwgbWF0Y2gsIGNvbnRleHQpIHtcbiAgdmFyIGxlbjEgPSBhcnJheTEubGVuZ3RoO1xuICB2YXIgbGVuMiA9IGFycmF5Mi5sZW5ndGg7XG4gIHZhciB4LCB5O1xuXG4gIC8vIGluaXRpYWxpemUgZW1wdHkgbWF0cml4IG9mIGxlbjErMSB4IGxlbjIrMVxuICB2YXIgbWF0cml4ID0gW2xlbjEgKyAxXTtcbiAgZm9yICh4ID0gMDsgeCA8IGxlbjEgKyAxOyB4KyspIHtcbiAgICBtYXRyaXhbeF0gPSBbbGVuMiArIDFdO1xuICAgIGZvciAoeSA9IDA7IHkgPCBsZW4yICsgMTsgeSsrKSB7XG4gICAgICBtYXRyaXhbeF1beV0gPSAwO1xuICAgIH1cbiAgfVxuICBtYXRyaXgubWF0Y2ggPSBtYXRjaDtcbiAgLy8gc2F2ZSBzZXF1ZW5jZSBsZW5ndGhzIGZvciBlYWNoIGNvb3JkaW5hdGVcbiAgZm9yICh4ID0gMTsgeCA8IGxlbjEgKyAxOyB4KyspIHtcbiAgICBmb3IgKHkgPSAxOyB5IDwgbGVuMiArIDE7IHkrKykge1xuICAgICAgaWYgKG1hdGNoKGFycmF5MSwgYXJyYXkyLCB4IC0gMSwgeSAtIDEsIGNvbnRleHQpKSB7XG4gICAgICAgIG1hdHJpeFt4XVt5XSA9IG1hdHJpeFt4IC0gMV1beSAtIDFdICsgMTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG1hdHJpeFt4XVt5XSA9IE1hdGgubWF4KG1hdHJpeFt4IC0gMV1beV0sIG1hdHJpeFt4XVt5IC0gMV0pO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gbWF0cml4O1xufTtcblxudmFyIGJhY2t0cmFjayA9IGZ1bmN0aW9uKG1hdHJpeCwgYXJyYXkxLCBhcnJheTIsIGluZGV4MSwgaW5kZXgyLCBjb250ZXh0KSB7XG4gIGlmIChpbmRleDEgPT09IDAgfHwgaW5kZXgyID09PSAwKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHNlcXVlbmNlOiBbXSxcbiAgICAgIGluZGljZXMxOiBbXSxcbiAgICAgIGluZGljZXMyOiBbXVxuICAgIH07XG4gIH1cblxuICBpZiAobWF0cml4Lm1hdGNoKGFycmF5MSwgYXJyYXkyLCBpbmRleDEgLSAxLCBpbmRleDIgLSAxLCBjb250ZXh0KSkge1xuICAgIHZhciBzdWJzZXF1ZW5jZSA9IGJhY2t0cmFjayhtYXRyaXgsIGFycmF5MSwgYXJyYXkyLCBpbmRleDEgLSAxLCBpbmRleDIgLSAxLCBjb250ZXh0KTtcbiAgICBzdWJzZXF1ZW5jZS5zZXF1ZW5jZS5wdXNoKGFycmF5MVtpbmRleDEgLSAxXSk7XG4gICAgc3Vic2VxdWVuY2UuaW5kaWNlczEucHVzaChpbmRleDEgLSAxKTtcbiAgICBzdWJzZXF1ZW5jZS5pbmRpY2VzMi5wdXNoKGluZGV4MiAtIDEpO1xuICAgIHJldHVybiBzdWJzZXF1ZW5jZTtcbiAgfVxuXG4gIGlmIChtYXRyaXhbaW5kZXgxXVtpbmRleDIgLSAxXSA+IG1hdHJpeFtpbmRleDEgLSAxXVtpbmRleDJdKSB7XG4gICAgcmV0dXJuIGJhY2t0cmFjayhtYXRyaXgsIGFycmF5MSwgYXJyYXkyLCBpbmRleDEsIGluZGV4MiAtIDEsIGNvbnRleHQpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBiYWNrdHJhY2sobWF0cml4LCBhcnJheTEsIGFycmF5MiwgaW5kZXgxIC0gMSwgaW5kZXgyLCBjb250ZXh0KTtcbiAgfVxufTtcblxudmFyIGdldCA9IGZ1bmN0aW9uKGFycmF5MSwgYXJyYXkyLCBtYXRjaCwgY29udGV4dCkge1xuICBjb250ZXh0ID0gY29udGV4dCB8fCB7fTtcbiAgdmFyIG1hdHJpeCA9IGxlbmd0aE1hdHJpeChhcnJheTEsIGFycmF5MiwgbWF0Y2ggfHwgZGVmYXVsdE1hdGNoLCBjb250ZXh0KTtcbiAgdmFyIHJlc3VsdCA9IGJhY2t0cmFjayhtYXRyaXgsIGFycmF5MSwgYXJyYXkyLCBhcnJheTEubGVuZ3RoLCBhcnJheTIubGVuZ3RoLCBjb250ZXh0KTtcbiAgaWYgKHR5cGVvZiBhcnJheTEgPT09ICdzdHJpbmcnICYmIHR5cGVvZiBhcnJheTIgPT09ICdzdHJpbmcnKSB7XG4gICAgcmVzdWx0LnNlcXVlbmNlID0gcmVzdWx0LnNlcXVlbmNlLmpvaW4oJycpO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59O1xuXG5leHBvcnRzLmdldCA9IGdldDtcbiIsInZhciBEaWZmQ29udGV4dCA9IHJlcXVpcmUoJy4uL2NvbnRleHRzL2RpZmYnKS5EaWZmQ29udGV4dDtcbnZhciBQYXRjaENvbnRleHQgPSByZXF1aXJlKCcuLi9jb250ZXh0cy9wYXRjaCcpLlBhdGNoQ29udGV4dDtcbnZhciBSZXZlcnNlQ29udGV4dCA9IHJlcXVpcmUoJy4uL2NvbnRleHRzL3JldmVyc2UnKS5SZXZlcnNlQ29udGV4dDtcblxudmFyIGNvbGxlY3RDaGlsZHJlbkRpZmZGaWx0ZXIgPSBmdW5jdGlvbiBjb2xsZWN0Q2hpbGRyZW5EaWZmRmlsdGVyKGNvbnRleHQpIHtcbiAgaWYgKCFjb250ZXh0IHx8ICFjb250ZXh0LmNoaWxkcmVuKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHZhciBsZW5ndGggPSBjb250ZXh0LmNoaWxkcmVuLmxlbmd0aDtcbiAgdmFyIGNoaWxkO1xuICB2YXIgcmVzdWx0ID0gY29udGV4dC5yZXN1bHQ7XG4gIGZvciAodmFyIGluZGV4ID0gMDsgaW5kZXggPCBsZW5ndGg7IGluZGV4KyspIHtcbiAgICBjaGlsZCA9IGNvbnRleHQuY2hpbGRyZW5baW5kZXhdO1xuICAgIGlmICh0eXBlb2YgY2hpbGQucmVzdWx0ID09PSAndW5kZWZpbmVkJykge1xuICAgICAgY29udGludWU7XG4gICAgfVxuICAgIHJlc3VsdCA9IHJlc3VsdCB8fCB7fTtcbiAgICByZXN1bHRbY2hpbGQuY2hpbGROYW1lXSA9IGNoaWxkLnJlc3VsdDtcbiAgfVxuICBpZiAocmVzdWx0ICYmIGNvbnRleHQubGVmdElzQXJyYXkpIHtcbiAgICByZXN1bHQuX3QgPSAnYSc7XG4gIH1cbiAgY29udGV4dC5zZXRSZXN1bHQocmVzdWx0KS5leGl0KCk7XG59O1xuY29sbGVjdENoaWxkcmVuRGlmZkZpbHRlci5maWx0ZXJOYW1lID0gJ2NvbGxlY3RDaGlsZHJlbic7XG5cbnZhciBvYmplY3RzRGlmZkZpbHRlciA9IGZ1bmN0aW9uIG9iamVjdHNEaWZmRmlsdGVyKGNvbnRleHQpIHtcbiAgaWYgKGNvbnRleHQubGVmdElzQXJyYXkgfHwgY29udGV4dC5sZWZ0VHlwZSAhPT0gJ29iamVjdCcpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICB2YXIgbmFtZSwgY2hpbGQ7XG4gIGZvciAobmFtZSBpbiBjb250ZXh0LmxlZnQpIHtcbiAgICBjaGlsZCA9IG5ldyBEaWZmQ29udGV4dChjb250ZXh0LmxlZnRbbmFtZV0sIGNvbnRleHQucmlnaHRbbmFtZV0pO1xuICAgIGNvbnRleHQucHVzaChjaGlsZCwgbmFtZSk7XG4gIH1cbiAgZm9yIChuYW1lIGluIGNvbnRleHQucmlnaHQpIHtcbiAgICBpZiAodHlwZW9mIGNvbnRleHQubGVmdFtuYW1lXSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIGNoaWxkID0gbmV3IERpZmZDb250ZXh0KHVuZGVmaW5lZCwgY29udGV4dC5yaWdodFtuYW1lXSk7XG4gICAgICBjb250ZXh0LnB1c2goY2hpbGQsIG5hbWUpO1xuICAgIH1cbiAgfVxuXG4gIGlmICghY29udGV4dC5jaGlsZHJlbiB8fCBjb250ZXh0LmNoaWxkcmVuLmxlbmd0aCA9PT0gMCkge1xuICAgIGNvbnRleHQuc2V0UmVzdWx0KHVuZGVmaW5lZCkuZXhpdCgpO1xuICAgIHJldHVybjtcbiAgfVxuICBjb250ZXh0LmV4aXQoKTtcbn07XG5vYmplY3RzRGlmZkZpbHRlci5maWx0ZXJOYW1lID0gJ29iamVjdHMnO1xuXG52YXIgcGF0Y2hGaWx0ZXIgPSBmdW5jdGlvbiBuZXN0ZWRQYXRjaEZpbHRlcihjb250ZXh0KSB7XG4gIGlmICghY29udGV4dC5uZXN0ZWQpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKGNvbnRleHQuZGVsdGEuX3QpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgdmFyIG5hbWUsIGNoaWxkO1xuICBmb3IgKG5hbWUgaW4gY29udGV4dC5kZWx0YSkge1xuICAgIGNoaWxkID0gbmV3IFBhdGNoQ29udGV4dChjb250ZXh0LmxlZnRbbmFtZV0sIGNvbnRleHQuZGVsdGFbbmFtZV0pO1xuICAgIGNvbnRleHQucHVzaChjaGlsZCwgbmFtZSk7XG4gIH1cbiAgY29udGV4dC5leGl0KCk7XG59O1xucGF0Y2hGaWx0ZXIuZmlsdGVyTmFtZSA9ICdvYmplY3RzJztcblxudmFyIGNvbGxlY3RDaGlsZHJlblBhdGNoRmlsdGVyID0gZnVuY3Rpb24gY29sbGVjdENoaWxkcmVuUGF0Y2hGaWx0ZXIoY29udGV4dCkge1xuICBpZiAoIWNvbnRleHQgfHwgIWNvbnRleHQuY2hpbGRyZW4pIHtcbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKGNvbnRleHQuZGVsdGEuX3QpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgdmFyIGxlbmd0aCA9IGNvbnRleHQuY2hpbGRyZW4ubGVuZ3RoO1xuICB2YXIgY2hpbGQ7XG4gIGZvciAodmFyIGluZGV4ID0gMDsgaW5kZXggPCBsZW5ndGg7IGluZGV4KyspIHtcbiAgICBjaGlsZCA9IGNvbnRleHQuY2hpbGRyZW5baW5kZXhdO1xuICAgIGlmIChjb250ZXh0LmxlZnQuaGFzT3duUHJvcGVydHkoY2hpbGQuY2hpbGROYW1lKSAmJiBjaGlsZC5yZXN1bHQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgZGVsZXRlIGNvbnRleHQubGVmdFtjaGlsZC5jaGlsZE5hbWVdO1xuICAgIH0gZWxzZSBpZiAoY29udGV4dC5sZWZ0W2NoaWxkLmNoaWxkTmFtZV0gIT09IGNoaWxkLnJlc3VsdCkge1xuICAgICAgY29udGV4dC5sZWZ0W2NoaWxkLmNoaWxkTmFtZV0gPSBjaGlsZC5yZXN1bHQ7XG4gICAgfVxuICB9XG4gIGNvbnRleHQuc2V0UmVzdWx0KGNvbnRleHQubGVmdCkuZXhpdCgpO1xufTtcbmNvbGxlY3RDaGlsZHJlblBhdGNoRmlsdGVyLmZpbHRlck5hbWUgPSAnY29sbGVjdENoaWxkcmVuJztcblxudmFyIHJldmVyc2VGaWx0ZXIgPSBmdW5jdGlvbiBuZXN0ZWRSZXZlcnNlRmlsdGVyKGNvbnRleHQpIHtcbiAgaWYgKCFjb250ZXh0Lm5lc3RlZCkge1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAoY29udGV4dC5kZWx0YS5fdCkge1xuICAgIHJldHVybjtcbiAgfVxuICB2YXIgbmFtZSwgY2hpbGQ7XG4gIGZvciAobmFtZSBpbiBjb250ZXh0LmRlbHRhKSB7XG4gICAgY2hpbGQgPSBuZXcgUmV2ZXJzZUNvbnRleHQoY29udGV4dC5kZWx0YVtuYW1lXSk7XG4gICAgY29udGV4dC5wdXNoKGNoaWxkLCBuYW1lKTtcbiAgfVxuICBjb250ZXh0LmV4aXQoKTtcbn07XG5yZXZlcnNlRmlsdGVyLmZpbHRlck5hbWUgPSAnb2JqZWN0cyc7XG5cbnZhciBjb2xsZWN0Q2hpbGRyZW5SZXZlcnNlRmlsdGVyID0gZnVuY3Rpb24gY29sbGVjdENoaWxkcmVuUmV2ZXJzZUZpbHRlcihjb250ZXh0KSB7XG4gIGlmICghY29udGV4dCB8fCAhY29udGV4dC5jaGlsZHJlbikge1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAoY29udGV4dC5kZWx0YS5fdCkge1xuICAgIHJldHVybjtcbiAgfVxuICB2YXIgbGVuZ3RoID0gY29udGV4dC5jaGlsZHJlbi5sZW5ndGg7XG4gIHZhciBjaGlsZDtcbiAgdmFyIGRlbHRhID0ge307XG4gIGZvciAodmFyIGluZGV4ID0gMDsgaW5kZXggPCBsZW5ndGg7IGluZGV4KyspIHtcbiAgICBjaGlsZCA9IGNvbnRleHQuY2hpbGRyZW5baW5kZXhdO1xuICAgIGlmIChkZWx0YVtjaGlsZC5jaGlsZE5hbWVdICE9PSBjaGlsZC5yZXN1bHQpIHtcbiAgICAgIGRlbHRhW2NoaWxkLmNoaWxkTmFtZV0gPSBjaGlsZC5yZXN1bHQ7XG4gICAgfVxuICB9XG4gIGNvbnRleHQuc2V0UmVzdWx0KGRlbHRhKS5leGl0KCk7XG59O1xuY29sbGVjdENoaWxkcmVuUmV2ZXJzZUZpbHRlci5maWx0ZXJOYW1lID0gJ2NvbGxlY3RDaGlsZHJlbic7XG5cbmV4cG9ydHMuY29sbGVjdENoaWxkcmVuRGlmZkZpbHRlciA9IGNvbGxlY3RDaGlsZHJlbkRpZmZGaWx0ZXI7XG5leHBvcnRzLm9iamVjdHNEaWZmRmlsdGVyID0gb2JqZWN0c0RpZmZGaWx0ZXI7XG5leHBvcnRzLnBhdGNoRmlsdGVyID0gcGF0Y2hGaWx0ZXI7XG5leHBvcnRzLmNvbGxlY3RDaGlsZHJlblBhdGNoRmlsdGVyID0gY29sbGVjdENoaWxkcmVuUGF0Y2hGaWx0ZXI7XG5leHBvcnRzLnJldmVyc2VGaWx0ZXIgPSByZXZlcnNlRmlsdGVyO1xuZXhwb3J0cy5jb2xsZWN0Q2hpbGRyZW5SZXZlcnNlRmlsdGVyID0gY29sbGVjdENoaWxkcmVuUmV2ZXJzZUZpbHRlcjtcbiIsIi8qIGdsb2JhbCBkaWZmX21hdGNoX3BhdGNoICovXG52YXIgVEVYVF9ESUZGID0gMjtcbnZhciBERUZBVUxUX01JTl9MRU5HVEggPSA2MDtcbnZhciBjYWNoZWREaWZmUGF0Y2ggPSBudWxsO1xuXG52YXIgZ2V0RGlmZk1hdGNoUGF0Y2ggPSBmdW5jdGlvbigpIHtcbiAgLypqc2hpbnQgY2FtZWxjYXNlOiBmYWxzZSAqL1xuXG4gIGlmICghY2FjaGVkRGlmZlBhdGNoKSB7XG4gICAgdmFyIGluc3RhbmNlO1xuICAgIGlmICh0eXBlb2YgZGlmZl9tYXRjaF9wYXRjaCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIC8vIGFscmVhZHkgbG9hZGVkLCBwcm9iYWJseSBhIGJyb3dzZXJcbiAgICAgIGluc3RhbmNlID0gdHlwZW9mIGRpZmZfbWF0Y2hfcGF0Y2ggPT09ICdmdW5jdGlvbicgP1xuICAgICAgICBuZXcgZGlmZl9tYXRjaF9wYXRjaCgpIDogbmV3IGRpZmZfbWF0Y2hfcGF0Y2guZGlmZl9tYXRjaF9wYXRjaCgpO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIHJlcXVpcmUgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHZhciBkbXBNb2R1bGVOYW1lID0gJ2RpZmZfbWF0Y2hfcGF0Y2hfdW5jb21wcmVzc2VkJztcbiAgICAgICAgdmFyIGRtcCA9IHJlcXVpcmUoJy4uLy4uL3B1YmxpYy9leHRlcm5hbC8nICsgZG1wTW9kdWxlTmFtZSk7XG4gICAgICAgIGluc3RhbmNlID0gbmV3IGRtcC5kaWZmX21hdGNoX3BhdGNoKCk7XG4gICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgaW5zdGFuY2UgPSBudWxsO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoIWluc3RhbmNlKSB7XG4gICAgICB2YXIgZXJyb3IgPSBuZXcgRXJyb3IoJ3RleHQgZGlmZl9tYXRjaF9wYXRjaCBsaWJyYXJ5IG5vdCBmb3VuZCcpO1xuICAgICAgZXJyb3IuZGlmZl9tYXRjaF9wYXRjaF9ub3RfZm91bmQgPSB0cnVlO1xuICAgICAgdGhyb3cgZXJyb3I7XG4gICAgfVxuICAgIGNhY2hlZERpZmZQYXRjaCA9IHtcbiAgICAgIGRpZmY6IGZ1bmN0aW9uKHR4dDEsIHR4dDIpIHtcbiAgICAgICAgcmV0dXJuIGluc3RhbmNlLnBhdGNoX3RvVGV4dChpbnN0YW5jZS5wYXRjaF9tYWtlKHR4dDEsIHR4dDIpKTtcbiAgICAgIH0sXG4gICAgICBwYXRjaDogZnVuY3Rpb24odHh0MSwgcGF0Y2gpIHtcbiAgICAgICAgdmFyIHJlc3VsdHMgPSBpbnN0YW5jZS5wYXRjaF9hcHBseShpbnN0YW5jZS5wYXRjaF9mcm9tVGV4dChwYXRjaCksIHR4dDEpO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHJlc3VsdHNbMV0ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBpZiAoIXJlc3VsdHNbMV1baV0pIHtcbiAgICAgICAgICAgIHZhciBlcnJvciA9IG5ldyBFcnJvcigndGV4dCBwYXRjaCBmYWlsZWQnKTtcbiAgICAgICAgICAgIGVycm9yLnRleHRQYXRjaEZhaWxlZCA9IHRydWU7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHRzWzBdO1xuICAgICAgfVxuICAgIH07XG4gIH1cbiAgcmV0dXJuIGNhY2hlZERpZmZQYXRjaDtcbn07XG5cbnZhciBkaWZmRmlsdGVyID0gZnVuY3Rpb24gdGV4dHNEaWZmRmlsdGVyKGNvbnRleHQpIHtcbiAgaWYgKGNvbnRleHQubGVmdFR5cGUgIT09ICdzdHJpbmcnKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHZhciBtaW5MZW5ndGggPSAoY29udGV4dC5vcHRpb25zICYmIGNvbnRleHQub3B0aW9ucy50ZXh0RGlmZiAmJlxuICAgIGNvbnRleHQub3B0aW9ucy50ZXh0RGlmZi5taW5MZW5ndGgpIHx8IERFRkFVTFRfTUlOX0xFTkdUSDtcbiAgaWYgKGNvbnRleHQubGVmdC5sZW5ndGggPCBtaW5MZW5ndGggfHxcbiAgICBjb250ZXh0LnJpZ2h0Lmxlbmd0aCA8IG1pbkxlbmd0aCkge1xuICAgIGNvbnRleHQuc2V0UmVzdWx0KFtjb250ZXh0LmxlZnQsIGNvbnRleHQucmlnaHRdKS5leGl0KCk7XG4gICAgcmV0dXJuO1xuICB9XG4gIC8vIGxhcmdlIHRleHQsIHVzZSBhIHRleHQtZGlmZiBhbGdvcml0aG1cbiAgdmFyIGRpZmYgPSBnZXREaWZmTWF0Y2hQYXRjaCgpLmRpZmY7XG4gIGNvbnRleHQuc2V0UmVzdWx0KFtkaWZmKGNvbnRleHQubGVmdCwgY29udGV4dC5yaWdodCksIDAsIFRFWFRfRElGRl0pLmV4aXQoKTtcbn07XG5kaWZmRmlsdGVyLmZpbHRlck5hbWUgPSAndGV4dHMnO1xuXG52YXIgcGF0Y2hGaWx0ZXIgPSBmdW5jdGlvbiB0ZXh0c1BhdGNoRmlsdGVyKGNvbnRleHQpIHtcbiAgaWYgKGNvbnRleHQubmVzdGVkKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmIChjb250ZXh0LmRlbHRhWzJdICE9PSBURVhUX0RJRkYpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICAvLyB0ZXh0LWRpZmYsIHVzZSBhIHRleHQtcGF0Y2ggYWxnb3JpdGhtXG4gIHZhciBwYXRjaCA9IGdldERpZmZNYXRjaFBhdGNoKCkucGF0Y2g7XG4gIGNvbnRleHQuc2V0UmVzdWx0KHBhdGNoKGNvbnRleHQubGVmdCwgY29udGV4dC5kZWx0YVswXSkpLmV4aXQoKTtcbn07XG5wYXRjaEZpbHRlci5maWx0ZXJOYW1lID0gJ3RleHRzJztcblxudmFyIHRleHREZWx0YVJldmVyc2UgPSBmdW5jdGlvbihkZWx0YSkge1xuICB2YXIgaSwgbCwgbGluZXMsIGxpbmUsIGxpbmVUbXAsIGhlYWRlciA9IG51bGwsXG4gICAgaGVhZGVyUmVnZXggPSAvXkBAICtcXC0oXFxkKyksKFxcZCspICtcXCsoXFxkKyksKFxcZCspICtAQCQvLFxuICAgIGxpbmVIZWFkZXIsIGxpbmVBZGQsIGxpbmVSZW1vdmU7XG4gIGxpbmVzID0gZGVsdGEuc3BsaXQoJ1xcbicpO1xuICBmb3IgKGkgPSAwLCBsID0gbGluZXMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgbGluZSA9IGxpbmVzW2ldO1xuICAgIHZhciBsaW5lU3RhcnQgPSBsaW5lLnNsaWNlKDAsIDEpO1xuICAgIGlmIChsaW5lU3RhcnQgPT09ICdAJykge1xuICAgICAgaGVhZGVyID0gaGVhZGVyUmVnZXguZXhlYyhsaW5lKTtcbiAgICAgIGxpbmVIZWFkZXIgPSBpO1xuICAgICAgbGluZUFkZCA9IG51bGw7XG4gICAgICBsaW5lUmVtb3ZlID0gbnVsbDtcblxuICAgICAgLy8gZml4IGhlYWRlclxuICAgICAgbGluZXNbbGluZUhlYWRlcl0gPSAnQEAgLScgKyBoZWFkZXJbM10gKyAnLCcgKyBoZWFkZXJbNF0gKyAnICsnICsgaGVhZGVyWzFdICsgJywnICsgaGVhZGVyWzJdICsgJyBAQCc7XG4gICAgfSBlbHNlIGlmIChsaW5lU3RhcnQgPT09ICcrJykge1xuICAgICAgbGluZUFkZCA9IGk7XG4gICAgICBsaW5lc1tpXSA9ICctJyArIGxpbmVzW2ldLnNsaWNlKDEpO1xuICAgICAgaWYgKGxpbmVzW2kgLSAxXS5zbGljZSgwLCAxKSA9PT0gJysnKSB7XG4gICAgICAgIC8vIHN3YXAgbGluZXMgdG8ga2VlcCBkZWZhdWx0IG9yZGVyICgtKylcbiAgICAgICAgbGluZVRtcCA9IGxpbmVzW2ldO1xuICAgICAgICBsaW5lc1tpXSA9IGxpbmVzW2kgLSAxXTtcbiAgICAgICAgbGluZXNbaSAtIDFdID0gbGluZVRtcDtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGxpbmVTdGFydCA9PT0gJy0nKSB7XG4gICAgICBsaW5lUmVtb3ZlID0gaTtcbiAgICAgIGxpbmVzW2ldID0gJysnICsgbGluZXNbaV0uc2xpY2UoMSk7XG4gICAgfVxuICB9XG4gIHJldHVybiBsaW5lcy5qb2luKCdcXG4nKTtcbn07XG5cbnZhciByZXZlcnNlRmlsdGVyID0gZnVuY3Rpb24gdGV4dHNSZXZlcnNlRmlsdGVyKGNvbnRleHQpIHtcbiAgaWYgKGNvbnRleHQubmVzdGVkKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmIChjb250ZXh0LmRlbHRhWzJdICE9PSBURVhUX0RJRkYpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICAvLyB0ZXh0LWRpZmYsIHVzZSBhIHRleHQtZGlmZiBhbGdvcml0aG1cbiAgY29udGV4dC5zZXRSZXN1bHQoW3RleHREZWx0YVJldmVyc2UoY29udGV4dC5kZWx0YVswXSksIDAsIFRFWFRfRElGRl0pLmV4aXQoKTtcbn07XG5yZXZlcnNlRmlsdGVyLmZpbHRlck5hbWUgPSAndGV4dHMnO1xuXG5leHBvcnRzLmRpZmZGaWx0ZXIgPSBkaWZmRmlsdGVyO1xuZXhwb3J0cy5wYXRjaEZpbHRlciA9IHBhdGNoRmlsdGVyO1xuZXhwb3J0cy5yZXZlcnNlRmlsdGVyID0gcmV2ZXJzZUZpbHRlcjtcbiIsInZhciBpc0FycmF5ID0gKHR5cGVvZiBBcnJheS5pc0FycmF5ID09PSAnZnVuY3Rpb24nKSA/XG4gIC8vIHVzZSBuYXRpdmUgZnVuY3Rpb25cbiAgQXJyYXkuaXNBcnJheSA6XG4gIC8vIHVzZSBpbnN0YW5jZW9mIG9wZXJhdG9yXG4gIGZ1bmN0aW9uKGEpIHtcbiAgICByZXR1cm4gYSBpbnN0YW5jZW9mIEFycmF5O1xuICB9O1xuXG52YXIgZGlmZkZpbHRlciA9IGZ1bmN0aW9uIHRyaXZpYWxNYXRjaGVzRGlmZkZpbHRlcihjb250ZXh0KSB7XG4gIGlmIChjb250ZXh0LmxlZnQgPT09IGNvbnRleHQucmlnaHQpIHtcbiAgICBjb250ZXh0LnNldFJlc3VsdCh1bmRlZmluZWQpLmV4aXQoKTtcbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKHR5cGVvZiBjb250ZXh0LmxlZnQgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgaWYgKHR5cGVvZiBjb250ZXh0LnJpZ2h0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2Z1bmN0aW9ucyBhcmUgbm90IHN1cHBvcnRlZCcpO1xuICAgIH1cbiAgICBjb250ZXh0LnNldFJlc3VsdChbY29udGV4dC5yaWdodF0pLmV4aXQoKTtcbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKHR5cGVvZiBjb250ZXh0LnJpZ2h0ID09PSAndW5kZWZpbmVkJykge1xuICAgIGNvbnRleHQuc2V0UmVzdWx0KFtjb250ZXh0LmxlZnQsIDAsIDBdKS5leGl0KCk7XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmICh0eXBlb2YgY29udGV4dC5sZWZ0ID09PSAnZnVuY3Rpb24nIHx8IHR5cGVvZiBjb250ZXh0LnJpZ2h0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdmdW5jdGlvbnMgYXJlIG5vdCBzdXBwb3J0ZWQnKTtcbiAgfVxuICBjb250ZXh0LmxlZnRUeXBlID0gY29udGV4dC5sZWZ0ID09PSBudWxsID8gJ251bGwnIDogdHlwZW9mIGNvbnRleHQubGVmdDtcbiAgY29udGV4dC5yaWdodFR5cGUgPSBjb250ZXh0LnJpZ2h0ID09PSBudWxsID8gJ251bGwnIDogdHlwZW9mIGNvbnRleHQucmlnaHQ7XG4gIGlmIChjb250ZXh0LmxlZnRUeXBlICE9PSBjb250ZXh0LnJpZ2h0VHlwZSkge1xuICAgIGNvbnRleHQuc2V0UmVzdWx0KFtjb250ZXh0LmxlZnQsIGNvbnRleHQucmlnaHRdKS5leGl0KCk7XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmIChjb250ZXh0LmxlZnRUeXBlID09PSAnYm9vbGVhbicgfHwgY29udGV4dC5sZWZ0VHlwZSA9PT0gJ251bWJlcicpIHtcbiAgICBjb250ZXh0LnNldFJlc3VsdChbY29udGV4dC5sZWZ0LCBjb250ZXh0LnJpZ2h0XSkuZXhpdCgpO1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAoY29udGV4dC5sZWZ0VHlwZSA9PT0gJ29iamVjdCcpIHtcbiAgICBjb250ZXh0LmxlZnRJc0FycmF5ID0gaXNBcnJheShjb250ZXh0LmxlZnQpO1xuICB9XG4gIGlmIChjb250ZXh0LnJpZ2h0VHlwZSA9PT0gJ29iamVjdCcpIHtcbiAgICBjb250ZXh0LnJpZ2h0SXNBcnJheSA9IGlzQXJyYXkoY29udGV4dC5yaWdodCk7XG4gIH1cbiAgaWYgKGNvbnRleHQubGVmdElzQXJyYXkgIT09IGNvbnRleHQucmlnaHRJc0FycmF5KSB7XG4gICAgY29udGV4dC5zZXRSZXN1bHQoW2NvbnRleHQubGVmdCwgY29udGV4dC5yaWdodF0pLmV4aXQoKTtcbiAgICByZXR1cm47XG4gIH1cbn07XG5kaWZmRmlsdGVyLmZpbHRlck5hbWUgPSAndHJpdmlhbCc7XG5cbnZhciBwYXRjaEZpbHRlciA9IGZ1bmN0aW9uIHRyaXZpYWxNYXRjaGVzUGF0Y2hGaWx0ZXIoY29udGV4dCkge1xuICBpZiAodHlwZW9mIGNvbnRleHQuZGVsdGEgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgY29udGV4dC5zZXRSZXN1bHQoY29udGV4dC5sZWZ0KS5leGl0KCk7XG4gICAgcmV0dXJuO1xuICB9XG4gIGNvbnRleHQubmVzdGVkID0gIWlzQXJyYXkoY29udGV4dC5kZWx0YSk7XG4gIGlmIChjb250ZXh0Lm5lc3RlZCkge1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAoY29udGV4dC5kZWx0YS5sZW5ndGggPT09IDEpIHtcbiAgICBjb250ZXh0LnNldFJlc3VsdChjb250ZXh0LmRlbHRhWzBdKS5leGl0KCk7XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmIChjb250ZXh0LmRlbHRhLmxlbmd0aCA9PT0gMikge1xuICAgIGNvbnRleHQuc2V0UmVzdWx0KGNvbnRleHQuZGVsdGFbMV0pLmV4aXQoKTtcbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKGNvbnRleHQuZGVsdGEubGVuZ3RoID09PSAzICYmIGNvbnRleHQuZGVsdGFbMl0gPT09IDApIHtcbiAgICBjb250ZXh0LnNldFJlc3VsdCh1bmRlZmluZWQpLmV4aXQoKTtcbiAgICByZXR1cm47XG4gIH1cbn07XG5wYXRjaEZpbHRlci5maWx0ZXJOYW1lID0gJ3RyaXZpYWwnO1xuXG52YXIgcmV2ZXJzZUZpbHRlciA9IGZ1bmN0aW9uIHRyaXZpYWxSZWZlcnNlRmlsdGVyKGNvbnRleHQpIHtcbiAgaWYgKHR5cGVvZiBjb250ZXh0LmRlbHRhID09PSAndW5kZWZpbmVkJykge1xuICAgIGNvbnRleHQuc2V0UmVzdWx0KGNvbnRleHQuZGVsdGEpLmV4aXQoKTtcbiAgICByZXR1cm47XG4gIH1cbiAgY29udGV4dC5uZXN0ZWQgPSAhaXNBcnJheShjb250ZXh0LmRlbHRhKTtcbiAgaWYgKGNvbnRleHQubmVzdGVkKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmIChjb250ZXh0LmRlbHRhLmxlbmd0aCA9PT0gMSkge1xuICAgIGNvbnRleHQuc2V0UmVzdWx0KFtjb250ZXh0LmRlbHRhWzBdLCAwLCAwXSkuZXhpdCgpO1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAoY29udGV4dC5kZWx0YS5sZW5ndGggPT09IDIpIHtcbiAgICBjb250ZXh0LnNldFJlc3VsdChbY29udGV4dC5kZWx0YVsxXSwgY29udGV4dC5kZWx0YVswXV0pLmV4aXQoKTtcbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKGNvbnRleHQuZGVsdGEubGVuZ3RoID09PSAzICYmIGNvbnRleHQuZGVsdGFbMl0gPT09IDApIHtcbiAgICBjb250ZXh0LnNldFJlc3VsdChbY29udGV4dC5kZWx0YVswXV0pLmV4aXQoKTtcbiAgICByZXR1cm47XG4gIH1cbn07XG5yZXZlcnNlRmlsdGVyLmZpbHRlck5hbWUgPSAndHJpdmlhbCc7XG5cbmV4cG9ydHMuZGlmZkZpbHRlciA9IGRpZmZGaWx0ZXI7XG5leHBvcnRzLnBhdGNoRmlsdGVyID0gcGF0Y2hGaWx0ZXI7XG5leHBvcnRzLnJldmVyc2VGaWx0ZXIgPSByZXZlcnNlRmlsdGVyO1xuIiwidmFyIFBpcGUgPSBmdW5jdGlvbiBQaXBlKG5hbWUpIHtcbiAgdGhpcy5uYW1lID0gbmFtZTtcbiAgdGhpcy5maWx0ZXJzID0gW107XG59O1xuXG5QaXBlLnByb3RvdHlwZS5wcm9jZXNzID0gZnVuY3Rpb24oaW5wdXQpIHtcbiAgaWYgKCF0aGlzLnByb2Nlc3Nvcikge1xuICAgIHRocm93IG5ldyBFcnJvcignYWRkIHRoaXMgcGlwZSB0byBhIHByb2Nlc3NvciBiZWZvcmUgdXNpbmcgaXQnKTtcbiAgfVxuICB2YXIgZGVidWcgPSB0aGlzLmRlYnVnO1xuICB2YXIgbGVuZ3RoID0gdGhpcy5maWx0ZXJzLmxlbmd0aDtcbiAgdmFyIGNvbnRleHQgPSBpbnB1dDtcbiAgZm9yICh2YXIgaW5kZXggPSAwOyBpbmRleCA8IGxlbmd0aDsgaW5kZXgrKykge1xuICAgIHZhciBmaWx0ZXIgPSB0aGlzLmZpbHRlcnNbaW5kZXhdO1xuICAgIGlmIChkZWJ1Zykge1xuICAgICAgdGhpcy5sb2coJ2ZpbHRlcjogJyArIGZpbHRlci5maWx0ZXJOYW1lKTtcbiAgICB9XG4gICAgZmlsdGVyKGNvbnRleHQpO1xuICAgIGlmICh0eXBlb2YgY29udGV4dCA9PT0gJ29iamVjdCcgJiYgY29udGV4dC5leGl0aW5nKSB7XG4gICAgICBjb250ZXh0LmV4aXRpbmcgPSBmYWxzZTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuICBpZiAoIWNvbnRleHQubmV4dCAmJiB0aGlzLnJlc3VsdENoZWNrKSB7XG4gICAgdGhpcy5yZXN1bHRDaGVjayhjb250ZXh0KTtcbiAgfVxufTtcblxuUGlwZS5wcm90b3R5cGUubG9nID0gZnVuY3Rpb24obXNnKSB7XG4gIGNvbnNvbGUubG9nKCdbanNvbmRpZmZwYXRjaF0gJyArIHRoaXMubmFtZSArICcgcGlwZSwgJyArIG1zZyk7XG59O1xuXG5QaXBlLnByb3RvdHlwZS5hcHBlbmQgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5maWx0ZXJzLnB1c2guYXBwbHkodGhpcy5maWx0ZXJzLCBhcmd1bWVudHMpO1xuICByZXR1cm4gdGhpcztcbn07XG5cblBpcGUucHJvdG90eXBlLnByZXBlbmQgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5maWx0ZXJzLnVuc2hpZnQuYXBwbHkodGhpcy5maWx0ZXJzLCBhcmd1bWVudHMpO1xuICByZXR1cm4gdGhpcztcbn07XG5cblBpcGUucHJvdG90eXBlLmluZGV4T2YgPSBmdW5jdGlvbihmaWx0ZXJOYW1lKSB7XG4gIGlmICghZmlsdGVyTmFtZSkge1xuICAgIHRocm93IG5ldyBFcnJvcignYSBmaWx0ZXIgbmFtZSBpcyByZXF1aXJlZCcpO1xuICB9XG4gIGZvciAodmFyIGluZGV4ID0gMDsgaW5kZXggPCB0aGlzLmZpbHRlcnMubGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgdmFyIGZpbHRlciA9IHRoaXMuZmlsdGVyc1tpbmRleF07XG4gICAgaWYgKGZpbHRlci5maWx0ZXJOYW1lID09PSBmaWx0ZXJOYW1lKSB7XG4gICAgICByZXR1cm4gaW5kZXg7XG4gICAgfVxuICB9XG4gIHRocm93IG5ldyBFcnJvcignZmlsdGVyIG5vdCBmb3VuZDogJyArIGZpbHRlck5hbWUpO1xufTtcblxuUGlwZS5wcm90b3R5cGUubGlzdCA9IGZ1bmN0aW9uKCkge1xuICB2YXIgbmFtZXMgPSBbXTtcbiAgZm9yICh2YXIgaW5kZXggPSAwOyBpbmRleCA8IHRoaXMuZmlsdGVycy5sZW5ndGg7IGluZGV4KyspIHtcbiAgICB2YXIgZmlsdGVyID0gdGhpcy5maWx0ZXJzW2luZGV4XTtcbiAgICBuYW1lcy5wdXNoKGZpbHRlci5maWx0ZXJOYW1lKTtcbiAgfVxuICByZXR1cm4gbmFtZXM7XG59O1xuXG5QaXBlLnByb3RvdHlwZS5hZnRlciA9IGZ1bmN0aW9uKGZpbHRlck5hbWUpIHtcbiAgdmFyIGluZGV4ID0gdGhpcy5pbmRleE9mKGZpbHRlck5hbWUpO1xuICB2YXIgcGFyYW1zID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKTtcbiAgaWYgKCFwYXJhbXMubGVuZ3RoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdhIGZpbHRlciBpcyByZXF1aXJlZCcpO1xuICB9XG4gIHBhcmFtcy51bnNoaWZ0KGluZGV4ICsgMSwgMCk7XG4gIEFycmF5LnByb3RvdHlwZS5zcGxpY2UuYXBwbHkodGhpcy5maWx0ZXJzLCBwYXJhbXMpO1xuICByZXR1cm4gdGhpcztcbn07XG5cblBpcGUucHJvdG90eXBlLmJlZm9yZSA9IGZ1bmN0aW9uKGZpbHRlck5hbWUpIHtcbiAgdmFyIGluZGV4ID0gdGhpcy5pbmRleE9mKGZpbHRlck5hbWUpO1xuICB2YXIgcGFyYW1zID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKTtcbiAgaWYgKCFwYXJhbXMubGVuZ3RoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdhIGZpbHRlciBpcyByZXF1aXJlZCcpO1xuICB9XG4gIHBhcmFtcy51bnNoaWZ0KGluZGV4LCAwKTtcbiAgQXJyYXkucHJvdG90eXBlLnNwbGljZS5hcHBseSh0aGlzLmZpbHRlcnMsIHBhcmFtcyk7XG4gIHJldHVybiB0aGlzO1xufTtcblxuUGlwZS5wcm90b3R5cGUuY2xlYXIgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5maWx0ZXJzLmxlbmd0aCA9IDA7XG4gIHJldHVybiB0aGlzO1xufTtcblxuUGlwZS5wcm90b3R5cGUuc2hvdWxkSGF2ZVJlc3VsdCA9IGZ1bmN0aW9uKHNob3VsZCkge1xuICBpZiAoc2hvdWxkID09PSBmYWxzZSkge1xuICAgIHRoaXMucmVzdWx0Q2hlY2sgPSBudWxsO1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAodGhpcy5yZXN1bHRDaGVjaykge1xuICAgIHJldHVybjtcbiAgfVxuICB2YXIgcGlwZSA9IHRoaXM7XG4gIHRoaXMucmVzdWx0Q2hlY2sgPSBmdW5jdGlvbihjb250ZXh0KSB7XG4gICAgaWYgKCFjb250ZXh0Lmhhc1Jlc3VsdCkge1xuICAgICAgY29uc29sZS5sb2coY29udGV4dCk7XG4gICAgICB2YXIgZXJyb3IgPSBuZXcgRXJyb3IocGlwZS5uYW1lICsgJyBmYWlsZWQnKTtcbiAgICAgIGVycm9yLm5vUmVzdWx0ID0gdHJ1ZTtcbiAgICAgIHRocm93IGVycm9yO1xuICAgIH1cbiAgfTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5leHBvcnRzLlBpcGUgPSBQaXBlO1xuIiwiXG52YXIgUHJvY2Vzc29yID0gZnVuY3Rpb24gUHJvY2Vzc29yKG9wdGlvbnMpe1xuXHR0aGlzLnNlbGZPcHRpb25zID0gb3B0aW9ucztcblx0dGhpcy5waXBlcyA9IHt9O1xufTtcblxuUHJvY2Vzc29yLnByb3RvdHlwZS5vcHRpb25zID0gZnVuY3Rpb24ob3B0aW9ucykge1xuXHRpZiAob3B0aW9ucykge1xuXHRcdHRoaXMuc2VsZk9wdGlvbnMgPSBvcHRpb25zO1xuXHR9XG5cdHJldHVybiB0aGlzLnNlbGZPcHRpb25zO1xufTtcblxuUHJvY2Vzc29yLnByb3RvdHlwZS5waXBlID0gZnVuY3Rpb24obmFtZSwgcGlwZSkge1xuXHRpZiAodHlwZW9mIG5hbWUgPT09ICdzdHJpbmcnKSB7XG5cdFx0aWYgKHR5cGVvZiBwaXBlID09PSAndW5kZWZpbmVkJykge1xuXHRcdFx0cmV0dXJuIHRoaXMucGlwZXNbbmFtZV07XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRoaXMucGlwZXNbbmFtZV0gPSBwaXBlO1xuXHRcdH1cblx0fVxuXHRpZiAobmFtZSAmJiBuYW1lLm5hbWUpIHtcblx0XHRwaXBlID0gbmFtZTtcblx0XHRpZiAocGlwZS5wcm9jZXNzb3IgPT09IHRoaXMpIHsgcmV0dXJuIHBpcGU7IH1cblx0XHR0aGlzLnBpcGVzW3BpcGUubmFtZV0gPSBwaXBlO1xuXHR9XG5cdHBpcGUucHJvY2Vzc29yID0gdGhpcztcblx0cmV0dXJuIHBpcGU7XG59O1xuXG5Qcm9jZXNzb3IucHJvdG90eXBlLnByb2Nlc3MgPSBmdW5jdGlvbihpbnB1dCwgcGlwZSkge1xuXHR2YXIgY29udGV4dCA9IGlucHV0O1xuXHRjb250ZXh0Lm9wdGlvbnMgPSB0aGlzLm9wdGlvbnMoKTtcblx0dmFyIG5leHRQaXBlID0gcGlwZSB8fCBpbnB1dC5waXBlIHx8ICdkZWZhdWx0Jztcblx0dmFyIGxhc3RQaXBlLCBsYXN0Q29udGV4dDtcblx0d2hpbGUgKG5leHRQaXBlKSB7XG5cdFx0aWYgKHR5cGVvZiBjb250ZXh0Lm5leHRBZnRlckNoaWxkcmVuICE9PSAndW5kZWZpbmVkJykge1xuXHRcdFx0Ly8gY2hpbGRyZW4gcHJvY2Vzc2VkIGFuZCBjb21pbmcgYmFjayB0byBwYXJlbnRcblx0XHRcdGNvbnRleHQubmV4dCA9IGNvbnRleHQubmV4dEFmdGVyQ2hpbGRyZW47XG5cdFx0XHRjb250ZXh0Lm5leHRBZnRlckNoaWxkcmVuID0gbnVsbDtcblx0XHR9XG5cblx0XHRpZiAodHlwZW9mIG5leHRQaXBlID09PSAnc3RyaW5nJykge1xuXHRcdFx0bmV4dFBpcGUgPSB0aGlzLnBpcGUobmV4dFBpcGUpO1xuXHRcdH1cblx0XHRuZXh0UGlwZS5wcm9jZXNzKGNvbnRleHQpO1xuXHRcdGxhc3RDb250ZXh0ID0gY29udGV4dDtcblx0XHRsYXN0UGlwZSA9IG5leHRQaXBlO1xuXHRcdG5leHRQaXBlID0gbnVsbDtcblx0XHRpZiAoY29udGV4dCkge1xuXHRcdFx0aWYgKGNvbnRleHQubmV4dCkge1xuXHRcdFx0XHRjb250ZXh0ID0gY29udGV4dC5uZXh0O1xuXHRcdFx0XHRuZXh0UGlwZSA9IGxhc3RDb250ZXh0Lm5leHRQaXBlIHx8IGNvbnRleHQucGlwZSB8fCBsYXN0UGlwZTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblx0cmV0dXJuIGNvbnRleHQuaGFzUmVzdWx0ID8gY29udGV4dC5yZXN1bHQgOiB1bmRlZmluZWQ7XG59O1xuXG5leHBvcnRzLlByb2Nlc3NvciA9IFByb2Nlc3NvcjtcbiJdfQ==
