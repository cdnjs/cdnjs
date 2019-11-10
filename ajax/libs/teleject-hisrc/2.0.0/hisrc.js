/*
 * Hisrc jQuery Plugin
 *
 * Copyright (c) 2012
 * Licensed under the MIT license.
 *
 */

(function($){
	$.hisrc = {
		bandwidth: null,
		connectionTestResult: null,
		connectionKbps: null,
		connectionType: null,
		devicePixelRatio: null
	};

	$.hisrc.defaults = {
		useTransparentGif: false,
		transparentGifSrc: 'data:image/gif;base64,R0lGODlhAQABAIAAAMz/AAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==',
		minKbpsForHighBandwidth: 300,
		speedTestUri: '50K.jpg',
		speedTestKB: 50,
		speedTestExpireMinutes: 30,
		forcedBandwidth: false,
		srcIsLowResolution: true
	};

	// for performance, run this right away (requires jQuery, but no need to wait for DOM to be ready)
	$.hisrc.speedTest = function(options) {
		$(window).hisrc(options);
	};


	$.fn.hisrc = function(options) {
		var settings = $.extend({
			callback: function() {}
		}, $.hisrc.defaults, options),

			$els = $(this),

			// check bandwidth via @Modernizr's network-connection.js
			connection = navigator.connection || { type: 0 }, // polyfill

			isSlowConnection = connection.type == 3
								|| connection.type == 4
								|| /^[23]g$/.test(connection.type);


		// get pixel ratio
		$.hisrc.devicePixelRatio = 1;
		if(window.devicePixelRatio !== undefined) {
			$.hisrc.devicePixelRatio = window.devicePixelRatio;
		} else if (window.matchMedia !== undefined) {
			for (var i = 1; i <= 2; i += 0.5) {
				if (window.matchMedia('(min-resolution: ' + i + 'dppx)').matches) {
					$.hisrc.devicePixelRatio = i;
				}
			}
		}


		// variables/functions below for speed test are taken from Foresight.js
		// Copyright (c) 2012 Adam Bradley
		// Licensed under the MIT license.
		// https://github.com/adamdbradley/foresight.js
		// Modified by Christopher Deutsch for hisrc.js
		var speedTestUri = settings.speedTestUri,
			STATUS_LOADING = 'loading',
			STATUS_COMPLETE = 'complete',
			LOCAL_STORAGE_KEY = 'fsjs', // may as well piggy-back on Forsight localstorage key since we're doing the same thing.
			speedConnectionStatus,

			initSpeedTest = function () {

				// only check the connection speed once, if there is a status then we've
				// already got info or it already started
				if ( speedConnectionStatus ) {
					return;
				}

				// force that this device has a low or high bandwidth, used more so for debugging purposes
				if ( settings.forcedBandwidth ) {
					$.hisrc.bandwidth = settings.forcedBandwidth;
					$.hisrc.connectionTestResult = 'forced';
					speedConnectionStatus = STATUS_COMPLETE;
					$els.trigger('speedTestComplete.hisrc');
					return;
				}

				// if the device pixel ratio is 1, then no need to do a network connection
				// speed test since it can't show hi-res anyways
				if ( $.hisrc.devicePixelRatio === 1 ) {
					$.hisrc.connectionTestResult = 'skip';
					speedConnectionStatus = STATUS_COMPLETE;
					$els.trigger('speedTestComplete.hisrc');
					return;
				}

				// if we know the connection is 2g or 3g
				// don't even bother with the speed test, cuz its slow
				// Copyright (c) Faruk Ates, Paul Irish, Alex Sexton
				// Available under the BSD and MIT licenses: www.modernizr.com/license/
				// https://github.com/Modernizr/Modernizr/blob/master/feature-detects/network-connection.js
				// Modified by Adam Bradley for Foresight.js
				$.hisrc.connectionType = connection.type;
				if ( isSlowConnection ) {
					// we know this connection is slow, don't bother even doing a speed test
					$.hisrc.connectionTestResult = 'connTypeSlow';
					speedConnectionStatus = STATUS_COMPLETE;
					$els.trigger('speedTestComplete.hisrc');
					return;
				}

				// check if a speed test has recently been completed and its
				// results are saved in the local storage
				try {
					var fsData = JSON.parse( localStorage.getItem( LOCAL_STORAGE_KEY ) );
					if ( fsData !== null ) {
						if ( ( new Date() ).getTime() < fsData.exp ) {
							// already have connection data within our desired timeframe
							// use this recent data instead of starting another test
							$.hisrc.bandwidth = fsData.bw;
							$.hisrc.connectionKbps = fsData.kbps;
							$.hisrc.connectionTestResult = 'localStorage';
							speedConnectionStatus = STATUS_COMPLETE;
							$els.trigger('speedTestComplete.hisrc');
							return;
						}
					}
				} catch( e ) { }

				var
				speedTestImg = document.createElement( 'img' ),
				endTime,
				startTime,
				speedTestTimeoutMS;

				speedTestImg.onload = function () {
					// speed test image download completed
					// figure out how long it took and an estimated connection speed
					endTime = ( new Date() ).getTime();

					var duration = ( endTime - startTime ) / 1000;
					duration = ( duration > 1 ? duration : 1 ); // just to ensure we don't divide by 0

					$.hisrc.connectionKbps = ( ( settings.speedTestKB * 1024 * 8 ) / duration ) / 1024;
					$.hisrc.bandwidth = ( $.hisrc.connectionKbps >= settings.minKbpsForHighBandwidth ? 'high' : 'low' );

					speedTestComplete( 'networkSuccess' );
				};

				speedTestImg.onerror = function () {
					// fallback incase there was an error downloading the speed test image
					speedTestComplete( 'networkError', 5 );
				};

				speedTestImg.onabort = function () {
					// fallback incase there was an abort during the speed test image
					speedTestComplete( 'networkAbort', 5 );
				};

				// begin the network connection speed test image download
				startTime = ( new Date() ).getTime();
				speedConnectionStatus = STATUS_LOADING;
				if ( document.location.protocol === 'https:' ) {
					// if this current document is SSL, make sure this speed test request
					// uses https so there are no ugly security warnings from the browser
					speedTestUri = speedTestUri.replace( 'http:', 'https:' );
				}
				speedTestImg.src = speedTestUri + "?r=" + Math.random();

				// calculate the maximum number of milliseconds it 'should' take to download an XX Kbps file
				// set a timeout so that if the speed test download takes too long
				// than it isn't a 'high-bandwidth' and ignore what the test image .onload has to say
				// this is used so we don't wait too long on a speed test response
				// Adding 350ms to account for TCP slow start, quickAndDirty === TRUE
				speedTestTimeoutMS = ( ( ( settings.speedTestKB * 8 ) / settings.minKbpsForHighBandwidth ) * 1000 ) + 350;
				setTimeout( function () {
					speedTestComplete( 'networkSlow' );
				}, speedTestTimeoutMS );
			},

			speedTestComplete = function ( connTestResult, expireMinutes ) {
				// if we haven't already gotten a speed connection status then save the info
				if (speedConnectionStatus === STATUS_COMPLETE) { return; }

				// first one with an answer wins
				speedConnectionStatus = STATUS_COMPLETE;
				$.hisrc.connectionTestResult = connTestResult;

				try {
					if ( !expireMinutes ) {
						expireMinutes = settings.speedTestExpireMinutes;
					}
					var fsDataToSet = {
						kbps: $.hisrc.connectionKbps,
						bw: $.hisrc.bandwidth,
						exp: ( new Date() ).getTime() + (expireMinutes * 60000)
					};
					localStorage.setItem( LOCAL_STORAGE_KEY, JSON.stringify( fsDataToSet ) );
				} catch( e ) { }

				// trigger swap once speedtest is complete.
				$els.trigger('speedTestComplete.hisrc');
			},

			setImageSource = function ( $el, src ) {
				if ( settings.useTransparentGif ) {
					$el.attr('src', settings.transparentGifSrc)
						.css('max-height', '100%')
						.css('max-width', '100%')
						.css('background', 'url("' + src + '") no-repeat 0 0')
						.css('background-size', 'contain');
				} else {
					$el.attr( 'src', src );
				}
			};

		settings.callback.call(this);

		$els.each(function(){
			var $el = $(this);

			var src = $el.attr('src');

			if (src) {
				if (!$el.data('m1src')) {
					$el.data('m1src', src);
				}

				// check for zero which often happens in safari.
				if (!$el.attr('width') &&  $el.width() > 0) {
					$el.attr('width', $el.width());
				}
				if (!$el.attr('height') &&  $el.height() > 0) {
					$el.attr('height', $el.height());
				}

				$el.on('speedTestComplete.hisrc', function(){

					if (speedConnectionStatus === STATUS_COMPLETE) {

						if (isSlowConnection) {
							$el.attr( 'src', $el.data('m1src') );
						} else {

							// check if client can get high res image
							if ($.hisrc.devicePixelRatio > 1 && $.hisrc.bandwidth === 'high') {
								var image2x = $el.data('2x');
								if (!image2x) {
									// use naming convention.
									image2x = $el.data('m1src').replace(/\.\w+$/, function(match) { return "@2x" + match; });
								}
								setImageSource( $el, image2x );
							} else {
								// don't load 1x unless src is a low res version.
								if (settings.srcIsLowResolution) {
									var image1x = $el.data('1x');
									if (!image1x) {
										// use naming convention.
										image1x = $el.data('m1src').replace(/\.\w+$/, function(match) { return "@1x" + match; });
									}
									setImageSource( $el, image1x );
								}
							}
						}
						// turn off so hisrc() can be called many times on same element.
						$el.off('speedTestComplete.hisrc');
					}
				});
			}
		});

		initSpeedTest();

		return $els;
	};

})(jQuery);

