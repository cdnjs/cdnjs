/* 
 * ajaxify.js 
 * Ajaxify - The Ajax Plugin
 * https://4nf.org/ 
 * 
 * Copyright Arvind Gupta; MIT Licensed 
 */ 
 
/* INTERFACE: See also https://4nf.org/interface/

Simplest plugin call:

let ajaxify = new Ajaxify({options});
Ajaxifies the whole site, dynamically replacing the elements specified in "elements" across pages

*/

// The main plugin - Ajaxify
// Is passed the global options 
// Checks for necessary pre-conditions - otherwise gracefully degrades
// Initialises sub-plugins
// Calls Pronto
class Ajaxify { constructor(options) {
String.prototype.iO = function(s) { return this.toString().indexOf(s) + 1; }; //Intuitively better understandable shorthand for String.indexOf() - String.iO()
let $ = this;

//Options default values
$.s = {
//	basic config parameters
	elements: "body", //selector for element IDs that are going to be swapped (e.g. "#el1, #el2, #el3")
	selector : "a:not(.no-ajaxy)", //selector for links to trigger swapping - not elements to be swapped - i.e. a selection of links
	forms : "form:not(.no-ajaxy)", // selector for ajaxifying forms - set to "false" to disable
	canonical : false, // Fetch current URL from "canonical" link if given, updating the History API.  In case of a re-direct...
	refresh : false, // Refresh the page even if link clicked is current page
 
// visual effects settings
	requestDelay : 0, //in msec - Delay of Pronto request
	scrolltop : "s", // Smart scroll, true = always scroll to top of page, false = no scroll
	bodyClasses : false, // Copy body classes from target page, set to "true" to enable
 
// script and style handling settings, prefetch
	deltas : true, // true = deltas loaded, false = all scripts loaded
	asyncdef : true, // default async value for dynamically inserted external scripts, false = synchronous / true = asynchronous
	alwayshints : false, // strings, - separated by ", " - if matched in any external script URL - these are always loaded on every page load
	inline : true, // true = all inline scripts loaded, false = only specific inline scripts are loaded
	inlinesync : true, // synchronise inline scripts loading by adding a central tiny delay to all of them
	inlinehints : false, // strings - separated by ", " - if matched in any inline scripts - only these are executed - set "inline" to false beforehand
	inlineskip : "adsbygoogle", // strings - separated by ", " - if matched in any inline scripts - these are NOT are executed - set "inline" to true beforehand 
	inlineappend : true, // append scripts to the main content element, instead of "eval"-ing them
	style : true, // true = all style tags in the head loaded, false = style tags on target page ignored
	prefetchoff : false, // Plugin pre-fetches pages on hoverIntent - true = set off completely // strings - separated by ", " - hints to select out
 
// debugging & advanced settings
	verbosity : 0, //Debugging level to console: default off.	Can be set to 10 and higher (in case of logging enabled)
	memoryoff : false, // strings - separated by ", " - if matched in any URLs - only these are NOT executed - set to "true" to disable memory completely
	cb : 0, // callback handler on completion of each Ajax request - default 0
	pluginon : true, // Plugin set "on" or "off" (==false) manually
	passCount: false // Show number of pass for debugging
};


$.pass = 0; $.currentURL = "";
$.parse = (s, pl) => (pl = document.createElement('div'), pl.insertAdjacentHTML('afterbegin', s), pl.firstElementChild); // HTML parser
$.trigger = (t, e) => { let ev = document.createEvent('HTMLEvents'); ev.initEvent("pronto." + t, true, false); ev.data = e ? e : $.Rq("e"); window.dispatchEvent(ev); }
$.internal = (url) => { if (!url) return false; if (typeof(url) === "object") url = url.href; if (url==="") return true; return url.substring(0,rootUrl.length) === rootUrl || !url.iO(":"); }

//Module global variables
let rootUrl = location.origin, api = window.history && window.history.pushState && window.history.replaceState,

//Regexes for escaping fetched HTML of a whole page - best of Baluptons Ajaxify
//Makes it possible to pre-fetch an entire page
docType = /<\!DOCTYPE[^>]*>/i,
tagso = /<(html|head|link)([\s\>])/gi,
tagsod = /<(body)([\s\>])/gi,
tagsc = /<\/(html|head|body|link)\>/gi,

//Helper strings
div12 = '<div class="ajy-$1"$2',
divid12 = '<div id="ajy-$1"$2',
linki = '<link rel="stylesheet" type="text/css" href="*" />',
linkr = 'link[href*="!"]', 
scrr = 'script[src*="!"]',
inlineclass = "ajy-inline";

//Global helpers
let doc=document, bdy,
    qa=(s,o=doc)=>o.querySelectorAll(s),
    qs=(s,o=doc)=>o.querySelector(s);

function _copyAttributes(el, $S, flush) { //copy all attributes of element generically
	if (flush) [...el.attributes].forEach(e => el.removeAttribute(e.name)); //delete all old attributes
	[...$S.attributes].forEach(e => el.setAttribute(e.nodeName, e.nodeValue)); //low-level insertion
}

function _on(eventName, elementSelector, handler, el = document) { //e.currentTarget is document when the handler is called
	el.addEventListener(eventName, function(e) {
		// loop parent nodes from the target to the delegation node
		for (var target = e.target; target && target != this; target = target.parentNode) {
			if (target.matches(elementSelector)) {
				handler(target, e);
				break;
			}
		}
	}, !!eventName.iO('mo'));
}

function Hints(hints) {
    if (!(this instanceof Hints)) return new Hints(hints); //automatically create an instance
    this.myHints = (typeof hints === 'string' && hints.length > 0) ? hints.split(", ") : false; //hints are passed as a comma separated string 
}
Hints.prototype.find = function (t) {return (!t || !this.myHints) ? false : this.myHints.some(h => t.iO(h))}; //iterate through hints within passed text (t)

function lg(m){ $.s.verbosity && console && console.log(m); }

// The stateful Cache class
// Usage - parameter "o" values: 
// none - returns currently cached page
// <URL> - returns page with specified URL
// <object> - saves the page in cache
// f - flushes the cache
class Cache { constructor() {
	let d = false;
            
