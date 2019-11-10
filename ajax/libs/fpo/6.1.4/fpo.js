/*! fpo.js
	v6.1.4 (c) 2017 Kyle Simpson
	MIT License: http://getify.mit-license.org
*/

(function UMD(name,context,definition){
	/* istanbul ignore next */if (typeof define === "function" && define.amd) { define(definition); }
	/* istanbul ignore next */else if (typeof module !== "undefined" && module.exports) { module.exports = definition(); }
	/* istanbul ignore next */else { context[name] = definition(name,context); }
})("FPO",this,function DEF(name,context){
	"use strict";

	var publicAPI = {
		identity: curryMultiple( {fn: identity, n: 1} ),
		constant: curryMultiple( {fn: constant, n: 1} ),
		pick: curryMultiple( {fn: pick, n: 2} ),
		pickAll: curryMultiple( {fn: pickAll, n: 2} ),
		nAry: curryMultiple( {fn: nAry, n: 2} ),
		unary: curryMultiple( {fn: unary, n: 2} ),
		binary: curryMultiple( {fn: binary, n: 2} ),
		curry: curryMultiple( {fn: curry, n: 1} ),
		curryMultiple: curryMultiple( {fn: curryMultiple, n: 1} ),
		uncurry: curryMultiple( {fn: uncurry, n: 1} ),
		partial: curryMultiple( {fn: partial, n: 2 } ),
		complement: curryMultiple( {fn: complement, n: 1} ),
		apply: curryMultiple( {fn: apply, n: 1} ),
		unapply: curryMultiple( {fn: unapply, n: 2} ),
		compose: curryMultiple( {fn: compose, n: 1} ),
		pipe: curryMultiple( {fn: pipe, n: 1} ),
		prop: curryMultiple( {fn: prop, n: 2} ),
		setProp: curryMultiple( {fn: setProp, n: 3} ),
		reassoc: curryMultiple( {fn: reassoc, n: 2} ),
		filterIn: curryMultiple( {fn: filterIn, n: 2} ),
		filterInObj: curryMultiple( {fn: filterInObj, n: 2} ),
		filterOut: curryMultiple( {fn: filterOut, n: 2} ),
		filterOutObj: curryMultiple( {fn: filterOutObj, n: 2} ),
		map: curryMultiple( {fn: map, n: 2} ),
		mapObj: curryMultiple( {fn: mapObj, n: 2} ),
		flatMap: curryMultiple( {fn: flatMap, n: 2} ),
		flatMapObj: curryMultiple( {fn: flatMapObj, n: 2} ),
		ap: curryMultiple( {fn: ap, n: 2} ),
		reduce: curryMultiple( {fn: reduce, n: 2} ),
		reduceObj: curryMultiple( {fn: reduceObj, n: 2} ),
		reduceRight: curryMultiple( {fn: reduceRight, n: 2} ),
		flatten: curryMultiple( {fn: flatten, n:1} ),
		zip: curryMultiple( {fn: zip, n: 2} ),
		trampoline: curryMultiple( {fn: trampoline, n: 1} ),
		transducers: {
			transduce: curryMultiple( {fn: transduce, n: 4} ),
			into: curryMultiple( {fn: into, n: 3} ),
			map: curryMultiple( {fn: transducerMap, n: 1} ),
			filter: curryMultiple( {fn: transducerFilter, n: 1} ),
			string: curryMultiple( {fn: strConcat, n: 2} ),
			array: curryMultiple( {fn: arrayPush, n: 2} ),
			number: curryMultiple( {fn: numericAdd, n: 2} ),
			booleanAnd: curryMultiple( {fn: booleanAnd, n: 2} ),
			booleanOr: curryMultiple( {fn: booleanOr, n: 2} ),
			default: curryMultiple( {fn: ({ acc }) => acc, n: 1} ),
		},
		head: curryMultiple( {fn: head, n: 1} ),
		tail: curryMultiple( {fn: tail, n: 1} ),
		take: curryMultiple( {fn: take, n: 1} ),
		memoize: curryMultiple( {fn: memoize, n: 1} ),
		remap: curryMultiple( {fn: remap, n: 2} ),
	};

	publicAPI.std = {
		identity: stdCurryMultiple( unapply( {fn: identity, props: ["v"]} ), /*arity=*/1 ),
		constant: stdCurryMultiple( unapply( {fn: constant, props: ["v"]} ), /*arity=*/1 ),
		pick: stdCurryMultiple( unapply( {fn: pick, props: ["props","v"]} ), /*arity=*/2 ),
		pickAll: stdCurryMultiple( unapply( {fn: pickAll, props: ["props","v"]} ), /*arity=*/2 ),
		nAry: stdCurryMultiple( stdNAry, /*arity=*/2 ),
		unary: stdCurryMultiple( stdUnary, /*arity=*/1 ),
		binary: stdCurryMultiple( stdBinary, /*arity=*/1 ),
		curry: stdCurryMultiple( stdCurry, /*arity=*/1 ),
		curryMultiple: stdCurryMultiple( stdCurryMultiple, /*arity=*/1 ),
		uncurry: stdCurryMultiple( stdUncurry, /*arity=*/1 ),
		partial: stdCurryMultiple( stdPartial, /*arity=*/2 ),
		partialRight: stdCurryMultiple( stdPartialRight, /*arity=*/2 ),
		complement: stdCurryMultiple( unapply( {fn: complement, props: ["fn"]} ), /*arity=*/1 ),
		apply: stdCurryMultiple( stdApply, /*arity=*/1 ),
		unapply: stdCurryMultiple( stdUnapply, /*arity=*/1 ),
		compose: stdCurryMultiple( stdCompose, /*arity=*/1 ),
		pipe: stdCurryMultiple( stdPipe, /*arity=*/1 ),
		prop: stdCurryMultiple( unapply( {fn: prop, props: ["prop","v"]} ), /*arity=*/2 ),
		setProp: stdCurryMultiple( unapply( {fn: setProp, props: ["prop","o","v"]} ), /*arity=*/3 ),
		reassoc: stdCurryMultiple( unapply( {fn: reassoc, props: ["props","v"]} ), /*arity=*/2 ),
		filterIn: stdCurryMultiple( unapply( {fn: _applyFnProp( filterIn, ["v","i","arr"] ), props: ["fn","arr"]} ), /*arity=*/2 ),
		filterInObj: stdCurryMultiple( unapply( {fn: _applyFnProp( filterInObj, ["v","i","o"] ), props: ["fn","o"]} ), /*arity=*/2 ),
		filterOut: stdCurryMultiple( unapply( {fn: _applyFnProp( filterOut, ["v","i","arr"] ), props: ["fn","arr"]} ), /*arity=*/2 ),
		filterOutObj: stdCurryMultiple( unapply( {fn: _applyFnProp( filterOutObj, ["v","i","o"] ), props: ["fn","o"]} ), /*arity=*/2 ),
		map: stdCurryMultiple( unapply( {fn: _applyFnProp( map, ["v","i","arr"] ), props: ["fn","arr"]} ), /*arity=*/2 ),
		mapObj: stdCurryMultiple( unapply( {fn: _applyFnProp( mapObj, ["v","i","o"] ), props: ["fn","o"]} ), /*arity=*/2 ),
		flatMap: stdCurryMultiple( unapply( {fn: _applyFnProp( flatMap, ["v","i","arr"] ), props: ["fn","arr"]}), /*arity=*/2 ),
		flatMapObj: stdCurryMultiple( unapply( {fn: _applyFnProp( flatMapObj, ["v","i","o"] ), props: ["fn","o"]}), /*arity=*/2 ),
		ap: stdCurryMultiple( stdAp, /*arity=*/2 ),
		reduce: stdCurryMultiple( unapply( {fn: _applyFnProp( reduce, ["acc","v","i","arr"] ), props: ["fn","v","arr"]} ), /*arity=*/3 ),
		reduceObj: stdCurryMultiple( unapply( {fn: _applyFnProp( reduceObj, ["acc","v","i","o"] ), props: ["fn","v","o"]} ), /*arity=*/3 ),
		reduceRight: stdCurryMultiple( unapply( {fn: _applyFnProp( reduceRight, ["acc","v","i","arr"] ), props: ["fn","v","arr"]} ), /*arity=*/3 ),
		flatten: stdCurryMultiple( unapply( {fn: flatten, props: ["v","n"]} ), /*arity=*/1 ),
		zip: stdCurryMultiple( unapply( {fn: zip, props: ["arr1","arr2"]} ), /*arity=*/2 ),
		trampoline: stdCurryMultiple( unapply( {fn: trampoline, props: ["fn"]} ), /*arity=*/1 ),
		transducers: {
			transduce: stdCurryMultiple( stdTransduce, /*arity=*/4 ),
			into: stdCurryMultiple( stdInto, /*arity=*/3 ),
			map: stdCurryMultiple( stdTransducerMap, /*arity=*/2 ),
			filter: stdCurryMultiple( stdTransducerFilter, /*arity=*/2 ),
			string: stdCurryMultiple( stdStrConcat, /*arity=*/2 ),
			array: stdCurryMultiple( stdArrayPush, /*arity=*/2 ),
			number: stdCurryMultiple( stdNumericAdd, /*arity=*/2 ),
			booleanAnd: stdCurryMultiple( stdBooleanAnd, /*arity=*/2 ),
			booleanOr: stdCurryMultiple( stdBooleanOr, /*arity=*/2 ),
			default: stdCurryMultiple( acc => acc, /*arity=*/1 ),
		},
		flip: stdCurryMultiple( stdFlip, /*arity=*/1 ),
		reverseArgs: stdCurryMultiple( stdReverseArgs, /*arity=*/1 ),
		head: stdCurryMultiple( unapply( {fn: head, props: ["v"]} ), /*arity=*/1 ),
		tail: stdCurryMultiple( unapply( {fn: tail, props: ["v"]} ), /*arity=*/1 ),
		take: stdCurryMultiple( unapply( {fn: take, props: ["v","n"]} ), /*arity=*/1 ),
		memoize: stdCurryMultiple( unapply( {fn: memoize, props: ["fn","n"]} ), /*arity=*/1 ),
		remap: stdCurryMultiple( unapply( {fn: remap, props: ["fn","args"]} ), /*arity=*/2 ),
	};

	// method convenience aliases
	_setMethodAlias("constant","always");
	_setMethodAlias("pipe","flow");
	_setMethodAlias("pipe","sequence");
	_setMethodAlias("compose","flowRight");
	_setMethodAlias("apply","spread");
	_setMethodAlias("unapply","gather");
	_setMethodAlias("setProp","assoc");
	_setMethodAlias("filterIn","filter");
	_setMethodAlias("filterIn","keep");
	_setMethodAlias("filterInObj","filterObj");
	_setMethodAlias("filterInObj","keepObj");
	_setMethodAlias("filterOut","reject");
	_setMethodAlias("filterOutObj","rejectObj");
	_setMethodAlias("flatMap","chain");
	_setMethodAlias("flatMapObj","chainObj");
	_setMethodAlias("reduce","fold");
	_setMethodAlias("reduceObj","foldObj");
	_setMethodAlias("reduce","foldL");
	_setMethodAlias("reduceRight","foldR");
	publicAPI.partialRight = publicAPI.partial;
	publicAPI.transducers.boolean = publicAPI.transducers.booleanAnd;
	publicAPI.std.transducers.boolean = publicAPI.std.transducers.booleanAnd;

	return publicAPI;


	// ***************************************

	function identity({ v }) {
		return v;
	}

	function constant({ v }) {
		return function value(){
			return v;
		};
	}

	function pick({ v: obj, props = [] }) {
		var newObj = {};

		for (let prop of props) {
			if (_hasProp( obj, prop )) {
				newObj[prop] = obj[prop];
			}
		}

		return newObj;
	}

	function pickAll({ v: obj, props = [] }) {
		var newObj = {};

		for (let prop of props) {
			newObj[prop] = obj[prop];
		}

		return newObj;
	}

	function nAry({ fn, props = [] }) {
		return function limited(argsObj = {}){
			return fn( pick( {v: argsObj, props} ) );
		};
	}

	function stdNAry(fn,n = 0) {
		n = Number( n );

		return function nary(...args){
			return fn( ...args.slice( 0, Math.max( 0, n ) ) );
		};
	}

	function unary({ fn, prop: propName1 = "" }) {
		return nAry( {fn, props: [propName1]} );
	}

	function stdUnary(fn) {
		return stdNAry( fn, 1 );
	}

	function binary({ fn, props: [ propName1 = "", propName2 = "" ] = [] }) {
		return nAry( {fn, props: [propName1,propName2]} );
	}

	function stdBinary(fn) {
		return stdNAry( fn, 2 );
	}

	function curry({ fn, n: arity = 1 }) {
		arity = Number( arity );

		return (function nextCurried(prevArgsObj){
			return function curried(nextArgsObj = {}){
				var keys = Object.keys( nextArgsObj );
				var allArgsObj = (keys.length > 0) ?
					Object.assign( {}, prevArgsObj, {[keys[0]]: nextArgsObj[keys[0]]} ) :
					prevArgsObj;

				if (Object.keys( allArgsObj ).length >= arity) {
					return fn( allArgsObj );
				}
				else {
					return nextCurried( allArgsObj );
				}
			};
		})( {} );
	}

	function stdCurry(fn,arity = Math.max( 1, fn.length)) {
		arity = Number( arity );

		return (function nextCurried(prevArgs){
			return function curried(...nextArgs){
				var allArgs = (nextArgs.length > 0) ?
					prevArgs.concat( [nextArgs[0]] ) :
					prevArgs;

				if (allArgs.length >= arity) {
					return fn( ...allArgs );
				}
				else {
					return nextCurried( allArgs );
				}
			};
		})( [] );
	}

	function curryMultiple({ fn, n: arity = 1 }) {
		arity = Number( arity );

		return (function nextCurried(prevArgsObj){
			return function curried(nextArgsObj = {}){
				var allArgsObj = (Object.keys( nextArgsObj ).length > 0) ?
					Object.assign( {}, prevArgsObj, nextArgsObj ) :
					prevArgsObj;

				if (Object.keys( allArgsObj ).length >= arity) {
					return fn( allArgsObj );
				}
				else {
					return nextCurried( allArgsObj );
				}
			};
		})( {} );
	}

	function stdCurryMultiple(fn,arity = Math.max( 1, fn.length)) {
		arity = Number( arity );

		return (function nextCurried(prevArgs){
			return function curried(...nextArgs){
				var allArgs = (nextArgs.length > 0) ?
					prevArgs.concat( nextArgs ) :
					prevArgs;

				if (allArgs.length >= arity) {
					return fn( ...allArgs );
				}
				else {
					return nextCurried( allArgs );
				}
			};
		})( [] );
	}

	function uncurry({ fn }) {
		return function uncurried(argsObj = {}){
			var ret = fn;

			for (let prop of Object.keys( argsObj )) {
				// assume `fn` is strictly curried (needs props one at a time),
				// instead of loose/multiple currying
				ret = ret( {[prop]: argsObj[prop]} );
			}

			return ret;
		};
	}

	function stdUncurry(fn) {
		return function uncurried(...args){
			var ret = fn;

			for (let v of args) {
				// assume `fn` is strictly curried (needs one arg at a time),
				// instead of loose/multiple currying
				ret = ret( v );
			}

			return ret;
		};
	}

	function partial({ fn, args: partialArgsObj = {} }) {
		return function partiallyApplied(restArgsObj = {}){
			return fn( Object.assign( {}, partialArgsObj, restArgsObj ) );
		};
	}

	function stdPartial(fn,partialArgs = []) {
		return function partiallyApplied(...restArgs){
			return fn( ...partialArgs, ...restArgs );
		};
	}

	function stdPartialRight(fn,partialArgs = []) {
		return function partiallyApplied(...restArgs){
			return fn( ...restArgs, ...partialArgs );
		};
	}

	function complement({ fn: predicateFn }) {
		return function complemented(...args){
			return !predicateFn( ...args );
		};
	}

	function apply({
		fn,
		props: propNamesInOrder = fn.toString()
			.replace( /^(?:(?:function.*\(([^]*?)\))|(?:([^\(\)]+?)\s*=>)|(?:\(([^]*?)\)\s*=>))[^]+$/, "$1$2$3" )
			.split( /\s*,\s*/ )
			.map( v => v.replace( /[=\s].*$/, "" ) )
	}) {
		return function appliedFn(argsObj) {
			return fn( ...propNamesInOrder.map( function getPropVal(k) { return argsObj[k]; } ) );
		};
	}

	function stdApply(fn) {
		return function appliedFn(argsArr) {
			return fn( ...argsArr );
		};
	}

	function unapply({ fn, props: propNamesInOrder = [] }) {
		return function unappliedFn(...args) {
			var argsObj = {};
			var i1 = 0;
			var i2 = 0;

			while (i1 < propNamesInOrder.length && i2 < args.length) {
				argsObj[propNamesInOrder[i1++]] = args[i2++];
			}

			return fn( argsObj );
		};
	}

	function stdUnapply(fn) {
		return function unappliedFn(...argsArr) {
			return fn( argsArr );
		};
	}

	function compose({ fns = [] }) {
		return function composed( {v: result} ){
			for (let i = fns.length - 1; i >= 0; i--) {
				result = fns[i]( {v: result} );
			}

			return result;
		};
	}

	function stdCompose(fns = []) {
		return function composed(result){
			for (let i = fns.length - 1; i >= 0; i--) {
				result = fns[i]( result );
			}

			return result;
		};
	}

	function pipe({ fns = [] }) {
		return function piped( {v: result} ){
			for (let fn of fns) {
				result = fn( {v: result} );
			}

			return result;
		};
	}

	function stdPipe(fns = []) {
		return function piped(result){
			for (let fn of fns) {
				result = fn( result );
			}

			return result;
		};
	}

	function prop({ prop = "", v: obj = {} }) {
		return obj[prop];
	}

	function setProp({ prop = "", o: obj = {}, v }) {
		obj = Object.assign( {}, obj );
		obj[prop] = v;
		return obj;
	}

	function reassoc({ props = {}, v }) {
		var obj = {};
		var sourceProps = Object.keys( props );

		// first, remap specified properties
		for (let sourceProp of sourceProps) {
			if (sourceProp in v) {
				obj[props[sourceProp]] = v[sourceProp];
			}
		}

		// then, copy (only) other properties
		for (let prop of Object.keys( v )) {
			if (!~sourceProps.indexOf( prop )) {
				obj[prop] = v[prop];
			}
		}

		return obj;
	}

	function filterIn({ fn: predicateFn, arr = [] }) {
		var newArr = [];

		for (let [i,v] of arr.entries()) {
			if (predicateFn( {v, i, arr} )) {
				newArr[newArr.length] = v;
			}
		}

		return newArr;
	}

	function filterInObj({ fn: predicateFn, o = {} }) {
		var newObj = {};

		for (let i of Object.keys( o )) {
			if (predicateFn( {v: o[i], i, o} )) {
				newObj[i] = o[i];
			}
		}

		return newObj;
	}

	function filterOut({ fn: predicateFn, arr = [] }) {
		return filterIn( {fn: complement( {fn: predicateFn} ), arr} );
	}

	function filterOutObj({ fn: predicateFn, o = {} }) {
		return filterInObj( {fn: complement( {fn: predicateFn} ), o} );
	}

	function map({ fn: mapperFn, arr = [] }) {
		var newArr = [];

		for (let [i,v] of arr.entries()) {
			newArr[i] = mapperFn( {v, i, arr} );
		}

		return newArr;
	}

	function mapObj({ fn: mapperFn, o = {} }) {
		var newObj = {};

		for (let i of Object.keys( o )) {
			newObj[i] = mapperFn( {v: o[i], i, o} );
		}

		return newObj;
	}

	function flatMap({ fn: mapperFn, arr = [] }) {
		var newArr = [];

		for (let [i,v] of arr.entries()) {
			newArr = newArr.concat( mapperFn( {v, i, arr} ) );
		}

		return newArr;
	}

	function flatMapObj({ fn: mapperFn, o = {} }) {
		var newObj = {};

		for (let i of Object.keys(o)) {
			let ret = mapperFn( {v: o[i], i, o} );
			if (typeof ret == "object" && !Array.isArray( ret )) {
				Object.assign( newObj, ret );
			}
			else {
				newObj[i] = ret;
			}
		}

		return newObj;
	}

	function ap({ fns = [], arr = [] }) {
		var newArr = [];

		if (fns.length == 0) {
			fns = [identity];
		}

		if (fns.length == 1) {
			return map( {fn: fns[0], arr} );
		}

		for (let fn of fns) {
			newArr = newArr.concat( map( {fn, arr} ) );
		}

		return newArr;
	}

	function stdAp(fns = [], arr = []) {
		var newArr = [];

		if (fns.length == 0) {
			fns = [publicAPI.std.identity];
		}

		if (fns.length == 1) {
			return publicAPI.std.map( fns[0], arr );
		}

		for (let fn of fns) {
			newArr = newArr.concat( publicAPI.std.map( fn, arr ) );
		}

		return newArr;
	}

	function reduce({ fn: reducerFn, v: initialValue, arr = [] }) {
		var origArr = arr;
		var i = 0;

		if (initialValue === undefined && arr.length > 0) {
			initialValue = arr[0];
			arr = arr.slice( 1 );
			i++;
		}

		for (let v of arr) {
			initialValue = reducerFn( {acc: initialValue, v, i: i++, arr: origArr} );
		}

		return initialValue;
	}

	function reduceObj({ fn: reducerFn, v: initialValue, o = {} }) {
		var keys = Object.keys( o );

		if (initialValue === undefined && keys.length > 0) {
			initialValue = o[keys[0]];
			keys = keys.slice( 1 );
		}

		for (let i of keys) {
			initialValue = reducerFn( {acc: initialValue, v: o[i], i, o} );
		}

		return initialValue;
	}

	function reduceRight({ fn: reducerFn, v: initialValue, arr = [] }) {
		var origArr = arr;
		var idx = arr.length - 1;

		if (initialValue === undefined && arr.length > 0) {
			initialValue = arr[idx];
			arr = arr.slice( 0, idx );
			idx--;
		}

		for (let i = arr.length - 1; i >= 0; i--) {
			initialValue = reducerFn( {acc: initialValue, v: arr[i], i: idx--, arr: origArr} );
		}

		return initialValue;
	}

	function flatten({ v: arr = [], n: depth = Infinity }) {
		depth = Number( depth );
		var list = [];

		for (let v of arr) {
			list = list.concat(
				depth > 0 ?
					(depth > 1 && Array.isArray( v ) ?
						flatten( {v, n: depth - 1} ) :
						v
					) :
					[v]
			);
		}

		return list;
	}

	function zip({ arr1 = [], arr2 = [] }) {
		var zipped = [];
		var i1 = 0;
		var i2 = 0;

		while (i1 < arr1.length && i2 < arr2.length) {
			zipped.push( [arr1[i1++], arr2[i2++]] );
		}

		return zipped;
	}

	function trampoline({ fn }) {
		return function trampolined(...args) {
			var result = fn( ...args );

			while (typeof result == "function") {
				result = result();
			}

			return result;
		};
	}

	function transduce({ fn: transducer, co: combinationFn, v: initialValue, arr = [] }) {
		var reducer = transducer( {v: combinationFn} );

		return reduce( {fn: reducer, v: initialValue, arr} );
	}

	function stdTransduce(transducer,combinationFn,initialValue,arr = []) {
		var reducer = transducer( combinationFn );

		return publicAPI.std.reduce( reducer, initialValue, arr );
	}

	function into({ fn: transducer, v: initialValue, arr = [] }) {
		var combinationFn =
			typeof initialValue == "string" ? strConcat :
			typeof initialValue == "number" ? numericAdd :
			typeof initialValue == "boolean" ? booleanAnd :
			Array.isArray( initialValue ) ? arrayPush :
			publicAPI.transducers.default;

		return transduce( {fn: transducer, co: combinationFn, v: initialValue, arr} );
	}

	function stdInto(transducer,initialValue,arr = []) {
		var combinationFn =
			typeof initialValue == "string" ? stdStrConcat :
			typeof initialValue == "number" ? stdNumericAdd :
			typeof initialValue == "boolean" ? stdBooleanAnd :
			Array.isArray( initialValue ) ? stdArrayPush :
			publicAPI.std.transducers.default;

		return stdTransduce( transducer, combinationFn, initialValue, arr );
	}

	function transducerMap(argsObj) {
		var { fn: mapperFn, v: combinationFn } = argsObj;

		// still waiting on the combination function?
		if (!_hasProp( argsObj, "v" ) || !combinationFn) {
			// Note: the combination function is usually a composed
			// function, so we expect the argument by itself,
			// not wrapped in an object
			return function curried({ v }){
				return transducerMap( {fn: mapperFn, v} );
			};
		}

		return function reducer({ acc, v }){
			return combinationFn( {acc, v: mapperFn( {v} )} );
		};
	}

	function stdTransducerMap(mapperFn,combinationFn) {
		return function reducer(acc,v){
			return combinationFn( acc, mapperFn( v ) );
		};
	}

	function transducerFilter(argsObj) {
		var { fn: predicateFn, v: combinationFn } = argsObj;

		// still waiting on the combination function?
		if (!_hasProp( argsObj, "v" ) || !combinationFn) {
			// Note: the combination function is usually a composed
			// function, so we expect the argument by itself,
			// not wrapped in an object
			return function curried({ v }){
				return transducerFilter( {fn: predicateFn, v} );
			};
		}

		return function reducer({ acc, v } = {}){
			if (predicateFn( {v} )) {
				return combinationFn( {acc, v} );
			}

			return acc;
		};
	}

	function stdTransducerFilter(predicateFn,combinationFn) {
		return function reducer(acc,v){
			if (predicateFn( v )) {
				return combinationFn( acc, v );
			}

			return acc;
		};
	}

	function strConcat({ acc, v }) {
		return String( acc ) + v;
	}

	function stdStrConcat(acc,v) {
		return String( acc ) + v;
	}

	function arrayPush({ acc, v }) {
		acc.push( v );
		return acc;
	}

	function stdArrayPush(acc,v) {
		acc.push( v );
		return acc;
	}

	function numericAdd({ acc, v }) {
		return (+acc) + (+v);
	}

	function stdNumericAdd(acc,v) {
		return (+acc) + (+v);
	}

	function booleanAnd({ acc, v }) {
		return !!acc && !!v;
	}

	function stdBooleanAnd(acc,v) {
		return !!acc && !!v;
	}

	function booleanOr({ acc, v }) {
		return !!acc || !!v;
	}

	function stdBooleanOr(acc,v) {
		return !!acc || !!v;
	}

	function stdFlip(fn) {
		return function flipped(arg1,arg2,...args){
			return fn( arg2, arg1, ...args );
		};
	}

	function stdReverseArgs(fn) {
		return function reversed(...args){
			return fn( ...args.reverse() );
		};
	}

	function head({ v = [] }) {
		if (v && (typeof v == "object" || typeof v == "string")) {
			return v[0];
		}
		return v;
	}

	function tail({ v = [] }) {
		if (v && (typeof v == "object" || typeof v == "string")) {
			if (typeof v.slice == "function") {
				return v.slice( 1 );
			}
			else {
				let props = Object.keys( v ).filter( k => k != "0" );
				return pick( {v, props} );
			}
		}
		return v;
	}

	function take({ v = [], n = 1}) {
		if (
			v &&
			(typeof v == "object" || typeof v == "string") &&
			typeof v.slice == "function"
		) {
			return v.slice( 0, n );
		}
		return [];
	}

	// adapted from: https://github.com/caiogondim/fast-memoize.js
	function memoize({ fn, n = fn.length }) {
		var cache = {};

		return Number( n ) > 1 ? memoizedMultipleArgs : memoizedSingleArg;


		// *********************

		function memoizedSingleArg(arg,...otherArgs) {
			var hash =
				// arg is a primitive?
				(
					arg == null ||
					!(typeof arg == "object" || typeof arg == "function")
				) ?
				arg :
				JSON.stringify( arg );

			return (hash in cache) ?
				cache[hash] :
				(cache[hash] = fn( arg, ...otherArgs ));
		}

		function memoizedMultipleArgs(...args) {
			var arg = args[0];
			var hash =
				// only one argument?
				args.length == 1 &&
				// arg is a primitive?
				(
					arg == null ||
					!(typeof arg == "object" || typeof arg == "function")
				) ?
				arg :
				JSON.stringify( args );

			return (hash in cache) ?
				cache[hash] :
				(cache[hash] = fn( ...args ));
		}
	}

	function remap({ fn, args = {}}) {
		var props = {};

		// transpose `args` from `target: source` to
		// `source: target` for `reassoc(..)` to use
		for (let prop of Object.keys( args )) {
			props[args[prop]] = prop;
		}

		return function remapped(argsObj){
			return fn( reassoc( {v: argsObj, props} ) );
		};
	}


	// ***************************************
	// Private

	function _setMethodAlias(origName,aliasName) {
		publicAPI[aliasName] = publicAPI[origName];
		publicAPI.std[aliasName] = publicAPI.std[origName];
	}

	function _applyFnProp(fn,props) {
		return function fnApplied(argsObj){
			argsObj = Object.assign( {}, argsObj );
			argsObj.fn = apply( {fn: argsObj.fn, props} );
			return fn( argsObj );
		};
	}

	function _hasProp(obj,prop) {
		return Object.hasOwnProperty.call( obj, prop );
	}

});
