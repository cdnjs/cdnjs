(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('./empty')) :
  typeof define === 'function' && define.amd ? define(['exports', './empty'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.jsondiffpatch = {}, global.chalk));
})(this, (function (exports, chalk) { 'use strict';

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

  function getDefaultExportFromCjs (x) {
  	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
  }

  var diffMatchPatch = {exports: {}};

  /**
   * Diff Match and Patch
   * Copyright 2018 The diff-match-patch Authors.
   * https://github.com/google/diff-match-patch
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */

  (function (module) {
  	/**
  	 * @fileoverview Computes the difference between two texts to create a patch.
  	 * Applies the patch onto another text, allowing for errors.
  	 * @author fraser@google.com (Neil Fraser)
  	 */

  	/**
  	 * Class containing the diff, match and patch methods.
  	 * @constructor
  	 */
  	var diff_match_patch = function() {

  	  // Defaults.
  	  // Redefine these in your program to override the defaults.

  	  // Number of seconds to map a diff before giving up (0 for infinity).
  	  this.Diff_Timeout = 1.0;
  	  // Cost of an empty edit operation in terms of edit characters.
  	  this.Diff_EditCost = 4;
  	  // At what point is no match declared (0.0 = perfection, 1.0 = very loose).
  	  this.Match_Threshold = 0.5;
  	  // How far to search for a match (0 = exact location, 1000+ = broad match).
  	  // A match this many characters away from the expected location will add
  	  // 1.0 to the score (0.0 is a perfect match).
  	  this.Match_Distance = 1000;
  	  // When deleting a large block of text (over ~64 characters), how close do
  	  // the contents have to be to match the expected contents. (0.0 = perfection,
  	  // 1.0 = very loose).  Note that Match_Threshold controls how closely the
  	  // end points of a delete need to match.
  	  this.Patch_DeleteThreshold = 0.5;
  	  // Chunk size for context length.
  	  this.Patch_Margin = 4;

  	  // The number of bits in an int.
  	  this.Match_MaxBits = 32;
  	};


  	//  DIFF FUNCTIONS


  	/**
  	 * The data structure representing a diff is an array of tuples:
  	 * [[DIFF_DELETE, 'Hello'], [DIFF_INSERT, 'Goodbye'], [DIFF_EQUAL, ' world.']]
  	 * which means: delete 'Hello', add 'Goodbye' and keep ' world.'
  	 */
  	var DIFF_DELETE = -1;
  	var DIFF_INSERT = 1;
  	var DIFF_EQUAL = 0;

  	/**
  	 * Class representing one diff tuple.
  	 * ~Attempts to look like a two-element array (which is what this used to be).~
  	 * Constructor returns an actual two-element array, to allow destructing @JackuB
  	 * See https://github.com/JackuB/diff-match-patch/issues/14 for details
  	 * @param {number} op Operation, one of: DIFF_DELETE, DIFF_INSERT, DIFF_EQUAL.
  	 * @param {string} text Text to be deleted, inserted, or retained.
  	 * @constructor
  	 */
  	diff_match_patch.Diff = function(op, text) {
  	  return [op, text];
  	};

  	/**
  	 * Find the differences between two texts.  Simplifies the problem by stripping
  	 * any common prefix or suffix off the texts before diffing.
  	 * @param {string} text1 Old string to be diffed.
  	 * @param {string} text2 New string to be diffed.
  	 * @param {boolean=} opt_checklines Optional speedup flag. If present and false,
  	 *     then don't run a line-level diff first to identify the changed areas.
  	 *     Defaults to true, which does a faster, slightly less optimal diff.
  	 * @param {number=} opt_deadline Optional time when the diff should be complete
  	 *     by.  Used internally for recursive calls.  Users should set DiffTimeout
  	 *     instead.
  	 * @return {!Array.<!diff_match_patch.Diff>} Array of diff tuples.
  	 */
  	diff_match_patch.prototype.diff_main = function(text1, text2, opt_checklines,
  	    opt_deadline) {
  	  // Set a deadline by which time the diff must be complete.
  	  if (typeof opt_deadline == 'undefined') {
  	    if (this.Diff_Timeout <= 0) {
  	      opt_deadline = Number.MAX_VALUE;
  	    } else {
  	      opt_deadline = (new Date).getTime() + this.Diff_Timeout * 1000;
  	    }
  	  }
  	  var deadline = opt_deadline;

  	  // Check for null inputs.
  	  if (text1 == null || text2 == null) {
  	    throw new Error('Null input. (diff_main)');
  	  }

  	  // Check for equality (speedup).
  	  if (text1 == text2) {
  	    if (text1) {
  	      return [new diff_match_patch.Diff(DIFF_EQUAL, text1)];
  	    }
  	    return [];
  	  }

  	  if (typeof opt_checklines == 'undefined') {
  	    opt_checklines = true;
  	  }
  	  var checklines = opt_checklines;

  	  // Trim off common prefix (speedup).
  	  var commonlength = this.diff_commonPrefix(text1, text2);
  	  var commonprefix = text1.substring(0, commonlength);
  	  text1 = text1.substring(commonlength);
  	  text2 = text2.substring(commonlength);

  	  // Trim off common suffix (speedup).
  	  commonlength = this.diff_commonSuffix(text1, text2);
  	  var commonsuffix = text1.substring(text1.length - commonlength);
  	  text1 = text1.substring(0, text1.length - commonlength);
  	  text2 = text2.substring(0, text2.length - commonlength);

  	  // Compute the diff on the middle block.
  	  var diffs = this.diff_compute_(text1, text2, checklines, deadline);

  	  // Restore the prefix and suffix.
  	  if (commonprefix) {
  	    diffs.unshift(new diff_match_patch.Diff(DIFF_EQUAL, commonprefix));
  	  }
  	  if (commonsuffix) {
  	    diffs.push(new diff_match_patch.Diff(DIFF_EQUAL, commonsuffix));
  	  }
  	  this.diff_cleanupMerge(diffs);
  	  return diffs;
  	};


  	/**
  	 * Find the differences between two texts.  Assumes that the texts do not
  	 * have any common prefix or suffix.
  	 * @param {string} text1 Old string to be diffed.
  	 * @param {string} text2 New string to be diffed.
  	 * @param {boolean} checklines Speedup flag.  If false, then don't run a
  	 *     line-level diff first to identify the changed areas.
  	 *     If true, then run a faster, slightly less optimal diff.
  	 * @param {number} deadline Time when the diff should be complete by.
  	 * @return {!Array.<!diff_match_patch.Diff>} Array of diff tuples.
  	 * @private
  	 */
  	diff_match_patch.prototype.diff_compute_ = function(text1, text2, checklines,
  	    deadline) {
  	  var diffs;

  	  if (!text1) {
  	    // Just add some text (speedup).
  	    return [new diff_match_patch.Diff(DIFF_INSERT, text2)];
  	  }

  	  if (!text2) {
  	    // Just delete some text (speedup).
  	    return [new diff_match_patch.Diff(DIFF_DELETE, text1)];
  	  }

  	  var longtext = text1.length > text2.length ? text1 : text2;
  	  var shorttext = text1.length > text2.length ? text2 : text1;
  	  var i = longtext.indexOf(shorttext);
  	  if (i != -1) {
  	    // Shorter text is inside the longer text (speedup).
  	    diffs = [new diff_match_patch.Diff(DIFF_INSERT, longtext.substring(0, i)),
  	             new diff_match_patch.Diff(DIFF_EQUAL, shorttext),
  	             new diff_match_patch.Diff(DIFF_INSERT,
  	                 longtext.substring(i + shorttext.length))];
  	    // Swap insertions for deletions if diff is reversed.
  	    if (text1.length > text2.length) {
  	      diffs[0][0] = diffs[2][0] = DIFF_DELETE;
  	    }
  	    return diffs;
  	  }

  	  if (shorttext.length == 1) {
  	    // Single character string.
  	    // After the previous speedup, the character can't be an equality.
  	    return [new diff_match_patch.Diff(DIFF_DELETE, text1),
  	            new diff_match_patch.Diff(DIFF_INSERT, text2)];
  	  }

  	  // Check to see if the problem can be split in two.
  	  var hm = this.diff_halfMatch_(text1, text2);
  	  if (hm) {
  	    // A half-match was found, sort out the return data.
  	    var text1_a = hm[0];
  	    var text1_b = hm[1];
  	    var text2_a = hm[2];
  	    var text2_b = hm[3];
  	    var mid_common = hm[4];
  	    // Send both pairs off for separate processing.
  	    var diffs_a = this.diff_main(text1_a, text2_a, checklines, deadline);
  	    var diffs_b = this.diff_main(text1_b, text2_b, checklines, deadline);
  	    // Merge the results.
  	    return diffs_a.concat([new diff_match_patch.Diff(DIFF_EQUAL, mid_common)],
  	                          diffs_b);
  	  }

  	  if (checklines && text1.length > 100 && text2.length > 100) {
  	    return this.diff_lineMode_(text1, text2, deadline);
  	  }

  	  return this.diff_bisect_(text1, text2, deadline);
  	};


  	/**
  	 * Do a quick line-level diff on both strings, then rediff the parts for
  	 * greater accuracy.
  	 * This speedup can produce non-minimal diffs.
  	 * @param {string} text1 Old string to be diffed.
  	 * @param {string} text2 New string to be diffed.
  	 * @param {number} deadline Time when the diff should be complete by.
  	 * @return {!Array.<!diff_match_patch.Diff>} Array of diff tuples.
  	 * @private
  	 */
  	diff_match_patch.prototype.diff_lineMode_ = function(text1, text2, deadline) {
  	  // Scan the text on a line-by-line basis first.
  	  var a = this.diff_linesToChars_(text1, text2);
  	  text1 = a.chars1;
  	  text2 = a.chars2;
  	  var linearray = a.lineArray;

  	  var diffs = this.diff_main(text1, text2, false, deadline);

  	  // Convert the diff back to original text.
  	  this.diff_charsToLines_(diffs, linearray);
  	  // Eliminate freak matches (e.g. blank lines)
  	  this.diff_cleanupSemantic(diffs);

  	  // Rediff any replacement blocks, this time character-by-character.
  	  // Add a dummy entry at the end.
  	  diffs.push(new diff_match_patch.Diff(DIFF_EQUAL, ''));
  	  var pointer = 0;
  	  var count_delete = 0;
  	  var count_insert = 0;
  	  var text_delete = '';
  	  var text_insert = '';
  	  while (pointer < diffs.length) {
  	    switch (diffs[pointer][0]) {
  	      case DIFF_INSERT:
  	        count_insert++;
  	        text_insert += diffs[pointer][1];
  	        break;
  	      case DIFF_DELETE:
  	        count_delete++;
  	        text_delete += diffs[pointer][1];
  	        break;
  	      case DIFF_EQUAL:
  	        // Upon reaching an equality, check for prior redundancies.
  	        if (count_delete >= 1 && count_insert >= 1) {
  	          // Delete the offending records and add the merged ones.
  	          diffs.splice(pointer - count_delete - count_insert,
  	                       count_delete + count_insert);
  	          pointer = pointer - count_delete - count_insert;
  	          var subDiff =
  	              this.diff_main(text_delete, text_insert, false, deadline);
  	          for (var j = subDiff.length - 1; j >= 0; j--) {
  	            diffs.splice(pointer, 0, subDiff[j]);
  	          }
  	          pointer = pointer + subDiff.length;
  	        }
  	        count_insert = 0;
  	        count_delete = 0;
  	        text_delete = '';
  	        text_insert = '';
  	        break;
  	    }
  	    pointer++;
  	  }
  	  diffs.pop();  // Remove the dummy entry at the end.

  	  return diffs;
  	};


  	/**
  	 * Find the 'middle snake' of a diff, split the problem in two
  	 * and return the recursively constructed diff.
  	 * See Myers 1986 paper: An O(ND) Difference Algorithm and Its Variations.
  	 * @param {string} text1 Old string to be diffed.
  	 * @param {string} text2 New string to be diffed.
  	 * @param {number} deadline Time at which to bail if not yet complete.
  	 * @return {!Array.<!diff_match_patch.Diff>} Array of diff tuples.
  	 * @private
  	 */
  	diff_match_patch.prototype.diff_bisect_ = function(text1, text2, deadline) {
  	  // Cache the text lengths to prevent multiple calls.
  	  var text1_length = text1.length;
  	  var text2_length = text2.length;
  	  var max_d = Math.ceil((text1_length + text2_length) / 2);
  	  var v_offset = max_d;
  	  var v_length = 2 * max_d;
  	  var v1 = new Array(v_length);
  	  var v2 = new Array(v_length);
  	  // Setting all elements to -1 is faster in Chrome & Firefox than mixing
  	  // integers and undefined.
  	  for (var x = 0; x < v_length; x++) {
  	    v1[x] = -1;
  	    v2[x] = -1;
  	  }
  	  v1[v_offset + 1] = 0;
  	  v2[v_offset + 1] = 0;
  	  var delta = text1_length - text2_length;
  	  // If the total number of characters is odd, then the front path will collide
  	  // with the reverse path.
  	  var front = (delta % 2 != 0);
  	  // Offsets for start and end of k loop.
  	  // Prevents mapping of space beyond the grid.
  	  var k1start = 0;
  	  var k1end = 0;
  	  var k2start = 0;
  	  var k2end = 0;
  	  for (var d = 0; d < max_d; d++) {
  	    // Bail out if deadline is reached.
  	    if ((new Date()).getTime() > deadline) {
  	      break;
  	    }

  	    // Walk the front path one step.
  	    for (var k1 = -d + k1start; k1 <= d - k1end; k1 += 2) {
  	      var k1_offset = v_offset + k1;
  	      var x1;
  	      if (k1 == -d || (k1 != d && v1[k1_offset - 1] < v1[k1_offset + 1])) {
  	        x1 = v1[k1_offset + 1];
  	      } else {
  	        x1 = v1[k1_offset - 1] + 1;
  	      }
  	      var y1 = x1 - k1;
  	      while (x1 < text1_length && y1 < text2_length &&
  	             text1.charAt(x1) == text2.charAt(y1)) {
  	        x1++;
  	        y1++;
  	      }
  	      v1[k1_offset] = x1;
  	      if (x1 > text1_length) {
  	        // Ran off the right of the graph.
  	        k1end += 2;
  	      } else if (y1 > text2_length) {
  	        // Ran off the bottom of the graph.
  	        k1start += 2;
  	      } else if (front) {
  	        var k2_offset = v_offset + delta - k1;
  	        if (k2_offset >= 0 && k2_offset < v_length && v2[k2_offset] != -1) {
  	          // Mirror x2 onto top-left coordinate system.
  	          var x2 = text1_length - v2[k2_offset];
  	          if (x1 >= x2) {
  	            // Overlap detected.
  	            return this.diff_bisectSplit_(text1, text2, x1, y1, deadline);
  	          }
  	        }
  	      }
  	    }

  	    // Walk the reverse path one step.
  	    for (var k2 = -d + k2start; k2 <= d - k2end; k2 += 2) {
  	      var k2_offset = v_offset + k2;
  	      var x2;
  	      if (k2 == -d || (k2 != d && v2[k2_offset - 1] < v2[k2_offset + 1])) {
  	        x2 = v2[k2_offset + 1];
  	      } else {
  	        x2 = v2[k2_offset - 1] + 1;
  	      }
  	      var y2 = x2 - k2;
  	      while (x2 < text1_length && y2 < text2_length &&
  	             text1.charAt(text1_length - x2 - 1) ==
  	             text2.charAt(text2_length - y2 - 1)) {
  	        x2++;
  	        y2++;
  	      }
  	      v2[k2_offset] = x2;
  	      if (x2 > text1_length) {
  	        // Ran off the left of the graph.
  	        k2end += 2;
  	      } else if (y2 > text2_length) {
  	        // Ran off the top of the graph.
  	        k2start += 2;
  	      } else if (!front) {
  	        var k1_offset = v_offset + delta - k2;
  	        if (k1_offset >= 0 && k1_offset < v_length && v1[k1_offset] != -1) {
  	          var x1 = v1[k1_offset];
  	          var y1 = v_offset + x1 - k1_offset;
  	          // Mirror x2 onto top-left coordinate system.
  	          x2 = text1_length - x2;
  	          if (x1 >= x2) {
  	            // Overlap detected.
  	            return this.diff_bisectSplit_(text1, text2, x1, y1, deadline);
  	          }
  	        }
  	      }
  	    }
  	  }
  	  // Diff took too long and hit the deadline or
  	  // number of diffs equals number of characters, no commonality at all.
  	  return [new diff_match_patch.Diff(DIFF_DELETE, text1),
  	          new diff_match_patch.Diff(DIFF_INSERT, text2)];
  	};


  	/**
  	 * Given the location of the 'middle snake', split the diff in two parts
  	 * and recurse.
  	 * @param {string} text1 Old string to be diffed.
  	 * @param {string} text2 New string to be diffed.
  	 * @param {number} x Index of split point in text1.
  	 * @param {number} y Index of split point in text2.
  	 * @param {number} deadline Time at which to bail if not yet complete.
  	 * @return {!Array.<!diff_match_patch.Diff>} Array of diff tuples.
  	 * @private
  	 */
  	diff_match_patch.prototype.diff_bisectSplit_ = function(text1, text2, x, y,
  	    deadline) {
  	  var text1a = text1.substring(0, x);
  	  var text2a = text2.substring(0, y);
  	  var text1b = text1.substring(x);
  	  var text2b = text2.substring(y);

  	  // Compute both diffs serially.
  	  var diffs = this.diff_main(text1a, text2a, false, deadline);
  	  var diffsb = this.diff_main(text1b, text2b, false, deadline);

  	  return diffs.concat(diffsb);
  	};


  	/**
  	 * Split two texts into an array of strings.  Reduce the texts to a string of
  	 * hashes where each Unicode character represents one line.
  	 * @param {string} text1 First string.
  	 * @param {string} text2 Second string.
  	 * @return {{chars1: string, chars2: string, lineArray: !Array.<string>}}
  	 *     An object containing the encoded text1, the encoded text2 and
  	 *     the array of unique strings.
  	 *     The zeroth element of the array of unique strings is intentionally blank.
  	 * @private
  	 */
  	diff_match_patch.prototype.diff_linesToChars_ = function(text1, text2) {
  	  var lineArray = [];  // e.g. lineArray[4] == 'Hello\n'
  	  var lineHash = {};   // e.g. lineHash['Hello\n'] == 4

  	  // '\x00' is a valid character, but various debuggers don't like it.
  	  // So we'll insert a junk entry to avoid generating a null character.
  	  lineArray[0] = '';

  	  /**
  	   * Split a text into an array of strings.  Reduce the texts to a string of
  	   * hashes where each Unicode character represents one line.
  	   * Modifies linearray and linehash through being a closure.
  	   * @param {string} text String to encode.
  	   * @return {string} Encoded string.
  	   * @private
  	   */
  	  function diff_linesToCharsMunge_(text) {
  	    var chars = '';
  	    // Walk the text, pulling out a substring for each line.
  	    // text.split('\n') would would temporarily double our memory footprint.
  	    // Modifying text would create many large strings to garbage collect.
  	    var lineStart = 0;
  	    var lineEnd = -1;
  	    // Keeping our own length variable is faster than looking it up.
  	    var lineArrayLength = lineArray.length;
  	    while (lineEnd < text.length - 1) {
  	      lineEnd = text.indexOf('\n', lineStart);
  	      if (lineEnd == -1) {
  	        lineEnd = text.length - 1;
  	      }
  	      var line = text.substring(lineStart, lineEnd + 1);

  	      if (lineHash.hasOwnProperty ? lineHash.hasOwnProperty(line) :
  	          (lineHash[line] !== undefined)) {
  	        chars += String.fromCharCode(lineHash[line]);
  	      } else {
  	        if (lineArrayLength == maxLines) {
  	          // Bail out at 65535 because
  	          // String.fromCharCode(65536) == String.fromCharCode(0)
  	          line = text.substring(lineStart);
  	          lineEnd = text.length;
  	        }
  	        chars += String.fromCharCode(lineArrayLength);
  	        lineHash[line] = lineArrayLength;
  	        lineArray[lineArrayLength++] = line;
  	      }
  	      lineStart = lineEnd + 1;
  	    }
  	    return chars;
  	  }
  	  // Allocate 2/3rds of the space for text1, the rest for text2.
  	  var maxLines = 40000;
  	  var chars1 = diff_linesToCharsMunge_(text1);
  	  maxLines = 65535;
  	  var chars2 = diff_linesToCharsMunge_(text2);
  	  return {chars1: chars1, chars2: chars2, lineArray: lineArray};
  	};


  	/**
  	 * Rehydrate the text in a diff from a string of line hashes to real lines of
  	 * text.
  	 * @param {!Array.<!diff_match_patch.Diff>} diffs Array of diff tuples.
  	 * @param {!Array.<string>} lineArray Array of unique strings.
  	 * @private
  	 */
  	diff_match_patch.prototype.diff_charsToLines_ = function(diffs, lineArray) {
  	  for (var i = 0; i < diffs.length; i++) {
  	    var chars = diffs[i][1];
  	    var text = [];
  	    for (var j = 0; j < chars.length; j++) {
  	      text[j] = lineArray[chars.charCodeAt(j)];
  	    }
  	    diffs[i][1] = text.join('');
  	  }
  	};


  	/**
  	 * Determine the common prefix of two strings.
  	 * @param {string} text1 First string.
  	 * @param {string} text2 Second string.
  	 * @return {number} The number of characters common to the start of each
  	 *     string.
  	 */
  	diff_match_patch.prototype.diff_commonPrefix = function(text1, text2) {
  	  // Quick check for common null cases.
  	  if (!text1 || !text2 || text1.charAt(0) != text2.charAt(0)) {
  	    return 0;
  	  }
  	  // Binary search.
  	  // Performance analysis: https://neil.fraser.name/news/2007/10/09/
  	  var pointermin = 0;
  	  var pointermax = Math.min(text1.length, text2.length);
  	  var pointermid = pointermax;
  	  var pointerstart = 0;
  	  while (pointermin < pointermid) {
  	    if (text1.substring(pointerstart, pointermid) ==
  	        text2.substring(pointerstart, pointermid)) {
  	      pointermin = pointermid;
  	      pointerstart = pointermin;
  	    } else {
  	      pointermax = pointermid;
  	    }
  	    pointermid = Math.floor((pointermax - pointermin) / 2 + pointermin);
  	  }
  	  return pointermid;
  	};


  	/**
  	 * Determine the common suffix of two strings.
  	 * @param {string} text1 First string.
  	 * @param {string} text2 Second string.
  	 * @return {number} The number of characters common to the end of each string.
  	 */
  	diff_match_patch.prototype.diff_commonSuffix = function(text1, text2) {
  	  // Quick check for common null cases.
  	  if (!text1 || !text2 ||
  	      text1.charAt(text1.length - 1) != text2.charAt(text2.length - 1)) {
  	    return 0;
  	  }
  	  // Binary search.
  	  // Performance analysis: https://neil.fraser.name/news/2007/10/09/
  	  var pointermin = 0;
  	  var pointermax = Math.min(text1.length, text2.length);
  	  var pointermid = pointermax;
  	  var pointerend = 0;
  	  while (pointermin < pointermid) {
  	    if (text1.substring(text1.length - pointermid, text1.length - pointerend) ==
  	        text2.substring(text2.length - pointermid, text2.length - pointerend)) {
  	      pointermin = pointermid;
  	      pointerend = pointermin;
  	    } else {
  	      pointermax = pointermid;
  	    }
  	    pointermid = Math.floor((pointermax - pointermin) / 2 + pointermin);
  	  }
  	  return pointermid;
  	};


  	/**
  	 * Determine if the suffix of one string is the prefix of another.
  	 * @param {string} text1 First string.
  	 * @param {string} text2 Second string.
  	 * @return {number} The number of characters common to the end of the first
  	 *     string and the start of the second string.
  	 * @private
  	 */
  	diff_match_patch.prototype.diff_commonOverlap_ = function(text1, text2) {
  	  // Cache the text lengths to prevent multiple calls.
  	  var text1_length = text1.length;
  	  var text2_length = text2.length;
  	  // Eliminate the null case.
  	  if (text1_length == 0 || text2_length == 0) {
  	    return 0;
  	  }
  	  // Truncate the longer string.
  	  if (text1_length > text2_length) {
  	    text1 = text1.substring(text1_length - text2_length);
  	  } else if (text1_length < text2_length) {
  	    text2 = text2.substring(0, text1_length);
  	  }
  	  var text_length = Math.min(text1_length, text2_length);
  	  // Quick check for the worst case.
  	  if (text1 == text2) {
  	    return text_length;
  	  }

  	  // Start by looking for a single character match
  	  // and increase length until no match is found.
  	  // Performance analysis: https://neil.fraser.name/news/2010/11/04/
  	  var best = 0;
  	  var length = 1;
  	  while (true) {
  	    var pattern = text1.substring(text_length - length);
  	    var found = text2.indexOf(pattern);
  	    if (found == -1) {
  	      return best;
  	    }
  	    length += found;
  	    if (found == 0 || text1.substring(text_length - length) ==
  	        text2.substring(0, length)) {
  	      best = length;
  	      length++;
  	    }
  	  }
  	};


  	/**
  	 * Do the two texts share a substring which is at least half the length of the
  	 * longer text?
  	 * This speedup can produce non-minimal diffs.
  	 * @param {string} text1 First string.
  	 * @param {string} text2 Second string.
  	 * @return {Array.<string>} Five element Array, containing the prefix of
  	 *     text1, the suffix of text1, the prefix of text2, the suffix of
  	 *     text2 and the common middle.  Or null if there was no match.
  	 * @private
  	 */
  	diff_match_patch.prototype.diff_halfMatch_ = function(text1, text2) {
  	  if (this.Diff_Timeout <= 0) {
  	    // Don't risk returning a non-optimal diff if we have unlimited time.
  	    return null;
  	  }
  	  var longtext = text1.length > text2.length ? text1 : text2;
  	  var shorttext = text1.length > text2.length ? text2 : text1;
  	  if (longtext.length < 4 || shorttext.length * 2 < longtext.length) {
  	    return null;  // Pointless.
  	  }
  	  var dmp = this;  // 'this' becomes 'window' in a closure.

  	  /**
  	   * Does a substring of shorttext exist within longtext such that the substring
  	   * is at least half the length of longtext?
  	   * Closure, but does not reference any external variables.
  	   * @param {string} longtext Longer string.
  	   * @param {string} shorttext Shorter string.
  	   * @param {number} i Start index of quarter length substring within longtext.
  	   * @return {Array.<string>} Five element Array, containing the prefix of
  	   *     longtext, the suffix of longtext, the prefix of shorttext, the suffix
  	   *     of shorttext and the common middle.  Or null if there was no match.
  	   * @private
  	   */
  	  function diff_halfMatchI_(longtext, shorttext, i) {
  	    // Start with a 1/4 length substring at position i as a seed.
  	    var seed = longtext.substring(i, i + Math.floor(longtext.length / 4));
  	    var j = -1;
  	    var best_common = '';
  	    var best_longtext_a, best_longtext_b, best_shorttext_a, best_shorttext_b;
  	    while ((j = shorttext.indexOf(seed, j + 1)) != -1) {
  	      var prefixLength = dmp.diff_commonPrefix(longtext.substring(i),
  	                                               shorttext.substring(j));
  	      var suffixLength = dmp.diff_commonSuffix(longtext.substring(0, i),
  	                                               shorttext.substring(0, j));
  	      if (best_common.length < suffixLength + prefixLength) {
  	        best_common = shorttext.substring(j - suffixLength, j) +
  	            shorttext.substring(j, j + prefixLength);
  	        best_longtext_a = longtext.substring(0, i - suffixLength);
  	        best_longtext_b = longtext.substring(i + prefixLength);
  	        best_shorttext_a = shorttext.substring(0, j - suffixLength);
  	        best_shorttext_b = shorttext.substring(j + prefixLength);
  	      }
  	    }
  	    if (best_common.length * 2 >= longtext.length) {
  	      return [best_longtext_a, best_longtext_b,
  	              best_shorttext_a, best_shorttext_b, best_common];
  	    } else {
  	      return null;
  	    }
  	  }

  	  // First check if the second quarter is the seed for a half-match.
  	  var hm1 = diff_halfMatchI_(longtext, shorttext,
  	                             Math.ceil(longtext.length / 4));
  	  // Check again based on the third quarter.
  	  var hm2 = diff_halfMatchI_(longtext, shorttext,
  	                             Math.ceil(longtext.length / 2));
  	  var hm;
  	  if (!hm1 && !hm2) {
  	    return null;
  	  } else if (!hm2) {
  	    hm = hm1;
  	  } else if (!hm1) {
  	    hm = hm2;
  	  } else {
  	    // Both matched.  Select the longest.
  	    hm = hm1[4].length > hm2[4].length ? hm1 : hm2;
  	  }

  	  // A half-match was found, sort out the return data.
  	  var text1_a, text1_b, text2_a, text2_b;
  	  if (text1.length > text2.length) {
  	    text1_a = hm[0];
  	    text1_b = hm[1];
  	    text2_a = hm[2];
  	    text2_b = hm[3];
  	  } else {
  	    text2_a = hm[0];
  	    text2_b = hm[1];
  	    text1_a = hm[2];
  	    text1_b = hm[3];
  	  }
  	  var mid_common = hm[4];
  	  return [text1_a, text1_b, text2_a, text2_b, mid_common];
  	};


  	/**
  	 * Reduce the number of edits by eliminating semantically trivial equalities.
  	 * @param {!Array.<!diff_match_patch.Diff>} diffs Array of diff tuples.
  	 */
  	diff_match_patch.prototype.diff_cleanupSemantic = function(diffs) {
  	  var changes = false;
  	  var equalities = [];  // Stack of indices where equalities are found.
  	  var equalitiesLength = 0;  // Keeping our own length var is faster in JS.
  	  /** @type {?string} */
  	  var lastEquality = null;
  	  // Always equal to diffs[equalities[equalitiesLength - 1]][1]
  	  var pointer = 0;  // Index of current position.
  	  // Number of characters that changed prior to the equality.
  	  var length_insertions1 = 0;
  	  var length_deletions1 = 0;
  	  // Number of characters that changed after the equality.
  	  var length_insertions2 = 0;
  	  var length_deletions2 = 0;
  	  while (pointer < diffs.length) {
  	    if (diffs[pointer][0] == DIFF_EQUAL) {  // Equality found.
  	      equalities[equalitiesLength++] = pointer;
  	      length_insertions1 = length_insertions2;
  	      length_deletions1 = length_deletions2;
  	      length_insertions2 = 0;
  	      length_deletions2 = 0;
  	      lastEquality = diffs[pointer][1];
  	    } else {  // An insertion or deletion.
  	      if (diffs[pointer][0] == DIFF_INSERT) {
  	        length_insertions2 += diffs[pointer][1].length;
  	      } else {
  	        length_deletions2 += diffs[pointer][1].length;
  	      }
  	      // Eliminate an equality that is smaller or equal to the edits on both
  	      // sides of it.
  	      if (lastEquality && (lastEquality.length <=
  	          Math.max(length_insertions1, length_deletions1)) &&
  	          (lastEquality.length <= Math.max(length_insertions2,
  	                                           length_deletions2))) {
  	        // Duplicate record.
  	        diffs.splice(equalities[equalitiesLength - 1], 0,
  	                     new diff_match_patch.Diff(DIFF_DELETE, lastEquality));
  	        // Change second copy to insert.
  	        diffs[equalities[equalitiesLength - 1] + 1][0] = DIFF_INSERT;
  	        // Throw away the equality we just deleted.
  	        equalitiesLength--;
  	        // Throw away the previous equality (it needs to be reevaluated).
  	        equalitiesLength--;
  	        pointer = equalitiesLength > 0 ? equalities[equalitiesLength - 1] : -1;
  	        length_insertions1 = 0;  // Reset the counters.
  	        length_deletions1 = 0;
  	        length_insertions2 = 0;
  	        length_deletions2 = 0;
  	        lastEquality = null;
  	        changes = true;
  	      }
  	    }
  	    pointer++;
  	  }

  	  // Normalize the diff.
  	  if (changes) {
  	    this.diff_cleanupMerge(diffs);
  	  }
  	  this.diff_cleanupSemanticLossless(diffs);

  	  // Find any overlaps between deletions and insertions.
  	  // e.g: <del>abcxxx</del><ins>xxxdef</ins>
  	  //   -> <del>abc</del>xxx<ins>def</ins>
  	  // e.g: <del>xxxabc</del><ins>defxxx</ins>
  	  //   -> <ins>def</ins>xxx<del>abc</del>
  	  // Only extract an overlap if it is as big as the edit ahead or behind it.
  	  pointer = 1;
  	  while (pointer < diffs.length) {
  	    if (diffs[pointer - 1][0] == DIFF_DELETE &&
  	        diffs[pointer][0] == DIFF_INSERT) {
  	      var deletion = diffs[pointer - 1][1];
  	      var insertion = diffs[pointer][1];
  	      var overlap_length1 = this.diff_commonOverlap_(deletion, insertion);
  	      var overlap_length2 = this.diff_commonOverlap_(insertion, deletion);
  	      if (overlap_length1 >= overlap_length2) {
  	        if (overlap_length1 >= deletion.length / 2 ||
  	            overlap_length1 >= insertion.length / 2) {
  	          // Overlap found.  Insert an equality and trim the surrounding edits.
  	          diffs.splice(pointer, 0, new diff_match_patch.Diff(DIFF_EQUAL,
  	              insertion.substring(0, overlap_length1)));
  	          diffs[pointer - 1][1] =
  	              deletion.substring(0, deletion.length - overlap_length1);
  	          diffs[pointer + 1][1] = insertion.substring(overlap_length1);
  	          pointer++;
  	        }
  	      } else {
  	        if (overlap_length2 >= deletion.length / 2 ||
  	            overlap_length2 >= insertion.length / 2) {
  	          // Reverse overlap found.
  	          // Insert an equality and swap and trim the surrounding edits.
  	          diffs.splice(pointer, 0, new diff_match_patch.Diff(DIFF_EQUAL,
  	              deletion.substring(0, overlap_length2)));
  	          diffs[pointer - 1][0] = DIFF_INSERT;
  	          diffs[pointer - 1][1] =
  	              insertion.substring(0, insertion.length - overlap_length2);
  	          diffs[pointer + 1][0] = DIFF_DELETE;
  	          diffs[pointer + 1][1] =
  	              deletion.substring(overlap_length2);
  	          pointer++;
  	        }
  	      }
  	      pointer++;
  	    }
  	    pointer++;
  	  }
  	};


  	/**
  	 * Look for single edits surrounded on both sides by equalities
  	 * which can be shifted sideways to align the edit to a word boundary.
  	 * e.g: The c<ins>at c</ins>ame. -> The <ins>cat </ins>came.
  	 * @param {!Array.<!diff_match_patch.Diff>} diffs Array of diff tuples.
  	 */
  	diff_match_patch.prototype.diff_cleanupSemanticLossless = function(diffs) {
  	  /**
  	   * Given two strings, compute a score representing whether the internal
  	   * boundary falls on logical boundaries.
  	   * Scores range from 6 (best) to 0 (worst).
  	   * Closure, but does not reference any external variables.
  	   * @param {string} one First string.
  	   * @param {string} two Second string.
  	   * @return {number} The score.
  	   * @private
  	   */
  	  function diff_cleanupSemanticScore_(one, two) {
  	    if (!one || !two) {
  	      // Edges are the best.
  	      return 6;
  	    }

  	    // Each port of this function behaves slightly differently due to
  	    // subtle differences in each language's definition of things like
  	    // 'whitespace'.  Since this function's purpose is largely cosmetic,
  	    // the choice has been made to use each language's native features
  	    // rather than force total conformity.
  	    var char1 = one.charAt(one.length - 1);
  	    var char2 = two.charAt(0);
  	    var nonAlphaNumeric1 = char1.match(diff_match_patch.nonAlphaNumericRegex_);
  	    var nonAlphaNumeric2 = char2.match(diff_match_patch.nonAlphaNumericRegex_);
  	    var whitespace1 = nonAlphaNumeric1 &&
  	        char1.match(diff_match_patch.whitespaceRegex_);
  	    var whitespace2 = nonAlphaNumeric2 &&
  	        char2.match(diff_match_patch.whitespaceRegex_);
  	    var lineBreak1 = whitespace1 &&
  	        char1.match(diff_match_patch.linebreakRegex_);
  	    var lineBreak2 = whitespace2 &&
  	        char2.match(diff_match_patch.linebreakRegex_);
  	    var blankLine1 = lineBreak1 &&
  	        one.match(diff_match_patch.blanklineEndRegex_);
  	    var blankLine2 = lineBreak2 &&
  	        two.match(diff_match_patch.blanklineStartRegex_);

  	    if (blankLine1 || blankLine2) {
  	      // Five points for blank lines.
  	      return 5;
  	    } else if (lineBreak1 || lineBreak2) {
  	      // Four points for line breaks.
  	      return 4;
  	    } else if (nonAlphaNumeric1 && !whitespace1 && whitespace2) {
  	      // Three points for end of sentences.
  	      return 3;
  	    } else if (whitespace1 || whitespace2) {
  	      // Two points for whitespace.
  	      return 2;
  	    } else if (nonAlphaNumeric1 || nonAlphaNumeric2) {
  	      // One point for non-alphanumeric.
  	      return 1;
  	    }
  	    return 0;
  	  }

  	  var pointer = 1;
  	  // Intentionally ignore the first and last element (don't need checking).
  	  while (pointer < diffs.length - 1) {
  	    if (diffs[pointer - 1][0] == DIFF_EQUAL &&
  	        diffs[pointer + 1][0] == DIFF_EQUAL) {
  	      // This is a single edit surrounded by equalities.
  	      var equality1 = diffs[pointer - 1][1];
  	      var edit = diffs[pointer][1];
  	      var equality2 = diffs[pointer + 1][1];

  	      // First, shift the edit as far left as possible.
  	      var commonOffset = this.diff_commonSuffix(equality1, edit);
  	      if (commonOffset) {
  	        var commonString = edit.substring(edit.length - commonOffset);
  	        equality1 = equality1.substring(0, equality1.length - commonOffset);
  	        edit = commonString + edit.substring(0, edit.length - commonOffset);
  	        equality2 = commonString + equality2;
  	      }

  	      // Second, step character by character right, looking for the best fit.
  	      var bestEquality1 = equality1;
  	      var bestEdit = edit;
  	      var bestEquality2 = equality2;
  	      var bestScore = diff_cleanupSemanticScore_(equality1, edit) +
  	          diff_cleanupSemanticScore_(edit, equality2);
  	      while (edit.charAt(0) === equality2.charAt(0)) {
  	        equality1 += edit.charAt(0);
  	        edit = edit.substring(1) + equality2.charAt(0);
  	        equality2 = equality2.substring(1);
  	        var score = diff_cleanupSemanticScore_(equality1, edit) +
  	            diff_cleanupSemanticScore_(edit, equality2);
  	        // The >= encourages trailing rather than leading whitespace on edits.
  	        if (score >= bestScore) {
  	          bestScore = score;
  	          bestEquality1 = equality1;
  	          bestEdit = edit;
  	          bestEquality2 = equality2;
  	        }
  	      }

  	      if (diffs[pointer - 1][1] != bestEquality1) {
  	        // We have an improvement, save it back to the diff.
  	        if (bestEquality1) {
  	          diffs[pointer - 1][1] = bestEquality1;
  	        } else {
  	          diffs.splice(pointer - 1, 1);
  	          pointer--;
  	        }
  	        diffs[pointer][1] = bestEdit;
  	        if (bestEquality2) {
  	          diffs[pointer + 1][1] = bestEquality2;
  	        } else {
  	          diffs.splice(pointer + 1, 1);
  	          pointer--;
  	        }
  	      }
  	    }
  	    pointer++;
  	  }
  	};

  	// Define some regex patterns for matching boundaries.
  	diff_match_patch.nonAlphaNumericRegex_ = /[^a-zA-Z0-9]/;
  	diff_match_patch.whitespaceRegex_ = /\s/;
  	diff_match_patch.linebreakRegex_ = /[\r\n]/;
  	diff_match_patch.blanklineEndRegex_ = /\n\r?\n$/;
  	diff_match_patch.blanklineStartRegex_ = /^\r?\n\r?\n/;

  	/**
  	 * Reduce the number of edits by eliminating operationally trivial equalities.
  	 * @param {!Array.<!diff_match_patch.Diff>} diffs Array of diff tuples.
  	 */
  	diff_match_patch.prototype.diff_cleanupEfficiency = function(diffs) {
  	  var changes = false;
  	  var equalities = [];  // Stack of indices where equalities are found.
  	  var equalitiesLength = 0;  // Keeping our own length var is faster in JS.
  	  /** @type {?string} */
  	  var lastEquality = null;
  	  // Always equal to diffs[equalities[equalitiesLength - 1]][1]
  	  var pointer = 0;  // Index of current position.
  	  // Is there an insertion operation before the last equality.
  	  var pre_ins = false;
  	  // Is there a deletion operation before the last equality.
  	  var pre_del = false;
  	  // Is there an insertion operation after the last equality.
  	  var post_ins = false;
  	  // Is there a deletion operation after the last equality.
  	  var post_del = false;
  	  while (pointer < diffs.length) {
  	    if (diffs[pointer][0] == DIFF_EQUAL) {  // Equality found.
  	      if (diffs[pointer][1].length < this.Diff_EditCost &&
  	          (post_ins || post_del)) {
  	        // Candidate found.
  	        equalities[equalitiesLength++] = pointer;
  	        pre_ins = post_ins;
  	        pre_del = post_del;
  	        lastEquality = diffs[pointer][1];
  	      } else {
  	        // Not a candidate, and can never become one.
  	        equalitiesLength = 0;
  	        lastEquality = null;
  	      }
  	      post_ins = post_del = false;
  	    } else {  // An insertion or deletion.
  	      if (diffs[pointer][0] == DIFF_DELETE) {
  	        post_del = true;
  	      } else {
  	        post_ins = true;
  	      }
  	      /*
  	       * Five types to be split:
  	       * <ins>A</ins><del>B</del>XY<ins>C</ins><del>D</del>
  	       * <ins>A</ins>X<ins>C</ins><del>D</del>
  	       * <ins>A</ins><del>B</del>X<ins>C</ins>
  	       * <ins>A</del>X<ins>C</ins><del>D</del>
  	       * <ins>A</ins><del>B</del>X<del>C</del>
  	       */
  	      if (lastEquality && ((pre_ins && pre_del && post_ins && post_del) ||
  	                           ((lastEquality.length < this.Diff_EditCost / 2) &&
  	                            (pre_ins + pre_del + post_ins + post_del) == 3))) {
  	        // Duplicate record.
  	        diffs.splice(equalities[equalitiesLength - 1], 0,
  	                     new diff_match_patch.Diff(DIFF_DELETE, lastEquality));
  	        // Change second copy to insert.
  	        diffs[equalities[equalitiesLength - 1] + 1][0] = DIFF_INSERT;
  	        equalitiesLength--;  // Throw away the equality we just deleted;
  	        lastEquality = null;
  	        if (pre_ins && pre_del) {
  	          // No changes made which could affect previous entry, keep going.
  	          post_ins = post_del = true;
  	          equalitiesLength = 0;
  	        } else {
  	          equalitiesLength--;  // Throw away the previous equality.
  	          pointer = equalitiesLength > 0 ?
  	              equalities[equalitiesLength - 1] : -1;
  	          post_ins = post_del = false;
  	        }
  	        changes = true;
  	      }
  	    }
  	    pointer++;
  	  }

  	  if (changes) {
  	    this.diff_cleanupMerge(diffs);
  	  }
  	};


  	/**
  	 * Reorder and merge like edit sections.  Merge equalities.
  	 * Any edit section can move as long as it doesn't cross an equality.
  	 * @param {!Array.<!diff_match_patch.Diff>} diffs Array of diff tuples.
  	 */
  	diff_match_patch.prototype.diff_cleanupMerge = function(diffs) {
  	  // Add a dummy entry at the end.
  	  diffs.push(new diff_match_patch.Diff(DIFF_EQUAL, ''));
  	  var pointer = 0;
  	  var count_delete = 0;
  	  var count_insert = 0;
  	  var text_delete = '';
  	  var text_insert = '';
  	  var commonlength;
  	  while (pointer < diffs.length) {
  	    switch (diffs[pointer][0]) {
  	      case DIFF_INSERT:
  	        count_insert++;
  	        text_insert += diffs[pointer][1];
  	        pointer++;
  	        break;
  	      case DIFF_DELETE:
  	        count_delete++;
  	        text_delete += diffs[pointer][1];
  	        pointer++;
  	        break;
  	      case DIFF_EQUAL:
  	        // Upon reaching an equality, check for prior redundancies.
  	        if (count_delete + count_insert > 1) {
  	          if (count_delete !== 0 && count_insert !== 0) {
  	            // Factor out any common prefixies.
  	            commonlength = this.diff_commonPrefix(text_insert, text_delete);
  	            if (commonlength !== 0) {
  	              if ((pointer - count_delete - count_insert) > 0 &&
  	                  diffs[pointer - count_delete - count_insert - 1][0] ==
  	                  DIFF_EQUAL) {
  	                diffs[pointer - count_delete - count_insert - 1][1] +=
  	                    text_insert.substring(0, commonlength);
  	              } else {
  	                diffs.splice(0, 0, new diff_match_patch.Diff(DIFF_EQUAL,
  	                    text_insert.substring(0, commonlength)));
  	                pointer++;
  	              }
  	              text_insert = text_insert.substring(commonlength);
  	              text_delete = text_delete.substring(commonlength);
  	            }
  	            // Factor out any common suffixies.
  	            commonlength = this.diff_commonSuffix(text_insert, text_delete);
  	            if (commonlength !== 0) {
  	              diffs[pointer][1] = text_insert.substring(text_insert.length -
  	                  commonlength) + diffs[pointer][1];
  	              text_insert = text_insert.substring(0, text_insert.length -
  	                  commonlength);
  	              text_delete = text_delete.substring(0, text_delete.length -
  	                  commonlength);
  	            }
  	          }
  	          // Delete the offending records and add the merged ones.
  	          pointer -= count_delete + count_insert;
  	          diffs.splice(pointer, count_delete + count_insert);
  	          if (text_delete.length) {
  	            diffs.splice(pointer, 0,
  	                new diff_match_patch.Diff(DIFF_DELETE, text_delete));
  	            pointer++;
  	          }
  	          if (text_insert.length) {
  	            diffs.splice(pointer, 0,
  	                new diff_match_patch.Diff(DIFF_INSERT, text_insert));
  	            pointer++;
  	          }
  	          pointer++;
  	        } else if (pointer !== 0 && diffs[pointer - 1][0] == DIFF_EQUAL) {
  	          // Merge this equality with the previous one.
  	          diffs[pointer - 1][1] += diffs[pointer][1];
  	          diffs.splice(pointer, 1);
  	        } else {
  	          pointer++;
  	        }
  	        count_insert = 0;
  	        count_delete = 0;
  	        text_delete = '';
  	        text_insert = '';
  	        break;
  	    }
  	  }
  	  if (diffs[diffs.length - 1][1] === '') {
  	    diffs.pop();  // Remove the dummy entry at the end.
  	  }

  	  // Second pass: look for single edits surrounded on both sides by equalities
  	  // which can be shifted sideways to eliminate an equality.
  	  // e.g: A<ins>BA</ins>C -> <ins>AB</ins>AC
  	  var changes = false;
  	  pointer = 1;
  	  // Intentionally ignore the first and last element (don't need checking).
  	  while (pointer < diffs.length - 1) {
  	    if (diffs[pointer - 1][0] == DIFF_EQUAL &&
  	        diffs[pointer + 1][0] == DIFF_EQUAL) {
  	      // This is a single edit surrounded by equalities.
  	      if (diffs[pointer][1].substring(diffs[pointer][1].length -
  	          diffs[pointer - 1][1].length) == diffs[pointer - 1][1]) {
  	        // Shift the edit over the previous equality.
  	        diffs[pointer][1] = diffs[pointer - 1][1] +
  	            diffs[pointer][1].substring(0, diffs[pointer][1].length -
  	                                        diffs[pointer - 1][1].length);
  	        diffs[pointer + 1][1] = diffs[pointer - 1][1] + diffs[pointer + 1][1];
  	        diffs.splice(pointer - 1, 1);
  	        changes = true;
  	      } else if (diffs[pointer][1].substring(0, diffs[pointer + 1][1].length) ==
  	          diffs[pointer + 1][1]) {
  	        // Shift the edit over the next equality.
  	        diffs[pointer - 1][1] += diffs[pointer + 1][1];
  	        diffs[pointer][1] =
  	            diffs[pointer][1].substring(diffs[pointer + 1][1].length) +
  	            diffs[pointer + 1][1];
  	        diffs.splice(pointer + 1, 1);
  	        changes = true;
  	      }
  	    }
  	    pointer++;
  	  }
  	  // If shifts were made, the diff needs reordering and another shift sweep.
  	  if (changes) {
  	    this.diff_cleanupMerge(diffs);
  	  }
  	};


  	/**
  	 * loc is a location in text1, compute and return the equivalent location in
  	 * text2.
  	 * e.g. 'The cat' vs 'The big cat', 1->1, 5->8
  	 * @param {!Array.<!diff_match_patch.Diff>} diffs Array of diff tuples.
  	 * @param {number} loc Location within text1.
  	 * @return {number} Location within text2.
  	 */
  	diff_match_patch.prototype.diff_xIndex = function(diffs, loc) {
  	  var chars1 = 0;
  	  var chars2 = 0;
  	  var last_chars1 = 0;
  	  var last_chars2 = 0;
  	  var x;
  	  for (x = 0; x < diffs.length; x++) {
  	    if (diffs[x][0] !== DIFF_INSERT) {  // Equality or deletion.
  	      chars1 += diffs[x][1].length;
  	    }
  	    if (diffs[x][0] !== DIFF_DELETE) {  // Equality or insertion.
  	      chars2 += diffs[x][1].length;
  	    }
  	    if (chars1 > loc) {  // Overshot the location.
  	      break;
  	    }
  	    last_chars1 = chars1;
  	    last_chars2 = chars2;
  	  }
  	  // Was the location was deleted?
  	  if (diffs.length != x && diffs[x][0] === DIFF_DELETE) {
  	    return last_chars2;
  	  }
  	  // Add the remaining character length.
  	  return last_chars2 + (loc - last_chars1);
  	};


  	/**
  	 * Convert a diff array into a pretty HTML report.
  	 * @param {!Array.<!diff_match_patch.Diff>} diffs Array of diff tuples.
  	 * @return {string} HTML representation.
  	 */
  	diff_match_patch.prototype.diff_prettyHtml = function(diffs) {
  	  var html = [];
  	  var pattern_amp = /&/g;
  	  var pattern_lt = /</g;
  	  var pattern_gt = />/g;
  	  var pattern_para = /\n/g;
  	  for (var x = 0; x < diffs.length; x++) {
  	    var op = diffs[x][0];    // Operation (insert, delete, equal)
  	    var data = diffs[x][1];  // Text of change.
  	    var text = data.replace(pattern_amp, '&amp;').replace(pattern_lt, '&lt;')
  	        .replace(pattern_gt, '&gt;').replace(pattern_para, '&para;<br>');
  	    switch (op) {
  	      case DIFF_INSERT:
  	        html[x] = '<ins style="background:#e6ffe6;">' + text + '</ins>';
  	        break;
  	      case DIFF_DELETE:
  	        html[x] = '<del style="background:#ffe6e6;">' + text + '</del>';
  	        break;
  	      case DIFF_EQUAL:
  	        html[x] = '<span>' + text + '</span>';
  	        break;
  	    }
  	  }
  	  return html.join('');
  	};


  	/**
  	 * Compute and return the source text (all equalities and deletions).
  	 * @param {!Array.<!diff_match_patch.Diff>} diffs Array of diff tuples.
  	 * @return {string} Source text.
  	 */
  	diff_match_patch.prototype.diff_text1 = function(diffs) {
  	  var text = [];
  	  for (var x = 0; x < diffs.length; x++) {
  	    if (diffs[x][0] !== DIFF_INSERT) {
  	      text[x] = diffs[x][1];
  	    }
  	  }
  	  return text.join('');
  	};


  	/**
  	 * Compute and return the destination text (all equalities and insertions).
  	 * @param {!Array.<!diff_match_patch.Diff>} diffs Array of diff tuples.
  	 * @return {string} Destination text.
  	 */
  	diff_match_patch.prototype.diff_text2 = function(diffs) {
  	  var text = [];
  	  for (var x = 0; x < diffs.length; x++) {
  	    if (diffs[x][0] !== DIFF_DELETE) {
  	      text[x] = diffs[x][1];
  	    }
  	  }
  	  return text.join('');
  	};


  	/**
  	 * Compute the Levenshtein distance; the number of inserted, deleted or
  	 * substituted characters.
  	 * @param {!Array.<!diff_match_patch.Diff>} diffs Array of diff tuples.
  	 * @return {number} Number of changes.
  	 */
  	diff_match_patch.prototype.diff_levenshtein = function(diffs) {
  	  var levenshtein = 0;
  	  var insertions = 0;
  	  var deletions = 0;
  	  for (var x = 0; x < diffs.length; x++) {
  	    var op = diffs[x][0];
  	    var data = diffs[x][1];
  	    switch (op) {
  	      case DIFF_INSERT:
  	        insertions += data.length;
  	        break;
  	      case DIFF_DELETE:
  	        deletions += data.length;
  	        break;
  	      case DIFF_EQUAL:
  	        // A deletion and an insertion is one substitution.
  	        levenshtein += Math.max(insertions, deletions);
  	        insertions = 0;
  	        deletions = 0;
  	        break;
  	    }
  	  }
  	  levenshtein += Math.max(insertions, deletions);
  	  return levenshtein;
  	};


  	/**
  	 * Crush the diff into an encoded string which describes the operations
  	 * required to transform text1 into text2.
  	 * E.g. =3\t-2\t+ing  -> Keep 3 chars, delete 2 chars, insert 'ing'.
  	 * Operations are tab-separated.  Inserted text is escaped using %xx notation.
  	 * @param {!Array.<!diff_match_patch.Diff>} diffs Array of diff tuples.
  	 * @return {string} Delta text.
  	 */
  	diff_match_patch.prototype.diff_toDelta = function(diffs) {
  	  var text = [];
  	  for (var x = 0; x < diffs.length; x++) {
  	    switch (diffs[x][0]) {
  	      case DIFF_INSERT:
  	        text[x] = '+' + encodeURI(diffs[x][1]);
  	        break;
  	      case DIFF_DELETE:
  	        text[x] = '-' + diffs[x][1].length;
  	        break;
  	      case DIFF_EQUAL:
  	        text[x] = '=' + diffs[x][1].length;
  	        break;
  	    }
  	  }
  	  return text.join('\t').replace(/%20/g, ' ');
  	};


  	/**
  	 * Given the original text1, and an encoded string which describes the
  	 * operations required to transform text1 into text2, compute the full diff.
  	 * @param {string} text1 Source string for the diff.
  	 * @param {string} delta Delta text.
  	 * @return {!Array.<!diff_match_patch.Diff>} Array of diff tuples.
  	 * @throws {!Error} If invalid input.
  	 */
  	diff_match_patch.prototype.diff_fromDelta = function(text1, delta) {
  	  var diffs = [];
  	  var diffsLength = 0;  // Keeping our own length var is faster in JS.
  	  var pointer = 0;  // Cursor in text1
  	  var tokens = delta.split(/\t/g);
  	  for (var x = 0; x < tokens.length; x++) {
  	    // Each token begins with a one character parameter which specifies the
  	    // operation of this token (delete, insert, equality).
  	    var param = tokens[x].substring(1);
  	    switch (tokens[x].charAt(0)) {
  	      case '+':
  	        try {
  	          diffs[diffsLength++] =
  	              new diff_match_patch.Diff(DIFF_INSERT, decodeURI(param));
  	        } catch (ex) {
  	          // Malformed URI sequence.
  	          throw new Error('Illegal escape in diff_fromDelta: ' + param);
  	        }
  	        break;
  	      case '-':
  	        // Fall through.
  	      case '=':
  	        var n = parseInt(param, 10);
  	        if (isNaN(n) || n < 0) {
  	          throw new Error('Invalid number in diff_fromDelta: ' + param);
  	        }
  	        var text = text1.substring(pointer, pointer += n);
  	        if (tokens[x].charAt(0) == '=') {
  	          diffs[diffsLength++] = new diff_match_patch.Diff(DIFF_EQUAL, text);
  	        } else {
  	          diffs[diffsLength++] = new diff_match_patch.Diff(DIFF_DELETE, text);
  	        }
  	        break;
  	      default:
  	        // Blank tokens are ok (from a trailing \t).
  	        // Anything else is an error.
  	        if (tokens[x]) {
  	          throw new Error('Invalid diff operation in diff_fromDelta: ' +
  	                          tokens[x]);
  	        }
  	    }
  	  }
  	  if (pointer != text1.length) {
  	    throw new Error('Delta length (' + pointer +
  	        ') does not equal source text length (' + text1.length + ').');
  	  }
  	  return diffs;
  	};


  	//  MATCH FUNCTIONS


  	/**
  	 * Locate the best instance of 'pattern' in 'text' near 'loc'.
  	 * @param {string} text The text to search.
  	 * @param {string} pattern The pattern to search for.
  	 * @param {number} loc The location to search around.
  	 * @return {number} Best match index or -1.
  	 */
  	diff_match_patch.prototype.match_main = function(text, pattern, loc) {
  	  // Check for null inputs.
  	  if (text == null || pattern == null || loc == null) {
  	    throw new Error('Null input. (match_main)');
  	  }

  	  loc = Math.max(0, Math.min(loc, text.length));
  	  if (text == pattern) {
  	    // Shortcut (potentially not guaranteed by the algorithm)
  	    return 0;
  	  } else if (!text.length) {
  	    // Nothing to match.
  	    return -1;
  	  } else if (text.substring(loc, loc + pattern.length) == pattern) {
  	    // Perfect match at the perfect spot!  (Includes case of null pattern)
  	    return loc;
  	  } else {
  	    // Do a fuzzy compare.
  	    return this.match_bitap_(text, pattern, loc);
  	  }
  	};


  	/**
  	 * Locate the best instance of 'pattern' in 'text' near 'loc' using the
  	 * Bitap algorithm.
  	 * @param {string} text The text to search.
  	 * @param {string} pattern The pattern to search for.
  	 * @param {number} loc The location to search around.
  	 * @return {number} Best match index or -1.
  	 * @private
  	 */
  	diff_match_patch.prototype.match_bitap_ = function(text, pattern, loc) {
  	  if (pattern.length > this.Match_MaxBits) {
  	    throw new Error('Pattern too long for this browser.');
  	  }

  	  // Initialise the alphabet.
  	  var s = this.match_alphabet_(pattern);

  	  var dmp = this;  // 'this' becomes 'window' in a closure.

  	  /**
  	   * Compute and return the score for a match with e errors and x location.
  	   * Accesses loc and pattern through being a closure.
  	   * @param {number} e Number of errors in match.
  	   * @param {number} x Location of match.
  	   * @return {number} Overall score for match (0.0 = good, 1.0 = bad).
  	   * @private
  	   */
  	  function match_bitapScore_(e, x) {
  	    var accuracy = e / pattern.length;
  	    var proximity = Math.abs(loc - x);
  	    if (!dmp.Match_Distance) {
  	      // Dodge divide by zero error.
  	      return proximity ? 1.0 : accuracy;
  	    }
  	    return accuracy + (proximity / dmp.Match_Distance);
  	  }

  	  // Highest score beyond which we give up.
  	  var score_threshold = this.Match_Threshold;
  	  // Is there a nearby exact match? (speedup)
  	  var best_loc = text.indexOf(pattern, loc);
  	  if (best_loc != -1) {
  	    score_threshold = Math.min(match_bitapScore_(0, best_loc), score_threshold);
  	    // What about in the other direction? (speedup)
  	    best_loc = text.lastIndexOf(pattern, loc + pattern.length);
  	    if (best_loc != -1) {
  	      score_threshold =
  	          Math.min(match_bitapScore_(0, best_loc), score_threshold);
  	    }
  	  }

  	  // Initialise the bit arrays.
  	  var matchmask = 1 << (pattern.length - 1);
  	  best_loc = -1;

  	  var bin_min, bin_mid;
  	  var bin_max = pattern.length + text.length;
  	  var last_rd;
  	  for (var d = 0; d < pattern.length; d++) {
  	    // Scan for the best match; each iteration allows for one more error.
  	    // Run a binary search to determine how far from 'loc' we can stray at this
  	    // error level.
  	    bin_min = 0;
  	    bin_mid = bin_max;
  	    while (bin_min < bin_mid) {
  	      if (match_bitapScore_(d, loc + bin_mid) <= score_threshold) {
  	        bin_min = bin_mid;
  	      } else {
  	        bin_max = bin_mid;
  	      }
  	      bin_mid = Math.floor((bin_max - bin_min) / 2 + bin_min);
  	    }
  	    // Use the result from this iteration as the maximum for the next.
  	    bin_max = bin_mid;
  	    var start = Math.max(1, loc - bin_mid + 1);
  	    var finish = Math.min(loc + bin_mid, text.length) + pattern.length;

  	    var rd = Array(finish + 2);
  	    rd[finish + 1] = (1 << d) - 1;
  	    for (var j = finish; j >= start; j--) {
  	      // The alphabet (s) is a sparse hash, so the following line generates
  	      // warnings.
  	      var charMatch = s[text.charAt(j - 1)];
  	      if (d === 0) {  // First pass: exact match.
  	        rd[j] = ((rd[j + 1] << 1) | 1) & charMatch;
  	      } else {  // Subsequent passes: fuzzy match.
  	        rd[j] = (((rd[j + 1] << 1) | 1) & charMatch) |
  	                (((last_rd[j + 1] | last_rd[j]) << 1) | 1) |
  	                last_rd[j + 1];
  	      }
  	      if (rd[j] & matchmask) {
  	        var score = match_bitapScore_(d, j - 1);
  	        // This match will almost certainly be better than any existing match.
  	        // But check anyway.
  	        if (score <= score_threshold) {
  	          // Told you so.
  	          score_threshold = score;
  	          best_loc = j - 1;
  	          if (best_loc > loc) {
  	            // When passing loc, don't exceed our current distance from loc.
  	            start = Math.max(1, 2 * loc - best_loc);
  	          } else {
  	            // Already passed loc, downhill from here on in.
  	            break;
  	          }
  	        }
  	      }
  	    }
  	    // No hope for a (better) match at greater error levels.
  	    if (match_bitapScore_(d + 1, loc) > score_threshold) {
  	      break;
  	    }
  	    last_rd = rd;
  	  }
  	  return best_loc;
  	};


  	/**
  	 * Initialise the alphabet for the Bitap algorithm.
  	 * @param {string} pattern The text to encode.
  	 * @return {!Object} Hash of character locations.
  	 * @private
  	 */
  	diff_match_patch.prototype.match_alphabet_ = function(pattern) {
  	  var s = {};
  	  for (var i = 0; i < pattern.length; i++) {
  	    s[pattern.charAt(i)] = 0;
  	  }
  	  for (var i = 0; i < pattern.length; i++) {
  	    s[pattern.charAt(i)] |= 1 << (pattern.length - i - 1);
  	  }
  	  return s;
  	};


  	//  PATCH FUNCTIONS


  	/**
  	 * Increase the context until it is unique,
  	 * but don't let the pattern expand beyond Match_MaxBits.
  	 * @param {!diff_match_patch.patch_obj} patch The patch to grow.
  	 * @param {string} text Source text.
  	 * @private
  	 */
  	diff_match_patch.prototype.patch_addContext_ = function(patch, text) {
  	  if (text.length == 0) {
  	    return;
  	  }
  	  if (patch.start2 === null) {
  	    throw Error('patch not initialized');
  	  }
  	  var pattern = text.substring(patch.start2, patch.start2 + patch.length1);
  	  var padding = 0;

  	  // Look for the first and last matches of pattern in text.  If two different
  	  // matches are found, increase the pattern length.
  	  while (text.indexOf(pattern) != text.lastIndexOf(pattern) &&
  	         pattern.length < this.Match_MaxBits - this.Patch_Margin -
  	         this.Patch_Margin) {
  	    padding += this.Patch_Margin;
  	    pattern = text.substring(patch.start2 - padding,
  	                             patch.start2 + patch.length1 + padding);
  	  }
  	  // Add one chunk for good luck.
  	  padding += this.Patch_Margin;

  	  // Add the prefix.
  	  var prefix = text.substring(patch.start2 - padding, patch.start2);
  	  if (prefix) {
  	    patch.diffs.unshift(new diff_match_patch.Diff(DIFF_EQUAL, prefix));
  	  }
  	  // Add the suffix.
  	  var suffix = text.substring(patch.start2 + patch.length1,
  	                              patch.start2 + patch.length1 + padding);
  	  if (suffix) {
  	    patch.diffs.push(new diff_match_patch.Diff(DIFF_EQUAL, suffix));
  	  }

  	  // Roll back the start points.
  	  patch.start1 -= prefix.length;
  	  patch.start2 -= prefix.length;
  	  // Extend the lengths.
  	  patch.length1 += prefix.length + suffix.length;
  	  patch.length2 += prefix.length + suffix.length;
  	};


  	/**
  	 * Compute a list of patches to turn text1 into text2.
  	 * Use diffs if provided, otherwise compute it ourselves.
  	 * There are four ways to call this function, depending on what data is
  	 * available to the caller:
  	 * Method 1:
  	 * a = text1, b = text2
  	 * Method 2:
  	 * a = diffs
  	 * Method 3 (optimal):
  	 * a = text1, b = diffs
  	 * Method 4 (deprecated, use method 3):
  	 * a = text1, b = text2, c = diffs
  	 *
  	 * @param {string|!Array.<!diff_match_patch.Diff>} a text1 (methods 1,3,4) or
  	 * Array of diff tuples for text1 to text2 (method 2).
  	 * @param {string|!Array.<!diff_match_patch.Diff>=} opt_b text2 (methods 1,4) or
  	 * Array of diff tuples for text1 to text2 (method 3) or undefined (method 2).
  	 * @param {string|!Array.<!diff_match_patch.Diff>=} opt_c Array of diff tuples
  	 * for text1 to text2 (method 4) or undefined (methods 1,2,3).
  	 * @return {!Array.<!diff_match_patch.patch_obj>} Array of Patch objects.
  	 */
  	diff_match_patch.prototype.patch_make = function(a, opt_b, opt_c) {
  	  var text1, diffs;
  	  if (typeof a == 'string' && typeof opt_b == 'string' &&
  	      typeof opt_c == 'undefined') {
  	    // Method 1: text1, text2
  	    // Compute diffs from text1 and text2.
  	    text1 = /** @type {string} */(a);
  	    diffs = this.diff_main(text1, /** @type {string} */(opt_b), true);
  	    if (diffs.length > 2) {
  	      this.diff_cleanupSemantic(diffs);
  	      this.diff_cleanupEfficiency(diffs);
  	    }
  	  } else if (a && typeof a == 'object' && typeof opt_b == 'undefined' &&
  	      typeof opt_c == 'undefined') {
  	    // Method 2: diffs
  	    // Compute text1 from diffs.
  	    diffs = /** @type {!Array.<!diff_match_patch.Diff>} */(a);
  	    text1 = this.diff_text1(diffs);
  	  } else if (typeof a == 'string' && opt_b && typeof opt_b == 'object' &&
  	      typeof opt_c == 'undefined') {
  	    // Method 3: text1, diffs
  	    text1 = /** @type {string} */(a);
  	    diffs = /** @type {!Array.<!diff_match_patch.Diff>} */(opt_b);
  	  } else if (typeof a == 'string' && typeof opt_b == 'string' &&
  	      opt_c && typeof opt_c == 'object') {
  	    // Method 4: text1, text2, diffs
  	    // text2 is not used.
  	    text1 = /** @type {string} */(a);
  	    diffs = /** @type {!Array.<!diff_match_patch.Diff>} */(opt_c);
  	  } else {
  	    throw new Error('Unknown call format to patch_make.');
  	  }

  	  if (diffs.length === 0) {
  	    return [];  // Get rid of the null case.
  	  }
  	  var patches = [];
  	  var patch = new diff_match_patch.patch_obj();
  	  var patchDiffLength = 0;  // Keeping our own length var is faster in JS.
  	  var char_count1 = 0;  // Number of characters into the text1 string.
  	  var char_count2 = 0;  // Number of characters into the text2 string.
  	  // Start with text1 (prepatch_text) and apply the diffs until we arrive at
  	  // text2 (postpatch_text).  We recreate the patches one by one to determine
  	  // context info.
  	  var prepatch_text = text1;
  	  var postpatch_text = text1;
  	  for (var x = 0; x < diffs.length; x++) {
  	    var diff_type = diffs[x][0];
  	    var diff_text = diffs[x][1];

  	    if (!patchDiffLength && diff_type !== DIFF_EQUAL) {
  	      // A new patch starts here.
  	      patch.start1 = char_count1;
  	      patch.start2 = char_count2;
  	    }

  	    switch (diff_type) {
  	      case DIFF_INSERT:
  	        patch.diffs[patchDiffLength++] = diffs[x];
  	        patch.length2 += diff_text.length;
  	        postpatch_text = postpatch_text.substring(0, char_count2) + diff_text +
  	                         postpatch_text.substring(char_count2);
  	        break;
  	      case DIFF_DELETE:
  	        patch.length1 += diff_text.length;
  	        patch.diffs[patchDiffLength++] = diffs[x];
  	        postpatch_text = postpatch_text.substring(0, char_count2) +
  	                         postpatch_text.substring(char_count2 +
  	                             diff_text.length);
  	        break;
  	      case DIFF_EQUAL:
  	        if (diff_text.length <= 2 * this.Patch_Margin &&
  	            patchDiffLength && diffs.length != x + 1) {
  	          // Small equality inside a patch.
  	          patch.diffs[patchDiffLength++] = diffs[x];
  	          patch.length1 += diff_text.length;
  	          patch.length2 += diff_text.length;
  	        } else if (diff_text.length >= 2 * this.Patch_Margin) {
  	          // Time for a new patch.
  	          if (patchDiffLength) {
  	            this.patch_addContext_(patch, prepatch_text);
  	            patches.push(patch);
  	            patch = new diff_match_patch.patch_obj();
  	            patchDiffLength = 0;
  	            // Unlike Unidiff, our patch lists have a rolling context.
  	            // https://github.com/google/diff-match-patch/wiki/Unidiff
  	            // Update prepatch text & pos to reflect the application of the
  	            // just completed patch.
  	            prepatch_text = postpatch_text;
  	            char_count1 = char_count2;
  	          }
  	        }
  	        break;
  	    }

  	    // Update the current character count.
  	    if (diff_type !== DIFF_INSERT) {
  	      char_count1 += diff_text.length;
  	    }
  	    if (diff_type !== DIFF_DELETE) {
  	      char_count2 += diff_text.length;
  	    }
  	  }
  	  // Pick up the leftover patch if not empty.
  	  if (patchDiffLength) {
  	    this.patch_addContext_(patch, prepatch_text);
  	    patches.push(patch);
  	  }

  	  return patches;
  	};


  	/**
  	 * Given an array of patches, return another array that is identical.
  	 * @param {!Array.<!diff_match_patch.patch_obj>} patches Array of Patch objects.
  	 * @return {!Array.<!diff_match_patch.patch_obj>} Array of Patch objects.
  	 */
  	diff_match_patch.prototype.patch_deepCopy = function(patches) {
  	  // Making deep copies is hard in JavaScript.
  	  var patchesCopy = [];
  	  for (var x = 0; x < patches.length; x++) {
  	    var patch = patches[x];
  	    var patchCopy = new diff_match_patch.patch_obj();
  	    patchCopy.diffs = [];
  	    for (var y = 0; y < patch.diffs.length; y++) {
  	      patchCopy.diffs[y] =
  	          new diff_match_patch.Diff(patch.diffs[y][0], patch.diffs[y][1]);
  	    }
  	    patchCopy.start1 = patch.start1;
  	    patchCopy.start2 = patch.start2;
  	    patchCopy.length1 = patch.length1;
  	    patchCopy.length2 = patch.length2;
  	    patchesCopy[x] = patchCopy;
  	  }
  	  return patchesCopy;
  	};


  	/**
  	 * Merge a set of patches onto the text.  Return a patched text, as well
  	 * as a list of true/false values indicating which patches were applied.
  	 * @param {!Array.<!diff_match_patch.patch_obj>} patches Array of Patch objects.
  	 * @param {string} text Old text.
  	 * @return {!Array.<string|!Array.<boolean>>} Two element Array, containing the
  	 *      new text and an array of boolean values.
  	 */
  	diff_match_patch.prototype.patch_apply = function(patches, text) {
  	  if (patches.length == 0) {
  	    return [text, []];
  	  }

  	  // Deep copy the patches so that no changes are made to originals.
  	  patches = this.patch_deepCopy(patches);

  	  var nullPadding = this.patch_addPadding(patches);
  	  text = nullPadding + text + nullPadding;

  	  this.patch_splitMax(patches);
  	  // delta keeps track of the offset between the expected and actual location
  	  // of the previous patch.  If there are patches expected at positions 10 and
  	  // 20, but the first patch was found at 12, delta is 2 and the second patch
  	  // has an effective expected position of 22.
  	  var delta = 0;
  	  var results = [];
  	  for (var x = 0; x < patches.length; x++) {
  	    var expected_loc = patches[x].start2 + delta;
  	    var text1 = this.diff_text1(patches[x].diffs);
  	    var start_loc;
  	    var end_loc = -1;
  	    if (text1.length > this.Match_MaxBits) {
  	      // patch_splitMax will only provide an oversized pattern in the case of
  	      // a monster delete.
  	      start_loc = this.match_main(text, text1.substring(0, this.Match_MaxBits),
  	                                  expected_loc);
  	      if (start_loc != -1) {
  	        end_loc = this.match_main(text,
  	            text1.substring(text1.length - this.Match_MaxBits),
  	            expected_loc + text1.length - this.Match_MaxBits);
  	        if (end_loc == -1 || start_loc >= end_loc) {
  	          // Can't find valid trailing context.  Drop this patch.
  	          start_loc = -1;
  	        }
  	      }
  	    } else {
  	      start_loc = this.match_main(text, text1, expected_loc);
  	    }
  	    if (start_loc == -1) {
  	      // No match found.  :(
  	      results[x] = false;
  	      // Subtract the delta for this failed patch from subsequent patches.
  	      delta -= patches[x].length2 - patches[x].length1;
  	    } else {
  	      // Found a match.  :)
  	      results[x] = true;
  	      delta = start_loc - expected_loc;
  	      var text2;
  	      if (end_loc == -1) {
  	        text2 = text.substring(start_loc, start_loc + text1.length);
  	      } else {
  	        text2 = text.substring(start_loc, end_loc + this.Match_MaxBits);
  	      }
  	      if (text1 == text2) {
  	        // Perfect match, just shove the replacement text in.
  	        text = text.substring(0, start_loc) +
  	               this.diff_text2(patches[x].diffs) +
  	               text.substring(start_loc + text1.length);
  	      } else {
  	        // Imperfect match.  Run a diff to get a framework of equivalent
  	        // indices.
  	        var diffs = this.diff_main(text1, text2, false);
  	        if (text1.length > this.Match_MaxBits &&
  	            this.diff_levenshtein(diffs) / text1.length >
  	            this.Patch_DeleteThreshold) {
  	          // The end points match, but the content is unacceptably bad.
  	          results[x] = false;
  	        } else {
  	          this.diff_cleanupSemanticLossless(diffs);
  	          var index1 = 0;
  	          var index2;
  	          for (var y = 0; y < patches[x].diffs.length; y++) {
  	            var mod = patches[x].diffs[y];
  	            if (mod[0] !== DIFF_EQUAL) {
  	              index2 = this.diff_xIndex(diffs, index1);
  	            }
  	            if (mod[0] === DIFF_INSERT) {  // Insertion
  	              text = text.substring(0, start_loc + index2) + mod[1] +
  	                     text.substring(start_loc + index2);
  	            } else if (mod[0] === DIFF_DELETE) {  // Deletion
  	              text = text.substring(0, start_loc + index2) +
  	                     text.substring(start_loc + this.diff_xIndex(diffs,
  	                         index1 + mod[1].length));
  	            }
  	            if (mod[0] !== DIFF_DELETE) {
  	              index1 += mod[1].length;
  	            }
  	          }
  	        }
  	      }
  	    }
  	  }
  	  // Strip the padding off.
  	  text = text.substring(nullPadding.length, text.length - nullPadding.length);
  	  return [text, results];
  	};


  	/**
  	 * Add some padding on text start and end so that edges can match something.
  	 * Intended to be called only from within patch_apply.
  	 * @param {!Array.<!diff_match_patch.patch_obj>} patches Array of Patch objects.
  	 * @return {string} The padding string added to each side.
  	 */
  	diff_match_patch.prototype.patch_addPadding = function(patches) {
  	  var paddingLength = this.Patch_Margin;
  	  var nullPadding = '';
  	  for (var x = 1; x <= paddingLength; x++) {
  	    nullPadding += String.fromCharCode(x);
  	  }

  	  // Bump all the patches forward.
  	  for (var x = 0; x < patches.length; x++) {
  	    patches[x].start1 += paddingLength;
  	    patches[x].start2 += paddingLength;
  	  }

  	  // Add some padding on start of first diff.
  	  var patch = patches[0];
  	  var diffs = patch.diffs;
  	  if (diffs.length == 0 || diffs[0][0] != DIFF_EQUAL) {
  	    // Add nullPadding equality.
  	    diffs.unshift(new diff_match_patch.Diff(DIFF_EQUAL, nullPadding));
  	    patch.start1 -= paddingLength;  // Should be 0.
  	    patch.start2 -= paddingLength;  // Should be 0.
  	    patch.length1 += paddingLength;
  	    patch.length2 += paddingLength;
  	  } else if (paddingLength > diffs[0][1].length) {
  	    // Grow first equality.
  	    var extraLength = paddingLength - diffs[0][1].length;
  	    diffs[0][1] = nullPadding.substring(diffs[0][1].length) + diffs[0][1];
  	    patch.start1 -= extraLength;
  	    patch.start2 -= extraLength;
  	    patch.length1 += extraLength;
  	    patch.length2 += extraLength;
  	  }

  	  // Add some padding on end of last diff.
  	  patch = patches[patches.length - 1];
  	  diffs = patch.diffs;
  	  if (diffs.length == 0 || diffs[diffs.length - 1][0] != DIFF_EQUAL) {
  	    // Add nullPadding equality.
  	    diffs.push(new diff_match_patch.Diff(DIFF_EQUAL, nullPadding));
  	    patch.length1 += paddingLength;
  	    patch.length2 += paddingLength;
  	  } else if (paddingLength > diffs[diffs.length - 1][1].length) {
  	    // Grow last equality.
  	    var extraLength = paddingLength - diffs[diffs.length - 1][1].length;
  	    diffs[diffs.length - 1][1] += nullPadding.substring(0, extraLength);
  	    patch.length1 += extraLength;
  	    patch.length2 += extraLength;
  	  }

  	  return nullPadding;
  	};


  	/**
  	 * Look through the patches and break up any which are longer than the maximum
  	 * limit of the match algorithm.
  	 * Intended to be called only from within patch_apply.
  	 * @param {!Array.<!diff_match_patch.patch_obj>} patches Array of Patch objects.
  	 */
  	diff_match_patch.prototype.patch_splitMax = function(patches) {
  	  var patch_size = this.Match_MaxBits;
  	  for (var x = 0; x < patches.length; x++) {
  	    if (patches[x].length1 <= patch_size) {
  	      continue;
  	    }
  	    var bigpatch = patches[x];
  	    // Remove the big old patch.
  	    patches.splice(x--, 1);
  	    var start1 = bigpatch.start1;
  	    var start2 = bigpatch.start2;
  	    var precontext = '';
  	    while (bigpatch.diffs.length !== 0) {
  	      // Create one of several smaller patches.
  	      var patch = new diff_match_patch.patch_obj();
  	      var empty = true;
  	      patch.start1 = start1 - precontext.length;
  	      patch.start2 = start2 - precontext.length;
  	      if (precontext !== '') {
  	        patch.length1 = patch.length2 = precontext.length;
  	        patch.diffs.push(new diff_match_patch.Diff(DIFF_EQUAL, precontext));
  	      }
  	      while (bigpatch.diffs.length !== 0 &&
  	             patch.length1 < patch_size - this.Patch_Margin) {
  	        var diff_type = bigpatch.diffs[0][0];
  	        var diff_text = bigpatch.diffs[0][1];
  	        if (diff_type === DIFF_INSERT) {
  	          // Insertions are harmless.
  	          patch.length2 += diff_text.length;
  	          start2 += diff_text.length;
  	          patch.diffs.push(bigpatch.diffs.shift());
  	          empty = false;
  	        } else if (diff_type === DIFF_DELETE && patch.diffs.length == 1 &&
  	                   patch.diffs[0][0] == DIFF_EQUAL &&
  	                   diff_text.length > 2 * patch_size) {
  	          // This is a large deletion.  Let it pass in one chunk.
  	          patch.length1 += diff_text.length;
  	          start1 += diff_text.length;
  	          empty = false;
  	          patch.diffs.push(new diff_match_patch.Diff(diff_type, diff_text));
  	          bigpatch.diffs.shift();
  	        } else {
  	          // Deletion or equality.  Only take as much as we can stomach.
  	          diff_text = diff_text.substring(0,
  	              patch_size - patch.length1 - this.Patch_Margin);
  	          patch.length1 += diff_text.length;
  	          start1 += diff_text.length;
  	          if (diff_type === DIFF_EQUAL) {
  	            patch.length2 += diff_text.length;
  	            start2 += diff_text.length;
  	          } else {
  	            empty = false;
  	          }
  	          patch.diffs.push(new diff_match_patch.Diff(diff_type, diff_text));
  	          if (diff_text == bigpatch.diffs[0][1]) {
  	            bigpatch.diffs.shift();
  	          } else {
  	            bigpatch.diffs[0][1] =
  	                bigpatch.diffs[0][1].substring(diff_text.length);
  	          }
  	        }
  	      }
  	      // Compute the head context for the next patch.
  	      precontext = this.diff_text2(patch.diffs);
  	      precontext =
  	          precontext.substring(precontext.length - this.Patch_Margin);
  	      // Append the end context for this patch.
  	      var postcontext = this.diff_text1(bigpatch.diffs)
  	                            .substring(0, this.Patch_Margin);
  	      if (postcontext !== '') {
  	        patch.length1 += postcontext.length;
  	        patch.length2 += postcontext.length;
  	        if (patch.diffs.length !== 0 &&
  	            patch.diffs[patch.diffs.length - 1][0] === DIFF_EQUAL) {
  	          patch.diffs[patch.diffs.length - 1][1] += postcontext;
  	        } else {
  	          patch.diffs.push(new diff_match_patch.Diff(DIFF_EQUAL, postcontext));
  	        }
  	      }
  	      if (!empty) {
  	        patches.splice(++x, 0, patch);
  	      }
  	    }
  	  }
  	};


  	/**
  	 * Take a list of patches and return a textual representation.
  	 * @param {!Array.<!diff_match_patch.patch_obj>} patches Array of Patch objects.
  	 * @return {string} Text representation of patches.
  	 */
  	diff_match_patch.prototype.patch_toText = function(patches) {
  	  var text = [];
  	  for (var x = 0; x < patches.length; x++) {
  	    text[x] = patches[x];
  	  }
  	  return text.join('');
  	};


  	/**
  	 * Parse a textual representation of patches and return a list of Patch objects.
  	 * @param {string} textline Text representation of patches.
  	 * @return {!Array.<!diff_match_patch.patch_obj>} Array of Patch objects.
  	 * @throws {!Error} If invalid input.
  	 */
  	diff_match_patch.prototype.patch_fromText = function(textline) {
  	  var patches = [];
  	  if (!textline) {
  	    return patches;
  	  }
  	  var text = textline.split('\n');
  	  var textPointer = 0;
  	  var patchHeader = /^@@ -(\d+),?(\d*) \+(\d+),?(\d*) @@$/;
  	  while (textPointer < text.length) {
  	    var m = text[textPointer].match(patchHeader);
  	    if (!m) {
  	      throw new Error('Invalid patch string: ' + text[textPointer]);
  	    }
  	    var patch = new diff_match_patch.patch_obj();
  	    patches.push(patch);
  	    patch.start1 = parseInt(m[1], 10);
  	    if (m[2] === '') {
  	      patch.start1--;
  	      patch.length1 = 1;
  	    } else if (m[2] == '0') {
  	      patch.length1 = 0;
  	    } else {
  	      patch.start1--;
  	      patch.length1 = parseInt(m[2], 10);
  	    }

  	    patch.start2 = parseInt(m[3], 10);
  	    if (m[4] === '') {
  	      patch.start2--;
  	      patch.length2 = 1;
  	    } else if (m[4] == '0') {
  	      patch.length2 = 0;
  	    } else {
  	      patch.start2--;
  	      patch.length2 = parseInt(m[4], 10);
  	    }
  	    textPointer++;

  	    while (textPointer < text.length) {
  	      var sign = text[textPointer].charAt(0);
  	      try {
  	        var line = decodeURI(text[textPointer].substring(1));
  	      } catch (ex) {
  	        // Malformed URI sequence.
  	        throw new Error('Illegal escape in patch_fromText: ' + line);
  	      }
  	      if (sign == '-') {
  	        // Deletion.
  	        patch.diffs.push(new diff_match_patch.Diff(DIFF_DELETE, line));
  	      } else if (sign == '+') {
  	        // Insertion.
  	        patch.diffs.push(new diff_match_patch.Diff(DIFF_INSERT, line));
  	      } else if (sign == ' ') {
  	        // Minor equality.
  	        patch.diffs.push(new diff_match_patch.Diff(DIFF_EQUAL, line));
  	      } else if (sign == '@') {
  	        // Start of next patch.
  	        break;
  	      } else if (sign === '') ; else {
  	        // WTF?
  	        throw new Error('Invalid patch mode "' + sign + '" in: ' + line);
  	      }
  	      textPointer++;
  	    }
  	  }
  	  return patches;
  	};


  	/**
  	 * Class representing one patch operation.
  	 * @constructor
  	 */
  	diff_match_patch.patch_obj = function() {
  	  /** @type {!Array.<!diff_match_patch.Diff>} */
  	  this.diffs = [];
  	  /** @type {?number} */
  	  this.start1 = null;
  	  /** @type {?number} */
  	  this.start2 = null;
  	  /** @type {number} */
  	  this.length1 = 0;
  	  /** @type {number} */
  	  this.length2 = 0;
  	};


  	/**
  	 * Emulate GNU diff's format.
  	 * Header: @@ -382,8 +481,9 @@
  	 * Indices are printed as 1-based, not 0-based.
  	 * @return {string} The GNU diff string.
  	 */
  	diff_match_patch.patch_obj.prototype.toString = function() {
  	  var coords1, coords2;
  	  if (this.length1 === 0) {
  	    coords1 = this.start1 + ',0';
  	  } else if (this.length1 == 1) {
  	    coords1 = this.start1 + 1;
  	  } else {
  	    coords1 = (this.start1 + 1) + ',' + this.length1;
  	  }
  	  if (this.length2 === 0) {
  	    coords2 = this.start2 + ',0';
  	  } else if (this.length2 == 1) {
  	    coords2 = this.start2 + 1;
  	  } else {
  	    coords2 = (this.start2 + 1) + ',' + this.length2;
  	  }
  	  var text = ['@@ -' + coords1 + ' +' + coords2 + ' @@\n'];
  	  var op;
  	  // Escape the body of the patch with %xx notation.
  	  for (var x = 0; x < this.diffs.length; x++) {
  	    switch (this.diffs[x][0]) {
  	      case DIFF_INSERT:
  	        op = '+';
  	        break;
  	      case DIFF_DELETE:
  	        op = '-';
  	        break;
  	      case DIFF_EQUAL:
  	        op = ' ';
  	        break;
  	    }
  	    text[x + 1] = op + encodeURI(this.diffs[x][1]) + '\n';
  	  }
  	  return text.join('').replace(/%20/g, ' ');
  	};


  	// The following export code was added by @ForbesLindesay
  	module.exports = diff_match_patch;
  	module.exports['diff_match_patch'] = diff_match_patch;
  	module.exports['DIFF_DELETE'] = DIFF_DELETE;
  	module.exports['DIFF_INSERT'] = DIFF_INSERT;
  	module.exports['DIFF_EQUAL'] = DIFF_EQUAL; 
  } (diffMatchPatch));

  var diffMatchPatchExports = diffMatchPatch.exports;
  var dmp = /*@__PURE__*/getDefaultExportFromCjs(diffMatchPatchExports);

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
