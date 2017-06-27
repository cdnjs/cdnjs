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
 * Version: 1.0.X
 */
 
 /*
 - removing vars... JSLint
 - removed SWFObject and MS detection
 - unified object types
 - moved utility functions into single object
 */

(function () {
	
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
	var PluginDetector = {

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
	PluginDetector.addPlugin('flash','Shockwave Flash','application/x-shockwave-flash','ShockwaveFlash.ShockwaveFlash', function(ax) {
		var version = [],
			d = ax.GetVariable("$version");
		if (d) {
			d = d.split(" ")[1].split(",");
			version = [parseInt(d[0], 10), parseInt(d[1], 10), parseInt(d[2], 10)];
		}
		return version;
	});

	// Add Silverlight detection
	// Silverlight cannot report its version number to IE
	// but it does have a isVersionSupported function, so we have to loop through it to get a version number.
	// adapted from http://www.silverlightversion.com/
	PluginDetector.addPlugin('silverlight','Silverlight Plug-In','application/x-silverlight-2','AgControl.AgControl', function (ax) {
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
		
	// special case for Android (yes, this really is necessary)
	if (PluginDetector.ua.match(/Android 2\.[12]/) != null) {
		HTMLMediaElement.canPlayType = function(type) {
			return (type.match(/video\/(mp4m4v)/) != null) ? 'probably' : '';
		}
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
			var path = '';
			var scripts = document.getElementsByTagName('script');

			for (var i = 0; i < scripts.length; i++) {
				var script = scripts[i].src;
				for (var j = 0; j < scriptNames.length; j++) {
					var name = scriptNames[j];				
					if (script.indexOf(name) > -1) {					
						path = script.substring(0, script.indexOf(name));
						break;
					}
				}
				if (path != '')
					break;
			}
			return path;
		}		
	}

	
	/*
	Default options
	*/
	var mediaElementDefaults = {
		  enablePluginDebug: false
		, plugins: ['silverlight', 'flash'] // remove or reorder to change
		, type: ''
		, flashName: 'flashmediaelement.swf'
		, silverlightName: 'silverlightmediaelement.xap'
		, defaultVideoWidth: 480   	// default if the <video width> is not specified
		, defaultVideoHeight: 270  	// default if the <video height> is not specified		
		, pluginPath: html5.Utility.getScriptPath(['mediaelement.js','mediaelement.min.js','mediaelement-and-player.js','mediaelement-and-player.min.js'])
		, pluginWidth: -1   				// overrides <video width>
		, pluginHeight: -1  				// overrides <video height>
		, success: function () { }
		, error: function () { }
	}

	/*
	Determines if a browser supports the <video> or <audio> element
	and returns either the native element or a Flash/Silverlight version that
	mimics HTML5 MediaElement
	*/
	html5.MediaElement = function (el, o) {
		
		// locals
		var mediaElement = (typeof(el) == 'string') ? document.getElementById(el) : el,
			isVideo = (mediaElement.tagName.toLowerCase() == 'video'),
			// media type settings
			supportsMediaTag = (typeof(mediaElement.canPlayType) != 'undefined'),
			canPlayMedia = false,
			urlForPlugin = '',
			pluginType = '',
			downloadUrl = '',
			options = mediaElementDefaults;
			
		// extend options
		for (var prop in o) {
			options[prop] = o[prop];
		}

		// test for HTML media playback
		function testMedia(type, src) {

			// Special case for Android which sadly does not report on media.canPlayType()
			// It's always a blank string (as of Android 2.1, tested on Samsung S)
			/*
			if (navigator.userAgent.indexOf('Android') > -1 && (type == 'video/mp4' || type == 'video/m4v' || type == 'video/mov')) {
				canPlayMedia = true;
				return;
			}
			*/

			// create fake type if needed
			if (src && !type) {
				var extension = src.substring(src.lastIndexOf('.') + 1);
				type = ((isVideo) ? 'video' : 'audio') + '/' + extension;
			}

			// continue normal testing
			if (supportsMediaTag && mediaElement.canPlayType(type).replace(/no/, '') != '') {
				canPlayMedia = true;

			} else {

				// go through allowed plugin types
				for (pi=0; pi<options.plugins.length; pi++) {
					// get the plugin and its allowe media types
					var plugin = options.plugins[pi];
					var mediaTypes = html5.plugins[plugin];

					// test for plugin playback types
					for (var fi=0; fi<mediaTypes.length; fi++) {
						// find plugin that can play the type
						if (type == mediaTypes[fi].type && PluginDetector.hasPluginVersion(plugin, mediaTypes[fi].version)) {
							urlForPlugin = src;
							pluginType = plugin;
						}
					}
				}
			}
		}

		// supplied type overrides all HTML
		if (typeof (options.type) != 'undefined' && options.type != '') {
				testMedia(options.type, null);

		// test for src attribute first
		} else if (mediaElement.getAttribute('src') != 'undefined' && mediaElement.getAttribute('src') != null) {

			var src = mediaElement.getAttribute('src');
			var type = mediaElement.getAttribute('type');

			testMedia(type, src);
			
			downloadUrl = src;

		// then test for <source> elements
		} else {

			// test <source> types to see if they are usable
			// pull out one Flash can use
			for (var i = 0; i < mediaElement.childNodes.length; i++) {
				var el = mediaElement.childNodes[i];

				if (el.nodeType == 1 && el.tagName.toLowerCase() == 'source') {
					var type = el.getAttribute('type');
					var src = el.getAttribute('src');

					testMedia(type, src);
					
					if (downloadUrl == '')
						downloadUrl = src;
				}							
			}					
		}

		// Special case for Safari without Quicktime (happens on both Mac and PC).
		// Safari just acts like <video> tags are invalid HTML
		if (!supportsMediaTag && navigator.userAgent.indexOf('Safari') > -1) {
			mediaElement.innerHTML = 'You need to install Quicktime for Safari to operate properly. Weird, huh?';
			options.error(mediaElement);
			return;
		}

		//console.log(canPlayMedia, pluginType);

		// use native <audio> or <video> with existing media
		if (canPlayMedia) {

			// add methods to video object to bring it into parity with Flash Object
			for (var m in html5.HtmlMediaElement) {
				mediaElement[m] = html5.HtmlMediaElement[m];
			}

			// make sure it autoplays on slow connections
			var hasStarted = false;
			var autoplay = (mediaElement.getAttribute('autoplay') != null);

			if (autoplay) {
				function checkForPlaying() {
					if (!hasStarted) {
						mediaElement.play();
					}
				}
				var evts = 'progress timeupdate'.split(' ');
				function addCheckEvents() {
					for (var i in evts) {
						mediaElement.addEventListener(evts[i], checkForPlaying, false);
					}
				}
				function removeCheckEvents() {
					for (var i in evts) {
						mediaElement.removeEventListener(evts[i], checkForPlaying, false);
					}
				}
				addCheckEvents();
				mediaElement.addEventListener('playing', function () {
					hasStarted = true;
					removeCheckEvents();
				}, true);
			}

			// fire ready code
			options.success(mediaElement, mediaElement);

			// return normal media element
			return mediaElement;

			// replace with plug version that mimics HTML media
		} else if (pluginType != '') {
			var width = 1,
				height = 1,
				pluginid = 'me_' + pluginType + '_' + (html5.meIndex++),
				mediaUrl = (urlForPlugin != null) ? html5.Utility.absolutizeUrl(urlForPlugin) : '',
				posterUrl = (mediaElement.getAttribute('poster') == null) ? mediaElement.getAttribute('poster') : '',
				autoplay = (mediaElement.getAttribute('autoplay') != null);

			if (isVideo) {
				// options.videoWidth > mediaElement.getAttribute('width') > options.defaultVideoWidth
				width = (options.videoWidth > 0) ?  options.videoWidth : (mediaElement.getAttribute('width') !== null) ? mediaElement.getAttribute('width') : options.defaultVideoWidth;
				height = (options.videoHeight > 0) ?  options.videoHeight : (mediaElement.getAttribute('height') !== null) ? mediaElement.getAttribute('height') : options.defaultVideoHeight;				
			} else {
				if (options.enablePluginDebug) {
					width = 320;
					height = 240;					
				}
			}

			// register plugin
			var pluginMediaElement = new html5.PluginMediaElement(pluginid, pluginType);
			pluginMediaElement.success = options.success;
			html5.MediaPluginBridge.registerPluginElement(pluginid, pluginMediaElement, mediaElement);

			// create wrapper <div>
			var container = document.createElement('div');
			container.className = 'me-plugin';
			// must be added to DOM before inserting HTML for IE
			mediaElement.parentNode.insertBefore(container, mediaElement);

			// flash/silverlight vars
			var initVars = [
				'id=' + pluginid,
				'poster=' + posterUrl,
				'autoplay=' + autoplay,
				'width=' + width,
				'height=' + height];

			if (mediaUrl != null)
				initVars.push('file=' + mediaUrl);
			if (options.enablePluginDebug)
				initVars.push('debug=true');

			var html = '';
			switch (pluginType) {
				case 'silverlight':
					container.innerHTML =
'<object data="data:application/x-silverlight-2," type="application/x-silverlight-2"\
id="' + pluginid + '" width="' + width + '" height="' + height + '">\
<param name="initParams" value="' + initVars.join(',') + '" />\
<param name="windowless" value="true" />\
<param name="background" value="black" />\
<param name="minRuntimeVersion" value="3.0.0.0" />\
<param name="autoUpgrade" value="true" />\
<param name="source" value="' + options.pluginPath + options.silverlightName + '" />\
</object>';
						break;

				case 'flash':

					if (navigator.appName.indexOf("Microsoft") != -1) {
						container.outerHTML =
'<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab"\
id="' + pluginid + '" width="' + width + '" height="' + height + '"> \
<param name="movie" value="' + options.pluginPath + options.flashName + '?x=' + (new Date()) + '" /> \
<param name="flashvars" value="' + initVars.join('&') + '" /> \
<param name="quality" value="high" /> \
<param name="bgcolor" value="#000000" /> \
<param name="wmode" value="transparent" /> \
<param name="allowScriptAccess" value="sameDomain" /> \
<param name="allowFullScreen" value="true" /> \
</object>';

					} else {

						container.innerHTML =
'<embed name="' + pluginid + '" \
play="true" \
loop="false" \
quality="high" \
bgcolor="#000000" \
wmode="transparent" \
allowScriptAccess="sameDomain" \
allowFullScreen="true" \
type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" \
src="' + options.pluginPath + options.flashName + '?' + initVars.join('&') + '" \
width="' + width + '" \
height="' + height + '"></embed>';
					}
					break;
			}
			// hide original element
			mediaElement.style.display = 'none';

			// return fake media object
			return pluginMediaElement;
		} else {
			var div = document.createElement('div');
			div.className = 'me-cannotplay';
			try {
				div.style.width = mediaElement.width + 'px';
				div.style.height = mediaElement.height + 'px';
			} catch (e) {}
			var poster = mediaElement.getAttribute('poster');
			
			if (poster == 'undefined' || poster == '' || poster == null)
				div.innerHTML = '<a href="' + downloadUrl + '">Download file</a>';
			else
				div.innerHTML = '<a href="' + downloadUrl + '"><img src="' + mediaElement.getAttribute('poster') + '" /></a>';
			mediaElement.parentNode.insertBefore(div, mediaElement);
			mediaElement.style.display = 'none';

			options.error(mediaElement);
		}
	}

	/*
	extension methods to <video> or <audio> object to bring it into parity with PluginMediaElement (see below)
	*/
	html5.HtmlMediaElement = {
			pluginType: 'native'

		, setCurrentTime: function (time) {
			this.currentTime = time;
		}
		, setMuted: function (muted) {
			this.muted = muted;
		}
		, setVolume: function (volume) {
			this.volume = volume;
		}
		, setSrc: function (url) {
			this.src = url;
		}

		, setVideoSize: function (width, height) {
			this.width = width;
			this.height = height;
		}
	}

	/*
	Mimics the <video/audio> element by calling Flash's External Interface or Silverlights [ScriptableMember]
	*/
	html5.PluginMediaElement = function (pluginid, pluginType) {

		var events = {};

		// JavaScript values and ExternalInterface methods that match HTML5 video properties methods
		// http://www.adobe.com/livedocs/flash/9.0/ActionScriptLangRefV3/fl/video/FLVPlayback.html
		// http://www.whatwg.org/specs/web-apps/current-work/multipage/video.html
		return {

			// special
				id: pluginid
			, pluginType: pluginType
			, pluginElement: null

			// not implemented :(
			, playbackRate: -1
			, defaultPlaybackRate: -1
			, seekable: []
			, played: []

			// HTML5 read-only properties
			, paused: true
			, ended: false
			, seeking: false
			, duration: 0

			// HTML5 get/set properties, but only set (updated by event handlers)
			, muted: false
			, volume: 1
			, currentTime: 0

			// HTML5 methods
			, play: function () {
				this.pluginApi.playMedia();
				this.paused = false;
			}
			, load: function () {
				this.pluginApi.loadMedia();
				this.paused = false;
			}
			, pause: function () {
				this.pluginApi.pauseMedia();
				this.paused = true;
			}

			// custom methods since not all JavaScript implementations support get/set
			, setSrc: function (url) {
				this.pluginApi.setSrc(html5.Utility.absolutizeUrl(url));
			}
			, setCurrentTime: function (time) {
				this.pluginApi.setCurrentTime(time);
				this.currentTime = time;
			}
			, setVolume: function (volume) {
				this.pluginApi.setVolume(volume);
				this.volume = volume;
			}
			, setMuted: function (muted) {
				this.pluginApi.setMuted(muted);
				this.muted = muted;
			}

			// additional non-HTML5 methods
			, setVideoSize: function (width, height) {					
				if ( this.pluginElement.style) {
					this.pluginElement.style.width = width + 'px';
					this.pluginElement.style.height = height + 'px';						
				}

				this.pluginApi.setVideoSize(width, height);
			}
			, setFullscreen: function (fullscreen) {
				this.pluginApi.setFullscreen(fullscreen);
			}

			// start: fake events
			, addEventListener: function (eventName, callback, bubble) {
				events[eventName] = events[eventName] || [];
				events[eventName].push(callback);
			}
			, dispatchEvent: function (eventName) {
				var i, callbacks = events[eventName], args;
				if (callbacks) {
					args = Array.prototype.slice.call(arguments, 1);
					for (i = 0; i < callbacks.length; i++) {
						callbacks[i].apply(null, args);
					}
				}
			}
			// end: fake events
		}
	};

	// Flash makes calls through this object to the fake <video/audio> object
	html5.MediaPluginBridge = (function () {

		var pluginMediaElements = [],
			mediaElements = [];

		return {
			registerPluginElement: function (id, pluginMediaElement, mediaElement) {
				pluginMediaElements[id] = pluginMediaElement;
				mediaElements[id] = mediaElement;
			}

			// when Flash/Silverlight is ready, it calls out to this method
			, initPlugin: function (id) {
				
				var pluginMediaElement = pluginMediaElements[id],
					mediaElement = mediaElements[id];
			
				// find the javascript bridge
				switch (pluginMediaElement.pluginType) {
					case "flash":
						// magic
						if (navigator.appName.indexOf("Microsoft") != -1) {
							pluginMediaElement.pluginElement = pluginMediaElement.pluginApi = window[id];
							// TODO: switch to document.getElementById()
							
						} else {
							pluginMediaElement.pluginElement = pluginMediaElement.pluginApi = document[id];
						}
						break;
					case "silverlight":
						pluginMediaElement.pluginElement = document.getElementById(pluginMediaElement.id);
						pluginMediaElement.pluginApi = pluginMediaElement.pluginElement.Content.SilverlightApp;

						break;
				}

				if (pluginMediaElement.success)
					pluginMediaElement.success(pluginMediaElement, mediaElement);
			}

			// receives events from Flash/Silverlight and sends them out as HTML5 media events
			// http://www.whatwg.org/specs/web-apps/current-work/multipage/video.html
			, fireEvent: function (id, eventName, values) {

				var pluginMediaElement = pluginMediaElements[id];
				pluginMediaElement.ended = false;
				pluginMediaElement.paused = false;

				// fake event object to mimic real HTML media event.
				var e = {
					type: eventName,
					target: pluginMediaElement
				};

				// attach all values to element and event object
				for (var i in values) {
					pluginMediaElement[i] = values[i];
					e[i] = values[i];
				}

				// fake the new W3C buffered TimeRange (loaded and total have been removed)
				var bufferedTime = values.bufferedTime || 0;
				e.target.buffered = e.buffered = { start: function(index) { return 0; }, end: function (index) { return bufferedTime; }, length: 1 }

				pluginMediaElement.dispatchEvent(e.type, e);
			}
		};

	} ());

	window.html5 = html5;
	window.MediaElement = html5.MediaElement;
})();
