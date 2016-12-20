/*
*  CSS3polyfill - v1.0.0
*  A CSS3 polyfill collection for IE8
*  https://github.com/marcofugaro/css3polyfill
*  License: MIT
**/

/*
* background-size-emu | https://github.com/Metafalica/background-size-emu
*/

(function ()
{
    function BgSzEmu()
    {
        BgSzEmu.prototype.elemsOnPrevCheck = null;
        BgSzEmu.prototype.genericEmptyBG = "url(empty_bg_" + new Date().getTime() + ".wtf)";
    }

    BgSzEmu.prototype.scanElems = function ()
    {
        if (!BgSzEmu.prototype.IsIE() || !BgSzEmu.prototype.IsBadIE())
            return;

        if (document.body)
        {
            var curr_elems = new Array();
            BgSzEmu.prototype.getElemsIn(null, curr_elems);

            if (!BgSzEmu.prototype.elemsOnPrevCheck)
            {
                BgSzEmu.prototype.elemsOnPrevCheck = curr_elems.slice(0);
                BgSzEmu.prototype.activateBgSzFixer();
            }
            else
            {
                for (var i = 0; i < curr_elems.length; i++)
                    if (BgSzEmu.prototype.isObjectInArray(curr_elems[i], BgSzEmu.prototype.elemsOnPrevCheck))
                    {
                        if (!curr_elems[i].junkData)
                            continue;

                        var available_size = BgSzEmu.prototype.getAvailableAreaSizeIn(curr_elems[i]);

                        if (curr_elems[i].junkData.lastSize && (curr_elems[i].junkData.lastSize.width != available_size.width || curr_elems[i].junkData.lastSize.height != available_size.height))
                            BgSzEmu.prototype.fixBgFor(curr_elems[i]);
                    }
                    else
                    {
                        var curr_bg_img = BgSzEmu.prototype.getCSSPropertyValue(curr_elems[i], "background-image", "backgroundImage");

                        if (curr_bg_img && !curr_elems[i].junkData)
                            BgSzEmu.prototype.fixBgFor(curr_elems[i]);
                    }

                BgSzEmu.prototype.elemsOnPrevCheck = curr_elems.slice(0);
            }
        }

        setTimeout(BgSzEmu.prototype.scanElems, 500);
    };

    BgSzEmu.prototype.activateBgSzFixer = function ()
    {
        if (!BgSzEmu.prototype.IsIE() || !BgSzEmu.prototype.IsBadIE())
            return;

        BgSzEmu.prototype.fixBgsRecursiveIn(null);
        window.onresize = BgSzEmu.prototype.handleResize;
    };

    BgSzEmu.prototype.fixBgsRecursiveIn = function (start_elem)
    {
        var curr_elem = start_elem ? start_elem : document.body;

        var bg_sz = BgSzEmu.prototype.getCSSPropertyValue(curr_elem, "background-size", "backgroundSize");

        if (bg_sz && bg_sz.toLowerCase() != "auto auto")
            BgSzEmu.prototype.fixBgFor(curr_elem);

        for (var i = 0; i < curr_elem.children.length; i++)
            BgSzEmu.prototype.fixBgsRecursiveIn(curr_elem.children[i]);
    };

    BgSzEmu.prototype.handleResize = function ()
    {
        BgSzEmu.prototype.fixBgsRecursiveIn(null);
    };

    BgSzEmu.prototype.handlePropertyChange = function ()
    {
        var evt = window.event;
        var elem = evt.target || evt.srcElement;

        if (evt.propertyName == "onpropertychange" || !elem)
            return;

        if (evt.propertyName == "style.backgroundImage")
        {
            var bg_img = elem.style.backgroundImage || elem.currentStyle.backgroundImage;

            if (bg_img == BgSzEmu.prototype.genericEmptyBG) //skip change made by emu to clear background
                return;

            if ((!bg_img || bg_img == "none") && elem.junkData)
            {
                elem.removeChild(elem.junkData.inner_div);
                elem.style.position = elem.junkData.orig_pos;
                elem.style.zIndex = elem.junkData.orig_zInd;
                elem.junkData = null;
            }
            else
                BgSzEmu.prototype.replaceBgImgFor(elem);
        }
        else if (BgSzEmu.prototype.startsWith(evt.propertyName, "style.background"))
            BgSzEmu.prototype.replaceBgImgFor(elem);
    };

    BgSzEmu.prototype.replaceBgImgFor = function (elem)
    {
        if (!BgSzEmu.prototype.elemCanHaveDivAsChildren(elem)) //can't deal with tags that do not support children
            return;

        var e_avl_sz = BgSzEmu.prototype.getAvailableAreaSizeIn(elem);

        if (e_avl_sz.width == 0 || e_avl_sz.height == 0)
            return;

        var prop_change_removed = false;

        if (elem.onpropertychange)
        {
            elem.onpropertychange = null;
            prop_change_removed = true;
        }

        var prev_backgroundImage = BgSzEmu.prototype.getCSSPropertyValue(elem, "background-image", "backgroundImage") || elem.background || elem.getAttribute("background");

        if (BgSzEmu.prototype.startsWith(prev_backgroundImage, "url(")) //process images only. skip gradients
        {
            if (prev_backgroundImage == BgSzEmu.prototype.genericEmptyBG)
                BgSzEmu.prototype.fixBgFor(elem);
            else
                BgSzEmu.prototype.getImgNaturalSizeAndPassToCallback(elem, prev_backgroundImage, BgSzEmu.prototype.continueBgReplaceFor);
        }

        if (prop_change_removed)
            elem.onpropertychange = BgSzEmu.prototype.handlePropertyChange;
    };

    BgSzEmu.prototype.continueBgReplaceFor = function (elem, prev_backgroundImage, img_natural_size)
    {
        var prev_zIndex = elem.style.zIndex;
        var prev_position = elem.style.position;

        if (img_natural_size.width == 0 || img_natural_size.height == 0) //bad img url?
            return;

        elem.style.backgroundImage = BgSzEmu.prototype.genericEmptyBG;

        if ("background" in elem)
            elem.background = BgSzEmu.prototype.genericEmptyBG;

        var stylePosition = elem.style.position || elem.currentStyle.position;
        var styleZIndex = elem.style.zIndex || elem.currentStyle.zIndex;

        if (!stylePosition || stylePosition == "static")
            elem.style.position = "relative";

        if (!styleZIndex || styleZIndex == "auto")
            elem.style.zIndex = 0;

        var div = document.createElement("div");
        var img = document.createElement("img");

        div.style.margin = 0;
        div.style.top = "0px";
        div.style.left = "0px";
        div.style.width = "100%";
        div.style.height = "100%";
        div.style.overflow = "hidden";
        //div.style.border = "dashed";
        //img.style.border = "double";
        div.style.zIndex = img.style.zIndex = -1;
        div.style.display = img.style.display = "block";
        div.style.position = img.style.position = "absolute";
        div.style.visibility = img.style.visibility = "inherit";

        img.alt = "";
        img.src = BgSzEmu.prototype.getPurePathFrom(prev_backgroundImage);

        if (elem.junkData)
        {
            elem.removeChild(elem.junkData.inner_div);
            elem.junkData = null;
        }

        var junkData = { orig_bgImg: prev_backgroundImage, orig_pos: prev_position, orig_zInd: prev_zIndex, inner_div: div, inner_img: img, inner_img_nat_size: img_natural_size };
        elem.junkData = junkData;

        div.appendChild(img);

        if (elem.firstChild)
            elem.insertBefore(div, elem.firstChild);
        else
            elem.appendChild(div);

        BgSzEmu.prototype.fixBgFor(elem);

        elem.onpropertychange = BgSzEmu.prototype.handlePropertyChange;
    };

    BgSzEmu.prototype.getImgNaturalSizeAndPassToCallback = function (elem, img_path, callback)
    {
        var pure_path = BgSzEmu.prototype.getPurePathFrom(img_path);

        var img = new Image();

        img.onload = function ()
        {
            var sz = { width: this.width, height: this.height };
            callback(elem, img_path, sz);
        };

        img.src = pure_path;
    };

    BgSzEmu.prototype.getAvailableAreaSizeIn = function (elem)
    {
        var sz = { width: elem.clientWidth || elem.offsetWidth, height: elem.clientHeight || elem.offsetHeight };
            
        return sz;
    };

    BgSzEmu.prototype.fixBgFor = function (elem)
    {
        var junkData = elem.junkData;
        var bg_sz = BgSzEmu.prototype.getCSSPropertyValue(elem, "background-size", "backgroundSize");

        if (junkData)
        {
            var available_size = BgSzEmu.prototype.getAvailableAreaSizeIn(elem);
            var div_width = available_size.width;
            var div_height = available_size.height;
            var divRatio = div_width / div_height;

            elem.junkData.lastSize = available_size;

            junkData.inner_div.style.width = div_width + "px";
            junkData.inner_div.style.height = div_height + "px";

            var img_nat_width = junkData.inner_img_nat_size.width;
            var img_nat_height = junkData.inner_img_nat_size.height;
            var img_curr_width = junkData.inner_img.width || junkData.inner_img.style.width;
            var img_curr_height = junkData.inner_img.height || junkData.inner_img.style.height;
            var imgRatio = (img_curr_width / img_curr_height) || (img_nat_width / img_nat_height);

            var new_img_top = "0px";
            var new_img_left = "0px";
            var new_img_width;
            var new_img_height;

            var elem_bg_pos = BgSzEmu.prototype.getElemBgPos(elem);

            if (bg_sz == "cover" || bg_sz == "contain")
            {
                if ((bg_sz == "cover" && divRatio > imgRatio) || (bg_sz == "contain" && imgRatio > divRatio))
                {
                    new_img_width = div_width;
                    new_img_height = new_img_width / imgRatio;

                    if (elem_bg_pos.v_pos.is_percents)
                        new_img_top = Math.floor((div_height - new_img_height) * elem_bg_pos.v_pos.value) + "px";
                }
                else
                {
                    new_img_height = div_height;
                    new_img_width = new_img_height * imgRatio;

                    if (elem_bg_pos.h_pos.is_percents)
                        new_img_left = Math.floor((div_width - new_img_width) * elem_bg_pos.h_pos.value) + "px";
                }

                elem.junkData.inner_img.width = new_img_width;
                elem.junkData.inner_img.height = new_img_height;

                elem.junkData.inner_img.style.left = elem_bg_pos.h_pos.is_percents ? new_img_left : elem_bg_pos.h_pos.value;
                elem.junkData.inner_img.style.top = elem_bg_pos.v_pos.is_percents ? new_img_top : elem_bg_pos.v_pos.value;
            }
            else
            {
                var splitted_size = bg_sz.split(" ");
                var t_width = splitted_size[0];
                var t_height = splitted_size[1];

                if (t_width.toLowerCase() == "auto" && t_height.toLowerCase() == "auto")
                {
                    t_width = img_nat_width;
                    t_height = img_nat_height;
                }
                else if (t_width.toLowerCase() == "auto")
                {
                    elem.junkData.inner_img.style.height = t_height;
                    var just_set_height = elem.junkData.inner_img.clientHeight || elem.junkData.inner_img.offsetHeight/* || elem.junkData.inner_img.scrollHeight*/;
                    var width_to_set = (img_nat_width * just_set_height) / img_nat_height;

                    if (!width_to_set || width_to_set < 1)
                        width_to_set = 1;

                    elem.junkData.inner_img.width = width_to_set;
                }
                else if (t_height.toLowerCase() == "auto")
                {
                    elem.junkData.inner_img.style.width = t_width;
                    var just_set_width = elem.junkData.inner_img.clientWidth || elem.junkData.inner_img.offsetWidth/* || elem.junkData.inner_img.scrollWidth*/;
                    var height_to_set = (just_set_width * img_nat_height) / img_nat_width;

                    if (!height_to_set || height_to_set < 1)
                        height_to_set = 1;

                    elem.junkData.inner_img.height = height_to_set;
                }
                else
                {
                    elem.junkData.inner_img.style.width = t_width;
                    elem.junkData.inner_img.style.height = t_height;
                }

                elem.junkData.inner_img.style.left = elem_bg_pos.h_pos.is_percents ? Math.floor((div_width - elem.junkData.inner_img.width) * elem_bg_pos.h_pos.value) + "px" : elem_bg_pos.h_pos.value;
                elem.junkData.inner_img.style.top = elem_bg_pos.v_pos.is_percents ? Math.floor((div_height - elem.junkData.inner_img.height) * elem_bg_pos.v_pos.value) + "px" : elem_bg_pos.v_pos.value;
            }
        }
        else if (bg_sz)
            BgSzEmu.prototype.replaceBgImgFor(elem);
    };

    BgSzEmu.prototype.parseBgPosVal = function (word)
    {
        var map = new Array();
        map["left"] = "0.0";
        map["center"] = "0.5";
        map["right"] = "1.0";
        map["top"] = "0.0";
        map["bottom"] = "1.0";

        if (word in map)
            return { value: map[word], is_percents: true };
        else if (BgSzEmu.prototype.endsWith(word, "%"))
            return { value: (word.substr(0, word.length - 1) / 100), is_percents: true };

        return { value: word, is_percents: false };
    };

    //common functions
    BgSzEmu.prototype.IsIE = function ()
    {
        return navigator.userAgent.indexOf('MSIE') !== -1 || navigator.appVersion.indexOf('Trident/') > 0;
    };

    BgSzEmu.prototype.IsBadIE = function ()
    {
        return "attachEvent" in window && !("addEventListener" in window); //detects ie < 9 and ie9 in quirks mode
    };

    BgSzEmu.prototype.getElemsIn = function (start_elem, curr_elems)
    {
        var curr_elem = start_elem ? start_elem : document.body;

        for (var i = 0; i < curr_elem.children.length; i++)
        {
            curr_elems.push(curr_elem.children[i]);
            BgSzEmu.prototype.getElemsIn(curr_elem.children[i], curr_elems);
        }
    };

    BgSzEmu.prototype.getPurePathFrom = function (str_path)
    {
        var final_str = str_path;

        if (final_str.substring(0, ("url(").length) == "url(")
        {
            final_str = final_str.substr(4);

            if (final_str.lastIndexOf(")") == final_str.length - 1)
                final_str = final_str.substr(0, final_str.length - 1);
        }

        return final_str;
    };

    BgSzEmu.prototype.getElemBgPos = function (elem)
    {
        var splitted_pos = Array(
            BgSzEmu.prototype.getCSSPropertyValue(elem, "background-position-x", "backgroundPositionX"),
            BgSzEmu.prototype.getCSSPropertyValue(elem, "background-position-y", "backgroundPositionY")
		);

        var h_pos_ = (splitted_pos[0] ? BgSzEmu.prototype.parseBgPosVal(splitted_pos[0]) : { value: "0", is_percents: true });
        var v_pos_ = (splitted_pos[1] ? BgSzEmu.prototype.parseBgPosVal(splitted_pos[1]) : { value: "0", is_percents: true });

        return { h_pos: h_pos_, v_pos: v_pos_ };
    };

    BgSzEmu.prototype.stringContains = function (str, suffix)
    {
        if (!str)
            return false;

        return str.toString().indexOf(suffix) > -1;
    };

    BgSzEmu.prototype.startsWith = function (str, suffix)
    {
        if (!str)
            return false;

        return str.toString().substring(0, suffix.length) === suffix;
    };

    BgSzEmu.prototype.endsWith = function (str, suffix)
    {
        if (!str)
            return false;

        return str.toString().indexOf(suffix, str.length - suffix.length) >= 0;
    };

    BgSzEmu.prototype.isObjectInArray = function (obj, arr)
    {
        for (var i = 0; i < arr.length; i++)
            if (arr[i] == obj)
                return true;

        return false;
    };

    BgSzEmu.prototype.getCSSPropertyValue = function (elem, css_prop, runtime_prop)
    {
        /*var style_runtime = elem.style[runtime_prop];
        var currentStyle_runtime = elem.currentStyle[runtime_prop];
        var style_attribute = elem.style.getAttribute(css_prop);
        var currentStyle_attribute = elem.currentStyle.getAttribute(css_prop);*/
        return elem.style[runtime_prop] || elem.currentStyle[runtime_prop] || elem.style.getAttribute(css_prop) || elem.currentStyle.getAttribute(css_prop);
    };

    BgSzEmu.prototype.elemCanHaveDivAsChildren = function (elem)
    {
        if (elem.tagName.toLowerCase() == "tr") //hacky avoid of elemens that will become bugged after adding div
            return false;

        var div = document.createElement("div");
        div.style.display = "none";
        var check_result = true;

        try { elem.appendChild(div); }
        catch (exc) { check_result = false; }
        finally
        {
            if (BgSzEmu.prototype.isObjectInArray(div, elem.children))
                elem.removeChild(div);
        }

        return check_result;
    };
    //common functions end

    var bg_sz_emu = new BgSzEmu();
    bg_sz_emu.scanElems();
})();

