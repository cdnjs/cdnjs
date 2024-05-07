"use strict";
(self["cloudinaryVideoPlayerChunkLoading"] = self["cloudinaryVideoPlayerChunkLoading"] || []).push([["recommendations-overlay"],{

/***/ "./components/recommendations-overlay/recommendations-overlay-content.js":
/*!*******************************************************************************!*\
  !*** ./components/recommendations-overlay/recommendations-overlay-content.js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var video_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! video.js */ "../node_modules/video.js/dist/alt/video.core-exposed.js");
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
/* harmony import */ var video_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! video.js */ "../node_modules/video.js/dist/alt/video.core-exposed.js");
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
/* harmony import */ var video_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! video.js */ "../node_modules/video.js/dist/alt/video.core-exposed.js");
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
/* harmony import */ var video_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! video.js */ "../node_modules/video.js/dist/alt/video.core-exposed.js");
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
    this.poster.style.backgroundImage = "url('".concat(url, "')");
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
/* harmony import */ var video_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! video.js */ "../node_modules/video.js/dist/alt/video.core-exposed.js");
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
    this.el().style.backgroundImage = "url('".concat(url, "')");
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
/* harmony import */ var video_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! video.js */ "../node_modules/video.js/dist/alt/video.core-exposed.js");
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
/* harmony import */ var video_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! video.js */ "../node_modules/video.js/dist/alt/video.core-exposed.js");
/* harmony import */ var video_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(video_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _recommendations_overlay_content__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./recommendations-overlay-content */ "./components/recommendations-overlay/recommendations-overlay-content.js");
/* harmony import */ var _recommendations_overlay_hide_button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./recommendations-overlay-hide-button */ "./components/recommendations-overlay/recommendations-overlay-hide-button.js");
/* harmony import */ var _recommendations_overlay_scss_style_loader__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./recommendations-overlay.scss?style-loader */ "./components/recommendations-overlay/recommendations-overlay.scss?style-loader");




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

