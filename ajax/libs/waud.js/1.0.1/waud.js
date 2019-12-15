(function (console, $hx_exports, $global) { "use strict";
function $extend(from, fields) {
	function Inherit() {} Inherit.prototype = from; var proto = new Inherit();
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var AudioManager = function() {
	this.bufferList = new haxe_ds_StringMap();
	this.types = new haxe_ds_StringMap();
	this.types.set("mp3","audio/mpeg");
	this.types.set("ogg","audio/ogg");
	this.types.set("wav","audio/wav");
	this.types.set("aac","audio/aac");
	this.types.set("m4a","audio/x-m4a");
};
AudioManager.__name__ = true;
AudioManager.prototype = {
	checkWebAudioAPISupport: function() {
		return Reflect.field(window,"AudioContext") != null || Reflect.field(window,"webkitAudioContext") != null;
	}
	,unlockAudio: function() {
		if(this.audioContext != null) {
			var bfr = this.audioContext.createBuffer(1,1,Waud.preferredSampleRate);
			var src = this.audioContext.createBufferSource();
			src.buffer = bfr;
			src.connect(this.audioContext.destination);
			if(Reflect.field(src,"start") != null) src.start(0); else src.noteOn(0);
			if(src.onended != null) src.onended = $bind(this,this._unlockCallback); else haxe_Timer.delay($bind(this,this._unlockCallback),1);
			if(this.audioContext.state == "suspended") this.audioContext.resume();
		} else {
			var audio;
			var _this = window.document;
			audio = _this.createElement("audio");
			var source;
			var _this1 = window.document;
			source = _this1.createElement("source");
			source.src = "data:audio/wave;base64,UklGRjIAAABXQVZFZm10IBIAAAABAAEAQB8AAEAfAAABAAgAAABmYWN0BAAAAAAAAABkYXRhAAAAAA==";
			audio.appendChild(source);
			window.document.appendChild(audio);
			audio.play();
			if(Waud.__touchUnlockCallback != null) Waud.__touchUnlockCallback();
			Waud.dom.ontouchend = null;
		}
	}
	,_unlockCallback: function() {
		if(Waud.__touchUnlockCallback != null) Waud.__touchUnlockCallback();
		Waud.dom.ontouchend = null;
	}
	,createAudioContext: function() {
		if(this.audioContext == null) try {
			if(Reflect.field(window,"AudioContext") != null) this.audioContext = new AudioContext(); else if(Reflect.field(window,"webkitAudioContext") != null) this.audioContext = new webkitAudioContext();
			this.masterGainNode = this.createGain();
		} catch( e ) {
			if (e instanceof js__$Boot_HaxeError) e = e.val;
			this.audioContext = null;
		}
		return this.audioContext;
	}
	,createGain: function() {
		if(this.audioContext.createGain != null) return this.audioContext.createGain(); else return Reflect.callMethod(this.audioContext,Reflect.field(this.audioContext,"createGainNode"),[]);
	}
	,destroy: function() {
		if(this.audioContext != null && (this.audioContext.close != null && this.audioContext.close != "")) this.audioContext.close();
		this.audioContext = null;
		this.bufferList = null;
		this.types = null;
	}
	,__class__: AudioManager
};
var BaseSound = function(sndUrl,options) {
	this._b64 = new EReg("(^data:audio).*(;base64,)","i");
	if(sndUrl == null || sndUrl == "") {
		console.log("invalid sound url");
		return;
	}
	if(Waud.audioManager == null) {
		console.log("initialise Waud using Waud.init() before loading sounds");
		return;
	}
	this.isSpriteSound = false;
	this.url = sndUrl;
	this._isLoaded = false;
	this._isPlaying = false;
	this._muted = false;
	this._duration = 0;
	this._options = WaudUtils.setDefaultOptions(options);
	this.rate = this._options.playbackRate;
};
BaseSound.__name__ = true;
BaseSound.prototype = {
	isReady: function() {
		return this._isLoaded;
	}
	,__class__: BaseSound
};
var EReg = function(r,opt) {
	opt = opt.split("u").join("");
	this.r = new RegExp(r,opt);
};
EReg.__name__ = true;
EReg.prototype = {
	match: function(s) {
		if(this.r.global) this.r.lastIndex = 0;
		this.r.m = this.r.exec(s);
		this.r.s = s;
		return this.r.m != null;
	}
	,matched: function(n) {
		if(this.r.m != null && n >= 0 && n < this.r.m.length) return this.r.m[n]; else throw new js__$Boot_HaxeError("EReg::matched");
	}
	,__class__: EReg
};
var IWaudSound = function() { };
IWaudSound.__name__ = true;
IWaudSound.prototype = {
	__class__: IWaudSound
};
var HTML5Sound = function(url,options,src) {
	BaseSound.call(this,url,options);
	this._snd = Waud.dom.createElement("audio");
	if(src == null) this._addSource(url); else this._snd.appendChild(src);
	if(this._options.preload) this.load();
	if(this._b64.match(url)) url = "";
};
HTML5Sound.__name__ = true;
HTML5Sound.__interfaces__ = [IWaudSound];
HTML5Sound.__super__ = BaseSound;
HTML5Sound.prototype = $extend(BaseSound.prototype,{
	load: function(callback) {
		var _g = this;
		if(!this._isLoaded) {
			this._snd.autoplay = this._options.autoplay;
			this._snd.loop = this._options.loop;
			this._snd.volume = this._options.volume;
			this._snd.playbackRate = this.rate;
			if(callback != null) this._options.onload = callback;
			if(this._options.preload) this._snd.preload = "auto"; else this._snd.preload = "metadata";
			if(this._options.onload != null) {
				this._isLoaded = true;
				this._snd.onloadeddata = function() {
					_g._options.onload(_g);
				};
			}
			this._snd.onplaying = function() {
				_g._isLoaded = true;
				_g._isPlaying = true;
			};
			this._snd.onended = function() {
				_g._isPlaying = false;
				if(_g._options.onend != null) _g._options.onend(_g);
			};
			if(this._options.onerror != null) this._snd.onerror = function() {
				_g._options.onerror(_g);
			};
			this._snd.load();
		}
		return this;
	}
	,getDuration: function() {
		if(!this._isLoaded) return 0;
		this._duration = this._snd.duration;
		return this._duration;
	}
	,_addSource: function(url) {
		this.source = Waud.dom.createElement("source");
		this.source.src = url;
		if((function($this) {
			var $r;
			var key = $this._getExt(url);
			$r = Waud.audioManager.types.get(key);
			return $r;
		}(this)) != null) {
			var key1 = this._getExt(url);
			this.source.type = Waud.audioManager.types.get(key1);
		}
		this._snd.appendChild(this.source);
		return this.source;
	}
	,_getExt: function(filename) {
		return filename.split(".").pop();
	}
	,setVolume: function(val,spriteName) {
		if(val >= 0 && val <= 1) this._options.volume = val;
		if(!this._isLoaded) return;
		this._snd.volume = this._options.volume;
	}
	,getVolume: function(spriteName) {
		return this._options.volume;
	}
	,mute: function(val,spriteName) {
		if(!this._isLoaded) return;
		this._snd.muted = val;
		if(WaudUtils.isiOS()) {
			if(val && this.isPlaying()) {
				this._muted = true;
				this._snd.pause();
			} else if(this._muted) {
				this._muted = false;
				this._snd.play();
			}
		}
	}
	,toggleMute: function(spriteName) {
		this.mute(!this._muted);
	}
	,play: function(sprite,soundProps) {
		var _g = this;
		this.spriteName = sprite;
		if(!this._isLoaded || this._snd == null) {
			console.log("sound not loaded");
			return -1;
		}
		if(this._isPlaying) {
			if(this._options.autostop) this.stop(this.spriteName); else {
				var nsnd;
				nsnd = js_Boot.__cast(this._snd.cloneNode(true) , HTMLAudioElement);
				if(nsnd.readyState == 4) {
					nsnd.currentTime = 0;
					nsnd.play();
				} else nsnd.oncanplay = function() {
					nsnd.currentTime = 0;
					nsnd.play();
				};
				nsnd.onended = function() {
					Waud.dom.removeChild(nsnd);
				};
			}
		}
		if(this._muted) return -1;
		if(this.isSpriteSound && soundProps != null) {
			if(this._pauseTime == null) this._snd.currentTime = soundProps.start; else this._snd.currentTime = this._pauseTime;
			if(this._tmr != null) this._tmr.stop();
			this._tmr = haxe_Timer.delay(function() {
				if(soundProps.loop != null && soundProps.loop) _g.play(_g.spriteName,soundProps); else _g.stop(_g.spriteName);
			},Math.ceil(soundProps.duration * 1000));
		}
		if(this._snd.readyState == 4) this._snd.play(); else this._snd.oncanplay = function() {
			_g._snd.play();
		};
		this._pauseTime = null;
		return 0;
	}
	,togglePlay: function(spriteName) {
		if(this._isPlaying) this.pause(); else this.play();
	}
	,isPlaying: function(spriteName) {
		return this._isPlaying;
	}
	,loop: function(val) {
		if(!this._isLoaded || this._snd == null) return;
		this._snd.loop = val;
	}
	,autoStop: function(val) {
		this._options.autostop = val;
	}
	,stop: function(spriteName) {
		if(!this._isLoaded || this._snd == null) return;
		this._snd.currentTime = 0;
		this._snd.pause();
		this._isPlaying = false;
		if(this._tmr != null) this._tmr.stop();
	}
	,pause: function(spriteName) {
		if(!this._isLoaded || this._snd == null) return;
		this._snd.pause();
		this._pauseTime = this._snd.currentTime;
		this._isPlaying = false;
		if(this._tmr != null) this._tmr.stop();
	}
	,playbackRate: function(val,spriteName) {
		if(val == null) return this.rate;
		this._snd.playbackRate = val;
		return this.rate = val;
	}
	,setTime: function(time) {
		if(!this._isLoaded || this._snd == null || time > this._snd.duration) return;
		this._snd.currentTime = time;
	}
	,getTime: function() {
		if(this._snd == null || !this._isLoaded || !this._isPlaying) return 0;
		return this._snd.currentTime;
	}
	,onEnd: function(callback,spriteName) {
		this._options.onend = callback;
		return this;
	}
	,onLoad: function(callback) {
		this._options.onload = callback;
		return this;
	}
	,onError: function(callback) {
		this._options.onerror = callback;
		return this;
	}
	,destroy: function() {
		if(this._snd != null) {
			this._snd.pause();
			this._snd.removeChild(this.source);
			this.source = null;
			this._snd = null;
		}
		this._isPlaying = false;
	}
	,__class__: HTML5Sound
});
var HxOverrides = function() { };
HxOverrides.__name__ = true;
HxOverrides.cca = function(s,index) {
	var x = s.charCodeAt(index);
	if(x != x) return undefined;
	return x;
};
HxOverrides.indexOf = function(a,obj,i) {
	var len = a.length;
	if(i < 0) {
		i += len;
		if(i < 0) i = 0;
	}
	while(i < len) {
		if(a[i] === obj) return i;
		i++;
	}
	return -1;
};
Math.__name__ = true;
var Reflect = function() { };
Reflect.__name__ = true;
Reflect.field = function(o,field) {
	try {
		return o[field];
	} catch( e ) {
		if (e instanceof js__$Boot_HaxeError) e = e.val;
		return null;
	}
};
Reflect.callMethod = function(o,func,args) {
	return func.apply(o,args);
};
Reflect.fields = function(o) {
	var a = [];
	if(o != null) {
		var hasOwnProperty = Object.prototype.hasOwnProperty;
		for( var f in o ) {
		if(f != "__id__" && f != "hx__closures__" && hasOwnProperty.call(o,f)) a.push(f);
		}
	}
	return a;
};
var Std = function() { };
Std.__name__ = true;
Std.string = function(s) {
	return js_Boot.__string_rec(s,"");
};
Std.parseInt = function(x) {
	var v = parseInt(x,10);
	if(v == 0 && (HxOverrides.cca(x,1) == 120 || HxOverrides.cca(x,1) == 88)) v = parseInt(x);
	if(isNaN(v)) return null;
	return v;
};
var Waud = $hx_exports.Waud = function() { };
Waud.__name__ = true;
Waud.init = function(d) {
	if(Waud.__audioElement == null) {
		if(d == null) d = window.document;
		Waud.dom = d;
		Waud.__audioElement = Waud.dom.createElement("audio");
		if(Waud.audioManager == null) Waud.audioManager = new AudioManager();
		Waud.isWebAudioSupported = Waud.audioManager.checkWebAudioAPISupport();
		Waud.isHTML5AudioSupported = Reflect.field(window,"Audio") != null;
		if(Waud.isWebAudioSupported) Waud.audioContext = Waud.audioManager.createAudioContext();
		Waud.sounds = new haxe_ds_StringMap();
		Waud._volume = 1;
		Waud._sayHello();
	}
};
Waud._sayHello = function() {
	var support;
	if(Waud.isWebAudioSupported) support = "Web Audio"; else support = "HTML5 Audio";
	if(window.navigator.userAgent.toLowerCase().indexOf("chrome") > 1) {
		var e = ["\n %c %c %c WAUD%c.%cJS%c v" + Waud.version + " - " + support + " %c  %c http://www.waudjs.com %c %c %c 📢 \n\n","background: #32BEA6; padding:5px 0;","background: #32BEA6; padding:5px 0;","color: #E70000; background: #29162B; padding:5px 0;","color: #F3B607; background: #29162B; padding:5px 0;","color: #32BEA6; background: #29162B; padding:5px 0;","color: #999999; background: #29162B; padding:5px 0;","background: #32BEA6; padding:5px 0;","background: #B8FCEF; padding:5px 0;","background: #32BEA6; padding:5px 0;","color: #E70000; background: #32BEA6; padding:5px 0;","color: #FF2424; background: #FFFFFF; padding:5px 0;"];
		window.console.log.apply(window.console,e);
	} else window.console.log("WAUD.JS v" + Waud.version + " - " + support + " - http://www.waudjs.com");
};
Waud.autoMute = function() {
	Waud._focusManager = new WaudFocusManager();
	Waud._focusManager.focus = function() {
		Waud.mute(false);
	};
	Waud._focusManager.blur = function() {
		Waud.mute(true);
	};
};
Waud.enableTouchUnlock = function(callback) {
	Waud.__touchUnlockCallback = callback;
	Waud.dom.ontouchend = ($_=Waud.audioManager,$bind($_,$_.unlockAudio));
};
Waud.setVolume = function(val) {
	if((((val | 0) === val) || typeof(val) == "number") && val >= 0 && val <= 1) {
		Waud._volume = val;
		if(Waud.sounds != null) {
			var $it0 = Waud.sounds.iterator();
			while( $it0.hasNext() ) {
				var sound = $it0.next();
				sound.setVolume(val);
			}
		}
	} else window.console.warn("Volume should be a number between 0 and 1. Received: " + val);
};
Waud.getVolume = function() {
	return Waud._volume;
};
Waud.mute = function(val) {
	if(val == null) val = true;
	Waud.isMuted = val;
	if(Waud.sounds != null) {
		var $it0 = Waud.sounds.iterator();
		while( $it0.hasNext() ) {
			var sound = $it0.next();
			sound.mute(val);
		}
	}
};
Waud.playbackRate = function(val) {
	if(val == null) return Waud._playbackRate; else if(Waud.sounds != null) {
		var $it0 = Waud.sounds.iterator();
		while( $it0.hasNext() ) {
			var sound = $it0.next();
			sound.playbackRate(val);
		}
	}
	return Waud._playbackRate = val;
};
Waud.stop = function() {
	if(Waud.sounds != null) {
		var $it0 = Waud.sounds.iterator();
		while( $it0.hasNext() ) {
			var sound = $it0.next();
			sound.stop();
		}
	}
};
Waud.pause = function() {
	if(Waud.sounds != null) {
		var $it0 = Waud.sounds.iterator();
		while( $it0.hasNext() ) {
			var sound = $it0.next();
			sound.pause();
		}
	}
};
Waud.playSequence = function(snds,onComplete,onSoundComplete,interval) {
	if(interval == null) interval = -1;
	if(snds == null || snds.length == 0) return;
	var _g1 = 0;
	var _g = snds.length;
	while(_g1 < _g) {
		var i = _g1++;
		if(Waud.sounds.get(snds[i]) == null) {
			console.log("Unable to find \"" + snds[i] + "\" in the sequence, skipping it");
			snds.splice(i,1);
		}
	}
	var playSound = null;
	playSound = function() {
		if(snds.length > 0) {
			var sndStr = snds.shift();
			var sndToPlay = Waud.sounds.get(sndStr);
			sndToPlay.play();
			if(interval > 0) haxe_Timer.delay(function() {
				if(onSoundComplete != null) onSoundComplete(sndStr);
				playSound();
			},interval); else sndToPlay.onEnd(function(snd) {
				if(onSoundComplete != null) onSoundComplete(sndStr);
				playSound();
			});
		} else if(onComplete != null) onComplete();
	};
	playSound();
};
Waud.getFormatSupportString = function() {
	var support = "OGG: " + Waud.__audioElement.canPlayType("audio/ogg; codecs=\"vorbis\"");
	support += ", WAV: " + Waud.__audioElement.canPlayType("audio/wav; codecs=\"1\"");
	support += ", MP3: " + Waud.__audioElement.canPlayType("audio/mpeg;");
	support += ", AAC: " + Waud.__audioElement.canPlayType("audio/aac;");
	support += ", M4A: " + Waud.__audioElement.canPlayType("audio/x-m4a;");
	return support;
};
Waud.isSupported = function() {
	if(Waud.isWebAudioSupported == null || Waud.isHTML5AudioSupported == null) {
		Waud.isWebAudioSupported = Waud.audioManager.checkWebAudioAPISupport();
		Waud.isHTML5AudioSupported = Reflect.field(window,"Audio") != null;
	}
	return Waud.isWebAudioSupported || Waud.isHTML5AudioSupported;
};
Waud.isOGGSupported = function() {
	var canPlay = Waud.__audioElement.canPlayType("audio/ogg; codecs=\"vorbis\"");
	return Waud.isHTML5AudioSupported && canPlay != null && (canPlay == "probably" || canPlay == "maybe");
};
Waud.isWAVSupported = function() {
	var canPlay = Waud.__audioElement.canPlayType("audio/wav; codecs=\"1\"");
	return Waud.isHTML5AudioSupported && canPlay != null && (canPlay == "probably" || canPlay == "maybe");
};
Waud.isMP3Supported = function() {
	var canPlay = Waud.__audioElement.canPlayType("audio/mpeg;");
	return Waud.isHTML5AudioSupported && canPlay != null && (canPlay == "probably" || canPlay == "maybe");
};
Waud.isAACSupported = function() {
	var canPlay = Waud.__audioElement.canPlayType("audio/aac;");
	return Waud.isHTML5AudioSupported && canPlay != null && (canPlay == "probably" || canPlay == "maybe");
};
Waud.isM4ASupported = function() {
	var canPlay = Waud.__audioElement.canPlayType("audio/x-m4a;");
	return Waud.isHTML5AudioSupported && canPlay != null && (canPlay == "probably" || canPlay == "maybe");
};
Waud.getSampleRate = function() {
	if(Waud.audioContext != null) return Waud.audioContext.sampleRate; else return 0;
};
Waud.destroy = function() {
	if(Waud.sounds != null) {
		var $it0 = Waud.sounds.iterator();
		while( $it0.hasNext() ) {
			var sound = $it0.next();
			sound.destroy();
		}
	}
	Waud.sounds = null;
	if(Waud.audioManager != null) Waud.audioManager.destroy();
	Waud.audioManager = null;
	Waud.audioContext = null;
	Waud.__audioElement = null;
	if(Waud._focusManager != null) {
		Waud._focusManager.clearEvents();
		Waud._focusManager.blur = null;
		Waud._focusManager.focus = null;
		Waud._focusManager = null;
	}
};
var WaudBase64Pack = $hx_exports.WaudBase64Pack = function(url,onLoaded,onProgress,onError,options,sequentialLoad) {
	if(sequentialLoad == null) sequentialLoad = false;
	if(Waud.audioManager == null) {
		console.log("initialise Waud using Waud.init() before loading sounds");
		return;
	}
	this._sequentialLoad = sequentialLoad;
	if(url.indexOf(".json") > 0) {
		this.progress = 0;
		this._options = WaudUtils.setDefaultOptions(options);
		this._totalSize = 0;
		this._soundCount = 0;
		this._loadCount = 0;
		this._onLoaded = onLoaded;
		this._onProgress = onProgress;
		this._onError = onError;
		this._sounds = new haxe_ds_StringMap();
		this._loadBase64Json(url);
	}
};
WaudBase64Pack.__name__ = true;
WaudBase64Pack.prototype = {
	_loadBase64Json: function(base64Url) {
		var _g = this;
		var m = new EReg("\"meta\":.[0-9]*,[0-9]*.","i");
		var xobj = new XMLHttpRequest();
		xobj.open("GET",base64Url,true);
		if(this._onProgress != null) xobj.onprogress = function(e) {
			var meta = m.match(xobj.responseText);
			if(meta && _g._totalSize == 0) {
				var metaInfo = JSON.parse("{" + m.matched(0) + "}");
				_g._totalSize = metaInfo.meta[1];
			}
			if(e.lengthComputable) _g.progress = e.loaded / e.total; else _g.progress = e.loaded / _g._totalSize;
			if(_g.progress > 1) _g.progress = 1;
			_g._onProgress(0.8 * _g.progress);
		};
		if(this._onError != null) xobj.onerror = function(e1) {
			_g._onError();
		};
		xobj.onreadystatechange = function() {
			if(xobj.readyState == 4) {
				var _g1 = xobj.status;
				switch(_g1) {
				case 200:
					var res = JSON.parse(xobj.responseText);
					_g._soundsToLoad = new haxe_ds_StringMap();
					_g._soundIds = [];
					var _g11 = 0;
					var _g2 = Reflect.fields(res);
					while(_g11 < _g2.length) {
						var n = _g2[_g11];
						++_g11;
						if(n == "meta") continue;
						if((res instanceof Array) && res.__enum__ == null) {
							_g._soundIds.push(Reflect.field(res,n).name);
							var key = Reflect.field(res,n).name;
							var value = "data:" + Std.string(Reflect.field(res,n).mime) + ";base64," + Std.string(Reflect.field(res,n).data);
							_g._soundsToLoad.set(key,value);
						} else {
							_g._soundIds.push(n);
							var value1 = Reflect.field(res,n);
							_g._soundsToLoad.set(n,value1);
						}
					}
					_g._soundCount = _g._soundIds.length;
					if(!_g._sequentialLoad) while(_g._soundIds.length > 0) _g._createSound(_g._soundIds.shift()); else _g._createSound(_g._soundIds.shift());
					break;
				case 404:
					_g._onError();
					break;
				}
			}
		};
		xobj.send(null);
	}
	,_createSound: function(id) {
		var _g = this;
		new WaudSound(this._soundsToLoad.get(id),{ onload : function(s) {
			_g._sounds.set(id,s);
			Waud.sounds.set(id,s);
			if(_g._options.onload != null) _g._options.onload(s);
			_g._checkProgress();
		}, onerror : function(s1) {
			_g._sounds.set(id,null);
			if(_g._options.onerror != null) _g._options.onerror(s1);
			if(_g._checkProgress() && _g._onError != null) _g._onError();
		}, autoplay : this._options.autoplay, autostop : this._options.autostop, loop : this._options.loop, onend : this._options.onend, playbackRate : this._options.playbackRate, preload : this._options.preload, volume : this._options.volume, webaudio : this._options.webaudio});
	}
	,_checkProgress: function() {
		this._loadCount++;
		if(this._onProgress != null) this._onProgress(0.8 + 0.199999999999999956 * (this._loadCount / this._soundCount));
		if(this._loadCount == this._soundCount) {
			this._soundsToLoad = null;
			if(this._onLoaded != null) this._onLoaded(this._sounds);
			return true;
		} else if(this._sequentialLoad) this._createSound(this._soundIds.shift());
		return false;
	}
	,__class__: WaudBase64Pack
};
var WaudFocusManager = $hx_exports.WaudFocusManager = function() {
	var _g = this;
	this._hidden = "";
	this._visibilityChange = "";
	this._currentState = "";
	if(Reflect.field(window.document,"hidden") != null) {
		this._hidden = "hidden";
		this._visibilityChange = "visibilitychange";
	} else if(Reflect.field(window.document,"mozHidden") != null) {
		this._hidden = "mozHidden";
		this._visibilityChange = "mozvisibilitychange";
	} else if(Reflect.field(window.document,"msHidden") != null) {
		this._hidden = "msHidden";
		this._visibilityChange = "msvisibilitychange";
	} else if(Reflect.field(window.document,"webkitHidden") != null) {
		this._hidden = "webkitHidden";
		this._visibilityChange = "webkitvisibilitychange";
	}
	if(Reflect.field(window,"addEventListener") != null) {
		window.addEventListener("focus",$bind(this,this._focus));
		window.addEventListener("blur",$bind(this,this._blur));
		window.addEventListener("pageshow",$bind(this,this._focus));
		window.addEventListener("pagehide",$bind(this,this._blur));
		document.addEventListener(this._visibilityChange,$bind(this,this._handleVisibilityChange));
	} else if(Reflect.field(window,"attachEvent") != null) {
		window.attachEvent("onfocus",$bind(this,this._focus));
		window.attachEvent("onblur",$bind(this,this._blur));
		window.attachEvent("pageshow",$bind(this,this._focus));
		window.attachEvent("pagehide",$bind(this,this._blur));
		document.attachEvent(this._visibilityChange,$bind(this,this._handleVisibilityChange));
	} else window.onload = function() {
		window.onfocus = $bind(_g,_g._focus);
		window.onblur = $bind(_g,_g._blur);
		window.onpageshow = $bind(_g,_g._focus);
		window.onpagehide = $bind(_g,_g._blur);
	};
};
WaudFocusManager.__name__ = true;
WaudFocusManager.prototype = {
	_handleVisibilityChange: function() {
		if(Reflect.field(window.document,this._hidden) != null && Reflect.field(window.document,this._hidden) && this.blur != null) this.blur(); else if(this.focus != null) this.focus();
	}
	,_focus: function() {
		if(this._currentState != "focus" && this.focus != null) this.focus();
		this._currentState = "focus";
	}
	,_blur: function() {
		if(this._currentState != "blur" && this.blur != null) this.blur();
		this._currentState = "blur";
	}
	,clearEvents: function() {
		if(Reflect.field(window,"removeEventListener") != null) {
			window.removeEventListener("focus",$bind(this,this._focus));
			window.removeEventListener("blur",$bind(this,this._blur));
			window.removeEventListener("pageshow",$bind(this,this._focus));
			window.removeEventListener("pagehide",$bind(this,this._blur));
			window.removeEventListener(this._visibilityChange,$bind(this,this._handleVisibilityChange));
		} else if(Reflect.field(window,"removeEvent") != null) {
			window.removeEvent("onfocus",$bind(this,this._focus));
			window.removeEvent("onblur",$bind(this,this._blur));
			window.removeEvent("pageshow",$bind(this,this._focus));
			window.removeEvent("pagehide",$bind(this,this._blur));
			window.removeEvent(this._visibilityChange,$bind(this,this._handleVisibilityChange));
		} else {
			window.onfocus = null;
			window.onblur = null;
			window.onpageshow = null;
			window.onpagehide = null;
		}
	}
	,__class__: WaudFocusManager
};
var WaudSound = $hx_exports.WaudSound = function(url,options) {
	if(Waud.audioManager == null) {
		console.log("initialise Waud using Waud.init() before loading sounds");
		return;
	}
	this.rate = 1;
	this._options = options;
	if(url.indexOf(".json") > 0) {
		this.isSpriteSound = true;
		this._spriteDuration = 0;
		this._spriteSounds = new haxe_ds_StringMap();
		this._spriteSoundEndCallbacks = new haxe_ds_StringMap();
		this._loadSpriteJson(url);
	} else {
		this.isSpriteSound = false;
		this._init(url);
	}
	if(new EReg("(^data:audio).*(;base64,)","i").match(url)) {
		var key = "snd" + new Date().getTime();
		Waud.sounds.set(key,this);
		url = "";
	} else Waud.sounds.set(url,this);
};
WaudSound.__name__ = true;
WaudSound.__interfaces__ = [IWaudSound];
WaudSound.prototype = {
	_loadSpriteJson: function(jsonUrl) {
		var _g = this;
		var xobj = new XMLHttpRequest();
		xobj.open("GET",jsonUrl,true);
		xobj.onreadystatechange = function() {
			if(xobj.readyState == 4 && xobj.status == 200) {
				_g._spriteData = JSON.parse(xobj.responseText);
				var src = _g._spriteData.src;
				if(jsonUrl.indexOf("/") > -1) src = jsonUrl.substring(0,jsonUrl.lastIndexOf("/") + 1) + src;
				_g._init(src);
			}
		};
		xobj.send(null);
	}
	,_init: function(soundUrl) {
		var _g = this;
		this.url = soundUrl;
		if(Waud.isWebAudioSupported && Waud.useWebAudio && (this._options == null || this._options.webaudio == null || this._options.webaudio)) {
			if(this.isSpriteSound) this._loadSpriteSound(this.url); else this._snd = new WebAudioAPISound(this.url,this._options);
		} else if(Waud.isHTML5AudioSupported) {
			if(this._spriteData != null && this._spriteData.sprite != null) {
				var loadCount = 0;
				var onLoad;
				if(this._options != null && this._options.onload != null) onLoad = this._options.onload; else onLoad = null;
				var onLoadSpriteSound = function(snd) {
					loadCount++;
					if(loadCount == _g._spriteData.sprite.length && onLoad != null) onLoad(snd);
				};
				var onErrorSpriteSound = function(snd1) {
					loadCount++;
					if(loadCount == _g._spriteData.sprite.length && onLoad != null) onLoad(snd1);
				};
				if(this._options == null) this._options = { };
				this._options.onload = onLoadSpriteSound;
				this._options.onerror = onErrorSpriteSound;
				var _g1 = 0;
				var _g11 = this._spriteData.sprite;
				while(_g1 < _g11.length) {
					var snd2 = _g11[_g1];
					++_g1;
					var sound = new HTML5Sound(this.url,this._options);
					sound.isSpriteSound = true;
					this._spriteSounds.set(snd2.name,sound);
				}
			} else this._snd = new HTML5Sound(this.url,this._options);
		} else {
			console.log("no audio support in this browser");
			return;
		}
	}
	,getDuration: function() {
		if(this.isSpriteSound) return this._spriteDuration;
		if(this._snd == null) return 0;
		return this._snd.getDuration();
	}
	,setVolume: function(val,spriteName) {
		if(((val | 0) === val) || typeof(val) == "number") {
			if(this.isSpriteSound) {
				if(spriteName != null && this._spriteSounds.get(spriteName) != null) this._spriteSounds.get(spriteName).setVolume(val);
				return;
			}
			if(this._snd == null) return;
			this._snd.setVolume(val);
		} else window.console.warn("Volume should be a number between 0 and 1. Received: " + val);
	}
	,getVolume: function(spriteName) {
		if(this.isSpriteSound) {
			if(spriteName != null && this._spriteSounds.get(spriteName) != null) return this._spriteSounds.get(spriteName).getVolume();
			return 0;
		}
		if(this._snd == null) return 0;
		return this._snd.getVolume();
	}
	,mute: function(val,spriteName) {
		if(this.isSpriteSound) {
			if(spriteName != null && this._spriteSounds.get(spriteName) != null) this._spriteSounds.get(spriteName).mute(val); else {
				var $it0 = this._spriteSounds.iterator();
				while( $it0.hasNext() ) {
					var snd = $it0.next();
					snd.mute(val);
				}
			}
			return;
		}
		if(this._snd == null) return;
		this._snd.mute(val);
	}
	,toggleMute: function(spriteName) {
		if(this.isSpriteSound) {
			if(spriteName != null && this._spriteSounds.get(spriteName) != null) this._spriteSounds.get(spriteName).toggleMute(); else {
				var $it0 = this._spriteSounds.iterator();
				while( $it0.hasNext() ) {
					var snd = $it0.next();
					snd.toggleMute();
				}
			}
			return;
		}
		if(this._snd == null) return;
		this._snd.toggleMute();
	}
	,load: function(callback) {
		if(this._snd == null || this.isSpriteSound) return null;
		this._snd.load(callback);
		return this;
	}
	,isReady: function() {
		if(this.isSpriteSound) {
			if(this._spriteData == null) return false;
			var $it0 = this._spriteSounds.iterator();
			while( $it0.hasNext() ) {
				var snd = $it0.next();
				if(!snd.isReady()) return false;
			}
			return true;
		}
		return this._snd != null && this._snd.isReady();
	}
	,play: function(spriteName,soundProps) {
		if(this.isSpriteSound) {
			if(spriteName != null) {
				var _g = 0;
				var _g1 = this._spriteData.sprite;
				while(_g < _g1.length) {
					var snd = _g1[_g];
					++_g;
					if(snd.name == spriteName) {
						soundProps = snd;
						break;
					}
				}
				if(soundProps == null) return null;
				if(this._spriteSounds.get(spriteName) != null) return this._spriteSounds.get(spriteName).play(spriteName,soundProps);
			} else return null;
		}
		if(this._snd == null) return null;
		return this._snd.play(spriteName,soundProps);
	}
	,togglePlay: function(spriteName) {
		if(this.isSpriteSound) {
			if(spriteName != null && this._spriteSounds.get(spriteName) != null) this._spriteSounds.get(spriteName).togglePlay();
			return;
		}
		if(this._snd == null) return;
		this._snd.togglePlay();
	}
	,isPlaying: function(spriteName) {
		if(this.isSpriteSound) {
			if(spriteName != null && this._spriteSounds.get(spriteName) != null) return this._spriteSounds.get(spriteName).isPlaying();
			return false;
		}
		if(this._snd == null) return false;
		return this._snd.isPlaying();
	}
	,loop: function(val) {
		if(this._snd == null || this.isSpriteSound) return;
		this._snd.loop(val);
	}
	,autoStop: function(val) {
		if(this._snd == null) return;
		this._snd.autoStop(val);
	}
	,stop: function(spriteName) {
		if(this.isSpriteSound) {
			if(spriteName != null && this._spriteSounds.get(spriteName) != null) this._spriteSounds.get(spriteName).stop(); else {
				var $it0 = this._spriteSounds.iterator();
				while( $it0.hasNext() ) {
					var snd = $it0.next();
					snd.stop();
				}
			}
		} else if(this._snd != null) this._snd.stop();
	}
	,pause: function(spriteName) {
		if(this.isSpriteSound) {
			if(spriteName != null && this._spriteSounds.get(spriteName) != null) this._spriteSounds.get(spriteName).pause(); else {
				var $it0 = this._spriteSounds.iterator();
				while( $it0.hasNext() ) {
					var snd = $it0.next();
					snd.pause();
				}
			}
		} else if(this._snd != null) this._snd.pause();
	}
	,playbackRate: function(val,spriteName) {
		if(val != null) {
			if(this.isSpriteSound) {
				if(spriteName != null && this._spriteSounds.get(spriteName) != null) this._spriteSounds.get(spriteName).playbackRate(val); else {
					var $it0 = this._spriteSounds.iterator();
					while( $it0.hasNext() ) {
						var snd = $it0.next();
						snd.playbackRate(val);
					}
				}
			} else if(this._snd != null) this._snd.playbackRate(val);
			return this.rate = val;
		}
		return this.rate;
	}
	,setTime: function(time) {
		if(this._snd == null || this.isSpriteSound) return;
		this._snd.setTime(time);
	}
	,getTime: function() {
		if(this._snd == null || this.isSpriteSound) return 0;
		return this._snd.getTime();
	}
	,onEnd: function(callback,spriteName) {
		if(this.isSpriteSound) {
			if(spriteName != null) this._spriteSoundEndCallbacks.set(spriteName,callback);
			return this;
		} else if(this._snd != null) {
			this._snd.onEnd(callback);
			return this;
		}
		return null;
	}
	,onLoad: function(callback) {
		if(this._snd == null || this.isSpriteSound) return null;
		this._snd.onLoad(callback);
		return this;
	}
	,onError: function(callback) {
		if(this._snd == null || this.isSpriteSound) return null;
		this._snd.onError(callback);
		return this;
	}
	,destroy: function() {
		if(this.isSpriteSound) {
			var $it0 = this._spriteSounds.iterator();
			while( $it0.hasNext() ) {
				var snd = $it0.next();
				snd.destroy();
			}
		} else if(this._snd != null) {
			this._snd.destroy();
			this._snd = null;
		}
	}
	,_loadSpriteSound: function(url) {
		var request = new XMLHttpRequest();
		request.open("GET",url,true);
		request.responseType = "arraybuffer";
		request.onload = $bind(this,this._onSpriteSoundLoaded);
		request.onerror = $bind(this,this._onSpriteSoundError);
		request.send();
	}
	,_onSpriteSoundLoaded: function(evt) {
		Waud.audioManager.audioContext.decodeAudioData(evt.target.response,$bind(this,this._decodeSuccess),$bind(this,this._onSpriteSoundError));
	}
	,_onSpriteSoundError: function() {
		if(this._options != null && this._options.onerror != null) this._options.onerror(this);
	}
	,_decodeSuccess: function(buffer) {
		if(buffer == null) {
			this._onSpriteSoundError();
			return;
		}
		Waud.audioManager.bufferList.set(this.url,buffer);
		this._spriteDuration = buffer.duration;
		if(this._options != null && this._options.onload != null) this._options.onload(this);
		var _g = 0;
		var _g1 = this._spriteData.sprite;
		while(_g < _g1.length) {
			var snd = _g1[_g];
			++_g;
			var sound = new WebAudioAPISound(this.url,this._options,true,buffer.duration);
			sound.isSpriteSound = true;
			this._spriteSounds.set(snd.name,sound);
			sound.onEnd($bind(this,this._spriteOnEnd),snd.name);
		}
	}
	,_spriteOnEnd: function(snd) {
		if(this._spriteSoundEndCallbacks.get(snd.spriteName) != null) this._spriteSoundEndCallbacks.get(snd.spriteName)(snd);
	}
	,__class__: WaudSound
};
var WaudUtils = $hx_exports.WaudUtils = function() { };
WaudUtils.__name__ = true;
WaudUtils.isAndroid = function(ua) {
	if(ua == null) ua = window.navigator.userAgent;
	return new EReg("Android","i").match(ua);
};
WaudUtils.isiOS = function(ua) {
	if(ua == null) ua = window.navigator.userAgent;
	return new EReg("(iPad|iPhone|iPod)","i").match(ua);
};
WaudUtils.isWindowsPhone = function(ua) {
	if(ua == null) ua = window.navigator.userAgent;
	return new EReg("(IEMobile|Windows Phone)","i").match(ua);
};
WaudUtils.isFirefox = function(ua) {
	if(ua == null) ua = window.navigator.userAgent;
	return new EReg("Firefox","i").match(ua);
};
WaudUtils.isOpera = function(ua) {
	if(ua == null) ua = window.navigator.userAgent;
	return new EReg("Opera","i").match(ua) || Reflect.field(window,"opera") != null;
};
WaudUtils.isChrome = function(ua) {
	if(ua == null) ua = window.navigator.userAgent;
	return new EReg("Chrome","i").match(ua);
};
WaudUtils.isSafari = function(ua) {
	if(ua == null) ua = window.navigator.userAgent;
	return new EReg("Safari","i").match(ua);
};
WaudUtils.isMobile = function(ua) {
	if(ua == null) ua = window.navigator.userAgent;
	return new EReg("(iPad|iPhone|iPod|Android|webOS|BlackBerry|Windows Phone|IEMobile)","i").match(ua);
};
WaudUtils.getiOSVersion = function(ua) {
	if(ua == null) ua = window.navigator.userAgent;
	var v = new EReg("[0-9_]+?[0-9_]+?[0-9_]+","i");
	var matched = [];
	if(v.match(ua)) {
		var match = v.matched(0).split("_");
		var _g = [];
		var _g1 = 0;
		while(_g1 < match.length) {
			var i = match[_g1];
			++_g1;
			_g.push(Std.parseInt(i));
		}
		matched = _g;
	}
	return matched;
};
WaudUtils.setDefaultOptions = function(options) {
	if(options == null) options = { };
	if(options.autoplay != null) options.autoplay = options.autoplay; else options.autoplay = Waud.defaults.autoplay;
	if(options.autostop != null) options.autostop = options.autostop; else options.autostop = Waud.defaults.autostop;
	if(options.webaudio != null) options.webaudio = options.webaudio; else options.webaudio = Waud.defaults.webaudio;
	if(options.preload != null) options.preload = options.preload; else options.preload = Waud.defaults.preload;
	if(options.loop != null) options.loop = options.loop; else options.loop = Waud.defaults.loop;
	if(options.onload != null) options.onload = options.onload; else options.onload = Waud.defaults.onload;
	if(options.onend != null) options.onend = options.onend; else options.onend = Waud.defaults.onend;
	if(options.onerror != null) options.onerror = options.onerror; else options.onerror = Waud.defaults.onerror;
	if(options.volume == null || options.volume < 0 || options.volume > 1) options.volume = Waud.defaults.volume;
	if(options.playbackRate == null || options.playbackRate <= 0 || options.playbackRate >= 4) options.playbackRate = Waud.defaults.playbackRate;
	return options;
};
var WebAudioAPISound = function(url,options,loaded,d) {
	if(d == null) d = 0;
	if(loaded == null) loaded = false;
	BaseSound.call(this,url,options);
	this._playStartTime = 0;
	this._pauseTime = 0;
	this._srcNodes = [];
	this._gainNodes = [];
	this._currentSoundProps = null;
	this._isLoaded = loaded;
	this._duration = d;
	this._manager = Waud.audioManager;
	if(this._b64.match(url)) {
		this._decodeAudio(this._base64ToArrayBuffer(url));
		url = "";
	} else if(this._options.preload && !loaded) this.load();
};
WebAudioAPISound.__name__ = true;
WebAudioAPISound.__interfaces__ = [IWaudSound];
WebAudioAPISound.__super__ = BaseSound;
WebAudioAPISound.prototype = $extend(BaseSound.prototype,{
	load: function(callback) {
		if(!this._isLoaded) {
			var request = new XMLHttpRequest();
			request.open("GET",this.url,true);
			request.responseType = "arraybuffer";
			request.onload = $bind(this,this._onSoundLoaded);
			request.onerror = $bind(this,this._error);
			request.send();
			if(callback != null) this._options.onload = callback;
		}
		return this;
	}
	,_base64ToArrayBuffer: function(base64) {
		var raw = window.atob(base64.split(",")[1]);
		var rawLength = raw.length;
		var array = new Uint8Array(new ArrayBuffer(rawLength));
		var _g = 0;
		while(_g < rawLength) {
			var i = _g++;
			array[i] = HxOverrides.cca(raw,i);
		}
		return array.buffer;
	}
	,_onSoundLoaded: function(evt) {
		this._manager.audioContext.decodeAudioData(evt.target.response,$bind(this,this._decodeSuccess),$bind(this,this._error));
	}
	,_decodeAudio: function(data) {
		this._manager.audioContext.decodeAudioData(data,$bind(this,this._decodeSuccess),$bind(this,this._error));
	}
	,_error: function() {
		if(this._options.onerror != null) this._options.onerror(this);
	}
	,_decodeSuccess: function(buffer) {
		if(buffer == null) {
			console.log("empty buffer: " + this.url);
			this._error();
			return;
		}
		this._manager.bufferList.set(this.url,buffer);
		this._isLoaded = true;
		this._duration = buffer.duration;
		if(this._options.onload != null) this._options.onload(this);
		if(this._options.autoplay) this.play();
	}
	,_makeSource: function(buffer) {
		var bufferSource = this._manager.audioContext.createBufferSource();
		bufferSource.buffer = buffer;
		this._gainNode = this._manager.createGain();
		bufferSource.connect(this._gainNode);
		bufferSource.playbackRate.value = this.rate;
		this._gainNode.connect(this._manager.masterGainNode);
		this._manager.masterGainNode.connect(this._manager.audioContext.destination);
		this._srcNodes.push(bufferSource);
		this._gainNodes.push(this._gainNode);
		if(this._muted) this._gainNode.gain.value = 0; else try {
			this._gainNode.gain.value = this._options.volume;
			this._gainNode.gain.setTargetAtTime(this._options.volume,this._manager.audioContext.currentTime,0.015);
		} catch( e ) {
			if (e instanceof js__$Boot_HaxeError) e = e.val;
		}
		return bufferSource;
	}
	,getDuration: function() {
		if(!this._isLoaded) return 0;
		return this._duration;
	}
	,play: function(sprite,soundProps) {
		var _g = this;
		this.spriteName = sprite;
		if(this._isPlaying && this._options.autostop) this.stop(this.spriteName);
		if(!this._isLoaded) {
			console.log("sound not loaded");
			return -1;
		}
		var start = 0;
		var end = -1;
		if(this.isSpriteSound && soundProps != null) {
			this._currentSoundProps = soundProps;
			start = soundProps.start + this._pauseTime;
			end = soundProps.duration;
		}
		var buffer;
		if(this._manager.bufferList != null) buffer = this._manager.bufferList.get(this.url); else buffer = null;
		if(buffer != null) {
			this.source = this._makeSource(buffer);
			if(start >= 0 && end > -1) this._start(0,start,end); else {
				this._start(0,this._pauseTime,this.source.buffer.duration);
				this.source.loop = this._options.loop;
			}
			this._playStartTime = this._manager.audioContext.currentTime;
			this._isPlaying = true;
			this.source.onended = function() {
				if(_g._isPlaying) _g._pauseTime = 0;
				_g._isPlaying = false;
				if(_g.isSpriteSound && soundProps != null && soundProps.loop != null && soundProps.loop && start >= 0 && end > -1) {
					_g.destroy();
					_g.play(_g.spriteName,soundProps);
				} else if(_g._options.onend != null) _g._options.onend(_g);
			};
		}
		return HxOverrides.indexOf(this._srcNodes,this.source,0);
	}
	,_start: function(when,offset,duration) {
		if(Reflect.field(this.source,"start") != null) this.source.start(when,offset,duration); else if(Reflect.field(this.source,"noteGrainOn") != null) Reflect.callMethod(this.source,Reflect.field(this.source,"noteGrainOn"),[when,offset,duration]); else if(Reflect.field(this.source,"noteOn") != null) Reflect.callMethod(this.source,Reflect.field(this.source,"noteOn"),[when,offset,duration]);
	}
	,togglePlay: function(spriteName) {
		if(this._isPlaying) this.pause(); else this.play();
	}
	,isPlaying: function(spriteName) {
		return this._isPlaying;
	}
	,loop: function(val) {
		this._options.loop = val;
		if(this.source != null) this.source.loop = val;
	}
	,setVolume: function(val,spriteName) {
		this._options.volume = val;
		if(this._gainNode == null || !this._isLoaded || this._muted) return;
		this._gainNode.gain.value = this._options.volume;
	}
	,getVolume: function(spriteName) {
		return this._options.volume;
	}
	,mute: function(val,spriteName) {
		this._muted = val;
		if(this._gainNode == null || !this._isLoaded) return;
		if(val) this._gainNode.gain.value = 0; else this._gainNode.gain.value = this._options.volume;
	}
	,toggleMute: function(spriteName) {
		this.mute(!this._muted);
	}
	,autoStop: function(val) {
		this._options.autostop = val;
	}
	,stop: function(spriteName) {
		this._pauseTime = 0;
		if(this.source == null || !this._isLoaded || !this._isPlaying) return;
		this.destroy();
	}
	,pause: function(spriteName) {
		if(this.source == null || !this._isLoaded || !this._isPlaying) return;
		this.destroy();
		this._pauseTime += this._manager.audioContext.currentTime - this._playStartTime;
		console.log("pause: " + this._pauseTime);
	}
	,playbackRate: function(val,spriteName) {
		if(val == null) return this.rate;
		var _g = 0;
		var _g1 = this._srcNodes;
		while(_g < _g1.length) {
			var src = _g1[_g];
			++_g;
			src.playbackRate.value = val;
		}
		return this.rate = val;
	}
	,setTime: function(time) {
		if(!this._isLoaded || time > this._duration) return;
		if(this._isPlaying) {
			this.stop();
			this._pauseTime = time;
			this.play();
		} else this._pauseTime = time;
	}
	,getTime: function() {
		if(this.source == null || !this._isLoaded || !this._isPlaying) return 0;
		return this._manager.audioContext.currentTime - this._playStartTime + this._pauseTime;
	}
	,onEnd: function(callback,spriteName) {
		this._options.onend = callback;
		return this;
	}
	,onLoad: function(callback) {
		this._options.onload = callback;
		return this;
	}
	,onError: function(callback) {
		this._options.onerror = callback;
		return this;
	}
	,destroy: function() {
		var _g = 0;
		var _g1 = this._srcNodes;
		while(_g < _g1.length) {
			var src = _g1[_g];
			++_g;
			if(Reflect.field(src,"stop") != null) src.stop(0); else if(Reflect.field(src,"noteOff") != null) Reflect.callMethod(src,Reflect.field(src,"noteOff"),[0]);
			src.disconnect();
			src = null;
		}
		var _g2 = 0;
		var _g11 = this._gainNodes;
		while(_g2 < _g11.length) {
			var gain = _g11[_g2];
			++_g2;
			gain.disconnect();
			gain = null;
		}
		this._srcNodes = [];
		this._gainNodes = [];
		this._isPlaying = false;
	}
	,__class__: WebAudioAPISound
});
var haxe_IMap = function() { };
haxe_IMap.__name__ = true;
var haxe_Timer = function(time_ms) {
	var me = this;
	this.id = setInterval(function() {
		me.run();
	},time_ms);
};
haxe_Timer.__name__ = true;
haxe_Timer.delay = function(f,time_ms) {
	var t = new haxe_Timer(time_ms);
	t.run = function() {
		t.stop();
		f();
	};
	return t;
};
haxe_Timer.prototype = {
	stop: function() {
		if(this.id == null) return;
		clearInterval(this.id);
		this.id = null;
	}
	,run: function() {
	}
	,__class__: haxe_Timer
};
var haxe_ds__$StringMap_StringMapIterator = function(map,keys) {
	this.map = map;
	this.keys = keys;
	this.index = 0;
	this.count = keys.length;
};
haxe_ds__$StringMap_StringMapIterator.__name__ = true;
haxe_ds__$StringMap_StringMapIterator.prototype = {
	hasNext: function() {
		return this.index < this.count;
	}
	,next: function() {
		return this.map.get(this.keys[this.index++]);
	}
	,__class__: haxe_ds__$StringMap_StringMapIterator
};
var haxe_ds_StringMap = function() {
	this.h = { };
};
haxe_ds_StringMap.__name__ = true;
haxe_ds_StringMap.__interfaces__ = [haxe_IMap];
haxe_ds_StringMap.prototype = {
	set: function(key,value) {
		if(__map_reserved[key] != null) this.setReserved(key,value); else this.h[key] = value;
	}
	,get: function(key) {
		if(__map_reserved[key] != null) return this.getReserved(key);
		return this.h[key];
	}
	,setReserved: function(key,value) {
		if(this.rh == null) this.rh = { };
		this.rh["$" + key] = value;
	}
	,getReserved: function(key) {
		if(this.rh == null) return null; else return this.rh["$" + key];
	}
	,arrayKeys: function() {
		var out = [];
		for( var key in this.h ) {
		if(this.h.hasOwnProperty(key)) out.push(key);
		}
		if(this.rh != null) {
			for( var key in this.rh ) {
			if(key.charCodeAt(0) == 36) out.push(key.substr(1));
			}
		}
		return out;
	}
	,iterator: function() {
		return new haxe_ds__$StringMap_StringMapIterator(this,this.arrayKeys());
	}
	,__class__: haxe_ds_StringMap
};
var js__$Boot_HaxeError = function(val) {
	Error.call(this);
	this.val = val;
	this.message = String(val);
	if(Error.captureStackTrace) Error.captureStackTrace(this,js__$Boot_HaxeError);
};
js__$Boot_HaxeError.__name__ = true;
js__$Boot_HaxeError.__super__ = Error;
js__$Boot_HaxeError.prototype = $extend(Error.prototype,{
	__class__: js__$Boot_HaxeError
});
var js_Boot = function() { };
js_Boot.__name__ = true;
js_Boot.getClass = function(o) {
	if((o instanceof Array) && o.__enum__ == null) return Array; else {
		var cl = o.__class__;
		if(cl != null) return cl;
		var name = js_Boot.__nativeClassName(o);
		if(name != null) return js_Boot.__resolveNativeClass(name);
		return null;
	}
};
js_Boot.__string_rec = function(o,s) {
	if(o == null) return "null";
	if(s.length >= 5) return "<...>";
	var t = typeof(o);
	if(t == "function" && (o.__name__ || o.__ename__)) t = "object";
	switch(t) {
	case "object":
		if(o instanceof Array) {
			if(o.__enum__) {
				if(o.length == 2) return o[0];
				var str2 = o[0] + "(";
				s += "\t";
				var _g1 = 2;
				var _g = o.length;
				while(_g1 < _g) {
					var i1 = _g1++;
					if(i1 != 2) str2 += "," + js_Boot.__string_rec(o[i1],s); else str2 += js_Boot.__string_rec(o[i1],s);
				}
				return str2 + ")";
			}
			var l = o.length;
			var i;
			var str1 = "[";
			s += "\t";
			var _g2 = 0;
			while(_g2 < l) {
				var i2 = _g2++;
				str1 += (i2 > 0?",":"") + js_Boot.__string_rec(o[i2],s);
			}
			str1 += "]";
			return str1;
		}
		var tostr;
		try {
			tostr = o.toString;
		} catch( e ) {
			if (e instanceof js__$Boot_HaxeError) e = e.val;
			return "???";
		}
		if(tostr != null && tostr != Object.toString && typeof(tostr) == "function") {
			var s2 = o.toString();
			if(s2 != "[object Object]") return s2;
		}
		var k = null;
		var str = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		for( var k in o ) {
		if(hasp && !o.hasOwnProperty(k)) {
			continue;
		}
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
			continue;
		}
		if(str.length != 2) str += ", \n";
		str += s + k + " : " + js_Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str += "\n" + s + "}";
		return str;
	case "function":
		return "<function>";
	case "string":
		return o;
	default:
		return String(o);
	}
};
js_Boot.__interfLoop = function(cc,cl) {
	if(cc == null) return false;
	if(cc == cl) return true;
	var intf = cc.__interfaces__;
	if(intf != null) {
		var _g1 = 0;
		var _g = intf.length;
		while(_g1 < _g) {
			var i = _g1++;
			var i1 = intf[i];
			if(i1 == cl || js_Boot.__interfLoop(i1,cl)) return true;
		}
	}
	return js_Boot.__interfLoop(cc.__super__,cl);
};
js_Boot.__instanceof = function(o,cl) {
	if(cl == null) return false;
	switch(cl) {
	case Int:
		return (o|0) === o;
	case Float:
		return typeof(o) == "number";
	case Bool:
		return typeof(o) == "boolean";
	case String:
		return typeof(o) == "string";
	case Array:
		return (o instanceof Array) && o.__enum__ == null;
	case Dynamic:
		return true;
	default:
		if(o != null) {
			if(typeof(cl) == "function") {
				if(o instanceof cl) return true;
				if(js_Boot.__interfLoop(js_Boot.getClass(o),cl)) return true;
			} else if(typeof(cl) == "object" && js_Boot.__isNativeObj(cl)) {
				if(o instanceof cl) return true;
			}
		} else return false;
		if(cl == Class && o.__name__ != null) return true;
		if(cl == Enum && o.__ename__ != null) return true;
		return o.__enum__ == cl;
	}
};
js_Boot.__cast = function(o,t) {
	if(js_Boot.__instanceof(o,t)) return o; else throw new js__$Boot_HaxeError("Cannot cast " + Std.string(o) + " to " + Std.string(t));
};
js_Boot.__nativeClassName = function(o) {
	var name = js_Boot.__toStr.call(o).slice(8,-1);
	if(name == "Object" || name == "Function" || name == "Math" || name == "JSON") return null;
	return name;
};
js_Boot.__isNativeObj = function(o) {
	return js_Boot.__nativeClassName(o) != null;
};
js_Boot.__resolveNativeClass = function(name) {
	return $global[name];
};
var $_, $fid = 0;
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $fid++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = function(){ return f.method.apply(f.scope, arguments); }; f.scope = o; f.method = m; o.hx__closures__[m.__id__] = f; } return f; }
if(Array.prototype.indexOf) HxOverrides.indexOf = function(a,o,i) {
	return Array.prototype.indexOf.call(a,o,i);
};
String.prototype.__class__ = String;
String.__name__ = true;
Array.__name__ = true;
Date.prototype.__class__ = Date;
Date.__name__ = ["Date"];
var Int = { __name__ : ["Int"]};
var Dynamic = { __name__ : ["Dynamic"]};
var Float = Number;
Float.__name__ = ["Float"];
var Bool = Boolean;
Bool.__ename__ = ["Bool"];
var Class = { __name__ : ["Class"]};
var Enum = { };
var __map_reserved = {}
Waud.PROBABLY = "probably";
Waud.MAYBE = "maybe";
Waud.version = "1.0.1";
Waud.useWebAudio = true;
Waud.defaults = { autoplay : false, autostop : true, loop : false, preload : true, webaudio : true, volume : 1, playbackRate : 1};
Waud.preferredSampleRate = 44100;
Waud.isMuted = false;
Waud._playbackRate = 1;
WaudBase64Pack.JSON_PER = 0.8;
WaudFocusManager.FOCUS_STATE = "focus";
WaudFocusManager.BLUR_STATE = "blur";
WaudFocusManager.ON_FOCUS = "onfocus";
WaudFocusManager.ON_BLUR = "onblur";
WaudFocusManager.PAGE_SHOW = "pageshow";
WaudFocusManager.PAGE_HIDE = "pagehide";
WaudFocusManager.WINDOW = "window";
WaudFocusManager.DOCUMENT = "document";
js_Boot.__toStr = {}.toString;
})(typeof console != "undefined" ? console : {log:function(){}}, typeof window != "undefined" ? window : exports, typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this);

//# sourceMappingURL=waud.js.map