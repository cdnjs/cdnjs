/**
 * @author       Jeremy Dowell <jeremy@codevinsky.com>
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2015 Photon Storm Ltd.
 * @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
 */

/**
 * Audio Sprites are a combination of audio files and a JSON configuration.
 * The JSON follows the format of that created by https://github.com/tonistiigi/audiosprite
 *
 * @class Phaser.AudioSprite
 * @constructor
 * @param {Phaser.Game} game - Reference to the current game instance.
 * @param {string} key - Asset key for the sound.
 */
Phaser.AudioSprite = function (game, key) {

    /**
    * A reference to the currently running Game.
    * @property {Phaser.Game} game
    */
    this.game = game;

    /**
     * Asset key for the Audio Sprite.
     * @property {string} key
     */
    this.key = key;

    /**
     * JSON audio atlas object.
     * @property {object} config
     */
    this.config = this.game.cache.getJSON(key + '-audioatlas');

    /**
     * If a sound is set to auto play, this holds the marker key of it.
     * @property {string} autoplayKey
     */
    this.autoplayKey = null;

    /**
     * Is a sound set to autoplay or not?
     * @property {boolean} autoplay
     * @default
     */
    this.autoplay = false;

    /**
     * An object containing the Phaser.Sound objects for the Audio Sprite.
     * @property {object} sounds
     */
    this.sounds = {};

    for (var k in this.config.spritemap)
    {
        var marker = this.config.spritemap[k];
        var sound = this.game.add.sound(this.key);
        
        sound.addMarker(k, marker.start, (marker.end - marker.start), null, marker.loop);
        
        this.sounds[k] = sound;
    }

    if (this.config.autoplay)
    {
        this.autoplayKey = this.config.autoplay;
        this.play(this.autoplayKey);
        this.autoplay = this.sounds[this.autoplayKey];
    }

};

Phaser.AudioSprite.prototype = {

    /**
     * Play a sound with the given name.
     * 
     * @method Phaser.AudioSprite#play
     * @param {string} [marker] - The name of sound to play
     * @param {number} [volume=1] - Volume of the sound you want to play. If none is given it will use the volume given to the Sound when it was created (which defaults to 1 if none was specified).
     * @return {Phaser.Sound} This sound instance.
     */
    play: function (marker, volume) {

        if (volume === undefined) { volume = 1; }

        return this.sounds[marker].play(marker, null, volume);

    },

    /**
     * Stop a sound with the given name.
     * 
     * @method Phaser.AudioSprite#stop
     * @param {string} [marker=''] - The name of sound to stop. If none is given it will stop all sounds in the audio sprite.
     */
    stop: function (marker) {

        if (!marker)
        {
            for (var key in this.sounds)
            {
                this.sounds[key].stop();
            }
        }
        else
        {
            this.sounds[marker].stop();
        }

    },

    /**
     * Get a sound with the given name.
     * 
     * @method Phaser.AudioSprite#get
     * @param {string} marker - The name of sound to get.
     * @return {Phaser.Sound} The sound instance.
     */
    get: function(marker) {

        return this.sounds[marker];

    }

};

Phaser.AudioSprite.prototype.constructor = Phaser.AudioSprite;

/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2015 Photon Storm Ltd.
* @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
*/

