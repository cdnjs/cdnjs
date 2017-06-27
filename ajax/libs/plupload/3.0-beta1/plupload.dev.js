/**
 * Plupload - multi-runtime File Uploader
 * v3.0-beta1
 *
 * Copyright 2013, Moxiecode Systems AB
 * Released under GPL License.
 *
 * License: http://www.plupload.com/license
 * Contributing: http://www.plupload.com/contributing
 *
 * Date: 2016-08-24
 */
;var MXI_DEBUG = true;
/**
 * Inline development version. Only to be used while developing since it uses document.write to load scripts.
 */

/*jshint smarttabs:true, undef:true, latedef:true, curly:true, bitwise:true, camelcase:true */
/*globals $code */

(function(exports) {
	"use strict";

	var html = "", baseDir;
	var modules = {}, exposedModules = [], moduleCount = 0;

	var scripts = document.getElementsByTagName('script');
	for (var i = 0; i < scripts.length; i++) {
		var src = scripts[i].src;

		if (src.indexOf('/plupload.dev.js') != -1) {
			baseDir = src.substring(0, src.lastIndexOf('/'));
		}
	}

	function require(ids, callback) {
		var module, defs = [];

		for (var i = 0; i < ids.length; ++i) {
			module = modules[ids[i]] || resolve(ids[i]);
			if (!module) {
				throw 'module definition dependecy not found: ' + ids[i];
			}

			defs.push(module);
		}

		callback.apply(null, defs);
	}

	function resolve(id) {
		var target = exports;
		var fragments = id.split(/[.\/]/);

		for (var fi = 0; fi < fragments.length; ++fi) {
			if (!target[fragments[fi]]) {
				return;
			}

			target = target[fragments[fi]];
		}

		return target;
	}

	function register(id) {
		var target = exports;
		var fragments = id.split(/[.\/]/);

		for (var fi = 0; fi < fragments.length - 1; ++fi) {
			if (target[fragments[fi]] === undefined) {
				target[fragments[fi]] = {};
			}

			target = target[fragments[fi]];
		}

		target[fragments[fragments.length - 1]] = modules[id];
	}

	function define(id, dependencies, definition) {
		if (typeof id !== 'string') {
			throw 'invalid module definition, module id must be defined and be a string';
		}

		if (dependencies === undefined) {
			throw 'invalid module definition, dependencies must be specified';
		}

		if (definition === undefined) {
			throw 'invalid module definition, definition function must be specified';
		}

		require(dependencies, function() {
			modules[id] = definition.apply(null, arguments);
		});

		if (--moduleCount === 0) {
			for (var i = 0; i < exposedModules.length; i++) {
				register(exposedModules[i]);
			}
		}
	}

	function defined(id) {
		return !!modules[id];
	}

	function expose(ids) {
		exposedModules = ids;
	}

	function writeScripts() {
		document.write(html);
	}

	function load(path) {
		html += '<script type="text/javascript" src="' + baseDir + '/' + path + '"></script>\n';
		moduleCount++;
	}

	// Expose globally
	exports.define = define;
	exports.defined = defined;
	exports.require = require;

	expose(["moxie/core/utils/Basic","moxie/core/I18n","moxie/core/utils/Env","moxie/core/utils/Dom","moxie/core/utils/Events","moxie/core/utils/Url","moxie/core/Exceptions","moxie/core/EventTarget","moxie/runtime/Runtime","moxie/core/utils/Mime","moxie/runtime/RuntimeClient","moxie/file/FileInput","moxie/core/utils/Encode","moxie/file/Blob","moxie/file/FileReader","plupload","moxie/file/File","moxie/file/FileDrop","moxie/runtime/RuntimeTarget","moxie/xhr/FormData","moxie/xhr/XMLHttpRequest","plupload/FileUploader","moxie/runtime/Transporter","moxie/image/Image","plupload/ImageResizer","plupload/File","plupload/Uploader","moxie/runtime/html5/image/ResizerCanvas","moxie/runtime/html5/image/ResizerWebGL"]);

	load('../src/moxie/src/javascript/core/utils/Basic.js');
	load('../src/moxie/src/javascript/core/I18n.js');
	load('../src/moxie/src/javascript/core/utils/Env.js');
	load('../src/moxie/src/javascript/core/utils/Dom.js');
	load('../src/moxie/src/javascript/core/utils/Events.js');
	load('../src/moxie/src/javascript/core/utils/Url.js');
	load('../src/moxie/src/javascript/core/Exceptions.js');
	load('../src/moxie/src/javascript/core/EventTarget.js');
	load('../src/moxie/src/javascript/runtime/Runtime.js');
	load('../src/moxie/src/javascript/core/utils/Mime.js');
	load('../src/moxie/src/javascript/runtime/RuntimeClient.js');
	load('../src/moxie/src/javascript/file/FileInput.js');
	load('../src/moxie/src/javascript/core/utils/Encode.js');
	load('../src/moxie/src/javascript/file/Blob.js');
	load('../src/moxie/src/javascript/file/FileReader.js');
	load('../src/plupload.js');
	load('../src/core/Collection.js');
	load('../src/moxie/src/javascript/file/File.js');
	load('../src/moxie/src/javascript/file/FileDrop.js');
	load('../src/core/Optionable.js');
	load('../src/core/Queueable.js');
	load('../src/core/Stats.js');
	load('../src/core/Queue.js');
	load('../src/QueueUpload.js');
	load('../src/QueueResize.js');
	load('../src/moxie/src/javascript/runtime/RuntimeTarget.js');
	load('../src/moxie/src/javascript/file/FileReaderSync.js');
	load('../src/moxie/src/javascript/xhr/FormData.js');
	load('../src/moxie/src/javascript/xhr/XMLHttpRequest.js');
	load('../src/ChunkUploader.js');
	load('../src/FileUploader.js');
	load('../src/moxie/src/javascript/runtime/Transporter.js');
	load('../src/moxie/src/javascript/image/Image.js');
	load('../src/ImageResizer.js');
	load('../src/File.js');
	load('../src/Uploader.js');
	load('../src/moxie/src/javascript/runtime/html5/Runtime.js');
	load('../src/moxie/src/javascript/runtime/html5/file/Blob.js');
	load('../src/moxie/src/javascript/runtime/html5/file/FileInput.js');
	load('../src/moxie/src/javascript/runtime/html5/file/FileDrop.js');
	load('../src/moxie/src/javascript/runtime/html5/file/FileReader.js');
	load('../src/moxie/src/javascript/runtime/html5/xhr/XMLHttpRequest.js');
	load('../src/moxie/src/javascript/runtime/html5/utils/BinaryReader.js');
	load('../src/moxie/src/javascript/runtime/html5/image/JPEGHeaders.js');
	load('../src/moxie/src/javascript/runtime/html5/image/ExifParser.js');
	load('../src/moxie/src/javascript/runtime/html5/image/JPEG.js');
	load('../src/moxie/src/javascript/runtime/html5/image/PNG.js');
	load('../src/moxie/src/javascript/runtime/html5/image/ImageInfo.js');
	load('../src/moxie/src/javascript/runtime/html5/image/ResizerCanvas.js');
	load('../src/moxie/src/javascript/runtime/html5/image/ResizerWebGL.js');
	load('../src/moxie/src/javascript/runtime/html5/image/Image.js');
	load('../src/moxie/src/javascript/runtime/flash/Runtime.js');
	load('../src/moxie/src/javascript/runtime/flash/file/Blob.js');
	load('../src/moxie/src/javascript/runtime/flash/file/FileInput.js');
	load('../src/moxie/src/javascript/runtime/flash/file/FileReader.js');
	load('../src/moxie/src/javascript/runtime/flash/file/FileReaderSync.js');
	load('../src/moxie/src/javascript/runtime/flash/runtime/Transporter.js');
	load('../src/moxie/src/javascript/runtime/flash/xhr/XMLHttpRequest.js');
	load('../src/moxie/src/javascript/runtime/flash/image/Image.js');
	load('../src/moxie/src/javascript/runtime/silverlight/Runtime.js');
	load('../src/moxie/src/javascript/runtime/silverlight/file/Blob.js');
	load('../src/moxie/src/javascript/runtime/silverlight/file/FileInput.js');
	load('../src/moxie/src/javascript/runtime/silverlight/file/FileDrop.js');
	load('../src/moxie/src/javascript/runtime/silverlight/file/FileReader.js');
	load('../src/moxie/src/javascript/runtime/silverlight/file/FileReaderSync.js');
	load('../src/moxie/src/javascript/runtime/silverlight/runtime/Transporter.js');
	load('../src/moxie/src/javascript/runtime/silverlight/xhr/XMLHttpRequest.js');
	load('../src/moxie/src/javascript/runtime/silverlight/image/Image.js');
	load('../src/moxie/src/javascript/runtime/html4/Runtime.js');
	load('../src/moxie/src/javascript/runtime/html4/file/FileInput.js');
	load('../src/moxie/src/javascript/runtime/html4/file/FileReader.js');
	load('../src/moxie/src/javascript/runtime/html4/xhr/XMLHttpRequest.js');
	load('../src/moxie/src/javascript/runtime/html4/image/Image.js');

	writeScripts();
})(this);

// $hash: 8611d36a03b190377b8abdcfe5d0b432