/*
* calc-polyfill | https://github.com/closingtag/calc-polyfill
*/

(function (win, doc) {

	'use strict';

	// Avoid `console` errors in browsers that lack a console.
	(function() {
		var method;
		var noop = function () {};
		var methods = ['assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error','exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log','markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd','timeline', 'timelineEnd', 'timeStamp', 'trace', 'warn'];

		var length = methods.length;
		var console = (window.console = window.console || {});

		while (length--) {
			method = methods[length];

			// Only stub undefined methods.
			if (!console[method]) {
				console[method] = noop;
			}
		}
	}());

	// We need document.querySelectorAll as we do not want to depend on any lib

	if (!doc.querySelectorAll) {
		return false;
	}

	var

	EMPTY = '',
	CALC_RULE = '^(\\s*?[\\s\\S]*):(\\s*?[\\s\\S]*?((\\-(webkit|moz)\\-)?calc\\(([\\s\\S]+)\\))[\\s\\S]*)?$',
	CSSRULES = '((\\s*?@media[\\s\\S]*?){([\\s\\S]*?)}\\s*?})|(([\\s\\S]*?){([\\s\\S]*?)})',

	KEYFRAMES = new RegExp('((@(-webkit-)?keyframes [\\s\\S]*?){([\\s\\S]*?}\\s*?)})', 'gi'),
	FONTFACE = new RegExp('((@font-face\\s*?){([\\s\\S]*?)})', 'gi'),
	COMMENTS = new RegExp('(\\/\\*[\\s\\S]*?\\*\\/)', 'gi'),
	IMPORTS = new RegExp('@import .*?;', 'gi'),
	CHARSET = new RegExp('@charset .*?;', 'gi'),

	PERCENT = /[\d\.]+%/,
	PT = /\d+pt/,
	PIXEL = /(\d+)px/g,
	REMEM = /[\d\.]+r?em/,
	REM = /[\d\.]+rem/,
	EM = /[\d\.]+em/,
	MATH_EXP = /[\+\-\/\*]?[\d\.]+(px|%|em|rem)?/g,
	PLACEHOLDER = '$1',
	ONLYNUMBERS = /[\s\-0-9]/g,

	FONTSIZE = 'font-size',
	ADDMEDIA = '@media',

	onTextResize = [],
	onWindowResize = [],
	cssTexts = [],
	docLoaded = false
	;

	var utilities = {

		camelize: function ( str ) {

			return str.replace(/\-(\w)/g, function ( str, letter ) {

				return letter.toUpperCase();
			});
		},

		trim: function ( str ) {

			var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;

			return !String.prototype.trim ? str.replace(rtrim, '') : str.trim();
		},

		indexOf: function ( arr, el, from ) {

			var len = arr.length >>> 0;

			from = Number(from) || 0;
			from = (from < 0) ? Math.ceil(from) : Math.floor(from);

			if (from < 0) {
				from += len;
			}

			for (; from < len; from++) {
				if (from in arr && arr[from] === el)
					return from;
			}

			return -1;
		},

		// http://www.quirksmode.org/dom/getstyles.html
		getStyle: function ( el, prop ) {

			if (el.currentStyle) {

				return el.currentStyle[utilities.camelize(prop)];
			} else if (doc.defaultView && doc.defaultView.getComputedStyle) {

				return doc.defaultView.getComputedStyle(el,null).getPropertyValue(prop);

			} else {

				return el.style[utilities.camelize(prop)];
			}
		},

		// http://stackoverflow.com/questions/1955048/get-computed-font-size-for-dom-element-in-js
		getFontsize: function (obj) {
			var size;
			var test = doc.createElement('span');

			test.innerHTML = '&nbsp;';
			test.style.position = 'absolute';
			test.style.lineHeight = '1em';
			test.style.fontSize = '1em';

			obj.appendChild(test);
			size = test.offsetHeight;
			obj.removeChild(test);

			return size;
		},

		addEvent: function ( el, type, fn ){

			if (doc.addEventListener){

				el.addEventListener(type, fn, false);
			} else {

				el.attachEvent('on' + type, fn);
			}
		},

		// http://alistapart.com/article/fontresizing
		// http://www.truerwords.net/articles/web-tech/custom_events.html
		// https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent

		textResize: function(cb) {

			var el, currentSize;

			var createControlElement = function () {

				el = doc.createElement('span');
				el.id = 'text-resize-control';
				el.innerHTML = '&nbsp;';
				el.style.position = 'absolute';
				el.style.left = '-9999px';
				el.style.lineHeight = '1em';
				el.style.fontSize = '1em';

				doc.body.insertBefore(el, doc.body.firstChild);
				currentSize = el.offsetHeight;
			},

			detectChange = function () {

				var now = el.offsetHeight;

				if ( currentSize === now ) {

					win.requestAnimationFrame(detectChange);

					return false;
				}

				currentSize = now;

				if ( cb && typeof cb === 'function' ) {

					cb();
				}

				win.requestAnimationFrame(detectChange);
			};

			createControlElement();
			win.requestAnimationFrame(detectChange);
		}
	};

	var calcTest = function() {

		var el = document.createElement('div');

		el.style.cssText = 'width: -moz-calc(10px); width: -webkit-calc(10px); width: calc(10px)';

		return !!el.style.length;
	},


	getStyleSheets = function () {

		var stylesheets = [];
		var index = 0;
		var len = doc.styleSheets.length;
		var stylesheet;

		for (; index < len; index++) {

			stylesheet = doc.styleSheets[index];
			cssTexts[index] = '';

			if (stylesheet.href && stylesheet.href !== EMPTY) {

				stylesheets.push(stylesheet.href);
			}

			if ( stylesheet.ownerNode && stylesheet.ownerNode.nodeName.toLowerCase() === 'style' ) {

				cssTexts[index] = stylesheet.ownerNode.textContent;
			}
		}


		if ( stylesheets.length > 0 || cssTexts.length > 0 ) {

			loadStylesheets(stylesheets);
		}
	},

	loadStylesheets = function(urls){
		var xhr;
		var index = 0;
		var len = urls.length;

		if ( win.XMLHttpRequest ) {

			xhr = new XMLHttpRequest();
		}
		else {

			try {

				xhr = new ActiveXObject('Microsoft.XMLHTTP');

			} catch(e) {

				xhr = null;
			}
		}

		if (xhr) {

			for (; index < len; index++) {

				try {

					xhr.open('GET', urls[index], false);
					xhr.send();

					if ( xhr.status === 200 ) {
						cssTexts[index] =  xhr.responseText;
					}

				} catch(e) {
					console.log('Error making request for file ' + urls[index] + ': ' + e.message);
				}

			}
		}

		if (cssTexts.length > 0 ) {

			parseStylesheets(cssTexts);
		}
	},

	parseStylesheets = function(texts) {
		var index = 0;
		var len = texts.length;

		for (; index < len; index++) {

			if ( texts[index].length ) {

				texts[index] = texts[index].replace(COMMENTS, EMPTY).replace(CHARSET, EMPTY).replace(IMPORTS, EMPTY).replace(KEYFRAMES, EMPTY).replace(FONTFACE, EMPTY);

				dotheCalc( parseCSS(texts[index]) );
			}
		}
	},

	removeStyles = function ( elements ) {
		var index = 0;
		var len = elements.length;

		for (; index < len; index++) {

			if ( !JSON.parse(elements[index].getAttribute('data-calced')) ) {

				elements[index].removeAttribute('style');
			}
		}
	},

	parseCSS = function( css, media ) {

		var index, len, regex, result, selector, rules, calc, elements, obj, mediaQueryStyleSheet, refSheet;
		var arr = [];

		media = media || '';

		regex = new RegExp(CSSRULES, 'gi');

		while ( true ) {

			result = regex.exec(css);

			if ( result === null ) {
				break;
			}

			selector = utilities.trim( ( result[2] || result[5] ).split('\r\n').join('\n') );

			if ( selector.indexOf( ADDMEDIA ) !== -1 ) {

				rules = result[3] + '\n}';

				arr = arr.concat(parseCSS(rules, selector.replace( ADDMEDIA, '')));
			}
			else {

				rules = result[6].split('\r\n').join('\n').split(';');

				index = 0;
				len = rules.length;

				for (; index < len; index++) {

					calc = new RegExp(CALC_RULE, 'gi').exec(rules[index]);

					try {
						elements = doc.querySelectorAll(selector);
					}
					catch(e) {
						console.log('Error trying to select "' + selector + '": ' + e.message);
						break;
					}

					if ( calc !== null && elements.length ) {

						obj = {
							elements: elements,
							media: media,
							values: utilities.trim( calc[2] ),
							formula: calc[6],
							prop: utilities.trim( calc[1] ),
							placholder: utilities.trim( calc[3] )
						};

						if ( obj.formula.match(PERCENT) ) {
							obj.onresize = true;
						}

						if ( obj.formula.match(REMEM) ) {
							obj.ontextresize = true;
						}

						arr.push(obj);
					}
				}

			}
		}

		return arr;
	},

	dotheCalc = function( calcRules ){
		var index = 0;
		var len = calcRules.length;
		var obj;

		var calc = function( obj ) {
			var i = 0;
			var len = obj.elements.length;
			var refValue, modifier, matches, l, j, result, formula;

			for (; i < len; i++) {

				formula = obj.formula.replace(PIXEL, PLACEHOLDER);
				matches = formula.match(MATH_EXP);
				l = matches.length;
				j = 0;

				for (; j < l; j++) {

					modifier = null;

					if ( matches[j].match(PERCENT) ) {

						refValue = obj.elements[i].parentNode.clientWidth;

						modifier = parseFloat(matches[j], 10) / 100;
					}

					if ( matches[j].match(EM) ) {

						refValue = obj.elements[i].currentStyle ? utilities.getFontsize(obj.elements[i]) : parseInt( utilities.getStyle( obj.elements[i], FONTSIZE).replace(/px/, EMPTY ), 10);

						if ( refValue.match && refValue.match(PT) ) {

							refValue = Math.round( parseInt(refValue.replace(/pt/, ''), 10) * 1.333333333 );
						}

						modifier = parseFloat(matches[j], 10);
					}

					if ( matches[j].match(REM) ) {

						if ( utilities.getStyle( doc.body , FONTSIZE ).match(PERCENT) ) {

							refValue = 16 * parseInt( utilities.getStyle( doc.body , FONTSIZE).replace(/%/, EMPTY), 10) / 100;
						}
						else if ( utilities.getStyle( doc.body , FONTSIZE ).match(PT) ) {

							refValue = Math.round( parseInt(utilities.getStyle( doc.body , FONTSIZE).replace(/pt/, ''), 10) * 1.333333333 );
						}
						else {

							refValue = parseInt( utilities.getStyle( doc.body , FONTSIZE).replace(/px/, EMPTY ), 10);
						}

						modifier = parseFloat(matches[j], 10);
					}

					if ( modifier ) {
						formula = formula.replace(matches[j], refValue * modifier);
					}

				}

				try {

					if ( formula.match(ONLYNUMBERS) ) {

						result = eval( formula );

						obj.elements[i].style[ utilities.trim( utilities.camelize(obj.prop) ) ] = obj.values.replace(obj.placholder,  result + 'px');
						obj.elements[i].setAttribute('data-calced', true);
					}
				}
				catch(e) {}

			}
		};

		for (; index < len; index++) {

			obj = calcRules[index];

			if ( obj.onresize && utilities.indexOf( onWindowResize, obj ) === -1 ) {

				onWindowResize.push(obj);
			}

			if ( obj.ontextresize && utilities.indexOf( onTextResize, obj ) === -1 ) {

				onTextResize.push(obj);
			}

			if ( obj.media !== EMPTY ) {

				if ( win.matchMedia && win.matchMedia(obj.media).matches ) {

					calc(obj);
				}
				else {

					removeStyles( obj.elements );
				}
			}
			else {

				calc(obj);
			}
		}

	};

	// Public interface
	win.dotheCalc = function() {

		if (cssTexts.length > 0 && docLoaded) {

			parseStylesheets(cssTexts);
		}
	};


	contentLoaded(win, function(){

		if ( calcTest() ) {
			return;
		}

		docLoaded = true;

		getStyleSheets();

		if ( onTextResize.length > 0 ) {

			utilities.textResize(function(){

				dotheCalc( onTextResize );
			});
		}

		if ( onWindowResize.length > 0 ) {

			utilities.addEvent(win, 'resize', function (){

				dotheCalc( onWindowResize );
			});
		}
	});

	// Libs and Helpers

	// import libs/contentloaded/src/contentloaded.js
	// import libs/requestAnimationFrame/app/requestAnimationFrame.js


})(window, document);

