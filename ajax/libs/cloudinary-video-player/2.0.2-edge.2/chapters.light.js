"use strict";
(self["cloudinaryVideoPlayerChunkLoading"] = self["cloudinaryVideoPlayerChunkLoading"] || []).push([["chapters"],{

/***/ "./plugins/chapters/chapters.js":
/*!**************************************!*\
  !*** ./plugins/chapters/chapters.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var video_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! video.js */ "../node_modules/video.js/dist/alt/video.core-exposed.js");
/* harmony import */ var video_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(video_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _chapters_scss_style_loader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./chapters.scss?style-loader */ "./plugins/chapters/chapters.scss?style-loader");
/* harmony import */ var _cloudinary_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../cloudinary/common */ "./plugins/cloudinary/common.js");




/**
 * Chapters plugin.
 *
 * @function chapters
 * @param    {Object} [options={}]
 *           An object of options left to the plugin author to define.
 * @param    {Player} player
 *           A Video.js player object.
 */
const chapters = function chapters(options, player) {
  player.addClass('vjs-chapters');
  player.chapters = new ChaptersPlugin(player, options);
};

/**
 * Chapters
 */
const ChaptersPlugin = function () {
  /**
   * Plugin class constructor, called by videojs on
   * ready event.
   *
   * @function  constructor
   * @param    {Player} player
   *           A Video.js player object.
   *
   * @param    {Object} [options={}]
   *           A plain object containing options for the plugin.
   */
  function ChaptersPlugin(player, options) {
    this.player = player;
    this.options = options;
    this.player.one('loadedmetadata', this.initializeChapters.bind(this));
    return this;
  }
  ChaptersPlugin.prototype.src = function src(options) {
    this.resetPlugin();
    this.options = options;
    this.player.one('loadedmetadata', this.initializeChapters.bind(this));
  };
  ChaptersPlugin.prototype.detach = function detach() {
    this.resetPlugin();
  };
  ChaptersPlugin.prototype.resetPlugin = function resetPlugin() {
    if (this.chaptersTrack) {
      this.player.$('.vjs-control-bar-chapter-display').remove();
      this.player.$('.vjs-chapter-display').remove();
      this.player.$$('.vjs-chapter-marker').forEach(el => el.remove());
      this.player.removeRemoteTextTrack(this.chaptersTrack);
      delete this.chaptersTrack;
    }
  };
  ChaptersPlugin.prototype.getChaptersFileUrlByName = function getChaptersFileUrlByName() {
    const currentPublicId = this.player.cloudinary.currentPublicId();
    if (!currentPublicId) {
      return null;
    }
    const fullUrl = (0,_cloudinary_common__WEBPACK_IMPORTED_MODULE_2__.getCloudinaryUrl)("".concat(currentPublicId, "-chapters.vtt"), (0,_cloudinary_common__WEBPACK_IMPORTED_MODULE_2__.extendCloudinaryConfig)(this.player.cloudinary.cloudinaryConfig(), {
      resource_type: 'raw',
      version: '1'
    }));
    return "".concat(fullUrl, "?t=").concat(Date.now());
  };

  /**
   * Bootstrap the plugin.
   */
  ChaptersPlugin.prototype.initializeChapters = async function initializeChapters() {
    const chaptersUrl = this.options === true ? this.getChaptersFileUrlByName() : this.options.url;
    if (chaptersUrl) {
      // Fetch chapters VTT from URL
      const chaptersTrack = {
        kind: 'chapters',
        src: chaptersUrl,
        default: true
      };
      const textTrack = this.player.addRemoteTextTrack(chaptersTrack);
      textTrack.addEventListener('load', () => {
        this.chaptersTrack = textTrack.track;
        this.setupChaptersDisplays();
      });
    } else if (Object.entries(this.options).length) {
      // Setup chapters from options
      const textTrack = this.player.addRemoteTextTrack({
        kind: 'chapters',
        default: true
      });

      // required for Safari to display the captions
      // https://github.com/videojs/video.js/issues/8519
      await new Promise(resolve => setTimeout(resolve, 100));
      const end = this.player.duration();
      Object.entries(this.options).forEach((entry, index, arr) => {
        const cue = new VTTCue(parseFloat(entry[0]), parseFloat(arr[index + 1] ? arr[index + 1][0] : end), entry[1]);
        textTrack.track.addCue(cue);
      });
      this.chaptersTrack = textTrack.track;
      this.setupChaptersDisplays();
      if (this.player.controlBar.chaptersButton) {
        this.player.controlBar.chaptersButton.update();
      }
    }
  };

  /**
   * Setup chapter displays.
   */
  ChaptersPlugin.prototype.setupChaptersDisplays = function initializeChapters() {
    this.setupProgressBarMarkers();
    this.setupProgressBarChapter();
    this.setupControlBarChapter();
  };

  /**
   * Setup the controlbar chapter display.
   */
  ChaptersPlugin.prototype.setupControlBarChapter = function setupControlBarChapter() {
    const controlBarChapterHolder = this.player.$('.vjs-control-bar-chapter-display') || document.createElement('div');
    controlBarChapterHolder.setAttribute('class', 'vjs-control-bar-chapter-display');
    const wrapper = this.player.$('.vjs-control-bar .vjs-spacer');
    wrapper.innerHTML = '';
    wrapper.classList.add('vjs-control-bar-chapter-wrapper');
    wrapper.appendChild(controlBarChapterHolder);
    this.chaptersTrack.addEventListener('cuechange', () => {
      const activeCues = Array.from(this.chaptersTrack.activeCues); // Safari needs Array.from()
      controlBarChapterHolder.innerHTML = activeCues.length > 0 ? activeCues[0].text : '';
    });
  };

  /**
   * Setup the progress bar markers.
   */
  ChaptersPlugin.prototype.setupProgressBarMarkers = function setupProgressBarMarkers() {
    const total = this.player.duration();
    const {
      seekBar
    } = this.player.controlBar.progressControl;
    Array.from(this.chaptersTrack.cues).forEach(marker => {
      // Safari needs Array.from()
      if (marker.startTime !== 0) {
        const markerTime = marker.startTime;
        const left = markerTime / total * 100 + '%';
        const markerEl = video_js__WEBPACK_IMPORTED_MODULE_0___default().dom.createEl('div', undefined, {
          class: 'vjs-chapter-marker',
          style: "left: ".concat(left)
        });
        seekBar.el().append(markerEl);
      }
    });
  };

  /**
   * Setup the progrees bar on-hover chapter display.
   */
  ChaptersPlugin.prototype.setupProgressBarChapter = function setupProgressBarChapter() {
    const chapterEl = video_js__WEBPACK_IMPORTED_MODULE_0___default().dom.createEl('div', undefined, {
      class: 'vjs-chapter-display',
      style: "max-width: ".concat(this.player.$('.vjs-vtt-thumbnail-display') ? this.player.$('.vjs-vtt-thumbnail-display').style.width : '160px')
    });
    const mouseTimeDisplay = this.player.getDescendant(['controlBar', 'progressControl', 'seekBar', 'mouseTimeDisplay']);
    const timeTooltip = mouseTimeDisplay.getDescendant(['timeTooltip']);
    timeTooltip.el().parentElement.prepend(chapterEl);
    const getChapterFromPoint = point => {
      const total = this.player.duration();
      const seekBarTime = point * total;
      const chapter = Array.from(this.chaptersTrack.cues).find(marker => {
        return seekBarTime >= marker.startTime && seekBarTime <= marker.endTime;
      });
      return chapter ? chapter.text : '';
    };
    timeTooltip.update = function (seekBarRect, seekBarPoint, content) {
      const originalUpdateFn = Object.getPrototypeOf(this).update;
      originalUpdateFn.call(this, seekBarRect, seekBarPoint, content);
      chapterEl.innerHTML = getChapterFromPoint(seekBarPoint);
    };

    // Handle case of no seek-thumbnails
    if (typeof this.player.vttThumbnails !== 'object') {
      mouseTimeDisplay.update = function (seekBarRect, seekBarPoint) {
        const time = seekBarPoint * this.player_.duration();
        const width = seekBarRect.width;
        const size = chapterEl.clientWidth / 2;
        timeTooltip.updateTime(seekBarRect, seekBarPoint, time, () => {
          // Make sure it doesn't exit the player
          if (seekBarRect.width * seekBarPoint < size) {
            this.el_.style.left = "".concat(size, "px");
          } else if (seekBarRect.width * seekBarPoint + size > width) {
            this.el_.style.left = "".concat(seekBarRect.width - size, "px");
          } else {
            this.el_.style.left = "".concat(seekBarRect.width * seekBarPoint, "px");
          }
        });
        timeTooltip.write(video_js__WEBPACK_IMPORTED_MODULE_0___default().time.formatTime(time));
      };
    }
  };
  return ChaptersPlugin;
}();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (chapters);

/***/ }),