	this.a = function (o) {
		if (!o) return d; 
	
		if (typeof o === "string") { //URL or "f" passed
			if(o === "f") { //"f" passed -> flush
				$.pages("f"); //delegate flush to $.pages
				lg("Cache flushed");
			} else d = $.pages($.memory(o)); //URL passed -> look up page in memory

			return d; //return cached page
		}

		if (typeof o === "object") { 
			d = o; 
			return d; 
		}
	};          
 }}

// The stateful Memory class
// Usage: $.memory(<URL>) - returns the same URL if not turned off internally
class Memory { constructor(options) {

	this.a = function (h) {
		if (!h || $.s.memoryoff === true) return false; 
		if ($.s.memoryoff === false) return h; 
		return Hints($.s.memoryoff).find(h) ? false : h; 
	};           
}}

// The stateful Pages class
// Usage - parameter "h" values:
// <URL> - returns page with specified URL from internal array
// <object> - saves the passed page in internal array
// false - returns false
class Pages { constructor() {
	let d = [], i = -1;
            
    this.a = function (h) {
		if (typeof h === "string") { 
			if(h === "f") d = []; 
			else if((i=_iPage(h)) !== -1) return d[i][1]; 
		}

		if (typeof h === "object") { 
			if((i=_iPage(h)) === -1) d.push(h); 
			else d[i] = h; 
		}

		if (typeof h === "boolean") return false; 
	};
		
	let _iPage = h => d.findIndex(e => e[0] == h)
}}

// The GetPage class
// First parameter (o) is a switch: 
// empty - returns cache
// <URL> - loads HTML via Ajax, second parameter "p" must be callback
// + - pre-fetches page, second parameter "p" must be URL, third parameter "p2" must be callback 
// - - loads page into DOM and handle scripts, second parameter "p" must hold selection to load
// x - returns response
// otherwise - returns selection of current page to client

class GetPage { constructor() {
	let rsp = 0, cb = 0, plus = 0, rt = "", ct = 0, rc = 0, ac = 0;
            
