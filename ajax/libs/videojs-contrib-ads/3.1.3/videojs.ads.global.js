/*! videojs-contrib-ads - v3.1.3 - 2016-01-28
* Copyright (c) 2016 Brightcove; Licensed  */
(function(window, videojs, undefined) {
'use strict';

var

  VIDEO_EVENTS = videojs.getComponent('Html5').Events,

  /**
   * If ads are not playing, pauses the player at the next available
   * opportunity. Has no effect if ads have started. This function is necessary
   * because pausing a video element while processing a `play` event on iOS can
   * cause the video element to continuously toggle between playing and paused
   * states.
   *
   * @param {object} player The video player
   */
  cancelContentPlay = function(player) {
    if (player.ads.cancelPlayTimeout) {
      // another cancellation is already in flight, so do nothing
      return;
    }
    player.ads.cancelPlayTimeout = window.setTimeout(function() {
      // deregister the cancel timeout so subsequent cancels are scheduled
      player.ads.cancelPlayTimeout = null;

      // pause playback so ads can be handled.
      if (!player.paused()) {
        player.pause();
      }

      // add a contentplayback handler to resume playback when ads finish.
      player.one('contentplayback', function() {
        if (player.paused()) {
          player.play();
        }
      });
    }, 1);
  },

  /**
   * Returns an object that captures the portions of player state relevant to
   * video playback. The result of this function can be passed to
   * restorePlayerSnapshot with a player to return the player to the state it
   * was in when this function was invoked.
   * @param {object} player The videojs player object
   */
  getPlayerSnapshot = function(player) {
    var
      tech = player.$('.vjs-tech'),
      tracks = player.remoteTextTracks ? player.remoteTextTracks() : [],
      track,
      i,
      suppressedTracks = [],
      snapshot = {
        ended: player.ended(),
        currentSrc: player.currentSrc(),
        src: player.src(),
        currentTime: player.currentTime(),
        type: player.currentType()
      };

    if (tech) {
      snapshot.nativePoster = tech.poster;
      snapshot.style = tech.getAttribute('style');
    }

    i = tracks.length;
    while (i--) {
      track = tracks[i];
      suppressedTracks.push({
        track: track,
        mode: track.mode
      });
      track.mode = 'disabled';
    }
    snapshot.suppressedTracks = suppressedTracks;

    return snapshot;
  },

  /**
   * Attempts to modify the specified player so that its state is equivalent to
   * the state of the snapshot.
   * @param {object} snapshot - the player state to apply
   */
  restorePlayerSnapshot = function(player, snapshot) {
    var
      // the playback tech
      tech = player.$('.vjs-tech'),

      // the number of remaining attempts to restore the snapshot
      attempts = 20,

      suppressedTracks = snapshot.suppressedTracks,
      trackSnapshot,
      restoreTracks =  function() {
        var i = suppressedTracks.length;
        while (i--) {
          trackSnapshot = suppressedTracks[i];
          trackSnapshot.track.mode = trackSnapshot.mode;
        }
      },

      // finish restoring the playback state
      resume = function() {
        var
          ended = false,
          updateEnded = function() {
            ended = true;
          };
        player.currentTime(snapshot.currentTime);

        // Resume playback if this wasn't a postroll
        if (!snapshot.ended) {
          player.play();
        } else {
          // On iOS 8.1, the "ended" event will not fire if you seek
          // directly to the end of a video. To make that behavior
          // consistent with the standard, fire a synthetic event if
          // "ended" does not fire within 250ms. Note that the ended
          // event should occur whether the browser actually has data
          // available for that position
          // (https://html.spec.whatwg.org/multipage/embedded-content.html#seeking),
          // so it should not be necessary to wait for the seek to
          // indicate completion.
          player.ads.resumeEndedTimeout = window.setTimeout(function() {
            if (!ended) {
              player.play();
            }
            player.off('ended', updateEnded);
            player.ads.resumeEndedTimeout = null;
          }, 250);
          player.on('ended', updateEnded);

          // Need to clear the resume/ended timeout on dispose. If it fires
          // after a player is disposed, an error will be thrown!
          player.on('dispose', function() {
            window.clearTimeout(player.ads.resumeEndedTimeout);
          });
        }
      },

      // determine if the video element has loaded enough of the snapshot source
      // to be ready to apply the rest of the state
      tryToResume = function() {

        // tryToResume can either have been called through the `contentcanplay`
        // event or fired through setTimeout.
        // When tryToResume is called, we should make sure to clear out the other
        // way it could've been called by removing the listener and clearing out
        // the timeout.
        player.off('contentcanplay', tryToResume);
        if (player.ads.tryToResumeTimeout_) {
          player.clearTimeout(player.ads.tryToResumeTimeout_);
          player.ads.tryToResumeTimeout_ = null;
        }

        // Tech may have changed depending on the differences in sources of the
        // original video and that of the ad
        tech = player.el().querySelector('.vjs-tech');

        if (tech.readyState > 1) {
          // some browsers and media aren't "seekable".
          // readyState greater than 1 allows for seeking without exceptions
          return resume();
        }

        if (tech.seekable === undefined) {
          // if the tech doesn't expose the seekable time ranges, try to
          // resume playback immediately
          return resume();
        }

        if (tech.seekable.length > 0) {
          // if some period of the video is seekable, resume playback
          return resume();
        }

        // delay a bit and then check again unless we're out of attempts
        if (attempts--) {
          window.setTimeout(tryToResume, 50);
        } else {
          (function() {
            try {
              resume();
            } catch(e) {
              videojs.log.warn('Failed to resume the content after an advertisement', e);
            }
          })();
        }
      },

      // whether the video element has been modified since the
      // snapshot was taken
      srcChanged;

    if (snapshot.nativePoster) {
      tech.poster = snapshot.nativePoster;
    }

    if ('style' in snapshot) {
      // overwrite all css style properties to restore state precisely
      tech.setAttribute('style', snapshot.style || '');
    }

    // Determine whether the player needs to be restored to its state
    // before ad playback began. With a custom ad display or burned-in
    // ads, the content player state hasn't been modified and so no
    // restoration is required

    srcChanged = player.src() !== snapshot.src || player.currentSrc() !== snapshot.currentSrc;

    if (srcChanged) {
      // on ios7, fiddling with textTracks too early will cause safari to crash
      player.one('contentloadedmetadata', restoreTracks);

      // if the src changed for ad playback, reset it
      player.src({ src: snapshot.currentSrc, type: snapshot.type });
      // safari requires a call to `load` to pick up a changed source
      player.load();
      // and then resume from the snapshots time once the original src has loaded
      // in some browsers (firefox) `canplay` may not fire correctly.
      // Reace the `canplay` event with a timeout.
      player.one('contentcanplay', tryToResume);
      player.ads.tryToResumeTimeout_ = player.setTimeout(tryToResume, 2000);
    } else if (!player.ended() || !snapshot.ended) {
      // if we didn't change the src, just restore the tracks
      restoreTracks();
      // the src didn't change and this wasn't a postroll
      // just resume playback at the current time.
      player.play();
    }
  },

  /**
   * Remove the poster attribute from the video element tech, if present. When
   * reusing a video element for multiple videos, the poster image will briefly
   * reappear while the new source loads. Removing the attribute ahead of time
   * prevents the poster from showing up between videos.
   * @param {object} player The videojs player object
   */
  removeNativePoster = function(player) {
    var tech = player.$('.vjs-tech');
    if (tech) {
      tech.removeAttribute('poster');
    }
  },

  // ---------------------------------------------------------------------------
  // Ad Framework
  // ---------------------------------------------------------------------------

  // default framework settings
  defaults = {
    // maximum amount of time in ms to wait to receive `adsready` from the ad
    // implementation after play has been requested. Ad implementations are
    // expected to load any dynamic libraries and make any requests to determine
    // ad policies for a video during this time.
    timeout: 5000,

    // maximum amount of time in ms to wait for the ad implementation to start
    // linear ad mode after `readyforpreroll` has fired. This is in addition to
    // the standard timeout.
    prerollTimeout: 100,

    // maximum amount of time in ms to wait for the ad implementation to start
    // linear ad mode after `contentended` has fired.
    postrollTimeout: 100,

    // when truthy, instructs the plugin to output additional information about
    // plugin state to the video.js log. On most devices, the video.js log is
    // the same as the developer console.
    debug: false
  },

  adFramework = function(options) {
    var player = this;
    var settings = videojs.mergeOptions(defaults, options);
    var fsmHandler;

    // prefix all video element events during ad playback
    // if the video element emits ad-related events directly,
    // plugins that aren't ad-aware will break. prefixing allows
    // plugins that wish to handle ad events to do so while
    // avoiding the complexity for common usage
    (function() {
      var videoEvents = VIDEO_EVENTS.concat([
        'firstplay',
        'loadedalldata'
      ]);

      var returnTrue = function() { return true; };

      var triggerEvent = function(type, event) {
        // pretend we called stopImmediatePropagation because we want the native
        // element events to continue propagating
        event.isImmediatePropagationStopped = returnTrue;
        event.cancelBubble = true;
        event.isPropagationStopped = returnTrue;
        player.trigger({
          type: type + event.type,
          state: player.ads.state,
          originalEvent: event
        });
      };

      player.on(videoEvents, function redispatch(event) {
        if (player.ads.state === 'ad-playback') {
          triggerEvent('ad', event);
        } else if (player.ads.state === 'content-playback' && event.type === 'ended') {
          triggerEvent('content', event);
        } else if (player.ads.state === 'content-resuming') {
          if (player.ads.snapshot) {
            // the video element was recycled for ad playback
            if (player.currentSrc() !== player.ads.snapshot.currentSrc) {
              if (event.type === 'loadstart') {
                return;
              }
              return triggerEvent('content', event);

            // we ended playing postrolls and the video itself
            // the content src is back in place
            } else if (player.ads.snapshot.ended) {
              if ((event.type === 'pause' ||
                  event.type === 'ended')) {
                // after loading a video, the natural state is to not be started
                // in this case, it actually has, so, we do it manually
                player.addClass('vjs-has-started');
                // let `pause` and `ended` events through, naturally
                return;
              }
              // prefix all other events in content-resuming with `content`
              return triggerEvent('content', event);
            }
          }
          if (event.type !== 'playing') {
            triggerEvent('content', event);
          }
        }
      });
    })();

    // We now auto-play when an ad gets loaded if we're playing ads in the same video element as the content.
    // The problem is that in IE11, we cannot play in addurationchange but in iOS8, we cannot play from adcanplay.
    // This will allow ad-integrations from needing to do this themselves.
    player.on(['addurationchange', 'adcanplay'], function() {
      if (player.currentSrc() === player.ads.snapshot.currentSrc) {
        return;
      }

      player.play();
    });

    // replace the ad initializer with the ad namespace
    player.ads = {
      state: 'content-set',

      // Call this when an ad response has been received and there are
      // linear ads ready to be played.
      startLinearAdMode: function() {
        if (player.ads.state === 'preroll?' ||
            player.ads.state === 'content-playback' ||
            player.ads.state === 'postroll?') {
          player.trigger('adstart');
        }
      },

      // Call this when a linear ad pod has finished playing.
      endLinearAdMode: function() {
        if (player.ads.state === 'ad-playback') {
          player.trigger('adend');
        }
      },

      // Call this when an ad response has been received but there are no
      // linear ads to be played (i.e. no ads available, or overlays).
      // This has no effect if we are already in a linear ad mode.  Always
      // use endLinearAdMode() to exit from linear ad-playback state.
      skipLinearAdMode: function() {
        if (player.ads.state !== 'ad-playback') {
          player.trigger('adskip');
        }
      }
    };

    fsmHandler = function(event) {
      // Ad Playback State Machine
      var fsm = {
        'content-set': {
          events: {
            'adscanceled': function() {
              this.state = 'content-playback';
            },
            'adsready': function() {
              this.state = 'ads-ready';
            },
            'play': function() {
              this.state = 'ads-ready?';
              cancelContentPlay(player);
              // remove the poster so it doesn't flash between videos
              removeNativePoster(player);
            },
            'adserror': function() {
              this.state = 'content-playback';
            },
            'adskip': function() {
              this.state = 'content-playback';
            }
          }
        },
        'ads-ready': {
          events: {
            'play': function() {
              this.state = 'preroll?';
              cancelContentPlay(player);
            },
            'adskip': function() {
              this.state = 'content-playback';
            },
            'adserror': function() {
              this.state = 'content-playback';
            }
          }
        },
        'preroll?': {
          enter: function() {
            // change class to show that we're waiting on ads
            player.addClass('vjs-ad-loading');
            // schedule an adtimeout event to fire if we waited too long
            player.ads.adTimeoutTimeout = window.setTimeout(function() {
              player.trigger('adtimeout');
            }, settings.prerollTimeout);
            // signal to ad plugin that it's their opportunity to play a preroll
            player.trigger('readyforpreroll');
          },
          leave: function() {
            window.clearTimeout(player.ads.adTimeoutTimeout);
            player.removeClass('vjs-ad-loading');
          },
          events: {
            'play': function() {
              cancelContentPlay(player);
            },
            'adstart': function() {
              this.state = 'ad-playback';
            },
            'adskip': function() {
              this.state = 'content-playback';
            },
            'adtimeout': function() {
              this.state = 'content-playback';
            },
            'adserror': function() {
              this.state = 'content-playback';
            }
          }
        },
        'ads-ready?': {
          enter: function() {
            player.addClass('vjs-ad-loading');
            player.ads.adTimeoutTimeout = window.setTimeout(function() {
              player.trigger('adtimeout');
            }, settings.timeout);
          },
          leave: function() {
            window.clearTimeout(player.ads.adTimeoutTimeout);
            player.removeClass('vjs-ad-loading');
          },
          events: {
            'play': function() {
              cancelContentPlay(player);
            },
            'adscanceled': function() {
              this.state = 'content-playback';
            },
            'adsready': function() {
              this.state = 'preroll?';
            },
            'adskip': function() {
              this.state = 'content-playback';
            },
            'adtimeout': function() {
              this.state = 'content-playback';
            },
            'adserror': function() {
              this.state = 'content-playback';
            }
          }
        },
        'ad-playback': {
          enter: function() {
            // capture current player state snapshot (playing, currentTime, src)
            this.snapshot = getPlayerSnapshot(player);

            // add css to the element to indicate and ad is playing.
            player.addClass('vjs-ad-playing');

            // remove the poster so it doesn't flash between ads
            removeNativePoster(player);

            // We no longer need to supress play events once an ad is playing.
            // Clear it if we were.
            if (player.ads.cancelPlayTimeout) {
              window.clearTimeout(player.ads.cancelPlayTimeout);
              player.ads.cancelPlayTimeout = null;
            }
          },
          leave: function() {
            player.removeClass('vjs-ad-playing');
            restorePlayerSnapshot(player, this.snapshot);
            // trigger 'adend' as a consistent notification
            // event that we're exiting ad-playback.
            if (player.ads.triggerevent !== 'adend') {
              player.trigger('adend');
            }
          },
          events: {
            'adend': function() {
              this.state = 'content-resuming';
            },
            'adserror': function() {
              this.state = 'content-resuming';
            }
          }
        },
        'content-resuming': {
          enter: function() {
            if (this.snapshot.ended) {
              window.clearTimeout(player.ads._fireEndedTimeout);
              // in some cases, ads are played in a swf or another video element
              // so we do not get an ended event in this state automatically.
              // If we don't get an ended event we can use, we need to trigger
              // one ourselves or else we won't actually ever end the current video.
              player.ads._fireEndedTimeout = window.setTimeout(function() {
                player.trigger('ended');
              }, 1000);
            }
          },
          leave: function() {
            window.clearTimeout(player.ads._fireEndedTimeout);
          },
          events: {
            'contentupdate': function() {
              this.state = 'content-set';
            },
            contentresumed: function() {
              this.state = 'content-playback';
            },
            'playing': function() {
              this.state = 'content-playback';
            },
            'ended': function() {
              this.state = 'content-playback';
            }
          }
        },
        'postroll?': {
          enter: function() {
            this.snapshot = getPlayerSnapshot(player);

            player.addClass('vjs-ad-loading');

            player.ads.adTimeoutTimeout = window.setTimeout(function() {
              player.trigger('adtimeout');
            }, settings.postrollTimeout);
          },
          leave: function() {
            window.clearTimeout(player.ads.adTimeoutTimeout);
            player.removeClass('vjs-ad-loading');
          },
          events: {
            'adstart': function() {
              this.state = 'ad-playback';
            },
            'adskip': function() {
              this.state = 'content-resuming';
              window.setTimeout(function() {
                player.trigger('ended');
              }, 1);
            },
            'adtimeout': function() {
              this.state = 'content-resuming';
              window.setTimeout(function() {
                player.trigger('ended');
              }, 1);
            },
            'adserror': function() {
              this.state = 'content-resuming';
              window.setTimeout(function() {
                player.trigger('ended');
              }, 1);
            }
          }
        },
        'content-playback': {
          enter: function() {
            // make sure that any cancelPlayTimeout is cleared
            if (player.ads.cancelPlayTimeout) {
              window.clearTimeout(player.ads.cancelPlayTimeout);
              player.ads.cancelPlayTimeout = null;
            }
            // this will cause content to start if a user initiated
            // 'play' event was canceled earlier.
            player.trigger({
              type: 'contentplayback',
              triggerevent: player.ads.triggerevent
            });
          },
          events: {
            // in the case of a timeout, adsready might come in late.
            'adsready': function() {
              player.trigger('readyforpreroll');
            },
            'adstart': function() {
              this.state = 'ad-playback';
            },
            'contentupdate': function() {
              if (player.paused()) {
                this.state = 'content-set';
              } else {
                this.state = 'ads-ready?';
              }
            },
            'contentended': function() {
              this.state = 'postroll?';
            }
          }
        }
      };

      (function(state) {
        var noop = function() {};

        // process the current event with a noop default handler
        ((fsm[state].events || {})[event.type] || noop).apply(player.ads);

        // check whether the state has changed
        if (state !== player.ads.state) {

          // record the event that caused the state transition
          player.ads.triggerevent = event.type;

          // execute leave/enter callbacks if present
          (fsm[state].leave || noop).apply(player.ads);
          (fsm[player.ads.state].enter || noop).apply(player.ads);

          // output debug logging
          if (settings.debug) {
            videojs.log('ads', player.ads.triggerevent + ' triggered: ' + state + ' -> ' + player.ads.state);
          }
        }

      })(player.ads.state);

    };

    // register for the events we're interested in
    player.on(VIDEO_EVENTS.concat([
      // events emitted by ad plugin
      'adtimeout',
      'contentupdate',
      'contentplaying',
      'contentended',
      'contentresumed',

      // events emitted by third party ad implementors
      'adsready',
      'adserror',
      'adscanceled',
      'adstart',  // startLinearAdMode()
      'adend',    // endLinearAdMode()
      'adskip'    // skipLinearAdMode()
    ]), fsmHandler);

    // keep track of the current content source
    // if you want to change the src of the video without triggering
    // the ad workflow to restart, you can update this variable before
    // modifying the player's source
    player.ads.contentSrc = player.currentSrc();

    // implement 'contentupdate' event.
    (function(){
      var
        // check if a new src has been set, if so, trigger contentupdate
        checkSrc = function() {
          var src;
          if (player.ads.state !== 'ad-playback') {
            src = player.currentSrc();
            if (src !== player.ads.contentSrc) {
              player.trigger({
                type: 'contentupdate',
                oldValue: player.ads.contentSrc,
                newValue: src
              });
              player.ads.contentSrc = src;
            }
          }
        };
      // loadstart reliably indicates a new src has been set
      player.on('loadstart', checkSrc);
      // check immediately in case we missed the loadstart
      window.setTimeout(checkSrc, 1);
    })();

    // kick off the fsm
    if (!player.paused()) {
      // simulate a play event if we're autoplaying
      fsmHandler({type:'play'});
    }

  };

  // register the ad plugin framework
  videojs.plugin('ads', adFramework);

})(window, videojs);
