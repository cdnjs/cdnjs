/*!
 *
 * MediaElement.js
 * HTML5 <video> and <audio> shim and player
 * http://mediaelementjs.com/
 *
 * Creates a JavaScript object that mimics HTML5 MediaElement API
 * for browsers that don't understand HTML5 or can't play the provided codec
 * Can play MP4 (H.264), Ogg, WebM, FLV, WMV, WMA, ACC, and MP3
 *
 * Copyright 2010-2014, John Dyer (http://j.hn)
 * License: MIT
 *
 */
// Namespace
var mejs = mejs || {};

// version number
mejs.version = '2.23.4';


// player number (for missing, same id attr)
mejs.meIndex = 0;

// media types accepted by plugins
mejs.plugins = {
	silverlight: [
		{version: [3,0], types: ['video/mp4','video/m4v','video/mov','video/wmv','audio/wma','audio/m4a','audio/mp3','audio/wav','audio/mpeg']}
	],
	flash: [
		{version: [9,0,124], types: ['video/mp4','video/m4v','video/mov','video/flv','video/rtmp','video/x-flv','audio/flv','audio/x-flv','audio/mp3','audio/m4a', 'audio/mp4', 'audio/mpeg', 'video/dailymotion', 'video/x-dailymotion', 'application/x-mpegURL', 'audio/ogg']}
		// 'video/youtube', 'video/x-youtube', 
		// ,{version: [12,0], types: ['video/webm']} // for future reference (hopefully!)
	],
	youtube: [
		{version: null, types: ['video/youtube', 'video/x-youtube', 'audio/youtube', 'audio/x-youtube']}
	],
	vimeo: [
		{version: null, types: ['video/vimeo', 'video/x-vimeo']}
	]
};

/*
Utility methods
*/
mejs.Utility = {
	encodeUrl: function(url) {
		return encodeURIComponent(url); //.replace(/\?/gi,'%3F').replace(/=/gi,'%3D').replace(/&/gi,'%26');
	},
	escapeHTML: function(s) {
		return s.toString().split('&').join('&amp;').split('<').join('&lt;').split('"').join('&quot;');
	},
	absolutizeUrl: function(url) {
		var el = document.createElement('div');
		el.innerHTML = '<a href="' + this.escapeHTML(url) + '">x</a>';
		return el.firstChild.href;
	},
	getScriptPath: function(scriptNames) {
		var
			i = 0,
			j,
			codePath = '',
			testname = '',
			slashPos,
			filenamePos,
			scriptUrl,
			scriptPath,			
			scriptFilename,
			scripts = document.getElementsByTagName('script'),
			il = scripts.length,
			jl = scriptNames.length;
			
		// go through all <script> tags
		for (; i < il; i++) {
			scriptUrl = scripts[i].src;
			slashPos = scriptUrl.lastIndexOf('/');
			if (slashPos > -1) {
				scriptFilename = scriptUrl.substring(slashPos + 1);
				scriptPath = scriptUrl.substring(0, slashPos + 1);
			} else {
				scriptFilename = scriptUrl;
				scriptPath = '';			
			}
			
			// see if any <script> tags have a file name that matches the 
			for (j = 0; j < jl; j++) {
				testname = scriptNames[j];
				filenamePos = scriptFilename.indexOf(testname);
				if (filenamePos > -1) {
					codePath = scriptPath;
					break;
				}
			}
			
			// if we found a path, then break and return it
			if (codePath !== '') {
				break;
			}
		}
		
		// send the best path back
		return codePath;
	},
	/*
	 * Calculate the time format to use. We have a default format set in the
	 * options but it can be imcomplete. We ajust it according to the media
	 * duration.
	 *
	 * We support format like 'hh:mm:ss:ff'.
	 */
	calculateTimeFormat: function(time, options, fps) {
		if (time < 0) {
			time = 0;
		}

		if(typeof fps == 'undefined') {
		    fps = 25;
		}

		var format = options.timeFormat,
			firstChar = format[0],
			firstTwoPlaces = (format[1] == format[0]),
			separatorIndex = firstTwoPlaces? 2: 1,
			separator = ':',
			hours = Math.floor(time / 3600) % 24,
			minutes = Math.floor(time / 60) % 60,
			seconds = Math.floor(time % 60),
			frames = Math.floor(((time % 1)*fps).toFixed(3)),
			lis = [
				[frames, 'f'],
				[seconds, 's'],
				[minutes, 'm'],
				[hours, 'h']
			];

		// Try to get the separator from the format
		if (format.length < separatorIndex) {
			separator = format[separatorIndex];
		}

		var required = false;

		for (var i=0, len=lis.length; i < len; i++) {
			if (format.indexOf(lis[i][1]) !== -1) {
				required=true;
			}
			else if (required) {
				var hasNextValue = false;
				for (var j=i; j < len; j++) {
					if (lis[j][0] > 0) {
						hasNextValue = true;
						break;
					}
				}

				if (! hasNextValue) {
					break;
				}

				if (!firstTwoPlaces) {
					format = firstChar + format;
				}
				format = lis[i][1] + separator + format;
				if (firstTwoPlaces) {
					format = lis[i][1] + format;
				}
				firstChar = lis[i][1];
			}
		}
		options.currentTimeFormat = format;
	},
	/*
	 * Prefix the given number by zero if it is lower than 10.
	 */
	twoDigitsString: function(n) {
		if (n < 10) {
			return '0' + n;
		}
		return String(n);
	},
	secondsToTimeCode: function(time, options) {
		if (time < 0) {
			time = 0;
		}

		// Maintain backward compatibility with method signature before v2.18.
		if (typeof options !== 'object') {
			var format = 'm:ss';
			format = arguments[1] ? 'hh:mm:ss' : format; // forceHours
			format = arguments[2] ? format + ':ff' : format; // showFrameCount

			options = {
				currentTimeFormat: format,
				framesPerSecond: arguments[3] || 25
			};
		}

		var fps = options.framesPerSecond;
		if(typeof fps === 'undefined') {
			fps = 25;
		}

		var format = options.currentTimeFormat,
			hours = Math.floor(time / 3600) % 24,
			minutes = Math.floor(time / 60) % 60,
			seconds = Math.floor(time % 60),
			frames = Math.floor(((time % 1)*fps).toFixed(3));
			lis = [
				[frames, 'f'],
				[seconds, 's'],
				[minutes, 'm'],
				[hours, 'h']
			];

		var res = format;
		for (i=0,len=lis.length; i < len; i++) {
			res = res.replace(lis[i][1]+lis[i][1], this.twoDigitsString(lis[i][0]));
			res = res.replace(lis[i][1], lis[i][0]);
		}
		return res;
	},
	
	timeCodeToSeconds: function(hh_mm_ss_ff, forceHours, showFrameCount, fps){
		if (typeof showFrameCount == 'undefined') {
		    showFrameCount=false;
		} else if(typeof fps == 'undefined') {
		    fps = 25;
		}
	
		var tc_array = hh_mm_ss_ff.split(":"),
			tc_hh = parseInt(tc_array[0], 10),
			tc_mm = parseInt(tc_array[1], 10),
			tc_ss = parseInt(tc_array[2], 10),
			tc_ff = 0,
			tc_in_seconds = 0;
		
		if (showFrameCount) {
		    tc_ff = parseInt(tc_array[3])/fps;
		}
		
		tc_in_seconds = ( tc_hh * 3600 ) + ( tc_mm * 60 ) + tc_ss + tc_ff;
		
		return tc_in_seconds;
	},
	

	convertSMPTEtoSeconds: function (SMPTE) {
		if (typeof SMPTE != 'string') 
			return false;

		SMPTE = SMPTE.replace(',', '.');
		
		var secs = 0,
			decimalLen = (SMPTE.indexOf('.') != -1) ? SMPTE.split('.')[1].length : 0,
			multiplier = 1;
		
		SMPTE = SMPTE.split(':').reverse();
		
		for (var i = 0; i < SMPTE.length; i++) {
			multiplier = 1;
			if (i > 0) {
				multiplier = Math.pow(60, i); 
			}
			secs += Number(SMPTE[i]) * multiplier;
		}
		return Number(secs.toFixed(decimalLen));
	},	
	
	/* borrowed from SWFObject: http://code.google.com/p/swfobject/source/browse/trunk/swfobject/src/swfobject.js#474 */
	removeSwf: function(id) {
		var obj = document.getElementById(id);
		if (obj && /object|embed/i.test(obj.nodeName)) {
			if (mejs.MediaFeatures.isIE) {
				obj.style.display = "none";
				(function(){
					if (obj.readyState == 4) {
						mejs.Utility.removeObjectInIE(id);
					} else {
						setTimeout(arguments.callee, 10);
					}
				})();
			} else {
				obj.parentNode.removeChild(obj);
			}
		}
	},
	removeObjectInIE: function(id) {
		var obj = document.getElementById(id);
		if (obj) {
			for (var i in obj) {
				if (typeof obj[i] == "function") {
					obj[i] = null;
				}
			}
			obj.parentNode.removeChild(obj);
		}		
	},
    determineScheme: function(url) {
        if (url && url.indexOf("://") != -1) {
            return url.substr(0, url.indexOf("://")+3);
        }
        return "//"; // let user agent figure this out
    },

	// taken from underscore
	debounce: function(func, wait, immediate) {
		var timeout;
		return function() {
			var context = this, args = arguments;
			var later = function() {
				timeout = null;
				if (!immediate) func.apply(context, args);
			};
			var callNow = immediate && !timeout;
			clearTimeout(timeout);
			timeout = setTimeout(later, wait);
			if (callNow) func.apply(context, args);
		};
	},

	/**
	* Returns true if targetNode appears after sourceNode in the dom.
	* @param {HTMLElement} sourceNode - the source node for comparison
	* @param {HTMLElement} targetNode - the node to compare against sourceNode
	*/
	isNodeAfter: function(sourceNode, targetNode) {
		return !!(
			sourceNode &&
			targetNode &&
			typeof sourceNode.compareDocumentPosition === 'function' &&
			sourceNode.compareDocumentPosition(targetNode) & Node.DOCUMENT_POSITION_PRECEDING
		);
	}
};