	this.a = function (o, p, p2) { 
		if (!o) return $.cache(); 

		if (o.iO("/")) { 
			cb = p; 
			if(plus == o) return; 
			return _lPage(o); 
		}

		if (o === "+")	{ 
			plus = p; 
			cb = p2; 
			return _lPage(p, true); 
		}

		if (o === "a") { if (rc > 0) {_cl(); ac.abort();} return; }
		if (o === "s") return ((rc) ? 1 : 0) + rt; 
		if (o === "-") return _lSel(p); 
		if (o === "x") return rsp; 

		if (!$.cache()) return;
		if (o === "body") return qs("#ajy-" + o, $.cache());
		if (o === "script") return qa(o, $.cache()); 

		return qs((o === "title") ?	o : ".ajy-" + o, $.cache()); 
};
let _lSel = $t => (
	$.pass++, 
	_lEls($t), 
	qa("body > script").forEach(e => (e.classList.contains(inlineclass)) ? e.parentNode.removeChild(e) : false), 
	$.scripts(true), 
	$.scripts("s"), 
	$.scripts("c") 
),
	_lPage = (h, pre) => { 
		if (h.iO("#")) h = h.split("#")[0]; 
		if ($.Rq("is") || !$.cache(h)) return _lAjax(h, pre); 

		plus = 0; 
		if (cb) return cb(); 
	},
	_ld = ($t, $h) => {
		if(!$h) { 
			lg("Inserting placeholder for ID: " + $t.getAttribute("id"));
			var tagN = $t.tagName.toLowerCase();
			$t.parentNode.replaceChild($.parse("<" + tagN + " id='" + $t.getAttribute("id") + "'></" + tagN + ">"), $t);
			return; 
		}

		var $c = $h.cloneNode(true); // clone element node (true = deep clone)
		qa("script", $c).forEach(e => e.parentNode.removeChild(e));
		_copyAttributes($t, $c, true); 
		$t.innerHTML = $c.innerHTML;
	},
	_lEls = $t => 
		$.cache() && !_isBody($t) && $t.forEach(function($el) { 
			_ld($el, qs("#" + $el.getAttribute("id"), $.cache()));
		}),
	_isBody = $t => $t[0].tagName.toLowerCase() == "body" && (_ld(bdy, qs("#ajy-body", $.cache())), 1),
	_lAjax = (hin, pre) => { 
		var ispost = $.Rq("is"); 
		if (pre) rt="p"; else rt="c"; 

		ac = new AbortController(); // set abort controller
		rc++; // set active request counter
		fetch(hin, {
			method: ((ispost) ? "POST" : "GET"),
			cache: "default",
			mode: "same-origin",
			headers: {"X-Requested-With": "XMLHttpRequest"},
			body: (ispost) ? $.Rq("d") : null,
			signal: ac.signal
		}).then(r => {
			if (!r.ok || !_isHtml(r)) {
				if (!pre) {location.href = hin; _cl(); $.pronto(0, $.currentURL);}
				return;
			}
			rsp = r; // store response
			return r.text();
		}).then(r => {
			_cl(1); // clear only plus variable
			if (!r) return; // ensure data
			rsp.responseText = r; // store response text
			
			return _cache(hin, r);
		}).catch(err => {
			if(err.name === "AbortError") return;
			try {
				$.trigger("error", err); 
				lg("Response text : " + err.message); 
				return _cache(hin, err.message, err);
			} catch (e) {}
		}).finally(() => rc--); // reset active request counter
	},
	_cl = c => (plus = 0, (!c) ? cb = 0 : 0), // clear plus AND/OR callback
	_cache = (href, h, err) => $.cache($.parse(_parseHTML(h))) && ($.pages([href, $.cache()]), 1) && cb && cb(err),
	_isHtml = x => (ct = x.headers.get("content-type")) && (ct.iO("html") || ct.iO("form-")),
	_parseHTML = h => document.createElement("html").innerHTML = _replD(h).trim(),
	_replD = h => String(h).replace(docType, "").replace(tagso, div12).replace(tagsod, divid12).replace(tagsc, "</div>")
}}

// The stateful Scripts plugin
// First parameter "o" is switch:
// i - initailise options
// c - fetch canonical URL
// <object> - handle one inline script
// otherwise - delta loading
class Scripts { constructor() {
	let $s = false, txt = 0;
	
