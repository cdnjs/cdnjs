(self["cloudinaryVideoPlayerChunkLoading"] = self["cloudinaryVideoPlayerChunkLoading"] || []).push([["playlist"],{

/***/ "./plugins/playlist/playlist.js":
/*!**************************************!*\
  !*** ./plugins/playlist/playlist.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var lodash_isPlainObject__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/isPlainObject */ "../node_modules/lodash/isPlainObject.js");
/* harmony import */ var lodash_isPlainObject__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_isPlainObject__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var utils_slicing__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! utils/slicing */ "./utils/slicing.js");
/* harmony import */ var utils_consts__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! utils/consts */ "./utils/consts.js");
/* harmony import */ var plugins_cloudinary_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! plugins/cloudinary/common */ "./plugins/cloudinary/common.js");
/* harmony import */ var _utils_api__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utils/api */ "./plugins/playlist/utils/api.js");
/* harmony import */ var _ui_playlist__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./ui/playlist */ "./plugins/playlist/ui/playlist.js");
/* harmony import */ var _ui_playlist_widget__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./ui/playlist-widget */ "./plugins/playlist/ui/playlist-widget.js");
/* harmony import */ var _ui_panel_playlist_panel__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./ui/panel/playlist-panel */ "./plugins/playlist/ui/panel/playlist-panel.js");








const LIST_BY_TAG_PARAMS = {
  format: 'json',
  resource_type: 'video',
  type: 'list'
};
const playlist = function (player) {
  let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  const chainTarget = (0,utils_slicing__WEBPACK_IMPORTED_MODULE_1__.sliceProperties)(options, 'chainTarget').chainTarget;
  let playlistInstance = null;
  let playlistDisposer = null;
  let playlistWidget = null;
  const initPlaylistWidget = () => {
    player.on(utils_consts__WEBPACK_IMPORTED_MODULE_2__.PLAYER_EVENT.PLAYLIST_CREATED, () => {
      if (playlistWidget) {
        playlistWidget.dispose();
      }
      if (lodash_isPlainObject__WEBPACK_IMPORTED_MODULE_0___default()(options.playlistWidget)) {
        if (player.fluid_) {
          options.playlistWidget.fluid = true;
        }
        if (player.cloudinary.fontFace) {
          options.playlistWidget.fontFace = player.cloudinary.fontFace;
        }
        playlistWidget = new _ui_playlist_widget__WEBPACK_IMPORTED_MODULE_6__["default"](player, options.playlistWidget);
      }
    });
  };
  const disposePlaylist = () => {
    player.removeClass('vjs-playlist');
    playlistInstance = undefined;
    player.playlist().dispose();
    player.off('cldsourcechanged', playlistDisposer);
  };
  const addPlaylistDisposer = () => {
    const disposer = () => {
      if (playlistInstance && !playlistInstance.currentSource().contains(player.currentSource())) {
        player.disposePlaylist();
      }
    };
    player.on('cldsourcechanged', disposer);
    return disposer;
  };
  const createPlaylist = (sources, options) => {
    if (sources instanceof _ui_playlist__WEBPACK_IMPORTED_MODULE_5__["default"]) {
      playlistInstance = sources;
      playlistInstance.resetState();
      playlistInstance.currentIndex(playlistInstance.currentIndex());
    } else {
      playlistInstance = new _ui_playlist__WEBPACK_IMPORTED_MODULE_5__["default"](player.cloudinary, sources, options);
      playlistInstance.currentIndex(0);
    }
    initPlaylistWidget();
    playlistDisposer = addPlaylistDisposer();
    player.addClass('vjs-playlist');
  };
  player.cloudinary.sourcesByTag = async function (tag) {
    let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    const url = (0,plugins_cloudinary_common__WEBPACK_IMPORTED_MODULE_3__.getCloudinaryUrl)(tag, Object.assign({}, player.cloudinary.cloudinaryConfig(), LIST_BY_TAG_PARAMS));
    const result = await fetch(url);
    const json = await result.json();
    const resources = (0,_utils_api__WEBPACK_IMPORTED_MODULE_4__.normalizeJsonResponse)(json.resources);
    if (options.sorter) {
      resources.sort(options.sorter);
    }
    const sources = resources.map(resource => {
      let sourceParams = options.sourceParams || {};
      if (typeof sourceParams === 'function') {
        sourceParams = sourceParams(resource);
      }
      const info = resource.context && resource.context.custom || {};
      const source = Object.assign({
        info
      }, sourceParams, {
        publicId: resource.publicId
      });
      return player.cloudinary.buildSource(source);
    });
    return sources;
  };
  return function (sources) {
    let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    if (sources === undefined) {
      return playlistInstance;
    }
    if (playlistInstance) {
      disposePlaylist();
    }
    createPlaylist(sources, options);
    player.trigger('playlistcreated');
    return chainTarget;
  };
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (playlist);

/***/ }),

/***/ "./plugins/playlist/ui/components/playlist-button.js":
/*!***********************************************************!*\
  !*** ./plugins/playlist/ui/components/playlist-button.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var video_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! video.js */ "../node_modules/video.js/dist/alt/video.core-exposed.js");
/* harmony import */ var video_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(video_js__WEBPACK_IMPORTED_MODULE_0__);


// Get the ClickableComponent base class from Video.js
const ClickableComponent = video_js__WEBPACK_IMPORTED_MODULE_0___default().getComponent('ClickableComponent');

// Create a common class for playlist buttons
class PlaylistButton extends ClickableComponent {
  constructor(player, options) {
    // It is important to invoke the superclass before anything else,
    // to get all the features of components out of the box!
    super(player, options);
    const type = options.type;
    if (!type && type !== 'previous' && type !== 'next') {
      throw new Error('Type must be either \'previous\' or \'next\'');
    }
  }

  // The `createEl` function of a component creates its DOM element.
  createEl() {
    const type = this.options_.type;
    const typeCssClass = "vjs-icon-".concat(type, "-item");
    return video_js__WEBPACK_IMPORTED_MODULE_0___default().dom.createEl('button', {
      // Prefixing classes of elements within a player with "vjs-"
      // is a convention used in Video.js.
      className: "vjs-control vjs-playlist-button vjs-button ".concat(typeCssClass),
      ariaLabel: "Playlist ".concat(type, " item")
    });
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PlaylistButton);

/***/ }),

/***/ "./plugins/playlist/ui/components/playlist-buttons.js":
/*!************************************************************!*\
  !*** ./plugins/playlist/ui/components/playlist-buttons.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PlaylistNextButton: () => (/* reexport safe */ _playlist_next_button__WEBPACK_IMPORTED_MODULE_0__["default"]),
/* harmony export */   PlaylistPreviousButton: () => (/* reexport safe */ _playlist_previous_button__WEBPACK_IMPORTED_MODULE_1__["default"])
/* harmony export */ });
/* harmony import */ var _playlist_next_button__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./playlist-next-button */ "./plugins/playlist/ui/components/playlist-next-button.js");
/* harmony import */ var _playlist_previous_button__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./playlist-previous-button */ "./plugins/playlist/ui/components/playlist-previous-button.js");
/* harmony import */ var _playlist_buttons_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./playlist-buttons.scss */ "./plugins/playlist/ui/components/playlist-buttons.scss");





