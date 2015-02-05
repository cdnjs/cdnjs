/*! respimage - v1.1.6 - 2014-11-20
 Licensed MIT */
!function(window, document, undefined) {
	"use strict";
	function trim(str) {
		return str.trim ? str.trim() : str.replace(/^\s+|\s+$/g, "");
	}
	function updateMetrics() {
		var dprM;
		(isVwDirty || DPR != window.devicePixelRatio) && (isVwDirty = !1, DPR = window.devicePixelRatio,
			cssCache = {}, sizeLengthCache = {}, dprM = (DPR || 1) * cfg.xQuant, cfg.uT || (dprM = Math.min(dprM, 3),
		dprM > 1.4 && (dprM = Math.round(dprM / (1 + (dprM - 1.4) / 12) * 100) / 100), ri.DPR = dprM),
			tLow = cfg.tLow * dprM, greed = cfg.greed / 2, greed += greed * dprM, tHigh = cfg.tHigh,
			tMemory = 2 + dprM, units.width = Math.max(window.innerWidth || 0, docElem.clientWidth),
			units.height = Math.max(window.innerHeight || 0, docElem.clientHeight), isLandscape = units.width > units.height,
			units.vw = units.width / 100, units.vh = units.height / 100, units.em = ri.getEmValue(),
			units.rem = units.em);
	}
	function parseDescriptor(descriptor) {
		if (!(descriptor in memDescriptor)) {
			var descriptorObj = {
				val: 1,
				type: "x"
			}, parsedDescriptor = trim(descriptor || "");
			parsedDescriptor && (parsedDescriptor = parsedDescriptor.replace(regHDesc, ""),
				parsedDescriptor.match(regDescriptor) ? (descriptorObj.val = 1 * RegExp.$1, descriptorObj.type = RegExp.$2) : descriptorObj = !1),
				memDescriptor[descriptor] = descriptorObj;
		}
		return memDescriptor[descriptor];
	}
	function chooseLowRes(lowRes, diff, dpr) {
		var add = diff * greed * lowRes;
		return isLandscape || (add /= 1.5), lowRes += add, diff > tHigh && (lowRes += tLow),
		lowRes > dpr;
	}
	function inView(el) {
		if (!el.getBoundingClientRect) return !0;
		var bottom, right, left, top, rect = el.getBoundingClientRect();
		return !!((bottom = rect.bottom) >= -9 && (top = rect.top) <= units.height + 9 && (right = rect.right) >= -9 && (left = rect.left) <= units.height + 9 && (bottom || right || left || top));
	}
	function applyBestCandidate(img) {
		var srcSetCandidates, matchingSet = ri.getSet(img), evaluated = !1;
		"pending" != matchingSet && (evaluated = !0, matchingSet && (srcSetCandidates = ri.setRes(matchingSet),
			evaluated = ri.applySetCandidate(srcSetCandidates, img))), img[ri.ns].evaled = evaluated;
	}
	function ascendingSort(a, b) {
		return a.res - b.res;
	}
	function setSrcToCur(img, src, set) {
		var candidate;
		return !set && src && (set = img[ri.ns].sets, set = set && set[set.length - 1]),
			candidate = getCandidateForSrc(src, set), candidate && (src = ri.makeUrl(src), img[ri.ns].curSrc = src,
			img[ri.ns].curCan = candidate, candidate.res || setResolution(candidate, candidate.set.sizes)),
			candidate;
	}
	function getCandidateForSrc(src, set) {
		var i, candidate, candidates;
		if (src && set) for (candidates = ri.parseSet(set), src = ri.makeUrl(src), i = 0; i < candidates.length; i++) if (src == ri.makeUrl(candidates[i].url)) {
			candidate = candidates[i];
			break;
		}
		return candidate;
	}
	function hasOneX(set) {
		var i, ret, candidates, desc;
		if (set) for (candidates = ri.parseSet(set), i = 0; i < candidates.length; i++) if (desc = candidates[i].desc,
			"x" == desc.type && 1 == desc.val) {
			ret = !0;
			break;
		}
		return ret;
	}
	function hasWDescripor(set) {
		if (!set) return !1;
		var candidates = ri.parseSet(set);
		return candidates[0] && "w" == candidates[0].desc.type;
	}
	function getAllSourceElements(picture, candidates) {
		var i, len, source, srcset, sources = picture.getElementsByTagName("source");
		for (i = 0, len = sources.length; len > i; i++) source = sources[i], source[ri.ns] = !0,
			srcset = source.getAttribute("srcset"), srcset && candidates.push({
			srcset: srcset,
			media: source.getAttribute("media"),
			type: source.getAttribute("type"),
			sizes: source.getAttribute("sizes")
		});
	}
	function setResolution(candidate, sizesattr) {
		var descriptor = candidate.desc;
		return "w" == descriptor.type ? (candidate.cWidth = ri.calcListLength(sizesattr || "100vw"),
			candidate.res = descriptor.val / candidate.cWidth) : candidate.res = descriptor.val,
			candidate;
	}
	document.createElement("picture");
	var ri = {}, noop = function() {}, image = document.createElement("img"), getImgAttr = image.getAttribute, setImgAttr = image.setAttribute, removeImgAttr = image.removeAttribute, docElem = document.documentElement, types = {}, cfg = {
		xQuant: 1,
		tLow: .1,
		tHigh: .6,
		tLazy: .33,
		greed: .5
	}, srcAttr = "data-risrc", srcsetAttr = srcAttr + "set", supportAbort = /rident/.test(navigator.userAgent), curSrcProp = "currentSrc";
	ri.ns = ("ri" + new Date().getTime()).substr(0, 9), curSrcProp in image || (curSrcProp = "src"),
		ri.supSrcset = "srcset" in image, ri.supSizes = "sizes" in image, ri.selShort = "picture>img,img[srcset]",
		ri.sel = ri.selShort, ri.cfg = cfg, ri.supSrcset && (ri.sel += ",img[" + srcsetAttr + "]");
	var anchor = document.createElement("a");
	ri.makeUrl = function(src) {
		return anchor.href = src, anchor.href;
	}, ri.qsa = function(context, sel) {
		return context.querySelectorAll(sel);
	};
	{
		var on = function(obj, evt, fn, capture) {
			obj.addEventListener ? obj.addEventListener(evt, fn, capture || !1) : obj.attachEvent && obj.attachEvent("on" + evt, fn);
		}, off = function(obj, evt, fn, capture) {
			obj.removeEventListener ? obj.removeEventListener(evt, fn, capture || !1) : obj.detachEvent && obj.detachEvent("on" + evt, fn);
		};
		"https:" == location.protocol;
	}
	ri.matchesMedia = function() {
		return ri.matchesMedia = window.matchMedia && (matchMedia("(min-width: 0.1em)") || {}).matches ? function(media) {
			return !media || matchMedia(media).matches;
		} : ri.mMQ, ri.matchesMedia.apply(this, arguments);
	};
	var tLow, greed, tHigh, tMemory, isWinComplete, isLandscape, isVwDirty = !0, cssCache = {}, sizeLengthCache = {}, DPR = window.devicePixelRatio, units = {
		px: 1,
		"in": 96
	};
	ri.DPR = DPR || 1, ri.u = units, ri.mMQ = function(media) {
		return media ? evalCSS(media) : !0;
	};
	var evalCSS = function() {
		var cache = {}, regLength = /^([\d\.]+)(em|vw|px)$/, replace = function() {
			for (var args = arguments, index = 0, string = args[0]; ++index in args; ) string = string.replace(args[index], args[++index]);
			return string;
		}, buidlStr = function(css) {
			return cache[css] || (cache[css] = "return " + replace((css || "").toLowerCase(), /\band\b/g, "&&", /,/g, "||", /min-([a-z-\s]+):/g, "e.$1>=", /max-([a-z-\s]+):/g, "e.$1<=", /calc([^)]+)/g, "($1)", /(\d+[\.]*[\d]*)([a-z]+)/g, "($1 * e.$2)", /^(?!(e.[a-z]|[0-9\.&=|><\+\-\*\(\)\/])).*/gi, "") + ";"),
				cache[css];
		};
		return function(css, length) {
			var parsedLength;
			if (!(css in cssCache)) if (cssCache[css] = !1, length && (parsedLength = css.match(regLength))) cssCache[css] = parsedLength[1] * units[parsedLength[2]]; else try {
				cssCache[css] = new Function("e", buidlStr(css))(units);
			} catch (e) {}
			return cssCache[css];
		};
	}();
	ri.calcLength = function(sourceSizeValue) {
		var value = evalCSS(sourceSizeValue, !0) || !1;
		return 0 > value && (value = !1), value;
	}, ri.types = types, types["image/jpeg"] = !0, types["image/gif"] = !0, types["image/png"] = !0,
		types["image/svg+xml"] = document.implementation.hasFeature("http://wwwindow.w3.org/TR/SVG11/feature#Image", "1.1"),
		ri.supportsType = function(type) {
			return type ? types[type] : !0;
		};
	var regSize = /(\([^)]+\))?\s*(.+)/, memSize = {};
	ri.parseSize = function(sourceSizeStr) {
		var match;
		return memSize[sourceSizeStr] || (match = (sourceSizeStr || "").match(regSize),
			memSize[sourceSizeStr] = {
				media: match && match[1],
				length: match && match[2]
			}), memSize[sourceSizeStr];
	}, ri.parseSet = function(set) {
		if (!set.cands) {
			var pos, url, descriptor, last, descpos, srcset = set.srcset;
			for (set.cands = []; srcset; ) srcset = srcset.replace(/^\s+/g, ""), pos = srcset.search(/\s/g),
				descriptor = null, -1 != pos ? (url = srcset.slice(0, pos), last = url.charAt(url.length - 1),
			"," != last && url || (url = url.replace(/,+$/, ""), descriptor = ""), srcset = srcset.slice(pos + 1),
			null == descriptor && (descpos = srcset.indexOf(","), -1 != descpos ? (descriptor = srcset.slice(0, descpos),
				srcset = srcset.slice(descpos + 1)) : (descriptor = srcset, srcset = ""))) : (url = srcset,
				srcset = ""), url && (descriptor = parseDescriptor(descriptor)) && set.cands.push({
				url: url.replace(/^,+/, ""),
				desc: descriptor,
				set: set
			});
		}
		return set.cands;
	};
	var eminpx, memDescriptor = {}, regDescriptor = /^([\+eE\d\.]+)(w|x)$/, regHDesc = /\s*\d+h\s*/, baseStyle = "position:absolute;left:0;visibility:hidden;display:block;padding:0;border:none;font-size:1em;width:1em;overflow:hidden;clip:rect(0px, 0px, 0px, 0px)", fsCss = "font-size:100%!important;";
	ri.getEmValue = function() {
		var body;
		if (!eminpx && (body = document.body)) {
			var div = document.createElement("div"), originalHTMLCSS = docElem.style.cssText, originalBodyCSS = body.style.cssText;
			div.style.cssText = baseStyle, docElem.style.cssText = fsCss, body.style.cssText = fsCss,
				body.appendChild(div), eminpx = div.offsetWidth, body.removeChild(div), eminpx = parseFloat(eminpx, 10),
				docElem.style.cssText = originalHTMLCSS, body.style.cssText = originalBodyCSS;
		}
		return eminpx || 16;
	}, ri.calcListLength = function(sourceSizeListStr) {
		if (!(sourceSizeListStr in sizeLengthCache) || cfg.uT) {
			var sourceSize, parsedSize, length, media, i, len, sourceSizeList = trim(sourceSizeListStr).split(/\s*,\s*/), winningLength = !1;
			for (i = 0, len = sourceSizeList.length; len > i && (sourceSize = sourceSizeList[i],
				parsedSize = ri.parseSize(sourceSize), length = parsedSize.length, media = parsedSize.media,
			!length || !ri.matchesMedia(media) || (winningLength = ri.calcLength(length)) === !1); i++) ;
			sizeLengthCache[sourceSizeListStr] = winningLength ? winningLength : units.width;
		}
		return sizeLengthCache[sourceSizeListStr];
	}, ri.setRes = function(set) {
		var candidates, candidate;
		if (set) {
			candidates = ri.parseSet(set);
			for (var i = 0, len = candidates.length; len > i; i++) candidate = candidates[i],
			candidate.descriptor || setResolution(candidate, set.sizes);
		}
		return candidates;
	}, ri.applySetCandidate = function(candidates, img) {
		if (candidates.length) {
			var candidate, dpr, i, j, diff, length, bestCandidate, curSrc, curCan, isSameSet, candidateSrc, oldRes, imageData = img[ri.ns], evaled = !0;
			if (curSrc = imageData.curSrc || img[curSrcProp], curCan = imageData.curCan || setSrcToCur(img, curSrc, candidates[0].set),
					dpr = ri.DPR, curSrc && (curCan && curCan.res < dpr && (oldRes = curCan.res, curCan.res += cfg.tLazy * Math.pow(curCan.res - .1, isLandscape ? 2.2 : 1.9)),
					isSameSet = !imageData.pic || curCan && curCan.set == candidates[0].set, curCan && isSameSet && curCan.res >= dpr && (oldRes || tMemory > curCan.res) ? bestCandidate = curCan : supportAbort || img.complete || !getImgAttr.call(img, "src") || img.lazyload || (isSameSet || !inView(img)) && (bestCandidate = curCan,
					candidateSrc = curSrc, evaled = "L", isWinComplete && reevaluateAfterLoad(img))),
					!bestCandidate) for (oldRes && (curCan.res = curCan.res - (curCan.res - oldRes) / 2),
											 candidates.sort(ascendingSort), length = candidates.length, bestCandidate = candidates[length - 1],
											 i = 0; length > i; i++) if (candidate = candidates[i], candidate.res >= dpr) {
				j = i - 1, bestCandidate = candidates[j] && (diff = candidate.res - dpr) && curSrc != ri.makeUrl(candidate.url) && chooseLowRes(candidates[j].res, diff, dpr) ? candidates[j] : candidate;
				break;
			}
			return oldRes && (curCan.res = oldRes), bestCandidate && (candidateSrc = ri.makeUrl(bestCandidate.url),
				imageData.curSrc = candidateSrc, imageData.curCan = bestCandidate, candidateSrc != curSrc ? ri.setSrc(img, bestCandidate) : ri.setSize(img)),
				evaled;
		}
	};
	ri.setSrc = function(img, bestCandidate) {
		var origWidth;
		img.src = bestCandidate.url, "image/svg+xml" == bestCandidate.set.type && (origWidth = img.style.width,
			img.style.width = img.offsetWidth + 1 + "px", img.offsetWidth + 1 && (img.style.width = origWidth)),
			ri.setSize(img);
	}, ri.setSize = noop, ri.getSet = function(img) {
		var i, set, supportsType, match = !1, sets = img[ri.ns].sets;
		for (i = 0; i < sets.length && !match; i++) if (set = sets[i], set.srcset && ri.matchesMedia(set.media) && (supportsType = ri.supportsType(set.type))) {
			"pending" == supportsType && (set = supportsType), match = set;
			break;
		}
		return match;
	};
	var alwaysCheckWDescriptor = ri.supSrcset && !ri.supSizes;
	ri.parseSets = function(element, parent) {
		var srcsetAttribute, fallbackCandidate, isWDescripor, srcsetParsed, hasPicture = "PICTURE" == parent.nodeName.toUpperCase(), imageData = element[ri.ns];
		imageData.src === undefined && (imageData.src = getImgAttr.call(element, "src"),
			imageData.src ? setImgAttr.call(element, srcAttr, imageData.src) : removeImgAttr.call(element, srcAttr)),
		imageData.srcset === undefined && (srcsetAttribute = getImgAttr.call(element, "srcset"),
			imageData.srcset = srcsetAttribute, srcsetParsed = !0), imageData.sets = [], hasPicture && (imageData.pic = !0,
			getAllSourceElements(parent, imageData.sets)), imageData.srcset ? (fallbackCandidate = {
			srcset: imageData.srcset,
			sizes: getImgAttr.call(element, "sizes")
		}, imageData.sets.push(fallbackCandidate), isWDescripor = alwaysCheckWDescriptor || imageData.src ? hasWDescripor(fallbackCandidate) : !1,
		isWDescripor || !imageData.src || getCandidateForSrc(imageData.src, fallbackCandidate) || hasOneX(fallbackCandidate) || (fallbackCandidate.srcset += ", " + imageData.src,
			fallbackCandidate.cands = !1)) : imageData.src && imageData.sets.push({
			srcset: imageData.src,
			sizes: null
		}), imageData.curCan = null, imageData.supported = !(hasPicture || fallbackCandidate && !ri.supSrcset || isWDescripor),
		srcsetParsed && ri.supSrcset && !imageData.supported && (srcsetAttribute ? (setImgAttr.call(element, srcsetAttr, srcsetAttribute),
			element.srcset = "") : removeImgAttr.call(element, srcsetAttr)), imageData.supported && !imageData.srcset && (!imageData.src && element.src || element.src != ri.makeUrl(imageData.src)) && (null == imageData.src ? element.removeAttribute("src") : element.src = imageData.src),
			imageData.parsed = !0;
	};
	var reevaluateAfterLoad = function() {
		var onload = function() {
			off(this, "load", onload), off(this, "error", onload), ri.fillImgs({
				elements: [ this ]
			});
		};
		return function(img) {
			off(img, "load", onload), off(img, "error", onload), on(img, "error", onload), on(img, "load", onload);
		};
	}();
	ri.fillImg = function(element, options) {
		var parent, imageData, extreme = options.reparse || options.reevaluate;
		if (element[ri.ns] || (element[ri.ns] = {}), imageData = element[ri.ns], "L" == imageData.evaled && element.complete && (imageData.evaled = !1),
			extreme || !imageData.evaled) {
			if (!imageData.parsed || options.reparse) {
				if (parent = element.parentNode, !parent) return;
				ri.parseSets(element, parent, options);
			}
			imageData.supported ? imageData.evaled = !0 : applyBestCandidate(element);
		}
	};
	var resizeThrottle;
	ri.setupRun = function(options) {
		(!alreadyRun || options.reevaluate || isVwDirty) && (updateMetrics(), options.elements || options.context || clearTimeout(resizeThrottle));
	}, ri.teardownRun = noop;
	var alreadyRun = !1, respimage = function(opt) {
		var elements, i, plen, options = opt || {};
		if (options.elements && 1 == options.elements.nodeType && ("IMG" == options.elements.nodeName.toUpperCase() ? options.elements = [ options.elements ] : (options.context = options.elements,
				options.elements = null)), elements = options.elements || ri.qsa(options.context || document, options.reevaluate || options.reparse ? ri.sel : ri.selShort),
				plen = elements.length) {
			for (ri.setupRun(options), alreadyRun = !0, i = 0; plen > i; i++) ri.fillImg(elements[i], options);
			ri.teardownRun(options);
		}
	};
	ri.fillImgs = respimage, window.HTMLPictureElement ? (respimage = noop, ri.fillImg = noop) : !function() {
		var lDelay;
		lDelay = supportAbort ? 180 : 400;
		var run = function() {
			var readyState = document.readyState || "";
			clearTimeout(timerId), timerId = setTimeout(run, "loading" == readyState ? lDelay : 2e3),
			document.body && (/d$|^c/.test(readyState) && (isWinComplete = !0, clearTimeout(timerId),
				off(document, "readystatechange", run)), ri.fillImgs());
		}, resizeEval = function() {
			ri.fillImgs({
				reevaluate: !0
			});
		}, onResize = function() {
			clearTimeout(resizeThrottle), isVwDirty = !0, resizeThrottle = setTimeout(resizeEval, 99);
		}, timerId = setTimeout(run, document.body ? 9 : 99);
		on(window, "resize", onResize), on(document, "readystatechange", run);
	}(), respimage._ = ri, respimage.config = function(name, value, value2) {
		if ("addType" == name) {
			if (types[value] = value2, "pending" == value2) return;
		} else cfg[name] = value;
		alreadyRun && ri.fillImgs({
			reevaluate: !0
		});
	}, window.respimage = respimage;
}(window, document);