    this.a = function (o) {
		if (o === "i") { 
			if(!$s) $s = {}; 
			return true;
		}

		if (o === "s") return _allstyle($s.y); 

		if (o === "1") { 
			$.detScripts($s); 
			return _addScripts($s); 
		}

		if (o === "c") return $.s.canonical && $s.can ? $s.can.getAttribute("href") : false;
		if (o === "d") return $.detScripts($s);
		if (o && typeof o == "object") return _onetxt(o);

		if ($.scripts("d")) return;
		_addScripts($s);
};
let _allstyle = $s =>	 
	!$.s.style || !$s || (
	qa("style", qs("head")).forEach(e => e.parentNode.removeChild(e)),
	$s.forEach(el => _addstyle(el.textContent))
	),
	_onetxt = $s => 
		(!(txt = $s.textContent).iO(").ajaxify(") && (!txt.iO("new Ajaxify(")) && 
			(($.s.inline && !Hints($.s.inlineskip).find(txt)) || $s.classList.contains("ajaxy") || 
			Hints($.s.inlinehints).find(txt))
		) && _addtxt($s),
	_addtxt = $s => { 
		if(!txt || !txt.length) return; 
		if($.s.inlineappend || ($s.getAttribute("type") && !$s.getAttribute("type").iO("text/javascript"))) try { return _apptxt($s); } catch (e) { }

		try { eval(txt); } catch (e1) { 
			lg("Error in inline script : " + txt + "\nError code : " + e1);
		}
	},
	_apptxt = $s => { let sc = document.createElement("script"); _copyAttributes(sc, $s); sc.classList.add(inlineclass);
		try {sc.appendChild(document.createTextNode($s.textContent))} catch(e) {sc.text = $s.textContent};
		return qs("body").appendChild(sc);
	},
	_addstyle = t => qs("head").appendChild($.parse('<style>' + t + '</style>')),
	_addScripts = $s => ( $.addAll($s.c, "href"), $.s.inlinesync ? setTimeout(() => $.addAll($s.j, "src")) : $.addAll($s.j, "src"))
}}

// The DetScripts plugin - stands for "detach scripts"
// Works on "$s" <object> that is passed in and fills it
// Fetches all stylesheets in the head
// Fetches the canonical URL
// Fetches all external scripts on the page
// Fetches all inline scripts on the page
class DetScripts { constructor() {
	let head = 0, lk = 0, j = 0;
            
	this.a = function ($s) {
		head = $.pass ? $.fn("head") : qs("head"); //If "pass" is 0 -> fetch head from DOM, otherwise from target page
		if (!head) return true;
		lk = qa($.pass ? ".ajy-link" : "link", head); //If "pass" is 0 -> fetch links from DOM, otherwise from target page
		j = $.pass ? $.fn("script") : qa("script"); //If "pass" is 0 -> fetch JSs from DOM, otherwise from target page
		$s.c = _rel(lk, "stylesheet"); //Extract stylesheets
		$s.y = qa("style", head); //Extract style tags
		$s.can = _rel(lk, "canonical"); //Extract canonical tag
		$s.j = j; //Assign JSs to internal selection
	};
let _rel = (lk, v) => Array.prototype.filter.call(lk, e => e.getAttribute("rel").iO(v));
}}

// The AddAll plugin
// Works on a new selection of scripts to apply delta-loading to it 
// pk parameter:
// href - operate on stylesheets in the new selection
// src - operate on JS scripts
class AddAll { constructor() {
	let $scriptsO = [], $sCssO = [], $sO = [], PK = 0, url = 0;