/***/ }),

/***/ "./plugins/playlist/ui/components/playlist-next-button.js":
/*!****************************************************************!*\
  !*** ./plugins/playlist/ui/components/playlist-next-button.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _playlist_button__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./playlist-button */ "./plugins/playlist/ui/components/playlist-button.js");
/* harmony import */ var video_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! video.js */ "../node_modules/video.js/dist/alt/video.core-exposed.js");
/* harmony import */ var video_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(video_js__WEBPACK_IMPORTED_MODULE_1__);


class PlaylistNextButton extends _playlist_button__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(player) {
    super(player, {
      type: 'next'
    });
  }
  handleClick(event) {
    event.stopPropagation();
    super.handleClick(event);
    this.player().cloudinary.playlist().playNext();
  }
}
video_js__WEBPACK_IMPORTED_MODULE_1___default().registerComponent('PlaylistNextButton', PlaylistNextButton);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PlaylistNextButton);

/***/ }),

/***/ "./plugins/playlist/ui/components/playlist-previous-button.js":
/*!********************************************************************!*\
  !*** ./plugins/playlist/ui/components/playlist-previous-button.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _playlist_button__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./playlist-button */ "./plugins/playlist/ui/components/playlist-button.js");
/* harmony import */ var video_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! video.js */ "../node_modules/video.js/dist/alt/video.core-exposed.js");
/* harmony import */ var video_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(video_js__WEBPACK_IMPORTED_MODULE_1__);


class PlaylistPreviousButton extends _playlist_button__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(player) {
    super(player, {
      type: 'previous'
    });
  }
  handleClick(event) {
    super.handleClick(event);
    this.player().cloudinary.playlist().playPrevious();
  }
}
video_js__WEBPACK_IMPORTED_MODULE_1___default().registerComponent('PlaylistPreviousButton', PlaylistPreviousButton);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PlaylistPreviousButton);

/***/ }),

/***/ "./plugins/playlist/ui/components/upcoming-video-overlay.js":
/*!******************************************************************!*\
  !*** ./plugins/playlist/ui/components/upcoming-video-overlay.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var video_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! video.js */ "../node_modules/video.js/dist/alt/video.core-exposed.js");
/* harmony import */ var video_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(video_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _upcoming_video_overlay_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./upcoming-video-overlay.scss */ "./plugins/playlist/ui/components/upcoming-video-overlay.scss");
/* harmony import */ var utils_consts__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! utils/consts */ "./utils/consts.js");
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }




// support VJS5 & VJS6 at the same time
const dom = (video_js__WEBPACK_IMPORTED_MODULE_0___default().dom) || (video_js__WEBPACK_IMPORTED_MODULE_0___default());
const Component = video_js__WEBPACK_IMPORTED_MODULE_0___default().getComponent('Component');
const ClickableComponent = video_js__WEBPACK_IMPORTED_MODULE_0___default().getComponent('ClickableComponent');
class UpcomingVideoOverlay extends ClickableComponent {
  constructor(player) {
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }
    super(player, ...args);
    _defineProperty(this, "_hide", () => {
      this.removeClass(UpcomingVideoOverlay.VJS_UPCOMING_VIDEO_SHOW);
    });
    _defineProperty(this, "_onPlaylistItemChange", (_, event) => {
      this._hide();
      this._disableTransition(() => {
        if (event.next) {
          this.setItem(event.next);
        }
      });
    });
    _defineProperty(this, "_show", () => {
      const ima = this.player().ima;
      const adsManager = ima === 'object' && ima.getAdsManager();
      if (adsManager) {
        if (!adsManager.getCurrentAd() || adsManager.getCurrentAd().isLinear()) {
          this.addClass(UpcomingVideoOverlay.VJS_UPCOMING_VIDEO_SHOW);
        }
      } else {
        this.addClass(UpcomingVideoOverlay.VJS_UPCOMING_VIDEO_SHOW);
      }
    });
    this._setEvents(player);
  }
  _setEvents(player) {
    player.on(utils_consts__WEBPACK_IMPORTED_MODULE_2__.PLAYER_EVENT.UP_COMING_VIDEO_SHOW, this._show);
    player.on(utils_consts__WEBPACK_IMPORTED_MODULE_2__.PLAYER_EVENT.UP_COMING_VIDEO_HIDE, this._hide);
    player.on(utils_consts__WEBPACK_IMPORTED_MODULE_2__.PLAYER_EVENT.PLAYLIST_ITEM_CHANGED, this._onPlaylistItemChange);
  }
  _disableTransition(block) {
    this.addClass(UpcomingVideoOverlay.DISABLE_TRANSITION_CLASS);
    block();
    this.removeClass(UpcomingVideoOverlay.DISABLE_TRANSITION_CLASS);
  }
  setTitle(source) {
    const title = this.getChild('upcomingVideoOverlayContent').getChild('upcomingVideoOverlayBar').getChild('upcomingVideoOverlayTitle');
    title.setContent(source.info().title || source.publicId());
  }
  setItem(source) {
    this._source = source;
    const maxWidth = parseInt(window.getComputedStyle(this.el(), null).getPropertyValue('max-width'), 10);
    const maxHeight = Math.round(maxWidth * (9 / 16.0));
    const transformation = {
      crop: 'pad',
      background: 'auto:predominant',
      width: maxWidth,
      height: maxHeight
    };
    const content = this.getChild('upcomingVideoOverlayContent');
    this.setTitle(source);
    content.el().style.backgroundImage = "url(\"".concat(this._source.poster().url({
      transformation
    }), "\")");
  }
  handleClick() {
    super.handleClick(event);
    this.player().cloudinary.playlist().playNext();
  }
  createEl() {
    return super.createEl('div', {
      className: 'vjs-upcoming-video'
    });
  }
}
_defineProperty(UpcomingVideoOverlay, "DISABLE_TRANSITION_CLASS", 'disable-transition');
_defineProperty(UpcomingVideoOverlay, "VJS_UPCOMING_VIDEO_SHOW", 'vjs-upcoming-video-show');
class UpcomingVideoOverlayContent extends Component {
  createEl() {
    // Content wraps image and bar
    return super.createEl('div', {
      className: 'upcoming-video-overlay aspect-ratio-content'
    });
  }
}
class UpcomingVideoOverlayTitle extends Component {
  setContent(title) {
    this._contentSpan.innerText = title;
  }
  createEl() {
    const el = super.createEl('div', {
      className: 'vjs-control vjs-upcoming-video-title'
    });
    const container = dom.createEl('div', {
      className: 'vjs-upcoming-video-title-display',
      innerHTML: '<span class="vjs-control-text">Next up</span>Next up: '
    });
    this._contentSpan = dom.createEl('span', {
      className: 'vjs-upcoming-video-title-display-label'
    });
    container.appendChild(this._contentSpan);
    el.appendChild(container);
    return el;
  }
}
class UpcomingVideoOverlayBar extends Component {
  createEl() {
    return super.createEl('div', {
      className: 'vjs-upcoming-video-bar'
    });
  }
}
UpcomingVideoOverlay.prototype.options_ = {
  children: ['upcomingVideoOverlayContent']
};
video_js__WEBPACK_IMPORTED_MODULE_0___default().registerComponent('upcomingVideoOverlay', UpcomingVideoOverlay);
UpcomingVideoOverlayContent.prototype.options_ = {
  children: ['upcomingVideoOverlayBar']
};
video_js__WEBPACK_IMPORTED_MODULE_0___default().registerComponent('upcomingVideoOverlayContent', UpcomingVideoOverlayContent);
UpcomingVideoOverlayBar.prototype.options_ = {
  children: ['upcomingVideoOverlayTitle', 'playlistNextButton']
};
video_js__WEBPACK_IMPORTED_MODULE_0___default().registerComponent('upcomingVideoOverlayBar', UpcomingVideoOverlayBar);
video_js__WEBPACK_IMPORTED_MODULE_0___default().registerComponent('upcomingVideoOverlayTitle', UpcomingVideoOverlayTitle);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (UpcomingVideoOverlay);

