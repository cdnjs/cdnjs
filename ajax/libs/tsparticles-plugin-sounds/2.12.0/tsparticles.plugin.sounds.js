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
		module.exports = factory(require("tsparticles-engine"));
	else if(typeof define === 'function' && define.amd)
		define(["tsparticles-engine"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("tsparticles-engine")) : factory(root["window"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, (__WEBPACK_EXTERNAL_MODULE__961__) => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 961:
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__961__;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
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
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  loadSoundsPlugin: () => (/* binding */ loadSoundsPlugin)
});

// EXTERNAL MODULE: external {"commonjs":"tsparticles-engine","commonjs2":"tsparticles-engine","amd":"tsparticles-engine","root":"window"}
var external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_ = __webpack_require__(961);
;// CONCATENATED MODULE: ./dist/browser/Options/Classes/SoundsAudio.js

class SoundsAudio {
  constructor() {
    this.loop = false;
    this.source = "";
  }
  load(data) {
    if (data === undefined) {
      return;
    }
    if ((0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.isObject)(data)) {
      if (data.loop !== undefined) {
        this.loop = data.loop;
      }
      if (data.source !== undefined) {
        this.source = data.source;
      }
    } else {
      this.source = data;
    }
  }
}
;// CONCATENATED MODULE: ./dist/browser/Options/Classes/SoundsNote.js
class SoundsNote {
  constructor() {
    this.duration = 500;
    this.value = [];
  }
  load(data) {
    if (!data) {
      return;
    }
    if (data.duration !== undefined) {
      this.duration = data.duration;
    }
    if (data.value !== undefined) {
      this.value = data.value;
    }
  }
}
;// CONCATENATED MODULE: ./dist/browser/Options/Classes/SoundsMelody.js

class SoundsMelody {
  constructor() {
    this.loop = false;
    this.melodies = [];
    this.notes = [];
  }
  load(data) {
    if (data === undefined) {
      return;
    }
    if (data.loop !== undefined) {
      this.loop = data.loop;
    }
    if (data.melodies !== undefined) {
      this.melodies = data.melodies.map(s => {
        const tmp = new SoundsMelody();
        tmp.load(s);
        return tmp;
      });
    }
    if (data.notes !== undefined) {
      this.notes = data.notes.map(s => {
        const tmp = new SoundsNote();
        tmp.load(s);
        return tmp;
      });
    }
  }
}
;// CONCATENATED MODULE: ./dist/browser/Options/Classes/SoundsEvent.js




class SoundsEvent {
  constructor() {
    this.event = [];
    this.notes = [];
  }
  load(data) {
    if (!data) {
      return;
    }
    if (data.event !== undefined) {
      this.event = data.event;
    }
    if (data.audio !== undefined) {
      if ((0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.isArray)(data.audio)) {
        this.audio = data.audio.map(s => {
          const tmp = new SoundsAudio();
          tmp.load(s);
          return tmp;
        });
      } else {
        this.audio = new SoundsAudio();
        this.audio.load(data.audio);
      }
    }
    if (data.notes !== undefined) {
      this.notes = data.notes.map(t => {
        const tmp = new SoundsNote();
        tmp.load(t);
        return tmp;
      });
    }
    if (data.melodies !== undefined) {
      this.melodies = data.melodies.map(t => {
        const tmp = new SoundsMelody();
        tmp.load(t);
        return tmp;
      });
    }
    if (data.filter !== undefined) {
      if ((0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.isString)(data.filter)) {
        if ((0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.isFunction)(window[data.filter])) {
          this.filter = window[data.filter];
        }
      } else {
        this.filter = data.filter;
      }
    }
  }
}
;// CONCATENATED MODULE: ./dist/browser/Options/Classes/SoundsIcon.js
class SoundsIcon {
  constructor() {
    this.width = 24;
    this.height = 24;
  }
  load(data) {
    if (!data) {
      return;
    }
    if (data.path !== undefined) {
      this.path = data.path;
    }
    if (data.svg !== undefined) {
      this.svg = data.svg;
    }
    if (data.width !== undefined) {
      this.width = data.width;
    }
    if (data.height !== undefined) {
      this.height = data.height;
    }
  }
}
;// CONCATENATED MODULE: ./dist/browser/Options/Classes/SoundsIcons.js

class SoundsIcons {
  constructor() {
    this.mute = new SoundsIcon();
    this.unmute = new SoundsIcon();
    this.volumeDown = new SoundsIcon();
    this.volumeUp = new SoundsIcon();
    this.mute.svg = `<?xml version="1.0"?>
<svg baseProfile="tiny" height="24px" version="1.2" viewBox="0 0 24 24" width="24px"
    xml:space="preserve" xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink">
    <g id="Layer_1">
        <path fill="#fff" d="M19.707,5.293c-0.391-0.391-1.023-0.391-1.414,0l-1.551,1.551c-0.345-0.688-0.987-1.02-1.604-1.02c-0.449,0-0.905,0.152-1.356,0.453l-2.672,1.781C10.357,8.561,8.904,9,8,9c-1.654,0-3,1.346-3,3v2c0,1.237,0.754,2.302,1.826,2.76l-1.533,1.533c-0.391,0.391-0.391,1.023,0,1.414C5.488,19.902,5.744,20,6,20s0.512-0.098,0.707-0.293l2.527-2.527c0.697,0.174,1.416,0.455,1.875,0.762l2.672,1.781c0.451,0.301,0.907,0.453,1.356,0.453C16.035,20.176,17,19.495,17,18V9.414l2.707-2.707C20.098,6.316,20.098,5.684,19.707,5.293z M14.891,7.941c0.038-0.025,0.073-0.046,0.104-0.062C14.998,7.914,15,7.954,15,8v1.293l-2,2V9.202L14.891,7.941z M7,12c0-0.552,0.448-1,1-1c1.211,0,2.907-0.495,4-1.146v2.439l-2.83,2.83C8.757,15.046,8.356,15,8,15c-0.552,0-1-0.448-1-1V12z M10.301,15.406L12,13.707v2.439C11.519,15.859,10.925,15.604,10.301,15.406z M14.994,18.12c-0.03-0.016-0.065-0.036-0.104-0.062L13,16.798v-4.091l2-2V18C15,18.046,14.998,18.086,14.994,18.12z"/>
    </g>
</svg>`;
    this.unmute.svg = `<?xml version="1.0"?>
<svg baseProfile="tiny" height="24px" version="1.2" viewBox="0 0 24 24" width="24px"
    xml:space="preserve" xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink">
    <g id="Layer_1">
        <path fill="#fff" d="M17.138,5.824c-0.449,0-0.905,0.152-1.356,0.453l-2.672,1.781C12.357,8.561,10.904,9,10,9c-1.654,0-3,1.346-3,3v2c0,1.654,1.346,3,3,3c0.904,0,2.357,0.439,3.109,0.941l2.672,1.781c0.451,0.301,0.907,0.453,1.356,0.453C18.035,20.176,19,19.495,19,18V8C19,6.505,18.035,5.824,17.138,5.824z M14,16.146C12.907,15.495,11.211,15,10,15c-0.552,0-1-0.448-1-1v-2c0-0.552,0.448-1,1-1c1.211,0,2.907-0.495,4-1.146V16.146z M17,18c0,0.046-0.002,0.086-0.006,0.12c-0.03-0.016-0.065-0.036-0.104-0.062L15,16.798V9.202l1.891-1.261c0.038-0.025,0.073-0.046,0.104-0.062C16.998,7.914,17,7.954,17,8V18z"/>
    </g>
</svg>`;
    this.volumeDown.svg = `<?xml version="1.0"?>
<svg baseProfile="tiny" height="24px" version="1.2" viewBox="0 0 24 24" width="24px"
    xml:space="preserve" xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink">
    <g id="Layer_1">
        <path fill="#fff" d="M15.138,5.824c-0.449,0-0.905,0.152-1.356,0.453l-2.672,1.781C10.357,8.561,8.904,9,8,9c-1.654,0-3,1.346-3,3v2c0,1.654,1.346,3,3,3c0.904,0,2.357,0.439,3.109,0.941l2.672,1.781c0.451,0.301,0.907,0.453,1.356,0.453C16.035,20.176,17,19.495,17,18V8C17,6.505,16.035,5.824,15.138,5.824z M8,15c-0.552,0-1-0.448-1-1v-2c0-0.552,0.448-1,1-1c1.211,0,2.907-0.495,4-1.146v6.293C10.907,15.495,9.211,15,8,15z M15,18c0,0.046-0.002,0.086-0.006,0.12c-0.03-0.016-0.065-0.036-0.104-0.062L13,16.798V9.202l1.891-1.261c0.038-0.025,0.073-0.046,0.104-0.062C14.998,7.914,15,7.954,15,8V18z"/>
        <path fill="#fff" d="M18.292,10.294c-0.39,0.391-0.39,1.023,0.002,1.414c0.345,0.345,0.535,0.803,0.535,1.291c0,0.489-0.19,0.948-0.536,1.294c-0.391,0.39-0.391,1.023,0,1.414C18.488,15.902,18.744,16,19,16s0.512-0.098,0.707-0.293c0.724-0.723,1.122-1.685,1.122-2.708s-0.398-1.984-1.123-2.707C19.317,9.903,18.683,9.901,18.292,10.294z"/>
    </g>
</svg>`;
    this.volumeUp.svg = `<?xml version="1.0"?>
<svg baseProfile="tiny" height="24px" version="1.2" viewBox="0 0 24 24" width="24px"
    xml:space="preserve" xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink">
    <g id="Layer_1">
        <path fill="#fff" d="M16.706,10.292c-0.389-0.389-1.023-0.391-1.414,0.002c-0.39,0.391-0.39,1.023,0.002,1.414c0.345,0.345,0.535,0.803,0.535,1.291c0,0.489-0.19,0.948-0.536,1.294c-0.391,0.39-0.391,1.023,0,1.414C15.488,15.902,15.744,16,16,16s0.512-0.098,0.707-0.293c0.724-0.723,1.122-1.685,1.122-2.708S17.431,11.015,16.706,10.292z"/>
        <path fill="#fff" d="M18.706,8.292c-0.391-0.389-1.023-0.39-1.414,0.002c-0.39,0.391-0.39,1.024,0.002,1.414c0.879,0.877,1.363,2.044,1.364,3.287c0.001,1.246-0.484,2.417-1.365,3.298c-0.391,0.391-0.391,1.023,0,1.414C17.488,17.902,17.744,18,18,18s0.512-0.098,0.707-0.293c1.259-1.259,1.952-2.933,1.951-4.713C20.657,11.217,19.964,9.547,18.706,8.292z"/>
        <path fill="#fff" d="M20.706,6.292c-0.391-0.389-1.023-0.39-1.414,0.002c-0.39,0.391-0.39,1.024,0.002,1.414c1.412,1.409,2.191,3.285,2.192,5.284c0.002,2.002-0.777,3.885-2.193,5.301c-0.391,0.391-0.391,1.023,0,1.414C19.488,19.902,19.744,20,20,20s0.512-0.098,0.707-0.293c1.794-1.794,2.781-4.18,2.779-6.717C23.485,10.457,22.497,8.078,20.706,6.292z"/>
        <path fill="#fff" d="M12.138,5.824c-0.449,0-0.905,0.152-1.356,0.453L8.109,8.059C7.357,8.561,5.904,9,5,9c-1.654,0-3,1.346-3,3v2c0,1.654,1.346,3,3,3c0.904,0,2.357,0.439,3.109,0.941l2.672,1.781c0.451,0.301,0.907,0.453,1.356,0.453C13.035,20.176,14,19.495,14,18V8C14,6.505,13.035,5.824,12.138,5.824z M5,15c-0.552,0-1-0.448-1-1v-2c0-0.552,0.448-1,1-1c1.211,0,2.907-0.495,4-1.146v6.293C7.907,15.495,6.211,15,5,15z M12,18c0,0.046-0.002,0.086-0.006,0.12c-0.03-0.016-0.065-0.036-0.104-0.062L10,16.798V9.202l1.891-1.261c0.038-0.025,0.073-0.046,0.104-0.062C11.998,7.914,12,7.954,12,8V18z"/>
    </g>
</svg>`;
  }
  load(data) {
    if (!data) {
      return;
    }
    this.mute.load(data.mute);
    this.unmute.load(data.unmute);
    this.volumeDown.load(data.volumeDown);
    this.volumeUp.load(data.volumeUp);
  }
}
;// CONCATENATED MODULE: ./dist/browser/Options/Classes/SoundsVolume.js

class SoundsVolume {
  constructor() {
    this.value = 100;
    this.max = 100;
    this.min = 0;
    this.step = 10;
  }
  load(data) {
    if (data === undefined) {
      return;
    }
    if ((0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.isObject)(data)) {
      if (data.max !== undefined) {
        this.max = data.max;
      }
      if (data.min !== undefined) {
        this.min = data.min;
      }
      if (data.step !== undefined) {
        this.step = data.step;
      }
      if (data.value !== undefined) {
        this.value = data.value;
      }
    } else {
      this.value = data;
    }
  }
}
;// CONCATENATED MODULE: ./dist/browser/Options/Classes/Sounds.js



class Sounds {
  constructor() {
    this.enable = false;
    this.events = [];
    this.icons = new SoundsIcons();
    this.volume = new SoundsVolume();
  }
  load(data) {
    if (!data) {
      return;
    }
    if (data.enable !== undefined) {
      this.enable = data.enable;
    }
    if (data.events !== undefined) {
      this.events = data.events.map(t => {
        const event = new SoundsEvent();
        event.load(t);
        return event;
      });
    }
    this.icons.load(data.icons);
    if (data.volume !== undefined) {
      this.volume.load(data.volume);
    }
  }
}
;// CONCATENATED MODULE: ./dist/browser/utils.js
const notes = new Map();
notes.set("C", [16.35, 32.7, 65.41, 130.81, 261.63, 523.25, 1046.5, 2093.0, 4186.01]);
notes.set("Db", [17.32, 34.65, 69.3, 138.59, 277.18, 554.37, 1108.73, 2217.46, 4434.92]);
notes.set("D", [18.35, 36.71, 73.42, 146.83, 293.66, 587.33, 1174.66, 2349.32, 4698.63]);
notes.set("Eb", [19.45, 38.89, 77.78, 155.56, 311.13, 622.25, 1244.51, 2489.02, 4978.03]);
notes.set("E", [20.6, 41.2, 82.41, 164.81, 329.63, 659.25, 1318.51, 2637.02, 5274.04]);
notes.set("F", [21.83, 43.65, 87.31, 174.61, 349.23, 698.46, 1396.91, 2793.83, 5587.65]);
notes.set("Gb", [23.12, 46.25, 92.5, 185.0, 369.99, 739.99, 1479.98, 2959.96, 5919.91]);
notes.set("G", [24.5, 49.0, 98.0, 196.0, 392.0, 783.99, 1567.98, 3135.96, 6271.93]);
notes.set("Ab", [25.96, 51.91, 103.83, 207.65, 415.3, 830.61, 1661.22, 3322.44, 6644.88]);
notes.set("A", [27.5, 55.0, 110.0, 220.0, 440.0, 880.0, 1760.0, 3520.0, 7040.0]);
notes.set("Bb", [29.14, 58.27, 116.54, 233.08, 466.16, 932.33, 1864.66, 3729.31, 7458.62]);
notes.set("B", [30.87, 61.74, 123.47, 246.94, 493.88, 987.77, 1975.53, 3951.07, 7902.13]);
notes.set("pause", [0]);
function getNoteFrequency(note) {
  const regex = /(([A-G]b?)(\d))|pause/i,
    result = regex.exec(note);
  if (!result || !result.length) {
    return;
  }
  const noteKey = result[2] || result[0],
    noteItem = notes.get(noteKey);
  if (!noteItem) {
    return;
  }
  return noteItem[parseInt(result[3] || "0")];
}
;// CONCATENATED MODULE: ./dist/browser/SoundsInstance.js


function initImage(data) {
  const img = document.createElement("img"),
    {
      clickCb,
      container,
      display,
      iconOptions,
      margin,
      options,
      pos,
      rightOffsets
    } = data,
    {
      width,
      path,
      svg
    } = iconOptions;
  setIconStyle(img, pos.top + margin, pos.right - (margin * (rightOffsets.length + 1) + width + rightOffsets.reduce((a, b) => a + b, 0)), display, options.fullScreen.zIndex + 1, width, margin);
  img.src = path ?? (svg ? `data:image/svg+xml;base64,${btoa(svg)}` : "");
  const parent = container.canvas.element?.parentNode || document.body;
  parent.append(img);
  img.addEventListener("click", clickCb);
  return img;
}
function removeImage(image) {
  if (!image) {
    return;
  }
  image.remove();
}
function setIconStyle(icon, top, left, display, zIndex, width, margin) {
  icon.style.userSelect = "none";
  icon.style.webkitUserSelect = "none";
  icon.style.position = "absolute";
  icon.style.top = `${top + margin}px`;
  icon.style.left = `${left - margin - width}px`;
  icon.style.display = display;
  icon.style.zIndex = `${zIndex + 1}`;
}
class SoundsInstance {
  constructor(container, engine) {
    this._addBuffer = audioCtx => {
      const buffer = audioCtx.createBufferSource();
      this._audioSources.push(buffer);
      return buffer;
    };
    this._addOscillator = audioCtx => {
      const oscillator = audioCtx.createOscillator();
      this._audioSources.push(oscillator);
      return oscillator;
    };
    this._initEvents = () => {
      const container = this._container,
        soundsOptions = container.actualOptions.sounds;
      if (!soundsOptions?.enable || !container.canvas.element) {
        return;
      }
      for (const event of soundsOptions.events) {
        const cb = async args => {
          if (this._container !== args.container) {
            return;
          }
          if (!this._container || this._container.muted || this._container.destroyed) {
            (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.executeOnSingleOrMultiple)(event.event, item => {
              this._engine.removeEventListener(item, cb);
            });
            return;
          }
          if (event.filter && !event.filter(args)) {
            return;
          }
          if (event.audio) {
            this._playBuffer((0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.itemFromSingleOrMultiple)(event.audio));
          } else if (event.melodies) {
            const melody = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.itemFromArray)(event.melodies);
            if (melody.melodies.length) {
              await Promise.allSettled(melody.melodies.map(m => this._playNote(m.notes, 0, melody.loop)));
            } else {
              await this._playNote(melody.notes, 0, melody.loop);
            }
          } else if (event.notes) {
            const note = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.itemFromArray)(event.notes);
            await this._playNote([note], 0, false);
          }
        };
        (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.executeOnSingleOrMultiple)(event.event, item => {
          this._engine.addEventListener(item, cb);
        });
      }
    };
    this._mute = () => {
      const container = this._container;
      if (!container.audioContext) {
        return;
      }
      for (const source of this._audioSources) {
        this._removeAudioSource(source);
      }
      if (this._gain) {
        this._gain.disconnect();
      }
      container.audioContext.close();
      container.audioContext = undefined;
      this._engine.dispatchEvent("soundsMuted", {
        container: this._container
      });
    };
    this._playBuffer = audio => {
      const audioBuffer = this._audioMap.get(audio.source);
      if (!audioBuffer) {
        return;
      }
      const audioCtx = this._container.audioContext;
      if (!audioCtx) {
        return;
      }
      const source = this._addBuffer(audioCtx);
      source.loop = audio.loop;
      source.buffer = audioBuffer;
      source.connect(this._gain ?? audioCtx.destination);
      source.start();
    };
    this._playFrequency = async (frequency, duration) => {
      if (!this._container.audioContext || !this._gain) {
        return;
      }
      const oscillator = this._addOscillator(this._container.audioContext);
      oscillator.connect(this._gain);
      oscillator.type = "sine";
      oscillator.frequency.value = frequency;
      oscillator.start();
      return new Promise(resolve => {
        setTimeout(() => {
          this._removeAudioSource(oscillator);
          resolve();
        }, duration);
      });
    };
    this._playMuteSound = () => {
      const container = this._container;
      if (!container.audioContext) {
        return;
      }
      const gain = container.audioContext.createGain();
      gain.connect(container.audioContext.destination);
      gain.gain.value = 0;
      const oscillator = container.audioContext.createOscillator();
      oscillator.connect(gain);
      oscillator.type = "sine";
      oscillator.frequency.value = 1;
      oscillator.start();
      setTimeout(() => {
        oscillator.stop();
        oscillator.disconnect();
        gain.disconnect();
      });
    };
    this._playNote = async (notes, noteIdx, loop) => {
      if (this._container.muted) {
        return;
      }
      const note = notes[noteIdx];
      if (!note) {
        return;
      }
      const value = note.value;
      const promises = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.executeOnSingleOrMultiple)(value, async (_, idx) => {
        return this._playNoteValue(notes, noteIdx, idx);
      });
      await ((0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.isArray)(promises) ? Promise.allSettled(promises) : promises);
      let nextNoteIdx = noteIdx + 1;
      if (loop && nextNoteIdx >= notes.length) {
        nextNoteIdx = nextNoteIdx % notes.length;
      }
      if (this._container.muted) {
        return;
      }
      await this._playNote(notes, nextNoteIdx, loop);
    };
    this._playNoteValue = async (notes, noteIdx, valueIdx) => {
      const note = notes[noteIdx];
      if (!note) {
        return;
      }
      const value = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.itemFromSingleOrMultiple)(note.value, valueIdx, true);
      try {
        const freq = getNoteFrequency(value);
        if (!(0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.isNumber)(freq)) {
          return;
        }
        await this._playFrequency(freq, note.duration);
      } catch (e) {
        (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.getLogger)().error(e);
      }
    };
    this._removeAudioSource = source => {
      source.stop();
      source.disconnect();
      this._audioSources.splice(this._audioSources.indexOf(source), 1);
    };
    this._unmute = () => {
      const container = this._container,
        options = container.actualOptions,
        soundsOptions = options.sounds;
      if (!soundsOptions) {
        return;
      }
      if (!container.audioContext) {
        container.audioContext = new AudioContext();
      }
      const {
        audioContext
      } = container;
      if (!this._audioSources) {
        this._audioSources = [];
      }
      const gain = audioContext.createGain();
      gain.connect(audioContext.destination);
      gain.gain.value = soundsOptions.volume.value / 100;
      this._gain = gain;
      this._initEvents();
      this._engine.dispatchEvent("soundsUnmuted", {
        container: this._container
      });
    };
    this._updateMuteIcons = () => {
      const container = this._container,
        muteImg = this._muteImg,
        unmuteImg = this._unmuteImg;
      if (muteImg) {
        muteImg.style.display = container.muted ? "block" : "none";
      }
      if (unmuteImg) {
        unmuteImg.style.display = container.muted ? "none" : "block";
      }
    };
    this._updateMuteStatus = () => {
      const container = this._container;
      if (container.muted) {
        this._mute();
      } else {
        this._unmute();
        this._playMuteSound();
      }
    };
    this._updateVolume = () => {
      const container = this._container,
        soundsOptions = container.actualOptions.sounds;
      if (!soundsOptions?.enable) {
        return;
      }
      (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.clamp)(this._volume, soundsOptions.volume.min, soundsOptions.volume.max);
      let stateChanged = false;
      if (this._volume <= 0 && !container.muted) {
        this._volume = 0;
        container.muted = true;
        stateChanged = true;
      } else if (this._volume > 0 && container.muted) {
        container.muted = false;
        stateChanged = true;
      }
      if (stateChanged) {
        this._updateMuteIcons();
        this._updateMuteStatus();
      }
      if (this._gain?.gain) {
        this._gain.gain.value = this._volume / 100;
      }
    };
    this._container = container;
    this._engine = engine;
    this._volume = 0;
    this._audioSources = [];
    this._audioMap = new Map();
  }
  async init() {
    const container = this._container,
      options = container.actualOptions,
      soundsOptions = options.sounds;
    if (!soundsOptions?.enable) {
      return;
    }
    this._volume = soundsOptions.volume.value;
    const events = soundsOptions.events;
    this._audioMap = new Map();
    for (const event of events) {
      if (!event.audio) {
        continue;
      }
      (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.executeOnSingleOrMultiple)(event.audio, async audio => {
        const response = await fetch(audio.source);
        if (!response.ok) {
          return;
        }
        const arrayBuffer = await response.arrayBuffer();
        container.audioContext = new AudioContext();
        const audioBuffer = await container.audioContext.decodeAudioData(arrayBuffer);
        this._audioMap.set(audio.source, audioBuffer);
      });
    }
  }
  async start() {
    const container = this._container,
      options = container.actualOptions,
      soundsOptions = options.sounds;
    if (!soundsOptions?.enable || !container.canvas.element) {
      return;
    }
    container.muted = true;
    const canvas = container.canvas.element,
      pos = {
        top: canvas.offsetTop,
        right: canvas.offsetLeft + canvas.offsetWidth
      },
      {
        mute,
        unmute,
        volumeDown,
        volumeUp
      } = soundsOptions.icons,
      margin = 10;
    const toggleMute = () => {
      container.muted = !container.muted;
      this._updateMuteIcons();
      this._updateMuteStatus();
    };
    this._muteImg = initImage({
      container,
      options,
      pos,
      display: "block",
      iconOptions: mute,
      margin,
      rightOffsets: [volumeDown.width, volumeUp.width],
      clickCb: toggleMute
    });
    this._unmuteImg = initImage({
      container,
      options,
      pos,
      display: "none",
      iconOptions: unmute,
      margin,
      rightOffsets: [volumeDown.width, volumeUp.width],
      clickCb: toggleMute
    });
    this._volumeDownImg = initImage({
      container,
      options,
      pos,
      display: "block",
      iconOptions: volumeDown,
      margin,
      rightOffsets: [volumeUp.width],
      clickCb: () => {
        if (container.muted) {
          this._volume = 0;
        }
        this._volume -= soundsOptions.volume.step;
        this._updateVolume();
      }
    });
    this._volumeUpImg = initImage({
      container,
      options,
      pos,
      display: "block",
      iconOptions: volumeUp,
      margin,
      rightOffsets: [],
      clickCb: () => {
        if (container.muted) {
          this._volume = 0;
        }
        this._volume += soundsOptions.volume.step;
        this._updateVolume();
      }
    });
  }
  stop() {
    this._container.muted = true;
    this._mute();
    removeImage(this._muteImg);
    removeImage(this._unmuteImg);
    removeImage(this._volumeDownImg);
    removeImage(this._volumeUpImg);
  }
}
;// CONCATENATED MODULE: ./dist/browser/index.js


class SoundsPlugin {
  constructor(engine) {
    this.id = "sounds";
    this._engine = engine;
  }
  getPlugin(container) {
    return new SoundsInstance(container, this._engine);
  }
  loadOptions(options, source) {
    if (!this.needsPlugin(options) && !this.needsPlugin(source)) {
      return;
    }
    let soundsOptions = options.sounds;
    if (soundsOptions?.load === undefined) {
      options.sounds = soundsOptions = new Sounds();
    }
    soundsOptions.load(source?.sounds);
  }
  needsPlugin(options) {
    return options?.sounds?.enable ?? false;
  }
}
async function loadSoundsPlugin(engine, refresh = true) {
  await engine.addPlugin(new SoundsPlugin(engine), refresh);
}
})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});