	this.a = function ($this, pk) {
		if(!$this.length) return; //ensure input
		if($.s.deltas === "n") return true; //Delta-loading completely disabled

		PK = pk; //Copy "primary key" into internal variable

		if(!$.s.deltas) return _allScripts($this); //process all scripts
		//deltas presumed to be "true" -> proceed with normal delta-loading

		$scriptsO = PK == "href" ? $sCssO : $sO; //Copy old.  Stylesheets or JS

		if(!$.pass) _newArray($this); //Fill new array on initial load, nothing more
		else $this.forEach(function(s) { //Iterate through selection
			var $t = s;
			url = $t.getAttribute(PK);
			if(_classAlways($t)) { //Class always handling
				_removeScript(); //remove from DOM
				_iScript($t); //insert back single external script in the head
				return;
			}
			if(url) { //URL?
				if(!$scriptsO.some(e => e == url)) { // Test, whether new
					$scriptsO.push(url); //If yes: Push to old array
					_iScript($t);
				}
				//Otherwise nothing to do
				return;
			}

			if(PK != "href" && !$t.classList.contains("no-ajaxy")) $.scripts($t); //Inline JS script? -> inject into DOM
		});
};
let _allScripts = $t => $t.forEach(e => _iScript(e)),
	_newArray = $t => $t.forEach(e => (url = e.getAttribute(PK)) ? $scriptsO.push(url) : 0),
	_classAlways = $t => $t.getAttribute("data-class") == "always" || Hints($.s.alwayshints).find(url),
	_iScript = $S => { 
		url = $S.getAttribute(PK);

		if(PK == "href") return qs("head").appendChild($.parse(linki.replace("*", url))); 
		if(!url) return $.scripts($S); 
		
		var sc = document.createElement("script");
		sc.async = $.s.asyncdef; 
		_copyAttributes(sc, $S); 
		qs("head").appendChild(sc); 
	},
	_removeScript = () => qa((PK == "href" ? linkr : scrr).replace("!", url)).forEach(e => e.parentNode.removeChild(e))
}}

// The Rq plugin - stands for request
// Stores all kinds of and manages data concerning the pending request
// Simplifies the Pronto plugin by managing request data separately, instead of passing it around...
// Second parameter (p) : data
// First parameter (o) values:
// = - check whether internally stored "href" ("h") variable is the same as the global currentURL
// ! - update last request ("l") variable with passed href
// ? - Edin's intelligent plausibility check - can spawn an external fetch abort
// v - validate value passed in "p", which is expected to be a click event value - also performs "i" afterwards
// i - initialise request defaults and return "c" (currentTarget)
// h - access internal href hard
// e - set / get internal "e" (event)
// p - set / get internal "p" (push flag)
// is - set / get internal "ispost" (flag whether request is a POST)
// d - set / get internal "d" (data for central $.ajax())
// C - set / get internal "can" ("href" of canonical URL)
// c - check whether simple canonical URL is given and return, otherwise return value passed in "p"
class RQ { constructor() {
	let ispost = 0, data = 0, push = 0, can = 0, e = 0, c = 0, h = 0, l = false;
            
	this.a = function (o, p, t) {
		if(o === "=") { 
			if(p) return h === $.currentURL //check whether internally stored "href" ("h") variable is the same as the global currentURL
			|| h === l; //or href of last request ("l")
			return h === $.currentURL; //for click requests
		}

		if(o === "!") return l = h; //store href in "l" (last request)

		if(o === "?") { //Edin previously called this "isOK" - powerful intelligent plausibility check
			let xs=$.fn("s");
			if (!xs.iO("0") && !p) $.fn("a"); //if fetch is not idle and new request is standard one, do ac.abort() to set it free
			if (xs==="1c" && p) return false; //if fetch is processing standard request and new request is prefetch, cancel prefetch until fetch is finished
			if (xs==="1p" && p) $.s.memoryoff ? $.fn("a") : 1; //if fetch is processing prefetch request and new request is prefetch do nothing (see [options] comment below)
			//([semaphore options for requests] $.fn("a") -> abort previous, proceed with new | return false -> leave previous, stop new | return true -> proceed)
			return true;
		}

		if(o === "v") { //validate value passed in "p", which is expected to be a click event value - also performs "i" afterwards
			if(!p) return false; //ensure data
			_setE(p, t); //Set event and href in one go
			if(!$.internal(h)) return false; //if not internal -> report failure
			o = "i"; //continue with "i"
		}

		if(o === "i") { //initialise request defaults and return "c" (currentTarget)
			ispost = false; //GET assumed
			data = null; //reset data
			push = true; //assume we want to push URL to the History API
			can = false; //reset can (canonical URL)
			return h; //return "h" (href)
		}

		if(o === "h") { // Access href hard
			if(p) {
				if (typeof p === "string") e = 0; // Reset e -> default handler
				h = (p.href) ? p.href : p;	// Poke in href hard
			}

			return h; //href
		}

		if(o === "e") { //set / get internal "e" (event)
			if(p) _setE(p, t);	//Set event and href in one go
			return e ? e : h; // Return "e" or if not given "h"
		}

		if(o === "p") { //set / get internal "p" (push flag)
			if(p !== undefined) push = p;
			return push;
		}

		if(o === "is") { //set / get internal "ispost" (flag whether request is a POST)
			if(p !== undefined) ispost = p;
			return ispost;
		}

		if(o === "d") { //set / get internal "d" (data for central $.ajax())
			if(p) data = p;
			return data;
		}

		if(o === "C") { //set internal "can" ("href" of canonical URL)
			if(p !== undefined) can = p;
			return can;
		}

		if(o === "c") return can && can !== p && !p.iO("#") && !p.iO("?") ? can : p; //get internal "can" ("href" of canonical URL)
};
let _setE = (p, t) => h = typeof (e = p) !== "string" ? (e.currentTarget && e.currentTarget.href) || (t && t.href) || e.currentTarget.action || e.originalEvent.state.url : e
}}

// The Frms plugin - stands for forms
// Ajaxify all forms in the specified divs
// Switch (o) values:
// d - set divs variable
// a - Ajaxify all forms in divs
class Frms { constructor() {
	let fm = 0, divs = 0;

