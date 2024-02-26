"use strict";
(self["webpackChunkcloudinary_video_player"] = self["webpackChunkcloudinary_video_player"] || []).push([["chapters"],{

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
/* harmony import */ var _chapters_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./chapters.scss */ "./plugins/chapters/chapters.scss");
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
    const fullUrl = (0,_cloudinary_common__WEBPACK_IMPORTED_MODULE_2__.getCloudinaryUrl)(`${currentPublicId}-chapters.vtt`, (0,_cloudinary_common__WEBPACK_IMPORTED_MODULE_2__.extendCloudinaryConfig)(this.player.cloudinary.cloudinaryConfig(), {
      resource_type: 'raw',
      version: '1'
    }));
    return `${fullUrl}?t=${Date.now()}`;
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
          style: `left: ${left}`
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
      style: `max-width: ${this.player.$('.vjs-vtt-thumbnail-display') ? this.player.$('.vjs-vtt-thumbnail-display').style.width : '160px'}`
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
            this.el_.style.left = `${size}px`;
          } else if (seekBarRect.width * seekBarPoint + size > width) {
            this.el_.style.left = `${seekBarRect.width - size}px`;
          } else {
            this.el_.style.left = `${seekBarRect.width * seekBarPoint}px`;
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

/***/ "./plugins/chapters/chapters.scss":
/*!****************************************!*\
  !*** ./plugins/chapters/chapters.scss ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

}]);
//# sourceMappingURL=chapters.light.js.map