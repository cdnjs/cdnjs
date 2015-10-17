/*!
 * MediaElementPlayer
 * http://mediaelementjs.com/
 *
 * Creates a controller bar for HTML5 <video> add <audio> tags
 * using jQuery and MediaElement.js (HTML5 Flash/Silverlight wrapper)
 *
 * Copyright 2010, John Dyer (http://johndyer.me)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 *
 */
﻿(function ($) {

	// default player values
	mejs.MepDefaults = {
		// url to poster (to fix iOS 3.x)
		poster: '',
		// default if the <video width> is not specified
		defaultVideoWidth: 480,
		// default if the <video height> is not specified
		defaultVideoHeight: 270,
		// if set, overrides <video width>
		videoWidth: -1,
		// if set, overrides <video height>
		videoHeight: -1,
		// width of audio player
		audioWidth: 400,
		// height of audio player
		audioHeight: 30,
		// initial volume when the player starts (overrided by user cookie)
		startVolume: 0.8,
		// useful for <audio> player loops
		loop: false,
		// resize to media dimensions
		enableAutosize: true,
		// forces the hour marker (##:00:00)
		alwaysShowHours: false,
		// features to show
		features: ['playpause','current','progress','duration','tracks','volume','fullscreen']		
	};

	mejs.mepIndex = 0;

	// wraps a MediaElement object in player controls
	mejs.MediaElementPlayer = function($node, o) {
		// enforce object, even without "new" (via John Resig)
		if ( !(this instanceof mejs.MediaElementPlayer) ) {
			return new mejs.MediaElementPlayer($node, o);
		} 

		var
			t = this,
			mf = mejs.MediaFeatures;
			
		// create options
		t.options = $.extend({},mejs.MepDefaults,o);
		t.$media = t.$node = $($node);
		
		// these will be reset after the MediaElement.success fires
		t.node = t.media = t.$media[0];
		
		// check for existing player
		if (typeof t.node.player != 'undefined') {
			return t.node.player;
		} else {
			// attach player to DOM node for reference
			t.node.player = t;
		}
		
		t.isVideo = (t.media.tagName.toLowerCase() === 'video');
				
		/* FUTURE WORK = create player without existing <video> or <audio> node
		
		// if not a video or audio tag, then we'll dynamically create it
		if (tagName == 'video' || tagName == 'audio') {
			t.$media = $($node);
		} else if (o.tagName !== '' && o.src !== '') {
			// create a new node
			if (o.mode == 'auto' || o.mode == 'native') {
				
				$media = $(o.tagName);
				if (typeof o.src == 'string') {
					$media.attr('src',o.src);
				} else if (typeof o.src == 'object') {
					// create source nodes
					for (var x in o.src) {
						$media.append($('<source src="' + o.src[x].src + '" type="' + o.src[x].type + '" />'));
					}
				}
				if (o.type != '') {
					$media.attr('type',o.type);
				}
				if (o.poster != '') {
					$media.attr('poster',o.poster);
				}
				if (o.videoWidth > 0) {
					$media.attr('width',o.videoWidth);
				}
				if (o.videoHeight > 0) {
					$media.attr('height',o.videoHeight);
				}
				
				$node.clear();
				$node.append($media);
				t.$media = $media;
			} else if (o.mode == 'shim') {
				$media = $();
				// doesn't want a media node
				// let MediaElement object handle this
			}
		} else {
			// fail?
			return;
		}	
		*/
		
		t.init();

		return t;
	};

	// actual player
	mejs.MediaElementPlayer.prototype = {
		init: function() {

			var
				t = this,
				mf = mejs.MediaFeatures,
				// options for MediaElement (shim)
				meOptions = $.extend(true, {}, t.options, {
					success: function(media, domNode) { t.meReady(media, domNode); },
					error: function(e) { t.handleError(e);}
				});
		
		
			// use native controls in iPad, iPhone, and Android	
			if (mf.isiPad || mf.isiPhone) {
				// add controls and stop
				t.$media.attr('controls', 'controls');

				// fix iOS 3 bug
				t.$media.removeAttr('poster');

				// override Apple's autoplay override for iPads
				if (mf.isiPad && t.media.getAttribute('autoplay') !== null) {
					t.media.load();
					t.media.play();
				}
					
			} else if (mf.isAndroid) {

				if (t.isVideo) {
					// Android fails when there are multiple source elements and the type is specified
					// <video>
					// <source src="file.mp4" type="video/mp4" />
					// <source src="file.webm" type="video/webm" />
					// </video>
					if (t.$media.find('source').length > 0) {
						// find an mp4 and make it the root element source
						t.media.src = t.$media.find('source[src$="mp4"]').attr('src');
					}

					// attach a click event to the video and hope Android can play it
					t.$media.click(function() {
						t.media.play();
					});
			
				} else {
					// audio?
					// 2.1 = no support
					// 2.2 = Flash support
					// 2.3 = Native HTML5
				}

			} else {

				// DESKTOP: use MediaElementPlayer controls
				
				// remove native controls 			
				t.$media.removeAttr('controls');					
				
				// unique ID
				t.id = 'mep_' + mejs.mepIndex++;

				// build container
				t.container =
					$('<div id="' + t.id + '" class="mejs-container">'+
						'<div class="mejs-inner">'+
							'<div class="mejs-mediaelement"></div>'+
							'<div class="mejs-layers"></div>'+
							'<div class="mejs-controls"></div>'+
							'<div class="mejs-clear"></div>'+
						'</div>' +
					'</div>')
					.addClass(t.$media[0].className)
					.insertBefore(t.$media);

				// move the <video/video> tag into the right spot
				t.container.find('.mejs-mediaelement').append(t.$media);

				// find parts
				t.controls = t.container.find('.mejs-controls');
				t.layers = t.container.find('.mejs-layers');

				// determine the size
				if (t.isVideo) {
					// priority = videoWidth (forced), width attribute, defaultVideoWidth
					t.width = (t.options.videoWidth > 0) ? t.options.videoWidth : (t.$media[0].getAttribute('width') !== null) ? t.$media.attr('width') : t.options.defaultVideoWidth;
					t.height = (t.options.videoHeight > 0) ? t.options.videoHeight : (t.$media[0].getAttribute('height') !== null) ? t.$media.attr('height') : t.options.defaultVideoHeight;
				} else {
					t.width = t.options.audioWidth;
					t.height = t.options.audioHeight;
				}

				// set the size, while we wait for the plugins to load below
				t.setPlayerSize(t.width, t.height);
				
				// create MediaElementShim
				meOptions.pluginWidth = t.height;
				meOptions.pluginHeight = t.width;				
			}

			// create MediaElement shim
			mejs.MediaElement(t.$media[0], meOptions);
		},

		// Sets up all controls and events
		meReady: function(media, domNode) {			
		
		
			var t = this,
				mf = mejs.MediaFeatures,
				f,
				feature;

			// make sure it can't create itself again if a plugin reloads
			if (this.created)
				return;
			else
				this.created = true;			

			t.media = media;
			t.domNode = domNode;
			
			if (!mf.isiPhone && !mf.isAndroid && !mf.isiPad) {				
				

				// two built in features
				t.buildposter(t, t.controls, t.layers, t.media);
				t.buildoverlays(t, t.controls, t.layers, t.media);

				// grab for use by feautres
				t.findTracks();

				// add user-defined features/controls
				for (f in t.options.features) {
					feature = t.options.features[f];
					if (t['build' + feature]) {
						try {
							t['build' + feature](t, t.controls, t.layers, t.media);
						} catch (e) {
							// TODO: report control error
							//throw e;
						}
					}
				}

				// reset all layers and controls
				t.setPlayerSize(t.width, t.height);
				t.setControlsSize();

				// controls fade
				if (t.isVideo) {
					// show/hide controls
					t.container
						.bind('mouseenter', function () {
							t.controls.css('visibility','visible');
							t.controls.stop(true, true).fadeIn(200);
						})
						.bind('mouseleave', function () {
							if (!t.media.paused) {
								t.controls.stop(true, true).fadeOut(200, function() {
									$(this).css('visibility','hidden');
									$(this).css('display','block');
								});
							}
						});
						
					// check for autoplay
					if (t.domNode.getAttribute('autoplay') !== null) {
						t.controls.css('visibility','hidden');
					}

					// resizer
					if (t.options.enableAutosize) {
						t.media.addEventListener('loadedmetadata', function(e) {
							// if the <video height> was not set and the options.videoHeight was not set
							// then resize to the real dimensions
							if (t.options.videoHeight <= 0 && t.domNode.getAttribute('height') === null && !isNaN(e.target.videoHeight)) {
								t.setPlayerSize(e.target.videoWidth, e.target.videoHeight);
								t.setControlsSize();
								t.media.setVideoSize(e.target.videoWidth, e.target.videoHeight);
							}
						}, false);
					}
				}

				// ended for all
				t.media.addEventListener('ended', function (e) {
					t.media.setCurrentTime(0);
					t.media.pause();
					
					if (t.setProgressRail)
						t.setProgressRail();
					if (t.setCurrentRail)
						t.setCurrentRail();						

					if (t.options.loop) {
						t.media.play();
					} else {
						t.controls.css('visibility','visible');
					}
				}, true);
				
				// resize on the first play
				t.media.addEventListener('loadedmetadata', function(e) {
					if (t.updateDuration) {
						t.updateDuration();
					}
					if (t.updateCurrent) {
						t.updateCurrent();
					}
					
					t.setControlsSize();
				}, true);


				// webkit has trouble doing this without a delay
				setTimeout(function () {
					t.setControlsSize();
					t.setPlayerSize(t.width, t.height);
				}, 50);
				
			}


			if (t.options.success) {
				t.options.success(t.media, t.domNode);
			}
		},

		handleError: function(e) {
			// Tell user that the file cannot be played
			if (this.options.error) {
				this.options.error(e);
			}
		},

		setPlayerSize: function(width,height) {
			var t = this;

			// ie9 appears to need this (jQuery bug?)
			t.width = parseInt(width, 10);
			t.height = parseInt(height, 10);

			t.container
				.width(t.width)
				.height(t.height);

			t.layers.children('.mejs-layer')
				.width(t.width)
				.height(t.height);
		},

		setControlsSize: function() {
			var t = this,
				usedWidth = 0,
				railWidth = 0,
				rail = t.controls.find('.mejs-time-rail'),
				total = t.controls.find('.mejs-time-total'),
				current = t.controls.find('.mejs-time-current'),
				loaded = t.controls.find('.mejs-time-loaded');
				others = rail.siblings();

			// find the size of all the other controls besides the rail
			others.each(function() {
				if ($(this).css('position') != 'absolute') {
					usedWidth += $(this).outerWidth(true);
				}
			});
			// fit the rail into the remaining space
			railWidth = t.controls.width() - usedWidth - (rail.outerWidth(true) - rail.outerWidth(false));

			// outer area
			rail.width(railWidth);
			// dark space
			total.width(railWidth - (total.outerWidth(true) - total.width()));
			
			if (t.setProgressRail)
				t.setProgressRail();
			if (t.setCurrentRail)
				t.setCurrentRail();				
		},


		buildposter: function(player, controls, layers, media) {
			var poster = 
				$('<div class="mejs-poster mejs-layer">'+
					'<img />'+
				'</div>')
					.appendTo(layers),
				posterUrl = player.$media.attr('poster'),
				posterImg = poster.find('img').width(player.width).height(player.height);

			// prioriy goes to option (this is useful if you need to support iOS 3.x (iOS completely fails with poster)
			if (player.options.poster != '') {
				posterImg.attr('src',player.options.poster);
			// second, try the real poster
			} else if (posterUrl !== '' && posterUrl != null) {
				posterImg.attr('src',posterUrl);
			} else {
				poster.remove();
			}

			media.addEventListener('play',function() {
				poster.hide();
			}, false);
		},

		buildoverlays: function(player, controls, layers, media) {
			if (!player.isVideo)
				return;

			var 
			loading = 
				$('<div class="mejs-overlay mejs-layer">'+
					'<div class="mejs-overlay-loading"><span></span></div>'+
				'</div>')
				.hide() // start out hidden
				.appendTo(layers),
			error = 
				$('<div class="mejs-overlay mejs-layer">'+
					'<div class="mejs-overlay-error"></div>'+
				'</div>')
				.hide() // start out hidden
				.appendTo(layers),				
				
			// this needs to come last so it's on top
			bigPlay = 
				$('<div class="mejs-overlay mejs-layer mejs-overlay-play">'+
					'<div class="mejs-overlay-button"></div>'+
				'</div>')
				.appendTo(layers)
				.click(function() {
					if (media.paused) {
						media.play();
					} else {
						media.pause();
					}
				});
	

			// show/hide big play button
			media.addEventListener('play',function() {
				bigPlay.hide();
				error.hide();
			}, false);
			media.addEventListener('pause',function() {
				bigPlay.show();
			}, false);
			
			// show/hide loading			
			media.addEventListener('loadstart',function() {
				loading.show();
			}, false);	
			media.addEventListener('canplay',function() {
				loading.hide();
			}, false);	

			// error handling
			media.addEventListener('error',function() {
				loading.hide();
				error.show();
				error.find('mejs-overlay-error').html("Error loading this resource");
			}, false);				
		},

		findTracks: function() {
			var t = this,
				tracktags = t.$media.find('track');

			// store for use by plugins
			t.tracks = [];
			tracktags.each(function() {
				t.tracks.push({
					srclang: $(this).attr('srclang').toLowerCase(),
					src: $(this).attr('src'),
					kind: $(this).attr('kind'),
					entries: [],
					isLoaded: false
				});
			});
		},
		changeSkin: function(className) {
			this.container[0].className = 'mejs-container ' + className;
			this.setPlayerSize();
			this.setControlsSize();
		},
		play: function() {
			this.media.play();
		},
		pause: function() {
			this.media.pause();
		},
		load: function() {
			this.media.load();
		},
		setMuted: function(muted) {
			this.media.setMuted(muted);
		},
		setCurrentTime: function(time) {
			this.media.setCurrentTime(time);
		},
		getCurrentTime: function() {
			return this.media.currentTime;
		},
		setVolume: function(volume) {
			this.media.setVolume(volume);
		},
		getVolume: function() {
			return this.media.volume;
		},
		setSrc: function(src) {
			this.media.setSrc(src);
		}
	};

	// turn into jQuery plugin
	jQuery.fn.mediaelementplayer = function (options) {
		return this.each(function () {
			new mejs.MediaElementPlayer($(this), options);
		});
	};

	// push out to window
	window.MediaElementPlayer = mejs.MediaElementPlayer;

})(jQuery);