// Core detector, plugins are added below
mejs.PluginDetector = {

	// main public function to test a plug version number PluginDetector.hasPluginVersion('flash',[9,0,125]);
	hasPluginVersion: function(plugin, v) {
		var pv = this.plugins[plugin];
		v[1] = v[1] || 0;
		v[2] = v[2] || 0;
		return (pv[0] > v[0] || (pv[0] == v[0] && pv[1] > v[1]) || (pv[0] == v[0] && pv[1] == v[1] && pv[2] >= v[2])) ? true : false;
	},

	// cached values
	nav: window.navigator,
	ua: window.navigator.userAgent.toLowerCase(),

	// stored version numbers
	plugins: [],

	// runs detectPlugin() and stores the version number
	addPlugin: function(p, pluginName, mimeType, activeX, axDetect) {
		this.plugins[p] = this.detectPlugin(pluginName, mimeType, activeX, axDetect);
	},

	// get the version number from the mimetype (all but IE) or ActiveX (IE)
	detectPlugin: function(pluginName, mimeType, activeX, axDetect) {

		var version = [0,0,0],
			description,
			i,
			ax;

		// Firefox, Webkit, Opera
		if (typeof(this.nav.plugins) != 'undefined' && typeof this.nav.plugins[pluginName] == 'object') {
			description = this.nav.plugins[pluginName].description;
			if (description && !(typeof this.nav.mimeTypes != 'undefined' && this.nav.mimeTypes[mimeType] && !this.nav.mimeTypes[mimeType].enabledPlugin)) {
				version = description.replace(pluginName, '').replace(/^\s+/,'').replace(/\sr/gi,'.').split('.');
				for (i=0; i<version.length; i++) {
					version[i] = parseInt(version[i].match(/\d+/), 10);
				}
			}
		// Internet Explorer / ActiveX
		} else if (typeof(window.ActiveXObject) != 'undefined') {
			try {
				ax = new ActiveXObject(activeX);
				if (ax) {
					version = axDetect(ax);
				}
			}
			catch (e) { }
		}
		return version;
	}
};

// Add Flash detection
mejs.PluginDetector.addPlugin('flash','Shockwave Flash','application/x-shockwave-flash','ShockwaveFlash.ShockwaveFlash', function(ax) {
	// adapted from SWFObject
	var version = [],
		d = ax.GetVariable("$version");
	if (d) {
		d = d.split(" ")[1].split(",");
		version = [parseInt(d[0], 10), parseInt(d[1], 10), parseInt(d[2], 10)];
	}
	return version;
});

// Add Silverlight detection
mejs.PluginDetector.addPlugin('silverlight','Silverlight Plug-In','application/x-silverlight-2','AgControl.AgControl', function (ax) {
	// Silverlight cannot report its version number to IE
	// but it does have a isVersionSupported function, so we have to loop through it to get a version number.
	// adapted from http://www.silverlightversion.com/
	var v = [0,0,0,0],
		loopMatch = function(ax, v, i, n) {
			while(ax.isVersionSupported(v[0]+ "."+ v[1] + "." + v[2] + "." + v[3])){
				v[i]+=n;
			}
			v[i] -= n;
		};
	loopMatch(ax, v, 0, 1);
	loopMatch(ax, v, 1, 1);
	loopMatch(ax, v, 2, 10000); // the third place in the version number is usually 5 digits (4.0.xxxxx)
	loopMatch(ax, v, 2, 1000);
	loopMatch(ax, v, 2, 100);
	loopMatch(ax, v, 2, 10);
	loopMatch(ax, v, 2, 1);
	loopMatch(ax, v, 3, 1);

	return v;
});
// add adobe acrobat
/*
PluginDetector.addPlugin('acrobat','Adobe Acrobat','application/pdf','AcroPDF.PDF', function (ax) {
	var version = [],
		d = ax.GetVersions().split(',')[0].split('=')[1].split('.');

	if (d) {
		version = [parseInt(d[0], 10), parseInt(d[1], 10), parseInt(d[2], 10)];
	}
	return version;
});
*/
// necessary detection (fixes for <IE9)
mejs.MediaFeatures = {
	init: function() {
		var
			t = this,
			d = document,
			nav = mejs.PluginDetector.nav,
			ua = mejs.PluginDetector.ua.toLowerCase(),
			i,
			v,
			html5Elements = ['source','track','audio','video'];

		// detect browsers (only the ones that have some kind of quirk we need to work around)
		t.isiPad = (ua.match(/ipad/i) !== null);
		t.isiPhone = (ua.match(/iphone/i) !== null);
		t.isiOS = t.isiPhone || t.isiPad;
		t.isAndroid = (ua.match(/android/i) !== null);
		t.isBustedAndroid = (ua.match(/android 2\.[12]/) !== null);
		t.isBustedNativeHTTPS = (location.protocol === 'https:' && (ua.match(/android [12]\./) !== null || ua.match(/macintosh.* version.* safari/) !== null));
		t.isIE = (nav.appName.toLowerCase().indexOf("microsoft") != -1 || nav.appName.toLowerCase().match(/trident/gi) !== null);
		t.isChrome = (ua.match(/chrome/gi) !== null);
		t.isChromium = (ua.match(/chromium/gi) !== null);
		t.isFirefox = (ua.match(/firefox/gi) !== null);
		t.isWebkit = (ua.match(/webkit/gi) !== null);
		t.isGecko = (ua.match(/gecko/gi) !== null) && !t.isWebkit && !t.isIE;
		t.isOpera = (ua.match(/opera/gi) !== null);
		t.hasTouch = ('ontouchstart' in window); //  && window.ontouchstart != null); // this breaks iOS 7

		// Borrowed from `Modernizr.svgasimg`, sources:
		// - https://github.com/Modernizr/Modernizr/issues/687
		// - https://github.com/Modernizr/Modernizr/pull/1209/files
		t.svgAsImg = !!document.implementation.hasFeature('http://www.w3.org/TR/SVG11/feature#Image', '1.1');

		// create HTML5 media elements for IE before 9, get a <video> element for fullscreen detection
		for (i=0; i<html5Elements.length; i++) {
			v = document.createElement(html5Elements[i]);
		}

		t.supportsMediaTag = (typeof v.canPlayType !== 'undefined' || t.isBustedAndroid);

		// Fix for IE9 on Windows 7N / Windows 7KN (Media Player not installer)
		try{
			v.canPlayType("video/mp4");
		}catch(e){
			t.supportsMediaTag = false;
		}

		t.supportsPointerEvents = (function() {
			// TAKEN FROM MODERNIZR
			var element = document.createElement('x'),
				documentElement = document.documentElement,
				getComputedStyle = window.getComputedStyle,
				supports;
			if(!('pointerEvents' in element.style)){
				return false;
			}
			element.style.pointerEvents = 'auto';
			element.style.pointerEvents = 'x';
			documentElement.appendChild(element);
			supports = getComputedStyle &&
				getComputedStyle(element, '').pointerEvents === 'auto';
			documentElement.removeChild(element);
			return !!supports;
		})();


		 // Older versions of Firefox can't move plugins around without it resetting,
		t.hasFirefoxPluginMovingProblem = false;

		// detect native JavaScript fullscreen (Safari/Firefox only, Chrome still fails)

		// iOS
		t.hasiOSFullScreen = (typeof v.webkitEnterFullscreen !== 'undefined');

		// W3C
		t.hasNativeFullscreen = (typeof v.requestFullscreen !== 'undefined');

		// webkit/firefox/IE11+
		t.hasWebkitNativeFullScreen = (typeof v.webkitRequestFullScreen !== 'undefined');
		t.hasMozNativeFullScreen = (typeof v.mozRequestFullScreen !== 'undefined');
		t.hasMsNativeFullScreen = (typeof v.msRequestFullscreen !== 'undefined');

		t.hasTrueNativeFullScreen = (t.hasWebkitNativeFullScreen || t.hasMozNativeFullScreen || t.hasMsNativeFullScreen);
		t.nativeFullScreenEnabled = t.hasTrueNativeFullScreen;

		// Enabled?
		if (t.hasMozNativeFullScreen) {
			t.nativeFullScreenEnabled = document.mozFullScreenEnabled;
		} else if (t.hasMsNativeFullScreen) {
			t.nativeFullScreenEnabled = document.msFullscreenEnabled;
		}

		if (t.isChrome) {
			t.hasiOSFullScreen = false;
		}

		if (t.hasTrueNativeFullScreen) {

			t.fullScreenEventName = '';
			if (t.hasWebkitNativeFullScreen) {
				t.fullScreenEventName = 'webkitfullscreenchange';

			} else if (t.hasMozNativeFullScreen) {
				t.fullScreenEventName = 'mozfullscreenchange';

			} else if (t.hasMsNativeFullScreen) {
				t.fullScreenEventName = 'MSFullscreenChange';
			}

			t.isFullScreen = function() {
				if (t.hasMozNativeFullScreen) {
					return d.mozFullScreen;

				} else if (t.hasWebkitNativeFullScreen) {
					return d.webkitIsFullScreen;

				} else if (t.hasMsNativeFullScreen) {
					return d.msFullscreenElement !== null;
				}
			}

			t.requestFullScreen = function(el) {

				if (t.hasWebkitNativeFullScreen) {
					el.webkitRequestFullScreen();

				} else if (t.hasMozNativeFullScreen) {
					el.mozRequestFullScreen();

				} else if (t.hasMsNativeFullScreen) {
					el.msRequestFullscreen();

				}
			}

			t.cancelFullScreen = function() {
				if (t.hasWebkitNativeFullScreen) {
					document.webkitCancelFullScreen();

				} else if (t.hasMozNativeFullScreen) {
					document.mozCancelFullScreen();

				} else if (t.hasMsNativeFullScreen) {
					document.msExitFullscreen();

				}
			}

		}


		// OS X 10.5 can't do this even if it says it can :(
		if (t.hasiOSFullScreen && ua.match(/mac os x 10_5/i)) {
			t.hasNativeFullScreen = false;
			t.hasiOSFullScreen = false;
		}

	}
};
mejs.MediaFeatures.init();