/**
* The Sound class constructor.
*
* @class Phaser.Sound
* @constructor
* @param {Phaser.Game} game - Reference to the current game instance.
* @param {string} key - Asset key for the sound.
* @param {number} [volume=1] - Default value for the volume, between 0 and 1.
* @param {boolean} [loop=false] - Whether or not the sound will loop.
*/
Phaser.Sound = function (game, key, volume, loop, connect) {

    if (volume === undefined) { volume = 1; }
    if (loop === undefined) { loop = false; }
    if (connect === undefined) { connect = game.sound.connectToMaster; }

    /**
    * A reference to the currently running Game.
    * @property {Phaser.Game} game
    */
    this.game = game;

    /**
    * @property {string} name - Name of the sound.
    */
    this.name = key;

    /**
    * @property {string} key - Asset key for the sound.
    */
    this.key = key;

    /**
    * @property {boolean} loop - Whether or not the sound or current sound marker will loop.
    */
    this.loop = loop;

    /**
    * @property {number} volume - The sound or sound marker volume. A value between 0 (silence) and 1 (full volume).
    */
    this.volume = volume;

    /**
    * @property {object} markers - The sound markers.
    */
    this.markers = {};

    /**
    * @property {AudioContext} context - Reference to the AudioContext instance.
    */
    this.context = null;

    /**
    * @property {boolean} autoplay - Boolean indicating whether the sound should start automatically.
    */
    this.autoplay = false;

    /**
    * @property {number} totalDuration - The total duration of the sound in seconds.
    */
    this.totalDuration = 0;

    /**
    * @property {number} startTime - The time the Sound starts at (typically 0 unless starting from a marker)
    * @default
    */
    this.startTime = 0;

    /**
    * @property {number} currentTime - The current time the sound is at.
    */
    this.currentTime = 0;

    /**
    * @property {number} duration - The duration of the current sound marker in seconds.
    */
    this.duration = 0;

    /**
    * @property {number} durationMS - The duration of the current sound marker in ms.
    */
    this.durationMS = 0;

    /**
    * @property {number} position - The position of the current sound marker.
    */
    this.position = 0;

    /**
    * @property {number} stopTime - The time the sound stopped.
    */
    this.stopTime = 0;

    /**
    * @property {boolean} paused - true if the sound is paused, otherwise false.
    * @default
    */
    this.paused = false;

    /**
    * @property {number} pausedPosition - The position the sound had reached when it was paused.
    */
    this.pausedPosition = 0;

    /**
    * @property {number} pausedTime - The game time at which the sound was paused.
    */
    this.pausedTime = 0;

    /**
    * @property {boolean} isPlaying - true if the sound is currently playing, otherwise false.
    * @default
    */
    this.isPlaying = false;

    /**
    * @property {string} currentMarker - The string ID of the currently playing marker, if any.
    * @default
    */
    this.currentMarker = '';

    /**
    * @property {Phaser.Tween} fadeTween - The tween that fades the audio, set via Sound.fadeIn and Sound.fadeOut.
    */
    this.fadeTween = null;

    /**
    * @property {boolean} pendingPlayback - true if the sound file is pending playback
    * @readonly
    */
    this.pendingPlayback = false;

    /**
    * @property {boolean} override - if true when you play this sound it will always start from the beginning.
    * @default
    */
    this.override = false;

    /**
    * @property {boolean} allowMultiple - This will allow you to have multiple instances of this Sound playing at once. This is only useful when running under Web Audio, and we recommend you implement a local pooling system to not flood the sound channels.
    * @default
    */
    this.allowMultiple = false;

    /**
    * @property {boolean} usingWebAudio - true if this sound is being played with Web Audio.
    * @readonly
    */
    this.usingWebAudio = this.game.sound.usingWebAudio;

    /**
    * @property {boolean} usingAudioTag - true if the sound is being played via the Audio tag.
    */
    this.usingAudioTag = this.game.sound.usingAudioTag;

    /**
    * @property {object} externalNode - If defined this Sound won't connect to the SoundManager master gain node, but will instead connect to externalNode.
    */
    this.externalNode = null;

    /**
    * @property {object} masterGainNode - The master gain node in a Web Audio system.
    */
    this.masterGainNode = null;

    /**
    * @property {object} gainNode - The gain node in a Web Audio system.
    */
    this.gainNode = null;

    /**
    * @property {object} _sound - Internal var.
    * @private
    */
    this._sound = null;

    if (this.usingWebAudio)
    {
        this.context = this.game.sound.context;
        this.masterGainNode = this.game.sound.masterGain;

        if (this.context.createGain === undefined)
        {
            this.gainNode = this.context.createGainNode();
        }
        else
        {
            this.gainNode = this.context.createGain();
        }

        this.gainNode.gain.value = volume * this.game.sound.volume;

        if (connect)
        {
            this.gainNode.connect(this.masterGainNode);
        }
    }
    else if (this.usingAudioTag)
    {
        if (this.game.cache.getSound(key) && this.game.cache.isSoundReady(key))
        {
            this._sound = this.game.cache.getSoundData(key);
            this.totalDuration = 0;

            if (this._sound.duration)
            {
                this.totalDuration = this._sound.duration;
            }
        }
        else
        {
            this.game.cache.onSoundUnlock.add(this.soundHasUnlocked, this);
        }
    }

    /**
    * @property {Phaser.Signal} onDecoded - The onDecoded event is dispatched when the sound has finished decoding (typically for mp3 files)
    */
    this.onDecoded = new Phaser.Signal();

    /**
    * @property {Phaser.Signal} onPlay - The onPlay event is dispatched each time this sound is played.
    */
    this.onPlay = new Phaser.Signal();

    /**
    * @property {Phaser.Signal} onPause - The onPause event is dispatched when this sound is paused.
    */
    this.onPause = new Phaser.Signal();

    /**
    * @property {Phaser.Signal} onResume - The onResume event is dispatched when this sound is resumed from a paused state.
    */
    this.onResume = new Phaser.Signal();

    /**
    * @property {Phaser.Signal} onLoop - The onLoop event is dispatched when this sound loops during playback.
    */
    this.onLoop = new Phaser.Signal();

    /**
    * @property {Phaser.Signal} onStop - The onStop event is dispatched when this sound stops playback.
    */
    this.onStop = new Phaser.Signal();

    /**
    * @property {Phaser.Signal} onMute - The onMouse event is dispatched when this sound is muted.
    */
    this.onMute = new Phaser.Signal();

    /**
    * @property {Phaser.Signal} onMarkerComplete - The onMarkerComplete event is dispatched when a marker within this sound completes playback.
    */
    this.onMarkerComplete = new Phaser.Signal();

    /**
    * @property {Phaser.Signal} onFadeComplete - The onFadeComplete event is dispatched when this sound finishes fading either in or out.
    */
    this.onFadeComplete = new Phaser.Signal();

    /**
    * @property {number} _volume - The global audio volume. A value between 0 (silence) and 1 (full volume).
    * @private
    */
    this._volume = volume;

    /**
    * @property {any} _buffer - Decoded data buffer / Audio tag.
    * @private
    */
    this._buffer = null;

    /**
    * @property {boolean} _muted - Boolean indicating whether the sound is muted or not.
    * @private
    */
    this._muted = false;

    /**
    * @property {number} _tempMarker - Internal marker var.
    * @private
    */
    this._tempMarker = 0;

    /**
    * @property {number} _tempPosition - Internal marker var.
    * @private
    */
    this._tempPosition = 0;

    /**
    * @property {number} _tempVolume - Internal marker var.
    * @private
    */
    this._tempVolume = 0;

    /**
    * @property {number} _muteVolume - Internal cache var.
    * @private
    */
    this._muteVolume = 0;

    /**
    * @property {boolean} _tempLoop - Internal cache var.
    * @private
    */
    this._tempLoop = 0;

    /**
    * @property {boolean} _paused - Was this sound paused via code or a game event?
    * @private
    */
    this._paused = false;

    /**
    * @property {boolean} _onDecodedEventDispatched - Was the onDecoded event dispatched?
    * @private
    */
    this._onDecodedEventDispatched = false;

};

