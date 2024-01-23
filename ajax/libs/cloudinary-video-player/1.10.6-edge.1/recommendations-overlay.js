"use strict";
(self["webpackChunkcloudinary_video_player"] = self["webpackChunkcloudinary_video_player"] || []).push([["recommendations-overlay"],{

/***/ "./components/recommendations-overlay/recommendations-overlay-content.js":
/*!*******************************************************************************!*\
  !*** ./components/recommendations-overlay/recommendations-overlay-content.js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var video_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! video.js */ "../node_modules/video.js/dist/video.es-exposed.js");
/* harmony import */ var video_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(video_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _recommendations_overlay_primary_item__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./recommendations-overlay-primary-item */ "./components/recommendations-overlay/recommendations-overlay-primary-item.js");
/* harmony import */ var _recommendations_overlay_secondary_items_container__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./recommendations-overlay-secondary-items-container */ "./components/recommendations-overlay/recommendations-overlay-secondary-items-container.js");



const Component = video_js__WEBPACK_IMPORTED_MODULE_0___default().getComponent('Component');
class RecommendationsOverlayContent extends Component {
  constructor(player) {
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }
    super(player, ...args);
    this._content = new AspectRatioContent(player);
    this.addChild(this._content);
  }
  setItems(primary) {
    for (var _len2 = arguments.length, secondary = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      secondary[_key2 - 1] = arguments[_key2];
    }
    this._content.setItems(primary, ...secondary);
  }
  clearItems() {
    this._content._primary.clearItem();
    this._content._secondaryContainer.clearItems();
  }
  createEl() {
    return super.createEl('div', {
      className: 'vjs-recommendations-overlay-content'
    });
  }
}
class AspectRatioContent extends Component {
  constructor(player) {
    for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
      args[_key3 - 1] = arguments[_key3];
    }
    super(player, ...args);
    this._primary = new _recommendations_overlay_primary_item__WEBPACK_IMPORTED_MODULE_1__["default"](player);
    this._secondaryContainer = new _recommendations_overlay_secondary_items_container__WEBPACK_IMPORTED_MODULE_2__["default"](player);
    this.addChild(this._primary);
    this.addChild(this._secondaryContainer);
  }
  setItems(primary) {
    this._primary.setItem(primary);
    for (var _len4 = arguments.length, secondary = new Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
      secondary[_key4 - 1] = arguments[_key4];
    }
    this._secondaryContainer.setItems(...secondary);
  }
  createEl() {
    return super.createEl('div', {
      className: 'aspect-ratio-content'
    });
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (RecommendationsOverlayContent);

/***/ }),

/***/ "./components/recommendations-overlay/recommendations-overlay-hide-button.js":
/*!***********************************************************************************!*\
  !*** ./components/recommendations-overlay/recommendations-overlay-hide-button.js ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var video_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! video.js */ "../node_modules/video.js/dist/video.es-exposed.js");
/* harmony import */ var video_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(video_js__WEBPACK_IMPORTED_MODULE_0__);

const ClickableComponent = video_js__WEBPACK_IMPORTED_MODULE_0___default().getComponent('ClickableComponent');
class RecommendationOverlayHideButton extends ClickableComponent {
  createEl() {
    return super.createEl('span', {
      className: 'vjs-recommendations-overlay-hide vjs-icon-close'
    });
  }
  handleClick() {
    this.options_.clickHandler();
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (RecommendationOverlayHideButton);

/***/ }),

/***/ "./components/recommendations-overlay/recommendations-overlay-item.js":
/*!****************************************************************************!*\
  !*** ./components/recommendations-overlay/recommendations-overlay-item.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var video_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! video.js */ "../node_modules/video.js/dist/video.es-exposed.js");
/* harmony import */ var video_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(video_js__WEBPACK_IMPORTED_MODULE_0__);

const ClickableComponent = video_js__WEBPACK_IMPORTED_MODULE_0___default().getComponent('ClickableComponent');
class RecommendationsOverlayItem extends ClickableComponent {
  setItem(item) {
    const {
      action,
      source
    } = item;
    this.source = source;
    const info = source.info();
    this.setTitle(info.title || source.publicId());
    this.setPoster(this.source.poster().url({
      transformation: {
        aspect_ratio: '16:9',
        crop: 'pad',
        background: 'black'
      }
    }));
    this.setAction(action);
  }
  setTitle(text) {
    this.title.innerText = text;
  }
  setAction(action) {
    this.action = action;
  }
  handleClick() {
    super.handleClick();
    this.player().trigger('recommendationshide');
    this.action();
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (RecommendationsOverlayItem);

/***/ }),

/***/ "./components/recommendations-overlay/recommendations-overlay-primary-item.js":
/*!************************************************************************************!*\
  !*** ./components/recommendations-overlay/recommendations-overlay-primary-item.js ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var video_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! video.js */ "../node_modules/video.js/dist/video.es-exposed.js");