(function( factory ) {
	"use strict";
	var interValId;
	var intervalIndex = 0;
	var run = function(){
		if ( window.respimage ) {
			factory( window.respimage );
		}
		if(window.respimage || intervalIndex > 9999){
			clearInterval(interValId);
		}
		intervalIndex++;
	};
	interValId = setInterval(run, 8);

	run();

}( function( respimage, undefined ) {
	"use strict";

	var ri = respimage._;
	var knownWidths = {};
	var cfg = ri.cfg;
	var curSrcProp = "currentSrc";
	var setSize = function(width, img, data){
		var curCandidate = data.curCan;

		if ( width ) {
			if ( curCandidate.desc.type == "x" ) {
				img.setAttribute( "width", parseInt( (width / curCandidate.res) / cfg.xQuant, 10) );
			} else if ( curCandidate.desc.type == "w" ) {
				img.setAttribute( "width", parseInt( curCandidate.cWidth * (width / curCandidate.desc.val), 10) );
			}
		}
	};
	var loadBg = function(url, img, data){
		var bgImg;
		var curCandidate;
		if(knownWidths[url]){
			setSize(knownWidths[url], img, data);
		} else {
			curCandidate = data.curCan;
			if(curCandidate.desc.type == 'w'){
				setSize(curCandidate.desc.val, img, data);
			}

			bgImg = document.createElement('img');
			bgImg.onload = function(){
				knownWidths[url] = bgImg.naturalWidth || bgImg.width;
				if(url == img[curSrcProp]){
					setSize(knownWidths[url], img, data);
				}
				bgImg.onload = null;
				bgImg.onerror = null;
				img = null;
				bgImg = null;
			};
			bgImg.onerror = function(){
				img = null;
				bgImg.onload = null;
				bgImg.onerror = null;
				bgImg = null;
			};
			bgImg.src = url;

			if(bgImg && bgImg.complete){
				bgImg.onload();
			}
		}

	};
	var reeval = (function(){
		var running, timer;
		var run = function(){
			running = false;
			clearTimeout(timer);
			respimage({reevaluate: true});
		};

		return function(){
			if(!running && cfg.addSize){
				running = true;
				clearTimeout(timer);
				timer = setTimeout(run, 33);
			}
		};

	})();

	if( !(curSrcProp in document.createElement("img")) ){
		curSrcProp = "src";
	}

	cfg.addSize = true;

	ri.setSize = function( img ) {
		var url;
		var data = img[ ri.ns ];
		var curCandidate = data.curCan;

		if ( data.dims === undefined ) {
			data.dims = img.getAttribute( "height" ) && img.getAttribute( "width" );
		}

		if ( !cfg.addSize || !curCandidate || data.dims ) {return;}
		url = ri.makeUrl(curCandidate.url);
		if(url == img[curSrcProp]){
			loadBg(url, img, data);
		}
	};


	if(window.addEventListener){
		addEventListener('resize', reeval, false);
	}
	respimage({reevaluate: true});
}));

