webshim.register('mediacapture-picker', function($, webshim, window, document, undefined, featureOptions){
	"use strict";

	function PhotoShooter($dom){
		this.$dom = $dom;
		this._createDom();
		this.requestMedia();
	}

	PhotoShooter.prototype = {
		_createDom: function(){
			this.$dom.html('<div class="ws-videocapture-view">' +
				'<video class="ws-usermedia ws-inlineusermedia" autoplay=""></video>' +
				'<div class="ws-video-overlay"></div>' +
				'</div>' +
				'<div class="button-row"><button type="button" class="ws-capture-button">take</button>' +
				'</div>')
			;
		},
		requestMedia: function(){
			var that = this;


			navigator.getUserMedia(
				{video: {minWidth: 200, audio: false}},
				function(stream){
					that.stream = stream;
					$('video', that.$dom).prop('src', URL.createObjectURL(stream));
				},
				function(){

				}
			);
			$('video', that.$dom).removeClass('ws-usermedia');

		}
	};

	webshim.mediacapture.showContent = function($fileinput, $button, popover){
		var stream = new PhotoShooter(popover.contentElement);
	};
});