	this.a = function (o, p) {
		if (!$.s.forms || !o) return; //ensure data

		if(o === "d") divs = p; //set divs variable
		if(o === "a") divs.forEach(div => { //iterate through divs
		Array.prototype.filter.call(qa($.s.forms, div), function(e) { //filter forms
			let c = e.getAttribute("action");
			return($.internal(c && c.length > 0 ? c : $.currentURL)); //ensure "action"
		}).forEach(frm => { //iterate through forms
		frm.addEventListener("submit", q => { //create event listener
			fm = q.target; // fetch target

			p = _k(); //Serialise data
			var g = "get", //assume GET
			m = fm.getAttribute("method"); //fetch method attribute
			if (m.length > 0 && m.toLowerCase() == "post") g = "post"; //Override with "post"

			var h, a = fm.getAttribute("action"); //fetch action attribute
			if (a && a.length > 0) h = a; //found -> store
			else h = $.currentURL; //not found -> select current URL

			$.Rq("v", q); //validate request

			if (g == "get") h = _b(h, p); //GET -> copy URL parameters
			else {
				$.Rq("is", true); //set is POST in request data
				$.Rq("d", p); //save data in request data
			}

			$.trigger("submit", h); //raise pronto.submit event
			$.pronto(0, { href: h }); //programmatically change page

			q.preventDefault(); //prevent default form action
			return(false); //success -> disable default behaviour
		})
		});
	});
	};
let _k = () => {
		let o = new FormData(fm), n = qs("input[name][type=submit]", fm);

		if (n) o.append(n.getAttribute("name"), n.value);
		return o;
	},
	_b = (m, n) => {
		let s = "";
		if (m.iO("?")) m = m.substring(0, m.iO("?"));
		
		for (var [k, v] of n.entries()) s += `${k}=${encodeURIComponent(v)}&`;
		return `${m}?${s.slice(0,-1)}`;
	}
}}

// The stateful Offsets plugin
// Usage:
// 1) $.offsets(<URL>) - returns offset of specified URL from internal array
// 2) $.offsets() - saves the current URL + offset in internal array
class Offsets { constructor() {
	let d = [], i = -1;
            
	this.a = function (h) {
		if (typeof h === "string") { //Lookup page offset
			h = h.iO("?") ? h.split("?")[0] : h; //Handle root URL only from dynamic pages
			i = _iOffset(h); //Fetch offset
			if(i === -1) return 0; // scrollTop if not found
			return d[i][1]; //Return offset that was found
		}

		//Add page offset
		var u = $.currentURL, us1 = u.iO("?") ? u.split("?")[0] : u, us = us1.iO("#") ? us1.split("#")[0] : us1, os = [us, (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop];
		i = _iOffset(us); //get page index
		if(i === -1) d.push(os); //doesn't exist -> push to array
		else d[i] = os; //exists -> overwrite
	};
let _iOffset = h => d.findIndex(e => e[0] == h)
}}

// The Scrolly plugin - manages scroll effects centrally
// scrolltop values: "s" - "smart" (default), true - always scroll to top, false - no scroll
// Switch (o) values:
// + - add current page to offsets
// ! - scroll to current page offset
class Scrolly { constructor() {