Phaser.Sound.prototype = {

    /**
    * Called automatically when this sound is unlocked.
    * @method Phaser.Sound#soundHasUnlocked
    * @param {string} key - The Phaser.Cache key of the sound file to check for decoding.
    * @protected
    */
    soundHasUnlocked: function (key) {

        if (key === this.key)
        {
            this._sound = this.game.cache.getSoundData(this.key);
            this.totalDuration = this._sound.duration;
        }

    },

    /**
    * Adds a marker into the current Sound. A marker is represented by a unique key and a start time and duration.
    * This allows you to bundle multiple sounds together into a single audio file and use markers to jump between them for playback.
    *
    * @method Phaser.Sound#addMarker
    * @param {string} name - A unique name for this marker, i.e. 'explosion', 'gunshot', etc.
    * @param {number} start - The start point of this marker in the audio file, given in seconds. 2.5 = 2500ms, 0.5 = 500ms, etc.
    * @param {number} duration - The duration of the marker in seconds. 2.5 = 2500ms, 0.5 = 500ms, etc.
    * @param {number} [volume=1] - The volume the sound will play back at, between 0 (silent) and 1 (full volume).
    * @param {boolean} [loop=false] - Sets if the sound will loop or not.
    */
    addMarker: function (name, start, duration, volume, loop) {

        if (volume === undefined || volume === null) { volume = 1; }
        if (loop === undefined) { loop = false; }

        this.markers[name] = {
            name: name,
            start: start,
            stop: start + duration,
            volume: volume,
            duration: duration,
            durationMS: duration * 1000,
            loop: loop
        };

    },

    /**
    * Removes a marker from the sound.
    * @method Phaser.Sound#removeMarker
    * @param {string} name - The key of the marker to remove.
    */
    removeMarker: function (name) {

        delete this.markers[name];

    },

    /**
    * Called automatically by the AudioContext when the sound stops playing.
    * Doesn't get called if the sound is set to loop or is a section of an Audio Sprite.
    * 
    * @method Phaser.Sound#onEndedHandler
    * @protected
    */
    onEndedHandler: function () {

        this.isPlaying = false;
        this.stop();

    },

    /**
    * Called automatically by Phaser.SoundManager.
    * @method Phaser.Sound#update
    * @protected
    */
    update: function () {

        if (this.isDecoded && !this._onDecodedEventDispatched)
        {
            this.onDecoded.dispatch(this);
            this._onDecodedEventDispatched = true;
        }

        if (this.pendingPlayback && this.game.cache.isSoundReady(this.key))
        {
            this.pendingPlayback = false;
            this.play(this._tempMarker, this._tempPosition, this._tempVolume, this._tempLoop);
        }

        if (this.isPlaying)
        {
            this.currentTime = this.game.time.time - this.startTime;

            if (this.currentTime >= this.durationMS)
            {
                if (this.usingWebAudio)
                {
                    if (this.loop)
                    {
                        //  won't work with markers, needs to reset the position
                        this.onLoop.dispatch(this);

                        if (this.currentMarker === '')
                        {
                            this.currentTime = 0;
                            this.startTime = this.game.time.time;
                        }
                        else
                        {
                            this.onMarkerComplete.dispatch(this.currentMarker, this);
                            this.play(this.currentMarker, 0, this.volume, true, true);
                        }
                    }
                    else
                    {
                        //  Stop if we're using an audio marker, otherwise we let onended handle it
                        if (this.currentMarker !== '')
                        {
                            this.stop();
                        }
                    }
                }
                else
                {
                    if (this.loop)
                    {
                        this.onLoop.dispatch(this);
                        this.play(this.currentMarker, 0, this.volume, true, true);
                    }
                    else
                    {
                        this.stop();
                    }
                }
            }
        }
    },

    /**
     * Loops this entire sound. If you need to loop a section of it then use Sound.play and the marker and loop parameters.
     *
     * @method Phaser.Sound#loopFull
     * @param {number} [volume=1] - Volume of the sound you want to play. If none is given it will use the volume given to the Sound when it was created (which defaults to 1 if none was specified).
     * @return {Phaser.Sound} This sound instance.
     */
    loopFull: function (volume) {

        this.play(null, 0, volume, true);

    },

    /**
    * Play this sound, or a marked section of it.
    * 
    * @method Phaser.Sound#play
    * @param {string} [marker=''] - If you want to play a marker then give the key here, otherwise leave blank to play the full sound.
    * @param {number} [position=0] - The starting position to play the sound from - this is ignored if you provide a marker.
    * @param {number} [volume=1] - Volume of the sound you want to play. If none is given it will use the volume given to the Sound when it was created (which defaults to 1 if none was specified).
    * @param {boolean} [loop=false] - Loop when finished playing? If not using a marker / audio sprite the looping will be done via the WebAudio loop property, otherwise it's time based.
    * @param {boolean} [forceRestart=true] - If the sound is already playing you can set forceRestart to restart it from the beginning.
    * @return {Phaser.Sound} This sound instance.
    */
    play: function (marker, position, volume, loop, forceRestart) {

        if (marker === undefined || marker === false || marker === null) { marker = ''; }
        if (forceRestart === undefined) { forceRestart = true; }

        if (this.isPlaying && !this.allowMultiple && !forceRestart && !this.override)
        {
            //  Use Restart instead
            return this;
        }

        if (this._sound && this.isPlaying && !this.allowMultiple && (this.override || forceRestart))
        {
            if (this.usingWebAudio)
            {
                if (this.externalNode)
                {
                    this._sound.disconnect(this.externalNode);
                }
                else
                {
                    this._sound.disconnect(this.gainNode);
                }

                if (this._sound.stop === undefined)
                {
                    this._sound.noteOff(0);
                }
                else
                {
                    try {
                        this._sound.stop(0);
                    }
                    catch (e) {
                    }
                }
            }
            else if (this.usingAudioTag)
            {
                this._sound.pause();
                this._sound.currentTime = 0;
            }
        }

        if (marker === '' && Object.keys(this.markers).length > 0)
        {
            //  If they didn't specify a marker but this is an audio sprite, 
            //  we should never play the entire thing
            return this;
        }

        if (marker !== '')
        {
            this.currentMarker = marker;

            if (this.markers[marker])
            {
                //  Playing a marker? Then we default to the marker values
                this.position = this.markers[marker].start;
                this.volume = this.markers[marker].volume;
                this.loop = this.markers[marker].loop;
                this.duration = this.markers[marker].duration;
                this.durationMS = this.markers[marker].durationMS;

                if (typeof volume !== 'undefined')
                {
                    this.volume = volume;
                }

                if (typeof loop !== 'undefined')
                {
                    this.loop = loop;
                }

                this._tempMarker = marker;
                this._tempPosition = this.position;
                this._tempVolume = this.volume;
                this._tempLoop = this.loop;
            }
            else
            {
                // console.warn("Phaser.Sound.play: audio marker " + marker + " doesn't exist");
                return this;
            }
        }
        else
        {
            position = position || 0;

            if (volume === undefined) { volume = this._volume; }
            if (loop === undefined) { loop = this.loop; }

            this.position = position;
            this.volume = volume;
            this.loop = loop;
            this.duration = 0;
            this.durationMS = 0;

            this._tempMarker = marker;
            this._tempPosition = position;
            this._tempVolume = volume;
            this._tempLoop = loop;
        }

        if (this.usingWebAudio)
        {
            //  Does the sound need decoding?
            if (this.game.cache.isSoundDecoded(this.key))
            {
                this._sound = this.context.createBufferSource();

                if (this.externalNode)
                {
                    this._sound.connect(this.externalNode);
                }
                else
                {
                    this._sound.connect(this.gainNode);
                }

                this._buffer = this.game.cache.getSoundData(this.key);
                this._sound.buffer = this._buffer;

                if (this.loop && marker === '')
                {
                    this._sound.loop = true;
                }

                if (!this.loop && marker === '')
                {
                    this._sound.onended = this.onEndedHandler.bind(this);
                }

                this.totalDuration = this._sound.buffer.duration;

                if (this.duration === 0)
                {
                    this.duration = this.totalDuration;
                    this.durationMS = Math.ceil(this.totalDuration * 1000);
                }

                //  Useful to cache this somewhere perhaps?
                if (this._sound.start === undefined)
                {
                    this._sound.noteGrainOn(0, this.position, this.duration);
                }
                else
                {
                    if (this.loop && marker === '')
                    {
                        this._sound.start(0, 0);
                    }
                    else
                    {
                        this._sound.start(0, this.position, this.duration);
                    }
                }

                this.isPlaying = true;
                this.startTime = this.game.time.time;
                this.currentTime = 0;
                this.stopTime = this.startTime + this.durationMS;
                this.onPlay.dispatch(this);
            }
            else
            {
                this.pendingPlayback = true;

                if (this.game.cache.getSound(this.key) && this.game.cache.getSound(this.key).isDecoding === false)
                {
                    this.game.sound.decode(this.key, this);
                }
            }
        }
        else
        {
            if (this.game.cache.getSound(this.key) && this.game.cache.getSound(this.key).locked)
            {
                this.game.cache.reloadSound(this.key);
                this.pendingPlayback = true;
            }
            else
            {
                if (this._sound && (this.game.device.cocoonJS || this._sound.readyState === 4))
                {
                    this._sound.play();
                    //  This doesn't become available until you call play(), wonderful ...
                    this.totalDuration = this._sound.duration;

                    if (this.duration === 0)
                    {
                        this.duration = this.totalDuration;
                        this.durationMS = this.totalDuration * 1000;
                    }

                    this._sound.currentTime = this.position;
                    this._sound.muted = this._muted;

                    if (this._muted)
                    {
                        this._sound.volume = 0;
                    }
                    else
                    {
                        this._sound.volume = this._volume;
                    }

                    this.isPlaying = true;
                    this.startTime = this.game.time.time;
                    this.currentTime = 0;
                    this.stopTime = this.startTime + this.durationMS;
                    this.onPlay.dispatch(this);
                }
                else
                {
                    this.pendingPlayback = true;
                }
            }
        }

        return this;

    },

    /**
    * Restart the sound, or a marked section of it.
    *
    * @method Phaser.Sound#restart
    * @param {string} [marker=''] - If you want to play a marker then give the key here, otherwise leave blank to play the full sound.
    * @param {number} [position=0] - The starting position to play the sound from - this is ignored if you provide a marker.
    * @param {number} [volume=1] - Volume of the sound you want to play.
    * @param {boolean} [loop=false] - Loop when it finished playing?
    */
    restart: function (marker, position, volume, loop) {

        marker = marker || '';
        position = position || 0;
        volume = volume || 1;
        if (loop === undefined) { loop = false; }

        this.play(marker, position, volume, loop, true);

    },

    /**
    * Pauses the sound.
    *
    * @method Phaser.Sound#pause
    */
    pause: function () {

        if (this.isPlaying && this._sound)
        {
            this.paused = true;
            this.pausedPosition = this.currentTime;
            this.pausedTime = this.game.time.time;
            this.onPause.dispatch(this);
            this.stop();
        }

    },

    /**
    * Resumes the sound.
    *
    * @method Phaser.Sound#resume
    */
    resume: function () {

        if (this.paused && this._sound)
        {
            if (this.usingWebAudio)
            {
                var p = this.position + (this.pausedPosition / 1000);

                this._sound = this.context.createBufferSource();
                this._sound.buffer = this._buffer;

                if (this.externalNode)
                {
                    this._sound.connect(this.externalNode);
                }
                else
                {
                    this._sound.connect(this.gainNode);
                }

                if (this.loop)
                {
                    this._sound.loop = true;
                }

                if (!this.loop && this.currentMarker === '')
                {
                    this._sound.onended = this.onEndedHandler.bind(this);
                }

                var duration = this.duration - (this.pausedPosition / 1000);

                if (this._sound.start === undefined)
                {
                    this._sound.noteGrainOn(0, p, duration);
                    //this._sound.noteOn(0); // the zero is vitally important, crashes iOS6 without it
                }
                else
                {
                    if (this.loop && this.game.device.chrome)
                    {
                        //  Handle chrome bug: https://code.google.com/p/chromium/issues/detail?id=457099
                        if (this.game.device.chromeVersion === 42)
                        {
                            this._sound.start(0);
                        }
                        else
                        {
                            this._sound.start(0, p);
                        }
                    }
                    else
                    {
                        this._sound.start(0, p, duration);
                    }
                }
            }
            else
            {
                this._sound.play();
            }

            this.isPlaying = true;
            this.paused = false;
            this.startTime += (this.game.time.time - this.pausedTime);
            this.onResume.dispatch(this);
        }

    },

    /**
    * Stop playing this sound.
    *
    * @method Phaser.Sound#stop
    */
    stop: function () {

        if (this.isPlaying && this._sound)
        {
            if (this.usingWebAudio)
            {
                if (this.externalNode)
                {
                    this._sound.disconnect(this.externalNode);
                }
                else
                {
                    this._sound.disconnect(this.gainNode);
                }

                if (this._sound.stop === undefined)
                {
                    this._sound.noteOff(0);
                }
                else
                {
                    try {
                        this._sound.stop(0);
                    }
                    catch (e)
                    {
                        //  Thanks Android 4.4
                    }
                }
            }
            else if (this.usingAudioTag)
            {
                this._sound.pause();
                this._sound.currentTime = 0;
            }
        }

        this.pendingPlayback = false;
        this.isPlaying = false;
        var prevMarker = this.currentMarker;

        if (this.currentMarker !== '')
        {
            this.onMarkerComplete.dispatch(this.currentMarker, this);
        }

        this.currentMarker = '';

        if (this.fadeTween !== null)
        {
            this.fadeTween.stop();
        }

        if (!this.paused)
        {
            this.onStop.dispatch(this, prevMarker);
        }

    },

    /**
     * Starts this sound playing (or restarts it if already doing so) and sets the volume to zero.
     * Then increases the volume from 0 to 1 over the duration specified.
     *
     * At the end of the fade Sound.onFadeComplete is dispatched with this Sound object as the first parameter,
     * and the final volume (1) as the second parameter.
     *
     * @method Phaser.Sound#fadeIn
     * @param {number} [duration=1000] - The time in milliseconds over which the Sound should fade in.
     * @param {boolean} [loop=false] - Should the Sound be set to loop? Note that this doesn't cause the fade to repeat.
     * @param {string} [marker=(current marker)] - The marker to start at; defaults to the current (last played) marker. To start playing from the beginning specify specify a marker of `''`.
     */
    fadeIn: function (duration, loop, marker) {

        if (loop === undefined) { loop = false; }
        if (marker === undefined) { marker = this.currentMarker; }

        if (this.paused)
        {
            return;
        }

        this.play(marker, 0, 0, loop);

        this.fadeTo(duration, 1);

    },
    
    /**
     * Decreases the volume of this Sound from its current value to 0 over the duration specified.
     * At the end of the fade Sound.onFadeComplete is dispatched with this Sound object as the first parameter,
     * and the final volume (0) as the second parameter.
     *
     * @method Phaser.Sound#fadeOut
     * @param {number} [duration=1000] - The time in milliseconds over which the Sound should fade out.
     */
    fadeOut: function (duration) {

        this.fadeTo(duration, 0);

    },

    /**
     * Fades the volume of this Sound from its current value to the given volume over the duration specified.
     * At the end of the fade Sound.onFadeComplete is dispatched with this Sound object as the first parameter, 
     * and the final volume (volume) as the second parameter.
     *
     * @method Phaser.Sound#fadeTo
     * @param {number} [duration=1000] - The time in milliseconds during which the Sound should fade out.
     * @param {number} [volume] - The volume which the Sound should fade to. This is a value between 0 and 1.
     */
    fadeTo: function (duration, volume) {

        if (!this.isPlaying || this.paused || volume === this.volume)
        {
            return;
        }

        if (duration === undefined) { duration = 1000; }

        if (volume === undefined)
        {
            console.warn("Phaser.Sound.fadeTo: No Volume Specified.");
            return;
        }

        this.fadeTween = this.game.add.tween(this).to( { volume: volume }, duration, Phaser.Easing.Linear.None, true);

        this.fadeTween.onComplete.add(this.fadeComplete, this);

    },

    /**
     * Internal handler for Sound.fadeIn, Sound.fadeOut and Sound.fadeTo.
     *
     * @method Phaser.Sound#fadeComplete
     * @private
     */
    fadeComplete: function () {

        this.onFadeComplete.dispatch(this, this.volume);

        if (this.volume === 0)
        {
            this.stop();
        }

    },

    /**
    * Destroys this sound and all associated events and removes it from the SoundManager.
    *
    * @method Phaser.Sound#destroy
    * @param {boolean} [remove=true] - If true this Sound is automatically removed from the SoundManager.
    */
    destroy: function (remove) {

        if (remove === undefined) { remove = true; }

        this.stop();

        if (remove)
        {
            this.game.sound.remove(this);
        }
        else
        {
            this.markers = {};
            this.context = null;
            this._buffer = null;
            this.externalNode = null;

            this.onDecoded.dispose();
            this.onPlay.dispose();
            this.onPause.dispose();
            this.onResume.dispose();
            this.onLoop.dispose();
            this.onStop.dispose();
            this.onMute.dispose();
            this.onMarkerComplete.dispose();
        }

    }

};