/***/ }),

/***/ "./plugins/playlist/ui/layout/playlist-layout-custom.js":
/*!**************************************************************!*\
  !*** ./plugins/playlist/ui/layout/playlist-layout-custom.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _playlist_layout__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./playlist-layout */ "./plugins/playlist/ui/layout/playlist-layout.js");

class PlaylistLayoutCustom extends _playlist_layout__WEBPACK_IMPORTED_MODULE_0__["default"] {
  getCls() {
    let cls = super.getCls();
    cls.push('cld-plw-custom');
    return cls;
  }
  createEl() {
    const el = super.createEl();
    this.options_.renderTo.appendChild(el);
    return el;
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PlaylistLayoutCustom);

/***/ }),

/***/ "./plugins/playlist/ui/layout/playlist-layout-horizontal.js":
/*!******************************************************************!*\
  !*** ./plugins/playlist/ui/layout/playlist-layout-horizontal.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _playlist_layout__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./playlist-layout */ "./plugins/playlist/ui/layout/playlist-layout.js");

class PlaylistLayoutHorizontal extends _playlist_layout__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(player, options) {
    options.wrap = true;
    super(player, options);
  }
  getCls() {
    const cls = super.getCls();
    cls.push('cld-plw-horizontal');
    return cls;
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PlaylistLayoutHorizontal);

/***/ }),

/***/ "./plugins/playlist/ui/layout/playlist-layout-vertical.js":
/*!****************************************************************!*\
  !*** ./plugins/playlist/ui/layout/playlist-layout-vertical.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _playlist_layout__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./playlist-layout */ "./plugins/playlist/ui/layout/playlist-layout.js");

class PlaylistLayoutVertical extends _playlist_layout__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(player, options) {
    options.wrap = true;
    super(player, options);
  }
  getCls() {
    const cls = super.getCls();
    cls.push('cld-plw-vertical');
    return cls;
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PlaylistLayoutVertical);

/***/ }),

/***/ "./plugins/playlist/ui/layout/playlist-layout.js":
/*!*******************************************************!*\
  !*** ./plugins/playlist/ui/layout/playlist-layout.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var video_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! video.js */ "../node_modules/video.js/dist/alt/video.core-exposed.js");
/* harmony import */ var video_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(video_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var utils_consts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! utils/consts */ "./utils/consts.js");
/* harmony import */ var _utils_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../utils/dom */ "./plugins/playlist/utils/dom.js");
/* harmony import */ var utils_css_prefix__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! utils/css-prefix */ "./utils/css-prefix.js");




const dom = (video_js__WEBPACK_IMPORTED_MODULE_0___default().dom) || (video_js__WEBPACK_IMPORTED_MODULE_0___default());
const Component = video_js__WEBPACK_IMPORTED_MODULE_0___default().getComponent('Component');
const OPTIONS_DEFAULT = {
  wrap: false
};
class PlaylistLayout extends Component {
  constructor(player, options) {
    const layoutOptions = {
      ...OPTIONS_DEFAULT,
      ...options
    };
    super(player, layoutOptions);
    this.player_ = player;
    const fluidHandler = (e, fluid) => {
      this.options_.fluid = fluid;
      this.removeCls();
      this.setCls();
    };
    const wrapVideoWithLayout = () => {
      const el = this.el();
      this.videoWrap_ = dom.createEl('div', {
        className: 'cld-plw-col-player'
      });
      this.contentEl_ = this.contentEl_ = dom.createEl('div', {
        className: 'cld-plw-col-list'
      });
      (0,_utils_dom__WEBPACK_IMPORTED_MODULE_2__.wrap)(this.player().el(), el);
      el.appendChild(this.videoWrap_);
      el.appendChild(this.contentEl_);
      (0,_utils_dom__WEBPACK_IMPORTED_MODULE_2__.wrap)(this.player().el(), this.videoWrap_);
    };
    if (layoutOptions.wrap) {
      wrapVideoWithLayout();
    }
    player.on(utils_consts__WEBPACK_IMPORTED_MODULE_1__.PLAYER_EVENT.FLUID, fluidHandler);
    this.addChild(utils_consts__WEBPACK_IMPORTED_MODULE_1__.PLAYER_EVENT.PLAYLIST_PANEL, this.options_);
    this.setCls();
    this.dispose = () => {
      this.removeLayout();
      super.dispose();
      player.off(utils_consts__WEBPACK_IMPORTED_MODULE_1__.PLAYER_EVENT.FLUID, fluidHandler);
    };
  }
  getCls() {
    let cls = ['cld-video-player', 'cld-plw-layout'];
    cls.push((0,utils_css_prefix__WEBPACK_IMPORTED_MODULE_3__.skinClassPrefix)(this.player()));
    cls.push((0,utils_css_prefix__WEBPACK_IMPORTED_MODULE_3__.playerClassPrefix)(this.player()));
    if (this.options_.fluid) {
      cls.push('cld-plw-layout-fluid');
    }
    return cls;
  }
  setCls() {
    this.removeClass((0,utils_css_prefix__WEBPACK_IMPORTED_MODULE_3__.skinClassPrefix)(this.player()));
    this.getCls().forEach(cls => {
      this.addClass(cls);
    });
  }
  removeCls() {
    this.getCls().forEach(cls => {
      this.removeClass(cls);
    });
  }
  update(optionToChange, options) {
    this.options(options);
    this.removeChild('PlaylistPanel');
    this.addChild('PlaylistPanel', this.options_);
    this.trigger('playlistlayoutupdate');
  }
  removeLayout() {
    const parentElem = this.el().parentElement;
    if (parentElem) {
      parentElem.appendChild(this.player().el());
    }
  }
  createEl() {
    const el = super.createEl('div');

    // Apply font styles on wrapper div.
    el.style.fontFamily = this.player().el().style.fontFamily;
    return el;
  }
}
video_js__WEBPACK_IMPORTED_MODULE_0___default().registerComponent('playlistLayout', PlaylistLayout);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PlaylistLayout);

