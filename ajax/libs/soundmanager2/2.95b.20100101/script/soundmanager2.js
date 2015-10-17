/*!
   SoundManager 2: Javascript Sound for the Web
   --------------------------------------------
   http://schillmania.com/projects/soundmanager2/

   Copyright (c) 2007, Scott Schiller. All rights reserved.
   Code provided under the BSD License:
   http://schillmania.com/projects/soundmanager2/license.txt

   V2.95b.20100101
*/

/*jslint undef: true, bitwise: true, newcap: true, immed: true */

var soundManager = null;

function SoundManager(smURL, smID) {

  this.flashVersion = 8;           // version of flash to require, either 8 or 9. Some API features require Flash 9.
  this.debugMode = true;           // enable debugging output (div#soundmanager-debug, OR console if available+configured)
  this.debugFlash = false;         // enable debugging output inside SWF, troubleshoot Flash/browser issues
  this.useConsole = true;          // use firebug/safari console.log()-type debug console if available
  this.consoleOnly = false;        // if console is being used, do not create/write to #soundmanager-debug
  this.waitForWindowLoad = false;  // force SM2 to wait for window.onload() before trying to call soundManager.onload()
  this.nullURL = 'null.mp3';       // path to "null" (empty) MP3 file, used to unload sounds (Flash 8 only)
  this.allowPolling = true;        // allow flash to poll for status update (required for whileplaying() events, peak, sound spectrum functions to work.)
  this.useFastPolling = false;     // uses 1 msec flash timer interval (vs. default of 20) for higher callback frequency, best combined with useHighPerformance
  this.useMovieStar = false;	   // enable support for Flash 9.0r115+ (codename "MovieStar") MPEG4 audio+video formats (AAC, M4V, FLV, MOV etc.)
  this.bgColor = '#ffffff';        // movie (.swf) background color, '#000000' useful if showing on-screen/full-screen video etc.
  this.useHighPerformance = false; // position:fixed flash movie can help increase js/flash speed, minimize lag
  this.flashLoadTimeout = 1000;    // msec to wait for flash movie to load before failing (0 = infinity)
  this.wmode = null;		       // mode to render the flash movie in - null, transparent, opaque (last two allow layering of HTML on top)
  this.allowFullScreen = true;     // enter full-screen (via double-click on movie) for flash 9+ video
  this.allowScriptAccess = 'always'; // for scripting the SWF (object/embed property), either 'always' or 'sameDomain'

  this.defaultOptions = {
    'autoLoad': false,             // enable automatic loading (otherwise .load() will be called on demand with .play(), the latter being nicer on bandwidth - if you want to .load yourself, you also can)
    'stream': true,                // allows playing before entire file has loaded (recommended)
    'autoPlay': false,             // enable playing of file as soon as possible (much faster if "stream" is true)
    'onid3': null,                 // callback function for "ID3 data is added/available"
    'onload': null,                // callback function for "load finished"
    'whileloading': null,          // callback function for "download progress update" (X of Y bytes received)
    'onplay': null,                // callback for "play" start
    'onpause': null,               // callback for "pause"
    'onresume': null,              // callback for "resume" (pause toggle)
    'whileplaying': null,          // callback during play (position update)
    'onstop': null,                // callback for "user stop"
    'onfinish': null,              // callback function for "sound finished playing"
    'onbeforefinish': null,        // callback for "before sound finished playing (at [time])"
    'onbeforefinishtime': 5000,    // offset (milliseconds) before end of sound to trigger beforefinish (eg. 1000 msec = 1 second)
    'onbeforefinishcomplete':null, // function to call when said sound finishes playing
    'onjustbeforefinish':null,     // callback for [n] msec before end of current sound
    'onjustbeforefinishtime':200,  // [n] - if not using, set to 0 (or null handler) and event will not fire.
    'multiShot': true,             // let sounds "restart" or layer on top of each other when played multiple times, rather than one-shot/one at a time
    'multiShotEvents': false,      // fire multiple sound events (currently onfinish() only) when multiShot is enabled
    'position': null,              // offset (milliseconds) to seek to within loaded sound data.
    'pan': 0,                      // "pan" settings, left-to-right, -100 to 100
    'volume': 100                  // self-explanatory. 0-100, the latter being the max.
  };

  this.flash9Options = {           // flash 9-only options, merged into defaultOptions if flash 9 is being used
    'isMovieStar': null,           // "MovieStar" MPEG4 audio/video mode. Null (default) = auto detect MP4, AAC etc. based on URL. true = force on, ignore URL
    'usePeakData': false,          // enable left/right channel peak (level) data
    'useWaveformData': false,      // enable sound spectrum (raw waveform data) - WARNING: CPU-INTENSIVE: may set CPUs on fire.
    'useEQData': false,            // enable sound EQ (frequency spectrum data) - WARNING: Also CPU-intensive.
    'onbufferchange': null,	       // callback for "isBuffering" property change
    'ondataerror': null		       // callback for waveform/eq data access error (flash playing audio in other tabs/domains)
  };

  this.movieStarOptions = {    // flash 9.0r115+ MPEG4 audio/video options, merged into defaultOptions if flash 9+movieStar mode is enabled
    'onmetadata': null,		   // callback for when video width/height etc. are received
    'useVideo': false,		   // if loading movieStar content, whether to show video
    'bufferTime': null		   // seconds of data to buffer before playback begins (null = flash default of 0.1 seconds - if AAC playback is gappy, try up to 3 seconds)
  };

  // jslint global declarations
  /*global SM2_DEFER, sm2Debugger, alert, console, document, navigator, setTimeout, window */

  var SMSound = null; // defined later
  var _s = this;
  var _sm = 'soundManager';
  this.version = null;
  this.versionNumber = 'V2.95b.20100101';
  this.movieURL = null;
  this.url = null;
  this.altURL = null;
  this.swfLoaded = false;
  this.enabled = false;
  this.o = null;
  this.id = (smID || 'sm2movie');
  this.oMC = null;
  this.sounds = {};
  this.soundIDs = [];
  this.muted = false;
  this.isFullScreen = false; // set later by flash 9+
  this.isIE = (navigator.userAgent.match(/MSIE/i));
  this.isSafari = (navigator.userAgent.match(/safari/i));
  this.debugID = 'soundmanager-debug';
  this.debugURLParam = /([#?&])debug=1/i;
  this.specialWmodeCase = false;
  this._onready = [];
  this._debugOpen = true;
  this._didAppend = false;
  this._appendSuccess = false;
  this._didInit = false;
  this._disabled = false;
  this._windowLoaded = false;
  this._hasConsole = (typeof console != 'undefined' && typeof console.log != 'undefined');
  this._debugLevels = ['log', 'info', 'warn', 'error'];
  this._defaultFlashVersion = 8;
  this._oRemoved = null;
  this._oRemovedHTML = null;

  var _$ = function(sID) {
    return document.getElementById(sID);
  };

  this.filePatterns = {
    flash8: /\.mp3(\?.*)?$/i,
    flash9: /\.mp3(\?.*)?$/i
  };

  this.netStreamTypes = ['aac', 'flv', 'mov', 'mp4', 'm4v', 'f4v', 'm4a', 'mp4v', '3gp', '3g2']; // Flash v9.0r115+ "moviestar" formats
  this.netStreamPattern = new RegExp('\\.('+this.netStreamTypes.join('|')+')(\\?.*)?$', 'i');

  this.filePattern = null;
  this.features = {
    buffering: false,
    peakData: false,
    waveformData: false,
    eqData: false,
    movieStar: false
  };

  this.sandbox = {
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
  };

  this._setVersionInfo = function() {
    if (_s.flashVersion != 8 && _s.flashVersion != 9) {
      alert(_s._str('badFV',_s.flashVersion,_s._defaultFlashVersion));
      _s.flashVersion = _s._defaultFlashVersion;
    }
    _s.version = _s.versionNumber+(_s.flashVersion == 9?' (AS3/Flash 9)':' (AS2/Flash 8)');
    // set up default options
    if (_s.flashVersion > 8) {
      _s.defaultOptions = _s._mergeObjects(_s.defaultOptions, _s.flash9Options);
      _s.features.buffering = true;
    }
    if (_s.flashVersion > 8 && _s.useMovieStar) {
      // flash 9+ support for movieStar formats as well as MP3
      _s.defaultOptions = _s._mergeObjects(_s.defaultOptions, _s.movieStarOptions);
      _s.filePatterns.flash9 = new RegExp('\\.(mp3|'+_s.netStreamTypes.join('|')+')(\\?.*)?$', 'i');
      _s.features.movieStar = true;
    } else {
      _s.useMovieStar = false;
      _s.features.movieStar = false;
    }
    _s.filePattern = _s.filePatterns[(_s.flashVersion != 8?'flash9':'flash8')];
    _s.movieURL = (_s.flashVersion == 8?'soundmanager2.swf':'soundmanager2_flash9.swf');
    _s.features.peakData = _s.features.waveformData = _s.features.eqData = (_s.flashVersion > 8);
  };

  this._overHTTP = (document.location?document.location.protocol.match(/http/i):null);
  this._waitingforEI = false;
  this._initPending = false;
  this._tryInitOnFocus = (this.isSafari && typeof document.hasFocus == 'undefined');
  this._isFocused = (typeof document.hasFocus != 'undefined'?document.hasFocus():null);
  this._okToDisable = !this._tryInitOnFocus;

  this.useAltURL = !this._overHTTP; // use altURL if not "online"
  var flashCPLink = 'http://www.macromedia.com/support/documentation/en/flashplayer/help/settings_manager04.html';

  this.strings = {
    notReady: 'Not loaded yet - wait for soundManager.onload() before calling sound-related methods',
    appXHTML: _sm+'_createMovie(): appendChild/innerHTML set failed. May be app/xhtml+xml DOM-related.',
    swf404: _sm+': Verify that %s is a valid path.',
    tryDebug: 'Try '+_sm+'.debugFlash = true for more security details (output goes to SWF.)',
    checkSWF: 'See SWF output for more debug info.',
    localFail: _sm+': Non-HTTP page ('+document.location.protocol+' URL?) Review Flash player security settings for this special case:\n'+flashCPLink+'\nMay need to add/allow path, eg. c:/sm2/ or /users/me/sm2/',
    waitFocus: _sm+': Special case: Waiting for focus-related event..',
    waitImpatient: _sm+': Getting impatient, still waiting for Flash%s...',
    waitForever: _sm+': Waiting indefinitely for Flash...',
    needFunction: _sm+'.onready(): Function object expected',
    badID: 'Warning: Sound ID "%s" should be a string, starting with a non-numeric character',
	fl9Vid: 'flash 9 required for video. Exiting.',
	noMS: 'MovieStar mode not enabled. Exiting.',
	spcWmode: _sm+'._createMovie(): Removing wmode, preventing win32 below-the-fold SWF loading issue',
	currentObj: '--- '+_sm+'._debug(): Current sound objects ---',
	waitEI: _sm+'._initMovie(): Waiting for ExternalInterface call from Flash..',
	waitOnload: _sm+': Waiting for window.onload()',
	docLoaded: _sm+': Document already loaded',
	onload: _sm+'.initComplete(): calling soundManager.onload()',
	onloadOK: _sm+'.onload() complete',
	init: '-- '+_sm+'.init() --',
	didInit: _sm+'.init(): Already called?',
	flashJS: _sm+': Attempting to call Flash from JS..',
	noPolling: _sm+': Polling (whileloading()/whileplaying() support) is disabled.',
	secNote: 'Flash security note: Network/internet URLs will not load due to security restrictions. Access can be configured via Flash Player Global Security Settings Page: http://www.macromedia.com/support/documentation/en/flashplayer/help/settings_manager04.html',
	badRemove: 'Warning: Failed to remove flash movie.',
	peakWave: 'Warning: peak/waveform/eqData features unsupported for non-MP3 formats',
	shutdown: _sm+'.disable(): Shutting down',
	queue: _sm+'.onready(): Queueing handler',
	smFail: _sm+': Failed to initialise.',
	smError: 'SMSound.load(): Exception: JS-Flash communication failed, or JS error.',
	manURL: 'SMSound.load(): Using manually-assigned URL',
	onURL: _sm+'.load(): current URL already assigned.',
	badFV: 'soundManager.flashVersion must be 8 or 9. "%s" is invalid. Reverting to %s.'
  };

  this._str = function() { // o [,items to replace]
    var params = Array.prototype.slice.call(arguments); // real array, please
	var o = params.shift(); // first arg
	var str = _s.strings && _s.strings[o]?_s.strings[o]:'';
	if (str && params && params.length) {
      for (var i=0, j=params.length; i<j; i++) {
	    str = str.replace('%s',params[i]);
	  }
	}
    return str;
  };

  // --- public methods ---
  this.supported = function() {
    return (_s._didInit && !_s._disabled);
  };

  this.getMovie = function(smID) {
    return _s.isIE?window[smID]:(_s.isSafari?_$(smID) || document[smID]:_$(smID));
  };

  this.loadFromXML = function(sXmlUrl) {
    try {
      _s.o._loadFromXML(sXmlUrl);
    } catch(e) {
      _s._failSafely();
      return true;
    }
  };

  this.createSound = function(oOptions) {
    var _cs = 'soundManager.createSound(): ';
    if (!_s._didInit) {
      throw _s._complain(_cs+_s._str('notReady'), arguments.callee.caller);
    }
    if (arguments.length == 2) {
      // function overloading in JS! :) ..assume simple createSound(id,url) use case
      oOptions = {
        'id': arguments[0],
        'url': arguments[1]
      };
    }
    var thisOptions = _s._mergeObjects(oOptions); // inherit SM2 defaults
    var _tO = thisOptions; // alias
    if (_tO.id.toString().charAt(0).match(/^[0-9]$/)) { // hopefully this isn't buggy regexp-fu. :D
      _s._wD(_cs+_s._str('badID',_tO.id), 2);
    }
    _s._wD(_cs+_tO.id+' ('+_tO.url+')', 1);
    if (_s._idCheck(_tO.id, true)) {
      _s._wD(_cs+_tO.id+' exists', 1);
      return _s.sounds[_tO.id];
    }
    if (_s.flashVersion > 8 && _s.useMovieStar) {
      if (_tO.isMovieStar === null) {
        _tO.isMovieStar = (_tO.url.match(_s.netStreamPattern)?true:false);
      }
      if (_tO.isMovieStar) {
        _s._wD(_cs+'using MovieStar handling');
      }
      if (_tO.isMovieStar && (_tO.usePeakData || _tO.useWaveformData || _tO.useEQData)) {
        _s._wDS('peakWave');
        _tO.usePeakData = false;
        _tO.useWaveformData = false;
        _tO.useEQData = false;
      }
    }
    _s.sounds[_tO.id] = new SMSound(_tO);
    _s.soundIDs[_s.soundIDs.length] = _tO.id;
    // AS2:
    if (_s.flashVersion == 8) {
      _s.o._createSound(_tO.id, _tO.onjustbeforefinishtime);
    } else {
      _s.o._createSound(_tO.id, _tO.url, _tO.onjustbeforefinishtime, _tO.usePeakData, _tO.useWaveformData, _tO.useEQData, _tO.isMovieStar, (_tO.isMovieStar?_tO.useVideo:false), (_tO.isMovieStar?_tO.bufferTime:false));
    }
    if (_tO.autoLoad || _tO.autoPlay) {
      // TODO: does removing timeout here cause problems?
      if (_s.sounds[_tO.id]) {
        _s.sounds[_tO.id].load(_tO);
      }
    }
    if (_tO.autoPlay) {
      _s.sounds[_tO.id].play();
    }
    return _s.sounds[_tO.id];
  };

  this.createVideo = function(oOptions) {
	var fN = 'soundManager.createVideo(): ';
    if (arguments.length == 2) {
      oOptions = {
        'id': arguments[0],
        'url': arguments[1]
      };
    }
    if (_s.flashVersion >= 9) {
      oOptions.isMovieStar = true;
      oOptions.useVideo = true;
    } else {
      _s._wD(fN+_s._str('f9Vid'), 2);
      return false;
    }
    if (!_s.useMovieStar) {
      _s._wD(fN+_s._str('noMS'), 2);
    }
    return _s.createSound(oOptions);
  };

  this.destroySound = function(sID, bFromSound) {
    // explicitly destroy a sound before normal page unload, etc.
    if (!_s._idCheck(sID)) {
      return false;
    }
    for (var i=0; i<_s.soundIDs.length; i++) {
      if (_s.soundIDs[i] == sID) {
        _s.soundIDs.splice(i, 1);
        continue;
      }
    }
    // conservative option: avoid crash with flash 8
    // calling destroySound() within a sound onload() might crash firefox, certain flavours of winXP+flash 8??
    // if (_s.flashVersion != 8) {
    _s.sounds[sID].unload();
    // }
    if (!bFromSound) {
      // ignore if being called from SMSound instance
      _s.sounds[sID].destruct();
    }
    delete _s.sounds[sID];
  };

  this.destroyVideo = this.destroySound;

  this.load = function(sID, oOptions) {
    if (!_s._idCheck(sID)) {
      return false;
    }
    _s.sounds[sID].load(oOptions);
  };

  this.unload = function(sID) {
    if (!_s._idCheck(sID)) {
      return false;
    }
    _s.sounds[sID].unload();
  };

  this.play = function(sID, oOptions) {
	var fN = 'soundManager.play(): ';
    if (!_s._didInit) {
      throw _s._complain(fN+_s._str('notReady'), arguments.callee.caller);
    }
    if (!_s._idCheck(sID)) {
      if (typeof oOptions != 'Object') {
        oOptions = {
          url: oOptions
        }; // overloading use case: play('mySound','/path/to/some.mp3');
      }
      if (oOptions && oOptions.url) {
        // overloading use case, creation+playing of sound: .play('someID',{url:'/path/to.mp3'});
        _s._wD(fN+'attempting to create "'+sID+'"', 1);
        oOptions.id = sID;
        _s.createSound(oOptions);
      } else {
        return false;
      }
    }
    _s.sounds[sID].play(oOptions);
  };

  this.start = this.play; // just for convenience

  this.setPosition = function(sID, nMsecOffset) {
    if (!_s._idCheck(sID)) {
      return false;
    }
    _s.sounds[sID].setPosition(nMsecOffset);
  };

  this.stop = function(sID) {
    if (!_s._idCheck(sID)) {
      return false;
    }
    _s._wD('soundManager.stop('+sID+')', 1);
    _s.sounds[sID].stop();
  };

  this.stopAll = function() {
    _s._wD('soundManager.stopAll()', 1);
    for (var oSound in _s.sounds) {
      if (_s.sounds[oSound] instanceof SMSound) {
        _s.sounds[oSound].stop(); // apply only to sound objects
      }
    }
  };

  this.pause = function(sID) {
    if (!_s._idCheck(sID)) {
      return false;
    }
    _s.sounds[sID].pause();
  };

  this.pauseAll = function() {
    for (var i=_s.soundIDs.length; i--;) {
      _s.sounds[_s.soundIDs[i]].pause();
    }
  };

  this.resume = function(sID) {
    if (!_s._idCheck(sID)) {
      return false;
    }
    _s.sounds[sID].resume();
  };

  this.resumeAll = function() {
    for (var i=_s.soundIDs.length; i--;) {
      _s.sounds[_s.soundIDs[i]].resume();
    }
  };

  this.togglePause = function(sID) {
    if (!_s._idCheck(sID)) {
      return false;
    }
    _s.sounds[sID].togglePause();
  };

  this.setPan = function(sID, nPan) {
    if (!_s._idCheck(sID)) {
      return false;
    }
    _s.sounds[sID].setPan(nPan);
  };

  this.setVolume = function(sID, nVol) {
    if (!_s._idCheck(sID)) {
      return false;
    }
    _s.sounds[sID].setVolume(nVol);
  };

  this.mute = function(sID) {
	var fN = 'soundManager.mute(): ';
    if (typeof sID != 'string') {
      sID = null;
    }
    if (!sID) {
      _s._wD(fN+'Muting all sounds');
      for (var i=_s.soundIDs.length; i--;) {
        _s.sounds[_s.soundIDs[i]].mute();
      }
      _s.muted = true;
    } else {
      if (!_s._idCheck(sID)) {
        return false;
      }
      _s._wD(fN+'Muting "'+sID+'"');
      _s.sounds[sID].mute();
    }
  };

  this.muteAll = function() {
    _s.mute();
  };

  this.unmute = function(sID) {
	var fN = 'soundManager.unmute(): ';
    if (typeof sID != 'string') {
      sID = null;
    }
    if (!sID) {
      _s._wD(fN+'Unmuting all sounds');
      for (var i=_s.soundIDs.length; i--;) {
        _s.sounds[_s.soundIDs[i]].unmute();
      }
      _s.muted = false;
    } else {
      if (!_s._idCheck(sID)) {
        return false;
      }
      _s._wD(fN+'Unmuting "'+sID+'"');
      _s.sounds[sID].unmute();
    }
  };

  this.unmuteAll = function() {
    _s.unmute();
  };

  this.toggleMute = function(sID) {
    if (!_s._idCheck(sID)) {
      return false;
    }
    _s.sounds[sID].toggleMute();
  };

  this.getMemoryUse = function() {
    if (_s.flashVersion == 8) {
      // not supported in Flash 8
      return 0;
    }
    if (_s.o) {
      return parseInt(_s.o._getMemoryUse(), 10);
    }
  };

  this.disable = function(bNoDisable) {
    // destroy all functions
    if (typeof bNoDisable == 'undefined') {
      bNoDisable = false;
    }
    if (_s._disabled) {
      return false;
    }
    _s._disabled = true;
    _s._wDS('shutdown', 1);
    for (var i=_s.soundIDs.length; i--;) {
      _s._disableObject(_s.sounds[_s.soundIDs[i]]);
    }
    _s.initComplete(bNoDisable); // fire "complete", despite fail
    // _s._disableObject(_s); // taken out to allow reboot()
  };

  this.canPlayURL = function(sURL) {
    return (sURL?(sURL.match(_s.filePattern)?true:false):null);
  };

  this.getSoundById = function(sID, suppressDebug) {
    if (!sID) {
      throw new Error('SoundManager.getSoundById(): sID is null/undefined');
    }
    var result = _s.sounds[sID];
    if (!result && !suppressDebug) {
      _s._wD('"'+sID+'" is an invalid sound ID.', 2);
      // soundManager._wD('trace: '+arguments.callee.caller);
    }
    return result;
  };

  this.onready = function(oMethod, oScope) {
    // queue a callback, with optional scope
    // a status object will be passed to your handler
    /*
    soundManager.onready(function(oStatus) {
	  alert('SM2 init success: '+oStatus.success);
	});
	*/
    if (oMethod && oMethod instanceof Function) {
      if (_s._didInit) {
        _s._wDS('queue');
      }
      if (!oScope) {
        oScope = window;
      }
      _s._addOnReady(oMethod, oScope);
      _s._processOnReady();
      return true;
    } else {
      throw _s._str('needFunction');
    }
  };

  this.oninitmovie = function() {
    // called after SWF has been appended to the DOM via JS (or retrieved from HTML)
    // this is a stub for your own scripts.
  };

  this.onload = function() {
    // window.onload() equivalent for SM2, ready to create sounds etc.
    // this is a stub for your own scripts.
    soundManager._wD('soundManager.onload()', 1);
  };

  this.onerror = function() {
    // stub for user handler, called when SM2 fails to load/init
  };

  // --- "private" methods ---
  this._idCheck = this.getSoundById;

  this._complain = function(sMsg, oCaller) {
    // Try to create meaningful custom errors, w/stack trace to the "offending" line
    var sPre = 'Error: ';
    if (!oCaller) {
      return new Error(sPre+sMsg);
    }
    var e = new Error(''); // make a mistake.
    var stackMsg = null;
    if (e.stack) {
      // potentially dangerous: Try to return a meaningful stacktrace where provided (Mozilla)
      try {
        var splitChar = '@';
        var stackTmp = e.stack.split(splitChar);
        stackMsg = stackTmp[4]; // try to return only the relevant bit, skipping internal SM2 shiz
      } catch(ee) {
        // oops.
        stackMsg = e.stack;
      }
    }
    if (typeof console != 'undefined' && typeof console.trace != 'undefined') {
      console.trace();
    }
    var errorDesc = sPre+sMsg+'. \nCaller: '+oCaller.toString()+(e.stack?' \nTop of stacktrace: '+stackMsg:(e.message?' \nMessage: '+e.message:''));
    // See JS error/debug/console output for real error source, stack trace / message detail where possible.
    return new Error(errorDesc);
  };

  var _doNothing = function() {
    return false;
  };

  _doNothing._protected = true;

  this._disableObject = function(o) {
    for (var oProp in o) {
      if (typeof o[oProp] == 'function' && typeof o[oProp]._protected == 'undefined') {
        o[oProp] = _doNothing;
      }
    }
    oProp = null;
  };

  this._failSafely = function(bNoDisable) {
    // general failure exception handler
    if (typeof bNoDisable == 'undefined') {
      bNoDisable = false;
    }
    if (!_s._disabled || bNoDisable) {
      _s._wDS('smFail', 2);
      _s.disable(bNoDisable);
    }
  };

  this._normalizeMovieURL = function(smURL) {
    var urlParams = null;
    if (smURL) {
      if (smURL.match(/\.swf(\?.*)?$/i)) {
        urlParams = smURL.substr(smURL.toLowerCase().lastIndexOf('.swf?')+4);
        if (urlParams) {
          return smURL; // assume user knows what they're doing
        }
      } else if (smURL.lastIndexOf('/') != smURL.length - 1) {
        smURL = smURL+'/';
      }
    }
    return (smURL && smURL.lastIndexOf('/') != -1?smURL.substr(0, smURL.lastIndexOf('/')+1):'./')+_s.movieURL;
  };

  this._getDocument = function() {
    return (document.body?document.body:(document.documentElement?document.documentElement:document.getElementsByTagName('div')[0]));
  };

  this._getDocument._protected = true;

  this._setPolling = function(bPolling, bHighPerformance) {
    if (!_s.o || !_s.allowPolling) {
      return false;
    }
    _s.o._setPolling(bPolling, bHighPerformance);
  };

  this._createMovie = function(smID, smURL) {
    var specialCase = null;
    var remoteURL = (smURL?smURL:_s.url);
    var localURL = (_s.altURL?_s.altURL:remoteURL);
    if (_s.debugURLParam.test(window.location.href.toString())) {
      _s.debugMode = true; // allow force of debug mode via URL
    }
    if (_s._didAppend && _s._appendSuccess) {
      return false; // ignore if already succeeded
    }
    _s._didAppend = true;

    // safety check for legacy (change to Flash 9 URL)
    _s._setVersionInfo();
    _s.url = _s._normalizeMovieURL(_s._overHTTP?remoteURL:localURL);
    smURL = _s.url;

    if (_s.useHighPerformance && _s.useMovieStar && _s.defaultOptions.useVideo === true) {
      specialCase = 'soundManager note: disabling highPerformance, not applicable with movieStar mode+useVideo';
      _s.useHighPerformance = false;
    }

    _s.wmode = (!_s.wmode && _s.useHighPerformance && !_s.useMovieStar?'transparent':_s.wmode);


    if (_s.wmode !== null && _s.flashLoadTimeout !== 0 && (!_s.useHighPerformance || _s.debugFlash) && !_s.isIE && navigator.platform.match(/win32/i)) {
      _s.specialWmodeCase = true;
      // extra-special case: movie doesn't load until scrolled into view when using wmode = anything but 'window' here
      // does not apply when using high performance (position:fixed means on-screen), OR infinite flash load timeout
      _s._wDS('spcWmode');
      _s.wmode = null;
    }

    if (_s.flashVersion == 8) {
      _s.allowFullScreen = false;
    }

    var oEmbed = {
      name: smID,
      id: smID,
      src: smURL,
      width: '100%',
      height: '100%',
      quality: 'high',
      allowScriptAccess: _s.allowScriptAccess,
      bgcolor: _s.bgColor,
      pluginspage: 'http://www.macromedia.com/go/getflashplayer',
      type: 'application/x-shockwave-flash',
      wmode: _s.wmode,
      allowfullscreen: (_s.allowFullScreen?'true':'false')
    };

    if (_s.debugFlash) {
      oEmbed.FlashVars = 'debug=1';
    }

    if (!_s.wmode) {
      delete oEmbed.wmode; // don't write empty attribute
    }

    var oMovie = null;
    var tmp = null;
    var movieHTML = null;
    var oEl = null;

    if (_s.isIE) {
      // IE is "special".
      oMovie = document.createElement('div');
      movieHTML = '<object id="'+smID+'" data="'+smURL+'" type="'+oEmbed.type+'" width="'+oEmbed.width+'" height="'+oEmbed.height+'"><param name="movie" value="'+smURL+'" /><param name="AllowScriptAccess" value="'+_s.allowScriptAccess+'" /><param name="quality" value="'+oEmbed.quality+'" />'+(_s.wmode?'<param name="wmode" value="'+_s.wmode+'" /> ':'')+'<param name="bgcolor" value="'+_s.bgColor+'" /><param name="allowFullScreen" value="'+oEmbed.allowFullScreen+'" />'+(_s.debugFlash?'<param name="FlashVars" value="'+oEmbed.FlashVars+'" />':'')+'<!-- --></object>';
    } else {
      oMovie = document.createElement('embed');
      for (tmp in oEmbed) {
        if (oEmbed.hasOwnProperty(tmp)) {
          oMovie.setAttribute(tmp, oEmbed[tmp]);
        }
      }
    }

    var oD = null;
    var oToggle = null;

if (_s.debugMode) {

    oD = document.createElement('div');
    oD.id = _s.debugID+'-toggle';
    oToggle = {
      position: 'fixed',
      bottom: '0px',
      right: '0px',
      width: '1.2em',
      height: '1.2em',
      lineHeight: '1.2em',
      margin: '2px',
      textAlign: 'center',
      border: '1px solid #999',
      cursor: 'pointer',
      background: '#fff',
      color: '#333',
      zIndex: 10001
    };

    oD.appendChild(document.createTextNode('-'));
    oD.onclick = _s._toggleDebug;
    oD.title = 'Toggle SM2 debug console';

    if (navigator.userAgent.match(/msie 6/i)) {
      oD.style.position = 'absolute';
      oD.style.cursor = 'hand';
    }

    for (tmp in oToggle) {
      if (oToggle.hasOwnProperty(tmp)) {
        oD.style[tmp] = oToggle[tmp];
      }
    }

}

    var oTarget = _s._getDocument();

    if (oTarget) {

      _s.oMC = _$('sm2-container')?_$('sm2-container'):document.createElement('div');

      var extraClass = (_s.debugMode?' sm2-debug':'')+(_s.debugFlash?' flash-debug':'');

      if (!_s.oMC.id) {
        _s.oMC.id = 'sm2-container';
        _s.oMC.className = 'movieContainer'+extraClass;
        // "hide" flash movie
        var s = null;
        oEl = null;
        if (_s.useHighPerformance) {
          s = {
            position: 'fixed',
            width: '8px',
            height: '8px',
            // must be at least 6px for flash to run fast. odd? yes.
            bottom: '0px',
            left: '0px',
            overflow: 'hidden'
            // zIndex:-1 // sit behind everything else - potentially dangerous/buggy?
          };
        } else {
          s = {
            position: 'absolute',
            width: '8px',
            height: '8px',
            top: '-9999px',
            left: '-9999px'
          };
        }
        var x = null;
        if (!_s.debugFlash) {
          for (x in s) {
            if (s.hasOwnProperty(x)) {
              _s.oMC.style[x] = s[x];
            }
          }
        }
        try {
          if (!_s.isIE) {
            _s.oMC.appendChild(oMovie);
          }
          oTarget.appendChild(_s.oMC);
          if (_s.isIE) {
            oEl = _s.oMC.appendChild(document.createElement('div'));
            oEl.className = 'sm2-object-box';
            oEl.innerHTML = movieHTML;
          }
          _s._appendSuccess = true;
        } catch(e) {
          throw new Error(_s._str('appXHTML'));
        }
      } else {
        // it's already in the document.
        if (_s.debugMode || _s.debugFlash) {
          _s.oMC.className += extraClass;
        }
        _s.oMC.appendChild(oMovie);
        if (_s.isIE) {
          oEl = _s.oMC.appendChild(document.createElement('div'));
          oEl.className = 'sm2-object-box';
          oEl.innerHTML = movieHTML;
        }
        _s._appendSuccess = true;
      }

      if (_s.debugMode && !_$(_s.debugID) && ((!_s._hasConsole || !_s.useConsole) || (_s.useConsole && _s._hasConsole && !_s.consoleOnly))) {
        var oDebug = document.createElement('div');
        oDebug.id = _s.debugID;
        oDebug.style.display = (_s.debugMode?'block':'none');
        if (_s.debugMode && !_$(oD.id)) {
          try {
            oTarget.appendChild(oD);
          } catch(e2) {
            throw new Error(_s._str('appXHTML'));
          }
          oTarget.appendChild(oDebug);
        }
      }
      oTarget = null;
    }

    if (specialCase) {
      _s._wD(specialCase);
    }

    _s._wD('-- SoundManager 2 '+_s.version+(_s.useMovieStar?', MovieStar mode':'')+(_s.useHighPerformance?', high performance mode, ':', ')+((_s.useFastPolling?'fast':'normal')+' polling')+(_s.wmode?', wmode: '+_s.wmode:'')+(_s.debugFlash?', flash debug mode':'')+' --', 1);
    _s._wD('soundManager._createMovie(): Trying to load '+smURL+(!_s._overHTTP && _s.altURL?' (alternate URL)':''), 1);
  };

  this._writeDebug = function(sText, sType, bTimestamp) { // aliased to this._wD()
    if (!_s.debugMode) {
      return false;
    }
    if (typeof bTimestamp != 'undefined' && bTimestamp) {
      sText = sText+' | '+new Date().getTime();
    }
    if (_s._hasConsole && _s.useConsole) {
      var sMethod = _s._debugLevels[sType];
      if (typeof console[sMethod] != 'undefined') {
        console[sMethod](sText);
      } else {
        console.log(sText);
      }
      if (_s.useConsoleOnly) {
        return true;
      }
    }
    var sDID = 'soundmanager-debug';
    var o = null;
    try {
      o = _$(sDID);
      if (!o) {
        return false;
      }
      var oItem = document.createElement('div');
      if (++_s._wdCount % 2 === 0) {
        oItem.className = 'sm2-alt';
      }
      // sText = sText.replace(/\n/g,'<br />');
      if (typeof sType == 'undefined') {
        sType = 0;
      } else {
        sType = parseInt(sType, 10);
      }
      oItem.appendChild(document.createTextNode(sText));
      if (sType) {
        if (sType >= 2) {
          oItem.style.fontWeight = 'bold';
        }
        if (sType == 3) {
          oItem.style.color = '#ff3333';
        }
      }
      // o.appendChild(oItem); // top-to-bottom
      o.insertBefore(oItem, o.firstChild); // bottom-to-top
    } catch(e) {
      // oh well
    }
    o = null;
  };
  this._writeDebug._protected = true;
  this._wdCount = 0;
  this._wdCount._protected = true;
  this._wD = this._writeDebug;

  this._wDS = function(o,errorLevel) {
    if (!o) {
	  return '';
	} else {
	  return _s._wD(_s._str(o),errorLevel);
	}
  };
  this._wDS._protected = true;

  this._wDAlert = function(sText) {
    alert(sText);
  };

  if (window.location.href.indexOf('debug=alert')+1 && _s.debugMode) {
    _s._wD = _s._wDAlert;
  }

  this._toggleDebug = function() {
    var o = _$(_s.debugID);
    var oT = _$(_s.debugID+'-toggle');
    if (!o) {
      return false;
    }
    if (_s._debugOpen) {
      // minimize
      oT.innerHTML = '+';
      o.style.display = 'none';
    } else {
      oT.innerHTML = '-';
      o.style.display = 'block';
    }
    _s._debugOpen = !_s._debugOpen;
  };

  this._toggleDebug._protected = true;

  this._debug = function() {
    _s._wDS('currentObj', 1);
    for (var i=0, j = _s.soundIDs.length; i<j; i++) {
      _s.sounds[_s.soundIDs[i]]._debug();
    }
  };

  this._debugTS = function(sEventType, bSuccess, sMessage) {
    // troubleshooter debug hooks
    if (typeof sm2Debugger != 'undefined') {
      try {
        sm2Debugger.handleEvent(sEventType, bSuccess, sMessage);
      } catch(e) {
        // oh well	
      }
    }
  };

  this._debugTS._protected = true;

  this._mergeObjects = function(oMain, oAdd) {
    // non-destructive merge
    var o1 = {}; // clone o1
    for (var i in oMain) {
      if (oMain.hasOwnProperty(i)) {
        o1[i] = oMain[i];
      }
    }
    var o2 = (typeof oAdd == 'undefined'?_s.defaultOptions:oAdd);
    for (var o in o2) {
      if (o2.hasOwnProperty(o) && typeof o1[o] == 'undefined') {
        o1[o] = o2[o];
      }
    }
    return o1;
  };

  this.createMovie = function(sURL) {
    if (sURL) {
      _s.url = sURL;
    }
    _s._initMovie();
  };

  this.go = this.createMovie; // nice alias

  this._initMovie = function() {
    // attempt to get, or create, movie
    if (_s.o) {
      return false; // may already exist
    }
    _s.o = _s.getMovie(_s.id); // (inline markup)
    if (!_s.o) {
      if (!_s.oRemoved) {
        // try to create
        _s._createMovie(_s.id, _s.url);
      } else {
        // try to re-append removed movie after reboot()
        if (!_s.isIE) {
          _s.oMC.appendChild(_s.oRemoved);
        } else {
          _s.oMC.innerHTML = _s.oRemovedHTML;
        }
        _s.oRemoved = null;
        _s._didAppend = true;
      }
      _s.o = _s.getMovie(_s.id);
    }
    if (_s.o) {
      // _s._wD('soundManager._initMovie(): Got '+_s.o.nodeName+' element ('+(_s._didAppend?'created via JS':'static HTML')+')',1);
      if (_s.flashLoadTimeout > 0) {
        _s._wDS('waitEI');
      }
    }
    if (typeof _s.oninitmovie == 'function') {
      setTimeout(_s.oninitmovie, 1);
    }
  };

  this.waitForExternalInterface = function() {
    if (_s._waitingForEI) {
      return false;
    }
    _s._waitingForEI = true;
    if (_s._tryInitOnFocus && !_s._isFocused) {
      _s._wDS('waitFocus');
      return false;
    }
    if (_s.flashLoadTimeout > 0) {
      if (!_s._didInit) {
        var p = _s.getMoviePercent();
        _s._wD(_s._str('waitImpatient',(p == 100?' (SWF loaded)':(p > 0?' (SWF '+p+'% loaded)':''))));
      }
      setTimeout(function() {
        var p = _s.getMoviePercent();
        if (!_s._didInit) {
          _s._wD(_sm+': No Flash response within reasonable time after document load.\nLikely causes: '+(p === null || p === 0?'Loading '+_s.movieURL+' may have failed (and/or Flash '+_s.flashVersion+'+ not present?), ':'')+'Flash blocked or JS-Flash security error.'+(_s.debugFlash?' '+_s._str('checkSWF'): ''), 2);
          if (!_s._overHTTP) {
            _s._wDS('localFail', 2);
            if (!_s.debugFlash) {
              _s._wDS('tryDebug', 2);
            }
          }
          if (p === 0) {
            // 404, or blocked from loading?
            _s._wD(_s._str('swf404',_s.url));
          }
          _s._debugTS('flashtojs', false, ': Timed out'+(_s._overHTTP)?' (Check flash security or flash blockers)':' (No plugin/missing SWF?)');
        }
        // if still not initialized and no other options, give up
        if (!_s._didInit && _s._okToDisable) {
          _s._failSafely(true); // don't disable, for reboot()
        }
      },
      _s.flashLoadTimeout);
    } else if (!_s._didInit) {
      _s._wDS('waitForever');
    }
  };

  this.getMoviePercent = function() {
    return (_s.o && typeof _s.o.PercentLoaded != 'undefined'?_s.o.PercentLoaded():null);
  };

  this.handleFocus = function() {
    if (_s._isFocused || !_s._tryInitOnFocus) {
      return true;
    }
    _s._okToDisable = true;
    _s._isFocused = true;
    _s._wD('soundManager.handleFocus()');
    if (_s._tryInitOnFocus) {
      // giant Safari 3.1 hack - assume window in focus if mouse is moving, since document.hasFocus() not currently implemented.
      window.removeEventListener('mousemove', _s.handleFocus, false);
    }
    // allow init to restart
    _s._waitingForEI = false;
    setTimeout(_s.waitForExternalInterface, 500);
    // detach event
    if (window.removeEventListener) {
      window.removeEventListener('focus', _s.handleFocus, false);
    } else if (window.detachEvent) {
      window.detachEvent('onfocus', _s.handleFocus);
    }
  };

  this.initComplete = function(bNoDisable) {
    if (_s._didInit) {
      return false;
    }
    _s._didInit = true;
    _s._wD('-- SoundManager 2 '+(_s._disabled?'failed to load':'loaded')+' ('+(_s._disabled?'security/load error':'OK')+') --', 1);
    if (_s._disabled || bNoDisable) {
      // _s._wD('soundManager.initComplete(): calling soundManager.onerror()',1);
      _s._processOnReady();
      _s._debugTS('onload', false);
      _s.onerror.apply(window);
      return false;
    } else {
      _s._debugTS('onload', true);
    }
    if (_s.waitForWindowLoad && !_s._windowLoaded) {
      _s._wDS('waitOnload');
      if (window.addEventListener) {
        window.addEventListener('load', _s._initUserOnload, false);
      } else if (window.attachEvent) {
        window.attachEvent('onload', _s._initUserOnload);
      }
      return false;
    } else {
      if (_s.waitForWindowLoad && _s._windowLoaded) {
        _s._wDS('docLoaded');
      }
      _s._initUserOnload();
    }
  };

  this._addOnReady = function(oMethod, oScope) {
    _s._onready.push({
      'method': oMethod,
      'scope': (oScope || null),
      'fired': false
    });
  };

  this._processOnReady = function() {
    if (!_s._didInit) {
      // not ready yet.
      return false;
    }
    var status = {
      success: (!_s._disabled)
    };
    var queue = [];
    for (var i=0, j = _s._onready.length; i<j; i++) {
      if (_s._onready[i].fired !== true) {
        queue.push(_s._onready[i]);
      }
    }
    if (queue.length) {
      _s._wD(_sm+': Firing '+queue.length+' onready() item'+(queue.length > 1?'s':''));
      for (i = 0, j = queue.length; i<j; i++) {
        if (queue[i].scope) {
          queue[i].method.apply(queue[i].scope, [status]);
        } else {
          queue[i].method(status);
        }
        queue[i].fired = true;
      }
    }
  };

  this._initUserOnload = function() {
    window.setTimeout(function() {
      _s._processOnReady();
      _s._wDS('onload', 1);
      // call user-defined "onload", scoped to window
      _s.onload.apply(window);
      _s._wDS('onloadOK', 1);
    });
  };

  this.init = function() {
    _s._wDS('init');
    // called after onload()
    _s._initMovie();
    if (_s._didInit) {
      _s._wDS('didInit');
      return false;
    }
    // event cleanup
    if (window.removeEventListener) {
      window.removeEventListener('load', _s.beginDelayedInit, false);
    } else if (window.detachEvent) {
      window.detachEvent('onload', _s.beginDelayedInit);
    }
    try {
      _s._wDS('flashJS');
      _s.o._externalInterfaceTest(false); // attempt to talk to Flash
      if (!_s.allowPolling) {
        _s._wDS('noPolling', 1);
      } else {
        _s._setPolling(true, _s.useFastPolling?true:false);
      }
      if (!_s.debugMode) {
        _s.o._disableDebug();
      }
      _s.enabled = true;
      _s._debugTS('jstoflash', true);
    } catch(e) {
      _s._wD('js/flash exception: '+e.toString());
      _s._debugTS('jstoflash', false);
      _s._failSafely(true); // don't disable, for reboot()
      _s.initComplete();
      return false;
    }
    _s.initComplete();
  };

  this.beginDelayedInit = function() {
    // _s._wD('soundManager.beginDelayedInit()');
    _s._windowLoaded = true;
    setTimeout(_s.waitForExternalInterface, 500);
    setTimeout(_s.beginInit, 20);
  };

  this.beginInit = function() {
    if (_s._initPending) {
      return false;
    }
    _s.createMovie(); // ensure creation if not already done
    _s._initMovie();
    _s._initPending = true;
    return true;
  };

  this.domContentLoaded = function() {
    if (document.removeEventListener) {
      document.removeEventListener('DOMContentLoaded', _s.domContentLoaded, false);
    }
    _s.go();
  };

  this._externalInterfaceOK = function(flashDate) {
    // callback from flash for confirming that movie loaded, EI is working etc.
    // flashDate = approx. timing/delay info for JS/flash bridge
    if (_s.swfLoaded) {
      return false;
    }
    var eiTime = new Date().getTime();
    _s._wD('soundManager._externalInterfaceOK()'+(flashDate?' (~'+(eiTime - flashDate)+' ms)':''));
    _s._debugTS('swf', true);
    _s._debugTS('flashtojs', true);
    _s.swfLoaded = true;
    _s._tryInitOnFocus = false;

    if (_s.isIE) {
      // IE needs a timeout OR delay until window.onload - may need TODO: investigating
      setTimeout(_s.init, 100);
    } else {
      _s.init();
    }

  };

  this._setSandboxType = function(sandboxType) {
    var sb = _s.sandbox;
    sb.type = sandboxType;
    sb.description = sb.types[(typeof sb.types[sandboxType] != 'undefined'?sandboxType:'unknown')];
    _s._wD('Flash security sandbox type: '+sb.type);
    if (sb.type == 'localWithFile') {
      sb.noRemote = true;
      sb.noLocal = false;
      _s._wDS('secNote', 2);
    } else if (sb.type == 'localWithNetwork') {
      sb.noRemote = false;
      sb.noLocal = true;
    } else if (sb.type == 'localTrusted') {
      sb.noRemote = false;
      sb.noLocal = false;
    }
  };

  this.reboot = function() {
    // attempt to reset and init SM2
    _s._wD('soundManager.reboot()');
    if (_s.soundIDs.length) {
      _s._wD('Destroying '+_s.soundIDs.length+' SMSound objects...');
    }
    for (var i=_s.soundIDs.length; i--;) {
      _s.sounds[_s.soundIDs[i]].destruct();
    }
    // trash ze flash
    try {
      if (_s.isIE) {
        _s.oRemovedHTML = _s.o.innerHTML;
      }
      _s.oRemoved = _s.o.parentNode.removeChild(_s.o);
      _s._wD('Flash movie removed.');
    } catch(e) {
      // uh-oh.
      _s._wDS('badRemove', 2);
    }

    // actually, force recreate of movie.
    _s.oRemovedHTML = null;
    _s.oRemoved = null;

    _s.enabled = false;
    _s._didInit = false;
    _s._waitingForEI = false;
    _s._initPending = false;
    _s._didAppend = false;
    _s._appendSuccess = false;
    _s._disabled = false;
    _s._waitingforEI = true;
    _s.swfLoaded = false;
    _s.soundIDs = {};
    _s.sounds = [];
    _s.o = null;
    for (i = _s._onready.length; i--;) {
      _s._onready[i].fired = false;
    }
    _s._wD(_sm+': Rebooting...');
    window.setTimeout(soundManager.beginDelayedInit, 20);
  };

  this.destruct = function() {
    _s._wD('soundManager.destruct()');
    _s.disable(true);
  };

  // SMSound (sound object)
  SMSound = function(oOptions) {
    var _t = this;
    this.sID = oOptions.id;
    this.url = oOptions.url;
    this.options = _s._mergeObjects(oOptions);
    this.instanceOptions = this.options; // per-play-instance-specific options
    this._iO = this.instanceOptions; // short alias
    // assign property defaults (volume, pan etc.)
    this.pan = this.options.pan;
    this.volume = this.options.volume;

    this._lastURL = null;

    this._debug = function() {
      if (_s.debugMode) {
        var stuff = null;
        var msg = [];
        var sF = null;
        var sfBracket = null;
        var maxLength = 64; // # of characters of function code to show before truncating
        for (stuff in _t.options) {
          if (_t.options[stuff] !== null) {
            if (_t.options[stuff] instanceof Function) {
              // handle functions specially
              sF = _t.options[stuff].toString();
              sF = sF.replace(/\s\s+/g, ' '); // normalize spaces
              sfBracket = sF.indexOf('{');
              msg[msg.length] = ' '+stuff+': {'+sF.substr(sfBracket+1, (Math.min(Math.max(sF.indexOf('\n') - 1, maxLength), maxLength))).replace(/\n/g, '')+'... }';
            } else {
              msg[msg.length] = ' '+stuff+': '+_t.options[stuff];
            }
          }
        }
        _s._wD('SMSound() merged options: {\n'+msg.join(', \n')+'\n}');
      }
    };

    this._debug();

    this.id3 = {
      /* 
    Name/value pairs set via Flash when available - see reference for names (download documentation):
    http://livedocs.macromedia.com/flash/8/
    Previously-live URL:
    http://livedocs.macromedia.com/flash/8/main/wwhelp/wwhimpl/common/html/wwhelp.htm?context=LiveDocs_Parts&file=00001567.html
    (eg., this.id3.songname or this.id3['songname'])
   */
    };

    this.resetProperties = function(bLoaded) {
      _t.bytesLoaded = null;
      _t.bytesTotal = null;
      _t.position = null;
      _t.duration = null;
      _t.durationEstimate = null;
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
      _t.eqData = [];
      // dirty hack for now: also have left/right arrays off this, maintain compatibility
      _t.eqData.left = [];
      _t.eqData.right = [];
    };

    _t.resetProperties();

    // --- public methods ---
    this.load = function(oOptions) {
      if (typeof oOptions != 'undefined') {
        _t._iO = _s._mergeObjects(oOptions);
        _t.instanceOptions = _t._iO;
      } else {
        oOptions = _t.options;
        _t._iO = oOptions;
        _t.instanceOptions = _t._iO;
        if (_t._lastURL && _t._lastURL != _t.url) {
          _s._wDS('manURL');
          _t._iO.url = _t.url;
          _t.url = null;
        }
      }

      if (typeof _t._iO.url == 'undefined') {
        _t._iO.url = _t.url;
      }

      _s._wD('soundManager.load(): '+_t._iO.url, 1);
      if (_t._iO.url == _t.url && _t.readyState !== 0 && _t.readyState != 2) {
        _s._wDS('onURL', 1);
        return false;
      }
      _t.url = _t._iO.url;
      _t._lastURL = _t._iO.url;
      _t.loaded = false;
      _t.readyState = 1;
      _t.playState = 0; // (oOptions.autoPlay?1:0); // if autoPlay, assume "playing" is true (no way to detect when it actually starts in Flash unless onPlay is watched?)
      try {
        if (_s.flashVersion == 8) {
          _s.o._load(_t.sID, _t._iO.url, _t._iO.stream, _t._iO.autoPlay, (_t._iO.whileloading?1:0));
        } else {
          _s.o._load(_t.sID, _t._iO.url, _t._iO.stream?true:false, _t._iO.autoPlay?true:false); // ,(_tO.whileloading?true:false)
          if (_t._iO.isMovieStar && _t._iO.autoLoad && !_t._iO.autoPlay) {
            // special case: MPEG4 content must start playing to load, then pause to prevent playing.
            _t.pause();
          }
        }
      } catch(e) {
        _s._wDS('smError', 2);
        _s._debugTS('onload', false);
        _s.onerror();
        _s.disable();
      }

    };

    this.unload = function() {
      // Flash 8/AS2 can't "close" a stream - fake it by loading an empty MP3
      // Flash 9/AS3: Close stream, preventing further load
      if (_t.readyState !== 0) {
        _s._wD('SMSound.unload(): "'+_t.sID+'"');
        if (_t.readyState != 2) { // reset if not error
          _t.setPosition(0, true); // reset current sound positioning
        }
        _s.o._unload(_t.sID, _s.nullURL);
        // reset load/status flags
        _t.resetProperties();
      }
    };

    this.destruct = function() {
      // kill sound within Flash
      _s._wD('SMSound.destruct(): "'+_t.sID+'"');
      _s.o._destroySound(_t.sID);
      _s.destroySound(_t.sID, true); // ensure deletion from controller
    };

    this.play = function(oOptions) {
	  var fN = 'SMSound.play(): ';
      if (!oOptions) {
        oOptions = {};
      }
      _t._iO = _s._mergeObjects(oOptions, _t._iO);
      _t._iO = _s._mergeObjects(_t._iO, _t.options);
      _t.instanceOptions = _t._iO;
      if (_t.playState == 1) {
        var allowMulti = _t._iO.multiShot;
        if (!allowMulti) {
          _s._wD(fN+'"'+_t.sID+'" already playing (one-shot)', 1);
          return false;
        } else {
          _s._wD(fN+'"'+_t.sID+'" already playing (multi-shot)', 1);
        }
      }
      if (!_t.loaded) {
        if (_t.readyState === 0) {
          _s._wD(fN+'Attempting to load "'+_t.sID+'"', 1);
          // try to get this sound playing ASAP
          //_t._iO.stream = true; // breaks stream=false case?
          _t._iO.autoPlay = true;
          // TODO: need to investigate when false, double-playing
          // if (typeof oOptions.autoPlay=='undefined') _tO.autoPlay = true; // only set autoPlay if unspecified here
          _t.load(_t._iO); // try to get this sound playing ASAP
        } else if (_t.readyState == 2) {
          _s._wD(fN+'Could not load "'+_t.sID+'" - exiting', 2);
          return false;
        } else {
          _s._wD(fN+'"'+_t.sID+'" is loading - attempting to play..', 1);
        }
      } else {
        _s._wD(fN+'"'+_t.sID+'"');
      }
      if (_t.paused) {
        _t.resume();
      } else {
        _t.playState = 1;
        if (!_t.instanceCount || _s.flashVersion > 8) {
          _t.instanceCount++;
        }
        _t.position = (typeof _t._iO.position != 'undefined' && !isNaN(_t._iO.position)?_t._iO.position:0);
        if (_t._iO.onplay) {
          _t._iO.onplay.apply(_t);
        }
        _t.setVolume(_t._iO.volume, true); // restrict volume to instance options only
        _t.setPan(_t._iO.pan, true);
        _s.o._start(_t.sID, _t._iO.loop || 1, (_s.flashVersion == 9?_t.position:_t.position / 1000));
      }
    };

    this.start = this.play; // just for convenience
    this.stop = function(bAll) {
      if (_t.playState == 1) {
        _t.playState = 0;
        _t.paused = false;
        // if (_s.defaultOptions.onstop) _s.defaultOptions.onstop.apply(_s);
        if (_t._iO.onstop) {
          _t._iO.onstop.apply(_t);
        }
        _s.o._stop(_t.sID, bAll);
        _t.instanceCount = 0;
        _t._iO = {};
        // _t.instanceOptions = _t._iO;
      }
    };

    this.setPosition = function(nMsecOffset, bNoDebug) {
      if (typeof nMsecOffset == 'undefined') {
        nMsecOffset = 0;
      }
      var offset = Math.min(_t.duration, Math.max(nMsecOffset, 0)); // position >= 0 and <= current available (loaded) duration
      _t._iO.position = offset;
      if (!bNoDebug) {
        // _s._wD('SMSound.setPosition('+nMsecOffset+')'+(nMsecOffset != offset?', corrected value: '+offset:''));
      }
      _s.o._setPosition(_t.sID, (_s.flashVersion == 9?_t._iO.position:_t._iO.position / 1000), (_t.paused || !_t.playState)); // if paused or not playing, will not resume (by playing)
    };

    this.pause = function() {
      if (_t.paused || _t.playState === 0) {
        return false;
      }
      _s._wD('SMSound.pause()');
      _t.paused = true;
      _s.o._pause(_t.sID);
      if (_t._iO.onpause) {
        _t._iO.onpause.apply(_t);
      }
    };

    this.resume = function() {
      if (!_t.paused || _t.playState === 0) {
        return false;
      }
      _s._wD('SMSound.resume()');
      _t.paused = false;
      _s.o._pause(_t.sID); // flash method is toggle-based (pause/resume)
      if (_t._iO.onresume) {
        _t._iO.onresume.apply(_t);
      }
    };

    this.togglePause = function() {
      _s._wD('SMSound.togglePause()');
      if (_t.playState === 0) {
        _t.play({
          position: (_s.flashVersion == 9?_t.position:_t.position / 1000)
        });
        return false;
      }
      if (_t.paused) {
        _t.resume();
      } else {
        _t.pause();
      }
    };

    this.setPan = function(nPan, bInstanceOnly) {
      if (typeof nPan == 'undefined') {
        nPan = 0;
      }
      if (typeof bInstanceOnly == 'undefined') {
        bInstanceOnly = false;
      }
      _s.o._setPan(_t.sID, nPan);
      _t._iO.pan = nPan;
      if (!bInstanceOnly) {
        _t.pan = nPan;
      }
    };

    this.setVolume = function(nVol, bInstanceOnly) {
      if (typeof nVol == 'undefined') {
        nVol = 100;
      }
      if (typeof bInstanceOnly == 'undefined') {
        bInstanceOnly = false;
      }
      _s.o._setVolume(_t.sID, (_s.muted && !_t.muted) || _t.muted?0:nVol);
      _t._iO.volume = nVol;
      if (!bInstanceOnly) {
        _t.volume = nVol;
      }
    };

    this.mute = function() {
      _t.muted = true;
      _s.o._setVolume(_t.sID, 0);
    };

    this.unmute = function() {
      _t.muted = false;
      var hasIO = typeof _t._iO.volume != 'undefined';
      _s.o._setVolume(_t.sID, hasIO?_t._iO.volume:_t.options.volume);
    };

    this.toggleMute = function() {
      if (_t.muted) {
        _t.unmute();
      } else {
        _t.mute();
      }
    };

    // --- "private" methods called by Flash ---

    this._whileloading = function(nBytesLoaded, nBytesTotal, nDuration) {
      if (!_t._iO.isMovieStar) {
        _t.bytesLoaded = nBytesLoaded;
        _t.bytesTotal = nBytesTotal;
        _t.duration = Math.floor(nDuration);
        _t.durationEstimate = parseInt((_t.bytesTotal / _t.bytesLoaded) * _t.duration, 10);
        if (_t.durationEstimate === undefined) {
          // reported bug?
          _t.durationEstimate = _t.duration;
        }
        if (_t.readyState != 3 && _t._iO.whileloading) {
          _t._iO.whileloading.apply(_t);
        }
      } else {
        _t.bytesLoaded = nBytesLoaded;
        _t.bytesTotal = nBytesTotal;
        _t.duration = Math.floor(nDuration);
        _t.durationEstimate = _t.duration;
        if (_t.readyState != 3 && _t._iO.whileloading) {
          _t._iO.whileloading.apply(_t);
        }
      }
    };

    this._onid3 = function(oID3PropNames, oID3Data) {
      // oID3PropNames: string array (names)
      // ID3Data: string array (data)
      _s._wD('SMSound._onid3(): "'+this.sID+'" ID3 data received.');
      var oData = [];
      for (var i=0, j = oID3PropNames.length; i<j; i++) {
        oData[oID3PropNames[i]] = oID3Data[i];
        // _s._wD(oID3PropNames[i]+': '+oID3Data[i]);
      }
      _t.id3 = _s._mergeObjects(_t.id3, oData);
      if (_t._iO.onid3) {
        _t._iO.onid3.apply(_t);
      }
    };

    this._whileplaying = function(nPosition, oPeakData, oWaveformDataLeft, oWaveformDataRight, oEQData) {

      if (isNaN(nPosition) || nPosition === null) {
        return false; // Flash may return NaN at times
      }
      if (_t.playState === 0 && nPosition > 0) {
        // can happen at the end of a video where nPosition == 33 for some reason, after finishing.???
        // can also happen with a normal stop operation. This resets the position to 0.
        // _s._writeDebug('Note: Not playing, but position = '+nPosition);
        nPosition = 0;
      }
      _t.position = nPosition;

	  if (_s.flashVersion > 8) {
        if (_t._iO.usePeakData && typeof oPeakData != 'undefined' && oPeakData) {
          _t.peakData = {
            left: oPeakData.leftPeak,
            right: oPeakData.rightPeak
          };
        }
        if (_t._iO.useWaveformData && typeof oWaveformDataLeft != 'undefined' && oWaveformDataLeft) {
          _t.waveformData = {
            left: oWaveformDataLeft.split(','),
            right: oWaveformDataRight.split(',')
          };
        }
        if (_t._iO.useEQData) {
          if (typeof oEQData != 'undefined' && oEQData.leftEQ) {
            var eqLeft = oEQData.leftEQ.split(',');
            _t.eqData = eqLeft;
            _t.eqData.left = eqLeft;
            if (typeof oEQData.rightEQ != 'undefined' && oEQData.rightEQ) {
              _t.eqData.right = oEQData.rightEQ.split(',');
            }
          }
        }
	  }

      if (_t.playState == 1) {
        // special case/hack: ensure buffering is false (instant load from cache, thus buffering stuck at 1?)
        if (_t.isBuffering) {
          _t._onbufferchange(0);
        }
        if (_t._iO.whileplaying) {
          _t._iO.whileplaying.apply(_t); // flash may call after actual finish
        }
        if (_t.loaded && _t._iO.onbeforefinish && _t._iO.onbeforefinishtime && !_t.didBeforeFinish && _t.duration - _t.position <= _t._iO.onbeforefinishtime) {
          _s._wD('duration-position &lt;= onbeforefinishtime: '+_t.duration+' - '+_t.position+' &lt= '+_t._iO.onbeforefinishtime+' ('+(_t.duration - _t.position)+')');
          _t._onbeforefinish();
        }
      }
    };

    this._onload = function(bSuccess) {
	  var fN = 'SMSound._onload(): ';
      bSuccess = (bSuccess == 1?true:false);
      _s._wD(fN+'"'+_t.sID+'"'+(bSuccess?' loaded.':' failed to load? - '+_t.url), (bSuccess?1:2));
      if (!bSuccess) {
        if (_s.sandbox.noRemote === true) {
          _s._wD(fN+_s._str('noNet'), 1);
        }
        if (_s.sandbox.noLocal === true) {
          _s._wD(fN+_s._str('noLocal'), 1);
        }
      }
      _t.loaded = bSuccess;
      _t.readyState = bSuccess?3:2;
      if (_t._iO.onload) {
        _t._iO.onload.apply(_t);
      }
    };

    this._onbeforefinish = function() {
      if (!_t.didBeforeFinish) {
        _t.didBeforeFinish = true;
        if (_t._iO.onbeforefinish) {
          _s._wD('SMSound._onbeforefinish(): "'+_t.sID+'"');
          _t._iO.onbeforefinish.apply(_t);
        }
      }
    };

    this._onjustbeforefinish = function(msOffset) {
      // msOffset: "end of sound" delay actual value (eg. 200 msec, value at event fire time was 187)
      if (!_t.didJustBeforeFinish) {
        _t.didJustBeforeFinish = true;
        if (_t._iO.onjustbeforefinish) {
          _s._wD('SMSound._onjustbeforefinish(): "'+_t.sID+'"');
          _t._iO.onjustbeforefinish.apply(_t);
        }
      }
    };

    this._onfinish = function() {
      // sound has finished playing
      // TODO: calling user-defined onfinish() should happen after setPosition(0)
      // OR: onfinish() and then setPosition(0) is bad.
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
          // _t.setPosition(0);
          _t.playState = 0;
          _t.paused = false;
          _t.instanceCount = 0;
          _t.instanceOptions = {};
        }
        if (!_t.instanceCount || _t._iO.multiShotEvents) {
          // fire onfinish for last, or every instance
          if (_t._iO.onfinish) {
            _s._wD('SMSound._onfinish(): "'+_t.sID+'"');
            _t._iO.onfinish.apply(_t);
          }
        }
      } else {
        if (_t.useVideo) {
          // video has finished
          // may need to reset position for next play call, "rewind"
          // _t.setPosition(0);
        }
        // _t.setPosition(0);
      }

    };

    this._onmetadata = function(oMetaData) {
      // movieStar mode only
      var fN = 'SMSound.onmetadata()';
      _s._wD(fN);
      // Contains a subset of metadata. Note that files may have their own unique metadata.
      // http://livedocs.adobe.com/flash/9.0/main/wwhelp/wwhimpl/common/html/wwhelp.htm?context=LiveDocs_Parts&file=00000267.html
      if (!oMetaData.width && !oMetaData.height) {
        _s._wDS('noWH');
        oMetaData.width = 320;
        oMetaData.height = 240;
      }
      _t.metadata = oMetaData; // potentially-large object from flash
      _t.width = oMetaData.width;
      _t.height = oMetaData.height;
      if (_t._iO.onmetadata) {
        _s._wD(fN+': "'+_t.sID+'"');
        _t._iO.onmetadata.apply(_t);
      }
      _s._wD(fN+' complete');
    };

    this._onbufferchange = function(bIsBuffering) {
	  var fN = 'SMSound._onbufferchange()';
      if (_t.playState === 0) {
        // ignore if not playing
        return false;
      }
      if (bIsBuffering == _t.isBuffering) {
        // ignore initial "false" default, if matching
        _s._wD(fN+': ignoring false default / loaded sound');
        return false;
      }
      _t.isBuffering = (bIsBuffering == 1?true:false);
      if (_t._iO.onbufferchange) {
        _s._wD(fN+': '+bIsBuffering);
        _t._iO.onbufferchange.apply(_t);
      }
    };

    this._ondataerror = function(sError) {
      // flash 9 wave/eq data handler
      if (_t.playState > 0) { // hack: called at start, and end from flash at/after onfinish().
        _s._wD('SMSound._ondataerror(): '+sError);
        if (_t._iO.ondataerror) {
          _t._iO.ondataerror.apply(_t);
        }
      } else {
        // _s._wD('SMSound._ondataerror(): ignoring');
      }
    };

  }; // SMSound()

  this._onfullscreenchange = function(bFullScreen) {
    _s._wD('onfullscreenchange(): '+bFullScreen);
    _s.isFullScreen = (bFullScreen == 1?true:false);
    if (!_s.isFullScreen) {
      // attempt to restore window focus after leaving full-screen
      try {
        window.focus();
        _s._wD('window.focus()');
      } catch(e) {
        // oh well
      }
    }
  };

  // register a few event handlers
  if (window.addEventListener) {
    window.addEventListener('focus', _s.handleFocus, false);
    window.addEventListener('load', _s.beginDelayedInit, false);
    window.addEventListener('unload', _s.destruct, false);
    if (_s._tryInitOnFocus) {
      window.addEventListener('mousemove', _s.handleFocus, false); // massive Safari focus hack
    }
  } else if (window.attachEvent) {
    window.attachEvent('onfocus', _s.handleFocus);
    window.attachEvent('onload', _s.beginDelayedInit);
    window.attachEvent('unload', _s.destruct);
  } else {
    // no add/attachevent support - safe to assume no JS -> Flash either.
    _s._debugTS('onload', false);
    soundManager.onerror();
    soundManager.disable();
  }

  if (document.addEventListener) {
    document.addEventListener('DOMContentLoaded', _s.domContentLoaded, false);
  }

} // SoundManager()

// var SM2_DEFER = true; // un-comment or define in your own script to prevent immediate SoundManager() constructor call+start-up.
// if deferring, construct later with window.soundManager = new SoundManager(); followed by soundManager.beginDelayedInit();

if (typeof SM2_DEFER == 'undefined' || !SM2_DEFER) {
  soundManager = new SoundManager();
}