Phaser.Sound.prototype.constructor = Phaser.Sound;

/**
* @name Phaser.Sound#isDecoding
* @property {boolean} isDecoding - Returns true if the sound file is still decoding.
* @readonly
*/
Object.defineProperty(Phaser.Sound.prototype, "isDecoding", {

    get: function () {
        return this.game.cache.getSound(this.key).isDecoding;
    }

});

/**
* @name Phaser.Sound#isDecoded
* @property {boolean} isDecoded - Returns true if the sound file has decoded.
* @readonly
*/
Object.defineProperty(Phaser.Sound.prototype, "isDecoded", {

    get: function () {
        return this.game.cache.isSoundDecoded(this.key);
    }

});

/**
* @name Phaser.Sound#mute
* @property {boolean} mute - Gets or sets the muted state of this sound.
*/
Object.defineProperty(Phaser.Sound.prototype, "mute", {

    get: function () {

        return (this._muted || this.game.sound.mute);

    },

    set: function (value) {

        value = value || false;

        if (value === this._muted)
        {
            return;
        }

        if (value)
        {
            this._muted = true;
            this._muteVolume = this._tempVolume;

            if (this.usingWebAudio)
            {
                this.gainNode.gain.value = 0;
            }
            else if (this.usingAudioTag && this._sound)
            {
                this._sound.volume = 0;
            }
        }
        else
        {
            this._muted = false;

            if (this.usingWebAudio)
            {
                this.gainNode.gain.value = this._muteVolume;
            }
            else if (this.usingAudioTag && this._sound)
            {
                this._sound.volume = this._muteVolume;
            }
        }

        this.onMute.dispatch(this);

    }

});

