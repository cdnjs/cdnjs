/*!
* Media Element
* HTML5 <video> and <audio> Shim
* http://mediaelementjs.com/
*
* Creates a JavaScript object that mimics HTML5 media object
* for browsers that don't understand HTML5 or can't play the provided codec
* Can also play MP4 (H.264), Ogg, WebM, FLV, WMV, WMA, ACC, and MP3
*
* Copyright 2010, John Dyer
* Dual licensed under the MIT or GPL Version 2 licenses.
*
* Version: 1.1.2
*/

// Namespace
var html5 = html5 || {};

// player number (for missing, same id attr)
html5.meIndex = 0;

// media types accepted by plugins
html5.plugins = {
	silverlight: [
		{version: [3,0], types: ['video/mp4','video/m4v','video/mov','video/wmv','audio/wma','audio/mp4','audio/m4a','audio/mp3']}
	],
	flash: [
		{version: [9,0,124], types: ['video/mp4','video/m4v','video/mov','video/flv','audio/flv','audio/mp3','audio/m4a','audio/mp3']}		
		//,{version: [11,0], types: ['video/webm'} // for future reference
	]
};

// Core detector, plugins are added below
html5.PluginDetector = {

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
			d,
			i,
			ax;
		
		// Firefox, Webkit, Opera
		if (typeof(this.nav.plugins) != 'undefined' && typeof this.nav.plugins[pluginName] == 'object') {
			d = this.nav.plugins[pluginName].description;
			if (d && !(typeof this.nav.mimeTypes != 'undefined' && this.nav.mimeTypes[mimeType] && !this.nav.mimeTypes[mimeType].enabledPlugin)) {
				version = d.replace(pluginName, '').replace(/^\s+/,'').replace(/\sr/gi,'.').split('.');
				for (i=0; i<version.length; i++) {
					version[i] = parseInt(version[i], 10);
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
html5.PluginDetector.addPlugin('flash','Shockwave Flash','application/x-shockwave-flash','ShockwaveFlash.ShockwaveFlash', function(ax) {
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
html5.PluginDetector.addPlugin('silverlight','Silverlight Plug-In','application/x-silverlight-2','AgControl.AgControl', function (ax) {		
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
		d = ax.GetVersions().split(',')[0].split('=')[1];
	if (d) {
		version = [parseInt(d[0], 10), parseInt(d[1], 10), parseInt(d[2], 10)];
	}
	return version;		
}
*/
		
// special case for Android which sadly doesn't implement the canPlayType function (always returns '')
if (html5.PluginDetector.ua.match(/Android 2\.[12]/) !== null) {
	HTMLMediaElement.canPlayType = function(type) {
		return (type.match(/video\/(mp4|m4v)/gi) !== null) ? 'probably' : '';
	};
}

// necessary detection (fixes for <IE9)
html5.MediaFeatures = {
	init: function() {
		var
			nav = html5.PluginDetector.nav,
			ua = html5.PluginDetector.ua,
			i,
			v,
			html5Elements = ['source','track','audio','video'];
		
		// detect browsers
		this.isiPad = (ua.match(/iPad/i) !== null);
		this.isiPhone = (ua.match(/iPhone/i) !== null);
		this.isAndroid = (ua.match(/Android/i) !== null);
		this.isIE = (nav.appName.indexOf("Microsoft") != -1);
		
		// create HTML5 media elements for IE before 9, get a <video> element for fullscreen detection
		for (i=0; i<html5Elements.length; i++) {
			v = document.createElement(html5Elements[i]);
		}
		
		// detect native JavaScript fullscreen (Safari only, Chrome fails)
		this.hasNativeFullScreen = (typeof v.webkitEnterFullScreen !== 'undefined');
		if (ua.match(/Chrome/gi)) {
			this.hasNativeFullScreen = false;
		}
	}
};
html5.MediaFeatures.init();

/*
Utility methods
*/
html5.Utility = {	
	escapeHTML: function(s) {
		return s.split('&').join('&amp;').split('<').join('&lt;').split('"').join('&quot;');
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
			path = '',
			name = '',
			script,
			scripts = document.getElementsByTagName('script');

		for (; i < scripts.length; i++) {
			script = scripts[i].src;
			for (j = 0; j < scriptNames.length; j++) {
				name = scriptNames[j];				
				if (script.indexOf(name) > -1) {					
					path = script.substring(0, script.indexOf(name));
					break;
				}
			}
			if (path !== '') {
				break;
			}
		}
		return path;
	},	
	secondsToTimeCode: function(seconds) {
		seconds = Math.round(seconds);		
		var minutes = Math.floor(seconds / 60);		
		minutes = (minutes >= 10) ? minutes : "0" + minutes;
		seconds = Math.floor(seconds % 60);
		seconds = (seconds >= 10) ? seconds : "0" + seconds;
		return minutes + ":" + seconds;
	}
};

/*
extension methods to <video> or <audio> object to bring it into parity with PluginMediaElement (see below)
*/
html5.HtmlMediaElement = {
	pluginType: 'native',

	setCurrentTime: function (time) {
		this.currentTime = time;
	},
	
	setMuted: function (muted) {
		this.muted = muted;
	
	},
	
	setVolume: function (volume) {
		this.volume = volume;
	},

	// This can be a url string
	// or an array [{src:'file.mp4',type:'video/mp4'},{src:'file.webm',type:'video/webm'}]
	setSrc: function (url) {
		if (typeof url == 'string') {
			this.src = url;
		} else {
			var i, media;
			
			for (i=0; i<url.length; i++) {
				media = url[i];
				if (this.canPlayType(media.type)) {
					this.src = media.src;
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
html5.PluginMediaElement = function (pluginid, pluginType) {
	this.id = pluginid;
	this.pluginType = pluginType;
	this.events = {};
};

// JavaScript values and ExternalInterface methods that match HTML5 video properties methods
// http://www.adobe.com/livedocs/flash/9.0/ActionScriptLangRefV3/fl/video/FLVPlayback.html
// http://www.whatwg.org/specs/web-apps/current-work/multipage/video.html	
html5.PluginMediaElement.prototype = {

	// special
	pluginElement: null,
	pluginType: '',

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

	// HTML5 get/set properties, but only set (updated by event handlers)
	muted: false,
	volume: 1,
	currentTime: 0,

	// HTML5 methods
	play: function () {
		this.pluginApi.playMedia();
		this.paused = false;
	},
	load: function () {
		this.pluginApi.loadMedia();
		this.paused = false;
	},
	pause: function () {
		this.pluginApi.pauseMedia();
		this.paused = true;
	},	
	canPlayType: function(type) {
		var i,
			j,
			pluginInfo,
			pluginVersions = html5.plugins[this.pluginType];	
			
		for (i=0; i<pluginVersions.length; i++) {
			pluginInfo = pluginVersions[i];
			
			// test if user has the correct plugin version
			if (html5.PluginDetector.hasPluginVersion(this.pluginType, pluginInfo.version)) {
			
				// test for plugin playback types
				for (j=0; j<pluginInfo.types.length; j++) {
					// find plugin that can play the type
					if (type == pluginInfo.types[j]) {
						return true;
					}
				}
			}
		}	
		
		return false;
	},

	// custom methods since not all JavaScript implementations support get/set
	
	// This can be a url string
	// or an array [{src:'file.mp4',type:'video/mp4'},{src:'file.webm',type:'video/webm'}]	
	setSrc: function (url) {
		if (typeof url == 'string') {
			this.pluginApi.setSrc(html5.Utility.absolutizeUrl(url));
		} else {
			var i, media;
			
			for (i=0; i<url.length; i++) {
				media = url[i];
				if (this.canPlayType(media.type)) {
					this.pluginApi.setSrc(html5.Utility.absolutizeUrl(media.src));
				}
			}			
		}	
		
	},
	setCurrentTime: function (time) {
		this.pluginApi.setCurrentTime(time);
		this.currentTime = time;
	},
	setVolume: function (volume) {
		this.pluginApi.setVolume(volume);
		this.volume = volume;
	},
	setMuted: function (muted) {
		this.pluginApi.setMuted(muted);
		this.muted = muted;
	},

	// additional non-HTML5 methods
	setVideoSize: function (width, height) {					
		if ( this.pluginElement.style) {
			this.pluginElement.style.width = width + 'px';
			this.pluginElement.style.height = height + 'px';						
		}

		this.pluginApi.setVideoSize(width, height);
	},
	
	setFullscreen: function (fullscreen) {
		this.pluginApi.setFullscreen(fullscreen);
	},

	// start: fake events
	addEventListener: function (eventName, callback, bubble) {
		this.events[eventName] = this.events[eventName] || [];
		this.events[eventName].push(callback);
	},		
	dispatchEvent: function (eventName) {
		var i,
			args,
			callbacks = this.events[eventName];
			
		if (callbacks) {
			args = Array.prototype.slice.call(arguments, 1);
			for (i = 0; i < callbacks.length; i++) {
				callbacks[i].apply(null, args);
			}
		}
	}
	// end: fake events
};

// Handles calls from Flash/Silverlight and reports them as native <video/audio> events and properties
html5.MediaPluginBridge = {

	pluginMediaElements:{},
	htmlMediaElements:{},

	registerPluginElement: function (id, pluginMediaElement, htmlMediaElement) {
		this.pluginMediaElements[id] = pluginMediaElement;
		this.htmlMediaElements[id] = htmlMediaElement;
	},

	// when Flash/Silverlight is ready, it calls out to this method
	initPlugin: function (id) {
		
		var pluginMediaElement = this.pluginMediaElements[id],
			htmlMediaElement = this.htmlMediaElements[id];
	
		// find the javascript bridge
		switch (pluginMediaElement.pluginType) {
			case "flash":					
				pluginMediaElement.pluginElement = pluginMediaElement.pluginApi = document.getElementById(id);
				break;
			case "silverlight":
				pluginMediaElement.pluginElement = document.getElementById(pluginMediaElement.id);
				pluginMediaElement.pluginApi = pluginMediaElement.pluginElement.Content.SilverlightApp;
				break;
		}

		if (pluginMediaElement.success) {
			pluginMediaElement.success(pluginMediaElement, htmlMediaElement);
		}
	},

	// receives events from Flash/Silverlight and sends them out as HTML5 media events
	// http://www.whatwg.org/specs/web-apps/current-work/multipage/video.html
	fireEvent: function (id, eventName, values) {

		var
			e,
			i,
			bufferedTime,
			pluginMediaElement = this.pluginMediaElements[id];
		
		pluginMediaElement.ended = false;
		pluginMediaElement.paused = false;

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

		pluginMediaElement.dispatchEvent(e.type, e);
	}
};

/*
Default options
*/
html5.MediaElementDefaults = {
	// shows debug errors on screen
	enablePluginDebug: false,
	// remove or reorder to change plugin priority
	plugins: ['silverlight', 'flash'],
	// specify to force MediaElement into a mode
	type: '',
	// path to Flash and Silverlight plugins
	pluginPath: html5.Utility.getScriptPath(['mediaelement.js','mediaelement.min.js','mediaelement-and-player.js','mediaelement-and-player.min.js']),
	// name of flash file
	flashName: 'flashmediaelement.swf',
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
	// rate in milliseconds for Flash and Silverlight to fire the timeupdate event
	// larger number is less accurate, but less strain on plugin->JavaScript bridge
	timerRate: 250,
	success: function () { },
	error: function () { }
};

/*
Determines if a browser supports the <video> or <audio> element
and returns either the native element or a Flash/Silverlight version that
mimics HTML5 MediaElement
*/
html5.MediaElement = function (el, o) {	
	html5.HtmlMediaElementShim.create(el,o);
};

html5.HtmlMediaElementShim = {		

	create: function(el, o) {			
		var
			options = html5.MediaElementDefaults,
			htmlMediaElement = (typeof(el) == 'string') ? document.getElementById(el) : el,					
			isVideo = (htmlMediaElement.tagName.toLowerCase() == 'video'),			
			supportsMediaTag = (typeof(htmlMediaElement.canPlayType) != 'undefined'),
			playback = {method:'', url:''},
			poster = htmlMediaElement.getAttribute('poster'),
			autoplay =  htmlMediaElement.getAttribute('autoplay'),
			prop;

		// extend options
		for (prop in o) {
			options[prop] = o[prop];
		}
		
		// check for real poster
		poster = (poster == 'undefined' || poster === null) ? '' : poster;
		
		// test for HTML5 and plugin capabilities
		playback = this.determinePlayback(htmlMediaElement, options, isVideo, supportsMediaTag);

		if (playback.method == 'native') {
			// add methods to native HTMLMediaElement
			this.updateNative( htmlMediaElement, options);				
		} else if (playback.method !== '') {
			// create plugin to mimic HTMLMediaElement
			this.createPlugin( htmlMediaElement, options, isVideo, playback.method, (playback.url !== null) ? html5.Utility.absolutizeUrl(playback.url).replace('&','%26') : '', poster, autoplay);
		} else {
			// boo, no HTML5, no Flash, no Silverlight.
			this.createErrorMessage( htmlMediaElement, options, (playback.url !== null) ? html5.Utility.absolutizeUrl(playback.url) : '', poster );
		}			
	},
	
	determinePlayback: function(htmlMediaElement, options, isVideo, supportsMediaTag) {
		
		var
			mediaFiles = [],
			i,
			j,
			k,	
			l,			
			n,
			url,
			type,
			result = { method: '', url: ''},
			src = htmlMediaElement.getAttribute('src'),
			pluginName,
			pluginVersions,
			pluginInfo;
		
		// STEP 1: Get Files from <video src> or <source src>
		
		// supplied type overrides all HTML
		if (typeof (options.type) != 'undefined' && options.type !== '') {								
			mediaFiles.push({type:options.type, url:null});

		// test for src attribute first
		} else if (src  != 'undefined' && src  !== null) {
			url = htmlMediaElement.getAttribute('src');
			type = this.checkType(url, htmlMediaElement.getAttribute('type'), isVideo);
			mediaFiles.push({type:type, url:url});

		// then test for <source> elements
		} else {
			// test <source> types to see if they are usable
			for (i = 0; i < htmlMediaElement.childNodes.length; i++) {
				n = htmlMediaElement.childNodes[i];
				if (n.nodeType == 1 && n.tagName.toLowerCase() == 'source') {
					url = n.getAttribute('src');
					type = this.checkType(url, n.getAttribute('type'), isVideo);
					mediaFiles.push({type:type, url:url});
				}							
			}			
		}
		
		// STEP 2: Test for playback method
	
		// test for native playback first
		if (supportsMediaTag) {
			for (i=0; i<mediaFiles.length; i++) {
				if (htmlMediaElement.canPlayType(mediaFiles[i].type).replace(/no/, '') !== '') {
					result.method = 'native';
					result.url = mediaFiles[i].url;					
					return result;
				}
			}
		}

		
		// if native playback didn't work, then test plugins		
		for (i=0; i<mediaFiles.length; i++) {
			type = mediaFiles[i].type;
			
			// test all plugins in order of preference [silverlight, flash]
			for (j=0; j<options.plugins.length; j++) {
				
				pluginName = options.plugins[j];
				
				// test version of plugin (for future features)
				pluginVersions = html5.plugins[pluginName];				
				for (k=0; k<pluginVersions.length; k++) {
					pluginInfo = pluginVersions[k];
					
					// test if user has the correct plugin version
					if (html5.PluginDetector.hasPluginVersion(pluginName, pluginInfo.version)) {
					
						// test for plugin playback types
						for (l=0; l<pluginInfo.types.length; l++) {
							// find plugin that can play the type
							if (type == pluginInfo.types[l]) {
								result.method = pluginName;
								result.url = mediaFiles[i].url;					
								return result;
							}
						}
					}
				}
			}
		}
		
		// what if there's nothing to play? just grab the first available
		if (result.method === '') {
			result.url = mediaFiles[0].url;
		}
		
		return result;			
		
	},
	
	checkType: function(url, type, isVideo) {
		var ext;
		
		// if no type is supplied, fake it with the extension
		if (url && !type) {
			ext = url.substring(url.lastIndexOf('.') + 1);
			return ((isVideo) ? 'video' : 'audio') + '/' + ext;
		} else {
			return type;
		}
	},
	
	createErrorMessage: function(htmlMediaElement, options, downloadUrl, poster) {
		var errorContainer = document.createElement('div');
		errorContainer.className = 'me-cannotplay';
		
		try {
			errorContainer.style.width = htmlMediaElement.width + 'px';
			errorContainer.style.height = htmlMediaElement.height + 'px';
		} catch (e) {}
					
		errorContainer.innerHTML = (poster !== '') ?
			'<a href="' + downloadUrl + '"><img src="' + poster + '" /></a>' :
			'<a href="' + downloadUrl + '">Download File</a>';
		
		htmlMediaElement.parentNode.insertBefore(errorContainer, htmlMediaElement);
		htmlMediaElement.style.display = 'none';

		options.error(htmlMediaElement);		
	},
	
	createPlugin:function(htmlMediaElement, options, isVideo, pluginType, mediaUrl, poster, autoplay) {
	
		var width = 1,
			height = 1,
			pluginid = 'me_' + pluginType + '_' + (html5.meIndex++),
			pluginMediaElement = new html5.PluginMediaElement(pluginid, pluginType),
			container = document.createElement('div'),
			initVars;

		if (isVideo) {
			width = (options.videoWidth > 0) ? options.videoWidth : (htmlMediaElement.getAttribute('width') !== null) ? htmlMediaElement.getAttribute('width') : options.defaultVideoWidth;
			height = (options.videoHeight > 0) ? options.videoHeight : (htmlMediaElement.getAttribute('height') !== null) ? htmlMediaElement.getAttribute('height') : options.defaultVideoHeight;				
		} else {
			if (options.enablePluginDebug) {
				width = 320;
				height = 240;					
			}
		}

		// register plugin
		pluginMediaElement.success = options.success;
		html5.MediaPluginBridge.registerPluginElement(pluginid, pluginMediaElement, htmlMediaElement);

		// add container (must be added to DOM before inserting HTML for IE)
		container.className = 'me-plugin';			
		htmlMediaElement.parentNode.insertBefore(container, htmlMediaElement);

		// flash/silverlight vars
		initVars = [
			'id=' + pluginid,
			'poster=' + poster,
			'isvideo=' + isVideo.toString(),
			'autoplay=' + autoplay,
			'width=' + width,
			'timerrate=' + options.timerRate,
			'height=' + height];

		if (mediaUrl !== null) {
			initVars.push('file=' + mediaUrl);
		}
		if (options.enablePluginDebug) {
			initVars.push('debug=true');
		}
		
		switch (pluginType) {
			case 'silverlight':
				container.innerHTML =
'<object data="data:application/x-silverlight-2," type="application/x-silverlight-2" id="' + pluginid + '" name="' + pluginid + '" width="' + width + '" height="' + height + '">' +
'<param name="initParams" value="' + initVars.join(',') + '" />' +
'<param name="windowless" value="true" />' +
'<param name="background" value="black" />' +
'<param name="minRuntimeVersion" value="3.0.0.0" />' +
'<param name="autoUpgrade" value="true" />' +
'<param name="source" value="' + options.pluginPath + options.silverlightName + '" />' +
'</object>';
					break;

			case 'flash':

				if (html5.MediaFeatures.isIE) {
					container.outerHTML =
'<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab" ' +
'id="' + pluginid + '" width="' + width + '" height="' + height + '">' +
'<param name="movie" value="' + options.pluginPath + options.flashName + '?x=' + (new Date()) + '" />' +
'<param name="flashvars" value="' + initVars.join('&') + '" />' +
'<param name="quality" value="high" />' +
'<param name="bgcolor" value="#000000" />' +
'<param name="wmode" value="transparent" />' +
'<param name="allowScriptAccess" value="sameDomain" />' +
'<param name="allowFullScreen" value="true" />' +
'</object>';

				} else {

					container.innerHTML =
'<embed id="' + pluginid + '" name="' + pluginid + '" ' +
'play="true" ' +
'loop="false" ' +
'quality="high" ' +
'bgcolor="#000000" ' +
'wmode="transparent" ' +
'allowScriptAccess="sameDomain" ' +
'allowFullScreen="true" ' +
'type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" ' +
'src="' + options.pluginPath + options.flashName + '?' + initVars.join('&') + '" ' +
'width="' + width + '" ' +
'height="' + height + '"></embed>';
				}
				break;
		}
		// hide original element
		htmlMediaElement.style.display = 'none';
		
		// FYI: options.success will be fired by the MediaPluginBridge
	},
	
	updateNative: function(htmlMediaElement, options) {

		// add methods to video object to bring it into parity with Flash Object
		for (var m in html5.HtmlMediaElement) {
			htmlMediaElement[m] = html5.HtmlMediaElement[m];
		}
		
		// fire success code
		options.success(htmlMediaElement, htmlMediaElement);		
	}
};


window.html5 = html5;
window.MediaElement = html5.MediaElement;

﻿/*!
 * Media Element jQuery plugin
 * http://mediaelementjs.com/
 *
 * Creates a controller bar for HTML5 <video> add <audio> tags
 * using jQuery and MediaElement.js
 *
 * Copyright 2010, John Dyer
 * Dual licensed under the MIT or GPL Version 2 licenses.
 *
 * Version: 1.1.2
 */

// TODO:
// - make volume be event driven, remember setting (cookie, startup)
// - add skins

(function ($) {

	// default player values
	html5.MepDefaults = {
		// default if the <video width> is not specified
		defaultVideoWidth: 480,
		// default if the <video height> is not specified
		defaultVideoHeight: 270,
		// if set, overrides <video width>
		videoWidth: -1,
		// if set, overrides <video height>
		videoHeight: -1,
		// width of audio player
		audioWidth: 300,
		// height of audio player
		audioHeight: 30,		
		// display messages
		messages: {
			start: 'Click to Start',
			loading: 'Loading',				
			paused: 'Paused',
			error: 'Error',
			ended: 'Ended'
		},
		// useful for <audio> player loops
		loop: false,
		// this will automatically turn on a <track>
		startLanguage: '',
		// a list of languages to auto-translate via Google
		translations: [],
		// a dropdownlist of automatic translations
		translationSelector: false,		
		// turn each button on or off
		controls: {
			playpause: true,
			timerail: true,
			duration: true,
			volume: true,
			captions: true,
			fullscreen: true
		},
		// customize this to change the order of the control elements
		controlsTemplate:
			'<div class="mep-playpause-button mep-play">' +
				'<span></span>' +
			'</div>'+
			'<div class="mep-time-rail">'+
				'<span class="mep-time-total">'+
					'<span class="mep-time-loaded"></span>'+
					'<span class="mep-time-current"></span>'+
					'<span class="mep-time-handle"></span>'+
				'</span>'+
			'</div>'+
			'<div class="mep-time">'+
				'<span class="mep-currenttime"></span>'+
				'<span>&nbsp;|&nbsp;</span>'+
				'<span class="mep-duration"></span>'+
			'</div>'+
			'<div class="mep-captions-button">'+
				'<span></span>'+
				'<div class="mep-captions-selector">'+
					'<ul>'+
					'</ul>'+
				'</div>'+							
			'</div>'+						
			'<div class="mep-volume-button mep-mute">'+
				'<span></span>'+
				'<div class="mep-volume-slider">'+
					'<div class="mep-volume-rail">'+
						'<div class="mep-volume-handle"></div>'+
					'</div>'+
				'</div>'+
			'</div>'+
			'<div class="mep-fullscreen-button">' +
				'<span></span>' +
			'</div>'
	};

	html5.mepIndex = 0;

	// wraps a MediaElement object in player controls
	html5.MediaElementPlayer = function($media, o) {

		var	
			t = this,
			mf = html5.MediaFeatures;
	
		t.$media = $($media);
		t.options = $.extend(true,{},html5.MepDefaults,o);
		t.isVideo = (t.$media[0].tagName.toLowerCase() == 'video');
				
		if (mf.isiPad || mf.isiPhone) {
			// add controls and stop
			t.$media.attr('controls', 'controls');
			
			// fix Apple bug
			t.$media.removeAttr('poster');

			// override Apple's autoplay override for iPads
			if (mf.isiPad && t.$media[0].getAttribute('autoplay') !== null) {
				t.$media[0].load();
				t.$media[0].play();
			}

			// don't do the rest
			return;
		} else if (mf.isAndroid && t.isVideo) {

			// Android is better off with native controls (like iOS)
			t.$media.attr('controls', 'controls');
			return;
			
		} else {

			// remove native controls and use MEP
			t.$media.removeAttr('controls');
		}
		
		t.createPlayer();
	};
	
	html5.MediaElementPlayer.prototype = {
		createPlayer: function() {

			var
				t = this,
				meOptions = $.extend(true, {}, t.options, {
					success: function(mediaElement, domNode) { t.setupPlayer(mediaElement, domNode); },
					error: function(e) { t.handleError(e);}
				});				
		
			// unique ID
			t.id = 'mep_' + html5.mepIndex++;			
			
			// add HTML
			t.$media.before(
			$(
				'<div id="' + t.id + '" class="mep-container">'+
					'<div class="mep-mediaelement">'+
					'</div>'+
					'<div class="mep-captions-layer">'+
						'<span class="mep-captions-text"></span>'+
					'</div>'+
					'<div class="mep-poster">'+
						'<img />'+
					'</div>'+
					'<div class="mep-overlay">'+
						'<div class="mep-overlay-button"></div>'+
					'</div>'+
					'<div class="mep-controls">'+
						t.options.controlsTemplate +
					'</div>'+
					'<div class="mep-clear"></div>'+
				'</div>')		
			);
			t.container = $('#' + this.id);
			t.container.find('.mep-captions-selector ul').append($(
				'<li>'+
					'<input type="radio" name="' + this.id + '_captions" id="' + this.id + '_captions_none" value="none" checked="checked" />' +
					'<label for="' + this.id + '_captions_none">None</label>'+										
				'</li>'));
			
			
			// move the <video/video> tag into the right spot
			t.container
				.addClass(t.$media[0].className)
				.find('.mep-mediaelement')
					.append(t.$media);
			
			// determine the size							
			if (t.isVideo) {			
				// priority = videoWidth (forced), width attribute, defaultVideoWidth		
				t.width = (t.options.videoWidth > 0) ? t.options.videoWidth : (t.$media[0].getAttribute('width') !== null) ? t.$media.attr('width') : t.options.defaultVideoWidth;
				t.height = (t.options.videoHeight > 0) ? t.options.videoHeight : (t.$media[0].getAttribute('height') !== null) ? t.$media.attr('height') : t.options.defaultVideoHeight;				
			} else {
				t.width = t.options.audioWidth;
				t.height = t.options.audioHeight;
			}
			
			// setup main layers and objects
			t.buildPoster();
			t.buildOverlay();
			t.buildCaptionsDisplay();
			t.setPlayerSize(t.width, t.height); // now that the container, overlay, and poster are ready specify their exact size
			t.buildControls();			
			
			// create MediaElementShim	
			meOptions.pluginWidth = t.height;
			meOptions.pluginHeight = t.width;			
			html5.MediaElement(t.$media[0], meOptions);			
			
		},
		
		// Sets up all controls and events
		setupPlayer: function(mediaElement, domNode) {		
			
			/*			
			var testEvents = 'play playing played paused pausing'.split(' ');
			for (var i=0; i<testEvents.length;i++) {
				mediaElement.addEventListener(testEvents[i], function(e) {				
					console.log(e.type, e.target.paused);
				}, true);
			}			
			*/
			
			var t = this;			
			t.mediaElement = mediaElement;
			t.domNode = domNode;			

			// build controls
			t.buildControlBar();
			t.buildPlayPause();
			t.buildTimeRail();	
			t.buildVolumeControls();
			t.buildCaptionsControls();
			t.buildFullscreen();


			// add events the MediaElement
			t.mediaElement.addEventListener('click', function (e) {
				if (t.mediaElement.paused) {
					t.mediaElement.play();
				}
			}, true);

			t.mediaElement.addEventListener('playing', function (e) {
				t.poster.hide();
				t.playpause.removeClass('mep-play').addClass('mep-pause');
				t.hideMessage();
			}, true);

			t.mediaElement.addEventListener('pause', function (e) {	
				t.playpause.removeClass('mep-pause').addClass('mep-play');
				t.showMessage(t.options.messages.paused);
			}, true);

			t.mediaElement.addEventListener('ended', function (e) {
				t.mediaElement.setCurrentTime(0);
				t.mediaElement.pause();
				t.setTimePosition();
					
				if (t.options.loop) {					
					t.mediaElement.play();
				} else {
					t.poster.show();
					t.playpause.removeClass('mep-pause').addClass('mep-play');
					t.showMessage(t.options.messages.ended);
				}
			}, true);
			
			t.mediaElement.addEventListener('loadedmetadata', function(e) {
				// if the <video height> was not set and the options.videoHeight was not set
				// then resize to the real dimensions
				if (t.isVideo && t.options.videoHeight <= 0 && t.$media[0].getAttribute('height') === null && !isNaN(e.target.videoHeight)) {
					t.setPlayerSize(e.target.videoWidth, e.target.videoHeight);
					t.setRailSize();
					t.mediaElement.setVideoSize(e.target.videoWidth, e.target.videoHeight);			
				}				
			}, true);

			// webkit has trouble doing this without a delay
			setTimeout(function () {
				t.setRailSize();
			}, 50);

			if (t.options.success)
				t.options.success(t.mediaElement, t.domNode);
				
			this.findTracks();
		},
		
		buildCaptionsDisplay: function() {
			var t = this,
				options = '',
				i;
			t.captionsDisplay = t.container.find('.mep-captions-layer').hide();
			t.captionsText = t.container.find('.mep-captions-text');
			
			if (t.options.translationSelector && html5.SrtParser.canTranslate()) {				
				for (i in html5.language.codes) {
					options += '<option value="' + i + '">' + html5.language.codes[i] + '</option>';
				}
				t.container.find('.mep-captions-selector ul').before($(					
					'<select class="mep-captions-translations">' +
						'<option value="">--Add Translation--</option>' +
						options +
					'</select>'
				));
				// add clicks
				t.container.find('.mep-captions-translations').change(function() {
					var
						option = $(this);
						lang = option.val();
					// add this language to the tracks list
					if (lang != '') {
						t.tracks.push({
							srclang: lang,
							src: null,
							entries: [],
							isLoaded: false,
							isTranslation: true
						});	
						
						if (!t.isLoadingTrack) {
							t.trackToLoad--;
							t.addTrackButton(lang,true);
							t.options.startLanguage = lang;
							t.loadNextTrack();							
						}
					}
				});
			}			
		},		
		
		buildCaptionsControls: function() {
			var
				t = this,
				lang,
				i;
				
			// handle clicks to the language radio buttons
			t.captions.delegate('input[type=radio]','click',function() {				
				lang = this.value;	
				
				if (lang == 'none') {
					t.selectedTrack = null;
				} else {				
					for (i=0; i<t.tracks.length; i++) {
						if (t.tracks[i].srclang == lang) {
							t.selectedTrack = t.tracks[i];
							t.captionsDisplay.attr('lang', t.selectedTrack.srclang);
							t.displayCaptions();
							break;
						}
					}	
				}
			});
		},
		
		// adapted from Playr
		findTracks: function() {	
			var t = this,
				i,
				tracktags = t.$media.find('track[kind=subtitles]');
			
			// create storage for tracks
			t.tracks = [];
			t.trackToLoad = -1;
			t.selectedTrack = null;
			t.isLoadingTrack = false;
			tracktags.each(function() {				
				t.tracks.push({
					srclang: $(this).attr('srclang').toLowerCase(),
					src: $(this).attr('src'),
					entries: [],
					isLoaded: false,
					isTranslation: false
				});				
			});
			
			// add user-defined translations
			if (t.tracks.length > 0 && t.options.translations.length > 0 && html5.SrtParser.canTranslate()) {
				for (i=0; i<t.options.translations.length; i++) {
					t.tracks.push({
						srclang: t.options.translations[i].toLowerCase(),
						src: null,
						entries: [],
						isLoaded: false,
						isTranslation: true
					});
				}				
			}
			
			// add to list
			for (i=0; i<t.tracks.length; i++) {
				t.addTrackButton(t.tracks[i].srclang, t.tracks[i].isTranslation);	
			}
			
			// begin loading, or remove button
			if (t.tracks.length > 0) {
				t.loadNextTrack();
			} else {
				t.captions.remove();
				t.setRailSize();			
			}
		},
		
		loadNextTrack: function() {
			var t = this;
			
			t.trackToLoad++;
			if (t.trackToLoad < t.tracks.length) {
				t.isLoadingTrack = true;
				t.loadSubtitles(t.trackToLoad);
			} else {
				// add done?
				t.isLoadingTrack = false;
			}
		},

		loadSubtitles: function(index){
			var
				t = this,
				track = t.tracks[index];
				
			if (track.isTranslation) {
			
				// translate the first track
				html5.SrtParser.translateSrt(t.tracks[0].entries, t.tracks[0].srclang, track.srclang, function(newOne) {								
					
					// store the new translation
					track.entries = newOne;
					track.isLoaded = true;
					
					// create button
					//t.addTrackButton(track.srclang);					
					t.enableTrackButton(track.srclang);
					
					t.loadNextTrack();
				});
				
			} else {
				$.ajax({
					url: track.src,
					success: function(d) {
						
						// parse the loaded file
						track.entries = html5.SrtParser.parse(d);						
						track.isLoaded = true;
						
						// create button
						//t.addTrackButton(track.srclang);
						t.enableTrackButton(track.srclang);					
						
						t.loadNextTrack();
					},
					error: function() {
						t.loadNextTrack();				
					}
				});
			}
		},
		
		enableTrackButton: function(lang) {
			var t = this;
			
			t.captions
				.find('input[value=' + lang + ']')
					.attr('disabled','')
				.siblings('label')
					.html( html5.language.codes[lang] || lang );

			// auto select
			if (t.options.startLanguage == lang) {
				$('#' + t.id + '_captions_' + lang).click();
			}					
					
			t.adjustLanguageBox();
		},
		
		addTrackButton: function(lang, isTranslation) {
			var t = this,
				l = html5.language.codes[lang] || lang;
			
			t.captions.find('ul').append(
				$('<li>'+
					'<input type="radio" name="' + t.id + '_captions" id="' + t.id + '_captions_' + lang + '" value="' + lang + '" disabled="disabled" />' +
					'<label for="' + t.id + '_captions_' + lang + '">' + l + ((isTranslation) ? ' (translating)' : ' (loading)') + '</label>'+										
				'</li>')
			);
			
			t.adjustLanguageBox();
			
			// remove this from the dropdownlist (if it exists)
			t.container.find('.mep-captions-translations option[value=' + lang + ']').remove();
		},	

		adjustLanguageBox:function() {
			var t = this;
			// adjust the size of the outer box
			t.captions.find('.mep-captions-selector').height(
				t.captions.find('.mep-captions-selector ul').outerHeight(true) +
				t.captions.find('.mep-captions-translations').outerHeight(true)
			);		
		},
		
		displayCaptions: function() {
			
			if (typeof this.tracks == 'undefined')
				return;
		
			var
				t = this,
				i,
				track = t.selectedTrack;
			
			if (track != null && track.isLoaded) {
				for (i=0; i<track.entries.times.length; i++) {
					if (t.mediaElement.currentTime >= track.entries.times[i].start && t.mediaElement.currentTime <= track.entries.times[i].stop){						
						t.captionsText.html(track.entries.text[i]);
						t.captionsDisplay.show();
						return; // exit out if one is visible;
					}
				}
				t.captionsDisplay.hide();
			} else {
				t.captionsDisplay.hide();
			}
		},
		
		buildPoster: function() {
			var t = this;
			
			// POSTER
			t.poster = t.container.find('.mep-poster');
			t.posterImg = t.poster.find('img');
			t.posterUrl = t.$media.attr('poster');
			t.posterUrl = (t.posterUrl === null || t.posterUrl == undefined) ? '' : t.posterUrl;
			
			if (t.posterUrl !== '') {			
				t.posterImg.attr('src',t.posterUrl);				
			} else {
				t.poster.hide();
			}		
		},
		
		buildOverlay: function() {
			var t = this;
			
			// OVERLAY
			t.overlay = t.container.find('.mep-overlay');
			t.overlayMessage = t.container.find('.mep-overlay-message');
			if (t.$media[0].getAttribute('autoplay') !== null) {
				t.showMessage(t.options.messages.loading);
			} else {
				t.showMessage(t.options.messages.start);
			}
			if (!t.isVideo) {
				t.overlay.hide();
			}
			
			t.overlay.bind('click', function (e) {
				if (t.mediaElement.paused) {
					t.mediaElement.play();
				}
			}, true);		
		},
		
		showMessage: function (text) {
			if (this.isVideo) {
				this.overlayMessage.html(text);
				//overlay.show();
				this.overlay.css('visibility','visible');
			}
		},
		
		hideMessage: function () {
			//overlay.hide();
			this.overlay.css('visibility','hidden');
		},			
		
		buildControls: function() {
			
			var t = this;
			
			// CONTROLS BAR
			t.controls = t.container.find('.mep-controls')
			t.isControlsVisible = true;

			// CONTROL BUTTONS and BARS
			t.playpause = t.controls.find('.mep-playpause-button');
			t.fullscreen = t.controls.find('.mep-fullscreen-button');
			if (!t.isVideo)
				t.fullscreen.remove();
				
			t.time = t.controls.find('.mep-time');
			t.currentTime = t.controls.find('.mep-currenttime').html('00:00');
			t.duration = t.controls.find('.mep-duration').html('00:00');

			t.captions = t.controls.find('.mep-captions-button');			
			
			t.mute = t.controls.find('.mep-volume-button');
			t.volumeSlider = t.controls.find('.mep-volume-slider');
			t.volumeRail = t.controls.find('.mep-volume-rail');
			t.volumeHandle = t.controls.find('.mep-volume-handle');

			t.timeRail = t.controls.find('.mep-time-rail');
			t.timeCurrent = t.timeRail.find('.mep-time-current').width(0);
			t.timeLoaded = t.timeRail.find('.mep-time-loaded').width(0);
			t.timeTotal = t.timeRail.find('.mep-time-total');
			t.timeHandle = t.controls.find('.mep-time-handle');

			// setup controls
			t.controls.show();
			t.setRailSize();

			// hide unwanted controls	

			if (!t.options.controls.playpause) {
				t.playpause.remove();
			}
			
			if (!t.options.controls.timerail) {
				t.timeRail.remove();
			}	

			if (!t.options.controls.duration) {
				t.time.remove();
			}	
			
			if (!t.options.controls.volume) {
				t.mute.remove();
			}	
			
			if (!t.options.controls.fullscreen) {
				t.fullscreen.remove();
			}				
		},
		
		buildControlBar: function() {
			var t = this;
		
			if (t.isVideo) {
				// show/hide controls
				t.container
					.bind('mouseenter', function () {
						t.controls.css('visibility','visible');						
						t.controls.fadeIn(200);
						t.captionsDisplay.css('padding-bottom', t.controls.height() + 5);
						t.setRailSize();
						t.isControlsVisible = true;
					})
					.bind('mouseleave', function () {
						if (!t.mediaElement.paused) {
							t.controls.fadeOut(200, function() {
								$(this).css('visibility','hidden');
								$(this).css('display','block');
								t.captionsDisplay.css('padding-bottom', 10);
							});
							t.isControlsVisible = false;
						}
					});
			}		
		},
		
		buildPlayPause: function() {
			var t = this;
			
			// PLAY/PAUSE button
			t.playpause.bind('click', function () {
				if (t.playpause.hasClass('mep-play')) {
					//if (mediaElement.paused) {
					t.mediaElement.play();
					t.playpause.removeClass('mep-play').addClass('mep-pause');
				} else {
					t.mediaElement.pause();
					t.playpause.removeClass('mep-pause').addClass('mep-play');
				}
			});
		},
		
		buildTimeRail: function() {
			var t = this;
			
			// TIME RAIL
			t.timeRail.delegate('span', 'click', function (e) {
				// mouse position relative to the object
				var x = e.pageX,
					offset = t.timeTotal.offset(),
					width = t.timeTotal.outerWidth(),
					percentage = ((x - offset.left) / width),
					newTime = percentage * t.mediaElement.duration;

				t.mediaElement.setCurrentTime(newTime);
			});

			// attach events to <video/audio> for RAIL updates
			t.mediaElement.addEventListener('timeupdate', function (e) {

				t.displayCaptions();			
			
				//if (!t.isControlsVisible)
				//	return;
				
				t.setTimePosition();
				t.setTimeLoaded(e.target);						

			}, true);

			t.mediaElement.addEventListener('progress', function (e) {				
				t.setTimeLoaded(e.target);
			}, true);		
		},
		
		setTimePosition: function() {
			var
				t = this,
				newWidth,
				handlePos;
			
			if (t.mediaElement.currentTime && t.mediaElement.duration) {

				// update current and duration text
				t.currentTime.html(html5.Utility.secondsToTimeCode(t.mediaElement.currentTime));
				if (t.mediaElement.duration)
					t.duration.html(html5.Utility.secondsToTimeCode(t.mediaElement.duration));

				// update bar and handle				
				newWidth = t.timeTotal.width() * t.mediaElement.currentTime / t.mediaElement.duration;
				handlePos = newWidth - (t.timeHandle.width() / 2);
			
				t.timeCurrent.width(newWidth);
				t.timeHandle.css('left', handlePos);
			}		
		},
			
		setTimeLoaded:function(target) {
			var
				t = this,
				percent = null;
			
			// Some browsers (e.g., FF3.6 and Safari 5) cannot calculate target.bufferered.end()
			// to be anything other than 0. If the byte count is available we use this instead.
			// Browsers that support the else if do not seem to have the bufferedBytes value and
			// should skip to there. Tested in Safari 5, Webkit head, FF3.6, Chrome 6, IE 7/8.
			if (target && target.bytesTotal != undefined && target.bytesTotal > 0 && target.bufferedBytes != undefined) {
				percent = target.bufferedBytes / target.bytesTotal;
			}
			// need to account for a real array with multiple values (only Firefox 4 has this so far)
			else if (target && target.buffered && target.buffered.length > 0 && target.buffered.end && target.duration) {
				percent = target.buffered.end(0) / target.duration;
			}

			if (percent !== null) {
				// update loaded bar
				t.timeLoaded.width(t.timeTotal.width() * percent);			
			}
		},		

		setRailSize: function() {
			var
				t = this,
				
				usedWidth = t.playpause.outerWidth(true) +
							t.time.outerWidth(true) +
							t.mute.outerWidth(true) +
							t.captions.outerWidth(true) +
							((t.isVideo) ? t.fullscreen.outerWidth(true) : 0),
				
				//usedWidth = t.timeRail.siblings().outerWidth(true),
				railWidth = t.controls.width() - usedWidth - (t.timeRail.outerWidth(true) - t.timeRail.outerWidth(false));

			t.timeRail.width(railWidth);
			t.timeTotal.width(railWidth - (t.timeTotal.outerWidth(true) - t.timeTotal.width()));
		},

		setPlayerSize: function(width,height) {
			var t = this;
			
			// ie9 appears to need this (jQuery bug?)
			t.width = parseInt(width, 10);
			t.height = parseInt(height, 10);
			
			t.container
				.width(t.width)
				.height(t.height);
				
			t.captionsDisplay
			//	.height(t.height)
				.width(t.width);					

			t.overlay
				.width(t.width)
				.height(t.height);	
				
			t.posterImg
				.height(t.height)
				.width(t.width);								
		},

		handleError: function(me) {
			var t = this;
			
			t.$media.hide();
			
			//t.showMessage(t.options.messages.error);
			t.overlay.hide();
			t.controls.hide();
			t.poster.hide();
		},

		buildFullscreen: function() {
			var t = this;
	
			t.isFullScreen = false;
			t.normalHeight = 0;
			t.normalWidth = 0;
			
			t.fullscreen.bind('click', function () {
				t.setFullScreen(!t.isFullScreen);
			});			
		},

		setFullScreen: function (goFullScreen) {
			var t = this;
			
			switch (t.mediaElement.pluginType) {
				case 'flash':
					t.mediaElement.setFullscreen(goFullScreen);
					break;
				case 'silverlight':
					t.mediaElement.setFullscreen(goFullScreen);
					break;
				case 'native':

					if (html5.MediaFeatures.hasNativeFullScreen) {
						
						if (goFullScreen) {
							t.mediaElement.webkitEnterFullScreen();
						} else {
							t.mediaElement.webkitExitFullScreen();
						}
					
					} else {			
						if (goFullScreen) {

							// store
							t.normalHeight = t.$media.height();
							t.normalWidth = t.$media.width();

							// make full size
							t.container
								.addClass('mep-container-fullscreen')
								.width('100%')
								.height('100%')
								.css('z-index', 1000);

							t.$media
								.width('100%')
								.height('100%');

							t.overlay
								.width('100%')
								.height('100%');

							t.posterImg
								.width('100%')
								.height('auto');

							t.fullscreen
								.removeClass('mep-fullscreen')
								.addClass('mep-unfullscreen');

							t.setRailSize();

							t.escB = function(e) { t.escListener(e); };
							t.resB = function(e) { t.resizeListener(e); };
							
							$(document).bind('keydown', t.escB);
							$(window).bind('resize', t.resB);
						} else {

							t.container
								.removeClass('mep-container-fullscreen')
								.width(t.normalWidth)
								.height(t.normalHeight)
								.css('z-index', 1);
								
							t.$media
								.width(t.normalWidth)
								.height(t.normalHeight);

							t.posterImg
								.width(t.normalWidth)
								.height(t.normalHeight);

							t.fullscreen
								.removeClass('mep-unfullscreen')
								.addClass('mep-fullscreen');

							t.setRailSize();

							$(document).unbind('keydown', t.escB);
							$(window).unbind('resize', t.resB);
						}
					}
			}
			t.isFullScreen = goFullScreen;
		},

		escListener: function (e) {
			if (e.keyCode == 27) {
				this.setFullScreen(false);
			}
		},

		resizeListener: function(e) {
			this.setRailSize();
		},
		
		buildVolumeControls: function() {
			var t = this;
			
			t.vmmB = function(e) { t.volumeMove(e); };
			t.vrmB = function(e) { t.removeMouseMove(e); };
			
			// SLIDER
			t.volumeSlider.bind('mousedown', function (e) {
				t.volumeMove(e);
				$(document)
					.bind('mousemove', t.vmmB)
					.bind('mouseup', t.vrmB);
			});			

			// MUTE
			t.mute.find('span').bind('click', function () {
				if (t.mediaElement.muted) {
					t.mediaElement.setMuted(false);
					t.mute.removeClass('mep-unmute').addClass('mep-mute');
					t.positionVolumeHandle(1);
				} else {
					t.mediaElement.setMuted(true);
					t.mute.removeClass('mep-mute').addClass('mep-unmute');
					t.positionVolumeHandle(0);
				}
			});	
			
		},
		
		volumeMove: function(e) {
			var
				t = this,				
				railHeight = t.volumeRail.height(),
				newY = e.pageY - t.volumeRail.offset().top,
				volume = (railHeight - newY) / railHeight
			
			// only allow it to move within the rail
			if (newY < 0)
				newY = 0;
			else if (newY > railHeight)
				newY = railHeight;

			// move the handle to match the mouse
			t.volumeHandle.css('top', newY - (t.volumeHandle.height() / 2));

			// set mute status
			if (volume == 0) {
				t.mediaElement.setMuted(true);
				t.mute.removeClass('mep-mute').addClass('mep-unmute');
			} else {
				t.mediaElement.setMuted(false);
				t.mute.removeClass('mep-unmute').addClass('mep-mute');
			}

			// set the volume
			t.mediaElement.setVolume(volume);
		},
		
		positionVolumeHandle: function(volume) {
			var t = this;
			t.volumeHandle.css('top', t.volumeRail.height() - (t.volumeRail.height() * volume) - (t.volumeHandle.height() / 2));
		},
		
		removeMouseMove: function() {
			var t = this;
			//$(document).css('cursor','');
			$(document)
				.unbind('mousemove', t.vmmB)
				.unbind('mouseup', t.vrmB);
		}		
	};
	
	html5.language = {
		codes:  {
			af:'Afrikaans',
			sq:'Albanian',
			ar:'Arabic',
			be:'Belarusian',
			bg:'Bulgarian',
			ca:'Catalan',
			zh:'Chinese',
			'zh-cn':'Chinese (Simplified)',
			'zh-tw':'Chinese (Traditional)',
			hr:'Croatian',
			cs:'Czech',
			da:'Danish',
			nl:'Dutch',
			en:'English',
			et:'Estonian',
			tl:'Filipino',
			fi:'Finnish',
			fr:'French',
			gl:'Galician',
			de:'German',
			el:'Greek',
			ht:'Haitian (Creole)',
			iw:'Hebrew',
			hi:'Hindi',
			hu:'Hungarian',
			is:'Icelandic',
			id:'Indonesian',
			ga:'Irish',
			it:'Italian',
			ja:'Japanese',
			ko:'Korean',
			lv:'Latvian',
			lt:'Lithuanian',
			mk:'Macedonian',
			ms:'Malay',
			mt:'Maltese',
			no:'Norwegian',
			fa:'Persian',
			pl:'Polish',
			pt:'Portuguese',
			'pt-pt':'Portuguese (Portugal)',
			ro:'Romanian',
			ru:'Russian',
			sr:'Serbian',
			sk:'Slovak',
			sl:'Slovenian',
			es:'Spanish',
			sw:'Swahili',
			sv:'Swedish',
			tl:'Tagalog',
			th:'Thai',
			tr:'Turkish',
			uk:'Ukrainian',
			vi:'Vietnamese',
			cy:'Welsh',
			yi:'Yiddish'
		}
	};
	
	/*
	Parses SRT format which should be formatted as
	1
	00:00:01,1 --> 00:00:05,000
	A line of text

	2
	00:01:15,1 --> 00:02:05,000
	A second line of text

	Adapted from: http://www.delphiki.com/html5/playr
	*/
	html5.SrtParser = {	
		pattern_identifier: /^[0-9]+$/,
		pattern_timecode: /^([0-9]{2}:[0-9]{2}:[0-9]{2}(,[0-9]{1,3})?) --\> ([0-9]{2}:[0-9]{2}:[0-9]{2}(,[0-9]{3})?)(.*)$/,		
		timecodeToSeconds: function(timecode){
			var tab = timecode.split(':');
			return tab[0]*60*60 + tab[1]*60 + parseFloat(tab[2].replace(',','.'));
		},
		parse: function(srtText) {
			var 	
				i = 0,
				lines = srtText.split(/\r?\n/),
				entries = {text:[], times:[]},
				timecode,
				text;
				
			for(; i<lines.length; i++) {
				// check for the line number
				if (this.pattern_identifier.exec(lines[i])){
					// skip to the next line where the start --> end time code should be
					i++;
					timecode = this.pattern_timecode.exec(lines[i]);
					if (timecode && i<lines.length){
						i++;
						// grab all the (possibly multi-line) text that follows
						text = lines[i];
						i++;
						while(lines[i] !== '' && i<lines.length){
							text = text + '\n' + lines[i];
							i++;
						}					
						
						// Text is in a different array so I can use .join
						entries.text.push(text);
						entries.times.push(
						{
							start: this.timecodeToSeconds(timecode[1]),
							stop: this.timecodeToSeconds(timecode[3]),
							settings: timecode[5]
						});
					}
				}
			}
			
			return entries;		
		},
		
		canTranslate: function() {
			return !(typeof(google) == 'undefined' || typeof(google.language) == 'undefined');
		},
		
		translateSrt: function(srtData, fromLang, toLang, callback) {
			
			if (!this.canTranslate()) {
				callback(null);
				return;
			}
			
			var 				
				entries = {text:[], times:[]},
				lines,
				i			
			
			this.translateText( srtData.text.join(' <a></a>'), fromLang, toLang, function(result) {
				// split on separators
				lines = result.split('<a></a>');
				
				// create new entries
				for (i=0;i<srtData.text.length; i++) {
					// add translated line
					entries.text[i] = lines[i];
					// copy existing times
					entries.times[i] = {
						start: srtData.times[i].start,
						stop: srtData.times[i].stop,
						settings: srtData.times[i].settings
					};
				}
				
				callback(entries);			
			});
		},
		
		translateText: function(text, fromLang, toLang, callback) {
		
			var
				separatorIndex,
				chunks = [],
				chunk,
				maxlength = 1000,
				result = '',
				nextChunk= function() {
					if (chunks.length > 0) {
						chunk = chunks.shift();
						html5.SrtParser.translateChunk(chunk, fromLang, toLang, function(r) {
							if (r != 'undefined') {
								result += r;
							}
							nextChunk();
						});
					} else {
						callback(result);
					}
				};
			
			// split into chunks
			while (text.length > 0) {
				if (text.length > maxlength) {
					separatorIndex = text.lastIndexOf('.', maxlength);
					chunks.push(text.substring(0, separatorIndex));
					text = text.substring(separatorIndex+1);
				} else {
					chunks.push(text);
					text = '';
				}				
			}
			
			// start handling the chunks
			nextChunk();			
		},
		translateChunk: function(text, fromLang, toLang, callback) {
			google.language.translate(text, fromLang, toLang, function(result) {				
				callback(result.translation);
			});					
		}
	};	

	// turn into jQuery plugin
	jQuery.fn.mediaelementplayer = function (options) {
		return this.each(function () {
			return new MediaElementPlayer($(this), options);
		});
	};

	// push out to window
	window.MediaElementPlayer = html5.MediaElementPlayer;

})(jQuery);


