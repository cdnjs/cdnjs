/*!	SWFMini - a SWFObject 2.2 cut down version for webshims
 * 
 * based on SWFObject v2.2 <http://code.google.com/p/swfobject/> 
	is released under the MIT License <http://www.opensource.org/licenses/mit-license.php> 
*/

var swfmini = function() {
	var wasRemoved = function(){webshims.error('This method was removed from swfmini');};
	var UNDEF = "undefined",
		OBJECT = "object",
		webshims = window.webshims,
		SHOCKWAVE_FLASH = "Shockwave Flash",
		SHOCKWAVE_FLASH_AX = "ShockwaveFlash.ShockwaveFlash",
		FLASH_MIME_TYPE = "application/x-shockwave-flash",
		
		win = window,
		doc = document,
		nav = navigator,
		
		plugin = false,
		domLoadFnArr = [main],

		isDomLoaded = false,
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
	}();
	
	
	function callDomLoadFunctions() {
		if (isDomLoaded) { return; }
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

	
	/* Main function
		- Will preferably execute onDomLoad, otherwise onload (as a fallback)
	*/
	function main() { 
		if (plugin) {
			testPlayerVersion();
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
			})();
		}
	}

	
	function createElement(el) {
		return doc.createElement(el);
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
	
	



	webshims.ready('DOM', callDomLoadFunctions);

	webshims.loader.addModule('swfmini-embed', {d: ['swfmini']});
	var loadEmbed = hasPlayerVersion('9.0.0') ?
		function(){
			webshims.loader.loadList(['swfmini-embed']);
			return true;
		} :
		webshims.$.noop
	;

	if(!webshims.support.mediaelement){
		loadEmbed();
	} else {
		webshims.ready('WINDOWLOAD', loadEmbed);
	}

	return {
		/* Public API
			- Reference: http://code.google.com/p/swfobject/wiki/documentation
		*/ 
		registerObject: wasRemoved,
		
		getObjectById: wasRemoved,
		
		embedSWF: function(swfUrlStr, replaceElemIdStr, widthStr, heightStr, swfVersionStr, xiSwfUrlStr, flashvarsObj, parObj, attObj, callbackFn) {
			var args = arguments;
			if(loadEmbed()){
				webshims.ready('swfmini-embed', function(){
					swfmini.embedSWF.apply(swfmini, args);
				});
			} else if(callbackFn) {
				callbackFn({success:false, id:replaceElemIdStr});
			}
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
		
		showExpressInstall: wasRemoved,
		
		removeSWF: wasRemoved,
		
		createCSS: wasRemoved,
		
		addDomLoadEvent: addDomLoadEvent,
		
		addLoadEvent: wasRemoved,
		
		
		// For internal usage only
		expressInstallCallback: wasRemoved
	};
}();

webshims.isReady('swfmini', true);
;webshims.register('form-core', function($, webshims, window, document, undefined, options){
	"use strict";

	webshims.capturingEventPrevented = function(e){
		if(!e._isPolyfilled){
			var isDefaultPrevented = e.isDefaultPrevented;
			var preventDefault = e.preventDefault;
			e.preventDefault = function(){
				clearTimeout($.data(e.target, e.type + 'DefaultPrevented'));
				$.data(e.target, e.type + 'DefaultPrevented', setTimeout(function(){
					$.removeData(e.target, e.type + 'DefaultPrevented');
				}, 30));
				return preventDefault.apply(this, arguments);
			};
			e.isDefaultPrevented = function(){
				return !!(isDefaultPrevented.apply(this, arguments) || $.data(e.target, e.type + 'DefaultPrevented') || false);
			};
			e._isPolyfilled = true;
		}
	};


	var modules = webshims.modules;
	var support = webshims.support;
	var isValid = function(elem){
		return ($.prop(elem, 'validity') || {valid: 1}).valid;
	};
	var lazyLoad = function(){
		var toLoad = ['form-validation'];

		$(document).off('.lazyloadvalidation');

		if(options.lazyCustomMessages){
			options.customMessages = true;
			toLoad.push('form-message');
		}

		if(webshims._getAutoEnhance(options.customDatalist)){
			options.fD = true;
			toLoad.push('form-datalist');
		}

		if(options.addValidators){
			toLoad.push('form-validators');
		}
		webshims.reTest(toLoad);
	};
	/*
	 * Selectors for all browsers
	 */
	
	var extendSels = function(){
		var matches, matchesOverride;
		var exp = $.expr[":"];
		var rElementsGroup = /^(?:form|fieldset)$/i;
		var hasInvalid = function(elem){
			var ret = false;
			$(elem).jProp('elements').each(function(){
				if(!rElementsGroup.test(this.nodeName || '')){
					ret = exp.invalid(this);
					if(ret){
						return false;
					}
				}

			});
			return ret;
		};
		$.extend(exp, {
			"valid-element": function(elem){
				return rElementsGroup.test(elem.nodeName || '') ? !hasInvalid(elem) : !!($.prop(elem, 'willValidate') && isValid(elem));
			},
			"invalid-element": function(elem){
				return rElementsGroup.test(elem.nodeName || '') ? hasInvalid(elem) : !!($.prop(elem, 'willValidate') && !isValid(elem));
			},
			"required-element": function(elem){
				return !!($.prop(elem, 'willValidate') && $.prop(elem, 'required'));
			},
			"user-error": function(elem){
				return ($.prop(elem, 'willValidate') && $(elem).getShadowElement().hasClass((options.iVal.errorClass || 'user-error')));
			},
			"optional-element": function(elem){
				return !!($.prop(elem, 'willValidate') && $.prop(elem, 'required') === false);
			}
		});
		
		['valid', 'invalid', 'required', 'optional'].forEach(function(name){
			exp[name] = $.expr[":"][name+"-element"];
		});
		
		// sizzle/jQuery has a bug with :disabled/:enabled selectors
		if(support.fieldsetdisabled && !$('<fieldset disabled=""><input /><input /></fieldset>').find(':disabled').filter(':disabled').is(':disabled')){
			matches = $.find.matches;
			matchesOverride = {':disabled': 1, ':enabled': 1};
			$.find.matches = function(expr, elements){
				if(matchesOverride[expr]){
					return matches.call(this, '*'+expr, elements);
				}
				return matches.apply(this, arguments);
			};
			$.extend(exp, {
				"enabled": function( elem ) {
					return 'disabled' in elem && elem.disabled === false && !$.find.matchesSelector(elem, 'fieldset[disabled] *');
				},
		
				"disabled": function( elem ) {
					return elem.disabled === true || ('disabled' in elem && $.find.matchesSelector(elem, 'fieldset[disabled] *'));
				}
			});
		}
		
		
		//bug was partially fixed in 1.10.0 for IE9, but not IE8 (move to es5 as soon as 1.10.2 is used)
		if(typeof document.activeElement == 'unknown'){
			var pseudoFocus = exp.focus;
			exp.focus = function(){
				try {
					return pseudoFocus.apply(this, arguments);
				} catch(e){
					webshims.error(e);
				}
				return false;
			};
		}
	};
	var formExtras = {
		noAutoCallback: true,
		options: options
	};
	var addModule = webshims.loader.addModule;
	var lazyLoadProxy = function(obj, fn, args){
		lazyLoad();
		webshims.ready('form-validation', function(){
			obj[fn].apply(obj, args);
		});
	};

	var transClass = ('transitionDelay' in document.documentElement.style) ?  '' : ' no-transition';
	var poCFG = webshims.cfg.wspopover;

	addModule('form-validation', $.extend({d: ['form-message']}, formExtras));

	addModule('form-validators', $.extend({}, formExtras));


	if(support.formvalidation && !webshims.bugs.bustedValidity){
		//create delegatable events
		webshims.capturingEvents(['invalid'], true);
	}
	
	if($.expr.filters){
		extendSels();
	} else {
		webshims.ready('sizzle', extendSels);
	}

	webshims.triggerInlineForm = function(elem, event){
		$(elem).trigger(event);
	};
	

	if(!poCFG.position && poCFG.position !== false){
		poCFG.position = {
			at: 'left bottom',
			my: 'left top',
			collision: 'fit flip'
		};
	}
	webshims.wsPopover = {
		id: 0,
		_create: function(){
			this.options = $.extend(true, {}, poCFG, this.options);
			this.id = webshims.wsPopover.id++;
			this.eventns = '.wsoverlay' + this.id;
			this.timers = {};
			this.element = $('<div class="ws-popover'+transClass+'" tabindex="-1"><div class="ws-po-outerbox"><div class="ws-po-arrow"><div class="ws-po-arrowbox" /></div><div class="ws-po-box" /></div></div>');
			this.contentElement = $('.ws-po-box', this.element);
			this.lastElement = $([]);
			this.bindElement();
			
			this.element.data('wspopover', this);
			
		},
		options: {},
		content: function(html){
			this.contentElement.html(html);
		},
		bindElement: function(){
			var that = this;
			var stopBlur = function(){
				that.stopBlur = false;
			};
			this.preventBlur = function(e){
				that.stopBlur = true;
				clearTimeout(that.timers.stopBlur);
				that.timers.stopBlur = setTimeout(stopBlur, 9);
			};
			this.element.on({
				'mousedown': this.preventBlur
			});
		},
		show: function(){
			lazyLoadProxy(this, 'show', arguments);
		}
	};
	
	/* some extra validation UI */
	webshims.validityAlert = {
		showFor: function(){
			lazyLoadProxy(this, 'showFor', arguments);
		}
	};
	
	
	webshims.getContentValidationMessage = function(elem, validity, key){
		var customRule;
		if(webshims.errorbox && webshims.errorbox.initIvalContentMessage){
			webshims.errorbox.initIvalContentMessage(elem);
		}
		var message = (webshims.getOptions && webshims.errorbox ? webshims.getOptions(elem, 'errormessage', false, true) : $(elem).data('errormessage')) || elem.getAttribute('x-moz-errormessage') || '';
		if(key && message[key]){
			message = message[key];
		} else if(message) {
			validity = validity || $.prop(elem, 'validity') || {valid: 1};
			if(validity.valid){
				message = '';
			}
		}
		if(typeof message == 'object'){
			validity = validity || $.prop(elem, 'validity') || {valid: 1};
			if(validity.customError && (customRule = $.data(elem, 'customMismatchedRule')) && message[customRule] && typeof message[customRule] == 'string'){
				message = message[customRule];
			} else if(!validity.valid){
				$.each(validity, function(name, prop){
					if(prop && name != 'valid' && message[name]){
						message = message[name];
						return false;
					}
				});
				if(typeof message == 'object'){
					if(validity.typeMismatch && message.badInput){
						message = message.badInput;
					}
					if(validity.badInput && message.typeMismatch){
						message = message.typeMismatch;
					}
				}
			}
		}
		
		if(typeof message == 'object'){
			message = message.defaultMessage;
		}
		if(webshims.replaceValidationplaceholder){
			message = webshims.replaceValidationplaceholder(elem, message);
		}
		return message || '';
	};
	
	$.fn.getErrorMessage = function(key){
		var message = '';
		var elem = this[0];
		if(elem){
			message = webshims.getContentValidationMessage(elem, false, key) || $.prop(elem, 'customValidationMessage') || $.prop(elem, 'validationMessage');
		}
		return message;
	};

	$.event.special.valuevalidation = {
		setup: function(){
			webshims.error('valuevalidation was renamed to validatevalue!');
		}
	};


	$.event.special.validatevalue = {
		setup: function(){
			var data = $(this).data() || $.data(this, {});
			if(!('validatevalue' in data)){
				data.validatevalue = true;
			}
		}
	};


	$(document).on('focusin.lazyloadvalidation mousedown.lazyloadvalidation touchstart.lazyloadvalidation', function(e){
		if('form' in e.target){
			lazyLoad();
		}
	});

	webshims.ready('WINDOWLOAD', lazyLoad);

	if(modules['form-number-date-ui'].loaded && !options.customMessages && (modules['form-number-date-api'].test() || (support.inputtypes.range && support.inputtypes.color))){
		webshims.isReady('form-number-date-ui', true);
	}

	webshims.ready('DOM', function(){
		if(document.querySelector('.ws-custom-file')){
			webshims.reTest(['form-validation']);
		}
	});

	$(function(){
		var fileReaderReady = ('FileReader' in window && 'FormData' in window);
		if(!fileReaderReady){
			webshims.addReady(function(context){
				if(!fileReaderReady && !modules.filereader.loaded && !modules.moxie.loaded){
					if(context.querySelector('input.ws-filereader')){
						webshims.reTest(['filereader', 'moxie']);
						fileReaderReady = true;
					}
				}
			});
		}
	});

	if(options.addValidators && options.fastValidators){
		webshims.reTest(['form-validators', 'form-validation']);
	}

	if(document.readyState == 'complete'){
		webshims.isReady('WINDOWLOAD', true);
	}
});
;(function(webshims){
	"use strict";
	var support = webshims.support;
	var hasNative = support.mediaelement;
	var supportsLoop = false;
	var bugs = webshims.bugs;
	var swfType = 'mediaelement-jaris';
	var loadSwf = function(){
		webshims.ready(swfType, function(){
			if(!webshims.mediaelement.createSWF){
				webshims.mediaelement.loadSwf = true;
				webshims.reTest([swfType], hasNative);
			}
		});
	};

	var wsCfg = webshims.cfg;
	var options = wsCfg.mediaelement;
	var isIE = navigator.userAgent.indexOf('MSIE') != -1;
	if(!options){
		webshims.error("mediaelement wasn't implemented but loaded");
		return;
	}

	if(hasNative){
		var videoElem = document.createElement('video');
		support.videoBuffered = ('buffered' in videoElem);
		support.mediaDefaultMuted = ('defaultMuted' in videoElem);
		supportsLoop = ('loop' in videoElem);
		support.mediaLoop = supportsLoop;

		webshims.capturingEvents(['play', 'playing', 'waiting', 'paused', 'ended', 'durationchange', 'loadedmetadata', 'canplay', 'volumechange']);
		
		if( !support.videoBuffered || !supportsLoop || (!support.mediaDefaultMuted && isIE && 'ActiveXObject' in window) ){
			webshims.addPolyfill('mediaelement-native-fix', {
				d: ['dom-support']
			});
			webshims.loader.loadList(['mediaelement-native-fix']);
		}
	}
	
	if(support.track && !bugs.track){
		(function(){
			if(!bugs.track){

				if(window.VTTCue && !window.TextTrackCue){
					window.TextTrackCue = window.VTTCue;
				} else if(!window.VTTCue){
					window.VTTCue = window.TextTrackCue;
				}

				try {
					new VTTCue(2, 3, '');
				} catch(e){
					bugs.track = true;
				}
			}
		})();
	}

webshims.register('mediaelement-core', function($, webshims, window, document, undefined, options){
	var hasSwf = swfmini.hasFlashPlayerVersion('11.3');
	var mediaelement = webshims.mediaelement;
	
	mediaelement.parseRtmp = function(data){
		var src = data.src.split('://');
		var paths = src[1].split('/');
		var i, len, found;
		data.server = src[0]+'://'+paths[0]+'/';
		data.streamId = [];
		for(i = 1, len = paths.length; i < len; i++){
			if(!found && paths[i].indexOf(':') !== -1){
				paths[i] = paths[i].split(':')[1];
				found = true;
			}
			if(!found){
				data.server += paths[i]+'/';
			} else {
				data.streamId.push(paths[i]);
			}
		}
		if(!data.streamId.length){
			webshims.error('Could not parse rtmp url');
		}
		data.streamId = data.streamId.join('/');
	};

	var getSrcObj = function(elem, nodeName){
		elem = $(elem);
		var src = {src: elem.attr('src') || '', elem: elem, srcProp: elem.prop('src')};
		var tmp;
		
		if(!src.src){return src;}
		
		tmp = elem.attr('data-server');
		if(tmp != null){
			src.server = tmp;
		}
		
		tmp = elem.attr('type') || elem.attr('data-type');
		if(tmp){
			src.type = tmp;
			src.container = $.trim(tmp.split(';')[0]);
		} else {
			if(!nodeName){
				nodeName = elem[0].nodeName.toLowerCase();
				if(nodeName == 'source'){
					nodeName = (elem.closest('video, audio')[0] || {nodeName: 'video'}).nodeName.toLowerCase();
				}
			}
			if(src.server){
				src.type = nodeName+'/rtmp';
				src.container = nodeName+'/rtmp';
			} else {
				
				tmp = mediaelement.getTypeForSrc( src.src, nodeName, src );
				
				if(tmp){
					src.type = tmp;
					src.container = tmp;
				}
			}
		}

		tmp = elem.attr('media');
		if(tmp){
			src.media = tmp;
		}
		if(src.type == 'audio/rtmp' || src.type == 'video/rtmp'){
			if(src.server){
				src.streamId = src.src;
			} else {
				mediaelement.parseRtmp(src);
			}
		}
		return src;
	};
	
	
	
	var hasYt = !hasSwf && ('postMessage' in window) && hasNative;
	
	var loadTrackUi = function(){
		if(loadTrackUi.loaded){return;}
		loadTrackUi.loaded = true;
		if(!options.noAutoTrack){
			webshims.ready('WINDOWLOAD', function(){
				loadThird();
				webshims.loader.loadList(['track-ui']);
			});
		}
	};

	var loadYt = (function(){
		var loaded;
		return function(){
			if(loaded || !hasYt){return;}
			loaded = true;
			webshims.loader.loadScript("https://www.youtube.com/player_api");
			$(function(){
				webshims._polyfill(["mediaelement-yt"]);
			});
		};
	})();
	var loadThird = function(){
		if(hasSwf){
			loadSwf();
		} else {
			loadYt();
		}
	};

	
	webshims.addPolyfill('mediaelement-yt', {
		test: !hasYt,
		d: ['dom-support']
	});
	

	
	mediaelement.mimeTypes = {
		audio: {
				//ogm shouldn´t be used!
				'audio/ogg': ['ogg','oga', 'ogm'],
				'audio/ogg;codecs="opus"': 'opus',
				'audio/mpeg': ['mp2','mp3','mpga','mpega'],
				'audio/mp4': ['mp4','mpg4', 'm4r', 'm4a', 'm4p', 'm4b', 'aac'],
				'audio/wav': ['wav'],
				'audio/3gpp': ['3gp','3gpp'],
				'audio/webm': ['webm'],
				'audio/fla': ['flv', 'f4a', 'fla'],
				'application/x-mpegURL': ['m3u8', 'm3u']
			},
			video: {
				//ogm shouldn´t be used!
				'video/ogg': ['ogg','ogv', 'ogm'],
				'video/mpeg': ['mpg','mpeg','mpe'],
				'video/mp4': ['mp4','mpg4', 'm4v'],
				'video/quicktime': ['mov','qt'],
				'video/x-msvideo': ['avi'],
				'video/x-ms-asf': ['asf', 'asx'],
				'video/flv': ['flv', 'f4v'],
				'video/3gpp': ['3gp','3gpp'],
				'video/webm': ['webm'],
				'application/x-mpegURL': ['m3u8', 'm3u'],
				'video/MP2T': ['ts']
			}
		}
	;
	
	mediaelement.mimeTypes.source =  $.extend({}, mediaelement.mimeTypes.audio, mediaelement.mimeTypes.video);
	
	mediaelement.getTypeForSrc = function(src, nodeName){
		if(src.indexOf('youtube.com/watch?') != -1 || src.indexOf('youtube.com/v/') != -1){
			return 'video/youtube';
		}

		if(!src.indexOf('mediastream:') || !src.indexOf('blob:http')){
			return 'usermedia';
		}

		if(!src.indexOf('webshimstream')){
			return 'jarisplayer/stream';
		}

		if(!src.indexOf('rtmp')){
			return nodeName+'/rtmp';
		}
		src = src.split('?')[0].split('#')[0].split('.');
		src = src[src.length - 1];
		var mt;
		
		$.each(mediaelement.mimeTypes[nodeName], function(mimeType, exts){
			if(exts.indexOf(src) !== -1){
				mt = mimeType;
				return false;
			}
		});
		return mt;
	};
	
	
	mediaelement.srces = function(mediaElem){
		var srces = [];
		mediaElem = $(mediaElem);
		var nodeName = mediaElem[0].nodeName.toLowerCase();
		var src = getSrcObj(mediaElem, nodeName);

		if(!src.src){
			$('source', mediaElem).each(function(){
				src = getSrcObj(this, nodeName);
				if(src.src){srces.push(src);}
			});
		} else {
			srces.push(src);
		}
		return srces;
	};
	
	mediaelement.swfMimeTypes = ['video/3gpp', 'video/x-msvideo', 'video/quicktime', 'video/x-m4v', 'video/mp4', 'video/m4p', 'video/x-flv', 'video/flv', 'audio/mpeg', 'audio/aac', 'audio/mp4', 'audio/x-m4a', 'audio/m4a', 'audio/mp3', 'audio/x-fla', 'audio/fla', 'youtube/flv', 'video/jarisplayer', 'jarisplayer/jarisplayer', 'jarisplayer/stream', 'video/youtube', 'video/rtmp', 'audio/rtmp'];
	
	mediaelement.canThirdPlaySrces = function(mediaElem, srces){
		var ret = '';
		if(hasSwf || hasYt){
			mediaElem = $(mediaElem);
			srces = srces || mediaelement.srces(mediaElem);
			$.each(srces, function(i, src){
				if(src.container && src.src && ((hasSwf && mediaelement.swfMimeTypes.indexOf(src.container) != -1) || (hasYt && src.container == 'video/youtube'))){
					ret = src;
					return false;
				}
			});
			
		}
		
		return ret;
	};
	
	var nativeCanPlayType = {};
	mediaelement.canNativePlaySrces = function(mediaElem, srces){
		var ret = '';
		if(hasNative){
			mediaElem = $(mediaElem);
			var nodeName = (mediaElem[0].nodeName || '').toLowerCase();
			var nativeCanPlay = (nativeCanPlayType[nodeName] || {prop: {_supvalue: false}}).prop._supvalue || mediaElem[0].canPlayType;
			if(!nativeCanPlay){return ret;}
			srces = srces || mediaelement.srces(mediaElem);
			
			$.each(srces, function(i, src){
				if(src.type == 'usermedia' || (src.type && nativeCanPlay.call(mediaElem[0], src.type)) ){
					ret = src;
					return false;
				}
			});
		}
		return ret;
	};
	var emptyType = (/^\s*application\/octet\-stream\s*$/i);
	var getRemoveEmptyType = function(){
		var ret = emptyType.test($.attr(this, 'type') || '');
		if(ret){
			$(this).removeAttr('type');
		}
		return ret;
	};
	mediaelement.setError = function(elem, message){
		if($('source', elem).filter(getRemoveEmptyType).length){
			webshims.error('"application/octet-stream" is a useless mimetype for audio/video. Please change this attribute.');
			try {
				$(elem).mediaLoad();
			} catch(er){}
		} else {
			if(!message){
				message = "can't play sources";
			}
			$(elem).pause().data('mediaerror', message);
			webshims.error('mediaelementError: '+ message +'. Run the following line in your console to get more info: webshim.mediaelement.loadDebugger();');
			setTimeout(function(){
				if($(elem).data('mediaerror')){
					$(elem).addClass('media-error').trigger('mediaerror');
				}
			}, 1);
		}
		
		
	};
	
	var handleThird = (function(){
		var requested;
		var readyType = hasSwf ? swfType : 'mediaelement-yt';
		return function( mediaElem, ret, data ){
			//readd to ready

			webshims.ready(readyType, function(){
				if(mediaelement.createSWF && $(mediaElem).parent()[0]){
					mediaelement.createSWF( mediaElem, ret, data );
				} else if(!requested) {
					requested = true;
					loadThird();
					
					handleThird( mediaElem, ret, data );
				}
			});
			if(!requested && hasYt && !mediaelement.createSWF){
				loadYt();
			}
		};
	})();

	var activate = {
		native: function(elem, src, data){
			if(data && data.isActive == 'third') {
				mediaelement.setActive(elem, 'html5', data);
			}
		},
		third: handleThird
	};

	var stepSources = function(elem, data, srces){
		var i, src;
		var testOrder = [{test: 'canNativePlaySrces', activate: 'native'}, {test: 'canThirdPlaySrces', activate: 'third'}];
		if(options.preferFlash || (data && data.isActive == 'third') ){
			testOrder.reverse();
		}
		for(i = 0; i < 2; i++){
			src = mediaelement[testOrder[i].test](elem, srces);
			if(src){
				activate[testOrder[i].activate](elem, src, data);
				break;
			}
		}

		if(!src){
			mediaelement.setError(elem, false);
			if(data && data.isActive == 'third') {
				mediaelement.setActive(elem, 'html5', data);
			}
		}
	};
	var stopParent = /^(?:embed|object|datalist|picture)$/i;
	var selectSource = function(elem, data){
		var baseData = webshims.data(elem, 'mediaelementBase') || webshims.data(elem, 'mediaelementBase', {});
		var _srces = mediaelement.srces(elem);
		var parent = elem.parentNode;
		
		clearTimeout(baseData.loadTimer);
		$(elem).removeClass('media-error');
		$.data(elem, 'mediaerror', false);
		
		if(!_srces.length || !parent || parent.nodeType != 1 || stopParent.test(parent.nodeName || '')){return;}
		data = data || webshims.data(elem, 'mediaelement');
		if(mediaelement.sortMedia){
			_srces.sort(mediaelement.sortMedia);
		}
		stepSources(elem, data, _srces);

	};
	mediaelement.selectSource = selectSource;
	
	
	$(document).on('ended', function(e){
		var data = webshims.data(e.target, 'mediaelement');
		if( supportsLoop && (!data || data.isActive == 'html5') && !$.prop(e.target, 'loop')){return;}
		setTimeout(function(){
			if( $.prop(e.target, 'paused') || !$.prop(e.target, 'loop') ){return;}
			$(e.target).prop('currentTime', 0).play();
		});
		
	});
	
	var handleMedia = false;

	var initMediaElements = function(){
		var testFixMedia = function(){

			if(webshims.implement(this, 'mediaelement')){
				selectSource(this);
				if(!support.mediaDefaultMuted && $.attr(this, 'muted') != null){
					$.prop(this, 'muted', true);
				}

			}
		};
		
		webshims.ready('dom-support', function(){
			handleMedia = true;
			
			if(!supportsLoop){
				webshims.defineNodeNamesBooleanProperty(['audio', 'video'], 'loop');
			}
			
			['audio', 'video'].forEach(function(nodeName){
				var supLoad;
				supLoad = webshims.defineNodeNameProperty(nodeName, 'load',  {
					prop: {
						value: function(){
							var data = webshims.data(this, 'mediaelement');

							selectSource(this, data);
							if(hasNative && (!data || data.isActive == 'html5') && supLoad.prop._supvalue){
								supLoad.prop._supvalue.apply(this, arguments);
							}
							if(!loadTrackUi.loaded && this.querySelector('track')){
								loadTrackUi();
							}
							$(this).triggerHandler('wsmediareload');
						}
					}
				});

				nativeCanPlayType[nodeName] = webshims.defineNodeNameProperty(nodeName, 'canPlayType',  {
					prop: {
						value: function(type){
							var ret = '';
							if(hasNative && nativeCanPlayType[nodeName].prop._supvalue){
								ret = nativeCanPlayType[nodeName].prop._supvalue.call(this, type);
								if(ret == 'no'){
									ret = '';
								}
							}
							if(!ret && hasSwf){
								type = $.trim((type || '').split(';')[0]);
								if(mediaelement.swfMimeTypes.indexOf(type) != -1){
									ret = 'maybe';
								}
							}
							if(!ret && hasYt && type == 'video/youtube'){
								ret = 'maybe';
							}
							return ret;
						}
					}
				});
			});

			
			webshims.onNodeNamesPropertyModify(['audio', 'video'], ['src', 'poster'], {
				set: function(){
					var elem = this;
					var baseData = webshims.data(elem, 'mediaelementBase') || webshims.data(elem, 'mediaelementBase', {});
					clearTimeout(baseData.loadTimer);
					baseData.loadTimer = setTimeout(function(){
						selectSource(elem);
						elem = null;
					}, 9);
				}
			});
			
			
			webshims.addReady(function(context, insertedElement){
				var media = $('video, audio', context)
					.add(insertedElement.filter('video, audio'))
					.each(testFixMedia)
				;
				if(!loadTrackUi.loaded && $('track', media).length){
					loadTrackUi();
				}
				media = null;
			});
		});
		
		if(hasNative && !handleMedia){
			webshims.addReady(function(context, insertedElement){
				if(!handleMedia){
					$('video, audio', context)
						.add(insertedElement.filter('video, audio'))
						.each(function(){
							if(!mediaelement.canNativePlaySrces(this)){
								loadThird();
								handleMedia = true;
								return false;
							}
						})
					;
				}
			});
		}
	};

	mediaelement.loadDebugger = function(){
		webshims.ready('dom-support', function(){
			webshims.loader.loadScript('mediaelement-debug');
		});
	};

	if(({noCombo: 1, media: 1})[webshims.cfg.debug]){
		$(document).on('mediaerror', function(e){
			mediaelement.loadDebugger();
		});
	}
	//set native implementation ready, before swf api is retested
	if(hasNative){
		webshims.isReady('mediaelement-core', true);
		initMediaElements();
		webshims.ready('WINDOWLOAD mediaelement', loadThird);
	} else {
		webshims.ready(swfType, initMediaElements);
	}
	webshims.ready('track', loadTrackUi);

	if(document.readyState == 'complete'){
		webshims.isReady('WINDOWLOAD', true);
	}
});

})(webshims);
