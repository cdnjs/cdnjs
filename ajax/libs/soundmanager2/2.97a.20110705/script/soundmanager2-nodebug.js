/** @license
 * SoundManager 2: JavaScript Sound for the Web
 * ----------------------------------------------
 * http://schillmania.com/projects/soundmanager2/
 *
 * Copyright (c) 2007, Scott Schiller. All rights reserved.
 * Code provided under the BSD License:
 * http://schillmania.com/projects/soundmanager2/license.txt
 *
 * V2.97a.20110424+DEV
 */

/*jslint white: false, onevar: true, undef: true, nomen: false, eqeqeq: true, plusplus: false, bitwise: true, regexp: false, newcap: true, immed: true */
/*global window, SM2_DEFER, sm2Debugger, console, document, navigator, setTimeout, setInterval, clearInterval, Audio */

(function(window) {

var soundManager = null;

function SoundManager(smURL, smID) {

  this.flashVersion = 8;             // version of flash to require, either 8 or 9. Some API features require Flash 9.
  this.debugMode = false;             // enable debugging output (div#soundmanager-debug, OR console if available+configured)
  this.debugFlash = false;           // enable debugging output inside SWF, troubleshoot Flash/browser issues
  this.useConsole = true;            // use firebug/safari console.log()-type debug console if available
  this.consoleOnly = false;          // if console is being used, do not create/write to #soundmanager-debug
  this.waitForWindowLoad = false;    // force SM2 to wait for window.onload() before trying to call soundManager.onload()
  this.nullURL = 'about:blank';      // path to "null" (empty) MP3 file, used to unload sounds (Flash 8 only)
  this.allowPolling = true;          // allow flash to poll for status update (required for whileplaying() events, peak, sound spectrum functions to work.)
  this.useFastPolling = false;       // uses lower flash timer interval for higher callback frequency, best combined with useHighPerformance
  this.useMovieStar = true;          // enable support for Flash 9.0r115+ (codename "MovieStar") MPEG4 audio formats (AAC, M4V, FLV, MOV etc.)
  this.bgColor = '#ffffff';          // movie (.swf) background color, eg. '#000000'
  this.useHighPerformance = false;   // position:fixed flash movie can help increase js/flash speed, minimize lag
  this.flashPollingInterval = null;  // msec for polling interval. Defaults to 50 unless useFastPolling = true.
  this.flashLoadTimeout = 1000;      // msec to wait for flash movie to load before failing (0 = infinity)
  this.wmode = null;                 // string: flash rendering mode - null, transparent, opaque (last two allow layering of HTML on top)
  this.allowScriptAccess = 'always'; // for scripting the SWF (object/embed property), either 'always' or 'sameDomain'
  this.useFlashBlock = false;        // *requires flashblock.css, see demos* - allow recovery from flash blockers. Wait indefinitely and apply timeout CSS to SWF, if applicable.
  this.useHTML5Audio = false;        // Beta feature: Use HTML5 Audio() where API is supported (most Safari, Chrome versions), Firefox (no MP3/MP4.) Ideally, transparent vs. Flash API where possible.
  this.html5Test = /^probably$/i;    // HTML5 Audio().canPlayType() test. /^(probably|maybe)$/i if you want to be more liberal/risky.
  this.useGlobalHTML5Audio = true;   // (experimental) if true, re-use single HTML5 audio object across all sounds. Force-enabled on mobile devices/iOS.
  this.preferFlash = true;           // (experimental) if true and flash support present, will try to use flash for MP3/MP4 as needed since HTML5 audio support is still quirky in browsers.
  this.requireFlash = false;         // (experimental) if true, prevents "HTML5-only" mode when flash present. Allows flash to handle RTMP/serverURL, but HTML5 for other cases unless flash is preferred

  this.audioFormats = {
    // determines HTML5 support, flash requirements
    // eg. if MP3 or MP4 required, Flash fallback is used if HTML5 can't play it
    // shotgun approach to MIME testing due to browser variance
    'mp3': {
      'type': ['audio/mpeg; codecs="mp3"', 'audio/mpeg', 'audio/mp3', 'audio/MPA', 'audio/mpa-robust'],
      'required': true
    },
    'mp4': {
      'related': ['aac','m4a'], // additional formats under the MP4 container
      'type': ['audio/mp4; codecs="mp4a.40.2"', 'audio/aac', 'audio/x-m4a', 'audio/MP4A-LATM', 'audio/mpeg4-generic'],
      'required': true
    },
    'ogg': {
      'type': ['audio/ogg; codecs=vorbis'],
      'required': false
    },
    'wav': {
      'type': ['audio/wav; codecs="1"', 'audio/wav', 'audio/wave', 'audio/x-wav'],
      'required': false
    }
  };

  this.defaultOptions = {
    'autoLoad': false,             // enable automatic loading (otherwise .load() will be called on demand with .play(), the latter being nicer on bandwidth - if you want to .load yourself, you also can)
    'stream': true,                // allows playing before entire file has loaded (recommended)
    'autoPlay': false,             // enable playing of file as soon as possible (much faster if "stream" is true)
    'loops': 1,                    // how many times to repeat the sound (position will wrap around to 0, setPosition() will break out of loop when >0)
    'onid3': null,                 // callback function for "ID3 data is added/available"
    'onload': null,                // callback function for "load finished"
    'whileloading': null,          // callback function for "download progress update" (X of Y bytes received)
    'onplay': null,                // callback for "play" start
    'onpause': null,               // callback for "pause"
    'onresume': null,              // callback for "resume" (pause toggle)
    'whileplaying': null,          // callback during play (position update)
    'onstop': null,                // callback for "user stop"
    'onfailure': null,             // callback function for when playing fails
    'onfinish': null,              // callback function for "sound finished playing"
    'onbeforefinish': null,        // callback for "before sound finished playing (at [time])"
    'onbeforefinishtime': 5000,    // offset (milliseconds) before end of sound to trigger beforefinish (eg. 1000 msec = 1 second)
    'onbeforefinishcomplete': null,// function to call when said sound finishes playing
    'onjustbeforefinish': null,    // callback for [n] msec before end of current sound
    'onjustbeforefinishtime': 200, // [n] - if not using, set to 0 (or null handler) and event will not fire.
    'multiShot': true,             // let sounds "restart" or layer on top of each other when played multiple times, rather than one-shot/one at a time
    'multiShotEvents': false,      // fire multiple sound events (currently onfinish() only) when multiShot is enabled
    'position': null,              // offset (milliseconds) to seek to within loaded sound data.
    'pan': 0,                      // "pan" settings, left-to-right, -100 to 100
    'type': null,                  // MIME-like hint for file pattern / canPlay() tests, eg. audio/mp3
    'usePolicyFile': false,        // enable crossdomain.xml request for audio on remote domains (for ID3/waveform access)
    'volume': 100                  // self-explanatory. 0-100, the latter being the max.
  };

  this.flash9Options = {      // flash 9-only options, merged into defaultOptions if flash 9 is being used
    'isMovieStar': null,      // "MovieStar" MPEG4 audio mode. Null (default) = auto detect MP4, AAC etc. based on URL. true = force on, ignore URL
    'usePeakData': false,     // enable left/right channel peak (level) data
    'useWaveformData': false, // enable sound spectrum (raw waveform data) - WARNING: CPU-INTENSIVE: may set CPUs on fire.
    'useEQData': false,       // enable sound EQ (frequency spectrum data) - WARNING: Also CPU-intensive.
    'onbufferchange': null,   // callback for "isBuffering" property change
    'ondataerror': null       // callback for waveform/eq data access error (flash playing audio in other tabs/domains)
  };

  this.movieStarOptions = { // flash 9.0r115+ MPEG4 audio options, merged into defaultOptions if flash 9+movieStar mode is enabled
    'bufferTime': 3,        // seconds of data to buffer before playback begins (null = flash default of 0.1 seconds - if AAC playback is gappy, try increasing.)
    'serverURL': null,      // rtmp: FMS or FMIS server to connect to, required when requesting media via RTMP or one of its variants
    'onconnect': null,      // rtmp: callback for connection to flash media server
    'duration': null        // rtmp: song duration (msec)
  };

  this.version = null;
  this.versionNumber = 'V2.97a.20110705';
  this.movieURL = null;
  this.url = (smURL || null);
  this.altURL = null;
  this.swfLoaded = false;
  this.enabled = false;
  this.o = null;
  this.movieID = 'sm2-container';
  this.id = (smID || 'sm2movie');
  this.swfCSS = {
    'swfBox': 'sm2-object-box',
    'swfDefault': 'movieContainer',
    'swfError': 'swf_error', // SWF loaded, but SM2 couldn't start (other error)
    'swfTimedout': 'swf_timedout',
    'swfLoaded': 'swf_loaded',
    'swfUnblocked': 'swf_unblocked', // or loaded OK
    'sm2Debug': 'sm2_debug',
    'highPerf': 'high_performance',
    'flashDebug': 'flash_debug'
  };
  this.oMC = null;
  this.sounds = {};
  this.soundIDs = [];
  this.muted = false;
  this.debugID = 'soundmanager-debug';
  this.debugURLParam = /([#?&])debug=1/i;
  this.specialWmodeCase = false;
  this.didFlashBlock = false;

  this.filePattern = null;
  this.filePatterns = {
    'flash8': /\.mp3(\?.*)?$/i,
    'flash9': /\.mp3(\?.*)?$/i
  };

  this.baseMimeTypes = /^\s*audio\/(?:x-)?(?:mp(?:eg|3))\s*(?:$|;)/i; // mp3
  this.netStreamMimeTypes = /^\s*audio\/(?:x-)?(?:mp(?:eg|3))\s*(?:$|;)/i; // mp3, mp4, aac etc.
  this.netStreamTypes = ['aac', 'flv', 'mov', 'mp4', 'm4v', 'f4v', 'm4a', 'mp4v', '3gp', '3g2']; // Flash v9.0r115+ "moviestar" formats
  this.netStreamPattern = new RegExp('\\.(' + this.netStreamTypes.join('|') + ')(\\?.*)?$', 'i');
  this.mimePattern = this.baseMimeTypes;

  this.features = {
    'buffering': false,
    'peakData': false,
    'waveformData': false,
    'eqData': false,
    'movieStar': false
  };

  this.sandbox = {
    /*
    'type': null,
    'types': {
      'remote': 'remote (domain-based) rules',
      'localWithFile': 'local with file access (no internet access)',
      'localWithNetwork': 'local with network (internet access only, no local access)',
      'localTrusted': 'local, trusted (local+internet access)'
    },
    'description': null,
    'noRemote': null,
    'noLocal': null
    */
  };

  this.hasHTML5 = null; // switch for handling logic
  this.html5 = { // stores canPlayType() results, etc. treat as read-only.
    // mp3: boolean
    // mp4: boolean
    'usingFlash': null // set if/when flash fallback is needed
  };
  this.flash = { // format support
    // mp3: boolean
    // mp4: boolean
  };
  this.ignoreFlash = false; // used for special cases (eg. iPad/iPhone/palm OS?)

  // --- private SM2 internals ---

  var SMSound,
  _s = this, _sm = 'soundManager', _smc = _sm+'::', _h5 = 'HTML5::', _id, _ua = navigator.userAgent, _win = window, _wl = _win.location.href.toString(), _fV = this.flashVersion, _doc = document, _doNothing, _init, _on_queue = [], _debugOpen = true, _debugTS, _didAppend = false, _appendSuccess = false, _didInit = false, _disabled = false, _windowLoaded = false, _wDS, _wdCount = 0, _initComplete, _mixin, _addOnEvent, _processOnEvents, _initUserOnload, _go, _delayWaitForEI, _waitForEI, _setVersionInfo, _handleFocus, _beginInit, _strings, _initMovie, _dcLoaded, _didDCLoaded, _getDocument, _createMovie, _die, _setPolling, _debugLevels = ['log', 'info', 'warn', 'error'], _defaultFlashVersion = 8, _disableObject, _failSafely, _normalizeMovieURL, _oRemoved = null, _oRemovedHTML = null, _str, _flashBlockHandler, _getSWFCSS, _toggleDebug, _loopFix, _policyFix, _complain, _idCheck, _waitingForEI = false, _initPending = false, _smTimer, _onTimer, _startTimer, _stopTimer, _needsFlash = null, _featureCheck, _html5OK, _html5CanPlay, _html5Ext,  _dcIE, _testHTML5, _event, _slice = Array.prototype.slice, _useGlobalHTML5Audio = false, _hasFlash, _detectFlash, _badSafariFix,
  _is_pre = _ua.match(/pre\//i), _is_iDevice = _ua.match(/(ipad|iphone|ipod)/i), _isMobile = (_ua.match(/mobile/i) || _is_pre || _is_iDevice), _isIE = _ua.match(/msie/i), _isWebkit = _ua.match(/webkit/i), _isSafari = (_ua.match(/safari/i) && !_ua.match(/chrome/i)), _isOpera = (_ua.match(/opera/i)), 
  _isBadSafari = (!_wl.match(/usehtml5audio/i) && !_wl.match(/sm2\-ignorebadua/i) && _isSafari && _ua.match(/OS X 10_6_([3-7])/i)), // Safari 4 and 5 occasionally fail to load/play HTML5 audio on Snow Leopard 10.6.3 through 10.6.7 due to bug(s) in QuickTime X and/or other underlying frameworks. :/ Confirmed bug. https://bugs.webkit.org/show_bug.cgi?id=32159
  _hasConsole = (typeof console !== 'undefined' && typeof console.log !== 'undefined'), _isFocused = (typeof _doc.hasFocus !== 'undefined'?_doc.hasFocus():null), _tryInitOnFocus = (typeof _doc.hasFocus === 'undefined' && _isSafari), _okToDisable = !_tryInitOnFocus, _flashMIME = /(mp3|mp4|mpa)/i;

  this.html5Only = false; // determined at init time
  this._use_maybe = (_wl.match(/sm2\-useHTML5Maybe\=1/i)); // temporary feature: #sm2-useHTML5Maybe=1 forces loose canPlay() check
  this._overHTTP = (_doc.location?_doc.location.protocol.match(/http/i):null);
  this._http = (!this._overHTTP ? 'http:' : '');
  this.useAltURL = !this._overHTTP; // use altURL if not "online"
  this._global_a = null;

  if (_is_iDevice || _is_pre) {
    // during HTML5 beta period (off by default), may as well force it on Apple + Palm, flash support unlikely
    _s.useHTML5Audio = true;
    _s.ignoreFlash = true;
    // by default, use global feature. iOS onfinish() -> next may fail otherwise.
    _s.useGlobalHTML5Audio = true;
    _useGlobalHTML5Audio = true;
  }

  if (_is_pre || this._use_maybe) {
    // less-strict canPlayType() checking option
    _s.html5Test = /^(probably|maybe)$/i;
  }

  // Temporary feature: allow force of HTML5 via URL: #sm2-usehtml5audio=0 or 1
  /*
  (function(){
    var a = '#sm2-usehtml5audio=', l = _wl, b = null;
    if (l.indexOf(a) !== -1) {
      b = (l.charAt(l.indexOf(a)+a.length) === '1');
      if (typeof console !== 'undefined' && typeof console.log !== 'undefined') {
        console.log((b?'Enabling ':'Disabling ')+'useHTML5Audio via URL parameter');
      }
      _s.useHTML5Audio = b;
    }
  }());
  */

  // --- public API methods ---

  this.ok = function() {
    return (_needsFlash?(_didInit && !_disabled):(_s.useHTML5Audio && _s.hasHTML5));
  };

  this.supported = this.ok; // legacy

  this.getMovie = function(smID) {
    return _isIE?_win[smID]:(_isSafari?_id(smID) || _doc[smID]:_id(smID));
  };

  this.createSound = function(oOptions) {
    var _cs = _sm+'.createSound(): ',
    thisOptions = null, oSound = null, _tO = null;
    if (!_didInit || !_s.ok()) {
      _complain(_cs + _str(!_didInit?'notReady':'notOK'));
      return false;
    }
    if (arguments.length === 2) {
      // function overloading in JS! :) ..assume simple createSound(id,url) use case
      oOptions = {
        'id': arguments[0],
        'url': arguments[1]
      };
    }
    thisOptions = _mixin(oOptions); // inherit from defaultOptions
    _tO = thisOptions; // alias
    /*
    if (_tO.id.toString().charAt(0).match(/^[0-9]$/)) {
      //_s._wD(_cs + _str('badID', _tO.id), 2);
    }
    //_s._wD(_cs + _tO.id + ' (' + _tO.url + ')', 1);
    */
    if (_idCheck(_tO.id, true)) {
      //_s._wD(_cs + _tO.id + ' exists', 1);
      return _s.sounds[_tO.id];
    }

    function make() {
      thisOptions = _loopFix(thisOptions);
      _s.sounds[_tO.id] = new SMSound(_tO);
      _s.soundIDs.push(_tO.id);
      return _s.sounds[_tO.id];
    }

    if (_html5OK(_tO)) {
      oSound = make();
      //_s._wD('Loading sound '+_tO.id+' via HTML5');
      oSound._setup_html5(_tO);
    } else {
      if (_fV > 8 && _s.useMovieStar) {
        if (_tO.isMovieStar === null) {
          _tO.isMovieStar = ((_tO.serverURL || (_tO.type?_tO.type.match(_s.netStreamPattern):false)||_tO.url.match(_s.netStreamPattern))?true:false);
        }
        if (_tO.isMovieStar) {
          //_s._wD(_cs + 'using MovieStar handling');
        }
        if (_tO.isMovieStar) {
          if (_tO.usePeakData) {
            //_wDS('noPeak');
            _tO.usePeakData = false;
          }
          if (_tO.loops > 1) {
            //_wDS('noNSLoop');
          }
        }
      }
      _tO = _policyFix(_tO, _cs);
      oSound = make();
      if (_fV === 8) {
        _s.o._createSound(_tO.id, _tO.onjustbeforefinishtime, _tO.loops||1, _tO.usePolicyFile);
      } else {
        _s.o._createSound(_tO.id, _tO.url, _tO.onjustbeforefinishtime, _tO.usePeakData, _tO.useWaveformData, _tO.useEQData, _tO.isMovieStar, (_tO.isMovieStar?_tO.bufferTime:false), _tO.loops||1, _tO.serverURL, _tO.duration||null, _tO.autoPlay, true, _tO.autoLoad, _tO.usePolicyFile);
        if (!_tO.serverURL) {
          // We are connected immediately
          oSound.connected = true;
          if (_tO.onconnect) {
            _tO.onconnect.apply(oSound);
          }
        }
      }

      if ((_tO.autoLoad || _tO.autoPlay) && !_tO.serverURL) {
        oSound.load(_tO); // call load for non-rtmp streams
      }
    }

    if (_tO.autoPlay && !_tO.serverURL) { // rtmp will play in onconnect
      oSound.play();
    }
    return oSound;
  };

  this.destroySound = function(sID, _bFromSound) {
    // explicitly destroy a sound before normal page unload, etc.
    if (!_idCheck(sID)) {
      return false;
    }
    var oS = _s.sounds[sID], i;
    oS._iO = {}; // Disable all callbacks while the sound is being destroyed
    oS.stop();
    oS.unload();
    for (i = 0; i < _s.soundIDs.length; i++) {
      if (_s.soundIDs[i] === sID) {
        _s.soundIDs.splice(i, 1);
        break;
      }
    }
    if (!_bFromSound) {
      // ignore if being called from SMSound instance
      oS.destruct(true);
    }
    oS = null;
    delete _s.sounds[sID];
    return true;
  };

  this.load = function(sID, oOptions) {
    if (!_idCheck(sID)) {
      return false;
    }
    return _s.sounds[sID].load(oOptions);
  };

  this.unload = function(sID) {
    if (!_idCheck(sID)) {
      return false;
    }
    return _s.sounds[sID].unload();
  };

  this.play = function(sID, oOptions) {
    var fN = _sm+'.play(): ';
    if (!_didInit || !_s.ok()) {
      _complain(fN + _str(!_didInit?'notReady':'notOK'));
      return false;
    }
    if (!_idCheck(sID)) {
      if (!(oOptions instanceof Object)) {
        oOptions = {
          url: oOptions
        }; // overloading use case: play('mySound','/path/to/some.mp3');
      }
      if (oOptions && oOptions.url) {
        // overloading use case, create+play: .play('someID',{url:'/path/to.mp3'});
        //_s._wD(fN + 'attempting to create "' + sID + '"', 1);
        oOptions.id = sID;
        return _s.createSound(oOptions).play();
      } else {
        return false;
      }
    }
    return _s.sounds[sID].play(oOptions);
  };

  this.start = this.play; // just for convenience

  this.setPosition = function(sID, nMsecOffset) {
    if (!_idCheck(sID)) {
      return false;
    }
    return _s.sounds[sID].setPosition(nMsecOffset);
  };

  this.stop = function(sID) {
    if (!_idCheck(sID)) {
      return false;
    }
    //_s._wD(_sm+'.stop(' + sID + ')', 1);
    return _s.sounds[sID].stop();
  };

  this.stopAll = function() {
    //_s._wD(_sm+'.stopAll()', 1);
    for (var oSound in _s.sounds) {
      if (_s.sounds[oSound] instanceof SMSound) {
        _s.sounds[oSound].stop(); // apply only to sound objects
      }
    }
  };

  this.pause = function(sID) {
    if (!_idCheck(sID)) {
      return false;
    }
    return _s.sounds[sID].pause();
  };

  this.pauseAll = function() {
    for (var i = _s.soundIDs.length; i--;) {
      _s.sounds[_s.soundIDs[i]].pause();
    }
  };

  this.resume = function(sID) {
    if (!_idCheck(sID)) {
      return false;
    }
    return _s.sounds[sID].resume();
  };

  this.resumeAll = function() {
    for (var i = _s.soundIDs.length; i--;) {
      _s.sounds[_s.soundIDs[i]].resume();
    }
  };

  this.togglePause = function(sID) {
    if (!_idCheck(sID)) {
      return false;
    }
    return _s.sounds[sID].togglePause();
  };

  this.setPan = function(sID, nPan) {
    if (!_idCheck(sID)) {
      return false;
    }
    return _s.sounds[sID].setPan(nPan);
  };

  this.setVolume = function(sID, nVol) {
    if (!_idCheck(sID)) {
      return false;
    }
    return _s.sounds[sID].setVolume(nVol);
  };

  this.mute = function(sID) {
    var fN = _sm+'.mute(): ',
    i = 0;
    if (typeof sID !== 'string') {
      sID = null;
    }
    if (!sID) {
      //_s._wD(fN + 'Muting all sounds');
      for (i = _s.soundIDs.length; i--;) {
        _s.sounds[_s.soundIDs[i]].mute();
      }
      _s.muted = true;
    } else {
      if (!_idCheck(sID)) {
        return false;
      }
      //_s._wD(fN + 'Muting "' + sID + '"');
      return _s.sounds[sID].mute();
    }
    return true;
  };

  this.muteAll = function() {
    _s.mute();
  };

  this.unmute = function(sID) {
    var fN = _sm+'.unmute(): ', i;
    if (typeof sID !== 'string') {
      sID = null;
    }
    if (!sID) {
      //_s._wD(fN + 'Unmuting all sounds');
      for (i = _s.soundIDs.length; i--;) {
        _s.sounds[_s.soundIDs[i]].unmute();
      }
      _s.muted = false;
    } else {
      if (!_idCheck(sID)) {
        return false;
      }
      //_s._wD(fN + 'Unmuting "' + sID + '"');
      return _s.sounds[sID].unmute();
    }
    return true;
  };

  this.unmuteAll = function() {
    _s.unmute();
  };

  this.toggleMute = function(sID) {
    if (!_idCheck(sID)) {
      return false;
    }
    return _s.sounds[sID].toggleMute();
  };

  this.getMemoryUse = function() {
    if (_fV === 8) {
      return 0;
    }
    if (_s.o) {
      return parseInt(_s.o._getMemoryUse(), 10);
    }
  };

  this.disable = function(bNoDisable) {
    // destroy all functions
    if (typeof bNoDisable === 'undefined') {
      bNoDisable = false;
    }
    if (_disabled) {
      return false;
    }
    _disabled = true;
    //_wDS('shutdown', 1);
    for (var i = _s.soundIDs.length; i--;) {
      _disableObject(_s.sounds[_s.soundIDs[i]]);
    }
    _initComplete(bNoDisable); // fire "complete", despite fail
    _event.remove(_win, 'load', _initUserOnload);
    return true;
  };

  this.canPlayMIME = function(sMIME) {
    var result;
    if (_s.hasHTML5) {
      result = _html5CanPlay({type:sMIME});
    }
    if (!_needsFlash || result) {
      // no flash, or OK
      return result;
    } else {
      return (sMIME?(sMIME.match(_s.mimePattern)?true:false):null);
    }
  };

  this.canPlayURL = function(sURL) {
    var result;
    if (_s.hasHTML5) {
      result = _html5CanPlay({url: sURL});
    }
    if (!_needsFlash || result) {
      // no flash, or OK
      return result;
    } else {
      return (sURL?(sURL.match(_s.filePattern)?true:false):null);
    }
  };

  this.canPlayLink = function(oLink) {
    if (typeof oLink.type !== 'undefined' && oLink.type) {
      if (_s.canPlayMIME(oLink.type)) {
        return true;
      }
    }
    return _s.canPlayURL(oLink.href);
  };

  this.getSoundById = function(sID, suppressDebug) {
    if (!sID) {
      throw new Error(_sm+'.getSoundById(): sID is null/undefined');
    }
    var result = _s.sounds[sID];
    if (!result && !suppressDebug) {
      //_s._wD('"' + sID + '" is an invalid sound ID.', 2);
    }
    return result;
  };

  this.onready = function(oMethod, oScope) {
    var sType = 'onready';
    if (oMethod && oMethod instanceof Function) {
      if (_didInit) {
        //_s._wD(_str('queue', sType));
      }
      if (!oScope) {
        oScope = _win;
      }
      _addOnEvent(sType, oMethod, oScope);
      _processOnEvents();
      return true;
    } else {
      throw _str('needFunction', sType);
    }
  };

  this.ontimeout = function(oMethod, oScope) {
    var sType = 'ontimeout';
    if (oMethod && oMethod instanceof Function) {
      if (_didInit) {
        //_s._wD(_str('queue', sType));
      }
      if (!oScope) {
        oScope = _win;
      }
      _addOnEvent(sType, oMethod, oScope);
      _processOnEvents({type:sType});
      return true;
    } else {
      throw _str('needFunction', sType);
    }
  };

  this.getMoviePercent = function() {
    return (_s.o && typeof _s.o.PercentLoaded !== 'undefined'?_s.o.PercentLoaded():null);
  };

  this._writeDebug = function(sText, sType, bTimestamp) {
    // pseudo-private console.log()-style output
    /*
    var sDID = 'soundmanager-debug', o, oItem, sMethod;
    if (!_s.debugMode) {
      return false;
    }
    if (typeof bTimestamp !== 'undefined' && bTimestamp) {
      sText = sText + ' | ' + new Date().getTime();
    }
    if (_hasConsole && _s.useConsole) {
      sMethod = _debugLevels[sType];
      if (typeof console[sMethod] !== 'undefined') {
        console[sMethod](sText);
      } else {
        console.log(sText);
      }
      if (_s.useConsoleOnly) {
        return true;
      }
    }
    try {
      o = _id(sDID);
      if (!o) {
        return false;
      }
      oItem = _doc.createElement('div');
      if (++_wdCount % 2 === 0) {
        oItem.className = 'sm2-alt';
      }
      if (typeof sType === 'undefined') {
        sType = 0;
      } else {
        sType = parseInt(sType, 10);
      }
      oItem.appendChild(_doc.createTextNode(sText));
      if (sType) {
        if (sType >= 2) {
          oItem.style.fontWeight = 'bold';
        }
        if (sType === 3) {
          oItem.style.color = '#ff3333';
        }
      }
      // o.appendChild(oItem); // top-to-bottom
      o.insertBefore(oItem, o.firstChild); // bottom-to-top
    } catch(e) {
      // oh well
    }
    o = null;
    */
    return true;
  };
  this._wD = this._writeDebug; // alias

  this._debug = function() {
    /*
    //_wDS('currentObj', 1);
    for (var i = 0, j = _s.soundIDs.length; i < j; i++) {
      _s.sounds[_s.soundIDs[i]]._debug();
    }
    */
  };

  this.reboot = function() {
    // attempt to reset and init SM2
    //_s._wD(_sm+'.reboot()');
    if (_s.soundIDs.length) {
      //_s._wD('Destroying ' + _s.soundIDs.length + ' SMSound objects...');
    }
    var i, j;
    for (i = _s.soundIDs.length; i--;) {
      _s.sounds[_s.soundIDs[i]].destruct();
    }
    // trash ze flash
    try {
      if (_isIE) {
        _oRemovedHTML = _s.o.innerHTML;
      }
      _oRemoved = _s.o.parentNode.removeChild(_s.o);
      //_s._wD('Flash movie removed.');
    } catch(e) {
      // uh-oh.
      //_wDS('badRemove', 2);
    }
    // actually, force recreate of movie.
    _oRemovedHTML = _oRemoved = null;
    _s.enabled = _didInit = _waitingForEI = _initPending = _didAppend = _appendSuccess = _disabled = _s.swfLoaded = false;
    _s.soundIDs = _s.sounds = [];
    _s.o = null;
    for (i in _on_queue) {
      if (_on_queue.hasOwnProperty(i)) {
        for (j = _on_queue[i].length; j--;) {
          _on_queue[i][j].fired = false;
        }
      }
    }
    //_s._wD(_sm + ': Rebooting...');
    _win.setTimeout(function() {
      _s.beginDelayedInit();
    }, 20);
  };

  this.destruct = function() {
    //_s._wD(_sm+'.destruct()');
    _s.disable(true);
  };

  this.beginDelayedInit = function() {
    _windowLoaded = true;
   _dcLoaded();
    setTimeout(_beginInit, 20);
    _delayWaitForEI();
  };

  // Wrap html5 event handlers so we don't call them on destroyed sounds
  function _html5_event(oFn) {
    return function(e) {
      if (!this._t || !this._t._a) {
        if (this._t && this._t.sID) {
          //_s._wD(_h5+'ignoring '+e.type+': '+this._t.sID);
        } else {
          //_s._wD(_h5+'ignoring '+e.type);
        }
        return null;
      } else {
        return oFn.call(this, e);
      }
    };
  }

  this._html5_events = {

    // HTML5 event-name-to-handler map
    abort: _html5_event(function(e) {
      //_s._wD(_h5+'abort: '+this._t.sID);
    }),

    // enough has loaded to play
    canplay: _html5_event(function(e) {
      if (this._t._html5_canplay) {
        // this event has already fired. ignore.
        return true;
      }
      this._t._html5_canplay = true;
      //_s._wD(_h5+'canplay: '+this._t.sID+', '+this._t.url);
      this._t._onbufferchange(0);
      var position1K = (!isNaN(this._t.position)?this._t.position/1000:null);
      // set the position if position was set before the sound loaded
      if (this._t.position && this.currentTime !== position1K) {
        //_s._wD(_h5+'canplay: setting position to '+position1K+'');
        try {
          this.currentTime = position1K;
        } catch(ee) {
          //_s._wD(_h5+'setting position failed: '+ee.message, 2);
        }
      }
    }),

    load: _html5_event(function(e) {
      if (!this._t.loaded) {
        this._t._onbufferchange(0);
        // should be 1, and the same
        this._t._whileloading(this._t.bytesTotal, this._t.bytesTotal, this._t._get_html5_duration());
        this._t._onload(true);
      }
    }),

    emptied: _html5_event(function(e) {
      //_s._wD(_h5+'emptied: '+this._t.sID);
    }),

    ended: _html5_event(function(e) {
      //_s._wD(_h5+'ended: '+this._t.sID);
      this._t._onfinish();
    }),

    error: _html5_event(function(e) {
      //_s._wD(_h5+'error: '+this.error.code);
      // call load with error state?
      this._t._onload(false);
    }),

    loadeddata: _html5_event(function(e) {
      //_s._wD(_h5+'loadeddata: '+this._t.sID);
    }),

    loadedmetadata: _html5_event(function(e) {
      //_s._wD(_h5+'loadedmetadata: '+this._t.sID);
    }),

    loadstart: _html5_event(function(e) {
      //_s._wD(_h5+'loadstart: '+this._t.sID);
      // assume buffering at first
      this._t._onbufferchange(1);
    }),

    play: _html5_event(function(e) {
      //_s._wD(_h5+'play: '+this._t.sID+', '+this._t.url);
      // once play starts, no buffering
      this._t._onbufferchange(0);
    }),

    // TODO: verify if this is actually implemented anywhere yet.
    playing: _html5_event(function(e) {
      //_s._wD(_h5+'playing: '+this._t.sID+', '+this._t.url);
      // once play starts, no buffering
      this._t._onbufferchange(0);
    }),

    progress: _html5_event(function(e) {

      if (this._t.loaded) {
        return false;
      }

      var i, j, str, loadSum = 0, buffered = 0,
          isProgress = (e.type === 'progress'),
          ranges = e.target.buffered,
          loaded = (e.loaded||0), // firefox 3.6 implements e.loaded/total (bytes)
          total = (e.total||1);

      if (ranges && ranges.length) {

        // if loaded is 0, try TimeRanges implementation as % of load
        // https://developer.mozilla.org/en/DOM/TimeRanges
        for (i=ranges.length; i--;) {
          buffered = (ranges.end(i) - ranges.start(i));
        }

        // linear case, buffer sum; does not account for seeking and HTTP partials / byte ranges
        loaded = buffered/e.target.duration;

        /*
        if (isProgress && ranges.length > 1) {
          str = [];
          j = ranges.length;
          for (i=0; i<j; i++) {
            str.push(e.target.buffered.start(i) +'-'+ e.target.buffered.end(i));
          }
          //_s._wD(_h5+'progress: timeRanges: '+str.join(', '));
        }
        */

        if (isProgress && !isNaN(loaded)) {
          //_s._wD(_h5+'progress: '+this._t.sID+': ' + Math.floor(loaded*100)+'% loaded');
        }

      }

      if (!isNaN(loaded)) {

        this._t._onbufferchange(0); // if progress, likely not buffering
        this._t._whileloading(loaded, total, this._t._get_html5_duration());

        if (loaded && total && loaded === total) {
          // in case "onload" doesn't fire (eg. gecko 1.9.2)
          _s._html5_events.load.call(this, e);
        }

      }

    }),

    ratechange: _html5_event(function(e) {
      //_s._wD(_h5+'ratechange: '+this._t.sID);
    }),

    suspend: _html5_event(function(e) {
      // download paused/stopped, may have finished (eg. onload)
      //_s._wD(_h5+'suspend: '+this._t.sID);
      _s._html5_events.progress.call(this, e);
    }),

    stalled: _html5_event(function(e) {
      //_s._wD(_h5+'stalled: '+this._t.sID);
    }),

    timeupdate: _html5_event(function(e) {
      this._t._onTimer();
    }),

    waiting: _html5_event(function(e) { // see also: seeking
      //_s._wD(_h5+'waiting: '+this._t.sID);
      // playback faster than download rate, etc.
      this._t._onbufferchange(1);
    })

  };

  // --- SMSound (sound object) instance ---

  SMSound = function(oOptions) {

    var _t = this, _resetProperties, _stop_html5_timer, _start_html5_timer;
    this.sID = oOptions.id;
    this.url = oOptions.url;
    this.options = _mixin(oOptions);
    this.instanceOptions = this.options; // per-play-instance-specific options
    this._iO = this.instanceOptions; // short alias
    // assign property defaults
    this.pan = this.options.pan;
    this.volume = this.options.volume;
    this._lastURL = null;
    this.isHTML5 = false;
    this._a = null;

    // --- public methods ---

    this.id3 = {};

    this._debug = function() {
      /*
      // pseudo-private console.log()-style output
      if (_s.debugMode) {
        var stuff = null, msg = [], sF, sfBracket, maxLength = 64;
        for (stuff in _t.options) {
          if (_t.options[stuff] !== null) {
            if (_t.options[stuff] instanceof Function) {
              // handle functions specially
              sF = _t.options[stuff].toString();
              sF = sF.replace(/\s\s+/g, ' '); // normalize spaces
              sfBracket = sF.indexOf('{');
              msg.push(' ' + stuff + ': {' + sF.substr(sfBracket + 1, (Math.min(Math.max(sF.indexOf('\n') - 1, maxLength), maxLength))).replace(/\n/g, '') + '... }');
            } else {
              msg.push(' ' + stuff + ': ' + _t.options[stuff]);
            }
          }
        }
        //_s._wD('SMSound() merged options: {\n' + msg.join(', \n') + '\n}');
      }
      */
    };

    this._debug();

    this.load = function(oOptions) {
      var oS = null;
      if (typeof oOptions !== 'undefined') {
        _t._iO = _mixin(oOptions, _t.options);
        _t.instanceOptions = _t._iO;
      } else {
        oOptions = _t.options;
        _t._iO = oOptions;
        _t.instanceOptions = _t._iO;
        if (_t._lastURL && _t._lastURL !== _t.url) {
          //_wDS('manURL');
          _t._iO.url = _t.url;
          _t.url = null;
        }
      }
      if (!_t._iO.url) {
        _t._iO.url = _t.url;
      }
      //_s._wD('SMSound.load(): ' + _t._iO.url, 1);
      if (_t._iO.url === _t.url && _t.readyState !== 0 && _t.readyState !== 2) {
        //_wDS('onURL', 1);
        return _t;
      }
      _t._lastURL = _t.url;
      _t.loaded = false;
      _t.readyState = 1;
      _t.playState = 0;
      if (_html5OK(_t._iO)) {
        oS = _t._setup_html5(_t._iO);
        if (!oS._called_load) {
          //_s._wD(_h5+'load: '+_t.sID);
          _t._html5_canplay = false;
          oS.load();
          oS._called_load = true;
          if (_t._iO.autoPlay) {
            _t.play();
          }
        } else {
          //_s._wD('HTML5 ignoring request to load again: '+_t.sID);
        }
      } else {
        try {
          _t.isHTML5 = false;
          _t._iO = _policyFix(_loopFix(_t._iO));
          if (_fV === 8) {
            _s.o._load(_t.sID, _t._iO.url, _t._iO.stream, _t._iO.autoPlay, (_t._iO.whileloading?1:0), _t._iO.loops||1, _t._iO.usePolicyFile);
          } else {
            _s.o._load(_t.sID, _t._iO.url, _t._iO.stream?true:false, _t._iO.autoPlay?true:false, _t._iO.loops||1, _t._iO.autoLoad?true:false, _t._iO.usePolicyFile);
          }
        } catch(e) {
          //_wDS('smError', 2);
          //_debugTS('onload', false);
          _die();
        }
      }
      return _t;
    };

    this.unload = function() {
      // Flash 8/AS2 can't "close" a stream - fake it by loading an empty MP3
      // Flash 9/AS3: Close stream, preventing further load
      if (_t.readyState !== 0) {
        //_s._wD('SMSound.unload(): "' + _t.sID + '"');
        if (!_t.isHTML5) {
          if (_fV === 8) {
            _s.o._unload(_t.sID, _s.nullURL);
          } else {
            _s.o._unload(_t.sID);
          }
        } else {
          _stop_html5_timer();
          if (_t._a) {
            // abort()-style method here, stop loading? (doesn't exist?)
            _t._a.pause();
            _t._a.src = ''; // https://developer.mozilla.org/En/Using_audio_and_video_in_Firefox#Stopping_the_download_of_media
          }
        }
        // reset load/status flags
        _resetProperties();
      }
      return _t;
    };

    this.destruct = function(_bFromSM) {
      //_s._wD('SMSound.destruct(): "' + _t.sID + '"');
      if (!_t.isHTML5) {
        // kill sound within Flash
        // Disable the onfailure handler
        _t._iO.onfailure = null;
        _s.o._destroySound(_t.sID);
      } else {
        _stop_html5_timer();
        if (_t._a) {
          // abort()-style method here, stop loading? (doesn't exist?)
          _t._a.pause();
          _t._a.src = ''; // https://developer.mozilla.org/En/Using_audio_and_video_in_Firefox#Stopping_the_download_of_media
          if (!_useGlobalHTML5Audio) {
            _t._remove_html5_events();
          }
        }
      }
      if (!_bFromSM) {
        _s.destroySound(_t.sID, true); // ensure deletion from controller
      }
    };

    this.play = function(oOptions, _updatePlayState) {
      var fN = 'SMSound.play(): ', allowMulti, a;
      _updatePlayState = _updatePlayState === undefined ? true : _updatePlayState; // default true
      if (!oOptions) {
        oOptions = {};
      }
      _t._iO = _mixin(oOptions, _t._iO);
      _t._iO = _mixin(_t._iO, _t.options);
      _t.instanceOptions = _t._iO;
      if (_t._iO.serverURL) {
        if (!_t.connected) {
          if (!_t.getAutoPlay()) {
            //_s._wD(fN+' Netstream not connected yet - setting autoPlay');
            _t.setAutoPlay(true);
          }
          return _t; // play will be called in _onconnect()
        }
      }
      if (_html5OK(_t._iO)) {
        _t._setup_html5(_t._iO);
        _start_html5_timer();
      }
      if (_t.playState === 1 && !_t.paused) {
        allowMulti = _t._iO.multiShot;
        if (!allowMulti) {
          //_s._wD(fN + '"' + _t.sID + '" already playing (one-shot)', 1);
          return _t;
        } else {
          //_s._wD(fN + '"' + _t.sID + '" already playing (multi-shot)', 1);
        }
      }
      if (!_t.loaded) {
        if (_t.readyState === 0) {
          //_s._wD(fN + 'Attempting to load "' + _t.sID + '"', 1);
          // try to get this sound playing ASAP
          if (!_t.isHTML5) {
            _t._iO.autoPlay = true; // assign directly because setAutoPlay() increments the instanceCount
            _t.load(_t._iO);
          } else {
            _t.load(_t._iO);
            // _t.readyState = 1; // redundant
          }
        } else if (_t.readyState === 2) {
          //_s._wD(fN + 'Could not load "' + _t.sID + '" - exiting', 2);
          return _t;
        } else {
          //_s._wD(fN + '"' + _t.sID + '" is loading - attempting to play..', 1);
        }
      } else {
        //_s._wD(fN + '"' + _t.sID + '"');
      }
      // Streams will pause when their buffer is full if they are being loaded.
      // In this case paused is true, but the song hasn't started playing yet. If
      // we just call resume() the onplay() callback will never be called.  So
      // only call resume() if the position is > 0.
      // Another reason is because options like volume won't have been applied yet.
      if (_t.paused && _t.position && _t.position > 0) { // https://gist.github.com/37b17df75cc4d7a90bf6
        //_s._wD(fN + '"' + _t.sID + '" is resuming from paused state',1);
        _t.resume();
      } else {
        //_s._wD(fN+'"'+ _t.sID+'" is starting to play');
        _t.playState = 1;
        _t.paused = false;
        if (!_t.instanceCount || _t._iO.multiShotEvents || (_fV > 8 && !_t.isHTML5 && !_t.getAutoPlay())) {
          _t.instanceCount++;
        }
        _t.position = (typeof _t._iO.position !== 'undefined' && !isNaN(_t._iO.position)?_t._iO.position:0);
        if (!_t.isHTML5) {
          _t._iO = _policyFix(_loopFix(_t._iO));
        }
        if (_t._iO.onplay && _updatePlayState) {
          _t._iO.onplay.apply(_t);
          _t._onplay_called = true;
        }
        _t.setVolume(_t._iO.volume, true);
        _t.setPan(_t._iO.pan, true);
        if (!_t.isHTML5) {
          _s.o._start(_t.sID, _t._iO.loops || 1, (_fV === 9?_t.position:_t.position / 1000));
        } else {
          _start_html5_timer();
          a = _t._setup_html5();
          _t.setPosition(_t.position);
          a.play();
        }
      }
      return _t;
    };

    this.start = this.play; // just for convenience

    this.stop = function(bAll) {
      if (_t.playState === 1) {
        _t._onbufferchange(0);
        _t.resetOnPosition(0);
        if (!_t.isHTML5) {
          _t.playState = 0;
        }
        _t.paused = false;
        if (_t._iO.onstop) {
          _t._iO.onstop.apply(_t);
        }
        if (!_t.isHTML5) {
          _s.o._stop(_t.sID, bAll);
          // hack for netStream: just unload
          if (_t._iO.serverURL) {
            _t.unload();
          }
        } else {
          if (_t._a) {
            _t.setPosition(0); // act like Flash, though
            _t._a.pause(); // html5 has no stop()
            _t.playState = 0;
            _t._onTimer(); // and update UI
            _stop_html5_timer();
            _t.unload();
          }
        }
        _t.instanceCount = 0;
        _t._iO = {};
      }
      return _t;
    };

    this.setAutoPlay = function(autoPlay) {
      //_s._wD('sound '+_t.sID+' turned autoplay ' + (autoPlay ? 'on' : 'off'));
      _t._iO.autoPlay = autoPlay;
      if (_t.isHTML5) {
        if (_t._a && autoPlay) {
          _t.play(); // HTML5 onload isn't reliable
        }
      } else {
        _s.o._setAutoPlay(_t.sID, autoPlay);
      }
      if (autoPlay) {
        // only increment the instanceCount if the sound isn't loaded (TODO: verify RTMP)
        if (!_t.instanceCount && _t.readyState === 1) {
          _t.instanceCount++;
          //_s._wD('sound '+_t.sID+' incremented instance count to '+_t.instanceCount);
        }
      }
    };

    this.getAutoPlay = function() {
      return _t._iO.autoPlay;
    };

    this.setPosition = function(nMsecOffset, bNoDebug) {
      if (nMsecOffset === undefined) {
        nMsecOffset = 0;
      }
      // Use the duration from the instance options, if we don't have a track duration yet.
      var original_pos, position, position1K, offset = (_t.isHTML5 ? Math.max(nMsecOffset,0) : Math.min(_t.duration || _t._iO.duration, Math.max(nMsecOffset, 0))); // position >= 0 and <= current available (loaded) duration
      original_pos = _t.position;
      _t.position = offset;
      position1K = _t.position/1000;
      _t.resetOnPosition(_t.position);
      _t._iO.position = offset;
      if (!_t.isHTML5) {
        position = _fV === 9 ? _t.position : position1K;
        if (_t.readyState && _t.readyState !== 2) {
          _s.o._setPosition(_t.sID, position, (_t.paused || !_t.playState)); // if paused or not playing, will not resume (by playing)
        }
      } else if (_t._a) {
        // Set the position in the canplay handler if the sound is not ready yet
        if (_t._html5_canplay) {
          if (_t._a.currentTime !== position1K) {
            // Only set the position if we need to.
            // DOM/JS errors/exceptions to watch out for:
            // if seek is beyond (loaded?) position, "DOM exception 11"
            // "INDEX_SIZE_ERR": DOM exception 1
            //_s._wD('setPosition('+position1K+'): setting position');
            try {
              _t._a.currentTime = position1K;
              if (_t.playState === 0 || _t.paused) {
                // allow seek without auto-play/resume
                _t._a.pause();
              }
            } catch(e) {
              //_s._wD('setPosition('+position1K+'): setting position failed: '+e.message, 2);
            }
          }
        } else {
          //_s._wD('setPosition('+position1K+'): delaying, sound not ready');
        }
      }
      if (_t.isHTML5) {
        if (_t.paused) { // if paused, refresh UI right away
          _t._onTimer(true); // force update
        }
      }
      return _t;
    };

    this.pause = function(bCallFlash) {
      if (_t.paused || (_t.playState === 0 && _t.readyState !== 1)) {
        return _t;
      }
      //_s._wD('SMSound.pause()');
      _t.paused = true;
      if (!_t.isHTML5) {
        if (bCallFlash || bCallFlash === undefined) {
          _s.o._pause(_t.sID);
        }
      } else {
        _t._setup_html5().pause();
        _stop_html5_timer();
      }
      if (_t._iO.onpause) {
        _t._iO.onpause.apply(_t);
      }
      return _t;
    };

    // When auto-loaded streams pause on buffer full they have a playState of 0.
    // We need to make sure that the playState is set to 1 when these streams "resume".
    // When a paused stream is resumed, we need to trigger the onplay() callback if it
    // hasn't been called already. In this case since the sound is being played for the
    // first time, I think it's more appropriate to call onplay() rather than onresume().
    this.resume = function() {
      if (!_t.paused) {
        return _t;
      }
      //_s._wD('SMSound.resume()');
      _t.paused = false;
      _t.playState = 1;
      if (!_t.isHTML5) {
        if (_t._iO.isMovieStar) {
          // Bizarre Webkit bug (Chrome reported via 8tracks.com dudes): AAC content paused for 30+ seconds(?) will not resume without a reposition.
          _t.setPosition(_t.position);
        }
        _s.o._pause(_t.sID); // flash method is toggle-based (pause/resume)
      } else {
        _t._setup_html5().play();
        _start_html5_timer();
      }
      if (!_t._onplay_called && _t._iO.onplay) {
        _t._iO.onplay.apply(_t);
        _t._onplay_called = true;
      } else if (_t._iO.onresume) {
        _t._iO.onresume.apply(_t);
      }
      return _t;
    };

    this.togglePause = function() {
      //_s._wD('SMSound.togglePause()');
      if (_t.playState === 0) {
        _t.play({
          position: (_fV === 9 && !_t.isHTML5 ? _t.position:_t.position / 1000)
        });
        return _t;
      }
      if (_t.paused) {
        _t.resume();
      } else {
        _t.pause();
      }
      return _t;
    };

    this.setPan = function(nPan, bInstanceOnly) {
      if (typeof nPan === 'undefined') {
        nPan = 0;
      }
      if (typeof bInstanceOnly === 'undefined') {
        bInstanceOnly = false;
      }
      if (!_t.isHTML5) {
        _s.o._setPan(_t.sID, nPan);
      } // else { no HTML5 pan? }
      _t._iO.pan = nPan;
      if (!bInstanceOnly) {
        _t.pan = nPan;
        _t.options.pan = nPan;
      }
      return _t;
    };

    this.setVolume = function(nVol, bInstanceOnly) {
      if (typeof nVol === 'undefined') {
        nVol = 100;
      }
      if (typeof bInstanceOnly === 'undefined') {
        bInstanceOnly = false;
      }
      if (!_t.isHTML5) {
        _s.o._setVolume(_t.sID, (_s.muted && !_t.muted) || _t.muted?0:nVol);
      } else if (_t._a) {
        _t._a.volume = Math.max(0, Math.min(1, nVol/100)); // valid range: 0-1
      }
      _t._iO.volume = nVol;
      if (!bInstanceOnly) {
        _t.volume = nVol;
        _t.options.volume = nVol;
      }
      return _t;
    };

    this.mute = function() {
      _t.muted = true;
      if (!_t.isHTML5) {
        _s.o._setVolume(_t.sID, 0);
      } else if (_t._a) {
        _t._a.muted = true;
      }
      return _t;
    };

    this.unmute = function() {
      _t.muted = false;
      var hasIO = typeof _t._iO.volume !== 'undefined';
      if (!_t.isHTML5) {
        _s.o._setVolume(_t.sID, hasIO?_t._iO.volume:_t.options.volume);
      } else if (_t._a) {
        _t._a.muted = false;
      }
      return _t;
    };

    this.toggleMute = function() {
      return (_t.muted?_t.unmute():_t.mute());
    };

    this.onposition = function(nPosition, oMethod, oScope) {
      // TODO: allow for ranges, too? eg. (nPosition instanceof Array)
      _t._onPositionItems.push({
        position: nPosition,
        method: oMethod,
        scope: (typeof oScope !== 'undefined'?oScope:_t),
        fired: false
      });
      return _t;
    };

    this.processOnPosition = function() {
      var i, item, j = _t._onPositionItems.length;
      if (!j || !_t.playState || _t._onPositionFired >= j) {
        return false;
      }
      for (i=j; i--;) {
        item = _t._onPositionItems[i];
        if (!item.fired && _t.position >= item.position) {
          item.method.apply(item.scope,[item.position]);
          item.fired = true;
          _s._onPositionFired++;
        }
      }
      return true;
    };

    this.resetOnPosition = function(nPosition) {
      // reset "fired" for items interested in this position
      var i, item, j = _t._onPositionItems.length;
      if (!j) {
        return false;
      }
      for (i=j; i--;) {
        item = _t._onPositionItems[i];
        if (item.fired && nPosition <= item.position) {
          item.fired = false;
          _s._onPositionFired--;
        }
      }
      return true;
    };

    // pseudo-private soundManager reference

    this._onTimer = function(bForce) {
      // HTML5-only _whileplaying() etc.
      var time, x = {};
      if (_t._hasTimer || bForce) {
        if (_t._a && (bForce || ((_t.playState > 0 || _t.readyState === 1) && !_t.paused))) { // TODO: May not need to track readyState (1 = loading)
          _t.duration = _t._get_html5_duration();
          _t.durationEstimate = _t.duration;
          time = _t._a.currentTime?_t._a.currentTime*1000:0;
          _t._whileplaying(time,x,x,x,x);
          return true;
        } else {
         //_s._wD('_onTimer: Warn for "'+_t.sID+'": '+(!_t._a?'Could not find element. ':'')+(_t.playState === 0?'playState bad, 0?':'playState = '+_t.playState+', OK'));
          return false;
        }
      }
    };

    // --- private internals ---

    this._get_html5_duration = function() {
      var d = (_t._a ? _t._a.duration*1000 : (_t._iO ? _t._iO.duration : undefined));
      return (d && !isNaN(d) && d !== Infinity ? d : (_t._iO ? _t._iO.duration : null));
    };

    _start_html5_timer = function() {
      if (_t.isHTML5) {
        _startTimer(_t);
      }
    };

    _stop_html5_timer = function() {
      if (_t.isHTML5) {
        _stopTimer(_t);
      }
    };

    _resetProperties = function(bLoaded) {
      _t._onPositionItems = [];
      _t._onPositionFired = 0;
      _t._hasTimer = null;
      _t._onplay_called = false;
      _t._a = null;
      _t._html5_canplay = false;
      _t.bytesLoaded = null;
      _t.bytesTotal = null;
      _t.position = null;
      _t.duration = (_t._iO && _t._iO.duration?_t._iO.duration:null);
      _t.durationEstimate = null;
      _t.failures = 0;
      _t.loaded = false;
      _t.playState = 0;
      _t.paused = false;
      _t.readyState = 0; // 0 = uninitialised, 1 = loading, 2 = failed/error, 3 = loaded/success
      _t.muted = false;
      _t.didBeforeFinish = false;
      _t.didJustBeforeFinish = false;
      _t.isBuffering = false;
      _t.instanceOptions = {};
      _t.instanceCount = 0;
      _t.peakData = {
        left: 0,
        right: 0
      };
      _t.waveformData = {
        left: [],
        right: []
      };
      _t.eqData = []; // legacy: 1D array
      _t.eqData.left = [];
      _t.eqData.right = [];
    };

    _resetProperties();

    // pseudo-private methods used by soundManager

    this._setup_html5 = function(oOptions) {
      var _iO = _mixin(_t._iO, oOptions), d = decodeURI,
          _a = _useGlobalHTML5Audio ? _s._global_a : _t._a,
          _dURL = d(_iO.url),
          _oldIO = (_a && _a._t ? _a._t.instanceOptions : null);
      if (_a) {
        if (_a._t && _oldIO.url === _iO.url && (!_t._lastURL || (_t._lastURL === _oldIO.url))) {
          return _a; // same url, ignore request
        }
        //_s._wD('setting new URL on existing object: ' + _dURL + (_t._lastURL ? ', old URL: ' + _t._lastURL : ''));
        /*
         * "First things first, I, Poppa.." (reset the previous state of the old sound, if playing)
         * Fixes case with devices that can only play one sound at a time
         * Otherwise, other sounds in mid-play will be terminated without warning and in a stuck state
         */
        if (_useGlobalHTML5Audio && _a._t && _a._t.playState && _iO.url !== _oldIO.url) {
          _a._t.stop();
        }
        _resetProperties(); // new URL, so reset load/playstate and so on
        _a.src = _iO.url;
        _t.url = _iO.url;
        _t._lastURL = _iO.url;
        _a._called_load = false;
      } else {
        //_s._wD('creating HTML5 Audio() element with URL: '+_dURL);
        _a = new Audio(_iO.url);
        _a._called_load = false;
        if (_useGlobalHTML5Audio) {
          _s._global_a = _a;
        }
      }
      _t.isHTML5 = true;
      _t._a = _a; // store a ref on the track
      _a._t = _t; // store a ref on the audio
      _t._add_html5_events();
      _a.loop = (_iO.loops>1?'loop':'');
      if (_iO.autoLoad || _iO.autoPlay) {
        _a.autobuffer = 'auto'; // early HTML5 implementation (non-standard)
        _a.preload = 'auto'; // standard
        _t.load();
        _a._called_load = true;
      } else {
        _a.autobuffer = false; // early HTML5 implementation (non-standard)
        _a.preload = 'none'; // standard
      }
      _a.loop = (_iO.loops>1?'loop':''); // boolean instead of "loop", for webkit? - spec says string. http://www.w3.org/TR/html-markup/audio.html#audio.attrs.loop
      return _a;
    };

    // related private methods

    this._add_html5_events = function() {

      if (_t._a._added_events) {
        return false;
      }

      var f;

      function add(oEvt, oFn, bCapture) {
        return _t._a ? _t._a.addEventListener(oEvt, oFn, bCapture||false) : null;
      }

      //_s._wD(_h5+'adding event listeners: '+_t.sID);
      _t._a._added_events = true;

      for (f in _s._html5_events) {
        if (_s._html5_events.hasOwnProperty(f)) {
          add(f, _s._html5_events[f]);
        }
      }

      return true;

    };

    // Keep this externally accessible
    this._remove_html5_events = function() {

      // Remove event listeners
      function remove(oEvt, oFn, bCapture) {
        return (_t._a ? _t._a.removeEventListener(oEvt, oFn, bCapture||false) : null);
      }

      //_s._wD(_h5+'removing event listeners: '+_t.sID);
      _t._a._added_events = false;

      for (var f in _s._html5_events) {
        if (_s._html5_events.hasOwnProperty(f)) {
          remove(f, _s._html5_events[f]);
        }
      }

    };

    // --- "private" methods called by Flash ---

    this._whileloading = function(nBytesLoaded, nBytesTotal, nDuration, nBufferLength) {
      _t.bytesLoaded = nBytesLoaded;
      _t.bytesTotal = nBytesTotal;
      _t.duration = Math.floor(nDuration);
      _t.bufferLength = nBufferLength;
      if (!_t._iO.isMovieStar) {
        if (_t._iO.duration) {
          // use options, if specified and larger
          _t.durationEstimate = (_t.duration > _t._iO.duration) ? _t.duration : _t._iO.duration;
        } else {
          _t.durationEstimate = parseInt((_t.bytesTotal / _t.bytesLoaded) * _t.duration, 10);
        }
        if (_t.durationEstimate === undefined) {
          _t.durationEstimate = _t.duration;
        }
        if (_t.readyState !== 3 && _t._iO.whileloading) {
          _t._iO.whileloading.apply(_t);
        }
      } else {
        _t.durationEstimate = _t.duration;
        if (_t.readyState !== 3 && _t._iO.whileloading) {
          _t._iO.whileloading.apply(_t);
        }
      }
    };

    this._onid3 = function(oID3PropNames, oID3Data) {
      // oID3PropNames: string array (names)
      // ID3Data: string array (data)
      //_s._wD('SMSound._onid3(): "' + this.sID + '" ID3 data received.');
      var oData = [], i, j;
      for (i = 0, j = oID3PropNames.length; i < j; i++) {
        oData[oID3PropNames[i]] = oID3Data[i];
      }
      _t.id3 = _mixin(_t.id3, oData);
      if (_t._iO.onid3) {
        _t._iO.onid3.apply(_t);
      }
    };

    this._whileplaying = function(nPosition, oPeakData, oWaveformDataLeft, oWaveformDataRight, oEQData) {
      if (isNaN(nPosition) || nPosition === null) {
        return false; // flash safety net
      }
      if (_t.playState === 0 && nPosition > 0) {
        // invalid position edge case for end/stop
        nPosition = 0;
      }
      _t.position = nPosition;
      _t.processOnPosition();
      if (_fV > 8 && !_t.isHTML5) {
        if (_t._iO.usePeakData && typeof oPeakData !== 'undefined' && oPeakData) {
          _t.peakData = {
            left: oPeakData.leftPeak,
            right: oPeakData.rightPeak
          };
        }
        if (_t._iO.useWaveformData && typeof oWaveformDataLeft !== 'undefined' && oWaveformDataLeft) {
          _t.waveformData = {
            left: oWaveformDataLeft.split(','),
            right: oWaveformDataRight.split(',')
          };
        }
        if (_t._iO.useEQData) {
          if (typeof oEQData !== 'undefined' && oEQData && oEQData.leftEQ) {
            var eqLeft = oEQData.leftEQ.split(',');
            _t.eqData = eqLeft;
            _t.eqData.left = eqLeft;
            if (typeof oEQData.rightEQ !== 'undefined' && oEQData.rightEQ) {
              _t.eqData.right = oEQData.rightEQ.split(',');
            }
          }
        }
      }
      if (_t.playState === 1) {
        // special case/hack: ensure buffering is false if loading from cache (and not yet started)
        if (!_t.isHTML5 && _s.flashVersion === 8 && !_t.position && _t.isBuffering) {
          _t._onbufferchange(0);
        }
        if (_t._iO.whileplaying) {
          _t._iO.whileplaying.apply(_t); // flash may call after actual finish
        }
        if ((_t.loaded || (!_t.loaded && _t._iO.isMovieStar)) && _t._iO.onbeforefinish && _t._iO.onbeforefinishtime && !_t.didBeforeFinish && _t.duration - _t.position <= _t._iO.onbeforefinishtime) {
          _t._onbeforefinish();
        }
      }
      return true;
    };

    // Only applies to RTMP
    this._onconnect = function(bSuccess) {
      var fN = 'SMSound._onconnect(): ';
      bSuccess = (bSuccess === 1);
      //_s._wD(fN+'"'+_t.sID+'"'+(bSuccess?' connected.':' failed to connect? - '+_t.url), (bSuccess?1:2));
      _t.connected = bSuccess;
      if (bSuccess) {
        _t.failures = 0;
        if (_idCheck(_t.sID)) {
          if (_t.getAutoPlay()) {
            _t.play(undefined, _t.getAutoPlay()); // only update the play state if auto playing
          } else if (_t._iO.autoLoad) {
            _t.load();
          }
        }
        if (_t._iO.onconnect) {
          _t._iO.onconnect.apply(_t,[bSuccess]);
        }
      }
    };

    this._onload = function(nSuccess) {
      var fN = 'SMSound._onload(): ', loadOK = (nSuccess?true:false);
      //_s._wD(fN + '"' + _t.sID + '"' + (loadOK?' loaded.':' failed to load? - ' + _t.url), (loadOK?1:2));
      /*
      if (!loadOK && !_t.isHTML5) {
        if (_s.sandbox.noRemote === true) {
          //_s._wD(fN + _str('noNet'), 1);
        }
        if (_s.sandbox.noLocal === true) {
          //_s._wD(fN + _str('noLocal'), 1);
        }
      }
      */
      _t.loaded = loadOK;
      _t.readyState = loadOK?3:2;
      _t._onbufferchange(0);
      if (_t._iO.onload) {
        _t._iO.onload.apply(_t, [loadOK]);
      }
      return true;
    };

    // fire onfailure() only once at most
    // at this point we just recreate failed sounds rather than trying to reconnect.
    this._onfailure = function(msg, level, code) {
      _t.failures++;
      //_s._wD('SMSound._onfailure(): "'+_t.sID+'" count '+_t.failures);
      if (_t._iO.onfailure && _t.failures === 1) {
        _t._iO.onfailure(_t, msg, level, code);
      } else {
        //_s._wD('SMSound._onfailure(): ignoring');
      }
    };

    this._onbeforefinish = function() {
      if (!_t.didBeforeFinish) {
        _t.didBeforeFinish = true;
        if (_t._iO.onbeforefinish) {
          //_s._wD('SMSound._onbeforefinish(): "' + _t.sID + '"');
          _t._iO.onbeforefinish.apply(_t);
        }
      }
    };

    this._onjustbeforefinish = function(msOffset) {
      if (!_t.didJustBeforeFinish) {
        _t.didJustBeforeFinish = true;
        if (_t._iO.onjustbeforefinish) {
          //_s._wD('SMSound._onjustbeforefinish(): "' + _t.sID + '"');
          _t._iO.onjustbeforefinish.apply(_t);
        }
      }
    };

    this._onfinish = function() {
      // //_s._wD('SMSound._onfinish(): "' + _t.sID + '" got instanceCount '+_t.instanceCount);
      var _io_onfinish = _t._iO.onfinish; // store local copy before it gets trashed..
      _t._onbufferchange(0);
      _t.resetOnPosition(0);
      if (_t._iO.onbeforefinishcomplete) {
        _t._iO.onbeforefinishcomplete.apply(_t);
      }
      // reset some state items
      _t.didBeforeFinish = false;
      _t.didJustBeforeFinish = false;
      if (_t.instanceCount) {
        _t.instanceCount--;
        if (!_t.instanceCount) {
          // reset instance options
          _t.playState = 0;
          _t.paused = false;
          _t.instanceCount = 0;
          _t.instanceOptions = {};
          _t._iO = {};
          _stop_html5_timer();
        }
        if (!_t.instanceCount || _t._iO.multiShotEvents) {
          // fire onfinish for last, or every instance
          if (_io_onfinish) {
            //_s._wD('SMSound._onfinish(): "' + _t.sID + '"');
            _io_onfinish.apply(_t);
          }
        }
      }
    };

    this._onbufferchange = function(nIsBuffering) {
      var fN = 'SMSound._onbufferchange()';
      if (_t.playState === 0) {
        // ignore if not playing
        return false;
      }
      if ((nIsBuffering && _t.isBuffering) || (!nIsBuffering && !_t.isBuffering)) {
        return false;
      }
      _t.isBuffering = (nIsBuffering === 1);
      if (_t._iO.onbufferchange) {
        //_s._wD(fN + ': ' + nIsBuffering);
        _t._iO.onbufferchange.apply(_t);
      }
      return true;
    };

    this._ondataerror = function(sError) {
      // flash 9 wave/eq data handler
      if (_t.playState > 0) { // hack: called at start, and end from flash at/after onfinish()
        //_s._wD('SMSound._ondataerror(): ' + sError);
        if (_t._iO.ondataerror) {
          _t._iO.ondataerror.apply(_t);
        }
      }
    };

  }; // SMSound()

  // --- private SM2 internals ---

  _getDocument = function() {
    return (_doc.body?_doc.body:(_doc._docElement?_doc.documentElement:_doc.getElementsByTagName('div')[0]));
  };

  _id = function(sID) {
    return _doc.getElementById(sID);
  };

  _mixin = function(oMain, oAdd) {
    // non-destructive merge
    var o1 = {}, i, o2, o;
    for (i in oMain) { // clone c1
      if (oMain.hasOwnProperty(i)) {
        o1[i] = oMain[i];
      }
    }
    o2 = (typeof oAdd === 'undefined'?_s.defaultOptions:oAdd);
    for (o in o2) {
      if (o2.hasOwnProperty(o) && typeof o1[o] === 'undefined') {
        o1[o] = o2[o];
      }
    }
    return o1;
  };

  _event = (function() {

    var old = (_win.attachEvent),
    evt = {
      add: (old?'attachEvent':'addEventListener'),
      remove: (old?'detachEvent':'removeEventListener')
    };

    function getArgs(oArgs) {
      var args = _slice.call(oArgs), len = args.length;
      if (old) {
        args[1] = 'on' + args[1]; // prefix
        if (len > 3) {
          args.pop(); // no capture
        }
      } else if (len === 3) {
        args.push(false);
      }
      return args;
    }

    function apply(args, sType) {
      var element = args.shift(),
          method = [evt[sType]];
      if (old) {
        element[method](args[0], args[1]);
      } else {
        element[method].apply(element, args);
      }
    }

    function add() {
      apply(getArgs(arguments), 'add');
    }

    function remove() {
      apply(getArgs(arguments), 'remove');
    }

    return {
      'add': add,
      'remove': remove
    };

  }());

  _html5OK = function(iO) {
    return (!iO.serverURL && (iO.type?_html5CanPlay({type:iO.type}):_html5CanPlay({url:iO.url})||_s.html5Only)); // Use type, if specified. If HTML5-only mode, no other options, so just give 'er
  };

  _html5CanPlay = function(o) {

    /*
     * try to find MIME, test and return truthiness
     * o = {
     *  url: 'audio/mp3',
     *  type: 'audio/mp3'
     * }
    */

    if (!_s.useHTML5Audio || !_s.hasHTML5) {
      return false;
    }

    var url = (o.url || null),
        mime = (o.type || null),
        aF = _s.audioFormats,
        result,
        offset,
        fileExt,
        item;

    function preferFlashCheck(kind) {
      // whether flash should play a given type
      return (_s.preferFlash && !_s.ignoreFlash && (typeof _s.flash[kind] !== 'undefined' && _s.flash[kind]));
    }

    // account for known cases like audio/mp3
    if (mime && _s.html5[mime] !== 'undefined') {
      return (_s.html5[mime] && !preferFlashCheck(mime));
    }

    if (!_html5Ext) {
      _html5Ext = [];
      for (item in aF) {
        if (aF.hasOwnProperty(item)) {
          _html5Ext.push(item);
          if (aF[item].related) {
            _html5Ext = _html5Ext.concat(aF[item].related);
          }
        }
      }
      _html5Ext = new RegExp('\\.('+_html5Ext.join('|')+')','i');
    }

    fileExt = (url ? url.toLowerCase().match(_html5Ext) : null); // TODO: Strip URL queries, etc.

    if (!fileExt || !fileExt.length) {
      if (!mime) {
        return false;
      } else {
        // audio/mp3 -> mp3, result should be known
        offset = mime.indexOf(';');
        fileExt = (offset !== -1?mime.substr(0,offset):mime).substr(6); // strip "audio/X; codecs.."
      }
    } else {
      fileExt = fileExt[0].substr(1); // "mp3", for example
    }

    if (fileExt && typeof _s.html5[fileExt] !== 'undefined') {
      // result known
      return (_s.html5[fileExt] && !preferFlashCheck(fileExt));
    } else {
      mime = 'audio/'+fileExt;
      result = _s.html5.canPlayType({type:mime});
      _s.html5[fileExt] = result;
      // //_s._wD('canPlayType, found result: '+result);
      return (result && _s.html5[mime] && !preferFlashCheck(mime));
    }

  };

  _testHTML5 = function() {

    if (!_s.useHTML5Audio || typeof Audio === 'undefined') {
      return false;
    }

    // double-whammy: Opera 9.64 throws WRONG_ARGUMENTS_ERR if no parameter passed to Audio(), and Webkit + iOS happily tries to load "null" as a URL. :/
    var a = (typeof Audio !== 'undefined' ? (_isOpera ? new Audio(null) : new Audio()) : null), item, support = {}, aF, i, _hasFlash = _detectFlash();

    function _cp(m) {
      var canPlay, i, j, isOK = false;
      if (!a || typeof a.canPlayType !== 'function') {
        return false;
      }
      if (m instanceof Array) {
        // iterate through all mime types, return any successes
        for (i=0, j=m.length; i<j && !isOK; i++) {
          if (_s.html5[m[i]] || a.canPlayType(m[i]).match(_s.html5Test)) {
            isOK = true;
            _s.html5[m[i]] = true;
            // if flash can play and preferred, also mark it for use.
            _s.flash[m[i]] = !!(_s.preferFlash && m[i].match(_flashMIME));
          }
        }
        return isOK;
      } else {
        canPlay = (a && typeof a.canPlayType === 'function' ? a.canPlayType(m) : false);
        return !!(canPlay && (canPlay.match(_s.html5Test)));
      }
    }

    // test all registered formats + codecs
    aF = _s.audioFormats;
    for (item in aF) {
      if (aF.hasOwnProperty(item)) {
        support[item] = _cp(aF[item].type);
        support['audio/'+item] = support[item]; // write back generic type too, eg. audio/mp3
        // assign flash
        if (_s.preferFlash && !_s.ignoreFlash && item.match(_flashMIME)) {
          _s.flash[item] = true;
        } else {
          _s.flash[item] = false;
        }
        // assign result to related formats, too
        if (aF[item] && aF[item].related) {
          for (i=aF[item].related.length; i--;) {
            support['audio/'+aF[item].related[i]] = support[item]; // eg. audio/m4a
            _s.html5[aF[item].related[i]] = support[item];
            _s.flash[aF[item].related[i]] = support[item];
          }
        }
      }
    }

    support.canPlayType = (a?_cp:null);
    _s.html5 = _mixin(_s.html5, support);
    return true;

  };

  _strings = {
    /*
    notReady: 'Not loaded yet - wait for soundManager.onload()/onready()',
    notOK: 'Audio support is not available.',
    appXHTML: _smc + 'createMovie(): appendChild/innerHTML set failed. May be app/xhtml+xml DOM-related.',
    spcWmode: _smc + 'createMovie(): Removing wmode, preventing known SWF loading issue(s)',
    swf404: _sm + ': Verify that %s is a valid path.',
    tryDebug: 'Try ' + _sm + '.debugFlash = true for more security details (output goes to SWF.)',
    checkSWF: 'See SWF output for more debug info.',
    localFail: _sm + ': Non-HTTP page (' + _doc.location.protocol + ' URL?) Review Flash player security settings for this special case:\nhttp://www.macromedia.com/support/documentation/en/flashplayer/help/settings_manager04.html\nMay need to add/allow path, eg. c:/sm2/ or /users/me/sm2/',
    waitFocus: _sm + ': Special case: Waiting for focus-related event..',
    waitImpatient: _sm + ': Getting impatient, still waiting for Flash%s...',
    waitForever: _sm + ': Waiting indefinitely for Flash (will recover if unblocked)...',
    needFunction: _sm + ': Function object expected for %s',
    badID: 'Warning: Sound ID "%s" should be a string, starting with a non-numeric character',
    noMS: 'MovieStar mode not enabled. Exiting.',
    currentObj: '--- ' + _sm + '._debug(): Current sound objects ---',
    waitEI: _smc + 'initMovie(): Waiting for ExternalInterface call from Flash..',
    waitOnload: _sm + ': Waiting for window.onload()',
    docLoaded: _sm + ': Document already loaded',
    onload: _smc + 'initComplete(): calling soundManager.onload()',
    onloadOK: _sm + '.onload() complete',
    init: _smc + 'init()',
    didInit: _smc + 'init(): Already called?',
    flashJS: _sm + ': Attempting to call Flash from JS..',
    noPolling: _sm + ': Polling (whileloading()/whileplaying() support) is disabled.',
    secNote: 'Flash security note: Network/internet URLs will not load due to security restrictions. Access can be configured via Flash Player Global Security Settings Page: http://www.macromedia.com/support/documentation/en/flashplayer/help/settings_manager04.html',
    badRemove: 'Warning: Failed to remove flash movie.',
    noPeak: 'Warning: peakData features unsupported for movieStar formats',
    shutdown: _sm + '.disable(): Shutting down',
    queue: _sm + ': Queueing %s handler',
    smFail: _sm + ': Failed to initialise.',
    smError: 'SMSound.load(): Exception: JS-Flash communication failed, or JS error.',
    fbTimeout: 'No flash response, applying .'+_s.swfCSS.swfTimedout+' CSS..',
    fbLoaded: 'Flash loaded',
    fbHandler: _smc+'flashBlockHandler()',
    manURL: 'SMSound.load(): Using manually-assigned URL',
    onURL: _sm + '.load(): current URL already assigned.',
    badFV: _sm + '.flashVersion must be 8 or 9. "%s" is invalid. Reverting to %s.',
    as2loop: 'Note: Setting stream:false so looping can work (flash 8 limitation)',
    noNSLoop: 'Note: Looping not implemented for MovieStar formats',
    needfl9: 'Note: Switching to flash 9, required for MP4 formats.',
    mfTimeout: 'Setting flashLoadTimeout = 0 (infinite) for off-screen, mobile flash case',
    mfOn: 'mobileFlash::enabling on-screen flash repositioning',
    policy: 'Enabling usePolicyFile for data access'
    */
  };

  _str = function() { // o [,items to replace]
    /*
    var args = _slice.call(arguments), // real array, please
    o = args.shift(), // first arg
    str = (_strings && _strings[o]?_strings[o]:''), i, j;
    if (str && args && args.length) {
      for (i = 0, j = args.length; i < j; i++) {
        str = str.replace('%s', args[i]);
      }
    }
    return str;
    */
  };

  _loopFix = function(sOpt) {
    // flash 8 requires stream = false for looping to work
    if (_fV === 8 && sOpt.loops > 1 && sOpt.stream) {
      //_wDS('as2loop');
      sOpt.stream = false;
    }
    return sOpt;
  };

  _policyFix = function(sOpt, sPre) {
    if (sOpt && !sOpt.usePolicyFile && (sOpt.onid3 || sOpt.usePeakData || sOpt.useWaveformData || sOpt.useEQData)) {
      //_s._wD((sPre?sPre+':':'') + _str('policy'));
      sOpt.usePolicyFile = true;
    }
    return sOpt;
  };

  _complain = function(sMsg) {
    if (typeof console !== 'undefined' && typeof console.warn !== 'undefined') {
      console.warn(sMsg);
    } else {
      //_s._wD(sMsg);
    }
  };

  _doNothing = function() {
    return false;
  };

  _disableObject = function(o) {
    for (var oProp in o) {
      if (o.hasOwnProperty(oProp) && typeof o[oProp] === 'function') {
        o[oProp] = _doNothing;
      }
    }
    oProp = null;
  };

  _failSafely = function(bNoDisable) {
    // general failure exception handler
    if (typeof bNoDisable === 'undefined') {
      bNoDisable = false;
    }
    if (_disabled || bNoDisable) {
      //_wDS('smFail', 2);
      _s.disable(bNoDisable);
    }
  };

  _normalizeMovieURL = function(smURL) {
    var urlParams = null;
    if (smURL) {
      if (smURL.match(/\.swf(\?.*)?$/i)) {
        urlParams = smURL.substr(smURL.toLowerCase().lastIndexOf('.swf?') + 4);
        if (urlParams) {
          return smURL; // assume user knows what they're doing
        }
      } else if (smURL.lastIndexOf('/') !== smURL.length - 1) {
        smURL = smURL + '/';
      }
    }
    return (smURL && smURL.lastIndexOf('/') !== - 1?smURL.substr(0, smURL.lastIndexOf('/') + 1):'./') + _s.movieURL;
  };

  _setVersionInfo = function() {
    if (_fV !== 8 && _fV !== 9) {
      //_s._wD(_str('badFV', _fV, _defaultFlashVersion));
      _s.flashVersion = _defaultFlashVersion;
    }
    var isDebug = (_s.debugMode || _s.debugFlash?'_debug.swf':'.swf'); // debug flash movie, if applicable
    if (_s.useHTML5Audio && !_s.html5Only && _s.audioFormats.mp4.required && _s.flashVersion < 9) {
      //_s._wD(_str('needfl9'));
      _s.flashVersion = 9;
    }
    _fV = _s.flashVersion; // short-hand for internal use
    _s.version = _s.versionNumber + (_s.html5Only?' (HTML5-only mode)':(_fV === 9?' (AS3/Flash 9)':' (AS2/Flash 8)'));
    // set up default options
    if (_fV > 8) {
      _s.defaultOptions = _mixin(_s.defaultOptions, _s.flash9Options);
      _s.features.buffering = true;
    }
    if (_fV > 8 && _s.useMovieStar) {
      // flash 9+ support for movieStar formats as well as MP3
      _s.defaultOptions = _mixin(_s.defaultOptions, _s.movieStarOptions);
      _s.filePatterns.flash9 = new RegExp('\\.(mp3|' + _s.netStreamTypes.join('|') + ')(\\?.*)?$', 'i');
      _s.mimePattern = _s.netStreamMimeTypes;
      _s.features.movieStar = true;
    } else {
      _s.useMovieStar = false;
      _s.features.movieStar = false;
    }
    _s.filePattern = _s.filePatterns[(_fV !== 8?'flash9':'flash8')];
    _s.movieURL = (_fV === 8?'soundmanager2.swf':'soundmanager2_flash9.swf').replace('.swf',isDebug);
    _s.features.peakData = _s.features.waveformData = _s.features.eqData = (_fV > 8);
  };

  _setPolling = function(bPolling, bHighPerformance) {
    if (!_s.o || !_s.allowPolling) {
      return false;
    }
    _s.o._setPolling(bPolling, bHighPerformance);
  };

  function _initDebug() {
    if (_s.debugURLParam.test(_wl)) {
      _s.debugMode = true; // allow force of debug mode via URL
    }
    /*
    if (_id(_s.debugID)) {
      return false;
    }
    var oD, oDebug, oTarget, oToggle, tmp;
    if (_s.debugMode && !_id(_s.debugID) && ((!_hasConsole || !_s.useConsole) || (_s.useConsole && _hasConsole && !_s.consoleOnly))) {
      oD = _doc.createElement('div');
      oD.id = _s.debugID + '-toggle';
      oToggle = {
        'position': 'fixed',
        'bottom': '0px',
        'right': '0px',
        'width': '1.2em',
        'height': '1.2em',
        'lineHeight': '1.2em',
        'margin': '2px',
        'textAlign': 'center',
        'border': '1px solid #999',
        'cursor': 'pointer',
        'background': '#fff',
        'color': '#333',
        'zIndex': 10001
      };
      oD.appendChild(_doc.createTextNode('-'));
      oD.onclick = _toggleDebug;
      oD.title = 'Toggle SM2 debug console';
      if (_ua.match(/msie 6/i)) {
        oD.style.position = 'absolute';
        oD.style.cursor = 'hand';
      }
      for (tmp in oToggle) {
        if (oToggle.hasOwnProperty(tmp)) {
          oD.style[tmp] = oToggle[tmp];
        }
      }
      oDebug = _doc.createElement('div');
      oDebug.id = _s.debugID;
      oDebug.style.display = (_s.debugMode?'block':'none');
      if (_s.debugMode && !_id(oD.id)) {
        try {
          oTarget = _getDocument();
          oTarget.appendChild(oD);
        } catch(e2) {
          throw new Error(_str('appXHTML'));
        }
        oTarget.appendChild(oDebug);
      }
    }
    oTarget = null;
    */
  }

  _createMovie = function(smID, smURL) {

    var specialCase = null,
    remoteURL = (smURL?smURL:_s.url),
    localURL = (_s.altURL?_s.altURL:remoteURL),
    oEmbed, oMovie, oTarget = _getDocument(), tmp, movieHTML, oEl, extraClass = _getSWFCSS(), s, x, sClass, side = 'auto', isRTL = null, html = _doc.getElementsByTagName('html')[0];
    isRTL = (html && html.dir && html.dir.match(/rtl/i));
    smID = (typeof smID === 'undefined'?_s.id:smID);

    if (_didAppend && _appendSuccess) {
      return false; // ignore if already succeeded
    }

    function _initMsg() {
      //_s._wD('-- SoundManager 2 ' + _s.version + (!_s.html5Only && _s.useHTML5Audio?(_s.hasHTML5?' + HTML5 audio':', no HTML5 audio support'):'') + (!_s.html5Only ? (_s.useMovieStar?', MovieStar mode':'') + (_s.useHighPerformance?', high performance mode, ':', ') + (( _s.flashPollingInterval ? 'custom (' + _s.flashPollingInterval + 'ms)' : (_s.useFastPolling?'fast':'normal')) + ' polling') + (_s.wmode?', wmode: ' + _s.wmode:'') + (_s.debugFlash?', flash debug mode':'') + (_s.useFlashBlock?', flashBlock mode':'') : '') + ' --', 1);
    }

    if (_s.html5Only) {
      _setVersionInfo();
      _initMsg();
      _s.oMC = _id(_s.movieID);
      _init();
      // prevent multiple init attempts
      _didAppend = true;
      _appendSuccess = true;
      return false;
    }

    _didAppend = true;

    // safety check for legacy (change to Flash 9 URL)
    _setVersionInfo();
    _s.url = _normalizeMovieURL(_s._overHTTP?remoteURL:localURL);
    smURL = _s.url;

    _s.wmode = (!_s.wmode && _s.useHighPerformance && !_s.useMovieStar?'transparent':_s.wmode);

    if (_s.wmode !== null && (_ua.match(/msie 8/i) || (!_isIE && !_s.useHighPerformance)) && navigator.platform.match(/win32|win64/i)) {
      /*
       * extra-special case: movie doesn't load until scrolled into view when using wmode = anything but 'window' here
       * does not apply when using high performance (position:fixed means on-screen), OR infinite flash load timeout
       * wmode breaks IE 8 on Vista + Win7 too in some cases, as of January 2011 (?)
      */
      _s.specialWmodeCase = true;
      //_wDS('spcWmode');
      _s.wmode = null;
    }

    oEmbed = {
      'name': smID,
      'id': smID,
      'src': smURL,
      'width': side,
      'height': side,
      'quality': 'high',
      'allowScriptAccess': _s.allowScriptAccess,
      'bgcolor': _s.bgColor,
      'pluginspage': _s._http+'//www.macromedia.com/go/getflashplayer',
      'type': 'application/x-shockwave-flash',
      'wmode': _s.wmode,
      'hasPriority': 'true' // http://help.adobe.com/en_US/as3/mobile/WS4bebcd66a74275c36cfb8137124318eebc6-7ffd.html
    };

    if (_s.debugFlash) {
      oEmbed.FlashVars = 'debug=1';
    }

    if (!_s.wmode) {
      delete oEmbed.wmode; // don't write empty attribute
    }

    if (_isIE) {
      // IE is "special".
      oMovie = _doc.createElement('div');
      movieHTML = '<object id="' + smID + '" data="' + smURL + '" type="' + oEmbed.type + '" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="'+_s._http+'//download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,40,0" width="' + oEmbed.width + '" height="' + oEmbed.height + '"><param name="movie" value="' + smURL + '" /><param name="AllowScriptAccess" value="' + _s.allowScriptAccess + '" /><param name="quality" value="' + oEmbed.quality + '" />' + (_s.wmode?'<param name="wmode" value="' + _s.wmode + '" /> ':'') + '<param name="bgcolor" value="' + _s.bgColor + '" />' + (_s.debugFlash?'<param name="FlashVars" value="' + oEmbed.FlashVars + '" />':'') + '</object>';
    } else {
      oMovie = _doc.createElement('embed');
      for (tmp in oEmbed) {
        if (oEmbed.hasOwnProperty(tmp)) {
          oMovie.setAttribute(tmp, oEmbed[tmp]);
        }
      }
    }

    _initDebug();
    extraClass = _getSWFCSS();
    oTarget = _getDocument();

    if (oTarget) {

      _s.oMC = _id(_s.movieID)?_id(_s.movieID):_doc.createElement('div');

      if (!_s.oMC.id) {

        _s.oMC.id = _s.movieID;
        _s.oMC.className = _s.swfCSS.swfDefault + ' ' + extraClass;
        // "hide" flash movie
        s = null;
        oEl = null;

        if (!_s.useFlashBlock) {
          if (_s.useHighPerformance) {
            s = {
              'position': 'fixed',
              'width': '8px',
              'height': '8px',
              // >= 6px for flash to run fast, >= 8px to start up under Firefox/win32 in some cases. odd? yes.
              'bottom': '0px',
              'left': '0px',
              'overflow': 'hidden'
            };
          } else {
            s = {
              'position': 'absolute',
              'width': '6px',
              'height': '6px',
              'top': '-9999px',
              'left': '-9999px'
            };
            if (isRTL) {
              s.left = Math.abs(parseInt(s.left,10))+'px';
            }
          }
        }

        if (_isWebkit) {
          _s.oMC.style.zIndex = 10000; // soundcloud-reported render/crash fix, safari 5
        }

        if (!_s.debugFlash) {
          for (x in s) {
            if (s.hasOwnProperty(x)) {
              _s.oMC.style[x] = s[x];
            }
          }
        }

        try {
          if (!_isIE) {
            _s.oMC.appendChild(oMovie);
          }
          oTarget.appendChild(_s.oMC);
          if (_isIE) {
            oEl = _s.oMC.appendChild(_doc.createElement('div'));
            oEl.className = _s.swfCSS.swfBox;
            oEl.innerHTML = movieHTML;
          }
          _appendSuccess = true;
        } catch(e) {
          throw new Error(_str('appXHTML'));
        }

      } else {

        // it's already in the document.
        sClass = _s.oMC.className;
        _s.oMC.className = (sClass?sClass+' ':_s.swfCSS.swfDefault) + (extraClass?' '+extraClass:'');
        _s.oMC.appendChild(oMovie);
        if (_isIE) {
          oEl = _s.oMC.appendChild(_doc.createElement('div'));
          oEl.className = _s.swfCSS.swfBox;
          oEl.innerHTML = movieHTML;
        }
        _appendSuccess = true;

      }

    }

    if (specialCase) {
      //_s._wD(specialCase);
    }

    _initMsg();
    //_s._wD(_smc+'createMovie(): Trying to load ' + smURL + (!_s._overHTTP && _s.altURL?' (alternate URL)':''), 1);

    return true;

  };

  _idCheck = this.getSoundById;

  _initMovie = function() {

    if (_s.html5Only) {
      _createMovie();
      return false;
    }

    // attempt to get, or create, movie
    if (_s.o) {
      return false; // may already exist
    }

    _s.o = _s.getMovie(_s.id); // inline markup

    if (!_s.o) {
      if (!_oRemoved) {
        // try to create
        _createMovie(_s.id, _s.url);
      } else {
        // try to re-append removed movie after reboot()
        if (!_isIE) {
          _s.oMC.appendChild(_oRemoved);
        } else {
          _s.oMC.innerHTML = _oRemovedHTML;
        }
        _oRemoved = null;
        _didAppend = true;
      }
      _s.o = _s.getMovie(_s.id);
    }

    if (_s.o) {
      //_wDS('waitEI');
    }

    if (_s.oninitmovie instanceof Function) {
      setTimeout(_s.oninitmovie, 1);
    }

    return true;

  };

  _go = function(sURL) {
    // where it all begins.
    if (sURL) {
      _s.url = sURL;
    }
    _initMovie();
  };

  _delayWaitForEI = function() {
    setTimeout(_waitForEI, 1000);
  };

  _waitForEI = function() {

    if (_waitingForEI) {
      return false;
    }

    _waitingForEI = true;
    _event.remove(_win, 'load', _delayWaitForEI);

    if (_tryInitOnFocus && !_isFocused) {
      //_wDS('waitFocus');
      return false;
    }

    var p;
    if (!_didInit) {
      p = _s.getMoviePercent();
      //_s._wD(_str('waitImpatient', (p === 100?' (SWF loaded)':(p > 0?' (SWF ' + p + '% loaded)':''))));
    }

    setTimeout(function() {

      p = _s.getMoviePercent();

      if (!_didInit) {

        //_s._wD(_sm + ': No Flash response within expected time.\nLikely causes: ' + (p === 0?'Loading ' + _s.movieURL + ' may have failed (and/or Flash ' + _fV + '+ not present?), ':'') + 'Flash blocked or JS-Flash security error.' + (_s.debugFlash?' ' + _str('checkSWF'):''), 2);
        if (!_s._overHTTP && p) {
          //_wDS('localFail', 2);
          if (!_s.debugFlash) {
            //_wDS('tryDebug', 2);
          }
        }

        if (p === 0) {
          // if 0 (not null), probably a 404.
          //_s._wD(_str('swf404', _s.url));
        }

        //_debugTS('flashtojs', false, ': Timed out' + _s._overHTTP?' (Check flash security or flash blockers)':' (No plugin/missing SWF?)');

      }

      // give up / time-out, depending
      if (!_didInit && _okToDisable) {

        if (p === null) {
          // SWF failed. Maybe blocked.
          if (_s.useFlashBlock || _s.flashLoadTimeout === 0) {
            if (_s.useFlashBlock) {
              _flashBlockHandler();
            }
            //_wDS('waitForever');
          } else {
            // old SM2 behaviour, simply fail
            _failSafely(true);
          }

        } else {

          // flash loaded? Shouldn't be a blocking issue, then.
          if (_s.flashLoadTimeout === 0) {
             //_wDS('waitForever');
          } else {
            _failSafely(true);
          }

        }

      }

    }, _s.flashLoadTimeout);

  };

  _go = function(sURL) {
    // where it all begins.
    if (sURL) {
      _s.url = sURL;
    }
    _initMovie();
  };

  /*
  _wDS = function(o, errorLevel) {
    if (!o) {
      return '';
    } else {
      return //_s._wD(_str(o), errorLevel);
    }
  };

  if (_wl.indexOf('debug=alert') + 1 && _s.debugMode) {
    _s._wD = function(sText) {window.alert(sText);};
  }

  _toggleDebug = function() {
    var o = _id(_s.debugID),
    oT = _id(_s.debugID + '-toggle');
    if (!o) {
      return false;
    }
    if (_debugOpen) {
      // minimize
      oT.innerHTML = '+';
      o.style.display = 'none';
    } else {
      oT.innerHTML = '-';
      o.style.display = 'block';
    }
    _debugOpen = !_debugOpen;
  };

  _debugTS = function(sEventType, bSuccess, sMessage) {
    // troubleshooter debug hooks
    if (typeof sm2Debugger !== 'undefined') {
      try {
        sm2Debugger.handleEvent(sEventType, bSuccess, sMessage);
      } catch(e) {
        // oh well
      }
    }
    return true;
  };
  */

  _getSWFCSS = function() {
    var css = [];
    if (_s.debugMode) {
      css.push(_s.swfCSS.sm2Debug);
    }
    if (_s.debugFlash) {
      css.push(_s.swfCSS.flashDebug);
    }
    if (_s.useHighPerformance) {
      css.push(_s.swfCSS.highPerf);
    }
    return css.join(' ');
  };

  _flashBlockHandler = function() {
    // *possible* flash block situation.
    var name = _str('fbHandler'), p = _s.getMoviePercent(), css = _s.swfCSS;
    if (!_s.ok()) {
      if (_needsFlash) {
        // make the movie more visible, so user can fix
        _s.oMC.className = _getSWFCSS() + ' ' + css.swfDefault + ' ' + (p === null?css.swfTimedout:css.swfError);
        //_s._wD(name+': '+_str('fbTimeout')+(p?' ('+_str('fbLoaded')+')':''));
      }
      _s.didFlashBlock = true;
      _processOnEvents({type:'ontimeout',ignoreInit:true}); // fire onready(), complain lightly
      if (_s.onerror instanceof Function) {
        _s.onerror.apply(_win);
      }
    } else {
      // SM2 loaded OK (or recovered)
      if (_s.didFlashBlock) {
        //_s._wD(name+': Unblocked');
      }
      if (_s.oMC) {
        _s.oMC.className = [_getSWFCSS(), css.swfDefault, css.swfLoaded + (_s.didFlashBlock?' '+css.swfUnblocked:'')].join(' ');
      }
    }
  };

  _handleFocus = function() {
    function cleanup() {
      _event.remove(_win, 'focus', _handleFocus);
      _event.remove(_win, 'load', _handleFocus);
    }
    if (_isFocused || !_tryInitOnFocus) {
      cleanup();
      return true;
    }
    _okToDisable = true;
    _isFocused = true;
    //_s._wD(_smc+'handleFocus()');
    if (_isSafari && _tryInitOnFocus) {
      // giant Safari 3.1 hack - assume mousemove = focus given lack of focus event
      _event.remove(_win, 'mousemove', _handleFocus);
    }
    // allow init to restart
    _waitingForEI = false;
    cleanup();
    return true;
  };

  _initComplete = function(bNoDisable) {
    if (_didInit) {
      return false;
    }
    if (_s.html5Only) {
      // all good.
      //_s._wD('-- SoundManager 2: loaded --');
      _didInit = true;
      _processOnEvents();
      _initUserOnload();
      return true;
    }
    var sClass = _s.oMC.className,
    wasTimeout = (_s.useFlashBlock && _s.flashLoadTimeout && !_s.getMoviePercent());
    if (!wasTimeout) {
      _didInit = true;
    }
    //_s._wD('-- SoundManager 2 ' + (_disabled?'failed to load':'loaded') + ' (' + (_disabled?'security/load error':'OK') + ') --', 1);
    if (_disabled || bNoDisable) {
      if (_s.useFlashBlock) {
        _s.oMC.className = _getSWFCSS() + ' ' + (_s.getMoviePercent() === null?_s.swfCSS.swfTimedout:_s.swfCSS.swfError);
      }
      _processOnEvents({type:'ontimeout'});
      //_debugTS('onload', false);
      if (_s.onerror instanceof Function) {
        _s.onerror.apply(_win);
      }
      return false;
    } else {
      //_debugTS('onload', true);
    }
    _event.add(_win, 'unload', _doNothing); // prevent browser from showing cached state via back button, because flash will be dead
    if (_s.waitForWindowLoad && !_windowLoaded) {
      //_wDS('waitOnload');
      _event.add(_win, 'load', _initUserOnload);
      return false;
    } else {
      if (_s.waitForWindowLoad && _windowLoaded) {
        //_wDS('docLoaded');
      }
      _initUserOnload();
    }
    return true;
  };

  _addOnEvent = function(sType, oMethod, oScope) {
    if (typeof _on_queue[sType] === 'undefined') {
      _on_queue[sType] = [];
    }
    _on_queue[sType].push({
      'method': oMethod,
      'scope': (oScope || null),
      'fired': false
    });
  };

  _processOnEvents = function(oOptions) {
    if (!oOptions) { // assume onready, if unspecified
      oOptions = {
        type: 'onready'
      };
    }
    if (!_didInit && oOptions && !oOptions.ignoreInit) {
      // not ready yet.
      return false;
    }
    if (oOptions.type === 'ontimeout' && _s.ok()) {
      // invalid case
      return false;
    }
    var status = {
      success: (oOptions && oOptions.ignoreInit?_s.ok():!_disabled)
    },
    srcQueue = (oOptions && oOptions.type?_on_queue[oOptions.type]||[]:[]), // queue specified by type, or none
    queue = [], i, j,
    canRetry = (_needsFlash && _s.useFlashBlock && !_s.ok());
    for (i = 0; i < srcQueue.length; i++) {
      if (srcQueue[i].fired !== true) {
        queue.push(srcQueue[i]);
      }
    }
    if (queue.length) {
      //_s._wD(_sm + ': Firing ' + queue.length + ' '+oOptions.type+'() item' + (queue.length === 1?'':'s'));
      for (i = 0, j = queue.length; i < j; i++) {
        if (queue[i].scope) {
          queue[i].method.apply(queue[i].scope, [status]);
        } else {
          queue[i].method(status);
        }
        if (!canRetry) { // flashblock case doesn't count here
          queue[i].fired = true;
        }
      }
    }
    return true;
  };

  _initUserOnload = function() {
    _win.setTimeout(function() {
      if (_s.useFlashBlock) {
        _flashBlockHandler();
      }
      _processOnEvents();
      // call user-defined "onload", scoped to window
      if (_s.onload instanceof Function) {
        //_wDS('onload', 1);
        _s.onload.apply(_win);
        //_wDS('onloadOK', 1);
      }
      if (_s.waitForWindowLoad) {
        _event.add(_win, 'load', _initUserOnload);
      }
    },1);
  };

  _detectFlash = function() {

    // hat tip: Flash Detect library (BSD, (C) 2007) by Carl "DocYes" S. Yestrau - http://featureblend.com/javascript-flash-detection-library.html / http://featureblend.com/license.txt

    if (_hasFlash !== undefined) {
      // this work has already been done.
      return _hasFlash;
    }

    var hasPlugin = false, n = navigator, nP = n.plugins, obj, type, types, AX = _win.ActiveXObject;

    if (nP && nP.length) {

      type = 'application/x-shockwave-flash';
      types = n.mimeTypes;
      if (types && types[type] && types[type].enabledPlugin && types[type].enabledPlugin.description) {
        hasPlugin = true;
      }

    } else if (typeof AX !== 'undefined') {

      try {
        obj = new AX('ShockwaveFlash.ShockwaveFlash');
      } catch(e) {
        // oh well
      }
      hasPlugin = (!!obj);

    }

    _hasFlash = hasPlugin;

    return hasPlugin;

  };

  _featureCheck = function() {

    var needsFlash, item,

    isSpecial = (_ua.match(/iphone os (1|2|3_0|3_1)/i)?true:false); // iPhone <= 3.1 has broken HTML5 audio(), but firmware 3.2 (iPad) + iOS4 works.

    if (isSpecial) {
      _s.hasHTML5 = false; // has Audio(), but is broken; let it load links directly.
      _s.html5Only = true; // ignore flash case, however
      if (_s.oMC) {
        _s.oMC.style.display = 'none';
      }
      return false;
    }

    if (_s.useHTML5Audio) {
      if (!_s.html5 || !_s.html5.canPlayType) {
        //_s._wD('SoundManager: No HTML5 Audio() support detected.');
        _s.hasHTML5 = false;
        return true;
      } else {
        _s.hasHTML5 = true;
      }
      if (_isBadSafari) {
        //_s._wD(_smc+'Note: Buggy HTML5 Audio in Safari on this OS X release, see https://bugs.webkit.org/show_bug.cgi?id=32159 - '+(!_hasFlash?' would use flash fallback for MP3/MP4, but none detected.':'will use flash fallback for MP3/MP4, if available'),1);
        if (_detectFlash()) {
          return true;
        }
      }
    } else {
      // flash required.
      return true;
    }

    for (item in _s.audioFormats) {
      if (_s.audioFormats.hasOwnProperty(item)) {
        if ( (_s.audioFormats[item].required && !_s.html5.canPlayType(_s.audioFormats[item].type)) || _s.flash[item] || _s.flash[_s.audioFormats[item].type]) {
          // flash may be required, or preferred for this format
          needsFlash = true;
        }
      }
    }

    // sanity check..
    if (_s.ignoreFlash) {
      needsFlash = false;
    }

    _s.html5Only = (_s.useHTML5Audio && _s.hasHTML5 && !needsFlash && !_s.requireFlash);
    return (_detectFlash() && needsFlash);

  };

  _init = function() {

    var item, tests = [];
    //_wDS('init');

    // called after onload()
    if (_didInit) {
      //_wDS('didInit');
      return false;
    }

    function _cleanup() {
      _event.remove(_win, 'load', _s.beginDelayedInit);
    }

    if (_s.hasHTML5) {
      for (item in _s.audioFormats) {
        if (_s.audioFormats.hasOwnProperty(item)) {
          tests.push(item+': '+_s.html5[item] + (_s.preferFlash && _s.flash[item] ? ' (preferring flash)':''));
        }
      }
      //_s._wD('-- SoundManager 2: HTML5 support tests ('+_s.html5Test+'): '+tests.join(', ')+' --',1);
    }

    if (_s.html5Only) {
      if (!_didInit) {
        // we don't need no steenking flash!
        _cleanup();
        _s.enabled = true;
        _initComplete();
      }
      return true;
    }

    // flash path
    _initMovie();

    try {
      //_wDS('flashJS');
      _s.o._externalInterfaceTest(false); // attempt to talk to Flash
      if (!_s.allowPolling) {
        //_wDS('noPolling', 1);
      } else {
        _setPolling(true, _s.flashPollingInterval ? _s.flashPollingInterval : (_s.useFastPolling ? 10 : 50));
      }
      if (!_s.debugMode) {
        _s.o._disableDebug();
      }
      _s.enabled = true;
      //_debugTS('jstoflash', true);
    } catch(e) {
      //_s._wD('js/flash exception: ' + e.toString());
      //_debugTS('jstoflash', false);
      _failSafely(true); // don't disable, for reboot()
      _initComplete();
      return false;
    }

    _initComplete();
    // event cleanup
    _cleanup();
    return true;

  };

  _beginInit = function() {
    if (_initPending) {
      return false;
    }
    _createMovie();
    _initMovie();
    _initPending = true;
    return true;
  };

  _dcLoaded = function() {
    if (_didDCLoaded) {
      return false;
    }
    _didDCLoaded = true;
    _initDebug();
    if (!_s.useHTML5Audio) {
      if (!_detectFlash()) {
        //_s._wD('SoundManager: No Flash detected, trying HTML5');
        _s.useHTML5Audio = true;
      }
    }
    _testHTML5();
    _s.html5.usingFlash = _featureCheck();
    _needsFlash = _s.html5.usingFlash;
    _didDCLoaded = true;
    if (_doc.removeEventListener) {
      _doc.removeEventListener('DOMContentLoaded', _dcLoaded, false);
    }
    _go();
    return true;
  };

  _startTimer = function(oSound) {
    if (!oSound._hasTimer) {
      oSound._hasTimer = true;
    }
  };

  _stopTimer = function(oSound) {
    if (oSound._hasTimer) {
      oSound._hasTimer = false;
    }
  };

  _die = function() {
    if (_s.onerror instanceof Function) {
      _s.onerror();
    }
    _s.disable();
  };

  _badSafariFix = function() {
    // special case: "bad" Safari can fall back to flash for MP3/MP4
    if (!_isBadSafari || !_detectFlash()) {
      return false; // doesn't apply
    }
    var aF = _s.audioFormats, i, item;
    for (item in aF) {
      if (aF.hasOwnProperty(item)) {
        if (item === 'mp3' || item === 'mp4') {
          //_s._wD(_sm+': Using flash fallback for '+item+' format');
          _s.html5[item] = false;
          // assign result to related formats, too
          if (aF[item] && aF[item].related) {
            for (i = aF[item].related.length; i--;) {
              _s.html5[aF[item].related[i]] = false;
            }
          }
        }
      }
    }
  };

  // pseudo-private methods called by Flash

  this._setSandboxType = function(sandboxType) {
    /*
    var sb = _s.sandbox;
    sb.type = sandboxType;
    sb.description = sb.types[(typeof sb.types[sandboxType] !== 'undefined'?sandboxType:'unknown')];
    //_s._wD('Flash security sandbox type: ' + sb.type);
    if (sb.type === 'localWithFile') {
      sb.noRemote = true;
      sb.noLocal = false;
      //_wDS('secNote', 2);
    } else if (sb.type === 'localWithNetwork') {
      sb.noRemote = false;
      sb.noLocal = true;
    } else if (sb.type === 'localTrusted') {
      sb.noRemote = false;
      sb.noLocal = false;
    }
    */
  };

  this._externalInterfaceOK = function(flashDate) {
    // flash callback confirming flash loaded, EI working etc.
    // flashDate = approx. timing/delay info for JS/flash bridge
    if (_s.swfLoaded) {
      return false;
    }
    var eiTime = new Date().getTime();
    //_s._wD(_smc+'externalInterfaceOK()' + (flashDate?' (~' + (eiTime - flashDate) + ' ms)':''));
    //_debugTS('swf', true);
    //_debugTS('flashtojs', true);
    _s.swfLoaded = true;
    _tryInitOnFocus = false;
    if (_isBadSafari) {
      _badSafariFix();
    }
    if (_isIE) {
      // IE needs a timeout OR delay until window.onload - may need TODO: investigating
      setTimeout(_init, 100);
    } else {
      _init();
    }
  };

  _dcIE = function() {
    if (_doc.readyState === 'complete') {
      _dcLoaded();
      _doc.detachEvent('onreadystatechange', _dcIE);
    }
    return true;
  };

  // focus and window load, init
  if (!_s.hasHTML5 || _needsFlash) {
    // only applies to Flash mode
    _event.add(_win, 'focus', _handleFocus);
    _event.add(_win, 'load', _handleFocus);
    _event.add(_win, 'load', _delayWaitForEI);
    if (_isSafari && _tryInitOnFocus) {
      _event.add(_win, 'mousemove', _handleFocus); // massive Safari focus hack
    }
  }

  if (_doc.addEventListener) {
    _doc.addEventListener('DOMContentLoaded', _dcLoaded, false);
  } else if (_doc.attachEvent) {
    _doc.attachEvent('onreadystatechange', _dcIE);
  } else {
    // no add/attachevent support - safe to assume no JS -> Flash either
    //_debugTS('onload', false);
    _die();
  }

  if (_doc.readyState === 'complete') {
    setTimeout(_dcLoaded,100);
  }

} // SoundManager()

// SM2_DEFER details: http://www.schillmania.com/projects/soundmanager2/doc/getstarted/#lazy-loading
if (typeof SM2_DEFER === 'undefined' || !SM2_DEFER) {
  soundManager = new SoundManager();
}

// public interfaces
window.SoundManager = SoundManager; // constructor
window.soundManager = soundManager; // public API, flash callbacks etc

}(window));