/**
* @name Phaser.Sound#volume
* @property {number} volume - Gets or sets the volume of this sound, a value between 0 and 1.
* @readonly
*/
Object.defineProperty(Phaser.Sound.prototype, "volume", {

    get: function () {
        return this._volume;
    },

    set: function (value) {

        //  Causes an Index size error in Firefox if you don't clamp the value
        if (this.game.device.firefox && this.usingAudioTag)
        {
            value = this.game.math.clamp(value, 0, 1);
        }

        if (this._muted)
        {
            this._muteVolume = value;
            return;
        }

        this._tempVolume = value;
        this._volume = value;

        if (this.usingWebAudio)
        {
            this.gainNode.gain.value = value;
        }
        else if (this.usingAudioTag && this._sound)
        {
            this._sound.volume = value;
        }
    }

});

/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2015 Photon Storm Ltd.
* @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
*/

/**
* The Sound Manager is responsible for playing back audio via either the Legacy HTML Audio tag or via Web Audio if the browser supports it.
* Note: On Firefox 25+ on Linux if you have media.gstreamer disabled in about:config then it cannot play back mp3 or m4a files.
* The audio file type and the encoding of those files are extremely important. Not all browsers can play all audio formats.
* There is a good guide to what's supported here: http://hpr.dogphilosophy.net/test/
*
* If you are reloading a Phaser Game on a page that never properly refreshes (such as in an AngularJS project) then you will quickly run out
* of AudioContext nodes. If this is the case create a global var called PhaserGlobal on the window object before creating the game. The active
* AudioContext will then be saved to window.PhaserGlobal.audioContext when the Phaser game is destroyed, and re-used when it starts again.
*
* Mobile warning: There are some mobile devices (certain iPad 2 and iPad Mini revisions) that cannot play 48000 Hz audio.
* When they try to play the audio becomes extremely distorted and buzzes, eventually crashing the sound system.
* The solution is to use a lower encoding rate such as 44100 Hz.
*
* @class Phaser.SoundManager
* @constructor
* @param {Phaser.Game} game - Reference to the current game instance.
*/
Phaser.SoundManager = function (game) {

    /**
    * @property {Phaser.Game} game - Local reference to game.
    */
    this.game = game;

    /**
    * @property {Phaser.Signal} onSoundDecode - The event dispatched when a sound decodes (typically only for mp3 files)
    */
    this.onSoundDecode = new Phaser.Signal();

    /**
    * This signal is dispatched whenever the global volume changes. The new volume is passed as the only parameter to your callback.
    * @property {Phaser.Signal} onVolumeChange
    */
    this.onVolumeChange = new Phaser.Signal();

    /**
    * This signal is dispatched when the SoundManager is globally muted, either directly via game code or as a result of the game pausing.
    * @property {Phaser.Signal} onMute
    */
    this.onMute = new Phaser.Signal();

    /**
    * This signal is dispatched when the SoundManager is globally un-muted, either directly via game code or as a result of the game resuming from a pause.
    * @property {Phaser.Signal} onUnMute
    */
    this.onUnMute = new Phaser.Signal();

    /**
    * @property {AudioContext} context - The AudioContext being used for playback.
    * @default
    */
    this.context = null;

    /**
    * @property {boolean} usingWebAudio - True the SoundManager and device are both using Web Audio.
    * @readonly
    */
    this.usingWebAudio = false;

    /**
    * @property {boolean} usingAudioTag - True the SoundManager and device are both using the Audio tag instead of Web Audio.
    * @readonly
    */
    this.usingAudioTag = false;

    /**
    * @property {boolean} noAudio - True if audio been disabled via the PhaserGlobal (useful if you need to use a 3rd party audio library) or the device doesn't support any audio.
    * @default
    */
    this.noAudio = false;

    /**
    * @property {boolean} connectToMaster - Used in conjunction with Sound.externalNode this allows you to stop a Sound node being connected to the SoundManager master gain node.
    * @default
    */
    this.connectToMaster = true;

    /**
    * @property {boolean} touchLocked - true if the audio system is currently locked awaiting a touch event.
    * @default
    */
    this.touchLocked = false;

    /**
    * @property {number} channels - The number of audio channels to use in playback.
    * @default
    */
    this.channels = 32;

    /**
    * @property {boolean} _codeMuted - Internal mute tracking var.
    * @private
    * @default
    */
    this._codeMuted = false;

    /**
    * @property {boolean} _muted - Internal mute tracking var.
    * @private
    * @default
    */
    this._muted = false;

    /**
    * @property {AudioContext} _unlockSource - Internal unlock tracking var.
    * @private
    * @default
    */
    this._unlockSource = null;

    /**
    * @property {number} _volume - The global audio volume. A value between 0 (silence) and 1 (full volume).
    * @private
    * @default
    */
    this._volume = 1;

    /**
    * @property {array} _sounds - An array containing all the sounds
    * @private
    */
    this._sounds = [];

    /**
    * @property {Phaser.ArraySet} _watchList - An array set containing all the sounds being monitored for decoding status.
    * @private
    */
    this._watchList = new Phaser.ArraySet();

    /**
    * @property {boolean} _watching - Is the SoundManager monitoring the watchList?
    * @private
    */
    this._watching = false;

    /**
    * @property {function} _watchCallback - The callback to invoke once the watchlist is clear.
    * @private
    */
    this._watchCallback = null;

    /**
    * @property {object} _watchContext - The context in which to call the watchlist callback.
    * @private
    */
    this._watchContext = null;

};

