function addProp(key, value) {
  return obj => ({ ...obj, [key]: value })
}

function mapFn(
	fn, list
){
	let index = 0;
	const willReturn = Array(list.length);
	while (index < list.length) {
		willReturn[index] = fn(list[index], index);
		index++;
	}
	return willReturn
}

function map(fn) {
  return list => mapFn(fn, list)
}

function addPropToObjects (
	property, 
	fn
){
	return listOfObjects => mapFn(
		(obj) => ({
			...(obj),
			[property]: fn(obj)
		}), 
		listOfObjects
	)
}

function all(predicate) {
  return list => {
    for (let i = 0; i < list.length; i++) {
      if (!predicate(list[i])) {
        return false
      }
    }

    return true
  }
}

function allPass(predicates) {
  return input => {
    let counter = 0;
    while (counter < predicates.length) {
      if (!predicates[counter](input)) {
        return false
      }
      counter++;
    }

    return true
  }
}

function any(predicate) {
  return list => {
    let counter = 0;
    while (counter < list.length) {
      if (predicate(list[counter], counter)) {
        return true
      }
      counter++;
    }

    return false
  }
}

function anyPass(predicates) {
  return input => {
    let counter = 0;
    while (counter < predicates.length) {
      if (predicates[counter](input)) {
        return true
      }
      counter++;
    }

    return false
  }
}

const cloneList = list => Array.prototype.slice.call(list);

function append(x) {
  return list => {
    const clone = cloneList(list);
    clone.push(x);

    return clone
  }
}

function createCompareFunction(a, b, winner, loser) {
  if (a === b) {
    return 0
  }

  return a < b ? winner : loser
}

function ascend(getFunction) {
	return (a, b) => {
  const aValue = getFunction(a);
  const bValue = getFunction(b);

  return createCompareFunction(aValue, bValue, -1, 1)
}
}

function checkObjectWithSpec(conditions) {
  return input => {
    let shouldProceed = true;
    for (const prop in conditions) {
      if (!shouldProceed) {
        continue
      }
      const result = conditions[prop](input[prop]);
      if (shouldProceed && result === false) {
        shouldProceed = false;
      }
    }

    return shouldProceed
  }
}

const { isArray } = Array;

function filter(predicate) {
  return list => {
    if (!list) {
      throw new Error('Incorrect iterable input')
    }
    let index = 0;
    const len = list.length;
    const willReturn = [];

    while (index < len) {
      if (predicate(list[index], index)) {
        willReturn.push(list[index]);
      }

      index++;
    }

    return willReturn
  }
}

function reject(predicate) {
  return list => filter(x => !predicate(x))(list)
}

function rejectObject(predicate) {
  return obj => {
    const willReturn = {};

    for (const prop in obj) {
      if (!predicate(obj[prop], prop, obj)) {
        willReturn[prop] = obj[prop];
      }
    }

    return willReturn
  }
}

const isNullOrUndefined = x => x === null || x === undefined;

function compact(input){
	if(isArray(input)){
		return reject(isNullOrUndefined)(input)
	}
	return rejectObject(isNullOrUndefined)(input)
}

function complement(fn) {
  return (...input) => !fn(...input)
}

function concat(x) {
  return y => (typeof x === 'string' ? `${x}${y}` : [...x, ...y])
}

function count(predicate) {
  return list => {
    if (!isArray(list)) {
      return 0
    }

    return list.filter(x => predicate(x)).length
  }
}

function countBy(fn) {
  return list => {
    const willReturn = {};

    list.forEach(item => {
      const key = fn(item);
      if (!willReturn[key]) {
        willReturn[key] = 1;
      } else {
        willReturn[key]++;
      }
    });

    return willReturn
  }
}

function createObjectFromKeys(keys) {
	return fn => {
		const result = {};
		keys.forEach((key, index) => {
			result[key] = fn(key, index);
		});

		return result
	}
}

function isFalsy(input) {
  return input === undefined || input === null || Number.isNaN(input) === true
}

function defaultTo(defaultArgument) {
  return input => isFalsy(input) ? defaultArgument : input
}

function descend(getFunction) {
  return (a, b) => {
    const aValue = getFunction(a);
    const bValue = getFunction(b);

    return createCompareFunction(aValue, bValue, 1, -1)
  }
}

function drop(howManyToDrop, ) {
  return list => list.slice(howManyToDrop > 0 ? howManyToDrop : 0)
}

function dropLast(numberItems) {
  return list => (numberItems > 0 ? list.slice(0, -numberItems) : list.slice())
}

