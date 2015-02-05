webshims.register('mediaelement-native-fix', function($, webshims, window, document, undefined){

	var support = webshims.support;
	var fixBuffered = (function(){
		if(support.videoBuffered){return $.noop;}

		var getBufferedData = function(elem){
			var data = webshims.data(elem, 'mediaelementBuffered');
			if(!data){
				data = {
					buffered: {
						start: function(index){
							if(index >= data.buffered.length){
								webshims.error('buffered index size error');
								return;
							}
							return 0;
						},
						end: function(index){
							if(index >= data.buffered.length){
								webshims.error('buffered index size error');
								return;
							}
							return data.loaded;
						},
						length: 0
					},
					loaded: 0
				};
				webshims.data(elem, 'mediaelementBuffered', data);
			}
			return data;
		};

		var loadProgessListener = function(e){
			e = e.originalEvent;
			if(!e || !('lengthComputable' in e)){return;}
			var data = webshims.data(e.target, 'mediaelement');
			if(data && data.isActive != 'html5'){return;}
			if(e.lengthComputable && 'loaded' in e){
				var duration = e.target.duration;
				var bufferedData = getBufferedData(e.target);
				bufferedData.loaded = (duration) ? e.loaded / e.total * duration : 0;
				if(bufferedData.loaded){
					bufferedData.buffered.length = 1;
				}
				if(e.type == 'load'){
					$(e.target).triggerHandler('progress');
				}
			}
		};
		var removeProgress = function(e){
			var data = getBufferedData(e.target);
			data.buffered.length = 0;
			data.loaded = 0;
		};

		['audio', 'video'].forEach(function(nodeName){
			var sup = webshims.defineNodeNameProperty(nodeName, 'buffered',  {
				prop: {
					get: function(){
						var data = webshims.data(this, 'mediaelement');

						if(data && data.isActive == 'flash' && sup.prop._supget){
							sup.prop._supget.apply(this);
						} else {
							return getBufferedData(this).buffered;
						}
					}
				}
			});
		});

		return function(){
			$(this)
				.off('load progress', loadProgessListener)
				.off('emptied', removeProgress)
				.on('load progress', loadProgessListener)
				.on('emptied', removeProgress)
			;
		};
	})();

	(function(){
		var videoElem = document.createElement('video');
		if( !('preload' in videoElem) && ('autobuffer' in videoElem)){
			var noBufferProps = {
				metadata: 1,
				none: 1
			};
			webshims.onNodeNamesPropertyModify(['audio', 'video'], ['preload'], {
				set: function(value, boolValue, curType){
					if(noBufferProps[value] || curType == 'removeAttr'){
						this.autobuffer = false;
					} else if( !(webshims.data(this, 'mediaelement') || {}).isActive == 'html5') {
						this.autobuffer = true;
					}
				},
				initAttr: true
			});
		}
	})();

	var fixProgressEvent = (function(){
		if(support.mediaDefaultMuted){return $.noop;}


		return function(){
			if($.data(this, 'fixedMediaProgress')){return;}
			var bufferTimer;
			var lastBuffered;
			var elem = this;
			var getBufferedString = function(){
				var buffered = $.prop(elem, 'buffered');
				if(!buffered){return;}
				var bufferString = "";
				for(var i = 0, len = buffered.length; i < len;i++){
					bufferString += buffered.end(i);
				}
				return bufferString;
			};
			var testBuffer = function(){
				var buffered = getBufferedString();
				if(buffered != lastBuffered){
					lastBuffered = buffered;
					webshims.error('needed to trigger progress manually');
					$(elem).triggerHandler('progress');
				}
			};

			$(this)
				.data('fixedMediaProgress', true)
				.on({
					'play loadstart progress': function(e){
						if(e.type == 'progress'){
							lastBuffered = getBufferedString(this);
						}
						clearTimeout(bufferTimer);
						bufferTimer = setTimeout(testBuffer, 800);
					},
					'emptied stalled mediaerror abort suspend': function(e){
						if(e.type == 'emptied'){
							lastBuffered = false;
						}
						clearTimeout(bufferTimer);
					}
				})
			;
			if('ActiveXObject' in window && $.prop(this, 'paused') && !$.prop(this, 'readyState') && $(this).is('audio[preload="none"][controls]:not([autoplay],.nonnative-api-active)')){
				$(this).prop('preload', 'metadata').mediaLoad();
			}
		};
	})();
	
	webshims.addReady(function(context, insertedElement){
		$('video, audio', context)
			.add(insertedElement.filter('video, audio'))
			.each(fixBuffered)
			.each(fixProgressEvent)
		;
		
	 });

});
