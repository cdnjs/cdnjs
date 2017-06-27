/*!
 * vimeo.ga.js | v0.4
 * Copyright (c) 2014 Sander Heilbron (http://www.sanderheilbron.nl)
 * MIT licensed
 */

(function($) {
  "use strict";

  // Check for iframe
  if (!$('#vimeo-player').length) {
    // console.info('iframe not available');
    return;
  }

  var f = $('#vimeo-player'),
      url = f.attr('src').split('?')[0],      // Source URL
      protocol = document.URL.split(':')[0],  // Domain protocol (http or https)
      trackProgress = f.data('progress'),     // Data attribute to enable progress tracking
      trackSeeking = f.data('seek'),          // Data attribute to enable seek tracking
      gaTracker,
      progress25 = false,
      progress50 = false,
      progress75 = false,
      videoPlayed = false,
      videoPaused = false,
      videoResumed = false,
      videoSeeking = false,
      videoCompleted = false,
      timePercentComplete = 0;

  // Match protocol with what is in document.URL
  if (url.match(/^http/) === null) {
    url = protocol + ':' + url;
  }

  // Check which version of Google Analytics is used

  // Universal Analytics (universal.js)
  if (typeof ga === "function") {
    gaTracker = 'ua';
    // console.info('Universal Analytics');
  }

  // Classic Analytics (ga.js)
  if (typeof _gaq !== "undefined" && typeof _gaq.push === "function") {
    gaTracker = 'ga';
    // console.info('Classic Analytics');
  }

  // Google Tag Manager (dataLayer)
  if (typeof dataLayer !== "undefined" && typeof dataLayer.push === "function") {
    gaTracker = 'gtm';
    // console.info('Google Tag Manager');
  }

  // Listen for messages from the player
  if (window.addEventListener) {
    window.addEventListener('message', onMessageReceived, false);
  } else {
    window.attachEvent('onmessage', onMessageReceived, false);
  }

  // Send event to Classic Analytics, Universal Analytics or Google Tag Manager
  function sendEvent(action) {
    switch (gaTracker) {
    case 'gtm':
      dataLayer.push({
        'event' : 'Vimeo',
        'eventCategory' : 'Vimeo',
        'eventAction' : action,
        'eventLabel' : url,
        'eventValue' : undefined,
        'eventNonInteraction' : true
      });
      break;
    case 'ua':
      ga('send', 'event', 'Vimeo', action, url, undefined, {
        "nonInteraction" : 1
      });
      break;
    case 'ga':
      _gaq.push(['_trackEvent', 'Vimeo', action, url, undefined, true]);
      break;
    }
  }

  // Handle messages received from the player
  function onMessageReceived(e) {
    if (e.origin.replace('https:', 'http:') !== "http://player.vimeo.com" || typeof gaTracker === 'undefined') {
      // console.warn('Tracker is missing!');
      return;
    }
    var data = JSON.parse(e.data);

    switch (data.event) {
    case 'ready':
      onReady();
      break;

    case 'playProgress':
      onPlayProgress(data.data);
      break;

    case 'seek':
      if (trackSeeking && !videoSeeking) {
        sendEvent('Skipped video forward or backward');
        videoSeeking = true; // Avoid subsequent seek trackings
      }
      break;

    case 'play':
      if (!videoPlayed) {
        sendEvent('Started video');
        videoPlayed = true; // Avoid subsequent play trackings
      } else if (!videoResumed && videoPaused) {
        sendEvent('Resumed video');
        videoResumed = true; // Avoid subsequent resume trackings
      }
      break;

    case 'pause':
      onPause();
      break;

    case 'finish':
      if (!videoCompleted) {
        sendEvent('Completed video');
        videoCompleted = true; // Avoid subsequent finish trackings
      }
      break;
    }
  }

  // Helper function for sending a message to the player
  function post(action, value) {
    var data = {
      method: action
    };

    if (value) {
      data.value = value;
    }

    f[0].contentWindow.postMessage(JSON.stringify(data), url);
  }

  function onReady() {
    post('addEventListener', 'play');
    post('addEventListener', 'seek');
    post('addEventListener', 'pause');
    post('addEventListener', 'finish');
    post('addEventListener', 'playProgress');
  }

  function onPause() {
    if (timePercentComplete < 99 && !videoPaused) {
      sendEvent('Paused video');
      videoPaused = true; // Avoid subsequent pause trackings
    }
  }

  // Tracking video progress
  function onPlayProgress(data) {
    timePercentComplete = Math.round((data.percent) * 100); // Round to a whole number

    if (!trackProgress) {
      return;
    }

    var progress;

    if (timePercentComplete > 24 && !progress25) {
      progress = 'Played video: 25%';
      progress25 = true;
    }

    if (timePercentComplete > 49 && !progress50) {
      progress = 'Played video: 50%';
      progress50 = true;
    }

    if (timePercentComplete > 74 && !progress75) {
      progress = 'Played video: 75%';
      progress75 = true;
    }

    if (progress) {
      sendEvent(progress);
    }
  }

})(jQuery);