/*
* REM-unit-polyfill | https://github.com/chuckcarpenter/REM-unit-polyfill
*/
(function (window, undefined) {
    "use strict";
    // test for REM unit support
    var cssremunit =  function() {
        var div = document.createElement( 'div' );
            div.style.cssText = 'font-size: 1rem;';

        return (/rem/).test(div.style.fontSize);
    },

    // filter returned links for stylesheets
    isStyleSheet = function () {
        var styles = document.getElementsByTagName('link'),
            filteredLinks = [];

        for ( var i = 0; i < styles.length; i++) {
            if ( styles[i].rel.toLowerCase() === 'stylesheet' && styles[i].getAttribute('data-norem') === null ) {

                filteredLinks.push( styles[i].href );
            }
        }

        return filteredLinks;
    },

   processLinks = function () {
        //prepare to match each link
        for( var i = 0; i < links.length; i++ ){
            xhr( links[i], storeCSS );
        }
    },

    storeCSS = function ( response, link ) {

        preCSS.push(response.responseText);
        CSSLinks.push(link);

        if( CSSLinks.length === links.length ){
            for( var j = 0; j <  CSSLinks.length; j++ ){
                matchCSS( preCSS[j], CSSLinks[j] );
            }

            if( ( links = importLinks.slice(0) ).length > 0 ){ //after finishing all current links, set links equal to the new imports found
                CSSLinks = [];
                preCSS = [];
                importLinks = [];
                processLinks();
            } else {
                buildCSS();
            }
        }
    },

    matchCSS = function ( sheetCSS, link ) { // collect all of the rules from the xhr response texts and match them to a pattern
        var clean = removeMediaQueries( sheetCSS ).replace(/\/\*[\s\S]*?\*\//g, ''), // remove MediaQueries and comments
            pattern = /[\w\d\s\-\/\\\[\]:,.'"*()<>+~%#^$_=|@]+\{[\w\d\s\-\/\\%#:!;,.'"*()]+\d*\.?\d+rem[\w\d\s\-\/\\%#:!;,.'"*()]*\}/g, //find selectors that use rem in one or more of their rules
            current = clean.match(pattern),
            remPattern =/\d*\.?\d+rem/g,
            remCurrent = clean.match(remPattern),
            sheetPathPattern = /(.*\/)/,
            sheetPath = sheetPathPattern.exec(link)[0], //relative path to css file specified in @import
            importPattern = /@import (?:url\()?['"]?([^'\)"]*)['"]?\)?[^;]*/gm, //matches all @import variations outlined at: https://developer.mozilla.org/en-US/docs/Web/CSS/@import
            importStatement;

        while( (importStatement = importPattern.exec(sheetCSS)) !== null ){
            if( importStatement[1].indexOf("/") === 0 ) { // check if the value of importStatement[1] is a root relative path, in which case it shouldn't be concatenated with sheetPath
                importLinks.push( importStatement[1] );
            } else {
                importLinks.push( sheetPath + importStatement[1] );
            }
        }

        if( current !== null && current.length !== 0 ){
            found = found.concat( current ); // save all of the blocks of rules with rem in a property
            foundProps = foundProps.concat( remCurrent ); // save all of the properties with rem
        }
    },

    buildCSS = function () { // first build each individual rule from elements in the found array and then add it to the string of rules.
        var pattern = /[\w\d\s\-\/\\%#:,.'"*()]+\d*\.?\d+rem[\w\d\s\-\/\\%#:!,.'"*()]*[;}]/g; // find properties with rem values in them
        for( var i = 0; i < found.length; i++ ){
            rules = rules + found[i].substr(0,found[i].indexOf("{")+1); // save the selector portion of each rule with a rem value
            var current = found[i].match( pattern );
            for( var j = 0; j<current.length; j++ ){ // build a new set of with only the selector and properties that have rem in the value
                rules = rules + current[j];
                if( j === current.length-1 && rules[rules.length-1] !== "}" ){
                    rules = rules + "\n}";
                }
            }
        }

        parseCSS();
    },

    parseCSS = function () { // replace each set of parentheses with evaluated content
        for( var i = 0; i < foundProps.length; i++ ){
            css[i] = Math.round( parseFloat(foundProps[i].substr(0,foundProps[i].length-3)*fontSize) ) + 'px';
        }

        loadCSS();
    },

    loadCSS = function () { // replace and load the new rules
        for( var i = 0; i < css.length; i++ ){ // only run this loop as many times as css has entries
            if( css[i] ){
                rules = rules.replace( foundProps[i],css[i] ); // replace old rules with our processed rules
            }
        }
        var remcss = document.createElement( 'style' );
        remcss.setAttribute( 'type', 'text/css' );
        remcss.id = 'remReplace';
        document.getElementsByTagName( 'head' )[0].appendChild( remcss );   // create the new element
        if( remcss.styleSheet ) {
            remcss.styleSheet.cssText = rules; // IE8 will not support innerHTML on read-only elements, such as STYLE
        } else {
            remcss.appendChild( document.createTextNode( rules ) );
        }
    },

    xhr = function ( url, callback ) { // create new XMLHttpRequest object and run it
        try {
            //try to create a request object
            //arranging the two conditions this way is for IE7/8's benefit
            //so that it works with any combination of ActiveX or Native XHR settings, 
            //as long as one or the other is enabled; but if both are enabled
            //it prefers ActiveX, which means it still works with local files
            //(Native XHR in IE7/8 is blocked and throws "access is denied",
            // but ActiveX is permitted if the user allows it [default is to prompt])
            var xhr = window.ActiveXObject ? ( new ActiveXObject('Microsoft.XMLHTTP') || new ActiveXObject('Msxml2.XMLHTTP') ) : new XMLHttpRequest();

            xhr.open( 'GET', url, true );
            xhr.onreadystatechange = function() {
                if ( xhr.readyState === 4 ){
                    callback(xhr, url);
                } // else { callback function on AJAX error }
            };

            xhr.send( null );
        } catch (e){
            if ( window.XDomainRequest ) {
                var xdr = new XDomainRequest();
                xdr.open('get', url);
                xdr.onload = function() {
                    callback(xdr, url);
                };
                xdr.onerror = function() {
                    return false; // xdr load fail
                };
                xdr.send();
            }
        }
    },

    // Remove queries.
    removeMediaQueries = function(css) {
        // Test for Media Query support
        if ( !window.matchMedia && !window.msMatchMedia ) {
            // If the browser doesn't support media queries, we find all @media declarations in the CSS and remove them.
            // Note: Since @rules can't be nested in the CSS spec, we're safe to just check for the closest following "}}" to the "@media".
            css = css.replace(/@media[\s\S]*?\}\s*\}/g, "");
        }

        return css;
    };

    if( !cssremunit() ){ // this checks if the rem value is supported
        var rules = '', // initialize the rules variable in this scope so it can be used later
            links = isStyleSheet(), // initialize the array holding the sheets urls for use later
            importLinks = [], //initialize the array holding the import sheet urls for use later
            found = [], // initialize the array holding the found rules for use later
            foundProps = [], // initialize the array holding the found properties for use later
            preCSS = [], // initialize array that holds css before being parsed
            CSSLinks = [], //initialize array holding css links returned from xhr
            css = [], // initialize the array holding the parsed rules for use later
            fontSize = '';

        // Notice: rem is a "root em" that means that in case when html element size was changed by css
        // or style we should not change document.documentElement.fontSize to 1em - only body size should be changed
        // to 1em for calculation

        fontSize = (function () {
            var doc = document,
                docElement = doc.documentElement,
                body = doc.body || doc.createElement('body'),
                isFakeBody = !doc.body,
                div = doc.createElement('div'),
                currentSize = body.style.fontSize,
                size;

            if ( isFakeBody ) {
                docElement.appendChild( body );
            }

            div.style.cssText = 'width:1em; position:absolute; visibility:hidden; padding: 0;';

            body.style.fontSize = '1em';

            body.appendChild( div );
            size = div.offsetWidth;

            if ( isFakeBody ) {
                docElement.removeChild( body );
            }
            else {
                body.removeChild( div );
                body.style.fontSize = currentSize;
            }

            return size;
        }());

        processLinks();
    } // else { do nothing, you are awesome and have REM support }

})(window);