(function($) {
	// PLAY/pause BUTTON
	MediaElementPlayer.prototype.buildplaypause = function(player, controls, layers, media) {
		var play = 
			$('<div class="mejs-button mejs-playpause-button mejs-play">' +
				'<span></span>' +
			'</div>')
			.appendTo(controls)
			.click(function() {
				if (media.paused) {
					media.play();
				} else {
					media.pause();
				}
			});

		media.addEventListener('play',function() {
			play.removeClass('mejs-play').addClass('mejs-pause');
		}, false);
		media.addEventListener('playing',function() {
			play.removeClass('mejs-play').addClass('mejs-pause');
		}, false);


		media.addEventListener('pause',function() {
			play.removeClass('mejs-pause').addClass('mejs-play');
		}, false);
		media.addEventListener('paused',function() {
			play.removeClass('mejs-pause').addClass('mejs-play');
		}, false);



	}
})(jQuery);
(function($) {
	// STOP BUTTON
	MediaElementPlayer.prototype.buildstop = function(player, controls, layers, media) {
		var stop = 
			$('<div class="mejs-button mejs-stop-button mejs-stop">' +
				'<span></span>' +
			'</div>')
			.appendTo(controls)
			.click(function() {
				if (!media.paused) {
					media.pause();
				}
				if (media.currentTime > 0) {
					media.setCurrentTime(0);	
					controls.find('.mejs-time-current').width('0px');
					controls.find('.mejs-time-handle').css('left', '0px');
					controls.find('.mejs-time-float-current').html( mejs.Utility.secondsToTimeCode(0) );
					controls.find('.mejs-currenttime').html( mejs.Utility.secondsToTimeCode(0) );					
					layers.find('.mejs-poster').show();
				}
			});
	}
})(jQuery);
(function($) {
	// progress/loaded bar
	MediaElementPlayer.prototype.buildprogress = function(player, controls, layers, media) {

		$('<div class="mejs-time-rail">'+
			'<span class="mejs-time-total">'+
				'<span class="mejs-time-loaded"></span>'+
				'<span class="mejs-time-current"></span>'+
				'<span class="mejs-time-handle"></span>'+
				'<span class="mejs-time-float">' + 
					'<span class="mejs-time-float-current">00:00</span>' + 
					'<span class="mejs-time-float-corner"></span>' + 
				'</span>'+
			'</span>'+
		'</div>')
			.appendTo(controls);

		var 
			t = this,
			total = controls.find('.mejs-time-total'),
			loaded  = controls.find('.mejs-time-loaded'),
			current  = controls.find('.mejs-time-current'),
			handle  = controls.find('.mejs-time-handle'),
			timefloat  = controls.find('.mejs-time-float'),
			timefloatcurrent  = controls.find('.mejs-time-float-current'),
			handleMouseMove = function (e) {
				// mouse position relative to the object
				var x = e.pageX,
					offset = total.offset(),
					width = total.outerWidth(),
					percentage = 0,
					newTime = 0;


				if (x > offset.left && x <= width + offset.left && media.duration) {
					percentage = ((x - offset.left) / width);
					newTime = (percentage <= 0.02) ? 0 : percentage * media.duration;

					// seek to where the mouse is
					if (mouseIsDown) {
						media.setCurrentTime(newTime);
					}

					// position floating time box
					var pos = x - offset.left;
					timefloat.css('left', pos);
					timefloatcurrent.html( mejs.Utility.secondsToTimeCode(newTime) );
				}
			},
			mouseIsDown = false,
			mouseIsOver = false;

		// handle clicks
		//controls.find('.mejs-time-rail').delegate('span', 'click', handleMouseMove);
		total
			.bind('mousedown', function (e) {
				mouseIsDown = true;
				handleMouseMove(e);
				return false;
			});

		controls.find('.mejs-time-rail')
			.bind('mouseenter', function(e) {
				mouseIsOver = true;
			})
			.bind('mouseleave',function(e) {
				mouseIsOver = false;
			});

		$(document)
			.bind('mouseup', function (e) {
				mouseIsDown = false;
				//handleMouseMove(e);
			})
			.bind('mousemove', function (e) {
				if (mouseIsDown || mouseIsOver) {
					handleMouseMove(e);
				}
			});

		// loading
		media.addEventListener('progress', function (e) {
			player.setProgressRail(e);
			player.setCurrentRail(e);
		}, false);

		// current time
		media.addEventListener('timeupdate', function(e) {
			player.setProgressRail(e);
			player.setCurrentRail(e);
		}, false);
		
		
		// store for later use
		t.loaded = loaded;
		t.total = total;
		t.current = current;
		t.handle = handle;
	}
	MediaElementPlayer.prototype.setProgressRail = function(e) {

		var
			t = this,
			target = (e != undefined) ? e.target : t.media,
			percent = null;			

		// newest HTML5 spec has buffered array (FF4, Webkit)
		if (target && target.buffered && target.buffered.length > 0 && target.buffered.end && target.duration) {
			// TODO: account for a real array with multiple values (only Firefox 4 has this so far) 
			percent = target.buffered.end(0) / target.duration;
		} 
		// Some browsers (e.g., FF3.6 and Safari 5) cannot calculate target.bufferered.end()
		// to be anything other than 0. If the byte count is available we use this instead.
		// Browsers that support the else if do not seem to have the bufferedBytes value and
		// should skip to there. Tested in Safari 5, Webkit head, FF3.6, Chrome 6, IE 7/8.
		else if (target && target.bytesTotal != undefined && target.bytesTotal > 0 && target.bufferedBytes != undefined) {
			percent = target.bufferedBytes / target.bytesTotal;
		}
		// Firefox 3 with an Ogg file seems to go this way
		else if (e && e.lengthComputable && e.total != 0) {
			percent = e.loaded/e.total;
		}

		// finally update the progress bar
		if (percent !== null) {
			percent = Math.min(1, Math.max(0, percent));
			// update loaded bar
			t.loaded.width(t.total.width() * percent);
		}
	}
	MediaElementPlayer.prototype.setCurrentRail = function() {

		var t = this;
	
		if (t.media.currentTime != undefined && t.media.duration) {

			// update bar and handle
			var 
				newWidth = t.total.width() * t.media.currentTime / t.media.duration,
				handlePos = newWidth - (t.handle.outerWidth(true) / 2);

			t.current.width(newWidth);
			t.handle.css('left', handlePos);
		}

	}	

})(jQuery);
(function($) {
	// current and duration 00:00 / 00:00
	MediaElementPlayer.prototype.buildcurrent = function(player, controls, layers, media) {
		var t = this;
		
		$('<div class="mejs-time">'+
				'<span class="mejs-currenttime">' + (player.options.alwaysShowHours ? '00:' : '') + '00:00</span>'+
			'</div>')
			.appendTo(controls);
		
		t.currenttime = t.controls.find('.mejs-currenttime');

		media.addEventListener('timeupdate',function() {
			player.updateCurrent();
		}, false);
	};

	MediaElementPlayer.prototype.buildduration = function(player, controls, layers, media) {
		var t = this;
		
		if (controls.children().last().find('.mejs-currenttime').length > 0) {
			$(' <span> | </span> '+
			   '<span class="mejs-duration">' + (player.options.alwaysShowHours ? '00:' : '') + '00:00</span>')
				.appendTo(controls.find('.mejs-time'));
		} else {

			$('<div class="mejs-time">'+
				'<span class="mejs-duration">' + (player.options.alwaysShowHours ? '00:' : '') + '00:00</span>'+
			'</div>')
			.appendTo(controls);
		}
		
		t.durationD = t.controls.find('.mejs-duration');

		media.addEventListener('timeupdate',function() {
			player.updateDuration();
		}, false);
	};
	
	MediaElementPlayer.prototype.updateCurrent = function() {
		var t = this;

		if (t.currenttime) {
			t.currenttime.html(mejs.Utility.secondsToTimeCode(t.media.currentTime | 0, t.options.alwaysShowHours || t.media.duration > 3600 ));
		}
	}
	MediaElementPlayer.prototype.updateDuration = function() {	
		var t = this;
		
		if (t.media.duration && t.durationD) {
			t.durationD.html(mejs.Utility.secondsToTimeCode(t.media.duration, t.options.alwaysShowHours));
		}		
	};	

})(jQuery);
(function($) {
	MediaElementPlayer.prototype.buildvolume = function(player, controls, layers, media) {
		var mute = 
			$('<div class="mejs-button mejs-volume-button mejs-mute">'+
				'<span></span>'+
				'<div class="mejs-volume-slider">'+ // outer background
					'<div class="mejs-volume-total"></div>'+ // line background
					'<div class="mejs-volume-current"></div>'+ // current volume
					'<div class="mejs-volume-handle"></div>'+ // handle
				'</div>'+
			'</div>')
			.appendTo(controls),
		volumeSlider = mute.find('.mejs-volume-slider'),
		volumeTotal = mute.find('.mejs-volume-total'),
		volumeCurrent = mute.find('.mejs-volume-current'),
		volumeHandle = mute.find('.mejs-volume-handle'),

		positionVolumeHandle = function(volume) {

			var 
				top = volumeTotal.height() - (volumeTotal.height() * volume);

			// handle
			volumeHandle.css('top', top - (volumeHandle.height() / 2));

			// show the current visibility
			volumeCurrent.height(volumeTotal.height() - top + parseInt(volumeTotal.css('top').replace(/px/,''),10));
			volumeCurrent.css('top',  top);
		},
		handleVolumeMove = function(e) {
			var
				railHeight = volumeTotal.height(),
				totalOffset = volumeTotal.offset(),
				totalTop = parseInt(volumeTotal.css('top').replace(/px/,''),10),
				newY = e.pageY - totalOffset.top,
				volume = (railHeight - newY) / railHeight

			// TODO: handle vertical and horizontal CSS
			// only allow it to move within the rail
			if (newY < 0)
				newY = 0;
			else if (newY > railHeight)
				newY = railHeight;

			// move the handle to match the mouse
			volumeHandle.css('top', newY - (volumeHandle.height() / 2) + totalTop );

			// show the current visibility
			volumeCurrent.height(railHeight-newY);
			volumeCurrent.css('top',newY+totalTop);

			// set mute status
			if (volume == 0) {
				media.setMuted(true);
				mute.removeClass('mejs-mute').addClass('mejs-unmute');
			} else {
				media.setMuted(false);
				mute.removeClass('mejs-unmute').addClass('mejs-mute');
			}

			volume = Math.max(0,volume);
			volume = Math.min(volume,1);

			// set the volume
			media.setVolume(volume);
		},
		mouseIsDown = false;

		// SLIDER
		volumeSlider
			.bind('mousedown', function (e) {
				handleVolumeMove(e);
				mouseIsDown = true;
				return false;
			});
		$(document)
			.bind('mouseup', function (e) {
				mouseIsDown = false;
			})
			.bind('mousemove', function (e) {
				if (mouseIsDown) {
					handleVolumeMove(e);
				}
			});


		// MUTE button
		mute.find('span').click(function() {
			if (media.muted) {
				media.setMuted(false);
				mute.removeClass('mejs-unmute').addClass('mejs-mute');
				positionVolumeHandle(1);
			} else {
				media.setMuted(true);
				mute.removeClass('mejs-mute').addClass('mejs-unmute');
				positionVolumeHandle(0);
			}
		});

		// listen for volume change events from other sources
		media.addEventListener('volumechange', function(e) {
			if (!mouseIsDown) {
				positionVolumeHandle(e.target.volume);
			}
		}, true);

		// set initial volume
		//player.options.startVolume = Math.min(Math.max(0,player.options.startVolume),1);
		positionVolumeHandle(player.options.startVolume);
		media.setVolume(player.options.startVolume);
	}

})(jQuery);
(function($) {
	MediaElementPlayer.prototype.buildfullscreen = function(player, controls, layers, media) {

		if (!player.isVideo)
			return;

		var 			
			normalHeight = 0,
			normalWidth = 0,
			container = player.container,
			fullscreenBtn = 
				$('<div class="mejs-button mejs-fullscreen-button"><span></span></div>')
				.appendTo(controls)
				.click(function() {
					var goFullscreen = (mejs.MediaFeatures.hasNativeFullScreen) ?
									!media.webkitDisplayingFullscreen :
									!media.isFullScreen;
					setFullScreen(goFullscreen);
				}),
			setFullScreen = function(goFullScreen) {
				switch (media.pluginType) {
					case 'flash':
					case 'silverlight':
						media.setFullscreen(goFullScreen);
						break;
					case 'native':

						if (mejs.MediaFeatures.hasNativeFullScreen) {
							if (goFullScreen) {
								media.webkitEnterFullScreen();
								media.isFullScreen = true;
							} else {
								media.webkitExitFullScreen();
								media.isFullScreen = false;
							}
						} else {
							if (goFullScreen) {

								// store
								normalHeight = player.$media.height();
								normalWidth = player.$media.width();

								// make full size
								container
									.addClass('mejs-container-fullscreen')
									.width('100%')
									.height('100%')
									.css('z-index', 1000);

								player.$media
									.width('100%')
									.height('100%');


								layers.children('div')
									.width('100%')
									.height('100%');

								fullscreenBtn
									.removeClass('mejs-fullscreen')
									.addClass('mejs-unfullscreen');

								player.setControlsSize();
								media.isFullScreen = true;
							} else {

								container
									.removeClass('mejs-container-fullscreen')
									.width(normalWidth)
									.height(normalHeight)
									.css('z-index', 1);

								player.$media
									.width(normalWidth)
									.height(normalHeight);

								layers.children('div')
									.width(normalWidth)
									.height(normalHeight);

								fullscreenBtn
									.removeClass('mejs-unfullscreen')
									.addClass('mejs-fullscreen');

								player.setControlsSize();
								media.isFullScreen = false;
							}
						}
				}				
			};

		$(document).bind('keydown',function (e) {
			if (media.isFullScreen && e.keyCode == 27) {
				setFullScreen(false);
			}
		});

	}


})(jQuery);
(function($) {

	// add extra default options 
	$.extend(mejs.MepDefaults, {
		// this will automatically turn on a <track>
		startLanguage: '',
		// a list of languages to auto-translate via Google
		translations: [],
		// a dropdownlist of automatic translations
		translationSelector: false,
		// key for tranlsations
		googleApiKey: ''
	});

	$.extend(MediaElementPlayer.prototype, {

		buildtracks: function(player, controls, layers, media) {
			if (!player.isVideo)
				return;

			if (player.tracks.length == 0)
				return;

			var i, options = '';

			player.chapters = 
					$('<div class="mejs-chapters mejs-layer"></div>')
						.prependTo(layers).hide();
			player.captions = 
					$('<div class="mejs-captions-layer mejs-layer"><div class="mejs-captions-position"><span class="mejs-captions-text"></span></div></div>')
						.prependTo(layers).hide();
			player.captionsText = player.captions.find('.mejs-captions-text');
			player.captionsButton = 
					$('<div class="mejs-button mejs-captions-button">'+
						'<span></span>'+
						'<div class="mejs-captions-selector">'+
							'<ul>'+
								'<li>'+
									'<input type="radio" name="' + player.id + '_captions" id="' + player.id + '_captions_none" value="none" checked="checked" />' +
									'<label for="' + player.id + '_captions_none">None</label>'+
								'</li>'	+
							'</ul>'+
						'</div>'+
					'</div>')
						.appendTo(controls)
						// handle clicks to the language radio buttons
						.delegate('input[type=radio]','click',function() {
							lang = this.value;

							if (lang == 'none') {
								player.selectedTrack = null;
							} else {
								for (i=0; i<player.tracks.length; i++) {
									if (player.tracks[i].srclang == lang) {
										player.selectedTrack = player.tracks[i];
										player.captions.attr('lang', player.selectedTrack.srclang);
										player.displayCaptions();
										break;
									}
								}
							}
						});
						//.bind('mouseenter', function() {
						//	player.captionsButton.find('.mejs-captions-selector').css('visibility','visible')
						//});
			// move with controls
			player.container
				.bind('mouseenter', function () {
					// push captions above controls
					player.container.find('.mejs-captions-position').addClass('mejs-captions-position-hover');

				})
				.bind('mouseleave', function () {
					if (!media.paused) {
						// move back to normal place
						player.container.find('.mejs-captions-position').removeClass('mejs-captions-position-hover');
					}
				});
			



			player.trackToLoad = -1;
			player.selectedTrack = null;
			player.isLoadingTrack = false;

			// add user-defined translations
			if (player.tracks.length > 0 && player.options.translations.length > 0) {
				for (i=0; i<player.options.translations.length; i++) {
					player.tracks.push({
						srclang: player.options.translations[i].toLowerCase(),
						src: null,
						kind: 'subtitles', 
						entries: [],
						isLoaded: false,
						isTranslation: true
					});
				}
			}

			// add to list
			for (i=0; i<player.tracks.length; i++) {
				if (player.tracks[i].kind == 'subtitles') {
					player.addTrackButton(player.tracks[i].srclang, player.tracks[i].isTranslation);
				}
			}

			player.loadNextTrack();


			media.addEventListener('timeupdate',function(e) {
				player.displayCaptions();
			}, false);

			media.addEventListener('loadedmetadata', function(e) {
				player.displayChapters();
			}, false);

			player.container.hover(
				function () {
					// chapters
					player.chapters.css('visibility','visible');
					player.chapters.fadeIn(200);
				},
				function () {
					if (!media.paused) {
						player.chapters.fadeOut(200, function() {
							$(this).css('visibility','hidden');
							$(this).css('display','block');
						});
					}
				});
				
			// check for autoplay
			if (player.node.getAttribute('autoplay') !== null) {
				player.chapters.css('visibility','hidden');
			}				

			// auto selector
			if (player.options.translationSelector) {
				for (i in mejs.language.codes) {
					options += '<option value="' + i + '">' + mejs.language.codes[i] + '</option>';
				}
				player.container.find('.mejs-captions-selector ul').before($(
					'<select class="mejs-captions-translations">' +
						'<option value="">--Add Translation--</option>' +
						options +
					'</select>'
				));
				// add clicks
				player.container.find('.mejs-captions-translations').change(function() {
					var
						option = $(this);
						lang = option.val();
					// add this language to the tracks list
					if (lang != '') {
						player.tracks.push({
							srclang: lang,
							src: null,
							entries: [],
							isLoaded: false,
							isTranslation: true
						});

						if (!player.isLoadingTrack) {
							player.trackToLoad--;
							player.addTrackButton(lang,true);
							player.options.startLanguage = lang;
							player.loadNextTrack();
						}
					}
				});
			}

		},

		loadNextTrack: function() {
			var t = this;

			t.trackToLoad++;
			if (t.trackToLoad < t.tracks.length) {
				t.isLoadingTrack = true;
				t.loadTrack(t.trackToLoad);
			} else {
				// add done?
				t.isLoadingTrack = false;
			}
		},

		loadTrack: function(index){
			var
				t = this,
				track = t.tracks[index],
				after = function() {

					track.isLoaded = true;

					// create button
					//t.addTrackButton(track.srclang);
					t.enableTrackButton(track.srclang);

					t.loadNextTrack();

				};

			if (track.isTranslation) {

				// translate the first track
				mejs.TrackFormatParser.translateTrackText(t.tracks[0].entries, t.tracks[0].srclang, track.srclang, t.options.googleApiKey, function(newOne) {

					// store the new translation
					track.entries = newOne;

					after();
				});

			} else {
				$.ajax({
					url: track.src,
					success: function(d) {

						// parse the loaded file
						track.entries = mejs.TrackFormatParser.parse(d);
						after();

						if (track.kind == 'chapters' && t.media.duration > 0) {
							t.drawChapters(track);
						}
					},
					error: function() {
						t.loadNextTrack();
					}
				});
			}
		},

		enableTrackButton: function(lang) {
			var t = this;

			t.captionsButton
				.find('input[value=' + lang + ']')
					.attr('disabled','')
				.siblings('label')
					.html( mejs.language.codes[lang] || lang );

			// auto select
			if (t.options.startLanguage == lang) {
				$('#' + t.id + '_captions_' + lang).click();
			}

			t.adjustLanguageBox();
		},

		addTrackButton: function(lang, isTranslation) {
			var t = this,
				l = mejs.language.codes[lang] || lang;

			t.captionsButton.find('ul').append(
				$('<li>'+
					'<input type="radio" name="' + t.id + '_captions" id="' + t.id + '_captions_' + lang + '" value="' + lang + '" disabled="disabled" />' +
					'<label for="' + t.id + '_captions_' + lang + '">' + l + ((isTranslation) ? ' (translating)' : ' (loading)') + '</label>'+
				'</li>')
			);

			t.adjustLanguageBox();

			// remove this from the dropdownlist (if it exists)
			t.container.find('.mejs-captions-translations option[value=' + lang + ']').remove();
		},

		adjustLanguageBox:function() {
			var t = this;
			// adjust the size of the outer box
			t.captionsButton.find('.mejs-captions-selector').height(
				t.captionsButton.find('.mejs-captions-selector ul').outerHeight(true) +
				t.captionsButton.find('.mejs-captions-translations').outerHeight(true)
			);
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
					if (t.media.currentTime >= track.entries.times[i].start && t.media.currentTime <= track.entries.times[i].stop){
						t.captionsText.html(track.entries.text[i]);
						t.captions.show();
						return; // exit out if one is visible;
					}
				}
				t.captions.hide();
			} else {
				t.captions.hide();
			}
		},

		displayChapters: function() {
			var 
				t = this,
				i;

			for (i=0; i<t.tracks.length; i++) {
				if (t.tracks[i].kind == 'chapters' && t.tracks[i].isLoaded) {
					t.drawChapters(t.tracks[i]);
					break;
				}
			}
		},

		drawChapters: function(chapters) {
			var 
				t = this,
				i,
				dur,
				//width,
				//left,
				percent = 0,
				usedPercent = 0;

			t.chapters.empty();

			for (i=0; i<chapters.entries.times.length; i++) {
				dur = chapters.entries.times[i].stop - chapters.entries.times[i].start;
				percent = Math.floor(dur / t.media.duration * 100);
				if (percent + usedPercent > 100 || // too large
					i == chapters.entries.times.length-1 && percent + usedPercent < 100) // not going to fill it in
					{
					percent = 100 - usedPercent;
				}
				//width = Math.floor(t.width * dur / t.media.duration);
				//left = Math.floor(t.width * chapters.entries.times[i].start / t.media.duration);
				//if (left + width > t.width) {
				//	width = t.width - left;
				//}

				t.chapters.append( $(
					'<div class="mejs-chapter" rel="' + chapters.entries.times[i].start + '" style="left: ' + usedPercent.toString() + '%;width: ' + percent.toString() + '%;">' + 
						'<div class="mejs-chapter-block' + ((i==chapters.entries.times.length-1) ? ' mejs-chapter-block-last' : '') + '">' + 
							'<span class="ch-title">' + chapters.entries.text[i] + '</span>' + 
							'<span class="ch-time">' + mejs.Utility.secondsToTimeCode(chapters.entries.times[i].start) + '&ndash;' + mejs.Utility.secondsToTimeCode(chapters.entries.times[i].stop) + '</span>' + 
						'</div>' +
					'</div>'));
				usedPercent += percent;
			}

			t.chapters.find('div.mejs-chapter').click(function() {
				t.media.setCurrentTime( parseFloat( $(this).attr('rel') ) );
				if (t.media.paused) {
					t.media.play(); 
				}
			});

			t.chapters.show();
		}
	});



	mejs.language = {
		codes:  {
			af:'Afrikaans',
			sq:'Albanian',
			ar:'Arabic',
			be:'Belarusian',
			bg:'Bulgarian',
			ca:'Catalan',
			zh:'Chinese',
			'zh-cn':'Chinese Simplified',
			'zh-tw':'Chinese Traditional',
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
			ht:'Haitian Creole',
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
			//'pt-pt':'Portuguese (Portugal)',
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
	Parses WebVVT format which should be formatted as
	================================
	WEBVTT
	
	1
	00:00:01,1 --> 00:00:05,000
	A line of text

	2
	00:01:15,1 --> 00:02:05,000
	A second line of text
	
	===============================

	Adapted from: http://www.delphiki.com/html5/playr
	*/
	mejs.TrackFormatParser = {
		pattern_identifier: /^[0-9]+$/,
		pattern_timecode: /^([0-9]{2}:[0-9]{2}:[0-9]{2}(,[0-9]{1,3})?) --\> ([0-9]{2}:[0-9]{2}:[0-9]{2}(,[0-9]{3})?)(.*)$/,

		split2: function (text, regex) {
			// normal version for compliant browsers
			// see below for IE fix
			return text.split(regex);
		},
		parse: function(trackText) {
			var 
				i = 0,
				lines = this.split2(trackText, /\r?\n/),
				entries = {text:[], times:[]},
				timecode,
				text;

			for(; i<lines.length; i++) {
				// check for the line number
				if (this.pattern_identifier.exec(lines[i])){
					// skip to the next line where the start --> end time code should be
					i++;
					timecode = this.pattern_timecode.exec(lines[i]);
					if (timecode && i<lines.length){
						i++;
						// grab all the (possibly multi-line) text that follows
						text = lines[i];
						i++;
						while(lines[i] !== '' && i<lines.length){
							text = text + '\n' + lines[i];
							i++;
						}

						// Text is in a different array so I can use .join
						entries.text.push(text);
						entries.times.push(
						{
							start: mejs.Utility.timeCodeToSeconds(timecode[1]),
							stop: mejs.Utility.timeCodeToSeconds(timecode[3]),
							settings: timecode[5]
						});
					}
				}
			}

			return entries;
		},

		translateTrackText: function(trackData, fromLang, toLang, googleApiKey, callback) {

			var 
				entries = {text:[], times:[]},
				lines,
				i

			this.translateText( trackData.text.join(' <a></a>'), fromLang, toLang, googleApiKey, function(result) {
				// split on separators
				lines = result.split('<a></a>');

				// create new entries
				for (i=0;i<trackData.text.length; i++) {
					// add translated line
					entries.text[i] = lines[i];
					// copy existing times
					entries.times[i] = {
						start: trackData.times[i].start,
						stop: trackData.times[i].stop,
						settings: trackData.times[i].settings
					};
				}

				callback(entries);
			});
		},

		translateText: function(text, fromLang, toLang, googleApiKey, callback) {

			var
				separatorIndex,
				chunks = [],
				chunk,
				maxlength = 1000,
				result = '',
				nextChunk= function() {
					if (chunks.length > 0) {
						chunk = chunks.shift();
						mejs.TrackFormatParser.translateChunk(chunk, fromLang, toLang, googleApiKey, function(r) {
							if (r != 'undefined') {
								result += r;
							}
							nextChunk();
						});
					} else {
						callback(result);
					}
				};

			// split into chunks
			while (text.length > 0) {
				if (text.length > maxlength) {
					separatorIndex = text.lastIndexOf('.', maxlength);
					chunks.push(text.substring(0, separatorIndex));
					text = text.substring(separatorIndex+1);
				} else {
					chunks.push(text);
					text = '';
				}
			}

			// start handling the chunks
			nextChunk();
		},
		translateChunk: function(text, fromLang, toLang, googleApiKey, callback) {

			var data = {
				q: text, 
				langpair: fromLang + '|' + toLang,
				v: '1.0'
			};
			if (googleApiKey !== '' && googleApiKey !== null) {
				data.key = googleApiKey;
			}

			$.ajax({
				url: 'https://ajax.googleapis.com/ajax/services/language/translate', // 'https://www.google.com/uds/Gtranslate', //'https://ajax.googleapis.com/ajax/services/language/translate', //
				data: data,
				type: 'GET',
				dataType: 'jsonp',
				success: function(d) {
					callback(d.responseData.translatedText);
				},
				error: function(e) {
					callback(null);
				}
			});
		}
	};
	// test for browsers with bad String.split method.
	if ('x\n\ny'.split(/\n/gi).length != 3) {
		// add super slow IE8 and below version
		mejs.TrackFormatParser.split2 = function(text, regex) {
			var 
				parts = [], 
				chunk = '',
				i;

			for (i=0; i<text.length; i++) {
				chunk += text.substring(i,i+1);
				if (regex.test(chunk)) {
					parts.push(chunk.replace(regex, ''));
					chunk = '';
				}
			}
			parts.push(chunk);
			return parts;
		}
	}


})(jQuery);