Phaser.SoundManager.prototype = {

    /**
    * Initialises the sound manager.
    * @method Phaser.SoundManager#boot
    * @protected
    */
    boot: function () {

        if (this.game.device.iOS && this.game.device.webAudio === false)
        {
            this.channels = 1;
        }

        //  PhaserGlobal overrides
        if (window['PhaserGlobal'])
        {
            //  Check to see if all audio playback is disabled (i.e. handled by a 3rd party class)
            if (window['PhaserGlobal'].disableAudio === true)
            {
                this.noAudio = true;
                this.touchLocked = false;
                return;
            }

            //  Check if the Web Audio API is disabled (for testing Audio Tag playback during development)
            if (window['PhaserGlobal'].disableWebAudio === true)
            {
                this.usingAudioTag = true;
                this.touchLocked = false;
                return;
            }
        }

        if (window['PhaserGlobal'] && window['PhaserGlobal'].audioContext)
        {
            this.context = window['PhaserGlobal'].audioContext;
        }
        else
        {
            if (!!window['AudioContext'])
            {
                try {
                    this.context = new window['AudioContext']();
                } catch (error) {
                    this.context = null;
                    this.usingWebAudio = false;
                    this.touchLocked = false;
                }
            }
            else if (!!window['webkitAudioContext'])
            {
                try {
                    this.context = new window['webkitAudioContext']();
                } catch (error) {
                    this.context = null;
                    this.usingWebAudio = false;
                    this.touchLocked = false;
                }
            }
        }

        if (this.context === null)
        {
            //  No Web Audio support - how about legacy Audio?
            if (window['Audio'] === undefined)
            {
                this.noAudio = true;
                return;
            }
            else
            {
                this.usingAudioTag = true;
            }
        }
        else
        {
            this.usingWebAudio = true;

            if (this.context.createGain === undefined)
            {
                this.masterGain = this.context.createGainNode();
            }
            else
            {
                this.masterGain = this.context.createGain();
            }

            this.masterGain.gain.value = 1;
            this.masterGain.connect(this.context.destination);
        }

        if (!this.noAudio)
        {
            //  On mobile we need a native touch event before we can play anything, so capture it here
            if (!this.game.device.cocoonJS && this.game.device.iOS || (window['PhaserGlobal'] && window['PhaserGlobal'].fakeiOSTouchLock))
            {
                this.setTouchLock();
            }
        }

    },

    /**
    * Sets the Input Manager touch callback to be SoundManager.unlock.
    * Required for iOS audio device unlocking. Mostly just used internally.
    * 
    * @method Phaser.SoundManager#setTouchLock
    */
    setTouchLock: function () {

        this.game.input.touch.addTouchLockCallback(this.unlock, this);
        this.touchLocked = true;

    },

    /**
    * Enables the audio, usually after the first touch.
    * 
    * @method Phaser.SoundManager#unlock
    * @return {boolean} True if the callback should be removed, otherwise false.
    */
    unlock: function () {

        if (this.noAudio || !this.touchLocked || this._unlockSource !== null)
        {
            return true;
        }

        //  Global override (mostly for Audio Tag testing)
        if (this.usingAudioTag)
        {
            this.touchLocked = false;
            this._unlockSource = null;
        }
        else if (this.usingWebAudio)
        {
            // Create empty buffer and play it
            // The SoundManager.update loop captures the state of it and then resets touchLocked to false

            var buffer = this.context.createBuffer(1, 1, 22050);
            this._unlockSource = this.context.createBufferSource();
            this._unlockSource.buffer = buffer;
            this._unlockSource.connect(this.context.destination);

            if (this._unlockSource.start === undefined)
            {
                this._unlockSource.noteOn(0);
            }
            else
            {
                this._unlockSource.start(0);
            }
        }

        //  We can remove the event because we've done what we needed (started the unlock sound playing)
        return true;

    },

    /**
    * Stops all the sounds in the game.
    *
    * @method Phaser.SoundManager#stopAll
    */
    stopAll: function () {

        if (this.noAudio)
        {
            return;
        }

        for (var i = 0; i < this._sounds.length; i++)
        {
            if (this._sounds[i])
            {
                this._sounds[i].stop();
            }
        }

    },

    /**
    * Pauses all the sounds in the game.
    *
    * @method Phaser.SoundManager#pauseAll
    */
    pauseAll: function () {

        if (this.noAudio)
        {
            return;
        }

        for (var i = 0; i < this._sounds.length; i++)
        {
            if (this._sounds[i])
            {
                this._sounds[i].pause();
            }
        }

    },

    /**
    * Resumes every sound in the game.
    *
    * @method Phaser.SoundManager#resumeAll
    */
    resumeAll: function () {

        if (this.noAudio)
        {
            return;
        }

        for (var i = 0; i < this._sounds.length; i++)
        {
            if (this._sounds[i])
            {
                this._sounds[i].resume();
            }
        }

    },

    /**
    * Decode a sound by its asset key.
    *
    * @method Phaser.SoundManager#decode
    * @param {string} key - Assets key of the sound to be decoded.
    * @param {Phaser.Sound} [sound] - Its buffer will be set to decoded data.
    */
    decode: function (key, sound) {

        sound = sound || null;

        var soundData = this.game.cache.getSoundData(key);

        if (soundData)
        {
            if (this.game.cache.isSoundDecoded(key) === false)
            {
                this.game.cache.updateSound(key, 'isDecoding', true);

                var _this = this;

                try {
                    this.context.decodeAudioData(soundData, function (buffer) {

                        if (buffer)
                        {
                            _this.game.cache.decodedSound(key, buffer);
                            _this.onSoundDecode.dispatch(key, sound);
                        }
                    });
                }
                catch (e) {}
            }
        }

    },

    /**
     * This method allows you to give the SoundManager a list of Sound files, or keys, and a callback.
     * Once all of the Sound files have finished decoding the callback will be invoked.
     * The amount of time spent decoding depends on the codec used and file size.
     * If all of the files given have already decoded the callback is triggered immediately.
     *
     * @method Phaser.SoundManager#setDecodedCallback
     * @param {string|array} files - An array containing either Phaser.Sound objects or their key strings as found in the Phaser.Cache.
     * @param {Function} callback - The callback which will be invoked once all files have finished decoding.
     * @param {Object} callbackContext - The context in which the callback will run.
     */
    setDecodedCallback: function (files, callback, callbackContext) {

        if (typeof files === 'string')
        {
            files = [ files ];
        }

        this._watchList.reset();

        for (var i = 0; i < files.length; i++)
        {
            if (files[i] instanceof Phaser.Sound)
            {
                if (!this.game.cache.isSoundDecoded(files[i].key))
                {
                    this._watchList.add(files[i].key);
                }
            }
            else if (!this.game.cache.isSoundDecoded(files[i]))
            {
                this._watchList.add(files[i]);
            }
        }

        //  All decoded already?
        if (this._watchList.total === 0)
        {
            this._watching = false;
            callback.call(callbackContext);
        }
        else
        {
            this._watching = true;
            this._watchCallback = callback;
            this._watchContext = callbackContext;
        }

    },

    /**
    * Updates every sound in the game, checks for audio unlock on mobile and monitors the decoding watch list.
    *
    * @method Phaser.SoundManager#update
    * @protected
    */
    update: function () {

        if (this.noAudio)
        {
            return;
        }

        if (this.touchLocked && this._unlockSource !== null && (this._unlockSource.playbackState === this._unlockSource.PLAYING_STATE || this._unlockSource.playbackState === this._unlockSource.FINISHED_STATE))
        {
            this.touchLocked = false;
            this._unlockSource = null;
        }

        for (var i = 0; i < this._sounds.length; i++)
        {
            this._sounds[i].update();
        }

        if (this._watching)
        {
            var key = this._watchList.first;

            while (key)
            {
                if (this.game.cache.isSoundDecoded(key))
                {
                    this._watchList.remove(key);
                }

                key = this._watchList.next;
            }

            if (this._watchList.total === 0)
            {
                this._watching = false;
                this._watchCallback.call(this._watchContext);
            }
        }

    },

    /**
    * Adds a new Sound into the SoundManager.
    *
    * @method Phaser.SoundManager#add
    * @param {string} key - Asset key for the sound.
    * @param {number} [volume=1] - Default value for the volume.
    * @param {boolean} [loop=false] - Whether or not the sound will loop.
    * @param {boolean} [connect=true] - Controls if the created Sound object will connect to the master gainNode of the SoundManager when running under WebAudio.
    * @return {Phaser.Sound} The new sound instance.
    */
    add: function (key, volume, loop, connect) {

        if (volume === undefined) { volume = 1; }
        if (loop === undefined) { loop = false; }
        if (connect === undefined) { connect = this.connectToMaster; }

        var sound = new Phaser.Sound(this.game, key, volume, loop, connect);

        this._sounds.push(sound);

        return sound;

    },

    /**
     * Adds a new AudioSprite into the SoundManager.
     *
     * @method Phaser.SoundManager#addSprite
     * @param {string} key - Asset key for the sound.
     * @return {Phaser.AudioSprite} The new AudioSprite instance.
     */
    addSprite: function(key) {

        var audioSprite = new Phaser.AudioSprite(this.game, key);

        return audioSprite;

    },

    /**
    * Removes a Sound from the SoundManager. The removed Sound is destroyed before removal.
    *
    * @method Phaser.SoundManager#remove
    * @param {Phaser.Sound} sound - The sound object to remove.
    * @return {boolean} True if the sound was removed successfully, otherwise false.
    */
    remove: function (sound) {

        var i = this._sounds.length;

        while (i--)
        {
            if (this._sounds[i] === sound)
            {
                this._sounds[i].destroy(false);
                this._sounds.splice(i, 1);
                return true;
            }
        }

        return false;

    },

    /**
    * Removes all Sounds from the SoundManager that have an asset key matching the given value.
    * The removed Sounds are destroyed before removal.
    *
    * @method Phaser.SoundManager#removeByKey
    * @param {string} key - The key to match when removing sound objects.
    * @return {number} The number of matching sound objects that were removed.
    */
    removeByKey: function (key) {

        var i = this._sounds.length;
        var removed = 0;

        while (i--)
        {
            if (this._sounds[i].key === key)
            {
                this._sounds[i].destroy(false);
                this._sounds.splice(i, 1);
                removed++;
            }
        }

        return removed;

    },

    /**
    * Adds a new Sound into the SoundManager and starts it playing.
    *
    * @method Phaser.SoundManager#play
    * @param {string} key - Asset key for the sound.
    * @param {number} [volume=1] - Default value for the volume.
    * @param {boolean} [loop=false] - Whether or not the sound will loop.
    * @return {Phaser.Sound} The new sound instance.
    */
    play: function (key, volume, loop) {

        if (this.noAudio)
        {
            return;
        }

        var sound = this.add(key, volume, loop);

        sound.play();

        return sound;

    },

    /**
    * Internal mute handler called automatically by the SoundManager.mute setter.
    *
    * @method Phaser.SoundManager#setMute
    * @private
    */
    setMute: function () {

        if (this._muted)
        {
            return;
        }

        this._muted = true;

        if (this.usingWebAudio)
        {
            this._muteVolume = this.masterGain.gain.value;
            this.masterGain.gain.value = 0;
        }

        //  Loop through sounds
        for (var i = 0; i < this._sounds.length; i++)
        {
            if (this._sounds[i].usingAudioTag)
            {
                this._sounds[i].mute = true;
            }
        }

        this.onMute.dispatch();

    },

    /**
    * Internal mute handler called automatically by the SoundManager.mute setter.
    *
    * @method Phaser.SoundManager#unsetMute
    * @private
    */
    unsetMute: function () {

        if (!this._muted || this._codeMuted)
        {
            return;
        }

        this._muted = false;

        if (this.usingWebAudio)
        {
            this.masterGain.gain.value = this._muteVolume;
        }

        //  Loop through sounds
        for (var i = 0; i < this._sounds.length; i++)
        {
            if (this._sounds[i].usingAudioTag)
            {
                this._sounds[i].mute = false;
            }
        }

        this.onUnMute.dispatch();

    },

    /**
    * Stops all the sounds in the game, then destroys them and finally clears up any callbacks.
    *
    * @method Phaser.SoundManager#destroy
    */
    destroy: function () {

        this.stopAll();

        for (var i = 0; i < this._sounds.length; i++)
        {
            if (this._sounds[i])
            {
                this._sounds[i].destroy();
            }
        }

        this._sounds = [];

        this.onSoundDecode.dispose();

        if (this.context && window['PhaserGlobal'])
        {
            //  Store this in the PhaserGlobal window var, if set, to allow for re-use if the game is created again without the page refreshing
            window['PhaserGlobal'].audioContext = this.context;
        }

    }

};

