/*
 * ajaxify.js
 * Ajaxify - The Ajax Plugin
 * https://4nf.org/
 *
 * Copyright Arvind Gupta; MIT Licensed
 *
 * Version 8.2.6
 */
 
/* INTERFACE: See also https://4nf.org/interface/

Simplest plugin call:

let ajaxify = new Ajaxify({options});
Ajaxifies the whole site, dynamically replacing the elements specified in "elements" across pages

*/

let Ay; //to become the global handle for the main Ajaxify parent class - if used by you already, please rename and rebuild

function _won(a, b, c = false) { if(c === false) c = {once: true}; window.addEventListener(a, b, c); };

//Module global helpers
let rootUrl = location.origin, inlineclass = "ajy-inline",
	bdy,
	qa=(s,o=document)=>o.querySelectorAll(s),
	qs=(s,o=document)=>o.querySelector(s),
	qha=(e)=>qs("head").appendChild(e),
	prC=(e)=>e.parentNode.removeChild(e),
	dcE=(e)=>document.createElement(e),

_copyAttributes=(el, S, flush)=>{ //copy all attributes of element generically
	if(flush) [...el.attributes].forEach(e => el.removeAttribute(e.name)); //delete all old attributes
	[...S.attributes].forEach(e => e.nodeValue == "ajy-body" || el.setAttribute(e.nodeName, e.nodeValue)); //low-level insertion
};

// The main plugin - Ajaxify
// Is passed the global options 
// Checks for necessary pre-conditions - otherwise gracefully degrades
// Initialises sub-plugins
// Calls Pronto
class Ajaxify { constructor(options) {
String.prototype.iO = function(s) { return this.toString().indexOf(s) + 1; }; //Intuitively better understandable shorthand for String.indexOf() - String.iO()
Ay = this;

//Options default values
Ay.s = {
//	basic config parameters
	elements: "body", //selector for element IDs that are going to be swapped (e.g. "#el1, #el2, #el3")
	selector : "a:not(.no-ajaxy)", //selector for links to trigger swapping - not elements to be swapped - i.e. a selection of links
	forms : "form:not(.no-ajaxy)", // selector for ajaxifying forms - set to "false" to disable
	canonical : false, // Fetch current URL from "canonical" link if given, updating the History API.  In case of a re-direct...
	refresh : false, // Refresh the page even if link clicked is current page
 
// visual effects settings
	requestDelay : 0, //in msec - Delay of Pronto request
	scrolltop : "s", // Smart scroll, true = always scroll to top of page, false = no scroll
	scrollDelay : 0, // Minimal delay on all scroll effects in milliseconds, useful in case of e.g. smooth scroll
	bodyClasses : true, // Copy body attributes from target page, set to "false" to disable
 
// script and style handling settings, prefetch
	deltas : true, // true = deltas loaded, false = all scripts loaded
	asyncdef : true, // default async value for dynamically inserted external scripts, false = synchronous / true = asynchronous
	alwayshints : false, // strings, - separated by ", " - if matched in any external script URL - these are always loaded on every page load
	inline : true, // true = all inline scripts loaded, false = only specific inline scripts are loaded
	inlinehints : false, // strings - separated by ", " - if matched in any inline scripts - only these are executed - set "inline" to false beforehand
	inlineskip : "adsbygoogle", // strings - separated by ", " - if matched in any inline scripts - these are NOT are executed - set "inline" to true beforehand 
	inlineappend : true, // append scripts to the main content element, instead of "eval"-ing them
	intevents: true, // intercept events that are fired only on classic page load and simulate their trigger on ajax page load ("DOMContentLoaded")
	style : true, // true = all style tags in the head loaded, false = style tags on target page ignored
	prefetchoff : false, // Plugin pre-fetches pages on hoverIntent - true = set off completely // strings - separated by ", " - hints to select out
 
// debugging & advanced settings
	verbosity : 0, //Debugging level to console: default off.	Can be set to 10 and higher (in case of logging enabled)
	memoryoff : false, // strings - separated by ", " - if matched in any URLs - only these are NOT executed - set to "true" to disable memory completely
	cb : 0, // callback handler on completion of each Ajax request - default 0
	pluginon : true, // Plugin set "on" or "off" (==false) manually
	passCount: false // Show number of pass for debugging
};


Ay.pass = 0; Ay.currentURL = ""; Ay.h = {};
Ay.parse = (s, pl) => (pl = dcE('div'), pl.insertAdjacentHTML('afterbegin', s), pl.firstElementChild); // HTML parser
Ay.trigger = (t, e) => { let ev = document.createEvent('HTMLEvents'); ev.initEvent("pronto." + t, true, false); ev.data = e ? e : Ay.Rq("e"); window.dispatchEvent(ev); };
Ay.internal = (url) => { if (!url) return false; if (typeof(url) === "object") url = url.href; if (url==="") return true; return url.substring(0,rootUrl.length) === rootUrl || !url.iO(":"); };
Ay.intevents = () => {
	let iFn = function (a, b, c = false) { if ((this === document || this === window) && a=="DOMContentLoaded") setTimeout(b); else this.ael(a,b,c);};  // if "DOMContentLoaded" - execute function, else - add event listener	
	EventTarget.prototype.ael = EventTarget.prototype.addEventListener; // store original method
	EventTarget.prototype.addEventListener = iFn; // start intercepting event listener addition
};

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

class Hints { constructor(h) { let _ = this;
	_.list = (typeof h === 'string' && h.length > 0) ? h.split(", ") : false; //hints are passed as a comma separated string 
	_.find = (t) => (!t || !_.list) ? false : _.list.some(h => t.iO(h)); //iterate through hints within passed text (t)
}}

function lg(m){ Ay.s.verbosity && console && console.log(m); }

// The GetPage class
// First parameter (o) is a switch: 
// empty - returns cache
// <URL> - loads HTML via Ajax, second parameter "p" must be callback
// + - pre-fetches page, second parameter "p" must be URL, third parameter "p2" must be callback 
// - - loads page into DOM and handle scripts, second parameter "p" must hold selection to load
// x - returns response
// otherwise - returns selection of current page to client

class GetPage { constructor() {
	let rsp = 0, cb = 0, plus = 0, rt = "", ct = 0, rc = 0, ac = 0,

//Regexes for escaping fetched HTML of a whole page - best of Baluptons Ajaxify
//Makes it possible to pre-fetch an entire page
docType = /<\!DOCTYPE[^>]*>/i,
tagso = /<(html|head|link)([\s\>])/gi,
tagsod = /<(body)([\s\>])/gi,
tagsc = /<\/(html|head|body|link)\>/gi,

//Helper strings
div12 = '<div class="ajy-$1"$2',
divid12 = '<div id="ajy-$1"$2';