/*
* transformie | https://github.com/pbakaus/transformie
*/
var Transformie = {
	
	defaults: {
		inlineCSS: '*',
		stylesheets: true,
		track: '*',
		centerOrigin: 'margin' //false, position
	},
	
	toRadian: function(value) {
		if(value.indexOf("deg") != -1) {
			return parseFloat(value,10) * (Math.PI * 2 / 360);
		} else if (value.indexOf("grad") != -1) {
			return parseFloat(value,10) * (Math.PI/200);
		} else {
			return parseFloat(value,10);
		}
	},
	
	getTransformValue: function(style) {
		return style['-webkit-transform']
		|| 	style['webkit-transform'] 
		|| 	style['transform']
		|| 	style.webkitTransform
		||	style['-moz-transform']
		|| 	style['moz-transform'] 
		|| 	style.MozTransform
		|| 	style.mozTransform;
	},
	
	track: function(query) {
		jQuery(query).unbind('propertychange').bind('propertychange', function(e) {
			if(e.originalEvent.propertyName == 'style.webkitTransform' || e.originalEvent.propertyName == 'style.MozTransform' || e.originalEvent.propertyName == 'style.transform')
				Transformie.applyMatrixToElement(Transformie.computeMatrix(Transformie.getTransformValue(this.style)), this);
		});
	},
	
	apply: function(selector) {
		jQuery(selector).each(function() {
			var foundRule = Transformie.getTransformValue(this.style);
			foundRule && Transformie.applyMatrixToElement(Transformie.computeMatrix(foundRule), this);
		});
	},
	
	parseStylesheets: function() {	
		//Loop through all stylesheets and apply initial rules
		for (var i=0; i < document.styleSheets.length; i++) {
			if(document.styleSheets[i].readOnly) continue; // if the stylesheet gives us security issues and is readOnly, exit here
			for (var j=0; j < document.styleSheets[i].rules.length; j++) {
				var foundRule = Transformie.getTransformValue(document.styleSheets[i].rules[j].style);
				foundRule && Transformie.applyMatrixToSelector(Transformie.computeMatrix(foundRule), document.styleSheets[i].rules[j].selectorText);
			};
		};	
		
	},
	
	applyMatrixToSelector: function(matrix, selector) {

		//TODO: Figure what to do with :hover, can't just apply it to found elements
		if(selector.indexOf && selector.indexOf(':hover') != -1)
			return;
		
		jQuery(selector).each(function() {
			Transformie.applyMatrixToElement(matrix, this);
		});
		
	},
	
	applyMatrixToElement: function(matrix, element) {
		
		if(!element.filters["DXImageTransform.Microsoft.Matrix"]) {
			element.style.filter = (element.style.filter ? '' : ' ' ) + "progid:DXImageTransform.Microsoft.Matrix(sizingMethod='auto expand')";
			Transformie.track(element); // if an element is being tracked once, it is likely we do something with it later on, so track changes on this one by default
		}

		element.filters["DXImageTransform.Microsoft.Matrix"].M11 = matrix.elements[0][0];
		element.filters["DXImageTransform.Microsoft.Matrix"].M12 = matrix.elements[0][1];
		element.filters["DXImageTransform.Microsoft.Matrix"].M21 = matrix.elements[1][0];
		element.filters["DXImageTransform.Microsoft.Matrix"].M22 = matrix.elements[1][1];
		
		// Since we unfortunately do not have the possibility to use Dx,Dy with sizing method 'auto expand', we need to do
		// something hacky to work around supporting the transform-origin property, either modifying top/left or margins.
		// IE Team: Would be really helpful if you could fix this to work on auto expand, or introduce a sizing method that works like the default, but doesn't clip..
		if(Transformie.defaults.centerOrigin) { //TODO: Add computed borders here to clientWidth/height or find a better prop to look for
			element.style[Transformie.defaults.centerOrigin == 'margin' ? 'marginLeft' : 'left'] = -(element.offsetWidth/2) + (element.clientWidth/2) + "px";
			element.style[Transformie.defaults.centerOrigin == 'margin' ? 'marginTop' : 'top'] = -(element.offsetHeight/2) + (element.clientHeight/2) + "px";
		}
		
	},
	
	computeMatrix: function(ruleValue) {
	
		//Split the webkit functions and loop through them
		var functions = ruleValue.match(/[A-z]+\([^\)]+/g) || [];
		var matrices = [];
		
		for (var k=0; k < functions.length; k++) {
		
			//Prepare the function name and its value
			var func = functions[k].split('(')[0],
				value = functions[k].split('(')[1];
		
			//Now we rotate through the functions and add it to our matrix
			switch(func) {
				case 'matrix': //Attention: Matrix in IE doesn't support e,f = tx,ty = translation
					var values = value.split(',');
					matrices.push($M([
						[values[0],	values[2],	0],
						[values[1],	values[3],	0],
						[0,					0,	1]
					]));
					break;
				case 'rotate':
					var a = Transformie.toRadian(value);
					matrices.push($M([
						[Math.cos(a),	-Math.sin(a),	0],
						[Math.sin(a),	Math.cos(a),	0],
						[0,				0,				1]
					]));
					break;
				case 'scale':
					matrices.push($M([
						[value,	0,		0],
						[0,		value,	0],
						[0,		0,		1]
					]));
					break;
				case 'scaleX':
					matrices.push($M([
						[value,	0,		0],
						[0,		1,		0],
						[0,		0,		1]
					]));
					break;
				case 'scaleY':
					matrices.push($M([
						[1,		0,		0],
						[0,		value,	0],
						[0,		0,		1]
					]));
					break;
				case 'skew':
					var a = Transformie.toRadian(value);
					matrices.push($M([
						[1,				0,	0],
						[Math.tan(a),	1,	0],
						[0,				0,	1]
					]));
				case 'skewX':
					var a = Transformie.toRadian(value);
					matrices.push($M([
						[1,		Math.tan(a),0],
						[0,		1,			0],
						[0,		0,			1]
					]));
					break;
				case 'skewY':
					var a = Transformie.toRadian(value);
					matrices.push($M([
						[1,				0,	0],
						[Math.tan(a),	1,	0],
						[0,				0,	1]
					]));
					break;
			};
			
		};
		
		if(!matrices.length)
			return;
		
		//Calculate the resulting matrix
		var matrix = matrices[0];
		for (var k=0; k < matrices.length; k++) {
			if(matrices[k+1]) matrix = matrix.x(matrices[k+1]);
		};

		return matrix;
		
	}	
};