/***/ }),

/***/ "./plugins/playlist/ui/panel/playlist-panel-item.js":
/*!**********************************************************!*\
  !*** ./plugins/playlist/ui/panel/playlist-panel-item.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var video_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! video.js */ "../node_modules/video.js/dist/alt/video.core-exposed.js");
/* harmony import */ var video_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(video_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _thumbnail_thumbnail__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../thumbnail/thumbnail */ "./plugins/playlist/ui/thumbnail/thumbnail.js");


const dom = (video_js__WEBPACK_IMPORTED_MODULE_0___default().dom) || (video_js__WEBPACK_IMPORTED_MODULE_0___default());
const DEFAULT_OPTIONS = {
  source: null,
  next: false
};
class PlaylistPanelItem extends _thumbnail_thumbnail__WEBPACK_IMPORTED_MODULE_1__["default"] {
  constructor(player, initOptions) {
    const options = video_js__WEBPACK_IMPORTED_MODULE_0___default().obj.merge(DEFAULT_OPTIONS, initOptions);
    super(player, options);
  }
  handleClick(event) {
    super.handleClick(event);
    this.play();
  }
  play() {
    const item = this.getItem();
    const list = this.player().cloudinary.playlist().list();
    const index = list.indexOf(item);
    if (index === -1) {
      throw new Error('Invalid playlist item...');
    }
    this.player().cloudinary.playlist().playAtIndex(index);
  }
  isCurrent() {
    return this.options_.current;
  }
  getTitle() {
    return super.getTitle();
  }
  getDuration() {
    return super.getDuration();
  }
  createEl() {
    const el = super.createEl();
    el.classList.add('cld-plw-panel-item');
    const info = dom.createEl('div', {
      className: 'cld-plw-item-info-wrap'
    });
    const titleWrap = dom.createEl('div', {
      className: 'cld-plw-item-title'
    });
    if (this.isCurrent()) {
      el.classList.add('cld-plw-panel-item-active');
      const currEl = dom.createEl('span', {
        className: 'cld-plw-item-title-curr'
      }, {}, 'Now Playing: ');
      titleWrap.appendChild(currEl);
    }
    const title = dom.createEl('span', {
      className: 'cld-plw-item-title'
    }, {}, this.getTitle());
    titleWrap.appendChild(title);
    const duration = dom.createEl('div', {
      className: 'cld-plw-item-duration'
    }, {}, this.getDuration());
    info.appendChild(titleWrap);
    info.appendChild(duration);
    if (el) {
      el.appendChild(info);
    }
    el.appendChild(info);
    return el;
  }
}
video_js__WEBPACK_IMPORTED_MODULE_0___default().registerComponent('playlistPanelItem', PlaylistPanelItem);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PlaylistPanelItem);

/***/ }),

/***/ "./plugins/playlist/ui/panel/playlist-panel.js":
/*!*****************************************************!*\
  !*** ./plugins/playlist/ui/panel/playlist-panel.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var video_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! video.js */ "../node_modules/video.js/dist/alt/video.core-exposed.js");
/* harmony import */ var video_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(video_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _playlist_panel_item__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./playlist-panel-item */ "./plugins/playlist/ui/panel/playlist-panel-item.js");
/* harmony import */ var utils_consts__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! utils/consts */ "./utils/consts.js");



const Component = video_js__WEBPACK_IMPORTED_MODULE_0___default().getComponent('Component');
class PlaylistPanel extends Component {
  constructor(player) {
    let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    super(player, options);
    const itemChangeHandler = () => {
      this.render();
    };
    player.on(utils_consts__WEBPACK_IMPORTED_MODULE_2__.PLAYER_EVENT.PLAYLIST_ITEM_CHANGED, itemChangeHandler);
    this.render();
    this.dispose = () => {
      super.dispose();
      player.off(utils_consts__WEBPACK_IMPORTED_MODULE_2__.PLAYER_EVENT.PLAYLIST_ITEM_CHANGED, itemChangeHandler);
    };
  }
  createEl() {
    const el = super.createEl();
    el.classList.add('cld-plw-panel');
    return el;
  }
  removeAll() {
    const children = this.children();
    for (let i = children.length - 1; i >= 0; --i) {
      this.removeChild(children[i]);
    }
  }
  getItems() {
    const playlist = this.player().cloudinary.playlist();
    const repeat = playlist._repeat;
    if (this.options_.showAll) {
      return playlist.list();
    }
    const items = [];
    const numOfItems = this.options_.total;
    let index = playlist.currentIndex();
    let source = playlist.list()[index];
    items.push(source);
    while (items.length < numOfItems) {
      index = playlist.nextIndex(index);
      if (index === -1) {
        if (!repeat && items.length > 0) {
          break;
        }
        index = 0;
      }
      source = playlist.list()[index];
      items.push(source);
    }
    return items;
  }
  render() {
    const items = this.getItems();
    this.removeAll();
    items.forEach((source, index) => {
      const playlistItem = new _playlist_panel_item__WEBPACK_IMPORTED_MODULE_1__["default"](this.player(), video_js__WEBPACK_IMPORTED_MODULE_0___default().obj.merge(this.options_, {
        item: source,
        next: index === 1,
        current: index === 0
      }));
      this.addChild(playlistItem);
    });
  }
}
video_js__WEBPACK_IMPORTED_MODULE_0___default().registerComponent('playlistPanel', PlaylistPanel);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PlaylistPanel);

/***/ }),

/***/ "./plugins/playlist/ui/playlist-widget.js":
/*!************************************************!*\
  !*** ./plugins/playlist/ui/playlist-widget.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var video_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! video.js */ "../node_modules/video.js/dist/alt/video.core-exposed.js");
/* harmony import */ var video_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(video_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var utils_consts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! utils/consts */ "./utils/consts.js");
/* harmony import */ var _layout_playlist_layout_horizontal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./layout/playlist-layout-horizontal */ "./plugins/playlist/ui/layout/playlist-layout-horizontal.js");
/* harmony import */ var _layout_playlist_layout_vertical__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./layout/playlist-layout-vertical */ "./plugins/playlist/ui/layout/playlist-layout-vertical.js");
/* harmony import */ var _layout_playlist_layout_custom__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./layout/playlist-layout-custom */ "./plugins/playlist/ui/layout/playlist-layout-custom.js");
/* harmony import */ var _playlist_const__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./playlist.const */ "./plugins/playlist/ui/playlist.const.js");