	this.a = function (o, p, p2) { 
		if (!o) return Ay.cache.g(); 

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

		if (!Ay.cache.g()) return;
		if (o === "body") return qs("#ajy-" + o, Ay.cache.g());
		if (o === "script") return qa(o, Ay.cache.g()); 

		return qs((o === "title") ? o : ".ajy-" + o, Ay.cache.g()); 
};
let _lSel = t => (
	Ay.pass++, 
	_lEls(t), 
	qa("body > script").forEach(e => (e.classList.contains(inlineclass)) ? prC(e) : false), 
	Ay.scripts(true), 
	Ay.scripts("s"), 
	Ay.scripts("c") 
),
	_lPage = (h, pre) => { 
		if (h.iO("#")) h = h.split("#")[0]; 
		if (Ay.Rq("is") || !Ay.cache.l(h)) return _lAjax(h, pre); 

		plus = 0; 
		if (cb) return cb(); 
	},
	_ld = (t, h) => {
		if(!h) return; //no input

		var c = h.cloneNode(true); // clone element node (true = deep clone)
		qa("script", c).forEach(e => prC(e));
		_copyAttributes(t, c, true); 
		t.innerHTML = c.innerHTML;
	},
	_lEls = t => 
		Ay.cache.g() && !_isBody(t) && t.forEach(function(e) { 
			_ld(e, qs("#" + e.getAttribute("id"), Ay.cache.g()));
		}),
	_isBody = t => t[0].tagName.toLowerCase() == "body" && (_ld(bdy, qs("#ajy-body", Ay.cache.g())), 1),
	_lAjax = (hin, pre) => { 
		var ispost = Ay.Rq("is"); 
		if (pre) rt="p"; else rt="c"; 

		ac = new AbortController(); // set abort controller
		rc++; // set active request counter
		fetch(hin, {
			method: ((ispost) ? "POST" : "GET"),
			cache: "default",
			mode: "same-origin",
			headers: {"X-Requested-With": "XMLHttpRequest"},
			body: (ispost) ? Ay.Rq("d") : null,
			signal: ac.signal
		}).then(r => {
			if (!r.ok || !_isHtml(r)) {
				if (!pre) {location.href = hin;}
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
				Ay.trigger("error", err); 
				lg("Response text : " + err.message); 
				return _cache(hin, err.message, err);
			} catch (e) {}
		}).finally(() => rc--); // reset active request counter
	},
	_cl = c => (plus = 0, (!c) ? cb = 0 : 0), // clear plus AND/OR callback
	_cache = (href, h, err) => Ay.cache.s(Ay.parse(_parseHTML(h))) && (Ay.pages.p([href, Ay.cache.g()]), 1) && cb && cb(err),
	_isHtml = x => (ct = x.headers.get("content-type")) && (ct.iO("html") || ct.iO("form-")),
	_parseHTML = h => dcE("html").innerHTML = _replD(h).trim(),
	_replD = h => String(h).replace(docType, "").replace(tagso, div12).replace(tagsod, divid12).replace(tagsc, "</div>")
}}

// The stateful Scripts plugin
// First parameter "o" is switch:
// i - initailise options
// c - fetch canonical URL
// <object> - handle one inline script
// otherwise - delta loading
class Scripts { constructor() {
	let S = false, txt = 0;
	Ay.h.inlinehints = new Hints(Ay.s.inlinehints);
	Ay.h.inlineskip = new Hints(Ay.s.inlineskip);
	