function dropLastWhile(predicate) {
  return list => {
    if (list.length === 0) {
      return list
    }

    const toReturn = [];
    let counter = list.length;

    while (counter) {
      const item = list[--counter];
      if (!predicate(item, counter)) {
        toReturn.push(item);
        break
      }
    }

    while (counter) {
      toReturn.push(list[--counter]);
    }

    return toReturn.reverse()
  }
}

function dropWhile(predicate) {
  return iterable => {
    const toReturn = [];
    let counter = 0;

    while (counter < iterable.length) {
      const item = iterable[counter++];
      if (!predicate(item, counter)) {
        toReturn.push(item);
        break
      }
    }

    while (counter < iterable.length) {
      toReturn.push(iterable[counter++]);
    }

    return toReturn
  }
}

function type(input) {
  if (input === null) {
    return 'Null'
  }
  if (input === undefined) {
    return 'Undefined'
  }
  if (Number.isNaN(input)) {
    return 'NaN'
  }
  const typeResult = Object.prototype.toString.call(input).slice(8, -1);
  return typeResult === 'AsyncFunction' ? 'Promise' : typeResult
}

function _lastIndexOf(valueToFind, list) {
  if (!isArray(list)) {
    throw new Error(`Cannot read property 'indexOf' of ${list}`)
  }

  const typeOfValue = type(valueToFind);
  if (!['Array', 'NaN', 'Object', 'RegExp'].includes(typeOfValue)) {
    return list.lastIndexOf(valueToFind)
  }

  const { length } = list;
  let index = length;
  let foundIndex = -1;

  while (--index > -1 && foundIndex === -1) {
    if (equalsFn(list[index], valueToFind)) {
      foundIndex = index;
    }
  }

  return foundIndex
}

function _indexOf(valueToFind, list) {
  if (!isArray(list)) {
    throw new Error(`Cannot read property 'indexOf' of ${list}`)
  }

  const typeOfValue = type(valueToFind);
  if (!['Array', 'NaN', 'Object', 'RegExp'].includes(typeOfValue)) {
    return list.indexOf(valueToFind)
  }

  let index = -1;
  let foundIndex = -1;
  const { length } = list;

  while (++index < length && foundIndex === -1) {
    if (equalsFn(list[index], valueToFind)) {
      foundIndex = index;
    }
  }

  return foundIndex
}

function _arrayFromIterator(iter) {
  const list = [];
  let next;
  while (!(next = iter.next()).done) {
    list.push(next.value);
  }

  return list
}

function _compareSets(a, b) {
  if (a.size !== b.size) {
    return false
  }

  const aList = _arrayFromIterator(a.values());
  const bList = _arrayFromIterator(b.values());

  const filtered = aList.filter(aInstance => _indexOf(aInstance, bList) === -1);

  return filtered.length === 0
}

function compareErrors(a, b) {
  if (a.message !== b.message) {
    return false
  }
  if (a.toString !== b.toString) {
    return false
  }

  return a.toString() === b.toString()
}

function parseDate(maybeDate) {
  if (!maybeDate.toDateString) {
    return [false]
  }

  return [true, maybeDate.getTime()]
}

function parseRegex(maybeRegex) {
  if (maybeRegex.constructor !== RegExp) {
    return [false]
  }

  return [true, maybeRegex.toString()]
}

function equalsFn(a, b) {
  if (Object.is(a, b)) {
    return true
  }

  const aType = type(a);

  if (aType !== type(b)) {
    return false
  }
  if (aType === 'Function') {
    return a.name === undefined ? false : a.name === b.name
  }

  if (['NaN', 'Null', 'Undefined'].includes(aType)) {
    return true
  }

  if (['BigInt', 'Number'].includes(aType)) {
    if (Object.is(-0, a) !== Object.is(-0, b)) {
      return false
    }

    return a.toString() === b.toString()
  }

  if (['Boolean', 'String'].includes(aType)) {
    return a.toString() === b.toString()
  }

  if (aType === 'Array') {
    const aClone = Array.from(a);
    const bClone = Array.from(b);

    if (aClone.toString() !== bClone.toString()) {
      return false
    }

    let loopArrayFlag = true;
    aClone.forEach((aCloneInstance, aCloneIndex) => {
      if (loopArrayFlag) {
        if (
          aCloneInstance !== bClone[aCloneIndex] &&
          !equalsFn(aCloneInstance, bClone[aCloneIndex])
        ) {
          loopArrayFlag = false;
        }
      }
    });

    return loopArrayFlag
  }

  const aRegex = parseRegex(a);
  const bRegex = parseRegex(b);

  if (aRegex[0]) {
    return bRegex[0] ? aRegex[1] === bRegex[1] : false
  }
  if (bRegex[0]) {
    return false
  }

  const aDate = parseDate(a);
  const bDate = parseDate(b);

  if (aDate[0]) {
    return bDate[0] ? aDate[1] === bDate[1] : false
  }
  if (bDate[0]) {
    return false
  }

  if (a instanceof Error) {
    if (!(b instanceof Error)) {
      return false
    }

    return compareErrors(a, b)
  }

  if (aType === 'Set') {
    return _compareSets(a, b)
  }

  if (aType === 'Object') {
    const aKeys = Object.keys(a);

    if (aKeys.length !== Object.keys(b).length) {
      return false
    }

    let loopObjectFlag = true;
    aKeys.forEach(aKeyInstance => {
      if (loopObjectFlag) {
        const aValue = a[aKeyInstance];
        const bValue = b[aKeyInstance];

        if (aValue !== bValue && !equalsFn(aValue, bValue)) {
          loopObjectFlag = false;
        }
      }
    });

    return loopObjectFlag
  }

  return false
}
function equals(a) {
  return b => equalsFn(a, b)
}

