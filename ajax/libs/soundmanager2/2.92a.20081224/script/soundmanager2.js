/*!
   SoundManager 2: Javascript Sound for the Web
   --------------------------------------------
   http://schillmania.com/projects/soundmanager2/

   Copyright (c) 2008, Scott Schiller. All rights reserved.
   Code licensed under the BSD License:
   http://schillmania.com/projects/soundmanager2/license.txt

   V2.92a.20081224
*/

var soundManager = null;

function SoundManager(smURL,smID) {
 
  this.flashVersion = 8;           // version of flash to require, either 8 or 9. Some API features require Flash 9.
  this.debugMode = true;           // enable debugging output (div#soundmanager-debug, OR console if available + configured)
  this.useConsole = true;          // use firebug/safari console.log()-type debug console if available
  this.consoleOnly = false;        // if console is being used, do not create/write to #soundmanager-debug
  this.waitForWindowLoad = false;  // force SM2 to wait for window.onload() before trying to call soundManager.onload()
  this.nullURL = 'null.mp3';       // path to "null" (empty) MP3 file, used to unload sounds (Flash 8 only)
  this.allowPolling = true;        // allow flash to poll for status update (required for "while playing", peak, sound spectrum functions to work.)
  this.useMovieStar = false;	   // enable support for Flash 9.0r115+ (codename "MovieStar") MPEG4 audio + video formats (AAC, M4V, FLV, MOV etc.)
  this.useHighPerformance = true;  // flash positioning trick, improves JS/flash callback speed, minimizes delay
  this.bgColor = '#ffffff';	   // movie (.swf) background color, useful if showing on-screen for video etc.

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
    'position': null,              // offset (milliseconds) to seek to within loaded sound data.
    'pan': 0,                      // "pan" settings, left-to-right, -100 to 100
    'volume': 100                  // self-explanatory. 0-100, the latter being the max.
  };

  this.flash9Options = {           // flash 9-only options, merged into defaultOptions if flash 9 is being used
    'isMovieStar': null,	   // "MovieStar" MPEG4 audio/video mode. Null (default) = auto detect MP4, AAC etc. based on URL. true = force on, ignore URL
    'usePeakData': false,          // enable left/right channel peak (level) data
    'useWaveformData': false,      // enable sound spectrum (raw waveform data) - WARNING: CPU-INTENSIVE: may set CPUs on fire.
    'useEQData': false             // enable sound EQ (frequency spectrum data) - WARNING: Also CPU-intensive.
  };

  this.movieStarOptions = {        // flash 9.0r115+ MPEG4 audio/video options, merged into defaultOptions if flash 9 + movieStar mode is enabled
    'onmetadata': null,		   // callback for when video width/height etc. are received
    'useVideo': false		   // if loading movieStar content, whether to show video
  };

  // jslint global declarations
  /*global alert, console, document, navigator, setTimeout, window */

  var SMSound = null; // defined later

  var _s = this;
  this.version = null;
  this.versionNumber = 'V2.92a.20081224';
  this.movieURL = null;
  this.url = null;
  this.altURL = null;
  this.swfLoaded = false;
  this.enabled = false;
  this.o = null;
  this.id = (smID||'sm2movie');
  this.oMC = null;
  this.sounds = {};
  this.soundIDs = [];
  this.muted = false;
  this.isIE = (navigator.userAgent.match(/MSIE/i));
  this.isSafari = (navigator.userAgent.match(/safari/i));
  this.isGecko = (navigator.userAgent.match(/gecko/i));
  this.debugID = 'soundmanager-debug';
  this._debugOpen = true;
  this._didAppend = false;
  this._appendSuccess = false;
  this._didInit = false;
  this._disabled = false;
  this._windowLoaded = false;
  this._hasConsole = (typeof console != 'undefined' && typeof console.log != 'undefined');
  this._debugLevels = ['log','info','warn','error'];
  this._defaultFlashVersion = 8;

  this.filePatterns = {
	flash8: /\.mp3(\?.*)?$/i,
	flash9: /\.mp3(\?.*)?$/i
  };

  this.netStreamTypes = ['aac','flv','mov','mp4','m4v','f4v','m4a','mp4v','3gp','3g2']; // Flash v9.0r115+ "moviestar" formats
  this.netStreamPattern = new RegExp('\\.('+this.netStreamTypes.join('|')+')(\\?.*)?$','i');

  this.filePattern = null;
  this.features = {
    peakData: false,
    waveformData: false,
    eqData: false
  };

  this.sandbox = {
    'type': null,
    'types': {
      'remote': 'remote (domain-based) rules',
      'localWithFile': 'local with file access (no internet access)',
      'localWithNetwork': 'local with network (internet access only, no local access)',
      'localTrusted': 'local, trusted (local + internet access)'
    },
    'description': null,
    'noRemote': null,
    'noLocal': null
  };

  this._setVersionInfo = function() {
    if (_s.flashVersion != 8 && _s.flashVersion != 9) {
      alert('soundManager.flashVersion must be 8 or 9. "'+_s.flashVersion+'" is invalid. Reverting to '+_s._defaultFlashVersion+'.');
      _s.flashVersion = _s._defaultFlashVersion;
    }
    _s.version = _s.versionNumber+(_s.flashVersion==9?' (AS3/Flash 9)':' (AS2/Flash 8)');
    // set up default options
	if (_s.flashVersion > 8) {
	  _s.defaultOptions = _s._mergeObjects(_s.defaultOptions,_s.flash9Options);
	}
    if (_s.flashVersion > 8 && _s.useMovieStar) {
      // flash 9+ support for movieStar formats as well as MP3
      _s.defaultOptions = _s._mergeObjects(_s.defaultOptions,_s.movieStarOptions);
      _s.filePatterns.flash9 = new RegExp('\\.(mp3|'+_s.netStreamTypes.join('|')+')(\\?.*)?$','i');
    } else {
      _s.useMovieStar = false;
    }
    _s.filePattern = _s.filePatterns[(_s.flashVersion!=8?'flash9':'flash8')];
    _s.movieURL = (_s.flashVersion==8?'soundmanager2.swf':'soundmanager2_flash9.swf');
    _s.features.peakData = _s.features.waveformData = _s.features.eqData = (_s.flashVersion==9);
  };

  this._overHTTP = (document.location?document.location.protocol.match(/http/i):null);
  this._waitingforEI = false;
  this._initPending = false;
  this._tryInitOnFocus = (this.isSafari && typeof document.hasFocus == 'undefined');
  this._isFocused = (typeof document.hasFocus != 'undefined'?document.hasFocus():null);
  this._okToDisable = !this._tryInitOnFocus;

  this.useAltURL = !this._overHTTP; // use altURL if not "online"

  var flashCPLink = 'http://www.macromedia.com/support/documentation/en/flashplayer/help/settings_manager04.html';

  // --- public methods ---
  
  this.supported = function() {
    return (_s._didInit && !_s._disabled);
  };

  this.getMovie = function(smID) {
    return _s.isIE?window[smID]:(_s.isSafari?document.getElementById(smID)||document[smID]:document.getElementById(smID));
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
    if (!_s._didInit) {
	  throw new Error('soundManager.createSound(): Not loaded yet - wait for soundManager.onload() before calling sound-related methods');
	}
    if (arguments.length == 2) {
      // function overloading in JS! :) ..assume simple createSound(id,url) use case
      oOptions = {'id':arguments[0],'url':arguments[1]};
    }
    var thisOptions = _s._mergeObjects(oOptions); // inherit SM2 defaults
    var _tO = thisOptions; // alias
    _s._wD('soundManager.createSound(): '+_tO.id+' ('+_tO.url+')',1);
    if (_s._idCheck(_tO.id,true)) {
      _s._wD('soundManager.createSound(): '+_tO.id+' exists',1);
      return _s.sounds[_tO.id];
    }
    if (_s.flashVersion > 8 && _s.useMovieStar) {
	  if (_tO.isMovieStar === null) {
	    _tO.isMovieStar = (_tO.url.match(_s.netStreamPattern)?true:false);
	  }
	  if (_tO.isMovieStar) {
	    _s._wD('soundManager.createSound(): using MovieStar handling');
	  }
	  if (_tO.isMovieStar && (_tO.usePeakData || _tO.useWaveformData || _tO.useEQData)) {
	    _s._wD('Warning: peak/waveform/eqData features unsupported for non-MP3 formats');
	    _tO.usePeakData = false;
		_tO.useWaveformData = false;
		_tO.useEQData = false;
	  }
    }
    _s.sounds[_tO.id] = new SMSound(_tO);
    _s.soundIDs[_s.soundIDs.length] = _tO.id;
    // AS2:
    if (_s.flashVersion == 8) {
      _s.o._createSound(_tO.id,_tO.onjustbeforefinishtime);
    } else {
      _s.o._createSound(_tO.id,_tO.url,_tO.onjustbeforefinishtime,_tO.usePeakData,_tO.useWaveformData,_tO.useEQData,_tO.isMovieStar,(_tO.isMovieStar?_tO.useVideo:false));
    }
    if (_tO.autoLoad || _tO.autoPlay) {
      // TODO: does removing timeout here cause problems?
        if (_s.sounds[_tO.id]) {
          _s.sounds[_tO.id].load(_tO);
        }
    }
    if (_tO.autoPlay) {
	  if (_s.flashVersion == 8) {
	    _s.sounds[_tO.id].playState = 1; // we can only assume this sound will be playing soon.
	  } else {
	    _s.sounds[_tO.id].play();	
	  }
	}
    return _s.sounds[_tO.id];
  };

  this.createVideo = function(oOptions) {
    if (arguments.length==2) {
      oOptions = {'id':arguments[0],'url':arguments[1]};
    }
    if (_s.flashVersion >= 9) {
      oOptions.isMovieStar = true;
      oOptions.useVideo = true;
    } else {
      _s._wD('soundManager.createVideo(): flash 9 required for video. Exiting.',2);
      return false;
    }
    if (!_s.useMovieStar) {
      _s._wD('soundManager.createVideo(): MovieStar mode not enabled. Exiting.',2);
    }
    return _s.createSound(oOptions);
  };

  this.destroySound = function(sID,bFromSound) {
    // explicitly destroy a sound before normal page unload, etc.
    if (!_s._idCheck(sID)) {
      return false;
    }
    for (var i=0; i<_s.soundIDs.length; i++) {
      if (_s.soundIDs[i] == sID) {
	    _s.soundIDs.splice(i,1);
        continue;
      }
    }
    // conservative option: avoid crash with ze flash 8
    // calling destroySound() within a sound onload() might crash firefox, certain flavours of winXP + flash 8??
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

  this.load = function(sID,oOptions) {
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

  this.play = function(sID,oOptions) {
    if (!_s._idCheck(sID)) {
      if (typeof oOptions != 'Object') {
		oOptions = {url:oOptions}; // overloading use case: play('mySound','/path/to/some.mp3');
	  }
      if (oOptions && oOptions.url) {
        // overloading use case, creation + playing of sound: .play('someID',{url:'/path/to.mp3'});
        _s._wD('soundController.play(): attempting to create "'+sID+'"',1);
        oOptions.id = sID;
        _s.createSound(oOptions);
      } else {
        return false;
      }
    }
    _s.sounds[sID].play(oOptions);
  };

  this.start = this.play; // just for convenience

  this.setPosition = function(sID,nMsecOffset) {
    if (!_s._idCheck(sID)) {
      return false;
    }
    _s.sounds[sID].setPosition(nMsecOffset);
  };

  this.stop = function(sID) {
    if (!_s._idCheck(sID)) {
	  return false;
	}
    _s._wD('soundManager.stop('+sID+')',1);
    _s.sounds[sID].stop(); 
  };

  this.stopAll = function() {
    _s._wD('soundManager.stopAll()',1);
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

  this.setPan = function(sID,nPan) {
    if (!_s._idCheck(sID)) {
	  return false;
	}
    _s.sounds[sID].setPan(nPan);
  };

  this.setVolume = function(sID,nVol) {
    if (!_s._idCheck(sID)) {
	  return false;
	}
    _s.sounds[sID].setVolume(nVol);
  };

  this.mute = function(sID) {
	if (typeof sID != 'string') {
	  sID = null;
	}
    if (!sID) {
      _s._wD('soundManager.mute(): Muting all sounds');
      for (var i=_s.soundIDs.length; i--;) {
        _s.sounds[_s.soundIDs[i]].mute();
      }
      _s.muted = true;
    } else {
      if (!_s._idCheck(sID)) {
	    return false;
	  }
      _s._wD('soundManager.mute(): Muting "'+sID+'"');
      _s.sounds[sID].mute();
    }
  };

  this.muteAll = function() {
    _s.mute();
  };

  this.unmute = function(sID) {
    if (typeof sID != 'string') {
	  sID = null;
	}
    if (!sID) {
      _s._wD('soundManager.unmute(): Unmuting all sounds');
      for (var i=_s.soundIDs.length; i--;) {
        _s.sounds[_s.soundIDs[i]].unmute();
      }
      _s.muted = false;
    } else {
      if (!_s._idCheck(sID)) {
		return false;
	  }
      _s._wD('soundManager.unmute(): Unmuting "'+sID+'"');
      _s.sounds[sID].unmute();
    }
  };

  this.unmuteAll = function() {
    _s.unmute();
  };

  this.setPolling = function(bPolling) {
    if (!_s.o || !_s.allowPolling) {
	  return false;
	}
    // _s._wD('soundManager.setPolling('+bPolling+')');
    _s.o._setPolling(bPolling);
  };

  this.disable = function(bUnload) {
    // destroy all functions
    if (_s._disabled) {
	  return false;
	}
    _s._disabled = true;
    _s._wD('soundManager.disable(): Disabling all functions - future calls will return false.',1);
    for (var i=_s.soundIDs.length; i--;) {
      _s._disableObject(_s.sounds[_s.soundIDs[i]]);
    }
    _s.initComplete(); // fire "complete", despite fail
    _s._disableObject(_s);
  };

  this.canPlayURL = function(sURL) {
    return (sURL?(sURL.match(_s.filePattern)?true:false):null);	
  };

  this.getSoundById = function(sID,suppressDebug) {
    if (!sID) {
	  throw new Error('SoundManager.getSoundById(): sID is null/undefined');
	}
    var result = _s.sounds[sID];
    if (!result && !suppressDebug) {
      _s._wD('"'+sID+'" is an invalid sound ID.',2);
      // soundManager._wD('trace: '+arguments.callee.caller);
    }
    return result;
  };

  this.onload = function() {
    // window.onload() equivalent for SM2, ready to create sounds etc.
    // this is a stub - you can override this in your own external script, eg. soundManager.onload = function() {}
    soundManager._wD('<em>Warning</em>: soundManager.onload() is undefined.',2);
  };

  this.onerror = function() {
    // stub for user handler, called when SM2 fails to load/init
  };

  // --- "private" methods ---

  this._idCheck = this.getSoundById;

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

  this._failSafely = function() {
    // exception handler for "object doesn't support this property or method" or general failure
    if (!_s._disabled) {
      _s._wD('soundManager: Failed to initialise.',2);
      _s.disable();
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
      } else if (smURL.lastIndexOf('/') != smURL.length-1) {
        smURL = smURL+'/';
      }
    }
    return(smURL && smURL.lastIndexOf('/')!=-1?smURL.substr(0,smURL.lastIndexOf('/')+1):'./')+_s.movieURL;
  };

  this._getDocument = function() {
    return (document.body?document.body:(document.documentElement?document.documentElement:document.getElementsByTagName('div')[0]));
  };

  this._getDocument._protected = true;

  this._createMovie = function(smID,smURL) {
    if (_s._didAppend && _s._appendSuccess) {
	  return false; // ignore if already succeeded
	}
    if (window.location.href.indexOf('debug=1')+1) {
	  _s.debugMode = true; // allow force of debug mode via URL
	}
    _s._didAppend = true;
	
    // safety check for legacy (change to Flash 9 URL)
    _s._setVersionInfo();
    var remoteURL = (smURL?smURL:_s.url);
    var localURL = (_s.altURL?_s.altURL:remoteURL);
    _s.url = _s._normalizeMovieURL(_s._overHTTP?remoteURL:localURL);
    smURL = _s.url;

    var specialCase = null;
    if (_s.useHighPerformance && navigator.userAgent.match(/firefox\/2/i)) {
      // no highPerformance for firefox 2. Causes failure on some pages, exact cause unknown at this point.
      specialCase = 'Warning: disabling highPerformance, incompatible with Firefox 2.x';
      _s.useHighPerformance = false;
    }

    if (_s.useHighPerformance && _s.useMovieStar) {
	  specialCase = 'Warning: disabling highPerformance, not applicable with movieStar mode on';
	  _s.useHighPerformance = false;
	}

    var oEmbed = {
      name: smID,
      id: smID,
      src: smURL,
      width: '100%',
      height: '100%',
      quality: 'high',
      allowScriptAccess: 'always',
      bgcolor: _s.bgColor,
      pluginspage: 'http://www.macromedia.com/go/getflashplayer',
      type: 'application/x-shockwave-flash'
    };

    var oObject = {
      id: smID,
      data: smURL,
      type: 'application/x-shockwave-flash',
      width: '100%',
      height: '100%'
    };

    var oObjectParams = {
      movie: smURL,
      AllowScriptAccess: 'always',
      quality: 'high',
      bgcolor: _s.bgColor
    };

    if (_s.useHighPerformance && !_s.useMovieStar) {
      oEmbed.wmode = 'transparent';
      oObjectParams.wmode = 'transparent';
    }

    var oMovie = null;
    var tmp = null;

    if (_s.isIE) {

      // IE is "special".
      oMovie = document.createElement('div');
      var movieHTML = '<object id="'+smID+'" data="'+smURL+'" type="application/x-shockwave-flash" width="100%" height="100%"><param name="movie" value="'+smURL+'" /><param name="AllowScriptAccess" value="always" /><param name="quality" value="high" />'+(_s.useHighPerformance && !_s.useMovieStar?'<param name="wmode" value="transparent" /> ':'')+'<param name="bgcolor" value="'+_s.bgColor+'" /><!-- --></object>';

    } else {

      oMovie = document.createElement('embed');
      for (tmp in oEmbed) {
	    if (oEmbed.hasOwnProperty(tmp)) {
          oMovie.setAttribute(tmp,oEmbed[tmp]);
		}
      }
    }

    var oD = document.createElement('div');
    oD.id = _s.debugID+'-toggle';
    var oToggle = {
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

    var appXHTML = 'soundManager._createMovie(): appendChild/innerHTML set failed. May be app/xhtml+xml DOM-related.';

    var oTarget = _s._getDocument();

    if (oTarget) {
       
      _s.oMC = document.getElementById('sm2-container')?document.getElementById('sm2-container'):document.createElement('div');

      if (!_s.oMC.id) {
        _s.oMC.id = 'sm2-container';
        _s.oMC.className = 'movieContainer';
        // "hide" flash movie
        var s = null;
        if (_s.useHighPerformance) {
          s = {
 	    	position: 'fixed',
		    width: '8px',
            height: '8px', // must be at least 6px for flash to run fast. odd? yes.
            bottom: '0px',
            left: '0px',
	    	zIndex:-1 // sit behind everything else
          };
        } else {
          s = {
            position: 'absolute',
		    width: '1px',
            height: '1px',
            bottom: '0px',
            left: '0px'
          };
        }
        var x = null;
        for (x in s) {
		  if (s.hasOwnProperty(x)) {
            _s.oMC.style[x] = s[x];
		  }
        }
        try {
		  if (!_s.isIE) {
    	    _s.oMC.appendChild(oMovie);
		  }
          oTarget.appendChild(_s.oMC);
		  if (_s.isIE) {
            _s.oMC.innerHTML = movieHTML;
          }
          _s._appendSuccess = true;
        } catch(e) {
          throw new Error(appXHTML);
        }
      } else {
        // it's already in the document.
        _s.oMC.appendChild(oMovie);
		if (_s.isIE) {
		  // possibly destructive write
          _s.oMC.innerHTML = movieHTML;
        }
        _s._appendSuccess = true;
      }

      if (!document.getElementById(_s.debugID) && ((!_s._hasConsole||!_s.useConsole)||(_s.useConsole && _s._hasConsole && !_s.consoleOnly))) {
        var oDebug = document.createElement('div');
        oDebug.id = _s.debugID;
        oDebug.style.display = (_s.debugMode?'block':'none');
        if (_s.debugMode) {
          try {
            // var oD = document.createElement('div');
            oTarget.appendChild(oD);
            // oD.innerHTML = toggleElement;
          } catch(e2) {
            throw new Error(appXHTML);
          }
        }
        oTarget.appendChild(oDebug);
      }
      oTarget = null;
    }

    if (specialCase) {
      _s._wD(specialCase);
    }

    _s._wD('-- SoundManager 2 '+_s.version+(_s.useMovieStar?', MovieStar mode':'')+(_s.useHighPerformance?', high performance mode':'')+' --',1);
    _s._wD('soundManager._createMovie(): Trying to load '+smURL+(!_s._overHTTP && _s.altURL?'(alternate URL)':''),1);
  };

  // aliased to this._wD()
  this._writeDebug = function(sText,sType,bTimestamp) {
    if (!_s.debugMode) {
	  return false;
	}
    if (typeof bTimestamp != 'undefined' && bTimestamp) {
      sText = sText + ' | '+new Date().getTime();
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
    try {
      var o = document.getElementById(sDID);
      if (!o) {
		return false;
	  }
      var oItem = document.createElement('div');
      // sText = sText.replace(/\n/g,'<br />');
      if (typeof sType == 'undefined') {
        sType = 0;
      } else {
        sType = parseInt(sType,10);
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
      o.insertBefore(oItem,o.firstChild); // bottom-to-top
    } catch(e) {
      // oh well
    }
    o = null;
  };
  this._writeDebug._protected = true;
  this._wD = this._writeDebug;

  this._wDAlert = function(sText) { alert(sText); };

  if (window.location.href.indexOf('debug=alert')+1 && _s.debugMode) {
    _s._wD = _s._wDAlert;
  }

  this._toggleDebug = function() {
    var o = document.getElementById(_s.debugID);
    var oT = document.getElementById(_s.debugID+'-toggle');
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
    _s._wD('--- soundManager._debug(): Current sound objects ---',1);
    for (var i=0,j=_s.soundIDs.length; i<j; i++) {
      _s.sounds[_s.soundIDs[i]]._debug();
    }
  };

  this._mergeObjects = function(oMain,oAdd) {
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
	  return false; // pre-init may have fired this function before window.onload(), may already exist
	}
    _s.o = _s.getMovie(_s.id); // try to get flash movie (inline markup)
    if (!_s.o) {
      // try to create
      _s._createMovie(_s.id,_s.url);
      _s.o = _s.getMovie(_s.id);
    }
    if (_s.o) {
      _s._wD('soundManager._initMovie(): Got '+_s.o.nodeName+' element ('+(_s._didAppend?'created via JS':'static HTML')+')',1);
      _s._wD('soundManager._initMovie(): Waiting for ExternalInterface call from Flash..');
    }
  };

  this.waitForExternalInterface = function() {
    if (_s._waitingForEI) {
	  return false;
	}
    _s._waitingForEI = true;
    if (_s._tryInitOnFocus && !_s._isFocused) {
      _s._wD('soundManager: Special case: Flash may not have started due to non-focused tab (Safari is lame), and/or focus cannot be detected. Waiting for focus-related event..');
      return false;
    }
    if (!_s._didInit) {
      _s._wD('soundManager: Getting impatient, still waiting for Flash.. ;)');
    }
    setTimeout(function() {
      if (!_s._didInit) {
        _s._wD('soundManager: No Flash response within reasonable time after document load.\nPossible causes: Flash version under 8, no support, or Flash security denying JS-Flash communication.',2);
        if (!_s._overHTTP) {
          _s._wD('soundManager: Loading this page from local/network file system (not over HTTP?) Flash security likely restricting JS-Flash access. Consider adding current URL to "trusted locations" in the Flash player security settings manager at '+flashCPLink+', or simply serve this content over HTTP.',2);
        }
      }
      // if still not initialized and no other options, give up
      if (!_s._didInit && _s._okToDisable) {
		_s._failSafely();
	  }
    },750);
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
      window.removeEventListener('mousemove',_s.handleFocus,false);
    }
    // allow init to restart
    _s._waitingForEI = false;
    setTimeout(_s.waitForExternalInterface,500);
    // detach event
    if (window.removeEventListener) {
      window.removeEventListener('focus',_s.handleFocus,false);
    } else if (window.detachEvent) {
      window.detachEvent('onfocus',_s.handleFocus);
    }
  };

  this.initComplete = function() {
    if (_s._didInit) {
	  return false;
	}
    _s._didInit = true;
    _s._wD('-- SoundManager 2 '+(_s._disabled?'failed to load':'loaded')+' ('+(_s._disabled?'security/load error':'OK')+') --',1);
    if (_s._disabled) {
      _s._wD('soundManager.initComplete(): calling soundManager.onerror()',1);
      _s.onerror.apply(window);
      return false;
    }
    if (_s.waitForWindowLoad && !_s._windowLoaded) {
      _s._wD('soundManager: Waiting for window.onload()');
      if (window.addEventListener) {
        window.addEventListener('load',_s.initUserOnload,false);
      } else if (window.attachEvent) {
        window.attachEvent('onload',_s.initUserOnload);
      }
      return false;
    } else {
      if (_s.waitForWindowLoad && _s._windowLoaded) {
        _s._wD('soundManager: Document already loaded');
      }
      _s.initUserOnload();
    }
  };

  this.initUserOnload = function() {
    _s._wD('soundManager.initComplete(): calling soundManager.onload()',1);
    // call user-defined "onload", scoped to window
    _s.onload.apply(window);
    _s._wD('soundManager.onload() complete',1);
  };

  this.init = function() {
    _s._wD('-- soundManager.init() --');
    // called after onload()
    _s._initMovie();
    if (_s._didInit) {
      _s._wD('soundManager.init(): Already called?');
      return false;
    }
    // event cleanup
    if (window.removeEventListener) {
      window.removeEventListener('load',_s.beginDelayedInit,false);
    } else if (window.detachEvent) {
      window.detachEvent('onload',_s.beginDelayedInit);
    }
    try {
      _s._wD('Attempting to call Flash from JS..');
      _s.o._externalInterfaceTest(false); // attempt to talk to Flash
      // _s._wD('Flash ExternalInterface call (JS-Flash) OK',1);
      if (!_s.allowPolling) {
	    _s._wD('Polling (whileloading/whileplaying support) is disabled.',1);
	  }
      _s.setPolling(true);
	  if (!_s.debugMode) {
		_s.o._disableDebug();
	  }
      _s.enabled = true;
    } catch(e) {
      _s._failSafely();
      _s.initComplete();
      return false;
    }
    _s.initComplete();
  };

  this.beginDelayedInit = function() {
    _s._wD('soundManager.beginDelayedInit(): Document loaded');
    _s._windowLoaded = true;
    setTimeout(_s.waitForExternalInterface,500);
    setTimeout(_s.beginInit,20);
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
    _s._wD('soundManager.domContentLoaded()');
    if (document.removeEventListener) {
	  document.removeEventListener('DOMContentLoaded',_s.domContentLoaded,false);
	}
    _s.go();
  };

  this._externalInterfaceOK = function() {
    // callback from flash for confirming that movie loaded, EI is working etc.
    if (_s.swfLoaded) {
	  return false;
	}
    _s._wD('soundManager._externalInterfaceOK()');
    _s.swfLoaded = true;
    _s._tryInitOnFocus = false;
    if (_s.isIE) {
      // IE needs a timeout OR delay until window.onload - may need TODO: investigating
      setTimeout(_s.init,100);
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
      _s._wD('Flash security note: Network/internet URLs will not load due to security restrictions. Access can be configured via Flash Player Global Security Settings Page: http://www.macromedia.com/support/documentation/en/flashplayer/help/settings_manager04.html',2);
    } else if (sb.type == 'localWithNetwork') {
      sb.noRemote = false;
      sb.noLocal = true;
    } else if (sb.type == 'localTrusted') {
      sb.noRemote = false;
      sb.noLocal = false;
    }
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
	      sF = sF.replace(/\s\s+/g,' '); // normalize spaces
	      sfBracket = sF.indexOf('{');
	      msg[msg.length] = ' '+stuff+': {'+sF.substr(sfBracket+1,(Math.min(Math.max(sF.indexOf('\n')-1,maxLength),maxLength))).replace(/\n/g,'')+'... }';
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
    Name/value pairs set via Flash when available - see reference for names:
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
    _t.instanceOptions = {};
    _t.instanceCount = 0;
    _t.peakData = {
      left: 0,
      right: 0
    };
    _t.waveformData = [];
    _t.eqData = [];
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
    } 
    if (typeof _t._iO.url == 'undefined') {
      _t._iO.url = _t.url;
    }
    _s._wD('soundManager.load(): '+_t._iO.url,1);

    if (_t._iO.url == _t.url && _t.readyState !== 0 && _t.readyState != 2) {
      _s._wD('soundManager.load(): current URL already assigned.',1);
      return false;
    }
    _t.loaded = false;
    _t.readyState = 1;
    _t.playState = (oOptions.autoPlay?1:0); // if autoPlay, assume "playing" is true (no way to detect when it actually starts in Flash unless onPlay is watched?)
    try {
      if (_s.flashVersion==8) {
        _s.o._load(_t.sID,_t._iO.url,_t._iO.stream,_t._iO.autoPlay,(_t._iO.whileloading?1:0));
      } else {
        _s.o._load(_t.sID,_t._iO.url,_t._iO.stream?true:false,_t._iO.autoPlay?true:false); // ,(_tO.whileloading?true:false)
        if (_t._iO.isMovieStar && _t._iO.autoLoad && !_t._iO.autoPlay) {
          // special case: MPEG4 content must start playing to load, then pause to prevent playing.
          _t.pause();
        }
      }
    } catch(e) {
      _s._wD('SMSound.load(): Exception: JS-Flash communication failed, or JS error.',2);
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
        _t.setPosition(0,true); // reset current sound positioning
      }
      _s.o._unload(_t.sID,_s.nullURL);
      // reset load/status flags
      _t.resetProperties();
    }
  };

  this.destruct = function() {
    // kill sound within Flash
    _s._wD('SMSound.destruct(): "'+_t.sID+'"');
    _s.o._destroySound(_t.sID);
    _s.destroySound(_t.sID,true); // ensure deletion from controller
  };

  this.play = function(oOptions) {
    if (!oOptions) {
	  oOptions = {};
    }
    _t._iO = _s._mergeObjects(oOptions,_t._iO);
    _t._iO = _s._mergeObjects(_t._iO,_t.options);
    _t.instanceOptions = _t._iO;
    if (_t.playState == 1) {
      var allowMulti = _t._iO.multiShot;
      if (!allowMulti) {
        _s._wD('SMSound.play(): "'+_t.sID+'" already playing (one-shot)',1);
        return false;
      } else {
        _s._wD('SMSound.play(): "'+_t.sID+'" already playing (multi-shot)',1);
      }
    }
    if (!_t.loaded) {
      if (_t.readyState === 0) {
        _s._wD('SMSound.play(): Attempting to load "'+_t.sID+'"',1);
        // try to get this sound playing ASAP
        _t._iO.stream = true;
        _t._iO.autoPlay = true;
        // TODO: need to investigate when false, double-playing
        // if (typeof oOptions.autoPlay=='undefined') _tO.autoPlay = true; // only set autoPlay if unspecified here
        _t.load(_t._iO); // try to get this sound playing ASAP
      } else if (_t.readyState == 2) {
        _s._wD('SMSound.play(): Could not load "'+_t.sID+'" - exiting',2);
        return false;
      } else {
        _s._wD('SMSound.play(): "'+_t.sID+'" is loading - attempting to play..',1);
      }
    } else {
      _s._wD('SMSound.play(): "'+_t.sID+'"');
    }
    if (_t.paused) {
      _t.resume();
    } else {
      _t.playState = 1;
      if (!_t.instanceCount || _s.flashVersion == 9) {
		_t.instanceCount++;
	  }
      _t.position = (typeof _t._iO.position != 'undefined' && !isNaN(_t._iO.position)?_t._iO.position:0);
      if (_t._iO.onplay) {
		_t._iO.onplay.apply(_t);
	  }
      _t.setVolume(_t._iO.volume);
      _t.setPan(_t._iO.pan);
      _s.o._start(_t.sID,_t._iO.loop||1,(_s.flashVersion==9?_t.position:_t.position/1000));
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
      _s.o._stop(_t.sID,bAll);
      _t.instanceCount = 0;
      _t._iO = {};
      // _t.instanceOptions = _t._iO;
    }
  };

  this.setPosition = function(nMsecOffset,bNoDebug) {
    if (typeof nMsecOffset == 'undefined') {
      nMsecOffset = 0;
    }
    var offset = Math.min(_t.duration,Math.max(nMsecOffset,0)); // position >= 0 and <= current available (loaded) duration
    _t._iO.position = offset;
    if (!bNoDebug) {
      _s._wD('SMSound.setPosition('+nMsecOffset+')'+(nMsecOffset != offset?', corrected value: '+offset:''));
    }
    _s.o._setPosition(_t.sID,(_s.flashVersion==9?_t._iO.position:_t._iO.position/1000),(_t.paused||!_t.playState)); // if paused or not playing, will not resume (by playing)
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
    if (!_t.playState) {
      _t.play({position:(_s.flashVersion==9?_t.position:_t.position/1000)});
      return false;
    }
    if (_t.paused) {
      _t.resume();
    } else {
      _t.pause();
    }
  };

  this.setPan = function(nPan) {
    if (typeof nPan == 'undefined') {
	  nPan = 0;
	}
    _s.o._setPan(_t.sID,nPan);
    _t._iO.pan = nPan;
  };

  this.setVolume = function(nVol) {
    if (typeof nVol == 'undefined') {
	  nVol = 100;
	}
    _s.o._setVolume(_t.sID,(_s.muted&&!_t.muted)||_t.muted?0:nVol);
    _t._iO.volume = nVol;
  };

  this.mute = function() {
	_t.muted = true;
    _s.o._setVolume(_t.sID,0);
  };

  this.unmute = function() {
	_t.muted = false;
    _s.o._setVolume(_t.sID,typeof _t._iO.volume != 'undefined'?_t._iO.volume:_t.options.volume);
  };

  // --- "private" methods called by Flash ---

  this._whileloading = function(nBytesLoaded,nBytesTotal,nDuration) {
    if (!_t._iO.isMovieStar) {
      _t.bytesLoaded = nBytesLoaded;
      _t.bytesTotal = nBytesTotal;
      _t.duration = Math.floor(nDuration);
      _t.durationEstimate = parseInt((_t.bytesTotal/_t.bytesLoaded)*_t.duration,10); // estimate total time (will only be accurate with CBR MP3s.)
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

  this._onid3 = function(oID3PropNames,oID3Data) {
    // oID3PropNames: string array (names)
    // ID3Data: string array (data)
    _s._wD('SMSound._onid3(): "'+this.sID+'" ID3 data received.');
    var oData = [];
    for (var i=0,j=oID3PropNames.length; i<j; i++) {
      oData[oID3PropNames[i]] = oID3Data[i];
      // _s._wD(oID3PropNames[i]+': '+oID3Data[i]);
    }
    _t.id3 = _s._mergeObjects(_t.id3,oData);
    if (_t._iO.onid3) {
	  _t._iO.onid3.apply(_t);
	}
  };

  this._whileplaying = function(nPosition,oPeakData,oWaveformData,oEQData) {
    if (isNaN(nPosition) || nPosition === null) {
	  return false; // Flash may return NaN at times
	}
    _t.position = nPosition;
	if (_t._iO.usePeakData && typeof oPeakData != 'undefined' && oPeakData) {
	  _t.peakData = {
	   left: oPeakData.leftPeak,
	   right: oPeakData.rightPeak
	  };
	}
	if (_t._iO.useWaveformData && typeof oWaveformData != 'undefined' && oWaveformData) {
	  _t.waveformData = oWaveformData;
	  /*
	  _t.spectrumData = {
	   left: oSpectrumData.left.split(','),
	   right: oSpectrumData.right.split(',')
	  }
	  */
	}
	if (_t._iO.useEQData && typeof oEQData != 'undefined' && oEQData) {
	  _t.eqData = oEQData;
	}
    if (_t.playState == 1) {
      if (_t._iO.whileplaying) {
	    _t._iO.whileplaying.apply(_t); // flash may call after actual finish
	}
      if (_t.loaded && _t._iO.onbeforefinish && _t._iO.onbeforefinishtime && !_t.didBeforeFinish && _t.duration-_t.position <= _t._iO.onbeforefinishtime) {
        _s._wD('duration-position &lt;= onbeforefinishtime: '+_t.duration+' - '+_t.position+' &lt= '+_t._iO.onbeforefinishtime+' ('+(_t.duration-_t.position)+')');
        _t._onbeforefinish();
      }
    }
  };

  this._onload = function(bSuccess) {
    bSuccess = (bSuccess==1?true:false);
    _s._wD('SMSound._onload(): "'+_t.sID+'"'+(bSuccess?' loaded.':' failed to load? - '+_t.url));
    if (!bSuccess) {
      if (_s.sandbox.noRemote === true) {
        _s._wD('SMSound._onload(): Reminder: Flash security is denying network/internet access',1);
      }
      if (_s.sandbox.noLocal === true) {
        _s._wD('SMSound._onload(): Reminder: Flash security is denying local access',1);
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
        if (_t._iO.onfinish) {
          _s._wD('SMSound._onfinish(): "'+_t.sID+'"');
          _t._iO.onfinish.apply(_t);
        }
      }
    } else {
      // _t.setPosition(0);
    }
  };

  this._onmetadata = function(oMetaData) {
    // movieStar mode only
    _s._wD('SMSound.onmetadata()');
    // Contains a subset of metadata. Note that files may have their own unique metadata.
    // http://livedocs.adobe.com/flash/9.0/main/wwhelp/wwhimpl/common/html/wwhelp.htm?context=LiveDocs_Parts&file=00000267.html
    if (!oMetaData.width && !oMetaData.height) {
	  _s._wD('No width/height given, assuming defaults');
	  oMetaData.width = 320;
	  oMetaData.height = 240;
    }
    _t.metadata = oMetaData; // potentially-large object from flash
    _t.width = oMetaData.width;
    _t.height = oMetaData.height;
    if (_t._iO.onmetadata) {
      _s._wD('SMSound._onmetadata(): "'+_t.sID+'"');
      _t._iO.onmetadata.apply(_t);
    }
    _s._wD('SMSound.onmetadata() complete');
  };

  }; // SMSound()

  // register a few event handlers
  if (window.addEventListener) {
    window.addEventListener('focus',_s.handleFocus,false);
    window.addEventListener('load',_s.beginDelayedInit,false);
    window.addEventListener('unload',_s.destruct,false);
    if (_s._tryInitOnFocus) {
      window.addEventListener('mousemove',_s.handleFocus,false); // massive Safari focus hack
    }
  } else if (window.attachEvent) {
    window.attachEvent('onfocus',_s.handleFocus);
    window.attachEvent('onload',_s.beginDelayedInit);
    window.attachEvent('unload',_s.destruct);
  } else {
    // no add/attachevent support - safe to assume no JS -> Flash either.
    soundManager.onerror();
    soundManager.disable();
  }

  if (document.addEventListener) {
	document.addEventListener('DOMContentLoaded',_s.domContentLoaded,false);
  }

} // SoundManager()

soundManager = new SoundManager();

