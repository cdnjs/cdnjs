webshim.register('usermedia-shim', function($, webshim, window, document, undefined, options){
	"use strict";
	var streamUrlPrefix = 'webshimstream';
	var id = 0;
	var hasSwf = swfmini.hasFlashPlayerVersion('11.3');
	var mediaOptions = webshim.cfg.mediaelement;

	function wsGetUserMedia(constraints, successCb, failCb){
		if(hasSwf){
			if(!successCb){return;}
			if(!webshim.mediaelement.createSWF){
				webshim.loader.loadList(['swfmini-embed']);
				webshim.mediaelement.loadSwf = true;
				webshim.reTest(['mediaelement-jaris'], true);
				webshim.ready('mediaelement-jaris', function(){
					createMediaRequest(constraints, successCb, failCb);
				});
			} else {
				createMediaRequest(constraints, successCb, failCb);
			}


		} else if(failCb) {
			failCb({name: 'NotSupportedError'});
		}
	}

	function createMediaRequest(constraints, successCb, failCb){
		var elemId, $dom;
		var vars = $.extend({}, mediaOptions.vars);
		var params = $.extend({}, mediaOptions.params);
		var attrs = $.extend({}, mediaOptions.attrs);

		id++;
		elemId = streamUrlPrefix+id;
		attrs.id = elemId;
		attrs.name = elemId;

		$.extend(vars, {id: elemId, evtId: elemId, controls: 'false', autostart: 'false', streamtype: 'usermedia', video: !!constraints.video, audio: !!constraints.audio});

		$dom = $('<div class="ws-mediastreamrequest-overlay"><div id="'+ elemId +'"></div></div>').appendTo('body');

		swfmini.embedSWF(mediaOptions.playerPath, elemId, "100%", "100%", "11.3", false, vars, params, attrs, function(swfData){

		});
	}


	webshim.getUserMedia = wsGetUserMedia;
	navigator.wsGetUserMedia = wsGetUserMedia;
});
