/*!
* Media Element
* HTML5 <video> libary
* http://mediaelementjs.com/
*
* Creates a JavaScript object that mimics HTML5 media objects
* through a Flash->JavaScript|Silverlight bridge
*
* Copyright 2010, John Dyer
* Dual licensed under the MIT or GPL Version 2 licenses.
*
* Version: 1.0.7
*/

/*
- removing vars... JSLint
- removed SWFObject and MS detection
- unified object types
- moved utility functions into single object
*/

// Namespace
var html5 = html5 || {};

// player number (for missing, same id attr)
html5.meIndex = 0;

// media types accepted by plugins
html5.plugins = {
	'silverlight': [
		{version: [3,0], type: 'video/mp4'},
		{version: [3,0], type: 'video/m4v'},
		{version: [3,0], type: 'video/mov'},
		{version: [3,0], type: 'video/wmv'},
		{version: [3,0], type: 'audio/wma'},
		{version: [3,0], type: 'audio/mp4'},
		{version: [3,0], type: 'audio/m4a'},
		{version: [3,0], type: 'audio/mp3'}
	],
	'flash': [
		{version: [9,0,124], type: 'video/mp4'},
		{version: [9,0,124], type: 'video/flv'},
		{version: [9,0,124], type: 'video/mov'},
		//{version: '11.0.0', type: 'video/webm'}, // for future reference
		{version: [9,0,124], type: 'audio/mp3'},
		{version: [9,0,124], type: 'audio/m4a'},
		{version: [9,0,124], type: 'audio/mp4'},
		{version: [9,0,124], type: 'audio/flv'}
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
		return (type.match(/video\/(mp4|m4v)/) !== null) ? 'probably' : '';
	};
}

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
			this.createPlugin( htmlMediaElement, options, isVideo, playback.method, html5.Utility.absolutizeUrl(playback.url), poster, autoplay);
		} else {
			// boo, no HTML5, no Flash, no Silverlight.
			this.createErrorMessage( htmlMediaElement, options, playback.url, poster );
		}			
	},
	
	determinePlayback: function(htmlMediaElement, options, isVideo, supportsMediaTag) {
		
		var 
			mediaFiles = [],
			i,
			j,
			k,				
			n,
			url,
			type,
			result = { method: '', url: ''},
			pluginName,
			pluginMediaTypes;
		
		// STEP 1: Get Files from <video src> or <source src>
		
		// supplied type overrides all HTML
		if (typeof (options.type) != 'undefined' && options.type !== '') {								
			mediaFiles.push({type:options.type, url:null});

		// test for src attribute first
		} else if (htmlMediaElement.getAttribute('src') != 'undefined' && htmlMediaElement.getAttribute('src') !== null) {
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
		
			// this is the order of plugin preference [silverlight, flash]
			for (j=0; j<options.plugins.length; j++) {
				
				pluginName = options.plugins[j];
				pluginMediaTypes = html5.plugins[pluginName];

				// test for plugin playback types
				for (k=0; k<pluginMediaTypes.length; k++) {
					// find plugin that can play the type
					if (mediaFiles[i].type == pluginMediaTypes[k].type && html5.PluginDetector.hasPluginVersion(pluginName, pluginMediaTypes[k].version)) {
						result.method = pluginName;
						result.url = mediaFiles[i].url;					
						return result;
					}
				}
			}
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
			'<a href="' + downloadUrl + '">Download file</a>';
		
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
			'autoplay=' + autoplay,
			'width=' + width,
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

				if (navigator.appName.indexOf("Microsoft") != -1) {
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
	
	setSrc: function (url) {
		this.src = url;
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

	// custom methods since not all JavaScript implementations support get/set
	setSrc: function (url) {
		this.pluginApi.setSrc(html5.Utility.absolutizeUrl(url));
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

window.html5 = html5;
window.MediaElement = html5.MediaElement;

﻿/*!
 * Media Element jQuery plugin
 * http://mediaelementjs.com/
 *
 * Creates a controller bar for HTML5 <video> tags
 * and falls back to a Flash player or Silverlight player for browsers that
 * do not support <video> or cannot play the video type.
 * Mostly designed for H.264, but can also play Ogg, WebM, FLV, WMV, ACC and MP3
 *
 * Copyright 2010, John Dyer
 * Dual licensed under the MIT or GPL Version 2 licenses.
 *
 * Version: 1.0.7
 */

// TODO:
// - make volume be event driven, remember setting (cookie, startup)

(function ($) {

	var v = document.createElement('video');
	var ua = navigator.userAgent;
	
	// native fullscreen (Safari only, Chrome fails)
	var hasNativeFullScreen = (typeof v.webkitEnterFullScreen !== 'undefined');
	if (ua.match('Chrome')) {
		hasNativeFullScreen = false;
	}

	// default player values
	var mediaElementPlayerDefaults = {
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
		}		
	};

	// utility methods
	function formatTime(seconds) {
		seconds = Math.round(seconds);
		minutes = Math.floor(seconds / 60);
		minutes = (minutes >= 10) ? minutes : "0" + minutes;
		seconds = Math.floor(seconds % 60);
		seconds = (seconds >= 10) ? seconds : "0" + seconds;
		return minutes + ":" + seconds;
	}

	var playerIndex = 0;

	// wraps a MediaElement object in player controls
	function MediaElementPlayer($media, o) {

		$media = $($media);
		var options = $.extend(true,{},mediaElementPlayerDefaults,o);

		var isVideo = $media[0].tagName.toLowerCase() == 'video';
		var id = 'mep_' + playerIndex++;

		// ipad/iphone test
		var u = navigator.userAgent;
		var isiPad = (u.match(/iPad/i) !== null);
		var isiPhone = (u.match(/iPhone/i) !== null);
		var isAndroid = (u.match(/Android/i) !== null);

		if (isiPad || isiPhone) {
			// add controls and stop
			$media.attr('controls', 'controls');
			// fix Apple bug
			$media.removeAttr('poster');

			// override Apple's autoplay override for iPads
			if (isiPad && $media[0].getAttribute('autoplay') !== null) {
				$media[0].load();
				$media[0].play();
			}

			// don't do the rest
			return;
		} else if (isAndroid && isVideo) {

			// Andriod is better off with native controls (like iOS)
			$media.attr('controls', 'controls');
			return;
			
		} else {

			// remove native controls and use MEP
			$media.removeAttr('controls');
		}

		var html = $(
		'<div id="' + id + '" class="mep-container">'+
			'<div class="mep-mediaelement">'+
			'</div>'+
			'<div class="mep-poster">'+
				'<img />'+
			'</div>'+
			'<div class="mep-overlay">'+
				'<div class="mep-overlay-message"></div>'+
			'</div>'+
			'<div class="mep-controls">'+
				'<div class="mep-playpause-button mep-play"><span></span></div>'+
				'<div class="mep-time-rail">'+
					'<span class="mep-time-total">'+
						'<span class="mep-time-loaded"></span>'+
						'<span class="mep-time-current"></span>'+
						'<span class="mep-time-handle"></span>'+
					'</span>'+
				'</div>'+
				'<div class="mep-time">'+
					'<span class="mep-currenttime"></span>'+
					' <span> | </span> '+
					'<span class="mep-duration"></span>'+
				'</div>'+
				'<div class="mep-volume-button mep-mute">'+
					'<span></span>'+
					'<div class="mep-volume-slider">'+
						'<div class="mep-volume-rail">'+
							'<div class="mep-volume-handle"></div>'+
						'</div>'+
					'</div>'+
				'</div>'+
				'<div class="mep-fullscreen-button"><span></span></div>'+
			'</div>'+
			'<div class="mep-clear"></div>'+
		'</div>');

		// insert and switch position
		$media.before(html);
		var container = $('#' + id);

		// put the <video> tag in the right spot
		container.find('.mep-mediaelement').append($media);

		// move any skins up to the container
		container.addClass($media[0].className);

		var poster = container.find('.mep-poster');
		var posterImg = poster.find('img');
		poster.hide();

		// append a poster
		var posterUrl = $media.attr('poster');

		if (posterUrl !== '') {			
			posterImg.attr('src',posterUrl);
			poster.show();
		}

		// create overlay
		var overlay = container.find('.mep-overlay');
		var overlayMessage = container.find('.mep-overlay-message');
		if ($media[0].getAttribute('autoplay') !== null)
			showMessage(options.messages.loading);
		else
			showMessage(options.messages.start);		

		// set container size to video size
		function setPlayerSize(width,height) {
			
			// ie9 appears to need this (jQuery bug?)
			width = parseInt(width);
			height = parseInt(height);
			
			container
				.width(width)
				.height(height);

			overlay
				.width(width)
				.height(height);	
				
			posterImg
				.height(height)
				.width(width);								
		}
		
		var width = 0;
		var height = 0;
				
		if (isVideo) {			
			// priority = videoWidth (forced), width attribute, defaultVideoWidth		
			width = (options.videoWidth > 0) ? options.videoWidth : ($media[0].getAttribute('width') !== null) ? $media.attr('width') : options.defaultVideoWidth;
			height = (options.videoHeight > 0) ? options.videoHeight : ($media[0].getAttribute('height') !== null) ? $media.attr('height') : options.defaultVideoHeight;				
		} else {
			width = options.audioWidth;
			height = options.audioHeight;
		}
		
		setPlayerSize(width, height);
		
		// controls bar
		var controls = container.find('.mep-controls')
		var isControlsVisible = true;

		if (isVideo) {
			// show/hide controls
			container
				.bind('mouseenter', function () { controls.fadeIn(200); setRailSize(); isControlsVisible = true; })
				.bind('mouseleave', function () { controls.fadeOut(200); isControlsVisible = false; });
		}

		function showMessage(text) {
			if (isVideo) {
				overlayMessage.html(text);
				//overlay.show();
				overlay.css('visibility','visible');
			}
		}
		function hideMessage() {
			//overlay.hide();
			overlay.css('visibility','hidden');
		}


		// find controls
		var playpause = controls.find('.mep-playpause-button');
		var fullscreen = controls.find('.mep-fullscreen-button');
		if (!isVideo)
			fullscreen.remove();

		var time = controls.find('.mep-time');
		var currentTime = controls.find('.mep-currenttime').html('00:00');
		var duration = controls.find('.mep-duration').html('00:00');

		var mute = controls.find('.mep-volume-button');
		var volumeSlider = controls.find('.mep-volume-slider');
		var volumeRail = controls.find('.mep-volume-rail');
		var volumeHandle = controls.find('.mep-volume-handle');

		var timeRail = controls.find('.mep-time-rail');
		var timeCurrent = timeRail.find('.mep-time-current').width(0);
		var timeLoaded = timeRail.find('.mep-time-loaded').width(0);
		var timeTotal = timeRail.find('.mep-time-total');
		var timeHandle = controls.find('.mep-time-handle');

		function setRailSize() {
			var usedWidth = playpause.outerWidth(true) +
												time.outerWidth(true) +
												mute.outerWidth(true) +
												((isVideo) ? fullscreen.outerWidth(true) : 0);

			var railWidth = controls.width() - usedWidth - (timeRail.outerWidth(true) - timeRail.outerWidth(false));

			timeRail.width(railWidth);
			timeTotal.width(railWidth - (timeTotal.outerWidth(true) - timeTotal.width()));
		}

		function setupControls(mediaElement, domNode) {
			controls.show();
			setRailSize();

			// play/pause button
			playpause.bind('click', function () {

				if (playpause.hasClass('mep-play')) {
					//if (mediaElement.paused) {
					mediaElement.play();
					playpause.removeClass('mep-play').addClass('mep-pause');
				} else {
					mediaElement.pause();
					playpause.removeClass('mep-pause').addClass('mep-play');
				}
			});

			// VOLUME SLIDER
			function volumeMove(e) {
				//$('body').css('cursor','N-resize');

				// only allow it to move within the rail
				var railHeight = volumeRail.height();
				var newY = e.pageY - volumeRail.offset().top;
				if (newY < 0)
					newY = 0;
				else if (newY > railHeight)
					newY = railHeight;

				// set position
				volumeHandle.css('top', newY - (volumeHandle.height() / 2));

				// calculate volume
				var volume = (railHeight - newY) / railHeight;

				// make sure to check mute status
				if (volume == 0) {
					mediaElement.setMuted(true);
					mute.removeClass('mep-mute').addClass('mep-unmute');
				} else {
					mediaElement.setMuted(false);
					mute.removeClass('mep-unmute').addClass('mep-mute');
				}

				mediaElement.setVolume(volume);
			};
			function positionVolumeHandle(volume) {
				volumeHandle.css('top', volumeRail.height() - (volumeRail.height() * volume) - (volumeHandle.height() / 2));
			}
			function removeMouseMove() {
				//$(document).css('cursor','');
				$(document)
					.unbind('mousemove', volumeMove)
					.unbind('mouseup', removeMouseMove);
			}
			volumeSlider.bind('mousedown', function (e) {
				volumeMove(e);
				$(document)
					.bind('mousemove', volumeMove)
					.bind('mouseup', removeMouseMove);
			});

			// MUTE
			mute.find('span').bind('click', function () {
				if (mediaElement.muted) {
					mediaElement.setMuted(false);
					mute.removeClass('mep-unmute').addClass('mep-mute');
					positionVolumeHandle(1);
				} else {
					mediaElement.setMuted(true);
					mute.removeClass('mep-mute').addClass('mep-unmute');
					positionVolumeHandle(0);
				}
			});

			// FULLSCREEN
			var isFullScreen = false;
			var normalHeight = 0;
			var normalWidth = 0;
			fullscreen.bind('click', function () {
				setFullScreen(!isFullScreen);
			});

			function setFullScreen(goFullScreen) {
				switch (mediaElement.pluginType) {
					case 'flash':
						mediaElement.setFullscreen(goFullScreen);
						break;
					case 'silverlight':
						mediaElement.setFullscreen(goFullScreen);
						break;
					case 'native':

						if (hasNativeFullScreen) {
							
							if (goFullScreen) {
								mediaElement.webkitEnterFullScreen();
							} else {
								mediaElement.webkitExitFullScreen();
							}
						
						} else {			
							if (goFullScreen) {

								// store
								normalHeight = $media.height();
								normalWidth = $media.width();

								// make full size
								container
									.addClass('mep-container-fullscreen')
									.width('100%')
									.height('100%')
									.css('z-index', 1000);

								$media
									.width('100%')
									.height('100%');

								overlay
									.width('100%')
									.height('100%');

								posterImg
									.width('100%')
									.height('auto');

								fullscreen
									.removeClass('mep-fullscreen')
									.addClass('mep-unfullscreen');

								setRailSize();


								$(document).bind('keydown', escListener);
								$(window).bind('resize', resizeListener);
							} else {

								container
									.removeClass('mep-container-fullscreen')
									.width(normalWidth)
									.height(normalHeight)
									.css('z-index', 1);
								$media
									.width(normalWidth)
									.height(normalHeight);

								posterImg
									.width(normalWidth)
									.height(normalHeight);

								fullscreen
									.removeClass('mep-unfullscreen')
									.addClass('mep-fullscreen');

								setRailSize();

								$(document).unbind('keydown', escListener);
								$(window).unbind('resize', resizeListener);

							}
						}
					}
					isFullScreen = goFullScreen;
			}

			function escListener(e) {
				if (e.keyCode == 27)
					setFullScreen(false);
			}

			function resizeListener(e) {
				setRailSize();
			}

			// time rail
			timeRail.delegate('span', 'click', function (e) {
				// mouse position relative to the object!
				var x = e.pageX;
				var offset = timeTotal.offset();
				var width = timeTotal.outerWidth();
				var percentage = ((x - offset.left) / width);
				var newTime = percentage * mediaElement.duration;

				mediaElement.setCurrentTime(newTime);
			});
			
			overlay.bind('click', function (e) {
				if (mediaElement.paused)
					mediaElement.play();
			}, true);

			// attach events to <video>
			mediaElement.addEventListener('timeupdate', function (e) {

				if (!isControlsVisible)
					return;

				if (mediaElement.currentTime && mediaElement.duration) {

					// update current:duration
					currentTime.html(formatTime(mediaElement.currentTime));
					if (mediaElement.duration)
						duration.html(formatTime(mediaElement.duration));

					// update time bar
					var newWidth = timeTotal.width() * mediaElement.currentTime / mediaElement.duration;
					timeCurrent.width(newWidth);

					// position handle
					var handlePos = newWidth - (timeHandle.width() / 2);
					timeHandle.css('left', handlePos);
				}

				setTimeLoaded(e.target);

			}, true);

			mediaElement.addEventListener('progress', function (e) {				
				setTimeLoaded(e.target);
			}, true);

			// removed byte/loaded
			// changed over to W3C method, even through Chrome currently does this wrong.
			// need to account for a real array with multiple values			
			function setTimeLoaded(target) {
			  // Some broswers (e.g., FF3.6 and Safari 5) cannot calculate target.bufferered.end()
			  // to be anything other than 0. If the byte count is available we use this instead.
			  // Browsers that support the else if do not seem to have the bufferedBytes value and
			  // should skip to there. Tested in Safari 5, Webkit head, FF3.6, Chrome 6, IE 7/8.
				if (target && target.bytesTotal != undefined && target.bytesTotal > 0 && target.bufferedBytes != undefined) {
				  var percent = target.bufferedBytes / target.bytesTotal;

				  // update loaded bar
					timeLoaded.width(timeTotal.width() * percent);
				}
				else if (target && target.buffered && target.buffered.length > 0 && target.buffered.end && target.duration) {
					// calculate percentage
					var percent = target.buffered.end(0) / target.duration;

					// update loaded bar
					timeLoaded.width(timeTotal.width() * percent);
				}			
			}

			mediaElement.addEventListener('click', function (e) {
				if (mediaElement.paused)
					mediaElement.play();
			}, true);

			mediaElement.addEventListener('playing', function (e) {
				poster.hide();
				playpause.removeClass('mep-play').addClass('mep-pause');
				hideMessage();
			}, true);

			mediaElement.addEventListener('pause', function (e) {	
				playpause.removeClass('mep-pause').addClass('mep-play');
				showMessage(options.messages.paused);
			}, true);

			mediaElement.addEventListener('ended', function (e) {
				poster.show();
				playpause.removeClass('mep-pause').addClass('mep-play');
				showMessage(options.messages.ended);
			}, true);
			
			mediaElement.addEventListener('loadedmetadata', function(e) {
				// if the <video height> was not set and the options.videoHeight was not set
				// then resize to the real dimensions
				if (isVideo && options.videoHeight <= 0 && $media[0].getAttribute('height') === null && !isNaN(e.target.videoHeight)) {
					setPlayerSize(e.target.videoWidth, e.target.videoHeight);
					setRailSize();
					mediaElement.setVideoSize(e.target.videoWidth, e.target.videoHeight);			
				}
				
			}, true);
			
			var testEvents = 'play playing played paused pausing'.split(' ');
			for (var i=0; i<testEvents.length;i++) {
				mediaElement.addEventListener(testEvents[i], function(e) {				
					console.log(e.type, e.target.paused);
				}, true);
			}

			// webkit has trouble doing this without a delay
			setTimeout(function () {
				setRailSize();
			}, 50);

			if (options.success)
				options.success(mediaElement, domNode);
		} // end setupControls

		function handleError(me) {
			showMessage(options.messages.error);
			
			var et = '';
			for (var ee in me)
				et += ee + ' = ' + me[ee] + ',';
			console.log('medialementplayer ERROR', et);
		}
		
		// create MediaElement, setup controls on success
		var meOptions = $.extend({}, options, { 
			pluginWidth: height, 
			pluginHeight: width,
			success: setupControls, 
			error: handleError });
			
		var mediaElement = html5.MediaElement($media[0], meOptions);

		return mediaElement;
	}

	// turn into jQuery plugin
	jQuery.fn.mediaelementplayer = function (options) {
		return this.each(function () {
			return new MediaElementPlayer($(this), options);
		});
	};

	window.html5.MediaElementPlayer = MediaElementPlayer;
	window.MediaElementPlayer = MediaElementPlayer;

})(jQuery);


