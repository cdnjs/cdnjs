/*! respimage - v0.9.5 - 2014-10-22
 Licensed MIT */
!function(window, document, undefined) {
	"use strict";
	function trim(str) {
		return str.trim ? str.trim() : str.replace(/^\s+|\s+$/g, "");
	}
	function updateView() {
		isVwDirty = !1, ri.vW = window.innerWidth || Math.max(docElem.offsetWidth || 0, docElem.clientWidth || 0),
			vH = window.innerHeight || Math.max(docElem.offsetHeight || 0, docElem.clientHeight || 0);
	}
	function parseDescriptor(descriptor) {
		if (!(descriptor in memDescriptor)) {
			var descriptorObj = {
				val: 1,
				type: "x"
			}, parsedDescriptor = trim(descriptor || "");
			parsedDescriptor && (parsedDescriptor.match(regDescriptor) ? (descriptorObj.val = 1 * RegExp.$1,
				descriptorObj.type = RegExp.$2) : descriptorObj = !1), memDescriptor[descriptor] = descriptorObj;
		}
		return memDescriptor[descriptor];
	}
	function chooseLowRes(lowRes, diff, dpr) {
		return lowRes / dpr > .2 && (lowRes += diff * greed, diff > tHigh && (lowRes += tLow)),
		lowRes > dpr;
	}
	function inView(el) {
		if (!el.getBoundingClientRect) return !0;
		var bottom, right, left, top, rect = el.getBoundingClientRect();
		return !!((bottom = rect.bottom) >= -9 && (top = rect.top) <= vH + 9 && (right = rect.right) >= -9 && (left = rect.left) <= ri.vW + 9 && (bottom || right || left || top));
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
			img[ri.ns].curCan = candidate, currentSrcSupported || (img.currentSrc = src), candidate.res || setResolution(candidate, candidate.set.sizes)),
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
	var lengthElInstered, lengthEl, currentSrcSupported, curSrcProp, ri = {}, noop = function() {}, image = document.createElement("img"), getImgAttr = image.getAttribute, setImgAttr = image.setAttribute, removeImgAttr = image.removeAttribute, docElem = document.documentElement, types = {}, cfg = {
		addSize: !1,
		xQuant: 1,
		tLow: .1,
		tHigh: .5,
		tLazy: .1,
		greed: .32
	}, srcAttr = "data-risrc", srcsetAttr = srcAttr + "set";
	ri.ns = ("ri" + new Date().getTime()).substr(0, 9), currentSrcSupported = "currentSrc" in image,
		curSrcProp = currentSrcSupported ? "currentSrc" : "src", ri.supSrcset = "srcset" in image,
		ri.supSizes = "sizes" in image, ri.selShort = "picture > img, img[srcset]", ri.sel = ri.selShort,
		ri.cfg = cfg, ri.supSrcset && (ri.sel += ", img[" + srcsetAttr + "]");
	var anchor = document.createElement("a");
	ri.makeUrl = function(src) {
		return anchor.href = src, anchor.href;
	}, ri.qsa = function(context, sel) {
		return context.querySelectorAll(sel);
	};
	{
		var on = (window.console && "function" == typeof console.warn ? function(message) {
			console.warn(message);
		} : noop, function(obj, evt, fn, capture) {
			obj.addEventListener ? obj.addEventListener(evt, fn, capture || !1) : obj.attachEvent && obj.attachEvent("on" + evt, fn);
		}), off = function(obj, evt, fn, capture) {
			obj.removeEventListener ? obj.removeEventListener(evt, fn, capture || !1) : obj.detachEvent && obj.detachEvent("on" + evt, fn);
		};
		"https:" == location.protocol;
	}
	ri.matchesMedia = function() {
		return ri.matchesMedia = window.matchMedia && (matchMedia("(min-width: 0.1em)") || {}).matches ? function(media) {
			return !media || matchMedia(media).matches;
		} : ri.mMQ, ri.matchesMedia.apply(this, arguments);
	}, ri.vW = 0;
	var vH, isVwDirty = !0, regex = {
		minw: /\(\s*min\-width\s*:\s*(\s*[0-9\.]+)(px|em)\s*\)/,
		maxw: /\(\s*max\-width\s*:\s*(\s*[0-9\.]+)(px|em)\s*\)/
	}, mediaCache = {};
	ri.mMQ = function(media) {
		var min, max, ret = !1;
		return media ? (mediaCache[media] || (min = media.match(regex.minw) && parseFloat(RegExp.$1) + (RegExp.$2 || ""),
			max = media.match(regex.maxw) && parseFloat(RegExp.$1) + (RegExp.$2 || ""), min && (min = parseFloat(min, 10) * (min.indexOf("em") > 0 ? ri.getEmValue() : 1)),
		max && (max = parseFloat(max, 10) * (max.indexOf("em") > 0 ? ri.getEmValue() : 1)),
			mediaCache[media] = {
				min: min,
				max: max
			}), min = mediaCache[media].min, max = mediaCache[media].max, (min && ri.vW >= min || max && ri.vW <= max) && (ret = !0),
			ret) : !0;
	}, ri.DPR = window.devicePixelRatio || 1;
	var lengthCache = {}, regLength = /^([\d\.]+)(em|vw|px)$/, baseStyle = "position:absolute;left:0;visibility:hidden;display:block;padding:0;border:none;font-size:1em;width:1em;";
	ri.calcLength = function(sourceSizeValue) {
		var failed, parsedLength, orirgValue = sourceSizeValue, value = !1;
		if (!(orirgValue in lengthCache)) {
			if (parsedLength = sourceSizeValue.match(regLength)) parsedLength[1] = parseFloat(parsedLength[1], 10),
				value = parsedLength[1] ? "vw" == parsedLength[2] ? ri.vW * parsedLength[1] / 100 : "em" == parsedLength[2] ? ri.getEmValue() * parsedLength[1] : parsedLength[1] : !1; else if (sourceSizeValue.indexOf("calc") > -1 || parseInt(sourceSizeValue, 10)) {
				sourceSizeValue = sourceSizeValue.replace("vw", "%"), lengthEl || (lengthEl = document.createElement("div"),
					lengthEl.style.cssText = baseStyle), lengthElInstered || (lengthElInstered = !0,
					docElem.insertBefore(lengthEl, docElem.firstChild)), lengthEl.style.width = "0px";
				try {
					lengthEl.style.width = sourceSizeValue;
				} catch (e) {
					failed = !0;
				}
				value = lengthEl.offsetWidth, failed && (value = !1);
			}
			0 >= value && (value = !1), lengthCache[orirgValue] = value;
		}
		return lengthCache[orirgValue];
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
	var eminpx, memDescriptor = {}, regDescriptor = /^([\+eE\d\.]+)(w|x)$/, fsCss = "font-size:100% !important;";
	ri.getEmValue = function() {
		var body;
		if (!eminpx && (body = document.body)) {
			var div = document.createElement("div"), originalHTMLCSS = docElem.style.cssText, originalBodyCSS = body.style.cssText;
			div.style.cssText = baseStyle, docElem.style.cssText = fsCss, body.style.cssText = fsCss,
				body.appendChild(div), eminpx = div.offsetWidth, body.removeChild(div), eminpx = parseFloat(eminpx, 10),
				docElem.style.cssText = originalHTMLCSS, body.style.cssText = originalBodyCSS;
		}
		return eminpx || 16;
	};
	var sizeLengthCache = {};
	ri.calcListLength = function(sourceSizeListStr) {
		if (!(sourceSizeListStr in sizeLengthCache) || cfg.uT) {
			var sourceSize, parsedSize, length, media, i, len, sourceSizeList = trim(sourceSizeListStr).split(/\s*,\s*/), winningLength = !1;
			for (i = 0, len = sourceSizeList.length; len > i && (sourceSize = sourceSizeList[i],
				parsedSize = ri.parseSize(sourceSize), length = parsedSize.length, media = parsedSize.media,
			!length || !ri.matchesMedia(media) || (winningLength = ri.calcLength(length)) === !1); i++) ;
			sizeLengthCache[sourceSizeListStr] = winningLength ? winningLength : ri.vW;
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
	};
	var dprM, tLow, greed, tLazy, tHigh, tMemory, isWinComplete;
	ri.applySetCandidate = function(candidates, img) {
		if (candidates.length) {
			var candidate, dpr, i, j, diff, length, bestCandidate, curSrc, curCan, isSameSet, candidateSrc, imageData = img[ri.ns], evaled = !0;
			if (curSrc = imageData.curSrc || img[curSrcProp], curCan = imageData.curCan || setSrcToCur(img, curSrc, candidates[0].set),
					dpr = ri.getX(candidates, curCan), curSrc && (curCan && (curCan.res += tLazy), isSameSet = !imageData.pic || curCan && curCan.set == candidates[0].set,
					curCan && isSameSet && curCan.res >= dpr && tMemory > curCan.res - dpr ? bestCandidate = curCan : img.complete || imageData.src != getImgAttr.call(img, "src") || img.lazyload || (isSameSet || !isWinComplete && !inView(img)) && (bestCandidate = curCan,
						candidateSrc = curSrc, evaled = "lazy", isWinComplete && reevaluateAfterLoad(img))),
					!bestCandidate) for (candidates.sort(ascendingSort), length = candidates.length,
											 bestCandidate = candidates[length - 1], i = 0; length > i; i++) if (candidate = candidates[i],
				candidate.res >= dpr) {
				j = i - 1, bestCandidate = candidates[j] && (diff = candidate.res - dpr) && curSrc != ri.makeUrl(candidate.url) && chooseLowRes(candidates[j].res, diff, dpr) ? candidates[j] : candidate;
				break;
			}
			return curSrc && curCan && (curCan.res -= tLazy), bestCandidate && (candidateSrc = ri.makeUrl(bestCandidate.url),
			currentSrcSupported || (img.currentSrc = candidateSrc), imageData.curSrc = candidateSrc,
				imageData.curCan = bestCandidate, candidateSrc != curSrc ? ri.setSrc(img, bestCandidate) : ri.setSize(img)),
				evaled;
		}
	};
	ri.getX = function() {
		return ri.DPR * cfg.xQuant;
	}, ri.setSrc = function(img, bestCandidate) {
		var origWidth;
		img.src = bestCandidate.url, "image/svg+xml" == bestCandidate.set.type && (origWidth = img.style.width,
			img.style.width = img.offsetWidth + 1 + "px", img.offsetWidth + 1 && (img.style.width = origWidth));
	};
	var intrinsicSizeHandler = function() {
		off(this, "load", intrinsicSizeHandler), ri.setSize(this);
	};
	ri.setSize = function(img) {
		var width, curCandidate = img[ri.ns].curCan;
		cfg.addSize && curCandidate && !img[ri.ns].dims && (img.complete || (off(img, "load", intrinsicSizeHandler),
			on(img, "load", intrinsicSizeHandler)), width = img.naturalWidth, width && ("x" == curCandidate.desc.type ? setImgAttr.call(img, "width", parseInt(width / curCandidate.res / cfg.xQuant, 10)) : "w" == curCandidate.desc.type && setImgAttr.call(img, "width", parseInt(curCandidate.cWidth * (width / curCandidate.desc.val), 10))));
	}, document.addEventListener && "naturalWidth" in image && "complete" in image || (ri.setSize = noop),
		ri.getSet = function(img) {
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
			imageData.srcset = srcsetAttribute, srcsetParsed = !0), imageData.dims === undefined && (imageData.dims = getImgAttr.call(element, "height") && getImgAttr.call(element, "width")),
			imageData.sets = [], hasPicture && (imageData.pic = !0, getAllSourceElements(parent, imageData.sets)),
			imageData.srcset ? (fallbackCandidate = {
				srcset: imageData.srcset,
				sizes: getImgAttr.call(element, "sizes")
			}, imageData.sets.push(fallbackCandidate), isWDescripor = alwaysCheckWDescriptor || imageData.src ? hasWDescripor(fallbackCandidate) : !1,
			isWDescripor || !imageData.src || getCandidateForSrc(imageData.src, fallbackCandidate) || hasOneX(fallbackCandidate) || (fallbackCandidate.srcset += ", " + imageData.src,
				fallbackCandidate.cands = !1)) : imageData.src && imageData.sets.push({
				srcset: imageData.src,
				sizes: null
			}), imageData.curCan = null, imageData.supported = !(hasPicture || fallbackCandidate && !ri.supSrcset || isWDescripor),
		srcsetParsed && ri.supSrcset && !imageData.supported && (srcsetAttribute ? (setImgAttr.call(element, srcsetAttr, srcsetAttribute),
			element.srcset = "") : removeImgAttr.call(element, srcsetAttr)), imageData.parsed = !0;
	};
	var reevaluateAfterLoad = function() {
		var onload = function() {
			off(this, "load", onload), ri.fillImgs({
				elements: [ this ]
			});
		};
		return function(img) {
			off(img, "load", onload), on(img, "load", onload);
		};
	}();
	ri.fillImg = function(element, options) {
		var parent, imageData, extreme = options.reparse || options.reevaluate;
		if (element[ri.ns] || (element[ri.ns] = {}), imageData = element[ri.ns], "lazy" == imageData.evaled && (isWinComplete || element.complete) && (imageData.evaled = !1),
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
		(!alreadyRun || options.reevaluate || isVwDirty) && (cfg.uT || (ri.DPR = window.devicePixelRatio || 1),
			dprM = Math.min(Math.max(ri.DPR * cfg.xQuant, 1), 2.5), tLow = cfg.tLow * dprM,
			tLazy = cfg.tLazy * dprM, greed = cfg.greed * dprM, tHigh = cfg.tHigh, tMemory = .6 + .4 * dprM + tLazy),
		isVwDirty && (lengthCache = {}, sizeLengthCache = {}, updateView(), options.elements || options.context || clearTimeout(resizeThrottle));
	}, ri.teardownRun = function() {
		var parent;
		lengthElInstered && (lengthElInstered = !1, parent = lengthEl.parentNode, parent && parent.removeChild(lengthEl));
	};
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
		var regWinComplete = /^loade|^c/, run = function() {
			clearTimeout(timerId), timerId = setTimeout(run, 3e3), document.body && (regWinComplete.test(document.readyState || "") && (isWinComplete = !0,
				clearTimeout(timerId), off(document, "readystatechange", run)), ri.fillImgs());
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
	respimage.testTypeSupport("image/jp2 image/jpx image/jpm", "data:image/jp2;base64,AAAADGpQICANCocKAAAAFGZ0eXBqcDIgAAAAAGpwMiAAAABHanAyaAAAABZpaGRyAAAAAQAAAAEAAQAHAAAAAAAPY29scgEAAAAAABEAAAAacmVzIAAAABJyZXNjAGAA/gBgAP4EBAAAAABqcDJj/0//UQApAAAAAAABAAAAAQAAAAAAAAAAAAAAAQAAAAEAAAAAAAAAAAABAAEB/1wADUAIEBAYEBAYEBAY/1IADAAAAAEAAwQEAAH/ZAAPAAFMV0ZfSlAyXzIxMf+QAAoAAAAAABIAAf+TgICAgP/Z", 1);
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


