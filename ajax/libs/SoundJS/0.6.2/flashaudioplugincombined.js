/*!
* SoundJS
* Visit http://createjs.com/ for documentation, updates and examples.
*
* Copyright (c) 2010 gskinner.com, inc.
*
* Permission is hereby granted, free of charge, to any person
* obtaining a copy of this software and associated documentation
* files (the "Software"), to deal in the Software without
* restriction, including without limitation the rights to use,
* copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the
* Software is furnished to do so, subject to the following
* conditions:
*
* The above copyright notice and this permission notice shall be
* included in all copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
* EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
* OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
* NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
* HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
* WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
* FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
* OTHER DEALINGS IN THE SOFTWARE.
*/


//##############################################################################
// swfobject.js
//##############################################################################

/*!	SWFObject v2.2 <http://code.google.com/p/swfobject/> 
	is released under the MIT License <http://www.opensource.org/licenses/mit-license.php> 
*/

var swfobject = function() {
	
	var UNDEF = "undefined",
		OBJECT = "object",
		SHOCKWAVE_FLASH = "Shockwave Flash",
		SHOCKWAVE_FLASH_AX = "ShockwaveFlash.ShockwaveFlash",
		FLASH_MIME_TYPE = "application/x-shockwave-flash",
		EXPRESS_INSTALL_ID = "SWFObjectExprInst",
		ON_READY_STATE_CHANGE = "onreadystatechange",
		
		win = window,
		doc = document,
		nav = navigator,
		
		plugin = false,
		domLoadFnArr = [main],
		regObjArr = [],
		objIdArr = [],
		listenersArr = [],
		storedAltContent,
		storedAltContentId,
		storedCallbackFn,
		storedCallbackObj,
		isDomLoaded = false,
		isExpressInstallActive = false,
		dynamicStylesheet,
		dynamicStylesheetMedia,
		autoHideShow = true,
	
	/* Centralized function for browser feature detection
		- User agent string detection is only used when no good alternative is possible
		- Is executed directly for optimal performance
	*/	
	ua = function() {
		var w3cdom = typeof doc.getElementById != UNDEF && typeof doc.getElementsByTagName != UNDEF && typeof doc.createElement != UNDEF,
			u = nav.userAgent.toLowerCase(),
			p = nav.platform.toLowerCase(),
			windows = p ? /win/.test(p) : /win/.test(u),
			mac = p ? /mac/.test(p) : /mac/.test(u),
			webkit = /webkit/.test(u) ? parseFloat(u.replace(/^.*webkit\/(\d+(\.\d+)?).*$/, "$1")) : false, // returns either the webkit version or false if not webkit
			ie = !+"\v1", // feature detection based on Andrea Giammarchi's solution: http://webreflection.blogspot.com/2009/01/32-bytes-to-know-if-your-browser-is-ie.html
			playerVersion = [0,0,0],
			d = null;
		if (typeof nav.plugins != UNDEF && typeof nav.plugins[SHOCKWAVE_FLASH] == OBJECT) {
			d = nav.plugins[SHOCKWAVE_FLASH].description;
			if (d && !(typeof nav.mimeTypes != UNDEF && nav.mimeTypes[FLASH_MIME_TYPE] && !nav.mimeTypes[FLASH_MIME_TYPE].enabledPlugin)) { // navigator.mimeTypes["application/x-shockwave-flash"].enabledPlugin indicates whether plug-ins are enabled or disabled in Safari 3+
				plugin = true;
				ie = false; // cascaded feature detection for Internet Explorer
				d = d.replace(/^.*\s+(\S+\s+\S+$)/, "$1");
				playerVersion[0] = parseInt(d.replace(/^(.*)\..*$/, "$1"), 10);
				playerVersion[1] = parseInt(d.replace(/^.*\.(.*)\s.*$/, "$1"), 10);
				playerVersion[2] = /[a-zA-Z]/.test(d) ? parseInt(d.replace(/^.*[a-zA-Z]+(.*)$/, "$1"), 10) : 0;
			}
		}
		else if (typeof win.ActiveXObject != UNDEF) {
			try {
				var a = new ActiveXObject(SHOCKWAVE_FLASH_AX);
				if (a) { // a will return null when ActiveX is disabled
					d = a.GetVariable("$version");
					if (d) {
						ie = true; // cascaded feature detection for Internet Explorer
						d = d.split(" ")[1].split(",");
						playerVersion = [parseInt(d[0], 10), parseInt(d[1], 10), parseInt(d[2], 10)];
					}
				}
			}
			catch(e) {}
		}
		return { w3:w3cdom, pv:playerVersion, wk:webkit, ie:ie, win:windows, mac:mac };
	}(),
	
	/* Cross-browser onDomLoad
		- Will fire an event as soon as the DOM of a web page is loaded
		- Internet Explorer workaround based on Diego Perini's solution: http://javascript.nwbox.com/IEContentLoaded/
		- Regular onload serves as fallback
	*/ 
	onDomLoad = function() {
		if (!ua.w3) { return; }
		if ((typeof doc.readyState != UNDEF && doc.readyState == "complete") || (typeof doc.readyState == UNDEF && (doc.getElementsByTagName("body")[0] || doc.body))) { // function is fired after onload, e.g. when script is inserted dynamically 
			callDomLoadFunctions();
		}
		if (!isDomLoaded) {
			if (typeof doc.addEventListener != UNDEF) {
				doc.addEventListener("DOMContentLoaded", callDomLoadFunctions, false);
			}		
			if (ua.ie && ua.win) {
				doc.attachEvent(ON_READY_STATE_CHANGE, function() {
					if (doc.readyState == "complete") {
						doc.detachEvent(ON_READY_STATE_CHANGE, arguments.callee);
						callDomLoadFunctions();
					}
				});
				if (win == top) { // if not inside an iframe
					(function(){
						if (isDomLoaded) { return; }
						try {
							doc.documentElement.doScroll("left");
						}
						catch(e) {
							setTimeout(arguments.callee, 0);
							return;
						}
						callDomLoadFunctions();
					})();
				}
			}
			if (ua.wk) {
				(function(){
					if (isDomLoaded) { return; }
					if (!/loaded|complete/.test(doc.readyState)) {
						setTimeout(arguments.callee, 0);
						return;
					}
					callDomLoadFunctions();
				})();
			}
			addLoadEvent(callDomLoadFunctions);
		}
	}();
	
	function callDomLoadFunctions() {
		if (isDomLoaded) { return; }
		try { // test if we can really add/remove elements to/from the DOM; we don't want to fire it too early
			var t = doc.getElementsByTagName("body")[0].appendChild(createElement("span"));
			t.parentNode.removeChild(t);
		}
		catch (e) { return; }
		isDomLoaded = true;
		var dl = domLoadFnArr.length;
		for (var i = 0; i < dl; i++) {
			domLoadFnArr[i]();
		}
	}
	
	function addDomLoadEvent(fn) {
		if (isDomLoaded) {
			fn();
		}
		else { 
			domLoadFnArr[domLoadFnArr.length] = fn; // Array.push() is only available in IE5.5+
		}
	}
	
	/* Cross-browser onload
		- Based on James Edwards' solution: http://brothercake.com/site/resources/scripts/onload/
		- Will fire an event as soon as a web page including all of its assets are loaded 
	 */
	function addLoadEvent(fn) {
		if (typeof win.addEventListener != UNDEF) {
			win.addEventListener("load", fn, false);
		}
		else if (typeof doc.addEventListener != UNDEF) {
			doc.addEventListener("load", fn, false);
		}
		else if (typeof win.attachEvent != UNDEF) {
			addListener(win, "onload", fn);
		}
		else if (typeof win.onload == "function") {
			var fnOld = win.onload;
			win.onload = function() {
				fnOld();
				fn();
			};
		}
		else {
			win.onload = fn;
		}
	}
	
	/* Main function
		- Will preferably execute onDomLoad, otherwise onload (as a fallback)
	*/
	function main() { 
		if (plugin) {
			testPlayerVersion();
		}
		else {
			matchVersions();
		}
	}
	
	/* Detect the Flash Player version for non-Internet Explorer browsers
		- Detecting the plug-in version via the object element is more precise than using the plugins collection item's description:
		  a. Both release and build numbers can be detected
		  b. Avoid wrong descriptions by corrupt installers provided by Adobe
		  c. Avoid wrong descriptions by multiple Flash Player entries in the plugin Array, caused by incorrect browser imports
		- Disadvantage of this method is that it depends on the availability of the DOM, while the plugins collection is immediately available
	*/
	function testPlayerVersion() {
		var b = doc.getElementsByTagName("body")[0];
		var o = createElement(OBJECT);
		o.setAttribute("type", FLASH_MIME_TYPE);
		var t = b.appendChild(o);
		if (t) {
			var counter = 0;
			(function(){
				if (typeof t.GetVariable != UNDEF) {
					var d = t.GetVariable("$version");
					if (d) {
						d = d.split(" ")[1].split(",");
						ua.pv = [parseInt(d[0], 10), parseInt(d[1], 10), parseInt(d[2], 10)];
					}
				}
				else if (counter < 10) {
					counter++;
					setTimeout(arguments.callee, 10);
					return;
				}
				b.removeChild(o);
				t = null;
				matchVersions();
			})();
		}
		else {
			matchVersions();
		}
	}
	
	/* Perform Flash Player and SWF version matching; static publishing only
	*/
	function matchVersions() {
		var rl = regObjArr.length;
		if (rl > 0) {
			for (var i = 0; i < rl; i++) { // for each registered object element
				var id = regObjArr[i].id;
				var cb = regObjArr[i].callbackFn;
				var cbObj = {success:false, id:id};
				if (ua.pv[0] > 0) {
					var obj = getElementById(id);
					if (obj) {
						if (hasPlayerVersion(regObjArr[i].swfVersion) && !(ua.wk && ua.wk < 312)) { // Flash Player version >= published SWF version: Houston, we have a match!
							setVisibility(id, true);
							if (cb) {
								cbObj.success = true;
								cbObj.ref = getObjectById(id);
								cb(cbObj);
							}
						}
						else if (regObjArr[i].expressInstall && canExpressInstall()) { // show the Adobe Express Install dialog if set by the web page author and if supported
							var att = {};
							att.data = regObjArr[i].expressInstall;
							att.width = obj.getAttribute("width") || "0";
							att.height = obj.getAttribute("height") || "0";
							if (obj.getAttribute("class")) { att.styleclass = obj.getAttribute("class"); }
							if (obj.getAttribute("align")) { att.align = obj.getAttribute("align"); }
							// parse HTML object param element's name-value pairs
							var par = {};
							var p = obj.getElementsByTagName("param");
							var pl = p.length;
							for (var j = 0; j < pl; j++) {
								if (p[j].getAttribute("name").toLowerCase() != "movie") {
									par[p[j].getAttribute("name")] = p[j].getAttribute("value");
								}
							}
							showExpressInstall(att, par, id, cb);
						}
						else { // Flash Player and SWF version mismatch or an older Webkit engine that ignores the HTML object element's nested param elements: display alternative content instead of SWF
							displayAltContent(obj);
							if (cb) { cb(cbObj); }
						}
					}
				}
				else {	// if no Flash Player is installed or the fp version cannot be detected we let the HTML object element do its job (either show a SWF or alternative content)
					setVisibility(id, true);
					if (cb) {
						var o = getObjectById(id); // test whether there is an HTML object element or not
						if (o && typeof o.SetVariable != UNDEF) { 
							cbObj.success = true;
							cbObj.ref = o;
						}
						cb(cbObj);
					}
				}
			}
		}
	}
	
	function getObjectById(objectIdStr) {
		var r = null;
		var o = getElementById(objectIdStr);
		if (o && o.nodeName == "OBJECT") {
			if (typeof o.SetVariable != UNDEF) {
				r = o;
			}
			else {
				var n = o.getElementsByTagName(OBJECT)[0];
				if (n) {
					r = n;
				}
			}
		}
		return r;
	}
	
	/* Requirements for Adobe Express Install
		- only one instance can be active at a time
		- fp 6.0.65 or higher
		- Win/Mac OS only
		- no Webkit engines older than version 312
	*/
	function canExpressInstall() {
		return !isExpressInstallActive && hasPlayerVersion("6.0.65") && (ua.win || ua.mac) && !(ua.wk && ua.wk < 312);
	}
	
	/* Show the Adobe Express Install dialog
		- Reference: http://www.adobe.com/cfusion/knowledgebase/index.cfm?id=6a253b75
	*/
	function showExpressInstall(att, par, replaceElemIdStr, callbackFn) {
		isExpressInstallActive = true;
		storedCallbackFn = callbackFn || null;
		storedCallbackObj = {success:false, id:replaceElemIdStr};
		var obj = getElementById(replaceElemIdStr);
		if (obj) {
			if (obj.nodeName == "OBJECT") { // static publishing
				storedAltContent = abstractAltContent(obj);
				storedAltContentId = null;
			}
			else { // dynamic publishing
				storedAltContent = obj;
				storedAltContentId = replaceElemIdStr;
			}
			att.id = EXPRESS_INSTALL_ID;
			if (typeof att.width == UNDEF || (!/%$/.test(att.width) && parseInt(att.width, 10) < 310)) { att.width = "310"; }
			if (typeof att.height == UNDEF || (!/%$/.test(att.height) && parseInt(att.height, 10) < 137)) { att.height = "137"; }
			doc.title = doc.title.slice(0, 47) + " - Flash Player Installation";
			var pt = ua.ie && ua.win ? "ActiveX" : "PlugIn",
				fv = "MMredirectURL=" + encodeURI(window.location).toString().replace(/&/g,"%26") + "&MMplayerType=" + pt + "&MMdoctitle=" + doc.title;
			if (typeof par.flashvars != UNDEF) {
				par.flashvars += "&" + fv;
			}
			else {
				par.flashvars = fv;
			}
			// IE only: when a SWF is loading (AND: not available in cache) wait for the readyState of the object element to become 4 before removing it,
			// because you cannot properly cancel a loading SWF file without breaking browser load references, also obj.onreadystatechange doesn't work
			if (ua.ie && ua.win && obj.readyState != 4) {
				var newObj = createElement("div");
				replaceElemIdStr += "SWFObjectNew";
				newObj.setAttribute("id", replaceElemIdStr);
				obj.parentNode.insertBefore(newObj, obj); // insert placeholder div that will be replaced by the object element that loads expressinstall.swf
				obj.style.display = "none";
				(function(){
					if (obj.readyState == 4) {
						obj.parentNode.removeChild(obj);
					}
					else {
						setTimeout(arguments.callee, 10);
					}
				})();
			}
			createSWF(att, par, replaceElemIdStr);
		}
	}
	
	/* Functions to abstract and display alternative content
	*/
	function displayAltContent(obj) {
		if (ua.ie && ua.win && obj.readyState != 4) {
			// IE only: when a SWF is loading (AND: not available in cache) wait for the readyState of the object element to become 4 before removing it,
			// because you cannot properly cancel a loading SWF file without breaking browser load references, also obj.onreadystatechange doesn't work
			var el = createElement("div");
			obj.parentNode.insertBefore(el, obj); // insert placeholder div that will be replaced by the alternative content
			el.parentNode.replaceChild(abstractAltContent(obj), el);
			obj.style.display = "none";
			(function(){
				if (obj.readyState == 4) {
					obj.parentNode.removeChild(obj);
				}
				else {
					setTimeout(arguments.callee, 10);
				}
			})();
		}
		else {
			obj.parentNode.replaceChild(abstractAltContent(obj), obj);
		}
	} 

	function abstractAltContent(obj) {
		var ac = createElement("div");
		if (ua.win && ua.ie) {
			ac.innerHTML = obj.innerHTML;
		}
		else {
			var nestedObj = obj.getElementsByTagName(OBJECT)[0];
			if (nestedObj) {
				var c = nestedObj.childNodes;
				if (c) {
					var cl = c.length;
					for (var i = 0; i < cl; i++) {
						if (!(c[i].nodeType == 1 && c[i].nodeName == "PARAM") && !(c[i].nodeType == 8)) {
							ac.appendChild(c[i].cloneNode(true));
						}
					}
				}
			}
		}
		return ac;
	}
	
	/* Cross-browser dynamic SWF creation
	*/
	function createSWF(attObj, parObj, id) {
		var r, el = getElementById(id);
		if (ua.wk && ua.wk < 312) { return r; }
		if (el) {
			if (typeof attObj.id == UNDEF) { // if no 'id' is defined for the object element, it will inherit the 'id' from the alternative content
				attObj.id = id;
			}
			if (ua.ie && ua.win) { // Internet Explorer + the HTML object element + W3C DOM methods do not combine: fall back to outerHTML
				var att = "";
				for (var i in attObj) {
					if (attObj[i] != Object.prototype[i]) { // filter out prototype additions from other potential libraries
						if (i.toLowerCase() == "data") {
							parObj.movie = attObj[i];
						}
						else if (i.toLowerCase() == "styleclass") { // 'class' is an ECMA4 reserved keyword
							att += ' class="' + attObj[i] + '"';
						}
						else if (i.toLowerCase() != "classid") {
							att += ' ' + i + '="' + attObj[i] + '"';
						}
					}
				}
				var par = "";
				for (var j in parObj) {
					if (parObj[j] != Object.prototype[j]) { // filter out prototype additions from other potential libraries
						par += '<param name="' + j + '" value="' + parObj[j] + '" />';
					}
				}
				el.outerHTML = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"' + att + '>' + par + '</object>';
				objIdArr[objIdArr.length] = attObj.id; // stored to fix object 'leaks' on unload (dynamic publishing only)
				r = getElementById(attObj.id);	
			}
			else { // well-behaving browsers
				var o = createElement(OBJECT);
				o.setAttribute("type", FLASH_MIME_TYPE);
				for (var m in attObj) {
					if (attObj[m] != Object.prototype[m]) { // filter out prototype additions from other potential libraries
						if (m.toLowerCase() == "styleclass") { // 'class' is an ECMA4 reserved keyword
							o.setAttribute("class", attObj[m]);
						}
						else if (m.toLowerCase() != "classid") { // filter out IE specific attribute
							o.setAttribute(m, attObj[m]);
						}
					}
				}
				for (var n in parObj) {
					if (parObj[n] != Object.prototype[n] && n.toLowerCase() != "movie") { // filter out prototype additions from other potential libraries and IE specific param element
						createObjParam(o, n, parObj[n]);
					}
				}
				el.parentNode.replaceChild(o, el);
				r = o;
			}
		}
		return r;
	}
	
	function createObjParam(el, pName, pValue) {
		var p = createElement("param");
		p.setAttribute("name", pName);	
		p.setAttribute("value", pValue);
		el.appendChild(p);
	}
	
	/* Cross-browser SWF removal
		- Especially needed to safely and completely remove a SWF in Internet Explorer
	*/
	function removeSWF(id) {
		var obj = getElementById(id);
		if (obj && obj.nodeName == "OBJECT") {
			if (ua.ie && ua.win) {
				obj.style.display = "none";
				(function(){
					if (obj.readyState == 4) {
						removeObjectInIE(id);
					}
					else {
						setTimeout(arguments.callee, 10);
					}
				})();
			}
			else {
				obj.parentNode.removeChild(obj);
			}
		}
	}
	
	function removeObjectInIE(id) {
		var obj = getElementById(id);
		if (obj) {
			for (var i in obj) {
				if (typeof obj[i] == "function") {
					obj[i] = null;
				}
			}
			obj.parentNode.removeChild(obj);
		}
	}
	
	/* Functions to optimize JavaScript compression
	*/
	function getElementById(id) {
		var el = null;
		try {
			el = doc.getElementById(id);
		}
		catch (e) {}
		return el;
	}
	
	function createElement(el) {
		return doc.createElement(el);
	}
	
	/* Updated attachEvent function for Internet Explorer
		- Stores attachEvent information in an Array, so on unload the detachEvent functions can be called to avoid memory leaks
	*/	
	function addListener(target, eventType, fn) {
		target.attachEvent(eventType, fn);
		listenersArr[listenersArr.length] = [target, eventType, fn];
	}
	
	/* Flash Player and SWF content version matching
	*/
	function hasPlayerVersion(rv) {
		var pv = ua.pv, v = rv.split(".");
		v[0] = parseInt(v[0], 10);
		v[1] = parseInt(v[1], 10) || 0; // supports short notation, e.g. "9" instead of "9.0.0"
		v[2] = parseInt(v[2], 10) || 0;
		return (pv[0] > v[0] || (pv[0] == v[0] && pv[1] > v[1]) || (pv[0] == v[0] && pv[1] == v[1] && pv[2] >= v[2])) ? true : false;
	}
	
	/* Cross-browser dynamic CSS creation
		- Based on Bobby van der Sluis' solution: http://www.bobbyvandersluis.com/articles/dynamicCSS.php
	*/	
	function createCSS(sel, decl, media, newStyle) {
		if (ua.ie && ua.mac) { return; }
		var h = doc.getElementsByTagName("head")[0];
		if (!h) { return; } // to also support badly authored HTML pages that lack a head element
		var m = (media && typeof media == "string") ? media : "screen";
		if (newStyle) {
			dynamicStylesheet = null;
			dynamicStylesheetMedia = null;
		}
		if (!dynamicStylesheet || dynamicStylesheetMedia != m) { 
			// create dynamic stylesheet + get a global reference to it
			var s = createElement("style");
			s.setAttribute("type", "text/css");
			s.setAttribute("media", m);
			dynamicStylesheet = h.appendChild(s);
			if (ua.ie && ua.win && typeof doc.styleSheets != UNDEF && doc.styleSheets.length > 0) {
				dynamicStylesheet = doc.styleSheets[doc.styleSheets.length - 1];
			}
			dynamicStylesheetMedia = m;
		}
		// add style rule
		if (ua.ie && ua.win) {
			if (dynamicStylesheet && typeof dynamicStylesheet.addRule == OBJECT) {
				dynamicStylesheet.addRule(sel, decl);
			}
		}
		else {
			if (dynamicStylesheet && typeof doc.createTextNode != UNDEF) {
				dynamicStylesheet.appendChild(doc.createTextNode(sel + " {" + decl + "}"));
			}
		}
	}
	
	function setVisibility(id, isVisible) {
		if (!autoHideShow) { return; }
		var v = isVisible ? "visible" : "hidden";
		if (isDomLoaded && getElementById(id)) {
			getElementById(id).style.visibility = v;
		}
		else {
			createCSS("#" + id, "visibility:" + v);
		}
	}

	/* Filter to avoid XSS attacks
	*/
	function urlEncodeIfNecessary(s) {
		var regex = /[\\\"<>\.;]/;
		var hasBadChars = regex.exec(s) != null;
		return hasBadChars && typeof encodeURIComponent != UNDEF ? encodeURIComponent(s) : s;
	}
	
	/* Release memory to avoid memory leaks caused by closures, fix hanging audio/video threads and force open sockets/NetConnections to disconnect (Internet Explorer only)
	*/
	var cleanup = function() {
		if (ua.ie && ua.win) {
			window.attachEvent("onunload", function() {
				// remove listeners to avoid memory leaks
				var ll = listenersArr.length;
				for (var i = 0; i < ll; i++) {
					listenersArr[i][0].detachEvent(listenersArr[i][1], listenersArr[i][2]);
				}
				// cleanup dynamically embedded objects to fix audio/video threads and force open sockets and NetConnections to disconnect
				var il = objIdArr.length;
				for (var j = 0; j < il; j++) {
					removeSWF(objIdArr[j]);
				}
				// cleanup library's main closures to avoid memory leaks
				for (var k in ua) {
					ua[k] = null;
				}
				ua = null;
				for (var l in swfobject) {
					swfobject[l] = null;
				}
				swfobject = null;
			});
		}
	}();
	
	return {
		/* Public API
			- Reference: http://code.google.com/p/swfobject/wiki/documentation
		*/ 
		registerObject: function(objectIdStr, swfVersionStr, xiSwfUrlStr, callbackFn) {
			if (ua.w3 && objectIdStr && swfVersionStr) {
				var regObj = {};
				regObj.id = objectIdStr;
				regObj.swfVersion = swfVersionStr;
				regObj.expressInstall = xiSwfUrlStr;
				regObj.callbackFn = callbackFn;
				regObjArr[regObjArr.length] = regObj;
				setVisibility(objectIdStr, false);
			}
			else if (callbackFn) {
				callbackFn({success:false, id:objectIdStr});
			}
		},
		
		getObjectById: function(objectIdStr) {
			if (ua.w3) {
				return getObjectById(objectIdStr);
			}
		},
		
		embedSWF: function(swfUrlStr, replaceElemIdStr, widthStr, heightStr, swfVersionStr, xiSwfUrlStr, flashvarsObj, parObj, attObj, callbackFn) {
			var callbackObj = {success:false, id:replaceElemIdStr};
			if (ua.w3 && !(ua.wk && ua.wk < 312) && swfUrlStr && replaceElemIdStr && widthStr && heightStr && swfVersionStr) {
				setVisibility(replaceElemIdStr, false);
				addDomLoadEvent(function() {
					widthStr += ""; // auto-convert to string
					heightStr += "";
					var att = {};
					if (attObj && typeof attObj === OBJECT) {
						for (var i in attObj) { // copy object to avoid the use of references, because web authors often reuse attObj for multiple SWFs
							att[i] = attObj[i];
						}
					}
					att.data = swfUrlStr;
					att.width = widthStr;
					att.height = heightStr;
					var par = {}; 
					if (parObj && typeof parObj === OBJECT) {
						for (var j in parObj) { // copy object to avoid the use of references, because web authors often reuse parObj for multiple SWFs
							par[j] = parObj[j];
						}
					}
					if (flashvarsObj && typeof flashvarsObj === OBJECT) {
						for (var k in flashvarsObj) { // copy object to avoid the use of references, because web authors often reuse flashvarsObj for multiple SWFs
							if (typeof par.flashvars != UNDEF) {
								par.flashvars += "&" + k + "=" + flashvarsObj[k];
							}
							else {
								par.flashvars = k + "=" + flashvarsObj[k];
							}
						}
					}
					if (hasPlayerVersion(swfVersionStr)) { // create SWF
						var obj = createSWF(att, par, replaceElemIdStr);
						if (att.id == replaceElemIdStr) {
							setVisibility(replaceElemIdStr, true);
						}
						callbackObj.success = true;
						callbackObj.ref = obj;
					}
					else if (xiSwfUrlStr && canExpressInstall()) { // show Adobe Express Install
						att.data = xiSwfUrlStr;
						showExpressInstall(att, par, replaceElemIdStr, callbackFn);
						return;
					}
					else { // show alternative content
						setVisibility(replaceElemIdStr, true);
					}
					if (callbackFn) { callbackFn(callbackObj); }
				});
			}
			else if (callbackFn) { callbackFn(callbackObj);	}
		},
		
		switchOffAutoHideShow: function() {
			autoHideShow = false;
		},
		
		ua: ua,
		
		getFlashPlayerVersion: function() {
			return { major:ua.pv[0], minor:ua.pv[1], release:ua.pv[2] };
		},
		
		hasFlashPlayerVersion: hasPlayerVersion,
		
		createSWF: function(attObj, parObj, replaceElemIdStr) {
			if (ua.w3) {
				return createSWF(attObj, parObj, replaceElemIdStr);
			}
			else {
				return undefined;
			}
		},
		
		showExpressInstall: function(att, par, replaceElemIdStr, callbackFn) {
			if (ua.w3 && canExpressInstall()) {
				showExpressInstall(att, par, replaceElemIdStr, callbackFn);
			}
		},
		
		removeSWF: function(objElemIdStr) {
			if (ua.w3) {
				removeSWF(objElemIdStr);
			}
		},
		
		createCSS: function(selStr, declStr, mediaStr, newStyleBoolean) {
			if (ua.w3) {
				createCSS(selStr, declStr, mediaStr, newStyleBoolean);
			}
		},
		
		addDomLoadEvent: addDomLoadEvent,
		
		addLoadEvent: addLoadEvent,
		
		getQueryParamValue: function(param) {
			var q = doc.location.search || doc.location.hash;
			if (q) {
				if (/\?/.test(q)) { q = q.split("?")[1]; } // strip question mark
				if (param == null) {
					return urlEncodeIfNecessary(q);
				}
				var pairs = q.split("&");
				for (var i = 0; i < pairs.length; i++) {
					if (pairs[i].substring(0, pairs[i].indexOf("=")) == param) {
						return urlEncodeIfNecessary(pairs[i].substring((pairs[i].indexOf("=") + 1)));
					}
				}
			}
			return "";
		},
		
		// For internal usage only
		expressInstallCallback: function() {
			if (isExpressInstallActive) {
				var obj = getElementById(EXPRESS_INSTALL_ID);
				if (obj && storedAltContent) {
					obj.parentNode.replaceChild(storedAltContent, obj);
					if (storedAltContentId) {
						setVisibility(storedAltContentId, true);
						if (ua.ie && ua.win) { storedAltContent.style.display = "block"; }
					}
					if (storedCallbackFn) { storedCallbackFn(storedCallbackObj); }
				}
				isExpressInstallActive = false;
			} 
		}
	};
}();

//##############################################################################
// FlashAudioLoader.js
//##############################################################################

this.createjs = this.createjs || {};

(function () {
	"use strict";

	/**
	 * Loader provides a mechanism to preload Flash content via PreloadJS or internally. Instances are returned to
	 * the preloader, and the load method is called when the asset needs to be requested.
	 *
	 * @class FlashAudioLoader
	 * @param {String} loadItem The item to be loaded
	 * @param {Object} flash The flash instance that will do the preloading.
	 * @extends AbstractLoader
	 * @protected
	 */
	function Loader(loadItem) {
		this.AbstractLoader_constructor(loadItem, false, createjs.AbstractLoader.SOUND);


// Public properties
		/**
		 * ID used to facilitate communication with flash.
		 * Not doc'd because this should not be altered externally
		 * @property flashId
		 * @type {String}
		 */
		this.flashId = null;

	}
	var p = createjs.extend(Loader, createjs.AbstractLoader);

	// TODO: deprecated
	// p.initialize = function() {}; // searchable for devs wondering where it is. REMOVED. See docs for details.


// Static Properties
	var s = Loader;
	/**
	 * A reference to the Flash instance that gets created.
	 * @property flash
	 * @type {Object | Embed}
	 * @protected
	 */
	s._flash = null;

	/**
	 * A list of loader instances that tried to load before _flash was set
	 * @property _preloadInstances
	 * @type {Array}
	 * @protected
	 */
	s._preloadInstances = [];

	/**
	 * Set the Flash instance on the class, and start loading on any instances that had load called
	 * before flash was ready
	 * @method setFlash
	 * @param flash Flash instance that handles loading and playback
	 */
	s.setFlash = function(flash) {
		s._flash = flash;
		for(var i = s._preloadInstances.length; i--; ) {
			var loader = s._preloadInstances.pop();
			loader.load();
		}
	};

// public methods
	p.load = function () {
		if (s._flash == null) {
			// register for future preloading
			s._preloadInstances.push(this);
			return;
		}

		this.flashId = s._flash.preload(this._item.src);
		// Associate this preload instance with the FlashID, so callbacks can route here.
		var e = new createjs.Event(createjs.FlashAudioPlugin._REG_FLASHID);
		this.dispatchEvent(e);
	};

	/**
	 * called from flash when loading has progress
	 * @method handleProgress
	 * @param loaded
	 * @param total
	 * @protected
	 */
	p.handleProgress = function (loaded, total) {
		this._sendProgress(loaded/total);
	};

	/**
	 * Called from Flash when sound is loaded.  Set our ready state and fire callbacks / events
	 * @method handleComplete
	 * @protected
	 */
	p.handleComplete = function () {
		this._result = this._item.src;
		this._sendComplete();
	};

	/**
	 * Receive error event from flash and pass it to callback.
	 * @method handleError
	 * @param {Event} error
	 * @protected
	 */
	p.handleError = function (error) {
		this._handleError(error);
	};

	p.destroy = function () {
		var e = new createjs.Event(createjs.FlashAudioPlugin._UNREG_FLASHID);
		this.dispatchEvent(e);
		this.AbstractLoader_destroy();
	};

	p.toString = function () {
		return "[FlashAudioLoader]";
	};

	createjs.FlashAudioLoader = createjs.promote(Loader, "AbstractLoader");

}());

//##############################################################################
// FlashAudioSoundInstance.js
//##############################################################################

this.createjs = this.createjs || {};

(function () {
	"use strict";

	/**
	 * FlashAudioSoundInstance extends the base api of {{#crossLink "AbstractSoundInstance"}}{{/crossLink}} and is used by
	 * {{#crossLink "FlashAudioPlugin"}}{{/crossLink}}.
	 *
	 * NOTE audio control is shuttled to a flash player instance via the flash reference.
	 *
	 * @param {String} src The path to and file name of the sound.
	 * @param {Number} startTime Audio sprite property used to apply an offset, in milliseconds.
	 * @param {Number} duration Audio sprite property used to set the time the clip plays for, in milliseconds.
	 * @param {Object} playbackResource Any resource needed by plugin to support audio playback.
	 * @class FlashAudioSoundInstance
	 * @extends AbstractSoundInstance
	 * @constructor
	 */
	function FlashAudioSoundInstance(src, startTime, duration, playbackResource) {
		this.AbstractSoundInstance_constructor(src, startTime, duration, playbackResource);


// Public Properties
		/**
		 * ID used to facilitate communication with flash.
		 * Not doc'd because this should not be altered externally
		 * #property flashId
		 * @type {String}
		 */
		this.flashId = null; // To communicate with Flash

		if(s._flash == null) { s._instances.push(this); }
	};
	var p = createjs.extend(FlashAudioSoundInstance, createjs.AbstractSoundInstance);

	// TODO: deprecated
	// p.initialize = function() {}; // searchable for devs wondering where it is. REMOVED. See docs for details.


// Static Propeties
	var s = FlashAudioSoundInstance;
	/**
	 * A reference to the Flash instance that gets created.
	 * #property flash
	 * @type {Object | Embed}
	 */
	s._flash = null;

	/**
	 * A list of loader instances that tried to load before _flash was set
	 * #property _preloadInstances
	 * @type {Array}
	 * @private
	 */
	s._instances = [];

	/**
	 * Set the Flash instance on the class, and start loading on any instances that had load called
	 * before flash was ready
	 * #method setFlash
	 * @param flash Flash instance that handles loading and playback
	 */
	s.setFlash = function(flash) {
		s._flash = flash;
		for(var i = s._instances.length; i--; ) {
			var o = s._instances.pop();
			o._setDurationFromSource();
		}
	};


// Public Methods
	// TODO change flash.setLoop to mimic remove and add??
	p.setLoop = function (value) {
		if(this.flashId!= null) {
			s._flash.setLoop(this.flashId, value);
		}
		this._loop = value;
	};

	p.toString = function () {
		return "[FlashAudioSoundInstance]"
	};


// Private Methods
	p._updateVolume = function() {
		if (this.flashId == null) { return; }
		s._flash.setVolume(this.flashId, this._volume)
	};

	p._updatePan = function () {
		if (this.flashId == null) { return; }
		s._flash.setPan(this.flashId, this._pan);
	};

	p._setDurationFromSource = function() {
		this._duration = s._flash.getDurationBySrc(this.src);
	};

	p._interrupt = function () {
		if(this.flashId == null) { return; }
		s._flash.interrupt(this.flashId);	// OJR this is redundant, cleanup calls stop that does the same thing anyway
		this.AbstractSoundInstance__interrupt();
	};

	p._handleCleanUp = function () {
		s._flash.stopSound(this.flashId);

		this._sendEvent(createjs.FlashAudioPlugin._UNREG_FLASHID);
		this.flashId = null;
	};

	p._beginPlaying = function (playProps) {
		if (s._flash == null) { return false; }

		this.setPosition(playProps.offset);
		this.setLoop(playProps.loop);
		this.setVolume(playProps.volume);
		this.setPan(playProps.pan);
		if (playProps.startTime != null) {
			this.setStartTime(playProps.startTime);
			this.setDuration(playProps.duration);
		}
		this._paused = false;

		this.flashId = s._flash.playSound(this.src, this._position, this._loop, this._volume, this._pan, this._startTime, this._duration);
		if (this.flashId == null) {
			this._playFailed();
			return false;
		}

		if (this._muted) {this.setMute(true);}
		this._sendEvent(createjs.FlashAudioPlugin._REG_FLASHID);

		this.playState = createjs.Sound.PLAY_SUCCEEDED;
		this._sendEvent("succeeded");
		return true;
	};

	p._pause = function () {
		if(this.flashId == null) { return; }
		this._position = this._calculateCurrentPosition();
		s._flash.pauseSound(this.flashId);
	};

	p._resume = function () {
		if(this.flashId == null) { return; }
		s._flash.resumeSound(this.flashId);
	};

	p._handleStop = function () {
		if(this.flashId == null) { return; }
		s._flash.stopSound(this.flashId);
	};

	p._updateVolume = function () {
		var newVolume = this._muted ? 0 : this._volume;
		s._flash.setVolume(this.flashId, newVolume);
	};
	// TODO remove unused .muteSound and .unmuteSound from Flash

	p._calculateCurrentPosition = function() {
		return s._flash.getPosition(this.flashId);
	};

	p._updatePosition = function() {
		if(this.flashId == null) { return; }
		s._flash.setPosition(this.flashId, this._position);
	};

// Flash callbacks, only exist in FlashAudioPlugin
	/**
	 * Called from Flash.  Lets us know flash has finished playing a sound.
	 * #method handleSoundFinished
	 * @protected
	 */
	p.handleSoundFinished = function () {
		this._loop = 0;
		this._handleSoundComplete();
	};

	/**
	 * Called from Flash.  Lets us know that flash has played a sound to completion and is looping it.
	 * #method handleSoundLoop
	 * @protected
	 */
	p.handleSoundLoop = function () {
		this._loop--;
		this._sendEvent("loop");
	};

	createjs.FlashAudioSoundInstance = createjs.promote(FlashAudioSoundInstance, "AbstractSoundInstance");
}());

//##############################################################################
// FlashAudioPlugin.js
//##############################################################################

this.createjs = this.createjs || {};

(function () {

	"use strict";

	/**
	 * Play sounds using a Flash instance. This plugin is not used by default, and must be registered manually in
	 * {{#crossLink "Sound"}}{{/crossLink}} using the {{#crossLink "Sound/registerPlugins"}}{{/crossLink}} method. This
	 * plugin is recommended to be included if sound support is required in older browsers such as IE8.
	 *
	 * This plugin requires FlashAudioPlugin.swf and swfObject.js, which is compiled
	 * into the minified FlashAudioPlugin-X.X.X.min.js file. You must ensure that {{#crossLink "FlashAudioPlugin/swfPath:property"}}{{/crossLink}}
	 * is set when using this plugin, so that the script can find the swf.
	 *
	 * <h4>Example</h4>
	 *
	 *      createjs.FlashAudioPlugin.swfPath = "../src/soundjs/flashaudio";
	 *      createjs.Sound.registerPlugins([createjs.WebAudioPlugin, createjs.HTMLAudioPlugin, createjs.FlashAudioPlugin]);
	 *      // Adds FlashAudioPlugin as a fallback if WebAudio and HTMLAudio do not work.
	 *
	 * Note that the SWF is embedded into a container DIV (with an id and classname of "SoundJSFlashContainer"), and
	 * will have an id of "flashAudioContainer". The container DIV is positioned 1 pixel off-screen to the left to avoid
	 * showing the 1x1 pixel white square.
	 *
	 * <h4>Known Browser and OS issues for Flash Audio</h4>
	 * <b>All browsers</b><br />
	 * <ul><li> There can be a delay in flash player starting playback of audio.  This has been most noticeable in Firefox.
	 * Unfortunely this is an issue with the flash player and the browser and therefore cannot be addressed by SoundJS.</li></ul>
	 *
	 * @class FlashAudioPlugin
	 * @extends AbstractPlugin
	 * @constructor
	 */
	function FlashAudioPlugin() {
		this.AbstractPlugin_constructor();


// Public Properties
		/**
		 * A developer flag to output all flash events to the console (if it exists).  Used for debugging.
		 *
		 *      createjs.Sound.activePlugin.showOutput = true;
		 *
		 * @property showOutput
		 * @type {Boolean}
		 * @default false
		 */
		this.showOutput = false;


//Private Properties
		/**
		 * The id name of the DIV that gets created for Flash content.
		 * @property _CONTAINER_ID
		 * @type {String}
		 * @default flashAudioContainer
		 * @protected
		 */
		this._CONTAINER_ID = "flashAudioContainer";

		/**
		 * The id name of the DIV wrapper that contains the Flash content.
		 * @property _WRAPPER_ID
		 * @type {String}
		 * @default SoundJSFlashContainer
		 * @protected
		 * @since 0.4.1
		 */
		this._WRAPPER_ID = "SoundJSFlashContainer";

		/**
		 * A reference to the DIV container that gets created to hold the Flash instance.
		 * @property _container
		 * @type {HTMLDivElement}
		 * @protected
		 */
		this._container = null,

		/**
		 * A reference to the Flash instance that gets created.
		 * @property flash
		 * @type {Object | Embed}
		 * @protected
		 */
		this._flash = null;

		/**
		 * Determines if the Flash object has been created and initialized. This is required to make <code>ExternalInterface</code>
		 * calls from JavaScript to Flash.
		 * @property flashReady
		 * @type {Boolean}
		 * @default false
		 */
		this.flashReady = false;

		/**
		 * A hash of SoundInstances indexed by the related ID in Flash. This lookup is required to connect sounds in
		 * JavaScript to their respective instances in Flash.
		 * @property _flashInstances
		 * @type {Object}
		 * @protected
		 */
		this._flashInstances = {};

		/**
		 * A hash of Sound Preload instances indexed by the related ID in Flash. This lookup is required to connect
		 * a preloading sound in Flash with its respective instance in JavaScript.
		 * @property _flashPreloadInstances
		 * @type {Object}
		 * @protected
		 */
		this._flashPreloadInstances = {};
		//TODO consider combining _flashInstances and _flashPreloadInstances into a single hash

		this._capabilities = s._capabilities;

		this._loaderClass = createjs.FlashAudioLoader;
		this._soundInstanceClass = createjs.FlashAudioSoundInstance;

		// Create DIV
		var w = this.wrapper = document.createElement("div");
		w.id = this._WRAPPER_ID;
		w.style.position = "absolute";
		w.style.marginLeft = "-1px";
		w.className = this._WRAPPER_ID;
		document.body.appendChild(w);

		// Create Placeholder
		var c = this._container = document.createElement("div");
		c.id = this._CONTAINER_ID;
		c.appendChild(document.createTextNode("SoundJS Flash Container"));
		w.appendChild(c);

		var path = s.swfPath;
		var val = swfobject.embedSWF(path + "FlashAudioPlugin.swf", this._CONTAINER_ID, "1", "1",
				"9.0.0", null, null, {"AllowScriptAccess" : "always"}, null,
				createjs.proxy(this._handleSWFReady, this)
		);
	};

	var p = createjs.extend(FlashAudioPlugin, createjs.AbstractPlugin);
	var s = FlashAudioPlugin;

	// TODO: deprecated
	// p.initialize = function() {}; // searchable for devs wondering where it is. REMOVED. See docs for details.


// Static properties
	/**
	 * Event constant for the "registerFlashID" event for cleaner code.
	 * @property _REG_FLASHID
	 * @type {String}
	 * @default registerflashid
	 * @static
	 * @protected
	 */
	s._REG_FLASHID = "registerflashid";

	/**
	 * Event constant for the "unregisterFlashID" event for cleaner code.
	 * @property _UNREG_FLASHID
	 * @type {String}
	 * @default unregisterflashid
	 * @static
	 * @protected
	 */
	s._UNREG_FLASHID = "unregisterflashid";

	/**
	 * The capabilities of the plugin. This is generated via the {{#crossLink "WebAudioPlugin/_generateCapabilities"}}{{/crossLink}}
	 * method. Please see the Sound {{#crossLink "Sound/getCapabilities"}}{{/crossLink}} method for a list of available
	 * capabilities.
	 * @property _capabilities
	 * @type {Object}
	 * @protected
	 * @static
	 */
	s._capabilities = null;

	/**
	 * The path relative to the HTML page that the FlashAudioPlugin.swf resides. Note if this is not correct, this
	 * plugin will not work.
	 * @property swfPath
	 * @type {String}
	 * @default src/SoundJS
	 * @static
	 * @since 0.5.2
	 */
	s.swfPath = "src/soundjs/flashaudio/";


// Static Methods
	/**
	 * Determine if the plugin can be used in the current browser/OS.
	 * @method isSupported
	 * @return {Boolean} If the plugin can be initialized.
	 * @static
	 */
	s.isSupported = function () {
		// there is no flash player on mobile devices
		if (createjs.BrowserDetect.isIOS || createjs.BrowserDetect.isAndroid || createjs.BrowserDetect.isBlackberry || createjs.BrowserDetect.isWindowsPhone) {return false;}
		s._generateCapabilities();
		if (swfobject == null) {return false;}
		return swfobject.hasFlashPlayerVersion("9.0.0");
	};

	/**
	 * Determine the capabilities of the plugin. Used internally. Please see the Sound API {{#crossLink "Sound/getCapabilities"}}{{/crossLink}}
	 * method for an overview of plugin capabilities.
	 * @method _generateCapabilities
	 * @static
	 * @protected
	 */
	s._generateCapabilities = function () {
		if (s._capabilities != null) {return;}
		var c = s._capabilities = {
			panning:true,
			volume:true,
			tracks:-1,
			mp3:true,
			ogg:false,
			mpeg:true,
			wav:true,
			// our current implementation cannot support mp4 http://forums.adobe.com/thread/825408
			m4a:false,
			mp4:false,
			aiff:false, // not listed in player but is Supported by Flash so this may be true
			wma:false,
			mid:false
		};
	};


//public methods
	p.register = function (src, instances) {
		var loader = this.AbstractPlugin_register(src, instances);
		loader.addEventListener(s._REG_FLASHID, createjs.proxy(this.registerPreloadInstance, this));
		loader.addEventListener(s._UNREG_FLASHID, createjs.proxy(this.unregisterPreloadInstance, this));
		return loader;
	};

	p.removeAllSounds = function () {
		this._flashInstances = {};
		this._flashPreloadInstances = {};
		// NOTE sound cannot be removed from a swf

		this.AbstractPlugin_removeAllSounds();
	};

	p.create = function (src, startTime, duration) {
		var si = this.AbstractPlugin_create(src, startTime, duration);
		si.on(s._REG_FLASHID, this.registerSoundInstance, this);
		si.on(s._UNREG_FLASHID, this.unregisterSoundInstance, this);
		return si;
	};

	p.toString = function () {
		return "[FlashAudioPlugin]";
	};


// private methods
	/**
	 * The SWF used for sound preloading and playback has been initialized.
	 * @method _handleSWFReady
	 * @param {Object} event Contains a reference to the swf.
	 * @protected
	 */
	p._handleSWFReady = function (event) {
		this._flash = event.ref;
	};

	/**
	 * The Flash application that handles preloading and playback is ready. We wait for a callback from Flash to
	 * ensure that everything is in place before playback begins.
	 * @method _handleFlashReady
	 * @protected
	 */
	p._handleFlashReady = function () {
		this.flashReady = true;

		this._loaderClass.setFlash(this._flash);
		this._soundInstanceClass.setFlash(this._flash);
	};

	/**
	 * Internal function used to set the gain value for master audio.  Should not be called externally.
	 * @method _updateVolume
	 * @return {Boolean}
	 * @protected
	 * @since 0.4.0
	 */
	p._updateVolume = function () {
		var newVolume = createjs.Sound._masterMute ? 0 : this._volume;
		return this._flash.setMasterVolume(newVolume);
	};


// Flash Communication
// Note we have decided not to include these in the docs
	/*
	 * Used to couple a Flash loader instance with a <code>Loader</code> instance
	 * @method registerPreloadInstance
	 * @param {String} flashId Used to identify the Loader.
	 * @param {Loader} instance The actual instance.
	 */
	p.registerPreloadInstance = function (event) {
		this._flashPreloadInstances[event.target.flashId] = event.target;
	};

	/*
	 * Used to decouple a <code>Loader</code> instance from Flash.
	 * @method unregisterPreloadInstance
	 * @param {String} flashId Used to identify the Loader.
	 */
	p.unregisterPreloadInstance = function (event) {
		delete this._flashPreloadInstances[event.target.flashId];
	};

	/*
	 * Used to couple a Flash sound instance with a {{#crossLink "FlashAudioSoundInstance"}}{{/crossLink}}.
	 * @method registerSoundInstance
	 * @param {String} flashId Used to identify the FlashAudioSoundInstance.
	 * @param {Loader} instance The actual instance.
	 */
	p.registerSoundInstance = function (event) {
		this._flashInstances[event.target.flashId] = event.target;
	};

	/*
	 * Used to decouple a {{#crossLink "FlashAudioSoundInstance"}}{{/crossLink}} from Flash.
	 * instance.
	 * @method unregisterSoundInstance
	 * @param {String} flashId Used to identify the FlashAudioSoundInstance.
	 * @param {Loader} instance The actual instance.
	 */
	p.unregisterSoundInstance = function (event) {
		delete this._flashInstances[event.target.flashId];
	};

	/*
	 * Used to output traces from Flash to the console, if {{#crossLink "FlashAudioPlugin/showOutput"}}{{/crossLink}} is
	 * <code>true</code>.
	 * @method flashLog
	 * @param {String} data The information to be output.
	 */
	p.flashLog = function (data) {
		try {
			this.showOutput && console.log(data);
		} catch (error) {
			// older IE will cause error if console is not open
		}
	};

	/*
	 * Handles events from Flash, and routes communication to a {{#crossLink "FlashAudioSoundInstance"}}{{/crossLink}} via
	 * the Flash ID. The method and arguments from Flash are run directly on the loader or sound instance.
	 * @method handleSoundEvent
	 * @param {String} flashId Used to identify the FlashAudioSoundInstance.
	 * @param {String} method Indicates the method to run.
	 */
	p.handleSoundEvent = function (flashId, method) {
		var instance = this._flashInstances[flashId];
		if (instance == null) {return;}
		var args = [];
		for (var i = 2, l = arguments.length; i < l; i++) {
			args.push(arguments[i]);
		}
		try {
			if (args.length == 0) {
				instance[method]();
			} else {
				instance[method].apply(instance, args);
			}
		} catch (error) {
		}
	};

	/*
	 * Handles events from Flash and routes communication to a <code>Loader</code> via the Flash ID. The method
	 * and arguments from Flash are run directly on the sound loader.
	 * @method handlePreloadEvent
	 * @param {String} flashId Used to identify the loader instance.
	 * @param {String} method Indicates the method to run.
	 */
	p.handlePreloadEvent = function (flashId, method) {
		var instance = this._flashPreloadInstances[flashId];
		if (instance == null) {
			return;
		}
		var args = [];
		for (var i = 2, l = arguments.length; i < l; i++) {
			args.push(arguments[i]);
		}
		try {
			if (args.length == 0) {
				instance[method]();
			} else {
				instance[method].apply(instance, args);
			}
		} catch (error) {
		}
	};

	/*
	 * Handles events from Flash intended for the FlashAudioPlugin class. Currently only a "ready" event is processed.
	 * @method handleEvent
	 * @param {String} method Indicates the method to run.
	 */
	p.handleEvent = function (method) {
		switch (method) {
			case "ready":
				this._handleFlashReady();
				break;
		}
	};

	/*
	 * Handles error events from Flash. Note this function currently does not process any events.
	 * @method handleErrorEvent
	 * @param {String} error Indicates the error.
	 */
	p.handleErrorEvent = function (error) {

	};

	createjs.FlashAudioPlugin = createjs.promote(FlashAudioPlugin, "AbstractPlugin");
}());

//##############################################################################
// version_flashplugin.js
//##############################################################################

this.createjs = this.createjs || {};

(function () {

	var s = createjs.FlashAudioPlugin = createjs.FlashAudioPlugin || {};

	/**
	 * The version string for this release.
	 * @for FlashAudioPlugin
	 * @property version
	 * @type String
	 * @static
	 **/
	s.version = /*=version*/"0.6.2"; // injected by build process

	/**
	 * The build date for this release in UTC format.
	 * @for FlashAudioPlugin
	 * @property buildDate
	 * @type String
	 * @static
	 **/
	s.buildDate = /*=date*/"Thu, 26 Nov 2015 20:44:31 GMT"; // injected by build process

})();