function eqBy(fn, a) {
  return b => equalsFn(fn(a), fn(b))
}

function eqProps(property, objA) {
  return objB => equalsFn( objA[property], objB[property] )
}

const { keys } = Object;

function mapObject(fn) {
  return obj => {
    let index = 0;
    const objKeys = keys(obj);
    const len = objKeys.length;
    const willReturn = {};

    while (index < len) {
      const key = objKeys[index];
      willReturn[key] = fn(obj[key], key, obj);
      index++;
    }

    return willReturn
  }
}

function evolve(rules) {
  return mapObject((x, prop) => type(rules[prop]) === 'Function' ? rules[prop](x): x)
}

function includes(valueToFind) {
  return iterable => {
    if (typeof iterable === 'string') {
      return iterable.includes(valueToFind)
    }
    if (!iterable) {
      throw new TypeError(`Cannot read property \'indexOf\' of ${iterable}`)
    }
    if (!isArray(iterable)) {
      return false
    }

    return _indexOf(valueToFind, iterable) > -1
  }
}

function excludes(valueToFind) {
  return iterable => !includes(valueToFind)(iterable)
}

function filterObject(predicate) {
  return obj => {
    const willReturn = {};

    for (const prop in obj) {
      if (predicate(obj[prop], prop, obj)) {
        willReturn[prop] = obj[prop];
      }
    }

    return willReturn
  }
}

function find(predicate) {
  return list => {
    let index = 0;
    const len = list.length;

    while (index < len) {
      const x = list[index];
      if (predicate(x)) {
        return x
      }

      index++;
    }
  }
}

function findIndex(predicate) {
  return list => {
    const len = list.length;
    let index = -1;

    while (++index < len) {
      if (predicate(list[index])) {
        return index
      }
    }

    return -1
  }
}

function findLast(predicate) {
  return list => {
    let index = list.length;

    while (--index >= 0) {
      if (predicate(list[index])) {
        return list[index]
      }
    }

    return undefined
  }
}

function findLastIndex(fn) {
  return list => {
    let index = list.length;

    while (--index >= 0) {
      if (fn(list[index])) {
        return index
      }
    }

    return -1
  }
}

function findNth(predicate, nth) {
  return list => {
    let index = 0;
    const len = list.length;

    while (index < len) {
      const x = list[index];
      if (predicate(x)) {
				if (nth === 0) return x
				nth--;
      }

      index++;
    }
  }
}

function flatMap(fn) {
  return list => [].concat(...list.map(fn))
}

function flatten(list, input) {
  const willReturn = input === undefined ? [] : input;

  for (let i = 0; i < list.length; i++) {
    if (isArray(list[i])) {
      flatten(list[i], willReturn);
    } else {
      willReturn.push(list[i]);
    }
  }

  return willReturn
}

function flattenObjectHelper(obj, accumulator = []){
  const willReturn = {};
  Object.keys(obj).forEach(key => {
    const typeIs = type(obj[ key ]);
    if (typeIs === 'Object'){
      const [ flatResultValue, flatResultPath ] = flattenObjectHelper(obj[ key ],
        [ ...accumulator, key ]);
      willReturn[ flatResultPath.join('.') ] = flatResultValue;

      return
    } else if (accumulator.length > 0){
      const finalKey = [ ...accumulator, key ].join('.');
      willReturn[ finalKey ] = obj[ key ];

      return
    }
    willReturn[ key ] = obj[ key ];
  });
  if (accumulator.length > 0) return [ willReturn, accumulator ]

  return willReturn
}

