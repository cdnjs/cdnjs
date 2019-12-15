/*
 * Video.js Hotkeys
 * https://github.com/ctd1500/videojs-hotkeys
 *
 * Copyright (c) 2014 Chris Dougherty
 * Licensed under the Apache-2.0 license.
 */

(function(window, videojs) {
  'use strict';

  var hotkeys = function(options) {
    var player = this;
    var def_options = {
      volumeStep: 0.1,
      seekStep: 5,
      enableMute: true,
      enableFullscreen: true
    };
    options = options || {};

    // Set default player tabindex to handle keydown events
    if (!player.el().hasAttribute('tabIndex')) {
      player.el().setAttribute('tabIndex', '-1');
    }

    player.on('keydown', function(event) {
      var player = this;
      var volumeStep = options.volumeStep || def_options.volumeStep;
      var seekStep = options.seekStep || def_options.seekStep;
      var enableMute = options.enableMute || def_options.enableMute;
      var enableFull = options.enableFullscreen || def_options.enableFullscreen;

      // When controls are disabled, hotkeys will be disabled as well
      if (player.controls()) {

        // Don't catch keys if any control buttons are focused
        if (document.activeElement == player.el() ||
            document.activeElement == player.el().querySelector('.vjs-tech')) {

          // Spacebar toggles play/pause
          if (event.which === 32) {
            event.preventDefault();
            if (player.paused()) {
              player.play();
            } else {
              player.pause();
            }
          }

          // Seeking with the left/right arrow keys
          else if (event.which == 37) { // Left Arrow
            event.preventDefault();
            var curTime = player.currentTime() - seekStep;

            // The flash player tech will allow you to seek into negative
            // numbers and break the seekbar, so try to prevent that.
            if (player.currentTime() <= seekStep) {
              curTime = 0;
            }
            player.currentTime(curTime);
          } else if (event.which == 39) { // Right Arrow
            event.preventDefault();
            player.currentTime(player.currentTime() + seekStep);
          }

          // Volume control with the up/down arrow keys
          else if (event.which == 40) { // Down Arrow
            event.preventDefault();
            player.volume(player.volume() - volumeStep);
          } else if (event.which == 38) { // Up Arrow
            event.preventDefault();
            player.volume(player.volume() + volumeStep);
          }

          // Toggle Mute with the M key
          else if (event.which == 77) {
            if (enableMute) {
              if (player.muted()) {
                player.muted(false);
              } else {
                player.muted(true);
              }
            }
          }

          // Toggle Fullscreen with the F key
          else if (event.which == 70) {
            if (enableFull) {
              if (player.isFullscreen()) {
                player.exitFullscreen();
              } else {
                player.requestFullscreen();
              }
            }
          }
        }
      }
    });

    return this;
  };

  videojs.plugin('hotkeys', hotkeys);

})(window, window.videojs);