const modifyOptions = (player, opt) => {
  const options = {
    ..._playlist_const__WEBPACK_IMPORTED_MODULE_5__.PLAYLIST_DEFAULTS_OPTIONS,
    ...opt
  };
  if (options.show && typeof options.selector === 'string') {
    options.useDefaultLayout = false;
    options.useCustomLayout = true;
    options.renderTo = document.querySelector(options.selector);
    options.showAll = true;
    if (!options.renderTo.length === 0) {
      throw new Error("Couldn't find element(s) by selector '".concat(options.selector, "' for playlist"));
    }
  }
  if (options.show && !options.selector) {
    options.useDefaultLayout = true;
    options.useCustomLayout = false;
  }
  options.direction = options.direction.toLowerCase() === 'horizontal' ? 'horizontal' : 'vertical';
  options.skin = player.options_.skin;
  return options;
};
class PlaylistWidget {
  constructor(player) {
    let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    options = modifyOptions(player, options);
    this.options_ = options;
    this.player_ = player;
    this.render();
    const fluidHandler = (e, fluid) => {
      this.options_.fluid = fluid;
    };
    player.on(utils_consts__WEBPACK_IMPORTED_MODULE_1__.PLAYER_EVENT.FLUID, fluidHandler);
    this.options = options => {
      if (!options) {
        return this.options_;
      }
      this.options_ = video_js__WEBPACK_IMPORTED_MODULE_0___default().obj.merge(this.options_, options);
      player.trigger('playlistwidgetoption', this.options_.playlistWidget);
      return this.options_;
    };
    this.dispose = () => {
      this.layout_.dispose();
      player.off(utils_consts__WEBPACK_IMPORTED_MODULE_1__.PLAYER_EVENT.FLUID, fluidHandler);
    };
  }
  render() {
    if (this.options_.useDefaultLayout) {
      if (this.options_.direction === 'horizontal') {
        this.layout_ = new _layout_playlist_layout_horizontal__WEBPACK_IMPORTED_MODULE_2__["default"](this.player_, this.options_);
      } else {
        this.layout_ = new _layout_playlist_layout_vertical__WEBPACK_IMPORTED_MODULE_3__["default"](this.player_, this.options_);
      }
    }
    if (this.options_.useCustomLayout) {
      this.layout_ = new _layout_playlist_layout_custom__WEBPACK_IMPORTED_MODULE_4__["default"](this.player_, this.options_);
    }
  }
  getLayout() {
    return this.layout_;
  }
  update(optionName, optionValue) {
    this.options(optionValue);
    if (optionName === 'direction') {
      this.layout_.removeLayout();
      this.layout_.dispose();
      this.render();
    } else {
      this.layout_.update(optionName, this.options_);
    }
  }
  setSkin() {
    this.layout_.setCls();
  }
  total() {
    let totalNumber = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _playlist_const__WEBPACK_IMPORTED_MODULE_5__.PLAYLIST_DEFAULTS_OPTIONS.total;
    const total = parseInt(totalNumber, 10);
    if (total !== this.options_.total && typeof total === 'number' && total > 0) {
      this.update('total', {
        total: total
      });
    }
    return this;
  }
  direction() {
    let direction = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _playlist_const__WEBPACK_IMPORTED_MODULE_5__.PLAYLIST_DEFAULTS_OPTIONS.direction;
    if (direction === 'horizontal' || direction === 'vertical') {
      this.update('direction', {
        direction: direction
      });
    }
    return this;
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PlaylistWidget);

/***/ }),

/***/ "./plugins/playlist/ui/playlist.const.js":
/*!***********************************************!*\
  !*** ./plugins/playlist/ui/playlist.const.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DEFAULT_AUTO_ADVANCE: () => (/* binding */ DEFAULT_AUTO_ADVANCE),
/* harmony export */   DEFAULT_PRESENT_UPCOMING: () => (/* binding */ DEFAULT_PRESENT_UPCOMING),
/* harmony export */   PLAYLIST_DEFAULTS_OPTIONS: () => (/* binding */ PLAYLIST_DEFAULTS_OPTIONS),
/* harmony export */   UPCOMING_VIDEO_TRANSITION: () => (/* binding */ UPCOMING_VIDEO_TRANSITION)
/* harmony export */ });
const DEFAULT_AUTO_ADVANCE = 0;
const DEFAULT_PRESENT_UPCOMING = 10;
const UPCOMING_VIDEO_TRANSITION = 1;
const PLAYLIST_DEFAULTS_OPTIONS = {
  fluid: false,
  show: true,
  direction: 'vertical',
  total: 4,
  selector: false,
  renderTo: []
};

/***/ }),

/***/ "./plugins/playlist/ui/playlist.js":
/*!*****************************************!*\
  !*** ./plugins/playlist/ui/playlist.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var plugins_cloudinary_models_video_source_video_source__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! plugins/cloudinary/models/video-source/video-source */ "./plugins/cloudinary/models/video-source/video-source.js");
/* harmony import */ var lodash_isInteger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash/isInteger */ "../node_modules/lodash/isInteger.js");
/* harmony import */ var lodash_isInteger__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_isInteger__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _components_upcoming_video_overlay__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/upcoming-video-overlay */ "./plugins/playlist/ui/components/upcoming-video-overlay.js");
/* harmony import */ var _components_playlist_buttons__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/playlist-buttons */ "./plugins/playlist/ui/components/playlist-buttons.js");
/* harmony import */ var _playlist_const__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./playlist.const */ "./plugins/playlist/ui/playlist.const.js");
/* harmony import */ var _playlist_scss__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./playlist.scss */ "./plugins/playlist/ui/playlist.scss");
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }






class Playlist {
  constructor(context) {
    var _this = this;
    let _sources = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
    let {
      repeat = false,
      autoAdvance = false,
      presentUpcoming = false
    } = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    _defineProperty(this, "playlistByTag", function (tag) {
      let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      return _this.player().sourcesByTag(tag, options).then(sources => _this.player().playlist(sources, options));
    });
    this._context = context;
    this._sources = [];
    this._defaultRecResolverCache = {};
    this._currentIndex = null;
    this._recommendationsHandler = null;
    this._autoAdvance = null;
    this._presentUpcoming = null;
    this.addUiComponents();
    this.resetState = () => {
      this.repeat(repeat);
      this.autoAdvance(autoAdvance);
      this.presentUpcoming(presentUpcoming);
    };
    _sources.forEach(source => this.enqueue(source));
    this.resetState();
  }
  list() {
    return this._sources;
  }
  player() {
    return this._context.player;
  }
  addUiComponents() {
    const controlBar = this.player().getChild('ControlBar');
    const children = controlBar.children();
    controlBar.addChild('playlistPreviousButton', {}, children.findIndex(c => c.name_ === 'PlayToggle'));
    controlBar.addChild('playlistNextButton', {}, children.findIndex(c => c.name_ === 'PlayToggle') + 1);
    this.player().addChild('upcomingVideoOverlay');
  }
  presentUpcoming(delay) {
    this._presentUpcoming = this._presentUpcoming || {};
    if (delay === undefined) {
      return this._presentUpcoming.delay;
    }
    if (delay === true) {
      delay = _playlist_const__WEBPACK_IMPORTED_MODULE_4__.DEFAULT_PRESENT_UPCOMING;
    } else if (delay === false) {
      delay = false;
    } else if (!lodash_isInteger__WEBPACK_IMPORTED_MODULE_1___default()(delay) || delay < 0) {
      throw new Error('presentUpcoming \'delay\' must be either a boolean or a positive integer.');
    }
    this._presentUpcoming.delay = delay;
    this._setupPresentUpcoming();
    return this._presentUpcoming.delay;
  }
  autoAdvance(delay) {
    this._autoAdvance = this._autoAdvance || {};
    if (delay === undefined) {
      return this._autoAdvance.delay;
    }
    if (delay === true) {
      delay = _playlist_const__WEBPACK_IMPORTED_MODULE_4__.DEFAULT_AUTO_ADVANCE;
    } else if (delay === false) {
      delay = false;
    } else if (!lodash_isInteger__WEBPACK_IMPORTED_MODULE_1___default()(delay) || delay < 0) {
      throw new Error('Auto advance \'delay\' must be either a boolean or a positive integer.');
    }
    this._autoAdvance.delay = delay;
    this._setupAutoAdvance();
    return this._autoAdvance.delay;
  }
  _setupAutoAdvance() {
    this._resetAutoAdvance();
    const delay = this._autoAdvance.delay;
    if (delay === false) {
      return;
    }
    const trigger = () => {
      if (this.player().ended()) {
        this._autoAdvance.timeout = setTimeout(() => {
          this.playNext();
        }, delay * 1000);
      }
    };
    this._autoAdvance = {
      delay,
      trigger
    };
    this._context.on('ended', this._autoAdvance.trigger);
  }
  dispose() {
    this._resetAutoAdvance();
    this._resetPresentUpcoming();
    this._resetRecommendations();
  }
  _resetPresentUpcoming() {
    this.player().trigger('upcomingvideohide');
    if (!this._presentUpcoming) {
      this._presentUpcoming = {};
    }
    if (this._presentUpcoming.trigger) {
      this._context.off('timeupdate', this._presentUpcoming.trigger);
    }
    this._presentUpcoming.trigger = null;
    this._presentUpcoming.showTriggered = false;
  }
  _setupPresentUpcoming() {
    this._resetPresentUpcoming();
    const delay = this._presentUpcoming.delay;
    if (delay === false) {
      return;
    }
    this._presentUpcoming.trigger = () => {
      const currentTime = this.player().currentTime();
      const duration = this.player().duration();
      const remainingTime = duration - currentTime;
      if (remainingTime < _playlist_const__WEBPACK_IMPORTED_MODULE_4__.UPCOMING_VIDEO_TRANSITION + 0.5) {
        if (this._presentUpcoming.showTriggered) {
          this.player().trigger('upcomingvideohide');
          this._presentUpcoming.showTriggered = false;
        }
      } else if (remainingTime <= this._presentUpcoming.delay && !this._presentUpcoming.showTriggered && !this.player().loop()) {
        this.player().trigger('upcomingvideoshow');
        this._presentUpcoming.showTriggered = true;
      } else if (this._presentUpcoming.showTriggered && (remainingTime > this._presentUpcoming.delay || this.player().loop())) {
        this.player().trigger('upcomingvideohide');
        this._presentUpcoming.showTriggered = false;
      }
    };
    this._context.on('timeupdate', this._presentUpcoming.trigger);
  }
  _resetAutoAdvance() {
    if (!this._autoAdvance) {
      this._autoAdvance = {};
    }
    if (this._autoAdvance.timeout) {
      clearTimeout(this._autoAdvance.timeout);
    }
    if (this._autoAdvance.trigger) {
      this._context.off('ended', this._autoAdvance.trigger);
    }
    this._autoAdvance.timeout = null;
    this._autoAdvance.trigger = null;
  }
  _resetRecommendations() {
    if (this._recommendationsHandler) {
      this._context.off('ended', this._recommendationsHandler);
    }
  }
  _refreshRecommendations() {
    this._resetRecommendations();
    this._recommendationsHandler = () => {
      if (this.autoAdvance() === false && this._context.autoShowRecommendations()) {
        this.player().trigger('recommendationsshow');
      }
    };
    this._context.on('ended', this._recommendationsHandler);
  }
  _refreshTextTracks() {
    this.player().trigger('refreshTextTracks', this.currentSource().textTracks());
  }
  _recommendationItemBuilder(source) {
    const defaultResolver = this._defaultRecResolverCache[source.objectId];
    if (source.recommendations() && (!defaultResolver || source.recommendations() !== defaultResolver)) {
      return;
    }
    return source => ({
      source,
      action: () => this.playItem(source)
    });
  }
  currentIndex(index) {
    if (index === undefined) {
      return this._currentIndex;
    }
    if (index >= this.length() || index < 0) {
      throw new Error('Invalid playlist index.');
    }
    this._currentIndex = index;
    const current = this.currentSource();
    const itemBuilder = this._recommendationItemBuilder(current);
    if (!current.recommendations()) {
      current.recommendations(this._defaultRecommendationsResolver(current));
    }
    this._context.source(current, {
      recommendationOptions: {
        disableAutoShow: true,
        itemBuilder
      }
    });
    const eventData = {
      playlist: this,
      current,
      next: this.next()
    };
    this.player().trigger('playlistitemchanged', eventData);
    this._refreshRecommendations();
    this._refreshTextTracks();
    return current;
  }
  _defaultRecommendationsResolver(source) {
    const defaultResolver = this._defaultRecResolverCache[source.objectId];
    if (defaultResolver) {
      return defaultResolver;
    }
    this._defaultRecResolverCache[source.objectId] = () => {
      let index = this.list().indexOf(source);
      const items = [];
      const numOfItems = Math.min(4, this.length() - 1);
      while (items.length < numOfItems) {
        index = this.nextIndex(index);
        if (index === -1) {
          break;
        }
        const source = this.list()[index];
        items.push(source);
      }
      return items;
    };
    return this._defaultRecResolverCache[source.objectId];
  }
  buildSource(source) {
    let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    return this._context.buildSource(source, options);
  }
  enqueue(source) {
    let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    const src = source instanceof plugins_cloudinary_models_video_source_video_source__WEBPACK_IMPORTED_MODULE_0__["default"] ? source : this.buildSource(source, options);
    this._sources.push(src);
    return src;
  }
  playItem(item) {
    let index = this.list().indexOf(item);
    if (index === -1) {
      throw new Error('Invalid playlist item.');
    }
    this.playAtIndex(index);
  }
  playAtIndex(index) {
    this.currentIndex(index);
    this.player().play();
    return this.currentSource();
  }
  currentSource() {
    return this.list()[this.currentIndex()];
  }
  removeAt(index) {
    if (index >= this.length() || index < 0) {
      throw new Error('Invalid playlist index.');
    }
    this._sources.splice(index, 1);
    return this;
  }
  repeat(repeat) {
    if (repeat === undefined) {
      return this._repeat;
    }
    this._repeat = !!repeat;
    return this._repeat;
  }
  first() {
    return this.list()[0];
  }
  last() {
    return this.list()[this.length() - 1];
  }
  next() {
    const nextIndex = this.nextIndex();
    if (nextIndex === -1) {
      return null;
    }
    return this.list()[nextIndex];
  }
  nextIndex(index) {
    index = index !== undefined ? index : this.currentIndex();
    if (index >= this.length() || index < 0) {
      throw new Error('Invalid playlist index.');
    }
    const isLast = index === this.length() - 1;
    let nextIndex = index + 1;
    if (isLast) {
      if (this.repeat()) {
        nextIndex = 0;
      } else {
        return -1;
      }
    }
    return nextIndex;
  }
  previousIndex() {
    if (this.isFirst()) {
      return -1;
    }
    return this.currentIndex() - 1;
  }
  playFirst() {
    return this.playAtIndex(0);
  }
  playLast() {
    const lastIndex = this.list().length - 1;
    return this.playAtIndex(lastIndex);
  }
  isLast() {
    return this.currentIndex() >= this.length() - 1;
  }
  isFirst() {
    return this.currentIndex() === 0;
  }
  length() {
    return this.list().length;
  }
  playNext() {
    let nextIndex = this.nextIndex();
    if (nextIndex === -1) {
      return null;
    }
    return this.playAtIndex(nextIndex);
  }
  playPrevious() {
    let previousIndex = this.previousIndex();
    if (previousIndex === -1) {
      return null;
    }
    return this.playAtIndex(previousIndex);
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Playlist);

/***/ }),

