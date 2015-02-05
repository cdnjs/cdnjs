/*!
* MediaElement.js
* HTML5 <video> and <audio> shim and player
* http://mediaelementjs.com/
*
* Creates a JavaScript object that mimics HTML5 MediaElement API
* for browsers that don't understand HTML5 or can't play the provided codec
* Can play MP4 (H.264), Ogg, WebM, FLV, WMV, WMA, ACC, and MP3
*
* Copyright 2010, John Dyer (http://johndyer.me)
* Dual licensed under the MIT or GPL Version 2 licenses.
*
*/
// Namespace
var mejs = mejs || {};

// version number
mejs.version = '2.0.5';

// player number (for missing, same id attr)
mejs.meIndex = 0;

// media types accepted by plugins
mejs.plugins = {
	silverlight: [
		{version: [3,0], types: ['video/mp4','video/m4v','video/mov','video/wmv','audio/wma','audio/m4a','audio/mp3','audio/wav']}
	],
	flash: [
		{version: [9,0,124], types: ['video/mp4','video/m4v','video/mov','video/flv','audio/flv','audio/mp3','audio/m4a']}		
		//,{version: [11,0], types: ['video/webm'} // for future reference
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
		
// special case for Android which sadly doesn't implement the canPlayType function (always returns '')
if (mejs.PluginDetector.ua.match(/Android 2\.[12]/) !== null) {
	HTMLMediaElement.canPlayType = function(type) {
		return (type.match(/video\/(mp4|m4v)/gi) !== null) ? 'probably' : '';
	};
}

// necessary detection (fixes for <IE9)
mejs.MediaFeatures = {
	init: function() {
		var
			nav = mejs.PluginDetector.nav,
			ua = mejs.PluginDetector.ua,
			i,
			v,
			html5Elements = ['source','track','audio','video'];
		
		// detect browsers
		this.isiPad = (ua.match(/iPad/i) !== null);
		this.isiPhone = (ua.match(/iPhone/i) !== null);
		this.isAndroid = (ua.match(/Android/i) !== null);
		this.isIE = (nav.appName.indexOf("Microsoft") != -1);
		this.isChrome = (ua.match(/Chrome/gi) !== null);
		
		// create HTML5 media elements for IE before 9, get a <video> element for fullscreen detection
		for (i=0; i<html5Elements.length; i++) {
			v = document.createElement(html5Elements[i]);
		}
		
		// detect native JavaScript fullscreen (Safari only, Chrome fails)
		this.hasNativeFullScreen = (typeof v.webkitEnterFullScreen !== 'undefined');
		if (this.isChrome) {
			this.hasNativeFullScreen = false;
		}
	}
};
mejs.MediaFeatures.init();


/*
extension methods to <video> or <audio> object to bring it into parity with PluginMediaElement (see below)
*/
mejs.HtmlMediaElement = {
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
	
	// for parity with the plugin versions
	stop: function () {
		this.pause();
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
mejs.PluginMediaElement = function (pluginid, pluginType, mediaUrl) {
	this.id = pluginid;
	this.pluginType = pluginType;
	this.src = mediaUrl;
	this.events = {};
};

// JavaScript values and ExternalInterface methods that match HTML5 video properties methods
// http://www.adobe.com/livedocs/flash/9.0/ActionScriptLangRefV3/fl/video/FLVPlayback.html
// http://www.whatwg.org/specs/web-apps/current-work/multipage/video.html	
mejs.PluginMediaElement.prototype = {

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
		if (this.pluginApi != null) {
			this.pluginApi.playMedia();
			this.paused = false;
		}
	},
	load: function () {
		if (this.pluginApi != null) {
			this.pluginApi.loadMedia();
			this.paused = false;
		}
	},
	pause: function () {
		if (this.pluginApi != null) {
			this.pluginApi.pauseMedia();
			this.paused = true;
		}
	},	
	stop: function () {
		if (this.pluginApi != null) {
			this.pluginApi.stopMedia();
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
			this.pluginApi.setSrc(mejs.Utility.absolutizeUrl(url));
			this.src = mejs.Utility.absolutizeUrl(url);
		} else {
			var i, media;
			
			for (i=0; i<url.length; i++) {
				media = url[i];
				if (this.canPlayType(media.type)) {
					this.pluginApi.setSrc(mejs.Utility.absolutizeUrl(media.src));
					this.src = mejs.Utility.absolutizeUrl(url);
				}
			}			
		}	
		
	},
	setCurrentTime: function (time) {
		if (this.pluginApi != null) {
			this.pluginApi.setCurrentTime(time);
			this.currentTime = time;
		}
	},
	setVolume: function (volume) {
		if (this.pluginApi != null) {
			this.pluginApi.setVolume(volume);
			this.volume = volume;
		}
	},
	setMuted: function (muted) {
		if (this.pluginApi != null) {
			this.pluginApi.setMuted(muted);	
			this.muted = muted;
		}
	},

	// additional non-HTML5 methods
	setVideoSize: function (width, height) {					
		if ( this.pluginElement.style) {
			this.pluginElement.style.width = width + 'px';
			this.pluginElement.style.height = height + 'px';						
		}
		if (this.pluginApi != null) {
			this.pluginApi.setVideoSize(width, height);
		}
	},
	
	setFullscreen: function (fullscreen) {
		if (this.pluginApi != null) {
			this.pluginApi.setFullscreen(fullscreen);
		}
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
mejs.MediaPluginBridge = {

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
				pluginMediaElement.pluginApi = pluginMediaElement.pluginElement.Content.MediaElementJS;
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
		pluginMediaElement.paused = true;

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
mejs.MediaElementDefaults = {
	// shows debug errors on screen
	enablePluginDebug: false,
	// remove or reorder to change plugin priority
	plugins: ['flash','silverlight'],
	// specify to force MediaElement into a mode
	type: '',
	// path to Flash and Silverlight plugins
	pluginPath: mejs.Utility.getScriptPath(['mediaelement.js','mediaelement.min.js','mediaelement-and-player.js','mediaelement-and-player.min.js']),
	// name of flash file
	flashName: 'flashmediaelement.swf',
	// turns on the smoothing filter in Flash
	enablePluginSmoothing: false,
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
mejs.MediaElement = function (el, o) {	
	mejs.HtmlMediaElementShim.create(el,o);
};

mejs.HtmlMediaElementShim = {		

	create: function(el, o) {			
		var
			options = mejs.MediaElementDefaults,
			htmlMediaElement = (typeof(el) == 'string') ? document.getElementById(el) : el,					
			isVideo = (htmlMediaElement.tagName.toLowerCase() == 'video'),			
			supportsMediaTag = (typeof(htmlMediaElement.canPlayType) != 'undefined'),
			playback = {method:'', url:''},
			poster = htmlMediaElement.getAttribute('poster'),
			autoplay =  htmlMediaElement.getAttribute('autoplay'),
			preload =  htmlMediaElement.getAttribute('preload'),
			controls =  htmlMediaElement.getAttribute('controls'),
			prop;

		// extend options
		for (prop in o) {
			options[prop] = o[prop];
		}
		
		// check for real poster
		poster = (typeof poster == 'undefined' || poster === null) ? '' : poster;
		preload = (typeof preload == 'undefined' || preload === null || preload === 'false') ? 'none' : preload;
		autoplay = !(typeof autoplay == 'undefined' || autoplay === null || autoplay === 'false');
		controls = !(typeof controls == 'undefined' || controls === null || controls === 'false');
		
		// test for HTML5 and plugin capabilities
		playback = this.determinePlayback(htmlMediaElement, options, isVideo, supportsMediaTag);

		if (playback.method == 'native') {
			// add methods to native HTMLMediaElement
			this.updateNative( htmlMediaElement, options, autoplay, preload, playback);				
		} else if (playback.method !== '') {
			// create plugin to mimic HTMLMediaElement
			this.createPlugin( htmlMediaElement, options, isVideo, playback.method, (playback.url !== null) ? mejs.Utility.absolutizeUrl(playback.url) : '', poster, autoplay, preload, controls);
		} else {
			// boo, no HTML5, no Flash, no Silverlight.
			this.createErrorMessage( htmlMediaElement, options, (playback.url !== null) ? mejs.Utility.absolutizeUrl(playback.url) : '', poster );
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
				pluginVersions = mejs.plugins[pluginName];				
				for (k=0; k<pluginVersions.length; k++) {
					pluginInfo = pluginVersions[k];
					
					// test if user has the correct plugin version
					if (mejs.PluginDetector.hasPluginVersion(pluginName, pluginInfo.version)) {
					
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
			'<a href="' + downloadUrl + '"><span>Download File</span></a>';
		
		htmlMediaElement.parentNode.insertBefore(errorContainer, htmlMediaElement);
		htmlMediaElement.style.display = 'none';

		options.error(htmlMediaElement);		
	},
	
	createPlugin:function(htmlMediaElement, options, isVideo, pluginType, mediaUrl, poster, autoplay, preload, controls) {
	
		var width = 1,
			height = 1,
			pluginid = 'me_' + pluginType + '_' + (mejs.meIndex++),
			pluginMediaElement = new mejs.PluginMediaElement(pluginid, pluginType, mediaUrl),
			container = document.createElement('div'),
			specialIEContainer,
			node,
			initVars;
			
		// check for placement inside a <p> tag (sometimes WYSIWYG editors do this)
		node = htmlMediaElement.parentNode;
		while (node !== null && node.tagName.toLowerCase() != 'body') {
			if (node.parentNode.tagName.toLowerCase() == 'p') {
				node.parentNode.parentNode.insertBefore(node, node.parentNode);
				break;
			}
			node = node.parentNode;
		}			

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
		mejs.MediaPluginBridge.registerPluginElement(pluginid, pluginMediaElement, htmlMediaElement);

		// add container (must be added to DOM before inserting HTML for IE)
		container.className = 'me-plugin';			
		htmlMediaElement.parentNode.insertBefore(container, htmlMediaElement);

		// flash/silverlight vars
		initVars = [
			'id=' + pluginid,
			'isvideo=' + ((isVideo) ? "true" : "false"),
			'autoplay=' + ((autoplay) ? "true" : "false"),
			'preload=' + preload,
			'width=' + width,			
			'timerrate=' + options.timerRate,
			'height=' + height];

		if (mediaUrl !== null) {	
			if (pluginType == 'flash') {
				initVars.push('file=' + mejs.Utility.encodeUrl(mediaUrl));
			} else {
				initVars.push('file=' + mediaUrl);
			}
		}
		if (options.enablePluginDebug) {
			initVars.push('debug=true');
		}
		if (options.enablePluginSmoothing) {
			initVars.push('smoothing=true');
		}
		if (controls) {
			initVars.push('controls=true'); // shows controls in the plugin if desired
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

				if (mejs.MediaFeatures.isIE) {
					specialIEContainer = document.createElement('div');
					container.appendChild(specialIEContainer);
					specialIEContainer.outerHTML =
'<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab" ' +
'id="' + pluginid + '" width="' + width + '" height="' + height + '">' +
'<param name="movie" value="' + options.pluginPath + options.flashName + '?x=' + (new Date()) + '" />' +
'<param name="flashvars" value="' + initVars.join('&amp;') + '" />' +
'<param name="quality" value="high" />' +
'<param name="bgcolor" value="#000000" />' +
'<param name="wmode" value="transparent" />' +
'<param name="allowScriptAccess" value="always" />' +
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
'allowScriptAccess="always" ' +
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
	
	updateNative: function(htmlMediaElement, options, autoplay, preload, playback) {
		
		// add methods to video object to bring it into parity with Flash Object
		for (var m in mejs.HtmlMediaElement) {
			htmlMediaElement[m] = mejs.HtmlMediaElement[m];
		}
		
		// special case to enforce preload attribute (Chrome doesn't respect this)
		if (mejs.MediaFeatures.isChrome && preload == 'none' && autoplay !== '') {
			// forces the browser to stop loading
			
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
		}
		
		
		// fire success code
		options.success(htmlMediaElement, htmlMediaElement);		
	}
};


window.mejs = mejs;
window.MediaElement = mejs.MediaElement;

/*!
 * MediaElementPlayer
 * http://mediaelementjs.com/
 *
 * Creates a controller bar for HTML5 <video> add <audio> tags
 * using jQuery and MediaElement.js (HTML5 Flash/Silverlight wrapper)
 *
 * Copyright 2010, John Dyer (http://johndyer.me)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 *
 */
﻿(function ($) {

	// default player values
	mejs.MepDefaults = {
		// url to poster (to fix iOS 3.x)
		poster: '',
		// default if the <video width> is not specified
		defaultVideoWidth: 480,
		// default if the <video height> is not specified
		defaultVideoHeight: 270,
		// if set, overrides <video width>
		videoWidth: -1,
		// if set, overrides <video height>
		videoHeight: -1,
		// width of audio player
		audioWidth: 400,
		// height of audio player
		audioHeight: 30,
		// initial volume when the player starts (overrided by user cookie)
		startVolume: 0.8,		
		// useful for <audio> player loops
		loop: false,
		// resize to media dimensions
		enableAutosize: true,		
		// features to show
		features: ['playpause','current','progress','duration','tracks','volume','fullscreen']
	};

	mejs.mepIndex = 0;

	// wraps a MediaElement object in player controls
	mejs.MediaElementPlayer = function($media, o) {
		// enforce object, even without "new" (via John Resig)
		if ( !(this instanceof mejs.MediaElementPlayer) ) {
			return new mejs.MediaElementPlayer($media, o);
		} 
		
		var	
			t = this,
			mf = mejs.MediaFeatures;
	
		t.$media = $($media);

		// check for existing player
		if (t.$media[0].player) {
			return t.$media[0].player;
		} else {
			t.$media[0].player = t;
		}

		t.options = $.extend({},mejs.MepDefaults,o);
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
		} else if (mf.isAndroid) {

			if (t.isVideo) {
				// Android fails when there are multiple types
				// <video>
				// <source src="file.mp4" type="video/mp4" />
				// <source src="file.webm" type="video/webm" />
				// </video>
				if (t.$media.find('source').length > 0) {
					// find an mp4 and make it the root element source
					t.$media[0].src = t.$media.find('source[src$="mp4"]').attr('src');				
				}
				
				// attach a click event to the video and hope Android can play it
				t.$media.click(function() {
					t.$media[0].play();
				});			
				
				return;
			} else {
				// audio?
				// 2.1 = no support
				// 2.2 = Flash support
				// 2.3 = Native HTML5
			}
			
		} else {

			// remove native controls and use MEJS
			t.$media.removeAttr('controls');
		}
		
		t.init();
		
		return t;
	};
	
	// actual player
	mejs.MediaElementPlayer.prototype = {
		init: function() {

			var
				t = this,
				meOptions = $.extend(true, {}, t.options, {
					success: function(media, domNode) { t.meReady(media, domNode); },
					error: function(e) { t.handleError(e);}
				});				
		
			// unique ID
			t.id = 'mep_' + mejs.mepIndex++;			
			
			// build container
			t.container =
				$('<div id="' + t.id + '" class="mejs-container">'+
					'<div class="mejs-inner">'+
						'<div class="mejs-mediaelement"></div>'+
						'<div class="mejs-layers"></div>'+
						'<div class="mejs-controls"></div>'+
						'<div class="mejs-clear"></div>'+
					'</div>' +
				'</div>')						
				.addClass(t.$media[0].className)
				.insertBefore(t.$media);
				
			// move the <video/video> tag into the right spot
			t.container.find('.mejs-mediaelement').append(t.$media);
			
			// find parts
			t.controls = t.container.find('.mejs-controls');
			t.layers = t.container.find('.mejs-layers');		
			
			// determine the size							
			if (t.isVideo) {			
				// priority = videoWidth (forced), width attribute, defaultVideoWidth		
				t.width = (t.options.videoWidth > 0) ? t.options.videoWidth : (t.$media[0].getAttribute('width') !== null) ? t.$media.attr('width') : t.options.defaultVideoWidth;
				t.height = (t.options.videoHeight > 0) ? t.options.videoHeight : (t.$media[0].getAttribute('height') !== null) ? t.$media.attr('height') : t.options.defaultVideoHeight;				
			} else {
				t.width = t.options.audioWidth;
				t.height = t.options.audioHeight;
			}
			
			// set the size, while we wait for the plugins to load below
			t.setPlayerSize(t.width, t.height);
						
			// create MediaElementShim	
			meOptions.pluginWidth = t.height;
			meOptions.pluginHeight = t.width;			
			mejs.MediaElement(t.$media[0], meOptions);			
		},
		
		// Sets up all controls and events
		meReady: function(media, domNode) {		

			var t = this,
				f,
				feature;

			// make sure it can't create itself again if a plugin reloads
			if (this.created)
				return;
			else
				this.created = true;				
				
			t.media = media;
			t.domNode = domNode;
				
			// two built in features
			t.buildposter(t, t.controls, t.layers, t.media);
			t.buildoverlay(t, t.controls, t.layers, t.media);
			
			// grab for use by feautres
			t.findTracks();
				
			// add user-defined features/controls
			for (f in t.options.features) {
				feature = t.options.features[f];
				if (t['build' + feature]) {
					try {
						t['build' + feature](t, t.controls, t.layers, t.media);
					} catch (e) {
						// TODO: report control error
					}
				}			
			}
			
			// reset all layers and controls
			t.setPlayerSize(t.width, t.height);			
			t.setControlsSize();
			
			// controls fade
			if (t.isVideo) {
				// show/hide controls
				t.container
					.bind('mouseenter', function () {
						t.controls.css('visibility','visible');						
						t.controls.stop(true, true).fadeIn(200);
					})
					.bind('mouseleave', function () {
						if (!t.media.paused) {
							t.controls.stop(true, true).fadeOut(200, function() {
								$(this).css('visibility','hidden');
								$(this).css('display','block');								
							});						
						}
					});
				
				// resizer
				if (t.options.enableAutosize) {
					t.media.addEventListener('loadedmetadata', function(e) {
						// if the <video height> was not set and the options.videoHeight was not set
						// then resize to the real dimensions
						if (t.options.videoHeight <= 0 && t.$media[0].getAttribute('height') === null && !isNaN(e.target.videoHeight)) {
							t.setPlayerSize(e.target.videoWidth, e.target.videoHeight);
							t.setControlsSize();
							t.media.setVideoSize(e.target.videoWidth, e.target.videoHeight);			
						}
					}, false);
				}
			}		
			
			// ended for all
			t.media.addEventListener('ended', function (e) {
				t.media.setCurrentTime(0);
				t.media.pause();				
					
				if (t.options.loop) {					
					t.media.play();
				} else {
					t.controls.css('visibility','visible');
				}
			}, true);

			
			// webkit has trouble doing this without a delay
			setTimeout(function () {
				t.setControlsSize();
				t.setPlayerSize(t.width, t.height);
			}, 50);
			
			
			if (t.options.success) {
				t.options.success(t.media, t.domNode);
			}		
		},
		
		handleError: function(e) {
			// Tell user that the file cannot be played
			if (this.options.error) {
				this.options.error(e);
			}
		},

		setPlayerSize: function(width,height) {
			var t = this;
			
			// ie9 appears to need this (jQuery bug?)
			t.width = parseInt(width, 10);
			t.height = parseInt(height, 10);
			
			t.container
				.width(t.width)
				.height(t.height);
				
			t.layers.children('div.mejs-layer')
				.width(t.width)
				.height(t.height);						
		},

		setControlsSize: function() {
			var t = this,				
				usedWidth = 0,		
				railWidth = 0,
				rail = t.controls.find('.mejs-time-rail'),
				total = t.controls.find('.mejs-time-total'),
				others = rail.siblings();
			
			// find the size of all the other controls besides the rail
			others.each(function() {
				if ($(this).css('position') != 'absolute') {
					usedWidth += $(this).outerWidth(true);
				}
			});
			// fit the rail into the remaining space
			railWidth = t.controls.width() - usedWidth - (rail.outerWidth(true) - rail.outerWidth(false));
			
			rail.width(railWidth);		
			total.width(railWidth - (total.outerWidth(true) - total.width()));			
		},

		
		buildposter: function(player, controls, layers, media) {			
			var poster = 	
				$('<div class="mejs-poster mejs-layer">'+
					'<img />'+
				'</div>')
					.appendTo(layers),
				posterUrl = player.$media.attr('poster');
			
			if (player.options.poster != '') {
				poster.find('img').attr('src',player.options.poster);
			} else if (posterUrl !== '' && posterUrl != null) {
				poster.find('img').attr('src',posterUrl);
			} else {
				poster.hide();
			}
						
			media.addEventListener('play',function() {
				poster.hide();
			}, false);			
		},
		
		buildoverlay: function(player, controls, layers, media) {
			if (!player.isVideo)
				return;
				
			var overlay = 	
				$('<div class="mejs-overlay mejs-layer">'+
					'<div class="mejs-overlay-button"></div>'+
				'</div>')
				.appendTo(layers)
				.click(function() {
					if (media.paused) {
						media.play();
					} else {
						media.pause();
					}
				});
				
			media.addEventListener('play',function() {
				overlay.hide();
			}, false);
			media.addEventListener('pause',function() {
				overlay.show();
			}, false);			
		},
		
		findTracks: function() {	
			var t = this,
				tracktags = t.$media.find('track');
			
			// store for use by plugins
			t.tracks = [];			
			tracktags.each(function() {				
				t.tracks.push({
					srclang: $(this).attr('srclang').toLowerCase(),
					src: $(this).attr('src'),
					kind: $(this).attr('kind'),
					entries: [],
					isLoaded: false
				});				
			});		
		},
		changeSkin: function(className) {
			this.container[0].className = 'mejs-container ' + className;
			this.setPlayerSize();
			this.setControlsSize();
		},
		play: function() {
			this.media.play();
		},
		pause: function() {
			this.media.pause();
		},
		load: function() {
			this.media.load();
		},		
		setMuted: function(muted) {
			this.media.setMuted(muted);
		},
		setCurrentTime: function(time) {
			this.media.setCurrentTime(time);
		},
		getCurrentTime: function() {
			return this.media.currentTime;
		},	
		setVolume: function(volume) {
			this.media.setVolume(volume);
		},
		getVolume: function() {
			return this.media.volume;
		},	
		setSrc: function(src) {
			this.media.setSrc(src);
		}	
	};
			
	// turn into jQuery plugin
	jQuery.fn.mediaelementplayer = function (options) {
		return this.each(function () {
			new mejs.MediaElementPlayer($(this), options);
		});
	};

	// push out to window
	window.MediaElementPlayer = mejs.MediaElementPlayer;

})(jQuery);

(function($) {
	// PLAY/pause BUTTON
	MediaElementPlayer.prototype.buildplaypause = function(player, controls, layers, media) {
		var play = 	
			$('<div class="mejs-button mejs-playpause-button mejs-play">' +
				'<span></span>' +
			'</div>')
			.appendTo(controls)
			.click(function() {
				if (media.paused) {
					media.play();
				} else {
					media.pause();
				}
			});
			
		media.addEventListener('play',function() {
			play.removeClass('mejs-play').addClass('mejs-pause');	
		}, false);
		media.addEventListener('playing',function() {
			play.removeClass('mejs-play').addClass('mejs-pause');	
		}, false);


		media.addEventListener('pause',function() {
			play.removeClass('mejs-pause').addClass('mejs-play');	
		}, false);
		media.addEventListener('paused',function() {
			play.removeClass('mejs-pause').addClass('mejs-play');	
		}, false);			

		
		
	}
})(jQuery);
(function($) {
	// progress/loaded bar
	MediaElementPlayer.prototype.buildprogress = function(player, controls, layers, media) {
			
		$('<div class="mejs-time-rail">'+
			'<span class="mejs-time-total">'+
				'<span class="mejs-time-loaded"></span>'+
				'<span class="mejs-time-current"></span>'+
				'<span class="mejs-time-handle"></span>'+
				'<span class="mejs-time-float">' + 
					'<span class="mejs-time-float-current">00:00</span>' + 
					'<span class="mejs-time-float-corner"></span>' + 
				'</span>'+
			'</span>'+
		'</div>')
			.appendTo(controls);
			
		var total = controls.find('.mejs-time-total'),
			loaded  = controls.find('.mejs-time-loaded'),
			current  = controls.find('.mejs-time-current'),
			handle  = controls.find('.mejs-time-handle'),
			timefloat  = controls.find('.mejs-time-float'),
			timefloatcurrent  = controls.find('.mejs-time-float-current'),
			setProgress = function(e) {
				if (!e) {
					return;
				}

				var
					target = e.target,
					percent = null;
				
				// newest HTML5 spec has buffered array (FF4, Webkit)
				if (target && target.buffered && target.buffered.length > 0 && target.buffered.end && target.duration) {
					// TODO: account for a real array with multiple values (only Firefox 4 has this so far) 
					percent = target.buffered.end(0) / target.duration;				
				} 
				// Some browsers (e.g., FF3.6 and Safari 5) cannot calculate target.bufferered.end()
				// to be anything other than 0. If the byte count is available we use this instead.
				// Browsers that support the else if do not seem to have the bufferedBytes value and
				// should skip to there. Tested in Safari 5, Webkit head, FF3.6, Chrome 6, IE 7/8.					
				else if (target && target.bytesTotal != undefined && target.bytesTotal > 0 && target.bufferedBytes != undefined) {
					percent = target.bufferedBytes / target.bytesTotal;
				}
				// Firefox 3 with an Ogg file seems to go this way
				else if (e.lengthComputable && e.total != 0) {
					percent = e.loaded/e.total;
				}
					
				// finally update the progress bar
				if (percent !== null) {
					percent = Math.min(1, Math.max(0, percent));
					// update loaded bar
					loaded.width(total.width() * percent);			
				}				
			}, 
			setCurrentTime = function(e) {
					
				if (media.currentTime && media.duration) {
				
					// update bar and handle				
					var 
						newWidth = total.width() * media.currentTime / media.duration,
						handlePos = newWidth - (handle.outerWidth(true) / 2);
				
					current.width(newWidth);
					handle.css('left', handlePos);

				}				
			
			},
			handleMouseMove = function (e) {
				// mouse position relative to the object
				var x = e.pageX,
					offset = total.offset(),
					width = total.outerWidth(),
					percentage = 0,
					newTime = 0;						
					
				
				if (x > offset.left && x <= width + offset.left && media.duration) {					
					percentage = ((x - offset.left) / width);
					newTime = (percentage <= 0.02) ? 0 : percentage * media.duration;
					
					// seek to where the mouse is
					if (mouseIsDown) {
						media.setCurrentTime(newTime);					
					}
					
					// position floating time box
					var pos = x - offset.left;
					timefloat.css('left', pos);
					timefloatcurrent.html( mejs.Utility.secondsToTimeCode(newTime) );					
				}
			},
			mouseIsDown = false,
			mouseIsOver = false;
	
		// handle clicks
		//controls.find('.mejs-time-rail').delegate('span', 'click', handleMouseMove);
		total
			.bind('mousedown', function (e) {
				mouseIsDown = true;
				handleMouseMove(e);				
				return false;
			});		

		controls.find('.mejs-time-rail')
			.bind('mouseenter', function(e) {
				mouseIsOver = true;
			})		
			.bind('mouseleave',function(e) {
				mouseIsOver = false;
			});
			
		$(document)
			.bind('mouseup', function (e) {
				mouseIsDown = false;
				//handleMouseMove(e);
			})
			.bind('mousemove', function (e) {
				if (mouseIsDown || mouseIsOver) {
					handleMouseMove(e);
				}
			});		
		
		// loading
		media.addEventListener('progress', function (e) {								
			setProgress(e);
		}, false);

		// current time
		media.addEventListener('timeupdate', function(e) {
			setProgress(e);
			setCurrentTime(e);
		}, false);
	}
	
})(jQuery);
(function($) {
	// current and duration 00:00 / 00:00
	MediaElementPlayer.prototype.buildcurrent = function(player, controls, layers, media) {
		$('<div class="mejs-time">'+
				'<span class="mejs-currenttime">00:00</span>'+
			'</div>')
			.appendTo(controls);
			
		media.addEventListener('timeupdate',function() {
			if (media.currentTime) {
				controls.find('.mejs-currenttime').html(mejs.Utility.secondsToTimeCode(media.currentTime));
			}		
		}, false);			
	};
	
	MediaElementPlayer.prototype.buildduration = function(player, controls, layers, media) {
		if (controls.children().last().find('.mejs-currenttime').length > 0) {
			$(' <span> | </span> '+
			   '<span class="mejs-duration">00:00</span>')
				.appendTo(controls.find('.mejs-time'));			
		} else {
		
			$('<div class="mejs-time">'+
				'<span class="mejs-duration">00:00</span>'+
			'</div>')
			.appendTo(controls);
		}
		
		media.addEventListener('timeupdate',function() {
			if (media.duration) {
				controls.find('.mejs-duration').html(mejs.Utility.secondsToTimeCode(media.duration));
			}
		}, false);			
	};	

})(jQuery);
(function($) {
	MediaElementPlayer.prototype.buildvolume = function(player, controls, layers, media) {
		var mute = 	
			$('<div class="mejs-button mejs-volume-button mejs-mute">'+
				'<span></span>'+
				'<div class="mejs-volume-slider">'+ // outer background
					'<div class="mejs-volume-total"></div>'+ // line background
					'<div class="mejs-volume-current"></div>'+ // current volume
					'<div class="mejs-volume-handle"></div>'+ // handle
				'</div>'+
			'</div>')
			.appendTo(controls),
		volumeSlider = mute.find('.mejs-volume-slider'),
		volumeTotal = mute.find('.mejs-volume-total'),
		volumeCurrent = mute.find('.mejs-volume-current'),
		volumeHandle = mute.find('.mejs-volume-handle'),
		
		positionVolumeHandle = function(volume) {
			
			var 
				top = volumeTotal.height() - (volumeTotal.height() * volume);
				
			// handle
			volumeHandle.css('top', top - (volumeHandle.height() / 2));
			
			// show the current visibility
			volumeCurrent.height(volumeTotal.height() - top + parseInt(volumeTotal.css('top').replace(/px/,''),10));
			volumeCurrent.css('top',  top);			
		},
		handleVolumeMove = function(e) {
			var	
				railHeight = volumeTotal.height(),
				totalOffset = volumeTotal.offset(),
				totalTop = parseInt(volumeTotal.css('top').replace(/px/,''),10),
				newY = e.pageY - totalOffset.top,
				volume = (railHeight - newY) / railHeight
			
			// TODO: handle vertical and horizontal CSS
			// only allow it to move within the rail
			if (newY < 0)
				newY = 0;
			else if (newY > railHeight)
				newY = railHeight;

			// move the handle to match the mouse
			volumeHandle.css('top', newY - (volumeHandle.height() / 2) + totalTop );
			
			// show the current visibility
			volumeCurrent.height(railHeight-newY);
			volumeCurrent.css('top',newY+totalTop);

			// set mute status
			if (volume == 0) {
				media.setMuted(true);
				mute.removeClass('mejs-mute').addClass('mejs-unmute');
			} else {
				media.setMuted(false);
				mute.removeClass('mejs-unmute').addClass('mejs-mute');
			}
			
			volume = Math.max(0,volume);
			volume = Math.min(volume,1);
			
			// set the volume
			media.setVolume(volume);
		},
		mouseIsDown = false;

		// SLIDER
		volumeSlider
			.bind('mousedown', function (e) {
				handleVolumeMove(e);
				mouseIsDown = true;
				return false;
			});
		$(document)
			.bind('mouseup', function (e) {
				mouseIsDown = false;
			})
			.bind('mousemove', function (e) {
				if (mouseIsDown) {
					handleVolumeMove(e);
				}
			});
				
			
		// MUTE button
		mute.find('span').click(function() {
			if (media.muted) {
				media.setMuted(false);
				mute.removeClass('mejs-unmute').addClass('mejs-mute');
				positionVolumeHandle(1);
			} else {
				media.setMuted(true);
				mute.removeClass('mejs-mute').addClass('mejs-unmute');
				positionVolumeHandle(0);
			}				
		});
		
		// listen for volume change events from other sources
		media.addEventListener('volumechange', function(e) {
			if (!mouseIsDown) {
				positionVolumeHandle(e.target.volume);
			}
		}, true);
		
		// set initial volume
		//player.options.startVolume = Math.min(Math.max(0,player.options.startVolume),1);	
		positionVolumeHandle(player.options.startVolume);
		media.setVolume(player.options.startVolume);		
	}

})(jQuery);
(function($) {
	MediaElementPlayer.prototype.buildfullscreen = function(player, controls, layers, media) {
			
		if (!player.isVideo)
			return;
	
		var 
			isFullScreen = false,
			normalHeight = 0,
			normalWidth = 0,	
			container = player.container,
			fullscreenBtn = 	
				$('<div class="mejs-button mejs-fullscreen-button"><span></span></div>')
				.appendTo(controls)
				.click(function() {
					setFullScreen(!isFullScreen);
				}),				
			setFullScreen = function(goFullScreen) {				
				switch (media.pluginType) {
					case 'flash':
					case 'silverlight':
						media.setFullscreen(goFullScreen);
						break;
					case 'native':

						if (mejs.MediaFeatures.hasNativeFullScreen) {								
							if (goFullScreen) {
								media.webkitEnterFullScreen();
							} else {
								media.webkitExitFullScreen();
							}							
						} else {			
							if (goFullScreen) {

								// store
								normalHeight = player.$media.height();
								normalWidth = player.$media.width();

								// make full size
								container
									.addClass('mejs-container-fullscreen')
									.width('100%')
									.height('100%')
									.css('z-index', 1000);

								player.$media
									.width('100%')
									.height('100%');
									

								layers.children('div')
									.width('100%')
									.height('100%');						
								
								fullscreenBtn
									.removeClass('mejs-fullscreen')
									.addClass('mejs-unfullscreen');

								player.setControlsSize();
							} else {

								container
									.removeClass('mejs-container-fullscreen')
									.width(normalWidth)
									.height(normalHeight)
									.css('z-index', 1);
									
								player.$media
									.width(normalWidth)
									.height(normalHeight);

								layers.children('div')
									.width(normalWidth)
									.height(normalHeight);						
									
								fullscreenBtn
									.removeClass('mejs-unfullscreen')
									.addClass('mejs-fullscreen');

								player.setControlsSize();
							}
						}
				}								
				isFullScreen = goFullScreen;
			};
		
		$(document).bind('keydown',function (e) {
			if (isFullScreen && e.keyCode == 27) {
				setFullScreen(false);
			}
		});
		
	}


})(jQuery);
(function($) {
	
	// add extra default options 
	$.extend(mejs.MepDefaults, {
		// this will automatically turn on a <track>
		startLanguage: '',
		// a list of languages to auto-translate via Google
		translations: [],
		// a dropdownlist of automatic translations
		translationSelector: false,	
		// key for tranlsations
		googleApiKey: ''
	});
	
	$.extend(MediaElementPlayer.prototype, {
		
		buildtracks: function(player, controls, layers, media) {	
			if (!player.isVideo)
				return;
				
			if (player.tracks.length == 0)
				return;
				
			var i, options = '';
		
			player.chapters = 
					$('<div class="mejs-chapters mejs-layer"></div>')
						.prependTo(layers).hide();
			player.captions = 
					$('<div class="mejs-captions-layer mejs-layer"><div class="mejs-captions-position"><span class="mejs-captions-text"></span></div></div>')
						.prependTo(layers).hide();
			player.captionsText = player.captions.find('.mejs-captions-text');
			player.captionsButton = 
					$('<div class="mejs-button mejs-captions-button">'+
						'<span></span>'+
						'<div class="mejs-captions-selector">'+
							'<ul>'+
								'<li>'+
									'<input type="radio" name="' + player.id + '_captions" id="' + player.id + '_captions_none" value="none" checked="checked" />' +
									'<label for="' + player.id + '_captions_none">None</label>'+										
								'</li>'	+
							'</ul>'+
						'</div>'+							
					'</div>')
						.appendTo(controls)
						// handle clicks to the language radio buttons
						.delegate('input[type=radio]','click',function() {				
							lang = this.value;	
							
							if (lang == 'none') {
								player.selectedTrack = null;
							} else {				
								for (i=0; i<player.tracks.length; i++) {
									if (player.tracks[i].srclang == lang) {
										player.selectedTrack = player.tracks[i];
										player.captions.attr('lang', player.selectedTrack.srclang);
										player.displayCaptions();
										break;
									}
								}	
							}
						});
						//.bind('mouseenter', function() {
						//	player.captionsButton.find('.mejs-captions-selector').css('visibility','visible')						
						//});
			// move with controls
			player.container
				.bind('mouseenter', function () {
					// push captions above controls
					var p = player.container.find('.mejs-captions-position');
					p.css('bottom', (parseInt(p.css('bottom').replace(/px/,''), 10) + player.controls.height()) + 'px');
					
				})
				.bind('mouseleave', function () {
					if (!media.paused) {
						// move back to normal place
						player.container.find('.mejs-captions-position').css('bottom','');
					}
				});
			
			
			
						
			player.trackToLoad = -1;
			player.selectedTrack = null;
			player.isLoadingTrack = false;
				
			// add user-defined translations
			if (player.tracks.length > 0 && player.options.translations.length > 0) {
				for (i=0; i<player.options.translations.length; i++) {
					player.tracks.push({
						srclang: player.options.translations[i].toLowerCase(),
						src: null,
						kind: 'subtitles', 
						entries: [],
						isLoaded: false,
						isTranslation: true
					});
				}				
			}
			
			// add to list
			for (i=0; i<player.tracks.length; i++) {
				if (player.tracks[i].kind == 'subtitles') {
					player.addTrackButton(player.tracks[i].srclang, player.tracks[i].isTranslation);	
				}
			}
			
			player.loadNextTrack();	


			media.addEventListener('timeupdate',function(e) {
				player.displayCaptions();
			}, false);
			
			media.addEventListener('loadedmetadata', function(e) {
				player.displayChapters();
			}, false);

			player.container.hover(
				function () {
					// chapters
					player.chapters.css('visibility','visible');						
					player.chapters.fadeIn(200);
				},
				function () {
					if (!media.paused) {
						player.chapters.fadeOut(200, function() {
							$(this).css('visibility','hidden');
							$(this).css('display','block');
						});												
					}
				});

			// auto selector
			if (player.options.translationSelector) {				
				for (i in mejs.language.codes) {
					options += '<option value="' + i + '">' + mejs.language.codes[i] + '</option>';
				}
				player.container.find('.mejs-captions-selector ul').before($(					
					'<select class="mejs-captions-translations">' +
						'<option value="">--Add Translation--</option>' +
						options +
					'</select>'
				));
				// add clicks
				player.container.find('.mejs-captions-translations').change(function() {
					var
						option = $(this);
						lang = option.val();
					// add this language to the tracks list
					if (lang != '') {
						player.tracks.push({
							srclang: lang,
							src: null,
							entries: [],
							isLoaded: false,
							isTranslation: true
						});	
						
						if (!player.isLoadingTrack) {
							player.trackToLoad--;
							player.addTrackButton(lang,true);
							player.options.startLanguage = lang;
							player.loadNextTrack();							
						}
					}
				});
			}				
			
		},
	
		loadNextTrack: function() {
			var t = this;
			
			t.trackToLoad++;
			if (t.trackToLoad < t.tracks.length) {
				t.isLoadingTrack = true;
				t.loadTrack(t.trackToLoad);
			} else {
				// add done?
				t.isLoadingTrack = false;				
			}
		},

		loadTrack: function(index){
			var
				t = this,
				track = t.tracks[index],
				after = function() {
					
					track.isLoaded = true;
						
					// create button
					//t.addTrackButton(track.srclang);
					t.enableTrackButton(track.srclang);					
					
					t.loadNextTrack();
				
				};
				
			if (track.isTranslation) {
			
				// translate the first track
				mejs.SrtParser.translateSrt(t.tracks[0].entries, t.tracks[0].srclang, track.srclang, t.options.googleApiKey, function(newOne) {								
					
					// store the new translation
					track.entries = newOne;
					
					after();
				});
				
			} else {
				$.ajax({
					url: track.src,
					success: function(d) {
						
						// parse the loaded file
						track.entries = mejs.SrtParser.parse(d);						
						after();
						
						if (track.kind == 'chapters' && t.media.duration > 0) {
							t.drawChapters(track);
						}
					},
					error: function() {
						t.loadNextTrack();								
					}
				});
			}
		},
		
		enableTrackButton: function(lang) {
			var t = this;
			
			t.captionsButton
				.find('input[value=' + lang + ']')
					.attr('disabled','')
				.siblings('label')
					.html( mejs.language.codes[lang] || lang );

			// auto select
			if (t.options.startLanguage == lang) {
				$('#' + t.id + '_captions_' + lang).click();
			}					
					
			t.adjustLanguageBox();
		},
		
		addTrackButton: function(lang, isTranslation) {
			var t = this,
				l = mejs.language.codes[lang] || lang;
			
			t.captionsButton.find('ul').append(
				$('<li>'+
					'<input type="radio" name="' + t.id + '_captions" id="' + t.id + '_captions_' + lang + '" value="' + lang + '" disabled="disabled" />' +
					'<label for="' + t.id + '_captions_' + lang + '">' + l + ((isTranslation) ? ' (translating)' : ' (loading)') + '</label>'+										
				'</li>')
			);
			
			t.adjustLanguageBox();
			
			// remove this from the dropdownlist (if it exists)
			t.container.find('.mejs-captions-translations option[value=' + lang + ']').remove();
		},	

		adjustLanguageBox:function() {
			var t = this;
			// adjust the size of the outer box
			t.captionsButton.find('.mejs-captions-selector').height(
				t.captionsButton.find('.mejs-captions-selector ul').outerHeight(true) +
				t.captionsButton.find('.mejs-captions-translations').outerHeight(true)
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
					if (t.media.currentTime >= track.entries.times[i].start && t.media.currentTime <= track.entries.times[i].stop){						
						t.captionsText.html(track.entries.text[i]);
						t.captions.show();
						return; // exit out if one is visible;
					}
				}
				t.captions.hide();
			} else {
				t.captions.hide();
			}
		},
		
		displayChapters: function() {
			var 
				t = this,
				i;
			
			for (i=0; i<t.tracks.length; i++) {
				if (t.tracks[i].kind == 'chapters' && t.tracks[i].isLoaded) {
					t.drawChapters(t.tracks[i]);
					break;
				}
			}
		},
		
		drawChapters: function(chapters) {			
			var 
				t = this,
				i,
				dur,
				//width,
				//left,
				percent = 0,
				usedPercent = 0;
			
			t.chapters.empty();
			
			for (i=0; i<chapters.entries.times.length; i++) {
				dur = chapters.entries.times[i].stop - chapters.entries.times[i].start;
				percent = Math.floor(dur / t.media.duration * 100);
				if (percent + usedPercent > 100 || // too large
					i == chapters.entries.times.length-1 && percent + usedPercent < 100) // not going to fill it in
					{
					percent = 100 - usedPercent;
				}
				//width = Math.floor(t.width * dur / t.media.duration);
				//left = Math.floor(t.width * chapters.entries.times[i].start / t.media.duration);
				//if (left + width > t.width) {
				//	width = t.width - left;
				//}
				
				t.chapters.append( $(
					'<div class="mejs-chapter" rel="' + chapters.entries.times[i].start + '" style="left: ' + usedPercent.toString() + '%;width: ' + percent.toString() + '%;">' + 
						'<div class="mejs-chapter-block' + ((i==chapters.entries.times.length-1) ? ' mejs-chapter-block-last' : '') + '">' + 
							'<span class="ch-title">' + chapters.entries.text[i] + '</span>' + 
							'<span class="ch-time">' + mejs.Utility.secondsToTimeCode(chapters.entries.times[i].start) + '&ndash;' + mejs.Utility.secondsToTimeCode(chapters.entries.times[i].stop) + '</span>' + 
						'</div>' +
					'</div>'));
				usedPercent += percent;
			}
			
			t.chapters.find('div.mejs-chapter').click(function() {
				t.media.setCurrentTime( parseFloat( $(this).attr('rel') ) );
				if (t.media.paused) {
					t.media.play(); 
				}
			});
			
			t.chapters.show();
		}
	});
	
	
	
	mejs.language = {
		codes:  {
			af:'Afrikaans',
			sq:'Albanian',
			ar:'Arabic',
			be:'Belarusian',
			bg:'Bulgarian',
			ca:'Catalan',
			zh:'Chinese',
			'zh-cn':'Chinese Simplified',
			'zh-tw':'Chinese Traditional',
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
			ht:'Haitian Creole',
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
			//'pt-pt':'Portuguese (Portugal)',
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
	mejs.SrtParser = {	
		pattern_identifier: /^[0-9]+$/,
		pattern_timecode: /^([0-9]{2}:[0-9]{2}:[0-9]{2}(,[0-9]{1,3})?) --\> ([0-9]{2}:[0-9]{2}:[0-9]{2}(,[0-9]{3})?)(.*)$/,		
		timecodeToSeconds: function(timecode){
			var tab = timecode.split(':');
			return tab[0]*60*60 + tab[1]*60 + parseFloat(tab[2].replace(',','.'));
		},
		split2: function (text, regex) {
			// normal version for compliant browsers
			// see below for IE fix
			return text.split(regex);
		},		
		parse: function(srtText) {
			var 	
				i = 0,
				lines = this.split2(srtText, /\r?\n/),
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
		
		translateSrt: function(srtData, fromLang, toLang, googleApiKey, callback) {
			
			var 				
				entries = {text:[], times:[]},
				lines,
				i			
			
			this.translateText( srtData.text.join(' <a></a>'), fromLang, toLang, googleApiKey, function(result) {
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
		
		translateText: function(text, fromLang, toLang, googleApiKey, callback) {
		
			var
				separatorIndex,
				chunks = [],
				chunk,
				maxlength = 1000,
				result = '',
				nextChunk= function() {
					if (chunks.length > 0) {
						chunk = chunks.shift();
						mejs.SrtParser.translateChunk(chunk, fromLang, toLang, googleApiKey, function(r) {
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
		translateChunk: function(text, fromLang, toLang, googleApiKey, callback) {
			
			var data = {
				q: text, 
				langpair: fromLang + '|' + toLang,
				v: '1.0'
			};
			if (googleApiKey !== '' && googleApiKey !== null) {
				data.key = googleApiKey;
			}
			
			$.ajax({
				url: 'https://ajax.googleapis.com/ajax/services/language/translate', // 'https://www.google.com/uds/Gtranslate', //'https://ajax.googleapis.com/ajax/services/language/translate', //
				data: data,
				type: 'GET',
				dataType: 'jsonp',
				success: function(d) {
					callback(d.responseData.translatedText);						
				},
				error: function(e) {
					callback(null);
				}
			});			
		}
	};	
	// test for browsers with bad String.split method.
	if ('x\n\ny'.split(/\n/gi).length != 3) {
		// add super slow IE8 and below version
		mejs.SrtParser.split2 = function(text, regex) {			
			var 
				parts = [], 
				chunk = '',
				i;
			
			for (i=0; i<text.length; i++) {
				chunk += text.substring(i,i+1);
				if (regex.test(chunk)) {					
					parts.push(chunk.replace(regex, ''));
					chunk = '';
				}
			}
			parts.push(chunk);
			return parts;
		}
	}
	
	
})(jQuery);

