/*!
 * Media Element jQuery plugin
 * http://mediaelementjs.com/
 *
 * Creates a controller bar for HTML5 <video> tags
 * and falls back to a Flash player or Silverlight player for browsers that
 * do not support <video> or cannot play the video type.
 * Mostly designed for H.264, but can also play Ogg, WebM, FLV, WMV, ACC and MP3
 *
 * Copyright 2010, John Dyer
 * Dual licensed under the MIT or GPL Version 2 licenses.
 *
 * Version: 1.0.6
 */

// TODO:
// - make volume be event driven, remember setting (cookie, startup)

(function ($) {

	var v = document.createElement('video');
	var ua = navigator.userAgent;
	
	// native fullscreen (Safari only, Chrome fails)
	var hasNativeFullScreen = (typeof v.webkitEnterFullScreen !== 'undefined');
	if (ua.match('Chrome')) hasNativeFullScreen = false;

	// default player values
	var mediaElementPlayerDefaults = {
		  defaultVideoWidth: 480   	// default if the <video width> is not specified
		, defaultVideoHeight: 270  	// default if the <video height> is not specified
		, videoWidth: -1						// if set, overrides <video width> 
		, videoHeight: -1						// if set, overrides <video height>
		, audioWidth: 300						// width of audio player
		, audioHeight: 30						// height of audio player
		, messages: {
				  start: "Click to Start"
				, loading: "Loading"				  
				, paused: "Paused"
				, error: "Error"
				, ended: "Ended"				
		}		
	}

	// utility methods
	function formatTime(seconds) {
		seconds = Math.round(seconds);
		minutes = Math.floor(seconds / 60);
		minutes = (minutes >= 10) ? minutes : "0" + minutes;
		seconds = Math.floor(seconds % 60);
		seconds = (seconds >= 10) ? seconds : "0" + seconds;
		return minutes + ":" + seconds;
	}

	var playerIndex = 0;

	// wraps a MediaElement object in player controls
	function MediaElementPlayer($media, o) {

		$media = $($media);
		var options = $.extend(true,{},mediaElementPlayerDefaults,o);

		var isVideo = $media[0].tagName.toLowerCase() == 'video';
		var id = 'mep_' + playerIndex++;

		// ipad/iphone test
		var u = navigator.userAgent;
		var isiPad = (u.match(/iPad/i) != null);
		var isiPhone = (u.match(/iPhone/i) != null);
		var isAndroid = (u.match(/Android/i) != null);

		if (isiPad || isiPhone) {
			// add controls and stop
			$media.attr('controls', 'controls');
			// fix Apple bug
			$media.removeAttr('poster');

			// override Apple's autoplay override for iPads
			if (isiPad && $media[0].getAttribute('autoplay') !== null) {
				$media[0].load();
				$media[0].play();
			}

			// don't do the rest
			return;
		} else if (isAndroid && isVideo) {

			// Andriod is better off with native controls (like iOS)
			$media.attr('controls', 'controls');
			return;
			
		} else {

			// remove native controls and use MEP
			$media.removeAttr('controls');
		}

		var html = $(
		'<div id="' + id + '" class="mep-container">\
			<div class="mep-mediaelement">\
			</div>\
			<div class="mep-poster">\
				<img />\
			</div>\
			<div class="mep-overlay">\
				<div class="mep-overlay-message"></div>\
			</div>\
			<div class="mep-controls">\
				<div class="mep-playpause-button mep-play"><span></span></div>\
				<div class="mep-time-rail">\
					<span class="mep-time-total">\
						<span class="mep-time-loaded"></span>\
						<span class="mep-time-current"></span>\
						<span class="mep-time-handle"></span>\
					</span>\
				</div>\
				<div class="mep-time">\
					<span class="mep-currenttime"></span>\
					<span>|</span>\
					<span class="mep-duration"></span>\
				</div>\
				<div class="mep-volume-button mep-mute">\
					<span></span> \
					<div class="mep-volume-slider">\
						<div class="mep-volume-rail">\
							<div class="mep-volume-handle"></div>\
						</div>\
					</div>\
				</div>\
				<div class="mep-fullscreen-button"><span></span></div>\
			</div>\
			<div class="mep-clear"></div>\
		</div>');

		// insert and switch position
		$media.before(html);
		var container = $('#' + id);

		// put the <video> tag in the right spot
		container.find('.mep-mediaelement').append($media);

		// move any skins up to the container
		container.addClass($media[0].className);

		var poster = container.find('.mep-poster');
		var posterImg = poster.find('img');
		poster.hide();

		// append a poster
		var posterUrl = $media.attr('poster');

		if (posterUrl !== '') {			
			posterImg.attr('src',posterUrl);
			poster.show();
		}

		// create overlay
		var overlay = container.find('.mep-overlay');
		var overlayMessage = container.find('.mep-overlay-message');
		if ($media[0].getAttribute('autoplay') !== null)
			showMessage(options.messages.loading);
		else
			showMessage(options.messages.start);		

		// set container size to video size
		function setPlayerSize(width,height) {
			
			// ie9 appears to need this (jQuery bug?)
			width = parseInt(width);
			height = parseInt(height);
			
			container
				.width(width)
				.height(height);

			overlay
				.width(width)
				.height(height);	
				
			posterImg
				.height(height)
				.width(width);								
		}
		
		var width = 0;
		var height = 0;
				
		if (isVideo) {			
			// priority = videoWidth (forced), width attribute, defaultVideoWidth		
			width = (options.videoWidth > 0) ? options.videoWidth : ($media[0].getAttribute('width') !== null) ? $media.attr('width') : options.defaultVideoWidth;
			height = (options.videoHeight > 0) ? options.videoHeight : ($media[0].getAttribute('height') !== null) ? $media.attr('height') : options.defaultVideoHeight;				
		} else {
			width = options.audioWidth;
			height = options.audioHeight;
		}
		
		setPlayerSize(width, height);
		
		// controls bar
		var controls = container.find('.mep-controls')
		var isControlsVisible = true;

		if (isVideo) {
			// show/hide controls
			container
				.bind('mouseenter', function () { controls.fadeIn(200); setRailSize(); isControlsVisible = true; })
				.bind('mouseleave', function () { controls.fadeOut(200); isControlsVisible = false; });
		}

		function showMessage(text) {
			if (isVideo) {
				overlayMessage.html(text);
				//overlay.show();
				overlay.css('visibility','visible');
			}
		}
		function hideMessage() {
			//overlay.hide();
			overlay.css('visibility','hidden');
		}


		// find controls
		var playpause = controls.find('.mep-playpause-button');
		var fullscreen = controls.find('.mep-fullscreen-button');
		if (!isVideo)
			fullscreen.remove();

		var time = controls.find('.mep-time');
		var currentTime = controls.find('.mep-currenttime').html('00:00');
		var duration = controls.find('.mep-duration').html('00:00');

		var mute = controls.find('.mep-volume-button');
		var volumeSlider = controls.find('.mep-volume-slider');
		var volumeRail = controls.find('.mep-volume-rail');
		var volumeHandle = controls.find('.mep-volume-handle');

		var timeRail = controls.find('.mep-time-rail');
		var timeCurrent = timeRail.find('.mep-time-current').width(0);
		var timeLoaded = timeRail.find('.mep-time-loaded').width(0);
		var timeTotal = timeRail.find('.mep-time-total');
		var timeHandle = controls.find('.mep-time-handle');

		function setRailSize() {
			var usedWidth = playpause.outerWidth(true) +
												time.outerWidth(true) +
												mute.outerWidth(true) +
												((isVideo) ? fullscreen.outerWidth(true) : 0);

			var railWidth = controls.width() - usedWidth - (timeRail.outerWidth(true) - timeRail.outerWidth(false));

			timeRail.width(railWidth);
			timeTotal.width(railWidth - (timeTotal.outerWidth(true) - timeTotal.width()));
		}

		function setupControls(mediaElement, domNode) {
			controls.show();
			setRailSize();

			// play/pause button
			playpause.bind('click', function () {

				if (playpause.hasClass('mep-play')) {
					//if (mediaElement.paused) {
					mediaElement.play();
					playpause.removeClass('mep-play').addClass('mep-pause');
				} else {
					mediaElement.pause();
					playpause.removeClass('mep-pause').addClass('mep-play');
				}
			});

			// VOLUME SLIDER
			function volumeMove(e) {
				//$('body').css('cursor','N-resize');

				// only allow it to move within the rail
				var railHeight = volumeRail.height();
				var newY = e.pageY - volumeRail.offset().top;
				if (newY < 0)
					newY = 0;
				else if (newY > railHeight)
					newY = railHeight;

				// set position
				volumeHandle.css('top', newY - (volumeHandle.height() / 2));

				// calculate volume
				var volume = (railHeight - newY) / railHeight;

				// make sure to check mute status
				if (volume == 0) {
					mediaElement.setMuted(true);
					mute.removeClass('mep-mute').addClass('mep-unmute');
				} else {
					mediaElement.setMuted(false);
					mute.removeClass('mep-unmute').addClass('mep-mute');
				}

				mediaElement.setVolume(volume);
			};
			function positionVolumeHandle(volume) {
				volumeHandle.css('top', volumeRail.height() - (volumeRail.height() * volume) - (volumeHandle.height() / 2));
			}
			function removeMouseMove() {
				//$(document).css('cursor','');
				$(document)
					.unbind('mousemove', volumeMove)
					.unbind('mouseup', removeMouseMove);
			}
			volumeSlider.bind('mousedown', function (e) {
				volumeMove(e);
				$(document)
					.bind('mousemove', volumeMove)
					.bind('mouseup', removeMouseMove);
			});

			// MUTE
			mute.find('span').bind('click', function () {
				if (mediaElement.muted) {
					mediaElement.setMuted(false);
					mute.removeClass('mep-unmute').addClass('mep-mute');
					positionVolumeHandle(1);
				} else {
					mediaElement.setMuted(true);
					mute.removeClass('mep-mute').addClass('mep-unmute');
					positionVolumeHandle(0);
				}
			});

			// FULLSCREEN
			var isFullScreen = false;
			var normalHeight = 0;
			var normalWidth = 0;
			fullscreen.bind('click', function () {
				setFullScreen(!isFullScreen);
			});

			function setFullScreen(goFullScreen) {
				switch (mediaElement.pluginType) {
					case 'flash':
						mediaElement.setFullscreen(goFullScreen);
						break;
					case 'silverlight':
						mediaElement.setFullscreen(goFullScreen);
						break;
					case 'native':

						if (hasNativeFullScreen) {
							
							if (goFullScreen) {
								mediaElement.webkitEnterFullScreen();
							} else {
								mediaElement.webkitExitFullScreen();
							}
						
						} else {			
							if (goFullScreen) {

								// store
								normalHeight = $media.height();
								normalWidth = $media.width();

								// make full size
								container
									.addClass('mep-container-fullscreen')
									.width('100%')
									.height('100%')
									.css('z-index', 1000);

								$media
									.width('100%')
									.height('100%');

								overlay
									.width('100%')
									.height('100%');

								posterImg
									.width('100%')
									.height('auto');

								fullscreen
									.removeClass('mep-fullscreen')
									.addClass('mep-unfullscreen');

								setRailSize();


								$(document).bind('keydown', escListener);
								$(window).bind('resize', resizeListener);
							} else {

								container
									.removeClass('mep-container-fullscreen')
									.width(normalWidth)
									.height(normalHeight)
									.css('z-index', 1);
								$media
									.width(normalWidth)
									.height(normalHeight);

								posterImg
									.width(normalWidth)
									.height(normalHeight);

								fullscreen
									.removeClass('mep-unfullscreen')
									.addClass('mep-fullscreen');

								setRailSize();

								$(document).unbind('keydown', escListener);
								$(window).unbind('resize', resizeListener);

							}
						}
					}
					isFullScreen = goFullScreen;
			}

			function escListener(e) {
				if (e.keyCode == 27)
					setFullScreen(false);
			}

			function resizeListener(e) {
				setRailSize();
			}

			// time rail
			timeRail.delegate('span', 'click', function (e) {
				// mouse position relative to the object!
				var x = e.pageX;
				var offset = timeTotal.offset();
				var width = timeTotal.outerWidth();
				var percentage = ((x - offset.left) / width);
				var newTime = percentage * mediaElement.duration;

				mediaElement.setCurrentTime(newTime);
			});
			
			overlay.bind('click', function (e) {
				if (mediaElement.paused)
					mediaElement.play();
			}, true);

			// attach events to <video>
			mediaElement.addEventListener('timeupdate', function (e) {

				if (!isControlsVisible)
					return;

				if (mediaElement.currentTime && mediaElement.duration) {

					// update current:duration
					currentTime.html(formatTime(mediaElement.currentTime));
					if (mediaElement.duration)
						duration.html(formatTime(mediaElement.duration));

					// update time bar
					var newWidth = timeTotal.width() * mediaElement.currentTime / mediaElement.duration;
					timeCurrent.width(newWidth);

					// position handle
					var handlePos = newWidth - (timeHandle.width() / 2);
					timeHandle.css('left', handlePos);
				}

				setTimeLoaded(e.target);

			}, true);

			mediaElement.addEventListener('progress', function (e) {				
				setTimeLoaded(e.target);
			}, true);

			// removed byte/loaded
			// changed over to W3C method, even through Chrome currently does this wrong.
			// need to account for a real array with multiple values			
			function setTimeLoaded(target) {
			  // Some broswers (e.g., FF3.6 and Safari 5) cannot calculate target.bufferered.end()
			  // to be anything other than 0. If the byte count is available we use this instead.
			  // Browsers that support the else if do not seem to have the bufferedBytes value and
			  // should skip to there. Tested in Safari 5, Webkit head, FF3.6, Chrome 6, IE 7/8.
				if (target && target.bytesTotal != undefined && target.bytesTotal > 0 && target.bufferedBytes != undefined) {
				  var percent = target.bufferedBytes / target.bytesTotal;

				  // update loaded bar
					timeLoaded.width(timeTotal.width() * percent);
				}
				else if (target && target.buffered && target.buffered.length > 0 && target.buffered.end && target.duration) {
					// calculate percentage
					var percent = target.buffered.end(0) / target.duration;

					// update loaded bar
					timeLoaded.width(timeTotal.width() * percent);
				}			
			}

			mediaElement.addEventListener('click', function (e) {
				if (mediaElement.paused)
					mediaElement.play();
			}, true);

			mediaElement.addEventListener('playing', function (e) {
				poster.hide();
				playpause.removeClass('mep-play').addClass('mep-pause');
				hideMessage();
			}, true);

			mediaElement.addEventListener('pause', function (e) {	
				playpause.removeClass('mep-pause').addClass('mep-play');
				showMessage(options.messages.paused);
			}, true);

			mediaElement.addEventListener('ended', function (e) {
				poster.show();
				playpause.removeClass('mep-pause').addClass('mep-play');
				showMessage(options.messages.ended);
			}, true);
			
			mediaElement.addEventListener('loadedmetadata', function(e) {
				// if the <video height> was not set and the options.videoHeight was not set
				// then resize to the real dimensions
				if (isVideo && options.videoHeight <= 0 && $media[0].getAttribute('height') === null && !isNaN(e.target.videoHeight)) {
					setPlayerSize(e.target.videoWidth, e.target.videoHeight);
					setRailSize();
					mediaElement.setVideoSize(e.target.videoWidth, e.target.videoHeight);			
				}
				
			}, true);
			
			var testEvents = 'play playing played paused pausing'.split(' ');
			for (var i=0; i<testEvents.length;i++) {
				mediaElement.addEventListener(testEvents[i], function(e) {				
					console.log(e.type, e.target.paused);
				}, true);
			}

			// webkit has trouble doing this without a delay
			setTimeout(function () {
				setRailSize();
			}, 50);

			if (options.success)
				options.success(mediaElement, domNode);
		} // end setupControls

		function handleError(me) {
			showMessage(options.messages.error);
			
			var et = '';
			for (var ee in me)
				et += ee + ' = ' + me[ee] + ',';
			console.log('medialementplayer ERROR', et);
		}
		
		// create MediaElement, setup controls on success
		var meOptions = $.extend({}, options, { 
			pluginWidth: height, 
			pluginHeight: width,
			success: setupControls, 
			error: handleError });
			
		var mediaElement = html5.MediaElement($media[0], meOptions);

		return mediaElement;
	}

	// turn into jQuery plugin
	jQuery.fn.mediaelementplayer = function (options) {
		return this.each(function () {
			return new MediaElementPlayer($(this), options);
		});
	};

	window.html5.MediaElementPlayer = MediaElementPlayer;
	window.MediaElementPlayer = MediaElementPlayer;

})(jQuery);

