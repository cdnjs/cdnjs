(function(window, videojs) {
    'use strict';

    /**
     * Record audio/video/images using the Video.js player.
     */
    videojs.Recorder = videojs.Component.extend({

        // recorder modes
        IMAGE_ONLY: 'image_only',
        AUDIO_ONLY: 'audio_only',
        VIDEO_ONLY: 'video_only',
        AUDIO_VIDEO: 'audio_video',
        ANIMATION: 'animation',

        /**
         * The constructor function for the class.
         * 
         * @param {videojs.Player|Object} player
         * @param {Object} options Player options.
         * @param {Function} ready Ready callback function.
         */
        init: function(player, options, ready)
        {
            // run base component initializing with new options.
            videojs.Component.call(this, player, options, ready);

            // record settings
            this.recordImage = this.options().options.image;
            this.recordAudio = this.options().options.audio;
            this.recordVideo = this.options().options.video;
            this.recordAnimation = this.options().options.animation;
            this.maxLength = this.options().options.maxLength;
            this.debug = this.options().options.debug;

            // audio settings
            this.audioBufferSize = this.options().options.audioBufferSize;
            this.audioSampleRate = this.options().options.audioSampleRate;

            // animation settings
            this.animationFrameRate = this.options().options.animationFrameRate;
            this.animationQuality = this.options().options.animationQuality;

            // recorder state
            this._recording = false;
            this._processing = false;

            // shortcut
            player.getBlob = this.getBlob;

            // cross-browser getUserMedia
            this.getUserMedia = (
                navigator.getUserMedia ||
                navigator.webkitGetUserMedia ||
                navigator.mozGetUserMedia ||
                navigator.msGetUserMedia
            ).bind(navigator);

            // tweak player UI
            switch (this.getRecordType())
            {
                case this.AUDIO_ONLY:
                    // reference to videojs-wavesurfer plugin
                    this.surfer = player.waveform;

                    // initially hide playhead (fixed in wavesurfer 1.0.25)
                    this.playhead = this.surfer.el().getElementsByTagName('wave')[1];
                    this.playhead.style.display = 'none';
                    break;

                case this.IMAGE_ONLY:
                case this.VIDEO_ONLY:
                case this.AUDIO_VIDEO:
                case this.ANIMATION:
                    // customize controls
                    // XXX: below are customizations copied from videojs.wavesurfer that
                    //      tweak the video.js UI...
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

                        // videojs automatically hides the controls when no valid 'source'
                        // element is included in the 'audio' tag. Don't. Ever again.
                        this.player().controlBar.show();
                        this.player().controlBar.el().style.display = 'block';

                        // disable currentTimeDisplay's 'timeupdate' event listener that
                        // constantly tries to reset the current time value to 0
                        this.player().off('timeupdate');
                    }
                    break;
            }

            // display max record time
            this.setDuration(this.maxLength);

            // hide play control
            this.player().controlBar.playToggle.hide();
        },

        /**
         * Indicates whether we're currently recording or not.
         */
        isRecording: function()
        {
            return this._recording;
        },

        /**
         * Indicates whether we're currently processing recorded data or not.
         */
        isProcessing: function()
        {
            return this._processing;
        },

        /**
         * Open the brower's recording device selection dialog.
         */
        getDevice: function()
        {
            // ask the browser to give us access to media device and get a
            // stream reference in the callback function
            switch (this.getRecordType())
            {
                case this.AUDIO_ONLY:
                    // setup microphone
                    this.mediaType = {
                        audio: true,
                        video: false
                    };
                    this.surfer.microphone.on('deviceReady',
                        this.onDeviceReady.bind(this));
                    this.surfer.microphone.on('deviceError',
                        this.onDeviceError.bind(this));

                    // open browser device selection dialog
                    this.player().play();
                    break;

                case this.IMAGE_ONLY:
                case this.VIDEO_ONLY:
                    // setup camera
                    this.mediaType = {
                        audio: false,
                        video: true
                    };
                    this.getUserMedia(
                        this.mediaType,
                        this.onDeviceReady.bind(this),
                        this.onDeviceError.bind(this));
                    break;

                case this.AUDIO_VIDEO:
                    // setup camera and microphone
                    this.mediaType = {
                        audio: true,
                        video: true
                    };
                    this.getUserMedia(
                        this.mediaType,
                        this.onDeviceReady.bind(this),
                        this.onDeviceError.bind(this));
                    break;

                case this.ANIMATION:
                    // setup camera
                    this.mediaType = {
                        // animated gif
                        audio: false,
                        video: false,
                        gif: true
                    };
                    this.getUserMedia({
                            audio: false,
                            video: true
                        },
                        this.onDeviceReady.bind(this),
                        this.onDeviceError.bind(this));
                    break;
            }
        },

        /**
         * Invoked when the device is ready.
         *
         * @param stream: LocalMediaStream instance.
         */
        onDeviceReady: function(stream)
        {
            // store reference to stream for stopping etc.
            this.stream = stream;

            // forward to listeners
            this.player().trigger('deviceReady');

            // hide device selection button
            this.player().deviceButton.hide();

            // hide live display indicator
            this.player().controlBar.liveDisplay.hide();

            // setup recording engine
            if (this.getRecordType() !== this.IMAGE_ONLY)
            {
                // connect stream to recording engine
                this.engine = new MRecordRTC();
                this.engine.mediaType = this.mediaType;
                this.engine.disableLogs = !this.debug;
                // audio settings
                this.engine.bufferSize = this.audioBufferSize;
                this.engine.sampleRate = this.audioSampleRate;
                // animated gif settings
                this.engine.quality = this.animationQuality;
                this.engine.frameRate = this.animationFrameRate;
                this.engine.addStream(this.stream);

                // show elements that should never be hidden in animation,
                // audio and/or video modus
                var element;
                var uiElements = [this.player().controlBar.currentTimeDisplay,
                                  this.player().controlBar.timeDivider,
                                  this.player().controlBar.durationDisplay];
                for (element in uiElements)
                {
                    uiElements[element].el().style.display = 'block';
                    uiElements[element].show();
                }

                // show record button
                this.player().recordToggle.show();
            }
            else
            {
                // disable record indicator
                this.player().recordIndicator.disable();

                // show camera button
                this.player().cameraButton.show();
            }

            // setup preview
            if (this.getRecordType() !== this.AUDIO_ONLY)
            {
                // show live video preview
                this.mediaElement = this.player().el().firstChild;
                this.mediaElement.muted = true;
                this.mediaElement.controls = false;
                this.load(URL.createObjectURL(this.stream));
                this.mediaElement.play();
            }
        },

        /**
         * Invoked when an device error occurred.
         */
        onDeviceError: function(code)
        {
            // store code
            this.player().deviceErrorCode = code;

            // forward error to player
            this.player().trigger('deviceError');
        },

        /**
         * Start recording.
         */
        start: function()
        {
            if (!this.isProcessing())
            {
                this._recording = true;

                // hide play control
                this.player().controlBar.playToggle.hide();

                // setup preview engine
                switch (this.getRecordType())
                {
                    case this.AUDIO_ONLY:
                        // disable playback events
                        this.surfer.setupPlaybackEvents(false);

                        // hide playhead
                        // backwards compat (fixed since wavesurfer 1.0.25)
                        this.playhead.style.display = 'none';

                        // start/resume live audio visualization
                        this.surfer.liveMode = true;
                        this.player().play();
                        break;

                    case this.VIDEO_ONLY:
                    case this.AUDIO_VIDEO:
                        this.startVideoPreview();
                        break;

                    case this.ANIMATION:
                        // hide the first frame
                        this.player().recordCanvas.hide();

                        // hide the animation
                        this.player().animationDisplay.hide();

                        // show preview video
                        this.mediaElement.style.display = 'block';

                        // for animations, capture the first frame
                        // that can be displayed as soon as recording
                        // is complete
                        this.captureFrame();

                        // start video preview **after** capturing first frame
                        this.startVideoPreview();
                        break;
                }

                // start recording
                if (this.getRecordType() !== this.IMAGE_ONLY)
                {
                    // start countdown
                    this.startTime = new Date().getTime();
                    this.countDown = this.setInterval(
                        this.onCountDown.bind(this), 100);

                    // start recording stream
                    this.engine.startRecording();
                }
                else
                {
                    // create snapshot
                    this.createSnapshot();
                }

                // notify UI
                this.trigger('startRecord');
            }
        },

        /**
         * Stop recording.
         */
        stop: function()
        {
            if (!this.isProcessing())
            {
                this._recording = false;
                this._processing = true;

                // notify UI
                this.trigger('stopRecord');

                if (this.getRecordType() !== this.IMAGE_ONLY)
                {
                    // stop countdown
                    this.clearInterval(this.countDown);

                    // stop recording stream (result will be available async)
                    this.engine.stopRecording(this.onStopRecording.bind(this));
                }
                else
                {
                    // notify listeners that image data is (already) available
                    this.trigger('finishRecord');
                }
            }
        },

        /**
         * Invoked when recording is stopped and resulting stream is available.
         *
         * @param {string} audioVideoWebMURL Reference to the recorded Blob object, eg.
         *   blob:http://localhost:8080/10100016-4248-9949-b0d6-0bb40db56eba
         * @param {string} type Media type, eg. 'video' or 'audio'.
         */
        onStopRecording: function(audioVideoWebMURL, type)
        {
            // store reference to recorded stream URL
            this.mediaURL = audioVideoWebMURL;

            // store reference to recorded stream data
            this.engine.getBlob(function(recording)
            {
                switch (this.getRecordType())
                {
                    case this.AUDIO_ONLY:
                        // show play control
                        this.player().controlBar.playToggle.show();

                        // store recorded data
                        this.player().recordedData = recording.audio;

                        // notify listeners that data is available
                        this.trigger('finishRecord');

                        // Pausing the player so we can visualize the recorded data
                        // will trigger an async videojs 'pause' event that we have
                        // to wait for.
                        this.player().one('pause', function()
                        {
                            // setup events during playback
                            this.surfer.setupPlaybackEvents(true);

                            // display loader
                            this.player().loadingSpinner.show();

                            // show playhead
                            this.playhead.style.display = 'block';

                            // restore interaction with controls after waveform
                            // rendering is complete
                            this.surfer.surfer.once('ready', function()
                            {
                                this._processing = false;
                            }.bind(this));

                            // visualize recorded stream
                            this.load(this.player().recordedData);

                        }.bind(this));

                        // pause player so user can start playback
                        this.player().pause();
                        break;

                    case this.VIDEO_ONLY:
                    case this.AUDIO_VIDEO:
                        // when recording both audio and video, recordrtc
                        // calls this twice on chrome, first with audio data
                        // and then with video data.
                        // on firefox it's called once but with a single webm
                        // blob that includes both audio and video data.
                        if (recording.video !== undefined)
                        {
                            // show play control
                            this.player().controlBar.playToggle.show();

                            // store recorded data (video-only or firefox audio+video)
                            this.player().recordedData = recording.video;

                            // on the chrome browser two blobs are created
                            // containing the separate audio/video streams.
                            // the isChrome var comes from recordrtc.
                            if (this.getRecordType() === this.AUDIO_VIDEO && isChrome)
                            {
                                // store both audio and video
                                this.player().recordedData = recording;
                            }

                            // notify listeners that data is available
                            this.trigger('finishRecord');

                            // remove previous listeners
                            this.off(this.player(), 'pause', this.onPlayerPause);
                            this.off(this.player(), 'play', this.onPlayerStart);

                            // Pausing the player so we can visualize the recorded data
                            // will trigger an async videojs 'pause' event that we have
                            // to wait for.
                            this.player().one('pause', function()
                            {
                                // video data is ready
                                this._processing = false;

                                // hide loader
                                this.player().loadingSpinner.hide();

                                // show stream total duration
                                this.setDuration(this.streamDuration);

                                // update time during playback
                                this.on(this.player(), 'timeupdate', function()
                                {
                                    this.setCurrentTime(this.player().currentTime(),
                                        this.streamDuration);
                                }.bind(this));

                                // because there are 2 separate data streams for audio
                                // and video in the Chrome browser, playback the audio
                                // stream in a new extra audio element and the video
                                // stream in the regular video.js player.
                                if (this.getRecordType() === this.AUDIO_VIDEO && isChrome)
                                {
                                    if (this.extraAudio === undefined)
                                    {
                                        this.extraAudio = this.player().createEl('audio');
                                        this.extraAudio.id = 'extraAudio';
                                    }

                                    this.extraAudio.src = URL.createObjectURL(
                                        this.player().recordedData.audio);

                                    // pause extra audio when player pauses
                                    this.on(this.player(), 'pause', this.onPlayerPause);
                                }

                                // workaround some browser issues when player starts
                                this.on(this.player(), 'play', this.onPlayerStart);

                                // unmute local audio during playback
                                if (this.getRecordType() === this.AUDIO_VIDEO)
                                {
                                    this.mediaElement.muted = false;
                                }

                                // load recorded media
                                this.load(this.mediaURL);

                            }.bind(this));

                            // pause player so user can start playback
                            this.player().pause();
                        }
                        break;

                    case this.ANIMATION:
                        // show play control
                        this.player().controlBar.playToggle.show();

                        // store recorded data
                        this.player().recordedData = recording.gif;

                        // notify listeners that data is available
                        this.trigger('finishRecord');

                        // animation data is ready
                        this._processing = false;

                        // hide loader
                        this.player().loadingSpinner.hide();

                        // show animation total duration
                        this.setDuration(this.streamDuration);

                        // hide preview video
                        this.mediaElement.style.display = 'none';

                        // show the first frame
                        this.player().recordCanvas.show();

                        // pause player so user can start playback
                        this.player().pause();

                        // show animation on play
                        this.on(this.player(), 'play', this.showAnimation);

                        // hide animation on pause
                        this.on(this.player(), 'pause', this.hideAnimation);
                        break;
                }
            }.bind(this));
        },

        /**
         * Invoked during recording and displays the remaining time.
         */
        onCountDown: function()
        {
            var currentTime = (new Date().getTime() - this.startTime) / 1000;
            var duration = this.maxLength;

            this.streamDuration = currentTime;

            if (currentTime >= duration)
            {
                // at the end
                currentTime = duration;

                // stop recording
                this.stop();
            }

            // update duration
            this.setDuration(duration);

            // update current time
            this.setCurrentTime(currentTime, duration);
        },

        /**
         * Updates the player's element displaying the current time.
         *
         * @param {Number} currentTime (optional) Current position of the
         *    playhead (in seconds).
         * @param {Number} duration (optional) Duration in seconds.
         */
        setCurrentTime: function(currentTime, duration)
        {
            switch (this.getRecordType())
            {
                case this.AUDIO_ONLY:
                    this.surfer.setCurrentTime(currentTime, duration);
                    break;

                case this.VIDEO_ONLY:
                case this.AUDIO_VIDEO:
                case this.ANIMATION:
                    var time = Math.min(currentTime, duration);

                    // update control
                    this.player().controlBar.currentTimeDisplay.el(
                        ).firstChild.innerHTML = this.formatTime(
                        time, duration);
                    break;
            }
        },

        /**
         * Updates the player's element displaying the duration time.
         *
         * @param {Number} duration (optional) Duration in seconds.
         */
        setDuration: function(duration)
        {
            switch (this.getRecordType())
            {
                case this.AUDIO_ONLY:
                    this.surfer.setDuration(duration);
                    break;

                case this.VIDEO_ONLY:
                case this.AUDIO_VIDEO:
                case this.ANIMATION:
                    // update control
                    this.player().controlBar.durationDisplay.el(
                        ).firstChild.innerHTML = this.formatTime(
                        duration, duration);
                    break;
            }
        },

        /**
         * Start loading data.
         * 
         * @param {String|Blob|File} url Either the URL of the media file,
         *     or a Blob or File object.
         */
        load: function(url)
        {
            switch (this.getRecordType())
            {
                case this.AUDIO_ONLY:
                    // visualize recorded stream
                    this.surfer.load(url);
                    break;

                case this.IMAGE_ONLY:
                case this.VIDEO_ONLY:
                case this.AUDIO_VIDEO:
                case this.ANIMATION:
                    // assign stream to audio/video element src
                    this.mediaElement.src = url;
                    break;
            }
        },

        /**
         * Cleanup resources.
         */
        destroy: function()
        {
            // stop playback
            this._recording = false;
            this._processing = false;

            // stop countdown
            this.clearInterval(this.countDown);

            // dispose player
            switch (this.getRecordType())
            {
                case this.AUDIO_ONLY:
                    // also disposes player
                    this.surfer.destroy();
                    break;

                case this.IMAGE_ONLY:
                case this.VIDEO_ONLY:
                case this.AUDIO_VIDEO:
                case this.ANIMATION:
                    this.player().dispose();
                    break;
            }
        },

        /**
         * Get recorder type.
         */
        getRecordType: function()
        {
            if (this.recordImage)
            {
                return this.IMAGE_ONLY;
            }
            else if (this.recordAnimation)
            {
                return this.ANIMATION;
            }
            else if (this.recordAudio && !this.recordVideo)
            {
                return this.AUDIO_ONLY;
            }
            else if (this.recordAudio && this.recordVideo)
            {
                return this.AUDIO_VIDEO;
            }
            else if (!this.recordAudio && this.recordVideo)
            {
                return this.VIDEO_ONLY;
            }
        },

        /**
         * Create and display snapshot image.
         */
        createSnapshot: function()
        {
            var recordCanvas = this.captureFrame();

            // turn the canvas data into base-64 data with a PNG header
            this.player().recordedData = recordCanvas.toDataURL('image/png');

            // hide preview video
            this.mediaElement.style.display = 'none';

            // show the snapshot
            this.player().recordCanvas.show();

            // stop recording
            this.stop();
        },

        /**
         * Capture frame from camera and copy it to canvas.
         */
        captureFrame: function()
        {
            var recordCanvas = this.player().recordCanvas.el().firstChild;

            // set the canvas size to the dimensions of the camera,
            // which also wipes it
            recordCanvas.width = this.player().width();
            recordCanvas.height = this.player().height();

            // get a frame of the stream and copy it onto the canvas
            recordCanvas.getContext('2d').drawImage(
                this.mediaElement, 0, 0,
                recordCanvas.width,
                recordCanvas.height
            );

            return recordCanvas;
        },

        /**
         * 
         */
        startVideoPreview: function()
        {
            // disable playback events
            this.off('timeupdate');
            this.off('play');

            // mute local audio
            this.mediaElement.muted = true;

            // start/resume live preview
            this.load(URL.createObjectURL(this.stream));
            this.mediaElement.play();
        },

        /**
         * Show animated GIF.
         */
        showAnimation: function()
        {
            var animationDisplay = this.player().animationDisplay.el().firstChild;

            // set the image size to the dimensions of the recorded animation
            animationDisplay.width = this.player().width();
            animationDisplay.height = this.player().height();

            // hide the first frame
            this.player().recordCanvas.hide();

            // show the animation
            animationDisplay.src = this.mediaURL;
            this.player().animationDisplay.show();
        },

        /**
         * Hide animated GIF.
         */
        hideAnimation: function()
        {
            // show the first frame
            this.player().recordCanvas.show();

            // hide the animation
            this.player().animationDisplay.hide();
        },

        /**
         * Player started playback.
         */
        onPlayerStart: function()
        {
            // workaround firefox issue
            if (this.player().seeking())
            {
                // There seems to be a Firefox issue
                // with playing back blobs. The ugly,
                // but functional workaround, is to
                // simply reset the source. See
                // https://bugzilla.mozilla.org/show_bug.cgi?id=969290
                this.load(this.mediaURL);
                this.player().play();
            }

            // workaround chrome issue
            if (this.getRecordType() === this.AUDIO_VIDEO && isChrome &&
                !this._recording)
            {
                // sync extra audio playhead position with video.js player
                this.extraAudio.currentTime = this.player().currentTime();
                this.extraAudio.play();
            }
        },

        /**
         * Player is paused.
         */
        onPlayerPause: function()
        {
            // pause extra audio when video.js player pauses
            this.extraAudio.pause();
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
            // XXX: integrate method changes in video.js, see
            //      https://github.com/videojs/video.js/issues/1922
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

    var RecordToggle, CameraButton, DeviceButton, RecordIndicator, RecordCanvas,
        AnimationDisplay;

    /**
     * Button to toggle between start and stop recording
     * @param {videojs.Player|Object} player
     * @param {Object=} options
     * @class
     * @constructor
    */
    RecordToggle = videojs.Button.extend(
    {
        /** @constructor */
        init: function(player, options)
        {
            videojs.Button.call(this, player, options);

            this.on('click', this.onClick);
            this.on(player, 'startRecord', this.onStart);
            this.on(player, 'stopRecord', this.onStop);
        }
    });
    RecordToggle.prototype.onClick = function(e)
    {
        // stop this event before it bubbles up
        e.stopImmediatePropagation();

        var recorder = this.player().recorder;

        if (!recorder.isRecording())
        {
            recorder.start();
        }
        else
        {
            recorder.stop();
        }
    };
    RecordToggle.prototype.onStart = function()
    {
        // add the vjs-record-start class to the element so it can change appearance
        this.removeClass('vjs-record-stop');
        this.addClass('vjs-record-start');

        // update label
        this.el().firstChild.firstChild.innerHTML = this.localize('Stop');
    };
    RecordToggle.prototype.onStop = function()
    {
        // add the vjs-record-stop class to the element so it can change appearance
        this.removeClass('vjs-record-start');
        this.addClass('vjs-record-stop');

        // update label
        this.el().firstChild.firstChild.innerHTML = this.localize('Record');
    };

    /**
     * Button to toggle between create and retry snapshot image
     * @param {videojs.Player|Object} player
     * @param {Object=} options
     * @class
     * @constructor
    */
    CameraButton = videojs.Button.extend(
    {
        /** @constructor */
        init: function(player, options)
        {
            videojs.Button.call(this, player, options);

            this.on('click', this.onClick);
            this.on(player, 'startRecord', this.onStart);
            this.on(player, 'stopRecord', this.onStop);
        }
    });
    CameraButton.prototype.onClick = function(e)
    {
        // stop this event before it bubbles up
        e.stopImmediatePropagation();

        var recorder = this.player().recorder;

        if (!recorder.isProcessing())
        {
            // create snapshot
            recorder.start();
        }
        else
        {
            // retry
            recorder._processing = false;

            // retry: hide the snapshot
            this.player().recordCanvas.hide();

            // show preview video
            this.player().el().firstChild.style.display = 'block';

            // reset camera button
            this.onStop();
        }
    };
    CameraButton.prototype.onStart = function()
    {
        // add the vjs-record-start class to the element so it can change appearance
        this.removeClass('vjs-record-stop');
        this.addClass('vjs-record-start');

        // update label
        this.el().firstChild.firstChild.innerHTML = this.localize('Retry');
    };
    CameraButton.prototype.onStop = function()
    {
        // add the vjs-record-stop class to the element so it can change appearance
        this.removeClass('vjs-record-start');
        this.addClass('vjs-record-stop');

        // update label
        this.el().firstChild.firstChild.innerHTML = this.localize('Image');
    };

    /**
     * Button to select recording device
     * @param {videojs.Player|Object} player
     * @param {Object=} options
     * @class
     * @constructor
    */
    DeviceButton = videojs.Button.extend(
    {
        /** @constructor */
        init: function(player, options)
        {
            videojs.Button.call(this, player, options);

            this.on('click', this.onClick);
        }
    });
    DeviceButton.prototype.onClick = function(e)
    {
        // stop this event before it bubbles up
        e.stopImmediatePropagation();

        // open device dialog
        this.player().recorder.getDevice();
    };

    /**
     * Icon indicating recording is active.
     * @param {videojs.Player|Object} player
     * @param {Object=} options
     * @class
     * @constructor
    */
    RecordIndicator = videojs.Component.extend(
    {
        /** @constructor */
        init: function(player, options)
        {
            videojs.Component.call(this, player, options);

            this.on(player, 'startRecord', this.show);
            this.on(player, 'stopRecord', this.hide);
        }
    });
    RecordIndicator.prototype.disable = function()
    {
        // disable record indicator event handlers
        this.off(this.player(), 'startRecord', this.show);
        this.off(this.player(), 'stopRecord', this.hide);
    };

    /**
     * Canvas for displaying snapshot image.
     * @param {videojs.Player|Object} player
     * @param {Object=} options
     * @class
     * @constructor
    */
    RecordCanvas = videojs.Component.extend();

    /**
     * Image for displaying animated GIF image.
     * @param {videojs.Player|Object} player
     * @param {Object=} options
     * @class
     * @constructor
    */
    AnimationDisplay = videojs.Component.extend();

    /**
     * Create a custom button
     * @param className {string} class name for the new button
     * @param label {string} label for the new button
     */
    var createButton = function(className, label)
    {
        var props = {
            className: 'vjs-' + className + '-button vjs-control',
            innerHTML: '<div class="vjs-control-content"><span class="vjs-control-text">' +
                label + '</span></div>',
            role: 'button',
            'aria-live': 'polite', // let the screen reader user know that the text of the button may change
            tabIndex: 0
        };
        return videojs.Component.prototype.createEl(null, props);
    };

    var createPlugin = function()
    {
        var props = {
            className: 'vjs-record',
            tabIndex: 0
        };
        return videojs.Component.prototype.createEl(null, props);
    };

    // plugin defaults
    var defaults = {
        // Single snapshot image.
        image: false,
        // Include audio in the recorded clip.
        audio: false,
        // Include video in the recorded clip.
        video: false,
        // Animated GIF.
        animation: false,
        // Maximum length of the recorded clip.
        maxLength: 10,
        // The size of the audio buffer (in sample-frames) which needs to
        // be processed each time onprocessaudio is called.
        // From the spec: This value controls how frequently the audioprocess event is
        // dispatched and how many sample-frames need to be processed each call.
        // Lower values for buffer size will result in a lower (better) latency.
        // Higher values will be necessary to avoid audio breakup and glitches.
        // Legal values are (256, 512, 1024, 2048, 4096, 8192, 16384).
        audioBufferSize: 4096,
        // The audio sample rate (in sample-frames per second) at which the
        // AudioContext handles audio. It is assumed that all AudioNodes
        // in the context run at this rate. In making this assumption,
        // sample-rate converters or "varispeed" processors are not supported
        // in real-time processing.
        // The sampleRate parameter describes the sample-rate of the
        // linear PCM audio data in the buffer in sample-frames per second.
        // An implementation must support sample-rates in at least
        // the range 22050 to 96000.
        audioSampleRate: 22050,
        // Frame rate in frames per second.
        animationFrameRate: 200,
        // Sets quality of color quantization (conversion of images to the
        // maximum 256 colors allowed by the GIF specification).
        // Lower values (minimum = 1) produce better colors,
        // but slow processing significantly. 10 is the default,
        // and produces good color mapping at reasonable speeds.
        // Values greater than 20 do not yield significant improvements
        // in speed.
        animationQuality: 10,
        // Enables console logging for debugging purposes
        debug: false
    };

    /**
     * Initialize the plugin.
     * @param options (optional) {object} configuration for the plugin
     */
    var record = function(options)
    {
        var settings = videojs.util.mergeOptions(defaults, options);
        var player = this;

        // create recorder
        player.recorder = new videojs.Recorder(player,
        {
            'el': createPlugin(),
            'options': settings
        });
        player.el().appendChild(player.recorder.el());

        // add device button
        player.deviceButton = new DeviceButton(player,
        {
            'el': createButton('device', player.localize('Device'))
        });
        player.recorder.el().appendChild(player.deviceButton.el());

        // add record indicator
        player.recordIndicator = new RecordIndicator(player,
        {
            'el': videojs.Component.prototype.createEl(null, {
                className: 'vjs-record-indicator vjs-control'
            })
        });
        player.recordIndicator.hide();
        player.recorder.el().appendChild(player.recordIndicator.el());

        // add canvas for recording and displaying image
        player.recordCanvas = new RecordCanvas(player,
        {
            'el': videojs.Component.prototype.createEl(null, {
                className: 'vjs-record-canvas',
                innerHTML: '<canvas></canvas>'
            })
        });
        player.recordCanvas.hide();
        player.recorder.el().appendChild(player.recordCanvas.el());

        // add image for animation display
        player.animationDisplay = new AnimationDisplay(player,
        {
            'el': videojs.Component.prototype.createEl(null, {
                className: 'vjs-animation-display',
                innerHTML: '<img />'
            })
        });
        player.animationDisplay.hide();
        player.recorder.el().appendChild(player.animationDisplay.el());

        // add camera button
        player.cameraButton = new CameraButton(player,
        {
            'el': createButton('camera', player.localize('Image'))
        });
        player.cameraButton.hide();
        player.controlBar.el().insertBefore(player.cameraButton.el(),
            player.controlBar.el().firstChild);

        // add record toggle
        player.recordToggle = new RecordToggle(player,
        {
            'el': createButton('record', player.localize('Record'))
        });
        player.recordToggle.hide();
        player.controlBar.el().insertBefore(player.recordToggle.el(),
            player.controlBar.el().firstChild);
    };

    // register the plugin
    videojs.plugin('record', record);

})(window, window.videojs);
