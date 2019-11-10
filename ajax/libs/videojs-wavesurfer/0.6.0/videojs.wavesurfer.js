// Copyright Collab 2014

(function(root, factory)
{
    if (typeof define === 'function' && define.amd)
    {
        define(['wavesurfer'], factory);
    }
    else
    {
        root.WaveSurfer.Videojs = factory(root.WaveSurfer);
    }
}(this, function(WaveSurfer)
{
    /**
     * Use waveform for audio files in video.js player.
     */
    videojs.Waveform = videojs.Component.extend({

        /**
         * The constructor function for the class.
         * 
         * @param options: Player options.
         * @param ready: Ready callback function.
         */
        init: function(player, options, ready)
        {
            // run base component initializing with new options.
            videojs.Component.call(this, player, options, ready);

            this.waveReady = false;
            this.waveFinished = false;

            if (this.options().options.msDisplayMax !== undefined)
            {
            	// msDisplayMax indicates the number of seconds that is
                // considered the boundary value for displaying milliseconds
                // in the time controls. An audio clip with a total length of
                // 2 seconds and a msDisplayMax of 3 will use the format
                // M:SS:MMM. Clips longer than msDisplayMax will be displayed
            	// as M:SS or HH:MM:SS.
            	this.msDisplayMax = parseFloat(this.options().options.msDisplayMax);
            }
            else
            {
            	// default
            	this.msDisplayMax = 3;
            }

            // start loading spinner
            this.player().loadingSpinner.show();

            // customize controls
            this.player().bigPlayButton.hide();

            if (this.player().options().controls)
            {
            	// progress control isn't used by this plugin
                this.player().controlBar.progressControl.hide();

                // prevent controlbar fadeout
                this.player().on('userinactive', function(event)
                {
                   this.player().userActive(true);
                });

                // videojs automatically hides the controls when no valid 'source' element
                // is included in the 'audio' tag. Don't.
                this.player().controlBar.show();

                // disable play button until waveform is ready
                this.player().controlBar.playToggle.hide();

                // disable currentTimeDisplay component that constantly tries to reset the value
                // to 0
                this.player().controlBar.currentTimeDisplay.disable();
                this.player().controlBar.currentTimeDisplay.el().style.display = 'block';
            }

            // waveform events
            this.surfer = Object.create(WaveSurfer);
            this.surfer.on('ready', this.onWaveReady.bind(this));
            this.surfer.on('error', this.onWaveError.bind(this));
            this.surfer.on('finish', this.onWaveFinish.bind(this));
            this.surfer.on('audioprocess', this.onWaveProgress.bind(this));
            this.surfer.on('seek', this.onWaveSeek.bind(this));

            // player events
            this.player().on('play', this.onPlay.bind(this));
            this.player().on('pause', this.onPause.bind(this));
            this.player().on('volumechange', this.onVolumeChange.bind(this));
            this.player().on('fullscreenchange', this.onScreenChange.bind(this));

            // kick things off
            this.startPlayers();
        },

        /**
         * Start the players.
         */
        startPlayers: function()
        {
            var options = this.options().options;

            // init waveform
            this.initialize(options);

            // start loading
            if (options.src !== undefined)
            {
                this.load(options.src);
            }
        },

        /**
         * Initializes the waveform.
         * 
         * @param opts: Plugin options.
         */
        initialize: function(opts)
        {
            this.originalHeight = this.player().options().height;

            // set waveform element and dimensions
            opts.container = this.el();
            opts.height = this.player().height() - this.player().controlBar.height();

            // customize waveform appearance
            this.surfer.init(opts);
        },

        /**
         * Start loading waveform data.
         * 
         * @param url: Either the URL of the audio file, or a Blob or File
         *             object.
         */
        load: function(url)
        {
            if (url instanceof Blob || url instanceof File)
            {
                this.surfer.loadArrayBuffer(url);
            }
            else
            {
                this.surfer.load(url);
            }
        },

        /**
         * Start or resume playback.
         */
        play: function()
        {
            this.surfer.play();
        },

        /**
         * Pauses playback.
         */
        pause: function()
        {
        	if (!this.waveFinished)
        	{
        		this.surfer.pause();
        	}
        	else
        	{
        		this.waveFinished = false;
        	}

            this.setCurrentTime();
        },

        /**
         * Remove the player and waveform.
         */
        destroy: function()
        {
            this.surfer.destroy();
            this.player().dispose();
        },

        /**
         * Set the current volume of the media.
         * 
         * @param volume: The new volume level.
         */
        setVolume: function(volume)
        {
            this.surfer.setVolume(volume);
        },

        /**
         * Updates the player's current time.
         */
        setCurrentTime: function()
        {
            var duration = this.surfer.getDuration();
            var currentTime = this.surfer.getCurrentTime();
            var time = Math.min(currentTime, duration);

            // update control
            this.player().controlBar.currentTimeDisplay.el(
                ).firstChild.innerHTML = this.formatTime(
                time, duration);
        },

        /**
         * Updates the duration time.
         */
        setDuration: function()
        {
            var duration = this.surfer.getDuration();

            // update control
            this.player().controlBar.durationDisplay.el(
                ).firstChild.innerHTML = this.formatTime(
                duration, duration);
        },

        /**
         * Audio is loaded, decoded and the waveform is drawn.
         */
        onWaveReady: function()
        {
            this.waveReady = true;
            this.waveFinished = false;

            // make sure the size of time controls is large enough to
            // display milliseconds
            if (this.surfer.getDuration() < this.msDisplayMax)
            {
                this.player().controlBar.durationDisplay.el().style.width = 
                    this.player().controlBar.currentTimeDisplay.el().style.width = '6em';
            }

            // update time display
            this.setCurrentTime();
            this.setDuration();

            // enable and show play button
            this.player().controlBar.playToggle.show();

            // remove loading spinner
            this.player().removeChild(this.player().loadingSpinner);

            // auto-play when ready (if enabled)
            if (this.player().options().autoplay)
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
                if (this.player().options().loop)
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
         * @param percent: Percentage played so far.
         */
        onWaveProgress: function(percent)
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

            // destroy old drawing
            this.surfer.drawer.destroy();

            // set new height
            this.surfer.params.height = newHeight - this.player().controlBar.height();
            this.surfer.createDrawer();

            // redraw
            this.surfer.drawBuffer();

            // make sure playhead is restored at right position
            this.surfer.drawer.progress(this.surfer.backend.getPlayedPercents());
        },

        /**
         * Waveform error.
         */
        onWaveError: function(error)
        {
            console.warn(error);
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
                ms = ":" + ms;
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
        return videojs.Component.prototype.createEl(null, props);
    };

    function wavesurferPlugin(options)
    {
        // create new waveform
        this.waveform = new videojs.Waveform(this,
        {
            'el': createWaveform(),
            'options': options
        });

        // add waveform to dom
        this.el().appendChild(this.waveform.el());
    }

    // register the plugin
    videojs.plugin('wavesurfer', wavesurferPlugin);

    return wavesurferPlugin;

}));
