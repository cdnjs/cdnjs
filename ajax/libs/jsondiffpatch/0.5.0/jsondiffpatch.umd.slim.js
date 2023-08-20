(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('./empty'), require('./empty')) :
  typeof define === 'function' && define.amd ? define(['exports', './empty', './empty'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.jsondiffpatch = {}, global["diff-match-patch"], global.chalk));
})(this, (function (exports, dmp, chalk) { 'use strict';

  class Processor {
    constructor(options) {
      this.selfOptions = options || {};
      this.pipes = {};
    }
    options(options) {
      if (options) {
        this.selfOptions = options;
      }
      return this.selfOptions;
    }
    pipe(name, pipeArg) {
      let pipe = pipeArg;
      if (typeof name === 'string') {
        if (typeof pipe === 'undefined') {
          return this.pipes[name];
        } else {
          this.pipes[name] = pipe;
        }
      }
      if (name && name.name) {
        pipe = name;
        if (pipe.processor === this) {
          return pipe;
        }
        this.pipes[pipe.name] = pipe;
      }
      pipe.processor = this;
      return pipe;
    }
    process(input, pipe) {
      let context = input;
      context.options = this.options();
      let nextPipe = pipe || input.pipe || 'default';
      let lastPipe;
      let lastContext;
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
    }
  }

  class Pipe {
    constructor(name) {
      this.name = name;
      this.filters = [];
    }
    process(input) {
      if (!this.processor) {
        throw new Error('add this pipe to a processor before using it');
      }
      const debug = this.debug;
      const length = this.filters.length;
      const context = input;
      for (let index = 0; index < length; index++) {
        const filter = this.filters[index];
        if (debug) {
          this.log(`filter: ${filter.filterName}`);
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
    }
    log(msg) {
      console.log(`[jsondiffpatch] ${this.name} pipe, ${msg}`);
    }
    append() {
      this.filters.push(...arguments);
      return this;
    }
    prepend() {
      this.filters.unshift(...arguments);
      return this;
    }
    indexOf(filterName) {
      if (!filterName) {
        throw new Error('a filter name is required');
      }
      for (let index = 0; index < this.filters.length; index++) {
        const filter = this.filters[index];
        if (filter.filterName === filterName) {
          return index;
        }
      }
      throw new Error(`filter not found: ${filterName}`);
    }
    list() {
      return this.filters.map(f => f.filterName);
    }
    after(filterName) {
      const index = this.indexOf(filterName);
      const params = Array.prototype.slice.call(arguments, 1);
      if (!params.length) {
        throw new Error('a filter is required');
      }
      params.unshift(index + 1, 0);
      Array.prototype.splice.apply(this.filters, params);
      return this;
    }
    before(filterName) {
      const index = this.indexOf(filterName);
      const params = Array.prototype.slice.call(arguments, 1);
      if (!params.length) {
        throw new Error('a filter is required');
      }
      params.unshift(index, 0);
      Array.prototype.splice.apply(this.filters, params);
      return this;
    }
    replace(filterName) {
      const index = this.indexOf(filterName);
      const params = Array.prototype.slice.call(arguments, 1);
      if (!params.length) {
        throw new Error('a filter is required');
      }
      params.unshift(index, 1);
      Array.prototype.splice.apply(this.filters, params);
      return this;
    }
    remove(filterName) {
      const index = this.indexOf(filterName);
      this.filters.splice(index, 1);
      return this;
    }
    clear() {
      this.filters.length = 0;
      return this;
    }
    shouldHaveResult(should) {
      if (should === false) {
        this.resultCheck = null;
        return;
      }
      if (this.resultCheck) {
        return;
      }
      const pipe = this;
      this.resultCheck = context => {
        if (!context.hasResult) {
          console.log(context);
          const error = new Error(`${pipe.name} failed`);
          error.noResult = true;
          throw error;
        }
      };
      return this;
    }
  }

  class Context {
    setResult(result) {
      this.result = result;
      this.hasResult = true;
      return this;
    }
    exit() {
      this.exiting = true;
      return this;
    }
    switchTo(next, pipe) {
      if (typeof next === 'string' || next instanceof Pipe) {
        this.nextPipe = next;
      } else {
        this.next = next;
        if (pipe) {
          this.nextPipe = pipe;
        }
      }
      return this;
    }
    push(child, name) {
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
    }
  }

  const isArray$3 = typeof Array.isArray === 'function' ? Array.isArray : a => a instanceof Array;
  function cloneRegExp(re) {
    const regexMatch = /^\/(.*)\/([gimyu]*)$/.exec(re.toString());
    return new RegExp(regexMatch[1], regexMatch[2]);
  }
  function clone$1(arg) {
    if (typeof arg !== 'object') {
      return arg;
    }
    if (arg === null) {
      return null;
    }
    if (isArray$3(arg)) {
      return arg.map(clone$1);
    }
    if (arg instanceof Date) {
      return new Date(arg.getTime());
    }
    if (arg instanceof RegExp) {
      return cloneRegExp(arg);
    }
    const cloned = {};
    for (const name in arg) {
      if (Object.prototype.hasOwnProperty.call(arg, name)) {
        cloned[name] = clone$1(arg[name]);
      }
    }
    return cloned;
  }

  class DiffContext extends Context {
    constructor(left, right) {
      super();
      this.left = left;
      this.right = right;
      this.pipe = 'diff';
    }
    setResult(result) {
      if (this.options.cloneDiffValues && typeof result === 'object') {
        const clone = typeof this.options.cloneDiffValues === 'function' ? this.options.cloneDiffValues : clone$1;
        if (typeof result[0] === 'object') {
          result[0] = clone(result[0]);
        }
        if (typeof result[1] === 'object') {
          result[1] = clone(result[1]);
        }
      }
      return Context.prototype.setResult.apply(this, arguments);
    }
  }

  class PatchContext extends Context {
    constructor(left, delta) {
      super();
      this.left = left;
      this.delta = delta;
      this.pipe = 'patch';
    }
  }

  class ReverseContext extends Context {
    constructor(delta) {
      super();
      this.delta = delta;
      this.pipe = 'reverse';
    }
  }

  const isArray$2 = typeof Array.isArray === 'function' ? Array.isArray : function (a) {
    return a instanceof Array;
  };
  const diffFilter$3 = function trivialMatchesDiffFilter(context) {
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
      context.leftIsArray = isArray$2(context.left);
    }
    if (context.rightType === 'object') {
      context.rightIsArray = isArray$2(context.right);
    }
    if (context.leftIsArray !== context.rightIsArray) {
      context.setResult([context.left, context.right]).exit();
      return;
    }
    if (context.left instanceof RegExp) {
      if (context.right instanceof RegExp) {
        context.setResult([context.left.toString(), context.right.toString()]).exit();
      } else {
        context.setResult([context.left, context.right]).exit();
      }
    }
  };
  diffFilter$3.filterName = 'trivial';
  const patchFilter$3 = function trivialMatchesPatchFilter(context) {
    if (typeof context.delta === 'undefined') {
      context.setResult(context.left).exit();
      return;
    }
    context.nested = !isArray$2(context.delta);
    if (context.nested) {
      return;
    }
    if (context.delta.length === 1) {
      context.setResult(context.delta[0]).exit();
      return;
    }
    if (context.delta.length === 2) {
      if (context.left instanceof RegExp) {
        const regexArgs = /^\/(.*)\/([gimyu]+)$/.exec(context.delta[1]);
        if (regexArgs) {
          context.setResult(new RegExp(regexArgs[1], regexArgs[2])).exit();
          return;
        }
      }
      context.setResult(context.delta[1]).exit();
      return;
    }
    if (context.delta.length === 3 && context.delta[2] === 0) {
      context.setResult(undefined).exit();
    }
  };
  patchFilter$3.filterName = 'trivial';
  const reverseFilter$3 = function trivialReferseFilter(context) {
    if (typeof context.delta === 'undefined') {
      context.setResult(context.delta).exit();
      return;
    }
    context.nested = !isArray$2(context.delta);
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
    }
  };
  reverseFilter$3.filterName = 'trivial';

  function collectChildrenDiffFilter(context) {
    if (!context || !context.children) {
      return;
    }
    const length = context.children.length;
    let child;
    let result = context.result;
    for (let index = 0; index < length; index++) {
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
  }
  collectChildrenDiffFilter.filterName = 'collectChildren';
  function objectsDiffFilter(context) {
    if (context.leftIsArray || context.leftType !== 'object') {
      return;
    }
    let name;
    let child;
    const propertyFilter = context.options.propertyFilter;
    for (name in context.left) {
      if (!Object.prototype.hasOwnProperty.call(context.left, name)) {
        continue;
      }
      if (propertyFilter && !propertyFilter(name, context)) {
        continue;
      }
      child = new DiffContext(context.left[name], context.right[name]);
      context.push(child, name);
    }
    for (name in context.right) {
      if (!Object.prototype.hasOwnProperty.call(context.right, name)) {
        continue;
      }
      if (propertyFilter && !propertyFilter(name, context)) {
        continue;
      }
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
  }
  objectsDiffFilter.filterName = 'objects';
  const patchFilter$2 = function nestedPatchFilter(context) {
    if (!context.nested) {
      return;
    }
    if (context.delta._t) {
      return;
    }
    let name;
    let child;
    for (name in context.delta) {
      child = new PatchContext(context.left[name], context.delta[name]);
      context.push(child, name);
    }
    context.exit();
  };
  patchFilter$2.filterName = 'objects';
  const collectChildrenPatchFilter$1 = function collectChildrenPatchFilter(context) {
    if (!context || !context.children) {
      return;
    }
    if (context.delta._t) {
      return;
    }
    const length = context.children.length;
    let child;
    for (let index = 0; index < length; index++) {
      child = context.children[index];
      if (Object.prototype.hasOwnProperty.call(context.left, child.childName) && child.result === undefined) {
        delete context.left[child.childName];
      } else if (context.left[child.childName] !== child.result) {
        context.left[child.childName] = child.result;
      }
    }
    context.setResult(context.left).exit();
  };
  collectChildrenPatchFilter$1.filterName = 'collectChildren';
  const reverseFilter$2 = function nestedReverseFilter(context) {
    if (!context.nested) {
      return;
    }
    if (context.delta._t) {
      return;
    }
    let name;
    let child;
    for (name in context.delta) {
      child = new ReverseContext(context.delta[name]);
      context.push(child, name);
    }
    context.exit();
  };
  reverseFilter$2.filterName = 'objects';
  function collectChildrenReverseFilter$1(context) {
    if (!context || !context.children) {
      return;
    }
    if (context.delta._t) {
      return;
    }
    const length = context.children.length;
    let child;
    const delta = {};
    for (let index = 0; index < length; index++) {
      child = context.children[index];
      if (delta[child.childName] !== child.result) {
        delta[child.childName] = child.result;
      }
    }
    context.setResult(delta).exit();
  }
  collectChildrenReverseFilter$1.filterName = 'collectChildren';

  /*

  LCS implementation that supports arrays or strings

  reference: http://en.wikipedia.org/wiki/Longest_common_subsequence_problem

  */

  const defaultMatch = function (array1, array2, index1, index2) {
    return array1[index1] === array2[index2];
  };
  const lengthMatrix = function (array1, array2, match, context) {
    const len1 = array1.length;
    const len2 = array2.length;
    let x, y;

    // initialize empty matrix of len1+1 x len2+1
    const matrix = [len1 + 1];
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
  const backtrack = function (matrix, array1, array2, context) {
    let index1 = array1.length;
    let index2 = array2.length;
    const subsequence = {
      sequence: [],
      indices1: [],
      indices2: []
    };
    while (index1 !== 0 && index2 !== 0) {
      const sameLetter = matrix.match(array1, array2, index1 - 1, index2 - 1, context);
      if (sameLetter) {
        subsequence.sequence.unshift(array1[index1 - 1]);
        subsequence.indices1.unshift(index1 - 1);
        subsequence.indices2.unshift(index2 - 1);
        --index1;
        --index2;
      } else {
        const valueAtMatrixAbove = matrix[index1][index2 - 1];
        const valueAtMatrixLeft = matrix[index1 - 1][index2];
        if (valueAtMatrixAbove > valueAtMatrixLeft) {
          --index2;
        } else {
          --index1;
        }
      }
    }
    return subsequence;
  };
  const get = function (array1, array2, match, context) {
    const innerContext = context || {};
    const matrix = lengthMatrix(array1, array2, match || defaultMatch, innerContext);
    const result = backtrack(matrix, array1, array2, innerContext);
    if (typeof array1 === 'string' && typeof array2 === 'string') {
      result.sequence = result.sequence.join('');
    }
    return result;
  };
  var lcs = {
    get
  };

  const ARRAY_MOVE = 3;
  const isArray$1 = typeof Array.isArray === 'function' ? Array.isArray : a => a instanceof Array;
  const arrayIndexOf = typeof Array.prototype.indexOf === 'function' ? (array, item) => array.indexOf(item) : (array, item) => {
    const length = array.length;
    for (let i = 0; i < length; i++) {
      if (array[i] === item) {
        return i;
      }
    }
    return -1;
  };
  function arraysHaveMatchByRef(array1, array2, len1, len2) {
    for (let index1 = 0; index1 < len1; index1++) {
      const val1 = array1[index1];
      for (let index2 = 0; index2 < len2; index2++) {
        const val2 = array2[index2];
        if (index1 !== index2 && val1 === val2) {
          return true;
        }
      }
    }
  }
  function matchItems(array1, array2, index1, index2, context) {
    const value1 = array1[index1];
    const value2 = array2[index2];
    if (value1 === value2) {
      return true;
    }
    if (typeof value1 !== 'object' || typeof value2 !== 'object') {
      return false;
    }
    const objectHash = context.objectHash;
    if (!objectHash) {
      // no way to match objects was provided, try match by position
      return context.matchByPosition && index1 === index2;
    }
    let hash1;
    let hash2;
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
  }
  const diffFilter$2 = function arraysDiffFilter(context) {
    if (!context.leftIsArray) {
      return;
    }
    const matchContext = {
      objectHash: context.options && context.options.objectHash,
      matchByPosition: context.options && context.options.matchByPosition
    };
    let commonHead = 0;
    let commonTail = 0;
    let index;
    let index1;
    let index2;
    const array1 = context.left;
    const array2 = context.right;
    const len1 = array1.length;
    const len2 = array2.length;
    let child;
    if (len1 > 0 && len2 > 0 && !matchContext.objectHash && typeof matchContext.matchByPosition !== 'boolean') {
      matchContext.matchByPosition = !arraysHaveMatchByRef(array1, array2, len1, len2);
    }

    // separate common head
    while (commonHead < len1 && commonHead < len2 && matchItems(array1, array2, commonHead, commonHead, matchContext)) {
      index = commonHead;
      child = new DiffContext(context.left[index], context.right[index]);
      context.push(child, index);
      commonHead++;
    }
    // separate common tail
    while (commonTail + commonHead < len1 && commonTail + commonHead < len2 && matchItems(array1, array2, len1 - 1 - commonTail, len2 - 1 - commonTail, matchContext)) {
      index1 = len1 - 1 - commonTail;
      index2 = len2 - 1 - commonTail;
      child = new DiffContext(context.left[index1], context.right[index2]);
      context.push(child, index2);
      commonTail++;
    }
    let result;
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
        result[`_${index}`] = [array1[index], 0, 0];
      }
      context.setResult(result).exit();
      return;
    }
    // reset hash cache
    delete matchContext.hashCache1;
    delete matchContext.hashCache2;

    // diff is not trivial, find the LCS (Longest Common Subsequence)
    const trimmed1 = array1.slice(commonHead, len1 - commonTail);
    const trimmed2 = array2.slice(commonHead, len2 - commonTail);
    const seq = lcs.get(trimmed1, trimmed2, matchItems, matchContext);
    const removedItems = [];
    result = result || {
      _t: 'a'
    };
    for (index = commonHead; index < len1 - commonTail; index++) {
      if (arrayIndexOf(seq.indices1, index - commonHead) < 0) {
        // removed
        result[`_${index}`] = [array1[index], 0, 0];
        removedItems.push(index);
      }
    }
    let detectMove = true;
    if (context.options && context.options.arrays && context.options.arrays.detectMove === false) {
      detectMove = false;
    }
    let includeValueOnMove = false;
    if (context.options && context.options.arrays && context.options.arrays.includeValueOnMove) {
      includeValueOnMove = true;
    }
    const removedItemsLength = removedItems.length;
    for (index = commonHead; index < len2 - commonTail; index++) {
      const indexOnArray2 = arrayIndexOf(seq.indices2, index - commonHead);
      if (indexOnArray2 < 0) {
        // added, try to match with a removed item and register as position move
        let isMove = false;
        if (detectMove && removedItemsLength > 0) {
          for (let removeItemIndex1 = 0; removeItemIndex1 < removedItemsLength; removeItemIndex1++) {
            index1 = removedItems[removeItemIndex1];
            if (matchItems(trimmed1, trimmed2, index1 - commonHead, index - commonHead, matchContext)) {
              // store position move as: [originalValue, newPosition, ARRAY_MOVE]
              result[`_${index1}`].splice(1, 2, index, ARRAY_MOVE);
              if (!includeValueOnMove) {
                // don't include moved value on diff, to save bytes
                result[`_${index1}`][0] = '';
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
  diffFilter$2.filterName = 'arrays';
  const compare = {
    numerically(a, b) {
      return a - b;
    },
    numericallyBy(name) {
      return (a, b) => a[name] - b[name];
    }
  };
  const patchFilter$1 = function nestedPatchFilter(context) {
    if (!context.nested) {
      return;
    }
    if (context.delta._t !== 'a') {
      return;
    }
    let index;
    let index1;
    const delta = context.delta;
    const array = context.left;

    // first, separate removals, insertions and modifications
    let toRemove = [];
    let toInsert = [];
    const toModify = [];
    for (index in delta) {
      if (index !== '_t') {
        if (index[0] === '_') {
          // removed item from original array
          if (delta[index][2] === 0 || delta[index][2] === ARRAY_MOVE) {
            toRemove.push(parseInt(index.slice(1), 10));
          } else {
            throw new Error('only removal or move can be applied at original array indices,' + ` invalid diff type: ${delta[index][2]}`);
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
      const indexDiff = delta[`_${index1}`];
      const removedValue = array.splice(index1, 1)[0];
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
    const toInsertLength = toInsert.length;
    for (index = 0; index < toInsertLength; index++) {
      const insertion = toInsert[index];
      array.splice(insertion.index, 0, insertion.value);
    }

    // apply modifications
    const toModifyLength = toModify.length;
    let child;
    if (toModifyLength > 0) {
      for (index = 0; index < toModifyLength; index++) {
        const modification = toModify[index];
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
  patchFilter$1.filterName = 'arrays';
  const collectChildrenPatchFilter = function collectChildrenPatchFilter(context) {
    if (!context || !context.children) {
      return;
    }
    if (context.delta._t !== 'a') {
      return;
    }
    const length = context.children.length;
    let child;
    for (let index = 0; index < length; index++) {
      child = context.children[index];
      context.left[child.childName] = child.result;
    }
    context.setResult(context.left).exit();
  };
  collectChildrenPatchFilter.filterName = 'arraysCollectChildren';
  const reverseFilter$1 = function arraysReverseFilter(context) {
    if (!context.nested) {
      if (context.delta[2] === ARRAY_MOVE) {
        context.newName = `_${context.delta[1]}`;
        context.setResult([context.delta[0], parseInt(context.childName.substr(1), 10), ARRAY_MOVE]).exit();
      }
      return;
    }
    if (context.delta._t !== 'a') {
      return;
    }
    let name;
    let child;
    for (name in context.delta) {
      if (name === '_t') {
        continue;
      }
      child = new ReverseContext(context.delta[name]);
      context.push(child, name);
    }
    context.exit();
  };
  reverseFilter$1.filterName = 'arrays';
  const reverseArrayDeltaIndex = (delta, index, itemDelta) => {
    if (typeof index === 'string' && index[0] === '_') {
      return parseInt(index.substr(1), 10);
    } else if (isArray$1(itemDelta) && itemDelta[2] === 0) {
      return `_${index}`;
    }
    let reverseIndex = +index;
    for (const deltaIndex in delta) {
      const deltaItem = delta[deltaIndex];
      if (isArray$1(deltaItem)) {
        if (deltaItem[2] === ARRAY_MOVE) {
          const moveFromIndex = parseInt(deltaIndex.substr(1), 10);
          const moveToIndex = deltaItem[1];
          if (moveToIndex === +index) {
            return moveFromIndex;
          }
          if (moveFromIndex <= reverseIndex && moveToIndex > reverseIndex) {
            reverseIndex++;
          } else if (moveFromIndex >= reverseIndex && moveToIndex < reverseIndex) {
            reverseIndex--;
          }
        } else if (deltaItem[2] === 0) {
          const deleteIndex = parseInt(deltaIndex.substr(1), 10);
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
  function collectChildrenReverseFilter(context) {
    if (!context || !context.children) {
      return;
    }
    if (context.delta._t !== 'a') {
      return;
    }
    const length = context.children.length;
    let child;
    const delta = {
      _t: 'a'
    };
    for (let index = 0; index < length; index++) {
      child = context.children[index];
      let name = child.newName;
      if (typeof name === 'undefined') {
        name = reverseArrayDeltaIndex(context.delta, child.childName, child.result);
      }
      if (delta[name] !== child.result) {
        delta[name] = child.result;
      }
    }
    context.setResult(delta).exit();
  }
  collectChildrenReverseFilter.filterName = 'arraysCollectChildren';

  const diffFilter$1 = function datesDiffFilter(context) {
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
  diffFilter$1.filterName = 'dates';

  /* global diff_match_patch */
  const TEXT_DIFF = 2;
  const DEFAULT_MIN_LENGTH = 60;
  let cachedDiffPatch = null;
  const getDiffMatchPatch = function (required) {
    /* jshint camelcase: false */

    if (!cachedDiffPatch) {
      let instance;
      /* eslint-disable camelcase, new-cap */
      if (typeof diff_match_patch !== 'undefined') {
        // already loaded, probably a browser
        instance = typeof diff_match_patch === 'function' ? new diff_match_patch() : new diff_match_patch.diff_match_patch();
      } else if (dmp) {
        try {
          instance = dmp && new dmp();
        } catch (err) {
          instance = null;
        }
      }
      /* eslint-enable camelcase, new-cap */
      if (!instance) {
        if (!required) {
          return null;
        }
        const error = new Error('text diff_match_patch library not found');
        // eslint-disable-next-line camelcase
        error.diff_match_patch_not_found = true;
        throw error;
      }
      cachedDiffPatch = {
        diff: function (txt1, txt2) {
          return instance.patch_toText(instance.patch_make(txt1, txt2));
        },
        patch: function (txt1, patch) {
          const results = instance.patch_apply(instance.patch_fromText(patch), txt1);
          for (let i = 0; i < results[1].length; i++) {
            if (!results[1][i]) {
              const error = new Error('text patch failed');
              error.textPatchFailed = true;
            }
          }
          return results[0];
        }
      };
    }
    return cachedDiffPatch;
  };
  const diffFilter = function textsDiffFilter(context) {
    if (context.leftType !== 'string') {
      return;
    }
    const minLength = context.options && context.options.textDiff && context.options.textDiff.minLength || DEFAULT_MIN_LENGTH;
    if (context.left.length < minLength || context.right.length < minLength) {
      context.setResult([context.left, context.right]).exit();
      return;
    }
    // large text, try to use a text-diff algorithm
    const diffMatchPatch = getDiffMatchPatch();
    if (!diffMatchPatch) {
      // diff-match-patch library not available,
      // fallback to regular string replace
      context.setResult([context.left, context.right]).exit();
      return;
    }
    const diff = diffMatchPatch.diff;
    context.setResult([diff(context.left, context.right), 0, TEXT_DIFF]).exit();
  };
  diffFilter.filterName = 'texts';
  const patchFilter = function textsPatchFilter(context) {
    if (context.nested) {
      return;
    }
    if (context.delta[2] !== TEXT_DIFF) {
      return;
    }

    // text-diff, use a text-patch algorithm
    const patch = getDiffMatchPatch(true).patch;
    context.setResult(patch(context.left, context.delta[0])).exit();
  };
  patchFilter.filterName = 'texts';
  const textDeltaReverse = function (delta) {
    let i;
    let l;
    let line;
    let lineTmp;
    let header = null;
    const headerRegex = /^@@ +-(\d+),(\d+) +\+(\d+),(\d+) +@@$/;
    let lineHeader;
    const lines = delta.split('\n');
    for (i = 0, l = lines.length; i < l; i++) {
      line = lines[i];
      const lineStart = line.slice(0, 1);
      if (lineStart === '@') {
        header = headerRegex.exec(line);
        lineHeader = i;

        // fix header
        lines[lineHeader] = '@@ -' + header[3] + ',' + header[4] + ' +' + header[1] + ',' + header[2] + ' @@';
      } else if (lineStart === '+') {
        lines[i] = '-' + lines[i].slice(1);
        if (lines[i - 1].slice(0, 1) === '+') {
          // swap lines to keep default order (-+)
          lineTmp = lines[i];
          lines[i] = lines[i - 1];
          lines[i - 1] = lineTmp;
        }
      } else if (lineStart === '-') {
        lines[i] = '+' + lines[i].slice(1);
      }
    }
    return lines.join('\n');
  };
  const reverseFilter = function textsReverseFilter(context) {
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

  class DiffPatcher {
    constructor(options) {
      this.processor = new Processor(options);
      this.processor.pipe(new Pipe('diff').append(collectChildrenDiffFilter, diffFilter$3, diffFilter$1, diffFilter, objectsDiffFilter, diffFilter$2).shouldHaveResult());
      this.processor.pipe(new Pipe('patch').append(collectChildrenPatchFilter$1, collectChildrenPatchFilter, patchFilter$3, patchFilter, patchFilter$2, patchFilter$1).shouldHaveResult());
      this.processor.pipe(new Pipe('reverse').append(collectChildrenReverseFilter$1, collectChildrenReverseFilter, reverseFilter$3, reverseFilter, reverseFilter$2, reverseFilter$1).shouldHaveResult());
    }
    options() {
      return this.processor.options(...arguments);
    }
    diff(left, right) {
      return this.processor.process(new DiffContext(left, right));
    }
    patch(left, delta) {
      return this.processor.process(new PatchContext(left, delta));
    }
    reverse(delta) {
      return this.processor.process(new ReverseContext(delta));
    }
    unpatch(right, delta) {
      return this.patch(right, this.reverse(delta));
    }
    clone(value) {
      return clone$1(value);
    }
  }

  const isArray = typeof Array.isArray === 'function' ? Array.isArray : a => a instanceof Array;
  const getObjectKeys = typeof Object.keys === 'function' ? obj => Object.keys(obj) : obj => {
    const names = [];
    for (const property in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, property)) {
        names.push(property);
      }
    }
    return names;
  };
  const trimUnderscore = str => {
    if (str.substr(0, 1) === '_') {
      return str.slice(1);
    }
    return str;
  };
  const arrayKeyToSortNumber = key => {
    if (key === '_t') {
      return -1;
    } else {
      if (key.substr(0, 1) === '_') {
        return parseInt(key.slice(1), 10);
      } else {
        return parseInt(key, 10) + 0.1;
      }
    }
  };
  const arrayKeyComparer = (key1, key2) => arrayKeyToSortNumber(key1) - arrayKeyToSortNumber(key2);
  class BaseFormatter {
    format(delta, left) {
      const context = {};
      this.prepareContext(context);
      this.recurse(context, delta, left);
      return this.finalize(context);
    }
    prepareContext(context) {
      context.buffer = [];
      context.out = function () {
        this.buffer.push(...arguments);
      };
    }
    typeFormattterNotFound(context, deltaType) {
      throw new Error(`cannot format delta type: ${deltaType}`);
    }
    typeFormattterErrorFormatter(context, err) {
      return err.toString();
    }
    finalize(_ref) {
      let {
        buffer
      } = _ref;
      if (isArray(buffer)) {
        return buffer.join('');
      }
    }
    recurse(context, delta, left, key, leftKey, movedFrom, isLast) {
      const useMoveOriginHere = delta && movedFrom;
      const leftValue = useMoveOriginHere ? movedFrom.value : left;
      if (typeof delta === 'undefined' && typeof key === 'undefined') {
        return undefined;
      }
      const type = this.getDeltaType(delta, movedFrom);
      const nodeType = type === 'node' ? delta._t === 'a' ? 'array' : 'object' : '';
      if (typeof key !== 'undefined') {
        this.nodeBegin(context, key, leftKey, type, nodeType, isLast);
      } else {
        this.rootBegin(context, type, nodeType);
      }
      let typeFormattter;
      try {
        typeFormattter = this[`format_${type}`] || this.typeFormattterNotFound(context, type);
        typeFormattter.call(this, context, delta, leftValue, key, leftKey, movedFrom);
      } catch (err) {
        this.typeFormattterErrorFormatter(context, err, delta, leftValue, key, leftKey, movedFrom);
        if (typeof console !== 'undefined' && console.error) {
          console.error(err.stack);
        }
      }
      if (typeof key !== 'undefined') {
        this.nodeEnd(context, key, leftKey, type, nodeType, isLast);
      } else {
        this.rootEnd(context, type, nodeType);
      }
    }
    formatDeltaChildren(context, delta, left) {
      const self = this;
      this.forEachDeltaKey(delta, left, (key, leftKey, movedFrom, isLast) => {
        self.recurse(context, delta[key], left ? left[leftKey] : undefined, key, leftKey, movedFrom, isLast);
      });
    }
    forEachDeltaKey(delta, left, fn) {
      const keys = getObjectKeys(delta);
      const arrayKeys = delta._t === 'a';
      const moveDestinations = {};
      let name;
      if (typeof left !== 'undefined') {
        for (name in left) {
          if (Object.prototype.hasOwnProperty.call(left, name)) {
            if (typeof delta[name] === 'undefined' && (!arrayKeys || typeof delta[`_${name}`] === 'undefined')) {
              keys.push(name);
            }
          }
        }
      }
      // look for move destinations
      for (name in delta) {
        if (Object.prototype.hasOwnProperty.call(delta, name)) {
          const value = delta[name];
          if (isArray(value) && value[2] === 3) {
            moveDestinations[value[1].toString()] = {
              key: name,
              value: left && left[parseInt(name.substr(1))]
            };
            if (this.includeMoveDestinations !== false) {
              if (typeof left === 'undefined' && typeof delta[value[1]] === 'undefined') {
                keys.push(value[1].toString());
              }
            }
          }
        }
      }
      if (arrayKeys) {
        keys.sort(arrayKeyComparer);
      } else {
        keys.sort();
      }
      for (let index = 0, length = keys.length; index < length; index++) {
        const key = keys[index];
        if (arrayKeys && key === '_t') {
          continue;
        }
        const leftKey = arrayKeys ? typeof key === 'number' ? key : parseInt(trimUnderscore(key), 10) : key;
        const isLast = index === length - 1;
        fn(key, leftKey, moveDestinations[leftKey], isLast);
      }
    }
    getDeltaType(delta, movedFrom) {
      if (typeof delta === 'undefined') {
        if (typeof movedFrom !== 'undefined') {
          return 'movedestination';
        }
        return 'unchanged';
      }
      if (isArray(delta)) {
        if (delta.length === 1) {
          return 'added';
        }
        if (delta.length === 2) {
          return 'modified';
        }
        if (delta.length === 3 && delta[2] === 0) {
          return 'deleted';
        }
        if (delta.length === 3 && delta[2] === 2) {
          return 'textdiff';
        }
        if (delta.length === 3 && delta[2] === 3) {
          return 'moved';
        }
      } else if (typeof delta === 'object') {
        return 'node';
      }
      return 'unknown';
    }
    parseTextDiff(value) {
      const output = [];
      const lines = value.split('\n@@ ');
      for (let i = 0, l = lines.length; i < l; i++) {
        const line = lines[i];
        const lineOutput = {
          pieces: []
        };
        const location = /^(?:@@ )?[-+]?(\d+),(\d+)/.exec(line).slice(1);
        lineOutput.location = {
          line: location[0],
          chr: location[1]
        };
        const pieces = line.split('\n').slice(1);
        for (let pieceIndex = 0, piecesLength = pieces.length; pieceIndex < piecesLength; pieceIndex++) {
          const piece = pieces[pieceIndex];
          if (!piece.length) {
            continue;
          }
          const pieceOutput = {
            type: 'context'
          };
          if (piece.substr(0, 1) === '+') {
            pieceOutput.type = 'added';
          } else if (piece.substr(0, 1) === '-') {
            pieceOutput.type = 'deleted';
          }
          pieceOutput.text = piece.slice(1);
          lineOutput.pieces.push(pieceOutput);
        }
        output.push(lineOutput);
      }
      return output;
    }
  }

  var base = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: BaseFormatter
  });

  class HtmlFormatter extends BaseFormatter {
    typeFormattterErrorFormatter(context, err) {
      context.out(`<pre class="jsondiffpatch-error">${err}</pre>`);
    }
    formatValue(context, value) {
      context.out(`<pre>${htmlEscape(JSON.stringify(value, null, 2))}</pre>`);
    }
    formatTextDiffString(context, value) {
      const lines = this.parseTextDiff(value);
      context.out('<ul class="jsondiffpatch-textdiff">');
      for (let i = 0, l = lines.length; i < l; i++) {
        const line = lines[i];
        context.out('<li><div class="jsondiffpatch-textdiff-location">' + `<span class="jsondiffpatch-textdiff-line-number">${line.location.line}</span><span class="jsondiffpatch-textdiff-char">${line.location.chr}</span></div><div class="jsondiffpatch-textdiff-line">`);
        const pieces = line.pieces;
        for (let pieceIndex = 0, piecesLength = pieces.length; pieceIndex < piecesLength; pieceIndex++) {
          /* global decodeURI */
          const piece = pieces[pieceIndex];
          context.out(`<span class="jsondiffpatch-textdiff-${piece.type}">${htmlEscape(decodeURI(piece.text))}</span>`);
        }
        context.out('</div></li>');
      }
      context.out('</ul>');
    }
    rootBegin(context, type, nodeType) {
      const nodeClass = `jsondiffpatch-${type}${nodeType ? ` jsondiffpatch-child-node-type-${nodeType}` : ''}`;
      context.out(`<div class="jsondiffpatch-delta ${nodeClass}">`);
    }
    rootEnd(context) {
      context.out(`</div>${context.hasArrows ? '<script type="text/javascript">setTimeout(' + `${adjustArrows.toString()},10);</script>` : ''}`);
    }
    nodeBegin(context, key, leftKey, type, nodeType) {
      const nodeClass = `jsondiffpatch-${type}${nodeType ? ` jsondiffpatch-child-node-type-${nodeType}` : ''}`;
      context.out(`<li class="${nodeClass}" data-key="${leftKey}">` + `<div class="jsondiffpatch-property-name">${leftKey}</div>`);
    }
    nodeEnd(context) {
      context.out('</li>');
    }

    /* jshint camelcase: false */
    /* eslint-disable camelcase */

    format_unchanged(context, delta, left) {
      if (typeof left === 'undefined') {
        return;
      }
      context.out('<div class="jsondiffpatch-value">');
      this.formatValue(context, left);
      context.out('</div>');
    }
    format_movedestination(context, delta, left) {
      if (typeof left === 'undefined') {
        return;
      }
      context.out('<div class="jsondiffpatch-value">');
      this.formatValue(context, left);
      context.out('</div>');
    }
    format_node(context, delta, left) {
      // recurse
      const nodeType = delta._t === 'a' ? 'array' : 'object';
      context.out(`<ul class="jsondiffpatch-node jsondiffpatch-node-type-${nodeType}">`);
      this.formatDeltaChildren(context, delta, left);
      context.out('</ul>');
    }
    format_added(context, delta) {
      context.out('<div class="jsondiffpatch-value">');
      this.formatValue(context, delta[0]);
      context.out('</div>');
    }
    format_modified(context, delta) {
      context.out('<div class="jsondiffpatch-value jsondiffpatch-left-value">');
      this.formatValue(context, delta[0]);
      context.out('</div>' + '<div class="jsondiffpatch-value jsondiffpatch-right-value">');
      this.formatValue(context, delta[1]);
      context.out('</div>');
    }
    format_deleted(context, delta) {
      context.out('<div class="jsondiffpatch-value">');
      this.formatValue(context, delta[0]);
      context.out('</div>');
    }
    format_moved(context, delta) {
      context.out('<div class="jsondiffpatch-value">');
      this.formatValue(context, delta[0]);
      context.out(`</div><div class="jsondiffpatch-moved-destination">${delta[1]}</div>`);

      // draw an SVG arrow from here to move destination
      context.out( /* jshint multistr: true */
      '<div class="jsondiffpatch-arrow" ' + `style="position: relative; left: -34px;">
          <svg width="30" height="60" ` + `style="position: absolute; display: none;">
          <defs>
              <marker id="markerArrow" markerWidth="8" markerHeight="8"
                 refx="2" refy="4"
                     orient="auto" markerUnits="userSpaceOnUse">
                  <path d="M1,1 L1,7 L7,4 L1,1" style="fill: #339;" />
              </marker>
          </defs>
          <path d="M30,0 Q-10,25 26,50"
            style="stroke: #88f; stroke-width: 2px; fill: none; ` + `stroke-opacity: 0.5; marker-end: url(#markerArrow);"
          ></path>
          </svg>
      </div>`);
      context.hasArrows = true;
    }
    format_textdiff(context, delta) {
      context.out('<div class="jsondiffpatch-value">');
      this.formatTextDiffString(context, delta[0]);
      context.out('</div>');
    }
  }
  function htmlEscape(text) {
    let html = text;
    const replacements = [[/&/g, '&amp;'], [/</g, '&lt;'], [/>/g, '&gt;'], [/'/g, '&apos;'], [/"/g, '&quot;']];
    for (let i = 0; i < replacements.length; i++) {
      html = html.replace(replacements[i][0], replacements[i][1]);
    }
    return html;
  }
  const adjustArrows = function jsondiffpatchHtmlFormatterAdjustArrows(nodeArg) {
    const node = nodeArg || document;
    const getElementText = _ref => {
      let {
        textContent,
        innerText
      } = _ref;
      return textContent || innerText;
    };
    const eachByQuery = (el, query, fn) => {
      const elems = el.querySelectorAll(query);
      for (let i = 0, l = elems.length; i < l; i++) {
        fn(elems[i]);
      }
    };
    const eachChildren = (_ref2, fn) => {
      let {
        children
      } = _ref2;
      for (let i = 0, l = children.length; i < l; i++) {
        fn(children[i], i);
      }
    };
    eachByQuery(node, '.jsondiffpatch-arrow', _ref3 => {
      let {
        parentNode,
        children,
        style
      } = _ref3;
      const arrowParent = parentNode;
      const svg = children[0];
      const path = svg.children[1];
      svg.style.display = 'none';
      const destination = getElementText(arrowParent.querySelector('.jsondiffpatch-moved-destination'));
      const container = arrowParent.parentNode;
      let destinationElem;
      eachChildren(container, child => {
        if (child.getAttribute('data-key') === destination) {
          destinationElem = child;
        }
      });
      if (!destinationElem) {
        return;
      }
      try {
        const distance = destinationElem.offsetTop - arrowParent.offsetTop;
        svg.setAttribute('height', Math.abs(distance) + 6);
        style.top = `${-8 + (distance > 0 ? 0 : distance)}px`;
        const curve = distance > 0 ? `M30,0 Q-10,${Math.round(distance / 2)} 26,${distance - 4}` : `M30,${-distance} Q-10,${Math.round(-distance / 2)} 26,4`;
        path.setAttribute('d', curve);
        svg.style.display = '';
      } catch (err) {}
    });
  };

  /* jshint camelcase: true */
  /* eslint-enable camelcase */

  const showUnchanged = (show, node, delay) => {
    const el = node || document.body;
    const prefix = 'jsondiffpatch-unchanged-';
    const classes = {
      showing: `${prefix}showing`,
      hiding: `${prefix}hiding`,
      visible: `${prefix}visible`,
      hidden: `${prefix}hidden`
    };
    const list = el.classList;
    if (!list) {
      return;
    }
    if (!delay) {
      list.remove(classes.showing);
      list.remove(classes.hiding);
      list.remove(classes.visible);
      list.remove(classes.hidden);
      if (show === false) {
        list.add(classes.hidden);
      }
      return;
    }
    if (show === false) {
      list.remove(classes.showing);
      list.add(classes.visible);
      setTimeout(() => {
        list.add(classes.hiding);
      }, 10);
    } else {
      list.remove(classes.hiding);
      list.add(classes.showing);
      list.remove(classes.hidden);
    }
    const intervalId = setInterval(() => {
      adjustArrows(el);
    }, 100);
    setTimeout(() => {
      list.remove(classes.showing);
      list.remove(classes.hiding);
      if (show === false) {
        list.add(classes.hidden);
        list.remove(classes.visible);
      } else {
        list.add(classes.visible);
        list.remove(classes.hidden);
      }
      setTimeout(() => {
        list.remove(classes.visible);
        clearInterval(intervalId);
      }, delay + 400);
    }, delay);
  };
  const hideUnchanged = (node, delay) => showUnchanged(false, node, delay);
  let defaultInstance$4;
  function format$3(delta, left) {
    if (!defaultInstance$4) {
      defaultInstance$4 = new HtmlFormatter();
    }
    return defaultInstance$4.format(delta, left);
  }

  var html = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: HtmlFormatter,
    format: format$3,
    hideUnchanged: hideUnchanged,
    showUnchanged: showUnchanged
  });

  class AnnotatedFormatter extends BaseFormatter {
    constructor() {
      super();
      this.includeMoveDestinations = false;
    }
    prepareContext(context) {
      super.prepareContext(context);
      context.indent = function (levels) {
        this.indentLevel = (this.indentLevel || 0) + (typeof levels === 'undefined' ? 1 : levels);
        this.indentPad = new Array(this.indentLevel + 1).join('&nbsp;&nbsp;');
      };
      context.row = (json, htmlNote) => {
        context.out('<tr><td style="white-space: nowrap;">' + '<pre class="jsondiffpatch-annotated-indent"' + ' style="display: inline-block">');
        context.out(context.indentPad);
        context.out('</pre><pre style="display: inline-block">');
        context.out(json);
        context.out('</pre></td><td class="jsondiffpatch-delta-note"><div>');
        context.out(htmlNote);
        context.out('</div></td></tr>');
      };
    }
    typeFormattterErrorFormatter(context, err) {
      context.row('', `<pre class="jsondiffpatch-error">${err}</pre>`);
    }
    formatTextDiffString(context, value) {
      const lines = this.parseTextDiff(value);
      context.out('<ul class="jsondiffpatch-textdiff">');
      for (let i = 0, l = lines.length; i < l; i++) {
        const line = lines[i];
        context.out('<li><div class="jsondiffpatch-textdiff-location">' + `<span class="jsondiffpatch-textdiff-line-number">${line.location.line}</span><span class="jsondiffpatch-textdiff-char">${line.location.chr}</span></div><div class="jsondiffpatch-textdiff-line">`);
        const pieces = line.pieces;
        for (let pieceIndex = 0, piecesLength = pieces.length; pieceIndex < piecesLength; pieceIndex++) {
          const piece = pieces[pieceIndex];
          context.out(`<span class="jsondiffpatch-textdiff-${piece.type}">${piece.text}</span>`);
        }
        context.out('</div></li>');
      }
      context.out('</ul>');
    }
    rootBegin(context, type, nodeType) {
      context.out('<table class="jsondiffpatch-annotated-delta">');
      if (type === 'node') {
        context.row('{');
        context.indent();
      }
      if (nodeType === 'array') {
        context.row('"_t": "a",', 'Array delta (member names indicate array indices)');
      }
    }
    rootEnd(context, type) {
      if (type === 'node') {
        context.indent(-1);
        context.row('}');
      }
      context.out('</table>');
    }
    nodeBegin(context, key, leftKey, type, nodeType) {
      context.row(`&quot;${key}&quot;: {`);
      if (type === 'node') {
        context.indent();
      }
      if (nodeType === 'array') {
        context.row('"_t": "a",', 'Array delta (member names indicate array indices)');
      }
    }
    nodeEnd(context, key, leftKey, type, nodeType, isLast) {
      if (type === 'node') {
        context.indent(-1);
      }
      context.row(`}${isLast ? '' : ','}`);
    }

    /* jshint camelcase: false */

    /* eslint-disable camelcase */
    format_unchanged() {}
    format_movedestination() {}
    format_node(context, delta, left) {
      // recurse
      this.formatDeltaChildren(context, delta, left);
    }
  }

  /* eslint-enable camelcase */

  const wrapPropertyName = name => `<pre style="display:inline-block">&quot;${name}&quot;</pre>`;
  const deltaAnnotations = {
    added(delta, left, key, leftKey) {
      const formatLegend = ' <pre>([newValue])</pre>';
      if (typeof leftKey === 'undefined') {
        return `new value${formatLegend}`;
      }
      if (typeof leftKey === 'number') {
        return `insert at index ${leftKey}${formatLegend}`;
      }
      return `add property ${wrapPropertyName(leftKey)}${formatLegend}`;
    },
    modified(delta, left, key, leftKey) {
      const formatLegend = ' <pre>([previousValue, newValue])</pre>';
      if (typeof leftKey === 'undefined') {
        return `modify value${formatLegend}`;
      }
      if (typeof leftKey === 'number') {
        return `modify at index ${leftKey}${formatLegend}`;
      }
      return `modify property ${wrapPropertyName(leftKey)}${formatLegend}`;
    },
    deleted(delta, left, key, leftKey) {
      const formatLegend = ' <pre>([previousValue, 0, 0])</pre>';
      if (typeof leftKey === 'undefined') {
        return `delete value${formatLegend}`;
      }
      if (typeof leftKey === 'number') {
        return `remove index ${leftKey}${formatLegend}`;
      }
      return `delete property ${wrapPropertyName(leftKey)}${formatLegend}`;
    },
    moved(delta, left, key, leftKey) {
      return 'move from <span title="(position to remove at original state)">' + `index ${leftKey}</span> to <span title="(position to insert at final` + ` state)">index ${delta[1]}</span>`;
    },
    textdiff(delta, left, key, leftKey) {
      const location = typeof leftKey === 'undefined' ? '' : typeof leftKey === 'number' ? ` at index ${leftKey}` : ` at property ${wrapPropertyName(leftKey)}`;
      return `text diff${location}, format is <a href="https://code.google.com/` + 'p/google-diff-match-patch/wiki/Unidiff">a variation of Unidiff</a>';
    }
  };
  const formatAnyChange = function (context, delta) {
    const deltaType = this.getDeltaType(delta);
    const annotator = deltaAnnotations[deltaType];
    const htmlNote = annotator && annotator.apply(annotator, Array.prototype.slice.call(arguments, 1));
    let json = JSON.stringify(delta, null, 2);
    if (deltaType === 'textdiff') {
      // split text diffs lines
      json = json.split('\\n').join('\\n"+\n   "');
    }
    context.indent();
    context.row(json, htmlNote);
    context.indent(-1);
  };

  /* eslint-disable camelcase */
  AnnotatedFormatter.prototype.format_added = formatAnyChange;
  AnnotatedFormatter.prototype.format_modified = formatAnyChange;
  AnnotatedFormatter.prototype.format_deleted = formatAnyChange;
  AnnotatedFormatter.prototype.format_moved = formatAnyChange;
  AnnotatedFormatter.prototype.format_textdiff = formatAnyChange;
  let defaultInstance$3;
  function format$2(delta, left) {
    if (!defaultInstance$3) {
      defaultInstance$3 = new AnnotatedFormatter();
    }
    return defaultInstance$3.format(delta, left);
  }

  var annotated = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: AnnotatedFormatter,
    format: format$2
  });

  const OPERATIONS = {
    add: 'add',
    remove: 'remove',
    replace: 'replace',
    move: 'move'
  };
  class JSONFormatter extends BaseFormatter {
    constructor() {
      super();
      this.includeMoveDestinations = true;
    }
    prepareContext(context) {
      super.prepareContext(context);
      context.result = [];
      context.path = [];
      context.pushCurrentOp = function (obj) {
        const {
          op,
          value
        } = obj;
        const val = {
          op,
          path: this.currentPath()
        };
        if (typeof value !== 'undefined') {
          val.value = value;
        }
        this.result.push(val);
      };
      context.pushMoveOp = function (to) {
        const from = this.currentPath();
        this.result.push({
          op: OPERATIONS.move,
          from,
          path: this.toPath(to)
        });
      };
      context.currentPath = function () {
        return `/${this.path.join('/')}`;
      };
      context.toPath = function (toPath) {
        const to = this.path.slice();
        to[to.length - 1] = toPath;
        return `/${to.join('/')}`;
      };
    }
    typeFormattterErrorFormatter(context, err) {
      context.out(`[ERROR] ${err}`);
    }
    rootBegin() {}
    rootEnd() {}
    nodeBegin(_ref, key, leftKey) {
      let {
        path
      } = _ref;
      path.push(leftKey);
    }
    nodeEnd(_ref2) {
      let {
        path
      } = _ref2;
      path.pop();
    }

    /* jshint camelcase: false */
    /* eslint-disable camelcase */

    format_unchanged() {}
    format_movedestination() {}
    format_node(context, delta, left) {
      this.formatDeltaChildren(context, delta, left);
    }
    format_added(context, delta) {
      context.pushCurrentOp({
        op: OPERATIONS.add,
        value: delta[0]
      });
    }
    format_modified(context, delta) {
      context.pushCurrentOp({
        op: OPERATIONS.replace,
        value: delta[1]
      });
    }
    format_deleted(context) {
      context.pushCurrentOp({
        op: OPERATIONS.remove
      });
    }
    format_moved(context, delta) {
      const to = delta[1];
      context.pushMoveOp(to);
    }
    format_textdiff() {
      throw new Error('Not implemented');
    }
    format(delta, left) {
      const context = {};
      this.prepareContext(context);
      this.recurse(context, delta, left);
      return context.result;
    }
  }
  const last = arr => arr[arr.length - 1];
  const sortBy = (arr, pred) => {
    arr.sort(pred);
    return arr;
  };
  const compareByIndexDesc = (indexA, indexB) => {
    const lastA = parseInt(indexA, 10);
    const lastB = parseInt(indexB, 10);
    if (!(isNaN(lastA) || isNaN(lastB))) {
      return lastB - lastA;
    } else {
      return 0;
    }
  };
  const opsByDescendingOrder = removeOps => sortBy(removeOps, (a, b) => {
    const splitA = a.path.split('/');
    const splitB = b.path.split('/');
    if (splitA.length !== splitB.length) {
      return splitA.length - splitB.length;
    } else {
      return compareByIndexDesc(last(splitA), last(splitB));
    }
  });
  const partitionOps = (arr, fns) => {
    const initArr = Array(fns.length + 1).fill().map(() => []);
    return arr.map(item => {
      let position = fns.map(fn => fn(item)).indexOf(true);
      if (position < 0) {
        position = fns.length;
      }
      return {
        item,
        position
      };
    }).reduce((acc, item) => {
      acc[item.position].push(item.item);
      return acc;
    }, initArr);
  };
  const isMoveOp = _ref3 => {
    let {
      op
    } = _ref3;
    return op === 'move';
  };
  const isRemoveOp = _ref4 => {
    let {
      op
    } = _ref4;
    return op === 'remove';
  };
  const reorderOps = diff => {
    const [moveOps, removedOps, restOps] = partitionOps(diff, [isMoveOp, isRemoveOp]);
    const removeOpsReverse = opsByDescendingOrder(removedOps);
    return [...removeOpsReverse, ...moveOps, ...restOps];
  };
  let defaultInstance$2;
  const format$1 = (delta, left) => {
    if (!defaultInstance$2) {
      defaultInstance$2 = new JSONFormatter();
    }
    return reorderOps(defaultInstance$2.format(delta, left));
  };
  const log$1 = (delta, left) => {
    console.log(format$1(delta, left));
  };

  var jsonpatch = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: JSONFormatter,
    format: format$1,
    log: log$1,
    partitionOps: partitionOps
  });

  function chalkColor(name) {
    return chalk && chalk[name] || function () {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      return args;
    };
  }
  const colors = {
    added: chalkColor('green'),
    deleted: chalkColor('red'),
    movedestination: chalkColor('gray'),
    moved: chalkColor('yellow'),
    unchanged: chalkColor('gray'),
    error: chalkColor('white.bgRed'),
    textDiffLine: chalkColor('gray')
  };
  class ConsoleFormatter extends BaseFormatter {
    constructor() {
      super();
      this.includeMoveDestinations = false;
    }
    prepareContext(context) {
      super.prepareContext(context);
      context.indent = function (levels) {
        this.indentLevel = (this.indentLevel || 0) + (typeof levels === 'undefined' ? 1 : levels);
        this.indentPad = new Array(this.indentLevel + 1).join('  ');
        this.outLine();
      };
      context.outLine = function () {
        this.buffer.push(`\n${this.indentPad || ''}`);
      };
      context.out = function () {
        for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          args[_key2] = arguments[_key2];
        }
        for (let i = 0, l = args.length; i < l; i++) {
          const lines = args[i].split('\n');
          let text = lines.join(`\n${this.indentPad || ''}`);
          if (this.color && this.color[0]) {
            text = this.color[0](text);
          }
          this.buffer.push(text);
        }
      };
      context.pushColor = function (color) {
        this.color = this.color || [];
        this.color.unshift(color);
      };
      context.popColor = function () {
        this.color = this.color || [];
        this.color.shift();
      };
    }
    typeFormattterErrorFormatter(context, err) {
      context.pushColor(colors.error);
      context.out(`[ERROR]${err}`);
      context.popColor();
    }
    formatValue(context, value) {
      context.out(JSON.stringify(value, null, 2));
    }
    formatTextDiffString(context, value) {
      const lines = this.parseTextDiff(value);
      context.indent();
      for (let i = 0, l = lines.length; i < l; i++) {
        const line = lines[i];
        context.pushColor(colors.textDiffLine);
        context.out(`${line.location.line},${line.location.chr} `);
        context.popColor();
        const pieces = line.pieces;
        for (let pieceIndex = 0, piecesLength = pieces.length; pieceIndex < piecesLength; pieceIndex++) {
          const piece = pieces[pieceIndex];
          context.pushColor(colors[piece.type]);
          context.out(piece.text);
          context.popColor();
        }
        if (i < l - 1) {
          context.outLine();
        }
      }
      context.indent(-1);
    }
    rootBegin(context, type, nodeType) {
      context.pushColor(colors[type]);
      if (type === 'node') {
        context.out(nodeType === 'array' ? '[' : '{');
        context.indent();
      }
    }
    rootEnd(context, type, nodeType) {
      if (type === 'node') {
        context.indent(-1);
        context.out(nodeType === 'array' ? ']' : '}');
      }
      context.popColor();
    }
    nodeBegin(context, key, leftKey, type, nodeType) {
      context.pushColor(colors[type]);
      context.out(`${leftKey}: `);
      if (type === 'node') {
        context.out(nodeType === 'array' ? '[' : '{');
        context.indent();
      }
    }
    nodeEnd(context, key, leftKey, type, nodeType, isLast) {
      if (type === 'node') {
        context.indent(-1);
        context.out(nodeType === 'array' ? ']' : `}${isLast ? '' : ','}`);
      }
      if (!isLast) {
        context.outLine();
      }
      context.popColor();
    }

    /* jshint camelcase: false */
    /* eslint-disable camelcase */

    format_unchanged(context, delta, left) {
      if (typeof left === 'undefined') {
        return;
      }
      this.formatValue(context, left);
    }
    format_movedestination(context, delta, left) {
      if (typeof left === 'undefined') {
        return;
      }
      this.formatValue(context, left);
    }
    format_node(context, delta, left) {
      // recurse
      this.formatDeltaChildren(context, delta, left);
    }
    format_added(context, delta) {
      this.formatValue(context, delta[0]);
    }
    format_modified(context, delta) {
      context.pushColor(colors.deleted);
      this.formatValue(context, delta[0]);
      context.popColor();
      context.out(' => ');
      context.pushColor(colors.added);
      this.formatValue(context, delta[1]);
      context.popColor();
    }
    format_deleted(context, delta) {
      this.formatValue(context, delta[0]);
    }
    format_moved(context, delta) {
      context.out(`==> ${delta[1]}`);
    }
    format_textdiff(context, delta) {
      this.formatTextDiffString(context, delta[0]);
    }
  }
  let defaultInstance$1;
  const format = (delta, left) => {
    if (!defaultInstance$1) {
      defaultInstance$1 = new ConsoleFormatter();
    }
    return defaultInstance$1.format(delta, left);
  };
  function log(delta, left) {
    console.log(format(delta, left));
  }

  var console$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: ConsoleFormatter,
    format: format,
    log: log
  });

  var index = /*#__PURE__*/Object.freeze({
    __proto__: null,
    annotated: annotated,
    base: base,
    console: console$1,
    html: html,
    jsonpatch: jsonpatch
  });

  // use as 2nd parameter for JSON.parse to revive Date instances
  function dateReviver(key, value) {
    let parts;
    if (typeof value === 'string') {
      // eslint-disable-next-line max-len
      parts = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(?:\.(\d*))?(Z|([+-])(\d{2}):(\d{2}))$/.exec(value);
      if (parts) {
        return new Date(Date.UTC(+parts[1], +parts[2] - 1, +parts[3], +parts[4], +parts[5], +parts[6], +(parts[7] || 0)));
      }
    }
    return value;
  }

  function create(options) {
    return new DiffPatcher(options);
  }
  let defaultInstance;
  function diff() {
    if (!defaultInstance) {
      defaultInstance = new DiffPatcher();
    }
    return defaultInstance.diff.apply(defaultInstance, arguments);
  }
  function patch() {
    if (!defaultInstance) {
      defaultInstance = new DiffPatcher();
    }
    return defaultInstance.patch.apply(defaultInstance, arguments);
  }
  function unpatch() {
    if (!defaultInstance) {
      defaultInstance = new DiffPatcher();
    }
    return defaultInstance.unpatch.apply(defaultInstance, arguments);
  }
  function reverse() {
    if (!defaultInstance) {
      defaultInstance = new DiffPatcher();
    }
    return defaultInstance.reverse.apply(defaultInstance, arguments);
  }
  function clone() {
    if (!defaultInstance) {
      defaultInstance = new DiffPatcher();
    }
    return defaultInstance.clone.apply(defaultInstance, arguments);
  }

  exports.DiffPatcher = DiffPatcher;
  exports.clone = clone;
  exports.console = console$1;
  exports.create = create;
  exports.dateReviver = dateReviver;
  exports.diff = diff;
  exports.formatters = index;
  exports.patch = patch;
  exports.reverse = reverse;
  exports.unpatch = unpatch;

}));
