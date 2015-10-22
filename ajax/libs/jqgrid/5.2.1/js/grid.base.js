// ==ClosureCompiler==
// @compilation_level SIMPLE_OPTIMIZATIONS

/**
 * @license Guriddo jqGrid JS 5.2.1 (2017-05-01)
 * Copyright (c) 2008, Tony Tomov, tony@trirand.com
 * 
 * License: http://guriddo.net/?page_id=103334
 */
//jsHint options
/*jshint evil:true, eqeqeq:false, eqnull:true, devel:true */
/*global jQuery, window, define, navigator, document */
(function( factory ) {
	"use strict";
	if ( typeof define === "function" && define.amd ) {
		// AMD. Register as an anonymous module.
		define([ 
			"jquery"
		], factory );
	} else {
		// Browser globals
		factory( jQuery );
	}
}(function( $ ) {
"use strict";
//module begin
$.jgrid = $.jgrid || {};
if(!$.jgrid.hasOwnProperty("defaults")) {
	$.jgrid.defaults = {};
}
$.extend($.jgrid,{
	version : "5.2.1",
	htmlDecode : function(value){
		if(value && (value==='&nbsp;' || value==='&#160;' || (value.length===1 && value.charCodeAt(0)===160))) { return "";}
		return !value ? value : String(value).replace(/&gt;/g, ">").replace(/&lt;/g, "<").replace(/&quot;/g, '"').replace(/&amp;/g, "&");		
	},
	htmlEncode : function (value){
		return !value ? value : String(value).replace(/&/g, "&amp;").replace(/\"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
	},
	template : function(format){ //jqgformat
		var args = $.makeArray(arguments).slice(1), j, al = args.length;
		if(format==null) { format = ""; }
		return format.replace(/\{([\w\-]+)(?:\:([\w\.]*)(?:\((.*?)?\))?)?\}/g, function(m,i){
			if(!isNaN(parseInt(i,10))) {
				return args[parseInt(i,10)];
			}
			for(j=0; j < al;j++) {
				if($.isArray(args[j])) {
					var nmarr = args[ j ],
					k = nmarr.length;
					while(k--) {
						if(i===nmarr[k].nm) {
							return nmarr[k].v;
						}
					}
				}
			}
		});
	}, 
	msie : function () {
		return $.jgrid.msiever() > 0;
	},
	msiever : function () {
		var rv =0,
		sAgent = window.navigator.userAgent,
		Idx = sAgent.indexOf("MSIE");

		if (Idx > 0)  {
			rv = parseInt(sAgent.substring(Idx+ 5, sAgent.indexOf(".", Idx)));
		} else if ( !!navigator.userAgent.match(/Trident\/7\./) ) {
			rv = 11;
		}
		return rv;
	},
	getCellIndex : function (cell) {
		var c = $(cell);
		if (c.is('tr')) { return -1; }
		c = (!c.is('td') && !c.is('th') ? c.closest("td,th") : c)[0];
		if ($.jgrid.msie()) { return $.inArray(c, c.parentNode.cells); }
		return c.cellIndex;
	},
	stripHtml : function(v) {
		v = String(v);
		var regexp = /<("[^"]*"|'[^']*'|[^'">])*>/gi;
		if (v) {
			v = v.replace(regexp,"");
			return (v && v !== '&nbsp;' && v !== '&#160;') ? v.replace(/\"/g,"'") : "";
		} 
			return v;
	},
	stripPref : function (pref, id) {
		var obj = $.type( pref );
		if( obj === "string" || obj === "number") {
			pref =  String(pref);
			id = pref !== "" ? String(id).replace(String(pref), "") : id;
		}
		return id;
	},
	useJSON : true,
	parse : function(jsonString) {
		var js = jsonString;
		if (js.substr(0,9) === "while(1);") { js = js.substr(9); }
		if (js.substr(0,2) === "/*") { js = js.substr(2,js.length-4); }
		if(!js) { js = "{}"; }
		return ($.jgrid.useJSON===true && typeof JSON === 'object' && typeof JSON.parse === 'function') ?
			JSON.parse(js) :
			eval('(' + js + ')');
	},
	parseDate : function(format, date, newformat, opts) {
		var	token = /\\.|[dDjlNSwzWFmMntLoYyaABgGhHisueIOPTZcrU]/g,
		timezone = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,
		timezoneClip = /[^-+\dA-Z]/g,
		msDateRegExp = new RegExp("^\/Date\\((([-+])?[0-9]+)(([-+])([0-9]{2})([0-9]{2}))?\\)\/$"),
		msMatch = ((typeof date === 'string') ? date.match(msDateRegExp): null),
		pad = function (value, length) {
			value = String(value);
			length = parseInt(length,10) || 2;
			while (value.length < length)  { value = '0' + value; }
			return value;
		},
		ts = {m : 1, d : 1, y : 1970, h : 0, i : 0, s : 0, u:0},
		timestamp=0, dM, k,hl,
		h12to24 = function(ampm, h){
			if (ampm === 0){ if (h === 12) { h = 0;} }
			else { if (h !== 12) { h += 12; } }
			return h;
		},
		offset =0;
		if(opts === undefined) {
			opts = $.jgrid.getRegional(this, "formatter.date");//$.jgrid.formatter.date;
		}
		// old lang files
		if(opts.parseRe === undefined ) {
			opts.parseRe = /[#%\\\/:_;.,\t\s-]/;
		}
		if( opts.masks.hasOwnProperty(format) ) { format = opts.masks[format]; }
		if(date && date != null) {
			if( !isNaN( date - 0 ) && String(format).toLowerCase() === "u") {
				//Unix timestamp
				timestamp = new Date( parseFloat(date)*1000 );
			} else if(date.constructor === Date) {
				timestamp = date;
				// Microsoft date format support
			} else if( msMatch !== null ) {
				timestamp = new Date(parseInt(msMatch[1], 10));
				if (msMatch[3]) {
					offset = Number(msMatch[5]) * 60 + Number(msMatch[6]);
					offset *= ((msMatch[4] === '-') ? 1 : -1);
					offset -= timestamp.getTimezoneOffset();
					timestamp.setTime(Number(Number(timestamp) + (offset * 60 * 1000)));
				}
			} else {
				//Support ISO8601Long that have Z at the end to indicate UTC timezone
				if(opts.srcformat === 'ISO8601Long' && date.charAt(date.length - 1) === 'Z') {
					offset -= (new Date()).getTimezoneOffset();
				}
				date = String(date).replace(/\T/g,"#").replace(/\t/,"%").split(opts.parseRe);
				format = format.replace(/\T/g,"#").replace(/\t/,"%").split(opts.parseRe);
				// parsing for month names
				for(k=0,hl=format.length;k<hl;k++){
					switch ( format[k] ) {
						case 'M':
							dM = $.inArray(date[k],opts.monthNames);
							if(dM !== -1 && dM < 12){date[k] = dM+1; ts.m = date[k];}
							break;
						case 'F':
							dM = $.inArray(date[k],opts.monthNames,12);
							if(dM !== -1 && dM > 11){date[k] = dM+1-12; ts.m = date[k];}
							break;
						case 'n':
							format[k] = 'm';
							break;
						case 'j': 
							format[k] = 'd';
							break;
						case 'a':
							dM = $.inArray(date[k],opts.AmPm);
							if(dM !== -1 && dM < 2 && date[k] === opts.AmPm[dM]){
								date[k] = dM;
								ts.h = h12to24(date[k], ts.h);
							}
							break;
						case 'A':
							dM = $.inArray(date[k],opts.AmPm);
							if(dM !== -1 && dM > 1 && date[k] === opts.AmPm[dM]){
								date[k] = dM-2;
								ts.h = h12to24(date[k], ts.h);
							}
							break;
						case 'g':
							ts.h = parseInt(date[k], 10);
							break;
					}
					if(date[k] !== undefined) {
						ts[format[k].toLowerCase()] = parseInt(date[k],10);
					}
				}
				if(ts.f) {ts.m = ts.f;}
				if( ts.m === 0 && ts.y === 0 && ts.d === 0) {
					return "&#160;" ;
				}
				ts.m = parseInt(ts.m,10)-1;
				var ty = ts.y;
				if (ty >= 70 && ty <= 99) {ts.y = 1900+ts.y;}
				else if (ty >=0 && ty <=69) {ts.y= 2000+ts.y;}
				timestamp = new Date(ts.y, ts.m, ts.d, ts.h, ts.i, ts.s, ts.u);
				//Apply offset to show date as local time.
				if(offset !== 0) {
					timestamp.setTime(Number(Number(timestamp) + (offset * 60 * 1000)));
				}
			}
		} else {
			timestamp = new Date(ts.y, ts.m, ts.d, ts.h, ts.i, ts.s, ts.u);
		}
		if(opts.userLocalTime && offset === 0) {
			offset -= (new Date()).getTimezoneOffset();
			if( offset !== 0 ) {
				timestamp.setTime(Number(Number(timestamp) + (offset * 60 * 1000)));
			}
		}
		if( newformat === undefined ) {
			return timestamp;
		}
		if( opts.masks.hasOwnProperty(newformat) )  {
			newformat = opts.masks[newformat];
		} else if ( !newformat ) {
			newformat = 'Y-m-d';
		}
		var 
			G = timestamp.getHours(),
			i = timestamp.getMinutes(),
			j = timestamp.getDate(),
			n = timestamp.getMonth() + 1,
			o = timestamp.getTimezoneOffset(),
			s = timestamp.getSeconds(),
			u = timestamp.getMilliseconds(),
			w = timestamp.getDay(),
			Y = timestamp.getFullYear(),
			N = (w + 6) % 7 + 1,
			z = (new Date(Y, n - 1, j) - new Date(Y, 0, 1)) / 86400000,
			flags = {
				// Day
				d: pad(j),
				D: opts.dayNames[w],
				j: j,
				l: opts.dayNames[w + 7],
				N: N,
				S: opts.S(j),
				//j < 11 || j > 13 ? ['st', 'nd', 'rd', 'th'][Math.min((j - 1) % 10, 3)] : 'th',
				w: w,
				z: z,
				// Week
				W: N < 5 ? Math.floor((z + N - 1) / 7) + 1 : Math.floor((z + N - 1) / 7) || ((new Date(Y - 1, 0, 1).getDay() + 6) % 7 < 4 ? 53 : 52),
				// Month
				F: opts.monthNames[n - 1 + 12],
				m: pad(n),
				M: opts.monthNames[n - 1],
				n: n,
				t: '?',
				// Year
				L: '?',
				o: '?',
				Y: Y,
				y: String(Y).substring(2),
				// Time
				a: G < 12 ? opts.AmPm[0] : opts.AmPm[1],
				A: G < 12 ? opts.AmPm[2] : opts.AmPm[3],
				B: '?',
				g: G % 12 || 12,
				G: G,
				h: pad(G % 12 || 12),
				H: pad(G),
				i: pad(i),
				s: pad(s),
				u: u,
				// Timezone
				e: '?',
				I: '?',
				O: (o > 0 ? "-" : "+") + pad(Math.floor(Math.abs(o) / 60) * 100 + Math.abs(o) % 60, 4),
				P: '?',
				T: (String(timestamp).match(timezone) || [""]).pop().replace(timezoneClip, ""),
				Z: '?',
				// Full Date/Time
				c: '?',
				r: '?',
				U: Math.floor(timestamp / 1000)
			};
		return newformat.replace(token, function ($0) {
			return flags.hasOwnProperty($0) ? flags[$0] : $0.substring(1);
		});
	},
	jqID : function(sid){
		return String(sid).replace(/[!"#$%&'()*+,.\/:; <=>?@\[\\\]\^`{|}~]/g,"\\$&");
	},
	guid : 1,
	uidPref: 'jqg',
	randId : function( prefix )	{
		return (prefix || $.jgrid.uidPref) + ($.jgrid.guid++);
	},
	getAccessor : function(obj, expr) {
		var ret,p,prm = [], i;
		if( typeof expr === 'function') { return expr(obj); }
		ret = obj[expr];
		if(ret===undefined) {
			try {
				if ( typeof expr === 'string' ) {
					prm = expr.split('.');
				}
				i = prm.length;
				if( i ) {
					ret = obj;
					while (ret && i--) {
						p = prm.shift();
						ret = ret[p];
					}
				}
			} catch (e) {}
		}
		return ret;
	},
	getXmlData: function (obj, expr, returnObj) {
		var ret, m = typeof expr === 'string' ? expr.match(/^(.*)\[(\w+)\]$/) : null;
		if (typeof expr === 'function') { return expr(obj); }
		if (m && m[2]) {
			// m[2] is the attribute selector
			// m[1] is an optional element selector
			// examples: "[id]", "rows[page]"
			return m[1] ? $(m[1], obj).attr(m[2]) : $(obj).attr(m[2]);
		}
		ret = $(expr, obj);
		if (returnObj) { return ret; }
		//$(expr, obj).filter(':last'); // we use ':last' to be more compatible with old version of jqGrid
		return ret.length > 0 ? $(ret).text() : undefined;
	},
	cellWidth : function () {
		var $testDiv = $("<div class='ui-jqgrid' style='left:10000px'><table class='ui-jqgrid-btable ui-common-table' style='width:5px;'><tr class='jqgrow'><td style='width:5px;display:block;'></td></tr></table></div>"),
		testCell = $testDiv.appendTo("body")
			.find("td")
			.width();
		$testDiv.remove();
		return Math.abs(testCell-5) > 0.1;
	},
	isLocalStorage : function () {
		try {
			return 'localStorage' in window && window.localStorage !== null;
		} catch (e) {
			return false;
		}
	},
	getRegional : function(inst, param, def_val) {
		var ret;
		if(def_val !== undefined) {
			return def_val;
		}
		if(inst.p && inst.p.regional && $.jgrid.regional) {
				ret = $.jgrid.getAccessor( $.jgrid.regional[inst.p.regional] || {}, param);
		}
		if(ret === undefined ) {
			ret = $.jgrid.getAccessor( $.jgrid, param);
		}
		return ret;
	},
	isMobile : function() {
		try {
			if(/Android|webOS|iPhone|iPad|iPod|pocket|psp|kindle|avantgo|blazer|midori|Tablet|Palm|maemo|plucker|phone|BlackBerry|symbian|IEMobile|mobile|ZuneWP7|Windows Phone|Opera Mini/i.test(navigator.userAgent)) {
				return true;
			}
			return false;
		} catch(e)	{ 
			return false; 
		}	
	},
	cell_width : true,
	ajaxOptions: {},
	from : function(source){
		// Original Author Hugo Bonacci
		// License MIT http://jlinq.codeplex.com/license
		var $t = this,
		QueryObject=function(d,q){
		if(typeof d==="string"){
			d=$.data(d);
		}
		var self=this,
		_data=d,
		_usecase=true,
		_trim=false,
		_query=q,
		_stripNum = /[\$,%]/g,
		_lastCommand=null,
		_lastField=null,
		_orDepth=0,
		_negate=false,
		_queuedOperator="",
		_sorting=[],
		_useProperties=true;
		if(typeof d==="object"&&d.push) {
			if(d.length>0){
				if(typeof d[0]!=="object"){
					_useProperties=false;
				}else{
					_useProperties=true;
				}
			}
		}else{
			throw "data provides is not an array";
		}
		this._hasData=function(){
			return _data===null?false:_data.length===0?false:true;
		};
		this._getStr=function(s){
			var phrase=[];
			if(_trim){
				phrase.push("jQuery.trim(");
			}
			phrase.push("String("+s+")");
			if(_trim){
				phrase.push(")");
			}
			if(!_usecase){
				phrase.push(".toLowerCase()");
			}
			return phrase.join("");
		};
		this._strComp=function(val){
			if(typeof val==="string"){
				return".toString()";
			}
			return"";
		};
		this._group=function(f,u){
			return({field:f.toString(),unique:u,items:[]});
		};
		this._toStr=function(phrase){
			if(_trim){
				phrase=$.trim(phrase);
			}
			phrase=phrase.toString().replace(/\\/g,'\\\\').replace(/\"/g,'\\"');
			return _usecase ? phrase : phrase.toLowerCase();
		};
		this._funcLoop=function(func){
			var results=[];
			$.each(_data,function(i,v){
				results.push(func(v));
			});
			return results;
		};
		this._append=function(s){
			var i;
			if(_query===null){
				_query="";
			} else {
				_query+=_queuedOperator === "" ? " && " :_queuedOperator;
			}
			for (i=0;i<_orDepth;i++){
				_query+="(";
			}
			if(_negate){
				_query+="!";
			}
			_query+="("+s+")";
			_negate=false;
			_queuedOperator="";
			_orDepth=0;
		};
		this._setCommand=function(f,c){
			_lastCommand=f;
			_lastField=c;
		};
		this._resetNegate=function(){
			_negate=false;
		};
		this._repeatCommand=function(f,v){
			if(_lastCommand===null){
				return self;
			}
			if(f!==null&&v!==null){
				return _lastCommand(f,v);
			}
			if(_lastField===null){
				return _lastCommand(f);
			}
			if(!_useProperties){
				return _lastCommand(f);
			}
			return _lastCommand(_lastField,f);
		};
		this._equals=function(a,b){
			return(self._compare(a,b,1)===0);
		};
		this._compare=function(a,b,d){
			var toString = Object.prototype.toString;
			if( d === undefined) { d = 1; }
			if(a===undefined) { a = null; }
			if(b===undefined) { b = null; }
			if(a===null && b===null){
				return 0;
			}
			if(a===null&&b!==null){
				return 1;
			}
			if(a!==null&&b===null){
				return -1;
			}
			if (toString.call(a) === '[object Date]' && toString.call(b) === '[object Date]') {
				if (a < b) { return -d; }
				if (a > b) { return d; }
				return 0;
			}
			if(!_usecase && typeof a !== "number" && typeof b !== "number" ) {
				a=String(a);
				b=String(b);
			}
			if(a<b){return -d;}
			if(a>b){return d;}
			return 0;
		};
		this._performSort=function(){
			if(_sorting.length===0){return;}
			_data=self._doSort(_data,0);
		};
		this._doSort=function(d,q){
			var by=_sorting[q].by,
			dir=_sorting[q].dir,
			type = _sorting[q].type,
			dfmt = _sorting[q].datefmt,
			sfunc = _sorting[q].sfunc;
			if(q===_sorting.length-1){
				return self._getOrder(d, by, dir, type, dfmt, sfunc);
			}
			q++;
			var values=self._getGroup(d,by,dir,type,dfmt), results=[], i, j, sorted;
			for(i=0;i<values.length;i++){
				sorted=self._doSort(values[i].items,q);
				for(j=0;j<sorted.length;j++){
					results.push(sorted[j]);
				}
			}
			return results;
		};
		this._getOrder=function(data,by,dir,type, dfmt, sfunc){
			var sortData=[],_sortData=[], newDir = dir==="a" ? 1 : -1, i,ab,j,
			findSortKey;

			if(type === undefined ) { type = "text"; }
			if (type === 'float' || type=== 'number' || type=== 'currency' || type=== 'numeric') {
				findSortKey = function($cell) {
					var key = parseFloat( String($cell).replace(_stripNum, ''));
					return isNaN(key) ? Number.NEGATIVE_INFINITY : key;
				};
			} else if (type==='int' || type==='integer') {
				findSortKey = function($cell) {
					return $cell ? parseFloat(String($cell).replace(_stripNum, '')) : Number.NEGATIVE_INFINITY;
				};
			} else if(type === 'date' || type === 'datetime') {
				findSortKey = function($cell) {
					return $.jgrid.parseDate.call($t, dfmt, $cell).getTime();
				};
			} else if($.isFunction(type)) {
				findSortKey = type;
			} else {
				findSortKey = function($cell) {
					$cell = $cell ? $.trim(String($cell)) : "";
					return _usecase ? $cell : $cell.toLowerCase();
				};
			}
			$.each(data,function(i,v){
				ab = by!=="" ? $.jgrid.getAccessor(v,by) : v;
				if(ab === undefined) { ab = ""; }
				ab = findSortKey(ab, v);
				_sortData.push({ 'vSort': ab,'index':i});
			});
			if($.isFunction(sfunc)) {
				_sortData.sort(function(a,b){
					return sfunc.call(this,a.vSort, b.vSort, newDir, a, b);
				});
			} else {
				_sortData.sort(function(a,b){
					return self._compare(a.vSort, b.vSort,newDir);
				});
			}
			j=0;
			var nrec= data.length;
			// overhead, but we do not change the original data.
			while(j<nrec) {
				i = _sortData[j].index;
				sortData.push(data[i]);
				j++;
			}
			return sortData;
		};
		this._getGroup=function(data,by,dir,type, dfmt){
			var results=[],
			group=null,
			last=null, val;
			$.each(self._getOrder(data,by,dir,type, dfmt),function(i,v){
				val = $.jgrid.getAccessor(v, by);
				if(val == null) { val = ""; }
				if(!self._equals(last,val)){
					last=val;
					if(group !== null){
						results.push(group);
					}
					group=self._group(by,val);
				}
				group.items.push(v);
			});
			if(group !== null){
				results.push(group);
			}
			return results;
		};
		this.ignoreCase=function(){
			_usecase=false;
			return self;
		};
		this.useCase=function(){
			_usecase=true;
			return self;
		};
		this.trim=function(){
			_trim=true;
			return self;
		};
		this.noTrim=function(){
			_trim=false;
			return self;
		};
		this.execute=function(){
			var match=_query, results=[];
			if(match === null){
				return self;
			}
			$.each(_data,function(){
				if(eval(match)){results.push(this);}
			});
			_data=results;
			return self;
		};
		this.data=function(){
			return _data;
		};
		this.select=function(f){
			self._performSort();
			if(!self._hasData()){ return[]; }
			self.execute();
			if($.isFunction(f)){
				var results=[];
				$.each(_data,function(i,v){
					results.push(f(v));
				});
				return results;
			}
			return _data;
		};
		this.hasMatch=function(){
			if(!self._hasData()) { return false; }
			self.execute();
			return _data.length>0;
		};
		this.andNot=function(f,v,x){
			_negate=!_negate;
			return self.and(f,v,x);
		};
		this.orNot=function(f,v,x){
			_negate=!_negate;
			return self.or(f,v,x);
		};
		this.not=function(f,v,x){
			return self.andNot(f,v,x);
		};
		this.and=function(f,v,x){
			_queuedOperator=" && ";
			if(f===undefined){
				return self;
			}
			return self._repeatCommand(f,v,x);
		};
		this.or=function(f,v,x){
			_queuedOperator=" || ";
			if(f===undefined) { return self; }
			return self._repeatCommand(f,v,x);
		};
		this.orBegin=function(){
			_orDepth++;
			return self;
		};
		this.orEnd=function(){
			if (_query !== null){
				_query+=")";
			}
			return self;
		};
		this.isNot=function(f){
			_negate=!_negate;
			return self.is(f);
		};
		this.is=function(f){
			self._append('this.'+f);
			self._resetNegate();
			return self;
		};
		this._compareValues=function(func,f,v,how,t){
			var fld;
			if(_useProperties){
				fld='jQuery.jgrid.getAccessor(this,\''+f+'\')';
			}else{
				fld='this';
			}
			if(v===undefined) { v = null; }
			//var val=v===null?f:v,
			var val =v,
			swst = t.stype === undefined ? "text" : t.stype;
			if(v !== null) {
			switch(swst) {
				case 'int':
				case 'integer':
					val = (isNaN(Number(val)) || val==="") ? '0' : val; // To be fixed with more inteligent code
					fld = 'parseInt('+fld+',10)';
					val = 'parseInt('+val+',10)';
					break;
				case 'float':
				case 'number':
				case 'numeric':
					val = String(val).replace(_stripNum, '');
					val = (isNaN(Number(val)) || val==="") ? '0' : val; // To be fixed with more inteligent code
					fld = 'parseFloat('+fld+')';
					val = 'parseFloat('+val+')';
					break;
				case 'date':
				case 'datetime':
					val = String($.jgrid.parseDate.call($t, t.srcfmt || 'Y-m-d',val).getTime());
					fld = 'jQuery.jgrid.parseDate.call(jQuery("#'+$.jgrid.jqID($t.p.id)+'")[0],"'+t.srcfmt+'",'+fld+').getTime()';
					break;
				default :
					fld=self._getStr(fld);
					val=self._getStr('"'+self._toStr(val)+'"');
			}
			}
			self._append(fld+' '+how+' '+val);
			self._setCommand(func,f);
			self._resetNegate();
			return self;
		};
		this.equals=function(f,v,t){
			return self._compareValues(self.equals,f,v,"==",t);
		};
		this.notEquals=function(f,v,t){
			return self._compareValues(self.equals,f,v,"!==",t);
		};
		this.isNull = function(f,v,t){
			return self._compareValues(self.equals,f,null,"===",t);
		};
		this.greater=function(f,v,t){
			return self._compareValues(self.greater,f,v,">",t);
		};
		this.less=function(f,v,t){
			return self._compareValues(self.less,f,v,"<",t);
		};
		this.greaterOrEquals=function(f,v,t){
			return self._compareValues(self.greaterOrEquals,f,v,">=",t);
		};
		this.lessOrEquals=function(f,v,t){
			return self._compareValues(self.lessOrEquals,f,v,"<=",t);
		};
		this.startsWith=function(f,v){
			var val = (v==null) ? f: v,
			length=_trim ? $.trim(val.toString()).length : val.toString().length;
			if(_useProperties){
				self._append(self._getStr('jQuery.jgrid.getAccessor(this,\''+f+'\')')+'.substr(0,'+length+') == '+self._getStr('"'+self._toStr(v)+'"'));
			}else{
				if (v!=null) { length=_trim?$.trim(v.toString()).length:v.toString().length; }
				self._append(self._getStr('this')+'.substr(0,'+length+') == '+self._getStr('"'+self._toStr(f)+'"'));
			}
			self._setCommand(self.startsWith,f);
			self._resetNegate();
			return self;
		};
		this.endsWith=function(f,v){
			var val = (v==null) ? f: v,
			length=_trim ? $.trim(val.toString()).length:val.toString().length;
			if(_useProperties){
				self._append(self._getStr('jQuery.jgrid.getAccessor(this,\''+f+'\')')+'.substr('+self._getStr('jQuery.jgrid.getAccessor(this,\''+f+'\')')+'.length-'+length+','+length+') == "'+self._toStr(v)+'"');
			} else {
				self._append(self._getStr('this')+'.substr('+self._getStr('this')+'.length-"'+self._toStr(f)+'".length,"'+self._toStr(f)+'".length) == "'+self._toStr(f)+'"');
			}
			self._setCommand(self.endsWith,f);self._resetNegate();
			return self;
		};
		this.contains=function(f,v){
			if(_useProperties){
				self._append(self._getStr('jQuery.jgrid.getAccessor(this,\''+f+'\')')+'.indexOf("'+self._toStr(v)+'",0) > -1');
			}else{
				self._append(self._getStr('this')+'.indexOf("'+self._toStr(f)+'",0) > -1');
			}
			self._setCommand(self.contains,f);
			self._resetNegate();
			return self;
		};
		this.groupBy=function(by,dir,type, datefmt){
			if(!self._hasData()){
				return null;
			}
			return self._getGroup(_data,by,dir,type, datefmt);
		};
		this.orderBy=function(by,dir,stype, dfmt, sfunc){
			dir = dir == null ? "a" :$.trim(dir.toString().toLowerCase());
			if(stype == null) { stype = "text"; }
			if(dfmt == null) { dfmt = "Y-m-d"; }
			if(sfunc == null) { sfunc = false; }
			if(dir==="desc"||dir==="descending"){dir="d";}
			if(dir==="asc"||dir==="ascending"){dir="a";}
			_sorting.push({by:by,dir:dir,type:stype, datefmt: dfmt, sfunc: sfunc});
			return self;
		};
		return self;
		};
	return new QueryObject(source,null);
	},
	getMethod: function (name) {
        return this.getAccessor($.fn.jqGrid, name);
	},
	extend : function(methods) {
		$.extend($.fn.jqGrid,methods);
		if (!this.no_legacy_api) {
			$.fn.extend(methods);
		}
	},
	clearBeforeUnload : function( jqGridId ) {
		var $t = $("#"+$.jgrid.jqID( jqGridId ))[0], grid;
		if(!$t.grid) { return;}
		grid = $t.grid;
		if ($.isFunction(grid.emptyRows)) {
			grid.emptyRows.call($t, true, true); // this work quick enough and reduce the size of memory leaks if we have someone
		}

		$(document).off("mouseup.jqGrid" + $t.p.id ); 
		$(grid.hDiv).off("mousemove"); // TODO add namespace
		$($t).off();
		var i, l = grid.headers.length,
		removevents = ['formatCol','sortData','updatepager','refreshIndex','setHeadCheckBox','constructTr','formatter','addXmlData','addJSONData','grid','p', 'addLocalData'];
		for (i = 0; i < l; i++) {
			grid.headers[i].el = null;
		}

		for( i in grid) {
			if( grid.hasOwnProperty(i)) {
				grid[i] = null;
			}
		}
		// experimental 
		for( i in $t.p) {
			if($t.p.hasOwnProperty(i)) {
				$t.p[i] = $.isArray($t.p[i]) ? [] : null;
			}
		}
		l = removevents.length;
		for(i = 0; i < l; i++) {
			if($t.hasOwnProperty(removevents[i])) {
				$t[removevents[i]] = null;
				delete($t[removevents[i]]);
			}
		}
	},
	gridUnload : function ( jqGridId ) {
		if(!jqGridId) { return; }
		jqGridId = $.trim(jqGridId);
		if(jqGridId.indexOf("#") === 0) {
			jqGridId = jqGridId.substring(1);
		}
		
		var $t = $("#"+ $.jgrid.jqID(jqGridId))[0];
		if ( !$t.grid ) {return;}
		var defgrid = {id: $($t).attr('id'),cl: $($t).attr('class')};
		if ($t.p.pager) {
			$($t.p.pager).off().empty().removeClass("ui-state-default ui-jqgrid-pager ui-corner-bottom");
		}
		var newtable = document.createElement('table');
		newtable.className = defgrid.cl;
		var gid = $.jgrid.jqID($t.id);
		$(newtable).removeClass("ui-jqgrid-btable ui-common-table").insertBefore("#gbox_"+gid);
		if( $($t.p.pager).parents("#gbox_"+gid).length === 1 ) {
			$($t.p.pager).insertBefore("#gbox_"+gid);
		}
		$.jgrid.clearBeforeUnload( jqGridId );
		$("#gbox_"+gid).remove();
		$(newtable).attr({id:defgrid.id});
		$("#alertmod_"+$.jgrid.jqID(jqGridId)).remove();
	},
	gridDestroy : function ( jqGridId ) {
		if(!jqGridId) { return; }
		jqGridId = $.trim(jqGridId);
		if(jqGridId.indexOf("#") === 0) {
			jqGridId = jqGridId.substring(1);
		}
		var $t = $("#"+ $.jgrid.jqID(jqGridId))[0];
		if ( !$t.grid ) {return;}
		if ( $t.p.pager ) { // if not part of grid
			$($t.p.pager).remove();
		}
		try {
			$.jgrid.clearBeforeUnload( jqGridId );
			$("#gbox_"+$.jgrid.jqID(jqGridId)).remove();
		} catch (_) {}
	},
	styleUI : {
		jQueryUI : {
			common : {
				disabled: "ui-state-disabled",
				highlight : "ui-state-highlight",
				hover : "ui-state-hover",
				cornerall: "ui-corner-all",
				cornertop: "ui-corner-top",
				cornerbottom : "ui-corner-bottom",
				hidden : "ui-helper-hidden",
				icon_base : "ui-icon",
				overlay : "ui-widget-overlay",
				active : "ui-state-active",
				error : "ui-state-error",
				button : "ui-state-default ui-corner-all",
				content : "ui-widget-content"
			},
			base : {
				entrieBox : "ui-widget ui-widget-content ui-corner-all", // entrie div  incl everthing
				viewBox : "", // view diw
				headerTable : "",
				headerBox : "ui-state-default",
				rowTable : "",
				rowBox : "ui-widget-content",
				stripedTable : "ui-jqgrid-table-striped",
				footerTable : "",
				footerBox : "ui-widget-content",
				headerDiv : "ui-state-default",
				gridtitleBox : "ui-widget-header ui-corner-top ui-helper-clearfix",
				customtoolbarBox : "ui-state-default",
				//overlayBox: "ui-widget-overlay",
				loadingBox : "ui-state-default ui-state-active",
				rownumBox :  "ui-state-default",
				scrollBox : "ui-widget-content",
				multiBox : "",
				pagerBox : "ui-state-default ui-corner-bottom",
				pagerTable : "",
				toppagerBox : "ui-state-default",
				pgInput : "ui-corner-all",
				pgSelectBox : "ui-widget-content ui-corner-all",
				pgButtonBox : "ui-corner-all",
				icon_first : "ui-icon-seek-first",
				icon_prev : "ui-icon-seek-prev",
				icon_next: "ui-icon-seek-next",
				icon_end: "ui-icon-seek-end",
				icon_asc : "ui-icon-triangle-1-n",
				icon_desc : "ui-icon-triangle-1-s",
				icon_caption_open : "ui-icon-circle-triangle-n",
				icon_caption_close : "ui-icon-circle-triangle-s"
			},
			modal : {
				modal : "ui-widget ui-widget-content ui-corner-all ui-dialog",
				header : "ui-widget-header ui-corner-all ui-helper-clearfix",
				content :"ui-widget-content",
				resizable : "ui-resizable-handle ui-resizable-se",
				icon_close : "ui-icon-closethick",
				icon_resizable : "ui-icon-gripsmall-diagonal-se"
			},
			celledit : {
				inputClass : "ui-widget-content ui-corner-all"
			}, 
			inlinedit : {
				inputClass : "ui-widget-content ui-corner-all",
				icon_edit_nav : "ui-icon-pencil",
				icon_add_nav : "ui-icon-plus",
				icon_save_nav : "ui-icon-disk",
				icon_cancel_nav : "ui-icon-cancel"
			},
			formedit : {
				inputClass : "ui-widget-content ui-corner-all",
				icon_prev : "ui-icon-triangle-1-w",
				icon_next : "ui-icon-triangle-1-e",
				icon_save : "ui-icon-disk",
				icon_close : "ui-icon-close",
				icon_del : "ui-icon-scissors",
				icon_cancel : "ui-icon-cancel"
			},
			navigator : {
				icon_edit_nav : "ui-icon-pencil",
				icon_add_nav : "ui-icon-plus",
				icon_del_nav : "ui-icon-trash",
				icon_search_nav : "ui-icon-search",
				icon_refresh_nav : "ui-icon-refresh",
				icon_view_nav : "ui-icon-document",
				icon_newbutton_nav : "ui-icon-newwin"
			},
			grouping : {
				icon_plus : 'ui-icon-circlesmall-plus',
				icon_minus : 'ui-icon-circlesmall-minus'
			},
			filter : {
				table_widget : 'ui-widget ui-widget-content',
				srSelect : 'ui-widget-content ui-corner-all',
				srInput : 'ui-widget-content ui-corner-all',
				menu_widget : 'ui-widget ui-widget-content ui-corner-all',
				icon_search : 'ui-icon-search',
				icon_reset : 'ui-icon-arrowreturnthick-1-w',
				icon_query :'ui-icon-comment'
			},
			subgrid : {
				icon_plus : 'ui-icon-plus',
				icon_minus : 'ui-icon-minus',
				icon_open : 'ui-icon-carat-1-sw'
			},
			treegrid : {
				icon_plus : 'ui-icon-triangle-1-',
				icon_minus : 'ui-icon-triangle-1-s',
				icon_leaf : 'ui-icon-radio-off'
			},
			fmatter : {
				icon_edit : "ui-icon-pencil",
				icon_add : "ui-icon-plus",
				icon_save : "ui-icon-disk",
				icon_cancel : "ui-icon-cancel",
				icon_del : "ui-icon-trash"
			},
			colmenu : {
				menu_widget : 'ui-widget ui-widget-content ui-corner-all',
				input_checkbox : "ui-widget ui-widget-content",
				filter_select: "ui-widget-content ui-corner-all",
				filter_input : "ui-widget-content ui-corner-all",
				icon_menu : "ui-icon-comment",
				icon_sort_asc : "ui-icon-arrow-1-n",
				icon_sort_desc : "ui-icon-arrow-1-s",
				icon_columns : "ui-icon-extlink",
				icon_filter : "ui-icon-calculator",
				icon_group : "ui-icon-grip-solid-horizontal",
				icon_freeze : "ui-icon-grip-solid-vertical",
				icon_move: "ui-icon-arrow-4"
			}
		},
		Bootstrap : {
			common : {
				disabled: "ui-disabled",
				highlight : "success",
				hover : "active",
				cornerall: "", 
				cornertop: "",
				cornerbottom : "",
				hidden : "",
				icon_base : "glyphicon",
				overlay: "ui-overlay",
				active : "active",
				error : "bg-danger",
				button : "btn btn-default",
				content : ""
			},
			base : {
				entrieBox : "",
				viewBox : "table-responsive",
				headerTable : "table table-bordered",
				headerBox : "",
				rowTable : "table table-bordered",
				rowBox : "",
				stripedTable : "table-striped",
				footerTable : "table table-bordered",
				footerBox : "",
				headerDiv : "",
				gridtitleBox : "",
				customtoolbarBox : "",
				//overlayBox: "ui-overlay",
				loadingBox : "row",
				rownumBox :  "active",
				scrollBox : "",
				multiBox : "checkbox",
				pagerBox : "",
				pagerTable : "table",
				toppagerBox : "",
				pgInput : "form-control",
				pgSelectBox : "form-control",
				pgButtonBox : "",
				icon_first : "glyphicon-step-backward",
				icon_prev : "glyphicon-backward",
				icon_next: "glyphicon-forward",
				icon_end: "glyphicon-step-forward",
				icon_asc : "glyphicon-triangle-top",
				icon_desc : "glyphicon-triangle-bottom",
				icon_caption_open : "glyphicon-circle-arrow-up",
				icon_caption_close : "glyphicon-circle-arrow-down"
			},
			modal : {
				modal : "modal-content",
				header : "modal-header",
				title : "modal-title",
				content :"modal-body",
				resizable : "ui-resizable-handle ui-resizable-se",
				icon_close : "glyphicon-remove-circle",
				icon_resizable : "glyphicon-import"
			},
			celledit : {
				inputClass : 'form-control'
			}, 
			inlinedit : {
				inputClass : 'form-control',
				icon_edit_nav : "glyphicon-edit",
				icon_add_nav : "glyphicon-plus",
				icon_save_nav : "glyphicon-save",
				icon_cancel_nav : "glyphicon-remove-circle"
			},
			formedit : {
				inputClass : "form-control",
				icon_prev : "glyphicon-step-backward",
				icon_next : "glyphicon-step-forward",
				icon_save : "glyphicon-save",
				icon_close : "glyphicon-remove-circle",
				icon_del : "glyphicon-trash",
				icon_cancel : "glyphicon-remove-circle"
			},
			navigator : {
				icon_edit_nav : "glyphicon-edit",
				icon_add_nav : "glyphicon-plus",
				icon_del_nav : "glyphicon-trash",
				icon_search_nav : "glyphicon-search",
				icon_refresh_nav : "glyphicon-refresh",
				icon_view_nav : "glyphicon-info-sign",
				icon_newbutton_nav : "glyphicon-new-window"
			},
			grouping : {
				icon_plus : 'glyphicon-triangle-right',
				icon_minus : 'glyphicon-triangle-bottom'
			},
			filter : {
				table_widget : 'table table-condensed',
				srSelect : 'form-control',
				srInput : 'form-control',
				menu_widget : '',
				icon_search : 'glyphicon-search',
				icon_reset : 'glyphicon-refresh',
				icon_query :'glyphicon-comment'
			},
			subgrid : {
				icon_plus : 'glyphicon-triangle-right',
				icon_minus : 'glyphicon-triangle-bottom',
				icon_open : 'glyphicon-indent-left'
			},
			treegrid : {
				icon_plus : 'glyphicon-triangle-right',
				icon_minus : 'glyphicon-triangle-bottom',
				icon_leaf : 'glyphicon-unchecked'
			},
			fmatter : {
				icon_edit : "glyphicon-edit",
				icon_add : "glyphicon-plus",
				icon_save : "glyphicon-save",
				icon_cancel : "glyphicon-remove-circle",
				icon_del : "glyphicon-trash"
			},
			colmenu : {
				menu_widget : '',
				input_checkbox : "",
				filter_select: "form-control",
				filter_input : "form-control",
				icon_menu : "glyphicon-menu-hamburger",
				icon_sort_asc : "glyphicon-sort-by-alphabet",
				icon_sort_desc : "glyphicon-sort-by-alphabet-alt",
				icon_columns : "glyphicon-list-alt",
				icon_filter : "glyphicon-filter",
				icon_group : "glyphicon-align-left",
				icon_freeze : "glyphicon-object-align-horizontal",
				icon_move: "glyphicon-move"
			}
		}
	}
});

$.fn.jqGrid = function( pin ) {
	if (typeof pin === 'string') {
		var fn = $.jgrid.getMethod(pin);
		if (!fn) {
			throw ("jqGrid - No such method: " + pin);
		}
		var args = $.makeArray(arguments).slice(1);
		return fn.apply(this,args);
	}
	return this.each( function() {
		if(this.grid) {return;}
		var localData;
		if (pin != null && pin.data !== undefined) {
			localData = pin.data;
			pin.data = [];
		}

		var p = $.extend(true,{
			url: "",
			height: 150,
			page: 1,
			rowNum: 20,
			rowTotal : null,
			records: 0,
			pager: "",
			pgbuttons: true,
			pginput: true,
			colModel: [],
			rowList: [],
			colNames: [],
			sortorder: "asc",
			sortname: "",
			datatype: "xml",
			mtype: "GET",
			altRows: false,
			selarrrow: [],
			savedRow: [],
			shrinkToFit: true,
			xmlReader: {},
			jsonReader: {},
			subGrid: false,
			subGridModel :[],
			reccount: 0,
			lastpage: 0,
			lastsort: 0,
			selrow: null,
			beforeSelectRow: null,
			onSelectRow: null,
			onSortCol: null,
			ondblClickRow: null,
			onRightClickRow: null,
			onPaging: null,
			onSelectAll: null,
			onInitGrid : null,
			loadComplete: null,
			gridComplete: null,
			loadError: null,
			loadBeforeSend: null,
			afterInsertRow: null,
			beforeRequest: null,
			beforeProcessing : null,
			onHeaderClick: null,
			viewrecords: false,
			loadonce: false,
			multiselect: false,
			multikey: false,
			multiboxonly : false,
			multimail : false,
			multiselectWidth: 30,
			editurl: null,
			search: false,
			caption: "",
			hidegrid: true,
			hiddengrid: false,
			postData: {},
			userData: {},
			treeGrid : false,
			treeGridModel : 'nested',
			treeReader : {},
			treeANode : -1,
			ExpandColumn: null,
			tree_root_level : 0,
			prmNames: {
				page:"page",
				rows:"rows", 
				sort: "sidx",
				order: "sord", 
				search:"_search", 
				nd:"nd", 
				id:"id",
				oper:"oper",
				editoper:"edit",
				addoper:"add",
				deloper:"del", 
				subgridid:"id", 
				npage: null, 
				totalrows:"totalrows"
			},
			forceFit : false,
			gridstate : "visible",
			cellEdit: false,
			cellsubmit: "remote",
			nv:0,
			loadui: "enable",
			toolbar: [false,""],
			scroll: false,
			deselectAfterSort : true,
			scrollrows : false,
			autowidth: false,
			scrollOffset : 18,
			cellLayout: 5,
			subGridWidth: 20,
			gridview: true,
			rownumWidth: 35,
			rownumbers : false,
			pagerpos: 'center',
			recordpos: 'right',
			footerrow : false,
			userDataOnFooter : false,
			hoverrows : true,
			viewsortcols : [false,'vertical',true],
			resizeclass : '',
			autoencode : false,
			remapColumns : [],
			ajaxGridOptions :{},
			direction : "ltr",
			toppager: false,
			headertitles: false,
			scrollTimeout: 40,
			data : [],
			_index : {},
			grouping : false,
			groupingView : {
				groupField:[],
				groupOrder:[], 
				groupText:[],
				groupColumnShow:[],
				groupSummary:[], 
				showSummaryOnHide: false, 
				sortitems:[], 
				sortnames:[], 
				summary:[],
				summaryval:[], 
				plusicon: '',  
				minusicon: '', 
				displayField: [], 
				groupSummaryPos:[], 
				formatDisplayField : [], 
				_locgr : false
			},
			ignoreCase : true,
			cmTemplate : {},
			idPrefix : "",
			multiSort :  false,
			minColWidth : 33,
			scrollPopUp : false,
			scrollTopOffset: 0, // pixel
			scrollLeftOffset : "100%", //percent
			scrollMaxBuffer : 0,
			storeNavOptions: false,
			regional :  "en",
			styleUI : "jQueryUI",
			responsive : false,
			restoreCellonFail : true,
			colFilters : {},
			colMenu : false
		}, $.jgrid.defaults , pin );
		if (localData !== undefined) {
			p.data = localData;
			pin.data = localData;
		}
		var ts= this, grid={
			headers:[],
			cols:[],
			footers: [],
			dragStart: function(i,x,y) {
				var gridLeftPos = $(this.bDiv).offset().left;
				this.resizing = { idx: i, startX: x.pageX, sOL : x.pageX - gridLeftPos };
				this.hDiv.style.cursor = "col-resize";
				this.curGbox = $("#rs_m"+$.jgrid.jqID(p.id),"#gbox_"+$.jgrid.jqID(p.id));
				this.curGbox.css({display:"block",left:x.pageX-gridLeftPos,top:y[1],height:y[2]});
				$(ts).triggerHandler("jqGridResizeStart", [x, i]);
				if($.isFunction(p.resizeStart)) { p.resizeStart.call(ts,x,i); }
				document.onselectstart=function(){return false;};
			},
			dragMove: function(x) {
				if(this.resizing) {
					var diff = x.pageX-this.resizing.startX,
					h = this.headers[this.resizing.idx],
					newWidth = p.direction === "ltr" ? h.width + diff : h.width - diff, hn, nWn;
					if(newWidth > 33) {
						this.curGbox.css({left:this.resizing.sOL+diff});
						if(p.forceFit===true ){
							hn = this.headers[this.resizing.idx+p.nv];
							nWn = p.direction === "ltr" ? hn.width - diff : hn.width + diff;
							if(nWn > p.minColWidth ) {
								h.newWidth = newWidth;
								hn.newWidth = nWn;
							}
						} else {
							this.newWidth = p.direction === "ltr" ? p.tblwidth+diff : p.tblwidth-diff;
							h.newWidth = newWidth;
						}
					}
				}
			},
			dragEnd: function( events ) {
				this.hDiv.style.cursor = "default";
				if(this.resizing) {
					var idx = this.resizing.idx,
					nw = this.headers[idx].newWidth || this.headers[idx].width;
					nw = parseInt(nw,10);
					this.resizing = false;
					$("#rs_m"+$.jgrid.jqID(p.id)).css("display","none");
					p.colModel[idx].width = nw;
					this.headers[idx].width = nw;
					this.headers[idx].el.style.width = nw + "px";
					this.cols[idx].style.width = nw+"px";
					if(this.footers.length>0) {this.footers[idx].style.width = nw+"px";}
					if(p.forceFit===true){
						nw = this.headers[idx+p.nv].newWidth || this.headers[idx+p.nv].width;
						this.headers[idx+p.nv].width = nw;
						this.headers[idx+p.nv].el.style.width = nw + "px";
						this.cols[idx+p.nv].style.width = nw+"px";
						if(this.footers.length>0) {this.footers[idx+p.nv].style.width = nw+"px";}
						p.colModel[idx+p.nv].width = nw;
					} else {
						p.tblwidth = this.newWidth || p.tblwidth;
						$('table:first',this.bDiv).css("width",p.tblwidth+"px");
						$('table:first',this.hDiv).css("width",p.tblwidth+"px");
						this.hDiv.scrollLeft = this.bDiv.scrollLeft;
						if(p.footerrow) {
							$('table:first',this.sDiv).css("width",p.tblwidth+"px");
							this.sDiv.scrollLeft = this.bDiv.scrollLeft;
						}
					}
					if(events) {
						$(ts).triggerHandler("jqGridResizeStop", [nw, idx]);
						if($.isFunction(p.resizeStop)) { p.resizeStop.call(ts,nw,idx); }
					}
				}
				this.curGbox = null;
				document.onselectstart=function(){return true;};
			},
			populateVisible: function() {
				if (grid.timer) { clearTimeout(grid.timer); }
				grid.timer = null;
				var dh = $(grid.bDiv).height();
				if (!dh) { return; }
				var table = $("table:first", grid.bDiv);
				var rows, rh;
				if(table[0].rows.length) {
					try {
						rows = table[0].rows[1];
						rh = rows ? $(rows).outerHeight() || grid.prevRowHeight : grid.prevRowHeight;
					} catch (pv) {
						rh = grid.prevRowHeight;
					}
				}
				if (!rh) { return; }
				grid.prevRowHeight = rh;
				var rn = p.rowNum;
				var scrollTop = grid.scrollTop = grid.bDiv.scrollTop;
				var ttop = Math.round(table.position().top) - scrollTop;
				var tbot = ttop + table.height();
				var div = rh * rn;
				var page, npage, empty;
				if ( tbot < dh && ttop <= 0 &&
					(p.lastpage===undefined||(parseInt((tbot + scrollTop + div - 1) / div,10) || 0) <= p.lastpage))
				{
					npage = parseInt((dh - tbot + div - 1) / div,10) || 1;
					if (tbot >= 0 || npage < 2 || p.scroll === true) {
						page = ( Math.round((tbot + scrollTop) / div) || 0) + 1;
						ttop = -1;
					} else {
						ttop = 1;
					}
				}
				if (ttop > 0) {
					page = ( parseInt(scrollTop / div,10) || 0 ) + 1;
					npage = (parseInt((scrollTop + dh) / div,10) || 0) + 2 - page;
					empty = true;
				}
				if (npage) {
					if (p.lastpage && (page > p.lastpage || p.lastpage===1 || (page === p.page && page===p.lastpage)) ) {
						return;
					}
					if (grid.hDiv.loading) {
						grid.timer = setTimeout(grid.populateVisible, p.scrollTimeout);
					} else {
						p.page = page;
						if( p.scrollMaxBuffer > 0 ) {
							if( rn > 0 && p.scrollMaxBuffer < rn ) {
								p.scrollMaxBuffer = rn + 1;
							}
							if(p.reccount  > (p.scrollMaxBuffer - (rn > 0 ? rn : 0) )  ) {
								empty = true;
							}
						}
						if (empty) {
							grid.selectionPreserver(table[0]);
							grid.emptyRows.call(table[0], false, false);
						}
						grid.populate(npage);
					}
					if(p.scrollPopUp && p.lastpage != null) {
						$("#scroll_g"+p.id).show().html( $.jgrid.template( $.jgrid.getRegional(ts, "defaults.pgtext", p.pgtext) , p.page, p.lastpage)).css({ "top": p.scrollTopOffset+scrollTop*((parseInt(p.height,10) - 45)/ (parseInt(rh,10)*parseInt(p.records,10))) +"px", "left" : p.scrollLeftOffset});
						$(this).mouseout(function(){ 
							$("#scroll_g"+p.id).hide();
						});
					}
				}
			},
			scrollGrid: function( e ) {
				if(p.scroll) {
					var scrollTop = grid.bDiv.scrollTop;
					if(grid.scrollTop === undefined) { grid.scrollTop = 0; }
					if (scrollTop !== grid.scrollTop) {
						grid.scrollTop = scrollTop;
						if (grid.timer) { clearTimeout(grid.timer); }
						grid.timer = setTimeout(grid.populateVisible, p.scrollTimeout);
					}
				}
				grid.hDiv.scrollLeft = grid.bDiv.scrollLeft;
				if(p.footerrow) {
					grid.sDiv.scrollLeft = grid.bDiv.scrollLeft;
				}
				if(p.frozenColumns) {
					$(grid.fbDiv).scrollTop( grid.bDiv.scrollTop );
				}
				if( e ) { e.stopPropagation(); }
			},
			selectionPreserver : function(ts) {
				var p = ts.p,
				sr = p.selrow, sra = p.selarrrow ? $.makeArray(p.selarrrow) : null,
				left = ts.grid.bDiv.scrollLeft,
				restoreSelection = function() {
					var i;
					p.selrow = null;
					p.selarrrow = [];
					if(p.multiselect && sra && sra.length>0) {
						for(i=0;i<sra.length;i++){
							if (sra[i] !== sr) {
								$(ts).jqGrid("setSelection",sra[i],false, null);
							}
						}
					}
					if (sr) {
						$(ts).jqGrid("setSelection",sr,false,null);
					}
					ts.grid.bDiv.scrollLeft = left;
					$(ts).off('.selectionPreserver', restoreSelection);
				};
				$(ts).on('jqGridGridComplete.selectionPreserver', restoreSelection);				
			}
		};
		if(this.tagName.toUpperCase() !== 'TABLE' || this.id == null) {
			alert("Element is not a table or has no id!");
			return;
		}
		if(document.documentMode !== undefined ) { // IE only
			if(document.documentMode <= 5) {
				alert("Grid can not be used in this ('quirks') mode!");
				return;
			}
		}
		var i =0, lr, lk, dir;
		for( lk in $.jgrid.regional ){
			if($.jgrid.regional.hasOwnProperty(lk)) {
				if(i===0) { lr = lk; }
				i++;
			}
		}
		if(i === 1 && lr !== p.regional) {
			p.regional = lr;
		}
		$(this).empty().attr("tabindex","0");
		this.p = p ;
		this.p.useProp = !!$.fn.prop;
		if(this.p.colNames.length === 0) {
			for (i=0;i<this.p.colModel.length;i++){
				this.p.colNames[i] = this.p.colModel[i].label || this.p.colModel[i].name;
			}
		}
		if( this.p.colNames.length !== this.p.colModel.length ) {
			alert($.jgrid.getRegional(this,"errors.model"));
			return;
		}
		var getstyle = $.jgrid.getMethod("getStyleUI"),
		stylemodule = ts.p.styleUI + ".common",
		disabled = getstyle(stylemodule,'disabled', true),
		highlight = getstyle(stylemodule,'highlight', true),
		hover = getstyle(stylemodule,'hover', true),
		cornerall = getstyle(stylemodule,'cornerall', true),
		iconbase = getstyle(stylemodule,'icon_base', true),
		colmenustyle = $.jgrid.styleUI[(ts.p.styleUI || 'jQueryUI')].colmenu,
		isMSIE = $.jgrid.msie(),
		gv, sortarr = [], sortord = [], sotmp=[];
		stylemodule = ts.p.styleUI + ".base";
		gv = $("<div "+getstyle(stylemodule, 'viewBox', false, 'ui-jqgrid-view')+" role='grid'></div>");
		ts.p.direction = $.trim(ts.p.direction.toLowerCase());
		ts.p._ald = false;
		if($.inArray(ts.p.direction,["ltr","rtl"]) === -1) { ts.p.direction = "ltr"; }
		dir = ts.p.direction;
		
		$(gv).insertBefore(this);
		$(this).appendTo(gv);
	
		var eg = $("<div "+ getstyle(stylemodule, 'entrieBox', false, 'ui-jqgrid') +"></div>");
		$(eg).attr({"id" : "gbox_"+this.id,"dir":dir}).insertBefore(gv);
		$(gv).attr("id","gview_"+this.id).appendTo(eg);
		$("<div "+getstyle(ts.p.styleUI+'.common','overlay', false, 'jqgrid-overlay')+ " id='lui_"+this.id+"'></div>").insertBefore(gv);
		$("<div "+getstyle(stylemodule,'loadingBox', false, 'loading')+" id='load_"+this.id+"'>"+$.jgrid.getRegional(ts, "defaults.loadtext", this.p.loadtext)+"</div>").insertBefore(gv);
		
		$(this).attr({role:"presentation","aria-multiselectable":!!this.p.multiselect,"aria-labelledby":"gbox_"+this.id});
		
		var sortkeys = ["shiftKey","altKey","ctrlKey"],
		intNum = function(val,defval) {
			val = parseInt(val,10);
			if (isNaN(val)) { return defval || 0;}
			return val;
		},
		formatCol = function (pos, rowInd, tv, rawObject, rowId, rdata){
			var cm = ts.p.colModel[pos], cellAttrFunc,
			ral = cm.align, result="style=\"", clas = cm.classes, nm = cm.name, celp, acp=[];
			if(ral) { result += "text-align:"+ral+";"; }
			if(cm.hidden===true) { result += "display:none;"; }
			if(rowInd===0) {
				result += "width: "+grid.headers[pos].width+"px;";
			} else if ($.isFunction(cm.cellattr) || (typeof cm.cellattr === "string" && $.jgrid.cellattr != null && $.isFunction($.jgrid.cellattr[cm.cellattr]))) {
				cellAttrFunc = $.isFunction(cm.cellattr) ? cm.cellattr : $.jgrid.cellattr[cm.cellattr];
				celp = cellAttrFunc.call(ts, rowId, tv, rawObject, cm, rdata);
				if(celp && typeof celp === "string") {
					celp = celp.replace(/style/i,'style').replace(/title/i,'title');
					if(celp.indexOf('title') > -1) { cm.title=false;}
					if(celp.indexOf('class') > -1) { clas = undefined;}
					acp = celp.replace(/\-style/g,'-sti').split(/style/);
					if(acp.length === 2 ) {
						acp[1] =  $.trim(acp[1].replace(/\-sti/g,'-style').replace("=",""));
						if(acp[1].indexOf("'") === 0 || acp[1].indexOf('"') === 0) {
							acp[1] = acp[1].substring(1);
						}
						result += acp[1].replace(/'/gi,'"');
					} else {
						result += "\"";
					}
				}
			}
			if(!acp.length) { acp[0] = ""; result += "\"";}
			result += (clas !== undefined ? (" class=\""+clas+"\"") :"") + ((cm.title && tv) ? (" title=\""+$.jgrid.stripHtml(tv)+"\"") :"");
			result += " aria-describedby=\""+ts.p.id+"_"+nm+"\"";
			return result + acp[0];
		},
		cellVal =  function (val) {
			return val == null || val === "" ? "&#160;" : (ts.p.autoencode ? $.jgrid.htmlEncode(val) : String(val));
		},
		formatter = function (rowId, cellval , colpos, rwdat, _act){
			var cm = ts.p.colModel[colpos],v;
			if(cm.formatter !== undefined) {
				rowId = String(ts.p.idPrefix) !== "" ? $.jgrid.stripPref(ts.p.idPrefix, rowId) : rowId;
				var opts= {rowId: rowId, colModel:cm, gid:ts.p.id, pos:colpos, styleUI: ts.p.styleUI };
				if($.isFunction( cm.formatter ) ) {
					v = cm.formatter.call(ts,cellval,opts,rwdat,_act);
				} else if($.fmatter){
					v = $.fn.fmatter.call(ts,cm.formatter,cellval,opts,rwdat,_act);
				} else {
					v = cellVal(cellval);
				}
			} else {
				v = cellVal(cellval);
			}
			return v;
		},
		addCell = function(rowId,cell,pos,irow, srvr, rdata) {
			var v,prp;
			v = formatter(rowId,cell,pos,srvr,'add');
			prp = formatCol( pos,irow, v, srvr, rowId, rdata);
			return "<td role=\"gridcell\" "+prp+">"+v+"</td>";
		},
		addMulti = function(rowid, pos, irow, checked, uiclass){
			var	v = "<input role=\"checkbox\" type=\"checkbox\""+" id=\"jqg_"+ts.p.id+"_"+rowid+"\" "+uiclass+" name=\"jqg_"+ts.p.id+"_"+rowid+"\"" + (checked ? "checked=\"checked\"" : "")+"/>",
			prp = formatCol( pos,irow,'',null, rowid, true);
			return "<td role=\"gridcell\" "+prp+">"+v+"</td>";
		},
		addRowNum = function (pos, irow, pG, rN, uiclass ) {
			var v =  (parseInt(pG,10)-1)*parseInt(rN,10)+1+irow,
			prp = formatCol( pos,irow,v, null, irow, true);
			return "<td role=\"gridcell\" "+uiclass+" "+prp+">"+v+"</td>";
		},
		reader = function (datatype) {
			var field, f=[], j=0, i;
			for(i =0; i<ts.p.colModel.length; i++){
				field = ts.p.colModel[i];
				if (field.name !== 'cb' && field.name !=='subgrid' && field.name !=='rn') {
					f[j]= datatype === "local" ?
					field.name :
					( (datatype==="xml" || datatype === "xmlstring") ? field.xmlmap || field.name : field.jsonmap || field.name );
					if(ts.p.keyName !== false && field.key===true ) {
						ts.p.keyName = f[j];
						ts.p.keyIndex = j;
					}
					j++;
				}
			}
			return f;
		},
		orderedCols = function (offset) {
			var order = ts.p.remapColumns;
			if (!order || !order.length) {
				order = $.map(ts.p.colModel, function(v,i) { return i; });
			}
			if (offset) {
				order = $.map(order, function(v) { return v<offset?null:v-offset; });
			}
			return order;
		},
		emptyRows = function (scroll, locdata) {
			var firstrow;
			if (this.p.deepempty) {
				$(this.rows).slice(1).remove();
			} else {
				firstrow = this.rows.length > 0 ? this.rows[0] : null;
				$(this.firstChild).empty().append(firstrow);
			}
			if (scroll && this.p.scroll) {
				$(this.grid.bDiv.firstChild).css({height: "auto"});
				$(this.grid.bDiv.firstChild.firstChild).css({height: "0px", display: "none"});
				if (this.grid.bDiv.scrollTop !== 0) {
					this.grid.bDiv.scrollTop = 0;
				}
			}
			if(locdata === true && this.p.treeGrid && !this.p.loadonce ) {
				this.p.data = []; this.p._index = {};
			}
		},
		normalizeData = function() {
			var p = ts.p, data = p.data, dataLength = data.length, i, j, cur, idn, idr, ccur, v, rd,
			localReader = p.localReader,
			colModel = p.colModel,
			cellName = localReader.cell,
			iOffset = (p.multiselect === true ? 1 : 0) + (p.subGrid === true ? 1 : 0) + (p.rownumbers === true ? 1 : 0),
			br = p.scroll ? $.jgrid.randId() : 1,
			arrayReader, objectReader, rowReader;

			if (p.datatype !== "local" || localReader.repeatitems !== true) {
				return; // nothing to do
			}

			arrayReader = orderedCols(iOffset);
			objectReader = reader("local");
			// read ALL input items and convert items to be read by
			// $.jgrid.getAccessor with column name as the second parameter
			idn = p.keyName === false ?
				($.isFunction(localReader.id) ? localReader.id.call(ts, data) : localReader.id) :
				p.keyName;
			for (i = 0; i < dataLength; i++) {
				cur = data[i];
				// read id in the same way like addJSONData do
				// probably it would be better to start with "if (cellName) {...}"
				// but the goal of the current implementation was just have THE SAME
				// id values like in addJSONData ...
				idr = $.jgrid.getAccessor(cur, idn);
				if (idr === undefined) {
					if (typeof idn === "number" && colModel[idn + iOffset] != null) {
						// reread id by name
						idr = $.jgrid.getAccessor(cur, colModel[idn + iOffset].name);
					}
					if (idr === undefined) {
						idr = br + i;
						if (cellName) {
							ccur = $.jgrid.getAccessor(cur, cellName) || cur;
							idr = ccur != null && ccur[idn] !== undefined ? ccur[idn] : idr;
							ccur = null;
						}
					}
				}
				rd = { };
				rd[localReader.id] = idr;
				if (cellName) {
					cur = $.jgrid.getAccessor(cur, cellName) || cur;
				}
				rowReader = $.isArray(cur) ? arrayReader : objectReader;
				for (j = 0; j < rowReader.length; j++) {
					v = $.jgrid.getAccessor(cur, rowReader[j]);
					rd[colModel[j + iOffset].name] = v;
				}
				data[i] = rd;
				//$.extend(true, data[i], rd);
			}
		},
		refreshIndex = function() {
			var datalen = ts.p.data.length, idname, i, val;

			if(ts.p.keyName === false || ts.p.loadonce === true) {
				idname = ts.p.localReader.id;
			} else {
				idname = ts.p.keyName;
			}
			ts.p._index = [];
			for(i =0;i < datalen; i++) {
				val = $.jgrid.getAccessor(ts.p.data[i],idname);
				if (val === undefined) { val=String(i+1); }
				ts.p._index[val] = i;
			}
		},
		constructTr = function(id, hide, classes, rd, cur ) {
			var tabindex = '-1', restAttr = '', attrName, style = hide ? 'display:none;' : '',
				//classes = getstyle(stylemodule, 'rowBox', true) + ts.p.direction + (altClass ? ' ' + altClass : '') + (selected ? ' ' + highlight : ''),
				rowAttrObj = $(ts).triggerHandler("jqGridRowAttr", [rd, cur, id]);
			if( typeof rowAttrObj !== "object" ) {
				rowAttrObj = $.isFunction(ts.p.rowattr) ? ts.p.rowattr.call(ts, rd, cur, id) :
					(typeof ts.p.rowattr === "string" && $.jgrid.rowattr != null && $.isFunction($.jgrid.rowattr[ts.p.rowattr]) ?
					$.jgrid.rowattr[ts.p.rowattr].call(ts, rd, cur, id) : {});
			}
			if(!$.isEmptyObject( rowAttrObj )) {
				if (rowAttrObj.hasOwnProperty("id")) {
					id = rowAttrObj.id;
					delete rowAttrObj.id;
				}
				if (rowAttrObj.hasOwnProperty("tabindex")) {
					tabindex = rowAttrObj.tabindex;
					delete rowAttrObj.tabindex;
				}
				if (rowAttrObj.hasOwnProperty("style")) {
					style += rowAttrObj.style;
					delete rowAttrObj.style;
				}
				if (rowAttrObj.hasOwnProperty("class")) {
					classes += ' ' + rowAttrObj['class'];
					delete rowAttrObj['class'];
				}
				// dot't allow to change role attribute
				try { delete rowAttrObj.role; } catch(ra){}
				for (attrName in rowAttrObj) {
					if (rowAttrObj.hasOwnProperty(attrName)) {
						restAttr += ' ' + attrName + '=' + rowAttrObj[attrName];
					}
				}
			}
			return '<tr role="row" id="' + id + '" tabindex="' + tabindex + '" class="' + classes + '"' +
				(style === '' ? '' : ' style="' + style + '"') + restAttr + '>';
		},
		addXmlData = function (xml, rcnt, more, adjust) {
			var startReq = new Date(),
			locdata = (ts.p.datatype !== "local" && ts.p.loadonce) || ts.p.datatype === "xmlstring",
			xmlid = "_id_", xmlRd = ts.p.xmlReader,
			frd = ts.p.datatype === "local" ? "local" : "xml";
			if(locdata) {
				ts.p.data = [];
				ts.p._index = {};
				ts.p.localReader.id = xmlid;
			}
			ts.p.reccount = 0;
			if($.isXMLDoc(xml)) {
				if(ts.p.treeANode===-1 && !ts.p.scroll) {
					emptyRows.call(ts, false, true);
					rcnt=1;
				} else { rcnt = rcnt > 1 ? rcnt :1; }
			} else { return; }
			var self= $(ts), i,fpos,ir=0,v,gi=ts.p.multiselect===true?1:0,si=0,addSubGridCell,ni=ts.p.rownumbers===true?1:0,idn, getId,f=[],F,rd ={}, 
					xmlr,rid, rowData=[], classes = getstyle(stylemodule, 'rowBox', true, 'jqgrow ui-row-'+ ts.p.direction);
			if(ts.p.subGrid===true) {
				si = 1;
				addSubGridCell = $.jgrid.getMethod("addSubGridCell");
			}
			if(!xmlRd.repeatitems) {f = reader(frd);}
			if( ts.p.keyName===false) {
				idn = $.isFunction( xmlRd.id ) ?  xmlRd.id.call(ts, xml) : xmlRd.id;
			} else {
				idn = ts.p.keyName;
			}
			if(xmlRd.repeatitems && ts.p.keyName && isNaN(idn)) {
				idn = ts.p.keyIndex;
			}
			if( String(idn).indexOf("[") === -1 ) {
				if (f.length) {
					getId = function( trow, k) {return $(idn,trow).text() || k;};
				} else {
					getId = function( trow, k) {return $(xmlRd.cell,trow).eq(idn).text() || k;};
				}
			}
			else {
				getId = function( trow, k) {return trow.getAttribute(idn.replace(/[\[\]]/g,"")) || k;};
			}
			ts.p.userData = {};
			ts.p.page = intNum($.jgrid.getXmlData(xml, xmlRd.page), ts.p.page);
			ts.p.lastpage = intNum($.jgrid.getXmlData(xml, xmlRd.total), 1);
			ts.p.records = intNum($.jgrid.getXmlData(xml, xmlRd.records));
			if($.isFunction(xmlRd.userdata)) {
				ts.p.userData = xmlRd.userdata.call(ts, xml) || {};
			} else {
				$.jgrid.getXmlData(xml, xmlRd.userdata, true).each(function() {ts.p.userData[this.getAttribute("name")]= $(this).text();});
			}
			var gxml = $.jgrid.getXmlData( xml, xmlRd.root, true);
			gxml = $.jgrid.getXmlData( gxml, xmlRd.row, true);
			if (!gxml) { gxml = []; }
			var gl = gxml.length, j=0, grpdata=[], rn = parseInt(ts.p.rowNum,10), br=ts.p.scroll?$.jgrid.randId():1, 
				tablebody = $(ts).find("tbody:first"),
				hiderow=false, groupingPrepare;
			if(ts.p.grouping)  {
				hiderow = ts.p.groupingView.groupCollapse === true;
				groupingPrepare = $.jgrid.getMethod("groupingPrepare");
			}
			if (gl > 0 &&  ts.p.page <= 0) { ts.p.page = 1; }
			if(gxml && gl){
				if (adjust) { rn *= adjust+1; }
				var afterInsRow = $.isFunction(ts.p.afterInsertRow),
				rnc = ni ? getstyle(stylemodule, 'rownumBox', false, 'jqgrid-rownum') :"",
				mlc = gi ? getstyle(stylemodule, 'multiBox', false, 'cbox'):"";
				while (j<gl) {
					xmlr = gxml[j];
					rid = getId(xmlr,br+j);
					rid  = ts.p.idPrefix + rid;
					var iStartTrTag = rowData.length;
					rowData.push("");
					if( ni ) {
						rowData.push( addRowNum(0, j, ts.p.page, ts.p.rowNum, rnc ) );
					}
					if( gi ) {
						rowData.push( addMulti(rid, ni, j, false, mlc) );
					}
					if( si ) {
						rowData.push( addSubGridCell.call(self, gi+ni, j+rcnt) );
					}
					if(xmlRd.repeatitems){
						if (!F) { F=orderedCols(gi+si+ni); }
						var cells = $.jgrid.getXmlData( xmlr, xmlRd.cell, true);
						$.each(F, function (k) {
							var cell = cells[this];
							if (!cell) { return false; }
							v = cell.textContent || cell.text;
							rd[ts.p.colModel[k+gi+si+ni].name] = v;
							rowData.push( addCell(rid,v,k+gi+si+ni,j+rcnt,xmlr, rd) );
						});
					} else {
						for(i = 0; i < f.length;i++) {
							v = $.jgrid.getXmlData( xmlr, f[i]);
							rd[ts.p.colModel[i+gi+si+ni].name] = v;
							rowData.push( addCell(rid, v, i+gi+si+ni, j+rcnt, xmlr, rd) );
						}
					}
					rowData[iStartTrTag] = constructTr(rid, hiderow, classes, rd, xmlr);
					rowData.push("</tr>");
					if(ts.p.grouping) {
						grpdata.push( rowData );
						if(!ts.p.groupingView._locgr) {
							groupingPrepare.call(self , rd, j );
						}
						rowData = [];
					}
					if(locdata || (ts.p.treeGrid === true && !(ts.p._ald)) ) {
						rd[xmlid] = $.jgrid.stripPref(ts.p.idPrefix, rid);
						ts.p.data.push(rd);
						ts.p._index[rd[xmlid]] = ts.p.data.length-1;
					}
					if(ts.p.gridview === false ) {
						tablebody.append(rowData.join(''));
						self.triggerHandler("jqGridAfterInsertRow", [rid, rd, xmlr]);
						if(afterInsRow) {ts.p.afterInsertRow.call(ts,rid,rd,xmlr);}
						rowData=[];
					}
					rd={};
					ir++;
					j++;
					if(ir===rn) {break;}
				}
			}
			if(ts.p.gridview === true) {
				fpos = ts.p.treeANode > -1 ? ts.p.treeANode: 0;
				if(ts.p.grouping) {
					if(!locdata) {
						self.jqGrid('groupingRender',grpdata,ts.p.colModel.length, ts.p.page, rn);
						grpdata = null;
					}
				} else if(ts.p.treeGrid === true && fpos > 0) {
					$(ts.rows[fpos]).after(rowData.join(''));
				} else {
					//$("tbody:first",t).append(rowData.join(''));
					tablebody.append(rowData.join(''));
					ts.grid.cols = ts.rows[0].cells; // update cached first row
				}
			}
			ts.p.totaltime = new Date() - startReq;
			rowData =null;
			if(ts.p.subGrid === true ) {
				try {self.jqGrid("addSubGrid",gi+ni);} catch (_){}
			}
			if(ir>0) { if(ts.p.records===0) { ts.p.records=gl;} }
			if( ts.p.treeGrid === true) {
				try {self.jqGrid("setTreeNode", fpos+1, ir+fpos+1);} catch (e) {}
			}
			//if(!ts.p.treeGrid && !ts.p.scroll) {ts.grid.bDiv.scrollTop = 0;}
			ts.p.reccount=ir;
			ts.p.treeANode = -1;
			if(ts.p.userDataOnFooter) { self.jqGrid("footerData","set",ts.p.userData,true); }
			if(locdata) {
				ts.p.records = gl;
				ts.p.lastpage = Math.ceil(gl/ rn);
			}
			if (!more) { ts.updatepager(false,true); }
			if(locdata) {
				while (ir<gl) {
					xmlr = gxml[ir];
					rid = getId(xmlr,ir+br);
					rid  = ts.p.idPrefix + rid;
					if(xmlRd.repeatitems){
						if (!F) { F=orderedCols(gi+si+ni); }
						var cells2 = $.jgrid.getXmlData( xmlr, xmlRd.cell, true);
						$.each(F, function (k) {
							var cell = cells2[this];
							if (!cell) { return false; }
							v = cell.textContent || cell.text;
							rd[ts.p.colModel[k+gi+si+ni].name] = v;
						});
					} else {
						for(i = 0; i < f.length;i++) {
							v = $.jgrid.getXmlData( xmlr, f[i]);
							rd[ts.p.colModel[i+gi+si+ni].name] = v;
						}
					}
					rd[xmlid] = $.jgrid.stripPref(ts.p.idPrefix, rid);
					if( ts.p.grouping ) {
						groupingPrepare.call(self, rd, ir );
					}
					ts.p.data.push(rd);
					ts.p._index[rd[xmlid]] = ts.p.data.length-1;
					rd = {};
					ir++;
				}
				if(ts.p.grouping) {
					ts.p.groupingView._locgr = true;
					self.jqGrid('groupingRender', grpdata, ts.p.colModel.length, ts.p.page, rn);
					grpdata = null;
				}
			}
		},
		addJSONData = function(data, rcnt, more, adjust) {
			var startReq = new Date();
			if(data) {
				if(ts.p.treeANode === -1 && !ts.p.scroll) {
					emptyRows.call(ts, false, true);
					rcnt=1;
				} else { rcnt = rcnt > 1 ? rcnt :1; }
			} else { return; }

			var dReader, locid = "_id_", frd,
			locdata = (ts.p.datatype !== "local" && ts.p.loadonce) || ts.p.datatype === "jsonstring";
			if(locdata) { ts.p.data = []; ts.p._index = {}; ts.p.localReader.id = locid;}
			ts.p.reccount = 0;
			if(ts.p.datatype === "local") {
				dReader =  ts.p.localReader;
				frd= 'local';
			} else {
				dReader =  ts.p.jsonReader;
				frd='json';
			}
			var self = $(ts), ir=0,v,i,j,f=[],cur,gi=ts.p.multiselect?1:0,si=ts.p.subGrid===true?1:0,addSubGridCell,ni=ts.p.rownumbers===true?1:0,arrayReader=orderedCols(gi+si+ni),objectReader=reader(frd),rowReader,len,drows,idn,rd={}, fpos, idr,rowData=[],
					classes = getstyle(stylemodule, 'rowBox', true, 'jqgrow ui-row-'+ ts.p.direction);
			ts.p.page = intNum($.jgrid.getAccessor(data,dReader.page), ts.p.page);
			ts.p.lastpage = intNum($.jgrid.getAccessor(data,dReader.total), 1);
			ts.p.records = intNum($.jgrid.getAccessor(data,dReader.records));
			ts.p.userData = $.jgrid.getAccessor(data,dReader.userdata) || {};
			if(si) {
				addSubGridCell = $.jgrid.getMethod("addSubGridCell");
			}
			if( ts.p.keyName===false ) {
				idn = $.isFunction(dReader.id) ? dReader.id.call(ts, data) : dReader.id; 
			} else {
				idn = ts.p.keyName;
			}
			if(dReader.repeatitems && ts.p.keyName && isNaN(idn)) {
				idn = ts.p.keyIndex;
			}
			drows = $.jgrid.getAccessor(data,dReader.root);
			if (drows == null && $.isArray(data)) { drows = data; }
			if (!drows) { drows = []; }
			len = drows.length; i=0;
			if (len > 0 && ts.p.page <= 0) { ts.p.page = 1; }
			var rn = parseInt(ts.p.rowNum,10),br=ts.p.scroll?$.jgrid.randId():1,selected=false, selr;
			if (adjust) { rn *= adjust+1; }
			if(ts.p.datatype === "local" && !ts.p.deselectAfterSort) {
				selected = true;
			}
			var afterInsRow = $.isFunction(ts.p.afterInsertRow), grpdata=[],hiderow=false, groupingPrepare,
			tablebody = $(ts).find("tbody:first"),
			rnc = ni ? getstyle(stylemodule, 'rownumBox', false, 'jqgrid-rownum') :"",
			mlc = gi ? getstyle(stylemodule, 'multiBox', false, 'cbox'):"";
			if(ts.p.grouping)  {
				hiderow = ts.p.groupingView.groupCollapse === true;
				groupingPrepare = $.jgrid.getMethod("groupingPrepare");
			}
			while (i<len) {
				cur = drows[i];
				idr = $.jgrid.getAccessor(cur,idn);
				if(idr === undefined) {
					if (typeof idn === "number" && ts.p.colModel[idn+gi+si+ni] != null) {
						// reread id by name
						idr = $.jgrid.getAccessor(cur,ts.p.colModel[idn+gi+si+ni].name);
					}
					if(idr === undefined) {
						idr = br+i;
						if(f.length===0){
							if(dReader.cell){
								var ccur = $.jgrid.getAccessor(cur,dReader.cell) || cur;
								idr = ccur != null && ccur[idn] !== undefined ? ccur[idn] : idr;
								ccur=null;
							}
						}
					}
				}
				idr  = ts.p.idPrefix + idr;
				if( selected) {
					if( ts.p.multiselect) {
						selr = ($.inArray(idr, ts.p.selarrrow) !== -1);
					} else {
						selr = (idr === ts.p.selrow);
					}
				}
				var iStartTrTag = rowData.length;
				rowData.push("");
				if( ni ) {
					rowData.push( addRowNum(0, i, ts.p.page, ts.p.rowNum, rnc ) );
				}
				if( gi ){
					rowData.push( addMulti(idr, ni, i, selr, mlc) );
				}
				if( si ) {
					rowData.push( addSubGridCell.call(self ,gi+ni,i+rcnt) );
				}
				rowReader=objectReader;
				if (dReader.repeatitems) {
					if(dReader.cell) {cur = $.jgrid.getAccessor(cur,dReader.cell) || cur;}
					if ($.isArray(cur)) { rowReader=arrayReader; }
				}
				for (j=0;j<rowReader.length;j++) {
					v = $.jgrid.getAccessor(cur,rowReader[j]);
					rd[ts.p.colModel[j+gi+si+ni].name] = v;
					rowData.push( addCell(idr,v,j+gi+si+ni,i+rcnt,cur, rd) );
				}
				rowData[iStartTrTag] = constructTr(idr, hiderow, (selr ? classes + ' ' + highlight : classes), rd, cur);
				rowData.push( "</tr>" );
				if(ts.p.grouping) {
					grpdata.push( rowData );
					if(!ts.p.groupingView._locgr) {
						groupingPrepare.call(self , rd, i);
					}
					rowData = [];
				}
				if(locdata || (ts.p.treeGrid===true && !(ts.p._ald))) {
					rd[locid] = $.jgrid.stripPref(ts.p.idPrefix, idr);
					ts.p.data.push(rd);
					ts.p._index[rd[locid]] = ts.p.data.length-1;
				}
				if(ts.p.gridview === false ) {
					tablebody.append(rowData.join(''));
					self.triggerHandler("jqGridAfterInsertRow", [idr, rd, cur]);
					if(afterInsRow) {ts.p.afterInsertRow.call(ts,idr,rd,cur);}
					rowData=[];//ari=0;
				}
				rd={};
				ir++;
				i++;
				if(ir===rn) { break; }
			}
			if(ts.p.gridview === true ) {
				fpos = ts.p.treeANode > -1 ? ts.p.treeANode: 0;
				if(ts.p.grouping) {
					if(!locdata) {
						self.jqGrid('groupingRender', grpdata, ts.p.colModel.length, ts.p.page, rn);
						grpdata = null;
					}
				} else if(ts.p.treeGrid === true && fpos > 0) {
					$(ts.rows[fpos]).after(rowData.join(''));
				} else { 
					tablebody.append(rowData.join(''));
					ts.grid.cols = ts.rows[0].cells;
				}
			}
			ts.p.totaltime = new Date() - startReq;
			rowData = null;
			if(ts.p.subGrid === true ) {
				try { self.jqGrid("addSubGrid",gi+ni);} catch (_){}
			}
			if(ir>0) {
				if(ts.p.records===0) { ts.p.records=len; }
			}
			if( ts.p.treeGrid === true) {
				try {self.jqGrid("setTreeNode", fpos+1, ir+fpos+1);} catch (e) {}
			}
			//if(!ts.p.treeGrid && !ts.p.scroll) {ts.grid.bDiv.scrollTop = 0;}
			ts.p.reccount=ir;
			ts.p.treeANode = -1;
			if(ts.p.userDataOnFooter) { self.jqGrid("footerData","set",ts.p.userData,true); }
			if(locdata) {
				ts.p.records = len;
				ts.p.lastpage = Math.ceil(len/ rn);
			}
			if (!more) { ts.updatepager(false,true); }
			if(locdata) {
				while (ir<len && drows[ir]) {
					cur = drows[ir];
					idr = $.jgrid.getAccessor(cur,idn);
					if(idr === undefined) {
						if (typeof idn === "number" && ts.p.colModel[idn+gi+si+ni] != null) {
							// reread id by name
							idr = $.jgrid.getAccessor(cur,ts.p.colModel[idn+gi+si+ni].name);
						}
						if(idr === undefined) {
							idr = br+ir;
							if(f.length===0){
								if(dReader.cell){
									var ccur2 = $.jgrid.getAccessor(cur,dReader.cell) || cur;
									idr = ccur2 != null && ccur2[idn] !== undefined ? ccur2[idn] : idr;
									ccur2=null;
								}
							}
						}
					}
					if(cur) {
						idr  = ts.p.idPrefix + idr;
						rowReader=objectReader;
						if (dReader.repeatitems) {
							if(dReader.cell) {cur = $.jgrid.getAccessor(cur,dReader.cell) || cur;}
							if ($.isArray(cur)) { rowReader=arrayReader; }
						}

						for (j=0;j<rowReader.length;j++) {
							rd[ts.p.colModel[j+gi+si+ni].name] = $.jgrid.getAccessor(cur,rowReader[j]);
						}
						rd[locid] = $.jgrid.stripPref(ts.p.idPrefix, idr);
						if(ts.p.grouping) {
							groupingPrepare.call(self, rd, ir );
						}
						ts.p.data.push(rd);
						ts.p._index[rd[locid]] = ts.p.data.length-1;
						rd = {};
					}
					ir++;
				}
				if(ts.p.grouping) {
					ts.p.groupingView._locgr = true;
					self.jqGrid('groupingRender', grpdata, ts.p.colModel.length, ts.p.page, rn);
					grpdata = null;
				}
			}
		},
		addLocalData = function( retAll ) {
			var st = ts.p.multiSort ? [] : "", sto=[], fndsort=false, cmtypes={}, grtypes=[], grindexes=[], srcformat, sorttype, newformat, sfld;
			if(!$.isArray(ts.p.data)) {
				return;
			}
			var grpview = ts.p.grouping ? ts.p.groupingView : false, lengrp, gin, si;
			$.each(ts.p.colModel,function(){
				sorttype = this.sorttype || "text";
				si = this.index || this.name;
				if(sorttype === "date" || sorttype === "datetime") {
					if(this.formatter && typeof this.formatter === 'string' && this.formatter === 'date') {
						if(this.formatoptions && this.formatoptions.srcformat) {
							srcformat = this.formatoptions.srcformat;
						} else {
							srcformat = $.jgrid.getRegional(ts, "formatter.date.srcformat");
						}
						if(this.formatoptions && this.formatoptions.newformat) {
							newformat = this.formatoptions.newformat;
						} else {
							newformat = $.jgrid.getRegional(ts, "formatter.date.newformat");
						}
					} else {
						srcformat = newformat = this.datefmt || "Y-m-d";
					}
					cmtypes[si] = {"stype": sorttype, "srcfmt": srcformat,"newfmt":newformat, "sfunc": this.sortfunc || null};
				} else {
					cmtypes[si] = {"stype": sorttype, "srcfmt":'',"newfmt":'', "sfunc": this.sortfunc || null};
				}
				if(ts.p.grouping ) {
					for(gin =0, lengrp = grpview.groupField.length; gin< lengrp; gin++) {
						if( this.name === grpview.groupField[gin]) {
							grtypes[gin] = cmtypes[si];
							grindexes[gin]= si;
						}
					}
				}
				if(!ts.p.multiSort) {
					if(!fndsort && (si === ts.p.sortname)){
						st = si; 
						fndsort = true;
					}
				}
			});
			if(ts.p.multiSort) {
				st =  sortarr;
				sto = sortord;
			}
			if(ts.p.treeGrid && ts.p._sort) {
				$(ts).jqGrid("SortTree", st, ts.p.sortorder, cmtypes[st].stype || 'text', cmtypes[st].srcfmt || '');
				return;
			}
			var compareFnMap = {
				'eq':function(queryObj) {return queryObj.equals;},
				'ne':function(queryObj) {return queryObj.notEquals;},
				'lt':function(queryObj) {return queryObj.less;},
				'le':function(queryObj) {return queryObj.lessOrEquals;},
				'gt':function(queryObj) {return queryObj.greater;},
				'ge':function(queryObj) {return queryObj.greaterOrEquals;},
				'cn':function(queryObj) {return queryObj.contains;},
				'nc':function(queryObj,op) {return op === "OR" ? queryObj.orNot().contains : queryObj.andNot().contains;},
				'bw':function(queryObj) {return queryObj.startsWith;},
				'bn':function(queryObj,op) {return op === "OR" ? queryObj.orNot().startsWith : queryObj.andNot().startsWith;},
				'en':function(queryObj,op) {return op === "OR" ? queryObj.orNot().endsWith : queryObj.andNot().endsWith;},
				'ew':function(queryObj) {return queryObj.endsWith;},
				'ni':function(queryObj,op) {return op === "OR" ? queryObj.orNot().equals : queryObj.andNot().equals;},
				'in':function(queryObj) {return queryObj.equals;},
				'nu':function(queryObj) {return queryObj.isNull;},
				'nn':function(queryObj,op) {return op === "OR" ? queryObj.orNot().isNull : queryObj.andNot().isNull;}

			},
			query = $.jgrid.from.call(ts, ts.p.data);
			if (ts.p.ignoreCase) { query = query.ignoreCase(); }
			function tojLinq ( group ) {
				var s = 0, index, gor, ror, opr, rule, fld;
				if (group.groups != null) {
					gor = group.groups.length && group.groupOp.toString().toUpperCase() === "OR";
					if (gor) {
						query.orBegin();
					}
					for (index = 0; index < group.groups.length; index++) {
						if (s > 0 && gor) {
							query.or();
						}
						try {
							tojLinq(group.groups[index]);
						} catch (e) {alert(e);}
						s++;
					}
					if (gor) {
						query.orEnd();
					}
				}
				if (group.rules != null) {
					//if(s>0) {
					//	var result = query.select();
					//	query = $.jgrid.from( result);
					//	if (ts.p.ignoreCase) { query = query.ignoreCase(); } 
					//}
					try{
						ror = group.rules.length && group.groupOp.toString().toUpperCase() === "OR";
						if (ror) {
							query.orBegin();
						}
						for (index = 0; index < group.rules.length; index++) {
							rule = group.rules[index];
							opr = group.groupOp.toString().toUpperCase();
							if (compareFnMap[rule.op] && rule.field ) {
								if(s > 0 && opr && opr === "OR") {
									query = query.or();
								}
								fld = cmtypes[rule.field];
								if(fld.stype === 'date') {
									if(fld.srcfmt && fld.newfmt && fld.srcfmt !== fld.newfmt ) {
										rule.data = $.jgrid.parseDate.call(ts, fld.newfmt, rule.data, fld.srcfmt);
									}
								}
								query = compareFnMap[rule.op](query, opr)(rule.field, rule.data, cmtypes[rule.field]);
							}
							s++;
						}
						if (ror) {
							query.orEnd();
						}
					} catch (g) {alert(g);}
				}
			}

			if (ts.p.search === true) {
				var srules = ts.p.postData.filters;
				if(srules) {
					if(typeof srules === "string") { srules = $.jgrid.parse(srules);}
					tojLinq( srules );
				} else {
					try {
						sfld = cmtypes[ts.p.postData.searchField];
						if(sfld.stype === 'date') {
							if(sfld.srcfmt && sfld.newfmt && sfld.srcfmt !== sfld.newfmt ) {
								ts.p.postData.searchString = $.jgrid.parseDate.call(ts, sfld.newfmt, ts.p.postData.searchString, sfld.srcfmt);
							}
						}
						query = compareFnMap[ts.p.postData.searchOper](query)(ts.p.postData.searchField, ts.p.postData.searchString,cmtypes[ts.p.postData.searchField]);
					} catch (se){}
				}
			} else {
				if(ts.p.treeGrid && ts.p.treeGridModel === "nested") {
					query.orderBy(ts.p.treeReader.left_field, 'asc', 'integer', '', null);
				}
			}
			if(ts.p.treeGrid && ts.p.treeGridModel === "adjacency") {
				lengrp =0;
				st = null;
			}
			if(ts.p.grouping) {
				for(gin=0; gin<lengrp;gin++) {
					query.orderBy(grindexes[gin],grpview.groupOrder[gin],grtypes[gin].stype, grtypes[gin].srcfmt);
				}
			}
			if(ts.p.multiSort) {
				$.each(st,function(i){
					query.orderBy(this, sto[i], cmtypes[this].stype, cmtypes[this].srcfmt, cmtypes[this].sfunc);
				});
			} else {
				if (st && ts.p.sortorder && fndsort) {
					// to be fixed in case sortname has more than one field
					if(ts.p.sortorder.toUpperCase() === "DESC") {
						query.orderBy(ts.p.sortname, "d", cmtypes[st].stype, cmtypes[st].srcfmt, cmtypes[st].sfunc);
					} else {
						query.orderBy(ts.p.sortname, "a", cmtypes[st].stype, cmtypes[st].srcfmt, cmtypes[st].sfunc);
					}
				}
			}
			var queryResults = query.select(),
			recordsperpage = parseInt(ts.p.rowNum,10),
			total = queryResults.length,
			page = parseInt(ts.p.page,10),
			totalpages = Math.ceil(total / recordsperpage),
			retresult = {};
			if((ts.p.search || ts.p.resetsearch) && ts.p.grouping && ts.p.groupingView._locgr) {
				ts.p.groupingView.groups =[];
				var j, grPrepare = $.jgrid.getMethod("groupingPrepare"), key, udc;
				if(ts.p.footerrow && ts.p.userDataOnFooter) {
					for (key in ts.p.userData) {
						if(ts.p.userData.hasOwnProperty(key)) {
							ts.p.userData[key] = 0;
						}
					}
					udc = true;
				}
				for(j=0; j<total; j++) {
					if(udc) {
						for(key in ts.p.userData){
							if( ts.p.userData.hasOwnProperty( key ) ) {
								ts.p.userData[key] += parseFloat(queryResults[j][key] || 0);
							}
						}
					}
					grPrepare.call($(ts),queryResults[j],j, recordsperpage );
				}
			}
			if( retAll ) {
				return  queryResults;
			}
			if(ts.p.treeGrid && ts.p.search) {
				queryResults = $(ts).jqGrid("searchTree", queryResults);
			} else {
				queryResults = queryResults.slice( (page-1)*recordsperpage , page*recordsperpage );
			}
			query = null;
			cmtypes = null;
			retresult[ts.p.localReader.total] = totalpages;
			retresult[ts.p.localReader.page] = page;
			retresult[ts.p.localReader.records] = total;
			retresult[ts.p.localReader.root] = queryResults;
			retresult[ts.p.localReader.userdata] = ts.p.userData;
			queryResults = null;
			return  retresult;
		},
		updatepager = function(rn, dnd) {
			var cp, last, base, from,to,tot,fmt, pgboxes = "", sppg,
			pgid = ts.p.pager ? $.jgrid.jqID(ts.p.pager.substr(1)) : "",
			tspg = pgid ? "_"+pgid : "",
			tspg_t = ts.p.toppager ? "_"+ts.p.toppager.substr(1) : "";
			base = parseInt(ts.p.page,10)-1;
			if(base < 0) { base = 0; }
			base = base*parseInt(ts.p.rowNum,10);
			to = base + ts.p.reccount;
			if (ts.p.scroll) {
				var rows = $("tbody:first > tr:gt(0)", ts.grid.bDiv);
				if(to > ts.p.records) {
					to = ts.p.records;
				}
				base = to - rows.length;
				ts.p.reccount = rows.length;
				var rh = rows.outerHeight() || ts.grid.prevRowHeight;
				if (rh) {
					var top = base * rh;
					var height = parseInt(ts.p.records,10) * rh;
					$(">div:first",ts.grid.bDiv).css({height : height}).children("div:first").css({height:top,display:top?"":"none"});
					if (ts.grid.bDiv.scrollTop === 0 && ts.p.page > 1) {
						ts.grid.bDiv.scrollTop = ts.p.rowNum * (ts.p.page - 1) * rh;
					}
				}
				ts.grid.bDiv.scrollLeft = ts.grid.hDiv.scrollLeft;
			}
			pgboxes = ts.p.pager || "";
			pgboxes += ts.p.toppager ?  (pgboxes ? "," + ts.p.toppager : ts.p.toppager) : "";
			if(pgboxes) {
				fmt = $.jgrid.getRegional(ts, "formatter.integer");
				cp = intNum(ts.p.page);
				last = intNum(ts.p.lastpage);
				$(".selbox",pgboxes)[ this.p.useProp ? 'prop' : 'attr' ]("disabled",false);
				if(ts.p.pginput===true) {
					$("#input"+tspg).html($.jgrid.template($.jgrid.getRegional(ts, "defaults.pgtext", ts.p.pgtext) || "","<input "+getstyle(stylemodule, 'pgInput', false, 'ui-pg-input') + " type='text' size='2' maxlength='7' value='0' role='textbox'/>","<span id='sp_1_"+$.jgrid.jqID(pgid)+"'></span>"));
					if(ts.p.toppager) {
						$("#input_t"+tspg_t).html($.jgrid.template($.jgrid.getRegional(ts, "defaults.pgtext", ts.p.pgtext) || "","<input "+getstyle(stylemodule, 'pgInput', false, 'ui-pg-input') + " type='text' size='2' maxlength='7' value='0' role='textbox'/>","<span id='sp_1_"+$.jgrid.jqID(pgid)+"_toppager'></span>"));
					}
					$('.ui-pg-input',pgboxes).val(ts.p.page);
					sppg = ts.p.toppager ? '#sp_1'+tspg+",#sp_1"+tspg+"_toppager" : '#sp_1'+tspg;
					$(sppg).html($.fmatter ? $.fmatter.util.NumberFormat(ts.p.lastpage,fmt):ts.p.lastpage);
				}
				if (ts.p.viewrecords){
					if(ts.p.reccount === 0) {
						$(".ui-paging-info",pgboxes).html($.jgrid.getRegional(ts, "defaults.emptyrecords", ts.p.emptyrecords ));
					} else {
						from = base+1;
						tot=ts.p.records;
						if($.fmatter) {
							from = $.fmatter.util.NumberFormat(from,fmt);
							to = $.fmatter.util.NumberFormat(to,fmt);
							tot = $.fmatter.util.NumberFormat(tot,fmt);
						}
						var rt = $.jgrid.getRegional(ts, "defaults.recordtext", ts.p.recordtext);
						$(".ui-paging-info",pgboxes).html($.jgrid.template( rt ,from,to,tot));
					}
				}
				if(ts.p.pgbuttons===true) {
					if(cp<=0) {cp = last = 0;}
					if(cp===1 || cp === 0) {
						$("#first"+tspg+", #prev"+tspg).addClass( disabled ).removeClass( hover );
						if(ts.p.toppager) { $("#first_t"+tspg_t+", #prev_t"+tspg_t).addClass( disabled ).removeClass( hover ); }
					} else {
						$("#first"+tspg+", #prev"+tspg).removeClass( disabled );
						if(ts.p.toppager) { $("#first_t"+tspg_t+", #prev_t"+tspg_t).removeClass( disabled ); }
					}
					if(cp===last || cp === 0) {
						$("#next"+tspg+", #last"+tspg).addClass( disabled ).removeClass( hover );
						if(ts.p.toppager) { $("#next_t"+tspg_t+", #last_t"+tspg_t).addClass( disabled ).removeClass( hover ); }
					} else {
						$("#next"+tspg+", #last"+tspg).removeClass( disabled );
						if(ts.p.toppager) { $("#next_t"+tspg_t+", #last_t"+tspg_t).removeClass( disabled ); }
					}
				}
			}
			if(rn===true && ts.p.rownumbers === true) {
				$(">td.jqgrid-rownum",ts.rows).each(function(i){
					$(this).html(base+1+i);
				});
			}
			if(dnd && ts.p.jqgdnd) { $(ts).jqGrid('gridDnD','updateDnD');}
			$(ts).triggerHandler("jqGridGridComplete");
			if($.isFunction(ts.p.gridComplete)) {ts.p.gridComplete.call(ts);}
			$(ts).triggerHandler("jqGridAfterGridComplete");
		},
		beginReq = function() {
			ts.grid.hDiv.loading = true;
			if(ts.p.hiddengrid) { return;}
			$(ts).jqGrid("progressBar", {method:"show", loadtype : ts.p.loadui, htmlcontent: $.jgrid.getRegional(ts, "defaults.loadtext", ts.p.loadtext) });
		},
		endReq = function() {
			ts.grid.hDiv.loading = false;
			$(ts).jqGrid("progressBar", {method:"hide", loadtype : ts.p.loadui });
		},
		beforeprocess = function(data, st, xhr) {
			var bfpcr = $(ts).triggerHandler("jqGridBeforeProcessing", [data,st,xhr]);
			bfpcr = (bfpcr === undefined || typeof(bfpcr) !== 'boolean') ? true : bfpcr;
			if ($.isFunction(ts.p.beforeProcessing)) {
				if (ts.p.beforeProcessing.call(ts, data, st, xhr) === false) {
					bfpcr =  false;
				}
			}
			return bfpcr;
		},
		afterprocess = function(dstr, lcf) {
			$(ts).triggerHandler("jqGridLoadComplete", [dstr]);
			if(lcf) {ts.p.loadComplete.call(ts,dstr);}
			$(ts).triggerHandler("jqGridAfterLoadComplete", [dstr]);
			ts.p.datatype = "local";
			ts.p.datastr = null;
			endReq();
		},
		populate = function (npage) {
			if(!ts.grid.hDiv.loading) {
				var pvis = ts.p.scroll && npage === false,
				prm = {}, dt, dstr, pN=ts.p.prmNames;
				if(ts.p.page <=0) { ts.p.page = Math.min(1,ts.p.lastpage); }
				if(pN.search !== null) {prm[pN.search] = ts.p.search;} if(pN.nd !== null) {prm[pN.nd] = new Date().getTime();}
				if(pN.rows !== null) {prm[pN.rows]= ts.p.rowNum;} if(pN.page !== null) {prm[pN.page]= ts.p.page;}
				if(pN.sort !== null) {prm[pN.sort]= ts.p.sortname;} if(pN.order !== null) {prm[pN.order]= ts.p.sortorder;}
				if(ts.p.rowTotal !== null && pN.totalrows !== null) { prm[pN.totalrows]= ts.p.rowTotal; }
				var lcf = $.isFunction(ts.p.loadComplete), lc = lcf ? ts.p.loadComplete : null;
				var adjust = 0;
				npage = npage || 1;
				if (npage > 1) {
					if(pN.npage !== null) {
						prm[pN.npage] = npage;
						adjust = npage - 1;
						npage = 1;
					} else {
						lc = function(req) {
							ts.p.page++;
							ts.grid.hDiv.loading = false;
							if (lcf) {
								ts.p.loadComplete.call(ts,req);
							}
							populate(npage-1);
						};
					}
				} else if (pN.npage !== null) {
					delete ts.p.postData[pN.npage];
				}
				if(ts.p.grouping) {
					$(ts).jqGrid('groupingSetup');
					var grp = ts.p.groupingView, gi, gs="";
					for(gi=0;gi<grp.groupField.length;gi++) {
						var index = grp.groupField[gi];
						$.each(ts.p.colModel, function(cmIndex, cmValue) {
							if (cmValue.name === index && cmValue.index){
								index = cmValue.index;
							}
						} );
						gs += index +" "+grp.groupOrder[gi]+", ";
					}
					prm[pN.sort] = gs + prm[pN.sort];
				}
				$.extend(ts.p.postData,prm);
				var rcnt = !ts.p.scroll ? 1 : ts.rows.length-1;
				if ($.isFunction(ts.p.datatype)) { 
					ts.p.datatype.call(ts,ts.p.postData,"load_"+ts.p.id, rcnt, npage, adjust); 
					return;
				}
				var bfr = $(ts).triggerHandler("jqGridBeforeRequest");
				if (bfr === false || bfr === 'stop') { return; }
				if ($.isFunction(ts.p.beforeRequest)) {
					bfr = ts.p.beforeRequest.call(ts);
					if (bfr === false || bfr === 'stop') { return; }
				}
				dt = ts.p.datatype.toLowerCase();
				switch(dt)
				{
				case "json":
				case "jsonp":
				case "xml":
				case "script":
					$.ajax($.extend({
						url:ts.p.url,
						type:ts.p.mtype,
						dataType: dt ,
						data: $.isFunction(ts.p.serializeGridData)? ts.p.serializeGridData.call(ts,ts.p.postData) : ts.p.postData,
						success:function(data,st, xhr) {
							if(!beforeprocess(data, st,xhr)) {
								endReq();
								return;								
							}
							if(dt === "xml") { addXmlData(data, rcnt,npage>1,adjust); }
							else { addJSONData(data, rcnt, npage>1, adjust); }
							$(ts).triggerHandler("jqGridLoadComplete", [data]);
							if(lc) { lc.call(ts,data); }
							$(ts).triggerHandler("jqGridAfterLoadComplete", [data]);
							if (pvis) { ts.grid.populateVisible(); }
							if( ts.p.loadonce || ts.p.treeGrid) {ts.p.datatype = "local";}
							data=null;
							if (npage === 1) { endReq(); }
						},
						error:function(xhr,st,err){
							$(ts).triggerHandler("jqGridLoadError", [xhr,st,err]);
							if($.isFunction(ts.p.loadError)) { ts.p.loadError.call(ts,xhr,st,err); }
							if (npage === 1) { endReq(); }
							xhr=null;
						},
						beforeSend: function(xhr, settings ){
							var gotoreq = true;
							gotoreq = $(ts).triggerHandler("jqGridLoadBeforeSend", [xhr,settings]);
							if($.isFunction(ts.p.loadBeforeSend)) {
								gotoreq = ts.p.loadBeforeSend.call(ts,xhr, settings); 
							}
							if(gotoreq === undefined) { gotoreq = true; }
							if(gotoreq === false) {
								return false;
							}
							beginReq();
						}
					},$.jgrid.ajaxOptions, ts.p.ajaxGridOptions));
				break;
				case "xmlstring":
					beginReq();
					dstr = typeof ts.p.datastr !== 'string' ? ts.p.datastr : $.parseXML(ts.p.datastr);
					if(!beforeprocess(dstr, 200 , null)) {
						endReq();
						return;								
					}					
					addXmlData(dstr);
					afterprocess(dstr, lcf);
				break;
				case "jsonstring":
					beginReq();
					if(typeof ts.p.datastr === 'string') { dstr = $.jgrid.parse(ts.p.datastr); }
					else { dstr = ts.p.datastr; }
					if(!beforeprocess(dstr, 200 , null)) {
						endReq();
						return;								
					}					
					addJSONData(dstr);
					afterprocess(dstr, lcf);
				break;
				case "local":
				case "clientside":
					beginReq();
					ts.p.datatype = "local";
					ts.p._ald = true;
					var req = addLocalData( false );
					if(!beforeprocess(req, 200 , null)) {
						endReq();
						return;								
					}					
					addJSONData(req,rcnt,npage>1,adjust);
					$(ts).triggerHandler("jqGridLoadComplete", [req]);
					if(lc) { lc.call(ts,req); }
					$(ts).triggerHandler("jqGridAfterLoadComplete", [req]);
					if (pvis) { ts.grid.populateVisible(); }
					endReq();
					ts.p._ald = false;
				break;
				}
				ts.p._sort = false;
			}
		},
		setHeadCheckBox = function ( checked ) {
			$('#cb_'+$.jgrid.jqID(ts.p.id),ts.grid.hDiv)[ts.p.useProp ? 'prop': 'attr']("checked", checked);
			var fid = ts.p.frozenColumns ? ts.p.id+"_frozen" : "";
			if(fid) {
				$('#cb_'+$.jgrid.jqID(ts.p.id),ts.grid.fhDiv)[ts.p.useProp ? 'prop': 'attr']("checked", checked);
			}
		},
		setPager = function (pgid, tp){
			// TBD - consider escaping pgid with pgid = $.jgrid.jqID(pgid);
			var sep = "<td class='ui-pg-button "+disabled+"'><span class='ui-separator'></span></td>",
			pginp = "",
			pgl="<table class='ui-pg-table ui-common-table ui-paging-pager'><tbody><tr>",
			str="", pgcnt, lft, cent, rgt, twd, tdw, i,
			clearVals = function(onpaging, thus){
				var ret;
				ret = $(ts).triggerHandler("jqGridPaging", [onpaging, thus]);
				if(ret==='stop') {return false;}
				if ($.isFunction(ts.p.onPaging) ) { ret = ts.p.onPaging.call(ts,onpaging, thus); }
				if(ret==='stop') {return false;}
				ts.p.selrow = null;
				if(ts.p.multiselect) {ts.p.selarrrow =[]; setHeadCheckBox( false );}
				ts.p.savedRow = [];
				return true;
			};
			pgid = pgid.substr(1);
			tp += "_" + pgid;
			pgcnt = "pg_"+pgid;
			lft = pgid+"_left"; cent = pgid+"_center"; rgt = pgid+"_right";
			$("#"+$.jgrid.jqID(pgid) )
			.append("<div id='"+pgcnt+"' class='ui-pager-control' role='group'><table " + getstyle(stylemodule, 'pagerTable', false, 'ui-pg-table ui-common-table ui-pager-table') + "><tbody><tr><td id='"+lft+"' align='left'></td><td id='"+cent+"' align='center' style='white-space:pre;'></td><td id='"+rgt+"' align='right'></td></tr></tbody></table></div>")
			.attr("dir","ltr"); //explicit setting
			if(ts.p.rowList.length >0){
				str = "<td dir=\""+dir+"\">";
				str +="<select "+getstyle(stylemodule, 'pgSelectBox', false, 'ui-pg-selbox')+" role=\"listbox\" title=\""+($.jgrid.getRegional(ts,"defaults.pgrecs",ts.p.pgrecs) || "")+ "\">";
				var strnm;
				for(i=0;i<ts.p.rowList.length;i++){
					strnm = ts.p.rowList[i].toString().split(":");
					if(strnm.length === 1) {
						strnm[1] = strnm[0];
					}
					str +="<option role=\"option\" value=\""+strnm[0]+"\""+(( intNum(ts.p.rowNum,0) === intNum(strnm[0],0))?" selected=\"selected\"":"")+">"+strnm[1]+"</option>";
				}
				str +="</select></td>";
			}
			if(dir==="rtl") { pgl += str; }
			if(ts.p.pginput===true) { 
				pginp= "<td id='input"+tp+"' dir='"+dir+"'>"+$.jgrid.template( $.jgrid.getRegional(ts, "defaults.pgtext", ts.p.pgtext) || "","<input class='ui-pg-input' type='text' size='2' maxlength='7' value='0' role='textbox'/>","<span id='sp_1_"+$.jgrid.jqID(pgid)+"'></span>")+"</td>";
			}
			if(ts.p.pgbuttons===true) {
				var po=["first"+tp,"prev"+tp, "next"+tp,"last"+tp], btc=getstyle(stylemodule, 'pgButtonBox', true, 'ui-pg-button'),
						pot = [($.jgrid.getRegional(ts,"defaults.pgfirst",ts.p.pgfirst) || ""),
								($.jgrid.getRegional(ts,"defaults.pgprev",ts.p.pgprev) || ""),
								($.jgrid.getRegional(ts,"defaults.pgnext",ts.p.pgnext) || ""),
								($.jgrid.getRegional(ts,"defaults.pglast",ts.p.pglast) || "")];
				if(dir==="rtl") { 
					po.reverse();
					pot.reverse();
				}
				pgl += "<td id='"+po[0]+"' class='"+btc+"' title='"+ pot[0] +"'" + "><span " + getstyle(stylemodule, 'icon_first', false, iconbase)+"></span></td>";
				pgl += "<td id='"+po[1]+"' class='"+btc+"'  title='"+ pot[1] +"'" +"><span " + getstyle(stylemodule, 'icon_prev', false, iconbase)+"></span></td>";
				pgl += pginp !== "" ? sep+pginp+sep:"";
				pgl += "<td id='"+po[2]+"' class='"+btc+"' title='"+ pot[2] +"'" +"><span " + getstyle(stylemodule, 'icon_next',false, iconbase)+"></span></td>";
				pgl += "<td id='"+po[3]+"' class='"+btc+"' title='"+ pot[3] +"'" +"><span " + getstyle(stylemodule, 'icon_end',false, iconbase)+"></span></td>";
			} else if (pginp !== "") { 
				pgl += pginp; 
			}
			if(dir==="ltr") { 
				pgl += str; 
			}
			pgl += "</tr></tbody></table>";
			if(ts.p.viewrecords===true) {
				$("td#"+pgid+"_"+ts.p.recordpos,"#"+pgcnt).append("<div dir='"+dir+"' style='text-align:"+ts.p.recordpos+"' class='ui-paging-info'></div>");
			}
			$("td#"+pgid+"_"+ts.p.pagerpos,"#"+pgcnt).append(pgl);
			tdw = $("#gbox_"+$.jgrid.jqID(ts.p.id)).css("font-size") || "11px";
			$("#gbox_"+$.jgrid.jqID(ts.p.id)).append("<div id='testpg' "+getstyle(stylemodule, 'entrieBox', false, 'ui-jqgrid')+" style='font-size:"+tdw+";visibility:hidden;' ></div>");
			twd = $(pgl).clone().appendTo("#testpg").width();
			$("#testpg").remove();
			if(twd > 0) {
				if(pginp !== "") { twd += 50; } //should be param
				$("td#"+pgid+"_"+ts.p.pagerpos,"#"+pgcnt).width(twd);
			}
			ts.p._nvtd = [];
			ts.p._nvtd[0] = twd ? Math.floor((ts.p.width - twd)/2) : Math.floor(ts.p.width/3);
			ts.p._nvtd[1] = 0; 
			pgl=null;
			$('.ui-pg-selbox',"#"+pgcnt).on('change',function() {
				if(!clearVals('records', this)) { return false; }
				ts.p.page = Math.round(ts.p.rowNum*(ts.p.page-1)/this.value-0.5)+1;
				ts.p.rowNum = this.value;
				if(ts.p.pager) { $('.ui-pg-selbox',ts.p.pager).val(this.value); }
				if(ts.p.toppager) { $('.ui-pg-selbox',ts.p.toppager).val(this.value); }
				populate();
				return false;
			});
			if(ts.p.pgbuttons===true) {
				$(".ui-pg-button","#"+pgcnt).hover(function(){
					if($(this).hasClass(disabled)) {
						this.style.cursor='default';
					} else {
						$(this).addClass(hover);
						this.style.cursor='pointer';
					}
				},function() {
					if(!$(this).hasClass(disabled)) {
						$(this).removeClass(hover);
						this.style.cursor= "default";
					}
				});
				$("#first"+$.jgrid.jqID(tp)+", #prev"+$.jgrid.jqID(tp)+", #next"+$.jgrid.jqID(tp)+", #last"+$.jgrid.jqID(tp)).click( function() {
					if ($(this).hasClass(disabled)) {
						return false;
					}
					var cp = intNum(ts.p.page,1),
					last = intNum(ts.p.lastpage,1), selclick = false,
					fp=true, pp=true, np=true,lp=true;
					if(last ===0 || last===1) {
						fp=false;
						pp=false;
						np=false;
						lp=false; 
					} else if( last>1 && cp >=1) {
						if( cp === 1) { 
							fp=false; 
							pp=false; 
						} else if( cp===last){ 
							np=false;
							lp=false; 
						}
					} else if( last>1 && cp===0 ) { 
						np=false;
						lp=false; 
						cp=last-1;
					}
					if(!clearVals(this.id.split("_")[0], this)) { return false; }
					if( this.id === 'first'+tp && fp ) { ts.p.page=1; selclick=true;}
					if( this.id === 'prev'+tp && pp) { ts.p.page=(cp-1); selclick=true;}
					if( this.id === 'next'+tp && np) { ts.p.page=(cp+1); selclick=true;}
					if( this.id === 'last'+tp && lp) { ts.p.page=last; selclick=true;}
					if(selclick) {
						populate();
					}
					return false;
				});
			}
			if(ts.p.pginput===true) {
				$("#"+pgcnt).on('keypress','input.ui-pg-input', function(e) {
					var key = e.charCode || e.keyCode || 0;
					if(key === 13) {
						if(!clearVals('user', this)) { return false; }
						$(this).val( intNum( $(this).val(), 1));
						ts.p.page = ($(this).val()>0) ? $(this).val():ts.p.page;
						populate();
						return false;
					}
					return this;
				});
			}
		},
		multiSort = function(iCol, obj, sor ) {
			var cm = ts.p.colModel,
					selTh = ts.p.frozenColumns ?  obj : ts.grid.headers[iCol].el, so="", sn;
			$("span.ui-grid-ico-sort",selTh).addClass(disabled);
			$(selTh).attr("aria-selected","false");
			sn = (cm[iCol].index || cm[iCol].name);
			if ( typeof sor == "undefined" )
			{
				if(cm[iCol].lso) {
					if(cm[iCol].lso==="asc") {
						cm[iCol].lso += "-desc";
						so = "desc";
					} else if(cm[iCol].lso==="desc") {
						cm[iCol].lso += "-asc";
						so = "asc";
					} else if(cm[iCol].lso==="asc-desc" || cm[iCol].lso==="desc-asc") {
						cm[iCol].lso="";
					}
				} else {
					cm[iCol].lso = so = cm[iCol].firstsortorder || 'asc';
				}
			}
			else {
				cm[iCol].lso = so = sor;
			}	
			if( so ) {
				$("span.s-ico",selTh).show();
				$("span.ui-icon-"+so,selTh).removeClass(disabled);
				$(selTh).attr("aria-selected","true");
			} else {
				if(!ts.p.viewsortcols[0]) {
					$("span.s-ico",selTh).hide();
				}
			}
			var isn = sortarr.indexOf( sn );
			if( isn === -1 ) {
				sortarr.push( sn );
				sortord.push( so );
			} else {
				if( so ) {
					sortord[isn] = so;
				} else {
					sortord.splice( isn, 1 );
					sortarr.splice( isn, 1 );
				}
			}
			ts.p.sortorder = "";
			ts.p.sortname = "";
			for( var i = 0, len = sortarr.length; i < len ; i++) {
				if( i > 0) {
					ts.p.sortname += ", ";
				}
				ts.p.sortname += sortarr[ i ];
				if( i !== len -1) {
					ts.p.sortname += " "+sortord[ i ];
				}
			}
			ts.p.sortorder = sortord[ len -1 ];
			/*
			$.each(cm, function(i){
				if(this.lso) {
					if(i>0 && fs) {
						sort += ", ";
					}
					splas = this.lso.split("-");
					sort += cm[i].index || cm[i].name;
					sort += " "+splas[splas.length-1];
					fs = true;
					ts.p.sortorder = splas[splas.length-1];
				}
			});
			ls = sort.lastIndexOf(ts.p.sortorder);
			sort = sort.substring(0, ls);
			ts.p.sortname = sort;
			*/
		},
		sortData = function (index, idxcol,reload,sor, obj){
			if(!ts.p.colModel[idxcol].sortable) { return; }
			if(ts.p.savedRow.length > 0) {return;}
			if(!reload) {
				if( ts.p.lastsort === idxcol && ts.p.sortname !== "" ) {
					if( ts.p.sortorder === 'asc') {
						ts.p.sortorder = 'desc';
					} else if(ts.p.sortorder === 'desc') { ts.p.sortorder = 'asc';}
				} else { ts.p.sortorder = ts.p.colModel[idxcol].firstsortorder || 'asc'; }
				ts.p.page = 1;
			}
			if(ts.p.multiSort) {
				multiSort( idxcol, obj, sor);
			} else {
				if(sor) {
					if(ts.p.lastsort === idxcol && ts.p.sortorder === sor && !reload) { return; }
					ts.p.sortorder = sor;
				}
				var previousSelectedTh = ts.grid.headers[ts.p.lastsort] ? ts.grid.headers[ts.p.lastsort].el : null, newSelectedTh = ts.p.frozenColumns ?  obj : ts.grid.headers[idxcol].el,
						//sortrule = $.trim(ts.p.viewsortcols[1] === 'single' ? hidden : disabled);
					usehide = ts.p.viewsortcols[1] === 'single' ? true : false, tmpicon;
				tmpicon = $(previousSelectedTh).find("span.ui-grid-ico-sort");
				tmpicon.addClass(disabled);
				if(usehide) { 
					$(tmpicon).css("display","none"); 
				}
				$(previousSelectedTh).attr("aria-selected","false");
				if(ts.p.frozenColumns) {
					tmpicon = ts.grid.fhDiv.find("span.ui-grid-ico-sort");
					tmpicon.addClass(disabled);
					if(usehide) { tmpicon.css("display","none"); }
					ts.grid.fhDiv.find("th").attr("aria-selected","false");
				}
				tmpicon = $(newSelectedTh).find("span.ui-icon-"+ts.p.sortorder);
				tmpicon.removeClass(disabled);
				if(usehide) { tmpicon.css("display",""); }
				$(newSelectedTh).attr("aria-selected","true");
				if(!ts.p.viewsortcols[0]) {
					if(ts.p.lastsort !== idxcol) {
						if(ts.p.frozenColumns){
							ts.grid.fhDiv.find("span.s-ico").hide();
						}
						$("span.s-ico",previousSelectedTh).hide();
						$("span.s-ico",newSelectedTh).show();
					} else if (ts.p.sortname === "") { // if ts.p.lastsort === idxcol but ts.p.sortname === ""
						$("span.s-ico",newSelectedTh).show();
					}
				}
				index = index.substring(5 + ts.p.id.length + 1); // bad to be changed!?!
				ts.p.sortname = ts.p.colModel[idxcol].index || index;
			}
			if ($(ts).triggerHandler("jqGridSortCol", [ts.p.sortname, idxcol, ts.p.sortorder]) === 'stop') {
				ts.p.lastsort = idxcol;
				return;
			}
			if($.isFunction(ts.p.onSortCol)) {if (ts.p.onSortCol.call(ts, ts.p.sortname, idxcol, ts.p.sortorder)==='stop') {ts.p.lastsort = idxcol; return;}}
			if(ts.p.datatype === "local") {
				if(ts.p.deselectAfterSort) {$(ts).jqGrid("resetSelection");}
			} else {
				ts.p.selrow = null;
				if(ts.p.multiselect){setHeadCheckBox( false );}
				ts.p.selarrrow =[];
				ts.p.savedRow =[];
			}
			if(ts.p.scroll) {
				var sscroll = ts.grid.bDiv.scrollLeft;
				emptyRows.call(ts, true, false);
				ts.grid.hDiv.scrollLeft = sscroll;
			}
			if(ts.p.subGrid && ts.p.datatype === 'local') {
				$("td.sgexpanded","#"+$.jgrid.jqID(ts.p.id)).each(function(){
					$(this).trigger("click");
				});
			}
			ts.p._sort = true;
			populate();
			ts.p.lastsort = idxcol;
			if(ts.p.sortname !== index && idxcol) {ts.p.lastsort = idxcol;}
		},
		setColWidth = function () {
			var initwidth = 0, brd=$.jgrid.cell_width? 0: intNum(ts.p.cellLayout,0), vc=0, lvc, scw=intNum(ts.p.scrollOffset,0),cw,hs=false,aw,gw=0,cr;
			$.each(ts.p.colModel, function() {
				if(this.hidden === undefined) {this.hidden=false;}
				if(ts.p.grouping && ts.p.autowidth) {
					var ind = $.inArray(this.name, ts.p.groupingView.groupField);
					if(ind >= 0 && ts.p.groupingView.groupColumnShow.length > ind) {
						this.hidden = !ts.p.groupingView.groupColumnShow[ind];
					}
				}
				this.widthOrg = cw = intNum(this.width,0);
				if(this.hidden===false){
					initwidth += cw+brd;
					if(this.fixed) {
						gw += cw+brd;
					} else {
						vc++;
					}
				}
			});
			if(isNaN(ts.p.width)) {
				ts.p.width  = initwidth + ((ts.p.shrinkToFit ===false && !isNaN(ts.p.height)) ? scw : 0);
			}
			grid.width = parseInt(ts.p.width,10);
			ts.p.tblwidth = initwidth;
			if(ts.p.shrinkToFit ===false && ts.p.forceFit === true) {ts.p.forceFit=false;}
			if(ts.p.shrinkToFit===true && vc > 0) {
				aw = grid.width-brd*vc-gw;
				if(!isNaN(ts.p.height)) {
					aw -= scw;
					hs = true;
				}
				initwidth =0;
				$.each(ts.p.colModel, function(i) {
					if(this.hidden === false && !this.fixed){
						cw = Math.round(aw*this.width/(ts.p.tblwidth-brd*vc-gw));
						this.width =cw;
						initwidth += cw;
						lvc = i;
					}
				});
				cr =0;
				if (hs) {
					if(grid.width-gw-(initwidth+brd*vc) !== scw){
						cr = grid.width-gw-(initwidth+brd*vc)-scw;
					}
				} else if(!hs && Math.abs(grid.width-gw-(initwidth+brd*vc)) !== 1) {
					cr = grid.width-gw-(initwidth+brd*vc);
				}
				ts.p.colModel[lvc].width += cr;
				ts.p.tblwidth = initwidth+cr+brd*vc+gw;
				if(ts.p.tblwidth > ts.p.width) {
					ts.p.colModel[lvc].width -= (ts.p.tblwidth - parseInt(ts.p.width,10));
					ts.p.tblwidth = ts.p.width;
				}
			}
		},
		nextVisible= function(iCol) {
			var ret = iCol, j=iCol, i;
			for (i = iCol+1;i<ts.p.colModel.length;i++){
				if(ts.p.colModel[i].hidden !== true ) {
					j=i; break;
				}
			}
			return j-ret;
		},
		getOffset = function (iCol) {
			var $th = $(ts.grid.headers[iCol].el), ret = [$th.position().left + $th.outerWidth()];
			if(ts.p.direction==="rtl") { ret[0] = ts.p.width - ret[0]; }
			ret[0] -= ts.grid.bDiv.scrollLeft;
			ret.push($(ts.grid.hDiv).position().top);
			ret.push($(ts.grid.bDiv).offset().top - $(ts.grid.hDiv).offset().top + $(ts.grid.bDiv).height());
			return ret;
		},
		getColumnHeaderIndex = function (th) {
			var i, headers = ts.grid.headers, ci = $.jgrid.getCellIndex(th);
			for (i = 0; i < headers.length; i++) {
				if (th === headers[i].el) {
					ci = i;
					break;
				}
			}
			return ci;
		},
		buildColItems = function (top, left, parent) {
			var cm = ts.p.colModel, len = cm.length, i, cols=[], disp,
			texts = $.jgrid.getRegional(ts, "colmenu"),
			str1 = '<ul id="col_menu" class="ui-search-menu  ui-col-menu modal-content" role="menu" tabindex="0" style="left:'+left+'px;top:'+top+'px;">';
			for(i=0;i<len;i++) {
				//if(!cm[i].hidedlg) { // column chooser
				var hid = !cm[i].hidden ? "checked" : "", nm = cm[i].name, lb = ts.p.colNames[i];
				disp = (nm === 'cb' || nm==='subgrid' || nm==='rn' || cm[i].hidedlg) ? "style='display:none'" :"";
				str1 += '<li '+disp+' class="ui-menu-item" role="presentation" draggable="true"><a class="g-menu-item" tabindex="0" role="menuitem" ><table class="ui-common-table" ><tr><td class="menu_icon" title="'+texts.reorder+'"><span class="'+iconbase+' '+colmenustyle.icon_move+' notclick"></span></td><td class="menu_icon"><input class="'+colmenustyle.input_checkbox+'" type="checkbox" name="'+nm+'" '+hid+'></td><td class="menu_text">'+lb+'</td></tr></table></a></li>';
				cols.push(i);
			}
			str1 += "</ul>";
			$(parent).append(str1);
			$("#col_menu").addClass("ui-menu " + colmenustyle.menu_widget);
			if($.fn.html5sortable()) {
				$("#col_menu").html5sortable({
					handle: 'span',
					forcePlaceholderSize: true }
				).on('sortupdate', function(e, ui) {
					cols.splice( ui.startindex, 1);
					cols.splice(ui.endindex, 0, ui.startindex);
					$(ts).jqGrid("destroyFrozenColumns");
					$(ts).jqGrid("remapColumns", cols, true);
					$(ts).jqGrid("setFrozenColumns");
					for(i=0;i<len;i++) {
						cols[i] = i;
					}
				});			
			} // NO jQuery UI 
			$("#col_menu > li > a").on("click", function(e) {
				var checked;
				if($(e.target).hasClass('notclick')) {
					return;
				}
				if($(e.target).is(":input")) {
					checked = $(e.target).is(":checked");
				} else {
					checked = !$("input", this).is(":checked");
					$("input", this).prop("checked",checked);
				}
				if(!checked) {
					$(ts).jqGrid('hideCol', $("input", this).attr('name'));
					$(this).parent().attr("draggable","false");
				} else {
					$(ts).jqGrid('showCol', $("input", this).attr('name'));
					$(this).parent().attr("draggable","true");
				}
			}).hover(function(){
				$(this).addClass(hover);
			},function(){
				$(this).removeClass(hover);
			});
		},
		buildSearchBox = function (index, top, left, parent) {
			var cm = ts.p.colModel[index], rules, o1='',v1='',r1='',o2='',v2='', so, op, repstr='',selected, elem,
			numopts = ['eq','ne', 'lt', 'le', 'gt', 'ge', 'nu', 'nn', 'in', 'ni'],
			stropts = ['eq', 'ne', 'bw', 'bn', 'ew', 'en', 'cn', 'nc', 'nu', 'nn', 'in', 'ni'],
			texts = $.jgrid.getRegional(ts, "search"),
			common = $.jgrid.styleUI[(ts.p.styleUI || 'jQueryUI')].common;

			if(!cm ) {
				return;
			}
			rules = ts.p.colFilters && ts.p.colFilters[cm.name] ?  ts.p.colFilters[cm.name] : false;
			if(rules && !$.isEmptyObject( rules )) {
				o1 = rules.oper1;
				v1 = rules.value1;
				r1 = rules.rule;
				o2 = rules.oper2;
				v2 = rules.value2;
			}
			if(! cm.searchoptions ) {
				cm.searchoptions = {};
			}
			if(cm.searchoptions.sopt) {
				so = cm.searchoptions.sopt;
			} else if(cm.sorttype === 'text') {
				so = stropts;
			} else {
				so = numopts;
			}
			if(cm.searchoptions.groupOps) {
				op = cm.searchoptions.groupOps;
			} else  {
				op = texts.groupOps;
			} 
			
			//elem = $('<ul id="search_menu" class="ui-search-menu modal-content" role="menu" tabindex="0" style="left:'+left+'px;top:'+top+'px;"></ul>');
			elem = $('<form></form>');
			var str1= '<div>'+$.jgrid.getRegional(ts, "colmenu.searchTitle")+'</div>';
			str1 += '<div><select id="oper1" class="'+colmenustyle.filter_select+'">';
			$.each(texts.odata, function(i, n) {
				selected = n.oper === o1 ? 'selected="selected"' : '';
				if($.inArray(n.oper, so) !== -1) {
					repstr += '<option value="'+n.oper+'" '+selected+'>'+n.text+'</option>';
				}
			});
			str1 += repstr;
			str1 += '</select></div>';
			elem.append(str1);
			var df="";
			if(cm.searchoptions.defaultValue ) {
				df = $.isFunction(cm.searchoptions.defaultValue) ? cm.searchoptions.defaultValue.call(ts) : cm.searchoptions.defaultValue;
			}
			//overwrite default value if restore from filters
			if( v1 ) {
				df = v1;
			}
			var soptions = $.extend(cm.searchoptions, {name:cm.index || cm.name, id: "sval1_" + ts.p.idPrefix+cm.name, oper:'search'}),
			input = $.jgrid.createEl.call(ts, cm.stype, soptions , df, false, $.extend({},$.jgrid.ajaxOptions, ts.p.ajaxSelectOptions || {}));
			$(input).addClass( colmenustyle.filter_input );
			str1 = $('<div></div>').append(input);
			elem.append(str1);
			// and/or
			str1 ='<div><select id="operand" class="'+colmenustyle.filter_select+'">';
			$.each(op, function(i, n){
				selected = n.op === r1 ? 'selected="selected"' : '';
				str1 += "<option value='"+n.op+"' "+selected+">"+n.text+"</option>";
			});
			str1 += '</select></div>';
			elem.append(str1);
			//oper2 		
			repstr ='';
			$.each(texts.odata, function(i, n) {
				selected = n.oper === o2 ? 'selected="selected"' : '';
				if($.inArray(n.oper, so) !== -1) {
					repstr += '<option value="'+n.oper+'" '+selected+'>'+n.text+'</option>';
				}
			});
			str1 = '<div><select id="oper2" class="'+colmenustyle.filter_select+'">' + repstr +'</select></div>';
			elem.append(str1);
			// value2
			if( v2 ) {
				df = v2;
			} else {
				df = "";
			}
			soptions = $.extend(cm.searchoptions, {name:cm.index || cm.name, id: "sval2_" + ts.p.idPrefix+cm.name, oper:'search'});
			input = $.jgrid.createEl.call(ts, cm.stype, soptions , df, false, $.extend({},$.jgrid.ajaxOptions, ts.p.ajaxSelectOptions || {}));
			$(input).addClass( colmenustyle.filter_input );
			str1 = $('<div></div>').append(input);
			elem.append(str1);
			// buttons
			str1 = "<div>";
			str1 +="<div class='search_buttons'><a tabindex='0' id='bs_reset' class='fm-button " + common.button +" ui-reset'>"+texts.Reset+"</a></div>";
			str1 +="<div class='search_buttons'><a tabindex='0' id='bs_search' class='fm-button " + common.button + " ui-search'>"+texts.Find+"</a></div>";
			str1 += "</div>";
			elem.append(str1);
			elem = $('<li class="ui-menu-item" role="presentation"></li>').append( elem );
			elem = $('<ul id="search_menu" class="ui-search-menu modal-content" role="menu" tabindex="0" style="left:'+left+'px;top:'+top+'px;"></ul>').append(elem);
			$(parent).append(elem);
			$("#search_menu").addClass("ui-menu " + colmenustyle.menu_widget);
			$("#bs_reset, #bs_search", "#search_menu").hover(function(){
				$(this).addClass(hover);
			},function(){
				$(this).removeClass(hover);
			});

			$("#bs_reset", elem).on('click', function(e){
				ts.p.colFilters[cm.name] = {};
				ts.p.postData.filters = buildFilters();
				ts.p.search = false;
				$(ts).trigger("reloadGrid");
				$("#column_menu").remove();
			});
			$("#bs_search", elem).on('click', function(e){
				ts.p.colFilters[cm.name] = {
					oper1: $("#oper1","#search_menu").val(),
					value1: $("#sval1_" + ts.p.idPrefix+cm.name,"#search_menu").val(),
					rule: $("#operand","#search_menu").val(),
					oper2 : $("#oper2","#search_menu").val(),
					value2 : $("#sval2_" + ts.p.idPrefix+cm.name,"#search_menu").val()
				};
				ts.p.postData.filters = buildFilters();
				ts.p.search = true;
				$(ts).trigger("reloadGrid");
				$("#column_menu").remove();
			});
		},
		buildFilters = function() {
			var go = "AND",
			filters ="{\"groupOp\":\"" + go + "\",\"rules\":[], \"groups\" : [", i=0;
			for (var item in ts.p.colFilters) {
				if(ts.p.colFilters.hasOwnProperty(item)) {
					var si = ts.p.colFilters[item];
					if(!$.isEmptyObject(si)) {
						if(i>0) {
							filters += ",";
						}
						filters += "{\"groupOp\": \""+si.rule +"\", \"rules\" : [";
						filters += "{\"field\":\"" + item + "\",";
						filters += "\"op\":\"" + si.oper1 + "\",";
						si.value1 +="";
						filters += "\"data\":\"" + si.value1.replace(/\\/g,'\\\\').replace(/\"/g,'\\"') + "\"}";
						if(si.value2) {
							filters += ",{\"field\":\"" + item + "\",";
							filters += "\"op\":\"" + si.oper2 + "\",";
							si.value2 +="";
							filters += "\"data\":\"" + si.value2.replace(/\\/g,'\\\\').replace(/\"/g,'\\"') + "\"}";
						}
						filters += "]}";
						i++;
					} else {
						//console.log('empty object');
					}
				}
			}
			filters += "]}";
			return filters;
		},
		buildGrouping = function( index, isgroup ) {
			var cm = ts.p.colModel[index],
				group = ts.p.groupingView;
			if(isgroup !== -1) {
				group.groupField.splice(isgroup,1);
			} else {
				group.groupField.push( cm.name);
			}
			$(ts).jqGrid('groupingGroupBy', group.groupField );
			if(ts.p.frozenColumns) {
				$(ts).jqGrid("destroyFrozenColumns");
				$(ts).jqGrid("setFrozenColumns");
			}
		},
		buildFreeze = function( index, isfreeze ) {
			var cols = [], i, len = ts.p.colModel.length, lastfrozen = -1, cm = ts.p.colModel;
			for(i=0; i < len; i++) {
				if(cm[i].frozen) {
					lastfrozen = i;
				}
				cols.push(i);
			}
				// from position index to lastfrozen+1
			cols.splice( index, 1);
			cols.splice(lastfrozen + (isfreeze ? 1 : 0), 0, index);
			cm[index].frozen = isfreeze;
			$(ts).jqGrid("destroyFrozenColumns");
			$(ts).jqGrid("remapColumns", cols, true);
			$(ts).jqGrid("setFrozenColumns");
		},
		buildColMenu = function( index, left, top ){
			//$("#sopt_menu").remove();
			left=parseInt(left,10);
			top=parseInt(top,10) + 25;
			var fs =  $('.ui-jqgrid-view').css('font-size') || '11px';
			var str = '<ul id="column_menu" class="ui-search-menu modal-content column-menu" role="menu" tabindex="0" style="font-size:'+fs+';left:'+left+'px;top:'+top+'px;">',
			cm = ts.p.colModel[index], op = $.extend({sorting:true, columns: true, filtering: true, seraching:true, grouping:true, freeze : true}, cm.coloptions),
			texts = $.jgrid.getRegional(ts, "colmenu"),
			label = ts.p.colNames[index],
			isgroup, isfreeze; // ???
			// sorting
			if(op.sorting) {
				str += '<li class="ui-menu-item" role="presentation"><a class="g-menu-item" tabindex="0" role="menuitem" value="sortasc"><table class="ui-common-table"><tr><td class="menu_icon"><span class="'+iconbase+' '+colmenustyle.icon_sort_asc+'"></span></td><td class="menu_text">'+texts.sortasc+'</td></tr></table></a></li>';
				str += '<li class="ui-menu-item" role="presentation"><a class="g-menu-item" tabindex="0" role="menuitem" value="sortdesc"><table class="ui-common-table"><tr><td class="menu_icon"><span class="'+iconbase+' '+colmenustyle.icon_sort_desc+'"></span></td><td class="menu_text">'+texts.sortdesc+'</td></tr></table></a></li>';
			}
			if(op.columns) {
				str += '<li class="ui-menu-item divider" role="separator"></li>';
				str += '<li class="ui-menu-item" role="presentation"><a class="g-menu-item" tabindex="0" role="menuitem" value="columns"><table class="ui-common-table"><tr><td class="menu_icon"><span class="'+iconbase+' '+colmenustyle.icon_columns+'"></span></td><td class="menu_text">'+texts.columns+'</td></tr></table></a></li>';
			}
			if(op.filtering) {
				str += '<li class="ui-menu-item divider" role="separator"></li>';
				str += '<li class="ui-menu-item" role="presentation"><a class="g-menu-item" tabindex="0" role="menuitem" value="filtering"><table class="ui-common-table"><tr><td class="menu_icon"><span class="'+iconbase+' '+colmenustyle.icon_filter+'"></span></td><td class="menu_text">'+texts.filter + ' ' + label +'</td></tr></table></a></li>';			
			}
			if(op.grouping) {
				isgroup = $.inArray(cm.name, ts.p.groupingView.groupField);
				str += '<li class="ui-menu-item divider" role="separator"></li>';
				str += '<li class="ui-menu-item" role="presentation"><a class="g-menu-item" tabindex="0" role="menuitem" value="grouping"><table class="ui-common-table"><tr><td class="menu_icon"><span class="'+iconbase+' '+colmenustyle.icon_group+'"></span></td><td class="menu_text">'+(isgroup !== -1 ?  texts.ungrouping: texts.grouping + ' ' + label)+'</td></tr></table></a></li>';
			}
			if(op.freeze) {
				isfreeze = (cm.frozen && ts.p.frozenColumns) ? false : true;
				str += '<li class="ui-menu-item divider" role="separator"></li>';
				str += '<li class="ui-menu-item" role="presentation"><a class="g-menu-item" tabindex="0" role="menuitem" value="freeze"><table class="ui-common-table"><tr><td class="menu_icon"><span class="'+iconbase+' '+colmenustyle.icon_freeze+'"></span></td><td class="menu_text">'+(isfreeze ? (texts.freeze + " "+ label) : texts.unfreeze)+'</td></tr></table></a></li>';
			}
			str += "</ul>";
			$('body').append( str );
			$("#column_menu").addClass("ui-menu " + colmenustyle.menu_widget);
			if(ts.p.direction === "ltr") {
				var wcm = $("#column_menu").width() + 26;
				$("#column_menu").css("left", (left- wcm)+'px');
			}
			$("#column_menu > li > a").hover(
				function(){
					$("#col_menu").remove();
					$("#search_menu").remove();
					var left1, top1;
					if($(this).attr("value") === 'columns') {
						left1 = $(this).parent().width()+18,
						top1 = $(this).parent().position().top - 5;
						buildColItems(top1, left1, $(this).parent());
					}
					if($(this).attr("value") === 'filtering') {
						left1 = $(this).parent().width()+18,
						top1 = $(this).parent().position().top - 5;
						buildSearchBox(index, top1, left1, $(this).parent());
					}
					$(this).addClass(hover); 
				},
				function(){ $(this).removeClass(hover); }
			).click(function(){
				var v = $(this).attr("value"),
				sobj = ts.grid.headers[index].el;
				if(v === 'sortasc') {
					sortData( "jqgh_"+ts.p.id+"_" + cm.name, index, true, 'asc', sobj);
				} else if(v === 'sortdesc') {
					sortData( "jqgh_"+ts.p.id+"_" + cm.name, index, true, 'desc', sobj);
				} else if (v === 'grouping') {
					buildGrouping(index, isgroup);
				} else if( v==='freeze') {
					buildFreeze( index, isfreeze);
				}
				if(v.indexOf('sort') !== -1 || v === 'grouping' || v==='freeze') {
					$(this).remove();
				}
			});
		},
		colTemplate;
		if(ts.p.colMenu) {
			$("body").on('click', function(e){
				if(!$(e.target).closest(".column-menu").length) {
					$("#column_menu").remove();
				}
			});
		}
		this.p.id = this.id;
		if ($.inArray(ts.p.multikey,sortkeys) === -1 ) {ts.p.multikey = false;}
		ts.p.keyName=false;
		for (i=0; i<ts.p.colModel.length;i++) {
			colTemplate = typeof ts.p.colModel[i].template === "string" ?
				($.jgrid.cmTemplate != null && typeof $.jgrid.cmTemplate[ts.p.colModel[i].template] === "object" ? $.jgrid.cmTemplate[ts.p.colModel[i].template]: {}) :
				ts.p.colModel[i].template;
			ts.p.colModel[i] = $.extend(true, {}, ts.p.cmTemplate, colTemplate || {}, ts.p.colModel[i]);
			if (ts.p.keyName === false && ts.p.colModel[i].key===true) {
				ts.p.keyName = ts.p.colModel[i].name;
				ts.p.keyIndex = i;
			}
		}
		ts.p.sortorder = ts.p.sortorder.toLowerCase();
		$.jgrid.cell_width = $.jgrid.cellWidth();
		if(ts.p.grouping===true) {
			ts.p.scroll = false;
			ts.p.rownumbers = false;
			//ts.p.subGrid = false; expiremental
			ts.p.treeGrid = false;
			ts.p.gridview = true;
		}
		if(this.p.treeGrid === true) {
			try { $(this).jqGrid("setTreeGrid");} catch (_) {}
			if(ts.p.datatype !== "local") { ts.p.localReader = {id: "_id_"};	}
		}
		if(this.p.subGrid) {
			try { $(ts).jqGrid("setSubGrid");} catch (s){}
		}
		if(this.p.multiselect) {
			this.p.colNames.unshift("<input role='checkbox' id='cb_"+this.p.id+"' class='cbox' type='checkbox'/>");
			this.p.colModel.unshift({name:'cb',width:$.jgrid.cell_width ? ts.p.multiselectWidth+ts.p.cellLayout : ts.p.multiselectWidth,sortable:false,resizable:false,hidedlg:true,search:false,align:'center',fixed:true, frozen: true});
		}
		if(this.p.rownumbers) {
			this.p.colNames.unshift("");
			this.p.colModel.unshift({name:'rn',width:ts.p.rownumWidth,sortable:false,resizable:false,hidedlg:true,search:false,align:'center',fixed:true, frozen : true});
		}
		ts.p.xmlReader = $.extend(true,{
			root: "rows",
			row: "row",
			page: "rows>page",
			total: "rows>total",
			records : "rows>records",
			repeatitems: true,
			cell: "cell",
			id: "[id]",
			userdata: "userdata",
			subgrid: {root:"rows", row: "row", repeatitems: true, cell:"cell"}
		}, ts.p.xmlReader);
		ts.p.jsonReader = $.extend(true,{
			root: "rows",
			page: "page",
			total: "total",
			records: "records",
			repeatitems: true,
			cell: "cell",
			id: "id",
			userdata: "userdata",
			subgrid: {root:"rows", repeatitems: true, cell:"cell"}
		},ts.p.jsonReader);
		ts.p.localReader = $.extend(true,{
			root: "rows",
			page: "page",
			total: "total",
			records: "records",
			repeatitems: false,
			cell: "cell",
			id: "id",
			userdata: "userdata",
			subgrid: {root:"rows", repeatitems: true, cell:"cell"}
		},ts.p.localReader);
		if(ts.p.scroll){
			ts.p.pgbuttons = false; ts.p.pginput=false; ts.p.rowList=[];
		}
		if(ts.p.data.length) { 
			normalizeData(); 
			refreshIndex(); 
		}
		var thead = "<thead><tr class='ui-jqgrid-labels' role='row'>",
		tdc, idn, w, res, sort ="",
		td, ptr, tbody, imgs, iac="", idc="", tmpcm;
		if(ts.p.shrinkToFit===true && ts.p.forceFit===true) {
			for (i=ts.p.colModel.length-1;i>=0;i--){
				if(!ts.p.colModel[i].hidden) {
					ts.p.colModel[i].resizable=false;
					break;
				}
			}
		}
		if(ts.p.viewsortcols[1] === 'horizontal') {
			iac=" ui-i-asc";
			idc=" ui-i-desc";
		} else if(ts.p.viewsortcols[1] === "single") { 
			iac = " ui-single-sort-asc";
			idc = " ui-single-sort-desc";
			sort = " style='display:none'";
			ts.p.viewsortcols[0] = false;
		}
		tdc = isMSIE ?  "class='ui-th-div-ie'" :"";
		imgs = "<span class='s-ico' style='display:none'>";
		imgs += "<span sort='asc'  class='ui-grid-ico-sort ui-icon-asc"+iac+" ui-sort-"+dir+" "+disabled+" " + iconbase + " " + getstyle(stylemodule, 'icon_asc', true)+ "'" + sort + "></span>";
		imgs += "<span sort='desc' class='ui-grid-ico-sort ui-icon-desc"+idc+" ui-sort-"+dir+" "+disabled+" " + iconbase + " " + getstyle(stylemodule, 'icon_desc', true)+"'" + sort + "></span></span>";
		if(ts.p.multiSort) {
			if(ts.p.sortname ) {
			sortarr = ts.p.sortname.split(",");
			for (i=0; i < sortarr.length; i++) {
				sotmp = $.trim(sortarr[i]).split(" ");
				sortarr[i] = $.trim(sotmp[0]);
				sortord[i] = sotmp[1] ? $.trim(sotmp[1]) : ts.p.sortorder || "asc";
			}
			}
		}
		for(i=0;i<this.p.colNames.length;i++){
			var tooltip = ts.p.headertitles ? (" title=\""+$.jgrid.stripHtml(ts.p.colNames[i])+"\"") :"";
			tmpcm = ts.p.colModel[i];
			if(!tmpcm.hasOwnProperty('colmenu')) {
				tmpcm.colmenu = (tmpcm.name === "rn" || tmpcm.name === "cb" || tmpcm.name === "subgrid") ? false : true;
			}
			thead += "<th id='"+ts.p.id+"_" + tmpcm.name+"' role='columnheader' "+getstyle(stylemodule,'headerBox',false, "ui-th-column ui-th-"+dir)+" "+ tooltip+">";
			idn = tmpcm.index || tmpcm.name;
			thead += "<div class='ui-th-div' id='jqgh_"+ts.p.id+"_"+tmpcm.name+"' "+tdc+">"+ts.p.colNames[i];
			if(!tmpcm.width)  { 
				tmpcm.width = 150; 
			} else { 
				tmpcm.width = parseInt(tmpcm.width,10); 
			}
			if(typeof tmpcm.title !== "boolean") { 
				tmpcm.title = true; 
			}
			tmpcm.lso = "";
			if (idn === ts.p.sortname) {
				ts.p.lastsort = i;
			}
			if(ts.p.multiSort) {
				sotmp = $.inArray(idn,sortarr);
				if( sotmp !== -1 ) {
					tmpcm.lso = sortord[sotmp];
				}
			}
			thead += imgs;
			if(ts.p.colMenu && tmpcm.colmenu) {
				thead += "<a class='colmenu' href='#/'><span class='colmenuspan "+iconbase+' '+colmenustyle.icon_menu+"'></span></a>";
			}
			thead += "</div></th>";
		}
		thead += "</tr></thead>";
		imgs = null;
		tmpcm = null;
		$(this).append(thead);
		$("thead tr:first th",this).hover(
			function(){ $(this).addClass(hover);},
			function(){	$(this).removeClass(hover);}
		);
		if(this.p.multiselect) {
			var emp=[], chk;
			$('#cb_'+$.jgrid.jqID(ts.p.id),this).on('click',function(){
				ts.p.selarrrow = [];
				var froz = ts.p.frozenColumns === true ? ts.p.id + "_frozen" : "";
				if (this.checked) {
					$(ts.rows).each(function(i) {
						if (i>0) {
							if(!$(this).hasClass("ui-subgrid") && !$(this).hasClass("jqgroup") && !$(this).hasClass(disabled) && !$(this).hasClass("jqfoot")){
								$("#jqg_"+$.jgrid.jqID(ts.p.id)+"_"+$.jgrid.jqID(this.id) )[ts.p.useProp ? 'prop': 'attr']("checked",true);
								$(this).addClass(highlight).attr("aria-selected","true");  
								ts.p.selarrrow.push(this.id);
								ts.p.selrow = this.id;
								if(froz) {
									$("#jqg_"+$.jgrid.jqID(ts.p.id)+"_"+$.jgrid.jqID(this.id), ts.grid.fbDiv )[ts.p.useProp ? 'prop': 'attr']("checked",true);
									$("#"+$.jgrid.jqID(this.id), ts.grid.fbDiv).addClass(highlight);
								}
							}
						}
					});
					chk=true;
					emp=[];
				}
				else {
					$(ts.rows).each(function(i) {
						if(i>0) {
							if(!$(this).hasClass("ui-subgrid") && !$(this).hasClass("jqgroup") && !$(this).hasClass(disabled) && !$(this).hasClass("jqfoot")){
								$("#jqg_"+$.jgrid.jqID(ts.p.id)+"_"+$.jgrid.jqID(this.id) )[ts.p.useProp ? 'prop': 'attr']("checked", false);
								$(this).removeClass(highlight).attr("aria-selected","false");
								emp.push(this.id);
								if(froz) {
									$("#jqg_"+$.jgrid.jqID(ts.p.id)+"_"+$.jgrid.jqID(this.id), ts.grid.fbDiv )[ts.p.useProp ? 'prop': 'attr']("checked",false);
									$("#"+$.jgrid.jqID(this.id), ts.grid.fbDiv).removeClass(highlight);
								}
							}
						}
					});
					ts.p.selrow = null;
					chk=false;
				}
				$(ts).triggerHandler("jqGridSelectAll", [chk ? ts.p.selarrrow : emp, chk]);
				if($.isFunction(ts.p.onSelectAll)) {ts.p.onSelectAll.call(ts, chk ? ts.p.selarrrow : emp,chk);}
			});
		}

		if(ts.p.autowidth===true) {
			var pw = $(eg).innerWidth();
			ts.p.width = pw > 0?  pw: 'nw';
		}
		setColWidth();
		$(eg).css("width",grid.width+"px").append("<div class='ui-jqgrid-resize-mark' id='rs_m"+ts.p.id+"'>&#160;</div>");
		if(ts.p.scrollPopUp) {
			$(eg).append("<div "+ getstyle(stylemodule, 'scrollBox', false, 'loading ui-scroll-popup')+" id='scroll_g"+ts.p.id+"'></div>");
		}
		$(gv).css("width",grid.width+"px");
		thead = $("thead:first",ts).get(0);
		var	tfoot = "";
		if(ts.p.footerrow) { tfoot += "<table role='presentation' style='width:"+ts.p.tblwidth+"px' "+getstyle(stylemodule,'footerTable', false, 'ui-jqgrid-ftable ui-common-table')+ "><tbody><tr role='row' "+getstyle(stylemodule,'footerBox', false, 'footrow footrow-'+dir)+">"; }
		var thr = $("tr:first",thead),
		firstr = "<tr class='jqgfirstrow' role='row'>";
		ts.p.disableClick=false;
		$("th",thr).each(function ( j ) {
			tmpcm = ts.p.colModel[j];
			w = tmpcm.width;
			if(tmpcm.resizable === undefined) {
				tmpcm.resizable = true;
			}
			if(tmpcm.resizable){
				res = document.createElement("span");
				$(res).html("&#160;").addClass('ui-jqgrid-resize ui-jqgrid-resize-'+dir)
				.css("cursor","col-resize");
				$(this).addClass(ts.p.resizeclass);
			} else {
				res = "";
			}
			$(this).css("width",w+"px").prepend(res);
			res = null;
			var hdcol = "";
			if( tmpcm.hidden ) {
				$(this).css("display","none");
				hdcol = "display:none;";
			}
			firstr += "<td role='gridcell' style='height:0px;width:"+w+"px;"+hdcol+"'></td>";
			grid.headers[j] = { width: w, el: this };
			sort = tmpcm.sortable;
			if( typeof sort !== 'boolean') { 
				tmpcm.sortable =  true; 
				sort=true;
			}
			var nm = tmpcm.name;
			if( !(nm === 'cb' || nm==='subgrid' || nm==='rn') ) {
				if(ts.p.viewsortcols[2]){
					$(">div",this).addClass('ui-jqgrid-sortable');
				}
			}
			if(sort) {
				if(ts.p.multiSort) {
					if(ts.p.viewsortcols[0]) {
						$("div span.s-ico",this).show(); 
						if(ts.tmpcm.lso){ 
							$("div span.ui-icon-"+tmpcm.lso,this).removeClass(disabled).css("display","");
						}
					} else if( tmpcm.lso) {
						$("div span.s-ico",this).show();
						$("div span.ui-icon-"+tmpcm.lso,this).removeClass(disabled).css("display","");
					}
				} else {
					if(ts.p.viewsortcols[0]) {
						$("div span.s-ico",this).show(); 
						if(j===ts.p.lastsort){ 
							$("div span.ui-icon-"+ts.p.sortorder,this).removeClass(disabled).css("display","");
						}
					} else if(j === ts.p.lastsort && ts.p.sortname !== "") {
						$("div span.s-ico",this).show();
						$("div span.ui-icon-"+ts.p.sortorder,this).removeClass(disabled).css("display","");
					}
				}
			}
			if(ts.p.footerrow) {
				tfoot += "<td role='gridcell' "+formatCol(j,0,'', null, '', false)+">&#160;</td>"; 
			}
		}).mousedown(function(e) {
			if ($(e.target).closest("th>span.ui-jqgrid-resize").length !== 1) { return; }
			var ci = getColumnHeaderIndex(this);
			if(ts.p.forceFit===true) {ts.p.nv= nextVisible(ci);}
			grid.dragStart(ci, e, getOffset(ci));
			return false;
		}).click(function(e) {
			if (ts.p.disableClick) {
				ts.p.disableClick = false;
				return false;
			}
			var s = "th>div.ui-jqgrid-sortable",r,d;
			if (!ts.p.viewsortcols[2]) { s = "th>div>span>span.ui-grid-ico-sort"; }
			var t = $(e.target).closest(s);
			if (t.length !== 1) { return; }
			var ci;
			if(ts.p.frozenColumns) {
				var tid =  $(this)[0].id.substring( ts.p.id.length + 1 );
				$(ts.p.colModel).each(function(i){
					if (this.name === tid) {
						ci = i;return false;
					}
				});
			} else {
				ci = getColumnHeaderIndex(this);
			}
			//
			if($(e.target).hasClass('colmenuspan')) {
				if($("#column_menu")[0] != null) {
					$("#column_menu").remove();
				}

				var colindex = $.jgrid.getCellIndex(e.target);
				if(colindex === -1) { return;}
				var offset = $(this).offset(),
				left = ( offset.left ),
				top = ( offset.top);
				if(ts.p.direction === "ltr") {
					left += $(this).outerWidth();
				}
				buildColMenu(colindex, left, top, t );
				e.stopPropagation();
				return;
			}
			//
			if (!ts.p.viewsortcols[2]) { r=true;d=t.attr("sort"); }
			if(ci != null){
				sortData( $('div',this)[0].id, ci, r, d, this);
			}
			return false;
		});
		tmpcm = null;
		if (ts.p.sortable && $.fn.sortable) {
			try {
				$(ts).jqGrid("sortableColumns", thr);
			} catch (e){}
		}
		if(ts.p.footerrow) { tfoot += "</tr></tbody></table>"; }
		firstr += "</tr>";
		tbody = document.createElement("tbody");
		//$(this).append(firstr);
		this.appendChild(tbody);
		$(this).addClass(getstyle(stylemodule,"rowTable", true, 'ui-jqgrid-btable ui-common-table')).append(firstr);
		if(ts.p.altRows) {
			$(this).addClass(getstyle(stylemodule,"stripedTable", true, ''));
		}
		//$(firstr).insertAfter(this);
		firstr = null;
		var hTable = $("<table "+getstyle(stylemodule,'headerTable',false,'ui-jqgrid-htable ui-common-table')+" style='width:"+ts.p.tblwidth+"px' role='presentation' aria-labelledby='gbox_"+this.id+"'></table>").append(thead),
		hg = (ts.p.caption && ts.p.hiddengrid===true) ? true : false,
		hb = $("<div class='ui-jqgrid-hbox" + (dir==="rtl" ? "-rtl" : "" )+"'></div>"),
		bstw = ts.p.styleUI === 'Bootstrap' && !isNaN(ts.p.height) ? 2 : 0;
		thead = null;
		grid.hDiv = document.createElement("div");
		grid.hDiv.style.width = (grid.width - bstw) + "px";
		grid.hDiv.className = getstyle(stylemodule,'headerDiv', true,'ui-jqgrid-hdiv');

		$(grid.hDiv).append(hb);
		$(hb).append(hTable);
		hTable = null;
		if(hg) { $(grid.hDiv).hide(); }
		if(ts.p.pager){
			// TBD -- escape ts.p.pager here?
			if(typeof ts.p.pager === "string") {if(ts.p.pager.substr(0,1) !== "#") { ts.p.pager = "#"+ts.p.pager;} }
			else { ts.p.pager = "#"+ $(ts.p.pager).attr("id");}
			$(ts.p.pager).css({width: grid.width+"px"}).addClass(getstyle(stylemodule,'pagerBox', true,'ui-jqgrid-pager')).appendTo(eg);
			if(hg) {$(ts.p.pager).hide();}
			setPager(ts.p.pager,'');
		}
		if( ts.p.cellEdit === false && ts.p.hoverrows === true) {
			$(ts).on({
				mouseover: function(e) {
					ptr = $(e.target).closest("tr.jqgrow");
					if($(ptr).attr("class") !== "ui-subgrid") {
						$(ptr).addClass(hover);
					}
				},
				mouseout: function(e) {
					ptr = $(e.target).closest("tr.jqgrow");
					$(ptr).removeClass(hover);
				}
			});
		}
		var ri,ci, tdHtml;
		function selectMultiRow(ri, scb, e, selection) {
			if((ts.p.multiselect && ts.p.multiboxonly) || ts.p.multimail ) {
				if(scb){
					$(ts).jqGrid("setSelection", ri, selection, e);
				} else if(  ts.p.multiboxonly && ts.p.multimail) {
					// execute onSelectRow
					$(ts).triggerHandler("jqGridSelectRow", [ri, false, e]);
					if( ts.p.onSelectRow) { ts.p.onSelectRow.call(ts, ri, false, e); }
				} else {
					var frz = ts.p.frozenColumns ? ts.p.id+"_frozen" : "";
					$(ts.p.selarrrow).each(function(i,n){
						var trid = $(ts).jqGrid('getGridRowById',n);
						if(trid) {
							$( trid ).removeClass(highlight); 
						}
						$("#jqg_"+$.jgrid.jqID(ts.p.id)+"_"+$.jgrid.jqID(n))[ts.p.useProp ? 'prop': 'attr']("checked", false);
						if(frz) {
							$("#"+$.jgrid.jqID(n), "#"+$.jgrid.jqID(frz)).removeClass(highlight);
							$("#jqg_"+$.jgrid.jqID(ts.p.id)+"_"+$.jgrid.jqID(n), "#"+$.jgrid.jqID(frz))[ts.p.useProp ? 'prop': 'attr']("checked", false);
						}
					});
					ts.p.selarrrow = [];
					$(ts).jqGrid("setSelection", ri, selection, e);
				}
			} else {
				$(ts).jqGrid("setSelection", ri, selection, e);
			}
		}
		$(ts).before(grid.hDiv).on({
			'click': function(e) {
				td = e.target;
				ptr = $(td,ts.rows).closest("tr.jqgrow");
				if($(ptr).length === 0 || ptr[0].className.indexOf( disabled ) > -1 || ($(td,ts).closest("table.ui-jqgrid-btable").attr('id') || '').replace("_frozen","") !== ts.id ) {
					return this;
				}
				var scb = $(td).filter(":enabled").hasClass("cbox"),
				cSel = $(ts).triggerHandler("jqGridBeforeSelectRow", [ptr[0].id, e]);
				cSel = (cSel === false || cSel === 'stop') ? false : true;
				if ($.isFunction(ts.p.beforeSelectRow)) {
					var allowRowSelect = ts.p.beforeSelectRow.call(ts, ptr[0].id, e);
					if (allowRowSelect === false || allowRowSelect === 'stop') {
						cSel = false;
					}
				}
				if (td.tagName === 'A' || ((td.tagName === 'INPUT' || td.tagName === 'TEXTAREA' || td.tagName === 'OPTION' || td.tagName === 'SELECT' ) && !scb) ) { return; }
				ri = ptr[0].id;
				td = $(td).closest("tr.jqgrow>td");
				if (td.length > 0) {
					ci = $.jgrid.getCellIndex(td);
				}
				if(ts.p.cellEdit === true) {
					if(ts.p.multiselect && scb && cSel){
						$(ts).jqGrid("setSelection", ri ,true,e);
					} else if (td.length > 0) {
						try {
							$(ts).jqGrid("editCell", ptr[0].rowIndex, ci, true);
						} catch (_) {}
					}
					return;
				}
				if (td.length > 0) {
					tdHtml = $(td).closest("td,th").html();
					$(ts).triggerHandler("jqGridCellSelect", [ri,ci,tdHtml,e]);
					if($.isFunction(ts.p.onCellSelect)) {
						ts.p.onCellSelect.call(ts,ri,ci,tdHtml,e);
					}
				}
				if (!cSel) {
					return;
				}
				if( ts.p.multimail && ts.p.multiselect) {
					if (e.shiftKey) {
						if (scb) {
							var initialRowSelect = $(ts).jqGrid('getGridParam', 'selrow'),

							CurrentSelectIndex = $(ts).jqGrid('getInd', ri),
							InitialSelectIndex = $(ts).jqGrid('getInd', initialRowSelect),
							startID = "",
							endID = "";
							if (CurrentSelectIndex > InitialSelectIndex) {
								startID = initialRowSelect;
								endID = ri;
							} else {
								startID = ri;
								endID = initialRowSelect;
							}
							var shouldSelectRow = false,
							shouldResetRow = false,
							perform_select = true;

							if( $.inArray( ri, ts.p.selarrrow) > -1) {
								perform_select = false;
							}

							$.each($(this).getDataIDs(), function(_, id){
								if ((shouldResetRow = id === startID || shouldResetRow)){
									$(ts).jqGrid('resetSelection', id);
								}
								return id !== endID;
							});
							if(perform_select) {
								$.each($(this).getDataIDs(), function(_, id){
									if ((shouldSelectRow = id === startID || shouldSelectRow)){
										$(ts).jqGrid('setSelection', id, false);
									}
									return id !== endID;
								});
							}

							ts.p.selrow = (CurrentSelectIndex > InitialSelectIndex) ? endID : startID;
							return;
						}
						window.getSelection().removeAllRanges();
					}
					selectMultiRow( ri, scb, e, false );
				} else if ( !ts.p.multikey ) {
					selectMultiRow( ri, scb, e, true );
				} else {
					if(e[ts.p.multikey]) {
						$(ts).jqGrid("setSelection", ri, true, e);
					} else if(ts.p.multiselect && scb) {
						scb = $("#jqg_"+$.jgrid.jqID(ts.p.id)+"_"+ri).is(":checked");
						$("#jqg_"+$.jgrid.jqID(ts.p.id)+"_"+ri)[ts.p.useProp ? 'prop' : 'attr']("checked", !scb);
					}
				}
			},
			'reloadGrid': function(e,opts) {
				if(ts.p.treeGrid ===true) {
					ts.p.datatype = ts.p.treedatatype;
				}
				opts = opts || {};
				if (opts.current) {
					ts.grid.selectionPreserver(ts);
				}
				if(ts.p.datatype==="local"){
					$(ts).jqGrid("resetSelection");
					if(ts.p.data.length) {
						normalizeData();
						refreshIndex();
					}
				} else if(!ts.p.treeGrid) {
					ts.p.selrow=null;
					if(ts.p.multiselect) {
						ts.p.selarrrow =[];
						setHeadCheckBox(false);
					}
					ts.p.savedRow = [];
				}
				if(ts.p.scroll) {
					emptyRows.call(ts, true, false);
				}
				if (opts.page) {
					var page = opts.page;
					if (page > ts.p.lastpage) { page = ts.p.lastpage; }
					if (page < 1) { page = 1; }
					ts.p.page = page;
					if (ts.grid.prevRowHeight) {
						ts.grid.bDiv.scrollTop = (page - 1) * ts.grid.prevRowHeight * ts.p.rowNum;
					} else {
						ts.grid.bDiv.scrollTop = 0;
					}
				}
				if (ts.grid.prevRowHeight && ts.p.scroll && opts.page === undefined) {
					delete ts.p.lastpage;
					ts.grid.populateVisible();
				} else {
					ts.grid.populate();
				}
				if(ts.p.inlineNav===true) {$(ts).jqGrid('showAddEditButtons');}
				return false;
			},
			'dblclick' : function(e) {
				td = e.target;
				ptr = $(td,ts.rows).closest("tr.jqgrow");
				if($(ptr).length === 0 ){return;}
				ri = ptr[0].rowIndex;
				ci = $.jgrid.getCellIndex(td);
				var dbcr = $(ts).triggerHandler("jqGridDblClickRow", [$(ptr).attr("id"),ri,ci,e]);
				if( dbcr != null) { return dbcr; }
				if ($.isFunction(ts.p.ondblClickRow)) { 
					dbcr = ts.p.ondblClickRow.call(ts,$(ptr).attr("id"),ri,ci, e); 
					if( dbcr != null) { return dbcr; }
				}
			},
			'contextmenu' : function(e) {
				td = e.target;
				ptr = $(td,ts.rows).closest("tr.jqgrow");
				if($(ptr).length === 0 ){return;}
				if(!ts.p.multiselect) {	$(ts).jqGrid("setSelection",ptr[0].id,true,e);	}
				ri = ptr[0].rowIndex;
				ci = $.jgrid.getCellIndex(td);
				var rcr = $(ts).triggerHandler("jqGridRightClickRow", [$(ptr).attr("id"),ri,ci,e]);
				if( rcr != null) { return rcr; }
				if ($.isFunction(ts.p.onRightClickRow)) { 
					rcr = ts.p.onRightClickRow.call(ts,$(ptr).attr("id"),ri,ci, e); 
					if( rcr != null) { return rcr; }
				}
			}
		});
		//---
		grid.bDiv = document.createElement("div");
		if(isMSIE) { if(String(ts.p.height).toLowerCase() === "auto") { ts.p.height = "100%"; } }
		$(grid.bDiv)
			.append($('<div style="position:relative;"></div>').append('<div></div>').append(this))
			.addClass("ui-jqgrid-bdiv")
			.css({ height: ts.p.height+(isNaN(ts.p.height)?"":"px"), width: (grid.width - bstw)+"px"})
			.scroll(grid.scrollGrid);
		$("table:first",grid.bDiv).css({width:ts.p.tblwidth+"px"});
		if( !$.support.tbody ) { //IE
			if( $("tbody",this).length === 2 ) { $("tbody:gt(0)",this).remove();}
		}
		if(ts.p.multikey){
			if( $.jgrid.msie()) {
				$(grid.bDiv).on("selectstart",function(){return false;});
			} else {
				$(grid.bDiv).on("mousedown",function(){return false;});
			}
		}
		if(hg) { // hidden grid
			$(grid.bDiv).hide();
		}
		var icoo =  iconbase + " " + getstyle(stylemodule,'icon_caption_open', true),
		icoc =  iconbase + " " + getstyle(stylemodule,'icon_caption_close', true);
		grid.cDiv = document.createElement("div");
		var arf = ts.p.hidegrid===true ? $("<a role='link' class='ui-jqgrid-titlebar-close HeaderButton "+cornerall+"' title='"+($.jgrid.getRegional(ts, "defaults.showhide", ts.p.showhide) || "")+"'" + " />").hover(
			function(){ arf.addClass(hover);},
			function() {arf.removeClass(hover);})
		.append("<span class='ui-jqgrid-headlink " + icoo +"'></span>").css((dir==="rtl"?"left":"right"),"0px") : "";
		$(grid.cDiv).append(arf).append("<span class='ui-jqgrid-title'>"+ts.p.caption+"</span>")
		.addClass("ui-jqgrid-titlebar ui-jqgrid-caption"+(dir==="rtl" ? "-rtl" :"" )+" "+getstyle(stylemodule,'gridtitleBox',true));
		$(grid.cDiv).insertBefore(grid.hDiv);
		if( ts.p.toolbar[0] ) {
			var tbstyle = getstyle(stylemodule, 'customtoolbarBox', true, 'ui-userdata');
			grid.uDiv = document.createElement("div");
			if(ts.p.toolbar[1] === "top") {$(grid.uDiv).insertBefore(grid.hDiv);}
			else if (ts.p.toolbar[1]==="bottom" ) {$(grid.uDiv).insertAfter(grid.hDiv);}
			if(ts.p.toolbar[1]==="both") {
				grid.ubDiv = document.createElement("div");
				$(grid.uDiv).addClass( tbstyle + " ui-userdata-top").attr("id","t_"+this.id).insertBefore(grid.hDiv).width(grid.width - bstw);
				$(grid.ubDiv).addClass( tbstyle + " ui-userdata-bottom").attr("id","tb_"+this.id).insertAfter(grid.hDiv).width(grid.width - bstw);
				if(hg)  {$(grid.ubDiv).hide();}
			} else {
				$(grid.uDiv).width(grid.width - bstw).addClass( tbstyle + " ui-userdata-top").attr("id","t_"+this.id);
			}
			if(hg) {$(grid.uDiv).hide();}
		}
		if(ts.p.toppager) {
			ts.p.toppager = $.jgrid.jqID(ts.p.id)+"_toppager";
			grid.topDiv = $("<div id='"+ts.p.toppager+"'></div>")[0];
			ts.p.toppager = "#"+ts.p.toppager;
			$(grid.topDiv).addClass(getstyle(stylemodule, 'toppagerBox', true, 'ui-jqgrid-toppager')).width(grid.width - bstw).insertBefore(grid.hDiv);
			setPager(ts.p.toppager,'_t');
		}
		if(ts.p.footerrow) {
			grid.sDiv = $("<div class='ui-jqgrid-sdiv'></div>")[0];
			hb = $("<div class='ui-jqgrid-hbox"+(dir==="rtl"?"-rtl":"")+"'></div>");
			$(grid.sDiv).append(hb).width(grid.width - bstw).insertAfter(grid.hDiv);
			$(hb).append(tfoot);
			grid.footers = $(".ui-jqgrid-ftable",grid.sDiv)[0].rows[0].cells;
			if(ts.p.rownumbers) { grid.footers[0].className = getstyle(stylemodule, 'rownumBox', true, 'jqgrid-rownum'); }
			if(hg) {$(grid.sDiv).hide();}
		}
		hb = null;
		if(ts.p.caption) {
			var tdt = ts.p.datatype;
			if(ts.p.hidegrid===true) {
				$(".ui-jqgrid-titlebar-close",grid.cDiv).click( function(e){
					var onHdCl = $.isFunction(ts.p.onHeaderClick),
					elems = ".ui-jqgrid-bdiv, .ui-jqgrid-hdiv, .ui-jqgrid-toppager, .ui-jqgrid-pager, .ui-jqgrid-sdiv",
					counter, self = this;
					if(ts.p.toolbar[0]===true) {
						if( ts.p.toolbar[1]==='both') {
							elems += ', #' + $(grid.ubDiv).attr('id');
						}
						elems += ', #' + $(grid.uDiv).attr('id');
					}
					counter = $(elems,"#gview_"+$.jgrid.jqID(ts.p.id)).length;

					if(ts.p.gridstate === 'visible') {
						$(elems,"#gbox_"+$.jgrid.jqID(ts.p.id)).slideUp("fast", function() {
							counter--;
							if (counter === 0) {
								$("span",self).removeClass(icoo).addClass(icoc);
								ts.p.gridstate = 'hidden';
								if($("#gbox_"+$.jgrid.jqID(ts.p.id)).hasClass("ui-resizable")) { $(".ui-resizable-handle","#gbox_"+$.jgrid.jqID(ts.p.id)).hide(); }
								$(ts).triggerHandler("jqGridHeaderClick", [ts.p.gridstate,e]);
								if(onHdCl) {if(!hg) {ts.p.onHeaderClick.call(ts,ts.p.gridstate,e);}}
							}
						});
					} else if(ts.p.gridstate === 'hidden'){
						$(elems,"#gbox_"+$.jgrid.jqID(ts.p.id)).slideDown("fast", function() {
							counter--;
							if (counter === 0) {
								$("span",self).removeClass(icoc).addClass(icoo);
								if(hg) {ts.p.datatype = tdt;populate();hg=false;}
								ts.p.gridstate = 'visible';
								if($("#gbox_"+$.jgrid.jqID(ts.p.id)).hasClass("ui-resizable")) { $(".ui-resizable-handle","#gbox_"+$.jgrid.jqID(ts.p.id)).show(); }
								$(ts).triggerHandler("jqGridHeaderClick", [ts.p.gridstate,e]);
								if(onHdCl) {if(!hg) {ts.p.onHeaderClick.call(ts,ts.p.gridstate,e);}}
							}
						});
					}
					return false;
				});
				if(hg) {ts.p.datatype="local"; $(".ui-jqgrid-titlebar-close",grid.cDiv).trigger("click");}
			}
		} else {
			$(grid.cDiv).hide();
			if(!ts.p.toppager) {
				$(grid.hDiv).addClass(getstyle(ts.p.styleUI+'.common', 'cornertop', true));
			}
		}
		$(grid.hDiv).after(grid.bDiv)
		.mousemove(function (e) {
			if(grid.resizing){grid.dragMove(e);return false;}
		});
		$(".ui-jqgrid-labels",grid.hDiv).on("selectstart", function () { return false; });
		$(document).on( "mouseup.jqGrid" + ts.p.id, function () {
			if(grid.resizing) {	grid.dragEnd( true ); return false;}
			return true;
		});
		if(ts.p.direction === 'rtl') {
			$(ts).on('jqGridAfterGridComplete.setRTLPadding',function(){
					var  vScrollWidth = grid.bDiv.offsetWidth - grid.bDiv.clientWidth;
					//gridhbox = $("div:first",grid.hDiv);
					ts.p.scrollOffset = vScrollWidth;
					// for future implementation
					//if (gridhbox.hasClass("ui-jqgrid-hbox-rtl")) {
						$("div:first",grid.hDiv).css({paddingLeft: vScrollWidth + "px"});
					//} else {
						//gridhbox.css({paddingRight: vScrollWidth + "px"});
					//}
					grid.hDiv.scrollLeft = grid.bDiv.scrollLeft;
			});
		}
		ts.formatCol = formatCol;
		ts.sortData = sortData;
		ts.updatepager = updatepager;
		ts.refreshIndex = refreshIndex;
		ts.setHeadCheckBox = setHeadCheckBox;
		ts.constructTr = constructTr;
		ts.formatter = function ( rowId, cellval , colpos, rwdat, act){return formatter(rowId, cellval , colpos, rwdat, act);};
		$.extend(grid,{populate : populate, emptyRows: emptyRows, beginReq: beginReq, endReq: endReq});
		this.grid = grid;
		ts.addXmlData = function(d) {addXmlData( d );};
		ts.addJSONData = function(d) {addJSONData( d );};
		ts.addLocalData = function(d) { return addLocalData( d );};
		this.grid.cols = this.rows[0].cells;
		if ($.isFunction( ts.p.onInitGrid )) { ts.p.onInitGrid.call(ts); }
		populate();
		ts.p.hiddengrid=false;
		if(ts.p.responsive) {
			var supportsOrientationChange = "onorientationchange" in window,
			orientationEvent = supportsOrientationChange ? "orientationchange" : "resize";		
			$(window).on( orientationEvent, function(){
				$(ts).jqGrid('resizeGrid');
			});
		}
	});
};
$.jgrid.extend({
	getGridParam : function(name, module) {
		var $t = this[0], ret;
		if (!$t || !$t.grid) {return;}
		if(module === undefined && typeof module !== 'string') {
			module = 'jqGrid'; //$t.p
		}
		ret = $t.p;
		if(module !== 'jqGrid') {
			try {
				ret = $($t).data( module );
			} catch (e) {
				ret = $t.p;
			}
		}
		if (!name) { return ret; }	
		return ret[name] !== undefined ? ret[name] : null;
	},
	setGridParam : function (newParams, overwrite){
		return this.each(function(){
			if(overwrite == null) {
				overwrite = false;
			}
			if (this.grid && typeof newParams === 'object') {
				if(overwrite === true) {
					var params = $.extend({}, this.p, newParams);
					this.p = params;
				} else {
					$.extend(true,this.p,newParams);
				}
			}
		});
	},
	getGridRowById: function ( rowid ) {
		var row;
		this.each( function(){
			try {
				//row = this.rows.namedItem( rowid );
				var i = this.rows.length;
				while(i--) {
					if( rowid.toString() === this.rows[i].id) {
						row = this.rows[i];
						break;
					}
				}
			} catch ( e ) {
				row = $(this.grid.bDiv).find( "#" + $.jgrid.jqID( rowid ));
			}
		});
		return row;
	},
	getDataIDs : function () {
		var ids=[], i=0, len, j=0;
		this.each(function(){
			len = this.rows.length;
			if(len && len>0){
				while(i<len) {
					if($(this.rows[i]).hasClass('jqgrow')) {
						ids[j] = this.rows[i].id;
						j++;
					}
					i++;
				}
			}
		});
		return ids;
	},
	setSelection : function(selection,onsr, e) {
		return this.each(function(){
			var $t = this, stat,pt, ner, ia, tpsr, fid, csr,
			getstyle = $.jgrid.getMethod("getStyleUI"),
			highlight = getstyle($t.p.styleUI+'.common','highlight', true),
			disabled = getstyle($t.p.styleUI+'.common','disabled', true);
			if(selection === undefined) { return; }
			onsr = onsr === false ? false : true;
			pt=$($t).jqGrid('getGridRowById', selection);
			if(!pt || !pt.className || pt.className.indexOf( disabled ) > -1 ) { return; }
			function scrGrid(iR){
				var ch = $($t.grid.bDiv)[0].clientHeight,
				st = $($t.grid.bDiv)[0].scrollTop,
				rpos = $($t.rows[iR]).position().top,
				rh = $t.rows[iR].clientHeight;
				if(rpos+rh >= ch+st) { $($t.grid.bDiv)[0].scrollTop = rpos-(ch+st)+rh+st; }
				else if(rpos < ch+st) {
					if(rpos < st) {
						$($t.grid.bDiv)[0].scrollTop = rpos;
					}
				}
			}
			if($t.p.scrollrows===true) {
				ner = $($t).jqGrid('getGridRowById',selection).rowIndex;
				if(ner >=0 ){
					scrGrid(ner);
				}
			}
			if($t.p.frozenColumns === true ) {
				fid = $t.p.id+"_frozen";
			}
			if(!$t.p.multiselect) {	
				if(pt.className !== "ui-subgrid") {
					if( $t.p.selrow !== pt.id ) {
						csr = $($t).jqGrid('getGridRowById', $t.p.selrow);
						if( csr ) {
							$(  csr ).removeClass(highlight).attr({"aria-selected":"false", "tabindex" : "-1"});
						}
						$(pt).addClass(highlight).attr({"aria-selected":"true", "tabindex" : "0"});//.focus();
						if(fid) {
							$("#"+$.jgrid.jqID($t.p.selrow), "#"+$.jgrid.jqID(fid)).removeClass(highlight);
							$("#"+$.jgrid.jqID(selection), "#"+$.jgrid.jqID(fid)).addClass(highlight);
						}
						stat = true;
					} else {
						stat = false;
					}
					$t.p.selrow = pt.id;
					if( onsr ) { 
						$($t).triggerHandler("jqGridSelectRow", [pt.id, stat, e]);
						if( $t.p.onSelectRow) { $t.p.onSelectRow.call($t, pt.id, stat, e); }
					}
				}
			} else {
				//unselect selectall checkbox when deselecting a specific row
				$t.setHeadCheckBox( false );
				$t.p.selrow = pt.id;
				ia = $.inArray($t.p.selrow,$t.p.selarrrow);
				if (  ia === -1 ){
					if(pt.className !== "ui-subgrid") { $(pt).addClass(highlight).attr("aria-selected","true");}
					stat = true;
					$t.p.selarrrow.push($t.p.selrow);
				} else {
					if(pt.className !== "ui-subgrid") { $(pt).removeClass(highlight).attr("aria-selected","false");}
					stat = false;
					$t.p.selarrrow.splice(ia,1);
					tpsr = $t.p.selarrrow[0];
					$t.p.selrow = (tpsr === undefined) ? null : tpsr;
				}
				$("#jqg_"+$.jgrid.jqID($t.p.id)+"_"+$.jgrid.jqID(pt.id))[$t.p.useProp ? 'prop': 'attr']("checked",stat);
				if(fid) {
					if(ia === -1) {
						$("#"+$.jgrid.jqID(selection), "#"+$.jgrid.jqID(fid)).addClass(highlight);
					} else {
						$("#"+$.jgrid.jqID(selection), "#"+$.jgrid.jqID(fid)).removeClass(highlight);
					}
					$("#jqg_"+$.jgrid.jqID($t.p.id)+"_"+$.jgrid.jqID(selection), "#"+$.jgrid.jqID(fid))[$t.p.useProp ? 'prop': 'attr']("checked",stat);
				}
				if( onsr ) {
					$($t).triggerHandler("jqGridSelectRow", [pt.id, stat, e]);
					if( $t.p.onSelectRow) { $t.p.onSelectRow.call($t, pt.id , stat, e); }
				}
			}
		});
	},
	resetSelection : function( rowid ){
		return this.each(function(){
			var t = this, sr, fid,
			getstyle = $.jgrid.getMethod("getStyleUI"),
			highlight = getstyle(t.p.styleUI+'.common','highlight', true),
			hover = getstyle(t.p.styleUI+'.common','hover', true);
			if( t.p.frozenColumns === true ) {
				fid = t.p.id+"_frozen";
			}
			if(rowid !== undefined ) {
				sr = rowid === t.p.selrow ? t.p.selrow : rowid;
				$("#"+$.jgrid.jqID(t.p.id)+" tbody:first tr#"+$.jgrid.jqID(sr)).removeClass( highlight ).attr("aria-selected","false");
				if (fid) { $("#"+$.jgrid.jqID(sr), "#"+$.jgrid.jqID(fid)).removeClass( highlight ); }
				if(t.p.multiselect) {
					$("#jqg_"+$.jgrid.jqID(t.p.id)+"_"+$.jgrid.jqID(sr), "#"+$.jgrid.jqID(t.p.id))[t.p.useProp ? 'prop': 'attr']("checked",false);
					if(fid) { $("#jqg_"+$.jgrid.jqID(t.p.id)+"_"+$.jgrid.jqID(sr), "#"+$.jgrid.jqID(fid))[t.p.useProp ? 'prop': 'attr']("checked",false); }
					t.setHeadCheckBox( false);
					var ia = $.inArray($.jgrid.jqID(sr), t.p.selarrrow);
					if (  ia !== -1 ){
						t.p.selarrrow.splice(ia,1);
					}
				}
				if( t.p.onUnSelectRow) { t.p.onUnSelectRow.call(t, sr ); }
				sr = null;
			} else if(!t.p.multiselect) {
				if(t.p.selrow) {
					$("#"+$.jgrid.jqID(t.p.id)+" tbody:first tr#"+$.jgrid.jqID(t.p.selrow)).removeClass( highlight ).attr("aria-selected","false");
					if(fid) { $("#"+$.jgrid.jqID(t.p.selrow), "#"+$.jgrid.jqID(fid)).removeClass( highlight ); }
					if( t.p.onUnSelectRow) { t.p.onUnSelectRow.call(t, t.p.selrow ); }
					t.p.selrow = null;
				}
			} else {
				$(t.p.selarrrow).each(function(i,n){
					$( $(t).jqGrid('getGridRowById',n) ).removeClass( highlight ).attr("aria-selected","false");
					$("#jqg_"+$.jgrid.jqID(t.p.id)+"_"+$.jgrid.jqID(n))[t.p.useProp ? 'prop': 'attr']("checked",false);
					if(fid) { 
						$("#"+$.jgrid.jqID(n), "#"+$.jgrid.jqID(fid)).removeClass( highlight ); 
						$("#jqg_"+$.jgrid.jqID(t.p.id)+"_"+$.jgrid.jqID(n), "#"+$.jgrid.jqID(fid))[t.p.useProp ? 'prop': 'attr']("checked",false);
					}
					if( t.p.onUnSelectRow) { t.p.onUnSelectRow.call(t, n); }
				});
				t.setHeadCheckBox( false );
				t.p.selarrrow = [];
				t.p.selrow = null;
			}
			if(t.p.cellEdit === true) {
				if(parseInt(t.p.iCol,10)>=0  && parseInt(t.p.iRow,10)>=0) {
					$("td:eq("+t.p.iCol+")",t.rows[t.p.iRow]).removeClass("edit-cell " + highlight );
					$(t.rows[t.p.iRow]).removeClass("selected-row " + hover );
				}
			}
			t.p.savedRow = [];
		});
	},
	getRowData : function( rowid, usedata ) {
		var res = {}, resall, getall=false, len, j=0;
		this.each(function(){
			var $t = this,nm,ind;
			if(rowid == null) {
				getall = true;
				resall = [];
				len = $t.rows.length-1;
			} else {
				ind = $($t).jqGrid('getGridRowById', rowid);
				if(!ind) { return res; }
				len = 1;
			}
			if( !(usedata && usedata === true && $t.p.data.length > 0)  ) {
				usedata = false;
			}
			while(j<len){
				if(getall) { 
					ind = $t.rows[j+1];  // ignore first not visible row
				}
				if( $(ind).hasClass('jqgrow') ) {
					if(usedata) {
						res = $t.p.data[$t.p._index[ind.id]]; 
					} else {
						$('td[role="gridcell"]',ind).each( function(i) {
							nm = $t.p.colModel[i].name;
							if ( nm !== 'cb' && nm !== 'subgrid' && nm !== 'rn') {
								if($t.p.treeGrid===true && nm === $t.p.ExpandColumn) {
									res[nm] = $.jgrid.htmlDecode($("span:first",this).html());
								} else {
									try {
										res[nm] = $.unformat.call($t,this,{rowId:ind.id, colModel:$t.p.colModel[i]},i);
									} catch (e){
										res[nm] = $.jgrid.htmlDecode($(this).html());
									}
								}
							}
						});
					}
					if(getall) { resall.push(res); res={}; }
				}
				j++;
			}
		});
		return resall || res;
	},
	delRowData : function(rowid) {
		var success = false, rowInd, ia, nextRow;
		this.each(function() {
			var $t = this;
			rowInd = $($t).jqGrid('getGridRowById', rowid);
			if(!rowInd) {return false;}
				if($t.p.subGrid) {
					nextRow = $(rowInd).next();
					if(nextRow.hasClass('ui-subgrid')) {
						nextRow.remove();
					}
				}
				$(rowInd).remove();
				$t.p.records--;
				$t.p.reccount--;
				$t.updatepager(true,false);
				success=true;
				if($t.p.multiselect) {
					ia = $.inArray(rowid,$t.p.selarrrow);
					if(ia !== -1) { $t.p.selarrrow.splice(ia,1);}
				}
				if ($t.p.multiselect && $t.p.selarrrow.length > 0) {
					$t.p.selrow = $t.p.selarrrow[$t.p.selarrrow.length-1];
				} else {
					if( $t.p.selrow === rowid ) {
						$t.p.selrow = null;
					}
				}
			if($t.p.datatype === 'local') {
				var id = $.jgrid.stripPref($t.p.idPrefix, rowid),
				pos = $t.p._index[id];
				if(pos !== undefined) {
					$t.p.data.splice(pos,1);
					$t.refreshIndex();
				}
			}
				});
		return success;
	},
	setRowData : function(rowid, data, cssp) {
		var nm, success=true, title;
		this.each(function(){
			if(!this.grid) {return false;}
			var t = this, vl, ind, cp = typeof cssp, lcdata={};
			ind = $(this).jqGrid('getGridRowById', rowid);
			if(!ind) { return false; }
			if( data ) {
				try {
					$(this.p.colModel).each(function(i){
						nm = this.name;
						var dval =$.jgrid.getAccessor(data,nm);
						if( dval !== undefined) {
							lcdata[nm] = this.formatter && typeof this.formatter === 'string' && this.formatter === 'date' ? $.unformat.date.call(t,dval,this) : dval;
							vl = t.formatter( rowid, lcdata[nm], i, data, 'edit');
							title = this.title ? {"title":$.jgrid.stripHtml(vl)} : {};
							if(t.p.treeGrid===true && nm === t.p.ExpandColumn) {
								$("td[role='gridcell']:eq("+i+") > span:first",ind).html(vl).attr(title);
							} else {
								$("td[role='gridcell']:eq("+i+")",ind).html(vl).attr(title);
							}
						}
					});
					if(t.p.datatype === 'local') {
						var id = $.jgrid.stripPref(t.p.idPrefix, rowid),
						pos = t.p._index[id], key;
						if(t.p.treeGrid) {
							for(key in t.p.treeReader){
								if(t.p.treeReader.hasOwnProperty(key)) {
									delete lcdata[t.p.treeReader[key]];
								}
							}
						}
						if(pos !== undefined) {
							t.p.data[pos] = $.extend(true, t.p.data[pos], lcdata);
						}
						lcdata = null;
					}
				} catch (e) {
					success = false;
				}
			}
			if(success) {
				if(cp === 'string') {$(ind).addClass(cssp);} else if(cssp !== null && cp === 'object') {$(ind).css(cssp);}
				$(t).triggerHandler("jqGridAfterGridComplete");
			}
		});
		return success;
	},
	addRowData : function(rowid,rdata,pos,src) {
		if($.inArray( pos, ["first", "last", "before", "after"] ) === -1) {pos = "last";}
		var success = false, nm, row, rnc="", msc="", gi, si, ni,sind, i, v, prp="", aradd, cnm, data, cm, id;
		if(rdata) {
			if($.isArray(rdata)) {
				aradd=true;
				//pos = "last";
				cnm = rowid;
			} else {
				rdata = [rdata];
				aradd = false;
			}
			this.each(function() {
				var t = this, datalen = rdata.length;
				ni = t.p.rownumbers===true ? 1 :0;
				gi = t.p.multiselect ===true ? 1 :0;
				si = t.p.subGrid===true ? 1 :0;
				if(!aradd) {
					if(rowid !== undefined) { rowid = String(rowid);}
					else {
						rowid = $.jgrid.randId();
						if(t.p.keyName !== false) {
							cnm = t.p.keyName;
							if(rdata[0][cnm] !== undefined) { rowid = rdata[0][cnm]; }
						}
					}
				}
				var k = 0, classes = $(t).jqGrid('getStyleUI',t.p.styleUI+".base",'rowBox', true, 'jqgrow ui-row-'+ t.p.direction), lcdata = {},
				air = $.isFunction(t.p.afterInsertRow) ? true : false;
				if(ni) {
					rnc = $(t).jqGrid('getStyleUI',t.p.styleUI+".base",'rownumBox', false, 'jqgrid-rownum');
				}
				if(gi) {
					msc = $(t).jqGrid('getStyleUI',t.p.styleUI+".base",'multiBox', false, 'cbox');
				}
				while(k < datalen) {
					data = rdata[k];
					row=[];
					if(aradd) {
						try {
							rowid = data[cnm];
							if(rowid===undefined) {
								rowid = $.jgrid.randId();
							}
						}
						catch (e) {rowid = $.jgrid.randId();}
					}
					id = rowid;
					rowid  = t.p.idPrefix + rowid;
					if(ni){
						prp = t.formatCol(0,1,'',null,rowid, true);
						row[row.length] = "<td role=\"gridcell\" " + rnc +" "+prp+">0</td>";
					}
					if(gi) {
						v = "<input role=\"checkbox\" type=\"checkbox\""+" id=\"jqg_"+t.p.id+"_"+rowid+"\" "+msc+"/>";
						prp = t.formatCol(ni,1,'', null, rowid, true);
						row[row.length] = "<td role=\"gridcell\" "+prp+">"+v+"</td>";
					}
					if(si) {
						row[row.length] = $(t).jqGrid("addSubGridCell",gi+ni,1);
					}
					for(i = gi+si+ni; i < t.p.colModel.length;i++){
						cm = t.p.colModel[i];
						nm = cm.name;
						lcdata[nm] = data[nm];
						v = t.formatter( rowid, $.jgrid.getAccessor(data,nm), i, data );
						prp = t.formatCol(i,1,v, data, rowid, lcdata);
						row[row.length] = "<td role=\"gridcell\" "+prp+">"+v+"</td>";
					}
					row.unshift( t.constructTr(rowid, false, classes, lcdata, data ) );
					row[row.length] = "</tr>";
					if(t.rows.length === 0){
						$("table:first",t.grid.bDiv).append(row.join(''));
					} else {
						switch (pos) {
							case 'last':
								$(t.rows[t.rows.length-1]).after(row.join(''));
								sind = t.rows.length-1;
								break;
							case 'first':
								$(t.rows[0]).after(row.join(''));
								sind = 1;
								break;
							case 'after':
								sind = $(t).jqGrid('getGridRowById', src);
								if (sind) {
									if($(t.rows[sind.rowIndex+1]).hasClass("ui-subgrid")) { $(t.rows[sind.rowIndex+1]).after(row); }
									else { $(sind).after(row.join('')); }
									sind=sind.rowIndex + 1;
								}	
								break;
							case 'before':
								sind = $(t).jqGrid('getGridRowById', src);
								if(sind) {
									$(sind).before(row.join(''));
									sind=sind.rowIndex - 1;
								}
								break;
						}
					}
					if(t.p.subGrid===true) {
						$(t).jqGrid("addSubGrid",gi+ni, sind);
					}
					t.p.records++;
					t.p.reccount++;
					$(t).triggerHandler("jqGridAfterInsertRow", [rowid,data,data]);
					if(air) { t.p.afterInsertRow.call(t,rowid,data,data); }
					k++;
					if(t.p.datatype === 'local') {
						lcdata[t.p.localReader.id] = id;
						t.p._index[id] = t.p.data.length;
						t.p.data.push(lcdata);
						lcdata = {};
					}
				}
				t.updatepager(true,true);
				success = true;
			});
		}
		return success;
	},
	footerData : function(action,data, format) {
		var nm, success=false, res={}, title;
		function isEmpty(obj) {
			var i;
			for(i in obj) {
				if (obj.hasOwnProperty(i)) { return false; }
			}
			return true;
		}
		if(action === undefined) { action = "get"; }
		if(typeof format !== "boolean") { format  = true; }
		action = action.toLowerCase();
		this.each(function(){
			var t = this, vl;
			if(!t.grid || !t.p.footerrow) {return false;}
			if(action === "set") { if(isEmpty(data)) { return false; } }
			success=true;
			$(this.p.colModel).each(function(i){
				nm = this.name;
				if(action === "set") {
					if( data[nm] !== undefined) {
						vl = format ? t.formatter( "", data[nm], i, data, 'edit') : data[nm];
						title = this.title ? {"title":$.jgrid.stripHtml(vl)} : {};
						$("tr.footrow td:eq("+i+")",t.grid.sDiv).html(vl).attr(title);
						success = true;
					}
				} else if(action === "get") {
					res[nm] = $("tr.footrow td:eq("+i+")",t.grid.sDiv).html();
				}
			});
		});
		return action === "get" ? res : success;
	},
	showHideCol : function(colname,show) {
		return this.each(function() {
			var $t = this, fndh=false, brd=$.jgrid.cell_width ? 0: $t.p.cellLayout, cw;
			if (!$t.grid ) {return;}
			if( typeof colname === 'string') {colname=[colname];}
			show = show !== "none" ? "" : "none";
			var sw = show === "" ? true :false,
			gh = $t.p.groupHeader && ($.isArray($t.p.groupHeader) || $.isFunction($t.p.groupHeader) );
			if(gh) { $($t).jqGrid('destroyGroupHeader', false); }
			$(this.p.colModel).each(function(i) {
				if ($.inArray(this.name,colname) !== -1 && this.hidden === sw) {
					if($t.p.frozenColumns === true && this.frozen === true) {
						return true;
					}
					$("tr[role=row]",$t.grid.hDiv).each(function(){
						$(this.cells[i]).css("display", show);
					});
					$($t.rows).each(function(){
						if (!$(this).hasClass("jqgroup")) {
							$(this.cells[i]).css("display", show);
						}
					});
					if($t.p.footerrow) { $("tr.footrow td:eq("+i+")", $t.grid.sDiv).css("display", show); }
					cw =  parseInt(this.width,10);
					if(show === "none") {
						$t.p.tblwidth -= cw+brd;
					} else {
						$t.p.tblwidth += cw+brd;
					}
					this.hidden = !sw;
					fndh=true;
					$($t).triggerHandler("jqGridShowHideCol", [sw,this.name,i]);
				}
			});
			if(fndh===true) {
				if($t.p.shrinkToFit === true && !isNaN($t.p.height)) { $t.p.tblwidth += parseInt($t.p.scrollOffset,10);}
				$($t).jqGrid("setGridWidth",$t.p.shrinkToFit === true ? $t.p.tblwidth : $t.p.width );
			}
			if( gh )  {
				var gHead = $.extend([],$t.p.groupHeader);
				$t.p.groupHeader = null;
				for(var k =0; k < gHead.length; k++) {
					$($t).jqGrid('setGroupHeaders', gHead[k]);
				}
			}
		});
	},
	hideCol : function (colname) {
		return this.each(function(){$(this).jqGrid("showHideCol",colname,"none");});
	},
	showCol : function(colname) {
		return this.each(function(){$(this).jqGrid("showHideCol",colname,"");});
	},
	remapColumns : function(permutation, updateCells, keepHeader) {
		function resortArray(a) {
			var ac;
			if (a.length) {
				ac = $.makeArray(a);
			} else {
				ac = $.extend({}, a);
			}
			$.each(permutation, function(i) {
				a[i] = ac[this];
			});
		}
		var ts = this.get(0);
		function resortRows(parent, clobj) {
			$(">tr"+(clobj||""), parent).each(function() {
				var row = this;
				var elems = $.makeArray(row.cells);
				$.each(permutation, function() {
					var e = elems[this];
					if (e) {
						row.appendChild(e);
					}
				});
			});
		}
		resortArray(ts.p.colModel);
		resortArray(ts.p.colNames);
		resortArray(ts.grid.headers);
		resortRows($("thead:first", ts.grid.hDiv), keepHeader && ":not(.ui-jqgrid-labels)");
		if (updateCells) {
			resortRows($("#"+$.jgrid.jqID(ts.p.id)+" tbody:first"), ".jqgfirstrow, tr.jqgrow, tr.jqfoot");
		}
		if (ts.p.footerrow) {
			resortRows($("tbody:first", ts.grid.sDiv));
		}
		if (ts.p.remapColumns) {
			if (!ts.p.remapColumns.length){
				ts.p.remapColumns = $.makeArray(permutation);
			} else {
				resortArray(ts.p.remapColumns);
			}
		}
		ts.p.lastsort = $.inArray(ts.p.lastsort, permutation);
		if(ts.p.treeGrid) { ts.p.expColInd = $.inArray(ts.p.expColInd, permutation); }
		$(ts).triggerHandler("jqGridRemapColumns", [permutation, updateCells, keepHeader]);
	},
	setGridWidth : function(nwidth, shrink) {
		return this.each(function(){
			if (!this.grid ) {return;}
			var $t = this, cw,
			initwidth = 0, brd=$.jgrid.cell_width ? 0: $t.p.cellLayout, lvc, vc=0, hs=false, scw=$t.p.scrollOffset, aw, gw=0, cr, bstw = $t.p.styleUI === 'Bootstrap' ? 2 : 0;
			if(typeof shrink !== 'boolean') {
				shrink=$t.p.shrinkToFit;
			}
			if(isNaN(nwidth)) {return;}
			nwidth = parseInt(nwidth,10); 
			$t.grid.width = $t.p.width = nwidth;
			$("#gbox_"+$.jgrid.jqID($t.p.id)).css("width",nwidth+"px");
			$("#gview_"+$.jgrid.jqID($t.p.id)).css("width",nwidth+"px");
			$($t.grid.bDiv).css("width",(nwidth - bstw) +"px");
			$($t.grid.hDiv).css("width",(nwidth - bstw) +"px");
			if($t.p.pager ) {
				$($t.p.pager).css("width",nwidth+"px");
			}
			if($t.p.toppager ) {
				$($t.p.toppager).css("width",(nwidth - bstw)+"px");
			}
			if($t.p.toolbar[0] === true){
				$($t.grid.uDiv).css("width",(nwidth - bstw)+"px");
				if($t.p.toolbar[1]==="both") {$($t.grid.ubDiv).css("width",(nwidth - bstw)+"px");}
			}
			if($t.p.footerrow) { 
				$($t.grid.sDiv).css("width",(nwidth - bstw)+"px"); 
			}
			if(shrink ===false && $t.p.forceFit === true) {$t.p.forceFit=false;}
			if(shrink===true) {
				$.each($t.p.colModel, function() {
					if(this.hidden===false){
						cw = this.widthOrg;
						initwidth += cw+brd;
						if(this.fixed) {
							gw += cw+brd;
						} else {
							vc++;
						}
					}
				});
				if(vc  === 0) { return; }
				$t.p.tblwidth = initwidth;
				aw = nwidth-brd*vc-gw;
				if(!isNaN($t.p.height)) {
					if($($t.grid.bDiv)[0].clientHeight < $($t.grid.bDiv)[0].scrollHeight || $t.rows.length === 1){
						hs = true;
						aw -= scw;
					}
				}
				initwidth =0;
				var cle = $t.grid.cols.length >0;
				$.each($t.p.colModel, function(i) {
					if(this.hidden === false && !this.fixed){
						cw = this.widthOrg;
						cw = Math.round(aw*cw/($t.p.tblwidth-brd*vc-gw));
						if (cw < 0) { return; }
						this.width =cw;
						initwidth += cw;
						$t.grid.headers[i].width=cw;
						$t.grid.headers[i].el.style.width=cw+"px";
						if($t.p.footerrow) { $t.grid.footers[i].style.width = cw+"px"; }
						if(cle) { $t.grid.cols[i].style.width = cw+"px"; }
						lvc = i;
					}
				});

				if (!lvc) { return; }

				cr =0;
				if (hs) {
					if(nwidth-gw-(initwidth+brd*vc) !== scw){
						cr = nwidth-gw-(initwidth+brd*vc)-scw;
					}
				} else if( Math.abs(nwidth-gw-(initwidth+brd*vc)) !== 1) {
					cr = nwidth-gw-(initwidth+brd*vc);
				}
				$t.p.colModel[lvc].width += cr;
				$t.p.tblwidth = initwidth+cr+brd*vc+gw;
				if($t.p.tblwidth > nwidth) {
					var delta = $t.p.tblwidth - parseInt(nwidth,10);
					$t.p.tblwidth = nwidth;
					cw = $t.p.colModel[lvc].width = $t.p.colModel[lvc].width-delta;
				} else {
					cw= $t.p.colModel[lvc].width;
				}
				$t.grid.headers[lvc].width = cw;
				$t.grid.headers[lvc].el.style.width=cw+"px";
				if(cle) { $t.grid.cols[lvc].style.width = cw+"px"; }
				if($t.p.footerrow) {
					$t.grid.footers[lvc].style.width = cw+"px";
				}
			}
			if($t.p.tblwidth) {
				$('table:first',$t.grid.bDiv).css("width",$t.p.tblwidth+"px");
				$('table:first',$t.grid.hDiv).css("width",$t.p.tblwidth+"px");
				$t.grid.hDiv.scrollLeft = $t.grid.bDiv.scrollLeft;
				if($t.p.footerrow) {
					$('table:first',$t.grid.sDiv).css("width",$t.p.tblwidth+"px");
				}
			}
		});
	},
	setGridHeight : function (nh) {
		return this.each(function (){
			var $t = this;
			if(!$t.grid) {return;}
			var bDiv = $($t.grid.bDiv);
			bDiv.css({height: nh+(isNaN(nh)?"":"px")});
			if($t.p.frozenColumns === true){
				//follow the original set height to use 16, better scrollbar width detection
				$('#'+$.jgrid.jqID($t.p.id)+"_frozen").parent().height(bDiv.height() - 16);
			}
			$t.p.height = nh;
			if ($t.p.scroll) { $t.grid.populateVisible(); }
		});
	},
	setCaption : function (newcap){
		return this.each(function(){
			var ctop = $(this).jqGrid('getStyleUI',this.p.styleUI+".common",'cornertop', true);
			this.p.caption=newcap;
			$(".ui-jqgrid-title, .ui-jqgrid-title-rtl",this.grid.cDiv).html(newcap);
			$(this.grid.cDiv).show();
			$(this.grid.hDiv).removeClass(ctop);
		});
	},
	setLabel : function(colname, nData, prop, attrp ){
		return this.each(function(){
			var $t = this, pos=-1;
			if(!$t.grid) {return;}
			if(colname != null) {
				if(isNaN(colname)) {
					$($t.p.colModel).each(function(i){
						if (this.name === colname) {
							pos = i;return false;
						}
					});
				} else {
					pos = parseInt(colname,10);
				}
			} else { return; }
			if(pos>=0) {
				var thecol = $("tr.ui-jqgrid-labels th:eq("+pos+")",$t.grid.hDiv);
				if (nData){
					var ico = $(".s-ico",thecol);
					$("[id^=jqgh_]",thecol).empty().html(nData).append(ico);
					$t.p.colNames[pos] = nData;
				}
				if (prop) {
					if(typeof prop === 'string') {$(thecol).addClass(prop);} else {$(thecol).css(prop);}
				}
				if(typeof attrp === 'object') {$(thecol).attr(attrp);}
			}
		});
	},
	setSortIcon : function(colname, position) {
		return this.each(function(){
			var $t = this, pos=-1;
			if(!$t.grid) {return;}
			if(colname != null) {
				if(isNaN(colname)) {
					$($t.p.colModel).each(function(i){
						if (this.name === colname) {
							pos = i;return false;
						}
					});
				} else {
					pos = parseInt(colname,10);
				}
			} else { 
				return; 
			}
			if(pos>=0) {
				var thecol = $("tr.ui-jqgrid-labels th:eq("+pos+")",$t.grid.hDiv);
				if(position === 'left') {
					thecol.find(".s-ico").css("float", "left");
				} else {
					thecol.find(".s-ico").css("float", "none");
				}
			}
		});		
	},
	setCell : function(rowid,colname,nData,cssp,attrp, forceupd) {
		return this.each(function(){
			var $t = this, pos =-1,v, title;
			if(!$t.grid) {return;}
			if(isNaN(colname)) {
				$($t.p.colModel).each(function(i){
					if (this.name === colname) {
						pos = i;return false;
					}
				});
			} else {pos = parseInt(colname,10);}
			if(pos>=0) {
				var ind = $($t).jqGrid('getGridRowById', rowid); 
				if (ind){
					var tcell = $("td:eq("+pos+")",ind), cl=0, rawdat=[];
					if(nData !== "" || forceupd === true ) {
						if(ind.cells !== undefined) {
							while(cl<ind.cells.length) {
								// slow down speed
								rawdat.push(ind.cells[cl].innerHTML);
								cl++;
							}
						}
						v = $t.formatter(rowid, nData, pos, rawdat, 'edit');
						title = $t.p.colModel[pos].title ? {"title":$.jgrid.stripHtml(v)} : {};
						if($t.p.treeGrid && $(".tree-wrap",$(tcell)).length>0) {
							$("span",$(tcell)).html(v).attr(title);
						} else {
							$(tcell).html(v).attr(title);
						}
						if($t.p.datatype === "local") {
							var cm = $t.p.colModel[pos], index;
							nData = cm.formatter && typeof cm.formatter === 'string' && cm.formatter === 'date' ? $.unformat.date.call($t,nData,cm) : nData;
							index = $t.p._index[$.jgrid.stripPref($t.p.idPrefix, rowid)];
							if(index !== undefined) {
								$t.p.data[index][cm.name] = nData;
							}
						}
					}
					if(typeof cssp === 'string'){
						$(tcell).addClass(cssp);
					} else if(cssp) {
						$(tcell).css(cssp);
					}
					if(typeof attrp === 'object') {$(tcell).attr(attrp);}
				}
			}
		});
	},
	getCell : function(rowid,col) {
		var ret = false;
		this.each(function(){
			var $t=this, pos=-1, cnm, ind;
			if(!$t.grid) {return;}
			cnm = col;
			if(isNaN(col)) {
				$($t.p.colModel).each(function(i){
					if (this.name === col) {
						cnm = this.name;
						pos = i;
						return false;
					}
				});
			} else {
				pos = parseInt(col,10);
			}
			if(pos>=0) {
				ind = $($t).jqGrid('getGridRowById', rowid);
				if(ind) {
					try {
						ret = $.unformat.call($t,$("td:eq("+pos+")",ind),{rowId:ind.id, colModel:$t.p.colModel[pos]},pos);
					} catch (e){
						ret = $.jgrid.htmlDecode($("td:eq("+pos+")",ind).html());
					}
				}
				if($t.p.treeGrid && ret && $t.p.ExpandColumn === cnm) {
					ret = $( "<div>" + ret +"</div>").find("span:first").html();
				}
			}
		});
		return ret;
	},
	getCol : function (col, obj, mathopr) {
		var ret = [], val, sum=0, min, max, v;
		obj = typeof obj !== 'boolean' ? false : obj;
		if(mathopr === undefined) { mathopr = false; }
		this.each(function(){
			var $t=this, pos=-1;
			if(!$t.grid) {return;}
			if(isNaN(col)) {
				$($t.p.colModel).each(function(i){
					if (this.name === col) {
						pos = i;return false;
					}
				});
			} else {pos = parseInt(col,10);}
			if(pos>=0) {
				var ln = $t.rows.length, i =0, dlen=0;
				if (ln && ln>0){
					while(i<ln){
						if($($t.rows[i]).hasClass('jqgrow')) {
							try {
								val = $.unformat.call($t,$($t.rows[i].cells[pos]),{rowId:$t.rows[i].id, colModel:$t.p.colModel[pos]},pos);
							} catch (e) {
								val = $.jgrid.htmlDecode($t.rows[i].cells[pos].innerHTML);
							}
							if(mathopr) {
								v = parseFloat(val);
								if(!isNaN(v)) {
									sum += v;
									if (max === undefined) {max = min = v;}
									min = Math.min(min, v);
									max = Math.max(max, v);
									dlen++;
								}
							}
							else if(obj) { ret.push( {id:$t.rows[i].id,value:val} ); }
							else { ret.push( val ); }
						}
						i++;
					}
					if(mathopr) {
						switch(mathopr.toLowerCase()){
							case 'sum': ret =sum; break;
							case 'avg': ret = sum/dlen; break;
							case 'count': ret = (ln-1); break;
							case 'min': ret = min; break;
							case 'max': ret = max; break;
						}
					}
				}
			}
		});
		return ret;
	},
	clearGridData : function(clearfooter) {
		return this.each(function(){
			var $t = this;
			if(!$t.grid) {return;}
			if(typeof clearfooter !== 'boolean') { clearfooter = false; }
			if($t.p.deepempty) {$("#"+$.jgrid.jqID($t.p.id)+" tbody:first tr:gt(0)").remove();}
			else {
				var trf = $("#"+$.jgrid.jqID($t.p.id)+" tbody:first tr:first")[0];
				$("#"+$.jgrid.jqID($t.p.id)+" tbody:first").empty().append(trf);
			}
			if($t.p.footerrow && clearfooter) { $(".ui-jqgrid-ftable td",$t.grid.sDiv).html("&#160;"); }
			$t.p.selrow = null; $t.p.selarrrow= []; $t.p.savedRow = [];
			$t.p.records = 0;$t.p.page=1;$t.p.lastpage=0;$t.p.reccount=0;
			$t.p.data = []; $t.p._index = {};
			$t.updatepager(true,false);
		});
	},
	getInd : function(rowid,rc){
		var ret =false,rw;
		this.each(function(){
			rw = $(this).jqGrid('getGridRowById', rowid);
			if(rw) {
				ret = rc===true ? rw: rw.rowIndex;
			}
		});
		return ret;
	},
	bindKeys : function( settings ){
		var o = $.extend({
			onEnter: null,
			onSpace: null,
			onLeftKey: null,
			onRightKey: null,
			scrollingRows : true
		},settings || {});
		return this.each(function(){
			var $t = this;
			if( !$('body').is('[role]') ){$('body').attr('role','application');}
			$t.p.scrollrows = o.scrollingRows;
			$($t).keydown(function(event){
				var target = $($t).find('tr[tabindex=0]')[0], id, r, mind,
				expanded = $t.p.treeReader.expanded_field;
				//check for arrow keys
				if(target) {
					mind = $t.p._index[$.jgrid.stripPref($t.p.idPrefix, target.id)];
					if(event.keyCode === 37 || event.keyCode === 38 || event.keyCode === 39 || event.keyCode === 40){
						// up key
						if(event.keyCode === 38 ){
							r = target.previousSibling;
							id = "";
							if(r) {
								if($(r).is(":hidden")) {
									while(r) {
										r = r.previousSibling;
										if(!$(r).is(":hidden") && $(r).hasClass('jqgrow')) {id = r.id;break;}
									}
								} else {
									id = r.id;
								}
							}
							$($t).jqGrid('setSelection', id, true, event);
							event.preventDefault();
						}
						//if key is down arrow
						if(event.keyCode === 40){
							r = target.nextSibling;
							id ="";
							if(r) {
								if($(r).is(":hidden")) {
									while(r) {
										r = r.nextSibling;
										if(!$(r).is(":hidden") && $(r).hasClass('jqgrow') ) {id = r.id;break;}
									}
								} else {
									id = r.id;
								}
							}
							$($t).jqGrid('setSelection', id, true, event);
							event.preventDefault();
						}
						// left
						if(event.keyCode === 37 ){
							if($t.p.treeGrid && $t.p.data[mind][expanded]) {
								$(target).find("div.treeclick").trigger('click');
							}
							$($t).triggerHandler("jqGridKeyLeft", [$t.p.selrow]);
							if($.isFunction(o.onLeftKey)) {
								o.onLeftKey.call($t, $t.p.selrow);
							}
						}
						// right
						if(event.keyCode === 39 ){
							if($t.p.treeGrid && !$t.p.data[mind][expanded]) {
								$(target).find("div.treeclick").trigger('click');
							}
							$($t).triggerHandler("jqGridKeyRight", [$t.p.selrow]);
							if($.isFunction(o.onRightKey)) {
								o.onRightKey.call($t, $t.p.selrow);
							}
						}
					}
					//check if enter was pressed on a grid or treegrid node
					else if( event.keyCode === 13 ){
						$($t).triggerHandler("jqGridKeyEnter", [$t.p.selrow]);
						if($.isFunction(o.onEnter)) {
							o.onEnter.call($t, $t.p.selrow);
						}
					} else if(event.keyCode === 32) {
						$($t).triggerHandler("jqGridKeySpace", [$t.p.selrow]);
						if($.isFunction(o.onSpace)) {
							o.onSpace.call($t, $t.p.selrow);
						}
					}
				}
			});
		});
	},
	unbindKeys : function(){
		return this.each(function(){
			$(this).off('keydown');
		});
	},
	getLocalRow : function (rowid) {
		var ret = false, ind;
		this.each(function(){
			if(rowid !== undefined) {
				ind = this.p._index[$.jgrid.stripPref(this.p.idPrefix, rowid)];
				if(ind >= 0 ) {
					ret = this.p.data[ind];
				}
			}
		});
		return ret;
	},
	progressBar : function ( p ) {
		p = $.extend({
			htmlcontent : "",
			method : "hide",
			loadtype : "disable" 
		}, p || {});
		return this.each(function(){
			var sh = p.method==="show" ? true : false,
			loadDiv = $("#load_"+$.jgrid.jqID(this.p.id)), 
			offsetParent, top, 
			scrollTop = $(window).scrollTop();
			if(p.htmlcontent !== "") {
				loadDiv.html( p.htmlcontent );
			}
			switch(p.loadtype) {
				case "disable":
					break;
				case "enable":
					loadDiv.toggle( sh );
					break;
				case "block":
					$("#lui_"+$.jgrid.jqID(this.p.id)).toggle( sh );
					loadDiv.toggle( sh );
					break;
			}
			if (loadDiv.is(':visible')) {
				offsetParent = loadDiv.offsetParent();
				loadDiv.css('top', '');
				if (loadDiv.offset().top < scrollTop) {
					top = Math.min(
						10 + scrollTop - offsetParent.offset().top,
						offsetParent.height() - loadDiv.height()
					);
					loadDiv.css('top', top + 'px');
				}
			}
		});
	},
	getColProp : function(colname){
		var ret ={}, $t = this[0];
		if ( !$t.grid ) { return false; }
		var cM = $t.p.colModel, i;
		for ( i=0;i<cM.length;i++ ) {
			if ( cM[i].name === colname ) {
				ret = cM[i];
				break;
			}
		}
		return ret;
	},
	setColProp : function(colname, obj){
		//do not set width will not work
		return this.each(function(){
			if ( this.grid ) {
				if ( $.isPlainObject( obj ) ) {
					var cM = this.p.colModel, i;
					for ( i=0;i<cM.length;i++ ) {
						if ( cM[i].name === colname ) {
							$.extend(true, this.p.colModel[i],obj);
							break;
						}
					}
				}
			}
		});
	},
	sortGrid : function(colname,reload, sor){
		return this.each(function(){
			var $t=this,idx=-1,i, sobj=false;
			if ( !$t.grid ) { return;}
			if ( !colname ) { colname = $t.p.sortname; }
			for ( i=0;i<$t.p.colModel.length;i++ ) {
				if ( $t.p.colModel[i].index === colname || $t.p.colModel[i].name === colname ) {
					idx = i;
					if($t.p.frozenColumns === true && $t.p.colModel[i].frozen === true) {
						sobj = $t.grid.fhDiv.find("#" + $t.p.id + "_" + colname);
					}
					break;
				}
			}
			if ( idx !== -1 ){
				var sort = $t.p.colModel[idx].sortable;
				if(!sobj) {
					sobj = $t.grid.headers[idx].el;
				}
				if ( typeof sort !== 'boolean' ) { sort =  true; }
				if ( typeof reload !=='boolean' ) { reload = false; }
				if ( sort ) { $t.sortData("jqgh_"+$t.p.id+"_" + colname, idx, reload, sor, sobj); }
			}
		});
	},
	setGridState : function(state) {
		return this.each(function(){
			if ( !this.grid ) {return;}
			var $t = this,
			open = $(this).jqGrid('getStyleUI',this.p.styleUI+".base",'icon_caption_open', true),
			close = $(this).jqGrid('getStyleUI',this.p.styleUI+".base",'icon_caption_close', true);

			if(state === 'hidden'){
				$(".ui-jqgrid-bdiv, .ui-jqgrid-hdiv","#gview_"+$.jgrid.jqID($t.p.id)).slideUp("fast");
				if($t.p.pager) {$($t.p.pager).slideUp("fast");}
				if($t.p.toppager) {$($t.p.toppager).slideUp("fast");}
				if($t.p.toolbar[0]===true) {
					if( $t.p.toolbar[1] === 'both') {
						$($t.grid.ubDiv).slideUp("fast");
					}
					$($t.grid.uDiv).slideUp("fast");
				}
				if($t.p.footerrow) { $(".ui-jqgrid-sdiv","#gbox_"+$.jgrid.jqID($t.p.id)).slideUp("fast"); }
				$(".ui-jqgrid-headlink",$t.grid.cDiv).removeClass( open ).addClass( close );
				$t.p.gridstate = 'hidden';
			} else if(state === 'visible') {
				$(".ui-jqgrid-hdiv, .ui-jqgrid-bdiv","#gview_"+$.jgrid.jqID($t.p.id)).slideDown("fast");
				if($t.p.pager) {$($t.p.pager).slideDown("fast");}
				if($t.p.toppager) {$($t.p.toppager).slideDown("fast");}
				if($t.p.toolbar[0]===true) {
					if( $t.p.toolbar[1] === 'both') {
						$($t.grid.ubDiv).slideDown("fast");
					}
					$($t.grid.uDiv).slideDown("fast");
				}
				if($t.p.footerrow) { $(".ui-jqgrid-sdiv","#gbox_"+$.jgrid.jqID($t.p.id)).slideDown("fast"); }
				$(".ui-jqgrid-headlink",$t.grid.cDiv).removeClass( close ).addClass( open );
				$t.p.gridstate = 'visible';
			}

		});
	},
	setFrozenColumns : function () {
		return this.each(function() {
			if ( !this.grid ) {return;}
			var $t = this, cm = $t.p.colModel,i=0, len = cm.length, maxfrozen = -1, frozen= false,
			hd= $($t).jqGrid('getStyleUI',$t.p.styleUI+".base",'headerDiv', true, 'ui-jqgrid-hdiv'),
			hover = $($t).jqGrid('getStyleUI',$t.p.styleUI+".common",'hover', true),
			borderbox = $("#gbox_"+$.jgrid.jqID($t.p.id)).css("box-sizing") === 'border-box',
			pixelfix = borderbox ? 1 : 0;

			// TODO treeGrid and grouping  Support
			if($t.p.subGrid === true ||
				$t.p.treeGrid === true ||
				$t.p.cellEdit === true ||
				$t.p.sortable ||
				$t.p.scroll ||
				$t.p.grouping === true)
			{
				return;
			}
			
			// get the max index of frozen col
			while(i<len)
			{
				// from left, no breaking frozen
				if(cm[i].frozen === true)
				{
					frozen = true;
					maxfrozen = i;
				} else {
					break;
				}
				i++;
			}
			if( maxfrozen>=0 && frozen) {
				var top = $t.p.caption ? $($t.grid.cDiv).outerHeight() : 0,
				hth = parseInt( $(".ui-jqgrid-htable","#gview_"+$.jgrid.jqID($t.p.id)).height(), 10),
				divhth = parseInt( $(".ui-jqgrid-hdiv","#gview_"+$.jgrid.jqID($t.p.id)).height(), 10);
				//headers
				if($t.p.toppager) {
					top = top + $($t.grid.topDiv).outerHeight();
				}
				if($t.p.toolbar[0] === true) {
					if($t.p.toolbar[1] !== "bottom") {
						top = top + $($t.grid.uDiv).outerHeight();
					}
				}
				$t.grid.fhDiv = $('<div style="position:absolute;' + ($t.p.direction === "rtl" ? 'right:0;' : 'left:0;') + 'top:'+top+'px;height:'+(divhth - pixelfix)+'px;" class="frozen-div ' + hd +'"></div>');
				$t.grid.fbDiv = $('<div style="position:absolute;' + ($t.p.direction === "rtl" ? 'right:0;' : 'left:0;') + 'top:'+(parseInt(top,10)+parseInt(divhth,10) + 1 - pixelfix)+'px;overflow-y:hidden" class="frozen-bdiv ui-jqgrid-bdiv"></div>');
				$("#gview_"+$.jgrid.jqID($t.p.id)).append($t.grid.fhDiv);
				var htbl = $(".ui-jqgrid-htable","#gview_"+$.jgrid.jqID($t.p.id)).clone(true);
				// groupheader support - only if useColSpanstyle is false
				if($t.p.groupHeader) {
					$("tr.jqg-first-row-header, tr.jqg-third-row-header", htbl).each(function(){
						$("th:gt("+maxfrozen+")",this).remove();
					});
					var swapfroz = -1, fdel = -1, cs, rs;
					$("tr.jqg-second-row-header th", htbl).each(function(){
						cs= parseInt($(this).attr("colspan"),10);
						rs= parseInt($(this).attr("rowspan"),10);
						if(rs) {
							swapfroz++;
							fdel++;
						}
						if(cs) {
							swapfroz = swapfroz+cs;
							fdel++;
						}
						if(swapfroz === maxfrozen) {
							fdel = maxfrozen;
							return false;
						}
					});
					if(swapfroz !== maxfrozen) {
						fdel = maxfrozen;
					}
					$("tr.jqg-second-row-header", htbl).each(function(){
						$("th:gt("+fdel+")",this).remove();
					});
				} else {
					var maxdh=[];
					$(".ui-jqgrid-htable tr","#gview_"+$.jgrid.jqID($t.p.id)).each(function(i,n){
						maxdh.push(parseInt($(this).height(),10));
					});
					$("tr",htbl).each(function(){
						$("th:gt("+maxfrozen+")",this).remove();
					});
					$("tr",htbl).each(function(i){
						$(this).height(maxdh[i]);
					});
				}
				$(htbl).width(1);
				if(!$.jgrid.msie()) {
					$(htbl).css("height","100%");
				}
				// resizing stuff
				$($t.grid.fhDiv).append(htbl)
				.mousemove(function (e) {
					if($t.grid.resizing){ $t.grid.dragMove(e);return false; }
				});
				if($t.p.footerrow) {
					var hbd = $(".ui-jqgrid-bdiv","#gview_"+$.jgrid.jqID($t.p.id)).height();

					$t.grid.fsDiv = $('<div style="position:absolute;left:0px;top:'+(parseInt(top,10)+parseInt(hth,10) + parseInt(hbd,10) + 1 - pixelfix)+'px;" class="frozen-sdiv ui-jqgrid-sdiv"></div>');
					$("#gview_"+$.jgrid.jqID($t.p.id)).append($t.grid.fsDiv);
					var ftbl = $(".ui-jqgrid-ftable","#gview_"+$.jgrid.jqID($t.p.id)).clone(true);
					$("tr",ftbl).each(function(){
						$("td:gt("+maxfrozen+")",this).remove();
					});
					$(ftbl).width(1);
					$($t.grid.fsDiv).append(ftbl);
				}
				$($t).on('jqGridResizeStop.setFrozenColumns', function (e, w, index) {
					var boxwidth = borderbox ? 'outerWidth' : 'width',
						rhth = $(".ui-jqgrid-htable",$t.grid.fhDiv),
						btd = $(".ui-jqgrid-btable",$t.grid.fbDiv);
						
					$("th:eq("+index+")", rhth)[boxwidth]( w ); 
					$("tr:first td:eq("+index+")", btd)[boxwidth]( w );
					if($t.p.footerrow) {
						var ftd = $(".ui-jqgrid-ftable",$t.grid.fsDiv);
						$("tr:first td:eq("+index+")", ftd)[boxwidth]( w );
					}
				});
				
				// data stuff
				//TODO support for setRowData
				$("#gview_"+$.jgrid.jqID($t.p.id)).append($t.grid.fbDiv);
				
				$($t.grid.fbDiv).on('mousewheel DOMMouseScroll', function (e) {
					var st = $($t.grid.bDiv).scrollTop();
					if (e.originalEvent.wheelDelta > 0 || e.originalEvent.detail < 0) {
						//up
						$($t.grid.bDiv).scrollTop( st - 25 );
					} else {
						//down
						$($t.grid.bDiv).scrollTop( st + 25 );
					}
					e.preventDefault();
				});
				
				if($t.p.hoverrows === true) {
					$("#"+$.jgrid.jqID($t.p.id)).off('mouseover mouseout');
				}
				$($t).on('jqGridAfterGridComplete.setFrozenColumns', function () {
					$("#"+$.jgrid.jqID($t.p.id)+"_frozen").remove();
					$($t.grid.fbDiv).height($($t.grid.bDiv).height() - 17);
					// find max height
					var mh = [];
					$("#"+$.jgrid.jqID($t.p.id) + " tr[role=row].jqgrow").each(function(){
						mh.push( $(this).outerHeight() );
					});

					var btbl = $("#"+$.jgrid.jqID($t.p.id)).clone(true);
					$("tr[role=row]",btbl).each(function(){
						$("td[role=gridcell]:gt("+maxfrozen+")",this).remove();
					});

					$(btbl).width(1).attr("id",$t.p.id+"_frozen");
					$($t.grid.fbDiv).append(btbl);
					// set the height
					$("tr[role=row].jqgrow",btbl).each(function(i, n){
						$(this).height( mh[i] );
					});

					if($t.p.hoverrows === true) {
						$("tr.jqgrow", btbl).hover(
							function(){ $(this).addClass( hover ); $("#"+$.jgrid.jqID(this.id), "#"+$.jgrid.jqID($t.p.id)).addClass( hover ); },
							function(){ $(this).removeClass( hover ); $("#"+$.jgrid.jqID(this.id), "#"+$.jgrid.jqID($t.p.id)).removeClass( hover ); }
						);
						$("tr.jqgrow", "#"+$.jgrid.jqID($t.p.id)).hover(
							function(){ $(this).addClass( hover ); $("#"+$.jgrid.jqID(this.id), "#"+$.jgrid.jqID($t.p.id)+"_frozen").addClass( hover );},
							function(){ $(this).removeClass( hover ); $("#"+$.jgrid.jqID(this.id), "#"+$.jgrid.jqID($t.p.id)+"_frozen").removeClass( hover ); }
						);
					}
					btbl=null;
				});
				if(!$t.grid.hDiv.loading) {
					$($t).triggerHandler("jqGridAfterGridComplete");
				}
				$t.p.frozenColumns = true;
			}
		});
	},
	destroyFrozenColumns :  function() {
		return this.each(function() {
			if ( !this.grid ) {return;}
			if(this.p.frozenColumns === true) {
				var $t = this,
				hover = $($t).jqGrid('getStyleUI',$t.p.styleUI+".common",'hover', true);
				$($t.grid.fhDiv).remove();
				$($t.grid.fbDiv).remove();
				$t.grid.fhDiv = null; $t.grid.fbDiv=null;
				if($t.p.footerrow) {
					$($t.grid.fsDiv).remove();
					$t.grid.fsDiv = null;
				}
				$(this).off('.setFrozenColumns');
				if($t.p.hoverrows === true) {
					var ptr;
					$("#"+$.jgrid.jqID($t.p.id)).on({
						'mouseover': function(e) {
							ptr = $(e.target).closest("tr.jqgrow");
							if($(ptr).attr("class") !== "ui-subgrid") {
								$(ptr).addClass( hover );
							}
						},
						'mouseout' : function(e) {
							ptr = $(e.target).closest("tr.jqgrow");
							$(ptr).removeClass( hover );
						}
					});
				}
				this.p.frozenColumns = false;
			}
		});
	},
	resizeColumn : function (iCol, newWidth, forceresize) {
		return this.each(function(){
			var grid = this.grid, p = this.p, cm = p.colModel, i, cmLen = cm.length, diff, diffnv;
			if(typeof iCol === "string" ) {
				for(i = 0; i < cmLen; i++) {
					if(cm[i].name === iCol) {
						iCol = i;
						break;
					}
				}
			} else {
				iCol = parseInt( iCol, 10 );
			}
			if(forceresize === undefined) {
				forceresize = false;
			}
			if( !cm[iCol].resizable && !forceresize ) {
				return;
			}
			newWidth = parseInt( newWidth, 10);
			// filters
			if(typeof iCol !== "number" || iCol < 0 || iCol > cm.length-1 || typeof newWidth !== "number" ) { 
				return; 
			}
			
			if( newWidth < p.minColWidth ) { return; }
			
			if( p.forceFit ) {
				p.nv = 0;
				for (i = iCol+1; i < cmLen; i++){
					if(cm[i].hidden !== true ) {
						p.nv = i - iCol; 
						break;
					}
				}
			}
			// use resize stuff
			grid.resizing = {idx : iCol };
			diff = newWidth - grid.headers[iCol].width;
			if(p.forceFit) {
				diffnv = grid.headers[ iCol + p.nv].width - diff;
				if(diffnv < p.minColWidth) { return; }
				grid.headers[ iCol + p.nv].newWidth = grid.headers[ iCol + p.nv].width - diff;
			} 
			grid.newWidth = p.tblwidth + diff;
			grid.headers[ iCol ].newWidth = newWidth;
			grid.dragEnd( false );
		});
	},
	getStyleUI : function( styleui, classui, notclasstag, gridclass) {
		var ret = "", q = "";
		try {
			var stylemod = styleui.split(".");
			if(!notclasstag) {
				ret = "class=";
				q = "\"";
			}
			if(gridclass == null) {
				gridclass = "";
			}
			switch(stylemod.length) {
				case 1 :
					ret += q + $.trim(gridclass + " " + $.jgrid.styleUI[stylemod[0]][classui] + q);
					break;
				case 2 :
					ret += q + $.trim(gridclass + " " + $.jgrid.styleUI[stylemod[0]][stylemod[1]][classui] + q);
			}
		} catch (cls) {
			ret = "";
		}
		return ret;
	},
	resizeGrid : function (timeout) {
		return this.each(function(){
			var $t = this;
			if(timeout === undefined) {
				timeout = 500;
			}
			setTimeout(function(){
				try {
					var winwidth = $(window).width(),
					parentwidth = $("#gbox_"+$.jgrid.jqID($t.p.id)).parent().width(),
					ww = $t.p.width;
					if( (winwidth-parentwidth) > 3 ) {
						ww = parentwidth;
					} else {
						ww = winwidth;
					}
					$("#"+$.jgrid.jqID($t.p.id)).jqGrid('setGridWidth', ww);
				} catch(e){}
			}, timeout);
		});
	}
});
//module end
}));
