// Import cast framework
if (window.chrome && !window.chrome.cast) {
    var script = document.createElement('script');
    script.src = 'https://www.gstatic.com/cv/js/sender/v1/cast_sender.js?loadCastFramework=1';
    document.head.appendChild(script);
}

// Castjs
class Castjs {
    // constructor takes optional options
    constructor(opt = {}) {
        // valid join policies
        var joinpolicies = [
            'tab_and_origin_scoped',
            'origin_scoped',
            'page_scoped'
        ];

        // only allow valid join policy
        if (!opt.joinpolicy || joinpolicies.indexOf(opt.joinpolicy) === -1) {
            opt.joinpolicy = 'tab_and_origin_scoped';
        }

        // set default receiver ID if none provided
        if (!opt.receiver || opt.receiver === '') {
            opt.receiver = 'CC1AD845';
        }

        // private variables
        this._events     = {}
        this._player     = null;
        this._controller = null;

        // public variables
        this.version        = 'v5.3.0'
        this.receiver       = opt.receiver;
        this.joinpolicy     = opt.joinpolicy;
        this.available      = false;
        this.connected      = false;
        this.device         = 'Chromecast';
        this.src            = ''
        this.title          = ''
        this.description    = ''
        this.poster         = ''
        this.subtitles      = []
        this.volumeLevel    = 1;
        this.muted          = false;
        this.paused         = false;
        this.time           = 0;
        this.timePretty     = '00:00:00';
        this.duration       = 0;
        this.durationPretty = '00:00:00';
        this.progress       = 0;
        this.state          = 'disconnected';

        // initialize chromecast framework
        this._init()
    }
    _getBrowser() {
        if (navigator.userAgent.toLowerCase().indexOf('firefox') > -1){
            return "Firefox: Please enable casting, click here: https://googlechromecast.com/how-to-cast-firefox-to-tv/"
        }
        if (navigator.userAgent.toLowerCase().indexOf('opr/') > -1) {
            return "Opera: Please enable casting, click here: https://googlechromecast.com/how-to-cast-opera-browser-to-tv-using-google-chromecast/"
        }
        if (navigator.userAgent.toLowerCase().indexOf('iron safari') > -1) {
            return "Iron Safari: Please enable casting, click here: https://googlechromecast.com/how-to-cast-opera-browser-to-tv-using-google-chromecast/"
        }
        if (navigator.brave) {
            return "Brave: Please enable casting, click here: https://googlechromecast.com/how-to-cast-brave-browser-to-chromecast/"
        }
        return "This Browser"
    }
    _init(tries = 0) {
        // casting only works on chrome, opera, brave and vivaldi
        if (!window.chrome || !window.chrome.cast || !window.chrome.cast.isAvailable) {
            if (tries++ > 20) {
                return this.trigger('error', 'Casting is not enabled in ' + this._getBrowser());
            }
            return setTimeout(this._init.bind(this), 250, tries);
        }

        // terminate loop
        clearInterval(this.intervalIsAvailable);

        // initialize cast API
        cast.framework.CastContext.getInstance().setOptions({
            receiverApplicationId:      this.receiver,
            autoJoinPolicy:             this.joinpolicy,
            language:                   'en-US',
            resumeSavedSession:         true,
        });
        // create remote player controller
        this._player = new cast.framework.RemotePlayer();
        this._controller = new cast.framework.RemotePlayerController(this._player);

        // register callback events
        this._controller.addEventListener('isConnectedChanged',  this._isConnectedChanged.bind(this));
        this._controller.addEventListener('isMediaLoadedChanged',this._isMediaLoadedChanged.bind(this));
        this._controller.addEventListener('isMutedChanged',      this._isMutedChanged.bind(this));
        this._controller.addEventListener('isPausedChanged',     this._isPausedChanged.bind(this));
        this._controller.addEventListener('currentTimeChanged',  this._currentTimeChanged.bind(this));
        this._controller.addEventListener('durationChanged',     this._durationChanged.bind(this));
        this._controller.addEventListener('volumeLevelChanged',  this._volumeLevelChanged.bind(this));
        this._controller.addEventListener('playerStateChanged',  this._playerStateChanged.bind(this));
        this.available = true;
        this.trigger('available');
    }