/* harmony import */ var video_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(video_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _recommendations_overlay_item__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./recommendations-overlay-item */ "./components/recommendations-overlay/recommendations-overlay-item.js");
/* harmony import */ var components_component_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! components/component-utils */ "./components/component-utils.js");
/* harmony import */ var components_component_utils__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(components_component_utils__WEBPACK_IMPORTED_MODULE_2__);




// support VJS5 & VJS6 at the same time
const dom = (video_js__WEBPACK_IMPORTED_MODULE_0___default().dom) || (video_js__WEBPACK_IMPORTED_MODULE_0___default());
class RecommendationsOverlayPrimaryItem extends _recommendations_overlay_item__WEBPACK_IMPORTED_MODULE_1__["default"] {
  setItem(item) {
    super.setItem(item);
    const info = this.source.info();
    this.setTitle(info.title);
    this.setSubtitle(info.subtitle);
    if (info.description) {
      const descLength = 300;
      const description = info.description.length > descLength ? info.description.substring(0, descLength) + '...' : info.description;
      this.setDescription(description);
    }
  }
  setPoster(url) {
    this.poster.style.backgroundImage = `url('${url}')`;
  }
  setTitle(text) {
    components_component_utils__WEBPACK_IMPORTED_MODULE_2___default().setText(this.title, text);
    this.setAriaCheck(this.title, !!text);
  }
  setSubtitle(text) {
    components_component_utils__WEBPACK_IMPORTED_MODULE_2___default().setText(this.subtitle, text);
    this.setAriaCheck(this.subtitle, !!text);
  }
  setDescription(text) {
    components_component_utils__WEBPACK_IMPORTED_MODULE_2___default().setText(this.description, text);
    this.setAriaCheck(this.description, !!text);
  }
  setAriaCheck(element) {
    let active = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    if (active) {
      element.removeAttribute('aria-hidden');
    } else {
      element.setAttribute('aria-hidden', 'true');
    }
  }
  clearItem() {
    this.setTitle('');
    this.setSubtitle('');
    this.setDescription('');
    this.poster.style.backgroundImage = null;
  }
  createEl() {
    const el = super.createEl('div', {
      className: 'vjs-recommendations-overlay-item vjs-recommendations-overlay-item-primary'
    });
    this.poster = dom.createEl('div', {
      className: 'vjs-recommendations-overlay-item-primary-image'
    });
    this.title = dom.createEl('h2', {
      ariaLabel: 'Recmmendation Title'
    });
    this.setAriaCheck(this.title, false);
    this.title.innerHTML = '';
    this.subtitle = dom.createEl('h3', {
      ariaLabel: 'Recmmendation Subtitle'
    });
    this.setAriaCheck(this.subtitle, false);
    this.subtitle.innerHTML = '';
    this.description = dom.createEl('p');
    this.setAriaCheck(this.description, false);
    this.description.innerHTML = '';
    this.content = dom.createEl('div', {
      className: 'vjs-recommendations-overlay-item-info vjs-recommendations-overlay-item-primary-content'
    });
    this.content.appendChild(this.title);
    this.content.appendChild(this.subtitle);
    this.content.appendChild(this.description);
    el.appendChild(this.poster);
    el.appendChild(this.content);
    return el;
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (RecommendationsOverlayPrimaryItem);

/***/ }),

/***/ "./components/recommendations-overlay/recommendations-overlay-secondary-item.js":
/*!**************************************************************************************!*\
  !*** ./components/recommendations-overlay/recommendations-overlay-secondary-item.js ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var video_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! video.js */ "../node_modules/video.js/dist/video.es-exposed.js");
/* harmony import */ var video_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(video_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _recommendations_overlay_item__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./recommendations-overlay-item */ "./components/recommendations-overlay/recommendations-overlay-item.js");



// support VJS5 & VJS6 at the same time
const dom = (video_js__WEBPACK_IMPORTED_MODULE_0___default().dom) || (video_js__WEBPACK_IMPORTED_MODULE_0___default());
class RecommendationsOverlaySecondaryItem extends _recommendations_overlay_item__WEBPACK_IMPORTED_MODULE_1__["default"] {
  setItem(item) {
    super.setItem(item);
    this.setDuration('');
  }
  setPoster(url) {
    this.el().style.backgroundImage = `url('${url}')`;
  }
  setDuration(text) {
    this.duration.innerText = text;
  }
  createEl() {
    const el = super.createEl('div', {
      className: 'vjs-recommendations-overlay-item vjs-recommendations-overlay-item-secondary'
    });
    this.title = dom.createEl('span', {
      className: 'vjs-recommendations-overlay-item-secondary-title'
    });
    this.title.innerHTML = '';
    this.duration = dom.createEl('span', {
      className: 'vjs-recommendations-overlay-item-secondary-duration'
    });
    this.duration.innerHTML = '';
    const caption = dom.createEl('div', {
      className: 'vjs-recommendations-overlay-item-info'
    });
    caption.appendChild(this.title);
    caption.appendChild(this.duration);
    el.appendChild(caption);
    return el;
  }
  handleClick() {
    super.handleClick();
    this.action();
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (RecommendationsOverlaySecondaryItem);

/***/ }),