(function( factory ) {
	"use strict";
	var interValId;
	var intervalIndex = 0;
	var run = function(){
		if ( window.respimage ) {
			factory( window.respimage );
		}
		if(window.respimage || intervalIndex > 9999){
			clearInterval(interValId);
		}
		intervalIndex++;
	};
	interValId = setInterval(run, 8);

	run();

}( function( respimage ) {
	"use strict";

	var ri = respimage._;
	var runningTests = 0;
	var setTypeValue = function(types, value){
		var i;
		for(i = 0; i < types.length; i++){
			ri.types[types[i]] = value;
		}
	};

	if(window.HTMLPictureElement && !ri.cfg.uT){
		respimage.testTypeSupport = function(){};
		return;
	}

	ri.types["image/bmp"] = true;
	ri.types["image/x-bmp"] = true;

	respimage.testTypeSupport = function(types, url, width, useCanvas){
		if(typeof types == "string"){
			types = types.split(/\s*\,*\s+/g);
		}
		var canvas;
		var supports = "pending";
		var img = document.createElement('img');
		var onComplete = function(){
			runningTests--;
			setTypeValue(types, supports);
			if(runningTests < 1){
				respimage({reevaluate: true});
			}
		};

		if(useCanvas){
			canvas = document.createElement('canvas');
			if(!canvas.getContext){
				setTypeValue(types, false);
				return;
			}
		}

		img.onload = function(){
			var ctx;
			supports = true;
			if(width){
				supports = img.width == width;
			}

			if(useCanvas){
				ctx = canvas.getContext('2d');
				ctx.drawImage(img, 0, 0);
				supports = ctx.getImageData(0, 0, 1, 1).data[3] === 0;
			}
			onComplete();
		};

		img.onerror = function(){
			supports = false;
			onComplete();
		};
		runningTests++;
		setTypeValue(types, "pending");
		img.src = url;
	};


	respimage.testTypeSupport("image/webp", "data:image/webp;base64,UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAwAAAABBxAR/Q9ERP8DAABWUDggGAAAADABAJ0BKgEAAQADADQlpAADcAD++/1QAA==", 1);
	respimage.testTypeSupport("image/jp2 image/jpx image/jpm", "data:image/jp2;base64,/0//UQAyAAAAAAABAAAAAgAAAAAAAAAAAAAABAAAAAQAAAAAAAAAAAAEBwEBBwEBBwEBBwEB/1IADAAAAAEAAAQEAAH/XAAEQED/ZAAlAAFDcmVhdGVkIGJ5IE9wZW5KUEVHIHZlcnNpb24gMi4wLjD/kAAKAAAAAABYAAH/UwAJAQAABAQAAf9dAAUBQED/UwAJAgAABAQAAf9dAAUCQED/UwAJAwAABAQAAf9dAAUDQED/k8+kEAGvz6QQAa/PpBABr994EAk//9k=", 1);
	respimage.testTypeSupport("image/vnd.ms-photo", "data:image/vnd.ms-photo;base64,SUm8AQgAAAAFAAG8AQAQAAAASgAAAIC8BAABAAAAAQAAAIG8BAABAAAAAQAAAMC8BAABAAAAWgAAAMG8BAABAAAAHwAAAAAAAAAkw91vA07+S7GFPXd2jckNV01QSE9UTwAZAYBxAAAAABP/gAAEb/8AAQAAAQAAAA==", 1);
	respimage.testTypeSupport("video/png video/apng video/x-mng video/x-png", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAACGFjVEwAAAABAAAAAcMq2TYAAAANSURBVAiZY2BgYPgPAAEEAQB9ssjfAAAAGmZjVEwAAAAAAAAAAQAAAAEAAAAAAAAAAAD6A+gBAbNU+2sAAAARZmRBVAAAAAEImWNgYGBgAAAABQAB6MzFdgAAAABJRU5ErkJggg==", false, true);

}));


(function(){

	webshim.isReady('picture', true);
	var sel = 'picture, img[srcset]';
	webshim.addReady(function(context){
		if(context.querySelector(sel)){
			window.respimage();
		}
	});
})();


;/*! matchMedia() polyfill - Test a CSS media type/query in JS. Authors & copyright (c) 2012: Scott Jehl, Paul Irish, Nicholas Zakas, David Knight. Dual MIT/BSD license */

window.matchMedia || (window.matchMedia = function() {
    "use strict";

    // For browsers that support matchMedium api such as IE 9 and webkit
    var styleMedia = (window.styleMedia || window.media);

    // For those that don't support matchMedium
    if (!styleMedia) {
        var style       = document.createElement('style'),
            script      = document.getElementsByTagName('script')[0],
            info        = null;

        style.type  = 'text/css';
        style.id    = 'matchmediajs-test';

        script.parentNode.insertBefore(style, script);

        // 'style.currentStyle' is used by IE <= 8 and 'window.getComputedStyle' for all other browsers
        info = ('getComputedStyle' in window) && window.getComputedStyle(style, null) || style.currentStyle;

        styleMedia = {
            matchMedium: function(media) {
                var text = '@media ' + media + '{ #matchmediajs-test { width: 1px; } }';

                // 'style.styleSheet' is used by IE <= 8 and 'style.textContent' for all other browsers
                if (style.styleSheet) {
                    style.styleSheet.cssText = text;
                } else {
                    style.textContent = text;
                }

                // Test if media query is true or false
                return info.width === '1px';
            }
        };
    }

    return function(media) {
        return {
            matches: styleMedia.matchMedium(media || 'all'),
            media: media || 'all'
        };
    };
}());
/*! matchMedia() polyfill addListener/removeListener extension. Author & copyright (c) 2012: Scott Jehl. Dual MIT/BSD license */
(function(){
    // Bail out for browsers that have addListener support
    if (window.matchMedia && window.matchMedia('all').addListener) {
        return false;
    }

    var localMatchMedia = window.matchMedia,
        hasMediaQueries = localMatchMedia('only all').matches,
        isListening     = false,
        timeoutID       = 0,    // setTimeout for debouncing 'handleChange'
        queries         = [],   // Contains each 'mql' and associated 'listeners' if 'addListener' is used
        handleChange    = function(evt) {
            // Debounce
            clearTimeout(timeoutID);

            timeoutID = setTimeout(function() {
                for (var i = 0, il = queries.length; i < il; i++) {
                    var mql         = queries[i].mql,
                        listeners   = queries[i].listeners || [],
                        matches     = localMatchMedia(mql.media).matches;

                    // Update mql.matches value and call listeners
                    // Fire listeners only if transitioning to or from matched state
                    if (matches !== mql.matches) {
                        mql.matches = matches;

                        for (var j = 0, jl = listeners.length; j < jl; j++) {
                            listeners[j].call(window, mql);
                        }
                    }
                }
            }, 30);
        };

    window.matchMedia = function(media) {
        var mql         = localMatchMedia(media),
            listeners   = [],
            index       = 0;

        mql.addListener = function(listener) {
            // Changes would not occur to css media type so return now (Affects IE <= 8)
            if (!hasMediaQueries) {
                return;
            }

            // Set up 'resize' listener for browsers that support CSS3 media queries (Not for IE <= 8)
            // There should only ever be 1 resize listener running for performance
            if (!isListening) {
                isListening = true;
                window.addEventListener('resize', handleChange, true);
            }

            // Push object only if it has not been pushed already
            if (index === 0) {
                index = queries.push({
                    mql         : mql,
                    listeners   : listeners
                });
            }

            listeners.push(listener);
        };

        mql.removeListener = function(listener) {
            for (var i = 0, il = listeners.length; i < il; i++){
                if (listeners[i] === listener){
                    listeners.splice(i, 1);
                }
            }
        };

        return mql;
    };
}());
webshim.isReady('matchMedia', true);