/*
extension methods to <video> or <audio> object to bring it into parity with PluginMediaElement (see below)
*/
mejs.HtmlMediaElement = {
	pluginType: 'native',
	isFullScreen: false,

	setCurrentTime: function (time) {
		this.currentTime = time;
	},

	setMuted: function (muted) {
		this.muted = muted;
	},

	setVolume: function (volume) {
		this.volume = volume;
	},

	// for parity with the plugin versions
	stop: function () {
		this.pause();
	},

	// This can be a url string
	// or an array [{src:'file.mp4',type:'video/mp4'},{src:'file.webm',type:'video/webm'}]
	setSrc: function (url) {
		
		// Fix for IE9 which can't set .src when there are <source> elements. Awesome, right?
		var 
			existingSources = this.getElementsByTagName('source');
		while (existingSources.length > 0){
			this.removeChild(existingSources[0]);
		}
	
		if (typeof url == 'string') {
			this.src = url;
		} else {
			var i, media;

			for (i=0; i<url.length; i++) {
				media = url[i];
				if (this.canPlayType(media.type)) {
					this.src = media.src;
					break;
				}
			}
		}
	},

	setVideoSize: function (width, height) {
		this.width = width;
		this.height = height;
	}
};

/*
Mimics the <video/audio> element by calling Flash's External Interface or Silverlights [ScriptableMember]
*/
mejs.PluginMediaElement = function (pluginid, pluginType, mediaUrl) {
	this.id = pluginid;
	this.pluginType = pluginType;
	this.src = mediaUrl;
	this.events = {};
	this.attributes = {};
};

// JavaScript values and ExternalInterface methods that match HTML5 video properties methods
// http://www.adobe.com/livedocs/flash/9.0/ActionScriptLangRefV3/fl/video/FLVPlayback.html
// http://www.whatwg.org/specs/web-apps/current-work/multipage/video.html
mejs.PluginMediaElement.prototype = {

	// special
	pluginElement: null,
	pluginType: '',
	isFullScreen: false,

	// not implemented :(
	playbackRate: -1,
	defaultPlaybackRate: -1,
	seekable: [],
	played: [],

	// HTML5 read-only properties
	paused: true,
	ended: false,
	seeking: false,
	duration: 0,
	error: null,
	tagName: '',

	// HTML5 get/set properties, but only set (updated by event handlers)
	muted: false,
	volume: 1,
	currentTime: 0,

	// HTML5 methods
	play: function () {
		if (this.pluginApi != null) {
			if (this.pluginType == 'youtube' || this.pluginType == 'vimeo') {
				this.pluginApi.playVideo();
			} else {
				this.pluginApi.playMedia();
			}
			this.paused = false;
		}
	},
	load: function () {
		if (this.pluginApi != null) {
			if (this.pluginType == 'youtube' || this.pluginType == 'vimeo') {
			} else {
				this.pluginApi.loadMedia();
			}
			
			this.paused = false;
		}
	},
	pause: function () {
		if (this.pluginApi != null) {
			if (this.pluginType == 'youtube' || this.pluginType == 'vimeo') {
		        if( this.pluginApi.getPlayerState() == 1 ) {
				    this.pluginApi.pauseVideo();
                }
			} else {
				this.pluginApi.pauseMedia();
			}			
			
			
			this.paused = true;
		}
	},
	stop: function () {
		if (this.pluginApi != null) {
			if (this.pluginType == 'youtube' || this.pluginType == 'vimeo') {
				this.pluginApi.stopVideo();
			} else {
				this.pluginApi.stopMedia();
			}	
			this.paused = true;
		}
	},
	canPlayType: function(type) {
		var i,
			j,
			pluginInfo,
			pluginVersions = mejs.plugins[this.pluginType];

		for (i=0; i<pluginVersions.length; i++) {
			pluginInfo = pluginVersions[i];

			// test if user has the correct plugin version
			if (mejs.PluginDetector.hasPluginVersion(this.pluginType, pluginInfo.version)) {

				// test for plugin playback types
				for (j=0; j<pluginInfo.types.length; j++) {
					// find plugin that can play the type
					if (type == pluginInfo.types[j]) {
						return 'probably';
					}
				}
			}
		}

		return '';
	},
	
	positionFullscreenButton: function(x,y,visibleAndAbove) {
		if (this.pluginApi != null && this.pluginApi.positionFullscreenButton) {
			this.pluginApi.positionFullscreenButton(Math.floor(x),Math.floor(y),visibleAndAbove);
		}
	},
	
	hideFullscreenButton: function() {
		if (this.pluginApi != null && this.pluginApi.hideFullscreenButton) {
			this.pluginApi.hideFullscreenButton();
		}		
	},	
	

	// custom methods since not all JavaScript implementations support get/set

	// This can be a url string
	// or an array [{src:'file.mp4',type:'video/mp4'},{src:'file.webm',type:'video/webm'}]
	setSrc: function (url) {
		if (typeof url == 'string') {
			this.pluginApi.setSrc(mejs.Utility.absolutizeUrl(url));
			this.src = mejs.Utility.absolutizeUrl(url);
		} else {
			var i, media;

			for (i=0; i<url.length; i++) {
				media = url[i];
				if (this.canPlayType(media.type)) {
					this.pluginApi.setSrc(mejs.Utility.absolutizeUrl(media.src));
					this.src = mejs.Utility.absolutizeUrl(media.src);
					break;
				}
			}
		}

	},
	setCurrentTime: function (time) {
		if (this.pluginApi != null) {
			if (this.pluginType == 'youtube' || this.pluginType == 'vimeo') {
				this.pluginApi.seekTo(time);
			} else {
				this.pluginApi.setCurrentTime(time);
			}				
			
			
			
			this.currentTime = time;
		}
	},
	setVolume: function (volume) {
		if (this.pluginApi != null) {
			// same on YouTube and MEjs
			if (this.pluginType == 'youtube') {
				this.pluginApi.setVolume(volume * 100);
			} else {
				this.pluginApi.setVolume(volume);
			}
			this.volume = volume;
		}
	},
	setMuted: function (muted) {
		if (this.pluginApi != null) {
			if (this.pluginType == 'youtube') {
				if (muted) {
					this.pluginApi.mute();
				} else {
					this.pluginApi.unMute();
				}
				this.muted = muted;
				this.dispatchEvent({type:'volumechange'});
			} else {
				this.pluginApi.setMuted(muted);
			}
			this.muted = muted;
		}
	},

	// additional non-HTML5 methods
	setVideoSize: function (width, height) {
		
		//if (this.pluginType == 'flash' || this.pluginType == 'silverlight') {
			if (this.pluginElement && this.pluginElement.style) {
				this.pluginElement.style.width = width + 'px';
				this.pluginElement.style.height = height + 'px';
			}
			if (this.pluginApi != null && this.pluginApi.setVideoSize) {
				this.pluginApi.setVideoSize(width, height);
			}
		//}
	},

	setFullscreen: function (fullscreen) {
		if (this.pluginApi != null && this.pluginApi.setFullscreen) {
			this.pluginApi.setFullscreen(fullscreen);
		}
	},
	
	enterFullScreen: function() {
		if (this.pluginApi != null && this.pluginApi.setFullscreen) {
			this.setFullscreen(true);
		}		
		
	},
	
	exitFullScreen: function() {
		if (this.pluginApi != null && this.pluginApi.setFullscreen) {
			this.setFullscreen(false);
		}
	},	

	// start: fake events
	addEventListener: function (eventName, callback, bubble) {
		this.events[eventName] = this.events[eventName] || [];
		this.events[eventName].push(callback);
	},
	removeEventListener: function (eventName, callback) {
		if (!eventName) { this.events = {}; return true; }
		var callbacks = this.events[eventName];
		if (!callbacks) return true;
		if (!callback) { this.events[eventName] = []; return true; }
		for (var i = 0; i < callbacks.length; i++) {
			if (callbacks[i] === callback) {
				this.events[eventName].splice(i, 1);
				return true;
			}
		}
		return false;
	},	
	dispatchEvent: function (event) {
		var i,
			args,
			callbacks = this.events[event.type];

		if (callbacks) {
			for (i = 0; i < callbacks.length; i++) {
				callbacks[i].apply(this, [event]);
			}
		}
	},
	// end: fake events
	
	// fake DOM attribute methods
	hasAttribute: function(name){
		return (name in this.attributes);  
	},
	removeAttribute: function(name){
		delete this.attributes[name];
	},
	getAttribute: function(name){
		if (this.hasAttribute(name)) {
			return this.attributes[name];
		}
		return null;
	},
	setAttribute: function(name, value){
		this.attributes[name] = value;
	},

	remove: function() {
		mejs.Utility.removeSwf(this.pluginElement.id);
	}
};