jQuery(function() {

	if( navigator.userAgent.indexOf("MSIE ") == -1) return;

	// Parsing stylesheets, almost always makes sense
	Transformie.defaults.stylesheets && Transformie.parseStylesheets();

	// if we want to track inline CSS, we're resolving all inline transforms at page launch
	Transformie.inlineCSS && Transformie.apply(Transformie.inlineCSS === true ? '*' : Transformie.inlineCSS);
	
	// we have a dynamic site and we want to track inline style changes on a list of elements
	Transformie.defaults.track && Transformie.track(Transformie.defaults.track);
	
});

/*
* vminpoly | https://github.com/saabi/vminpoly
*/

(function() {
  var XMLHttpFactories, ajax, applyStyleTest, browserSupportsUnitsNatively, clearStyleTests, createXMLHTTPObject, getViewportSize, initLayoutEngine, testElementStyle, testVHSupport, testVMinSupport, testVWSupport;

  XMLHttpFactories = [
    function() {
      return new XMLHttpRequest();
    }, function() {
      return new ActiveXObject("Msxml2.XMLHTTP");
    }, function() {
      return new ActiveXObject("Msxml3.XMLHTTP");
    }, function() {
      return new ActiveXObject("Microsoft.XMLHTTP");
    }
  ];

  createXMLHTTPObject = function() {
    var e, i, xmlhttp;
    xmlhttp = false;
    i = 0;
    while (i < XMLHttpFactories.length) {
      try {
        xmlhttp = XMLHttpFactories[i++]();
      } catch (_error) {
        e = _error;
        continue;
      }
      break;
    }
    return xmlhttp;
  };

  ajax = function(url, onload) {
    var e, xmlhttp;
    xmlhttp = createXMLHTTPObject();
    xmlhttp.onreadystatechange = function() {
      if (xmlhttp.readyState !== 4) {
        return;
      }
      if (!(xmlhttp.status === 200 || url.match(/^file:\/\/\//))) {
        throw "Error!";
      }
      console.log("INFO: processing " + url);
      onload(xmlhttp.responseText);
    };
    try {
      xmlhttp.open("GET", url, true);
      xmlhttp.send();
    } catch (_error) {
      e = _error;
      console.log("ERROR: " + e.message + " (" + e.type + ") when accessing " + url);
    }
  };

  getViewportSize = function() {
    var x, y;
    x = 0;
    y = 0;
    if (window.innerHeight) {
      x = window.innerWidth;
      y = window.innerHeight;
    } else if (document.documentElement && document.documentElement.clientHeight) {
      x = document.documentElement.clientWidth;
      y = document.documentElement.clientHeight;
    } else if (document.body) {
      x = document.body.clientWidth;
      y = document.body.clientHeight;
    }
    return {
      width: x,
      height: y
    };
  };

  browserSupportsUnitsNatively = function() {
    var body, head, style_block, test_element, test_results;
    test_element = document.createElement('div');
    test_element.id = "vminpolyTests";
    body = document.getElementsByTagName('body')[0];
    body.appendChild(test_element);
    style_block = document.createElement('style');
    head = document.getElementsByTagName('head')[0];
    head.appendChild(style_block);
    test_results = testVWSupport(test_element, style_block) && testVWSupport(test_element, style_block) && testVMinSupport(test_element, style_block);
    body.removeChild(test_element);
    head.removeChild(style_block);
    return test_results;
  };

  testElementStyle = function(element) {
    if (window.getComputedStyle) {
      return getComputedStyle(element, null);
    } else {
      return element.currentStyle;
    }
  };

  applyStyleTest = function(style_block, style) {
    var new_style, test_style;
    new_style = "#vminpolyTests { " + style + "; }";
    if (style_block.styleSheet) {
      return style_block.styleSheet.cssText = new_style;
    } else {
      test_style = document.createTextNode(new_style);
      return style_block.appendChild(test_style);
    }
  };

  clearStyleTests = function(style_block) {
    if (style_block.styleSheet) {
      return style_block.styleSheet.cssText = '';
    } else {
      return style_block.innerHTML = '';
    }
  };

  testVHSupport = function(element, style_block) {
    var comp_style, height;
    applyStyleTest(style_block, 'height: 50vh');
    height = parseInt(window.innerHeight / 2, 10);
    comp_style = parseInt(testElementStyle(element).height, 10);
    clearStyleTests(style_block);
    return comp_style === height;
  };

  testVWSupport = function(element, style_block) {
    var comp_style, width;
    applyStyleTest(style_block, 'width: 50vw');
    width = parseInt(window.innerWidth / 2, 10);
    comp_style = parseInt(testElementStyle(element).width, 10);
    clearStyleTests(style_block);
    return comp_style === width;
  };

  testVMinSupport = function(element, style_block) {
    var actual_vmin, comp_width, docElement, one_vh, one_vw;
    applyStyleTest(style_block, 'width: 50vmin');
    docElement = document.documentElement;
    one_vw = docElement.clientWidth / 100;
    one_vh = docElement.clientHeight / 100;
    actual_vmin = parseInt(Math.min(one_vw, one_vh) * 50, 10);
    comp_width = parseInt(testElementStyle(element).width, 10);
    clearStyleTests(style_block);
    return actual_vmin === comp_width;
  };

  initLayoutEngine = function() {
    var analyzeStyleRule, analyzeStylesheet, head, i, innerSheetCount, links, onresize, outerSheetCount, sheets, styleElement, _i, _len;
    analyzeStyleRule = function(rule) {
      var declaration, declarations, hasDimension, token, _i, _j, _len, _len1, _ref, _ref1;
      declarations = [];
      _ref = rule.value;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        declaration = _ref[_i];
        hasDimension = false;
        _ref1 = declaration.value;
        for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
          token = _ref1[_j];
          if (token.tokenType === 'DIMENSION' && (token.unit === 'vmin' || token.unit === 'vh' || token.unit === 'vw')) {
            hasDimension = true;
          }
        }
        if (hasDimension) {
          declarations.push(declaration);
        }
      }
      rule.value = declarations;
      return declarations;
    };
    analyzeStylesheet = function(sheet) {
      var atRules, decs, rule, rules, _i, _len, _ref;
      rules = [];
      _ref = sheet.value;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        rule = _ref[_i];
        switch (rule.type) {
          case 'STYLE-RULE':
            decs = analyzeStyleRule(rule);
            if (decs.length !== 0) {
              rules.push(rule);
            }
            break;
          case 'AT-RULE':
            atRules = analyzeStylesheet(rule);
            if (atRules.length !== 0) {
              rules.push(rule);
            }
        }
      }
      sheet.value = rules;
      return rules;
    };
    onresize = function() {
      var css, dims, generateRuleCode, generateSheetCode, map, sheet, url, vpAspectRatio, vpDims;
      vpDims = getViewportSize();
      dims = {
        vh: vpDims.height / 100,
        vw: vpDims.width / 100
      };
      dims.vmin = Math.min(dims.vh, dims.vw);
      vpAspectRatio = vpDims.width / vpDims.height;
      map = function(a, f) {
        var a1, e, _i, _len;
        if (a.map != null) {
          return a.map(f);
        } else {
          a1 = [];
          for (_i = 0, _len = a.length; _i < _len; _i++) {
            e = a[_i];
            a1.push(f(e));
          }
          return a1;
        }
      };
      generateRuleCode = function(rule) {
        var declaration, declarations, ruleCss, token, _i, _j, _len, _len1, _ref, _ref1;
        declarations = [];
        ruleCss = (map(rule.selector, function(o) {
          if (o.toSourceString != null) {
            return o.toSourceString();
          } else {
            return '';
          }
        })).join('');
        ruleCss += "{";
        _ref = rule.value;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          declaration = _ref[_i];
          ruleCss += declaration.name;
          ruleCss += ":";
          _ref1 = declaration.value;
          for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
            token = _ref1[_j];
            if (token.tokenType === 'DIMENSION' && (token.unit === 'vmin' || token.unit === 'vh' || token.unit === 'vw')) {
              ruleCss += "" + (Math.floor(token.num * dims[token.unit])) + "px";
            } else {
              ruleCss += token.toSourceString();
            }
          }
          ruleCss += ";";
        }
        ruleCss += "}\r";
        return ruleCss;
      };
      generateSheetCode = function(sheet) {
        var mar, nums, prelude, rule, sheetCss, source, t, t1, _i, _j, _k, _l, _len, _len1, _len2, _len3, _ref, _ref1, _ref2, _ref3;
        sheetCss = '';
        _ref = sheet.value;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          rule = _ref[_i];
          switch (rule.type) {
            case 'STYLE-RULE':
              sheetCss += generateRuleCode(rule);
              break;
            case 'AT-RULE':
              if (rule.name === 'media') {
                prelude = '';
                mar = false;
                nums = [];
                _ref1 = rule.prelude;
                for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
                  t = _ref1[_j];
                  if (t.name === '(') {
                    prelude += '(';
                    _ref2 = t.value;
                    for (_k = 0, _len2 = _ref2.length; _k < _len2; _k++) {
                      t1 = _ref2[_k];
                      source = t1.toSourceString != null ? t1.toSourceString() : '';
                      if (t1.tokenType === 'IDENT' && source === 'max-aspect-ratio') {
                        mar = true;
                      }
                      if (t1.tokenType === 'NUMBER') {
                        nums.push(parseInt(source));
                      }
                      prelude += source;
                    }
                    prelude += ')';
                  } else {
                    prelude += t.toSourceString();
                  }
                }
                if (vpAspectRatio < nums[0] / nums[1]) {
                  sheetCss += generateSheetCode(rule);
                }
              } else {
                prelude = '';
                _ref3 = rule.prelude;
                for (_l = 0, _len3 = _ref3.length; _l < _len3; _l++) {
                  t = _ref3[_l];
                  if (t.name === '(') {
                    prelude += '(';
                    prelude += (map(t.value, function(o) {
                      if (o.toSourceString != null) {
                        return o.toSourceString();
                      } else {
                        return '';
                      }
                    })).join('');
                    prelude += ')';
                  } else {
                    prelude += t.toSourceString();
                  }
                }
                sheetCss += "@" + rule.name + " " + prelude + " {";
                sheetCss += generateSheetCode(rule);
                sheetCss += '}\n';
              }
          }
        }
        return sheetCss;
      };
      css = '';
      for (url in sheets) {
        sheet = sheets[url];
        css += generateSheetCode(sheet);
      }
      if (styleElement.styleSheet != null) {
        return styleElement.styleSheet.cssText = css;
      } else {
        return styleElement.innerHTML = css;
      }
    };
    sheets = {};
    styleElement = document.createElement('style');
    head = document.getElementsByTagName('head')[0];
    head.appendChild(styleElement);
    links = document.getElementsByTagName('link');
    innerSheetCount = 0;
    outerSheetCount = 0;
    for (_i = 0, _len = links.length; _i < _len; _i++) {
      i = links[_i];
      if (i.rel !== 'stylesheet') {
        continue;
      }
      innerSheetCount++;
      ajax(i.href, function(cssText) {
        var sheet, tokenlist;
        tokenlist = tokenize(cssText);
        sheet = parse(tokenlist);
        analyzeStylesheet(sheet);
        sheets[i.href] = sheet;
        outerSheetCount++;
        if (outerSheetCount === innerSheetCount) {
          window.onresize();
        }
      });
    }
    window.onresize = onresize;
  };

  console.log('About to do the engine unless...', browserSupportsUnitsNatively());

  if (!browserSupportsUnitsNatively()) {
    initLayoutEngine();
  }

}).call(this);