/***/ "./plugins/playlist/ui/thumbnail/thumbnail.js":
/*!****************************************************!*\
  !*** ./plugins/playlist/ui/thumbnail/thumbnail.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var video_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! video.js */ "../node_modules/video.js/dist/alt/video.core-exposed.js");
/* harmony import */ var video_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(video_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _thumbnail_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./thumbnail.scss */ "./plugins/playlist/ui/thumbnail/thumbnail.scss");



// Get the ClickableComponent base class from Video.js
const ClickableComponent = video_js__WEBPACK_IMPORTED_MODULE_0___default().getComponent('ClickableComponent');
const THUMB_DEFAULT_WIDTH = 300;
const DEFAULT_OPTIONS = {
  item: null,
  transformation: {
    width: THUMB_DEFAULT_WIDTH,
    aspect_ratio: '16:9',
    crop: 'pad',
    background: 'black'
  }
};
class Thumbnail extends ClickableComponent {
  constructor(player, initOptions) {
    const options = video_js__WEBPACK_IMPORTED_MODULE_0___default().obj.merge(DEFAULT_OPTIONS, initOptions);
    super(player, options);
  }
  getItem() {
    return this.options_.item;
  }
  getTitle() {
    return this.getItem().info().title;
  }
  getDuration() {
    return ' '; // this.getItem().info().title;
  }
  getThumbnail() {
    return this.getItem().poster().url({
      transformation: this.options_.transformation
    });
  }
  handleClick(e) {
    e.preventDefault();
  }
  createControlTextEl() {
    return;
  }
  createEl() {
    let tag = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'a';
    const el = super.createEl(tag, {
      className: 'cld-thumbnail',
      href: '#'
    });
    const img = super.createEl('img', {
      className: 'cld-thumbnail-img',
      src: this.getThumbnail()
    });
    el.appendChild(img);
    el.style.backgroundImage = "url('".concat(this.getThumbnail(), "')");
    return el;
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Thumbnail);

/***/ }),

/***/ "./plugins/playlist/utils/api.js":
/*!***************************************!*\
  !*** ./plugins/playlist/utils/api.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   normalizeJsonResponse: () => (/* binding */ normalizeJsonResponse)
/* harmony export */ });
/* harmony import */ var lodash_camelCase__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/camelCase */ "../node_modules/lodash/camelCase.js");
/* harmony import */ var lodash_camelCase__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_camelCase__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash_isPlainObject__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash/isPlainObject */ "../node_modules/lodash/isPlainObject.js");
/* harmony import */ var lodash_isPlainObject__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_isPlainObject__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _time__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./time */ "./plugins/playlist/utils/time.js");



const TIME_FIELDS = ['created_at', 'updated_at'];
const normalizeJsonResponse = obj => {
  const agg = {};
  if (lodash_isPlainObject__WEBPACK_IMPORTED_MODULE_1___default()(obj)) {
    Object.keys(obj).reduce((agg, key) => {
      const newKey = lodash_camelCase__WEBPACK_IMPORTED_MODULE_0___default()(key);
      if (TIME_FIELDS.indexOf(key) !== -1) {
        agg[newKey] = new Date((0,_time__WEBPACK_IMPORTED_MODULE_2__.parseISO8601)(obj[key]));
      } else {
        agg[newKey] = normalizeJsonResponse(obj[key]);
      }
      return agg;
    }, agg);
    return agg;
  } else if (Array.isArray(obj)) {
    return obj.map(item => normalizeJsonResponse(item));
  } else {
    return obj;
  }
};


/***/ }),

/***/ "./plugins/playlist/utils/dom.js":
/*!***************************************!*\
  !*** ./plugins/playlist/utils/dom.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   wrap: () => (/* binding */ wrap)
/* harmony export */ });
const wrap = (el, wrapper) => {
  el.parentNode.insertBefore(wrapper, el);
  wrapper.appendChild(el);
  return wrapper;
};

/***/ }),

/***/ "./plugins/playlist/utils/time.js":
/*!****************************************!*\
  !*** ./plugins/playlist/utils/time.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   parseISO8601: () => (/* binding */ parseISO8601)
/* harmony export */ });
// https://github.com/csnover/js-iso8601/blob/master/iso8601.js
const numericKeys = [1, 4, 5, 6, 7, 10, 11];
const parseISO8601 = function (date) {
  let timestamp = 0;
  let struct = 0;
  let minutesOffset = 0;

  // ES5 §15.9.4.2 states that the string should attempt to be parsed as a Date Time String Format string
  // before falling back to any implementation-specific date parsing, so that’s what we do, even if native
  // implementations could be faster
  //              1 YYYY                2 MM       3 DD           4 HH    5 mm       6 ss        7 msec        8 Z 9 ±    10 tzHH    11 tzmm
  if (struct = /^(\d{4}|[+\-]\d{6})(?:-(\d{2})(?:-(\d{2}))?)?(?:T(\d{2}):(\d{2})(?::(\d{2})(?:\.(\d{3}))?)?(?:(Z)|([+\-])(\d{2})(?::(\d{2}))?)?)?$/.exec(date)) {
    // avoid NaN timestamps caused by “undefined” values being passed to Date.UTC
    for (let i = 0, k; k = numericKeys[i]; ++i) {
      struct[k] = +struct[k] || 0;
    }

    // allow undefined days and months
    struct[2] = (+struct[2] || 1) - 1;
    struct[3] = +struct[3] || 1;
    if (struct[8] !== 'Z' && struct[9] !== undefined) {
      minutesOffset = struct[10] * 60 + struct[11];
      if (struct[9] === '+') {
        minutesOffset = 0 - minutesOffset;
      }
    }
    timestamp = Date.UTC(struct[1], struct[2], struct[3], struct[4], struct[5] + minutesOffset, struct[6], struct[7]);
  } else {
    timestamp = NaN;
  }
  return timestamp;
};