	this.a = function (o) {
		if(!o) return; //ensure operator

		var op = o; //cache operator

		if(o === "+" || o === "!") o = $.currentURL; //fetch currentURL for "+" and "-" operators

		if(op !== "+" && o.iO("#") && (o.iO("#") < o.length - 1)) { //if hash in URL and not standalone hash
			let $el = qs("#" + o.split("#")[1]); //fetch the element
			if (!$el) return; //nothing found -> return quickly
			let box = $el.getBoundingClientRect();
			_scrll(box.top + window.pageYOffset - document.documentElement.clientTop); // ...animate to ID
			return;
		}

		if($.s.scrolltop === "s") { //smart scroll enabled
			if(op === "+") $.offsets(); //add page offset
			if(op === "!") _scrll($.offsets(o)); //scroll to stored position of page

			return;
		}

		if(op !== "+" && $.s.scrolltop) _scrll(0); //otherwise scroll to top of page

		//default -> do nothing
	};
let _scrll = o => window.scrollTo(0, o)
}}

// The hApi plugin - manages operatios on the History API centrally
// Second parameter (p) - set global currentURL
// Switch (o) values:
// = - perform a replaceState, using currentURL
// otherwise - perform a pushState, using currentURL
class HApi { constructor() {
            
	this.a = function (o, p) {
		if(!o) return; //ensure operator
		if(p) $.currentURL = p; //if p given -> update current URL

		if(o === "=") history.replaceState({ url: $.currentURL }, "state-" + $.currentURL, $.currentURL); //perform replaceState
		else if ($.currentURL !== window.location.href) history.pushState({ url: $.currentURL }, "state-" + $.currentURL, $.currentURL); //perform pushState
	};
}}

// The Pronto plugin - Pronto variant of Ben Plum's Pronto plugin - low level event handling in general
// Works on a selection, passed to Pronto by the selection, which specifies, which elements to Ajaxify
// Switch (h) values:
// i - initialise Pronto
// <object> - fetch href part and continue with _request()
// <URL> - set "h" variable of Rq hard and continue with _request()
class Pronto { constructor() {
	let $gthis = 0, requestTimer = 0, pd = 150, ptim = 0;