/***/ "../node_modules/css-loader/dist/cjs.js!../node_modules/sass-loader/dist/cjs.js!./plugins/chapters/chapters.scss?style-loader":
/*!************************************************************************************************************************************!*\
  !*** ../node_modules/css-loader/dist/cjs.js!../node_modules/sass-loader/dist/cjs.js!./plugins/chapters/chapters.scss?style-loader ***!
  \************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "../node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "../node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `@charset "UTF-8";
.cld-video-player .vjs-control-bar-chapter-wrapper {
  display: flex;
  align-items: center;
  container-type: inline-size;
}
.cld-video-player .vjs-control-bar-chapter-display {
  line-height: 1.5;
  font-size: 90%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 0 0.5em;
}
.cld-video-player .vjs-control-bar-chapter-display:not(:empty)::before {
  content: "•";
  padding-right: 0.5em;
}
@container (max-width: 150px) {
  .cld-video-player .vjs-control-bar-chapter-display {
    display: none;
  }
}
.cld-video-player .vjs-chapter-marker {
  pointer-events: none;
  position: absolute;
  background: var(--color-base);
  width: 4px;
  top: 0;
  bottom: 0;
  opacity: 0.5;
  z-index: 1;
}
.cld-video-player .vjs-chapter-display {
  pointer-events: none;
  line-height: 1.5;
  font-size: 90%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  transform: translateX(-50%);
  bottom: 2.7em;
  position: absolute;
  text-shadow: 0 0 4px color-mix(in srgb, var(--color-base) 40%, transparent);
}
.cld-video-player .vjs-chapter-display:not(:empty) ~ .vjs-vtt-thumbnail-display {
  bottom: 4em;
}
.cld-video-player .vjs-time-tooltip {
  right: auto !important;
  translate: -50%;
}`, "",{"version":3,"sources":["webpack://./plugins/chapters/chapters.scss"],"names":[],"mappings":"AAAA,gBAAgB;AACd;EACE,aAAA;EACA,mBAAA;EACA,2BAAA;AACJ;AACE;EACE,gBAAA;EACA,cAAA;EACA,mBAAA;EACA,gBAAA;EACA,uBAAA;EACA,gBAAA;AACJ;AAAI;EACE,YAAA;EACA,oBAAA;AAEN;AAAI;EAXF;IAYI,aAAA;EAGJ;AACF;AAAE;EACE,oBAAA;EACA,kBAAA;EACA,6BAAA;EACA,UAAA;EACA,MAAA;EACA,SAAA;EACA,YAAA;EACA,UAAA;AAEJ;AACE;EACE,oBAAA;EACA,gBAAA;EACA,cAAA;EACA,mBAAA;EACA,gBAAA;EACA,uBAAA;EACA,2BAAA;EACA,aAAA;EACA,kBAAA;EACA,2EAAA;AACJ;AAAI;EACE,WAAA;AAEN;AAEE;EACE,sBAAA;EACA,eAAA;AAAJ","sourcesContent":[".cld-video-player {\n  .vjs-control-bar-chapter-wrapper {\n    display: flex;\n    align-items: center;\n    container-type: inline-size;\n  }\n  .vjs-control-bar-chapter-display {\n    line-height: 1.5;\n    font-size: 90%;\n    white-space: nowrap;\n    overflow: hidden;\n    text-overflow: ellipsis;\n    padding: 0 0.5em;\n    &:not(:empty)::before {\n      content: '•';\n      padding-right: 0.5em;\n    }\n    @container (max-width: 150px) {\n      display: none;\n    }\n  }\n\n  .vjs-chapter-marker {\n    pointer-events: none;\n    position: absolute;\n    background: var(--color-base);\n    width: 4px;\n    top: 0;\n    bottom: 0;\n    opacity: 0.5;\n    z-index: 1;\n  }\n\n  .vjs-chapter-display {\n    pointer-events: none;\n    line-height: 1.5;\n    font-size: 90%;\n    white-space: nowrap;\n    overflow: hidden;\n    text-overflow: ellipsis;\n    transform: translateX(-50%);\n    bottom: 2.7em;\n    position: absolute;\n    text-shadow: 0 0 4px color-mix(in srgb, var(--color-base) 40%, transparent);\n    &:not(:empty) ~ .vjs-vtt-thumbnail-display {\n      bottom: 4em;\n    }\n  }\n\n  .vjs-time-tooltip {\n    right: auto !important;\n    translate: -50%;\n  }\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "../node_modules/css-loader/dist/runtime/api.js":
/*!******************************************************!*\
  !*** ../node_modules/css-loader/dist/runtime/api.js ***!
  \******************************************************/
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),