function transformFlatObject(obj){
  const willReturn = {};

  const transformFlatObjectFn = objLocal => {
    const willReturnLocal = {};
    Object.keys(objLocal).forEach(key => {
      const typeIs = type(objLocal[ key ]);
      if (typeIs === 'Object'){
        transformFlatObjectFn(objLocal[ key ]);

        return
      }
      willReturnLocal[ key ] = objLocal[ key ];
      willReturn[ key ] = objLocal[ key ];
    });

    return willReturnLocal
  };

  Object.keys(obj).forEach(key => {
    const typeIs = type(obj[ key ]);
    if (typeIs === 'Object'){
      transformFlatObjectFn(obj[ key ]);

      return
    }
    willReturn[ key ] = obj[ key ];
  });

  return willReturn
}

function flattenObject(obj){
  const willReturn = {};

  Object.keys(obj).forEach(key => {
    const typeIs = type(obj[ key ]);
    if (typeIs === 'Object'){
      const flatObject = flattenObjectHelper(obj[ key ]);
      const transformed = transformFlatObject(flatObject);

      Object.keys(transformed).forEach(keyTransformed => {
        willReturn[ `${ key }.${ keyTransformed }` ] = transformed[ keyTransformed ];
      });
    } else {
      willReturn[ key ] = obj[ key ];
    }
  });

  return willReturn
}

function groupByFallback(groupFn, list) {
    const result = {};
    for (let i = 0; i < list.length; i++) {
      const item = list[i];
      const key = groupFn(item);

      if (!result[key]) {
        result[key] = [];
      }

      result[key].push(item);
    }

    return result
}


function groupBy(groupFn) {
  return iterable => Object.groupBy ? Object.groupBy(iterable,groupFn) : groupByFallback(groupFn, iterable)
}

function head(listOrString) {
  if (typeof listOrString === 'string') {
    return listOrString[0] || ''
  }

  return listOrString[0]
}

function indexOf(valueToFind) {
  return list => _indexOf(valueToFind, list)
}

function baseSlice(array, start, end) {
  let index = -1;
  let { length } = array;

  end = end > length ? length : end;
  if (end < 0) {
    end += length;
  }
  length = start > end ? 0 : (end - start) >>> 0;
  start >>>= 0;

  const result = Array(length);

  while (++index < length) {
    result[index] = array[index + start];
  }

  return result
}

function init(input) {
  if (typeof input === 'string') {
    return input.slice(0, -1)
  }

  return input.length ? baseSlice(input, 0, -1) : []
}

function _includesWith(pred, x, list) {
  let idx = 0;
  const len = list.length;

  while (idx < len) {
    if (pred(x, list[idx])) {
      return true
    }

    idx += 1;
  }

  return false
}
function _filter(fn, list) {
  let idx = 0;
  const len = list.length;
  const result = [];

  while (idx < len) {
    if (fn(list[idx])) {
      result[result.length] = list[idx];
    }

    idx += 1;
  }

  return result
}

function innerJoin(pred, xs) {
  return ys => _filter(x => _includesWith(pred, x, ys), xs)
}

const getOccurrences = input => input.match(/{{\s*.+?\s*}}/g);
const getOccurrenceProp = occurrence => occurrence.replace(/{{\s*|\s*}}/g, '');

const replace$1 = ({ inputHolder, prop, replacer }) => {
  const regexBase = `{{${prop}}}`;
  const regex = new RegExp(regexBase, 'g');
  return inputHolder.replace(regex, replacer)
};

function interpolate(input) {
  return templateInput => {
    const occurrences = getOccurrences(input);
    if (occurrences === null) {
      return input
    }
    let inputHolder = input;

    for (const occurrence of occurrences) {
      const prop = getOccurrenceProp(occurrence);
      inputHolder = replace$1({
        inputHolder,
        prop,
        replacer: templateInput[prop],
      });
    }

    return inputHolder
  }
}

function intersection(listA) {
  return listB => filter(x => includes(x)(listA))(listB)
}

function intersperse(separator) {
  return list => {
    let index = -1;
    const len = list.length;
    const willReturn = [];

    while (++index < len) {
      if (index === len - 1) {
        willReturn.push(list[index]);
      } else {
        willReturn.push(list[index], separator);
      }
    }

    return willReturn
  }
}

function join(glue) {
  return list => list.join(glue)
}

function last(listOrString) {
  if (typeof listOrString === 'string') {
    return listOrString[listOrString.length - 1] || ''
  }

  return listOrString[listOrString.length - 1]
}

