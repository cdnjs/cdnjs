webshims.register('swfmini-embed', function($, webshims){
	var swfmini = window.swfmini;
	var objIdArr = [];
	var ua = swfmini.ua;
	var doc = document;
	var FLASH_MIME_TYPE = "application/x-shockwave-flash";

	var UNDEF = "undefined";
	var OBJECT = "object";
	var hasPlayerVersion = swfmini.hasFlashPlayerVersion;

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



	function createElement(el) {
		return doc.createElement(el);
	}

	function createObjParam(el, pName, pValue) {
		var p = createElement("param");
		p.setAttribute("name", pName);
		p.setAttribute("value", pValue);
		el.appendChild(p);
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

	swfmini.embedSWF = function(swfUrlStr, replaceElemIdStr, widthStr, heightStr, swfVersionStr, xiSwfUrlStr, flashvarsObj, parObj, attObj, callbackFn) {
		var callbackObj = {success:false, id:replaceElemIdStr};
		if (ua.w3 && !(ua.wk && ua.wk < 312) && swfUrlStr && replaceElemIdStr && widthStr && heightStr && swfVersionStr) {
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

				callbackObj.success = true;
				callbackObj.ref = obj;
			}
			if (callbackFn) { callbackFn(callbackObj); }
		}
		else if (callbackFn) { callbackFn(callbackObj);	}
	};
});