/*
Default options
*/
mejs.MediaElementDefaults = {
	// allows testing on HTML5, flash, silverlight
	// auto: attempts to detect what the browser can do
	// auto_plugin: prefer plugins and then attempt native HTML5
	// native: forces HTML5 playback
	// shim: disallows HTML5, will attempt either Flash or Silverlight
	// none: forces fallback view
	mode: 'auto',
	// remove or reorder to change plugin priority and availability
	plugins: ['flash','silverlight','youtube','vimeo'],
	// shows debug errors on screen
	enablePluginDebug: false,
	// use plugin for browsers that have trouble with Basic Authentication on HTTPS sites
	httpsBasicAuthSite: false,
	// overrides the type specified, useful for dynamic instantiation
	type: '',
	// path to Flash and Silverlight plugins
	pluginPath: mejs.Utility.getScriptPath(['mediaelement.js','mediaelement.min.js','mediaelement-and-player.js','mediaelement-and-player.min.js']),
	// name of flash file
	flashName: 'flashmediaelement.swf',
	// streamer for RTMP streaming
	flashStreamer: '',
	// set to 'always' for CDN version
	flashScriptAccess: 'sameDomain',	
	// turns on the smoothing filter in Flash
	enablePluginSmoothing: false,
	// enabled pseudo-streaming (seek) on .mp4 files
	enablePseudoStreaming: false,
	// start query parameter sent to server for pseudo-streaming
	pseudoStreamingStartQueryParam: 'start',
	// name of silverlight file
	silverlightName: 'silverlightmediaelement.xap',
	// default if the <video width> is not specified
	defaultVideoWidth: 480,
	// default if the <video height> is not specified
	defaultVideoHeight: 270,
	// overrides <video width>
	pluginWidth: -1,
	// overrides <video height>
	pluginHeight: -1,
	// additional plugin variables in 'key=value' form
	pluginVars: [],	
	// rate in milliseconds for Flash and Silverlight to fire the timeupdate event
	// larger number is less accurate, but less strain on plugin->JavaScript bridge
	timerRate: 250,
	// initial volume for player
	startVolume: 0.8,
	// custom error message in case media cannot be played; otherwise, Download File
	// link will be displayed
	customError: "",
	success: function () { },
	error: function () { }
};

/*
Determines if a browser supports the <video> or <audio> element
and returns either the native element or a Flash/Silverlight version that
mimics HTML5 MediaElement
*/
mejs.MediaElement = function (el, o) {
	return mejs.HtmlMediaElementShim.create(el,o);
};

