/*!
 * anyjs ver 1.0.2 - any.js
 * (c) any-js - https://github.com/any-js/anyjs/
 * Released under the MIT license
 */
var $any = {};

(function(any, $){
'use strict';

/**
 * jQuery selector.
 * @typedef {string|Element|jQuery} Selector
 * @example
 - #sample, .sample
 - Element
 - jQuery object
 */

/**
 * Assoc object.
 * @typedef {object<string, *>} assoc
 * @example
 {
 a: 1,
 b: '2',
 c: {c1: 1, c2: 2}
}
 */

/**
 * Functions object.
 * @typedef {object<string, function>} functions
 * @example
 {
 a: function(v){ },
 b: function(v){ }
}
 */

/**
 * Class expression.
 * @typedef {Object} Class
 * @example
 - Class object
 */

any.define = {};

/**
 * Private methods
 */

/**
 * @ignore
 */
function trim(v){
	return v.replace(/^(\s)+|(\s)+$/g, '');
}

/**
 * @ignore
 */
function keys(nm){
	return String(nm).split('.').map(trim);
}

/**
 * @ignore
 */
function arrArg(vs){
	if (vs != null){
		if(!(vs instanceof Array)){
			if (Object.prototype.toString.call(vs) === '[object Arguments]'){
				vs = Array.prototype.slice.call(vs);
			}else{
				vs = [vs];
			}
		}
	}else{
		vs = [];
	}

	return vs;
}

/**
 * @ignore
 */
function none(){

}

/**
 * Manage "Profile", store and read options, merge default options.
 *
 * | Method | Default ver | Tiny ver | Micro ver |
 * |:---|:---:|:---:|:---:|
 * | All methods | Yes | Yes | Yes |
 *
 * @namespace $any.profile
 * @see Profile
 *
 * @tutorial static-profile
 * @tutorial demo-various
 *
 * @example
 * example = $any.profile.create({a: 1, b: 2});
 * example.setProfile('abc', {a: '1', b: '2'});
 *
 * opt = $any.profile.getProfile(example, 'abc');		//Get 'abc'
 * opt = $any.profile.getProfile(example, null);			//Get default
 */
any.profile = {};

/**
 * Profile object by created $any.profile.
 *
 * | Method | Default ver | Tiny ver | Micro ver |
 * |:---|:---:|:---:|:---:|
 * | All methods | Yes | Yes | Yes |
 *
 * @class Profile
 *
 * @see $any.profile
 * @tutorial static-profile
 * @tutorial demo-various
 *
 * @example
 * example = $any.profile.create({a: 1, b: 2});
 * example.setProfile('abc', {a: '1', b: '2'});
 *
 * opt = $any.profile.getProfile(example, 'abc');   //Get 'abc'
 * opt = $any.profile.getProfile(example, null);    //Get default
 */

/**
 * Create profile object.
 * @function create
 * @memberof $any.profile
 *
 * @param {assoc} defaults Default option.
 * @returns {Profile}
 *
 * @see Profile
 *
 * @tutorial static-profile
 *
 * @example
 * example = $any.profile.create({a: 1, b: 2});
 */
any.profile.create = function(defaults){
	info('profile.create');

	/**
	 * @ignore
	 */
	var pfl = {
		define: {},
		defaults: defaults,
		profiles: {}
	};

	/**
	 * Set profile option.
	 * @memberof Profile
	 * @instance
	 * @function
	 * @name setProfile
	 *
	 * @param {string} name Profile name.
	 * @param {assoc} opt Profile's options.
	 *
	 * @see $any.profile.setProfile
	 *
	 * @tutorial static-profile
	 * @example
	 * example.setProfile('abc', {a: '1', b: '2'});
	 */
	pfl.setProfile = function(name, opt){
		any.profile.setProfile(pfl, name, opt);
	};

	/**
	 * Get profile option.
	 * @memberof Profile
	 * @instance
	 * @function
	 * @name getProfile
	 *
	 * @param {assoc|string} opt Profile name or override options.
	 * @param {assoc} defaults Default options.
	 * @returns {assoc}
	 *
	 * @see $any.profile.getProfile
	 *
	 * @tutorial static-profile
	 * @example
	 * opts = example.getProfile('abc');
	 */
	pfl.getProfile = function(opt, defaults){
		return any.profile.getProfile(pfl, opt, defaults);
	};

	return pfl;
};

/**
 * Set profile option.
 * @function setProfile
 * @memberof $any.profile
 *
 * @param {object} scope Scope.
 * @param {string} name Profile name.
 * @param {assoc} opt Profile's options.
 *
 * @see Profile
 *
 * @tutorial static-profile
 * @example
 * $any.profile.setProfile(example, 'abc', {b: 3, c: 5});	//Set 'abc'
 * $any.profile.setProfile(example, null, {b: 3, c: 5});	   //Set default
 */
any.profile.setProfile = function(scope, name, opt){
	info('profile.setProfile');

	if (name == null || name === 'default'){
		scope.defaults = scope.defaults || {};
		ext(scope.defaults, opt);
	}else{
		scope.profiles[name] = ext(ext({}, scope.defaults, true), opt, true);
	}
};

/**
 * Get profile option.
 * @function getProfile
 * @memberof $any.profile
 *
 * @param {object} scope Scope.
 * @param {string|assoc|array} opt Profile name or override options.
 * @param {assoc} defaults Default options.
 * @returns {assoc}
 *
 * @see Profile
 *
 * @tutorial static-profile
 * @example
 * opt = $any.profile.getProfile(example, 'abc');		//Get 'abc'
 * opt = $any.profile.getProfile(example, null);			//Get default
 * opt = $any.profile.getProfile(example, ['abc', {a: 1000, y: 1000}]);		//Get 'abc' and override option.
 */
any.profile.getProfile = function(scope, opt, defaults){
	var pfs = scope.profiles;

	defaults = defaults || {};

	if (opt instanceof Array){
		var nm = opt[0];

		if (opt.length == 2 && typeof nm === 'string'){
			if (pfs[nm] == null){
				error('profile none', opt);
			}
			return ext(ext(defaults, pfs[nm], true), opt[1], true);
		}else{
			error('illegal format', opt);
		}
	} else if (opt instanceof Object){
		return ext(ext(defaults, scope.defaults, true), opt, true);
	} else if (opt == null || opt === 'default'){
		return ext(defaults, scope.defaults, true);
	} else if (typeof opt === 'string'){
		if (pfs[opt] == null){
			error('profile none', opt);
		}
		return ext(defaults, pfs[opt], true);
	}

	return opt;
};

/**
 * any($any) static methods. Helper methods for data operation.
 *
 * | Method | Default ver | Tiny ver | Micro ver |
 * |:---|:---:|:---:|:---:|
 * | ready | - | Yes | - |
 * | detectClick | Yes | - | - |
 * | Others | Yes | Yes | Yes |
 *
 * @namespace $any
 *
 * @tutorial static-any
 * @example
 * //See tutorials.
 */

/**
 * any($any) defines.
 *
 * @namespace $any.define
 */

/**
 * $any.info mode
 *
 * | Value | Description |
 * |:---|:---|
 * | <code>0</code> | none |
 * | <code>1</code> | info |
 * | <code>2</code> | info+trace |
 *
 * @memberof $any.define
 *
 * @type {number}
 * @default 0
 * @see $any.info
 * @see {@link $any.log}
 */
any.define.info = 0;		//0:none, 1:info, 2:info+trace

/**
 * @ignore
 */
function csOut(f, vs){
	vs = arrArg(vs);
	vs.unshift(console);

	Function.prototype.call.apply(f, vs);
}

/**
 * Output info.
 * @function info
 * @memberof $any
 *
 * @param {...*} v Arguments.
 *
 * @see $any.define.info
 * @see {@link $any.log}
 *
 * @tutorial static-any
 * @example
 * $any.info(1, 2, 3);
 */
any.info = function(v){
	switch (any.define.info){
	case 1:
		csOut(console.log, arguments);
		break;
	case 2:
		csOut(console.log, arguments);
		console.trace();
		break;
	default:
		break;
	}
};

/**
 * $any.error mode
 *
 * | Value | Description |
 * |:---|:---|
 * | <code>0</code> | none |
 * | <code>1</code> | error |
 * | <code>2</code> | error+trace |
 *
 * @memberof $any.define
 * @type {number}
 * @default 1
 *
 * @see $any.error
 * @see {@link $any.log}
 */
any.define.error = 1;	//0:none, 1:error, 2:error+trace

/**
 * If error occurs, throw error.
 * @memberof $any.define
 * @type {boolean}
 * @default false
 *
 * @see $any.error
 * @see {@link $any.log}
 */
any.define.throwError = false;

/**
 * Check existence of selector's target. If none, error occurs.
 * @memberof $any.define
 * @type {boolean}
 * @default false
 * @see {@link $any.log}
 */
any.define.targetExist = false;

/**
 * Output error.
 * @function error
 * @memberof $any
 *
 * @param {...*} v Arguments.
 *
 * @see $any.define.error
 * @see {@link $any.log}
 *
 * @tutorial static-any
 * @example
 * $any.error(1, 2, 3);
 */
any.error = function(v){
	switch (any.define.error){
	case 1:
		csOut(console.error, arguments);
		break;
	case 2:
		csOut(console.error, arguments);
		console.trace();
		break;
	default:
		break;
	}

	if (any.define.throwError){
		throw new Error(v);
	}
};

/**
 * @ignore
 */
function ext(v, s, deep){
	if(!s){
		return v;
	}

	for (var k in s){
		if (s.hasOwnProperty(k)){
			if (deep && s[k] instanceof Object && s[k].constructor === Object){
				if (v[k] == null){
					v[k] = {};
				}
				v[k] = ext(v[k], s[k], deep);
			}else{
				v[k] = s[k];
			}
		}
	}

	return v;
}

/**
 * Extend values. Support deep-copy.
 * @param {assoc|array|object} dest Destination. Override values by source.
 * @param {assoc|array|object} src Source.
 * @param {boolean} [deep=false] Is deep-copy.
 * @returns {assoc|array|object}
 *
 * @example
 * $.any.extend(dest, src);
 * $.any.extend(dest, src, true);
 * dest = $.any.extend(dest, src);
 */
any.extend = function(dest, src, deep){
	return ext(dest, src, deep);
};

/**
 * Get object keys.
 * @function keys
 * @memberof $any
 *
 * @param {assoc|array} vs Values.
 * @return {array}
 *
 * @tutorial static-any
 * @example
 * ks = $any.keys([1, 2, 3, 4]);
 * ks = $any.keys({a:1, b:2, c:3});
 */
any.keys = function(vs){
	var ks = 0;

	try {
		ks = Object.keys(vs);
	}catch(e){
		ks = [];

		if (vs){
			any.each(vs, function(k, v){
				ks.push(k);
			});
		}
	}

	return ks;
};

/**
 * Get object length.
 * @function size
 * @memberof $any
 *
 * @param {assoc|array} vs Values.
 * @return {number}
 *
 * @tutorial static-any
 * @example
 * n = $any.size({a:1, b:2, c:3});
 */
any.size = function(vs){
	return any.keys(vs).length;
};

/**
 * Check blank value.
 * @function blank
 * @memberof $any
 * @param {*} v Value.
 * @returns {boolean} <code>true</code> false, null, undefined, ''  <code>false</code> 0, or other any data.
 *
 * @tutorial static-any
 * @example
 * r = $any.blank(v);
 * if ($any.blank(v)){ ... }
 */
any.blank = function(v){
	return (!v && v !== 0);
};

/**
 * Clone object.
 * @function clone
 * @memberof $any
 * @param {assoc|array} v Assoc or array value.
 * @param {boolean} [isArr=false] If true, return value type is array.
 * @returns {*}
 *
 * @tutorial static-any
 * @example
 * v = $any.clone({a:1, b:2, c:3});
 * v = $any.clone([1, 2, 3, 4, 5], true);
 */
any.clone = function(v, isArr){
	var bs = {};

	if (isArr){
		bs = [];
	}

	return ext(bs, v, true);
};

/**
 * Simple object's loop.
 * @function each
 * @memberof $any
 * @param {assoc|object} vs Assoc or object.
 * @param {function} fn Function. <code>function(key, value){ }</code>
 * @param {*} [ctx=null] this object
 *
 * @tutorial static-any
 * @example
 * $any.each({a:1, b:2, c:3}, function(k, v){
 * 	console.log(k, v);
 * });
 * $any.each({a:1, b:2, c:3}, function(k, v){
 * 	$(this).val(v);
 * }, this);
 */
any.each = function(vs, fn, ctx){
	for(var k in vs){
		if (vs.hasOwnProperty(k)){
			fn.call(ctx, k, vs[k]);
		}
	}
};

/**
 * @ignore
 */
var gbs = {};

/**
 * Bind function or value by name.
 * @function global
 * @memberof $any
 *
 * @param {string|null} name Name.
 * @param {function|string|number|object} [v] Various value or function.
 * @returns {*}
 *
 * @tutorial static-any
 * @example
 * fn = $any.global(null, function(v){ ... });
 * fn(v);
 * $any.global('abc', function(v){ ... });
 * $any.global('abc')(v);
 */
any.global = function(name, v){
	if (v === undefined){
		if (gbs[name]){
			return gbs[name];
		}else{
			error('none');
			return none;
		}
	}

	if (name === undefined){
		name = null;
	}

	if (v !== null){
		gbs[name] = v;
	}else{
		delete gbs[name];
		return;
	}

	return gbs[name];
};

/**
 * @ignore
 */
function gtRcs(ks, vs){
	var v, k = ks.shift();
	v = vs[k];

	if (v == null){
		return null;
	}

	if (ks[0] !== undefined){
		return gtRcs(ks, v);
	}

	return v;
}

/**
 * Get value from assoc.
 *
 * <b>name format</b> <code>a, a.b, a.b.c, a.0</code>
 *
 * @function get
 * @memberof $any
 * @param {assoc|array} vs Values object.
 * @param {string} name Value name. Child name of assoc can be specified. - 'a.b.1'.
 * @returns {*}
 *
 * @tutorial static-any
 * @example
 * v = $any.get(vs, 'a');        //assoc
 * v = $any.get(vs, 'b.a');     //assoc
 * v = $any.get(vs, 0);         //array
 * v = $any.get(vs, '0.0.0');  //array
 */
any.get = function(vs, name){
	var ks = keys(name);

	return gtRcs(ks, vs);
};

/**
 * @ignore
 */
function stRcs(ks, vs, nm, v, eo){
	var k = ks.shift();

	if (ks[0] === undefined){
		if (vs[k] == null || !eo){
			vs[k] = v;
		}
	} else {
		if (vs[k] == null){
			vs[k] = {};
			stRcs(ks, vs[k], nm, v, eo);
		} else if (typeof vs[k] === 'object'){
			stRcs(ks, vs[k], nm, v, eo);
		} else {
			error('not object', vs, nm);
		}
	}
}

/**
 * Set value to assoc.
 * @function set
 * @memberof $any
 * @param {assoc|array} vs Assoc.
 * @param {string} name Value's name. Child name of assoc can be specified. - 'a.b.1'.
 * @param {*|function} v Value or Function which change value.
 * @param {boolean} [emptyOnly=false] Set value if empty.
 *
 * @tutorial static-any
 * @example
 * $any.set(vs, 'a', 123);         //value
 * $any.set(vs, 0, 123);          //set to array
 * $any.set(vs, 'b.a', 123);      //assoc
 * $any.set(vs, 'c.0', 123);      //array
 * $any.set(vs, 'd', function(v){ return v++; });  //using function
 * $any.set(vs, 'e', 123, true); //empty only
 */
any.set = function(vs, name, v, emptyOnly){
	if (typeof v === 'function'){
		v = v(any.get(vs, name));
	}

	stRcs(keys(name), vs, name, v, emptyOnly);

	return v;
};

/**
 * Empty values.
 * @function drop
 * @memberof $any
 * @param {assoc|array} vs Assoc.
 *
 * @tutorial static-any
 * @example
 * $any.drop(vs);
 */
any.drop = function(vs){
	any.each(vs, function(k){
		delete vs[k];
	});
};

/**
 * Data stored for $any.data. It is simple assoc.
 * @memberof $any
 * @type {assoc}
 *
 * @see $any.data
 *
 * @tutorial static-any
 * @example
 * $any.datas = {a:1, b:2, c:3};
 */
any.datas = {};

/**
 * Get and Set global value - $any.datas.
 *
 * <b>Specification</b><br>
 * Internal use: <code>$any.get</code> <code>$any.set</code>
 *
 * @function data
 * @memberof $any
 * @param {assoc|array|null} vs Data pool. If null, vs is $any.datas.
 * @param {string} name Name.
 * @param {*} [v] Value. For set.
 * @param {boolean} [emptyOnly=false] Set value if empty. For set.
 * @returns {*}
 *
 * @see $any.datas
 * @see $any.get
 * @see $any.set
 *
 * @tutorial static-any
 * @example
 * //Set
 * $any.data(null, null, {a:1, b:2, c:3});
 * $any.data(null, 'a', 1);
 * $any.data(pool, 'b.b1', 1);
 * v = $any.data(pool, 'c', function(v){ return v+1 });
 *
 * @example
 * //Get
 * vs = $any.data();
 * v = $any.data(null, 'a');
 * v = $any.data(pool, 'b.b1');
 * v = $any.data(pool, 'c');
 */
any.data = function(vs, name, v, emptyOnly){
	if (vs == null){
		vs = any.datas;
	}

	//Get
	if (v === undefined){
		if (name == null){
			return vs;
		}

		return any.get(vs, name);
	}

	//Set
	if (any.blank(name)){
		if (typeof v !== 'object'){
			v = {};
		}

		any.drop(vs);
		ext(vs, v, true);

		return vs;
	}

	return any.set(vs, name, v, emptyOnly);
};

/**
 * Convert to other structure values from original values by rule.
 * @function filter
 * @memberof $any
 *
 * @param {assoc|array} vs Original values.
 * @param {assoc} [rule] Convert rule.<br><code>{<br>to: from, //from >> to<br>to: null, //Delete<br>to: {...} or [...], //cover by matrix<br>to: function(v, org, dest){return v;},  //Using function<br>'*': function(vs, r, rule){r.a = 1;} //Initialize<br>}</code>
 * @param {assoc} [opt] Option.
 * @param {boolean} [opt.reset=false] Determine to reset values. and use only specified values by rule.
 * @param {boolean} [opt.replace=true] Determine to replace value. If 'fill' is false, the original value retain.
 * @param {boolean} [opt.array=false] Determine return value type. Default type is assoc.
 * @param {string} [opt.init='*'] Function name of initialize used by rule.
 * @returns {assoc|array} New values converted by rule.
 *
 * @tutorial static-any
 * @example
 * rule = {
 *   a1: 'a',    //a >> a1
 *   b1: 'b',    //b >> b1
 *   c: null,    //delete
 *   d: {1: 'london', 2: 'new york', 3: 'tokyo'},  //cover by matrix
 *   e: 'x'      //none
 * };
 * vs = $any.filter(vs, rule);
 *
 * @example
 * rule = {
 *   '*': function(vs, r){
 *     r.b = 4;   //b
 *   },
 *   a1: function(v, vs, r){
 *     return vs.a+10;
 *   },
 *   a2: 'a'   //a >> a2
 * };
 * vs = $any.filter(vs, rule, {reset: true});
 *
 * @example
 * //Array
 * rule = {
 *   '*': function(vs, r){
 *     r[5] = 101;  //5
 *     r[6] = 102;  //6
 *   },
 *   7: 0,    //0 >> 7
 *   8: function(v, vs, r){
 *     return 103;
 *   }
 * };

 vs = $any.filter(vs, rule, {replace: false, array: true});
 */
any.filter = function(vs, rule, opt){
	opt = ext({reset: false, replace: true, array: false, init: '*'}, opt);

	var r = null, tvs = (opt.reset)?null:vs;

	r = any.clone(tvs, opt.array);

	if (typeof rule[opt.init] === 'function'){
		var init = rule[opt.init];
		delete rule[opt.init];

		init(vs, r, rule);
	}

	any.each(rule, function(to, frm){
		if (typeof frm !== 'function'){
			if (frm == null){
				delete r[to];
			}else{
				if (typeof frm !== 'object'){
					r[to] = (vs[frm] !== undefined)?vs[frm]:null;
				}else{
					tvs = frm[vs[to]];

					r[to] = (tvs == null)?null:tvs;
				}

				if (opt.replace && to != frm){
					delete r[frm];
				}
			}
		}else{
			r[to] = frm(((vs[to] !== undefined)?vs[to]:null), vs, r);
		}
	});

	return r;
};

/**
 * Inject function to wrap function and run. Usecase: ex. initialization.
 * @function inject
 * @memberof $any
 *
 * @param {function} wrap Wrap function.<br><code>function(fn, vs...){   }</code>
 * @param {function} inject Inject function. <br><code>function(vs...){   }</code>
 * @returns {function}
 *
 * @tutorial static-any
 * @tutorial demo-various
 * @example
 * $any.inject(function(fn, v){
 *    $('#target').clicked(function(){
 *      v = !v;
 *      fn(v);
 *    });
 *   }, function(v){
 *    $('#target-pane').viewing(v);
 *   })(false);
 * @example
 * $any.inject(function(fn, v, txt){
 *    $(this).clicked(function(){
 *      v = !v;
 *      fn(v, txt);
 *    });
 *   }, function(v, txt){
 *    $('#target').append(txt);
 *    $('#target-pane').viewing(v);
 *   })(false, '.');
 */
any.inject = function(wrap, inject){
	return function(){
		var v = arrArg(arguments);
		v.unshift(inject);

		wrap.apply(this, v);

		return inject.apply(this, arguments);
	};
};

/**
 * Create auto-count function.
 * @function counter
 * @memberof $any
 *
 * @param {number|array} v Array or init number.
 * @param {assoc} [opt] Option.
 * @param {number} [opt.min=null] Min value.
 * @param {number} [opt.max=null] Max value.
 * @param {number} [opt.add=1] Additional value.
 * @param {number} [opt.init=null] Initial value.
 * @param {boolean} [opt.loop=false] Determine to loop.
 * @returns {function}
 *
 * @tutorial static-any
 * @example
 * fn = $any.counter(['A', 'B', 'C', 'D', 'E']);
 * fn = $any.counter(12);
 * fn = $any.counter(20, {add: 3, max: 30});
 * fn = $any.counter([1,2,3], {loop: true});
 */
any.counter = function(v, opt){
	opt = ext({min: null, max: null, add: 1, init: null, loop: false}, opt);

	var n = 0, min = opt.min, max = opt.max;

	if (typeof v === 'number'){
		n = v;
	}else if (v instanceof Array){
		if(opt.min == null){
			min = 0;
		}

		if(opt.max == null){
			max = v.length - 1;
		}
	}

	if (opt.init != null){
		n = opt.init;
	}

	n-= opt.add;

	return function(init){
		var t;

		n = n + opt.add;

		if (init != null){
			n = v;
		}

		t = n - max;
		if (max != null && t > 0){
			if (opt.loop){
				n = (min != null)?min:0;
				n+= t - 1;
			}else{
				n = max;
			}
		}

		t = n - min;
		if (min != null && t < 0){
			if (opt.loop){
				n = max;
				n+= t + 1;
			}else{
				n = min;
			}
		}

		if (v instanceof Array){
			return (v[n] !== undefined)?v[n]:null;
		}

		return n;
	};
};

/**
 * Calc crc16.
 * @function crc
 * @memberof $any
 *
 * @param {string} v String value
 * @returns {number} Crc16 value
 *
 * @tutorial static-any
 * @example
 * num = $any.crc16(val);
 */
any.crc16 = function(v){
	if (v == null){
		return 0;
	}

	var crc = 0, i, j;

	for(i=0; i < v.length; i++){
		crc ^= v.charCodeAt(i);
		for(j = 0; j < 8; j++){
			crc = (crc & 1) ? (crc >> 1) ^ 0xa001 : (crc >> 1);
		}
	}

	return crc;
};

/**
 * Escape regex.
 * @function escapeRegex
 * @memberof $any
 *
 * @param {string} v String value.
 * @returns {string}
 *
 * @tutorial static-any
 * @example
 * val = $any.escapeRegex(val);
 */
any.escapeRegex = function(v){
	return v.replace(/([.*+?^=!:${}()|[\]\/\\])/g, '\\$1');
};

/**
 * Detect click event behavior automatically by user device.
 *
 * <b><i>Note! Not included in any-tiny.js.</i></b><br>
 *
 * @function detectClick
 * @memberof $any
 *
 * @param {string} [v] 'click', 'touchend'
 *
 * @see $any.define.click
 *
 * @tutorial fn-basic
 *
 * @example
 * $any.detectClick('click');
 */
any.detectClick = function(v){
	if (!document){
		return;
	}

	if (!v){
		v = (document.body.ontouchend != null)?'touchend':'click';
	}

	any.define.click = v;
};

/**
 * any($any) static methods. Method for class operation.
 *
 * | Method | Default ver | Tiny ver | Micro ver |
 * |:---|:---:|:---:|:---:|
 * | All methods | Yes | Yes | Yes |
 *
 * @namespace $any@class
 *
 * @tutorial static-any-class
 *
 * @example
 * var ACls = $any.makeClass(
 *   function(n){
 *     this.n = n;
 *   }, {
 *     output: function(){ alert(this.n); }
 *   }
 * );
 * var a = new ACls(1);
 *
 * $any.mixin(AClass, {xyz: function(){ ... }});
 *
 * $any.defineClass({
 *   'StoneClass': function(make){ return make(function(){ ... }, { ... }); },
 *   'Metal.IronClass': function(make){ return make(function(){ ... }, { ... }); }
 * });
 *
 * Class = $any.getClass('Metal.IronClass');
 *
 * tree = $any.newClass('TreeClass');
 */

/**
 * @ignore
 */
function clBind(C){
	C.prototype.bind = function(fn){
		try{
			return fn.bind(this);
		} catch (e){

		}

		var c = this;

		return function(){
			return fn.apply(c, arguments);
		};
	};
}

/**
 * Create class and inherits class.
 *
 * <b>Specification</b><br>
 *
 * |  |  |
 * |:---|:---|
 * | <b>Build class</b>  | Define constructor by function / Methods which added by 'prototype' |
 * | <b>Extends class</b> | Both build-class and super-class's constructor / Override super-class methods by 'prototype' |
 *
 * @function makeClass
 * @memberof $any@class
 *
 * @param {function} construct Class constructor and base structure.
 * @param {function|functions} methods Class methods or Function space and class methods. Add methods by prototype.
 * @param {function} [parent=null] If specified, extends super-class.
 * @param {boolean} [bind=true] If true, Add <i>bind</i> method.
 * @returns {object} Class. This is not instance.
 *
 * @tutorial static-any-class
 * @example
 * //Build class
 * var ACls = $any.makeClass(
 *   function(n){
 *     this.n = n;
 *   }, {
 *     output: function(){ alert(this.n); }
 *   }
 * );
 * var a = new ACls(1);
 *
 * //Extends class
 * var BCls = $any.makeClass(
 *   function(n){
 *     this.b = 5;
 *   }, {
 *     output: function(){ alert(this.n + this.b); }
 *   }, ACls
 * );
 * var b = new BCls(2);
 */
any.makeClass = function(construct, methods, parent, bind){
	info('makeClass');

	var C;

	construct = construct || function(){};

	if (parent){
		C = function(){
			parent.apply(this, arguments);
			construct.apply(this, arguments);
		};

		try {
			C.prototype = Object.create(parent.prototype);
		}catch(e){
			var P = function(){};
			P.prototype = parent.prototype;
			C.prototype = new P();
		}
	}else{
		C = construct;
	}

	if (typeof methods === 'function'){
		methods = methods();
	}

	for(var k in methods){
		if (methods.hasOwnProperty(k)){
			C.prototype[k] = methods[k];
		}
	}

	if (bind !== false){
		clBind(C);
	}

	return C;
};

/**
 * Mixin of class by methods. Override methods by 'prototype'.
 *
 * @function mixin
 * @memberof $any@class
 *
 * @param {Class} Class Class object.
 * @param {functions} methods The added method.
 * @returns {Class}
 *
 * @tutorial static-any-class
 * @example
 * $any.mixin(AClass, {xyz: function(){ ... }});
 */
any.mixin = function(Class, methods){
	info('mixin');

	for(var k in methods){
		if (methods.hasOwnProperty(k)){
			Class.prototype[k] = methods[k];
		}
	}

	return Class;
};

/**
 * @ignore
 */
var clDf = {};

/**
 * Define class builder by function.
 *
 * @function defineClass
 * @memberof $any@class
 *
 * @param {string|assoc<string, function>} name Class name. Namespace can be specified.
 * @param {function} build Build function. <code>function(make){ ... }</code>
 * @param {boolean} [once=false] Don't show error in duplication class-name.
 *
 * @see $any@class.makeClass
 *
 * @tutorial static-any-class
 *
 * @example
 * $any.defineClass('StoneClass', function(){return $any.makeClass(function(){ ... }; });
 * $any.defineClass('Material.natural.StoneClass', function(){ return $any.makeClass(function(){ ... }, { ... }); });
 * $any.defineClass('StoneClass', function(make){ return make(function(){ ... }, { ... }); });
 * $any.defineClass('Metal.IronClass', function(){return $any.makeClass(function(){ ... }; }, true);
 * $any.defineClass({
 * 	'StoneClass': function(make){ return make(function(){ ... }, { ... }); },
 * 	'Metal.IronClass': function(make){ return make(function(){ ... }, { ... }); }
 * });
 */
any.defineClass = function(name, build, once){
	info('defineClass');

	if (typeof name === 'string'){
		var t = {};
		t[name] = build;
		name = t;
	}

	any.each(name, function(name, build){
		if (!name || name.search(/^[a-z]+[\w\.]+[a-z0-9]+$/i) == -1){
			console.error('class name error:' + name);
			return;
		}

		if (clDf[name]){
			if (!once){
				console.error('already exist class:' + name);
			}
			return;
		}

		clDf[name] = build;
	});
};

/**
 * @ignore
 */
var clCls = {};

/**
 * Get a class from defined classes.
 * @function getClass
 * @memberof $any@class
 *
 * @param {string} name Class name. Namespace can be specified.
 * @param {boolean} [store=true] Store class object. In default(true), the second time later, not make.
 * @return {Class} Class. This is not instance.
 *
 * @see $any@class.defineClass
 * @see $any@class.makeClass
 *
 * @tutorial static-any-class
 *
 * @example
 * Class = $any.getClass('StoneClass');
 * Class = $any.getClass('Metal.IronClass');
 * Class = $any.getClass('Material.natural.StoneClass', false);
 */
any.getClass = function(name, store){
	info('getClass');

	if (!clDf[name]){
		console.error('class none:' + name);
		return null;
	}

	if (clCls[name]){
		return clCls[name];
	}

	var C = clDf[name](any.makeClass);

	if (store !== false){
		clCls[name] = C;
	}

	return C;
};

/**
 * Create new instance with constructor arguments.
 * @function newClass
 * @memberof $any@class
 *
 * @param {string} name Class name. Namespace can be specified.
 * @param {array} [vs] Constructor arguments.
 * @return {object} Class instance.
 *
 * @see $any@class.defineClass
 * @see $any@class.getClass
 *
 * @tutorial static-any-class
 *
 * @example
 * tree = $any.newClass('TreeClass');
 * stone = $any.newClass('Material.natural.StoneClass');
 * silver = $any.newClass('Metal.SilverClass', [1, 2, 3]);
 */
any.newClass = function(name, vs){
	info('newClass');

	var C = any.getClass(name);

	vs = vs || [];

	vs.unshift(C);

	/* jshint ignore:start */
	return new (C.bind.apply(C, vs));
	/* jshint ignore:end */
};

/**
 * Console out defined classes.
 * @function definedClasses
 * @memberof $any@class
 *
 * @param {boolean} [store=false] Output stored class.
 *
 * @see $any@class.defineClass
 *
 * @tutorial static-any-class
 *
 * @example
 * $any.definedClasses();
 * $any.definedClasses(true);
 */
any.definedClasses = function(store){
	info('definedClasses');

	console.log('[Defined classes]');

	any.each((store)?clCls:clDf, function(nm, cls){
		console.log(nm, cls);
	});
};

/**
 * Provide log and debug helper methods.
 *
 * | Method | Default ver | Tiny ver | Micro ver |
 * |:---|:---:|:---:|:---:|
 * | events | Yes | - | - |
 * | Others | Yes | Yes | Yes |
 *
 * @namespace $any.log
 *
 * @tutorial static-any
 * @tutorial static-log
 */
any.log = {target: {scope: null, methods: null, elem: null}};

/**
 * Set log behaviors. Set $any.define.info, $any.define.error.
 * @function debug
 * @memberof $any.log
 *
 * @param {integer} [info=null] $any.info mode. $any.define.info.
 * @param {integer} [error=null] $any.error mode. $any.define.error.
 * @param {boolean} [throwError=null] Throw error. $any.define.throwError.
 * @param {boolean} [targetExist=null] Check existence of selector's target. $any.define.targetExist.
 *
 * @see $any.info
 * @see $any.error
 * @see $any.define.info
 * @see $any.define.error
 * @see $any.define.throwError
 *
 * @tutorial static-log
 *
 * @example
 * $any.log.debug(0, 1);  			//On error
 * $any.log.debug(0, 1, true);  //On error and throw error
 * $any.log.debug(0, 0);  			//Off error
 * $any.log.debug(0, 2);  			//On error trace
 * $any.log.debug(1);      			//On info
 * $any.log.debug(1);      			//On info trace
 * $any.log.debug(null, null, true);      //Throw error
 */
any.log.debug = function(info, error, throwError, targetExist){
	if (info != null){
		any.define.info = info;
	}

	if (error != null){
		any.define.error = error;
	}

	if (throwError != null){
		any.define.throwError = throwError;
	}

	if (targetExist != null){
		any.define.targetExist = targetExist;
	}
};

/**
 * Set limit target by method and element and scope.
 * @function limit
 * @memberof $any.log
 *
 * @param {string|array} method Method name.
 * @param {Selector} [el] Element target. Enable log if the element has event element.
 * @param {boolean} [scope] Scope target. Enable log only target scope.
 *
 * @see $any.info
 * @see $any.error
 * @see $any.define.info
 * @see $any.define.error
 *
 * @tutorial static-log
 *
 * @example
 * $any.log.limit('showing');
 * $any.log.limit(['showing', 'hiding']);
 * $any.log.limit(null, $('#target'));
 * $any.log.limit(null, $('#parent'));
 * $any.log.limit(null, null, 'ajax');
 * $any.log.limit(null, null, 'view');
 */
any.log.limit = function(method, el, scope){
	any.log.target.methods = (typeof method === 'string')?[method]:method;

	if (el !== undefined){
		any.log.target.elem = el;
	}

	if (scope !== undefined){
		any.log.target.scope = scope;
	}
};

var logOn = 1;

/**
 * @ignore
 */
function logAny(nm, vs, error){
	if (logOn <= 0 && !error){
		return null;
	}

	if (any.log.target.scope && any.log.target.scope != nm){
		return null;
	}

	vs = vs || [];

	nm = (!error)?(nm || 'any.'):'';

	var t;

	if (any.log.target.elem){
		t = vs[1];

		if (isEl(t)){
			if(!hasEl(any.log.target.elem, t)){
				return null;
			}
		}
	}

	if (any.log.target.methods && any.log.target.methods.indexOf(vs[0]) == -1){
		return null;
	}

	vs[0] = nm + ((vs[0] == null)?'*':vs[0]);

	for (var i=vs.length;i>=0;i--){
		if (vs[i] == undefined){
			vs[i] = null;
		}
	}

	return vs;
}

/**
 * @ignore
 */
any.log.info = function(nm, vs){
	if (any.define.info <= 0){
		return;
	}

	vs = logAny(nm, vs, false);

	if (vs){
		any.info.apply(null, vs);

		if (any.log.breakpoint){
			any.log.breakpoint(nm, vs);
		}
	}
};

/**
 * @ignore
 */
any.log.error = function(nm, vs){
	if (any.define.error <= 0){
		return;
	}

	vs = logAny(nm, vs, true);

	if (vs){
		any.error.apply(null, vs);

		if (any.log.breakpoint){
			any.log.breakpoint(vs);
		}
	}
};

/**
 * Set break-point function.
 * @memberof $any.log
 * @type {function}
 * @default null
 *
 * @see $any.log.info
 * @see $any.log.error
 *
 * @tutorial static-log
 *
 * @example
 * $any.log.breakpoint = function(){ ... };
 */
any.log.breakpoint = null;

any.log.suspend = function(){
	nolog();
};

any.log.resume = function(){
	relog();
};

/**
 * @ignore
 */
function info(){
	any.log.info(null, arguments);
}

/**
 * @ignore
 */
function error(){
	any.log.error(null, arguments);
}

/**
 * @ignore
 */
function nolog(){
	logOn--;
}

/**
 * @ignore
 */
function relog(){
	logOn++;
}

/**
 * List up bound events and output to console.
 *
 * <i>Note! Not included in any-tiny.js.</i><br>
 *
 * @function events
 * @memberof $any.log
 * 
 * @param {Selector} el Target element.
 *
 * @tutorial static-log
 * @example
 * $any.log.limit(null, $('#target'));
 * $any.log.events('.target');
 * $any.log.events(elem);
 */
any.log.events = function(el){
	$(el).each(function(i, c){
		var es = $._data(c).events;
		console.log(c, es, any.size(es));
	});
};

/**
 * Assign values to template.
 *
 * | Method | Default ver | Tiny ver | Micro ver |
 * |:---|:---:|:---:|:---:|
 * | assign | Yes | Yes | Yes |
 * | assigns | Yes | Yes | Yes |
 * | make | Yes | - | - |
 * | makes | Yes | - | - |
 * | cover | Yes | - | - |
 *
 * @namespace $any.tpl
 *
 * @tutorial static-tpl
 *
 * @example
 * v = {target: 'MnO2', Type: 'dry-cell'};
 * src = 'The principal use for {target} is for {type} batteries.';
 * html = $any.tpl.assign(src, v, {ignoreCase: true});
 * //The principal use for MnO2 is for dry-cell batteries.
 *
 * vs = [{a: 'A1', b: 'B1'}, {a: 'A2', b: 'B2'}];
 * src = '<li>{a}, {b}</li>';
 * html = $any.tpl.assigns(src, vs);
 */
any.tpl = {define: {}};

/**
 * Wrap side strings.
 * @memberof $any.tpl
 * @type {array}
 * @default ['{', '}']
 *
 * @example
 * $any.tpl.define.wraps = ['{', '}'];
 * $any.tpl.define.wraps = ['{{', '}}'];
 */
any.tpl.define.wraps = ['{', '}'];

/**
 * Determine to sort key of assoc by length.
 * @memberof $any.tpl
 * @type {boolean}
 * @default true
 * @example
 * $any.tpl.define.sort = true;
 */
any.tpl.define.sort = true;

/**
 * Assign values to template.
 * @function assign
 * @memberof $any.tpl
 *
 * @param {string} src Template source.
 * @param {assoc|string|number} vs Assign values or sinple value.
 * @param {assoc} opt Option
 * @param {boolean} [opt.wrap=true] Determine to wrap.
 * @param {boolean} [opt.ignoreCase=false] Determine to ignore case sensitive.
 * @returns {string}
 *
 * @tutorial static-tpl
 * @example
 * v = {target: 'MnO2', Type: 'dry-cell'};
 * src = 'The principal use for {target} is for {type} batteries.';
 *
 * html = $any.tpl.assign(src, v, {ignoreCase: true});
 * //The principal use for MnO2 is for dry-cell batteries.
 *
 * html = $any.tpl.assign('{*}-pilot / {*}-trader', 'auto');  //auto-pilot / auto-trader
 */
any.tpl.assign = function(src, vs, opt){
	info('tpl.assign');

	opt = ext({wrap: true, ignoreCase: false}, opt);

	var k, wp, rx, rgx = '', vz = {};

	if (typeof vs === 'object'){
		var v, ks = any.keys(vs);

		if (any.tpl.define.sort){
			ks.sort(function(a, b){
				return b.length - a.length;
			});
		}

		for (var i in ks){
			if (ks.hasOwnProperty(i)){
				k = ks[i];
				v = vs[k];

				if (opt.ignoreCase){
					k = k.toLowerCase();
				}

				if (opt.wrap){
					wp = any.tpl.define.wraps;
					k = wp[0] + k + wp[1];
				}

				vz[k] = v;
				k = any.escapeRegex(k);

				rgx += k + '|';
			}
		}

		rgx = rgx.slice(0, -1);
	}else{
		k = '*';

		if (opt.wrap){
			wp = any.tpl.define.wraps;
			k = wp[0] + k + wp[1];
		}

		rgx = any.escapeRegex(k);

		vz[k] = vs;
	}

	rgx = '(' + rgx + ')';

	var o = 'g';
	if (opt.ignoreCase){
		o += 'i';
	}

	rx = new RegExp(rgx, o);

	return src.replace(rx, function(key){
		if (opt.ignoreCase){
			key = key.toLowerCase();
		}

		return vz[key];
	});
};

/**
 * Assign multiple values.
 * @function assigns
 * @memberof $any.tpl
 *
 * @param {string} src Template source.
 * @param {array} rows Multiple assign values.
 * @param {assoc} [opt] $any.tpl.assign option.
 * @returns {string}
 *
 * @see $any.tpl.assign
 *
 * @tutorial static-tpl
 * @example
 * vs = [{a: 'A1', b: 'B1'}, {a: 'A2', b: 'B2'}];
 * src = '<li>{a}, {b}</li>';
 * html = $any.tpl.assigns(src, vs);
 * v = $any.tpl.assigns('<div>{*}</div>', ['Iron', 'Bronze']); //<div>Iron</div><div>Bronze</div>
 */
any.tpl.assigns = function(src, rows, opt){
	info('tpl.assigns');

	var r = '';

	for(var i = 0; i < rows.length; i++){
		r += any.tpl.assign(src, rows[i], opt);
	}

	return r;
};

/**
 * Make element which assigned from template.
 *
 * <b><i>Note! Not included in any-tiny.js.</i></b><br>
 *
 * @function make
 * @memberof $any.tpl
 *
 * @param {string} src Template source.
 * @param {assoc} vs Assign values.
 * @param {assoc} [opt] $any.tpl.assign option.
 * @returns {jQuery}
 *
 * @see $any.tpl.assign
 *
 * @tutorial static-tpl
 * @example
 * $any.tpl.make('#target', v).appendTo('#result');
 */
any.tpl.make = function(src, vs, opt){
	info('tpl.make');

	var r = trim(any.tpl.assign($(src).html(), vs, opt));

	return $(r);
};

/**
 * Make elements which assigned from template.(multiple values)
 *
 * <b><i>Note! Not included in any-tiny.js.</i></b><br>
 *
 * @function makes
 * @memberof $any.tpl
 *
 * @param {string} src Template source.
 * @param {array} rows Multiple assign values.
 * @param {assoc} [opt] $any.tpl.assign option.
 * @param {function} [opt.prepare] Prepare function. <code>function(vs){ }</code>
 * @param {function} [opt.build] Build function.  <code>function(vs){ // this: new element  }</code>
 * @returns {jQuery}
 *
 * @see $any.tpl.assign
 *
 * @tutorial static-tpl
 * @example
 * $any.tpl.makes('#target', vs).appendTo('#result');
 */
any.tpl.makes = function(src, rows, opt){
	info('tpl.makes');

	opt = ext({prepare: null, build: null}, opt);

	var r = [], c, vs;

	opt.prepare = opt.prepare || none;
	opt.build = opt.build || none;

	for (var i=0;i<rows.length;i++){
		vs = rows[i];

		if (opt.prepare.call(null, vs) === false){
			continue;
		}

		c = any.tpl.make(src, vs, opt);

		if (opt.build.call(c, vs) === false){
			continue;
		}

		r = r.concat($.makeArray(c));
	}

	return $(r);
};

/**
 * Make elements by array values.
 *
 * <b><i>Note! Not included in any-tiny.js.</i></b><br>
 *
 * @function cover
 * @memberof $any.tpl
 *
 * @param {Selector} src Tag source.
 * @param {array} vs Assign values. Simple array.
 * @param {assoc} [opt] Option.
 * @param {function} [opt.build] Build function.  <code>function(vs){ // this: new element  }</code>
 * @returns {jQuery}
 *
 * @tutorial static-tpl
 * @example
 * el = $any.tpl.cover('<div/>', [...]);
 */
any.tpl.cover = function(src, rows, opt){
	info('tpl.cover');

	opt = ext({build: null}, opt);

	opt.build = opt.build || none;

	var r = [], c, v;

	src = $(src);

	for(var i = 0; i < rows.length; i++){
		v = rows[i];

		c = src.clone().html(v);

		if (opt.build.call(c, v) === false){
			continue;
		}

		r = r.concat($.makeArray(c));
	}

	return $(r);
};

/**
 * Date data converter. Date source to Date value assoc, date string.
 *
 * | Method | Default ver | Tiny ver | Micro ver |
 * |:---|:---:|:---:|:---:|
 * | All methods | Yes | Yes | Yes |
 *
 * <b>Date format values</b><br>
 *
 * | Value | Description | Example |
 * |:---|:---|:---|
 * | y | Number of year | 2016 |
 * | yy | 2digit year | "16" |
 * | M | Number of month | 2 |
 * | MM | 2digit month | "02" |
 * | MMM | String month | "Feb" |
 * | d | Number of date | 1 |
 * | dd | 2digit date | "01" |
 * | e | Number of day-of-week | 6 |
 * | EEE | String day-of-week | "Sat" |
 * | H | Number of 24hours | 5 |
 * | HH | 2digit 24hours | "05" |
 * | h | Number of 12hours | 5 |
 * | hh | 2digit 12hours | "05" |
 * | a | AM or PM | "AM" |
 * | m | Number of min | 6 |
 * | mm | 2digit min | "06" |
 * | s | Number of sec | 8 |
 * | ss | 2digit sec | "08" |
 * | unixtm | Unixtime sec | 1272730884 |
 * | unixms | Unixtime ms | 1272730884000 |
 *
 * @namespace $any.date
 *
 * @see $any.tpl
 *
 * @tutorial static-date
 *
 * @example
 * dt = $any.date.get();                       //Now
 * dt = $any.date.get('2056-1-1 0:00');        //Date format string
 * v = $any.date.format('yyyy-MM-dd HH:mm');
 * v = $any.date.format('EEE, MMM d, yyyy', 'February 10, 2010 0:00');
 */
any.date = any.profile.create();

/**
 * Months
 * @memberof $any.date
 * @type {array}
 * @default ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
 * @example
 * $any.date.define.months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
 */
any.date.define.months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/**
 * Days
 * @memberof $any.date
 * @type {array}
 * @default ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
 * @example
 * $any.date.define.days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
 */
any.date.define.days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

/**
 * @ignore
 */
function dtP(dt){
	if (!dt){
		return new Date();
	}else if (typeof dt === 'object'){
		return dt;
	}

	if (String(dt).match(/^[\s\-]*[\d\s]+$/)){
		dt = dt * 1000;
	}else{
		dt = dt.replace(/[\-\.]/g, '/');

		if (!dt.match(/\d\s*\:\s*\d/)){
			dt+= ' 0:00';
		}
	}

	return new Date(dt);
}

/**
 * @ignore
 */
function dtT(v){
	return ('0' + v).slice(-2);
}

/**
 * Get date value assoc.
 * @function get
 * @memberof $any.date
 *
 * @param {integer|Date|string} [date] Date source.Supporting various format.
 * @param {boolean} [isError=true] Determine to occur error, failing to parse format.
 * @returns {object}
 *
 * @tutorial static-date
 * @example
 * //Return object
 * {
 *  y:2010, yyyy:"2010", yy:"10",
 *  M:5, MM:"05", MMM:"May",
 *  d:1, dd:"01", EEE:"Sat", e:6
 *  H:16, HH:"16", h:4, hh:"04", a:"PM"
 *  m:21, mm:"21"
 *  s:42, ss:"42"
 *  unixtm:1272730884, unixms:1272730884000
 * }
 * @example
 * dt = $any.date.get();	//Now
 * dt = $any.date.get('2056-1-1 0:00');		//Date format string
 * dt = $any.date.get(1024100000);			//Unix timestamp
 * dt = $any.date.get(new Date('1893/01/01'));	//Date object
 */
any.date.get = function(date, isError){
	info('date.get');

	var dt = dtP(date), v = {}, t;

	if (!dt || isNaN(dt.getTime())){
		if (isError !== false){
			error('illegal format', date);
		}

		return null;
	}

	v.y = dt.getFullYear();
	v.M = dt.getMonth() + 1;
	v.d = dt.getDate();
	v.H = dt.getHours();
	v.m = dt.getMinutes();
	v.s = dt.getSeconds();
	v.e = dt.getDay();

	v.yyyy = ('0' + v.y).slice(-4);
	v.yy = dtT(v.y);
	v.MM = dtT(v.M);
	v.dd = dtT(v.d);
	v.MMM = any.date.define.months[v.M - 1];
	v.EEE = any.date.define.days[v.e];

	v.a = (v.H < 12)?'AM':'PM';
	v.HH = dtT(v.H);
	v.h = v.H%12;
	v.hh = dtT(v.h);

	v.mm = dtT(v.m);
	v.ss = dtT(v.s);

	t = dt.getTime();
	v.unixms = t;	//milliseconds
	v.unixtm = Math.floor(t/1000);

	return v;
};

/**
 * Return formated date time.
 * @function format
 * @memberof $any.date
 *
 * @param {integer|Date|string} [date] Date source.Supporting various format.
 * @param {string} [format='EEE, MMM d, yyyy HH:mm'] Date format.
 * @param {assoc} [opt] Option
 * @param {string} [opt.error=true] Determine to occur error. - $any.date.get error
 * @param {string} [opt.wrap=false] Determine to wrap each value.
 * @returns {string}
 *
 * @tutorial static-date
 * @example
 * v = $any.date.format('yyyy-MM-dd HH:mm');
 * v = $any.date.format('EEE, MMM d, yyyy', 'February 10, 2010 0:00');
 * v = $any.date.format('EEE, MMM d, yyyy', '2063-2-30 0:00');
 * v = $any.date.format('EEE, MMM, M/d, yyyy HH:mm', '1956.7.10 0:00');
 * v = $any.date.format('EEE, MMM d, yyyy', 1131156102);
 */
any.date.format = function(format, date, opt){
	info('date.format');

	format = format || 'EEE, MMM d, yyyy HH:mm';

	opt = ext({error: true, wrap: false}, opt);

	var dt = any.date.get(date, opt.error);

	if (!dt){
		return '';
	}

	return any.tpl.assign(format, dt, {wrap: opt.wrap});
};

/**
 * Simple floating block and msg, pane. Supporting $any.profile.
 *
 * <b><i>Note! Not included in any-tiny.js.</i></b><br>
 *
 * | Method | Default ver | Tiny ver | Micro ver |
 * |:---|:---:|:---:|:---:|
 * | All methods | Yes | - | - |
 *
 * <b>HTML element / CSS structure</b>
 *
 * - <code>#n-fl(*specifiable)</code>, <code>.n-fl-root</code><br>
 *   - <code>.n-fl-wrap</code><br>
 *     - <code>.n-fl-inner</code><br>
 *   - <code>.n-fl-bg</code><br>
 *
 * <b>Specification</b><br>
 * required: any.css / any.min.css
 *
 * @namespace $any.floating
 *
 * @see jQuery.fn@ui
 * @see jQuery.fn@ui-cmp
 *
 * @tutorial static-floating
 *
 * @example
 * $any.floating.show('Message');
 * $any.floating.show('<b>Title</b><br>');
 * $any.floating.show(elem, null, {delay: 5000, clickHide: false});
 *
 * $any.floating.panel('Message');
 * $any.floating.panel('<b>Message</b>', null, {width: 500, height: 300});
 *
 * $any.floating.msg('Message');
 * $any.floating.msg('Message', null, {css: 'sample'});
 *
 * $any.floating.loading(true);    //Begin loading.
 * $any.floating.loading(false);   //End loading.
 */
any.floating = any.profile.create({});

/**
 * @ignore
 */
function flSh(rt, ct, cls, drop, opt){
	opt = any.floating.getProfile(opt, {
		delay: -1,
		modal: true,
		showing: {duration: 100}, hiding: {duration: 75},
		width: null, height: null, opacity: null, noselect: null,
		top: null, left: null, bottom: null, right: null,
		id: null, css: null,
		bgColor: '',
		clickHide: true,
		drop: drop,
		build: null
	});

	var c, wrp, wrps, back, t;

	nolog();

	if (drop || rt.length == 0){
		rt = $('<div class="n-fl-root"/>').hide();
		c = $('<div/>');
		wrp = $('<div class="n-fl-wrap"/>').append(c);
		back = $('<div class="n-fl-bg"/>');

		rt.append(wrp).append(back);

		if (drop){
			$('body').append(rt);
		}else{
			ct = ct.swapBy(rt).show();
		}

		c.append(ct);

		rt.on('close', function(e, el){
			el = el || null;

			if (drop){
				rt.hideDel(opt.hiding);
			}else{
				rt.hiding(opt.hiding);
			}

			rt = null;

			if (cls){
				cls.call(this, el, e);
			}
		});

		if (opt.id){
			rt.attr('id', opt.id);
		}

		if (opt.css){
			c.addClass(opt.css);
		}

		if (opt.clickHide){
			((opt.modal)?rt:c).bindTrigger(rt, 'close');
		}

		if (opt.build){
			opt.build.call(c);
		}

		t = rt.find('.e-close,.n-close');

		if (t.length > 0){
			t.clicked(function(){
				rt.trigger('close', [this]);
			});
		}

		if (!opt.modal){
			rt.css('pointer-events', 'none');
			c.css('pointer-events', 'auto');
		}
	}else{
		c = rt.find('.n-fl-inner');
		wrp = rt.find('.n-fl-wrap');
		back = rt.find('.n-fl-bg');
	}

	wrps = wrp.add(c);

	cssLy(c, opt);

	if (opt.width != null){
		wrps.css('width', opt.width + 'px');
	}

	if (opt.height != null){
		wrps.css('height', opt.height + 'px');
	}

	if (opt.top != null){
		wrps.css('margin-top', opt.top + 'px');
	}

	if (opt.left != null){
		wrps.css('margin-left', opt.left + 'px');
	}

	if (opt.bottom != null){
		wrps.css('margin-bottom', opt.bottom + 'px');
	}

	if (opt.right != null){
		wrps.css('margin-right', opt.right + 'px');
	}

	if (opt.bgColor){
		back.css('background-color', opt.bgColor);
	}

	if (opt.delay > 0){
		setTimeout(function(){
			if (rt){
				rt.trigger('close');
			}
		}, opt.delay);
	}

	rt.showing(opt.showing);

	relog();

	ct = null;

	return c;
}

/**
 * Show floating pane to center position with option.
 * @function show
 * @memberof $any.floating
 *
 * @param {jQuery|string} el Content. Text or html or jQuery object.
 * @param {function} [done] Complete function.
 * @param {assoc} [opt] Option - support $any.floating profile option.
 * @param {integer} [opt.delay=-1] Auto hide time by millisecond.(-1: Not hide)
 * @param {boolean} [opt.modal=true] Determine to show modal pane. Dependencies: CSS3 "pointer-events".
 * @param {assoc} [opt.showing] $.fn.showing option.
 * @param {boolean} [opt.showing.duration=100] Show duration.
 * @param {assoc} [opt.hiding] $.fn.hiding option.
 * @param {boolean} [opt.hiding.duration=75] Hide duration.
 * @param {integer} [opt.width=null] Width.
 * @param {integer} [opt.height=null] Height.
 * @param {number} [opt.opacity=null] CSS opacity.
 * @param {boolean} [opt.noselect=null] If true, can't select content.
 * @param {integer} [opt.top=null] Top margin.
 * @param {integer} [opt.left=null] Left margin.
 * @param {integer} [opt.bottom=null] Bottom margin.
 * @param {integer} [opt.right=null] Right margin.
 * @param {string} [opt.id] Add the id name.
 * @param {string} [opt.css=null] Add the class name.
 * @param {string} [opt.bgColor=''] Background color.
 * @param {boolean} [opt.clickHide=true] Determine to hide if click.
 * @param {boolean} [opt.drop=true] Determine to drop after hide.
 * @param {function} [opt.build] Prepare function.
 * @returns {jQuery}
 *
 * @tutorial static-floating
 * @example
 * $any.floating.show('Message');
 * $any.floating.show('<b>Title</b><br>');
 * $any.floating.show(elem, null, {delay: 5000, clickHide: false});
 * $any.floating.show('Message', null, 'my-profile');
 * $any.floating.show(elem, null, {modal: false});
 */
any.floating.show = function(el, done, opt){
	info('floating.show');

	return flSh(null, el, done, true, opt);
};

/**
 * Show floating pane by exist element.
 * @function showby
 * @memberof $any.floating
 *
 * @param {Selector} el Target element.
 * @param {function} [done] Complete function.
 * @param {assoc} [opt] $any.floating.show option - support $any.floating profile option.
 * @param {boolean} [opt.drop=false] Determine to drop after hide.
 * @returns {jQuery}
 *
 * @see $any.floating.show
 *
 * @tutorial static-floating
 * @example
 * $any.floating.showby('.target');
 * $any.floating.showby('.target', null, {modal: false});
 */
any.floating.showby = function(el, done, opt){
	info('floating.showby');

	var root = $(el).closest('.n-fl-root');

	return flSh(root, $(el), done, false, opt);
};

/**
 * @ignore
 */
function flPn(drop, opt){
	opt = any.floating.getProfile(opt, {
		layout: 'shadow',
		width: 400, height: 200,
		clickHide: false,
		drop: drop,
		button: true
	});

	opt.build = function(){
		opt.closing = null;
		$(this).nPanel(opt);
	};

	return opt;
}

/**
 * Show floating panel.
 * @function panel
 * @memberof $any.floating
 *
 * @param {jQuery|string} content Message string or html or jQuery object.
 * @param {function} [done] Complete function.
 * @param {assoc} [opt] $any.floating.show option - support $any.floating profile option.
 * @param {string} [layout='shadow'] Layout.
 * @param {integer} [opt.width=400] Width.
 * @param {integer} [opt.height=200] Height.
 * @param {boolean} [opt.clickHide=false] Determine to hide if click.
 * @param {boolean} [opt.button=true] Show close-button. $.fn.nPanel option.
 * @returns {jQuery}
 *
 * @see $any.floating.show
 * @see jQuery.fn@ui-cmp#nPanel
 *
 * @tutorial static-floating
 * @example
 * $any.floating.panel('Message');
 * $any.floating.panel('<b>Message</b>', null, {width: 500, height: 300});
 * $any.floating.panel('Message', null, 'my-profile');
 */
any.floating.panel = function(content, done, opt){
	info('floating.panel');

	opt = flPn(true, opt);

	return any.floating.show(content, done, opt);
};

/**
 * Show floating panel by exist element.
 * @function panelby
 * @memberof $any.floating
 *
 * @param {jQuery|string} content Message string or html or jQuery object.
 * @param {function} [done] Complete function.
 * @param {assoc} [opt] $any.floating.show option - support $any.floating profile option.
 * @param {string} [layout='shadow'] Layout.
 * @param {integer} [opt.width=400] Width.
 * @param {integer} [opt.height=200] Height.
 * @param {boolean} [opt.clickHide=false] Determine to hide if click.
 * @param {boolean} [opt.drop=false] Determine to drop after hide.
 * @param {boolean} [opt.button=true] Show close-button. $.fn.nPanel option.
 * @returns {jQuery}
 *
 * @see $any.floating.panel
 * @see jQuery.fn@ui-cmp#nPanel
 *
 * @tutorial static-floating
 * @example
 * $any.floating.panelby('#target');
 * $any.floating.panelby('#target', null, {width: 500, height: 300});
 */
any.floating.panelby = function(el, done, opt){
	info('floating.panelby');

	opt = flPn(false, opt);

	return any.floating.showby($(el), done, opt);
};

/**
 * @ignore
 */
function flMsg(drop, opt){
	opt = any.floating.getProfile(opt, {
		layout: 'round+shadow',
		width: 400, height: 60,
		drop: drop,
		button: false
	});

	opt.build = function(){
		opt.closing = null;
		$(this).nPanel(opt);

		$(this).wrapInner('<div class="n-fl-msg"/>');
	};

	return opt;
}

/**
 * Show floating msg.
 * @function msg
 * @memberof $any.floating
 *
 * @param {jQuery|string} content Message string or html or jQuery object.
 * @param {function} [done] Complete function.
 * @param {assoc} [opt] $any.floating.show option - support $any.floating profile option.
 * @param {integer} [opt.width=400] Width.
 * @param {integer} [opt.height=80] Height.
 * @returns {jQuery}
 *
 * @see $any.floating.show
 * @see jQuery.fn@ui-cmp#nPanel
 *
 * @tutorial static-floating
 * @example
 * $any.floating.msg('Message');
 * $any.floating.msg('Message', null, {css: 'sample'});
 * $any.floating.msg('Message', null, 'my-profile');
 */
any.floating.msg = function(content, done, opt){
	info('floating.msg');

	opt = flMsg(true, opt);

	return any.floating.show(content, done, opt);
};

/**
 * Show floating msg by exist element.
 * @function msgby
 * @memberof $any.floating
 *
 * @param {Selector} el Target element.
 * @param {function} [done] Complete function.
 * @param {assoc} [opt] $any.floating.showby option - support $any.floating profile option.
 * @param {integer} [opt.width=400] Width.
 * @param {integer} [opt.height=60] Height.
 * @returns {jQuery}
 *
 * @see $any.floating.msg
 * @see jQuery.fn@ui-cmp#nPanel
 *
 * @tutorial static-floating
 * @example
 * $any.floating.msgby('.target');
 * $any.floating.msgby('.target', null, {modal: false});
 */
any.floating.msgby = function(el, done, opt){
	info('floating.msgby');

	opt = flMsg(false, opt);

	return any.floating.showby($(el), done, opt);
};

/**
 * Show and hide the loading.
 * @function loading
 * @memberof $any.floating
 *
 * @param {boolean} v Show or hide.
 * @param {assoc} [opt] Option $any.floating.show option - support $any.floating profile option.
 * @param {string} [opt.id='n-loading'] Add the id name. Default: #n-loading.
 * @param {string} [opt.css=''] Add the class name.
 * @param {string} [opt.content=''] Content.
 * @param {string} [opt.width=250] width.
 * @param {string} [opt.height=90] height.
 * @returns {jQuery|void}
 *
 * @see $any.floating.show
 *
 * @tutorial static-floating
 * @example
 * $any.floating.loading(true);		//Begin loading.
 * $any.floating.loading(false);		//End loading.
 */
any.floating.loading = function(v, opt){
	info('floating.loading');

	opt = any.floating.getProfile(opt, {id: 'n-loading', css: '', content: '',
		width: 250, height: 90,
		showing: {duration: 0}, hiding: {duration: 0}
	});

	opt.delay = -1;
	opt.clickHide = false;
	opt.drop = true;

	var c = null;

	if (v){
		opt.build = function(){
			$(this).addClass('wait-img');
		};

		c = any.floating.show(opt.content, null, opt);
	} else {
		any.floating.close('#' + opt.id);
	}

	return c;
};

/**
 * Close floating pane.
 * @function close
 * @memberof $any.floating
 *
 * @param {Selector} [el='.n-fl-root'] Target element.
 * @returns {jQuery}
 *
 * @tutorial static-floating
 * @example
 * $any.floating.close();
 * $any.floating.close('#target');
 * $any.floating.close('#target');
 */
any.floating.close = function(el){
	info('floating.close');

	if (!el){
		el = '.n-fl-root';
	}

	return $(el).filter(':visible:first').trigger('close');
};

/**
 * Any motion($any.motion) static methods for jQuery.fn@motion methods. Supporting $any.profile.
 *
 * <b><i>Note! Not included in any-tiny.js.</i></b><br>
 *
 * | Method | Default ver | Tiny ver | Micro ver |
 * |:---|:---:|:---:|:---:|
 * | All methods | Yes | - | - |
 *
 * @namespace $any.motion
 *
 * @tutorial fn-motion
 * @tutorial fn-motion-effect
 * @tutorial demo-ui
 * @tutorial demo-various
 */

any.motion = any.profile.create({});

var mtnOn = 1;
var mtnTf = null;

/**
 * Pause motion in function for initialization.
 * @function pause
 * @memberof $any.motion
 *
 * @param {function} fn Function.
 *
 * @see $any.motion.suspend
 * @see $any.motion.resume
 * @tutorial fn-motion
 * @example
 * $any.motion.pause(function(){
 *   $('#target1').showing();
 *   $('#target2').hiding();
 *   $('#target3').viewing(true);
 * });
 */
any.motion.pause = function(fn){
	any.motion.suspend();

	fn();

	any.motion.resume();
};

/**
 * Suspend motion for initialization.
 * @function suspend
 * @memberof $any.motion
 *
 * @tutorial fn-motion
 * @example
 * $any.motion.suspend();
 * $('#target1').showing();
 * $('#target2').hiding();
 * $('#target3').viewing(true);
 * $any.motion.resume();
 */
any.motion.suspend = function(){
	info('motion.suspend');

	mtnOn--;

	if (mtnOn < 0){
		return;
	}

	mtnTf = any.motion.fn;

	any.motion.fn = {
		showing: function(c, o){
			c.show(0, o.complete);
		},
		hiding: function(c, o){
			c.hide(0, o.complete);
		},
		stop: function(c){ }
	};
};

/**
 * Resume motion.
 * @function resume
 * @memberof $any.motion
 *
 * @see $any.motion
 * @tutorial fn-motion
 * @example
 * $any.motion.suspend();
 * $('#target1').showing();
 * $('#target2').hiding();
 * $('#target3').viewing(true);
 * $any.motion.resume();
 */
any.motion.resume = function(){
	info('motion.resume');

	mtnOn++;

	if (mtnOn != 1){
		return;
	}

	any.motion.fn = mtnTf;

	mtnTf = null;
};

/**
 * $.fn.showing and $.fn.hinding function defines. It makes possible to change show/hide behaviors. Example: Adding velocity.js.
 * @name fn
 * @memberof $any.motion
 * @type {functions}
 *
 * @tutorial fn-motion
 * @tutorial fn-motion-effect
 */
any.motion.fn = {};

/**
 * @ignore
 */
function opsw(el){
	if (el.css('display') === 'none'){
		el.css({opacity:0, display:'block'});
	}

	if (el.css('visibility') === 'hidden'){
		el.css({opacity:0, visibility:'visible'});
	}
}

/**
 * @ignore
 */
function showing(el, o){
	switch(o.effect){
	case 'slide':
		el.slideDown(o.duration, o.easing, o.complete);
		break;
	case 'fade':
		el.fadeIn(o.duration, o.easing, o.complete);
		break;
	case 'opacity':
		opsw(el);
		el.animate({opacity: 1}, o.duration, o.easing, o.complete);
		break;
	case 'none':
		opsw(el);
		el.css('opacity', 1).show(0, o.complete);
		break;
	case null:
	case false:
	case '':
		el.show(0, o.complete);
		break;
	case 'default':
	default:
		el.show(o.duration, o.easing, o.complete);
		break;
	}
}

/**
 * Define function for $.motion.fn.showing.
 * @function
 * @memberof $any.motion
 *
 * @tutorial fn-motion-effect
 * @example
 $any.motion.fn.showing = function(el, o){
  switch(o.effect){
  case 'slide':
    el.slideDown(o.duration, o.easing, o.complete);
    break;
  case 'fade':
    el.fadeIn(o.duration, o.easing, o.complete);
    break;
  case null:
  case false:
  case '':
    el.show(0, o.complete);
    break;
  case 'default':
  default:
    el.show(o.duration, o.easing, o.complete);
    break;
 }
};
 */
any.motion.fn.showing = showing;

/**
 * @ignore
 */
function hiding(el, o){
	switch(o.effect){
	case 'slide':
		el.slideUp(o.duration, o.easing, o.complete);
		break;
	case 'fade':
		el.fadeOut(o.duration, o.easing, o.complete);
		break;
	case 'opacity':
		el.animate({opacity: 0}, o.duration, o.easing, o.complete);
		break;
	case 'none':
		el.css('opacity', 0).show(0, o.complete);
		break;
	case null:
	case false:
	case '':
		el.hide(0, o.complete);
		break;
	case 'default':
	default:
		el.hide(o.duration, o.easing, o.complete);
		break;
	}
}

/**
 * Define function for $.motion.fn.hiding.
 * @function
 * @memberof $any.motion
 *
 * @tutorial fn-motion-effect
 * @example
 $any.motion.fn.hiding = function(el, o){
  switch(o.effect){
  case 'slide':
	 el.slideUp(o.duration, o.easing, o.complete);
	 break;
  case 'fade':
	 el.fadeOut(o.duration, o.easing, o.complete);
	 break;
  case null:
  case false:
  case '':
	 el.hide(0, o.complete);
	 break;
  case 'default':
  default:
	 el.hide(o.duration, o.easing, o.complete);
	 break;
 }
};
 */
any.motion.fn.hiding = hiding;

/**
 * Define function for $.motion.fn.stop.
 * @function
 * @memberof $any.motion
 *
 * @tutorial fn-motion-effect
 * @example
$any.motion.fn.stop = function(el){
	el.stop();
};
 */
any.motion.fn.stop = function(el){
	el.stop();
};

/**
 * Apply velocity.js effect. Required to include velocity.js in advance.
 * @function exVelocity
 * @memberof $any.motion
 *
 * @tutorial fn-motion-effect
 * @tutorial fn-motion-various
 *
 * @example
 * $any.motion.exVelocity();
 *
 * $('#target').showing({effect: 'bounce'});
 * $('#target').showing({effect: 'shrink'});
 */
any.motion.exVelocity = function(){
	any.motion.fn.showing = function(el, o){
		if (o.ext !== false){
			switch(o.effect){
			case 'fade':
				el.velocity('fadeIn', o);
				break;
			case 'slide':
				el.velocity('slideDown', o);
				break;
			default:
				el.velocity('transition.' + o.effect + 'In', o);
				break;
			}
		}else{
			showing(el, o);
		}
	};

	any.motion.fn.hiding = function(el, o){
		if (o.ext !== false){
			switch(o.effect){
			case 'fade':
				el.velocity('fadeOut', o);
				break;
			case 'slide':
				el.velocity('slideUp', o);
				break;
			default:
				el.velocity('transition.' + o.effect + 'Out', o);
				break;
			}
		}else{
			hiding(el, o);
		}
	};

	any.motion.fn.stop = function(el){
		el.velocity('stop');
	};
};

/**
 * Detect visible or hidden.
 * @function hidden
 * @memberof $any.motion
 * @type {functions}
 *
 * @see
 * if (!$any.motion.hidden(el)){
 * 	//Visible.
 * }
 */
any.motion.hidden = function(el){
	if (el.css('display') === 'none' || el.css('visibility') === 'hidden' || el.css('opacity') == 0){
		return true;
	}

	return false;
};

/**
 * Any ui($any.ui) static methods. Layout helper methods.
 *
 * | Method | Default ver | Tiny ver | Micro ver |
 * |:---|:---:|:---:|:---:|
 * | styleRule | Yes | Yes | - |
 * | styleCSS | Yes | Yes | - |
 * | showHides | Yes | - | - |
 * | delayLoad | Yes | - | - |
 * | shower | Yes | - | - |
 * | swapper | Yes | - | - |
 * | filler | Yes | - | - |
 * | calcRelative | Yes | - | - |
 *
 * @namespace $any.ui
 *
 * @see jQuery.fn@ui
 * @see jQuery.fn@ui-cmp
 *
 * @tutorial static-ui
 * @tutorial fn-ui
 * @tutorial ui-css
 * @tutorial demo-ui
 * @tutorial demo-various
 *
 * @example
 * //See tutorials.
 */

any.ui = {};

/**
 * Get CSSRule object by CSS name.
 * @function styleRule
 * @memberof $any.ui
 *
 *	 @param {string} name CSS style name.
 *	 @returns {object} CSSRule object.
 *
 * @tutorial static-ui
 *
 * @example
 * rule = $any.ui.styleRule('.demo');
 */
any.ui.styleRule = function(name){
	info('ui.styleRule');

	var nm = name.replace(/([^\:])\:([^\:])/, '$1::$2'), sts = document.styleSheets, i, j, r, st, l;

	for (i=0;i<sts.length;i++){
		try {
			st = sts[i];
			r = st.cssRules || st.rules;
			l = r.length;

			for (j=0;j<l;j++){
				if (r[j].selectorText === nm){
					return r[j];
				}
			}
		}catch(e){

		}
	}

	if(st.insertRule){
		st.insertRule(name + '{}', l);
	}else{
		st.addRule(name, ' ', l);
	}

	return r[l];
};

/**
 * @ignore
 */
function cml(v){
	return v.replace(/\-(.)/g, function(v, t){
		return t.toUpperCase();
	});
}

/**
 * Set CSS value dynamically.
 * @function styleCSS
 * @memberof $any.ui
 *
 * @param {string|object} rule CSSRule object or CSS style-name.
 * @param {string|assoc} css CSS property name or KeyValue which CSS property and value.
 * @param {string|integer} v CSS value.
 *	 @returns {object} CSSRule object.
 *
 * @tutorial static-ui
 *
 * @example
 * $any.ui.styleCSS('.demo', 'color' , 'red');
 * $any.ui.styleCSS(rule, 'font-size' , '1px');
 */
any.ui.styleCSS = function(rule, css, v){
	info('ui.styleCSS');

	var r = (typeof rule === 'object')?rule:any.ui.styleRule(rule);

	if (r){
		if (typeof css === 'object'){
			any.each(css, function(k, v){
				r.style[cml(k)] = v;
			});
		}else{
			r.style[cml(css)] = v;
		}
	}

	return r;
};

/**
 * Show and hides menu.
 *
 * <b><i>Note! Not included in any-tiny.js.</i></b><br>
 *
 * @function showHides
 * @memberof $any.ui
 *
 * @param {assoc} pairs Pairs of 'Event element / Target element'.
 * @param {assoc} [opt] Options.
 * @param {boolean} [opt.clickShow=false] Enable to show by click.
 * @param {boolean} [opt.clickOut=true] Enable to hide by click-out.
 * @param {integer} [opt.hideDelay=null] Hide delay ms.
 * @param {assoc} [opt.show] Show detail options.
 * @param {string} [opt.show.event='mouseenter'] Show event.
 * @param {integer} [opt.show.delay=null] Show delay ms.
 * @param {assoc} [opt.hide] Hide detail options.
 * @param {string} [opt.hide.event='mouseleave'] Hide event.
 * @param {integer} [opt.hide.delay=50] Hide delay ms.
 * @param {assoc} [opt.hide.self] Hide self detail options.
 * @param {string} [opt.hide.self.event='mouseleave'] Hide event(pane-self).
 * @param {integer} [opt.hide.self.delay=50] Hide delay ms(pane-self).
 *
 * @see $any.ui.showHide
 *
 * @tutorial static-ui
 *
 * @example
 * $any.ui.showHides(pairs);
 * $any.ui.showHides(pairs, {clickShow: true});
 * $any.ui.showHides(pairs, {clickOut: false});
 * $any.ui.showHides(pairs, {hide: {delay: 200, self: {delay: 100}}});
 */
any.ui.showHides = function(pairs, opt){
	info('ui.showHides');

	opt = ext({
		clickShow: false,
		clickOut: true,
		hideDelay: null,
		show: {event: 'mouseenter', delay: null},
		hide: {event: 'mouseleave', delay: 50, self: true}
	}, opt, true);

	var tc = null, sw = opt.show, hd = opt.hide;

	sw.fn = function(el, e, opt){
		if (tc && !hasEl(tc, el)){
			tc.hiding(opt);
			tc = null;
		}
		tc = el;
		el.showing(opt);
	};

	sw.self = {event: 'mouseenter'};

	if (opt.clickShow === true){
		sw.event = 'click';
		hd.event = null;
		hd.self.event = null;
	}

	if (opt.clickOut === false){
		hd.clickOut = false;
	}

	if (opt.hideDelay !== null){
		hd.delay = opt.hideDelay;
		hd.self.delay = opt.hideDelay;
	}

	for (var cmd in pairs){
		if (pairs.hasOwnProperty(cmd)){
			$(cmd).showHide(pairs[cmd], sw, hd, opt);
		}
	}
};

/**
 * Delay-load all resources. Target elements are <code>img, script, iframe, embed, link</code>
 *
 * <b><i>Note! Not included in any-tiny.js.</i></b><br>
 *
 * @function delayLoad
 * @memberof $any.ui
 *
 * @param {assoc} [opt] Options.
 * @param {string} [opt.suffix='src'] Data attribute suffix.
 * @param {function} [opt.prepare=null] Prepare function.
 *
 * @see jQuery.fn@ui#delayLoad
 *
 * @tutorial static-ui
 *
 * @example
 * $any.ui.delayLoad();
 */
any.ui.delayLoad = function(opt){
	info('ui.delayLoad');

	opt = ext({suffix: 'src', prepare: null}, opt);

	$('img,script,iframe,embed').delayLoad(opt);

	$('link').each(function(){
		if (!$(this).attr('rel') && trim(String($(this).attr('type')).toLowerCase()) == 'text/css'){
			$(this).attr('rel', 'stylesheet');
		}
	});
};

/**
 * Create function which have "show/hide" ui-behaviors.
 *
 * <b><i>Note! Not included in any-tiny.js.</i></b><br>
 *
 * @function shower
 * @memberof $any.ui
 *
 * @param {Selector|null} el Target element.
 * @param {Selector} add Add element.
 * @param {assoc} [opt] Options.
 * @param {function} [opt.done] Complete function.
 * @returns {function}
 *
 * @see jQuery.fn@motion#addShow
 * @see jQuery.fn@motion#hideDel
 * @see jQuery.fn@motion#hiding
 *
 * @tutorial static-ui
 *
 * @example
 * wait = $any.ui.shower('#target', '#elem');
 * $any.ui.shower('#target', '<div class="loading-mini"/>', {duration: 500})(true);
 * wait = $any.ui.shower(null, '<div class="loading-mini"/>', {duration: 100});
 */
any.ui.shower = function(el, add, opt){
	info('ui.shower');

	add = $(add);
	opt = ext({done: null}, opt);

	if (opt.done){
		mtnDn(opt, 'hiding', opt.done);
	}

	return function(v, c){
		if (c){
			el = c;
		}

		if (v){
			$(el).addShow(add, opt);
		}else{
			if (add.selector){
				add.hiding(opt);
			}else{
				add.hideDel(opt);
			}
		}
	};
};

/**
 * Create function which have "swap element" ui-behaviors.
 *
 * <b><i>Note! Not included in any-tiny.js.</i></b><br>
 *
 * @function swapper
 * @memberof $any.ui
 *
 * @param {Selector|null} el Target element.
 * @param {Selector} swp Swap element.
 * @param {assoc} [opt] Options.
 * @returns {function}
 *
 * @see jQuery.fn@motion#swapping
 *
 * @tutorial static-ui
 *
 * @example
 * swap = $any.ui.swapper('#target', '#elem');
 * $any.ui.swapper('#target', '<div class="loading-mini"/>', {duration: 500})(true);
 * swap = $any.ui.swapper(null, '<div class="loading-mini"/>', {duration: 100});
 */
any.ui.swapper = function(el, swp, opt){
	info('ui.swapper');
	el = $(el);swp = $(swp);

	return function(v, c){
		if (c){
			el = $(c);
		}

		if (v){
			el.swapping(swp, opt);
		}else{
			swp.swapping(el, opt);
		}
	};
};

/**
 * Create function which have "fill" ui-behaviors.
 *
 * <b><i>Note! Not included in any-tiny.js.</i></b><br>
 *
 * @function filler
 * @memberof $any.ui
 *
 * @param {Selector|null} el Target element.
 * @param {Selector} org Original element.
 * @param {Selector} rep Replace element.
 * @returns {function}
 *
 * @tutorial static-ui
 *
 * @example
 * filler = $any.ui.filler('#target', 'Before', '<b>After</b>');
 * filler = $any.ui.filler('#target', null, '<b>After</b>');
 */
any.ui.filler = function(el, org, rep){
	info('ui.filler');

	if (org == null){
		org = $(el).contents();
	}

	return function(v, c){
		if (c){
			el = c;
		}

		$(el).html((v)?rep:org);
	};
};

/**
 * Calculate relative position between source element and destination element.
 *
 * <b><i>Note! Not included in any-tiny.js.</i></b><br>
 *
 * @function calcRelative
 * @memberof $any.ui
 *
 *	 @param {Selector} el Source element.
 * @param {Selector} dest Destination element.
 * @param {string} [place='bottom'] Place. <code>center, left, top, right, bottom</code>
 * @param {assoc} [opt] Options.
 * @param {boolean} [opt.center=false] Center justification.
 * @param {integer} [opt.padding=10] Padding.
 * @param {array} [opt.buffer={left:0, top:0}] Buffer.
 *
 * @tutorial static-ui
 *
 * @example
 * $any.ui.calcRelative('#src', '#dest', 'center');
 */
any.ui.calcRelative = function(el, dest, place, opt){
	info('ui.calcRelative');

	opt = ext({center: false, padding: 10, buffer: {left:0, top:0}}, opt);

	var ps = $(el).offset(), ox = ps.left, oy = ps.top, x, y;
	var ow = $(el).outerWidth(true), dw = $(dest).outerWidth(true), oh = $(el).outerHeight(true), dh = $(dest).outerHeight(true);
	var sw = (ow - dw)/2, sh = (oh - dh)/2, p = opt.padding;

	var r = {};

	switch(place){
		case 'center':
			x = ox + sw;
			y = oy + sh;
			break;
		case 'left':
			x = ox - dw - p + ((opt.center)?ow/2:0);
			y = oy + sh;
			break;
		case 'top':
			x = ox + sw;
			y = oy - dh - p + ((opt.center)?oh/2:0);
			break;
		case 'right':
			x = ox + ow + p - ((opt.center)?ow/2:0);
			y = oy + sh;
			break;
		default:	//bottom
			x = ox + sw;
			y = oy + oh + p - ((opt.center)?oh/2:0);
			break;
	}

	r.left = Math.round(x + opt.buffer.left);
	r.top = Math.round(y + opt.buffer.top);

	return r;
};

var MicroUI = null;

/**
 * Create MicroUI class for browser ui. So tiny UI-framework.
 *
 * | Method | Default ver | Tiny ver | Micro ver |
 * |:---|:---:|:---:|:---:|
 * | All methods | Yes | - | - |
 *
 * <b><i>Note! Not included in any-tiny.js.</i></b><br>
 *
 * @function MicroUI
 * @memberof $any.ui
 *
 * @param {function} construct Class constructor and base structure.
 * @param {function|functions} methods Class methods or Function space and class methods. Add methods by prototype.
 * @returns {MicroUI}
 *
 * @see MicroUI
 *
 * @see NanoUI
 * @see $any.ui.NanoUI
 * @see $any@class.makeClass
 *
 * @tutorial static-microui
 * @tutorial demo-ui
 *
 * @example
 * var MicroUI = $any.ui.MicroUI();
 * var Panel = $any.ui.MicroUI(function(){ ... }, { method1: ..., method2: ...});
 */
any.ui.MicroUI = function(construct, methods){
	info('MicroUI');

	if (!MicroUI){
		/**
		 * <b><i>Note! Only for any-tiny.js.</i></b><br>
		 * MicroUI is so tiny UI-framework.
		 *
		 * <b>Usecase</b><br>
		 * Use directly or Use by 'extends class'.
		 *
		 * | Method | Default ver | Tiny ver | Micro ver |
		 * |:---|:---:|:---:|:---:|
		 * | All methods | Yes | - | - |
		 *
		 * @class MicroUI
		 *
		 * @param {string} [prefix=''] Prefix.
		 * @param {assoc<string, string>} [target=null] Target type. <b>Type</b> <code>'id'(default), 'form', 'class'</code>.
		 * @param {functions} [filter=null] Value-filter functions.
		 * @param {functions} [mask=null] Value-mask functions.
		 *
		 * @see $any.ui.MicroUI
		 * @see $any@class.makeClass
		 *
		 * @tutorial static-microui
		 * @tutorial demo-ui
		 *
		 * @example
		 * var MicroUI = $any.ui.MicroUI();
		 * var microui = new MicroUI();
		 * var panel = new ($any.ui.MicroUI(function(){ ... }, { method1: ..., method2: ...}));
		 */
		MicroUI = any.makeClass(function(prefix, targets, filters, masks){
			/**
			 * Element name prefix.
			 * @memberof MicroUI
			 * @protected
			 * @instance
			 * @name _prefix
			 * @type {string}
			 * @default ''
			 *
			 * @see MicroUI#prefix
			 * @tutorial static-microui
			 *
			 * @example
			 * var micro = new ($any.ui.MicroUI(function(){ this._prefix = 'prefix'; }, {...});
			 */
			this._prefix = '';

			/**
			 * Connection to prefix and name.
			 * @memberof MicroUI
			 * @protected
			 * @instance
			 * @name _join
			 * @type {string}
			 * @default '-'
			 *
			 * @see MicroUI#prefix
			 * @tutorial static-microui
			 */
			this._join = '-';

			this.prefix(prefix);

			/**
			 * Element id for building. If null, id is <i>prefix</i>.
			 * @memberof MicroUI
			 * @protected
			 * @instance
			 * @name _bldid
			 * @type {string}
			 * @default null
			 *
			 * @see MicroUI#_build
			 * @tutorial static-microui
			 *
			 * @example
			 * this._bldid = 'targetid';
			 */
			this._bldid = null;

			/**
			 * Assign parameters for building.
			 * @memberof MicroUI
			 * @protected
			 * @instance
			 * @name _blds
			 * @type {assoc}
			 * @default null
			 *
			 * @see MicroUI#build
			 * @see MicroUI#_build
			 * @tutorial static-microui
			 */
			this._blds = null;

			/**
			 * Target type. <b>Type</b> <code>'id'(default), 'form', 'class'</code>.
			 * @memberof MicroUI
			 * @protected
			 * @instance
			 * @name _targets
			 * @type {assoc<string, string>}
			 * @default null
			 *
			 * @see MicroUI#targets
			 * @tutorial static-microui
			 */
			this._targets = targets || null;

			/**
			 * Value-filters for <i>val</i> / <i>html</i>.
			 * @memberof MicroUI
			 * @protected
			 * @instance
			 * @name _filters
			 * @type {functions}
			 * @default null
			 *
			 * @see MicroUI#filters
			 * @see MicroUI#val
			 * @see MicroUI#html
			 * @tutorial static-microui
			 */
			this._filters = filters || null;

			/**
			 * Value-masks.
			 * @memberof MicroUI
			 * @protected
			 * @instance
			 * @name _masks
			 * @type {functions}
			 * @default null
			 *
			 * @see MicroUI#masks
			 * @tutorial static-microui
			 */
			this._masks = masks || null;

			/**
			 * Data variable. If use <i>data</i> method, require to initialize <i>_data</i>.
			 * @memberof MicroUI
			 * @protected
			 * @instance
			 * @name _data
			 * @type {assoc}
			 * @default null
			 *
			 * @see MicroUI#data
			 * @tutorial static-microui
			 *
			 * @example
			 * var micro = new ($any.ui.MicroUI(function(){ this._data = {}; }, {...});
			 */
			this._data = null;
		}, {
			/**
			 * Set prefix.
			 * @function
			 * @name prefix
			 * @memberof MicroUI
			 * @instance
			 * @param {string} p Prefix name.
			 *
			 * @see MicroUI#_prefix
			 * @tutorial static-microui
			 *
			 * @example
			 * mui.prefix('prefix');
			 */
			prefix: function(p){
				this._prefix = p;
			},

			/**
			 * Return name prepended prefix.
			 * @function
			 * @name name
			 * @memberof MicroUI
			 * @instance
			 * @param {string} nm Name.
			 * @returns {string}
			 *
			 * @tutorial static-microui
			 *
			 * @example
			 * mui.prefix('prefix');
			 * name = mui.name('name1');
			 * //prefix-name1
			 */
			name: function(nm){
				if (!this._prefix){
					return nm;
				}

				return this._prefix + this._join + nm;
			},

			/**
			 * Set target types. <b>Type</b> <code>'id'(default), 'form', 'class'</code>
			 * @function
			 * @name targets
			 * @memberof MicroUI
			 * @instance
			 * @param {assoc<string, string>} targets Target types.
			 *
			 * @see MicroUI#_targets
			 * @tutorial static-microui
			 *
			 * @example
			 * mui.target({name1: 'class', name2: 'form'});
			 */
			targets: function(targets){
				this._targets = targets;
			},

			/**
			 * Set value-filter functions <i>val</i> / <i>html</i>.
			 * @function
			 * @name filters
			 * @memberof MicroUI
			 * @instance
			 * @param {functions} filters Filter functions. <code>function(v){ ... return v; }</code>
			 *
			 * @see MicroUI#val
			 * @see MicroUI#vals
			 * @see MicroUI#html
			 * @tutorial static-microui
			 *
			 * @example
			 * mui.filter({name1: function(v){ ... }});
			 */
			filters: function(filters){
				this._filters = filters;
			},

			/**
			 * Apply filter and return value.
			 * @function
			 * @name filterApply
			 * @memberof MicroUI
			 * @instance
			 *
			 * @param {string} nm Filter name.
			 * @param {*} v Value.
			 * @returns {*}
			 *
			 * @see MicroUI#_filters
			 * @see MicroUI#filters
			 * @see MicroUI#val
			 * @see MicroUI#vals
			 * @tutorial static-microui
			 *
			 * @example
			 * v = mui.filterApply('filter1', v);
			 */
			filterApply: function(nm, v){
				if (this._filters && this._filters[nm]){
					v = this._filters[nm].call(this, v);
				}else{
					console.error('filter none', nm);
				}

				return v;
			},

			/**
			 * Set Value-mask functions.
			 * @function
			 * @name masks
			 * @memberof MicroUI
			 * @instance
			 * @param {functions} masks Mask functions. <code>function(nm, v, opt){ ... return el; }</code>
			 *
			 * @see MicroUI#_masks
			 * @see MicroUI#filters
			 * @see MicroUI#val
			 * @see MicroUI#vals
			 * @tutorial static-microui
			 *
			 * @example
			 * mui.masks({name1: function(nm, v, opt){ ... }});
			 */
			masks: function(masks){
				this._masks = masks;
			},

			/**
			 * Set config of target element. <code>target / filter / mask</code>
			 * @function
			 * @name config
			 * @memberof MicroUI
			 * @instance
			 * @param {string} nm Target name.
			 * @param {assoc} [stg=null] Settings. <code> {target: ..., filter: ..., mask: ...}</code>
			 * @param {string} [stg.target=null] Target type.
			 * @param {function} [stg.filter=null] Filter function.
			 * @param {function} [stg.mask=null] Mask function.
			 *
			 * @see MicroUI#targets
			 * @see MicroUI#filters
			 * @see MicroUI#masks
			 * @see MicroUI#val
			 * @see MicroUI#vals
			 * @tutorial static-microui
			 *
			 * @example
			 * mui.config('name1', {target: ..., filter: ..., mask: ...});
			 * mui.config('name1', null);
			 */
			config: function(nm, stg){
				stg = stg || {};

				if (!this._targets){ this._targets = {}; }
				this._targets[nm] = stg.target || null;

				if (!this._filters){ this._filters = {}; }
				this._filters[nm] = stg.filter || null;

				if (!this._masks){ this._masks = {}; }
				this._masks[nm] = stg.mask || null;
			},

			/**
			 * Return HTML source for building. It make possible to create ui component.
			 * @function _build
			 * @protected
			 * @memberof MicroUI
			 * @instance
			 * @param {function} [bldset] Initialize call function. <i>MicroUI::__bldset</u>
			 * @returns {string|Promise}
			 *
			 * @see MicroUI#_bldid
			 * @see MicroUI#_blds
			 * @tutorial static-microui
			 *
			 * @example
			 * _build: function(){
			 *   return '<div id="prefix"><div id="{$p}-val"></div>HTML source...</div>';
			 * }
			 * _build: function(){
			 *   return this.template('module.htm');
			 * }
			 * _build: function(bldset){
			 *   $.ajax('demo.jsp').done(function(s){ bldset(s); });
			 * }
			 */
			_build: null,

			/**
			 * Set fn and params for building.
			 * @function
			 * @name build
			 * @memberof MicroUI
			 * @instance
			 * @param {function} [fn] Function which return HTML source for building.
			 * @param {assoc} [vs] Assign parameters for building.
			 *
			 * @see MicroUI#_build
			 * @see MicroUI#_blds
			 * @tutorial static-microui
			 *
			 * @example
			 * this.build(function(){ return 'HTML source'; }, {v1: 'Iron'})
			 */
			build: function(fn, vs){
				if (fn){
					this._build = fn;
				}

				if (vs !== undefined){
					this._blds = vs;
				}
			},

			/**
			 * Initialize. This method is applied motion suspend and resume.
			 * @function
			 * @name init
			 * @memberof MicroUI
			 * @instance
			 *
			 * @see MicroUI#_init
			 * @tutorial static-microui
			 *
			 * @example
			 * mui.init();
			 */
			init: function(){
				if (this._build){
					var s = this._build(this.bind(this.__bldset));

					if (s){
						if (typeof s === 'string'){
							this.__bldset(s);
						}else{
							s.done(this.bind(this.__bldset));
						}
					}
				}else{
					this.__bldinit();
				}
			},

			/**
			 * Initialize, implements method.
			 * @function
			 * @name _init
			 * @protected
			 * @memberof MicroUI
			 * @instance
			 *
			 * @see MicroUI#init
			 * @tutorial static-microui
			 *
			 * @example
			 * _init: function(){
			 *  ...
			 * }
			 */
			_init: null,

			/**
			 * @ignore
			 */
			__bldset: function(s){
				var c = document.getElementById((this._bldid)?this._buildId:this._prefix);

				if (c){
					var vs = this._blds || {};
					vs.$p = this._prefix;

					c.innerHTML = any.tpl.assign(s, vs);
				}

				this.__bldinit();
			},

			/**
			 * @ignore
			 */
			__bldinit: function(){
				any.motion.suspend();

				if (this._init){
					this._init();
				}

				any.motion.resume();
			},

			/**
			 * Set value to element. and get value.
			 * @function
			 * @name val
			 * @memberof MicroUI
			 * @instance
			 * @param {string|jQuery} nm Target name. If <i>prefix</i> is specified, prepend prefix automatically.
			 * @param {number|string} [v] Value. If v is undefined, get value.
			 * @param {assoc} [opt=null] Options.
			 * @returns {MicroUI|number|string}
			 *
			 * @see MicroUI#take
			 * @see MicroUI#filters
			 * @see MicroUI#masks
			 * @see jQuery.fn@form#valex
			 * @tutorial static-microui
			 *
			 * @example
			 * mui.val('name1', 1);
			 * mui.val('name1', 1, opt);
			 * v = mui.val('name1');
			 */
			val: function(nm, v, opt){
				if (v !== undefined) {
					if(this._filters && this._filters[nm]) {
						v = this._filters[nm].call(this, v);
					}

					if(this._masks && this._masks[nm]) {
						return this._masks[nm].call(this, nm, v, opt);
					}
				}

				this.__take(nm).valex(v, opt);

				return this;
			},

			/**
			 * Set values to element.
			 * @function
			 * @name vals
			 * @memberof MicroUI
			 * @instance
			 * @param {assoc<string, number|string>} [vs] Name and value assoc.
			 * @param {assoc} [opt=null] Options.
			 *
			 * @see MicroUI#val
			 * @see MicroUI#filters
			 * @see MicroUI#masks
			 * @tutorial static-microui
			 *
			 * @example
			 * mui.vals({name1: 1, name2: 2});
			 */
			vals: function(vs, opt){
				for (var k in vs){
					if (vs.hasOwnProperty(vs[k])){
						this.val(k, vs[k], opt);
					}
				}
			},

			/**
			 * Set value to element by $.fn.html.
			 * @function
			 * @name html
			 * @memberof MicroUI
			 * @instance
			 * @param {string|jQuery} nm Target name. If <i>prefix</i> is specified, prepend prefix automatically.
			 * @param {number|string} [v] Value.
			 * @returns {MicroUI}
			 *
			 * @see MicroUI#take
			 * @see MicroUI#html
			 * @tutorial static-microui
			 *
			 * @example
			 * mui.html('name1', 'Stone');
			 */
			html: function(nm, v){
				if(this._filters && this._filters[nm]) {
					v = this._filters[nm].call(this, v);
				}

				this.__take(nm).html(v);

				return this;
			},

			/**
			 * Set view-state by $.fn.viewing.
			 * @function
			 * @name view
			 * @memberof MicroUI
			 * @instance
			 * @param {string|jQuery} nm Target name. If <i>prefix</i> is specified, prepend prefix automatically.
			 * @param {boolean} [v] Show / hide.
			 * @param {assoc} [opt=null] $.fn.viewing option.
			 * @returns {MicroUI}
			 *
			 * @see MicroUI#take
			 * @see jQuery.fn@motion#viewing
			 * @tutorial static-microui
			 *
			 * @example
			 * mui.view('name1', 123, opt);
			 */
			view: function(nm, v, opt){
				this.__take(nm).viewing(v, opt);

				return this;
			},

			/**
			 * Bind click by $.fn.clicked.
			 * @function
			 * @name click
			 * @memberof MicroUI
			 * @instance
			 * @param {string|jQuery} nm Target name. If <i>prefix</i> is specified, prepend prefix automatically.
			 * @param {function} fn Callback function.
			 * @param {boolean} [unbind=false] If true, not use <i>bind</i> method.
			 * @returns {MicroUI}
			 *
			 * @see MicroUI#take
			 * @see jQuery.fn@basic#clicked
			 * @tutorial static-microui
			 *
			 * @example
			 * mui.click('name1', function(){ ... });
			 * mui.click('name1', function(){ ... }, true);
			 */
			click: function(nm, fn, unbind){
				this.__take(nm).clicked(this.__bind(fn, unbind));

				return this;
			},

			/**
			 * Bind hover by $.fn.hover.
			 * @function
			 * @name hover
			 * @memberof MicroUI
			 * @instance
			 * @param {string|jQuery} nm Target name. If <i>prefix</i> is specified, prepend prefix automatically.
			 * @param {function} enter Hover in function.
			 * @param {function} leave Hover out function.
			 * @param {boolean} [unbind=false] If true, not use <i>bind</i> method.
			 * @returns {MicroUI}
			 *
			 * @see MicroUI#take
			 * @tutorial static-microui
			 *
			 * @example
			 * mui.hover('name1', function(){ ... }, function(){ ... });
			 * mui.hover('name1', function(){ ... });
			 */
			hover: function(nm, enter, leave, unbind){
				this.__take(nm).hover(this.__bind(enter, unbind), this.__bind(leave, unbind));

				return this;
			},

			/**
			 * Bind changing by $.fn.changing.
			 * @function
			 * @name change
			 * @memberof MicroUI
			 * @instance
			 * @param {string|jQuery} nm Target name. If <i>prefix</i> is specified, prepend prefix automatically.
			 * @param {function} fn Callback function.
			 * @param {boolean} [unbind=false] If true, not use <i>bind</i> method.
			 * @returns {MicroUI}
			 *
			 * @see MicroUI#take
			 * @see jQuery.fn@form#changing
			 * @tutorial static-microui
			 *
			 * @example
			 * mui.change('name1', function(){ ... });
			 * mui.change('name1', function(){ ... }, true);
			 */
			change: function(nm, fn, unbind){
				this.__take(nm).changing(this.__bind(fn, unbind));

				return this;
			},

			/**
			 * Bind event by $.fn.on.
			 * @function
			 * @name on
			 * @memberof MicroUI
			 * @instance
			 * @param {string|jQuery} nm Target name. If <i>prefix</i> is specified, prepend prefix automatically.
			 * @param {string} event Event.
			 * @param {function} fn Callback function.
			 * @param {boolean} [unbind=false] If true, not use <i>bind</i> method.
			 * @returns {MicroUI}
			 *
			 * @see MicroUI#take
			 * @see jQuery.fn#on
			 * @tutorial static-microui
			 *
			 * @example
			 * mui.on('name1', 'mouseover', function(){ ... });
			 * mui.on('name1', 'mouseover', function(){ ... }, true);
			 */
			on: function(nm, event, fn, unbind){
				this.__take(nm).on(event, this.__bind(fn, unbind));

				return this;
			},

			/**
			 * @ignore
			 */
			__bind: function(fn, b){
				return (b)?fn:this.bind(fn);
			},

			/**
			 * Take element by name with prefix. Provide auto-selector by <i>prefix</i> and <i>target</i>.
			 *
			 * <b>Specification</b><br>
			 * Internal use: <code>_prefix</code> <code>_targets</code>
			 *
			 * @function
			 * @name take
			 * @memberof MicroUI
			 * @instance
			 * @param {string} nm Element name.
			 * @param {string|function} type Target type. <b>Type</b> <code>'id'(default), 'form', 'class'</code>
			 * @returns {jQuery}
			 *
			 * @see MicroUI#prefix
			 * @see MicroUI#targets
			 * @tutorial static-microui
			 *
			 * @example
			 * mui.take('name1').append('ABC');
			 */
			take: function(nm, type){
				var t = this.name(nm);

				type = type || ((this._targets)?this._targets[nm]:null);

				if (type){
					switch (type){
					case 'form':
						return $('[name=' + t + ']');
						break;
					case 'class':
						return $('.' + t);
						break;
					//case 'id':
					default:
						break;
					}
				}

				return $(document.getElementById(t));
			},

			/**
			 * @ignore
			 */
			__take: function(nm, type){
				if (typeof nm === 'object'){
					return $(nm);
				}

				return this.take(nm , type);
			},

			/**
			 * Set to data and get from data. This method use <i>_data</i>. Require to initialize <i>_data</i> before using method.
			 *
			 * @function
			 * @name data
			 * @memberof MicroUI
			 * @instance
			 * @param {string} nm Element name.
			 * @returns {*}
			 *
			 * @see MicroUI#_data
			 * @tutorial static-microui
			 *
			 * @example
			 * v = mui.data('v1');
			 * mui.data('v1', 123);
			 */
			data: function(key, v){
				if (!this._data){
					console.error('_data is null.');
					return;
				}

				return any.data(this._data, key, v);
			},

			/**
			 * Load template.
			 * @function
			 * @name template
			 * @memberof MicroUI
			 * @instance
			 * @param {string} url Url.
			 * @returns {Promise}
			 *
			 * @see MicroUI#_data
			 * @tutorial static-microui
			 *
			 * @example
			 * mui.template('v1').done(function(v){ ... });
			 * ...
			 * _build: function(){ return this.template('template.htm'); }
			 * ...
			 */
			template: function(url){
				return $.ajax(url, {dataType: 'html'});
			}
		}, null, true);
	}

	if (construct || methods){
		return any.makeClass(construct, methods, MicroUI, false);
	}

	return MicroUI;
};

/**
 * jQuery.fn@basic methods.
 *
 * <b><i>Note! Not included in any-tiny.js.</i></b><br>
 *
 * | Method | Default ver | Tiny ver | Micro ver |
 * |:---|:---:|:---:|:---:|
 * | All methods | Yes | - | - |
 *
 * @namespace jQuery.fn@basic
 *
 * @tutorial fn-basic
 *
 * @example
 * //See tutorials.
 */

/**
 * @ignore
 */
function isEl(c){
	return (c instanceof jQuery || c instanceof HTMLElement);
}

/**
 * @ignore
 */
function hasEl(el, c){
	return (el.is(c) || el.find(c).length > 0);
}

/**
 * @ignore
 */
function cssSet(c,nm,v){
	if (c.css(nm) != v){
		c.css(nm, v);
	}

	return c;
}

/**
 * @ignore
 */
function ck(c){
	if (!c.length && any.define.targetExist){
		error('target none', c);
	}
}

/**
 * @ignore
 */
function cssLy(c, o){
	if (o.width){
		c.css('width', o.width + 'px');
	}

	if (o.height){
		c.css('height', o.height + 'px');
	}

	if (o.inline){
		c.css('display', 'inline-block');
	}

	if (o.opacity != null){
		c.css('opacity', o.opacity);
	}

	if (o.noselect){
		c.addClass('n-noselect');
	}
}

/**
 * @ignore
 */
function expMake(exp, v){
	var exs = exp.split(',');

	for (var i=0;i<exs.length;i++){
		exs[i] = exs[i] + v;
	}

	return exs.join(',');
}

/**
 * Previous first.
 * @function prevFirst
 * @memberof jQuery.fn@basic
 * @instance
 *
 * @param {string} exp Selector expression.
 * @returns {jQuery}
 *
 * @tutorial fn-basic
 * @tutorial demo-various
 * @example
 * target = $('#target').prevFirst('.abc');
 */
$.fn.prevFirst = function(exp){
	info('prevFirst', this);
	
	return $(this).prevAll(expMake(exp, ':first'));
};

/**
 * Next first.
 * @function nextFirst
 * @memberof jQuery.fn@basic
 * @instance
 *
 * @param {string} exp Selector expression.
 * @returns {jQuery}
 *
 * @tutorial fn-basic
 * @example
 * target = $('#target').nextFirst('.abc');
 */
$.fn.nextFirst = function(exp){
	info('nextFirst', this);

	return $(this).nextAll(expMake(exp, ':first'));
};

/**
 * Except specified element and it's children.
 * @function notAll
 * @memberof jQuery.fn@basic
 * @instance
 *
 * @param {Selector} el Element.
 * @returns {jQuery}
 *
 * @example
 * target = $('#target').notAll('.not');
 * target = $('#target').notAll(selector);
 */
$.fn.notAll = function(el){
	info('notAll', this);

	var c;

	return $(this).not(function(){
		if (c){
			if ($(c).find(this).length > 0){
				return true;
			}else{
				c = null;
			}
		}

		if ($(this).is(el)){
			c = this;
			return true;
		}

		return false;
	});
};

/**
 * @ignore
 */
function scopeEl(c){
	return function(el){
		return $(el, c);
	};
}

/**
 * Limit element scope. It's possible to limit within the influence of target element group by scope-function.
 * @function scope
 * @memberof jQuery.fn@basic
 * @instance
 *
 * @param {function} fn Function. <code>function($, args...)</code> '$' is scope-function.
 * @param {array|*} [vs] Arguments array or single value.
 * @param {assoc} [opt] Option.
 * @param {boolean} [opt.args=false] Determine to convert to scope-function from the element in arguments.
 * @returns {jQuery}
 *
 * @tutorial fn-basic
 * @example
 * //<div id="target1"> <span class="no1"></span> </div>
 * //<div id="target2"> <span class="no1"></span> </div>
 *
 * $('#target1').scope(function($){ $('.no1').text('123'); });
 * $('#target1').scope(function($1, $2){ $1('.no1').text('123'); $2('.no1').text('ABC'); }, $('#target2'));
 */
$.fn.scope = function(fn, vs, opt){
	ck(this);
	opt = ext({args: false}, opt);
	info('scope', this);

	vs = arrArg(vs);

	var p = scopeEl(this);

	if (opt.args){
		for (var i=0; i<vs.length;i++){
			if (isEl(vs[i])){
				vs[i] = scopeEl(vs[i]);
			}
		}
	}

	vs.unshift(p);

	fn.apply(this, vs);

	return this;
};

/**
 * Add element by type.
 * @function addBy
 * @memberof jQuery.fn@basic
 * @instance
 *
 * @param {Selector} ct Content.
 * @param {string} [type='append'] Add type.<br><b>Type</b> <code>before</code> <code>after</code> <code>prepend</code> <code>append</code> <code>fill</code>
 * @returns {jQuery}
 *
 * @tutorial fn-basic
 * @example
 * $('#target').addBy('<span>demo</span> ', 'append');
 * $('#target').addBy('<span>demo</span> ', 'prepend');
 * $('#target').addBy('<span>demo</span> ', 'fill');
 */
$.fn.addBy = function(ct, type){
	ck(this);
	info('addBy', this);

	switch(type){
	case 'before':
		$(this).before(ct);
		break;
	case 'after':
		$(this).after(ct);
		break;
	case 'prepend':
		$(this).prepend(ct);
		break;
	case 'append':
		$(this).append(ct);
		break;
	case 'fill':
		$(this).html(ct);
		break;
	default:
		if (typeof(type) === 'function'){
			type.call(this, ct);
		}else{
			$(this).append(ct);
		}

		break;
	}

	return this;
};

/**
 * Clone from source element and add to element.
 * @function addClone
 * @memberof jQuery.fn@basic
 * @instance
 *
 * @param {Selector} el Source element.
 * @param {assoc} [opt] Option.
 * @param {function} [opt.build=null] Function for changing new element after clone.
 * @param {string} [opt.add='append'] Add type.<br><b>Type</b> <code>before</code> <code>after</code> <code>prepend</code> <code>append</code> <code>fill</code>
 * @param {string} [opt.hide=false] Determine to hide new element.
 * @returns {jQuery}
 *
 * @see jQuery.fn@motion#cloneShow
 *
 * @tutorial fn-basic
 * @example
 * $('#dest').addClone('.src', function(){
 *	   $(this).text('Hello!');
 * });
 */
$.fn.addClone = function(el, opt){
	ck(this);
	opt = ext({build: null, add: 'append', hide: false, event: true}, opt);
	info('addClone', this);

	var c = $(el).clone(opt.event);

	if (opt.build && opt.build.call(c) === false){
		return null;
	}

	if (opt.hide){
		c.hide();
	}

	$(this).addBy(c, opt.add);

	return c;
};

/**
 * Check event bind.
 *
 * @function hasEvt
 * @memberof jQuery.fn@basic
 * @instance
 *
 * @param {string} [event=null] Event name.
 * @returns {boolean}
 *
 * @see $any.log.events
 *
 * @tutorial fn-basic
 * @example
 * v = $('#target').hasEvt();
 * v = $('#target').hasEvt('click');
 * v = $('#target').hasEvt('click mouseover');
 */
$.fn.hasEvt = function(event){
	ck(this);
	info('hasEvt', this);

	var r = false;

	if (event){
		event = event.toLocaleLowerCase();
	}

	$(this).each(function(i, c){
		var es = $._data(c).events;

		if (es){
			for(var k in es){
				if (es.hasOwnProperty(k) && (event == null || event.indexOf(k) != -1)){
					r = true;
					return false;
				}
			}
		}
	});

	return r;
};

/**
 * Default click event used by clicked.
 * @memberof $any.define
 * @type {string}
 * @default 'click'
 * @see jQuery.fn@basic#clicked
 */
any.define.click = 'click';

/**
 * Default unique bind state.
 * @memberof $any.define
 * @type {boolean}
 * @default true
 * @see jQuery.fn@basic#clicked
 * @see jQuery.fn@basic#upon
 */
any.define.unique = true;

/**
 * Click(bind), support 'prevent event' and Smartphone. By default,  it's restricted to unique bind.
 * @function clicked
 * @memberof jQuery.fn@basic
 * @instance
 *
 * @param {function} fn Function
 * @param {assoc} [opt] Option.
 * @param {boolean} [opt.unique=$any.define.unique] Restricted to unique bind. If exist event, occurs error. Prevent bloat and untidiness.
 * @param {string} [opt.event=$any.define.click] Event name. <br><code>click</code>(default)
 * @param {boolean|int} [opt.prevent=false] Prevent event mode. <br><br><b>true</b>: 'return false' mode.<br><b>1</b>: preventDefault mode.<br>
 * @param {assoc} [opt.data=null] Passed data. <code>e.data</code>
 * @returns {jQuery}
 *
 * @see $any.detectClick
 * @see $any.define.click
 * @see $any.define.unique
 * @see jQuery.fn@basic#upon
 *
 * @tutorial fn-basic
 * @example
 * $('#target').clicked(function(e){
 *	  $(this).html('Clicked!');
 * });
 * $('#target').clicked(null);
 * $('#target').clicked(null, {unique: false});
 * $('#target').clicked(null, {prevent: false});
 */
$.fn.clicked = function(fn, opt){
	ck(this);
	opt = ext({unique: any.define.unique, event: null, prevent: true, data: null}, opt);
	opt.event = opt.event || any.define.click;

	info('clicked', this);

	nolog();

	if (!opt.unique || !$(this).hasEvt(opt.event)){
		var f;

		if (opt.prevent){
			f = function(e){
				e.preventDefault();

				var r;

				if (fn){
					r = fn.call(this, e);
				}

				if (opt.prevent === true){
					return false;
				}

				return r;
			};
		}else{
			f = fn;
		}

		$(this).on(opt.event, opt.data, f);
	}else{
		error('unique bind', this);
	}

	relog();

	return this;
};

/**
 * @ignore
 */
function upnFn(fn, o, sh){
	sh.n = 0;

	return function(e){
		var r;

		if (o.once){
			$(this).off(e);
			info('upon: off', this);
		}

		sh.state = 1;

		if (o.binding){
			o.binding.call(e.currentTarget, e);
		}

		setTimeout(function(){
			sh.n++;

			var vs = {namespace: e.handleObj.namespace};

			if (!sh.disable && sh.state === 1){
				r = fn.call(e.currentTarget, e, vs, sh);
			}

			sh.state = 2;

			e = null;
		}, o.delay);

		if (o.prevent > 0){
			e.preventDefault();

			if (o.prevent === true){
				return false;
			}
		}

		return r;
	};
}

/**
 * @ignore
 */
function upnOn(c, e, f, d, o, sh){
	if (!o.unique || !c.hasEvt(e)){
		c.on(e, d, upnFn(f, o, sh));
	}else{
		error('unique bind', c, e);
	}
}

/**
 * Bind event with various option(delay, prevent, data...). By default,  it's restricted to unique bind. By using shared, to make it possible to "disable or enable" event, and change "state".
 *
 * <b>Specification</b><br>
 * Internal use: <code>$.fn.on</code>
 *
 * @function upon
 * @memberof jQuery.fn@basic
 * @instance
 *
 * @param {string|array|assoc} event Event or events assoc. <br><b>string</b> <code>'event'</code>, <code>'event1 event2'</code><br><b>array</b> <code>['event1', 'event2']</code><br><b>assoc</b> <code>&lt;string, function&gt;, &lt;string, boolean(true)&gt;, &lt;string, integer(delay)&gt;</code>
 * @param {function} fn Handler function. <br><code>function(e:event, vs:assoc<namespace: string, n:integer>, sh:assoc){ }</code>
 * @param {assoc} [opt] Option.
 * @param {string} [opt.name=null] Custom event name.
 * @param {boolean} [opt.unique=$any.define.unique] Restricted to unique bind. If exist event, occurs error. Prevent bloat and untidiness.
 * @param {boolean} [opt.once=false] Only run once.
 * @param {boolean|int} [opt.prevent=false] Prevent event mode. <br><br><b>true</b>: 'return false' mode.<br><b>1</b>: preventDefault mode.<br>
 * @param {integer} [opt.delay=null] Delay milliseconds.
 * @param {assoc} [opt.data=null] Passed data. <code>e.data</code>
 * @param {function} [opt.binding=null] Calls when the event occurs.
 * @param {assoc|null} [sh=null] Shared object. <code>{disable: false, state: 0, n: 0}</code>
 * @param {boolean} [sh.disable=false] Disable event.<br><br><b>true</b>: disable.<br><b>false</b>: enable.<br>
 * @param {integer} [sh.state=0] State, handler's run state.<br><br><b>0</b>: Initial state.<br><b>1</b>: Before run. <u>Runnable state.</u><br><b>2</b>: After run.<br>
 * @param {integer} [sh.n=0] Run count.
 * @returns {jQuery}
 *
 * @see $any.define.unique
 *
 * @tutorial fn-basic
 * @example
 * $('#target').upon('click', function(e){ }, {delay: 1000});
 * $('#target').upon('click', function(e){ }, {unique: false});
 * $('#target').upon('click mouseleave', function(e){ });
 * $('#target').upon(['click', 'mouseleave'], function(e){ });
 * $('#target').upon({mouseenter: function(e){ }, mouseleave: function(e){ }}, null, {delay: 1000, data: [1,2,3]});
 * $('#target').upon({mouseenter: true, mouseleave: true}, function(e){ }, {delay: 1000});
 * $('#target').upon({click: true, mouseleave: 1000}, function(e){ });
 * $('#target').upon('click', function(e){ }, null, sh);
 */
$.fn.upon = function(event, fn, opt, sh){
	ck(this);
	opt = ext({name: null, unique: any.define.unique, once: false, prevent: false, delay: null, data: null, binding: null}, opt);
	info('upon', this);

	sh = sh || {disable: false, state: 0, n:0};

	nolog();

	if (typeof fn === 'function' || fn == null){
		if (event instanceof Array){
			event = event.join(' ');
		}

		if (typeof event === 'string'){
			if (opt.name && fn){
				event += ' ' + opt.name;
			}

			upnOn($(this), event, fn, opt.data, opt, sh);
		}else{
			event = event || {};

			if (opt.name && fn){
				event[opt.name] = opt.delay || true;
			}

			any.each(event, function(ev, v){
				var o = opt;

				if (typeof v !== 'function'){
					if (v === true){
						v = fn;
					}else if (v === false){
						return;
					}else if (typeof v === 'number'){
						o = ext({}, opt);
						o.delay = v;
						v = fn;
					}
				}

				upnOn($(this), ev, v, o.data, o, sh);
			}, this);
		}
	}else{
		error('required function', this, event);
	}

	relog();

	return this;
};

/**
 * Clickout event. Event occurs if click outer-element.
 *
 * <b>Specification</b><br>
 * "return false" release event handle.
 *
 * @event clickout
 * @memberof jQuery.fn@basic
 *
 * @param {assoc} [opt] Option.
 * @param {string} [opt.event='click'] Handle event.
 *
 * @see jQuery.fn@basic#clickOut
 *
 * @tutorial fn-basic
 * @example
 * $('#target').on('clickout', function(e){ });
 * $('#target').on('clickout', function(e){ return true; });	//release event.
 * $('#target').on('clickout', {event: 'mouseenter'}, function(e){ });
 * $('#target').off('clickout');
 * $('#target').trigger('clickout');
 */
$.event.special.clickout = {
	add: function(hd){
		var d = hd.data, q = (!d || !d.event)?'click':d.event +'.clickout', tf = hd.handler, c = this;

		function fn(e){
			if (c !== e.target && !$.contains(c, e.target) || e.type === 'clickout'){
				var ev = $.Event('clickout');
				ev.currentTarget = c;
				ev.data = d;

				if (tf.call(c, ev) === true){
					if (e.type !== 'clickout'){
						hd.bd = e;
					}
					$(c).off('clickout');
				}
			}
		}

		hd.bd = q;
		hd.handler = fn;

		$(document).on(q, fn);
	},
	remove: function(hd){
		$(document).off(hd.bd);
	}
};

/**
 * Bind click outer element using clickout event. This is one-time event in default option.
 * @function clickOut
 * @memberof jQuery.fn@basic
 * @instance
 *
 * @param {function} fn Bind function. If null, unbind event.
 * @param {assoc} [opt] Option.
 * @param {string} [opt.event=$any.define.click] Bind event name.
 * @param {string} [opt.once=true] Determine to release this trigger if click at one-time.
 * @returns {jQuery}
 *
 * @see $any.define.click
 * @see {@link event:clickout}
 *
 * @tutorial fn-basic
 * @example
 * $('#target').clickOut(function(){
 *  alert('click!');
 * });
 * $('#target').clickOut(function(){
 *  alert('click!');
 * }, {event: 'mousedown'});
 * $('#target').clickOut(null);
 */
$.fn.clickOut = function(fn, opt){
	ck(this);
	info('clickOut', this);

	if (typeof fn === 'function'){
		opt = ext({data:null, event: any.define.click, once: true}, opt);

		$(this).on('clickout', {event: opt.event}, function(e){
			var r = fn.call(this, e, opt.data);

			if(opt.once || r === true){
				return true;
			}
		});
	}else{
		if (fn === true){
			$(this).trigger('clickout');
		}else if (fn === null){
			$(this).off('clickout');

			info('clickOut: off', this);
		}
	}

	return this;
};

/**
 * Bind event and trigger, dispatch event to target element if event occurs.
 *
 * <b>Specification</b><br>
 * Internal use: <code>$.fn.upon</code> <code>$.fn.clicked</code>
 *
 * @function bindTrigger
 * @memberof jQuery.fn@basic
 * @instance
 *
 * @param {Selector} el Target element.
 * @param {string} [event] Dispatched event.
 * @param {array} [vs] Pass parameters.
 * @param {assoc} [opt] Option.
 * @param {string} [opt.event=null] Bind event.<br><br><b>Default(null)</b>: use $.fn.clicked.
 * @param {boolean|int} [opt.prevent=false] Prevent event mode. <br><br><b>true</b>: 'return false' mode.<br><b>1</b>: preventDefault mode.<br>
 * @returns {jQuery}
 *
 * @see jQuery.fn@basic#upon
 * @see jQuery.fn@basic#clicked
 *
 * @tutorial fn-basic
 * @tutorial fn-motion
 * @tutorial demo-various
 *
 * @example
 * $('#click').bindTrigger('#target', 'mousedown');
 * $('#click').bindTrigger('#target', 'mouseenter', ['A', 'B', 'C']);
 * $('#mouseenter').bindTrigger('#target', 'customevent', null, {event: 'mouseenter'});
 */
$.fn.bindTrigger = function(el, event, vs, opt){
	ck(this);
	opt = ext({event: null, prevent: true}, opt);
	info('bindTrigger', this);

	vs = vs || null;

	if (!opt.event){
		$(this).clicked(function(){
			$(el).trigger(event, vs);
		}, opt);
	}else{
		$(this).upon(opt.event, function(){
			$(el).trigger(event, vs);
		}, opt);
	}

	return this;
};

/**
 * Swap the element and return original element. Apply to only first element.<br>Note: $.fn.replaceWith can't keep event bind.
 * @function swapBy
 * @memberof jQuery.fn@basic
 * @instance
 *
 * @param {Selector} el Element.
 * @returns {jQuery}
 *
 * @example
 * target = $('#target1').swapBy('#target2');
 */
$.fn.swapBy = function(el){
	ck(this);
	info('swapBy', this);

	return $(this).first().after($(el).first()).detach();
};

/**
 * Switch and apply to the match and not-match.
 * @function pickBy
 * @memberof jQuery.fn@basic
 * @instance
 *
 * @param {Selector} el Picked element or selector.
 * @param {function} dofn Function to apply the match - 'elem'.
 * @param {function} notfn Function to apply element which is not matched.
 * @returns {jQuery}
 *
 * @see jQuery.fn@basic#pickClass
 * @see jQuery.fn@motion#picking
 *
 * @tutorial fn-basic
 * @example
 * $('#target .item').pickBy('.a', function(){ $(this).showing(); }, function(){ $(this).hiding(); } );
 */
$.fn.pickBy = function(el, dofn, notfn){
	ck(this);
	info('pickBy', this);

	$(this).not(el).each(notfn);
	$(this).filter(el).each(dofn);

	return this;
};

/**
 * Swap class.
 * @function swapClass
 * @memberof jQuery.fn@basic
 * @instance
 *
 * @param {string} org Original CSS class name.
 * @param {string} rep New CSS class name.
 * @param {boolean} {bool=true} Direction.
 * @returns {jQuery}
 *
 * @tutorial fn-basic
 * @example
 * $('#target').swapClass('org', 'swp');
 * $('#target').swapClass('org', 'swp', false);
 */
$.fn.swapClass = function(org, rep, bool){
	ck(this);
	info('swapClass', this);

	if (bool === false){
		var t=rep;rep=org;org=t;
	}

	return $(this).removeClass(org).addClass(rep);
};

/**
 * Switch css class. Adding the class to the match and remove the class from not-match.
 * @function pickClass
 * @memberof jQuery.fn@basic
 * @instance
 *
 * @param {string} el Picked element.
 * @param {string} css class name.
 * @returns {jQuery}
 *
 * @see jQuery.fn@basic#pickClass
 * @see jQuery.fn@motion#picking
 *
 * @tutorial fn-basic
 * @example
 * $('#target .item').pickClass('.target', 'active');
 */
$.fn.pickClass = function(el, css){
	ck(this);
	info('pickClass', this);

	$(this).not(el).removeClass(css);
	$(this).filter(el).addClass(css);

	return this;
};

/**
 * jQuery.fn@form methods.
 *
 * <b><i>Note! Not included in any-tiny.js.</i></b><br>
 *
 * | Method | Default ver | Tiny ver | Micro ver |
 * |:---|:---:|:---:|:---:|
 * | All methods | Yes | - | - |
 *
 * @namespace jQuery.fn@form
 *
 * @tutorial fn-form
 * @tutorial fn-form-serialize
 *
 * @example
 * //See tutorials.
 */

/**
 * Get and set disable status.
 * @function disabled
 * @memberof jQuery.fn@form
 * @instance
 *
 * @param {boolean} [v]
 * @returns {jQuery}
 *
 * @tutorial fn-form
 * @example
 * var v = $('#target').disabled();
 * $('#target').disabled(true);
 */
$.fn.disabled = function(v){
	ck(this);
	info('disabled', this);

	if (v === undefined){
		return $(this).prop('disabled');
	}

	return $(this).prop('disabled', v);
};

/**
 * @ignore
 */
function atrArg(prefer, arg, atr){
	if (atr != null){
		atr = parseInt(atr);
	}

	return (prefer && atr != null || !prefer && arg == null)?atr:arg;
}

/**
 * Check-box value enum for $.fn.checked.
 * @memberof jQuery.fn@form
 * @readonly
 * @enum {integer}
 */
any.check = {
	/** Boolean */
	bool: 0,
	/** String */
	val: 1,
	/** Array */
	arr: 2
};

/**
 * Radiobutton value enum for $.fn.checked.
 * @memberof jQuery.fn@form
 * @readonly
 * @enum {integer}
 */
any.radio = {
	/** Boolean */
	bool: 0,
	/** String */
	val: 1
};

/**
 * Get and set checkbox and Radio-button.
 * @function checked
 * @memberof jQuery.fn@form
 * @instance
 *
 * @param {string|number|array} [v] Get value if v is null.<br>Set value if v is not null.
 * @param {integer} [type=$any.check.arr|$any.radio.val] Check type<br><br><b>[Default(null)]</b><br><b>Checkbox</b> $any.check.arr<br><b>Radiobutton</b> $any.radio.val
 * @param {boolean} [preferAttr=false] Priority to either "Method parameter" or "Element attribute". <br><br><b>Parameter</b> 'type' option. <br><b>Attribute</b> 'data-type'.
 * @returns {jQuery}
 *
 * @tutorial fn-form
 * @example
 * v = $('#target').checked();
 * $('#target').checked('a');
 * $('#target').checked(['a', 'b']);
 */
$.fn.checked = function(v, type, preferAttr){
	ck(this);
	info('checked', this);

	var r;

	type = atrArg(preferAttr, type, $(this).data('type'));

	switch($(this).prop('type')){
	case 'radio':
		if (v == null){
			v = $(this).filter(':checked').val();

			if (type == any.radio.bool){
				r = (v == null)?false:true;
				break;
			}else{
				r = (v === undefined)?null:v;
				break;
			}
		}else{
			if (type == any.radio.bool){
				return $(this).prop('checked', v);
			}else{
				v = (typeof v === 'object')?v:[v];
				return $(this).val([v]);
			}
		}
		break;
	case 'checkbox':
		if (v == null){
			v = $(this).filter(':checked').map(function(){
				return $(this).val();
			}).get();

			switch(type){
			case any.check.val:
				r = (v.length != 0)?v[0]:null;
				break;
			case any.check.bool:
				r = (v.length != 0)?true:false;
				break;
			case any.check.arr:
			default:
				r = v;
				break;
			}
		}else{
			if (type == any.check.bool){
				return $(this).prop('checked', v);
			} else {
				v = (typeof v === 'object')?v:[v];
				return $(this).val(v);
			}
		}

		break;
	default:
		break;
	}

	return r;
};

/**
 * Get and set Select-box.
 * @function selected
 * @memberof jQuery.fn@form
 * @instance
 *
 * @param {string|number} [v] Get value if v is null.<br>Set value if v is not null.
 * @param {boolean} [isLabel] Set by label value.
 * @param {boolean} [preferAttr=false] Priority to either "Method parameter" or "Element attribute". <br><br><b>Parameter</b> 'selectLabel' option. <br><b>Attribute</b> 'data-label'.
 * @returns {jQuery}
 *
 * @tutorial fn-form
 * @example
 * v = $('#target').selected(); 				//Get slected value.
 * v = $('#target').selected(null, true); //Get selected label value.
 * $('#target').selected(1);				//Set value.
 * $('#target').selected(1, true);		//Set label value.
 */
$.fn.selected = function(v, isLabel, preferAttr){
	ck(this);
	info('selected', this);

	var r;

	isLabel = atrArg(preferAttr, isLabel, $(this).data('label'));

	if (!isLabel){
		if (v == null){
			r = $(this).val();
		} else {
			return $(this).val(v);
		}
	} else {
		var multiple = $(this).prop('multiple');

		if (v == null){
			var sel = $('option:selected', this);
			if (multiple){
				r = sel.map(function(){
					return $(this).text();
				}).get();
			} else {
				r = sel.text();
			}
		} else {
			var opts = $('option', this);
			opts.prop('selected', false);

			if (multiple && v instanceof Array){
				opts.filter(function(){
					return (v.indexOf($(this).text()) != -1)?true:false;
				}).prop('selected', true);
			} else {
				opts.filter(function(){
					return ($(this).text() == v)?true:false;
				}).prop('selected', true);
			}

			return this;
		}
	}

	return r;
};

/**
 * Data name for $.fn.dataval.
 *
 * Data attribute name. - "data-*".
 * @memberof $any.define
 * @type {string}
 * @default 'val'
 * @see jQuery.fn@form#dataval
 */
any.define.dataval = 'val';

/**
 * Get and set data value.
 *
 * __Define__<br>
 * $any.define.dataval = 'val'
 *
 * @function dataval
 * @memberof jQuery.fn@form
 * @instance
 *
 * @param {string|number} [v] Get value if v is null.<br>Set value if v is not null.
 * @returns {jQuery}
 *
 * @see $any.define.dataval
 * @tutorial fn-form
 * @example
 * v = $('#target').dataval();
 * $('#target').dataval(v);
 */
$.fn.dataval = function(v){
	ck(this);
	info('dataval', this);

	if (v == null){
		return $(this).data(any.define.dataval);
	}

	return $(this).data(any.define.dataval, v);
};

/**
 * @ignore
 */
function vlFrm(c, v){
	if (v == null){
		return c.val();
	} else {
		c.val(v);
	}

	return c;
}

/**
 * @ignore
 */
function vlInr(c, v, isHtml){
	if (isHtml){
		if (v == null){
			return c.html();
		}else{
			c.html(v);
		}
	}else{
		if (c.children().length == 0){
			if (v == null){
				return c.text();
			}else{
				c.text(v);
			}
		}else{
			error('children exist', c);

			if (v == null){
				return null;
			}
		}
	}

	return c;
}

/**
 * Get and set value to element automatically.
 * @function valex
 * @memberof jQuery.fn@form
 * @instance
 *
 * @param {string|number|array} [v] Get value if v is null.<br>Set value if v is not null.
 * @param {assoc} [opt] Option.
 * @param {integer} [opt.checkType=null] Check value type. See $.fn.checked type.
 * @param {integer} [opt.radioType=null] Radio value type. See $.fn.checked type.
 * @param {boolean} [opt.selectLabel=null] Select label value mode. See $.fn.selected selectLabel.
 * @param {boolean} [opt.preferAttr=false] Priority to either "Method parameter" or "Element attribute". <br>See $.fn.selected, $.fn.checked preferAttr.
 * @param {boolean} [opt.data=false] Enable $.fn.dataval - div, span, other tags.
 * @param {boolean} [opt.html=true] Enable $.fn.html - div, span, other tags.
 *
 * @returns {*|jQuery}
 *
 * @tutorial fn-form
 * @example
 * v = $('#target').valex();   //Get value
 * v = $('#target').valex(null, {preferAttr: true, html: false});   //Get value with option.
 * $('#target').valex(1);       //Set value
 * $('#target').valex(1, {preferAttr: true, html: false});            //Set value with option.
 */
$.fn.valex = function(v, opt){
	ck(this);
	info('valex', this);

	opt = opt || {checkType: null, radioType: null, selectLabel: null, preferAttr: false, data: false, html: true};

	var r = this, c = $(this);

	switch((c.prop('tagName') || '').toLowerCase()){
	case 'input':
		var type = (c.prop('type') || '').toLowerCase();

		switch(type){
		case 'radio':
			r = c.checked(v, opt.radioType, opt.preferAttr);
			break;
		case 'checkbox':
			r = c.checked(v, opt.checkType, opt.preferAttr);
			break;
		case 'submit':
		case 'reset':
		case 'button':
			if (opt.data){
				r = c.dataval(v);
			}else{
				r = vlFrm(c, v);
			}

			break;
		case 'text':
		default:
			r = vlFrm(c, v);

			break;
		}

		break;
	case 'select':
		r = c.selected(v, opt.selectLabel, opt.preferAttr);
		break;
	case 'textarea':
		r = vlFrm(c, v);

		break;
	case 'div':
	case 'span':
	default:
		if (opt.data){
			r = c.dataval(v);
		}else{
			r = vlInr(c, v, opt.html);
		}

		break;
	}

	c = null;

	return r;
};

/**
 * Get value to element automatically. $.fn.valex alias.
 * @function valget
 * @memberof jQuery.fn@form
 * @instance
 *
 * @param {assoc} [opt] $.fn.valex option.
 * @returns {*}
 *
 * @tutorial fn-form
 * @example
 * v = $('#target').valget();
 * v = $('#target').valget({checkType: $any.check.val, preferAttr: true});
 * v = $('#target').valget({html: false});
 */
$.fn.valget = function(opt){
	info('valget', this);

	return $(this).valex(null, opt);
};

/**
 * Set value to element automatically. $.fn.valex alias.
 * @function valset
 * @memberof jQuery.fn@form
 * @instance
 *
 * @param {string|number|array} [v] Value.
 * @param {assoc} [opt] $.fn.valex option.
 * @returns {jQuery}
 *
 * @tutorial fn-form
 * @example
 * v = $('#target').valset('A');
 * v = $('#target').valset(1, {checkType: $any.check.val, preferAttr: true});
 * v = $('#target').valset('A', {html: false});
 */
$.fn.valset = function(v, opt){
	v = (v == null)?'':v;

	info('valset', this);

	return $(this).valex(v, opt);
};

/**
 * Bind changing for input,textarea,select. Event occurs if value is different.
 *
 * <b>Specification</b><br>
 * Internal use: <code>$.fn.change</code>
 *
 * @function changing
 * @memberof jQuery.fn@form
 * @instance
 *
 * @param {function} fn Bind function. <code>function(e:event, v:*){ ... }</code>
 * @param {assoc} [opt] Option.
 * @param {boolean} [opt.init=true] Trigger 'change event' after binding.
 * @param {boolean} [opt.v=null] Set initial value by using $.fn.valex.
 * @param {integer} [opt.buffer=null] Buffer-time ms. Wait buffer-time after input. Then the event occurs. Only for text,textarea. <code>minimum: 50</code>
 * @param {assoc} [opt.data=null] Passed event data.
 * @param {assoc} [opt.valex=null] If not null, use $.fn.valex with valex option.
 * @returns {jQuery}
 *
 * @see jQuery.fn@form#valex
 *
 * @tutorial fn-form
 * @example
 * $('#target').changing(function(){ ... });
 * $('.chg').changing(function(e, v){ ... });
 * $('#target').changing(function(e, v){ ... }, {buffer: 500});
 */
$.fn.changing = function(fn, opt){
	ck(this);
	info('changing', this);

	opt = ext({v:null, init: true, buffer: null, data: null, valex: null}, opt, true);

	var gs = {};

	$(this).each(function(){
		var c = $(this), g = null, tm, t;

		if (c.is(':text,textarea')){
			var fb = function(e){
				var v = c.val();
				t = any.crc16(v);

				if (g !== t){
					g = t;
					fn.call(c, e, v);
				}
			}, fc;

			if (opt.buffer > 0){
				fc = function(e){
					tm = Date.now();
				};
				setInterval(function(){
					t = Date.now();
					if  ((t - tm) > opt.buffer){
						fb(null);
						tm = t;
					}
				}, 50);
			}else{
				fc = fb;
			}

			c.on('keydown keyup keypress click input dragend touchend cut paste', opt.data, fc).change(opt.data, fc);
		} else if (c.is(':input')){
			var nm = null, tp = (c.prop('type') || '').toLowerCase();

			c.change(opt.data, function(e){
				var v;

				if (opt.valex){
					v = c.valex(null, opt.valex);
				}else{
					v = c.val();
				}

				if (tp === 'radio'){
					if (!c.prop('checked')){
						return;
					}

					nm = c.attr('name');
				}else if (tp === 'checkbox'){
					v = (c.prop('checked'))?String(v):null;
				}

				t = any.crc16(v);
				if (!nm){
					if (g !== t){
						g = t;
						fn.call(c, e, v);
					}
				}else {
					if(gs[nm] !== t){
						gs[nm] = t;
						fn.call(c, e, v);
					}
				}
			});
		}

		if (opt.v !== null){
			c.valex(opt.v, opt.valex);
		}
	});

	if (opt.init){
		$(this).trigger('change');
	}

	return this;
};

/**
 * Defines for $.fn.serializeAssoc.
 * @memberof jQuery.fn@form
 * @type {assoc}
 * @default { data: 'name' }
 * @see jQuery.fn@form#serializeAssoc
 * @see jQuery.fn@form#assignAssoc
 */
any.define.serialize = {
	data: 'name'
};

/**
 * @ignore
 */
function ascOpt(mode, o){
	o = ext({
		find: '*', findAdd: null, not: null,
		naming: {name: true, id: true, 'class': false, data: true}, prefix: '',
		valex: {checkType: null, radioType: null, selectLabel: null, preferAttr: false, data: false, html: false},
		empty: ''
	}, o, true);

	switch(mode){
	case 'name':
		o.find = ':input';
		o.naming = 'name';
		o._asn = function(nm){return '[name="' + nm + '"]';};
		break;
	case 'id':
		o.find = 'span,div,:input';
		o.naming = 'id';
		o._asn = function(nm){return '#' + nm;};
		break;
	case 'class':
		o.find = 'span,div,:input';
		o.naming = 'class';
		o._asn = function(nm){return '.' + nm;};
		break;
	case 'data':
		o.find = '[data-'+any.define.serialize.data+']';
		o.naming = 'data';
		o._asn = function(nm){return '[data-'+any.define.serialize.data+'="' + nm + '"]';};
		break;
	default:
		break;
	}

	if (typeof o.naming === 'string'){
		var v = {};

		switch (o.naming){
		case 'name':
			v.name = 1;
			break;
		case 'id':
			v.id = 1;
			break;
		case 'class':
			v['class'] = 1;
			break;
		case 'data':
			v.data = 1;
			break;
		}

		o.naming = v;
	}

	return o;
}

/**
 * @ignore
 */
function ascTgt(c, o){
	var cs, find = [], v;

	if (o.find){
		if (o.find.toLowerCase() === 'all'){
			v = '*';
		}else{
			v = o.find;
		}
	}else{
		v = ':input';
	}

	find.push(v);

	if (o.findAdd){
		find.push(o.findAdd);
	}

	find = find.join(',');

	cs = $(find, c);

	if (o.not){
		cs = cs.notAll(o.not);
	}

	return cs;
}

/**
 * @ignore
 */
function ascCls(c){
	var cls = c.attr('class');

	if (cls){
		return cls.split(' ')[0];
	}

	return null;
}

/**
 * Serialize form values to assoc with option.
 *
 * <b>Specification</b><br>
 * Internal use: <code>$.fn.valex</code>
 *
 * __Define__<br>
 * $any.define.serialize
 *
 * __Default selector__<br>
 * <code>:input(input, select, textarea)</code>
 *
 * __Default naming(attribute)__<br>
 * <code>name, id, data-name</code>
 *
 * @function serializeAssoc
 * @memberof jQuery.fn@form
 * @instance
 *
 * @param {string} [mode=null] Automatic mode. <code>name, id, class, data</code>  If specified, 'find' / 'naming' are ignored.
 * @param {assoc} [opt] Option.
 * @param {string} [opt.find=':input'] Selector. default(':input') is 'input, select, textarea'.<br><br><b>values</b><br><code>'all'</code>: All elements, it's '*'.<br><code>null</code>: ':input'<br>
 * @param {string} [opt.findAdd=null] Add selector.
 * @param {string} [opt.not=null] Except selector, using $.fn.notAll.
 * @param {assoc|string} [opt.naming] Naming option. assoc or string.<br><br><b>assoc</b> Enable to specify in detail.<br><b>string</b> Only mode. values: <code>'name', 'id', 'class', 'data'</code>
 * @param {boolean} [opt.naming.name=true] Use name attribute in naming.
 * @param {boolean} [opt.naming.id=true] Use id attribute in naming.
 * @param {boolean} [opt.naming.data=true] Use data attribute in naming. - $any.define.serialize.data(data-name)
 * @param {boolean} [opt.naming.class=false] Use class in naming.
 * @param {string} [opt.prefix=''] Prefix of name(element). Except prefix string from name. If specified, exclude the no prefix name.
 * @param {assoc} [opt.valex] $.fn.valex option.
 * @param {*} [opt.empty=''] Default value if value is null.
 * @returns {assoc}
 *
 * @see $any.define.serialize
 * @see jQuery.fn@form#valex
 * @see jQuery.fn@basic#notAll
 *
 * @tutorial fn-form-serialize
 * @example
 * //Return format example.
 * Object {
 *  key1 : value,
 *  key2 : [1,2,3...],
 *  ....
 * }
 *
 * @example
 * vs = $('#target').serializeAssoc();
 * vs = $('#target').serializeAssoc('name');
 * vs = $('#target').serializeAssoc('class');
 * vs = $('#target').serializeAssoc(null, {find: 'all'});
 * vs = $('#target').serializeAssoc(null, {findAdd: '.serialize'});
 * vs = $('#target').serializeAssoc(null, {find: '*', not: '.not'});
 * vs = $('#target').serializeAssoc(null, {naming: 'id'});
 * vs = $('#target').serializeAssoc(null, {naming: {'class': true}});
 * vs = $('#target').serializeAssoc('id', {prefix: 'prefix_'});
 */
$.fn.serializeAssoc = function(mode, opt){
	ck(this);
	info('serializeAssoc', this);

	opt = ascOpt(mode, opt);
	var r = {}, c, cs = ascTgt(this, opt), nm, v;

	nolog();

	var rx = (opt.prefix)?new RegExp('^' + opt.prefix):null;

	cs.each(function(){
		nm = null; c = $(this);

		if (opt.naming.data){
			nm = c.data(any.define.serialize.data);
		}

		if (!nm && opt.naming.name){
			nm = c.prop('name');
		}

		if (!nm && opt.naming.id){
			nm = c.prop('id');
		}

		if (!nm && opt.naming['class']){
			nm = ascCls(c);
		}

		if (!nm){
			return;
		}

		if (opt.prefix){
			if (!nm.match(rx)){
				return;
			}
			nm = nm.replace(rx, '');
		}

		v = c.valex(null, opt.valex);

		if (c.is('input:checkbox')){
			if (v instanceof Array){
				var tv = (r[nm])?r[nm]:[];
				v = (v == null)?[]:v;

				v = $.merge(tv, v);
			}
		}

		if (v != null){
			r[nm] = v;
		} else if (r[nm] === undefined){
			r[nm] = opt.empty;
		}
	});

	relog();

	return r;
};

/**
 * @ignore
 */
function aaSet(c, vs, nm, rx, o){
	if (nm){
		if (o.prefix){
			if (!nm.match(rx)){
				return;
			}
			nm = nm.replace(rx, '');
		}

		if (vs[nm] !== undefined){
			c.valset(vs[nm], o.valex);

			return true;
		}
	}

	return false;
}

/**
 * Apply assoc to form values with option.
 *
 * <b>Specification</b><br>
 * Internal use: <code>$.fn.valex</code>
 *
 * @function assignAssoc
 * @memberof jQuery.fn@form
 * @instance
 *
 * @param {assoc} vs Values.
 * @param {string} [mode=null] Automatic mode. <code>name, id, class, data</code> If specified, looping values and set directly. 'find' / 'findAdd' / 'not' are ignored.
 * @param {assoc} [opt] Option.
 * @param {string} [opt.find=':input'] Selector. default(':input') is 'input, select, textarea'.<br><br><b>values</b><br><code>'all'</code>: All elements, it's '*'.<br><code>null</code>: ':input'<br>
 * @param {string} [opt.findAdd=null] Add selector.
 * @param {string} [opt.not=null] Except selector, using $.fn.notAll.
 * @param {assoc|string} [opt.naming] Naming option. assoc or string.<br><br><b>assoc</b> Enable to specify in detail.<br><b>string</b> Only mode. values: <code>'name', 'id', 'class', 'data'</code>
 * @param {boolean} [opt.naming.name=true] Use name attribute in naming.
 * @param {boolean} [opt.naming.id=true] Use id attribute in naming.
 * @param {boolean} [opt.naming.data=true] Use data attribute in naming. - $any.define.serialize.data(data-name)
 * @param {boolean} [opt.naming.class=false] Use class in naming.
 * @param {string} [opt.prefix=''] Prefix of name(element). Append prefix to name.
 * @param {assoc} [opt.valex] $.fn.valex option.
 * @returns {jQuery}
 *
 * @see $any.define.serialize
 * @see jQuery.fn@form#valex
 * @see jQuery.fn@basic#notAll
 *
 * @tutorial fn-form-serialize
 *
 * @example
 * $('#target').assignAssoc(null, {a:1, b:2, c:3});
 * $('#target').assignAssoc(vs, 'name');
 * $('#target').assignAssoc(vs, 'class');
 * $('#target').assignAssoc(vs, null, {find: 'all'});
 * $('#target').assignAssoc(vs, null, {findAdd: '.serialize'});
 * $('#target').assignAssoc(vs, null, {find: '*', not: '.not'});
 * $('#target').assignAssoc(vs, null, {naming: 'class'});
 * $('#target').assignAssoc(vs, null, {naming: {'class': true}});
 * $('#target').assignAssoc(vs, 'id', {naming: {prefix: 'prefix_'}});
 */
$.fn.assignAssoc = function(vs, mode, opt){
	ck(this);
	info('assignAssoc', this);

	opt = ascOpt(mode, opt);
	var cs;

	nolog();

	var rx = (opt.prefix)?new RegExp('^' + opt.prefix):null;

	if (opt._asn){
		cs = $(this);

		any.each(vs, function(nm, v){
			cs.find(opt._asn(opt.prefix + nm)).valset(v, opt.valex);
		});
	}else{
		cs = ascTgt(this, opt);

		cs.each(function(){
			var c = $(this);

			if (opt.naming.data && aaSet(c, vs, c.data(any.define.serialize.data), rx, opt)){
				return;
			}

			if (opt.naming.name && aaSet(c, vs, c.prop('name'), rx, opt)){
				return;
			}

			if (opt.naming.id && aaSet(c, vs, c.prop('id'), rx, opt)){
				return;
			}

			if (opt.naming['class'] && aaSet(c, vs, ascCls(c), rx, opt)){
				return;
			}
		});
	}

	relog();

	return this;
};

/**
 * jQuery.fn@motion methods.
 *
 * <b><i>Note! Not included in any-tiny.js.</i></b><br>
 *
 * | Method | Default ver | Tiny ver | Micro ver |
 * |:---|:---:|:---:|:---:|
 * | All methods | Yes | - | - |
 *
 * @namespace jQuery.fn@motion
 *
 * @see $any.motion
 * @see $any.profile
 *
 * @tutorial fn-motion
 * @tutorial fn-motion-effect
 * @tutorial demo-ui
 * @tutorial demo-various
 *
 * @example
 * //See tutorials.
 */

/**
 * @ignore
 */
function mtnRun(c, sw, force){
	var anm = c.filter(':animated').length;

	if (!force || (!any.motion.hidden(c) + sw) != 1){
		return (anm)?false:true;
	}

	any.motion.fn.stop(c);

	return true;
}

/**
 * @ignore
 */
function cmpAdd(opt, nm, dn){
	var o = (opt[nm])?opt[nm]:opt;

	if (o.complete == null){
		o.complete = [];
	}else if (typeof o.complete === 'function'){
		o.complete = [o.complete];
	}

	o.complete.push(dn);
}

/**
 * @ignore
 */
function cmpSet(o){
	if (o.complete && typeof o.complete === 'object'){
		var cmp = o.complete;

		o.complete = function(){
			for (var i=0;i<cmp.length;i++){
				cmp[i].call(this);
			}

			cmp = null;
		};
	}
}

/**
 * @ignore
 */
function mtnDn(o, nm, dn){
	o[nm] = o[nm] || {effect: o.effect, duration: o.duration, easing: o.easing, force: o.force};
	cmpAdd(o, nm, dn);
}

/**
 * Show element with motion option.
 * @function showing
 * @memberof jQuery.fn@motion
 * @instance
 *
 * @param {assoc} [opt] Option - support $any.motion profile option.
 * @param {string} [opt.effect='fade'] Effect type.<br><b>Type</b> <code>'slide'</code> <code>'fade'</code> <code>'opacity'</code> <code>'none'</code> <code>null</code> <code>'default'</code>
 * @param {integer} [opt.duration=80] Duration.
 * @param {string} [opt.easing=null] Easing name or jQuery.easing name.
 * @param {function|functions} [opt.complete=null] Complete function.
 * @param {boolean} [opt.force=true] Behavior during animating. Force stop when animating.
 * @param {boolean} [opt.ext=null] Extend effect. This is available only in extension.
 * @returns {jQuery}
 *
 * @see $any.motion.fn.showing
 *
 * @tutorial fn-motion
 * @example
 * $('#target').showing();
 * $('#target').showing({duration: 1500, effect: 'fade'});
 * $('#target').showing({duration: 800, easing: 'easeOutBounce'});	//using jQuery.easing.js
 */
$.fn.showing = function(opt){
	ck(this);
	info('showing', this);

	var o = any.motion.getProfile(opt);

	if (o.showing != null){
		o = o.showing;
	}

	o = ext({effect: 'fade', duration: 150, easing: null, complete: null, force: true}, o);

	if (mtnRun($(this), true, o.force)){
		cmpSet(o);
		any.motion.fn.showing($(this), o);
	}

	return this;
};

/**
 * Hide element with motion option.
 * @function hiding
 * @memberof jQuery.fn@motion
 * @instance
 *
 * @param {assoc} [opt] Option - support $any.motion profile option.
 * @param {string} [opt.effect='fade'] Effect type.<br><b>Type</b> <code>'slide'</code> <code>'fade'</code> <code>'opacity'</code> <code>'none'</code> <code>null</code> <code>'default'</code>
 * @param {integer} [opt.duration=60] Duration.
 * @param {string} [opt.easing=null] Easing name or jQuery.easing name.
 * @param {function|functions} [opt.complete=null] Complete function.
 * @param {boolean} [opt.force=true] Behavior during animating. Force stop when animating.
 * @param {boolean} [opt.ext=null] Extend effect. This is available only in extension.
 * @returns {jQuery}
 *
 * @see $any.motion.fn.hiding
 *
 * @tutorial fn-motion
 * @example
 * $('#target').hiding();
 * $('#target').hiding({duration: 1500, effect: 'fade'});
 * $('#target').hiding({duration: 800, easing: 'easeOutBounce'});	//using jQuery.easing.js
 */
$.fn.hiding = function(opt){
	ck(this);
	info('hiding', this);

	var o = any.motion.getProfile(opt);

	if (o.hiding != null){
		o = o.hiding;
	}

	o = ext({effect: 'fade', duration: 100, easing: null, complete: null, force: true}, o);

	if (mtnRun($(this), false, o.force)){
		cmpSet(o);
		any.motion.fn.hiding($(this), o);
	}

	return this;
};

/**
 * Showing and Hiding by flag.
 * @function viewing
 * @memberof jQuery.fn@motion
 * @instance
 *
 * @param {boolean|integer} v Show(true) or hide(false) element.
 * @param {assoc} [opt] Extends $.fn.showing, $.fn.hiding option - support $any.motion profile option. Support for bulk and individual setting.
 * @param {assoc} [opt.show=null] $.fn.showing option.
 * @param {assoc} [opt.hide=null] $.fn.hiding option.
 *
 * @returns {jQuery}
 *
 * @tutorial fn-motion
 * @example
 * $('#target').viewing(true);
 * $('#target').viewing(true, {showing: {duration: 500, effect: 'fade'}, hiding: {duration: 800, effect: 'fade'}});
 * $('#target').viewing(true, {duration: 500, effect: 'fade'});
 */
$.fn.viewing = function(v, opt){
	ck(this);

	opt = any.motion.getProfile(opt, {});
	info('viewing', this);

	if (v > 0){
		$(this).showing(opt);
	} else {
		$(this).hiding(opt);
	}

	return this;
};

/**
 * Swap element with motion.
 * @function swapping
 * @memberof jQuery.fn@motion
 * @instance
 *
 * @param {Selector} el Swap element.
 * @param {assoc} [opt] Extends $.fn.showing, $.fn.hiding option - support $any.motion profile option. Support for bulk and individual setting.
 * @param {assoc} [opt.show=null] $.fn.showing option.
 * @param {assoc} [opt.hide=null] $.fn.hiding option.
 * @param {function} [opt.done=null] Done function.
 * @param {boolean} [opt.overlap=true] Overlap element.
 * @returns {jQuery}
 *
 * @tutorial fn-motion
 * @example
 * $('#target').swapping('#el');
 */
$.fn.swapping = function(el, opt){
	ck(this);
	el = $(el);

	opt = any.motion.getProfile(opt, {done: null, overlap: true});
	info('swapping', this);

	if ($(this).is(':visible')){
		opt.add = 'after';
		opt.detach = true;

		if (opt.done){
			mtnDn(opt, 'showing', function(){
				opt.done.call(this, el);
				el = null;
			});
		}

		if (opt.overlap){
			$(this).css('position', 'absolute');

			mtnDn(opt, 'hiding', function(){
				$(this).css('position', '');

				$(this).each(function(){
					$._data(this, 'olddisplay', '');	//Reset jQuery behavior
				});
				el = null;
			});
		}

		$(this).addShow(el, opt);

		$(this).hideDel(opt);
	}

	return this;
};

/**
 * Pick and show target element.
 * @function picking
 * @memberof jQuery.fn@motion
 * @instance
 *
 * @param {Selector} el Picked element or selector.
 * @param {assoc} [opt] Extends $.fn.showing, $.fn.hiding option - support $any.motion profile option. Support for bulk and individual setting.
 * @param {assoc} [opt.show=null] $.fn.showing option.
 * @param {assoc} [opt.hide=null] $.fn.hiding option.
 * @param {function} [opt.done=null] Done function.
 * @param {boolean} [opt.overlap=true] Overlap element.
 * @returns {jQuery}
 *
 * @see jQuery.fn@basic#pickBy
 * @see jQuery.fn@basic#pickClass
 *
 * @tutorial fn-motion
 * @tutorial demo-various
 *
 * @example
 * $('#target .item').picking('.item1');
 */
$.fn.picking = function(el, opt){
	ck(this);

	opt = any.motion.getProfile(opt, {done: null, overlap: false});
	info('picking', this);

	var c = $(this);

	if (opt.overlap){
		c.css('position', 'absolute');
		c.each(function(){
			$._data(this, 'olddisplay', '');		//Reset jQuery behavior
		});
	}

	if (opt.done){
		mtnDn(opt, 'showing', opt.done);
	}

	c.not(el).hiding(opt);
	c.filter(el).showing(opt);

	return this;
};

/**
 * Add element to destination element and show.
 * @function addShow
 * @memberof jQuery.fn@motion
 * @instance
 *
 * @param {Selector} el Source element.
 * @param {assoc} [opt] Extends $.fn.showing option - support $any.motion profile option.
 * @param {string} [opt.add='append'] Add type.<br><b>Type</b> <code>before</code> <code>after</code> <code>prepend</code> <code>append</code> <code>fill</code>
 * @param {boolean} [opt.hide=true] Hide source element before adding.
 * @returns {jQuery} Source element's jQuery object.
 *
 * @tutorial fn-motion
 * @example
 * $('#dest').addShow('#src');
 * $('#dest').addShow('#src', {add: 'prepend'});
 * $('#dest').addShow('#src', {complete: function(){ alert('complete!'); } });
 */
$.fn.addShow = function(el, opt){
	ck(this);

	opt = any.motion.getProfile(opt, {add: 'append', hide: true});
	info('addShow', this);

	if (opt.hide){
		cssSet($(el).hide(), 'opacity', 1);
	}

	$(this).addBy($(el), opt.add);

	return $(el).showing(opt);
};

/**
 * Add element to destination element and shown.
 * @function addShown
 * @memberof jQuery.fn@motion
 * @instance
 *
 * @param {Selector} el Destination element.
 * @param {assoc} [opt] Extends $.fn.showing option - support $any.motion profile option.
 * @param {string} [opt.add='append'] Add type.<br><b>Type</b> <code>before</code> <code>after</code> <code>prepend</code> <code>append</code> <code>fill</code>
 * @param {boolean} [opt.hide=true] Hide source element before adding.
 * @returns {jQuery} Source element's jQuery object.
 *
 * @tutorial fn-motion
 *
 * @example
 * $('#src').addShown('#dest');
 * $('#src').addShown('#dest', {add: 'prepend'});
 * $('#src').addShown('#dest', {complete: function(){ alert('complete!'); } });
 */
$.fn.addShown = function(el, opt){
	ck(this);
	info('addShown', this);

	return $(el).addShow(this, opt);
};

/**
 * Clone source element and show.
 * @function cloneShow
 * @memberof jQuery.fn@motion
 * @instance
 *
 * @param {Selector} src Source element.
 * @param {assoc} [opt] Extends $.fn.showing option - support $any.motion profile option.
 * @param {string} [opt.add='append'] Add type.<br><b>Type</b> <code>before</code> <code>after</code> <code>prepend</code> <code>append</code> <code>fill</code>
 * @param {function} [opt.build=null] Function for changing new element after clone.
 * @returns {jQuery}
 *
 * @see jQuery.fn@basic#addClone
 * @tutorial fn-motion
 *
 * @example
 * $('#dest').cloneShow('.src');
 * $('#dest').cloneShow('.src', function(){
 *   $(this).append('.');
 * }, {add: 'prepend'});
 * $('#dest').cloneShow('.src', null, {complete: function(){ alert('complete!'); } });
 */
$.fn.cloneShow = function(src, opt){
	ck(this);
	opt = any.motion.getProfile(opt, {add: 'append', build: null});
	opt.hide = true;

	info('cloneShow', this);

	return $(this).addClone(src, opt).showing(opt);
};

/**
 * Add content and wait moment, hide and delete.
 * @function showMoment
 * @memberof jQuery.fn@motion
 * @instance
 *
 * @param {Selector} el Content element.
 * @param {assoc} [opt] Extends $.fn.showing/$.fn.hiding option - support $any.motion profile option.
 * @param {string} [opt.add='append'] Add type.<br><b>Type</b> <code>before</code> <code>after</code> <code>prepend</code> <code>append</code> <code>fill</code>
 * @param {string} [opt.delay=3000] Wait ms.
 * @param {string} [opt.clone=false] Determine to clone.
 * @returns {jQuery} jQuery object.
 *
 * @tutorial fn-motion
 * @example
 * $('#target').showMoment('#content');
 * $('#target').showMoment('msg', {delay: 2000, add: 'after'});
 * $('#target').showMoment('#msg', {clone: true});
 */
$.fn.showMoment = function(el, opt){
	ck(this);
	el = $(el);
	opt = any.motion.getProfile(opt, {add: 'append', delay: 3000, clone: false});

	info('showMoment', this);

	if (opt.clone && el.selector){
		el = el.clone(true);
	}

	$(this).addShow(el, opt);

	setTimeout(function(){
		el.hideDel(opt);
		el = null;
	}, opt.delay);

	return this;
};

/**
 * Hide element and clear.
 * @function hideDel
 * @memberof jQuery.fn@motion
 * @instance
 *
 * @param {assoc} [opt] Extends $.fn.hiding option - support $any.motion profile option.
 * @param {boolean} [opt.detach=false] Determine to detach element. (true: detach, false: remove)
 *
 * @tutorial fn-motion
 * @example
 * $('#target').hideDel();
 * $('#target').hideDel({detach: true});
 */
$.fn.hideDel = function(opt){
	ck(this);
	opt = any.motion.getProfile(opt, {detach: false});

	info('hideDel', this);

	cmpAdd(opt, 'hiding', function(){
		if (opt.detach){
			$(this).detach();
		}else{
			$(this).remove();
		}
	});

	$(this).hiding(opt);

	return this;
};

/**
 * Hover and toggle show / hide.
 *
 * <b>Specification</b><br>
 * Internal use: <code>$.fn.upon</code>
 *
 * @function hoverToggle
 * @memberof jQuery.fn@motion
 * @instance
 *
 * @param {Selector} el Show or hide target element.
 * @param {assoc} [opt] Extends $.fn.showing, $.fn.hiding option and $.fn.upon option - support $any.motion profile option.
 * @param {function} [opt.show=null] Show handler.
 * @param {function} [opt.hide=null] Hide handler.
 * @param {function} [opt.view=null] View handler. If specified, show and hide is ignored.
 * @returns {jQuery}
 *
 * @see jQuery.fn@basic#upon
 *
 * @tutorial fn-motion
 * @tutorial demo-various
 *
 * @example
 * $('#hover').hoverToggle('#target');
 * $('#hover').hoverToggle('#target', {
 *  show: function(){ }, hide: function(){ }
 * });
 * $('#hover').hoverToggle('#target', {delay: 1000});
 */
$.fn.hoverToggle = function(el, opt){
	ck(this);
	opt = any.motion.getProfile(opt, {show: null, hide: null, view: null});

	info('hoverToggle', this);

	var c = $(el || this);

	$(this).upon({
		mouseenter: function(e, vs, sh){
			if (opt.view){
				opt.view.call(c, true, e, vs, sh);
			}else if (opt.show){
				opt.show.call(c, e, vs, sh);
			}else{
				c.showing(opt);
			}
		},
		mouseleave: function(e, vs, sh){
			if (opt.view){
				opt.view.call(c, false, e, vs, sh);
			}else if (opt.hide){
				opt.hide.call(c, e, vs, sh);
			}else{
				c.hiding(opt);
			}
		}
	}, null, opt);

	return this;
};

/**
 * Click and toggle show / hide.
 *
 * <b>Specification</b><br>
 * Internal use: <code>$.fn.upon</code>
 *
 * @function clickToggle
 * @memberof jQuery.fn@motion
 * @instance
 *
 * @param {Selector} el Show or hide target element.
 * @param {assoc} [opt] Extends $.fn.showing, $.fn.hiding option and $.fn.upon option - support $any.motion profile option.
 * @param {function} [opt.show=null] Show handler.
 * @param {function} [opt.hide=null] Hide handler.
 * @param {function} [opt.view=null] View handler. If specified, show and hide is ignored.
 * @param {boolean} [opt.prevent=true] Prevent mode. $.fn.upon option.
 * @returns {jQuery}
 *
 * @see jQuery.fn@basic#upon
 *
 * @tutorial fn-motion
 * @tutorial demo-various
 *
 * @example
 * $('#click').hoverToggle('#target');
 * $('#click').hoverToggle('#target', {
 *   show: function(){ }, hide: function(){ }
 * });
 * $('#click').hoverToggle('#target', {delay: 1000});
 */
$.fn.clickToggle = function(el, opt){
	ck(this);
	opt = any.motion.getProfile(opt, {show: null, hide: null, view:null, prevent: true});

	info('clickToggle', this);

	var c = $(el || this);

	$(this).upon(any.define.click, function(e, vs, sh){
		if (any.motion.hidden(c)){
			if (opt.view){
				opt.view.call(c, true, e, vs, sh);
			}else if (opt.show){
				opt.show.call(c, e, vs, sh);
			}else{
				c.showing(opt);
			}
		}else{
			if (opt.view){
				opt.view.call(c, false, e, vs, sh);
			}else if (opt.hide){
				opt.hide.call(c, e, vs, sh);
			}else{
				c.hiding(opt);
			}
		}
	}, opt);

	return this;
};


/**
 * @ignore
 */
function ebd(c, el, o, fn, s1, s2){
	var ev = o.event, t = {name: o.name, delay: o.delay, prevent: true, binding: function(){s2.state = 0;}};

	if (c && c.length > 0){
		c.upon(ev, fn, t, s1);
	}

	if (el){
		if (!o.self){
			ev = null;t.delay = null;
		}else if (o.self !== true){
			ev = o.self.event;
			t.delay = o.self.delay;
		}

		el.upon(ev, fn, t, s1);
	}
}

/**
 * Apply open and close to element. To use it by dispatch open/close event.
 *
 * <b>Custom event</b><br>
 * <code>open</code> open event name.<br><code>close</code> close event name.
 *
 * <b>Specification</b><br>
 * Behavior: Apply open/close behaviors to element.<br>
 * Internal use: <code>$.fn.upon</code>
 *
 * @function showHide
 * @memberof jQuery.fn@motion
 * @instance
 *
 *	 @param {Selector} el Content element.
 * @param {assoc} [show] Open option.
 * @param {string} [show.name='show'] Command name.
 * @param {string|array|assoc} [show.event=null] Bind event addition.
 * @param {integer} [show.delay=null] Timer ms.
 * @param {function} [show.handler] Handler function.<br> <code>function(el, e, opt){  }</code> If return false, cancel action.
 * @param {function} [show.fn] Show function.<br><b>Default</b> <code>function(el, e, opt){ el.showing(opt); }</code>
 * @param {assoc} [hide] Close option.
 * @param {string} [hide.name='hide'] Command name.
 * @param {string|array|assoc} [hide.event=null] Bind event addition.
 * @param {integer} [hide.delay=null] Timer ms.
 * @param {boolean|assoc} [hide.self=true] Self element event. <code>true: same, false: none, assoc: original event ({event: VALUE, delay: VALUE})</code>
 * @param {boolean} [hide.clickOut=true] If click outer element, occur close-event.
 * @param {function} [hide.handler] Handler function.<br> <code>function(el, e, opt){  }</code> If return false, cancel action.
 * @param {function} [hide.fn] Hide function.<br><b>Default</b> <code>function(el, e, opt){ el.hiding(opt); }</code>
 * @param {assoc} [opt] Option.
 * @returns {jQuery}
 *
 * @see jQuery.fn@basic#upon
 * @see jQuery.fn@basic#clickOut
 * @see jQuery.fn@motion#showing
 * @see jQuery.fn@motion#hiding
 *
 * @tutorial fn-motion
 * @tutorial demo-various
 *
 * @example
 * //Apply
 * $('#cmd').showHide('#pane');
 * $('#cmd').showHide('#pane', {event: {'click': true, 'mouseleave': 1000}});
 * $('#cmd').showHide('#pane', {delay: 600}, {event:{'mouseleave': 1000}});
 * $('#cmd').showHide('#pane', {clickOut: false});
 * $(null).showHide('#pane', {event: 'click', delay: 200}, {event: null}, {effect: 'slide'});	//only target element.
 * $('#cmd').showHide('#pane', {event: 'click'}, {event: null, self: {event: 'click', delay: 500}});
 *
 * //Dispatch
 * $('#target').trigger('show');
 * $('#order').bindTrigger('#target', 'show');
 */
$.fn.showHide = function(el, show, hide, opt){
	opt = any.motion.getProfile(opt, {handler: null});
	info('showHide', this);

	el = $(el);

	var sh1 = {}, sh2 = {};

	show = ext({
		name: 'show',
		event: null, delay: null,
		self: false,
		handler: function(el, e, opt){ },
		fn: function(el, e, opt){ el.showing(opt); }
	}, show);

	hide = ext({
		name: 'hide',
		event: null, delay: null,
		self: true,
		clickOut: true,
		handler: function(el, e, opt){ },
		fn: function(el, e, opt){ el.hiding(opt); }
	}, hide);

	if (opt.handler === null){
		opt.handler = none;
	}

	function fn(c){
		//show
		ebd(c, el, show, function(e){
			if (show.handler.call(c, el, e, opt) === false || opt.handler.call(c, true, el, e, opt) === false){
				return;
			}

			show.fn.call(c, el, e, opt);

			if (hide.clickOut){
				el.clickOut(function(){
					$(this).trigger(hide.name);
				});
			}
		}, sh1, sh2);

		//hide
		ebd(c, el, hide, function(e){
			if (!hasEl(el, e.relatedTarget)){
				if (hide.fn.call(c, el, e, opt) === false || 	opt.handler.call(c, false, el, e, opt) === false){
					return;
				}

				hide.handler.call(c, el, e, opt);

				if (hide.clickOut){
					el.clickOut(null);
				}
			}
		}, sh2, sh1);
	}

	fn($(this));

	return this;
};

/**
 * Apply add and clear to element.
 *
 * <b>Custom event</b><br>
 * <code>add</code> add event name.<br><code>clear</code> clear event name.
 *
 * <b>Specification</b><br>
 * Behavior: Add and clear specified content if event occurs.<br>
 * Internal use: <code>$.fn.upon</code>
 *
 * @function addClear
 * @memberof jQuery.fn@motion
 * @instance
 *
 * @param {Selector} el Content element.
 * @param {assoc} [add] Open option.
 * @param {string|array|assoc} [add.event=null] Bind event addition.
 * @param {integer} [add.delay=null] Timer ms.
 * @param {function} [add.handler] Handler function.<br> <code>function(el, e, opt, built){  }</code> If return false, cancel action.
 * @param {function} [add.fn] Add function.<br><b>Default</b> <code>function(el, e, opt, built){ $(this).addShow(el, opt); }</code>
 * @param {assoc} [clear] Close option.
 * @param {string|array|assoc} [clear.event=null] Bind event addition.
 * @param {integer} [clear.delay=null] Timer ms.
 * @param {boolean} [clear.clickOut=true] If click outer element, occur clear-event.
 * @param {function} [clear.handler] Handler function.<br> <code>function(el, e, opt){  }</code> If return false, cancel action.
 * @param {function} [clear.fn] Clear function.<br><b>Default</b> <code>function(ct, e, opt){ ct.hideDel(opt); }</code>
 * @param {assoc} [opt] Option.
 * @param {string} [opt.add='append'] Add type.<br><b>Type</b> <code>before</code> <code>after</code> <code>prepend</code> <code>append</code> <code>fill</code>
 * @returns {jQuery}
 *
 * @see jQuery.fn@basic#upon
 * @see jQuery.fn@basic#clickOut
 * @see jQuery.fn@motion#addShow
 * @see jQuery.fn@motion#hideDel
 *
 * @tutorial fn-motion
 * @tutorial demo-various
 *
 * @example
 * //Apply
 * $('#target').addClear(elem);
 * $('#target').addClear('<span>Sample</span>', {event: {'click': true, 'mouseout': 1000}});
 * $('#target').addClear(elem, {delay: 600}, {event:{'mouseout': 1000}}, {add: 'after'});
 * $('#target').addClear('<div>Sample</div>', null, {clickOut: false}, {add: 'prepend'});
 *
 * //Dispatch
 * $('#target').trigger('add');
 * $('#order').bindTrigger('#target', 'add');
 */
$.fn.addClear = function(el, add, clear, opt){
	opt = any.motion.getProfile(opt, {add: 'append', handler: null});
	info('addClear', this);

	add = ext({
		name: 'add',
		event: null, delay: null,
		self: false,
		handler: function(el, e, opt, built){ },
		fn: function(el, e, opt, built){ $(this).addShow(el, opt); }
	}, add);

	clear = ext({
		name: 'clear',
		event: null, delay: null,
		self: true,
		clickOut: true,
		handler: function(el, e, opt){ },
		fn: function(el, e, opt){ el.hideDel(opt); }
	}, clear);

	if (opt.handler === null){
		opt.handler = none;
	}

	$(this).each(function(){
		var sh1 = {}, sh2 = {}, c = $(this), d = null;

		function fn(e){
			if(d && !hasEl(d, e.relatedTarget)){
				if (clear.fn.call(c, d, e, opt) === false || opt.handler.call(c, false, d, e, opt) === false){
					return;
				}

				clear.handler.call(c, d, e, opt);

				if(clear.clickOut){
					d.clickOut(null);
				}
			}
		}

		//add
		ebd(c, d, add, function(e){
			var built = false;

			if(!d){
				d = $(el);
				built = true;
			}

			if (add.handler.call(c, d, e, opt, built) === false || opt.handler.call(c, true, d, e, opt, built) === false){
				return;
			}

			add.fn.call(c, d, e, opt, built);

			if(clear.clickOut){
				d.clickOut(function(){
					c.trigger(clear.name);
				});
			}

			if(built || !opt.detach){
				ebd(null, d, clear, fn, sh2, sh1);
			}
		}, sh1, sh2);

		//clear
		ebd(c, null, clear, fn, sh2, sh1);
	});

	return this;
};

/**
 * jQuery.fn@ui methods.
 *
 * <b><i>Note! Not included in any-tiny.js.</i></b><br>
 *
 * | Method | Default ver | Tiny ver | Micro ver |
 * |:---|:---:|:---:|:---:|
 * | All methods | Yes | - | - |
 *
 * @namespace jQuery.fn@ui
 *
 * @see $any.ui
 * @see jQuery.fn@ui-cmp
 *
 * @tutorial fn-ui
 * @tutorial static-ui
 * @tutorial demo-ui
 * @tutorial demo-various
 *
 * @example
 * //See tutorials.
 */

/**
 * @ignore
 */
function addLy(nm, c, o){
	c.addClass(nm);

	if (o.layout){
		c.addClass(o.layout.replace(/[\+,]/g, ' '));
	}
}

/**
 * Overlap element with options.
 *
 * <b>Specification</b><br>
 * Internal use: <code>$.fn.hoverToggle</code> <code>$.fn.addBy</code>
 *
 * @function overlapped
 * @memberof jQuery.fn@ui
 * @instance
 *
 * @param {Selector} el Overlay element.
 * @param {assoc} [opt] Option. Extends $.fn.hoverToggle option.
 * @param {boolean} [opt.hover=false] If hover on overlay-element, show it.
 * @param {boolean} [opt.hoverSelf=false] If hover on target-element, show overlay-element.
 * @param {string} [opt.effect='none'] Effect mode.
 * @param {string|boolean} [opt.add=null] Determine to insertion, Insert type. $.fn.addBy option.
 * @returns {jQuery}
 *
 * @see jQuery.fn@motion#hoverToggle
 * @see jQuery.fn@basic#addBy
 *
 * @tutorial fn-ui
 *
 * @example
 * $('#el').overlapped('.overlay');
 * $('#el').overlapped('.overlay', {hover: true});
 * $('#el').overlapped('.overlay', {hover: true, effect: 'opacity', duration: 200});
 * $('#el').overlapped('.overlay', {hoverSelf: true, effect: 'opacity'});
 */
$.fn.overlapped = function(el, opt){
	ck(this);
	info('overlapped', this);

	opt = ext({
		hover: false, hoverSelf: false,
		effect: 'none',
		add: null
	}, opt);

	var d = $(el);

	cssSet($(this), 'position', 'relative');

	cssSet(d, 'position', 'absolute');

	if (opt.add !== false){
		$(this).addBy(d, opt.add);
	}

	if (opt.hover){
		d.hoverToggle(null, opt);
	}else{
		if (opt.hoverSelf){
			$(this).hoverToggle(d, opt);
		}
	}

	return d;
};

/**
 * Begin animation by 'transition / animation' css. Set & reset css animation.
 *
 * @function animating
 * @memberof jQuery.fn@ui
 * @instance
 *
 * @param {string} cls Animation CSS class name.
 * @param {string|RegExp} [del=null] Delete class expression. <code>ex: /^tg-/, 'tg-'</code>
 * @param {assoc} [opt] Options.
 * @param {boolean} [opt.reset=true] Reset animation.
 * @param {integer} [opt.delay=10] Time ms until reset.
 * @returns {jQuery}
 *
 * @tutorial fn-ui
 * @tutorial demo-ui
 *
 * @example
 * //CSS
 * .circle1 {border-radius: 50%;transition-property: border-radius;transition-duration: 0.2s;transition-timing-function: linear, ease-in;}
 * .circle2 {animation-name: am1;animation-duration: 2s;animation-fill-mode: forwards;}
 * @keyframes circle2 {50% {background-color:#fec65e;border-radius: 40px;} 100% {background-color: #bbdba7;border-radius: 8px;}}
 *
 * @example
 * $('#el').animating('circle1');
 * $('#el').animating('circle2');
 * $('#el').animating('circle3', 'tg-');
 * $('#el').animating('circle4', /^tg\-/);
 * $('#el').animating('transition1', null, {reset: false, delay: 50});
 */
$.fn.animating = function(cls, del, opt){
	ck(this);
	info('animating', this);

	opt = ext({reset: true, delay: 10}, opt);

	if (del){
		$(this).removeClass(function(i, cs) {
			var t = cs.split(' '), r = [], j;

			for (j=0;j<t.length;j++){
				if (t[j].match(del)){
					r.push(t[j]);
				}
			}

			return r.join(' ');
		});
	}

	if (cls){
		if (opt.reset){
			var c = $(this).removeClass(cls);

			setTimeout(function(){
				c.addClass(cls);
			}, opt.delay);
		}else{
			$(this).addClass(cls);
		}
	}

	return this;
};

/**
 * Handle transition event. In default, it is detected only one property.
 *
 * <b>Specification</b><br>
 * Internal use: <code>$.fn.upon</code>
 *
 * @function transited
 * @memberof jQuery.fn@ui
 * @instance
 *
 * @param {function} fn Callback function. <code>function(e, v){ ... } - (e:Event, v:CSS value)</code>
 * @param {assoc} [opt] Options. Extends $.fn.upon option.
 * @param {boolean} [opt.only=true] Detect only one property.
 * @param {string} [opt.detect='z-index'] CSS property for state detection. This CSS property must specified manually in CSS style.
 * @param {string|number} [opt.verify=1] CSS value for state detection. This CSS value must specified manually in CSS style.
 * @param {string|array} [opt.permit=null] Permitted css property.
 * @returns {jQuery}
 *
 * @tutorial fn-ui
 *
 * @example
 * //CSS
 * .demo{z-index: 1;}
 * .demo:hover {z-index: 2;transform: scale(1.2);}
 *
 * @example
 * $('#target').transited(function(e, v){ ... });
 * $('#target').transited(function(e, v){ ... }, {only: false});
 * $('#target').transited(function(e, v){ ... }, {detect: 'z-index'});
 */
$.fn.transited = function(fn, opt){
	ck(this);
	info('transited', this);

	opt = ext({only: true, detect: 'z-index', verify: 1, permit: null}, opt);

	var v = null;

	$(this).upon('transitionend webkitTransitionEnd mozTransitionEnd oTransitionEnd', function(e){
		var pn = e.originalEvent.propertyName, z;

		if (!opt.permit || opt.permit === pn || $.inArray(pn, opt.permit) !== -1){
			if (opt.detect){
				z = $(this).css(opt.detect);

				if(v != z){
					if(opt.only){
						if(z == opt.verify){
							fn.call(this, e, z);
						}
					}else{
						fn.call(this, e, z);
					}

					v = z;
				}
			}else{
				fn.call(this, e, null);
			}
		}
	}, opt);

	return this;
};

/**
 * Handle animation event.
 *
 * <b>Specification</b><br>
 * Internal use: <code>$.fn.upon</code>
 *
 * @function animated
 * @memberof jQuery.fn@ui
 * @instance
 *
 * @param {function} fn Callback function. <code>function(e){ ... } - (e:Event)</code>
 * @param {assoc} [opt] Options. Extends $.fn.upon option.
 * @returns {jQuery}
 *
 * @tutorial fn-ui
 *
 * @example
 * $('#target').animated(function(e){ ... });
 */
$.fn.animated = function(fn, opt){
	ck(this);
	info('animated', this);

	$(this).upon('animationend webkitAnimationEnd mozAnimationEnd oAnimationEnd', fn, opt);

	return this;
};

/**
 * Clone element and assign values.
 *
 * <b>Specification</b><br>
 * Internal use: <code>$.fn.assignAssoc</code>
 *
 * @function assignClone
 * @memberof jQuery.fn@ui
 * @instance
 *
 * @param {assoc} vs Values.
 * @param {string} mode $.fn.assignAssoc automatic mode.
 * @param {assoc} [opt] $.fn.assignAssoc options.
 * @returns {jQuery}
 *
 * @see jQuery.fn@form#assignAssoc
 *
 * @tutorial fn-ui
 * @tutorial fn-form-serialize
 *
 * @example
 * el = $('#src').assignClone(vs, 'class');
 * $('#src').assignClone(vs, 'name').addShown('#target');
 * $('#src').assignClone(vs, 'id', {prefix: 'pre_'}).addShown('#target');
 */
$.fn.assignClone = function(vs, mode, opt){
	ck(this);
	info('assignClone', this);

	return $(this).clone(true).assignAssoc(vs, mode, opt);
};

/**
 * Clone element and assign values.(Multiple rows)
 *
 * <b>Specification</b><br>
 * Internal use: <code>$.fn.assignAssoc</code>
 *
 * @function assignClones
 * @memberof jQuery.fn@ui
 * @instance
 *
 * @param {array} rows Multiple row values.
 * @param {string} mode $.fn.assignAssoc automatic mode.
 * @param {assoc} [opt] $.fn.assignAssoc options.
 * @returns {jQuery}
 *
 * @see jQuery.fn@form#assignAssoc
 *
 * @tutorial fn-ui
 * @tutorial fn-form-serialize
 *
 * @example
 * el = $('#src').assignClones(rows, 'class');
 * $('#src').assignClones(vs, 'name', {not: '.not'}).addShown('#target');
 * $('#src').assignClones(vs, 'class', {prefix: 'pre_'}).addShown('#target');
 */
$.fn.assignClones = function(rows, mode, opt){
	ck(this);
	info('assignClones', this);

	opt = ext({prepare: null, build: null}, opt);

	var cs = [], c, vs;

	opt.prepare = opt.prepare || none;
	opt.build = opt.build || none;

	for (var i=0;i<rows.length;i++){
		vs = rows[i];

		if (opt.prepare.call(null, vs) === false){
			continue;
		}

		c = $(this).assignClone(vs, mode, opt);

		if (opt.build.call(c, vs) === false){
			continue;
		}

		cs = cs.concat($.makeArray(c));
	}

	return $(cs);
};

/**
 * Delay-load resource by using 'data-src' attribute.
 *
 * @function delayLoad
 * @memberof jQuery.fn@ui
 * @instance
 *
 * @param {assoc} [opt] Option.
 * @param {string} [opt.suffix='src'] Data attirbute's suffix.
 * @param {function} [opt.prepare=null] Prepare function.
 * @returns {jQuery}
 *
 * @see jQuery.fn@ui#scrolled
 * @see jQuery.fn@ui#scrollIn
 * @see $any.ui.delayLoad
 *
 * @tutorial fn-ui
 *
 * @example
 * $('#target').delayLoad();
 * $('#target').delayLoad({prepare: function(){ ... } });
 */
$.fn.delayLoad = function(opt){
	ck(this);
	info('delayLoad', this);

	opt = ext({suffix: 'src', prepare: null}, opt);

	opt.prepare = opt.prepare || none;

	$(this).filter('[data-' + opt.suffix + ']').each(function(){
		if (opt.prepare.call(this) !== false){
			$(this).attr('src', $(this).data(opt.suffix));
		}
	});

	return this;
};

/**
 * Bind scroll event. The event doesn't occurs during scrolling.
 *
 * @function scrolled
 * @memberof jQuery.fn@ui
 * @instance
 *
 *	 @param {function} fn Callback function. <code>function(e, x, y){ ... }</code>
 * @param {assoc} [opt] Options.
 * @param {integer} [opt.delay=100]
 *
 * @see jQuery.fn@ui#scrollIn
 *
 * @tutorial fn-ui
 *
 * @example
 * $(window).scrolled(function(e, x, y){ ... });
 * $(window).scrolled(function(e, x, y){ ... }, {delay: 500});
 * $('#pane').scrolled(function(e, x, y){ ... });
 */
$.fn.scrolled = function(fn, opt){
	ck(this);
	opt = ext({delay: 100}, opt);
	info('scrolled', this);

	var c = $(this), t, e;

	c.on('scroll touchmove', function(q){
		if (t){
			clearTimeout(t);
		}
		e = q;
		t = setTimeout(function(){
			fn.call(this, e, c.scrollLeft(), c.scrollTop());
		}, opt.delay);
	});

	return this;
};

/**
 * Handle scroll event if the scrolling has stopped. Event doesn't occurs until after delay time.
 *
 * <b>Specification</b><br>
 * Internal use: <code>$.fn.scrolled</code>
 *
 * @function scrollIn
 * @memberof jQuery.fn@ui
 * @instance
 *
 * @param {Selector} el Target element.
 * @param {function} fn Callback function. <code>function(e, x, y){ ... }</code>
 * @param {assoc} [opt] Option.
 * @param {Selector} [wnd=null] Target element. if not, this is window.
 * @param {integer} [delay=100] Delay time ms.
 * @returns {jQuery}
 *
 * @see jQuery.fn@ui#scrolled
 * @see jQuery.fn@ui#delayLoad
 * @see jQuery.fn@ui#scrollInLoad
 *
 * @tutorial fn-ui
 *
 * @example
 * $(window).scrollIn('#target', function(e, x, y){ ... });
 * $('#block').scrollIn('#target', function(e, x, y){ ... }, {delay: 500});
 */
$.fn.scrollIn = function(el, fn, opt){
	ck(this);
	opt = ext({delay: 100}, opt);
	info('scrollIn', this);

	var c = $(this).scrolled(function(e, x, y){
		$(el).each(function(){
			var s = $(this).offset(), l, t, tx, ty;
			l = s.left;
			t = s.top;

			if (c.get(0) != window){
				s = c.offset();
				tx = s.left;
				ty = s.top;
			}else{
				tx = x;
				ty = y;
			}

			if ((t + $(this).outerHeight()) >= ty && t <= (ty + c.height()) && (l + $(this).outerWidth()) >= tx && l <= (tx + c.width())){
				fn.call(this, e, x, y);
			}
		});
	}, opt);

	return this;
};

/**
 * Delay-load resource if the element enter the screen by scrolling.
 *
 * <b>Specification</b><br>
 * Internal use: <code>$.fn.scrollIn</code> <code>$.fn.delayLoad</code>
 *
 * @function scrollInLoad
 * @memberof jQuery.fn@ui
 * @instance
 *
 * @param {Selector} el Target element.
 * @param {assoc} [opt] Option. Extends $.fn.scrollIn/$.fn.delayLoad options.
 * @returns {jQuery}
 *
 * @see jQuery.fn@ui#scrolled
 * @see jQuery.fn@ui#scrollIn
 * @see $any.ui.delayLoad
 *
 * @tutorial fn-ui
 *
 * @example
 * $(window).scrollInLoad('#target');
 * $('#block').scrollInLoad('#target', {delay: 500});
 */
$.fn.scrollInLoad = function(el, opt){
	ck(this);
	info('scrollInLoad', this);

	$(this).scrollIn(el, function(){
		$(this).delayLoad(opt);
	}, opt);

	return this;
};

/**
 * Get screen info and place info.
 *
 * @function screenPlace
 * @memberof jQuery.fn@ui
 * @instance
 *
 * @param {assoc} [opt] Options.
 * @param {integer} [bound=50] Padding.
 * @returns {jQuery}
 *
 * @tutorial fn-ui
 *
 * @example
 * //Return value
 * {
 *   w:48, h: 48
 *   x: 190, y: -1076,
 *   place: "bottom",
 *   places: {w:"right",  h: "bottom"},
 *   screen: { x:0,  y:3876,  h:700, w:1903}
 * }
 *
 * @example
 * v = $('#target').screenPlace();
 */
$.fn.screenPlace = function(opt){
	ck(this);
	info('screenPlace', this);

	opt = ext({bound: 50}, opt);

	var r = {}, ps = $(this).offset(), m = opt.bound;

	var sw = $(window).width(), sh = $(window).height(), sx = $(window).scrollLeft(), sy = $(window).scrollTop();
	r.screen = {x: sx, y: sy, w: sw, h: sh};

	r.x = parseInt(ps.left - sx);
	r.y = parseInt(ps.top - sy);

	r.w = $(this).width();
	r.h = $(this).height();

	var w = ((r.x + r.w/2) > sw/2)?'left':'right', h = ((r.y + r.h/2) > sh/2)?'top':'bottom';

	r.place = h;

	if (r.x < m || (r.x + r.w + m) > sw){
		r.place = w;
	}

	if (r.y < m || (r.y + r.h + m) > sh){
		r.place = h;
	}

	r.places = {w: w, h: h};

	return r;
};

/* global addLy: false */

/**
 * jQuery.fn@ui-cmp methods. UI-Component.
 *
 * <b><i>Note! Not included in any-tiny.js.</i></b><br>
 *
 * | Method | Default ver | Tiny ver | Micro ver |
 * |:---|:---:|:---:|:---:|
 * | All methods | Yes | - | - |
 *
 * @namespace jQuery.fn@ui-cmp
 *
 * @see $any.ui
 * @see jQuery.fn@ui
 *
 * @tutorial fn-ui-cmp
 * @tutorial ui-css
 * @tutorial demo-ui
 * @tutorial demo-various
 *
 * @example
 * //See tutorials.
 */

/**
 * Pane UI. Support 'layout / size / close callback / other options'.
 *
 * <b>Element structure</b><br>
 * <code>&lt;div&gt;...&lt;/div&gt;</code> <code>&lt;span&gt;...&lt;/span&gt;, etc.</code>
 *
 * <b>CSS structure</b><br>
 * Pane css-class : <code>.n-pane</code><br>
 * Layout css-class : <code>.n-pane.box, n-pane.round...</code><br>
 * &#35; See any.css for detail.
 *
 * @function nPane
 * @memberof jQuery.fn@ui-cmp
 * @instance
 *
 * @param {assoc} [opt] Options.
 * @param {string} [opt.layout=null] Layout(CSS class) <code>box, round, shadow, thin, fog, narrow, clear, tag, msg</code>. <br>Multiple values is available. <code>ex: round+fog</code>
 * @param {integer} [opt.width=null] Width.
 * @param {integer} [opt.height=null] Height.
 * @param {integer} [opt.opacity=null] Opacity.
 * @param {boolean} [opt.noselect=null] If true, can't select content.
 * @param {boolean} [opt.drop=true] Determine to drop in closing.
 * @param {function} [opt.closing] Closing function.
 * @param {function} [opt.done] Done function if it was closed.
 * @returns {jQuery}
 *
 * @tutorial fn-ui-cmp
 * @tutorial ui-css
 *
 * @example
 * $('#pane').nPane();
 * $('#pane').nPane({layout: 'box+round', width: 100, height: 100});
 * $('#pane').nPane({layout: 'fog'});
 * $('#pane').nPane({done: function(){ ... }});
 */
$.fn.nPane = function(opt){
	ck(this);
	info('nPane', this);

	opt = ext({
		layout: null,
		width: null, height: null, inline: false, opacity: null, noselect: null,
		drop: true,
		closing: function(el, e, o){
			if (o.drop){
				$(this).hideDel(o);
			}else{
				$(this).hiding(o);
			}
		},
		done: null
	}, opt);

	addLy('n-pane', $(this), opt);

	cssLy($(this), opt);

	if (opt.closing){
		$(this).on('close', function(e, el){
			opt.closing.call(this, el, e, opt);

			if (opt.done){
				opt.done.call(this, el, e, opt);
			}
		}).find('.e-close,.n-close').clicked(function(){
			$(this).closest('.n-pane').trigger('close', [this]);
		});
	}

	return this;
};

/**
 * Panel UI. Support 'layout / size / close callback / other options'.
 *
 * <b>Element structure</b><br>
 * <code>&lt;div&gt;...&lt;/div&gt;</code> <code>&lt;span&gt;...&lt;/span&gt;, etc.</code>
 *
 * <b>CSS structure</b><br>
 * Pane css-class : <code>.n-pane</code><br>
 * Layout css-class : <code>.n-pane.box, n-pane.round...</code><br>
 * &#35; See any.css for detail.
 *
 * @function nPanel
 * @memberof jQuery.fn@ui-cmp
 * @instance
 *
 * @param {assoc} [opt] Options.
 * @param {string} [opt.layout='round+shadow'] Layout(CSS class) <code>box, round, shadow, thin, fog, narrow, clear, tag, msg</code>. <br>Multiple values is available. <code>ex: round+fog</code>
 * @param {integer} [opt.width=null] Width.
 * @param {integer} [opt.height=null] Height.
 * @param {integer} [opt.opacity=null] Opacity.
 * @param {boolean} [opt.noselect=null] If true, can't select content.
 * @param {boolean|string} [opt.button=true] Show close-button and specify button class.
 * @param {boolean} [opt.drop=true] Determine to drop in closing.
 * @param {function} [opt.closing] Closing function.
 * @param {function} [opt.done] Done function if it was closed.
 * @returns {jQuery}
 *
 * @tutorial fn-ui-cmp
 * @tutorial ui-css
 *
 * @example
 * $('#panel').nPanel();
 * $('#panel').nPanel({layout: 'round+shadow', width: 100, height: 100});
 * $('#panel').nPanel({done: function(){ ... }});
 */
$.fn.nPanel = function(opt){
	ck(this);
	info('nPanel', this);

	opt = ext({
		layout: 'round+shadow',
		button: true
	}, opt);

	if (opt.button){
		$(this).prepend('<a class="n-close right ' + ((typeof opt.button === 'string')?opt.button:'l') + '" href="#"/>');
	}

	return $(this).nPane(opt);
};

/**
 * Button UI. Support 'layout'.
 *
 * <b>Element structure</b><br>
 * <code>&lt;a&gt;...&lt;/a&gt;</code> <code>&lt;button&gt;...&lt;/button&gt;</code>
 *
 * <b>CSS structure</b><br>
 * Button css-class : <code>.n-button</code><br>
 * Layout css-class : <code>.n-button.ash</code><br>
 * &#35; See any.css for detail.
 *
 * @function nButton
 * @memberof jQuery.fn@ui-cmp
 * @instance
 *
 * @param {function} [fn] Function when it's clicked.
 * @param {assoc} [opt] Options.
 * @param {string} [opt.layout=null] Layout(CSS class) <code>none(default) / ash</code>
 * @param {integer} [opt.once=false] Only once.
 * @returns {jQuery}
 *
 * @tutorial fn-ui-cmp
 * @tutorial ui-css
 *
 * @example
 * $('#btn').nButton();
 * $('#btn').nButton(null, {layout: 'ash'});
 * $('#btn').nButton(function(){ ... });
 */
$.fn.nButton = function(fn, opt){
	ck(this);
	info('nButton', this);

	opt = ext({layout:null, once: false}, opt);

	addLy('n-button', $(this), opt);

	$(this).clicked(function(){
		if (fn && !$(this).hasClass('disabled')){
			fn.call(this);
		}

		if (opt.once){
			if ($(this).is('a')){
				$(this).addClass('disabled');
			}else{
				$(this).disabled(true);
			}
		}
	});

	return this;
};

/**
 * Menu UI.
 *
 * <b>Element structure</b><br>
 * <code>&lt;ul&gt; &lt;li&gt;&lt;a&gt;...&lt;/a&gt;&lt;/li&gt; &lt;li&gt;&lt;a&gt;...&lt;/a&gt;&lt;/li&gt; ... &lt;/ul&gt;</code>
 *
 * <b>CSS structure</b><br>
 * Menu css-class : <code>.n-menu</code><br>
 * &#35; See any.css for detail.
 *
 * @function nMenu
 * @memberof jQuery.fn@ui-cmp
 * @instance
 *
 * @param {function} [fn] Callback function.
 * @returns {jQuery}
 *
 * @tutorial fn-ui-cmp
 * @tutorial ui-css
 *
 * @example
 * $('#target').nMenu();
 */
$.fn.nMenu = function(fn){
	ck(this);
	info('nMenu', this);

	var c = $(this).addClass('n-menu');

	c.find('a').clicked(function(e){
		c.find('a').pickClass(this, 'active');

		if (fn){
			fn.call(this);
		}
	});

	c = null;

	return this;
};

/**
 * Tab UI.
 *
 * <b>Element structure</b><br>
 * <code>&lt;div&gt;<br>
 * &lt;ul class="n-menu"&gt;
 &lt;li&gt;&lt;a class="active" data-tab=".a"&gt;...&lt;/a&gt;&lt;/li&gt;
 &lt;li&gt;&lt;a data-tab=".b"&gt;...&lt;/a&gt;&lt;/li&gt;
 ...
 &lt;/ul&gt;<br>
 &lt;div class="n-pane"&gt;
 &lt;div class="a active"&gt;...&lt;/div&gt;
 &lt;div class="b"&gt;...&lt;/div&gt;
 ...
 &lt;/div&gt;<br>
 &lt;/div&gt;</code>
 *
 * <b>CSS structure</b><br>
 * Tab css-class : <code>.n-tabs</code><br>
 * &#35; See any.css for detail.
 *
 * @function nTabs
 * @memberof jQuery.fn@ui-cmp
 * @instance
 *
 * @param {function} [fn] Callback function.
 * @returns {jQuery}
 *
 * @tutorial fn-ui-cmp
 * @tutorial ui-css
 *
 * @example
 * $('#target').nTabs();
 */
$.fn.nTabs = function(fn){
	ck(this);
	info('nTabs', this);

	$(this).addClass('n-tabs');

	$(this).find('a').clicked(function(){
		var d = $(this).closest('.n-tabs'), v = $(this).data('tab');

		d.find('.n-menu a').pickClass(this, 'active');
		d.find('.n-pane > *').pickClass(v, 'active');

		if (fn){
			fn.call(this, v);
		}

		d = null;
	});

	return this;
};

/**
 * Tooltip UI with various option.
 *
 * <b>CSS structure</b><br>
 * Tab css-class : <code>.n-tip</code><br>
 * &#35; See any.css for detail.
 *
 * <b>Specification</b><br>
 * Internal use: <code>$any.ui.styleCSS</code> <code>$any.ui.styleRule</code>
 *
 * @function nTip
 * @memberof jQuery.fn@ui-cmp
 * @instance
 *
 * @param {string} [place='bottom'] Place. <code>left, top, right, bottom</code>
 * @param {assoc} [opt] Options.
 * @param {assoc} [opt.css] CSS class name. 'This option or id specified' is required for decoration options(ex:  border, background, size, pos).
 * @param {integer} [opt.width] Width.
 * @param {integer} [opt.height] Height.
 * @param {boolean} [opt.inline=false] Inline. <code>display: inline;</code>
 * @param {integer} [opt.opacity=null] Opacity.
 * @param {boolean} [opt.noselect=null] If true, can't select content.
 * @param {boolean} [opt.round=true] Corder round.
 * @param {string|boolean} [opt.border=null] Border color. if false, border is none.
 * @param {string} [opt.background=null] Background color.
 * @param {integer} [opt.size] Arrow size.
 * @param {string} [opt.pos] Arrow position. <code>ex: 10px, 30%</code>
 * @returns {jQuery}
 *
 * @see $any.ui.styleCSS
 * @see $any.ui.styleRule
 *
 * @tutorial fn-ui-cmp
 * @tutorial ui-css
 *
 * @example
 * $('#tip').nTip();
 * $('#tip').nTip('right');
 * $('#tip').nTip('top', {width: 200, height: 80, 'des1', border: 3, size: 20});
 * $('#tip').nTip(null, {width: 150, height: 45, pos: '94%'});
 */
$.fn.nTip = function(place, opt){
	ck(this);
	info('nTip', this);

	opt = ext({
		css: '',
		width: null, height: null, inline: false, opacity: null, noselect: null,
		round: true, border: null, background: null,
		size: null, pos: null
	}, opt);

	var q=null, bs='left';

	switch (place){
	case 'left':
	case 'right':
		bs = 'top';
		break;
	case 'top':
		break;
	default:	//bottom
		place = 'bottom';
		break;
	}

	if (opt.css){
		q = '.n-tip' + '.' + opt.css;
		$(this).addClass(opt.css);
	}else{
		q = '#' + $(this).attr('id');
	}

	if ((opt.border || opt.background) && !q){
		error('id or class required', this);
	}else{
		cssLy($(this), opt);
	}

	if (q){
		var r1, r2, p='border-' + place + '-color', f=any.ui.styleCSS;

		r1 = any.ui.styleRule(q + ':before');
		r2 = any.ui.styleRule(q + ':after');

		if (opt.border !== null){
			f(r1, 'border-color', '');

			if (opt.border){
				$(this).css('border-color', opt.border);
				f(r1, p, $(this).css(p));
			}else{
				$(this).css('border', 0);
				f(r1, 'border', 0);
			}
		}

		if (opt.background){
			$(this).css('background', opt.background);

			f(r2, 'border-color', '');
			f(r2, p, opt.background);
		}

		if (opt.size){
			var t='margin-'+bs, t1=parseInt(opt.size/2), t2=t1+1, to;

			to = {'border-width': t1+'px'};to[t]=-t1+'px';
			f(r2, to);

			to = {'border-width': t2+'px'};to[t]=-t2+'px';
			f(r1, to);
		}

		if (opt.pos){
			f(r1, bs, opt.pos);
			f(r2, bs, opt.pos);
		}
	}

	if (opt.round){
		$(this).addClass('round');
	}

	$(this).removeClass(function(i, nm){
		return (nm.match(/\b(left|right|top|bottom)\b/g) || []).join(' ');
	});

	$(this).addClass('n-tip ' + place);

	return this;
};

/**
 * Show tooltip when mouseover.
 *
 * <b>Specification</b><br>
 * Internal use: <code>$.fn.screenPlace</code> <code>$any.ui.calcRelative</code> <code>$.fn.nTip</code> <code>$.fn.addClear</code>
 *
 * @function nTipped
 * @memberof jQuery.fn@ui-cmp
 * @instance
 *
 * @param {Selector} el Target element.
 * @param {Selector|string|function} content Content.
 * @param {assoc} [opt] Option.
 * @param {integer} [opt.width] Width.
 * @param {integer} [opt.height] Height.
 * @param {boolean} [opt.inline=false] Inline. <code>display: inline;</code>
 * @param {integer} [opt.opacity=null] Opacity.
 * @param {boolean} [opt.noselect=null] If true, can't select content.
 * @param {string} [opt.place='auto'] Place. <code>center, left, top, right, bottom</code>
 * @param {boolean} [opt.center=false] Center.
 * @param {boolean} [opt.tip=true] Determine to use $.fn.nTip.
 * @param {boolean} [opt.datatip=false] Use value of <code>data-tip</code>.
 * @param {string} [opt.effect=null] Effect. $.fn.showing/$.fn.hiding option.
 * @param {assoc} [opt.add] Add behaviors. $.fn.addClear option.
 * @param {string} [opt.add.event='mouseenter'] Event name.
 * @param {integer} [opt.add.delay=500] Timer.
 * @param {assoc} [opt.clear] Clear behaviors. $.fn.addClear option.
 * @param {string} [opt.clear.event='mouseleave'] Event name.
 * @param {integer} [opt.clear.delay=500] Timer.
 * @param {boolean} [opt.clear.clickOut=true] ClickOut event.
 * @returns {jQuery}
 *
 * @see $any.ui.calcRelative
 * @see jQuery.fn@ui-cmp#nTip
 * @see jQuery.fn@ui#screenPlace
 * @see jQuery.fn@motion#addClear
 *
 * @tutorial fn-ui-cmp
 *
 * @example
 * $('.tip2').nTipped('', {center: true, datatip: true});
 * $('.tip3a').nTipped('sample', {place: 'left'});
 * $('.tip3d').nTipped('demo', {place: 'right', add: {event: '', delay: 0}, clear: {event: '', delay: 0, clickOut: false}});
 */
$.fn.nTipped = function(content, opt){
	ck(this);
	info('nTipped', this);

	opt = ext({
		width: null, height: null, inline: false, opacity: null, noselect: null,
		place: 'auto', center: false, tip: true, datatip: false, effect: null,
		add: {event: 'mouseenter', delay: 500},
		clear: {event: 'mouseleave', delay: 500, clickOut: true}
	}, opt, true);

	opt.add.fn = function(c, e, o, blt){
		var w;

		if (opt.datatip){
			w = $(this).data('tip') || content;
		}else{
			w = (typeof content === 'function')?content.call(this, c):content;
		}

		if (blt){
			c.css('position', 'absolute').append(w).hide();
		}else{
			if (w != null){
				c.empty().append(w);
			}
		}

		var pl = opt.place;

		if (pl === 'auto'){
			pl = $(this).screenPlace(opt).place;
		}

		$(this).after(c);

		cssLy(c, opt);

		if (opt.tip){
			c.nTip(pl, opt.tip);
		}

		c.css(any.ui.calcRelative(this, c, pl, opt)).showing(opt);
	};

	opt.clear.fn = function(c){ c.hideDel(opt); };

	return $(this).addClear('<div class=n-tip/>', opt.add, opt.clear);
};

/**
 * onload initialize.
 */
$(function(){
	$any.detectClick();
});

})($any, jQuery);