	this.a = function (o) {
		if (o === "i") { 
			if(!S) S = {}; 
			return true;
		}

		if (o === "s") return _allstyle(S.y); 

		if (o === "1") { 
			Ay.detScripts.d(S); 
			return _addScripts(S); 
		}

		if (o === "c") return Ay.s.canonical && S.can ? S.can.getAttribute("href") : false;
		if (o === "d") return Ay.detScripts.d(S);
		if (o && typeof o == "object") return _onetxt(o);

		if (Ay.scripts("d")) return;
		_addScripts(S);
};
let _allstyle = S =>	 
	!Ay.s.style || !S || (
	qa("style", qs("head")).forEach(e => prC(e)), //delete old style tags
	S.forEach(el => {
		let st = Ay.parse('<style>' + el.textContent + '</style>');
		_copyAttributes(st, el);
		qha(st); //append to the head
	})
	),
	_onetxt = S => 
		(!(txt = S.textContent).iO(").ajaxify(") && (!txt.iO("new Ajaxify(")) && 
			((Ay.s.inline && !Ay.h.inlineskip.find(txt)) || S.classList.contains("ajaxy") || 
			Ay.h.inlinehints.find(txt))
		) && _addtxt(S),
	_addtxt = S => { 
		if(!txt || !txt.length) return; 
		if(Ay.s.inlineappend || (S.getAttribute("type") && !S.getAttribute("type").iO("text/javascript"))) try { return _apptxt(S); } catch (e) { }

		try { eval(txt); } catch (e1) { 
			lg("Error in inline script : " + txt + "\nError code : " + e1);
		}
	},
	_apptxt = S => { let sc = dcE("script"); _copyAttributes(sc, S); sc.classList.add(inlineclass);
		try {sc.appendChild(document.createTextNode(S.textContent))} catch(e) {sc.text = S.textContent};
		return qs("body").appendChild(sc);
	},
	_addScripts = S => (Ay.addAll.a(S.c, "href"), Ay.addAll.a(S.j, "src"))
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
// d - set / get internal "d" (data for central fetch())
// C - set / get internal "can" ("href" of canonical URL)
// c - check whether simple canonical URL is given and return, otherwise return value passed in "p"
class RQ { constructor() {
	let ispost = 0, data = 0, push = 0, can = 0, e = 0, c = 0, h = 0, l = false;
            