Phaser.SoundManager.prototype.constructor = Phaser.SoundManager;

/**
* @name Phaser.SoundManager#mute
* @property {boolean} mute - Gets or sets the muted state of the SoundManager. This effects all sounds in the game.
*/
Object.defineProperty(Phaser.SoundManager.prototype, "mute", {

    get: function () {

        return this._muted;

    },

    set: function (value) {

        value = value || false;

        if (value)
        {
            if (this._muted)
            {
                return;
            }

            this._codeMuted = true;
            this.setMute();
        }
        else
        {
            if (!this._muted)
            {
                return;
            }

            this._codeMuted = false;
            this.unsetMute();
        }
    }

});

/**
* @name Phaser.SoundManager#volume
* @property {number} volume - Gets or sets the global volume of the SoundManager, a value between 0 and 1. The value given is clamped to the range 0 to 1.
*/
Object.defineProperty(Phaser.SoundManager.prototype, "volume", {

    get: function () {

        return this._volume;

    },

    set: function (value) {

        if (value < 0)
        {
            value = 0;
        }
        else if (value > 1)
        {
            value = 1;
        }

        if (this._volume !== value)
        {
            this._volume = value;

            if (this.usingWebAudio)
            {
                this.masterGain.gain.value = value;
            }
            else
            {
                //  Loop through the sound cache and change the volume of all html audio tags
                for (var i = 0; i < this._sounds.length; i++)
                {
                    if (this._sounds[i].usingAudioTag)
                    {
                        this._sounds[i].volume = this._sounds[i].volume * value;
                    }
                }
            }

            this.onVolumeChange.dispatch(value);

        }

    }

});