function lastIndexOf(valueToFind) {
  return list => _lastIndexOf(valueToFind, list)
}

function mapAsync(fn) {
  return async list => {
    const willReturn = [];
    let i = 0;
    for (const a of list) {
      willReturn.push(await fn(a, i++));
    }

    return willReturn
  }
}

function mapKeys(fn) {
  return obj => {
		const willReturn = {};

		Object.keys(obj).forEach(key => {
			willReturn[fn(key, obj[key])] = obj[key];
		});

		return willReturn
	}
}

function mapObjectAsync(fn) {
  return async obj => {
    const willReturn = {};
    for (const prop in obj) {
      willReturn[prop] = await fn(obj[prop], prop);
    }

    return willReturn
  }
}

function mapParallelAsync(fn) {
  return async list =>  Promise.all(list.map((x, i) => fn(x, i)))
}

function match(pattern) {
  return input => {
    const willReturn = input.match(pattern);

    return willReturn === null ? [] : willReturn
  }
}

function maxBy(compareFn, x) {
  return y => (compareFn(y) > compareFn(x) ? y : x)
}

function merge(target) {
  return objectWithNewProps =>
    Object.assign({}, target || {}, objectWithNewProps || {})
}

function mergeTypes(x) {
  return x
}

function minBy(compareFn, x) {
  return y => (compareFn(y) < compareFn(x) ? y : x)
}

function modifyItemAtIndex(index, replaceFn) {
  return list => {
    const actualIndex = index < 0 ? list.length + index : index;
    if (index >= list.length || actualIndex < 0) {
      return list
    }

    const clone = cloneList(list);
    clone[actualIndex] = replaceFn(clone[actualIndex]);

    return clone
  }
}

function update(index, newValue) {
  return list => {
    const clone = cloneList(list);
    if (index === -1) {
      return clone.fill(newValue, index)
    }

    return clone.fill(newValue, index, index + 1)
  }
}

function modifyFn(property, fn, list) {
  if (list[property] === undefined) {
    return list
  }
  if (isArray(list)) {
    return update(property, fn(list[property]))(list)
  }

  return {
    ...list,
    [property]: fn(list[property]),
  }
}

function modifyProp(property, fn) {
  return obj => modifyFn(property, fn, obj)
}

function none(predicate) {
  return list => {
    for (let i = 0; i < list.length; i++) {
      if (predicate(list[i])) {
        return false
      }
    }

    return true
  }
}

function objOf(key) {
  return value => ({ [key]: value })
}

function objectIncludes(condition) {
  return obj => {
    const result = filterObject((conditionValue, conditionProp) =>
      equals(conditionValue)(obj[conditionProp]),
    )(condition);

    return Object.keys(result).length === Object.keys(condition).length
  }
}

function createPath(path, delimiter = '.') {
  return typeof path === 'string'
    ? path.split(delimiter).map(x => (Number.isInteger(Number(x)) ? Number(x) : x))
    : path
}

function _includes(x, list) {
  let index = -1;
  const { length } = list;

  while (++index < length) {
    if (String(list[index]) === String(x)) {
      return true
    }
  }

  return false
}

function omit(propsToOmit) {
  return obj => {
    if (!obj) {
      return undefined
    }

    const propsToOmitValue = createPath(propsToOmit, ',');
    const willReturn = {};

    for (const key in obj) {
      if (!_includes(key, propsToOmitValue)) {
        willReturn[key] = obj[key];
      }
    }

    return willReturn
  }
}

function partition(predicate) {
  return list => {
		const yes = [];
		const no = [];
		let counter = -1;
	
		while (counter++ < list.length - 1) {
			if (predicate(list[counter], counter)) {
				yes.push(list[counter]);
			} else {
				no.push(list[counter]);
			}
		}
	
		return [yes, no]
  }
}

function partitionObject(predicate) {
	return obj => {
  const yes = {};
  const no = {};
  Object.entries(obj).forEach(([prop, value]) => {
    if (predicate(value, prop)) {
      yes[prop] = value;
    } else {
      no[prop] = value;
    }
  });

  return [yes, no]
}
}

function path(pathInput) {
	return (obj)  => {
		if (!obj) {
			return undefined
		}
		let willReturn = obj;
		let counter = 0;
	
		const pathArrValue = createPath(pathInput);
	
		while (counter < pathArrValue.length) {
			if (willReturn === null || willReturn === undefined) {
				return undefined
			}
			if (willReturn[pathArrValue[counter]] === null) {
				return undefined
			}
	
			willReturn = willReturn[pathArrValue[counter]];
			counter++;
		}
	
		return willReturn
	}
}

