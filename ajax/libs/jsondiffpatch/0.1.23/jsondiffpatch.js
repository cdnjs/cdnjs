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
	exports.version = '0.1.22';
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
      var indexShift = 0;
      for (var index2 in delta) {
        var itemDelta2 = delta[index2];
        if (isArray(itemDelta2)) {
          if (itemDelta2[2] === ARRAY_MOVE) {
            if (itemDelta2[1].toString() === index) {
              indexShift = 0;
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
      if (indexShift !== 0) {
        newIndex += indexShift;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9zb3VyY2UtZmlsZXMvanNvbmRpZmZwYXRjaC9ub2RlX21vZHVsZXMvZmliZXJnbGFzcy9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiL3NvdXJjZS1maWxlcy9qc29uZGlmZnBhdGNoL3NyYy9tYWluLmpzIiwiL3NvdXJjZS1maWxlcy9qc29uZGlmZnBhdGNoL25vZGVfbW9kdWxlcy9maWJlcmdsYXNzL25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9wcm9jZXNzL2Jyb3dzZXIuanMiLCIvc291cmNlLWZpbGVzL2pzb25kaWZmcGF0Y2gvc3JjL2NvbnRleHRzL2NvbnRleHQuanMiLCIvc291cmNlLWZpbGVzL2pzb25kaWZmcGF0Y2gvc3JjL2NvbnRleHRzL2RpZmYuanMiLCIvc291cmNlLWZpbGVzL2pzb25kaWZmcGF0Y2gvc3JjL2NvbnRleHRzL3BhdGNoLmpzIiwiL3NvdXJjZS1maWxlcy9qc29uZGlmZnBhdGNoL3NyYy9jb250ZXh0cy9yZXZlcnNlLmpzIiwiL3NvdXJjZS1maWxlcy9qc29uZGlmZnBhdGNoL3NyYy9kYXRlLXJldml2ZXIuanMiLCIvc291cmNlLWZpbGVzL2pzb25kaWZmcGF0Y2gvc3JjL2RpZmZwYXRjaGVyLmpzIiwiL3NvdXJjZS1maWxlcy9qc29uZGlmZnBhdGNoL3NyYy9maWx0ZXJzL2FycmF5cy5qcyIsIi9zb3VyY2UtZmlsZXMvanNvbmRpZmZwYXRjaC9zcmMvZmlsdGVycy9kYXRlcy5qcyIsIi9zb3VyY2UtZmlsZXMvanNvbmRpZmZwYXRjaC9zcmMvZmlsdGVycy9sY3MuanMiLCIvc291cmNlLWZpbGVzL2pzb25kaWZmcGF0Y2gvc3JjL2ZpbHRlcnMvbmVzdGVkLmpzIiwiL3NvdXJjZS1maWxlcy9qc29uZGlmZnBhdGNoL3NyYy9maWx0ZXJzL3RleHRzLmpzIiwiL3NvdXJjZS1maWxlcy9qc29uZGlmZnBhdGNoL3NyYy9maWx0ZXJzL3RyaXZpYWwuanMiLCIvc291cmNlLWZpbGVzL2pzb25kaWZmcGF0Y2gvc3JjL3BpcGUuanMiLCIvc291cmNlLWZpbGVzL2pzb25kaWZmcGF0Y2gvc3JjL3Byb2Nlc3Nvci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5WkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9IQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIihmdW5jdGlvbiAocHJvY2Vzcyl7XG5cbnZhciBEaWZmUGF0Y2hlciA9IHJlcXVpcmUoJy4vZGlmZnBhdGNoZXInKS5EaWZmUGF0Y2hlcjtcbmV4cG9ydHMuRGlmZlBhdGNoZXIgPSBEaWZmUGF0Y2hlcjtcblxuZXhwb3J0cy5jcmVhdGUgPSBmdW5jdGlvbihvcHRpb25zKXtcblx0cmV0dXJuIG5ldyBEaWZmUGF0Y2hlcihvcHRpb25zKTtcbn07XG5cbmV4cG9ydHMuZGF0ZVJldml2ZXIgPSByZXF1aXJlKCcuL2RhdGUtcmV2aXZlcicpO1xuXG52YXIgZGVmYXVsdEluc3RhbmNlO1xuXG5leHBvcnRzLmRpZmYgPSBmdW5jdGlvbigpIHtcblx0aWYgKCFkZWZhdWx0SW5zdGFuY2UpIHtcblx0XHRkZWZhdWx0SW5zdGFuY2UgPSBuZXcgRGlmZlBhdGNoZXIoKTtcblx0fVxuXHRyZXR1cm4gZGVmYXVsdEluc3RhbmNlLmRpZmYuYXBwbHkoZGVmYXVsdEluc3RhbmNlLCBhcmd1bWVudHMpO1xufTtcblxuZXhwb3J0cy5wYXRjaCA9IGZ1bmN0aW9uKCkge1xuXHRpZiAoIWRlZmF1bHRJbnN0YW5jZSkge1xuXHRcdGRlZmF1bHRJbnN0YW5jZSA9IG5ldyBEaWZmUGF0Y2hlcigpO1xuXHR9XG5cdHJldHVybiBkZWZhdWx0SW5zdGFuY2UucGF0Y2guYXBwbHkoZGVmYXVsdEluc3RhbmNlLCBhcmd1bWVudHMpO1xufTtcblxuZXhwb3J0cy51bnBhdGNoID0gZnVuY3Rpb24oKSB7XG5cdGlmICghZGVmYXVsdEluc3RhbmNlKSB7XG5cdFx0ZGVmYXVsdEluc3RhbmNlID0gbmV3IERpZmZQYXRjaGVyKCk7XG5cdH1cblx0cmV0dXJuIGRlZmF1bHRJbnN0YW5jZS51bnBhdGNoLmFwcGx5KGRlZmF1bHRJbnN0YW5jZSwgYXJndW1lbnRzKTtcbn07XG5cbmV4cG9ydHMucmV2ZXJzZSA9IGZ1bmN0aW9uKCkge1xuXHRpZiAoIWRlZmF1bHRJbnN0YW5jZSkge1xuXHRcdGRlZmF1bHRJbnN0YW5jZSA9IG5ldyBEaWZmUGF0Y2hlcigpO1xuXHR9XG5cdHJldHVybiBkZWZhdWx0SW5zdGFuY2UucmV2ZXJzZS5hcHBseShkZWZhdWx0SW5zdGFuY2UsIGFyZ3VtZW50cyk7XG59O1xuXG5pZiAocHJvY2Vzcy5icm93c2VyKSB7XG5cdGV4cG9ydHMuaG9tZXBhZ2UgPSAne3twYWNrYWdlLWhvbWVwYWdlfX0nO1xuXHRleHBvcnRzLnZlcnNpb24gPSAne3twYWNrYWdlLXZlcnNpb259fSc7XG59IGVsc2Uge1xuXHR2YXIgcGFja2FnZUluZm9Nb2R1bGVOYW1lID0gJy4uL3BhY2thZ2UuanNvbic7XG5cdHZhciBwYWNrYWdlSW5mbyA9IHJlcXVpcmUocGFja2FnZUluZm9Nb2R1bGVOYW1lKTtcblx0ZXhwb3J0cy5ob21lcGFnZSA9IHBhY2thZ2VJbmZvLmhvbWVwYWdlO1xuXHRleHBvcnRzLnZlcnNpb24gPSBwYWNrYWdlSW5mby52ZXJzaW9uO1xuXG5cdHZhciBmb3JtYXR0ZXJNb2R1bGVOYW1lID0gJy4vZm9ybWF0dGVycyc7XG5cdHZhciBmb3JtYXR0ZXJzID0gcmVxdWlyZShmb3JtYXR0ZXJNb2R1bGVOYW1lKTtcblx0ZXhwb3J0cy5mb3JtYXR0ZXJzID0gZm9ybWF0dGVycztcblx0Ly8gc2hvcnRjdXQgZm9yIGNvbnNvbGVcblx0ZXhwb3J0cy5jb25zb2xlID0gZm9ybWF0dGVycy5jb25zb2xlO1xufVxuXG59KS5jYWxsKHRoaXMscmVxdWlyZSgnX3Byb2Nlc3MnKSkiLCIvLyBzaGltIGZvciB1c2luZyBwcm9jZXNzIGluIGJyb3dzZXJcblxudmFyIHByb2Nlc3MgPSBtb2R1bGUuZXhwb3J0cyA9IHt9O1xuXG5wcm9jZXNzLm5leHRUaWNrID0gKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgY2FuU2V0SW1tZWRpYXRlID0gdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCdcbiAgICAmJiB3aW5kb3cuc2V0SW1tZWRpYXRlO1xuICAgIHZhciBjYW5Qb3N0ID0gdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCdcbiAgICAmJiB3aW5kb3cucG9zdE1lc3NhZ2UgJiYgd2luZG93LmFkZEV2ZW50TGlzdGVuZXJcbiAgICA7XG5cbiAgICBpZiAoY2FuU2V0SW1tZWRpYXRlKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoZikgeyByZXR1cm4gd2luZG93LnNldEltbWVkaWF0ZShmKSB9O1xuICAgIH1cblxuICAgIGlmIChjYW5Qb3N0KSB7XG4gICAgICAgIHZhciBxdWV1ZSA9IFtdO1xuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbWVzc2FnZScsIGZ1bmN0aW9uIChldikge1xuICAgICAgICAgICAgdmFyIHNvdXJjZSA9IGV2LnNvdXJjZTtcbiAgICAgICAgICAgIGlmICgoc291cmNlID09PSB3aW5kb3cgfHwgc291cmNlID09PSBudWxsKSAmJiBldi5kYXRhID09PSAncHJvY2Vzcy10aWNrJykge1xuICAgICAgICAgICAgICAgIGV2LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgICAgIGlmIChxdWV1ZS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBmbiA9IHF1ZXVlLnNoaWZ0KCk7XG4gICAgICAgICAgICAgICAgICAgIGZuKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LCB0cnVlKTtcblxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gbmV4dFRpY2soZm4pIHtcbiAgICAgICAgICAgIHF1ZXVlLnB1c2goZm4pO1xuICAgICAgICAgICAgd2luZG93LnBvc3RNZXNzYWdlKCdwcm9jZXNzLXRpY2snLCAnKicpO1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIHJldHVybiBmdW5jdGlvbiBuZXh0VGljayhmbikge1xuICAgICAgICBzZXRUaW1lb3V0KGZuLCAwKTtcbiAgICB9O1xufSkoKTtcblxucHJvY2Vzcy50aXRsZSA9ICdicm93c2VyJztcbnByb2Nlc3MuYnJvd3NlciA9IHRydWU7XG5wcm9jZXNzLmVudiA9IHt9O1xucHJvY2Vzcy5hcmd2ID0gW107XG5cbmZ1bmN0aW9uIG5vb3AoKSB7fVxuXG5wcm9jZXNzLm9uID0gbm9vcDtcbnByb2Nlc3MuYWRkTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5vbmNlID0gbm9vcDtcbnByb2Nlc3Mub2ZmID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVBbGxMaXN0ZW5lcnMgPSBub29wO1xucHJvY2Vzcy5lbWl0ID0gbm9vcDtcblxucHJvY2Vzcy5iaW5kaW5nID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuYmluZGluZyBpcyBub3Qgc3VwcG9ydGVkJyk7XG59XG5cbi8vIFRPRE8oc2h0eWxtYW4pXG5wcm9jZXNzLmN3ZCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuICcvJyB9O1xucHJvY2Vzcy5jaGRpciA9IGZ1bmN0aW9uIChkaXIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuY2hkaXIgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcbiIsIlxudmFyIFBpcGUgPSByZXF1aXJlKCcuLi9waXBlJykuUGlwZTtcblxudmFyIENvbnRleHQgPSBmdW5jdGlvbiBDb250ZXh0KCl7XG59O1xuXG5Db250ZXh0LnByb3RvdHlwZS5zZXRSZXN1bHQgPSBmdW5jdGlvbihyZXN1bHQpIHtcblx0dGhpcy5yZXN1bHQgPSByZXN1bHQ7XG5cdHRoaXMuaGFzUmVzdWx0ID0gdHJ1ZTtcblx0cmV0dXJuIHRoaXM7XG59O1xuXG5Db250ZXh0LnByb3RvdHlwZS5leGl0ID0gZnVuY3Rpb24oKSB7XG5cdHRoaXMuZXhpdGluZyA9IHRydWU7XG5cdHJldHVybiB0aGlzO1xufTtcblxuQ29udGV4dC5wcm90b3R5cGUuc3dpdGNoVG8gPSBmdW5jdGlvbihuZXh0LCBwaXBlKSB7XG5cdGlmICh0eXBlb2YgbmV4dCA9PT0gJ3N0cmluZycgfHwgbmV4dCBpbnN0YW5jZW9mIFBpcGUpIHtcblx0XHR0aGlzLm5leHRQaXBlID0gbmV4dDtcblx0fSBlbHNlIHtcblx0XHR0aGlzLm5leHQgPSBuZXh0O1xuXHRcdGlmIChwaXBlKSB7XG5cdFx0XHR0aGlzLm5leHRQaXBlID0gcGlwZTtcblx0XHR9XG5cdH1cblx0cmV0dXJuIHRoaXM7XG59O1xuXG5Db250ZXh0LnByb3RvdHlwZS5wdXNoID0gZnVuY3Rpb24oY2hpbGQsIG5hbWUpIHtcblx0Y2hpbGQucGFyZW50ID0gdGhpcztcblx0aWYgKHR5cGVvZiBuYW1lICE9PSAndW5kZWZpbmVkJykge1xuXHRcdGNoaWxkLmNoaWxkTmFtZSA9IG5hbWU7XG5cdH1cblx0Y2hpbGQucm9vdCA9IHRoaXMucm9vdCB8fCB0aGlzO1xuXHRjaGlsZC5vcHRpb25zID0gY2hpbGQub3B0aW9ucyB8fCB0aGlzLm9wdGlvbnM7XG5cdGlmICghdGhpcy5jaGlsZHJlbikge1xuXHRcdHRoaXMuY2hpbGRyZW4gPSBbY2hpbGRdO1xuXHRcdHRoaXMubmV4dEFmdGVyQ2hpbGRyZW4gPSB0aGlzLm5leHQgfHwgbnVsbDtcblx0XHR0aGlzLm5leHQgPSBjaGlsZDtcblx0fSBlbHNlIHtcblx0XHR0aGlzLmNoaWxkcmVuW3RoaXMuY2hpbGRyZW4ubGVuZ3RoIC0gMV0ubmV4dCA9IGNoaWxkO1xuXHRcdHRoaXMuY2hpbGRyZW4ucHVzaChjaGlsZCk7XG5cdH1cblx0Y2hpbGQubmV4dCA9IHRoaXM7XG5cdHJldHVybiB0aGlzO1xufTtcblxuZXhwb3J0cy5Db250ZXh0ID0gQ29udGV4dDtcbiIsInZhciBDb250ZXh0ID0gcmVxdWlyZSgnLi9jb250ZXh0JykuQ29udGV4dDtcblxudmFyIERpZmZDb250ZXh0ID0gZnVuY3Rpb24gRGlmZkNvbnRleHQobGVmdCwgcmlnaHQpIHtcbiAgdGhpcy5sZWZ0ID0gbGVmdDtcbiAgdGhpcy5yaWdodCA9IHJpZ2h0O1xuICB0aGlzLnBpcGUgPSAnZGlmZic7XG59O1xuXG5EaWZmQ29udGV4dC5wcm90b3R5cGUgPSBuZXcgQ29udGV4dCgpO1xuXG5leHBvcnRzLkRpZmZDb250ZXh0ID0gRGlmZkNvbnRleHQ7XG4iLCJ2YXIgQ29udGV4dCA9IHJlcXVpcmUoJy4vY29udGV4dCcpLkNvbnRleHQ7XG5cbnZhciBQYXRjaENvbnRleHQgPSBmdW5jdGlvbiBQYXRjaENvbnRleHQobGVmdCwgZGVsdGEpIHtcbiAgdGhpcy5sZWZ0ID0gbGVmdDtcbiAgdGhpcy5kZWx0YSA9IGRlbHRhO1xuICB0aGlzLnBpcGUgPSAncGF0Y2gnO1xufTtcblxuUGF0Y2hDb250ZXh0LnByb3RvdHlwZSA9IG5ldyBDb250ZXh0KCk7XG5cbmV4cG9ydHMuUGF0Y2hDb250ZXh0ID0gUGF0Y2hDb250ZXh0O1xuIiwidmFyIENvbnRleHQgPSByZXF1aXJlKCcuL2NvbnRleHQnKS5Db250ZXh0O1xuXG52YXIgUmV2ZXJzZUNvbnRleHQgPSBmdW5jdGlvbiBSZXZlcnNlQ29udGV4dChkZWx0YSkge1xuICB0aGlzLmRlbHRhID0gZGVsdGE7XG4gIHRoaXMucGlwZSA9ICdyZXZlcnNlJztcbn07XG5cblJldmVyc2VDb250ZXh0LnByb3RvdHlwZSA9IG5ldyBDb250ZXh0KCk7XG5cbmV4cG9ydHMuUmV2ZXJzZUNvbnRleHQgPSBSZXZlcnNlQ29udGV4dDtcbiIsIi8vIHVzZSBhcyAybmQgcGFyYW1ldGVyIGZvciBKU09OLnBhcnNlIHRvIHJldml2ZSBEYXRlIGluc3RhbmNlc1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBkYXRlUmV2aXZlcihrZXksIHZhbHVlKSB7XG4gIHZhciBwYXJ0cztcbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpIHtcbiAgICBwYXJ0cyA9IC9eKFxcZHs0fSktKFxcZHsyfSktKFxcZHsyfSlUKFxcZHsyfSk6KFxcZHsyfSk6KFxcZHsyfSkoPzpcXC4oXFxkKikpPyhafChbK1xcLV0pKFxcZHsyfSk6KFxcZHsyfSkpJC8uZXhlYyh2YWx1ZSk7XG4gICAgaWYgKHBhcnRzKSB7XG4gICAgICByZXR1cm4gbmV3IERhdGUoRGF0ZS5VVEMoK3BhcnRzWzFdLCArcGFydHNbMl0gLSAxLCArcGFydHNbM10sICtwYXJ0c1s0XSwgK3BhcnRzWzVdLCArcGFydHNbNl0sICsocGFydHNbN10gfHwgMCkpKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHZhbHVlO1xufTtcbiIsInZhciBQcm9jZXNzb3IgPSByZXF1aXJlKCcuL3Byb2Nlc3NvcicpLlByb2Nlc3NvcjtcbnZhciBQaXBlID0gcmVxdWlyZSgnLi9waXBlJykuUGlwZTtcbnZhciBEaWZmQ29udGV4dCA9IHJlcXVpcmUoJy4vY29udGV4dHMvZGlmZicpLkRpZmZDb250ZXh0O1xudmFyIFBhdGNoQ29udGV4dCA9IHJlcXVpcmUoJy4vY29udGV4dHMvcGF0Y2gnKS5QYXRjaENvbnRleHQ7XG52YXIgUmV2ZXJzZUNvbnRleHQgPSByZXF1aXJlKCcuL2NvbnRleHRzL3JldmVyc2UnKS5SZXZlcnNlQ29udGV4dDtcblxudmFyIHRyaXZpYWwgPSByZXF1aXJlKCcuL2ZpbHRlcnMvdHJpdmlhbCcpO1xudmFyIG5lc3RlZCA9IHJlcXVpcmUoJy4vZmlsdGVycy9uZXN0ZWQnKTtcbnZhciBhcnJheXMgPSByZXF1aXJlKCcuL2ZpbHRlcnMvYXJyYXlzJyk7XG52YXIgZGF0ZXMgPSByZXF1aXJlKCcuL2ZpbHRlcnMvZGF0ZXMnKTtcbnZhciB0ZXh0cyA9IHJlcXVpcmUoJy4vZmlsdGVycy90ZXh0cycpO1xuXG52YXIgRGlmZlBhdGNoZXIgPSBmdW5jdGlvbiBEaWZmUGF0Y2hlcihvcHRpb25zKSB7XG4gIHRoaXMucHJvY2Vzc29yID0gbmV3IFByb2Nlc3NvcihvcHRpb25zKTtcbiAgdGhpcy5wcm9jZXNzb3IucGlwZShuZXcgUGlwZSgnZGlmZicpLmFwcGVuZChcbiAgICBuZXN0ZWQuY29sbGVjdENoaWxkcmVuRGlmZkZpbHRlcixcbiAgICB0cml2aWFsLmRpZmZGaWx0ZXIsXG4gICAgZGF0ZXMuZGlmZkZpbHRlcixcbiAgICB0ZXh0cy5kaWZmRmlsdGVyLFxuICAgIG5lc3RlZC5vYmplY3RzRGlmZkZpbHRlcixcbiAgICBhcnJheXMuZGlmZkZpbHRlclxuICApLnNob3VsZEhhdmVSZXN1bHQoKSk7XG4gIHRoaXMucHJvY2Vzc29yLnBpcGUobmV3IFBpcGUoJ3BhdGNoJykuYXBwZW5kKFxuICAgIG5lc3RlZC5jb2xsZWN0Q2hpbGRyZW5QYXRjaEZpbHRlcixcbiAgICBhcnJheXMuY29sbGVjdENoaWxkcmVuUGF0Y2hGaWx0ZXIsXG4gICAgdHJpdmlhbC5wYXRjaEZpbHRlcixcbiAgICB0ZXh0cy5wYXRjaEZpbHRlcixcbiAgICBuZXN0ZWQucGF0Y2hGaWx0ZXIsXG4gICAgYXJyYXlzLnBhdGNoRmlsdGVyXG4gICkuc2hvdWxkSGF2ZVJlc3VsdCgpKTtcbiAgdGhpcy5wcm9jZXNzb3IucGlwZShuZXcgUGlwZSgncmV2ZXJzZScpLmFwcGVuZChcbiAgICBuZXN0ZWQuY29sbGVjdENoaWxkcmVuUmV2ZXJzZUZpbHRlcixcbiAgICBhcnJheXMuY29sbGVjdENoaWxkcmVuUmV2ZXJzZUZpbHRlcixcbiAgICB0cml2aWFsLnJldmVyc2VGaWx0ZXIsXG4gICAgdGV4dHMucmV2ZXJzZUZpbHRlcixcbiAgICBuZXN0ZWQucmV2ZXJzZUZpbHRlcixcbiAgICBhcnJheXMucmV2ZXJzZUZpbHRlclxuICApLnNob3VsZEhhdmVSZXN1bHQoKSk7XG59O1xuXG5EaWZmUGF0Y2hlci5wcm90b3R5cGUub3B0aW9ucyA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy5wcm9jZXNzb3Iub3B0aW9ucy5hcHBseSh0aGlzLnByb2Nlc3NvciwgYXJndW1lbnRzKTtcbn07XG5cbkRpZmZQYXRjaGVyLnByb3RvdHlwZS5kaWZmID0gZnVuY3Rpb24obGVmdCwgcmlnaHQpIHtcbiAgcmV0dXJuIHRoaXMucHJvY2Vzc29yLnByb2Nlc3MobmV3IERpZmZDb250ZXh0KGxlZnQsIHJpZ2h0KSk7XG59O1xuXG5EaWZmUGF0Y2hlci5wcm90b3R5cGUucGF0Y2ggPSBmdW5jdGlvbihsZWZ0LCBkZWx0YSkge1xuICByZXR1cm4gdGhpcy5wcm9jZXNzb3IucHJvY2VzcyhuZXcgUGF0Y2hDb250ZXh0KGxlZnQsIGRlbHRhKSk7XG59O1xuXG5EaWZmUGF0Y2hlci5wcm90b3R5cGUucmV2ZXJzZSA9IGZ1bmN0aW9uKGRlbHRhKSB7XG4gIHJldHVybiB0aGlzLnByb2Nlc3Nvci5wcm9jZXNzKG5ldyBSZXZlcnNlQ29udGV4dChkZWx0YSkpO1xufTtcblxuRGlmZlBhdGNoZXIucHJvdG90eXBlLnVucGF0Y2ggPSBmdW5jdGlvbihyaWdodCwgZGVsdGEpIHtcbiAgcmV0dXJuIHRoaXMucGF0Y2gocmlnaHQsIHRoaXMucmV2ZXJzZShkZWx0YSkpO1xufTtcblxuZXhwb3J0cy5EaWZmUGF0Y2hlciA9IERpZmZQYXRjaGVyO1xuIiwidmFyIERpZmZDb250ZXh0ID0gcmVxdWlyZSgnLi4vY29udGV4dHMvZGlmZicpLkRpZmZDb250ZXh0O1xudmFyIFBhdGNoQ29udGV4dCA9IHJlcXVpcmUoJy4uL2NvbnRleHRzL3BhdGNoJykuUGF0Y2hDb250ZXh0O1xudmFyIFJldmVyc2VDb250ZXh0ID0gcmVxdWlyZSgnLi4vY29udGV4dHMvcmV2ZXJzZScpLlJldmVyc2VDb250ZXh0O1xuXG52YXIgbGNzID0gcmVxdWlyZSgnLi9sY3MnKTtcblxudmFyIEFSUkFZX01PVkUgPSAzO1xuXG52YXIgaXNBcnJheSA9ICh0eXBlb2YgQXJyYXkuaXNBcnJheSA9PT0gJ2Z1bmN0aW9uJykgP1xuICAvLyB1c2UgbmF0aXZlIGZ1bmN0aW9uXG4gIEFycmF5LmlzQXJyYXkgOlxuICAvLyB1c2UgaW5zdGFuY2VvZiBvcGVyYXRvclxuICBmdW5jdGlvbihhKSB7XG4gICAgcmV0dXJuIGEgaW5zdGFuY2VvZiBBcnJheTtcbiAgfTtcblxudmFyIGFycmF5SW5kZXhPZiA9IHR5cGVvZiBBcnJheS5wcm90b3R5cGUuaW5kZXhPZiA9PT0gJ2Z1bmN0aW9uJyA/XG4gIGZ1bmN0aW9uKGFycmF5LCBpdGVtKSB7XG4gICAgcmV0dXJuIGFycmF5LmluZGV4T2YoaXRlbSk7XG4gIH0gOiBmdW5jdGlvbihhcnJheSwgaXRlbSkge1xuICAgIHZhciBsZW5ndGggPSBhcnJheS5sZW5ndGg7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgaWYgKGFycmF5W2ldID09PSBpdGVtKSB7XG4gICAgICAgIHJldHVybiBpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gLTE7XG4gIH07XG5cbnZhciBkaWZmRmlsdGVyID0gZnVuY3Rpb24gYXJyYXlzRGlmZkZpbHRlcihjb250ZXh0KSB7XG4gIGlmICghY29udGV4dC5sZWZ0SXNBcnJheSkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIHZhciBvYmplY3RIYXNoID0gY29udGV4dC5vcHRpb25zICYmIGNvbnRleHQub3B0aW9ucy5vYmplY3RIYXNoO1xuXG4gIHZhciBtYXRjaCA9IGZ1bmN0aW9uKGFycmF5MSwgYXJyYXkyLCBpbmRleDEsIGluZGV4MiwgY29udGV4dCkge1xuICAgIHZhciB2YWx1ZTEgPSBhcnJheTFbaW5kZXgxXTtcbiAgICB2YXIgdmFsdWUyID0gYXJyYXkyW2luZGV4Ml07XG4gICAgaWYgKHZhbHVlMSA9PT0gdmFsdWUyKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiB2YWx1ZTEgIT09ICdvYmplY3QnIHx8IHR5cGVvZiB2YWx1ZTIgIT09ICdvYmplY3QnKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGlmICghb2JqZWN0SGFzaCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICB2YXIgaGFzaDEsIGhhc2gyO1xuICAgIGlmICh0eXBlb2YgaW5kZXgxID09PSAnbnVtYmVyJykge1xuICAgICAgY29udGV4dC5oYXNoQ2FjaGUxID0gY29udGV4dC5oYXNoQ2FjaGUxIHx8IFtdO1xuICAgICAgaGFzaDEgPSBjb250ZXh0Lmhhc2hDYWNoZTFbaW5kZXgxXTtcbiAgICAgIGlmICh0eXBlb2YgaGFzaDEgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIGNvbnRleHQuaGFzaENhY2hlMVtpbmRleDFdID0gaGFzaDEgPSBvYmplY3RIYXNoKHZhbHVlMSwgaW5kZXgxKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgaGFzaDEgPSBvYmplY3RIYXNoKHZhbHVlMSk7XG4gICAgfVxuICAgIGlmICh0eXBlb2YgaGFzaDEgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGlmICh0eXBlb2YgaW5kZXgyID09PSAnbnVtYmVyJykge1xuICAgICAgY29udGV4dC5oYXNoQ2FjaGUyID0gY29udGV4dC5oYXNoQ2FjaGUyIHx8IFtdO1xuICAgICAgaGFzaDIgPSBjb250ZXh0Lmhhc2hDYWNoZTJbaW5kZXgyXTtcbiAgICAgIGlmICh0eXBlb2YgaGFzaDIgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIGNvbnRleHQuaGFzaENhY2hlMltpbmRleDJdID0gaGFzaDIgPSBvYmplY3RIYXNoKHZhbHVlMiwgaW5kZXgyKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgaGFzaDIgPSBvYmplY3RIYXNoKHZhbHVlMik7XG4gICAgfVxuICAgIGlmICh0eXBlb2YgaGFzaDIgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiBoYXNoMSA9PT0gaGFzaDI7XG4gIH07XG5cbiAgdmFyIG1hdGNoQ29udGV4dCA9IHt9O1xuICB2YXIgY29tbW9uSGVhZCA9IDAsXG4gICAgY29tbW9uVGFpbCA9IDAsXG4gICAgaW5kZXgsIGluZGV4MSwgaW5kZXgyO1xuICB2YXIgYXJyYXkxID0gY29udGV4dC5sZWZ0O1xuICB2YXIgYXJyYXkyID0gY29udGV4dC5yaWdodDtcbiAgdmFyIGxlbjEgPSBhcnJheTEubGVuZ3RoO1xuICB2YXIgbGVuMiA9IGFycmF5Mi5sZW5ndGg7XG5cbiAgdmFyIGNoaWxkO1xuXG4gIC8vIHNlcGFyYXRlIGNvbW1vbiBoZWFkXG4gIHdoaWxlIChjb21tb25IZWFkIDwgbGVuMSAmJiBjb21tb25IZWFkIDwgbGVuMiAmJlxuICAgIG1hdGNoKGFycmF5MSwgYXJyYXkyLCBjb21tb25IZWFkLCBjb21tb25IZWFkLCBtYXRjaENvbnRleHQpKSB7XG4gICAgaW5kZXggPSBjb21tb25IZWFkO1xuICAgIGNoaWxkID0gbmV3IERpZmZDb250ZXh0KGNvbnRleHQubGVmdFtpbmRleF0sIGNvbnRleHQucmlnaHRbaW5kZXhdKTtcbiAgICBjb250ZXh0LnB1c2goY2hpbGQsIGluZGV4KTtcbiAgICBjb21tb25IZWFkKys7XG4gIH1cbiAgLy8gc2VwYXJhdGUgY29tbW9uIHRhaWxcbiAgd2hpbGUgKGNvbW1vblRhaWwgKyBjb21tb25IZWFkIDwgbGVuMSAmJiBjb21tb25UYWlsICsgY29tbW9uSGVhZCA8IGxlbjIgJiZcbiAgICBtYXRjaChhcnJheTEsIGFycmF5MiwgbGVuMSAtIDEgLSBjb21tb25UYWlsLCBsZW4yIC0gMSAtIGNvbW1vblRhaWwsIG1hdGNoQ29udGV4dCkpIHtcbiAgICBpbmRleDEgPSBsZW4xIC0gMSAtIGNvbW1vblRhaWw7XG4gICAgaW5kZXgyID0gbGVuMiAtIDEgLSBjb21tb25UYWlsO1xuICAgIGNoaWxkID0gbmV3IERpZmZDb250ZXh0KGNvbnRleHQubGVmdFtpbmRleDFdLCBjb250ZXh0LnJpZ2h0W2luZGV4Ml0pO1xuICAgIGNvbnRleHQucHVzaChjaGlsZCwgaW5kZXgyKTtcbiAgICBjb21tb25UYWlsKys7XG4gIH1cbiAgdmFyIHJlc3VsdDtcbiAgaWYgKGNvbW1vbkhlYWQgKyBjb21tb25UYWlsID09PSBsZW4xKSB7XG4gICAgaWYgKGxlbjEgPT09IGxlbjIpIHtcbiAgICAgIC8vIGFycmF5cyBhcmUgaWRlbnRpY2FsXG4gICAgICBjb250ZXh0LnNldFJlc3VsdCh1bmRlZmluZWQpLmV4aXQoKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgLy8gdHJpdmlhbCBjYXNlLCBhIGJsb2NrICgxIG9yIG1vcmUgY29uc2VjdXRpdmUgaXRlbXMpIHdhcyBhZGRlZFxuICAgIHJlc3VsdCA9IHJlc3VsdCB8fCB7XG4gICAgICBfdDogJ2EnXG4gICAgfTtcbiAgICBmb3IgKGluZGV4ID0gY29tbW9uSGVhZDsgaW5kZXggPCBsZW4yIC0gY29tbW9uVGFpbDsgaW5kZXgrKykge1xuICAgICAgcmVzdWx0W2luZGV4XSA9IFthcnJheTJbaW5kZXhdXTtcbiAgICB9XG4gICAgY29udGV4dC5zZXRSZXN1bHQocmVzdWx0KS5leGl0KCk7XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmIChjb21tb25IZWFkICsgY29tbW9uVGFpbCA9PT0gbGVuMikge1xuICAgIC8vIHRyaXZpYWwgY2FzZSwgYSBibG9jayAoMSBvciBtb3JlIGNvbnNlY3V0aXZlIGl0ZW1zKSB3YXMgcmVtb3ZlZFxuICAgIHJlc3VsdCA9IHJlc3VsdCB8fCB7XG4gICAgICBfdDogJ2EnXG4gICAgfTtcbiAgICBmb3IgKGluZGV4ID0gY29tbW9uSGVhZDsgaW5kZXggPCBsZW4xIC0gY29tbW9uVGFpbDsgaW5kZXgrKykge1xuICAgICAgcmVzdWx0WydfJyArIGluZGV4XSA9IFthcnJheTFbaW5kZXhdLCAwLCAwXTtcbiAgICB9XG4gICAgY29udGV4dC5zZXRSZXN1bHQocmVzdWx0KS5leGl0KCk7XG4gICAgcmV0dXJuO1xuICB9XG4gIC8vIHJlc2V0IGhhc2ggY2FjaGVcbiAgbWF0Y2hDb250ZXh0ID0ge307XG4gIC8vIGRpZmYgaXMgbm90IHRyaXZpYWwsIGZpbmQgdGhlIExDUyAoTG9uZ2VzdCBDb21tb24gU3Vic2VxdWVuY2UpXG4gIHZhciB0cmltbWVkMSA9IGFycmF5MS5zbGljZShjb21tb25IZWFkLCBsZW4xIC0gY29tbW9uVGFpbCk7XG4gIHZhciB0cmltbWVkMiA9IGFycmF5Mi5zbGljZShjb21tb25IZWFkLCBsZW4yIC0gY29tbW9uVGFpbCk7XG4gIHZhciBzZXEgPSBsY3MuZ2V0KFxuICAgIHRyaW1tZWQxLCB0cmltbWVkMixcbiAgICBtYXRjaCxcbiAgICBtYXRjaENvbnRleHRcbiAgKTtcbiAgdmFyIHJlbW92ZWRJdGVtcyA9IFtdO1xuICByZXN1bHQgPSByZXN1bHQgfHwge1xuICAgIF90OiAnYSdcbiAgfTtcbiAgZm9yIChpbmRleCA9IGNvbW1vbkhlYWQ7IGluZGV4IDwgbGVuMSAtIGNvbW1vblRhaWw7IGluZGV4KyspIHtcbiAgICBpZiAoYXJyYXlJbmRleE9mKHNlcS5pbmRpY2VzMSwgaW5kZXggLSBjb21tb25IZWFkKSA8IDApIHtcbiAgICAgIC8vIHJlbW92ZWRcbiAgICAgIHJlc3VsdFsnXycgKyBpbmRleF0gPSBbYXJyYXkxW2luZGV4XSwgMCwgMF07XG4gICAgICByZW1vdmVkSXRlbXMucHVzaChpbmRleCk7XG4gICAgfVxuICB9XG5cbiAgdmFyIGRldGVjdE1vdmUgPSB0cnVlO1xuICBpZiAoY29udGV4dC5vcHRpb25zICYmIGNvbnRleHQub3B0aW9ucy5hcnJheXMgJiYgY29udGV4dC5vcHRpb25zLmFycmF5cy5kZXRlY3RNb3ZlID09PSBmYWxzZSkge1xuICAgIGRldGVjdE1vdmUgPSBmYWxzZTtcbiAgfVxuICB2YXIgaW5jbHVkZVZhbHVlT25Nb3ZlID0gZmFsc2U7XG4gIGlmIChjb250ZXh0Lm9wdGlvbnMgJiYgY29udGV4dC5vcHRpb25zLmFycmF5cyAmJiBjb250ZXh0Lm9wdGlvbnMuYXJyYXlzLmluY2x1ZGVWYWx1ZU9uTW92ZSkge1xuICAgIGluY2x1ZGVWYWx1ZU9uTW92ZSA9IHRydWU7XG4gIH1cblxuICB2YXIgcmVtb3ZlZEl0ZW1zTGVuZ3RoID0gcmVtb3ZlZEl0ZW1zLmxlbmd0aDtcbiAgZm9yIChpbmRleCA9IGNvbW1vbkhlYWQ7IGluZGV4IDwgbGVuMiAtIGNvbW1vblRhaWw7IGluZGV4KyspIHtcbiAgICB2YXIgaW5kZXhPbkFycmF5MiA9IGFycmF5SW5kZXhPZihzZXEuaW5kaWNlczIsIGluZGV4IC0gY29tbW9uSGVhZCk7XG4gICAgaWYgKGluZGV4T25BcnJheTIgPCAwKSB7XG4gICAgICAvLyBhZGRlZCwgdHJ5IHRvIG1hdGNoIHdpdGggYSByZW1vdmVkIGl0ZW0gYW5kIHJlZ2lzdGVyIGFzIHBvc2l0aW9uIG1vdmVcbiAgICAgIHZhciBpc01vdmUgPSBmYWxzZTtcbiAgICAgIGlmIChkZXRlY3RNb3ZlICYmIHJlbW92ZWRJdGVtc0xlbmd0aCA+IDApIHtcbiAgICAgICAgZm9yICh2YXIgcmVtb3ZlSXRlbUluZGV4MSA9IDA7IHJlbW92ZUl0ZW1JbmRleDEgPCByZW1vdmVkSXRlbXNMZW5ndGg7IHJlbW92ZUl0ZW1JbmRleDErKykge1xuICAgICAgICAgIGluZGV4MSA9IHJlbW92ZWRJdGVtc1tyZW1vdmVJdGVtSW5kZXgxXTtcbiAgICAgICAgICBpZiAobWF0Y2godHJpbW1lZDEsIHRyaW1tZWQyLCBpbmRleDEgLSBjb21tb25IZWFkLFxuICAgICAgICAgICAgaW5kZXggLSBjb21tb25IZWFkLCBtYXRjaENvbnRleHQpKSB7XG4gICAgICAgICAgICAvLyBzdG9yZSBwb3NpdGlvbiBtb3ZlIGFzOiBbb3JpZ2luYWxWYWx1ZSwgbmV3UG9zaXRpb24sIEFSUkFZX01PVkVdXG4gICAgICAgICAgICByZXN1bHRbJ18nICsgaW5kZXgxXS5zcGxpY2UoMSwgMiwgaW5kZXgsIEFSUkFZX01PVkUpO1xuICAgICAgICAgICAgaWYgKCFpbmNsdWRlVmFsdWVPbk1vdmUpIHtcbiAgICAgICAgICAgICAgLy8gZG9uJ3QgaW5jbHVkZSBtb3ZlZCB2YWx1ZSBvbiBkaWZmLCB0byBzYXZlIGJ5dGVzXG4gICAgICAgICAgICAgIHJlc3VsdFsnXycgKyBpbmRleDFdWzBdID0gJyc7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGluZGV4MiA9IGluZGV4O1xuICAgICAgICAgICAgY2hpbGQgPSBuZXcgRGlmZkNvbnRleHQoY29udGV4dC5sZWZ0W2luZGV4MV0sIGNvbnRleHQucmlnaHRbaW5kZXgyXSk7XG4gICAgICAgICAgICBjb250ZXh0LnB1c2goY2hpbGQsIGluZGV4Mik7XG4gICAgICAgICAgICByZW1vdmVkSXRlbXMuc3BsaWNlKHJlbW92ZUl0ZW1JbmRleDEsIDEpO1xuICAgICAgICAgICAgaXNNb3ZlID0gdHJ1ZTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKCFpc01vdmUpIHtcbiAgICAgICAgLy8gYWRkZWRcbiAgICAgICAgcmVzdWx0W2luZGV4XSA9IFthcnJheTJbaW5kZXhdXTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgLy8gbWF0Y2gsIGRvIGlubmVyIGRpZmZcbiAgICAgIGluZGV4MSA9IHNlcS5pbmRpY2VzMVtpbmRleE9uQXJyYXkyXSArIGNvbW1vbkhlYWQ7XG4gICAgICBpbmRleDIgPSBzZXEuaW5kaWNlczJbaW5kZXhPbkFycmF5Ml0gKyBjb21tb25IZWFkO1xuICAgICAgY2hpbGQgPSBuZXcgRGlmZkNvbnRleHQoY29udGV4dC5sZWZ0W2luZGV4MV0sIGNvbnRleHQucmlnaHRbaW5kZXgyXSk7XG4gICAgICBjb250ZXh0LnB1c2goY2hpbGQsIGluZGV4Mik7XG4gICAgfVxuICB9XG5cbiAgY29udGV4dC5zZXRSZXN1bHQocmVzdWx0KS5leGl0KCk7XG5cbn07XG5kaWZmRmlsdGVyLmZpbHRlck5hbWUgPSAnYXJyYXlzJztcblxudmFyIGNvbXBhcmUgPSB7XG4gIG51bWVyaWNhbGx5OiBmdW5jdGlvbihhLCBiKSB7XG4gICAgcmV0dXJuIGEgLSBiO1xuICB9LFxuICBudW1lcmljYWxseUJ5OiBmdW5jdGlvbihuYW1lKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKGEsIGIpIHtcbiAgICAgIHJldHVybiBhW25hbWVdIC0gYltuYW1lXTtcbiAgICB9O1xuICB9XG59O1xuXG52YXIgcGF0Y2hGaWx0ZXIgPSBmdW5jdGlvbiBuZXN0ZWRQYXRjaEZpbHRlcihjb250ZXh0KSB7XG4gIGlmICghY29udGV4dC5uZXN0ZWQpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKGNvbnRleHQuZGVsdGEuX3QgIT09ICdhJykge1xuICAgIHJldHVybjtcbiAgfVxuICB2YXIgaW5kZXgsIGluZGV4MTtcblxuICB2YXIgZGVsdGEgPSBjb250ZXh0LmRlbHRhO1xuICB2YXIgYXJyYXkgPSBjb250ZXh0LmxlZnQ7XG5cbiAgLy8gZmlyc3QsIHNlcGFyYXRlIHJlbW92YWxzLCBpbnNlcnRpb25zIGFuZCBtb2RpZmljYXRpb25zXG4gIHZhciB0b1JlbW92ZSA9IFtdO1xuICB2YXIgdG9JbnNlcnQgPSBbXTtcbiAgdmFyIHRvTW9kaWZ5ID0gW107XG4gIGZvciAoaW5kZXggaW4gZGVsdGEpIHtcbiAgICBpZiAoaW5kZXggIT09ICdfdCcpIHtcbiAgICAgIGlmIChpbmRleFswXSA9PT0gJ18nKSB7XG4gICAgICAgIC8vIHJlbW92ZWQgaXRlbSBmcm9tIG9yaWdpbmFsIGFycmF5XG4gICAgICAgIGlmIChkZWx0YVtpbmRleF1bMl0gPT09IDAgfHwgZGVsdGFbaW5kZXhdWzJdID09PSBBUlJBWV9NT1ZFKSB7XG4gICAgICAgICAgdG9SZW1vdmUucHVzaChwYXJzZUludChpbmRleC5zbGljZSgxKSwgMTApKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ29ubHkgcmVtb3ZhbCBvciBtb3ZlIGNhbiBiZSBhcHBsaWVkIGF0IG9yaWdpbmFsIGFycmF5IGluZGljZXMnICtcbiAgICAgICAgICAgICcsIGludmFsaWQgZGlmZiB0eXBlOiAnICsgZGVsdGFbaW5kZXhdWzJdKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKGRlbHRhW2luZGV4XS5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICAvLyBhZGRlZCBpdGVtIGF0IG5ldyBhcnJheVxuICAgICAgICAgIHRvSW5zZXJ0LnB1c2goe1xuICAgICAgICAgICAgaW5kZXg6IHBhcnNlSW50KGluZGV4LCAxMCksXG4gICAgICAgICAgICB2YWx1ZTogZGVsdGFbaW5kZXhdWzBdXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gbW9kaWZpZWQgaXRlbSBhdCBuZXcgYXJyYXlcbiAgICAgICAgICB0b01vZGlmeS5wdXNoKHtcbiAgICAgICAgICAgIGluZGV4OiBwYXJzZUludChpbmRleCwgMTApLFxuICAgICAgICAgICAgZGVsdGE6IGRlbHRhW2luZGV4XVxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLy8gcmVtb3ZlIGl0ZW1zLCBpbiByZXZlcnNlIG9yZGVyIHRvIGF2b2lkIHNhd2luZyBvdXIgb3duIGZsb29yXG4gIHRvUmVtb3ZlID0gdG9SZW1vdmUuc29ydChjb21wYXJlLm51bWVyaWNhbGx5KTtcbiAgZm9yIChpbmRleCA9IHRvUmVtb3ZlLmxlbmd0aCAtIDE7IGluZGV4ID49IDA7IGluZGV4LS0pIHtcbiAgICBpbmRleDEgPSB0b1JlbW92ZVtpbmRleF07XG4gICAgdmFyIGluZGV4RGlmZiA9IGRlbHRhWydfJyArIGluZGV4MV07XG4gICAgdmFyIHJlbW92ZWRWYWx1ZSA9IGFycmF5LnNwbGljZShpbmRleDEsIDEpWzBdO1xuICAgIGlmIChpbmRleERpZmZbMl0gPT09IEFSUkFZX01PVkUpIHtcbiAgICAgIC8vIHJlaW5zZXJ0IGxhdGVyXG4gICAgICB0b0luc2VydC5wdXNoKHtcbiAgICAgICAgaW5kZXg6IGluZGV4RGlmZlsxXSxcbiAgICAgICAgdmFsdWU6IHJlbW92ZWRWYWx1ZVxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgLy8gaW5zZXJ0IGl0ZW1zLCBpbiByZXZlcnNlIG9yZGVyIHRvIGF2b2lkIG1vdmluZyBvdXIgb3duIGZsb29yXG4gIHRvSW5zZXJ0ID0gdG9JbnNlcnQuc29ydChjb21wYXJlLm51bWVyaWNhbGx5QnkoJ2luZGV4JykpO1xuICB2YXIgdG9JbnNlcnRMZW5ndGggPSB0b0luc2VydC5sZW5ndGg7XG4gIGZvciAoaW5kZXggPSAwOyBpbmRleCA8IHRvSW5zZXJ0TGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgdmFyIGluc2VydGlvbiA9IHRvSW5zZXJ0W2luZGV4XTtcbiAgICBhcnJheS5zcGxpY2UoaW5zZXJ0aW9uLmluZGV4LCAwLCBpbnNlcnRpb24udmFsdWUpO1xuICB9XG5cbiAgLy8gYXBwbHkgbW9kaWZpY2F0aW9uc1xuICB2YXIgdG9Nb2RpZnlMZW5ndGggPSB0b01vZGlmeS5sZW5ndGg7XG4gIHZhciBjaGlsZDtcbiAgaWYgKHRvTW9kaWZ5TGVuZ3RoID4gMCkge1xuICAgIGZvciAoaW5kZXggPSAwOyBpbmRleCA8IHRvTW9kaWZ5TGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgICB2YXIgbW9kaWZpY2F0aW9uID0gdG9Nb2RpZnlbaW5kZXhdO1xuICAgICAgY2hpbGQgPSBuZXcgUGF0Y2hDb250ZXh0KGNvbnRleHQubGVmdFttb2RpZmljYXRpb24uaW5kZXhdLCBtb2RpZmljYXRpb24uZGVsdGEpO1xuICAgICAgY29udGV4dC5wdXNoKGNoaWxkLCBtb2RpZmljYXRpb24uaW5kZXgpO1xuICAgIH1cbiAgfVxuXG4gIGlmICghY29udGV4dC5jaGlsZHJlbikge1xuICAgIGNvbnRleHQuc2V0UmVzdWx0KGNvbnRleHQubGVmdCkuZXhpdCgpO1xuICAgIHJldHVybjtcbiAgfVxuICBjb250ZXh0LmV4aXQoKTtcbn07XG5wYXRjaEZpbHRlci5maWx0ZXJOYW1lID0gJ2FycmF5cyc7XG5cbnZhciBjb2xsZWN0Q2hpbGRyZW5QYXRjaEZpbHRlciA9IGZ1bmN0aW9uIGNvbGxlY3RDaGlsZHJlblBhdGNoRmlsdGVyKGNvbnRleHQpIHtcbiAgaWYgKCFjb250ZXh0IHx8ICFjb250ZXh0LmNoaWxkcmVuKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmIChjb250ZXh0LmRlbHRhLl90ICE9PSAnYScpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgdmFyIGxlbmd0aCA9IGNvbnRleHQuY2hpbGRyZW4ubGVuZ3RoO1xuICB2YXIgY2hpbGQ7XG4gIGZvciAodmFyIGluZGV4ID0gMDsgaW5kZXggPCBsZW5ndGg7IGluZGV4KyspIHtcbiAgICBjaGlsZCA9IGNvbnRleHQuY2hpbGRyZW5baW5kZXhdO1xuICAgIGNvbnRleHQubGVmdFtjaGlsZC5jaGlsZE5hbWVdID0gY2hpbGQucmVzdWx0O1xuICB9XG4gIGNvbnRleHQuc2V0UmVzdWx0KGNvbnRleHQubGVmdCkuZXhpdCgpO1xufTtcbmNvbGxlY3RDaGlsZHJlblBhdGNoRmlsdGVyLmZpbHRlck5hbWUgPSAnYXJyYXlzQ29sbGVjdENoaWxkcmVuJztcblxudmFyIHJldmVyc2VGaWx0ZXIgPSBmdW5jdGlvbiBhcnJheXNSZXZlcnNlRmlsdGVyKGNvbnRleHQpIHtcbiAgaWYgKCFjb250ZXh0Lm5lc3RlZCkge1xuICAgIGlmIChjb250ZXh0LmRlbHRhWzJdID09PSBBUlJBWV9NT1ZFKSB7XG4gICAgICBjb250ZXh0Lm5ld05hbWUgPSAnXycgKyBjb250ZXh0LmRlbHRhWzFdO1xuICAgICAgY29udGV4dC5zZXRSZXN1bHQoW2NvbnRleHQuZGVsdGFbMF0sIHBhcnNlSW50KGNvbnRleHQuY2hpbGROYW1lLnN1YnN0cigxKSwgMTApLCBBUlJBWV9NT1ZFXSkuZXhpdCgpO1xuICAgIH1cbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKGNvbnRleHQuZGVsdGEuX3QgIT09ICdhJykge1xuICAgIHJldHVybjtcbiAgfVxuICB2YXIgbmFtZSwgY2hpbGQ7XG4gIGZvciAobmFtZSBpbiBjb250ZXh0LmRlbHRhKSB7XG4gICAgaWYgKG5hbWUgPT09ICdfdCcpIHtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cbiAgICBjaGlsZCA9IG5ldyBSZXZlcnNlQ29udGV4dChjb250ZXh0LmRlbHRhW25hbWVdKTtcbiAgICBjb250ZXh0LnB1c2goY2hpbGQsIG5hbWUpO1xuICB9XG4gIGNvbnRleHQuZXhpdCgpO1xufTtcbnJldmVyc2VGaWx0ZXIuZmlsdGVyTmFtZSA9ICdhcnJheXMnO1xuXG52YXIgcmV2ZXJzZUFycmF5RGVsdGFJbmRleCA9IGZ1bmN0aW9uKGRlbHRhLCBpbmRleCwgaXRlbURlbHRhKSB7XG4gIHZhciBuZXdJbmRleCA9IGluZGV4O1xuICB2YXIgbmV3SW5kZXgyO1xuICBpZiAodHlwZW9mIGluZGV4ID09PSAnc3RyaW5nJyAmJiBpbmRleFswXSA9PT0gJ18nKSB7XG4gICAgbmV3SW5kZXggPSBwYXJzZUludChpbmRleC5zdWJzdHIoMSksIDEwKTtcbiAgfSBlbHNlIHtcbiAgICB2YXIgdWluZGV4ID0gJ18nICsgaW5kZXg7XG4gICAgaWYgKGlzQXJyYXkoaXRlbURlbHRhKSAmJiBpdGVtRGVsdGFbMl0gPT09IDApIHtcbiAgICAgIG5ld0luZGV4ID0gdWluZGV4O1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgaW5kZXhTaGlmdCA9IDA7XG4gICAgICBmb3IgKHZhciBpbmRleDIgaW4gZGVsdGEpIHtcbiAgICAgICAgdmFyIGl0ZW1EZWx0YTIgPSBkZWx0YVtpbmRleDJdO1xuICAgICAgICBpZiAoaXNBcnJheShpdGVtRGVsdGEyKSkge1xuICAgICAgICAgIGlmIChpdGVtRGVsdGEyWzJdID09PSBBUlJBWV9NT1ZFKSB7XG4gICAgICAgICAgICBpZiAoaXRlbURlbHRhMlsxXS50b1N0cmluZygpID09PSBpbmRleCkge1xuICAgICAgICAgICAgICBpbmRleFNoaWZ0ID0gMDtcbiAgICAgICAgICAgICAgbmV3SW5kZXggPSBpbmRleDIuc3Vic3RyKDEpO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2UgaWYgKGl0ZW1EZWx0YTJbMl0gPT09IDAgJiYgdHlwZW9mIGluZGV4MiA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIG5ld0luZGV4MiA9IHBhcnNlSW50KGluZGV4Mi5zdWJzdHIoMSksIDEwKTtcbiAgICAgICAgICAgIGlmIChuZXdJbmRleDIgPD0gbmV3SW5kZXgpIHtcbiAgICAgICAgICAgICAgbmV3SW5kZXgrKztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2UgaWYgKGl0ZW1EZWx0YTIubGVuZ3RoID09PSAxICYmIGluZGV4MiA8PSBuZXdJbmRleCkge1xuICAgICAgICAgICAgbmV3SW5kZXgtLTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChpbmRleFNoaWZ0ICE9PSAwKSB7XG4gICAgICAgIG5ld0luZGV4ICs9IGluZGV4U2hpZnQ7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiBuZXdJbmRleDtcbn07XG5cbnZhciBjb2xsZWN0Q2hpbGRyZW5SZXZlcnNlRmlsdGVyID0gZnVuY3Rpb24gY29sbGVjdENoaWxkcmVuUmV2ZXJzZUZpbHRlcihjb250ZXh0KSB7XG4gIGlmICghY29udGV4dCB8fCAhY29udGV4dC5jaGlsZHJlbikge1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAoY29udGV4dC5kZWx0YS5fdCAhPT0gJ2EnKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHZhciBsZW5ndGggPSBjb250ZXh0LmNoaWxkcmVuLmxlbmd0aDtcbiAgdmFyIGNoaWxkO1xuICB2YXIgZGVsdGEgPSB7XG4gICAgX3Q6ICdhJ1xuICB9O1xuICBmb3IgKHZhciBpbmRleCA9IDA7IGluZGV4IDwgbGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgY2hpbGQgPSBjb250ZXh0LmNoaWxkcmVuW2luZGV4XTtcbiAgICB2YXIgbmFtZSA9IGNoaWxkLm5ld05hbWU7XG4gICAgaWYgKHR5cGVvZiBuYW1lID09PSAndW5kZWZpbmVkJykge1xuICAgICAgbmFtZSA9IHJldmVyc2VBcnJheURlbHRhSW5kZXgoY29udGV4dC5kZWx0YSwgY2hpbGQuY2hpbGROYW1lLCBjaGlsZC5yZXN1bHQpO1xuICAgIH1cbiAgICBpZiAoZGVsdGFbbmFtZV0gIT09IGNoaWxkLnJlc3VsdCkge1xuICAgICAgZGVsdGFbbmFtZV0gPSBjaGlsZC5yZXN1bHQ7XG4gICAgfVxuICB9XG4gIGNvbnRleHQuc2V0UmVzdWx0KGRlbHRhKS5leGl0KCk7XG59O1xuY29sbGVjdENoaWxkcmVuUmV2ZXJzZUZpbHRlci5maWx0ZXJOYW1lID0gJ2FycmF5c0NvbGxlY3RDaGlsZHJlbic7XG5cbmV4cG9ydHMuZGlmZkZpbHRlciA9IGRpZmZGaWx0ZXI7XG5leHBvcnRzLnBhdGNoRmlsdGVyID0gcGF0Y2hGaWx0ZXI7XG5leHBvcnRzLmNvbGxlY3RDaGlsZHJlblBhdGNoRmlsdGVyID0gY29sbGVjdENoaWxkcmVuUGF0Y2hGaWx0ZXI7XG5leHBvcnRzLnJldmVyc2VGaWx0ZXIgPSByZXZlcnNlRmlsdGVyO1xuZXhwb3J0cy5jb2xsZWN0Q2hpbGRyZW5SZXZlcnNlRmlsdGVyID0gY29sbGVjdENoaWxkcmVuUmV2ZXJzZUZpbHRlcjtcbiIsInZhciBkaWZmRmlsdGVyID0gZnVuY3Rpb24gZGF0ZXNEaWZmRmlsdGVyKGNvbnRleHQpIHtcbiAgaWYgKGNvbnRleHQubGVmdCBpbnN0YW5jZW9mIERhdGUpIHtcbiAgICBpZiAoY29udGV4dC5yaWdodCBpbnN0YW5jZW9mIERhdGUpIHtcbiAgICAgIGlmIChjb250ZXh0LmxlZnQuZ2V0VGltZSgpICE9PSBjb250ZXh0LnJpZ2h0LmdldFRpbWUoKSkge1xuICAgICAgICBjb250ZXh0LnNldFJlc3VsdChbY29udGV4dC5sZWZ0LCBjb250ZXh0LnJpZ2h0XSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb250ZXh0LnNldFJlc3VsdCh1bmRlZmluZWQpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBjb250ZXh0LnNldFJlc3VsdChbY29udGV4dC5sZWZ0LCBjb250ZXh0LnJpZ2h0XSk7XG4gICAgfVxuICAgIGNvbnRleHQuZXhpdCgpO1xuICB9IGVsc2UgaWYgKGNvbnRleHQucmlnaHQgaW5zdGFuY2VvZiBEYXRlKSB7XG4gICAgY29udGV4dC5zZXRSZXN1bHQoW2NvbnRleHQubGVmdCwgY29udGV4dC5yaWdodF0pLmV4aXQoKTtcbiAgfVxufTtcbmRpZmZGaWx0ZXIuZmlsdGVyTmFtZSA9ICdkYXRlcyc7XG5cbmV4cG9ydHMuZGlmZkZpbHRlciA9IGRpZmZGaWx0ZXI7XG4iLCIvKlxuXG5MQ1MgaW1wbGVtZW50YXRpb24gdGhhdCBzdXBwb3J0cyBhcnJheXMgb3Igc3RyaW5nc1xuXG5yZWZlcmVuY2U6IGh0dHA6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvTG9uZ2VzdF9jb21tb25fc3Vic2VxdWVuY2VfcHJvYmxlbVxuXG4qL1xuXG52YXIgZGVmYXVsdE1hdGNoID0gZnVuY3Rpb24oYXJyYXkxLCBhcnJheTIsIGluZGV4MSwgaW5kZXgyKSB7XG4gIHJldHVybiBhcnJheTFbaW5kZXgxXSA9PT0gYXJyYXkyW2luZGV4Ml07XG59O1xuXG52YXIgbGVuZ3RoTWF0cml4ID0gZnVuY3Rpb24oYXJyYXkxLCBhcnJheTIsIG1hdGNoLCBjb250ZXh0KSB7XG4gIHZhciBsZW4xID0gYXJyYXkxLmxlbmd0aDtcbiAgdmFyIGxlbjIgPSBhcnJheTIubGVuZ3RoO1xuICB2YXIgeCwgeTtcblxuICAvLyBpbml0aWFsaXplIGVtcHR5IG1hdHJpeCBvZiBsZW4xKzEgeCBsZW4yKzFcbiAgdmFyIG1hdHJpeCA9IFtsZW4xICsgMV07XG4gIGZvciAoeCA9IDA7IHggPCBsZW4xICsgMTsgeCsrKSB7XG4gICAgbWF0cml4W3hdID0gW2xlbjIgKyAxXTtcbiAgICBmb3IgKHkgPSAwOyB5IDwgbGVuMiArIDE7IHkrKykge1xuICAgICAgbWF0cml4W3hdW3ldID0gMDtcbiAgICB9XG4gIH1cbiAgbWF0cml4Lm1hdGNoID0gbWF0Y2g7XG4gIC8vIHNhdmUgc2VxdWVuY2UgbGVuZ3RocyBmb3IgZWFjaCBjb29yZGluYXRlXG4gIGZvciAoeCA9IDE7IHggPCBsZW4xICsgMTsgeCsrKSB7XG4gICAgZm9yICh5ID0gMTsgeSA8IGxlbjIgKyAxOyB5KyspIHtcbiAgICAgIGlmIChtYXRjaChhcnJheTEsIGFycmF5MiwgeCAtIDEsIHkgLSAxLCBjb250ZXh0KSkge1xuICAgICAgICBtYXRyaXhbeF1beV0gPSBtYXRyaXhbeCAtIDFdW3kgLSAxXSArIDE7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBtYXRyaXhbeF1beV0gPSBNYXRoLm1heChtYXRyaXhbeCAtIDFdW3ldLCBtYXRyaXhbeF1beSAtIDFdKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIG1hdHJpeDtcbn07XG5cbnZhciBiYWNrdHJhY2sgPSBmdW5jdGlvbihtYXRyaXgsIGFycmF5MSwgYXJyYXkyLCBpbmRleDEsIGluZGV4MiwgY29udGV4dCkge1xuICBpZiAoaW5kZXgxID09PSAwIHx8IGluZGV4MiA9PT0gMCkge1xuICAgIHJldHVybiB7XG4gICAgICBzZXF1ZW5jZTogW10sXG4gICAgICBpbmRpY2VzMTogW10sXG4gICAgICBpbmRpY2VzMjogW11cbiAgICB9O1xuICB9XG5cbiAgaWYgKG1hdHJpeC5tYXRjaChhcnJheTEsIGFycmF5MiwgaW5kZXgxIC0gMSwgaW5kZXgyIC0gMSwgY29udGV4dCkpIHtcbiAgICB2YXIgc3Vic2VxdWVuY2UgPSBiYWNrdHJhY2sobWF0cml4LCBhcnJheTEsIGFycmF5MiwgaW5kZXgxIC0gMSwgaW5kZXgyIC0gMSwgY29udGV4dCk7XG4gICAgc3Vic2VxdWVuY2Uuc2VxdWVuY2UucHVzaChhcnJheTFbaW5kZXgxIC0gMV0pO1xuICAgIHN1YnNlcXVlbmNlLmluZGljZXMxLnB1c2goaW5kZXgxIC0gMSk7XG4gICAgc3Vic2VxdWVuY2UuaW5kaWNlczIucHVzaChpbmRleDIgLSAxKTtcbiAgICByZXR1cm4gc3Vic2VxdWVuY2U7XG4gIH1cblxuICBpZiAobWF0cml4W2luZGV4MV1baW5kZXgyIC0gMV0gPiBtYXRyaXhbaW5kZXgxIC0gMV1baW5kZXgyXSkge1xuICAgIHJldHVybiBiYWNrdHJhY2sobWF0cml4LCBhcnJheTEsIGFycmF5MiwgaW5kZXgxLCBpbmRleDIgLSAxLCBjb250ZXh0KTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gYmFja3RyYWNrKG1hdHJpeCwgYXJyYXkxLCBhcnJheTIsIGluZGV4MSAtIDEsIGluZGV4MiwgY29udGV4dCk7XG4gIH1cbn07XG5cbnZhciBnZXQgPSBmdW5jdGlvbihhcnJheTEsIGFycmF5MiwgbWF0Y2gsIGNvbnRleHQpIHtcbiAgY29udGV4dCA9IGNvbnRleHQgfHwge307XG4gIHZhciBtYXRyaXggPSBsZW5ndGhNYXRyaXgoYXJyYXkxLCBhcnJheTIsIG1hdGNoIHx8IGRlZmF1bHRNYXRjaCwgY29udGV4dCk7XG4gIHZhciByZXN1bHQgPSBiYWNrdHJhY2sobWF0cml4LCBhcnJheTEsIGFycmF5MiwgYXJyYXkxLmxlbmd0aCwgYXJyYXkyLmxlbmd0aCwgY29udGV4dCk7XG4gIGlmICh0eXBlb2YgYXJyYXkxID09PSAnc3RyaW5nJyAmJiB0eXBlb2YgYXJyYXkyID09PSAnc3RyaW5nJykge1xuICAgIHJlc3VsdC5zZXF1ZW5jZSA9IHJlc3VsdC5zZXF1ZW5jZS5qb2luKCcnKTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufTtcblxuZXhwb3J0cy5nZXQgPSBnZXQ7XG4iLCJ2YXIgRGlmZkNvbnRleHQgPSByZXF1aXJlKCcuLi9jb250ZXh0cy9kaWZmJykuRGlmZkNvbnRleHQ7XG52YXIgUGF0Y2hDb250ZXh0ID0gcmVxdWlyZSgnLi4vY29udGV4dHMvcGF0Y2gnKS5QYXRjaENvbnRleHQ7XG52YXIgUmV2ZXJzZUNvbnRleHQgPSByZXF1aXJlKCcuLi9jb250ZXh0cy9yZXZlcnNlJykuUmV2ZXJzZUNvbnRleHQ7XG5cbnZhciBjb2xsZWN0Q2hpbGRyZW5EaWZmRmlsdGVyID0gZnVuY3Rpb24gY29sbGVjdENoaWxkcmVuRGlmZkZpbHRlcihjb250ZXh0KSB7XG4gIGlmICghY29udGV4dCB8fCAhY29udGV4dC5jaGlsZHJlbikge1xuICAgIHJldHVybjtcbiAgfVxuICB2YXIgbGVuZ3RoID0gY29udGV4dC5jaGlsZHJlbi5sZW5ndGg7XG4gIHZhciBjaGlsZDtcbiAgdmFyIHJlc3VsdCA9IGNvbnRleHQucmVzdWx0O1xuICBmb3IgKHZhciBpbmRleCA9IDA7IGluZGV4IDwgbGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgY2hpbGQgPSBjb250ZXh0LmNoaWxkcmVuW2luZGV4XTtcbiAgICBpZiAodHlwZW9mIGNoaWxkLnJlc3VsdCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cbiAgICByZXN1bHQgPSByZXN1bHQgfHwge307XG4gICAgcmVzdWx0W2NoaWxkLmNoaWxkTmFtZV0gPSBjaGlsZC5yZXN1bHQ7XG4gIH1cbiAgaWYgKHJlc3VsdCAmJiBjb250ZXh0LmxlZnRJc0FycmF5KSB7XG4gICAgcmVzdWx0Ll90ID0gJ2EnO1xuICB9XG4gIGNvbnRleHQuc2V0UmVzdWx0KHJlc3VsdCkuZXhpdCgpO1xufTtcbmNvbGxlY3RDaGlsZHJlbkRpZmZGaWx0ZXIuZmlsdGVyTmFtZSA9ICdjb2xsZWN0Q2hpbGRyZW4nO1xuXG52YXIgb2JqZWN0c0RpZmZGaWx0ZXIgPSBmdW5jdGlvbiBvYmplY3RzRGlmZkZpbHRlcihjb250ZXh0KSB7XG4gIGlmIChjb250ZXh0LmxlZnRJc0FycmF5IHx8IGNvbnRleHQubGVmdFR5cGUgIT09ICdvYmplY3QnKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgdmFyIG5hbWUsIGNoaWxkO1xuICBmb3IgKG5hbWUgaW4gY29udGV4dC5sZWZ0KSB7XG4gICAgY2hpbGQgPSBuZXcgRGlmZkNvbnRleHQoY29udGV4dC5sZWZ0W25hbWVdLCBjb250ZXh0LnJpZ2h0W25hbWVdKTtcbiAgICBjb250ZXh0LnB1c2goY2hpbGQsIG5hbWUpO1xuICB9XG4gIGZvciAobmFtZSBpbiBjb250ZXh0LnJpZ2h0KSB7XG4gICAgaWYgKHR5cGVvZiBjb250ZXh0LmxlZnRbbmFtZV0gPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBjaGlsZCA9IG5ldyBEaWZmQ29udGV4dCh1bmRlZmluZWQsIGNvbnRleHQucmlnaHRbbmFtZV0pO1xuICAgICAgY29udGV4dC5wdXNoKGNoaWxkLCBuYW1lKTtcbiAgICB9XG4gIH1cblxuICBpZiAoIWNvbnRleHQuY2hpbGRyZW4gfHwgY29udGV4dC5jaGlsZHJlbi5sZW5ndGggPT09IDApIHtcbiAgICBjb250ZXh0LnNldFJlc3VsdCh1bmRlZmluZWQpLmV4aXQoKTtcbiAgICByZXR1cm47XG4gIH1cbiAgY29udGV4dC5leGl0KCk7XG59O1xub2JqZWN0c0RpZmZGaWx0ZXIuZmlsdGVyTmFtZSA9ICdvYmplY3RzJztcblxudmFyIHBhdGNoRmlsdGVyID0gZnVuY3Rpb24gbmVzdGVkUGF0Y2hGaWx0ZXIoY29udGV4dCkge1xuICBpZiAoIWNvbnRleHQubmVzdGVkKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmIChjb250ZXh0LmRlbHRhLl90KSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHZhciBuYW1lLCBjaGlsZDtcbiAgZm9yIChuYW1lIGluIGNvbnRleHQuZGVsdGEpIHtcbiAgICBjaGlsZCA9IG5ldyBQYXRjaENvbnRleHQoY29udGV4dC5sZWZ0W25hbWVdLCBjb250ZXh0LmRlbHRhW25hbWVdKTtcbiAgICBjb250ZXh0LnB1c2goY2hpbGQsIG5hbWUpO1xuICB9XG4gIGNvbnRleHQuZXhpdCgpO1xufTtcbnBhdGNoRmlsdGVyLmZpbHRlck5hbWUgPSAnb2JqZWN0cyc7XG5cbnZhciBjb2xsZWN0Q2hpbGRyZW5QYXRjaEZpbHRlciA9IGZ1bmN0aW9uIGNvbGxlY3RDaGlsZHJlblBhdGNoRmlsdGVyKGNvbnRleHQpIHtcbiAgaWYgKCFjb250ZXh0IHx8ICFjb250ZXh0LmNoaWxkcmVuKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmIChjb250ZXh0LmRlbHRhLl90KSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHZhciBsZW5ndGggPSBjb250ZXh0LmNoaWxkcmVuLmxlbmd0aDtcbiAgdmFyIGNoaWxkO1xuICBmb3IgKHZhciBpbmRleCA9IDA7IGluZGV4IDwgbGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgY2hpbGQgPSBjb250ZXh0LmNoaWxkcmVuW2luZGV4XTtcbiAgICBpZiAoY29udGV4dC5sZWZ0Lmhhc093blByb3BlcnR5KGNoaWxkLmNoaWxkTmFtZSkgJiYgY2hpbGQucmVzdWx0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGRlbGV0ZSBjb250ZXh0LmxlZnRbY2hpbGQuY2hpbGROYW1lXTtcbiAgICB9IGVsc2UgaWYgKGNvbnRleHQubGVmdFtjaGlsZC5jaGlsZE5hbWVdICE9PSBjaGlsZC5yZXN1bHQpIHtcbiAgICAgIGNvbnRleHQubGVmdFtjaGlsZC5jaGlsZE5hbWVdID0gY2hpbGQucmVzdWx0O1xuICAgIH1cbiAgfVxuICBjb250ZXh0LnNldFJlc3VsdChjb250ZXh0LmxlZnQpLmV4aXQoKTtcbn07XG5jb2xsZWN0Q2hpbGRyZW5QYXRjaEZpbHRlci5maWx0ZXJOYW1lID0gJ2NvbGxlY3RDaGlsZHJlbic7XG5cbnZhciByZXZlcnNlRmlsdGVyID0gZnVuY3Rpb24gbmVzdGVkUmV2ZXJzZUZpbHRlcihjb250ZXh0KSB7XG4gIGlmICghY29udGV4dC5uZXN0ZWQpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKGNvbnRleHQuZGVsdGEuX3QpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgdmFyIG5hbWUsIGNoaWxkO1xuICBmb3IgKG5hbWUgaW4gY29udGV4dC5kZWx0YSkge1xuICAgIGNoaWxkID0gbmV3IFJldmVyc2VDb250ZXh0KGNvbnRleHQuZGVsdGFbbmFtZV0pO1xuICAgIGNvbnRleHQucHVzaChjaGlsZCwgbmFtZSk7XG4gIH1cbiAgY29udGV4dC5leGl0KCk7XG59O1xucmV2ZXJzZUZpbHRlci5maWx0ZXJOYW1lID0gJ29iamVjdHMnO1xuXG52YXIgY29sbGVjdENoaWxkcmVuUmV2ZXJzZUZpbHRlciA9IGZ1bmN0aW9uIGNvbGxlY3RDaGlsZHJlblJldmVyc2VGaWx0ZXIoY29udGV4dCkge1xuICBpZiAoIWNvbnRleHQgfHwgIWNvbnRleHQuY2hpbGRyZW4pIHtcbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKGNvbnRleHQuZGVsdGEuX3QpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgdmFyIGxlbmd0aCA9IGNvbnRleHQuY2hpbGRyZW4ubGVuZ3RoO1xuICB2YXIgY2hpbGQ7XG4gIHZhciBkZWx0YSA9IHt9O1xuICBmb3IgKHZhciBpbmRleCA9IDA7IGluZGV4IDwgbGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgY2hpbGQgPSBjb250ZXh0LmNoaWxkcmVuW2luZGV4XTtcbiAgICBpZiAoZGVsdGFbY2hpbGQuY2hpbGROYW1lXSAhPT0gY2hpbGQucmVzdWx0KSB7XG4gICAgICBkZWx0YVtjaGlsZC5jaGlsZE5hbWVdID0gY2hpbGQucmVzdWx0O1xuICAgIH1cbiAgfVxuICBjb250ZXh0LnNldFJlc3VsdChkZWx0YSkuZXhpdCgpO1xufTtcbmNvbGxlY3RDaGlsZHJlblJldmVyc2VGaWx0ZXIuZmlsdGVyTmFtZSA9ICdjb2xsZWN0Q2hpbGRyZW4nO1xuXG5leHBvcnRzLmNvbGxlY3RDaGlsZHJlbkRpZmZGaWx0ZXIgPSBjb2xsZWN0Q2hpbGRyZW5EaWZmRmlsdGVyO1xuZXhwb3J0cy5vYmplY3RzRGlmZkZpbHRlciA9IG9iamVjdHNEaWZmRmlsdGVyO1xuZXhwb3J0cy5wYXRjaEZpbHRlciA9IHBhdGNoRmlsdGVyO1xuZXhwb3J0cy5jb2xsZWN0Q2hpbGRyZW5QYXRjaEZpbHRlciA9IGNvbGxlY3RDaGlsZHJlblBhdGNoRmlsdGVyO1xuZXhwb3J0cy5yZXZlcnNlRmlsdGVyID0gcmV2ZXJzZUZpbHRlcjtcbmV4cG9ydHMuY29sbGVjdENoaWxkcmVuUmV2ZXJzZUZpbHRlciA9IGNvbGxlY3RDaGlsZHJlblJldmVyc2VGaWx0ZXI7XG4iLCIvKiBnbG9iYWwgZGlmZl9tYXRjaF9wYXRjaCAqL1xudmFyIFRFWFRfRElGRiA9IDI7XG52YXIgREVGQVVMVF9NSU5fTEVOR1RIID0gNjA7XG52YXIgY2FjaGVkRGlmZlBhdGNoID0gbnVsbDtcblxudmFyIGdldERpZmZNYXRjaFBhdGNoID0gZnVuY3Rpb24oKSB7XG4gIC8qanNoaW50IGNhbWVsY2FzZTogZmFsc2UgKi9cblxuICBpZiAoIWNhY2hlZERpZmZQYXRjaCkge1xuICAgIHZhciBpbnN0YW5jZTtcbiAgICBpZiAodHlwZW9mIGRpZmZfbWF0Y2hfcGF0Y2ggIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAvLyBhbHJlYWR5IGxvYWRlZCwgcHJvYmFibHkgYSBicm93c2VyXG4gICAgICBpbnN0YW5jZSA9IHR5cGVvZiBkaWZmX21hdGNoX3BhdGNoID09PSAnZnVuY3Rpb24nID9cbiAgICAgICAgbmV3IGRpZmZfbWF0Y2hfcGF0Y2goKSA6IG5ldyBkaWZmX21hdGNoX3BhdGNoLmRpZmZfbWF0Y2hfcGF0Y2goKTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiByZXF1aXJlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICB0cnkge1xuICAgICAgICB2YXIgZG1wTW9kdWxlTmFtZSA9ICdkaWZmX21hdGNoX3BhdGNoX3VuY29tcHJlc3NlZCc7XG4gICAgICAgIHZhciBkbXAgPSByZXF1aXJlKCcuLi8uLi9wdWJsaWMvZXh0ZXJuYWwvJyArIGRtcE1vZHVsZU5hbWUpO1xuICAgICAgICBpbnN0YW5jZSA9IG5ldyBkbXAuZGlmZl9tYXRjaF9wYXRjaCgpO1xuICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIGluc3RhbmNlID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKCFpbnN0YW5jZSkge1xuICAgICAgdmFyIGVycm9yID0gbmV3IEVycm9yKCd0ZXh0IGRpZmZfbWF0Y2hfcGF0Y2ggbGlicmFyeSBub3QgZm91bmQnKTtcbiAgICAgIGVycm9yLmRpZmZfbWF0Y2hfcGF0Y2hfbm90X2ZvdW5kID0gdHJ1ZTtcbiAgICAgIHRocm93IGVycm9yO1xuICAgIH1cbiAgICBjYWNoZWREaWZmUGF0Y2ggPSB7XG4gICAgICBkaWZmOiBmdW5jdGlvbih0eHQxLCB0eHQyKSB7XG4gICAgICAgIHJldHVybiBpbnN0YW5jZS5wYXRjaF90b1RleHQoaW5zdGFuY2UucGF0Y2hfbWFrZSh0eHQxLCB0eHQyKSk7XG4gICAgICB9LFxuICAgICAgcGF0Y2g6IGZ1bmN0aW9uKHR4dDEsIHBhdGNoKSB7XG4gICAgICAgIHZhciByZXN1bHRzID0gaW5zdGFuY2UucGF0Y2hfYXBwbHkoaW5zdGFuY2UucGF0Y2hfZnJvbVRleHQocGF0Y2gpLCB0eHQxKTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCByZXN1bHRzWzFdLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgaWYgKCFyZXN1bHRzWzFdW2ldKSB7XG4gICAgICAgICAgICB2YXIgZXJyb3IgPSBuZXcgRXJyb3IoJ3RleHQgcGF0Y2ggZmFpbGVkJyk7XG4gICAgICAgICAgICBlcnJvci50ZXh0UGF0Y2hGYWlsZWQgPSB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0c1swXTtcbiAgICAgIH1cbiAgICB9O1xuICB9XG4gIHJldHVybiBjYWNoZWREaWZmUGF0Y2g7XG59O1xuXG52YXIgZGlmZkZpbHRlciA9IGZ1bmN0aW9uIHRleHRzRGlmZkZpbHRlcihjb250ZXh0KSB7XG4gIGlmIChjb250ZXh0LmxlZnRUeXBlICE9PSAnc3RyaW5nJykge1xuICAgIHJldHVybjtcbiAgfVxuICB2YXIgbWluTGVuZ3RoID0gKGNvbnRleHQub3B0aW9ucyAmJiBjb250ZXh0Lm9wdGlvbnMudGV4dERpZmYgJiZcbiAgICBjb250ZXh0Lm9wdGlvbnMudGV4dERpZmYubWluTGVuZ3RoKSB8fCBERUZBVUxUX01JTl9MRU5HVEg7XG4gIGlmIChjb250ZXh0LmxlZnQubGVuZ3RoIDwgbWluTGVuZ3RoIHx8XG4gICAgY29udGV4dC5yaWdodC5sZW5ndGggPCBtaW5MZW5ndGgpIHtcbiAgICBjb250ZXh0LnNldFJlc3VsdChbY29udGV4dC5sZWZ0LCBjb250ZXh0LnJpZ2h0XSkuZXhpdCgpO1xuICAgIHJldHVybjtcbiAgfVxuICAvLyBsYXJnZSB0ZXh0LCB1c2UgYSB0ZXh0LWRpZmYgYWxnb3JpdGhtXG4gIHZhciBkaWZmID0gZ2V0RGlmZk1hdGNoUGF0Y2goKS5kaWZmO1xuICBjb250ZXh0LnNldFJlc3VsdChbZGlmZihjb250ZXh0LmxlZnQsIGNvbnRleHQucmlnaHQpLCAwLCBURVhUX0RJRkZdKS5leGl0KCk7XG59O1xuZGlmZkZpbHRlci5maWx0ZXJOYW1lID0gJ3RleHRzJztcblxudmFyIHBhdGNoRmlsdGVyID0gZnVuY3Rpb24gdGV4dHNQYXRjaEZpbHRlcihjb250ZXh0KSB7XG4gIGlmIChjb250ZXh0Lm5lc3RlZCkge1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAoY29udGV4dC5kZWx0YVsyXSAhPT0gVEVYVF9ESUZGKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLy8gdGV4dC1kaWZmLCB1c2UgYSB0ZXh0LXBhdGNoIGFsZ29yaXRobVxuICB2YXIgcGF0Y2ggPSBnZXREaWZmTWF0Y2hQYXRjaCgpLnBhdGNoO1xuICBjb250ZXh0LnNldFJlc3VsdChwYXRjaChjb250ZXh0LmxlZnQsIGNvbnRleHQuZGVsdGFbMF0pKS5leGl0KCk7XG59O1xucGF0Y2hGaWx0ZXIuZmlsdGVyTmFtZSA9ICd0ZXh0cyc7XG5cbnZhciB0ZXh0RGVsdGFSZXZlcnNlID0gZnVuY3Rpb24oZGVsdGEpIHtcbiAgdmFyIGksIGwsIGxpbmVzLCBsaW5lLCBsaW5lVG1wLCBoZWFkZXIgPSBudWxsLFxuICAgIGhlYWRlclJlZ2V4ID0gL15AQCArXFwtKFxcZCspLChcXGQrKSArXFwrKFxcZCspLChcXGQrKSArQEAkLyxcbiAgICBsaW5lSGVhZGVyLCBsaW5lQWRkLCBsaW5lUmVtb3ZlO1xuICBsaW5lcyA9IGRlbHRhLnNwbGl0KCdcXG4nKTtcbiAgZm9yIChpID0gMCwgbCA9IGxpbmVzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgIGxpbmUgPSBsaW5lc1tpXTtcbiAgICB2YXIgbGluZVN0YXJ0ID0gbGluZS5zbGljZSgwLCAxKTtcbiAgICBpZiAobGluZVN0YXJ0ID09PSAnQCcpIHtcbiAgICAgIGhlYWRlciA9IGhlYWRlclJlZ2V4LmV4ZWMobGluZSk7XG4gICAgICBsaW5lSGVhZGVyID0gaTtcbiAgICAgIGxpbmVBZGQgPSBudWxsO1xuICAgICAgbGluZVJlbW92ZSA9IG51bGw7XG5cbiAgICAgIC8vIGZpeCBoZWFkZXJcbiAgICAgIGxpbmVzW2xpbmVIZWFkZXJdID0gJ0BAIC0nICsgaGVhZGVyWzNdICsgJywnICsgaGVhZGVyWzRdICsgJyArJyArIGhlYWRlclsxXSArICcsJyArIGhlYWRlclsyXSArICcgQEAnO1xuICAgIH0gZWxzZSBpZiAobGluZVN0YXJ0ID09PSAnKycpIHtcbiAgICAgIGxpbmVBZGQgPSBpO1xuICAgICAgbGluZXNbaV0gPSAnLScgKyBsaW5lc1tpXS5zbGljZSgxKTtcbiAgICAgIGlmIChsaW5lc1tpIC0gMV0uc2xpY2UoMCwgMSkgPT09ICcrJykge1xuICAgICAgICAvLyBzd2FwIGxpbmVzIHRvIGtlZXAgZGVmYXVsdCBvcmRlciAoLSspXG4gICAgICAgIGxpbmVUbXAgPSBsaW5lc1tpXTtcbiAgICAgICAgbGluZXNbaV0gPSBsaW5lc1tpIC0gMV07XG4gICAgICAgIGxpbmVzW2kgLSAxXSA9IGxpbmVUbXA7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChsaW5lU3RhcnQgPT09ICctJykge1xuICAgICAgbGluZVJlbW92ZSA9IGk7XG4gICAgICBsaW5lc1tpXSA9ICcrJyArIGxpbmVzW2ldLnNsaWNlKDEpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gbGluZXMuam9pbignXFxuJyk7XG59O1xuXG52YXIgcmV2ZXJzZUZpbHRlciA9IGZ1bmN0aW9uIHRleHRzUmV2ZXJzZUZpbHRlcihjb250ZXh0KSB7XG4gIGlmIChjb250ZXh0Lm5lc3RlZCkge1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAoY29udGV4dC5kZWx0YVsyXSAhPT0gVEVYVF9ESUZGKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLy8gdGV4dC1kaWZmLCB1c2UgYSB0ZXh0LWRpZmYgYWxnb3JpdGhtXG4gIGNvbnRleHQuc2V0UmVzdWx0KFt0ZXh0RGVsdGFSZXZlcnNlKGNvbnRleHQuZGVsdGFbMF0pLCAwLCBURVhUX0RJRkZdKS5leGl0KCk7XG59O1xucmV2ZXJzZUZpbHRlci5maWx0ZXJOYW1lID0gJ3RleHRzJztcblxuZXhwb3J0cy5kaWZmRmlsdGVyID0gZGlmZkZpbHRlcjtcbmV4cG9ydHMucGF0Y2hGaWx0ZXIgPSBwYXRjaEZpbHRlcjtcbmV4cG9ydHMucmV2ZXJzZUZpbHRlciA9IHJldmVyc2VGaWx0ZXI7XG4iLCJ2YXIgaXNBcnJheSA9ICh0eXBlb2YgQXJyYXkuaXNBcnJheSA9PT0gJ2Z1bmN0aW9uJykgP1xuICAvLyB1c2UgbmF0aXZlIGZ1bmN0aW9uXG4gIEFycmF5LmlzQXJyYXkgOlxuICAvLyB1c2UgaW5zdGFuY2VvZiBvcGVyYXRvclxuICBmdW5jdGlvbihhKSB7XG4gICAgcmV0dXJuIGEgaW5zdGFuY2VvZiBBcnJheTtcbiAgfTtcblxudmFyIGRpZmZGaWx0ZXIgPSBmdW5jdGlvbiB0cml2aWFsTWF0Y2hlc0RpZmZGaWx0ZXIoY29udGV4dCkge1xuICBpZiAoY29udGV4dC5sZWZ0ID09PSBjb250ZXh0LnJpZ2h0KSB7XG4gICAgY29udGV4dC5zZXRSZXN1bHQodW5kZWZpbmVkKS5leGl0KCk7XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmICh0eXBlb2YgY29udGV4dC5sZWZ0ID09PSAndW5kZWZpbmVkJykge1xuICAgIGlmICh0eXBlb2YgY29udGV4dC5yaWdodCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdmdW5jdGlvbnMgYXJlIG5vdCBzdXBwb3J0ZWQnKTtcbiAgICB9XG4gICAgY29udGV4dC5zZXRSZXN1bHQoW2NvbnRleHQucmlnaHRdKS5leGl0KCk7XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmICh0eXBlb2YgY29udGV4dC5yaWdodCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBjb250ZXh0LnNldFJlc3VsdChbY29udGV4dC5sZWZ0LCAwLCAwXSkuZXhpdCgpO1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAodHlwZW9mIGNvbnRleHQubGVmdCA9PT0gJ2Z1bmN0aW9uJyB8fCB0eXBlb2YgY29udGV4dC5yaWdodCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHRocm93IG5ldyBFcnJvcignZnVuY3Rpb25zIGFyZSBub3Qgc3VwcG9ydGVkJyk7XG4gIH1cbiAgY29udGV4dC5sZWZ0VHlwZSA9IGNvbnRleHQubGVmdCA9PT0gbnVsbCA/ICdudWxsJyA6IHR5cGVvZiBjb250ZXh0LmxlZnQ7XG4gIGNvbnRleHQucmlnaHRUeXBlID0gY29udGV4dC5yaWdodCA9PT0gbnVsbCA/ICdudWxsJyA6IHR5cGVvZiBjb250ZXh0LnJpZ2h0O1xuICBpZiAoY29udGV4dC5sZWZ0VHlwZSAhPT0gY29udGV4dC5yaWdodFR5cGUpIHtcbiAgICBjb250ZXh0LnNldFJlc3VsdChbY29udGV4dC5sZWZ0LCBjb250ZXh0LnJpZ2h0XSkuZXhpdCgpO1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAoY29udGV4dC5sZWZ0VHlwZSA9PT0gJ2Jvb2xlYW4nIHx8IGNvbnRleHQubGVmdFR5cGUgPT09ICdudW1iZXInKSB7XG4gICAgY29udGV4dC5zZXRSZXN1bHQoW2NvbnRleHQubGVmdCwgY29udGV4dC5yaWdodF0pLmV4aXQoKTtcbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKGNvbnRleHQubGVmdFR5cGUgPT09ICdvYmplY3QnKSB7XG4gICAgY29udGV4dC5sZWZ0SXNBcnJheSA9IGlzQXJyYXkoY29udGV4dC5sZWZ0KTtcbiAgfVxuICBpZiAoY29udGV4dC5yaWdodFR5cGUgPT09ICdvYmplY3QnKSB7XG4gICAgY29udGV4dC5yaWdodElzQXJyYXkgPSBpc0FycmF5KGNvbnRleHQucmlnaHQpO1xuICB9XG4gIGlmIChjb250ZXh0LmxlZnRJc0FycmF5ICE9PSBjb250ZXh0LnJpZ2h0SXNBcnJheSkge1xuICAgIGNvbnRleHQuc2V0UmVzdWx0KFtjb250ZXh0LmxlZnQsIGNvbnRleHQucmlnaHRdKS5leGl0KCk7XG4gICAgcmV0dXJuO1xuICB9XG59O1xuZGlmZkZpbHRlci5maWx0ZXJOYW1lID0gJ3RyaXZpYWwnO1xuXG52YXIgcGF0Y2hGaWx0ZXIgPSBmdW5jdGlvbiB0cml2aWFsTWF0Y2hlc1BhdGNoRmlsdGVyKGNvbnRleHQpIHtcbiAgaWYgKHR5cGVvZiBjb250ZXh0LmRlbHRhID09PSAndW5kZWZpbmVkJykge1xuICAgIGNvbnRleHQuc2V0UmVzdWx0KGNvbnRleHQubGVmdCkuZXhpdCgpO1xuICAgIHJldHVybjtcbiAgfVxuICBjb250ZXh0Lm5lc3RlZCA9ICFpc0FycmF5KGNvbnRleHQuZGVsdGEpO1xuICBpZiAoY29udGV4dC5uZXN0ZWQpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKGNvbnRleHQuZGVsdGEubGVuZ3RoID09PSAxKSB7XG4gICAgY29udGV4dC5zZXRSZXN1bHQoY29udGV4dC5kZWx0YVswXSkuZXhpdCgpO1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAoY29udGV4dC5kZWx0YS5sZW5ndGggPT09IDIpIHtcbiAgICBjb250ZXh0LnNldFJlc3VsdChjb250ZXh0LmRlbHRhWzFdKS5leGl0KCk7XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmIChjb250ZXh0LmRlbHRhLmxlbmd0aCA9PT0gMyAmJiBjb250ZXh0LmRlbHRhWzJdID09PSAwKSB7XG4gICAgY29udGV4dC5zZXRSZXN1bHQodW5kZWZpbmVkKS5leGl0KCk7XG4gICAgcmV0dXJuO1xuICB9XG59O1xucGF0Y2hGaWx0ZXIuZmlsdGVyTmFtZSA9ICd0cml2aWFsJztcblxudmFyIHJldmVyc2VGaWx0ZXIgPSBmdW5jdGlvbiB0cml2aWFsUmVmZXJzZUZpbHRlcihjb250ZXh0KSB7XG4gIGlmICh0eXBlb2YgY29udGV4dC5kZWx0YSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBjb250ZXh0LnNldFJlc3VsdChjb250ZXh0LmRlbHRhKS5leGl0KCk7XG4gICAgcmV0dXJuO1xuICB9XG4gIGNvbnRleHQubmVzdGVkID0gIWlzQXJyYXkoY29udGV4dC5kZWx0YSk7XG4gIGlmIChjb250ZXh0Lm5lc3RlZCkge1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAoY29udGV4dC5kZWx0YS5sZW5ndGggPT09IDEpIHtcbiAgICBjb250ZXh0LnNldFJlc3VsdChbY29udGV4dC5kZWx0YVswXSwgMCwgMF0pLmV4aXQoKTtcbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKGNvbnRleHQuZGVsdGEubGVuZ3RoID09PSAyKSB7XG4gICAgY29udGV4dC5zZXRSZXN1bHQoW2NvbnRleHQuZGVsdGFbMV0sIGNvbnRleHQuZGVsdGFbMF1dKS5leGl0KCk7XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmIChjb250ZXh0LmRlbHRhLmxlbmd0aCA9PT0gMyAmJiBjb250ZXh0LmRlbHRhWzJdID09PSAwKSB7XG4gICAgY29udGV4dC5zZXRSZXN1bHQoW2NvbnRleHQuZGVsdGFbMF1dKS5leGl0KCk7XG4gICAgcmV0dXJuO1xuICB9XG59O1xucmV2ZXJzZUZpbHRlci5maWx0ZXJOYW1lID0gJ3RyaXZpYWwnO1xuXG5leHBvcnRzLmRpZmZGaWx0ZXIgPSBkaWZmRmlsdGVyO1xuZXhwb3J0cy5wYXRjaEZpbHRlciA9IHBhdGNoRmlsdGVyO1xuZXhwb3J0cy5yZXZlcnNlRmlsdGVyID0gcmV2ZXJzZUZpbHRlcjtcbiIsInZhciBQaXBlID0gZnVuY3Rpb24gUGlwZShuYW1lKSB7XG4gIHRoaXMubmFtZSA9IG5hbWU7XG4gIHRoaXMuZmlsdGVycyA9IFtdO1xufTtcblxuUGlwZS5wcm90b3R5cGUucHJvY2VzcyA9IGZ1bmN0aW9uKGlucHV0KSB7XG4gIGlmICghdGhpcy5wcm9jZXNzb3IpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2FkZCB0aGlzIHBpcGUgdG8gYSBwcm9jZXNzb3IgYmVmb3JlIHVzaW5nIGl0Jyk7XG4gIH1cbiAgdmFyIGRlYnVnID0gdGhpcy5kZWJ1ZztcbiAgdmFyIGxlbmd0aCA9IHRoaXMuZmlsdGVycy5sZW5ndGg7XG4gIHZhciBjb250ZXh0ID0gaW5wdXQ7XG4gIGZvciAodmFyIGluZGV4ID0gMDsgaW5kZXggPCBsZW5ndGg7IGluZGV4KyspIHtcbiAgICB2YXIgZmlsdGVyID0gdGhpcy5maWx0ZXJzW2luZGV4XTtcbiAgICBpZiAoZGVidWcpIHtcbiAgICAgIHRoaXMubG9nKCdmaWx0ZXI6ICcgKyBmaWx0ZXIuZmlsdGVyTmFtZSk7XG4gICAgfVxuICAgIGZpbHRlcihjb250ZXh0KTtcbiAgICBpZiAodHlwZW9mIGNvbnRleHQgPT09ICdvYmplY3QnICYmIGNvbnRleHQuZXhpdGluZykge1xuICAgICAgY29udGV4dC5leGl0aW5nID0gZmFsc2U7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cbiAgaWYgKCFjb250ZXh0Lm5leHQgJiYgdGhpcy5yZXN1bHRDaGVjaykge1xuICAgIHRoaXMucmVzdWx0Q2hlY2soY29udGV4dCk7XG4gIH1cbn07XG5cblBpcGUucHJvdG90eXBlLmxvZyA9IGZ1bmN0aW9uKG1zZykge1xuICBjb25zb2xlLmxvZygnW2pzb25kaWZmcGF0Y2hdICcgKyB0aGlzLm5hbWUgKyAnIHBpcGUsICcgKyBtc2cpO1xufTtcblxuUGlwZS5wcm90b3R5cGUuYXBwZW5kID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMuZmlsdGVycy5wdXNoLmFwcGx5KHRoaXMuZmlsdGVycywgYXJndW1lbnRzKTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5QaXBlLnByb3RvdHlwZS5wcmVwZW5kID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMuZmlsdGVycy51bnNoaWZ0LmFwcGx5KHRoaXMuZmlsdGVycywgYXJndW1lbnRzKTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5QaXBlLnByb3RvdHlwZS5pbmRleE9mID0gZnVuY3Rpb24oZmlsdGVyTmFtZSkge1xuICBpZiAoIWZpbHRlck5hbWUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2EgZmlsdGVyIG5hbWUgaXMgcmVxdWlyZWQnKTtcbiAgfVxuICBmb3IgKHZhciBpbmRleCA9IDA7IGluZGV4IDwgdGhpcy5maWx0ZXJzLmxlbmd0aDsgaW5kZXgrKykge1xuICAgIHZhciBmaWx0ZXIgPSB0aGlzLmZpbHRlcnNbaW5kZXhdO1xuICAgIGlmIChmaWx0ZXIuZmlsdGVyTmFtZSA9PT0gZmlsdGVyTmFtZSkge1xuICAgICAgcmV0dXJuIGluZGV4O1xuICAgIH1cbiAgfVxuICB0aHJvdyBuZXcgRXJyb3IoJ2ZpbHRlciBub3QgZm91bmQ6ICcgKyBmaWx0ZXJOYW1lKTtcbn07XG5cblBpcGUucHJvdG90eXBlLmxpc3QgPSBmdW5jdGlvbigpIHtcbiAgdmFyIG5hbWVzID0gW107XG4gIGZvciAodmFyIGluZGV4ID0gMDsgaW5kZXggPCB0aGlzLmZpbHRlcnMubGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgdmFyIGZpbHRlciA9IHRoaXMuZmlsdGVyc1tpbmRleF07XG4gICAgbmFtZXMucHVzaChmaWx0ZXIuZmlsdGVyTmFtZSk7XG4gIH1cbiAgcmV0dXJuIG5hbWVzO1xufTtcblxuUGlwZS5wcm90b3R5cGUuYWZ0ZXIgPSBmdW5jdGlvbihmaWx0ZXJOYW1lKSB7XG4gIHZhciBpbmRleCA9IHRoaXMuaW5kZXhPZihmaWx0ZXJOYW1lKTtcbiAgdmFyIHBhcmFtcyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSk7XG4gIGlmICghcGFyYW1zLmxlbmd0aCkge1xuICAgIHRocm93IG5ldyBFcnJvcignYSBmaWx0ZXIgaXMgcmVxdWlyZWQnKTtcbiAgfVxuICBwYXJhbXMudW5zaGlmdChpbmRleCArIDEsIDApO1xuICBBcnJheS5wcm90b3R5cGUuc3BsaWNlLmFwcGx5KHRoaXMuZmlsdGVycywgcGFyYW1zKTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5QaXBlLnByb3RvdHlwZS5iZWZvcmUgPSBmdW5jdGlvbihmaWx0ZXJOYW1lKSB7XG4gIHZhciBpbmRleCA9IHRoaXMuaW5kZXhPZihmaWx0ZXJOYW1lKTtcbiAgdmFyIHBhcmFtcyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSk7XG4gIGlmICghcGFyYW1zLmxlbmd0aCkge1xuICAgIHRocm93IG5ldyBFcnJvcignYSBmaWx0ZXIgaXMgcmVxdWlyZWQnKTtcbiAgfVxuICBwYXJhbXMudW5zaGlmdChpbmRleCwgMCk7XG4gIEFycmF5LnByb3RvdHlwZS5zcGxpY2UuYXBwbHkodGhpcy5maWx0ZXJzLCBwYXJhbXMpO1xuICByZXR1cm4gdGhpcztcbn07XG5cblBpcGUucHJvdG90eXBlLmNsZWFyID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMuZmlsdGVycy5sZW5ndGggPSAwO1xuICByZXR1cm4gdGhpcztcbn07XG5cblBpcGUucHJvdG90eXBlLnNob3VsZEhhdmVSZXN1bHQgPSBmdW5jdGlvbihzaG91bGQpIHtcbiAgaWYgKHNob3VsZCA9PT0gZmFsc2UpIHtcbiAgICB0aGlzLnJlc3VsdENoZWNrID0gbnVsbDtcbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKHRoaXMucmVzdWx0Q2hlY2spIHtcbiAgICByZXR1cm47XG4gIH1cbiAgdmFyIHBpcGUgPSB0aGlzO1xuICB0aGlzLnJlc3VsdENoZWNrID0gZnVuY3Rpb24oY29udGV4dCkge1xuICAgIGlmICghY29udGV4dC5oYXNSZXN1bHQpIHtcbiAgICAgIGNvbnNvbGUubG9nKGNvbnRleHQpO1xuICAgICAgdmFyIGVycm9yID0gbmV3IEVycm9yKHBpcGUubmFtZSArICcgZmFpbGVkJyk7XG4gICAgICBlcnJvci5ub1Jlc3VsdCA9IHRydWU7XG4gICAgICB0aHJvdyBlcnJvcjtcbiAgICB9XG4gIH07XG4gIHJldHVybiB0aGlzO1xufTtcblxuZXhwb3J0cy5QaXBlID0gUGlwZTtcbiIsIlxudmFyIFByb2Nlc3NvciA9IGZ1bmN0aW9uIFByb2Nlc3NvcihvcHRpb25zKXtcblx0dGhpcy5zZWxmT3B0aW9ucyA9IG9wdGlvbnM7XG5cdHRoaXMucGlwZXMgPSB7fTtcbn07XG5cblByb2Nlc3Nvci5wcm90b3R5cGUub3B0aW9ucyA9IGZ1bmN0aW9uKG9wdGlvbnMpIHtcblx0aWYgKG9wdGlvbnMpIHtcblx0XHR0aGlzLnNlbGZPcHRpb25zID0gb3B0aW9ucztcblx0fVxuXHRyZXR1cm4gdGhpcy5zZWxmT3B0aW9ucztcbn07XG5cblByb2Nlc3Nvci5wcm90b3R5cGUucGlwZSA9IGZ1bmN0aW9uKG5hbWUsIHBpcGUpIHtcblx0aWYgKHR5cGVvZiBuYW1lID09PSAnc3RyaW5nJykge1xuXHRcdGlmICh0eXBlb2YgcGlwZSA9PT0gJ3VuZGVmaW5lZCcpIHtcblx0XHRcdHJldHVybiB0aGlzLnBpcGVzW25hbWVdO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aGlzLnBpcGVzW25hbWVdID0gcGlwZTtcblx0XHR9XG5cdH1cblx0aWYgKG5hbWUgJiYgbmFtZS5uYW1lKSB7XG5cdFx0cGlwZSA9IG5hbWU7XG5cdFx0aWYgKHBpcGUucHJvY2Vzc29yID09PSB0aGlzKSB7IHJldHVybiBwaXBlOyB9XG5cdFx0dGhpcy5waXBlc1twaXBlLm5hbWVdID0gcGlwZTtcblx0fVxuXHRwaXBlLnByb2Nlc3NvciA9IHRoaXM7XG5cdHJldHVybiBwaXBlO1xufTtcblxuUHJvY2Vzc29yLnByb3RvdHlwZS5wcm9jZXNzID0gZnVuY3Rpb24oaW5wdXQsIHBpcGUpIHtcblx0dmFyIGNvbnRleHQgPSBpbnB1dDtcblx0Y29udGV4dC5vcHRpb25zID0gdGhpcy5vcHRpb25zKCk7XG5cdHZhciBuZXh0UGlwZSA9IHBpcGUgfHwgaW5wdXQucGlwZSB8fCAnZGVmYXVsdCc7XG5cdHZhciBsYXN0UGlwZSwgbGFzdENvbnRleHQ7XG5cdHdoaWxlIChuZXh0UGlwZSkge1xuXHRcdGlmICh0eXBlb2YgY29udGV4dC5uZXh0QWZ0ZXJDaGlsZHJlbiAhPT0gJ3VuZGVmaW5lZCcpIHtcblx0XHRcdC8vIGNoaWxkcmVuIHByb2Nlc3NlZCBhbmQgY29taW5nIGJhY2sgdG8gcGFyZW50XG5cdFx0XHRjb250ZXh0Lm5leHQgPSBjb250ZXh0Lm5leHRBZnRlckNoaWxkcmVuO1xuXHRcdFx0Y29udGV4dC5uZXh0QWZ0ZXJDaGlsZHJlbiA9IG51bGw7XG5cdFx0fVxuXG5cdFx0aWYgKHR5cGVvZiBuZXh0UGlwZSA9PT0gJ3N0cmluZycpIHtcblx0XHRcdG5leHRQaXBlID0gdGhpcy5waXBlKG5leHRQaXBlKTtcblx0XHR9XG5cdFx0bmV4dFBpcGUucHJvY2Vzcyhjb250ZXh0KTtcblx0XHRsYXN0Q29udGV4dCA9IGNvbnRleHQ7XG5cdFx0bGFzdFBpcGUgPSBuZXh0UGlwZTtcblx0XHRuZXh0UGlwZSA9IG51bGw7XG5cdFx0aWYgKGNvbnRleHQpIHtcblx0XHRcdGlmIChjb250ZXh0Lm5leHQpIHtcblx0XHRcdFx0Y29udGV4dCA9IGNvbnRleHQubmV4dDtcblx0XHRcdFx0bmV4dFBpcGUgPSBsYXN0Q29udGV4dC5uZXh0UGlwZSB8fCBjb250ZXh0LnBpcGUgfHwgbGFzdFBpcGU7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cdHJldHVybiBjb250ZXh0Lmhhc1Jlc3VsdCA/IGNvbnRleHQucmVzdWx0IDogdW5kZWZpbmVkO1xufTtcblxuZXhwb3J0cy5Qcm9jZXNzb3IgPSBQcm9jZXNzb3I7XG4iXX0=
