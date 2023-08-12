/*!
 * Author : Matteo Bruni
 * MIT license: https://opensource.org/licenses/MIT
 * Demo / Generator : https://particles.js.org/
 * GitHub : https://www.github.com/matteobruni/tsparticles
 * How to use? : Check the GitHub README
 * v2.12.0
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  loadExportVideoPlugin: () => (/* binding */ loadExportVideoPlugin)
});

;// CONCATENATED MODULE: ./dist/browser/ExportVideoInstance.js
const videoTypes = ["webm", "ogg", "mp4", "x-matroska"],
  codecs = ["vp9", "vp9.0", "vp8", "vp8.0", "avc1", "av1", "h265", "h.265", "h264", "h.264", "opus", "pcm", "aac", "mpeg", "mp4a"];
function getVideoSupportedMimeTypes() {
  const isSupported = MediaRecorder.isTypeSupported,
    supported = [];
  videoTypes.forEach(type => {
    const mimeType = `video/${type}`;
    codecs.forEach(codec => [`${mimeType};codecs=${codec}`, `${mimeType};codecs=${codec.toUpperCase()}`].forEach(variation => {
      if (isSupported(variation)) {
        supported.push(variation);
      }
    }));
    if (isSupported(mimeType)) {
      supported.push(mimeType);
    }
  });
  return supported;
}
class ExportVideoInstance {
  constructor(container, engine) {
    this._supportedTypes = [];
    this._exportVideo = async data => {
      const element = this._container.canvas.element;
      if (!element) {
        return;
      }
      return new Promise(resolve => {
        const stream = element.captureStream(data.fps ?? this._container.actualOptions.fpsLimit),
          mimeType = data.mimeType ?? this._supportedTypes[0],
          recorder = new MediaRecorder(stream, {
            mimeType
          }),
          chunks = [];
        recorder.addEventListener("dataavailable", event => {
          chunks.push(event.data);
        });
        recorder.addEventListener("stop", () => {
          resolve(new Blob(chunks, {
            type: mimeType
          }));
        });
        recorder.start();
        setTimeout(() => {
          recorder.stop();
        }, data.duration ?? 5000);
      });
    };
    this._container = container;
    this._engine = engine;
    this._supportedTypes = getVideoSupportedMimeTypes();
  }
  async export(type, data) {
    const res = {
      supported: false
    };
    switch (type) {
      case "video":
        res.supported = true;
        res.blob = await this._exportVideo(data);
        break;
    }
    return res;
  }
}
;// CONCATENATED MODULE: ./dist/browser/index.js

class ExportVideoPlugin {
  constructor(engine) {
    this.id = "export-video";
    this._engine = engine;
  }
  getPlugin(container) {
    return new ExportVideoInstance(container, this._engine);
  }
  loadOptions() {}
  needsPlugin() {
    return true;
  }
}
async function loadExportVideoPlugin(engine, refresh = true) {
  await engine.addPlugin(new ExportVideoPlugin(engine), refresh);
}
/******/ 	return __webpack_exports__;
/******/ })()
;
});