/***/ "../node_modules/css-loader/dist/cjs.js!../node_modules/sass-loader/dist/cjs.js!./components/recommendations-overlay/recommendations-overlay.scss?style-loader":
/*!*********************************************************************************************************************************************************************!*\
  !*** ../node_modules/css-loader/dist/cjs.js!../node_modules/sass-loader/dist/cjs.js!./components/recommendations-overlay/recommendations-overlay.scss?style-loader ***!
  \*********************************************************************************************************************************************************************/
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
___CSS_LOADER_EXPORT___.push([module.id, `.vjs-recommendations-overlay {
  display: flex;
  align-items: center;
  justify-content: center;
  visibility: hidden;
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}
.vjs-recommendations-overlay .vjs-recommendations-overlay-hide {
  font-size: 1em;
  cursor: pointer;
  position: absolute;
  display: inline-block;
  top: 3.75%;
  right: 1.72%;
}
.vjs-recommendations-overlay .vjs-recommendations-overlay-content {
  position: relative;
  width: 85%;
}
.vjs-recommendations-overlay .vjs-recommendations-overlay-content:before {
  display: block;
  content: "";
  width: 100%;
  padding-top: 56.25%;
}
.vjs-recommendations-overlay .vjs-recommendations-overlay-content > .aspect-ratio-content {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
.vjs-recommendations-overlay .vjs-recommendations-overlay-content .aspect-ratio-content {
  display: flex;
  flex-flow: column;
  height: auto;
}
.vjs-recommendations-overlay .vjs-recommendations-overlay-content .aspect-ratio-content .vjs-recommendations-overlay-item {
  border: 1px solid rgba(255, 255, 255, 0.5);
}
.vjs-recommendations-overlay .vjs-recommendations-overlay-content .aspect-ratio-content .vjs-recommendations-overlay-item-primary {
  flex: 1.82;
  display: flex;
  flex-flow: row;
}
.vjs-recommendations-overlay .vjs-recommendations-overlay-content .aspect-ratio-content .vjs-recommendations-overlay-item-primary .vjs-recommendations-overlay-item-primary-image {
  flex: 1;
  background-size: cover;
}
.vjs-recommendations-overlay .vjs-recommendations-overlay-content .aspect-ratio-content .vjs-recommendations-overlay-item-primary .vjs-recommendations-overlay-item-primary-content {
  flex: 0.5625;
  display: flex;
  flex-flow: column;
  background: rgba(0, 0, 0, 0.6);
  text-align: left;
  padding: 3%;
  min-width: 0;
}
.vjs-recommendations-overlay .vjs-recommendations-overlay-content .aspect-ratio-content .vjs-recommendations-overlay-item-primary .vjs-recommendations-overlay-item-primary-content h2 {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 0 0 0 0;
  font-size: 18px;
  margin: 0 0 1em 0;
  font-weight: 600;
}
.vjs-recommendations-overlay .vjs-recommendations-overlay-content .aspect-ratio-content .vjs-recommendations-overlay-item-primary .vjs-recommendations-overlay-item-primary-content h3 {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 0 0 0 0;
  font-size: 20px;
  margin: 0 0 1.3em 0;
  font-weight: 500;
}
.vjs-recommendations-overlay .vjs-recommendations-overlay-content .aspect-ratio-content .vjs-recommendations-overlay-item-primary .vjs-recommendations-overlay-item-primary-content p {
  padding: 0 0 0 0;
  margin: 0 0 0 0;
  font-size: 14px;
  overflow: hidden;
  line-height: 1.4em;
  font-weight: 400;
}
@media only screen and (max-width: 1050px) {
  .vjs-recommendations-overlay .vjs-recommendations-overlay-content .aspect-ratio-content .vjs-recommendations-overlay-item-primary .vjs-recommendations-overlay-item-primary-content h2 {
    font-size: 16px;
  }
  .vjs-recommendations-overlay .vjs-recommendations-overlay-content .aspect-ratio-content .vjs-recommendations-overlay-item-primary .vjs-recommendations-overlay-item-primary-content h3 {
    font-size: 18px;
  }
  .vjs-recommendations-overlay .vjs-recommendations-overlay-content .aspect-ratio-content .vjs-recommendations-overlay-item-primary .vjs-recommendations-overlay-item-primary-content p {
    font-size: 12px;
  }
}
@media only screen and (max-width: 900px) {
  .vjs-recommendations-overlay .vjs-recommendations-overlay-content .aspect-ratio-content .vjs-recommendations-overlay-item-primary .vjs-recommendations-overlay-item-primary-content p {
    font-size: 10px;
  }
}
@media only screen and (max-width: 768px) {
  .vjs-recommendations-overlay .vjs-recommendations-overlay-content .aspect-ratio-content .vjs-recommendations-overlay-item-primary .vjs-recommendations-overlay-item-primary-content p {
    display: none;
  }
}
.vjs-recommendations-overlay .vjs-recommendations-overlay-content .aspect-ratio-content .vjs-recommendations-overlay-item-secondary-container {
  flex: 1;
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
}
.vjs-recommendations-overlay .vjs-recommendations-overlay-content .aspect-ratio-content .vjs-recommendations-overlay-item-secondary-container .vjs-recommendations-overlay-item-secondary {
  background-size: 100% 100%;
  flex: 1;
  max-width: 33%;
  font-size: 1.16em;
  position: relative;
  margin: 2% 2% 0 0;
}
.vjs-recommendations-overlay .vjs-recommendations-overlay-content .aspect-ratio-content .vjs-recommendations-overlay-item-secondary-container .vjs-recommendations-overlay-item-secondary:last-child {
  margin-right: 0;
}
.vjs-recommendations-overlay .vjs-recommendations-overlay-content .aspect-ratio-content .vjs-recommendations-overlay-item-secondary-container .vjs-recommendations-overlay-item-secondary div {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  text-align: left;
  line-height: normal;
  position: absolute;
  width: 100%;
  bottom: 0;
  left: 0;
  padding: 20% 7% 4.5% 7%;
}
.cld-video-player-skin-light .vjs-recommendations-overlay .vjs-recommendations-overlay-content .aspect-ratio-content .vjs-recommendations-overlay-item-secondary-container .vjs-recommendations-overlay-item-secondary div {
  padding: 5% 7%;
}
.cld-video-player-skin-dark .vjs-recommendations-overlay .vjs-recommendations-overlay-content .aspect-ratio-content .vjs-recommendations-overlay-item-secondary-container .vjs-recommendations-overlay-item-secondary div.vjs-recommendations-overlay-item-info {
  text-shadow: 1px 1px 0 rgba(0, 0, 0, 0.3);
}
.vjs-recommendations-overlay .vjs-recommendations-overlay-content .aspect-ratio-content .vjs-recommendations-overlay-item-secondary-container .vjs-recommendations-overlay-item-secondary div span {
  display: block;
  min-width: 0;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.vjs-recommendations-overlay .vjs-recommendations-overlay-content .aspect-ratio-content .vjs-recommendations-overlay-item-secondary-container .vjs-recommendations-overlay-item-secondary div span.vjs-recommendations-overlay-item-secondary-title {
  flex: 2.3;
  font-size: 13px;
}
.vjs-recommendations-overlay .vjs-recommendations-overlay-content .aspect-ratio-content .vjs-recommendations-overlay-item-secondary-container .vjs-recommendations-overlay-item-secondary div span.vjs-recommendations-overlay-item-secondary-duration {
  text-align: right;
  margin-left: 10px;
}`, "",{"version":3,"sources":["webpack://./components/recommendations-overlay/recommendations-overlay.scss","webpack://./assets/styles/mixins/aspect-ratio.scss","webpack://./assets/styles/mixins/mixins.scss"],"names":[],"mappings":"AAGA;EACE,aAAA;EACA,mBAAA;EACA,uBAAA;EAEA,kBAAA;EACA,kBAAA;EACA,QAAA;EACA,SAAA;EACA,WAAA;EACA,YAAA;EACA,oCAAA;AAHF;AAKE;EACE,cAAA;EACA,eAAA;EACA,kBAAA;EACA,qBAAA;EACA,UAAA;EACA,YAAA;AAHJ;AAME;EACE,kBAAA;EACA,UAAA;AAJJ;ACpBE;EACE,cAAA;EACA,WAAA;EACA,WAAA;EACA,mBAAA;ADsBJ;ACnBE;EACE,kBAAA;EACA,MAAA;EACA,OAAA;EACA,QAAA;EACA,SAAA;ADqBJ;AALI;EACE,aAAA;EACA,iBAAA;EAEA,YAAA;AAMN;AAJM;EACE,0CAAA;AAMR;AAHM;EACE,UAAA;EACA,aAAA;EACA,cAAA;AAKR;AAHQ;EACE,OAAA;EACA,sBAAA;AAKV;AAFQ;EACE,YAAA;EACA,aAAA;EACA,iBAAA;EAEA,8BAAA;EACA,gBAAA;EACA,WAAA;EACA,YAAA;AAGV;AADU;EE5DR,mBAAA;EACA,gBAAA;EACA,uBAAA;EF4DU,gBAAA;EACA,eAAA;EACA,iBAAA;EACA,gBAAA;AAKZ;AAFU;EEpER,mBAAA;EACA,gBAAA;EACA,uBAAA;EFoEU,gBAAA;EACA,eAAA;EACA,mBAAA;EACA,gBAAA;AAMZ;AAHU;EACE,gBAAA;EACA,eAAA;EACA,eAAA;EACA,gBAAA;EACA,kBAAA;EACA,gBAAA;AAKZ;AAFU;EACE;IACE,eAAA;EAIZ;EADU;IACE,eAAA;EAGZ;EAAU;IACE,eAAA;EAEZ;AACF;AACU;EACE;IACE,eAAA;EACZ;AACF;AAEU;EACE;IACE,aAAA;EAAZ;AACF;AAKM;EACE,OAAA;EACA,aAAA;EACA,mBAAA;EACA,2BAAA;AAHR;AAKQ;EACE,0BAAA;EACA,OAAA;EAEA,cAAA;EAEA,iBAAA;EACA,kBAAA;EAEA,iBAAA;AANV;AAQU;EACE,eAAA;AANZ;AASU;EACE,aAAA;EACA,mBAAA;EACA,8BAAA;EAEA,gBAAA;EACA,mBAAA;EACA,kBAAA;EACA,WAAA;EACA,SAAA;EACA,OAAA;EACA,uBAAA;AARZ;AAUY;EACE,cAAA;AARd;AAac;EACE,yCAAA;AAXhB;AAeY;EACE,cAAA;EACA,YAAA;EACA,uBAAA;EACA,gBAAA;EACA,mBAAA;AAbd;AAec;EACE,SAAA;EACA,eAAA;AAbhB;AAgBc;EACE,iBAAA;EACA,iBAAA;AAdhB","sourcesContent":["@import '../../assets/styles/mixins/aspect-ratio';\n@import '../../assets/styles/mixins/mixins.scss';\n\n.vjs-recommendations-overlay {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n\n  visibility: hidden;\n  position: absolute;\n  top: 0px;\n  left: 0px;\n  width: 100%;\n  height: 100%;\n  background-color: rgba(#000000, 0.5);\n\n  .vjs-recommendations-overlay-hide {\n    font-size: 1em;\n    cursor: pointer;\n    position: absolute;\n    display: inline-block;\n    top: 3.75%;\n    right: 1.72%;\n  }\n\n  .vjs-recommendations-overlay-content {\n    position: relative;\n    width: 85%;\n\n    @include aspect-ratio(16, 9);\n\n    .aspect-ratio-content {\n      display: flex;\n      flex-flow: column;\n\n      height: auto;\n\n      .vjs-recommendations-overlay-item {\n        border: 1px solid rgba(#FFFFFF, 0.5);\n      }\n\n      .vjs-recommendations-overlay-item-primary {\n        flex: 1.82;\n        display: flex;\n        flex-flow: row;\n\n        .vjs-recommendations-overlay-item-primary-image {\n          flex: 1;\n          background-size: cover;\n        }\n\n        .vjs-recommendations-overlay-item-primary-content {\n          flex: 0.5625;\n          display: flex;\n          flex-flow: column;\n\n          background: rgba(#000000, 0.6);\n          text-align: left;\n          padding: 3%;\n          min-width: 0; // for use with flex and white-space: nowrap\n\n          h2 {\n            @include ellipsis;\n            padding: 0 0 0 0;\n            font-size: 18px;\n            margin: 0 0 1em 0;\n            font-weight: 600;\n          }\n\n          h3 {\n            @include ellipsis;\n            padding: 0 0 0 0;\n            font-size: 20px;\n            margin: 0 0 1.3em 0;\n            font-weight: 500;\n          }\n\n          p {\n            padding: 0 0 0 0;\n            margin: 0 0 0 0;\n            font-size: 14px;\n            overflow: hidden;\n            line-height: 1.4em;\n            font-weight: 400;\n          }\n\n          @media only screen and (max-width: 1050px) {\n            h2 {\n              font-size: 16px\n            }\n\n            h3 {\n              font-size: 18px;\n            }\n\n            p {\n              font-size: 12px;\n            }\n          }\n\n          @media only screen and (max-width: 900px) {\n            p {\n              font-size: 10px;\n            }\n          }\n\n          @media only screen and (max-width: 768px) {\n            p {\n              display: none;\n            }\n          }\n        }\n      }\n\n      .vjs-recommendations-overlay-item-secondary-container {\n        flex: 1;\n        display: flex;\n        flex-flow: row wrap;\n        justify-content: flex-start;\n\n        .vjs-recommendations-overlay-item-secondary {\n          background-size: 100% 100%;\n          flex: 1;\n\n          max-width: 33%;\n\n          font-size: 1.16em;\n          position: relative;\n\n          margin: 2% 2% 0 0;\n\n          &:last-child {\n            margin-right: 0;\n          }\n\n          div {\n            display: flex;\n            flex-direction: row;\n            justify-content: space-between;\n\n            text-align: left;\n            line-height: normal;\n            position: absolute;\n            width: 100%;\n            bottom: 0;\n            left: 0;\n            padding: 20% 7% 4.5% 7%;\n\n            .cld-video-player-skin-light & {\n              padding: 5% 7%;\n            }\n\n            .cld-video-player-skin-dark & {\n\n              &.vjs-recommendations-overlay-item-info {\n                text-shadow: 1px 1px 0 rgba(#000, .3);\n              }\n            }\n\n            span {\n              display: block;\n              min-width: 0;\n              text-overflow: ellipsis;\n              overflow: hidden;\n              white-space: nowrap;\n\n              &.vjs-recommendations-overlay-item-secondary-title {\n                flex: 2.3;\n                font-size: 13px;\n              }\n\n              &.vjs-recommendations-overlay-item-secondary-duration {\n                text-align: right;\n                margin-left: 10px;\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n}\n","@use \"sass:math\";\n\n@mixin aspect-ratio($width, $height) {\n  &:before {\n    display: block;\n    content: \"\";\n    width: 100%;\n    padding-top: math.div($height, $width) * 100%;\n  }\n\n  > .aspect-ratio-content {\n    position: absolute;\n    top: 0;\n    left: 0;\n    right: 0;\n    bottom: 0;\n  }\n}\n","@mixin ellipsis {\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}"],"sourceRoot":""}]);
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

/***/ "./components/recommendations-overlay/recommendations-overlay.scss?style-loader":
/*!**************************************************************************************!*\
  !*** ./components/recommendations-overlay/recommendations-overlay.scss?style-loader ***!
  \**************************************************************************************/
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
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_recommendations_overlay_scss_style_loader__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../../node_modules/css-loader/dist/cjs.js!../../../node_modules/sass-loader/dist/cjs.js!./recommendations-overlay.scss?style-loader */ "../node_modules/css-loader/dist/cjs.js!../node_modules/sass-loader/dist/cjs.js!./components/recommendations-overlay/recommendations-overlay.scss?style-loader");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());
options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_recommendations_overlay_scss_style_loader__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_recommendations_overlay_scss_style_loader__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_recommendations_overlay_scss_style_loader__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_recommendations_overlay_scss_style_loader__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


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
//# sourceMappingURL=recommendations-overlay.light.js.map