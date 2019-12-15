/*
 * Video.js Hotkeys
 * https://github.com/ctd1500/videojs-hotkeys
 *
 * Copyright (c) 2015 Chris Dougherty
 * Licensed under the Apache-2.0 license.
 */

(function(window, videojs) {
  'use strict';

  window['videojs_hotkeys'] = { version: "0.2.6" };

  // Copies properties from one or more objects onto an original.
  var extend = function(obj /*, arg1, arg2, ... */ ) {
    var arg, i, k;
    for (i = 1; i < arguments.length; i++) {
      arg = arguments[i];
      for (k in arg) {
        if (arg.hasOwnProperty(k)) {
          obj[k] = arg[k];
        }
      }
    }
    return obj;
  };

  var hotkeys = function(options) {
    var player = this;
    var def_options = {
      volumeStep: 0.1,
      seekStep: 5,
      enableMute: true,
      enableFullscreen: true,
      enableNumbers: true,
      enableJogStyle: false
    };

    options = extend({}, def_options, options || {});

    var volumeStep = options.volumeStep;
    var seekStep = options.seekStep;
    var enableMute = options.enableMute;
    var enableFull = options.enableFullscreen;
    var enableNumbers = options.enableNumbers;
    var enableJogStyle = options.enableJogStyle;

    // Set default player tabindex to handle keydown and doubleclick events
    if (!player.el().hasAttribute('tabIndex')) {
      player.el().setAttribute('tabIndex', '-1');
    }

    player.on('play', function() {
      // Fix allowing the YouTube plugin to have hotkey support.

      var ifblocker = player.el().querySelector('.iframeblocker');
      if (ifblocker && ifblocker.style.display === '') {
        ifblocker.style.display = "block";
        ifblocker.style.bottom = "39px";
      }
    });

    var keyDown = function keyDown(event) {

      var ewhich = event.which, curTime;
      // When controls are disabled, hotkeys will be disabled as well
      if (player.controls()) {

        // Don't catch keys if any control buttons are focused, unless in jogStyle mode
        var activeEl = document.activeElement;
        if (activeEl == player.el() ||
            activeEl == player.el().querySelector('.vjs-tech') ||
            activeEl == player.el().querySelector('.vjs-control-bar') ||
            activeEl == player.el().querySelector('.iframeblocker')) {

          switch (ewhich) {

            // Spacebar toggles play/pause
            case 32:
              event.preventDefault();
              if (player.paused()) {
                player.play();
              } else {
                player.pause();
              }
              break;

            // Seeking with the left/right arrow keys
            case 37: // Left Arrow
              event.preventDefault();
              curTime = player.currentTime() - seekStep;
              // The flash player tech will allow you to seek into negative
              // numbers and break the seekbar, so try to prevent that.
              if (player.currentTime() <= seekStep) {
                curTime = 0;
              }
              player.currentTime(curTime);
              break;
            case 39: // Right Arrow
              event.preventDefault();
              player.currentTime(player.currentTime() + seekStep);
              break;

            // Volume control with the up/down arrow keys
            case 40: // Down Arrow
              event.preventDefault();
              if (!enableJogStyle) {
                player.volume(player.volume() - volumeStep);
              } else {
                curTime = player.currentTime() - 1;
                if (player.currentTime() <= 1) {
                  curTime = 0;
                }
                player.currentTime(curTime);
              }
              break;
            case 38: // Up Arrow
              event.preventDefault();
              if (!enableJogStyle) {
                player.volume(player.volume() + volumeStep);
              } else {
                player.currentTime(player.currentTime() + 1);
              }
              break;

            // Toggle Mute with the M key
            case 77:
              if (enableMute) {
                if (player.muted()) {
                  player.muted(false);
                } else {
                  player.muted(true);
                }
              }
              break;

            // Toggle Fullscreen with the F key
            case  70:
              if (enableFull) {
                if (player.isFullscreen()) {
                  player.exitFullscreen();
                } else {
                  player.requestFullscreen();
                }
              }
              break;

            default:
              // Number keys from 0-9 skip to a percentage of the video. 0 is 0% and 9 is 90%
              if ((ewhich > 47 && ewhich < 59) || (ewhich > 95 && ewhich < 106)) {
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
      }
    };

    var doubleClick = function doubleClick(event) {

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