/***/ }),

/***/ "../node_modules/lodash/_baseTrim.js":
/*!*******************************************!*\
  !*** ../node_modules/lodash/_baseTrim.js ***!
  \*******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var trimmedEndIndex = __webpack_require__(/*! ./_trimmedEndIndex */ "../node_modules/lodash/_trimmedEndIndex.js");

/** Used to match leading whitespace. */
var reTrimStart = /^\s+/;

/**
 * The base implementation of `_.trim`.
 *
 * @private
 * @param {string} string The string to trim.
 * @returns {string} Returns the trimmed string.
 */
function baseTrim(string) {
  return string
    ? string.slice(0, trimmedEndIndex(string) + 1).replace(reTrimStart, '')
    : string;
}

module.exports = baseTrim;


/***/ }),

/***/ "../node_modules/lodash/_trimmedEndIndex.js":
/*!**************************************************!*\
  !*** ../node_modules/lodash/_trimmedEndIndex.js ***!
  \**************************************************/
/***/ ((module) => {

/** Used to match a single whitespace character. */
var reWhitespace = /\s/;

/**
 * Used by `_.trim` and `_.trimEnd` to get the index of the last non-whitespace
 * character of `string`.
 *
 * @private
 * @param {string} string The string to inspect.
 * @returns {number} Returns the index of the last non-whitespace character.
 */
function trimmedEndIndex(string) {
  var index = string.length;

  while (index-- && reWhitespace.test(string.charAt(index))) {}
  return index;
}

module.exports = trimmedEndIndex;


/***/ }),

/***/ "../node_modules/lodash/isInteger.js":
/*!*******************************************!*\
  !*** ../node_modules/lodash/isInteger.js ***!
  \*******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var toInteger = __webpack_require__(/*! ./toInteger */ "../node_modules/lodash/toInteger.js");

/**
 * Checks if `value` is an integer.
 *
 * **Note:** This method is based on
 * [`Number.isInteger`](https://mdn.io/Number/isInteger).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an integer, else `false`.
 * @example
 *
 * _.isInteger(3);
 * // => true
 *
 * _.isInteger(Number.MIN_VALUE);
 * // => false
 *
 * _.isInteger(Infinity);
 * // => false
 *
 * _.isInteger('3');
 * // => false
 */
function isInteger(value) {
  return typeof value == 'number' && value == toInteger(value);
}

module.exports = isInteger;


/***/ }),

/***/ "../node_modules/lodash/toFinite.js":
/*!******************************************!*\
  !*** ../node_modules/lodash/toFinite.js ***!
  \******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var toNumber = __webpack_require__(/*! ./toNumber */ "../node_modules/lodash/toNumber.js");

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0,
    MAX_INTEGER = 1.7976931348623157e+308;

/**
 * Converts `value` to a finite number.
 *
 * @static
 * @memberOf _
 * @since 4.12.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {number} Returns the converted number.
 * @example
 *
 * _.toFinite(3.2);
 * // => 3.2
 *
 * _.toFinite(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toFinite(Infinity);
 * // => 1.7976931348623157e+308
 *
 * _.toFinite('3.2');
 * // => 3.2
 */
function toFinite(value) {
  if (!value) {
    return value === 0 ? value : 0;
  }
  value = toNumber(value);
  if (value === INFINITY || value === -INFINITY) {
    var sign = (value < 0 ? -1 : 1);
    return sign * MAX_INTEGER;
  }
  return value === value ? value : 0;
}

module.exports = toFinite;


/***/ }),

/***/ "../node_modules/lodash/toInteger.js":
/*!*******************************************!*\
  !*** ../node_modules/lodash/toInteger.js ***!
  \*******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var toFinite = __webpack_require__(/*! ./toFinite */ "../node_modules/lodash/toFinite.js");

/**
 * Converts `value` to an integer.
 *
 * **Note:** This method is loosely based on
 * [`ToInteger`](http://www.ecma-international.org/ecma-262/7.0/#sec-tointeger).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {number} Returns the converted integer.
 * @example
 *
 * _.toInteger(3.2);
 * // => 3
 *
 * _.toInteger(Number.MIN_VALUE);
 * // => 0
 *
 * _.toInteger(Infinity);
 * // => 1.7976931348623157e+308
 *
 * _.toInteger('3.2');
 * // => 3
 */
function toInteger(value) {
  var result = toFinite(value),
      remainder = result % 1;

  return result === result ? (remainder ? result - remainder : result) : 0;
}

module.exports = toInteger;


/***/ }),

/***/ "../node_modules/lodash/toNumber.js":
/*!******************************************!*\
  !*** ../node_modules/lodash/toNumber.js ***!
  \******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseTrim = __webpack_require__(/*! ./_baseTrim */ "../node_modules/lodash/_baseTrim.js"),
    isObject = __webpack_require__(/*! ./isObject */ "../node_modules/lodash/isObject.js"),
    isSymbol = __webpack_require__(/*! ./isSymbol */ "../node_modules/lodash/isSymbol.js");

/** Used as references for various `Number` constants. */
var NAN = 0 / 0;

/** Used to detect bad signed hexadecimal string values. */
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

/** Used to detect binary string values. */
var reIsBinary = /^0b[01]+$/i;

/** Used to detect octal string values. */
var reIsOctal = /^0o[0-7]+$/i;

/** Built-in method references without a dependency on `root`. */
var freeParseInt = parseInt;

/**
 * Converts `value` to a number.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @example
 *
 * _.toNumber(3.2);
 * // => 3.2
 *
 * _.toNumber(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toNumber(Infinity);
 * // => Infinity
 *
 * _.toNumber('3.2');
 * // => 3.2
 */
function toNumber(value) {
  if (typeof value == 'number') {
    return value;
  }
  if (isSymbol(value)) {
    return NAN;
  }
  if (isObject(value)) {
    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
    value = isObject(other) ? (other + '') : other;
  }
  if (typeof value != 'string') {
    return value === 0 ? value : +value;
  }
  value = baseTrim(value);
  var isBinary = reIsBinary.test(value);
  return (isBinary || reIsOctal.test(value))
    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
    : (reIsBadHex.test(value) ? NAN : +value);
}

module.exports = toNumber;


/***/ }),

/***/ "./plugins/playlist/ui/components/playlist-buttons.scss":
/*!**************************************************************!*\
  !*** ./plugins/playlist/ui/components/playlist-buttons.scss ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./plugins/playlist/ui/components/upcoming-video-overlay.scss":
/*!********************************************************************!*\
  !*** ./plugins/playlist/ui/components/upcoming-video-overlay.scss ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./plugins/playlist/ui/playlist.scss":
/*!*******************************************!*\
  !*** ./plugins/playlist/ui/playlist.scss ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./plugins/playlist/ui/thumbnail/thumbnail.scss":
/*!******************************************************!*\
  !*** ./plugins/playlist/ui/thumbnail/thumbnail.scss ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

}]);
//# sourceMappingURL=playlist.light.js.map