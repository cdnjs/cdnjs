webshim.register('filereader', function($, webshim, window, document, undefined, featureOptions){
	"use strict";

	var mOxie, moxie;
	var FormData = $.noop;
	var sel = 'input[type="file"].ws-filereader';
	var loadMoxie = function (){
		webshim.loader.loadList(['moxie']);
	};
	var _createFilePicker = function(){
		var $input, picker, $parent;
		var input = this;

		if(webshim.implement(input, 'filepicker')){

			input = this;
			$input = $(this);
			$parent = $input.parent();

			$input.on('mousedown.filereaderwaiting click.filereaderwaiting', false);
			$parent.addClass('ws-loading');
			picker = new mOxie.FileInput({
				browse_button: this,
				accept: $.prop(this, 'accept'),
				multiple: $.prop(this, 'multiple')
			});


			picker.onready = function(){
				$input.off('.fileraderwaiting');
				$parent.removeClass('ws-waiting');
			};

			picker.onchange = function(e){
				webshim.data(input, 'fileList', e.target.files);
				$input.trigger('change');
			};
			picker.onmouseenter = function(){
				$input.trigger('mouseover');
				$parent.addClass('ws-mouseenter');
			};
			picker.onmouseleave = function(){
				$input.trigger('mouseout');
				$parent.removeClass('ws-mouseenter');
			};
			picker.onmousedown = function(){
				$input.trigger('mousedown');
				$parent.addClass('ws-active');
			};
			picker.onmouseup = function(){
				$input.trigger('mouseup');
				$parent.removeClass('ws-active');
			};
			webshim.data(input, 'filePicker', picker);

			webshim.ready('WINDOWLOAD', function(){
				var lastWidth;
				$input.onWSOff('updateshadowdom', function(){
					var curWitdth = input.offsetWidth;
					if(curWitdth && lastWidth != curWitdth){
						lastWidth = curWitdth;
						picker.refresh();
					}
				});
			});

			webshim.addShadowDom();
			picker.init();
			if(input.disabled){
				picker.disable(true);
			}

		}
	};
	var getFileNames = function(file){
		return file.name;
	};
	var createFilePicker = function(){
		var elem = this;
		loadMoxie();
		$(elem)
			.on('mousedown.filereaderwaiting click.filereaderwaiting', false)
			.parent()
			.addClass('ws-loading')
		;
		webshim.ready('moxie', function(){
			createFilePicker.call(elem);
		});
	};

	var notReadyYet = function(){
		loadMoxie();
		webshim.error('filereader/formdata not ready yet. please wait for moxie to load `webshim.ready("moxie", callbackFn);`` or wait for the first change event on input[type="file"].ws-filereader.')
	};
	var inputValueDesc = webshim.defineNodeNameProperty('input', 'value', {
			prop: {
				get: function(){
					var fileList = webshim.data(this, 'fileList');

					if(fileList && fileList.map){
						return fileList.map(getFileNames).join(', ');
					}

					return inputValueDesc.prop._supget.call(this);
				}
			}
		}
	);
	var testMoxie = function(options){
		return (options.wsType == 'moxie' || (options.data && options.data instanceof mOxie.FormData) || (options.crossDomain && $.support.cors !== false));
	};
	var createMoxieTransport = function (options){

		if(testMoxie(options)){
			var ajax;
			return {
				send: function( headers, completeCallback ) {

					var proressEvent = function(obj, name){
						if(options[name]){
							var called = false;
							ajax.addEventListener('load', function(e){
								if(!called){
									options[name]({type: 'progress', lengthComputable: true, total: 1, loaded: 1});
								} else if(called.lengthComputable && called.total > called.loaded){
									options[name]({type: 'progress', lengthComputable: true, total: called.total, loaded: called.total});
								}
							});
							obj.addEventListener('progress', function(e){
								called = e;
								options[name](e);
							});
						}
					};
					ajax = new moxie.xhr.XMLHttpRequest();

					ajax.open(options.type, options.url, options.async, options.username, options.password);

					proressEvent(ajax.upload, featureOptions.uploadprogress);
					proressEvent(ajax.upload, featureOptions.progress);

					ajax.addEventListener('load', function(e){
						var responses = {
							text: ajax.responseText,
							xml: ajax.responseXML
						};
						completeCallback(ajax.status, ajax.statusText, responses, ajax.getAllResponseHeaders());
					});

					if(options.xhrFields && options.xhrFields.withCredentials){
						ajax.withCredentials = true;
					}

					if(options.timeout){
						ajax.timeout = options.timeout;
					}

					$.each(headers, function(name, value){
						ajax.setRequestHeader(name, value);
					});


					ajax.send(options.data);

				},
				abort: function() {
					if(ajax){
						ajax.abort();
					}
				}
			};
		}
	};

	var transports = {
		//based on script: https://github.com/MoonScript/jQuery-ajaxTransport-XDomainRequest
		xdomain: (function(){
			var httpRegEx = /^https?:\/\//i;
			var getOrPostRegEx = /^get|post$/i;
			var sameSchemeRegEx = new RegExp('^'+location.protocol, 'i');
			return function(options, userOptions, jqXHR) {

				// Only continue if the request is: asynchronous, uses GET or POST method, has HTTP or HTTPS protocol, and has the same scheme as the calling page
				if (!options.crossDomain || options.username || (options.xhrFields && options.xhrFields.withCredentials) || !options.async || !getOrPostRegEx.test(options.type) || !httpRegEx.test(options.url) || !sameSchemeRegEx.test(options.url) || (options.data && options.data instanceof mOxie.FormData)) {
					return;
				}

				var xdr = null;

				return {
					send: function(headers, complete) {
						var postData = '';
						var userType = (userOptions.dataType || '').toLowerCase();

						xdr = new XDomainRequest();
						if (/^\d+$/.test(userOptions.timeout)) {
							xdr.timeout = userOptions.timeout;
						}

						xdr.ontimeout = function() {
							complete(500, 'timeout');
						};

						xdr.onload = function() {
							var allResponseHeaders = 'Content-Length: ' + xdr.responseText.length + '\r\nContent-Type: ' + xdr.contentType;
							var status = {
								code: xdr.status || 200,
								message: xdr.statusText || 'OK'
							};
							var responses = {
								text: xdr.responseText,
								xml: xdr.responseXML
							};
							try {
								if (userType === 'html' || /text\/html/i.test(xdr.contentType)) {
									responses.html = xdr.responseText;
								} else if (userType === 'json' || (userType !== 'text' && /\/json/i.test(xdr.contentType))) {
									try {
										responses.json = $.parseJSON(xdr.responseText);
									} catch(e) {

									}
								} else if (userType === 'xml' && !xdr.responseXML) {
									var doc;
									try {
										doc = new ActiveXObject('Microsoft.XMLDOM');
										doc.async = false;
										doc.loadXML(xdr.responseText);
									} catch(e) {

									}

									responses.xml = doc;
								}
							} catch(parseMessage) {}
							complete(status.code, status.message, responses, allResponseHeaders);
						};

						// set an empty handler for 'onprogress' so requests don't get aborted
						xdr.onprogress = function(){};
						xdr.onerror = function() {
							complete(500, 'error', {
								text: xdr.responseText
							});
						};

						if (userOptions.data) {
							postData = ($.type(userOptions.data) === 'string') ? userOptions.data : $.param(userOptions.data);
						}
						xdr.open(options.type, options.url);
						xdr.send(postData);
					},
					abort: function() {
						if (xdr) {
							xdr.abort();
						}
					}
				};
			};
		})(),
		moxie: function (options, originalOptions, jqXHR){
			if(testMoxie(options)){
				loadMoxie(options);
				var ajax;

				var tmpTransport = {
					send: function( headers, completeCallback ) {
						ajax = true;
						webshim.ready('moxie', function(){
							if(ajax){
								ajax = createMoxieTransport(options, originalOptions, jqXHR);
								tmpTransport.send = ajax.send;
								tmpTransport.abort = ajax.abort;
								ajax.send(headers, completeCallback);
							}
						});
					},
					abort: function() {
						ajax = false;
					}
				};
				return tmpTransport;
			}
		}
	};

	if(!featureOptions.progress){
		featureOptions.progress = 'onprogress';
	}

	if(!featureOptions.uploadprogress){
		featureOptions.uploadprogress = 'onuploadprogress';
	}

	if($.support.cors !== false || !window.XDomainRequest){
		delete transports.xdomain;
	}


	$.ajaxTransport("+*", function( options, originalOptions, jqXHR ) {
		var ajax, type;

		if(options.wsType || transports[transports]){
			ajax = transports[transports](options, originalOptions, jqXHR);
		}
		if(!ajax){
			for(type in transports){
				ajax = transports[type](options, originalOptions, jqXHR);
				if(ajax){break;}
			}
		}
		return ajax;
	});

	webshim.defineNodeNameProperty('input', 'files', {
			prop: {
				writeable: false,
				get: function(){
					if(this.type != 'file'){return null;}
					if(!$(this).is('.ws-filereader')){
						webshim.error("please add the 'ws-filereader' class to your input[type='file'] to implement files-property");
					}
					return webshim.data(this, 'fileList') || window.FileList && webshim.data(this, 'fileList', new FileList()) || [];
				}
			}
		}
	);

	webshim.reflectProperties(['input'], ['accept']);

	if($('<input />').prop('multiple') == null){
		webshim.defineNodeNamesBooleanProperty(['input'], ['multiple']);
	}

	webshim.onNodeNamesPropertyModify('input', 'disabled', function(value, boolVal, type){
		var picker = webshim.data(this, 'filePicker');
		if(picker){
			picker.disable(boolVal);
		}
	});

	window.FileReader = notReadyYet;
	window.FormData = notReadyYet;
	webshim.ready('moxie', function(){
		moxie = window.moxie;
		mOxie = window.mOxie;
		mOxie.Env.swf_url = webshim.cfg.basePath+'moxie/flash/Moxie.cdn.swf';
		mOxie.Env.xap_url = webshim.cfg.basePath+'moxie/flash/Moxie.cdn.xap';

		window.FileReader = mOxie.FileReader;
		window.FormData = function(form){
			var appendData, i, len, files, fileI, fileLen, inputName;
			var data = new mOxie.FormData();
			if(form && $.nodeName(form, 'form')){
				appendData = $(form).serializeArray();
				for(i = 0; i < appendData.length; i++){
					data.append(appendData[i].name, appendData[i].value);
				}
				appendData = form.querySelectorAll('input[type="file"][name]');
				for(i = 0, len = appendData.length; i < appendData.length; i++){
					inputName = appendData[i].name;
					if(inputName && !$(appendData[i]).is(':disabled')){
						files = $.prop(appendData[i], 'files') || [];
						for(fileI = 0, fileLen = files.length; fileI < fileLen; fileI++){
							data.append(inputName, files[fileI]);
						}
					}
				}
			}

			return data;
		};
		FormData = window.FormData;

		createFilePicker = _createFilePicker;
		transports.moxie = createMoxieTransport;
	});

	webshim.addReady(function(context, contextElem){
		$(context.querySelectorAll(sel)).add(contextElem.filter(sel)).each(createFilePicker);
	});
	webshim.ready('WINDOWLOAD', loadMoxie);
});
