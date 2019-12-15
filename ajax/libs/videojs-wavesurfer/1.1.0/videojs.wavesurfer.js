(function (root, factory)
{
    if (typeof define === 'function' && define.amd)
    {
        // AMD. Register as an anonymous module.
        define(['videojs', 'wavesurfer'], factory);
    }
    else if (typeof module === 'object' && module.exports)
    {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        module.exports = factory(require('video.js'), require('wavesurfer'));
    }
    else
    {
        // Browser globals (root is window)
        root.returnExports = factory(root.videojs, root.WaveSurfer);
    }
}(this, function (videojs, WaveSurfer)
{
    var VjsComponent = videojs.getComponent('Component');

    /**
     * Use waveform for audio files in video.js player.
     */
    videojs.Waveform = videojs.extend(VjsComponent,
    {
        /**
         * The constructor function for the class.
         *
         * @param {videojs.Player|Object} player
         * @param {Object} options Player options.
         */
        constructor: function(player, options)
        {
            // run base component initializing with new options.
            VjsComponent.call(this, player, options);

            this.waveReady = false;
            this.waveFinished = false;
            this.liveMode = false;

            if (this.options_.options.src === 'live')
            {
                // check if the Microphone plugin can be enabled
                try
                {
                    this.microphone = Object.create(WaveSurfer.Microphone);

                    // listen for events
                    this.microphone.on('deviceError', this.onWaveError.bind(this));

                    // enable audio input from a microphone
                    this.liveMode = true;
                    this.waveReady = true;
                }
                catch (TypeError)
                {
                    console.warn('Could not find Microphone plugin!');
                }
            }

            if (this.options_.options.msDisplayMax !== undefined)
            {
                // msDisplayMax indicates the number of seconds that is
                // considered the boundary value for displaying milliseconds
                // in the time controls. An audio clip with a total length of
                // 2 seconds and a msDisplayMax of 3 will use the format
                // M:SS:MMM. Clips longer than msDisplayMax will be displayed
                // as M:SS or HH:MM:SS.
                this.msDisplayMax = parseFloat(this.options_.options.msDisplayMax);
            }
            else
            {
                // default
                this.msDisplayMax = 3;
            }

            // wait until player ui is ready
            this.player().one('ready', this.setupUI.bind(this));
        },

        /**
         * Player UI is ready.
         */
        setupUI: function()
        {
            // customize controls
            this.player().bigPlayButton.hide();

            // the native controls don't work for this UI so disable
            // them no matter what
            if (this.player().usingNativeControls_ === true)
            {
                if (this.player().tech_.el_ !== undefined)
                {
                    this.player().tech_.el_.controls = false;
                }
            }

            if (this.player().options_.controls)
            {
                // make sure controlBar is showing
                this.player().controlBar.show();
                this.player().controlBar.el().style.display = 'flex';

                // progress control isn't used by this plugin
                this.player().controlBar.progressControl.hide();

                // prevent controlbar fadeout
                this.player().on('userinactive', function(event)
                {
                    this.player().userActive(true);
                });

                // make sure time display is visible
                var uiElements = [this.player().controlBar.currentTimeDisplay,
                                  this.player().controlBar.timeDivider,
                                  this.player().controlBar.durationDisplay];
                for (var element in uiElements)
                {
                    // ignore when elements have been disabled by user
                    if (uiElements[element] !== undefined)
                    {
                        uiElements[element].el().style.display = 'block';
                        uiElements[element].show();
                    }
                }
                if (this.player().controlBar.remainingTimeDisplay !== undefined)
                {
                    this.player().controlBar.remainingTimeDisplay.hide();
                }
                if (this.player().controlBar.timeDivider !== undefined)
                {
                    this.player().controlBar.timeDivider.el().style.textAlign = 'center';
                    this.player().controlBar.timeDivider.el().style.width = '2em';
                }

                // disable play button until waveform is ready
                // (except when in live mode)
                if (!this.liveMode)
                {
                    this.player().controlBar.playToggle.hide();
                }
            }

            // waveform events
            this.surfer = Object.create(WaveSurfer);
            this.surfer.on('error', this.onWaveError.bind(this));
            this.surfer.on('finish', this.onWaveFinish.bind(this));

            this.surferReady = this.onWaveReady.bind(this);
            this.surferProgress = this.onWaveProgress.bind(this);
            this.surferSeek = this.onWaveSeek.bind(this);

            // only listen to these events when we're not in live mode
            if (!this.liveMode)
            {
                this.setupPlaybackEvents(true);
            }

            // player events
            this.player().on('play', this.onPlay.bind(this));
            this.player().on('pause', this.onPause.bind(this));
            this.player().on('volumechange', this.onVolumeChange.bind(this));
            this.player().on('fullscreenchange', this.onScreenChange.bind(this));

            // kick things off
            this.startPlayers();
        },

        /**
         * Starts or stops listening to events related to audio-playback.
         *
         * @param {boolean} enable Start or stop listening to playback related
         *     events.
         */
        setupPlaybackEvents: function(enable)
        {
            if (enable === false)
            {
                this.surfer.un('ready', this.surferReady);
                this.surfer.un('audioprocess', this.surferProgress);
                this.surfer.un('seek', this.surferSeek);
            }
            else if (enable === true)
            {
                this.surfer.on('ready', this.surferReady);
                this.surfer.on('audioprocess', this.surferProgress);
                this.surfer.on('seek', this.surferSeek);
            }
        },

        /**
         * Start the players.
         */
        startPlayers: function()
        {
            var options = this.options_.options;

            // init waveform
            this.initialize(options);

            if (options.src !== undefined)
            {
                if (this.microphone === undefined)
                {
                    // show loading spinner
                    this.player().loadingSpinner.show();

                    // start loading file
                    this.load(options.src);
                }
                else
                {
                    // hide loading spinner
                    this.player().loadingSpinner.hide();

                    // connect microphone input to our waveform
                    options.wavesurfer = this.surfer;
                    this.microphone.init(options);
                }
            }
            else
            {
                // no valid src found, hide loading spinner
                this.player().loadingSpinner.hide();
            }
        },

        /**
         * Initializes the waveform.
         *
         * @param {Object} opts Plugin options.
         */
        initialize: function(opts)
        {
            this.originalHeight = this.player().options_.height;
            var controlBarHeight = this.player().controlBar.height();
            if (this.player().options_.controls === true && controlBarHeight === 0)
            {
                // The dimensions of the controlbar are not known yet, but we need
                // it now, so we can calculate the height of the waveform.
                // The default height is 30px, so use that instead.
                controlBarHeight = 30;
            }

            // set waveform element and dimensions
            // Set the container to player's container if "container" option is not provided
            // If a waveform needs to be appended to your custom element, then use below option
            // <code>container: document.querySelector("#vjs-waveform")</code>
            if (opts.container === undefined)
            {
                opts.container = this.el();
            }

            // Set the height of generated waveform if user has provided height from options.
            // If height of waveform need to be customized then use option below.
            // Example: <code>waveformHeight:30</code>
            if (opts.waveformHeight === undefined)
            {
                opts.height = this.player().height() - controlBarHeight;
            }
            else
            {
                opts.height = opts.waveformHeight;
            }

            // customize waveform appearance
            this.surfer.init(opts);
        },

        /**
         * Start loading waveform data.
         *
         * @param {String|Blob|File} url Either the URL of the audio file,
         *     or a Blob or File object.
         */
        load: function(url)
        {
            if (url instanceof Blob || url instanceof File)
            {
                this.surfer.loadBlob(url);
            }
            else
            {
                this.surfer.load(url);
            }
        },

        /**
         * Start/resume playback or microphone.
         */
        play: function()
        {
            if (this.liveMode)
            {
                // start/resume microphone visualization
                if (!this.microphone.active)
                {
                    this.microphone.start();
                }
                else
                {
                    this.microphone.play();
                }
            }
            else
            {
                // put video.js player UI in playback mode
                this.player().play();

                // start surfer playback
                this.surfer.play();
            }
        },

        /**
         * Pauses playback or microphone visualization.
         */
        pause: function()
        {
            if (this.liveMode)
            {
                // pause microphone visualization
                this.microphone.pause();
            }
            else
            {
                // pause playback
                if (!this.waveFinished)
                {
                    this.surfer.pause();
                }
                else
                {
                    this.waveFinished = false;
                }

                this.setCurrentTime();
            }
        },

        /**
         * Remove the player and waveform.
         */
        destroy: function()
        {
            if (this.liveMode && this.microphone)
            {
                // destroy microphone plugin
                this.microphone.destroy();
            }

            this.surfer.destroy();
            this.player().dispose();
        },

        /**
         * Set the current volume.
         *
         * @param {Number} volume The new volume level.
         */
        setVolume: function(volume)
        {
            if (volume !== undefined)
            {
                this.surfer.setVolume(volume);
            }
        },

        /**
         * Updates the player's element displaying the current time.
         *
         * @param {Number} currentTime (optional) Current position of the
         *    playhead (in seconds).
         * @param {Number} duration (optional) Duration of the waveform
         *    (in seconds).
         */
        setCurrentTime: function(currentTime, duration)
        {
            if (currentTime === undefined)
            {
                currentTime = this.surfer.getCurrentTime();
            }

            if (duration === undefined)
            {
                duration = this.surfer.getDuration();
            }
            var time = Math.min(currentTime, duration);

            // update control
            this.player().controlBar.currentTimeDisplay.contentEl(
                ).innerHTML = this.formatTime(time, duration);
        },

        /**
         * Updates the player's element displaying the duration time.
         *
         * @param {Number} duration (optional) Duration of the waveform
         *    (in seconds).
         */
        setDuration: function(duration)
        {
            if (duration === undefined)
            {
                duration = this.surfer.getDuration();
            }

            // update control
            this.player().controlBar.durationDisplay.contentEl(
                ).innerHTML = this.formatTime(duration, duration);
        },

        /**
         * Audio is loaded, decoded and the waveform is drawn.
         */
        onWaveReady: function()
        {
            this.waveReady = true;
            this.waveFinished = false;
            this.liveMode = false;

            // update time display
            this.setCurrentTime();
            this.setDuration();

            // enable and show play button
            this.player().controlBar.playToggle.show();

            // hide loading spinner
            this.player().loadingSpinner.hide();

            // auto-play when ready (if enabled)
            if (this.player().options_.autoplay)
            {
                this.play();
            }
        },

        /**
         * Fires when audio playback completed.
         */
        onWaveFinish: function()
        {
            // check if player isn't paused already
            if (!this.player().paused())
            {
                // check if loop is enabled
                if (this.player().options_.loop)
                {
                    // reset waveform
                    this.surfer.stop();
                    this.play();
                }
                else
                {
                    // finished
                    this.waveFinished = true;

                    // pause player
                    this.player().pause();
                }
            }
        },

        /**
         * Fires continuously during audio playback.
         *
         * @param {Number} time Current time/location of the playhead.
         */
        onWaveProgress: function(time)
        {
            this.setCurrentTime();
        },

        /**
         * Fires during seeking of the waveform.
         */
        onWaveSeek: function()
        {
            this.setCurrentTime();
        },

        /**
         * Fired whenever the media in the player begins or resumes playback.
         */
        onPlay: function()
        {
            // don't start playing until waveform's ready
            if (this.waveReady)
            {
                this.play();
            }
        },

        /**
         * Fired whenever the media in the player has been paused.
         */
        onPause: function()
        {
            this.pause();
        },

        /**
         * Fired when the volume in the player changes.
         */
        onVolumeChange: function()
        {
            var volume = this.player().volume();
            if (this.player().muted())
            {
                // muted volume
                volume = 0;
            }

            this.setVolume(volume);
        },

        /**
         * Fired when the player switches in or out of fullscreen mode.
         */
        onScreenChange: function()
        {
            var isFullscreen = this.player().isFullscreen();
            var newHeight;

            if (!isFullscreen)
            {
                // restore original height
                newHeight = this.originalHeight;
            }
            else
            {
                // fullscreen height
                newHeight = window.outerHeight;
            }

            if (this.waveReady)
            {
                if (this.liveMode && !this.microphone.active)
                {
                    // we're in live mode but the microphone hasn't been
                    // started yet
                    return;
                }

                // destroy old drawing
                this.surfer.drawer.destroy();

                // set new height
                this.surfer.params.height = newHeight - this.player().controlBar.height();
                this.surfer.createDrawer();

                // redraw
                this.surfer.drawBuffer();

                // make sure playhead is restored at right position
                this.surfer.drawer.progress(this.surfer.backend.getPlayedPercents());
            }
        },

        /**
         * Waveform error.
         *
         * @param {String} error The wavesurfer error.
         */
        onWaveError: function(error)
        {
            this.player().trigger('error', error);
        },

        /**
         * Format seconds as a time string, H:MM:SS, M:SS or M:SS:MMM.
         *
         * Supplying a guide (in seconds) will force a number of leading zeros
         * to cover the length of the guide.
         *
         * @param {Number} seconds Number of seconds to be turned into a string
         * @param {Number} guide Number (in seconds) to model the string after
         * @return {String} Time formatted as H:MM:SS, M:SS or M:SS:MMM.
         */
        formatTime: function(seconds, guide)
        {
            // Default to using seconds as guide
            guide = guide || seconds;
            var s = Math.floor(seconds % 60),
                m = Math.floor(seconds / 60 % 60),
                h = Math.floor(seconds / 3600),
                gm = Math.floor(guide / 60 % 60),
                gh = Math.floor(guide / 3600),
                ms = Math.floor((seconds - s) * 1000);

            // handle invalid times
            if (isNaN(seconds) || seconds === Infinity)
            {
                // '-' is false for all relational operators (e.g. <, >=) so this
                // setting will add the minimum number of fields specified by the
                // guide
                h = m = s = ms = '-';
            }

            // Check if we need to show milliseconds
            if (guide > 0 && guide < this.msDisplayMax)
            {
                if (ms < 100)
                {
                    if (ms < 10)
                    {
                        ms = '00' + ms;
                    }
                    else
                    {
                        ms = '0' + ms;
                    }
                }
                ms = ':' + ms;
            }
            else
            {
                ms = '';
            }

            // Check if we need to show hours
            h = (h > 0 || gh > 0) ? h + ':' : '';

            // If hours are showing, we may need to add a leading zero.
            // Always show at least one digit of minutes.
            m = (((h || gm >= 10) && m < 10) ? '0' + m : m) + ':';

            // Check if leading zero is need for seconds
            s = ((s < 10) ? '0' + s : s);

            return h + m + s + ms;
        }

    });

    var createWaveform = function()
    {
        var props = {
            className: 'vjs-waveform',
            tabIndex: 0
        };
        return VjsComponent.prototype.createEl('div', props);
    };

    // plugin defaults
    var defaults = {};

    /**
     * Initialize the plugin.
     * @param options (optional) {object} configuration for the plugin
     */
    var wavesurferPlugin = function(options)
    {
        var settings = videojs.mergeOptions(defaults, options);
        var player = this;

        // create new waveform
        player.waveform = new videojs.Waveform(player,
        {
            'el': createWaveform(),
            'options': settings
        });

        // add waveform to dom
        player.el().appendChild(player.waveform.el());
    };

    // register the plugin
    videojs.plugin('wavesurfer', wavesurferPlugin);

    // return a function to define the module export
    return wavesurferPlugin;
}));
