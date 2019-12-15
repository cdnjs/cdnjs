(function(document, window, config) {

  'use strict';
	// This script won't work on IE 6 or 7, so we bail at this point if we detect that UA
	if (navigator.userAgent.match(/MSIE [67]\./gi)) return;

  var _config = config || {};
  var forceSyntax = _config.forceSyntax || 0;
  var dataLayerName = _config.dataLayerName || 'dataLayer';
  // Default configuration for events
  var eventsFired = {
    'Play': true,
    'Pause': true,
    'Watch to End': true
  };
	var firstScriptTag;
	var tag;
  var key;

  for (key in _config.events) {

    if (_config.events.hasOwnProperty(key)) {

      eventsFired[key] = _config.events[key];

    }

  }

	if (window.YT) {

		init();	

	} else {

		// Fetches YouTube JS API
		tag = document.createElement('script');
		tag.src = '//www.youtube.com/iframe_api';
		firstScriptTag = document.getElementsByTagName('script')[0];
		firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

		window.onYouTubeIframeAPIReady = (function(o) {

			return function() {

				if (o) o.apply(this, arguments);

				init();

			};	

		})(window.onYouTubeIframeAPIReady);

	}

  // Invoked by the YouTube API when it's ready
  function init() {

		if (document.readyState !== 'loading') {

			bind();

		} else {

			// On IE8 this fires on window.load, all other browsers will fire when DOM ready
			if ('addEventListener' in document) {

				addEvent(document, 'DOMContentLoaded', bind);

			} else {

				addEvent(window, 'load', bind);

			}

		}

  }

	function bind() {

    var potentialVideos = getTagsAsArr_('iframe').concat(getTagsAsArr_('embed'));
    digestPotentialVideos(potentialVideos);

    // Will bind to dynamically added videos
    if ('addEventListener' in document) { 
      document.addEventListener('load', bindToNewVideos_, true);
    }

	}

  // Take our videos and turn them into trackable videos with events
  function digestPotentialVideos(potentialVideos) {

    var i;

    for (i = 0; i < potentialVideos.length; i++) {

      var isYouTubeVideo = checkIfYouTubeVideo(potentialVideos[i]);

      if (isYouTubeVideo) {

        var normalizedYouTubeIframe = normalizeYouTubeIframe(potentialVideos[i]);
        addYouTubeEvents(normalizedYouTubeIframe);

      }

    }

  }

  // Determine if the element is a YouTube video or not
  function checkIfYouTubeVideo(potentialYouTubeVideo) {

    var potentialYouTubeVideoSrc = potentialYouTubeVideo.src || '';

    if (potentialYouTubeVideoSrc.indexOf('youtube.com/embed/') > -1 ||
      potentialYouTubeVideoSrc.indexOf('youtube.com/v/') > -1) {

      return true;

    }

    return false;

  }

  function jsApiEnabled(url) {

    return url.indexOf('enablejsapi') > -1;

  }

  function originEnabled(url) {

    return url.indexOf('origin') > -1;

  }

  // Turn embed objects into iframe objects and ensure they have the right parameters
  function normalizeYouTubeIframe(youTubeVideo) {

    var loc = window.location;
    var a = document.createElement('a');
    a.href = youTubeVideo.src;
    a.hostname = 'www.youtube.com';
    a.protocol = loc.protocol;
    var tmpPathname = a.pathname.charAt(0) === '/' ? a.pathname : '/' + a.pathname; // IE10 shim

    // For security reasons, YouTube wants an origin parameter set that matches our hostname

    if (!jsApiEnabled(a.search)) {

      a.search = (a.search.length > 0 ? a.search + '&' : '') + 'enablejsapi=1';

    }

    if (!originEnabled(a.search) && loc.hostname.indexOf('localhost') === -1) {
    
      var port = loc.port ?  ':' + loc.port : '';
      var origin = loc.protocol + '%2F%2F' + loc.hostname + port;

      a.search = a.search + '&origin=' + origin;

    }

    if (youTubeVideo.type === 'application/x-shockwave-flash') {

      var newIframe = document.createElement('iframe');
      newIframe.height = youTubeVideo.height;
      newIframe.width = youTubeVideo.width;
      tmpPathname = tmpPathname.replace('/v/', '/embed/');

      youTubeVideo.parentNode.parentNode.replaceChild(newIframe, youTubeVideo.parentNode);

      youTubeVideo = newIframe;

    }

    a.pathname = tmpPathname;

    if (youTubeVideo.src !== a.href + a.hash) {

      youTubeVideo.src = a.href + a.hash;

    }

    return youTubeVideo;

  }

  // Add event handlers for events emitted by the YouTube API
  function addYouTubeEvents(youTubeIframe) {

    var player = YT.get(youTubeIframe.id);

    if (!player) {

      player = new YT.Player(youTubeIframe, {}); 

    }

    if (typeof youTubeIframe.pauseFlag === 'undefined') { 

      youTubeIframe.pauseFlag = false;
      player.addEventListener('onStateChange', function(evt) {

        onStateChangeHandler(evt, youTubeIframe);

      });

    }

  }

  // Returns key/value pairs of percentages: number of seconds to achieve
  function getMarks(duration) {

    var marks = {};

    // For full support, we're handling Watch to End with percentage viewed
    if (_config.events['Watch to End']) {

      marks['Watch to End'] = Math.min(duration - 3, Math.floor(duration * 0.99));

    }

    if (_config.percentageTracking) {

      var points = [];
      var i;

      if (_config.percentageTracking.each) {

        points = points.concat(_config.percentageTracking.each);

      }

      if (_config.percentageTracking.every) {

        var every = parseInt(_config.percentageTracking.every, 10);
        var num = 100 / every;

        for (i = 1; i < num; i++) {

          points.push(i * every);

        }

      }

      for (i = 0; i < points.length; i++) {

        var _point = points[i];
        var _mark = _point + '%';
        var _time = duration * _point / 100;

        marks[_mark] = Math.floor(_time);

      }

    }

    return marks;

  }

  function checkCompletion(player, marks, videoId) {

    var currentTime = player.getCurrentTime();
    var key;

    player[videoId] = player[videoId] || {};

    for (key in marks) {

      if (marks[key] <= currentTime && !player[videoId][key]) {

        player[videoId][key] = true;
        fireAnalyticsEvent(videoId, key);

      }

    }

  }

  // Event handler for events emitted from the YouTube API
  function onStateChangeHandler(evt, youTubeIframe) {

    var stateIndex = evt.data;
    var player = evt.target;
    var targetVideoUrl = player.getVideoUrl();
    var targetVideoId = targetVideoUrl.match(/[?&]v=([^&#]*)/)[1]; // Extract the ID    
    var playerState = player.getPlayerState();
    var duration = Math.floor(player.getDuration());
    var marks = getMarks(duration);
    var playerStatesIndex = {
      '1': 'Play',
      '2': 'Pause'
    };
    var state = playerStatesIndex[stateIndex];

    youTubeIframe.playTracker = youTubeIframe.playTracker || {};

    if (playerState === 1 && !youTubeIframe.timer) {

      clearInterval(youTubeIframe.timer);

      youTubeIframe.timer = setInterval(function() {

        // Check every second to see if we've hit any of our percentage viewed marks
        checkCompletion(player, marks, youTubeIframe.videoId);

      }, 1000);

    } else {

      clearInterval(youTubeIframe.timer);
      youTubeIframe.timer = false;

    }

    // Playlist edge-case handler
    if (stateIndex === 1) {

      youTubeIframe.playTracker[targetVideoId] = true;
      youTubeIframe.videoId = targetVideoId;
      youTubeIframe.pauseFlag = false;

    }

    if (!youTubeIframe.playTracker[youTubeIframe.videoId]) {

      // This video hasn't started yet, so this is spam
      return false;

    }

    if (stateIndex === 2) {

      if (!youTubeIframe.pauseFlag) {

        youTubeIframe.pauseFlag = true;

      } else {

        // We don't want to fire consecutive pause events
        return false;

      }

    }

    // If we're meant to track this event, fire it
    if (eventsFired[state]) {

      fireAnalyticsEvent(youTubeIframe.videoId, state);

    }

  }

  // Fire an event to Google Analytics or Google Tag Manager
  function fireAnalyticsEvent(videoId, state) {

    var videoUrl = 'https://www.youtube.com/watch?v=' + videoId;
    var _ga = window.GoogleAnalyticsObject;

    if (typeof window[dataLayerName] !== 'undefined' && !_config.forceSyntax) {

      window[dataLayerName].push({

        'event': 'youTubeTrack',
        'attributes': {

          'videoUrl': videoUrl,
          'videoAction': state

        }

      });

    } else if (typeof window[_ga] === 'function' &&
      typeof window[_ga].getAll === 'function' &&
      _config.forceSyntax !== 2) {

      window[_ga]('send', 'event', 'Videos', state, videoUrl);

    } else if (typeof window._gaq !== 'undefined' && forceSyntax !== 1) {

      window._gaq.push(['_trackEvent', 'Videos', state, videoUrl]);

    }

  }

  // Simple cross-browser event listener
  function addEvent(el, name, fn) {

    if (el.addEventListener) {

      el.addEventListener(name, fn);

    } else if (el.attachEvent) {

      el.attachEvent('on' + name, function(evt) {

        evt.target = evt.target || evt.srcElement;
        // Call the event to ensure uniform 'this' handling, pass it event
        fn.call(el, evt);

      });

    } else if (typeof el['on' + name] === 'undefined' || el['on' + name] === null) {


      el['on' + name] = function(evt) {

        evt.target = evt.target || evt.srcElement;
        // Call the event to ensure uniform 'this' handling, pass it event
        fn.call(el, evt);

      };

    }

  }

  // Returns array of elements with given tag name
  function getTagsAsArr_(tagName) {

    return [].slice.call(document.getElementsByTagName(tagName));

  }

  function bindToNewVideos_(evt) {

    var el = evt.target || evt.srcElement;
    var isYT = checkIfYouTubeVideo(el);

    // We only bind to iframes with a YouTube URL with the enablejsapi=1 and 
    // origin=<<hostname>> parameters
    if (el.tagName === 'IFRAME' && isYT && jsApiEnabled(el.src) && originEnabled(el.src)) {

      addYouTubeEvents(el);

    }

  }

})(document, window, {
  'events': {
    'Play': true,
    'Pause': true,
    'Watch to End': true
  },
  'percentageTracking': {
    'every': 25,
    'each': [10, 90]
  }
});
/*
 * Configuration Details
 *
 * @property events object
 * Defines which events emitted by YouTube API
 * will be turned into Google Analytics or GTM events
 *
 * @property percentageTracking object
 * Object with configurations for percentage viewed events
 *
 *   @property each array
 *   Fires an event once each percentage ahs been reached
 *
 *   @property every number
 *   Fires an event for every n% viewed
 *
 * @property forceSyntax int 0, 1, or 2
 * Forces script to use Classic (2) or Universal(1)
 *
 * @property dataLayerName string
 * Tells script to use custom dataLayer name instead of default
 */
/*
 * v8.1.4
 * Created by the Google Analytics consultants at http://www.lunametrics.com
 * Written by @SayfSharif and @notdanwilkerson
 * Documentation: https://github.com/lunametrics/youtube-google-analytics/
 * Licensed under the Creative Commons 4.0 Attribution Public License
 */