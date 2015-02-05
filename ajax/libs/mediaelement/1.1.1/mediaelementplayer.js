/*!
 * Media Element jQuery plugin
 * http://mediaelementjs.com/
 *
 * Creates a controller bar for HTML5 <video> add <audio> tags
 * using jQuery and MediaElement.js
 *
 * Copyright 2010, John Dyer
 * Dual licensed under the MIT or GPL Version 2 licenses.
 *
 * Version: 1.1.0
 */

// TODO:
// - make volume be event driven, remember setting (cookie, startup)

(function ($) {

	// default player values
	html5.MepDefaults = {
		// default if the <video width> is not specified
		defaultVideoWidth: 480,
		// default if the <video height> is not specified
		defaultVideoHeight: 270,
		// if set, overrides <video width> 
		videoWidth: -1,
		// if set, overrides <video height>
		videoHeight: -1,
		// width of audio player
		audioWidth: 300,
		// height of audio player
		audioHeight: 30,		
		// display messages
		messages: {
			start: 'Click to Start',
			loading: 'Loading',				  
			paused: 'Paused',
			error: 'Error',
			ended: 'Ended'
		},
		// turn each button on or off
		controls: {
			playpause: true,
			timerail: true,
			duration: true,
			volume: true,
			captions: true,
			fullscreen: true
		},
		loop: false,
		// this will automatically turn on a <track>
		startLanguage: '',
		// a list of languages to auto-translate via Google
		translations: []
	};

	html5.mepIndex = 0;

	// wraps a MediaElement object in player controls
	html5.MediaElementPlayer = function($media, o) {

		var	
			t = this,
			mf = html5.MediaFeatures;
	
		t.$media = $($media);
		t.options = $.extend(true,{},html5.MepDefaults,o);
		t.isVideo = (t.$media[0].tagName.toLowerCase() == 'video');
				
		if (mf.isiPad || mf.isiPhone) {
			// add controls and stop
			t.$media.attr('controls', 'controls');
			
			// fix Apple bug
			t.$media.removeAttr('poster');

			// override Apple's autoplay override for iPads
			if (mf.isiPad && t.$media[0].getAttribute('autoplay') !== null) {
				t.$media[0].load();
				t.$media[0].play();
			}

			// don't do the rest
			return;
		} else if (mf.isAndroid && t.isVideo) {

			// Android is better off with native controls (like iOS)
			t.$media.attr('controls', 'controls');
			return;
			
		} else {

			// remove native controls and use MEP
			t.$media.removeAttr('controls');
		}
		
		t.createPlayer();
	};
	
	html5.MediaElementPlayer.prototype = {
		createPlayer: function() {

			var
				t = this,
				meOptions = $.extend(true, {}, t.options, {
					success: function(mediaElement, domNode) { t.setupPlayer(mediaElement, domNode); }, 
					error: function(e) { t.handleError(e);} 
				});				
		
			// unique ID
			t.id = 'mep_' + html5.mepIndex++;			
			
			// add HTML
			t.$media.before(
			$(
				'<div id="' + t.id + '" class="mep-container">'+
					'<div class="mep-mediaelement">'+
					'</div>'+
					'<div class="mep-captions-layer">'+
						'<span class="mep-captions-text"></span>'+
					'</div>'+
					'<div class="mep-poster">'+
						'<img />'+
					'</div>'+
					'<div class="mep-overlay">'+
						'<div class="mep-overlay-message"></div>'+
					'</div>'+
					'<div class="mep-controls">'+
						'<div class="mep-playpause-button mep-play"><span></span></div>'+
						'<div class="mep-time-rail">'+
							'<span class="mep-time-total">'+
								'<span class="mep-time-loaded"></span>'+
								'<span class="mep-time-current"></span>'+
								'<span class="mep-time-handle"></span>'+
							'</span>'+
						'</div>'+
						'<div class="mep-time">'+
							'<span class="mep-currenttime"></span>'+
							' <span> | </span> '+
							'<span class="mep-duration"></span>'+
						'</div>'+
						'<div class="mep-captions-button">'+
							'<span></span>'+
							'<div class="mep-captions-selector">'+
								'<ul>'+
									'<li>'+ 
										'<input checked="checked" type="radio" name="' + this.id + '_captions" id="' + this.id + '_captions_none" value="none" />' +
										'<label for="' + this.id + '_captions_none">None</label>'+										
									'</li>'+
								'</ul>'+
							'</div>'+							
						'</div>'+						
						'<div class="mep-volume-button mep-mute">'+
							'<span></span>'+
							'<div class="mep-volume-slider">'+
								'<div class="mep-volume-rail">'+
									'<div class="mep-volume-handle"></div>'+
								'</div>'+
							'</div>'+
						'</div>'+
						'<div class="mep-fullscreen-button"><span></span></div>'+
					'</div>'+
					'<div class="mep-clear"></div>'+
				'</div>')		
			);
			t.container = $('#' + this.id);
			
			// move the <video/video> tag into the right spot
			t.container
				.addClass(t.$media[0].className)
				.find('.mep-mediaelement')
					.append(t.$media);
			
			// determine the size							
			if (t.isVideo) {			
				// priority = videoWidth (forced), width attribute, defaultVideoWidth		
				t.width = (t.options.videoWidth > 0) ? t.options.videoWidth : (t.$media[0].getAttribute('width') !== null) ? t.$media.attr('width') : t.options.defaultVideoWidth;
				t.height = (t.options.videoHeight > 0) ? t.options.videoHeight : (t.$media[0].getAttribute('height') !== null) ? t.$media.attr('height') : t.options.defaultVideoHeight;				
			} else {
				t.width = t.options.audioWidth;
				t.height = t.options.audioHeight;
			}
			
			// setup main layers and objects
			t.buildPoster();
			t.buildOverlay();
			t.buildCaptionsDisplay();
			t.setPlayerSize(t.width, t.height); // now that the container, overlay, and poster are ready specify their exact size
			t.buildControls();			
			
			// create MediaElementShim	
			meOptions.pluginWidth = t.height;
			meOptions.pluginHeight = t.width;			
			html5.MediaElement(t.$media[0], meOptions);			
			
		},
		
		// Sets up all controls and events
		setupPlayer: function(mediaElement, domNode) {		
			
			/*			
			var testEvents = 'play playing played paused pausing'.split(' ');
			for (var i=0; i<testEvents.length;i++) {
				mediaElement.addEventListener(testEvents[i], function(e) {				
					console.log(e.type, e.target.paused);
				}, true);
			}			
			*/
			
			var t = this;			
			t.mediaElement = mediaElement;
			t.domNode = domNode;			

			// build controls
			t.buildControlBar();
			t.buildPlayPause();
			t.buildTimeRail();	
			t.buildVolumeControls();
			t.buildCaptionsControls();
			t.buildFullscreen();


			// add events the MediaElement
			t.mediaElement.addEventListener('click', function (e) {
				if (t.mediaElement.paused) {
					t.mediaElement.play();
				}
			}, true);

			t.mediaElement.addEventListener('playing', function (e) {
				t.poster.hide();
				t.playpause.removeClass('mep-play').addClass('mep-pause');
				t.hideMessage();
			}, true);

			t.mediaElement.addEventListener('pause', function (e) {	
				t.playpause.removeClass('mep-pause').addClass('mep-play');
				t.showMessage(t.options.messages.paused);
			}, true);

			t.mediaElement.addEventListener('ended', function (e) {
				t.mediaElement.setCurrentTime(0);
				t.mediaElement.pause();
				t.setTimePosition();
					
				if (t.options.loop) {					
					t.mediaElement.play();
				} else {
					t.poster.show();
					t.playpause.removeClass('mep-pause').addClass('mep-play');
					t.showMessage(t.options.messages.ended);
				}
			}, true);
			
			t.mediaElement.addEventListener('loadedmetadata', function(e) {
				// if the <video height> was not set and the options.videoHeight was not set
				// then resize to the real dimensions
				if (t.isVideo && t.options.videoHeight <= 0 && t.$media[0].getAttribute('height') === null && !isNaN(e.target.videoHeight)) {
					t.setPlayerSize(e.target.videoWidth, e.target.videoHeight);
					t.setRailSize();
					t.mediaElement.setVideoSize(e.target.videoWidth, e.target.videoHeight);			
				}				
			}, true);

			// webkit has trouble doing this without a delay
			setTimeout(function () {
				t.setRailSize();
			}, 50);

			if (t.options.success)
				t.options.success(t.mediaElement, t.domNode);
				
			this.loadTracks();
		},
		
		buildCaptionsDisplay: function() {
			var t = this;
			t.captionsDisplay = t.container.find('.mep-captions-layer').hide();
			t.captionsText = t.container.find('.mep-captions-text');
		},		
		
		buildCaptionsControls: function() {
			var 
				t = this,
				lang,
				i;
				
			// handle clicks to the language radio buttons
			t.captions.delegate('input[type=radio]','click',function() {				
				lang = this.value;	
				
				if (lang == 'none') {
					t.selectedTrack = null;
				} else {				
					for (i=0; i<t.tracks.length; i++) {
						if (t.tracks[i].srclang == lang) {
							t.selectedTrack = t.tracks[i];
							t.captionsDisplay.attr('lang', t.selectedTrack.srclang);
							break;
						}
					}	
				}
			});
		},
		
		// adapted from Playr
		loadTracks: function() {	
			var t = this,
				i,
				tracktags = t.$media.find('track[kind=subtitles]');
			
			// create storage for tracks
			t.tracks = [];
			t.trackToLoad = -1;
			t.selectedTrack = null;
			tracktags.each(function() {				
				t.tracks.push({
					srclang: $(this).attr('srclang').toLowerCase(), 
					src: $(this).attr('src'),
					entries: [],
					isLoaded: false,
					isTranslation: false
				});
			});
			
			// add user-defined translations
			if (t.tracks.length > 0 && t.options.translations.length > 0) {
				for (i=0; i<t.options.translations.length; i++) {
					t.tracks.push({
						srclang: t.options.translations[i].toLowerCase(), 
						src: null,
						entries: [],
						isLoaded: false,
						isTranslation: true
					});
				}
			}
			
			// begin loading, or remove button
			if (t.tracks.length > 0) {
				t.loadNextSubtitle();
			} else {
				t.captions.remove();
				t.setRailSize();			
			}
		},
		
		addTrackButton: function(lang) {
			var t = this,
				l = html5.language.codes[lang] || lang;
			
			t.captions.find('ul').append(
				$('<li>'+ 
					'<input type="radio" name="' + t.id + '_captions" id="' + t.id + '_captions_' + lang + '" value="' + lang + '" />' +
					'<label for="' + t.id + '_captions_' + lang + '">' + l + '</label>'+										
				'</li>')
			);
			t.captions.find('.mep-captions-selector').height(
				t.captions.find('.mep-captions-selector ul').height()
			);
		},
		
		loadNextSubtitle: function() {
			var t = this;
			
			t.trackToLoad++;
			if (t.trackToLoad < t.tracks.length){
				t.loadSubtitles(t.trackToLoad);
			} else {
				// add done?
			}
		},

		loadSubtitles: function(index){
			var 
				t = this,
				track = t.tracks[index];
				
			if (track.isTranslation) {

				// translate the first track
				html5.SrtParser.translate(t.tracks[0].entries, t.tracks[0].srclang, track.srclang, function(newOne) {
					
					// store the new translation
					track.entries = newOne;
					track.isLoaded = true;
					
					// create button
					t.addTrackButton(track.srclang);
					
					t.loadNextSubtitle();
				});
				
			} else {
				$.ajax({
					url: track.src,
					success: function(d) {
						
						// parse the loaded file
						track.entries = html5.SrtParser.parse(d);						
						track.isLoaded = true;
						
						// create button
						t.addTrackButton(track.srclang);
						
						// auto select 
						if (t.options.startLanguage == track.srclang && t.selectedTrack == null) {
							//t.selectedTrack = track;
							$('#' + t.id + '_captions_' + track.srclang).click();
						}
						
						t.loadNextSubtitle();
					},
					error: function() {
						t.loadNextSubtitle();				
					}
				});
			}
		},
		
		displayCaptions: function() {
			
			if (typeof this.tracks == 'undefined')
				return;
		
			var
				t = this,
				i,
				track = t.selectedTrack;
			
			if (track != null && track.isLoaded) {
				for (i=0; i<track.entries.times.length; i++) {
					if (t.mediaElement.currentTime >= track.entries.times[i].start && t.mediaElement.currentTime <= track.entries.times[i].stop){						
						t.captionsText.html(track.entries.text[i]);
						t.captionsDisplay.show();
						return; // exit out if one is visible;
					}
				}
				t.captionsDisplay.hide();
			} else {
				t.captionsDisplay.hide();
			}
		},
		
		buildPoster: function() {
			var t = this;
			
			// POSTER
			t.poster = t.container.find('.mep-poster');
			t.posterImg = t.poster.find('img');
			t.posterUrl = t.$media.attr('poster');
			t.posterUrl = (t.posterUrl === null || t.posterUrl == undefined) ? '' : t.posterUrl;
			
			if (t.posterUrl !== '') {			
				t.posterImg.attr('src',t.posterUrl);				
			} else {
				t.poster.hide();
			}		
		},
		
		buildOverlay: function() {
			var t = this;
			
			// OVERLAY
			t.overlay = t.container.find('.mep-overlay');
			t.overlayMessage = t.container.find('.mep-overlay-message');
			if (t.$media[0].getAttribute('autoplay') !== null) {
				t.showMessage(t.options.messages.loading);
			} else {
				t.showMessage(t.options.messages.start);
			}
			
			t.overlay.bind('click', function (e) {
				if (t.mediaElement.paused) {
					t.mediaElement.play();
				}
			}, true);		
		},
		
		showMessage: function (text) {
			if (this.isVideo) {
				this.overlayMessage.html(text);
				//overlay.show();
				this.overlay.css('visibility','visible');
			}
		},
		
		hideMessage: function () {
			//overlay.hide();
			this.overlay.css('visibility','hidden');
		},			
		
		buildControls: function() {
			
			var t = this;
			
			// CONTROLS BAR
			t.controls = t.container.find('.mep-controls')
			t.isControlsVisible = true;

			// CONTROL BUTTONS and BARS
			t.playpause = t.controls.find('.mep-playpause-button');
			t.fullscreen = t.controls.find('.mep-fullscreen-button');
			if (!t.isVideo)
				t.fullscreen.remove();
				
			t.time = t.controls.find('.mep-time');
			t.currentTime = t.controls.find('.mep-currenttime').html('00:00');
			t.duration = t.controls.find('.mep-duration').html('00:00');

			t.captions = t.controls.find('.mep-captions-button');			
			
			t.mute = t.controls.find('.mep-volume-button');
			t.volumeSlider = t.controls.find('.mep-volume-slider');
			t.volumeRail = t.controls.find('.mep-volume-rail');
			t.volumeHandle = t.controls.find('.mep-volume-handle');

			t.timeRail = t.controls.find('.mep-time-rail');
			t.timeCurrent = t.timeRail.find('.mep-time-current').width(0);
			t.timeLoaded = t.timeRail.find('.mep-time-loaded').width(0);
			t.timeTotal = t.timeRail.find('.mep-time-total');
			t.timeHandle = t.controls.find('.mep-time-handle');

			// setup controls
			t.controls.show();
			t.setRailSize();

			// hide unwanted controls	

			if (!t.options.controls.playpause) {
				t.playpause.remove();
			}
			
			if (!t.options.controls.timerail) {
				t.timeRail.remove();
			}	

			if (!t.options.controls.duration) {
				t.time.remove();
			}	
			
			if (!t.options.controls.volume) {
				t.mute.remove();
			}	
			
			if (!t.options.controls.fullscreen) {
				t.fullscreen.remove();
			}				
		},
		
		buildControlBar: function() {
			var t = this;
		
			if (t.isVideo) {
				// show/hide controls
				t.container
					.bind('mouseenter', function () { 
						t.controls.css('visibility','visible');						
						t.controls.fadeIn(200); 
						t.captionsDisplay.css('padding-bottom', t.controls.height() + 5);
						t.setRailSize(); 
						t.isControlsVisible = true; 
					})
					.bind('mouseleave', function () { 
						t.controls.fadeOut(200, function() {
							$(this).css('visibility','hidden');
							$(this).css('display','block');
							t.captionsDisplay.css('padding-bottom', 10);
						}); 
						t.isControlsVisible = false; 
					});
			}		
		},
		
		buildPlayPause: function() {
			var t = this;
			
			// PLAY/PAUSE button
			t.playpause.bind('click', function () {
				if (t.playpause.hasClass('mep-play')) {
					//if (mediaElement.paused) {
					t.mediaElement.play();
					t.playpause.removeClass('mep-play').addClass('mep-pause');
				} else {
					t.mediaElement.pause();
					t.playpause.removeClass('mep-pause').addClass('mep-play');
				}
			});
		},
		
		buildTimeRail: function() {
			var t = this;
			
			// TIME RAIL
			t.timeRail.delegate('span', 'click', function (e) {
				// mouse position relative to the object
				var x = e.pageX,
					offset = t.timeTotal.offset(),
					width = t.timeTotal.outerWidth(),
					percentage = ((x - offset.left) / width),
					newTime = percentage * t.mediaElement.duration;

				t.mediaElement.setCurrentTime(newTime);
			});

			// attach events to <video/audio> for RAIL updates
			t.mediaElement.addEventListener('timeupdate', function (e) {

				t.displayCaptions();			
			
				//if (!t.isControlsVisible)
				//	return;
				
				t.setTimePosition();
				t.setTimeLoaded(e.target);						

			}, true);

			t.mediaElement.addEventListener('progress', function (e) {				
				t.setTimeLoaded(e.target);
			}, true);		
		},
		
		setTimePosition: function() {
			var 
				t = this,
				newWidth,
				handlePos;
			
			if (t.mediaElement.currentTime && t.mediaElement.duration) {

				// update current and duration text
				t.currentTime.html(html5.Utility.secondsToTimeCode(t.mediaElement.currentTime));
				if (t.mediaElement.duration)
					t.duration.html(html5.Utility.secondsToTimeCode(t.mediaElement.duration));

				// update bar and handle				 
				newWidth = t.timeTotal.width() * t.mediaElement.currentTime / t.mediaElement.duration;
				handlePos = newWidth - (t.timeHandle.width() / 2);
			
				t.timeCurrent.width(newWidth);
				t.timeHandle.css('left', handlePos);
			}		
		},
			
		setTimeLoaded:function(target) {
			var 
				t = this,
				percent = null;
			
			// Some browsers (e.g., FF3.6 and Safari 5) cannot calculate target.bufferered.end()
			// to be anything other than 0. If the byte count is available we use this instead.
			// Browsers that support the else if do not seem to have the bufferedBytes value and
			// should skip to there. Tested in Safari 5, Webkit head, FF3.6, Chrome 6, IE 7/8.
			if (target && target.bytesTotal != undefined && target.bytesTotal > 0 && target.bufferedBytes != undefined) {
				percent = target.bufferedBytes / target.bytesTotal;
			}
			// need to account for a real array with multiple values (only Firefox 4 has this so far)
			else if (target && target.buffered && target.buffered.length > 0 && target.buffered.end && target.duration) {
				percent = target.buffered.end(0) / target.duration;
			}

			if (percent !== null) {
				// update loaded bar
				t.timeLoaded.width(t.timeTotal.width() * percent);			
			}
		},		

		setRailSize: function() {
			var 
				t = this,
				
				usedWidth = t.playpause.outerWidth(true) +
							t.time.outerWidth(true) +
							t.mute.outerWidth(true) +
							t.captions.outerWidth(true) +
							((t.isVideo) ? t.fullscreen.outerWidth(true) : 0),
				
				//usedWidth = t.timeRail.siblings().outerWidth(true),
				railWidth = t.controls.width() - usedWidth - (t.timeRail.outerWidth(true) - t.timeRail.outerWidth(false));

			t.timeRail.width(railWidth);
			t.timeTotal.width(railWidth - (t.timeTotal.outerWidth(true) - t.timeTotal.width()));
		},

		setPlayerSize: function(width,height) {
			var t = this;
			
			// ie9 appears to need this (jQuery bug?)
			t.width = parseInt(width, 10);
			t.height = parseInt(height, 10);
			
			t.container
				.width(t.width)
				.height(t.height);
				
			t.captionsDisplay
			//	.height(t.height)
				.width(t.width);					

			t.overlay
				.width(t.width)
				.height(t.height);	
				
			t.posterImg
				.height(t.height)
				.width(t.width);								
		},

		handleError: function(me) {
			var t = this;
			
			t.$media.hide();
			
			//t.showMessage(t.options.messages.error);
			t.overlay.hide();
			t.controls.hide();
			t.poster.hide();
		},

		buildFullscreen: function() {
			var t = this;
	
			t.isFullScreen = false;
			t.normalHeight = 0;
			t.normalWidth = 0;
			
			t.fullscreen.bind('click', function () {
				t.setFullScreen(!t.isFullScreen);
			});			
		},

		setFullScreen: function (goFullScreen) {
			var t = this;
			
			switch (t.mediaElement.pluginType) {
				case 'flash':
					t.mediaElement.setFullscreen(goFullScreen);
					break;
				case 'silverlight':
					t.mediaElement.setFullscreen(goFullScreen);
					break;
				case 'native':

					if (html5.MediaFeatures.hasNativeFullScreen) {
						
						if (goFullScreen) {
							t.mediaElement.webkitEnterFullScreen();
						} else {
							t.mediaElement.webkitExitFullScreen();
						}
					
					} else {			
						if (goFullScreen) {

							// store
							t.normalHeight = t.$media.height();
							t.normalWidth = t.$media.width();

							// make full size
							t.container
								.addClass('mep-container-fullscreen')
								.width('100%')
								.height('100%')
								.css('z-index', 1000);

							t.$media
								.width('100%')
								.height('100%');

							t.overlay
								.width('100%')
								.height('100%');

							t.posterImg
								.width('100%')
								.height('auto');

							t.fullscreen
								.removeClass('mep-fullscreen')
								.addClass('mep-unfullscreen');

							t.setRailSize();

							t.escB = function(e) { t.escListener(e); };
							t.resB = function(e) { t.resizeListener(e); };
							
							$(document).bind('keydown', t.escB);
							$(window).bind('resize', t.resB);
						} else {

							t.container
								.removeClass('mep-container-fullscreen')
								.width(t.normalWidth)
								.height(t.normalHeight)
								.css('z-index', 1);
								
							t.$media
								.width(t.normalWidth)
								.height(t.normalHeight);

							t.posterImg
								.width(t.normalWidth)
								.height(t.normalHeight);

							t.fullscreen
								.removeClass('mep-unfullscreen')
								.addClass('mep-fullscreen');

							t.setRailSize();

							$(document).unbind('keydown', t.escB);
							$(window).unbind('resize', t.resB);
						}
					}
			}
			t.isFullScreen = goFullScreen;
		},

		escListener: function (e) {
			if (e.keyCode == 27) {
				this.setFullScreen(false);
			}
		},

		resizeListener: function(e) {
			this.setRailSize();
		},
		
		buildVolumeControls: function() {
			var t = this;
			
			t.vmmB = function(e) { t.volumeMove(e); };
			t.vrmB = function(e) { t.removeMouseMove(e); };
			
			// SLIDER
			t.volumeSlider.bind('mousedown', function (e) {
				t.volumeMove(e);
				$(document)
					.bind('mousemove', t.vmmB)
					.bind('mouseup', t.vrmB);
			});			

			// MUTE
			t.mute.find('span').bind('click', function () {
				if (t.mediaElement.muted) {
					t.mediaElement.setMuted(false);
					t.mute.removeClass('mep-unmute').addClass('mep-mute');
					t.positionVolumeHandle(1);
				} else {
					t.mediaElement.setMuted(true);
					t.mute.removeClass('mep-mute').addClass('mep-unmute');
					t.positionVolumeHandle(0);
				}
			});	
			
		},
		
		volumeMove: function(e) {
			var 
				t = this,				
				railHeight = t.volumeRail.height(),
				newY = e.pageY - t.volumeRail.offset().top,
				volume = (railHeight - newY) / railHeight
			
			// only allow it to move within the rail
			if (newY < 0)
				newY = 0;
			else if (newY > railHeight)
				newY = railHeight;

			// move the handle to match the mouse
			t.volumeHandle.css('top', newY - (t.volumeHandle.height() / 2));

			// set mute status
			if (volume == 0) {
				t.mediaElement.setMuted(true);
				t.mute.removeClass('mep-mute').addClass('mep-unmute');
			} else {
				t.mediaElement.setMuted(false);
				t.mute.removeClass('mep-unmute').addClass('mep-mute');
			}

			// set the volume
			t.mediaElement.setVolume(volume);
		},
		
		positionVolumeHandle: function(volume) {
			var t = this;
			t.volumeHandle.css('top', t.volumeRail.height() - (t.volumeRail.height() * volume) - (t.volumeHandle.height() / 2));
		},
		
		removeMouseMove: function() {
			var t = this;
			//$(document).css('cursor','');
			$(document)
				.unbind('mousemove', t.vmmB)
				.unbind('mouseup', t.vrmB);
		}		
	};
	
	html5.language = {
		codes:  {
			af:'Afrikaans',
			sq:'Albanian',
			ar:'Arabic',
			be:'Belarusian',
			bg:'Bulgarian',
			ca:'Catalan',
			zh:'Chinese',
			'zh-cn':'Chinese (Simplified)',
			'zh-tw':'Chinese (Traditional)',
			hr:'Croatian',
			cs:'Czech',
			da:'Danish',
			nl:'Dutch',
			en:'English',
			et:'Estonian',
			tl:'Filipino',
			fi:'Finnish',
			fr:'French',
			gl:'Galician',
			de:'German',
			el:'Greek',
			ht:'Haitian (Creole)',
			iw:'Hebrew',
			hi:'Hindi',
			hu:'Hungarian',
			is:'Icelandic',
			id:'Indonesian',
			ga:'Irish',
			it:'Italian',
			ja:'Japanese',
			ko:'Korean',
			lv:'Latvian',
			lt:'Lithuanian',
			mk:'Macedonian',
			ms:'Malay',
			mt:'Maltese',
			no:'Norwegian',
			fa:'Persian',
			pl:'Polish',
			pt:'Portuguese',
			'pt-pt':'Portuguese (Portugal)',
			ro:'Romanian',
			ru:'Russian',
			sr:'Serbian',
			sk:'Slovak',
			sl:'Slovenian',
			es:'Spanish',
			sw:'Swahili',
			sv:'Swedish',
			tl:'Tagalog',
			th:'Thai',
			tr:'Turkish',
			uk:'Ukrainian',
			vi:'Vietnamese',
			cy:'Welsh',
			yi:'Yiddish'
		}
	};
	
	/*
	Parses SRT format which should be formatted as
	1
	00:00:01,1 --> 00:00:05,000
	A line of text

	2
	00:01:15,1 --> 00:02:05,000
	A second line of text

	Adapted from: http://www.delphiki.com/html5/playr
	*/
	html5.SrtParser = {	
		timecodeToSeconds: function(timecode){
			var tab = timecode.split(':');
			return tab[0]*60*60 + tab[1]*60 + parseFloat(tab[2].replace(',','.'));
		},
		parse: function(srtText) {
			var 
				pattern_identifier = /^[0-9]+$/,
				pattern_timecode = /^([0-9]{2}:[0-9]{2}:[0-9]{2}(,[0-9]{1,3})?) --\> ([0-9]{2}:[0-9]{2}:[0-9]{2}(,[0-9]{3})?)(.*)$/,		
				i = 0,
				lines = srtText.split(/\r?\n/),
				entries = {text:[], times:[]},
				timecode,
				text;
				
			for(; i<lines.length; i++) {
				// check for the line number
				if (pattern_identifier.exec(lines[i])){
					// skip to the next line where the start --> end time code should be
					i++;
					timecode = pattern_timecode.exec(lines[i]);
					if (timecode && i<lines.length){
						i++;
						// grab all the (possibly multi-line) text that follows
						text = lines[i];
						i++;
						while(lines[i] !== '' && i<lines.length){
							text = text + '\n' + lines[i];
							i++;
						}
					
						
						entries.text.push(text);
						entries.times.push(
						{
							start: this.timecodeToSeconds(timecode[1]),
							stop: this.timecodeToSeconds(timecode[3]),
							settings: timecode[5]
						});
					}
				}
			}
			
			return entries;		
		},
		
		canTranslate: function() {
			return !(typeof(google) == 'undefined' || typeof(google.language) == 'undefined');
		},
		
		translate: function(srtData, fromLang, toLang, callback) {
			
			if (!this.canTranslate()) {
				callback(null);
				return;
			}
			
			var 
				text =  srtData.text.join(' <span></span>'),
				entries = {text:[], times:[]},
				lines,
				i;
				
			if (text.length > 1000)
				text = text.substring(0,1000);
			
			google.language.translate(text, fromLang, toLang, function(result) {
				// split on separators
				lines = result.translation.split('<span></span>');
				
				// create new entries
				for (i=0;i<srtData.text.length; i++) {
					// add translated line
					entries.text[i] = lines[i];
					// copy existing times
					entries.times[i] = {
						start: srtData.times[i].start,
						stop: srtData.times[i].stop,
						settings: srtData.times[i].settings
					};
				}
				
				callback(entries);
			});	
		}
	};	

	// turn into jQuery plugin
	jQuery.fn.mediaelementplayer = function (options) {
		return this.each(function () {
			return new MediaElementPlayer($(this), options);
		});
	};

	// push out to window
	window.MediaElementPlayer = html5.MediaElementPlayer;

})(jQuery);