function pathSatisfies(fn, pathInput) {
  return obj => Boolean(fn(path(pathInput)(obj)))
}

/**
 * Source:
 * https://github.com/denoland/std/blob/main/collections/permutations.ts
 */
function permutations(inputArray) {
  const result = [];
  const array = cloneList(inputArray);
  const k = array.length;
  if (k === 0) {
    return result;
  }

  const c = new Array(k).fill(0);

  result.push([...array]);

  let i = 1;

  while (i < k) {
    if (c[i] < i) {
      if (i % 2 === 0) {
        [array[0], array[i]] = [array[i], array[0]];
      } else {
        [array[c[i]], array[i]] = [array[i], array[c[i]]];
      }

      result.push([...array]);

      c[i] += 1;
      i = 1;
    } else {
      c[i] = 0;
      i += 1;
    }
  }

  return result;
}

function pick(propsToPick) {
  return input => {
    if (!input === null) {
      return undefined
    }
    const keys = createPath(propsToPick, ',');
    const willReturn = {};
    let counter = 0;

    while (counter < keys.length) {
      if (keys[counter] in input) {
        willReturn[keys[counter]] = input[keys[counter]];
      }
      counter++;
    }

    return willReturn
  }
}

function reduce(reducer, acc) {
  return list => {
    if (list == null) {
      return acc
    }
    if (!isArray(list)) {
      throw new TypeError('reduce: list must be array or iterable')
    }
    let index = 0;
    const len = list.length;

    while (index < len) {
      acc = reducer(acc, list[index], index, list);
      index++;
    }

    return acc
  }
}

function _arity(n, fn) {
  switch (n) {
    case 0:
      return function () {
        return fn.apply(this, arguments)
      }
    case 1:
      return function (a0) {
        return fn.apply(this, arguments)
      }
    case 2:
      return function (a0, a1) {
        return fn.apply(this, arguments)
      }
    case 3:
      return function (a0, a1, a2) {
        return fn.apply(this, arguments)
      }
    case 4:
      return function (a0, a1, a2, a3) {
        return fn.apply(this, arguments)
      }
    case 5:
      return function (a0, a1, a2, a3, a4) {
        return fn.apply(this, arguments)
      }
    case 6:
      return function (a0, a1, a2, a3, a4, a5) {
        return fn.apply(this, arguments)
      }
    case 7:
      return function (a0, a1, a2, a3, a4, a5, a6) {
        return fn.apply(this, arguments)
      }
    case 8:
      return function (a0, a1, a2, a3, a4, a5, a6, a7) {
        return fn.apply(this, arguments)
      }
    case 9:
      return function (a0, a1, a2, a3, a4, a5, a6, a7, a8) {
        return fn.apply(this, arguments)
      }
    case 10:
      return function (a0, a1, a2, a3, a4, a5, a6, a7, a8, a9) {
        return fn.apply(this, arguments)
      }
    default:
      throw new Error(
        'First argument to _arity must be a non-negative integer no greater than ten',
      )
  }
}

function _pipe(f, g) {
  return function () {
    return g.call(this, f.apply(this, arguments))
  }
}

function pipeFn() {
  if (arguments.length === 0) {
    throw new Error('pipe requires at least one argument')
  }

  return _arity(
    arguments[0].length,
    reduce(
      _pipe,
      arguments[0],
    )(Array.prototype.slice.call(arguments, 1, Number.POSITIVE_INFINITY)),
  )
}

function pipe(...inputs) {
  const [input, ...fnList] = inputs;

  return pipeFn(...fnList)(input)
}

async function pipeAsync(input, ...fnList) {
  let willReturn = input;
  for (const fn of fnList) {
    const initialResult = fn(willReturn);
    willReturn =
      type(initialResult) === 'Promise' ? await initialResult : initialResult;
  }
  return willReturn
}

function pluck(property) {
  return list => {
    const willReturn = [];

    list.forEach(x => {
      if (x[property] !== undefined) {
        willReturn.push(x[property]);
      }
    });

    return willReturn
  }
}

function prepend(x) {
  return list => [x].concat(list)
}

function prop(searchProperty) {
  return obj => (obj ? obj[searchProperty] : undefined)
}

function propEq(valueToMatch, propToFind) {
  return obj => {
    if (!obj) {
      return false
    }

    return equalsFn(valueToMatch, obj[propToFind])
  }
}

function propOr(defaultValue, property) {
  return obj => {
    if (!obj) {
      return defaultValue
    }

    return defaultTo(defaultValue)(obj[property])
  }
}

