/*! videojs-contrib-dash - v1.0.1 - 2015-07-13
 * Copyright (c) 2015 Brightcove  */
(function(window, videojs) {
  'use strict';

  /**
   * videojs-contrib-dash
   *
   * Use Dash.js to playback DASH content inside of Video.js via a SourceHandler
   */
  function Html5DashJS (source, tech) {
    var
      options = tech.options(),
      manifestSource;

    this.tech_ = tech;
    this.el_ = tech.el();
    this.elParent_ = this.el_.parentNode;

    // Do nothing if the src is falsey
    if (!source.src) {
      return;
    }

    // While the manifest is loading and Dash.js has not finished initializing
    // we must defer events and functions calls with isReady_ and then `triggerReady`
    // again later once everything is setup
    tech.isReady_ = false;

    manifestSource = source.src;
    this.keySystemOptions_ = Html5DashJS.buildDashJSProtData(source.keySystemOptions);

    // We have to hide errors since SRC_UNSUPPORTED is thrown by the video element when
    // we set src = '' in order to clear the mediaKeys
    Html5DashJS.hideErrors(this.elParent_);

    // Must be before anything is initialized since we are overridding a global object
    // injection
    Html5DashJS.useVideoJSDebug(videojs);

    // Save the context after the first initialization for subsequent instances
    Html5DashJS.context_ = Html5DashJS.context_ || new Dash.di.DashContext();

    // But make a fresh MediaPlayer each time the sourceHandler is used
    this.mediaPlayer_ = new MediaPlayer(Html5DashJS.context_);

    // Must run controller before these two lines or else there is no
    // element to bind to.
    this.mediaPlayer_.startup();
    this.mediaPlayer_.attachView(this.el_);

    // Dash.js autoplays by default
    if (!options.autoplay) {
      this.mediaPlayer_.setAutoPlay(false);
    }

    // Fetches and parses the manifest - WARNING the callback is non-standard "error-last" style
    this.mediaPlayer_.retrieveManifest(manifestSource, videojs.bind(this, this.initializeDashJS));
  }

  Html5DashJS.prototype.initializeDashJS = function (manifest, err) {
    var manifestProtectionData = {};

    if (err) {
      Html5DashJS.showErrors(this.elParent_);
      this.tech_.triggerReady();
      this.dispose();
      return;
    }

    // If we haven't received protection data from the outside world try to get it from the manifest
    // We merge the two allowing the manifest to override any keySystemOptions provided via src()
    if (Html5DashJS.getWidevineProtectionData) {
      manifestProtectionData = Html5DashJS.getWidevineProtectionData(manifest);
      this.keySystemOptions_ = videojs.obj.deepMerge(
        this.keySystemOptions_,
        manifestProtectionData);
    }

    // We have to reset any mediaKeys before the attachSource call below
    this.resetSrc_(videojs.bind(this, function afterMediaKeysReset () {
      Html5DashJS.showErrors(this.elParent_);

      // Attach the source with any protection data
      this.mediaPlayer_.attachSource(manifest, null, this.keySystemOptions_);

      this.tech_.triggerReady();
    }));
  };

  /*
   * Change MediaPlayer.utils.Debug to log using videojs debugger in order to
   * keep the console.log clean
   */
  Html5DashJS.useVideoJSDebug = function (videojs) {
    if (Html5DashJS.originalDebug) {
      return;
    }

    if (videojs && videojs.log && videojs.log.debug) {
      Html5DashJS.originalDebug = MediaPlayer.utils.Debug;

      // Replace the global Debug function in Dash.js
      MediaPlayer.utils.Debug = function () {
        var logToBrowserConsole = true,
            showLogTimestamp = false,
            showCalleeName = false,
            startTime = new Date().getTime(),
            eventBus;

        return {
            system: undefined,
            eventBus: undefined,

            setup: function() {
                this.system.mapValue('log', this.log);
                eventBus = this.eventBus;
            },
            /**
             * Prepends a timestamp in milliseconds to each log message.
             * @param {boolean} value Set to true if you want to see a timestamp in each log message
             * @default false
             * @memberof MediaPlayer.utils.Debug#
             */
            setLogTimestampVisible: function(value) {
                showLogTimestamp = value;
            },
            /**
             * Prepends the callee object name, and media type if available, to each log message.
             * @param {boolean} value Set to true if you want to see a object name and media type in
             * each log message.
             * @default false
             * @memberof MediaPlayer.utils.Debug#
             */
            showCalleeName: function(value) {
                showCalleeName = value;
            },
            /**
             * Toggles logging to the browser's javascript console.  If you set to false you will
             * still receive a log event with the same message.
             * @param {boolean} value Set to false if you want to turn off logging to the browser's
             * console.
             * @default true
             * @memberof MediaPlayer.utils.Debug#
             */
            setLogToBrowserConsole: function(value) {
                logToBrowserConsole = value;
            },
            /**
             * Use this method to get the state of logToBrowserConsole.
             * @returns {boolean} The current value of logToBrowserConsole
             * @memberof MediaPlayer.utils.Debug#
             */
            getLogToBrowserConsole: function() {
                return logToBrowserConsole;
            },
            /**
             * This method will allow you send log messages to either the browser's console and/or
             * dispatch an event to capture at the media player level.
             * @param arguments The message you want to log. The Arguments object is supported for
             * this method so you can send in comma separated logging items.
             * @memberof MediaPlayer.utils.Debug#
             */
            log: function () {

                var message = '',
                    logTime = null;

                if (showLogTimestamp) {
                    logTime = new Date().getTime();
                    message += '[' + (logTime - startTime) + ']';
                }

                if (showCalleeName && this.getName) {
                    message += '[' + this.getName() + ']';
                }

                if (this.getMediaType && this.getMediaType()) {
                    message += '[' + this.getMediaType() + ']';
                }

                if (message.length > 0) {
                    message += ' ';
                }

                Array.apply(null, arguments).forEach(function(item) {
                    message += item + ' ';
                });

                if (logToBrowserConsole) {
                    videojs.log.debug(message);
                }

                eventBus.dispatchEvent({
                    type: 'log',
                    message: message
                });
            }
        };
      };
    }
  };

  /*
   * Add a css-class that is used to temporarily hide the error dialog while so that
   * we don't see a flash of the dialog box when we remove the video element's src
   * to reset MediaKeys in resetSrc_
   */
  Html5DashJS.hideErrors = function (el) {
    videojs.addClass(el, 'vjs-dashjs-hide-errors');
  };

  /*
   * Remove the css-class above to enable the error dialog to be shown once again
   */
  Html5DashJS.showErrors = function (el) {
    // The video element's src is set asynchronously so we have to wait a while
    // before we unhide any errors
    // 250ms is arbitrary but I haven't seen dash.js take longer than that to initialize
    // in my testing
    setTimeout(function () {
      videojs.removeClass(el, 'vjs-dashjs-hide-errors');
    }, 250);
  };

  /*
   * Iterate over the `keySystemOptions` array and convert each object into
   * the type of object Dash.js expects in the `protData` argument.
   *
   * Also rename 'licenseUrl' property in the options to an 'laURL' property
   */
  Html5DashJS.buildDashJSProtData = function (keySystemOptions) {
    var
      keySystem,
      options,
      i,
      output = {};

    if (!keySystemOptions || !videojs.obj.isArray(keySystemOptions)) {
      return output;
    }

    for (i = 0; i < keySystemOptions.length; i++) {
      keySystem = keySystemOptions[i];
      options = videojs.obj.deepMerge({}, keySystem.options);

      if (options.licenseUrl) {
        options.laURL = options.licenseUrl;
        delete options.licenseUrl;
      }

      output[keySystem.name] = options;
    }

    return output;
  };

  /*
   * Helper function to clear any EME keys that may have been set on the video element
   *
   * The MediaKeys has to be explicitly set to null before any DRM content can be loaded into
   * a video element that already contained DRM content.
   */
  Html5DashJS.prototype.resetSrc_ = function (callback) {
    // In Chrome, MediaKeys can NOT be changed when a src is loaded in the video element
    // Dash.js has a bug where it doesn't correctly reset the data so we do it manually
    // The order of these two lines is important. The video element's src must be reset
    // to allow `mediaKeys` to changed otherwise a DOMException is thrown.
    if (this.el_) {
      this.el_.src = '';
      if (this.el_.setMediaKeys) {
        this.el_.setMediaKeys(null).then(callback, callback);
      } else {
        callback();
      }
    }
  };

  Html5DashJS.prototype.dispose = function () {
    if (this.mediaPlayer_) {
      this.mediaPlayer_.reset();
    }
    this.resetSrc_(function noop(){});
  };

  // Only add the SourceHandler if the browser supports MediaSourceExtensions
  if (!!window.MediaSource) {
    videojs.Html5.registerSourceHandler({
      canHandleSource: function (source) {
        var dashTypeRE = /^application\/dash\+xml/i;
        var dashExtRE = /\.mpd/i;

        if (dashTypeRE.test(source.type)) {
          return 'probably';
        } else if (dashExtRE.test(source.src)){
          return 'maybe';
        } else {
          return '';
        }
      },

      handleSource: function (source, tech) {
        return new Html5DashJS(source, tech);
      }
    });
  }

  videojs.Html5DashJS = Html5DashJS;
})(window, window.videojs);
