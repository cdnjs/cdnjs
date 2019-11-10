/*
 * Video.js Hotkeys
 * https://github.com/ctd1500/videojs-hotkeys
 *
 * Copyright (c) 2015 Chris Dougherty
 * Licensed under the Apache-2.0 license.
 */

;(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory.bind(this, root, root.videojs));
  } else if (typeof module !== 'undefined' && module.exports) {
    module.exports = factory(root, root.videojs);
  } else {
    factory(root, root.videojs);
  }

})(this, function(window, videojs) {
  "use strict";
  window['videojs_hotkeys'] = { version: "0.2.11" };

  var hotkeys = function(options) {
    var player = this;
    var pEl = player.el();
    var def_options = {
      volumeStep: 0.1,
      seekStep: 5,
      enableMute: true,
      enableVolumeScroll: true,
      enableFullscreen: true,
      enableNumbers: true,
      enableJogStyle: false,
      alwaysCaptureHotkeys: false,
      playPauseKey: playPauseKey,
      rewindKey: rewindKey,
      forwardKey: forwardKey,
      volumeUpKey: volumeUpKey,
      volumeDownKey: volumeDownKey,
      muteKey: muteKey,
      fullscreenKey: fullscreenKey,
      customKeys: {}
    };

    var cPlay = 1,
      cRewind = 2,
      cForward = 3,
      cVolumeUp = 4,
      cVolumeDown = 5,
      cMute = 6,
      cFullscreen = 7;

    // Use built-in merge function from Video.js v5.0+ or v4.4.0+
    var mergeOptions = videojs.mergeOptions || videojs.util.mergeOptions;
    options = mergeOptions(def_options, options || {});

    var volumeStep = options.volumeStep,
      seekStep = options.seekStep,
      enableMute = options.enableMute,
      enableVolumeScroll = options.enableVolumeScroll,
      enableFull = options.enableFullscreen,
      enableNumbers = options.enableNumbers,
      enableJogStyle = options.enableJogStyle,
      alwaysCaptureHotkeys = options.alwaysCaptureHotkeys;

    // Set default player tabindex to handle keydown and doubleclick events
    if (!pEl.hasAttribute('tabIndex')) {
      pEl.setAttribute('tabIndex', '-1');
    }

    if (alwaysCaptureHotkeys) {
      player.one('play', function() {
        pEl.focus(); // Fixes the .vjs-big-play-button handing focus back to body instead of the player
      });
    }

    player.on('play', function() {
      // Fix allowing the YouTube plugin to have hotkey support.
      var ifblocker = pEl.querySelector('.iframeblocker');
      if (ifblocker && ifblocker.style.display === '') {
        ifblocker.style.display = "block";
        ifblocker.style.bottom = "39px";
      }
    });

    var keyDown = function keyDown(event) {
      var ewhich = event.which, curTime;
      var ePreventDefault = event.preventDefault;
      // When controls are disabled, hotkeys will be disabled as well
      if (player.controls()) {

        // Don't catch keys if any control buttons are focused, unless alwaysCaptureHotkeys is true
        var activeEl = document.activeElement;
        if (alwaysCaptureHotkeys ||
            activeEl == pEl ||
            activeEl == pEl.querySelector('.vjs-tech') ||
            activeEl == pEl.querySelector('.vjs-control-bar') ||
            activeEl == pEl.querySelector('.iframeblocker')) {

          switch (checkKeys(event, player)) {

            // Spacebar toggles play/pause
            case cPlay:
              ePreventDefault();
              if (alwaysCaptureHotkeys) {
                // Prevent control activation with space
                event.stopPropagation();
              }

              if (player.paused()) {
                player.play();
              } else {
                player.pause();
              }
              break;

            // Seeking with the left/right arrow keys
            case cRewind: // Seek Backward
              ePreventDefault();
              curTime = player.currentTime() - seekStep;
              // The flash player tech will allow you to seek into negative
              // numbers and break the seekbar, so try to prevent that.
              if (player.currentTime() <= seekStep) {
                curTime = 0;
              }
              player.currentTime(curTime);
              break;
            case cForward: // Seek Forward
              ePreventDefault();
              player.currentTime(player.currentTime() + seekStep);
              break;

            // Volume control with the up/down arrow keys
            case cVolumeDown:
              ePreventDefault();
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
            case cVolumeUp:
              ePreventDefault();
              if (!enableJogStyle) {
                player.volume(player.volume() + volumeStep);
              } else {
                player.currentTime(player.currentTime() + 1);
              }
              break;

            // Toggle Mute with the M key
            case cMute:
              if (enableMute) {
                player.muted(!player.muted());
              }
              break;

            // Toggle Fullscreen with the F key
            case  cFullscreen:
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
                  ePreventDefault();
                  player.currentTime(player.duration() * number * 0.1);
                }
              }

              // Handle any custom hotkeys
              for (var customKey in options.customKeys) {
                var customHotkey = options.customKeys[customKey];
                // Check for well formed custom keys
                if (customHotkey && customHotkey.key && customHotkey.handler) {
                  // Check if the custom key's condition matches
                  if (customHotkey.key(event)) {
                    ePreventDefault();
                    customHotkey.handler(player, options);
                  }
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
        if (activeEl == pEl ||
            activeEl == pEl.querySelector('.vjs-tech') ||
            activeEl == pEl.querySelector('.iframeblocker')) {

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

    var mouseScroll = function mouseScroll(event) {
      // When controls are disabled, hotkeys will be disabled as well
      if (player.controls()) {
        var activeEl = event.relatedTarget || event.toElement || document.activeElement;
        if (alwaysCaptureHotkeys ||
            activeEl == pEl ||
            activeEl == pEl.querySelector('.vjs-tech') ||
            activeEl == pEl.querySelector('.iframeblocker') ||
            activeEl == pEl.querySelector('.vjs-control-bar')) {

          if (enableVolumeScroll) {
            event = window.event || event;
            var delta = Math.max(-1, Math.min(1, (event.wheelDelta || -event.detail)));
            event.preventDefault();

            if (delta == 1) {
              player.volume(player.volume() + volumeStep);
            } else if (delta == -1) {
              player.volume(player.volume() - volumeStep);
            }
          }
        }
      }
    };

    var checkKeys = function checkKeys(e, player) {
      // Allow some modularity in defining custom hotkeys

      // Play/Pause check
      if (options.playPauseKey(e, player)) {
        return cPlay;
      }

      // Seek Backward check
      if (options.rewindKey(e, player)) {
        return cRewind;
      }

      // Seek Forward check
      if (options.forwardKey(e, player)) {
        return cForward;
      }

      // Volume Up check
      if (options.volumeUpKey(e, player)) {
        return cVolumeUp;
      }

      // Volume Down check
      if (options.volumeDownKey(e, player)) {
        return cVolumeDown;
      }

      // Mute check
      if (options.muteKey(e, player)) {
        return cMute;
      }

      // Fullscreen check
      if (options.fullscreenKey(e, player)) {
        return cFullscreen;
      }
    };

    function playPauseKey(e) {
      // Space bar
      return (e.which === 32);
    }

    function rewindKey(e) {
      // Left Arrow
      return (e.which === 37);
    }

    function forwardKey(e) {
      // Right Arrow
      return (e.which === 39);
    }

    function volumeUpKey(e) {
      // Up Arrow
      return (e.which === 38);
    }

    function volumeDownKey(e) {
      // Down Arrow
      return (e.which === 40);
    }

    function muteKey(e) {
      // M key
      return (e.which === 77);
    }

    function fullscreenKey(e) {
      // F key
      return (e.which === 70);
    }

    player.on('keydown', keyDown);
    player.on('dblclick', doubleClick);
    player.on('mousewheel', mouseScroll);
    player.on("DOMMouseScroll", mouseScroll);

    return this;
  };

  videojs.plugin('hotkeys', hotkeys);
});