function propSatisfies(predicate, property) {
  return obj => predicate(obj[property])
}

function rangeDescending(start, end) {
	const len = start - end;
	const willReturn = Array(len);

	for (let i = 0; i < len; i++) {
		willReturn[i] = start - i;
	}

	return willReturn
}

function range(start) {
  return end => {
    if (Number.isNaN(Number(start)) || Number.isNaN(Number(end))) {
      throw new TypeError('Both arguments to range must be numbers')
    }

    if (end === start) {
      return []
    }
		if (end < start) return rangeDescending(start,end)

    const len = end - start;
    const willReturn = Array(len);

    for (let i = 0; i < len; i++) {
      willReturn[i] = start + i;
    }

    return willReturn
  }
}

function replace(pattern, replacer) {
  return str => str.replace(pattern, replacer)
}

function shuffle(listInput) {
  const list = cloneList(listInput);
  let counter = list.length;
  while (counter > 0) {
    const index = Math.floor(Math.random() * counter);
    counter--;
    const temp = list[counter];
    list[counter] = list[index];
    list[index] = temp;
  }

  return list
}

function sort(sortFn) {
  return list => cloneList(list).sort(sortFn)
}

function sortByFn (
	sortFn,
	list,
	descending
){
	const clone = cloneList(list);

	return clone.sort((a, b) => {
		const aSortResult = sortFn(a);
		const bSortResult = sortFn(b);

		if (aSortResult === bSortResult) {
			return 0
		}
		if(
			descending
		) return aSortResult > bSortResult ? -1 : 1

		return aSortResult < bSortResult ? -1 : 1
	})
}

function sortBy(sortFn) {
  return list => sortByFn(sortFn, list, false)
}

function sortByDescending(sortFn) {
  return list => sortByFn(sortFn, list, true)
}

function sortByPath(sortPath) {
  return list => sortBy(path(sortPath))(list)
}

function sortByPathDescending(sortPath) {
  return list => sortByDescending(path(sortPath))(list)
}

function sortObject(predicate) {
  return obj => {
    const keys = Object.keys(obj);
    const sortedKeys = sort((a, b) => predicate(a, b, obj[a], obj[b]))(keys);

    const toReturn = {};
    sortedKeys.forEach(singleKey => {
      toReturn[singleKey] = obj[singleKey];
    });

    return toReturn
  }
}

function sortHelper(a, b, listOfSortingFns) {
  let result = 0;
  let i = 0;
  while (result === 0 && i < listOfSortingFns.length) {
    result = listOfSortingFns[i](a, b);
    i += 1;
  }

  return result
}

function sortWith(listOfSortingFns) {
  return list => {
    if (Array.isArray(list) === false) {
      return []
    }

    const clone = list.slice();
    clone.sort((a, b) => sortHelper(a, b, listOfSortingFns));

    return clone
  }
}

function split(separator) {
  return str => str.split(separator)
}

function splitEvery(sliceLength) {
  return list => {
    if (sliceLength < 1) {
      throw new Error('First argument to splitEvery must be a positive integer')
    }

    const willReturn = [];
    let counter = 0;

    while (counter < list.length) {
      willReturn.push(list.slice(counter, (counter += sliceLength)));
    }

    return willReturn
  }
}

function symmetricDifference(x) {
  return y => [
    ...filter(value => !includes(value)(y))(x),
    ...filter(value => !includes(value)(x))(y),
  ]
}

function tail(listOrString) {
  return drop(1)(listOrString)
}

function take(numberOfItems) {
  return input => {
    if (numberOfItems < 0) {
      return input.slice()
    }
    if (typeof input === 'string') {
      return input.slice(0, numberOfItems)
    }

    return baseSlice(input, 0, numberOfItems)
  }
}

function takeLast(numberOfItems) {
  return input => {
    const len = input.length;
    if (numberOfItems < 0) {
      return input.slice()
    }
    let numValue = numberOfItems > len ? len : numberOfItems;

    if (typeof input === 'string') {
      return input.slice(len - numValue)
    }

    numValue = len - numValue;

    return baseSlice(input, numValue, len)
  }
}

function takeLastWhile(predicate) {
  return input => {
    if (input.length === 0) {
      return input
    }

    const toReturn = [];
    let counter = input.length;

    while (counter) {
      const item = input[--counter];
      if (!predicate(item)) {
        break
      }
      toReturn.push(item);
    }

    return toReturn.reverse()
  }
}

function takeWhile(predicate) {
  return iterable => {
    const toReturn = [];
    let counter = 0;

    while (counter < iterable.length) {
      const item = iterable[counter++];
      if (!predicate(item)) {
        break
      }
      toReturn.push(item);
    }
    return toReturn
  }
}

