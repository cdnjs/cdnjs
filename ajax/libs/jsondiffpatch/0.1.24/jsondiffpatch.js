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
	exports.version = '0.1.23';
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
  var newIndex = index;
  var newIndex2;
  if (typeof index === 'string' && index[0] === '_') {
    newIndex = parseInt(index.substr(1), 10);
  } else {
    var uindex = '_' + index;
    if (isArray(itemDelta) && itemDelta[2] === 0) {
      newIndex = uindex;
    } else {
      for (var index2 in delta) {
        var itemDelta2 = delta[index2];
        if (isArray(itemDelta2)) {
          if (itemDelta2[2] === ARRAY_MOVE) {
            if (itemDelta2[1].toString() === index) {
              newIndex = index2.substr(1);
              break;
            }
          } else if (itemDelta2[2] === 0 && typeof index2 === 'string') {
            newIndex2 = parseInt(index2.substr(1), 10);
            if (newIndex2 <= newIndex) {
              newIndex++;
            }
          } else if (itemDelta2.length === 1 && index2 <= newIndex) {
            newIndex--;
          }
        }
      }
    }
  }
  return newIndex;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9zb3VyY2UtZmlsZXMvanNvbmRpZmZwYXRjaC9ub2RlX21vZHVsZXMvZmliZXJnbGFzcy9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiL3NvdXJjZS1maWxlcy9qc29uZGlmZnBhdGNoL3NyYy9tYWluLmpzIiwiL3NvdXJjZS1maWxlcy9qc29uZGlmZnBhdGNoL25vZGVfbW9kdWxlcy9maWJlcmdsYXNzL25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9wcm9jZXNzL2Jyb3dzZXIuanMiLCIvc291cmNlLWZpbGVzL2pzb25kaWZmcGF0Y2gvc3JjL2NvbnRleHRzL2NvbnRleHQuanMiLCIvc291cmNlLWZpbGVzL2pzb25kaWZmcGF0Y2gvc3JjL2NvbnRleHRzL2RpZmYuanMiLCIvc291cmNlLWZpbGVzL2pzb25kaWZmcGF0Y2gvc3JjL2NvbnRleHRzL3BhdGNoLmpzIiwiL3NvdXJjZS1maWxlcy9qc29uZGlmZnBhdGNoL3NyYy9jb250ZXh0cy9yZXZlcnNlLmpzIiwiL3NvdXJjZS1maWxlcy9qc29uZGlmZnBhdGNoL3NyYy9kYXRlLXJldml2ZXIuanMiLCIvc291cmNlLWZpbGVzL2pzb25kaWZmcGF0Y2gvc3JjL2RpZmZwYXRjaGVyLmpzIiwiL3NvdXJjZS1maWxlcy9qc29uZGlmZnBhdGNoL3NyYy9maWx0ZXJzL2FycmF5cy5qcyIsIi9zb3VyY2UtZmlsZXMvanNvbmRpZmZwYXRjaC9zcmMvZmlsdGVycy9kYXRlcy5qcyIsIi9zb3VyY2UtZmlsZXMvanNvbmRpZmZwYXRjaC9zcmMvZmlsdGVycy9sY3MuanMiLCIvc291cmNlLWZpbGVzL2pzb25kaWZmcGF0Y2gvc3JjL2ZpbHRlcnMvbmVzdGVkLmpzIiwiL3NvdXJjZS1maWxlcy9qc29uZGlmZnBhdGNoL3NyYy9maWx0ZXJzL3RleHRzLmpzIiwiL3NvdXJjZS1maWxlcy9qc29uZGlmZnBhdGNoL3NyYy9maWx0ZXJzL3RyaXZpYWwuanMiLCIvc291cmNlLWZpbGVzL2pzb25kaWZmcGF0Y2gvc3JjL3BpcGUuanMiLCIvc291cmNlLWZpbGVzL2pzb25kaWZmcGF0Y2gvc3JjL3Byb2Nlc3Nvci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3paQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbElBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiKGZ1bmN0aW9uIChwcm9jZXNzKXtcblxudmFyIERpZmZQYXRjaGVyID0gcmVxdWlyZSgnLi9kaWZmcGF0Y2hlcicpLkRpZmZQYXRjaGVyO1xuZXhwb3J0cy5EaWZmUGF0Y2hlciA9IERpZmZQYXRjaGVyO1xuXG5leHBvcnRzLmNyZWF0ZSA9IGZ1bmN0aW9uKG9wdGlvbnMpe1xuXHRyZXR1cm4gbmV3IERpZmZQYXRjaGVyKG9wdGlvbnMpO1xufTtcblxuZXhwb3J0cy5kYXRlUmV2aXZlciA9IHJlcXVpcmUoJy4vZGF0ZS1yZXZpdmVyJyk7XG5cbnZhciBkZWZhdWx0SW5zdGFuY2U7XG5cbmV4cG9ydHMuZGlmZiA9IGZ1bmN0aW9uKCkge1xuXHRpZiAoIWRlZmF1bHRJbnN0YW5jZSkge1xuXHRcdGRlZmF1bHRJbnN0YW5jZSA9IG5ldyBEaWZmUGF0Y2hlcigpO1xuXHR9XG5cdHJldHVybiBkZWZhdWx0SW5zdGFuY2UuZGlmZi5hcHBseShkZWZhdWx0SW5zdGFuY2UsIGFyZ3VtZW50cyk7XG59O1xuXG5leHBvcnRzLnBhdGNoID0gZnVuY3Rpb24oKSB7XG5cdGlmICghZGVmYXVsdEluc3RhbmNlKSB7XG5cdFx0ZGVmYXVsdEluc3RhbmNlID0gbmV3IERpZmZQYXRjaGVyKCk7XG5cdH1cblx0cmV0dXJuIGRlZmF1bHRJbnN0YW5jZS5wYXRjaC5hcHBseShkZWZhdWx0SW5zdGFuY2UsIGFyZ3VtZW50cyk7XG59O1xuXG5leHBvcnRzLnVucGF0Y2ggPSBmdW5jdGlvbigpIHtcblx0aWYgKCFkZWZhdWx0SW5zdGFuY2UpIHtcblx0XHRkZWZhdWx0SW5zdGFuY2UgPSBuZXcgRGlmZlBhdGNoZXIoKTtcblx0fVxuXHRyZXR1cm4gZGVmYXVsdEluc3RhbmNlLnVucGF0Y2guYXBwbHkoZGVmYXVsdEluc3RhbmNlLCBhcmd1bWVudHMpO1xufTtcblxuZXhwb3J0cy5yZXZlcnNlID0gZnVuY3Rpb24oKSB7XG5cdGlmICghZGVmYXVsdEluc3RhbmNlKSB7XG5cdFx0ZGVmYXVsdEluc3RhbmNlID0gbmV3IERpZmZQYXRjaGVyKCk7XG5cdH1cblx0cmV0dXJuIGRlZmF1bHRJbnN0YW5jZS5yZXZlcnNlLmFwcGx5KGRlZmF1bHRJbnN0YW5jZSwgYXJndW1lbnRzKTtcbn07XG5cbmlmIChwcm9jZXNzLmJyb3dzZXIpIHtcblx0ZXhwb3J0cy5ob21lcGFnZSA9ICd7e3BhY2thZ2UtaG9tZXBhZ2V9fSc7XG5cdGV4cG9ydHMudmVyc2lvbiA9ICd7e3BhY2thZ2UtdmVyc2lvbn19Jztcbn0gZWxzZSB7XG5cdHZhciBwYWNrYWdlSW5mb01vZHVsZU5hbWUgPSAnLi4vcGFja2FnZS5qc29uJztcblx0dmFyIHBhY2thZ2VJbmZvID0gcmVxdWlyZShwYWNrYWdlSW5mb01vZHVsZU5hbWUpO1xuXHRleHBvcnRzLmhvbWVwYWdlID0gcGFja2FnZUluZm8uaG9tZXBhZ2U7XG5cdGV4cG9ydHMudmVyc2lvbiA9IHBhY2thZ2VJbmZvLnZlcnNpb247XG5cblx0dmFyIGZvcm1hdHRlck1vZHVsZU5hbWUgPSAnLi9mb3JtYXR0ZXJzJztcblx0dmFyIGZvcm1hdHRlcnMgPSByZXF1aXJlKGZvcm1hdHRlck1vZHVsZU5hbWUpO1xuXHRleHBvcnRzLmZvcm1hdHRlcnMgPSBmb3JtYXR0ZXJzO1xuXHQvLyBzaG9ydGN1dCBmb3IgY29uc29sZVxuXHRleHBvcnRzLmNvbnNvbGUgPSBmb3JtYXR0ZXJzLmNvbnNvbGU7XG59XG5cbn0pLmNhbGwodGhpcyxyZXF1aXJlKCdfcHJvY2VzcycpKSIsIi8vIHNoaW0gZm9yIHVzaW5nIHByb2Nlc3MgaW4gYnJvd3NlclxuXG52YXIgcHJvY2VzcyA9IG1vZHVsZS5leHBvcnRzID0ge307XG5cbnByb2Nlc3MubmV4dFRpY2sgPSAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBjYW5TZXRJbW1lZGlhdGUgPSB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJ1xuICAgICYmIHdpbmRvdy5zZXRJbW1lZGlhdGU7XG4gICAgdmFyIGNhblBvc3QgPSB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJ1xuICAgICYmIHdpbmRvdy5wb3N0TWVzc2FnZSAmJiB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lclxuICAgIDtcblxuICAgIGlmIChjYW5TZXRJbW1lZGlhdGUpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChmKSB7IHJldHVybiB3aW5kb3cuc2V0SW1tZWRpYXRlKGYpIH07XG4gICAgfVxuXG4gICAgaWYgKGNhblBvc3QpIHtcbiAgICAgICAgdmFyIHF1ZXVlID0gW107XG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgZnVuY3Rpb24gKGV2KSB7XG4gICAgICAgICAgICB2YXIgc291cmNlID0gZXYuc291cmNlO1xuICAgICAgICAgICAgaWYgKChzb3VyY2UgPT09IHdpbmRvdyB8fCBzb3VyY2UgPT09IG51bGwpICYmIGV2LmRhdGEgPT09ICdwcm9jZXNzLXRpY2snKSB7XG4gICAgICAgICAgICAgICAgZXYuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICAgICAgaWYgKHF1ZXVlLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGZuID0gcXVldWUuc2hpZnQoKTtcbiAgICAgICAgICAgICAgICAgICAgZm4oKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIHRydWUpO1xuXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiBuZXh0VGljayhmbikge1xuICAgICAgICAgICAgcXVldWUucHVzaChmbik7XG4gICAgICAgICAgICB3aW5kb3cucG9zdE1lc3NhZ2UoJ3Byb2Nlc3MtdGljaycsICcqJyk7XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgcmV0dXJuIGZ1bmN0aW9uIG5leHRUaWNrKGZuKSB7XG4gICAgICAgIHNldFRpbWVvdXQoZm4sIDApO1xuICAgIH07XG59KSgpO1xuXG5wcm9jZXNzLnRpdGxlID0gJ2Jyb3dzZXInO1xucHJvY2Vzcy5icm93c2VyID0gdHJ1ZTtcbnByb2Nlc3MuZW52ID0ge307XG5wcm9jZXNzLmFyZ3YgPSBbXTtcblxuZnVuY3Rpb24gbm9vcCgpIHt9XG5cbnByb2Nlc3Mub24gPSBub29wO1xucHJvY2Vzcy5hZGRMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLm9uY2UgPSBub29wO1xucHJvY2Vzcy5vZmYgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUFsbExpc3RlbmVycyA9IG5vb3A7XG5wcm9jZXNzLmVtaXQgPSBub29wO1xuXG5wcm9jZXNzLmJpbmRpbmcgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5iaW5kaW5nIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn1cblxuLy8gVE9ETyhzaHR5bG1hbilcbnByb2Nlc3MuY3dkID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gJy8nIH07XG5wcm9jZXNzLmNoZGlyID0gZnVuY3Rpb24gKGRpcikge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5jaGRpciBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xuIiwiXG52YXIgUGlwZSA9IHJlcXVpcmUoJy4uL3BpcGUnKS5QaXBlO1xuXG52YXIgQ29udGV4dCA9IGZ1bmN0aW9uIENvbnRleHQoKXtcbn07XG5cbkNvbnRleHQucHJvdG90eXBlLnNldFJlc3VsdCA9IGZ1bmN0aW9uKHJlc3VsdCkge1xuXHR0aGlzLnJlc3VsdCA9IHJlc3VsdDtcblx0dGhpcy5oYXNSZXN1bHQgPSB0cnVlO1xuXHRyZXR1cm4gdGhpcztcbn07XG5cbkNvbnRleHQucHJvdG90eXBlLmV4aXQgPSBmdW5jdGlvbigpIHtcblx0dGhpcy5leGl0aW5nID0gdHJ1ZTtcblx0cmV0dXJuIHRoaXM7XG59O1xuXG5Db250ZXh0LnByb3RvdHlwZS5zd2l0Y2hUbyA9IGZ1bmN0aW9uKG5leHQsIHBpcGUpIHtcblx0aWYgKHR5cGVvZiBuZXh0ID09PSAnc3RyaW5nJyB8fCBuZXh0IGluc3RhbmNlb2YgUGlwZSkge1xuXHRcdHRoaXMubmV4dFBpcGUgPSBuZXh0O1xuXHR9IGVsc2Uge1xuXHRcdHRoaXMubmV4dCA9IG5leHQ7XG5cdFx0aWYgKHBpcGUpIHtcblx0XHRcdHRoaXMubmV4dFBpcGUgPSBwaXBlO1xuXHRcdH1cblx0fVxuXHRyZXR1cm4gdGhpcztcbn07XG5cbkNvbnRleHQucHJvdG90eXBlLnB1c2ggPSBmdW5jdGlvbihjaGlsZCwgbmFtZSkge1xuXHRjaGlsZC5wYXJlbnQgPSB0aGlzO1xuXHRpZiAodHlwZW9mIG5hbWUgIT09ICd1bmRlZmluZWQnKSB7XG5cdFx0Y2hpbGQuY2hpbGROYW1lID0gbmFtZTtcblx0fVxuXHRjaGlsZC5yb290ID0gdGhpcy5yb290IHx8IHRoaXM7XG5cdGNoaWxkLm9wdGlvbnMgPSBjaGlsZC5vcHRpb25zIHx8IHRoaXMub3B0aW9ucztcblx0aWYgKCF0aGlzLmNoaWxkcmVuKSB7XG5cdFx0dGhpcy5jaGlsZHJlbiA9IFtjaGlsZF07XG5cdFx0dGhpcy5uZXh0QWZ0ZXJDaGlsZHJlbiA9IHRoaXMubmV4dCB8fCBudWxsO1xuXHRcdHRoaXMubmV4dCA9IGNoaWxkO1xuXHR9IGVsc2Uge1xuXHRcdHRoaXMuY2hpbGRyZW5bdGhpcy5jaGlsZHJlbi5sZW5ndGggLSAxXS5uZXh0ID0gY2hpbGQ7XG5cdFx0dGhpcy5jaGlsZHJlbi5wdXNoKGNoaWxkKTtcblx0fVxuXHRjaGlsZC5uZXh0ID0gdGhpcztcblx0cmV0dXJuIHRoaXM7XG59O1xuXG5leHBvcnRzLkNvbnRleHQgPSBDb250ZXh0O1xuIiwidmFyIENvbnRleHQgPSByZXF1aXJlKCcuL2NvbnRleHQnKS5Db250ZXh0O1xuXG52YXIgRGlmZkNvbnRleHQgPSBmdW5jdGlvbiBEaWZmQ29udGV4dChsZWZ0LCByaWdodCkge1xuICB0aGlzLmxlZnQgPSBsZWZ0O1xuICB0aGlzLnJpZ2h0ID0gcmlnaHQ7XG4gIHRoaXMucGlwZSA9ICdkaWZmJztcbn07XG5cbkRpZmZDb250ZXh0LnByb3RvdHlwZSA9IG5ldyBDb250ZXh0KCk7XG5cbmV4cG9ydHMuRGlmZkNvbnRleHQgPSBEaWZmQ29udGV4dDtcbiIsInZhciBDb250ZXh0ID0gcmVxdWlyZSgnLi9jb250ZXh0JykuQ29udGV4dDtcblxudmFyIFBhdGNoQ29udGV4dCA9IGZ1bmN0aW9uIFBhdGNoQ29udGV4dChsZWZ0LCBkZWx0YSkge1xuICB0aGlzLmxlZnQgPSBsZWZ0O1xuICB0aGlzLmRlbHRhID0gZGVsdGE7XG4gIHRoaXMucGlwZSA9ICdwYXRjaCc7XG59O1xuXG5QYXRjaENvbnRleHQucHJvdG90eXBlID0gbmV3IENvbnRleHQoKTtcblxuZXhwb3J0cy5QYXRjaENvbnRleHQgPSBQYXRjaENvbnRleHQ7XG4iLCJ2YXIgQ29udGV4dCA9IHJlcXVpcmUoJy4vY29udGV4dCcpLkNvbnRleHQ7XG5cbnZhciBSZXZlcnNlQ29udGV4dCA9IGZ1bmN0aW9uIFJldmVyc2VDb250ZXh0KGRlbHRhKSB7XG4gIHRoaXMuZGVsdGEgPSBkZWx0YTtcbiAgdGhpcy5waXBlID0gJ3JldmVyc2UnO1xufTtcblxuUmV2ZXJzZUNvbnRleHQucHJvdG90eXBlID0gbmV3IENvbnRleHQoKTtcblxuZXhwb3J0cy5SZXZlcnNlQ29udGV4dCA9IFJldmVyc2VDb250ZXh0O1xuIiwiLy8gdXNlIGFzIDJuZCBwYXJhbWV0ZXIgZm9yIEpTT04ucGFyc2UgdG8gcmV2aXZlIERhdGUgaW5zdGFuY2VzXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGRhdGVSZXZpdmVyKGtleSwgdmFsdWUpIHtcbiAgdmFyIHBhcnRzO1xuICBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xuICAgIHBhcnRzID0gL14oXFxkezR9KS0oXFxkezJ9KS0oXFxkezJ9KVQoXFxkezJ9KTooXFxkezJ9KTooXFxkezJ9KSg/OlxcLihcXGQqKSk/KFp8KFsrXFwtXSkoXFxkezJ9KTooXFxkezJ9KSkkLy5leGVjKHZhbHVlKTtcbiAgICBpZiAocGFydHMpIHtcbiAgICAgIHJldHVybiBuZXcgRGF0ZShEYXRlLlVUQygrcGFydHNbMV0sICtwYXJ0c1syXSAtIDEsICtwYXJ0c1szXSwgK3BhcnRzWzRdLCArcGFydHNbNV0sICtwYXJ0c1s2XSwgKyhwYXJ0c1s3XSB8fCAwKSkpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gdmFsdWU7XG59O1xuIiwidmFyIFByb2Nlc3NvciA9IHJlcXVpcmUoJy4vcHJvY2Vzc29yJykuUHJvY2Vzc29yO1xudmFyIFBpcGUgPSByZXF1aXJlKCcuL3BpcGUnKS5QaXBlO1xudmFyIERpZmZDb250ZXh0ID0gcmVxdWlyZSgnLi9jb250ZXh0cy9kaWZmJykuRGlmZkNvbnRleHQ7XG52YXIgUGF0Y2hDb250ZXh0ID0gcmVxdWlyZSgnLi9jb250ZXh0cy9wYXRjaCcpLlBhdGNoQ29udGV4dDtcbnZhciBSZXZlcnNlQ29udGV4dCA9IHJlcXVpcmUoJy4vY29udGV4dHMvcmV2ZXJzZScpLlJldmVyc2VDb250ZXh0O1xuXG52YXIgdHJpdmlhbCA9IHJlcXVpcmUoJy4vZmlsdGVycy90cml2aWFsJyk7XG52YXIgbmVzdGVkID0gcmVxdWlyZSgnLi9maWx0ZXJzL25lc3RlZCcpO1xudmFyIGFycmF5cyA9IHJlcXVpcmUoJy4vZmlsdGVycy9hcnJheXMnKTtcbnZhciBkYXRlcyA9IHJlcXVpcmUoJy4vZmlsdGVycy9kYXRlcycpO1xudmFyIHRleHRzID0gcmVxdWlyZSgnLi9maWx0ZXJzL3RleHRzJyk7XG5cbnZhciBEaWZmUGF0Y2hlciA9IGZ1bmN0aW9uIERpZmZQYXRjaGVyKG9wdGlvbnMpIHtcbiAgdGhpcy5wcm9jZXNzb3IgPSBuZXcgUHJvY2Vzc29yKG9wdGlvbnMpO1xuICB0aGlzLnByb2Nlc3Nvci5waXBlKG5ldyBQaXBlKCdkaWZmJykuYXBwZW5kKFxuICAgIG5lc3RlZC5jb2xsZWN0Q2hpbGRyZW5EaWZmRmlsdGVyLFxuICAgIHRyaXZpYWwuZGlmZkZpbHRlcixcbiAgICBkYXRlcy5kaWZmRmlsdGVyLFxuICAgIHRleHRzLmRpZmZGaWx0ZXIsXG4gICAgbmVzdGVkLm9iamVjdHNEaWZmRmlsdGVyLFxuICAgIGFycmF5cy5kaWZmRmlsdGVyXG4gICkuc2hvdWxkSGF2ZVJlc3VsdCgpKTtcbiAgdGhpcy5wcm9jZXNzb3IucGlwZShuZXcgUGlwZSgncGF0Y2gnKS5hcHBlbmQoXG4gICAgbmVzdGVkLmNvbGxlY3RDaGlsZHJlblBhdGNoRmlsdGVyLFxuICAgIGFycmF5cy5jb2xsZWN0Q2hpbGRyZW5QYXRjaEZpbHRlcixcbiAgICB0cml2aWFsLnBhdGNoRmlsdGVyLFxuICAgIHRleHRzLnBhdGNoRmlsdGVyLFxuICAgIG5lc3RlZC5wYXRjaEZpbHRlcixcbiAgICBhcnJheXMucGF0Y2hGaWx0ZXJcbiAgKS5zaG91bGRIYXZlUmVzdWx0KCkpO1xuICB0aGlzLnByb2Nlc3Nvci5waXBlKG5ldyBQaXBlKCdyZXZlcnNlJykuYXBwZW5kKFxuICAgIG5lc3RlZC5jb2xsZWN0Q2hpbGRyZW5SZXZlcnNlRmlsdGVyLFxuICAgIGFycmF5cy5jb2xsZWN0Q2hpbGRyZW5SZXZlcnNlRmlsdGVyLFxuICAgIHRyaXZpYWwucmV2ZXJzZUZpbHRlcixcbiAgICB0ZXh0cy5yZXZlcnNlRmlsdGVyLFxuICAgIG5lc3RlZC5yZXZlcnNlRmlsdGVyLFxuICAgIGFycmF5cy5yZXZlcnNlRmlsdGVyXG4gICkuc2hvdWxkSGF2ZVJlc3VsdCgpKTtcbn07XG5cbkRpZmZQYXRjaGVyLnByb3RvdHlwZS5vcHRpb25zID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLnByb2Nlc3Nvci5vcHRpb25zLmFwcGx5KHRoaXMucHJvY2Vzc29yLCBhcmd1bWVudHMpO1xufTtcblxuRGlmZlBhdGNoZXIucHJvdG90eXBlLmRpZmYgPSBmdW5jdGlvbihsZWZ0LCByaWdodCkge1xuICByZXR1cm4gdGhpcy5wcm9jZXNzb3IucHJvY2VzcyhuZXcgRGlmZkNvbnRleHQobGVmdCwgcmlnaHQpKTtcbn07XG5cbkRpZmZQYXRjaGVyLnByb3RvdHlwZS5wYXRjaCA9IGZ1bmN0aW9uKGxlZnQsIGRlbHRhKSB7XG4gIHJldHVybiB0aGlzLnByb2Nlc3Nvci5wcm9jZXNzKG5ldyBQYXRjaENvbnRleHQobGVmdCwgZGVsdGEpKTtcbn07XG5cbkRpZmZQYXRjaGVyLnByb3RvdHlwZS5yZXZlcnNlID0gZnVuY3Rpb24oZGVsdGEpIHtcbiAgcmV0dXJuIHRoaXMucHJvY2Vzc29yLnByb2Nlc3MobmV3IFJldmVyc2VDb250ZXh0KGRlbHRhKSk7XG59O1xuXG5EaWZmUGF0Y2hlci5wcm90b3R5cGUudW5wYXRjaCA9IGZ1bmN0aW9uKHJpZ2h0LCBkZWx0YSkge1xuICByZXR1cm4gdGhpcy5wYXRjaChyaWdodCwgdGhpcy5yZXZlcnNlKGRlbHRhKSk7XG59O1xuXG5leHBvcnRzLkRpZmZQYXRjaGVyID0gRGlmZlBhdGNoZXI7XG4iLCJ2YXIgRGlmZkNvbnRleHQgPSByZXF1aXJlKCcuLi9jb250ZXh0cy9kaWZmJykuRGlmZkNvbnRleHQ7XG52YXIgUGF0Y2hDb250ZXh0ID0gcmVxdWlyZSgnLi4vY29udGV4dHMvcGF0Y2gnKS5QYXRjaENvbnRleHQ7XG52YXIgUmV2ZXJzZUNvbnRleHQgPSByZXF1aXJlKCcuLi9jb250ZXh0cy9yZXZlcnNlJykuUmV2ZXJzZUNvbnRleHQ7XG5cbnZhciBsY3MgPSByZXF1aXJlKCcuL2xjcycpO1xuXG52YXIgQVJSQVlfTU9WRSA9IDM7XG5cbnZhciBpc0FycmF5ID0gKHR5cGVvZiBBcnJheS5pc0FycmF5ID09PSAnZnVuY3Rpb24nKSA/XG4gIC8vIHVzZSBuYXRpdmUgZnVuY3Rpb25cbiAgQXJyYXkuaXNBcnJheSA6XG4gIC8vIHVzZSBpbnN0YW5jZW9mIG9wZXJhdG9yXG4gIGZ1bmN0aW9uKGEpIHtcbiAgICByZXR1cm4gYSBpbnN0YW5jZW9mIEFycmF5O1xuICB9O1xuXG52YXIgYXJyYXlJbmRleE9mID0gdHlwZW9mIEFycmF5LnByb3RvdHlwZS5pbmRleE9mID09PSAnZnVuY3Rpb24nID9cbiAgZnVuY3Rpb24oYXJyYXksIGl0ZW0pIHtcbiAgICByZXR1cm4gYXJyYXkuaW5kZXhPZihpdGVtKTtcbiAgfSA6IGZ1bmN0aW9uKGFycmF5LCBpdGVtKSB7XG4gICAgdmFyIGxlbmd0aCA9IGFycmF5Lmxlbmd0aDtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAoYXJyYXlbaV0gPT09IGl0ZW0pIHtcbiAgICAgICAgcmV0dXJuIGk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiAtMTtcbiAgfTtcblxudmFyIGRpZmZGaWx0ZXIgPSBmdW5jdGlvbiBhcnJheXNEaWZmRmlsdGVyKGNvbnRleHQpIHtcbiAgaWYgKCFjb250ZXh0LmxlZnRJc0FycmF5KSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgdmFyIG9iamVjdEhhc2ggPSBjb250ZXh0Lm9wdGlvbnMgJiYgY29udGV4dC5vcHRpb25zLm9iamVjdEhhc2g7XG5cbiAgdmFyIG1hdGNoID0gZnVuY3Rpb24oYXJyYXkxLCBhcnJheTIsIGluZGV4MSwgaW5kZXgyLCBjb250ZXh0KSB7XG4gICAgdmFyIHZhbHVlMSA9IGFycmF5MVtpbmRleDFdO1xuICAgIHZhciB2YWx1ZTIgPSBhcnJheTJbaW5kZXgyXTtcbiAgICBpZiAodmFsdWUxID09PSB2YWx1ZTIpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIHZhbHVlMSAhPT0gJ29iamVjdCcgfHwgdHlwZW9mIHZhbHVlMiAhPT0gJ29iamVjdCcpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgaWYgKCFvYmplY3RIYXNoKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHZhciBoYXNoMSwgaGFzaDI7XG4gICAgaWYgKHR5cGVvZiBpbmRleDEgPT09ICdudW1iZXInKSB7XG4gICAgICBjb250ZXh0Lmhhc2hDYWNoZTEgPSBjb250ZXh0Lmhhc2hDYWNoZTEgfHwgW107XG4gICAgICBoYXNoMSA9IGNvbnRleHQuaGFzaENhY2hlMVtpbmRleDFdO1xuICAgICAgaWYgKHR5cGVvZiBoYXNoMSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgY29udGV4dC5oYXNoQ2FjaGUxW2luZGV4MV0gPSBoYXNoMSA9IG9iamVjdEhhc2godmFsdWUxLCBpbmRleDEpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBoYXNoMSA9IG9iamVjdEhhc2godmFsdWUxKTtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiBoYXNoMSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiBpbmRleDIgPT09ICdudW1iZXInKSB7XG4gICAgICBjb250ZXh0Lmhhc2hDYWNoZTIgPSBjb250ZXh0Lmhhc2hDYWNoZTIgfHwgW107XG4gICAgICBoYXNoMiA9IGNvbnRleHQuaGFzaENhY2hlMltpbmRleDJdO1xuICAgICAgaWYgKHR5cGVvZiBoYXNoMiA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgY29udGV4dC5oYXNoQ2FjaGUyW2luZGV4Ml0gPSBoYXNoMiA9IG9iamVjdEhhc2godmFsdWUyLCBpbmRleDIpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBoYXNoMiA9IG9iamVjdEhhc2godmFsdWUyKTtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiBoYXNoMiA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIGhhc2gxID09PSBoYXNoMjtcbiAgfTtcblxuICB2YXIgbWF0Y2hDb250ZXh0ID0ge307XG4gIHZhciBjb21tb25IZWFkID0gMCxcbiAgICBjb21tb25UYWlsID0gMCxcbiAgICBpbmRleCwgaW5kZXgxLCBpbmRleDI7XG4gIHZhciBhcnJheTEgPSBjb250ZXh0LmxlZnQ7XG4gIHZhciBhcnJheTIgPSBjb250ZXh0LnJpZ2h0O1xuICB2YXIgbGVuMSA9IGFycmF5MS5sZW5ndGg7XG4gIHZhciBsZW4yID0gYXJyYXkyLmxlbmd0aDtcblxuICB2YXIgY2hpbGQ7XG5cbiAgLy8gc2VwYXJhdGUgY29tbW9uIGhlYWRcbiAgd2hpbGUgKGNvbW1vbkhlYWQgPCBsZW4xICYmIGNvbW1vbkhlYWQgPCBsZW4yICYmXG4gICAgbWF0Y2goYXJyYXkxLCBhcnJheTIsIGNvbW1vbkhlYWQsIGNvbW1vbkhlYWQsIG1hdGNoQ29udGV4dCkpIHtcbiAgICBpbmRleCA9IGNvbW1vbkhlYWQ7XG4gICAgY2hpbGQgPSBuZXcgRGlmZkNvbnRleHQoY29udGV4dC5sZWZ0W2luZGV4XSwgY29udGV4dC5yaWdodFtpbmRleF0pO1xuICAgIGNvbnRleHQucHVzaChjaGlsZCwgaW5kZXgpO1xuICAgIGNvbW1vbkhlYWQrKztcbiAgfVxuICAvLyBzZXBhcmF0ZSBjb21tb24gdGFpbFxuICB3aGlsZSAoY29tbW9uVGFpbCArIGNvbW1vbkhlYWQgPCBsZW4xICYmIGNvbW1vblRhaWwgKyBjb21tb25IZWFkIDwgbGVuMiAmJlxuICAgIG1hdGNoKGFycmF5MSwgYXJyYXkyLCBsZW4xIC0gMSAtIGNvbW1vblRhaWwsIGxlbjIgLSAxIC0gY29tbW9uVGFpbCwgbWF0Y2hDb250ZXh0KSkge1xuICAgIGluZGV4MSA9IGxlbjEgLSAxIC0gY29tbW9uVGFpbDtcbiAgICBpbmRleDIgPSBsZW4yIC0gMSAtIGNvbW1vblRhaWw7XG4gICAgY2hpbGQgPSBuZXcgRGlmZkNvbnRleHQoY29udGV4dC5sZWZ0W2luZGV4MV0sIGNvbnRleHQucmlnaHRbaW5kZXgyXSk7XG4gICAgY29udGV4dC5wdXNoKGNoaWxkLCBpbmRleDIpO1xuICAgIGNvbW1vblRhaWwrKztcbiAgfVxuICB2YXIgcmVzdWx0O1xuICBpZiAoY29tbW9uSGVhZCArIGNvbW1vblRhaWwgPT09IGxlbjEpIHtcbiAgICBpZiAobGVuMSA9PT0gbGVuMikge1xuICAgICAgLy8gYXJyYXlzIGFyZSBpZGVudGljYWxcbiAgICAgIGNvbnRleHQuc2V0UmVzdWx0KHVuZGVmaW5lZCkuZXhpdCgpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICAvLyB0cml2aWFsIGNhc2UsIGEgYmxvY2sgKDEgb3IgbW9yZSBjb25zZWN1dGl2ZSBpdGVtcykgd2FzIGFkZGVkXG4gICAgcmVzdWx0ID0gcmVzdWx0IHx8IHtcbiAgICAgIF90OiAnYSdcbiAgICB9O1xuICAgIGZvciAoaW5kZXggPSBjb21tb25IZWFkOyBpbmRleCA8IGxlbjIgLSBjb21tb25UYWlsOyBpbmRleCsrKSB7XG4gICAgICByZXN1bHRbaW5kZXhdID0gW2FycmF5MltpbmRleF1dO1xuICAgIH1cbiAgICBjb250ZXh0LnNldFJlc3VsdChyZXN1bHQpLmV4aXQoKTtcbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKGNvbW1vbkhlYWQgKyBjb21tb25UYWlsID09PSBsZW4yKSB7XG4gICAgLy8gdHJpdmlhbCBjYXNlLCBhIGJsb2NrICgxIG9yIG1vcmUgY29uc2VjdXRpdmUgaXRlbXMpIHdhcyByZW1vdmVkXG4gICAgcmVzdWx0ID0gcmVzdWx0IHx8IHtcbiAgICAgIF90OiAnYSdcbiAgICB9O1xuICAgIGZvciAoaW5kZXggPSBjb21tb25IZWFkOyBpbmRleCA8IGxlbjEgLSBjb21tb25UYWlsOyBpbmRleCsrKSB7XG4gICAgICByZXN1bHRbJ18nICsgaW5kZXhdID0gW2FycmF5MVtpbmRleF0sIDAsIDBdO1xuICAgIH1cbiAgICBjb250ZXh0LnNldFJlc3VsdChyZXN1bHQpLmV4aXQoKTtcbiAgICByZXR1cm47XG4gIH1cbiAgLy8gcmVzZXQgaGFzaCBjYWNoZVxuICBtYXRjaENvbnRleHQgPSB7fTtcbiAgLy8gZGlmZiBpcyBub3QgdHJpdmlhbCwgZmluZCB0aGUgTENTIChMb25nZXN0IENvbW1vbiBTdWJzZXF1ZW5jZSlcbiAgdmFyIHRyaW1tZWQxID0gYXJyYXkxLnNsaWNlKGNvbW1vbkhlYWQsIGxlbjEgLSBjb21tb25UYWlsKTtcbiAgdmFyIHRyaW1tZWQyID0gYXJyYXkyLnNsaWNlKGNvbW1vbkhlYWQsIGxlbjIgLSBjb21tb25UYWlsKTtcbiAgdmFyIHNlcSA9IGxjcy5nZXQoXG4gICAgdHJpbW1lZDEsIHRyaW1tZWQyLFxuICAgIG1hdGNoLFxuICAgIG1hdGNoQ29udGV4dFxuICApO1xuICB2YXIgcmVtb3ZlZEl0ZW1zID0gW107XG4gIHJlc3VsdCA9IHJlc3VsdCB8fCB7XG4gICAgX3Q6ICdhJ1xuICB9O1xuICBmb3IgKGluZGV4ID0gY29tbW9uSGVhZDsgaW5kZXggPCBsZW4xIC0gY29tbW9uVGFpbDsgaW5kZXgrKykge1xuICAgIGlmIChhcnJheUluZGV4T2Yoc2VxLmluZGljZXMxLCBpbmRleCAtIGNvbW1vbkhlYWQpIDwgMCkge1xuICAgICAgLy8gcmVtb3ZlZFxuICAgICAgcmVzdWx0WydfJyArIGluZGV4XSA9IFthcnJheTFbaW5kZXhdLCAwLCAwXTtcbiAgICAgIHJlbW92ZWRJdGVtcy5wdXNoKGluZGV4KTtcbiAgICB9XG4gIH1cblxuICB2YXIgZGV0ZWN0TW92ZSA9IHRydWU7XG4gIGlmIChjb250ZXh0Lm9wdGlvbnMgJiYgY29udGV4dC5vcHRpb25zLmFycmF5cyAmJiBjb250ZXh0Lm9wdGlvbnMuYXJyYXlzLmRldGVjdE1vdmUgPT09IGZhbHNlKSB7XG4gICAgZGV0ZWN0TW92ZSA9IGZhbHNlO1xuICB9XG4gIHZhciBpbmNsdWRlVmFsdWVPbk1vdmUgPSBmYWxzZTtcbiAgaWYgKGNvbnRleHQub3B0aW9ucyAmJiBjb250ZXh0Lm9wdGlvbnMuYXJyYXlzICYmIGNvbnRleHQub3B0aW9ucy5hcnJheXMuaW5jbHVkZVZhbHVlT25Nb3ZlKSB7XG4gICAgaW5jbHVkZVZhbHVlT25Nb3ZlID0gdHJ1ZTtcbiAgfVxuXG4gIHZhciByZW1vdmVkSXRlbXNMZW5ndGggPSByZW1vdmVkSXRlbXMubGVuZ3RoO1xuICBmb3IgKGluZGV4ID0gY29tbW9uSGVhZDsgaW5kZXggPCBsZW4yIC0gY29tbW9uVGFpbDsgaW5kZXgrKykge1xuICAgIHZhciBpbmRleE9uQXJyYXkyID0gYXJyYXlJbmRleE9mKHNlcS5pbmRpY2VzMiwgaW5kZXggLSBjb21tb25IZWFkKTtcbiAgICBpZiAoaW5kZXhPbkFycmF5MiA8IDApIHtcbiAgICAgIC8vIGFkZGVkLCB0cnkgdG8gbWF0Y2ggd2l0aCBhIHJlbW92ZWQgaXRlbSBhbmQgcmVnaXN0ZXIgYXMgcG9zaXRpb24gbW92ZVxuICAgICAgdmFyIGlzTW92ZSA9IGZhbHNlO1xuICAgICAgaWYgKGRldGVjdE1vdmUgJiYgcmVtb3ZlZEl0ZW1zTGVuZ3RoID4gMCkge1xuICAgICAgICBmb3IgKHZhciByZW1vdmVJdGVtSW5kZXgxID0gMDsgcmVtb3ZlSXRlbUluZGV4MSA8IHJlbW92ZWRJdGVtc0xlbmd0aDsgcmVtb3ZlSXRlbUluZGV4MSsrKSB7XG4gICAgICAgICAgaW5kZXgxID0gcmVtb3ZlZEl0ZW1zW3JlbW92ZUl0ZW1JbmRleDFdO1xuICAgICAgICAgIGlmIChtYXRjaCh0cmltbWVkMSwgdHJpbW1lZDIsIGluZGV4MSAtIGNvbW1vbkhlYWQsXG4gICAgICAgICAgICBpbmRleCAtIGNvbW1vbkhlYWQsIG1hdGNoQ29udGV4dCkpIHtcbiAgICAgICAgICAgIC8vIHN0b3JlIHBvc2l0aW9uIG1vdmUgYXM6IFtvcmlnaW5hbFZhbHVlLCBuZXdQb3NpdGlvbiwgQVJSQVlfTU9WRV1cbiAgICAgICAgICAgIHJlc3VsdFsnXycgKyBpbmRleDFdLnNwbGljZSgxLCAyLCBpbmRleCwgQVJSQVlfTU9WRSk7XG4gICAgICAgICAgICBpZiAoIWluY2x1ZGVWYWx1ZU9uTW92ZSkge1xuICAgICAgICAgICAgICAvLyBkb24ndCBpbmNsdWRlIG1vdmVkIHZhbHVlIG9uIGRpZmYsIHRvIHNhdmUgYnl0ZXNcbiAgICAgICAgICAgICAgcmVzdWx0WydfJyArIGluZGV4MV1bMF0gPSAnJztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaW5kZXgyID0gaW5kZXg7XG4gICAgICAgICAgICBjaGlsZCA9IG5ldyBEaWZmQ29udGV4dChjb250ZXh0LmxlZnRbaW5kZXgxXSwgY29udGV4dC5yaWdodFtpbmRleDJdKTtcbiAgICAgICAgICAgIGNvbnRleHQucHVzaChjaGlsZCwgaW5kZXgyKTtcbiAgICAgICAgICAgIHJlbW92ZWRJdGVtcy5zcGxpY2UocmVtb3ZlSXRlbUluZGV4MSwgMSk7XG4gICAgICAgICAgICBpc01vdmUgPSB0cnVlO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoIWlzTW92ZSkge1xuICAgICAgICAvLyBhZGRlZFxuICAgICAgICByZXN1bHRbaW5kZXhdID0gW2FycmF5MltpbmRleF1dO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBtYXRjaCwgZG8gaW5uZXIgZGlmZlxuICAgICAgaW5kZXgxID0gc2VxLmluZGljZXMxW2luZGV4T25BcnJheTJdICsgY29tbW9uSGVhZDtcbiAgICAgIGluZGV4MiA9IHNlcS5pbmRpY2VzMltpbmRleE9uQXJyYXkyXSArIGNvbW1vbkhlYWQ7XG4gICAgICBjaGlsZCA9IG5ldyBEaWZmQ29udGV4dChjb250ZXh0LmxlZnRbaW5kZXgxXSwgY29udGV4dC5yaWdodFtpbmRleDJdKTtcbiAgICAgIGNvbnRleHQucHVzaChjaGlsZCwgaW5kZXgyKTtcbiAgICB9XG4gIH1cblxuICBjb250ZXh0LnNldFJlc3VsdChyZXN1bHQpLmV4aXQoKTtcblxufTtcbmRpZmZGaWx0ZXIuZmlsdGVyTmFtZSA9ICdhcnJheXMnO1xuXG52YXIgY29tcGFyZSA9IHtcbiAgbnVtZXJpY2FsbHk6IGZ1bmN0aW9uKGEsIGIpIHtcbiAgICByZXR1cm4gYSAtIGI7XG4gIH0sXG4gIG51bWVyaWNhbGx5Qnk6IGZ1bmN0aW9uKG5hbWUpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24oYSwgYikge1xuICAgICAgcmV0dXJuIGFbbmFtZV0gLSBiW25hbWVdO1xuICAgIH07XG4gIH1cbn07XG5cbnZhciBwYXRjaEZpbHRlciA9IGZ1bmN0aW9uIG5lc3RlZFBhdGNoRmlsdGVyKGNvbnRleHQpIHtcbiAgaWYgKCFjb250ZXh0Lm5lc3RlZCkge1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAoY29udGV4dC5kZWx0YS5fdCAhPT0gJ2EnKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHZhciBpbmRleCwgaW5kZXgxO1xuXG4gIHZhciBkZWx0YSA9IGNvbnRleHQuZGVsdGE7XG4gIHZhciBhcnJheSA9IGNvbnRleHQubGVmdDtcblxuICAvLyBmaXJzdCwgc2VwYXJhdGUgcmVtb3ZhbHMsIGluc2VydGlvbnMgYW5kIG1vZGlmaWNhdGlvbnNcbiAgdmFyIHRvUmVtb3ZlID0gW107XG4gIHZhciB0b0luc2VydCA9IFtdO1xuICB2YXIgdG9Nb2RpZnkgPSBbXTtcbiAgZm9yIChpbmRleCBpbiBkZWx0YSkge1xuICAgIGlmIChpbmRleCAhPT0gJ190Jykge1xuICAgICAgaWYgKGluZGV4WzBdID09PSAnXycpIHtcbiAgICAgICAgLy8gcmVtb3ZlZCBpdGVtIGZyb20gb3JpZ2luYWwgYXJyYXlcbiAgICAgICAgaWYgKGRlbHRhW2luZGV4XVsyXSA9PT0gMCB8fCBkZWx0YVtpbmRleF1bMl0gPT09IEFSUkFZX01PVkUpIHtcbiAgICAgICAgICB0b1JlbW92ZS5wdXNoKHBhcnNlSW50KGluZGV4LnNsaWNlKDEpLCAxMCkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignb25seSByZW1vdmFsIG9yIG1vdmUgY2FuIGJlIGFwcGxpZWQgYXQgb3JpZ2luYWwgYXJyYXkgaW5kaWNlcycgK1xuICAgICAgICAgICAgJywgaW52YWxpZCBkaWZmIHR5cGU6ICcgKyBkZWx0YVtpbmRleF1bMl0pO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoZGVsdGFbaW5kZXhdLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgIC8vIGFkZGVkIGl0ZW0gYXQgbmV3IGFycmF5XG4gICAgICAgICAgdG9JbnNlcnQucHVzaCh7XG4gICAgICAgICAgICBpbmRleDogcGFyc2VJbnQoaW5kZXgsIDEwKSxcbiAgICAgICAgICAgIHZhbHVlOiBkZWx0YVtpbmRleF1bMF1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBtb2RpZmllZCBpdGVtIGF0IG5ldyBhcnJheVxuICAgICAgICAgIHRvTW9kaWZ5LnB1c2goe1xuICAgICAgICAgICAgaW5kZXg6IHBhcnNlSW50KGluZGV4LCAxMCksXG4gICAgICAgICAgICBkZWx0YTogZGVsdGFbaW5kZXhdXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvLyByZW1vdmUgaXRlbXMsIGluIHJldmVyc2Ugb3JkZXIgdG8gYXZvaWQgc2F3aW5nIG91ciBvd24gZmxvb3JcbiAgdG9SZW1vdmUgPSB0b1JlbW92ZS5zb3J0KGNvbXBhcmUubnVtZXJpY2FsbHkpO1xuICBmb3IgKGluZGV4ID0gdG9SZW1vdmUubGVuZ3RoIC0gMTsgaW5kZXggPj0gMDsgaW5kZXgtLSkge1xuICAgIGluZGV4MSA9IHRvUmVtb3ZlW2luZGV4XTtcbiAgICB2YXIgaW5kZXhEaWZmID0gZGVsdGFbJ18nICsgaW5kZXgxXTtcbiAgICB2YXIgcmVtb3ZlZFZhbHVlID0gYXJyYXkuc3BsaWNlKGluZGV4MSwgMSlbMF07XG4gICAgaWYgKGluZGV4RGlmZlsyXSA9PT0gQVJSQVlfTU9WRSkge1xuICAgICAgLy8gcmVpbnNlcnQgbGF0ZXJcbiAgICAgIHRvSW5zZXJ0LnB1c2goe1xuICAgICAgICBpbmRleDogaW5kZXhEaWZmWzFdLFxuICAgICAgICB2YWx1ZTogcmVtb3ZlZFZhbHVlXG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICAvLyBpbnNlcnQgaXRlbXMsIGluIHJldmVyc2Ugb3JkZXIgdG8gYXZvaWQgbW92aW5nIG91ciBvd24gZmxvb3JcbiAgdG9JbnNlcnQgPSB0b0luc2VydC5zb3J0KGNvbXBhcmUubnVtZXJpY2FsbHlCeSgnaW5kZXgnKSk7XG4gIHZhciB0b0luc2VydExlbmd0aCA9IHRvSW5zZXJ0Lmxlbmd0aDtcbiAgZm9yIChpbmRleCA9IDA7IGluZGV4IDwgdG9JbnNlcnRMZW5ndGg7IGluZGV4KyspIHtcbiAgICB2YXIgaW5zZXJ0aW9uID0gdG9JbnNlcnRbaW5kZXhdO1xuICAgIGFycmF5LnNwbGljZShpbnNlcnRpb24uaW5kZXgsIDAsIGluc2VydGlvbi52YWx1ZSk7XG4gIH1cblxuICAvLyBhcHBseSBtb2RpZmljYXRpb25zXG4gIHZhciB0b01vZGlmeUxlbmd0aCA9IHRvTW9kaWZ5Lmxlbmd0aDtcbiAgdmFyIGNoaWxkO1xuICBpZiAodG9Nb2RpZnlMZW5ndGggPiAwKSB7XG4gICAgZm9yIChpbmRleCA9IDA7IGluZGV4IDwgdG9Nb2RpZnlMZW5ndGg7IGluZGV4KyspIHtcbiAgICAgIHZhciBtb2RpZmljYXRpb24gPSB0b01vZGlmeVtpbmRleF07XG4gICAgICBjaGlsZCA9IG5ldyBQYXRjaENvbnRleHQoY29udGV4dC5sZWZ0W21vZGlmaWNhdGlvbi5pbmRleF0sIG1vZGlmaWNhdGlvbi5kZWx0YSk7XG4gICAgICBjb250ZXh0LnB1c2goY2hpbGQsIG1vZGlmaWNhdGlvbi5pbmRleCk7XG4gICAgfVxuICB9XG5cbiAgaWYgKCFjb250ZXh0LmNoaWxkcmVuKSB7XG4gICAgY29udGV4dC5zZXRSZXN1bHQoY29udGV4dC5sZWZ0KS5leGl0KCk7XG4gICAgcmV0dXJuO1xuICB9XG4gIGNvbnRleHQuZXhpdCgpO1xufTtcbnBhdGNoRmlsdGVyLmZpbHRlck5hbWUgPSAnYXJyYXlzJztcblxudmFyIGNvbGxlY3RDaGlsZHJlblBhdGNoRmlsdGVyID0gZnVuY3Rpb24gY29sbGVjdENoaWxkcmVuUGF0Y2hGaWx0ZXIoY29udGV4dCkge1xuICBpZiAoIWNvbnRleHQgfHwgIWNvbnRleHQuY2hpbGRyZW4pIHtcbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKGNvbnRleHQuZGVsdGEuX3QgIT09ICdhJykge1xuICAgIHJldHVybjtcbiAgfVxuICB2YXIgbGVuZ3RoID0gY29udGV4dC5jaGlsZHJlbi5sZW5ndGg7XG4gIHZhciBjaGlsZDtcbiAgZm9yICh2YXIgaW5kZXggPSAwOyBpbmRleCA8IGxlbmd0aDsgaW5kZXgrKykge1xuICAgIGNoaWxkID0gY29udGV4dC5jaGlsZHJlbltpbmRleF07XG4gICAgY29udGV4dC5sZWZ0W2NoaWxkLmNoaWxkTmFtZV0gPSBjaGlsZC5yZXN1bHQ7XG4gIH1cbiAgY29udGV4dC5zZXRSZXN1bHQoY29udGV4dC5sZWZ0KS5leGl0KCk7XG59O1xuY29sbGVjdENoaWxkcmVuUGF0Y2hGaWx0ZXIuZmlsdGVyTmFtZSA9ICdhcnJheXNDb2xsZWN0Q2hpbGRyZW4nO1xuXG52YXIgcmV2ZXJzZUZpbHRlciA9IGZ1bmN0aW9uIGFycmF5c1JldmVyc2VGaWx0ZXIoY29udGV4dCkge1xuICBpZiAoIWNvbnRleHQubmVzdGVkKSB7XG4gICAgaWYgKGNvbnRleHQuZGVsdGFbMl0gPT09IEFSUkFZX01PVkUpIHtcbiAgICAgIGNvbnRleHQubmV3TmFtZSA9ICdfJyArIGNvbnRleHQuZGVsdGFbMV07XG4gICAgICBjb250ZXh0LnNldFJlc3VsdChbY29udGV4dC5kZWx0YVswXSwgcGFyc2VJbnQoY29udGV4dC5jaGlsZE5hbWUuc3Vic3RyKDEpLCAxMCksIEFSUkFZX01PVkVdKS5leGl0KCk7XG4gICAgfVxuICAgIHJldHVybjtcbiAgfVxuICBpZiAoY29udGV4dC5kZWx0YS5fdCAhPT0gJ2EnKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHZhciBuYW1lLCBjaGlsZDtcbiAgZm9yIChuYW1lIGluIGNvbnRleHQuZGVsdGEpIHtcbiAgICBpZiAobmFtZSA9PT0gJ190Jykge1xuICAgICAgY29udGludWU7XG4gICAgfVxuICAgIGNoaWxkID0gbmV3IFJldmVyc2VDb250ZXh0KGNvbnRleHQuZGVsdGFbbmFtZV0pO1xuICAgIGNvbnRleHQucHVzaChjaGlsZCwgbmFtZSk7XG4gIH1cbiAgY29udGV4dC5leGl0KCk7XG59O1xucmV2ZXJzZUZpbHRlci5maWx0ZXJOYW1lID0gJ2FycmF5cyc7XG5cbnZhciByZXZlcnNlQXJyYXlEZWx0YUluZGV4ID0gZnVuY3Rpb24oZGVsdGEsIGluZGV4LCBpdGVtRGVsdGEpIHtcbiAgdmFyIG5ld0luZGV4ID0gaW5kZXg7XG4gIHZhciBuZXdJbmRleDI7XG4gIGlmICh0eXBlb2YgaW5kZXggPT09ICdzdHJpbmcnICYmIGluZGV4WzBdID09PSAnXycpIHtcbiAgICBuZXdJbmRleCA9IHBhcnNlSW50KGluZGV4LnN1YnN0cigxKSwgMTApO1xuICB9IGVsc2Uge1xuICAgIHZhciB1aW5kZXggPSAnXycgKyBpbmRleDtcbiAgICBpZiAoaXNBcnJheShpdGVtRGVsdGEpICYmIGl0ZW1EZWx0YVsyXSA9PT0gMCkge1xuICAgICAgbmV3SW5kZXggPSB1aW5kZXg7XG4gICAgfSBlbHNlIHtcbiAgICAgIGZvciAodmFyIGluZGV4MiBpbiBkZWx0YSkge1xuICAgICAgICB2YXIgaXRlbURlbHRhMiA9IGRlbHRhW2luZGV4Ml07XG4gICAgICAgIGlmIChpc0FycmF5KGl0ZW1EZWx0YTIpKSB7XG4gICAgICAgICAgaWYgKGl0ZW1EZWx0YTJbMl0gPT09IEFSUkFZX01PVkUpIHtcbiAgICAgICAgICAgIGlmIChpdGVtRGVsdGEyWzFdLnRvU3RyaW5nKCkgPT09IGluZGV4KSB7XG4gICAgICAgICAgICAgIG5ld0luZGV4ID0gaW5kZXgyLnN1YnN0cigxKTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIGlmIChpdGVtRGVsdGEyWzJdID09PSAwICYmIHR5cGVvZiBpbmRleDIgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICBuZXdJbmRleDIgPSBwYXJzZUludChpbmRleDIuc3Vic3RyKDEpLCAxMCk7XG4gICAgICAgICAgICBpZiAobmV3SW5kZXgyIDw9IG5ld0luZGV4KSB7XG4gICAgICAgICAgICAgIG5ld0luZGV4Kys7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIGlmIChpdGVtRGVsdGEyLmxlbmd0aCA9PT0gMSAmJiBpbmRleDIgPD0gbmV3SW5kZXgpIHtcbiAgICAgICAgICAgIG5ld0luZGV4LS07XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiBuZXdJbmRleDtcbn07XG5cbnZhciBjb2xsZWN0Q2hpbGRyZW5SZXZlcnNlRmlsdGVyID0gZnVuY3Rpb24gY29sbGVjdENoaWxkcmVuUmV2ZXJzZUZpbHRlcihjb250ZXh0KSB7XG4gIGlmICghY29udGV4dCB8fCAhY29udGV4dC5jaGlsZHJlbikge1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAoY29udGV4dC5kZWx0YS5fdCAhPT0gJ2EnKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHZhciBsZW5ndGggPSBjb250ZXh0LmNoaWxkcmVuLmxlbmd0aDtcbiAgdmFyIGNoaWxkO1xuICB2YXIgZGVsdGEgPSB7XG4gICAgX3Q6ICdhJ1xuICB9O1xuICBmb3IgKHZhciBpbmRleCA9IDA7IGluZGV4IDwgbGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgY2hpbGQgPSBjb250ZXh0LmNoaWxkcmVuW2luZGV4XTtcbiAgICB2YXIgbmFtZSA9IGNoaWxkLm5ld05hbWU7XG4gICAgaWYgKHR5cGVvZiBuYW1lID09PSAndW5kZWZpbmVkJykge1xuICAgICAgbmFtZSA9IHJldmVyc2VBcnJheURlbHRhSW5kZXgoY29udGV4dC5kZWx0YSwgY2hpbGQuY2hpbGROYW1lLCBjaGlsZC5yZXN1bHQpO1xuICAgIH1cbiAgICBpZiAoZGVsdGFbbmFtZV0gIT09IGNoaWxkLnJlc3VsdCkge1xuICAgICAgZGVsdGFbbmFtZV0gPSBjaGlsZC5yZXN1bHQ7XG4gICAgfVxuICB9XG4gIGNvbnRleHQuc2V0UmVzdWx0KGRlbHRhKS5leGl0KCk7XG59O1xuY29sbGVjdENoaWxkcmVuUmV2ZXJzZUZpbHRlci5maWx0ZXJOYW1lID0gJ2FycmF5c0NvbGxlY3RDaGlsZHJlbic7XG5cbmV4cG9ydHMuZGlmZkZpbHRlciA9IGRpZmZGaWx0ZXI7XG5leHBvcnRzLnBhdGNoRmlsdGVyID0gcGF0Y2hGaWx0ZXI7XG5leHBvcnRzLmNvbGxlY3RDaGlsZHJlblBhdGNoRmlsdGVyID0gY29sbGVjdENoaWxkcmVuUGF0Y2hGaWx0ZXI7XG5leHBvcnRzLnJldmVyc2VGaWx0ZXIgPSByZXZlcnNlRmlsdGVyO1xuZXhwb3J0cy5jb2xsZWN0Q2hpbGRyZW5SZXZlcnNlRmlsdGVyID0gY29sbGVjdENoaWxkcmVuUmV2ZXJzZUZpbHRlcjtcbiIsInZhciBkaWZmRmlsdGVyID0gZnVuY3Rpb24gZGF0ZXNEaWZmRmlsdGVyKGNvbnRleHQpIHtcbiAgaWYgKGNvbnRleHQubGVmdCBpbnN0YW5jZW9mIERhdGUpIHtcbiAgICBpZiAoY29udGV4dC5yaWdodCBpbnN0YW5jZW9mIERhdGUpIHtcbiAgICAgIGlmIChjb250ZXh0LmxlZnQuZ2V0VGltZSgpICE9PSBjb250ZXh0LnJpZ2h0LmdldFRpbWUoKSkge1xuICAgICAgICBjb250ZXh0LnNldFJlc3VsdChbY29udGV4dC5sZWZ0LCBjb250ZXh0LnJpZ2h0XSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb250ZXh0LnNldFJlc3VsdCh1bmRlZmluZWQpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBjb250ZXh0LnNldFJlc3VsdChbY29udGV4dC5sZWZ0LCBjb250ZXh0LnJpZ2h0XSk7XG4gICAgfVxuICAgIGNvbnRleHQuZXhpdCgpO1xuICB9IGVsc2UgaWYgKGNvbnRleHQucmlnaHQgaW5zdGFuY2VvZiBEYXRlKSB7XG4gICAgY29udGV4dC5zZXRSZXN1bHQoW2NvbnRleHQubGVmdCwgY29udGV4dC5yaWdodF0pLmV4aXQoKTtcbiAgfVxufTtcbmRpZmZGaWx0ZXIuZmlsdGVyTmFtZSA9ICdkYXRlcyc7XG5cbmV4cG9ydHMuZGlmZkZpbHRlciA9IGRpZmZGaWx0ZXI7XG4iLCIvKlxuXG5MQ1MgaW1wbGVtZW50YXRpb24gdGhhdCBzdXBwb3J0cyBhcnJheXMgb3Igc3RyaW5nc1xuXG5yZWZlcmVuY2U6IGh0dHA6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvTG9uZ2VzdF9jb21tb25fc3Vic2VxdWVuY2VfcHJvYmxlbVxuXG4qL1xuXG52YXIgZGVmYXVsdE1hdGNoID0gZnVuY3Rpb24oYXJyYXkxLCBhcnJheTIsIGluZGV4MSwgaW5kZXgyKSB7XG4gIHJldHVybiBhcnJheTFbaW5kZXgxXSA9PT0gYXJyYXkyW2luZGV4Ml07XG59O1xuXG52YXIgbGVuZ3RoTWF0cml4ID0gZnVuY3Rpb24oYXJyYXkxLCBhcnJheTIsIG1hdGNoLCBjb250ZXh0KSB7XG4gIHZhciBsZW4xID0gYXJyYXkxLmxlbmd0aDtcbiAgdmFyIGxlbjIgPSBhcnJheTIubGVuZ3RoO1xuICB2YXIgeCwgeTtcblxuICAvLyBpbml0aWFsaXplIGVtcHR5IG1hdHJpeCBvZiBsZW4xKzEgeCBsZW4yKzFcbiAgdmFyIG1hdHJpeCA9IFtsZW4xICsgMV07XG4gIGZvciAoeCA9IDA7IHggPCBsZW4xICsgMTsgeCsrKSB7XG4gICAgbWF0cml4W3hdID0gW2xlbjIgKyAxXTtcbiAgICBmb3IgKHkgPSAwOyB5IDwgbGVuMiArIDE7IHkrKykge1xuICAgICAgbWF0cml4W3hdW3ldID0gMDtcbiAgICB9XG4gIH1cbiAgbWF0cml4Lm1hdGNoID0gbWF0Y2g7XG4gIC8vIHNhdmUgc2VxdWVuY2UgbGVuZ3RocyBmb3IgZWFjaCBjb29yZGluYXRlXG4gIGZvciAoeCA9IDE7IHggPCBsZW4xICsgMTsgeCsrKSB7XG4gICAgZm9yICh5ID0gMTsgeSA8IGxlbjIgKyAxOyB5KyspIHtcbiAgICAgIGlmIChtYXRjaChhcnJheTEsIGFycmF5MiwgeCAtIDEsIHkgLSAxLCBjb250ZXh0KSkge1xuICAgICAgICBtYXRyaXhbeF1beV0gPSBtYXRyaXhbeCAtIDFdW3kgLSAxXSArIDE7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBtYXRyaXhbeF1beV0gPSBNYXRoLm1heChtYXRyaXhbeCAtIDFdW3ldLCBtYXRyaXhbeF1beSAtIDFdKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIG1hdHJpeDtcbn07XG5cbnZhciBiYWNrdHJhY2sgPSBmdW5jdGlvbihtYXRyaXgsIGFycmF5MSwgYXJyYXkyLCBpbmRleDEsIGluZGV4MiwgY29udGV4dCkge1xuICBpZiAoaW5kZXgxID09PSAwIHx8IGluZGV4MiA9PT0gMCkge1xuICAgIHJldHVybiB7XG4gICAgICBzZXF1ZW5jZTogW10sXG4gICAgICBpbmRpY2VzMTogW10sXG4gICAgICBpbmRpY2VzMjogW11cbiAgICB9O1xuICB9XG5cbiAgaWYgKG1hdHJpeC5tYXRjaChhcnJheTEsIGFycmF5MiwgaW5kZXgxIC0gMSwgaW5kZXgyIC0gMSwgY29udGV4dCkpIHtcbiAgICB2YXIgc3Vic2VxdWVuY2UgPSBiYWNrdHJhY2sobWF0cml4LCBhcnJheTEsIGFycmF5MiwgaW5kZXgxIC0gMSwgaW5kZXgyIC0gMSwgY29udGV4dCk7XG4gICAgc3Vic2VxdWVuY2Uuc2VxdWVuY2UucHVzaChhcnJheTFbaW5kZXgxIC0gMV0pO1xuICAgIHN1YnNlcXVlbmNlLmluZGljZXMxLnB1c2goaW5kZXgxIC0gMSk7XG4gICAgc3Vic2VxdWVuY2UuaW5kaWNlczIucHVzaChpbmRleDIgLSAxKTtcbiAgICByZXR1cm4gc3Vic2VxdWVuY2U7XG4gIH1cblxuICBpZiAobWF0cml4W2luZGV4MV1baW5kZXgyIC0gMV0gPiBtYXRyaXhbaW5kZXgxIC0gMV1baW5kZXgyXSkge1xuICAgIHJldHVybiBiYWNrdHJhY2sobWF0cml4LCBhcnJheTEsIGFycmF5MiwgaW5kZXgxLCBpbmRleDIgLSAxLCBjb250ZXh0KTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gYmFja3RyYWNrKG1hdHJpeCwgYXJyYXkxLCBhcnJheTIsIGluZGV4MSAtIDEsIGluZGV4MiwgY29udGV4dCk7XG4gIH1cbn07XG5cbnZhciBnZXQgPSBmdW5jdGlvbihhcnJheTEsIGFycmF5MiwgbWF0Y2gsIGNvbnRleHQpIHtcbiAgY29udGV4dCA9IGNvbnRleHQgfHwge307XG4gIHZhciBtYXRyaXggPSBsZW5ndGhNYXRyaXgoYXJyYXkxLCBhcnJheTIsIG1hdGNoIHx8IGRlZmF1bHRNYXRjaCwgY29udGV4dCk7XG4gIHZhciByZXN1bHQgPSBiYWNrdHJhY2sobWF0cml4LCBhcnJheTEsIGFycmF5MiwgYXJyYXkxLmxlbmd0aCwgYXJyYXkyLmxlbmd0aCwgY29udGV4dCk7XG4gIGlmICh0eXBlb2YgYXJyYXkxID09PSAnc3RyaW5nJyAmJiB0eXBlb2YgYXJyYXkyID09PSAnc3RyaW5nJykge1xuICAgIHJlc3VsdC5zZXF1ZW5jZSA9IHJlc3VsdC5zZXF1ZW5jZS5qb2luKCcnKTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufTtcblxuZXhwb3J0cy5nZXQgPSBnZXQ7XG4iLCJ2YXIgRGlmZkNvbnRleHQgPSByZXF1aXJlKCcuLi9jb250ZXh0cy9kaWZmJykuRGlmZkNvbnRleHQ7XG52YXIgUGF0Y2hDb250ZXh0ID0gcmVxdWlyZSgnLi4vY29udGV4dHMvcGF0Y2gnKS5QYXRjaENvbnRleHQ7XG52YXIgUmV2ZXJzZUNvbnRleHQgPSByZXF1aXJlKCcuLi9jb250ZXh0cy9yZXZlcnNlJykuUmV2ZXJzZUNvbnRleHQ7XG5cbnZhciBjb2xsZWN0Q2hpbGRyZW5EaWZmRmlsdGVyID0gZnVuY3Rpb24gY29sbGVjdENoaWxkcmVuRGlmZkZpbHRlcihjb250ZXh0KSB7XG4gIGlmICghY29udGV4dCB8fCAhY29udGV4dC5jaGlsZHJlbikge1xuICAgIHJldHVybjtcbiAgfVxuICB2YXIgbGVuZ3RoID0gY29udGV4dC5jaGlsZHJlbi5sZW5ndGg7XG4gIHZhciBjaGlsZDtcbiAgdmFyIHJlc3VsdCA9IGNvbnRleHQucmVzdWx0O1xuICBmb3IgKHZhciBpbmRleCA9IDA7IGluZGV4IDwgbGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgY2hpbGQgPSBjb250ZXh0LmNoaWxkcmVuW2luZGV4XTtcbiAgICBpZiAodHlwZW9mIGNoaWxkLnJlc3VsdCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cbiAgICByZXN1bHQgPSByZXN1bHQgfHwge307XG4gICAgcmVzdWx0W2NoaWxkLmNoaWxkTmFtZV0gPSBjaGlsZC5yZXN1bHQ7XG4gIH1cbiAgaWYgKHJlc3VsdCAmJiBjb250ZXh0LmxlZnRJc0FycmF5KSB7XG4gICAgcmVzdWx0Ll90ID0gJ2EnO1xuICB9XG4gIGNvbnRleHQuc2V0UmVzdWx0KHJlc3VsdCkuZXhpdCgpO1xufTtcbmNvbGxlY3RDaGlsZHJlbkRpZmZGaWx0ZXIuZmlsdGVyTmFtZSA9ICdjb2xsZWN0Q2hpbGRyZW4nO1xuXG52YXIgb2JqZWN0c0RpZmZGaWx0ZXIgPSBmdW5jdGlvbiBvYmplY3RzRGlmZkZpbHRlcihjb250ZXh0KSB7XG4gIGlmIChjb250ZXh0LmxlZnRJc0FycmF5IHx8IGNvbnRleHQubGVmdFR5cGUgIT09ICdvYmplY3QnKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgdmFyIG5hbWUsIGNoaWxkO1xuICBmb3IgKG5hbWUgaW4gY29udGV4dC5sZWZ0KSB7XG4gICAgY2hpbGQgPSBuZXcgRGlmZkNvbnRleHQoY29udGV4dC5sZWZ0W25hbWVdLCBjb250ZXh0LnJpZ2h0W25hbWVdKTtcbiAgICBjb250ZXh0LnB1c2goY2hpbGQsIG5hbWUpO1xuICB9XG4gIGZvciAobmFtZSBpbiBjb250ZXh0LnJpZ2h0KSB7XG4gICAgaWYgKHR5cGVvZiBjb250ZXh0LmxlZnRbbmFtZV0gPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBjaGlsZCA9IG5ldyBEaWZmQ29udGV4dCh1bmRlZmluZWQsIGNvbnRleHQucmlnaHRbbmFtZV0pO1xuICAgICAgY29udGV4dC5wdXNoKGNoaWxkLCBuYW1lKTtcbiAgICB9XG4gIH1cblxuICBpZiAoIWNvbnRleHQuY2hpbGRyZW4gfHwgY29udGV4dC5jaGlsZHJlbi5sZW5ndGggPT09IDApIHtcbiAgICBjb250ZXh0LnNldFJlc3VsdCh1bmRlZmluZWQpLmV4aXQoKTtcbiAgICByZXR1cm47XG4gIH1cbiAgY29udGV4dC5leGl0KCk7XG59O1xub2JqZWN0c0RpZmZGaWx0ZXIuZmlsdGVyTmFtZSA9ICdvYmplY3RzJztcblxudmFyIHBhdGNoRmlsdGVyID0gZnVuY3Rpb24gbmVzdGVkUGF0Y2hGaWx0ZXIoY29udGV4dCkge1xuICBpZiAoIWNvbnRleHQubmVzdGVkKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmIChjb250ZXh0LmRlbHRhLl90KSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHZhciBuYW1lLCBjaGlsZDtcbiAgZm9yIChuYW1lIGluIGNvbnRleHQuZGVsdGEpIHtcbiAgICBjaGlsZCA9IG5ldyBQYXRjaENvbnRleHQoY29udGV4dC5sZWZ0W25hbWVdLCBjb250ZXh0LmRlbHRhW25hbWVdKTtcbiAgICBjb250ZXh0LnB1c2goY2hpbGQsIG5hbWUpO1xuICB9XG4gIGNvbnRleHQuZXhpdCgpO1xufTtcbnBhdGNoRmlsdGVyLmZpbHRlck5hbWUgPSAnb2JqZWN0cyc7XG5cbnZhciBjb2xsZWN0Q2hpbGRyZW5QYXRjaEZpbHRlciA9IGZ1bmN0aW9uIGNvbGxlY3RDaGlsZHJlblBhdGNoRmlsdGVyKGNvbnRleHQpIHtcbiAgaWYgKCFjb250ZXh0IHx8ICFjb250ZXh0LmNoaWxkcmVuKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmIChjb250ZXh0LmRlbHRhLl90KSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHZhciBsZW5ndGggPSBjb250ZXh0LmNoaWxkcmVuLmxlbmd0aDtcbiAgdmFyIGNoaWxkO1xuICBmb3IgKHZhciBpbmRleCA9IDA7IGluZGV4IDwgbGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgY2hpbGQgPSBjb250ZXh0LmNoaWxkcmVuW2luZGV4XTtcbiAgICBpZiAoY29udGV4dC5sZWZ0Lmhhc093blByb3BlcnR5KGNoaWxkLmNoaWxkTmFtZSkgJiYgY2hpbGQucmVzdWx0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGRlbGV0ZSBjb250ZXh0LmxlZnRbY2hpbGQuY2hpbGROYW1lXTtcbiAgICB9IGVsc2UgaWYgKGNvbnRleHQubGVmdFtjaGlsZC5jaGlsZE5hbWVdICE9PSBjaGlsZC5yZXN1bHQpIHtcbiAgICAgIGNvbnRleHQubGVmdFtjaGlsZC5jaGlsZE5hbWVdID0gY2hpbGQucmVzdWx0O1xuICAgIH1cbiAgfVxuICBjb250ZXh0LnNldFJlc3VsdChjb250ZXh0LmxlZnQpLmV4aXQoKTtcbn07XG5jb2xsZWN0Q2hpbGRyZW5QYXRjaEZpbHRlci5maWx0ZXJOYW1lID0gJ2NvbGxlY3RDaGlsZHJlbic7XG5cbnZhciByZXZlcnNlRmlsdGVyID0gZnVuY3Rpb24gbmVzdGVkUmV2ZXJzZUZpbHRlcihjb250ZXh0KSB7XG4gIGlmICghY29udGV4dC5uZXN0ZWQpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKGNvbnRleHQuZGVsdGEuX3QpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgdmFyIG5hbWUsIGNoaWxkO1xuICBmb3IgKG5hbWUgaW4gY29udGV4dC5kZWx0YSkge1xuICAgIGNoaWxkID0gbmV3IFJldmVyc2VDb250ZXh0KGNvbnRleHQuZGVsdGFbbmFtZV0pO1xuICAgIGNvbnRleHQucHVzaChjaGlsZCwgbmFtZSk7XG4gIH1cbiAgY29udGV4dC5leGl0KCk7XG59O1xucmV2ZXJzZUZpbHRlci5maWx0ZXJOYW1lID0gJ29iamVjdHMnO1xuXG52YXIgY29sbGVjdENoaWxkcmVuUmV2ZXJzZUZpbHRlciA9IGZ1bmN0aW9uIGNvbGxlY3RDaGlsZHJlblJldmVyc2VGaWx0ZXIoY29udGV4dCkge1xuICBpZiAoIWNvbnRleHQgfHwgIWNvbnRleHQuY2hpbGRyZW4pIHtcbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKGNvbnRleHQuZGVsdGEuX3QpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgdmFyIGxlbmd0aCA9IGNvbnRleHQuY2hpbGRyZW4ubGVuZ3RoO1xuICB2YXIgY2hpbGQ7XG4gIHZhciBkZWx0YSA9IHt9O1xuICBmb3IgKHZhciBpbmRleCA9IDA7IGluZGV4IDwgbGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgY2hpbGQgPSBjb250ZXh0LmNoaWxkcmVuW2luZGV4XTtcbiAgICBpZiAoZGVsdGFbY2hpbGQuY2hpbGROYW1lXSAhPT0gY2hpbGQucmVzdWx0KSB7XG4gICAgICBkZWx0YVtjaGlsZC5jaGlsZE5hbWVdID0gY2hpbGQucmVzdWx0O1xuICAgIH1cbiAgfVxuICBjb250ZXh0LnNldFJlc3VsdChkZWx0YSkuZXhpdCgpO1xufTtcbmNvbGxlY3RDaGlsZHJlblJldmVyc2VGaWx0ZXIuZmlsdGVyTmFtZSA9ICdjb2xsZWN0Q2hpbGRyZW4nO1xuXG5leHBvcnRzLmNvbGxlY3RDaGlsZHJlbkRpZmZGaWx0ZXIgPSBjb2xsZWN0Q2hpbGRyZW5EaWZmRmlsdGVyO1xuZXhwb3J0cy5vYmplY3RzRGlmZkZpbHRlciA9IG9iamVjdHNEaWZmRmlsdGVyO1xuZXhwb3J0cy5wYXRjaEZpbHRlciA9IHBhdGNoRmlsdGVyO1xuZXhwb3J0cy5jb2xsZWN0Q2hpbGRyZW5QYXRjaEZpbHRlciA9IGNvbGxlY3RDaGlsZHJlblBhdGNoRmlsdGVyO1xuZXhwb3J0cy5yZXZlcnNlRmlsdGVyID0gcmV2ZXJzZUZpbHRlcjtcbmV4cG9ydHMuY29sbGVjdENoaWxkcmVuUmV2ZXJzZUZpbHRlciA9IGNvbGxlY3RDaGlsZHJlblJldmVyc2VGaWx0ZXI7XG4iLCIvKiBnbG9iYWwgZGlmZl9tYXRjaF9wYXRjaCAqL1xudmFyIFRFWFRfRElGRiA9IDI7XG52YXIgREVGQVVMVF9NSU5fTEVOR1RIID0gNjA7XG52YXIgY2FjaGVkRGlmZlBhdGNoID0gbnVsbDtcblxudmFyIGdldERpZmZNYXRjaFBhdGNoID0gZnVuY3Rpb24oKSB7XG4gIC8qanNoaW50IGNhbWVsY2FzZTogZmFsc2UgKi9cblxuICBpZiAoIWNhY2hlZERpZmZQYXRjaCkge1xuICAgIHZhciBpbnN0YW5jZTtcbiAgICBpZiAodHlwZW9mIGRpZmZfbWF0Y2hfcGF0Y2ggIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAvLyBhbHJlYWR5IGxvYWRlZCwgcHJvYmFibHkgYSBicm93c2VyXG4gICAgICBpbnN0YW5jZSA9IHR5cGVvZiBkaWZmX21hdGNoX3BhdGNoID09PSAnZnVuY3Rpb24nID9cbiAgICAgICAgbmV3IGRpZmZfbWF0Y2hfcGF0Y2goKSA6IG5ldyBkaWZmX21hdGNoX3BhdGNoLmRpZmZfbWF0Y2hfcGF0Y2goKTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiByZXF1aXJlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICB0cnkge1xuICAgICAgICB2YXIgZG1wTW9kdWxlTmFtZSA9ICdkaWZmX21hdGNoX3BhdGNoX3VuY29tcHJlc3NlZCc7XG4gICAgICAgIHZhciBkbXAgPSByZXF1aXJlKCcuLi8uLi9wdWJsaWMvZXh0ZXJuYWwvJyArIGRtcE1vZHVsZU5hbWUpO1xuICAgICAgICBpbnN0YW5jZSA9IG5ldyBkbXAuZGlmZl9tYXRjaF9wYXRjaCgpO1xuICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIGluc3RhbmNlID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKCFpbnN0YW5jZSkge1xuICAgICAgdmFyIGVycm9yID0gbmV3IEVycm9yKCd0ZXh0IGRpZmZfbWF0Y2hfcGF0Y2ggbGlicmFyeSBub3QgZm91bmQnKTtcbiAgICAgIGVycm9yLmRpZmZfbWF0Y2hfcGF0Y2hfbm90X2ZvdW5kID0gdHJ1ZTtcbiAgICAgIHRocm93IGVycm9yO1xuICAgIH1cbiAgICBjYWNoZWREaWZmUGF0Y2ggPSB7XG4gICAgICBkaWZmOiBmdW5jdGlvbih0eHQxLCB0eHQyKSB7XG4gICAgICAgIHJldHVybiBpbnN0YW5jZS5wYXRjaF90b1RleHQoaW5zdGFuY2UucGF0Y2hfbWFrZSh0eHQxLCB0eHQyKSk7XG4gICAgICB9LFxuICAgICAgcGF0Y2g6IGZ1bmN0aW9uKHR4dDEsIHBhdGNoKSB7XG4gICAgICAgIHZhciByZXN1bHRzID0gaW5zdGFuY2UucGF0Y2hfYXBwbHkoaW5zdGFuY2UucGF0Y2hfZnJvbVRleHQocGF0Y2gpLCB0eHQxKTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCByZXN1bHRzWzFdLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgaWYgKCFyZXN1bHRzWzFdW2ldKSB7XG4gICAgICAgICAgICB2YXIgZXJyb3IgPSBuZXcgRXJyb3IoJ3RleHQgcGF0Y2ggZmFpbGVkJyk7XG4gICAgICAgICAgICBlcnJvci50ZXh0UGF0Y2hGYWlsZWQgPSB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0c1swXTtcbiAgICAgIH1cbiAgICB9O1xuICB9XG4gIHJldHVybiBjYWNoZWREaWZmUGF0Y2g7XG59O1xuXG52YXIgZGlmZkZpbHRlciA9IGZ1bmN0aW9uIHRleHRzRGlmZkZpbHRlcihjb250ZXh0KSB7XG4gIGlmIChjb250ZXh0LmxlZnRUeXBlICE9PSAnc3RyaW5nJykge1xuICAgIHJldHVybjtcbiAgfVxuICB2YXIgbWluTGVuZ3RoID0gKGNvbnRleHQub3B0aW9ucyAmJiBjb250ZXh0Lm9wdGlvbnMudGV4dERpZmYgJiZcbiAgICBjb250ZXh0Lm9wdGlvbnMudGV4dERpZmYubWluTGVuZ3RoKSB8fCBERUZBVUxUX01JTl9MRU5HVEg7XG4gIGlmIChjb250ZXh0LmxlZnQubGVuZ3RoIDwgbWluTGVuZ3RoIHx8XG4gICAgY29udGV4dC5yaWdodC5sZW5ndGggPCBtaW5MZW5ndGgpIHtcbiAgICBjb250ZXh0LnNldFJlc3VsdChbY29udGV4dC5sZWZ0LCBjb250ZXh0LnJpZ2h0XSkuZXhpdCgpO1xuICAgIHJldHVybjtcbiAgfVxuICAvLyBsYXJnZSB0ZXh0LCB1c2UgYSB0ZXh0LWRpZmYgYWxnb3JpdGhtXG4gIHZhciBkaWZmID0gZ2V0RGlmZk1hdGNoUGF0Y2goKS5kaWZmO1xuICBjb250ZXh0LnNldFJlc3VsdChbZGlmZihjb250ZXh0LmxlZnQsIGNvbnRleHQucmlnaHQpLCAwLCBURVhUX0RJRkZdKS5leGl0KCk7XG59O1xuZGlmZkZpbHRlci5maWx0ZXJOYW1lID0gJ3RleHRzJztcblxudmFyIHBhdGNoRmlsdGVyID0gZnVuY3Rpb24gdGV4dHNQYXRjaEZpbHRlcihjb250ZXh0KSB7XG4gIGlmIChjb250ZXh0Lm5lc3RlZCkge1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAoY29udGV4dC5kZWx0YVsyXSAhPT0gVEVYVF9ESUZGKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLy8gdGV4dC1kaWZmLCB1c2UgYSB0ZXh0LXBhdGNoIGFsZ29yaXRobVxuICB2YXIgcGF0Y2ggPSBnZXREaWZmTWF0Y2hQYXRjaCgpLnBhdGNoO1xuICBjb250ZXh0LnNldFJlc3VsdChwYXRjaChjb250ZXh0LmxlZnQsIGNvbnRleHQuZGVsdGFbMF0pKS5leGl0KCk7XG59O1xucGF0Y2hGaWx0ZXIuZmlsdGVyTmFtZSA9ICd0ZXh0cyc7XG5cbnZhciB0ZXh0RGVsdGFSZXZlcnNlID0gZnVuY3Rpb24oZGVsdGEpIHtcbiAgdmFyIGksIGwsIGxpbmVzLCBsaW5lLCBsaW5lVG1wLCBoZWFkZXIgPSBudWxsLFxuICAgIGhlYWRlclJlZ2V4ID0gL15AQCArXFwtKFxcZCspLChcXGQrKSArXFwrKFxcZCspLChcXGQrKSArQEAkLyxcbiAgICBsaW5lSGVhZGVyLCBsaW5lQWRkLCBsaW5lUmVtb3ZlO1xuICBsaW5lcyA9IGRlbHRhLnNwbGl0KCdcXG4nKTtcbiAgZm9yIChpID0gMCwgbCA9IGxpbmVzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgIGxpbmUgPSBsaW5lc1tpXTtcbiAgICB2YXIgbGluZVN0YXJ0ID0gbGluZS5zbGljZSgwLCAxKTtcbiAgICBpZiAobGluZVN0YXJ0ID09PSAnQCcpIHtcbiAgICAgIGhlYWRlciA9IGhlYWRlclJlZ2V4LmV4ZWMobGluZSk7XG4gICAgICBsaW5lSGVhZGVyID0gaTtcbiAgICAgIGxpbmVBZGQgPSBudWxsO1xuICAgICAgbGluZVJlbW92ZSA9IG51bGw7XG5cbiAgICAgIC8vIGZpeCBoZWFkZXJcbiAgICAgIGxpbmVzW2xpbmVIZWFkZXJdID0gJ0BAIC0nICsgaGVhZGVyWzNdICsgJywnICsgaGVhZGVyWzRdICsgJyArJyArIGhlYWRlclsxXSArICcsJyArIGhlYWRlclsyXSArICcgQEAnO1xuICAgIH0gZWxzZSBpZiAobGluZVN0YXJ0ID09PSAnKycpIHtcbiAgICAgIGxpbmVBZGQgPSBpO1xuICAgICAgbGluZXNbaV0gPSAnLScgKyBsaW5lc1tpXS5zbGljZSgxKTtcbiAgICAgIGlmIChsaW5lc1tpIC0gMV0uc2xpY2UoMCwgMSkgPT09ICcrJykge1xuICAgICAgICAvLyBzd2FwIGxpbmVzIHRvIGtlZXAgZGVmYXVsdCBvcmRlciAoLSspXG4gICAgICAgIGxpbmVUbXAgPSBsaW5lc1tpXTtcbiAgICAgICAgbGluZXNbaV0gPSBsaW5lc1tpIC0gMV07XG4gICAgICAgIGxpbmVzW2kgLSAxXSA9IGxpbmVUbXA7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChsaW5lU3RhcnQgPT09ICctJykge1xuICAgICAgbGluZVJlbW92ZSA9IGk7XG4gICAgICBsaW5lc1tpXSA9ICcrJyArIGxpbmVzW2ldLnNsaWNlKDEpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gbGluZXMuam9pbignXFxuJyk7XG59O1xuXG52YXIgcmV2ZXJzZUZpbHRlciA9IGZ1bmN0aW9uIHRleHRzUmV2ZXJzZUZpbHRlcihjb250ZXh0KSB7XG4gIGlmIChjb250ZXh0Lm5lc3RlZCkge1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAoY29udGV4dC5kZWx0YVsyXSAhPT0gVEVYVF9ESUZGKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLy8gdGV4dC1kaWZmLCB1c2UgYSB0ZXh0LWRpZmYgYWxnb3JpdGhtXG4gIGNvbnRleHQuc2V0UmVzdWx0KFt0ZXh0RGVsdGFSZXZlcnNlKGNvbnRleHQuZGVsdGFbMF0pLCAwLCBURVhUX0RJRkZdKS5leGl0KCk7XG59O1xucmV2ZXJzZUZpbHRlci5maWx0ZXJOYW1lID0gJ3RleHRzJztcblxuZXhwb3J0cy5kaWZmRmlsdGVyID0gZGlmZkZpbHRlcjtcbmV4cG9ydHMucGF0Y2hGaWx0ZXIgPSBwYXRjaEZpbHRlcjtcbmV4cG9ydHMucmV2ZXJzZUZpbHRlciA9IHJldmVyc2VGaWx0ZXI7XG4iLCJ2YXIgaXNBcnJheSA9ICh0eXBlb2YgQXJyYXkuaXNBcnJheSA9PT0gJ2Z1bmN0aW9uJykgP1xuICAvLyB1c2UgbmF0aXZlIGZ1bmN0aW9uXG4gIEFycmF5LmlzQXJyYXkgOlxuICAvLyB1c2UgaW5zdGFuY2VvZiBvcGVyYXRvclxuICBmdW5jdGlvbihhKSB7XG4gICAgcmV0dXJuIGEgaW5zdGFuY2VvZiBBcnJheTtcbiAgfTtcblxudmFyIGRpZmZGaWx0ZXIgPSBmdW5jdGlvbiB0cml2aWFsTWF0Y2hlc0RpZmZGaWx0ZXIoY29udGV4dCkge1xuICBpZiAoY29udGV4dC5sZWZ0ID09PSBjb250ZXh0LnJpZ2h0KSB7XG4gICAgY29udGV4dC5zZXRSZXN1bHQodW5kZWZpbmVkKS5leGl0KCk7XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmICh0eXBlb2YgY29udGV4dC5sZWZ0ID09PSAndW5kZWZpbmVkJykge1xuICAgIGlmICh0eXBlb2YgY29udGV4dC5yaWdodCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdmdW5jdGlvbnMgYXJlIG5vdCBzdXBwb3J0ZWQnKTtcbiAgICB9XG4gICAgY29udGV4dC5zZXRSZXN1bHQoW2NvbnRleHQucmlnaHRdKS5leGl0KCk7XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmICh0eXBlb2YgY29udGV4dC5yaWdodCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBjb250ZXh0LnNldFJlc3VsdChbY29udGV4dC5sZWZ0LCAwLCAwXSkuZXhpdCgpO1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAodHlwZW9mIGNvbnRleHQubGVmdCA9PT0gJ2Z1bmN0aW9uJyB8fCB0eXBlb2YgY29udGV4dC5yaWdodCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHRocm93IG5ldyBFcnJvcignZnVuY3Rpb25zIGFyZSBub3Qgc3VwcG9ydGVkJyk7XG4gIH1cbiAgY29udGV4dC5sZWZ0VHlwZSA9IGNvbnRleHQubGVmdCA9PT0gbnVsbCA/ICdudWxsJyA6IHR5cGVvZiBjb250ZXh0LmxlZnQ7XG4gIGNvbnRleHQucmlnaHRUeXBlID0gY29udGV4dC5yaWdodCA9PT0gbnVsbCA/ICdudWxsJyA6IHR5cGVvZiBjb250ZXh0LnJpZ2h0O1xuICBpZiAoY29udGV4dC5sZWZ0VHlwZSAhPT0gY29udGV4dC5yaWdodFR5cGUpIHtcbiAgICBjb250ZXh0LnNldFJlc3VsdChbY29udGV4dC5sZWZ0LCBjb250ZXh0LnJpZ2h0XSkuZXhpdCgpO1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAoY29udGV4dC5sZWZ0VHlwZSA9PT0gJ2Jvb2xlYW4nIHx8IGNvbnRleHQubGVmdFR5cGUgPT09ICdudW1iZXInKSB7XG4gICAgY29udGV4dC5zZXRSZXN1bHQoW2NvbnRleHQubGVmdCwgY29udGV4dC5yaWdodF0pLmV4aXQoKTtcbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKGNvbnRleHQubGVmdFR5cGUgPT09ICdvYmplY3QnKSB7XG4gICAgY29udGV4dC5sZWZ0SXNBcnJheSA9IGlzQXJyYXkoY29udGV4dC5sZWZ0KTtcbiAgfVxuICBpZiAoY29udGV4dC5yaWdodFR5cGUgPT09ICdvYmplY3QnKSB7XG4gICAgY29udGV4dC5yaWdodElzQXJyYXkgPSBpc0FycmF5KGNvbnRleHQucmlnaHQpO1xuICB9XG4gIGlmIChjb250ZXh0LmxlZnRJc0FycmF5ICE9PSBjb250ZXh0LnJpZ2h0SXNBcnJheSkge1xuICAgIGNvbnRleHQuc2V0UmVzdWx0KFtjb250ZXh0LmxlZnQsIGNvbnRleHQucmlnaHRdKS5leGl0KCk7XG4gICAgcmV0dXJuO1xuICB9XG59O1xuZGlmZkZpbHRlci5maWx0ZXJOYW1lID0gJ3RyaXZpYWwnO1xuXG52YXIgcGF0Y2hGaWx0ZXIgPSBmdW5jdGlvbiB0cml2aWFsTWF0Y2hlc1BhdGNoRmlsdGVyKGNvbnRleHQpIHtcbiAgaWYgKHR5cGVvZiBjb250ZXh0LmRlbHRhID09PSAndW5kZWZpbmVkJykge1xuICAgIGNvbnRleHQuc2V0UmVzdWx0KGNvbnRleHQubGVmdCkuZXhpdCgpO1xuICAgIHJldHVybjtcbiAgfVxuICBjb250ZXh0Lm5lc3RlZCA9ICFpc0FycmF5KGNvbnRleHQuZGVsdGEpO1xuICBpZiAoY29udGV4dC5uZXN0ZWQpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKGNvbnRleHQuZGVsdGEubGVuZ3RoID09PSAxKSB7XG4gICAgY29udGV4dC5zZXRSZXN1bHQoY29udGV4dC5kZWx0YVswXSkuZXhpdCgpO1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAoY29udGV4dC5kZWx0YS5sZW5ndGggPT09IDIpIHtcbiAgICBjb250ZXh0LnNldFJlc3VsdChjb250ZXh0LmRlbHRhWzFdKS5leGl0KCk7XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmIChjb250ZXh0LmRlbHRhLmxlbmd0aCA9PT0gMyAmJiBjb250ZXh0LmRlbHRhWzJdID09PSAwKSB7XG4gICAgY29udGV4dC5zZXRSZXN1bHQodW5kZWZpbmVkKS5leGl0KCk7XG4gICAgcmV0dXJuO1xuICB9XG59O1xucGF0Y2hGaWx0ZXIuZmlsdGVyTmFtZSA9ICd0cml2aWFsJztcblxudmFyIHJldmVyc2VGaWx0ZXIgPSBmdW5jdGlvbiB0cml2aWFsUmVmZXJzZUZpbHRlcihjb250ZXh0KSB7XG4gIGlmICh0eXBlb2YgY29udGV4dC5kZWx0YSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBjb250ZXh0LnNldFJlc3VsdChjb250ZXh0LmRlbHRhKS5leGl0KCk7XG4gICAgcmV0dXJuO1xuICB9XG4gIGNvbnRleHQubmVzdGVkID0gIWlzQXJyYXkoY29udGV4dC5kZWx0YSk7XG4gIGlmIChjb250ZXh0Lm5lc3RlZCkge1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAoY29udGV4dC5kZWx0YS5sZW5ndGggPT09IDEpIHtcbiAgICBjb250ZXh0LnNldFJlc3VsdChbY29udGV4dC5kZWx0YVswXSwgMCwgMF0pLmV4aXQoKTtcbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKGNvbnRleHQuZGVsdGEubGVuZ3RoID09PSAyKSB7XG4gICAgY29udGV4dC5zZXRSZXN1bHQoW2NvbnRleHQuZGVsdGFbMV0sIGNvbnRleHQuZGVsdGFbMF1dKS5leGl0KCk7XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmIChjb250ZXh0LmRlbHRhLmxlbmd0aCA9PT0gMyAmJiBjb250ZXh0LmRlbHRhWzJdID09PSAwKSB7XG4gICAgY29udGV4dC5zZXRSZXN1bHQoW2NvbnRleHQuZGVsdGFbMF1dKS5leGl0KCk7XG4gICAgcmV0dXJuO1xuICB9XG59O1xucmV2ZXJzZUZpbHRlci5maWx0ZXJOYW1lID0gJ3RyaXZpYWwnO1xuXG5leHBvcnRzLmRpZmZGaWx0ZXIgPSBkaWZmRmlsdGVyO1xuZXhwb3J0cy5wYXRjaEZpbHRlciA9IHBhdGNoRmlsdGVyO1xuZXhwb3J0cy5yZXZlcnNlRmlsdGVyID0gcmV2ZXJzZUZpbHRlcjtcbiIsInZhciBQaXBlID0gZnVuY3Rpb24gUGlwZShuYW1lKSB7XG4gIHRoaXMubmFtZSA9IG5hbWU7XG4gIHRoaXMuZmlsdGVycyA9IFtdO1xufTtcblxuUGlwZS5wcm90b3R5cGUucHJvY2VzcyA9IGZ1bmN0aW9uKGlucHV0KSB7XG4gIGlmICghdGhpcy5wcm9jZXNzb3IpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2FkZCB0aGlzIHBpcGUgdG8gYSBwcm9jZXNzb3IgYmVmb3JlIHVzaW5nIGl0Jyk7XG4gIH1cbiAgdmFyIGRlYnVnID0gdGhpcy5kZWJ1ZztcbiAgdmFyIGxlbmd0aCA9IHRoaXMuZmlsdGVycy5sZW5ndGg7XG4gIHZhciBjb250ZXh0ID0gaW5wdXQ7XG4gIGZvciAodmFyIGluZGV4ID0gMDsgaW5kZXggPCBsZW5ndGg7IGluZGV4KyspIHtcbiAgICB2YXIgZmlsdGVyID0gdGhpcy5maWx0ZXJzW2luZGV4XTtcbiAgICBpZiAoZGVidWcpIHtcbiAgICAgIHRoaXMubG9nKCdmaWx0ZXI6ICcgKyBmaWx0ZXIuZmlsdGVyTmFtZSk7XG4gICAgfVxuICAgIGZpbHRlcihjb250ZXh0KTtcbiAgICBpZiAodHlwZW9mIGNvbnRleHQgPT09ICdvYmplY3QnICYmIGNvbnRleHQuZXhpdGluZykge1xuICAgICAgY29udGV4dC5leGl0aW5nID0gZmFsc2U7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cbiAgaWYgKCFjb250ZXh0Lm5leHQgJiYgdGhpcy5yZXN1bHRDaGVjaykge1xuICAgIHRoaXMucmVzdWx0Q2hlY2soY29udGV4dCk7XG4gIH1cbn07XG5cblBpcGUucHJvdG90eXBlLmxvZyA9IGZ1bmN0aW9uKG1zZykge1xuICBjb25zb2xlLmxvZygnW2pzb25kaWZmcGF0Y2hdICcgKyB0aGlzLm5hbWUgKyAnIHBpcGUsICcgKyBtc2cpO1xufTtcblxuUGlwZS5wcm90b3R5cGUuYXBwZW5kID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMuZmlsdGVycy5wdXNoLmFwcGx5KHRoaXMuZmlsdGVycywgYXJndW1lbnRzKTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5QaXBlLnByb3RvdHlwZS5wcmVwZW5kID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMuZmlsdGVycy51bnNoaWZ0LmFwcGx5KHRoaXMuZmlsdGVycywgYXJndW1lbnRzKTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5QaXBlLnByb3RvdHlwZS5pbmRleE9mID0gZnVuY3Rpb24oZmlsdGVyTmFtZSkge1xuICBpZiAoIWZpbHRlck5hbWUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2EgZmlsdGVyIG5hbWUgaXMgcmVxdWlyZWQnKTtcbiAgfVxuICBmb3IgKHZhciBpbmRleCA9IDA7IGluZGV4IDwgdGhpcy5maWx0ZXJzLmxlbmd0aDsgaW5kZXgrKykge1xuICAgIHZhciBmaWx0ZXIgPSB0aGlzLmZpbHRlcnNbaW5kZXhdO1xuICAgIGlmIChmaWx0ZXIuZmlsdGVyTmFtZSA9PT0gZmlsdGVyTmFtZSkge1xuICAgICAgcmV0dXJuIGluZGV4O1xuICAgIH1cbiAgfVxuICB0aHJvdyBuZXcgRXJyb3IoJ2ZpbHRlciBub3QgZm91bmQ6ICcgKyBmaWx0ZXJOYW1lKTtcbn07XG5cblBpcGUucHJvdG90eXBlLmxpc3QgPSBmdW5jdGlvbigpIHtcbiAgdmFyIG5hbWVzID0gW107XG4gIGZvciAodmFyIGluZGV4ID0gMDsgaW5kZXggPCB0aGlzLmZpbHRlcnMubGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgdmFyIGZpbHRlciA9IHRoaXMuZmlsdGVyc1tpbmRleF07XG4gICAgbmFtZXMucHVzaChmaWx0ZXIuZmlsdGVyTmFtZSk7XG4gIH1cbiAgcmV0dXJuIG5hbWVzO1xufTtcblxuUGlwZS5wcm90b3R5cGUuYWZ0ZXIgPSBmdW5jdGlvbihmaWx0ZXJOYW1lKSB7XG4gIHZhciBpbmRleCA9IHRoaXMuaW5kZXhPZihmaWx0ZXJOYW1lKTtcbiAgdmFyIHBhcmFtcyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSk7XG4gIGlmICghcGFyYW1zLmxlbmd0aCkge1xuICAgIHRocm93IG5ldyBFcnJvcignYSBmaWx0ZXIgaXMgcmVxdWlyZWQnKTtcbiAgfVxuICBwYXJhbXMudW5zaGlmdChpbmRleCArIDEsIDApO1xuICBBcnJheS5wcm90b3R5cGUuc3BsaWNlLmFwcGx5KHRoaXMuZmlsdGVycywgcGFyYW1zKTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5QaXBlLnByb3RvdHlwZS5iZWZvcmUgPSBmdW5jdGlvbihmaWx0ZXJOYW1lKSB7XG4gIHZhciBpbmRleCA9IHRoaXMuaW5kZXhPZihmaWx0ZXJOYW1lKTtcbiAgdmFyIHBhcmFtcyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSk7XG4gIGlmICghcGFyYW1zLmxlbmd0aCkge1xuICAgIHRocm93IG5ldyBFcnJvcignYSBmaWx0ZXIgaXMgcmVxdWlyZWQnKTtcbiAgfVxuICBwYXJhbXMudW5zaGlmdChpbmRleCwgMCk7XG4gIEFycmF5LnByb3RvdHlwZS5zcGxpY2UuYXBwbHkodGhpcy5maWx0ZXJzLCBwYXJhbXMpO1xuICByZXR1cm4gdGhpcztcbn07XG5cblBpcGUucHJvdG90eXBlLmNsZWFyID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMuZmlsdGVycy5sZW5ndGggPSAwO1xuICByZXR1cm4gdGhpcztcbn07XG5cblBpcGUucHJvdG90eXBlLnNob3VsZEhhdmVSZXN1bHQgPSBmdW5jdGlvbihzaG91bGQpIHtcbiAgaWYgKHNob3VsZCA9PT0gZmFsc2UpIHtcbiAgICB0aGlzLnJlc3VsdENoZWNrID0gbnVsbDtcbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKHRoaXMucmVzdWx0Q2hlY2spIHtcbiAgICByZXR1cm47XG4gIH1cbiAgdmFyIHBpcGUgPSB0aGlzO1xuICB0aGlzLnJlc3VsdENoZWNrID0gZnVuY3Rpb24oY29udGV4dCkge1xuICAgIGlmICghY29udGV4dC5oYXNSZXN1bHQpIHtcbiAgICAgIGNvbnNvbGUubG9nKGNvbnRleHQpO1xuICAgICAgdmFyIGVycm9yID0gbmV3IEVycm9yKHBpcGUubmFtZSArICcgZmFpbGVkJyk7XG4gICAgICBlcnJvci5ub1Jlc3VsdCA9IHRydWU7XG4gICAgICB0aHJvdyBlcnJvcjtcbiAgICB9XG4gIH07XG4gIHJldHVybiB0aGlzO1xufTtcblxuZXhwb3J0cy5QaXBlID0gUGlwZTtcbiIsIlxudmFyIFByb2Nlc3NvciA9IGZ1bmN0aW9uIFByb2Nlc3NvcihvcHRpb25zKXtcblx0dGhpcy5zZWxmT3B0aW9ucyA9IG9wdGlvbnM7XG5cdHRoaXMucGlwZXMgPSB7fTtcbn07XG5cblByb2Nlc3Nvci5wcm90b3R5cGUub3B0aW9ucyA9IGZ1bmN0aW9uKG9wdGlvbnMpIHtcblx0aWYgKG9wdGlvbnMpIHtcblx0XHR0aGlzLnNlbGZPcHRpb25zID0gb3B0aW9ucztcblx0fVxuXHRyZXR1cm4gdGhpcy5zZWxmT3B0aW9ucztcbn07XG5cblByb2Nlc3Nvci5wcm90b3R5cGUucGlwZSA9IGZ1bmN0aW9uKG5hbWUsIHBpcGUpIHtcblx0aWYgKHR5cGVvZiBuYW1lID09PSAnc3RyaW5nJykge1xuXHRcdGlmICh0eXBlb2YgcGlwZSA9PT0gJ3VuZGVmaW5lZCcpIHtcblx0XHRcdHJldHVybiB0aGlzLnBpcGVzW25hbWVdO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aGlzLnBpcGVzW25hbWVdID0gcGlwZTtcblx0XHR9XG5cdH1cblx0aWYgKG5hbWUgJiYgbmFtZS5uYW1lKSB7XG5cdFx0cGlwZSA9IG5hbWU7XG5cdFx0aWYgKHBpcGUucHJvY2Vzc29yID09PSB0aGlzKSB7IHJldHVybiBwaXBlOyB9XG5cdFx0dGhpcy5waXBlc1twaXBlLm5hbWVdID0gcGlwZTtcblx0fVxuXHRwaXBlLnByb2Nlc3NvciA9IHRoaXM7XG5cdHJldHVybiBwaXBlO1xufTtcblxuUHJvY2Vzc29yLnByb3RvdHlwZS5wcm9jZXNzID0gZnVuY3Rpb24oaW5wdXQsIHBpcGUpIHtcblx0dmFyIGNvbnRleHQgPSBpbnB1dDtcblx0Y29udGV4dC5vcHRpb25zID0gdGhpcy5vcHRpb25zKCk7XG5cdHZhciBuZXh0UGlwZSA9IHBpcGUgfHwgaW5wdXQucGlwZSB8fCAnZGVmYXVsdCc7XG5cdHZhciBsYXN0UGlwZSwgbGFzdENvbnRleHQ7XG5cdHdoaWxlIChuZXh0UGlwZSkge1xuXHRcdGlmICh0eXBlb2YgY29udGV4dC5uZXh0QWZ0ZXJDaGlsZHJlbiAhPT0gJ3VuZGVmaW5lZCcpIHtcblx0XHRcdC8vIGNoaWxkcmVuIHByb2Nlc3NlZCBhbmQgY29taW5nIGJhY2sgdG8gcGFyZW50XG5cdFx0XHRjb250ZXh0Lm5leHQgPSBjb250ZXh0Lm5leHRBZnRlckNoaWxkcmVuO1xuXHRcdFx0Y29udGV4dC5uZXh0QWZ0ZXJDaGlsZHJlbiA9IG51bGw7XG5cdFx0fVxuXG5cdFx0aWYgKHR5cGVvZiBuZXh0UGlwZSA9PT0gJ3N0cmluZycpIHtcblx0XHRcdG5leHRQaXBlID0gdGhpcy5waXBlKG5leHRQaXBlKTtcblx0XHR9XG5cdFx0bmV4dFBpcGUucHJvY2Vzcyhjb250ZXh0KTtcblx0XHRsYXN0Q29udGV4dCA9IGNvbnRleHQ7XG5cdFx0bGFzdFBpcGUgPSBuZXh0UGlwZTtcblx0XHRuZXh0UGlwZSA9IG51bGw7XG5cdFx0aWYgKGNvbnRleHQpIHtcblx0XHRcdGlmIChjb250ZXh0Lm5leHQpIHtcblx0XHRcdFx0Y29udGV4dCA9IGNvbnRleHQubmV4dDtcblx0XHRcdFx0bmV4dFBpcGUgPSBsYXN0Q29udGV4dC5uZXh0UGlwZSB8fCBjb250ZXh0LnBpcGUgfHwgbGFzdFBpcGU7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cdHJldHVybiBjb250ZXh0Lmhhc1Jlc3VsdCA/IGNvbnRleHQucmVzdWx0IDogdW5kZWZpbmVkO1xufTtcblxuZXhwb3J0cy5Qcm9jZXNzb3IgPSBQcm9jZXNzb3I7XG4iXX0=
