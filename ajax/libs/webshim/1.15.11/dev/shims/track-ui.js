(function($){
	if(webshims.support.texttrackapi && document.addEventListener){
		var trackOptions = webshims.cfg.track;
		var trackListener = function(e){
			$(e.target).filter('track').each(changeApi);
		};
		var trackBugs = webshims.bugs.track;
		var changeApi = function(){
			if(trackBugs || (!trackOptions.override && $.prop(this, 'readyState') == 3)){
				trackOptions.override = true;
				webshims.reTest('track');
				document.removeEventListener('error', trackListener, true);
				if(this && $.nodeName(this, 'track')){
					webshims.error("track support was overwritten. Please check your vtt including your vtt mime-type");
				} else {
					webshims.info("track support was overwritten. due to bad browser support");
				}
				return false;
			}
		};
		var detectTrackError = function(){
			document.addEventListener('error', trackListener, true);
			if(trackBugs){
				changeApi();
			} else {
				$('track').each(changeApi);
			}
			if(!trackBugs && !trackOptions.override){
				webshims.defineProperty(TextTrack.prototype, 'shimActiveCues', {
					get: function(){
						return this._shimActiveCues || this.activeCues;
					}
				});
			}
		};
		if(!trackOptions.override){
			$(detectTrackError);
		}
	}
})(webshims.$);
webshims.register('track-ui', function($, webshims, window, document, undefined){
	"use strict";
	var options = webshims.cfg.track;
	var support = webshims.support;
	//descriptions are not really shown, but they are inserted into the dom
	var showTracks = {subtitles: 1, captions: 1, descriptions: 1};
	var mediaelement = webshims.mediaelement;
	var usesNativeTrack =  function(){
		return !options.override && support.texttrackapi;
	};
	var requestAnimationFrame = window.cancelAnimationFrame && window.requestAnimationFrame || function(fn){
		setTimeout(fn, 17);
	};
	var cancelAnimationFrame = window.cancelAnimationFrame || window.clearTimeout;
	var trackDisplay = {
		update: function(baseData, media){
			if(!baseData.activeCues.length){
				this.hide(baseData);
			} else {
				if(!compareArray(baseData.displayedActiveCues, baseData.activeCues)){
					baseData.displayedActiveCues = baseData.activeCues;
					if(!baseData.trackDisplay){
						baseData.trackDisplay = $('<div class="cue-display '+webshims.shadowClass+'"><span class="description-cues" aria-live="assertive" /></div>').insertAfter(media);
						this.addEvents(baseData, media);
						webshims.docObserve();
					}
					
					if(baseData.hasDirtyTrackDisplay){
						media.triggerHandler('forceupdatetrackdisplay');
					}
					this.showCues(baseData);
				}
			}
		},
		showCues: function(baseData){
			var element = $('<span class="cue-wrapper" />');
			$.each(baseData.displayedActiveCues, function(i, cue){
				var id = (cue.id) ? 'id="cue-id-'+cue.id +'"' : '';
				var cueHTML = $('<span class="cue-line"><span '+ id+ ' class="cue" /></span>').find('span').html(cue.getCueAsHTML()).end();
				if(cue.track.kind == 'descriptions'){
					setTimeout(function(){
						$('span.description-cues', baseData.trackDisplay).html(cueHTML);
					}, 0);
				} else {
					element.prepend(cueHTML);
				}
			});
			$('span.cue-wrapper', baseData.trackDisplay).remove();
			baseData.trackDisplay.append(element);
		},
		addEvents: function(baseData, media){
			if(options.positionDisplay){
				var timer;
				var positionDisplay = function(_force){
					if(baseData.displayedActiveCues.length || _force === true){
						baseData.trackDisplay.css({display: 'none'});
						var uiElement = media.getShadowElement();
						var uiHeight = uiElement.innerHeight();
						var uiWidth = uiElement.innerWidth();
						var position = uiElement.position();
						baseData.trackDisplay.css({
							left: position.left,
							width: uiWidth,
							height: uiHeight - 45,
							top: position.top,
							display: 'block'
						});
						
						baseData.trackDisplay.css('fontSize', Math.max(Math.round(uiHeight / 30), 7));
						baseData.hasDirtyTrackDisplay = false;
					} else {
						baseData.hasDirtyTrackDisplay = true;
					}
				};
				var delayed = function(e){
					clearTimeout(timer);
					timer = setTimeout(positionDisplay, 0);
				};
				var forceUpdate = function(){
					positionDisplay(true);
				};
				media.on('playerdimensionchange mediaelementapichange updatetrackdisplay updatemediaelementdimensions swfstageresize', delayed);
				media.on('forceupdatetrackdisplay', forceUpdate).onWSOff('updateshadowdom', delayed);
				forceUpdate();
			}
		},
		hide: function(baseData){
			if(baseData.trackDisplay && baseData.displayedActiveCues.length){
				baseData.displayedActiveCues = [];
				$('span.cue-wrapper', baseData.trackDisplay).remove();
				$('span.description-cues', baseData.trackDisplay).empty();
			}
		}
	};
	
	function compareArray(a1, a2){
		var ret = true;
		var i = 0;
		var len = a1.length;
		if(len != a2.length){
			ret = false;
		} else {
			for(; i < len; i++){
				if(a1[i] != a2[i]){
					ret = false;
					break;
				}
			}
		}
		return ret;
	}
	
	
	mediaelement.trackDisplay = trackDisplay;
	
	if(!mediaelement.createCueList){
		
		var cueListProto = {
			getCueById: function(id){
				var cue = null;
				for(var i = 0, len = this.length; i < len; i++){
					if(this[i].id === id){
						cue = this[i];
						break;
					}
				}
				return cue;
			}
		};
		
		mediaelement.createCueList = function(){
			return $.extend([], cueListProto);
		};
	}

	function triggerCueEvent(cue, type, baseData, media, trackIndex){
		var trackElem, compareTrack;
		var cueChange = $.Event('cuechange');
		if(!baseData.trackElements){
			baseData.trackElements = media[0].getElementsByTagName('track');
		}

		trackElem = baseData.trackElements[trackIndex];

		if(trackElem){
			compareTrack = (webshims.data(trackElem, 'trackData') || {track: $.prop(trackElem, 'track')}).track;
			if(compareTrack != cue.track){
				trackElem = null;
			}
		}
		$.event.trigger(cueChange, null, cue.track, true);

		if(trackElem){
			$.event.trigger(cueChange, null, trackElem, true);
		}

		$.event.trigger(type, null, cue, true);
	}
	
	mediaelement.getActiveCue = function(track, media, time, baseData, trackIndex){
		if(!track._lastFoundCue){
			track._lastFoundCue = {index: 0, time: 0};
		}
		
		if(!track._shimActiveCues && support.texttrackapi && !options.override){
			track._shimActiveCues = mediaelement.createCueList();
		}
		
		var i = 0;
		var len, cue, delay;
		for(; i < track.shimActiveCues.length; i++){
			cue = track.shimActiveCues[i];
			if(cue.startTime > time || cue.endTime < time){
				track.shimActiveCues.splice(i, 1);
				i--;
				if(cue.pauseOnExit){
					$(media).pause();
				}


				triggerCueEvent(cue, 'exit', baseData, media, trackIndex);


			} else {
				delay = cue.endTime - time;
				if(baseData.nextUpdateDelay > delay){
					baseData.nextUpdateDelay = delay;
					baseData.nextEvent = cue.endTime;
				}
				if(track.mode == 'showing' && showTracks[track.kind] && $.inArray(cue, baseData.activeCues) == -1){
					baseData.activeCues.push(cue);
				}
			}
		}
		

		len = track.cues.length;
		i = track._lastFoundCue.time < time ? track._lastFoundCue.index : 0;
		
		for(; i < len; i++){
			cue = track.cues[i];
			
			if(cue.startTime <= time && cue.endTime >= time && $.inArray(cue, track.shimActiveCues) == -1){
				track.shimActiveCues.push(cue);
				if(track.mode == 'showing' && showTracks[track.kind]){
					baseData.activeCues.push(cue);
				}

				triggerCueEvent(cue, 'enter', baseData, media, trackIndex);

				track._lastFoundCue.time = time;
				track._lastFoundCue.index = i;

				delay = cue.endTime - time;
				if(baseData.nextUpdateDelay > delay){
					baseData.nextUpdateDelay = delay;
					baseData.nextEvent = cue.endTime;
				}
				
			}
			if(cue.startTime > time){
				delay = cue.startTime - time;
				if(baseData.nextUpdateDelay > delay){
					baseData.nextUpdateDelay = delay;
					baseData.nextEvent = cue.startTime;
				}
				break;
			}
		}
	};
	var filterTrackImplementation = function(){
		return webshims.implement(this, 'trackui');
	};
	var implementTrackUi = function(){
		var baseData, trackList, updateTimer, updateTimer2, lastDelay, lastTime, invalidTracksTimer;
		var treshHold = 0.27;
		var elem = $(this);
		var recheckI = 0;
		var recheckId;
		var reCheck = function(){
			recheckI++;

			//if recheckI is over 5 video might be paused, stalled or waiting,
			//in this case abort and wait for the next play, playing or timeupdate event
			if(recheckI < 9){
				if(elem.prop('currentTime') > baseData.nextEvent){
					recheckI = undefined;
					getDisplayCues();
				} else {
					recheckId = requestAnimationFrame(reCheck);
				}
			} else {
				recheckI = undefined;
			}
		};
		var getDisplayCues = function(e){
			var track, time;
			if(!trackList || !baseData){
				trackList = elem.prop('textTracks');
				baseData = webshims.data(elem[0], 'mediaelementBase') || webshims.data(elem[0], 'mediaelementBase', {});

				if(!baseData.displayedActiveCues){
					baseData.displayedActiveCues = [];
				}
			}

			if (!trackList){return;}
			time = elem.prop('currentTime');

			if(!time && time !== 0){return;}

			if(baseData.nextEvent && e && e.type == 'timeupdate' && time >= lastTime && baseData.nextEvent - time > treshHold && time - lastTime < 9){
				return;
			}

			lastTime = time;
			lastDelay = baseData.nextUpdateDelay;
			baseData.nextUpdateDelay = Number.MAX_VALUE;
			baseData.activeCues = [];
			for(var i = 0, len = trackList.length; i < len; i++){
				track = trackList[i];
				if(track.mode != 'disabled' && track.cues && track.cues.length){
					mediaelement.getActiveCue(track, elem, time, baseData, i);
				}
			}
			trackDisplay.update(baseData, elem);

			clearTimeout(updateTimer);

			if(baseData.nextUpdateDelay <= treshHold && (e || lastDelay != baseData.nextUpdateDelay) && baseData.nextUpdateDelay > 0){

				lastDelay = baseData.nextUpdateDelay;

				clearTimeout(updateTimer2);

				if(recheckId){
					cancelAnimationFrame(recheckId);
				}
				recheckI = 0;
				updateTimer2 = setTimeout(reCheck, (baseData.nextUpdateDelay * 1000) + 9);
			} else if(baseData.nextUpdateDelay >= Number.MAX_VALUE){
				baseData.nextEvent = time + 2;
			}
		};
		var invalidateTrackElems = function(){
			if(baseData && baseData.trackElements){
				delete baseData.trackElements;
			}
		};
		var onUpdatCues = function(e){
			if(baseData && e && (e.type == 'addtrack' || e.type == 'removetrack')){
				clearTimeout(invalidTracksTimer);
				invalidTracksTimer = setTimeout(invalidateTrackElems, 39);
			}
			clearTimeout(updateTimer);
			updateTimer = setTimeout(getDisplayCues, 40);
		};
		var addTrackView = function(){
			if(!trackList) {
				if(baseData && 'blockTrackListUpdate' in baseData){
					baseData.blockTrackListUpdate = true;
				}
				trackList = elem.prop('textTracks');
				if(baseData && baseData.blockTrackListUpdate){
					baseData.blockTrackListUpdate = false;
				}
			}
			//as soon as change on trackList is implemented in all browsers we do not need to have 'updatetrackdisplay' anymore
			$( [trackList] )
				.off('.trackview')
				.on('change.trackview addtrack.trackview removetrack.trackview', onUpdatCues)
			;
			elem
				.off('.trackview')
				.on('emptied.trackview', invalidateTrackElems)
				.on('play.trackview playing.trackview updatetrackdisplay.trackview seeked.trackview', onUpdatCues)
				.on('timeupdate.trackview', getDisplayCues)
			;
		};

		elem.on('remove', function(e){
			if(!e.originalEvent && baseData && baseData.trackDisplay){
				setTimeout(function(){
					baseData.trackDisplay.remove();
				}, 4);
			}
		});

		if(!usesNativeTrack()){
			addTrackView();
		} else {

			if(elem.hasClass('nonnative-api-active')){
				addTrackView();
			}
			elem
				.on('mediaelementapichange trackapichange', function(){

					if(!usesNativeTrack() || elem.hasClass('nonnative-api-active')){
						addTrackView();
					} else {
						clearTimeout(updateTimer);
						clearTimeout(updateTimer2);
						if(recheckId){
							cancelAnimationFrame(recheckId);
						}

						trackList = elem.prop('textTracks');
						baseData = webshims.data(elem[0], 'mediaelementBase') || webshims.data(elem[0], 'mediaelementBase', {});
						$.each(trackList, function(i, track){
							if(track._shimActiveCues){
								delete track._shimActiveCues;
							}
						});
						$( [trackList] ).off('.trackview');
						trackDisplay.hide(baseData);
						elem.off('.trackview');
					}
				})
			;
		}
	};

	if(usesNativeTrack()){
		(function(){
			var block;
			var triggerDisplayUpdate = function(elem){
				block = true;
				setTimeout(function(){
					$(elem).triggerHandler('updatetrackdisplay');
					block = false;
				}, 9);
			};
			
			var createUpdateFn = function(nodeName, prop, type){
				var superType = '_sup'+type;
				var desc = {prop: {}};
				var superDesc;
				desc.prop[type] = function(){
					if(!block && usesNativeTrack()){
						triggerDisplayUpdate($(this).closest('audio, video'));
					}
					return superDesc.prop[superType].apply(this, arguments);
				};
				superDesc = webshims.defineNodeNameProperty(nodeName, prop, desc);
			};
			
			createUpdateFn('track', 'track', 'get');
			
			['audio', 'video'].forEach(function(nodeName){
				createUpdateFn(nodeName, 'textTracks', 'get');
				createUpdateFn('nodeName', 'addTextTrack', 'value');
			});
		})();
		$.propHooks.activeCues = {
			get: function(obj){
				return obj._shimActiveCues || obj.activeCues;
			}
		};
	}
	
	webshims.addReady(function(context, insertedElement){
		$('video, audio', context)
			.add(insertedElement.filter('video, audio'))
			.filter(filterTrackImplementation)
			.each(implementTrackUi)
		;
	});
});
