/*!
 * anyjs tiny ver 1.0.4 - any-tiny.js
 * (c) any-js - https://github.com/any-js/anyjs/
 * Released under the MIT license
 */
var $any = {};

(function(any){
'use strict';

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
			if (deep 	&& (v[k] instanceof Object && v[k].constructor === Object) && (s[k] instanceof Object && s[k].constructor === Object)){
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
 * Register function which run after document-ready.
 *
 * <b><i>Note! Only for any-tiny.js.</i></b><br>
 *
 * @function ready
 * @memberof $any
 * @param {function} fn Function.
 *
 * @tutorial static-any
 * @example
 * $any.ready(function(){ ... });
 */
any.ready = function(fn){
	try{
		window.addEventListener('load', fn);
	}catch(e){
		window.attachEvent('onload', fn);
	}
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
 * @see $any@class.makeInstance
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
 * Create class instance. See the specification of <code>$any.makeClass</code>
 *
 * @function makeInstance
 * @memberof $any@class
 *
 * @param {function} construct Class constructor and base structure.
 * @param {function|functions} methods Class methods or Function space and class methods. Add methods by prototype.
 * @param {function} [parent=null] If specified, extends super-class.
 * @param {boolean} [bind=true] If true, Add <i>bind</i> method.
 * @returns {object} Class instance. This is instance.
 *
 * @see $any@class.makeClass
 *
 * @tutorial static-any-class
 * @example
 * var instance = $any.makeInstance(
 *   function(n){
 *     this.n = n;
 *   }, {
 *     output: function(){ alert(this.n); }
 *   }
 * );
 */
any.makeInstance = function(construct, methods, parent, bind){
	info('makeInstance');

	return new (any.makeClass(construct, methods, parent, bind))();
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

var NanoUI = null;

/**
 * Create NanoUI class for browser ui. So tiny UI-framework.
 *
 * <b><i>Note! Only for any-tiny.js.</i></b><br>
 *
 * | Method | Default ver | Tiny ver | Micro ver |
 * |:---|:---:|:---:|:---:|
 * | All methods | - | Yes | - |
 *
 * @function NanoUI
 * @memberof $any.ui
 *
 * @param {function} construct Class constructor and base structure.
 * @param {function|functions} methods Class methods or Function space and class methods. Add methods by prototype.
 * @returns {NanoUI}
 *
 * @see NanoUI
 * @see MicroUI
 * @see $any.ui.MicroUI
 * @see $any@class.makeClass
 *
 * @tutorial static-nanoui
 * @tutorial demo-ui
 *
 * @example
 * var NanoUI = $any.ui.NanoUI();
 * var Panel = $any.ui.NanoUI(function(){ ... }, { method1: ..., method2: ...});
 */
any.ui.NanoUI = function(construct, methods){
	info('NanoUI');

	if (!NanoUI){
		/**
		 * <b><i>Note! Only for any-tiny.js.</i></b><br>
		 * NanoUI is so tiny UI-framework.
		 *
		 * <b>Usecase</b><br>
		 * Use directly or Use by 'extends class'.
		 *
		 * | Method | Default ver | Tiny ver | Micro ver |
		 * |:---|:---:|:---:|:---:|
		 * | All methods | - | Yes | - |
		 *
		 * @class NanoUI
		 *
		 * @param {string} [prefix=''] Prefix.
		 * @param {assoc<string, string>} [target=null] Target type. <b>Type</b> <code>'id'(default), 'form', 'class'</code>.
		 * @param {functions} [filter=null] Value-filter functions.
		 * @param {functions} [mask=null] Value-mask functions.
		 *
		 * @see $any.ui.NanoUI
		 * @see $any@class.makeClass
		 *
		 * @tutorial static-nanoui
		 * @tutorial demo-ui
		 *
		 * @example
		 * var NanoUI = $any.ui.NanoUI();
		 * var nanoui = new NanoUI();
		 * var panel = new ($any.ui.NanoUI(function(){ ... }, { method1: ..., method2: ...}));
		 */
		NanoUI = any.makeClass(function(prefix, targets, filters, masks){
			/**
			 * Element name prefix.
			 * @memberof NanoUI
			 * @protected
			 * @instance
			 * @name _prefix
			 * @type {string}
			 * @default ''
			 *
			 * @see NanoUI#prefix
			 * @tutorial static-nanoui
			 *
			 * @example
			 * var nano = new ($any.ui.NanoUI(function(){ this._prefix = 'prefix'; }, {...});
			 */
			this._prefix = '';

			/**
			 * Connection to prefix and name.
			 * @memberof NanoUI
			 * @protected
			 * @instance
			 * @name _join
			 * @type {string}
			 * @default '-'
			 *
			 * @see NanoUI#prefix
			 * @tutorial static-nanoui
			 */
			this._join = '-';

			this.prefix(prefix);

			/**
			 * Element id for building. If null, id is <i>prefix</i>.
			 * @memberof NanoUI
			 * @protected
			 * @instance
			 * @name _bldid
			 * @type {string}
			 * @default null
			 *
			 * @see NanoUI#_build
			 * @tutorial static-nanoui
			 *
			 * @example
			 * this._bldid = 'targetid';
			 */
			this._bldid = null;

			/**
			 * Assign parameters for building.
			 * @memberof NanoUI
			 * @protected
			 * @instance
			 * @name _blds
			 * @type {assoc}
			 * @default null
			 *
			 * @see NanoUI#build
			 * @see NanoUI#_build
			 * @tutorial static-nanoui
			 */
			this._blds = null;

			/**
			 * Target type. <b>Type</b> <code>'id'(default), 'form', 'class'</code>.
			 * @memberof NanoUI
			 * @protected
			 * @instance
			 * @name _targets
			 * @type {assoc<string, string>}
			 * @default null
			 *
			 * @see NanoUI#targets
			 * @tutorial static-nanoui
			 */
			this._targets = targets || null;

			/**
			 * Value-filters for <i>val</i> / <i>html</i>.
			 * @memberof NanoUI
			 * @protected
			 * @instance
			 * @name _filters
			 * @type {functions}
			 * @default null
			 *
			 * @see NanoUI#filters
			 * @see NanoUI#val
			 * @see NanoUI#html
			 * @tutorial static-nanoui
			 */
			this._filters = filters || null;

			/**
			 * Value-masks.
			 * @memberof NanoUI
			 * @protected
			 * @instance
			 * @name _masks
			 * @type {functions}
			 * @default null
			 *
			 * @see NanoUI#masks
			 * @tutorial static-nanoui
			 */
			this._masks = masks || null;

			/**
			 * Data variable. If use <i>data</i> method, require to initialize <i>_data</i>.
			 * @memberof NanoUI
			 * @protected
			 * @instance
			 * @name _data
			 * @type {assoc}
			 * @default null
			 *
			 * @see NanoUI#data
			 * @tutorial static-nanoui
			 *
			 * @example
			 * var nano = new ($any.ui.NanoUI(function(){ this._data = {}; }, {...});
			 */
			this._data = null;
		}, {
			/**
			 * Set prefix.
			 * @function
			 * @name prefix
			 * @memberof NanoUI
			 * @instance
			 * @param {string} p Prefix name.
			 *
			 * @see NanoUI#_prefix
			 * @tutorial static-nanoui
			 *
			 * @example
			 * nui.prefix('prefix');
			 */
			prefix: function(p){
				this._prefix = p;
			},

			/**
			 * Return name prepended prefix.
			 * @function
			 * @name name
			 * @memberof NanoUI
			 * @instance
			 * @param {string} nm Name.
			 * @returns {string}
			 *
			 * @tutorial static-nanoui
			 *
			 * @example
			 * nui.prefix('prefix');
			 * name = nui.name('name1');
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
			 * @memberof NanoUI
			 * @instance
			 * @param {assoc<string, string>} targets Target types.
			 *
			 * @see NanoUI#_targets
			 * @tutorial static-nanoui
			 *
			 * @example
			 * nui.target({name1: 'class', name2: 'form'});
			 */
			targets: function(targets){
				this._targets = targets;
			},

			/**
			 * Set value-filter functions.
			 * @function
			 * @name filters
			 * @memberof NanoUI
			 * @instance
			 * @param {functions} filters Filter functions. <code>function(v){ ... return v; }</code>
			 *
			 * @see NanoUI#val
			 * @see NanoUI#vals
			 * @see NanoUI#html
			 * @tutorial static-nanoui
			 *
			 * @example
			 * nui.filter({name1: function(v){ ... }});
			 */
			filters: function(filters){
				this._filters = filters;
			},

			/**
			 * Apply filter and return value.
			 * @function
			 * @name filterApply
			 * @memberof NanoUI
			 * @instance
			 *
			 * @param {string} nm Filter name.
			 * @param {*} v Value.
			 * @returns {*}
			 *
			 * @see NanoUI#_filters
			 * @see NanoUI#filters
			 * @see NanoUI#val
			 * @see NanoUI#vals
			 * @tutorial static-nanoui
			 *
			 * @example
			 * v = nui.filterApply('filter1', v);
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
			 * @memberof NanoUI
			 * @instance
			 * @param {functions} masks Mask functions. <code>function(nm, v, opt){ ... return el; }</code>
			 *
			 * @see NanoUI#_masks
			 * @see NanoUI#filters
			 * @see NanoUI#val
			 * @see NanoUI#vals
			 * @tutorial static-nanoui
			 *
			 * @example
			 * nui.masks({name1: function(nm, v, opt){ ... }});
			 */
			masks: function(masks){
				this._masks = masks;
			},

			/**
			 * Set config of target element. <code>target / filter / mask</code>
			 * @function
			 * @name config
			 * @memberof NanoUI
			 * @instance
			 * @param {string} nm Target name.
			 * @param {assoc} [stg=null] Settings. <code> {target: ..., filter: ..., mask: ...}</code>
			 * @param {string} [stg.target=null] Target type.
			 * @param {function} [stg.filter=null] Filter function.
			 * @param {function} [stg.mask=null] Mask function.
			 *
			 * @see NanoUI#targets
			 * @see NanoUI#filters
			 * @see NanoUI#masks
			 * @see NanoUI#val
			 * @see NanoUI#vals
			 * @tutorial static-nanoui
			 *
			 * @example
			 * nui.config('name1', {target: ..., filter: ..., mask: ...});
			 * nui.config('name1', null);
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
			 * @protected
			 * @function _build
			 * @memberof NanoUI
			 * @instance
			 *
			 * @param {function} [bldset] Initialize call function. <i>NanoUI::__bldset</u>
			 * @returns {string}
			 *
			 * @see NanoUI#_bldid
			 * @see NanoUI#_blds
			 * @tutorial static-nanoui
			 *
			 * @example
			 * _build: function(){
			 *  return '<div id="prefix"><div id="{$p}-val"></div>HTML source...</div>';
			 * }
			 * _build: function(bldset){
			 *  request.get(url, function(err, res){ bldset(res); });
			 * }
			 */
			_build: null,

			/**
			 * Set fn and params for building.
			 * @function
			 * @name build
			 * @memberof NanoUI
			 * @instance
			 * @param {function} [fn] Function which return HTML source for building.
			 * @param {assoc} [vs] Assign parameters for building.
			 *
			 * @see NanoUI#_build
			 * @see NanoUI#_blds
			 * @tutorial static-nanoui
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
			 * @memberof NanoUI
			 * @instance
			 *
			 * @see NanoUI#_init
			 * @tutorial static-nanoui
			 *
			 * @example
			 * nui.init();
			 */
			init: function(){
				if (this._build){
					var s = this._build(this.bind(this.__bldset));

					if (s){
						if (typeof s === 'string'){
							this.__bldset(s);
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
			 * @memberof NanoUI
			 * @instance
			 *
			 * @see NanoUI#init
			 * @tutorial static-nanoui
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
				var c = document.getElementById((this._bldid)?this._bldid:this._prefix);

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
				if (this._init){
					this._init();
				}
			},

			/**
			 * Set value to element. and get value.
			 * @function
			 * @name val
			 * @memberof NanoUI
			 * @instance
			 * @param {string|Element|NodeList} nm Target name. If <i>prefix</i> is specified, prepend prefix automatically.
			 * @param {number|string} [v] Value. If v is undefined, get value.
			 * @param {assoc} [opt=null] Options.
			 * @returns {NanoUI|number|string}
			 *
			 * @see NanoUI#take
			 * @see NanoUI#filters
			 * @see NanoUI#masks
			 * @tutorial static-nanoui
			 *
			 * @example
			 * nui.val('name1', 1);
			 * nui.val('name1', 1, opt);
			 * v = nui.val('name1');
			 */
			val: function(nm, v){
				if (v !== undefined) {
					if(this._filters && this._filters[nm]) {
						v = this._filters[nm].call(this, v);
					}

					if(this._masks && this._masks[nm]) {
						return this._masks[nm].call(this, nm, v);
					}
				}

				this.__apply(nm, this.__val, v);

				return this;
			},

			/**
			 * @ignore
			 */
			__val: function(c, v){
				c.value = v;
			},

			/**
			 * Set values to element.
			 * @function
			 * @name vals
			 * @memberof NanoUI
			 * @instance
			 * @param {assoc<string, number|string>} [vs] Name and value assoc.
			 * @param {assoc} [opt=null] Options.
			 *
			 * @see NanoUI#val
			 * @see NanoUI#filters
			 * @see NanoUI#masks
			 * @tutorial static-nanoui
			 *
			 * @example
			 * nui.vals({name1: 1, name2: 2});
			 */
			vals: function(vs, opt){
				for (var k in vs){
					if (vs.hasOwnProperty(vs[k])){
						this.val(k, vs[k], opt);
					}
				}
			},

			/**
			 * Set value to element by innerHTML.
			 * @function
			 * @name html
			 * @memberof NanoUI
			 * @instance
			 * @param {string|Element|NodeList} nm Target name. If <i>prefix</i> is specified, prepend prefix automatically.
			 * @param {number|string} [v] Value.
			 * @returns {NanoUI}
			 *
			 * @see NanoUI#take
			 * @see NanoUI#html
			 * @tutorial static-nanoui
			 *
			 * @example
			 * nui.html('name1', 'Stone');
			 */
			html: function(nm, v){
				if(this._filters && this._filters[nm]) {
					v = this._filters[nm].call(this, v);
				}

				this.__apply(nm, this.__html, v);

				return this;
			},

			/**
			 * @ignore
			 */
			__html: function(c, v){
				c.innerHTML = v;
			},

			/**
			 * Set view-state by Css display.
			 * @function
			 * @name view
			 * @memberof NanoUI
			 * @instance
			 * @param {string|Element|NodeList} nm Target name. If <i>prefix</i> is specified, prepend prefix automatically.
			 * @param {boolean} [v] Show / hide.
			 * @param {string} [prop] Css display style value.
			 * @returns {NanoUI}
			 *
			 * @see NanoUI#take
			 * @tutorial static-nanoui
			 *
			 * @example
			 * nui.view('name1', 123, opt);
			 */
			view: function(nm, v, prop){
				this.__apply(nm, this.__view, v, prop);

				return this;
			},

			/**
			 * @ignore
			 */
			__view: function(c, v, w){
				if (w === undefined){
					w = (c.tagName.toLowerCase().search(/^(div|p|form|table|h\d)$/) !== -1)?'block':'inline';
				}

				c.style.display = (v)?w:'none';
			},

			/**
			 * Bind click by onclick.
			 * @function
			 * @name click
			 * @memberof NanoUI
			 * @instance
			 * @param {string|Element|NodeList} nm Target name. If <i>prefix</i> is specified, prepend prefix automatically.
			 * @param {function} fn Callback function.
			 * @param {boolean} [unbind=false] If true, not use <i>bind</i> method.
			 * @returns {NanoUI}
			 *
			 * @see NanoUI#take
			 * @tutorial static-nanoui
			 *
			 * @example
			 * nui.click('name1', function(){ ... });
			 * nui.click('name1', function(){ ... }, true);
			 */
			click: function(nm, fn, unbind){
				this.__apply(nm, this.__click, this.__bind(fn, unbind));

				return this;
			},

			/**
			 * @ignore
			 */
			__click: function(c, fn){
				c.onclick = fn;
			},

			/**
			 * Bind changing by onchange.
			 * @function
			 * @name change
			 * @memberof NanoUI
			 * @instance
			 * @param {string|Element|NodeList} nm Target name. If <i>prefix</i> is specified, prepend prefix automatically.
			 * @param {function} fn Callback function.
			 * @param {boolean} [unbind=false] If true, not use <i>bind</i> method.
			 * @returns {NanoUI}
			 *
			 * @see NanoUI#take
			 * @tutorial static-nanoui
			 *
			 * @example
			 * nui.change('name1', function(){ ... });
			 * nui.change('name1', function(){ ... }, true);
			 */
			change: function(nm, fn, unbind){
				this.__apply(nm, this.__change, this.__bind(fn, unbind));

				return this;
			},

			/**
			 * @ignore
			 */
			__change: function(c, fn){
				c.onchange = fn;
			},

			/**
			 * Bind event by <i>on event</i>.
			 * @function
			 * @name on
			 * @memberof NanoUI
			 * @instance
			 * @param {string|Element|NodeList} nm Target name. If <i>prefix</i> is specified, prepend prefix automatically.
			 * @param {string} event Event.
			 * @param {function} fn Callback function.
			 * @param {boolean} [unbind=false] If true, not use <i>bind</i> method.
			 * @returns {NanoUI}
			 *
			 * @see NanoUI#take
			 * @tutorial static-nanoui
			 *
			 * @example
			 * nui.on('name1', 'mouseover', function(){ ... });
			 * nui.on('name1', 'mouseover', function(){ ... }, true);
			 */
			on: function(nm, event, fn, unbind){
				this.__apply(nm, this.__on, event, this.__bind(fn, unbind));

				return this;
			},

			/**
			 * @ignore
			 */
			__on: function(c, ev, fn){
				c['on' + ev] = fn;
			},

			/**
			 * @ignore
			 */
			__bind: function(fn, b){
				return (b)?fn:this.bind(fn);
			},

			/**
			 * Take element by name with prefix. Provide auto-selector by <i>prefix</i> and <i>target</i>. If <i>form</i> or <i>class</i>, return NodeList.
			 *
			 * <b>Specification</b><br>
			 * Internal use: <code>_prefix</code> <code>_targets</code>
			 *
			 * @function
			 * @name take
			 * @memberof NanoUI
			 * @instance
			 * @param {string} nm Element name.
			 * @param {string|function} type Target type. <b>Type</b> <code>'id'(default), 'form', 'class'</code>
			 * @returns {Element|NodeList}
			 *
			 * @see NanoUI#prefix
			 * @see NanoUI#targets
			 * @tutorial static-nanoui
			 *
			 * @example
			 * nui.take('name1').innerHTML('sample');
			 * nui.take('name2', 'class')[0].innerHTML('sample');
			 * nui.take('name3', 'form')[0].innerHTML('sample');
			 */
			take: function(nm, type){
				var t = this.name(nm);

				type = type || ((this._targets)?this._targets[nm]:null);

				if (type){
					switch (type){
					case 'form':
						return document.getElementsByName(t);
						break;
					case 'class':
						return document.getElementsByClassName(t);
						break;
					//case 'id':
					default:
						break;
					}
				}

				return document.getElementById(t);
			},

			/**
			 * @ignore
			 */
			__take: function(nm, type){
				if (typeof nm === 'object'){
					return nm;
				}

				return this.take(nm , type);
			},

			/**
			 * Return element by selector expression.
			 *
			 * @function
			 * @name selector
			 * @memberof NanoUI
			 * @instance
			 * @param {string} qs Selector expression.
			 * @returns {NodeList}
			 *
			 * @tutorial static-nanoui
			 *
			 * @example
			 * el = nui.query('#name1');
			 */
			selector: function(qs){
				return document.querySelectorAll(qs);
			},

			/**
			 * Set to data and get from data. This method use <i>_data</i>. Require to initialize <i>_data</i> before using method.
			 *
			 * @function
			 * @name data
			 * @memberof NanoUI
			 * @instance
			 * @param {string} nm Element name.
			 * @returns {*}
			 *
			 * @see NanoUI#_data
			 * @tutorial static-nanoui
			 *
			 * @example
			 * v = nui.data('v1');
			 * nui.data('v1', 123);
			 */
			data: function(key, v){
				if (!this._data){
					console.error('_data is null.');
					return;
				}

				return any.data(this._data, key, v);
			},

			/**
			 * @ignore
			 */
			__apply: function(nm, link, v, w){
				var c = this.__take(nm);

				if (c.nodeType === 1){
					link(c, v, w);
				}else if (c){	//NodeList
					for (var i=0;i<c.length;i++){
						link(c[i], v, w);
					}
				}else{
					console.error('element none: ' + nm);
				}
			}
		}, null, true);
	}

	if (construct || methods){
		return any.makeClass(construct, methods, NanoUI, false);
	}

	return NanoUI;
};

})($any);