	this.a = function ($this, h) {
		if(!h) return; //ensure data

		if(h === "i") { //request to initialise
			bdy = document.body;
			if(!$this.length) $this = "body";
			$gthis = qa($this); //copy selection to global selector
			$.frms = new Frms().a; //initialise forms sub-plugin
			if($.s.idleTime) $.slides = new classSlides($).a; //initialise optional slideshow sub-plugin
			$.scrolly = new Scrolly().a; //initialise scroll effects sub-plugin
			$.offsets = new Offsets().a;
			$.hApi = new HApi().a;
			_init_p(); //initialise Pronto sub-plugin
			return $this; //return query selector for chaining
		}

		if(typeof(h) === "object") { //jump to internal page programmatically -> handler for forms sub-plugin
			$.Rq("h", h);
			_request();
			return;
		}

		if(h.iO("/")) { //jump to internal page programmatically -> default handler
			$.Rq("h", h);
			_request(true);
		}
	};
let _init_p = () => {
	$.hApi("=", window.location.href);
	window.addEventListener("popstate", _onPop);
	if ($.s.prefetchoff !== true) {
		_on("mouseenter", $.s.selector, _preftime); // start prefetch timeout
		_on("mouseleave", $.s.selector, _prefstop); // stop prefetch timeout
		_on("touchstart", $.s.selector, _prefetch);
	}
	_on("click", $.s.selector, _click, bdy);
	$.frms("d", qa("body"));
	$.frms("a");
	$.frms("d", $gthis);
	if($.s.idleTime) $.slides("i");
},
	_preftime  = (t, e) => ptim = setTimeout(()=> _prefetch(t, e), pd), // call prefetch if timeout expires without being cleared by _prefstop
	_prefstop = () => clearTimeout(ptim),
	_prefetch = (t, e) => {
		if($.s.prefetchoff === true) return;
		if (!$.Rq("?", true)) return;
		var href = $.Rq("v", e, t);
		if ($.Rq("=", true) || !href || Hints($.s.prefetchoff).find(href)) return;
		$.fn("+", href, () => false);
	},
	_stopBubbling = e => (
		e.preventDefault(),
		e.stopPropagation(),
		e.stopImmediatePropagation()
	),
	_click = (t, e, notPush) => {
		if(!$.Rq("?")) return;
		var href = $.Rq("v", e, t);
		if(!href || _exoticKey(t)) return;
		if(href.substr(-1) ==="#") return true;
		if(_hashChange()) {
			$.hApi("=", href);
			return true;
		}

		$.scrolly("+");
		_stopBubbling(e);
		if($.Rq("=")) $.hApi("=");
		if($.s.refresh || !$.Rq("=")) _request(notPush);
	},
	_request = notPush => {
		$.Rq("!");
		if(notPush) $.Rq("p", false);
		$.trigger("request");
		$.fn($.Rq("h"), err => {
			if (err) {
				lg("Error in _request : " + err);
				$.trigger("error", err);
			}

			_render();
		});
	},
	_render = () => {
		$.trigger("beforeload");
		if($.s.requestDelay) {
			if(requestTimer) clearTimeout(requestTimer);
			requestTimer = setTimeout(_doRender, $.s.requestDelay);
		} else _doRender();
	},
	_onPop = e => {
		var url = window.location.href;

		$.Rq("i");
		$.Rq("h", url);
		$.Rq("p", false);
		$.scrolly("+");

		if (!url || url === $.currentURL) return;
		$.trigger("request");
		$.fn(url, _render);
	},
	_doRender = () => {
		$.trigger("load");
		if($.s.bodyClasses) { var classes = $.fn("body").getAttribute("class"); bdy.setAttribute("class", classes ? classes : ""); }

		var href = $.Rq("h"), title;
		href = $.Rq("c", href);

		$.hApi($.Rq("p") ? "+" : "=", href);
		if(title = $.fn("title")) qs("title").innerHTML = title.innerHTML;
		$.Rq("C", $.fn("-", $gthis));
		$.frms("a");

		$.scrolly("!");
		_gaCaptureView(href);
		$.trigger("render");
		if($.s.passCount) qs("#" + $.s.passCount).innerHTML = "Pass: " + $.pass;
		if($.s.cb) $.s.cb();
	},
	_gaCaptureView = href => {
		href = "/" + href.replace(rootUrl,"");
		if (typeof window.ga !== "undefined") window.ga("send", "pageview", href);
		else if (typeof window._gaq !== "undefined") window._gaq.push(["_trackPageview", href]);
	},
	_exoticKey = (t) => {
		var href = $.Rq("h"), e = $.Rq("e"), tgt = e.currentTarget.target || t.target;
		return (e.which > 1 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || tgt === "_blank"
			|| href.iO("wp-login") || href.iO("wp-admin"));
	},
	_hashChange = () => {
		var e = $.Rq("e");
		return (e.hash && e.href.replace(e.hash, "") === window.location.href.replace(location.hash, "") || e.href === window.location.href + "#");
	}
}}


$.init = () => {
	let o = options;
	if (!o || typeof(o) !== "string") {
		if (document.readyState === "complete" || (document.readyState !== "loading" && !document.documentElement.doScroll)) 
			run();
		else document.addEventListener('DOMContentLoaded', run);
		return $;
	}
	else return $.pronto(0, o);
};

let run = () => {
		$.s = Object.assign($.s, options);
		$.pages = new Pages().a;
		$.pronto = new Pronto().a;
		if (load()) { 
			$.pronto($.s.elements, "i"); 
			if ($.s.deltas) $.scripts("1"); 
		}
	},
	load = () => { 
		if (!api || !$.s.pluginon) { 
			lg("Gracefully exiting...");
			return false;
		}
		
		lg("Ajaxify loaded..."); //verbosity option steers, whether this initialisation message is output
		
		$.scripts = new Scripts().a;
		$.scripts("i"); 
		$.cache = new Cache().a;
		$.memory = new Memory().a;
		$.fn = $.getPage = new GetPage().a;
		$.detScripts = new DetScripts().a;
		$.addAll = new AddAll().a;
		$.Rq = new RQ().a;
		return true; 
	}
$.init(); // initialize Ajaxify on definition
}}