    _isMediaLoadedChanged() {
        // don't update media info if not available
        if (!this._player.isMediaLoaded) {
            return
        }
        // there is a bug where mediaInfo is not directly available
        // so we are skipping one tick in the event loop, zzzzzzzzz
        setTimeout(() => {
            if (!this._player.mediaInfo) {
                return
            }
            // Update device name
            this.device = cast.framework.CastContext.getInstance().getCurrentSession().getCastDevice().friendlyName || this.device

            // Update media variables
            this.src                = this._player.mediaInfo.contentId;
            this.title              = this._player.title || null;
            this.description        = this._player.mediaInfo.metadata.subtitle || null;
            this.poster             = this._player.imageUrl || null;
            this.subtitles          = [];
            this.volumeLevel        = this.volumeLevel = Number((this._player.volumeLevel).toFixed(1));
            this.muted              = this._player.isMuted;
            this.paused             = this._player.isPaused;
            this.time               = Math.round(this._player.currentTime, 1);
            this.timePretty         = this._controller.getFormattedTime(this.time);
            this.duration           = this._player.duration;
            this.durationPretty     = this._controller.getFormattedTime(this._player.duration);
            this.progress           = this._controller.getSeekPosition(this.time, this._player.duration);
            this.state              = this._player.playerState.toLowerCase();

            // Loop over the subtitle tracks
            for (var i in this._player.mediaInfo.tracks) {
                // Check for subtitle
                if (this._player.mediaInfo.tracks[i].type === 'TEXT') {
                    // Push to media subtitles array
                    this.subtitles.push({
                        label: this._player.mediaInfo.tracks[i].name,
                        src:   this._player.mediaInfo.tracks[i].trackContentId
                    });
                }
            }
            // Get the active subtitle
            var active = cast.framework.CastContext.getInstance().getCurrentSession().getSessionObj().media[0].activeTrackIds;
            if (active && active.length && this.subtitles[active[0]]) {
                this.subtitles[active[0]].active = true;
            }
        })

    }
    // Player controller events
    _isConnectedChanged() {
        this.connected = this._player.isConnected;
        if (this.connected) {
            this.device = cast.framework.CastContext.getInstance().getCurrentSession().getCastDevice().friendlyName || this.device
        }
        this.state = !this.connected ? 'disconnected' : 'connected'
        this.trigger('statechange')
        this.trigger(!this.connected ? 'disconnect' : 'connect')
    }
    _currentTimeChanged() {
        var past            = this.time
        this.time           = Math.round(this._player.currentTime, 1);
        this.duration       = this._player.duration;
        this.progress       = this._controller.getSeekPosition(this.time, this.duration);
        this.timePretty     = this._controller.getFormattedTime(this.time);
        this.durationPretty = this._controller.getFormattedTime(this.duration);
        // Only trigger timeupdate if there is a difference
        if (past != this.time || this._player.isPaused) {
            this.trigger('timeupdate');
        }
    }
    _durationChanged() {
        this.duration = this._player.duration;
    }
    _volumeLevelChanged() {
        this.volumeLevel = Number((this._player.volumeLevel).toFixed(1));
        if (this._player.isMediaLoaded) {
            this.trigger('volumechange');
        }
    }
    _isMutedChanged() {
        var old = this.muted
        this.muted = this._player.isMuted;
        if (old != this.muted) {
            this.trigger(this.muted ? 'mute' : 'unmute');
        }
    }
    _isPausedChanged() {
        this.paused = this._player.isPaused;
        if (this.paused) {
            this.trigger('pause');
        }
    }
    _playerStateChanged() {
        this.connected = this._player.isConnected
        if (!this.connected) {
            return
        }
        this.device = cast.framework.CastContext.getInstance().getCurrentSession().getCastDevice().friendlyName || this.device
        this.state = this._player.playerState.toLowerCase();
        switch(this.state) {
            case 'idle':
                this.state = 'ended';
                this.trigger('statechange');
                this.trigger('end');
                return this
            case 'buffering':
                this.time           = Math.round(this._player.currentTime, 1);
                this.duration       = this._player.duration;
                this.progress       = this._controller.getSeekPosition(this.time, this.duration);
                this.timePretty     = this._controller.getFormattedTime(this.time);
                this.durationPretty = this._controller.getFormattedTime(this.duration);
                this.trigger('statechange');
                this.trigger('buffering');
                return this
            case 'playing':
                // we have to skip a tick to give mediaInfo some time to update
                setTimeout(() => {
                    this.trigger('statechange');
                    this.trigger('playing');
                })
                return this
        }
    }
    // Class functions
    on(event, cb) {
        // If event is not registered, create array to store callbacks
        if (!this._events[event]) {
            this._events[event] = [];
        }
        // Push callback into event array
        this._events[event].push(cb);

        // Immediately call the callback if the event is 'available' and this.available is true
        // https://github.com/castjs/castjs/issues/38
        if (event === 'available' && this.available === true) {
            setTimeout(() => cb(), 0); // Use setTimeout to ensure it's asynchronously executed
        }

        return this
    }
    off(event) {
        if (!event) {
            // if no event name was given, reset all events
            this._events = {};
        } else if (this._events[event]) {
            // remove all callbacks from event
            this._events[event] = [];
        }
        return this
    }
    trigger(event) {
        // Slice arguments into array
        var tail = Array.prototype.slice.call(arguments, 1);
        // If event exist, call callback with callback data
        for (var i in this._events[event]) {
            setTimeout(() => {
                this._events[event][i].apply(this, tail);
            }, 1)
            // this._events[event][i].apply(this, tail);
        }
        // dont call global event if error
        if (event === 'error') {
            return this
        }
        // call global event handler if exist
        for (var i in this._events['event']) {
            setTimeout(() => {
                this._events['event'][i].apply(this, [event]);
            }, 1)
            // this._events['event'][i].apply(this, [event]);
        }
        return this
    }
    cast(src, metadata = {}) {
        // We need a source! Don't forget to enable CORS
        if (!src) {
            return this.trigger('error', 'No media source specified.');
        }
        metadata.src = src;
        // Update media variables with user input
        for (var key in metadata) {
            if (metadata.hasOwnProperty(key)) {
                this[key] = metadata[key];
            }
        }
        // Use current session if available
        if (cast.framework.CastContext.getInstance().getCurrentSession()) {
            // Create media cast object
            var mediaInfo = new chrome.cast.media.MediaInfo(this.src);
            mediaInfo.metadata = new chrome.cast.media.GenericMediaMetadata();

            // This part is the reason why people love this library <3
            if (this.subtitles.length) {
                // I'm using the Netflix subtitle styling
                // chrome.cast.media.TextTrackFontGenericFamily.CASUAL
                // chrome.cast.media.TextTrackEdgeType.DROP_SHADOW
                mediaInfo.textTrackStyle = new chrome.cast.media.TextTrackStyle();
                mediaInfo.textTrackStyle.backgroundColor = '#00000000';
                mediaInfo.textTrackStyle.edgeColor       = '#00000016';
                mediaInfo.textTrackStyle.edgeType        = 'DROP_SHADOW';
                mediaInfo.textTrackStyle.fontFamily      = 'CASUAL';
                mediaInfo.textTrackStyle.fontScale       = 1.0;
                mediaInfo.textTrackStyle.foregroundColor = '#FFFFFF';

                // Overwrite default subtitle track style with user defined values
                // See https://developers.google.com/cast/docs/reference/chrome/chrome.cast.media.TextTrackStyle for a list of all configurable properties
                mediaInfo.textTrackStyle = {
                    ...mediaInfo.textTrackStyle, 
                    ...this.subtitleStyle
                };

                var tracks = [];
                for (var i in this.subtitles) {
                    // chrome.cast.media.TrackType.TEXT
                    // chrome.cast.media.TextTrackType.CAPTIONS
                    var track =  new chrome.cast.media.Track(i, 'TEXT');
                    track.name =             this.subtitles[i].label;
                    track.subtype =          'CAPTIONS';
                    track.trackContentId =   this.subtitles[i].src;
                    track.trackContentType = 'text/vtt';
                    // This bug made me question life for a while
                    track.trackId = parseInt(i);
                    tracks.push(track);
                }
                mediaInfo.tracks = tracks;
            }
            // Let's prepare the metadata
            mediaInfo.metadata.images =   [new chrome.cast.Image(this.poster)];
            mediaInfo.metadata.title =    this.title;
            mediaInfo.metadata.subtitle = this.description;
            // Prepare the actual request
            var request = new chrome.cast.media.LoadRequest(mediaInfo);
            // Didn't really test this currenttime thingy, dont forget
            request.currentTime = this.time;
            request.autoplay = !this.paused;
            // If multiple subtitles, use the active: true one
            if (this.subtitles.length) {
                for (var i in this.subtitles) {
                    if (this.subtitles[i].active) {
                        request.activeTrackIds = [parseInt(i)];
                        break;
                    }
                }
            }
            // Here we go!
            cast.framework.CastContext.getInstance().getCurrentSession().loadMedia(request).then(() => {
                // Update device name
                this.device = cast.framework.CastContext.getInstance().getCurrentSession().getCastDevice().friendlyName || this.device
                // Sometimes it stays paused if previous media ended, force play
                if (this.paused) {
                    this._controller.playOrPause();
                }
                return this;
            }, (err) => {
                return this.trigger('error', err);
            });
        } else {
            // Time to request a session!
            cast.framework.CastContext.getInstance().requestSession().then(() => {
                if (!cast.framework.CastContext.getInstance().getCurrentSession()) {
                    return this.trigger('error', 'Could not connect with the cast device');
                }
                // Create media cast object
                var mediaInfo = new chrome.cast.media.MediaInfo(this.src);
                mediaInfo.metadata = new chrome.cast.media.GenericMediaMetadata();

                // This part is the reason why people love this library <3
                if (this.subtitles.length) {
                    // I'm using the Netflix subtitle styling
                    // chrome.cast.media.TextTrackFontGenericFamily.CASUAL
                    // chrome.cast.media.TextTrackEdgeType.DROP_SHADOW
                    mediaInfo.textTrackStyle = new chrome.cast.media.TextTrackStyle();
                    mediaInfo.textTrackStyle.backgroundColor = '#00000000';
                    mediaInfo.textTrackStyle.edgeColor       = '#00000016';
                    mediaInfo.textTrackStyle.edgeType        = 'DROP_SHADOW';
                    mediaInfo.textTrackStyle.fontFamily      = 'CASUAL';
                    mediaInfo.textTrackStyle.fontScale       = 1.0;
                    mediaInfo.textTrackStyle.foregroundColor = '#FFFFFF';

                    // Overwrite default subtitle track style with user defined values
                    // See https://developers.google.com/cast/docs/reference/chrome/chrome.cast.media.TextTrackStyle for a list of all configurable properties
                    mediaInfo.textTrackStyle = {
                        ...mediaInfo.textTrackStyle, 
                        ...this.subtitleStyle
                    };

                    var tracks = [];
                    for (var i in this.subtitles) {
                        // chrome.cast.media.TrackType.TEXT
                        // chrome.cast.media.TextTrackType.CAPTIONS
                        var track =  new chrome.cast.media.Track(i, 'TEXT');
                        track.name =             this.subtitles[i].label;
                        track.subtype =          'CAPTIONS';
                        track.trackContentId =   this.subtitles[i].src;
                        track.trackContentType = 'text/vtt';
                        // This bug made me question life for a while
                        track.trackId = parseInt(i);
                        tracks.push(track);
                    }
                    mediaInfo.tracks = tracks;
                }
                // Let's prepare the metadata
                mediaInfo.metadata.images =   [new chrome.cast.Image(this.poster)];
                mediaInfo.metadata.title =    this.title;
                mediaInfo.metadata.subtitle = this.description;
                // Prepare the actual request
                var request = new chrome.cast.media.LoadRequest(mediaInfo);
                // Didn't really test this currenttime thingy, dont forget
                request.currentTime = this.time;
                request.autoplay = !this.paused;
                // If multiple subtitles, use the active: true one
                if (this.subtitles.length) {
                    for (var i in this.subtitles) {
                        if (this.subtitles[i].active) {
                            request.activeTrackIds = [parseInt(i)];
                            break;
                        }
                    }
                }
                // Here we go!
                cast.framework.CastContext.getInstance().getCurrentSession().loadMedia(request).then(() => {
                    // Update device name
                    this.device = cast.framework.CastContext.getInstance().getCurrentSession().getCastDevice().friendlyName || this.device
                    // Sometimes it stays paused if previous media ended, force play
                    if (this.paused) {
                        this._controller.playOrPause();
                    }
                    return this;
                }, (err) => {
                    return this.trigger('error', err);
                });
            }, (err) => {
                if (err !== 'cancel') {
                    this.trigger('error', err);
                }
                return this;
            });
        }
    }
    seek(seconds, isPercentage) {
        // if seek(15, true) we assume 15 is percentage instead of seconds
        if (isPercentage) {
            seconds = this._controller.getSeekTime(seconds, this._player.duration);
        }
        this._player.currentTime = seconds;
        this._controller.seek();
        return this;
    }
    volume(float) {
        this._player.volumeLevel = float;
        this._controller.setVolumeLevel();
        return this;
    }
    play() {
        if (this.paused) {
            this._controller.playOrPause();
        }
        return this;
    }
    pause() {
        if (!this.paused) {
            this._controller.playOrPause();
        }
        return this;
    }
    mute() {
        if (!this.muted) {
            this._controller.muteOrUnmute();
        }
        return this;
    }
    unmute() {
        if (this.muted) {
            this._controller.muteOrUnmute();
        }
        return this;
    }
    // subtitle allows you to change active subtitles while casting
    subtitle(index) {
        // this is my favorite part of castjs
        // prepare request to edit the tracks on current session
        var request = new chrome.cast.media.EditTracksInfoRequest([parseInt(index)]);
        cast.framework.CastContext.getInstance().getCurrentSession().getSessionObj().media[0].editTracksInfo(request, () => {
            // after updating the device we should update locally
            // loop trough subtitles
            for (var i in this.subtitles) {
                // remove active key from all subtitles
                delete this.subtitles[i].active;
                // if subtitle matches given index, we set to true
                if (i == index) {
                    this.subtitles[i].active = true;
                }
            }
            return this.trigger('subtitlechange')
        }, (err) => {
            // catch any error
            return this.trigger('error', err);
        });
    }
    // disconnect will end the current session
    disconnect() {
        cast.framework.CastContext.getInstance().endCurrentSession(true);
        this._controller.stop();

        // application variables
        this.connected  = false;
        this.device     = 'Chromecast';

        // media variables
        this.src         = ''
        this.title       = ''
        this.description = ''
        this.poster      = ''
        this.subtitles   = []

        // player variable
        this.volumeLevel    = 1;
        this.muted          = false;
        this.paused         = false;
        this.time           = 0;
        this.timePretty     = '00:00:00';
        this.duration       = 0;
        this.durationPretty = '00:00:00';
        this.progress       = 0;
        this.state          = 'disconnected';


        this.trigger('disconnect');
        return this;
    }
}

if (typeof module !== 'undefined'){
    module.exports = Castjs;
}
