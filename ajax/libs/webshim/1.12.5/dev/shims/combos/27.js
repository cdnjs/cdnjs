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

	if(!Modernizr.video){
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
;webshims.register('filereader', function( $, webshims ){
	"use strict";
	/**
	 * Code is based on https://github.com/Jahdrien/FileReader
	 * 
	 */
	(function(){
		var swfobject = window.swfmini || window.swfobject;
	
		var readyCallbacks = $.Callbacks('once unique memory'),
		inputsCount = 0,
		currentTarget = null;
	
		// if native FileReader support, then dont add the polyfill and make the plugin do nothing
		if (window.FileReader) {
			$.fn.fileReader = function () { return this; }
			return ;
		}
		
		/**
		* JQuery Plugin
		*/
		$.fn.fileReader = function( options ) {  
			if(this.length){
				options = $.extend($.fn.fileReader.defaults, options);
				
				var self = this;
				readyCallbacks.add(function() {
					return main(self, options);
				});
				if ($.isFunction(options.callback)) readyCallbacks.add(options.callback);
				
				if (!FileAPIProxy.ready) {
					FileAPIProxy.init(options);
				}
			}
			return this;
		};
		
		/**
		* Default options
		*  	allows user set default options
		*/
		$.fn.fileReader.defaults = {
			id              : 'fileReaderSWFObject', // ID for the created swf object container,
			multiple        : null,
			accept          : null,
			label           : null,
			extensions      : null,
			filereader      : 'files/filereader.swf', // The path to the filereader swf file
			expressInstall  : null, // The path to the express install swf file
			debugMode       : false,
			callback        : false // Callback function when Filereader is ready
		};
		
		/**
		* Plugin callback
		*     adds an input to registry
		*/
		var main = function(el, options) {
			return el.each(function(i, input) {
				input = $(input);
				var id = input.attr('id');
				var multiple, accept, label;
				if (!id) {
					id = 'flashFileInput' + inputsCount;
					input.attr('id', id);
					inputsCount++;
				}
				multiple = input.prop('multiple');
				accept = input.data('swfaccept') || input.prop('accept') ||  options.accept;
				label = input.jProp('labels')
					.map(function(){
						return $(this).text();
					}).get().join(' ') ||
					input.data('swflabel') || 
					options.label;

				FileAPIProxy.inputs[id] = input;
				FileAPIProxy.swfObject.add(id, multiple, accept, label, options.extensions);
				
				input.css('z-index', 0)
					.mouseover(function (e) {
						if (id !== currentTarget) {
							e = e || window.event;
							currentTarget = id;
							FileAPIProxy.swfObject.mouseover(id);
							FileAPIProxy.container
								.height(input.outerHeight())
								.width(input.outerWidth())
								.css(input.offset());
						}
					})
					.click(function(e) {
						e.preventDefault();
						e.stopPropagation();
						e.stopImmediatePropagation();
						return false;
					});
			});
		};
		
		/**
		* Flash FileReader Proxy
		*/
		window.FileAPIProxy = {
			ready: false,
			_inititalized: false,
			init: function(o) {
				var self = this;
				this.debugMode = o.debugMode;
				
				if(!this.container){
					this.container = $('<div>').attr('id', o.id)
						.wrap('<div>')
						.parent()
						.css({
							position:'fixed',
							// top:'0px',
							width:'1px',
							height:'1px',
							display:'inline-block',
							background:'transparent',
							'z-index':99999
						})
						// Hands over mouse events to original input for css styles
						.on('mouseover mouseout mousedown mouseup', function(evt) {
							if(currentTarget){
								$('#' + currentTarget).trigger(evt.type);
							}
						})
						.appendTo('body');
					
					swfobject.embedSWF(o.filereader, o.id, '100%', '100%', '10', o.expressInstall, {debugMode: o.debugMode ? true : ''}, {'wmode':'transparent','allowScriptAccess':'sameDomain'}, {}, function(e) {
						self.swfObject = e.ref;
						$(self.swfObject)
							.css({
								display: 'block',
								outline: 0
							})
							.attr('tabindex', 0);
							
						self.ready = e.success && typeof e.ref.add === "function";
						
						if (self.ready) {
							readyCallbacks.fire();
						}
					});
				}
			},
			swfObject: null,
			container: null,
			// Inputs Registry
			inputs: {},
			// Readers Registry
			readers: {},
			// Receives FileInput events
			onFileInputEvent: function(evt) {
				if (this.debugMode) console.info('FileInput Event ', evt.type, evt);
				if (evt.target in this.inputs) {
					var el = this.inputs[evt.target];
					evt.target = el[0];
					if( evt.type === 'change') {
						webshims.data(evt.target, 'fileList', new FileList(evt.files));
					}
					el.trigger(evt);
				}
				window.focus();
			},
			// Receives FileReader ProgressEvents
			onFileReaderEvent: function(evt) {
				if (this.debugMode) console.info('FileReader Event ', evt.type, evt, evt.target in this.readers);
				if (evt.target in this.readers) {
					var reader = this.readers[evt.target];
					evt.target = reader;
					reader._handleFlashEvent.call(reader, evt);
				}
			},
			// Receives flash FileReader Error Events
			onFileReaderError: function(error) {
				if (this.debugMode) console.log(error);
			},
			onSWFReady: function() {
				this.container.css({position: 'absolute'});
				this.ready = typeof this.swfObject.add === "function";
				if (this.ready) {
					readyCallbacks.fire();
				}
				
				return true;
			}
		};
		
		
		/**
		* Add FileReader to the window object
		*/
		window.FileReader = function () {
			// states
			this.EMPTY = 0;
			this.LOADING = 1;
			this.DONE = 2;
	
			this.readyState = 0;
	
			// File or Blob data
			this.result = null;
	
			this.error = null;
	
			// event handler attributes
			this.onloadstart = null;
			this.onprogress = null;
			this.onload = null;
			this.onabort = null;
			this.onerror = null;
			this.onloadend = null;
			
			// Event Listeners handling using JQuery Callbacks
			this._callbacks = {
				loadstart : $.Callbacks( "unique" ),
				progress  : $.Callbacks( "unique" ),
				abort     : $.Callbacks( "unique" ),
				error     : $.Callbacks( "unique" ),
				load      : $.Callbacks( "unique" ),
				loadend   : $.Callbacks( "unique" )
			};
			
			// Custom properties
			this._id = null;
		};
		
		window.FileReader.prototype = {
			// async read methods
			readAsBinaryString: function (file) {
				this._start(file);
				FileAPIProxy.swfObject.read(file.input, file.name, 'readAsBinaryString');
			},
			readAsText: function (file, encoding) {
				this._start(file);
				FileAPIProxy.swfObject.read(file.input, file.name, 'readAsText');
			},
			readAsDataURL: function (file) {
				this._start(file);
				FileAPIProxy.swfObject.read(file.input, file.name, 'readAsDataURL');
			},
			readAsArrayBuffer: function(file){
				throw("Whoops FileReader.readAsArrayBuffer is unimplemented");
			},
			
			abort: function () {
				this.result = null;
				if (this.readyState === this.EMPTY || this.readyState === this.DONE) return;
				FileAPIProxy.swfObject.abort(this._id);
			},
			
			// Event Target interface
			addEventListener: function (type, listener) {
				if (type in this._callbacks) this._callbacks[type].add(listener);
			},
			removeEventListener: function (type, listener) {
				if (type in this._callbacks) this._callbacks[type].remove(listener);
			},
			dispatchEvent: function (event) {
				event.target = this;
				if (event.type in this._callbacks) {
					var fn = this['on' + event.type];
					if ($.isFunction(fn)) fn(event);
					this._callbacks[event.type].fire(event);
				}
				return true;
			},
			
			// Custom private methods
			
			// Registers FileReader instance for flash callbacks
			_register: function(file) {
				this._id = file.input + '.' + file.name;
				FileAPIProxy.readers[this._id] = this;
			},
			_start: function(file) {
				this._register(file);
				if (this.readyState === this.LOADING) throw {type: 'InvalidStateError', code: 11, message: 'The object is in an invalid state.'};
			},
			_handleFlashEvent: function(evt) {
				switch (evt.type) {
					case 'loadstart':
						this.readyState = this.LOADING;
						break;
					case 'loadend':
						this.readyState = this.DONE;
						break;
					case 'load':
						this.readyState = this.DONE;
						this.result = FileAPIProxy.swfObject.result(this._id);
						break;
					case 'error':
						this.result = null;
						this.error = {
							name: 'NotReadableError',
							message: 'The File cannot be read!'
						};
				}
				this.dispatchEvent(new FileReaderEvent(evt));
			}
		};
		
		/**
		* FileReader ProgressEvent implenting Event interface
		*/
		window.FileReaderEvent = function (e) {
			this.initEvent(e);
		};
	
		window.FileReaderEvent.prototype = {
			initEvent: function (event) {
				$.extend(this, {
					type: null,
					target: null,
					currentTarget: null,
				
					eventPhase: 2,
	
					bubbles: false,
					cancelable: false,
			 
					defaultPrevented: false,
	
					isTrusted: false,
					timeStamp: new Date().getTime()
				}, event);
			},
			stopPropagation: function (){
			},
			stopImmediatePropagation: function (){
			},
			preventDefault: function (){
			}
		};
		
		/**
		* FileList interface (Object with item function)
		*/
		window.FileList = function(array) {
			if (array) {
				for (var i = 0; i < array.length; i++) {
					this[i] = array[i];
				}
				this.length = array.length;
			} else {
				this.length = 0;
			}
		};
		
		window.FileList.prototype = {
			item: function(index) {
				return (index in this) ? this[index] : null;
			}
		};
	})();
	
	webshims.defineNodeNameProperty('input', 'files', {
			prop: {
				writeable: false,
				get: function(){
					if(this.type != 'file'){return null;}
					if(!$(this).is('.ws-filereader')){
						webshims.error("please add the 'ws-filereader' class to your input[type='file'] to implement files-property");
					}
					return webshims.data(this, 'fileList') || webshims.data(this, 'fileList', new FileList());
				}
			}
		}
	);
	
	webshims.defineNodeNamesBooleanProperty('input', 'multiple');

	//webshims
	$.fn.fileReader.defaults.filereader = webshims.cfg.basePath +'swf/filereader.swf';
	var wait = ['DOM'];
	if(webshims.modules["form-core"].loaded){
		wait.push('forms');
	}
	webshims.ready(wait, function(){
		webshims.addReady(function(context, contextElem){
			$('input[type="file"].ws-filereader', context).fileReader();
		});
	});
});
