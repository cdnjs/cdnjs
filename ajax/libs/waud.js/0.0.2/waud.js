(function (console, $hx_exports) { "use strict";
function $extend(from, fields) {
	function Inherit() {} Inherit.prototype = from; var proto = new Inherit();
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
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
	,__class__: EReg
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
Waud.init = function() {
	Waud.audioContext = Waud.createAudioContext();
	Waud.checkAudioContext(Waud.sampleRate);
	Waud.webAudioAPI = false;
	Waud.defaults = new WaudDefaults();
	Waud.defaults.autoplay = false;
	Waud.defaults.formats = [];
	Waud.defaults.loop = false;
	Waud.defaults.preload = "metadata";
	Waud.defaults.volume = 1;
	Waud.defaults.document = window.document;
	Waud.sounds = new haxe_ds_StringMap();
	Waud.types = new haxe_ds_StringMap();
	Waud.types.set("mp3","audio/mpeg");
	Waud.types.set("ogg","audio/ogg");
	Waud.types.set("wav","audio/wav");
	Waud.types.set("aac","audio/aac");
	Waud.types.set("m4a","audio/x-m4a");
	if(Waud.iOS) window.document.addEventListener("touchend",Waud.unlockAudio,true);
	window.addEventListener("unload",Waud.destroyContext,true);
};
Waud.mute = function() {
	var $it0 = Waud.sounds.iterator();
	while( $it0.hasNext() ) {
		var sound = $it0.next();
		sound.mute();
	}
};
Waud.unmute = function() {
	var $it0 = Waud.sounds.iterator();
	while( $it0.hasNext() ) {
		var sound = $it0.next();
		sound.unmute();
	}
};
Waud.destroyContext = function() {
	if(Waud.audioContext != null) {
		if(Waud.audioContext.close != null) Waud.audioContext.close();
		Waud.audioContext = null;
	}
};
Waud.suspendContext = function() {
	if(Waud.audioContext != null) {
		if(Waud.audioContext.suspend != null) Waud.audioContext.suspend();
	}
};
Waud.resumeContext = function() {
	if(Waud.audioContext != null) {
		if(Waud.audioContext.resume != null) Waud.audioContext.resume();
	}
};
Waud.getSupportString = function() {
	var support = "OGG: " + Waud.audioElement.canPlayType("audio/ogg; codecs=\"vorbis\"");
	support += ", WAV: " + Waud.audioElement.canPlayType("audio/wav; codecs=\"1\"");
	support += ", MP3: " + Waud.audioElement.canPlayType("audio/mpeg;");
	support += ", AAC: " + Waud.audioElement.canPlayType("audio/aac;");
	support += ", M4A: " + Waud.audioElement.canPlayType("audio/x-m4a;");
	return support;
};
Waud.createAudioContext = function() {
	if(Waud.audioContext == null) try {
		if(Waud.ac != null) Waud.audioContext = Type.createInstance(Waud.ac,[]);
	} catch( e ) {
		if (e instanceof js__$Boot_HaxeError) e = e.val;
		Waud.audioContext = null;
	}
	return Waud.audioContext;
};
Waud.checkAudioContext = function(sampleRate) {
	if(Waud.audioContext != null && Waud.audioContext.sampleRate != sampleRate) {
		Waud.destroyContext();
		Waud.audioContext = Waud.createAudioContext();
	}
};
Waud.unlockAudio = function() {
	if(Waud.unlocked || Waud.audioContext == null) return;
	var bfr = Waud.audioContext.createBuffer(1,1,Waud.sampleRate);
	var src = Waud.audioContext.createBufferSource();
	src.buffer = bfr;
	src.connect(Waud.audioContext.destination);
	if(src.noteOn != null) src.noteOn(0); else src.start(0);
	haxe_Timer.delay(function() {
		if(src.playbackState == src.PLAYING_STATE || src.playbackState == src.FINISHED_STATE) {
			Waud.unlocked = true;
			if(Waud.touchUnlock != null) Waud.touchUnlock();
			window.document.removeEventListener("touchend",Waud.unlockAudio,true);
		}
	},1);
};
Waud.isSupported = function() {
	return ($_=Waud.audioElement,$bind($_,$_.canPlayType)) != null;
};
Waud.isOGGSupported = function() {
	var canPlay = Waud.audioElement.canPlayType("audio/ogg; codecs=\"vorbis\"");
	return ($_=Waud.audioElement,$bind($_,$_.canPlayType)) != null && canPlay != null && (canPlay == "probably" || canPlay == "maybe");
};
Waud.isWAVSupported = function() {
	var canPlay = Waud.audioElement.canPlayType("audio/wav; codecs=\"1\"");
	return ($_=Waud.audioElement,$bind($_,$_.canPlayType)) != null && canPlay != null && (canPlay == "probably" || canPlay == "maybe");
};
Waud.isMP3Supported = function() {
	var canPlay = Waud.audioElement.canPlayType("audio/mpeg;");
	return ($_=Waud.audioElement,$bind($_,$_.canPlayType)) != null && canPlay != null && (canPlay == "probably" || canPlay == "maybe");
};
Waud.isAACSupported = function() {
	var canPlay = Waud.audioElement.canPlayType("audio/aac;");
	return ($_=Waud.audioElement,$bind($_,$_.canPlayType)) != null && canPlay != null && (canPlay == "probably" || canPlay == "maybe");
};
Waud.isM4ASupported = function() {
	var canPlay = Waud.audioElement.canPlayType("audio/x-m4a;");
	return ($_=Waud.audioElement,$bind($_,$_.canPlayType)) != null && canPlay != null && (canPlay == "probably" || canPlay == "maybe");
};
var WaudDefaults = function() {
};
WaudDefaults.__name__ = true;
WaudDefaults.prototype = {
	__class__: WaudDefaults
};
var WaudSound = $hx_exports.WaudSound = function(src,options) {
	var _g = this;
	if(Waud.defaults == null) {
		console.log("Initialise Waud using Waud.init() before loading sounds");
		return;
	}
	if(options == null) options = { };
	if(options.document != null) this.doc = options.document; else this.doc = Waud.defaults.document;
	this.pid = 0;
	this.events = [];
	this.supported = ($_=Waud.audioElement,$bind($_,$_.canPlayType)) != null;
	if(options.autoplay != null) options.autoplay = options.autoplay; else options.autoplay = Waud.defaults.autoplay;
	if(options.formats != null) options.formats = options.formats; else options.formats = Waud.defaults.formats;
	if(options.loop != null) options.loop = options.loop; else options.loop = Waud.defaults.loop;
	if(options.preload != null) options.preload = options.preload; else options.preload = Waud.defaults.preload;
	if(options.volume != null && options.volume >= 0 && options.volume <= 1) options.volume = options.volume; else options.volume = Waud.defaults.volume;
	if(this.supported && src != null && src != "") {
		var _this = window.document;
		this.sound = _this.createElement("audio");
		this.sound.crossOrigin = "anonymous";
		if(Waud.webAudioAPI && Waud.audioContext != null) {
			if(Waud.audioContext != null) {
				this.source = Waud.audioContext.createMediaElementSource(this.sound);
				(js_Boot.__cast(this.source , MediaElementAudioSourceNode)).connect(Waud.audioContext.destination);
			}
		}
		if(options.formats.length > 0) {
			var _g1 = 0;
			var _g11 = options.formats;
			while(_g1 < _g11.length) {
				var format = _g11[_g1];
				++_g1;
				this.addSource(src + "." + format);
			}
		} else this.addSource(src);
		if(options.loop) this.sound.loop = true;
		if(options.autoplay) this.sound.autoplay = true;
		this.sound.volume = options.volume;
		if(Std.string(options.preload) == "true") this.sound.preload = "auto"; else if(Std.string(options.preload) == "false") this.sound.preload = "none"; else this.sound.preload = "metadata";
		if(options.onload != null) this.sound.onloadeddata = function() {
			options.onload(_g);
		};
		if(options.onend != null) this.sound.onended = function() {
			options.onend(_g);
		};
		if(options.onerror != null) this.sound.onerror = function() {
			options.onerror(_g);
		};
		Waud.sounds.set(src,this);
		this.sound.load();
	}
};
WaudSound.__name__ = true;
WaudSound.prototype = {
	addSource: function(src) {
		var _this = window.document;
		this.source = _this.createElement("source");
		this.source.src = src;
		if((function($this) {
			var $r;
			var key = $this.getExt(src);
			$r = Waud.types.get(key);
			return $r;
		}(this)) != null) {
			var key1 = this.getExt(src);
			this.source.type = Waud.types.get(key1);
		}
		this.sound.appendChild(this.source);
		return this.source;
	}
	,getExt: function(filename) {
		return filename.split(".").pop();
	}
	,set_volume: function(val) {
		if(val >= 0 && val <= 1) this.sound.volume = val;
		return this.volume = val;
	}
	,mute: function() {
		this.sound.muted = true;
	}
	,unmute: function() {
		this.sound.muted = false;
	}
	,loop: function() {
		this.sound.loop = true;
	}
	,unloop: function() {
		this.sound.loop = false;
	}
	,play: function() {
		this.sound.play();
	}
	,stop: function() {
		this.sound.pause();
		this.sound.currentTime = 0;
	}
	,__class__: WaudSound
};
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
	return (Function("return typeof " + name + " != \"undefined\" ? " + name + " : null"))();
};
var $_, $fid = 0;
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $fid++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = function(){ return f.method.apply(f.scope, arguments); }; f.scope = o; f.method = m; o.hx__closures__[m.__id__] = f; } return f; }
String.prototype.__class__ = String;
String.__name__ = true;
Array.__name__ = true;
var Int = { __name__ : ["Int"]};
var Dynamic = { __name__ : ["Dynamic"]};
var Float = Number;
Float.__name__ = ["Float"];
var Bool = Boolean;
Bool.__ename__ = ["Bool"];
var Class = { __name__ : ["Class"]};
var Enum = { };
var __map_reserved = {}
Waud.sampleRate = 44100;
Waud.ac = Reflect.field(window,"AudioContext") != null?Reflect.field(window,"AudioContext"):Reflect.field(window,"webkitAudioContext");
Waud.audioElement = (function($this) {
	var $r;
	var _this = window.document;
	$r = _this.createElement("audio");
	return $r;
}(this));
Waud.iOS = Utils.isiOS();
Waud.unlocked = false;
js_Boot.__toStr = {}.toString;
})(typeof console != "undefined" ? console : {log:function(){}}, typeof window != "undefined" ? window : exports);

//# sourceMappingURL=waud.js.map