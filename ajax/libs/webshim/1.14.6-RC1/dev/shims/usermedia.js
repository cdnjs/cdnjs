webshim.register('usermedia', function($, webshim, window, document, undefined, options){
	"use strict";
	var streams = {};
	var srcObjectName = webshim.prefixed('srcObject', document.createElement('video'));

	if(srcObjectName != 'srcObject'){
		webshim.defineNodeNamesProperty(['audio', 'video'], 'srcObject', {
			prop: {
				get: function(){
					return this[srcObjectName] || null;
				},
				set: function(stream){
					if(srcObjectName){
						$.prop(this, srcObjectName, stream);
					} else {
						$.prop(this, 'src', URL.createObjectURL(stream));
					}
				}
			}
		});
	}

	URL._nativeCreateObjectURL = URL.createObjectURL;
	URL._nativeRevokeObjectURL = URL.revokeObjectURL;

	URL.createObjectURL = function(stream){
		var url = '';
		if(URL._nativeCreateObjectURL && !stream._wsStream){
			url = URL._nativeCreateObjectURL(stream);
		} else if(stream._wsStream) {
			url = stream._wsStreamId;
			streams[url] = stream;
		}
		return url;
	};

	URL.revokeObjectURL = function(url){
		if(streams[url]){
			delete streams[url];
		}
		if(URL._nativeRevokeObjectURL){
			return URL._nativeRevokeObjectURL(url);
		}
	};
	webshim.usermediastreams = streams;

	webshim.ready('usermedia-shim', function(){
		navigator.getUserMedia = navigator[webshim.prefixed('getUserMedia', navigator)];
	});
});