function tap(fn) {
  return x => {
    fn(x);

    return x
  }
}

function test(pattern) {
  return str => str.search(pattern) !== -1
}

function tryCatch(fn, fallback) {
  return input => {
    try {
      return fn(input)
    } catch (e) {
      return fallback
    }
  }
}

function union(x) {
  return y => {
    const toReturn = cloneList(x);

    y.forEach(yInstance => {
      if (!includes(yInstance)(x)) {
        toReturn.push(yInstance);
      }
    });

    return toReturn
  }
}

class _Set {
  constructor() {
    this.set = new Set();
    this.items = {};
  }

  checkUniqueness(item) {
    const type$1 = type(item);
    if (['Null', 'Undefined', 'NaN'].includes(type$1)) {
      if (type$1 in this.items) {
        return false
      }
      this.items[type$1] = true;

      return true
    }
    if (!['Object', 'Array'].includes(type$1)) {
      const prevSize = this.set.size;
      this.set.add(item);

      return this.set.size !== prevSize
    }

    if (!(type$1 in this.items)) {
      this.items[type$1] = [item];

      return true
    }

    if (_indexOf(item, this.items[type$1]) === -1) {
      this.items[type$1].push(item);

      return true
    }

    return false
  }
}

function uniq(list) {
  const set = new _Set();
  const willReturn = [];
  list.forEach(item => {
    if (set.checkUniqueness(item)) {
      willReturn.push(item);
    }
  });

  return willReturn
}

function uniqBy(fn) {
  return list => {
    const set = new _Set();

    return list.filter(item => set.checkUniqueness(fn(item)))
  }
}

function includesWith(predicate, target, list) {
  let willReturn = false;
  let index = -1;

  while (++index < list.length && !willReturn) {
    const value = list[index];

    if (predicate(target, value)) {
      willReturn = true;
    }
  }

  return willReturn
}

function uniqWith(predicate) {
  return list => {
    let index = -1;
    const willReturn = [];

    while (++index < list.length) {
      const value = list[index];

      if (!includesWith(predicate, value, willReturn)) {
        willReturn.push(value);
      }
    }

    return willReturn
  }
}

function unless(predicate, whenFalseFn) {
  return input => {
    if (predicate(input)) {
      return input
    }

    return whenFalseFn(input)
  }
}

function unwind(property) {
  return obj => {
    return obj[property].map(x => ({
      ...obj,
      [property]: x,
    }))
  }
}

function when(predicate, whenTrueFn) {
  return input => {
    if (!predicate(input)) {
      return input
    }

    return whenTrueFn(input)
  }
}

function zip(left) {
  return right => {
    const result = [];
    const length = Math.min(left.length, right.length);

    for (let i = 0; i < length; i++) {
      result[i] = [left[i], right[i]];
    }

    return result
  }
}

function zipWith(fn, x) {
  return y =>
    take(x.length > y.length ? y.length : x.length)(x).map((xInstance, i) =>
      fn(xInstance, y[i]),
    )
}

export { _arity, _includes, _indexOf, _lastIndexOf, addProp, addPropToObjects, all, allPass, any, anyPass, append, ascend, checkObjectWithSpec, compact, complement, concat, count, countBy, createCompareFunction, createObjectFromKeys, defaultTo, descend, drop, dropLast, dropLastWhile, dropWhile, eqBy, eqProps, equals, equalsFn, evolve, excludes, filter, filterObject, find, findIndex, findLast, findLastIndex, findNth, flatMap, flatten, flattenObject, flattenObjectHelper, groupBy, groupByFallback, head, includes, indexOf, init, innerJoin, interpolate, intersection, intersperse, join, last, lastIndexOf, map, mapAsync, mapFn, mapKeys, mapObject, mapObjectAsync, mapParallelAsync, match, maxBy, merge, mergeTypes, minBy, modifyItemAtIndex, modifyProp, none, objOf, objectIncludes, omit, partition, partitionObject, path, pathSatisfies, permutations, pick, pipe, pipeAsync, pluck, prepend, prop, propEq, propOr, propSatisfies, range, reduce, reject, rejectObject, replace, shuffle, sort, sortBy, sortByDescending, sortByFn, sortByPath, sortByPathDescending, sortObject, sortWith, split, splitEvery, symmetricDifference, tail, take, takeLast, takeLastWhile, takeWhile, tap, test, transformFlatObject, tryCatch, type, union, uniq, uniqBy, uniqWith, unless, unwind, update, when, zip, zipWith };