/***/ "../node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!*************************************************************!*\
  !*** ../node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \*************************************************************/
/***/ ((module) => {



module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];
  if (!cssMapping) {
    return content;
  }
  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    return [content].concat([sourceMapping]).join("\n");
  }
  return [content].join("\n");
};

/***/ }),

/***/ "./plugins/chapters/chapters.scss?style-loader":
/*!*****************************************************!*\
  !*** ./plugins/chapters/chapters.scss?style-loader ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "../node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "../node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "../node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "../node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_chapters_scss_style_loader__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../../node_modules/css-loader/dist/cjs.js!../../../node_modules/sass-loader/dist/cjs.js!./chapters.scss?style-loader */ "../node_modules/css-loader/dist/cjs.js!../node_modules/sass-loader/dist/cjs.js!./plugins/chapters/chapters.scss?style-loader");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());
options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_chapters_scss_style_loader__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_chapters_scss_style_loader__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_chapters_scss_style_loader__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_chapters_scss_style_loader__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!*****************************************************************************!*\
  !*** ../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \*****************************************************************************/
/***/ ((module) => {



var stylesInDOM = [];
function getIndexByIdentifier(identifier) {
  var result = -1;
  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }
  return result;
}
function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];
  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };
    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }
    identifiers.push(identifier);
  }
  return identifiers;
}
function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);
  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }
      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };
  return updater;
}
module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];
    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }
    var newLastIdentifiers = modulesToDom(newList, options);
    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];
      var _index = getIndexByIdentifier(_identifier);
      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();
        stylesInDOM.splice(_index, 1);
      }
    }
    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "../node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!*********************************************************************!*\
  !*** ../node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \*********************************************************************/
