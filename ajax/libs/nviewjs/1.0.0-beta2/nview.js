/*!
 * nviewjs  ver 1.0.0 beta2 - nview.js
 * (c) 2016, any-js - https://github.com/any-js/nviewjs/  (Released under the MIT license)
 */
var $nview = $any.profile.create();

(function(nview, $){
'use strict';

/**
 * The jQuery plugin namespace.
 * @namespace jQuery.fn
 * @see {@link http://docs.jquery.com/Plugins/Authoring The jQuery Plugin Guide}
 */

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

/**
 * Common private methods
 * @ignore
 */

function info(nm, msg){
	if ($any.define.info <= 0){
		return;
	}

	$any.log.info('nview', arguments);
}

function error(nm, msg){
	if ($any.define.error <= 0){
		return;
	}

	$any.log.error('nview', arguments);
}

function ck(c){
	if (!c.length && $any.define.targetExist){
		error('target none', c);
	}
}

var ext = $any.extend;

function str(v){
	return (v == null)?'':String(v);
}

function stripNum(v){
	return str(v).replace(/[\s,]/g, '');
}

function trim(v){
	return v.replace(/^(\s)+|(\s)+$/g, '');
}

function trimn(v, emptyStr) {
	if (v != null){
		v = trim(v);
	}

	if (!v) {
		return (emptyStr)?'':null;
	}

	return v;
}

function keys(nm){
	return String(nm).split('.').map(trim);
}

function splitArr(v, sep, noempty, notrim){
	if (v == null) {
		return [];
	}

	v = v.split(sep);

	if (!notrim){
		v = v.map(trim);
	}

	if (noempty) {
		v = $.grep(v, function(e) {
			return e;
		});
	}

	return v;
}

function splitRx(v, sep, noempty){
	if (typeof v === 'object'){
		return v;
	}

	v = str(v);

	return splitArr(v, new RegExp(sep), noempty, true);
}

function applyVs(v, fn, c) {
	if (typeof v === 'string') {
		return fn(-1, v, c);
	}

	var vs = {};

	$any.each(v, function(i, k) {
		vs[k] = fn(i, k, c);
	});

	return vs;
}

function applyKVs(k, v, fn, c) {
	if (k instanceof Object) {
		$any.each(k, function(k, v) {
			fn(k, v, c);
		});
	} else {
		fn(k, v, c);
	}
}

function eachVs(nms, fn, nv) {
	if (nms == null) {
		$any.each(nv.vs, function(k, v) {
			fn(k, nv);
		});
	} else {
		applyVs(nms, function(i, k, c) {
			fn(k, nv);
		}, null);
	}
}

function evalArg(src, vs){
	var fn, v = null;

	try {
		fn = new Function('v', 'return [' + src + '];');

		v = fn(vs);
	} catch(e) {
		error(null, null, 'syntax(eval)',  src);
	}

	return v;
}

function permitNm(nm, place) {
	if (!nm.match(/^[0-9a-z][0-9a-z_\-\.]*$/i)) {
		error(null, null, 'variable in ' + place, nm);
		nm = null;
	}

	return nm;
}

function setNm(c, nm, v){
	setAtr(c, 'name', nm);

	c.addClass(clsNm(nm));

	addCls(c, v);
}

function parseStmt(param, params){
	if (param == null){
		return '';
	}

	var r='', i=0, ro, tv;
	var rxq= new RegExp('(\'[^\']+\'|"[^"]+"|{[^{}]+}|\\[[^\\[\\]]+\\])', 'g'), rxp=/([a-z][a-z0-9_\.]*?)\s*([^a-z0-9_\.\(]|$)/ig;

	function parse(begin, end){
		tv = param.slice(begin, end);

		tv = tv.replace(rxp, function(vv, v){
			if (v == 'true' || v == 'false'){
				return vv;
			}

			params.push(v);

			return 'v.' + vv;
		});

		return tv;
	}

	while ((ro=rxq.exec(param)) != null){
		r+=parse(i, ro.index) + ro[0];
		i = rxq.lastIndex;
	}

	r+=parse(i);

	return r;
}

function createIsFn(cond){
	return new Function('v', 'return (' + cond + ');');
}

function getNm(c, force) {
	var nm = getAtr(c, 'name');

	if (nm == '*' || !nm && (force || hasCls(c, 'in'))){
		nm = c.prop('name') || c.prop('id');
	}

	if (nm == null) {
		return null;
	}

	return permitNm(nm, 'bind');
}

function doAtrFn(c, type, mtds, vs, v, e, fn){
	var fns = splitAtrFn(c, atr(type));

	return atrFns(c, type, fns, mtds, vs, v, e, fn);
}

function atrFns(c, type, fns, mtds, vs, v, e, vfn){
	var stmt, fn, arg, params, src;

	vfn = vfn || function(v){return v;};

	if (fns[0] == 'none'){
		fns.shift();
	}else{
		v = mtds.base(v, e);
	}

	if (fns.length > 0) {
		$any.each(fns, function(k, fl) {
			stmt = fl.match(/^([^\(\)]+)(?:|\s*\((.*?)\))$/);
			fn = trimn(stmt[1]);

			if(fn && mtds[fn]) {
				params = [];

				src = stmt[2];

				if(vs != null) {
					src = parseStmt(src, params);
				}

				arg = [v, e].concat(evalArg(src, vs));

				v = vfn(mtds[fn].apply(mtds, arg), v);
			}else{
				error('#' + type, c, 'unknown func', fn, v, mtds);
			}
		});

		info('@' + type, c, fns, v);
	}

	return v;
}

function splitAtrFn(c, atr){
	return splitArr(c.attr(atr), '|', true);
}

/**
 * Attribute and class
 * @ignore
 */

/**
 * Attribute names.
 * @ignore
 */
var nvAtr=[
	'name',
	'event', 'validate', 'alter', 'val',
	'attr', 'filter',
	'act', 'profile',
	'mtd-fn', 'mtd-arg'
];

/**
 * Class names.
 * @ignore
 */
var nvCls=[
	'v',
	'in', 'out',
	'mtd'
];

/**
 * Data attribute names.
 * @ignore
 */
var nvData=[
	'atrs', 'mtd'
];


function atr(nm){
	return nview.prefix.atr + '-' + nm;
}

function getAtr(c, nm, emptyStr){
	return trimn(c.attr(atr(nm)), emptyStr);
}

function setAtr(c, nm, v){
	c.attr(atr(nm), v);
}

function setAtrs(c, nm, v){
	var tv = getAtr(c, nm, true);

	tv = tv.replace(/\|$/, '', tv) + '|' + v;

	c.attr(atr(nm), tv);
}

function dataAtr(nm){
	return nview.prefix.data + '-' + nm;
}

function cls(nm) {
	return nview.prefix.cls + '-' + nm;
}

function clsBy(prefix ,v, dot){
	if (dot){
		prefix = '.' + prefix;
	}

	return prefix + '-' + v;
}

function addCls(c, nm){
	c.addClass(cls(nm));
}

function hasCls(c, nm){
	return c.hasClass(cls(nm));
}

function clsNm(nm){
	nm = 'v-' + nm.replace(/\./g, '_');

	return cls(nm);
}

function clsEachV(nm){
	return cls('ev-' + nm);
}

function clsMtdNm(nm){
	return cls('m-' + nm);
}

function getData(c, nm){
	return c.data(dataAtr(nm));
}

function setData(c, nm, v){
	c.data(dataAtr(nm), v);
}

function atrOutVar(nm){
	return '{' + nm + '}';
}

/**
 * $nview : any-view private
 * @ignore
 */

/**
 * @ignore
 */
function getV(nv, nm){
	var c = $('.' + clsNm(nm) + ':input', nv.el);

	return getVByEl(nv, nm, c);
}

/**
 * @ignore
 */
function takeVs(nv, nm){
	if (nm != null){
		return applyVs(nm, function(i, k, nv){
			return getV(nv, k);
		}, nv);
	}

	var vs = {}, c;

	$('.' + cls('in') + ':input', nv.el).each(function(){
		c = $(this);

		nm = getAtr(c, 'name');
		if (nm != null){
			vs[nm] = getVByEl(nv, nm, c);
		}
	});

	return vs;
}

/**
 * @ignore
 */
function getVByEl(nv, nm, c){
	var v = null;

	if (c.length != 0) {
		v = nv.nvIn.valget(c);
		v = eventFn(c, nv.nvIn, nm, v, 'get', null);

		$any.set(nv.vs, nm, v);
	}

	return v;
}

/**
 * @ignore
 */
function setV(nv, nm, v, e, opt){
	v = $any.set(nv.vs, nm, v);

	if (!opt.child) {
		assignV(nv, nm, v, e, opt);
	}else{
		assignVs(nv, nm, v, e, opt);
	}
}

/**
 * @ignore
 */
function getAtrOut(c, nm){
	if (getAtr(c, 'attr') !== null) {
		var atrs = getData(c, 'atrs');

		if (atrs && atrs[nm] !== undefined) {
			return atrs[nm];
		}
	}

	return null;
}

/**
 * Assign for value
 * @ignore
 */
function assignV(nv, nm, v, e, o){
	var tv, cs, c, ev=null, atro;

	cs = $('.' + clsNm(nm), nv.el);

	info('@assign', cs, nm, v);

	//for NvAct
	nv.nvAct.perform(nm, v, nv.vs);

	//Set input
	if (typeof e != 'object'){
		if (o.input){
			cs.filter('.' + cls('in')).each(function(){
				c = $(this);

				if (e){
					nv.nvIn.valset(c, v);
				}

				ev = this;

				if (o.verify){
					v = eventFn(c, nv.nvIn, nm, v, 'set', ev);
				}
			});
		}
	}else{
		ev = e;
	}

	//Set output
	if (o.output){
		cs.filter('.' + cls('out')).each(function(){
			c = $(this);
			tv = v;

			atro = getAtrOut(c, nm, true);

			if (atro !== null){
				if (o.filter){
					tv = filterFns(c.get(0), atro.fns, nv.nvOut, nm, v, nv.vs, ev);
				}

				c.attr(atro.atr, tv);
			}else{
				if (o.filter){
					tv = filterFn(c, nv.nvOut, nm, v, nv.vs, ev);
				}

				nv.nvOut.valset(c, tv);
			}
		});
	}
}

/**
 * Assign for array
 * @ignore
 */
function assignVs(nv, nm, v, e, o){
	//Remove child assigned value
	var rx = new RegExp('(^|\\s)' + clsNm(nm) + '_');

	$('.' + cls('out'), nv.el).filter(function() {
		return rx.test(this.className);
	}).each(function(){
		$(this).html('');
	});

	function recurs(nm, v) {
		if (v instanceof Object) {
			$any.each(v, function(k, v) {
				recurs(nm + '.' + k, v);
			});
		}else{
			assignV(nv, nm, v, e, o);
		}
	}

	recurs(nm, v);
}

/**
 * @ignore
 */
function removeV(nv, k){
	nv.assignAll(k, null);

	delete nv.vs[k];
}

/**
 * @ignore
 */
function flushV(nv, nm, o){
	var v = $any.get(nv.vs, nm);

	if (!(v instanceof Object) || !o.child) {
		assignV(nv, nm, v, false, o);
	}else{
		assignVs(nv, nm, v, false, o);
	}
}

/**
 * @ignore
 */
function applyToEach(el, o, fn, p){
	o = ext({}, o);

	var cs = $(el), c, nm;

	if (cs.length > 0){
		cs.each(function(){
			c = $(this);

			nm = o.name || getNm(c, true);
			setNm(c, nm, p);

			fn(c, nm, o);
		});
	}

	return cs;
}

/**
 * @ignore
 */
function applyIn(cs, o){
	function fn(c, nm, o){
		if (o.event != null){
			setAtr(c, 'event', o.event);
		}

		if (o.validate != null){
			setAtrs(c, 'validate', o.validate);
		}

		if (o.alter != null){
			setAtrs(c, 'alter', o.alter);
		}

		if (o.val != null){
			setAtr(c, 'val', o.val);
		}
	}

	return applyToEach(cs, o, fn, 'in');
}

/**
 * @ignore
 */
function applyOut(cs, o){
	function fn(c, nm, o){
		if (o.filter) {
			setAtrs(c, 'filter', o.filter);
		}

		if (o.attr){
			setAtr(c, 'attr', 1);
			c.attr(o.attr, atrOutVar(nm));
		}
	}

	return applyToEach(cs, o, fn, 'out');
}

/**
 * Any view($nview) static methods.
 *
 * @namespace $nview
 *
 */

/* global applyIn: false */
/* global applyOut: false */

/**
 * Attribute prefix
 * @name prefix
 * @memberof $nview
 *
 * @type {assoc}
 * @property {string} [atr='nv'] Element attirbute prefix.<br>ex:) nv, data, data-nv
 * @property {string} [data='nv'] Data attirbute prefix.
 * @property {string} [cls='nv'] Class prefix.
 *
 * @example
 * $nview.prefix.atr = 'nv';
 * $nview.prefix.data = 'nv';
 * $nview.prefix.cls = 'nv';
 */
nview.prefix = {
	atr: 'nv',	//ex: nv, data, data-nv
	data: 'nv',
	cls: 'nv'
};

/**
 * Apply input to target by rule.
 * @function applyIn
 * @memberof $nview
 *
 * @param {Selector} target Target.
 * @param {assoc} rule Rules.
 *
 * @tutorial apply-noparse
 * @example
$nview.applyIn('.target');
$nview.applyIn('#in1', {name: 'txt1'});
$nview.applyIn({
 '#in2': {name: 'txt2', event: 'change'},
 '#in3': {name: 'click3', event: 'hover'}
});
 */
nview.applyIn = function(target, rule) {
	applyKVs(target, rule, applyIn, null);

	info('nv.applyIn', target, rule);
};

/**
 * Apply output to target by rule.
 * @function applyOut
 * @memberof $nview
 *
 * @param {Selector} target Target.
 * @param {assoc} rule Rules.
 *
 * @tutorial apply-noparse
 * @example
$nview.applyOut('.target');
$nview.applyOut('#out1', {name: 'txt1', filter: 'text'});
$nview.applyOut({
 '#out2': {name: 'txt2', filter: 'text'},
 '#out3': {name: 'txt3', filter: 'number'}
});
 */
nview.applyOut = function(target, rule) {
	applyKVs(target, rule, applyOut, null);

	info('nv.applyOut', target, rule);
};

/**
 * Return class name.
 * @function className
 * @memberof $nview
 *
 * @param {string} name Name.
 * @returns {string}
 */
nview.className = function(name) {
	return clsNm(name);
};

/**
 * Return attr name.
 * @function attrName
 * @memberof $nview
 *
 * @param {string} name Name.
 * @returns {string}
 */
nview.attrName = function(name) {
	return atr(name);
};

/**
 * Pause motion in function.
 * @function pause
 * @memberof $nview
 *
 * @param {function} func Function.
 *
 * @see $any.motion.pause
 *
 * @tutorial static-nv
 * @example
 * $nview.pause(function(){
 *   nv = $('#target').nview().sync();
 * });
 */
nview.pause = function(func) {
	$any.motion.pause(func);
};

/**
 * Suspend motion.
 * @function suspend
 * @memberof $nview
 *
 * @see $any.motion.suspend
 *
 * @tutorial static-nv
 * @example
 * $nview.suspend();
 * $('#target').nview({}).sync();
 * $nview.resume();
 */
nview.suspend = function() {
	$any.motion.suspend();
};

/**
 * Resume motion.
 * @function resume
 * @memberof $nview
 *
 * @see $any.motion.resume
 *
 * @tutorial static-nv
 * @example
 * $nview.suspend();
 * $('#target').nview({}).sync();
 * $nview.resume();
 */
nview.resume = function() {
	$any.motion.resume();
};

/**
 * Set debug behaviors and limit 'ajax'.
 * @function debug
 * @memberof $nview
 *
 * @see $any.log.debug
 * @see $any.log.limit
 *
 * @tutorial static-nv
 * @example
 * $nview.debug(1);     //info
 * $nview.debug(0, 2); //error + trace
 */
nview.debug = function(info, error) {
	$any.log.limit(null, null, 'view');

	$any.log.debug(info, error);
};

/**
 * $nview : any-view class
 */

/* global NvIn: false */
/* global NvOut: false */
/* global NvMethod: false */
/* global NvAct: false */

/* global removeV */
/* global assignOpt: false */
/* global assignV: false */
/* global assignVs: false */
/* global setV: false */
/* global takeVs: false */
/* global getV: false */
/* global flushV: false */
/* global runMethod: false */

/**
 * Assign option.
 * @memberof NvManager
 * @typedef {assoc} assignOpt
 * @property {boolean} [child=false] Assign to child element by assoc.
 * @property {boolean} [input=true] Assign to input element.
 * @property {boolean} [verify=false] Assign after running input-verify.
 * @property {boolean} [output=true] Assign to output element.
 * @property {boolean} [filter=true] Assign after running output-filter.
 * @example
 * {
 *  child: false,
 *  input: true,
 *  verify: false,
 *  output: true,
 *  filter: true
 * }
 */
function assignOpt(o){
	return ext({
		input: true,
		verify: false,

		output: true,
		filter: true
	}, o);
}

/**
 * Nv management class, created by $.fn.nview.
 * @class
 *
 * @param el {jQuery}
 * @param nvIn {NvIn}
 * @param nvOut {NvOut}
 * @param nvMethod {NvMethod}
 * @param nvAct {NvAct}
 * @see jQuery.fn#nview
 *
 * @tutorial basic
 * @tutorial value
 *
 * @example
 * nv = $("#example").nview({}); //nv is NvManager.
 */
var NvManager = {
	el: null, vs: null,
	nvIn: null, nvOut: null, nvMethod: null, nvAct: null,

	/**
	 * Initialize
	 * @ignore
	 */
	initialize: function(el, nvIn, nvOut, nvMethod, nvAct){
		this.el = el;
		this.vs = {};

		this.nvIn = $.extend(true, {}, NvIn, nvIn);
		this.nvOut = $.extend(true, {}, NvOut, nvOut);

		this.nvMethod = $.extend(true, {}, NvMethod, nvMethod);
		this.nvMethod.vs = this.vs;

		this.nvAct = $.extend(true, {}, NvAct, nvAct);
	},

	/**
	 * Get value.
	 * @instance
	 * @memberof NvManager
	 * @param {string|array} [name]
	 * @param {string} name.string Return single value {*}.
	 * @param {array} name.array Return multiple values {assoc}.
	 * @return {*|assoc}
	 *
	 * @tutorial value
	 * @example
	 * v = nv.get('abc');           //Single
	 * vs = nv.get(['a','b','c']);  //Multiple
	 * vs = nv.get();               //All
	 */
	get: function(name) {
		var r;

		if (name == null){
			r = this.vs;
		}else{
			r = applyVs(name, function(i, k, nv){
				return $any.get(nv.vs, k);
			}, this);
		}

		info('NvManager.get', this);

		return r;
	},

	/**
	 * Set value.
	 * @instance
	 * @memberof NvManager
	 * @param {string|assoc} name
	 * @param {string} name.string Set value name.
	 * @param {assoc} name.assoc Set multiple values.
	 * @param {*} [v] Set single value.
	 * @param {boolean} [emptyOnly=false] Set value only if empty.
	 * @return {NvManager}
	 *
	 * @tutorial value
	 * @example
	 * nv.set('abc', 1);             //Single
	 * nv.set({a:1, b:2, c:3});  //Multiple
	 */
	set: function(name, v, emptyOnly) {
		info('NvManager.set', this);

		applyKVs(name, v, function(k, v, nv){
			$any.set(nv.vs, k, v, emptyOnly);
		}, this);

		return this;
	},

	/**
	 * Set value only if empty. "set" alias.
	 * @instance
	 * @memberof NvManager
	 * @param {string|assoc} name
	 * @param {string} name.string Set value name.
	 * @param {assoc} name.assoc Set multiple values.
	 * @param {*} [v] Set single value.
	 * @return {NvManager}
	 *
	 * @tutorial value
	 * @example
	 * nv.add('abc', 1);             //Single
	 * nv.add({a:1, b:2, c:3});  //Multiple
	 */
	add: function(name, v) {
		info('NvManager.add', this);

		applyKVs(name, v, function(k, v, nv){
			$any.set(nv.vs, k, v, true);
		}, this);

		return this;
	},

	/**
	 * Assign value to input and output.
	 * @instance
	 * @param {string|assoc} name
	 * @param {*} v Value.
	 * @param {boolean} child Assign to child element by assoc.
	 * @property {assoc} [opt] Option.
	 * @property {boolean} [opt.child=false] Assign to child element by assoc.
	 * @property {boolean} [opt.input=true] Assign to input element.
	 * @property {boolean} [opt.verify=false] Assign after running input-verify.
	 * @property {boolean} [opt.output=true] Assign to output element.
	 * @property {boolean} [opt.filter=true] Assign after running output-filter.
	 * @returns {NvManager}
	 *
	 * @tutorial value
	 * @example
	 * nv.assign('a1', 'ABC');
	 * nv.assign('a2', 'XYZ');
	 * nv.assign('a3', ['Al3+', 'Ca2+', 'Ag+', 'K+', 'Mg2+', 'Na+'], {child: true});
	 * nv.assign('a3.6', 'O2-');
	 * nv.assign({a:'A1', b:'A2', c:'A3'});
	 */
	assign: function(name, v, opt) {
		info('NvManager.assign', this);

		opt = assignOpt(opt);

		applyKVs(name, v, function(k, v, nv) {
			setV(nv, k, v, true, opt);
		}, this);

		return this;
	},

	/**
	 * Assign all - apply to children.
	 * @instance
	 * @property {assoc} [opt] Option.
	 * @property {boolean} [opt.input=true] Assign to input element.
	 * @property {boolean} [opt.verify=false] Assign after running input-verify.
	 * @property {boolean} [opt.output=true] Assign to output element.
	 * @property {boolean} [opt.filter=true] Assign after running output-filter.
	 * @returns {NvManager}
	 *
	 * @tutorial basic
	 * @example
	 * nv.assignAll('a1', [a:'Al3+', b:'Ca2+', c:'Ag+', d:'K+']);
	 * nv.assignAll('a1', [a:1, b:2, c:3], {filter: false});
	 * nv.assignAll({x:{a:1, b:2}, y:{a:1, b:2}}, null, {filter: false});
	 */
	assignAll: function(name, v, opt) {
		info('NvManager.assignAll', this);

		opt = opt || {};
		opt.child = true;

		$any.log.suspend();

		this.assign(name, v, opt);

		$any.log.resume();

		return this;
	},

	/**
	 * Take input values and return values.
	 * @instance
	 * @param {string|array} name Name
	 * @returns {*}
	 *
	 * @tutorial value
	 */
	take: function(name) {
		var r = takeVs(this, name);

		info('NvManager.take', this);

		return r;
	},

	/**
	 * Flush variables to elements.
	 * @instance
	 * @param {string|array} name Name
	 * @property {assoc} [opt] Option.
	 * @property {boolean} [opt.run=true] Run view method.
	 * @property {boolean} [opt.suspend=true] Suspend motion.
	 * @property {boolean} [opt.child=false] Assign to child element by assoc.
	 * @property {boolean} [opt.input=true] Assign to input element.
	 * @property {boolean} [opt.verify=false] Assign after running input-verify.
	 * @property {boolean} [opt.output=true] Assign to output element.
	 * @property {boolean} [opt.filter=true] Assign after running output-filter.
	 * @returns {NvManager}
	 *
	 * @tutorial basic
	 * @example
	 * nv.flush();
	 * nv.flush(['a', 'b', 'c']);
	 */
	flush: function(name, opt) {
		info('NvManager.flush', this);

		opt = assignOpt(opt);

		eachVs(name, function(nm, nv) {
			flushV(nv, nm, opt);
		}, this);

		return this;
	},

	/**
	 * Synchronize - take input values and flush values and run method with motion-suspend.
	 * @instance
	 * @param {string|array} name Name
	 * @property {assoc} [opt] Option.
	 * @property {boolean} [opt.run=true] Run view method.
	 * @property {boolean} [opt.suspend=true] Suspend motion.
	 * @property {boolean} [opt.child=false] Assign to child element by assoc.
	 * @property {boolean} [opt.input=true] Assign to input element.
	 * @property {boolean} [opt.verify=false] Assign after running input-verify.
	 * @property {boolean} [opt.output=true] Assign to output element.
	 * @property {boolean} [opt.filter=true] Assign after running output-filter.
	 * @returns {NvManager}
	 *
	 * @tutorial basic
	 * @tutorial output
	 * @example
	 * nv.sync();
	 * nv.sync('abc', {child: true, run: false});
	 * nv.sync('abc', {input: false, filter: false});
	 * nv.sync(null, {suspend: false});
	 */
	sync: function(name, opt) {
		info('NvManager.sync', this);

		opt = ext({run: true, suspend: true}, opt);

		$any.log.suspend();

		var o = this;

		function sync(){
			o.take(name);
			o.flush(name, opt);

			if (opt.run){
				o.run();
			}
		}

		if (opt.suspend){
			nview.pause(sync);
		}else{
			sync();
		}

		$any.log.resume();

		return this;
	},

	/**
	 * Synchronize all - apply to children.
	 * @instance
	 * @property {assoc} [opt] Option.
	 * @property {boolean} [opt.input=true] Assign to input element.
	 * @property {boolean} [opt.verify=false] Assign after running input-verify.
	 * @property {boolean} [opt.output=true] Assign to output element.
	 * @property {boolean} [opt.filter=true] Assign after running output-filter.
	 * @returns {NvManager}
	 *
	 * @tutorial basic
	 * @example
	 * nv.syncAll();
	 * nv.syncAll({input: false});
	 */
	syncAll: function(opt) {
		info('NvManager.syncAll', this);

		opt = opt || {};
		opt.child = true;

		$any.log.suspend();

		this.sync(null, opt);

		$any.log.resume();

		return this;
	},

	/**
	 * Remove value.
	 * @instance
	 * @param {string|array} name Name
	 * @returns {NvManager}
	 *
	 * @tutorial basic
	 */
	remove: function(name) {
		info('NvManager.remove', this);

		applyVs(name, function(i, k, nv) {
			removeV(nv, k);
		}, this);

		return this;
	},

	/**
	 * Empty all values.
	 * @instance
	 * @returns {NvManager}
	 *
	 * @tutorial basic
	 */
	empty: function() {
		info('NvManager.empty', this);

		eachVs(null, function(nm, nv) {
			nv.remove(nm);
		}, this);

		return this;
	},

	/**
	 * Set input attach.
	 * @instance
	 * @param {string|functions} name Name
	 * @param {function} [fn] Functions
	 * @returns {NvManager}
	 *
	 * @see NvIn#attach
	 * @tutorial basic
	 * @tutorial input
	 * @example
	 * nv.attachIn('abc', function(v, type, e){
    *  console.log(v);
    * });
	 * nv.attachIn({
    *  abc: function(v, type, e){
    *    console.log(v);
    *  }
    * });
	 */
	attachIn: function(name, fn) {
		info('NvManager.attachIn', this);

		applyKVs(name, fn, function(k, v, nv) {
			nv.nvIn.attach[k] = v;
		}, this);

		return this;
	},

	/**
	 * Set output attach.
	 * @instance
	 * @param {string|functions} name Name
	 * @param {function} [fn] Functions
	 * @returns {NvManager}
	 *
	 * @see NvOut#attach
	 * @tutorial basic
	 * @tutorial output
	 * @example
	 * nv.attachOut('abc', function(v){
    *  console.log(v);
    * });
	 * nv.attachOut({
    *  abc: function(v){
    *    console.log(v);
    *  }
    * });
	 */
	attachOut: function(name, fn) {
		info('NvManager.attachOut', this);

		applyKVs(name, fn, function(k, v, nv) {
			nv.nvOut.attach[k] = v;
		}, this);

		return this;
	},

	/**
	 * Add filter func.
	 * @instance
	 * @param {string|functions} name Name
	 * @param {function} [fn] Functions
	 * @returns {NvManager}
	 *
	 * @tutorial output
	 * @example
	 * nv.filterFunc('abc', function(v){
    *  return v;
    * });
	 * nv.filterFunc({
    *  abc: function(v){
    *    return v;
    *  }
    * });
	 */
	filterFunc: function(name, fn) {
		info('NvManager.filterFunc', this);

		applyKVs(name, fn, function(k, v, nv) {
			nv.nvOut.filter[k] = v;
		}, this);

		return this;
	},

	/**
	 * Set view method.
	 * @instance
	 * @param {string|functions} name Name
	 * @param {function} [fn] Functions
	 * @returns {NvManager}
	 *
	 * @tutorial method
	 * @example
	 * nv.method('abc', function(v){
    *  return v;
    * });
	 *
	 * nv.method({
    *  abc: function(v){
    *    return v;
    *  }
    * });
	 */
	method: function(name, fn){
		info('NvManager.method', this);

		applyKVs(name, fn, function(k, v, nv) {
			nv.nvMethod.fns[k] = v;
		}, this);

		return this;
	},

	/**
	 * Run view method.
	 * @instance
	 * @param {string|array} name Method name.
	 * @param {boolean} [once] Only one-time.
	 * @returns {NvManager}
	 *
	 *	 @tutorial method
	 * @example
	 * nv.method('abc', true);
	 * nv.method(['a','b']);
	 */
	run: function(name, once){
		info('NvManager.run', this);

		runMethod(this, name, once);

		return this;
	}
};

/* global doAtrFn: false */

/**
 * @ignore
 */
function eventFn(c, nvIn, nm, v, type, e) {
	v = doAtrFn(c, 'alter', nvIn.alter, null, v, e);

	v = doAtrFn(c, 'validate', nvIn.validate, null, v, e, function(tf, v){
		return (tf)?v:null;
	});

	if (nvIn.attach[nm]){
		var tv = nvIn.attach[nm].call(c.get(0), v, type, e);

		if (tv !== undefined) {
			v = tv;
			nvIn.valset(c, v);
		}

		info('NvIn:attach', c, nm);
	}

	return v;
}

/**
 * Provide "event bind, attach, alter & validate attr func" in input object. This document describe NvIn & Input specification. For details, see '<b>event</b>', '<b>alter</b>', '<b>validate</b>'.
 *
 * ## Specification
 *
 * ### Input target
 *
 * | | |
 * |:---|:---|
 * | <b>Element</b> | <code>INPUT,TEXTAREA,SELECT,BUTTON</code> |
 * | <b>CSS</b> | <code>.nv-in</code> |
 * || [\*note] If opt.inputForce of 'nview' is true, input-target is all elements. |
 *
 * ### Usage in template
 *
 * | | |
 * |:---|:---|
 * | Element attribute | <code>&lt;ELEMENT nv-event="{func}" nv-alter="{func}&#124;{func}&#124;..." nv-validate={func}&#124;{func}&#124;..."/&gt;</code> |
 *
 * @class
 *
 * @tutorial input
 *
 * @example
 * //HTML example
 * <input type="text" nv-name="change" nv-event="change" nv-validate="int" nv-alter="limit(5)"> : {{change}}
 *
 * //Using css
 * <a href="#" class="nv-in" nv-name="over" nv-event="mouseover" nv-val="1">Over here</a> : {{over}}
 *
 * @example
//Extend example
var nvIn = {
 attach: {
 	abc: function(v, type, e){
 		console.log('attach:', v, type, e);
 	}
 },
 alter: {
 	opt: {
 		split: {
 			noempty: false
 		}
 	}
 },
 event: {
 	dblclick: function(el, fn, nvIn){
 		el.dblclick(function(e){
 			fn($(this), 1, 'dblclick', e);
 		});
 	}
 }
};

$("#nv").nview({}, nvIn).sync();
 */
var NvIn = {
	opt: {},

	/**
	 * Attach methods.
	 *
	 * <b>Function:</b>
	 *
	 * <pre><code>method: function(v:*, type:string, e:Event):*|void{
	 * 	//this: Target element.
	 * 	//return: If value is returned, set input value.
	 * 	return v;
	 * }</code></pre>
	 *
	 * @protected
	 * @instance
	 * @type {functions}
	 *
	 * @tutorial input
	 *
	 * @example
	 * attach: {
 	 *  abc: function(v, type, e){
 	 *   $(this).after('.');
 	 *   console.log('attach:', v, type, e);
 	 *   return v;
 	 *  }
  	 * }
	 */
	attach: {},
	/**
	 * Event hook methods.
	 *
	 * ## Specification
	 *
	 * |  |  |
	 * |:---|:---|
	 * | <b>Usage in template</b> | <code>&lt;ELEMENT nv-event="{func}"/&gt;</code> |
	 * | <b>Class extend</b> | <code>'method':</code><br><code>function(el:jQuery, fn:function(el:jQuery, v:*, code:String, e:Event), nvIn:NvIn):void{ ... }</code> |
	 * | <b>In template</b> | <code>'method'</code> |
	 *
	 * @class NvIn.event
	 * @protected
	 * @instance
	 *
	 * @tutorial input
	 *
	 * @example
	 * //HTML example
	 * 'change: <input type="text" nv-name="change" nv-event="change"> : {{change}}'
	 * 'click: <a href="#" class="nv-in" nv-name="click" nv-event="click" nv-val="1">Click</a> : {{click}}'
	 * 'mouseover: <a href="#" class="nv-in" nv-name="over" nv-event="mouseover" nv-val="1">Over here</a> : {{over}}'
	 *
	 * @example
	 * //Extend example
	 * event: {
	 * 	dblclick: function(el, fn, nvIn){
	 * 		el.dblclick(function(e){
 	 *				fn($(this), 1, 'dblclick', e);
 	 *			});
 	 * 	}
	 * }
	 */
	event: {
		/**
		 * Initial event.
		 * @instance
		 * @type {string}
		 * @default 'changing'
		 */
		initial: 'changing',

		/**
		 * Hook change.
		 * @instance
		 * @param {jQuery} el jQuery object
		 * @param {function} fn Event function
		 * @param {NvIn} nvIn NvIn object
		 */
		change: function(el, fn, nvIn) {
			el.change(function(e) {
				var v = nvIn.valget($(this));
				fn($(this), v, 'change', e);
			});
		},
		/**
		 * Hook changing.
		 * @instance
		 * @param {jQuery} el jQuery object
		 * @param {function} fn Event function
		 * @param {NvIn} nvIn NvIn object
		 */
		changing: function(el, fn, nvIn) {
			el.changing(function(e) {
				var v = nvIn.valget($(this));
				fn($(this), v, 'changing', e);
			});
		},
		/**
		 * Hook click.
		 * @instance
		 * @param {jQuery} el jQuery object
		 * @param {function} fn Event function
		 * @param {NvIn} nvIn NvIn object
		 */
		click: function(el, fn, nvIn) {
			el.clicked(function(e) {
				var v = nvIn.valget($(this));
				fn($(this), v, 'click', e);
			});
		},
		/**
		 * Hook mouseover.
		 * @instance
		 * @param {jQuery} el jQuery object
		 * @param {function} fn Event function
		 * @param {NvIn} nvIn NvIn object
		 */
		mouseover: function(el, fn, nvIn) {
			el.mouseover(function(e) {
				var v = nvIn.valget($(this));
				fn($(this), v, 'mouseover', e);
			});
		},
		/**
		 * Hook mouseover.
		 * @instance
		 * @param {jQuery} el jQuery object
		 * @param {function} fn Event function
		 * @param {NvIn} nvIn NvIn object
		 */
		mouseout: function(el, fn, nvIn) {
			el.mouseout(function(e) {
				var v = nvIn.valget($(this));
				fn($(this), v, 'mouseout', e);
			});
		},
		/**
		 * Hook hover.
		 * @instance
		 * @param {jQuery} el jQuery object
		 * @param {function} fn Event function
		 * @param {NvIn} nvIn NvIn object
		 */
		hover: function(el, fn, nvIn) {
			var v;

			el.hover(function(e) {
				v = nvIn.valget($(this));
				fn($(this), v, 'hoverin', e);
			}, function(e) {
				v = nvIn.valget($(this));
				fn($(this), v, 'hoverout', e);
			});
		},
		/**
		 * Hook keydown.
		 * @instance
		 * @param {jQuery} el jQuery object
		 * @param {function} fn Event function
		 * @param {NvIn} nvIn NvIn object
		 */
		keydown: function(el, fn, nvIn) {
			el.keydown(function(e) {
				var c = e.charCode || e.keyCode;

				fn($(this), String.fromCharCode(c), 'keydown', e);
			});
		}
	},
	/**
	 * Alter methods.
	 *
	 * ## Specification
	 *
	 * | | |
	 * |:---|:---|
	 * | <b>Usage in template</b> | <code>&lt;ELEMENT nv-alter="{func}"/&gt;</code><br><code>&lt;ELEMENT nv-alter="{func(arg...)}"/&gt;</code><br><code>&lt;ELEMENT nv-alter="{func}&#124;{func}&#124;..."/&gt;</code> |
	 * | <b>Element attribute</b> | <code>'nv-alter'</code> |
	 * | <b>Class extend</b> | <code>'method': function(v:\*, e:Event, arg...):\*{ return v; }</code> |
	 *
	 * @class NvIn.alter
	 * @protected
	 * @instance
	 * @tutorial input
	 *
	 * @example
	 * //HTML example
	 * int: <input type="text" nv-name="int" nv-alter="int"> : {{int}}
	 * uint: <input type="text" nv-name="uint" nv-alter="uint"> : {{uint}}
	 * limit: <input type="text" nv-name="limit" nv-alter="limit(5)"> : {{limit}}
	 *
	 * @example
	 * //Extend example
	 * alter: {
	 *  abc: function(v, e) {
	 *   return v;
	 *  }
	 * }
	 */
	alter: {
		/**
		 * Option
		 * @instance
		 * @type {assoc}
		 * @property {assoc} split Split option
		 * @property {string} [split.separator=','] Separator
		 * @property {string} [split.noempty=false] No empty value
		 *
		 * @example
		 * opt: {
		 * 	split: {
		 *		separator: ',',
		 *		noempty: false
		 * 	}
		 * }
		 */
		opt: {
			split: {
				separator: ',',
				noempty: false
			}
		},
		/**
		 * Skip 'base'.
		 * @instance
		 * @param {*} v Value.
		 * @return {string}
		 */
		none: function(v, e) {
			return v;
		},
		/**
		 * Base method.
		 * @instance
		 * @param {*} v Value.
		 * @return {*}
		 */
		base: function(v){
			return this.trim(v);
		},
		/**
		 * Alter to int
		 * @instance
		 * @param {*} v Value.
		 * @param {event} e Event.
		 * @returns {integer}
		 */
		int: function(v, e) {
			v = stripNum(v);
			v = parseInt(v);

			return (!v)?0:v;
		},
		/**
		 * Alter to uint
		 * @instance
		 * @param {*} v Value.
		 * @param {event} e Event.
		 * @returns {integer}
		 */
		uint: function(v, e) {
			v = stripNum(v);
			v = parseInt(v);

			return (v > 0)?v:0;
		},
		/**
		 * Alter to number
		 * @instance
		 * @param {*} v Value.
		 * @param {event} e Event.
		 * @returns {number}
		 */
		number: function(v, e) {
			v = stripNum(v);
			var tv = parseFloat(v);

			if (v == tv) {
				return tv;
			}

			return 0;
		},
		/**
		 * Alter to boolean
		 * @instance
		 * @param {*} v Value.
		 * @param {event} e Event.
		 * @returns {boolean}
		 */
		bool: function(v, e) {
			v = str(v).toLowerCase();

			if (v == '' || v <= 0 || v == 'false' || v == 'null') {
				return false;
			}

			return true;
		},
		/**
		 * Limit string
		 * @instance
		 * @param {*} v Value.
		 * @param {event} e Event.
		 * @param {integer} len Specify in tag.
		 * @returns {string}
		 */
		limit: function(v, e, len){
			return str(v).substr(0, len);
		},
		/**
		 * Alter to "min" if value is less than "min".
		 * @instance
		 * @param {*} v Value.
		 * @param {event} e Event.
		 * @param {integer} min Specify in tag.
		 * @returns {number}
		 */
		min: function(v, e, min){
			v = stripNum(v);
			return (v >= min)?v:min;
		},
		/**
		 * Alter to "max" if value is greater than "max".
		 * @instance
		 * @param {*} v Value.
		 * @param {event} e Event.
		 * @param {integer} max Specify in tag.
		 * @returns {number}
		 */
		max: function(v, e, max){
			v = stripNum(v);
			return (v <= max)?v:max;
		},
		/**
		 * Alter to value in the range.
		 * @instance
		 * @param {*} v Value.
		 * @param {event} e Event.
		 * @param {integer} min Specify in tag.
		 * @param {integer} max Specify in tag.
		 * @returns {number}
		 */
		range: function(v, e, min, max){
			v = this.min(v, e, min);

			return this.max(v, e, max);
		},
		/**
		 * Trim value
		 * @instance
		 * @param {*} v Value.
		 * @param {event} e Event.
		 * @returns {*}
		 */
		trim: function(v, e){
			if (typeof v !== 'string'){
				return v;
			}
			return trim(v);
		},
		/**
		 * Split value and alter to array.
		 * @instance
		 * @param {*} v Value.
		 * @param {event} e Event.
		 * @param {string} [sep] Separator.<br>Specify in tag.
		 * @param {boolean} [ne] No empty.<br>Specify in tag.
		 * @returns {array}
		 */
		split: function(v, e, sep, ne){
			var o = this.opt.split;

			sep = (sep != null)?sep:o.separator;
			ne = (ne != null)?ne:o.noempty;

			return splitRx(v, sep, ne);
		}
	},
	/**
	 * Validate methods.
	 *
	 * ## Specification
	 *
	 * |||
	 * |:---|:---|
	 * | <b>Usage in template</b> | <code>&lt;ELEMENT nv-validate="{func}"/&gt;</code><br><code>&lt;ELEMENT nv-validate="{func(arg...)}"/&gt;</code><br><code>&lt;ELEMENT nv-validate="{func}&#124;{func}&#124;..."/&gt;</code> |
	 * | <b>Element attribute</b> | <code>'nv-validate'</code> |
	 * | <b>Class extend</b> | <code>'method': function(v:\*, e:Event, arg...):\*{ return v; }</code> |
	 *
	 * @class NvIn.validate
	 * @protected
	 * @instance
	 *
	 * @tutorial input
	 *
	 * @example
	 * //HTML example
	 * int: <input type="text" nv-name="int" nv-validate="int"> : {{int}}
	 * uint: <input type="text" nv-name="uint" nv-validate="uint"> : {{uint}}
	 * regex: <input type="text" nv-name="regex" nv-validate="regex(/^[a-h]+$/i)"> : {{regex}}
	 *
	 * @example
	 * //Extend example
	 * validate: {
	 *  abc: function(v, e) {
	 *   return v;
	 *  }
	 * }
	 */
	validate: {
		/**
		 * Base method.
		 */
		base: function(v, e) {
			return v;
		},
		/**
		 * Validate int.
		 * @param {*} v Value.
		 * @param {event} e Event.
		 * @returns {boolean}
		 */
		int: function(v, e){
			v = stripNum(v);
			var tv = parseInt(v);

			return (tv == v);
		},
		/**
		 * Validate uint.
		 * @param {*} v Value.
		 * @param {event} e Event.
		 * @returns {boolean}
		 */
		uint: function(v, e) {
			v = stripNum(v);
			var tv = parseInt(v);

			return (tv == v && tv >= 0);
		},
		/**
		 * Validate number.
		 * @param {*} v Value.
		 * @param {event} e Event.
		 * @returns {boolean}
		 */
		number: function(v, e) {
			v = stripNum(v);
			var tv = parseFloat(v);

			return (tv == v);
		},
		/**
		 * Validate min size - char length.
		 * @param {*} v Value.
		 * @param {event} e Event.
		 * @param {integer} min Specify in tag.
		 * @returns {boolean}
		 */
		minsize: function(v, e, min){
			return (str(v).length >= min);
		},
		/**
		 * Validate max size - char lenghth.
		 * @param {*} v Value.
		 * @param {event} e Event.
		 * @param {integer} max Specify in tag.
		 * @returns {boolean}
		 */
		maxsize: function(v, e, max){
			return (str(v).length <= max);
		},
		/**
		 * Validate value in the size - char length.
		 * @param {*} v Value.
		 * @param {event} e Event.
		 * @param {integer} min Specify in tag.
		 * @param {integer} max Specify in tag.
		 * @returns {boolean}
		 */
		size: function(v, e, min, max){
			if (!this.minsize(v, e, min)){
				return false;
			}

			if (!this.maxsize(v, e, max)){
				return false;
			}

			return true;
		},
		/**
		 * Validate min - number.
		 * @param {*} v Value.
		 * @param {event} e Event.
		 * @param {integer} min Specify in tag.
		 * @returns {boolean}
		 */
		min: function(v, e, min){
			v = stripNum(v);
			return (v >= min);
		},
		/**
		 * Validate max - number.
		 * @param {*} v Value.
		 * @param {event} e Event.
		 * @param {integer} max Specify in tag.
		 * @returns {boolean}
		 */
		max: function(v, e, max){
			v = stripNum(v);
			return (v <= max);
		},
		/**
		 * Validate value in the range - number.
		 * @param {*} v Value.
		 * @param {event} e Event.
		 * @param {integer} min Specify in tag.
		 * @param {integer} max Specify in tag.
		 * @returns {boolean}
		 */
		range: function(v, e, min, max){
			if (!this.min(v, e, min)){
				return false;
			}

			if (!this.max(v, e, max)){
				return false;
			}

			return true;
		},
		/**
		 * Validate regex.
		 * @param {*} v Value.
		 * @param {event} e Event.
		 * @param {string} regex Specify in tag.
		 * @returns {boolean}
		 */
		regex: function(v, e, regex){
			var rx = new RegExp(regex);

			return (str(v).match(rx));
		}
	},
	/**
	 * $.fn.valex in '$any' option
	 * @protected
	 * @instance
	 * @type {assoc}
	 * @property {boolean} [preferAttr=true]
	 * @property {integer} [checkType=$any.check.val]
	 * @property {integer} [radioType=$any.radio.val]
	 * @property {boolean} [selectLabel=null]
	 * @property {boolean} [data=true]
	 */
	optin: {
		preferAttr: true,
		checkType: $any.check.val,
		radioType: $any.radio.val,
		selectLabel: null,
		data: true
	},
	/**
	 * Get value to input object.
	 * @private
	 * @instance
	 */
	valget : function(el){
		return el.valget(this.optin);
	},
	/**
	 * Set value to input object.
	 * @private
	 * @instance
	 */
	valset : function(el, v){
		return el.valset(v, this.optin);
	}
};

/* global splitAtrFn: false */
/* global atrFns: false */

/**
 * @ignore
 */
function filterFn(c, nvOut, nm, v, vs, e) {
	var fns = splitAtrFn(c, atr('filter'));

	return filterFns(c.get(0), fns, nvOut, nm, v, vs, e);
}

function filterFns(c, fns, nvOut, nm, v, vs, e){
	if (nvOut.attach[nm]) {
		v = nvOut.attach[nm].call(c, v);

		info('NvOut:attach', c, nm);
	}

	v = atrFns(c, 'filter', fns, nvOut.filter, vs, v, e);

	return v;
}

/**
 * Provide "filter, attach, etc" in output object. This document describe NvOut & Output specification.
 *
 * ### Output target
 *
 * |  |  |
 * |:---|:---|
 * | <b>Template</b> | <code>{{VARIABLE}}</code> |
 * | <b>CSS</b> | <code>.nv-out</code> <code>.nv-v-VARIABLE</code> |
 *
 * ### Usage in template
 *
 * | Type | Statement |
 * |:---|:---|
 * | <b>Output</b> | <code>{{VARIABLE&#124;filter1&#124;filter2&#124;...}}</code><br><code>{{VARIABLE^TAG:VALUE}}</code> => <code>TAG : HTML tag. VALUE : Default value.</code> |
 * | <b>Assign</b> | <code>{{VARIABLE=VALUE; }}</code> => <code>VALUE : int, sring, array, assoc...</code> |
 * | <b>Comment</b> | <code>{{/\* comment \*&#47;}}</code> <code>{{ //comment }}</code> |
 *
 * @class
 *
 * @tutorial output
 * @tutorial apply-noparse
 *
 * @example
 * //HTML example
 *
 * {{abc}} //Simple
 * {{a.b}} //Array
 * {{abc^span:3}} //Tag & default value
 *
 * //Filter sample
 * {{num|trim|number}}, {{num|zerofill(8)}}, {{date|date('EEE, yyyy-MM-dd hh:mm a')}}
 *
 * //Assign and case filter
 * {{label={1:'abc1', 2:'abc2', 3:'abc3'}; }}
 * {{v1|case(label)}}, {{v2|case(label)}}
 *
 * //Using css
 * '<span class="nv-v-a nv-out" nv-filter="text"></span>: a'
 * '<span class="nv-v-a_0_1 nv-out" nv-filter="text"></span>: a.0.1'
 *
 * @example
 //Extend example
var nvOut = {
 attach: {
 	abc: function(v){
 		$(this).after('.');
 		return v;
 	}
 },
 filter: {
 	myfilter: function(v, e, arg1){
 		return v;
 	}
 }
};

 $("#nv").nview({}, null, nvOut).sync();
 */
var NvOut = {
	/**
	 * NvOut option.
	 * @protected
	 * @instance
	 * @param {assoc} [opt] options
	 * @param {string} [opt.tag='span'] default tag
	 */
	opt: {tag: 'span'},
	/**
	 * Attach methods.
	 *
	 * <b>Function</b>
	 *
	 * <pre><code>method: function(v:*):*{
	 * 	//this: Target element.
	 * 	//return: Output value.
	 * 	return v;
	 * }</code></pre>
	 *
	 * @protected
	 * @instance
	 * @type {functions}
	 *
	 * @tutorial input
	 * @example
	 * attach: {
 	 *  abc: function(v){
 	 *   $(this).after('.');
 	 *   return v;
 	 *  }
  	 * }
	 */
	attach: {},
	/**
	 * Filter methods.
	 *
	 * ## Specification
	 *
	 * | | |
	 * |:---|:---|
	 * | <b>Usage in template</b> | <code>{{VARIABLE&#124;filter1&#124;filter2&#124;...}}</code><br><code>{{VARIABLE&#124;filter(arg...)}}</code><br><code>&lt;ELEMENT nv-filter="{func(arg...)}"/&gt;</code> |
	 * | <b>Element attribute</b> | <code>'nv-filter'</code> |
	 * | <b>Class extend</b> | <code>'method': function(v:\*, e:Event, arg...):\*{ return v; }</code> |
	 *
	 * @class NvOut.filter
	 * @protected
	 * @instance
	 *
	 * @tutorial output
	 *
	 * @example
	 * //HTML example
	 * {{num|integer}}	//int
	 * {{num|zerofill(8)}}	//Fill zero
	 * {{v1|text}}	//Not html
	 * {{v2|date('EEE, yyyy-MM-dd hh:mm a')}} //Date
	 *
	 * @example
	 * //Extend example
	 * filter: {
	 *  abc: function(v, e) {
	 *   return v;
	 *  }
	 * }
	 */
	filter: {
		/**
		 * Options.
		 * @instance
		 * @type {assoc}
		 * @property {assoc} [join] join option
		 * @property {String} [join.separator=',']
		 * @property {assoc} [tags] tags option
		 * @property {string} [tags.split='[\\s,;]+']
		 * @property {string} [tags.join='']
		 * @property {function} [tags.create] See source.
		 * @property {assoc} [limit] limit option
		 * @property {integer} [limit.len=5]
		 * @property {string} [limit.more='...']
		 *
		 * @example
Default:
opt: {
	join: {
		separator: ','
	},
	tags: {
		split: '[\\s,;]+',
		join: '',
		create: function(v) {
			v = v.replace(/"/g, '\"');
			return '<a class="tags" href="#" title="' + v + '">' + v + '</div>';
		}
	},
	limit: {
		len: 5, more: '...'
	}
}
		 */
		opt: {
			join: {
				separator: ','
			},
			tags: {
				split: '[\\s,;]+',
				join: '',
				create: function(v) {
					v = v.replace(/"/g, '\"');
					return '<a class="tags" href="#" title="' + v + '">' + v + '</div>';
				}
			},
			limit: {
				len: 5, more: '...'
			}
		},
		/**
		 * Skip 'base'.
		 * @instance
		 * @param {*} v Value.
		 * @return {string}
		 */
		none: function(v, e) {
			return v;
		},
		/**
		 * Base common processing.
		 * @instance
		 * @param {*} v Value.
		 * @return {string}
		 */
		base: function(v, e) {
			return (v == null)?'':v;
		},
		/**
		 * Cast string.
		 * @instance
		 * @param {*} v Value.
		 * @param {event} e Event.
		 * @returns {string}
		 */
		str: function(v, e) {
			return str(v);
		},
		/**
		 * Trim.
		 * @instance
		 * @param {*} v Value.
		 * @param {event} e Event.
		 * @returns {string}
		 */
		trim: function(v, e) {
			return trim(v);
		},
		/**
		 * Line break to br tag
		 * @instance
		 * @param {*} v Value.
		 * @param {event} e Event.
		 * @returns {string}
		 */
		br: function(v, e) {
			return str(v).replace(/(\r\n|\n\r|\r|\n)/g, '<br/>');
		},
		/**
		 * Text(Ignore HTML tag).
		 * @instance
		 * @param {*} v Value.
		 * @param {event} e Event.
		 * @returns {string}
		 */
		text: function(v, e) {
			return $('<div/>').text(v).html();
		},
		/**
		 * Int
		 * @instance
		 * @param {*} v Value.
		 * @param {event} e Event.
		 * @returns {integer}
		 */
		int: function(v, e) {
			v = parseInt(v);
			return (!v) ? 0 : v;
		},
		/**
		 * Number
		 * @instance
		 * @param {*} v Value.
		 * @param {event} e Event.
		 * @returns {number}
		 */
		number: function(v, e) {
			v = Number(v);
			return (!v) ? 0 : v;
		},
		/**
		 * Zero-fill number.
		 * @instance
		 * @param {number} v Value.
		 * @param {event} e Event.
		 * @param {integer} [len=6] Number of digits.<br>Specify in template.
		 * @returns {string}
		 */
		zerofill: function(v, e, len){
			len = len || 6;

			v = str(this.number(v));
			if (v.length > len){
				return v;
			}

			return (new Array(len).join('0') + v).slice(-len);
		},
		/**
		 * 3 digits comma - 1,234,567
		 * @instance
		 * @param {number} v Value.
		 * @param {event} e Event.
		 * @returns {string}
		 */
		digit: function(v, e){
			return str(v).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
		},
		/**
		 * Join.
		 * @instance
		 * @param {array} v Value.
		 * @param {event} e Event.
		 * @param {string} [sep] Specify in template.
		 * @returns {string}
		 */
		join: function(v, e, sep){
			if (typeof v !== 'object'){
				return v;
			}

			sep = (sep != null)?sep:this.opt.join.separator;
			return v.join(sep);
		},
		/**
		 * Date. This method use "$any.date".
		 * @instance
		 * @param {string|Number} v Value.
		 * @param {event} e Event.
		 * @param {string} [format] $any.date.format default.
		 * @param {string} [opt] $any.date.format option.
		 * @returns {string}
		 */
		date: function(v, e, format, opt){
			opt = ext({error: false}, opt);

			return $any.date.format(format, v, opt);
		},
		/**
		 * Limit
		 * @instance
		 * @param {*} v Value.
		 * @param {event} e Event.
		 * @param {string} [len] Specify in template.
		 * @param {string} [more=''] Specify in template.
		 * @returns {string}
		 */
		limit: function(v, e, len, more){
			len = len || this.opt.limit.len;
			v = str(v);

			var tmr = '';

			if (v.length > len){
				if (more){
					tmr = (more > 0)?this.opt.limit.more:more;
				}else{
					tmr = '';
				}
			}

			return v.substr(0, len) + tmr;
		},
		/**
		 * String value to tag html.
		 * @instance
		 * @param {*} v Value.
		 * @param {event} e Event.
		 * @returns {string}
		 */
		tags: function(v, e) {
			var o = this.opt.tags;

			v = splitRx(v, o.split, true);

			return $.map(v, o.create).join(o.join);
		},
		/**
		 * Select label value.
		 * @instance
		 * @param {*} v Value.
		 * @param {event} e Event.
		 * @returns {string}
		 */
		label: function(v, e) {
			if (e) {
				return $('option', e).filter(function() {
					return ($(this).val() == v)?true:false;
				}).text();
			}

			return '';
		},
		/**
		 * Case.
		 * @instance
		 * @param {*} v Value.
		 * @param {event} e Event.
		 * @param {string} vs Value name.<br>Specify in template.
		 * @returns {string}
		 */
		case: function(v, e, vs) {
			if (vs && vs[v] != null) {
				return vs[v];
			}else{
				error('NvOut: variable none', null, v, vs, e);
			}

			return '';
		},
		/**
		 * Match.
		 * @instance
		 * @param {*} v Value.
		 * @param {event} e Event.
		 * @param {*} cv Compare value. ex: 1
		 * @param {string|array} df Defined value if match or unmatch. ex: 'OK', ['Ok', 'Fail']
		 * @returns {string}
		 */
		match: function(v, e, cv, df) {
			if (df == null){
				return '';
			}

			var tv='', fv='';

			if (typeof df === 'string' ){
				tv = df;
			}else{
				tv = df[0];
				fv = df[1] || '';
			}

			if (v == cv){
				return tv;
			}

			return fv;
		}
	},
	/**
	 * $.fn.valex in '$any' option
	 * @protected
	 * @instance
	 * @type {assoc}
	 * @property {boolean} [preferAttr=true]
	 * @property {integer} [checkType=$any.check.val]
	 * @property {integer} [radioType=$any.radio.val]
	 * @property {boolean} [selectLabel=null]
	 * @property {boolean} [data=false]
	 * @property {boolean} [html=true]
	 */
	optout: {
		preferAttr: true,
		checkType: $any.check.val,
		radioType: $any.radio.val,
		selectLabel: null,
		data: false,
		html: true
	},
	/**
	 * Get value to input object.
	 * @private
	 * @instance
	 */
	valget : function(el){
		return el.valget(this.optout);
	},
	/**
	 * Set value to input object.
	 * @private
	 * @instance
	 */
	valset : function(el, v){
		return el.valset(v, this.optout);
	}
};

/**
 * Provide template method and enable to run registered method.
 *
 * ## Specification
 *
 * | | |
 * |:---|:---|
 * | <b>Class extend</b> | <code>'method': function(arg...):string{ return ''; }</code> |
 * | <b>In template</b> | <code>{{=silicon(arg...);}}</code> |
 *
 * @class
 *
 * @tutorial method
 *
 * @example
 * //HTML sample
 * {{=silicon(1, 2, 3);}}
 *
 * @example
 * //Register by func.
 * nv.method({
 *  au: function(){
 *   return 'AuCl3';
 *  }
 * });
 *
 * //Extend
 * $('#abc').nview({}, null, null, {
 *  fns: {
 *   silicon: function(a, b, c){
 *    return sis[a] + ', ' + sis[b] + ', ' + sis[c] + ', ' + sis[0];
 *   }
 *  }
 * });
 */
var NvMethod = {
	/**
	 * @protected
	 * @instance
	 * @type {assoc}
	 * @property {assoc} values
	 */
	vs: null,

	/**
	 * NvMethod option
	 * @protected
	 * @instance
	 * @type {assoc}
	 * @property {assoc} [opt] options
	 * @property {string} [opt.tag='span'] default tag
	 */
	opt: {tag: 'span'},

	/**
	 * Methods
	 * @protected
	 * @instance
	 * @type {object<string, function>}
	 */
	fns: {}
};


/**
 * @ignore
 */
function runMethod(nv, name, once){
	var fn, func, src, arg, v, nm = '', mtd, c;

	if (typeof name === 'string'){
		nm = '.' + clsMtdNm(name);
		name = [name];
	}

	$(nm + '.' + cls('mtd'), nv.el).each(function(){
		c = $(this);

		fn = getAtr(c, 'mtd-fn', true);

		if (name && name.indexOf(fn) == -1){
			return;
		}

		mtd = getData(c, 'mtd');

		mtd = mtd || {};

		if (mtd.done && once){
			return;
		}

		src = getAtr(c, 'mtd-arg', true);
		arg = evalArg(src, null);

		func = nv.nvMethod.fns[fn];

		if (func && typeof func === 'function'){
			v = func.apply(nv.nvMethod, arg);

			mtd.done = true;
			setData(c, 'mtd', mtd);
			c.html(v);

			info('NvMethod:run', c, fn);
		}else{
			error('NvMethod: func none', c, fn);
		}
	});
}

/**
 * @ignore
 */
function getProfile(c){
	return getAtr(c, 'profile') || 'nvdefault';
}

/**
 * @ignore
 */
function actGetSto(c){
	return c.data(atr('act-sto'));
}

/**
 * @ignore
 */
function actGetPrm(src){
	var prm = src.match(/^[a-z\s]+\((.+)\)$/);

	if (!prm){
		return null;
	}

	return trim(prm[1]);
}

/**
 * @ignore
 */
function actIsFn(c, prm, nms){
	var fn = null;

	try{
		fn = createIsFn(parseStmt(prm, nms));
	}catch(e){
		error('NvAct: syntax', c, prm);
	}

	return fn;
}

/**
 * @ignore
 */
function actIfElseFn(c, cdfn){
	return function(c, v, vs, nvAct){
		var pf = getProfile(c);

		if (cdfn(vs)){
			c.showing(pf);
		}else{
			c.hiding(pf);
		}
	};
}

/**
 * @ignore
 */
function actSwitchFn(nm){
	return function(c, v, vs, nvAct){
		if (nvAct.opt.switch.nocase){
			v = v.toLowerCase();
		}

		var ct = clsBy('v', v, true);
		var tc = c.find(clsBy('case', nm, true));

		if (v == null || tc.filter(ct).length == 0){
			ct = clsBy('vv', 'default', true);
		}

		var pf = getProfile(c);

		tc.not(ct).hiding(pf);
		tc.filter(ct).showing(pf);
	};
}

/**
 * @ignore
 */
function actEachFn(c, name, tag, key, val, nv){
	var clsrb = 'rebuild';
	var bse = c.wrapInner('<' + tag + ' />').children(':first').hide().remove();

	function setv(o, nm, v){
		if (!nm){
			return;
		}

		var to, tv;
		o.find('.' + clsEachV(nm)).each(function(){
			to = $(this);

			tv = filterFn(to, nv.nvOut, name + ':' + nm, v, nv.vs, null);

			to.html(tv);
		});
	}

	return function(c, v, vs, nvAct) {
		var tc, clsk;

		var pf = getProfile(c);

		if (bse.length > 0){
			if ($any.blank(v)) {
				c.children().hideDel(pf);
				return;
			}

			if (typeof v === 'object'){
				c.children().addClass(clsrb);

				$.each(v, function(k, v){
					clsk = clsBy('k', k);
					tc = c.children('.' + clsk);

					if (tc.length == 0){
						tc = c.cloneShow(bse, pf).addClass(clsk);
					}else{
						tc.removeClass(clsrb);
					}

					setv(tc, key, k);
					setv(tc, val, v);
				});

				c.children('.' + clsrb).hideDel(pf);
			}else{
				error('NvAct: not array(each)', c, v);
			}
		}else{
			error('NvAct: syntax(each)', c);
		}
	};
}

/* global actGetSto: false */
/* global actGetPrm: false */
/* global actIsFn: false */
/* global actIfElseFn: false */
/* global actSwitchFn: false */
/* global actEachFn: false */

/**
 * Provide template action and enable to use "if,else,elseif,switch,each,etc" statement.
 *
 * ## Specification
 *
 * | | |
 * |:---|:---|
 * | <b>Element attribute</b> | <code>'nv-act'</code> <code>'nv-profile'</code> |
 *
 * ### 'nv-act' usage in template
 *
 * #### if
 *
 * | Statement | Format |
 * |:---|:---|
 * | <b>if</b> | <code>if (CONDITION)</code> : <code>{CONDITION} - Condition</code> |
 * | <b>else if</b> | <code>else if (CONDITION)</code> |
 * | <b>else</b> | <code>else</code> |
 *
 * #### switch
 *
 * | Statement | Format |
 * |:---|:---|
 * | <b>switch</b> | <code>switch(VARIABLE)</code> |
 * | <b>case</b> | <code>case VALUE:</code> |
 * | <b>default</b> | <code>default:</code> |
 *
 * #### each
 * | Statement | Format |
 * |:---|:---|
 * | <code>each(VALUE in ASSOC)</code> | <code>{ASSOC} - Assoc name</code> |
 * | <code>each(KEY:VALUE in ASSOC)</code> | <code>{KEY} - Key(local name)</code> <code>{VALUE} - Value(local name)</code> |
 *
 *
 * ### 'nv-profile' usage in template
 *
 * | | |
 * |:---|:---|
 * | Profile name | <code>{NAME}</code> |
 * | Default profile name | <code>'nvdefault'</code> |
 *
 * @class
 *
 * @tutorial act
 *
 * @example
 * //HTML
 *
 * //if
 * '
 * <div nv-act="if (v > 0)">ABC</div>
 * <div nv-act="if ((v + 5)*2 == 16)">ABC</div>
 * '
 * //if, else if, else
 * '
 * <div nv-act="if (v1 >= 5)">A</div>
 * <div nv-act="else if (v1 >= 10 && v2 > 10)">B</div>
 * <div nv-act="else">C</div>
 * '
 *
 * //switch
 * '
 * <div nv-act="switch(v)">
 *  <div nv-act="case 1:">A</div>
 *  <div nv-act="case 2:">B</div>
 *  <div nv-act="default:">C</div>
 * </div>
 * '
 *
 * //each
 * '
 * <div nv-act="each(key:item in items)">
 *  - {{key}}: {{item}}<br>
 * </div>
 * '
 *
 * //Using profile
 * '
 * <div nv-act="if (v > 0)" nv-profile="myprofile">ABC</div>
 * '
 *
 * @example
 * //Extend
 * $('#abc').nview({}, null, null, null, {
 *  opt: {
 *   each: {
 *    tag: 'div'
 *   }
 *  }
 * });
 *
 * @example
 * //Set default profile
 * $any.motion.setProfile('nvdefault', {duration: 200, effect: 'fade'});
 */
var NvAct = {
	/**
	 * NvAct option.
	 * @protected
	 * @instance
	 * @property {assoc} each
	 * @property {string} [each.tag='div']
	 * @property {assoc} switch
	 * @property {boolean} [switch.nocase=false]
	 *
	 * @tutorial act
	 * @example
	 * opt: {
	 *  each: {
	 *   tag: 'div'
	 *  },
	 *  switch: {
	 *   nocase: false
	 *  }
	 * }
	 */
	opt: {
		each: {
			tag: 'div'
		},
		switch: {
			nocase: false
		}
	},

	acts: {},
	previf: null,

	/**
	 * @ignore
	 */
	doIf: function(c, sto, src){
		c.hide();

		var prm = actGetPrm(src);

		sto.nms = [];
		sto.cdfn = actIsFn(c, prm, sto.nms);

		if (sto.cdfn && sto.nms.length > 0){
			sto.fn = actIfElseFn(c, sto.cdfn);
		}else{
			error('NvAct: syntax(if)', c, src);
		}
	},
	/**
	 * @ignore
	 */
	doElse: function(c, sto, src, previf){
		var psto;

		c.hide();

		if (c.parent().has(previf).length > 0){
			psto = actGetSto(previf);
		}

		if (psto && (psto.stmt == 'if' || psto.stmt == 'elseif')){
			sto.nms = psto.nms;

			var prm = actGetPrm(src);

			if (prm){
				sto.stmt = 'elseif';

				var tfn = actIsFn(c, prm, sto.nms);

				sto.cdfn = function(v){
					if (psto.cdfn(v) || tfn(v)){
						return true;
					}

					return false;
				};

				sto.fn = actIfElseFn(c, function(v){
					if (!psto.cdfn(v) && tfn(v)){
						return true;
					}

					return false;
				});
			}else{
				sto.fn = actIfElseFn(c, function(v){
					return !psto.cdfn(v);
				});
			}
		}else{
			error('NvAct: syntax(else)', c, src);
		}
	},
	/**
	 * @ignore
	 */
	doSwitch: function(c, sto, src){
		var nm;

		sto.nms = [];
		parseStmt(actGetPrm(src), sto.nms);

		if (sto.nms.length == 1 && sto.nms[0]){
			nm = sto.nms[0];
		}

		if (nm){
			sto.fn = actSwitchFn(nm);
		}else{
			error('NvAct: syntax(case)', c, src);
		}
	},
	/**
	 * @ignore
	 */
	doCase: function(c, sto, src){
		var cv, tv, pt, to, nm;

		c.hide();

		tv = src.match(/^case\s+(.+?)\:$/);

		if (tv){
			tv = trim(tv[1]).replace(/^['"](.*)['"]$/, '$1');

			if (this.opt.switch.nocase){
				tv = tv.toLowerCase();
			}

			cv = clsBy('v', tv);
		}else if (src.match(/^default\s*\:$/)){
			cv = clsBy('vv', 'default');
		}

		pt = c.closest('.' + cls('switch'));
		to = actGetSto(pt);

		if (to && to.nms && cv){
			nm = clsBy('case', to.nms[0]);
			c.addClass(nm).addClass(cv);
		}else{
			error('NvAct: syntax(switch)', c, src);
		}
	},
	/**
	 * @ignore
	 */
	doEach: function(c, sto, src, nv){
		var tv, kv, t, key, val, name, prm, tag=this.opt.each.tag;

		function replaceCls(nm){
			var oc, nc;
			oc = clsNm(nm);
			nc = clsEachV(nm);

			c.find('.' + oc).removeClass(oc).addClass(nc);
		}

		function chkKV(k,v,tv){
			if ((!tv && $any.blank(k)) || $any.blank(v)){
				return false;
			}

			return true;
		}

		prm = actGetPrm(src);

		sto.nms = [];

		tv = prm.match(/^(.+)\s+in\s+([^\s]+)$/);

		if (tv){
			kv = tv[1];
			name = permitNm(tv[2], 'each');

			if (name !== null){
				tv = tv[1].match(/^(.+)\^(.+)$/);

				if (tv != null){
					kv = tv[1];
					tag = trim(tv[2]);
				}

				kv = splitArr(kv, ':');

				t = false;
				if (kv.length == 1){
					key = null;
					val = kv[0];
					t = true;
				}else{
					key = kv[0];
					val = kv[1];
				}

				if (chkKV(key, val, t)){
					sto.nms = [name];

					if (key != null){
						replaceCls(key);
					}

					replaceCls(val);
				}
			}
		}

		if (sto.nms.length > 0) {
			sto.fn = actEachFn(c, name, tag, key, val, nv);
		}else{
			error('NvAct: syntax(each)', c, src);
		}
	},

	/**
	 * @ignore
	 */
	parse: function(c, src, nv){
		var stmt = src.match(/^([a-z]+?)(\:|\s|\(|$)/);

		if (stmt){
			stmt = stmt[1];
		}

		var sto = {stmt:stmt, nms:null, fn:null};

		switch (stmt){
		case 'if':
			this.doIf(c, sto, src);
			this.previf = c;

			break;
		case 'else':
			this.doElse(c, sto, src, this.previf);
			this.previf = c;

			break;
		case 'switch':
			this.doSwitch(c, sto, src);

			break;
		case 'case':
			this.doCase(c, sto, src);

			break;
		case 'default':
			this.doCase(c, sto, src);

			break;
		case 'each':
			this.doEach(c, sto, src, nv);

			break;
		default:
			error('NvAct: syntax', c, src, sto);
			return;

			break;
		}

		addCls(c, sto.stmt);

		function store(o, nm, sto){
			if (o.acts[nm] === undefined){
				o.acts[nm] = [];
			}

			o.acts[nm].push(sto);
		}

		if (sto.nms && sto.fn){
			info('NvAct:parse', c, stmt + ' statement');
			
			c.data(atr('act-sto'), sto);

			sto.el = c;

			for (var i=0;i<sto.nms.length;i++){
				store(this, sto.nms[i], sto);
			}
		}
	},
	/**
	 * @ignore
	 */
	perform: function(nm, v, vs){
		nm = keys(nm);

		if (nm.length > 1){
			nm = nm[0];
			v = vs[nm];
		}

		var acts = this.acts[nm], sto;

		if (acts){
			for (var i=0;i<acts.length;i++){
				sto = acts[i];

				if (sto.fn){
					sto.fn(sto.el, v, vs, this);
				}
			}
			info('NvAct:change', sto.el, nm);
		}
	}
};

/* global NvManager: false */
/* global setV: false */
/* global assignOpt: false */


var findRx = /{{(.*?)}}/g;
var assignRx = /^[^\|]+=/;

/**
 * @ignore
 */
function bindEvent(nvIn, el, fn) {
	var v = getAtr(el, 'event', true) || nvIn.event.initial || 'changing';

	v = splitArr(v, '|', true);

	$any.each(v, function(k, v) {
		if (nvIn.event[v] != null) {
			nvIn.event[v].call(null, el, fn, nvIn);
		}else{
			error(null, el, 'unknown event', v);
		}
	});
}

/**
 * @ignore
 */
function bindIn(nv, el, force) {
	var aopt = assignOpt({child: false}), c;

	$(':input', el).add('.' + cls('in'), el).each(function() {
		c = $(this);

		if (hasCls(c, 'out') || getAtr(c, 'out') !== null){
			return;
		}

		var nm = getNm(c, force), dv;

		if (nm) {
			setNm(c, nm, 'in');

			dv = getAtr(c, 'val');
			if (dv != null){
				c.dataval(dv);
			}

			bindEvent(nv.nvIn, c, function(el, v, type, e) {
				info('@input:event', el, nm, v);

				v = eventFn(el, nv.nvIn, nm, v, type, e);

				setV(nv, nm, v, el, aopt);
			});
		}
	});
}


/**
 * //Parse assign
 * @ignore
 */
function parseAssign(nv, el, v) {
	var vs, pn, tv, src;
	vs = v.match(/^([^={}]+?)=(.*?);\s*$/);

	if (vs) {
		pn = trim(vs[1]);
		src = vs[2];

		tv = evalArg(src, null);

		if (tv){
			tv = tv[0];
			info('@bind:assign', el, pn, tv);
		}else{
			error(null, el, 'syntax(eval)', vs);
		}

		nv.set(pn, tv);
	}else{
		error(null, el, 'syntax', v);
	}
}

/**
 * // Parse output
 * // {{abc^div:3|trim|int}}
 * @ignore
 */
function parseOutV(nv, el, src){
	var r=null, tag, fns, ps, nm, v=null;

	fns = splitArr(src, '|', true);

	ps = fns.shift().match(/^([^\:\^]+)\^?([a-z]*)\:?(.*)$/);

	if (ps){
		nm = permitNm(trim(ps[1]), 'template');

		if (nm != null) {
			//Default value
			v = trim(ps[3]);

			if (v != ''){
				try {
					v = JSON.parse(v.replace(/^'(.+)'$/, '"$1"'));
				}catch(e){
					error(null, el, 'syntax', src);
				}
			}else{
				v = null;
			}

			info('@bind:param', el, nm, v);

			//Set value
			$any.set(nv.vs, nm, v, true);

			tag = (ps[2])?trim(ps[2]):nv.nvOut.opt.tag;

			if (v !== null){
				v = filterFns(null, fns, nv.nvOut, nm, v, nv.vs, null);
			}

			r = {nm: nm, tag: tag, v: v, fns: fns};
		}
	}

	return r;
}

/**
 * //Create output
 * @ignore
 */
function createOut(nv, el, src) {
	var r='', prm=parseOutV(nv, el, src);

	if (prm != null) {
		r = '<' + prm.tag + ' class="' + clsNm(prm.nm) + ' ' + cls('out') + '"';

		if (prm.fns.length > 0) {
			r += ' ' + atr('filter') + '="' + prm.fns.join('|') + '"';
		}

		r += '>';

		if (prm.v !== null){
			r+= prm.v;
		}

		r += '</' + prm.tag + '>';
	}

	return r;
}


/**
 * //Output to attribute
 * @ignore
 */
function bindAtrOut(nv, el){
	$('[' + atr('attr') + '=1]', el).each(function(){
		var c, prm=null, atr, rx, m, src, atrs={};

		for (var i=this.attributes.length-1;i>=0;i--){
			atr = this.attributes[i];

			rx = new RegExp('^\\s*' + atrOutVar('(.+)') + '\\s*$');

			if ((m = rx.exec(atr.value)) != null){
				c = $(this);

				src = trim(m[1]);
				prm = parseOutV(nv, el, src);

				if (prm !== null){
					atrs[prm.nm] = {atr: atr.name, fns: prm.fns};
					setNm(c, prm.nm, 'out');

					c.attr(atr.name, prm.v);

					info('@bind:attrout', c);
				}else{
					error(null, c, 'syntax', src);
				}
			}
		}

		if (prm !== null){
			setData(c, 'atrs', atrs);
		}
	});
}

/**
 * //Build method in view
 * @ignore
 */
function buildMethod(nv, el, v){
	var fs, r = '', tag = nv.nvMethod.opt.tag;

	fs = v.match(/^=\s*([a-z0-9_]+)\s*\((.*)\)\s*;?$/i);

	if (fs){
		var fn, arg;
		fn = fs[1];
		arg = fs[2].replace(/"/g, '\'');

		if (fn){
			r = '<' + tag + ' class="' + cls('mtd') + ' ' + clsMtdNm(fn) + '" ' +
			atr('mtd-fn') + '="' + fn + '" ' + atr('mtd-arg') + '="' + arg + '"></' + tag + '>';
		}else{
			error(null, el, 'func none', fn);
		}
		info('@bind:method', el, fn);
	}else{
		error(null, el, 'syntax', v);
	}

	return r;
}

/**
 * //Build value
 * @ignore
 */
function buildValue(nv, el, v) {
	var r = '';

	if (v.match(assignRx)) {
		parseAssign(nv, el, v);
	}else{
		r = createOut(nv, el, v);
	}

	return r;
}

/**
 * @ignore
 */
function bindOut(nv, el) {
	var v, c;

	el.children().each(function() {
		c = $(this);
		v = c.text();

		if (v.match(findRx)) {
			bindOut(nv, c);
		}
	});

	el.contents().filter(function() {
		return (this.nodeType == 3);
	}).each(function() {
		c = $(this);
		v = c.text();

		if (v.match(findRx)) {
			//Build html
			v = v.replace(findRx, function(s, v) {
				v = trim(v);
				var r = '', prefix = v.charAt(0);

				switch (prefix){
				case '=':
					r = buildMethod(nv, el, v);
					break;
				case '/':
					if (v.match(/(^\/\*.+\*\/$|^\/\/)/)){
						//comment
						r = '';
					}else{
						error(null, el, 'syntax', v);
					}
					break;
				default:
					r = buildValue(nv, el, v);
					break;
				}

				return r;
			});

			c.replaceWith(v);
		}
	});
}

/**
 * @ignore
 */
function bindAct(nv, el){
	$any.motion.setProfile('nvdefault', {effect: 'none'});

	$('[' + atr('act') + ']', el).each(function(){
		var src, c = $(this);

		src = getAtr(c, 'act', true);

		nv.nvAct.parse(c, src, nv);

		info('@bind:act', c);
	});
}

/**
 * Parse template and bind by option and return nv object.
 * @function nview
 * @memberof jQuery.fn
 * @instance
 *
 * @param {assoc} [opt] options
 * @param {boolean} [opt.bindParse=true] Determine to bind or parse.
 * @param {boolean} [opt.input=true] Bind input.
 * @param {boolean} [opt.inputForce=false] Force bind - input.
 * @param {boolean} [opt.output=true] Bind output.
 * @param {boolean} [opt.outAttr=true] Bind attribute output.
 * @param {boolean} [opt.act=true] Bind act.
 * @param {boolean} [opt.show=true] Show hidden block.
 *
 * @param {NvIn} [nvIn] NvIn object
 * @param {NvOut} [nvOut] NvOut object
 * @param {NvMethod} [nvMethod] NvMethod object
 * @param {NvAct} [nvAct] NvAct object
 * @param {NvManager} [nvManager] NvManager object
 * @returns {NvManager}
 *
 * @see NvIn
 * @see NvOut
 * @see NvMethod
 * @see NvAct
 * @see NvManager
 *
 * @example
 * Deafault opt:
 * {
 *  input: true, inputForce: false,
 *  output: true, outAttr: true,
 *  act: true,
 *  show: true
 * }
 *
 * @tutorial basic
 * @tutorial apply-noparse
 *
 * @example
 * $('#sample').nview().sync();
 * $('#sample').nview({act: false}, null, nvOut).sync();
 * $('#sample').nview({output: false});
 * $('#sample').nview({bindParse: false});
 * $('#sample').nview({}, null, {
 *   attach: { abc: function(v){return v * 3;} }
 * });
 * $('#sample').nview({}, nvIn, nvOut, nvMethod, nvAct, nvManager).sync();
 */
$.fn.nview = function(opt, nvIn, nvOut, nvMethod, nvAct, nvManager) {
	ck(this);
	info('nview', this);
	var el = $(this);

	var nv = $.extend(true, {}, NvManager, nvManager);

	nv.initialize(el, nvIn, nvOut, nvMethod, nvAct);

	opt = ext({
		bindParse: true,
		input: true, inputForce: false,
		output: true, outAttr: true,
		act: true,
		show: true
	}, opt);

	if (opt.bindParse){
		if (opt.input) {
			bindIn(nv, el, opt.inputForce);
		}

		if (opt.output){
			bindOut(nv, el);
		}

		if (opt.outAttr){
			bindAtrOut(nv, el);
		}

		if (opt.act){
			bindAct(nv, el);
		}
	}

	if (opt.show){
		el.show();
	}

	return nv;
};


})($nview, jQuery);
