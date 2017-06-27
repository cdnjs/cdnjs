(function (console, $hx_exports) { "use strict";
function $extend(from, fields) {
	function Inherit() {} Inherit.prototype = from; var proto = new Inherit();
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var AudioManager = function() {
	this.bufferList = new haxe_ds_StringMap();
	this.playingSounds = new haxe_ds_StringMap();
};
AudioManager.__name__ = true;
AudioManager.prototype = {
	checkWebAudioAPISupport: function() {
		if(Reflect.field(window,"AudioContext") != null) {
			AudioManager.AudioContextClass = Reflect.field(window,"AudioContext");
			return true;
		} else if(Reflect.field(window,"webkitAudioContext") != null) {
			AudioManager.AudioContextClass = Reflect.field(window,"webkitAudioContext");
			return true;
		}
		return false;
	}
	,unlockAudio: function() {
		if(this.audioContext == null) return;
		var bfr = this.audioContext.createBuffer(1,1,Waud.preferredSampleRate);
		var src = this.audioContext.createBufferSource();
		src.buffer = bfr;
		src.connect(this.audioContext.destination);
		src.start(0);
		if(src.onended != null) src.onended = $bind(this,this._unlockCallback); else haxe_Timer.delay($bind(this,this._unlockCallback),1);
	}
	,_unlockCallback: function() {
		if(Waud.__touchUnlockCallback != null) Waud.__touchUnlockCallback();
		Waud.dom.ontouchend = null;
	}
	,createAudioContext: function() {
		if(this.audioContext == null) try {
			if(AudioManager.AudioContextClass != null) this.audioContext = Type.createInstance(AudioManager.AudioContextClass,[]);
		} catch( e ) {
			if (e instanceof js__$Boot_HaxeError) e = e.val;
			this.audioContext = null;
		}
	}
};
var BaseSound = function(url,options) {
	if(url == null || url == "") {
		console.log("invalid sound url");
		return;
	}
	if(Waud.audioManager == null) {
		console.log("initialise Waud using Waud.init() before loading sounds");
		return;
	}
	this.isSpriteSound = false;
	this._isPlaying = false;
	if(options == null) options = { };
	if(options.autoplay != null) options.autoplay = options.autoplay; else options.autoplay = Waud.defaults.autoplay;
	if(options.preload != null) options.preload = options.preload; else options.preload = Waud.defaults.preload;
	if(options.loop != null) options.loop = options.loop; else options.loop = Waud.defaults.loop;
	if(options.volume != null && options.volume >= 0 && options.volume <= 1) options.volume = options.volume; else options.volume = Waud.defaults.volume;
	this._options = options;
};
BaseSound.__name__ = true;
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
};
var IWaudSound = function() { };
IWaudSound.__name__ = true;
var HTML5Sound = $hx_exports.HTML5Sound = function(url,options) {
	var _g = this;
	BaseSound.call(this,url,options);
	this._muted = false;
	this._snd = Waud.dom.createElement("audio");
	this._addSource(url);
	this._snd.autoplay = this._options.autoplay;
	this._snd.loop = this._options.loop;
	this._snd.volume = this._options.volume;
	if(Std.string(this._options.preload) == "true") this._snd.preload = "auto"; else if(Std.string(this._options.preload) == "false") this._snd.preload = "none"; else this._snd.preload = "metadata";
	if(this._options.onload != null) this._snd.onloadeddata = function() {
		_g._options.onload(_g);
	};
	this._snd.onplaying = function() {
		_g._isPlaying = true;
	};
	this._snd.onended = function() {
		_g._isPlaying = false;
		if(_g._options.onend != null) _g._options.onend(_g);
	};
	if(this._options.onerror != null) this._snd.onerror = function() {
		_g._options.onerror(_g);
	};
	Waud.sounds.set(url,this);
	this._snd.load();
};
HTML5Sound.__name__ = true;
HTML5Sound.__interfaces__ = [IWaudSound];
HTML5Sound.__super__ = BaseSound;
HTML5Sound.prototype = $extend(BaseSound.prototype,{
	_addSource: function(src) {
		this._src = Waud.dom.createElement("source");
		this._src.src = src;
		if((function($this) {
			var $r;
			var key = $this._getExt(src);
			$r = Waud.types.get(key);
			return $r;
		}(this)) != null) {
			var key1 = this._getExt(src);
			this._src.type = Waud.types.get(key1);
		}
		this._snd.appendChild(this._src);
		return this._src;
	}
	,_getExt: function(filename) {
		return filename.split(".").pop();
	}
	,setVolume: function(val) {
		if(val >= 0 && val <= 1) {
			this._snd.volume = val;
			this._options.volume = val;
		}
	}
	,getVolume: function() {
		return this._options.volume;
	}
	,mute: function(val) {
		this._snd.muted = val;
		if(Utils.isiOS()) {
			if(val && this.isPlaying()) {
				this._muted = true;
				this._snd.pause();
			} else if(this._muted) {
				this._muted = false;
				this._snd.play();
			}
		}
	}
	,play: function(spriteName,soundProps) {
		var _g = this;
		this.stop();
		if(this.isSpriteSound && soundProps != null) {
			this._snd.currentTime = soundProps.start;
			if(this._tmr != null) this._tmr.stop();
			this._tmr = haxe_Timer.delay(function() {
				if(soundProps.loop != null && soundProps.loop) _g.play(spriteName,soundProps); else _g.stop();
			},Math.ceil(soundProps.end * 1000));
		}
		this._snd.play();
	}
	,isPlaying: function() {
		return this._isPlaying;
	}
	,loop: function(val) {
		this._snd.loop = val;
	}
	,stop: function() {
		this._snd.pause();
		this._snd.currentTime = 0;
	}
	,destroy: function() {
		if(this._snd != null) {
			this._snd.pause();
			this._snd.removeChild(this._src);
			this._src = null;
			this._snd = null;
		}
	}
});
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
var Std = function() { };
Std.__name__ = true;
Std.string = function(s) {
	return js_Boot.__string_rec(s,"");
};
var Type = function() { };
Type.__name__ = true;
Type.createInstance = function(cl,args) {
	var _g = args.length;
	switch(_g) {
	case 0:
		return new cl();
	case 1:
		return new cl(args[0]);
	case 2:
		return new cl(args[0],args[1]);
	case 3:
		return new cl(args[0],args[1],args[2]);
	case 4:
		return new cl(args[0],args[1],args[2],args[3]);
	case 5:
		return new cl(args[0],args[1],args[2],args[3],args[4]);
	case 6:
		return new cl(args[0],args[1],args[2],args[3],args[4],args[5]);
	case 7:
		return new cl(args[0],args[1],args[2],args[3],args[4],args[5],args[6]);
	case 8:
		return new cl(args[0],args[1],args[2],args[3],args[4],args[5],args[6],args[7]);
	default:
		throw new js__$Boot_HaxeError("Too many arguments");
	}
	return null;
};
var Utils = function() { };
Utils.__name__ = true;
Utils.isiOS = function() {
	return new EReg("(iPad|iPhone|iPod)","i").match(window.navigator.userAgent);
};
var Waud = $hx_exports.Waud = function() { };
Waud.__name__ = true;
Waud.init = function(d) {
	if(d == null) d = window.document;
	Waud.dom = d;
	Waud.audioElement = Waud.dom.createElement("audio");
	if(Waud.audioManager == null) Waud.audioManager = new AudioManager();
	Waud.isWebAudioSupported = Waud.audioManager.checkWebAudioAPISupport();
	Waud.isAudioSupported = Reflect.field(window,"Audio") != null;
	if(Waud.isWebAudioSupported) Waud.audioManager.createAudioContext(); else if(!Waud.isAudioSupported) console.log("no audio support in this browser");
	Waud.defaults.autoplay = false;
	Waud.defaults.loop = false;
	Waud.defaults.preload = "metadata";
	Waud.defaults.volume = 1;
	Waud.sounds = new haxe_ds_StringMap();
	Waud.types = new haxe_ds_StringMap();
	Waud.types.set("mp3","audio/mpeg");
	Waud.types.set("ogg","audio/ogg");
	Waud.types.set("wav","audio/wav");
	Waud.types.set("aac","audio/aac");
	Waud.types.set("m4a","audio/x-m4a");
};
Waud.enableTouchUnlock = function(callback) {
	Waud.__touchUnlockCallback = callback;
	Waud.dom.ontouchend = ($_=Waud.audioManager,$bind($_,$_.unlockAudio));
};
Waud.mute = function(val) {
	if(val == null) val = true;
	var $it0 = Waud.sounds.iterator();
	while( $it0.hasNext() ) {
		var sound = $it0.next();
		sound.mute(val);
	}
};
Waud.stop = function() {
	var $it0 = Waud.sounds.iterator();
	while( $it0.hasNext() ) {
		var sound = $it0.next();
		sound.stop();
	}
};
Waud.getFormatSupportString = function() {
	var support = "OGG: " + Waud.audioElement.canPlayType("audio/ogg; codecs=\"vorbis\"");
	support += ", WAV: " + Waud.audioElement.canPlayType("audio/wav; codecs=\"1\"");
	support += ", MP3: " + Waud.audioElement.canPlayType("audio/mpeg;");
	support += ", AAC: " + Waud.audioElement.canPlayType("audio/aac;");
	support += ", M4A: " + Waud.audioElement.canPlayType("audio/x-m4a;");
	return support;
};
Waud.isOGGSupported = function() {
	var canPlay = Waud.audioElement.canPlayType("audio/ogg; codecs=\"vorbis\"");
	return Waud.isAudioSupported && canPlay != null && (canPlay == "probably" || canPlay == "maybe");
};
Waud.isWAVSupported = function() {
	var canPlay = Waud.audioElement.canPlayType("audio/wav; codecs=\"1\"");
	return Waud.isAudioSupported && canPlay != null && (canPlay == "probably" || canPlay == "maybe");
};
Waud.isMP3Supported = function() {
	var canPlay = Waud.audioElement.canPlayType("audio/mpeg;");
	return Waud.isAudioSupported && canPlay != null && (canPlay == "probably" || canPlay == "maybe");
};
Waud.isAACSupported = function() {
	var canPlay = Waud.audioElement.canPlayType("audio/aac;");
	return Waud.isAudioSupported && canPlay != null && (canPlay == "probably" || canPlay == "maybe");
};
Waud.isM4ASupported = function() {
	var canPlay = Waud.audioElement.canPlayType("audio/x-m4a;");
	return Waud.isAudioSupported && canPlay != null && (canPlay == "probably" || canPlay == "maybe");
};
var WaudSound = $hx_exports.WaudSound = function(src,options) {
	if(Waud.audioManager == null) {
		console.log("initialise Waud using Waud.init() before loading sounds");
		return;
	}
	this._options = options;
	if(src.indexOf(".json") > 0) {
		this.isSpriteSound = true;
		this._loadSpriteJson(src);
	} else {
		this.isSpriteSound = false;
		this._init(src);
	}
};
WaudSound.__name__ = true;
WaudSound.__interfaces__ = [IWaudSound];
WaudSound.prototype = {
	_loadSpriteJson: function(url) {
		var _g = this;
		var xobj = new XMLHttpRequest();
		xobj.overrideMimeType("application/json");
		xobj.open("GET",url,true);
		xobj.onreadystatechange = function() {
			if(xobj.readyState == 4 && xobj.status == 200) {
				_g._spriteData = JSON.parse(xobj.response);
				_g._init(_g._spriteData.src);
			}
		};
		xobj.send(null);
	}
	,_init: function(src) {
		if(Waud.isWebAudioSupported) this._snd = new WebAudioAPISound(src,this._options); else if(Waud.isAudioSupported) this._snd = new HTML5Sound(src,this._options); else console.log("no audio support in this browser");
		this._snd.isSpriteSound = this.isSpriteSound;
	}
	,setVolume: function(val) {
		this._snd.setVolume(val);
	}
	,getVolume: function() {
		return this._snd.getVolume();
	}
	,mute: function(val) {
		this._snd.mute(val);
	}
	,play: function(spriteName,soundProps) {
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
		}
		this._snd.play(spriteName,soundProps);
	}
	,isPlaying: function() {
		return this._snd.isPlaying();
	}
	,loop: function(val) {
		this._snd.loop(val);
	}
	,stop: function() {
		this._snd.stop();
	}
	,destroy: function() {
		this._snd.destroy();
		this._snd = null;
	}
};
var WebAudioAPISound = $hx_exports.WebAudioAPISound = function(url,options) {
	BaseSound.call(this,url,options);
	this._url = url;
	this._manager = Waud.audioManager;
	var request = new XMLHttpRequest();
	request.open("GET",this._url,true);
	request.responseType = "arraybuffer";
	request.onload = $bind(this,this._onSoundLoaded);
	request.onerror = $bind(this,this._error);
	request.send();
	Waud.sounds.set(url,this);
};
WebAudioAPISound.__name__ = true;
WebAudioAPISound.__interfaces__ = [IWaudSound];
WebAudioAPISound.__super__ = BaseSound;
WebAudioAPISound.prototype = $extend(BaseSound.prototype,{
	_onSoundLoaded: function(evt) {
		this._manager.audioContext.decodeAudioData(evt.target.response,$bind(this,this._decodeSuccess),$bind(this,this._error));
	}
	,_decodeSuccess: function(buffer) {
		if(buffer == null) {
			console.log("empty buffer: " + this._url);
			if(this._options.onerror != null) this._options.onerror(this);
			return;
		}
		this._manager.bufferList.set(this._url,buffer);
		if(this._options.onload != null) this._options.onload(this);
		if(this._options.autoplay) this.play();
	}
	,_error: function() {
		if(this._options.onerror != null) this._options.onerror(this);
	}
	,_makeSource: function(buffer) {
		var source = this._manager.audioContext.createBufferSource();
		this._gainNode = this._manager.audioContext.createGain();
		this._gainNode.gain.value = this._options.volume;
		source.buffer = buffer;
		source.connect(this._gainNode);
		this._gainNode.connect(this._manager.audioContext.destination);
		return source;
	}
	,play: function(spriteName,soundProps) {
		var _g = this;
		var start = 0;
		var end = -1;
		if(this.isSpriteSound && soundProps != null) {
			start = soundProps.start;
			end = soundProps.end;
		}
		var buffer = this._manager.bufferList.get(this._url);
		if(buffer != null) {
			this._snd = this._makeSource(buffer);
			if(start >= 0 && end > -1) this._snd.start(0,start,end); else {
				this._snd.loop = this._options.loop;
				this._snd.start(0);
			}
			this._isPlaying = true;
			this._snd.onended = function() {
				if(_g.isSpriteSound && soundProps != null && soundProps.loop && start >= 0 && end > -1) _g.play(spriteName,soundProps);
				_g._isPlaying = false;
				if(_g._options.onend != null) _g._options.onend(_g);
			};
			if(this._manager.playingSounds.get(this._url) == null) this._manager.playingSounds.set(this._url,[]);
			this._manager.playingSounds.get(this._url).push(this._snd);
		}
	}
	,isPlaying: function() {
		return this._isPlaying;
	}
	,loop: function(val) {
		if(this._snd == null) return;
		this._snd.loop = val;
	}
	,setVolume: function(val) {
		if(this._gainNode == null) return;
		this._options.volume = val;
		this._gainNode.gain.value = this._options.volume;
	}
	,getVolume: function() {
		return this._options.volume;
	}
	,mute: function(val) {
		if(this._gainNode == null) return;
		if(val) this._gainNode.gain.value = 0; else this._gainNode.gain.value = this._options.volume;
	}
	,stop: function() {
		if(this._snd == null) return;
		this._snd.stop(0);
	}
	,destroy: function() {
		if(this._snd != null) {
			this._snd.stop(0);
			this._snd.disconnect();
			this._snd = null;
		}
		if(this._gainNode != null) {
			this._gainNode.disconnect();
			this._gainNode = null;
		}
	}
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
});
var js_Boot = function() { };
js_Boot.__name__ = true;
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
var $_, $fid = 0;
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $fid++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = function(){ return f.method.apply(f.scope, arguments); }; f.scope = o; f.method = m; o.hx__closures__[m.__id__] = f; } return f; }
String.__name__ = true;
Array.__name__ = true;
var __map_reserved = {}
Waud.defaults = { };
Waud.preferredSampleRate = 44100;
})(typeof console != "undefined" ? console : {log:function(){}}, typeof window != "undefined" ? window : exports);

//# sourceMappingURL=waud.js.map