/***/ ((module) => {



var memo = {};

/* istanbul ignore next  */
function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target);

    // Special case to return head of iframe instead of iframe itself
    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }
    memo[target] = styleTarget;
  }
  return memo[target];
}

/* istanbul ignore next  */
function insertBySelector(insert, style) {
  var target = getTarget(insert);
  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }
  target.appendChild(style);
}
module.exports = insertBySelector;

/***/ }),

/***/ "../node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!***********************************************************************!*\
  !*** ../node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \***********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}
module.exports = insertStyleElement;

/***/ }),

/***/ "../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!***********************************************************************************!*\
  !*** ../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \***********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;
  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}
module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "../node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!****************************************************************!*\
  !*** ../node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \****************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";
  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }
  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }
  var needLayer = typeof obj.layer !== "undefined";
  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }
  css += obj.css;
  if (needLayer) {
    css += "}";
  }
  if (obj.media) {
    css += "}";
  }
  if (obj.supports) {
    css += "}";
  }
  var sourceMap = obj.sourceMap;
  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  }

  // For old IE
  /* istanbul ignore if  */
  options.styleTagTransform(css, styleElement, options.options);
}
function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }
  styleElement.parentNode.removeChild(styleElement);
}

/* istanbul ignore next  */
function domAPI(options) {
  if (typeof document === "undefined") {
    return {
      update: function update() {},
      remove: function remove() {}
    };
  }
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}
module.exports = domAPI;

/***/ }),

/***/ "../node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!**********************************************************************!*\
  !*** ../node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \**********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }
    styleElement.appendChild(document.createTextNode(css));
  }
}
module.exports = styleTagTransform;

/***/ })

}]);
//# sourceMappingURL=chapters.light.js.map