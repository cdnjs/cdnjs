var Module = typeof Module !== "undefined" ? Module : {};

if (!Module.expectedDataFileDownloads) {
 Module.expectedDataFileDownloads = 0;
 Module.finishedDataFileDownloads = 0;
}

Module.expectedDataFileDownloads++;

(function() {
 var loadPackage = function(metadata) {
  var PACKAGE_PATH;
  if (typeof window === "object") {
   PACKAGE_PATH = window["encodeURIComponent"](window.location.pathname.toString().substring(0, window.location.pathname.toString().lastIndexOf("/")) + "/");
  } else if (typeof location !== "undefined") {
   PACKAGE_PATH = encodeURIComponent(location.pathname.toString().substring(0, location.pathname.toString().lastIndexOf("/")) + "/");
  } else {
   throw "using preloaded data can only be done on a web page or in a web worker";
  }
  var PACKAGE_NAME = "dist/js/subtitles-octopus-worker.data";
  var REMOTE_PACKAGE_BASE = "subtitles-octopus-worker.data";
  if (typeof Module["locateFilePackage"] === "function" && !Module["locateFile"]) {
   Module["locateFile"] = Module["locateFilePackage"];
   err("warning: you defined Module.locateFilePackage, that has been renamed to Module.locateFile (using your locateFilePackage for now)");
  }
  var REMOTE_PACKAGE_NAME = Module["locateFile"] ? Module["locateFile"](REMOTE_PACKAGE_BASE, "") : REMOTE_PACKAGE_BASE;
  var REMOTE_PACKAGE_SIZE = metadata["remote_package_size"];
  var PACKAGE_UUID = metadata["package_uuid"];
  function fetchRemotePackage(packageName, packageSize, callback, errback) {
   var xhr = new XMLHttpRequest();
   xhr.open("GET", packageName, true);
   xhr.responseType = "arraybuffer";
   xhr.onprogress = function(event) {
    var url = packageName;
    var size = packageSize;
    if (event.total) size = event.total;
    if (event.loaded) {
     if (!xhr.addedTotal) {
      xhr.addedTotal = true;
      if (!Module.dataFileDownloads) Module.dataFileDownloads = {};
      Module.dataFileDownloads[url] = {
       loaded: event.loaded,
       total: size
      };
     } else {
      Module.dataFileDownloads[url].loaded = event.loaded;
     }
     var total = 0;
     var loaded = 0;
     var num = 0;
     for (var download in Module.dataFileDownloads) {
      var data = Module.dataFileDownloads[download];
      total += data.total;
      loaded += data.loaded;
      num++;
     }
     total = Math.ceil(total * Module.expectedDataFileDownloads / num);
     if (Module["setStatus"]) Module["setStatus"]("Downloading data... (" + loaded + "/" + total + ")");
    } else if (!Module.dataFileDownloads) {
     if (Module["setStatus"]) Module["setStatus"]("Downloading data...");
    }
   };
   xhr.onerror = function(event) {
    throw new Error("NetworkError for: " + packageName);
   };
   xhr.onload = function(event) {
    if (xhr.status == 200 || xhr.status == 304 || xhr.status == 206 || xhr.status == 0 && xhr.response) {
     var packageData = xhr.response;
     callback(packageData);
    } else {
     throw new Error(xhr.statusText + " : " + xhr.responseURL);
    }
   };
   xhr.send(null);
  }
  function handleError(error) {
   console.error("package error:", error);
  }
  var fetchedCallback = null;
  var fetched = Module["getPreloadedPackage"] ? Module["getPreloadedPackage"](REMOTE_PACKAGE_NAME, REMOTE_PACKAGE_SIZE) : null;
  if (!fetched) fetchRemotePackage(REMOTE_PACKAGE_NAME, REMOTE_PACKAGE_SIZE, function(data) {
   if (fetchedCallback) {
    fetchedCallback(data);
    fetchedCallback = null;
   } else {
    fetched = data;
   }
  }, handleError);
  function runWithFS() {
   function assert(check, msg) {
    if (!check) throw msg + new Error().stack;
   }
   Module["FS_createPath"]("/", "assets", true, true);
   function DataRequest(start, end, audio) {
    this.start = start;
    this.end = end;
    this.audio = audio;
   }
   DataRequest.prototype = {
    requests: {},
    open: function(mode, name) {
     this.name = name;
     this.requests[name] = this;
     Module["addRunDependency"]("fp " + this.name);
    },
    send: function() {},
    onload: function() {
     var byteArray = this.byteArray.subarray(this.start, this.end);
     this.finish(byteArray);
    },
    finish: function(byteArray) {
     var that = this;
     Module["FS_createPreloadedFile"](this.name, null, byteArray, true, true, function() {
      Module["removeRunDependency"]("fp " + that.name);
     }, function() {
      if (that.audio) {
       Module["removeRunDependency"]("fp " + that.name);
      } else {
       err("Preloading file " + that.name + " failed");
      }
     }, false, true);
     this.requests[this.name] = null;
    }
   };
   var files = metadata["files"];
   for (var i = 0; i < files.length; ++i) {
    new DataRequest(files[i]["start"], files[i]["end"], files[i]["audio"]).open("GET", files[i]["filename"]);
   }
   function processPackageData(arrayBuffer) {
    Module.finishedDataFileDownloads++;
    assert(arrayBuffer, "Loading data file failed.");
    assert(arrayBuffer instanceof ArrayBuffer, "bad input to processPackageData");
    var byteArray = new Uint8Array(arrayBuffer);
    DataRequest.prototype.byteArray = byteArray;
    var files = metadata["files"];
    for (var i = 0; i < files.length; ++i) {
     DataRequest.prototype.requests[files[i].filename].onload();
    }
    Module["removeRunDependency"]("datafile_dist/js/subtitles-octopus-worker.data");
   }
   Module["addRunDependency"]("datafile_dist/js/subtitles-octopus-worker.data");
   if (!Module.preloadResults) Module.preloadResults = {};
   Module.preloadResults[PACKAGE_NAME] = {
    fromCache: false
   };
   if (fetched) {
    processPackageData(fetched);
    fetched = null;
   } else {
    fetchedCallback = processPackageData;
   }
  }
  if (Module["calledRun"]) {
   runWithFS();
  } else {
   if (!Module["preRun"]) Module["preRun"] = [];
   Module["preRun"].push(runWithFS);
  }
 };
 loadPackage({
  "files": [ {
   "start": 0,
   "audio": 0,
   "end": 145972,
   "filename": "/assets/default.woff2"
  }, {
   "start": 145972,
   "audio": 0,
   "end": 146775,
   "filename": "/assets/fonts.conf"
  } ],
  "remote_package_size": 146775,
  "package_uuid": "43f55d8e-e644-4070-b252-e03ac41196bc"
 });
})();

if (!String.prototype.endsWith) {
 String.prototype.endsWith = function(search, this_len) {
  if (this_len === undefined || this_len > this.length) {
   this_len = this.length;
  }
  return this.substring(this_len - search.length, this_len) === search;
 };
}

var hasNativeConsole = typeof console !== "undefined";

function makeCustomConsole() {
 var console = function() {
  function postConsoleMessage(prefix, args) {
   postMessage({
    target: "console-" + prefix,
    content: JSON.stringify(Array.prototype.slice.call(args))
   });
  }
  return {
   log: function() {
    postConsoleMessage("log", arguments);
   },
   debug: function() {
    postConsoleMessage("debug", arguments);
   },
   info: function() {
    postConsoleMessage("info", arguments);
   },
   warn: function() {
    postConsoleMessage("warn", arguments);
   },
   error: function() {
    postConsoleMessage("error", arguments);
   }
  };
 }();
 return console;
}

Module = Module || {};

Module["preRun"] = Module["preRun"] || [];

Module["preRun"].push(function() {
 var i;
 Module["FS_createFolder"]("/", "fonts", true, true);
 if (!self.subContent) {
  if (self.subUrl.endsWith(".br")) {
   self.subContent = Module["BrotliDecode"](readBinary(self.subUrl));
  } else {
   self.subContent = read_(self.subUrl);
  }
 }
 if (self.availableFonts && self.availableFonts.length !== 0) {
  var sections = parseAss(self.subContent);
  for (var i = 0; i < sections.length; i++) {
   for (var j = 0; j < sections[i].body.length; j++) {
    if (sections[i].body[j].key === "Style") {
     self.writeFontToFS(sections[i].body[j].value["Fontname"]);
    }
   }
  }
  var regex = /\\fn([^\\}]*?)[\\}]/g;
  var matches;
  while (matches = regex.exec(self.subContent)) {
   self.writeFontToFS(matches[1]);
  }
 }
 if (self.subContent) {
  Module["FS"].writeFile("/sub.ass", self.subContent);
 }
 self.subContent = null;
 var fontFiles = self.fontFiles || [];
 for (i = 0; i < fontFiles.length; i++) {
  Module["FS_createPreloadedFile"]("/fonts", "font" + i + "-" + fontFiles[i].split("/").pop(), fontFiles[i], true, true);
 }
});

Module["onRuntimeInitialized"] = function() {
 self.octObj = new Module.SubtitleOctopus();
 self.changed = Module._malloc(4);
 self.octObj.initLibrary(screen.width, screen.height);
 self.octObj.createTrack("/sub.ass");
 self.ass_track = self.octObj.track;
 self.ass_library = self.octObj.ass_library;
 self.ass_renderer = self.octObj.ass_renderer;
};

Module["print"] = function(text) {
 if (arguments.length > 1) text = Array.prototype.slice.call(arguments).join(" ");
 console.log(text);
};

Module["printErr"] = function(text) {
 if (arguments.length > 1) text = Array.prototype.slice.call(arguments).join(" ");
 console.error(text);
};

if (!hasNativeConsole) {
 var console = {
  log: function(x) {
   if (typeof dump === "function") dump("log: " + x + "\n");
  },
  debug: function(x) {
   if (typeof dump === "function") dump("debug: " + x + "\n");
  },
  info: function(x) {
   if (typeof dump === "function") dump("info: " + x + "\n");
  },
  warn: function(x) {
   if (typeof dump === "function") dump("warn: " + x + "\n");
  },
  error: function(x) {
   if (typeof dump === "function") dump("error: " + x + "\n");
  }
 };
}

if ("performance" in self === false) {
 self.performance = {};
}

Date.now = Date.now || function() {
 return new Date().getTime();
};

if ("now" in self.performance === false) {
 var nowOffset = Date.now();
 if (performance.timing && performance.timing.navigationStart) {
  nowOffset = performance.timing.navigationStart;
 }
 self.performance.now = function now() {
  return Date.now() - nowOffset;
 };
}

(function(f) {
 if (typeof exports === "object" && typeof module !== "undefined") {
  module.exports = f();
 } else if (typeof define === "function" && define.amd) {
  define([], f);
 } else {
  var g;
  if (typeof window !== "undefined") {
   g = window;
  } else if (typeof global !== "undefined") {
   g = global;
  } else if (typeof self !== "undefined") {
   g = self;
  } else {
   g = this;
  }
  g.unbrotli = f();
 }
})(function() {
 var exports;
 return function() {
  function r(e, n, t) {
   function o(i, f) {
    if (!n[i]) {
     if (!e[i]) {
      var c = "function" == typeof require && require;
      if (!f && c) return c(i, !0);
      if (u) return u(i, !0);
      var a = new Error("Cannot find module '" + i + "'");
      throw a.code = "MODULE_NOT_FOUND", a;
     }
     var p = n[i] = {
      exports: {}
     };
     e[i][0].call(p.exports, function(r) {
      var n = e[i][1][r];
      return o(n || r);
     }, p, p.exports, r, e, n, t);
    }
    return n[i].exports;
   }
   for (var u = "function" == typeof require && require, i = 0; i < t.length; i++) o(t[i]);
   return o;
  }
  return r;
 }()({
  1: [ function(require, module, exports) {
   var BROTLI_READ_SIZE = 4096;
   var BROTLI_IBUF_SIZE = 2 * BROTLI_READ_SIZE + 32;
   var BROTLI_IBUF_MASK = 2 * BROTLI_READ_SIZE - 1;
   var kBitMask = new Uint32Array([ 0, 1, 3, 7, 15, 31, 63, 127, 255, 511, 1023, 2047, 4095, 8191, 16383, 32767, 65535, 131071, 262143, 524287, 1048575, 2097151, 4194303, 8388607, 16777215 ]);
   function BrotliBitReader(input) {
    this.buf_ = new Uint8Array(BROTLI_IBUF_SIZE);
    this.input_ = input;
    this.reset();
   }
   BrotliBitReader.READ_SIZE = BROTLI_READ_SIZE;
   BrotliBitReader.IBUF_MASK = BROTLI_IBUF_MASK;
   BrotliBitReader.prototype.reset = function() {
    this.buf_ptr_ = 0;
    this.val_ = 0;
    this.pos_ = 0;
    this.bit_pos_ = 0;
    this.bit_end_pos_ = 0;
    this.eos_ = 0;
    this.readMoreInput();
    for (var i = 0; i < 4; i++) {
     this.val_ |= this.buf_[this.pos_] << 8 * i;
     ++this.pos_;
    }
    return this.bit_end_pos_ > 0;
   };
   BrotliBitReader.prototype.readMoreInput = function() {
    if (this.bit_end_pos_ > 256) {
     return;
    } else if (this.eos_) {
     if (this.bit_pos_ > this.bit_end_pos_) throw new Error("Unexpected end of input " + this.bit_pos_ + " " + this.bit_end_pos_);
    } else {
     var dst = this.buf_ptr_;
     var bytes_read = this.input_.read(this.buf_, dst, BROTLI_READ_SIZE);
     if (bytes_read < 0) {
      throw new Error("Unexpected end of input");
     }
     if (bytes_read < BROTLI_READ_SIZE) {
      this.eos_ = 1;
      for (var p = 0; p < 32; p++) this.buf_[dst + bytes_read + p] = 0;
     }
     if (dst === 0) {
      for (var p = 0; p < 32; p++) this.buf_[(BROTLI_READ_SIZE << 1) + p] = this.buf_[p];
      this.buf_ptr_ = BROTLI_READ_SIZE;
     } else {
      this.buf_ptr_ = 0;
     }
     this.bit_end_pos_ += bytes_read << 3;
    }
   };
   BrotliBitReader.prototype.fillBitWindow = function() {
    while (this.bit_pos_ >= 8) {
     this.val_ >>>= 8;
     this.val_ |= this.buf_[this.pos_ & BROTLI_IBUF_MASK] << 24;
     ++this.pos_;
     this.bit_pos_ = this.bit_pos_ - 8 >>> 0;
     this.bit_end_pos_ = this.bit_end_pos_ - 8 >>> 0;
    }
   };
   BrotliBitReader.prototype.readBits = function(n_bits) {
    if (32 - this.bit_pos_ < n_bits) {
     this.fillBitWindow();
    }
    var val = this.val_ >>> this.bit_pos_ & kBitMask[n_bits];
    this.bit_pos_ += n_bits;
    return val;
   };
   module.exports = BrotliBitReader;
  }, {} ],
  2: [ function(require, module, exports) {
   exports.lookup = new Uint8Array([ 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 12, 16, 12, 12, 20, 12, 16, 24, 28, 12, 12, 32, 12, 36, 12, 44, 44, 44, 44, 44, 44, 44, 44, 44, 44, 32, 32, 24, 40, 28, 12, 12, 48, 52, 52, 52, 48, 52, 52, 52, 48, 52, 52, 52, 52, 52, 48, 52, 52, 52, 52, 52, 48, 52, 52, 52, 52, 52, 24, 12, 28, 12, 12, 12, 56, 60, 60, 60, 56, 60, 60, 60, 56, 60, 60, 60, 60, 60, 56, 60, 60, 60, 60, 60, 56, 60, 60, 60, 60, 60, 24, 12, 28, 12, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 7, 0, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 56, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 6, 6, 6, 6, 7, 7, 7, 7, 8, 8, 8, 8, 9, 9, 9, 9, 10, 10, 10, 10, 11, 11, 11, 11, 12, 12, 12, 12, 13, 13, 13, 13, 14, 14, 14, 14, 15, 15, 15, 15, 16, 16, 16, 16, 17, 17, 17, 17, 18, 18, 18, 18, 19, 19, 19, 19, 20, 20, 20, 20, 21, 21, 21, 21, 22, 22, 22, 22, 23, 23, 23, 23, 24, 24, 24, 24, 25, 25, 25, 25, 26, 26, 26, 26, 27, 27, 27, 27, 28, 28, 28, 28, 29, 29, 29, 29, 30, 30, 30, 30, 31, 31, 31, 31, 32, 32, 32, 32, 33, 33, 33, 33, 34, 34, 34, 34, 35, 35, 35, 35, 36, 36, 36, 36, 37, 37, 37, 37, 38, 38, 38, 38, 39, 39, 39, 39, 40, 40, 40, 40, 41, 41, 41, 41, 42, 42, 42, 42, 43, 43, 43, 43, 44, 44, 44, 44, 45, 45, 45, 45, 46, 46, 46, 46, 47, 47, 47, 47, 48, 48, 48, 48, 49, 49, 49, 49, 50, 50, 50, 50, 51, 51, 51, 51, 52, 52, 52, 52, 53, 53, 53, 53, 54, 54, 54, 54, 55, 55, 55, 55, 56, 56, 56, 56, 57, 57, 57, 57, 58, 58, 58, 58, 59, 59, 59, 59, 60, 60, 60, 60, 61, 61, 61, 61, 62, 62, 62, 62, 63, 63, 63, 63, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]);
   exports.lookupOffsets = new Uint16Array([ 1024, 1536, 1280, 1536, 0, 256, 768, 512 ]);
  }, {} ],
  3: [ function(require, module, exports) {
   var BrotliInput = require("./streams").BrotliInput;
   var BrotliOutput = require("./streams").BrotliOutput;
   var BrotliBitReader = require("./bit_reader");
   var BrotliDictionary = require("./dictionary");
   var HuffmanCode = require("./huffman").HuffmanCode;
   var BrotliBuildHuffmanTable = require("./huffman").BrotliBuildHuffmanTable;
   var Context = require("./context");
   var Prefix = require("./prefix");
   var Transform = require("./transform");
   var kDefaultCodeLength = 8;
   var kCodeLengthRepeatCode = 16;
   var kNumLiteralCodes = 256;
   var kNumInsertAndCopyCodes = 704;
   var kNumBlockLengthCodes = 26;
   var kLiteralContextBits = 6;
   var kDistanceContextBits = 2;
   var HUFFMAN_TABLE_BITS = 8;
   var HUFFMAN_TABLE_MASK = 255;
   var HUFFMAN_MAX_TABLE_SIZE = 1080;
   var CODE_LENGTH_CODES = 18;
   var kCodeLengthCodeOrder = new Uint8Array([ 1, 2, 3, 4, 0, 5, 17, 6, 16, 7, 8, 9, 10, 11, 12, 13, 14, 15 ]);
   var NUM_DISTANCE_SHORT_CODES = 16;
   var kDistanceShortCodeIndexOffset = new Uint8Array([ 3, 2, 1, 0, 3, 3, 3, 3, 3, 3, 2, 2, 2, 2, 2, 2 ]);
   var kDistanceShortCodeValueOffset = new Int8Array([ 0, 0, 0, 0, -1, 1, -2, 2, -3, 3, -1, 1, -2, 2, -3, 3 ]);
   var kMaxHuffmanTableSize = new Uint16Array([ 256, 402, 436, 468, 500, 534, 566, 598, 630, 662, 694, 726, 758, 790, 822, 854, 886, 920, 952, 984, 1016, 1048, 1080 ]);
   function DecodeWindowBits(br) {
    var n;
    if (br.readBits(1) === 0) {
     return 16;
    }
    n = br.readBits(3);
    if (n > 0) {
     return 17 + n;
    }
    n = br.readBits(3);
    if (n > 0) {
     return 8 + n;
    }
    return 17;
   }
   function DecodeVarLenUint8(br) {
    if (br.readBits(1)) {
     var nbits = br.readBits(3);
     if (nbits === 0) {
      return 1;
     } else {
      return br.readBits(nbits) + (1 << nbits);
     }
    }
    return 0;
   }
   function MetaBlockLength() {
    this.meta_block_length = 0;
    this.input_end = 0;
    this.is_uncompressed = 0;
    this.is_metadata = false;
   }
   function DecodeMetaBlockLength(br) {
    var out = new MetaBlockLength();
    var size_nibbles;
    var size_bytes;
    var i;
    out.input_end = br.readBits(1);
    if (out.input_end && br.readBits(1)) {
     return out;
    }
    size_nibbles = br.readBits(2) + 4;
    if (size_nibbles === 7) {
     out.is_metadata = true;
     if (br.readBits(1) !== 0) throw new Error("Invalid reserved bit");
     size_bytes = br.readBits(2);
     if (size_bytes === 0) return out;
     for (i = 0; i < size_bytes; i++) {
      var next_byte = br.readBits(8);
      if (i + 1 === size_bytes && size_bytes > 1 && next_byte === 0) throw new Error("Invalid size byte");
      out.meta_block_length |= next_byte << i * 8;
     }
    } else {
     for (i = 0; i < size_nibbles; ++i) {
      var next_nibble = br.readBits(4);
      if (i + 1 === size_nibbles && size_nibbles > 4 && next_nibble === 0) throw new Error("Invalid size nibble");
      out.meta_block_length |= next_nibble << i * 4;
     }
    }
    ++out.meta_block_length;
    if (!out.input_end && !out.is_metadata) {
     out.is_uncompressed = br.readBits(1);
    }
    return out;
   }
   function ReadSymbol(table, index, br) {
    var nbits;
    br.fillBitWindow();
    index += br.val_ >>> br.bit_pos_ & HUFFMAN_TABLE_MASK;
    nbits = table[index].bits - HUFFMAN_TABLE_BITS;
    if (nbits > 0) {
     br.bit_pos_ += HUFFMAN_TABLE_BITS;
     index += table[index].value;
     index += br.val_ >>> br.bit_pos_ & (1 << nbits) - 1;
    }
    br.bit_pos_ += table[index].bits;
    return table[index].value;
   }
   function ReadHuffmanCodeLengths(code_length_code_lengths, num_symbols, code_lengths, br) {
    var symbol = 0;
    var prev_code_len = kDefaultCodeLength;
    var repeat = 0;
    var repeat_code_len = 0;
    var space = 32768;
    var table = [];
    for (var i = 0; i < 32; i++) table.push(new HuffmanCode(0, 0));
    BrotliBuildHuffmanTable(table, 0, 5, code_length_code_lengths, CODE_LENGTH_CODES);
    while (symbol < num_symbols && space > 0) {
     var p = 0;
     var code_len;
     br.readMoreInput();
     br.fillBitWindow();
     p += br.val_ >>> br.bit_pos_ & 31;
     br.bit_pos_ += table[p].bits;
     code_len = table[p].value & 255;
     if (code_len < kCodeLengthRepeatCode) {
      repeat = 0;
      code_lengths[symbol++] = code_len;
      if (code_len !== 0) {
       prev_code_len = code_len;
       space -= 32768 >> code_len;
      }
     } else {
      var extra_bits = code_len - 14;
      var old_repeat;
      var repeat_delta;
      var new_len = 0;
      if (code_len === kCodeLengthRepeatCode) {
       new_len = prev_code_len;
      }
      if (repeat_code_len !== new_len) {
       repeat = 0;
       repeat_code_len = new_len;
      }
      old_repeat = repeat;
      if (repeat > 0) {
       repeat -= 2;
       repeat <<= extra_bits;
      }
      repeat += br.readBits(extra_bits) + 3;
      repeat_delta = repeat - old_repeat;
      if (symbol + repeat_delta > num_symbols) {
       throw new Error("[ReadHuffmanCodeLengths] symbol + repeat_delta > num_symbols");
      }
      for (var x = 0; x < repeat_delta; x++) code_lengths[symbol + x] = repeat_code_len;
      symbol += repeat_delta;
      if (repeat_code_len !== 0) {
       space -= repeat_delta << 15 - repeat_code_len;
      }
     }
    }
    if (space !== 0) {
     throw new Error("[ReadHuffmanCodeLengths] space = " + space);
    }
    for (;symbol < num_symbols; symbol++) code_lengths[symbol] = 0;
   }
   function ReadHuffmanCode(alphabet_size, tables, table, br) {
    var table_size = 0;
    var simple_code_or_skip;
    var code_lengths = new Uint8Array(alphabet_size);
    br.readMoreInput();
    simple_code_or_skip = br.readBits(2);
    if (simple_code_or_skip === 1) {
     var i;
     var max_bits_counter = alphabet_size - 1;
     var max_bits = 0;
     var symbols = new Int32Array(4);
     var num_symbols = br.readBits(2) + 1;
     while (max_bits_counter) {
      max_bits_counter >>= 1;
      ++max_bits;
     }
     for (i = 0; i < num_symbols; ++i) {
      symbols[i] = br.readBits(max_bits) % alphabet_size;
      code_lengths[symbols[i]] = 2;
     }
     code_lengths[symbols[0]] = 1;
     switch (num_symbols) {
     case 1:
      break;

     case 3:
      if (symbols[0] === symbols[1] || symbols[0] === symbols[2] || symbols[1] === symbols[2]) {
       throw new Error("[ReadHuffmanCode] invalid symbols");
      }
      break;

     case 2:
      if (symbols[0] === symbols[1]) {
       throw new Error("[ReadHuffmanCode] invalid symbols");
      }
      code_lengths[symbols[1]] = 1;
      break;

     case 4:
      if (symbols[0] === symbols[1] || symbols[0] === symbols[2] || symbols[0] === symbols[3] || symbols[1] === symbols[2] || symbols[1] === symbols[3] || symbols[2] === symbols[3]) {
       throw new Error("[ReadHuffmanCode] invalid symbols");
      }
      if (br.readBits(1)) {
       code_lengths[symbols[2]] = 3;
       code_lengths[symbols[3]] = 3;
      } else {
       code_lengths[symbols[0]] = 2;
      }
      break;
     }
    } else {
     var i;
     var code_length_code_lengths = new Uint8Array(CODE_LENGTH_CODES);
     var space = 32;
     var num_codes = 0;
     var huff = [ new HuffmanCode(2, 0), new HuffmanCode(2, 4), new HuffmanCode(2, 3), new HuffmanCode(3, 2), new HuffmanCode(2, 0), new HuffmanCode(2, 4), new HuffmanCode(2, 3), new HuffmanCode(4, 1), new HuffmanCode(2, 0), new HuffmanCode(2, 4), new HuffmanCode(2, 3), new HuffmanCode(3, 2), new HuffmanCode(2, 0), new HuffmanCode(2, 4), new HuffmanCode(2, 3), new HuffmanCode(4, 5) ];
     for (i = simple_code_or_skip; i < CODE_LENGTH_CODES && space > 0; ++i) {
      var code_len_idx = kCodeLengthCodeOrder[i];
      var p = 0;
      var v;
      br.fillBitWindow();
      p += br.val_ >>> br.bit_pos_ & 15;
      br.bit_pos_ += huff[p].bits;
      v = huff[p].value;
      code_length_code_lengths[code_len_idx] = v;
      if (v !== 0) {
       space -= 32 >> v;
       ++num_codes;
      }
     }
     if (!(num_codes === 1 || space === 0)) throw new Error("[ReadHuffmanCode] invalid num_codes or space");
     ReadHuffmanCodeLengths(code_length_code_lengths, alphabet_size, code_lengths, br);
    }
    table_size = BrotliBuildHuffmanTable(tables, table, HUFFMAN_TABLE_BITS, code_lengths, alphabet_size);
    if (table_size === 0) {
     throw new Error("[ReadHuffmanCode] BuildHuffmanTable failed: ");
    }
    return table_size;
   }
   function ReadBlockLength(table, index, br) {
    var code;
    var nbits;
    code = ReadSymbol(table, index, br);
    nbits = Prefix.kBlockLengthPrefixCode[code].nbits;
    return Prefix.kBlockLengthPrefixCode[code].offset + br.readBits(nbits);
   }
   function TranslateShortCodes(code, ringbuffer, index) {
    var val;
    if (code < NUM_DISTANCE_SHORT_CODES) {
     index += kDistanceShortCodeIndexOffset[code];
     index &= 3;
     val = ringbuffer[index] + kDistanceShortCodeValueOffset[code];
    } else {
     val = code - NUM_DISTANCE_SHORT_CODES + 1;
    }
    return val;
   }
   function MoveToFront(v, index) {
    var value = v[index];
    var i = index;
    for (;i; --i) v[i] = v[i - 1];
    v[0] = value;
   }
   function InverseMoveToFrontTransform(v, v_len) {
    var mtf = new Uint8Array(256);
    var i;
    for (i = 0; i < 256; ++i) {
     mtf[i] = i;
    }
    for (i = 0; i < v_len; ++i) {
     var index = v[i];
     v[i] = mtf[index];
     if (index) MoveToFront(mtf, index);
    }
   }
   function HuffmanTreeGroup(alphabet_size, num_htrees) {
    this.alphabet_size = alphabet_size;
    this.num_htrees = num_htrees;
    this.codes = new Array(num_htrees + num_htrees * kMaxHuffmanTableSize[alphabet_size + 31 >>> 5]);
    this.htrees = new Uint32Array(num_htrees);
   }
   HuffmanTreeGroup.prototype.decode = function(br) {
    var i;
    var table_size;
    var next = 0;
    for (i = 0; i < this.num_htrees; ++i) {
     this.htrees[i] = next;
     table_size = ReadHuffmanCode(this.alphabet_size, this.codes, next, br);
     next += table_size;
    }
   };
   function DecodeContextMap(context_map_size, br) {
    var out = {
     num_htrees: null,
     context_map: null
    };
    var use_rle_for_zeros;
    var max_run_length_prefix = 0;
    var table;
    var i;
    br.readMoreInput();
    var num_htrees = out.num_htrees = DecodeVarLenUint8(br) + 1;
    var context_map = out.context_map = new Uint8Array(context_map_size);
    if (num_htrees <= 1) {
     return out;
    }
    use_rle_for_zeros = br.readBits(1);
    if (use_rle_for_zeros) {
     max_run_length_prefix = br.readBits(4) + 1;
    }
    table = [];
    for (i = 0; i < HUFFMAN_MAX_TABLE_SIZE; i++) {
     table[i] = new HuffmanCode(0, 0);
    }
    ReadHuffmanCode(num_htrees + max_run_length_prefix, table, 0, br);
    for (i = 0; i < context_map_size; ) {
     var code;
     br.readMoreInput();
     code = ReadSymbol(table, 0, br);
     if (code === 0) {
      context_map[i] = 0;
      ++i;
     } else if (code <= max_run_length_prefix) {
      var reps = 1 + (1 << code) + br.readBits(code);
      while (--reps) {
       if (i >= context_map_size) {
        throw new Error("[DecodeContextMap] i >= context_map_size");
       }
       context_map[i] = 0;
       ++i;
      }
     } else {
      context_map[i] = code - max_run_length_prefix;
      ++i;
     }
    }
    if (br.readBits(1)) {
     InverseMoveToFrontTransform(context_map, context_map_size);
    }
    return out;
   }
   function DecodeBlockType(max_block_type, trees, tree_type, block_types, ringbuffers, indexes, br) {
    var ringbuffer = tree_type * 2;
    var index = tree_type;
    var type_code = ReadSymbol(trees, tree_type * HUFFMAN_MAX_TABLE_SIZE, br);
    var block_type;
    if (type_code === 0) {
     block_type = ringbuffers[ringbuffer + (indexes[index] & 1)];
    } else if (type_code === 1) {
     block_type = ringbuffers[ringbuffer + (indexes[index] - 1 & 1)] + 1;
    } else {
     block_type = type_code - 2;
    }
    if (block_type >= max_block_type) {
     block_type -= max_block_type;
    }
    block_types[tree_type] = block_type;
    ringbuffers[ringbuffer + (indexes[index] & 1)] = block_type;
    ++indexes[index];
   }
   function CopyUncompressedBlockToOutput(output, len, pos, ringbuffer, ringbuffer_mask, br) {
    var rb_size = ringbuffer_mask + 1;
    var rb_pos = pos & ringbuffer_mask;
    var br_pos = br.pos_ & BrotliBitReader.IBUF_MASK;
    var nbytes;
    if (len < 8 || br.bit_pos_ + (len << 3) < br.bit_end_pos_) {
     while (len-- > 0) {
      br.readMoreInput();
      ringbuffer[rb_pos++] = br.readBits(8);
      if (rb_pos === rb_size) {
       output.write(ringbuffer, rb_size);
       rb_pos = 0;
      }
     }
     return;
    }
    if (br.bit_end_pos_ < 32) {
     throw new Error("[CopyUncompressedBlockToOutput] br.bit_end_pos_ < 32");
    }
    while (br.bit_pos_ < 32) {
     ringbuffer[rb_pos] = br.val_ >>> br.bit_pos_;
     br.bit_pos_ += 8;
     ++rb_pos;
     --len;
    }
    nbytes = br.bit_end_pos_ - br.bit_pos_ >> 3;
    if (br_pos + nbytes > BrotliBitReader.IBUF_MASK) {
     var tail = BrotliBitReader.IBUF_MASK + 1 - br_pos;
     for (var x = 0; x < tail; x++) ringbuffer[rb_pos + x] = br.buf_[br_pos + x];
     nbytes -= tail;
     rb_pos += tail;
     len -= tail;
     br_pos = 0;
    }
    for (var x = 0; x < nbytes; x++) ringbuffer[rb_pos + x] = br.buf_[br_pos + x];
    rb_pos += nbytes;
    len -= nbytes;
    if (rb_pos >= rb_size) {
     output.write(ringbuffer, rb_size);
     rb_pos -= rb_size;
     for (var x = 0; x < rb_pos; x++) ringbuffer[x] = ringbuffer[rb_size + x];
    }
    while (rb_pos + len >= rb_size) {
     nbytes = rb_size - rb_pos;
     if (br.input_.read(ringbuffer, rb_pos, nbytes) < nbytes) {
      throw new Error("[CopyUncompressedBlockToOutput] not enough bytes");
     }
     output.write(ringbuffer, rb_size);
     len -= nbytes;
     rb_pos = 0;
    }
    if (br.input_.read(ringbuffer, rb_pos, len) < len) {
     throw new Error("[CopyUncompressedBlockToOutput] not enough bytes");
    }
    br.reset();
   }
   function JumpToByteBoundary(br) {
    var new_bit_pos = br.bit_pos_ + 7 & ~7;
    var pad_bits = br.readBits(new_bit_pos - br.bit_pos_);
    return pad_bits == 0;
   }
   function BrotliDecompressedSize(buffer) {
    var input = new BrotliInput(buffer);
    var br = new BrotliBitReader(input);
    DecodeWindowBits(br);
    var out = DecodeMetaBlockLength(br);
    return out.meta_block_length;
   }
   exports.BrotliDecompressedSize = BrotliDecompressedSize;
   function BrotliDecompressBuffer(buffer, output_size) {
    var input = new BrotliInput(buffer);
    if (output_size == null) {
     output_size = BrotliDecompressedSize(buffer);
    }
    var output_buffer = new Uint8Array(output_size);
    var output = new BrotliOutput(output_buffer);
    BrotliDecompress(input, output);
    if (output.pos < output.buffer.length) {
     output.buffer = output.buffer.subarray(0, output.pos);
    }
    return output.buffer;
   }
   exports.BrotliDecompressBuffer = BrotliDecompressBuffer;
   function BrotliDecompress(input, output) {
    var i;
    var pos = 0;
    var input_end = 0;
    var window_bits = 0;
    var max_backward_distance;
    var max_distance = 0;
    var ringbuffer_size;
    var ringbuffer_mask;
    var ringbuffer;
    var ringbuffer_end;
    var dist_rb = [ 16, 15, 11, 4 ];
    var dist_rb_idx = 0;
    var prev_byte1 = 0;
    var prev_byte2 = 0;
    var hgroup = [ new HuffmanTreeGroup(0, 0), new HuffmanTreeGroup(0, 0), new HuffmanTreeGroup(0, 0) ];
    var block_type_trees;
    var block_len_trees;
    var br;
    var kRingBufferWriteAheadSlack = 128 + BrotliBitReader.READ_SIZE;
    br = new BrotliBitReader(input);
    window_bits = DecodeWindowBits(br);
    max_backward_distance = (1 << window_bits) - 16;
    ringbuffer_size = 1 << window_bits;
    ringbuffer_mask = ringbuffer_size - 1;
    ringbuffer = new Uint8Array(ringbuffer_size + kRingBufferWriteAheadSlack + BrotliDictionary.maxDictionaryWordLength);
    ringbuffer_end = ringbuffer_size;
    block_type_trees = [];
    block_len_trees = [];
    for (var x = 0; x < 3 * HUFFMAN_MAX_TABLE_SIZE; x++) {
     block_type_trees[x] = new HuffmanCode(0, 0);
     block_len_trees[x] = new HuffmanCode(0, 0);
    }
    while (!input_end) {
     var meta_block_remaining_len = 0;
     var is_uncompressed;
     var block_length = [ 1 << 28, 1 << 28, 1 << 28 ];
     var block_type = [ 0 ];
     var num_block_types = [ 1, 1, 1 ];
     var block_type_rb = [ 0, 1, 0, 1, 0, 1 ];
     var block_type_rb_index = [ 0 ];
     var distance_postfix_bits;
     var num_direct_distance_codes;
     var distance_postfix_mask;
     var num_distance_codes;
     var context_map = null;
     var context_modes = null;
     var num_literal_htrees;
     var dist_context_map = null;
     var num_dist_htrees;
     var context_offset = 0;
     var context_map_slice = null;
     var literal_htree_index = 0;
     var dist_context_offset = 0;
     var dist_context_map_slice = null;
     var dist_htree_index = 0;
     var context_lookup_offset1 = 0;
     var context_lookup_offset2 = 0;
     var context_mode;
     var htree_command;
     for (i = 0; i < 3; ++i) {
      hgroup[i].codes = null;
      hgroup[i].htrees = null;
     }
     br.readMoreInput();
     var _out = DecodeMetaBlockLength(br);
     meta_block_remaining_len = _out.meta_block_length;
     if (pos + meta_block_remaining_len > output.buffer.length) {
      var tmp = new Uint8Array(pos + meta_block_remaining_len);
      tmp.set(output.buffer);
      output.buffer = tmp;
     }
     input_end = _out.input_end;
     is_uncompressed = _out.is_uncompressed;
     if (_out.is_metadata) {
      JumpToByteBoundary(br);
      for (;meta_block_remaining_len > 0; --meta_block_remaining_len) {
       br.readMoreInput();
       br.readBits(8);
      }
      continue;
     }
     if (meta_block_remaining_len === 0) {
      continue;
     }
     if (is_uncompressed) {
      br.bit_pos_ = br.bit_pos_ + 7 & ~7;
      CopyUncompressedBlockToOutput(output, meta_block_remaining_len, pos, ringbuffer, ringbuffer_mask, br);
      pos += meta_block_remaining_len;
      continue;
     }
     for (i = 0; i < 3; ++i) {
      num_block_types[i] = DecodeVarLenUint8(br) + 1;
      if (num_block_types[i] >= 2) {
       ReadHuffmanCode(num_block_types[i] + 2, block_type_trees, i * HUFFMAN_MAX_TABLE_SIZE, br);
       ReadHuffmanCode(kNumBlockLengthCodes, block_len_trees, i * HUFFMAN_MAX_TABLE_SIZE, br);
       block_length[i] = ReadBlockLength(block_len_trees, i * HUFFMAN_MAX_TABLE_SIZE, br);
       block_type_rb_index[i] = 1;
      }
     }
     br.readMoreInput();
     distance_postfix_bits = br.readBits(2);
     num_direct_distance_codes = NUM_DISTANCE_SHORT_CODES + (br.readBits(4) << distance_postfix_bits);
     distance_postfix_mask = (1 << distance_postfix_bits) - 1;
     num_distance_codes = num_direct_distance_codes + (48 << distance_postfix_bits);
     context_modes = new Uint8Array(num_block_types[0]);
     for (i = 0; i < num_block_types[0]; ++i) {
      br.readMoreInput();
      context_modes[i] = br.readBits(2) << 1;
     }
     var _o1 = DecodeContextMap(num_block_types[0] << kLiteralContextBits, br);
     num_literal_htrees = _o1.num_htrees;
     context_map = _o1.context_map;
     var _o2 = DecodeContextMap(num_block_types[2] << kDistanceContextBits, br);
     num_dist_htrees = _o2.num_htrees;
     dist_context_map = _o2.context_map;
     hgroup[0] = new HuffmanTreeGroup(kNumLiteralCodes, num_literal_htrees);
     hgroup[1] = new HuffmanTreeGroup(kNumInsertAndCopyCodes, num_block_types[1]);
     hgroup[2] = new HuffmanTreeGroup(num_distance_codes, num_dist_htrees);
     for (i = 0; i < 3; ++i) {
      hgroup[i].decode(br);
     }
     context_map_slice = 0;
     dist_context_map_slice = 0;
     context_mode = context_modes[block_type[0]];
     context_lookup_offset1 = Context.lookupOffsets[context_mode];
     context_lookup_offset2 = Context.lookupOffsets[context_mode + 1];
     htree_command = hgroup[1].htrees[0];
     while (meta_block_remaining_len > 0) {
      var cmd_code;
      var range_idx;
      var insert_code;
      var copy_code;
      var insert_length;
      var copy_length;
      var distance_code;
      var distance;
      var context;
      var j;
      var copy_dst;
      br.readMoreInput();
      if (block_length[1] === 0) {
       DecodeBlockType(num_block_types[1], block_type_trees, 1, block_type, block_type_rb, block_type_rb_index, br);
       block_length[1] = ReadBlockLength(block_len_trees, HUFFMAN_MAX_TABLE_SIZE, br);
       htree_command = hgroup[1].htrees[block_type[1]];
      }
      --block_length[1];
      cmd_code = ReadSymbol(hgroup[1].codes, htree_command, br);
      range_idx = cmd_code >> 6;
      if (range_idx >= 2) {
       range_idx -= 2;
       distance_code = -1;
      } else {
       distance_code = 0;
      }
      insert_code = Prefix.kInsertRangeLut[range_idx] + (cmd_code >> 3 & 7);
      copy_code = Prefix.kCopyRangeLut[range_idx] + (cmd_code & 7);
      insert_length = Prefix.kInsertLengthPrefixCode[insert_code].offset + br.readBits(Prefix.kInsertLengthPrefixCode[insert_code].nbits);
      copy_length = Prefix.kCopyLengthPrefixCode[copy_code].offset + br.readBits(Prefix.kCopyLengthPrefixCode[copy_code].nbits);
      prev_byte1 = ringbuffer[pos - 1 & ringbuffer_mask];
      prev_byte2 = ringbuffer[pos - 2 & ringbuffer_mask];
      for (j = 0; j < insert_length; ++j) {
       br.readMoreInput();
       if (block_length[0] === 0) {
        DecodeBlockType(num_block_types[0], block_type_trees, 0, block_type, block_type_rb, block_type_rb_index, br);
        block_length[0] = ReadBlockLength(block_len_trees, 0, br);
        context_offset = block_type[0] << kLiteralContextBits;
        context_map_slice = context_offset;
        context_mode = context_modes[block_type[0]];
        context_lookup_offset1 = Context.lookupOffsets[context_mode];
        context_lookup_offset2 = Context.lookupOffsets[context_mode + 1];
       }
       context = Context.lookup[context_lookup_offset1 + prev_byte1] | Context.lookup[context_lookup_offset2 + prev_byte2];
       literal_htree_index = context_map[context_map_slice + context];
       --block_length[0];
       prev_byte2 = prev_byte1;
       prev_byte1 = ReadSymbol(hgroup[0].codes, hgroup[0].htrees[literal_htree_index], br);
       ringbuffer[pos & ringbuffer_mask] = prev_byte1;
       if ((pos & ringbuffer_mask) === ringbuffer_mask) {
        output.write(ringbuffer, ringbuffer_size);
       }
       ++pos;
      }
      meta_block_remaining_len -= insert_length;
      if (meta_block_remaining_len <= 0) break;
      if (distance_code < 0) {
       var context;
       br.readMoreInput();
       if (block_length[2] === 0) {
        DecodeBlockType(num_block_types[2], block_type_trees, 2, block_type, block_type_rb, block_type_rb_index, br);
        block_length[2] = ReadBlockLength(block_len_trees, 2 * HUFFMAN_MAX_TABLE_SIZE, br);
        dist_context_offset = block_type[2] << kDistanceContextBits;
        dist_context_map_slice = dist_context_offset;
       }
       --block_length[2];
       context = (copy_length > 4 ? 3 : copy_length - 2) & 255;
       dist_htree_index = dist_context_map[dist_context_map_slice + context];
       distance_code = ReadSymbol(hgroup[2].codes, hgroup[2].htrees[dist_htree_index], br);
       if (distance_code >= num_direct_distance_codes) {
        var nbits;
        var postfix;
        var offset;
        distance_code -= num_direct_distance_codes;
        postfix = distance_code & distance_postfix_mask;
        distance_code >>= distance_postfix_bits;
        nbits = (distance_code >> 1) + 1;
        offset = (2 + (distance_code & 1) << nbits) - 4;
        distance_code = num_direct_distance_codes + (offset + br.readBits(nbits) << distance_postfix_bits) + postfix;
       }
      }
      distance = TranslateShortCodes(distance_code, dist_rb, dist_rb_idx);
      if (distance < 0) {
       throw new Error("[BrotliDecompress] invalid distance");
      }
      if (pos < max_backward_distance && max_distance !== max_backward_distance) {
       max_distance = pos;
      } else {
       max_distance = max_backward_distance;
      }
      copy_dst = pos & ringbuffer_mask;
      if (distance > max_distance) {
       if (copy_length >= BrotliDictionary.minDictionaryWordLength && copy_length <= BrotliDictionary.maxDictionaryWordLength) {
        var offset = BrotliDictionary.offsetsByLength[copy_length];
        var word_id = distance - max_distance - 1;
        var shift = BrotliDictionary.sizeBitsByLength[copy_length];
        var mask = (1 << shift) - 1;
        var word_idx = word_id & mask;
        var transform_idx = word_id >> shift;
        offset += word_idx * copy_length;
        if (transform_idx < Transform.kNumTransforms) {
         var len = Transform.transformDictionaryWord(ringbuffer, copy_dst, offset, copy_length, transform_idx);
         copy_dst += len;
         pos += len;
         meta_block_remaining_len -= len;
         if (copy_dst >= ringbuffer_end) {
          output.write(ringbuffer, ringbuffer_size);
          for (var _x = 0; _x < copy_dst - ringbuffer_end; _x++) ringbuffer[_x] = ringbuffer[ringbuffer_end + _x];
         }
        } else {
         throw new Error("Invalid backward reference. pos: " + pos + " distance: " + distance + " len: " + copy_length + " bytes left: " + meta_block_remaining_len);
        }
       } else {
        throw new Error("Invalid backward reference. pos: " + pos + " distance: " + distance + " len: " + copy_length + " bytes left: " + meta_block_remaining_len);
       }
      } else {
       if (distance_code > 0) {
        dist_rb[dist_rb_idx & 3] = distance;
        ++dist_rb_idx;
       }
       if (copy_length > meta_block_remaining_len) {
        throw new Error("Invalid backward reference. pos: " + pos + " distance: " + distance + " len: " + copy_length + " bytes left: " + meta_block_remaining_len);
       }
       for (j = 0; j < copy_length; ++j) {
        ringbuffer[pos & ringbuffer_mask] = ringbuffer[pos - distance & ringbuffer_mask];
        if ((pos & ringbuffer_mask) === ringbuffer_mask) {
         output.write(ringbuffer, ringbuffer_size);
        }
        ++pos;
        --meta_block_remaining_len;
       }
      }
      prev_byte1 = ringbuffer[pos - 1 & ringbuffer_mask];
      prev_byte2 = ringbuffer[pos - 2 & ringbuffer_mask];
     }
     pos &= 1073741823;
    }
    output.write(ringbuffer, pos & ringbuffer_mask);
   }
   exports.BrotliDecompress = BrotliDecompress;
   BrotliDictionary.init();
  }, {
   "./bit_reader": 1,
   "./context": 2,
   "./dictionary": 6,
   "./huffman": 7,
   "./prefix": 8,
   "./streams": 9,
   "./transform": 10
  } ],
  4: [ function(require, module, exports) {
   var base64 = require("base64-js");
   exports.init = function() {
    var BrotliDecompressBuffer = require("./decode").BrotliDecompressBuffer;
    var compressed = base64.toByteArray(require("./dictionary.bin.js"));
    return BrotliDecompressBuffer(compressed);
   };
  }, {
   "./decode": 3,
   "./dictionary.bin.js": 5,
   "base64-js": 12
  } ],
  5: [ function(require, module, exports) {
   module.exports = "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";
  }, {} ],
  6: [ function(require, module, exports) {
   var data = require("./dictionary-browser");
   exports.init = function() {
    exports.dictionary = data.init();
   };
   exports.offsetsByLength = new Uint32Array([ 0, 0, 0, 0, 0, 4096, 9216, 21504, 35840, 44032, 53248, 63488, 74752, 87040, 93696, 100864, 104704, 106752, 108928, 113536, 115968, 118528, 119872, 121280, 122016 ]);
   exports.sizeBitsByLength = new Uint8Array([ 0, 0, 0, 0, 10, 10, 11, 11, 10, 10, 10, 10, 10, 9, 9, 8, 7, 7, 8, 7, 7, 6, 6, 5, 5 ]);
   exports.minDictionaryWordLength = 4;
   exports.maxDictionaryWordLength = 24;
  }, {
   "./dictionary-browser": 4
  } ],
  7: [ function(require, module, exports) {
   function HuffmanCode(bits, value) {
    this.bits = bits;
    this.value = value;
   }
   exports.HuffmanCode = HuffmanCode;
   var MAX_LENGTH = 15;
   function GetNextKey(key, len) {
    var step = 1 << len - 1;
    while (key & step) {
     step >>= 1;
    }
    return (key & step - 1) + step;
   }
   function ReplicateValue(table, i, step, end, code) {
    do {
     end -= step;
     table[i + end] = new HuffmanCode(code.bits, code.value);
    } while (end > 0);
   }
   function NextTableBitSize(count, len, root_bits) {
    var left = 1 << len - root_bits;
    while (len < MAX_LENGTH) {
     left -= count[len];
     if (left <= 0) break;
     ++len;
     left <<= 1;
    }
    return len - root_bits;
   }
   exports.BrotliBuildHuffmanTable = function(root_table, table, root_bits, code_lengths, code_lengths_size) {
    var start_table = table;
    var code;
    var len;
    var symbol;
    var key;
    var step;
    var low;
    var mask;
    var table_bits;
    var table_size;
    var total_size;
    var sorted;
    var count = new Int32Array(MAX_LENGTH + 1);
    var offset = new Int32Array(MAX_LENGTH + 1);
    sorted = new Int32Array(code_lengths_size);
    for (symbol = 0; symbol < code_lengths_size; symbol++) {
     count[code_lengths[symbol]]++;
    }
    offset[1] = 0;
    for (len = 1; len < MAX_LENGTH; len++) {
     offset[len + 1] = offset[len] + count[len];
    }
    for (symbol = 0; symbol < code_lengths_size; symbol++) {
     if (code_lengths[symbol] !== 0) {
      sorted[offset[code_lengths[symbol]]++] = symbol;
     }
    }
    table_bits = root_bits;
    table_size = 1 << table_bits;
    total_size = table_size;
    if (offset[MAX_LENGTH] === 1) {
     for (key = 0; key < total_size; ++key) {
      root_table[table + key] = new HuffmanCode(0, sorted[0] & 65535);
     }
     return total_size;
    }
    key = 0;
    symbol = 0;
    for (len = 1, step = 2; len <= root_bits; ++len, step <<= 1) {
     for (;count[len] > 0; --count[len]) {
      code = new HuffmanCode(len & 255, sorted[symbol++] & 65535);
      ReplicateValue(root_table, table + key, step, table_size, code);
      key = GetNextKey(key, len);
     }
    }
    mask = total_size - 1;
    low = -1;
    for (len = root_bits + 1, step = 2; len <= MAX_LENGTH; ++len, step <<= 1) {
     for (;count[len] > 0; --count[len]) {
      if ((key & mask) !== low) {
       table += table_size;
       table_bits = NextTableBitSize(count, len, root_bits);
       table_size = 1 << table_bits;
       total_size += table_size;
       low = key & mask;
       root_table[start_table + low] = new HuffmanCode(table_bits + root_bits & 255, table - start_table - low & 65535);
      }
      code = new HuffmanCode(len - root_bits & 255, sorted[symbol++] & 65535);
      ReplicateValue(root_table, table + (key >> root_bits), step, table_size, code);
      key = GetNextKey(key, len);
     }
    }
    return total_size;
   };
  }, {} ],
  8: [ function(require, module, exports) {
   function PrefixCodeRange(offset, nbits) {
    this.offset = offset;
    this.nbits = nbits;
   }
   exports.kBlockLengthPrefixCode = [ new PrefixCodeRange(1, 2), new PrefixCodeRange(5, 2), new PrefixCodeRange(9, 2), new PrefixCodeRange(13, 2), new PrefixCodeRange(17, 3), new PrefixCodeRange(25, 3), new PrefixCodeRange(33, 3), new PrefixCodeRange(41, 3), new PrefixCodeRange(49, 4), new PrefixCodeRange(65, 4), new PrefixCodeRange(81, 4), new PrefixCodeRange(97, 4), new PrefixCodeRange(113, 5), new PrefixCodeRange(145, 5), new PrefixCodeRange(177, 5), new PrefixCodeRange(209, 5), new PrefixCodeRange(241, 6), new PrefixCodeRange(305, 6), new PrefixCodeRange(369, 7), new PrefixCodeRange(497, 8), new PrefixCodeRange(753, 9), new PrefixCodeRange(1265, 10), new PrefixCodeRange(2289, 11), new PrefixCodeRange(4337, 12), new PrefixCodeRange(8433, 13), new PrefixCodeRange(16625, 24) ];
   exports.kInsertLengthPrefixCode = [ new PrefixCodeRange(0, 0), new PrefixCodeRange(1, 0), new PrefixCodeRange(2, 0), new PrefixCodeRange(3, 0), new PrefixCodeRange(4, 0), new PrefixCodeRange(5, 0), new PrefixCodeRange(6, 1), new PrefixCodeRange(8, 1), new PrefixCodeRange(10, 2), new PrefixCodeRange(14, 2), new PrefixCodeRange(18, 3), new PrefixCodeRange(26, 3), new PrefixCodeRange(34, 4), new PrefixCodeRange(50, 4), new PrefixCodeRange(66, 5), new PrefixCodeRange(98, 5), new PrefixCodeRange(130, 6), new PrefixCodeRange(194, 7), new PrefixCodeRange(322, 8), new PrefixCodeRange(578, 9), new PrefixCodeRange(1090, 10), new PrefixCodeRange(2114, 12), new PrefixCodeRange(6210, 14), new PrefixCodeRange(22594, 24) ];
   exports.kCopyLengthPrefixCode = [ new PrefixCodeRange(2, 0), new PrefixCodeRange(3, 0), new PrefixCodeRange(4, 0), new PrefixCodeRange(5, 0), new PrefixCodeRange(6, 0), new PrefixCodeRange(7, 0), new PrefixCodeRange(8, 0), new PrefixCodeRange(9, 0), new PrefixCodeRange(10, 1), new PrefixCodeRange(12, 1), new PrefixCodeRange(14, 2), new PrefixCodeRange(18, 2), new PrefixCodeRange(22, 3), new PrefixCodeRange(30, 3), new PrefixCodeRange(38, 4), new PrefixCodeRange(54, 4), new PrefixCodeRange(70, 5), new PrefixCodeRange(102, 5), new PrefixCodeRange(134, 6), new PrefixCodeRange(198, 7), new PrefixCodeRange(326, 8), new PrefixCodeRange(582, 9), new PrefixCodeRange(1094, 10), new PrefixCodeRange(2118, 24) ];
   exports.kInsertRangeLut = [ 0, 0, 8, 8, 0, 16, 8, 16, 16 ];
   exports.kCopyRangeLut = [ 0, 8, 0, 8, 16, 0, 16, 8, 16 ];
  }, {} ],
  9: [ function(require, module, exports) {
   function BrotliInput(buffer) {
    this.buffer = buffer;
    this.pos = 0;
   }
   BrotliInput.prototype.read = function(buf, i, count) {
    if (this.pos + count > this.buffer.length) {
     count = this.buffer.length - this.pos;
    }
    for (var p = 0; p < count; p++) buf[i + p] = this.buffer[this.pos + p];
    this.pos += count;
    return count;
   };
   exports.BrotliInput = BrotliInput;
   function BrotliOutput(buf) {
    this.buffer = buf;
    this.pos = 0;
   }
   BrotliOutput.prototype.write = function(buf, count) {
    if (this.pos + count > this.buffer.length) throw new Error("Output buffer is not large enough");
    this.buffer.set(buf.subarray(0, count), this.pos);
    this.pos += count;
    return count;
   };
   exports.BrotliOutput = BrotliOutput;
  }, {} ],
  10: [ function(require, module, exports) {
   var BrotliDictionary = require("./dictionary");
   var kIdentity = 0;
   var kOmitLast1 = 1;
   var kOmitLast2 = 2;
   var kOmitLast3 = 3;
   var kOmitLast4 = 4;
   var kOmitLast5 = 5;
   var kOmitLast6 = 6;
   var kOmitLast7 = 7;
   var kOmitLast8 = 8;
   var kOmitLast9 = 9;
   var kUppercaseFirst = 10;
   var kUppercaseAll = 11;
   var kOmitFirst1 = 12;
   var kOmitFirst2 = 13;
   var kOmitFirst3 = 14;
   var kOmitFirst4 = 15;
   var kOmitFirst5 = 16;
   var kOmitFirst6 = 17;
   var kOmitFirst7 = 18;
   var kOmitFirst9 = 20;
   function Transform(prefix, transform, suffix) {
    this.prefix = new Uint8Array(prefix.length);
    this.transform = transform;
    this.suffix = new Uint8Array(suffix.length);
    for (var i = 0; i < prefix.length; i++) this.prefix[i] = prefix.charCodeAt(i);
    for (var i = 0; i < suffix.length; i++) this.suffix[i] = suffix.charCodeAt(i);
   }
   var kTransforms = [ new Transform("", kIdentity, ""), new Transform("", kIdentity, " "), new Transform(" ", kIdentity, " "), new Transform("", kOmitFirst1, ""), new Transform("", kUppercaseFirst, " "), new Transform("", kIdentity, " the "), new Transform(" ", kIdentity, ""), new Transform("s ", kIdentity, " "), new Transform("", kIdentity, " of "), new Transform("", kUppercaseFirst, ""), new Transform("", kIdentity, " and "), new Transform("", kOmitFirst2, ""), new Transform("", kOmitLast1, ""), new Transform(", ", kIdentity, " "), new Transform("", kIdentity, ", "), new Transform(" ", kUppercaseFirst, " "), new Transform("", kIdentity, " in "), new Transform("", kIdentity, " to "), new Transform("e ", kIdentity, " "), new Transform("", kIdentity, '"'), new Transform("", kIdentity, "."), new Transform("", kIdentity, '">'), new Transform("", kIdentity, "\n"), new Transform("", kOmitLast3, ""), new Transform("", kIdentity, "]"), new Transform("", kIdentity, " for "), new Transform("", kOmitFirst3, ""), new Transform("", kOmitLast2, ""), new Transform("", kIdentity, " a "), new Transform("", kIdentity, " that "), new Transform(" ", kUppercaseFirst, ""), new Transform("", kIdentity, ". "), new Transform(".", kIdentity, ""), new Transform(" ", kIdentity, ", "), new Transform("", kOmitFirst4, ""), new Transform("", kIdentity, " with "), new Transform("", kIdentity, "'"), new Transform("", kIdentity, " from "), new Transform("", kIdentity, " by "), new Transform("", kOmitFirst5, ""), new Transform("", kOmitFirst6, ""), new Transform(" the ", kIdentity, ""), new Transform("", kOmitLast4, ""), new Transform("", kIdentity, ". The "), new Transform("", kUppercaseAll, ""), new Transform("", kIdentity, " on "), new Transform("", kIdentity, " as "), new Transform("", kIdentity, " is "), new Transform("", kOmitLast7, ""), new Transform("", kOmitLast1, "ing "), new Transform("", kIdentity, "\n\t"), new Transform("", kIdentity, ":"), new Transform(" ", kIdentity, ". "), new Transform("", kIdentity, "ed "), new Transform("", kOmitFirst9, ""), new Transform("", kOmitFirst7, ""), new Transform("", kOmitLast6, ""), new Transform("", kIdentity, "("), new Transform("", kUppercaseFirst, ", "), new Transform("", kOmitLast8, ""), new Transform("", kIdentity, " at "), new Transform("", kIdentity, "ly "), new Transform(" the ", kIdentity, " of "), new Transform("", kOmitLast5, ""), new Transform("", kOmitLast9, ""), new Transform(" ", kUppercaseFirst, ", "), new Transform("", kUppercaseFirst, '"'), new Transform(".", kIdentity, "("), new Transform("", kUppercaseAll, " "), new Transform("", kUppercaseFirst, '">'), new Transform("", kIdentity, '="'), new Transform(" ", kIdentity, "."), new Transform(".com/", kIdentity, ""), new Transform(" the ", kIdentity, " of the "), new Transform("", kUppercaseFirst, "'"), new Transform("", kIdentity, ". This "), new Transform("", kIdentity, ","), new Transform(".", kIdentity, " "), new Transform("", kUppercaseFirst, "("), new Transform("", kUppercaseFirst, "."), new Transform("", kIdentity, " not "), new Transform(" ", kIdentity, '="'), new Transform("", kIdentity, "er "), new Transform(" ", kUppercaseAll, " "), new Transform("", kIdentity, "al "), new Transform(" ", kUppercaseAll, ""), new Transform("", kIdentity, "='"), new Transform("", kUppercaseAll, '"'), new Transform("", kUppercaseFirst, ". "), new Transform(" ", kIdentity, "("), new Transform("", kIdentity, "ful "), new Transform(" ", kUppercaseFirst, ". "), new Transform("", kIdentity, "ive "), new Transform("", kIdentity, "less "), new Transform("", kUppercaseAll, "'"), new Transform("", kIdentity, "est "), new Transform(" ", kUppercaseFirst, "."), new Transform("", kUppercaseAll, '">'), new Transform(" ", kIdentity, "='"), new Transform("", kUppercaseFirst, ","), new Transform("", kIdentity, "ize "), new Transform("", kUppercaseAll, "."), new Transform("Â ", kIdentity, ""), new Transform(" ", kIdentity, ","), new Transform("", kUppercaseFirst, '="'), new Transform("", kUppercaseAll, '="'), new Transform("", kIdentity, "ous "), new Transform("", kUppercaseAll, ", "), new Transform("", kUppercaseFirst, "='"), new Transform(" ", kUppercaseFirst, ","), new Transform(" ", kUppercaseAll, '="'), new Transform(" ", kUppercaseAll, ", "), new Transform("", kUppercaseAll, ","), new Transform("", kUppercaseAll, "("), new Transform("", kUppercaseAll, ". "), new Transform(" ", kUppercaseAll, "."), new Transform("", kUppercaseAll, "='"), new Transform(" ", kUppercaseAll, ". "), new Transform(" ", kUppercaseFirst, '="'), new Transform(" ", kUppercaseAll, "='"), new Transform(" ", kUppercaseFirst, "='") ];
   exports.kTransforms = kTransforms;
   exports.kNumTransforms = kTransforms.length;
   function ToUpperCase(p, i) {
    if (p[i] < 192) {
     if (p[i] >= 97 && p[i] <= 122) {
      p[i] ^= 32;
     }
     return 1;
    }
    if (p[i] < 224) {
     p[i + 1] ^= 32;
     return 2;
    }
    p[i + 2] ^= 5;
    return 3;
   }
   exports.transformDictionaryWord = function(dst, idx, word, len, transform) {
    var prefix = kTransforms[transform].prefix;
    var suffix = kTransforms[transform].suffix;
    var t = kTransforms[transform].transform;
    var skip = t < kOmitFirst1 ? 0 : t - (kOmitFirst1 - 1);
    var i = 0;
    var start_idx = idx;
    var uppercase;
    if (skip > len) {
     skip = len;
    }
    var prefix_pos = 0;
    while (prefix_pos < prefix.length) {
     dst[idx++] = prefix[prefix_pos++];
    }
    word += skip;
    len -= skip;
    if (t <= kOmitLast9) {
     len -= t;
    }
    for (i = 0; i < len; i++) {
     dst[idx++] = BrotliDictionary.dictionary[word + i];
    }
    uppercase = idx - len;
    if (t === kUppercaseFirst) {
     ToUpperCase(dst, uppercase);
    } else if (t === kUppercaseAll) {
     while (len > 0) {
      var step = ToUpperCase(dst, uppercase);
      uppercase += step;
      len -= step;
     }
    }
    var suffix_pos = 0;
    while (suffix_pos < suffix.length) {
     dst[idx++] = suffix[suffix_pos++];
    }
    return idx - start_idx;
   };
  }, {
   "./dictionary": 6
  } ],
  11: [ function(require, module, exports) {
   Module["BrotliDecode"] = require("./dec/decode").BrotliDecompressBuffer;
  }, {
   "./dec/decode": 3
  } ],
  12: [ function(require, module, exports) {
   "use strict";
   exports.byteLength = byteLength;
   exports.toByteArray = toByteArray;
   exports.fromByteArray = fromByteArray;
   var lookup = [];
   var revLookup = [];
   var Arr = typeof Uint8Array !== "undefined" ? Uint8Array : Array;
   var code = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
   for (var i = 0, len = code.length; i < len; ++i) {
    lookup[i] = code[i];
    revLookup[code.charCodeAt(i)] = i;
   }
   revLookup["-".charCodeAt(0)] = 62;
   revLookup["_".charCodeAt(0)] = 63;
   function getLens(b64) {
    var len = b64.length;
    if (len % 4 > 0) {
     throw new Error("Invalid string. Length must be a multiple of 4");
    }
    var validLen = b64.indexOf("=");
    if (validLen === -1) validLen = len;
    var placeHoldersLen = validLen === len ? 0 : 4 - validLen % 4;
    return [ validLen, placeHoldersLen ];
   }
   function byteLength(b64) {
    var lens = getLens(b64);
    var validLen = lens[0];
    var placeHoldersLen = lens[1];
    return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
   }
   function _byteLength(b64, validLen, placeHoldersLen) {
    return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
   }
   function toByteArray(b64) {
    var tmp;
    var lens = getLens(b64);
    var validLen = lens[0];
    var placeHoldersLen = lens[1];
    var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen));
    var curByte = 0;
    var len = placeHoldersLen > 0 ? validLen - 4 : validLen;
    var i;
    for (i = 0; i < len; i += 4) {
     tmp = revLookup[b64.charCodeAt(i)] << 18 | revLookup[b64.charCodeAt(i + 1)] << 12 | revLookup[b64.charCodeAt(i + 2)] << 6 | revLookup[b64.charCodeAt(i + 3)];
     arr[curByte++] = tmp >> 16 & 255;
     arr[curByte++] = tmp >> 8 & 255;
     arr[curByte++] = tmp & 255;
    }
    if (placeHoldersLen === 2) {
     tmp = revLookup[b64.charCodeAt(i)] << 2 | revLookup[b64.charCodeAt(i + 1)] >> 4;
     arr[curByte++] = tmp & 255;
    }
    if (placeHoldersLen === 1) {
     tmp = revLookup[b64.charCodeAt(i)] << 10 | revLookup[b64.charCodeAt(i + 1)] << 4 | revLookup[b64.charCodeAt(i + 2)] >> 2;
     arr[curByte++] = tmp >> 8 & 255;
     arr[curByte++] = tmp & 255;
    }
    return arr;
   }
   function tripletToBase64(num) {
    return lookup[num >> 18 & 63] + lookup[num >> 12 & 63] + lookup[num >> 6 & 63] + lookup[num & 63];
   }
   function encodeChunk(uint8, start, end) {
    var tmp;
    var output = [];
    for (var i = start; i < end; i += 3) {
     tmp = (uint8[i] << 16 & 16711680) + (uint8[i + 1] << 8 & 65280) + (uint8[i + 2] & 255);
     output.push(tripletToBase64(tmp));
    }
    return output.join("");
   }
   function fromByteArray(uint8) {
    var tmp;
    var len = uint8.length;
    var extraBytes = len % 3;
    var parts = [];
    var maxChunkLength = 16383;
    for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
     parts.push(encodeChunk(uint8, i, i + maxChunkLength > len2 ? len2 : i + maxChunkLength));
    }
    if (extraBytes === 1) {
     tmp = uint8[len - 1];
     parts.push(lookup[tmp >> 2] + lookup[tmp << 4 & 63] + "==");
    } else if (extraBytes === 2) {
     tmp = (uint8[len - 2] << 8) + uint8[len - 1];
     parts.push(lookup[tmp >> 10] + lookup[tmp >> 4 & 63] + lookup[tmp << 2 & 63] + "=");
    }
    return parts.join("");
   }
  }, {} ]
 }, {}, [ 11 ])(11);
});

var moduleOverrides = {};

var key;

for (key in Module) {
 if (Module.hasOwnProperty(key)) {
  moduleOverrides[key] = Module[key];
 }
}

var arguments_ = [];

var thisProgram = "./this.program";

var quit_ = function(status, toThrow) {
 throw toThrow;
};

var ENVIRONMENT_IS_WEB = false;

var ENVIRONMENT_IS_WORKER = false;

var ENVIRONMENT_IS_NODE = false;

var ENVIRONMENT_IS_SHELL = false;

ENVIRONMENT_IS_WEB = typeof window === "object";

ENVIRONMENT_IS_WORKER = typeof importScripts === "function";

ENVIRONMENT_IS_NODE = typeof process === "object" && typeof process.versions === "object" && typeof process.versions.node === "string";

ENVIRONMENT_IS_SHELL = !ENVIRONMENT_IS_WEB && !ENVIRONMENT_IS_NODE && !ENVIRONMENT_IS_WORKER;

var scriptDirectory = "";

function locateFile(path) {
 if (Module["locateFile"]) {
  return Module["locateFile"](path, scriptDirectory);
 }
 return scriptDirectory + path;
}

var read_, readAsync, readBinary, setWindowTitle;

var nodeFS;

var nodePath;

if (ENVIRONMENT_IS_NODE) {
 if (ENVIRONMENT_IS_WORKER) {
  scriptDirectory = require("path").dirname(scriptDirectory) + "/";
 } else {
  scriptDirectory = __dirname + "/";
 }
 read_ = function shell_read(filename, binary) {
  if (!nodeFS) nodeFS = require("fs");
  if (!nodePath) nodePath = require("path");
  filename = nodePath["normalize"](filename);
  return nodeFS["readFileSync"](filename, binary ? null : "utf8");
 };
 readBinary = function readBinary(filename) {
  var ret = read_(filename, true);
  if (!ret.buffer) {
   ret = new Uint8Array(ret);
  }
  assert(ret.buffer);
  return ret;
 };
 if (process["argv"].length > 1) {
  thisProgram = process["argv"][1].replace(/\\/g, "/");
 }
 arguments_ = process["argv"].slice(2);
 if (typeof module !== "undefined") {
  module["exports"] = Module;
 }
 process["on"]("uncaughtException", function(ex) {
  if (!(ex instanceof ExitStatus)) {
   throw ex;
  }
 });
 process["on"]("unhandledRejection", abort);
 quit_ = function(status) {
  process["exit"](status);
 };
 Module["inspect"] = function() {
  return "[Emscripten Module object]";
 };
} else if (ENVIRONMENT_IS_SHELL) {
 if (typeof read != "undefined") {
  read_ = function shell_read(f) {
   return read(f);
  };
 }
 readBinary = function readBinary(f) {
  var data;
  if (typeof readbuffer === "function") {
   return new Uint8Array(readbuffer(f));
  }
  data = read(f, "binary");
  assert(typeof data === "object");
  return data;
 };
 if (typeof scriptArgs != "undefined") {
  arguments_ = scriptArgs;
 } else if (typeof arguments != "undefined") {
  arguments_ = arguments;
 }
 if (typeof quit === "function") {
  quit_ = function(status) {
   quit(status);
  };
 }
 if (typeof print !== "undefined") {
  if (typeof console === "undefined") console = {};
  console.log = print;
  console.warn = console.error = typeof printErr !== "undefined" ? printErr : print;
 }
} else if (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER) {
 if (ENVIRONMENT_IS_WORKER) {
  scriptDirectory = self.location.href;
 } else if (document.currentScript) {
  scriptDirectory = document.currentScript.src;
 }
 if (scriptDirectory.indexOf("blob:") !== 0) {
  scriptDirectory = scriptDirectory.substr(0, scriptDirectory.lastIndexOf("/") + 1);
 } else {
  scriptDirectory = "";
 }
 {
  read_ = function shell_read(url) {
   var xhr = new XMLHttpRequest();
   xhr.open("GET", url, false);
   xhr.send(null);
   return xhr.responseText;
  };
  if (ENVIRONMENT_IS_WORKER) {
   readBinary = function readBinary(url) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, false);
    xhr.responseType = "arraybuffer";
    xhr.send(null);
    return new Uint8Array(xhr.response);
   };
  }
  readAsync = function readAsync(url, onload, onerror) {
   var xhr = new XMLHttpRequest();
   xhr.open("GET", url, true);
   xhr.responseType = "arraybuffer";
   xhr.onload = function xhr_onload() {
    if (xhr.status == 200 || xhr.status == 0 && xhr.response) {
     onload(xhr.response);
     return;
    }
    onerror();
   };
   xhr.onerror = onerror;
   xhr.send(null);
  };
 }
 setWindowTitle = function(title) {
  document.title = title;
 };
} else {}

var out = Module["print"] || console.log.bind(console);

var err = Module["printErr"] || console.warn.bind(console);

for (key in moduleOverrides) {
 if (moduleOverrides.hasOwnProperty(key)) {
  Module[key] = moduleOverrides[key];
 }
}

moduleOverrides = null;

if (Module["arguments"]) arguments_ = Module["arguments"];

if (Module["thisProgram"]) thisProgram = Module["thisProgram"];

if (Module["quit"]) quit_ = Module["quit"];

var STACK_ALIGN = 16;

function dynamicAlloc(size) {
 var ret = HEAP32[DYNAMICTOP_PTR >> 2];
 var end = ret + size + 15 & -16;
 HEAP32[DYNAMICTOP_PTR >> 2] = end;
 return ret;
}

function getNativeTypeSize(type) {
 switch (type) {
 case "i1":
 case "i8":
  return 1;

 case "i16":
  return 2;

 case "i32":
  return 4;

 case "i64":
  return 8;

 case "float":
  return 4;

 case "double":
  return 8;

 default:
  {
   if (type[type.length - 1] === "*") {
    return 4;
   } else if (type[0] === "i") {
    var bits = Number(type.substr(1));
    assert(bits % 8 === 0, "getNativeTypeSize invalid bits " + bits + ", type " + type);
    return bits / 8;
   } else {
    return 0;
   }
  }
 }
}

function warnOnce(text) {
 if (!warnOnce.shown) warnOnce.shown = {};
 if (!warnOnce.shown[text]) {
  warnOnce.shown[text] = 1;
  err(text);
 }
}

function convertJsFunctionToWasm(func, sig) {
 if (typeof WebAssembly.Function === "function") {
  var typeNames = {
   "i": "i32",
   "j": "i64",
   "f": "f32",
   "d": "f64"
  };
  var type = {
   parameters: [],
   results: sig[0] == "v" ? [] : [ typeNames[sig[0]] ]
  };
  for (var i = 1; i < sig.length; ++i) {
   type.parameters.push(typeNames[sig[i]]);
  }
  return new WebAssembly.Function(type, func);
 }
 var typeSection = [ 1, 0, 1, 96 ];
 var sigRet = sig.slice(0, 1);
 var sigParam = sig.slice(1);
 var typeCodes = {
  "i": 127,
  "j": 126,
  "f": 125,
  "d": 124
 };
 typeSection.push(sigParam.length);
 for (var i = 0; i < sigParam.length; ++i) {
  typeSection.push(typeCodes[sigParam[i]]);
 }
 if (sigRet == "v") {
  typeSection.push(0);
 } else {
  typeSection = typeSection.concat([ 1, typeCodes[sigRet] ]);
 }
 typeSection[1] = typeSection.length - 2;
 var bytes = new Uint8Array([ 0, 97, 115, 109, 1, 0, 0, 0 ].concat(typeSection, [ 2, 7, 1, 1, 101, 1, 102, 0, 0, 7, 5, 1, 1, 102, 0, 0 ]));
 var module = new WebAssembly.Module(bytes);
 var instance = new WebAssembly.Instance(module, {
  "e": {
   "f": func
  }
 });
 var wrappedFunc = instance.exports["f"];
 return wrappedFunc;
}

var freeTableIndexes = [];

function addFunctionWasm(func, sig) {
 var table = wasmTable;
 var ret;
 if (freeTableIndexes.length) {
  ret = freeTableIndexes.pop();
 } else {
  ret = table.length;
  try {
   table.grow(1);
  } catch (err) {
   if (!(err instanceof RangeError)) {
    throw err;
   }
   throw "Unable to grow wasm table. Set ALLOW_TABLE_GROWTH.";
  }
 }
 try {
  table.set(ret, func);
 } catch (err) {
  if (!(err instanceof TypeError)) {
   throw err;
  }
  assert(typeof sig !== "undefined", "Missing signature argument to addFunction");
  var wrapped = convertJsFunctionToWasm(func, sig);
  table.set(ret, wrapped);
 }
 return ret;
}

function removeFunctionWasm(index) {
 freeTableIndexes.push(index);
}

var funcWrappers = {};

function dynCall(sig, ptr, args) {
 if (args && args.length) {
  return Module["dynCall_" + sig].apply(null, [ ptr ].concat(args));
 } else {
  return Module["dynCall_" + sig].call(null, ptr);
 }
}

var tempRet0 = 0;

var setTempRet0 = function(value) {
 tempRet0 = value;
};

var getTempRet0 = function() {
 return tempRet0;
};

var wasmBinary;

if (Module["wasmBinary"]) wasmBinary = Module["wasmBinary"];

var noExitRuntime;

if (Module["noExitRuntime"]) noExitRuntime = Module["noExitRuntime"];

if (typeof WebAssembly !== "object") {
 err("no native wasm support detected");
}

function setValue(ptr, value, type, noSafe) {
 type = type || "i8";
 if (type.charAt(type.length - 1) === "*") type = "i32";
 switch (type) {
 case "i1":
  HEAP8[ptr >> 0] = value;
  break;

 case "i8":
  HEAP8[ptr >> 0] = value;
  break;

 case "i16":
  HEAP16[ptr >> 1] = value;
  break;

 case "i32":
  HEAP32[ptr >> 2] = value;
  break;

 case "i64":
  tempI64 = [ value >>> 0, (tempDouble = value, +Math_abs(tempDouble) >= 1 ? tempDouble > 0 ? (Math_min(+Math_floor(tempDouble / 4294967296), 4294967295) | 0) >>> 0 : ~~+Math_ceil((tempDouble - +(~~tempDouble >>> 0)) / 4294967296) >>> 0 : 0) ], 
  HEAP32[ptr >> 2] = tempI64[0], HEAP32[ptr + 4 >> 2] = tempI64[1];
  break;

 case "float":
  HEAPF32[ptr >> 2] = value;
  break;

 case "double":
  HEAPF64[ptr >> 3] = value;
  break;

 default:
  abort("invalid type for setValue: " + type);
 }
}

function getValue(ptr, type, noSafe) {
 type = type || "i8";
 if (type.charAt(type.length - 1) === "*") type = "i32";
 switch (type) {
 case "i1":
  return HEAP8[ptr >> 0];

 case "i8":
  return HEAP8[ptr >> 0];

 case "i16":
  return HEAP16[ptr >> 1];

 case "i32":
  return HEAP32[ptr >> 2];

 case "i64":
  return HEAP32[ptr >> 2];

 case "float":
  return HEAPF32[ptr >> 2];

 case "double":
  return HEAPF64[ptr >> 3];

 default:
  abort("invalid type for getValue: " + type);
 }
 return null;
}

var wasmMemory;

var wasmTable = new WebAssembly.Table({
 "initial": 1011,
 "maximum": 1011 + 0,
 "element": "anyfunc"
});

var ABORT = false;

var EXITSTATUS = 0;

function assert(condition, text) {
 if (!condition) {
  abort("Assertion failed: " + text);
 }
}

function getCFunc(ident) {
 var func = Module["_" + ident];
 assert(func, "Cannot call unknown function " + ident + ", make sure it is exported");
 return func;
}

function ccall(ident, returnType, argTypes, args, opts) {
 var toC = {
  "string": function(str) {
   var ret = 0;
   if (str !== null && str !== undefined && str !== 0) {
    var len = (str.length << 2) + 1;
    ret = stackAlloc(len);
    stringToUTF8(str, ret, len);
   }
   return ret;
  },
  "array": function(arr) {
   var ret = stackAlloc(arr.length);
   writeArrayToMemory(arr, ret);
   return ret;
  }
 };
 function convertReturnValue(ret) {
  if (returnType === "string") return UTF8ToString(ret);
  if (returnType === "boolean") return Boolean(ret);
  return ret;
 }
 var func = getCFunc(ident);
 var cArgs = [];
 var stack = 0;
 if (args) {
  for (var i = 0; i < args.length; i++) {
   var converter = toC[argTypes[i]];
   if (converter) {
    if (stack === 0) stack = stackSave();
    cArgs[i] = converter(args[i]);
   } else {
    cArgs[i] = args[i];
   }
  }
 }
 var ret = func.apply(null, cArgs);
 ret = convertReturnValue(ret);
 if (stack !== 0) stackRestore(stack);
 return ret;
}

function cwrap(ident, returnType, argTypes, opts) {
 argTypes = argTypes || [];
 var numericArgs = argTypes.every(function(type) {
  return type === "number";
 });
 var numericRet = returnType !== "string";
 if (numericRet && numericArgs && !opts) {
  return getCFunc(ident);
 }
 return function() {
  return ccall(ident, returnType, argTypes, arguments, opts);
 };
}

var ALLOC_NONE = 3;

function allocate(slab, types, allocator, ptr) {
 var zeroinit, size;
 if (typeof slab === "number") {
  zeroinit = true;
  size = slab;
 } else {
  zeroinit = false;
  size = slab.length;
 }
 var singleType = typeof types === "string" ? types : null;
 var ret;
 if (allocator == ALLOC_NONE) {
  ret = ptr;
 } else {
  ret = [ _malloc, stackAlloc, dynamicAlloc ][allocator](Math.max(size, singleType ? 1 : types.length));
 }
 if (zeroinit) {
  var stop;
  ptr = ret;
  assert((ret & 3) == 0);
  stop = ret + (size & ~3);
  for (;ptr < stop; ptr += 4) {
   HEAP32[ptr >> 2] = 0;
  }
  stop = ret + size;
  while (ptr < stop) {
   HEAP8[ptr++ >> 0] = 0;
  }
  return ret;
 }
 if (singleType === "i8") {
  if (slab.subarray || slab.slice) {
   HEAPU8.set(slab, ret);
  } else {
   HEAPU8.set(new Uint8Array(slab), ret);
  }
  return ret;
 }
 var i = 0, type, typeSize, previousType;
 while (i < size) {
  var curr = slab[i];
  type = singleType || types[i];
  if (type === 0) {
   i++;
   continue;
  }
  if (type == "i64") type = "i32";
  setValue(ret + i, curr, type);
  if (previousType !== type) {
   typeSize = getNativeTypeSize(type);
   previousType = type;
  }
  i += typeSize;
 }
 return ret;
}

function getMemory(size) {
 if (!runtimeInitialized) return dynamicAlloc(size);
 return _malloc(size);
}

var UTF8Decoder = typeof TextDecoder !== "undefined" ? new TextDecoder("utf8") : undefined;

function UTF8ArrayToString(u8Array, idx, maxBytesToRead) {
 var endIdx = idx + maxBytesToRead;
 var endPtr = idx;
 while (u8Array[endPtr] && !(endPtr >= endIdx)) ++endPtr;
 if (endPtr - idx > 16 && u8Array.subarray && UTF8Decoder) {
  return UTF8Decoder.decode(u8Array.subarray(idx, endPtr));
 } else {
  var str = "";
  while (idx < endPtr) {
   var u0 = u8Array[idx++];
   if (!(u0 & 128)) {
    str += String.fromCharCode(u0);
    continue;
   }
   var u1 = u8Array[idx++] & 63;
   if ((u0 & 224) == 192) {
    str += String.fromCharCode((u0 & 31) << 6 | u1);
    continue;
   }
   var u2 = u8Array[idx++] & 63;
   if ((u0 & 240) == 224) {
    u0 = (u0 & 15) << 12 | u1 << 6 | u2;
   } else {
    u0 = (u0 & 7) << 18 | u1 << 12 | u2 << 6 | u8Array[idx++] & 63;
   }
   if (u0 < 65536) {
    str += String.fromCharCode(u0);
   } else {
    var ch = u0 - 65536;
    str += String.fromCharCode(55296 | ch >> 10, 56320 | ch & 1023);
   }
  }
 }
 return str;
}

function UTF8ToString(ptr, maxBytesToRead) {
 return ptr ? UTF8ArrayToString(HEAPU8, ptr, maxBytesToRead) : "";
}

function stringToUTF8Array(str, outU8Array, outIdx, maxBytesToWrite) {
 if (!(maxBytesToWrite > 0)) return 0;
 var startIdx = outIdx;
 var endIdx = outIdx + maxBytesToWrite - 1;
 for (var i = 0; i < str.length; ++i) {
  var u = str.charCodeAt(i);
  if (u >= 55296 && u <= 57343) {
   var u1 = str.charCodeAt(++i);
   u = 65536 + ((u & 1023) << 10) | u1 & 1023;
  }
  if (u <= 127) {
   if (outIdx >= endIdx) break;
   outU8Array[outIdx++] = u;
  } else if (u <= 2047) {
   if (outIdx + 1 >= endIdx) break;
   outU8Array[outIdx++] = 192 | u >> 6;
   outU8Array[outIdx++] = 128 | u & 63;
  } else if (u <= 65535) {
   if (outIdx + 2 >= endIdx) break;
   outU8Array[outIdx++] = 224 | u >> 12;
   outU8Array[outIdx++] = 128 | u >> 6 & 63;
   outU8Array[outIdx++] = 128 | u & 63;
  } else {
   if (outIdx + 3 >= endIdx) break;
   outU8Array[outIdx++] = 240 | u >> 18;
   outU8Array[outIdx++] = 128 | u >> 12 & 63;
   outU8Array[outIdx++] = 128 | u >> 6 & 63;
   outU8Array[outIdx++] = 128 | u & 63;
  }
 }
 outU8Array[outIdx] = 0;
 return outIdx - startIdx;
}

function stringToUTF8(str, outPtr, maxBytesToWrite) {
 return stringToUTF8Array(str, HEAPU8, outPtr, maxBytesToWrite);
}

function lengthBytesUTF8(str) {
 var len = 0;
 for (var i = 0; i < str.length; ++i) {
  var u = str.charCodeAt(i);
  if (u >= 55296 && u <= 57343) u = 65536 + ((u & 1023) << 10) | str.charCodeAt(++i) & 1023;
  if (u <= 127) ++len; else if (u <= 2047) len += 2; else if (u <= 65535) len += 3; else len += 4;
 }
 return len;
}

var UTF16Decoder = typeof TextDecoder !== "undefined" ? new TextDecoder("utf-16le") : undefined;

function allocateUTF8OnStack(str) {
 var size = lengthBytesUTF8(str) + 1;
 var ret = stackAlloc(size);
 stringToUTF8Array(str, HEAP8, ret, size);
 return ret;
}

function writeArrayToMemory(array, buffer) {
 HEAP8.set(array, buffer);
}

function writeAsciiToMemory(str, buffer, dontAddNull) {
 for (var i = 0; i < str.length; ++i) {
  HEAP8[buffer++ >> 0] = str.charCodeAt(i);
 }
 if (!dontAddNull) HEAP8[buffer >> 0] = 0;
}

var WASM_PAGE_SIZE = 65536;

function alignUp(x, multiple) {
 if (x % multiple > 0) {
  x += multiple - x % multiple;
 }
 return x;
}

var buffer, HEAP8, HEAPU8, HEAP16, HEAPU16, HEAP32, HEAPU32, HEAPF32, HEAPF64;

function updateGlobalBufferAndViews(buf) {
 buffer = buf;
 Module["HEAP8"] = HEAP8 = new Int8Array(buf);
 Module["HEAP16"] = HEAP16 = new Int16Array(buf);
 Module["HEAP32"] = HEAP32 = new Int32Array(buf);
 Module["HEAPU8"] = HEAPU8 = new Uint8Array(buf);
 Module["HEAPU16"] = HEAPU16 = new Uint16Array(buf);
 Module["HEAPU32"] = HEAPU32 = new Uint32Array(buf);
 Module["HEAPF32"] = HEAPF32 = new Float32Array(buf);
 Module["HEAPF64"] = HEAPF64 = new Float64Array(buf);
}

var STACK_BASE = 5888240, DYNAMIC_BASE = 5888240, DYNAMICTOP_PTR = 645200;

var INITIAL_INITIAL_MEMORY = Module["INITIAL_MEMORY"] || 16777216;

if (Module["wasmMemory"]) {
 wasmMemory = Module["wasmMemory"];
} else {
 wasmMemory = new WebAssembly.Memory({
  "initial": INITIAL_INITIAL_MEMORY / WASM_PAGE_SIZE
 });
}

if (wasmMemory) {
 buffer = wasmMemory.buffer;
}

INITIAL_INITIAL_MEMORY = buffer.byteLength;

updateGlobalBufferAndViews(buffer);

HEAP32[DYNAMICTOP_PTR >> 2] = DYNAMIC_BASE;

function callRuntimeCallbacks(callbacks) {
 while (callbacks.length > 0) {
  var callback = callbacks.shift();
  if (typeof callback == "function") {
   callback();
   continue;
  }
  var func = callback.func;
  if (typeof func === "number") {
   if (callback.arg === undefined) {
    Module["dynCall_v"](func);
   } else {
    Module["dynCall_vi"](func, callback.arg);
   }
  } else {
   func(callback.arg === undefined ? null : callback.arg);
  }
 }
}

var __ATPRERUN__ = [];

var __ATINIT__ = [];

var __ATMAIN__ = [];

var __ATPOSTRUN__ = [];

var runtimeInitialized = false;

var runtimeExited = false;

function preRun() {
 if (Module["preRun"]) {
  if (typeof Module["preRun"] == "function") Module["preRun"] = [ Module["preRun"] ];
  while (Module["preRun"].length) {
   addOnPreRun(Module["preRun"].shift());
  }
 }
 callRuntimeCallbacks(__ATPRERUN__);
}

function initRuntime() {
 runtimeInitialized = true;
 if (!Module["noFSInit"] && !FS.init.initialized) FS.init();
 TTY.init();
 callRuntimeCallbacks(__ATINIT__);
}

function preMain() {
 FS.ignorePermissions = false;
 callRuntimeCallbacks(__ATMAIN__);
}

function exitRuntime() {
 runtimeExited = true;
}

function postRun() {
 if (Module["postRun"]) {
  if (typeof Module["postRun"] == "function") Module["postRun"] = [ Module["postRun"] ];
  while (Module["postRun"].length) {
   addOnPostRun(Module["postRun"].shift());
  }
 }
 callRuntimeCallbacks(__ATPOSTRUN__);
}

function addOnPreRun(cb) {
 __ATPRERUN__.unshift(cb);
}

function addOnPreMain(cb) {
 __ATMAIN__.unshift(cb);
}

function addOnPostRun(cb) {
 __ATPOSTRUN__.unshift(cb);
}

var Math_abs = Math.abs;

var Math_ceil = Math.ceil;

var Math_floor = Math.floor;

var Math_min = Math.min;

var runDependencies = 0;

var runDependencyWatcher = null;

var dependenciesFulfilled = null;

function getUniqueRunDependency(id) {
 return id;
}

function addRunDependency(id) {
 runDependencies++;
 if (Module["monitorRunDependencies"]) {
  Module["monitorRunDependencies"](runDependencies);
 }
}

function removeRunDependency(id) {
 runDependencies--;
 if (Module["monitorRunDependencies"]) {
  Module["monitorRunDependencies"](runDependencies);
 }
 if (runDependencies == 0) {
  if (runDependencyWatcher !== null) {
   clearInterval(runDependencyWatcher);
   runDependencyWatcher = null;
  }
  if (dependenciesFulfilled) {
   var callback = dependenciesFulfilled;
   dependenciesFulfilled = null;
   callback();
  }
 }
}

Module["preloadedImages"] = {};

Module["preloadedAudios"] = {};

function abort(what) {
 if (Module["onAbort"]) {
  Module["onAbort"](what);
 }
 what += "";
 out(what);
 err(what);
 ABORT = true;
 EXITSTATUS = 1;
 what = "abort(" + what + "). Build with -s ASSERTIONS=1 for more info.";
 throw new WebAssembly.RuntimeError(what);
}

var dataURIPrefix = "data:application/octet-stream;base64,";

function isDataURI(filename) {
 return String.prototype.startsWith ? filename.startsWith(dataURIPrefix) : filename.indexOf(dataURIPrefix) === 0;
}

var wasmBinaryFile = "subtitles-octopus-worker.wasm";

if (!isDataURI(wasmBinaryFile)) {
 wasmBinaryFile = locateFile(wasmBinaryFile);
}

function getBinary() {
 try {
  if (wasmBinary) {
   return new Uint8Array(wasmBinary);
  }
  if (readBinary) {
   return readBinary(wasmBinaryFile);
  } else {
   throw "both async and sync fetching of the wasm failed";
  }
 } catch (err) {
  abort(err);
 }
}

function getBinaryPromise() {
 if (!wasmBinary && (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER) && typeof fetch === "function") {
  return fetch(wasmBinaryFile, {
   credentials: "same-origin"
  }).then(function(response) {
   if (!response["ok"]) {
    throw "failed to load wasm binary file at '" + wasmBinaryFile + "'";
   }
   return response["arrayBuffer"]();
  }).catch(function() {
   return getBinary();
  });
 }
 return new Promise(function(resolve, reject) {
  resolve(getBinary());
 });
}

function createWasm() {
 var info = {
  "env": asmLibraryArg,
  "wasi_snapshot_preview1": asmLibraryArg
 };
 function receiveInstance(instance, module) {
  var exports = instance.exports;
  Module["asm"] = exports;
  removeRunDependency("wasm-instantiate");
 }
 addRunDependency("wasm-instantiate");
 function receiveInstantiatedSource(output) {
  receiveInstance(output["instance"]);
 }
 function instantiateArrayBuffer(receiver) {
  return getBinaryPromise().then(function(binary) {
   return WebAssembly.instantiate(binary, info);
  }).then(receiver, function(reason) {
   err("failed to asynchronously prepare wasm: " + reason);
   abort(reason);
  });
 }
 function instantiateAsync() {
  if (!wasmBinary && typeof WebAssembly.instantiateStreaming === "function" && !isDataURI(wasmBinaryFile) && typeof fetch === "function") {
   fetch(wasmBinaryFile, {
    credentials: "same-origin"
   }).then(function(response) {
    var result = WebAssembly.instantiateStreaming(response, info);
    return result.then(receiveInstantiatedSource, function(reason) {
     err("wasm streaming compile failed: " + reason);
     err("falling back to ArrayBuffer instantiation");
     instantiateArrayBuffer(receiveInstantiatedSource);
    });
   });
  } else {
   return instantiateArrayBuffer(receiveInstantiatedSource);
  }
 }
 if (Module["instantiateWasm"]) {
  try {
   var exports = Module["instantiateWasm"](info, receiveInstance);
   return exports;
  } catch (e) {
   err("Module.instantiateWasm callback failed with error: " + e);
   return false;
  }
 }
 instantiateAsync();
 return {};
}

var tempDouble;

var tempI64;

__ATINIT__.push({
 func: function() {
  ___wasm_call_ctors();
 }
});

function _emscripten_set_main_loop_timing(mode, value) {
 Browser.mainLoop.timingMode = mode;
 Browser.mainLoop.timingValue = value;
 if (!Browser.mainLoop.func) {
  return 1;
 }
 if (mode == 0) {
  Browser.mainLoop.scheduler = function Browser_mainLoop_scheduler_setTimeout() {
   var timeUntilNextTick = Math.max(0, Browser.mainLoop.tickStartTime + value - _emscripten_get_now()) | 0;
   setTimeout(Browser.mainLoop.runner, timeUntilNextTick);
  };
  Browser.mainLoop.method = "timeout";
 } else if (mode == 1) {
  Browser.mainLoop.scheduler = function Browser_mainLoop_scheduler_rAF() {
   Browser.requestAnimationFrame(Browser.mainLoop.runner);
  };
  Browser.mainLoop.method = "rAF";
 } else if (mode == 2) {
  if (typeof setImmediate === "undefined") {
   var setImmediates = [];
   var emscriptenMainLoopMessageId = "setimmediate";
   var Browser_setImmediate_messageHandler = function(event) {
    if (event.data === emscriptenMainLoopMessageId || event.data.target === emscriptenMainLoopMessageId) {
     event.stopPropagation();
     setImmediates.shift()();
    }
   };
   addEventListener("message", Browser_setImmediate_messageHandler, true);
   setImmediate = function Browser_emulated_setImmediate(func) {
    setImmediates.push(func);
    if (ENVIRONMENT_IS_WORKER) {
     if (Module["setImmediates"] === undefined) Module["setImmediates"] = [];
     Module["setImmediates"].push(func);
     postMessage({
      target: emscriptenMainLoopMessageId
     });
    } else postMessage(emscriptenMainLoopMessageId, "*");
   };
  }
  Browser.mainLoop.scheduler = function Browser_mainLoop_scheduler_setImmediate() {
   setImmediate(Browser.mainLoop.runner);
  };
  Browser.mainLoop.method = "immediate";
 }
 return 0;
}

var _emscripten_get_now;

if (ENVIRONMENT_IS_NODE) {
 _emscripten_get_now = function() {
  var t = process["hrtime"]();
  return t[0] * 1e3 + t[1] / 1e6;
 };
} else if (typeof dateNow !== "undefined") {
 _emscripten_get_now = dateNow;
} else _emscripten_get_now = function() {
 return performance.now();
};

function _emscripten_set_main_loop(func, fps, simulateInfiniteLoop, arg, noSetTiming) {
 noExitRuntime = true;
 assert(!Browser.mainLoop.func, "emscripten_set_main_loop: there can only be one main loop function at once: call emscripten_cancel_main_loop to cancel the previous one before setting a new one with different parameters.");
 Browser.mainLoop.func = func;
 Browser.mainLoop.arg = arg;
 var browserIterationFunc;
 if (typeof arg !== "undefined") {
  browserIterationFunc = function() {
   Module["dynCall_vi"](func, arg);
  };
 } else {
  browserIterationFunc = function() {
   Module["dynCall_v"](func);
  };
 }
 var thisMainLoopId = Browser.mainLoop.currentlyRunningMainloop;
 Browser.mainLoop.runner = function Browser_mainLoop_runner() {
  if (ABORT) return;
  if (Browser.mainLoop.queue.length > 0) {
   var start = Date.now();
   var blocker = Browser.mainLoop.queue.shift();
   blocker.func(blocker.arg);
   if (Browser.mainLoop.remainingBlockers) {
    var remaining = Browser.mainLoop.remainingBlockers;
    var next = remaining % 1 == 0 ? remaining - 1 : Math.floor(remaining);
    if (blocker.counted) {
     Browser.mainLoop.remainingBlockers = next;
    } else {
     next = next + .5;
     Browser.mainLoop.remainingBlockers = (8 * remaining + next) / 9;
    }
   }
   console.log('main loop blocker "' + blocker.name + '" took ' + (Date.now() - start) + " ms");
   Browser.mainLoop.updateStatus();
   if (thisMainLoopId < Browser.mainLoop.currentlyRunningMainloop) return;
   setTimeout(Browser.mainLoop.runner, 0);
   return;
  }
  if (thisMainLoopId < Browser.mainLoop.currentlyRunningMainloop) return;
  Browser.mainLoop.currentFrameNumber = Browser.mainLoop.currentFrameNumber + 1 | 0;
  if (Browser.mainLoop.timingMode == 1 && Browser.mainLoop.timingValue > 1 && Browser.mainLoop.currentFrameNumber % Browser.mainLoop.timingValue != 0) {
   Browser.mainLoop.scheduler();
   return;
  } else if (Browser.mainLoop.timingMode == 0) {
   Browser.mainLoop.tickStartTime = _emscripten_get_now();
  }
  Browser.mainLoop.runIter(browserIterationFunc);
  if (thisMainLoopId < Browser.mainLoop.currentlyRunningMainloop) return;
  if (typeof SDL === "object" && SDL.audio && SDL.audio.queueNewAudioData) SDL.audio.queueNewAudioData();
  Browser.mainLoop.scheduler();
 };
 if (!noSetTiming) {
  if (fps && fps > 0) _emscripten_set_main_loop_timing(0, 1e3 / fps); else _emscripten_set_main_loop_timing(1, 1);
  Browser.mainLoop.scheduler();
 }
 if (simulateInfiniteLoop) {
  throw "unwind";
 }
}

var Browser = {
 mainLoop: {
  scheduler: null,
  method: "",
  currentlyRunningMainloop: 0,
  func: null,
  arg: 0,
  timingMode: 0,
  timingValue: 0,
  currentFrameNumber: 0,
  queue: [],
  pause: function() {
   Browser.mainLoop.scheduler = null;
   Browser.mainLoop.currentlyRunningMainloop++;
  },
  resume: function() {
   Browser.mainLoop.currentlyRunningMainloop++;
   var timingMode = Browser.mainLoop.timingMode;
   var timingValue = Browser.mainLoop.timingValue;
   var func = Browser.mainLoop.func;
   Browser.mainLoop.func = null;
   _emscripten_set_main_loop(func, 0, false, Browser.mainLoop.arg, true);
   _emscripten_set_main_loop_timing(timingMode, timingValue);
   Browser.mainLoop.scheduler();
  },
  updateStatus: function() {
   if (Module["setStatus"]) {
    var message = Module["statusMessage"] || "Please wait...";
    var remaining = Browser.mainLoop.remainingBlockers;
    var expected = Browser.mainLoop.expectedBlockers;
    if (remaining) {
     if (remaining < expected) {
      Module["setStatus"](message + " (" + (expected - remaining) + "/" + expected + ")");
     } else {
      Module["setStatus"](message);
     }
    } else {
     Module["setStatus"]("");
    }
   }
  },
  runIter: function(func) {
   if (ABORT) return;
   if (Module["preMainLoop"]) {
    var preRet = Module["preMainLoop"]();
    if (preRet === false) {
     return;
    }
   }
   try {
    func();
   } catch (e) {
    if (e instanceof ExitStatus) {
     return;
    } else {
     if (e && typeof e === "object" && e.stack) err("exception thrown: " + [ e, e.stack ]);
     throw e;
    }
   }
   if (Module["postMainLoop"]) Module["postMainLoop"]();
  }
 },
 isFullscreen: false,
 pointerLock: false,
 moduleContextCreatedCallbacks: [],
 workers: [],
 init: function() {
  if (!Module["preloadPlugins"]) Module["preloadPlugins"] = [];
  if (Browser.initted) return;
  Browser.initted = true;
  try {
   new Blob();
   Browser.hasBlobConstructor = true;
  } catch (e) {
   Browser.hasBlobConstructor = false;
   console.log("warning: no blob constructor, cannot create blobs with mimetypes");
  }
  Browser.BlobBuilder = typeof MozBlobBuilder != "undefined" ? MozBlobBuilder : typeof WebKitBlobBuilder != "undefined" ? WebKitBlobBuilder : !Browser.hasBlobConstructor ? console.log("warning: no BlobBuilder") : null;
  Browser.URLObject = typeof window != "undefined" ? window.URL ? window.URL : window.webkitURL : undefined;
  if (!Module.noImageDecoding && typeof Browser.URLObject === "undefined") {
   console.log("warning: Browser does not support creating object URLs. Built-in browser image decoding will not be available.");
   Module.noImageDecoding = true;
  }
  var imagePlugin = {};
  imagePlugin["canHandle"] = function imagePlugin_canHandle(name) {
   return !Module.noImageDecoding && /\.(jpg|jpeg|png|bmp)$/i.test(name);
  };
  imagePlugin["handle"] = function imagePlugin_handle(byteArray, name, onload, onerror) {
   var b = null;
   if (Browser.hasBlobConstructor) {
    try {
     b = new Blob([ byteArray ], {
      type: Browser.getMimetype(name)
     });
     if (b.size !== byteArray.length) {
      b = new Blob([ new Uint8Array(byteArray).buffer ], {
       type: Browser.getMimetype(name)
      });
     }
    } catch (e) {
     warnOnce("Blob constructor present but fails: " + e + "; falling back to blob builder");
    }
   }
   if (!b) {
    var bb = new Browser.BlobBuilder();
    bb.append(new Uint8Array(byteArray).buffer);
    b = bb.getBlob();
   }
   var url = Browser.URLObject.createObjectURL(b);
   var img = new Image();
   img.onload = function img_onload() {
    assert(img.complete, "Image " + name + " could not be decoded");
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
    Module["preloadedImages"][name] = canvas;
    Browser.URLObject.revokeObjectURL(url);
    if (onload) onload(byteArray);
   };
   img.onerror = function img_onerror(event) {
    console.log("Image " + url + " could not be decoded");
    if (onerror) onerror();
   };
   img.src = url;
  };
  Module["preloadPlugins"].push(imagePlugin);
  var audioPlugin = {};
  audioPlugin["canHandle"] = function audioPlugin_canHandle(name) {
   return !Module.noAudioDecoding && name.substr(-4) in {
    ".ogg": 1,
    ".wav": 1,
    ".mp3": 1
   };
  };
  audioPlugin["handle"] = function audioPlugin_handle(byteArray, name, onload, onerror) {
   var done = false;
   function finish(audio) {
    if (done) return;
    done = true;
    Module["preloadedAudios"][name] = audio;
    if (onload) onload(byteArray);
   }
   function fail() {
    if (done) return;
    done = true;
    Module["preloadedAudios"][name] = new Audio();
    if (onerror) onerror();
   }
   if (Browser.hasBlobConstructor) {
    try {
     var b = new Blob([ byteArray ], {
      type: Browser.getMimetype(name)
     });
    } catch (e) {
     return fail();
    }
    var url = Browser.URLObject.createObjectURL(b);
    var audio = new Audio();
    audio.addEventListener("canplaythrough", function() {
     finish(audio);
    }, false);
    audio.onerror = function audio_onerror(event) {
     if (done) return;
     console.log("warning: browser could not fully decode audio " + name + ", trying slower base64 approach");
     function encode64(data) {
      var BASE = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
      var PAD = "=";
      var ret = "";
      var leftchar = 0;
      var leftbits = 0;
      for (var i = 0; i < data.length; i++) {
       leftchar = leftchar << 8 | data[i];
       leftbits += 8;
       while (leftbits >= 6) {
        var curr = leftchar >> leftbits - 6 & 63;
        leftbits -= 6;
        ret += BASE[curr];
       }
      }
      if (leftbits == 2) {
       ret += BASE[(leftchar & 3) << 4];
       ret += PAD + PAD;
      } else if (leftbits == 4) {
       ret += BASE[(leftchar & 15) << 2];
       ret += PAD;
      }
      return ret;
     }
     audio.src = "data:audio/x-" + name.substr(-3) + ";base64," + encode64(byteArray);
     finish(audio);
    };
    audio.src = url;
    Browser.safeSetTimeout(function() {
     finish(audio);
    }, 1e4);
   } else {
    return fail();
   }
  };
  Module["preloadPlugins"].push(audioPlugin);
  function pointerLockChange() {
   Browser.pointerLock = document["pointerLockElement"] === Module["canvas"] || document["mozPointerLockElement"] === Module["canvas"] || document["webkitPointerLockElement"] === Module["canvas"] || document["msPointerLockElement"] === Module["canvas"];
  }
  var canvas = Module["canvas"];
  if (canvas) {
   canvas.requestPointerLock = canvas["requestPointerLock"] || canvas["mozRequestPointerLock"] || canvas["webkitRequestPointerLock"] || canvas["msRequestPointerLock"] || function() {};
   canvas.exitPointerLock = document["exitPointerLock"] || document["mozExitPointerLock"] || document["webkitExitPointerLock"] || document["msExitPointerLock"] || function() {};
   canvas.exitPointerLock = canvas.exitPointerLock.bind(document);
   document.addEventListener("pointerlockchange", pointerLockChange, false);
   document.addEventListener("mozpointerlockchange", pointerLockChange, false);
   document.addEventListener("webkitpointerlockchange", pointerLockChange, false);
   document.addEventListener("mspointerlockchange", pointerLockChange, false);
   if (Module["elementPointerLock"]) {
    canvas.addEventListener("click", function(ev) {
     if (!Browser.pointerLock && Module["canvas"].requestPointerLock) {
      Module["canvas"].requestPointerLock();
      ev.preventDefault();
     }
    }, false);
   }
  }
 },
 createContext: function(canvas, useWebGL, setInModule, webGLContextAttributes) {
  if (useWebGL && Module.ctx && canvas == Module.canvas) return Module.ctx;
  var ctx;
  var contextHandle;
  if (useWebGL) {
   var contextAttributes = {
    antialias: false,
    alpha: false,
    majorVersion: 1
   };
   if (webGLContextAttributes) {
    for (var attribute in webGLContextAttributes) {
     contextAttributes[attribute] = webGLContextAttributes[attribute];
    }
   }
   if (typeof GL !== "undefined") {
    contextHandle = GL.createContext(canvas, contextAttributes);
    if (contextHandle) {
     ctx = GL.getContext(contextHandle).GLctx;
    }
   }
  } else {
   ctx = canvas.getContext("2d");
  }
  if (!ctx) return null;
  if (setInModule) {
   if (!useWebGL) assert(typeof GLctx === "undefined", "cannot set in module if GLctx is used, but we are a non-GL context that would replace it");
   Module.ctx = ctx;
   if (useWebGL) GL.makeContextCurrent(contextHandle);
   Module.useWebGL = useWebGL;
   Browser.moduleContextCreatedCallbacks.forEach(function(callback) {
    callback();
   });
   Browser.init();
  }
  return ctx;
 },
 destroyContext: function(canvas, useWebGL, setInModule) {},
 fullscreenHandlersInstalled: false,
 lockPointer: undefined,
 resizeCanvas: undefined,
 requestFullscreen: function(lockPointer, resizeCanvas) {
  Browser.lockPointer = lockPointer;
  Browser.resizeCanvas = resizeCanvas;
  if (typeof Browser.lockPointer === "undefined") Browser.lockPointer = true;
  if (typeof Browser.resizeCanvas === "undefined") Browser.resizeCanvas = false;
  var canvas = Module["canvas"];
  function fullscreenChange() {
   Browser.isFullscreen = false;
   var canvasContainer = canvas.parentNode;
   if ((document["fullscreenElement"] || document["mozFullScreenElement"] || document["msFullscreenElement"] || document["webkitFullscreenElement"] || document["webkitCurrentFullScreenElement"]) === canvasContainer) {
    canvas.exitFullscreen = Browser.exitFullscreen;
    if (Browser.lockPointer) canvas.requestPointerLock();
    Browser.isFullscreen = true;
    if (Browser.resizeCanvas) {
     Browser.setFullscreenCanvasSize();
    } else {
     Browser.updateCanvasDimensions(canvas);
    }
   } else {
    canvasContainer.parentNode.insertBefore(canvas, canvasContainer);
    canvasContainer.parentNode.removeChild(canvasContainer);
    if (Browser.resizeCanvas) {
     Browser.setWindowedCanvasSize();
    } else {
     Browser.updateCanvasDimensions(canvas);
    }
   }
   if (Module["onFullScreen"]) Module["onFullScreen"](Browser.isFullscreen);
   if (Module["onFullscreen"]) Module["onFullscreen"](Browser.isFullscreen);
  }
  if (!Browser.fullscreenHandlersInstalled) {
   Browser.fullscreenHandlersInstalled = true;
   document.addEventListener("fullscreenchange", fullscreenChange, false);
   document.addEventListener("mozfullscreenchange", fullscreenChange, false);
   document.addEventListener("webkitfullscreenchange", fullscreenChange, false);
   document.addEventListener("MSFullscreenChange", fullscreenChange, false);
  }
  var canvasContainer = document.createElement("div");
  canvas.parentNode.insertBefore(canvasContainer, canvas);
  canvasContainer.appendChild(canvas);
  canvasContainer.requestFullscreen = canvasContainer["requestFullscreen"] || canvasContainer["mozRequestFullScreen"] || canvasContainer["msRequestFullscreen"] || (canvasContainer["webkitRequestFullscreen"] ? function() {
   canvasContainer["webkitRequestFullscreen"](Element["ALLOW_KEYBOARD_INPUT"]);
  } : null) || (canvasContainer["webkitRequestFullScreen"] ? function() {
   canvasContainer["webkitRequestFullScreen"](Element["ALLOW_KEYBOARD_INPUT"]);
  } : null);
  canvasContainer.requestFullscreen();
 },
 exitFullscreen: function() {
  if (!Browser.isFullscreen) {
   return false;
  }
  var CFS = document["exitFullscreen"] || document["cancelFullScreen"] || document["mozCancelFullScreen"] || document["msExitFullscreen"] || document["webkitCancelFullScreen"] || function() {};
  CFS.apply(document, []);
  return true;
 },
 nextRAF: 0,
 fakeRequestAnimationFrame: function(func) {
  var now = Date.now();
  if (Browser.nextRAF === 0) {
   Browser.nextRAF = now + 1e3 / 60;
  } else {
   while (now + 2 >= Browser.nextRAF) {
    Browser.nextRAF += 1e3 / 60;
   }
  }
  var delay = Math.max(Browser.nextRAF - now, 0);
  setTimeout(func, delay);
 },
 requestAnimationFrame: function(func) {
  if (typeof requestAnimationFrame === "function") {
   requestAnimationFrame(func);
   return;
  }
  var RAF = Browser.fakeRequestAnimationFrame;
  RAF(func);
 },
 safeCallback: function(func) {
  return function() {
   if (!ABORT) return func.apply(null, arguments);
  };
 },
 allowAsyncCallbacks: true,
 queuedAsyncCallbacks: [],
 pauseAsyncCallbacks: function() {
  Browser.allowAsyncCallbacks = false;
 },
 resumeAsyncCallbacks: function() {
  Browser.allowAsyncCallbacks = true;
  if (Browser.queuedAsyncCallbacks.length > 0) {
   var callbacks = Browser.queuedAsyncCallbacks;
   Browser.queuedAsyncCallbacks = [];
   callbacks.forEach(function(func) {
    func();
   });
  }
 },
 safeRequestAnimationFrame: function(func) {
  return Browser.requestAnimationFrame(function() {
   if (ABORT) return;
   if (Browser.allowAsyncCallbacks) {
    func();
   } else {
    Browser.queuedAsyncCallbacks.push(func);
   }
  });
 },
 safeSetTimeout: function(func, timeout) {
  noExitRuntime = true;
  return setTimeout(function() {
   if (ABORT) return;
   if (Browser.allowAsyncCallbacks) {
    func();
   } else {
    Browser.queuedAsyncCallbacks.push(func);
   }
  }, timeout);
 },
 safeSetInterval: function(func, timeout) {
  noExitRuntime = true;
  return setInterval(function() {
   if (ABORT) return;
   if (Browser.allowAsyncCallbacks) {
    func();
   }
  }, timeout);
 },
 getMimetype: function(name) {
  return {
   "jpg": "image/jpeg",
   "jpeg": "image/jpeg",
   "png": "image/png",
   "bmp": "image/bmp",
   "ogg": "audio/ogg",
   "wav": "audio/wav",
   "mp3": "audio/mpeg"
  }[name.substr(name.lastIndexOf(".") + 1)];
 },
 getUserMedia: function(func) {
  if (!window.getUserMedia) {
   window.getUserMedia = navigator["getUserMedia"] || navigator["mozGetUserMedia"];
  }
  window.getUserMedia(func);
 },
 getMovementX: function(event) {
  return event["movementX"] || event["mozMovementX"] || event["webkitMovementX"] || 0;
 },
 getMovementY: function(event) {
  return event["movementY"] || event["mozMovementY"] || event["webkitMovementY"] || 0;
 },
 getMouseWheelDelta: function(event) {
  var delta = 0;
  switch (event.type) {
  case "DOMMouseScroll":
   delta = event.detail / 3;
   break;

  case "mousewheel":
   delta = event.wheelDelta / 120;
   break;

  case "wheel":
   delta = event.deltaY;
   switch (event.deltaMode) {
   case 0:
    delta /= 100;
    break;

   case 1:
    delta /= 3;
    break;

   case 2:
    delta *= 80;
    break;

   default:
    throw "unrecognized mouse wheel delta mode: " + event.deltaMode;
   }
   break;

  default:
   throw "unrecognized mouse wheel event: " + event.type;
  }
  return delta;
 },
 mouseX: 0,
 mouseY: 0,
 mouseMovementX: 0,
 mouseMovementY: 0,
 touches: {},
 lastTouches: {},
 calculateMouseEvent: function(event) {
  if (Browser.pointerLock) {
   if (event.type != "mousemove" && "mozMovementX" in event) {
    Browser.mouseMovementX = Browser.mouseMovementY = 0;
   } else {
    Browser.mouseMovementX = Browser.getMovementX(event);
    Browser.mouseMovementY = Browser.getMovementY(event);
   }
   if (typeof SDL != "undefined") {
    Browser.mouseX = SDL.mouseX + Browser.mouseMovementX;
    Browser.mouseY = SDL.mouseY + Browser.mouseMovementY;
   } else {
    Browser.mouseX += Browser.mouseMovementX;
    Browser.mouseY += Browser.mouseMovementY;
   }
  } else {
   var rect = Module["canvas"].getBoundingClientRect();
   var cw = Module["canvas"].width;
   var ch = Module["canvas"].height;
   var scrollX = typeof window.scrollX !== "undefined" ? window.scrollX : window.pageXOffset;
   var scrollY = typeof window.scrollY !== "undefined" ? window.scrollY : window.pageYOffset;
   if (event.type === "touchstart" || event.type === "touchend" || event.type === "touchmove") {
    var touch = event.touch;
    if (touch === undefined) {
     return;
    }
    var adjustedX = touch.pageX - (scrollX + rect.left);
    var adjustedY = touch.pageY - (scrollY + rect.top);
    adjustedX = adjustedX * (cw / rect.width);
    adjustedY = adjustedY * (ch / rect.height);
    var coords = {
     x: adjustedX,
     y: adjustedY
    };
    if (event.type === "touchstart") {
     Browser.lastTouches[touch.identifier] = coords;
     Browser.touches[touch.identifier] = coords;
    } else if (event.type === "touchend" || event.type === "touchmove") {
     var last = Browser.touches[touch.identifier];
     if (!last) last = coords;
     Browser.lastTouches[touch.identifier] = last;
     Browser.touches[touch.identifier] = coords;
    }
    return;
   }
   var x = event.pageX - (scrollX + rect.left);
   var y = event.pageY - (scrollY + rect.top);
   x = x * (cw / rect.width);
   y = y * (ch / rect.height);
   Browser.mouseMovementX = x - Browser.mouseX;
   Browser.mouseMovementY = y - Browser.mouseY;
   Browser.mouseX = x;
   Browser.mouseY = y;
  }
 },
 asyncLoad: function(url, onload, onerror, noRunDep) {
  var dep = !noRunDep ? getUniqueRunDependency("al " + url) : "";
  readAsync(url, function(arrayBuffer) {
   assert(arrayBuffer, 'Loading data file "' + url + '" failed (no arrayBuffer).');
   onload(new Uint8Array(arrayBuffer));
   if (dep) removeRunDependency(dep);
  }, function(event) {
   if (onerror) {
    onerror();
   } else {
    throw 'Loading data file "' + url + '" failed.';
   }
  });
  if (dep) addRunDependency(dep);
 },
 resizeListeners: [],
 updateResizeListeners: function() {
  var canvas = Module["canvas"];
  Browser.resizeListeners.forEach(function(listener) {
   listener(canvas.width, canvas.height);
  });
 },
 setCanvasSize: function(width, height, noUpdates) {
  var canvas = Module["canvas"];
  Browser.updateCanvasDimensions(canvas, width, height);
  if (!noUpdates) Browser.updateResizeListeners();
 },
 windowedWidth: 0,
 windowedHeight: 0,
 setFullscreenCanvasSize: function() {
  if (typeof SDL != "undefined") {
   var flags = HEAPU32[SDL.screen >> 2];
   flags = flags | 8388608;
   HEAP32[SDL.screen >> 2] = flags;
  }
  Browser.updateCanvasDimensions(Module["canvas"]);
  Browser.updateResizeListeners();
 },
 setWindowedCanvasSize: function() {
  if (typeof SDL != "undefined") {
   var flags = HEAPU32[SDL.screen >> 2];
   flags = flags & ~8388608;
   HEAP32[SDL.screen >> 2] = flags;
  }
  Browser.updateCanvasDimensions(Module["canvas"]);
  Browser.updateResizeListeners();
 },
 updateCanvasDimensions: function(canvas, wNative, hNative) {
  if (wNative && hNative) {
   canvas.widthNative = wNative;
   canvas.heightNative = hNative;
  } else {
   wNative = canvas.widthNative;
   hNative = canvas.heightNative;
  }
  var w = wNative;
  var h = hNative;
  if (Module["forcedAspectRatio"] && Module["forcedAspectRatio"] > 0) {
   if (w / h < Module["forcedAspectRatio"]) {
    w = Math.round(h * Module["forcedAspectRatio"]);
   } else {
    h = Math.round(w / Module["forcedAspectRatio"]);
   }
  }
  if ((document["fullscreenElement"] || document["mozFullScreenElement"] || document["msFullscreenElement"] || document["webkitFullscreenElement"] || document["webkitCurrentFullScreenElement"]) === canvas.parentNode && typeof screen != "undefined") {
   var factor = Math.min(screen.width / w, screen.height / h);
   w = Math.round(w * factor);
   h = Math.round(h * factor);
  }
  if (Browser.resizeCanvas) {
   if (canvas.width != w) canvas.width = w;
   if (canvas.height != h) canvas.height = h;
   if (typeof canvas.style != "undefined") {
    canvas.style.removeProperty("width");
    canvas.style.removeProperty("height");
   }
  } else {
   if (canvas.width != wNative) canvas.width = wNative;
   if (canvas.height != hNative) canvas.height = hNative;
   if (typeof canvas.style != "undefined") {
    if (w != wNative || h != hNative) {
     canvas.style.setProperty("width", w + "px", "important");
     canvas.style.setProperty("height", h + "px", "important");
    } else {
     canvas.style.removeProperty("width");
     canvas.style.removeProperty("height");
    }
   }
  }
 },
 wgetRequests: {},
 nextWgetRequestHandle: 0,
 getNextWgetRequestHandle: function() {
  var handle = Browser.nextWgetRequestHandle;
  Browser.nextWgetRequestHandle++;
  return handle;
 }
};

function demangle(func) {
 return func;
}

function demangleAll(text) {
 var regex = /\b_Z[\w\d_]+/g;
 return text.replace(regex, function(x) {
  var y = demangle(x);
  return x === y ? x : y + " [" + x + "]";
 });
}

function jsStackTrace() {
 var err = new Error();
 if (!err.stack) {
  try {
   throw new Error();
  } catch (e) {
   err = e;
  }
  if (!err.stack) {
   return "(no stack trace available)";
  }
 }
 return err.stack.toString();
}

function stackTrace() {
 var js = jsStackTrace();
 if (Module["extraStackTrace"]) js += "\n" + Module["extraStackTrace"]();
 return demangleAll(js);
}

function ___assert_fail(condition, filename, line, func) {
 abort("Assertion failed: " + UTF8ToString(condition) + ", at: " + [ filename ? UTF8ToString(filename) : "unknown filename", line, func ? UTF8ToString(func) : "unknown function" ]);
}

var _emscripten_get_now_is_monotonic = true;

function ___setErrNo(value) {
 if (Module["___errno_location"]) HEAP32[Module["___errno_location"]() >> 2] = value;
 return value;
}

function _clock_gettime(clk_id, tp) {
 var now;
 if (clk_id === 0) {
  now = Date.now();
 } else if ((clk_id === 1 || clk_id === 4) && _emscripten_get_now_is_monotonic) {
  now = _emscripten_get_now();
 } else {
  ___setErrNo(28);
  return -1;
 }
 HEAP32[tp >> 2] = now / 1e3 | 0;
 HEAP32[tp + 4 >> 2] = now % 1e3 * 1e3 * 1e3 | 0;
 return 0;
}

function ___clock_gettime(a0, a1) {
 return _clock_gettime(a0, a1);
}

function ___map_file(pathname, size) {
 ___setErrNo(63);
 return -1;
}

var PATH = {
 splitPath: function(filename) {
  var splitPathRe = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
  return splitPathRe.exec(filename).slice(1);
 },
 normalizeArray: function(parts, allowAboveRoot) {
  var up = 0;
  for (var i = parts.length - 1; i >= 0; i--) {
   var last = parts[i];
   if (last === ".") {
    parts.splice(i, 1);
   } else if (last === "..") {
    parts.splice(i, 1);
    up++;
   } else if (up) {
    parts.splice(i, 1);
    up--;
   }
  }
  if (allowAboveRoot) {
   for (;up; up--) {
    parts.unshift("..");
   }
  }
  return parts;
 },
 normalize: function(path) {
  var isAbsolute = path.charAt(0) === "/", trailingSlash = path.substr(-1) === "/";
  path = PATH.normalizeArray(path.split("/").filter(function(p) {
   return !!p;
  }), !isAbsolute).join("/");
  if (!path && !isAbsolute) {
   path = ".";
  }
  if (path && trailingSlash) {
   path += "/";
  }
  return (isAbsolute ? "/" : "") + path;
 },
 dirname: function(path) {
  var result = PATH.splitPath(path), root = result[0], dir = result[1];
  if (!root && !dir) {
   return ".";
  }
  if (dir) {
   dir = dir.substr(0, dir.length - 1);
  }
  return root + dir;
 },
 basename: function(path) {
  if (path === "/") return "/";
  var lastSlash = path.lastIndexOf("/");
  if (lastSlash === -1) return path;
  return path.substr(lastSlash + 1);
 },
 extname: function(path) {
  return PATH.splitPath(path)[3];
 },
 join: function() {
  var paths = Array.prototype.slice.call(arguments, 0);
  return PATH.normalize(paths.join("/"));
 },
 join2: function(l, r) {
  return PATH.normalize(l + "/" + r);
 }
};

var PATH_FS = {
 resolve: function() {
  var resolvedPath = "", resolvedAbsolute = false;
  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
   var path = i >= 0 ? arguments[i] : FS.cwd();
   if (typeof path !== "string") {
    throw new TypeError("Arguments to path.resolve must be strings");
   } else if (!path) {
    return "";
   }
   resolvedPath = path + "/" + resolvedPath;
   resolvedAbsolute = path.charAt(0) === "/";
  }
  resolvedPath = PATH.normalizeArray(resolvedPath.split("/").filter(function(p) {
   return !!p;
  }), !resolvedAbsolute).join("/");
  return (resolvedAbsolute ? "/" : "") + resolvedPath || ".";
 },
 relative: function(from, to) {
  from = PATH_FS.resolve(from).substr(1);
  to = PATH_FS.resolve(to).substr(1);
  function trim(arr) {
   var start = 0;
   for (;start < arr.length; start++) {
    if (arr[start] !== "") break;
   }
   var end = arr.length - 1;
   for (;end >= 0; end--) {
    if (arr[end] !== "") break;
   }
   if (start > end) return [];
   return arr.slice(start, end - start + 1);
  }
  var fromParts = trim(from.split("/"));
  var toParts = trim(to.split("/"));
  var length = Math.min(fromParts.length, toParts.length);
  var samePartsLength = length;
  for (var i = 0; i < length; i++) {
   if (fromParts[i] !== toParts[i]) {
    samePartsLength = i;
    break;
   }
  }
  var outputParts = [];
  for (var i = samePartsLength; i < fromParts.length; i++) {
   outputParts.push("..");
  }
  outputParts = outputParts.concat(toParts.slice(samePartsLength));
  return outputParts.join("/");
 }
};

var TTY = {
 ttys: [],
 init: function() {},
 shutdown: function() {},
 register: function(dev, ops) {
  TTY.ttys[dev] = {
   input: [],
   output: [],
   ops: ops
  };
  FS.registerDevice(dev, TTY.stream_ops);
 },
 stream_ops: {
  open: function(stream) {
   var tty = TTY.ttys[stream.node.rdev];
   if (!tty) {
    throw new FS.ErrnoError(43);
   }
   stream.tty = tty;
   stream.seekable = false;
  },
  close: function(stream) {
   stream.tty.ops.flush(stream.tty);
  },
  flush: function(stream) {
   stream.tty.ops.flush(stream.tty);
  },
  read: function(stream, buffer, offset, length, pos) {
   if (!stream.tty || !stream.tty.ops.get_char) {
    throw new FS.ErrnoError(60);
   }
   var bytesRead = 0;
   for (var i = 0; i < length; i++) {
    var result;
    try {
     result = stream.tty.ops.get_char(stream.tty);
    } catch (e) {
     throw new FS.ErrnoError(29);
    }
    if (result === undefined && bytesRead === 0) {
     throw new FS.ErrnoError(6);
    }
    if (result === null || result === undefined) break;
    bytesRead++;
    buffer[offset + i] = result;
   }
   if (bytesRead) {
    stream.node.timestamp = Date.now();
   }
   return bytesRead;
  },
  write: function(stream, buffer, offset, length, pos) {
   if (!stream.tty || !stream.tty.ops.put_char) {
    throw new FS.ErrnoError(60);
   }
   try {
    for (var i = 0; i < length; i++) {
     stream.tty.ops.put_char(stream.tty, buffer[offset + i]);
    }
   } catch (e) {
    throw new FS.ErrnoError(29);
   }
   if (length) {
    stream.node.timestamp = Date.now();
   }
   return i;
  }
 },
 default_tty_ops: {
  get_char: function(tty) {
   if (!tty.input.length) {
    var result = null;
    if (ENVIRONMENT_IS_NODE) {
     var BUFSIZE = 256;
     var buf = Buffer.alloc ? Buffer.alloc(BUFSIZE) : new Buffer(BUFSIZE);
     var bytesRead = 0;
     try {
      bytesRead = nodeFS.readSync(process.stdin.fd, buf, 0, BUFSIZE, null);
     } catch (e) {
      if (e.toString().indexOf("EOF") != -1) bytesRead = 0; else throw e;
     }
     if (bytesRead > 0) {
      result = buf.slice(0, bytesRead).toString("utf-8");
     } else {
      result = null;
     }
    } else if (typeof window != "undefined" && typeof window.prompt == "function") {
     result = window.prompt("Input: ");
     if (result !== null) {
      result += "\n";
     }
    } else if (typeof readline == "function") {
     result = readline();
     if (result !== null) {
      result += "\n";
     }
    }
    if (!result) {
     return null;
    }
    tty.input = intArrayFromString(result, true);
   }
   return tty.input.shift();
  },
  put_char: function(tty, val) {
   if (val === null || val === 10) {
    out(UTF8ArrayToString(tty.output, 0));
    tty.output = [];
   } else {
    if (val != 0) tty.output.push(val);
   }
  },
  flush: function(tty) {
   if (tty.output && tty.output.length > 0) {
    out(UTF8ArrayToString(tty.output, 0));
    tty.output = [];
   }
  }
 },
 default_tty1_ops: {
  put_char: function(tty, val) {
   if (val === null || val === 10) {
    err(UTF8ArrayToString(tty.output, 0));
    tty.output = [];
   } else {
    if (val != 0) tty.output.push(val);
   }
  },
  flush: function(tty) {
   if (tty.output && tty.output.length > 0) {
    err(UTF8ArrayToString(tty.output, 0));
    tty.output = [];
   }
  }
 }
};

var MEMFS = {
 ops_table: null,
 mount: function(mount) {
  return MEMFS.createNode(null, "/", 16384 | 511, 0);
 },
 createNode: function(parent, name, mode, dev) {
  if (FS.isBlkdev(mode) || FS.isFIFO(mode)) {
   throw new FS.ErrnoError(63);
  }
  if (!MEMFS.ops_table) {
   MEMFS.ops_table = {
    dir: {
     node: {
      getattr: MEMFS.node_ops.getattr,
      setattr: MEMFS.node_ops.setattr,
      lookup: MEMFS.node_ops.lookup,
      mknod: MEMFS.node_ops.mknod,
      rename: MEMFS.node_ops.rename,
      unlink: MEMFS.node_ops.unlink,
      rmdir: MEMFS.node_ops.rmdir,
      readdir: MEMFS.node_ops.readdir,
      symlink: MEMFS.node_ops.symlink
     },
     stream: {
      llseek: MEMFS.stream_ops.llseek
     }
    },
    file: {
     node: {
      getattr: MEMFS.node_ops.getattr,
      setattr: MEMFS.node_ops.setattr
     },
     stream: {
      llseek: MEMFS.stream_ops.llseek,
      read: MEMFS.stream_ops.read,
      write: MEMFS.stream_ops.write,
      allocate: MEMFS.stream_ops.allocate,
      mmap: MEMFS.stream_ops.mmap,
      msync: MEMFS.stream_ops.msync
     }
    },
    link: {
     node: {
      getattr: MEMFS.node_ops.getattr,
      setattr: MEMFS.node_ops.setattr,
      readlink: MEMFS.node_ops.readlink
     },
     stream: {}
    },
    chrdev: {
     node: {
      getattr: MEMFS.node_ops.getattr,
      setattr: MEMFS.node_ops.setattr
     },
     stream: FS.chrdev_stream_ops
    }
   };
  }
  var node = FS.createNode(parent, name, mode, dev);
  if (FS.isDir(node.mode)) {
   node.node_ops = MEMFS.ops_table.dir.node;
   node.stream_ops = MEMFS.ops_table.dir.stream;
   node.contents = {};
  } else if (FS.isFile(node.mode)) {
   node.node_ops = MEMFS.ops_table.file.node;
   node.stream_ops = MEMFS.ops_table.file.stream;
   node.usedBytes = 0;
   node.contents = null;
  } else if (FS.isLink(node.mode)) {
   node.node_ops = MEMFS.ops_table.link.node;
   node.stream_ops = MEMFS.ops_table.link.stream;
  } else if (FS.isChrdev(node.mode)) {
   node.node_ops = MEMFS.ops_table.chrdev.node;
   node.stream_ops = MEMFS.ops_table.chrdev.stream;
  }
  node.timestamp = Date.now();
  if (parent) {
   parent.contents[name] = node;
  }
  return node;
 },
 getFileDataAsRegularArray: function(node) {
  if (node.contents && node.contents.subarray) {
   var arr = [];
   for (var i = 0; i < node.usedBytes; ++i) arr.push(node.contents[i]);
   return arr;
  }
  return node.contents;
 },
 getFileDataAsTypedArray: function(node) {
  if (!node.contents) return new Uint8Array(0);
  if (node.contents.subarray) return node.contents.subarray(0, node.usedBytes);
  return new Uint8Array(node.contents);
 },
 expandFileStorage: function(node, newCapacity) {
  var prevCapacity = node.contents ? node.contents.length : 0;
  if (prevCapacity >= newCapacity) return;
  var CAPACITY_DOUBLING_MAX = 1024 * 1024;
  newCapacity = Math.max(newCapacity, prevCapacity * (prevCapacity < CAPACITY_DOUBLING_MAX ? 2 : 1.125) | 0);
  if (prevCapacity != 0) newCapacity = Math.max(newCapacity, 256);
  var oldContents = node.contents;
  node.contents = new Uint8Array(newCapacity);
  if (node.usedBytes > 0) node.contents.set(oldContents.subarray(0, node.usedBytes), 0);
  return;
 },
 resizeFileStorage: function(node, newSize) {
  if (node.usedBytes == newSize) return;
  if (newSize == 0) {
   node.contents = null;
   node.usedBytes = 0;
   return;
  }
  if (!node.contents || node.contents.subarray) {
   var oldContents = node.contents;
   node.contents = new Uint8Array(newSize);
   if (oldContents) {
    node.contents.set(oldContents.subarray(0, Math.min(newSize, node.usedBytes)));
   }
   node.usedBytes = newSize;
   return;
  }
  if (!node.contents) node.contents = [];
  if (node.contents.length > newSize) node.contents.length = newSize; else while (node.contents.length < newSize) node.contents.push(0);
  node.usedBytes = newSize;
 },
 node_ops: {
  getattr: function(node) {
   var attr = {};
   attr.dev = FS.isChrdev(node.mode) ? node.id : 1;
   attr.ino = node.id;
   attr.mode = node.mode;
   attr.nlink = 1;
   attr.uid = 0;
   attr.gid = 0;
   attr.rdev = node.rdev;
   if (FS.isDir(node.mode)) {
    attr.size = 4096;
   } else if (FS.isFile(node.mode)) {
    attr.size = node.usedBytes;
   } else if (FS.isLink(node.mode)) {
    attr.size = node.link.length;
   } else {
    attr.size = 0;
   }
   attr.atime = new Date(node.timestamp);
   attr.mtime = new Date(node.timestamp);
   attr.ctime = new Date(node.timestamp);
   attr.blksize = 4096;
   attr.blocks = Math.ceil(attr.size / attr.blksize);
   return attr;
  },
  setattr: function(node, attr) {
   if (attr.mode !== undefined) {
    node.mode = attr.mode;
   }
   if (attr.timestamp !== undefined) {
    node.timestamp = attr.timestamp;
   }
   if (attr.size !== undefined) {
    MEMFS.resizeFileStorage(node, attr.size);
   }
  },
  lookup: function(parent, name) {
   throw FS.genericErrors[44];
  },
  mknod: function(parent, name, mode, dev) {
   return MEMFS.createNode(parent, name, mode, dev);
  },
  rename: function(old_node, new_dir, new_name) {
   if (FS.isDir(old_node.mode)) {
    var new_node;
    try {
     new_node = FS.lookupNode(new_dir, new_name);
    } catch (e) {}
    if (new_node) {
     for (var i in new_node.contents) {
      throw new FS.ErrnoError(55);
     }
    }
   }
   delete old_node.parent.contents[old_node.name];
   old_node.name = new_name;
   new_dir.contents[new_name] = old_node;
   old_node.parent = new_dir;
  },
  unlink: function(parent, name) {
   delete parent.contents[name];
  },
  rmdir: function(parent, name) {
   var node = FS.lookupNode(parent, name);
   for (var i in node.contents) {
    throw new FS.ErrnoError(55);
   }
   delete parent.contents[name];
  },
  readdir: function(node) {
   var entries = [ ".", ".." ];
   for (var key in node.contents) {
    if (!node.contents.hasOwnProperty(key)) {
     continue;
    }
    entries.push(key);
   }
   return entries;
  },
  symlink: function(parent, newname, oldpath) {
   var node = MEMFS.createNode(parent, newname, 511 | 40960, 0);
   node.link = oldpath;
   return node;
  },
  readlink: function(node) {
   if (!FS.isLink(node.mode)) {
    throw new FS.ErrnoError(28);
   }
   return node.link;
  }
 },
 stream_ops: {
  read: function(stream, buffer, offset, length, position) {
   var contents = stream.node.contents;
   if (position >= stream.node.usedBytes) return 0;
   var size = Math.min(stream.node.usedBytes - position, length);
   if (size > 8 && contents.subarray) {
    buffer.set(contents.subarray(position, position + size), offset);
   } else {
    for (var i = 0; i < size; i++) buffer[offset + i] = contents[position + i];
   }
   return size;
  },
  write: function(stream, buffer, offset, length, position, canOwn) {
   if (buffer.buffer === HEAP8.buffer) {
    canOwn = false;
   }
   if (!length) return 0;
   var node = stream.node;
   node.timestamp = Date.now();
   if (buffer.subarray && (!node.contents || node.contents.subarray)) {
    if (canOwn) {
     node.contents = buffer.subarray(offset, offset + length);
     node.usedBytes = length;
     return length;
    } else if (node.usedBytes === 0 && position === 0) {
     node.contents = buffer.slice(offset, offset + length);
     node.usedBytes = length;
     return length;
    } else if (position + length <= node.usedBytes) {
     node.contents.set(buffer.subarray(offset, offset + length), position);
     return length;
    }
   }
   MEMFS.expandFileStorage(node, position + length);
   if (node.contents.subarray && buffer.subarray) node.contents.set(buffer.subarray(offset, offset + length), position); else {
    for (var i = 0; i < length; i++) {
     node.contents[position + i] = buffer[offset + i];
    }
   }
   node.usedBytes = Math.max(node.usedBytes, position + length);
   return length;
  },
  llseek: function(stream, offset, whence) {
   var position = offset;
   if (whence === 1) {
    position += stream.position;
   } else if (whence === 2) {
    if (FS.isFile(stream.node.mode)) {
     position += stream.node.usedBytes;
    }
   }
   if (position < 0) {
    throw new FS.ErrnoError(28);
   }
   return position;
  },
  allocate: function(stream, offset, length) {
   MEMFS.expandFileStorage(stream.node, offset + length);
   stream.node.usedBytes = Math.max(stream.node.usedBytes, offset + length);
  },
  mmap: function(stream, buffer, offset, length, position, prot, flags) {
   if (!FS.isFile(stream.node.mode)) {
    throw new FS.ErrnoError(43);
   }
   var ptr;
   var allocated;
   var contents = stream.node.contents;
   if (!(flags & 2) && contents.buffer === buffer.buffer) {
    allocated = false;
    ptr = contents.byteOffset;
   } else {
    if (position > 0 || position + length < contents.length) {
     if (contents.subarray) {
      contents = contents.subarray(position, position + length);
     } else {
      contents = Array.prototype.slice.call(contents, position, position + length);
     }
    }
    allocated = true;
    var fromHeap = buffer.buffer == HEAP8.buffer;
    ptr = _malloc(length);
    if (!ptr) {
     throw new FS.ErrnoError(48);
    }
    (fromHeap ? HEAP8 : buffer).set(contents, ptr);
   }
   return {
    ptr: ptr,
    allocated: allocated
   };
  },
  msync: function(stream, buffer, offset, length, mmapFlags) {
   if (!FS.isFile(stream.node.mode)) {
    throw new FS.ErrnoError(43);
   }
   if (mmapFlags & 2) {
    return 0;
   }
   var bytesWritten = MEMFS.stream_ops.write(stream, buffer, 0, length, offset, false);
   return 0;
  }
 }
};

var FS = {
 root: null,
 mounts: [],
 devices: {},
 streams: [],
 nextInode: 1,
 nameTable: null,
 currentPath: "/",
 initialized: false,
 ignorePermissions: true,
 trackingDelegate: {},
 tracking: {
  openFlags: {
   READ: 1,
   WRITE: 2
  }
 },
 ErrnoError: null,
 genericErrors: {},
 filesystems: null,
 syncFSRequests: 0,
 handleFSError: function(e) {
  if (!(e instanceof FS.ErrnoError)) throw e + " : " + stackTrace();
  return ___setErrNo(e.errno);
 },
 lookupPath: function(path, opts) {
  path = PATH_FS.resolve(FS.cwd(), path);
  opts = opts || {};
  if (!path) return {
   path: "",
   node: null
  };
  var defaults = {
   follow_mount: true,
   recurse_count: 0
  };
  for (var key in defaults) {
   if (opts[key] === undefined) {
    opts[key] = defaults[key];
   }
  }
  if (opts.recurse_count > 8) {
   throw new FS.ErrnoError(32);
  }
  var parts = PATH.normalizeArray(path.split("/").filter(function(p) {
   return !!p;
  }), false);
  var current = FS.root;
  var current_path = "/";
  for (var i = 0; i < parts.length; i++) {
   var islast = i === parts.length - 1;
   if (islast && opts.parent) {
    break;
   }
   current = FS.lookupNode(current, parts[i]);
   current_path = PATH.join2(current_path, parts[i]);
   if (FS.isMountpoint(current)) {
    if (!islast || islast && opts.follow_mount) {
     current = current.mounted.root;
    }
   }
   if (!islast || opts.follow) {
    var count = 0;
    while (FS.isLink(current.mode)) {
     var link = FS.readlink(current_path);
     current_path = PATH_FS.resolve(PATH.dirname(current_path), link);
     var lookup = FS.lookupPath(current_path, {
      recurse_count: opts.recurse_count
     });
     current = lookup.node;
     if (count++ > 40) {
      throw new FS.ErrnoError(32);
     }
    }
   }
  }
  return {
   path: current_path,
   node: current
  };
 },
 getPath: function(node) {
  var path;
  while (true) {
   if (FS.isRoot(node)) {
    var mount = node.mount.mountpoint;
    if (!path) return mount;
    return mount[mount.length - 1] !== "/" ? mount + "/" + path : mount + path;
   }
   path = path ? node.name + "/" + path : node.name;
   node = node.parent;
  }
 },
 hashName: function(parentid, name) {
  var hash = 0;
  for (var i = 0; i < name.length; i++) {
   hash = (hash << 5) - hash + name.charCodeAt(i) | 0;
  }
  return (parentid + hash >>> 0) % FS.nameTable.length;
 },
 hashAddNode: function(node) {
  var hash = FS.hashName(node.parent.id, node.name);
  node.name_next = FS.nameTable[hash];
  FS.nameTable[hash] = node;
 },
 hashRemoveNode: function(node) {
  var hash = FS.hashName(node.parent.id, node.name);
  if (FS.nameTable[hash] === node) {
   FS.nameTable[hash] = node.name_next;
  } else {
   var current = FS.nameTable[hash];
   while (current) {
    if (current.name_next === node) {
     current.name_next = node.name_next;
     break;
    }
    current = current.name_next;
   }
  }
 },
 lookupNode: function(parent, name) {
  var errCode = FS.mayLookup(parent);
  if (errCode) {
   throw new FS.ErrnoError(errCode, parent);
  }
  var hash = FS.hashName(parent.id, name);
  for (var node = FS.nameTable[hash]; node; node = node.name_next) {
   var nodeName = node.name;
   if (node.parent.id === parent.id && nodeName === name) {
    return node;
   }
  }
  return FS.lookup(parent, name);
 },
 createNode: function(parent, name, mode, rdev) {
  var node = new FS.FSNode(parent, name, mode, rdev);
  FS.hashAddNode(node);
  return node;
 },
 destroyNode: function(node) {
  FS.hashRemoveNode(node);
 },
 isRoot: function(node) {
  return node === node.parent;
 },
 isMountpoint: function(node) {
  return !!node.mounted;
 },
 isFile: function(mode) {
  return (mode & 61440) === 32768;
 },
 isDir: function(mode) {
  return (mode & 61440) === 16384;
 },
 isLink: function(mode) {
  return (mode & 61440) === 40960;
 },
 isChrdev: function(mode) {
  return (mode & 61440) === 8192;
 },
 isBlkdev: function(mode) {
  return (mode & 61440) === 24576;
 },
 isFIFO: function(mode) {
  return (mode & 61440) === 4096;
 },
 isSocket: function(mode) {
  return (mode & 49152) === 49152;
 },
 flagModes: {
  "r": 0,
  "rs": 1052672,
  "r+": 2,
  "w": 577,
  "wx": 705,
  "xw": 705,
  "w+": 578,
  "wx+": 706,
  "xw+": 706,
  "a": 1089,
  "ax": 1217,
  "xa": 1217,
  "a+": 1090,
  "ax+": 1218,
  "xa+": 1218
 },
 modeStringToFlags: function(str) {
  var flags = FS.flagModes[str];
  if (typeof flags === "undefined") {
   throw new Error("Unknown file open mode: " + str);
  }
  return flags;
 },
 flagsToPermissionString: function(flag) {
  var perms = [ "r", "w", "rw" ][flag & 3];
  if (flag & 512) {
   perms += "w";
  }
  return perms;
 },
 nodePermissions: function(node, perms) {
  if (FS.ignorePermissions) {
   return 0;
  }
  if (perms.indexOf("r") !== -1 && !(node.mode & 292)) {
   return 2;
  } else if (perms.indexOf("w") !== -1 && !(node.mode & 146)) {
   return 2;
  } else if (perms.indexOf("x") !== -1 && !(node.mode & 73)) {
   return 2;
  }
  return 0;
 },
 mayLookup: function(dir) {
  var errCode = FS.nodePermissions(dir, "x");
  if (errCode) return errCode;
  if (!dir.node_ops.lookup) return 2;
  return 0;
 },
 mayCreate: function(dir, name) {
  try {
   var node = FS.lookupNode(dir, name);
   return 20;
  } catch (e) {}
  return FS.nodePermissions(dir, "wx");
 },
 mayDelete: function(dir, name, isdir) {
  var node;
  try {
   node = FS.lookupNode(dir, name);
  } catch (e) {
   return e.errno;
  }
  var errCode = FS.nodePermissions(dir, "wx");
  if (errCode) {
   return errCode;
  }
  if (isdir) {
   if (!FS.isDir(node.mode)) {
    return 54;
   }
   if (FS.isRoot(node) || FS.getPath(node) === FS.cwd()) {
    return 10;
   }
  } else {
   if (FS.isDir(node.mode)) {
    return 31;
   }
  }
  return 0;
 },
 mayOpen: function(node, flags) {
  if (!node) {
   return 44;
  }
  if (FS.isLink(node.mode)) {
   return 32;
  } else if (FS.isDir(node.mode)) {
   if (FS.flagsToPermissionString(flags) !== "r" || flags & 512) {
    return 31;
   }
  }
  return FS.nodePermissions(node, FS.flagsToPermissionString(flags));
 },
 MAX_OPEN_FDS: 4096,
 nextfd: function(fd_start, fd_end) {
  fd_start = fd_start || 0;
  fd_end = fd_end || FS.MAX_OPEN_FDS;
  for (var fd = fd_start; fd <= fd_end; fd++) {
   if (!FS.streams[fd]) {
    return fd;
   }
  }
  throw new FS.ErrnoError(33);
 },
 getStream: function(fd) {
  return FS.streams[fd];
 },
 createStream: function(stream, fd_start, fd_end) {
  if (!FS.FSStream) {
   FS.FSStream = function() {};
   FS.FSStream.prototype = {
    object: {
     get: function() {
      return this.node;
     },
     set: function(val) {
      this.node = val;
     }
    },
    isRead: {
     get: function() {
      return (this.flags & 2097155) !== 1;
     }
    },
    isWrite: {
     get: function() {
      return (this.flags & 2097155) !== 0;
     }
    },
    isAppend: {
     get: function() {
      return this.flags & 1024;
     }
    }
   };
  }
  var newStream = new FS.FSStream();
  for (var p in stream) {
   newStream[p] = stream[p];
  }
  stream = newStream;
  var fd = FS.nextfd(fd_start, fd_end);
  stream.fd = fd;
  FS.streams[fd] = stream;
  return stream;
 },
 closeStream: function(fd) {
  FS.streams[fd] = null;
 },
 chrdev_stream_ops: {
  open: function(stream) {
   var device = FS.getDevice(stream.node.rdev);
   stream.stream_ops = device.stream_ops;
   if (stream.stream_ops.open) {
    stream.stream_ops.open(stream);
   }
  },
  llseek: function() {
   throw new FS.ErrnoError(70);
  }
 },
 major: function(dev) {
  return dev >> 8;
 },
 minor: function(dev) {
  return dev & 255;
 },
 makedev: function(ma, mi) {
  return ma << 8 | mi;
 },
 registerDevice: function(dev, ops) {
  FS.devices[dev] = {
   stream_ops: ops
  };
 },
 getDevice: function(dev) {
  return FS.devices[dev];
 },
 getMounts: function(mount) {
  var mounts = [];
  var check = [ mount ];
  while (check.length) {
   var m = check.pop();
   mounts.push(m);
   check.push.apply(check, m.mounts);
  }
  return mounts;
 },
 syncfs: function(populate, callback) {
  if (typeof populate === "function") {
   callback = populate;
   populate = false;
  }
  FS.syncFSRequests++;
  if (FS.syncFSRequests > 1) {
   err("warning: " + FS.syncFSRequests + " FS.syncfs operations in flight at once, probably just doing extra work");
  }
  var mounts = FS.getMounts(FS.root.mount);
  var completed = 0;
  function doCallback(errCode) {
   FS.syncFSRequests--;
   return callback(errCode);
  }
  function done(errCode) {
   if (errCode) {
    if (!done.errored) {
     done.errored = true;
     return doCallback(errCode);
    }
    return;
   }
   if (++completed >= mounts.length) {
    doCallback(null);
   }
  }
  mounts.forEach(function(mount) {
   if (!mount.type.syncfs) {
    return done(null);
   }
   mount.type.syncfs(mount, populate, done);
  });
 },
 mount: function(type, opts, mountpoint) {
  var root = mountpoint === "/";
  var pseudo = !mountpoint;
  var node;
  if (root && FS.root) {
   throw new FS.ErrnoError(10);
  } else if (!root && !pseudo) {
   var lookup = FS.lookupPath(mountpoint, {
    follow_mount: false
   });
   mountpoint = lookup.path;
   node = lookup.node;
   if (FS.isMountpoint(node)) {
    throw new FS.ErrnoError(10);
   }
   if (!FS.isDir(node.mode)) {
    throw new FS.ErrnoError(54);
   }
  }
  var mount = {
   type: type,
   opts: opts,
   mountpoint: mountpoint,
   mounts: []
  };
  var mountRoot = type.mount(mount);
  mountRoot.mount = mount;
  mount.root = mountRoot;
  if (root) {
   FS.root = mountRoot;
  } else if (node) {
   node.mounted = mount;
   if (node.mount) {
    node.mount.mounts.push(mount);
   }
  }
  return mountRoot;
 },
 unmount: function(mountpoint) {
  var lookup = FS.lookupPath(mountpoint, {
   follow_mount: false
  });
  if (!FS.isMountpoint(lookup.node)) {
   throw new FS.ErrnoError(28);
  }
  var node = lookup.node;
  var mount = node.mounted;
  var mounts = FS.getMounts(mount);
  Object.keys(FS.nameTable).forEach(function(hash) {
   var current = FS.nameTable[hash];
   while (current) {
    var next = current.name_next;
    if (mounts.indexOf(current.mount) !== -1) {
     FS.destroyNode(current);
    }
    current = next;
   }
  });
  node.mounted = null;
  var idx = node.mount.mounts.indexOf(mount);
  node.mount.mounts.splice(idx, 1);
 },
 lookup: function(parent, name) {
  return parent.node_ops.lookup(parent, name);
 },
 mknod: function(path, mode, dev) {
  var lookup = FS.lookupPath(path, {
   parent: true
  });
  var parent = lookup.node;
  var name = PATH.basename(path);
  if (!name || name === "." || name === "..") {
   throw new FS.ErrnoError(28);
  }
  var errCode = FS.mayCreate(parent, name);
  if (errCode) {
   throw new FS.ErrnoError(errCode);
  }
  if (!parent.node_ops.mknod) {
   throw new FS.ErrnoError(63);
  }
  return parent.node_ops.mknod(parent, name, mode, dev);
 },
 create: function(path, mode) {
  mode = mode !== undefined ? mode : 438;
  mode &= 4095;
  mode |= 32768;
  return FS.mknod(path, mode, 0);
 },
 mkdir: function(path, mode) {
  mode = mode !== undefined ? mode : 511;
  mode &= 511 | 512;
  mode |= 16384;
  return FS.mknod(path, mode, 0);
 },
 mkdirTree: function(path, mode) {
  var dirs = path.split("/");
  var d = "";
  for (var i = 0; i < dirs.length; ++i) {
   if (!dirs[i]) continue;
   d += "/" + dirs[i];
   try {
    FS.mkdir(d, mode);
   } catch (e) {
    if (e.errno != 20) throw e;
   }
  }
 },
 mkdev: function(path, mode, dev) {
  if (typeof dev === "undefined") {
   dev = mode;
   mode = 438;
  }
  mode |= 8192;
  return FS.mknod(path, mode, dev);
 },
 symlink: function(oldpath, newpath) {
  if (!PATH_FS.resolve(oldpath)) {
   throw new FS.ErrnoError(44);
  }
  var lookup = FS.lookupPath(newpath, {
   parent: true
  });
  var parent = lookup.node;
  if (!parent) {
   throw new FS.ErrnoError(44);
  }
  var newname = PATH.basename(newpath);
  var errCode = FS.mayCreate(parent, newname);
  if (errCode) {
   throw new FS.ErrnoError(errCode);
  }
  if (!parent.node_ops.symlink) {
   throw new FS.ErrnoError(63);
  }
  return parent.node_ops.symlink(parent, newname, oldpath);
 },
 rename: function(old_path, new_path) {
  var old_dirname = PATH.dirname(old_path);
  var new_dirname = PATH.dirname(new_path);
  var old_name = PATH.basename(old_path);
  var new_name = PATH.basename(new_path);
  var lookup, old_dir, new_dir;
  try {
   lookup = FS.lookupPath(old_path, {
    parent: true
   });
   old_dir = lookup.node;
   lookup = FS.lookupPath(new_path, {
    parent: true
   });
   new_dir = lookup.node;
  } catch (e) {
   throw new FS.ErrnoError(10);
  }
  if (!old_dir || !new_dir) throw new FS.ErrnoError(44);
  if (old_dir.mount !== new_dir.mount) {
   throw new FS.ErrnoError(75);
  }
  var old_node = FS.lookupNode(old_dir, old_name);
  var relative = PATH_FS.relative(old_path, new_dirname);
  if (relative.charAt(0) !== ".") {
   throw new FS.ErrnoError(28);
  }
  relative = PATH_FS.relative(new_path, old_dirname);
  if (relative.charAt(0) !== ".") {
   throw new FS.ErrnoError(55);
  }
  var new_node;
  try {
   new_node = FS.lookupNode(new_dir, new_name);
  } catch (e) {}
  if (old_node === new_node) {
   return;
  }
  var isdir = FS.isDir(old_node.mode);
  var errCode = FS.mayDelete(old_dir, old_name, isdir);
  if (errCode) {
   throw new FS.ErrnoError(errCode);
  }
  errCode = new_node ? FS.mayDelete(new_dir, new_name, isdir) : FS.mayCreate(new_dir, new_name);
  if (errCode) {
   throw new FS.ErrnoError(errCode);
  }
  if (!old_dir.node_ops.rename) {
   throw new FS.ErrnoError(63);
  }
  if (FS.isMountpoint(old_node) || new_node && FS.isMountpoint(new_node)) {
   throw new FS.ErrnoError(10);
  }
  if (new_dir !== old_dir) {
   errCode = FS.nodePermissions(old_dir, "w");
   if (errCode) {
    throw new FS.ErrnoError(errCode);
   }
  }
  try {
   if (FS.trackingDelegate["willMovePath"]) {
    FS.trackingDelegate["willMovePath"](old_path, new_path);
   }
  } catch (e) {
   err("FS.trackingDelegate['willMovePath']('" + old_path + "', '" + new_path + "') threw an exception: " + e.message);
  }
  FS.hashRemoveNode(old_node);
  try {
   old_dir.node_ops.rename(old_node, new_dir, new_name);
  } catch (e) {
   throw e;
  } finally {
   FS.hashAddNode(old_node);
  }
  try {
   if (FS.trackingDelegate["onMovePath"]) FS.trackingDelegate["onMovePath"](old_path, new_path);
  } catch (e) {
   err("FS.trackingDelegate['onMovePath']('" + old_path + "', '" + new_path + "') threw an exception: " + e.message);
  }
 },
 rmdir: function(path) {
  var lookup = FS.lookupPath(path, {
   parent: true
  });
  var parent = lookup.node;
  var name = PATH.basename(path);
  var node = FS.lookupNode(parent, name);
  var errCode = FS.mayDelete(parent, name, true);
  if (errCode) {
   throw new FS.ErrnoError(errCode);
  }
  if (!parent.node_ops.rmdir) {
   throw new FS.ErrnoError(63);
  }
  if (FS.isMountpoint(node)) {
   throw new FS.ErrnoError(10);
  }
  try {
   if (FS.trackingDelegate["willDeletePath"]) {
    FS.trackingDelegate["willDeletePath"](path);
   }
  } catch (e) {
   err("FS.trackingDelegate['willDeletePath']('" + path + "') threw an exception: " + e.message);
  }
  parent.node_ops.rmdir(parent, name);
  FS.destroyNode(node);
  try {
   if (FS.trackingDelegate["onDeletePath"]) FS.trackingDelegate["onDeletePath"](path);
  } catch (e) {
   err("FS.trackingDelegate['onDeletePath']('" + path + "') threw an exception: " + e.message);
  }
 },
 readdir: function(path) {
  var lookup = FS.lookupPath(path, {
   follow: true
  });
  var node = lookup.node;
  if (!node.node_ops.readdir) {
   throw new FS.ErrnoError(54);
  }
  return node.node_ops.readdir(node);
 },
 unlink: function(path) {
  var lookup = FS.lookupPath(path, {
   parent: true
  });
  var parent = lookup.node;
  var name = PATH.basename(path);
  var node = FS.lookupNode(parent, name);
  var errCode = FS.mayDelete(parent, name, false);
  if (errCode) {
   throw new FS.ErrnoError(errCode);
  }
  if (!parent.node_ops.unlink) {
   throw new FS.ErrnoError(63);
  }
  if (FS.isMountpoint(node)) {
   throw new FS.ErrnoError(10);
  }
  try {
   if (FS.trackingDelegate["willDeletePath"]) {
    FS.trackingDelegate["willDeletePath"](path);
   }
  } catch (e) {
   err("FS.trackingDelegate['willDeletePath']('" + path + "') threw an exception: " + e.message);
  }
  parent.node_ops.unlink(parent, name);
  FS.destroyNode(node);
  try {
   if (FS.trackingDelegate["onDeletePath"]) FS.trackingDelegate["onDeletePath"](path);
  } catch (e) {
   err("FS.trackingDelegate['onDeletePath']('" + path + "') threw an exception: " + e.message);
  }
 },
 readlink: function(path) {
  var lookup = FS.lookupPath(path);
  var link = lookup.node;
  if (!link) {
   throw new FS.ErrnoError(44);
  }
  if (!link.node_ops.readlink) {
   throw new FS.ErrnoError(28);
  }
  return PATH_FS.resolve(FS.getPath(link.parent), link.node_ops.readlink(link));
 },
 stat: function(path, dontFollow) {
  var lookup = FS.lookupPath(path, {
   follow: !dontFollow
  });
  var node = lookup.node;
  if (!node) {
   throw new FS.ErrnoError(44);
  }
  if (!node.node_ops.getattr) {
   throw new FS.ErrnoError(63);
  }
  return node.node_ops.getattr(node);
 },
 lstat: function(path) {
  return FS.stat(path, true);
 },
 chmod: function(path, mode, dontFollow) {
  var node;
  if (typeof path === "string") {
   var lookup = FS.lookupPath(path, {
    follow: !dontFollow
   });
   node = lookup.node;
  } else {
   node = path;
  }
  if (!node.node_ops.setattr) {
   throw new FS.ErrnoError(63);
  }
  node.node_ops.setattr(node, {
   mode: mode & 4095 | node.mode & ~4095,
   timestamp: Date.now()
  });
 },
 lchmod: function(path, mode) {
  FS.chmod(path, mode, true);
 },
 fchmod: function(fd, mode) {
  var stream = FS.getStream(fd);
  if (!stream) {
   throw new FS.ErrnoError(8);
  }
  FS.chmod(stream.node, mode);
 },
 chown: function(path, uid, gid, dontFollow) {
  var node;
  if (typeof path === "string") {
   var lookup = FS.lookupPath(path, {
    follow: !dontFollow
   });
   node = lookup.node;
  } else {
   node = path;
  }
  if (!node.node_ops.setattr) {
   throw new FS.ErrnoError(63);
  }
  node.node_ops.setattr(node, {
   timestamp: Date.now()
  });
 },
 lchown: function(path, uid, gid) {
  FS.chown(path, uid, gid, true);
 },
 fchown: function(fd, uid, gid) {
  var stream = FS.getStream(fd);
  if (!stream) {
   throw new FS.ErrnoError(8);
  }
  FS.chown(stream.node, uid, gid);
 },
 truncate: function(path, len) {
  if (len < 0) {
   throw new FS.ErrnoError(28);
  }
  var node;
  if (typeof path === "string") {
   var lookup = FS.lookupPath(path, {
    follow: true
   });
   node = lookup.node;
  } else {
   node = path;
  }
  if (!node.node_ops.setattr) {
   throw new FS.ErrnoError(63);
  }
  if (FS.isDir(node.mode)) {
   throw new FS.ErrnoError(31);
  }
  if (!FS.isFile(node.mode)) {
   throw new FS.ErrnoError(28);
  }
  var errCode = FS.nodePermissions(node, "w");
  if (errCode) {
   throw new FS.ErrnoError(errCode);
  }
  node.node_ops.setattr(node, {
   size: len,
   timestamp: Date.now()
  });
 },
 ftruncate: function(fd, len) {
  var stream = FS.getStream(fd);
  if (!stream) {
   throw new FS.ErrnoError(8);
  }
  if ((stream.flags & 2097155) === 0) {
   throw new FS.ErrnoError(28);
  }
  FS.truncate(stream.node, len);
 },
 utime: function(path, atime, mtime) {
  var lookup = FS.lookupPath(path, {
   follow: true
  });
  var node = lookup.node;
  node.node_ops.setattr(node, {
   timestamp: Math.max(atime, mtime)
  });
 },
 open: function(path, flags, mode, fd_start, fd_end) {
  if (path === "") {
   throw new FS.ErrnoError(44);
  }
  flags = typeof flags === "string" ? FS.modeStringToFlags(flags) : flags;
  mode = typeof mode === "undefined" ? 438 : mode;
  if (flags & 64) {
   mode = mode & 4095 | 32768;
  } else {
   mode = 0;
  }
  var node;
  if (typeof path === "object") {
   node = path;
  } else {
   path = PATH.normalize(path);
   try {
    var lookup = FS.lookupPath(path, {
     follow: !(flags & 131072)
    });
    node = lookup.node;
   } catch (e) {}
  }
  var created = false;
  if (flags & 64) {
   if (node) {
    if (flags & 128) {
     throw new FS.ErrnoError(20);
    }
   } else {
    node = FS.mknod(path, mode, 0);
    created = true;
   }
  }
  if (!node) {
   throw new FS.ErrnoError(44);
  }
  if (FS.isChrdev(node.mode)) {
   flags &= ~512;
  }
  if (flags & 65536 && !FS.isDir(node.mode)) {
   throw new FS.ErrnoError(54);
  }
  if (!created) {
   var errCode = FS.mayOpen(node, flags);
   if (errCode) {
    throw new FS.ErrnoError(errCode);
   }
  }
  if (flags & 512) {
   FS.truncate(node, 0);
  }
  flags &= ~(128 | 512);
  var stream = FS.createStream({
   node: node,
   path: FS.getPath(node),
   flags: flags,
   seekable: true,
   position: 0,
   stream_ops: node.stream_ops,
   ungotten: [],
   error: false
  }, fd_start, fd_end);
  if (stream.stream_ops.open) {
   stream.stream_ops.open(stream);
  }
  if (Module["logReadFiles"] && !(flags & 1)) {
   if (!FS.readFiles) FS.readFiles = {};
   if (!(path in FS.readFiles)) {
    FS.readFiles[path] = 1;
    err("FS.trackingDelegate error on read file: " + path);
   }
  }
  try {
   if (FS.trackingDelegate["onOpenFile"]) {
    var trackingFlags = 0;
    if ((flags & 2097155) !== 1) {
     trackingFlags |= FS.tracking.openFlags.READ;
    }
    if ((flags & 2097155) !== 0) {
     trackingFlags |= FS.tracking.openFlags.WRITE;
    }
    FS.trackingDelegate["onOpenFile"](path, trackingFlags);
   }
  } catch (e) {
   err("FS.trackingDelegate['onOpenFile']('" + path + "', flags) threw an exception: " + e.message);
  }
  return stream;
 },
 close: function(stream) {
  if (FS.isClosed(stream)) {
   throw new FS.ErrnoError(8);
  }
  if (stream.getdents) stream.getdents = null;
  try {
   if (stream.stream_ops.close) {
    stream.stream_ops.close(stream);
   }
  } catch (e) {
   throw e;
  } finally {
   FS.closeStream(stream.fd);
  }
  stream.fd = null;
 },
 isClosed: function(stream) {
  return stream.fd === null;
 },
 llseek: function(stream, offset, whence) {
  if (FS.isClosed(stream)) {
   throw new FS.ErrnoError(8);
  }
  if (!stream.seekable || !stream.stream_ops.llseek) {
   throw new FS.ErrnoError(70);
  }
  if (whence != 0 && whence != 1 && whence != 2) {
   throw new FS.ErrnoError(28);
  }
  stream.position = stream.stream_ops.llseek(stream, offset, whence);
  stream.ungotten = [];
  return stream.position;
 },
 read: function(stream, buffer, offset, length, position) {
  if (length < 0 || position < 0) {
   throw new FS.ErrnoError(28);
  }
  if (FS.isClosed(stream)) {
   throw new FS.ErrnoError(8);
  }
  if ((stream.flags & 2097155) === 1) {
   throw new FS.ErrnoError(8);
  }
  if (FS.isDir(stream.node.mode)) {
   throw new FS.ErrnoError(31);
  }
  if (!stream.stream_ops.read) {
   throw new FS.ErrnoError(28);
  }
  var seeking = typeof position !== "undefined";
  if (!seeking) {
   position = stream.position;
  } else if (!stream.seekable) {
   throw new FS.ErrnoError(70);
  }
  var bytesRead = stream.stream_ops.read(stream, buffer, offset, length, position);
  if (!seeking) stream.position += bytesRead;
  return bytesRead;
 },
 write: function(stream, buffer, offset, length, position, canOwn) {
  if (length < 0 || position < 0) {
   throw new FS.ErrnoError(28);
  }
  if (FS.isClosed(stream)) {
   throw new FS.ErrnoError(8);
  }
  if ((stream.flags & 2097155) === 0) {
   throw new FS.ErrnoError(8);
  }
  if (FS.isDir(stream.node.mode)) {
   throw new FS.ErrnoError(31);
  }
  if (!stream.stream_ops.write) {
   throw new FS.ErrnoError(28);
  }
  if (stream.flags & 1024) {
   FS.llseek(stream, 0, 2);
  }
  var seeking = typeof position !== "undefined";
  if (!seeking) {
   position = stream.position;
  } else if (!stream.seekable) {
   throw new FS.ErrnoError(70);
  }
  var bytesWritten = stream.stream_ops.write(stream, buffer, offset, length, position, canOwn);
  if (!seeking) stream.position += bytesWritten;
  try {
   if (stream.path && FS.trackingDelegate["onWriteToFile"]) FS.trackingDelegate["onWriteToFile"](stream.path);
  } catch (e) {
   err("FS.trackingDelegate['onWriteToFile']('" + stream.path + "') threw an exception: " + e.message);
  }
  return bytesWritten;
 },
 allocate: function(stream, offset, length) {
  if (FS.isClosed(stream)) {
   throw new FS.ErrnoError(8);
  }
  if (offset < 0 || length <= 0) {
   throw new FS.ErrnoError(28);
  }
  if ((stream.flags & 2097155) === 0) {
   throw new FS.ErrnoError(8);
  }
  if (!FS.isFile(stream.node.mode) && !FS.isDir(stream.node.mode)) {
   throw new FS.ErrnoError(43);
  }
  if (!stream.stream_ops.allocate) {
   throw new FS.ErrnoError(138);
  }
  stream.stream_ops.allocate(stream, offset, length);
 },
 mmap: function(stream, buffer, offset, length, position, prot, flags) {
  if ((prot & 2) !== 0 && (flags & 2) === 0 && (stream.flags & 2097155) !== 2) {
   throw new FS.ErrnoError(2);
  }
  if ((stream.flags & 2097155) === 1) {
   throw new FS.ErrnoError(2);
  }
  if (!stream.stream_ops.mmap) {
   throw new FS.ErrnoError(43);
  }
  return stream.stream_ops.mmap(stream, buffer, offset, length, position, prot, flags);
 },
 msync: function(stream, buffer, offset, length, mmapFlags) {
  if (!stream || !stream.stream_ops.msync) {
   return 0;
  }
  return stream.stream_ops.msync(stream, buffer, offset, length, mmapFlags);
 },
 munmap: function(stream) {
  return 0;
 },
 ioctl: function(stream, cmd, arg) {
  if (!stream.stream_ops.ioctl) {
   throw new FS.ErrnoError(59);
  }
  return stream.stream_ops.ioctl(stream, cmd, arg);
 },
 readFile: function(path, opts) {
  opts = opts || {};
  opts.flags = opts.flags || "r";
  opts.encoding = opts.encoding || "binary";
  if (opts.encoding !== "utf8" && opts.encoding !== "binary") {
   throw new Error('Invalid encoding type "' + opts.encoding + '"');
  }
  var ret;
  var stream = FS.open(path, opts.flags);
  var stat = FS.stat(path);
  var length = stat.size;
  var buf = new Uint8Array(length);
  FS.read(stream, buf, 0, length, 0);
  if (opts.encoding === "utf8") {
   ret = UTF8ArrayToString(buf, 0);
  } else if (opts.encoding === "binary") {
   ret = buf;
  }
  FS.close(stream);
  return ret;
 },
 writeFile: function(path, data, opts) {
  opts = opts || {};
  opts.flags = opts.flags || "w";
  var stream = FS.open(path, opts.flags, opts.mode);
  if (typeof data === "string") {
   var buf = new Uint8Array(lengthBytesUTF8(data) + 1);
   var actualNumBytes = stringToUTF8Array(data, buf, 0, buf.length);
   FS.write(stream, buf, 0, actualNumBytes, undefined, opts.canOwn);
  } else if (ArrayBuffer.isView(data)) {
   FS.write(stream, data, 0, data.byteLength, undefined, opts.canOwn);
  } else {
   throw new Error("Unsupported data type");
  }
  FS.close(stream);
 },
 cwd: function() {
  return FS.currentPath;
 },
 chdir: function(path) {
  var lookup = FS.lookupPath(path, {
   follow: true
  });
  if (lookup.node === null) {
   throw new FS.ErrnoError(44);
  }
  if (!FS.isDir(lookup.node.mode)) {
   throw new FS.ErrnoError(54);
  }
  var errCode = FS.nodePermissions(lookup.node, "x");
  if (errCode) {
   throw new FS.ErrnoError(errCode);
  }
  FS.currentPath = lookup.path;
 },
 createDefaultDirectories: function() {
  FS.mkdir("/tmp");
  FS.mkdir("/home");
  FS.mkdir("/home/web_user");
 },
 createDefaultDevices: function() {
  FS.mkdir("/dev");
  FS.registerDevice(FS.makedev(1, 3), {
   read: function() {
    return 0;
   },
   write: function(stream, buffer, offset, length, pos) {
    return length;
   }
  });
  FS.mkdev("/dev/null", FS.makedev(1, 3));
  TTY.register(FS.makedev(5, 0), TTY.default_tty_ops);
  TTY.register(FS.makedev(6, 0), TTY.default_tty1_ops);
  FS.mkdev("/dev/tty", FS.makedev(5, 0));
  FS.mkdev("/dev/tty1", FS.makedev(6, 0));
  var random_device;
  if (typeof crypto === "object" && typeof crypto["getRandomValues"] === "function") {
   var randomBuffer = new Uint8Array(1);
   random_device = function() {
    crypto.getRandomValues(randomBuffer);
    return randomBuffer[0];
   };
  } else if (ENVIRONMENT_IS_NODE) {
   try {
    var crypto_module = require("crypto");
    random_device = function() {
     return crypto_module["randomBytes"](1)[0];
    };
   } catch (e) {}
  } else {}
  if (!random_device) {
   random_device = function() {
    abort("random_device");
   };
  }
  FS.createDevice("/dev", "random", random_device);
  FS.createDevice("/dev", "urandom", random_device);
  FS.mkdir("/dev/shm");
  FS.mkdir("/dev/shm/tmp");
 },
 createSpecialDirectories: function() {
  FS.mkdir("/proc");
  FS.mkdir("/proc/self");
  FS.mkdir("/proc/self/fd");
  FS.mount({
   mount: function() {
    var node = FS.createNode("/proc/self", "fd", 16384 | 511, 73);
    node.node_ops = {
     lookup: function(parent, name) {
      var fd = +name;
      var stream = FS.getStream(fd);
      if (!stream) throw new FS.ErrnoError(8);
      var ret = {
       parent: null,
       mount: {
        mountpoint: "fake"
       },
       node_ops: {
        readlink: function() {
         return stream.path;
        }
       }
      };
      ret.parent = ret;
      return ret;
     }
    };
    return node;
   }
  }, {}, "/proc/self/fd");
 },
 createStandardStreams: function() {
  if (Module["stdin"]) {
   FS.createDevice("/dev", "stdin", Module["stdin"]);
  } else {
   FS.symlink("/dev/tty", "/dev/stdin");
  }
  if (Module["stdout"]) {
   FS.createDevice("/dev", "stdout", null, Module["stdout"]);
  } else {
   FS.symlink("/dev/tty", "/dev/stdout");
  }
  if (Module["stderr"]) {
   FS.createDevice("/dev", "stderr", null, Module["stderr"]);
  } else {
   FS.symlink("/dev/tty1", "/dev/stderr");
  }
  var stdin = FS.open("/dev/stdin", "r");
  var stdout = FS.open("/dev/stdout", "w");
  var stderr = FS.open("/dev/stderr", "w");
 },
 ensureErrnoError: function() {
  if (FS.ErrnoError) return;
  FS.ErrnoError = function ErrnoError(errno, node) {
   this.node = node;
   this.setErrno = function(errno) {
    this.errno = errno;
   };
   this.setErrno(errno);
   this.message = "FS error";
  };
  FS.ErrnoError.prototype = new Error();
  FS.ErrnoError.prototype.constructor = FS.ErrnoError;
  [ 44 ].forEach(function(code) {
   FS.genericErrors[code] = new FS.ErrnoError(code);
   FS.genericErrors[code].stack = "<generic error, no stack>";
  });
 },
 staticInit: function() {
  FS.ensureErrnoError();
  FS.nameTable = new Array(4096);
  FS.mount(MEMFS, {}, "/");
  FS.createDefaultDirectories();
  FS.createDefaultDevices();
  FS.createSpecialDirectories();
  FS.filesystems = {
   "MEMFS": MEMFS
  };
 },
 init: function(input, output, error) {
  FS.init.initialized = true;
  FS.ensureErrnoError();
  Module["stdin"] = input || Module["stdin"];
  Module["stdout"] = output || Module["stdout"];
  Module["stderr"] = error || Module["stderr"];
  FS.createStandardStreams();
 },
 quit: function() {
  FS.init.initialized = false;
  var fflush = Module["_fflush"];
  if (fflush) fflush(0);
  for (var i = 0; i < FS.streams.length; i++) {
   var stream = FS.streams[i];
   if (!stream) {
    continue;
   }
   FS.close(stream);
  }
 },
 getMode: function(canRead, canWrite) {
  var mode = 0;
  if (canRead) mode |= 292 | 73;
  if (canWrite) mode |= 146;
  return mode;
 },
 joinPath: function(parts, forceRelative) {
  var path = PATH.join.apply(null, parts);
  if (forceRelative && path[0] == "/") path = path.substr(1);
  return path;
 },
 absolutePath: function(relative, base) {
  return PATH_FS.resolve(base, relative);
 },
 standardizePath: function(path) {
  return PATH.normalize(path);
 },
 findObject: function(path, dontResolveLastLink) {
  var ret = FS.analyzePath(path, dontResolveLastLink);
  if (ret.exists) {
   return ret.object;
  } else {
   ___setErrNo(ret.error);
   return null;
  }
 },
 analyzePath: function(path, dontResolveLastLink) {
  try {
   var lookup = FS.lookupPath(path, {
    follow: !dontResolveLastLink
   });
   path = lookup.path;
  } catch (e) {}
  var ret = {
   isRoot: false,
   exists: false,
   error: 0,
   name: null,
   path: null,
   object: null,
   parentExists: false,
   parentPath: null,
   parentObject: null
  };
  try {
   var lookup = FS.lookupPath(path, {
    parent: true
   });
   ret.parentExists = true;
   ret.parentPath = lookup.path;
   ret.parentObject = lookup.node;
   ret.name = PATH.basename(path);
   lookup = FS.lookupPath(path, {
    follow: !dontResolveLastLink
   });
   ret.exists = true;
   ret.path = lookup.path;
   ret.object = lookup.node;
   ret.name = lookup.node.name;
   ret.isRoot = lookup.path === "/";
  } catch (e) {
   ret.error = e.errno;
  }
  return ret;
 },
 createFolder: function(parent, name, canRead, canWrite) {
  var path = PATH.join2(typeof parent === "string" ? parent : FS.getPath(parent), name);
  var mode = FS.getMode(canRead, canWrite);
  return FS.mkdir(path, mode);
 },
 createPath: function(parent, path, canRead, canWrite) {
  parent = typeof parent === "string" ? parent : FS.getPath(parent);
  var parts = path.split("/").reverse();
  while (parts.length) {
   var part = parts.pop();
   if (!part) continue;
   var current = PATH.join2(parent, part);
   try {
    FS.mkdir(current);
   } catch (e) {}
   parent = current;
  }
  return current;
 },
 createFile: function(parent, name, properties, canRead, canWrite) {
  var path = PATH.join2(typeof parent === "string" ? parent : FS.getPath(parent), name);
  var mode = FS.getMode(canRead, canWrite);
  return FS.create(path, mode);
 },
 createDataFile: function(parent, name, data, canRead, canWrite, canOwn) {
  var path = name ? PATH.join2(typeof parent === "string" ? parent : FS.getPath(parent), name) : parent;
  var mode = FS.getMode(canRead, canWrite);
  var node = FS.create(path, mode);
  if (data) {
   if (typeof data === "string") {
    var arr = new Array(data.length);
    for (var i = 0, len = data.length; i < len; ++i) arr[i] = data.charCodeAt(i);
    data = arr;
   }
   FS.chmod(node, mode | 146);
   var stream = FS.open(node, "w");
   FS.write(stream, data, 0, data.length, 0, canOwn);
   FS.close(stream);
   FS.chmod(node, mode);
  }
  return node;
 },
 createDevice: function(parent, name, input, output) {
  var path = PATH.join2(typeof parent === "string" ? parent : FS.getPath(parent), name);
  var mode = FS.getMode(!!input, !!output);
  if (!FS.createDevice.major) FS.createDevice.major = 64;
  var dev = FS.makedev(FS.createDevice.major++, 0);
  FS.registerDevice(dev, {
   open: function(stream) {
    stream.seekable = false;
   },
   close: function(stream) {
    if (output && output.buffer && output.buffer.length) {
     output(10);
    }
   },
   read: function(stream, buffer, offset, length, pos) {
    var bytesRead = 0;
    for (var i = 0; i < length; i++) {
     var result;
     try {
      result = input();
     } catch (e) {
      throw new FS.ErrnoError(29);
     }
     if (result === undefined && bytesRead === 0) {
      throw new FS.ErrnoError(6);
     }
     if (result === null || result === undefined) break;
     bytesRead++;
     buffer[offset + i] = result;
    }
    if (bytesRead) {
     stream.node.timestamp = Date.now();
    }
    return bytesRead;
   },
   write: function(stream, buffer, offset, length, pos) {
    for (var i = 0; i < length; i++) {
     try {
      output(buffer[offset + i]);
     } catch (e) {
      throw new FS.ErrnoError(29);
     }
    }
    if (length) {
     stream.node.timestamp = Date.now();
    }
    return i;
   }
  });
  return FS.mkdev(path, mode, dev);
 },
 createLink: function(parent, name, target, canRead, canWrite) {
  var path = PATH.join2(typeof parent === "string" ? parent : FS.getPath(parent), name);
  return FS.symlink(target, path);
 },
 forceLoadFile: function(obj) {
  if (obj.isDevice || obj.isFolder || obj.link || obj.contents) return true;
  var success = true;
  if (typeof XMLHttpRequest !== "undefined") {
   throw new Error("Lazy loading should have been performed (contents set) in createLazyFile, but it was not. Lazy loading only works in web workers. Use --embed-file or --preload-file in emcc on the main thread.");
  } else if (read_) {
   try {
    obj.contents = intArrayFromString(read_(obj.url), true);
    obj.usedBytes = obj.contents.length;
   } catch (e) {
    success = false;
   }
  } else {
   throw new Error("Cannot load without read() or XMLHttpRequest.");
  }
  if (!success) ___setErrNo(29);
  return success;
 },
 createLazyFile: function(parent, name, url, canRead, canWrite) {
  function LazyUint8Array() {
   this.lengthKnown = false;
   this.chunks = [];
  }
  LazyUint8Array.prototype.get = function LazyUint8Array_get(idx) {
   if (idx > this.length - 1 || idx < 0) {
    return undefined;
   }
   var chunkOffset = idx % this.chunkSize;
   var chunkNum = idx / this.chunkSize | 0;
   return this.getter(chunkNum)[chunkOffset];
  };
  LazyUint8Array.prototype.setDataGetter = function LazyUint8Array_setDataGetter(getter) {
   this.getter = getter;
  };
  LazyUint8Array.prototype.cacheLength = function LazyUint8Array_cacheLength() {
   var xhr = new XMLHttpRequest();
   xhr.open("HEAD", url, false);
   xhr.send(null);
   if (!(xhr.status >= 200 && xhr.status < 300 || xhr.status === 304)) throw new Error("Couldn't load " + url + ". Status: " + xhr.status);
   var datalength = Number(xhr.getResponseHeader("Content-length"));
   var header;
   var hasByteServing = (header = xhr.getResponseHeader("Accept-Ranges")) && header === "bytes";
   var usesGzip = (header = xhr.getResponseHeader("Content-Encoding")) && header === "gzip";
   var chunkSize = 1024 * 1024;
   if (!hasByteServing) chunkSize = datalength;
   var doXHR = function(from, to) {
    if (from > to) throw new Error("invalid range (" + from + ", " + to + ") or no bytes requested!");
    if (to > datalength - 1) throw new Error("only " + datalength + " bytes available! programmer error!");
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, false);
    if (datalength !== chunkSize) xhr.setRequestHeader("Range", "bytes=" + from + "-" + to);
    if (typeof Uint8Array != "undefined") xhr.responseType = "arraybuffer";
    if (xhr.overrideMimeType) {
     xhr.overrideMimeType("text/plain; charset=x-user-defined");
    }
    xhr.send(null);
    if (!(xhr.status >= 200 && xhr.status < 300 || xhr.status === 304)) throw new Error("Couldn't load " + url + ". Status: " + xhr.status);
    if (xhr.response !== undefined) {
     return new Uint8Array(xhr.response || []);
    } else {
     return intArrayFromString(xhr.responseText || "", true);
    }
   };
   var lazyArray = this;
   lazyArray.setDataGetter(function(chunkNum) {
    var start = chunkNum * chunkSize;
    var end = (chunkNum + 1) * chunkSize - 1;
    end = Math.min(end, datalength - 1);
    if (typeof lazyArray.chunks[chunkNum] === "undefined") {
     lazyArray.chunks[chunkNum] = doXHR(start, end);
    }
    if (typeof lazyArray.chunks[chunkNum] === "undefined") throw new Error("doXHR failed!");
    return lazyArray.chunks[chunkNum];
   });
   if (usesGzip || !datalength) {
    chunkSize = datalength = 1;
    datalength = this.getter(0).length;
    chunkSize = datalength;
    out("LazyFiles on gzip forces download of the whole file when length is accessed");
   }
   this._length = datalength;
   this._chunkSize = chunkSize;
   this.lengthKnown = true;
  };
  if (typeof XMLHttpRequest !== "undefined") {
   if (!ENVIRONMENT_IS_WORKER) throw "Cannot do synchronous binary XHRs outside webworkers in modern browsers. Use --embed-file or --preload-file in emcc";
   var lazyArray = new LazyUint8Array();
   Object.defineProperties(lazyArray, {
    length: {
     get: function() {
      if (!this.lengthKnown) {
       this.cacheLength();
      }
      return this._length;
     }
    },
    chunkSize: {
     get: function() {
      if (!this.lengthKnown) {
       this.cacheLength();
      }
      return this._chunkSize;
     }
    }
   });
   var properties = {
    isDevice: false,
    contents: lazyArray
   };
  } else {
   var properties = {
    isDevice: false,
    url: url
   };
  }
  var node = FS.createFile(parent, name, properties, canRead, canWrite);
  if (properties.contents) {
   node.contents = properties.contents;
  } else if (properties.url) {
   node.contents = null;
   node.url = properties.url;
  }
  Object.defineProperties(node, {
   usedBytes: {
    get: function() {
     return this.contents.length;
    }
   }
  });
  var stream_ops = {};
  var keys = Object.keys(node.stream_ops);
  keys.forEach(function(key) {
   var fn = node.stream_ops[key];
   stream_ops[key] = function forceLoadLazyFile() {
    if (!FS.forceLoadFile(node)) {
     throw new FS.ErrnoError(29);
    }
    return fn.apply(null, arguments);
   };
  });
  stream_ops.read = function stream_ops_read(stream, buffer, offset, length, position) {
   if (!FS.forceLoadFile(node)) {
    throw new FS.ErrnoError(29);
   }
   var contents = stream.node.contents;
   if (position >= contents.length) return 0;
   var size = Math.min(contents.length - position, length);
   if (contents.slice) {
    for (var i = 0; i < size; i++) {
     buffer[offset + i] = contents[position + i];
    }
   } else {
    for (var i = 0; i < size; i++) {
     buffer[offset + i] = contents.get(position + i);
    }
   }
   return size;
  };
  node.stream_ops = stream_ops;
  return node;
 },
 createPreloadedFile: function(parent, name, url, canRead, canWrite, onload, onerror, dontCreateFile, canOwn, preFinish) {
  Browser.init();
  var fullname = name ? PATH_FS.resolve(PATH.join2(parent, name)) : parent;
  var dep = getUniqueRunDependency("cp " + fullname);
  function processData(byteArray) {
   function finish(byteArray) {
    if (preFinish) preFinish();
    if (!dontCreateFile) {
     FS.createDataFile(parent, name, byteArray, canRead, canWrite, canOwn);
    }
    if (onload) onload();
    removeRunDependency(dep);
   }
   var handled = false;
   Module["preloadPlugins"].forEach(function(plugin) {
    if (handled) return;
    if (plugin["canHandle"](fullname)) {
     plugin["handle"](byteArray, fullname, finish, function() {
      if (onerror) onerror();
      removeRunDependency(dep);
     });
     handled = true;
    }
   });
   if (!handled) finish(byteArray);
  }
  addRunDependency(dep);
  if (typeof url == "string") {
   Browser.asyncLoad(url, function(byteArray) {
    processData(byteArray);
   }, onerror);
  } else {
   processData(url);
  }
 },
 indexedDB: function() {
  return window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
 },
 DB_NAME: function() {
  return "EM_FS_" + window.location.pathname;
 },
 DB_VERSION: 20,
 DB_STORE_NAME: "FILE_DATA",
 saveFilesToDB: function(paths, onload, onerror) {
  onload = onload || function() {};
  onerror = onerror || function() {};
  var indexedDB = FS.indexedDB();
  try {
   var openRequest = indexedDB.open(FS.DB_NAME(), FS.DB_VERSION);
  } catch (e) {
   return onerror(e);
  }
  openRequest.onupgradeneeded = function openRequest_onupgradeneeded() {
   out("creating db");
   var db = openRequest.result;
   db.createObjectStore(FS.DB_STORE_NAME);
  };
  openRequest.onsuccess = function openRequest_onsuccess() {
   var db = openRequest.result;
   var transaction = db.transaction([ FS.DB_STORE_NAME ], "readwrite");
   var files = transaction.objectStore(FS.DB_STORE_NAME);
   var ok = 0, fail = 0, total = paths.length;
   function finish() {
    if (fail == 0) onload(); else onerror();
   }
   paths.forEach(function(path) {
    var putRequest = files.put(FS.analyzePath(path).object.contents, path);
    putRequest.onsuccess = function putRequest_onsuccess() {
     ok++;
     if (ok + fail == total) finish();
    };
    putRequest.onerror = function putRequest_onerror() {
     fail++;
     if (ok + fail == total) finish();
    };
   });
   transaction.onerror = onerror;
  };
  openRequest.onerror = onerror;
 },
 loadFilesFromDB: function(paths, onload, onerror) {
  onload = onload || function() {};
  onerror = onerror || function() {};
  var indexedDB = FS.indexedDB();
  try {
   var openRequest = indexedDB.open(FS.DB_NAME(), FS.DB_VERSION);
  } catch (e) {
   return onerror(e);
  }
  openRequest.onupgradeneeded = onerror;
  openRequest.onsuccess = function openRequest_onsuccess() {
   var db = openRequest.result;
   try {
    var transaction = db.transaction([ FS.DB_STORE_NAME ], "readonly");
   } catch (e) {
    onerror(e);
    return;
   }
   var files = transaction.objectStore(FS.DB_STORE_NAME);
   var ok = 0, fail = 0, total = paths.length;
   function finish() {
    if (fail == 0) onload(); else onerror();
   }
   paths.forEach(function(path) {
    var getRequest = files.get(path);
    getRequest.onsuccess = function getRequest_onsuccess() {
     if (FS.analyzePath(path).exists) {
      FS.unlink(path);
     }
     FS.createDataFile(PATH.dirname(path), PATH.basename(path), getRequest.result, true, true, true);
     ok++;
     if (ok + fail == total) finish();
    };
    getRequest.onerror = function getRequest_onerror() {
     fail++;
     if (ok + fail == total) finish();
    };
   });
   transaction.onerror = onerror;
  };
  openRequest.onerror = onerror;
 }
};

var SYSCALLS = {
 mappings: {},
 DEFAULT_POLLMASK: 5,
 umask: 511,
 calculateAt: function(dirfd, path) {
  if (path[0] !== "/") {
   var dir;
   if (dirfd === -100) {
    dir = FS.cwd();
   } else {
    var dirstream = FS.getStream(dirfd);
    if (!dirstream) throw new FS.ErrnoError(8);
    dir = dirstream.path;
   }
   path = PATH.join2(dir, path);
  }
  return path;
 },
 doStat: function(func, path, buf) {
  try {
   var stat = func(path);
  } catch (e) {
   if (e && e.node && PATH.normalize(path) !== PATH.normalize(FS.getPath(e.node))) {
    return -54;
   }
   throw e;
  }
  HEAP32[buf >> 2] = stat.dev;
  HEAP32[buf + 4 >> 2] = 0;
  HEAP32[buf + 8 >> 2] = stat.ino;
  HEAP32[buf + 12 >> 2] = stat.mode;
  HEAP32[buf + 16 >> 2] = stat.nlink;
  HEAP32[buf + 20 >> 2] = stat.uid;
  HEAP32[buf + 24 >> 2] = stat.gid;
  HEAP32[buf + 28 >> 2] = stat.rdev;
  HEAP32[buf + 32 >> 2] = 0;
  tempI64 = [ stat.size >>> 0, (tempDouble = stat.size, +Math_abs(tempDouble) >= 1 ? tempDouble > 0 ? (Math_min(+Math_floor(tempDouble / 4294967296), 4294967295) | 0) >>> 0 : ~~+Math_ceil((tempDouble - +(~~tempDouble >>> 0)) / 4294967296) >>> 0 : 0) ], 
  HEAP32[buf + 40 >> 2] = tempI64[0], HEAP32[buf + 44 >> 2] = tempI64[1];
  HEAP32[buf + 48 >> 2] = 4096;
  HEAP32[buf + 52 >> 2] = stat.blocks;
  HEAP32[buf + 56 >> 2] = stat.atime.getTime() / 1e3 | 0;
  HEAP32[buf + 60 >> 2] = 0;
  HEAP32[buf + 64 >> 2] = stat.mtime.getTime() / 1e3 | 0;
  HEAP32[buf + 68 >> 2] = 0;
  HEAP32[buf + 72 >> 2] = stat.ctime.getTime() / 1e3 | 0;
  HEAP32[buf + 76 >> 2] = 0;
  tempI64 = [ stat.ino >>> 0, (tempDouble = stat.ino, +Math_abs(tempDouble) >= 1 ? tempDouble > 0 ? (Math_min(+Math_floor(tempDouble / 4294967296), 4294967295) | 0) >>> 0 : ~~+Math_ceil((tempDouble - +(~~tempDouble >>> 0)) / 4294967296) >>> 0 : 0) ], 
  HEAP32[buf + 80 >> 2] = tempI64[0], HEAP32[buf + 84 >> 2] = tempI64[1];
  return 0;
 },
 doMsync: function(addr, stream, len, flags, offset) {
  var buffer = HEAPU8.slice(addr, addr + len);
  FS.msync(stream, buffer, offset, len, flags);
 },
 doMkdir: function(path, mode) {
  path = PATH.normalize(path);
  if (path[path.length - 1] === "/") path = path.substr(0, path.length - 1);
  FS.mkdir(path, mode, 0);
  return 0;
 },
 doMknod: function(path, mode, dev) {
  switch (mode & 61440) {
  case 32768:
  case 8192:
  case 24576:
  case 4096:
  case 49152:
   break;

  default:
   return -28;
  }
  FS.mknod(path, mode, dev);
  return 0;
 },
 doReadlink: function(path, buf, bufsize) {
  if (bufsize <= 0) return -28;
  var ret = FS.readlink(path);
  var len = Math.min(bufsize, lengthBytesUTF8(ret));
  var endChar = HEAP8[buf + len];
  stringToUTF8(ret, buf, bufsize + 1);
  HEAP8[buf + len] = endChar;
  return len;
 },
 doAccess: function(path, amode) {
  if (amode & ~7) {
   return -28;
  }
  var node;
  var lookup = FS.lookupPath(path, {
   follow: true
  });
  node = lookup.node;
  if (!node) {
   return -44;
  }
  var perms = "";
  if (amode & 4) perms += "r";
  if (amode & 2) perms += "w";
  if (amode & 1) perms += "x";
  if (perms && FS.nodePermissions(node, perms)) {
   return -2;
  }
  return 0;
 },
 doDup: function(path, flags, suggestFD) {
  var suggest = FS.getStream(suggestFD);
  if (suggest) FS.close(suggest);
  return FS.open(path, flags, 0, suggestFD, suggestFD).fd;
 },
 doReadv: function(stream, iov, iovcnt, offset) {
  var ret = 0;
  for (var i = 0; i < iovcnt; i++) {
   var ptr = HEAP32[iov + i * 8 >> 2];
   var len = HEAP32[iov + (i * 8 + 4) >> 2];
   var curr = FS.read(stream, HEAP8, ptr, len, offset);
   if (curr < 0) return -1;
   ret += curr;
   if (curr < len) break;
  }
  return ret;
 },
 doWritev: function(stream, iov, iovcnt, offset) {
  var ret = 0;
  for (var i = 0; i < iovcnt; i++) {
   var ptr = HEAP32[iov + i * 8 >> 2];
   var len = HEAP32[iov + (i * 8 + 4) >> 2];
   var curr = FS.write(stream, HEAP8, ptr, len, offset);
   if (curr < 0) return -1;
   ret += curr;
  }
  return ret;
 },
 varargs: undefined,
 get: function() {
  SYSCALLS.varargs += 4;
  var ret = HEAP32[SYSCALLS.varargs - 4 >> 2];
  return ret;
 },
 getStr: function(ptr) {
  var ret = UTF8ToString(ptr);
  return ret;
 },
 getStreamFromFD: function(fd) {
  var stream = FS.getStream(fd);
  if (!stream) throw new FS.ErrnoError(8);
  return stream;
 },
 get64: function(low, high) {
  return low;
 }
};

function ___syscall10(path) {
 try {
  path = SYSCALLS.getStr(path);
  FS.unlink(path);
  return 0;
 } catch (e) {
  if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
  return -e.errno;
 }
}

function ___syscall125(addr, len, size) {
 return 0;
}

function ___syscall15(path, mode) {
 try {
  path = SYSCALLS.getStr(path);
  FS.chmod(path, mode);
  return 0;
 } catch (e) {
  if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
  return -e.errno;
 }
}

function ___syscall183(buf, size) {
 try {
  if (size === 0) return -28;
  var cwd = FS.cwd();
  var cwdLengthInBytes = lengthBytesUTF8(cwd);
  if (size < cwdLengthInBytes + 1) return -68;
  stringToUTF8(cwd, buf, size);
  return buf;
 } catch (e) {
  if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
  return -e.errno;
 }
}

function ___syscall195(path, buf) {
 try {
  path = SYSCALLS.getStr(path);
  return SYSCALLS.doStat(FS.stat, path, buf);
 } catch (e) {
  if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
  return -e.errno;
 }
}

function ___syscall196(path, buf) {
 try {
  path = SYSCALLS.getStr(path);
  return SYSCALLS.doStat(FS.lstat, path, buf);
 } catch (e) {
  if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
  return -e.errno;
 }
}

function ___syscall197(fd, buf) {
 try {
  var stream = SYSCALLS.getStreamFromFD(fd);
  return SYSCALLS.doStat(FS.stat, stream.path, buf);
 } catch (e) {
  if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
  return -e.errno;
 }
}

function ___syscall20() {
 return 42;
}

function ___syscall220(fd, dirp, count) {
 try {
  var stream = SYSCALLS.getStreamFromFD(fd);
  if (!stream.getdents) {
   stream.getdents = FS.readdir(stream.path);
  }
  var struct_size = 280;
  var pos = 0;
  var off = FS.llseek(stream, 0, 1);
  var idx = Math.floor(off / struct_size);
  while (idx < stream.getdents.length && pos + struct_size <= count) {
   var id;
   var type;
   var name = stream.getdents[idx];
   if (name[0] === ".") {
    id = 1;
    type = 4;
   } else {
    var child = FS.lookupNode(stream.node, name);
    id = child.id;
    type = FS.isChrdev(child.mode) ? 2 : FS.isDir(child.mode) ? 4 : FS.isLink(child.mode) ? 10 : 8;
   }
   tempI64 = [ id >>> 0, (tempDouble = id, +Math_abs(tempDouble) >= 1 ? tempDouble > 0 ? (Math_min(+Math_floor(tempDouble / 4294967296), 4294967295) | 0) >>> 0 : ~~+Math_ceil((tempDouble - +(~~tempDouble >>> 0)) / 4294967296) >>> 0 : 0) ], 
   HEAP32[dirp + pos >> 2] = tempI64[0], HEAP32[dirp + pos + 4 >> 2] = tempI64[1];
   tempI64 = [ (idx + 1) * struct_size >>> 0, (tempDouble = (idx + 1) * struct_size, 
   +Math_abs(tempDouble) >= 1 ? tempDouble > 0 ? (Math_min(+Math_floor(tempDouble / 4294967296), 4294967295) | 0) >>> 0 : ~~+Math_ceil((tempDouble - +(~~tempDouble >>> 0)) / 4294967296) >>> 0 : 0) ], 
   HEAP32[dirp + pos + 8 >> 2] = tempI64[0], HEAP32[dirp + pos + 12 >> 2] = tempI64[1];
   HEAP16[dirp + pos + 16 >> 1] = 280;
   HEAP8[dirp + pos + 18 >> 0] = type;
   stringToUTF8(name, dirp + pos + 19, 256);
   pos += struct_size;
   idx += 1;
  }
  FS.llseek(stream, idx * struct_size, 0);
  return pos;
 } catch (e) {
  if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
  return -e.errno;
 }
}

function ___syscall221(fd, cmd, varargs) {
 SYSCALLS.varargs = varargs;
 try {
  var stream = SYSCALLS.getStreamFromFD(fd);
  switch (cmd) {
  case 0:
   {
    var arg = SYSCALLS.get();
    if (arg < 0) {
     return -28;
    }
    var newStream;
    newStream = FS.open(stream.path, stream.flags, 0, arg);
    return newStream.fd;
   }

  case 1:
  case 2:
   return 0;

  case 3:
   return stream.flags;

  case 4:
   {
    var arg = SYSCALLS.get();
    stream.flags |= arg;
    return 0;
   }

  case 12:
   {
    var arg = SYSCALLS.get();
    var offset = 0;
    HEAP16[arg + offset >> 1] = 2;
    return 0;
   }

  case 13:
  case 14:
   return 0;

  case 16:
  case 8:
   return -28;

  case 9:
   ___setErrNo(28);
   return -1;

  default:
   {
    return -28;
   }
  }
 } catch (e) {
  if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
  return -e.errno;
 }
}

function ___syscall3(fd, buf, count) {
 try {
  var stream = SYSCALLS.getStreamFromFD(fd);
  return FS.read(stream, HEAP8, buf, count);
 } catch (e) {
  if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
  return -e.errno;
 }
}

function ___syscall33(path, amode) {
 try {
  path = SYSCALLS.getStr(path);
  return SYSCALLS.doAccess(path, amode);
 } catch (e) {
  if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
  return -e.errno;
 }
}

function ___syscall38(old_path, new_path) {
 try {
  old_path = SYSCALLS.getStr(old_path);
  new_path = SYSCALLS.getStr(new_path);
  FS.rename(old_path, new_path);
  return 0;
 } catch (e) {
  if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
  return -e.errno;
 }
}

function ___syscall39(path, mode) {
 try {
  path = SYSCALLS.getStr(path);
  return SYSCALLS.doMkdir(path, mode);
 } catch (e) {
  if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
  return -e.errno;
 }
}

function ___syscall40(path) {
 try {
  path = SYSCALLS.getStr(path);
  FS.rmdir(path);
  return 0;
 } catch (e) {
  if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
  return -e.errno;
 }
}

function ___syscall5(path, flags, varargs) {
 SYSCALLS.varargs = varargs;
 try {
  var pathname = SYSCALLS.getStr(path);
  var mode = SYSCALLS.get();
  var stream = FS.open(pathname, flags, mode);
  return stream.fd;
 } catch (e) {
  if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
  return -e.errno;
 }
}

function ___syscall54(fd, op, varargs) {
 SYSCALLS.varargs = varargs;
 try {
  var stream = SYSCALLS.getStreamFromFD(fd);
  switch (op) {
  case 21509:
  case 21505:
   {
    if (!stream.tty) return -59;
    return 0;
   }

  case 21510:
  case 21511:
  case 21512:
  case 21506:
  case 21507:
  case 21508:
   {
    if (!stream.tty) return -59;
    return 0;
   }

  case 21519:
   {
    if (!stream.tty) return -59;
    var argp = SYSCALLS.get();
    HEAP32[argp >> 2] = 0;
    return 0;
   }

  case 21520:
   {
    if (!stream.tty) return -59;
    return -28;
   }

  case 21531:
   {
    var argp = SYSCALLS.get();
    return FS.ioctl(stream, op, argp);
   }

  case 21523:
   {
    if (!stream.tty) return -59;
    return 0;
   }

  case 21524:
   {
    if (!stream.tty) return -59;
    return 0;
   }

  default:
   abort("bad ioctl syscall " + op);
  }
 } catch (e) {
  if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
  return -e.errno;
 }
}

function ___syscall83(target, linkpath) {
 try {
  target = SYSCALLS.getStr(target);
  linkpath = SYSCALLS.getStr(linkpath);
  FS.symlink(target, linkpath);
  return 0;
 } catch (e) {
  if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
  return -e.errno;
 }
}

function ___syscall85(path, buf, bufsize) {
 try {
  path = SYSCALLS.getStr(path);
  return SYSCALLS.doReadlink(path, buf, bufsize);
 } catch (e) {
  if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
  return -e.errno;
 }
}

function ___syscall9(oldpath, newpath) {
 return -34;
}

function syscallMunmap(addr, len) {
 if (addr === -1 || len === 0) {
  return -28;
 }
 var info = SYSCALLS.mappings[addr];
 if (!info) return 0;
 if (len === info.len) {
  var stream = FS.getStream(info.fd);
  SYSCALLS.doMsync(addr, stream, len, info.flags, info.offset);
  FS.munmap(stream);
  SYSCALLS.mappings[addr] = null;
  if (info.allocated) {
   _free(info.malloc);
  }
 }
 return 0;
}

function ___syscall91(addr, len) {
 try {
  return syscallMunmap(addr, len);
 } catch (e) {
  if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
  return -e.errno;
 }
}

function _abort() {
 abort();
}

function _emscripten_get_sbrk_ptr() {
 return 645200;
}

var setjmpId = 0;

function _saveSetjmp(env, label, table, size) {
 env = env | 0;
 label = label | 0;
 table = table | 0;
 size = size | 0;
 var i = 0;
 setjmpId = setjmpId + 1 | 0;
 HEAP32[env >> 2] = setjmpId;
 while ((i | 0) < (size | 0)) {
  if ((HEAP32[table + (i << 3) >> 2] | 0) == 0) {
   HEAP32[table + (i << 3) >> 2] = setjmpId;
   HEAP32[table + ((i << 3) + 4) >> 2] = label;
   HEAP32[table + ((i << 3) + 8) >> 2] = 0;
   setTempRet0(size | 0);
   return table | 0;
  }
  i = i + 1 | 0;
 }
 size = size * 2 | 0;
 table = _realloc(table | 0, 8 * (size + 1 | 0) | 0) | 0;
 table = _saveSetjmp(env | 0, label | 0, table | 0, size | 0) | 0;
 setTempRet0(size | 0);
 return table | 0;
}

function _testSetjmp(id, table, size) {
 id = id | 0;
 table = table | 0;
 size = size | 0;
 var i = 0, curr = 0;
 while ((i | 0) < (size | 0)) {
  curr = HEAP32[table + (i << 3) >> 2] | 0;
  if ((curr | 0) == 0) break;
  if ((curr | 0) == (id | 0)) {
   return HEAP32[table + ((i << 3) + 4) >> 2] | 0;
  }
  i = i + 1 | 0;
 }
 return 0;
}

function _longjmp(env, value) {
 _setThrew(env, value || 1);
 throw "longjmp";
}

function _emscripten_longjmp(env, value) {
 _longjmp(env, value);
}

function _emscripten_memcpy_big(dest, src, num) {
 HEAPU8.copyWithin(dest, src, src + num);
}

function _emscripten_get_heap_size() {
 return HEAPU8.length;
}

function emscripten_realloc_buffer(size) {
 try {
  wasmMemory.grow(size - buffer.byteLength + 65535 >> 16);
  updateGlobalBufferAndViews(wasmMemory.buffer);
  return 1;
 } catch (e) {}
}

function _emscripten_resize_heap(requestedSize) {
 var oldSize = _emscripten_get_heap_size();
 var PAGE_MULTIPLE = 65536;
 var maxHeapSize = 2147483648 - PAGE_MULTIPLE;
 if (requestedSize > maxHeapSize) {
  return false;
 }
 var minHeapSize = 16777216;
 for (var cutDown = 1; cutDown <= 4; cutDown *= 2) {
  var overGrownHeapSize = oldSize * (1 + .2 / cutDown);
  overGrownHeapSize = Math.min(overGrownHeapSize, requestedSize + 100663296);
  var newSize = Math.min(maxHeapSize, alignUp(Math.max(minHeapSize, requestedSize, overGrownHeapSize), PAGE_MULTIPLE));
  var replacement = emscripten_realloc_buffer(newSize);
  if (replacement) {
   return true;
  }
 }
 return false;
}

var ENV = {};

function __getExecutableName() {
 return thisProgram || "./this.program";
}

function _emscripten_get_environ() {
 if (!_emscripten_get_environ.strings) {
  var env = {
   "USER": "web_user",
   "LOGNAME": "web_user",
   "PATH": "/",
   "PWD": "/",
   "HOME": "/home/web_user",
   "LANG": (typeof navigator === "object" && navigator.languages && navigator.languages[0] || "C").replace("-", "_") + ".UTF-8",
   "_": __getExecutableName()
  };
  for (var x in ENV) {
   env[x] = ENV[x];
  }
  var strings = [];
  for (var x in env) {
   strings.push(x + "=" + env[x]);
  }
  _emscripten_get_environ.strings = strings;
 }
 return _emscripten_get_environ.strings;
}

function _environ_get(__environ, environ_buf) {
 var strings = _emscripten_get_environ();
 var bufSize = 0;
 strings.forEach(function(string, i) {
  var ptr = environ_buf + bufSize;
  HEAP32[__environ + i * 4 >> 2] = ptr;
  writeAsciiToMemory(string, ptr);
  bufSize += string.length + 1;
 });
 return 0;
}

function _environ_sizes_get(penviron_count, penviron_buf_size) {
 var strings = _emscripten_get_environ();
 HEAP32[penviron_count >> 2] = strings.length;
 var bufSize = 0;
 strings.forEach(function(string) {
  bufSize += string.length + 1;
 });
 HEAP32[penviron_buf_size >> 2] = bufSize;
 return 0;
}

function _exit(status) {
 exit(status);
}

function _fd_close(fd) {
 try {
  var stream = SYSCALLS.getStreamFromFD(fd);
  FS.close(stream);
  return 0;
 } catch (e) {
  if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
  return e.errno;
 }
}

function _fd_fdstat_get(fd, pbuf) {
 try {
  var stream = SYSCALLS.getStreamFromFD(fd);
  var type = stream.tty ? 2 : FS.isDir(stream.mode) ? 3 : FS.isLink(stream.mode) ? 7 : 4;
  HEAP8[pbuf >> 0] = type;
  return 0;
 } catch (e) {
  if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
  return e.errno;
 }
}

function _fd_read(fd, iov, iovcnt, pnum) {
 try {
  var stream = SYSCALLS.getStreamFromFD(fd);
  var num = SYSCALLS.doReadv(stream, iov, iovcnt);
  HEAP32[pnum >> 2] = num;
  return 0;
 } catch (e) {
  if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
  return e.errno;
 }
}

function _fd_seek(fd, offset_low, offset_high, whence, newOffset) {
 try {
  var stream = SYSCALLS.getStreamFromFD(fd);
  var HIGH_OFFSET = 4294967296;
  var offset = offset_high * HIGH_OFFSET + (offset_low >>> 0);
  var DOUBLE_LIMIT = 9007199254740992;
  if (offset <= -DOUBLE_LIMIT || offset >= DOUBLE_LIMIT) {
   return -61;
  }
  FS.llseek(stream, offset, whence);
  tempI64 = [ stream.position >>> 0, (tempDouble = stream.position, +Math_abs(tempDouble) >= 1 ? tempDouble > 0 ? (Math_min(+Math_floor(tempDouble / 4294967296), 4294967295) | 0) >>> 0 : ~~+Math_ceil((tempDouble - +(~~tempDouble >>> 0)) / 4294967296) >>> 0 : 0) ], 
  HEAP32[newOffset >> 2] = tempI64[0], HEAP32[newOffset + 4 >> 2] = tempI64[1];
  if (stream.getdents && offset === 0 && whence === 0) stream.getdents = null;
  return 0;
 } catch (e) {
  if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
  return e.errno;
 }
}

function _fd_write(fd, iov, iovcnt, pnum) {
 try {
  var stream = SYSCALLS.getStreamFromFD(fd);
  var num = SYSCALLS.doWritev(stream, iov, iovcnt);
  HEAP32[pnum >> 2] = num;
  return 0;
 } catch (e) {
  if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
  return e.errno;
 }
}

function _getTempRet0() {
 return getTempRet0() | 0;
}

function _gettimeofday(ptr) {
 var now = Date.now();
 HEAP32[ptr >> 2] = now / 1e3 | 0;
 HEAP32[ptr + 4 >> 2] = now % 1e3 * 1e3 | 0;
 return 0;
}

function _roundf(d) {
 d = +d;
 return d >= +0 ? +Math_floor(d + +.5) : +Math_ceil(d - +.5);
}

function _setTempRet0($i) {
 setTempRet0($i | 0);
}

function _sysconf(name) {
 switch (name) {
 case 30:
  return 16384;

 case 85:
  var maxHeapSize = 2 * 1024 * 1024 * 1024 - 65536;
  return maxHeapSize / 16384;

 case 132:
 case 133:
 case 12:
 case 137:
 case 138:
 case 15:
 case 235:
 case 16:
 case 17:
 case 18:
 case 19:
 case 20:
 case 149:
 case 13:
 case 10:
 case 236:
 case 153:
 case 9:
 case 21:
 case 22:
 case 159:
 case 154:
 case 14:
 case 77:
 case 78:
 case 139:
 case 80:
 case 81:
 case 82:
 case 68:
 case 67:
 case 164:
 case 11:
 case 29:
 case 47:
 case 48:
 case 95:
 case 52:
 case 51:
 case 46:
 case 79:
  return 200809;

 case 27:
 case 246:
 case 127:
 case 128:
 case 23:
 case 24:
 case 160:
 case 161:
 case 181:
 case 182:
 case 242:
 case 183:
 case 184:
 case 243:
 case 244:
 case 245:
 case 165:
 case 178:
 case 179:
 case 49:
 case 50:
 case 168:
 case 169:
 case 175:
 case 170:
 case 171:
 case 172:
 case 97:
 case 76:
 case 32:
 case 173:
 case 35:
  return -1;

 case 176:
 case 177:
 case 7:
 case 155:
 case 8:
 case 157:
 case 125:
 case 126:
 case 92:
 case 93:
 case 129:
 case 130:
 case 131:
 case 94:
 case 91:
  return 1;

 case 74:
 case 60:
 case 69:
 case 70:
 case 4:
  return 1024;

 case 31:
 case 42:
 case 72:
  return 32;

 case 87:
 case 26:
 case 33:
  return 2147483647;

 case 34:
 case 1:
  return 47839;

 case 38:
 case 36:
  return 99;

 case 43:
 case 37:
  return 2048;

 case 0:
  return 2097152;

 case 3:
  return 65536;

 case 28:
  return 32768;

 case 44:
  return 32767;

 case 75:
  return 16384;

 case 39:
  return 1e3;

 case 89:
  return 700;

 case 71:
  return 256;

 case 40:
  return 255;

 case 2:
  return 100;

 case 180:
  return 64;

 case 25:
  return 20;

 case 5:
  return 16;

 case 6:
  return 6;

 case 73:
  return 4;

 case 84:
  {
   if (typeof navigator === "object") return navigator["hardwareConcurrency"] || 1;
   return 1;
  }
 }
 ___setErrNo(28);
 return -1;
}

function _time(ptr) {
 var ret = Date.now() / 1e3 | 0;
 if (ptr) {
  HEAP32[ptr >> 2] = ret;
 }
 return ret;
}

Module["requestFullscreen"] = function Module_requestFullscreen(lockPointer, resizeCanvas) {
 Browser.requestFullscreen(lockPointer, resizeCanvas);
};

Module["requestAnimationFrame"] = function Module_requestAnimationFrame(func) {
 Browser.requestAnimationFrame(func);
};

Module["setCanvasSize"] = function Module_setCanvasSize(width, height, noUpdates) {
 Browser.setCanvasSize(width, height, noUpdates);
};

Module["pauseMainLoop"] = function Module_pauseMainLoop() {
 Browser.mainLoop.pause();
};

Module["resumeMainLoop"] = function Module_resumeMainLoop() {
 Browser.mainLoop.resume();
};

Module["getUserMedia"] = function Module_getUserMedia() {
 Browser.getUserMedia();
};

Module["createContext"] = function Module_createContext(canvas, useWebGL, setInModule, webGLContextAttributes) {
 return Browser.createContext(canvas, useWebGL, setInModule, webGLContextAttributes);
};

var FSNode = function(parent, name, mode, rdev) {
 if (!parent) {
  parent = this;
 }
 this.parent = parent;
 this.mount = parent.mount;
 this.mounted = null;
 this.id = FS.nextInode++;
 this.name = name;
 this.mode = mode;
 this.node_ops = {};
 this.stream_ops = {};
 this.rdev = rdev;
};

var readMode = 292 | 73;

var writeMode = 146;

Object.defineProperties(FSNode.prototype, {
 read: {
  get: function() {
   return (this.mode & readMode) === readMode;
  },
  set: function(val) {
   val ? this.mode |= readMode : this.mode &= ~readMode;
  }
 },
 write: {
  get: function() {
   return (this.mode & writeMode) === writeMode;
  },
  set: function(val) {
   val ? this.mode |= writeMode : this.mode &= ~writeMode;
  }
 },
 isFolder: {
  get: function() {
   return FS.isDir(this.mode);
  }
 },
 isDevice: {
  get: function() {
   return FS.isChrdev(this.mode);
  }
 }
});

FS.FSNode = FSNode;

FS.staticInit();

Module["FS_createFolder"] = FS.createFolder;

Module["FS_createPath"] = FS.createPath;

Module["FS_createDataFile"] = FS.createDataFile;

Module["FS_createPreloadedFile"] = FS.createPreloadedFile;

Module["FS_createLazyFile"] = FS.createLazyFile;

Module["FS_createLink"] = FS.createLink;

Module["FS_createDevice"] = FS.createDevice;

Module["FS_unlink"] = FS.unlink;

var ASSERTIONS = false;

function intArrayFromString(stringy, dontAddNull, length) {
 var len = length > 0 ? length : lengthBytesUTF8(stringy) + 1;
 var u8array = new Array(len);
 var numBytesWritten = stringToUTF8Array(stringy, u8array, 0, u8array.length);
 if (dontAddNull) u8array.length = numBytesWritten;
 return u8array;
}

var asmLibraryArg = {
 "__assert_fail": ___assert_fail,
 "__clock_gettime": ___clock_gettime,
 "__map_file": ___map_file,
 "__syscall10": ___syscall10,
 "__syscall125": ___syscall125,
 "__syscall15": ___syscall15,
 "__syscall183": ___syscall183,
 "__syscall195": ___syscall195,
 "__syscall196": ___syscall196,
 "__syscall197": ___syscall197,
 "__syscall20": ___syscall20,
 "__syscall220": ___syscall220,
 "__syscall221": ___syscall221,
 "__syscall3": ___syscall3,
 "__syscall33": ___syscall33,
 "__syscall38": ___syscall38,
 "__syscall39": ___syscall39,
 "__syscall40": ___syscall40,
 "__syscall5": ___syscall5,
 "__syscall54": ___syscall54,
 "__syscall83": ___syscall83,
 "__syscall85": ___syscall85,
 "__syscall9": ___syscall9,
 "__syscall91": ___syscall91,
 "abort": _abort,
 "emscripten_get_sbrk_ptr": _emscripten_get_sbrk_ptr,
 "emscripten_longjmp": _emscripten_longjmp,
 "emscripten_memcpy_big": _emscripten_memcpy_big,
 "emscripten_resize_heap": _emscripten_resize_heap,
 "environ_get": _environ_get,
 "environ_sizes_get": _environ_sizes_get,
 "exit": _exit,
 "fd_close": _fd_close,
 "fd_fdstat_get": _fd_fdstat_get,
 "fd_read": _fd_read,
 "fd_seek": _fd_seek,
 "fd_write": _fd_write,
 "getTempRet0": _getTempRet0,
 "gettimeofday": _gettimeofday,
 "invoke_iii": invoke_iii,
 "invoke_iiii": invoke_iiii,
 "invoke_iiiii": invoke_iiiii,
 "invoke_v": invoke_v,
 "invoke_vi": invoke_vi,
 "invoke_viiii": invoke_viiii,
 "memory": wasmMemory,
 "roundf": _roundf,
 "saveSetjmp": _saveSetjmp,
 "setTempRet0": _setTempRet0,
 "sysconf": _sysconf,
 "table": wasmTable,
 "testSetjmp": _testSetjmp,
 "time": _time
};

var asm = createWasm();

Module["asm"] = asm;

var ___wasm_call_ctors = Module["___wasm_call_ctors"] = function() {
 return (___wasm_call_ctors = Module["___wasm_call_ctors"] = Module["asm"]["__wasm_call_ctors"]).apply(null, arguments);
};

var _main = Module["_main"] = function() {
 return (_main = Module["_main"] = Module["asm"]["main"]).apply(null, arguments);
};

var _emscripten_bind_ASS_Event_get_Start_0 = Module["_emscripten_bind_ASS_Event_get_Start_0"] = function() {
 return (_emscripten_bind_ASS_Event_get_Start_0 = Module["_emscripten_bind_ASS_Event_get_Start_0"] = Module["asm"]["emscripten_bind_ASS_Event_get_Start_0"]).apply(null, arguments);
};

var _emscripten_bind_ASS_Event_set_Start_1 = Module["_emscripten_bind_ASS_Event_set_Start_1"] = function() {
 return (_emscripten_bind_ASS_Event_set_Start_1 = Module["_emscripten_bind_ASS_Event_set_Start_1"] = Module["asm"]["emscripten_bind_ASS_Event_set_Start_1"]).apply(null, arguments);
};

var _emscripten_bind_ASS_Event_get_Duration_0 = Module["_emscripten_bind_ASS_Event_get_Duration_0"] = function() {
 return (_emscripten_bind_ASS_Event_get_Duration_0 = Module["_emscripten_bind_ASS_Event_get_Duration_0"] = Module["asm"]["emscripten_bind_ASS_Event_get_Duration_0"]).apply(null, arguments);
};

var _emscripten_bind_ASS_Event_set_Duration_1 = Module["_emscripten_bind_ASS_Event_set_Duration_1"] = function() {
 return (_emscripten_bind_ASS_Event_set_Duration_1 = Module["_emscripten_bind_ASS_Event_set_Duration_1"] = Module["asm"]["emscripten_bind_ASS_Event_set_Duration_1"]).apply(null, arguments);
};

var _emscripten_bind_ASS_Event_get_ReadOrder_0 = Module["_emscripten_bind_ASS_Event_get_ReadOrder_0"] = function() {
 return (_emscripten_bind_ASS_Event_get_ReadOrder_0 = Module["_emscripten_bind_ASS_Event_get_ReadOrder_0"] = Module["asm"]["emscripten_bind_ASS_Event_get_ReadOrder_0"]).apply(null, arguments);
};

var _emscripten_bind_ASS_Event_set_ReadOrder_1 = Module["_emscripten_bind_ASS_Event_set_ReadOrder_1"] = function() {
 return (_emscripten_bind_ASS_Event_set_ReadOrder_1 = Module["_emscripten_bind_ASS_Event_set_ReadOrder_1"] = Module["asm"]["emscripten_bind_ASS_Event_set_ReadOrder_1"]).apply(null, arguments);
};

var _emscripten_bind_ASS_Event_get_Layer_0 = Module["_emscripten_bind_ASS_Event_get_Layer_0"] = function() {
 return (_emscripten_bind_ASS_Event_get_Layer_0 = Module["_emscripten_bind_ASS_Event_get_Layer_0"] = Module["asm"]["emscripten_bind_ASS_Event_get_Layer_0"]).apply(null, arguments);
};

var _emscripten_bind_ASS_Event_set_Layer_1 = Module["_emscripten_bind_ASS_Event_set_Layer_1"] = function() {
 return (_emscripten_bind_ASS_Event_set_Layer_1 = Module["_emscripten_bind_ASS_Event_set_Layer_1"] = Module["asm"]["emscripten_bind_ASS_Event_set_Layer_1"]).apply(null, arguments);
};

var _emscripten_bind_ASS_Event_get_Style_0 = Module["_emscripten_bind_ASS_Event_get_Style_0"] = function() {
 return (_emscripten_bind_ASS_Event_get_Style_0 = Module["_emscripten_bind_ASS_Event_get_Style_0"] = Module["asm"]["emscripten_bind_ASS_Event_get_Style_0"]).apply(null, arguments);
};

var _emscripten_bind_ASS_Event_set_Style_1 = Module["_emscripten_bind_ASS_Event_set_Style_1"] = function() {
 return (_emscripten_bind_ASS_Event_set_Style_1 = Module["_emscripten_bind_ASS_Event_set_Style_1"] = Module["asm"]["emscripten_bind_ASS_Event_set_Style_1"]).apply(null, arguments);
};

var _emscripten_bind_ASS_Event_get_Name_0 = Module["_emscripten_bind_ASS_Event_get_Name_0"] = function() {
 return (_emscripten_bind_ASS_Event_get_Name_0 = Module["_emscripten_bind_ASS_Event_get_Name_0"] = Module["asm"]["emscripten_bind_ASS_Event_get_Name_0"]).apply(null, arguments);
};

var _emscripten_bind_ASS_Event_set_Name_1 = Module["_emscripten_bind_ASS_Event_set_Name_1"] = function() {
 return (_emscripten_bind_ASS_Event_set_Name_1 = Module["_emscripten_bind_ASS_Event_set_Name_1"] = Module["asm"]["emscripten_bind_ASS_Event_set_Name_1"]).apply(null, arguments);
};

var _emscripten_bind_ASS_Event_get_MarginL_0 = Module["_emscripten_bind_ASS_Event_get_MarginL_0"] = function() {
 return (_emscripten_bind_ASS_Event_get_MarginL_0 = Module["_emscripten_bind_ASS_Event_get_MarginL_0"] = Module["asm"]["emscripten_bind_ASS_Event_get_MarginL_0"]).apply(null, arguments);
};

var _emscripten_bind_ASS_Event_set_MarginL_1 = Module["_emscripten_bind_ASS_Event_set_MarginL_1"] = function() {
 return (_emscripten_bind_ASS_Event_set_MarginL_1 = Module["_emscripten_bind_ASS_Event_set_MarginL_1"] = Module["asm"]["emscripten_bind_ASS_Event_set_MarginL_1"]).apply(null, arguments);
};

var _emscripten_bind_ASS_Event_get_MarginR_0 = Module["_emscripten_bind_ASS_Event_get_MarginR_0"] = function() {
 return (_emscripten_bind_ASS_Event_get_MarginR_0 = Module["_emscripten_bind_ASS_Event_get_MarginR_0"] = Module["asm"]["emscripten_bind_ASS_Event_get_MarginR_0"]).apply(null, arguments);
};

var _emscripten_bind_ASS_Event_set_MarginR_1 = Module["_emscripten_bind_ASS_Event_set_MarginR_1"] = function() {
 return (_emscripten_bind_ASS_Event_set_MarginR_1 = Module["_emscripten_bind_ASS_Event_set_MarginR_1"] = Module["asm"]["emscripten_bind_ASS_Event_set_MarginR_1"]).apply(null, arguments);
};

var _emscripten_bind_ASS_Event_get_MarginV_0 = Module["_emscripten_bind_ASS_Event_get_MarginV_0"] = function() {
 return (_emscripten_bind_ASS_Event_get_MarginV_0 = Module["_emscripten_bind_ASS_Event_get_MarginV_0"] = Module["asm"]["emscripten_bind_ASS_Event_get_MarginV_0"]).apply(null, arguments);
};

var _emscripten_bind_ASS_Event_set_MarginV_1 = Module["_emscripten_bind_ASS_Event_set_MarginV_1"] = function() {
 return (_emscripten_bind_ASS_Event_set_MarginV_1 = Module["_emscripten_bind_ASS_Event_set_MarginV_1"] = Module["asm"]["emscripten_bind_ASS_Event_set_MarginV_1"]).apply(null, arguments);
};

var _emscripten_bind_ASS_Event_get_Effect_0 = Module["_emscripten_bind_ASS_Event_get_Effect_0"] = function() {
 return (_emscripten_bind_ASS_Event_get_Effect_0 = Module["_emscripten_bind_ASS_Event_get_Effect_0"] = Module["asm"]["emscripten_bind_ASS_Event_get_Effect_0"]).apply(null, arguments);
};

var _emscripten_bind_ASS_Event_set_Effect_1 = Module["_emscripten_bind_ASS_Event_set_Effect_1"] = function() {
 return (_emscripten_bind_ASS_Event_set_Effect_1 = Module["_emscripten_bind_ASS_Event_set_Effect_1"] = Module["asm"]["emscripten_bind_ASS_Event_set_Effect_1"]).apply(null, arguments);
};

var _emscripten_bind_ASS_Event_get_Text_0 = Module["_emscripten_bind_ASS_Event_get_Text_0"] = function() {
 return (_emscripten_bind_ASS_Event_get_Text_0 = Module["_emscripten_bind_ASS_Event_get_Text_0"] = Module["asm"]["emscripten_bind_ASS_Event_get_Text_0"]).apply(null, arguments);
};

var _emscripten_bind_ASS_Event_set_Text_1 = Module["_emscripten_bind_ASS_Event_set_Text_1"] = function() {
 return (_emscripten_bind_ASS_Event_set_Text_1 = Module["_emscripten_bind_ASS_Event_set_Text_1"] = Module["asm"]["emscripten_bind_ASS_Event_set_Text_1"]).apply(null, arguments);
};

var _emscripten_bind_SubtitleOctopus_SubtitleOctopus_0 = Module["_emscripten_bind_SubtitleOctopus_SubtitleOctopus_0"] = function() {
 return (_emscripten_bind_SubtitleOctopus_SubtitleOctopus_0 = Module["_emscripten_bind_SubtitleOctopus_SubtitleOctopus_0"] = Module["asm"]["emscripten_bind_SubtitleOctopus_SubtitleOctopus_0"]).apply(null, arguments);
};

var _emscripten_bind_SubtitleOctopus_setLogLevel_1 = Module["_emscripten_bind_SubtitleOctopus_setLogLevel_1"] = function() {
 return (_emscripten_bind_SubtitleOctopus_setLogLevel_1 = Module["_emscripten_bind_SubtitleOctopus_setLogLevel_1"] = Module["asm"]["emscripten_bind_SubtitleOctopus_setLogLevel_1"]).apply(null, arguments);
};

var _emscripten_bind_SubtitleOctopus_initLibrary_2 = Module["_emscripten_bind_SubtitleOctopus_initLibrary_2"] = function() {
 return (_emscripten_bind_SubtitleOctopus_initLibrary_2 = Module["_emscripten_bind_SubtitleOctopus_initLibrary_2"] = Module["asm"]["emscripten_bind_SubtitleOctopus_initLibrary_2"]).apply(null, arguments);
};

var _emscripten_bind_SubtitleOctopus_createTrack_1 = Module["_emscripten_bind_SubtitleOctopus_createTrack_1"] = function() {
 return (_emscripten_bind_SubtitleOctopus_createTrack_1 = Module["_emscripten_bind_SubtitleOctopus_createTrack_1"] = Module["asm"]["emscripten_bind_SubtitleOctopus_createTrack_1"]).apply(null, arguments);
};

var _emscripten_bind_SubtitleOctopus_createTrackMem_2 = Module["_emscripten_bind_SubtitleOctopus_createTrackMem_2"] = function() {
 return (_emscripten_bind_SubtitleOctopus_createTrackMem_2 = Module["_emscripten_bind_SubtitleOctopus_createTrackMem_2"] = Module["asm"]["emscripten_bind_SubtitleOctopus_createTrackMem_2"]).apply(null, arguments);
};

var _emscripten_bind_SubtitleOctopus_removeTrack_0 = Module["_emscripten_bind_SubtitleOctopus_removeTrack_0"] = function() {
 return (_emscripten_bind_SubtitleOctopus_removeTrack_0 = Module["_emscripten_bind_SubtitleOctopus_removeTrack_0"] = Module["asm"]["emscripten_bind_SubtitleOctopus_removeTrack_0"]).apply(null, arguments);
};

var _emscripten_bind_SubtitleOctopus_resizeCanvas_2 = Module["_emscripten_bind_SubtitleOctopus_resizeCanvas_2"] = function() {
 return (_emscripten_bind_SubtitleOctopus_resizeCanvas_2 = Module["_emscripten_bind_SubtitleOctopus_resizeCanvas_2"] = Module["asm"]["emscripten_bind_SubtitleOctopus_resizeCanvas_2"]).apply(null, arguments);
};

var _emscripten_bind_SubtitleOctopus_renderImage_2 = Module["_emscripten_bind_SubtitleOctopus_renderImage_2"] = function() {
 return (_emscripten_bind_SubtitleOctopus_renderImage_2 = Module["_emscripten_bind_SubtitleOctopus_renderImage_2"] = Module["asm"]["emscripten_bind_SubtitleOctopus_renderImage_2"]).apply(null, arguments);
};

var _emscripten_bind_SubtitleOctopus_quitLibrary_0 = Module["_emscripten_bind_SubtitleOctopus_quitLibrary_0"] = function() {
 return (_emscripten_bind_SubtitleOctopus_quitLibrary_0 = Module["_emscripten_bind_SubtitleOctopus_quitLibrary_0"] = Module["asm"]["emscripten_bind_SubtitleOctopus_quitLibrary_0"]).apply(null, arguments);
};

var _emscripten_bind_SubtitleOctopus_reloadLibrary_0 = Module["_emscripten_bind_SubtitleOctopus_reloadLibrary_0"] = function() {
 return (_emscripten_bind_SubtitleOctopus_reloadLibrary_0 = Module["_emscripten_bind_SubtitleOctopus_reloadLibrary_0"] = Module["asm"]["emscripten_bind_SubtitleOctopus_reloadLibrary_0"]).apply(null, arguments);
};

var _emscripten_bind_SubtitleOctopus_reloadFonts_0 = Module["_emscripten_bind_SubtitleOctopus_reloadFonts_0"] = function() {
 return (_emscripten_bind_SubtitleOctopus_reloadFonts_0 = Module["_emscripten_bind_SubtitleOctopus_reloadFonts_0"] = Module["asm"]["emscripten_bind_SubtitleOctopus_reloadFonts_0"]).apply(null, arguments);
};

var _emscripten_bind_SubtitleOctopus_setMargin_4 = Module["_emscripten_bind_SubtitleOctopus_setMargin_4"] = function() {
 return (_emscripten_bind_SubtitleOctopus_setMargin_4 = Module["_emscripten_bind_SubtitleOctopus_setMargin_4"] = Module["asm"]["emscripten_bind_SubtitleOctopus_setMargin_4"]).apply(null, arguments);
};

var _emscripten_bind_SubtitleOctopus_getEventCount_0 = Module["_emscripten_bind_SubtitleOctopus_getEventCount_0"] = function() {
 return (_emscripten_bind_SubtitleOctopus_getEventCount_0 = Module["_emscripten_bind_SubtitleOctopus_getEventCount_0"] = Module["asm"]["emscripten_bind_SubtitleOctopus_getEventCount_0"]).apply(null, arguments);
};

var _emscripten_bind_SubtitleOctopus_allocEvent_0 = Module["_emscripten_bind_SubtitleOctopus_allocEvent_0"] = function() {
 return (_emscripten_bind_SubtitleOctopus_allocEvent_0 = Module["_emscripten_bind_SubtitleOctopus_allocEvent_0"] = Module["asm"]["emscripten_bind_SubtitleOctopus_allocEvent_0"]).apply(null, arguments);
};

var _emscripten_bind_SubtitleOctopus_allocStyle_0 = Module["_emscripten_bind_SubtitleOctopus_allocStyle_0"] = function() {
 return (_emscripten_bind_SubtitleOctopus_allocStyle_0 = Module["_emscripten_bind_SubtitleOctopus_allocStyle_0"] = Module["asm"]["emscripten_bind_SubtitleOctopus_allocStyle_0"]).apply(null, arguments);
};

var _emscripten_bind_SubtitleOctopus_removeEvent_1 = Module["_emscripten_bind_SubtitleOctopus_removeEvent_1"] = function() {
 return (_emscripten_bind_SubtitleOctopus_removeEvent_1 = Module["_emscripten_bind_SubtitleOctopus_removeEvent_1"] = Module["asm"]["emscripten_bind_SubtitleOctopus_removeEvent_1"]).apply(null, arguments);
};

var _emscripten_bind_SubtitleOctopus_getStyleCount_0 = Module["_emscripten_bind_SubtitleOctopus_getStyleCount_0"] = function() {
 return (_emscripten_bind_SubtitleOctopus_getStyleCount_0 = Module["_emscripten_bind_SubtitleOctopus_getStyleCount_0"] = Module["asm"]["emscripten_bind_SubtitleOctopus_getStyleCount_0"]).apply(null, arguments);
};

var _emscripten_bind_SubtitleOctopus_getStyleByName_1 = Module["_emscripten_bind_SubtitleOctopus_getStyleByName_1"] = function() {
 return (_emscripten_bind_SubtitleOctopus_getStyleByName_1 = Module["_emscripten_bind_SubtitleOctopus_getStyleByName_1"] = Module["asm"]["emscripten_bind_SubtitleOctopus_getStyleByName_1"]).apply(null, arguments);
};

var _emscripten_bind_SubtitleOctopus_removeStyle_1 = Module["_emscripten_bind_SubtitleOctopus_removeStyle_1"] = function() {
 return (_emscripten_bind_SubtitleOctopus_removeStyle_1 = Module["_emscripten_bind_SubtitleOctopus_removeStyle_1"] = Module["asm"]["emscripten_bind_SubtitleOctopus_removeStyle_1"]).apply(null, arguments);
};

var _emscripten_bind_SubtitleOctopus_removeAllEvents_0 = Module["_emscripten_bind_SubtitleOctopus_removeAllEvents_0"] = function() {
 return (_emscripten_bind_SubtitleOctopus_removeAllEvents_0 = Module["_emscripten_bind_SubtitleOctopus_removeAllEvents_0"] = Module["asm"]["emscripten_bind_SubtitleOctopus_removeAllEvents_0"]).apply(null, arguments);
};

var _emscripten_bind_SubtitleOctopus_get_track_0 = Module["_emscripten_bind_SubtitleOctopus_get_track_0"] = function() {
 return (_emscripten_bind_SubtitleOctopus_get_track_0 = Module["_emscripten_bind_SubtitleOctopus_get_track_0"] = Module["asm"]["emscripten_bind_SubtitleOctopus_get_track_0"]).apply(null, arguments);
};

var _emscripten_bind_SubtitleOctopus_set_track_1 = Module["_emscripten_bind_SubtitleOctopus_set_track_1"] = function() {
 return (_emscripten_bind_SubtitleOctopus_set_track_1 = Module["_emscripten_bind_SubtitleOctopus_set_track_1"] = Module["asm"]["emscripten_bind_SubtitleOctopus_set_track_1"]).apply(null, arguments);
};

var _emscripten_bind_SubtitleOctopus_get_ass_renderer_0 = Module["_emscripten_bind_SubtitleOctopus_get_ass_renderer_0"] = function() {
 return (_emscripten_bind_SubtitleOctopus_get_ass_renderer_0 = Module["_emscripten_bind_SubtitleOctopus_get_ass_renderer_0"] = Module["asm"]["emscripten_bind_SubtitleOctopus_get_ass_renderer_0"]).apply(null, arguments);
};

var _emscripten_bind_SubtitleOctopus_set_ass_renderer_1 = Module["_emscripten_bind_SubtitleOctopus_set_ass_renderer_1"] = function() {
 return (_emscripten_bind_SubtitleOctopus_set_ass_renderer_1 = Module["_emscripten_bind_SubtitleOctopus_set_ass_renderer_1"] = Module["asm"]["emscripten_bind_SubtitleOctopus_set_ass_renderer_1"]).apply(null, arguments);
};

var _emscripten_bind_SubtitleOctopus_get_ass_library_0 = Module["_emscripten_bind_SubtitleOctopus_get_ass_library_0"] = function() {
 return (_emscripten_bind_SubtitleOctopus_get_ass_library_0 = Module["_emscripten_bind_SubtitleOctopus_get_ass_library_0"] = Module["asm"]["emscripten_bind_SubtitleOctopus_get_ass_library_0"]).apply(null, arguments);
};

var _emscripten_bind_SubtitleOctopus_set_ass_library_1 = Module["_emscripten_bind_SubtitleOctopus_set_ass_library_1"] = function() {
 return (_emscripten_bind_SubtitleOctopus_set_ass_library_1 = Module["_emscripten_bind_SubtitleOctopus_set_ass_library_1"] = Module["asm"]["emscripten_bind_SubtitleOctopus_set_ass_library_1"]).apply(null, arguments);
};

var _emscripten_bind_SubtitleOctopus___destroy___0 = Module["_emscripten_bind_SubtitleOctopus___destroy___0"] = function() {
 return (_emscripten_bind_SubtitleOctopus___destroy___0 = Module["_emscripten_bind_SubtitleOctopus___destroy___0"] = Module["asm"]["emscripten_bind_SubtitleOctopus___destroy___0"]).apply(null, arguments);
};

var _emscripten_bind_ASS_Track_get_n_styles_0 = Module["_emscripten_bind_ASS_Track_get_n_styles_0"] = function() {
 return (_emscripten_bind_ASS_Track_get_n_styles_0 = Module["_emscripten_bind_ASS_Track_get_n_styles_0"] = Module["asm"]["emscripten_bind_ASS_Track_get_n_styles_0"]).apply(null, arguments);
};

var _emscripten_bind_ASS_Track_set_n_styles_1 = Module["_emscripten_bind_ASS_Track_set_n_styles_1"] = function() {
 return (_emscripten_bind_ASS_Track_set_n_styles_1 = Module["_emscripten_bind_ASS_Track_set_n_styles_1"] = Module["asm"]["emscripten_bind_ASS_Track_set_n_styles_1"]).apply(null, arguments);
};

var _emscripten_bind_ASS_Track_get_max_styles_0 = Module["_emscripten_bind_ASS_Track_get_max_styles_0"] = function() {
 return (_emscripten_bind_ASS_Track_get_max_styles_0 = Module["_emscripten_bind_ASS_Track_get_max_styles_0"] = Module["asm"]["emscripten_bind_ASS_Track_get_max_styles_0"]).apply(null, arguments);
};

var _emscripten_bind_ASS_Track_set_max_styles_1 = Module["_emscripten_bind_ASS_Track_set_max_styles_1"] = function() {
 return (_emscripten_bind_ASS_Track_set_max_styles_1 = Module["_emscripten_bind_ASS_Track_set_max_styles_1"] = Module["asm"]["emscripten_bind_ASS_Track_set_max_styles_1"]).apply(null, arguments);
};

var _emscripten_bind_ASS_Track_get_n_events_0 = Module["_emscripten_bind_ASS_Track_get_n_events_0"] = function() {
 return (_emscripten_bind_ASS_Track_get_n_events_0 = Module["_emscripten_bind_ASS_Track_get_n_events_0"] = Module["asm"]["emscripten_bind_ASS_Track_get_n_events_0"]).apply(null, arguments);
};

var _emscripten_bind_ASS_Track_set_n_events_1 = Module["_emscripten_bind_ASS_Track_set_n_events_1"] = function() {
 return (_emscripten_bind_ASS_Track_set_n_events_1 = Module["_emscripten_bind_ASS_Track_set_n_events_1"] = Module["asm"]["emscripten_bind_ASS_Track_set_n_events_1"]).apply(null, arguments);
};

var _emscripten_bind_ASS_Track_get_max_events_0 = Module["_emscripten_bind_ASS_Track_get_max_events_0"] = function() {
 return (_emscripten_bind_ASS_Track_get_max_events_0 = Module["_emscripten_bind_ASS_Track_get_max_events_0"] = Module["asm"]["emscripten_bind_ASS_Track_get_max_events_0"]).apply(null, arguments);
};

var _emscripten_bind_ASS_Track_set_max_events_1 = Module["_emscripten_bind_ASS_Track_set_max_events_1"] = function() {
 return (_emscripten_bind_ASS_Track_set_max_events_1 = Module["_emscripten_bind_ASS_Track_set_max_events_1"] = Module["asm"]["emscripten_bind_ASS_Track_set_max_events_1"]).apply(null, arguments);
};

var _emscripten_bind_ASS_Track_get_styles_1 = Module["_emscripten_bind_ASS_Track_get_styles_1"] = function() {
 return (_emscripten_bind_ASS_Track_get_styles_1 = Module["_emscripten_bind_ASS_Track_get_styles_1"] = Module["asm"]["emscripten_bind_ASS_Track_get_styles_1"]).apply(null, arguments);
};

var _emscripten_bind_ASS_Track_set_styles_2 = Module["_emscripten_bind_ASS_Track_set_styles_2"] = function() {
 return (_emscripten_bind_ASS_Track_set_styles_2 = Module["_emscripten_bind_ASS_Track_set_styles_2"] = Module["asm"]["emscripten_bind_ASS_Track_set_styles_2"]).apply(null, arguments);
};

var _emscripten_bind_ASS_Track_get_events_1 = Module["_emscripten_bind_ASS_Track_get_events_1"] = function() {
 return (_emscripten_bind_ASS_Track_get_events_1 = Module["_emscripten_bind_ASS_Track_get_events_1"] = Module["asm"]["emscripten_bind_ASS_Track_get_events_1"]).apply(null, arguments);
};

var _emscripten_bind_ASS_Track_set_events_2 = Module["_emscripten_bind_ASS_Track_set_events_2"] = function() {
 return (_emscripten_bind_ASS_Track_set_events_2 = Module["_emscripten_bind_ASS_Track_set_events_2"] = Module["asm"]["emscripten_bind_ASS_Track_set_events_2"]).apply(null, arguments);
};

var _emscripten_bind_ASS_Track_get_style_format_0 = Module["_emscripten_bind_ASS_Track_get_style_format_0"] = function() {
 return (_emscripten_bind_ASS_Track_get_style_format_0 = Module["_emscripten_bind_ASS_Track_get_style_format_0"] = Module["asm"]["emscripten_bind_ASS_Track_get_style_format_0"]).apply(null, arguments);
};

var _emscripten_bind_ASS_Track_set_style_format_1 = Module["_emscripten_bind_ASS_Track_set_style_format_1"] = function() {
 return (_emscripten_bind_ASS_Track_set_style_format_1 = Module["_emscripten_bind_ASS_Track_set_style_format_1"] = Module["asm"]["emscripten_bind_ASS_Track_set_style_format_1"]).apply(null, arguments);
};

var _emscripten_bind_ASS_Track_get_event_format_0 = Module["_emscripten_bind_ASS_Track_get_event_format_0"] = function() {
 return (_emscripten_bind_ASS_Track_get_event_format_0 = Module["_emscripten_bind_ASS_Track_get_event_format_0"] = Module["asm"]["emscripten_bind_ASS_Track_get_event_format_0"]).apply(null, arguments);
};

var _emscripten_bind_ASS_Track_set_event_format_1 = Module["_emscripten_bind_ASS_Track_set_event_format_1"] = function() {
 return (_emscripten_bind_ASS_Track_set_event_format_1 = Module["_emscripten_bind_ASS_Track_set_event_format_1"] = Module["asm"]["emscripten_bind_ASS_Track_set_event_format_1"]).apply(null, arguments);
};

var _emscripten_bind_ASS_Track_get_PlayResX_0 = Module["_emscripten_bind_ASS_Track_get_PlayResX_0"] = function() {
 return (_emscripten_bind_ASS_Track_get_PlayResX_0 = Module["_emscripten_bind_ASS_Track_get_PlayResX_0"] = Module["asm"]["emscripten_bind_ASS_Track_get_PlayResX_0"]).apply(null, arguments);
};

var _emscripten_bind_ASS_Track_set_PlayResX_1 = Module["_emscripten_bind_ASS_Track_set_PlayResX_1"] = function() {
 return (_emscripten_bind_ASS_Track_set_PlayResX_1 = Module["_emscripten_bind_ASS_Track_set_PlayResX_1"] = Module["asm"]["emscripten_bind_ASS_Track_set_PlayResX_1"]).apply(null, arguments);
};

var _emscripten_bind_ASS_Track_get_PlayResY_0 = Module["_emscripten_bind_ASS_Track_get_PlayResY_0"] = function() {
 return (_emscripten_bind_ASS_Track_get_PlayResY_0 = Module["_emscripten_bind_ASS_Track_get_PlayResY_0"] = Module["asm"]["emscripten_bind_ASS_Track_get_PlayResY_0"]).apply(null, arguments);
};

var _emscripten_bind_ASS_Track_set_PlayResY_1 = Module["_emscripten_bind_ASS_Track_set_PlayResY_1"] = function() {
 return (_emscripten_bind_ASS_Track_set_PlayResY_1 = Module["_emscripten_bind_ASS_Track_set_PlayResY_1"] = Module["asm"]["emscripten_bind_ASS_Track_set_PlayResY_1"]).apply(null, arguments);
};

var _emscripten_bind_ASS_Track_get_Timer_0 = Module["_emscripten_bind_ASS_Track_get_Timer_0"] = function() {
 return (_emscripten_bind_ASS_Track_get_Timer_0 = Module["_emscripten_bind_ASS_Track_get_Timer_0"] = Module["asm"]["emscripten_bind_ASS_Track_get_Timer_0"]).apply(null, arguments);
};

var _emscripten_bind_ASS_Track_set_Timer_1 = Module["_emscripten_bind_ASS_Track_set_Timer_1"] = function() {
 return (_emscripten_bind_ASS_Track_set_Timer_1 = Module["_emscripten_bind_ASS_Track_set_Timer_1"] = Module["asm"]["emscripten_bind_ASS_Track_set_Timer_1"]).apply(null, arguments);
};

var _emscripten_bind_ASS_Track_get_WrapStyle_0 = Module["_emscripten_bind_ASS_Track_get_WrapStyle_0"] = function() {
 return (_emscripten_bind_ASS_Track_get_WrapStyle_0 = Module["_emscripten_bind_ASS_Track_get_WrapStyle_0"] = Module["asm"]["emscripten_bind_ASS_Track_get_WrapStyle_0"]).apply(null, arguments);
};

var _emscripten_bind_ASS_Track_set_WrapStyle_1 = Module["_emscripten_bind_ASS_Track_set_WrapStyle_1"] = function() {
 return (_emscripten_bind_ASS_Track_set_WrapStyle_1 = Module["_emscripten_bind_ASS_Track_set_WrapStyle_1"] = Module["asm"]["emscripten_bind_ASS_Track_set_WrapStyle_1"]).apply(null, arguments);
};

var _emscripten_bind_ASS_Track_get_ScaledBorderAndShadow_0 = Module["_emscripten_bind_ASS_Track_get_ScaledBorderAndShadow_0"] = function() {
 return (_emscripten_bind_ASS_Track_get_ScaledBorderAndShadow_0 = Module["_emscripten_bind_ASS_Track_get_ScaledBorderAndShadow_0"] = Module["asm"]["emscripten_bind_ASS_Track_get_ScaledBorderAndShadow_0"]).apply(null, arguments);
};

var _emscripten_bind_ASS_Track_set_ScaledBorderAndShadow_1 = Module["_emscripten_bind_ASS_Track_set_ScaledBorderAndShadow_1"] = function() {
 return (_emscripten_bind_ASS_Track_set_ScaledBorderAndShadow_1 = Module["_emscripten_bind_ASS_Track_set_ScaledBorderAndShadow_1"] = Module["asm"]["emscripten_bind_ASS_Track_set_ScaledBorderAndShadow_1"]).apply(null, arguments);
};

var _emscripten_bind_ASS_Track_get_Kerning_0 = Module["_emscripten_bind_ASS_Track_get_Kerning_0"] = function() {
 return (_emscripten_bind_ASS_Track_get_Kerning_0 = Module["_emscripten_bind_ASS_Track_get_Kerning_0"] = Module["asm"]["emscripten_bind_ASS_Track_get_Kerning_0"]).apply(null, arguments);
};

var _emscripten_bind_ASS_Track_set_Kerning_1 = Module["_emscripten_bind_ASS_Track_set_Kerning_1"] = function() {
 return (_emscripten_bind_ASS_Track_set_Kerning_1 = Module["_emscripten_bind_ASS_Track_set_Kerning_1"] = Module["asm"]["emscripten_bind_ASS_Track_set_Kerning_1"]).apply(null, arguments);
};

var _emscripten_bind_ASS_Track_get_Language_0 = Module["_emscripten_bind_ASS_Track_get_Language_0"] = function() {
 return (_emscripten_bind_ASS_Track_get_Language_0 = Module["_emscripten_bind_ASS_Track_get_Language_0"] = Module["asm"]["emscripten_bind_ASS_Track_get_Language_0"]).apply(null, arguments);
};

var _emscripten_bind_ASS_Track_set_Language_1 = Module["_emscripten_bind_ASS_Track_set_Language_1"] = function() {
 return (_emscripten_bind_ASS_Track_set_Language_1 = Module["_emscripten_bind_ASS_Track_set_Language_1"] = Module["asm"]["emscripten_bind_ASS_Track_set_Language_1"]).apply(null, arguments);
};

var _emscripten_bind_ASS_Track_get_default_style_0 = Module["_emscripten_bind_ASS_Track_get_default_style_0"] = function() {
 return (_emscripten_bind_ASS_Track_get_default_style_0 = Module["_emscripten_bind_ASS_Track_get_default_style_0"] = Module["asm"]["emscripten_bind_ASS_Track_get_default_style_0"]).apply(null, arguments);
};

var _emscripten_bind_ASS_Track_set_default_style_1 = Module["_emscripten_bind_ASS_Track_set_default_style_1"] = function() {
 return (_emscripten_bind_ASS_Track_set_default_style_1 = Module["_emscripten_bind_ASS_Track_set_default_style_1"] = Module["asm"]["emscripten_bind_ASS_Track_set_default_style_1"]).apply(null, arguments);
};

var _emscripten_bind_ASS_Track_get_name_0 = Module["_emscripten_bind_ASS_Track_get_name_0"] = function() {
 return (_emscripten_bind_ASS_Track_get_name_0 = Module["_emscripten_bind_ASS_Track_get_name_0"] = Module["asm"]["emscripten_bind_ASS_Track_get_name_0"]).apply(null, arguments);
};

var _emscripten_bind_ASS_Track_set_name_1 = Module["_emscripten_bind_ASS_Track_set_name_1"] = function() {
 return (_emscripten_bind_ASS_Track_set_name_1 = Module["_emscripten_bind_ASS_Track_set_name_1"] = Module["asm"]["emscripten_bind_ASS_Track_set_name_1"]).apply(null, arguments);
};

var _emscripten_bind_ASS_Style_get_Name_0 = Module["_emscripten_bind_ASS_Style_get_Name_0"] = function() {
 return (_emscripten_bind_ASS_Style_get_Name_0 = Module["_emscripten_bind_ASS_Style_get_Name_0"] = Module["asm"]["emscripten_bind_ASS_Style_get_Name_0"]).apply(null, arguments);
};

var _emscripten_bind_ASS_Style_set_Name_1 = Module["_emscripten_bind_ASS_Style_set_Name_1"] = function() {
 return (_emscripten_bind_ASS_Style_set_Name_1 = Module["_emscripten_bind_ASS_Style_set_Name_1"] = Module["asm"]["emscripten_bind_ASS_Style_set_Name_1"]).apply(null, arguments);
};

var _emscripten_bind_ASS_Style_get_FontName_0 = Module["_emscripten_bind_ASS_Style_get_FontName_0"] = function() {
 return (_emscripten_bind_ASS_Style_get_FontName_0 = Module["_emscripten_bind_ASS_Style_get_FontName_0"] = Module["asm"]["emscripten_bind_ASS_Style_get_FontName_0"]).apply(null, arguments);
};

var _emscripten_bind_ASS_Style_set_FontName_1 = Module["_emscripten_bind_ASS_Style_set_FontName_1"] = function() {
 return (_emscripten_bind_ASS_Style_set_FontName_1 = Module["_emscripten_bind_ASS_Style_set_FontName_1"] = Module["asm"]["emscripten_bind_ASS_Style_set_FontName_1"]).apply(null, arguments);
};

var _emscripten_bind_ASS_Style_get_FontSize_0 = Module["_emscripten_bind_ASS_Style_get_FontSize_0"] = function() {
 return (_emscripten_bind_ASS_Style_get_FontSize_0 = Module["_emscripten_bind_ASS_Style_get_FontSize_0"] = Module["asm"]["emscripten_bind_ASS_Style_get_FontSize_0"]).apply(null, arguments);
};

var _emscripten_bind_ASS_Style_set_FontSize_1 = Module["_emscripten_bind_ASS_Style_set_FontSize_1"] = function() {
 return (_emscripten_bind_ASS_Style_set_FontSize_1 = Module["_emscripten_bind_ASS_Style_set_FontSize_1"] = Module["asm"]["emscripten_bind_ASS_Style_set_FontSize_1"]).apply(null, arguments);
};

var _emscripten_bind_ASS_Style_get_PrimaryColour_0 = Module["_emscripten_bind_ASS_Style_get_PrimaryColour_0"] = function() {
 return (_emscripten_bind_ASS_Style_get_PrimaryColour_0 = Module["_emscripten_bind_ASS_Style_get_PrimaryColour_0"] = Module["asm"]["emscripten_bind_ASS_Style_get_PrimaryColour_0"]).apply(null, arguments);
};

var _emscripten_bind_ASS_Style_set_PrimaryColour_1 = Module["_emscripten_bind_ASS_Style_set_PrimaryColour_1"] = function() {
 return (_emscripten_bind_ASS_Style_set_PrimaryColour_1 = Module["_emscripten_bind_ASS_Style_set_PrimaryColour_1"] = Module["asm"]["emscripten_bind_ASS_Style_set_PrimaryColour_1"]).apply(null, arguments);
};

var _emscripten_bind_ASS_Style_get_SecondaryColour_0 = Module["_emscripten_bind_ASS_Style_get_SecondaryColour_0"] = function() {
 return (_emscripten_bind_ASS_Style_get_SecondaryColour_0 = Module["_emscripten_bind_ASS_Style_get_SecondaryColour_0"] = Module["asm"]["emscripten_bind_ASS_Style_get_SecondaryColour_0"]).apply(null, arguments);
};

var _emscripten_bind_ASS_Style_set_SecondaryColour_1 = Module["_emscripten_bind_ASS_Style_set_SecondaryColour_1"] = function() {
 return (_emscripten_bind_ASS_Style_set_SecondaryColour_1 = Module["_emscripten_bind_ASS_Style_set_SecondaryColour_1"] = Module["asm"]["emscripten_bind_ASS_Style_set_SecondaryColour_1"]).apply(null, arguments);
};

var _emscripten_bind_ASS_Style_get_OutlineColour_0 = Module["_emscripten_bind_ASS_Style_get_OutlineColour_0"] = function() {
 return (_emscripten_bind_ASS_Style_get_OutlineColour_0 = Module["_emscripten_bind_ASS_Style_get_OutlineColour_0"] = Module["asm"]["emscripten_bind_ASS_Style_get_OutlineColour_0"]).apply(null, arguments);
};

var _emscripten_bind_ASS_Style_set_OutlineColour_1 = Module["_emscripten_bind_ASS_Style_set_OutlineColour_1"] = function() {
 return (_emscripten_bind_ASS_Style_set_OutlineColour_1 = Module["_emscripten_bind_ASS_Style_set_OutlineColour_1"] = Module["asm"]["emscripten_bind_ASS_Style_set_OutlineColour_1"]).apply(null, arguments);
};

var _emscripten_bind_ASS_Style_get_BackColour_0 = Module["_emscripten_bind_ASS_Style_get_BackColour_0"] = function() {
 return (_emscripten_bind_ASS_Style_get_BackColour_0 = Module["_emscripten_bind_ASS_Style_get_BackColour_0"] = Module["asm"]["emscripten_bind_ASS_Style_get_BackColour_0"]).apply(null, arguments);
};

var _emscripten_bind_ASS_Style_set_BackColour_1 = Module["_emscripten_bind_ASS_Style_set_BackColour_1"] = function() {
 return (_emscripten_bind_ASS_Style_set_BackColour_1 = Module["_emscripten_bind_ASS_Style_set_BackColour_1"] = Module["asm"]["emscripten_bind_ASS_Style_set_BackColour_1"]).apply(null, arguments);
};

var _emscripten_bind_ASS_Style_get_Bold_0 = Module["_emscripten_bind_ASS_Style_get_Bold_0"] = function() {
 return (_emscripten_bind_ASS_Style_get_Bold_0 = Module["_emscripten_bind_ASS_Style_get_Bold_0"] = Module["asm"]["emscripten_bind_ASS_Style_get_Bold_0"]).apply(null, arguments);
};

var _emscripten_bind_ASS_Style_set_Bold_1 = Module["_emscripten_bind_ASS_Style_set_Bold_1"] = function() {
 return (_emscripten_bind_ASS_Style_set_Bold_1 = Module["_emscripten_bind_ASS_Style_set_Bold_1"] = Module["asm"]["emscripten_bind_ASS_Style_set_Bold_1"]).apply(null, arguments);
};

var _emscripten_bind_ASS_Style_get_Italic_0 = Module["_emscripten_bind_ASS_Style_get_Italic_0"] = function() {
 return (_emscripten_bind_ASS_Style_get_Italic_0 = Module["_emscripten_bind_ASS_Style_get_Italic_0"] = Module["asm"]["emscripten_bind_ASS_Style_get_Italic_0"]).apply(null, arguments);
};

var _emscripten_bind_ASS_Style_set_Italic_1 = Module["_emscripten_bind_ASS_Style_set_Italic_1"] = function() {
 return (_emscripten_bind_ASS_Style_set_Italic_1 = Module["_emscripten_bind_ASS_Style_set_Italic_1"] = Module["asm"]["emscripten_bind_ASS_Style_set_Italic_1"]).apply(null, arguments);
};

var _emscripten_bind_ASS_Style_get_Underline_0 = Module["_emscripten_bind_ASS_Style_get_Underline_0"] = function() {
 return (_emscripten_bind_ASS_Style_get_Underline_0 = Module["_emscripten_bind_ASS_Style_get_Underline_0"] = Module["asm"]["emscripten_bind_ASS_Style_get_Underline_0"]).apply(null, arguments);
};

var _emscripten_bind_ASS_Style_set_Underline_1 = Module["_emscripten_bind_ASS_Style_set_Underline_1"] = function() {
 return (_emscripten_bind_ASS_Style_set_Underline_1 = Module["_emscripten_bind_ASS_Style_set_Underline_1"] = Module["asm"]["emscripten_bind_ASS_Style_set_Underline_1"]).apply(null, arguments);
};

var _emscripten_bind_ASS_Style_get_StrikeOut_0 = Module["_emscripten_bind_ASS_Style_get_StrikeOut_0"] = function() {
 return (_emscripten_bind_ASS_Style_get_StrikeOut_0 = Module["_emscripten_bind_ASS_Style_get_StrikeOut_0"] = Module["asm"]["emscripten_bind_ASS_Style_get_StrikeOut_0"]).apply(null, arguments);
};

var _emscripten_bind_ASS_Style_set_StrikeOut_1 = Module["_emscripten_bind_ASS_Style_set_StrikeOut_1"] = function() {
 return (_emscripten_bind_ASS_Style_set_StrikeOut_1 = Module["_emscripten_bind_ASS_Style_set_StrikeOut_1"] = Module["asm"]["emscripten_bind_ASS_Style_set_StrikeOut_1"]).apply(null, arguments);
};

var _emscripten_bind_ASS_Style_get_ScaleX_0 = Module["_emscripten_bind_ASS_Style_get_ScaleX_0"] = function() {
 return (_emscripten_bind_ASS_Style_get_ScaleX_0 = Module["_emscripten_bind_ASS_Style_get_ScaleX_0"] = Module["asm"]["emscripten_bind_ASS_Style_get_ScaleX_0"]).apply(null, arguments);
};

var _emscripten_bind_ASS_Style_set_ScaleX_1 = Module["_emscripten_bind_ASS_Style_set_ScaleX_1"] = function() {
 return (_emscripten_bind_ASS_Style_set_ScaleX_1 = Module["_emscripten_bind_ASS_Style_set_ScaleX_1"] = Module["asm"]["emscripten_bind_ASS_Style_set_ScaleX_1"]).apply(null, arguments);
};

var _emscripten_bind_ASS_Style_get_ScaleY_0 = Module["_emscripten_bind_ASS_Style_get_ScaleY_0"] = function() {
 return (_emscripten_bind_ASS_Style_get_ScaleY_0 = Module["_emscripten_bind_ASS_Style_get_ScaleY_0"] = Module["asm"]["emscripten_bind_ASS_Style_get_ScaleY_0"]).apply(null, arguments);
};

var _emscripten_bind_ASS_Style_set_ScaleY_1 = Module["_emscripten_bind_ASS_Style_set_ScaleY_1"] = function() {
 return (_emscripten_bind_ASS_Style_set_ScaleY_1 = Module["_emscripten_bind_ASS_Style_set_ScaleY_1"] = Module["asm"]["emscripten_bind_ASS_Style_set_ScaleY_1"]).apply(null, arguments);
};

var _emscripten_bind_ASS_Style_get_Spacing_0 = Module["_emscripten_bind_ASS_Style_get_Spacing_0"] = function() {
 return (_emscripten_bind_ASS_Style_get_Spacing_0 = Module["_emscripten_bind_ASS_Style_get_Spacing_0"] = Module["asm"]["emscripten_bind_ASS_Style_get_Spacing_0"]).apply(null, arguments);
};

var _emscripten_bind_ASS_Style_set_Spacing_1 = Module["_emscripten_bind_ASS_Style_set_Spacing_1"] = function() {
 return (_emscripten_bind_ASS_Style_set_Spacing_1 = Module["_emscripten_bind_ASS_Style_set_Spacing_1"] = Module["asm"]["emscripten_bind_ASS_Style_set_Spacing_1"]).apply(null, arguments);
};

var _emscripten_bind_ASS_Style_get_Angle_0 = Module["_emscripten_bind_ASS_Style_get_Angle_0"] = function() {
 return (_emscripten_bind_ASS_Style_get_Angle_0 = Module["_emscripten_bind_ASS_Style_get_Angle_0"] = Module["asm"]["emscripten_bind_ASS_Style_get_Angle_0"]).apply(null, arguments);
};

var _emscripten_bind_ASS_Style_set_Angle_1 = Module["_emscripten_bind_ASS_Style_set_Angle_1"] = function() {
 return (_emscripten_bind_ASS_Style_set_Angle_1 = Module["_emscripten_bind_ASS_Style_set_Angle_1"] = Module["asm"]["emscripten_bind_ASS_Style_set_Angle_1"]).apply(null, arguments);
};

var _emscripten_bind_ASS_Style_get_BorderStyle_0 = Module["_emscripten_bind_ASS_Style_get_BorderStyle_0"] = function() {
 return (_emscripten_bind_ASS_Style_get_BorderStyle_0 = Module["_emscripten_bind_ASS_Style_get_BorderStyle_0"] = Module["asm"]["emscripten_bind_ASS_Style_get_BorderStyle_0"]).apply(null, arguments);
};

var _emscripten_bind_ASS_Style_set_BorderStyle_1 = Module["_emscripten_bind_ASS_Style_set_BorderStyle_1"] = function() {
 return (_emscripten_bind_ASS_Style_set_BorderStyle_1 = Module["_emscripten_bind_ASS_Style_set_BorderStyle_1"] = Module["asm"]["emscripten_bind_ASS_Style_set_BorderStyle_1"]).apply(null, arguments);
};

var _emscripten_bind_ASS_Style_get_Outline_0 = Module["_emscripten_bind_ASS_Style_get_Outline_0"] = function() {
 return (_emscripten_bind_ASS_Style_get_Outline_0 = Module["_emscripten_bind_ASS_Style_get_Outline_0"] = Module["asm"]["emscripten_bind_ASS_Style_get_Outline_0"]).apply(null, arguments);
};

var _emscripten_bind_ASS_Style_set_Outline_1 = Module["_emscripten_bind_ASS_Style_set_Outline_1"] = function() {
 return (_emscripten_bind_ASS_Style_set_Outline_1 = Module["_emscripten_bind_ASS_Style_set_Outline_1"] = Module["asm"]["emscripten_bind_ASS_Style_set_Outline_1"]).apply(null, arguments);
};

var _emscripten_bind_ASS_Style_get_Shadow_0 = Module["_emscripten_bind_ASS_Style_get_Shadow_0"] = function() {
 return (_emscripten_bind_ASS_Style_get_Shadow_0 = Module["_emscripten_bind_ASS_Style_get_Shadow_0"] = Module["asm"]["emscripten_bind_ASS_Style_get_Shadow_0"]).apply(null, arguments);
};

var _emscripten_bind_ASS_Style_set_Shadow_1 = Module["_emscripten_bind_ASS_Style_set_Shadow_1"] = function() {
 return (_emscripten_bind_ASS_Style_set_Shadow_1 = Module["_emscripten_bind_ASS_Style_set_Shadow_1"] = Module["asm"]["emscripten_bind_ASS_Style_set_Shadow_1"]).apply(null, arguments);
};

var _emscripten_bind_ASS_Style_get_Alignment_0 = Module["_emscripten_bind_ASS_Style_get_Alignment_0"] = function() {
 return (_emscripten_bind_ASS_Style_get_Alignment_0 = Module["_emscripten_bind_ASS_Style_get_Alignment_0"] = Module["asm"]["emscripten_bind_ASS_Style_get_Alignment_0"]).apply(null, arguments);
};

var _emscripten_bind_ASS_Style_set_Alignment_1 = Module["_emscripten_bind_ASS_Style_set_Alignment_1"] = function() {
 return (_emscripten_bind_ASS_Style_set_Alignment_1 = Module["_emscripten_bind_ASS_Style_set_Alignment_1"] = Module["asm"]["emscripten_bind_ASS_Style_set_Alignment_1"]).apply(null, arguments);
};

var _emscripten_bind_ASS_Style_get_MarginL_0 = Module["_emscripten_bind_ASS_Style_get_MarginL_0"] = function() {
 return (_emscripten_bind_ASS_Style_get_MarginL_0 = Module["_emscripten_bind_ASS_Style_get_MarginL_0"] = Module["asm"]["emscripten_bind_ASS_Style_get_MarginL_0"]).apply(null, arguments);
};

var _emscripten_bind_ASS_Style_set_MarginL_1 = Module["_emscripten_bind_ASS_Style_set_MarginL_1"] = function() {
 return (_emscripten_bind_ASS_Style_set_MarginL_1 = Module["_emscripten_bind_ASS_Style_set_MarginL_1"] = Module["asm"]["emscripten_bind_ASS_Style_set_MarginL_1"]).apply(null, arguments);
};

var _emscripten_bind_ASS_Style_get_MarginR_0 = Module["_emscripten_bind_ASS_Style_get_MarginR_0"] = function() {
 return (_emscripten_bind_ASS_Style_get_MarginR_0 = Module["_emscripten_bind_ASS_Style_get_MarginR_0"] = Module["asm"]["emscripten_bind_ASS_Style_get_MarginR_0"]).apply(null, arguments);
};

var _emscripten_bind_ASS_Style_set_MarginR_1 = Module["_emscripten_bind_ASS_Style_set_MarginR_1"] = function() {
 return (_emscripten_bind_ASS_Style_set_MarginR_1 = Module["_emscripten_bind_ASS_Style_set_MarginR_1"] = Module["asm"]["emscripten_bind_ASS_Style_set_MarginR_1"]).apply(null, arguments);
};

var _emscripten_bind_ASS_Style_get_MarginV_0 = Module["_emscripten_bind_ASS_Style_get_MarginV_0"] = function() {
 return (_emscripten_bind_ASS_Style_get_MarginV_0 = Module["_emscripten_bind_ASS_Style_get_MarginV_0"] = Module["asm"]["emscripten_bind_ASS_Style_get_MarginV_0"]).apply(null, arguments);
};

var _emscripten_bind_ASS_Style_set_MarginV_1 = Module["_emscripten_bind_ASS_Style_set_MarginV_1"] = function() {
 return (_emscripten_bind_ASS_Style_set_MarginV_1 = Module["_emscripten_bind_ASS_Style_set_MarginV_1"] = Module["asm"]["emscripten_bind_ASS_Style_set_MarginV_1"]).apply(null, arguments);
};

var _emscripten_bind_ASS_Style_get_Encoding_0 = Module["_emscripten_bind_ASS_Style_get_Encoding_0"] = function() {
 return (_emscripten_bind_ASS_Style_get_Encoding_0 = Module["_emscripten_bind_ASS_Style_get_Encoding_0"] = Module["asm"]["emscripten_bind_ASS_Style_get_Encoding_0"]).apply(null, arguments);
};

var _emscripten_bind_ASS_Style_set_Encoding_1 = Module["_emscripten_bind_ASS_Style_set_Encoding_1"] = function() {
 return (_emscripten_bind_ASS_Style_set_Encoding_1 = Module["_emscripten_bind_ASS_Style_set_Encoding_1"] = Module["asm"]["emscripten_bind_ASS_Style_set_Encoding_1"]).apply(null, arguments);
};

var _emscripten_bind_ASS_Style_get_treat_fontname_as_pattern_0 = Module["_emscripten_bind_ASS_Style_get_treat_fontname_as_pattern_0"] = function() {
 return (_emscripten_bind_ASS_Style_get_treat_fontname_as_pattern_0 = Module["_emscripten_bind_ASS_Style_get_treat_fontname_as_pattern_0"] = Module["asm"]["emscripten_bind_ASS_Style_get_treat_fontname_as_pattern_0"]).apply(null, arguments);
};

var _emscripten_bind_ASS_Style_set_treat_fontname_as_pattern_1 = Module["_emscripten_bind_ASS_Style_set_treat_fontname_as_pattern_1"] = function() {
 return (_emscripten_bind_ASS_Style_set_treat_fontname_as_pattern_1 = Module["_emscripten_bind_ASS_Style_set_treat_fontname_as_pattern_1"] = Module["asm"]["emscripten_bind_ASS_Style_set_treat_fontname_as_pattern_1"]).apply(null, arguments);
};

var _emscripten_bind_ASS_Style_get_Blur_0 = Module["_emscripten_bind_ASS_Style_get_Blur_0"] = function() {
 return (_emscripten_bind_ASS_Style_get_Blur_0 = Module["_emscripten_bind_ASS_Style_get_Blur_0"] = Module["asm"]["emscripten_bind_ASS_Style_get_Blur_0"]).apply(null, arguments);
};

var _emscripten_bind_ASS_Style_set_Blur_1 = Module["_emscripten_bind_ASS_Style_set_Blur_1"] = function() {
 return (_emscripten_bind_ASS_Style_set_Blur_1 = Module["_emscripten_bind_ASS_Style_set_Blur_1"] = Module["asm"]["emscripten_bind_ASS_Style_set_Blur_1"]).apply(null, arguments);
};

var _emscripten_bind_ASS_Style_get_Justify_0 = Module["_emscripten_bind_ASS_Style_get_Justify_0"] = function() {
 return (_emscripten_bind_ASS_Style_get_Justify_0 = Module["_emscripten_bind_ASS_Style_get_Justify_0"] = Module["asm"]["emscripten_bind_ASS_Style_get_Justify_0"]).apply(null, arguments);
};

var _emscripten_bind_ASS_Style_set_Justify_1 = Module["_emscripten_bind_ASS_Style_set_Justify_1"] = function() {
 return (_emscripten_bind_ASS_Style_set_Justify_1 = Module["_emscripten_bind_ASS_Style_set_Justify_1"] = Module["asm"]["emscripten_bind_ASS_Style_set_Justify_1"]).apply(null, arguments);
};

var _emscripten_bind_ASS_Image_get_w_0 = Module["_emscripten_bind_ASS_Image_get_w_0"] = function() {
 return (_emscripten_bind_ASS_Image_get_w_0 = Module["_emscripten_bind_ASS_Image_get_w_0"] = Module["asm"]["emscripten_bind_ASS_Image_get_w_0"]).apply(null, arguments);
};

var _emscripten_bind_ASS_Image_set_w_1 = Module["_emscripten_bind_ASS_Image_set_w_1"] = function() {
 return (_emscripten_bind_ASS_Image_set_w_1 = Module["_emscripten_bind_ASS_Image_set_w_1"] = Module["asm"]["emscripten_bind_ASS_Image_set_w_1"]).apply(null, arguments);
};

var _emscripten_bind_ASS_Image_get_h_0 = Module["_emscripten_bind_ASS_Image_get_h_0"] = function() {
 return (_emscripten_bind_ASS_Image_get_h_0 = Module["_emscripten_bind_ASS_Image_get_h_0"] = Module["asm"]["emscripten_bind_ASS_Image_get_h_0"]).apply(null, arguments);
};

var _emscripten_bind_ASS_Image_set_h_1 = Module["_emscripten_bind_ASS_Image_set_h_1"] = function() {
 return (_emscripten_bind_ASS_Image_set_h_1 = Module["_emscripten_bind_ASS_Image_set_h_1"] = Module["asm"]["emscripten_bind_ASS_Image_set_h_1"]).apply(null, arguments);
};

var _emscripten_bind_ASS_Image_get_stride_0 = Module["_emscripten_bind_ASS_Image_get_stride_0"] = function() {
 return (_emscripten_bind_ASS_Image_get_stride_0 = Module["_emscripten_bind_ASS_Image_get_stride_0"] = Module["asm"]["emscripten_bind_ASS_Image_get_stride_0"]).apply(null, arguments);
};

var _emscripten_bind_ASS_Image_set_stride_1 = Module["_emscripten_bind_ASS_Image_set_stride_1"] = function() {
 return (_emscripten_bind_ASS_Image_set_stride_1 = Module["_emscripten_bind_ASS_Image_set_stride_1"] = Module["asm"]["emscripten_bind_ASS_Image_set_stride_1"]).apply(null, arguments);
};

var _emscripten_bind_ASS_Image_get_bitmap_0 = Module["_emscripten_bind_ASS_Image_get_bitmap_0"] = function() {
 return (_emscripten_bind_ASS_Image_get_bitmap_0 = Module["_emscripten_bind_ASS_Image_get_bitmap_0"] = Module["asm"]["emscripten_bind_ASS_Image_get_bitmap_0"]).apply(null, arguments);
};

var _emscripten_bind_ASS_Image_set_bitmap_1 = Module["_emscripten_bind_ASS_Image_set_bitmap_1"] = function() {
 return (_emscripten_bind_ASS_Image_set_bitmap_1 = Module["_emscripten_bind_ASS_Image_set_bitmap_1"] = Module["asm"]["emscripten_bind_ASS_Image_set_bitmap_1"]).apply(null, arguments);
};

var _emscripten_bind_ASS_Image_get_color_0 = Module["_emscripten_bind_ASS_Image_get_color_0"] = function() {
 return (_emscripten_bind_ASS_Image_get_color_0 = Module["_emscripten_bind_ASS_Image_get_color_0"] = Module["asm"]["emscripten_bind_ASS_Image_get_color_0"]).apply(null, arguments);
};

var _emscripten_bind_ASS_Image_set_color_1 = Module["_emscripten_bind_ASS_Image_set_color_1"] = function() {
 return (_emscripten_bind_ASS_Image_set_color_1 = Module["_emscripten_bind_ASS_Image_set_color_1"] = Module["asm"]["emscripten_bind_ASS_Image_set_color_1"]).apply(null, arguments);
};

var _emscripten_bind_ASS_Image_get_dst_x_0 = Module["_emscripten_bind_ASS_Image_get_dst_x_0"] = function() {
 return (_emscripten_bind_ASS_Image_get_dst_x_0 = Module["_emscripten_bind_ASS_Image_get_dst_x_0"] = Module["asm"]["emscripten_bind_ASS_Image_get_dst_x_0"]).apply(null, arguments);
};

var _emscripten_bind_ASS_Image_set_dst_x_1 = Module["_emscripten_bind_ASS_Image_set_dst_x_1"] = function() {
 return (_emscripten_bind_ASS_Image_set_dst_x_1 = Module["_emscripten_bind_ASS_Image_set_dst_x_1"] = Module["asm"]["emscripten_bind_ASS_Image_set_dst_x_1"]).apply(null, arguments);
};

var _emscripten_bind_ASS_Image_get_dst_y_0 = Module["_emscripten_bind_ASS_Image_get_dst_y_0"] = function() {
 return (_emscripten_bind_ASS_Image_get_dst_y_0 = Module["_emscripten_bind_ASS_Image_get_dst_y_0"] = Module["asm"]["emscripten_bind_ASS_Image_get_dst_y_0"]).apply(null, arguments);
};

var _emscripten_bind_ASS_Image_set_dst_y_1 = Module["_emscripten_bind_ASS_Image_set_dst_y_1"] = function() {
 return (_emscripten_bind_ASS_Image_set_dst_y_1 = Module["_emscripten_bind_ASS_Image_set_dst_y_1"] = Module["asm"]["emscripten_bind_ASS_Image_set_dst_y_1"]).apply(null, arguments);
};

var _emscripten_bind_ASS_Image_get_next_0 = Module["_emscripten_bind_ASS_Image_get_next_0"] = function() {
 return (_emscripten_bind_ASS_Image_get_next_0 = Module["_emscripten_bind_ASS_Image_get_next_0"] = Module["asm"]["emscripten_bind_ASS_Image_get_next_0"]).apply(null, arguments);
};

var _emscripten_bind_ASS_Image_set_next_1 = Module["_emscripten_bind_ASS_Image_set_next_1"] = function() {
 return (_emscripten_bind_ASS_Image_set_next_1 = Module["_emscripten_bind_ASS_Image_set_next_1"] = Module["asm"]["emscripten_bind_ASS_Image_set_next_1"]).apply(null, arguments);
};

var _emscripten_bind_VoidPtr___destroy___0 = Module["_emscripten_bind_VoidPtr___destroy___0"] = function() {
 return (_emscripten_bind_VoidPtr___destroy___0 = Module["_emscripten_bind_VoidPtr___destroy___0"] = Module["asm"]["emscripten_bind_VoidPtr___destroy___0"]).apply(null, arguments);
};

var _emscripten_bind_libass_libass_0 = Module["_emscripten_bind_libass_libass_0"] = function() {
 return (_emscripten_bind_libass_libass_0 = Module["_emscripten_bind_libass_libass_0"] = Module["asm"]["emscripten_bind_libass_libass_0"]).apply(null, arguments);
};

var _emscripten_bind_libass_oct_library_version_0 = Module["_emscripten_bind_libass_oct_library_version_0"] = function() {
 return (_emscripten_bind_libass_oct_library_version_0 = Module["_emscripten_bind_libass_oct_library_version_0"] = Module["asm"]["emscripten_bind_libass_oct_library_version_0"]).apply(null, arguments);
};

var _emscripten_bind_libass_oct_library_init_0 = Module["_emscripten_bind_libass_oct_library_init_0"] = function() {
 return (_emscripten_bind_libass_oct_library_init_0 = Module["_emscripten_bind_libass_oct_library_init_0"] = Module["asm"]["emscripten_bind_libass_oct_library_init_0"]).apply(null, arguments);
};

var _emscripten_bind_libass_oct_library_done_1 = Module["_emscripten_bind_libass_oct_library_done_1"] = function() {
 return (_emscripten_bind_libass_oct_library_done_1 = Module["_emscripten_bind_libass_oct_library_done_1"] = Module["asm"]["emscripten_bind_libass_oct_library_done_1"]).apply(null, arguments);
};

var _emscripten_bind_libass_oct_set_fonts_dir_2 = Module["_emscripten_bind_libass_oct_set_fonts_dir_2"] = function() {
 return (_emscripten_bind_libass_oct_set_fonts_dir_2 = Module["_emscripten_bind_libass_oct_set_fonts_dir_2"] = Module["asm"]["emscripten_bind_libass_oct_set_fonts_dir_2"]).apply(null, arguments);
};

var _emscripten_bind_libass_oct_set_extract_fonts_2 = Module["_emscripten_bind_libass_oct_set_extract_fonts_2"] = function() {
 return (_emscripten_bind_libass_oct_set_extract_fonts_2 = Module["_emscripten_bind_libass_oct_set_extract_fonts_2"] = Module["asm"]["emscripten_bind_libass_oct_set_extract_fonts_2"]).apply(null, arguments);
};

var _emscripten_bind_libass_oct_set_style_overrides_2 = Module["_emscripten_bind_libass_oct_set_style_overrides_2"] = function() {
 return (_emscripten_bind_libass_oct_set_style_overrides_2 = Module["_emscripten_bind_libass_oct_set_style_overrides_2"] = Module["asm"]["emscripten_bind_libass_oct_set_style_overrides_2"]).apply(null, arguments);
};

var _emscripten_bind_libass_oct_process_force_style_1 = Module["_emscripten_bind_libass_oct_process_force_style_1"] = function() {
 return (_emscripten_bind_libass_oct_process_force_style_1 = Module["_emscripten_bind_libass_oct_process_force_style_1"] = Module["asm"]["emscripten_bind_libass_oct_process_force_style_1"]).apply(null, arguments);
};

var _emscripten_bind_libass_oct_renderer_init_1 = Module["_emscripten_bind_libass_oct_renderer_init_1"] = function() {
 return (_emscripten_bind_libass_oct_renderer_init_1 = Module["_emscripten_bind_libass_oct_renderer_init_1"] = Module["asm"]["emscripten_bind_libass_oct_renderer_init_1"]).apply(null, arguments);
};

var _emscripten_bind_libass_oct_renderer_done_1 = Module["_emscripten_bind_libass_oct_renderer_done_1"] = function() {
 return (_emscripten_bind_libass_oct_renderer_done_1 = Module["_emscripten_bind_libass_oct_renderer_done_1"] = Module["asm"]["emscripten_bind_libass_oct_renderer_done_1"]).apply(null, arguments);
};

var _emscripten_bind_libass_oct_set_frame_size_3 = Module["_emscripten_bind_libass_oct_set_frame_size_3"] = function() {
 return (_emscripten_bind_libass_oct_set_frame_size_3 = Module["_emscripten_bind_libass_oct_set_frame_size_3"] = Module["asm"]["emscripten_bind_libass_oct_set_frame_size_3"]).apply(null, arguments);
};

var _emscripten_bind_libass_oct_set_storage_size_3 = Module["_emscripten_bind_libass_oct_set_storage_size_3"] = function() {
 return (_emscripten_bind_libass_oct_set_storage_size_3 = Module["_emscripten_bind_libass_oct_set_storage_size_3"] = Module["asm"]["emscripten_bind_libass_oct_set_storage_size_3"]).apply(null, arguments);
};

var _emscripten_bind_libass_oct_set_shaper_2 = Module["_emscripten_bind_libass_oct_set_shaper_2"] = function() {
 return (_emscripten_bind_libass_oct_set_shaper_2 = Module["_emscripten_bind_libass_oct_set_shaper_2"] = Module["asm"]["emscripten_bind_libass_oct_set_shaper_2"]).apply(null, arguments);
};

var _emscripten_bind_libass_oct_set_margins_5 = Module["_emscripten_bind_libass_oct_set_margins_5"] = function() {
 return (_emscripten_bind_libass_oct_set_margins_5 = Module["_emscripten_bind_libass_oct_set_margins_5"] = Module["asm"]["emscripten_bind_libass_oct_set_margins_5"]).apply(null, arguments);
};

var _emscripten_bind_libass_oct_set_use_margins_2 = Module["_emscripten_bind_libass_oct_set_use_margins_2"] = function() {
 return (_emscripten_bind_libass_oct_set_use_margins_2 = Module["_emscripten_bind_libass_oct_set_use_margins_2"] = Module["asm"]["emscripten_bind_libass_oct_set_use_margins_2"]).apply(null, arguments);
};

var _emscripten_bind_libass_oct_set_pixel_aspect_2 = Module["_emscripten_bind_libass_oct_set_pixel_aspect_2"] = function() {
 return (_emscripten_bind_libass_oct_set_pixel_aspect_2 = Module["_emscripten_bind_libass_oct_set_pixel_aspect_2"] = Module["asm"]["emscripten_bind_libass_oct_set_pixel_aspect_2"]).apply(null, arguments);
};

var _emscripten_bind_libass_oct_set_aspect_ratio_3 = Module["_emscripten_bind_libass_oct_set_aspect_ratio_3"] = function() {
 return (_emscripten_bind_libass_oct_set_aspect_ratio_3 = Module["_emscripten_bind_libass_oct_set_aspect_ratio_3"] = Module["asm"]["emscripten_bind_libass_oct_set_aspect_ratio_3"]).apply(null, arguments);
};

var _emscripten_bind_libass_oct_set_font_scale_2 = Module["_emscripten_bind_libass_oct_set_font_scale_2"] = function() {
 return (_emscripten_bind_libass_oct_set_font_scale_2 = Module["_emscripten_bind_libass_oct_set_font_scale_2"] = Module["asm"]["emscripten_bind_libass_oct_set_font_scale_2"]).apply(null, arguments);
};

var _emscripten_bind_libass_oct_set_hinting_2 = Module["_emscripten_bind_libass_oct_set_hinting_2"] = function() {
 return (_emscripten_bind_libass_oct_set_hinting_2 = Module["_emscripten_bind_libass_oct_set_hinting_2"] = Module["asm"]["emscripten_bind_libass_oct_set_hinting_2"]).apply(null, arguments);
};

var _emscripten_bind_libass_oct_set_line_spacing_2 = Module["_emscripten_bind_libass_oct_set_line_spacing_2"] = function() {
 return (_emscripten_bind_libass_oct_set_line_spacing_2 = Module["_emscripten_bind_libass_oct_set_line_spacing_2"] = Module["asm"]["emscripten_bind_libass_oct_set_line_spacing_2"]).apply(null, arguments);
};

var _emscripten_bind_libass_oct_set_line_position_2 = Module["_emscripten_bind_libass_oct_set_line_position_2"] = function() {
 return (_emscripten_bind_libass_oct_set_line_position_2 = Module["_emscripten_bind_libass_oct_set_line_position_2"] = Module["asm"]["emscripten_bind_libass_oct_set_line_position_2"]).apply(null, arguments);
};

var _emscripten_bind_libass_oct_set_fonts_6 = Module["_emscripten_bind_libass_oct_set_fonts_6"] = function() {
 return (_emscripten_bind_libass_oct_set_fonts_6 = Module["_emscripten_bind_libass_oct_set_fonts_6"] = Module["asm"]["emscripten_bind_libass_oct_set_fonts_6"]).apply(null, arguments);
};

var _emscripten_bind_libass_oct_set_selective_style_override_enabled_2 = Module["_emscripten_bind_libass_oct_set_selective_style_override_enabled_2"] = function() {
 return (_emscripten_bind_libass_oct_set_selective_style_override_enabled_2 = Module["_emscripten_bind_libass_oct_set_selective_style_override_enabled_2"] = Module["asm"]["emscripten_bind_libass_oct_set_selective_style_override_enabled_2"]).apply(null, arguments);
};

var _emscripten_bind_libass_oct_set_selective_style_override_2 = Module["_emscripten_bind_libass_oct_set_selective_style_override_2"] = function() {
 return (_emscripten_bind_libass_oct_set_selective_style_override_2 = Module["_emscripten_bind_libass_oct_set_selective_style_override_2"] = Module["asm"]["emscripten_bind_libass_oct_set_selective_style_override_2"]).apply(null, arguments);
};

var _emscripten_bind_libass_oct_set_cache_limits_3 = Module["_emscripten_bind_libass_oct_set_cache_limits_3"] = function() {
 return (_emscripten_bind_libass_oct_set_cache_limits_3 = Module["_emscripten_bind_libass_oct_set_cache_limits_3"] = Module["asm"]["emscripten_bind_libass_oct_set_cache_limits_3"]).apply(null, arguments);
};

var _emscripten_bind_libass_oct_render_frame_4 = Module["_emscripten_bind_libass_oct_render_frame_4"] = function() {
 return (_emscripten_bind_libass_oct_render_frame_4 = Module["_emscripten_bind_libass_oct_render_frame_4"] = Module["asm"]["emscripten_bind_libass_oct_render_frame_4"]).apply(null, arguments);
};

var _emscripten_bind_libass_oct_new_track_1 = Module["_emscripten_bind_libass_oct_new_track_1"] = function() {
 return (_emscripten_bind_libass_oct_new_track_1 = Module["_emscripten_bind_libass_oct_new_track_1"] = Module["asm"]["emscripten_bind_libass_oct_new_track_1"]).apply(null, arguments);
};

var _emscripten_bind_libass_oct_free_track_1 = Module["_emscripten_bind_libass_oct_free_track_1"] = function() {
 return (_emscripten_bind_libass_oct_free_track_1 = Module["_emscripten_bind_libass_oct_free_track_1"] = Module["asm"]["emscripten_bind_libass_oct_free_track_1"]).apply(null, arguments);
};

var _emscripten_bind_libass_oct_alloc_style_1 = Module["_emscripten_bind_libass_oct_alloc_style_1"] = function() {
 return (_emscripten_bind_libass_oct_alloc_style_1 = Module["_emscripten_bind_libass_oct_alloc_style_1"] = Module["asm"]["emscripten_bind_libass_oct_alloc_style_1"]).apply(null, arguments);
};

var _emscripten_bind_libass_oct_alloc_event_1 = Module["_emscripten_bind_libass_oct_alloc_event_1"] = function() {
 return (_emscripten_bind_libass_oct_alloc_event_1 = Module["_emscripten_bind_libass_oct_alloc_event_1"] = Module["asm"]["emscripten_bind_libass_oct_alloc_event_1"]).apply(null, arguments);
};

var _emscripten_bind_libass_oct_free_style_2 = Module["_emscripten_bind_libass_oct_free_style_2"] = function() {
 return (_emscripten_bind_libass_oct_free_style_2 = Module["_emscripten_bind_libass_oct_free_style_2"] = Module["asm"]["emscripten_bind_libass_oct_free_style_2"]).apply(null, arguments);
};

var _emscripten_bind_libass_oct_free_event_2 = Module["_emscripten_bind_libass_oct_free_event_2"] = function() {
 return (_emscripten_bind_libass_oct_free_event_2 = Module["_emscripten_bind_libass_oct_free_event_2"] = Module["asm"]["emscripten_bind_libass_oct_free_event_2"]).apply(null, arguments);
};

var _emscripten_bind_libass_oct_flush_events_1 = Module["_emscripten_bind_libass_oct_flush_events_1"] = function() {
 return (_emscripten_bind_libass_oct_flush_events_1 = Module["_emscripten_bind_libass_oct_flush_events_1"] = Module["asm"]["emscripten_bind_libass_oct_flush_events_1"]).apply(null, arguments);
};

var _emscripten_bind_libass_oct_read_file_3 = Module["_emscripten_bind_libass_oct_read_file_3"] = function() {
 return (_emscripten_bind_libass_oct_read_file_3 = Module["_emscripten_bind_libass_oct_read_file_3"] = Module["asm"]["emscripten_bind_libass_oct_read_file_3"]).apply(null, arguments);
};

var _emscripten_bind_libass_oct_add_font_4 = Module["_emscripten_bind_libass_oct_add_font_4"] = function() {
 return (_emscripten_bind_libass_oct_add_font_4 = Module["_emscripten_bind_libass_oct_add_font_4"] = Module["asm"]["emscripten_bind_libass_oct_add_font_4"]).apply(null, arguments);
};

var _emscripten_bind_libass_oct_clear_fonts_1 = Module["_emscripten_bind_libass_oct_clear_fonts_1"] = function() {
 return (_emscripten_bind_libass_oct_clear_fonts_1 = Module["_emscripten_bind_libass_oct_clear_fonts_1"] = Module["asm"]["emscripten_bind_libass_oct_clear_fonts_1"]).apply(null, arguments);
};

var _emscripten_bind_libass_oct_step_sub_3 = Module["_emscripten_bind_libass_oct_step_sub_3"] = function() {
 return (_emscripten_bind_libass_oct_step_sub_3 = Module["_emscripten_bind_libass_oct_step_sub_3"] = Module["asm"]["emscripten_bind_libass_oct_step_sub_3"]).apply(null, arguments);
};

var _emscripten_enum_ASS_Hinting_ASS_HINTING_NONE = Module["_emscripten_enum_ASS_Hinting_ASS_HINTING_NONE"] = function() {
 return (_emscripten_enum_ASS_Hinting_ASS_HINTING_NONE = Module["_emscripten_enum_ASS_Hinting_ASS_HINTING_NONE"] = Module["asm"]["emscripten_enum_ASS_Hinting_ASS_HINTING_NONE"]).apply(null, arguments);
};

var _emscripten_enum_ASS_Hinting_ASS_HINTING_LIGHT = Module["_emscripten_enum_ASS_Hinting_ASS_HINTING_LIGHT"] = function() {
 return (_emscripten_enum_ASS_Hinting_ASS_HINTING_LIGHT = Module["_emscripten_enum_ASS_Hinting_ASS_HINTING_LIGHT"] = Module["asm"]["emscripten_enum_ASS_Hinting_ASS_HINTING_LIGHT"]).apply(null, arguments);
};

var _emscripten_enum_ASS_Hinting_ASS_HINTING_NORMAL = Module["_emscripten_enum_ASS_Hinting_ASS_HINTING_NORMAL"] = function() {
 return (_emscripten_enum_ASS_Hinting_ASS_HINTING_NORMAL = Module["_emscripten_enum_ASS_Hinting_ASS_HINTING_NORMAL"] = Module["asm"]["emscripten_enum_ASS_Hinting_ASS_HINTING_NORMAL"]).apply(null, arguments);
};

var _emscripten_enum_ASS_Hinting_ASS_HINTING_NATIVE = Module["_emscripten_enum_ASS_Hinting_ASS_HINTING_NATIVE"] = function() {
 return (_emscripten_enum_ASS_Hinting_ASS_HINTING_NATIVE = Module["_emscripten_enum_ASS_Hinting_ASS_HINTING_NATIVE"] = Module["asm"]["emscripten_enum_ASS_Hinting_ASS_HINTING_NATIVE"]).apply(null, arguments);
};

var _emscripten_enum_ASS_ShapingLevel_ASS_SHAPING_SIMPLE = Module["_emscripten_enum_ASS_ShapingLevel_ASS_SHAPING_SIMPLE"] = function() {
 return (_emscripten_enum_ASS_ShapingLevel_ASS_SHAPING_SIMPLE = Module["_emscripten_enum_ASS_ShapingLevel_ASS_SHAPING_SIMPLE"] = Module["asm"]["emscripten_enum_ASS_ShapingLevel_ASS_SHAPING_SIMPLE"]).apply(null, arguments);
};

var _emscripten_enum_ASS_ShapingLevel_ASS_SHAPING_COMPLEX = Module["_emscripten_enum_ASS_ShapingLevel_ASS_SHAPING_COMPLEX"] = function() {
 return (_emscripten_enum_ASS_ShapingLevel_ASS_SHAPING_COMPLEX = Module["_emscripten_enum_ASS_ShapingLevel_ASS_SHAPING_COMPLEX"] = Module["asm"]["emscripten_enum_ASS_ShapingLevel_ASS_SHAPING_COMPLEX"]).apply(null, arguments);
};

var _emscripten_enum_ASS_OverrideBits_ASS_OVERRIDE_DEFAULT = Module["_emscripten_enum_ASS_OverrideBits_ASS_OVERRIDE_DEFAULT"] = function() {
 return (_emscripten_enum_ASS_OverrideBits_ASS_OVERRIDE_DEFAULT = Module["_emscripten_enum_ASS_OverrideBits_ASS_OVERRIDE_DEFAULT"] = Module["asm"]["emscripten_enum_ASS_OverrideBits_ASS_OVERRIDE_DEFAULT"]).apply(null, arguments);
};

var _emscripten_enum_ASS_OverrideBits_ASS_OVERRIDE_BIT_STYLE = Module["_emscripten_enum_ASS_OverrideBits_ASS_OVERRIDE_BIT_STYLE"] = function() {
 return (_emscripten_enum_ASS_OverrideBits_ASS_OVERRIDE_BIT_STYLE = Module["_emscripten_enum_ASS_OverrideBits_ASS_OVERRIDE_BIT_STYLE"] = Module["asm"]["emscripten_enum_ASS_OverrideBits_ASS_OVERRIDE_BIT_STYLE"]).apply(null, arguments);
};

var _emscripten_enum_ASS_OverrideBits_ASS_OVERRIDE_BIT_SELECTIVE_FONT_SCALE = Module["_emscripten_enum_ASS_OverrideBits_ASS_OVERRIDE_BIT_SELECTIVE_FONT_SCALE"] = function() {
 return (_emscripten_enum_ASS_OverrideBits_ASS_OVERRIDE_BIT_SELECTIVE_FONT_SCALE = Module["_emscripten_enum_ASS_OverrideBits_ASS_OVERRIDE_BIT_SELECTIVE_FONT_SCALE"] = Module["asm"]["emscripten_enum_ASS_OverrideBits_ASS_OVERRIDE_BIT_SELECTIVE_FONT_SCALE"]).apply(null, arguments);
};

var _emscripten_enum_ASS_OverrideBits_ASS_OVERRIDE_BIT_FONT_SIZE = Module["_emscripten_enum_ASS_OverrideBits_ASS_OVERRIDE_BIT_FONT_SIZE"] = function() {
 return (_emscripten_enum_ASS_OverrideBits_ASS_OVERRIDE_BIT_FONT_SIZE = Module["_emscripten_enum_ASS_OverrideBits_ASS_OVERRIDE_BIT_FONT_SIZE"] = Module["asm"]["emscripten_enum_ASS_OverrideBits_ASS_OVERRIDE_BIT_FONT_SIZE"]).apply(null, arguments);
};

var _emscripten_enum_ASS_OverrideBits_ASS_OVERRIDE_BIT_FONT_SIZE_FIELDS = Module["_emscripten_enum_ASS_OverrideBits_ASS_OVERRIDE_BIT_FONT_SIZE_FIELDS"] = function() {
 return (_emscripten_enum_ASS_OverrideBits_ASS_OVERRIDE_BIT_FONT_SIZE_FIELDS = Module["_emscripten_enum_ASS_OverrideBits_ASS_OVERRIDE_BIT_FONT_SIZE_FIELDS"] = Module["asm"]["emscripten_enum_ASS_OverrideBits_ASS_OVERRIDE_BIT_FONT_SIZE_FIELDS"]).apply(null, arguments);
};

var _emscripten_enum_ASS_OverrideBits_ASS_OVERRIDE_BIT_FONT_NAME = Module["_emscripten_enum_ASS_OverrideBits_ASS_OVERRIDE_BIT_FONT_NAME"] = function() {
 return (_emscripten_enum_ASS_OverrideBits_ASS_OVERRIDE_BIT_FONT_NAME = Module["_emscripten_enum_ASS_OverrideBits_ASS_OVERRIDE_BIT_FONT_NAME"] = Module["asm"]["emscripten_enum_ASS_OverrideBits_ASS_OVERRIDE_BIT_FONT_NAME"]).apply(null, arguments);
};

var _emscripten_enum_ASS_OverrideBits_ASS_OVERRIDE_BIT_COLORS = Module["_emscripten_enum_ASS_OverrideBits_ASS_OVERRIDE_BIT_COLORS"] = function() {
 return (_emscripten_enum_ASS_OverrideBits_ASS_OVERRIDE_BIT_COLORS = Module["_emscripten_enum_ASS_OverrideBits_ASS_OVERRIDE_BIT_COLORS"] = Module["asm"]["emscripten_enum_ASS_OverrideBits_ASS_OVERRIDE_BIT_COLORS"]).apply(null, arguments);
};

var _emscripten_enum_ASS_OverrideBits_ASS_OVERRIDE_BIT_ATTRIBUTES = Module["_emscripten_enum_ASS_OverrideBits_ASS_OVERRIDE_BIT_ATTRIBUTES"] = function() {
 return (_emscripten_enum_ASS_OverrideBits_ASS_OVERRIDE_BIT_ATTRIBUTES = Module["_emscripten_enum_ASS_OverrideBits_ASS_OVERRIDE_BIT_ATTRIBUTES"] = Module["asm"]["emscripten_enum_ASS_OverrideBits_ASS_OVERRIDE_BIT_ATTRIBUTES"]).apply(null, arguments);
};

var _emscripten_enum_ASS_OverrideBits_ASS_OVERRIDE_BIT_BORDER = Module["_emscripten_enum_ASS_OverrideBits_ASS_OVERRIDE_BIT_BORDER"] = function() {
 return (_emscripten_enum_ASS_OverrideBits_ASS_OVERRIDE_BIT_BORDER = Module["_emscripten_enum_ASS_OverrideBits_ASS_OVERRIDE_BIT_BORDER"] = Module["asm"]["emscripten_enum_ASS_OverrideBits_ASS_OVERRIDE_BIT_BORDER"]).apply(null, arguments);
};

var _emscripten_enum_ASS_OverrideBits_ASS_OVERRIDE_BIT_ALIGNMENT = Module["_emscripten_enum_ASS_OverrideBits_ASS_OVERRIDE_BIT_ALIGNMENT"] = function() {
 return (_emscripten_enum_ASS_OverrideBits_ASS_OVERRIDE_BIT_ALIGNMENT = Module["_emscripten_enum_ASS_OverrideBits_ASS_OVERRIDE_BIT_ALIGNMENT"] = Module["asm"]["emscripten_enum_ASS_OverrideBits_ASS_OVERRIDE_BIT_ALIGNMENT"]).apply(null, arguments);
};

var _emscripten_enum_ASS_OverrideBits_ASS_OVERRIDE_BIT_MARGINS = Module["_emscripten_enum_ASS_OverrideBits_ASS_OVERRIDE_BIT_MARGINS"] = function() {
 return (_emscripten_enum_ASS_OverrideBits_ASS_OVERRIDE_BIT_MARGINS = Module["_emscripten_enum_ASS_OverrideBits_ASS_OVERRIDE_BIT_MARGINS"] = Module["asm"]["emscripten_enum_ASS_OverrideBits_ASS_OVERRIDE_BIT_MARGINS"]).apply(null, arguments);
};

var _emscripten_enum_ASS_OverrideBits_ASS_OVERRIDE_FULL_STYLE = Module["_emscripten_enum_ASS_OverrideBits_ASS_OVERRIDE_FULL_STYLE"] = function() {
 return (_emscripten_enum_ASS_OverrideBits_ASS_OVERRIDE_FULL_STYLE = Module["_emscripten_enum_ASS_OverrideBits_ASS_OVERRIDE_FULL_STYLE"] = Module["asm"]["emscripten_enum_ASS_OverrideBits_ASS_OVERRIDE_FULL_STYLE"]).apply(null, arguments);
};

var _emscripten_enum_ASS_OverrideBits_ASS_OVERRIDE_BIT_JUSTIFY = Module["_emscripten_enum_ASS_OverrideBits_ASS_OVERRIDE_BIT_JUSTIFY"] = function() {
 return (_emscripten_enum_ASS_OverrideBits_ASS_OVERRIDE_BIT_JUSTIFY = Module["_emscripten_enum_ASS_OverrideBits_ASS_OVERRIDE_BIT_JUSTIFY"] = Module["asm"]["emscripten_enum_ASS_OverrideBits_ASS_OVERRIDE_BIT_JUSTIFY"]).apply(null, arguments);
};

var _free = Module["_free"] = function() {
 return (_free = Module["_free"] = Module["asm"]["free"]).apply(null, arguments);
};

var _realloc = Module["_realloc"] = function() {
 return (_realloc = Module["_realloc"] = Module["asm"]["realloc"]).apply(null, arguments);
};

var _memset = Module["_memset"] = function() {
 return (_memset = Module["_memset"] = Module["asm"]["memset"]).apply(null, arguments);
};

var _malloc = Module["_malloc"] = function() {
 return (_malloc = Module["_malloc"] = Module["asm"]["malloc"]).apply(null, arguments);
};

var ___errno_location = Module["___errno_location"] = function() {
 return (___errno_location = Module["___errno_location"] = Module["asm"]["__errno_location"]).apply(null, arguments);
};

var _setThrew = Module["_setThrew"] = function() {
 return (_setThrew = Module["_setThrew"] = Module["asm"]["setThrew"]).apply(null, arguments);
};

var _memalign = Module["_memalign"] = function() {
 return (_memalign = Module["_memalign"] = Module["asm"]["memalign"]).apply(null, arguments);
};

var dynCall_v = Module["dynCall_v"] = function() {
 return (dynCall_v = Module["dynCall_v"] = Module["asm"]["dynCall_v"]).apply(null, arguments);
};

var dynCall_vi = Module["dynCall_vi"] = function() {
 return (dynCall_vi = Module["dynCall_vi"] = Module["asm"]["dynCall_vi"]).apply(null, arguments);
};

var dynCall_viiii = Module["dynCall_viiii"] = function() {
 return (dynCall_viiii = Module["dynCall_viiii"] = Module["asm"]["dynCall_viiii"]).apply(null, arguments);
};

var dynCall_iii = Module["dynCall_iii"] = function() {
 return (dynCall_iii = Module["dynCall_iii"] = Module["asm"]["dynCall_iii"]).apply(null, arguments);
};

var dynCall_iiii = Module["dynCall_iiii"] = function() {
 return (dynCall_iiii = Module["dynCall_iiii"] = Module["asm"]["dynCall_iiii"]).apply(null, arguments);
};

var dynCall_iiiii = Module["dynCall_iiiii"] = function() {
 return (dynCall_iiiii = Module["dynCall_iiiii"] = Module["asm"]["dynCall_iiiii"]).apply(null, arguments);
};

var stackSave = Module["stackSave"] = function() {
 return (stackSave = Module["stackSave"] = Module["asm"]["stackSave"]).apply(null, arguments);
};

var stackAlloc = Module["stackAlloc"] = function() {
 return (stackAlloc = Module["stackAlloc"] = Module["asm"]["stackAlloc"]).apply(null, arguments);
};

var stackRestore = Module["stackRestore"] = function() {
 return (stackRestore = Module["stackRestore"] = Module["asm"]["stackRestore"]).apply(null, arguments);
};

var __growWasmMemory = Module["__growWasmMemory"] = function() {
 return (__growWasmMemory = Module["__growWasmMemory"] = Module["asm"]["__growWasmMemory"]).apply(null, arguments);
};

var dynCall_vii = Module["dynCall_vii"] = function() {
 return (dynCall_vii = Module["dynCall_vii"] = Module["asm"]["dynCall_vii"]).apply(null, arguments);
};

var dynCall_ii = Module["dynCall_ii"] = function() {
 return (dynCall_ii = Module["dynCall_ii"] = Module["asm"]["dynCall_ii"]).apply(null, arguments);
};

var dynCall_iiiiii = Module["dynCall_iiiiii"] = function() {
 return (dynCall_iiiiii = Module["dynCall_iiiiii"] = Module["asm"]["dynCall_iiiiii"]).apply(null, arguments);
};

var dynCall_viii = Module["dynCall_viii"] = function() {
 return (dynCall_viii = Module["dynCall_viii"] = Module["asm"]["dynCall_viii"]).apply(null, arguments);
};

var dynCall_iiiiiii = Module["dynCall_iiiiiii"] = function() {
 return (dynCall_iiiiiii = Module["dynCall_iiiiiii"] = Module["asm"]["dynCall_iiiiiii"]).apply(null, arguments);
};

var dynCall_iiiiiiii = Module["dynCall_iiiiiiii"] = function() {
 return (dynCall_iiiiiiii = Module["dynCall_iiiiiiii"] = Module["asm"]["dynCall_iiiiiiii"]).apply(null, arguments);
};

var dynCall_viiiii = Module["dynCall_viiiii"] = function() {
 return (dynCall_viiiii = Module["dynCall_viiiii"] = Module["asm"]["dynCall_viiiii"]).apply(null, arguments);
};

var dynCall_iiiiiiiii = Module["dynCall_iiiiiiiii"] = function() {
 return (dynCall_iiiiiiiii = Module["dynCall_iiiiiiiii"] = Module["asm"]["dynCall_iiiiiiiii"]).apply(null, arguments);
};

var dynCall_viiiiiiii = Module["dynCall_viiiiiiii"] = function() {
 return (dynCall_viiiiiiii = Module["dynCall_viiiiiiii"] = Module["asm"]["dynCall_viiiiiiii"]).apply(null, arguments);
};

var dynCall_viiiiii = Module["dynCall_viiiiii"] = function() {
 return (dynCall_viiiiii = Module["dynCall_viiiiii"] = Module["asm"]["dynCall_viiiiii"]).apply(null, arguments);
};

var dynCall_iiiiiiiiii = Module["dynCall_iiiiiiiiii"] = function() {
 return (dynCall_iiiiiiiiii = Module["dynCall_iiiiiiiiii"] = Module["asm"]["dynCall_iiiiiiiiii"]).apply(null, arguments);
};

var dynCall_viiiiji = Module["dynCall_viiiiji"] = function() {
 return (dynCall_viiiiji = Module["dynCall_viiiiji"] = Module["asm"]["dynCall_viiiiji"]).apply(null, arguments);
};

var dynCall_iiiiiiiiiii = Module["dynCall_iiiiiiiiiii"] = function() {
 return (dynCall_iiiiiiiiiii = Module["dynCall_iiiiiiiiiii"] = Module["asm"]["dynCall_iiiiiiiiiii"]).apply(null, arguments);
};

var dynCall_diii = Module["dynCall_diii"] = function() {
 return (dynCall_diii = Module["dynCall_diii"] = Module["asm"]["dynCall_diii"]).apply(null, arguments);
};

var dynCall_jiji = Module["dynCall_jiji"] = function() {
 return (dynCall_jiji = Module["dynCall_jiji"] = Module["asm"]["dynCall_jiji"]).apply(null, arguments);
};

var dynCall_iidiiii = Module["dynCall_iidiiii"] = function() {
 return (dynCall_iidiiii = Module["dynCall_iidiiii"] = Module["asm"]["dynCall_iidiiii"]).apply(null, arguments);
};

function invoke_viiii(index, a1, a2, a3, a4) {
 var sp = stackSave();
 try {
  dynCall_viiii(index, a1, a2, a3, a4);
 } catch (e) {
  stackRestore(sp);
  if (e !== e + 0 && e !== "longjmp") throw e;
  _setThrew(1, 0);
 }
}

function invoke_iii(index, a1, a2) {
 var sp = stackSave();
 try {
  return dynCall_iii(index, a1, a2);
 } catch (e) {
  stackRestore(sp);
  if (e !== e + 0 && e !== "longjmp") throw e;
  _setThrew(1, 0);
 }
}

function invoke_iiiii(index, a1, a2, a3, a4) {
 var sp = stackSave();
 try {
  return dynCall_iiiii(index, a1, a2, a3, a4);
 } catch (e) {
  stackRestore(sp);
  if (e !== e + 0 && e !== "longjmp") throw e;
  _setThrew(1, 0);
 }
}

function invoke_iiii(index, a1, a2, a3) {
 var sp = stackSave();
 try {
  return dynCall_iiii(index, a1, a2, a3);
 } catch (e) {
  stackRestore(sp);
  if (e !== e + 0 && e !== "longjmp") throw e;
  _setThrew(1, 0);
 }
}

function invoke_v(index) {
 var sp = stackSave();
 try {
  dynCall_v(index);
 } catch (e) {
  stackRestore(sp);
  if (e !== e + 0 && e !== "longjmp") throw e;
  _setThrew(1, 0);
 }
}

function invoke_vi(index, a1) {
 var sp = stackSave();
 try {
  dynCall_vi(index, a1);
 } catch (e) {
  stackRestore(sp);
  if (e !== e + 0 && e !== "longjmp") throw e;
  _setThrew(1, 0);
 }
}

Module["asm"] = asm;

Module["ccall"] = ccall;

Module["cwrap"] = cwrap;

Module["getValue"] = getValue;

Module["getMemory"] = getMemory;

Module["addRunDependency"] = addRunDependency;

Module["removeRunDependency"] = removeRunDependency;

Module["FS_createFolder"] = FS.createFolder;

Module["FS_createPath"] = FS.createPath;

Module["FS_createDataFile"] = FS.createDataFile;

Module["FS_createPreloadedFile"] = FS.createPreloadedFile;

Module["FS_createLazyFile"] = FS.createLazyFile;

Module["FS_createLink"] = FS.createLink;

Module["FS_createDevice"] = FS.createDevice;

Module["FS_unlink"] = FS.unlink;

var calledRun;

function ExitStatus(status) {
 this.name = "ExitStatus";
 this.message = "Program terminated with exit(" + status + ")";
 this.status = status;
}

var calledMain = false;

dependenciesFulfilled = function runCaller() {
 if (!calledRun) run();
 if (!calledRun) dependenciesFulfilled = runCaller;
};

function callMain(args) {
 var entryFunction = Module["_main"];
 args = args || [];
 var argc = args.length + 1;
 var argv = stackAlloc((argc + 1) * 4);
 HEAP32[argv >> 2] = allocateUTF8OnStack(thisProgram);
 for (var i = 1; i < argc; i++) {
  HEAP32[(argv >> 2) + i] = allocateUTF8OnStack(args[i - 1]);
 }
 HEAP32[(argv >> 2) + argc] = 0;
 try {
  var ret = entryFunction(argc, argv);
  exit(ret, true);
 } catch (e) {
  if (e instanceof ExitStatus) {
   return;
  } else if (e == "unwind") {
   noExitRuntime = true;
   return;
  } else {
   var toLog = e;
   if (e && typeof e === "object" && e.stack) {
    toLog = [ e, e.stack ];
   }
   err("exception thrown: " + toLog);
   quit_(1, e);
  }
 } finally {
  calledMain = true;
 }
}

function run(args) {
 args = args || arguments_;
 if (runDependencies > 0) {
  return;
 }
 preRun();
 if (runDependencies > 0) return;
 function doRun() {
  if (calledRun) return;
  calledRun = true;
  Module["calledRun"] = true;
  if (ABORT) return;
  initRuntime();
  preMain();
  if (Module["onRuntimeInitialized"]) Module["onRuntimeInitialized"]();
  if (shouldRunNow) callMain(args);
  postRun();
 }
 if (Module["setStatus"]) {
  Module["setStatus"]("Running...");
  setTimeout(function() {
   setTimeout(function() {
    Module["setStatus"]("");
   }, 1);
   doRun();
  }, 1);
 } else {
  doRun();
 }
}

Module["run"] = run;

function exit(status, implicit) {
 if (implicit && noExitRuntime && status === 0) {
  return;
 }
 if (noExitRuntime) {} else {
  ABORT = true;
  EXITSTATUS = status;
  exitRuntime();
  if (Module["onExit"]) Module["onExit"](status);
 }
 quit_(status, new ExitStatus(status));
}

if (Module["preInit"]) {
 if (typeof Module["preInit"] == "function") Module["preInit"] = [ Module["preInit"] ];
 while (Module["preInit"].length > 0) {
  Module["preInit"].pop()();
 }
}

var shouldRunNow = true;

if (Module["noInitialRun"]) shouldRunNow = false;

noExitRuntime = true;

run();

function WrapperObject() {}

WrapperObject.prototype = Object.create(WrapperObject.prototype);

WrapperObject.prototype.constructor = WrapperObject;

WrapperObject.prototype.__class__ = WrapperObject;

WrapperObject.__cache__ = {};

Module["WrapperObject"] = WrapperObject;

function getCache(__class__) {
 return (__class__ || WrapperObject).__cache__;
}

Module["getCache"] = getCache;

function wrapPointer(ptr, __class__) {
 var cache = getCache(__class__);
 var ret = cache[ptr];
 if (ret) return ret;
 ret = Object.create((__class__ || WrapperObject).prototype);
 ret.ptr = ptr;
 return cache[ptr] = ret;
}

Module["wrapPointer"] = wrapPointer;

function castObject(obj, __class__) {
 return wrapPointer(obj.ptr, __class__);
}

Module["castObject"] = castObject;

Module["NULL"] = wrapPointer(0);

function destroy(obj) {
 if (!obj["__destroy__"]) throw "Error: Cannot destroy object. (Did you create it yourself?)";
 obj["__destroy__"]();
 delete getCache(obj.__class__)[obj.ptr];
}

Module["destroy"] = destroy;

function compare(obj1, obj2) {
 return obj1.ptr === obj2.ptr;
}

Module["compare"] = compare;

function getPointer(obj) {
 return obj.ptr;
}

Module["getPointer"] = getPointer;

function getClass(obj) {
 return obj.__class__;
}

Module["getClass"] = getClass;

var ensureCache = {
 buffer: 0,
 size: 0,
 pos: 0,
 temps: [],
 needed: 0,
 prepare: function() {
  if (ensureCache.needed) {
   for (var i = 0; i < ensureCache.temps.length; i++) {
    Module["_free"](ensureCache.temps[i]);
   }
   ensureCache.temps.length = 0;
   Module["_free"](ensureCache.buffer);
   ensureCache.buffer = 0;
   ensureCache.size += ensureCache.needed;
   ensureCache.needed = 0;
  }
  if (!ensureCache.buffer) {
   ensureCache.size += 128;
   ensureCache.buffer = Module["_malloc"](ensureCache.size);
   assert(ensureCache.buffer);
  }
  ensureCache.pos = 0;
 },
 alloc: function(array, view) {
  assert(ensureCache.buffer);
  var bytes = view.BYTES_PER_ELEMENT;
  var len = array.length * bytes;
  len = len + 7 & -8;
  var ret;
  if (ensureCache.pos + len >= ensureCache.size) {
   assert(len > 0);
   ensureCache.needed += len;
   ret = Module["_malloc"](len);
   ensureCache.temps.push(ret);
  } else {
   ret = ensureCache.buffer + ensureCache.pos;
   ensureCache.pos += len;
  }
  return ret;
 },
 copy: function(array, view, offset) {
  var offsetShifted = offset;
  var bytes = view.BYTES_PER_ELEMENT;
  switch (bytes) {
  case 2:
   offsetShifted >>= 1;
   break;

  case 4:
   offsetShifted >>= 2;
   break;

  case 8:
   offsetShifted >>= 3;
   break;
  }
  for (var i = 0; i < array.length; i++) {
   view[offsetShifted + i] = array[i];
  }
 }
};

function ensureString(value) {
 if (typeof value === "string") {
  var intArray = intArrayFromString(value);
  var offset = ensureCache.alloc(intArray, HEAP8);
  ensureCache.copy(intArray, HEAP8, offset);
  return offset;
 }
 return value;
}

function ASS_ParserPriv() {
 throw "cannot construct a ASS_ParserPriv, no constructor in IDL";
}

ASS_ParserPriv.prototype = Object.create(WrapperObject.prototype);

ASS_ParserPriv.prototype.constructor = ASS_ParserPriv;

ASS_ParserPriv.prototype.__class__ = ASS_ParserPriv;

ASS_ParserPriv.__cache__ = {};

Module["ASS_ParserPriv"] = ASS_ParserPriv;

function ASS_Event() {
 throw "cannot construct a ASS_Event, no constructor in IDL";
}

ASS_Event.prototype = Object.create(WrapperObject.prototype);

ASS_Event.prototype.constructor = ASS_Event;

ASS_Event.prototype.__class__ = ASS_Event;

ASS_Event.__cache__ = {};

Module["ASS_Event"] = ASS_Event;

ASS_Event.prototype["get_Start"] = ASS_Event.prototype.get_Start = function() {
 var self = this.ptr;
 return _emscripten_bind_ASS_Event_get_Start_0(self);
};

ASS_Event.prototype["set_Start"] = ASS_Event.prototype.set_Start = function(arg0) {
 var self = this.ptr;
 if (arg0 && typeof arg0 === "object") arg0 = arg0.ptr;
 _emscripten_bind_ASS_Event_set_Start_1(self, arg0);
};

Object.defineProperty(ASS_Event.prototype, "Start", {
 get: ASS_Event.prototype.get_Start,
 set: ASS_Event.prototype.set_Start
});

ASS_Event.prototype["get_Duration"] = ASS_Event.prototype.get_Duration = function() {
 var self = this.ptr;
 return _emscripten_bind_ASS_Event_get_Duration_0(self);
};

ASS_Event.prototype["set_Duration"] = ASS_Event.prototype.set_Duration = function(arg0) {
 var self = this.ptr;
 if (arg0 && typeof arg0 === "object") arg0 = arg0.ptr;
 _emscripten_bind_ASS_Event_set_Duration_1(self, arg0);
};

Object.defineProperty(ASS_Event.prototype, "Duration", {
 get: ASS_Event.prototype.get_Duration,
 set: ASS_Event.prototype.set_Duration
});

ASS_Event.prototype["get_ReadOrder"] = ASS_Event.prototype.get_ReadOrder = function() {
 var self = this.ptr;
 return _emscripten_bind_ASS_Event_get_ReadOrder_0(self);
};

ASS_Event.prototype["set_ReadOrder"] = ASS_Event.prototype.set_ReadOrder = function(arg0) {
 var self = this.ptr;
 if (arg0 && typeof arg0 === "object") arg0 = arg0.ptr;
 _emscripten_bind_ASS_Event_set_ReadOrder_1(self, arg0);
};

Object.defineProperty(ASS_Event.prototype, "ReadOrder", {
 get: ASS_Event.prototype.get_ReadOrder,
 set: ASS_Event.prototype.set_ReadOrder
});

ASS_Event.prototype["get_Layer"] = ASS_Event.prototype.get_Layer = function() {
 var self = this.ptr;
 return _emscripten_bind_ASS_Event_get_Layer_0(self);
};

ASS_Event.prototype["set_Layer"] = ASS_Event.prototype.set_Layer = function(arg0) {
 var self = this.ptr;
 if (arg0 && typeof arg0 === "object") arg0 = arg0.ptr;
 _emscripten_bind_ASS_Event_set_Layer_1(self, arg0);
};

Object.defineProperty(ASS_Event.prototype, "Layer", {
 get: ASS_Event.prototype.get_Layer,
 set: ASS_Event.prototype.set_Layer
});

ASS_Event.prototype["get_Style"] = ASS_Event.prototype.get_Style = function() {
 var self = this.ptr;
 return _emscripten_bind_ASS_Event_get_Style_0(self);
};

ASS_Event.prototype["set_Style"] = ASS_Event.prototype.set_Style = function(arg0) {
 var self = this.ptr;
 if (arg0 && typeof arg0 === "object") arg0 = arg0.ptr;
 _emscripten_bind_ASS_Event_set_Style_1(self, arg0);
};

Object.defineProperty(ASS_Event.prototype, "Style", {
 get: ASS_Event.prototype.get_Style,
 set: ASS_Event.prototype.set_Style
});

ASS_Event.prototype["get_Name"] = ASS_Event.prototype.get_Name = function() {
 var self = this.ptr;
 return UTF8ToString(_emscripten_bind_ASS_Event_get_Name_0(self));
};

ASS_Event.prototype["set_Name"] = ASS_Event.prototype.set_Name = function(arg0) {
 var self = this.ptr;
 ensureCache.prepare();
 if (arg0 && typeof arg0 === "object") arg0 = arg0.ptr; else arg0 = ensureString(arg0);
 _emscripten_bind_ASS_Event_set_Name_1(self, arg0);
};

Object.defineProperty(ASS_Event.prototype, "Name", {
 get: ASS_Event.prototype.get_Name,
 set: ASS_Event.prototype.set_Name
});

ASS_Event.prototype["get_MarginL"] = ASS_Event.prototype.get_MarginL = function() {
 var self = this.ptr;
 return _emscripten_bind_ASS_Event_get_MarginL_0(self);
};

ASS_Event.prototype["set_MarginL"] = ASS_Event.prototype.set_MarginL = function(arg0) {
 var self = this.ptr;
 if (arg0 && typeof arg0 === "object") arg0 = arg0.ptr;
 _emscripten_bind_ASS_Event_set_MarginL_1(self, arg0);
};

Object.defineProperty(ASS_Event.prototype, "MarginL", {
 get: ASS_Event.prototype.get_MarginL,
 set: ASS_Event.prototype.set_MarginL
});

ASS_Event.prototype["get_MarginR"] = ASS_Event.prototype.get_MarginR = function() {
 var self = this.ptr;
 return _emscripten_bind_ASS_Event_get_MarginR_0(self);
};

ASS_Event.prototype["set_MarginR"] = ASS_Event.prototype.set_MarginR = function(arg0) {
 var self = this.ptr;
 if (arg0 && typeof arg0 === "object") arg0 = arg0.ptr;
 _emscripten_bind_ASS_Event_set_MarginR_1(self, arg0);
};

Object.defineProperty(ASS_Event.prototype, "MarginR", {
 get: ASS_Event.prototype.get_MarginR,
 set: ASS_Event.prototype.set_MarginR
});

ASS_Event.prototype["get_MarginV"] = ASS_Event.prototype.get_MarginV = function() {
 var self = this.ptr;
 return _emscripten_bind_ASS_Event_get_MarginV_0(self);
};

ASS_Event.prototype["set_MarginV"] = ASS_Event.prototype.set_MarginV = function(arg0) {
 var self = this.ptr;
 if (arg0 && typeof arg0 === "object") arg0 = arg0.ptr;
 _emscripten_bind_ASS_Event_set_MarginV_1(self, arg0);
};

Object.defineProperty(ASS_Event.prototype, "MarginV", {
 get: ASS_Event.prototype.get_MarginV,
 set: ASS_Event.prototype.set_MarginV
});

ASS_Event.prototype["get_Effect"] = ASS_Event.prototype.get_Effect = function() {
 var self = this.ptr;
 return UTF8ToString(_emscripten_bind_ASS_Event_get_Effect_0(self));
};

ASS_Event.prototype["set_Effect"] = ASS_Event.prototype.set_Effect = function(arg0) {
 var self = this.ptr;
 ensureCache.prepare();
 if (arg0 && typeof arg0 === "object") arg0 = arg0.ptr; else arg0 = ensureString(arg0);
 _emscripten_bind_ASS_Event_set_Effect_1(self, arg0);
};

Object.defineProperty(ASS_Event.prototype, "Effect", {
 get: ASS_Event.prototype.get_Effect,
 set: ASS_Event.prototype.set_Effect
});

ASS_Event.prototype["get_Text"] = ASS_Event.prototype.get_Text = function() {
 var self = this.ptr;
 return UTF8ToString(_emscripten_bind_ASS_Event_get_Text_0(self));
};

ASS_Event.prototype["set_Text"] = ASS_Event.prototype.set_Text = function(arg0) {
 var self = this.ptr;
 ensureCache.prepare();
 if (arg0 && typeof arg0 === "object") arg0 = arg0.ptr; else arg0 = ensureString(arg0);
 _emscripten_bind_ASS_Event_set_Text_1(self, arg0);
};

Object.defineProperty(ASS_Event.prototype, "Text", {
 get: ASS_Event.prototype.get_Text,
 set: ASS_Event.prototype.set_Text
});

function ASS_Renderer() {
 throw "cannot construct a ASS_Renderer, no constructor in IDL";
}

ASS_Renderer.prototype = Object.create(WrapperObject.prototype);

ASS_Renderer.prototype.constructor = ASS_Renderer;

ASS_Renderer.prototype.__class__ = ASS_Renderer;

ASS_Renderer.__cache__ = {};

Module["ASS_Renderer"] = ASS_Renderer;

function SubtitleOctopus() {
 this.ptr = _emscripten_bind_SubtitleOctopus_SubtitleOctopus_0();
 getCache(SubtitleOctopus)[this.ptr] = this;
}

SubtitleOctopus.prototype = Object.create(WrapperObject.prototype);

SubtitleOctopus.prototype.constructor = SubtitleOctopus;

SubtitleOctopus.prototype.__class__ = SubtitleOctopus;

SubtitleOctopus.__cache__ = {};

Module["SubtitleOctopus"] = SubtitleOctopus;

SubtitleOctopus.prototype["setLogLevel"] = SubtitleOctopus.prototype.setLogLevel = function(level) {
 var self = this.ptr;
 if (level && typeof level === "object") level = level.ptr;
 _emscripten_bind_SubtitleOctopus_setLogLevel_1(self, level);
};

SubtitleOctopus.prototype["initLibrary"] = SubtitleOctopus.prototype.initLibrary = function(frame_w, frame_h) {
 var self = this.ptr;
 if (frame_w && typeof frame_w === "object") frame_w = frame_w.ptr;
 if (frame_h && typeof frame_h === "object") frame_h = frame_h.ptr;
 _emscripten_bind_SubtitleOctopus_initLibrary_2(self, frame_w, frame_h);
};

SubtitleOctopus.prototype["createTrack"] = SubtitleOctopus.prototype.createTrack = function(subfile) {
 var self = this.ptr;
 ensureCache.prepare();
 if (subfile && typeof subfile === "object") subfile = subfile.ptr; else subfile = ensureString(subfile);
 _emscripten_bind_SubtitleOctopus_createTrack_1(self, subfile);
};

SubtitleOctopus.prototype["createTrackMem"] = SubtitleOctopus.prototype.createTrackMem = function(buf, bufsize) {
 var self = this.ptr;
 ensureCache.prepare();
 if (buf && typeof buf === "object") buf = buf.ptr; else buf = ensureString(buf);
 if (bufsize && typeof bufsize === "object") bufsize = bufsize.ptr;
 _emscripten_bind_SubtitleOctopus_createTrackMem_2(self, buf, bufsize);
};

SubtitleOctopus.prototype["removeTrack"] = SubtitleOctopus.prototype.removeTrack = function() {
 var self = this.ptr;
 _emscripten_bind_SubtitleOctopus_removeTrack_0(self);
};

SubtitleOctopus.prototype["resizeCanvas"] = SubtitleOctopus.prototype.resizeCanvas = function(frame_w, frame_h) {
 var self = this.ptr;
 if (frame_w && typeof frame_w === "object") frame_w = frame_w.ptr;
 if (frame_h && typeof frame_h === "object") frame_h = frame_h.ptr;
 _emscripten_bind_SubtitleOctopus_resizeCanvas_2(self, frame_w, frame_h);
};

SubtitleOctopus.prototype["renderImage"] = SubtitleOctopus.prototype.renderImage = function(time, changed) {
 var self = this.ptr;
 if (time && typeof time === "object") time = time.ptr;
 if (changed && typeof changed === "object") changed = changed.ptr;
 return wrapPointer(_emscripten_bind_SubtitleOctopus_renderImage_2(self, time, changed), ASS_Image);
};

SubtitleOctopus.prototype["quitLibrary"] = SubtitleOctopus.prototype.quitLibrary = function() {
 var self = this.ptr;
 _emscripten_bind_SubtitleOctopus_quitLibrary_0(self);
};

SubtitleOctopus.prototype["reloadLibrary"] = SubtitleOctopus.prototype.reloadLibrary = function() {
 var self = this.ptr;
 _emscripten_bind_SubtitleOctopus_reloadLibrary_0(self);
};

SubtitleOctopus.prototype["reloadFonts"] = SubtitleOctopus.prototype.reloadFonts = function() {
 var self = this.ptr;
 _emscripten_bind_SubtitleOctopus_reloadFonts_0(self);
};

SubtitleOctopus.prototype["setMargin"] = SubtitleOctopus.prototype.setMargin = function(top, bottom, left, right) {
 var self = this.ptr;
 if (top && typeof top === "object") top = top.ptr;
 if (bottom && typeof bottom === "object") bottom = bottom.ptr;
 if (left && typeof left === "object") left = left.ptr;
 if (right && typeof right === "object") right = right.ptr;
 _emscripten_bind_SubtitleOctopus_setMargin_4(self, top, bottom, left, right);
};

SubtitleOctopus.prototype["getEventCount"] = SubtitleOctopus.prototype.getEventCount = function() {
 var self = this.ptr;
 return _emscripten_bind_SubtitleOctopus_getEventCount_0(self);
};

SubtitleOctopus.prototype["allocEvent"] = SubtitleOctopus.prototype.allocEvent = function() {
 var self = this.ptr;
 return _emscripten_bind_SubtitleOctopus_allocEvent_0(self);
};

SubtitleOctopus.prototype["allocStyle"] = SubtitleOctopus.prototype.allocStyle = function() {
 var self = this.ptr;
 return _emscripten_bind_SubtitleOctopus_allocStyle_0(self);
};

SubtitleOctopus.prototype["removeEvent"] = SubtitleOctopus.prototype.removeEvent = function(eid) {
 var self = this.ptr;
 if (eid && typeof eid === "object") eid = eid.ptr;
 _emscripten_bind_SubtitleOctopus_removeEvent_1(self, eid);
};

SubtitleOctopus.prototype["getStyleCount"] = SubtitleOctopus.prototype.getStyleCount = function() {
 var self = this.ptr;
 return _emscripten_bind_SubtitleOctopus_getStyleCount_0(self);
};

SubtitleOctopus.prototype["getStyleByName"] = SubtitleOctopus.prototype.getStyleByName = function(name) {
 var self = this.ptr;
 ensureCache.prepare();
 if (name && typeof name === "object") name = name.ptr; else name = ensureString(name);
 return _emscripten_bind_SubtitleOctopus_getStyleByName_1(self, name);
};

SubtitleOctopus.prototype["removeStyle"] = SubtitleOctopus.prototype.removeStyle = function(eid) {
 var self = this.ptr;
 if (eid && typeof eid === "object") eid = eid.ptr;
 _emscripten_bind_SubtitleOctopus_removeStyle_1(self, eid);
};

SubtitleOctopus.prototype["removeAllEvents"] = SubtitleOctopus.prototype.removeAllEvents = function() {
 var self = this.ptr;
 _emscripten_bind_SubtitleOctopus_removeAllEvents_0(self);
};

SubtitleOctopus.prototype["get_track"] = SubtitleOctopus.prototype.get_track = function() {
 var self = this.ptr;
 return wrapPointer(_emscripten_bind_SubtitleOctopus_get_track_0(self), ASS_Track);
};

SubtitleOctopus.prototype["set_track"] = SubtitleOctopus.prototype.set_track = function(arg0) {
 var self = this.ptr;
 if (arg0 && typeof arg0 === "object") arg0 = arg0.ptr;
 _emscripten_bind_SubtitleOctopus_set_track_1(self, arg0);
};

Object.defineProperty(SubtitleOctopus.prototype, "track", {
 get: SubtitleOctopus.prototype.get_track,
 set: SubtitleOctopus.prototype.set_track
});

SubtitleOctopus.prototype["get_ass_renderer"] = SubtitleOctopus.prototype.get_ass_renderer = function() {
 var self = this.ptr;
 return wrapPointer(_emscripten_bind_SubtitleOctopus_get_ass_renderer_0(self), ASS_Renderer);
};

SubtitleOctopus.prototype["set_ass_renderer"] = SubtitleOctopus.prototype.set_ass_renderer = function(arg0) {
 var self = this.ptr;
 if (arg0 && typeof arg0 === "object") arg0 = arg0.ptr;
 _emscripten_bind_SubtitleOctopus_set_ass_renderer_1(self, arg0);
};

Object.defineProperty(SubtitleOctopus.prototype, "ass_renderer", {
 get: SubtitleOctopus.prototype.get_ass_renderer,
 set: SubtitleOctopus.prototype.set_ass_renderer
});

SubtitleOctopus.prototype["get_ass_library"] = SubtitleOctopus.prototype.get_ass_library = function() {
 var self = this.ptr;
 return wrapPointer(_emscripten_bind_SubtitleOctopus_get_ass_library_0(self), ASS_Library);
};

SubtitleOctopus.prototype["set_ass_library"] = SubtitleOctopus.prototype.set_ass_library = function(arg0) {
 var self = this.ptr;
 if (arg0 && typeof arg0 === "object") arg0 = arg0.ptr;
 _emscripten_bind_SubtitleOctopus_set_ass_library_1(self, arg0);
};

Object.defineProperty(SubtitleOctopus.prototype, "ass_library", {
 get: SubtitleOctopus.prototype.get_ass_library,
 set: SubtitleOctopus.prototype.set_ass_library
});

SubtitleOctopus.prototype["__destroy__"] = SubtitleOctopus.prototype.__destroy__ = function() {
 var self = this.ptr;
 _emscripten_bind_SubtitleOctopus___destroy___0(self);
};

function ASS_Track() {
 throw "cannot construct a ASS_Track, no constructor in IDL";
}

ASS_Track.prototype = Object.create(WrapperObject.prototype);

ASS_Track.prototype.constructor = ASS_Track;

ASS_Track.prototype.__class__ = ASS_Track;

ASS_Track.__cache__ = {};

Module["ASS_Track"] = ASS_Track;

ASS_Track.prototype["get_n_styles"] = ASS_Track.prototype.get_n_styles = function() {
 var self = this.ptr;
 return _emscripten_bind_ASS_Track_get_n_styles_0(self);
};

ASS_Track.prototype["set_n_styles"] = ASS_Track.prototype.set_n_styles = function(arg0) {
 var self = this.ptr;
 if (arg0 && typeof arg0 === "object") arg0 = arg0.ptr;
 _emscripten_bind_ASS_Track_set_n_styles_1(self, arg0);
};

Object.defineProperty(ASS_Track.prototype, "n_styles", {
 get: ASS_Track.prototype.get_n_styles,
 set: ASS_Track.prototype.set_n_styles
});

ASS_Track.prototype["get_max_styles"] = ASS_Track.prototype.get_max_styles = function() {
 var self = this.ptr;
 return _emscripten_bind_ASS_Track_get_max_styles_0(self);
};

ASS_Track.prototype["set_max_styles"] = ASS_Track.prototype.set_max_styles = function(arg0) {
 var self = this.ptr;
 if (arg0 && typeof arg0 === "object") arg0 = arg0.ptr;
 _emscripten_bind_ASS_Track_set_max_styles_1(self, arg0);
};

Object.defineProperty(ASS_Track.prototype, "max_styles", {
 get: ASS_Track.prototype.get_max_styles,
 set: ASS_Track.prototype.set_max_styles
});

ASS_Track.prototype["get_n_events"] = ASS_Track.prototype.get_n_events = function() {
 var self = this.ptr;
 return _emscripten_bind_ASS_Track_get_n_events_0(self);
};

ASS_Track.prototype["set_n_events"] = ASS_Track.prototype.set_n_events = function(arg0) {
 var self = this.ptr;
 if (arg0 && typeof arg0 === "object") arg0 = arg0.ptr;
 _emscripten_bind_ASS_Track_set_n_events_1(self, arg0);
};

Object.defineProperty(ASS_Track.prototype, "n_events", {
 get: ASS_Track.prototype.get_n_events,
 set: ASS_Track.prototype.set_n_events
});

ASS_Track.prototype["get_max_events"] = ASS_Track.prototype.get_max_events = function() {
 var self = this.ptr;
 return _emscripten_bind_ASS_Track_get_max_events_0(self);
};

ASS_Track.prototype["set_max_events"] = ASS_Track.prototype.set_max_events = function(arg0) {
 var self = this.ptr;
 if (arg0 && typeof arg0 === "object") arg0 = arg0.ptr;
 _emscripten_bind_ASS_Track_set_max_events_1(self, arg0);
};

Object.defineProperty(ASS_Track.prototype, "max_events", {
 get: ASS_Track.prototype.get_max_events,
 set: ASS_Track.prototype.set_max_events
});

ASS_Track.prototype["get_styles"] = ASS_Track.prototype.get_styles = function(arg0) {
 var self = this.ptr;
 if (arg0 && typeof arg0 === "object") arg0 = arg0.ptr;
 return wrapPointer(_emscripten_bind_ASS_Track_get_styles_1(self, arg0), ASS_Style);
};

ASS_Track.prototype["set_styles"] = ASS_Track.prototype.set_styles = function(arg0, arg1) {
 var self = this.ptr;
 ensureCache.prepare();
 if (arg0 && typeof arg0 === "object") arg0 = arg0.ptr;
 if (arg1 && typeof arg1 === "object") arg1 = arg1.ptr;
 _emscripten_bind_ASS_Track_set_styles_2(self, arg0, arg1);
};

Object.defineProperty(ASS_Track.prototype, "styles", {
 get: ASS_Track.prototype.get_styles,
 set: ASS_Track.prototype.set_styles
});

ASS_Track.prototype["get_events"] = ASS_Track.prototype.get_events = function(arg0) {
 var self = this.ptr;
 if (arg0 && typeof arg0 === "object") arg0 = arg0.ptr;
 return wrapPointer(_emscripten_bind_ASS_Track_get_events_1(self, arg0), ASS_Event);
};

ASS_Track.prototype["set_events"] = ASS_Track.prototype.set_events = function(arg0, arg1) {
 var self = this.ptr;
 ensureCache.prepare();
 if (arg0 && typeof arg0 === "object") arg0 = arg0.ptr;
 if (arg1 && typeof arg1 === "object") arg1 = arg1.ptr;
 _emscripten_bind_ASS_Track_set_events_2(self, arg0, arg1);
};

Object.defineProperty(ASS_Track.prototype, "events", {
 get: ASS_Track.prototype.get_events,
 set: ASS_Track.prototype.set_events
});

ASS_Track.prototype["get_style_format"] = ASS_Track.prototype.get_style_format = function() {
 var self = this.ptr;
 return UTF8ToString(_emscripten_bind_ASS_Track_get_style_format_0(self));
};

ASS_Track.prototype["set_style_format"] = ASS_Track.prototype.set_style_format = function(arg0) {
 var self = this.ptr;
 ensureCache.prepare();
 if (arg0 && typeof arg0 === "object") arg0 = arg0.ptr; else arg0 = ensureString(arg0);
 _emscripten_bind_ASS_Track_set_style_format_1(self, arg0);
};

Object.defineProperty(ASS_Track.prototype, "style_format", {
 get: ASS_Track.prototype.get_style_format,
 set: ASS_Track.prototype.set_style_format
});

ASS_Track.prototype["get_event_format"] = ASS_Track.prototype.get_event_format = function() {
 var self = this.ptr;
 return UTF8ToString(_emscripten_bind_ASS_Track_get_event_format_0(self));
};

ASS_Track.prototype["set_event_format"] = ASS_Track.prototype.set_event_format = function(arg0) {
 var self = this.ptr;
 ensureCache.prepare();
 if (arg0 && typeof arg0 === "object") arg0 = arg0.ptr; else arg0 = ensureString(arg0);
 _emscripten_bind_ASS_Track_set_event_format_1(self, arg0);
};

Object.defineProperty(ASS_Track.prototype, "event_format", {
 get: ASS_Track.prototype.get_event_format,
 set: ASS_Track.prototype.set_event_format
});

ASS_Track.prototype["get_PlayResX"] = ASS_Track.prototype.get_PlayResX = function() {
 var self = this.ptr;
 return _emscripten_bind_ASS_Track_get_PlayResX_0(self);
};

ASS_Track.prototype["set_PlayResX"] = ASS_Track.prototype.set_PlayResX = function(arg0) {
 var self = this.ptr;
 if (arg0 && typeof arg0 === "object") arg0 = arg0.ptr;
 _emscripten_bind_ASS_Track_set_PlayResX_1(self, arg0);
};

Object.defineProperty(ASS_Track.prototype, "PlayResX", {
 get: ASS_Track.prototype.get_PlayResX,
 set: ASS_Track.prototype.set_PlayResX
});

ASS_Track.prototype["get_PlayResY"] = ASS_Track.prototype.get_PlayResY = function() {
 var self = this.ptr;
 return _emscripten_bind_ASS_Track_get_PlayResY_0(self);
};

ASS_Track.prototype["set_PlayResY"] = ASS_Track.prototype.set_PlayResY = function(arg0) {
 var self = this.ptr;
 if (arg0 && typeof arg0 === "object") arg0 = arg0.ptr;
 _emscripten_bind_ASS_Track_set_PlayResY_1(self, arg0);
};

Object.defineProperty(ASS_Track.prototype, "PlayResY", {
 get: ASS_Track.prototype.get_PlayResY,
 set: ASS_Track.prototype.set_PlayResY
});

ASS_Track.prototype["get_Timer"] = ASS_Track.prototype.get_Timer = function() {
 var self = this.ptr;
 return _emscripten_bind_ASS_Track_get_Timer_0(self);
};

ASS_Track.prototype["set_Timer"] = ASS_Track.prototype.set_Timer = function(arg0) {
 var self = this.ptr;
 if (arg0 && typeof arg0 === "object") arg0 = arg0.ptr;
 _emscripten_bind_ASS_Track_set_Timer_1(self, arg0);
};

Object.defineProperty(ASS_Track.prototype, "Timer", {
 get: ASS_Track.prototype.get_Timer,
 set: ASS_Track.prototype.set_Timer
});

ASS_Track.prototype["get_WrapStyle"] = ASS_Track.prototype.get_WrapStyle = function() {
 var self = this.ptr;
 return _emscripten_bind_ASS_Track_get_WrapStyle_0(self);
};

ASS_Track.prototype["set_WrapStyle"] = ASS_Track.prototype.set_WrapStyle = function(arg0) {
 var self = this.ptr;
 if (arg0 && typeof arg0 === "object") arg0 = arg0.ptr;
 _emscripten_bind_ASS_Track_set_WrapStyle_1(self, arg0);
};

Object.defineProperty(ASS_Track.prototype, "WrapStyle", {
 get: ASS_Track.prototype.get_WrapStyle,
 set: ASS_Track.prototype.set_WrapStyle
});

ASS_Track.prototype["get_ScaledBorderAndShadow"] = ASS_Track.prototype.get_ScaledBorderAndShadow = function() {
 var self = this.ptr;
 return _emscripten_bind_ASS_Track_get_ScaledBorderAndShadow_0(self);
};

ASS_Track.prototype["set_ScaledBorderAndShadow"] = ASS_Track.prototype.set_ScaledBorderAndShadow = function(arg0) {
 var self = this.ptr;
 if (arg0 && typeof arg0 === "object") arg0 = arg0.ptr;
 _emscripten_bind_ASS_Track_set_ScaledBorderAndShadow_1(self, arg0);
};

Object.defineProperty(ASS_Track.prototype, "ScaledBorderAndShadow", {
 get: ASS_Track.prototype.get_ScaledBorderAndShadow,
 set: ASS_Track.prototype.set_ScaledBorderAndShadow
});

ASS_Track.prototype["get_Kerning"] = ASS_Track.prototype.get_Kerning = function() {
 var self = this.ptr;
 return _emscripten_bind_ASS_Track_get_Kerning_0(self);
};

ASS_Track.prototype["set_Kerning"] = ASS_Track.prototype.set_Kerning = function(arg0) {
 var self = this.ptr;
 if (arg0 && typeof arg0 === "object") arg0 = arg0.ptr;
 _emscripten_bind_ASS_Track_set_Kerning_1(self, arg0);
};

Object.defineProperty(ASS_Track.prototype, "Kerning", {
 get: ASS_Track.prototype.get_Kerning,
 set: ASS_Track.prototype.set_Kerning
});

ASS_Track.prototype["get_Language"] = ASS_Track.prototype.get_Language = function() {
 var self = this.ptr;
 return UTF8ToString(_emscripten_bind_ASS_Track_get_Language_0(self));
};

ASS_Track.prototype["set_Language"] = ASS_Track.prototype.set_Language = function(arg0) {
 var self = this.ptr;
 ensureCache.prepare();
 if (arg0 && typeof arg0 === "object") arg0 = arg0.ptr; else arg0 = ensureString(arg0);
 _emscripten_bind_ASS_Track_set_Language_1(self, arg0);
};

Object.defineProperty(ASS_Track.prototype, "Language", {
 get: ASS_Track.prototype.get_Language,
 set: ASS_Track.prototype.set_Language
});

ASS_Track.prototype["get_default_style"] = ASS_Track.prototype.get_default_style = function() {
 var self = this.ptr;
 return _emscripten_bind_ASS_Track_get_default_style_0(self);
};

ASS_Track.prototype["set_default_style"] = ASS_Track.prototype.set_default_style = function(arg0) {
 var self = this.ptr;
 if (arg0 && typeof arg0 === "object") arg0 = arg0.ptr;
 _emscripten_bind_ASS_Track_set_default_style_1(self, arg0);
};

Object.defineProperty(ASS_Track.prototype, "default_style", {
 get: ASS_Track.prototype.get_default_style,
 set: ASS_Track.prototype.set_default_style
});

ASS_Track.prototype["get_name"] = ASS_Track.prototype.get_name = function() {
 var self = this.ptr;
 return UTF8ToString(_emscripten_bind_ASS_Track_get_name_0(self));
};

ASS_Track.prototype["set_name"] = ASS_Track.prototype.set_name = function(arg0) {
 var self = this.ptr;
 ensureCache.prepare();
 if (arg0 && typeof arg0 === "object") arg0 = arg0.ptr; else arg0 = ensureString(arg0);
 _emscripten_bind_ASS_Track_set_name_1(self, arg0);
};

Object.defineProperty(ASS_Track.prototype, "name", {
 get: ASS_Track.prototype.get_name,
 set: ASS_Track.prototype.set_name
});

function ASS_RenderPriv() {
 throw "cannot construct a ASS_RenderPriv, no constructor in IDL";
}

ASS_RenderPriv.prototype = Object.create(WrapperObject.prototype);

ASS_RenderPriv.prototype.constructor = ASS_RenderPriv;

ASS_RenderPriv.prototype.__class__ = ASS_RenderPriv;

ASS_RenderPriv.__cache__ = {};

Module["ASS_RenderPriv"] = ASS_RenderPriv;

function ASS_Style() {
 throw "cannot construct a ASS_Style, no constructor in IDL";
}

ASS_Style.prototype = Object.create(WrapperObject.prototype);

ASS_Style.prototype.constructor = ASS_Style;

ASS_Style.prototype.__class__ = ASS_Style;

ASS_Style.__cache__ = {};

Module["ASS_Style"] = ASS_Style;

ASS_Style.prototype["get_Name"] = ASS_Style.prototype.get_Name = function() {
 var self = this.ptr;
 return UTF8ToString(_emscripten_bind_ASS_Style_get_Name_0(self));
};

ASS_Style.prototype["set_Name"] = ASS_Style.prototype.set_Name = function(arg0) {
 var self = this.ptr;
 ensureCache.prepare();
 if (arg0 && typeof arg0 === "object") arg0 = arg0.ptr; else arg0 = ensureString(arg0);
 _emscripten_bind_ASS_Style_set_Name_1(self, arg0);
};

Object.defineProperty(ASS_Style.prototype, "Name", {
 get: ASS_Style.prototype.get_Name,
 set: ASS_Style.prototype.set_Name
});

ASS_Style.prototype["get_FontName"] = ASS_Style.prototype.get_FontName = function() {
 var self = this.ptr;
 return UTF8ToString(_emscripten_bind_ASS_Style_get_FontName_0(self));
};

ASS_Style.prototype["set_FontName"] = ASS_Style.prototype.set_FontName = function(arg0) {
 var self = this.ptr;
 ensureCache.prepare();
 if (arg0 && typeof arg0 === "object") arg0 = arg0.ptr; else arg0 = ensureString(arg0);
 _emscripten_bind_ASS_Style_set_FontName_1(self, arg0);
};

Object.defineProperty(ASS_Style.prototype, "FontName", {
 get: ASS_Style.prototype.get_FontName,
 set: ASS_Style.prototype.set_FontName
});

ASS_Style.prototype["get_FontSize"] = ASS_Style.prototype.get_FontSize = function() {
 var self = this.ptr;
 return _emscripten_bind_ASS_Style_get_FontSize_0(self);
};

ASS_Style.prototype["set_FontSize"] = ASS_Style.prototype.set_FontSize = function(arg0) {
 var self = this.ptr;
 if (arg0 && typeof arg0 === "object") arg0 = arg0.ptr;
 _emscripten_bind_ASS_Style_set_FontSize_1(self, arg0);
};

Object.defineProperty(ASS_Style.prototype, "FontSize", {
 get: ASS_Style.prototype.get_FontSize,
 set: ASS_Style.prototype.set_FontSize
});

ASS_Style.prototype["get_PrimaryColour"] = ASS_Style.prototype.get_PrimaryColour = function() {
 var self = this.ptr;
 return _emscripten_bind_ASS_Style_get_PrimaryColour_0(self);
};

ASS_Style.prototype["set_PrimaryColour"] = ASS_Style.prototype.set_PrimaryColour = function(arg0) {
 var self = this.ptr;
 if (arg0 && typeof arg0 === "object") arg0 = arg0.ptr;
 _emscripten_bind_ASS_Style_set_PrimaryColour_1(self, arg0);
};

Object.defineProperty(ASS_Style.prototype, "PrimaryColour", {
 get: ASS_Style.prototype.get_PrimaryColour,
 set: ASS_Style.prototype.set_PrimaryColour
});

ASS_Style.prototype["get_SecondaryColour"] = ASS_Style.prototype.get_SecondaryColour = function() {
 var self = this.ptr;
 return _emscripten_bind_ASS_Style_get_SecondaryColour_0(self);
};

ASS_Style.prototype["set_SecondaryColour"] = ASS_Style.prototype.set_SecondaryColour = function(arg0) {
 var self = this.ptr;
 if (arg0 && typeof arg0 === "object") arg0 = arg0.ptr;
 _emscripten_bind_ASS_Style_set_SecondaryColour_1(self, arg0);
};

Object.defineProperty(ASS_Style.prototype, "SecondaryColour", {
 get: ASS_Style.prototype.get_SecondaryColour,
 set: ASS_Style.prototype.set_SecondaryColour
});

ASS_Style.prototype["get_OutlineColour"] = ASS_Style.prototype.get_OutlineColour = function() {
 var self = this.ptr;
 return _emscripten_bind_ASS_Style_get_OutlineColour_0(self);
};

ASS_Style.prototype["set_OutlineColour"] = ASS_Style.prototype.set_OutlineColour = function(arg0) {
 var self = this.ptr;
 if (arg0 && typeof arg0 === "object") arg0 = arg0.ptr;
 _emscripten_bind_ASS_Style_set_OutlineColour_1(self, arg0);
};

Object.defineProperty(ASS_Style.prototype, "OutlineColour", {
 get: ASS_Style.prototype.get_OutlineColour,
 set: ASS_Style.prototype.set_OutlineColour
});

ASS_Style.prototype["get_BackColour"] = ASS_Style.prototype.get_BackColour = function() {
 var self = this.ptr;
 return _emscripten_bind_ASS_Style_get_BackColour_0(self);
};

ASS_Style.prototype["set_BackColour"] = ASS_Style.prototype.set_BackColour = function(arg0) {
 var self = this.ptr;
 if (arg0 && typeof arg0 === "object") arg0 = arg0.ptr;
 _emscripten_bind_ASS_Style_set_BackColour_1(self, arg0);
};

Object.defineProperty(ASS_Style.prototype, "BackColour", {
 get: ASS_Style.prototype.get_BackColour,
 set: ASS_Style.prototype.set_BackColour
});

ASS_Style.prototype["get_Bold"] = ASS_Style.prototype.get_Bold = function() {
 var self = this.ptr;
 return _emscripten_bind_ASS_Style_get_Bold_0(self);
};

ASS_Style.prototype["set_Bold"] = ASS_Style.prototype.set_Bold = function(arg0) {
 var self = this.ptr;
 if (arg0 && typeof arg0 === "object") arg0 = arg0.ptr;
 _emscripten_bind_ASS_Style_set_Bold_1(self, arg0);
};

Object.defineProperty(ASS_Style.prototype, "Bold", {
 get: ASS_Style.prototype.get_Bold,
 set: ASS_Style.prototype.set_Bold
});

ASS_Style.prototype["get_Italic"] = ASS_Style.prototype.get_Italic = function() {
 var self = this.ptr;
 return _emscripten_bind_ASS_Style_get_Italic_0(self);
};

ASS_Style.prototype["set_Italic"] = ASS_Style.prototype.set_Italic = function(arg0) {
 var self = this.ptr;
 if (arg0 && typeof arg0 === "object") arg0 = arg0.ptr;
 _emscripten_bind_ASS_Style_set_Italic_1(self, arg0);
};

Object.defineProperty(ASS_Style.prototype, "Italic", {
 get: ASS_Style.prototype.get_Italic,
 set: ASS_Style.prototype.set_Italic
});

ASS_Style.prototype["get_Underline"] = ASS_Style.prototype.get_Underline = function() {
 var self = this.ptr;
 return _emscripten_bind_ASS_Style_get_Underline_0(self);
};

ASS_Style.prototype["set_Underline"] = ASS_Style.prototype.set_Underline = function(arg0) {
 var self = this.ptr;
 if (arg0 && typeof arg0 === "object") arg0 = arg0.ptr;
 _emscripten_bind_ASS_Style_set_Underline_1(self, arg0);
};

Object.defineProperty(ASS_Style.prototype, "Underline", {
 get: ASS_Style.prototype.get_Underline,
 set: ASS_Style.prototype.set_Underline
});

ASS_Style.prototype["get_StrikeOut"] = ASS_Style.prototype.get_StrikeOut = function() {
 var self = this.ptr;
 return _emscripten_bind_ASS_Style_get_StrikeOut_0(self);
};

ASS_Style.prototype["set_StrikeOut"] = ASS_Style.prototype.set_StrikeOut = function(arg0) {
 var self = this.ptr;
 if (arg0 && typeof arg0 === "object") arg0 = arg0.ptr;
 _emscripten_bind_ASS_Style_set_StrikeOut_1(self, arg0);
};

Object.defineProperty(ASS_Style.prototype, "StrikeOut", {
 get: ASS_Style.prototype.get_StrikeOut,
 set: ASS_Style.prototype.set_StrikeOut
});

ASS_Style.prototype["get_ScaleX"] = ASS_Style.prototype.get_ScaleX = function() {
 var self = this.ptr;
 return _emscripten_bind_ASS_Style_get_ScaleX_0(self);
};

ASS_Style.prototype["set_ScaleX"] = ASS_Style.prototype.set_ScaleX = function(arg0) {
 var self = this.ptr;
 if (arg0 && typeof arg0 === "object") arg0 = arg0.ptr;
 _emscripten_bind_ASS_Style_set_ScaleX_1(self, arg0);
};

Object.defineProperty(ASS_Style.prototype, "ScaleX", {
 get: ASS_Style.prototype.get_ScaleX,
 set: ASS_Style.prototype.set_ScaleX
});

ASS_Style.prototype["get_ScaleY"] = ASS_Style.prototype.get_ScaleY = function() {
 var self = this.ptr;
 return _emscripten_bind_ASS_Style_get_ScaleY_0(self);
};

ASS_Style.prototype["set_ScaleY"] = ASS_Style.prototype.set_ScaleY = function(arg0) {
 var self = this.ptr;
 if (arg0 && typeof arg0 === "object") arg0 = arg0.ptr;
 _emscripten_bind_ASS_Style_set_ScaleY_1(self, arg0);
};

Object.defineProperty(ASS_Style.prototype, "ScaleY", {
 get: ASS_Style.prototype.get_ScaleY,
 set: ASS_Style.prototype.set_ScaleY
});

ASS_Style.prototype["get_Spacing"] = ASS_Style.prototype.get_Spacing = function() {
 var self = this.ptr;
 return _emscripten_bind_ASS_Style_get_Spacing_0(self);
};

ASS_Style.prototype["set_Spacing"] = ASS_Style.prototype.set_Spacing = function(arg0) {
 var self = this.ptr;
 if (arg0 && typeof arg0 === "object") arg0 = arg0.ptr;
 _emscripten_bind_ASS_Style_set_Spacing_1(self, arg0);
};

Object.defineProperty(ASS_Style.prototype, "Spacing", {
 get: ASS_Style.prototype.get_Spacing,
 set: ASS_Style.prototype.set_Spacing
});

ASS_Style.prototype["get_Angle"] = ASS_Style.prototype.get_Angle = function() {
 var self = this.ptr;
 return _emscripten_bind_ASS_Style_get_Angle_0(self);
};

ASS_Style.prototype["set_Angle"] = ASS_Style.prototype.set_Angle = function(arg0) {
 var self = this.ptr;
 if (arg0 && typeof arg0 === "object") arg0 = arg0.ptr;
 _emscripten_bind_ASS_Style_set_Angle_1(self, arg0);
};

Object.defineProperty(ASS_Style.prototype, "Angle", {
 get: ASS_Style.prototype.get_Angle,
 set: ASS_Style.prototype.set_Angle
});

ASS_Style.prototype["get_BorderStyle"] = ASS_Style.prototype.get_BorderStyle = function() {
 var self = this.ptr;
 return _emscripten_bind_ASS_Style_get_BorderStyle_0(self);
};

ASS_Style.prototype["set_BorderStyle"] = ASS_Style.prototype.set_BorderStyle = function(arg0) {
 var self = this.ptr;
 if (arg0 && typeof arg0 === "object") arg0 = arg0.ptr;
 _emscripten_bind_ASS_Style_set_BorderStyle_1(self, arg0);
};

Object.defineProperty(ASS_Style.prototype, "BorderStyle", {
 get: ASS_Style.prototype.get_BorderStyle,
 set: ASS_Style.prototype.set_BorderStyle
});

ASS_Style.prototype["get_Outline"] = ASS_Style.prototype.get_Outline = function() {
 var self = this.ptr;
 return _emscripten_bind_ASS_Style_get_Outline_0(self);
};

ASS_Style.prototype["set_Outline"] = ASS_Style.prototype.set_Outline = function(arg0) {
 var self = this.ptr;
 if (arg0 && typeof arg0 === "object") arg0 = arg0.ptr;
 _emscripten_bind_ASS_Style_set_Outline_1(self, arg0);
};

Object.defineProperty(ASS_Style.prototype, "Outline", {
 get: ASS_Style.prototype.get_Outline,
 set: ASS_Style.prototype.set_Outline
});

ASS_Style.prototype["get_Shadow"] = ASS_Style.prototype.get_Shadow = function() {
 var self = this.ptr;
 return _emscripten_bind_ASS_Style_get_Shadow_0(self);
};

ASS_Style.prototype["set_Shadow"] = ASS_Style.prototype.set_Shadow = function(arg0) {
 var self = this.ptr;
 if (arg0 && typeof arg0 === "object") arg0 = arg0.ptr;
 _emscripten_bind_ASS_Style_set_Shadow_1(self, arg0);
};

Object.defineProperty(ASS_Style.prototype, "Shadow", {
 get: ASS_Style.prototype.get_Shadow,
 set: ASS_Style.prototype.set_Shadow
});

ASS_Style.prototype["get_Alignment"] = ASS_Style.prototype.get_Alignment = function() {
 var self = this.ptr;
 return _emscripten_bind_ASS_Style_get_Alignment_0(self);
};

ASS_Style.prototype["set_Alignment"] = ASS_Style.prototype.set_Alignment = function(arg0) {
 var self = this.ptr;
 if (arg0 && typeof arg0 === "object") arg0 = arg0.ptr;
 _emscripten_bind_ASS_Style_set_Alignment_1(self, arg0);
};

Object.defineProperty(ASS_Style.prototype, "Alignment", {
 get: ASS_Style.prototype.get_Alignment,
 set: ASS_Style.prototype.set_Alignment
});

ASS_Style.prototype["get_MarginL"] = ASS_Style.prototype.get_MarginL = function() {
 var self = this.ptr;
 return _emscripten_bind_ASS_Style_get_MarginL_0(self);
};

ASS_Style.prototype["set_MarginL"] = ASS_Style.prototype.set_MarginL = function(arg0) {
 var self = this.ptr;
 if (arg0 && typeof arg0 === "object") arg0 = arg0.ptr;
 _emscripten_bind_ASS_Style_set_MarginL_1(self, arg0);
};

Object.defineProperty(ASS_Style.prototype, "MarginL", {
 get: ASS_Style.prototype.get_MarginL,
 set: ASS_Style.prototype.set_MarginL
});

ASS_Style.prototype["get_MarginR"] = ASS_Style.prototype.get_MarginR = function() {
 var self = this.ptr;
 return _emscripten_bind_ASS_Style_get_MarginR_0(self);
};

ASS_Style.prototype["set_MarginR"] = ASS_Style.prototype.set_MarginR = function(arg0) {
 var self = this.ptr;
 if (arg0 && typeof arg0 === "object") arg0 = arg0.ptr;
 _emscripten_bind_ASS_Style_set_MarginR_1(self, arg0);
};

Object.defineProperty(ASS_Style.prototype, "MarginR", {
 get: ASS_Style.prototype.get_MarginR,
 set: ASS_Style.prototype.set_MarginR
});

ASS_Style.prototype["get_MarginV"] = ASS_Style.prototype.get_MarginV = function() {
 var self = this.ptr;
 return _emscripten_bind_ASS_Style_get_MarginV_0(self);
};

ASS_Style.prototype["set_MarginV"] = ASS_Style.prototype.set_MarginV = function(arg0) {
 var self = this.ptr;
 if (arg0 && typeof arg0 === "object") arg0 = arg0.ptr;
 _emscripten_bind_ASS_Style_set_MarginV_1(self, arg0);
};

Object.defineProperty(ASS_Style.prototype, "MarginV", {
 get: ASS_Style.prototype.get_MarginV,
 set: ASS_Style.prototype.set_MarginV
});

ASS_Style.prototype["get_Encoding"] = ASS_Style.prototype.get_Encoding = function() {
 var self = this.ptr;
 return _emscripten_bind_ASS_Style_get_Encoding_0(self);
};

ASS_Style.prototype["set_Encoding"] = ASS_Style.prototype.set_Encoding = function(arg0) {
 var self = this.ptr;
 if (arg0 && typeof arg0 === "object") arg0 = arg0.ptr;
 _emscripten_bind_ASS_Style_set_Encoding_1(self, arg0);
};

Object.defineProperty(ASS_Style.prototype, "Encoding", {
 get: ASS_Style.prototype.get_Encoding,
 set: ASS_Style.prototype.set_Encoding
});

ASS_Style.prototype["get_treat_fontname_as_pattern"] = ASS_Style.prototype.get_treat_fontname_as_pattern = function() {
 var self = this.ptr;
 return _emscripten_bind_ASS_Style_get_treat_fontname_as_pattern_0(self);
};

ASS_Style.prototype["set_treat_fontname_as_pattern"] = ASS_Style.prototype.set_treat_fontname_as_pattern = function(arg0) {
 var self = this.ptr;
 if (arg0 && typeof arg0 === "object") arg0 = arg0.ptr;
 _emscripten_bind_ASS_Style_set_treat_fontname_as_pattern_1(self, arg0);
};

Object.defineProperty(ASS_Style.prototype, "treat_fontname_as_pattern", {
 get: ASS_Style.prototype.get_treat_fontname_as_pattern,
 set: ASS_Style.prototype.set_treat_fontname_as_pattern
});

ASS_Style.prototype["get_Blur"] = ASS_Style.prototype.get_Blur = function() {
 var self = this.ptr;
 return _emscripten_bind_ASS_Style_get_Blur_0(self);
};

ASS_Style.prototype["set_Blur"] = ASS_Style.prototype.set_Blur = function(arg0) {
 var self = this.ptr;
 if (arg0 && typeof arg0 === "object") arg0 = arg0.ptr;
 _emscripten_bind_ASS_Style_set_Blur_1(self, arg0);
};

Object.defineProperty(ASS_Style.prototype, "Blur", {
 get: ASS_Style.prototype.get_Blur,
 set: ASS_Style.prototype.set_Blur
});

ASS_Style.prototype["get_Justify"] = ASS_Style.prototype.get_Justify = function() {
 var self = this.ptr;
 return _emscripten_bind_ASS_Style_get_Justify_0(self);
};

ASS_Style.prototype["set_Justify"] = ASS_Style.prototype.set_Justify = function(arg0) {
 var self = this.ptr;
 if (arg0 && typeof arg0 === "object") arg0 = arg0.ptr;
 _emscripten_bind_ASS_Style_set_Justify_1(self, arg0);
};

Object.defineProperty(ASS_Style.prototype, "Justify", {
 get: ASS_Style.prototype.get_Justify,
 set: ASS_Style.prototype.set_Justify
});

function ASS_Image() {
 throw "cannot construct a ASS_Image, no constructor in IDL";
}

ASS_Image.prototype = Object.create(WrapperObject.prototype);

ASS_Image.prototype.constructor = ASS_Image;

ASS_Image.prototype.__class__ = ASS_Image;

ASS_Image.__cache__ = {};

Module["ASS_Image"] = ASS_Image;

ASS_Image.prototype["get_w"] = ASS_Image.prototype.get_w = function() {
 var self = this.ptr;
 return _emscripten_bind_ASS_Image_get_w_0(self);
};

ASS_Image.prototype["set_w"] = ASS_Image.prototype.set_w = function(arg0) {
 var self = this.ptr;
 if (arg0 && typeof arg0 === "object") arg0 = arg0.ptr;
 _emscripten_bind_ASS_Image_set_w_1(self, arg0);
};

Object.defineProperty(ASS_Image.prototype, "w", {
 get: ASS_Image.prototype.get_w,
 set: ASS_Image.prototype.set_w
});

ASS_Image.prototype["get_h"] = ASS_Image.prototype.get_h = function() {
 var self = this.ptr;
 return _emscripten_bind_ASS_Image_get_h_0(self);
};

ASS_Image.prototype["set_h"] = ASS_Image.prototype.set_h = function(arg0) {
 var self = this.ptr;
 if (arg0 && typeof arg0 === "object") arg0 = arg0.ptr;
 _emscripten_bind_ASS_Image_set_h_1(self, arg0);
};

Object.defineProperty(ASS_Image.prototype, "h", {
 get: ASS_Image.prototype.get_h,
 set: ASS_Image.prototype.set_h
});

ASS_Image.prototype["get_stride"] = ASS_Image.prototype.get_stride = function() {
 var self = this.ptr;
 return _emscripten_bind_ASS_Image_get_stride_0(self);
};

ASS_Image.prototype["set_stride"] = ASS_Image.prototype.set_stride = function(arg0) {
 var self = this.ptr;
 if (arg0 && typeof arg0 === "object") arg0 = arg0.ptr;
 _emscripten_bind_ASS_Image_set_stride_1(self, arg0);
};

Object.defineProperty(ASS_Image.prototype, "stride", {
 get: ASS_Image.prototype.get_stride,
 set: ASS_Image.prototype.set_stride
});

ASS_Image.prototype["get_bitmap"] = ASS_Image.prototype.get_bitmap = function() {
 var self = this.ptr;
 return _emscripten_bind_ASS_Image_get_bitmap_0(self);
};

ASS_Image.prototype["set_bitmap"] = ASS_Image.prototype.set_bitmap = function(arg0) {
 var self = this.ptr;
 ensureCache.prepare();
 if (arg0 && typeof arg0 === "object") arg0 = arg0.ptr; else arg0 = ensureString(arg0);
 _emscripten_bind_ASS_Image_set_bitmap_1(self, arg0);
};

Object.defineProperty(ASS_Image.prototype, "bitmap", {
 get: ASS_Image.prototype.get_bitmap,
 set: ASS_Image.prototype.set_bitmap
});

ASS_Image.prototype["get_color"] = ASS_Image.prototype.get_color = function() {
 var self = this.ptr;
 return _emscripten_bind_ASS_Image_get_color_0(self);
};

ASS_Image.prototype["set_color"] = ASS_Image.prototype.set_color = function(arg0) {
 var self = this.ptr;
 if (arg0 && typeof arg0 === "object") arg0 = arg0.ptr;
 _emscripten_bind_ASS_Image_set_color_1(self, arg0);
};

Object.defineProperty(ASS_Image.prototype, "color", {
 get: ASS_Image.prototype.get_color,
 set: ASS_Image.prototype.set_color
});

ASS_Image.prototype["get_dst_x"] = ASS_Image.prototype.get_dst_x = function() {
 var self = this.ptr;
 return _emscripten_bind_ASS_Image_get_dst_x_0(self);
};

ASS_Image.prototype["set_dst_x"] = ASS_Image.prototype.set_dst_x = function(arg0) {
 var self = this.ptr;
 if (arg0 && typeof arg0 === "object") arg0 = arg0.ptr;
 _emscripten_bind_ASS_Image_set_dst_x_1(self, arg0);
};

Object.defineProperty(ASS_Image.prototype, "dst_x", {
 get: ASS_Image.prototype.get_dst_x,
 set: ASS_Image.prototype.set_dst_x
});

ASS_Image.prototype["get_dst_y"] = ASS_Image.prototype.get_dst_y = function() {
 var self = this.ptr;
 return _emscripten_bind_ASS_Image_get_dst_y_0(self);
};

ASS_Image.prototype["set_dst_y"] = ASS_Image.prototype.set_dst_y = function(arg0) {
 var self = this.ptr;
 if (arg0 && typeof arg0 === "object") arg0 = arg0.ptr;
 _emscripten_bind_ASS_Image_set_dst_y_1(self, arg0);
};

Object.defineProperty(ASS_Image.prototype, "dst_y", {
 get: ASS_Image.prototype.get_dst_y,
 set: ASS_Image.prototype.set_dst_y
});

ASS_Image.prototype["get_next"] = ASS_Image.prototype.get_next = function() {
 var self = this.ptr;
 return wrapPointer(_emscripten_bind_ASS_Image_get_next_0(self), ASS_Image);
};

ASS_Image.prototype["set_next"] = ASS_Image.prototype.set_next = function(arg0) {
 var self = this.ptr;
 if (arg0 && typeof arg0 === "object") arg0 = arg0.ptr;
 _emscripten_bind_ASS_Image_set_next_1(self, arg0);
};

Object.defineProperty(ASS_Image.prototype, "next", {
 get: ASS_Image.prototype.get_next,
 set: ASS_Image.prototype.set_next
});

function VoidPtr() {
 throw "cannot construct a VoidPtr, no constructor in IDL";
}

VoidPtr.prototype = Object.create(WrapperObject.prototype);

VoidPtr.prototype.constructor = VoidPtr;

VoidPtr.prototype.__class__ = VoidPtr;

VoidPtr.__cache__ = {};

Module["VoidPtr"] = VoidPtr;

VoidPtr.prototype["__destroy__"] = VoidPtr.prototype.__destroy__ = function() {
 var self = this.ptr;
 _emscripten_bind_VoidPtr___destroy___0(self);
};

function ASS_Library() {
 throw "cannot construct a ASS_Library, no constructor in IDL";
}

ASS_Library.prototype = Object.create(WrapperObject.prototype);

ASS_Library.prototype.constructor = ASS_Library;

ASS_Library.prototype.__class__ = ASS_Library;

ASS_Library.__cache__ = {};

Module["ASS_Library"] = ASS_Library;

function libass() {
 this.ptr = _emscripten_bind_libass_libass_0();
 getCache(libass)[this.ptr] = this;
}

libass.prototype = Object.create(WrapperObject.prototype);

libass.prototype.constructor = libass;

libass.prototype.__class__ = libass;

libass.__cache__ = {};

Module["libass"] = libass;

libass.prototype["oct_library_version"] = libass.prototype.oct_library_version = function() {
 var self = this.ptr;
 return _emscripten_bind_libass_oct_library_version_0(self);
};

libass.prototype["oct_library_init"] = libass.prototype.oct_library_init = function() {
 var self = this.ptr;
 return wrapPointer(_emscripten_bind_libass_oct_library_init_0(self), ASS_Library);
};

libass.prototype["oct_library_done"] = libass.prototype.oct_library_done = function(priv) {
 var self = this.ptr;
 if (priv && typeof priv === "object") priv = priv.ptr;
 _emscripten_bind_libass_oct_library_done_1(self, priv);
};

libass.prototype["oct_set_fonts_dir"] = libass.prototype.oct_set_fonts_dir = function(priv, fonts_dir) {
 var self = this.ptr;
 ensureCache.prepare();
 if (priv && typeof priv === "object") priv = priv.ptr;
 if (fonts_dir && typeof fonts_dir === "object") fonts_dir = fonts_dir.ptr; else fonts_dir = ensureString(fonts_dir);
 _emscripten_bind_libass_oct_set_fonts_dir_2(self, priv, fonts_dir);
};

libass.prototype["oct_set_extract_fonts"] = libass.prototype.oct_set_extract_fonts = function(priv, extract) {
 var self = this.ptr;
 if (priv && typeof priv === "object") priv = priv.ptr;
 if (extract && typeof extract === "object") extract = extract.ptr;
 _emscripten_bind_libass_oct_set_extract_fonts_2(self, priv, extract);
};

libass.prototype["oct_set_style_overrides"] = libass.prototype.oct_set_style_overrides = function(priv, list) {
 var self = this.ptr;
 ensureCache.prepare();
 if (priv && typeof priv === "object") priv = priv.ptr;
 _emscripten_bind_libass_oct_set_style_overrides_2(self, priv, list);
};

libass.prototype["oct_process_force_style"] = libass.prototype.oct_process_force_style = function(track) {
 var self = this.ptr;
 if (track && typeof track === "object") track = track.ptr;
 _emscripten_bind_libass_oct_process_force_style_1(self, track);
};

libass.prototype["oct_renderer_init"] = libass.prototype.oct_renderer_init = function(priv) {
 var self = this.ptr;
 if (priv && typeof priv === "object") priv = priv.ptr;
 return wrapPointer(_emscripten_bind_libass_oct_renderer_init_1(self, priv), ASS_Renderer);
};

libass.prototype["oct_renderer_done"] = libass.prototype.oct_renderer_done = function(priv) {
 var self = this.ptr;
 if (priv && typeof priv === "object") priv = priv.ptr;
 _emscripten_bind_libass_oct_renderer_done_1(self, priv);
};

libass.prototype["oct_set_frame_size"] = libass.prototype.oct_set_frame_size = function(priv, w, h) {
 var self = this.ptr;
 if (priv && typeof priv === "object") priv = priv.ptr;
 if (w && typeof w === "object") w = w.ptr;
 if (h && typeof h === "object") h = h.ptr;
 _emscripten_bind_libass_oct_set_frame_size_3(self, priv, w, h);
};

libass.prototype["oct_set_storage_size"] = libass.prototype.oct_set_storage_size = function(priv, w, h) {
 var self = this.ptr;
 if (priv && typeof priv === "object") priv = priv.ptr;
 if (w && typeof w === "object") w = w.ptr;
 if (h && typeof h === "object") h = h.ptr;
 _emscripten_bind_libass_oct_set_storage_size_3(self, priv, w, h);
};

libass.prototype["oct_set_shaper"] = libass.prototype.oct_set_shaper = function(priv, level) {
 var self = this.ptr;
 if (priv && typeof priv === "object") priv = priv.ptr;
 if (level && typeof level === "object") level = level.ptr;
 _emscripten_bind_libass_oct_set_shaper_2(self, priv, level);
};

libass.prototype["oct_set_margins"] = libass.prototype.oct_set_margins = function(priv, t, b, l, r) {
 var self = this.ptr;
 if (priv && typeof priv === "object") priv = priv.ptr;
 if (t && typeof t === "object") t = t.ptr;
 if (b && typeof b === "object") b = b.ptr;
 if (l && typeof l === "object") l = l.ptr;
 if (r && typeof r === "object") r = r.ptr;
 _emscripten_bind_libass_oct_set_margins_5(self, priv, t, b, l, r);
};

libass.prototype["oct_set_use_margins"] = libass.prototype.oct_set_use_margins = function(priv, use) {
 var self = this.ptr;
 if (priv && typeof priv === "object") priv = priv.ptr;
 if (use && typeof use === "object") use = use.ptr;
 _emscripten_bind_libass_oct_set_use_margins_2(self, priv, use);
};

libass.prototype["oct_set_pixel_aspect"] = libass.prototype.oct_set_pixel_aspect = function(priv, par) {
 var self = this.ptr;
 if (priv && typeof priv === "object") priv = priv.ptr;
 if (par && typeof par === "object") par = par.ptr;
 _emscripten_bind_libass_oct_set_pixel_aspect_2(self, priv, par);
};

libass.prototype["oct_set_aspect_ratio"] = libass.prototype.oct_set_aspect_ratio = function(priv, dar, sar) {
 var self = this.ptr;
 if (priv && typeof priv === "object") priv = priv.ptr;
 if (dar && typeof dar === "object") dar = dar.ptr;
 if (sar && typeof sar === "object") sar = sar.ptr;
 _emscripten_bind_libass_oct_set_aspect_ratio_3(self, priv, dar, sar);
};

libass.prototype["oct_set_font_scale"] = libass.prototype.oct_set_font_scale = function(priv, font_scale) {
 var self = this.ptr;
 if (priv && typeof priv === "object") priv = priv.ptr;
 if (font_scale && typeof font_scale === "object") font_scale = font_scale.ptr;
 _emscripten_bind_libass_oct_set_font_scale_2(self, priv, font_scale);
};

libass.prototype["oct_set_hinting"] = libass.prototype.oct_set_hinting = function(priv, ht) {
 var self = this.ptr;
 if (priv && typeof priv === "object") priv = priv.ptr;
 if (ht && typeof ht === "object") ht = ht.ptr;
 _emscripten_bind_libass_oct_set_hinting_2(self, priv, ht);
};

libass.prototype["oct_set_line_spacing"] = libass.prototype.oct_set_line_spacing = function(priv, line_spacing) {
 var self = this.ptr;
 if (priv && typeof priv === "object") priv = priv.ptr;
 if (line_spacing && typeof line_spacing === "object") line_spacing = line_spacing.ptr;
 _emscripten_bind_libass_oct_set_line_spacing_2(self, priv, line_spacing);
};

libass.prototype["oct_set_line_position"] = libass.prototype.oct_set_line_position = function(priv, line_position) {
 var self = this.ptr;
 if (priv && typeof priv === "object") priv = priv.ptr;
 if (line_position && typeof line_position === "object") line_position = line_position.ptr;
 _emscripten_bind_libass_oct_set_line_position_2(self, priv, line_position);
};

libass.prototype["oct_set_fonts"] = libass.prototype.oct_set_fonts = function(priv, default_font, default_family, dfp, config, update) {
 var self = this.ptr;
 ensureCache.prepare();
 if (priv && typeof priv === "object") priv = priv.ptr;
 if (default_font && typeof default_font === "object") default_font = default_font.ptr; else default_font = ensureString(default_font);
 if (default_family && typeof default_family === "object") default_family = default_family.ptr; else default_family = ensureString(default_family);
 if (dfp && typeof dfp === "object") dfp = dfp.ptr;
 if (config && typeof config === "object") config = config.ptr; else config = ensureString(config);
 if (update && typeof update === "object") update = update.ptr;
 _emscripten_bind_libass_oct_set_fonts_6(self, priv, default_font, default_family, dfp, config, update);
};

libass.prototype["oct_set_selective_style_override_enabled"] = libass.prototype.oct_set_selective_style_override_enabled = function(priv, bits) {
 var self = this.ptr;
 if (priv && typeof priv === "object") priv = priv.ptr;
 if (bits && typeof bits === "object") bits = bits.ptr;
 _emscripten_bind_libass_oct_set_selective_style_override_enabled_2(self, priv, bits);
};

libass.prototype["oct_set_selective_style_override"] = libass.prototype.oct_set_selective_style_override = function(priv, style) {
 var self = this.ptr;
 if (priv && typeof priv === "object") priv = priv.ptr;
 if (style && typeof style === "object") style = style.ptr;
 _emscripten_bind_libass_oct_set_selective_style_override_2(self, priv, style);
};

libass.prototype["oct_set_cache_limits"] = libass.prototype.oct_set_cache_limits = function(priv, glyph_max, bitmap_max_size) {
 var self = this.ptr;
 if (priv && typeof priv === "object") priv = priv.ptr;
 if (glyph_max && typeof glyph_max === "object") glyph_max = glyph_max.ptr;
 if (bitmap_max_size && typeof bitmap_max_size === "object") bitmap_max_size = bitmap_max_size.ptr;
 _emscripten_bind_libass_oct_set_cache_limits_3(self, priv, glyph_max, bitmap_max_size);
};

libass.prototype["oct_render_frame"] = libass.prototype.oct_render_frame = function(priv, track, now, detect_change) {
 var self = this.ptr;
 if (priv && typeof priv === "object") priv = priv.ptr;
 if (track && typeof track === "object") track = track.ptr;
 if (now && typeof now === "object") now = now.ptr;
 if (detect_change && typeof detect_change === "object") detect_change = detect_change.ptr;
 return wrapPointer(_emscripten_bind_libass_oct_render_frame_4(self, priv, track, now, detect_change), ASS_Image);
};

libass.prototype["oct_new_track"] = libass.prototype.oct_new_track = function(priv) {
 var self = this.ptr;
 if (priv && typeof priv === "object") priv = priv.ptr;
 return wrapPointer(_emscripten_bind_libass_oct_new_track_1(self, priv), ASS_Track);
};

libass.prototype["oct_free_track"] = libass.prototype.oct_free_track = function(track) {
 var self = this.ptr;
 if (track && typeof track === "object") track = track.ptr;
 _emscripten_bind_libass_oct_free_track_1(self, track);
};

libass.prototype["oct_alloc_style"] = libass.prototype.oct_alloc_style = function(track) {
 var self = this.ptr;
 if (track && typeof track === "object") track = track.ptr;
 return _emscripten_bind_libass_oct_alloc_style_1(self, track);
};

libass.prototype["oct_alloc_event"] = libass.prototype.oct_alloc_event = function(track) {
 var self = this.ptr;
 if (track && typeof track === "object") track = track.ptr;
 return _emscripten_bind_libass_oct_alloc_event_1(self, track);
};

libass.prototype["oct_free_style"] = libass.prototype.oct_free_style = function(track, sid) {
 var self = this.ptr;
 if (track && typeof track === "object") track = track.ptr;
 if (sid && typeof sid === "object") sid = sid.ptr;
 _emscripten_bind_libass_oct_free_style_2(self, track, sid);
};

libass.prototype["oct_free_event"] = libass.prototype.oct_free_event = function(track, eid) {
 var self = this.ptr;
 if (track && typeof track === "object") track = track.ptr;
 if (eid && typeof eid === "object") eid = eid.ptr;
 _emscripten_bind_libass_oct_free_event_2(self, track, eid);
};

libass.prototype["oct_flush_events"] = libass.prototype.oct_flush_events = function(track) {
 var self = this.ptr;
 if (track && typeof track === "object") track = track.ptr;
 _emscripten_bind_libass_oct_flush_events_1(self, track);
};

libass.prototype["oct_read_file"] = libass.prototype.oct_read_file = function(library, fname, codepage) {
 var self = this.ptr;
 ensureCache.prepare();
 if (library && typeof library === "object") library = library.ptr;
 if (fname && typeof fname === "object") fname = fname.ptr; else fname = ensureString(fname);
 if (codepage && typeof codepage === "object") codepage = codepage.ptr; else codepage = ensureString(codepage);
 return wrapPointer(_emscripten_bind_libass_oct_read_file_3(self, library, fname, codepage), ASS_Track);
};

libass.prototype["oct_add_font"] = libass.prototype.oct_add_font = function(library, name, data, data_size) {
 var self = this.ptr;
 ensureCache.prepare();
 if (library && typeof library === "object") library = library.ptr;
 if (name && typeof name === "object") name = name.ptr; else name = ensureString(name);
 if (data && typeof data === "object") data = data.ptr; else data = ensureString(data);
 if (data_size && typeof data_size === "object") data_size = data_size.ptr;
 _emscripten_bind_libass_oct_add_font_4(self, library, name, data, data_size);
};

libass.prototype["oct_clear_fonts"] = libass.prototype.oct_clear_fonts = function(library) {
 var self = this.ptr;
 if (library && typeof library === "object") library = library.ptr;
 _emscripten_bind_libass_oct_clear_fonts_1(self, library);
};

libass.prototype["oct_step_sub"] = libass.prototype.oct_step_sub = function(track, now, movement) {
 var self = this.ptr;
 if (track && typeof track === "object") track = track.ptr;
 if (now && typeof now === "object") now = now.ptr;
 if (movement && typeof movement === "object") movement = movement.ptr;
 return _emscripten_bind_libass_oct_step_sub_3(self, track, now, movement);
};

(function() {
 function setupEnums() {
  Module["ASS_HINTING_NONE"] = _emscripten_enum_ASS_Hinting_ASS_HINTING_NONE();
  Module["ASS_HINTING_LIGHT"] = _emscripten_enum_ASS_Hinting_ASS_HINTING_LIGHT();
  Module["ASS_HINTING_NORMAL"] = _emscripten_enum_ASS_Hinting_ASS_HINTING_NORMAL();
  Module["ASS_HINTING_NATIVE"] = _emscripten_enum_ASS_Hinting_ASS_HINTING_NATIVE();
  Module["ASS_SHAPING_SIMPLE"] = _emscripten_enum_ASS_ShapingLevel_ASS_SHAPING_SIMPLE();
  Module["ASS_SHAPING_COMPLEX"] = _emscripten_enum_ASS_ShapingLevel_ASS_SHAPING_COMPLEX();
  Module["ASS_OVERRIDE_DEFAULT"] = _emscripten_enum_ASS_OverrideBits_ASS_OVERRIDE_DEFAULT();
  Module["ASS_OVERRIDE_BIT_STYLE"] = _emscripten_enum_ASS_OverrideBits_ASS_OVERRIDE_BIT_STYLE();
  Module["ASS_OVERRIDE_BIT_SELECTIVE_FONT_SCALE"] = _emscripten_enum_ASS_OverrideBits_ASS_OVERRIDE_BIT_SELECTIVE_FONT_SCALE();
  Module["ASS_OVERRIDE_BIT_FONT_SIZE"] = _emscripten_enum_ASS_OverrideBits_ASS_OVERRIDE_BIT_FONT_SIZE();
  Module["ASS_OVERRIDE_BIT_FONT_SIZE_FIELDS"] = _emscripten_enum_ASS_OverrideBits_ASS_OVERRIDE_BIT_FONT_SIZE_FIELDS();
  Module["ASS_OVERRIDE_BIT_FONT_NAME"] = _emscripten_enum_ASS_OverrideBits_ASS_OVERRIDE_BIT_FONT_NAME();
  Module["ASS_OVERRIDE_BIT_COLORS"] = _emscripten_enum_ASS_OverrideBits_ASS_OVERRIDE_BIT_COLORS();
  Module["ASS_OVERRIDE_BIT_ATTRIBUTES"] = _emscripten_enum_ASS_OverrideBits_ASS_OVERRIDE_BIT_ATTRIBUTES();
  Module["ASS_OVERRIDE_BIT_BORDER"] = _emscripten_enum_ASS_OverrideBits_ASS_OVERRIDE_BIT_BORDER();
  Module["ASS_OVERRIDE_BIT_ALIGNMENT"] = _emscripten_enum_ASS_OverrideBits_ASS_OVERRIDE_BIT_ALIGNMENT();
  Module["ASS_OVERRIDE_BIT_MARGINS"] = _emscripten_enum_ASS_OverrideBits_ASS_OVERRIDE_BIT_MARGINS();
  Module["ASS_OVERRIDE_FULL_STYLE"] = _emscripten_enum_ASS_OverrideBits_ASS_OVERRIDE_FULL_STYLE();
  Module["ASS_OVERRIDE_BIT_JUSTIFY"] = _emscripten_enum_ASS_OverrideBits_ASS_OVERRIDE_BIT_JUSTIFY();
 }
 if (runtimeInitialized) setupEnums(); else addOnPreMain(setupEnums);
})();

Module["FS"] = FS;

self.delay = 0;

self.lastCurrentTime = 0;

self.rate = 1;

self.rafId = null;

self.nextIsRaf = false;

self.lastCurrentTimeReceivedAt = Date.now();

self.targetFps = 30;

self.width = 0;

self.height = 0;

self.fontMap_ = {};

self.fontId = 0;

self.writeFontToFS = function(font) {
 font = font.trim().toLowerCase();
 if (font.startsWith("@")) {
  font = font.substr(1);
 }
 if (self.fontMap_.hasOwnProperty(font)) return;
 self.fontMap_[font] = true;
 if (!self.availableFonts.hasOwnProperty(font)) return;
 var content = readBinary(self.availableFonts[font]);
 Module["FS"].writeFile("/fonts/font" + self.fontId++ + "-" + self.availableFonts[font].split("/").pop(), content, {
  encoding: "binary"
 });
};

self.writeAvailableFontsToFS = function(content) {
 if (!self.availableFonts) return;
 var sections = parseAss(content);
 for (var i = 0; i < sections.length; i++) {
  for (var j = 0; j < sections[i].body.length; j++) {
   if (sections[i].body[j].key === "Style") {
    self.writeFontToFS(sections[i].body[j].value["Fontname"]);
   }
  }
 }
 var regex = /\\fn([^\\}]*?)[\\}]/g;
 var matches;
 while (matches = regex.exec(self.subContent)) {
  self.writeFontToFS(matches[1]);
 }
};

self.setTrack = function(content) {
 self.writeAvailableFontsToFS(content);
 Module["FS"].writeFile("/sub.ass", content);
 self.octObj.createTrack("/sub.ass");
 self.ass_track = self.octObj.track;
 if (self.fastRenderMode) {
  self.fastRender();
 } else {
  self.render();
 }
};

self.freeTrack = function() {
 self.octObj.removeTrack();
 if (self.fastRenderMode) {
  self.fastRender();
 } else {
  self.render();
 }
};

self.setTrackByUrl = function(url) {
 var content = "";
 if (url.endsWith(".br")) {
  content = Module["BrotliDecode"](readBinary(url));
 } else {
  content = read_(url);
 }
 self.setTrack(content);
};

self.resize = function(width, height) {
 self.width = width;
 self.height = height;
 self.octObj.resizeCanvas(width, height);
};

self.getCurrentTime = function() {
 var diff = (Date.now() - self.lastCurrentTimeReceivedAt) / 1e3;
 if (self._isPaused) {
  return self.lastCurrentTime;
 } else {
  if (diff > 5) {
   console.error("Didn't received currentTime > 5 seconds. Assuming video was paused.");
   self.setIsPaused(true);
  }
  return self.lastCurrentTime + diff * self.rate;
 }
};

self.setCurrentTime = function(currentTime) {
 self.lastCurrentTime = currentTime;
 self.lastCurrentTimeReceivedAt = Date.now();
 if (!self.rafId) {
  if (self.nextIsRaf) {
   if (self.fastRenderMode) {
    self.rafId = self.requestAnimationFrame(self.fastRender);
   } else {
    self.rafId = self.requestAnimationFrame(self.render);
   }
  } else {
   if (self.fastRenderMode) {
    self.fastRender();
   } else {
    self.render();
   }
   setTimeout(function() {
    self.nextIsRaf = false;
   }, 20);
  }
 }
};

self._isPaused = true;

self.getIsPaused = function() {
 return self._isPaused;
};

self.setIsPaused = function(isPaused) {
 if (isPaused != self._isPaused) {
  self._isPaused = isPaused;
  if (isPaused) {
   if (self.rafId) {
    clearTimeout(self.rafId);
    self.rafId = null;
   }
  } else {
   self.lastCurrentTimeReceivedAt = Date.now();
   if (self.fastRenderMode) {
    self.rafId = self.requestAnimationFrame(self.fastRender);
   } else {
    self.rafId = self.requestAnimationFrame(self.render);
   }
  }
 }
};

self.render = function(force) {
 self.rafId = 0;
 self.renderPending = false;
 var startTime = performance.now();
 var renderResult = self.octObj.renderImage(self.getCurrentTime() + self.delay, self.changed);
 var changed = Module.getValue(self.changed, "i32");
 if (changed != 0 || force) {
  var result = self.buildResult(renderResult);
  var spentTime = performance.now() - startTime;
  postMessage({
   target: "canvas",
   op: "renderCanvas",
   time: Date.now(),
   spentTime: spentTime,
   canvases: result[0]
  }, result[1]);
 }
 if (!self._isPaused) {
  self.rafId = self.requestAnimationFrame(self.render);
 }
};

self.fastRender = function(force) {
 self.rafId = 0;
 self.renderPending = false;
 var startTime = performance.now();
 var renderResult = self.octObj.renderImage(self.getCurrentTime() + self.delay, self.changed);
 var changed = Module.getValue(self.changed, "i32");
 if (changed != 0 || force) {
  var result = self.buildResult(renderResult);
  var newTime = performance.now();
  var libassTime = newTime - startTime;
  var promises = [];
  for (var i = 0; i < result[0].length; i++) {
   var image = result[0][i];
   var imageBuffer = new Uint8ClampedArray(image.buffer);
   var imageData = new ImageData(imageBuffer, image.w, image.h);
   promises[i] = createImageBitmap(imageData, 0, 0, image.w, image.h);
  }
  Promise.all(promises).then(function(imgs) {
   var decodeTime = performance.now() - newTime;
   var bitmaps = [];
   for (var i = 0; i < imgs.length; i++) {
    var image = result[0][i];
    bitmaps[i] = {
     x: image.x,
     y: image.y,
     bitmap: imgs[i]
    };
   }
   postMessage({
    target: "canvas",
    op: "renderFastCanvas",
    time: Date.now(),
    libassTime: libassTime,
    decodeTime: decodeTime,
    bitmaps: bitmaps
   }, imgs);
  });
 }
 if (!self._isPaused) {
  self.rafId = self.requestAnimationFrame(self.fastRender);
 }
};

self.buildResult = function(ptr) {
 var items = [];
 var transferable = [];
 var item;
 while (ptr.ptr != 0) {
  item = self.buildResultItem(ptr);
  if (item !== null) {
   items.push(item);
   transferable.push(item.buffer);
  }
  ptr = ptr.next;
 }
 return [ items, transferable ];
};

self.buildResultItem = function(ptr) {
 var bitmap = ptr.bitmap, stride = ptr.stride, w = ptr.w, h = ptr.h, color = ptr.color;
 if (w == 0 || h == 0) {
  return null;
 }
 var r = color >> 24 & 255, g = color >> 16 & 255, b = color >> 8 & 255, a = 255 - (color & 255);
 var result = new Uint8ClampedArray(4 * w * h);
 var bitmapPosition = 0;
 var resultPosition = 0;
 for (var y = 0; y < h; ++y) {
  for (var x = 0; x < w; ++x) {
   var k = Module.HEAPU8[bitmap + bitmapPosition + x] * a / 255;
   result[resultPosition] = r;
   result[resultPosition + 1] = g;
   result[resultPosition + 2] = b;
   result[resultPosition + 3] = k;
   resultPosition += 4;
  }
  bitmapPosition += stride;
 }
 x = ptr.dst_x;
 y = ptr.dst_y;
 return {
  w: w,
  h: h,
  x: x,
  y: y,
  buffer: result.buffer
 };
};

if (typeof SDL !== "undefined") {
 SDL.defaults.copyOnLock = false;
 SDL.defaults.discardOnLock = false;
 SDL.defaults.opaqueFrontBuffer = false;
}

function parseAss(content) {
 var m, format, lastPart, parts, key, value, tmp, i, j, body;
 var sections = [];
 var lines = content.split(/[\r\n]+/g);
 for (i = 0; i < lines.length; i++) {
  m = lines[i].match(/^\[(.*)\]$/);
  if (m) {
   format = null;
   sections.push({
    name: m[1],
    body: []
   });
  } else {
   if (/^\s*$/.test(lines[i])) continue;
   if (sections.length === 0) continue;
   body = sections[sections.length - 1].body;
   if (lines[i][0] === ";") {
    body.push({
     type: "comment",
     value: lines[i].substring(1)
    });
   } else {
    parts = lines[i].split(":");
    key = parts[0];
    value = parts.slice(1).join(":").trim();
    if (format || key === "Format") {
     value = value.split(",");
     if (format && value.length > format.length) {
      lastPart = value.slice(format.length - 1).join(",");
      value = value.slice(0, format.length - 1);
      value.push(lastPart);
     }
     value = value.map(function(s) {
      return s.trim();
     });
     if (format) {
      tmp = {};
      for (j = 0; j < value.length; j++) {
       tmp[format[j]] = value[j];
      }
      value = tmp;
     }
    }
    if (key === "Format") {
     format = value;
    }
    body.push({
     key: key,
     value: value
    });
   }
  }
 }
 return sections;
}

self.requestAnimationFrame = function() {
 var nextRAF = 0;
 return function(func) {
  var now = Date.now();
  if (nextRAF === 0) {
   nextRAF = now + 1e3 / self.targetFps;
  } else {
   while (now + 2 >= nextRAF) {
    nextRAF += 1e3 / self.targetFps;
   }
  }
  var delay = Math.max(nextRAF - now, 0);
  return setTimeout(func, delay);
 };
}();

var screen = {
 width: 0,
 height: 0
};

Module.print = function Module_print(x) {
 postMessage({
  target: "stdout",
  content: x
 });
};

Module.printErr = function Module_printErr(x) {
 postMessage({
  target: "stderr",
  content: x
 });
};

var frameId = 0;

var clientFrameId = 0;

var commandBuffer = [];

var postMainLoop = Module["postMainLoop"];

Module["postMainLoop"] = function() {
 if (postMainLoop) postMainLoop();
 postMessage({
  target: "tick",
  id: frameId++
 });
 commandBuffer = [];
};

addRunDependency("worker-init");

var messageBuffer = null;

var messageResenderTimeout = null;

function messageResender() {
 if (calledMain) {
  assert(messageBuffer && messageBuffer.length > 0);
  messageResenderTimeout = null;
  messageBuffer.forEach(function(message) {
   onmessage(message);
  });
  messageBuffer = null;
 } else {
  messageResenderTimeout = setTimeout(messageResender, 50);
 }
}

function onMessageFromMainEmscriptenThread(message) {
 if (!calledMain && !message.data.preMain) {
  if (!messageBuffer) {
   messageBuffer = [];
   messageResenderTimeout = setTimeout(messageResender, 50);
  }
  messageBuffer.push(message);
  return;
 }
 if (calledMain && messageResenderTimeout) {
  clearTimeout(messageResenderTimeout);
  messageResender();
 }
 switch (message.data.target) {
 case "window":
  {
   self.fireEvent(message.data.event);
   break;
  }

 case "canvas":
  {
   if (message.data.event) {
    Module.canvas.fireEvent(message.data.event);
   } else if (message.data.width) {
    if (Module.canvas && message.data.boundingClientRect) {
     Module.canvas.boundingClientRect = message.data.boundingClientRect;
    }
    self.resize(message.data.width, message.data.height);
    if (self.fastRenderMode) {
     self.fastRender();
    } else {
     self.render();
    }
   } else throw "ey?";
   break;
  }

 case "video":
  {
   if (message.data.currentTime !== undefined) {
    self.setCurrentTime(message.data.currentTime);
   }
   if (message.data.isPaused !== undefined) {
    self.setIsPaused(message.data.isPaused);
   }
   if (message.data.rate) {
    self.rate = message.data.rate;
   }
   break;
  }

 case "tock":
  {
   clientFrameId = message.data.id;
   break;
  }

 case "worker-init":
  {
   screen.width = self.width = message.data.width;
   screen.height = self.height = message.data.height;
   self.subUrl = message.data.subUrl;
   self.subContent = message.data.subContent;
   self.fontFiles = message.data.fonts;
   self.fastRenderMode = message.data.fastRender;
   self.availableFonts = message.data.availableFonts;
   self.debug = message.data.debug;
   if (!hasNativeConsole && self.debug) {
    console = makeCustomConsole();
    console.log("overridden console");
   }
   if (Module.canvas) {
    Module.canvas.width_ = message.data.width;
    Module.canvas.height_ = message.data.height;
    if (message.data.boundingClientRect) {
     Module.canvas.boundingClientRect = message.data.boundingClientRect;
    }
   }
   removeRunDependency("worker-init");
   break;
  }

 case "destroy":
  self.octObj.quitLibrary();
  break;

 case "free-track":
  self.freeTrack();
  break;

 case "set-track":
  self.setTrack(message.data.content);
  break;

 case "set-track-by-url":
  self.setTrackByUrl(message.data.url);
  break;

 case "create-event":
  var event = message.data.event;
  var i = self.octObj.allocEvent();
  var evnt_ptr = self.octObj.track.get_events(i);
  var vargs = Object.keys(event);
  for (const varg of vargs) {
   evnt_ptr[varg] = event[varg];
  }
  break;

 case "get-events":
  var events = [];
  for (var i = 0; i < self.octObj.getEventCount(); i++) {
   var evnt_ptr = self.octObj.track.get_events(i);
   var event = {
    Start: evnt_ptr.get_Start(),
    Duration: evnt_ptr.get_Duration(),
    ReadOrder: evnt_ptr.get_ReadOrder(),
    Layer: evnt_ptr.get_Layer(),
    Style: evnt_ptr.get_Style(),
    Name: evnt_ptr.get_Name(),
    MarginL: evnt_ptr.get_MarginL(),
    MarginR: evnt_ptr.get_MarginR(),
    MarginV: evnt_ptr.get_MarginV(),
    Effect: evnt_ptr.get_Effect(),
    Text: evnt_ptr.get_Text()
   };
   events.push(event);
  }
  postMessage({
   target: "get-events",
   time: Date.now(),
   events: events
  });
  break;

 case "set-event":
  var event = message.data.event;
  var i = message.data.index;
  var evnt_ptr = self.octObj.track.get_events(i);
  var vargs = Object.keys(event);
  for (const varg of vargs) {
   evnt_ptr[varg] = event[varg];
  }
  break;

 case "remove-event":
  var i = message.data.index;
  self.octObj.removeEvent(i);
  break;

 case "create-style":
  var style = message.data.style;
  var i = self.octObj.allocStyle();
  var styl_ptr = self.octObj.track.get_styles(i);
  var vargs = Object.keys(style);
  for (const varg of vargs) {
   styl_ptr[varg] = style[varg];
  }
  break;

 case "get-styles":
  var styles = [];
  for (var i = 0; i < self.octObj.getStyleCount(); i++) {
   var styl_ptr = self.octObj.track.get_styles(i);
   var style = {
    Name: styl_ptr.get_Name(),
    FontName: styl_ptr.get_FontName(),
    FontSize: styl_ptr.get_FontSize(),
    PrimaryColour: styl_ptr.get_PrimaryColour(),
    SecondaryColour: styl_ptr.get_SecondaryColour(),
    OutlineColour: styl_ptr.get_OutlineColour(),
    BackColour: styl_ptr.get_BackColour(),
    Bold: styl_ptr.get_Bold(),
    Italic: styl_ptr.get_Italic(),
    Underline: styl_ptr.get_Underline(),
    StrikeOut: styl_ptr.get_StrikeOut(),
    ScaleX: styl_ptr.get_ScaleX(),
    ScaleY: styl_ptr.get_ScaleY(),
    Spacing: styl_ptr.get_Spacing(),
    Angle: styl_ptr.get_Angle(),
    BorderStyle: styl_ptr.get_BorderStyle(),
    Outline: styl_ptr.get_Outline(),
    Shadow: styl_ptr.get_Shadow(),
    Alignment: styl_ptr.get_Alignment(),
    MarginL: styl_ptr.get_MarginL(),
    MarginR: styl_ptr.get_MarginR(),
    MarginV: styl_ptr.get_MarginV(),
    Encoding: styl_ptr.get_Encoding(),
    treat_fontname_as_pattern: styl_ptr.get_treat_fontname_as_pattern(),
    Blur: styl_ptr.get_Blur(),
    Justify: styl_ptr.get_Justify()
   };
   styles.push(style);
  }
  postMessage({
   target: "get-styles",
   time: Date.now(),
   styles: styles
  });
  break;

 case "set-style":
  var style = message.data.style;
  var i = message.data.index;
  var styl_ptr = self.octObj.track.get_styles(i);
  var vargs = Object.keys(style);
  for (const varg of vargs) {
   styl_ptr[varg] = style[varg];
  }
  break;

 case "remove-style":
  var i = message.data.index;
  self.octObj.removeStyle(i);
  break;

 case "runBenchmark":
  {
   self.runBenchmark();
   break;
  }

 case "custom":
  {
   if (Module["onCustomMessage"]) {
    Module["onCustomMessage"](message);
   } else {
    throw "Custom message received but worker Module.onCustomMessage not implemented.";
   }
   break;
  }

 case "setimmediate":
  {
   if (Module["setImmediates"]) Module["setImmediates"].shift()();
   break;
  }

 default:
  throw "wha? " + message.data.target;
 }
}

onmessage = onMessageFromMainEmscriptenThread;

self.runBenchmark = function(seconds, pos, async) {
 var totalTime = 0;
 var i = 0;
 pos = pos || 0;
 seconds = seconds || 60;
 var count = seconds * self.targetFps;
 var start = performance.now();
 var longestFrame = 0;
 var run = function() {
  var t0 = performance.now();
  pos += 1 / self.targetFps;
  self.setCurrentTime(pos);
  var t1 = performance.now();
  var diff = t1 - t0;
  totalTime += diff;
  if (diff > longestFrame) {
   longestFrame = diff;
  }
  if (i < count) {
   i++;
   if (async) {
    self.requestAnimationFrame(run);
    return false;
   } else {
    return true;
   }
  } else {
   console.log("Performance fps: " + Math.round(1e3 / (totalTime / count)) + "");
   console.log("Real fps: " + Math.round(1e3 / ((t1 - start) / count)) + "");
   console.log("Total time: " + totalTime);
   console.log("Longest frame: " + Math.ceil(longestFrame) + "ms (" + Math.floor(1e3 / longestFrame) + " fps)");
   return false;
  }
 };
 while (true) {
  if (!run()) {
   break;
  }
 }
};