	this.a = function (o, p, t) {
		if(o === "=") { 
			if(p) return h === Ay.currentURL //check whether internally stored "href" ("h") variable is the same as the global currentURL
			|| h === l; //or href of last request ("l")
			return h === Ay.currentURL; //for click requests
		}

		if(o === "!") return l = h; //store href in "l" (last request)

		if(o === "?") { //Edin previously called this "isOK" - powerful intelligent plausibility check
			let xs=Ay.fn("s");
			if (!xs.iO("0") && !p) Ay.fn("a"); //if fetch is not idle and new request is standard one, do ac.abort() to set it free
			if (xs==="1c" && p) return false; //if fetch is processing standard request and new request is prefetch, cancel prefetch until fetch is finished
			if (xs==="1p" && p) Ay.s.memoryoff ? Ay.fn("a") : 1; //if fetch is processing prefetch request and new request is prefetch do nothing (see [options] comment below)
			//([semaphore options for requests] Ay.fn("a") -> abort previous, proceed with new | return false -> leave previous, stop new | return true -> proceed)
			return true;
		}

		if(o === "v") { //validate value passed in "p", which is expected to be a click event value - also performs "i" afterwards
			if(!p) return false; //ensure data
			_setE(p, t); //Set event and href in one go
			if(!Ay.internal(h)) return false; //if not internal -> report failure
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

		if(o === "d") { //set / get internal "d" (data for central fetch())
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
		if (!Ay.s.forms || !o) return; //ensure data

		if(o === "d") divs = p; //set divs variable
		if(o === "a") divs.forEach(div => { //iterate through divs
		Array.prototype.filter.call(qa(Ay.s.forms, div), function(e) { //filter forms
			let c = e.getAttribute("action");
			return(Ay.internal(c && c.length > 0 ? c : Ay.currentURL)); //ensure "action"
		}).forEach(frm => { //iterate through forms
		frm.addEventListener("submit", q => { //create event listener
			fm = q.target; // fetch target

			p = _k(); //Serialise data
			var g = "get", //assume GET
			m = fm.getAttribute("method"); //fetch method attribute
			if (m.length > 0 && m.toLowerCase() == "post") g = "post"; //Override with "post"

			var h, a = fm.getAttribute("action"); //fetch action attribute
			if (a && a.length > 0) h = a; //found -> store
			else h = Ay.currentURL; //not found -> select current URL

			Ay.Rq("v", q); //validate request

			if (g == "get") h = _b(h, p); //GET -> copy URL parameters
			else {
				Ay.Rq("is", true); //set is POST in request data
				Ay.Rq("d", p); //save data in request data
			}

			Ay.trigger("submit", h); //raise pronto.submit event
			Ay.pronto(0, { href: h }); //programmatically change page

			q.preventDefault(); //prevent default form action
			return(false); //success -> disable default behaviour
		});
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

// The Pronto plugin - Pronto variant of Ben Plum's Pronto plugin - low level event handling in general
// Works on a selection, passed to Pronto by the selection, which specifies, which elements to Ajaxify
// Switch (h) values:
// i - initialise Pronto
// <object> - fetch href part and continue with _request()
// <URL> - set "h" variable of Rq hard and continue with _request()
class Pronto { constructor() {
	let gsl = 0, requestTimer = 0, pd = 150, ptim = 0;
	Ay.h.prefetchoff = new Hints(Ay.s.prefetchoff);

	this.a = function (sl, h) {
		if(!h) return; //ensure data

		if(h === "i") { //request to initialise
			bdy = document.body;
			if(!sl.length) sl = "body";
			gsl = qa(sl); //copy selection to global selector
			Ay.frms = new Frms().a; //initialise forms sub-plugin
			if(Ay.s.idleTime) Ay.slides = new classSlides(Ay).a; //initialise optional slideshow sub-plugin
			Ay.scrolly = new Scrolly(); //initialise scroll effects sub-plugin
			(Ay.offsets = new Offsets()).f();
			Ay.hApi = new HApi();
			_init_p(); //initialise Pronto sub-plugin
			return sl; //return query selector for chaining
		}

		if(typeof(h) === "object") { //jump to internal page programmatically -> handler for forms sub-plugin
			Ay.Rq("h", h);
			_request();
			return;
		}

		if(h.iO("/")) { //jump to internal page programmatically -> default handler
			Ay.Rq("h", h);
			_request(true);
		}
	};
let _init_p = () => {
	Ay.hApi.r(window.location.href);
	window.addEventListener("popstate", _onPop);
	if (Ay.s.prefetchoff !== true) {
		_on("mouseenter", Ay.s.selector, _preftime); // start prefetch timeout
		_on("mouseleave", Ay.s.selector, _prefstop); // stop prefetch timeout
		_on("touchstart", Ay.s.selector, _prefetch);
	}
	_on("click", Ay.s.selector, _click, bdy);
	Ay.frms("d", qa("body"));
	Ay.frms("a");
	Ay.frms("d", gsl);
	if(Ay.s.idleTime) Ay.slides("i");
},
	_preftime  = (t, e) => (_prefstop(), ptim = setTimeout(()=> _prefetch(t, e), pd)), // call prefetch if timeout expires without being cleared by _prefstop
	_prefstop = () => clearTimeout(ptim),
	_prefetch = (t, e) => {
		if(Ay.s.prefetchoff === true) return;
		if (!Ay.Rq("?", true)) return;
		var href = Ay.Rq("v", e, t);
		if (Ay.Rq("=", true) || !href || Ay.h.prefetchoff.find(href)) return;
		Ay.fn("+", href, () => false);
	},
	_stopBubbling = e => (
		e.preventDefault(),
		e.stopPropagation(),
		e.stopImmediatePropagation()
	),
	_click = (t, e, notPush) => {
		if(!Ay.Rq("?")) return;
		var href = Ay.Rq("v", e, t);
		if(!href || _exoticKey(t)) return;
		if(href.substr(-1) ==="#") return true;
		if(_hashChange()) {
			Ay.hApi.r(href);
			return true;
		}

		Ay.scrolly.p();
		_stopBubbling(e);
		if(Ay.Rq("=")) Ay.hApi.r();
		if(Ay.s.refresh || !Ay.Rq("=")) _request(notPush);
	},
	_request = notPush => {
		Ay.Rq("!");
		if(notPush) Ay.Rq("p", false);
		Ay.trigger("request");
		Ay.fn(Ay.Rq("h"), err => {
			if (err) {
				lg("Error in _request : " + err);
				Ay.trigger("error", err);
			}

			_render();
		});
	},
	_render = () => {
		Ay.trigger("beforeload");
		if(Ay.s.requestDelay) {
			if(requestTimer) clearTimeout(requestTimer);
			requestTimer = setTimeout(_doRender, Ay.s.requestDelay);
		} else _doRender();
	},
	_onPop = e => {
		var url = window.location.href;

		Ay.Rq("i");
		Ay.Rq("h", url);
		Ay.Rq("p", false);
		Ay.scrolly.p();

		if (!url || url === Ay.currentURL) return;
		Ay.trigger("request");
		Ay.fn(url, _render);
	},
	_doRender = () => {
		Ay.trigger("load");
		if(Ay.s.bodyClasses) _copyAttributes(bdy, Ay.fn("body"), true);

		var href = Ay.Rq("h"), title;
		href = Ay.Rq("c", href);

		if(Ay.Rq("p")) Ay.hApi.p(href); else Ay.hApi.r(href);
		if(title = Ay.fn("title")) qs("title").innerHTML = title.innerHTML;
		Ay.Rq("C", Ay.fn("-", gsl));
		Ay.frms("a");

		Ay.scrolly.l();
		_gaCaptureView(href);
		Ay.trigger("render");
		if(Ay.s.passCount) qs("#" + Ay.s.passCount).innerHTML = "Pass: " + Ay.pass;
		if(Ay.s.cb) Ay.s.cb();
	},
	_gaCaptureView = href => {
		href = "/" + href.replace(rootUrl,"");
		if (typeof window.ga !== "undefined") window.ga("send", "pageview", href);
		else if (typeof window._gaq !== "undefined") window._gaq.push(["_trackPageview", href]);
	},
	_exoticKey = (t) => {
		var href = Ay.Rq("h"), e = Ay.Rq("e"), tgt = e.currentTarget.target || t.target;
		return (e.which > 1 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || tgt === "_blank"
			|| href.iO("wp-login") || href.iO("wp-admin"));
	},
	_hashChange = () => {
		var e = Ay.Rq("e");
		return (e.hash && e.href.replace(e.hash, "") === window.location.href.replace(location.hash, "") || e.href === window.location.href + "#");
	}
}}


Ay.init = () => {
	let o = options;
	if (!o || typeof(o) !== "string") {
		if (document.readyState === "complete" || 
			(document.readyState !== "loading" && !document.documentElement.doScroll)) run();
		else document.addEventListener('DOMContentLoaded', run);
		return Ay;
	}
	else return Ay.pronto(0, o);
};

let run = () => {
		Ay.s = Object.assign(Ay.s, options);
		(Ay.pages = new Pages()).f();
		Ay.pronto = new Pronto().a;
		if (load()) { 
			Ay.pronto(Ay.s.elements, "i"); 
			if (Ay.s.deltas) Ay.scripts("1"); 
		}
	},
	load = () => { 
		if (!(window.history && window.history.pushState && window.history.replaceState) || !Ay.s.pluginon) { 
			lg("Gracefully exiting...");
			return false;
		}
		
		lg("Ajaxify loaded..."); //verbosity option steers, whether this initialisation message is output
		
		if (Ay.s.intevents) Ay.intevents(); // intercept events
		Ay.scripts = new Scripts().a;
		Ay.scripts("i"); 
		Ay.cache = new Cache();
		Ay.memory = new Memory(); Ay.h.memoryoff = new Hints(Ay.s.memoryoff);
		Ay.fn = Ay.getPage = new GetPage().a;
		Ay.detScripts = new DetScripts();
		Ay.addAll = new AddAll(); Ay.h.alwayshints = new Hints(Ay.s.alwayshints);
		Ay.Rq = new RQ().a;
		return true; 
	};
Ay.init(); // initialize Ajaxify on definition
}}

// The stateful Cache class
// this.d = entire current page (as an object)
class Cache {
	g(){ return this.d } //getter
	s(v){ return this.d = v } //setter
	l(u){ let v = Ay.memory.l(u); return this.s(v === false ? v : Ay.pages.l(v)) } //lookup URL and load
}

// The stateful Memory class
// Usage: Ay.memory.l(<URL>) - returns the same URL if not turned off internally
class Memory {
	l(h){
		if (!h || Ay.s.memoryoff === true) return false;
		if (Ay.s.memoryoff === false) return h;
		return Ay.h.memoryoff.find(h) ? false : h;
	}
}

// The stateful Pages class
// this.d = Array of pages - [0] = URL // [1] = reference to whole page
class Pages {
	f(){ this.d = [] } //flush
	l(u){ if (this.P(u)) return this.d[this.i][1] } //lookup URL and return page
	p(o){ if(this.P(o[0])) this.d[this.i]=o; else this.d.push(o) } //update or push page passed as an object
	P(u){ return (this.i = this.d.findIndex(e => e[0] == u)) + 1 } //lookup page index and store in "i"
}

// The DetScripts class - stands for "detach scripts"
// Works on "s" <object> that is passed in and fills it
class DetScripts { 
	d(s) {
		if(!(this.h = Ay.pass ? Ay.fn("head") : qs("head"))) return true; //If pass is 0 -> fetch head from DOM, otherwise from target page
		this.lk = qa(Ay.pass ? ".ajy-link" : "link", this.h); //If pass is 0 -> fetch links from DOM, otherwise from target page
		s.j = Ay.pass ? Ay.fn("script") : qa("script"); //If pass is 0 -> fetch JSs from DOM, otherwise from target page
		s.c = this.x("stylesheet"); //Extract stylesheets
		s.y = qa("style", this.h); //Extract style tags
		s.can = this.x("canonical"); //Extract canonical tag
	}
	x(v){ return Array.prototype.filter.call(this.lk, e => e.getAttribute("rel").iO(v)) } //Extract link tags with given "rel"
}

// The Offsets class
// this.d = Array of pages - [0] = URL // [1] = offset
class Offsets {
	f(){ this.d = [] } //flush internal offsets array - must be performed by parent
	l(h){ if(h.iO("?")) h = h.split("?")[0]; //lookup page offset
		return this.O(h) ? this.d[this.i][1] : 0; //return if found otherwise 0
	}
	p(h){ let us1 = h.iO("?") ? h.split("?")[0] : h, //initialise all helper variables in one go
		us = us1.iO("#") ? us1.split("#")[0] : us1,
		os = [us, (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop];
		if(this.O(us)) this.d[this.i]=os; else this.d.push(os); // update if found, otherwise push
	}
	O(h){ return (this.i = this.d.findIndex(e => e[0] == h)) + 1 } //find URL in internal array - add 1 for convenience
}

// The Scrolly class
// operates on Ay.currentURL
class Scrolly { constructor() { if ('scrollRestoration' in history) history.scrollRestoration = 'manual' }
	p(){ Ay.s.scrolltop == "s" && Ay.offsets.p(Ay.currentURL) }
	l(){ let o = Ay.currentURL;
		if(o.iO("#") && (o.iO("#") < o.length - 1)) { //if hash in URL and not standalone hash
			let el = qs("#" + o.split("#")[1]); //fetch the element
			if(!el) return; //nothing found -> return quickly
			let box = el.getBoundingClientRect();
			return this.s(box.top + window.pageYOffset - document.documentElement.clientTop); // ...animate to ID
		}
		if(Ay.s.scrolltop == "s") this.s(Ay.offsets.l(o)); //smart scroll -> lookup and restore offset
		else Ay.s.scrolltop && this.s(0); //scrolltop true -> scroll to top of page
	}
	s(o){ setTimeout(() => window.scrollTo(0, o), Ay.s.scrollDelay) } //scroll to offset
}

// The HAPi class
// operates on Ay.currentURL - manages operations on the History API centrally(replaceState / pushState)
class HApi {
	r(h){ let c = this.u(h); history.replaceState({ url: c }, "state-" + c, c); } //perform replaceState
	p(h){ let c = this.u(h); if (c !== window.location.href) history.pushState({ url: c }, "state-" + c, c); } //perform pushState
	u(h){ if(h) Ay.currentURL = h; return Ay.currentURL; } //update currentURL if given and return always
}

// The AddAll class
// Works on a new selection of scripts to apply delta-loading to it 
class AddAll { constructor() { this.CSS = []; this.JS = []; }  
	a(sl, pk) { //only public function
		if(!sl.length || Ay.s.deltas === "n") return; //ensure input and that delta-loading is enabled

		this.PK = pk; //Copy "primary key" into internal variable

		if(!Ay.s.deltas) return sl.forEach(e => this.iScript(e)); //process all scripts and return quickly
		//deltas presumed to be "true" -> proceed with normal delta-loading

		this.O = pk == "href" ? this.CSS : this.JS; //Load old stylesheets or JS

		sl.forEach(t => { //Iterate through selection
			let url = this.gA(t); //fetch URL
			if(!Ay.pass) return url && this.O.push(url); //Fill new array on initial load, nothing more
			if(t.getAttribute("data-class") == "always" || Ay.h.alwayshints.find(url)) { //Class always handling
				this.removeScript(); //remove from DOM
				this.iScript(t); //insert back single external script in the head
				return;
			}
			if(url) { //URL?
				if(!this.O.some(e => e == url)) { // Test, whether new
					this.O.push(url); //If yes: Push to old array
					this.iScript(t);
				}
				//Otherwise nothing to do
				return;
			}

			if(pk != "href" && !t.classList.contains("no-ajaxy")) Ay.scripts(t); //Inline JS script? -> inject into DOM
		});
}
	gA(e){ return this.u = e.getAttribute(this.PK) }
	iScript(S){
		this.gA(S);
		if(this.PK == "href") return qha(Ay.parse('<link rel="stylesheet" type="text/css" href="*" />'.replace("*", this.u)));
		if(!this.u) return Ay.scripts(S); 
		
		var sc = dcE("script");
		sc.async = Ay.s.asyncdef; 
		_copyAttributes(sc, S); 
		qha(sc); 
	}
	removeScript(){ qa((this.PK == "href" ? 'link[href*="!"]' : 'script[src*="!"]').replace("!", this.u)).forEach(e => prC(e)) }
}
