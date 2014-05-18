webshims.register('filereader', function( $, webshims ){
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
