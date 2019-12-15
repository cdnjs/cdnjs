/*
 * Video.js Hotkeys
 * https://github.com/ctd1500/videojs-hotkeys
 *
 * Copyright (c) 2015 Chris Dougherty
 * Licensed under the Apache-2.0 license.
 */

(function(window, videojs) {
  'use strict';

  window['videojs_hotkeys'] = { version: "0.2.4" };
  var hotkeys = function(options) {
    var player = this;
    var def_options = {
      volumeStep: 0.1,
      seekStep: 5,
      enableMute: true,
      enableFullscreen: true,
      enableNumbers: true
    };
    options = options || {};

    // Set default player tabindex to handle keydown and doubleclick events
    if (!player.el().hasAttribute('tabIndex')) {
      player.el().setAttribute('tabIndex', '-1');
    }

    player.on('play', function() {
      // Fix allowing the YouTube plugin to have hotkey support.
      var ifblocker = player.el().querySelector('.iframeblocker');
      if (ifblocker &&
          ifblocker.style.display == "") {
        ifblocker.style.display = "block";
        ifblocker.style.bottom = "39px";
      }
    });

    var keyDown = function keyDown(event) {
      var ewhich = event.which;
      var volumeStep = options.volumeStep || def_options.volumeStep;
      var seekStep = options.seekStep || def_options.seekStep;
      var enableMute = options.enableMute || def_options.enableMute;
      var enableFull = options.enableFullscreen || def_options.enableFullscreen;
      var enableNumbers = options.enableNumbers || def_options.enableNumbers;

      // When controls are disabled, hotkeys will be disabled as well
      if (player.controls()) {

        // Don't catch keys if any control buttons are focused
        var activeEl = document.activeElement;
        if (activeEl == player.el() ||
            activeEl == player.el().querySelector('.vjs-tech') ||
            activeEl == player.el().querySelector('.vjs-control-bar') ||
            activeEl == player.el().querySelector('.iframeblocker')) {

          // Spacebar toggles play/pause
          if (ewhich === 32) {
            event.preventDefault();
            if (player.paused()) {
              player.play();
            } else {
              player.pause();
            }
          }

          // Seeking with the left/right arrow keys
          else if (ewhich === 37) { // Left Arrow
            event.preventDefault();
            var curTime = player.currentTime() - seekStep;

            // The flash player tech will allow you to seek into negative
            // numbers and break the seekbar, so try to prevent that.
            if (player.currentTime() <= seekStep) {
              curTime = 0;
            }
            player.currentTime(curTime);
          } else if (ewhich === 39) { // Right Arrow
            event.preventDefault();
            player.currentTime(player.currentTime() + seekStep);
          }

          // Volume control with the up/down arrow keys
          else if (ewhich === 40) { // Down Arrow
            event.preventDefault();
            player.volume(player.volume() - volumeStep);
          } else if (ewhich === 38) { // Up Arrow
            event.preventDefault();
            player.volume(player.volume() + volumeStep);
          }

          // Toggle Mute with the M key
          else if (ewhich === 77) {
            if (enableMute) {
              if (player.muted()) {
                player.muted(false);
              } else {
                player.muted(true);
              }
            }
          }

          // Toggle Fullscreen with the F key
          else if (ewhich === 70) {
            if (enableFull) {
              if (player.isFullscreen()) {
                player.exitFullscreen();
              } else {
                player.requestFullscreen();
              }
            }
          }

          // Number keys from 0-9 skip to a percentage of the video. 0 is 0% and 9 is 90%
          else if ((ewhich > 47 && ewhich < 59) || (ewhich > 95 && ewhich < 106)) {
            if (enableNumbers) {
              var sub = 48;
              if (ewhich > 95) {
                sub = 96;
              }
              var number = ewhich - sub;
              event.preventDefault();
              player.currentTime(player.duration() * number * 0.1);
            }
          }

        }
      }
    };

    var doubleClick = function doubleClick(event) {
      var enableFull = options.enableFullscreen || def_options.enableFullscreen;

      // When controls are disabled, hotkeys will be disabled as well
      if (player.controls()) {

        // Don't catch clicks if any control buttons are focused
        var activeEl = event.relatedTarget || event.toElement || document.activeElement;
        if (activeEl == player.el() ||
            activeEl == player.el().querySelector('.vjs-tech') ||
            activeEl == player.el().querySelector('.iframeblocker')) {

          if (enableFull) {
            if (player.isFullscreen()) {
              player.exitFullscreen();
            } else {
              player.requestFullscreen();
            }
          }
        }
      }
    };

    player.on('keydown', keyDown);
    player.on('dblclick', doubleClick);

    return this;
  };

  videojs.plugin('hotkeys', hotkeys);

})(window, window.videojs);