/***/ "./components/recommendations-overlay/recommendations-overlay-secondary-items-container.js":
/*!*************************************************************************************************!*\
  !*** ./components/recommendations-overlay/recommendations-overlay-secondary-items-container.js ***!
  \*************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var video_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! video.js */ "../node_modules/video.js/dist/video.es-exposed.js");
/* harmony import */ var video_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(video_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _recommendations_overlay_secondary_item__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./recommendations-overlay-secondary-item */ "./components/recommendations-overlay/recommendations-overlay-secondary-item.js");


const Component = video_js__WEBPACK_IMPORTED_MODULE_0___default().getComponent('Component');
class RecommendationsOverlaySecondaryItemsContainer extends Component {
  setItems() {
    for (var _len = arguments.length, items = new Array(_len), _key = 0; _key < _len; _key++) {
      items[_key] = arguments[_key];
    }
    this.clearItems();
    if (!items) {
      return;
    }
    items.forEach(item => {
      const component = new _recommendations_overlay_secondary_item__WEBPACK_IMPORTED_MODULE_1__["default"](this.player());
      component.setItem(item);
      this.addChild(component);
    });
  }
  clearItems() {
    this.children().forEach(() => {
      this.removeChild(this.children()[0]);
    });
  }
  createEl() {
    return super.createEl('div', {
      className: 'vjs-recommendations-overlay-item-secondary-container'
    });
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (RecommendationsOverlaySecondaryItemsContainer);

/***/ }),

/***/ "./components/recommendations-overlay/recommendations-overlay.js":
/*!***********************************************************************!*\
  !*** ./components/recommendations-overlay/recommendations-overlay.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var video_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! video.js */ "../node_modules/video.js/dist/video.es-exposed.js");
/* harmony import */ var video_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(video_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _recommendations_overlay_content__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./recommendations-overlay-content */ "./components/recommendations-overlay/recommendations-overlay-content.js");
/* harmony import */ var _recommendations_overlay_hide_button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./recommendations-overlay-hide-button */ "./components/recommendations-overlay/recommendations-overlay-hide-button.js");
/* harmony import */ var _recommendations_overlay_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./recommendations-overlay.scss */ "./components/recommendations-overlay/recommendations-overlay.scss");




const MAXIMUM_ITEMS = 4;
const Component = video_js__WEBPACK_IMPORTED_MODULE_0___default().getComponent('Component');

// TODO: Use Video.js's ModalDialog instead. It handles clicking block logic.
class RecommendationsOverlay extends Component {
  constructor(player, options) {
    for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      args[_key - 2] = arguments[_key];
    }
    super(player, ...args);
    this._content = new _recommendations_overlay_content__WEBPACK_IMPORTED_MODULE_1__["default"](player);
    this.addChild(this._content);
    this.addChild(new _recommendations_overlay_hide_button__WEBPACK_IMPORTED_MODULE_2__["default"](player, {
      clickHandler: () => {
        this.close();
      }
    }, ...args));
    this.setEvents(player);
    this.doNotOpen = false;
  }
  setEvents(player) {
    this.on(player, 'recommendationschanged', (_, eventData) => {
      this.setItems(...eventData.items);
    });
    this.on(player, 'recommendationsnoshow', this.setDoNotOpen);
    this.on(player, 'recommendationsshow', this.open);
    this.on(player, 'recommendationshide', this.close);
    this.on(player, 'cldsourcechanged', () => {
      this.clearItems();
      this.close();
    });
  }
  setDoNotOpen() {
    this.doNotOpen = true;
  }
  open() {
    if (!this.doNotOpen) {
      // Only show controls on close if they were visible from the first place
      this._showControlsOnClose = this.player().controls();
      this.player().controls(false);
      this.el().style.visibility = 'visible';
    }
  }
  clearItems() {
    this._content.clearItems();
  }
  close() {
    this.el().style.visibility = 'hidden';
    if (this._showControlsOnClose) {
      this.player().controls(true);
    }
  }
  createEl() {
    const recommendationsOverlayClass = 'vjs-recommendations-overlay';
    const el = super.createEl('div', {
      className: recommendationsOverlayClass
    });
    video_js__WEBPACK_IMPORTED_MODULE_0___default().dom.addClass(el, recommendationsOverlayClass);
    return el;
  }
  setItems(primary) {
    for (var _len2 = arguments.length, secondary = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      secondary[_key2 - 1] = arguments[_key2];
    }
    this.doNotOpen = false;
    secondary = secondary.slice(0, MAXIMUM_ITEMS - 1);
    this._content.setItems(primary, ...secondary);
  }
  handleClick() {
    this.stopPropagation();
  }
  dispose() {
    super.dispose();
  }
}
video_js__WEBPACK_IMPORTED_MODULE_0___default().registerComponent('recommendationsOverlay', RecommendationsOverlay);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (RecommendationsOverlay);

/***/ }),

/***/ "./components/recommendations-overlay/recommendations-overlay.scss":
/*!*************************************************************************!*\
  !*** ./components/recommendations-overlay/recommendations-overlay.scss ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

}]);
//# sourceMappingURL=recommendations-overlay.js.map