/*!
 * vimeo.ga.js | v0.5
 * Based on modifications by LukasBeaton (https://github.com/LukasBeaton/vimeo.ga.js)
 * Copyright (c) 2014 Sander Heilbron (http://www.sanderheilbron.nl)
 * MIT licensed
 */


var vimeoGAJS = {
	iframes : [],
  gaTracker : undefined,
  eventMarker : {},

  init: function () {
  	vimeoGAJS.iframes = $('iframe');
    
    $.each(vimeoGAJS.iframes, function (index, iframe) {  
    	var iframeId = $(iframe).attr('id');
        
      vimeoGAJS.eventMarker[iframeId] = {
      	'progress25' : false,
        'progress50' : false,
        'progress75' : false,
        'videoPlayed' : false,
        'videoPaused' : false,
        'videoResumed' : false,
        'videoSeeking' : false,
        'videoCompleted' : false,
        'timePercentComplete' : 0
      };
    });
          
	  // Check which version of Google Analytics is used
	  if (typeof ga === "function") {
	    vimeoGAJS.gaTracker = 'ua'; // Universal Analytics (universal.js)
	    //console.info('Universal Analytics');
	  }
	  
	  if (typeof _gaq !== "undefined" && typeof _gaq.push === "function") {
	    vimeoGAJS.gaTracker = 'ga'; // Classic Analytics (ga.js)
	    //console.info('Classic Analytics');
	  }

	  if (typeof dataLayer !== "undefined" && typeof dataLayer.push === "function") {
	    vimeoGAJS.gaTracker = 'gtm'; // Google Tag Manager (dataLayer)
	    //console.info('Google Tag Manager');
	  }

	  // Listen for messages from the player
	  if (window.addEventListener) {
	    window.addEventListener('message', vimeoGAJS.onMessageReceived, false);
	  } else {
	    window.attachEvent('onmessage', vimeoGAJS.onMessageReceived, false);
	  }
  },

  // Handle messages received from the player
  onMessageReceived: function(e) {
    if (e.origin.replace('https:', 'http:') !== "http://player.vimeo.com" || typeof vimeoGAJS.gaTracker === 'undefined') {
      //console.warn('Tracker is missing!');
      return;
    }
    
    var data = JSON.parse(e.data),
        iframeEl = $("#"+data.player_id),
        iframeId = iframeEl.attr('id');

    switch (data.event) {
    case 'ready':
      vimeoGAJS.onReady();
      break;

    case 'playProgress':
      vimeoGAJS.onPlayProgress(data.data, iframeEl);
      break;

    case 'seek':
      if (iframeEl.data('seek') && !vimeoGAJS.eventMarker[iframeId].videoSeeking) {
        vimeoGAJS.sendEvent(iframeEl, 'Skipped video forward or backward');
        vimeoGAJS.eventMarker[iframeId].videoSeeking = true; // Avoid subsequent seek trackings
      }
      break;

    case 'play':
      if (!vimeoGAJS.eventMarker[iframeId].videoPlayed) {
        vimeoGAJS.sendEvent(iframeEl, 'Started video');
        vimeoGAJS.eventMarker[iframeId].videoPlayed = true; // Avoid subsequent play trackings
      } else if (!vimeoGAJS.eventMarker[iframeId].videoResumed && vimeoGAJS.eventMarker[iframeId].videoPaused) {
        vimeoGAJS.sendEvent(iframeEl, 'Resumed video');
        vimeoGAJS.eventMarker[iframeId].videoResumed = true; // Avoid subsequent resume trackings
      }
      break;

    case 'pause':
      vimeoGAJS.onPause(iframeEl);
      break;

    case 'finish':
      if (!vimeoGAJS.eventMarker[iframeId].videoCompleted) {
        vimeoGAJS.sendEvent(iframeEl, 'Completed video');
        vimeoGAJS.eventMarker[iframeId].videoCompleted = true; // Avoid subsequent finish trackings
      }
      break;
    }
  },
  
  getUrl : function (iframeSrc) {
	  // Domain protocol (http or https)
    var protocol = document.URL.split(':')[0];
    
    // Match protocol with what is in document.URL
		if (iframeSrc.match(/^http/) === null) {
    	return protocol + ':' + iframeSrc;
  	}
  },

  // Helper function for sending a message to the player
  post : function (action, value, iframe) {
    var data = {
      method: action
    };

    if (value) {
      data.value = value;
    }
    
    // Source URL
    var iframeSrc = $(iframe).attr('src').split('?')[0];
    
    iframe.contentWindow.postMessage(JSON.stringify(data), vimeoGAJS.getUrl(iframeSrc));
  },

  onReady :function() {
    $.each(vimeoGAJS.iframes, function(index, iframe) {
	    vimeoGAJS.post('addEventListener', 'play', iframe);
	    vimeoGAJS.post('addEventListener', 'seek', iframe);
	    vimeoGAJS.post('addEventListener', 'pause', iframe);
	    vimeoGAJS.post('addEventListener', 'finish', iframe);
	    vimeoGAJS.post('addEventListener', 'playProgress', iframe);
  	});
  },

  onPause: function(iframeEl) {
  	var iframeId = iframeEl.attr('id');
    if (vimeoGAJS.eventMarker[iframeId].timePercentComplete < 99 && !vimeoGAJS.eventMarker[iframeId].videoPaused) {
      vimeoGAJS.sendEvent(iframeEl, 'Paused video');
      vimeoGAJS.eventMarker[iframeId].videoPaused = true; // Avoid subsequent pause trackings
    }
  },

  // Tracking video progress
  onPlayProgress: function(data, iframeEl) {
  	var progress,
        iframeId = iframeEl.attr('id');
    vimeoGAJS.eventMarker[iframeId].timePercentComplete = Math.round((data.percent) * 100); // Round to a whole number

    if (!iframeEl.data('progress')) {
      return;
    }

    if (vimeoGAJS.eventMarker[iframeId].timePercentComplete > 24 && !vimeoGAJS.eventMarker[iframeId].progress25) {
      progress = 'Played video: 25%';
      vimeoGAJS.eventMarker[iframeId].progress25 = true;
    }

    if (vimeoGAJS.eventMarker[iframeId].timePercentComplete > 49 && !vimeoGAJS.eventMarker[iframeId].progress50) {
      progress = 'Played video: 50%';
      vimeoGAJS.eventMarker[iframeId].progress50 = true;
    }

    if (vimeoGAJS.eventMarker[iframeId].timePercentComplete > 74 && !vimeoGAJS.eventMarker[iframeId].progress75) {
      progress = 'Played video: 75%';
      vimeoGAJS.eventMarker[iframeId].progress75 = true;
    }

    if (progress) {
      vimeoGAJS.sendEvent(iframeEl, progress);
    }
  },
  
  // Send event to Classic Analytics, Universal Analytics or Google Tag Manager
  sendEvent: function (iframeEl, action) {
  	var iframeSrc = iframeEl.attr('src').split('?')[0];
  	var bounce = iframeEl.data('bounce');
    
    switch (vimeoGAJS.gaTracker) {
    case 'gtm':
    	dataLayer.push({'event': 'Vimeo', 'eventCategory': 'Vimeo', 'eventAction': action, 'eventLabel': vimeoGAJS.getUrl(iframeSrc), 'eventValue': undefined, 'eventNonInteraction': (bounce) ? false : true });
      break;

    case 'ua':
      ga('send', 'event', 'Vimeo', action, vimeoGAJS.getUrl(iframeSrc), undefined, {'nonInteraction': (bounce) ? 0 : 1});
      break;

    case 'ga':
      _gaq.push(['_trackEvent', 'Vimeo', action, vimeoGAJS.getUrl(iframeSrc), undefined, (bounce) ? false : true]);
      break;
    }
  }
};

$(function() {
  vimeoGAJS.init();
});