mejs.HtmlMediaElementShim = {

	create: function(el, o) {
		var
			options = {},
			htmlMediaElement = (typeof(el) == 'string') ? document.getElementById(el) : el,
			tagName = htmlMediaElement.tagName.toLowerCase(),
			isMediaTag = (tagName === 'audio' || tagName === 'video'),
			src = (isMediaTag) ? htmlMediaElement.getAttribute('src') : htmlMediaElement.getAttribute('href'),
			poster = htmlMediaElement.getAttribute('poster'),
			autoplay =  htmlMediaElement.getAttribute('autoplay'),
			preload =  htmlMediaElement.getAttribute('preload'),
			controls =  htmlMediaElement.getAttribute('controls'),
			playback,
			prop;

		// extend options
		for (prop in mejs.MediaElementDefaults) {
			options[prop] = mejs.MediaElementDefaults[prop];
		}
		for (prop in o) {
			options[prop] = o[prop];
		}		
		

		// clean up attributes
		src = 		(typeof src == 'undefined' 	|| src === null || src == '') ? null : src;		
		poster =	(typeof poster == 'undefined' 	|| poster === null) ? '' : poster;
		preload = 	(typeof preload == 'undefined' 	|| preload === null || preload === 'false') ? 'none' : preload;
		autoplay = 	!(typeof autoplay == 'undefined' || autoplay === null || autoplay === 'false');
		controls = 	!(typeof controls == 'undefined' || controls === null || controls === 'false');

		// test for HTML5 and plugin capabilities
		playback = this.determinePlayback(htmlMediaElement, options, mejs.MediaFeatures.supportsMediaTag, isMediaTag, src);
		playback.url = (playback.url !== null) ? mejs.Utility.absolutizeUrl(playback.url) : '';
        	playback.scheme = mejs.Utility.determineScheme(playback.url);

		if (playback.method == 'native') {
			// second fix for android
			if (mejs.MediaFeatures.isBustedAndroid) {
				htmlMediaElement.src = playback.url;
				htmlMediaElement.addEventListener('click', function() {
					htmlMediaElement.play();
				}, false);
			}
		
			// add methods to native HTMLMediaElement
			return this.updateNative(playback, options, autoplay, preload);
		} else if (playback.method !== '') {
			// create plugin to mimic HTMLMediaElement
			
			return this.createPlugin( playback,  options, poster, autoplay, preload, controls);
		} else {
			// boo, no HTML5, no Flash, no Silverlight.
			this.createErrorMessage( playback, options, poster );
			
			return this;
		}
	},
	
	determinePlayback: function(htmlMediaElement, options, supportsMediaTag, isMediaTag, src) {
		var
			mediaFiles = [],
			i,
			j,
			k,
			l,
			n,
			type,
			result = { method: '', url: '', htmlMediaElement: htmlMediaElement, isVideo: (htmlMediaElement.tagName.toLowerCase() !== 'audio'), scheme: ''},
			pluginName,
			pluginVersions,
			pluginInfo,
			dummy,
			media;
			
		// STEP 1: Get URL and type from <video src> or <source src>

		// supplied type overrides <video type> and <source type>
		if (typeof options.type != 'undefined' && options.type !== '') {
			
			// accept either string or array of types
			if (typeof options.type == 'string') {
				mediaFiles.push({type:options.type, url:src});
			} else {
				
				for (i=0; i<options.type.length; i++) {
					mediaFiles.push({type:options.type[i], url:src});
				}
			}

		// test for src attribute first
		} else if (src !== null) {
			type = this.formatType(src, htmlMediaElement.getAttribute('type'));
			mediaFiles.push({type:type, url:src});

		// then test for <source> elements
		} else {
			// test <source> types to see if they are usable
			for (i = 0; i < htmlMediaElement.childNodes.length; i++) {
				n = htmlMediaElement.childNodes[i];
				if (n.nodeType == 1 && n.tagName.toLowerCase() == 'source') {
					src = n.getAttribute('src');
					type = this.formatType(src, n.getAttribute('type'));
					media = n.getAttribute('media');

					if (!media || !window.matchMedia || (window.matchMedia && window.matchMedia(media).matches)) {
						mediaFiles.push({type:type, url:src});
					}
				}
			}
		}
		
		// in the case of dynamicly created players
		// check for audio types
		if (!isMediaTag && mediaFiles.length > 0 && mediaFiles[0].url !== null && this.getTypeFromFile(mediaFiles[0].url).indexOf('audio') > -1) {
			result.isVideo = false;
		}
		

		// STEP 2: Test for playback method
		
		// special case for Android which sadly doesn't implement the canPlayType function (always returns '')
		if (result.isVideo && mejs.MediaFeatures.isBustedAndroid) {
			htmlMediaElement.canPlayType = function(type) {
				return (type.match(/video\/(mp4|m4v)/gi) !== null) ? 'maybe' : '';
			};
		}		
		
		// special case for Chromium to specify natively supported video codecs (i.e. WebM and Theora) 
		if (result.isVideo && mejs.MediaFeatures.isChromium) {
			htmlMediaElement.canPlayType = function(type) { 
				return (type.match(/video\/(webm|ogv|ogg)/gi) !== null) ? 'maybe' : '';
			}; 
		}

		// test for native playback first
		if (supportsMediaTag && (options.mode === 'auto' || options.mode === 'auto_plugin' || options.mode === 'native')  && !(mejs.MediaFeatures.isBustedNativeHTTPS && options.httpsBasicAuthSite === true)) {
						
			if (!isMediaTag) {

				// create a real HTML5 Media Element 
				dummy = document.createElement( result.isVideo ? 'video' : 'audio');			
				htmlMediaElement.parentNode.insertBefore(dummy, htmlMediaElement);
				htmlMediaElement.style.display = 'none';
				
				// use this one from now on
				result.htmlMediaElement = htmlMediaElement = dummy;
			}
				
			for (i=0; i<mediaFiles.length; i++) {
				// normal check
				if (mediaFiles[i].type == "video/m3u8" || htmlMediaElement.canPlayType(mediaFiles[i].type).replace(/no/, '') !== ''
					// special case for Mac/Safari 5.0.3 which answers '' to canPlayType('audio/mp3') but 'maybe' to canPlayType('audio/mpeg')
					|| htmlMediaElement.canPlayType(mediaFiles[i].type.replace(/mp3/,'mpeg')).replace(/no/, '') !== ''
					// special case for m4a supported by detecting mp4 support
					|| htmlMediaElement.canPlayType(mediaFiles[i].type.replace(/m4a/,'mp4')).replace(/no/, '') !== '') {
					result.method = 'native';
					result.url = mediaFiles[i].url;
					break;
				}
			}			
			
			if (result.method === 'native') {
				if (result.url !== null) {
					htmlMediaElement.src = result.url;
				}
			
				// if `auto_plugin` mode, then cache the native result but try plugins.
				if (options.mode !== 'auto_plugin') {
					return result;
				}
			}
		}

		// if native playback didn't work, then test plugins
		if (options.mode === 'auto' || options.mode === 'auto_plugin' || options.mode === 'shim') {
			for (i=0; i<mediaFiles.length; i++) {
				type = mediaFiles[i].type;

				// test all plugins in order of preference [silverlight, flash]
				for (j=0; j<options.plugins.length; j++) {

					pluginName = options.plugins[j];
			
					// test version of plugin (for future features)
					pluginVersions = mejs.plugins[pluginName];				
					
					for (k=0; k<pluginVersions.length; k++) {
						pluginInfo = pluginVersions[k];
					
						// test if user has the correct plugin version
						
						// for youtube/vimeo
						if (pluginInfo.version == null || 
							
							mejs.PluginDetector.hasPluginVersion(pluginName, pluginInfo.version)) {

							// test for plugin playback types
							for (l=0; l<pluginInfo.types.length; l++) {
								// find plugin that can play the type
								if (type.toLowerCase() == pluginInfo.types[l].toLowerCase()) {
									result.method = pluginName;
									result.url = mediaFiles[i].url;
									return result;
								}
							}
						}
					}
				}
			}
		}
		
		// at this point, being in 'auto_plugin' mode implies that we tried plugins but failed.
		// if we have native support then return that.
		if (options.mode === 'auto_plugin' && result.method === 'native') {
			return result;
		}

		// what if there's nothing to play? just grab the first available
		if (result.method === '' && mediaFiles.length > 0) {
			result.url = mediaFiles[0].url;
		}

		return result;
	},

	formatType: function(url, type) {
		// if no type is supplied, fake it with the extension
		if (url && !type) {		
			return this.getTypeFromFile(url);
		} else {
			// only return the mime part of the type in case the attribute contains the codec
			// see http://www.whatwg.org/specs/web-apps/current-work/multipage/video.html#the-source-element
			// `video/mp4; codecs="avc1.42E01E, mp4a.40.2"` becomes `video/mp4`
			
			if (type && ~type.indexOf(';')) {
				return type.substr(0, type.indexOf(';')); 
			} else {
				return type;
			}
		}
	},
	
	getTypeFromFile: function(url) {
		url = url.split('?')[0];
		var
			ext = url.substring(url.lastIndexOf('.') + 1).toLowerCase(),
			av = /(mp4|m4v|ogg|ogv|m3u8|webm|webmv|flv|wmv|mpeg|mov)/gi.test(ext) ? 'video/' : 'audio/';
		return this.getTypeFromExtension(ext, av);
	},
	
	getTypeFromExtension: function(ext, av) {
		av = av || '';
		
		switch (ext) {
			case 'mp4':
			case 'm4v':
			case 'm4a':
			case 'f4v':
			case 'f4a':
				return av + 'mp4';
			case 'flv':
				return av + 'x-flv';
			case 'webm':
			case 'webma':
			case 'webmv':	
				return av + 'webm';
			case 'ogg':
			case 'oga':
			case 'ogv':	
				return av + 'ogg';
			case 'm3u8':
				return 'application/x-mpegurl';
			case 'ts':
				return av + 'mp2t';
			default:
				return av + ext;
		}
	},

	createErrorMessage: function(playback, options, poster) {
		var 
			htmlMediaElement = playback.htmlMediaElement,
			errorContainer = document.createElement('div'),
			errorContent = options.customError;
			
		errorContainer.className = 'me-cannotplay';

		try {
			errorContainer.style.width = htmlMediaElement.width + 'px';
			errorContainer.style.height = htmlMediaElement.height + 'px';
		} catch (e) {}

		if (!errorContent) {
			errorContent = '<a href="' + playback.url + '">';

			if (poster !== '') {
				errorContent += '<img src="' + poster + '" width="100%" height="100%" alt="" />';
			}

			errorContent += '<span>' + mejs.i18n.t('mejs.download-file') + '</span></a>';
		}

		errorContainer.innerHTML = errorContent;

		htmlMediaElement.parentNode.insertBefore(errorContainer, htmlMediaElement);
		htmlMediaElement.style.display = 'none';

		options.error(htmlMediaElement);
	},

	createPlugin:function(playback, options, poster, autoplay, preload, controls) {
		var 
			htmlMediaElement = playback.htmlMediaElement,
			width = 1,
			height = 1,
			pluginid = 'me_' + playback.method + '_' + (mejs.meIndex++),
			pluginMediaElement = new mejs.PluginMediaElement(pluginid, playback.method, playback.url),
			container = document.createElement('div'),
			specialIEContainer,
			node,
			initVars;

		// copy tagName from html media element
		pluginMediaElement.tagName = htmlMediaElement.tagName;

		// copy attributes from html media element to plugin media element
		for (var i = 0; i < htmlMediaElement.attributes.length; i++) {
			var attribute = htmlMediaElement.attributes[i];
			if (attribute.specified) {
				pluginMediaElement.setAttribute(attribute.name, attribute.value);
			}
		}

		// check for placement inside a <p> tag (sometimes WYSIWYG editors do this)
		node = htmlMediaElement.parentNode;

		while (node !== null && node.tagName != null && node.tagName.toLowerCase() !== 'body' && 
				node.parentNode != null && node.parentNode.tagName != null && node.parentNode.constructor != null && node.parentNode.constructor.name === "ShadowRoot") {
			if (node.parentNode.tagName.toLowerCase() === 'p') {
				node.parentNode.parentNode.insertBefore(node, node.parentNode);
				break;
			}
			node = node.parentNode;
		}

		if (playback.isVideo) {
			width = (options.pluginWidth > 0) ? options.pluginWidth : (options.videoWidth > 0) ? options.videoWidth : (htmlMediaElement.getAttribute('width') !== null) ? htmlMediaElement.getAttribute('width') : options.defaultVideoWidth;
			height = (options.pluginHeight > 0) ? options.pluginHeight : (options.videoHeight > 0) ? options.videoHeight : (htmlMediaElement.getAttribute('height') !== null) ? htmlMediaElement.getAttribute('height') : options.defaultVideoHeight;
		
			// in case of '%' make sure it's encoded
			width = mejs.Utility.encodeUrl(width);
			height = mejs.Utility.encodeUrl(height);
		
		} else {
			if (options.enablePluginDebug) {
				width = 320;
				height = 240;
			}
		}

		// register plugin
		pluginMediaElement.success = options.success;
		
		// add container (must be added to DOM before inserting HTML for IE)
		container.className = 'me-plugin';
		container.id = pluginid + '_container';
		
		if (playback.isVideo) {
				htmlMediaElement.parentNode.insertBefore(container, htmlMediaElement);
		} else {
				document.body.insertBefore(container, document.body.childNodes[0]);
		}
		
		if (playback.method === 'flash' || playback.method === 'silverlight') {

			var canPlayVideo = htmlMediaElement.getAttribute('type') === 'audio/mp4',
				childrenSources = htmlMediaElement.getElementsByTagName('source');

			if (childrenSources && !canPlayVideo) {
				for (var i = 0, total = childrenSources.length; i < total; i++) {
					if (childrenSources[i].getAttribute('type') === 'audio/mp4') {
						canPlayVideo = true;
					}
				}
			}

			// flash/silverlight vars
			initVars = [
				'id=' + pluginid,
				'isvideo=' + ((playback.isVideo || canPlayVideo) ? "true" : "false"),
				'autoplay=' + ((autoplay) ? "true" : "false"),
				'preload=' + preload,
				'width=' + width,
				'startvolume=' + options.startVolume,
				'timerrate=' + options.timerRate,
				'flashstreamer=' + options.flashStreamer,
				'height=' + height,
				'pseudostreamstart=' + options.pseudoStreamingStartQueryParam];
	
			if (playback.url !== null) {
				if (playback.method == 'flash') {
					initVars.push('file=' + mejs.Utility.encodeUrl(playback.url));
				} else {
					initVars.push('file=' + playback.url);
				}
			}
			if (options.enablePluginDebug) {
				initVars.push('debug=true');
			}
			if (options.enablePluginSmoothing) {
				initVars.push('smoothing=true');
			}
			if (options.enablePseudoStreaming) {
				initVars.push('pseudostreaming=true');
			}
			if (controls) {
				initVars.push('controls=true'); // shows controls in the plugin if desired
			}
			if (options.pluginVars) {
				initVars = initVars.concat(options.pluginVars);
			}		
			
			// call from plugin
			window[pluginid + '_init'] = function() {
				switch (pluginMediaElement.pluginType) {
					case 'flash':
						pluginMediaElement.pluginElement = pluginMediaElement.pluginApi = document.getElementById(pluginid);
						break;
					case 'silverlight':
						pluginMediaElement.pluginElement = document.getElementById(pluginMediaElement.id);
						pluginMediaElement.pluginApi = pluginMediaElement.pluginElement.Content.MediaElementJS;
						break;
				}
	
				if (pluginMediaElement.pluginApi != null && pluginMediaElement.success) {
					pluginMediaElement.success(pluginMediaElement, htmlMediaElement);
				}
			};
			
			// event call from plugin
			window[pluginid + '_event'] = function(eventName, values) {
		
				var
					e,
					i,
					bufferedTime;
		        
				// fake event object to mimic real HTML media event.
				e = {
					type: eventName,
					target: pluginMediaElement
				};
		
				// attach all values to element and event object
				for (i in values) {
					pluginMediaElement[i] = values[i];
					e[i] = values[i];
				}
		
				// fake the newer W3C buffered TimeRange (loaded and total have been removed)
				bufferedTime = values.bufferedTime || 0;
		
				e.target.buffered = e.buffered = {
					start: function(index) {
						return 0;
					},
					end: function (index) {
						return bufferedTime;
					},
					length: 1
				};
		
				pluginMediaElement.dispatchEvent(e);
			}			
			
			
		}

		switch (playback.method) {
			case 'silverlight':
				container.innerHTML =
'<object data="data:application/x-silverlight-2," type="application/x-silverlight-2" id="' + pluginid + '" name="' + pluginid + '" width="' + width + '" height="' + height + '" class="mejs-shim">' +
'<param name="initParams" value="' + initVars.join(',') + '" />' +
'<param name="windowless" value="true" />' +
'<param name="background" value="black" />' +
'<param name="minRuntimeVersion" value="3.0.0.0" />' +
'<param name="autoUpgrade" value="true" />' +
'<param name="source" value="' + options.pluginPath + options.silverlightName + '" />' +
'</object>';
					break;

			case 'flash':

				if (mejs.MediaFeatures.isIE) {
					specialIEContainer = document.createElement('div');
					container.appendChild(specialIEContainer);
					specialIEContainer.outerHTML =
'<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="//download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab" ' +
'id="' + pluginid + '" width="' + width + '" height="' + height + '" class="mejs-shim">' +
'<param name="movie" value="' + options.pluginPath + options.flashName + '?' + (new Date().getTime()) + '" />' +
'<param name="flashvars" value="' + initVars.join('&amp;') + '" />' +
'<param name="quality" value="high" />' +
'<param name="bgcolor" value="#000000" />' +
'<param name="wmode" value="transparent" />' +
'<param name="allowScriptAccess" value="' + options.flashScriptAccess + '" />' +
'<param name="allowFullScreen" value="true" />' +
'<param name="scale" value="default" />' + 
'</object>';

				} else {

					container.innerHTML =
'<embed id="' + pluginid + '" name="' + pluginid + '" ' +
'play="true" ' +
'loop="false" ' +
'quality="high" ' +
'bgcolor="#000000" ' +
'wmode="transparent" ' +
'allowScriptAccess="' + options.flashScriptAccess + '" ' +
'allowFullScreen="true" ' +
'type="application/x-shockwave-flash" pluginspage="//www.macromedia.com/go/getflashplayer" ' +
'src="' + options.pluginPath + options.flashName + '" ' +
'flashvars="' + initVars.join('&') + '" ' +
'width="' + width + '" ' +
'height="' + height + '" ' +
'scale="default"' + 
'class="mejs-shim"></embed>';
				}
				break;
			
			case 'youtube':
			
				
				var videoId;
				// youtu.be url from share button
				if (playback.url.lastIndexOf("youtu.be") != -1) {
					videoId = playback.url.substr(playback.url.lastIndexOf('/')+1);
					if (videoId.indexOf('?') != -1) {
						videoId = videoId.substr(0, videoId.indexOf('?'));
					}
				}
				else {
					// https://www.youtube.com/watch?v=
					var videoIdMatch = playback.url.match( /[?&]v=([^&#]+)|&|#|$/ );
					if ( videoIdMatch ) {
						videoId = videoIdMatch[1];
					}
				}
				youtubeSettings = {
						container: container,
						containerId: container.id,
						pluginMediaElement: pluginMediaElement,
						pluginId: pluginid,
						videoId: videoId,
						height: height,
						width: width,
                        scheme: playback.scheme,
						variables: options.youtubeIframeVars
					};				
				
				// favor iframe version of YouTube
				if (window.postMessage) {
					mejs.YouTubeApi.enqueueIframe(youtubeSettings);		
				} else if (mejs.PluginDetector.hasPluginVersion('flash', [10,0,0]) ) {
					mejs.YouTubeApi.createFlash(youtubeSettings, options);
				}
				break;
			
			// DEMO Code. Does NOT work.
			case 'vimeo':
				var player_id = pluginid + "_player";
				pluginMediaElement.vimeoid = playback.url.substr(playback.url.lastIndexOf('/')+1);
				
				container.innerHTML ='<iframe src="' + playback.scheme + 'player.vimeo.com/video/' + pluginMediaElement.vimeoid + '?api=1&portrait=0&byline=0&title=0&player_id=' + player_id + '" width="' + width +'" height="' + height +'" frameborder="0" class="mejs-shim" id="' + player_id + '" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>';
				if (typeof($f) == 'function') { // froogaloop available
					var player = $f(container.childNodes[0]),
						playerState = -1;
					
					player.addEvent('ready', function() {
		
						player.playVideo = function() {
							player.api( 'play' );
						};
						player.stopVideo = function() {
							player.api( 'unload' );
						};
						player.pauseVideo = function() {
							player.api( 'pause' );
						};
						player.seekTo = function( seconds ) {
							player.api( 'seekTo', seconds );
						};
						player.setVolume = function( volume ) {
							player.api( 'setVolume', volume );
						};
						player.setMuted = function( muted ) {
							if( muted ) {
								player.lastVolume = player.api( 'getVolume' );
								player.api( 'setVolume', 0 );
							} else {
								player.api( 'setVolume', player.lastVolume );
								delete player.lastVolume;
							}
						};
						// parity with YT player
						player.getPlayerState = function() {
							return playerState;
						};

						function createEvent(player, pluginMediaElement, eventName, e) {
							var event = {
								type: eventName,
								target: pluginMediaElement
							};
							if (eventName == 'timeupdate') {
								pluginMediaElement.currentTime = event.currentTime = e.seconds;
								pluginMediaElement.duration = event.duration = e.duration;
							}
							pluginMediaElement.dispatchEvent(event);
						}

						player.addEvent('play', function() {
							playerState = 1;
							createEvent(player, pluginMediaElement, 'play');
							createEvent(player, pluginMediaElement, 'playing');
						});

						player.addEvent('pause', function() {
							playerState = 2;							
							createEvent(player, pluginMediaElement, 'pause');
						});

						player.addEvent('finish', function() {
							playerState = 0;							
							createEvent(player, pluginMediaElement, 'ended');
						});

						player.addEvent('playProgress', function(e) {
							createEvent(player, pluginMediaElement, 'timeupdate', e);
						});
						
						player.addEvent('seek', function(e) {
							playerState = 3;
							createEvent(player, pluginMediaElement, 'seeked', e);
						});	
						
						player.addEvent('loadProgress', function(e) {
							playerState = 3;
							createEvent(player, pluginMediaElement, 'progress', e);
						});												

						pluginMediaElement.pluginElement = container;
						pluginMediaElement.pluginApi = player;

						pluginMediaElement.success(pluginMediaElement, pluginMediaElement.pluginElement);						
					});
				}
				else {
					console.warn("You need to include froogaloop for vimeo to work");
				}
				break;			
		}
		// hide original element
		htmlMediaElement.style.display = 'none';
		// prevent browser from autoplaying when using a plugin
		htmlMediaElement.removeAttribute('autoplay');
		
		return pluginMediaElement;
	},

	updateNative: function(playback, options, autoplay, preload) {
		
		var htmlMediaElement = playback.htmlMediaElement,
			m;
		
		
		// add methods to video object to bring it into parity with Flash Object
		for (m in mejs.HtmlMediaElement) {
			htmlMediaElement[m] = mejs.HtmlMediaElement[m];
		}

		/*
		Chrome now supports preload="none"
		if (mejs.MediaFeatures.isChrome) {
		
			// special case to enforce preload attribute (Chrome doesn't respect this)
			if (preload === 'none' && !autoplay) {
			
				// forces the browser to stop loading (note: fails in IE9)
				htmlMediaElement.src = '';
				htmlMediaElement.load();
				htmlMediaElement.canceledPreload = true;

				htmlMediaElement.addEventListener('play',function() {
					if (htmlMediaElement.canceledPreload) {
						htmlMediaElement.src = playback.url;
						htmlMediaElement.load();
						htmlMediaElement.play();
						htmlMediaElement.canceledPreload = false;
					}
				}, false);
			// for some reason Chrome forgets how to autoplay sometimes.
			} else if (autoplay) {
				htmlMediaElement.load();
				htmlMediaElement.play();
			}
		}
		*/

		// fire success code
		options.success(htmlMediaElement, htmlMediaElement);
		
		return htmlMediaElement;
	}
};

/*
 - test on IE (object vs. embed)
 - determine when to use iframe (Firefox, Safari, Mobile) vs. Flash (Chrome, IE)
 - fullscreen?
*/

// YouTube Flash and Iframe API
mejs.YouTubeApi = {
	isIframeStarted: false,
	isIframeLoaded: false,
	loadIframeApi: function(yt) {
		if (!this.isIframeStarted) {
			var tag = document.createElement('script');
			tag.src = yt.scheme + "www.youtube.com/player_api";
			var firstScriptTag = document.getElementsByTagName('script')[0];
			firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
			this.isIframeStarted = true;
		}
	},
	iframeQueue: [],
	enqueueIframe: function(yt) {
		
		if (this.isLoaded) {
			this.createIframe(yt);
		} else {
			this.loadIframeApi(yt);
			this.iframeQueue.push(yt);
		}
	},
	createIframe: function(settings) {

		var
		pluginMediaElement = settings.pluginMediaElement,
		defaultVars = {controls:0, wmode:'transparent'},
		player = new YT.Player(settings.containerId, {
			height: settings.height,
			width: settings.width,
			videoId: settings.videoId,
			playerVars: mejs.$.extend({}, defaultVars, settings.variables),
			events: {
				'onReady': function(e) {
					
					// wrapper to match
					player.setVideoSize = function(width, height) {
						player.setSize(width, height);
					};
					
					// hook up iframe object to MEjs
					settings.pluginMediaElement.pluginApi = player;
					settings.pluginMediaElement.pluginElement = document.getElementById(settings.containerId);
					
					// init mejs
					pluginMediaElement.success(pluginMediaElement, pluginMediaElement.pluginElement);

					mejs.YouTubeApi.createEvent(player, pluginMediaElement, 'canplay');
					
					// create timer
					setInterval(function() {
						mejs.YouTubeApi.createEvent(player, pluginMediaElement, 'timeupdate');
					}, 250);

					if (typeof pluginMediaElement.attributes.autoplay !== 'undefined') {
						player.playVideo();
					}
				},
				'onStateChange': function(e) {
					
					mejs.YouTubeApi.handleStateChange(e.data, player, pluginMediaElement);
					
				}
			}
		});
	},
	
	createEvent: function (player, pluginMediaElement, eventName) {
		var event = {
			type: eventName,
			target: pluginMediaElement
		};

		if (player && player.getDuration) {
			
			// time 
			pluginMediaElement.currentTime = event.currentTime = player.getCurrentTime();
			pluginMediaElement.duration = event.duration = player.getDuration();
			
			// state
			event.paused = pluginMediaElement.paused;
			event.ended = pluginMediaElement.ended;			
			
			// sound
			event.muted = player.isMuted();
			event.volume = player.getVolume() / 100;
			
			// progress
			event.bytesTotal = player.getVideoBytesTotal();
			event.bufferedBytes = player.getVideoBytesLoaded();
			
			// fake the W3C buffered TimeRange
			var bufferedTime = event.bufferedBytes / event.bytesTotal * event.duration;
			
			event.target.buffered = event.buffered = {
				start: function(index) {
					return 0;
				},
				end: function (index) {
					return bufferedTime;
				},
				length: 1
			};

		}
		
		// send event up the chain
		pluginMediaElement.dispatchEvent(event);
	},	
	
	iFrameReady: function() {
		
		this.isLoaded = true;
		this.isIframeLoaded = true;
		
		while (this.iframeQueue.length > 0) {
			var settings = this.iframeQueue.pop();
			this.createIframe(settings);
		}	
	},
	
	// FLASH!
	flashPlayers: {},
	createFlash: function(settings) {
		
		this.flashPlayers[settings.pluginId] = settings;
		
		/*
		settings.container.innerHTML =
			'<object type="application/x-shockwave-flash" id="' + settings.pluginId + '" data="' + settings.scheme + 'www.youtube.com/apiplayer?enablejsapi=1&amp;playerapiid=' + settings.pluginId  + '&amp;version=3&amp;autoplay=0&amp;controls=0&amp;modestbranding=1&loop=0" ' +
				'width="' + settings.width + '" height="' + settings.height + '" style="visibility: visible; " class="mejs-shim">' +
				'<param name="allowScriptAccess" value="sameDomain">' +
				'<param name="wmode" value="transparent">' +
			'</object>';
		*/

		var specialIEContainer,
			youtubeUrl = settings.scheme + 'www.youtube.com/apiplayer?enablejsapi=1&amp;playerapiid=' + settings.pluginId  + '&amp;version=3&amp;autoplay=0&amp;controls=0&amp;modestbranding=1&loop=0';
			
		if (mejs.MediaFeatures.isIE) {
			
			specialIEContainer = document.createElement('div');
			settings.container.appendChild(specialIEContainer);
			specialIEContainer.outerHTML = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="' + settings.scheme + 'download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab" ' +
'id="' + settings.pluginId + '" width="' + settings.width + '" height="' + settings.height + '" class="mejs-shim">' +
	'<param name="movie" value="' + youtubeUrl + '" />' +
	'<param name="wmode" value="transparent" />' +
	'<param name="allowScriptAccess" value="' + options.flashScriptAccess + '" />' +
	'<param name="allowFullScreen" value="true" />' +
'</object>';
		} else {
		settings.container.innerHTML =
			'<object type="application/x-shockwave-flash" id="' + settings.pluginId + '" data="' + youtubeUrl + '" ' +
				'width="' + settings.width + '" height="' + settings.height + '" style="visibility: visible; " class="mejs-shim">' +
				'<param name="allowScriptAccess" value="' + options.flashScriptAccess + '">' +
				'<param name="wmode" value="transparent">' +
			'</object>';
		}		
		
	},
	
	flashReady: function(id) {
		var
			settings = this.flashPlayers[id],
			player = document.getElementById(id),
			pluginMediaElement = settings.pluginMediaElement;
		
		// hook up and return to MediaELementPlayer.success	
		pluginMediaElement.pluginApi = 
		pluginMediaElement.pluginElement = player;
		
		settings.success(pluginMediaElement, pluginMediaElement.pluginElement);
		
		// load the youtube video
		player.cueVideoById(settings.videoId);
		
		var callbackName = settings.containerId + '_callback';
		
		window[callbackName] = function(e) {
			mejs.YouTubeApi.handleStateChange(e, player, pluginMediaElement);
		};
		
		player.addEventListener('onStateChange', callbackName);
		
		setInterval(function() {
			mejs.YouTubeApi.createEvent(player, pluginMediaElement, 'timeupdate');
		}, 250);
		
		mejs.YouTubeApi.createEvent(player, pluginMediaElement, 'canplay');
	},
	
	handleStateChange: function(youTubeState, player, pluginMediaElement) {
		switch (youTubeState) {
			case -1: // not started
				pluginMediaElement.paused = true;
				pluginMediaElement.ended = true;
				mejs.YouTubeApi.createEvent(player, pluginMediaElement, 'loadedmetadata');
				//createYouTubeEvent(player, pluginMediaElement, 'loadeddata');
				break;
			case 0:
				pluginMediaElement.paused = false;
				pluginMediaElement.ended = true;
				mejs.YouTubeApi.createEvent(player, pluginMediaElement, 'ended');
				break;
			case 1:
				pluginMediaElement.paused = false;
				pluginMediaElement.ended = false;				
				mejs.YouTubeApi.createEvent(player, pluginMediaElement, 'play');
				mejs.YouTubeApi.createEvent(player, pluginMediaElement, 'playing');
				break;
			case 2:
				pluginMediaElement.paused = true;
				pluginMediaElement.ended = false;				
				mejs.YouTubeApi.createEvent(player, pluginMediaElement, 'pause');
				break;
			case 3: // buffering
				mejs.YouTubeApi.createEvent(player, pluginMediaElement, 'progress');
				break;
			case 5:
				// cued?
				break;						
			
		}			
		
	}
}
// IFRAME
window.onYouTubePlayerAPIReady = function() {
	mejs.YouTubeApi.iFrameReady();
};
// FLASH
window.onYouTubePlayerReady = function(id) {
	mejs.YouTubeApi.flashReady(id);
};

window.mejs = mejs;
window.MediaElement = mejs.MediaElement;

/**
 * Localize strings
 *
 * Include translations from JS files and method to pluralize properly strings.
 *
 */
(function (doc, win, mejs, undefined) {

	var i18n = {
		/**
		 * @type {String}
		 */
		'default': 'en',

		/**
		 * @type {String[]}
		 */
		locale: {
			language: (mejs.i18n && mejs.i18n.locale.language) || '',
			strings: (mejs.i18n && mejs.i18n.locale.strings) || {}
		},

		/**
		 * Filters for available languages.
		 *
		 * This plural forms are grouped in family groups based on
		 * https://developer.mozilla.org/en-US/docs/Mozilla/Localization/Localization_and_Plurals#List_of_Plural_Rules
		 * with some additions and corrections according to the Localization Guide list
		 * (http://localization-guide.readthedocs.io/en/latest/l10n/pluralforms.html)
		 *
		 * Arguments are dynamic following the structure:
		 * - argument1 : Number to determine form
		 * - argument2...argumentN: Possible matches
		 *
		 * @type {Function[]}
		 */
		pluralForms: [
			// 0: Chinese, Japanese, Korean, Persian, Turkish, Thai, Lao, Aymará,
			// Tibetan, Chiga, Dzongkha, Indonesian, Lojban, Georgian, Kazakh, Khmer, Kyrgyz, Malay,
			// Burmese, Yakut, Sundanese, Tatar, Uyghur, Vietnamese, Wolof
			function () {
				return arguments[1];
			},
			// 1: Danish, Dutch, English, Faroese, Frisian, German, Norwegian, Swedish, Estonian, Finnish,
			// Hungarian, Basque, Greek, Hebrew, Italian, Portuguese, Spanish, Catalan, Afrikaans,
			// Angika, Assamese, Asturian, Azerbaijani, Bulgarian, Bengali, Bodo, Aragonese, Dogri,
			// Esperanto, Argentinean Spanish, Fulah, Friulian, Galician, Gujarati, Hausa,
			// Hindi, Chhattisgarhi, Armenian, Interlingua, Greenlandic, Kannada, Kurdish, Letzeburgesch,
			// Maithili, Malayalam, Mongolian, Manipuri, Marathi, Nahuatl, Neapolitan, Norwegian Bokmal,
			// Nepali, Norwegian Nynorsk, Norwegian (old code), Northern Sotho, Oriya, Punjabi, Papiamento,
			// Piemontese, Pashto, Romansh, Kinyarwanda, Santali, Scots, Sindhi, Northern Sami, Sinhala,
			// Somali, Songhay, Albanian, Swahili, Tamil, Telugu, Turkmen, Urdu, Yoruba
			function () {
				var args = arguments;
				if (args[0] === 1) {
					return args[1];
				} else {
					return args[2];
				}
			},
			// 2: French, Brazilian Portuguese, Acholi, Akan, Amharic, Mapudungun, Breton, Filipino,
			// Gun, Lingala, Mauritian Creole, Malagasy, Maori, Occitan, Tajik, Tigrinya, Uzbek, Walloon
			function () {
				var args = arguments;
				if ([0, 1].indexOf(args[0]) > -1) {
					return args[1];
				} else {
					return args[2];
				}
			},
			// 3: Latvian
			function () {
				var args = arguments;
				if (args[0] % 10 === 1 && args[0] % 100 !== 11) {
					return args[1];
				} else if (args[0] !== 0) {
					return args[2];
				} else {
					return args[3];
				}
			},
			// 4: Scottish Gaelic
			function () {
				var args = arguments;
				if (args[0] === 1 || args[0] === 11) {
					return args[1];
				} else if (args[0] === 2 || args[0] === 12) {
					return args[2];
				} else if (args[0] > 2 && args[0] < 20) {
					return args[3];
				} else {
					return args[4];
				}
			},
			// 5:  Romanian
			function () {
				if (args[0] === 1) {
					return args[1];
				} else if (args[0] === 0 || (args[0] % 100 > 0 && args[0] % 100 < 20)) {
					return args[2];
				} else {
					return args[3];
				}
			},
			// 6: Lithuanian
			function () {
				var args = arguments;
				if (args[0] % 10 === 1 && args[0] % 100 !== 11) {
					return args[1];
				} else if (args[0] % 10 >= 2 && (args[0] % 100 < 10 || args[0] % 100 >= 20)) {
					return args[2];
				} else {
					return [3];
				}
			},
			// 7: Belarusian, Bosnian, Croatian, Serbian, Russian, Ukrainian
			function () {
				var args = arguments;
				if (args[0] % 10 === 1 && args[0] % 100 !== 11) {
					return args[1];
				} else if (args[0] % 10 >= 2 && args[0] % 10 <= 4 && (args[0] % 100 < 10 || args[0] % 100 >= 20)) {
					return args[2];
				} else {
					return args[3];
				}
			},
			// 8:  Slovak, Czech
			function () {
				var args = arguments;
				if (args[0] === 1) {
					return args[1];
				} else if (args[0] >= 2 && args[0] <= 4) {
					return args[2];
				} else {
					return args[3];
				}
			},
			// 9: Polish
			function () {
				var args = arguments;
				if (args[0] === 1) {
					return args[1];
				} else if (args[0] % 10 >= 2 && args[0] % 10 <= 4 && (args[0] % 100 < 10 || args[0] % 100 >= 20)) {
					return args[2];
				} else {
					return args[3];
				}
			},
			// 10: Slovenian
			function () {
				var args = arguments;
				if (args[0] % 100 === 1) {
					return args[2];
				} else if (args[0] % 100 === 2) {
					return args[3];
				} else if (args[0] % 100 === 3 || args[0] % 100 === 4) {
					return args[4];
				} else {
					return args[1];
				}
			},
			// 11: Irish Gaelic
			function () {
				var args = arguments;
				if (args[0] === 1) {
					return args[1];
				} else if (args[0] === 2) {
					return args[2];
				} else if (args[0] > 2 && args[0] < 7) {
					return args[3];
				} else if (args[0] > 6 && args[0] < 11) {
					return args[4];
				} else {
					return args[5];
				}
			},
			// 12: Arabic
			function () {
				var args = arguments;
				if (args[0] === 0) {
					return args[1];
				} else if (args[0] === 1) {
					return args[2];
				} else if (args[0] === 2) {
					return args[3];
				} else if (args[0] % 100 >= 3 && args[0] % 100 <= 10) {
					return args[4];
				} else if (args[0] % 100 >= 11) {
					return args[5];
				} else {
					return args[6];
				}
			},
			// 13: Maltese
			function () {
				var args = arguments;
				if (args[0] === 1) {
					return args[1];
				} else if (args[0] === 0 || (args[0] % 100 > 1 && args[0] % 100 < 11)) {
					return args[2];
				} else if (args[0] % 100 > 10 && args[0] % 100 < 20) {
					return args[3];
				} else {
					return args[4];
				}

			},
			// 14: Macedonian
			function () {
				var args = arguments;
				if (args[0] % 10 === 1) {
					return args[1];
				} else if (args[0] % 10 === 2) {
					return args[2];
				} else {
					return args[3];
				}
			},
			// 15:  Icelandic
			function () {
				var args = arguments;
				if (args[0] !== 11 && args[0] % 10 === 1) {
					return args[1];
				} else {
					return args[2];
				}
			},
			// New additions

			// 16:  Kashubian
			// Note: in https://developer.mozilla.org/en-US/docs/Mozilla/Localization/Localization_and_Plurals#List_of_Plural_Rules
			// Breton is listed as #16 but in the Localization Guide it belongs to the group 2
			function () {
				var args = arguments;
				if (args[0] === 1) {
					return args[1];
				} else if (args[0] % 10 >= 2 && args[0] % 10 <= 4 && (args[0] % 100 < 10 || args[0] % 100 >= 20)) {
					return args[2];
				} else {
					return args[3];
				}
			},
			// 17:  Welsh
			function () {
				var args = arguments;
				if (args[0] === 1) {
					return args[1];
				} else if (args[0] === 2) {
					return args[2];
				} else if (args[0] !== 8 && args[0] !== 11) {
					return args[3];
				} else {
					return args[4];
				}
			},
			// 18:  Javanese
			function () {
				var args = arguments;
				if (args[0] === 0) {
					return args[1];
				} else {
					return args[2];
				}
			},
			// 19:  Cornish
			function () {
				var args = arguments;
				if (args[0] === 1) {
					return args[1];
				} else if (args[0] === 2) {
					return args[2];
				} else if (args[0] === 3) {
					return args[3];
				} else {
					return args[4];
				}
			},
			// 20:  Mandinka
			function () {
				var args = arguments;
				if (args[0] === 0) {
					return args[1];
				} else if (args[0] === 1) {
					return args[2];
				} else {
					return args[3];
				}
			}
		],
		/**
		 * Get specified language
		 *
		 */
		getLanguage: function () {
			var language = i18n.locale.language || i18n['default'];
			return /^(x\-)?[a-z]{2,}(\-\w{2,})?(\-\w{2,})?$/.exec(language) ? language : i18n['default'];
		},

		/**
		 * Translate a string to a specified language, including optionally a number to pluralize translation
		 *
		 * @param {String} message
		 * @param {Number} pluralParam
		 * @return {String}
		 */
		t: function (message, pluralParam) {

			if (typeof message === 'string' && message.length) {

				var
					language = i18n.getLanguage(),
					str,
					pluralForm,
					/**
					 * Modify string using algorithm to detect plural forms.
					 *
					 * @private
					 * @see http://stackoverflow.com/questions/1353408/messageformat-in-javascript-parameters-in-localized-ui-strings
					 * @param {String|String[]} input   - String or array of strings to pick the plural form
					 * @param {Number} number           - Number to determine the proper plural form
					 * @param {Number} form             - Number of language family to apply plural form
					 * @return {String}
					 */
					plural = function (input, number, form) {

						if (typeof input !== 'object' || typeof number !== 'number' || typeof form !== 'number') {
							return input;
						}

						if (typeof input === 'string') {
							return input;
						}

						// Perform plural form or return original text
						return i18n.pluralForms[form].apply(null, [number].concat(input));
					},
					/**
					 *
					 * @param {String} input
					 * @return {String}
					 */
					escapeHTML = function (input) {
						var map = {
							'&': '&amp;',
							'<': '&lt;',
							'>': '&gt;',
							'"': '&quot;'
						};

						return input.replace(/[&<>"]/g, function(c) {
							return map[c];
						});
					}
				;

				// Fetch the localized version of the string
				if (i18n.locale.strings && i18n.locale.strings[language]) {
					str = i18n.locale.strings[language][message];
					if (typeof pluralParam === 'number') {
						pluralForm = i18n.locale.strings[language]['mejs.plural-form'];
						str = plural.apply(null, [str, pluralParam, pluralForm]);
					}
				}

				// Fallback to default language if requested uid is not translated
				if (!str && i18n.locale.strings && i18n.locale.strings[i18n['default']]) {
					str = i18n.locale.strings[i18n['default']][message];
					if (typeof pluralParam === 'number') {
						pluralForm = i18n.locale.strings[i18n['default']]['mejs.plural-form'];
						str = plural.apply(null, [str, pluralParam, pluralForm]);

					}
				}

				// As a last resort, use the requested uid, to mimic original behavior of i18n utils (in which uid was the english text)
				str = str || message;

				// Replace token
				if (typeof pluralParam === 'number') {
					str = str.replace('%1', pluralParam);
				}

				return escapeHTML(str);

			}

			return message;
		}

	};

	// i18n fixes for compatibility with WordPress
	if (typeof mejsL10n !== 'undefined') {
		i18n.locale.language = mejsL10n.language;
	}

	// Register variable
	mejs.i18n = i18n;


}(document, window, mejs));

// i18n fixes for compatibility with WordPress
;(function (mejs, undefined) {

	"use strict";

	if (typeof mejsL10n !== 'undefined') {
		mejs[mejsL10n.lang] = mejsL10n.strings;
	}

}(mejs.i18n.locale.strings));
/*!
 * This is a i18n.locale language object.
 *
 * English; This can serve as a template for other languages to translate
 *
 * @author
 *   TBD
 *   Sascha Greuel (Twitter: @SoftCreatR)
 *
 * @see
 *   me-i18n.js
 *
 * @params
 *  - exports - CommonJS, window ..
 */
(function (exports) {
    "use strict";

    if (exports.en === undefined) {
        exports.en = {
            "mejs.plural-form": 1,

            // me-shim
            "mejs.download-file": "Download File",

            // mep-feature-contextmenu
            "mejs.fullscreen-off": "Turn off Fullscreen",
            "mejs.fullscreen-on": "Go Fullscreen",
            "mejs.download-video": "Download Video",

            // mep-feature-fullscreen
            "mejs.fullscreen": "Fullscreen",

            // mep-feature-jumpforward
            "mejs.time-jump-forward": ["Jump forward 1 second", "Jump forward %1 seconds"],

            // mep-feature-playpause
            "mejs.play": "Play",
            "mejs.pause": "Pause",

            // mep-feature-postroll
            "mejs.close": "Close",

            // mep-feature-progress
            "mejs.time-slider": "Time Slider",
            "mejs.time-help-text": "Use Left/Right Arrow keys to advance one second, Up/Down arrows to advance ten seconds.",

            // mep-feature-skipback
            "mejs.time-skip-back": ["Skip back 1 second", "Skip back %1 seconds"],

            // mep-feature-tracks
            "mejs.captions-subtitles": "Captions/Subtitles",
            "mejs.none": "None",

            // mep-feature-volume
            "mejs.mute-toggle": "Mute Toggle",
            "mejs.volume-help-text": "Use Up/Down Arrow keys to increase or decrease volume.",
            "mejs.unmute": "Unmute",
            "mejs.mute": "Mute",
            "mejs.volume-slider": "Volume Slider",

            // mep-player
            "mejs.video-player": "Video Player",
            "mejs.audio-player": "Audio Player",

            // mep-feature-ads
            "mejs.ad-skip": "Skip ad",
            "mejs.ad-skip-info": ["Skip in 1 second", "Skip in %1 seconds"],

            // mep-feature-sourcechooser
            "mejs.source-chooser": "Source Chooser"
        };
    }
}(mejs.i18n.locale.strings));
