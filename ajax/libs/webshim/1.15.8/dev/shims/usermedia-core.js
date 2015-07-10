webshim.register('usermedia-core', function($, webshim, window, document, undefined, options){
	"use strict";

	var srcObjectName = webshim.prefixed('srcObject', document.createElement('video'));
	var addUnPrefixed = function(){
		navigator.getUserMedia = navigator[webshim.prefixed('getUserMedia', navigator)];
	};

	if(srcObjectName != 'srcObject'){
		var hasURL = !!(window.URL && URL.createObjectURL);
		webshim.defineNodeNamesProperty(['audio', 'video'], 'srcObject', {
			prop: {
				get: function(){
					return this[srcObjectName] || null;
				},
				set: function(stream){
					if(srcObjectName){
						$.prop(this, srcObjectName, stream);
					} else {
						$.prop(this, 'src', hasURL ? URL.createObjectURL(stream) : stream);
					}
				}
			}
		});
	}

	(function(){
		var streams = {};
		var _nativeCreateObjectURL = URL.createObjectURL;
		var _nativeRevokeObjectURL = URL.revokeObjectURL;

		URL.createObjectURL = function(stream){

			var url = stream;
			if(_nativeCreateObjectURL && !stream._wsStreamId){
				url = _nativeCreateObjectURL.apply(this, arguments);
			} else if(stream._wsStreamId) {
				url = stream._wsStreamId;
				streams[url] = stream;
			}
			return url;
		};

		URL.revokeObjectURL = function(url){
			if(streams[url]){
				delete streams[url];
			} else if (_nativeRevokeObjectURL){
				return _nativeRevokeObjectURL.apply(this, arguments);
			}
		};
	})();


	webshim.ready(webshim.modules["usermedia-shim"].loaded ? 'usermedia-api' : 'usermedia-shim', addUnPrefixed);
});
